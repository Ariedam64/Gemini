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
  var Ng=Object.defineProperty;var Fg=(e,t,n)=>t in e?Ng(e,t,{enumerable:true,configurable:true,writable:true,value:n}):e[t]=n;var R=(e,t,n)=>Fg(e,typeof t!="symbol"?t+"":t,n);function x(e,t=null,...n){const r=document.createElement(e);for(const[o,a]of Object.entries(t||{}))a!=null&&(o==="style"?typeof a=="string"?r.setAttribute("style",a):typeof a=="object"&&Object.assign(r.style,a):o.startsWith("on")&&typeof a=="function"?r[o.toLowerCase()]=a:o in r?r[o]=a:r.setAttribute(o,String(a)));for(const o of n)o==null||o===false||r.appendChild(typeof o=="string"||typeof o=="number"?document.createTextNode(String(o)):o);return r}const co="https://i.imgur.com/k5WuC32.png",jl="gemini-loader-style",Vt="gemini-loader",Rd=80;function Og(){if(document.getElementById(jl))return;const e=document.createElement("style");e.id=jl,e.textContent=`
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
  `;const t=document.head||document.documentElement||document.body;if(t){t.appendChild(e);return}const n=()=>{(document.head||document.documentElement||document.body)?.appendChild(e);};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",n,{once:true}):setTimeout(n,0);}function uo(e,t,n){const r=x("div",{className:`gemini-loader__log ${n}`},x("div",{className:"gemini-loader__dot"}),x("div",{textContent:t}));for(e.appendChild(r);e.childElementCount>Rd;)e.firstElementChild?.remove();e.scrollTop=e.scrollHeight;}function $g(){return new Promise(e=>{if(typeof GM_xmlhttpRequest>"u"){e(co);return}GM_xmlhttpRequest({method:"GET",url:co,responseType:"blob",onload:t=>{const n=t.response,r=new FileReader;r.onloadend=()=>e(r.result),r.onerror=()=>e(co),r.readAsDataURL(n);},onerror:()=>e(co)});})}function Bg(e={}){const t=Number.isFinite(e.blurPx)?Math.max(4,Number(e.blurPx)):14;Og();const n=x("div",{className:"gemini-loader__subtitle",textContent:e.subtitle??"Initializing the mod..."}),r=x("div",{className:"gemini-loader__logs"}),o=x("img",{className:"gemini-loader__spinner-icon",alt:"Gemini"}),a=x("div",{className:"gemini-loader__spinner"},o);$g().then(m=>{o.src=m;});const i=x("div",{className:"gemini-loader__card"},x("div",{className:"gemini-loader__header"},a,x("div",{className:"gemini-loader__titles"},x("div",{className:"gemini-loader__title",textContent:e.title??"Gemini is loading"}),n)),r),s=x("div",{id:Vt},i);(document.body||document.documentElement).appendChild(s);const l=x("div",{className:"gemini-loader__actions"},x("button",{className:"gemini-loader__button",textContent:"Close loader",onclick:()=>s.remove()}));i.appendChild(l),s.style.setProperty("--loader-blur",`${t}px`);const d=m=>{n.textContent=m;},c=new Map,u=(m,b)=>{m.className=`gemini-loader__log ${b}`;};return {log:(m,b="info")=>uo(r,m,b),logStep:(m,b,y="info")=>{const w=String(m||"").trim();if(!w){uo(r,b,y);return}const S=c.get(w);if(S){S.el.lastElementChild&&(S.el.lastElementChild.textContent=b),S.tone!==y&&(u(S.el,y),S.tone=y);return}const T=x("div",{className:`gemini-loader__log ${y}`},x("div",{className:"gemini-loader__dot"}),x("div",{textContent:b}));for(c.set(w,{el:T,tone:y}),r.appendChild(T);r.childElementCount>Rd;){const v=r.firstElementChild;if(!v)break;const C=Array.from(c.entries()).find(([,I])=>I.el===v)?.[0];C&&c.delete(C),v.remove();}r.scrollTop=r.scrollHeight;},setSubtitle:d,succeed:(m,b=600)=>{m&&uo(r,m,"success"),s.classList.add("gemini-loader--closing"),setTimeout(()=>s.remove(),b);},fail:(m,b)=>{uo(r,m,"error"),d("Something went wrong. Check the console for details."),s.classList.add("gemini-loader--error"),console.error("[Gemini loader]",m,b);}}}const Wl=150,Dg=30;function Gg(e,t,n){const r=x("div",{className:"lg-pill",id:"pill"}),o=e.map(k=>{const A=x("button",{className:"lg-tab"},k.label);return A.setAttribute("data-target",k.id),A}),a=x("div",{className:"lg-tabs",id:"lg-tabs-row"},r,...o),i=new Map(e.map(k=>[k.id,true])),s=new Map(o.map((k,A)=>[e[A].id,k]));function l(k){const A=document.createElementNS("http://www.w3.org/2000/svg","svg");A.setAttribute("viewBox","0 0 24 24"),A.setAttribute("fill","none"),A.setAttribute("stroke","currentColor"),A.setAttribute("stroke-width","2"),A.setAttribute("stroke-linecap","round"),A.setAttribute("stroke-linejoin","round");const E=document.createElementNS("http://www.w3.org/2000/svg","polyline");return E.setAttribute("points",k==="left"?"15 18 9 12 15 6":"9 18 15 12 9 6"),A.appendChild(E),A}const d=x("button",{className:"lg-tabs-arrow lg-tabs-arrow-left",ariaLabel:"Scroll left"});d.appendChild(l("left"));const c=x("button",{className:"lg-tabs-arrow lg-tabs-arrow-right",ariaLabel:"Scroll right"});c.appendChild(l("right"));const p=x("div",{className:"lg-tabs-wrapper"},d,a,c);let f=0,g=0,h=false;function m(){const k=a.scrollLeft>0,A=a.scrollLeft<a.scrollWidth-a.clientWidth-1;d.classList.toggle("disabled",!k),c.classList.toggle("disabled",!A);}d.addEventListener("click",()=>{a.scrollBy({left:-Wl,behavior:"smooth"}),setTimeout(m,300);}),c.addEventListener("click",()=>{a.scrollBy({left:Wl,behavior:"smooth"}),setTimeout(m,300);}),a.addEventListener("wheel",k=>{Math.abs(k.deltaY)>Math.abs(k.deltaX)&&(k.preventDefault(),a.scrollLeft+=k.deltaY,m());},{passive:false});let b=0;a.addEventListener("touchstart",k=>{const A=k.touches[0];f=A.clientX,g=A.clientY,h=false,b=a.scrollLeft;},{passive:true}),a.addEventListener("touchmove",k=>{if(h)return;const A=k.touches[0],E=A.clientX-f,B=A.clientY-g;if(Math.abs(B)>Math.abs(E)){h=true;return}Math.abs(E)>Dg&&(k.preventDefault(),a.scrollLeft=b-E);},{passive:false}),a.addEventListener("touchend",()=>{m();},{passive:true}),a.addEventListener("scroll",m,{passive:true});function y(k){const A=o.find(E=>E.dataset.target===k)||o[0];A&&requestAnimationFrame(()=>{const E=A.offsetLeft,B=A.offsetWidth;r.style.width=`${B}px`,r.style.transform=`translateX(${E}px)`;const J=a.scrollLeft,D=J,G=J+a.clientWidth,Y=E-12,O=E+B+12;Y<D?a.scrollTo({left:Y,behavior:"smooth"}):O>G&&a.scrollTo({left:O-a.clientWidth,behavior:"smooth"}),setTimeout(m,300);});}function w(){for(const[k,A]of i)if(A)return k;return null}function S(k){const A=s.get(k);if(A)if(i.set(k,false),A.style.display="none",C===k){const E=w();E&&I(E);}else v();}function T(k){const A=s.get(k);A&&(i.set(k,true),A.style.display="",v());}function v(){y(C),m();}let C=t||(e[0]?.id??"");function I(k){i.get(k)&&(C=k,o.forEach(A=>A.classList.toggle("active",A.dataset.target===k)),y(k),n(k));}return o.forEach(k=>k.addEventListener("click",()=>I(k.dataset.target))),queueMicrotask(()=>{y(C),m();}),{root:p,activate:I,recalc:v,getActive:()=>C,showTab:T,hideTab:S,isTabVisible:k=>i.get(k)??false,getVisibleTabs:()=>[...i.entries()].filter(([k,A])=>A).map(([k])=>k)}}class sn{constructor(t){R(this,"id");R(this,"label");R(this,"container",null);R(this,"cleanupFunctions",[]);R(this,"preloadedContent",null);R(this,"preloadPromise",null);this.id=t.id,this.label=t.label;}destroy(){}async preload(){if(this.preloadedContent||this.preloadPromise)return;const t=x("div");this.preloadPromise=(async()=>{const n=this.build(t);n instanceof Promise&&await n,this.preloadedContent=t,this.preloadPromise=null;})(),await this.preloadPromise;}isPreloaded(){return this.preloadedContent!==null}render(t){for(this.unmount();t.firstChild;)t.removeChild(t.firstChild);if(this.container=t,this.preloadedContent){for(;this.preloadedContent.firstChild;)t.appendChild(this.preloadedContent.firstChild);this.preloadedContent=null;}else {const r=this.build(t);r instanceof Promise&&r.catch(o=>{console.error(`[Gemini] Error building section ${this.id}:`,o);});}const n=t.firstElementChild;n&&n.classList.contains("gemini-section")&&n.classList.add("active");}unmount(){const t=this.destroy();t instanceof Promise&&t.catch(n=>{console.error(`[Gemini] Destroy error in section ${this.id}:`,n);}),this.executeCleanup(),this.container=null;}createContainer(t,n){const r=n?`gemini-section ${n}`:"gemini-section";return x("section",{id:t,className:r})}addCleanup(t){this.cleanupFunctions.push(t);}createGrid(t="12px"){const n=x("div");return n.style.display="grid",n.style.gap=t,n}executeCleanup(){for(const t of this.cleanupFunctions)try{t();}catch(n){console.error(`[Gemini] Cleanup error in section ${this.id}:`,n);}this.cleanupFunctions=[];}}class zg{constructor(t,n,r){R(this,"sections");R(this,"activeId",null);R(this,"container");R(this,"theme");this.sections=new Map(t.map(o=>[o.id,o])),this.container=n,this.theme=r;}get ids(){return Array.from(this.sections.keys())}get all(){return Array.from(this.sections.values())}get active(){return this.activeId}activate(t){if(this.activeId!==t){if(!this.sections.has(t))throw new Error(`[Gemini] Unknown section: ${t}`);if(this.activeId&&this.sections.get(this.activeId).unmount(),this.activeId=t,this.sections.get(t).render(this.container),this.theme){const n=this.theme.getCurrentTheme();this.theme.applyTheme(n);}}}}const Nt="gemini:",Hg={STATE:"hud:state",THEME:"hud:theme"},jg={ALL:"sections",SETTINGS:"sections:settings",TEST:"sections:test"},Wg={AUDIO_CUSTOM_SOUNDS:"module:audio:customSounds"},Ug={MY_PETS_ABILITY_LOGS:"global:myPets:abilityLogs"},we={AUTO_FAVORITE:"feature:autoFavorite:config",AUTO_FAVORITE_UI:"feature:autoFavorite:ui",JOURNAL_CHECKER:"feature:journalChecker:config",BULK_FAVORITE:"feature:bulkFavorite:config",ACHIEVEMENTS:"feature:achievements:data",TRACKER_STATS:"feature:tracker:stats",ANTI_AFK:"feature:antiAfk:config",CONFIG:"feature:config",PET_TEAM:"feature:petTeam:config",XP_TRACKER:"feature:xpTracker:config",CROP_VALUE_INDICATOR:"feature:cropValueIndicator:config",CROP_SIZE_INDICATOR:"feature:cropSizeIndicator:config",SHOP_NOTIFIER:"feature:shopNotifier:config",WEATHER_NOTIFIER:"feature:weatherNotifier:config"},Vg={AUTO_RELOAD:"dev:auto-reload"},Sa={HUD:Hg,SECTION:jg,MODULE:Wg,GLOBAL:Ug,FEATURE:we,DEV:Vg},Ul={STORAGE_CHANGE:"gemini:storage:change"};function ye(e,t){try{const n=e.startsWith(Nt)?e:Nt+e,r=GM_getValue(n);return r==null?t:typeof r=="string"?JSON.parse(r):r}catch(n){return console.error(`[Gemini Storage] Failed to read key "${e}":`,n),t}}function Te(e,t){try{const n=e.startsWith(Nt)?e:Nt+e,r=e.startsWith(Nt)?e.slice(Nt.length):e,o=JSON.stringify(t);GM_setValue(n,o),window.dispatchEvent(new CustomEvent("gemini:storage:change",{detail:{key:r,value:t}}));}catch(n){console.error(`[Gemini Storage] Failed to write key "${e}":`,n);}}function Xg(e){try{const t=e.startsWith(Nt)?e:Nt+e;GM_setValue(t,void 0);}catch(t){console.error(`[Gemini Storage] Failed to remove key "${e}":`,t);}}function qg(){try{const e="gemini:",t=[];for(let o=0;o<localStorage.length;o++){const a=localStorage.key(o);a&&a.startsWith(e)&&t.push(a);}for(const o of t)try{const a=localStorage.getItem(o);if(a!==null){const i=JSON.parse(a),s=o.slice(e.length);Te(s,i),console.log(`[Gemini Storage] Migrated key: ${o}`);}}catch(a){console.warn(`[Gemini Storage] Failed to migrate key "${o}":`,a);}const n="gemini.sections",r=GM_getValue(n);r!=null&&(Te("sections",r),GM_setValue(n,void 0),console.log("[Gemini Storage] Migrated: gemini.sections → gemini:sections")),t.length>0&&console.log(`[Gemini Storage] Migration complete. ${t.length} keys migrated from localStorage to GM_* storage.`);}catch(e){console.error("[Gemini Storage] Migration failed:",e);}}const Ld="gemini.sections";function Nd(){const e=ye(Ld,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function Kg(e){Te(Ld,e);}async function Yg(e){return Nd()[e]}function Jg(e,t){const n=Nd();Kg({...n,[e]:t});}function Vl(e,t){return {...e,...t??{}}}async function Qg(e){const t=await Yg(e.path);let n;e.migrate?n=e.migrate(t):n=t??{},n=Object.assign((d=>JSON.parse(JSON.stringify(d)))(e.defaults),n),e.sanitize&&(n=e.sanitize(n));function o(){Jg(e.path,n);}function a(){return n}function i(d){n=e.sanitize?e.sanitize(d):d,o();}function s(d){const u=Object.assign((p=>JSON.parse(JSON.stringify(p)))(n),{});typeof d=="function"?d(u):Object.assign(u,d),n=e.sanitize?e.sanitize(u):u,o();}function l(){o();}return {get:a,set:i,update:s,save:l}}async function Xr(e,t){const{path:n=e,...r}=t;return Qg({path:n,...r})}let Zg=0;const po=new Map;function We(e={},...t){const{id:n,className:r,variant:o="default",padding:a="md",interactive:i=false,expandable:s=false,defaultExpanded:l=true,onExpandChange:d,mediaTop:c,title:u,subtitle:p,badge:f,actions:g,footer:h,divider:m=false,tone:b="neutral",stateKey:y}=e,w=x("div",{className:"card",id:n,tabIndex:i?0:void 0});w.classList.add(`card--${o}`,`card--p-${a}`),i&&w.classList.add("card--interactive"),b!=="neutral"&&w.classList.add(`card--tone-${b}`),r&&w.classList.add(...r.split(" ").filter(Boolean)),s&&w.classList.add("card--expandable");const S=s?y??n??(typeof u=="string"?`title:${u}`:null):null;let T=!s||l;S&&po.has(S)&&(T=!!po.get(S));let v=null,C=null,I=null,k=null,A=null;const E=n?`${n}-collapse`:`card-collapse-${++Zg}`,B=()=>{if(k!==null&&(cancelAnimationFrame(k),k=null),A){const H=A;A=null,H();}},J=(H,z)=>{if(!I)return;B();const $=I;if($.setAttribute("aria-hidden",String(!H)),!z){$.classList.remove("card-collapse--animating"),$.style.display=H?"":"none",$.style.height="",$.style.opacity="";return}if($.classList.add("card-collapse--animating"),$.style.display="",H){$.style.height="auto";const W=$.scrollHeight;if(!W){$.classList.remove("card-collapse--animating"),$.style.display="",$.style.height="",$.style.opacity="";return}$.style.height="0px",$.style.opacity="0",$.offsetHeight,k=requestAnimationFrame(()=>{k=null,$.style.height=`${W}px`,$.style.opacity="1";});}else {const W=$.scrollHeight;if(!W){$.classList.remove("card-collapse--animating"),$.style.display="none",$.style.height="",$.style.opacity="";return}$.style.height=`${W}px`,$.style.opacity="1",$.offsetHeight,k=requestAnimationFrame(()=>{k=null,$.style.height="0px",$.style.opacity="0";});}const P=()=>{$.classList.remove("card-collapse--animating"),$.style.height="",H||($.style.display="none"),$.style.opacity="";};let L=null;const F=W=>{W.target===$&&(L!==null&&(clearTimeout(L),L=null),$.removeEventListener("transitionend",F),$.removeEventListener("transitioncancel",F),A=null,P());};A=()=>{L!==null&&(clearTimeout(L),L=null),$.removeEventListener("transitionend",F),$.removeEventListener("transitioncancel",F),A=null,P();},$.addEventListener("transitionend",F),$.addEventListener("transitioncancel",F),L=window.setTimeout(()=>{A?.();},420);};function D(H){const z=document.createElementNS("http://www.w3.org/2000/svg","svg");return z.setAttribute("viewBox","0 0 24 24"),z.setAttribute("width","16"),z.setAttribute("height","16"),z.innerHTML=H==="up"?'<path d="M7 14l5-5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>':'<path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',z}function G(H,z=true,$=true){T=H,w.classList.toggle("card--collapsed",!T),w.classList.toggle("card--expanded",T),v&&(v.dataset.expanded=String(T),v.setAttribute("aria-expanded",String(T))),C&&(C.setAttribute("aria-expanded",String(T)),C.classList.toggle("card-toggle--collapsed",!T),C.setAttribute("aria-label",T?"Replier le contenu":"Deplier le contenu"),C.replaceChildren(D(T?"up":"down"))),s?J(T,$):I&&(I.style.display="",I.style.height="",I.style.opacity="",I.setAttribute("aria-hidden","false")),z&&d&&d(T),S&&po.set(S,T);}if(c){const H=x("div",{className:"card-media"});H.append(c),w.appendChild(H);}const Y=!!(u||p||f||g&&g.length||s);if(Y){v=x("div",{className:"card-header"});const H=x("div",{className:"card-headline",style:"min-width:0;display:flex;flex-direction:column;gap:2px;"});if(u){const P=x("h3",{className:"card-title",style:"margin:0;font-size:15px;font-weight:700;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:8px;color:var(--fg);"},u);f&&P.append(typeof f=="string"?x("span",{className:"badge"},f):f),H.appendChild(P);}if(p){const P=x("div",{className:"card-subtitle",style:"opacity:.85;font-size:12px;color:color-mix(in oklab, var(--fg) 80%, #9ca3af)"},p);H.appendChild(P);}(H.childNodes.length||s)&&v.appendChild(H);const z=x("div",{className:"card-header-right",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"}),$=x("div",{className:"card-actions",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"});g?.forEach(P=>$.appendChild(P)),$.childNodes.length&&z.appendChild($),s&&(C=x("button",{className:"card-toggle",type:"button",ariaExpanded:String(T),ariaControls:E,ariaLabel:T?"Replier le contenu":"Deplier le contenu"}),C.textContent=T?"▲":"▼",C.addEventListener("click",P=>{P.preventDefault(),P.stopPropagation(),G(!T);}),z.appendChild(C),v.classList.add("card-header--expandable"),v.addEventListener("click",P=>{const L=P.target;L?.closest(".card-actions")||L?.closest(".card-toggle")||G(!T);})),z.childNodes.length&&v.appendChild(z),w.appendChild(v);}I=x("div",{className:"card-collapse",id:E,ariaHidden:s?String(!T):"false"}),w.appendChild(I),m&&Y&&I.appendChild(x("div",{className:"card-divider"}));const O=x("div",{className:"card-body"});if(O.append(...t),I.appendChild(O),h){m&&I.appendChild(x("div",{className:"card-divider"}));const H=x("div",{className:"card-footer"});H.append(h),I.appendChild(H);}return C&&C.setAttribute("aria-controls",E),G(T,false,false),S&&po.set(S,T),w}let aa=false;const ia=new Set,Je=e=>{const t=document.activeElement;for(const n of ia)if(t&&(t===n||n.contains(t))){e.stopImmediatePropagation(),e.stopPropagation();return}};function eh(){aa||(aa=true,window.addEventListener("keydown",Je,true),window.addEventListener("keypress",Je,true),window.addEventListener("keyup",Je,true),document.addEventListener("keydown",Je,true),document.addEventListener("keypress",Je,true),document.addEventListener("keyup",Je,true));}function th(){aa&&(ia.size>0||(aa=false,window.removeEventListener("keydown",Je,true),window.removeEventListener("keypress",Je,true),window.removeEventListener("keyup",Je,true),document.removeEventListener("keydown",Je,true),document.removeEventListener("keypress",Je,true),document.removeEventListener("keyup",Je,true)));}function Fd(e){const{id:t,value:n=null,options:r,placeholder:o="Select...",size:a="md",disabled:i=false,blockGameKeys:s=true,onChange:l,onOpenChange:d}=e,c=x("div",{className:"select",id:t}),u=x("button",{className:"select-trigger",type:"button"}),p=x("span",{className:"select-value"},o),f=x("span",{className:"select-caret"},"▾");u.append(p,f);const g=x("div",{className:"select-menu",role:"listbox",tabindex:"-1","aria-hidden":"true"});c.classList.add(`select--${a}`);let h=false,m=n,b=null,y=!!i;function w(P){return P==null?o:(e.options||r).find(F=>F.value===P)?.label??o}function S(P){p.textContent=w(P),g.querySelectorAll(".select-option").forEach(L=>{const F=L.dataset.value,W=P!=null&&F===P;L.classList.toggle("selected",W),L.setAttribute("aria-selected",String(W));});}function T(P){g.replaceChildren(),P.forEach(L=>{const F=x("button",{className:"select-option"+(L.disabled?" disabled":""),type:"button",role:"option","data-value":L.value,"aria-selected":String(L.value===m),tabindex:"-1"},L.label);L.value===m&&F.classList.add("selected"),L.disabled||F.addEventListener("pointerdown",W=>{W.preventDefault(),W.stopPropagation(),E(L.value,{notify:true}),k();},{capture:true}),g.appendChild(F);});}function v(){u.setAttribute("aria-expanded",String(h)),g.setAttribute("aria-hidden",String(!h));}function C(){const P=u.getBoundingClientRect();Object.assign(g.style,{minWidth:`${P.width}px`});}function I(){h||y||(h=true,c.classList.add("open"),v(),C(),document.addEventListener("mousedown",Y,true),document.addEventListener("scroll",O,true),window.addEventListener("resize",H),g.focus({preventScroll:true}),s&&(eh(),ia.add(c),b=()=>{ia.delete(c),th();}),d?.(true));}function k(){h&&(h=false,c.classList.remove("open"),v(),document.removeEventListener("mousedown",Y,true),document.removeEventListener("scroll",O,true),window.removeEventListener("resize",H),u.focus({preventScroll:true}),b?.(),b=null,d?.(false));}function A(){h?k():I();}function E(P,L={}){const F=m;m=P,S(m),L.notify!==false&&F!==P&&l?.(P);}function B(){return m}function J(P){const L=Array.from(g.querySelectorAll(".select-option:not(.disabled)"));if(!L.length)return;const F=L.findIndex(xe=>xe.classList.contains("active")),W=L[(F+(P===1?1:L.length-1))%L.length];L.forEach(xe=>xe.classList.remove("active")),W.classList.add("active"),W.focus({preventScroll:true}),W.scrollIntoView({block:"nearest"});}function D(P){(P.key===" "||P.key==="Enter"||P.key==="ArrowDown")&&(P.preventDefault(),I());}function G(P){if(P.key==="Escape"){P.preventDefault(),k();return}if(P.key==="Enter"||P.key===" "){const L=g.querySelector(".select-option.active")||g.querySelector(".select-option.selected");L&&!L.classList.contains("disabled")&&(P.preventDefault(),E(L.dataset.value,{notify:true}),k());return}if(P.key==="ArrowDown"){P.preventDefault(),J(1);return}if(P.key==="ArrowUp"){P.preventDefault(),J(-1);return}}function Y(P){c.contains(P.target)||k();}function O(){h&&C();}function H(){h&&C();}function z(P){y=!!P,u.disabled=y,c.classList.toggle("disabled",y),y&&k();}function $(P){e.options=P,T(P),P.some(L=>L.value===m)||(m=null,S(null));}return c.append(u,g),u.addEventListener("pointerdown",P=>{P.preventDefault(),P.stopPropagation(),A();},{capture:true}),u.addEventListener("keydown",D),g.addEventListener("keydown",G),T(r),n!=null?(m=n,S(m)):S(null),v(),z(y),{root:c,open:I,close:k,toggle:A,getValue:B,setValue:E,setOptions:$,setDisabled:z,destroy(){document.removeEventListener("mousedown",Y,true),document.removeEventListener("scroll",O,true),window.removeEventListener("resize",H),b?.(),b=null;}}}function Od(e={}){const{id:t,text:n="",htmlFor:r,tone:o="default",size:a="md",layout:i="inline",variant:s="text",required:l=false,disabled:d=false,tooltip:c,hint:u,icon:p,suffix:f,onClick:g}=e,h=x("div",{className:"lg-label-wrap",id:t}),m=x("label",{className:"lg-label",...r?{htmlFor:r}:{},...c?{title:c}:{}});if(p){const E=typeof p=="string"?x("span",{className:"lg-label-ico"},p):p;E.classList?.add?.("lg-label-ico"),m.appendChild(E);}const b=x("span",{className:"lg-label-text"},n);m.appendChild(b);const y=x("span",{className:"lg-label-req",ariaHidden:"true"}," *");l&&m.appendChild(y);let w=null;if(f!=null){w=typeof f=="string"?document.createTextNode(f):f;const E=x("span",{className:"lg-label-suffix"});E.appendChild(w),m.appendChild(E);}const S=u?x("div",{className:"lg-label-hint"},u):null;h.classList.add(`lg-label--${i}`),h.classList.add(`lg-label--${a}`),s==="title"&&h.classList.add("lg-label--title"),T(o),d&&h.classList.add("is-disabled"),h.appendChild(m),S&&h.appendChild(S),g&&m.addEventListener("click",g);function T(E){h.classList.remove("lg-label--default","lg-label--muted","lg-label--info","lg-label--success","lg-label--warning","lg-label--danger"),h.classList.add(`lg-label--${E}`);}function v(E){b.textContent=E;}function C(E){T(E);}function I(E){E&&!y.isConnected&&m.appendChild(y),!E&&y.isConnected&&y.remove(),E?m.setAttribute("aria-required","true"):m.removeAttribute("aria-required");}function k(E){h.classList.toggle("is-disabled",!!E);}function A(E){!E&&S&&S.isConnected?S.remove():E&&S?S.textContent=E:E&&!S&&h.appendChild(x("div",{className:"lg-label-hint"},E));}return {root:h,labelEl:m,hintEl:S,setText:v,setTone:C,setRequired:I,setDisabled:k,setHint:A}}function ar(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function fo(e,t){const n=document.createElement("span");n.className=`btn-ico btn-ico--${t}`;const r=ar(e);return r&&n.appendChild(r),n}function nh(){const e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.marginRight="6px",t.style.display="none",t.style.flexShrink="0";const n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");const r=document.createElementNS(e,"animate");r.setAttribute("attributeName","stroke-dasharray"),r.setAttribute("values","1,150;90,150;90,150"),r.setAttribute("dur","1.5s"),r.setAttribute("repeatCount","indefinite");const o=document.createElementNS(e,"animateTransform");return o.setAttribute("attributeName","transform"),o.setAttribute("attributeType","XML"),o.setAttribute("type","rotate"),o.setAttribute("from","0 12 12"),o.setAttribute("to","360 12 12"),o.setAttribute("dur","1s"),o.setAttribute("repeatCount","indefinite"),n.appendChild(r),n.appendChild(o),t.appendChild(n),t}function qt(e={}){const{label:t="",id:n,variant:r="default",size:o="md",iconLeft:a,iconRight:i,loading:s=false,tooltip:l,type:d="button",onClick:c,disabled:u=false,fullWidth:p=false}=e,f=x("button",{className:"btn",id:n});f.type=d,r==="primary"&&f.classList.add("primary"),r==="danger"&&f.classList.add("danger"),o==="sm"&&f.classList.add("btn--sm"),l&&(f.title=l),p&&(f.style.width="100%");const g=nh(),h=a?fo(a,"left"):null,m=i?fo(i,"right"):null,b=document.createElement("span");b.className="btn-label";const y=ar(t);y&&b.appendChild(y),!y&&(h||m)&&f.classList.add("btn--icon"),f.appendChild(g),h&&f.appendChild(h),f.appendChild(b),m&&f.appendChild(m);const w=u||s;f.disabled=w,f.setAttribute("aria-busy",String(!!s)),g.style.display=s?"inline-block":"none",c&&f.addEventListener("click",c);const S=f;return S.setLoading=T=>{f.setAttribute("aria-busy",String(!!T)),g.style.display=T?"inline-block":"none",f.disabled=T||u;},S.setDisabled=T=>{f.disabled=T||f.getAttribute("aria-busy")==="true";},S.setLabel=T=>{b.replaceChildren();const v=ar(T);v&&b.appendChild(v),!v&&(h||m)?f.classList.add("btn--icon"):f.classList.remove("btn--icon");},S.setIconLeft=T=>{if(T==null){h?.remove();return}h?h.replaceChildren(ar(T)):f.insertBefore(fo(T,"left"),b);},S.setIconRight=T=>{if(T==null){m?.remove();return}m?m.replaceChildren(ar(T)):f.appendChild(fo(T,"right"));},S.setVariant=T=>{f.classList.remove("primary","danger"),T==="primary"&&f.classList.add("primary"),T==="danger"&&f.classList.add("danger");},S}function Rn(e={}){const{id:t,checked:n=false,disabled:r=false,size:o="md",label:a,labelSide:i="right",onChange:s}=e,l=x("div",{className:"lg-switch-wrap"}),d=x("button",{className:`lg-switch lg-switch--${o}`,id:t,type:"button",role:"switch","aria-checked":String(!!n),"aria-disabled":String(!!r),title:a??"Basculer"}),c=x("span",{className:"lg-switch-track"}),u=x("span",{className:"lg-switch-thumb"});d.append(c,u);let p=null;a&&i!=="none"&&(p=x("span",{className:"lg-switch-label"},a)),p&&i==="left"?l.append(p,d):p&&i==="right"?l.append(d,p):l.append(d);let f=!!n,g=!!r;function h(){d.classList.toggle("on",f),d.setAttribute("aria-checked",String(f)),d.disabled=g,d.setAttribute("aria-disabled",String(g));}function m(k=false){g||(f=!f,h(),k||s?.(f));}function b(k){k.preventDefault(),m();}function y(k){g||((k.key===" "||k.key==="Enter")&&(k.preventDefault(),m()),k.key==="ArrowLeft"&&(k.preventDefault(),S(false)),k.key==="ArrowRight"&&(k.preventDefault(),S(true)));}d.addEventListener("click",b),d.addEventListener("keydown",y);function w(){return f}function S(k,A=false){f=!!k,h(),A||s?.(f);}function T(k){g=!!k,h();}function v(k){if(!k){p&&(p.remove(),p=null);return}p?p.textContent=k:(p=x("span",{className:"lg-switch-label"},k),l.append(p));}function C(){d.focus();}function I(){d.removeEventListener("click",b),d.removeEventListener("keydown",y);}return h(),{root:l,button:d,isChecked:w,setChecked:S,setDisabled:T,setLabel:v,focus:C,destroy:I}}let $d=null,Ss=null;function rh(){return $d}function oh(e){$d=e,Ss=null;}function Bd(){return Ss}function ah(e){Ss=e;}function ih(){try{const e=window.visualViewport,t=Math.round((e?.width??window.innerWidth)||0),n=Math.round((e?.height??window.innerHeight)||0);if(t&&n)return t>=n?"landscape":"portrait"}catch{}return "unknown"}function Dd(){const e=navigator.userAgent||"",t=navigator.platform||"",n=navigator.userAgentData;if(n&&typeof n.platform=="string"){const o=n.platform.toLowerCase();if(o.includes("windows"))return "windows";if(o.includes("mac"))return "mac";if(o.includes("android"))return "android";if(o.includes("chrome os")||o.includes("cros"))return "chromeos";if(o.includes("linux"))return "linux";if(o.includes("ios"))return "ios"}return /iPhone|iPad|iPod/i.test(e)||t==="MacIntel"&&(navigator.maxTouchPoints??0)>1?"ios":/Android/i.test(e)?"android":/CrOS/i.test(e)?"chromeos":/Win/i.test(e)?"windows":/Mac/i.test(e)?"mac":/Linux/i.test(e)?"linux":"unknown"}function Gd(){const e=navigator.userAgent||"",t=navigator.userAgentData;if(t&&Array.isArray(t.brands)){const n=t.brands.map(i=>String(i.brand||i.brandName||i.brandVersion||i)),r=n.some(i=>/Edge/i.test(i)||/Microsoft Edge/i.test(i)),o=n.some(i=>/Opera/i.test(i)||/OPR/i.test(i)),a=n.some(i=>/Chrome|Chromium/i.test(i));if(r)return "Edge";if(o)return "Opera";if(a)return "Chrome";if(navigator.brave)return "Brave"}return /FxiOS/i.test(e)?"Firefox":/CriOS/i.test(e)?"Chrome":/EdgiOS/i.test(e)?"Edge":/OPiOS|OPR|Opera Mini|Opera/i.test(e)?"Opera":/Edg\//i.test(e)?"Edge":/OPR\//i.test(e)||/Opera/i.test(e)?"Opera":/Firefox/i.test(e)?"Firefox":/Safari/i.test(e)&&!/Chrome|Chromium|Edg|OPR/i.test(e)?"Safari":/Brave/i.test(e)||window.Brave||navigator.brave?"Brave":/Chrome|Chromium/i.test(e)?"Chrome":"Unknown"}function sh(){const e=rh();if(e)return e;const t=navigator.userAgent||"",n=navigator.userAgentData;return n&&typeof n.mobile=="boolean"?n.mobile?"mobile":"desktop":/Android|iPhone|iPad|iPod|Mobile/i.test(t)?"mobile":"desktop"}function lh(e){if(!e)return null;try{return new URL(e).hostname}catch{return null}}function zd(){try{return window.top!==window.self}catch{return  true}}function ch(){const e=zd(),t=lh(document.referrer);return e&&!!t&&/(^|\.)discord(app)?\.com$/i.test(t)?"discord":"web"}function Ca(){const e=Bd();if(e)return e;const t=ch(),n=sh(),r=Dd(),o=Gd(),a=zd(),i=window.screen||{},s=window.visualViewport,l=Math.round(window.innerWidth||document.documentElement.clientWidth||0),d=Math.round(window.innerHeight||document.documentElement.clientHeight||0),c=Math.round(s?.width??l),u=Math.round(s?.height??d),p=Math.round(i.width||0),f=Math.round(i.height||0),g=Math.round(i.availWidth||p),h=Math.round(i.availHeight||f),m=Number.isFinite(window.devicePixelRatio)?window.devicePixelRatio:1,b={surface:t,host:location.hostname,origin:location.origin,isInIframe:a,platform:n,browser:o,os:r,viewportWidth:l,viewportHeight:d,visualViewportWidth:c,visualViewportHeight:u,screenWidth:p,screenHeight:f,availScreenWidth:g,availScreenHeight:h,dpr:m,orientation:ih()};return ah(b),b}function dh(){return Ca().surface==="discord"}function uh(){return Ca().platform==="mobile"}function ph(){Ca();}function fh(){return Bd()!==null}const Ve={init:ph,isReady:fh,detect:Ca,isDiscord:dh,isMobile:uh,detectOS:Dd,detectBrowser:Gd,setPlatformOverride:oh};let sa=false;const ir=new Set;function gh(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}const Qe=e=>{const t=gh();if(t){for(const n of ir)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function hh(){sa||(sa=true,window.addEventListener("keydown",Qe,true),window.addEventListener("keypress",Qe,true),window.addEventListener("keyup",Qe,true),document.addEventListener("keydown",Qe,true),document.addEventListener("keypress",Qe,true),document.addEventListener("keyup",Qe,true));}function mh(){sa&&(sa=false,window.removeEventListener("keydown",Qe,true),window.removeEventListener("keypress",Qe,true),window.removeEventListener("keyup",Qe,true),document.removeEventListener("keydown",Qe,true),document.removeEventListener("keypress",Qe,true),document.removeEventListener("keyup",Qe,true));}function bh(e){return ir.size===0&&hh(),ir.add(e),()=>{ir.delete(e),ir.size===0&&mh();}}function xh(e,t,n,r){let o;switch(e){case "digits":o="0-9";break;case "alpha":o="\\p{L}";break;case "alphanumeric":o="\\p{L}0-9";break;default:return null}return t&&(o+=" "),n&&(o+="\\-"),r&&(o+="_"),new RegExp(`[^${o}]`,"gu")}function yh(e,t){return t?e.replace(t,""):e}function vh(e,t=0){if(!t)return e;let n;return((...r)=>{clearTimeout(n),n=setTimeout(()=>e(...r),t);})}function Hd(e={}){const{id:t,placeholder:n="",value:r="",mode:o="any",allowSpaces:a=false,allowDashes:i=false,allowUnderscore:s=false,maxLength:l,blockGameKeys:d=true,debounceMs:c=0,onChange:u,onEnter:p,label:f}=e,g=x("div",{className:"lg-input-wrap"}),h=x("input",{className:"input",id:t,placeholder:n});if(typeof l=="number"&&l>0&&(h.maxLength=l),r&&(h.value=r),f){const E=x("div",{className:"lg-input-label"},f);g.appendChild(E);}g.appendChild(h);const m=xh(o,a,i,s),b=()=>{const E=h.selectionStart??h.value.length,B=h.value.length,J=yh(h.value,m);if(J!==h.value){h.value=J;const D=B-J.length,G=Math.max(0,E-D);h.setSelectionRange(G,G);}},y=vh(()=>u?.(h.value),c);h.addEventListener("input",()=>{b(),y();}),h.addEventListener("paste",()=>queueMicrotask(()=>{b(),y();})),h.addEventListener("keydown",E=>{E.key==="Enter"&&p?.(h.value);});const w=d?bh(h):()=>{};function S(){return h.value}function T(E){h.value=E??"",b(),y();}function v(){h.focus();}function C(){h.blur();}function I(E){h.disabled=!!E;}function k(){return document.activeElement===h}function A(){w();}return {root:g,input:h,getValue:S,setValue:T,focus:v,blur:C,setDisabled:I,isFocused:k,destroy:A}}function Ae(e,t,n){return Math.min(n,Math.max(t,e))}function yr({h:e,s:t,v:n,a:r}){const o=(e%360+360)%360/60,a=n*t,i=a*(1-Math.abs(o%2-1));let s=0,l=0,d=0;switch(Math.floor(o)){case 0:s=a,l=i;break;case 1:s=i,l=a;break;case 2:l=a,d=i;break;case 3:l=i,d=a;break;case 4:s=i,d=a;break;default:s=a,d=i;break}const u=n-a,p=Math.round((s+u)*255),f=Math.round((l+u)*255),g=Math.round((d+u)*255);return {r:Ae(p,0,255),g:Ae(f,0,255),b:Ae(g,0,255),a:Ae(r,0,1)}}function jd({r:e,g:t,b:n,a:r}){const o=Ae(e,0,255)/255,a=Ae(t,0,255)/255,i=Ae(n,0,255)/255,s=Math.max(o,a,i),l=Math.min(o,a,i),d=s-l;let c=0;d!==0&&(s===o?c=60*((a-i)/d%6):s===a?c=60*((i-o)/d+2):c=60*((o-a)/d+4)),c<0&&(c+=360);const u=s===0?0:d/s;return {h:c,s:u,v:s,a:Ae(r,0,1)}}function Cs({r:e,g:t,b:n}){const r=o=>Ae(Math.round(o),0,255).toString(16).padStart(2,"0");return `#${r(e)}${r(t)}${r(n)}`.toUpperCase()}function wh({r:e,g:t,b:n,a:r}){const o=Ae(Math.round(r*255),0,255);return `${Cs({r:e,g:t,b:n})}${o.toString(16).padStart(2,"0")}`.toUpperCase()}function sr({r:e,g:t,b:n,a:r}){const o=Math.round(r*1e3)/1e3;return `rgba(${e}, ${t}, ${n}, ${o})`}function xn(e){let t=e.trim();if(!t||(t.startsWith("#")&&(t=t.slice(1)),![3,4,6,8].includes(t.length))||!/^[0-9a-fA-F]+$/.test(t))return null;(t.length===3||t.length===4)&&(t=t.split("").map(i=>i+i).join(""));let n=255;t.length===8&&(n=parseInt(t.slice(6,8),16),t=t.slice(0,6));const r=parseInt(t.slice(0,2),16),o=parseInt(t.slice(2,4),16),a=parseInt(t.slice(4,6),16);return {r,g:o,b:a,a:n/255}}function Ni(e){if(!e)return null;const t=e.trim();if(t.startsWith("#"))return xn(t);const n=t.match(/^rgba?\(([^)]+)\)$/i);if(n){const r=n[1].split(",").map(l=>l.trim());if(r.length<3)return null;const o=Number(r[0]),a=Number(r[1]),i=Number(r[2]),s=r[3]!=null?Number(r[3]):1;return [o,a,i,s].some(l=>Number.isNaN(l))?null:{r:o,g:a,b:i,a:s}}return null}function Sh(e,t){const n=Ni(e)??xn(e??"")??{r:244,g:67,b:54,a:1};return typeof t=="number"&&(n.a=Ae(t,0,1)),jd(n)}function Ch(e){return `#${e.trim().replace(/[^0-9a-fA-F#]/g,"").replace(/#/g,"")}`.slice(0,9).toUpperCase()}function kh(e){let t=e.trim();return t&&(/^rgba?\s*\(/i.test(t)?t=t.replace(/^rgba?/i,"rgba"):(t=t.replace(/^\(?(.*)\)?$/,"$1"),t=`rgba(${t})`),t=t.replace(/\s*\(\s*/,"("),t=t.replace(/\s*\)\s*$/,")"),t=t.replace(/\s*,\s*/g,", "),t)}function Gt(e){const t=yr(e),n=yr({...e,a:1});return {hsva:{...e},hex:Cs(n),hexa:wh(t),rgba:sr(t),alpha:e.a}}function Th(e={}){const{id:t,label:n="Color",value:r,alpha:o,defaultExpanded:a=false,detectMobile:i,onInput:s,onChange:l}=e,c=i?i():Ve.detect().platform==="mobile";let u=Sh(r,o);const p=We({id:t,className:"color-picker",title:n,padding:c?"md":"lg",variant:"soft",expandable:!c,defaultExpanded:!c&&a});p.classList.add(c?"color-picker--mobile":"color-picker--desktop");const f=p.querySelector(".card-header");f&&f.classList.add("color-picker__header");const g=f?.querySelector(".card-title"),h=x("button",{className:"color-picker__preview",type:"button",title:`Preview ${n}`,"aria-label":`Change ${n}`});g?g.prepend(h):f?f.prepend(h):p.prepend(h);const m=p.querySelector(".card-toggle");!c&&m&&h.addEventListener("click",()=>{p.classList.contains("card--collapsed")&&m.click();});const b=p.querySelector(".card-collapse");let y=null,w=null,S=null,T=null,v=null,C=null,I=null,k=null,A=null,E="hex";function B(O){const H=Gt(u);O==="input"?s?.(H):l?.(H);}function J(){const O=Gt(u);if(h.style.setProperty("--cp-preview-color",O.rgba),h.setAttribute("aria-label",`${n}: ${O.hexa}`),!c&&y&&w&&S&&T&&v&&C&&I){const H=yr({...u,s:1,v:1,a:1}),z=sr(H);y.style.setProperty("--cp-palette-hue",z),w.style.left=`${u.s*100}%`,w.style.top=`${(1-u.v)*100}%`,S.style.setProperty("--cp-alpha-gradient",`linear-gradient(180deg, ${sr({...H,a:1})} 0%, ${sr({...H,a:0})} 100%)`),T.style.top=`${(1-u.a)*100}%`,v.style.setProperty("--cp-hue-color",sr(yr({...u,v:1,s:1,a:1}))),C.style.left=`${u.h/360*100}%`;const $=u.a===1?O.hex:O.hexa,P=O.rgba,L=E==="hex"?$:P;I!==document.activeElement&&(I.value=L),I.setAttribute("aria-label",`${E.toUpperCase()} code for ${n}`),I.placeholder=E==="hex"?"#RRGGBB or #RRGGBBAA":"rgba(0, 0, 0, 1)",E==="hex"?I.maxLength=9:I.removeAttribute("maxLength"),I.dataset.mode=E,k&&(k.textContent=E.toUpperCase(),k.setAttribute("aria-label",E==="hex"?"Passer en saisie RGBA":"Revenir en saisie HEX"),k.setAttribute("aria-pressed",E==="rgba"?"true":"false"),k.classList.toggle("is-alt",E==="rgba"));}A&&A!==document.activeElement&&(A.value=O.hex);}function D(O,H=null){u={h:(O.h%360+360)%360,s:Ae(O.s,0,1),v:Ae(O.v,0,1),a:Ae(O.a,0,1)},J(),H&&B(H);}function G(O,H=null){D(jd(O),H);}function Y(O,H,z){O.addEventListener("pointerdown",$=>{$.preventDefault();const P=$.pointerId,L=W=>{W.pointerId===P&&H(W);},F=W=>{W.pointerId===P&&(document.removeEventListener("pointermove",L),document.removeEventListener("pointerup",F),document.removeEventListener("pointercancel",F),z?.(W));};H($),document.addEventListener("pointermove",L),document.addEventListener("pointerup",F),document.addEventListener("pointercancel",F);});}if(!c&&b){const O=b.querySelector(".card-body");if(O){O.classList.add("color-picker__body"),w=x("div",{className:"color-picker__palette-cursor"}),y=x("div",{className:"color-picker__palette"},w),T=x("div",{className:"color-picker__alpha-thumb"}),S=x("div",{className:"color-picker__alpha"},T),C=x("div",{className:"color-picker__hue-thumb"}),v=x("div",{className:"color-picker__hue"},C);const H=x("div",{className:"color-picker__main"},y,S),z=x("div",{className:"color-picker__hue-row"},v),$=Hd({blockGameKeys:true});I=$.input,I.classList.add("color-picker__hex-input"),I.value="",I.maxLength=9,I.spellcheck=false,I.inputMode="text",I.setAttribute("aria-label",`Hex code for ${n}`),k=x("button",{type:"button",className:"color-picker__mode-btn",textContent:"HEX","aria-pressed":"false","aria-label":"Passer en saisie RGBA"}),$.root.classList.add("color-picker__hex-wrap");const P=x("div",{className:"color-picker__hex-row"},k,$.root);O.replaceChildren(H,z,P),Y(y,F=>{if(!y||!w)return;const W=y.getBoundingClientRect(),xe=Ae((F.clientX-W.left)/W.width,0,1),Q=Ae((F.clientY-W.top)/W.height,0,1);D({...u,s:xe,v:1-Q},"input");},()=>B("change")),Y(S,F=>{if(!S)return;const W=S.getBoundingClientRect(),xe=Ae((F.clientY-W.top)/W.height,0,1);D({...u,a:1-xe},"input");},()=>B("change")),Y(v,F=>{if(!v)return;const W=v.getBoundingClientRect(),xe=Ae((F.clientX-W.left)/W.width,0,1);D({...u,h:xe*360},"input");},()=>B("change")),k.addEventListener("click",()=>{if(E=E==="hex"?"rgba":"hex",I){const F=Gt(u);I.value=E==="hex"?u.a===1?F.hex:F.hexa:F.rgba;}J(),I?.focus(),I?.select();}),I.addEventListener("input",()=>{if(E==="hex"){const F=Ch(I.value);if(F!==I.value){const W=I.selectionStart??F.length;I.value=F,I.setSelectionRange(W,W);}}});const L=()=>{const F=I.value;if(E==="hex"){const W=xn(F);if(!W){I.value=u.a===1?Gt(u).hex:Gt(u).hexa;return}const xe=F.startsWith("#")?F.slice(1):F,Q=xe.length===4||xe.length===8;W.a=Q?W.a:u.a,G(W,"change");}else {const W=kh(F),xe=Ni(W);if(!xe){I.value=Gt(u).rgba;return}G(xe,"change");}};I.addEventListener("change",L),I.addEventListener("blur",L),I.addEventListener("keydown",F=>{F.key==="Enter"&&(L(),I.blur());});}}return c&&(b&&b.remove(),A=x("input",{className:"color-picker__native",type:"color",value:Cs(yr({...u,a:1}))}),h.addEventListener("click",()=>A.click()),A.addEventListener("input",()=>{const O=xn(A.value);O&&(O.a=u.a,G(O,"input"),B("change"));}),p.appendChild(A)),J(),{root:p,isMobile:c,getValue:()=>Gt(u),setValue:(O,H)=>{const z=Ni(O)??xn(O)??xn("#FFFFFF");z&&(typeof H=="number"&&(z.a=H),G(z,null));}}}const Ih=window;function _h(){if(typeof unsafeWindow<"u"&&unsafeWindow)return unsafeWindow;const e=window.wrappedJSObject;return e&&e!==window?e:Ih}const Ah=_h(),N=Ah;function Ph(e){try{return !!e.isSecureContext}catch{return  false}}function ks(e){const t=e?.getRootNode?.();return t&&(t instanceof Document||t.host)?t:document}function Wd(){const e=navigator.platform||"",t=navigator.userAgent||"";return /Mac|iPhone|iPad|iPod/i.test(e)||/Mac OS|iOS/i.test(t)}async function Eh(){try{const e=await navigator.permissions?.query?.({name:"clipboard-write"});return e?e.state==="granted"||e.state==="prompt":!0}catch{return  true}}function Mh(e,t){const n=document.createElement("textarea");return n.value=e,n.setAttribute("readonly","true"),n.style.position="fixed",n.style.opacity="0",n.style.pointerEvents="none",n.style.top="0",t.appendChild?t.appendChild(n):document.body.appendChild(n),n}function Rh(e){try{const t=window.getSelection?.();if(!t)return !1;const n=document.createRange();return n.selectNodeContents(e),t.removeAllRanges(),t.addRange(n),!0}catch{return  false}}async function Lh(e){if(!("clipboard"in navigator))return {ok:false,method:"clipboard-write"};if(!Ph(N))return {ok:false,method:"clipboard-write"};if(!await Eh())return {ok:false,method:"clipboard-write"};try{return await navigator.clipboard.writeText(e),{ok:!0,method:"clipboard-write"}}catch{return {ok:false,method:"clipboard-write"}}}function Nh(e,t){try{const n=t||ks(),r=Mh(e,n);r.focus(),r.select(),r.setSelectionRange(0,r.value.length);let o=!1;try{o=document.execCommand("copy");}catch{o=!1;}return r.remove(),{ok:o,method:"execCommand"}}catch{return {ok:false,method:"execCommand"}}}function Fh(e,t){if(!t)return {ok:false,method:"selection"};const n=t.textContent??"";let r=false;if(n!==e)try{t.textContent=e,r=!0;}catch{}const o=Rh(t);r&&setTimeout(()=>{try{t.textContent=n;}catch{}},80);const a=Wd()?"⌘C pour copier":"Ctrl+C pour copier";return {ok:o,method:"selection",hint:a}}async function Oh(e,t={}){const n=(e??"").toString();if(!n.length)return {ok:false,method:"noop"};const r=await Lh(n);if(r.ok)return r;const o=t.injectionRoot||ks(t.valueNode||void 0),a=Nh(n,o);if(a.ok)return a;const i=Fh(n,t.valueNode||null);if(i.ok)return i;if(!t.disablePromptFallback)try{return window.prompt(Ve.isDiscord()?"Copie manuelle (Discord bloque clipboard):":"Copie manuelle:",n),{ok:!0,method:"prompt"}}catch{}return {ok:false,method:"noop"}}function $h(e,t,n={}){const r=o=>{if(n.showTip){n.showTip(o);return}try{e.setAttribute("aria-label",o);const a=document.createElement("div");a.textContent=o,a.style.position="absolute",a.style.top="-28px",a.style.right="0",a.style.padding="4px 8px",a.style.borderRadius="8px",a.style.fontSize="12px",a.style.background="color-mix(in oklab, var(--bg) 85%, transparent)",a.style.border="1px solid var(--border)",a.style.color="var(--fg)",a.style.pointerEvents="none",a.style.opacity="0",a.style.transition="opacity .12s";const i=ks(e);i.appendChild?i.appendChild(a):document.body.appendChild(a);const s=e.getBoundingClientRect();a.style.left=`${s.right-8}px`,a.style.top=`${s.top-28}px`,requestAnimationFrame(()=>a.style.opacity="1"),setTimeout(()=>{a.style.opacity="0",setTimeout(()=>a.remove(),150);},1200);}catch{}};e.addEventListener("click",async o=>{o.stopPropagation();const a=(t()??"").toString(),i=await Oh(a,{valueNode:n.valueNode??null,injectionRoot:n.injectionRoot??null,disablePromptFallback:n.disablePromptFallback??false});n.onResult?.(i),i.ok?i.method==="clipboard-write"||i.method==="execCommand"||i.method==="prompt"?r("Copié"):i.method==="selection"&&r(i.hint||(Wd()?"⌘C pour copier":"Ctrl+C pour copier")):r("Impossible de copier");});}const wn={light:{"--bg":"rgba(255,255,255,0.7)","--fg":"#0f172a","--muted":"rgba(15,23,42,0.06)","--soft":"rgba(15,23,42,0.04)","--accent":"#2563eb","--border":"rgba(15,23,42,0.12)","--shadow":"rgba(2,6,23,.2)","--paper":"#FDFBF7","--tab-bg":"#ffffff","--tab-fg":"#0f172a","--pill-from":"#4f46e5","--pill-to":"#06b6d4","--low":"#dc2626","--medium":"#f59e0b","--high":"#16a34a","--complete":"#15803d","--info":"#2563eb","--xp-fill":"#0febff","--accent-1":"#16a34a","--accent-2":"#7c3aed","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #b000b0, #d00000, #b08000, #008000, #0000b0, #4b0082, #9400d3)","--switch-thumb":"#ffffff","--journal-ink":"#333333"},dark:{"--bg":"rgba(10,12,18,0.6)","--fg":"#e5e7eb","--muted":"rgba(229,231,235,0.08)","--soft":"rgba(229,231,235,0.05)","--accent":"#60a5fa","--border":"rgba(148,163,184,0.2)","--shadow":"rgba(0,0,0,.45)","--paper":"#1a1d24","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#e5e7eb","--pill-from":"#6366f1","--pill-to":"#06b6d4","--low":"#ef4444","--medium":"#f59e0b","--high":"#22c55e","--complete":"#16a34a","--info":"#3b82f6","--xp-fill":"#0febff","--accent-1":"#22c55e","--accent-2":"#a855f7","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},sepia:{"--bg":"rgba(247,242,231,0.72)","--fg":"#3b2f2f","--muted":"rgba(59,47,47,0.06)","--soft":"rgba(59,47,47,0.04)","--accent":"#b07d62","--border":"rgba(59,47,47,0.14)","--shadow":"rgba(0,0,0,.18)","--paper":"#F5E6D3","--tab-bg":"#fff","--tab-fg":"#3b2f2f","--pill-from":"#b07d62","--pill-to":"#d4a373","--low":"#c2410c","--medium":"#d97706","--high":"#15803d","--complete":"#166534","--info":"#1d4ed8","--accent-1":"#15803d","--accent-2":"#6b21a8","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #b000b0, #d00000, #b08000, #008000, #0000b0, #4b0082, #9400d3)","--switch-thumb":"#ffffff","--journal-ink":"#3b2f2f"},forest:{"--bg":"rgba(14,24,18,0.62)","--fg":"#e7f5e9","--muted":"rgba(231,245,233,0.08)","--soft":"rgba(231,245,233,0.05)","--accent":"#34d399","--border":"rgba(231,245,233,0.16)","--shadow":"rgba(0,0,0,.5)","--paper":"#1e2820","--tab-bg":"rgba(255,255,255,0.06)","--tab-fg":"#e7f5e9","--pill-from":"#10b981","--pill-to":"#84cc16","--low":"#dc2626","--medium":"#eab308","--high":"#22c55e","--complete":"#16a34a","--info":"#06b6d4","--accent-1":"#22c55e","--accent-2":"#8b5cf6","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},violet:{"--bg":"rgba(23, 16, 42, 0.68)","--fg":"#f5f3ff","--muted":"rgba(245,243,255,0.08)","--soft":"rgba(245,243,255,0.05)","--accent":"#a855f7","--border":"rgba(216,180,254,0.22)","--shadow":"rgba(12,3,30,.55)","--paper":"#1a1424","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#ede9fe","--pill-from":"#a855f7","--pill-to":"#f472b6","--low":"#f43f5e","--medium":"#fbbf24","--high":"#4ade80","--complete":"#22c55e","--info":"#60a5fa","--accent-1":"#4ade80","--accent-2":"#c084fc","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},ocean:{"--bg":"rgba(10, 34, 46, 0.66)","--fg":"#e0f7ff","--muted":"rgba(224,247,255,0.07)","--soft":"rgba(224,247,255,0.05)","--accent":"#38bdf8","--border":"rgba(125, 211, 252, 0.22)","--shadow":"rgba(0, 16, 32, .52)","--paper":"#0f2027","--tab-bg":"rgba(56,189,248,0.14)","--tab-fg":"#e0f7ff","--pill-from":"#0ea5e9","--pill-to":"#14b8a6","--low":"#f43f5e","--medium":"#fbbf24","--high":"#34d399","--complete":"#10b981","--info":"#38bdf8","--accent-1":"#22c55e","--accent-2":"#a78bfa","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},ember:{"--bg":"rgba(34,18,10,0.64)","--fg":"#fff7ed","--muted":"rgba(255,247,237,0.08)","--soft":"rgba(255,247,237,0.05)","--accent":"#f97316","--border":"rgba(255, 159, 92, 0.24)","--shadow":"rgba(16,6,2,.52)","--paper":"#1a1210","--tab-bg":"rgba(255,247,237,0.09)","--tab-fg":"#fff7ed","--pill-from":"#fb923c","--pill-to":"#facc15","--low":"#dc2626","--medium":"#f59e0b","--high":"#22c55e","--complete":"#16a34a","--info":"#38bdf8","--accent-1":"#22c55e","--accent-2":"#c084fc","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},magicGarden:{"--bg":"#201D1D","--fg":"#F5F5F5","--muted":"rgba(255,255,255,0.6)","--soft":"rgba(0,0,0,0.3)","--accent":"#FFF27D","--border":"rgba(255,255,255,0.1)","--border-accent":"#4A3B2E","--shadow":"rgba(0,0,0,0.5)","--paper":"#FDFBF7","--card-shadow":"0 4px 10px rgba(0, 0, 0, 0.5)","--tab-bg":"#10725A","--tab-fg":"#F5F5F5","--section-title":"#10725A","--group-title":"#5EB292","--item-label":"#F5F5F5","--item-desc":"rgba(255,255,255,0.6)","--item-value":"#FFF27D","--card-bg":"rgba(0,0,0,0.3)","--card-radius":"12px","--card-border":"#4A3B2E","--pill-from":"#FFF27D","--pill-to":"#5EB292","--scrollbar-thumb":"rgba(255,255,255,0.2)","--scrollbar-thumb-hover":"rgba(255,255,255,0.3)","--low":"#F98B4B","--medium":"#F3D32B","--high":"#5EAC46","--complete":"#0B893F","--info":"#38bdf8","--accent-1":"#4caf50","--accent-2":"#9c27b0","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--rainbow-text-gradient":"linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #00ffff, #ff00ff)","--switch-thumb":"#ffffff","--journal-ink":"#000000"}};function Bh(e){const{host:t,themes:n,initialTheme:r,onThemeChange:o}=e;let a=r,i=null,s=false;function l(c){const u=n[c]||n[a]||{};t.setAttribute("data-theme",c),s&&t.classList.add("theme-anim");for(const[p,f]of Object.entries(u))t.style.setProperty(p,f);s?(i!==null&&clearTimeout(i),i=N.setTimeout(()=>{t.classList.remove("theme-anim"),i=null;},320)):s=true,a=c,o?.(c);}function d(){return a}return l(r),{applyTheme:l,getCurrentTheme:d}}const Fi={ui:{expandedCards:{style:false,hudSections:false,enhancements:false,system:false}}};async function Dh(){const e=await Xr("tab-settings",{version:1,defaults:Fi,sanitize:o=>({ui:{expandedCards:Vl(Fi.ui.expandedCards,o.ui?.expandedCards)}})});function t(o){const a=e.get();e.update({ui:{...a.ui,...o,expandedCards:Vl(a.ui.expandedCards,o.expandedCards)}});}function n(o,a){const i=e.get();e.update({ui:{...i.ui,expandedCards:{...i.ui.expandedCards,[o]:!!a}}});}function r(o){const a=e.get();n(o,!a.ui.expandedCards[o]);}return {get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:r}}class Gh{constructor(){R(this,"injections",new Map);R(this,"state",{});R(this,"initialized",false);}register(t){if(this.injections.has(t.id)){console.warn(`[InjectionRegistry] ${t.id} already registered`);return}this.injections.set(t.id,t),this.loadState(t.id),console.log(`[InjectionRegistry] Registered: ${t.name}`);}initAll(){if(!this.initialized){for(const[t,n]of this.injections)if(this.state[t]??n.defaultEnabled??false)try{n.injection.init();}catch(o){console.error(`[InjectionRegistry] Failed to init ${t}:`,o);}this.initialized=true,console.log("[InjectionRegistry] All injections initialized");}}destroyAll(){for(const[,t]of this.injections)try{t.injection.destroy();}catch(n){console.error(`[InjectionRegistry] Failed to destroy ${t.id}:`,n);}this.initialized=false,console.log("[InjectionRegistry] All injections destroyed");}setEnabled(t,n){const r=this.injections.get(t);if(!r){console.warn(`[InjectionRegistry] Unknown injection: ${t}`);return}this.state[t]=n,this.saveState(t),n?r.injection.init():r.injection.destroy(),console.log(`[InjectionRegistry] ${r.name} ${n?"enabled":"disabled"}`);}getAll(){return Array.from(this.injections.values())}isEnabled(t){return this.state[t]??false}loadState(t){const n=this.injections.get(t);if(!n)return;const r=ye(n.storageKey,n.defaultEnabled??false);this.state[t]=r;}saveState(t){const n=this.injections.get(t);n&&Te(n.storageKey,this.state[t]);}}let ei=null;function Ud(){return ei||(ei=new Gh),ei}function Vd(e){return e.replace(/[_-]+/g," ").replace(/^\w/,t=>t.toUpperCase())}function zh(){return Object.keys(wn).map(e=>({value:e,label:Vd(e)}))}const Hh=["--bg","--fg","--accent","--muted","--soft","--border","--shadow","--paper","--tab-bg","--tab-fg","--pill-from","--pill-to","--low","--medium","--high","--complete","--info","--accent-1","--accent-2","--accent-3"];function jh(e){return Vd(e.replace(/^--/,""))}function Wh(e){return e.alpha<1?e.rgba:e.hex}const At={pets:{enabled:true},journalChecker:{enabled:true},autoFavorite:{enabled:true},bulkFavorite:{enabled:false},cropSizeIndicator:{enabled:false},eggProbabilityIndicator:{enabled:false},cropValueIndicator:{enabled:true}};class Uh extends sn{constructor(n){super({id:"tab-settings",label:"Settings"});R(this,"featureConfig",At);this.deps=n;}async build(n){const r=this.createGrid("12px");r.id="settings",n.appendChild(r);let o;try{o=await Dh();}catch{o={get:()=>Fi,set:()=>{},save:()=>{},setUI:()=>{},setCardExpanded:()=>{},toggleCard:()=>{}};}const a=o.get(),i=ye(we.CONFIG,{});this.featureConfig=this.mergeFeatureConfig(i);const s=Object.keys(wn),l=this.deps.getCurrentTheme?.()??this.deps.initialTheme,d=s.includes(l)?l:s[0]??"dark";let c=d;const u=Od({text:"Theme",tone:"muted",size:"lg"}),p=Fd({options:zh(),value:d,onChange:y=>{c=y,this.deps.applyTheme(y),this.renderThemePickers(y,f,c);}}),f=x("div",{className:"settings-theme-grid"}),g=We({title:"Style",padding:"lg",expandable:true,defaultExpanded:!!a.ui.expandedCards.style,onExpandChange:y=>o.setCardExpanded("style",y)},x("div",{className:"kv settings-theme-row"},u.root,p.root),f);this.renderThemePickers(d,f,c);const h=this.createHUDSectionsCard({defaultExpanded:!!a.ui.expandedCards.hudSections,onExpandChange:y=>o.setCardExpanded("hudSections",y)}),m=this.createEnhancementsCard({defaultExpanded:!!a.ui.expandedCards.enhancements,onExpandChange:y=>o.setCardExpanded("enhancements",y)}),b=this.createEnvCard({defaultExpanded:!!a.ui.expandedCards.system,onExpandChange:y=>o.setCardExpanded("system",y)});r.appendChild(g),r.appendChild(h),r.appendChild(m),r.appendChild(b);}mergeFeatureConfig(n){return {pets:{...At.pets,...n.pets},journalChecker:{...At.journalChecker,...n.journalChecker},autoFavorite:{...At.autoFavorite,...n.autoFavorite},bulkFavorite:{...At.bulkFavorite,...n.bulkFavorite},cropSizeIndicator:{...At.cropSizeIndicator,...n.cropSizeIndicator},eggProbabilityIndicator:{...At.eggProbabilityIndicator,...n.eggProbabilityIndicator},cropValueIndicator:{...At.cropValueIndicator,...n.cropValueIndicator}}}saveFeatureConfig(){Te(we.CONFIG,this.featureConfig),console.log("[Settings] Feature config saved:",this.featureConfig);}createHUDSectionsCard(n){const r=(o,a,i,s,l=false,d=false)=>{const c=x("div",{style:`
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 12px;
          padding: ${l?"0":"12px"} 0 ${d?"0":"12px"} 0;
          ${d?"":"border-bottom: 1px solid var(--border);"}
          transition: opacity 0.2s ease;
          opacity: ${a?"1":"0.5"};
        `}),u=x("div"),p=x("div",{style:"font-weight: 500; margin-bottom: 4px;"},o),f=x("div",{style:"font-size: 12px; color: var(--fg); opacity: 0.7;"},s);u.append(p,f);const g=Rn({checked:a,onChange:h=>{c.style.opacity=h?"1":"0.5",i(h);}});return c.append(u,g.root),c};return We({title:"HUD Sections",padding:"lg",expandable:true,defaultExpanded:n?.defaultExpanded??false,onExpandChange:n?.onExpandChange},x("div",{},r("Auto-Favorite",this.featureConfig.autoFavorite.enabled,o=>{this.featureConfig.autoFavorite.enabled=o,this.saveFeatureConfig();},"Automatic mutation favoriting settings",true),r("Journal Checker",this.featureConfig.journalChecker.enabled,o=>{this.featureConfig.journalChecker.enabled=o,this.saveFeatureConfig();},"Track collection completion progress"),r("Pets",this.featureConfig.pets.enabled,o=>{this.featureConfig.pets.enabled=o,this.saveFeatureConfig();},"Pet management and team tracking",false,true)))}createSectionRow(n,r,o,a,i=false,s=false){const l=x("div",{style:`
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 12px;
        padding: ${i?"0":"12px"} 0 ${s?"0":"12px"} 0;
        ${s?"":"border-bottom: 1px solid var(--border);"}
        transition: opacity 0.2s ease;
        opacity: ${r?"1":"0.5"};
      `}),d=x("div"),c=x("div",{style:"font-weight: 500; margin-bottom: 4px;"},n),u=x("div",{style:"font-size: 12px; color: var(--fg); opacity: 0.7;"},a);d.append(c,u);const p=Rn({checked:r,onChange:f=>{l.style.opacity=f?"1":"0.5",o(f);}});return l.append(d,p.root),l}createEnhancementsCard(n){const r=Ud(),a=[...r.getAll()].sort((s,l)=>s.name.localeCompare(l.name)),i=a.map((s,l)=>{const d=l===0,c=l===a.length-1,u=r.isEnabled(s.id);return this.createSectionRow(s.name,u,p=>{r.setEnabled(s.id,p),this.saveFeatureConfig();},s.description,d,c)});return We({title:"In-Game Enhancements",variant:"soft",padding:"lg",expandable:true,defaultExpanded:n?.defaultExpanded??false,onExpandChange:n?.onExpandChange},x("div",{},...i))}renderThemePickers(n,r,o){const a=wn[n];if(r.replaceChildren(),!!a)for(const i of Hh){const s=a[i];if(s==null)continue;const l=Th({label:jh(i),value:s,defaultExpanded:false,onInput:d=>this.updateThemeVar(n,i,d,o),onChange:d=>this.updateThemeVar(n,i,d,o)});r.appendChild(l.root);}}updateThemeVar(n,r,o,a){const i=wn[n];i&&(i[r]=Wh(o),a===n&&this.deps.applyTheme(n));}createEnvCard(n){const r=n?.defaultExpanded??false,o=n?.onExpandChange,a=(b,y)=>{const w=x("div",{className:"kv kv--inline-mobile"}),S=x("label",{},b),T=x("div",{className:"ro"});return typeof y=="string"?T.textContent=y:T.append(y),w.append(S,T),w},i=x("code",{},"—"),s=x("span",{},"—"),l=x("span",{},"—"),d=x("span",{},"—"),c=x("span",{},"—"),u=x("span",{},"—"),p=()=>{const b=Ve.detect();l.textContent=b.surface,d.textContent=b.platform,c.textContent=b.browser??"Unknown",u.textContent=b.os??"Unknown",i.textContent=b.host,s.textContent=b.isInIframe?"Yes":"No";},f=qt({label:"Copy JSON",variant:"primary",size:"sm"});$h(f,()=>{const b=Ve.detect();return JSON.stringify(b,null,2)});const g=x("div",{style:"width:100%;display:flex;justify-content:center;"},f),h=We({title:"System",variant:"soft",padding:"lg",footer:g,expandable:true,defaultExpanded:r,onExpandChange:o},a("Surface",l),a("Platform",d),a("Browser",c),a("OS",u),a("Host",i),a("Iframe",s)),m=()=>{document.hidden||p();};return document.addEventListener("visibilitychange",m),p(),this.addCleanup(()=>document.removeEventListener("visibilitychange",m)),h}}function ka(e){const{id:t,columns:n,data:r,pageSize:o=0,stickyHeader:a=true,zebra:i=true,animations:s=true,respectReducedMotion:l=true,compact:d=false,maxHeight:c,selectable:u=false,selectionType:p="switch",selectOnRowClick:f=false,initialSelection:g=[],hideHeaderCheckbox:h=false,getRowId:m=(q,ee)=>String(ee),onSortChange:b,onSelectionChange:y,onRowClick:w}=e;let S=n.slice(),T=r.slice(),v=r.slice(),C=null,I=null,k=1;const A=typeof window<"u"&&typeof window.matchMedia=="function"?window.matchMedia("(prefers-reduced-motion: reduce)").matches:false,E=!!s&&!(l&&A),B=x("div",{className:"lg-table-wrap",id:t});if(c!=null){const q=typeof c=="number"?`${c}px`:c;B.style.setProperty("--tbl-max-h",q);}const J=x("div",{className:"lg-table"}),D=x("div",{className:"lg-thead"}),G=x("div",{className:"lg-tbody"}),Y=x("div",{className:"lg-tfoot"});a&&B.classList.add("sticky"),i&&B.classList.add("zebra"),d&&B.classList.add("compact"),u&&B.classList.add("selectable");const O=p==="switch"?"52px":"36px";B.style.setProperty("--check-w",O);function H(q){return q==="center"?"center":q==="right"?"flex-end":"flex-start"}function z(){const q=S.map(se=>{const ue=(se.width||"1fr").trim();return /\bfr$/.test(ue)?`minmax(0, ${ue})`:ue}),ee=(u?[O,...q]:q).join(" ");B.style.setProperty("--lg-cols",ee);}z();function $(){return o?Math.max(1,Math.ceil(T.length/o)):1}function P(){if(!o)return T;const q=(k-1)*o;return T.slice(q,q+o)}function L(){if(!C||!I)return;const q=S.find(ue=>String(ue.key)===C),ee=I==="asc"?1:-1,se=q?.sortFn?(ue,me)=>ee*q.sortFn(ue,me):(ue,me)=>{const oe=ue[C],ie=me[C];return oe==null&&ie==null?0:oe==null?-1*ee:ie==null?1*ee:typeof oe=="number"&&typeof ie=="number"?ee*(oe-ie):ee*String(oe).localeCompare(String(ie),void 0,{numeric:true,sensitivity:"base"})};T.sort(se);}const F=new Set(g);function W(){return Array.from(F)}const xe=new Map;function Q(q){F.clear(),q.forEach(ee=>F.add(ee)),Se(),xe.forEach((ee,se)=>{ee.setChecked(F.has(se),true);}),Xn(),y?.(W());}function X(){F.clear(),Se(),xe.forEach(q=>q.setChecked(false,true)),Xn(),y?.(W());}let pe=null;function Se(){if(!pe)return;const q=P();if(!q.length){pe.indeterminate=false,pe.checked=false;return}const ee=q.map((ue,me)=>m(ue,(k-1)*(o||0)+me)),se=ee.reduce((ue,me)=>ue+(F.has(me)?1:0),0);pe.checked=se===ee.length,pe.indeterminate=se>0&&se<ee.length;}let Dt=false;function _g(){Dt=false;const q=G.offsetWidth-G.clientWidth;D.style.paddingRight=q>0?`${q}px`:"0px";}function Vn(){Dt||(Dt=true,requestAnimationFrame(_g));}const Ja=new ResizeObserver(()=>Vn()),Dl=()=>Vn();function Ag(){D.replaceChildren();const q=x("div",{className:"lg-tr lg-tr-head"});if(u){const ee=x("div",{className:"lg-th lg-th-check"});h||(pe=x("input",{type:"checkbox"}),pe.addEventListener("change",()=>{const se=P(),ue=pe.checked;se.forEach((me,oe)=>{const ie=m(me,(k-1)*(o||0)+oe);ue?F.add(ie):F.delete(ie);}),y?.(W()),Xn();}),ee.appendChild(pe)),q.appendChild(ee);}S.forEach(ee=>{const se=x("button",{className:"lg-th",type:"button",title:ee.title||ee.header});se.textContent=ee.header,ee.align&&se.style.setProperty("--col-justify",H(ee.align)),ee.sortable&&se.classList.add("sortable"),C===String(ee.key)&&I?se.setAttribute("data-sort",I):se.removeAttribute("data-sort"),ee.sortable&&se.addEventListener("click",()=>{const ue=String(ee.key);C!==ue?(C=ue,I="asc"):(I=I==="asc"?"desc":I==="desc"?null:"asc",I||(C=null,T=v.slice())),b?.(C,I),C&&I&&L(),lo();}),q.appendChild(se);}),D.appendChild(q);try{Ja.disconnect();}catch{}Ja.observe(G),Vn();}function Qa(q){return Array.from(q.querySelectorAll(":scope > .lg-td, :scope > .lg-td-check"))}function Gl(q){return q.querySelector(".lg-td, .lg-td-check")}function zl(q){const ee=Gl(q);return ee?ee.getBoundingClientRect():null}function Xn(){const q=P(),ee=new Map;Array.from(G.children).forEach(oe=>{const ie=oe,$e=ie.getAttribute("data-id");if(!$e)return;const qe=zl(ie);qe&&ee.set($e,qe);});const se=new Map;Array.from(G.children).forEach(oe=>{const ie=oe,$e=ie.getAttribute("data-id");$e&&se.set($e,ie);});const ue=[];for(let oe=0;oe<q.length;oe++){const ie=q[oe],$e=(o?(k-1)*o:0)+oe,qe=m(ie,$e);ue.push(qe);let Ce=se.get(qe);Ce||(Ce=Pg(ie,$e),E&&Qa(Ce).forEach(qn=>{qn.style.transform="translateY(6px)",qn.style.opacity="0";})),G.appendChild(Ce);}const me=[];if(se.forEach((oe,ie)=>{ue.includes(ie)||me.push(oe);}),!E){me.forEach(oe=>oe.remove()),Se(),Vn();return}ue.forEach(oe=>{const ie=G.querySelector(`.lg-tr-body[data-id="${oe}"]`);if(!ie)return;const $e=zl(ie),qe=ee.get(oe),Ce=Qa(ie);if(qe&&$e){const gt=qe.left-$e.left,pn=qe.top-$e.top;Ce.forEach(_t=>{_t.style.transition="none",_t.style.transform=`translate(${gt}px, ${pn}px)`,_t.style.opacity="1";}),Gl(ie)?.getBoundingClientRect(),Ce.forEach(_t=>{_t.style.willChange="transform, opacity",_t.style.transition="transform .18s ease, opacity .18s ease";}),requestAnimationFrame(()=>{Ce.forEach(_t=>{_t.style.transform="translate(0,0)";});});}else Ce.forEach(gt=>{gt.style.transition="transform .18s ease, opacity .18s ease";}),requestAnimationFrame(()=>{Ce.forEach(gt=>{gt.style.transform="translate(0,0)",gt.style.opacity="1";});});const Za=gt=>{(gt.propertyName==="transform"||gt.propertyName==="opacity")&&(Ce.forEach(pn=>{pn.style.willChange="",pn.style.transition="",pn.style.transform="",pn.style.opacity="";}),gt.currentTarget.removeEventListener("transitionend",Za));},qn=Ce[0];qn&&qn.addEventListener("transitionend",Za);}),me.forEach(oe=>{const ie=Qa(oe);ie.forEach(Ce=>{Ce.style.willChange="transform, opacity",Ce.style.transition="transform .18s ease, opacity .18s ease",Ce.style.opacity="0",Ce.style.transform="translateY(-6px)";});const $e=Ce=>{Ce.propertyName==="opacity"&&(Ce.currentTarget.removeEventListener("transitionend",$e),oe.remove());},qe=ie[0];qe?qe.addEventListener("transitionend",$e):oe.remove();}),Se(),Vn();}function Pg(q,ee){const se=m(q,ee),ue=x("div",{className:"lg-tr lg-tr-body","data-id":se});if(u){const me=x("div",{className:"lg-td lg-td-check"});if(p==="switch"){const oe=Rn({size:"sm",checked:F.has(se),onChange:ie=>{ie?F.add(se):F.delete(se),Se(),y?.(W());}});xe.set(se,oe),me.appendChild(oe.root);}else {const oe=x("input",{type:"checkbox",className:"lg-row-check"});oe.checked=F.has(se),oe.addEventListener("change",ie=>{ie.stopPropagation(),oe.checked?F.add(se):F.delete(se),Se(),y?.(W());}),oe.addEventListener("click",ie=>ie.stopPropagation()),me.appendChild(oe);}ue.appendChild(me);}return S.forEach(me=>{const oe=x("div",{className:"lg-td"});me.align&&oe.style.setProperty("--col-justify",H(me.align));let ie=me.render?me.render(q,ee):String(q[me.key]??"");typeof ie=="string"?oe.textContent=ie:oe.appendChild(ie),ue.appendChild(oe);}),(w||u&&f)&&(ue.classList.add("clickable"),ue.addEventListener("click",me=>{if(!me.target.closest(".lg-td-check")){if(u&&f){const oe=!F.has(se);if(oe?F.add(se):F.delete(se),Se(),p==="switch"){const ie=xe.get(se);ie&&ie.setChecked(oe,true);}else {const ie=ue.querySelector(".lg-row-check");ie&&(ie.checked=oe);}y?.(W());}w?.(q,ee,me);}})),ue}function Hl(){if(Y.replaceChildren(),!o)return;const q=$(),ee=x("div",{className:"lg-pager"}),se=x("button",{className:"btn",type:"button"},"←"),ue=x("button",{className:"btn",type:"button"},"→"),me=x("span",{className:"lg-pager-info"},`${k} / ${q}`);se.disabled=k<=1,ue.disabled=k>=q,se.addEventListener("click",()=>so(k-1)),ue.addEventListener("click",()=>so(k+1)),ee.append(se,me,ue),Y.appendChild(ee);}function so(q){const ee=$();k=Math.min(Math.max(1,q),ee),Xn(),Hl();}function lo(){z(),Ag(),Xn(),Hl();}function Eg(q){v=q.slice(),T=q.slice(),C&&I&&L(),so(1);}function Mg(q){S=q.slice(),lo();}function Rg(q,ee="asc"){C=q,I=q?ee:null,C&&I?L():T=v.slice(),lo();}function Lg(){try{Ja.disconnect();}catch{}window.removeEventListener("resize",Dl);}return J.append(D,G,Y),B.appendChild(J),window.addEventListener("resize",Dl),lo(),{root:B,setData:Eg,setColumns:Mg,sortBy:Rg,getSelection:W,setSelection:Q,clearSelection:X,setPage:so,getState:()=>({page:k,pageCount:$(),sortKey:C,sortDir:I}),destroy:Lg}}let la=false;const lr=new Set;function Vh(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}const Ze=e=>{const t=Vh();if(t){for(const n of lr)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function Xh(){la||(la=true,window.addEventListener("keydown",Ze,true),window.addEventListener("keypress",Ze,true),window.addEventListener("keyup",Ze,true),document.addEventListener("keydown",Ze,true),document.addEventListener("keypress",Ze,true),document.addEventListener("keyup",Ze,true));}function qh(){la&&(la=false,window.removeEventListener("keydown",Ze,true),window.removeEventListener("keypress",Ze,true),window.removeEventListener("keyup",Ze,true),document.removeEventListener("keydown",Ze,true),document.removeEventListener("keypress",Ze,true),document.removeEventListener("keyup",Ze,true));}function Kh(e){return lr.size===0&&Xh(),lr.add(e),()=>{lr.delete(e),lr.size===0&&qh();}}function go(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function Yh(){const e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.display="none",t.style.flexShrink="0";const n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");const r=document.createElementNS(e,"animate");r.setAttribute("attributeName","stroke-dasharray"),r.setAttribute("values","1,150;90,150;90,150"),r.setAttribute("dur","1.5s"),r.setAttribute("repeatCount","indefinite");const o=document.createElementNS(e,"animateTransform");return o.setAttribute("attributeName","transform"),o.setAttribute("attributeType","XML"),o.setAttribute("type","rotate"),o.setAttribute("from","0 12 12"),o.setAttribute("to","360 12 12"),o.setAttribute("dur","1s"),o.setAttribute("repeatCount","indefinite"),n.append(r,o),t.appendChild(n),t}function Ta(e={}){const{id:t,placeholder:n="Search...",value:r="",size:o="md",disabled:a=false,autoFocus:i=false,onChange:s,onSearch:l,autoSearch:d=false,debounceMs:c=0,focusKey:u="/",iconLeft:p,iconRight:f,withClear:g=true,clearTitle:h="Clear",ariaLabel:m,submitLabel:b,loading:y=false,blockGameKeys:w=true}=e,S=x("div",{className:"search"+(o?` search--${o}`:""),id:t}),T=x("span",{className:"search-ico search-ico--left"});if(p){const X=go(p);X&&T.appendChild(X);}else T.textContent="🔎",T.style.opacity=".9";const v=x("input",{className:"input search-input",type:"text",placeholder:n,value:r,"aria-label":m||n}),C=x("span",{className:"search-ico search-ico--right"});if(f){const X=go(f);X&&C.appendChild(X);}const I=Yh();I.classList.add("search-spinner");const k=g?x("button",{className:"search-clear",type:"button",title:h},"×"):null,A=b!=null?x("button",{className:"btn search-submit",type:"button"},b):null,E=x("div",{className:"search-field"},T,v,C,I,...k?[k]:[]);S.append(E,...A?[A]:[]);let B=!!a,J=null;function D(X){I.style.display=X?"inline-block":"none",S.classList.toggle("is-loading",X);}function G(){J!=null&&(window.clearTimeout(J),J=null);}function Y(X){G(),c>0?J=window.setTimeout(()=>{J=null,X();},c):X();}function O(){s?.(v.value),d&&l&&l(v.value);}v.addEventListener("input",()=>{Y(O);}),v.addEventListener("keydown",X=>{X.key==="Enter"?(X.preventDefault(),G(),l?.(v.value)):X.key==="Escape"&&(v.value.length>0?$("",{notify:true}):v.blur());}),k&&k.addEventListener("click",()=>$("",{notify:true})),A&&A.addEventListener("click",()=>l?.(v.value));let H=()=>{};if(w&&(H=Kh(v)),u){const X=pe=>{if(pe.key===u&&!pe.ctrlKey&&!pe.metaKey&&!pe.altKey){const Se=document.activeElement;Se&&(Se.tagName==="INPUT"||Se.tagName==="TEXTAREA"||Se.isContentEditable)||(pe.preventDefault(),v.focus());}};window.addEventListener("keydown",X,true),S.__cleanup=()=>{window.removeEventListener("keydown",X,true),H();};}else S.__cleanup=()=>{H();};function z(X){B=!!X,v.disabled=B,k&&(k.disabled=B),A&&(A.disabled=B),S.classList.toggle("disabled",B);}function $(X,pe={}){const Se=v.value;v.value=X??"",pe.notify&&Se!==X&&Y(O);}function P(){return v.value}function L(){v.focus();}function F(){v.blur();}function W(X){v.placeholder=X;}function xe(X){$("",X);}return z(B),D(y),i&&L(),{root:S,input:v,getValue:P,setValue:$,focus:L,blur:F,setDisabled:z,setPlaceholder:W,clear:xe,setLoading:D,setIconLeft(X){T.replaceChildren();const pe=go(X??"🔎");pe&&T.appendChild(pe);},setIconRight(X){C.replaceChildren();const pe=go(X??"");pe&&C.appendChild(pe);}}}const Ia=e=>new Promise(t=>setTimeout(t,e)),ct=e=>{try{return e()}catch{return}},yt=(e,t,n)=>Math.max(t,Math.min(n,e)),Jh=e=>yt(e,0,1);async function Xl(e,t,n){const r=performance.now();for(;performance.now()-r<t;){const o=await Promise.race([e,Ia(50).then(()=>null)]);if(o!==null)return o}throw new Error(`${n} timeout`)}let Ts=null;function Xd(){return Ts}function Qh(e){Ts=e;}function qd(){return Ts!==null}const Zh=/\/(?:r\/\d+\/)?version\/([^/]+)/,em=15e3,tm=50;function nm(){return N?.document??(typeof document<"u"?document:null)}function Is(e={}){if(qd())return;const t=e.doc??nm();if(!t)return;const n=t.scripts;for(let r=0;r<n.length;r++){const a=n.item(r)?.src;if(!a)continue;const i=a.match(Zh);if(i?.[1]){Qh(i[1]);return}}}function rm(){return Is(),Xd()}function om(){return qd()}async function am(e={}){const t=e.timeoutMs??em,n=performance.now();for(;performance.now()-n<t;){Is();const r=Xd();if(r)return r;await Ia(tm);}throw new Error("MGVersion timeout (gameVersion not found)")}const _s={init:Is,isReady:om,get:rm,wait:am},im=N?.location?.origin||"https://magicgarden.gg";function Kd(){return typeof GM_xmlhttpRequest=="function"}function Yd(e,t="text"){return new Promise((n,r)=>{GM_xmlhttpRequest({method:"GET",url:e,responseType:t,onload:o=>o.status>=200&&o.status<300?n(o):r(new Error(`HTTP ${o.status} for ${e}`)),onerror:()=>r(new Error(`Network error for ${e}`)),ontimeout:()=>r(new Error(`Timeout for ${e}`))});})}async function As(e){if(Kd())return JSON.parse((await Yd(e,"text")).responseText);const t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.json()}async function Jd(e){if(Kd())return (await Yd(e,"blob")).response;const t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.blob()}function sm(e){return new Promise((t,n)=>{const r=URL.createObjectURL(e),o=N?.Image||Image,a=new o;a.decoding="async",a.onload=()=>{URL.revokeObjectURL(r),t(a);},a.onerror=()=>{URL.revokeObjectURL(r),n(new Error("Image decode failed"));},a.src=r;})}const Ct=(e,t)=>e.replace(/\/?$/,"/")+String(t||"").replace(/^\//,""),lm=e=>e.lastIndexOf("/")>=0?e.slice(0,e.lastIndexOf("/")+1):"",ql=(e,t)=>String(t||"").startsWith("/")?String(t).slice(1):lm(e)+String(t||"");let Ps=null,Qd=null;function cm(){return Ps}function dm(){return Qd}function um(e){Ps=e;}function pm(e){Qd=e;}function Zd(){return Ps!==null}const fm=15e3;async function gm(e={}){Zd()||await Es(e);}async function Es(e={}){const t=cm();if(t)return t;const n=dm();if(n)return n;const r=(async()=>{const o=e.gameVersion??await _s.wait({timeoutMs:fm}),a=`${im}/version/${o}/assets/`;return um(a),a})();return pm(r),r}async function hm(e){const t=await Es();return Ct(t,e)}function mm(){return Zd()}const ln={init:gm,isReady:mm,base:Es,url:hm},eu=new Map;function bm(e){return eu.get(e)}function xm(e,t){eu.set(e,t);}const tu="manifest.json";let Oi=null;async function ym(){Oi||(Oi=await nu());}function vm(){return Oi!==null}async function nu(e={}){const t=e.baseUrl??await ln.base(),n=bm(t);if(n)return n;const r=As(Ct(t,tu));return xm(t,r),r}function wm(e,t){return e.bundles.find(n=>n.name===t)??null}function Sm(e){if(!e)return [];const t=new Set;for(const n of e.assets)for(const r of n.src??[])typeof r=="string"&&r.endsWith(".json")&&r!==tu&&t.add(r);return Array.from(t)}const kt={init:ym,isReady:vm,load:nu,getBundle:wm,listJsonFromBundle:Sm},Cm=N,lt=Cm.Object??Object,_a=lt.keys,ca=lt.values,da=lt.entries,Kl=new WeakSet;function km(){return {data:{items:null,decor:null,mutations:null,eggs:null,pets:null,abilities:null,plants:null,weather:null},isHookInstalled:false,scanInterval:null,scanAttempts:0,weatherPollingTimer:null,weatherPollAttempts:0,colorPollingTimer:null,colorPollAttempts:0}}const Z=km(),zt={items:["WateringCan","PlanterPot","Shovel"],decor:["SmallRock","MediumRock","LargeRock","WoodBench","StoneBench","MarbleBench"],mutations:["Gold","Rainbow","Wet","Chilled","Frozen"],eggs:["CommonEgg","UncommonEgg","RareEgg"],pets:["Worm","Snail","Bee","Chicken","Bunny"],abilities:["ProduceScaleBoost","DoubleHarvest","SeedFinderI","CoinFinderI"],plants:["Carrot","Strawberry","Aloe","Blueberry","Apple"]},Tm=["Rain","Frost","Dawn","AmberMoon"],Yl=/main-[^/]+\.js(\?|$)/,Im=6,_m=150,Am=2e3,Pm=200,Em=50,Mm=10,Rm=1e3,$i="ProduceScaleBoost",Ht=(e,t)=>t.every(n=>e.includes(n));function jt(e,t){Z.data[e]==null&&(Z.data[e]=t,ua()&&au());}function ua(){return Object.values(Z.data).every(e=>e!=null)}function ru(e,t){if(!e||typeof e!="object"||Kl.has(e))return;Kl.add(e);let n;try{n=_a(e);}catch{return}if(!n||n.length===0)return;const r=e;let o;if(!Z.data.items&&Ht(n,zt.items)&&(o=r.WateringCan,o&&typeof o=="object"&&"coinPrice"in o&&"creditPrice"in o&&jt("items",r)),!Z.data.decor&&Ht(n,zt.decor)&&(o=r.SmallRock,o&&typeof o=="object"&&"coinPrice"in o&&"creditPrice"in o&&jt("decor",r)),!Z.data.mutations&&Ht(n,zt.mutations)&&(o=r.Gold,o&&typeof o=="object"&&"baseChance"in o&&"coinMultiplier"in o&&jt("mutations",r)),!Z.data.eggs&&Ht(n,zt.eggs)&&(o=r.CommonEgg,o&&typeof o=="object"&&"faunaSpawnWeights"in o&&"secondsToHatch"in o&&jt("eggs",r)),!Z.data.pets&&Ht(n,zt.pets)&&(o=r.Worm,o&&typeof o=="object"&&"coinsToFullyReplenishHunger"in o&&"diet"in o&&Array.isArray(o.diet)&&jt("pets",r)),!Z.data.abilities&&Ht(n,zt.abilities)&&(o=r.ProduceScaleBoost,o&&typeof o=="object"&&"trigger"in o&&"baseParameters"in o&&jt("abilities",r)),!Z.data.plants&&Ht(n,zt.plants)&&(o=r.Carrot,o&&typeof o=="object"&&"seed"in o&&"plant"in o&&"crop"in o&&jt("plants",r)),!(t>=Im))for(const a of n){let i;try{i=r[a];}catch{continue}i&&typeof i=="object"&&ru(i,t+1);}}function Uo(e){try{ru(e,0);}catch{}}function ou(){if(!Z.isHookInstalled){if(lt.__MG_HOOKED__){Z.isHookInstalled=true;return}lt.__MG_HOOKED__=true,Z.isHookInstalled=true;try{lt.keys=function(t){return Uo(t),_a.apply(this,arguments)},ca&&(lt.values=function(t){return Uo(t),ca.apply(this,arguments)}),da&&(lt.entries=function(t){return Uo(t),da.apply(this,arguments)});}catch{}}}function au(){if(Z.isHookInstalled){try{lt.keys=_a,ca&&(lt.values=ca),da&&(lt.entries=da);}catch{}Z.isHookInstalled=false;}}function Lm(){if(Z.scanInterval||ua())return;const e=()=>{if(ua()||Z.scanAttempts>_m){iu();return}Z.scanAttempts++;try{_a(N).forEach(t=>{try{Uo(N[t]);}catch{}});}catch{}};e(),Z.scanInterval=setInterval(e,Am);}function iu(){Z.scanInterval&&(clearInterval(Z.scanInterval),Z.scanInterval=null);}const Jl=N;function Nm(){try{for(const e of Jl.document?.scripts||[]){const t=e?.src?String(e.src):"";if(Yl.test(t))return t}}catch{}try{for(const e of Jl.performance?.getEntriesByType?.("resource")||[]){const t=e?.name?String(e.name):"";if(Yl.test(t))return t}}catch{}return null}function Fm(e,t){const n=[];let r=e.indexOf(t);for(;r!==-1;)n.push(r),r=e.indexOf(t,r+t.length);return n}function Ms(e,t){let n=0,r="",o=false;for(let a=t;a<e.length;a++){const i=e[a];if(r){if(o){o=false;continue}if(i==="\\"){o=true;continue}i===r&&(r="");continue}if(i==='"'||i==="'"||i==="`"){r=i;continue}if(i==="{")n++;else if(i==="}"&&--n===0)return e.slice(t,a+1)}return null}let ti=null,Kn=null;async function su(){return ti||Kn||(Kn=(async()=>{const e=Nm();if(!e)return null;try{const t=await fetch(e,{credentials:"include"});if(!t.ok)return null;const n=await t.text();return ti=n,n}catch{return null}finally{Kn=null;}})(),Kn)}function Om(e){const t={};let n=false;for(const r of Tm){const o=e?.[r];if(!o||typeof o!="object")continue;const a=o.iconSpriteKey||null,{iconSpriteKey:i,...s}=o;t[r]={weatherId:r,spriteId:a,...s},n=true;}return t.Sunny||(t.Sunny={weatherId:"Sunny",name:"Sunny",spriteId:"sprite/ui/SunnyIcon",type:"primary"}),!n||t.Rain&&t.Rain.mutator?.mutation!=="Wet"?null:t}function $m(e,t){const n=Math.max(0,t-3e3),r=e.substring(n,t),o=/Rain:\{/,a=r.match(o);if(!a||a.index===void 0)return null;const i=n+a.index;let s=-1;for(let l=i-1;l>=Math.max(0,i-200);l--)if(e[l]==="{"){s=l;break}return s<0?null:Ms(e,s)}async function Bm(){if(Z.data.weather)return  true;const e=await su();if(!e)return  false;let t=e.indexOf("fixedTimeSlots:[0,48,96,144,192,240]");if(t<0&&(t=e.indexOf('name:"Amber Moon"')),t<0)return  false;const n=$m(e,t);if(!n)return  false;const r=n.replace(/\$t\.(Rain|Frost|Dawn|AmberMoon)\b/g,'"$1"');let o;try{o=Function('"use strict";return('+r+")")();}catch{return  false}const a=Om(o);return a?(Z.data.weather=a,true):false}function Dm(){if(Z.weatherPollingTimer)return;Z.weatherPollAttempts=0;const e=setInterval(async()=>{(await Bm()||++Z.weatherPollAttempts>Pm)&&(clearInterval(e),Z.weatherPollingTimer=null);},Em);Z.weatherPollingTimer=e;}function Gm(){Z.weatherPollingTimer&&(clearInterval(Z.weatherPollingTimer),Z.weatherPollingTimer=null);}const zm={bg:"rgba(100, 100, 100, 0.9)",hover:"rgba(150, 150, 150, 1)"};function Hm(e){const t=Fm(e,$i);if(!t.length)return null;for(const n of t){const r=Math.max(0,n-4e3),o=Math.min(e.length,n+4e3),i=e.slice(r,o).lastIndexOf("switch(");if(i===-1)continue;const s=r+i,l=e.indexOf("{",s);if(l===-1)continue;const d=Ms(e,l);if(d&&d.includes($i)&&(d.includes('bg:"')||d.includes("bg:'")))return d}return null}function jm(e){const t={},n=[],r=/case\s*(['"])([^'"]+)\1\s*:|default\s*:|return\s*\{/g,o=(i,s)=>{const l=new RegExp(`${s}\\s*:\\s*(['"])([\\s\\S]*?)\\1`),d=i.match(l);return d?d[2]:null};let a;for(;(a=r.exec(e))!==null;){if(a[2]){n.push(a[2]);continue}const i=a[0];if(i.startsWith("default")){n.length=0;continue}if(!i.startsWith("return"))continue;const s=e.indexOf("{",a.index);if(s===-1){n.length=0;continue}const l=Ms(e,s);if(!l){n.length=0;continue}const d=o(l,"bg");if(!d){n.length=0;continue}const c=o(l,"hover")||d;for(const u of n)t[u]||(t[u]={bg:d,hover:c});n.length=0;}return Object.keys(t).length?t:null}async function Wm(){const e=await su();if(!e)return null;const t=Hm(e);return t?jm(t):null}function Um(e){const t=e[$i];return t!=null&&typeof t=="object"&&"color"in t}async function Vm(){if(!Z.data.abilities)return  false;const e=Z.data.abilities;if(Um(e))return  true;const t=await Wm();if(!t)return  false;const n={};for(const[r,o]of Object.entries(e)){const a=t[r]||zm;n[r]={...o,color:{bg:a.bg,hover:a.hover}};}return Z.data.abilities=n,console.log("[MGData] Enriched abilities with colors"),true}function Xm(){if(Z.colorPollingTimer)return;Z.colorPollAttempts=0;const e=setInterval(async()=>{(await Vm()||++Z.colorPollAttempts>Mm)&&(clearInterval(e),Z.colorPollingTimer=null);},Rm);Z.colorPollingTimer=e;}function qm(){Z.colorPollingTimer&&(clearInterval(Z.colorPollingTimer),Z.colorPollingTimer=null);}function Km(){return {ready:false,app:null,renderer:null,ctors:null,baseUrl:null,textures:new Map,animations:new Map,live:new Set,defaultParent:null,overlay:null,categoryIndex:null}}function Ym(){return {lru:new Map,cost:0,srcCanvas:new Map}}function Jm(){return {cache:new Map,maxEntries:200}}const Qm={enabled:true,maxEntries:200,maxCost:800,srcCanvasMax:100},Zm={enabled:true,maxEntries:200},Le=Km(),eb=Ym(),tb={...Qm},nb=Jm(),rb={...Zm};function Ge(){return Le}function Ln(){return eb}function Rr(){return tb}function Lr(){return nb}function Bi(){return rb}function lu(){return Le.ready}const Ql=Function.prototype.bind,fe={_bindPatched:false,engine:null,tos:null,app:null,renderer:null,ticker:null,stage:null};let cu,du,uu;const ob=new Promise(e=>{cu=e;}),ab=new Promise(e=>{du=e;}),ib=new Promise(e=>{uu=e;});function sb(e){return !!(e&&typeof e=="object"&&typeof e.start=="function"&&typeof e.destroy=="function"&&e.app&&e.app.stage&&e.app.renderer&&e.systems&&typeof e.systems.values=="function")}function lb(e){try{for(const t of e.systems.values()){const n=t?.system;if(n?.name==="tileObject")return n}}catch{}return null}function cb(e){fe.engine=e,fe.tos=lb(e)||null,fe.app=e.app||null,fe.renderer=e.app?.renderer||null,fe.ticker=e.app?.ticker||null,fe.stage=e.app?.stage||null;try{cu(e);}catch{}try{fe.app&&du(fe.app);}catch{}try{fe.renderer&&uu(fe.renderer);}catch{}}function Rs(){return fe.engine?true:(fe._bindPatched||(fe._bindPatched=true,Function.prototype.bind=function(e,...t){const n=Ql.call(this,e,...t);try{!fe.engine&&sb(e)&&(Function.prototype.bind=Ql,fe._bindPatched=!1,cb(e));}catch{}return n}),false)}Rs();async function db(e=15e3){const t=performance.now();for(;performance.now()-t<e;){if(fe.engine)return  true;Rs(),await Ia(50);}throw new Error("MGPixiHooks: engine capture timeout")}async function ub(e=15e3){return fe.engine||await db(e),true}function pb(){return fe.engine&&fe.app?{ok:true,engine:fe.engine,tos:fe.tos,app:fe.app}:(Rs(),{ok:false,engine:fe.engine,tos:fe.tos,app:fe.app,note:"Not captured. Wait for room, or reload."})}const et={engineReady:ob,appReady:ab,rendererReady:ib,engine:()=>fe.engine,tos:()=>fe.tos,app:()=>fe.app,renderer:()=>fe.renderer,ticker:()=>fe.ticker,stage:()=>fe.stage,PIXI:()=>N.PIXI||null,init:ub,hook:pb,ready:()=>!!fe.engine};function pa(e){const t=String(e||"").trim();return t?t.startsWith("sprite/")||t.startsWith("sprites/")?t:t.includes("/")?`sprite/${t}`:t:""}function qr(e,t){const n=String(e||"").trim().replace(/^sprites?\//,"").replace(/^\/+|\/+$/g,""),r=String(t||"").trim();return r.includes("/")||!n?pa(r):`sprite/${n}/${r}`}function Nr(e,t,n,r){const o=qr(e,t);if(n.has(o)||r.has(o))return o;const a=String(t||"").trim();if(n.has(a)||r.has(a))return a;const i=pa(a);return n.has(i)||r.has(i)?i:o}function fb(e,t,n=25e3){const r=[e],o=new Set;let a=0;for(;r.length&&a++<n;){const i=r.pop();if(!i||o.has(i))continue;if(o.add(i),t(i))return i;const s=i.children;if(Array.isArray(s))for(let l=s.length-1;l>=0;l--)r.push(s[l]);}return null}function gb(e){const t=N.PIXI;if(t?.Texture&&t?.Sprite&&t?.Container&&t?.Rectangle)return {Container:t.Container,Sprite:t.Sprite,Texture:t.Texture,Rectangle:t.Rectangle,AnimatedSprite:t.AnimatedSprite||null};const n=e?.stage,r=fb(n,o=>o?.texture?.frame&&o?.constructor&&o?.texture?.constructor&&o?.texture?.frame?.constructor);if(!r)throw new Error("No Sprite found yet (constructors).");return {Container:n.constructor,Sprite:r.constructor,Texture:r.texture.constructor,Rectangle:r.texture.frame.constructor,AnimatedSprite:t?.AnimatedSprite||null}}async function hb(e,t=15e3){const n=performance.now();for(;performance.now()-n<t;)try{return gb(e)}catch{await Ia(50);}throw new Error("Constructors timeout")}const Wt=(...e)=>{try{console.log("[MGSprite]",...e);}catch{}};function mb(e){return e&&typeof e=="object"&&e.frames&&e.meta&&typeof e.meta.image=="string"}function ni(e,t,n,r,o){return new e(t,n,r,o)}function bb(e,t,n,r,o,a,i){let s;try{s=new e({source:t.source,frame:n,orig:r,trim:o||void 0,rotate:a||0});}catch{s=new e(t.baseTexture||t,n,r,o||void 0,a||0);}if(i)if(s.defaultAnchor?.set)try{s.defaultAnchor.set(i.x,i.y);}catch{}else s.defaultAnchor?(s.defaultAnchor.x=i.x,s.defaultAnchor.y=i.y):s.defaultAnchor={x:i.x,y:i.y};try{s.updateUvs?.();}catch{}return s}function xb(e,t,n,r){const{Texture:o,Rectangle:a}=r;for(const[i,s]of Object.entries(e.frames)){const l=s.frame,d=!!s.rotated,c=d?2:0,u=d?l.h:l.w,p=d?l.w:l.h,f=ni(a,l.x,l.y,u,p),g=s.sourceSize||{w:l.w,h:l.h},h=ni(a,0,0,g.w,g.h);let m=null;if(s.trimmed&&s.spriteSourceSize){const b=s.spriteSourceSize;m=ni(a,b.x,b.y,b.w,b.h);}n.set(i,bb(o,t,f,h,m,c,s.anchor||null));}}function yb(e,t,n){if(!(!e.animations||typeof e.animations!="object"))for(const[r,o]of Object.entries(e.animations)){if(!Array.isArray(o))continue;const a=o.map(i=>t.get(i)).filter(Boolean);a.length>=2&&n.set(r,a);}}function vb(e,t){const n=(r,o)=>{const a=String(r||"").trim(),i=String(o||"").trim();!a||!i||(t.has(a)||t.set(a,new Set),t.get(a).add(i));};for(const r of Object.keys(e.frames||{})){const o=/^sprite\/([^/]+)\/(.+)$/.exec(r);o&&n(o[1],o[2]);}}async function wb(e,t){const n=await kt.load({baseUrl:e}),r=kt.getBundle(n,"default");if(!r)throw new Error("No default bundle in manifest");const o=kt.listJsonFromBundle(r),a=new Set,i=new Map,s=new Map,l=new Map;async function d(c){if(a.has(c))return;a.add(c);const u=await As(Ct(e,c));if(!mb(u))return;const p=u.meta?.related_multi_packs;if(Array.isArray(p))for(const m of p)await d(ql(c,m));const f=ql(c,u.meta.image),g=await sm(await Jd(Ct(e,f))),h=t.Texture.from(g);xb(u,h,i,t),yb(u,i,s),vb(u,l);}for(const c of o)await d(c);return {textures:i,animations:s,categoryIndex:l}}let ho=null;async function Sb(){return Le.ready?true:ho||(ho=(async()=>{const e=performance.now();Wt("init start");const t=await Xl(et.appReady,15e3,"PIXI app");Wt("app ready");const n=await Xl(et.rendererReady,15e3,"PIXI renderer");Wt("renderer ready"),Le.app=t,Le.renderer=n||t?.renderer||null,Le.ctors=await hb(t),Wt("constructors resolved"),Le.baseUrl=await ln.base(),Wt("base url",Le.baseUrl);const{textures:r,animations:o,categoryIndex:a}=await wb(Le.baseUrl,Le.ctors);return Le.textures=r,Le.animations=o,Le.categoryIndex=a,Wt("atlases loaded","textures",Le.textures.size,"animations",Le.animations.size,"categories",Le.categoryIndex?.size??0),Le.ready=true,Wt("ready in",Math.round(performance.now()-e),"ms"),true})(),ho)}const Nn={Gold:{overlayTall:null,tallIconOverride:null},Rainbow:{overlayTall:null,tallIconOverride:null,angle:130,angleTall:0},Wet:{overlayTall:"sprite/mutation-overlay/WetTallPlant",tallIconOverride:"sprite/mutation/Puddle"},Chilled:{overlayTall:"sprite/mutation-overlay/ChilledTallPlant",tallIconOverride:null},Frozen:{overlayTall:"sprite/mutation-overlay/FrozenTallPlant",tallIconOverride:null},Dawnlit:{overlayTall:null,tallIconOverride:null},Ambershine:{overlayTall:null,tallIconOverride:null},Dawncharged:{overlayTall:null,tallIconOverride:null},Ambercharged:{overlayTall:null,tallIconOverride:null}},pu=Object.keys(Nn),Cb=["Gold","Rainbow","Wet","Chilled","Frozen","Ambershine","Dawnlit","Dawncharged","Ambercharged"],Zl=new Map(Cb.map((e,t)=>[e,t]));function fa(e){return [...new Set(e.filter(Boolean))].sort((n,r)=>(Zl.get(n)??1/0)-(Zl.get(r)??1/0))}const kb=["Wet","Chilled","Frozen"],Tb=new Set(["Dawnlit","Ambershine","Dawncharged","Ambercharged"]),Ib={Banana:.6,Carrot:.6,Sunflower:.5,Starweaver:.5,FavaBean:.25,BurrosTail:.2},_b={Pepper:.5,Banana:.6},Ab=256,Pb=.5,Eb=2;function fu(e){if(!e.length)return {muts:[],overlayMuts:[],selectedMuts:[],sig:""};const t=fa(e),n=Mb(e),r=Rb(e);return {muts:n,overlayMuts:r,selectedMuts:t,sig:`${t.join(",")}|${n.join(",")}|${r.join(",")}`}}function Mb(e){const t=e.filter((o,a,i)=>Nn[o]&&i.indexOf(o)===a);if(!t.length)return [];if(t.includes("Gold"))return ["Gold"];if(t.includes("Rainbow"))return ["Rainbow"];const n=["Ambershine","Dawnlit","Dawncharged","Ambercharged"];return t.some(o=>n.includes(o))?fa(t.filter(o=>!kb.includes(o))):fa(t)}function Rb(e){const t=e.filter((n,r,o)=>Nn[n]?.overlayTall&&o.indexOf(n)===r);return fa(t)}function ri(e,t){return e.map(n=>({name:n,meta:Nn[n],overlayTall:Nn[n]?.overlayTall??null,isTall:t}))}const Lb={Gold:{op:"source-atop",colors:["rgb(235,200,0)"],a:.7},Rainbow:{op:"color",colors:["#FF1744","#FF9100","#FFEA00","#00E676","#2979FF","#D500F9"],ang:130,angTall:0,masked:true},Wet:{op:"source-atop",colors:["rgb(50,180,200)"],a:.25},Chilled:{op:"source-atop",colors:["rgb(100,160,210)"],a:.45},Frozen:{op:"source-atop",colors:["rgb(100,130,220)"],a:.5},Dawnlit:{op:"source-atop",colors:["rgb(209,70,231)"],a:.5},Ambershine:{op:"source-atop",colors:["rgb(190,100,40)"],a:.5},Dawncharged:{op:"source-atop",colors:["rgb(140,80,200)"],a:.5},Ambercharged:{op:"source-atop",colors:["rgb(170,60,25)"],a:.5}},mo=(()=>{try{const t=document.createElement("canvas").getContext("2d");if(!t)return new Set;const n=["color","hue","saturation","luminosity","overlay","screen","lighter","source-atop"],r=new Set;for(const o of n)t.globalCompositeOperation=o,t.globalCompositeOperation===o&&r.add(o);return r}catch{return new Set}})();function Nb(e){return mo.has(e)?e:mo.has("overlay")?"overlay":mo.has("screen")?"screen":mo.has("lighter")?"lighter":"source-atop"}function Fb(e,t,n,r,o=false){const a=(r-90)*Math.PI/180,i=t/2,s=n/2;if(!o){const u=Math.min(t,n)/2;return e.createLinearGradient(i-Math.cos(a)*u,s-Math.sin(a)*u,i+Math.cos(a)*u,s+Math.sin(a)*u)}const l=Math.cos(a),d=Math.sin(a),c=Math.abs(l)*t/2+Math.abs(d)*n/2;return e.createLinearGradient(i-l*c,s-d*c,i+l*c,s+d*c)}function ec(e,t,n,r,o=false){const a=r.colors?.length?r.colors:["#fff"],i=r.ang!=null?Fb(e,t,n,r.ang,o):e.createLinearGradient(0,0,0,n);a.length===1?(i.addColorStop(0,a[0]),i.addColorStop(1,a[0])):a.forEach((s,l)=>i.addColorStop(l/(a.length-1),s)),e.fillStyle=i,e.fillRect(0,0,t,n);}function Ob(e,t,n,r){const o=Lb[n];if(!o)return;const a={...o};n==="Rainbow"&&r&&a.angTall!=null&&(a.ang=a.angTall);const i=n==="Rainbow"&&r,s=t.width,l=t.height;e.save();const d=a.masked?Nb(a.op):"source-in";if(e.globalCompositeOperation=d,a.a!=null&&(e.globalAlpha=a.a),a.masked){const c=document.createElement("canvas");c.width=s,c.height=l;const u=c.getContext("2d");u.imageSmoothingEnabled=false,ec(u,s,l,a,i),u.globalCompositeOperation="destination-in",u.drawImage(t,0,0),e.drawImage(c,0,0);}else ec(e,s,l,a,i);e.restore();}function $b(e){return /tallplant/i.test(e)}function Ls(e){const t=String(e||"").split("/");return t[t.length-1]||""}function gu(e){switch(e){case "Ambershine":return ["Ambershine","Amberlit"];case "Dawncharged":return ["Dawncharged","Dawnbound"];case "Ambercharged":return ["Ambercharged","Amberbound"];default:return [e]}}function Bb(e,t){const n=String(e||"").toLowerCase();for(const r of t.keys()){const o=/sprite\/mutation-overlay\/([A-Za-z0-9]+)TallPlant/i.exec(String(r));if(!o||!o[1])continue;if(o[1].toLowerCase()===n){const i=t.get(r);if(i)return {tex:i,key:r}}}return null}function Db(e,t,n,r){if(!t)return null;const o=Ls(e),a=gu(t);for(const i of a){const s=[`sprite/mutation/${i}${o}`,`sprite/mutation/${i}-${o}`,`sprite/mutation/${i}_${o}`,`sprite/mutation/${i}/${o}`,`sprite/mutation/${i}`];for(const l of s){const d=n.get(l);if(d)return {tex:d,key:l}}{const l=`sprite/mutation-overlay/${i}TallPlant`,d=n.get(l);if(d)return {tex:d,key:l};const c=`sprite/mutation-overlay/${i}`,u=n.get(c);if(u)return {tex:u,key:c};const p=Bb(t,n);if(p)return p}}return null}function Gb(e,t,n,r){if(!t)return null;const o=Nn[t];if(n&&o?.tallIconOverride){const s=r.get(o.tallIconOverride);if(s)return s}const a=Ls(e),i=gu(t);for(const s of i){const l=[`sprite/mutation/${s}Icon`,`sprite/mutation/${s}`,`sprite/mutation/${s}${a}`,`sprite/mutation/${s}-${a}`,`sprite/mutation/${s}_${a}`,`sprite/mutation/${s}/${a}`];for(const d of l){const c=r.get(d);if(c)return c}if(n){const d=`sprite/mutation-overlay/${s}TallPlantIcon`,c=r.get(d);if(c)return c;const u=`sprite/mutation-overlay/${s}TallPlant`,p=r.get(u);if(p)return p}}return null}function zb(e,t,n){const r=e?.orig?.width??e?.frame?.width??e?.width??1,o=e?.orig?.height??e?.frame?.height??e?.height??1,a=e?.defaultAnchor?.x??0,i=e?.defaultAnchor?.y??0;let s=_b[t]??a;const l=o>r*1.5;let d=Ib[t]??(l?i:.4);const c={x:(s-a)*r,y:(d-i)*o},u=Math.min(r,o),p=Math.min(1.5,u/Ab);let f=Pb*p;return n&&(f*=Eb),{width:r,height:o,anchorX:a,anchorY:i,offset:c,iconScale:f}}function hu(e,t){return `${t.sig}::${e}`}function mu(e){return e?e.isAnim?e.frames?.length||0:e.tex?1:0:0}function Hb(e,t,n){e.lru.delete(t),e.lru.set(t,n);}function jb(e,t){if(t.enabled)for(;e.lru.size>t.maxEntries||e.cost>t.maxCost;){const n=e.lru.keys().next().value;if(n===void 0)break;const r=e.lru.get(n);e.lru.delete(n),e.cost=Math.max(0,e.cost-mu(r??null));}}function bu(e,t){const n=e.lru.get(t);return n?(Hb(e,t,n),n):null}function xu(e,t,n,r){e.lru.set(t,n),e.cost+=mu(n),jb(e,r);}function Wb(e){e.lru.clear(),e.cost=0,e.srcCanvas.clear();}function Ub(e,t){return e.srcCanvas.get(t)??null}function Vb(e,t,n,r){if(e.srcCanvas.set(t,n),e.srcCanvas.size>r.srcCanvasMax){const o=e.srcCanvas.keys().next().value;o!==void 0&&e.srcCanvas.delete(o);}}function Aa(e,t,n,r,o){const a=Ub(r,e);if(a)return a;let i=null;const s=t?.resolution??1;try{if(t?.extract?.canvas){const l=new n.Sprite(e),d=t.extract.canvas(l);if(l.destroy?.({children:!0,texture:!1,baseTexture:!1}),s>1&&d){const c=Math.round(d.width/s),u=Math.round(d.height/s);i=document.createElement("canvas"),i.width=c,i.height=u;const p=i.getContext("2d");p&&(p.imageSmoothingEnabled=!1,p.drawImage(d,0,0,c,u));}else i=d;}}catch{}if(!i){const l=e?.frame||e?._frame,d=e?.orig||e?._orig,c=e?.trim||e?._trim,u=e?.rotate||e?._rotate||0,p=e?.baseTexture?.resource?.source||e?.baseTexture?.resource||e?.source?.resource?.source||e?.source?.resource||e?._source?.resource?.source||null;if(!l||!p)throw new Error("textureToCanvas fail");i=document.createElement("canvas");const f=Math.max(1,(d?.width??l.width)|0),g=Math.max(1,(d?.height??l.height)|0),h=c?.x??0,m=c?.y??0;i.width=f,i.height=g;const b=i.getContext("2d");b.imageSmoothingEnabled=false,u===true||u===2||u===8?(b.save(),b.translate(h+l.height/2,m+l.width/2),b.rotate(-Math.PI/2),b.drawImage(p,l.x,l.y,l.width,l.height,-l.width/2,-l.height/2,l.width,l.height),b.restore()):b.drawImage(p,l.x,l.y,l.width,l.height,h,m,l.width,l.height);}return Vb(r,e,i,o),i}function Xb(e,t,n,r,o,a,i,s){const{w:l,h:d,aX:c,aY:u,basePos:p}=t,f=[];for(const g of n){const h=new r.Sprite(e);h.anchor?.set?.(c,u),h.position.set(p.x,p.y),h.zIndex=1;const m=document.createElement("canvas");m.width=l,m.height=d;const b=m.getContext("2d");b.imageSmoothingEnabled=false,b.save(),b.translate(l*c,d*u),b.drawImage(Aa(e,o,r,a,i),-l*c,-d*u),b.restore(),Ob(b,m,g.name,g.isTall);const y=r.Texture.from(m,{resolution:e.resolution??1});s.push(y),h.texture=y,f.push(h);}return f}function qb(e,t,n,r,o,a,i,s,l,d){const{aX:c,basePos:u}=t,p=[];for(const f of n){const g=f.overlayTall&&r.get(f.overlayTall)&&{tex:r.get(f.overlayTall),key:f.overlayTall}||Db(e,f.name,r);if(!g?.tex)continue;const h=Aa(g.tex,a,o,i,s);if(!h)continue;const m=h.width,b={x:0,y:0},y={x:u.x-c*m,y:0},w=document.createElement("canvas");w.width=m,w.height=h.height;const S=w.getContext("2d");if(!S)continue;S.imageSmoothingEnabled=false,S.drawImage(h,0,0),S.globalCompositeOperation="destination-in",S.drawImage(l,-y.x,-0);const T=o.Texture.from(w,{resolution:g.tex.resolution??1});d.push(T);const v=new o.Sprite(T);v.anchor?.set?.(b.x,b.y),v.position.set(y.x,y.y),v.scale.set(1),v.alpha=1,v.zIndex=3,p.push(v);}return p}function Kb(e,t,n,r,o,a){const{basePos:i}=t,s=[];for(const l of n){if(l.name==="Gold"||l.name==="Rainbow")continue;const d=Gb(e,l.name,l.isTall,r);if(!d)continue;const c=new o.Sprite(d),u=d?.defaultAnchor?.x??.5,p=d?.defaultAnchor?.y??.5;c.anchor?.set?.(u,p),c.position.set(i.x+a.offset.x,i.y+a.offset.y),c.scale.set(a.iconScale),l.isTall&&(c.zIndex=-1),Tb.has(l.name)&&(c.zIndex=10),c.zIndex||(c.zIndex=2),s.push(c);}return s}function yu(e,t,n,r){try{if(!e||!r.renderer||!r.ctors?.Container||!r.ctors?.Sprite||!r.ctors?.Texture)return null;const{Container:o,Sprite:a,Texture:i}=r.ctors,s=e?.orig?.width??e?.frame?.width??e?.width??1,l=e?.orig?.height??e?.frame?.height??e?.height??1,d=e?.defaultAnchor?.x??.5,c=e?.defaultAnchor?.y??.5,u={x:s*d,y:l*c},p=Aa(e,r.renderer,r.ctors,r.cacheState,r.cacheConfig),f=new o;f.sortableChildren=!0;const g=new a(e);g.anchor?.set?.(d,c),g.position.set(u.x,u.y),g.zIndex=0,f.addChild(g);const h=$b(t),m=ri(n.muts,h),b=ri(n.overlayMuts,h),y=ri(n.selectedMuts,h),w=[],S={w:s,h:l,aX:d,aY:c,basePos:u},T=Ls(t),v=zb(e,T,h);Xb(e,S,m,r.ctors,r.renderer,r.cacheState,r.cacheConfig,w).forEach(D=>f.addChild(D)),h&&qb(t,S,b,r.textures,r.ctors,r.renderer,r.cacheState,r.cacheConfig,p,w).forEach(G=>f.addChild(G)),Kb(t,S,y,r.textures,r.ctors,v).forEach(D=>f.addChild(D));let k={x:0,y:0,width:s,height:l};try{const D=f.getLocalBounds?.()||f.getBounds?.(!0);D&&Number.isFinite(D.width)&&Number.isFinite(D.height)&&(k={x:D.x,y:D.y,width:D.width,height:D.height});}catch{}const{Rectangle:A}=r.ctors,E=A?new A(0,0,s,l):void 0;let B=null;if(typeof r.renderer.generateTexture=="function"?B=r.renderer.generateTexture(f,{resolution:1,region:E}):r.renderer.textureGenerator?.generateTexture&&(B=r.renderer.textureGenerator.generateTexture({target:f,resolution:1,region:E})),!B)throw new Error("no render texture");const J=B instanceof i?B:i.from(r.renderer.extract.canvas(B));try{J.__mg_base={baseX:-k.x,baseY:-k.y,baseW:s,baseH:l,texW:k.width,texH:k.height};}catch{}B&&B!==J&&B.destroy?.(!0),f.destroy({children:!0,texture:!1,baseTexture:!1});try{J.__mg_gen=!0,J.label=`${t}|${n.sig}`;}catch{}return J}catch{return null}}function Yb(e,t,n,r){if(!e||e.length<2)return null;const o=[];for(const a of e){const i=yu(a,t,n,r);i&&o.push(i);}return o.length>=2?o:null}function vu(e,t,n,r,o){const a=t.scale??1,i=t.frameIndex??0,s=t.mutations?.slice().sort().join(",")||"",l=t.anchorX??.5,d=t.anchorY??.5;return `${e}|s${a}|f${i}|m${s}|ax${l}|ay${d}|bm${n}|bp${o}|p${r}`}function Jb(e,t){const n=e.cache.get(t);return n?(n.lastAccess=performance.now(),n.canvas):null}function Qb(e,t,n,r){if(t.enabled){if(e.cache.size>=t.maxEntries){let o=null,a=1/0;for(const[i,s]of e.cache)s.lastAccess<a&&(a=s.lastAccess,o=i);o&&e.cache.delete(o);}e.cache.set(n,{canvas:r,lastAccess:performance.now()});}}function tc(e){const t=document.createElement("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");return n&&n.drawImage(e,0,0),t}function Zb(e){e.cache.clear();}function ex(e){return {size:e.cache.size,maxEntries:e.maxEntries}}function tx(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0);})}async function nx(e,t,n,r,o,a,i,s=5,l=0){if(!t.ready||!a.enabled)return 0;const d=e.length;let c=0;i?.(0,d);for(let u=0;u<d;u+=s){const p=e.slice(u,u+s);for(const f of p)try{const g=Nr(null,f,t.textures,t.animations),h={scale:1},m=Su(h),b=Cu(m,h),y=Tu(m,h.boundsPadding),w=vu(g,h,m,b,y);o.cache.has(w)||Di(t,n,r,null,f,h,o,a),c++;}catch{c++;}i?.(c,d),u+s<d&&await tx();}return c}function rx(e){if(e.overlay)return e.overlay;const t=new e.ctors.Container;t.sortableChildren=true,t.zIndex=99999999;try{e.app.stage.sortableChildren=!0;}catch{}return e.app.stage.addChild(t),e.overlay=t,t}function ox(e){const t=e.defaultParent;if(!t)return null;try{return typeof t=="function"?t():t}catch{return null}}function Ns(e,t,n,r,o,a){if(!n.length)return t;const i=fu(n);if(!i.sig)return t;const s=hu(e,i),l=bu(o,s);if(l?.tex)return l.tex;const d=yu(t,e,i,{renderer:r.renderer,ctors:r.ctors,textures:r.textures,cacheState:o,cacheConfig:a});return d?(xu(o,s,{isAnim:false,tex:d},a),d):t}function wu(e,t,n,r,o,a){if(!n.length)return t;const i=fu(n);if(!i.sig)return t;const s=hu(e,i),l=bu(o,s);if(l?.isAnim&&l.frames?.length)return l.frames;const d=Yb(t,e,i,{renderer:r.renderer,ctors:r.ctors,textures:r.textures,cacheState:o,cacheConfig:a});return d?(xu(o,s,{isAnim:true,frames:d},a),d):t}function nc(e,t,n,r,o,a={}){if(!e.ready)throw new Error("MGSprite not ready yet");const i=Nr(r,o,e.textures,e.animations),s=a.mutations||[],l=a.parent||ox(e)||rx(e),d=e.renderer?.width||e.renderer?.view?.width||innerWidth,c=e.renderer?.height||e.renderer?.view?.height||innerHeight,u=a.center?d/2:a.x??d/2,p=a.center?c/2:a.y??c/2;let f;const g=e.animations.get(i);if(g&&g.length>=2){const b=wu(i,g,s,e,t,n),y=e.ctors.AnimatedSprite;if(y)f=new y(b),f.animationSpeed=a.fps?a.fps/60:a.speed??.15,f.loop=a.loop??true,f.play();else {const w=new e.ctors.Sprite(b[0]),T=1e3/Math.max(1,a.fps||8);let v=0,C=0;const I=k=>{const A=e.app.ticker?.deltaMS??k*16.666666666666668;if(v+=A,v<T)return;const E=v/T|0;v%=T,C=(C+E)%b.length,w.texture=b[C];};w.__mgTick=I,e.app.ticker?.add?.(I),f=w;}}else {const b=e.textures.get(i);if(!b)throw new Error(`Unknown sprite/anim key: ${i}`);const y=Ns(i,b,s,e,t,n);f=new e.ctors.Sprite(y);}const h=a.anchorX??f.texture?.defaultAnchor?.x??.5,m=a.anchorY??f.texture?.defaultAnchor?.y??.5;return f.anchor?.set?.(h,m),f.position.set(u,p),f.scale.set(a.scale??1),f.alpha=a.alpha??1,f.rotation=a.rotation??0,f.zIndex=a.zIndex??999999,l.addChild(f),e.live.add(f),f.__mgDestroy=()=>{try{f.__mgTick&&e.app.ticker?.remove?.(f.__mgTick);}catch{}try{f.destroy?.({children:!0,texture:!1,baseTexture:!1});}catch{try{f.destroy?.();}catch{}}e.live.delete(f);},f}function ax(e,t){const n=e.renderer;if(n?.extract?.canvas)return n.extract.canvas(t);if(n?.plugins?.extract?.canvas)return n.plugins.extract.canvas(t);throw new Error("No extract.canvas available on renderer")}const rc=new Map;function Su(e){return e.boundsMode?e.boundsMode:e.mutations&&e.mutations.length>0?"base":"mutations"}function Cu(e,t){return e==="mutations"?t.pad??2:t.pad??0}function Yn(e){return Number.isFinite(e)?Math.max(0,e):0}function ku(e){if(typeof e=="number"){const t=Yn(e);return {top:t,right:t,bottom:t,left:t}}return e?{top:Yn(e.top??0),right:Yn(e.right??0),bottom:Yn(e.bottom??0),left:Yn(e.left??0)}:{top:0,right:0,bottom:0,left:0}}function Tu(e,t){if(e==="mutations")return "0,0,0,0";if(e==="padded"&&t==null)return "auto";const n=ku(t);return `${n.top},${n.right},${n.bottom},${n.left}`}function Iu(e){const t=e?.orig?.width??e?.frame?.width??e?.width??1,n=e?.orig?.height??e?.frame?.height??e?.height??1;return {w:t,h:n}}function _u(e,t,n){const r=e?.__mg_base;return r&&Number.isFinite(r.baseX)&&Number.isFinite(r.baseY)&&Number.isFinite(r.baseW)&&Number.isFinite(r.baseH)&&Number.isFinite(r.texW)&&Number.isFinite(r.texH)?r:{baseX:0,baseY:0,baseW:t,baseH:n,texW:t,texH:n}}function ix(e,t,n,r,o,a){const i=`${e}|f${t}`,s=rc.get(i);if(s)return s;const l=Iu(n),d={top:0,right:0,bottom:0,left:0};for(const c of pu){const u=Ns(e,n,[c],r,o,a),p=_u(u,l.w,l.h),f=Math.max(0,p.baseX),g=Math.max(0,p.baseY),h=Math.max(0,p.texW-p.baseX-p.baseW),m=Math.max(0,p.texH-p.baseY-p.baseH);f>d.left&&(d.left=f),g>d.top&&(d.top=g),h>d.right&&(d.right=h),m>d.bottom&&(d.bottom=m);}return rc.set(i,d),d}function Di(e,t,n,r,o,a={},i,s){if(!e.ready)throw new Error("MGSprite not ready yet");const l=Nr(r,o,e.textures,e.animations),d=Su(a),c=Cu(d,a),u=Tu(d,a.boundsPadding),p=i&&s?.enabled?vu(l,a,d,c,u):null;if(p&&i&&s?.enabled){const w=Jb(i,p);if(w)return tc(w)}const f=a.mutations||[],g=e.animations.get(l),h=Math.max(0,(a.frameIndex??0)|0);let m,b;if(g?.length)if(m=g[h%g.length],f.length){const w=wu(l,g,f,e,t,n);b=w[h%w.length];}else b=m;else {const w=e.textures.get(l);if(!w)throw new Error(`Unknown sprite/anim key: ${l}`);m=w,b=Ns(l,w,f,e,t,n);}let y;if(d==="mutations"){const w=new e.ctors.Sprite(b),S=a.anchorX??w.texture?.defaultAnchor?.x??.5,T=a.anchorY??w.texture?.defaultAnchor?.y??.5;w.anchor?.set?.(S,T),w.scale.set(a.scale??1);const v=new e.ctors.Container;v.addChild(w);try{v.updateTransform?.();}catch{}const C=w.getBounds?.(true)||{x:0,y:0,width:w.width,height:w.height};w.position.set(-C.x+c,-C.y+c),y=ax(e,v);try{v.destroy?.({children:!0});}catch{}}else {const w=a.scale??1;let S=ku(a.boundsPadding);d==="padded"&&a.boundsPadding==null&&(S=ix(l,h,m,e,t,n)),c&&(S={top:S.top+c,right:S.right+c,bottom:S.bottom+c,left:S.left+c});const T=Iu(m),v=_u(b,T.w,T.h),C=Math.max(1,Math.ceil((T.w+S.left+S.right)*w)),I=Math.max(1,Math.ceil((T.h+S.top+S.bottom)*w));y=document.createElement("canvas"),y.width=C,y.height=I;const k=y.getContext("2d");if(k){k.imageSmoothingEnabled=false;const A=Aa(b,e.renderer,e.ctors,t,n),E=(S.left-v.baseX)*w,B=(S.top-v.baseY)*w;k.drawImage(A,E,B,A.width*w,A.height*w);}}return p&&i&&s?.enabled?(Qb(i,s,p,y),tc(y)):y}function sx(e){for(const t of Array.from(e.live))t.__mgDestroy?.();}function lx(e,t){return e.defaultParent=t,true}function cx(e,t){return e.defaultParent=t,true}function cn(){if(!lu())throw new Error("MGSprite not ready yet")}function dx(e,t,n){return typeof t=="string"?nc(Ge(),Ln(),Rr(),e,t,n||{}):nc(Ge(),Ln(),Rr(),null,e,t||{})}function ux(e,t,n){return typeof t=="string"?Di(Ge(),Ln(),Rr(),e,t,n||{},Lr(),Bi()):Di(Ge(),Ln(),Rr(),null,e,t||{},Lr(),Bi())}function px(){sx(Ge());}function fx(e){return lx(Ge(),e)}function gx(e){return cx(Ge(),e)}function hx(e,t){const n=Ge(),r=typeof t=="string"?Nr(e,t,n.textures,n.animations):Nr(null,e,n.textures,n.animations);return n.textures.has(r)||n.animations.has(r)}function mx(){cn();const e=Ge().categoryIndex;return e?Array.from(e.keys()).sort((t,n)=>t.localeCompare(n)):[]}function bx(e){cn();const t=String(e||"").trim();if(!t)return [];const n=Ge().categoryIndex;return n?Array.from(n.get(t)?.values()||[]):[]}function xx(e,t){cn();const n=String(e||"").trim(),r=String(t||"").trim();if(!n||!r)return  false;const o=Ge().categoryIndex;if(!o)return  false;const a=n.toLowerCase(),i=r.toLowerCase();for(const[s,l]of o.entries())if(s.toLowerCase()===a){for(const d of l.values())if(d.toLowerCase()===i)return  true}return  false}function yx(e){cn();const t=Ge().categoryIndex;if(!t)return [];const n=String(e||"").trim().toLowerCase(),r=[];for(const[o,a]of t.entries())for(const i of a.values()){const s=qr(o,i);(!n||s.toLowerCase().startsWith(n))&&r.push(s);}return r.sort((o,a)=>o.localeCompare(a))}function vx(e){cn();const t=String(e||"").trim();if(!t)return null;const n=pa(t),r=/^sprite\/([^/]+)\/(.+)$/.exec(n);if(!r)return null;const o=r[1],a=r[2],i=Ge().categoryIndex,s=o.toLowerCase(),l=a.toLowerCase();let d=o,c=a;if(i){const u=Array.from(i.keys()).find(g=>g.toLowerCase()===s);if(!u)return null;d=u;const p=i.get(u);if(!p)return null;const f=Array.from(p.values()).find(g=>g.toLowerCase()===l);if(!f)return null;c=f;}return {category:d,id:c,key:qr(d,c)}}function wx(e,t){cn();const n=String(e||"").trim(),r=String(t||"").trim();if(!n||!r)throw new Error("getIdPath(category, id) requires both category and id");const o=Ge().categoryIndex;if(!o)throw new Error("Sprite categories not indexed");const a=n.toLowerCase(),i=r.toLowerCase(),s=Array.from(o.keys()).find(c=>c.toLowerCase()===a)||n,l=o.get(s);if(!l)throw new Error(`Unknown sprite category: ${n}`);const d=Array.from(l.values()).find(c=>c.toLowerCase()===i)||r;if(!l.has(d))throw new Error(`Unknown sprite id: ${n}/${r}`);return qr(s,d)}function Sx(){Wb(Ln());}function Cx(){Zb(Lr());}function kx(){return ex(Lr())}function Tx(){return [...pu]}async function Ix(e,t,n=10,r=0){return cn(),nx(e,Ge(),Ln(),Rr(),Lr(),Bi(),t,n,r)}const j={init:Sb,isReady:lu,show:dx,toCanvas:ux,clear:px,attach:fx,attachProvider:gx,has:hx,key:(e,t)=>qr(e,t),getCategories:mx,getCategoryId:bx,hasId:xx,listIds:yx,getIdInfo:vx,getIdPath:wx,clearMutationCache:Sx,clearToCanvasCache:Cx,getToCanvasCacheStats:kx,getMutationNames:Tx,warmup:Ix};function _x(e){return String(e||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^A-Za-z0-9]/g,"").trim()}function Ax(e,t=[]){const n=new Set,r=o=>{const a=String(o||"").trim();a&&n.add(a);};r(e);for(const o of t)r(o);for(const o of Array.from(n.values()))o.endsWith("s")?r(o.slice(0,-1)):r(`${o}s`),o.endsWith("es")&&r(o.slice(0,-2));return Array.from(n.values()).filter(Boolean)}function Au(e,t,n,r=[],o=[]){if(!j)return console.warn("[MGData] MGSprite not available in pickSpriteId"),null;const a=Ax(e,r);if(!a.length)return null;const i=[t,...o].filter(c=>typeof c=="string"),s=c=>{const u=String(c||"").trim();if(!u)return null;for(const p of a)try{if(j.has(p,u))return j.getIdPath(p,u)}catch{}return null};for(const c of i){const u=s(c);if(u)return u}const l=_x(n||""),d=s(l||n||"");if(d)return d;try{for(const c of a){const u=j.listIds(`sprite/${c}/`),p=i.map(g=>String(g||"").toLowerCase()),f=String(n||l||"").toLowerCase();for(const g of u){const m=(g.split("/").pop()||"").toLowerCase();if(p.some(b=>b&&b===m)||m===f)return g}for(const g of u){const m=(g.split("/").pop()||"").toLowerCase();if(p.some(b=>b&&(m.includes(b)||b.includes(m)))||f&&(m.includes(f)||f.includes(m)))return g}}}catch{}return null}function Ye(e,t,n,r,o=[],a=[]){if(!e||typeof e!="object")return;const i=e.tileRef;if(!i||typeof i!="object")return;const s=String(i.spritesheet||t||"").trim(),l=Au(s,n,r,o,a);if(l)try{e.spriteId=l;}catch{}const d=e.rotationVariants;if(d&&typeof d=="object")for(const c of Object.values(d))Ye(c,s,n,r);if(e.immatureTileRef){const c={tileRef:e.immatureTileRef};Ye(c,s,n,r),c.spriteId&&(e.immatureSpriteId=c.spriteId);}if(e.topmostLayerTileRef){const c={tileRef:e.topmostLayerTileRef};Ye(c,s,n,r),c.spriteId&&(e.topmostLayerSpriteId=c.spriteId);}e.activeState&&typeof e.activeState=="object"&&Ye(e.activeState,s,n,e.activeState?.name||r);}function Px(e,t,n,r=[]){if(!Array.isArray(t)||t.length===0)return null;const o=t[0],a=t.slice(1);return Au(e,o,n??null,r,a)}function Ex(e){for(const[t,n]of Object.entries(e.items||{}))Ye(n,"items",t,n?.name,["item"]);for(const[t,n]of Object.entries(e.decor||{}))Ye(n,"decor",t,n?.name);for(const[t,n]of Object.entries(e.mutations||{})){Ye(n,"mutations",t,n?.name,["mutation"]);const r=Px("mutation-overlay",[`${t}TallPlant`,`${t}TallPlantIcon`,t],n?.name,["mutation-overlay"]);if(r)try{n.overlaySpriteId=r;}catch{}}for(const[t,n]of Object.entries(e.eggs||{}))Ye(n,"pets",t,n?.name,["pet"]);for(const[t,n]of Object.entries(e.pets||{}))Ye(n,"pets",t,n?.name,["pet"]);for(const[t,n]of Object.entries(e.plants||{})){const r=n;r.seed&&Ye(r.seed,r.seed?.tileRef?.spritesheet||"seeds",`${t}Seed`,r.seed?.name||`${t} Seed`,["seed","plant","plants"],[t]),r.plant&&Ye(r.plant,r.plant?.tileRef?.spritesheet||"plants",`${t}Plant`,r.plant?.name||`${t} Plant`,["plant","plants","tallplants"],[t]),r.crop&&Ye(r.crop,r.crop?.tileRef?.spritesheet||"plants",t,r.crop?.name||t,["plant","plants"],[`${t}Crop`]);}}function Mx(){try{console.log("[MGData] Resolving sprites..."),Ex(Z.data),console.log("[MGData] Sprite resolution complete");}catch(e){try{console.warn("[MGData] sprite resolution failed",e);}catch{}}}const Pu=1e4,Eu=50;function Mu(e){return new Promise(t=>setTimeout(t,e))}function Rx(e){return Z.data[e]}function Lx(){return {...Z.data}}function Nx(e){return Z.data[e]!=null}async function Fx(e,t=Pu,n=Eu){const r=Date.now();for(;Date.now()-r<t;){const o=Z.data[e];if(o!=null)return o;await Mu(n);}throw new Error(`MGData.waitFor: timeout waiting for "${e}"`)}async function Ox(e=Pu,t=Eu){const n=Date.now();for(;Date.now()-n<e;){if(Object.values(Z.data).some(r=>r!=null))return {...Z.data};await Mu(t);}throw new Error("MGData.waitForAnyData: timeout")}const Ru=["CoinFinderI","CoinFinderII","CoinFinderIII","SeedFinderI","SeedFinderII","SeedFinderIII","SeedFinderIV","HungerRestore","HungerRestoreII","DoubleHarvest","DoubleHatch","ProduceEater","PetHatchSizeBoost","PetHatchSizeBoostII","PetAgeBoost","PetAgeBoostII","PetRefund","PetRefundII","ProduceRefund","SellBoostI","SellBoostII","SellBoostIII","SellBoostIV","GoldGranter","RainbowGranter","RainDance","PetXpBoost","PetXpBoostII","EggGrowthBoost","EggGrowthBoostII_NEW","EggGrowthBoostII","PlantGrowthBoost","PlantGrowthBoostII","ProduceScaleBoost","ProduceScaleBoostII"];function Lu(e){return Ru.includes(e)}function Nu(e){return e.filter(t=>Lu(t.action))}function oc(e){const t=Math.floor(e/3600),n=Math.floor(e%3600/60),r=Math.floor(e%60);return t>0?`${t}h ${n}m`:n>0?`${n}m ${r}s`:`${r}s`}function oi(e){return e?.name||e?.petSpecies||"Unknown Pet"}function Fu(e){const{action:t,parameters:n}=e,r=n;switch(t){case "CoinFinderI":case "CoinFinderII":case "CoinFinderIII":return `Found ${r.coinsFound||0} coins`;case "SeedFinderI":case "SeedFinderII":case "SeedFinderIII":case "SeedFinderIV":return `Found 1× ${r.speciesId||"Unknown"} seed`;case "HungerRestore":case "HungerRestoreII":{const o=oi(r.targetPet),a=r.hungerRestoreAmount||0,s=r.pet?.id===r.targetPet?.id?"itself":o;return `Restored ${a} hunger to ${s}`}case "DoubleHarvest":return `Double harvested ${r.harvestedCrop?.species||"Unknown"}`;case "DoubleHatch":return `Double hatched ${r.extraPet?.petSpecies||"Unknown"}`;case "ProduceEater":{const o=r.growSlot?.species||"Unknown",a=r.sellPrice||0;return `Ate ${o} for ${a} coins`}case "PetHatchSizeBoost":case "PetHatchSizeBoostII":{const o=oi(r.targetPet),a=r.strengthIncrease||0;return `Boosted ${o}'s size by +${a.toFixed(0)}`}case "PetAgeBoost":case "PetAgeBoostII":{const o=oi(r.targetPet);return `Gave +${r.bonusXp||0} XP to ${o}`}case "PetRefund":case "PetRefundII":return `Refunded 1× ${r.eggId||"Unknown Egg"}`;case "ProduceRefund":{const o=r.cropsRefunded?.length||0;return `Refunded ${o} ${o===1?"crop":"crops"}`}case "SellBoostI":case "SellBoostII":case "SellBoostIII":case "SellBoostIV":return `Gave +${r.bonusCoins||0} bonus coins`;case "GoldGranter":case "RainbowGranter":case "RainDance":{const o=r.mutation||"Unknown";return `Made ${r.growSlot?.species||"Unknown"} turn ${o}`}case "PetXpBoost":case "PetXpBoostII":{const o=r.bonusXp||0,a=r.petsAffected?.length||0;return `Gave +${o} XP to ${a} ${a===1?"pet":"pets"}`}case "EggGrowthBoost":case "EggGrowthBoostII_NEW":case "EggGrowthBoostII":{const o=r.secondsReduced||0,a=r.eggsAffected?.length||0,i=oc(o);return `Reduced ${a} ${a===1?"egg":"eggs"} growth by ${i}`}case "PlantGrowthBoost":case "PlantGrowthBoostII":{const o=r.secondsReduced||0,a=r.numPlantsAffected||0,i=oc(o);return `Reduced ${a} ${a===1?"plant":"plants"} growth by ${i}`}case "ProduceScaleBoost":case "ProduceScaleBoostII":{const o=r.scaleIncreasePercentage||0,a=r.numPlantsAffected||0;return `Boosted ${a} ${a===1?"crop":"crops"} size by +${o.toFixed(0)}%`}default:return `Unknown ability: ${t}`}}const V={async init(){ou(),Lm(),Dm(),Xm();},isReady:ua,get:Rx,getAll:Lx,has:Nx,waitFor:Fx,waitForAny:Ox,resolveSprites:Mx,cleanup(){au(),iu(),Gm(),qm();}},$x=new Map;function Bx(){return $x}function Gi(){return N.jotaiAtomCache?.cache}function Ot(e){const t=Bx(),n=t.get(e);if(n)return n;const r=Gi();if(!r)return null;for(const o of r.values())if((o?.debugLabel||o?.label||"")===e)return t.set(e,o),o;return null}function Dx(){const e=N;if(e.__REACT_DEVTOOLS_GLOBAL_HOOK__)return;const t=new Map,n=new Map;e.__REACT_DEVTOOLS_GLOBAL_HOOK__={renderers:t,supportsFiber:true,inject:r=>{const o=t.size+1;return t.set(o,r),n.set(o,new Set),o},onCommitFiberRoot:(r,o)=>{const a=n.get(r);a&&a.add(o);},onCommitFiberUnmount:()=>{},onPostCommitFiberRoot:()=>{},getFiberRoots:r=>n.get(r),checkDCE:()=>{},isDisabled:false};}const Gx={baseStore:null,captureInProgress:false,captureError:null,lastCapturedVia:null,mirror:void 0};function On(){return Gx}const zx="__JOTAI_STORE_READY__";let ac=false;const zi=new Set;function bo(){if(!ac){ac=true;for(const e of zi)try{e();}catch{}try{const e=N.CustomEvent||CustomEvent;N.dispatchEvent?.(new e(zx));}catch{}}}function Hx(e){zi.add(e);const t=ji();if(t.via&&!t.polyfill)try{e();}catch{}return ()=>{zi.delete(e);}}async function jx(e={}){const{timeoutMs:t=6e3,intervalMs:n=50}=e,r=ji();if(!(r.via&&!r.polyfill))return new Promise((o,a)=>{let i=false;const s=Hx(()=>{i||(i=true,s(),o());}),l=Date.now();(async()=>{for(;!i&&Date.now()-l<t;){const c=ji();if(c.via&&!c.polyfill){if(i)return;i=true,s(),o();return}await Fr(n);}i||(i=true,s(),a(new Error("Store not captured within timeout")));})();})}const Fr=e=>new Promise(t=>setTimeout(t,e));function Ou(){try{const e=N.Event||Event;N.dispatchEvent?.(new e("visibilitychange"));}catch{}}function Hi(e){return e&&typeof e=="object"&&typeof e.get=="function"&&typeof e.set=="function"&&typeof e.sub=="function"}function ai(e,t=0,n=new WeakSet){if(t>3||!e||typeof e!="object"||n.has(e))return null;try{n.add(e);}catch{return null}if(Hi(e))return e;const r=["store","value","current","state","s","baseStore"];for(const o of r)try{const a=e[o];if(Hi(a))return a}catch{}return null}function $u(){const e=On(),t=N.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t?.renderers?.size)return null;let n=0;for(const[r]of t.renderers){const o=t.getFiberRoots?.(r);o&&(n+=o.size||0);}if(n===0)return null;for(const[r]of t.renderers){const o=t.getFiberRoots?.(r);if(o)for(const a of o){const i=new Set,s=[a.current];for(;s.length;){const l=s.pop();if(!(!l||i.has(l))){i.add(l);try{const d=l?.pendingProps?.value;if(Hi(d))return e.lastCapturedVia="fiber",d}catch{}try{let d=l?.memoizedState,c=0;for(;d&&c<15;){c++;const u=ai(d);if(u)return e.lastCapturedVia="fiber",u;const p=ai(d.memoizedState);if(p)return e.lastCapturedVia="fiber",p;d=d.next;}}catch{}try{if(l?.stateNode){const d=ai(l.stateNode);if(d)return e.lastCapturedVia="fiber",d}}catch{}l.child&&s.push(l.child),l.sibling&&s.push(l.sibling),l.alternate&&s.push(l.alternate);}}}}return null}function Bu(){return {get:()=>{throw new Error("Store not captured: get unavailable")},set:()=>{throw new Error("Store not captured: set unavailable")},sub:()=>()=>{},__polyfill:true}}async function Wx(e=5e3){const t=Date.now();let n=Gi();for(;!n&&Date.now()-t<e;)await Fr(100),n=Gi();if(!n)throw new Error("jotaiAtomCache.cache not found");const r=On();let o=null,a=null;const i=[],s=()=>{for(const d of i)try{d.__origWrite&&(d.write=d.__origWrite,delete d.__origWrite);}catch{}};for(const d of n.values()){if(!d||typeof d.write!="function"||d.__origWrite)continue;const c=d.write;d.__origWrite=c,d.write=function(u,p,...f){return a||(o=u,a=p,s()),c.call(this,u,p,...f)},i.push(d);}Ou();const l=Date.now();for(;!a&&Date.now()-l<e;)await Fr(50);return a?(r.lastCapturedVia="write",{get:d=>o(d),set:(d,c)=>a(d,c),sub:(d,c)=>{let u;try{u=o(d);}catch{}const p=setInterval(()=>{let f;try{f=o(d);}catch{return}if(f!==u){u=f;try{c();}catch{}}},100);return ()=>clearInterval(p)}}):(s(),r.lastCapturedVia="polyfill",Bu())}async function Ux(e=1e4){const t=On();Ou();const n=Date.now();for(;Date.now()-n<e;){const r=$u();if(r)return r;await Fr(50);}return t.lastCapturedVia="polyfill",Bu()}async function Fs(){const e=On();if(e.baseStore&&!e.baseStore.__polyfill)return bo(),e.baseStore;if(e.captureInProgress){const t=Date.now(),n=2500;for(;!e.baseStore&&Date.now()-t<n;)await Fr(25);if(e.baseStore)return e.baseStore.__polyfill||bo(),e.baseStore}e.captureInProgress=true;try{const t=$u();if(t)return e.baseStore=t,bo(),t;try{const r=await Wx(5e3);return e.baseStore=r,r.__polyfill||bo(),r}catch(r){e.captureError=r;}const n=await Ux();return e.baseStore=n,n}catch(t){throw e.captureError=t,t}finally{e.captureInProgress=false;}}function ji(){const e=On();return {via:e.lastCapturedVia,polyfill:!!e.baseStore?.__polyfill,error:e.captureError}}async function Vx(){const e=await Fs(),t=new WeakMap,n=async o=>{let a=t.get(o);if(a)return a;a={last:void 0,has:false,subs:new Set},t.set(o,a);try{a.last=e.get(o),a.has=!0;}catch{}const i=e.sub(o,()=>{let s;try{s=e.get(o);}catch{return}const l=a.last,d=!Object.is(s,l)||!a.has;if(a.last=s,a.has=true,d)for(const c of a.subs)try{c(s,l);}catch{}});return a.unsubUpstream=i,a};return {async get(o){const a=await n(o);if(a.has)return a.last;const i=e.get(o);return a.last=i,a.has=true,i},async set(o,a){await e.set(o,a);const i=await n(o);i.last=a,i.has=true;},async sub(o,a){const i=await n(o);if(i.subs.add(a),i.has)try{a(i.last,i.last);}catch{}return ()=>{i.subs.delete(a);}},getShadow(o){return t.get(o)?.last},hasShadow(o){return !!t.get(o)?.has},async ensureWatch(o){await n(o);},async asStore(){return {get:o=>this.get(o),set:(o,a)=>this.set(o,a),sub:(o,a)=>{let i=null;return this.sub(o,()=>a()).then(s=>i=s),()=>i?.()}}}}}async function Vo(){const e=On();return e.mirror||(e.mirror=await Vx()),e.mirror}const ge={async select(e){const t=await Vo(),n=Ot(e);if(!n)throw new Error(`[Store] Atom not found: "${e}"`);return t.get(n)},async set(e,t){const n=await Vo(),r=Ot(e);if(!r)throw new Error(`[Store] Atom not found: "${e}"`);await n.set(r,t);},async subscribe(e,t){const n=await Vo(),r=Ot(e);if(!r)throw new Error(`[Store] Atom not found: "${e}"`);return n.sub(r,o=>{try{t(o);}catch{}})},async subscribeImmediate(e,t){const n=await ge.select(e);try{t(n);}catch{}return ge.subscribe(e,t)}};async function Xx(){await Vo();}function Os(e){return e?Array.isArray(e)?e.slice():e.split(".").map(t=>t.match(/^\d+$/)?Number(t):t):[]}function Or(e,t){const n=Os(t);let r=e;for(const o of n){if(r==null)return;r=r[o];}return r}function qx(e,t,n){const r=Os(t);if(!r.length)return n;const o=Array.isArray(e)?[...e]:{...e??{}};let a=o;for(let i=0;i<r.length-1;i++){const s=r[i],l=a[s],d=typeof l=="object"&&l!==null?Array.isArray(l)?[...l]:{...l}:{};a[s]=d,a=d;}return a[r[r.length-1]]=n,o}function ic(e,t){const n={};for(const r of t)n[r]=r.includes(".")?Or(e,r):e?.[r];try{return JSON.stringify(n)}catch{return String(n)}}function Kx(e,t,n){const r=n.mode??"auto";function o(d){const c=t?Or(d,t):d,u=new Map;if(c==null)return {signatures:u,keys:[]};const p=Array.isArray(c);if((r==="array"||r==="auto"&&p)&&p)for(let g=0;g<c.length;g++){const h=c[g],m=n.key?n.key(h,g,d):g,b=n.sig?n.sig(h,g,d):n.fields?ic(h,n.fields):JSON.stringify(h);u.set(m,b);}else for(const[g,h]of Object.entries(c)){const m=n.key?n.key(h,g,d):g,b=n.sig?n.sig(h,g,d):n.fields?ic(h,n.fields):JSON.stringify(h);u.set(m,b);}return {signatures:u,keys:Array.from(u.keys())}}function a(d,c){if(d===c)return  true;if(!d||!c||d.size!==c.size)return  false;for(const[u,p]of d)if(c.get(u)!==p)return  false;return  true}async function i(d){let c=null;return ge.subscribeImmediate(e,u=>{const p=t?Or(u,t):u,{signatures:f}=o(p);if(!a(c,f)){const g=new Set([...c?Array.from(c.keys()):[],...Array.from(f.keys())]),h=[];for(const m of g){const b=c?.get(m)??"__NONE__",y=f.get(m)??"__NONE__";b!==y&&h.push(m);}c=f,d({value:p,changedKeys:h});}})}async function s(d,c){return i(({value:u,changedKeys:p})=>{p.includes(d)&&c({value:u});})}async function l(d,c){const u=new Set(d);return i(({value:p,changedKeys:f})=>{const g=f.filter(h=>u.has(h));g.length&&c({value:p,changedKeys:g});})}return {sub:i,subKey:s,subKeys:l}}const yn=new Map;function Yx(e,t){const n=yn.get(e);if(n)try{n();}catch{}return yn.set(e,t),()=>{try{t();}catch{}yn.get(e)===t&&yn.delete(e);}}function he(e,t={}){const{path:n,write:r="replace"}=t,o=n?`${e}:${Os(n).join(".")}`:e;async function a(){const u=await ge.select(e);return n?Or(u,n):u}async function i(u){if(typeof r=="function"){const g=await ge.select(e),h=r(u,g);return ge.set(e,h)}const p=await ge.select(e),f=n?qx(p,n,u):u;return r==="merge-shallow"&&!n&&p&&typeof p=="object"&&typeof u=="object"?ge.set(e,{...p,...u}):ge.set(e,f)}async function s(u){const p=await a(),f=u(p);return await i(f),f}async function l(u,p,f){let g;const h=b=>{const y=n?Or(b,n):b;if(typeof g>"u"||!f(g,y)){const w=g;g=y,p(y,w);}},m=u?await ge.subscribeImmediate(e,h):await ge.subscribe(e,h);return Yx(o,m)}function d(){const u=yn.get(o);if(u){try{u();}catch{}yn.delete(o);}}function c(u){return Kx(e,u?.path??n,u)}return {label:o,get:a,set:i,update:s,onChange:(u,p=Object.is)=>l(false,u,p),onChangeNow:(u,p=Object.is)=>l(true,u,p),asSignature:c,stopOnChange:d}}function _(e){return he(e)}_("positionAtom");_("lastPositionInMyGardenAtom");_("playerDirectionAtom");_("stateAtom");_("quinoaDataAtom");_("currentTimeAtom");_("actionAtom");_("isPressAndHoldActionAtom");_("mapAtom");_("tileSizeAtom");he("mapAtom",{path:"cols"});he("mapAtom",{path:"rows"});he("mapAtom",{path:"spawnTiles"});he("mapAtom",{path:"locations.seedShop.spawnTileIdx"});he("mapAtom",{path:"locations.eggShop.spawnTileIdx"});he("mapAtom",{path:"locations.toolShop.spawnTileIdx"});he("mapAtom",{path:"locations.decorShop.spawnTileIdx"});he("mapAtom",{path:"locations.sellCropsShop.spawnTileIdx"});he("mapAtom",{path:"locations.sellPetShop.spawnTileIdx"});he("mapAtom",{path:"locations.collectorsClub.spawnTileIdx"});he("mapAtom",{path:"locations.wishingWell.spawnTileIdx"});he("mapAtom",{path:"locations.shopsCenter.spawnTileIdx"});_("playerAtom");_("myDataAtom");_("myUserSlotIdxAtom");_("isSpectatingAtom");_("myCoinsCountAtom");_("numPlayersAtom");he("playerAtom",{path:"id"});he("myDataAtom",{path:"activityLogs"});_("userSlotsAtom");_("filteredUserSlotsAtom");_("myUserSlotAtom");_("spectatorsAtom");he("stateAtom",{path:"child"});he("stateAtom",{path:"child.data"});he("stateAtom",{path:"child.data.shops"});const Jx=he("stateAtom",{path:"child.data.userSlots"}),Qx=he("stateAtom",{path:"data.players"}),Zx=he("stateAtom",{path:"data.hostPlayerId"});_("myInventoryAtom");_("myInventoryItemsAtom");_("isMyInventoryAtMaxLengthAtom");_("myFavoritedItemIdsAtom");_("myCropInventoryAtom");_("mySeedInventoryAtom");_("myToolInventoryAtom");_("myEggInventoryAtom");_("myDecorInventoryAtom");_("myPetInventoryAtom");he("myInventoryAtom",{path:"favoritedItemIds"});_("itemTypeFiltersAtom");_("myItemStoragesAtom");_("myPetHutchStoragesAtom");_("myPetHutchItemsAtom");_("myPetHutchPetItemsAtom");_("myNumPetHutchItemsAtom");_("myValidatedSelectedItemIndexAtom");_("isSelectedItemAtomSuspended");_("mySelectedItemAtom");_("mySelectedItemNameAtom");_("mySelectedItemRotationsAtom");_("mySelectedItemRotationAtom");_("setSelectedIndexToEndAtom");_("myPossiblyNoLongerValidSelectedItemIndexAtom");_("myCurrentGlobalTileIndexAtom");_("myCurrentGardenTileAtom");_("myCurrentGardenObjectAtom");_("myOwnCurrentGardenObjectAtom");_("myOwnCurrentDirtTileIndexAtom");_("myCurrentGardenObjectNameAtom");_("isInMyGardenAtom");_("myGardenBoardwalkTileObjectsAtom");const ey=he("myDataAtom",{path:"garden"});he("myDataAtom",{path:"garden.tileObjects"});he("myOwnCurrentGardenObjectAtom",{path:"objectType"});_("myCurrentStablePlantObjectInfoAtom");_("myCurrentSortedGrowSlotIndicesAtom");_("myCurrentGrowSlotIndexAtom");_("myCurrentGrowSlotsAtom");_("myCurrentGrowSlotAtom");_("secondsUntilCurrentGrowSlotMaturesAtom");_("isCurrentGrowSlotMatureAtom");_("numGrowSlotsAtom");_("myCurrentEggAtom");_("petInfosAtom");_("myPetInfosAtom");_("myPetSlotInfosAtom");_("myPrimitivePetSlotsAtom");_("myNonPrimitivePetSlotsAtom");_("expandedPetSlotIdAtom");_("myPetsProgressAtom");_("myActiveCropMutationPetsAtom");_("totalPetSellPriceAtom");_("selectedPetHasNewVariantsAtom");const ty=_("shopsAtom"),ny=_("myShopPurchasesAtom");_("seedShopAtom");_("seedShopInventoryAtom");_("seedShopRestockSecondsAtom");_("seedShopCustomRestockInventoryAtom");_("eggShopAtom");_("eggShopInventoryAtom");_("eggShopRestockSecondsAtom");_("eggShopCustomRestockInventoryAtom");_("toolShopAtom");_("toolShopInventoryAtom");_("toolShopRestockSecondsAtom");_("toolShopCustomRestockInventoryAtom");_("decorShopAtom");_("decorShopInventoryAtom");_("decorShopRestockSecondsAtom");_("decorShopCustomRestockInventoryAtom");_("isDecorShopAboutToRestockAtom");he("shopsAtom",{path:"seed"});he("shopsAtom",{path:"tool"});he("shopsAtom",{path:"egg"});he("shopsAtom",{path:"decor"});_("myCropItemsAtom");_("myCropItemsToSellAtom");_("totalCropSellPriceAtom");_("friendBonusMultiplierAtom");_("myJournalAtom");_("myCropJournalAtom");_("myPetJournalAtom");_("myStatsAtom");_("myActivityLogsAtom");_("newLogsAtom");_("hasNewLogsAtom");_("newCropLogsFromSellingAtom");_("hasNewCropLogsFromSellingAtom");_("myCompletedTasksAtom");_("myActiveTasksAtom");_("isWelcomeToastVisibleAtom");_("shouldCloseWelcomeToastAtom");_("isInitialMoveToDirtPatchToastVisibleAtom");_("isFirstPlantSeedActiveAtom");_("isThirdSeedPlantActiveAtom");_("isThirdSeedPlantCompletedAtom");_("isDemoTouchpadVisibleAtom");_("areShopAnnouncersEnabledAtom");_("arePresentablesEnabledAtom");_("isEmptyDirtTileHighlightedAtom");_("isPlantTileHighlightedAtom");_("isItemHiglightedInHotbarAtom");_("isItemHighlightedInModalAtom");_("isMyGardenButtonHighlightedAtom");_("isSellButtonHighlightedAtom");_("isShopButtonHighlightedAtom");_("isInstaGrowButtonHiddenAtom");_("isActionButtonHighlightedAtom");_("isGardenItemInfoCardHiddenAtom");_("isSeedPurchaseButtonHighlightedAtom");_("isFirstSeedPurchaseActiveAtom");_("isFirstCropHarvestActiveAtom");_("isWeatherStatusHighlightedAtom");_("weatherAtom");const $s=_("activeModalAtom");_("hotkeyBeingPressedAtom");_("avatarTriggerAnimationAtom");_("avatarDataAtom");_("emoteDataAtom");_("otherUserSlotsAtom");_("otherPlayerPositionsAtom");_("otherPlayerSelectedItemsAtom");_("otherPlayerLastActionsAtom");_("traderBunnyPlayerId");_("npcPlayersAtom");_("npcQuinoaUsersAtom");_("numNpcAvatarsAtom");_("traderBunnyEmoteTimeoutAtom");_("traderBunnyEmoteAtom");_("unsortedLeaderboardAtom");_("currentGardenNameAtom");_("quinoaEngineAtom");_("quinoaInitializationErrorAtom");_("avgPingAtom");_("serverClientTimeOffsetAtom");_("isEstablishingShotRunningAtom");_("isEstablishingShotCompleteAtom");const de={initialized:false,activeModal:null,isCustom:false,shadow:null,patchedAtoms:new Set,originalReads:new Map,unsubscribes:[],listeners:{onOpen:new Set,onClose:new Set}};function Pa(){return de}function ry(){return de.initialized}function dn(){return de.isCustom&&de.activeModal!==null}function nn(){return de.activeModal}function Du(e){return !de.shadow||de.shadow.modal!==e?null:de.shadow.data}function oy(e){de.initialized=e;}function Bs(e){de.activeModal=e;}function Ds(e){de.isCustom=e;}function Gu(e,t){de.shadow={modal:e,data:t,timestamp:Date.now()};}function zu(){de.shadow=null;}function sc(e,t){de.patchedAtoms.add(e),de.originalReads.set(e,t);}function ay(e){return de.originalReads.get(e)}function Wi(e){return de.patchedAtoms.has(e)}function iy(e){de.patchedAtoms.delete(e),de.originalReads.delete(e);}function sy(e){de.unsubscribes.push(e);}function ly(){for(const e of de.unsubscribes)try{e();}catch{}de.unsubscribes.length=0;}function cy(e){return de.listeners.onOpen.add(e),()=>de.listeners.onOpen.delete(e)}function Hu(e){return de.listeners.onClose.add(e),()=>de.listeners.onClose.delete(e)}function ju(e){for(const t of Array.from(de.listeners.onOpen))try{t(e);}catch{}}function Gs(e){for(const t of Array.from(de.listeners.onClose))try{t(e);}catch{}}function dy(){ly(),de.initialized=false,de.activeModal=null,de.isCustom=false,de.shadow=null,de.patchedAtoms.clear(),de.originalReads.clear(),de.listeners.onOpen.clear(),de.listeners.onClose.clear();}const zs={inventory:{atoms:[{atomLabel:"myInventoryAtom",dataKey:"_full",transform:e=>{const t=e;return {items:t.items??[],storages:t.storages??[],favoritedItemIds:t.favoritedItemIds??[]}}}],derivedAtoms:[{atomLabel:"myCropInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Produce"):[]},{atomLabel:"mySeedInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Seed"):[]},{atomLabel:"myToolInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Tool"):[]},{atomLabel:"myEggInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Egg"):[]},{atomLabel:"myDecorInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Decor"):[]},{atomLabel:"myPetInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Pet"):[]}]},journal:{atoms:[{atomLabel:"myJournalAtom",dataKey:"_full"}],derivedAtoms:[{atomLabel:"myCropJournalAtom",sourceKey:"produce",deriveFn:e=>e??{}},{atomLabel:"myPetJournalAtom",sourceKey:"pets",deriveFn:e=>e??{}}]},stats:{atoms:[{atomLabel:"myStatsAtom",dataKey:"_full"}]},activityLog:{atoms:[{atomLabel:"myActivityLogsAtom",dataKey:"logs"}]},seedShop:{atoms:[{atomLabel:"seedShopInventoryAtom",dataKey:"inventory"},{atomLabel:"seedShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},eggShop:{atoms:[{atomLabel:"eggShopInventoryAtom",dataKey:"inventory"},{atomLabel:"eggShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},toolShop:{atoms:[{atomLabel:"toolShopInventoryAtom",dataKey:"inventory"},{atomLabel:"toolShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},decorShop:{atoms:[{atomLabel:"decorShopInventoryAtom",dataKey:"inventory"},{atomLabel:"decorShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},leaderboard:{atoms:[{atomLabel:"unsortedLeaderboardAtom",dataKey:"entries"}]},petHutch:{atoms:[{atomLabel:"myPetHutchItemsAtom",dataKey:"items"},{atomLabel:"myPetHutchPetItemsAtom",dataKey:"petItems"}]}};function Wu(e){return zs[e]}function uy(e){const t=zs[e],n=[];for(const r of t.atoms)n.push(r.atomLabel);if(t.derivedAtoms)for(const r of t.derivedAtoms)n.push(r.atomLabel);return n}const py=new Set(["inventory","journal","stats","activityLog","petHutch"]),fy=new Set(["seedShop","eggShop","toolShop","decorShop"]),gy=new Set(["leaderboard"]);function hy(e,t,n,r){return function(a){const i=dn(),s=nn();if(i&&s===r){const l=Du(r);if(l!==null){let d;if(n.dataKey==="_full"?d=l:d=l[n.dataKey],d!==void 0)return t(a),n.transform?n.transform(d):d}}return t(a)}}function my(e,t,n,r,o){return function(i){if(dn()&&nn()===o){const s=Du(o);if(s!==null){const l=s[n];if(l!==void 0)return t(i),r(l)}}return t(i)}}function by(e){const t=Wu(e);for(const n of t.atoms){const r=Ot(n.atomLabel);if(!r||Wi(n.atomLabel))continue;const o=r.read;if(typeof o!="function")continue;const a=hy(n.atomLabel,o,n,e);r.read=a,sc(n.atomLabel,o);}if(t.derivedAtoms)for(const n of t.derivedAtoms){const r=Ot(n.atomLabel);if(!r||Wi(n.atomLabel))continue;const o=r.read;if(typeof o!="function")continue;const a=my(n.atomLabel,o,n.sourceKey,n.deriveFn,e);r.read=a,sc(n.atomLabel,o);}}async function Ea(e){const t=Wu(e);for(const r of t.atoms)lc(r.atomLabel);if(t.derivedAtoms)for(const r of t.derivedAtoms)lc(r.atomLabel);const n=await Fs();await Uu(n,e);}async function xy(e){const t=await Fs();await Uu(t,e);const n=uy(e);for(const r of n){const o=Ot(r);if(o)try{t.get(o);}catch{}}}function lc(e){if(!Wi(e))return;const t=Ot(e),n=ay(e);t&&n&&(t.read=n),iy(e);}async function Uu(e,t){const n=py.has(t),r=fy.has(t),o=gy.has(t);if(!n&&!r&&!o)return;const a=Ot("stateAtom");if(a)try{const i=e.get(a);if(!i||typeof i!="object")return;let s=null;if(n||r){const l=i.child,d=l?.data;if(l&&d&&typeof d=="object"){let c=null;if(n&&Array.isArray(d.userSlots)){const u=d.userSlots.map(p=>{if(!p||typeof p!="object")return p;const f=p,g=f.data,h=g&&typeof g=="object"?{...g}:g;return {...f,data:h}});c={...c??d,userSlots:u};}if(r&&d.shops&&typeof d.shops=="object"&&(c={...c??d,shops:{...d.shops}}),c){const u={...l,data:c};s={...i,child:u};}}}if(o){const l=i.data;if(l&&Array.isArray(l.players)){const d={...l,players:[...l.players]};s={...s??i,data:d};}}if(!s)return;await e.set(a,s);}catch{}}async function yy(){for(const e of Object.keys(zs))await Ea(e);}let xo=null,vr=null;async function vy(){if(Pa().initialized)return;vr=await ge.select("activeModalAtom"),xo=setInterval(async()=>{try{const n=await ge.select("activeModalAtom"),r=vr;r!==n&&(vr=n,wy(n,r));}catch{}},50),sy(()=>{xo&&(clearInterval(xo),xo=null);}),oy(true);}function wy(e,t){const n=dn(),r=nn();e===null&&t!==null&&(n&&r===t?Sy("native"):n||Gs({modal:t,wasCustom:false,closedBy:"native"})),e!==null&&!n&&ju({modal:e,isCustom:false});}async function Sy(e){const t=nn();t&&(zu(),Ds(false),Bs(null),await Ea(t),Gs({modal:t,wasCustom:true,closedBy:e}));}async function Cy(e,t){if(!Pa().initialized)throw new Error("[MGCustomModal] Not initialized. Call init() first.");dn()&&await Vu(),Gu(e,t),Ds(true),Bs(e),by(e),await xy(e),await $s.set(e),vr=e,ju({modal:e,isCustom:true});}function ky(e,t){const n=Pa();if(!n.isCustom||n.activeModal!==e||!n.shadow)return;const o={...n.shadow.data,...t};Gu(e,o);}async function Vu(){const e=Pa();if(!e.isCustom||!e.activeModal)return;const t=e.activeModal;zu(),Ds(false),Bs(null),await $s.set(null),vr=null,await Ea(t),Gs({modal:t,wasCustom:true,closedBy:"api"});}function Ty(){return new Promise(e=>{if(!dn()){e();return}const t=Hu(()=>{t(),e();});})}async function Iy(){if(dn()){const e=nn();e&&await Ea(e);}await yy(),dy();}const Sn={async init(){return vy()},isReady(){return ry()},async show(e,t){return Cy(e,t)},update(e,t){return ky(e,t)},async close(){return Vu()},isOpen(){return nn()!==null},isCustomOpen(){return dn()},getActiveModal(){return nn()},waitForClose(){return Ty()},onOpen(e){return cy(e)},onClose(e){return Hu(e)},async destroy(){return Iy()}};function _y(){return {ready:false,xform:null,xformAt:0}}const tt=_y();function Xu(){return tt.ready}function $n(e){try{if(typeof structuredClone=="function")return structuredClone(e)}catch{}try{return JSON.parse(JSON.stringify(e))}catch{}return e}function Kr(){return et.tos()}function Hs(){return et.engine()}function Ay(){const e=Kr()?.map?.cols;return Number.isFinite(e)&&e>0?e:null}function js(e,t){const n=Ay();return n?t*n+e|0:null}let yo=null;async function Py(e=15e3){return tt.ready?true:yo||(yo=(async()=>{if(await et.init(e),!Kr())throw new Error("MGTile: engine captured but tileObject system not found");return tt.ready=true,true})(),yo)}function en(e,t,n=true){const r=Kr(),o=js(e,t);if(!r||o==null)return {gidx:null,tv:null};let a=r.tileViews?.get?.(o)||null;if(!a&&n&&typeof r.getOrCreateTileView=="function")try{a=r.getOrCreateTileView(o);}catch{}return {gidx:o,tv:a||null}}function ii(e,t){if("startTime"in t&&(e.startTime=Number(t.startTime)),"endTime"in t&&(e.endTime=Number(t.endTime)),"targetScale"in t&&(e.targetScale=Number(t.targetScale)),"mutations"in t){if(!Array.isArray(t.mutations))throw new Error("MGTile: mutations must be an array of strings");e.mutations=t.mutations.slice();}}function Ws(e,t){if(!e)throw new Error("MGTile: no tileObject on this tile");if(e.objectType!==t)throw new Error(`MGTile: expected objectType "${t}", got "${e.objectType}"`)}function Cn(e,t,n,r={}){const o=r.ensureView!==false,a=r.forceUpdate!==false,i=Hs(),{gidx:s,tv:l}=en(Number(e),Number(t),o);if(s==null)throw new Error("MGTile: cols unavailable (engine/TOS not ready)");if(!l)throw new Error("MGTile: TileView unavailable (not instantiated)");const d=l.tileObject;if(typeof l.onDataChanged!="function")throw new Error("MGTile: tileView.onDataChanged not found (different API?)");if(l.onDataChanged(n),a&&i?.reusableContext&&typeof l.update=="function")try{l.update(i.reusableContext);}catch{}return {ok:true,tx:Number(e),ty:Number(t),gidx:s,before:d,after:l.tileObject}}function Ma(e,t,n={}){const r=n.ensureView!==false,o=n.clone!==false,{gidx:a,tv:i}=en(Number(e),Number(t),r);if(a==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!i)return {tx:Number(e),ty:Number(t),gidx:a,tileView:null,tileObject:void 0};const s=i.tileObject;return {tx:Number(e),ty:Number(t),gidx:a,tileView:i,tileObject:o?$n(s):s}}function Ey(e,t,n={}){return Cn(e,t,null,n)}function My(e,t,n,r={}){const a=Ma(e,t,{...r,clone:false}).tileView?.tileObject;Ws(a,"plant");const i=$n(a);if(Array.isArray(i.slots)||(i.slots=[]),"plantedAt"in n&&(i.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(i.maturedAt=Number(n.maturedAt)),"species"in n&&(i.species=String(n.species)),"slotIdx"in n&&"slotPatch"in n){const s=Number(n.slotIdx)|0;if(!i.slots[s])throw new Error(`MGTile: plant slot ${s} doesn't exist`);return ii(i.slots[s],n.slotPatch),Cn(e,t,i,r)}if("slots"in n){const s=n.slots;if(Array.isArray(s)){for(let l=0;l<s.length;l++)if(s[l]!=null){if(!i.slots[l])throw new Error(`MGTile: plant slot ${l} doesn't exist`);ii(i.slots[l],s[l]);}}else if(s&&typeof s=="object")for(const l of Object.keys(s)){const d=Number(l)|0;if(Number.isFinite(d)){if(!i.slots[d])throw new Error(`MGTile: plant slot ${d} doesn't exist`);ii(i.slots[d],s[d]);}}else throw new Error("MGTile: patch.slots must be array or object map");return Cn(e,t,i,r)}return Cn(e,t,i,r)}function Ry(e,t,n,r={}){const a=Ma(e,t,{...r,clone:false}).tileView?.tileObject;Ws(a,"decor");const i=$n(a);return "rotation"in n&&(i.rotation=Number(n.rotation)),Cn(e,t,i,r)}function Ly(e,t,n,r={}){const a=Ma(e,t,{...r,clone:false}).tileView?.tileObject;Ws(a,"egg");const i=$n(a);return "plantedAt"in n&&(i.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(i.maturedAt=Number(n.maturedAt)),Cn(e,t,i,r)}function Ny(e,t,n,r={}){const o=r.ensureView!==false,a=r.forceUpdate!==false,i=Hs(),{gidx:s,tv:l}=en(Number(e),Number(t),o);if(s==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!l)throw new Error("MGTile: TileView unavailable");const d=l.tileObject,c=typeof n=="function"?n($n(d)):n;if(l.onDataChanged(c),a&&i?.reusableContext&&typeof l.update=="function")try{l.update(i.reusableContext);}catch{}return {ok:true,tx:Number(e),ty:Number(t),gidx:s,before:d,after:l.tileObject}}function Fy(e,t,n={}){const r=n.ensureView!==false,{gidx:o,tv:a}=en(Number(e),Number(t),r);if(o==null)throw new Error("MGTile: cols unavailable");if(!a)return {ok:true,tx:Number(e),ty:Number(t),gidx:o,tv:null,tileObject:void 0};const i=n.clone!==false,s=a.tileObject;return {ok:true,tx:Number(e),ty:Number(t),gidx:o,objectType:s?.objectType??null,tileObject:i?$n(s):s,tvKeys:Object.keys(a||{}).sort(),tileView:a}}function si(e){if(!e)return null;const t=o=>o&&(typeof o.getGlobalPosition=="function"||typeof o.toGlobal=="function"),n=["container","root","view","tile","ground","base","floor","bg","background","baseSprite","tileSprite","displayObject","gfx","graphics","sprite"];for(const o of n)if(t(e[o]))return e[o];if(t(e))return e;const r=[e.container,e.root,e.view,e.displayObject,e.tileSprite,e.gfx,e.graphics,e.sprite];for(const o of r)if(t(o))return o;try{for(const o of Object.keys(e))if(t(e[o]))return e[o]}catch{}return null}function Xo(e){const t=ct(()=>e?.getGlobalPosition?.());if(t&&Number.isFinite(t.x)&&Number.isFinite(t.y))return {x:t.x,y:t.y};const n=ct(()=>e?.toGlobal?.({x:0,y:0}));return n&&Number.isFinite(n.x)&&Number.isFinite(n.y)?{x:n.x,y:n.y}:null}function Oy(e){try{if(!e?.getBounds)return "center";const t=e.getBounds(),n=Xo(e);if(!n||!t||!Number.isFinite(t.width)||!Number.isFinite(t.height))return "center";const r=t.x+t.width/2,o=t.y+t.height/2;return Math.hypot(n.x-r,n.y-o)<Math.hypot(n.x-t.x,n.y-t.y)?"center":"topleft"}catch{return "center"}}function $y(){const e=Kr(),t=e?.map?.cols,n=e?.map?.rows;if(!e||!Number.isFinite(t)||t<=1)return null;const r=Number.isFinite(n)&&n>1?n:null,o=[[0,0],[1,1],[Math.min(2,t-2),0],[0,1]];r&&r>2&&o.push([Math.floor(t/2),Math.floor(r/2)]);for(const[a,i]of o){if(a<0||i<0||a>=t||r&&i>=r)continue;const s=en(a,i,true).tv,l=a+1<t?en(a+1,i,true).tv:null,d=en(a,i+1,true).tv,c=si(s),u=si(l),p=si(d);if(!c||!u||!p)continue;const f=Xo(c),g=Xo(u),h=Xo(p);if(!f||!g||!h)continue;const m={x:g.x-f.x,y:g.y-f.y},b={x:h.x-f.x,y:h.y-f.y},y=m.x*b.y-m.y*b.x;if(!Number.isFinite(y)||Math.abs(y)<1e-6)continue;const w=1/y,S={a:b.y*w,b:-b.x*w,c:-m.y*w,d:m.x*w},T={x:f.x-a*m.x-i*b.x,y:f.y-a*m.y-i*b.y},v=Oy(c),C=v==="center"?T:{x:T.x+.5*(m.x+b.x),y:T.y+.5*(m.y+b.y)};return {ok:true,cols:t,rows:r,vx:m,vy:b,inv:S,anchorMode:v,originCenter:C}}return null}function qu(){return tt.xform=$y(),tt.xformAt=Date.now(),{ok:!!tt.xform?.ok,xform:tt.xform}}function By(e,t={}){if(!e||!Number.isFinite(e.x)||!Number.isFinite(e.y))return null;const n=Number.isFinite(t.maxAgeMs)?Number(t.maxAgeMs):1500;(!tt.xform?.ok||t.forceRebuild||Date.now()-tt.xformAt>n)&&qu();const r=tt.xform;if(!r?.ok)return null;const o=e.x-r.originCenter.x,a=e.y-r.originCenter.y,i=r.inv.a*o+r.inv.b*a,s=r.inv.c*o+r.inv.d*a,l=Math.floor(i),d=Math.floor(s),c=[[l,d],[l+1,d],[l,d+1],[l+1,d+1]];let u=null,p=1/0;for(const[f,g]of c){if(f<0||g<0||f>=r.cols||Number.isFinite(r.rows)&&r.rows!==null&&g>=r.rows)continue;const h=r.originCenter.x+f*r.vx.x+g*r.vy.x,m=r.originCenter.y+f*r.vx.y+g*r.vy.y,b=(e.x-h)**2+(e.y-m)**2;b<p&&(p=b,u={tx:f,ty:g,fx:i,fy:s,x:e.x,y:e.y,gidx:null});}return u?(u.gidx=js(u.tx,u.ty),u):null}function Dy(e,t){const n=tt.xform;return n?.ok?{x:n.originCenter.x+e*n.vx.x+t*n.vy.x,y:n.originCenter.y+e*n.vx.y+t*n.vy.y}:null}function ot(){if(!Xu())throw new Error("MGTile: not ready. Call MGTile.init() first.")}function Gy(){return ["MGTile.init()","MGTile.hook()","MGTile.getTileObject(tx,ty) / inspect(tx,ty)","MGTile.setTileEmpty(tx,ty)","MGTile.setTilePlant(tx,ty,{...}) / setTileDecor / setTileEgg","MGTile.setTileObjectRaw(tx,ty,objOrFn)","MGTile.rebuildTransform() / pointToTile({x,y})","MGTile.tileToPoint(tx,ty)"].join(`
`)}const Tt={init:Py,isReady:Xu,hook:et.hook,engine:Hs,tos:Kr,gidx:(e,t)=>js(Number(e),Number(t)),getTileObject:(e,t,n={})=>(ot(),Ma(e,t,n)),inspect:(e,t,n={})=>(ot(),Fy(e,t,n)),setTileEmpty:(e,t,n={})=>(ot(),Ey(e,t,n)),setTilePlant:(e,t,n,r={})=>(ot(),My(e,t,n,r)),setTileDecor:(e,t,n,r={})=>(ot(),Ry(e,t,n,r)),setTileEgg:(e,t,n,r={})=>(ot(),Ly(e,t,n,r)),setTileObjectRaw:(e,t,n,r={})=>(ot(),Ny(e,t,n,r)),rebuildTransform:()=>(ot(),qu()),pointToTile:(e,t={})=>(ot(),By(e,t)),tileToPoint:(e,t)=>(ot(),Dy(e,t)),getTransform:()=>(ot(),tt.xform),help:Gy};function zy(){return {ready:false,app:null,renderer:null,stage:null,ticker:null,tileSets:new Map,highlights:new Map,watches:new Map,fades:new Map,fadeWatches:new Map}}const K=zy();function Ku(){return K.ready}async function Hy(e=15e3){if(K.ready)return Ui(),true;if(await et.init(e),K.app=et.app(),K.ticker=et.ticker(),K.renderer=et.renderer(),K.stage=et.stage(),!K.app||!K.ticker)throw new Error("MGPixi: PIXI app/ticker not found");return K.ready=true,Ui(),true}function Ui(){const e=N;return e.$PIXI=e.PIXI||null,e.$app=K.app||null,e.$renderer=K.renderer||null,e.$stage=K.stage||null,e.$ticker=K.ticker||null,e.__MG_PIXI__={PIXI:e.$PIXI,app:e.$app,renderer:e.$renderer,stage:e.$stage,ticker:e.$ticker,ready:K.ready},e.__MG_PIXI__}function Us(e){return !!e&&typeof e=="object"&&!Array.isArray(e)}function Vi(e){return !!(e&&typeof e.getBounds=="function"&&("parent"in e||"children"in e))}function ga(e){return !!(e&&typeof e.tint=="number")}function rn(e){return !!(e&&typeof e.alpha=="number")}function qo(e,t,n){return e+(t-e)*n}function jy(e,t,n){const r=e>>16&255,o=e>>8&255,a=e&255,i=t>>16&255,s=t>>8&255,l=t&255,d=qo(r,i,n)|0,c=qo(o,s,n)|0,u=qo(a,l,n)|0;return d<<16|c<<8|u}function Wy(e,t=900){const n=[],r=[e];for(;r.length&&n.length<t;){const o=r.pop();if(!o)continue;ga(o)&&n.push(o);const a=o.children;if(Array.isArray(a))for(let i=a.length-1;i>=0;i--)r.push(a[i]);}return n}function Uy(e,t=25e3){const n=[],r=[e];let o=0;for(;r.length&&o++<t;){const a=r.pop();if(!a)continue;rn(a)&&n.push(a);const i=a.children;if(Array.isArray(i))for(let s=i.length-1;s>=0;s--)r.push(i[s]);}return n}const Vy=["plantVisual","cropVisual","slotVisual","slotView","displayObject","view","container","root","sprite","gfx","graphics"];function Xi(e){if(!e)return null;if(Vi(e))return e;if(!Us(e))return null;for(const t of Vy){const n=e[t];if(Vi(n))return n}return null}function Xy(e,t){const n=[{o:e,d:0}],r=new Set,o=6;for(;n.length;){const{o:a,d:i}=n.shift();if(!(!a||i>o)&&!r.has(a)){if(r.add(a),Array.isArray(a)){if(a.length===t){const s=new Array(t);let l=true;for(let d=0;d<t;d++){const c=Xi(a[d]);if(!c){l=false;break}s[d]=c;}if(l)return s}for(const s of a)n.push({o:s,d:i+1});continue}if(Us(a)){const s=a;for(const l of Object.keys(s))n.push({o:s[l],d:i+1});}}}return null}function Yu(e){if(!Array.isArray(e))return [];const t=new Set,n=[];for(const r of e){let o,a;if(Array.isArray(r))o=r[0],a=r[1];else if(Us(r))o=r.x??r.tx,a=r.y??r.ty;else continue;if(o=Number(o),a=Number(a),!Number.isFinite(o)||!Number.isFinite(a))continue;o|=0,a|=0;const i=`${o},${a}`;t.has(i)||(t.add(i),n.push({x:o,y:a}));}return n}function qy(e,t){const n=String(e||"").trim();if(!n)throw new Error("MGPixi.defineTileSet: empty name");const r=Yu(t);return K.tileSets.set(n,r),{ok:true,name:n,count:r.length}}function Ky(e){return K.tileSets.delete(String(e||"").trim())}function Yy(){return Array.from(K.tileSets.keys()).sort((e,t)=>e.localeCompare(t))}function Ju(e){return !!(e&&(e.tileSet!=null||Array.isArray(e.tiles)))}function Vs(e){const n=Tt.tos?.()?.tileViews;if(!n?.entries)throw new Error("MGPixi: TOS.tileViews not found");if(!Ju(e))return {entries:Array.from(n.entries()),gidxSet:null};let r=[];if(e.tileSet!=null){const a=String(e.tileSet||"").trim(),i=K.tileSets.get(a);if(!i)throw new Error(`MGPixi: tileSet not found "${a}"`);r=i;}else r=Yu(e.tiles||[]);const o=new Map;for(const a of r){const i=Tt.getTileObject(a.x,a.y,{ensureView:true,clone:false});i?.tileView&&i.gidx!=null&&o.set(i.gidx,i.tileView);}return {entries:Array.from(o.entries()),gidxSet:new Set(o.keys())}}function Xs(e){const t=K.highlights.get(e);if(!t)return  false;ct(()=>K.ticker?.remove(t.tick)),t.root&&t.baseAlpha!=null&&rn(t.root)&&ct(()=>{t.root.alpha=t.baseAlpha;});for(const n of t.tint)n.o&&ga(n.o)&&ct(()=>{n.o.tint=n.baseTint;});return K.highlights.delete(e),true}function Qu(e=null){for(const t of Array.from(K.highlights.keys()))e&&!String(t).startsWith(e)||Xs(t);return  true}function Zu(e,t={}){if(!Vi(e))throw new Error("MGPixi.highlightPulse: invalid root");const n=String(t.key||`hl:${Math.random().toString(16).slice(2)}`);if(K.highlights.has(n))return n;const r=rn(e)?Number(e.alpha):null,o=yt(Number(t.minAlpha??.12),0,1),a=yt(Number(t.maxAlpha??1),0,1),i=Number(t.speed??1.25),s=(t.tint??8386303)>>>0,l=yt(Number(t.tintMix??.85),0,1),d=t.deepTint!==false,c=[];if(d)for(const f of Wy(e))c.push({o:f,baseTint:f.tint});else ga(e)&&c.push({o:e,baseTint:e.tint});const u=performance.now(),p=()=>{const f=(performance.now()-u)/1e3,g=(Math.sin(f*Math.PI*2*i)+1)/2,h=g*g*(3-2*g);r!=null&&rn(e)&&(e.alpha=yt(qo(o,a,h)*r,0,1));const m=h*l;for(const b of c)b.o&&ga(b.o)&&(b.o.tint=jy(b.baseTint,s,m));};return K.ticker?.add(p),K.highlights.set(n,{root:e,tick:p,baseAlpha:r,tint:c}),n}function Jy(e,t){const n=e?.mutations;if(!Array.isArray(n))return  false;for(const r of n)if(String(r||"").toLowerCase()===t)return  true;return  false}function ep(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.highlightMutation: empty mutation");const{entries:r,gidxSet:o}=Vs(t),a=`hlmut:${n}:`;if(t.clear===true)if(!o)Qu(a);else for(const u of Array.from(K.highlights.keys())){if(!u.startsWith(a))continue;const p=u.split(":"),f=Number(p[2]);o.has(f)&&Xs(u);}const i={tint:(t.tint??8386303)>>>0,minAlpha:Number(t.minAlpha??.12),maxAlpha:Number(t.maxAlpha??1),speed:Number(t.speed??1.25),tintMix:Number(t.tintMix??.85),deepTint:t.deepTint!==false};let s=0,l=0,d=0,c=0;for(const[u,p]of r){const f=p?.tileObject;if(!f||f.objectType!=="plant")continue;const g=f.slots;if(!Array.isArray(g)||g.length===0)continue;let h=false;const m=[];for(let w=0;w<g.length;w++)Jy(g[w],n)&&(m.push(w),h=true);if(!h)continue;s++,l+=m.length;const b=p?.childView?.plantVisual||p?.childView||p,y=Xy(b,g.length);if(!y){c+=m.length;continue}for(const w of m){const S=y[w];if(!S){c++;continue}const T=`${a}${u}:${w}`;K.highlights.has(T)||(Zu(S,{key:T,...i}),d++);}}return {ok:true,mutation:n,filtered:!!o,plantsMatched:s,matchedSlots:l,newHighlights:d,failedSlots:c}}function Qy(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchMutation: empty mutation");const r=`watchmut:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,o=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,a=K.watches.get(r);a&&clearInterval(a);const i=setInterval(()=>{ct(()=>ep(n,{...t,clear:!1}));},o);return K.watches.set(r,i),{ok:true,key:r,mutation:n,intervalMs:o}}function Zy(e){const t=String(e||"").trim();if(!t)return  false;if(!t.startsWith("watchmut:")){const r=t.toLowerCase();let o=0;for(const[a,i]of Array.from(K.watches.entries()))a.startsWith(`watchmut:${r}:`)&&(clearInterval(i),K.watches.delete(a),o++);return o>0}const n=K.watches.get(t);return n?(clearInterval(n),K.watches.delete(t),true):false}function e0(e){const t=e?.childView?.plantVisual||e?.childView?.cropVisual||e?.childView||e?.displayObject||e;return Xi(t)||Xi(e?.displayObject)||null}function tp(e){const t=K.fades.get(e);if(!t)return  false;for(const n of t.targets)n.o&&rn(n.o)&&Number.isFinite(n.baseAlpha)&&ct(()=>{n.o.alpha=n.baseAlpha;});return K.fades.delete(e),true}function qi(e=null){for(const t of Array.from(K.fades.keys()))e&&!String(t).startsWith(e)||tp(t);return  true}function np(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.clearSpeciesFade: empty species");const r=`fade:${n}:`;if(!Ju(t))return qi(r);const{gidxSet:o}=Vs(t);if(!o)return qi(r);for(const a of Array.from(K.fades.keys())){if(!a.startsWith(r))continue;const i=Number(a.slice(r.length));o.has(i)&&tp(a);}return  true}function rp(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.fadeSpecies: empty species");const r=yt(Number(t.alpha??.2),0,1),o=t.deep===true,{entries:a,gidxSet:i}=Vs(t),s=`fade:${n}:`;t.clear===true&&np(n,t);let l=0,d=0,c=0,u=0;for(const[p,f]of a){const g=f?.tileObject;if(!g||g.objectType!=="plant")continue;l++;const h=String(g.species||"").trim().toLowerCase();if(!h||h!==n)continue;d++;const m=e0(f);if(!m||!rn(m)){u++;continue}const b=`${s}${p}`;if(K.fades.has(b)){ct(()=>{m.alpha=r;}),c++;continue}const y=o?Uy(m):[m],w=[];for(const S of y)rn(S)&&w.push({o:S,baseAlpha:Number(S.alpha)});for(const S of w)ct(()=>{S.o.alpha=r;});K.fades.set(b,{targets:w}),c++;}return {ok:true,species:n,alpha:r,deep:o,filtered:!!i,plantsSeen:l,matchedPlants:d,applied:c,failed:u,totalFades:K.fades.size}}function t0(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchFadeSpecies: empty species");const r=`watchfade:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,o=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,a=K.fadeWatches.get(r);a&&clearInterval(a);const i=setInterval(()=>{ct(()=>rp(n,{...t,clear:!1}));},o);return K.fadeWatches.set(r,i),{ok:true,key:r,species:n,intervalMs:o}}function n0(e){const t=String(e||"").trim();if(!t)return  false;if(!t.startsWith("watchfade:")){const r=t.toLowerCase();let o=0;for(const[a,i]of Array.from(K.fadeWatches.entries()))a.startsWith(`watchfade:${r}:`)&&(clearInterval(i),K.fadeWatches.delete(a),o++);return o>0}const n=K.fadeWatches.get(t);return n?(clearInterval(n),K.fadeWatches.delete(t),true):false}function r0(e){const t=Array.isArray(e?.slots)?e.slots:[];return {objectType:"plant",species:e?.species??null,plantedAt:e?.plantedAt??null,maturedAt:e?.maturedAt??null,slotCount:t.length,slots:t.map((n,r)=>({idx:r,mutations:Array.isArray(n?.mutations)?n.mutations.slice():[]}))}}function o0(e,t,n={}){const r=Number(e)|0,o=Number(t)|0,a=n.ensureView!==false,i=Tt.getTileObject(r,o,{ensureView:a,clone:false}),s=i?.tileView||null,l=s?.tileObject,d={ok:true,tx:r,ty:o,gidx:i?.gidx??Tt.gidx?.(r,o)??null,hasTileView:!!s,objectType:l?.objectType??null,tileObject:l??null,summary:l?.objectType==="plant"?r0(l):l?{objectType:l.objectType??null}:null,display:s?s.childView?.plantVisual||s.childView||s.displayObject||s:null};return n.log!==false&&ct(()=>console.log("[MGPixi.inspectTile]",d)),d}function a0(e,t,n){const r=N.PIXI;if(!r)return;let o=K.stage.getChildByName("gemini-overlay");o||(o=new r.Container,o.name="gemini-overlay",K.stage.addChild(o));const a=n.key;let i=o.getChildByName(a);i||(i=new r.Graphics,i.name=a,o.addChild(i));const s=Tt.tileToPoint(e,t);if(!s)return;i.clear(),i.lineStyle(2,n.tint??65280,n.alpha??1),i.beginFill(n.tint??65280,(n.alpha??1)*.2);const l=Tt.getTransform(),d=l?Math.hypot(l.vx.x,l.vx.y):32,c=l?Math.hypot(l.vy.x,l.vy.y):32;i.drawRect(0,0,d,c),i.endFill(),i.x=s.x,i.y=s.y,l&&(i.rotation=Math.atan2(l.vx.y,l.vx.x));}function i0(e){const t=K.stage?.getChildByName("gemini-overlay");if(!t)return  false;const n=t.getChildByName(e);return n?(t.removeChild(n),n.destroy?.(),true):false}function Me(){if(!Ku())throw new Error("MGPixi: call MGPixi.init() first")}const Ra={init:Hy,isReady:Ku,expose:Ui,get app(){return K.app},get renderer(){return K.renderer},get stage(){return K.stage},get ticker(){return K.ticker},get PIXI(){return N.PIXI||null},defineTileSet:(e,t)=>(Me(),qy(e,t)),deleteTileSet:e=>(Me(),Ky(e)),listTileSets:()=>(Me(),Yy()),highlightPulse:(e,t)=>(Me(),Zu(e,t)),stopHighlight:e=>(Me(),Xs(e)),clearHighlights:e=>(Me(),Qu(e)),drawOverlayBox:(e,t,n)=>(Me(),a0(e,t,n)),stopOverlay:e=>(Me(),i0(e)),highlightMutation:(e,t)=>(Me(),ep(e,t)),watchMutation:(e,t)=>(Me(),Qy(e,t)),stopWatchMutation:e=>(Me(),Zy(e)),inspectTile:(e,t,n)=>(Me(),o0(e,t,n)),fadeSpecies:(e,t)=>(Me(),rp(e,t)),clearSpeciesFade:(e,t)=>(Me(),np(e,t)),clearFades:e=>(Me(),qi(e)),watchFadeSpecies:(e,t)=>(Me(),t0(e,t)),stopWatchFadeSpecies:e=>(Me(),n0(e))};function s0(){return {ready:false,baseUrl:null,urls:{ambience:new Map,music:new Map},sfx:{mp3Url:null,atlasUrl:null,atlas:null,groups:new Map,buffer:null},tracks:{ambience:null,music:null},customAudio:{current:null,onEnd:void 0},ctx:null}}const te=s0();function op(){return te.ready}const cc=N??window;async function ap(){const e=te.ctx;if(e)return e;const t=cc.AudioContext||cc.webkitAudioContext;if(!t)throw new Error("WebAudio not supported");const n=new t;return te.ctx=n,n}async function ip(){if(te.ctx&&te.ctx.state==="suspended")try{await te.ctx.resume();}catch{}}const l0={sfx:"soundEffectsVolume",music:"musicVolume",ambience:"ambienceVolume"},c0={sfx:"soundEffectsVolumeAtom",music:"musicVolumeAtom",ambience:"ambienceVolumeAtom"},wr=.001,Sr=.2;function dc(e,t=NaN){try{const n=localStorage.getItem(e);if(n==null)return t;let r;try{r=JSON.parse(n);}catch{r=n;}if(typeof r=="number"&&Number.isFinite(r))return r;if(typeof r=="string"){const o=parseFloat(r);if(Number.isFinite(o))return o}}catch{}return t}function $r(e){const t=l0[e],n=c0[e];if(!t)return {atom:Sr,vol100:vo(Sr)};const r=dc(t,NaN);if(Number.isFinite(r)){const a=yt(r,0,1);return {atom:a,vol100:vo(a)}}if(n){const a=dc(n,NaN);if(Number.isFinite(a)){const i=yt(a,0,1);return {atom:i,vol100:vo(i)}}}const o=Sr;return {atom:o,vol100:vo(o)}}function d0(e){const t=Number(e);if(!Number.isFinite(t))return null;if(t<=0)return 0;const r=(yt(t,1,100)-1)/99;return wr+r*(Sr-wr)}function vo(e){const t=yt(Number(e),0,1);if(t<=wr)return 0;const n=(t-wr)/(Sr-wr);return Math.round(1+n*99)}function sp(e,t){if(t==null)return $r(e).atom;const n=d0(t);return n===null?$r(e).atom:Jh(n)}function u0(e){const t=new Map,n=(r,o)=>{t.has(r)||t.set(r,[]),t.get(r).push(o);};for(const r of Object.keys(e||{})){const o=/^(.*)_([A-Z])$/.exec(r);o?.[1]?n(o[1],r):n(r,r);}for(const[r,o]of Array.from(t.entries()))o.sort((a,i)=>a.localeCompare(i)),t.set(r,o);te.sfx.groups=t;}function p0(e){const t=te.sfx.atlas;if(!t)throw new Error("SFX atlas not loaded");if(t[e])return e;const n=te.sfx.groups.get(e);if(n?.length)return n[Math.random()*n.length|0];throw new Error(`Unknown sfx/group: ${e}`)}async function f0(){if(te.sfx.buffer)return te.sfx.buffer;if(!te.sfx.mp3Url)throw new Error("SFX mp3 url missing");const e=await ap();await ip();const n=await(await Jd(te.sfx.mp3Url)).arrayBuffer(),r=await new Promise((o,a)=>{const i=e.decodeAudioData(n,o,a);i?.then&&i.then(o,a);});return te.sfx.buffer=r,r}async function g0(e,t={}){if(!te.ready)throw new Error("MGAudio not ready yet");const n=String(e||"").trim();if(!n)throw new Error("Missing sfx name");const r=p0(n),o=te.sfx.atlas[r];if(!o)throw new Error(`Missing segment for sfx: ${r}`);const a=await ap();await ip();const i=await f0(),s=Math.max(0,+o.start||0),l=Math.max(s,+o.end||s),d=Math.max(.01,l-s),c=sp("sfx",t.volume),u=a.createGain();u.gain.value=c,u.connect(a.destination);const p=a.createBufferSource();return p.buffer=i,p.connect(u),p.start(0,s,d),{name:r,source:p,start:s,end:l,duration:d,volume:c}}const h0=(function(){const t=typeof document<"u"&&document.createElement("link").relList;return t&&t.supports&&t.supports("modulepreload")?"modulepreload":"preload"})(),m0=function(e){return "/"+e},uc={},Bn=function(t,n,r){let o=Promise.resolve();if(n&&n.length>0){let l=function(d){return Promise.all(d.map(c=>Promise.resolve(c).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),s=i?.nonce||i?.getAttribute("nonce");o=l(n.map(d=>{if(d=m0(d),d in uc)return;uc[d]=true;const c=d.endsWith(".css"),u=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${u}`))return;const p=document.createElement("link");if(p.rel=c?"stylesheet":h0,c||(p.as="script"),p.crossOrigin="",p.href=d,s&&p.setAttribute("nonce",s),document.head.appendChild(p),c)return new Promise((f,g)=>{p.addEventListener("load",f),p.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${d}`)));})}));}function a(i){const s=new Event("vite:preloadError",{cancelable:true});if(s.payload=i,window.dispatchEvent(s),!s.defaultPrevented)throw i}return o.then(i=>{for(const s of i||[])s.status==="rejected"&&a(s.reason);return t().catch(a)})},La={MAX_SOUNDS:50,MAX_SIZE_BYTES:250*1024},b0={sounds:[],version:1};class qs extends Error{constructor(t){super(t),this.name="CustomSoundError";}}class x0 extends qs{constructor(){super(`Maximum number of sounds reached (${La.MAX_SOUNDS})`),this.name="SoundLimitError";}}class y0 extends qs{constructor(t){super(`Sound size (${Math.round(t/1024)}KB) exceeds limit (${La.MAX_SIZE_BYTES/1024}KB)`),this.name="SoundSizeError";}}class v0 extends qs{constructor(t){super(`Sound not found: ${t}`),this.name="SoundNotFoundError";}}function w0(){return ye(Sa.MODULE.AUDIO_CUSTOM_SOUNDS,b0)}function S0(e){Te(Sa.MODULE.AUDIO_CUSTOM_SOUNDS,e);}function pc(){return w0().sounds}function Na(e){S0({sounds:e,version:1});}const C0="https://cdn.pixabay.com/audio/2025/05/31/audio_b2dfcd42bb.mp3",lp=[{id:"default-notification",name:"Default",source:C0,type:"upload",createdAt:0}];function k0(e){const t=new Set(e.map(r=>r.id)),n=lp.filter(r=>!t.has(r.id));return n.length===0?e:[...e,...n]}function cp(e){return lp.some(t=>t.id===e)}function T0(e){if(!e.startsWith("data:"))return 0;const n=e.indexOf(",");if(n===-1)return 0;const o=e.slice(n+1).length*3/4;return Math.round(o)}function dp(e){if(!e||!e.trim())throw new Error("Sound source cannot be empty");const t=T0(e);if(t>0&&t>La.MAX_SIZE_BYTES)throw new y0(t)}function up(e){if(!e||!e.trim())throw new Error("Sound name cannot be empty");if(e.length>100)throw new Error("Sound name too long (max 100 characters)")}function I0(e){if(e>=La.MAX_SOUNDS)throw new x0}let rt=[],Ki=false;function Dn(){Ki||pp();}function _0(){return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,e=>{const t=Math.random()*16|0;return (e==="x"?t:t&3|8).toString(16)})}function pp(){if(Ki)return;let e=pc();e=k0(e),e.length!==pc().length&&Na(e),rt=e,Ki=true,console.log(`[CustomSounds] Initialized with ${rt.length} sounds`);}function A0(){return Dn(),[...rt]}function fp(e){return Dn(),rt.find(t=>t.id===e)}function P0(e,t,n){Dn(),up(e),dp(t),I0(rt.length);const r={id:_0(),name:e.trim(),source:t.trim(),type:n,createdAt:Date.now()};return rt.push(r),Na(rt),console.log(`[CustomSounds] Added sound: ${r.name} (${r.id})`),r}function E0(e){if(Dn(),cp(e))throw new Error("Cannot remove default sounds");const t=rt.findIndex(r=>r.id===e);if(t===-1)return  false;const n=rt.splice(t,1)[0];return Na(rt),console.log(`[CustomSounds] Removed sound: ${n.name} (${n.id})`),true}function M0(e,t){if(Dn(),cp(e))throw new Error("Cannot update default sounds");const n=rt.find(r=>r.id===e);return n?(t.name!==void 0&&(up(t.name),n.name=t.name.trim()),t.source!==void 0&&(dp(t.source),n.source=t.source.trim()),Na(rt),console.log(`[CustomSounds] Updated sound: ${n.name} (${n.id})`),true):false}async function R0(e,t={}){Dn();const n=fp(e);if(!n)throw new v0(e);const{MGAudio:r}=await Bn(async()=>{const{MGAudio:o}=await Promise.resolve().then(()=>bp);return {MGAudio:o}},void 0);try{await r.playCustom(n.source,{volume:t.volume??.5,loop:t.loop??!1}),console.log(`[CustomSounds] Playing: ${n.name} (${n.id})`);}catch(o){throw console.error(`[CustomSounds] Failed to play ${n.name}:`,o),o}}function L0(){Bn(async()=>{const{MGAudio:e}=await Promise.resolve().then(()=>bp);return {MGAudio:e}},void 0).then(({MGAudio:e})=>{e.stopCustom(),console.log("[CustomSounds] Stopped current sound");});}const gp={init:pp,getAll:A0,getById:fp,add:P0,remove:E0,update:M0,play:R0,stop:L0};let wo=null;async function N0(){return te.ready?true:wo||(wo=(async()=>{te.baseUrl=await ln.base();const e=await kt.load({baseUrl:te.baseUrl}),t=kt.getBundle(e,"audio");if(!t)throw new Error("No audio bundle in manifest");for(const n of t.assets||[])for(const r of n.src||[]){if(typeof r!="string")continue;const o=/^audio\/(ambience|music)\/(.+)\.mp3$/i.exec(r);if(o){const a=o[1].toLowerCase(),i=o[2];te.urls[a].set(i,Ct(te.baseUrl,r));continue}/^audio\/sfx\/sfx\.mp3$/i.test(r)&&(te.sfx.mp3Url=Ct(te.baseUrl,r)),/^audio\/sfx\/sfx\.json$/i.test(r)&&(te.sfx.atlasUrl=Ct(te.baseUrl,r));}if(!te.sfx.atlasUrl)throw new Error("Missing audio/sfx/sfx.json in manifest");return te.sfx.atlas=await As(te.sfx.atlasUrl),u0(te.sfx.atlas),gp.init(),te.ready=true,true})(),wo)}function hp(e){if(e!=="music"&&e!=="ambience")return  false;const t=te.tracks[e];if(t){try{t.pause();}catch{}try{t.src="";}catch{}}return te.tracks[e]=null,true}function F0(e,t,n={}){if(!te.ready)throw new Error("MGAudio not ready yet");if(e!=="music"&&e!=="ambience")throw new Error(`Invalid category: ${e}`);const r=te.urls[e].get(t);if(!r)throw new Error(`Unknown ${e}: ${t}`);hp(e);const o=new Audio(r);return o.loop=!!n.loop,o.volume=sp(e,n.volume),o.preload="auto",o.play().catch(()=>{}),te.tracks[e]=o,o}function O0(e,t={}){const n=String(e||"").trim();return n==="music"||n==="ambience"?Array.from(te.urls[n].keys()).sort():n==="sfx"?te.sfx.atlas?t.groups?Array.from(te.sfx.groups.keys()).sort():Object.keys(te.sfx.atlas).sort():[]:[]}function $0(){return ["sfx","music","ambience"]}function B0(){return Array.from(te.sfx.groups.keys()).sort((e,t)=>e.localeCompare(t))}function D0(e,t){const n=String(e||"").trim().toLowerCase(),r=String(t||"").trim();if(!r||n!=="music"&&n!=="ambience")return  false;const o=te.urls[n],a=r.toLowerCase();for(const i of Array.from(o.keys()))if(i.toLowerCase()===a)return  true;return  false}function G0(e){const t=String(e||"").trim();if(!t)return  false;const n=t.toLowerCase();for(const r of Array.from(te.sfx.groups.keys()))if(r.toLowerCase()===n)return  true;return  false}function z0(e,t){const n=String(e||"").trim().toLowerCase(),r=String(t||"").trim();if(!r)throw new Error("getTrackUrl(category, name) missing name");if(n!=="music"&&n!=="ambience")throw new Error(`Invalid category: ${e}`);const o=te.urls[n],a=r.toLowerCase();for(const[i,s]of Array.from(o.entries()))if(i.toLowerCase()===a)return s;return null}function H0(){return te.tracks.music&&(te.tracks.music.volume=$r("music").atom),te.tracks.ambience&&(te.tracks.ambience.volume=$r("ambience").atom),true}let Ue=null;async function j0(e,t={}){mp();const n=new Audio(e);n.volume=t.volume??1,n.loop=t.loop??false,n.preload="auto";const r={audio:n,url:e,stop:()=>{n.loop?n.loop=false:(n.pause(),n.currentTime=0,Ue?.audio===n&&(Ue=null));},setVolume:o=>{n.volume=Math.max(0,Math.min(1,o));},isPlaying:()=>!n.paused&&!n.ended};Ue=r;try{await new Promise((o,a)=>{const i=setTimeout(()=>{a(new Error("Audio load timeout"));},5e3),s=()=>{clearTimeout(i),n.removeEventListener("canplay",l),n.removeEventListener("error",d);},l=()=>{s(),o();},d=()=>{s(),a(new Error(`Audio load error: ${n.error?.message}`));};n.readyState>=2?(clearTimeout(i),o()):(n.addEventListener("canplay",l,{once:!0}),n.addEventListener("error",d,{once:!0}));}),await n.play();}catch(o){throw Ue=null,o}return n.addEventListener("ended",()=>{Ue?.audio===n&&(Ue=null);}),r}function mp(){return Ue?(Ue.stop(),Ue=null,true):false}function W0(e){return Ue?(Ue.setVolume(e),true):false}function U0(){return Ue?.isPlaying()??false}function V0(){return Ue}function ze(){if(!op())throw new Error("MGAudio not ready yet")}async function X0(e,t,n={}){const r=String(e||"").trim(),o=String(t||"").trim();if(!r||!o)throw new Error("play(category, asset) missing args");if(r==="sfx")return g0(o,n);if(r==="music"||r==="ambience")return F0(r,o,n);throw new Error(`Unknown category: ${r}`)}const $t={init:N0,isReady:op,play:X0,stop:e=>(ze(),hp(e)),list:(e,t)=>(ze(),O0(e,t)),refreshVolumes:()=>(ze(),H0()),categoryVolume:e=>(ze(),$r(e)),getCategories:()=>(ze(),$0()),getGroups:()=>(ze(),B0()),hasTrack:(e,t)=>(ze(),D0(e,t)),hasGroup:e=>(ze(),G0(e)),getTrackUrl:(e,t)=>(ze(),z0(e,t)),playCustom:async(e,t)=>(ze(),j0(e,t)),stopCustom:()=>(ze(),mp()),setCustomVolume:e=>(ze(),W0(e)),isCustomPlaying:()=>(ze(),U0()),getCustomHandle:()=>(ze(),V0()),CustomSounds:gp},bp=Object.freeze(Object.defineProperty({__proto__:null,MGAudio:$t},Symbol.toStringTag,{value:"Module"}));function q0(){return {ready:false,baseUrl:null,byCat:new Map,byBase:new Map,overlay:null,live:new Set,defaultParent:null}}const be=q0();function xp(){return be.ready}let So=null;async function K0(){return be.ready?true:So||(So=(async()=>{be.baseUrl=await ln.base();const e=await kt.load({baseUrl:be.baseUrl}),t=kt.getBundle(e,"cosmetic");if(!t)throw new Error("No 'cosmetic' bundle in manifest");be.byCat.clear(),be.byBase.clear();for(const n of t.assets||[])for(const r of n.src||[]){if(typeof r!="string"||!/^cosmetic\/.+\.png$/i.test(r))continue;const a=r.split("/").pop().replace(/\.png$/i,""),i=a.indexOf("_");if(i<0)continue;const s=a.slice(0,i),l=a.slice(i+1),d=Ct(be.baseUrl,r);be.byBase.set(a,d),be.byCat.has(s)||be.byCat.set(s,new Map),be.byCat.get(s).set(l,d);}return be.ready=true,true})(),So)}function Yi(e){let t=String(e||"").trim();return t?(t=t.replace(/^cosmetic\//i,""),t=t.replace(/\.png$/i,""),t):""}function Y0(e,t){if(t===void 0){const a=Yi(e),i=a.indexOf("_");return i<0?{cat:"",asset:a,base:a}:{cat:a.slice(0,i),asset:a.slice(i+1),base:a}}const n=String(e||"").trim(),r=Yi(t),o=r.includes("_")?r:`${n}_${r}`;if(r.includes("_")&&!n){const a=r.indexOf("_");return {cat:r.slice(0,a),asset:r.slice(a+1),base:r}}return {cat:n,asset:r.replace(/^.+?_/,""),base:o}}function J0(){return Array.from(be.byCat.keys()).sort((e,t)=>e.localeCompare(t))}function Q0(e){const t=be.byCat.get(String(e||"").trim());return t?Array.from(t.keys()).sort((n,r)=>n.localeCompare(r)):[]}function Ji(e,t){const{cat:n,asset:r,base:o}=Y0(e,t),a=be.byBase.get(o);if(a)return a;const s=be.byCat.get(n)?.get(r);if(s)return s;if(!be.baseUrl)throw new Error("MGCosmetic not initialized");if(!o)throw new Error("Invalid cosmetic name");return Ct(be.baseUrl,`cosmetic/${o}.png`)}const fc=N?.document??document;function Z0(){if(be.overlay)return be.overlay;const e=fc.createElement("div");return e.id="MG_COSMETIC_OVERLAY",e.style.cssText=["position:fixed","left:0","top:0","width:100vw","height:100vh","pointer-events:none","z-index:99999999"].join(";"),fc.documentElement.appendChild(e),be.overlay=e,e}function ev(){const e=be.defaultParent;if(!e)return null;try{return typeof e=="function"?e():e}catch{return null}}function tv(e){return be.defaultParent=e,true}const nv=N?.document??document;function Qi(e,t,n){if(!be.ready)throw new Error("MGCosmetic not ready yet");let r,o;typeof t=="object"&&t!==null?(r=t,o=void 0):typeof t=="string"?(o=t,r=n||{}):(o=void 0,r=n||{});const a=o!==void 0?Ji(e,o):Ji(e),i=nv.createElement("img");if(i.decoding="async",i.loading="eager",i.src=a,i.alt=r.alt!=null?String(r.alt):Yi(o??e),r.className&&(i.className=String(r.className)),r.width!=null&&(i.style.width=String(r.width)),r.height!=null&&(i.style.height=String(r.height)),r.opacity!=null&&(i.style.opacity=String(r.opacity)),r.style&&typeof r.style=="object")for(const[s,l]of Object.entries(r.style))try{i.style[s]=String(l);}catch{}return i}function rv(e,t,n){let r,o;typeof t=="object"&&t!==null?(r=t,o=void 0):typeof t=="string"?(o=t,r=n||{}):(o=void 0,r=n||{});const a=r.parent||ev()||Z0(),i=o!==void 0?Qi(e,o,r):Qi(e,r);if(a===be.overlay||r.center||r.x!=null||r.y!=null||r.absolute){i.style.position="absolute",i.style.pointerEvents="none",i.style.zIndex=String(r.zIndex??999999);const l=r.scale??1,d=r.rotation??0;if(r.center)i.style.left="50%",i.style.top="50%",i.style.transform=`translate(-50%, -50%) scale(${l}) rotate(${d}rad)`;else {const c=r.x??innerWidth/2,u=r.y??innerHeight/2;i.style.left=`${c}px`,i.style.top=`${u}px`,i.style.transform=`scale(${l}) rotate(${d}rad)`,r.anchor==="center"&&(i.style.transform=`translate(-50%, -50%) scale(${l}) rotate(${d}rad)`);}}return a.appendChild(i),be.live.add(i),i.__mgDestroy=()=>{try{i.remove();}catch{}be.live.delete(i);},i}function ov(){for(const e of Array.from(be.live))e.__mgDestroy?.();}function Ut(){if(!xp())throw new Error("MGCosmetic not ready yet")}const Ks={init:K0,isReady:xp,categories:()=>(Ut(),J0()),list:e=>(Ut(),Q0(e)),url:((e,t)=>(Ut(),Ji(e,t))),create:((e,t,n)=>(Ut(),Qi(e,t,n))),show:((e,t,n)=>(Ut(),rv(e,t,n))),attach:e=>(Ut(),tv(e)),clear:()=>(Ut(),ov())},cr={Gold:25,Rainbow:50,Wet:2,Chilled:2,Frozen:10,Dawnlit:2,Dawnbound:3,Amberlit:5,Amberbound:6},av=new Set(["Gold","Rainbow"]),iv=new Set(["Wet","Chilled","Frozen","Dawnlit","Dawnbound","Amberlit","Amberbound"]);function yp(e){let t=1,n=0,r=0;for(const o of e)o==="Gold"||o==="Rainbow"?o==="Rainbow"?t=cr.Rainbow:t===1&&(t=cr.Gold):o in cr&&(n+=cr[o],r++);return t*(1+n-r)}function sv(e){return cr[e]??null}function lv(e){return av.has(e)}function cv(e){return iv.has(e)}function dv(e){return cv(e)}function Ys(e,t){const n=Fa(e);if(!n)return 50;const r=n.maxScale;if(t<=1)return 50;if(t>=r)return 100;const o=(t-1)/(r-1);return Math.floor(50+50*o)}function dt(e,t,n){const r=Fa(e);if(!r)return 0;const o=r.baseSellPrice,a=yp(n);return Math.round(o*t*a)}function uv(e,t,n){if(n>=t)return 100;if(n<=e)return 0;const r=t-e,o=n-e;return Math.floor(o/r*100)}function pv(e,t){return t>=e}function Fa(e){const t=V.get("plants");if(!t)return null;const n=t[e];return n?.crop?{baseSellPrice:n.crop.baseSellPrice??0,maxScale:n.crop.maxScale??1,growTime:n.crop.growTime??0}:null}const vp=3600,li=80,fv=100,dr=30;function Oa(e){return e/vp}function $a(e,t){const n=Yr(e);if(!n)return li;const r=n.maxScale;if(t<=1)return li;if(t>=r)return fv;const o=(t-1)/(r-1);return Math.floor(li+20*o)}function Ba(e,t,n){const r=Yr(e);if(!r)return n-dr;const o=r.hoursToMature,a=t/vp,i=dr/o,s=Math.min(i*a,dr),l=n-dr;return Math.floor(l+s)}function Da(e,t){const n=Yr(e);return n?t>=n.hoursToMature:false}function wp(e){const t=Yr(e);return t?dr/t.hoursToMature:0}function gv(e,t,n){const r=t-e;return r<=0||n<=0?0:r/n}function Yr(e){const t=V.get("pets");if(!t)return null;const n=t[e];return n?{hoursToMature:n.hoursToMature??0,maxScale:n.maxScale??1,abilities:n.abilities??[]}:null}function hv(e,t){return t<=0?1:Math.min(1,e/t)}const Pe=3600,Co=80,gc=100,vt=30,mv={Worm:30,Snail:60,Bee:15,Chicken:60,Bunny:45,Dragonfly:15,Pig:60,Cow:75,Turkey:60,SnowFox:45,Stoat:60,WhiteCaribou:75,Squirrel:30,Turtle:90,Goat:60,Butterfly:30,Peacock:60,Capybara:60};function Jr(e){const t=V.get("pets");if(!t)return null;const n=t[e];return n?{hoursToMature:n.hoursToMature??0,maxScale:n.maxScale??1}:null}function bv(e){return e/Pe}function Qr(e,t){const n=Jr(e);if(!n)return Co;const{maxScale:r}=n;if(t<=1)return Co;if(t>=r)return gc;const o=(t-1)/(r-1);return Math.floor(Co+(gc-Co)*o)}function xv(e){return e-vt}function yv(e){const t=Jr(e);return !t||t.hoursToMature<=0?0:vt/t.hoursToMature}function Zr(e,t,n){const r=Jr(e);if(!r)return n-vt;const o=t/Pe,a=vt/r.hoursToMature,i=Math.min(a*o,vt),s=n-vt;return Math.floor(s+i)}function Sp(e,t,n){const r=Jr(e);if(!r)return 0;const o=n-vt,a=t-o;if(a<=0)return 0;const i=vt/r.hoursToMature;return i<=0?0:a/i*Pe}function Js(e,t,n,r,o=Pe){const i=Sp(e,n,r)-t;return i<=0?0:o<=0?1/0:i/o}function Ga(e,t,n,r=Pe){return Js(e,t,n,n,r)}function Qs(e,t,n,r,o=Pe){if(n>=r)return 0;const a=n+1;return Js(e,t,a,r,o)}function vv(e,t){return e>=t}function wv(e,t){const n=t-vt,o=(e-n)/vt*100;return Math.min(100,Math.max(0,o))}const Sv=Object.freeze(Object.defineProperty({__proto__:null,calculateAge:bv,calculateCurrentStrength:Zr,calculateHoursToMaxStrength:Ga,calculateHoursToNextStrength:Qs,calculateHoursToStrength:Js,calculateMaxStrength:Qr,calculateStartingStrength:xv,calculateStrengthPerHour:yv,calculateStrengthProgress:wv,calculateXpForStrength:Sp,getSpeciesData:Jr,isPetMature:vv},Symbol.toStringTag,{value:"Module"}));function Zs(e){const t=V.get("pets");if(!t)return 100/24;const n=t[e];if(!n?.coinsToFullyReplenishHunger)return 100/24;const r=mv[e];return r?n.coinsToFullyReplenishHunger/r*60:(console.warn(`[Feed] Unknown species "${e}", using 60min default`),n.coinsToFullyReplenishHunger/60*60)}function Cv(e,t){return e<=0?0:t<=0?1/0:e/t}function el(e,t,n,r){if(e<=0||n<=0)return 0;const o=t/n;if(o>=e)return 0;const a=e-o,i=r/n;return Math.ceil(a/i)}function tl(e,t,n){const r=V.get("pets");if(!r)return 0;const o=r[e];if(!o?.coinsToFullyReplenishHunger)return 0;const a=o.coinsToFullyReplenishHunger,i=Zs(e);return el(n,t,i,a)}function Br(e,t,n){const r=V.get("pets");if(!r)return 0;const o=r[e];if(!o?.coinsToFullyReplenishHunger)return 0;const a=o.coinsToFullyReplenishHunger,i=Zs(e);return el(n,t,i,a)}function nl(e,t,n,r,o,a){return e?t&&a>0?Br(n,r,a):0:Br(n,r,o)}const kv=Object.freeze(Object.defineProperty({__proto__:null,calculateAdjustedFeedsToMax:nl,calculateFeedsForDuration:el,calculateFeedsToMaxStrength:Br,calculateFeedsToNextStrength:tl,calculateHoursUntilStarving:Cv,getHungerDrainPerHour:Zs},Symbol.toStringTag,{value:"Module"})),Cp={init(){},isReady(){return  true},crop:{calculateSize:Ys,calculateSellPrice:dt,calculateProgress:uv,isReady:pv,getData:Fa},pet:{calculateAge:Oa,calculateMaxStrength:$a,calculateCurrentStrength:Ba,isMature:Da,calculateStrengthPerHour:wp,getData:Yr},mutation:{calculateMultiplier:yp,getValue:sv,isGrowth:lv,isEnvironmental:dv},xp:Sv,feed:kv},Tv=100,ci=[];function Zi(e,t,n){let r="";if(n&&typeof n=="object"){if(t==="PartialState"){const o=n.op||"",a=n.path||"";let i="";if("value"in n){const s=n.value;i=typeof s=="object"?`{${Object.keys(s||{}).slice(0,2).join(",")}}`:String(s);}if(o||a)r=`PartialState : ${o} ${a} ${i}`.trim();else {const s=Object.keys(n).filter(l=>l!=="type");s.length>0&&(r=`PartialState - {${s.join(", ")}}`);}}if(!r&&n.event&&(r+=`${n.event} `),!r&&n.op&&(r+=`op:${n.op} `),!r&&n.data){const o=Object.keys(n.data);o.length>0&&(r+=`{${o.slice(0,3).join(",")}${o.length>3?"...":""}}`);}else !r&&Array.isArray(n)&&(r+=`[${n.length} items]`);}else typeof n=="string"&&(r=n.slice(0,50));ci.push({direction:e,type:String(t),timestamp:Date.now(),payload:n,summary:r.trim()||"-"}),ci.length>Tv&&ci.shift();}const He={nativeCtor:null,captured:[],latestOpen:null},hc=Symbol.for("ariesmod.ws.capture.wrapped"),mc=Symbol.for("ariesmod.ws.capture.native"),kp=1;function es(e){return !!e&&e.readyState===kp}function Iv(){if(es(He.latestOpen))return He.latestOpen;for(let e=He.captured.length-1;e>=0;e--){const t=He.captured[e];if(es(t))return t}return null}function _v(e,t){He.captured.push(e),He.captured.length>25&&He.captured.splice(0,He.captured.length-25);const n=()=>{He.latestOpen=e,t&&console.log("[WS] captured socket opened",e.url);};e.addEventListener("open",n),e.addEventListener("close",()=>{He.latestOpen===e&&(He.latestOpen=null),t&&console.log("[WS] captured socket closed",e.url);}),e.addEventListener("message",r=>{try{const o=JSON.parse(r.data);Zi("in",o.type||"unknown",o);}catch{Zi("in","raw",r.data);}}),e.readyState===kp&&n();}function Av(e=N,t={}){const n=!!t.debug,r=e?.WebSocket;if(typeof r!="function")return ()=>{};if(r[hc])return He.nativeCtor=r[mc]??He.nativeCtor??null,()=>{};const o=r;He.nativeCtor=o;function a(i,s){const l=s!==void 0?new o(i,s):new o(i);try{_v(l,n);}catch{}return l}try{a.prototype=o.prototype;}catch{}try{Object.setPrototypeOf(a,o);}catch{}try{a.CONNECTING=o.CONNECTING,a.OPEN=o.OPEN,a.CLOSING=o.CLOSING,a.CLOSED=o.CLOSED;}catch{}a[hc]=true,a[mc]=o;try{e.WebSocket=a,n&&console.log("[WS] WebSocket capture installed");}catch{return ()=>{}}return ()=>{try{e.WebSocket===a&&(e.WebSocket=o);}catch{}}}function Pv(e=N){const t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function ha(e=N){const t=Iv();if(t)return {ws:t,source:"captured"};const n=Pv(e);return n?{ws:n,source:"roomConnection"}:{ws:null,source:null}}function Tp(e,t={}){const n=t.pageWindow??N,r=t.intervalMs??500,o=!!t.debug;let a=null,i=null;const s=()=>{const d=ha(n);(d.ws!==a||d.source!==i)&&(a=d.ws,i=d.source,o&&console.log("[WS] best socket changed:",d.source,d.ws),e(d));};s();const l=setInterval(s,r);return ()=>clearInterval(l)}function Ev(e){if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return null}}function Mv(e,t=N){const n=t?.MagicCircle_RoomConnection;if(n&&typeof n.sendMessage=="function")try{return Array.isArray(e)?n.sendMessage(...e):n.sendMessage(e),{ok:!0}}catch(a){return {ok:false,reason:"error",error:a}}const{ws:r}=ha(t);if(!r)return {ok:false,reason:"no-ws"};if(!es(r))return {ok:false,reason:"not-open"};const o=Ev(e);if(o==null)return {ok:false,reason:"error",error:new Error("Cannot stringify message")};try{const a=JSON.parse(o);Zi("out",a.type||"unknown",a);}catch{}try{return r.send(o),{ok:!0}}catch(a){return {ok:false,reason:"error",error:a}}}function Rv(e,t={},n=N){return Mv({type:e,...t},n)}const It={Welcome:"Welcome",PartialState:"PartialState",ServerErrorMessage:"ServerErrorMessage",Config:"Config",InappropriateContentRejected:"InappropriateContentRejected",Emote:"Emote",CurrencyTransaction:"CurrencyTransaction",Pong:"Pong"},M={Chat:"Chat",Emote:"Emote",Wish:"Wish",KickPlayer:"KickPlayer",SetPlayerData:"SetPlayerData",UsurpHost:"UsurpHost",Dev:"Dev",SetSelectedGame:"SetSelectedGame",VoteForGame:"VoteForGame",RequestGame:"RequestGame",RestartGame:"RestartGame",Ping:"Ping",PlayerPosition:"PlayerPosition",Teleport:"Teleport",CheckWeatherStatus:"CheckWeatherStatus",MoveInventoryItem:"MoveInventoryItem",DropObject:"DropObject",PickupObject:"PickupObject",ToggleFavoriteItem:"ToggleFavoriteItem",PutItemInStorage:"PutItemInStorage",RetrieveItemFromStorage:"RetrieveItemFromStorage",MoveStorageItem:"MoveStorageItem",LogItems:"LogItems",PlantSeed:"PlantSeed",WaterPlant:"WaterPlant",HarvestCrop:"HarvestCrop",SellAllCrops:"SellAllCrops",PurchaseSeed:"PurchaseSeed",PurchaseEgg:"PurchaseEgg",PurchaseTool:"PurchaseTool",PurchaseDecor:"PurchaseDecor",PlantEgg:"PlantEgg",HatchEgg:"HatchEgg",PlantGardenPlant:"PlantGardenPlant",PotPlant:"PotPlant",MutationPotion:"MutationPotion",PickupDecor:"PickupDecor",PlaceDecor:"PlaceDecor",RemoveGardenObject:"RemoveGardenObject",PlacePet:"PlacePet",FeedPet:"FeedPet",PetPositions:"PetPositions",SwapPet:"SwapPet",StorePet:"StorePet",NamePet:"NamePet",SellPet:"SellPet",ReportSpeakingStart:"ReportSpeakingStart"};var pt=(e=>(e[e.ReconnectInitiated=4100]="ReconnectInitiated",e[e.PlayerLeftVoluntarily=4200]="PlayerLeftVoluntarily",e[e.UserSessionSuperseded=4250]="UserSessionSuperseded",e[e.ConnectionSuperseded=4300]="ConnectionSuperseded",e[e.ServerDisposed=4310]="ServerDisposed",e[e.HeartbeatExpired=4400]="HeartbeatExpired",e[e.PlayerKicked=4500]="PlayerKicked",e[e.VersionMismatch=4700]="VersionMismatch",e[e.VersionExpired=4710]="VersionExpired",e[e.AuthenticationFailure=4800]="AuthenticationFailure",e))(pt||{});new Set(Object.values(It));new Set(Object.values(M));const Lv=["Room","Quinoa"],Nv={Room:["Room"],Quinoa:Lv};function re(e,t={},n=N){const r=t,{scopePath:o,scope:a,...i}=r,s=typeof o=="string"?o:a,l=Array.isArray(o)?o:s==="Room"||s==="Quinoa"?Nv[s]:null;return Rv(e,l?{scopePath:l,...i}:i,n)}function Fv(e,t=N){return re(M.Chat,{scope:"Room",message:e},t)}function Ov(e,t=N){return re(M.Emote,{scope:"Room",emoteType:e},t)}function $v(e,t=N){return re(M.Wish,{scope:"Quinoa",wish:e},t)}function Bv(e,t=N){return re(M.KickPlayer,{scope:"Room",playerId:e},t)}function Dv(e,t=N){return re(M.SetPlayerData,{scope:"Room",data:e},t)}function Gv(e=N){return re(M.UsurpHost,{scope:"Quinoa"},e)}function zv(e=N){return re(M.ReportSpeakingStart,{scope:"Quinoa"},e)}function Hv(e,t=N){return re(M.SetSelectedGame,{scope:"Room",gameId:e},t)}function jv(e,t=N){return re(M.VoteForGame,{scope:"Room",gameId:e},t)}function Wv(e,t=N){return re(M.RequestGame,{scope:"Room",gameId:e},t)}function Uv(e=N){return re(M.RestartGame,{scope:"Room"},e)}function Vv(e,t=N){return re(M.Ping,{scope:"Quinoa",id:e},t)}function Ip(e,t,n=N){return re(M.PlayerPosition,{scope:"Quinoa",x:e,y:t},n)}const Xv=Ip;function qv(e,t,n=N){return re(M.Teleport,{scope:"Quinoa",x:e,y:t},n)}function Kv(e=N){return re(M.CheckWeatherStatus,{scope:"Quinoa"},e)}function Yv(e,t,n=N){return re(M.MoveInventoryItem,{scope:"Quinoa",fromIndex:e,toIndex:t},n)}function Jv(e,t=N){return re(M.DropObject,{scope:"Quinoa",slotIndex:e},t)}function Qv(e,t=N){return re(M.PickupObject,{scope:"Quinoa",objectId:e},t)}function za(e,t=N){return re(M.ToggleFavoriteItem,{scope:"Quinoa",itemId:e},t)}function rl(e,t="PetHutch",n=N){return re(M.PutItemInStorage,{scope:"Quinoa",itemId:e,storageId:t},n)}function ol(e,t="PetHutch",n=N){return re(M.RetrieveItemFromStorage,{scope:"Quinoa",itemId:e,storageId:t},n)}function Zv(e,t,n=N){return re(M.MoveStorageItem,{scope:"Quinoa",fromIndex:e,toIndex:t},n)}function ew(e=N){return re(M.LogItems,{scope:"Quinoa"},e)}function tw(e,t,n,r=N){return re(M.PlantSeed,{scope:"Quinoa",seedId:e,x:t,y:n},r)}function nw(e,t=N){return re(M.WaterPlant,{scope:"Quinoa",plantId:e},t)}function rw(e,t=N){return re(M.HarvestCrop,{scope:"Quinoa",cropId:e},t)}function ow(e=N){return re(M.SellAllCrops,{scope:"Quinoa"},e)}function al(e,t=N){return re(M.PurchaseDecor,{scope:"Quinoa",decorId:e},t)}function il(e,t=N){return re(M.PurchaseEgg,{scope:"Quinoa",eggId:e},t)}function sl(e,t=N){return re(M.PurchaseTool,{scope:"Quinoa",toolId:e},t)}function ll(e,t=N){return re(M.PurchaseSeed,{scope:"Quinoa",species:e},t)}function aw(e,t,n,r=N){return re(M.PlantEgg,{scope:"Quinoa",eggId:e,x:t,y:n},r)}function iw(e,t=N){return re(M.HatchEgg,{scope:"Quinoa",eggId:e},t)}function sw(e,t,n,r=N){return re(M.PlantGardenPlant,{scope:"Quinoa",plantId:e,x:t,y:n},r)}function lw(e,t,n=N){return re(M.PotPlant,{scope:"Quinoa",plantId:e,potId:t},n)}function cw(e,t,n=N){return re(M.MutationPotion,{scope:"Quinoa",potionId:e,targetId:t},n)}function dw(e,t=N){return re(M.PickupDecor,{scope:"Quinoa",decorInstanceId:e},t)}function uw(e,t,n,r=N){return re(M.PlaceDecor,{scope:"Quinoa",decorId:e,x:t,y:n},r)}function pw(e,t=N){return re(M.RemoveGardenObject,{scope:"Quinoa",objectId:e},t)}function _p(e,t={x:0,y:0},n="Dirt",r=0,o=N){return re(M.PlacePet,{scope:"Quinoa",itemId:e,position:t,tileType:n,localTileIndex:r},o)}function fw(e,t,n=N){return re(M.FeedPet,{scope:"Quinoa",petId:e,foodItemId:t},n)}function gw(e,t=N){return re(M.PetPositions,{scope:"Quinoa",positions:e},t)}function Ap(e,t,n=N){return re(M.SwapPet,{scope:"Quinoa",petSlotId:e,petInventoryId:t},n)}function Pp(e,t=N){return re(M.StorePet,{scope:"Quinoa",itemId:e},t)}function hw(e,t,n=N){return re(M.NamePet,{scope:"Quinoa",petId:e,name:t},n)}function mw(e,t=N){return re(M.SellPet,{scope:"Quinoa",petId:e},t)}function ut(e,t){if(e===t)return  true;if(e===null||t===null)return e===t;if(typeof e!=typeof t)return  false;if(typeof e!="object")return e===t;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return  false;for(let i=0;i<e.length;i++)if(!ut(e[i],t[i]))return  false;return  true}if(Array.isArray(e)||Array.isArray(t))return  false;const n=e,r=t,o=Object.keys(n),a=Object.keys(r);if(o.length!==a.length)return  false;for(const i of o)if(!Object.prototype.hasOwnProperty.call(r,i)||!ut(n[i],r[i]))return  false;return  true}const bc={currentGardenTile:"myCurrentGardenTileAtom",globalTileIndex:"myCurrentGlobalTileIndexAtom",gardenObject:"myCurrentGardenObjectAtom",isMature:"isGardenObjectMatureAtom",isInMyGarden:"isInMyGardenAtom",gardenName:"currentGardenNameAtom",sortedSlotIndices:"myCurrentSortedGrowSlotIndicesAtom",currentGrowSlotIndex:"myCurrentGrowSlotIndexAtom"},xc={position:{globalIndex:null,localIndex:null},tile:{type:null,isEmpty:true},garden:{name:null,isOwner:false,playerSlotIndex:null},object:{type:null,data:null,isMature:false},plant:null};function bw(e){const t=e.currentGardenTile;return {globalIndex:e.globalTileIndex,localIndex:t?.localTileIndex??null}}function xw(e){return {type:e.currentGardenTile?.tileType??null,isEmpty:e.gardenObject===null}}function yw(e){const t=e.currentGardenTile;return {name:e.gardenName,isOwner:e.isInMyGarden??false,playerSlotIndex:t?.userSlotIdx??null}}function vw(e){const t=e.gardenObject;return t?{type:t.objectType,data:t,isMature:e.isMature??false}:{type:null,data:null,isMature:false}}function ww(e){const t=e.gardenObject;if(!t||t.objectType!=="plant")return null;const n=t,r=e.sortedSlotIndices??[];return {species:n.species,slots:n.slots??[],currentSlotIndex:e.currentGrowSlotIndex,sortedSlotIndices:r,nextHarvestSlotIndex:r.length>0?r[0]:null}}function yc(e){return {position:bw(e),tile:xw(e),garden:yw(e),object:vw(e),plant:ww(e)}}function vc(e){return JSON.stringify({globalIndex:e.position.globalIndex,localIndex:e.position.localIndex,tileType:e.tile.type,isEmpty:e.tile.isEmpty,gardenName:e.garden.name,isOwner:e.garden.isOwner,playerSlotIndex:e.garden.playerSlotIndex,objectType:e.object.type,isMature:e.object.isMature,plantSpecies:e.plant?.species??null,slotCount:e.plant?.slots.length??0})}function Sw(e,t){return e.type!==t.type||e.isMature!==t.isMature?true:e.data===null&&t.data===null?false:e.data===null||t.data===null?true:!ut(e.data,t.data)}function Cw(e,t){return e===null&&t===null?false:e===null||t===null||e.species!==t.species||e.currentSlotIndex!==t.currentSlotIndex||e.nextHarvestSlotIndex!==t.nextHarvestSlotIndex||e.slots.length!==t.slots.length||!ut(e.sortedSlotIndices,t.sortedSlotIndices)?true:!ut(e.slots,t.slots)}function kw(e,t){return e.name!==t.name||e.isOwner!==t.isOwner||e.playerSlotIndex!==t.playerSlotIndex}function Tw(){let e=xc,t=xc,n=false;const r=[],o={all:new Set,stable:new Set,object:new Set,plantInfo:new Set,garden:new Set},a={},i=Object.keys(bc),s=new Set;function l(){if(s.size<i.length)return;const c=yc(a);if(!ut(e,c)&&(t=e,e=c,!!n)){for(const u of o.all)u(e,t);if(vc(t)!==vc(e))for(const u of o.stable)u(e,t);if(Sw(t.object,e.object)){const u={current:e.object,previous:t.object};for(const p of o.object)p(u);}if(Cw(t.plant,e.plant)){const u={current:e.plant,previous:t.plant};for(const p of o.plantInfo)p(u);}if(kw(t.garden,e.garden)){const u={current:e.garden,previous:t.garden};for(const p of o.garden)p(u);}}}async function d(){if(n)return;const c=i.map(async u=>{const p=bc[u],f=await ge.subscribe(p,g=>{a[u]=g,s.add(u),l();});r.push(f);});await Promise.all(c),n=true,s.size===i.length&&(e=yc(a));}return d(),{get(){return e},subscribe(c,u){return o.all.add(c),u?.immediate!==false&&n&&s.size===i.length&&c(e,e),()=>o.all.delete(c)},subscribeStable(c,u){return o.stable.add(c),u?.immediate!==false&&n&&s.size===i.length&&c(e,e),()=>o.stable.delete(c)},subscribeObject(c,u){return o.object.add(c),u?.immediate&&n&&s.size===i.length&&c({current:e.object,previous:e.object}),()=>o.object.delete(c)},subscribePlantInfo(c,u){return o.plantInfo.add(c),u?.immediate&&n&&s.size===i.length&&c({current:e.plant,previous:e.plant}),()=>o.plantInfo.delete(c)},subscribeGarden(c,u){return o.garden.add(c),u?.immediate&&n&&s.size===i.length&&c({current:e.garden,previous:e.garden}),()=>o.garden.delete(c)},destroy(){for(const c of r)c();r.length=0,o.all.clear(),o.stable.clear(),o.object.clear(),o.plantInfo.clear(),o.garden.clear(),n=false;}}}let di=null;function Xe(){return di||(di=Tw()),di}function Iw(){let e=null;const t=[],n=new Set,r={},o=new Set,a=2;function i(u,p){return {x:p%u,y:Math.floor(p/u)}}function s(u,p,f){return f*u+p}function l(u,p){const{cols:f,rows:g}=u,h=f*g,m=new Set,b=new Set,y=new Map,w=[],S=u.userSlotIdxAndDirtTileIdxToGlobalTileIdx??[],T=u.userSlotIdxAndBoardwalkTileIdxToGlobalTileIdx??[],v=Math.max(S.length,T.length);for(let k=0;k<v;k++){const A=S[k]??[],E=T[k]??[],B=A.map((D,G)=>(m.add(D),y.set(D,k),{globalIndex:D,localIndex:G,position:i(f,D)})),J=E.map((D,G)=>(b.add(D),y.set(D,k),{globalIndex:D,localIndex:G,position:i(f,D)}));w.push({userSlotIdx:k,dirtTiles:B,boardwalkTiles:J,allTiles:[...B,...J]});}const C=u.spawnTiles.map(k=>i(f,k)),I={};if(u.locations)for(const[k,A]of Object.entries(u.locations)){const E=A.spawnTileIdx??[];I[k]={name:k,spawnTiles:E,spawnPositions:E.map(B=>i(f,B))};}return {cols:f,rows:g,totalTiles:h,tileSize:p,spawnTiles:u.spawnTiles,spawnPositions:C,locations:I,userSlots:w,globalToXY(k){return i(f,k)},xyToGlobal(k,A){return s(f,k,A)},getTileOwner(k){return y.get(k)??null},isDirtTile(k){return m.has(k)},isBoardwalkTile(k){return b.has(k)}}}function d(){if(o.size<a||e)return;const u=r.map,p=r.tileSize??0;if(u){e=l(u,p);for(const f of n)f(e);n.clear();}}async function c(){const u=await ge.subscribe("mapAtom",f=>{r.map=f,o.add("map"),d();});t.push(u);const p=await ge.subscribe("tileSizeAtom",f=>{r.tileSize=f,o.add("tileSize"),d();});t.push(p);}return c(),{get(){return e},isReady(){return e!==null},onReady(u,p){return e?(p?.immediate!==false&&u(e),()=>{}):(n.add(u),()=>n.delete(u))},destroy(){for(const u of t)u();t.length=0,e=null,n.clear();}}}let ui=null;function ts(){return ui||(ui=Iw()),ui}function _w(){const e=V.get("mutations");return e?Object.keys(e):[]}function Ep(){const e={};for(const t of _w())e[t]=[];return e}function ns(){return {garden:null,mySlotIndex:null,plants:{all:[],mature:[],growing:[],bySpecies:{},count:0},crops:{all:[],mature:[],growing:[],mutated:{all:[],byMutation:Ep()}},eggs:{all:[],mature:[],growing:[],byType:{},count:0},decors:{tileObjects:[],boardwalk:[],all:[],byType:{},count:0},tiles:{tileObjects:[],boardwalk:[],empty:{tileObjects:[],boardwalk:[]}},counts:{plants:0,maturePlants:0,crops:0,matureCrops:0,eggs:0,matureEggs:0,decors:0,emptyTileObjects:0,emptyBoardwalk:0}}}function Aw(e,t,n,r){const o=t.slots.filter(a=>r>=a.endTime).length;return {tileIndex:e,position:n,species:t.species,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:r>=t.maturedAt,slots:t.slots,slotsCount:t.slots.length,matureSlotsCount:o}}function Pw(e,t,n,r,o){return {tileIndex:e,position:t,slotIndex:n,species:r.species,startTime:r.startTime,endTime:r.endTime,targetScale:r.targetScale,mutations:[...r.mutations],isMature:o>=r.endTime}}function Ew(e,t,n,r){return {tileIndex:e,position:n,eggId:t.eggId,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:r>=t.maturedAt}}function wc(e,t,n,r){return {tileIndex:e,position:n,decorId:t.decorId,rotation:t.rotation,location:r}}function Sc(e,t){const{garden:n,mySlotIndex:r}=e,o=Date.now();if(!n||r===null)return ns();const a=t().get(),i=a?.userSlots[r],s=i?.dirtTiles??[],l=i?.boardwalkTiles??[],d=[],c=[],u=[],p={},f=[],g=[],h=[],m=[],b=Ep(),y=[],w=[],S=[],T={},v=[],C=[],I={},k=new Set,A=new Set;for(const[D,G]of Object.entries(n.tileObjects)){const Y=parseInt(D,10);k.add(Y);const O=a?a.globalToXY(Y):{x:0,y:0};if(G.objectType==="plant"){const H=G,z=Aw(D,H,O,o);d.push(z),z.isMature?c.push(z):u.push(z),p[z.species]||(p[z.species]=[]),p[z.species].push(z);for(let $=0;$<H.slots.length;$++){const P=H.slots[$],L=Pw(D,O,$,P,o);if(f.push(L),L.isMature?g.push(L):h.push(L),L.mutations.length>0){m.push(L);for(const F of L.mutations)b[F]||(b[F]=[]),b[F].push(L);}}}else if(G.objectType==="egg"){const z=Ew(D,G,O,o);y.push(z),T[z.eggId]||(T[z.eggId]=[]),T[z.eggId].push(z),z.isMature?w.push(z):S.push(z);}else if(G.objectType==="decor"){const z=wc(D,G,O,"tileObjects");v.push(z),I[z.decorId]||(I[z.decorId]=[]),I[z.decorId].push(z);}}for(const[D,G]of Object.entries(n.boardwalkTileObjects)){const Y=parseInt(D,10);A.add(Y);const O=a?a.globalToXY(Y):{x:0,y:0},z=wc(D,G,O,"boardwalk");C.push(z),I[z.decorId]||(I[z.decorId]=[]),I[z.decorId].push(z);}const E=[...v,...C],B=s.filter(D=>!k.has(D.localIndex)),J=l.filter(D=>!A.has(D.localIndex));return {garden:n,mySlotIndex:r,plants:{all:d,mature:c,growing:u,bySpecies:p,count:d.length},crops:{all:f,mature:g,growing:h,mutated:{all:m,byMutation:b}},eggs:{all:y,mature:w,growing:S,byType:T,count:y.length},decors:{tileObjects:v,boardwalk:C,all:E,byType:I,count:E.length},tiles:{tileObjects:s,boardwalk:l,empty:{tileObjects:B,boardwalk:J}},counts:{plants:d.length,maturePlants:c.length,crops:f.length,matureCrops:g.length,eggs:y.length,matureEggs:w.length,decors:E.length,emptyTileObjects:B.length,emptyBoardwalk:J.length}}}function Cc(e){return JSON.stringify({plants:e.counts.plants,maturePlants:e.counts.maturePlants,crops:e.counts.crops,matureCrops:e.counts.matureCrops,eggs:e.counts.eggs,matureEggs:e.counts.matureEggs,decors:e.counts.decors,emptyTileObjects:e.counts.emptyTileObjects,emptyBoardwalk:e.counts.emptyBoardwalk})}function Mw(e,t){const n=new Set(e.map(i=>i.tileIndex)),r=new Set(t.map(i=>i.tileIndex)),o=t.filter(i=>!n.has(i.tileIndex)),a=e.filter(i=>!r.has(i.tileIndex));return {added:o,removed:a}}function Rw(e,t,n){const r=new Set(e.map(a=>a.tileIndex)),o=new Set(n.map(a=>a.tileIndex));return t.filter(a=>!r.has(a.tileIndex)&&o.has(a.tileIndex))}function Lw(e,t,n){const r=new Set(e.map(a=>`${a.tileIndex}:${a.slotIndex}`)),o=new Set(n.map(a=>`${a.tileIndex}:${a.slotIndex}`));return t.filter(a=>{const i=`${a.tileIndex}:${a.slotIndex}`;return !r.has(i)&&o.has(i)})}function Nw(e,t,n){const r=new Set(e.map(a=>a.tileIndex)),o=new Set(n.map(a=>a.tileIndex));return t.filter(a=>!r.has(a.tileIndex)&&o.has(a.tileIndex))}function Fw(e,t){const n=[],r=new Map(e.map(o=>[o.tileIndex,o]));for(const o of t){const a=r.get(o.tileIndex);if(!a)continue;const i=Math.min(a.slots.length,o.slots.length);for(let s=0;s<i;s++){const l=new Set(a.slots[s].mutations),d=new Set(o.slots[s].mutations),c=[...d].filter(p=>!l.has(p)),u=[...l].filter(p=>!d.has(p));if(c.length>0||u.length>0){const p=Date.now(),f=o.slots[s],g={tileIndex:o.tileIndex,position:o.position,slotIndex:s,species:f.species,startTime:f.startTime,endTime:f.endTime,targetScale:f.targetScale,mutations:[...f.mutations],isMature:p>=f.endTime};n.push({crop:g,added:c,removed:u});}}}return n}function Ow(e,t,n){const r=[],o=new Map(t.map(i=>[i.tileIndex,i])),a=new Map;for(const i of n)a.set(`${i.tileIndex}:${i.slotIndex}`,i);for(const i of e){const s=o.get(i.tileIndex);if(!s)continue;const l=Math.min(i.slots.length,s.slots.length);for(let d=0;d<l;d++){const c=i.slots[d],u=s.slots[d];if(c.startTime!==u.startTime){const p=a.get(`${i.tileIndex}:${d}`);if(!p||!p.isMature)continue;const f={tileIndex:i.tileIndex,position:i.position,slotIndex:d,species:c.species,startTime:c.startTime,endTime:c.endTime,targetScale:c.targetScale,mutations:[...c.mutations],isMature:true};r.push({crop:f,remainingSlots:s.slotsCount});}}if(s.slotsCount<i.slotsCount)for(let d=s.slotsCount;d<i.slotsCount;d++){const c=a.get(`${i.tileIndex}:${d}`);if(!c||!c.isMature)continue;const u=i.slots[d];if(!u)continue;const p={tileIndex:i.tileIndex,position:i.position,slotIndex:d,species:u.species,startTime:u.startTime,endTime:u.endTime,targetScale:u.targetScale,mutations:[...u.mutations],isMature:true};r.push({crop:p,remainingSlots:s.slotsCount});}}return r}function $w(e,t){const n=new Set(e.map(i=>i.tileIndex)),r=new Set(t.map(i=>i.tileIndex)),o=t.filter(i=>!n.has(i.tileIndex)),a=e.filter(i=>!r.has(i.tileIndex));return {added:o,removed:a}}function Bw(e,t){const n=l=>`${l.tileIndex}:${l.location}`,r=l=>`${l.tileIndex}:${l.location}`,o=new Set(e.map(n)),a=new Set(t.map(r)),i=t.filter(l=>!o.has(r(l))),s=e.filter(l=>!a.has(n(l)));return {added:i,removed:s}}function Dw(){let e=ns(),t=ns(),n=false;const r=[],o={all:new Set,stable:new Set,plantAdded:new Set,plantRemoved:new Set,plantMatured:new Set,cropMutated:new Set,cropMatured:new Set,cropHarvested:new Set,eggPlaced:new Set,eggRemoved:new Set,eggMatured:new Set,decorPlaced:new Set,decorRemoved:new Set},a={},i=new Set,s=2;function l(){if(i.size<s)return;const c=Sc(a,ts);if(ut(e,c)||(t=e,e=c,!n))return;for(const w of o.all)w(e,t);if(Cc(t)!==Cc(e))for(const w of o.stable)w(e,t);const u=Mw(t.plants.all,e.plants.all);for(const w of u.added)for(const S of o.plantAdded)S({plant:w});for(const w of u.removed)for(const S of o.plantRemoved)S({plant:w,tileIndex:w.tileIndex});const p=Rw(t.plants.mature,e.plants.mature,e.plants.all);for(const w of p)for(const S of o.plantMatured)S({plant:w});const f=Fw(t.plants.all,e.plants.all);for(const w of f)for(const S of o.cropMutated)S(w);const g=Lw(t.crops.mature,e.crops.mature,e.crops.all);for(const w of g)for(const S of o.cropMatured)S({crop:w});const h=Ow(t.plants.all,e.plants.all,t.crops.all);for(const w of h)for(const S of o.cropHarvested)S(w);const m=$w(t.eggs.all,e.eggs.all);for(const w of m.added)for(const S of o.eggPlaced)S({egg:w});for(const w of m.removed)for(const S of o.eggRemoved)S({egg:w});const b=Nw(t.eggs.mature,e.eggs.mature,e.eggs.all);for(const w of b)for(const S of o.eggMatured)S({egg:w});const y=Bw(t.decors.all,e.decors.all);for(const w of y.added)for(const S of o.decorPlaced)S({decor:w});for(const w of y.removed)for(const S of o.decorRemoved)S({decor:w});}async function d(){if(n)return;const c=await ey.onChangeNow(p=>{a.garden=p,i.add("garden"),l();});r.push(c);const u=await ge.subscribe("myUserSlotIdxAtom",p=>{a.mySlotIndex=p,i.add("mySlotIndex"),l();});r.push(u),n=true,i.size===s&&(e=Sc(a,ts));}return d(),{get(){return e},subscribe(c,u){return o.all.add(c),u?.immediate!==false&&n&&i.size===s&&c(e,e),()=>o.all.delete(c)},subscribeStable(c,u){return o.stable.add(c),u?.immediate!==false&&n&&i.size===s&&c(e,e),()=>o.stable.delete(c)},subscribePlantAdded(c,u){if(o.plantAdded.add(c),u?.immediate&&n&&i.size===s)for(const p of e.plants.all)c({plant:p});return ()=>o.plantAdded.delete(c)},subscribePlantRemoved(c,u){return o.plantRemoved.add(c),()=>o.plantRemoved.delete(c)},subscribePlantMatured(c,u){if(o.plantMatured.add(c),u?.immediate&&n&&i.size===s)for(const p of e.plants.mature)c({plant:p});return ()=>o.plantMatured.delete(c)},subscribeCropMutated(c,u){if(o.cropMutated.add(c),u?.immediate&&n&&i.size===s)for(const p of e.crops.mutated.all)c({crop:p,added:p.mutations,removed:[]});return ()=>o.cropMutated.delete(c)},subscribeCropMatured(c,u){if(o.cropMatured.add(c),u?.immediate&&n&&i.size===s)for(const p of e.crops.mature)c({crop:p});return ()=>o.cropMatured.delete(c)},subscribeCropHarvested(c,u){return o.cropHarvested.add(c),()=>o.cropHarvested.delete(c)},subscribeEggPlaced(c,u){if(o.eggPlaced.add(c),u?.immediate&&n&&i.size===s)for(const p of e.eggs.all)c({egg:p});return ()=>o.eggPlaced.delete(c)},subscribeEggRemoved(c,u){return o.eggRemoved.add(c),()=>o.eggRemoved.delete(c)},subscribeEggMatured(c,u){if(o.eggMatured.add(c),u?.immediate&&n&&i.size===s)for(const p of e.eggs.mature)c({egg:p});return ()=>o.eggMatured.delete(c)},subscribeDecorPlaced(c,u){if(o.decorPlaced.add(c),u?.immediate&&n&&i.size===s)for(const p of e.decors.all)c({decor:p});return ()=>o.decorPlaced.delete(c)},subscribeDecorRemoved(c,u){return o.decorRemoved.add(c),()=>o.decorRemoved.delete(c)},destroy(){for(const c of r)c();r.length=0,o.all.clear(),o.stable.clear(),o.plantAdded.clear(),o.plantRemoved.clear(),o.plantMatured.clear(),o.cropMutated.clear(),o.cropMatured.clear(),o.cropHarvested.clear(),o.eggPlaced.clear(),o.eggRemoved.clear(),o.eggMatured.clear(),o.decorPlaced.clear(),o.decorRemoved.clear(),n=false;}}}let pi=null;function Ha(){return pi||(pi=Dw()),pi}const kc={inventory:"myPetInventoryAtom",hutch:"myPetHutchPetItemsAtom",active:"myPetInfosAtom",slotInfos:"myPetSlotInfosAtom",expandedPetSlotId:"expandedPetSlotIdAtom",myNumPetHutchItems:"myNumPetHutchItemsAtom",activityLogs:"myDataAtom"};function Tc(e,t){const n=Oa(e.xp),r=$a(e.petSpecies,e.targetScale),o=Ba(e.petSpecies,e.xp,r),a=Da(e.petSpecies,n);return {id:e.id,petSpecies:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,mutations:[...e.mutations],targetScale:e.targetScale,abilities:[...e.abilities],location:t,position:null,lastAbilityTrigger:null,growthStage:n,currentStrength:o,maxStrength:r,isMature:a}}function Gw(e,t){const r=t[e.slot.id]?.lastAbilityTrigger??null,o=Oa(e.slot.xp),a=$a(e.slot.petSpecies,e.slot.targetScale),i=Ba(e.slot.petSpecies,e.slot.xp,a),s=Da(e.slot.petSpecies,o);return {id:e.slot.id,petSpecies:e.slot.petSpecies,name:e.slot.name,xp:e.slot.xp,hunger:e.slot.hunger,mutations:[...e.slot.mutations],targetScale:e.slot.targetScale,abilities:[...e.slot.abilities],location:"active",position:e.position?{x:e.position.x,y:e.position.y}:null,lastAbilityTrigger:r,growthStage:o,currentStrength:i,maxStrength:a,isMature:s}}const Ic=500;let ht=[],Ko=0;function zw(){try{const e=ye(Sa.GLOBAL.MY_PETS_ABILITY_LOGS,[]);if(!Array.isArray(e))return [];const t=e.filter(n=>typeof n=="object"&&n!==null&&typeof n.petId=="string"&&typeof n.petName=="string"&&typeof n.petSpecies=="string"&&typeof n.abilityId=="string"&&typeof n.performedAt=="number");return t.length<e.length&&console.log(`[myPets] Migrated ability logs: removed ${e.length-t.length} old entries`),t.length>0&&(Ko=Math.max(...t.map(n=>n.performedAt))),t}catch(e){return console.error("[myPets] Failed to load ability logs from storage:",e),[]}}function Hw(e){try{Te(Sa.GLOBAL.MY_PETS_ABILITY_LOGS,e);}catch(t){console.error("[myPets] Failed to save ability logs to storage:",t);}}function jw(e){try{const n=e.parameters.pet;return !n||!n.id||!n.petSpecies?null:{petId:n.id,petName:n.name||n.petSpecies,petSpecies:n.petSpecies,abilityId:e.action,data:e.parameters,performedAt:e.timestamp}}catch(t){return console.error("[myPets] Failed to convert activity log:",t),null}}function Ww(e){if(!e||!Array.isArray(e))return;const t=Nu(e),n=[];for(const r of t)if(r.timestamp>Ko){const o=jw(r);o&&n.push(o);}n.length!==0&&(Ko=Math.max(...n.map(r=>r.performedAt),Ko),ht=[...n,...ht],ht.length>Ic&&(ht=ht.slice(0,Ic)),Hw(ht),console.log(`[myPets] Processed ${n.length} new ability logs (total: ${ht.length})`));}function _c(e){const t=new Set,n=[];for(const f of e.active??[]){const g=Gw(f,e.slotInfos??{});n.push(g),t.add(g.id);}const r=[];for(const f of e.inventory??[]){if(t.has(f.id))continue;const g=Tc(f,"inventory");r.push(g),t.add(g.id);}const o=[];for(const f of e.hutch??[]){if(t.has(f.id))continue;const g=Tc(f,"hutch");o.push(g),t.add(g.id);}const a=[...n,...r,...o],i=e.expandedPetSlotId??null,s=i?a.find(f=>f.id===i)??null:null,c=Ha().get().decors.all.some(f=>f.decorId==="PetHutch"),u=e.myNumPetHutchItems??0;return {all:a,byLocation:{inventory:r,hutch:o,active:n},counts:{inventory:r.length,hutch:o.length,active:n.length,total:a.length},hutch:{hasHutch:c,currentItems:u,maxItems:25},expandedPetSlotId:i,expandedPet:s,abilityLogs:[...ht]}}const Ac={all:[],byLocation:{inventory:[],hutch:[],active:[]},counts:{inventory:0,hutch:0,active:0,total:0},hutch:{hasHutch:false,currentItems:0,maxItems:25},expandedPetSlotId:null,expandedPet:null,abilityLogs:[]};function Uw(e,t){if(e.length!==t.length)return  false;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return  false;return  true}function Pc(e){return JSON.stringify({id:e.id,petSpecies:e.petSpecies,name:e.name,mutations:e.mutations,abilities:e.abilities,location:e.location})}function Vw(e,t){if(e.all.length!==t.all.length)return  false;const n=e.all.map(Pc),r=t.all.map(Pc);return Uw(n,r)}function Xw(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const a=r.get(o.id);a&&a.location!==o.location&&n.push({pet:o,from:a.location,to:o.location});}return n}function qw(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){if(!o.lastAbilityTrigger)continue;const i=r.get(o.id)?.lastAbilityTrigger;(!i||i.abilityId!==o.lastAbilityTrigger.abilityId||i.performedAt!==o.lastAbilityTrigger.performedAt)&&n.push({pet:o,trigger:o.lastAbilityTrigger});}return n}function Kw(e,t){const n=new Set(e.all.map(i=>i.id)),r=new Set(t.all.map(i=>i.id)),o=t.all.filter(i=>!n.has(i.id)),a=e.all.filter(i=>!r.has(i.id));return o.length===0&&a.length===0?null:{added:o,removed:a,counts:t.counts}}function Yw(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const a=r.get(o.id);a&&o.growthStage>a.growthStage&&n.push({pet:o,previousStage:a.growthStage,newStage:o.growthStage});}return n}function Jw(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const a=r.get(o.id);a&&o.currentStrength>a.currentStrength&&n.push({pet:o,previousStrength:a.currentStrength,newStrength:o.currentStrength});}return n}function Qw(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const a=r.get(o.id);a&&o.currentStrength===o.maxStrength&&a.currentStrength<a.maxStrength&&n.push({pet:o});}return n}function Zw(){let e=Ac,t=Ac,n=false;const r=[],o={all:new Set,stable:new Set,location:new Set,ability:new Set,count:new Set,expandedPet:new Set,growth:new Set,strengthGain:new Set,maxStrength:new Set},a={},i=Object.keys(kc),s=new Set;function l(){if(s.size<i.length)return;if(a.activityLogs){const b=a.activityLogs?.activityLogs||a.activityLogs;Array.isArray(b)&&Ww(b);}const c=_c(a);if(ut(e,c)||(t=e,e=c,!n))return;for(const b of o.all)b(e,t);if(!Vw(t,e))for(const b of o.stable)b(e,t);const u=Xw(t,e);for(const b of u)for(const y of o.location)y(b);const p=qw(t,e);for(const b of p)for(const y of o.ability)y(b);const f=Kw(t,e);if(f)for(const b of o.count)b(f);const g=Yw(t,e);for(const b of g)for(const y of o.growth)y(b);const h=Jw(t,e);for(const b of h)for(const y of o.strengthGain)y(b);const m=Qw(t,e);for(const b of m)for(const y of o.maxStrength)y(b);if(t.expandedPetSlotId!==e.expandedPetSlotId){const b={current:e.expandedPet,previous:t.expandedPet,currentId:e.expandedPetSlotId,previousId:t.expandedPetSlotId};for(const y of o.expandedPet)y(b);}}async function d(){if(n)return;ht=zw(),console.log(`[myPets] Loaded ${ht.length} ability logs from storage`);const c=i.map(async u=>{const p=kc[u],f=await ge.subscribe(p,g=>{a[u]=g,s.add(u),l();});r.push(f);});await Promise.all(c),n=true,s.size===i.length&&(e=_c(a));}return d(),{get(){return e},subscribe(c,u){return o.all.add(c),u?.immediate!==false&&n&&s.size===i.length&&c(e,e),()=>o.all.delete(c)},subscribeStable(c,u){return o.stable.add(c),u?.immediate!==false&&n&&s.size===i.length&&c(e,e),()=>o.stable.delete(c)},subscribeLocation(c,u){if(o.location.add(c),u?.immediate&&n&&s.size===i.length)for(const p of e.all)c({pet:p,from:p.location,to:p.location});return ()=>o.location.delete(c)},subscribeAbility(c,u){if(o.ability.add(c),u?.immediate&&n&&s.size===i.length)for(const p of e.all)p.lastAbilityTrigger&&c({pet:p,trigger:p.lastAbilityTrigger});return ()=>o.ability.delete(c)},subscribeCount(c,u){return o.count.add(c),u?.immediate&&n&&s.size===i.length&&c({added:e.all,removed:[],counts:e.counts}),()=>o.count.delete(c)},subscribeExpandedPet(c,u){return o.expandedPet.add(c),u?.immediate&&n&&s.size===i.length&&c({current:e.expandedPet,previous:e.expandedPet,currentId:e.expandedPetSlotId,previousId:e.expandedPetSlotId}),()=>o.expandedPet.delete(c)},subscribeGrowth(c,u){if(o.growth.add(c),u?.immediate&&n&&s.size===i.length)for(const p of e.all)c({pet:p,previousStage:p.growthStage,newStage:p.growthStage});return ()=>o.growth.delete(c)},subscribeStrengthGain(c,u){if(o.strengthGain.add(c),u?.immediate&&n&&s.size===i.length)for(const p of e.all)c({pet:p,previousStrength:p.currentStrength,newStrength:p.currentStrength});return ()=>o.strengthGain.delete(c)},subscribeMaxStrength(c,u){if(o.maxStrength.add(c),u?.immediate&&n&&s.size===i.length)for(const p of e.all)p.currentStrength===p.maxStrength&&c({pet:p});return ()=>o.maxStrength.delete(c)},destroy(){for(const c of r)c();r.length=0,o.all.clear(),o.stable.clear(),o.location.clear(),o.ability.clear(),o.count.clear(),o.expandedPet.clear(),o.growth.clear(),o.strengthGain.clear(),o.maxStrength.clear(),n=false;}}}let fi=null;function Gn(){return fi||(fi=Zw()),fi}const Ec={inventory:"myInventoryAtom",isFull:"isMyInventoryAtMaxLengthAtom",selectedItemIndex:"myValidatedSelectedItemIndexAtom"},Mc={items:[],favoritedItemIds:[],count:0,isFull:false,selectedItem:null};function Rc(e){const t=e.inventory,n=t?.items??[],r=t?.favoritedItemIds??[],o=e.selectedItemIndex;let a=null;return o!==null&&o>=0&&o<n.length&&(a={index:o,item:n[o]}),{items:n,favoritedItemIds:r,count:n.length,isFull:e.isFull??false,selectedItem:a}}function Lc(e){const t=e.items.map(n=>"id"in n?n.id:"species"in n&&n.itemType==="Seed"?`seed:${n.species}:${n.quantity}`:"toolId"in n?`tool:${n.toolId}:${n.quantity}`:"eggId"in n?`egg:${n.eggId}:${n.quantity}`:"decorId"in n?`decor:${n.decorId}:${n.quantity}`:JSON.stringify(n));return JSON.stringify({itemKeys:t,favoritedItemIds:e.favoritedItemIds,isFull:e.isFull,selectedItemIndex:e.selectedItem?.index??null})}function eS(e,t){return Lc(e)===Lc(t)}function tS(e,t){return e===null&&t===null?false:e===null||t===null?true:e.index!==t.index}function ko(e){return "id"in e?e.id:"species"in e&&e.itemType==="Seed"?`seed:${e.species}`:"toolId"in e?`tool:${e.toolId}`:"eggId"in e?`egg:${e.eggId}`:"decorId"in e?`decor:${e.decorId}`:JSON.stringify(e)}function nS(e,t){const n=new Set(e.map(ko)),r=new Set(t.map(ko)),o=t.filter(i=>!n.has(ko(i))),a=e.filter(i=>!r.has(ko(i)));return o.length===0&&a.length===0?null:{added:o,removed:a,counts:{before:e.length,after:t.length}}}function rS(e,t){const n=new Set(e),r=new Set(t),o=t.filter(i=>!n.has(i)),a=e.filter(i=>!r.has(i));return o.length===0&&a.length===0?null:{added:o,removed:a,current:t}}function oS(){let e=Mc,t=Mc,n=false;const r=[],o={all:new Set,stable:new Set,selection:new Set,items:new Set,favorites:new Set},a={},i=Object.keys(Ec),s=new Set;function l(){if(s.size<i.length)return;const c=Rc(a);if(ut(e,c)||(t=e,e=c,!n))return;for(const f of o.all)f(e,t);if(!eS(t,e))for(const f of o.stable)f(e,t);if(tS(t.selectedItem,e.selectedItem)){const f={current:e.selectedItem,previous:t.selectedItem};for(const g of o.selection)g(f);}const u=nS(t.items,e.items);if(u)for(const f of o.items)f(u);const p=rS(t.favoritedItemIds,e.favoritedItemIds);if(p)for(const f of o.favorites)f(p);}async function d(){if(n)return;const c=i.map(async u=>{const p=Ec[u],f=await ge.subscribe(p,g=>{a[u]=g,s.add(u),l();});r.push(f);});await Promise.all(c),n=true,s.size===i.length&&(e=Rc(a));}return d(),{get(){return e},subscribe(c,u){return o.all.add(c),u?.immediate!==false&&n&&s.size===i.length&&c(e,e),()=>o.all.delete(c)},subscribeStable(c,u){return o.stable.add(c),u?.immediate!==false&&n&&s.size===i.length&&c(e,e),()=>o.stable.delete(c)},subscribeSelection(c,u){return o.selection.add(c),u?.immediate&&n&&s.size===i.length&&c({current:e.selectedItem,previous:e.selectedItem}),()=>o.selection.delete(c)},subscribeItems(c,u){return o.items.add(c),u?.immediate&&n&&s.size===i.length&&c({added:e.items,removed:[],counts:{before:0,after:e.count}}),()=>o.items.delete(c)},subscribeFavorites(c,u){return o.favorites.add(c),u?.immediate&&n&&s.size===i.length&&c({added:e.favoritedItemIds,removed:[],current:e.favoritedItemIds}),()=>o.favorites.delete(c)},destroy(){for(const c of r)c();r.length=0,o.all.clear(),o.stable.clear(),o.selection.clear(),o.items.clear(),o.favorites.clear(),n=false;}}}let gi=null;function ft(){return gi||(gi=oS()),gi}const rs={all:[],host:null,myPlayer:null,count:0};function aS(e,t,n){const r=n.get(e.id),o=r?.slot,a=o?.data,i=o?.lastActionEvent;return {id:e.id,name:e.name,discordId:e.databaseUserId,discordAvatarUrl:e.discordAvatarUrl,guildId:e.guildId,isConnected:e.isConnected,isHost:e.id===t,slotIndex:r?.index??null,position:o?.position??null,cosmetic:{color:e.cosmetic?.color??"",avatar:e.cosmetic?.avatar?[...e.cosmetic.avatar]:[]},emote:{type:e.emoteData?.emoteType??-1},coins:a?.coinsCount??0,inventory:a?.inventory??null,shopPurchases:a?.shopPurchases??null,garden:a?.garden??null,pets:{slots:a?.petSlots??[],slotInfos:o?.petSlotInfos??null},journal:a?.journal??null,stats:a?.stats??null,tasksCompleted:a?.tasksCompleted??[],activityLogs:a?.activityLogs??[],customRestocks:{config:a?.customRestocks??null,inventories:o?.customRestockInventories??null},lastAction:i?{type:i.action,data:i.data,timestamp:i.timestamp}:null,selectedItemIndex:o?.notAuthoritative_selectedItemIndex??null,lastSlotMachineInfo:o?.lastSlotMachineInfo??null}}function Nc(e){const t=e.players,n=e.hostPlayerId??"",r=e.userSlots??[],o=e.myUserSlotIndex;if(!t||!Array.isArray(t)||t.length===0)return rs;const a=new Map;Array.isArray(r)&&r.forEach((d,c)=>{d?.type==="user"&&d?.playerId&&a.set(d.playerId,{slot:d,index:c});});const i=t.map(d=>aS(d,n,a)),s=i.find(d=>d.isHost)??null,l=o!==null?i.find(d=>d.slotIndex===o)??null:null;return {all:i,host:s,myPlayer:l,count:i.length}}function Fc(e){const t=e.all.map(n=>`${n.id}:${n.isConnected}:${n.isHost}`);return JSON.stringify({playerKeys:t,hostId:e.host?.id??null,count:e.count})}function iS(e,t){const n=[],r=new Set(e.map(a=>a.id)),o=new Set(t.map(a=>a.id));for(const a of t)r.has(a.id)||n.push({player:a,type:"join"});for(const a of e)o.has(a.id)||n.push({player:a,type:"leave"});return n}function sS(e,t){const n=[],r=new Map(e.map(o=>[o.id,o]));for(const o of t){const a=r.get(o.id);a&&a.isConnected!==o.isConnected&&n.push({player:o,isConnected:o.isConnected});}return n}function lS(){let e=rs,t=rs,n=false;const r=[],o={all:new Set,stable:new Set,joinLeave:new Set,connection:new Set,host:new Set},a={},i=new Set,s=4;function l(){if(i.size<s)return;const c=Nc(a);if(ut(e,c)||(t=e,e=c,!n))return;for(const h of o.all)h(e,t);if(Fc(t)!==Fc(e))for(const h of o.stable)h(e,t);const u=iS(t.all,e.all);for(const h of u)for(const m of o.joinLeave)m(h);const p=sS(t.all,e.all);for(const h of p)for(const m of o.connection)m(h);const f=t.host?.id??null,g=e.host?.id??null;if(f!==g){const h={current:e.host,previous:t.host};for(const m of o.host)m(h);}}async function d(){if(n)return;const c=await Qx.onChangeNow(g=>{a.players=g,i.add("players"),l();});r.push(c);const u=await Zx.onChangeNow(g=>{a.hostPlayerId=g,i.add("hostPlayerId"),l();});r.push(u);const p=await Jx.onChangeNow(g=>{a.userSlots=g,i.add("userSlots"),l();});r.push(p);const f=await ge.subscribe("myUserSlotIdxAtom",g=>{a.myUserSlotIndex=g,i.add("myUserSlotIndex"),l();});r.push(f),n=true,i.size===s&&(e=Nc(a));}return d(),{get(){return e},subscribe(c,u){return o.all.add(c),u?.immediate!==false&&n&&i.size===s&&c(e,e),()=>o.all.delete(c)},subscribeStable(c,u){return o.stable.add(c),u?.immediate!==false&&n&&i.size===s&&c(e,e),()=>o.stable.delete(c)},subscribeJoinLeave(c,u){if(o.joinLeave.add(c),u?.immediate&&n&&i.size===s)for(const p of e.all)c({player:p,type:"join"});return ()=>o.joinLeave.delete(c)},subscribeConnection(c,u){if(o.connection.add(c),u?.immediate&&n&&i.size===s)for(const p of e.all)c({player:p,isConnected:p.isConnected});return ()=>o.connection.delete(c)},subscribeHost(c,u){return o.host.add(c),u?.immediate&&n&&i.size===s&&c({current:e.host,previous:e.host}),()=>o.host.delete(c)},destroy(){for(const c of r)c();r.length=0,o.all.clear(),o.stable.clear(),o.joinLeave.clear(),o.connection.clear(),o.host.clear(),n=false;}}}let hi=null;function Mp(){return hi||(hi=lS()),hi}const eo=["seed","tool","egg","decor"];function cS(e,t){switch(t){case "seed":return e.species??e.itemType;case "tool":return e.toolId??e.itemType;case "egg":return e.eggId??e.itemType;case "decor":return e.decorId??e.itemType;default:return e.itemType}}function dS(e,t,n){const r=cS(e,t),o=n[r]??0,a=Math.max(0,e.initialStock-o);return {id:r,itemType:e.itemType,initialStock:e.initialStock,purchased:o,remaining:a,isAvailable:a>0}}function uS(e,t,n){if(!t)return {type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null};const o=n[e]?.purchases??{},a=(t.inventory??[]).map(d=>dS(d,e,o)),i=a.filter(d=>d.isAvailable).length,s=t.secondsUntilRestock??0,l=s>0?Date.now()+s*1e3:null;return {type:e,items:a,availableCount:i,totalCount:a.length,secondsUntilRestock:s,restockAt:l}}function Oc(e){const t=e.shops,n=e.purchases??{},r=eo.map(s=>uS(s,t?.[s],n)),o={seed:r[0],tool:r[1],egg:r[2],decor:r[3]},a=r.filter(s=>s.restockAt!==null);let i=null;if(a.length>0){const l=a.sort((d,c)=>(d.restockAt??0)-(c.restockAt??0))[0];i={shop:l.type,seconds:l.secondsUntilRestock,at:l.restockAt};}return {all:r,byType:o,nextRestock:i}}const $c={all:eo.map(e=>({type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null})),byType:{seed:{type:"seed",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},tool:{type:"tool",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},egg:{type:"egg",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},decor:{type:"decor",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null}},nextRestock:null};function Bc(e){return JSON.stringify({shops:e.all.map(t=>({type:t.type,itemCount:t.items.length,availableCount:t.availableCount}))})}function pS(e,t){const n=e.secondsUntilRestock,r=t.secondsUntilRestock;return n>0&&n<=5&&r>n||n>0&&r===0&&t.items.some(a=>a.purchased===0)?{shop:t,previousItems:e.items}:null}function fS(e,t){const n=[];for(const r of eo){const o=e.byType[r],a=t.byType[r],i=new Map(o.items.map(s=>[s.id,s]));for(const s of a.items){const l=i.get(s.id);l&&s.purchased>l.purchased&&n.push({shopType:r,itemId:s.id,quantity:s.purchased-l.purchased,newPurchased:s.purchased,remaining:s.remaining});}}return n}function gS(e,t){const n=[];for(const r of eo){const o=e.byType[r],a=t.byType[r],i=new Map(o.items.map(s=>[s.id,s]));for(const s of a.items){const l=i.get(s.id);l&&l.isAvailable!==s.isAvailable&&n.push({shopType:r,itemId:s.id,wasAvailable:l.isAvailable,isAvailable:s.isAvailable});}}return n}function hS(){let e=$c,t=$c,n=false;const r=[],o={all:new Set,stable:new Set,seedRestock:new Set,toolRestock:new Set,eggRestock:new Set,decorRestock:new Set,purchase:new Set,availability:new Set},a={},i=new Set,s=2;function l(){if(i.size<s)return;const c=Oc(a);if(ut(e,c)||(t=e,e=c,!n))return;for(const g of o.all)g(e,t);if(Bc(t)!==Bc(e))for(const g of o.stable)g(e,t);const u={seed:o.seedRestock,tool:o.toolRestock,egg:o.eggRestock,decor:o.decorRestock};for(const g of eo){const h=pS(t.byType[g],e.byType[g]);if(h)for(const m of u[g])m(h);}const p=fS(t,e);for(const g of p)for(const h of o.purchase)h(g);const f=gS(t,e);for(const g of f)for(const h of o.availability)h(g);}async function d(){if(n)return;const c=await ty.onChangeNow(p=>{a.shops=p,i.add("shops"),l();});r.push(c);const u=await ny.onChangeNow(p=>{a.purchases=p,i.add("purchases"),l();});r.push(u),n=true,i.size===s&&(e=Oc(a));}return d(),{get(){return e},getShop(c){return e.byType[c]},getItem(c,u){return e.byType[c].items.find(f=>f.id===u)??null},subscribe(c,u){return o.all.add(c),u?.immediate!==false&&n&&i.size===s&&c(e,e),()=>o.all.delete(c)},subscribeStable(c,u){return o.stable.add(c),u?.immediate!==false&&n&&i.size===s&&c(e,e),()=>o.stable.delete(c)},subscribeSeedRestock(c,u){return o.seedRestock.add(c),u?.immediate&&n&&i.size===s&&c({shop:e.byType.seed,previousItems:[]}),()=>o.seedRestock.delete(c)},subscribeToolRestock(c,u){return o.toolRestock.add(c),u?.immediate&&n&&i.size===s&&c({shop:e.byType.tool,previousItems:[]}),()=>o.toolRestock.delete(c)},subscribeEggRestock(c,u){return o.eggRestock.add(c),u?.immediate&&n&&i.size===s&&c({shop:e.byType.egg,previousItems:[]}),()=>o.eggRestock.delete(c)},subscribeDecorRestock(c,u){return o.decorRestock.add(c),u?.immediate&&n&&i.size===s&&c({shop:e.byType.decor,previousItems:[]}),()=>o.decorRestock.delete(c)},subscribePurchase(c,u){if(o.purchase.add(c),u?.immediate&&n&&i.size===s)for(const p of e.all)for(const f of p.items)f.purchased>0&&c({shopType:p.type,itemId:f.id,quantity:f.purchased,newPurchased:f.purchased,remaining:f.remaining});return ()=>o.purchase.delete(c)},subscribeAvailability(c,u){if(o.availability.add(c),u?.immediate&&n&&i.size===s)for(const p of e.all)for(const f of p.items)c({shopType:p.type,itemId:f.id,wasAvailable:f.isAvailable,isAvailable:f.isAvailable});return ()=>o.availability.delete(c)},destroy(){for(const c of r)c();r.length=0,o.all.clear(),o.stable.clear(),o.seedRestock.clear(),o.toolRestock.clear(),o.eggRestock.clear(),o.decorRestock.clear(),o.purchase.clear(),o.availability.clear(),n=false;}}}let mi=null;function zn(){return mi||(mi=hS()),mi}function Rp(e){const t=e||"Sunny",o=V.get("weather")?.[t]?.name||t;return {id:t,name:o,startTime:null,endTime:null,remainingSeconds:0}}function Dc(){return Rp(null)}function mS(){let e=Dc(),t=Dc(),n=null,r=false,o=null;const a={all:new Set,stable:new Set};function i(l){const d=(l||"Sunny")!==(n||"Sunny");n=l;const c=Rp(l),u=e.id!==c.id;if(t=e,e=c,!!r){if(d)for(const p of a.all)p(e,t);if(u){const p={current:e,previous:t};for(const f of a.stable)f(p);}}}async function s(){r||(o=await ge.subscribe("weatherAtom",l=>{i(l);}),r=true);}return s(),{get(){return e},subscribe(l,d){return a.all.add(l),d?.immediate!==false&&r&&l(e,e),()=>a.all.delete(l)},subscribeStable(l,d){return a.stable.add(l),d?.immediate&&r&&l({current:e,previous:e}),()=>a.stable.delete(l)},destroy(){o?.(),o=null,a.all.clear(),a.stable.clear(),r=false;}}}let bi=null;function cl(){return bi||(bi=mS()),bi}let Ne=null;function Lp(){return Ne||(Ne={currentTile:Xe(),myPets:Gn(),gameMap:ts(),myInventory:ft(),players:Mp(),shops:zn(),weather:cl(),myGarden:Ha()},Ne)}function wt(){if(!Ne)throw new Error("[Globals] Not initialized. Call initGlobals() first.");return Ne}function bS(){Ne&&(Ne.currentTile.destroy(),Ne.myPets.destroy(),Ne.gameMap.destroy(),Ne.myInventory.destroy(),Ne.players.destroy(),Ne.shops.destroy(),Ne.weather.destroy(),Ne.myGarden.destroy(),Ne=null);}const le={get currentTile(){return wt().currentTile},get myPets(){return wt().myPets},get gameMap(){return wt().gameMap},get myInventory(){return wt().myInventory},get players(){return wt().players},get shops(){return wt().shops},get weather(){return wt().weather},get myGarden(){return wt().myGarden}};function xS(e){const t=ll(e);return {ok:t.ok,itemId:e,reason:t.ok?void 0:t.reason}}function yS(e){const r=le.shops.getShop("seed").items.find(s=>s.id===e);if(!r)return {ok:false,itemId:e,totalPurchased:0,errors:[`Seed not found in shop: ${e}`]};const o=r.remaining,a=[];let i=0;for(let s=0;s<o;s++){const l=ll(e);l.ok?i++:a.push(l.reason||`Failed to purchase seed ${s+1}`);}return {ok:i>0,itemId:e,totalPurchased:i,errors:a}}function vS(e){const t=il(e);return {ok:t.ok,itemId:e,reason:t.ok?void 0:t.reason}}function wS(e){const r=le.shops.getShop("egg").items.find(s=>s.id===e);if(!r)return {ok:false,itemId:e,totalPurchased:0,errors:[`Egg not found in shop: ${e}`]};const o=r.remaining,a=[];let i=0;for(let s=0;s<o;s++){const l=il(e);l.ok?i++:a.push(l.reason||`Failed to purchase egg ${s+1}`);}return {ok:i>0,itemId:e,totalPurchased:i,errors:a}}function SS(e){const t=al(e);return {ok:t.ok,itemId:e,reason:t.ok?void 0:t.reason}}function CS(e){const r=le.shops.getShop("decor").items.find(s=>s.id===e);if(!r)return {ok:false,itemId:e,totalPurchased:0,errors:[`Decor not found in shop: ${e}`]};const o=r.remaining,a=[];let i=0;for(let s=0;s<o;s++){const l=al(e);l.ok?i++:a.push(l.reason||`Failed to purchase decor ${s+1}`);}return {ok:i>0,itemId:e,totalPurchased:i,errors:a}}function kS(e){const t=sl(e);return {ok:t.ok,itemId:e,reason:t.ok?void 0:t.reason}}function TS(e){const r=le.shops.getShop("tool").items.find(s=>s.id===e);if(!r)return {ok:false,itemId:e,totalPurchased:0,errors:[`Tool not found in shop: ${e}`]};const o=r.remaining,a=[];let i=0;for(let s=0;s<o;s++){const l=sl(e);l.ok?i++:a.push(l.reason||`Failed to purchase tool ${s+1}`);}return {ok:i>0,itemId:e,totalPurchased:i,errors:a}}let xi=false;const Kt={init(){xi||(xi=true,console.log("[MGShopActions] Initialized"));},isReady(){return xi},seed:{buy:xS,buyAll:yS},egg:{buy:vS,buyAll:wS},decor:{buy:SS,buyAll:CS},tool:{buy:kS,buyAll:TS}};async function Np(e){const t=[{name:"Data",init:()=>V.init()},{name:"CustomModal",init:()=>Sn.init()},{name:"Sprites",init:()=>j.init()},{name:"TileObjectSystem",init:()=>Tt.init()},{name:"Pixi",init:()=>Ra.init()},{name:"Audio",init:()=>$t.init()},{name:"Cosmetics",init:()=>Ks.init()},{name:"ShopActions",init:()=>Kt.init()}];await Promise.all(t.map(async n=>{e?.({status:"start",name:n.name});try{await n.init(),e?.({status:"success",name:n.name});}catch(r){console.error(`[${n.name}] failed`,r),e?.({status:"error",name:n.name,error:r});}})),console.log("[Gemini] Modules ready. Access via Gemini.Modules in console.");}const dl=Object.freeze(Object.defineProperty({__proto__:null,MGAssets:ln,MGAudio:$t,MGCalculators:Cp,MGCosmetic:Ks,MGCustomModal:Sn,MGData:V,MGEnvironment:Ve,MGManifest:kt,MGPixi:Ra,MGPixiHooks:et,MGShopActions:Kt,MGSprite:j,MGTile:Tt,MGVersion:_s,PET_ABILITY_ACTIONS:Ru,filterPetAbilityLogs:Nu,formatAbilityLog:Fu,initAllModules:Np,isPetAbilityAction:Lu},Symbol.toStringTag,{value:"Module"}));function IS(e){const t=String(e??"").trim().toLowerCase();return t?t==="common"?"Common":t==="uncommon"?"Uncommon":t==="rare"?"Rare":t==="legendary"?"Legendary":t==="mythical"?"Mythical":t==="divine"?"Divine":t==="celestial"?"Celestial":t==="unknown"||t==="unknow"?"Unknown":null:null}function _S(e){return e.toLowerCase()}function to(e={}){const{id:t,label:n="",type:r="neutral",tone:o="soft",border:a,withBorder:i,pill:s=true,size:l="md",onClick:d,variant:c="default",rarity:u=null,abilityId:p="",abilityName:f=""}=e,g=x("span",{className:"badge",id:t});s&&g.classList.add("badge--pill"),l==="sm"?g.classList.add("badge--sm"):l==="lg"?g.classList.add("badge--lg"):g.classList.add("badge--md"),d&&g.addEventListener("click",d);let h=false,m=i;function b(){h||(m===false?g.style.border="none":g.style.border="");}function y(k,A=o){g.classList.remove("badge--neutral","badge--info","badge--success","badge--warning","badge--danger","badge--soft","badge--outline","badge--solid"),g.classList.add(`badge--${k}`,`badge--${A}`),b();}function w(k){const A=(k??"").trim();A?(g.style.border=A,h=true):(h=false,b());}function S(k){m=k,b();}function T(k){g.textContent=k;}function v(k,A=o){y(k,A);}function C(k){g.classList.remove("badge--rarity","badge--rarity-common","badge--rarity-uncommon","badge--rarity-rare","badge--rarity-legendary","badge--rarity-mythical","badge--rarity-divine","badge--rarity-celestial","badge--rarity-unknown"),g.style.background="",g.style.backgroundSize="",g.style.animation="",g.style.color="",g.style.webkitTextStroke="";const A=IS(k);if(!A){g.textContent=String(k??"—");return}g.textContent=A,g.classList.add("badge--rarity",`badge--rarity-${_S(A)}`);}function I(k,A){const B=V.get("abilities")?.[k],J=B?.color,D=J?.bg||"rgba(100, 100, 100, 0.9)",G=J?.hover||"rgba(150, 150, 150, 1)";g.classList.remove("badge--neutral","badge--info","badge--success","badge--warning","badge--danger","badge--soft","badge--outline","badge--solid","badge--rarity","badge--rarity-common","badge--rarity-uncommon","badge--rarity-rare","badge--rarity-legendary","badge--rarity-mythical","badge--rarity-divine","badge--rarity-celestial","badge--rarity-unknown"),g.classList.add("badge--ability"),g.textContent=A||B?.name||k||"Unknown Ability",g.style.background=D,g.style.color="white",g.style.border="none",g.style.webkitTextStroke="",g.style.animation="",g.style.backgroundSize="";const Y=()=>{g.style.background=G;},O=()=>{g.style.background=D;};g.removeEventListener("mouseenter",Y),g.removeEventListener("mouseleave",O),g.addEventListener("mouseenter",Y),g.addEventListener("mouseleave",O);}return c==="rarity"?C(u):c==="ability"?I(p,f):(g.textContent=n,y(r,o),typeof i=="boolean"&&S(i),a&&w(a)),{root:g,setLabel:T,setType:v,setBorder:w,setWithBorder:S,setRarity:C,setAbility:I}}const AS={expanded:false,sort:{key:null,dir:null},search:""},PS={categories:{}};async function ES(){const e=await Xr("tab-test",{version:2,defaults:PS,sanitize:a=>({categories:a.categories&&typeof a.categories=="object"?a.categories:{}})});function t(a){return e.get().categories[a]||{...AS}}function n(a,i){const s=e.get(),l=t(a);e.update({categories:{...s.categories,[a]:{...l,expanded:i}}});}function r(a,i,s){const l=e.get(),d=t(a);e.update({categories:{...l.categories,[a]:{...d,sort:{key:i,dir:s}}}});}function o(a,i){const s=e.get(),l=t(a);e.update({categories:{...s.categories,[a]:{...l,search:i}}});}return {get:e.get,set:e.set,save:e.save,getCategoryState:t,setCategoryExpanded:n,setCategorySort:r,setCategorySearch:o}}const MS={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function To(e){return e?MS[e]??0:0}class RS extends sn{constructor(){super({id:"tab-test",label:"Test"});R(this,"stateCtrl",null);}async build(n){this.stateCtrl=await ES();const r=this.createContainer("test-section");r.style.display="flex",r.style.flexDirection="column",r.style.gap="12px",n.appendChild(r),await this.buildSpriteTables(r);}renderSprite(n){const r=x("div",{style:"display:flex;align-items:center;justify-content:center;width:32px;height:32px;"});if(n.spriteId){const o=n.spriteId;requestAnimationFrame(()=>{try{const a=j.toCanvas(o,{scale:1});a.style.maxWidth="32px",a.style.maxHeight="32px",a.style.objectFit="contain",r.appendChild(a);}catch{r.textContent="-";}});}else r.textContent="-";return r}renderRarity(n){if(!n.rarity){const o=x("span",{style:"opacity:0.5;"});return o.textContent="—",o}return to({variant:"rarity",rarity:n.rarity,size:"sm"}).root}createDataCard(n,r,o,a){const i=this.stateCtrl.getCategoryState(n),s=p=>{if(!p)return o;const f=p.toLowerCase();return o.filter(g=>g.name.toLowerCase().includes(f))},l=ka({columns:a,data:s(i.search),pageSize:0,compact:true,maxHeight:"calc(var(--lg-row-h, 40px) * 6)",getRowId:p=>p.spriteId,onSortChange:(p,f)=>{this.stateCtrl.setCategorySort(n,p,f);}});i.sort.key&&i.sort.dir&&l.sortBy(i.sort.key,i.sort.dir);const d=Ta({placeholder:"Search...",value:i.search,debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:p=>{const f=p.trim();this.stateCtrl.setCategorySearch(n,f),l.setData(s(f));}}),c=x("div",{style:"margin-bottom:8px;"});c.appendChild(d.root);const u=x("div");return u.appendChild(c),u.appendChild(l.root),We({title:r,subtitle:`${o.length} entries`,variant:"soft",padding:"sm",expandable:true,defaultExpanded:i.expanded,onExpandChange:p=>{this.stateCtrl.setCategoryExpanded(n,p);}},u)}formatCategoryName(n){return n.split("-").map(r=>r.charAt(0).toUpperCase()+r.slice(1)).join(" ")}findPlantBySprite(n,r){const o=V.get("plants");if(!o)return null;for(const i of Object.values(o))if(i?.seed?.spriteId===n||i?.plant?.spriteId===n||i?.crop?.spriteId===n)return i;const a=r.toLowerCase();for(const i of Object.values(o)){const s=(i?.seed?.name||"").toLowerCase();if(s===a||s===`${a} seed`)return i}return null}findPetBySpriteId(n){const r=V.get("pets");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}findItemBySpriteId(n){const r=V.get("items");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}findDecorBySpriteId(n){const r=V.get("decor");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}findEggBySpriteId(n){const r=V.get("eggs");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}getRarityForSprite(n,r,o){const a=n.toLowerCase();if(a==="plant"||a==="seed"||a==="tallplant"){const i=this.findPlantBySprite(r,o);if(i?.seed?.rarity)return i.seed.rarity}if(a==="pet"){const i=this.findPetBySpriteId(r);if(i?.rarity)return i.rarity}if(a==="item"){const i=this.findItemBySpriteId(r);if(i?.rarity)return i.rarity}if(a==="decor"){const i=this.findDecorBySpriteId(r);if(i?.rarity)return i.rarity}if(a==="egg"){const i=this.findEggBySpriteId(r);if(i?.rarity)return i.rarity}return null}yieldToMain(n=0){return new Promise(r=>{n>0?setTimeout(r,n):typeof requestIdleCallback<"u"?requestIdleCallback(()=>r(),{timeout:50}):setTimeout(r,4);})}async buildSpriteTables(n){const r=[{key:"name",header:"Name",sortable:true,width:"1fr",sortFn:(a,i)=>a.name.localeCompare(i.name,void 0,{numeric:true,sensitivity:"base"})},{key:"rarity",header:"Rarity",sortable:true,width:"100px",align:"center",render:a=>this.renderRarity(a),sortFn:(a,i)=>To(a.rarity)-To(i.rarity)},{key:"sprite",header:"Sprite",width:"60px",align:"center",render:a=>this.renderSprite(a)}];if(!j.isReady())try{await j.init();}catch{return}const o=j.getCategories();for(let a=0;a<o.length;a++){await this.yieldToMain(8);const i=o[a],l=j.getCategoryId(i).map(d=>{const c=`sprite/${i}/${d}`;return {name:d,spriteId:c,rarity:this.getRarityForSprite(i,c,d)}});if(l.sort((d,c)=>To(d.rarity)-To(c.rarity)),l.length>0){const d=this.createDataCard(i,this.formatCategoryName(i),l,r);n.appendChild(d);}}}}function ve(e,t,n){if(e.querySelector(`style[data-style-id="${n}"]`))return;const r=document.createElement("style");r.setAttribute("data-style-id",n),r.textContent=t,e.appendChild(r);}const Fp=`
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
`,LS={enabled:false,favoriteProduceList:[],favoritePetsList:[],favoriteMutations:[]};let Xt=null;async function NS(){if(Xt)return Xt;Xt=await Xr("tab-auto-favorite",{version:1,defaults:LS});const e=ye(we.AUTO_FAVORITE_UI,null);return e&&(await Xt.set(e),Xg(we.AUTO_FAVORITE_UI),console.log("[AutoFavoriteSettings] Migrated old storage to new state")),Xt}function at(){if(!Xt)throw new Error("[AutoFavoriteSettings] Section state not initialized. Call initSectionState() first.");return Xt}const ul=we.AUTO_FAVORITE,Op={enabled:false,mode:"simple",simple:{enabled:false,favoriteSpecies:[],favoriteMutations:[]}};function on(){return ye(ul,Op)}function pl(e){Te(ul,e);}function $p(e){const n={...on(),...e};return pl(n),n}function fl(e){const t=on();return t.mode="simple",t.simple={...t.simple,...e},pl(t),t}function FS(e){fl({favoriteSpecies:e});}function OS(e){fl({favoriteMutations:e});}function Gc(){return on().enabled}let Yo=null;const Cr=new Set;function os(){const e=on();if(!e.enabled){console.log("[AutoFavorite] Disabled");return}Cr.clear(),Yo=ft().subscribeItems(t=>{if(t.added.length>0){const n=on();for(const r of t.added)BS(r,n);}}),console.log(`✅ [AutoFavorite] Started - Watching ${e.simple.favoriteSpecies.length} species, ${e.simple.favoriteMutations.length} mutations`);}function Bp(){Yo&&(Yo(),Yo=null),Cr.clear(),console.log("🛑 [AutoFavorite] Stopped");}function $S(e){const t=on();t.enabled=e,t.simple.enabled=e,$p(t),e?os():Bp();}function BS(e,t){if(e.itemType!=="Produce"&&e.itemType!=="Pet")return;if(!e.id){console.warn("[AutoFavorite] Item has no ID:",e);return}if(!(Cr.has(e.id)||e.isFavorited||e.favorited)&&Dp(e,t.simple)){Cr.add(e.id);try{za(e.id),console.log(`[AutoFavorite] ⭐ Favorited ${e.itemType}: ${e.species||e.id}`);}catch(r){console.error("[AutoFavorite] WebSocket error:",r),Cr.delete(e.id);}}}function Dp(e,t){if(!t.enabled)return  false;const n=e.itemType==="Pet"?e.petSpecies:e.species;return n?!!(t.favoriteSpecies.includes(n)||t.favoriteMutations.length>0&&(e.mutations||[]).some(o=>t.favoriteMutations.includes(o))):false}function DS(){return Object.keys(V.get("mutations")??{})}const gl={init(){this.isReady()||os();},isReady(){return Gc()},DEFAULT_CONFIG:Op,STORAGE_KEY:ul,loadConfig:on,saveConfig:pl,updateConfig:$p,updateSimpleConfig:fl,setFavoriteSpecies:FS,setFavoriteMutations:OS,isEnabled:Gc,start:os,stop:Bp,setEnabled:$S,shouldFavorite:Dp,getGameMutations:DS},hl=we.JOURNAL_CHECKER,Gp={enabled:false,autoRefresh:true,refreshIntervalMs:3e4};function Hn(){return ye(hl,Gp)}function ja(e){Te(hl,e);}function zc(){return Hn().enabled}function GS(e){const t=Hn();t.autoRefresh=e,ja(t);}function zS(e){const t=Hn();t.refreshIntervalMs=e,ja(t);}let yi=null,Hc=null;function zp(){try{return Mp().get().myPlayer?.journal||null}catch{return null}}function HS(e){return e?`pro:${Object.keys(e.produce).length}-pet:${Object.keys(e.pets).length}`:"null"}function Hp(){const e=V.get("mutations")??{};return ["Normal",...Object.keys(e),"Max Weight"]}function jp(){const e=V.get("mutations")??{};return ["Normal",...Object.entries(e).filter(([n,r])=>!("tileRef"in r)).map(([n])=>n),"Max Weight"]}function jS(){return Object.keys(V.get("mutations")??{})}function Wp(e){const n=(V.get("pets")??{})[e];if(!n)return [];const r=new Set;return Array.isArray(n.abilities)&&n.abilities.forEach(o=>r.add(o)),Array.isArray(n.possibleAbilities)&&n.possibleAbilities.forEach(o=>r.add(o)),n.abilityTiers&&Object.values(n.abilityTiers).forEach(o=>{Array.isArray(o)&&o.forEach(a=>r.add(a));}),[...r]}function Up(e){const t=V.get("plants")??{},n=Object.keys(t),r=Hp(),o=e?.produce??{},a=[];let i=0;for(const d of n){const u=o[d]?.variantsLogged?.map(f=>f.variant)??[],p=r.filter(f=>!u.includes(f));i+=u.length,a.push({species:d,variantsLogged:u,variantsMissing:p,variantsTotal:r.length,variantsPercentage:r.length>0?u.length/r.length*100:0,isComplete:p.length===0});}const s=n.length*r.length,l=a.filter(d=>d.variantsLogged.length>0).length;return {total:n.length,logged:l,percentage:n.length>0?l/n.length*100:0,speciesDetails:a,variantsTotal:s,variantsLogged:i,variantsPercentage:s>0?i/s*100:0}}function Vp(e){const t=V.get("pets")??{},n=Object.keys(t),r=jp(),o=e?.pets??{},a=[];let i=0,s=0,l=0,d=0;for(const u of n){const p=o[u],f=p?.variantsLogged?.map(y=>y.variant)??[],g=p?.abilitiesLogged?.map(y=>y.ability)??[],h=r.filter(y=>!f.includes(y)),m=Wp(u),b=m.filter(y=>!g.includes(y));s+=r.length,i+=f.length,d+=m.length,l+=Math.min(g.length,m.length),a.push({species:u,variantsLogged:f,variantsMissing:h,variantsTotal:r.length,variantsPercentage:r.length>0?f.length/r.length*100:0,abilitiesLogged:g,abilitiesMissing:b,abilitiesTotal:m.length,abilitiesPercentage:m.length>0?g.length/m.length*100:0,isComplete:h.length===0&&(m.length===0||b.length===0)});}const c=a.filter(u=>u.variantsLogged.length>0).length;return {total:n.length,logged:c,percentage:n.length>0?c/n.length*100:0,speciesDetails:a,variantsTotal:s,variantsLogged:i,variantsPercentage:s>0?i/s*100:0,abilitiesTotal:d,abilitiesLogged:l,abilitiesPercentage:d>0?l/d*100:0}}async function Wa(e=false){await V.waitForAny();const t=zp(),n=HS(t);if(!e&&yi&&n===Hc)return yi;const r={plants:Up(t),pets:Vp(t),lastUpdated:Date.now()};return yi=r,Hc=n,r}async function WS(){const e=await Wa();return {plants:e.plants.speciesDetails.filter(t=>t.variantsMissing.length>0).map(t=>({species:t.species,missing:t.variantsMissing})),pets:e.pets.speciesDetails.filter(t=>t.variantsMissing.length>0||(t.abilitiesMissing?.length??0)>0).map(t=>({species:t.species,missingVariants:t.variantsMissing,missingAbilities:t.abilitiesMissing??[]}))}}let kr=null;function as(){const e=Hn();e.enabled&&(e.autoRefresh&&!kr&&(kr=setInterval(async()=>{const t=await Wa();ml(t);},e.refreshIntervalMs)),console.log("✅ [JournalChecker] Started"));}function Xp(){kr&&(clearInterval(kr),kr=null);}function US(e){const t=Hn();t.enabled=e,ja(t),e?as():Xp();}function ml(e){window.dispatchEvent(new CustomEvent("gemini:journal-updated",{detail:e}));}async function VS(){const e=await Wa();return ml(e),e}const qp={init(){this.isReady()||as();},isReady(){return zc()},DEFAULT_CONFIG:Gp,STORAGE_KEY:hl,loadConfig:Hn,saveConfig:ja,isEnabled:zc,setAutoRefresh:GS,setRefreshInterval:zS,getMyJournal:zp,getCropVariants:Hp,getPetVariants:jp,getAllMutations:jS,getPetAbilities:Wp,calculateProduceProgress:Up,calculatePetProgress:Vp,aggregateJournalProgress:Wa,getMissingSummary:WS,start:as,stop:Xp,setEnabled:US,refresh:VS,dispatchUpdate:ml},bl=we.BULK_FAVORITE,Kp={enabled:false,position:"top-right"};function no(){return ye(bl,Kp)}function Yp(e){Te(bl,e);}function XS(e){const t=no();t.position=e,Yp(t);}function Jp(){return no().enabled}function qS(e){return typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"}async function KS(e){const t=ft().get();if(!t?.items)return console.warn("[BulkFavorite] No inventory data available"),0;const n=new Set(t.favoritedItemIds??[]);let r=0;for(const o of t.items){if(!qS(o))continue;const a=n.has(o.id);e&&a||!e&&!a||(await za(o.id,e),r++,await YS(50));}return console.log(`[BulkFavorite] ${e?"Favorited":"Unfavorited"} ${r} items`),r}function YS(e){return new Promise(t=>setTimeout(t,e))}let Io=false;const ma={init(){Io||(Io=true,console.log("✅ [MGBulkFavorite] Feature initialized"));},isReady(){return Io},DEFAULT_CONFIG:Kp,STORAGE_KEY:bl,loadConfig:no,saveConfig:Yp,isEnabled:Jp,setPosition:XS,bulkFavorite:KS,destroy(){Io=false;}};class JS{constructor(){R(this,"achievements",new Map);R(this,"data");R(this,"STORAGE_KEY",we.ACHIEVEMENTS);R(this,"onUnlockCallbacks",[]);R(this,"onProgressCallbacks",[]);this.data=this.loadData();}loadData(){return ye(this.STORAGE_KEY,{unlocked:{},progress:{}})}saveData(){Te(this.STORAGE_KEY,this.data);}register(t){this.achievements.set(t.id,t),this.data.progress[t.id]||(this.data.progress[t.id]={current:0,target:t.target,percentage:0});}registerMany(t){for(const n of t)this.register(n);}async checkAchievement(t){const n=this.achievements.get(t);if(!n)throw new Error(`Achievement not found: ${t}`);const r=this.isUnlocked(t),o=await n.checkProgress(),a={current:o,target:n.target,percentage:Math.min(100,Math.floor(o/n.target*100))},i=this.data.progress[t];this.data.progress[t]=a;const s=o>=n.target;return !r&&s?this.unlock(t,a):s||this.triggerProgressCallbacks({achievement:n,progress:a,previousProgress:i}),this.saveData(),{id:t,wasUnlocked:r,isUnlocked:s,progress:a}}async checkAllAchievements(){const t=[];for(const n of this.achievements.keys()){const r=await this.checkAchievement(n);t.push(r);}return t}unlock(t,n){const r=this.achievements.get(t);if(!r)return;const o={achievementId:t,unlockedAt:Date.now(),progress:n};this.data.unlocked[t]=o,this.saveData(),this.triggerUnlockCallbacks({achievement:r,unlockedAt:o.unlockedAt,progress:n});}isUnlocked(t){return !!this.data.unlocked[t]}getAchievement(t){return this.achievements.get(t)||null}getAllAchievements(){return Array.from(this.achievements.values())}getAchievementsByCategory(t){return Array.from(this.achievements.values()).filter(n=>n.category===t)}getAchievementsByRarity(t){return Array.from(this.achievements.values()).filter(n=>n.rarity===t)}getUnlockedAchievements(){return Object.values(this.data.unlocked)}getLockedAchievements(){return Array.from(this.achievements.values()).filter(t=>!this.isUnlocked(t.id)&&!t.hidden)}getProgress(t){return this.data.progress[t]||null}getCompletionPercentage(){const t=this.achievements.size,n=Object.keys(this.data.unlocked).length;return t>0?Math.floor(n/t*100):0}getCompletionStats(){const t=this.achievements.size,n=Object.keys(this.data.unlocked).length,r=t-n,o=this.getCompletionPercentage();return {total:t,unlocked:n,locked:r,percentage:o}}onUnlock(t){return this.onUnlockCallbacks.push(t),()=>{const n=this.onUnlockCallbacks.indexOf(t);n!==-1&&this.onUnlockCallbacks.splice(n,1);}}onProgress(t){return this.onProgressCallbacks.push(t),()=>{const n=this.onProgressCallbacks.indexOf(t);n!==-1&&this.onProgressCallbacks.splice(n,1);}}triggerUnlockCallbacks(t){for(const n of this.onUnlockCallbacks)try{n(t);}catch(r){console.warn("[Achievements] Unlock callback error:",r);}}triggerProgressCallbacks(t){for(const n of this.onProgressCallbacks)try{n(t);}catch(r){console.warn("[Achievements] Progress callback error:",r);}}reset(){this.data={unlocked:{},progress:{}};for(const t of this.achievements.values())this.data.progress[t.id]={current:0,target:t.target,percentage:0};this.saveData();}exportData(){return JSON.stringify(this.data,null,2)}importData(t){try{const n=JSON.parse(t);return this.data=n,this.saveData(),!0}catch(n){return console.warn("[Achievements] Failed to import data:",n),false}}}let Tr=null;function it(){return Tr||(Tr=new JS),Tr}function QS(){Tr&&(Tr=null);}let _o=false;const Qp={init(){_o||(it(),_o=true,console.log("✅ [MGAchievements] Initialized"));},isReady(){return _o},getManager(){return it()},register:(...e)=>it().register(...e),registerMany:(...e)=>it().registerMany(...e),isUnlocked:(...e)=>it().isUnlocked(...e),getAll:()=>it().getAllAchievements(),getUnlocked:()=>it().getUnlockedAchievements(),getStats:()=>it().getCompletionStats(),checkAll:()=>it().checkAllAchievements(),onUnlock:(...e)=>it().onUnlock(...e),onProgress:(...e)=>it().onProgress(...e),destroy(){QS(),_o=false;}},ZS={enabled:true},Zp=we.ANTI_AFK,eC=["visibilitychange","blur","focus","focusout","pagehide","freeze","resume"],tC=25e3,nC=1,rC=1e-5,ce={listeners:[],savedProps:{hidden:void 0,visibilityState:void 0,hasFocus:null},audioCtx:null,oscillator:null,gainNode:null,heartbeatInterval:null};function oC(){const e=(t,n)=>{const r=o=>{o.stopImmediatePropagation(),o.preventDefault?.();};t.addEventListener(n,r,{capture:true}),ce.listeners.push({type:n,handler:r,target:t});};for(const t of eC)e(document,t),e(window,t);}function aC(){for(const{type:e,handler:t,target:n}of ce.listeners)try{n.removeEventListener(e,t,{capture:!0});}catch{}ce.listeners.length=0;}function iC(){const e=Object.getPrototypeOf(document);ce.savedProps.hidden=Object.getOwnPropertyDescriptor(e,"hidden"),ce.savedProps.visibilityState=Object.getOwnPropertyDescriptor(e,"visibilityState"),ce.savedProps.hasFocus=document.hasFocus?document.hasFocus.bind(document):null;try{Object.defineProperty(e,"hidden",{configurable:!0,get:()=>!1});}catch{}try{Object.defineProperty(e,"visibilityState",{configurable:!0,get:()=>"visible"});}catch{}try{document.hasFocus=()=>!0;}catch{}}function sC(){const e=Object.getPrototypeOf(document);try{ce.savedProps.hidden&&Object.defineProperty(e,"hidden",ce.savedProps.hidden);}catch{}try{ce.savedProps.visibilityState&&Object.defineProperty(e,"visibilityState",ce.savedProps.visibilityState);}catch{}try{ce.savedProps.hasFocus&&(document.hasFocus=ce.savedProps.hasFocus);}catch{}}function ba(){ce.audioCtx&&ce.audioCtx.state!=="running"&&ce.audioCtx.resume?.().catch(()=>{});}function lC(){try{const e=window.AudioContext||window.webkitAudioContext;ce.audioCtx=new e({latencyHint:"interactive"}),ce.gainNode=ce.audioCtx.createGain(),ce.gainNode.gain.value=rC,ce.oscillator=ce.audioCtx.createOscillator(),ce.oscillator.frequency.value=nC,ce.oscillator.connect(ce.gainNode).connect(ce.audioCtx.destination),ce.oscillator.start(),document.addEventListener("visibilitychange",ba,{capture:!0}),window.addEventListener("focus",ba,{capture:!0});}catch{ef();}}function ef(){try{ce.oscillator?.stop();}catch{}try{ce.oscillator?.disconnect(),ce.gainNode?.disconnect();}catch{}try{ce.audioCtx?.close?.();}catch{}document.removeEventListener("visibilitychange",ba,{capture:true}),window.removeEventListener("focus",ba,{capture:true}),ce.oscillator=null,ce.gainNode=null,ce.audioCtx=null;}function cC(){const e=document.querySelector("canvas")||document.body||document.documentElement;ce.heartbeatInterval=window.setInterval(()=>{try{e.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:1,clientY:1}));}catch{}},tC);}function dC(){ce.heartbeatInterval!==null&&(clearInterval(ce.heartbeatInterval),ce.heartbeatInterval=null);}function vi(){iC(),oC(),lC(),cC();}function wi(){dC(),ef(),aC(),sC();}let Ao=false,Ke=false;function fn(){return ye(Zp,ZS)}function Si(e){Te(Zp,e);}const tn={init(){if(Ao)return;const e=fn();Ao=true,e.enabled?(vi(),Ke=true,console.log("[MGAntiAfk] Initialized and started")):console.log("[MGAntiAfk] Initialized but disabled");},isReady(){return Ao},isRunning(){return Ke},isEnabled(){return fn().enabled},enable(){const e=fn();e.enabled=true,Si(e),Ke||(vi(),Ke=true,console.log("[MGAntiAfk] Enabled"));},disable(){const e=fn();e.enabled=false,Si(e),Ke&&(wi(),Ke=false,console.log("[MGAntiAfk] Disabled"));},toggle(){tn.isEnabled()?tn.disable():tn.enable();},getConfig(){return fn()},updateConfig(e){const n={...fn(),...e};Si(n),n.enabled&&!Ke?(vi(),Ke=true):!n.enabled&&Ke&&(wi(),Ke=false);},destroy(){Ke&&(wi(),Ke=false),Ao=false,console.log("[MGAntiAfk] Destroyed");}},tf=we.PET_TEAM,uC={enabled:false,teams:[],activeTeamId:null},xl=3,jc=50,Fe="";function Oe(){return ye(tf,uC)}function un(e){Te(tf,e);}function pC(e){const n={...Oe(),...e};return un(n),n}function fC(){return Oe().enabled}function gC(e){pC({enabled:e});}function hC(){return crypto.randomUUID()}function is(){return Date.now()}function nf(e=[]){const t=[...e];for(;t.length<xl;)t.push(Fe);return [t[0]||Fe,t[1]||Fe,t[2]||Fe]}function rf(e,t){const n=Oe(),r=e.trim();return r?!n.teams.some(o=>o.name.trim()===r&&o.id!==t):false}function of(e,t){const n=Oe();if(!e.some(a=>a!==Fe))return  true;const o=[...e].sort().join(",");return !n.teams.some(a=>a.id===t?false:[...a.petIds].sort().join(",")===o)}function af(e){const n=Gn().get(),r=new Set(n.all.map(a=>a.id)),o=Oe();for(const a of o.teams)for(const i of a.petIds)i!==Fe&&r.add(i);for(const a of e)if(a!==Fe&&!r.has(a))return  false;return  true}function sf(e){const n=Gn().get(),r=new Map(n.all.map(a=>[a.id,a])),o=[];for(const a of e.petIds){if(a===Fe)continue;const i=r.get(a);i&&o.push(i);}return o}function mC(e){return e.petIds.every(t=>t!==Fe)}function bC(e){const t=[];for(let n=0;n<xl;n++)e.petIds[n]===Fe&&t.push(n);return t}function xC(e){return e.petIds.filter(t=>t!==Fe).length}function yC(e){return e.petIds.every(t=>t===Fe)}function vC(e,t){return e.petIds.includes(t)}function wC(e,t){return e.petIds.indexOf(t)}function SC(e,t=[]){const n=Oe();if(n.teams.length>=jc)throw new Error(`Maximum number of teams (${jc}) reached`);if(!rf(e))throw new Error(`Team name "${e}" already exists`);const r=e.trim();if(!r)throw new Error("Team name cannot be empty");const o=nf(t);if(!af(o))throw new Error("One or more pet IDs do not exist");if(!of(o))throw new Error("A team with this exact composition already exists");const a={id:hC(),name:r,petIds:o,createdAt:is(),updatedAt:is()};return n.teams.push(a),un(n),a}function lf(e,t){const n=Oe(),r=n.teams.findIndex(i=>i.id===e);if(r===-1)return null;const o=n.teams[r];if(t.name!==void 0){const i=t.name.trim();if(!i)throw new Error("Team name cannot be empty");if(!rf(i,e))throw new Error(`Team name "${i}" already exists`);t.name=i;}if(t.petIds!==void 0){const i=nf(t.petIds);if(!af(i))throw new Error("One or more pet IDs do not exist");if(!of(i,e))throw new Error("A team with this exact composition already exists");t.petIds=i;}const a={...o,...t,id:o.id,createdAt:o.createdAt,updatedAt:is()};return n.teams[r]=a,un(n),a}function CC(e){const t=Oe(),n=t.teams.length;return t.teams=t.teams.filter(r=>r.id!==e),t.teams.length===n?false:(un(t),true)}function kC(e){return Oe().teams.find(n=>n.id===e)??null}function TC(){return [...Oe().teams]}function IC(e){const t=Oe(),n=e.trim();return t.teams.find(r=>r.name.trim()===n)??null}function _C(e){const t=Oe(),n=new Map(t.teams.map(r=>[r.id,r]));if(e.length!==t.teams.length)return  false;for(const r of e)if(!n.has(r))return  false;return t.teams=e.map(r=>n.get(r)),un(t),true}function AC(e,t){try{return lf(e,{name:t})!==null}catch(n){return console.warn(`[PetTeam] Failed to rename team ${e}:`,n),false}}function PC(){const n=Gn().get().byLocation.active.map(o=>o.id).sort(),r=Oe();for(const o of r.teams){const a=o.petIds.filter(i=>i!=="").sort();if(a.length===n.length&&a.every((i,s)=>i===n[s]))return o.id}return null}function cf(){const e=PC(),t=Oe();return e!==t.activeTeamId&&(t.activeTeamId=e,un(t)),e}function df(e){const t=Oe();t.activeTeamId=e,un(t);}function EC(e){return cf()===e}function MC(e){const t=Gn(),n=ft(),r=t.get();if(n.get().isFull)throw new Error("Cannot activate team: inventory is full");const a=r.byLocation.active,i=e.petIds.filter(c=>c!==Fe).sort(),s=a.map(c=>c.id).sort();if(JSON.stringify(i)===JSON.stringify(s)){console.log("[PetTeam] Team already active");return}const l=r.hutch,d=l.hasHutch?l.maxItems-l.currentItems:0;RC(e.petIds,d,r),df(e.id),console.log("[PetTeam] Team activated successfully");}function RC(e,t,n){const r=n.byLocation.active;let o=t;console.log(`[PetTeam] Starting swap with ${t} hutch spaces available`);for(let a=0;a<xl;a++){const i=e[a],s=r[a]??null;if(console.log(`[PetTeam] Slot ${a}: current=${s?.id.slice(0,8)??"empty"}, target=${i.slice(0,8)||"empty"}, hutchSpace=${o}`),s?.id===i){console.log(`[PetTeam] Slot ${a}: Same pet, skipping`);continue}if(i===Fe&&s){const l=o>0;console.log(`[PetTeam] Slot ${a}: Removing pet, storeInHutch=${l}`),LC(s.id,l),l&&o--;continue}if(!s&&i!==Fe){const d=n.all.find(c=>c.id===i)?.location==="hutch";console.log(`[PetTeam] Slot ${a}: Adding pet, fromHutch=${d}`),d&&o++,NC(i,n);continue}if(s&&i!==Fe){const d=n.all.find(u=>u.id===i)?.location==="hutch";d&&o++;const c=o>0;console.log(`[PetTeam] Slot ${a}: Swapping pets, fromHutch=${d}, storeInHutch=${c}`),FC(s.id,i,n,c),c&&o--;continue}}console.log(`[PetTeam] Swap complete, ${o} hutch spaces remaining`);}function LC(e,t){Pp(e),t&&rl(e);}function NC(e,t){const n=t.all.find(r=>r.id===e);if(!n){console.warn(`[PetTeam] Pet ${e} not found`);return}n.location==="hutch"&&ol(e),_p(e);}function FC(e,t,n,r){const o=n.all.find(a=>a.id===t);if(!o){console.warn(`[PetTeam] Pet ${t} not found`);return}o.location==="hutch"&&ol(t),Ap(e,t),r&&rl(e);}let Po=false;const ae={init(){if(Po)return;if(!Oe().enabled){console.log("[PetTeam] Feature disabled");return}Po=true,console.log("[PetTeam] Feature initialized");},destroy(){Po&&(Po=false,console.log("[PetTeam] Feature destroyed"));},isEnabled:fC,setEnabled:gC,createTeam:SC,updateTeam:lf,deleteTeam:CC,renameTeam:AC,getTeam:kC,getAllTeams:TC,getTeamByName:IC,reorderTeams:_C,getPetsForTeam:sf,isTeamFull:mC,getEmptySlots:bC,getFilledSlotCount:xC,isTeamEmpty:yC,isPetInTeam:vC,getPetSlotIndex:wC,getActiveTeamId:cf,setActiveTeamId:df,isActiveTeam:EC,activateTeam:MC},OC=["PetXpBoost","PetXpBoostII","PetXpBoostIII","SnowyPetXpBoost"],uf=we.XP_TRACKER,$C={enabled:false,sortBy:"closestToMax",filterSpecies:[],filterHasXpBoost:false,updateIntervalMs:3e3,isPoppedOut:false,popOutPosition:null,collapsedSections:{activePets:false,allPets:false,xpBoostSummary:false}},kn="XP Tracker",Tn="[XpTracker]";function jn(){return ye(uf,$C)}function pf(e){Te(uf,e);}function ff(e){const n={...jn(),...e};return pf(n),n}function gf(){return jn().enabled}function BC(e){ff({enabled:e});}function yl(e){return OC.includes(e)}function DC(e){const t=V.get("abilities");if(!t)return null;const n=t[e];return !n||!yl(e)?null:{id:e,name:n.name??"XP Boost",baseProbability:n.baseProbability??0,bonusXp:n.baseParameters?.bonusXp??0,requiredWeather:n.baseParameters?.requiredWeather??null}}function hf(e){return e.filter(yl)}function mf(e){return e.some(yl)}function GC(e){switch(e){case "PetXpBoost":return "I";case "PetXpBoostII":return "II";case "PetXpBoostIII":return "III";case "SnowyPetXpBoost":return "Snowy";default:return "I"}}function bf(e,t,n,r=100){const o=DC(e);if(!o)return null;const a=GC(e),i=o.requiredWeather,s=i===null||n===i,l=t/r,d=l*l,c=o.baseProbability,u=o.bonusXp,p=c,f=Math.floor(u*d),g=p/100*60,h=s?Math.floor(g*f):0;return {abilityId:e,abilityName:o.name,tier:a,baseChancePerMinute:c,actualChancePerMinute:p,baseXpPerProc:u,actualXpPerProc:f,expectedProcsPerHour:g,expectedXpPerHour:h,requiredWeather:i,isActive:s}}function xf(e,t){const n={totalBonusXpPerHour:0,totalProcsPerHour:0,activeBoosterCount:0,boosters:[]};for(const r of e){const o=hf(r.abilities);for(const a of o){const i=bf(a,r.strength,t,r.maxStrength||100);i&&(n.boosters.push({petId:r.petId,petName:r.petName,stats:i}),i.isActive&&(n.totalBonusXpPerHour+=i.expectedXpPerHour,n.totalProcsPerHour+=i.expectedProcsPerHour,n.activeBoosterCount++));}}return n}function yf(e,t,n,r=100){const o=hf(e);return o.length===0?null:bf(o[0],t,n,r)}function Wc(e,t){return e.hoursToMaxStrength-t.hoursToMaxStrength}function zC(e,t){return t.hoursToMaxStrength-e.hoursToMaxStrength}function HC(e,t){return e.species.localeCompare(t.species)}function jC(e,t){return t.currentStrength-e.currentStrength}function WC(e,t){const n={active:0,inventory:1,hutch:2};return n[e.location]-n[t.location]}function UC(e,t){return e.name.localeCompare(t.name)}function VC(e){switch(e){case "closestToMax":return Wc;case "furthestFromMax":return zC;case "species":return HC;case "strength":return jC;case "location":return WC;case "name":return UC;default:return Wc}}function vf(e,t){const n=VC(t);return [...e].sort(n)}function XC(e,t){return t.length===0?e:e.filter(n=>t.includes(n.species))}function qC(e,t){return t?e.filter(n=>n.xpBoostStats!==null):e}function wf(e,t){let n=e;return n=XC(n,t.filterSpecies),n=qC(n,t.filterHasXpBoost),n=vf(n,t.sortBy),n}function Jn(e){const t=ae.getTeam(e);if(!t)return null;const n=Sf(t);if(n.length===0)return {teamId:t.id,teamName:t.name,pets:[],teamSummary:{baseXpPerHour:Pe,bonusXpPerHour:0,totalXpPerHour:Pe,activeBoosterCount:0,totalProcsPerHour:0}};const r=le.weather.get(),o=r.isActive?r.type:null,a=n.filter(c=>!c.isMature||mf(c.abilities)).filter(c=>c.hunger>0).map(c=>({petId:c.id,petName:c.name??"",abilities:c.abilities,strength:c.currentStrength})),i=xf(a,o),s=[],l=KC(n,i.totalBonusXpPerHour);for(const c of n){const u=ss(c,o,i.totalBonusXpPerHour,l);s.push(u);}const d={baseXpPerHour:Pe,bonusXpPerHour:i.totalBonusXpPerHour,totalXpPerHour:Pe+i.totalBonusXpPerHour,activeBoosterCount:i.activeBoosterCount,totalProcsPerHour:i.totalProcsPerHour};return {teamId:t.id,teamName:t.name,pets:s,teamSummary:d}}function Sf(e){const t=le.myPets.get(),n=[];for(const r of e.petIds){if(!r)continue;const o=t.all.find(a=>a.id===r);o&&n.push(o);}return n}function KC(e,t){let n=0;for(const r of e){const o=Qr(r.petSpecies,r.targetScale);if(Zr(r.petSpecies,r.xp,o)>=o)continue;const i=r.hunger>0?Pe+t:0,s=Ga(r.petSpecies,r.xp,o,i>0?i:Pe);n=Math.max(n,s);}return n}function ss(e,t,n,r){const o=Qr(e.petSpecies,e.targetScale),a=Zr(e.petSpecies,e.xp,o),i=a>=o,s=e.hunger<=0,d=s?0:(s?0:Pe)+n,c=yf(e.abilities,a,t),u=i?null:Qs(e.petSpecies,e.xp,a,o,d>0?d:Pe),p=Ga(e.petSpecies,e.xp,o,d>0?d:Pe),f=u!==null?tl(e.petSpecies,e.hunger,u):null,g=Br(e.petSpecies,e.hunger,p),h=i&&c&&r>0?nl(true,true,e.petSpecies,e.hunger,0,r):null;return {id:e.id,name:e.name??"",species:e.petSpecies,currentStrength:a,maxStrength:o,isMaxStrength:i,xpPerHour:d,hoursToNextStrength:u,hoursToMaxStrength:p,feedsToNextStrength:f,feedsToMaxStrength:g,isStarving:s,hunger:e.hunger,xpBoostStats:c,supportingFeeds:h,mutations:e.mutations,targetScale:e.targetScale}}function Uc(e){const t=ae.getTeam(e);if(!t)return 0;const n=Sf(t);if(n.length===0)return 0;const r=n.map(o=>{const a=Qr(o.petSpecies,o.targetScale);return Zr(o.petSpecies,o.xp,a)/a*100});return r.reduce((o,a)=>o+a,0)/r.length}function Vc(e){if(!isFinite(e)||e<=0)return "0m";if(e<1)return `${Math.ceil(e*60)}m`;if(e<24)return `${e.toFixed(1)}h`;{const t=Math.floor(e/24),n=Math.floor(e%24);return `${t}d ${n}h`}}let Fn=false,Jo=null,Ua=[],vl=null;function YC(e,t,n){const r=Qr(e.petSpecies,e.targetScale),o=Zr(e.petSpecies,e.xp,r),a=o>=r,i=e.hunger<=0,s=i?0:Pe,l=yf(e.abilities,o,t);l?.isActive&&l.expectedXpPerHour;const d=e.location==="active"&&!i?s+n:0,c=Qs(e.petSpecies,e.xp,o,r,d>0?d:Pe),u=Ga(e.petSpecies,e.xp,r,d>0?d:Pe),p=tl(e.petSpecies,e.hunger,c),f=Br(e.petSpecies,e.hunger,u);return {id:e.id,species:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,location:e.location,isStarving:i,currentStrength:o,maxStrength:r,isMaxStrength:a,hoursToNextStrength:c,hoursToMaxStrength:u,feedsToNextStrength:p,feedsToMaxStrength:f,baseXpPerHour:s,totalXpPerHour:d,xpBoostStats:l,targetScale:e.targetScale,abilities:e.abilities,mutations:e.mutations}}function Cf(){const e=le.myPets.get(),t=le.weather.get(),n=t.isActive?t.type:null,o=e.byLocation.active.filter(l=>!l.isMature||mf(l.abilities)).filter(l=>l.hunger>0).map(l=>({petId:l.id,petName:l.name??"",abilities:l.abilities,strength:l.currentStrength})),a=xf(o,n);vl=a;const i=[];for(const l of e.all){const d=YC({id:l.id,petSpecies:l.petSpecies,name:l.name??"",xp:l.xp,hunger:l.hunger,targetScale:l.targetScale,abilities:l.abilities,mutations:l.mutations,location:l.location},n,a.totalBonusXpPerHour);i.push(d);}const s=Math.max(0,...i.map(l=>l.hoursToMaxStrength));for(const l of i)l.isMaxStrength&&l.xpBoostStats&&(l.feedsToMaxStrength=nl(true,true,l.species,l.hunger,0,s));return i}function kf(){if(Fn)return;if(!jn().enabled){console.log(`${Tn} ${kn} disabled`);return}console.log(`${Tn} Initializing ${kn}...`),V.isReady()&&(Ua=Cf()),Fn=true,console.log(`${Tn} ${kn} initialized`);}function wl(){return Fn&&V.isReady()}function Sl(){return wl()?Ua:[]}function JC(){return Sl().filter(e=>e.location==="active")}function QC(){return vl}function Cl(){wl()&&(Ua=Cf());}function ZC(e){kl();const t=jn(),n=e??t.updateIntervalMs;Jo=setInterval(()=>{gf()&&Cl();},n);}function kl(){Jo&&(clearInterval(Jo),Jo=null);}function Tf(){Fn&&(kl(),Fn=false,Ua=[],vl=null,console.log(`${Tn} ${kn} destroyed`));}function e1(){const e=jn();return wf(Sl(),{sortBy:e.sortBy,filterSpecies:e.filterSpecies,filterHasXpBoost:e.filterHasXpBoost})}function t1(e){BC(e),e?(Fn=false,kf(),V.isReady()&&Cl(),console.log(`${Tn} ${kn} enabled`)):(Tf(),console.log(`${Tn} ${kn} disabled`));}const xa={init:kf,isReady:wl,destroy:Tf,loadConfig:jn,saveConfig:pf,updateConfig:ff,isEnabled:gf,setEnabled:t1,getAllPetsProgress:Sl,getActivePetsProgress:JC,getCombinedBoostStats:QC,getFilteredPets:e1,refresh:Cl,startAutoUpdate:ZC,stopAutoUpdate:kl,sortPets:vf,filterAndSortPets:wf},Dr={EggGrowthBoost:{procRate:.21,minutesPerProc:7},EggGrowthBoostII_NEW:{procRate:.24,minutesPerProc:9},EggGrowthBoostII:{procRate:.27,minutesPerProc:11},SnowyEggGrowthBoost:{procRate:.35,minutesPerProc:10}},Gr={PlantGrowthBoost:{procRate:.24,minutesPerProc:3},PlantGrowthBoostII:{procRate:.27,minutesPerProc:5},PlantGrowthBoostIII:{procRate:.3,minutesPerProc:7},SnowyPlantGrowthBoost:{procRate:.4,minutesPerProc:6}};[...Object.keys(Dr),...Object.keys(Gr)];function Tl(e){const t=[];for(const n of e)for(const r of n.abilities)if(r in Dr){const o=Dr[r];t.push({petId:n.id,petName:n.name||n.petSpecies,abilityId:r,procRate:o.procRate,minutesPerProc:o.minutesPerProc});}return t}function Il(e){const t=[];for(const n of e)for(const r of n.abilities)if(r in Gr){const o=Gr[r];t.push({petId:n.id,petName:n.name||n.petSpecies,abilityId:r,procRate:o.procRate,minutesPerProc:o.minutesPerProc});}return t}function zr(e){let t=0,n=0;for(const r of e){const o=r.procRate*60;t+=o,n+=o*r.minutesPerProc;}return {procsPerHour:t,timeReductionPerHour:n}}function In(e){return e.some(t=>t.abilities.some(n=>n in Dr))}function _n(e){return e.some(t=>t.abilities.some(n=>n in Gr))}let Ir=null,Ft=0;function If(){const t=Xe().get().plant;if(!t){Ft=0;return}const n=t.currentSlotIndex!==null?t.slots[t.currentSlotIndex]:null;if(!n){Ft=0;return}Ft=dt(n.species,n.targetScale,n.mutations||[]),console.log(`[CropValueIndicator] Updated crop value: ${Ft} coins`);}function n1(e){const{current:t}=e;if(If(),!t){console.log("[CropValueIndicator] No plant on current tile");return}const n=t.currentSlotIndex!==null?t.slots[t.currentSlotIndex]:null;n?console.log(`[CropValueIndicator] 💰 Crop Price: ${Ft} coins`,{species:t.species,slot:{index:t.currentSlotIndex,scale:n.targetScale,mutations:n.mutations||[]},plantInfo:{totalSlots:t.slots.length,sortedSlotIndices:t.sortedSlotIndices,nextHarvestSlotIndex:t.nextHarvestSlotIndex}}):console.log("[CropValueIndicator] Plant Info:",{species:t.species,currentSlotIndex:t.currentSlotIndex,sortedSlotIndices:t.sortedSlotIndices,nextHarvestSlotIndex:t.nextHarvestSlotIndex,totalSlots:t.slots.length,currentSlot:n,cropValue:Ft>0?`${Ft} coins`:"N/A"});}function r1(){Ir&&(console.warn("[CropValueIndicator] Already monitoring, cleaning up previous subscription"),_f()),console.log("[CropValueIndicator] Starting plant info monitoring..."),If(),Ir=Xe().subscribePlantInfo(n1,{immediate:true}),console.log("[CropValueIndicator] Monitoring started");}function _f(){Ir&&(console.log("[CropValueIndicator] Stopping monitoring..."),Ir(),Ir=null,Ft=0,console.log("[CropValueIndicator] Monitoring stopped"));}function Va(){const e=[];return {add(t){e.push(t);},run(){for(const t of e)try{t();}catch(n){console.warn("[CleanupTracker] Error during cleanup:",n);}},clear(){e.length=0;}}}function Af(e,t){e.add(()=>t.disconnect());}const ls="css-qnqsp4",cs="css-v439q6";let An=Va(),ds=false,Qn=false,Qo=null,us=null,Yt=null;const o1=`
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
`;function a1(){if(ds)return;const e=document.createElement("style");e.id="gemini-qol-cropPrice-styles",e.textContent=o1,document.head.appendChild(e),An.add(()=>e.remove()),ds=true,console.log("[CropValueIndicator.render] Styles injected");}function i1(e){const t=document.createElement("div");t.className="gemini-qol-cropPrice";const n=document.createElement("div");n.className="gemini-qol-cropPrice-sprite";const r=document.createElement("canvas");r.width=20,r.height=20,n.appendChild(r);const o=document.createElement("div");o.className="gemini-qol-cropPrice-text",o.textContent=e>0?e.toLocaleString():"",t.appendChild(n),t.appendChild(o);try{const a=j.toCanvas("ui","Coin");if(a&&r.parentElement){const i=r.getContext("2d");if(i){const s=Math.min(r.width/a.width,r.height/a.height),l=a.width*s,d=a.height*s,c=(r.width-l)/2,u=(r.height-d)/2;i.drawImage(a,c,u,l,d);}}}catch(a){console.warn("[CropValueIndicator.render] Failed to render coin sprite:",a);}return t}function s1(e){const t=[],n=e.querySelectorAll("span.chakra-text");for(const r of n){const o=r.textContent?.trim();if(!o)continue;["Gold","Rainbow","Wet","Chilled","Frozen","Dawnlit","Dawnbound","Amberlit","Amberbound"].includes(o)&&t.push(o);}return t}function l1(e){const t=e.querySelectorAll("p.chakra-text");for(const n of t){const r=n.textContent?.trim();if(!r)continue;const o=r.match(/^([\d.]+)\s*kg$/i);if(o)return parseFloat(o[1])}return 1}function c1(){const e=[],t=document.querySelectorAll(`.${ls}`);for(const r of t)r.offsetParent&&(r.closest("button.chakra-button")||e.push({element:r}));const n=document.querySelectorAll(`.${cs}`);for(const r of n){if(!r.offsetParent||r.closest("button.chakra-button"))continue;const o=r.querySelectorAll(":scope > .McFlex > .McFlex");if(o.length>0){const a=o[o.length-1];a.querySelector("p.chakra-text")&&e.push({element:a});}}return e}function d1(){const t=Xe().get().plant;if(!t)return 0;const n=t.currentSlotIndex!==null?t.slots[t.currentSlotIndex]:null;return n?dt(n.species,n.targetScale,n.mutations||[]):0}function u1(e,t){const n=document.querySelectorAll(".gemini-qol-cropPrice");for(const r of n){if(!r.offsetParent||r.closest("button.chakra-button"))continue;const o=r.querySelector(".gemini-qol-cropPrice-text");o&&(o.textContent=e>0?e.toLocaleString():"");}console.log("[CropValueIndicator.render] 🔄 Updated all prices:",{species:t.species,scale:t.targetScale,mutations:t.mutations||[],price:e,count:n.length});}function p1(){Yt!==null&&cancelAnimationFrame(Yt),Yt=requestAnimationFrame(()=>{Yt=null;const e=d1();if(e===us)return;us=e;const n=Xe().get().plant;if(!n)return;const r=n.currentSlotIndex!==null?n.slots[n.currentSlotIndex]:null;r&&u1(e,r);});}function Zn(e){if(!e.element.querySelector(".gemini-qol-cropPrice"))try{const t=e.element.querySelector("p.chakra-text");if(!t){console.log("[CropValueIndicator.render] No name element found in tooltip");return}const n=t.closest(".McFlex");if(!n){console.log("[CropValueIndicator.render] No McFlex container found");return}const o=Xe().get().plant;let a=0;if(o&&o.currentSlotIndex!==null){const s=o.slots[o.currentSlotIndex];s&&(a=dt(s.species,s.targetScale,s.mutations||[]));}if(a===0){const s=t.textContent?.trim();if(s){const l=l1(n),d=s1(n);a=dt(s,l,d);}}const i=i1(a);n.appendChild(i),An.add(()=>i.remove()),console.log("[CropValueIndicator.render] ✅ Injected price:",{price:a});}catch(t){console.warn("[CropValueIndicator.render] Failed to inject price:",t);}}function f1(){const e=c1();for(const n of e)Zn(n);Qo=Xe().subscribePlantInfo(()=>{p1();});const t=new MutationObserver(n=>{for(const r of n)r.type==="childList"&&r.addedNodes.forEach(o=>{if(o instanceof HTMLElement){if(o.classList.contains(ls)&&(o.closest("button.chakra-button")||Zn({element:o})),o.querySelectorAll(`.${ls}`).forEach(s=>{s.closest("button.chakra-button")||Zn({element:s});}),o.classList.contains(cs)&&!o.closest("button.chakra-button")){const s=o.querySelectorAll(":scope > .McFlex > .McFlex");if(s.length>0){const l=s[s.length-1];l.querySelector("p.chakra-text")&&!l.querySelector(".gemini-qol-cropPrice")&&Zn({element:l});}}o.querySelectorAll(`.${cs}`).forEach(s=>{if(!s.closest("button.chakra-button")){const l=s.querySelectorAll(":scope > .McFlex > .McFlex");if(l.length>0){const d=l[l.length-1];d.querySelector("p.chakra-text")&&!d.querySelector(".gemini-qol-cropPrice")&&Zn({element:d});}}});}});});t.observe(document.body,{childList:true,subtree:true}),Af(An,t),console.log("[CropValueIndicator.render] Started observing crops");}const g1={init(){if(Qn){console.log("[CropValueIndicator.render] Already initialized");return}Qn=true,a1(),f1(),console.log("✅ [CropValueIndicator.render] Initialized");},destroy(){Qn&&(Qn=false,Yt!==null&&(cancelAnimationFrame(Yt),Yt=null),Qo&&(Qo(),Qo=null),An.run(),An.clear(),An=Va(),ds=false,us=null,console.log("🛑 [CropValueIndicator.render] Destroyed"));},isEnabled(){return Qn}},Pf=we.CROP_VALUE_INDICATOR,h1={enabled:false};function _l(){return ye(Pf,h1)}function m1(e){Te(Pf,e);}let Hr=false;function Ef(){if(Hr){console.log("[CropValueIndicator] Already initialized");return}if(!_l().enabled){console.log("[CropValueIndicator] Disabled");return}Hr=true,console.log("[CropValueIndicator] Initializing..."),r1(),console.log("[CropValueIndicator] Initialized successfully");}function Mf(){Hr&&(console.log("[CropValueIndicator] Destroying..."),_f(),Hr=false,console.log("[CropValueIndicator] Destroyed"));}function b1(){return Hr}function x1(){return _l().enabled}function y1(e){const t=_l();if(t.enabled===e){console.log(`[CropValueIndicator] Already ${e?"enabled":"disabled"}`);return}t.enabled=e,m1(t),e?Ef():Mf(),console.log(`[CropValueIndicator] ${e?"Enabled":"Disabled"}`);}const _r={init:Ef,destroy:Mf,isReady:b1,isEnabled:x1,setEnabled:y1,render:g1},jr="css-qnqsp4",Al="css-1cdcuw7",Pl='[role="tooltip"]';let Zo=Va(),er=false,ea=null,ps=null,Jt=null;function v1(){const e=[],t=document.querySelectorAll(`.${jr}`);for(const n of t){if(!n.offsetParent||n.closest("button.chakra-button"))continue;const r=n.querySelector(`.${Al}`);r&&e.push({element:n,weightElement:r});}return e}function w1(){const t=Xe().get().plant;if(!t)return 0;const n=t.currentSlotIndex!==null?t.slots[t.currentSlotIndex]:null;return n?Ys(n.species,n.targetScale):0}function S1(e,t){const n=document.querySelectorAll(`.${jr}`);for(const r of n){if(!r.offsetParent||r.closest("button.chakra-button"))continue;const o=r.querySelector(`.${Al}`);if(o){const a=o.querySelector("svg"),i=`${e}%`;o.textContent=i,a&&o.appendChild(a);}}ya(),console.log("[CropSizeIndicator.render] 🔄 Updated all sizes:",{species:t.species,scale:t.targetScale,size:e,count:n.length});}function C1(){Jt!==null&&cancelAnimationFrame(Jt),Jt=requestAnimationFrame(()=>{Jt=null;const e=w1();if(e===ps)return;ps=e;const n=Xe().get().plant;if(!n)return;const r=n.currentSlotIndex!==null?n.slots[n.currentSlotIndex]:null;r&&S1(e,r);});}function Rf(e,t){const n=V.get("plants");if(!n)return "";const r=n[e];return r?.crop?.baseWeight?`${(r.crop.baseWeight*t).toFixed(2)} kg`:""}function ya(){const e=document.querySelectorAll(Pl),n=Xe().get().plant;if(!n||n.currentSlotIndex===null)return;const r=n.slots[n.currentSlotIndex];if(!r)return;const o=Rf(r.species,r.targetScale);for(const a of e){if(!a.offsetParent)continue;const i=a.textContent?.trim();i&&i.startsWith("Size:")&&o&&(a.textContent=o);}}function Ci(){const e=v1();for(const t of e)if(t.weightElement)try{const r=Xe().get().plant;if(r&&r.currentSlotIndex!==null){const o=r.slots[r.currentSlotIndex];if(o){const a=Ys(o.species,o.targetScale),i=t.weightElement.querySelector("svg");t.weightElement.textContent=`${a}%`,i&&t.weightElement.appendChild(i);}}}catch(n){console.warn("[CropSizeIndicator.render] Failed to update size:",n);}ya();}function k1(){const e=document.querySelectorAll(`.${jr}`),n=Xe().get().plant;if(!n||n.currentSlotIndex===null)return;const r=n.slots[n.currentSlotIndex];if(!r)return;const o=Rf(r.species,r.targetScale);for(const i of e){if(!i.offsetParent||i.closest("button.chakra-button"))continue;const s=i.querySelector(`.${Al}`);if(s){const l=s.querySelector("svg");s.textContent=o,l&&s.appendChild(l);}}const a=document.querySelectorAll(Pl);for(const i of a){if(!i.offsetParent)continue;const s=i.textContent?.trim();s&&!s.includes("kg")&&(i.textContent=o);}console.log("[CropSizeIndicator.render] Restored crop weights");}function T1(){Ci(),ea=Xe().subscribePlantInfo(()=>{C1();});const e=new MutationObserver(t=>{for(const n of t)n.type==="childList"&&n.addedNodes.forEach(r=>{if(r instanceof HTMLElement){if(r.hasAttribute("role")&&r.getAttribute("role")==="tooltip"){const i=r.textContent?.trim();i&&i.startsWith("Size:")&&ya();}r.classList.contains(jr)&&(r.closest("button.chakra-button")||Ci()),r.querySelectorAll(`.${jr}`).length>0&&Ci(),r.querySelectorAll(Pl).forEach(i=>{const s=i.textContent?.trim();s&&s.startsWith("Size:")&&ya();});}});});e.observe(document.body,{childList:true,subtree:true}),Af(Zo,e),console.log("[CropSizeIndicator.render] Started observing crops");}const El={init(){if(er){console.log("[CropSizeIndicator.render] Already initialized");return}er=true,T1(),console.log("✅ [CropSizeIndicator.render] Initialized");},destroy(){er&&(er=false,k1(),Jt!==null&&(cancelAnimationFrame(Jt),Jt=null),ea&&(ea(),ea=null),Zo.run(),Zo.clear(),Zo=Va(),ps=null,console.log("🛑 [CropSizeIndicator.render] Destroyed"));},isEnabled(){return er}},Lf=we.CROP_SIZE_INDICATOR,I1={enabled:false};function Ml(){return ye(Lf,I1)}function _1(e){Te(Lf,e);}let Wr=false;function Nf(){if(Wr){console.log("[CropSizeIndicator] Already initialized");return}if(!Ml().enabled){console.log("[CropSizeIndicator] Disabled");return}Wr=true,console.log("[CropSizeIndicator] Initializing..."),El.init(),console.log("[CropSizeIndicator] Initialized successfully");}function Ff(){Wr&&(console.log("[CropSizeIndicator] Destroying..."),El.destroy(),Wr=false,console.log("[CropSizeIndicator] Destroyed"));}function A1(){return Wr}function P1(){return Ml().enabled}function E1(e){const t=Ml();if(t.enabled===e){console.log(`[CropSizeIndicator] Already ${e?"enabled":"disabled"}`);return}t.enabled=e,_1(t),e?Nf():Ff(),console.log(`[CropSizeIndicator] ${e?"Enabled":"Disabled"}`);}const Ar={init:Nf,destroy:Ff,isReady:A1,isEnabled:P1,setEnabled:E1,render:El},Of=we.SHOP_NOTIFIER,$f={seed:[],tool:[],egg:[],decor:[]},M1={enabled:false,trackedItems:$f},R1=["seed","tool","egg","decor"];function Bf(e){return {seed:Array.isArray(e?.seed)?[...e.seed]:[],tool:Array.isArray(e?.tool)?[...e.tool]:[],egg:Array.isArray(e?.egg)?[...e.egg]:[],decor:Array.isArray(e?.decor)?[...e.decor]:[]}}function ro(e){return {seed:[...e.seed],tool:[...e.tool],egg:[...e.egg],decor:[...e.decor]}}function Wn(){const e=ye(Of,M1);return {enabled:e?.enabled??false,trackedItems:Bf(e?.trackedItems)}}function Xa(e){Te(Of,{enabled:e.enabled,trackedItems:ro(e.trackedItems)});}function L1(e){const n={...Wn(),...e};return e.trackedItems&&(n.trackedItems=Bf(e.trackedItems)),Xa(n),n}function Rl(){return Wn().enabled}function N1(e){L1({enabled:e});}function Df(){return ro(Wn().trackedItems)}function Gf(){const e=Df(),t=[];for(const n of R1)for(const r of e[n])t.push({shopType:n,itemId:r});return t}function F1(e,t){const n=Wn(),r=ro(n.trackedItems),o=r[e];if(o.includes(t))return;o.push(t),Xa({...n,trackedItems:r});const a=new CustomEvent("gemini:tracked-items-changed",{detail:{shopType:e,itemId:t,action:"add"}});window.dispatchEvent(a);}function zf(e,t){const n=Wn(),r=ro(n.trackedItems),o=r[e],a=o.filter(s=>s!==t);if(a.length===o.length)return;r[e]=a,Xa({...n,trackedItems:r});const i=new CustomEvent("gemini:tracked-items-changed",{detail:{shopType:e,itemId:t,action:"remove"}});window.dispatchEvent(i);}function O1(){const e=Wn();Xa({...e,trackedItems:ro($f)});}let va=false;const fs=[];function $1(e,t){const n=Df()[e];if(!n.length)return [];const r=new Set(n);return t.items.filter(o=>r.has(o.id)&&o.isAvailable).map(o=>({itemId:o.id,remaining:o.remaining}))}function Eo(e,t){const n=$1(e,t.shop);if(!n.length)return;console.log("[ShopNotifier] Tracked items restocked",{shopType:e,items:n});const r=new CustomEvent("gemini:shop-restock-tracked",{detail:{shopType:e,items:n}});window.dispatchEvent(r);}function B1(){if(va)return;va=true;const e=zn();fs.push(e.subscribeSeedRestock(t=>Eo("seed",t)),e.subscribeToolRestock(t=>Eo("tool",t)),e.subscribeEggRestock(t=>Eo("egg",t)),e.subscribeDecorRestock(t=>Eo("decor",t)));}function D1(){if(va){va=false;for(const e of fs)e();fs.length=0;}}const Hf={Shovel:{shopType:"tool",maxQuantity:1},WateringCan:{shopType:"tool",maxQuantity:99},PetHutch:{shopType:"decor",maxQuantity:1},DecorShed:{shopType:"decor",maxQuantity:1}};function G1(e,t,n){const r=n.find(a=>typeof a=="object"&&a!==null&&"toolId"in a&&a.toolId===e);return r?(r.quantity??0)>=t:false}function z1(e,t,n){const r=n.find(d=>typeof d=="object"&&d!==null&&"decorId"in d&&d.decorId===e),o=r?r.quantity??0:0,s=Ha().get().decors.all.filter(d=>typeof d=="object"&&d!==null&&"decorId"in d&&d.decorId===e).length;return o+s>=t}function jf(e,t,n,r){return t==="tool"?G1(e,n,r):t==="decor"?z1(e,n,r):false}function Xc(e,t){const n=Hf[e];if(!n||n.shopType!==t)return  false;const o=ft().get();return jf(e,t,n.maxQuantity,o.items)}function qc(){const t=ft().get(),n=Gf();for(const r of n){const o=Hf[r.itemId];o&&o.shopType===r.shopType&&jf(r.itemId,r.shopType,o.maxQuantity,t.items)&&(console.log(`[ShopNotifier] Auto-disabling tracking for ${r.itemId} (max quantity reached)`),zf(r.shopType,r.itemId));}}let wa=false,ta=null;function H1(){if(wa)return;wa=true,ta=ft().subscribeStable(()=>{qc();}),qc();}function j1(){wa&&(wa=false,ta&&(ta(),ta=null));}let Ur=false;function Wf(){if(Ur){console.log("[ShopNotifier] Already initialized");return}if(!Rl()){console.log("[ShopNotifier] Disabled");return}Ur=true,B1(),H1(),console.log("[ShopNotifier] Initialized");}function Uf(){Ur&&(D1(),j1(),Ur=false,console.log("[ShopNotifier] Destroyed"));}function W1(){return Ur}function U1(){return Rl()}function V1(e){if(Rl()===e){console.log(`[ShopNotifier] Already ${e?"enabled":"disabled"}`);return}N1(e),e?Wf():Uf(),console.log(`[ShopNotifier] ${e?"Enabled":"Disabled"}`);}const Bt={init:Wf,destroy:Uf,isReady:W1,isEnabled:U1,setEnabled:V1,addTrackedItem:F1,removeTrackedItem:zf,getTrackedItems:Gf,resetTrackedItems:O1},Vf=we.WEATHER_NOTIFIER,X1={enabled:false,trackedWeathers:[]};function Xf(e){return Array.isArray(e)?[...e]:[]}function qa(e){return [...e]}function oo(){const e=ye(Vf,X1);return {enabled:e?.enabled??false,trackedWeathers:Xf(e?.trackedWeathers)}}function Ll(e){Te(Vf,{enabled:e.enabled,trackedWeathers:qa(e.trackedWeathers)});}function q1(e){const n={...oo(),...e};return e.trackedWeathers&&(n.trackedWeathers=Xf(e.trackedWeathers)),Ll(n),n}function qf(){return oo().enabled}function K1(e){q1({enabled:e});}function Nl(){return qa(oo().trackedWeathers)}function Y1(e){return Nl().includes(e)}function J1(e){const t=oo(),n=qa(t.trackedWeathers);if(n.includes(e))return;n.push(e);const r=!t.enabled&&n.length>0,o={trackedWeathers:n,enabled:r?true:t.enabled};Ll(o);const a=new CustomEvent("gemini:tracked-weathers-changed",{detail:{weatherId:e,action:"add",shouldReinit:r}});window.dispatchEvent(a);const i=new CustomEvent("gemini:weather-tracked-check",{detail:{weatherId:e}});window.dispatchEvent(i);}function Q1(e){const t=oo(),n=qa(t.trackedWeathers),r=n.filter(s=>s!==e);if(r.length===n.length)return;const o=t.enabled&&r.length===0,a={trackedWeathers:r,enabled:o?false:t.enabled};Ll(a);const i=new CustomEvent("gemini:tracked-weathers-changed",{detail:{weatherId:e,action:"remove",shouldReinit:o}});window.dispatchEvent(i);}let Pr=null,na="Sunny";function Kf(e){const{weatherId:t}=e.detail||{};if(!t)return;if(cl().get().id===t){console.log("[WeatherNotifier] Manually tracked weather is currently active:",t),Yf();const a=new CustomEvent("gemini:weather-appeared",{detail:{weatherId:t}});window.dispatchEvent(a);}}function Z1(){if(Pr){console.log("[WeatherNotifier] Already tracking");return}const e=cl();na=e.get().id,console.log("[WeatherNotifier] Starting tracking, initial weather:",na),window.addEventListener("gemini:weather-tracked-check",Kf),Pr=e.subscribeStable(n=>{const r=n.current.id,o=n.previous.id;if(console.log("[WeatherNotifier] Weather changed:",{previous:o,current:r}),r!==o&&Nl().includes(r)){console.log("[WeatherNotifier] Tracked weather detected:",r),Yf();const i=new CustomEvent("gemini:weather-appeared",{detail:{weatherId:r}});window.dispatchEvent(i);}na=r;}),console.log("[WeatherNotifier] Tracking initialized");}function ek(){window.removeEventListener("gemini:weather-tracked-check",Kf),Pr&&(Pr(),Pr=null,na="Sunny",console.log("[WeatherNotifier] Tracking stopped"));}function Yf(){try{$t.CustomSounds.play("default-notification");}catch(e){console.warn("[WeatherNotifier] Failed to play notification sound:",e);}}let Vr=false;function Jf(e){const{shouldReinit:t}=e.detail||{};t&&(console.log("[WeatherNotifier] Config changed, reinitializing..."),Zf(),Qf());}function Qf(){if(Vr){console.log("[WeatherNotifier] Already initialized");return}if(Vr=true,window.addEventListener("gemini:tracked-weathers-changed",Jf),!qf()){console.log("[WeatherNotifier] Disabled (waiting for tracked weathers)");return}console.log("[WeatherNotifier] Initializing"),Z1(),console.log("[WeatherNotifier] Initialized");}function Zf(){Vr&&(console.log("[WeatherNotifier] Destroying"),window.removeEventListener("gemini:tracked-weathers-changed",Jf),ek(),Vr=false,console.log("[WeatherNotifier] Destroyed"));}function tk(){return Vr}const an={init:Qf,destroy:Zf,isReady:tk,isEnabled:qf,setEnabled:K1,getTrackedWeathers:Nl,addTrackedWeather:J1,removeTrackedWeather:Q1,isWeatherTracked:Y1};class eg{constructor(){R(this,"stats");R(this,"STORAGE_KEY",we.TRACKER_STATS);this.stats=this.loadStats(),this.startSession();}loadStats(){return ye(this.STORAGE_KEY,this.getDefaultStats())}saveStats(){Te(this.STORAGE_KEY,this.stats);}getDefaultStats(){return {session:{sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},allTime:{totalSessions:0,totalPlayTime:0,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0,crops:{},pets:{}}}}startSession(){this.stats.session={sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},this.stats.allTime.totalSessions++,this.saveStats();}endSession(){this.stats.session.sessionEnd=Date.now();const t=this.stats.session.sessionEnd-this.stats.session.sessionStart;this.stats.allTime.totalPlayTime+=t,this.saveStats();}recordHarvest(t,n=1,r=[]){this.stats.session.cropsHarvested+=n,this.stats.allTime.cropsHarvested+=n,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].harvested+=n;for(const o of r)this.stats.allTime.crops[t].mutations[o]||(this.stats.allTime.crops[t].mutations[o]=0),this.stats.allTime.crops[t].mutations[o]++;this.saveStats();}recordCropSale(t,n=1,r=0){this.stats.session.cropsSold+=n,this.stats.session.coinsEarned+=r,this.stats.allTime.cropsSold+=n,this.stats.allTime.coinsEarned+=r,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].sold+=n,this.stats.allTime.crops[t].totalValue+=r,this.saveStats();}recordPetHatch(t,n=[],r=[]){this.stats.session.petsHatched++,this.stats.allTime.petsHatched++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].hatched++;for(const o of n)this.stats.allTime.pets[t].mutations[o]||(this.stats.allTime.pets[t].mutations[o]=0),this.stats.allTime.pets[t].mutations[o]++;for(const o of r)this.stats.allTime.pets[t].abilities[o]||(this.stats.allTime.pets[t].abilities[o]=0),this.stats.allTime.pets[t].abilities[o]++;this.saveStats();}recordPetSale(t,n=0){this.stats.session.petsSold++,this.stats.session.coinsEarned+=n,this.stats.allTime.petsSold++,this.stats.allTime.coinsEarned+=n,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].sold++,this.saveStats();}recordPetFeed(t){this.stats.session.petsFed++,this.stats.allTime.petsFed++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].fed++,this.saveStats();}recordSeedPurchase(t,n=1,r=0){this.stats.session.seedsPurchased+=n,this.stats.session.coinsSpent+=r,this.stats.allTime.seedsPurchased+=n,this.stats.allTime.coinsSpent+=r,this.saveStats();}recordEggPurchase(t,n=1,r=0){this.stats.session.eggsPurchased+=n,this.stats.session.coinsSpent+=r,this.stats.allTime.eggsPurchased+=n,this.stats.allTime.coinsSpent+=r,this.saveStats();}recordAbilityProc(t){this.stats.session.abilityProcs++,this.stats.allTime.abilityProcs++,this.saveStats();}recordCoinsEarned(t){this.stats.session.coinsEarned+=t,this.stats.allTime.coinsEarned+=t,this.saveStats();}recordCoinsSpent(t){this.stats.session.coinsSpent+=t,this.stats.allTime.coinsSpent+=t,this.saveStats();}getStats(){return {...this.stats}}getSessionStats(){return {...this.stats.session}}getAllTimeStats(){return {...this.stats.allTime}}getCropStats(t){return this.stats.allTime.crops[t]||null}getPetStats(t){return this.stats.allTime.pets[t]||null}getTopCrops(t=10){return Object.entries(this.stats.allTime.crops).map(([n,r])=>({species:n,stats:r})).sort((n,r)=>r.stats.harvested-n.stats.harvested).slice(0,t)}getTopPets(t=10){return Object.entries(this.stats.allTime.pets).map(([n,r])=>({species:n,stats:r})).sort((n,r)=>r.stats.hatched-n.stats.hatched).slice(0,t)}resetSession(){this.startSession();}resetAll(){this.stats=this.getDefaultStats(),this.saveStats();}exportStats(){return JSON.stringify(this.stats,null,2)}importStats(t){try{const n=JSON.parse(t);return this.stats=n,this.saveStats(),!0}catch(n){return console.warn("[StatsTracker] Failed to import stats:",n),false}}}let Pn=null;function nk(){return Pn||(Pn=new eg),Pn}function rk(){Pn&&(Pn.endSession(),Pn=null);}function tg(e){const t=Oa(e.xp),n=$a(e.petSpecies,e.targetScale),r=Ba(e.petSpecies,e.xp,n),o=Da(e.petSpecies,t),a=wp(e.petSpecies),i=gv(r,n,a),s=hv(r,n);return {current:r,max:n,progress:s,age:t,isMature:o,strengthPerHour:a,hoursToMax:i}}function ng(e){return {...e,strength:tg(e)}}function rg(e){return e.map(ng)}function ok(e){if(e.length===0)return {averageCurrent:0,averageMax:0,totalMature:0,totalImmature:0,strongestPet:null,weakestPet:null};const t=rg(e),n=t.reduce((l,d)=>l+d.strength.current,0),r=t.reduce((l,d)=>l+d.strength.max,0),o=t.filter(l=>l.strength.isMature).length,a=t.length-o,i=t.reduce((l,d)=>d.strength.max>(l?.strength.max||0)?d:l,t[0]),s=t.reduce((l,d)=>d.strength.max<(l?.strength.max||1/0)?d:l,t[0]);return {averageCurrent:Math.round(n/t.length),averageMax:Math.round(r/t.length),totalMature:o,totalImmature:a,strongestPet:i,weakestPet:s}}const ak=Object.freeze(Object.defineProperty({__proto__:null,calculatePetStrength:tg,enrichPetWithStrength:ng,enrichPetsWithStrength:rg,getPetStrengthStats:ok},Symbol.toStringTag,{value:"Module"}));class og{constructor(){R(this,"logs",[]);R(this,"maxLogs",1e3);R(this,"unsubscribe",null);R(this,"isInitialized",false);}init(){this.isInitialized||(this.unsubscribe=le.myPets.subscribeAbility(t=>{this.log({abilityId:t.trigger.abilityId||"unknown",petId:t.pet.id,petSpecies:t.pet.petSpecies,petName:t.pet.name,timestamp:t.trigger.performedAt||Date.now()});}),this.isInitialized=true);}log(t){const n={...t,id:`${t.timestamp}-${Math.random().toString(36).substr(2,9)}`};this.logs.push(n),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs));}getLogs(t){let n=this.logs;t?.abilityId&&(n=n.filter(o=>o.abilityId===t.abilityId)),t?.petId&&(n=n.filter(o=>o.petId===t.petId)),t?.petSpecies&&(n=n.filter(o=>o.petSpecies===t.petSpecies));const{since:r}=t??{};return r!==void 0&&(n=n.filter(o=>o.timestamp>=r)),t?.limit&&(n=n.slice(-t.limit)),n}getStats(t=36e5){const n=Date.now()-t,r=this.logs.filter(a=>a.timestamp>=n),o=new Map;for(const a of r){o.has(a.abilityId)||o.set(a.abilityId,{abilityId:a.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});const i=o.get(a.abilityId);i.count++,(!i.lastProc||a.timestamp>i.lastProc)&&(i.lastProc=a.timestamp);}for(const a of o.values())a.procsPerMinute=a.count/t*6e4,a.procsPerHour=a.count/t*36e5;return o}getAbilityStats(t,n=36e5){return this.getStats(n).get(t)||null}getPetStats(t,n=36e5){const r=Date.now()-n,o=this.logs.filter(i=>i.petId===t&&i.timestamp>=r),a=new Map;for(const i of o){a.has(i.abilityId)||a.set(i.abilityId,{abilityId:i.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});const s=a.get(i.abilityId);s.count++,(!s.lastProc||i.timestamp>s.lastProc)&&(s.lastProc=i.timestamp);}for(const i of a.values())i.procsPerMinute=i.count/n*6e4,i.procsPerHour=i.count/n*36e5;return {totalProcs:o.length,abilities:a}}getTopAbilities(t=10,n=36e5){return Array.from(this.getStats(n).values()).sort((o,a)=>a.count-o.count).slice(0,t)}clear(){this.logs=[];}setMaxLogs(t){this.maxLogs=t,this.logs.length>t&&(this.logs=this.logs.slice(-t));}getLogCount(){return this.logs.length}isActive(){return this.isInitialized}destroy(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null),this.logs=[],this.isInitialized=false;}}let Qt=null;function ik(){return Qt||(Qt=new og,Qt.init()),Qt}function sk(){Qt&&(Qt.destroy(),Qt=null);}const ag={StatsTracker:eg,getStatsTracker:nk,destroyStatsTracker:rk},ig={AbilityLogger:og,getAbilityLogger:ik,destroyAbilityLogger:sk,...ak},lk=Object.freeze(Object.defineProperty({__proto__:null,MGAchievements:Qp,MGAntiAfk:tn,MGAutoFavorite:gl,MGBulkFavorite:ma,MGCropSizeIndicator:Ar,MGCropValueIndicator:_r,MGJournalChecker:qp,MGPetTeam:ae,MGPets:ig,MGShopNotifier:Bt,MGTracker:ag,MGWeatherNotifier:an,MGXPTracker:xa},Symbol.toStringTag,{value:"Module"})),st=[{id:"Rainbow",desc:"All Rainbow items"},{id:"Gold",desc:"All Gold items"},{id:"Wet",desc:"All Wet items"},{id:"Chilled",desc:"All Chilled items"},{id:"Frozen",desc:"All Frozen items"},{id:"Dawnlit",desc:"Dawn mutations"},{id:"Dawncharged",desc:"Dawn charged"},{id:"Ambershine",desc:"Amber mutations"},{id:"Ambercharged",desc:"Amber charged"}],ck={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function gn(e){return e?ck[e]??0:0}class dk extends sn{constructor(){super({id:"tab-auto-favorite",label:"Auto-Favorite"});R(this,"allPlants",[]);R(this,"allPets",[]);R(this,"sectionElement",null);}async build(n){await NS();const r=n.getRootNode();ve(r,Fp,"auto-favorite-settings-styles");const o=this.createGrid("12px");o.id="auto-favorite-settings",this.sectionElement=o,n.appendChild(o),await this.loadGameData(),await this.waitForSprites(),this.renderContent();}async loadGameData(){try{await V.waitForAny(3e3).catch(()=>{}),await Promise.all([V.waitFor("plants",3e3).catch(()=>console.warn("[AutoFavorite UI] Still waiting for plants data...")),V.waitFor("pets",3e3).catch(()=>console.warn("[AutoFavorite UI] Still waiting for pets data..."))]);const n=V.get("plants")||{},r=V.get("pets")||{};this.allPlants=Object.keys(n).sort((o,a)=>{const i=n[o]?.seed?.rarity||null,s=n[a]?.seed?.rarity||null,l=gn(i)-gn(s);return l!==0?l:o.localeCompare(a,void 0,{numeric:!0,sensitivity:"base"})}),this.allPets=Object.keys(r).sort((o,a)=>{const i=r[o]?.rarity||null,s=r[a]?.rarity||null,l=gn(i)-gn(s);return l!==0?l:o.localeCompare(a,void 0,{numeric:!0,sensitivity:"base"})});}catch(n){console.error("[AutoFavorite UI] Failed to load game data:",n);}}async waitForSprites(){if(j.isReady())return;const n=1e4,r=100;let o=0;return new Promise(a=>{const i=()=>{j.isReady()||o>=n?a():(o+=r,setTimeout(i,r));};i();})}renderContent(){this.sectionElement&&(this.sectionElement.innerHTML="",this.sectionElement.appendChild(this.createMasterToggle()),this.sectionElement.appendChild(this.createMutationsCard()),this.sectionElement.appendChild(this.createProduceCard()),this.sectionElement.appendChild(this.createPetsCard()));}createMasterToggle(){const n=x("div",{className:"kv"}),r=Od({text:"Enable Auto-Favorite",tone:"default",size:"lg"}),o=Rn({checked:at().get().enabled,onChange:async a=>{const i=at(),s=i.get();await i.set({...s,enabled:a}),await this.saveConfig();}});return n.append(r.root,o.root),We({title:"Auto-Favorite",padding:"lg"},n,x("p",{style:"margin-top: 6px; font-size: 12px; color: var(--muted);"},"Automatically favorite items when added to inventory"))}createMutationsCard(){const n=x("div",{className:"u-col"}),r=x("div",{className:"mut-row"});r.appendChild(this.createMutationButton(st[0])),r.appendChild(this.createMutationButton(st[1])),n.appendChild(r);const o=x("div",{className:"mut-row"});o.appendChild(this.createMutationButton(st[2])),o.appendChild(this.createMutationButton(st[3])),o.appendChild(this.createMutationButton(st[4])),n.appendChild(o);const a=x("div",{className:"mut-row"});a.appendChild(this.createMutationButton(st[5])),a.appendChild(this.createMutationButton(st[6])),n.appendChild(a);const i=x("div",{className:"mut-row"});return i.appendChild(this.createMutationButton(st[7])),i.appendChild(this.createMutationButton(st[8])),n.appendChild(i),We({title:"Mutations Priority",variant:"soft",padding:"lg",expandable:true,defaultExpanded:true},n,x("p",{style:"margin-top: 8px; font-size: 11px; color: var(--muted);"},`${at().get().favoriteMutations.length} / ${st.length} active`))}createMutationButton(n){let r=at().get().favoriteMutations.includes(n.id);const a=["mut-btn",`mut-btn--${n.id.toLowerCase()}`];r&&a.push("active");const i=x("div",{className:a.join(" ")}),s=x("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(j.isReady()){const c=j.toCanvas("plant","Sunflower",{mutations:[n.id],scale:.16});c.style.width="28px",c.style.height="28px",c.style.objectFit="contain",s.appendChild(c);}}catch{}const l=n.id.charAt(0).toUpperCase()+n.id.slice(1).toLowerCase(),d=x("div",{style:"font-size: 13px; font-weight: 600; color: var(--fg); text-shadow: 0 1px 2px rgba(0,0,0,0.5); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"},l);if(i.append(s,d),n.id==="Rainbow"||n.id==="Gold"){const c=x("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(j.isReady()){const u=j.toCanvas("pet","Capybara",{mutations:[n.id],scale:.16});u.style.width="28px",u.style.height="28px",u.style.objectFit="contain",c.appendChild(u);}}catch{}i.append(c);}else {const c=x("div",{style:"width: 28px; flex-shrink: 0;"});i.append(c);}return i.addEventListener("click",async c=>{c.stopPropagation();const u=at(),p=u.get();if(r){const g=p.favoriteMutations.filter(h=>h!==n.id);await u.set({...p,favoriteMutations:g}),r=false,i.classList.remove("active");}else {const g=[...p.favoriteMutations,n.id];await u.set({...p,favoriteMutations:g}),r=true,i.classList.add("active");}await this.saveConfig();const f=this.sectionElement?.querySelector(".card p");f&&(f.textContent=`${at().get().favoriteMutations.length} / ${st.length} active`);}),i}createProduceCard(){return this.createItemSelectionCard({title:"Produce",items:this.allPlants,category:"plant",selected:at().get().favoriteProduceList,onUpdate:async n=>{const r=at(),o=r.get();await r.set({...o,favoriteProduceList:n}),await this.saveConfig();}})}createPetsCard(){return this.createItemSelectionCard({title:"Pets",items:this.allPets,category:"pet",selected:at().get().favoritePetsList,onUpdate:async n=>{const r=at(),o=r.get();await r.set({...o,favoritePetsList:n}),await this.saveConfig();}})}createItemSelectionCard(n){const{title:r,items:o,category:a,selected:i,onUpdate:s}=n;let l=new Set(i),d=o;const c=x("div",{style:"margin-bottom: 8px;"}),u=Ta({placeholder:`Search ${r.toLowerCase()}...`,value:"",debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:v=>{const C=v.trim().toLowerCase();C?d=o.filter(I=>I.toLowerCase().includes(C)):d=o,w.setData(h());}});c.appendChild(u.root);const p=x("div",{style:"display: flex; gap: 8px; margin-bottom: 12px;"}),f=qt({label:"Select All",variant:"default",size:"sm",onClick:()=>{const v=h().map(C=>C.id);w.setSelection(v);}}),g=qt({label:"Deselect All",variant:"default",size:"sm",onClick:()=>{w.clearSelection();}});p.append(f,g);const h=()=>d.map(v=>({id:v,name:v,rarity:this.getItemRarity(v,a),selected:l.has(v)})),m=v=>{if(!v){const I=x("span",{style:"opacity:0.5;"});return I.textContent="—",I}return to({variant:"rarity",rarity:v,size:"sm"}).root},b=v=>{const C=x("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0; background: color-mix(in oklab, var(--bg) 5%, transparent); border-radius: 6px;"});try{if(j.isReady()){let I=a,k=v;a==="plant"&&(["Bamboo","Cactus"].includes(v)&&(I="tallplant"),v==="DawnCelestial"&&(k="DawnCelestialCrop"),v==="MoonCelestial"&&(k="MoonCelestialCrop"),v==="OrangeTulip"&&(k="Tulip"));const A=j.toCanvas(I,k,{scale:.5});A.style.width="28px",A.style.height="28px",A.style.objectFit="contain",C.appendChild(A);}}catch{}return C},w=ka({columns:[{key:"name",header:"Name",width:"1fr",align:"center",sortable:true,sortFn:(v,C)=>v.name.localeCompare(C.name,void 0,{numeric:true,sensitivity:"base"}),render:v=>{const C=x("div",{style:"display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%;"}),I=b(v.id),k=x("span",{style:"font-weight: 500; color: var(--fg); white-space: nowrap;"},v.name);return C.append(I,k),C}},{key:"rarity",header:"Rarity",width:"100px",align:"center",sortable:true,sortFn:(v,C)=>gn(v.rarity)-gn(C.rarity),render:v=>m(v.rarity)}],data:h(),maxHeight:280,compact:true,zebra:true,animations:true,selectable:true,selectOnRowClick:true,hideHeaderCheckbox:true,initialSelection:Array.from(l),getRowId:v=>v.id,onSelectionChange:v=>{l.clear(),v.forEach(C=>l.add(C)),s(Array.from(l)),T();}}),S=x("p",{style:"margin-top: 8px; font-size: 11px; color: var(--muted);"}),T=()=>{S.textContent=`${l.size} / ${o.length} selected`;};return T(),We({title:`${r} (${l.size}/${o.length})`,variant:"soft",padding:"lg",expandable:true,defaultExpanded:false},c,p,w.root,S)}getItemRarity(n,r){try{if(r==="pet")return (V.get("pets")||{})[n]?.rarity||null;if(r==="plant"){const o=V.get("plants")||{},a=o[n];if(a?.seed?.rarity)return a.seed.rarity;const i=n.toLowerCase();for(const s of Object.values(o))if(s?.seed?.name?.toLowerCase()===i||s?.plant?.name?.toLowerCase()===i)return s.seed.rarity}}catch{}return null}async saveConfig(){const n=at().get();try{const{updateSimpleConfig:r}=gl;await r({enabled:n.enabled,favoriteSpecies:[...n.favoriteProduceList,...n.favoritePetsList],favoriteMutations:n.favoriteMutations});}catch(r){console.error("[AutoFavoriteSettings] Failed to update feature config:",r);}}}const uk=`
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
`,pk=`
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
`;function fk(e){const{count:t,expanded:n=false,onClick:r}=e,o=x("div",{className:"see-more"}),a=x("span",{className:"see-more-link"},ki(t,n));r&&a.addEventListener("click",r),o.appendChild(a);const i=o;return i.setCount=s=>{a.textContent=ki(s,n);},i.setExpanded=s=>{a.textContent=ki(t,s);},i}function ki(e,t){return t?"− Show less":`+ and ${e} more...`}const gk=e=>e<15?"#F98B4B":e<25?"#FC6D30":e<50?"#F3D32B":e<75?"#E9B52F":e<100?"#5EAC46":"#0B893F",hk=e=>e>=100?"var(--complete)":e>=75?"var(--high)":e>=50?"var(--medium)":"var(--low)",mk={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function Kc(e){return e?mk[e]??0:0}function Yc(e,t){try{if(t==="pets")return (V.get("pets")||{})[e]?.rarity||null;if(t==="plants")return (V.get("plants")||{})[e]?.seed?.rarity||null}catch{}return null}function bk({progress:e,activeTab:t,expandedCategories:n,onSpeciesClick:r,onToggleExpand:o}){const a=x("div",{className:"journal-content"}),i=x("div",{className:"journal-header"},"Garden Journal");if(a.appendChild(i),t!=="all"){const s=t==="plants"?e.plants:e.pets,l=x("div",{className:"journal-progress-indicator"}),d=Math.floor(s.variantsLogged/s.variantsTotal*100),c=x("span",{className:"percentage"},`Collected ${d}%`),u=x("span",{className:"count"},` (${s.variantsLogged}/${s.variantsTotal})`);l.appendChild(c),l.appendChild(u),a.appendChild(l);}return t==="all"?(a.appendChild(Mo("Produce",e.plants,"plants",n.has("plants"),r,()=>o("plants"),true)),a.appendChild(Mo("Pets",e.pets,"pets",n.has("pets"),r,()=>o("pets"),true))):t==="plants"?a.appendChild(Mo("Produce",e.plants,"plants",n.has("plants"),r,()=>o("plants"))):a.appendChild(Mo("Pets",e.pets,"pets",n.has("pets"),r,()=>o("pets"))),a}function Mo(e,t,n,r,o,a,i=false){const s=x("div",{style:"display: flex; flex-direction: column;"}),l=x("div",{style:`
            max-height: ${r?"480px":"none"};
            overflow-y: ${r?"auto":"visible"};
            overflow-x: hidden;
            margin-bottom: 8px;
        `,className:"journal-species-list"}),d=x("div",{className:"journal-category-stats",style:"height: 28px; line-height: 28px; margin-bottom: 0; display: flex; align-items: center; gap: 6px;"}),c=x("div",{style:"width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(j.isReady()){const m=n==="plants"?"plant":"pet",b=n==="plants"?"Carrot":"CommonEgg";if(j.has(m,b)){const y=j.toCanvas(m,b,{scale:.3});y.style.maxWidth="20px",y.style.maxHeight="20px",y.style.display="block",c.appendChild(y);}}}catch{}const u=t.speciesDetails.length,p=t.total,f=x("span",{},`[ ${e.toUpperCase()} ] — ${u}/${p} SPECIES`);if(d.append(c,f),s.appendChild(d),i){const m=x("div",{className:"journal-progress-indicator",style:"text-align: right; margin-bottom: 4px;"}),b=Math.floor(t.variantsLogged/t.variantsTotal*100),y=x("span",{className:"percentage"},`Collected ${b}%`),w=x("span",{className:"count"},` (${t.variantsLogged}/${t.variantsTotal})`);m.appendChild(y),m.appendChild(w),s.appendChild(m);}const g=[...t.speciesDetails].sort((m,b)=>{const y=Yc(m.species,n),w=Yc(b.species,n),S=Kc(y)-Kc(w);return S!==0?S:m.species.localeCompare(b.species,void 0,{numeric:true,sensitivity:"base"})}),h=r?g:g.slice(0,5);for(const m of h)l.appendChild(xk(m,n,o));if(s.appendChild(l),t.speciesDetails.length>5){const m=fk({count:t.speciesDetails.length-5,expanded:r,onClick:()=>{a();}});s.appendChild(m);}else s.appendChild(x("div",{style:"height: 28px;"}));return s}function xk(e,t,n){const r=x("div",{className:"journal-row",style:"height: 56px;",onclick:p=>{p.stopPropagation(),n(e,t);}}),o=x("div",{style:"width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{let f=t==="plants"?"plant":"pet",g=e.species;t==="plants"&&(e.species==="DawnCelestial"&&(g="DawnCelestialCrop"),e.species==="MoonCelestial"&&(g="MoonCelestialCrop"),e.species==="OrangeTulip"&&(g="Tulip"));const h=e.isComplete?["Rainbow"]:[],m=(y,w)=>{try{if(j.has(y,w))return j.toCanvas(y,w,{scale:.4,mutations:h})}catch{}return null},b=m(f,g)||(t==="plants"?m("tallplant",g):null)||m(f,g.toLowerCase())||(t==="plants"?m("tallplant",g.toLowerCase()):null);b?(b.style.maxWidth="32px",b.style.maxHeight="32px",b.style.display="block",o.appendChild(b)):console.warn(`[JournalChecker] No sprite found for ${e.species} in ${t}`);}catch(p){console.error(`[JournalChecker] Sprite error for ${e.species}`,p);}const a=x("div",{style:"flex: 1; position: relative; height: 22px;"}),i=x("div",{className:"journal-bar-container",style:"width: 100%; height: 100%; border-radius: 4px; overflow: hidden;"});let s;if(e.isComplete)s="width: 100%; height: 100%; background: linear-gradient(90deg, rgb(255,0,0) 0%, rgb(255,154,0) 14%, rgb(255,255,0) 28%, rgb(0,255,0) 42%, rgb(0,200,255) 56%, rgb(0,0,255) 70%, rgb(143,0,255) 84%, rgb(255,0,255) 100%);";else {const p=gk(e.variantsPercentage);s=`width: ${Math.max(2,e.variantsPercentage)}%; height: 100%; background: ${p};`;}const l=x("div",{className:e.isComplete?"journal-bar-fill rainbow":"journal-bar-fill",style:s});i.appendChild(l);const d=x("div",{style:"position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-weight: 600; font-size: 14px; color: var(--journal-ink); z-index: 1; pointer-events: none;"},e.species);a.append(i,d);const c=hk(e.variantsPercentage),u=x("span",{style:`flex-shrink: 0; font-weight: 800; font-size: 13px; min-width: 50px; text-align: right; color: ${c};`},`${Math.round(e.variantsPercentage)}%`);return r.append(o,a,u),r}function yk({species:e,category:t,onBack:n}){const r=x("div",{className:"journal-content"}),o=x("div",{className:"journal-back",onclick:d=>{d.stopPropagation(),n();}},"← Return");r.appendChild(o);const a=x("div",{className:"journal-header"},e.species);r.appendChild(a);const i=x("div",{className:"journal-category-stats",style:"text-align: center; height: 28px; line-height: 28px; margin-bottom: 28px;"},`[ ${e.variantsLogged.length} / ${e.variantsTotal} STAMPS ]`);r.appendChild(i);const s=x("div",{className:"journal-grid"}),l=[...e.variantsLogged,...e.variantsMissing].sort((d,c)=>d==="Normal"?-1:c==="Normal"||d==="Max Weight"?1:c==="Max Weight"?-1:d.localeCompare(c));for(const d of l){const c=e.variantsLogged.includes(d);s.appendChild(vk(e.species,d,t,c));}return r.appendChild(s),r}function vk(e,t,n,r){const o=x("div",{className:"journal-stamp-wrapper"}),a=x("div",{className:"journal-stamp",style:r?"":"opacity: 0.1; filter: grayscale(100%);"});try{const s=t!=="Normal"&&t!=="Max Weight"?[t]:[];let d=n==="plants"?"plant":"pet",c=e;n==="plants"&&(e==="DawnCelestial"&&(c="DawnCelestialCrop"),e==="MoonCelestial"&&(c="MoonCelestialCrop"),e==="OrangeTulip"&&(c="Tulip"));const u=(f,g)=>{try{const h=t==="Max Weight"?.72:.6;if(j.has(f,g))return j.toCanvas(f,g,{mutations:s,scale:h,boundsMode:"padded"})}catch{}return null},p=u(d,c)||(n==="plants"?u("tallplant",c):null)||u(d,c.toLowerCase())||(n==="plants"?u("tallplant",c.toLowerCase()):null);p&&(p.style.width="44px",p.style.height="44px",p.style.objectFit="contain",p.style.display="block",a.appendChild(p));}catch{}const i=x("div",{className:"journal-stamp-label"},t);return o.append(a,i),o}const wk=`
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
`;function Sk(e){const{label:t,tabId:n,tabIndex:r,active:o=false,onClick:a}=e,i=x("button",{className:`tab ${o?"active":""}`,"data-tab":n,"data-tab-index":String(r)},t),s=`var(--journal-tab-${Math.min(5,Math.max(1,r))})`;i.style.setProperty("--tab-color",s),a&&i.addEventListener("click",a);const l=i;return l.setActive=d=>{d?i.classList.add("active"):i.classList.remove("active");},l.setLabel=d=>{i.textContent=d;},l}const Ck=`
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
`,kk={activeTab:"all",expandedCategories:[]};let Zt=null;async function Tk(){return Zt||(Zt=await Xr("tab-journal-checker",{version:1,defaults:kk}),Zt)}function Ro(){if(!Zt)throw new Error("[JournalChecker] Section state not initialized. Call initSectionState() first.");return Zt}function Lo(){return Zt!==null}const Ik=[{id:"all",label:"All",colorTheme:"teal"},{id:"plants",label:"Crops",colorTheme:"green"},{id:"pets",label:"Pets",colorTheme:"purple"}];class _k extends sn{constructor(){super({id:"tab-journal-checker",label:"Journal"});R(this,"progress",null);R(this,"currentView",{type:"overview"});}async build(n){this.container=n,await Tk(),await j.init(),console.log("[JournalChecker] Sprite categories:",j.getCategories());const r=n.getRootNode();ve(r,uk,"journal-checker-styles"),ve(r,wk,"journal-tab-styles"),ve(r,Ck,"journal-progress-bar-styles"),ve(r,pk,"journal-see-more-styles"),this.container.classList.add("journal-checker-host"),this.container.style.height="100%",this.container.style.overflowY="auto",await this.updateProgress();const o=(a=>{this.progress=a.detail,this.refresh();});window.addEventListener("gemini:journal-updated",o),this.addCleanup(()=>{window.removeEventListener("gemini:journal-updated",o);});}async updateProgress(){try{const{MGJournalChecker:n}=await Bn(async()=>{const{MGJournalChecker:r}=await Promise.resolve().then(()=>lk);return {MGJournalChecker:r}},void 0);this.progress=await n.aggregateJournalProgress(),this.refresh();}catch(n){console.error("[JournalChecker] Failed to load progress:",n);}}get activeTab(){return Lo()?Ro().get().activeTab:"all"}set activeTab(n){Lo()&&Ro().update({activeTab:n});}get expandedCategories(){return Lo()?new Set(Ro().get().expandedCategories):new Set}setExpandedCategories(n){Lo()&&Ro().update({expandedCategories:Array.from(n)});}refresh(){if(this.container){if(this.container.innerHTML="",!this.progress){this.container.appendChild(x("div",{style:"padding: 20px; text-align: center; font-family: var(--font-game); color: var(--journal-sub);"},"Loading Journal..."));return}this.container.appendChild(this.renderTabNavigation()),this.currentView.type==="overview"?this.container.appendChild(bk({progress:this.progress,activeTab:this.activeTab,expandedCategories:this.expandedCategories,onSpeciesClick:(n,r)=>{this.currentView={type:"species",species:n,category:r},this.refresh();},onToggleExpand:n=>{const r=this.expandedCategories;r.has(n)?r.delete(n):r.add(n),this.setExpandedCategories(r),this.refresh();}})):this.container.appendChild(yk({species:this.currentView.species,category:this.currentView.category,onBack:()=>{this.currentView={type:"overview"},this.refresh();}}));}}renderTabNavigation(){const n=x("div",{className:"journal-tabs-container"});return Ik.forEach((r,o)=>{const a=Sk({label:r.label,tabId:r.id,tabIndex:o+1,active:this.activeTab===r.id,onClick:()=>{this.activeTab=r.id,this.refresh();}});n.appendChild(a);}),n}}function Ak(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("width","24"),e.setAttribute("height","24"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","2"),e.setAttribute("stroke-linecap","round"),e.style.color="var(--accent)";const t=document.createElementNS("http://www.w3.org/2000/svg","line");t.setAttribute("x1","12"),t.setAttribute("y1","5"),t.setAttribute("x2","12"),t.setAttribute("y2","19");const n=document.createElementNS("http://www.w3.org/2000/svg","line");return n.setAttribute("x1","5"),n.setAttribute("y1","12"),n.setAttribute("x2","19"),n.setAttribute("y2","12"),e.appendChild(t),e.appendChild(n),e}function Pk(e,t){const n=e;let r=e;const o=Hd({value:e,placeholder:"Team name",mode:"alphanumeric",allowSpaces:true,maxLength:50,blockGameKeys:true,onChange:a=>{const i=a.trim();i&&i!==r&&(r=i,t?.(i));},onEnter:a=>{const i=a.trim()||n;i!==r&&(r=i,t?.(i));}});return o.root.className="team-list-item__name-input",o.input.addEventListener("blur",()=>{const a=o.getValue().trim()||n;a!==r&&(r=a,t?.(a));}),o.input.addEventListener("keydown",a=>{a.key==="Escape"&&(a.preventDefault(),o.input.blur());}),o.root}function sg(e){const t=x("div",{className:"team-list-item"}),n=e.customIndicator??x("div",{className:`team-list-item__indicator ${e.isActive?"team-list-item__indicator--active":"team-list-item__indicator--inactive"}`}),r=e.isNameEditable?Pk(e.team.name,e.onNameChange):x("div",{textContent:e.team.name,className:`team-list-item__name ${e.isActive?"team-list-item__name--active":"team-list-item__name--inactive"}`}),o=x("div",{className:"team-list-item__sprites"});function a(){const l=le.myPets.get();o.innerHTML="";for(let d=0;d<3;d++){const c=e.team.petIds[d],u=c&&c!=="",p=x("div",{className:`team-list-item__sprite-slot ${e.showSlotStyles&&!u?"team-list-item__sprite-slot--empty":""}`});if(e.onSlotClick&&(p.style.cursor="pointer",p.addEventListener("click",()=>{e.onSlotClick(d);})),u){let f=l.all.find(g=>g.id===c);if(!f){const g=window.__petDataCache;g&&g.has(c)&&(f=g.get(c));}if(f)try{const g=j.toCanvas("pet",f.petSpecies,{mutations:f.mutations,scale:1}),h=document.createElement("canvas");h.width=g.width,h.height=g.height;const m=h.getContext("2d");if(m&&m.drawImage(g,0,0),h.style.width="100%",h.style.height="100%",h.style.objectFit="contain",p.appendChild(h),e.showSlotStyles){const b=x("div",{className:"team-list-item__sprite-slot-overlay"});p.appendChild(b),p.classList.add("team-list-item__sprite-slot--filled");}}catch(g){console.warn(`[TeamListItem] Failed to render sprite for pet ${f.petSpecies}:`,g);const h=x("div",{textContent:"🐾",className:"team-list-item__sprite-placeholder"});p.appendChild(h);}else {const g=x("div",{textContent:"⏳",className:"team-list-item__sprite-placeholder"});p.appendChild(g),console.warn(`[TeamListItem] Pet ${c} not found in myPets yet, waiting for update`);let h=false;const m=le.myPets.subscribe(()=>{if(h)return;const y=le.myPets.get().all.find(w=>w.id===c);if(y){h=true,m();try{p.innerHTML="";const w=j.toCanvas("pet",y.petSpecies,{mutations:y.mutations,scale:1}),S=document.createElement("canvas");S.width=w.width,S.height=w.height;const T=S.getContext("2d");if(T&&T.drawImage(w,0,0),S.style.width="100%",S.style.height="100%",S.style.objectFit="contain",p.appendChild(S),e.showSlotStyles){const v=x("div",{className:"team-list-item__sprite-slot-overlay"});p.appendChild(v),p.classList.add("team-list-item__sprite-slot--filled");}console.log(`[TeamListItem] Pet ${c} sprite updated`);}catch(w){console.warn(`[TeamListItem] Failed to render sprite for pet ${y.petSpecies}:`,w),p.innerHTML="<div class='team-list-item__sprite-placeholder'>🐾</div>";}}},{immediate:false});}}else if(e.showSlotStyles&&!u){const f=Ak();p.appendChild(f);}o.appendChild(p);}}a();const i=le.myPets.subscribe(()=>{a();});if(!e.hideDragHandle){const l=x("div",{textContent:"⋮⋮",className:"team-list-item__drag-handle"});t.appendChild(l);}if(t.appendChild(n),t.appendChild(r),t.appendChild(o),e.onExpandClick){const l=x("button",{className:`team-list-item__expand ${e.isExpanded?"team-list-item__expand--open":""}`});l.innerHTML='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>',l.addEventListener("click",d=>{d.stopPropagation(),e.onExpandClick?.();}),t.appendChild(l);}const s=new MutationObserver(()=>{document.contains(t)||(s.disconnect(),i());});return s.observe(document.body,{childList:true,subtree:true}),t}function Ek(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function lg(e){const{segments:t,selected:n=t[0]?.id??"",size:r="md",fullWidth:o=false,disabled:a=false,onChange:i}=e,s=x("div",{className:"sg-root"});r!=="md"&&s.classList.add(`sg--${r}`),o&&(s.style.width="100%");const l=x("div",{className:"sg-container",role:"tablist"}),d=x("div",{className:"sg-indicator"}),c=t.map(v=>{const C=x("button",{className:"sg-btn",type:"button",role:"tab","aria-selected":"false",title:v.label});if(C.id=v.id,v.icon){const k=x("span",{className:"sg-icon"}),A=Ek(v.icon);A&&k.appendChild(A),C.appendChild(k);}const I=x("span",{className:"sg-label"},v.label);return C.appendChild(I),C.disabled=!!v.disabled,C});l.appendChild(d),c.forEach(v=>l.appendChild(v)),s.appendChild(l);let u=n,p=a;function f(){const v=c.find(C=>C.id===u);v&&requestAnimationFrame(()=>{const C=d,I=v.offsetLeft,k=v.offsetWidth;C.style.width=`${k}px`,C.style.transform=`translateX(${I}px)`;});}function g(){c.forEach(v=>{const C=v.id===u;v.classList.toggle("active",C),v.setAttribute("aria-selected",String(C)),v.disabled=p||!!t.find(I=>I.id===v.id)?.disabled;}),f();}function h(v){const C=v.currentTarget;if(C.disabled)return;b(C.id);}function m(v){if(p)return;const C=c.findIndex(k=>k.id===u);let I=C;if(v.key==="ArrowLeft"||v.key==="ArrowUp"?(v.preventDefault(),I=(C-1+c.length)%c.length):v.key==="ArrowRight"||v.key==="ArrowDown"?(v.preventDefault(),I=(C+1)%c.length):v.key==="Home"?(v.preventDefault(),I=0):v.key==="End"&&(v.preventDefault(),I=c.length-1),I!==C){const k=c[I];k&&!k.disabled&&(b(k.id),k.focus());}}c.forEach(v=>{v.addEventListener("click",h),v.addEventListener("keydown",m);});function b(v){!t.some(I=>I.id===v)||u===v||(u=v,g(),i?.(u));}function y(){return u}function w(v){p=!!v,g();}function S(){c.forEach(v=>{v.removeEventListener("click",h),v.removeEventListener("keydown",m);});}g(),queueMicrotask(()=>{const v=c.find(C=>C.id===u);if(v){const C=d;C.style.width=`${v.offsetWidth}px`,C.style.transform=`translateX(${v.offsetLeft}px)`;}});const T=s;return T.select=b,T.getSelected=y,T.setDisabled=w,T.destroy=S,T}function Mk(e={}){const{id:t,checked:n=false,disabled:r=false,size:o="md",label:a,labelSide:i="right",onChange:s}=e,l=x("div",{className:"lg-checkbox-wrap"}),d=x("input",{className:`lg-checkbox lg-checkbox--${o}`,id:t,type:"checkbox",checked:!!n,disabled:!!r});let c=null;a&&i!=="none"&&(c=x("label",{className:"lg-checkbox-label",htmlFor:t},a)),c&&i==="left"?l.append(c,d):c&&i==="right"?l.append(d,c):l.append(d);let u=!!n,p=!!r;function f(){d.checked=u,d.disabled=p;}function g(C=false){p||(u=!u,f(),C||s?.(u));}function h(){p||g();}function m(C){p||(C.key===" "||C.key==="Enter")&&(C.preventDefault(),g());}d.addEventListener("click",h),d.addEventListener("keydown",m);function b(){return u}function y(C,I=false){u=!!C,f(),I||s?.(u);}function w(C){p=!!C,f();}function S(C){if(!C){c&&(c.remove(),c=null);return}c?c.textContent=C:(c=x("label",{className:"lg-checkbox-label",htmlFor:t},C),l.append(c));}function T(){d.focus();}function v(){d.removeEventListener("click",h),d.removeEventListener("keydown",m);}return f(),{root:l,input:d,isChecked:b,setChecked:y,setDisabled:w,setLabel:S,focus:T,destroy:v}}let tr=0,Jc="",Qc="";function Rk(){return tr===0&&(Jc=document.body.style.overflow,Qc=document.body.style.touchAction,document.body.style.overflow="hidden",document.body.style.touchAction="none"),tr++,()=>{tr=Math.max(0,tr-1),tr===0&&(document.body.style.overflow=Jc,document.body.style.touchAction=Qc);}}class Lk{constructor(t){R(this,"dragState",null);R(this,"longPressState",null);R(this,"options");R(this,"onPointerMove");R(this,"onPointerUp");R(this,"onPointerCancel");R(this,"onLongPressPointerMove");R(this,"onLongPressPointerUp");this.options=t,this.onPointerMove=this.handlePointerMove.bind(this),this.onPointerUp=this.handlePointerUp.bind(this),this.onPointerCancel=this.handlePointerCancel.bind(this),this.onLongPressPointerMove=this.handleLongPressPointerMove.bind(this),this.onLongPressPointerUp=this.handleLongPressPointerUp.bind(this);}startLongPress(t,n,r){if(this.cleanupLongPress(),ae.getAllTeams().findIndex(d=>d.id===r)===-1)return;const i=t.clientX,s=t.clientY,l=window.setTimeout(()=>{this.longPressState&&this.startDrag(t,n,r);},500);this.longPressState={pointerId:t.pointerId,startX:i,startY:s,timeout:l,target:n},window.addEventListener("pointermove",this.onLongPressPointerMove,{passive:false}),window.addEventListener("pointerup",this.onLongPressPointerUp,{passive:false});}startDrag(t,n,r){const o=this.options.getListContainer();if(this.dragState||!o)return;t.preventDefault();const i=ae.getAllTeams().findIndex(p=>p.id===r);if(i===-1)return;const s=n.getBoundingClientRect(),l=o.getBoundingClientRect(),d=n.cloneNode(true);d.classList.add("team-list-item--placeholder"),d.classList.remove("team-list-item--dragging");const c=n.style.touchAction;n.style.touchAction="none";const u=Rk();if(this.dragState={itemEl:n,pointerId:t.pointerId,placeholder:d,offsetY:t.clientY-s.top,fromIndex:i,teamId:r,captureTarget:n,touchActionPrev:c,releaseScrollLock:u},n.classList.add("team-list-item--dragging"),n.style.width=`${s.width}px`,n.style.height=`${s.height}px`,n.style.left=`${s.left-l.left}px`,n.style.top=`${s.top-l.top}px`,n.style.position="absolute",n.style.zIndex="30",n.style.pointerEvents="none",o.style.position||(o.style.position="relative"),o.insertBefore(d,n.nextSibling),o.classList.add("is-reordering"),n.setPointerCapture)try{n.setPointerCapture(t.pointerId);}catch{}window.addEventListener("pointermove",this.onPointerMove,{passive:false}),window.addEventListener("pointerup",this.onPointerUp,{passive:false}),window.addEventListener("pointercancel",this.onPointerCancel,{passive:false});}cleanup(){this.cleanupDrag(),this.cleanupLongPress();}handleLongPressPointerMove(t){if(!this.longPressState||t.pointerId!==this.longPressState.pointerId)return;const n=Math.abs(t.clientX-this.longPressState.startX),r=Math.abs(t.clientY-this.longPressState.startY),o=10;(n>o||r>o)&&this.cleanupLongPress();}handleLongPressPointerUp(t){!this.longPressState||t.pointerId!==this.longPressState.pointerId||this.cleanupLongPress();}handlePointerMove(t){const n=this.options.getListContainer();if(!this.dragState||!n||t.pointerId!==this.dragState.pointerId)return;t.preventDefault();const r=n.getBoundingClientRect();let o=t.clientY-r.top-this.dragState.offsetY;const a=r.height-this.dragState.itemEl.offsetHeight;Number.isFinite(a)&&(o=Math.max(-8,Math.min(a+8,o))),this.dragState.itemEl.style.top=`${o}px`,this.updatePlaceholderPosition(t.clientY);}handlePointerUp(t){!this.dragState||t.pointerId!==this.dragState.pointerId||(t.preventDefault(),this.finishDrag());}handlePointerCancel(t){!this.dragState||t.pointerId!==this.dragState.pointerId||this.finishDrag({revert:true});}updatePlaceholderPosition(t){const n=this.options.getListContainer();if(!this.dragState||!n)return;const{placeholder:r,itemEl:o}=this.dragState,a=Array.from(n.children).filter(l=>l!==o&&l!==r&&l instanceof HTMLElement&&l.classList.contains("team-list-item")),i=new Map;a.forEach(l=>{i.set(l,l.getBoundingClientRect().top);});let s=false;for(const l of a){const d=l.getBoundingClientRect(),c=d.top+d.height/2;if(t<c){r.nextSibling!==l&&n.insertBefore(r,l),s=true;break}}s||n.appendChild(r),a.forEach(l=>{const d=i.get(l),c=l.getBoundingClientRect().top;if(d!==void 0&&d!==c){const u=d-c;l.style.transform=`translateY(${u}px)`,l.style.transition="none",l.offsetHeight,l.style.transition="transform 0.14s ease",l.style.transform="translateY(0)";}});}finishDrag(t={}){const n=this.options.getListContainer();if(!this.dragState||!n)return;const{revert:r=false}=t,{itemEl:o,placeholder:a,fromIndex:i,touchActionPrev:s,releaseScrollLock:l,pointerId:d}=this.dragState;if(n.classList.remove("is-reordering"),o.hasPointerCapture(d))try{o.releasePointerCapture(d);}catch{}if(window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),window.removeEventListener("pointercancel",this.onPointerCancel),r){const p=Array.from(n.children).filter(f=>f!==o&&f!==a&&f instanceof HTMLElement&&f.classList.contains("team-list-item"))[i]||null;p?n.insertBefore(a,p):n.appendChild(a);}else {const u=Array.from(n.children).filter(f=>f!==o),p=u.indexOf(a);if(p!==-1){const f=u[p];f!==a&&n.insertBefore(a,f);}}if(a.replaceWith(o),a.remove(),o.classList.remove("team-list-item--dragging"),o.style.width="",o.style.height="",o.style.left="",o.style.top="",o.style.position="",o.style.zIndex="",o.style.pointerEvents="",o.style.touchAction=s??"",Array.from(n.children).filter(u=>u instanceof HTMLElement&&u.classList.contains("team-list-item")).forEach(u=>{u.style.transform="",u.style.transition="";}),l?.(),!r){const p=Array.from(n.children).filter(f=>f instanceof HTMLElement&&f.classList.contains("team-list-item")).indexOf(o);if(p!==-1&&p!==i){const g=ae.getAllTeams().slice(),[h]=g.splice(i,1);g.splice(p,0,h);const m=g.map(b=>b.id);ae.reorderTeams(m),this.options.onReorder(m);}}this.dragState=null;}cleanupDrag(){this.dragState&&(window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),window.removeEventListener("pointercancel",this.onPointerCancel),this.dragState=null);}cleanupLongPress(){this.longPressState&&(window.clearTimeout(this.longPressState.timeout),window.removeEventListener("pointermove",this.onLongPressPointerMove),window.removeEventListener("pointerup",this.onLongPressPointerUp),this.longPressState=null);}}class Nk{constructor(t={}){R(this,"card",null);R(this,"modeControl",null);R(this,"modeContainer",null);R(this,"teamContent",null);R(this,"listContainer",null);R(this,"teamMode","overview");R(this,"selectedTeamIds",new Set);R(this,"teamCheckboxes",new Map);R(this,"options");R(this,"dragHandler");this.options=t,this.dragHandler=new Lk({getListContainer:()=>this.listContainer,onReorder:n=>{this.options.onTeamReordered?.(n),this.options.onTeamsUpdated?.();}});}build(){return this.card?this.card:this.createTeamCard()}destroy(){this.dragHandler.cleanup(),this.modeControl&&(this.modeControl.destroy(),this.modeControl=null),this.teamCheckboxes.forEach(t=>t.destroy()),this.teamCheckboxes.clear(),this.selectedTeamIds.clear(),this.card=null,this.modeContainer=null,this.teamContent=null,this.listContainer=null;}render(){if(!this.card)return;if(!ae.isEnabled()){this.renderDisabledState();return}this.modeContainer&&(this.modeContainer.style.display="flex"),this.ensureModeControl(),this.renderTeamContent();}createTeamCard(){const t=x("div",{className:"team-card-wrapper"});this.modeContainer=x("div",{className:"team-card__mode-container"}),t.appendChild(this.modeContainer),this.teamContent=x("div",{className:"team-card__content"}),t.appendChild(this.teamContent);const n=We({title:"Team",subtitle:"Organize and switch between pet teams",expandable:true,defaultExpanded:true},t);return this.card=n,n}ensureModeControl(){if(this.modeContainer){if(!this.modeControl){this.modeControl=lg({segments:[{id:"overview",label:"Overview"},{id:"manage",label:"Manage"}],selected:this.teamMode,onChange:t=>{this.teamMode=t,this.renderTeamContent();}}),this.modeContainer.appendChild(this.modeControl);return}this.modeControl.getSelected()!==this.teamMode&&this.modeControl.select(this.teamMode);}}renderDisabledState(){if(!this.teamContent)return;this.dragHandler.cleanup(),this.listContainer=null,this.modeContainer&&(this.modeContainer.style.display="none");const t=x("div",{className:"team-card__disabled-state"}),n=x("div",{textContent:"Pet Team feature is disabled",className:"team-card__disabled-message"}),r=qt({label:"Enable Feature",onClick:()=>{ae.setEnabled(true),this.render();}});t.appendChild(n),t.appendChild(r),this.teamContent.replaceChildren(t);}renderTeamContent(){if(!this.teamContent)return;this.dragHandler.cleanup(),this.listContainer=null,this.teamContent.replaceChildren(),this.teamCheckboxes.forEach(r=>r.destroy()),this.teamCheckboxes.clear(),this.selectedTeamIds.clear();const t=ae.getAllTeams(),n=ae.getActiveTeamId();if(t.length===0){this.renderEmptyState();return}this.listContainer=x("div",{className:"team-card__list-container"}),t.forEach(r=>{const o=n===r.id;let a;this.teamMode==="manage"&&(a=this.createCheckboxIndicator(r.id));const i=sg({team:r,isActive:o,customIndicator:a?.root,hideDragHandle:this.teamMode==="manage",isNameEditable:this.teamMode==="manage",showSlotStyles:this.teamMode==="manage",onNameChange:s=>{this.handleRenameTeam(r.id,s);},onSlotClick:this.teamMode==="manage"?s=>{this.handleRemovePet(r.id,s);}:void 0});this.teamMode==="manage"&&i.classList.add("team-list-item--manage"),this.teamMode==="overview"&&(i.addEventListener("click",async s=>{if(!s.target.closest(".team-list-item__drag-handle")){i.classList.add("team-list-item--clicked"),setTimeout(()=>{i.classList.remove("team-list-item--clicked");},300);try{await ae.activateTeam(r),this.options.onTeamsUpdated?.();}catch(d){console.error("[TeamCard] Failed to activate team:",d);}}}),i.addEventListener("pointerdown",s=>{if(s.button!==0)return;s.target.closest(".team-list-item__drag-handle")?this.dragHandler.startDrag(s,i,r.id):this.dragHandler.startLongPress(s,i,r.id);})),this.listContainer.appendChild(i);}),this.teamContent.appendChild(this.listContainer),this.teamMode==="manage"&&this.renderManageActions();}renderEmptyState(){if(!this.teamContent)return;const t=x("div",{textContent:"No teams yet. Create your first team!",className:"team-card__empty-state"});if(this.teamContent.appendChild(t),this.teamMode==="manage"){const n=x("div",{className:"team-card__actions"}),r=qt({label:"New Team",variant:"primary",onClick:()=>{this.handleCreateTeam();}});n.appendChild(r),this.teamContent.appendChild(n);}}renderManageActions(){if(!this.teamContent)return;const t=x("div",{className:"team-card__actions"}),n=qt({label:"New Team",variant:"primary",onClick:()=>{this.handleCreateTeam();}}),r=qt({label:"Delete Team",variant:"danger",disabled:this.selectedTeamIds.size===0,onClick:()=>{this.handleDeleteTeam();}});r.setAttribute("data-action","delete-team"),t.appendChild(n),t.appendChild(r),this.teamContent.appendChild(t);}handleCreateTeam(){const t="New Team";let n=t,r=1;const o=ae.getAllTeams(),a=new Set(o.map(i=>i.name));for(;a.has(n);)n=`${t} (${r})`,r++;try{ae.createTeam(n,[])&&(this.render(),this.options.onTeamsUpdated?.());}catch{}}handleDeleteTeam(){if(this.selectedTeamIds.size===0)return;const t=Array.from(this.selectedTeamIds);for(const n of t)ae.deleteTeam(n);this.render(),this.options.onTeamsUpdated?.();}handleRenameTeam(t,n){ae.renameTeam(t,n),this.options.onTeamsUpdated?.();}handleRemovePet(t,n){const r=ae.getTeam(t);if(!r)return;const o=r.petIds[n];!o||o===""?this.handleAddPet(t,n):this.handleRemovePetFromSlot(t,n);}handleRemovePetFromSlot(t,n){const r=ae.getTeam(t);if(!r)return;const o=[...r.petIds];o[n]="",ae.updateTeam(t,{petIds:o}),this.render(),this.options.onTeamsUpdated?.();}async handleAddPet(t,n){const r=ae.getTeam(t);if(!r)return;const a=le.myPets.get().all.map(f=>({id:f.id,itemType:"Pet",petSpecies:f.petSpecies,name:f.name??null,xp:f.xp,hunger:f.hunger,mutations:f.mutations||[],targetScale:f.targetScale,abilities:f.abilities||[]})),i=new Set(r.petIds.filter(f=>f!=="")),s=a.filter(f=>!i.has(f.id));await ge.set("myPossiblyNoLongerValidSelectedItemIndexAtom",null);const l=Ve.detect();(l.platform==="mobile"||l.viewportWidth<768)&&this.options.setHUDOpen&&this.options.setHUDOpen(false);const c=le.myInventory.subscribeSelection(f=>{if(f.current&&f.current.item){const g=f.current.item,h=[...r.petIds];h[n]=g.id,ae.updateTeam(t,{petIds:h}),this.options.onTeamsUpdated?.(),ge.set("myPossiblyNoLongerValidSelectedItemIndexAtom",null),Sn.close().then(()=>{const m=Ve.detect();(m.platform==="mobile"||m.viewportWidth<768)&&this.options.setHUDOpen&&this.options.setHUDOpen(true),this.render(),this.options.onTeamsUpdated?.();});}});await Sn.show("inventory",{items:s,favoritedItemIds:[]}),await Sn.waitForClose();const u=Ve.detect();(u.platform==="mobile"||u.viewportWidth<768)&&this.options.setHUDOpen&&this.options.setHUDOpen(true),c();}createCheckboxIndicator(t){const n=Mk({checked:this.selectedTeamIds.has(t),size:"md",onChange:r=>{r?this.selectedTeamIds.add(t):this.selectedTeamIds.delete(t),this.updateDeleteButtonState();}});return this.teamCheckboxes.set(t,n),n}updateDeleteButtonState(){const t=this.teamContent?.querySelector('[data-action="delete-team"]');t&&(t.disabled=this.selectedTeamIds.size===0);}}class Fk{constructor(t,n={}){R(this,"root");R(this,"pet");R(this,"options");R(this,"contentSlot",null);R(this,"isBuilt",false);this.pet=t,this.options=n,this.root=document.createElement("div"),this.root.className="base-pet-card",n.className&&this.root.classList.add(n.className);}build(){if(this.isBuilt)return this.root;this.updateStateClasses();const t=document.createElement("div");t.className="base-pet-card__left";const n=document.createElement("div");n.className="base-pet-card__sprite-wrapper",this.renderSprite(n),t.appendChild(n);const r=document.createElement("div");r.className="base-pet-card__info";const o=document.createElement("div");if(o.className="base-pet-card__name",o.textContent=this.pet.name||this.pet.petSpecies,r.appendChild(o),!this.options.hideStr){const a=document.createElement("div");a.className="base-pet-card__str",this.renderStr(a),r.appendChild(a);}return t.appendChild(r),this.root.appendChild(t),this.contentSlot=document.createElement("div"),this.contentSlot.className="base-pet-card__content",this.root.appendChild(this.contentSlot),this.options.onClick&&(this.root.style.cursor="pointer",this.root.addEventListener("click",()=>this.options.onClick?.(this.pet))),this.isBuilt=true,this.root}getContentSlot(){if(!this.contentSlot)throw new Error("BasePetCard must be built before getting slot");return this.contentSlot}update(t){if(this.pet=t,!this.isBuilt)return;this.updateStateClasses();const n=this.root.querySelector(".base-pet-card__name");n&&(n.textContent=t.name||t.petSpecies);const r=this.root.querySelector(".base-pet-card__str");r&&this.renderStr(r);const o=this.root.querySelector(".base-pet-card__sprite-wrapper");o instanceof HTMLElement&&this.renderSprite(o);}updateStateClasses(){this.root.classList.toggle("base-pet-card--max",this.pet.currentStrength>=this.pet.maxStrength),this.root.classList.toggle("base-pet-card--starving",(this.pet.hunger||0)===0);}renderStr(t){const r=this.pet.currentStrength>=this.pet.maxStrength?`MAX ${this.pet.maxStrength}`:`STR ${this.pet.currentStrength}/${this.pet.maxStrength}`;t.innerHTML="";const o=to({label:r,type:"neutral",tone:"soft",size:"sm",pill:true});t.appendChild(o.root);}setCentered(t){this.root.classList.toggle("base-pet-card--centered",t);}renderSprite(t){t.innerHTML="";try{const n=this.pet.mutations||[];if(j.has("pet",this.pet.petSpecies)){const r=j.toCanvas("pet",this.pet.petSpecies,{mutations:n,scale:1,boundsMode:"padded"});r.style.width="64px",r.style.height="64px",r.style.objectFit="contain",t.appendChild(r);}else t.innerHTML='<div class="base-pet-card__sprite-fallback">🐾</div>';}catch{t.innerHTML='<div class="base-pet-card__sprite-fallback">🐾</div>';}}destroy(){this.root.remove(),this.contentSlot=null,this.isBuilt=false;}}const Ie={XP:{BOOST_PAIR:.85,LEVELING_PAIR:.75,PASSIVE_LEVELING:.5,STR_DISTANCE_THRESHOLD:.15},ECONOMY:{DEDICATED_COIN:.9,META_SELLING:.85,PASSIVE_EFFICIENCY:.65,ENDGAME_HARVEST:.95,SYNERGY_BONUS:.1,EARLY_REGROW:.7},HATCHING:{TIER_3_MAX_STR:.95,RAINBOW_HUNTING:.7,COMBO_BONUS:.05},TIER_BONUS:.05,CONFIDENCE_THRESHOLD:.6},U={XP_BOOST:["PetXpBoost","PetXpBoostII","PetXpBoostIII","SnowyPetXpBoost"],COIN_FINDER:["CoinFinderI","CoinFinderII","CoinFinderIII","SnowyCoinFinder"],SELL_BOOST:["SellBoostI","SellBoostII","SellBoostIII","SellBoostIV"],CROP_REFUND_HARVEST:["ProduceRefund","DoubleHarvest"],PLANT_GROWTH:["PlantGrowthBoost","PlantGrowthBoostII","PlantGrowthBoostIII","SnowyPlantGrowthBoost"],CROP_SIZE:["ProduceScaleBoost","ProduceScaleBoostII","ProduceScaleBoostIII","SnowyCropSizeBoost"],CROP_MUTATION:["ProduceMutationBoost","ProduceMutationBoostII","ProduceMutationBoostIII","SnowyCropMutationBoost"],EGG_GROWTH:["EggGrowthBoost","EggGrowthBoostII_NEW","EggGrowthBoostII","SnowyEggGrowthBoost"],HUNGER_BOOST:["HungerBoost","HungerBoostII","HungerBoostIII","SnowyHungerBoost"],HUNGER_RESTORE:["HungerRestore","HungerRestoreII","HungerRestoreIII","SnowyHungerRestore"],RARE_GRANTERS:["FrostGranter","GoldGranter","RainbowGranter"],COMMON_GRANTERS:["RainDance","SnowGranter"],MAX_STR_BOOST:["PetHatchSizeBoost","PetHatchSizeBoostII","PetHatchSizeBoostIII"],HATCH_XP:["PetAgeBoost","PetAgeBoostII","PetAgeBoostIII"],PET_MUTATION:["PetMutationBoost","PetMutationBoostII","PetMutationBoostIII"],DOUBLE_HATCH:["DoubleHatch"],PET_REFUND:["PetRefund","PetRefundII"]},Ka={ALLOWED_PANELS:{"xp-farming":["xp"],"coin-farming":["coin","xp","hatch"],"crop-farming":["growth","coin","xp","hatch"],"time-reduction":["growth","xp"],"mutation-hunting":["growth","coin","xp"],hatching:["hatch","xp"],efficiency:["xp"],balanced:["xp","growth","coin","hatch"],unknown:["xp","growth","coin","hatch"]}};function De(e,t){return e.abilities.some(n=>t.includes(n))}function Re(e,t){return e.filter(n=>De(n,t)).length}function Ok(e){return e.includes("IV")?4:e.includes("III")||e==="EggGrowthBoostII"?3:e.includes("II")||e.includes("_NEW")?2:1}function nr(e,t){const n=e.flatMap(r=>r.abilities.filter(o=>t.includes(o))).map(Ok);return n.length===0?0:n.reduce((r,o)=>r+o,0)/n.length}function No(e){const t=sf(e);if(t.length===0)return {primary:"unknown",confidence:0,secondary:[],suggestedFeatures:[],reasons:["Team has no pets"]};const n=[],r={},o=Re(t,U.XP_BOOST),a=Ie.XP.STR_DISTANCE_THRESHOLD,s=t.filter(P=>P.maxStrength===0?false:(P.maxStrength-P.currentStrength)/P.maxStrength>a).length,l=t.filter(P=>P.currentStrength<P.maxStrength).length;if(o>=1&&s>=2)r["xp-farming"]=Ie.XP.BOOST_PAIR,n.push(`1 XP Boost + ${s} high-need pets (>${a*100}% STR distance)`);else if(o>=2){const P=nr(t,U.XP_BOOST);r["xp-farming"]=Ie.XP.LEVELING_PAIR+P*Ie.TIER_BONUS,n.push(`${o} XP Boost pets (avg tier ${P.toFixed(1)})`);}else l>=2&&s>=1?(r["xp-farming"]=Ie.XP.LEVELING_PAIR,n.push(`${l} leveling pets with ${s} high-need`)):l>=2&&(r["xp-farming"]=Ie.XP.PASSIVE_LEVELING,n.push(`${l} pets below max STR`));const d=Re(t,U.COIN_FINDER),c=Re(t,U.SELL_BOOST),u=Re(t,U.CROP_REFUND_HARVEST),p=Re(t,U.RARE_GRANTERS),f=Re(t,U.COMMON_GRANTERS),g=t.some(P=>De(P,U.COIN_FINDER)&&(De(P,U.RARE_GRANTERS)||De(P,U.COMMON_GRANTERS)));d>=1&&!g?(r["coin-farming"]=Ie.ECONOMY.DEDICATED_COIN,n.push("Dedicated Coin Finder team (no granters)")):c>=1&&u>=1?(r["coin-farming"]=Ie.ECONOMY.META_SELLING,n.push("Meta Selling Team (Sell Boost + Crop Refund/Harvest)")):d>=1&&g?(r["coin-farming"]=Ie.ECONOMY.PASSIVE_EFFICIENCY,r.efficiency=Math.max(r.efficiency||0,Ie.ECONOMY.PASSIVE_EFFICIENCY),n.push("Coin Finder + Granter (passive efficiency)")):(c>=1||u>=1)&&(r["coin-farming"]=Math.max(r["coin-farming"]||0,.7),n.push("Sell/Refund abilities (coin efficiency)"));const h=Re(t,U.PLANT_GROWTH),m=Re(t,U.CROP_MUTATION),b=Re(t,U.CROP_SIZE),y=t.filter(P=>P.abilities.includes("DoubleHarvest")).length,w=t.filter(P=>P.abilities.includes("ProduceRefund")).length,S=t.some(P=>P.abilities.includes("DoubleHarvest")&&P.abilities.includes("ProduceRefund"));if(y>=3){let P=Ie.ECONOMY.ENDGAME_HARVEST;S&&(P+=Ie.ECONOMY.SYNERGY_BONUS),r["crop-farming"]=Math.max(r["crop-farming"]||0,P),n.push("Endgame Harvest Team (3x Double Harvest)"+(S?" + capybara synergy":""));}else if(y>=1&&w>=1){let P=.85;S&&(P+=Ie.ECONOMY.SYNERGY_BONUS),r["crop-farming"]=Math.max(r["crop-farming"]||0,P),n.push("Double Harvest + Crop Refund"+(S?" (same pet - capybara)":""));}else m>=1&&y===0&&(r["crop-farming"]=Math.max(r["crop-farming"]||0,Ie.ECONOMY.EARLY_REGROW),n.push("Early Game Regrow Team (Crop Mutation)"));if(p>=1){const P=t.some(F=>F.abilities.includes("RainbowGranter")),L=t.some(F=>F.abilities.includes("GoldGranter"));P?(r["crop-farming"]=Math.max(r["crop-farming"]||0,.95),n.push("Rainbow Granter (ultra-rare, intentional)")):L?(r["crop-farming"]=Math.max(r["crop-farming"]||0,.9),n.push("Gold Granter (ultra-rare)")):(r["crop-farming"]=Math.max(r["crop-farming"]||0,.75),n.push("Frost Granter (rare mutation)"));}const T=h+m+b+f;if(T>=2&&!r["crop-farming"]){const P=(nr(t,U.PLANT_GROWTH)+nr(t,U.CROP_MUTATION)+nr(t,U.CROP_SIZE))/3;r["crop-farming"]=Math.max(r["crop-farming"]||0,.7+P*.03),n.push(`${T} crop-related abilities`);}const v=Re(t,U.EGG_GROWTH);if(v>=1&&(r["time-reduction"]=.7,n.push(`${v} Egg Growth Boost pet(s)`)),h>=1&&!r["crop-farming"]&&(r["time-reduction"]=Math.max(r["time-reduction"]||0,.5),n.push("Plant Growth Boost (crop speed)")),p>=1||m>=1){const P=t.some(F=>F.abilities.includes("RainbowGranter")),L=t.some(F=>F.abilities.includes("GoldGranter"));P||L?(r["mutation-hunting"]=.95,n.push(`${P?"Rainbow":"Gold"} Granter (mutation focus)`)):m>=1&&(r["mutation-hunting"]=.8,n.push("Crop Mutation Boost (targeted hunting)"));}const C=Re(t,U.HUNGER_BOOST),I=Re(t,U.HUNGER_RESTORE);C>=1&&I>=1?(r.efficiency=.85,n.push("Hunger Boost + Hunger Restore (long-term setup)")):(C>=1||I>=1)&&(r.efficiency=.6,n.push("Hunger management (reduced feeding)"));const k=d+p+f;k>=2&&(r.efficiency=Math.max(r.efficiency||0,.6),n.push(`${k} passive abilities (passive gains)`));const A=Re(t,U.MAX_STR_BOOST),E=Re(t,U.HATCH_XP),B=Re(t,U.PET_MUTATION),J=Re(t,U.DOUBLE_HATCH),D=Re(t,U.PET_REFUND);if(A>=1){const P=nr(t,U.MAX_STR_BOOST),L=P>=3?Ie.HATCHING.TIER_3_MAX_STR:.85;r.hatching=L+P*Ie.TIER_BONUS,n.push(`Max Strength Boost (tier ${P.toFixed(1)}) - late-game meta`);}if(B>=1||J>=1||D>=1){const P=B+J+D,L=Ie.HATCHING.RAINBOW_HUNTING+P*Ie.HATCHING.COMBO_BONUS;r.hatching=Math.max(r.hatching||0,L),n.push(`${P} rainbow hunting abilities`);}E>=1&&!r.hatching&&(r.hatching=.5,n.push("Hatch XP Boost (early-game focus)"));const G=t.filter(P=>De(P,U.MAX_STR_BOOST)||De(P,U.PET_MUTATION)||De(P,U.DOUBLE_HATCH)||De(P,U.PET_REFUND)).length;G>=Math.ceil(t.length*.67)&&r.hatching&&(r.hatching=Math.max(r.hatching,.97),r["crop-farming"]&&r["crop-farming"]<.97&&t.filter(L=>(De(L,U.CROP_REFUND_HARVEST)||De(L,U.CROP_SIZE)||De(L,U.CROP_MUTATION))&&!De(L,U.PET_REFUND)&&!De(L,U.DOUBLE_HATCH)&&!De(L,U.PET_MUTATION)&&!De(L,U.MAX_STR_BOOST)).length===0&&(delete r["crop-farming"],n.push("Suppressed crop-farming (hatching majority override)")),n.push(`Hatching Majority (${G}/${t.length} pets) - clear team purpose`));const Y=Object.entries(r).sort(([,P],[,L])=>L-P);if(Y.length===0)return {primary:"balanced",confidence:.3,secondary:[],suggestedFeatures:["xp","growth","coin","hatch"],reasons:["Mixed or unclear purpose"]};const[O,H]=Y[0],z=Y.slice(1).map(([P,L])=>({purpose:P,confidence:L}));return H<Ie.CONFIDENCE_THRESHOLD?{primary:"balanced",confidence:H,secondary:Y.map(([P,L])=>({purpose:P,confidence:L})),suggestedFeatures:["xp","growth","coin","hatch"],reasons:[...n,`Low confidence (${(H*100).toFixed(0)}%) - showing all panels`]}:{primary:O,confidence:H,secondary:z,suggestedFeatures:{"xp-farming":["xp"],"coin-farming":["coin","growth","xp"],"crop-farming":["growth","coin","xp"],"time-reduction":["growth","xp"],"mutation-hunting":["growth","coin","xp"],efficiency:["xp"],hatching:["hatch","growth","xp"],balanced:["xp","growth","coin","hatch"],unknown:["xp","growth","coin","hatch"]}[O]||["xp","growth","coin","hatch"],reasons:n}}async function $k(){try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;const t=new e,n=t.currentTime,r=t.createOscillator(),o=t.createGain();r.connect(o),o.connect(t.destination),r.type="sine",r.frequency.setValueAtTime(800,n),r.frequency.exponentialRampToValueAtTime(400,n+.03),o.gain.setValueAtTime(.12,n),o.gain.exponentialRampToValueAtTime(.001,n+.05),r.start(n),r.stop(n+.05),setTimeout(()=>t.close(),100);}catch{}}function Bk(e={}){const{id:t,variant:n="default",size:r="md",round:o=false,sprite:a=null,onClick:i,disabled:s=false,playSound:l=true,tooltip:d}=e,c=x("button",{className:"gemini-icon-btn",id:t});c.type="button",n!=="default"&&c.classList.add(`gemini-icon-btn--${n}`),r!=="md"&&c.classList.add(`gemini-icon-btn--${r}`),o&&c.classList.add("gemini-icon-btn--round"),d&&(c.title=d),c.disabled=s;const u=x("span",{className:"gemini-icon-btn__content"});c.appendChild(u),a&&u.appendChild(a);const p=x("span",{className:"gemini-icon-btn__swap"});p.textContent="⇄",c.appendChild(p),c.addEventListener("click",async g=>{c.disabled||(l&&$k(),i?.(g));});const f=c;return f.setSprite=g=>{u.innerHTML="",g&&u.appendChild(g);},f.setVariant=g=>{c.classList.remove("gemini-icon-btn--default","gemini-icon-btn--plant","gemini-icon-btn--egg"),g!=="default"&&c.classList.add(`gemini-icon-btn--${g}`);},f.setDisabled=g=>{c.disabled=g;},f}const cg=`
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
`;class Dk{constructor(){R(this,"card",null);R(this,"listContainer",null);R(this,"innerContent",null);R(this,"logs",[]);R(this,"filteredLogs",[]);R(this,"unsubscribe",null);R(this,"ITEM_HEIGHT",88);R(this,"BUFFER_SIZE",3);R(this,"VIEWPORT_HEIGHT",480);R(this,"renderedRange",{start:0,end:0});R(this,"scrollListener",null);R(this,"scrollScheduled",false);}build(){return this.card?this.card:this.createAbilityLogsCard()}destroy(){this.scrollListener&&this.listContainer&&(this.listContainer.removeEventListener("scroll",this.scrollListener),this.scrollListener=null),this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null),this.card=null,this.listContainer=null,this.innerContent=null,this.logs=[],this.filteredLogs=[];}async render(){const t=Gn(),n=t.get().abilityLogs;this.updateFromAbilityLogs(n),this.unsubscribe=t.subscribeAbility(()=>{const r=t.get().abilityLogs;this.updateFromAbilityLogs(r);});}updateFromAbilityLogs(t){if(!t||!Array.isArray(t)){this.logs=[],this.filteredLogs=[],this.updateList();return}this.logs=t.map(n=>{const a=V.get("abilities")?.[n.abilityId]?.name||n.abilityId||"Unknown Ability",i={action:n.abilityId,timestamp:n.performedAt,parameters:n.data||{}},s=Fu(i),l=new Date(n.performedAt),d=l.toLocaleDateString("en-US",{month:"short",day:"numeric"}),c=l.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}),u=`${d} ${c}`;return {timestamp:n.performedAt,petName:n.petName,petSpecies:n.petSpecies,abilityName:a,abilityId:n.abilityId,description:s,formattedDate:u}}),this.filteredLogs=[...this.logs],this.updateList();}createAbilityBadge(t,n){return to({variant:"ability",abilityId:t,abilityName:n}).root}createAbilityLogsCard(){const t=x("div",{className:"ability-logs-container",style:"display: flex; flex-direction: column; gap: 12px;"}),n=x("div",{style:"margin-bottom: 0;"}),r=Ta({placeholder:"Search logs...",value:"",debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:o=>{const a=o.trim().toLowerCase();a?this.filteredLogs=this.logs.filter(i=>i.petName.toLowerCase().includes(a)||i.petSpecies.toLowerCase().includes(a)||i.abilityName.toLowerCase().includes(a)||i.description.toLowerCase().includes(a)):this.filteredLogs=[...this.logs],this.updateList();}});return n.appendChild(r.root),t.appendChild(n),this.listContainer=x("div",{className:"ability-logs-list",style:"max-height: 480px; overflow-y: auto; overflow-x: hidden; position: relative;"}),this.innerContent=x("div",{style:"display: flex; flex-direction: column; gap: 8px; position: relative;"}),this.listContainer.appendChild(this.innerContent),this.scrollListener=()=>{this.scrollScheduled||(this.scrollScheduled=true,requestAnimationFrame(()=>{this.handleScroll(),this.scrollScheduled=false;}));},this.listContainer.addEventListener("scroll",this.scrollListener),t.appendChild(this.listContainer),this.card=We({title:"Ability Logs",subtitle:"Track all pet ability activations",expandable:true,defaultExpanded:true},t),this.card}updateList(){if(!this.listContainer||!this.innerContent)return;this.innerContent.replaceChildren(),this.renderedRange={start:0,end:0};const t=[...this.filteredLogs].sort((n,r)=>r.timestamp-n.timestamp);if(t.length===0){const n=x("div",{className:"ability-logs-empty",style:"padding: 24px; text-align: center; color: color-mix(in oklab, var(--fg) 60%, #9ca3af); font-size: 14px;"},"No ability logs yet");this.innerContent.appendChild(n);return}this.filteredLogs=t,this.listContainer.scrollTop=0,this.handleScroll();}handleScroll(){if(!this.listContainer||!this.innerContent)return;const t=this.listContainer.scrollTop,n=Math.ceil(this.VIEWPORT_HEIGHT/this.ITEM_HEIGHT);let r=Math.max(0,Math.floor(t/this.ITEM_HEIGHT)-this.BUFFER_SIZE),o=Math.min(this.filteredLogs.length,r+n+this.BUFFER_SIZE*2);if(r===this.renderedRange.start&&o===this.renderedRange.end)return;this.renderedRange={start:r,end:o},this.innerContent.replaceChildren();const a=r*this.ITEM_HEIGHT;if(a>0){const s=x("div",{style:`height: ${a}px; flex-shrink: 0;`});this.innerContent.appendChild(s);}for(let s=r;s<o;s++){const l=this.filteredLogs[s],d=this.createLogItemCard(l);this.innerContent.appendChild(d);}const i=Math.max(0,(this.filteredLogs.length-o)*this.ITEM_HEIGHT);if(i>0){const s=x("div",{style:`height: ${i}px; flex-shrink: 0;`});this.innerContent.appendChild(s);}}createLogItemCard(t){const n=x("div",{className:"ability-log-item",style:"background: var(--soft); border: 1px solid var(--border); border-radius: 8px; padding: 12px; display: flex; gap: 12px; align-items: center; transition: all 0.2s ease;"});n.addEventListener("pointerenter",function(){this.style.background="color-mix(in oklab, var(--soft) 90%, var(--fg) 10%)",this.style.borderColor="color-mix(in oklab, var(--border) 70%, var(--fg) 30%)";}),n.addEventListener("pointerleave",function(){this.style.background="var(--soft)",this.style.borderColor="var(--border)";});const r=x("div",{style:"width: 40px; height: 40px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: var(--muted); border-radius: 6px;"});try{const c=j.toCanvas("pet",t.petSpecies);c&&(c.style.width="100%",c.style.height="100%",c.style.objectFit="contain",r.appendChild(c));}catch{r.textContent="🐾",r.style.fontSize="24px";}n.appendChild(r);const o=x("div",{style:"flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px;"}),a=x("div",{style:"display: flex; align-items: center; justify-content: space-between; gap: 8px;"}),i=x("div",{style:"font-size: 14px; font-weight: 700; color: var(--fg); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"},t.petName),s=x("div",{style:"font-size: 11px; font-weight: 500; color: color-mix(in oklab, var(--fg) 60%, #9ca3af); white-space: nowrap;"},t.formattedDate);a.appendChild(i),a.appendChild(s),o.appendChild(a);const l=this.createAbilityBadge(t.abilityId,t.abilityName);o.appendChild(l);const d=x("div",{style:"font-size: 12px; color: color-mix(in oklab, var(--fg) 70%, #9ca3af); line-height: 1.4; overflow: hidden; text-overflow: ellipsis;"},t.description);return o.appendChild(d),n.appendChild(o),n}}const dg=`
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

`,ug=`
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
`,Fl=`
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
`,pg=`
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
`,Gk=`
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
`;class zk extends sn{constructor(n){super({id:"tab-pets",label:"Pets"});R(this,"unsubscribeMyPets");R(this,"lastActiveTeamId",null);R(this,"teamCardPart",null);R(this,"abilityLogsCardPart",null);R(this,"deps");this.deps=n;}async build(n){this.container=n;const{MGSprite:r}=await Bn(async()=>{const{MGSprite:i}=await Promise.resolve().then(()=>dl);return {MGSprite:i}},void 0);await r.init();const o=n.getRootNode();ve(o,dg,"team-card-styles"),ve(o,ug,"base-pet-card-styles"),ve(o,Fl,"badge-styles"),ve(o,pg,"arcade-button-styles"),ve(o,cg,"gemini-icon-button-styles"),ve(o,Gk,"ability-logs-card-styles");const a=this.createGrid("12px");a.id="pets",n.appendChild(a),this.initializeTeamCardPart(a),this.initializeAbilityLogsCardPart(a),this.unsubscribeMyPets=le.myPets.subscribeStable(()=>{const i=ae.getActiveTeamId();i!==this.lastActiveTeamId&&(this.lastActiveTeamId=i,this.teamCardPart?.render());}),this.lastActiveTeamId=ae.getActiveTeamId();}async destroy(){this.unsubscribeMyPets&&(this.unsubscribeMyPets(),this.unsubscribeMyPets=void 0),this.teamCardPart&&(this.teamCardPart.destroy(),this.teamCardPart=null),this.abilityLogsCardPart&&(this.abilityLogsCardPart.destroy(),this.abilityLogsCardPart=null);}initializeTeamCardPart(n){this.teamCardPart||(this.teamCardPart=new Nk({onTeamReordered:o=>{console.log("[PetsSection] Teams reordered:",o);},setHUDOpen:this.deps?.setHUDOpen}));const r=this.teamCardPart.build();n.appendChild(r),this.teamCardPart.render();}initializeAbilityLogsCardPart(n){this.abilityLogsCardPart||(this.abilityLogsCardPart=new Dk);const r=this.abilityLogsCardPart.build();n.appendChild(r),this.abilityLogsCardPart.render();}}class Hk{constructor(t){R(this,"root");R(this,"options");R(this,"headerElement",null);R(this,"petsContainer",null);R(this,"footerElement",null);this.options=t,this.root=document.createElement("div"),this.root.className="xp-panel";}build(){return this.headerElement=document.createElement("div"),this.headerElement.className="xp-panel__header",this.root.appendChild(this.headerElement),this.petsContainer=document.createElement("div"),this.petsContainer.className="xp-panel__pets",this.root.appendChild(this.petsContainer),this.footerElement=document.createElement("div"),this.footerElement.className="xp-panel__footer",this.root.appendChild(this.footerElement),this.root}update(t){this.updateHeader(t.teamSummary),this.updatePets(t.pets),this.updateFooter(t.teamSummary,t.pets);}updateHeader(t){this.headerElement&&(t.bonusXpPerHour>0,this.headerElement.innerHTML=`
            <div class="xp-panel__header-title">
                <span class="xp-panel__header-icon">📊</span>
                <span>XP Tracker</span>
            </div>
            <div class="xp-panel__header-rate">
                <span class="xp-panel__rate-total">${t.totalXpPerHour.toLocaleString()} XP/hr</span>
            </div>
        `);}updatePets(t){if(this.petsContainer){this.petsContainer.innerHTML="";for(const n of t){const r=this.buildPetCard(n);this.petsContainer.appendChild(r);}}}buildPetCard(t){const n=document.createElement("div");n.className="xp-pet-card",t.isStarving&&n.classList.add("xp-pet-card--starving"),t.isMaxStrength&&n.classList.add("xp-pet-card--max");const r=document.createElement("div");r.className="xp-pet-card__sprite";const o=document.createElement("div");o.className="xp-pet-card__sprite-wrapper";try{const c=t.mutations;if(j.has("pet",t.species)){const u=j.toCanvas("pet",t.species,{mutations:c,scale:1,boundsMode:"padded"});u.style.width="64px",u.style.height="64px",u.style.objectFit="contain",u.style.display="block",o.appendChild(u);}else o.innerHTML='<div class="xp-pet-card__sprite-fallback">🐾</div>';}catch(c){console.warn(`[TeamXpPanel] Failed to render sprite for ${t.species}:`,c),o.innerHTML='<div class="xp-pet-card__sprite-fallback">🐾</div>';}r.appendChild(o);const a=document.createElement("div");if(a.className="xp-pet-card__badges",t.isMaxStrength&&(a.innerHTML+='<span class="xp-badge xp-badge--max">MAX</span>'),t.isStarving&&(a.innerHTML+='<span class="xp-badge xp-badge--starving">STARVING</span>'),t.xpBoostStats){const c=t.xpBoostStats.tier==="Snowy"?"❄":"⚡";a.innerHTML+=`<span class="xp-badge xp-badge--boost">${c}${t.xpBoostStats.tier}</span>`;}r.appendChild(a);const i=document.createElement("div");i.className="xp-pet-card__str-display",i.innerHTML=`
            <span class="xp-str__label">STR</span>
            <span class="xp-str__current">${t.currentStrength}</span>
            <span class="xp-str__separator">/</span>
            <span class="xp-str__max">${t.maxStrength}</span>
        `,r.appendChild(i),n.appendChild(r);const s=document.createElement("div");s.className="xp-pet-card__stats";const l=document.createElement("div");l.className="xp-pet-card__name",l.textContent=t.name||t.species,s.appendChild(l);const d=document.createElement("table");return d.className="xp-stats-table",t.isStarving?d.innerHTML=`
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
            `,s.appendChild(d),n.appendChild(s),n}buildProgressWithStats(t,n){const r=n==="next"?t.hoursToNextStrength:t.hoursToMaxStrength,o=n==="next"?t.feedsToNextStrength:t.feedsToMaxStrength,a=t.currentStrength-Math.floor(t.currentStrength),i=Math.floor(n==="next"?a*100:t.currentStrength/t.maxStrength*100),s=n==="next"?Math.min(99,Math.max(1,i)):Math.min(100,Math.max(0,i)),l=s<33?"low":s<67?"medium":"high";return `
            <div class="xp-progress-row">
                <span class="xp-progress-row__time">${this.formatHours(r)}</span>
                <span class="xp-progress-row__feeds">(🍖 x${o})</span>
                <div class="xp-progress-row__bar-container">
                    <div class="xp-progress-row__bar">
                        <div class="xp-progress-row__fill xp-progress-row__fill--${l}" style="width: ${s}%"></div>
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
        `;}formatHours(t){if(t===null||t===0)return "0h";if(!isFinite(t))return "∞";if(t<1)return `${Math.ceil(t*60)}m`;if(t<24)return `${t.toFixed(1)}h`;{const n=Math.floor(t/24),r=Math.floor(t%24);return `${n}d ${r}h`}}destroy(){this.root.parentNode&&this.root.parentNode.removeChild(this.root),this.headerElement=null,this.petsContainer=null,this.footerElement=null;}}const jk={id:"xp",label:"XP",icon:"📊",category:"stats",isAvailable:()=>true,getSummary:(e,t)=>{const n=Uc(e.id);return n>=99?null:{text:`${Math.round(n)}%`,variant:n<33?"low":n<67?"medium":"high",tooltip:`Average progress to max STR: ${Math.round(n)}%`,priority:10}},buildPanel:(e,t)=>{const n=new Hk({teamId:e.id});t.appendChild(n.build());const r=Jn(e.id);return r&&n.update(r),{update:(o,a)=>{const i=Jn(o.id);i&&n.update(i);},destroy:()=>n.destroy(),refresh:()=>{const o=Jn(e.id);o&&n.update(o);}}},renderPetSlot:(e,t,n)=>{const r=le.weather.get(),o=r.isActive?r.type:null,a=Jn(t.id),i=a?.teamSummary.bonusXpPerHour||0,s=a?.pets||[],l=Math.max(0,...s.map(f=>f.hoursToMaxStrength||0)),d=ss(e,o,i,l),c=d.isMaxStrength,u=!!d.xpBoostStats;let p="";if(c)u&&d.xpBoostStats&&(p=`
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
                `);const g=d.maxStrength,h=d.currentStrength,m=Math.min(100,Math.max(0,Math.floor(h/g*100))),b=e.xp%3600/3600*100,y=Math.min(99,Math.max(1,Math.floor(b))),w=d.currentStrength+1,S=d.maxStrength;p=f+`
                <div class="stat-row">
                    <span class="stat__label">NEXT STR</span>
                    <span class="stat__timer">${Vc(d.hoursToNextStrength||0)}</span>
                    <span class="stat__feeds">🍖 x${d.feedsToNextStrength}</span>
                    <span class="stat__str-label">STR ${w}</span>
                    <div class="stat__progress-mini">
                        <div class="stat__progress-fill stat__progress-fill--xp" style="width: ${y}%"></div>
                        <span class="stat__percent">${y}%</span>
                    </div>
                </div>
                <div class="stat-row">
                    <span class="stat__label">MAX STR</span>
                    <span class="stat__timer">${Vc(d.hoursToMaxStrength||0)}</span>
                    <span class="stat__feeds">🍖 x${d.feedsToMaxStrength}</span>
                    <span class="stat__str-label">STR ${S}</span>
                    <div class="stat__progress-mini">
                        <div class="stat__progress-fill stat__progress-fill--xp" style="width: ${m}%"></div>
                        <span class="stat__percent">${m}%</span>
                    </div>
                </div>
            `;}n.innerHTML=p?`<div class="xp-stats-compact">${p}</div>`:"";},renderGroupedSlot:(e,t,n)=>{const r=le.weather.get(),o=r.isActive?r.type:null,i=Jn(t.id)?.teamSummary.bonusXpPerHour||0;let s=0,l=0;for(const c of e){const u=ss(c,o,i,0);u.xpBoostStats&&(s+=u.xpBoostStats.expectedXpPerHour),u.supportingFeeds&&(l+=u.supportingFeeds);}let d="";if(s>0&&(d=`
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
                `;else {const u=Uc(t.id);n.innerHTML=`
                    <div class="xp-stats-compact xp-stats-grouped">
                        <div class="stat-row stat-row--info">
                            <span class="stat__message">Leveling: ${Math.round(u)}%</span>
                        </div>
                    </div>
                `;}return}n.innerHTML=`<div class="xp-stats-compact xp-stats-grouped">${d}</div>`;},hasContent:(e,t)=>{const n=Array.isArray(e)?e:[e];return n.some(a=>a.currentStrength<a.maxStrength)?true:n.some(a=>a.abilities.some(i=>U.XP_BOOST.includes(i)))},shouldDisplay:(e,t,n)=>(Ka.ALLOWED_PANELS[n.primary]||[]).includes("xp")?!!(t.some(i=>i.currentStrength<i.maxStrength)||t.some(i=>i.abilities.some(s=>U.XP_BOOST.includes(s)))):false,countRows:(e,t)=>{const n=Array.isArray(e)?e:[e];return n.every(o=>o.currentStrength>=o.maxStrength)?n.some(a=>a.abilities.some(i=>U.XP_BOOST.includes(i)))?1:0:2}};function _e(e,t,n){const r=document.createElement(e);return t&&(r.className=t),n&&(r.textContent=n),r}function Pt(e){if(e<=0)return "0m";const t=Math.floor(e/1e3),n=Math.floor(t/86400),r=Math.floor(t%86400/3600),o=Math.floor(t%3600/60),a=[];return n>0&&a.push(`${n}d`),r>0&&a.push(`${r}h`),(o>0||a.length===0)&&a.push(`${o}m`),a.join(" ")}function Et(e,t){const n=e==="egg"?"pet":"plant",r=_e("span","sprite-wrapper");if(!t)return r;let o=t;e==="plant"&&(o==="DawnCelestial"&&(o="DawnCelestialCrop"),o==="MoonCelestial"&&(o="MoonCelestialCrop"));try{if(j.isReady()&&j.has(n,o)){const a=j.toCanvas(n,o,{scale:.3});a.style.height="16px",a.style.width="auto",a.style.imageRendering="pixelated",r.appendChild(a);}}catch{}return r}function Fo(e,t){const n=_e("span","stacked-sprites");if(t.length===0)return n;const r=e==="egg"?"pet":"plant",o=4,i=[...new Set(t.map(l=>e==="egg"?l.eggId:l.species).filter(Boolean))].slice(0,o);if(i.length===0)return n;n.style.display="grid",n.style.gridTemplateColumns="repeat(2, 10px)",n.style.gridTemplateRows="repeat(2, 10px)",n.style.width="24px",n.style.height="24px";let s=false;for(let l=0;l<i.length;l++){let d=i[l];e==="plant"&&d&&(d==="DawnCelestial"&&(d="DawnCelestialCrop"),d==="MoonCelestial"&&(d="MoonCelestialCrop"));try{if(j.isReady()&&d&&j.has(r,d)){const c=j.toCanvas(r,d,{scale:.2});c.style.height="14px",c.style.width="auto",c.style.imageRendering="pixelated",c.style.position="relative",c.style.zIndex=String(o-l),n.appendChild(c),s=!0;}}catch{}}return s||(n.textContent=e==="egg"?"🥚":"🌱"),n}function Mt(e,t,n,r,o,a){const i=_e("div","stat-row"),s=_e("span","stat__label",e),l=_e("span","stat__timer",t),d=_e("span","stat__str-label");d.appendChild(n);const c=_e("div","stat__progress-mini"),u=_e("div",`stat__progress-fill ${o}`);u.style.width=`${r}%`,c.appendChild(u);const p=`${r}%`,f=_e("span","stat__percent",p);return c.appendChild(f),i.appendChild(s),n&&n.innerHTML!==""&&n.textContent!=="🥚"&&n.textContent!=="🌱"&&i.appendChild(d),i.appendChild(l),i.appendChild(c),i}function Zc(e){const t=_e("div","stat-row stat-row--boost"),n=_e("span","stat__label","BOOST");t.appendChild(n);const r=_e("span","stat__values-row");return e.forEach((o,a)=>{const i=_e("span","stat__boost-item");i.appendChild(o.sprite),i.appendChild(_e("span","stat__value stat__value--accent",o.text)),r.appendChild(i),a<e.length-1&&r.appendChild(_e("span","stat__separator"," "));}),t.appendChild(r),t}function ed(e,t){const n=t==="egg"?Dr:Gr;let r=0,o=false;const a=[];for(const i of e.abilities)if(i in n){const s=n[i],l=s.procRate*60;r+=l*s.minutesPerProc,o=true,a.push(i);}return {hasBoost:o,minutesPerProc:0,hourlyReduction:r,abilityName:a.join(", ")}}function td(e,t){const n=ae.getPetsForTeam(e),r=t==="egg"?Tl(n):Il(n);return `${((60+zr(r).timeReductionPerHour)/60).toFixed(2)}x`}function Oo(e,t,n=1){return e.length===0?0:Math.round(e.reduce((r,o)=>{const a=t-o.plantedAt,s=(o.maturedAt-t)/n,l=a+s,d=l>0?a/l*100:0;return r+Math.min(100,Math.max(0,d))},0)/e.length)}function $o(e,t,n=1){return e.length===0?0:Math.round(e.reduce((r,o)=>{const a=t-o.startTime,s=(o.endTime-t)/n,l=a+s,d=l>0?a/l*100:0;return r+Math.min(100,Math.max(0,d))},0)/e.length)}function nd(e,t){if(e.length===0)return {remainingMs:0,name:null};const r=[...e].sort((o,a)=>o.maturedAt-a.maturedAt)[0];return {remainingMs:Math.max(0,r.maturedAt-t),name:r.eggId||null}}function rd(e,t){if(e.length===0)return {remainingMs:0,name:null};const r=[...e].sort((o,a)=>o.endTime-a.endTime)[0];return {remainingMs:Math.max(0,r.endTime-t),name:r.species||null}}function od(e,t){if(e.length===0)return 0;const n=Math.max(...e.map(r=>r.maturedAt));return Math.max(0,n-t)}function ad(e,t){if(e.length===0)return 0;const n=Math.max(...e.map(r=>r.endTime));return Math.max(0,n-t)}function Rt(e,t){return e<=0||t<=0?0:Math.round(e/t)}const Wk={id:"growth",label:"Growth",icon:"⏱️",category:"tracking",isAvailable:()=>true,getSummary:(e,t)=>{const n=le.myGarden.get(),r=n.eggs.growing.length+n.plants.growing.length;return r===0?null:{text:`${r} growing`,variant:"neutral",tooltip:`${n.eggs.growing.length} eggs, ${n.plants.growing.length} plants`,priority:8}},buildPanel:(e,t)=>({update:()=>{},destroy:()=>{},refresh:()=>{}}),renderPetSlot:(e,t,n,r)=>{const o=le.myGarden.get(),a=Date.now(),i=ed(e,"egg"),s=ed(e,"plant");if(n.innerHTML="",!i.hasBoost&&!s.hasBoost)return;const l=o.eggs.growing,d=o.crops.growing;let c=r;!c&&i.hasBoost!==s.hasBoost&&(c=i.hasBoost?"egg":"plant");const u=c==="egg"&&i.hasBoost||c==="plant"&&s.hasBoost,p=!c,f=_e("div","growth-stats-compact");if(!u&&!p){const T=r==="egg"?"Egg":"Plant",v=_e("div","stat-row stat-row--message");v.appendChild(_e("span","stat__message",`No ${T} Growth Boost, Click the Button to Switch View`)),f.appendChild(v),n.appendChild(f);return}const g=[],h=i.hasBoost&&(c==="egg"||p),m=s.hasBoost&&(c==="plant"||p);if(h){const T=Math.round(i.hourlyReduction/60*100);g.push({text:`+${T}% Speed`,sprite:Et("egg","UncommonEgg")});}if(m){const T=Math.round(s.hourlyReduction/60*100);g.push({text:`+${T}% Speed`,sprite:Et("plant","Carrot")});}g.length>0&&f.appendChild(Zc(g));const b=td(t,"egg"),y=parseFloat(b.replace("x","")),w=td(t,"plant"),S=parseFloat(w.replace("x",""));if(i.hasBoost&&(c==="egg"||p)){const T=nd(l,a),v=Rt(T.remainingMs,y),C=l.length>0?Oo(l,a,y):100,I=v>0?Pt(v):"Ready!";f.appendChild(Mt("NEXT EGG",I,Et("egg",T.name),C,"stat__progress-fill--egg"));}if(s.hasBoost&&(c==="plant"||p)){const T=rd(d,a),v=Rt(T.remainingMs,S),C=d.length>0?$o(d,a,S):100,I=v>0?Pt(v):"Ready!";f.appendChild(Mt("NEXT PLANT",I,Et("plant",T.name),C,"stat__progress-fill--plant"));}if(i.hasBoost&&(c==="egg"||p)){const T=l.length>0?Oo(l,a,y):100,v=od(l,a),C=Rt(v,y),I=C>0?Pt(C):"All Ready!";f.appendChild(Mt("ALL EGGS",I,Fo("egg",l),T,"stat__progress-fill--egg"));}else if(s.hasBoost&&(c==="plant"||p)){const T=d.length>0?$o(d,a,S):100,v=ad(d,a),C=Rt(v,S),I=C>0?Pt(C):"All Ready!";f.appendChild(Mt("ALL PLANTS",I,Fo("plant",d),T,"stat__progress-fill--plant"));}n.appendChild(f);},renderGroupedSlot:(e,t,n,r)=>{const o=le.myGarden.get(),a=Date.now(),i=Tl(e),s=Il(e),l=zr(i),d=zr(s);n.innerHTML="";const c=l.timeReductionPerHour>0,u=d.timeReductionPerHour>0;if(!c&&!u)return;const p=_e("div","growth-stats-compact growth-stats-grouped"),f=o.eggs.growing,g=o.crops.growing,h=r==="egg"&&c,m=r==="plant"&&u,b=!r,y=(60+l.timeReductionPerHour)/60,w=(60+d.timeReductionPerHour)/60,S=[];if((h||b)&&c){const T=Math.round(l.timeReductionPerHour/60*100);S.push({text:`+${T}% Speed`,sprite:Et("egg","UncommonEgg")});}if((m||b)&&u){const T=Math.round(d.timeReductionPerHour/60*100);S.push({text:`+${T}% Speed`,sprite:Et("plant","Carrot")});}if(S.length>0&&p.appendChild(Zc(S)),(h||b)&&c){const T=nd(f,a),v=Rt(T.remainingMs,y),C=f.length>0?Oo(f,a,y):100,I=v>0?Pt(v):"Ready!";p.appendChild(Mt("NEXT EGG",I,Et("egg",T.name),C,"stat__progress-fill--egg"));}if((m||b)&&u){const T=rd(g,a),v=Rt(T.remainingMs,w),C=g.length>0?$o(g,a,w):100,I=v>0?Pt(v):"Ready!";p.appendChild(Mt("NEXT PLANT",I,Et("plant",T.name),C,"stat__progress-fill--plant"));}if((h||b)&&c){const T=f.length>0?Oo(f,a,y):100,v=od(f,a),C=Rt(v,y),I=C>0?Pt(C):"All Ready!";p.appendChild(Mt("ALL EGGS",I,Fo("egg",f),T,"stat__progress-fill--egg"));}else if((m||b)&&u){const T=g.length>0?$o(g,a,w):100,v=ad(g,a),C=Rt(v,w),I=C>0?Pt(C):"All Ready!";p.appendChild(Mt("ALL PLANTS",I,Fo("plant",g),T,"stat__progress-fill--plant"));}n.appendChild(p);},hasContent:(e,t)=>{const n=Array.isArray(e)?e:[e];return In(n)||_n(n)},shouldDisplay:(e,t,n)=>{const o=(Ka.ALLOWED_PANELS[n.primary]||[]).includes("growth"),a=In(t)||_n(t);return o&&a},countRows:(e,t,n)=>{const r=Array.isArray(e)?e:[e],o=In(r),a=_n(r);if(!o&&!a)return 0;if(n==="egg"||n==="plant")return 2;let i=0;return o&&(i+=2),a&&(i+=2),i}},ur=["ProduceScaleBoost","ProduceScaleBoostII","ProduceScaleBoostIII","SnowyCropSizeBoost"],pr=["ProduceMutationBoost","ProduceMutationBoostII","ProduceMutationBoostIII","SnowyCropMutationBoost"],fr=["RainDance","SnowGranter","FrostGranter","GoldGranter","RainbowGranter"],gr=["DoubleHarvest"],hr=["ProduceRefund"];function St(e,t,n){const r=document.createElement(e);return t&&(r.className=t),n&&(r.textContent=n),r}function Lt(e){if(e>=1e12)return `${(e/1e12).toFixed(2)}T`;if(e>=1e9)return `${(e/1e9).toFixed(2)}B`;if(e>=1e6)return `${(e/1e6).toFixed(2)}M`;if(e>=1e3){const t=e/1e3;return t>=100?`${Math.round(t)}k`:`${t.toFixed(1)}k`}return String(Math.round(e))}function Un(e){const t=V.get("abilities");if(!t)return null;const n=t[e];return n?{id:e,name:n.name??e,baseProbability:n.baseProbability??0,scaleIncreasePercentage:n.baseParameters?.scaleIncreasePercentage??0,mutationChanceIncreasePercentage:n.baseParameters?.mutationChanceIncreasePercentage??0,grantedMutations:n.baseParameters?.grantedMutations??[],requiredWeather:n.baseParameters?.requiredWeather??null}:null}function ke(e,t){return e.abilities.some(n=>t.includes(n))}function ao(e,t,n){if(e.hunger<=0)return  false;const r=Un(t);return !(!r||r.requiredWeather&&n!==r.requiredWeather)}function io(e){return e.currentStrength/e.maxStrength}function Ya(e,t){return Math.min(100,e*t)}function Uk(e,t,n,r){const o=Fa(e);if(!o)return 0;const a=dt(e,t,n),i=Math.min(t*(1+r/100),o.maxScale),s=dt(e,i,n);return Math.max(0,s-a)}function fg(e,t,n,r){if(n.includes(r))return 0;const o=dt(e,t,n),a=[...n,r],i=dt(e,t,a);return Math.max(0,i-o)}function Ti(e,t,n){const r=St("div","stat-row");return r.appendChild(St("span","stat__label",e)),r.appendChild(St("span","stat__value",t)),r.appendChild(St("span","stat__timer",n)),r}function id(e,t,n){const r=St("div","stat-row");return r.appendChild(St("span","stat__label",e)),r.appendChild(St("span","stat__value",t)),r.appendChild(St("span","stat__timer",n)),r}function Vk(e,t){const r=le.myGarden.get().crops.all;if(r.length===0)return {perProc:0,perHour:0};let o=0,a=0;for(const l of e){const d=io(l);for(const c of ur){if(!l.abilities.includes(c)||!ao(l,c,t))continue;const u=Un(c);if(!u)continue;const p=Ya(u.baseProbability,d),f=u.scaleIncreasePercentage*d,g=p/100*60;let h=0;for(const b of r){const y=Uk(b.species,b.targetScale,b.mutations,f);h+=y;}const m=h/r.length;o+=g,a+=m;}}const i=e.length>0?a/e.length:0,s=o*i;return {perProc:i,perHour:s}}function Xk(e,t){const r=le.myGarden.get().crops.all,o=le.weather.get(),a=V.get("weather");if(r.length===0||!o.isActive||!a)return {perProc:0,perHour:0};const i=a[o.type];if(!i?.mutator)return {perProc:0,perHour:0};const s=i.mutator.chancePerMinutePerCrop??0,l=i.mutator.mutation??"";let d=0;for(const g of e){const h=io(g);for(const m of pr){if(!g.abilities.includes(m)||!ao(g,m,t))continue;const b=Un(m);if(!b)continue;const y=b.mutationChanceIncreasePercentage*h;d+=y;}}const c=s*(d/100),u=r.length*(c/100)*60;let p=0;for(const g of r){const h=fg(g.species,g.targetScale,g.mutations,l);p+=h;}const f=r.length>0?p/r.length:0;return {perProc:f,perHour:u*f}}function qk(e,t){const r=le.myGarden.get().crops.all;if(r.length===0)return {perProc:0,perHour:0};let o=0,a=0;for(const l of e){const d=io(l);for(const c of fr){if(!l.abilities.includes(c)||!ao(l,c,t))continue;const u=Un(c);if(!u)continue;const f=Ya(u.baseProbability,d)/100*60,g=u.grantedMutations;if(g.length===0)continue;const h=g[0];let m=0;for(const y of r){const w=fg(y.species,y.targetScale,y.mutations,h);m+=w;}const b=m/r.length;o+=f,a+=b;}}const i=e.length>0?a/e.length:0,s=o*i;return {perProc:i,perHour:s}}function Kk(e,t){const n=le.myGarden.get(),r=n.crops.mature.length>0?n.crops.mature:n.crops.all;if(r.length===0)return {expectedCrops:0,expectedCoins:0};let o=0;for(const s of e){const l=io(s);for(const d of gr){if(!s.abilities.includes(d)||!ao(s,d,t))continue;const c=Un(d);if(!c)continue;const u=Ya(c.baseProbability,l);o+=u/100;}}const a=r.length*o;let i=0;for(const s of r){const l=dt(s.species,s.targetScale,s.mutations);i+=l*o;}return {expectedCrops:a,expectedCoins:i}}function Yk(e,t){const n=le.myGarden.get(),r=n.crops.mature.length>0?n.crops.mature:n.crops.all;if(r.length===0)return {expectedCrops:0,expectedCoins:0};let o=0;for(const s of e){const l=io(s);for(const d of hr){if(!s.abilities.includes(d)||!ao(s,d,t))continue;const c=Un(d);if(!c)continue;const u=Ya(c.baseProbability,l);o+=u/100;}}const a=r.length*o;let i=0;for(const s of r){const l=dt(s.species,s.targetScale,s.mutations);i+=l*o;}return {expectedCrops:a,expectedCoins:i}}const gs={id:"coin",label:"Value",icon:"💰",category:"tracking",isAvailable:()=>true,getSummary:(e,t)=>{const n=le.myGarden.get(),r=n.crops.all.length;return r===0?null:{text:`${r} crops`,variant:"neutral",tooltip:`${n.crops.mature.length} mature, ${n.crops.growing.length} growing`,priority:7}},buildPanel:(e,t)=>({update:()=>{},destroy:()=>{},refresh:()=>{}}),renderPetSlot:(e,t,n)=>{const r=[e];gs.renderGroupedSlot&&gs.renderGroupedSlot(r,t,n);},renderGroupedSlot:(e,t,n)=>{const r=le.weather.get(),o=r.isActive?r.type:null;n.innerHTML="";const a=St("div","value-stats-compact"),i=e.some(u=>ke(u,ur)),s=e.some(u=>ke(u,pr)),l=e.some(u=>ke(u,fr)),d=e.some(u=>ke(u,gr)),c=e.some(u=>ke(u,hr));if(!(!i&&!s&&!l&&!d&&!c)){if(i){const u=Vk(e,o);a.appendChild(Ti("SIZE BOOST",`+${Lt(u.perProc)}/proc`,`+${Lt(u.perHour)}/hr`));}if(s){const u=Xk(e,o);a.appendChild(Ti("MUTATION BOOST",`+${Lt(u.perProc)}/proc`,`+${Lt(u.perHour)}/hr`));}if(l){const u=qk(e,o);a.appendChild(Ti("GRANTERS",`+${Lt(u.perProc)}/proc`,`+${Lt(u.perHour)}/hr`));}if(d){const u=Kk(e,o);a.appendChild(id("EXTRA HARVEST",`+${u.expectedCrops.toFixed(1)} crops`,`+${Lt(u.expectedCoins)} coins`));}if(c){const u=Yk(e,o);a.appendChild(id("CROP REFUND",`+${u.expectedCrops.toFixed(1)} crops`,`+${Lt(u.expectedCoins)} coins`));}n.appendChild(a);}},hasContent:(e,t)=>(Array.isArray(e)?e:[e]).some(r=>ke(r,ur)||ke(r,pr)||ke(r,fr)||ke(r,gr)||ke(r,hr)),shouldDisplay:(e,t,n)=>{const o=(Ka.ALLOWED_PANELS[n.primary]||[]).includes("coin"),a=t.some(i=>ke(i,ur)||ke(i,pr)||ke(i,fr)||ke(i,gr)||ke(i,hr));return o&&a},countRows:(e,t)=>{const n=Array.isArray(e)?e:[e];let r=0;return n.some(o=>ke(o,ur))&&r++,n.some(o=>ke(o,pr))&&r++,n.some(o=>ke(o,fr))&&r++,n.some(o=>ke(o,gr))&&r++,n.some(o=>ke(o,hr))&&r++,r}},hn=["DoubleHatch"],mn=["PetRefund","PetRefundII"],bn=["PetMutationBoost","PetMutationBoostII","PetMutationBoostIII"];function je(e,t,n){const r=document.createElement(e);return t&&(r.className=t),n&&(r.textContent=n),r}function gg(e){const t=V.get("abilities");if(!t)return null;const n=t[e];return n?{id:e,name:n.name??e,baseProbability:n.baseProbability??0,mutationChanceIncreasePercentage:n.baseParameters?.mutationChanceIncreasePercentage??0}:null}function Be(e,t){return e.abilities.some(n=>t.includes(n))}function Ol(e){return e.hunger>0}function hg(e){return e.currentStrength/e.maxStrength}function mg(e,t){return Math.min(100,e*t)}function Jk(e){const t=je("span","sprite-wrapper");try{if(j.isReady()&&j.has("pet",e)){const n=j.toCanvas("pet",e,{scale:.6});n.style.height="32px",n.style.width="auto",n.style.imageRendering="pixelated",t.appendChild(n);}}catch{t.textContent="🥚";}return t}function Bo(e,t){const n=je("div","stat-row");n.appendChild(je("span","stat__label",e));const r=je("div","stat__sprite-grid");for(const o of t){if(o.value<=0)continue;const a=je("div","stat__sprite-item");a.appendChild(Jk(o.eggId));const i=je("span","stat__sprite-value",o.value.toFixed(1));a.appendChild(i),r.appendChild(a);}return n.appendChild(r),n}function sd(e,t,n,r){const o=je("div","stat-row");o.appendChild(je("span","stat__label","PET MUTATION"));const a=je("span","stat__values-row"),i=je("span","stat__value stat__value--rainbow",`${e}% (${n})`);i.style.backgroundImage="var(--rainbow-text-gradient)",i.style.webkitBackgroundClip="text",i.style.webkitTextFillColor="transparent",i.style.backgroundClip="text",a.appendChild(i),a.appendChild(je("span","stat__separator"," | "));const s=je("span","stat__value stat__value--gold",`${t}% (${r})`);return a.appendChild(s),o.appendChild(a),o}function $l(){const e=le.myInventory.get(),t=new Map;for(const n of e.items)if(n.itemType==="Egg"&&n.eggId){const r=t.get(n.eggId)||0;t.set(n.eggId,r+(n.quantity||1));}return t}function ld(e){const t=$l(),n=[];let r=0;for(const o of e){if(!Ol(o))continue;const a=hg(o);for(const i of hn){if(!o.abilities.includes(i))continue;const s=gg(i);if(!s)continue;const l=mg(s.baseProbability,a);r+=l/100;}}for(const[o,a]of t){const i=a*r;n.push({eggId:o,value:i});}return n}function cd(e){const t=$l(),n=[];let r=0;for(const o of e){if(!Ol(o))continue;const a=hg(o);for(const i of mn){if(!o.abilities.includes(i))continue;const s=gg(i);if(!s)continue;const l=mg(s.baseProbability,a);r+=l/100;}}for(const[o,a]of t){const i=a*r;n.push({eggId:o,value:i});}return n}function dd(e){const t=$l(),n=Array.from(t.values()).reduce((p,f)=>p+f,0);let r=0,o=0;for(const p of e){if(!Ol(p))continue;bn.some(g=>p.abilities.includes(g))&&(r+=p.currentStrength*1e-4,o+=p.currentStrength*.001);}const a=V.get("mutations");let i=1,s=.1;if(a){const p=a.Gold,f=a.Rainbow;p?.baseChance!==void 0&&(i=p.baseChance),f?.baseChance!==void 0&&(s=f.baseChance);}const l=i+o,d=s+r,c=n*l/100,u=n*d/100;return {goldChance:l,rainbowChance:d,expectedGold:c,expectedRainbow:u}}const Qk={id:"hatch",label:"Hatching",icon:"🥚",category:"tracking",isAvailable:()=>true,getSummary:(e,t)=>{const r=le.myInventory.get().items.filter(o=>o.itemType==="Egg").reduce((o,a)=>o+(a.quantity||1),0);return r===0?null:{text:`${r} eggs`,variant:"neutral",tooltip:`${r} eggs in inventory`,priority:6}},buildPanel:(e,t)=>({update:()=>{},destroy:()=>{},refresh:()=>{}}),renderPetSlot:(e,t,n)=>{n.innerHTML="";const r=je("div","hatching-stats-compact"),o=Be(e,hn),a=Be(e,mn),i=Be(e,bn);if(!o&&!a&&!i)return;const s=[e];if(o){const l=ld(s);l.length>0&&r.appendChild(Bo("DOUBLE HATCH",l));}if(a){const l=cd(s);l.length>0&&r.appendChild(Bo("PET REFUND",l));}if(i){const l=dd(s),d=l.rainbowChance.toFixed(4),c=l.goldChance.toFixed(2),u=l.expectedRainbow<.01?`~${(l.expectedRainbow*100).toFixed(1)}%e`:l.expectedRainbow.toFixed(2),p=l.expectedGold.toFixed(2);r.appendChild(sd(d,c,u,p));}n.appendChild(r);},renderGroupedSlot:(e,t,n)=>{n.innerHTML="";const r=je("div","hatching-stats-compact"),o=e.some(s=>Be(s,hn)),a=e.some(s=>Be(s,mn)),i=e.some(s=>Be(s,bn));if(!(!o&&!a&&!i)){if(o){const s=ld(e);s.length>0&&r.appendChild(Bo("DOUBLE HATCH",s));}if(a){const s=cd(e);s.length>0&&r.appendChild(Bo("PET REFUND",s));}if(i){const s=dd(e),l=s.rainbowChance.toFixed(4),d=s.goldChance.toFixed(2),c=s.expectedRainbow<.01?`~${(s.expectedRainbow*100).toFixed(1)}%e`:s.expectedRainbow.toFixed(2),u=s.expectedGold.toFixed(2);r.appendChild(sd(l,d,c,u));}n.appendChild(r);}},hasContent:(e,t)=>(Array.isArray(e)?e:[e]).some(r=>Be(r,hn)||Be(r,mn)||Be(r,bn)),shouldDisplay:(e,t,n)=>{const o=(Ka.ALLOWED_PANELS[n.primary]||[]).includes("hatch"),a=t.some(i=>Be(i,hn)||Be(i,mn)||Be(i,bn));return o&&a},countRows:(e,t)=>{const n=Array.isArray(e)?e:[e];let r=0;return n.some(o=>Be(o,hn))&&r++,n.some(o=>Be(o,mn))&&r++,n.some(o=>Be(o,bn))&&r++,r}},ud=[jk,Wk,gs,Qk];function Zk(e){let t=e;return t=t.replace(/_NEW$/,""),t=t.replace(/^Snowy/,""),t=t.replace(/(I|II|III|IV)$/,""),t}function bg(e){return new Set(e.abilities.map(Zk))}function rr(e,t){if(e.size!==t.size)return  false;for(const n of e)if(!t.has(n))return  false;return  true}function pd(e,t){return bg(e).has(t)}function eT(e,t){if(e.length<2)return {shouldGroup:false,matchingPets:[],remainingPets:e};if(t){const i=t==="egg"?"EggGrowthBoost":"PlantGrowthBoost",s=e.filter(d=>pd(d,i)),l=e.filter(d=>!pd(d,i));return s.length>=2?{shouldGroup:true,matchingPets:s,remainingPets:l}:{shouldGroup:false,matchingPets:[],remainingPets:e}}const n=e.map(i=>({pet:i,abilities:bg(i)}));if(e.length===3){const[i,s,l]=n;if(rr(i.abilities,s.abilities)&&rr(i.abilities,l.abilities))return {shouldGroup:true,matchingPets:[i.pet,s.pet,l.pet],remainingPets:[]}}const[r,o,a]=n;return rr(r.abilities,o.abilities)?{shouldGroup:true,matchingPets:[r.pet,o.pet],remainingPets:a?[a.pet]:[]}:a&&rr(r.abilities,a.abilities)?{shouldGroup:true,matchingPets:[r.pet,a.pet],remainingPets:[o.pet]}:a&&rr(o.abilities,a.abilities)?{shouldGroup:true,matchingPets:[o.pet,a.pet],remainingPets:[r.pet]}:{shouldGroup:false,matchingPets:[],remainingPets:e}}const tT=3;function nT(e,t){const n=e.abilities||[],r=d=>n.some(c=>d.includes(c));if((r(U.DOUBLE_HATCH)||r(U.PET_REFUND)||r(U.PET_MUTATION)||r(U.MAX_STR_BOOST))&&t.some(d=>d.id==="hatch"))return "hatch";if((r(U.COIN_FINDER)||r(U.SELL_BOOST)||r(U.CROP_REFUND_HARVEST)||r(U.CROP_SIZE)||r(U.CROP_MUTATION)||r(U.RARE_GRANTERS)||r(U.COMMON_GRANTERS))&&t.some(d=>d.id==="coin"))return "coin";if((r(U.EGG_GROWTH)||r(U.PLANT_GROWTH))&&t.some(d=>d.id==="growth"))return "growth";const s=e.currentStrength<e.maxStrength,l=r(U.XP_BOOST);return (s||l)&&t.some(d=>d.id==="xp")?"xp":t[0]?.id||"xp"}class rT{constructor(t){R(this,"expandedTeams",new Map);R(this,"featureUpdateInterval",null);R(this,"options");this.options=t;}isExpanded(t){return this.expandedTeams.has(t)}toggle(t){this.expandedTeams.has(t)?this.collapse(t):this.expand(t);}expand(t,n=false,r){const o=this.options.getListContainer(),a=ae.getTeam(t);if(!a||!o)return;const i=ae.getPetsForTeam(a),s=le.myPets.get(),l=No(a),d=ud.filter(S=>!(!S.isAvailable()||S.shouldDisplay&&!S.shouldDisplay(a,i,l)));if(d.length===0){console.warn("[TeamCardExpansion] No available features to display");return}const c=l.primary==="time-reduction"||In(i)||_n(i);let u;if(c){const S=In(i),T=_n(i),v=le.myGarden.get(),C=v.eggs.growing.length>0,I=v.crops.growing.length>0;S&&T?I&&!C?u="plant":C&&!I?u="egg":u="plant":T?u="plant":S&&(u="egg");}const p=x("div",{className:"team-expanded-container"}),f=[];let g=n?{shouldGroup:false,matchingPets:[],remainingPets:i}:this.analyzeTeamForGrouping(a,i,u);const h=d.some(S=>S.id==="growth"||S.id==="hatch"||S.id==="coin");if(g.shouldGroup&&!h&&(g.matchingPets.every(T=>T.currentStrength>=T.maxStrength)||(g={shouldGroup:false,matchingPets:[],remainingPets:i})),g.shouldGroup&&g.matchingPets.length>=2){const S=d.filter(C=>!C.hasContent||C.hasContent(g.matchingPets,a)),T=S.find(C=>C.id==="growth"||C.id==="hatch"||C.id==="coin")||S[0]||d[0],v=this.createGroupedPetRow(a,g.matchingPets,d,T,u,t);p.appendChild(v.container),f.push(v.cardState);for(const C of g.remainingPets){const I=a.petIds.indexOf(C.id),k=this.createIndividualPetRow(a,C,I,d,u,t);p.appendChild(k.container),f.push(k.cardState);}}else for(let S=0;S<3;S++){const T=a.petIds[S],v=T?s.all.find(I=>I.id===T)??null:null,C=this.createIndividualPetRow(a,v,S,d,u,t,r);p.appendChild(C.container),f.push(C.cardState);}this.expandedTeams.set(t,{cards:f,expandedAt:Date.now(),container:p,growthViewType:u});const m=r==="xp"?"xp":r==="growth"?"growth":void 0;this.addProgressBar(p,i,t,m);const y=ae.getAllTeams().findIndex(S=>S.id===t),w=Array.from(o.children).filter(S=>S instanceof HTMLElement&&S.classList.contains("team-list-item"));y!==-1&&y<w.length&&w[y].insertAdjacentElement("afterend",p),this.startUpdates();}collapse(t){const n=this.expandedTeams.get(t);if(n){for(const r of n.cards)r.shell&&r.shell.destroy();n.container.remove(),this.expandedTeams.delete(t),this.expandedTeams.size===0&&this.stopUpdates();}}cleanupAll(){const t=Array.from(this.expandedTeams.keys());for(const n of t)this.collapse(n);}destroy(){this.cleanupAll(),this.stopUpdates();}addProgressBar(t,n,r,o){const a=ae.getTeam(r),i=a?No(a):null,s=this.expandedTeams.get(r),l=i?.primary==="time-reduction"||In(n)||_n(n),d=o??(l?"growth":"xp");s&&(s.currentBarMode=d),d==="growth"?this.renderGrowthSummaryBar(t,n,r):this.renderXpProgressBar(t,n);}updateProgressBarForFeature(t,n){const r=this.expandedTeams.get(t);if(!r)return;const o=ae.getTeam(t);if(!o||n!=="xp"&&n!=="growth")return;const a=ae.getPetsForTeam(o),i=n==="xp"?"xp":"growth";if(r.currentBarMode===i)return;const s=r.container.querySelector(".growth-summary-overhaul"),l=r.container.querySelector(".team-progress-bar:not(.team-progress-bar--egg):not(.team-progress-bar--plant)");s&&s.remove(),l&&l.remove(),this.addProgressBar(r.container,a,t,i);}renderXpProgressBar(t,n){if(n.some(o=>o.currentStrength<o.maxStrength)&&n.length>0){const o=Math.round(n.reduce((d,c)=>d+c.currentStrength/c.maxStrength,0)/n.length*100),a=x("div",{className:"team-progress-bar"}),i=o<33?"low":o<67?"medium":"high",s=x("div",{className:`team-progress-bar__fill team-progress-bar__fill--${i}`});s.style.width=`${o}%`;const l=x("div",{className:"team-progress-bar__percent",textContent:`${o}%`});a.appendChild(s),a.appendChild(l),t.prepend(a);}}renderGrowthSummaryBar(t,n,r){const o=this.expandedTeams.get(r),a=o?.growthViewType||"plant",i=le.myGarden.get(),s=Date.now(),l=a==="egg"?i.eggs.growing:i.crops.growing,d=l.length,c=Tl(n),u=Il(n),p=zr(c).timeReductionPerHour,f=zr(u).timeReductionPerHour,g=Math.round(a==="egg"?p:f);let h=d>0?0:100;if(d>0){const G=(60+g)/60;h=Math.round(l.reduce((Y,O)=>{const H=a==="egg"?O.plantedAt:O.startTime,z=a==="egg"?O.maturedAt:O.endTime,$=s-H,L=(z-s)/G,F=$+L,W=F>0?$/F*100:0;return Y+Math.min(100,Math.max(0,W))},0)/d);}let m=l.find(G=>G.tileIndex===o?.pinnedItemId);!m&&d>0&&(m=[...l].sort((G,Y)=>{const O=a==="egg"?G.maturedAt:G.endTime,H=a==="egg"?Y.maturedAt:Y.endTime;return O-H})[0]);const b=x("div",{className:"growth-summary-overhaul"}),y=x("div",{className:`team-progress-bar team-progress-bar--${a}`}),w=x("div",{className:`team-progress-bar__fill team-progress-bar__fill--${a}`});w.style.width=`${h}%`;const S=G=>{const Y=Math.floor(G/60),O=G%60;return Y>0&&O>0?`${Y}h ${O}m/h`:Y>0?`${Y}h/h`:`${O}m/h`};g>0&&((60+g)/60).toFixed(2)+"";const T=x("div",{className:"team-progress-bar__overlay"});T.innerHTML=`
            <span class="bar-percent">${h}%</span>
            <span class="bar-info">${d} total +${S(g)}</span>
        `,y.appendChild(w),y.appendChild(T);const v=x("div",{className:"growth-next-item"});if(m){let G=a==="egg"?m.eggId:m.species;const Y=a==="egg"?"pet":"plant";a==="plant"&&G&&(G==="DawnCelestial"&&(G="DawnCelestialCrop"),G==="MoonCelestial"&&(G="MoonCelestialCrop"));const O=a==="egg"?m.maturedAt:m.endTime;a==="egg"?m.plantedAt:m.startTime;const H=(60+g)/60,z=Math.max(0,Math.round((O-s)/H)),$=s+z,P=new Date($),L=P.getDate()!==new Date().getDate(),F=P.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}).toLowerCase(),W=`${L?"Tomorrow ":""}${F}`,xe=X=>{const pe=Math.floor(X/1e3),Se=Math.floor(pe/60),Dt=Math.floor(Se/60);return Dt>0?`${Dt}h ${Se%60}m ${pe%60}s`:Se>0?`${Se}m ${pe%60}s`:`${pe}s`},Q=x("div",{className:"growth-next-sprite"});try{if(j.isReady()&&j.has(Y,G)){const X=j.toCanvas(Y,G,{scale:.3});X.style.height="20px",X.style.width="auto",X.style.imageRendering="pixelated",Q.appendChild(X);}else Q.textContent=a==="egg"?"🥚":"🌱";}catch(X){console.warn("[GrowthSummary] Sprite error:",X),Q.textContent=a==="egg"?"🥚":"🌱";}v.innerHTML=`
                <div class="growth-next-details">
                    <span class="growth-next-time">${xe(z)}</span>
                    <span class="growth-next-date">| ${W}</span>
                </div>
            `,v.prepend(Q);}else v.innerHTML='<span class="empty-text">No items growing</span>';const C=x("div",{className:"growth-overhaul-controls"}),I=a==="egg"?"UncommonEgg":"Carrot",k=a==="egg"?"pet":"plant";let A=null;try{j.isReady()&&j.has(k,I)&&(A=j.toCanvas(k,I,{scale:.35}));}catch{}const E=Bk({variant:a==="egg"?"egg":"plant",sprite:A,playSound:true,tooltip:`Switch to ${a==="egg"?"plants":"eggs"}`,onClick:G=>{G.stopPropagation(),o&&(o.growthViewType=a==="egg"?"plant":"egg",o.pinnedItemId=void 0,this.updateGrowthSummary(r));}}),B=x("button",{className:"growth-dropdown-overhaul",textContent:"▼"});B.onclick=G=>{G.stopPropagation(),this.showGrowthDropdown(B,l,a,r);},p>0&&f>0&&C.appendChild(E),C.appendChild(B),b.appendChild(y),b.appendChild(v),b.appendChild(C);const D=t.querySelector(".growth-summary-overhaul");D?D.replaceWith(b):t.prepend(b);}updateGrowthSummary(t){const n=this.expandedTeams.get(t);if(n){const r=ae.getTeam(t);if(!r)return;const o=ae.getPetsForTeam(r);this.renderGrowthSummaryBar(n.container,o,t);const a=this.analyzeTeamForGrouping(r,o,n.growthViewType),i=n.cards.some(l=>l.slotIndex===-1),s=a.shouldGroup&&a.matchingPets.length>=2;if(i!==s){this.collapse(t),requestAnimationFrame(()=>this.expand(t,false));return}if(i&&s){const l=n.cards.find(d=>d.slotIndex===-1);if(l?.shell&&(l.shell.root.classList.contains("base-pet-card--grouped")?3:l.shell.root.classList.contains("base-pet-card--grouped-2")?2:0)!==a.matchingPets.length){this.collapse(t),requestAnimationFrame(()=>this.expand(t,false));return}}this.updateGroupedCardsViewType(t,n),this.updateSpecificTeam(t,n);}}updateSpecificTeam(t,n){const r=ae.getTeam(t);if(!r)return;const o=le.myPets.get();for(const a of n.cards){const i=r.petIds[a.slotIndex],s=i?o.all.find(l=>l.id===i):null;if(s&&a.shell&&(a.shell.update(s),a.featureData.renderPetSlot))try{const l=a.shell.getContentSlot();a.featureData.renderPetSlot(s,r,l,n.growthViewType);const d=s.currentStrength>=s.maxStrength,c=l.children.length>0||l.textContent.trim().length>0;a.shell.setCentered(d&&!c);}catch(l){console.error(`[TeamCardExpansion] Failed to render slot for ${s.id}:`,l);}}}updateGroupedCardsViewType(t,n){const r=ae.getTeam(t);if(r){for(const o of n.cards)if(o.slotIndex===-1&&o.shell){const a=o.shell.getContentSlot();if(o.featureData.renderGroupedSlot&&o.shell.root.classList.contains("base-pet-card--grouped")){a.innerHTML="";const i=ae.getPetsForTeam(r);o.featureData.renderGroupedSlot(i,r,a,n.growthViewType);const s=a.children.length>0||a.textContent.trim().length>0;o.shell.setCentered(!s);}}}}showGrowthDropdown(t,n,r,o){const a=document.querySelector(".growth-dropdown-menu");if(a){const d=a.getAttribute("data-owner-id")===o&&a.getAttribute("data-view-type")===r;if(a.remove(),d)return}const i=x("div",{className:"growth-dropdown-menu"});if(i.setAttribute("data-owner-id",o),i.setAttribute("data-view-type",r),n.length===0){const d=x("div",{className:"growth-dropdown-option"});d.textContent="No items growing",i.appendChild(d);}else {const d=r==="egg"?"pet":"plant";n.forEach(c=>{const u=c.tileIndex;let p=r==="egg"?c.eggId:c.species;r==="plant"&&(p==="DawnCelestial"&&(p="DawnCelestialCrop"),p==="MoonCelestial"&&(p="MoonCelestialCrop"));const f=x("div",{className:"growth-dropdown-option"}),g=x("span",{className:"dropdown-sprite"});try{if(j.isReady()&&j.has(d,p)){const w=j.toCanvas(d,p,{scale:.3});w.style.height="16px",w.style.width="auto",w.style.imageRendering="pixelated",g.appendChild(w);}else g.textContent=r==="egg"?"🥚":"🌱";}catch{g.textContent=r==="egg"?"🥚":"🌱";}const h=r==="egg"?c.maturedAt:c.endTime,b=new Date(h).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}).toLowerCase(),y=x("span",{className:"dropdown-text"});y.textContent=`${p} - ${b}`,f.appendChild(g),f.appendChild(y),f.onclick=w=>{w.stopPropagation();const S=this.expandedTeams.get(o);S&&(S.pinnedItemId=u,this.updateGrowthSummary(o)),i.remove();},i.appendChild(f);});}const s=t.getBoundingClientRect();i.style.position="fixed",i.style.bottom=`${window.innerHeight-s.top+4}px`,i.style.top="auto",i.style.left="auto",i.style.right=`${window.innerWidth-s.right}px`,i.style.marginTop="0",i.style.zIndex="999999",document.body.appendChild(i);const l=d=>{!i.contains(d.target)&&d.target!==t&&(i.remove(),document.removeEventListener("click",l,true));};setTimeout(()=>document.addEventListener("click",l,true),10);}createIndividualPetRow(t,n,r,o,a,i,s){const l=n?o.filter(T=>!T.hasContent||T.hasContent(n,t)):o,d=l.length>0?l:o;let c=d[0];if(s)c=d.find(T=>T.id===s)||d[0];else if(n){const T=nT(n,d);c=d.find(v=>v.id===T)||d[0];}else {const v=No(t)?.suggestedFeatures||[];let C=false;for(const I of v){const k=d.find(A=>A.id===I);if(k){c=k,C=true;break}}C||(a?c=d.find(I=>I.id==="growth")||d[0]:c=d.find(I=>I.id==="xp")||d[0]);}const u=x("div",{className:"expanded-pet-row"}),p=x("div",{className:"pet-row__header"}),f=x("button",{textContent:"<",className:"pet-row__nav"}),g=x("div",{textContent:`${c.icon} ${c.label.toUpperCase()}`,className:"pet-label"}),h=x("button",{textContent:">",className:"pet-row__nav"});let m=null;n&&(m=new Fk(n));const b={slotIndex:r,currentFeatureId:c.id,shell:m,featureData:c},y=T=>{const v=d[T];if(v.id==="growth"){const C=ae.getPetsForTeam(t),I=this.expandedTeams.get(i),k=this.analyzeTeamForGrouping(t,C,I?.growthViewType);if(k.shouldGroup&&k.matchingPets.length>=2){this.collapseAndReexpandForGrowth(i);return}}if(g.textContent=`${v.icon} ${v.label.toUpperCase()}`,m&&n){const C=m.getContentSlot();if(C.innerHTML="",v.renderPetSlot){const A=this.expandedTeams.get(i);v.renderPetSlot(n,t,C,A?.growthViewType);}const I=n.currentStrength>=n.maxStrength,k=C.children.length>0||C.textContent.trim().length>0;m.setCentered(I&&!k);}b.currentFeatureId=v.id,b.featureData=v,p.className=`pet-row__header pet-row__header--${v.id}`,this.updateProgressBarForFeature(i,v.id);};p.className=`pet-row__header pet-row__header--${c.id}`;let w=d.findIndex(T=>T.id===c.id);f.addEventListener("click",T=>{T.stopPropagation(),w=(w-1+d.length)%d.length,y(w);}),h.addEventListener("click",T=>{T.stopPropagation(),w=(w+1)%d.length,y(w);}),d.length>1&&p.appendChild(f),p.appendChild(g),d.length>1&&p.appendChild(h);let S;if(m&&n){if(S=m.build(),c.renderPetSlot){const T=m.getContentSlot();c.renderPetSlot(n,t,T,a);const v=n.currentStrength>=n.maxStrength,C=T.children.length>0||T.textContent.trim().length>0;m.setCentered(v&&!C);}}else S=x("div",{className:"pet-row__content pet-row__content--empty"}),S.innerHTML=`
                <div class="pet-row__sprite"><div class="pet-row__empty-slot">Empty</div></div>
                <div class="pet-row__info"><span class="pet-row__empty-text">No pet assigned</span></div>
            `;return u.appendChild(p),u.appendChild(S),b.container=u,{container:u,cardState:b}}createGroupedPetRow(t,n,r,o,a,i){const s=r.filter(C=>!C.hasContent||C.hasContent(n,t)),l=s.length>0?s:r;if(this.shouldUseCombinedPanel(l,n,t,a))return this.createCombinedPanelRow(t,n,l,a,i);const d=x("div",{className:"expanded-pet-row expanded-pet-row--grouped"}),c=x("div",{className:"pet-row__header"}),u=x("button",{textContent:"<",className:"pet-row__nav"}),p=x("div",{textContent:`${o.icon} ${o.label.toUpperCase()}`,className:"pet-label"}),f=x("button",{textContent:">",className:"pet-row__nav"}),g=x("div",{className:`base-pet-card base-pet-card--grouped${n.length===2?"-2":""}`}),h=x("div",{className:"base-pet-card__left"}),m=x("div",{className:`grouped-sprite-container${n.length===2?" grouped-sprite-container--duo":""}`});for(const C of n)try{const I=C.mutations||[];if(j.has("pet",C.petSpecies)){const k=j.toCanvas("pet",C.petSpecies,{mutations:I,scale:1,boundsMode:"padded"});k.style.imageRendering="pixelated",m.appendChild(k);}}catch{}h.appendChild(m);const b=x("div",{className:`grouped-badges${n.length===2?" grouped-badges--duo":""}`});for(const C of n){const k=C.currentStrength>=C.maxStrength?`MAX ${C.maxStrength}`:`STR ${C.currentStrength}/${C.maxStrength}`,A=x("span",{className:"badge badge--neutral badge--soft badge--sm badge--pill",textContent:k});b.appendChild(A);}h.appendChild(b),g.appendChild(h);const y=x("div",{className:"base-pet-card__content"});g.appendChild(y);const w={root:g,getContentSlot:()=>y,setCentered:C=>{g.classList.toggle("base-pet-card--centered",C);},destroy:()=>{g.remove();},update:()=>{b.innerHTML="";for(const C of n){const k=C.currentStrength>=C.maxStrength?`MAX ${C.maxStrength}`:`STR ${C.currentStrength}/${C.maxStrength}`,A=x("span",{className:"badge badge--neutral badge--soft badge--sm badge--pill",textContent:k});b.appendChild(A);}}},S={slotIndex:-1,currentFeatureId:o.id,shell:w,featureData:o},T=C=>{const I=l[C];if(I.id==="xp"&&!n.every(E=>E.currentStrength>=E.maxStrength)){this.collapseAndReexpandForXP(i);return}if(p.textContent=`${I.icon} ${I.label.toUpperCase()}`,y.innerHTML="",I.renderGroupedSlot){const A=this.expandedTeams.get(i);I.renderGroupedSlot(n,t,y,A?.growthViewType);}else if(I.renderPetSlot){const A=this.expandedTeams.get(i);I.renderPetSlot(n[0],t,y,A?.growthViewType);}const k=y.children.length>0||y.textContent.trim().length>0;w.setCentered(!k),S.currentFeatureId=I.id,S.featureData=I,c.className=`pet-row__header pet-row__header--${I.id}`;};c.className=`pet-row__header pet-row__header--${o.id}`;let v=l.findIndex(C=>C.id===o.id);return u.addEventListener("click",C=>{C.stopPropagation(),v=(v-1+l.length)%l.length,T(v);}),f.addEventListener("click",C=>{C.stopPropagation(),v=(v+1)%l.length,T(v);}),l.length>1&&c.appendChild(u),c.appendChild(p),l.length>1&&c.appendChild(f),o.renderGroupedSlot?o.renderGroupedSlot(n,t,y,a):o.renderPetSlot&&o.renderPetSlot(n[0],t,y,a),d.appendChild(c),d.appendChild(g),g.classList.add("base-pet-card--grouped"),{container:d,cardState:{...S,container:d}}}collapseAndReexpandForXP(t){const n=this.expandedTeams.get(t);if(!n){this.collapse(t),setTimeout(()=>this.expand(t,true,"xp"),100);return}n.container.style.transition="opacity 0.15s ease-out",n.container.style.opacity="0.4",requestAnimationFrame(()=>{requestAnimationFrame(()=>{this.rebuildInPlace(t,true,"xp"),n.container.style.opacity="1";});});}collapseAndReexpandForGrowth(t){const n=this.expandedTeams.get(t);if(!n){this.collapse(t),setTimeout(()=>this.expand(t,false,"growth"),100);return}n.container.style.transition="opacity 0.15s ease-out",n.container.style.opacity="0.4",requestAnimationFrame(()=>{requestAnimationFrame(()=>{this.rebuildInPlace(t,false,"growth"),n.container.style.opacity="1";});});}rebuildInPlace(t,n,r){const o=this.expandedTeams.get(t);if(!o)return;const a=ae.getTeam(t);if(!a)return;const i=ae.getPetsForTeam(a),s=le.myPets.get(),l=this.getAvailableFeaturesForTeam(a,i),d=o.growthViewType;for(const h of o.cards)h.shell&&h.shell.destroy(),h.container&&h.container.parentNode&&h.container.remove();const c=o.container.querySelector(".team-progress-bar");c&&c.remove();const u=[];let p=n?{shouldGroup:false,matchingPets:[],remainingPets:i}:this.analyzeTeamForGrouping(a,i,d);const f=l.some(h=>h.id==="growth"||h.id==="hatch"||h.id==="coin");if(p.shouldGroup&&!f&&(p.matchingPets.every(m=>m.currentStrength>=m.maxStrength)||(p={shouldGroup:false,matchingPets:[],remainingPets:i})),p.shouldGroup&&p.matchingPets.length>=2){const h=l.filter(y=>!y.hasContent||y.hasContent(p.matchingPets,a)),m=h.find(y=>y.id==="growth"||y.id==="hatch"||y.id==="coin")||h[0]||l[0],b=this.createGroupedPetRow(a,p.matchingPets,l,m,d,t);o.container.appendChild(b.container),u.push(b.cardState);for(const y of p.remainingPets){const w=a.petIds.indexOf(y.id),S=this.createIndividualPetRow(a,y,w,l,d,t);o.container.appendChild(S.container),u.push(S.cardState);}}else for(let h=0;h<3;h++){const m=a.petIds[h],b=m?s.all.find(w=>w.id===m)??null:null,y=this.createIndividualPetRow(a,b,h,l,d,t,r);o.container.appendChild(y.container),u.push(y.cardState);}o.cards=u;const g=r==="xp"?"xp":r==="growth"?"growth":void 0;this.addProgressBar(o.container,i,t,g);}getAvailableFeaturesForTeam(t,n){return No(t),ud.filter(r=>r.isAvailable())}countTotalRows(t,n,r,o){let a=0;for(const i of t)i.countRows?a+=i.countRows(n,r,o):i.hasContent?.(n,r)&&(a+=1);return a}shouldUseCombinedPanel(t,n,r,o){return t.length<2?false:this.countTotalRows(t,n,r,o)<=tT}createCombinedPanelRow(t,n,r,o,a){const i=x("div",{className:"expanded-pet-row expanded-pet-row--combined"}),s=x("div",{className:"pet-row__header pet-row__header--combined"}),l=x("span",{className:"combined-panel__icons",textContent:r.map(b=>b.icon).join(" ")});s.appendChild(l);const d=x("div",{textContent:"COMBINED",className:"pet-label"});s.appendChild(d);const c=x("div",{className:`base-pet-card base-pet-card--grouped${n.length===2?"-2":""}`}),u=x("div",{className:"base-pet-card__left"}),p=x("div",{className:`grouped-sprite-container${n.length===2?" grouped-sprite-container--duo":""}`});for(const b of n)try{const y=b.mutations||[];if(j.has("pet",b.petSpecies)){const w=j.toCanvas("pet",b.petSpecies,{mutations:y,scale:1,boundsMode:"padded"});w.style.imageRendering="pixelated",p.appendChild(w);}}catch{}u.appendChild(p);const f=x("div",{className:`grouped-badges${n.length===2?" grouped-badges--duo":""}`});for(const b of n){const w=b.currentStrength>=b.maxStrength?`MAX ${b.maxStrength}`:`STR ${b.currentStrength}/${b.maxStrength}`,S=x("span",{className:"badge badge--neutral badge--soft badge--sm badge--pill",textContent:w});f.appendChild(S);}u.appendChild(f),c.appendChild(u);const g=x("div",{className:"base-pet-card__content base-pet-card__content--combined"});for(const b of r){const y=x("div",{className:`combined-section combined-section--${b.id}`}),w=x("span",{className:"combined-section__icon",textContent:b.icon});y.appendChild(w);const S=x("div",{className:"combined-section__content"});b.renderGroupedSlot?b.renderGroupedSlot(n,t,S,o):b.renderPetSlot&&b.renderPetSlot(n[0],t,S,o),(S.children.length>0||S.textContent?.trim())&&(y.appendChild(S),g.appendChild(y));}c.appendChild(g);const m={slotIndex:-1,currentFeatureId:"combined",shell:{root:c,getContentSlot:()=>g,setCentered:b=>{c.classList.toggle("base-pet-card--centered",b);},destroy:()=>{c.remove();},update:()=>{f.innerHTML="";for(const b of n){const w=b.currentStrength>=b.maxStrength?`MAX ${b.maxStrength}`:`STR ${b.currentStrength}/${b.maxStrength}`,S=x("span",{className:"badge badge--neutral badge--soft badge--sm badge--pill",textContent:w});f.appendChild(S);}},build:()=>c},container:i,featureData:r[0]};return i.appendChild(s),i.appendChild(c),{container:i,cardState:m}}analyzeTeamForGrouping(t,n,r){const o=d=>(d.abilities||[]).some(u=>U.MAX_STR_BOOST.includes(u)||U.PET_MUTATION.includes(u)||U.DOUBLE_HATCH.includes(u)||U.PET_REFUND.includes(u)),a=n.filter(o);if(a.length>=2&&a.length<=3){const d=n.filter(c=>!a.includes(c));return {shouldGroup:true,matchingPets:a,remainingPets:d}}const i=["DoubleHarvest","ProduceRefund","ProduceRefundII"],s=d=>(d.abilities||[]).some(u=>i.includes(u)),l=n.filter(s);if(l.length>=2&&l.length<=3&&!l.some(c=>(c.abilities||[]).some(p=>U.EGG_GROWTH.includes(p)||U.PLANT_GROWTH.includes(p)||U.CROP_MUTATION.includes(p)))){const c=n.filter(u=>!l.includes(u));return {shouldGroup:true,matchingPets:l,remainingPets:c}}return eT(n,r)}startUpdates(){if(this.featureUpdateInterval!==null)return;const n=Ve.detect().platform==="mobile"?8e3:5e3;this.featureUpdateInterval=setInterval(()=>{this.updateAllFeatures();},n);}stopUpdates(){this.featureUpdateInterval!==null&&(clearInterval(this.featureUpdateInterval),this.featureUpdateInterval=null);}updateAllFeatures(){for(const[t,n]of this.expandedTeams)this.updateSpecificTeam(t,n);}}const oT={mode:"simple",expandedTeamIds:[]};let nt=null,Ii=null;async function aT(){return nt||(Ii||(Ii=Xr("tab-trackers",{version:2,defaults:oT})),nt=await Ii,nt)}function _i(){if(!nt)throw new Error("[TrackersState] State not initialized. Call initTrackersState() first.");return nt}function iT(e){if(!nt)return;const t=nt.get();t.expandedTeamIds.includes(e)?nt.update({expandedTeamIds:t.expandedTeamIds.filter(r=>r!==e)}):nt.update({expandedTeamIds:[...t.expandedTeamIds,e]});}function sT(e){nt&&nt.update({mode:e});}class lT{constructor(t){R(this,"card",null);R(this,"modeControl",null);R(this,"modeContainer",null);R(this,"content",null);R(this,"listContainer",null);R(this,"options");R(this,"expansionHandler");this.options=t,this.expansionHandler=new rT({getListContainer:()=>this.listContainer});}build(){return this.card?this.card:this.createCard()}destroy(){this.expansionHandler.destroy(),this.modeControl&&(this.modeControl.destroy(),this.modeControl=null),this.card=null,this.modeContainer=null,this.content=null,this.listContainer=null;}render(){if(!this.card)return;if(!ae.isEnabled()){this.renderDisabledState();return}this.modeContainer&&(this.modeContainer.style.display="flex"),this.ensureModeControl(),this.renderTeamList();}getListContainer(){return this.listContainer}createCard(){const t=x("div",{className:"tracker-card-wrapper"});this.modeContainer=x("div",{className:"tracker-card__mode-container"}),t.appendChild(this.modeContainer),this.content=x("div",{className:"tracker-card__content"}),t.appendChild(this.content);const n=We({title:"Trackers",expandable:true,defaultExpanded:true},t);return this.card=n,n}ensureModeControl(){if(!this.modeContainer)return;const t=_i().get();if(!this.modeControl){this.modeControl=lg({segments:[{id:"simple",label:"Simple"},{id:"detailed",label:"Detailed"}],selected:t.mode,onChange:n=>{sT(n),this.renderTeamList();}}),this.modeContainer.appendChild(this.modeControl);return}this.modeControl.getSelected()!==t.mode&&this.modeControl.select(t.mode);}renderDisabledState(){if(!this.content)return;this.expansionHandler.cleanupAll(),this.listContainer=null,this.modeContainer&&(this.modeContainer.style.display="none");const t=x("div",{className:"tracker-card__disabled-state"}),n=x("div",{textContent:"Pet Teams feature is not enabled",className:"tracker-card__disabled-message"});t.appendChild(n),this.content.replaceChildren(t);}renderTeamList(){if(!this.content)return;this.expansionHandler.cleanupAll(),this.content.replaceChildren();const t=ae.getAllTeams(),n=ae.getActiveTeamId(),r=_i().get();if(t.length===0){this.renderEmptyState();return}this.listContainer=x("div",{className:"tracker-card__list-container"}),t.forEach(o=>{const a=n===o.id,i=r.expandedTeamIds.includes(o.id),s=sg({team:o,isActive:a,hideDragHandle:true,isNameEditable:false,isExpanded:i,onExpandClick:()=>{this.handleExpandToggle(o.id);}});s.setAttribute("data-team-id",o.id),s.addEventListener("click",l=>{l.stopPropagation();}),this.listContainer.appendChild(s),i&&this.expansionHandler.expand(o.id);}),this.content.appendChild(this.listContainer);}renderEmptyState(){if(!this.content)return;const t=x("div",{className:"tracker-card__empty-state"}),n=x("div",{textContent:"No teams created yet.",className:"tracker-card__empty-message"}),r=x("div",{textContent:"Create teams in the Pets tab to view trackers.",className:"tracker-card__empty-hint"});t.appendChild(n),t.appendChild(r),this.content.appendChild(t);}handleExpandToggle(t){iT(t),this.expansionHandler.toggle(t);const n=this.listContainer?.querySelector(`[data-team-id="${t}"]`);if(n){const r=_i().get().expandedTeamIds.includes(t),o=n.querySelector(".team-list-item__expand");o&&o.classList.toggle("team-list-item__expand--open",r);}}}const cT=`
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
`,dT=`
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

`,uT=`
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
`,pT=`
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
`,fT=`
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
`;class gT extends sn{constructor(n){super({id:"tab-trackers",label:"Trackers"});R(this,"deps");R(this,"trackerCardPart",null);R(this,"unsubscribeMyPets");this.deps=n;}async build(n){this.container=n;const{MGSprite:r}=await Bn(async()=>{const{MGSprite:i}=await Promise.resolve().then(()=>dl);return {MGSprite:i}},void 0);await r.init(),await aT();const o=n.getRootNode();this.injectStyles(o);const a=this.createGrid("12px");a.id="trackers",n.appendChild(a),this.initializeTrackerCard(a),this.unsubscribeMyPets=le.myPets.subscribeStable(()=>{this.trackerCardPart?.render();});}async destroy(){this.unsubscribeMyPets&&(this.unsubscribeMyPets(),this.unsubscribeMyPets=void 0),this.trackerCardPart&&(this.trackerCardPart.destroy(),this.trackerCardPart=null);}unmount(){this.destroy().catch(console.error),super.unmount();}injectStyles(n){ve(n,cT,"tracker-card-styles"),ve(n,dT,"team-card-styles"),ve(n,uT,"feature-card-styles"),ve(n,pT,"team-xp-panel-styles"),ve(n,fT,"growth-panel-styles"),ve(n,ug,"base-pet-card-styles"),ve(n,Fl,"badge-styles"),ve(n,pg,"arcade-button-styles"),ve(n,cg,"gemini-icon-button-styles");}initializeTrackerCard(n){this.trackerCardPart||(this.trackerCardPart=new lT({setHUDOpen:this.deps?.setHUDOpen}));const r=this.trackerCardPart.build();n.appendChild(r),this.trackerCardPart.render();}}const hT=`
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
`;async function mT(){}const bT={seed:"Seeds",tool:"Tools",egg:"Eggs",decor:"Decor"},fd={seed:"🌱",tool:"🔧",egg:"🥚",decor:"🎨"},xT={seed:"plants",tool:"items",egg:"eggs",decor:"decor"},yT={seed:"seed",tool:null,egg:null,decor:null},gd={common:0,uncommon:1,rare:2,legendary:3,mythical:4,divine:5,celestial:6};function Bl(e,t,n){try{const r=xT[t],o=V.get(r);if(!o||typeof o!="object")return null;const a=o[e];if(!a||typeof a!="object")return null;const i=yT[t],s=i?a[i]:a;return !s||typeof s!="object"?null:s[n]??null}catch(r){return console.warn(`[Alerts] Failed to get ${n} for ${e}:`,r),null}}function vT(e,t){return Bl(e,t,"spriteId")}function wT(e,t){const n=Bl(e,t,"rarity");return n?String(n).toLowerCase():null}function ST(e,t){return Bl(e,t,"name")??e}function CT(){const e=Bt.getTrackedItems();return new Set(e.map(t=>`${t.shopType}:${t.itemId}`))}function hd(e){const t=CT(),n=[],r=["seed","tool","egg","decor"];for(const o of r){const a=e.byType[o];if(a)for(const i of a.items){const s=`${o}:${i.id}`;n.push({...i,shopType:o,rarity:wT(i.id,o),spriteId:vT(i.id,o),itemName:ST(i.id,o),isTracked:t.has(s)});}}return n}function kT(e){const{rows:t}=e,n=new Map,o=ka({columns:[{key:"item",header:"Item",width:"1fr",align:"left",sortable:true,sortFn:(p,f)=>p.itemName.localeCompare(f.itemName,void 0,{numeric:true,sensitivity:"base"}),render:p=>{const f=x("div",{className:"shop-item-cell"}),g=x("div",{className:"shop-item-icon"});if(p.spriteId){const m=j.toCanvas(p.spriteId);m?(m.className="shop-item-sprite",g.appendChild(m)):g.textContent=fd[p.shopType];}else g.textContent=fd[p.shopType];const h=x("div",{className:"shop-item-name"});return h.textContent=p.itemName,f.appendChild(g),f.appendChild(h),f}},{key:"rarity",header:"Rarity",width:"120px",align:"center",sortable:true,sortFn:(p,f)=>{const g=p.rarity?gd[p.rarity.toLowerCase()]??999:999,h=f.rarity?gd[f.rarity.toLowerCase()]??999:999;return g-h},render:p=>{const f=x("div",{className:"shop-item-rarity"}),g=to({variant:"rarity",rarity:p.rarity});return f.appendChild(g.root),f}},{key:"notify",header:"Notify",width:"60px",align:"center",sortable:false,render:p=>{const f=x("div",{className:"shop-item-notify"}),g=Xc(p.id,p.shopType),h=Rn({checked:p.isTracked,disabled:g,size:"sm",onChange:b=>{p.isTracked=b,b?Bt.addTrackedItem(p.shopType,p.id):Bt.removeTrackedItem(p.shopType,p.id);}}),m=`${p.shopType}:${p.id}`;return n.set(m,h),f.appendChild(h.root),f}}],data:t,maxHeight:400,stickyHeader:true,zebra:true,compact:true,getRowId:p=>`${p.shopType}:${p.id}`}),a=p=>{for(const[f,g]of n.entries()){const[h,m]=f.split(":");if(p&&h!==p)continue;const b=Xc(m,h);g.setDisabled(b);}},s=ft().subscribeStable(()=>{a();}),l=Ha(),d=l.subscribeDecorPlaced(()=>{a("decor");}),c=l.subscribeDecorRemoved(()=>{a("decor");}),u=o.destroy.bind(o);return o.destroy=()=>{s(),d(),c(),n.clear(),u();},o}function TT(e){let t="";for(const n of e)n.length>t.length&&(t=n);return t}function IT(e,t){const n=e.getRootNode(),r=n instanceof ShadowRoot?n:document.body||document.documentElement;if(!r)return 0;const o=x("div",{className:"select"});for(const c of Array.from(e.classList))c.startsWith("select--")&&o.classList.add(c);o.style.position="absolute",o.style.visibility="hidden",o.style.pointerEvents="none",o.style.left="-9999px",o.style.top="-9999px",o.style.minWidth="0";const a=x("button",{className:"select-trigger",type:"button"});a.style.width="auto",a.style.minWidth="0",a.style.whiteSpace="nowrap";const i=e.querySelector(".select-caret")?.textContent||"v",s=x("span",{className:"select-value"},t),l=x("span",{className:"select-caret"},i);a.append(s,l),o.appendChild(a),r.appendChild(o);const d=Math.ceil(a.getBoundingClientRect().width);return o.remove(),d}function _T(e,t){const n=TT(t);if(!n)return;let r=0;const o=6,a=()=>{if(r+=1,!e.isConnected){r<o&&requestAnimationFrame(a);return}const i=IT(e,n);i>0&&(e.style.width=`${i}px`,e.style.minWidth=`${i}px`);};requestAnimationFrame(a);}function AT(){const e=zn(),t=e.get();let n=null,r=[],o=[];const a={selectedShopType:"all",searchQuery:""},i={shopTypeSelect:null,searchInput:null,tableHandle:null};let s=0,l=new Set;function d(h,m){if(h.size!==m.size)return  false;for(const b of h)if(!m.has(b))return  false;return  true}function c(){if(!i.tableHandle)return;const h=r.filter(m=>!(a.selectedShopType!=="all"&&m.shopType!==a.selectedShopType||a.searchQuery&&!m.itemName.toLowerCase().includes(a.searchQuery.toLowerCase())));o=h,i.tableHandle.setData(h);}function u(){const h=x("div",{className:"shops-card-filters"}),b=[{value:"all",label:"All Shops"},...["seed","tool","egg","decor"].map(w=>({value:w,label:bT[w]}))];i.shopTypeSelect=Fd({value:"all",options:b,size:"sm",onChange:w=>{a.selectedShopType=w,c();}});const y=i.shopTypeSelect.root;return y.style.minWidth="0",y.style.width="auto",_T(y,b.map(w=>w.label)),i.searchInput=Ta({placeholder:"Search items...",size:"sm",debounceMs:150,autoSearch:true,withClear:true,blockGameKeys:true,focusKey:"",onSearch:w=>{a.searchQuery=w.trim(),c();}}),h.appendChild(i.shopTypeSelect.root),h.appendChild(i.searchInput.root),h}function p(){r=hd(t),o=[...r],s=r.length,l=new Set(r.map(b=>b.shopType));const h=x("div");i.tableHandle=kT({rows:o});const m=u();return h.appendChild(m),h.appendChild(i.tableHandle.root),n=We({id:"shops-card",title:"Shops",expandable:true,defaultExpanded:true,stateKey:"shops",variant:"soft",padding:"none",divider:false},h),n}function f(){const h=e.get(),m=hd(h),b=m.length,y=new Set(m.map(S=>S.shopType));(b!==s||!d(y,l))&&(s=b,l=y,r=m,c());}function g(){if(i.tableHandle&&(i.tableHandle.destroy(),i.tableHandle=null),i.shopTypeSelect&&(i.shopTypeSelect.destroy(),i.shopTypeSelect=null),i.searchInput){const h=i.searchInput.root.__cleanup;h&&h(),i.searchInput=null;}n=null;}return {root:p(),refresh:f,destroy:g}}function PT(e){try{const t=V.get("weather");if(!t||typeof t!="object")return e;const n=t[e];return !n||typeof n!="object"?e:n.name||e}catch{return e}}function ET(e){try{const t=V.get("weather");if(!t||typeof t!="object")return null;const n=t[e];return !n||typeof n!="object"?null:n.spriteId||null}catch{return null}}function MT(e){try{const t=V.get("weather");if(!t||typeof t!="object")return "No effects";const n=t[e];if(!n||typeof n!="object")return "No effects";const r=n.mutator;if(!r||typeof r!="object")return "No effects";const o=r.mutation;if(!o)return "No effects";const a=V.get("mutations");if(!a||typeof a!="object")return o;const i=a[o];return !i||typeof i!="object"?o:i.name||o}catch{return "No effects"}}function md(){const e=V.get("weather");if(!e||typeof e!="object")return [];const t=an.getTrackedWeathers(),n=new Set(t),r=[];for(const o of Object.keys(e)){if(o==="Sunny")continue;const a={weatherId:o,weatherName:PT(o),spriteId:ET(o),effects:MT(o),isTracked:n.has(o)};r.push(a);}return r.sort((o,a)=>o.weatherName.localeCompare(a.weatherName)),r}function RT(e){const{rows:t}=e;return ka({columns:[{key:"weather",header:"Weather",width:"1fr",align:"left",sortable:true,sortFn:(o,a)=>o.weatherName.localeCompare(a.weatherName,void 0,{numeric:true,sensitivity:"base"}),render:o=>{const a=x("div",{className:"weather-item-cell"}),i=x("div",{className:"weather-item-icon"});if(o.spriteId){const l=j.toCanvas(o.spriteId);l?(l.className="weather-item-sprite",i.appendChild(l)):i.textContent=bd(o.weatherId);}else i.textContent=bd(o.weatherId);const s=x("div",{className:"weather-item-name"});return s.textContent=o.weatherName,a.appendChild(i),a.appendChild(s),a}},{key:"effects",header:"Effects",width:"120px",align:"center",sortable:false,render:o=>{const a=x("div",{className:"weather-item-effects"});return a.textContent=o.effects,a}},{key:"notify",header:"Notify",width:"60px",align:"center",sortable:false,render:o=>{const a=x("div",{className:"weather-item-notify"}),i=Rn({checked:o.isTracked,disabled:false,size:"sm",onChange:s=>{o.isTracked=s,s?an.addTrackedWeather(o.weatherId):an.removeTrackedWeather(o.weatherId);}});return a.appendChild(i.root),a}}],data:t,maxHeight:280,stickyHeader:true,zebra:true,compact:true,getRowId:o=>o.weatherId})}function bd(e){return {Sunny:"☀️",Rain:"🌧️",Frost:"❄️",Dawn:"🌅",AmberMoon:"🌕"}[e]||"🌤️"}function LT(){let e=null,t=[];const n={tableHandle:null};let r=0;function o(){t=md(),r=t.length;const s=x("div");return n.tableHandle=RT({rows:t}),s.appendChild(n.tableHandle.root),e=We({id:"weather-card",title:"Weather",expandable:true,defaultExpanded:true,stateKey:"weather",variant:"soft",padding:"none",divider:false},s),e}function a(){const s=md(),l=s.length;l!==r&&(r=l,t=s,n.tableHandle?.setData(s));}function i(){n.tableHandle&&(n.tableHandle.destroy(),n.tableHandle=null),e=null;}return {root:o(),refresh:a,destroy:i}}class NT extends sn{constructor(){super({id:"tab-alerts",label:"Alerts"});R(this,"sectionElement",null);R(this,"shopsCard",null);R(this,"weatherCard",null);}async build(n){await mT();const r=n.getRootNode();ve(r,hT,"alerts-styles");const o=this.createGrid("12px");o.id="alerts-section",this.sectionElement=o;const{MGData:a}=await Bn(async()=>{const{MGData:i}=await Promise.resolve().then(()=>dl);return {MGData:i}},void 0);await Promise.all([a.waitFor("plants"),a.waitFor("items"),a.waitFor("eggs"),a.waitFor("decor"),a.waitFor("weather"),a.waitFor("mutations")]),this.buildParts(),n.appendChild(o);}render(n){const r=this.shopsCard,o=this.weatherCard;this.shopsCard=null,this.weatherCard=null,super.render(n),this.shopsCard=r,this.weatherCard=o;}buildParts(){this.sectionElement&&(this.shopsCard=AT(),this.sectionElement.appendChild(this.shopsCard.root),this.weatherCard=LT(),this.sectionElement.appendChild(this.weatherCard.root));}async destroy(){this.shopsCard&&(this.shopsCard.destroy(),this.shopsCard=null),this.weatherCard&&(this.weatherCard.destroy(),this.weatherCard=null),this.sectionElement=null;}}const FT={Store:{select:ge.select.bind(ge),set:ge.set.bind(ge),subscribe:ge.subscribe.bind(ge),subscribeImmediate:ge.subscribeImmediate.bind(ge)},Globals:le,Modules:{Version:_s,Assets:ln,Manifest:kt,Data:V,Environment:Ve,CustomModal:Sn,Sprite:j,Tile:Tt,Pixi:Ra,Audio:$t,Cosmetic:Ks,Calculators:Cp,ShopActions:Kt},Features:{AutoFavorite:gl,JournalChecker:qp,BulkFavorite:ma,Achievements:Qp,Tracker:ag,AntiAfk:tn,Pets:ig,PetTeam:ae,XPTracker:xa,CropValueIndicator:_r,CropSizeIndicator:Ar,ShopNotifier:Bt,WeatherNotifier:an},WebSocket:{chat:Fv,emote:Ov,wish:$v,kickPlayer:Bv,setPlayerData:Dv,usurpHost:Gv,reportSpeakingStart:zv,setSelectedGame:Hv,voteForGame:jv,requestGame:Wv,restartGame:Uv,ping:Vv,checkWeatherStatus:Kv,move:Xv,playerPosition:Ip,teleport:qv,moveInventoryItem:Yv,dropObject:Jv,pickupObject:Qv,toggleFavoriteItem:za,putItemInStorage:rl,retrieveItemFromStorage:ol,moveStorageItem:Zv,logItems:ew,plantSeed:tw,waterPlant:nw,harvestCrop:rw,sellAllCrops:ow,purchaseDecor:al,purchaseEgg:il,purchaseTool:sl,purchaseSeed:ll,plantEgg:aw,hatchEgg:iw,plantGardenPlant:sw,potPlant:lw,mutationPotion:cw,pickupDecor:dw,placeDecor:uw,removeGardenObject:pw,placePet:_p,feedPet:fw,petPositions:gw,swapPet:Ap,storePet:Pp,namePet:hw,sellPet:mw},_internal:{getGlobals:wt,initGlobals:Lp,destroyGlobals:bS}};function OT(){const e=N;e.Gemini=FT,e.MGSprite=j,e.MGData=V,e.MGPixi=Ra,e.MGAssets=ln,e.MGEnvironment=Ve;}let Ai=null,Pi=null;function $T(){return Ai||(Ai=new RS),Ai}function xg(){return Pi||(Pi=new NT),Pi}function BT(e){return [new Uh(e),new dk,new _k,xg(),new zk(e),new gT(e)]}async function DT(){const e=xg(),t=$T();await Promise.all([e.preload(),t.preload()]);}function GT(e){const{shadow:t,initialOpen:n}=e,r=x("div",{className:"gemini-panel",id:"panel",ariaHidden:String(!n)}),o=x("div",{className:"gemini-tabbar"}),a=x("div",{className:"gemini-content",id:"content"}),i=x("div",{className:"gemini-resizer",title:"Resize"}),s=x("button",{className:"gemini-close",title:"Fermer",ariaLabel:"Fermer"},"✕");r.append(o,a,i);const l=x("div",{className:"gemini-wrapper"},r);return t.append(l),{panel:r,tabbar:o,content:a,resizer:i,closeButton:s,wrapper:l}}function zT(e){const{resizer:t,host:n,shadow:r,onWidthChange:o,initialWidth:a,minWidth:i,maxWidth:s}=e;let l=i,d=s;function c(){const S=Ve.detect(),T=Math.round(N.visualViewport?.width??N.innerWidth??0);if(S.platform==="mobile"||S.os==="ios"||S.os==="android"){const v=getComputedStyle(r.host),C=parseFloat(v.getPropertyValue("--inset-l"))||0,I=parseFloat(v.getPropertyValue("--inset-r"))||0,k=Math.max(280,T-Math.round(C+I));l=280,d=k;}else l=i,d=s;return {min:l,max:d}}function u(S){return Math.max(l,Math.min(d,Number(S)||a))}function p(S){const T=u(S);n.style.setProperty("--w",`${T}px`),o(T);}c();const f=Ve.detect(),g=!(f.platform==="mobile"||f.os==="ios"||f.os==="android");let h=false;const m=S=>{if(!h)return;S.preventDefault();const T=Math.round(N.innerWidth-S.clientX);p(T);},b=()=>{h&&(h=false,document.body.style.cursor="",N.removeEventListener("mousemove",m),N.removeEventListener("mouseup",b));},y=S=>{g&&(S.preventDefault(),h=true,document.body.style.cursor="ew-resize",N.addEventListener("mousemove",m),N.addEventListener("mouseup",b));};t.addEventListener("mousedown",y);function w(){t.removeEventListener("mousedown",y),N.removeEventListener("mousemove",m),N.removeEventListener("mouseup",b);}return {calculateResponsiveBounds:c,constrainWidthToLimits:u,setHudWidth:p,destroy:w}}function HT(e){const{panel:t,onToggle:n,onClose:r,toggleCombo:o=l=>l.ctrlKey&&l.shiftKey&&l.key.toLowerCase()==="u",closeOnEscape:a=true}=e;function i(l){const d=t.classList.contains("open");if(a&&l.key==="Escape"&&d){r();return}o(l)&&(l.preventDefault(),l.stopPropagation(),n());}document.addEventListener("keydown",i,{capture:true});function s(){document.removeEventListener("keydown",i,{capture:true});}return {destroy:s}}const jT=`
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
`,WT=`
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
`,UT=`
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
`,VT=`
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
`,XT=`
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
  
`,qT=`
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
`,KT=`
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
`,YT=`
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
`,JT=`
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
`,QT=`
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
`,ZT=`
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
`,eI=`
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
`,tI=`
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
`,nI=`
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
`,rI=`
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
`,oI=`
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
`,aI=`
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
`,iI=`
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
`,sI=`
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
`,lI=`
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
`,cI=`
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
`,dI=`
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
`,uI=`
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
`,pI={all:"initial",position:"fixed",top:"0",right:"0",zIndex:"2147483647",pointerEvents:"auto",fontFamily:'system-ui, -apple-system, "Segoe UI", Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',fontSize:"13px",lineHeight:"1.35"};function fI(e="gemini-root"){const t=document.createElement("div");t.id=e,Object.assign(t.style,pI),(document.body||document.documentElement).appendChild(t);const n=t.attachShadow({mode:"open"});return {host:t,shadow:n}}function gI(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:16}):setTimeout(e,0);})}async function hI(e){const{hostId:t="gemini-hud-root",initialWidth:n,initialOpen:r,onWidthChange:o,onOpenChange:a,themes:i,initialTheme:s,onThemeChange:l,buildSections:d,initialTab:c,onTabChange:u,toggleCombo:p=Q=>Q.ctrlKey&&Q.shiftKey&&Q.key.toLowerCase()==="u",closeOnEscape:f=true,minWidth:g=420,maxWidth:h=720}=e,{host:m,shadow:b}=fI(t),y=[[WT,"variables"],[UT,"primitives"],[VT,"utilities"],[jT,"hud"],[XT,"card"],[Fl,"badge"],[qT,"button"],[tI,"checkbox"],[KT,"input"],[YT,"label"],[JT,"navTabs"],[QT,"searchBar"],[ZT,"select"],[eI,"switch"],[nI,"table"],[rI,"teamListItem"],[oI,"timeRangePicker"],[aI,"tooltip"],[iI,"slider"],[sI,"reorderableList"],[lI,"colorPicker"],[cI,"log"],[dI,"segmentedControl"],[uI,"settings"],[dg,"teamCard"],[Fp,"autoFavoriteSettings"]];for(let Q=0;Q<y.length;Q++){const[X,pe]=y[Q];ve(b,X,pe),Q%5===4&&await gI();}const{panel:w,tabbar:S,content:T,resizer:v,closeButton:C,wrapper:I}=GT({shadow:b,initialOpen:r});function k(Q){w.dispatchEvent(new CustomEvent("gemini:hud-open-change",{detail:{isOpen:Q},bubbles:true})),a?.(Q);}function A(Q){const X=w.classList.contains("open");w.classList.toggle("open",Q),w.setAttribute("aria-hidden",Q?"false":"true"),Q!==X&&k(Q);}A(r),C.addEventListener("click",Q=>{Q.preventDefault(),Q.stopPropagation(),A(false);});const E=Bh({host:m,themes:i,initialTheme:s,onThemeChange:l}),B=zT({resizer:v,host:m,shadow:b,onWidthChange:o||(()=>{}),initialWidth:n,minWidth:g,maxWidth:h});B.setHudWidth(n);const J=d({applyTheme:E.applyTheme,initialTheme:s,getCurrentTheme:E.getCurrentTheme,setHUDWidth:B.setHudWidth,setHUDOpen:A}),D=new zg(J,T,{applyTheme:E.applyTheme,getCurrentTheme:E.getCurrentTheme}),G=J.map(Q=>({id:Q.id,label:Q.label})),Y=c&&J.some(Q=>Q.id===c)?c:G[0]?.id||"",O=Gg(G,Y,Q=>{D.activate(Q),u?.(Q);});O.root.style.flex="1 1 auto",O.root.style.minWidth="0",S.append(O.root,C);const H={"tab-auto-favorite":"autoFavorite","tab-journal-checker":"journalChecker","tab-pets":"pets"};function z(){const Q=ye(we.CONFIG,{autoFavorite:{enabled:true},journalChecker:{enabled:true},pets:{enabled:true}});for(const[X,pe]of Object.entries(H))Q[pe]?.enabled??true?O.showTab(X):O.hideTab(X);}function $(Q){const{key:X}=Q.detail;(X===we.CONFIG||X==="feature:config")&&z();}window.addEventListener(Ul.STORAGE_CHANGE,$),z();let P=Y;if(!O.isTabVisible(Y)){const Q=O.getVisibleTabs();Q.length>0&&(P=Q[0]);}P&&D.activate(P);const L=HT({panel:w,onToggle:()=>A(!w.classList.contains("open")),onClose:()=>A(false),toggleCombo:p,closeOnEscape:f}),F=()=>{O.recalc();const Q=parseInt(getComputedStyle(m).getPropertyValue("--w"))||n;B.calculateResponsiveBounds(),B.setHudWidth(Q);};N.addEventListener("resize",F);const W=Q=>{const X=Q.detail?.width;X?B.setHudWidth(X):B.setHudWidth(n),O.recalc();};m.addEventListener("gemini:layout-resize",W);function xe(){window.removeEventListener(Ul.STORAGE_CHANGE,$),L.destroy(),B.destroy(),N.removeEventListener("resize",F),m.removeEventListener("gemini:layout-resize",W);}return {host:m,shadow:b,wrapper:I,panel:w,content:T,setOpen:A,setWidth:B.setHudWidth,sections:J,manager:D,nav:O,destroy:xe}}const vn={isOpen:"gemini.hud.isOpen",width:"gemini.hud.width",theme:"gemini.hud.theme",activeTab:"gemini.hud.activeTab"},mr={isOpen:false,width:480,theme:"dark",activeTab:"tab-settings"};function mI(){return {isOpen:ye(vn.isOpen,mr.isOpen),width:ye(vn.width,mr.width),theme:ye(vn.theme,mr.theme),activeTab:ye(vn.activeTab,mr.activeTab)}}function Do(e,t){Te(vn[e],t);}function bI(e,t){return ye(vn[e],t)}const xI="https://i.imgur.com/IMkhMur.png",yI="Stats";function vI(e){let t=e.iconUrl||xI;const n=e.ariaLabel||"Open MGH";let r=null,o=null,a=null,i=false,s=null,l=null;const d=["Chat","Leaderboard","Stats","Open Activity Log"],c=T=>{try{return typeof CSS<"u"&&CSS&&typeof CSS.escape=="function"?CSS.escape(T):T.replace(/"/g,'\\"')}catch{return T}};function u(){const T=document.querySelector(d.map(C=>`button[aria-label="${c(C)}"]`).join(","));if(!T)return null;let v=T.parentElement;for(;v&&v!==document.body;){if(d.reduce((I,k)=>I+v.querySelectorAll(`button[aria-label="${c(k)}"]`).length,0)>=2)return v;v=v.parentElement;}return null}function f(T){const v=Array.from(T.querySelectorAll("button[aria-label]"));if(!v.length)return {refBtn:null,refWrapper:null};const C=v.filter(D=>D.dataset.mghBtn!=="true"&&(D.getAttribute("aria-label")||"")!==(e.ariaLabel||"Open MGH")),I=C.length?C:v,k=I.find(D=>(D.getAttribute("aria-label")||"").toLowerCase()===yI.toLowerCase())||null,A=I.length>=2?I.length-2:I.length-1,E=k||I[A],B=E.parentElement,J=B&&B.parentElement===T&&B.tagName==="DIV"?B:null;return {refBtn:E,refWrapper:J}}function g(T,v,C){const I=T.cloneNode(false);I.type="button",I.setAttribute("aria-label",v),I.title=v,I.dataset.mghBtn="true",I.style.pointerEvents="auto",I.removeAttribute("id");const k=document.createElement("img");return k.src=C,k.alt="MGH",k.style.pointerEvents="none",k.style.userSelect="none",k.style.width="76%",k.style.height="76%",k.style.objectFit="contain",k.style.display="block",k.style.margin="auto",I.appendChild(k),I.addEventListener("click",A=>{A.preventDefault(),A.stopPropagation();try{e.onClick?.();}catch{}}),I}function h(){if(i)return  false;i=true;let T=false;try{const v=u();if(!v)return !1;s!==v&&(s=v);const{refBtn:C,refWrapper:I}=f(v);if(!C)return !1;o=v.querySelector('div[data-mgh-wrapper="true"]'),!o&&I&&(o=I.cloneNode(!1),o.dataset.mghWrapper="true",o.removeAttribute("id"),T=!0);const k=o?.querySelector('button[data-mgh-btn="true"]')||null;r||(r=k),r||(r=g(C,n,t),o?o.appendChild(r):r.parentElement!==v&&v.appendChild(r),T=!0),o&&o.parentElement!==v&&(v.appendChild(o),T=!0);const A=v;if(A&&A!==l){try{w.disconnect();}catch{}l=A,w.observe(l,{childList:!0,subtree:!0});}return T}finally{i=false;}}const m=document.getElementById("App")||document.body;let b=null,y=false;const w=new MutationObserver(()=>{y&&r&&document.contains(r)||(r&&!document.contains(r)&&(console.warn("[ToolbarButton] Button was removed from DOM, will retry"),y=false,r=null,o=null),b===null&&(b=window.setTimeout(()=>{if(b=null,h()&&r&&document.contains(r)&&(y=true,console.log("[ToolbarButton] Successfully mounted (via observer)"),o)){const v=o.parentElement;v&&v.lastElementChild!==o&&v.appendChild(o);}},100)));});return h()&&r&&document.contains(r)?(y=true,console.log("[ToolbarButton] Successfully mounted (initial)")):console.log("[ToolbarButton] Initial mount failed, will retry via observer"),w.observe(m,{childList:true,subtree:true}),a=()=>w.disconnect(),()=>{try{a?.();}catch{}try{o?.remove();}catch{}}}const yg=[];function wI(){return yg.slice()}function SI(e){yg.push(e);}function vg(e){try{return JSON.parse(e)}catch{return}}function xd(e){if(typeof e=="string"){const t=vg(e);return t!==void 0?t:e}return e}function wg(e){if(e!=null){if(typeof e=="string"){const t=vg(e);return t!==void 0?wg(t):e}if(Array.isArray(e)&&typeof e[0]=="string")return e[0];if(typeof e=="object"){const t=e;return t.type??t.Type??t.kind??t.messageType}}}function CI(e){const t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function ne(e,t,n){const r=typeof t=="boolean"?t:true,o=typeof t=="function"?t:n,a=(i,s)=>{if(wg(i)!==e)return;const d=o(i,s);return d&&typeof d=="object"&&"kind"in d?d:typeof d=="boolean"?d?void 0:{kind:"drop"}:r?void 0:{kind:"drop"}};return SI(a),a}const or=new WeakSet,yd=new WeakMap;function kI(e){const t=e.pageWindow,n=!!e.debug,r=e.middlewares&&e.middlewares.length?e.middlewares:wI();if(!r.length)return ()=>{};const o=p=>({ws:p,pageWindow:t,debug:n}),a=(p,f)=>{let g=p;for(const h of r){const m=h(g,o(f));if(m){if(m.kind==="drop")return {kind:"drop"};m.kind==="replace"&&(g=m.message);}}return g!==p?{kind:"replace",message:g}:void 0};let i=null,s=null,l=null;const d=()=>{const p=t?.MagicCircle_RoomConnection,f=p?.sendMessage;if(!p||typeof f!="function")return  false;if(or.has(f))return  true;const g=f.bind(p);function h(...m){const b=m.length===1?m[0]:m,y=xd(b),w=a(y,CI(t));if(w?.kind==="drop"){n&&console.log("[WS] drop outgoing (RoomConnection.sendMessage)",y);return}if(w?.kind==="replace"){const S=w.message;return m.length>1&&Array.isArray(S)?(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",y,"=>",S),g(...S)):(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",y,"=>",S),g(S))}return g(...m)}or.add(h),yd.set(h,f);try{p.sendMessage=h,or.add(p.sendMessage),n&&console.log("[WS] outgoing patched via MagicCircle_RoomConnection.sendMessage");}catch{return  false}return i=()=>{try{p.sendMessage===h&&(p.sendMessage=f);}catch{}},true};(()=>{const p=t?.WebSocket?.prototype,f=p?.send;if(typeof f!="function"||or.has(f))return;function g(h){const m=xd(h),b=a(m,this);if(b?.kind==="drop"){n&&console.log("[WS] drop outgoing (ws.send)",m);return}if(b?.kind==="replace"){const y=b.message,w=typeof y=="string"||y instanceof ArrayBuffer||y instanceof Blob?y:JSON.stringify(y);return n&&console.log("[WS] replace outgoing (ws.send)",m,"=>",y),f.call(this,w)}return f.call(this,h)}or.add(g),yd.set(g,f);try{p.send=g,n&&console.log("[WS] outgoing patched via WebSocket.prototype.send");}catch{return}s=()=>{try{p.send===g&&(p.send=f);}catch{}};})();const u=e.waitForRoomConnectionMs??4e3;if(!d()&&u>0){const p=Date.now();l=setInterval(()=>{if(d()){clearInterval(l),l=null;return}Date.now()-p>u&&(clearInterval(l),l=null,n&&console.log("[WS] RoomConnection not found, only ws.send is patched"));},250);}return ()=>{if(l){try{clearInterval(l);}catch{}l=null;}if(i){try{i();}catch{}i=null;}if(s){try{s();}catch{}s=null;}}}(function(){try{const t=({ url: (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('__entry.js', document.baseURI).href) }),n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();const Sg=[];function TI(){return Sg.slice()}function vd(e){Sg.push(e);}function II(e){if(e!=null){if(typeof e=="object"){const t=e;if(typeof t.type=="string")return t.type;if(typeof t.Type=="string")return t.Type;if(typeof t.kind=="string")return t.kind;if(typeof t.messageType=="string")return t.messageType}if(Array.isArray(e)&&typeof e[0]=="string")return e[0]}}function _I(e){if(typeof e=="string")try{return JSON.parse(e)}catch{return e}return e}const Ei=Symbol.for("ariesmod.ws.handlers.patched");function Ee(e,t){if(typeof e=="string"){const o=e,a={match:i=>i.kind==="message"&&i.type===o,handle:t};return vd(a),a}const n=e,r={match:o=>o.kind==="close"&&o.code===n,handle:t};return vd(r),r}function AI(e,t=TI(),n={}){const r=n.pageWindow??window,o=!!n.debug;if(e[Ei])return ()=>{};e[Ei]=true;const a={ws:e,pageWindow:r,debug:o},i=u=>{for(const p of t)try{if(!p.match(u))continue;if(p.handle(u,a)===!0)return}catch(f){o&&console.error("[WS] handler error",f,u);}},s=u=>{const p=_I(u.data),f=II(p);i({kind:"message",raw:u.data,data:p,type:f});},l=u=>{i({kind:"close",code:u.code,reason:u.reason,wasClean:u.wasClean,event:u});},d=u=>i({kind:"open",event:u}),c=u=>i({kind:"error",event:u});return e.addEventListener("message",s),e.addEventListener("close",l),e.addEventListener("open",d),e.addEventListener("error",c),()=>{try{e.removeEventListener("message",s);}catch{}try{e.removeEventListener("close",l);}catch{}try{e.removeEventListener("open",d);}catch{}try{e.removeEventListener("error",c);}catch{}try{delete e[Ei];}catch{}}}(function(){try{const t=({ url: (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('__entry.js', document.baseURI).href) }),n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();Ee(pt.AuthenticationFailure,(e,t)=>{t.debug&&console.log("[WS][Close] Auth failure",e.code,e.reason);});Ee(pt.ConnectionSuperseded,(e,t)=>{t.debug&&console.log("[WS][Close] Superseded",e.code,e.reason);});Ee(pt.HeartbeatExpired,(e,t)=>{t.debug&&console.log("[WS][Close] Heartbeat expired",e.code,e.reason);});Ee(pt.PlayerKicked,(e,t)=>{t.debug&&console.log("[WS][Close] Player kicked",e.code,e.reason);});Ee(pt.PlayerLeftVoluntarily,(e,t)=>{t.debug&&console.log("[WS][Close] Player left voluntarily",e.code,e.reason);});Ee(pt.ReconnectInitiated,(e,t)=>{t.debug&&console.log("[WS][Close] Reconnect initiated",e.code,e.reason);});Ee(pt.ServerDisposed,(e,t)=>{t.debug&&console.log("[WS][Close] Server disposed",e.code,e.reason);});Ee(pt.UserSessionSuperseded,(e,t)=>{t.debug&&console.log("[WS][Close] User session superseded",e.code,e.reason);});Ee(pt.VersionExpired,(e,t)=>{t.debug&&console.log("[WS][Close] Version expired",e.code,e.reason);});Ee(pt.VersionMismatch,(e,t)=>{t.debug&&console.log("[WS][Close] Version mismatch",e.code,e.reason);});Ee(It.Config,(e,t)=>{t.debug&&console.log("[WS][STC] Config",e.data);});Ee(It.CurrencyTransaction,(e,t)=>{t.debug&&console.log("[WS][STC] CurrencyTransaction",e.data);});Ee(It.Emote,(e,t)=>{t.debug&&console.log("[WS][STC] Emote",e.data);});Ee(It.InappropriateContentRejected,(e,t)=>{t.debug&&console.log("[WS][STC] InappropriateContentRejected",e.data);});Ee(It.PartialState,(e,t)=>{t.debug&&console.log("[WS][STC] PartialState",e.data);});Ee(It.Pong,(e,t)=>{t.debug&&console.log("[WS][STC] Pong",e.data);});Ee(It.ServerErrorMessage,(e,t)=>{t.debug&&console.log("[WS][STC] ServerErrorMessage",e.data);});Ee(It.Welcome,(e,t)=>{t.debug&&console.log("[WS][STC] Welcome",e.data);});ne(M.PlantSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantSeed"),true));ne(M.WaterPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] WaterPlant"),true));ne(M.HarvestCrop,(e,t)=>(t.debug&&console.log("[MW][Garden] HarvestCrop"),true));ne(M.SellAllCrops,(e,t)=>(t.debug&&console.log("[MW][Garden] SellAllCrops"),true));ne(M.PurchaseSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseSeed"),true));ne(M.PurchaseEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseEgg"),true));ne(M.PurchaseTool,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseTool"),true));ne(M.PurchaseDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseDecor"),true));ne(M.PlantEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantEgg"),true));ne(M.HatchEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] HatchEgg"),true));ne(M.PlantGardenPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantGardenPlant"),true));ne(M.PotPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PotPlant"),true));ne(M.MutationPotion,(e,t)=>(t.debug&&console.log("[MW][Garden] MutationPotion"),true));ne(M.PickupDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PickupDecor"),true));ne(M.PlaceDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PlaceDecor"),true));ne(M.RemoveGardenObject,(e,t)=>(t.debug&&console.log("[MW][Garden] RemoveGardenObject"),true));ne(M.MoveInventoryItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveInventoryItem"),true));ne(M.DropObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] DropObject"),true));ne(M.PickupObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] PickupObject"),true));ne(M.ToggleFavoriteItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] ToggleFavoriteItem"),true));ne(M.PutItemInStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] PutItemInStorage"),true));ne(M.RetrieveItemFromStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] RetrieveItemFromStorage"),true));ne(M.MoveStorageItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveStorageItem"),true));ne(M.LogItems,(e,t)=>(t.debug&&console.log("[MW][Inventory] LogItems"),true));ne(M.PlacePet,(e,t)=>(t.debug&&console.log("[MW][Pets] PlacePet"),true));ne(M.FeedPet,(e,t)=>(t.debug&&console.log("[MW][Pets] FeedPet"),true));ne(M.PetPositions,(e,t)=>(t.debug&&console.log("[MW][Pets] PetPositions"),true));ne(M.SwapPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SwapPet"),true));ne(M.StorePet,(e,t)=>(t.debug&&console.log("[MW][Pets] StorePet"),true));ne(M.NamePet,(e,t)=>(t.debug&&console.log("[MW][Pets] NamePet"),true));ne(M.SellPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SellPet"),true));console.log("[WS] TESTTEST");ne(M.SetSelectedGame,(e,t)=>(t.debug&&console.log("[MW][Session] SetSelectedGame"),true));ne(M.VoteForGame,(e,t)=>(t.debug&&console.log("[MW][Session] VoteForGame"),true));ne(M.RequestGame,(e,t)=>(t.debug&&console.log("[MW][Session] RequestGame"),true));ne(M.RestartGame,(e,t)=>(t.debug&&console.log("[MW][Session] RestartGame"),true));ne(M.Ping,(e,t)=>(t.debug&&console.log("[MW][Session] Ping"),true));ne(M.PlayerPosition,(e,t)=>(t.debug&&console.log("[MW][Session] PlayerPosition"),true));ne(M.Teleport,(e,t)=>(t.debug&&console.log("[MW][Session] Teleport"),true));ne(M.CheckWeatherStatus,(e,t)=>(t.debug&&console.log("[MW][Session] CheckWeatherStatus"),true));ne(M.Chat,(e,t)=>(t.debug&&console.log("[MW][Social] Chat"),true));ne(M.Dev,(e,t)=>(t.debug&&console.log("[MW][Social] Dev"),true));ne(M.Emote,(e,t)=>(t.debug&&console.log("[MW][Social] Emote"),true));ne(M.Wish,(e,t)=>(t.debug&&console.log("[MW][Social] Wish"),true));ne(M.KickPlayer,(e,t)=>(t.debug&&console.log("[MW][Social] KickPlayer"),true));ne(M.ReportSpeakingStart,(e,t)=>(t.debug&&console.log("[MW][Voice] ReportSpeakingStart"),true));ne(M.SetPlayerData,(e,t)=>(t.debug&&console.log("[MW][Social] SetPlayerData"),true));ne(M.UsurpHost,(e,t)=>(t.debug&&console.log("[MW][Social] UsurpHost"),true));function PI(e={}){const t=e.pageWindow??N,n=e.pollMs??500,r=!!e.debug,o=[];o.push(Av(t,{debug:r})),o.push(kI({pageWindow:t,middlewares:e.middlewares,debug:r}));let a=null;const i=s=>{if(a){try{a();}catch{}a=null;}s&&(a=AI(s,e.handlers,{debug:r,pageWindow:t}));};return i(ha(t).ws),o.push(Tp(s=>i(s.ws),{intervalMs:n,debug:r,pageWindow:t})),{getWs:()=>ha(t).ws,dispose:()=>{for(let s=o.length-1;s>=0;s--)try{o[s]();}catch{}if(a){try{a();}catch{}a=null;}}}}let Go=null;function EI(e={}){return Go||(Go=PI(e),Go)}function MI(e,t){const n=new MutationObserver(o=>{for(const a of o)for(const i of a.addedNodes){if(!(i instanceof Element))continue;i.matches(e)&&t(i);const s=i.querySelectorAll(e);for(const l of s)t(l);}});n.observe(document.body,{childList:true,subtree:true});const r=document.querySelectorAll(e);for(const o of r)t(o);return {disconnect:()=>n.disconnect()}}function RI(e,t){const n=new MutationObserver(r=>{for(const o of r)for(const a of o.removedNodes){if(!(a instanceof Element))continue;a.matches(e)&&t(a);const i=a.querySelectorAll(e);for(const s of i)t(s);}});return n.observe(document.body,{childList:true,subtree:true}),{disconnect:()=>n.disconnect()}}const Cg=768,wd=6,Mi=62,Ri=50,LI=.5,NI=.4,zo=36,Ho=28,FI=6,hs=4,OI=8,$I=100,BI=200,Sd=14,Cd=3,DI=40,GI=50,kd=2147483646,br="gemini-bulk-favorite-sidebar",zI="gemini-bulk-favorite-top-row",HI="gemini-bulk-favorite-bottom-row",ms="gemini-qol-bulkFavorite-styles",jI=`
/* Desktop: vertical scrollable list next to inventory */
#${br} {
  display: flex;
  flex-direction: column;
  gap: ${FI}px;
  pointer-events: auto;
  padding: 4px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.6);
  z-index: ${kd};
  overflow-y: auto;
}

/* Mobile: horizontal scrollable rows */
.gemini-qol-bulkFavorite-row {
  display: flex;
  flex-direction: row;
  gap: ${hs}px;
  pointer-events: auto;
  padding: 4px;
  position: fixed;
  z-index: ${kd};
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

#${br}::-webkit-scrollbar {
  width: 4px;
}

#${br}::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}

#${br}::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

/* Individual species button */
.gemini-qol-bulkFavorite-btn {
  position: relative;
  width: ${Mi}px;
  height: ${Mi}px;
  min-width: ${Mi}px;
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
  width: ${Ri}px;
  height: ${Ri}px;
  min-width: ${Ri}px;
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
  width: ${zo}px;
  height: ${zo}px;
  object-fit: contain;
  image-rendering: pixelated;
}

.gemini-qol-bulkFavorite-btn.mobile .gemini-qol-bulkFavorite-sprite {
  width: ${Ho}px;
  height: ${Ho}px;
}

/* Heart indicator */
.gemini-qol-bulkFavorite-heart {
  position: absolute;
  top: ${Cd}px;
  right: ${Cd}px;
  width: ${Sd}px;
  height: ${Sd}px;
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
  width: ${zo}px;
  height: ${zo}px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #fff;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 4px;
}

.gemini-qol-bulkFavorite-btn.mobile .gemini-qol-bulkFavorite-fallback {
  width: ${Ho}px;
  height: ${Ho}px;
  font-size: 14px;
}
`,WI='<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',UI='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';function VI(e){const{species:t,itemCount:n,isFavorited:r,isMobile:o,onClick:a}=e,i=x("button",{className:`gemini-qol-bulkFavorite-btn${o?" mobile":""}`,title:`${r?"Unfavorite":"Favorite"} all ${n} ${t}`});return i.dataset.species=t,i.appendChild(XI(t,o)),i.appendChild(qI(r)),i.appendChild(KI(t)),i.addEventListener("click",async s=>{s.preventDefault(),s.stopPropagation(),a();}),i}function XI(e,t){try{if(!j.isReady()||!j.has("plant",e))return Td(e);const n=t?NI:LI,r=j.toCanvas("plant",e,{scale:n});return r.className="gemini-qol-bulkFavorite-sprite",r}catch(n){return console.warn(`[BulkFavorite] Failed to load sprite for ${e}:`,n),Td(e)}}function Td(e){return x("div",{className:"gemini-qol-bulkFavorite-fallback"},e.charAt(0).toUpperCase())}function qI(e){const t=x("span",{className:`gemini-qol-bulkFavorite-heart ${e?"filled":"outline"}`});return t.innerHTML=e?WI:UI,t}function KI(e){return x("span",{className:"gemini-qol-bulkFavorite-label"},e)}let bt=null,xt=null,mt=null,ra=false,Er=null,xr=false,En=null;const bs=[];function jo(e){bs.push(e);}function YI(){for(const e of bs)try{e();}catch(t){console.warn("[BulkFavorite] Cleanup error:",t);}bs.length=0;}function kg(){return window.innerWidth<=Cg}function JI(e){return new Promise(t=>setTimeout(t,e))}function Tg(){if(ra)return;if(document.getElementById(ms)){ra=true;return}const e=document.createElement("style");e.id=ms,e.textContent=jI,document.head.appendChild(e),ra=true;}function QI(){document.getElementById(ms)?.remove(),ra=false;}function ZI(){const e=ft().get();if(!e?.items)return [];const t=new Set(e.favoritedItemIds??[]),n=new Map;for(const o of e.items){const a=o;if(a.itemType!=="Produce")continue;const i=a.species,s=a.id;if(!i||!s)continue;const l=n.get(i);l?l.push(s):n.set(i,[s]);}const r=[];for(const[o,a]of n){const i=a.length>0&&a.every(s=>t.has(s));r.push({species:o,itemIds:a,allFavorited:i});}return r.sort((o,a)=>o.species.localeCompare(a.species)),r}async function e_(e){const t=ft().get();if(!t?.items)return;const n=new Set(t.favoritedItemIds??[]),r=[];for(const i of t.items){const s=i;if(s.itemType!=="Produce"||s.species!==e)continue;const l=s.id;l&&r.push({id:l,favorited:n.has(l)});}if(r.length===0)return;const o=r.every(i=>i.favorited),a=o?r.filter(i=>i.favorited):r.filter(i=>!i.favorited);console.log(`🔄 [BulkFavorite] ${o?"Unfavoriting":"Favoriting"} ${a.length}/${r.length} ${e}`);for(const i of a)za(i.id),await JI(DI);}function xs(e,t){const{species:n,itemIds:r,allFavorited:o}=e;return VI({species:n,itemCount:r.length,isFavorited:o,isMobile:t,onClick:()=>e_(n)})}function t_(e){const t=x("div",{id:br}),n=e.getBoundingClientRect(),r=Math.max(window.innerHeight-$I,BI);return t.style.maxHeight=`${r}px`,t.style.position="fixed",t.style.left=`${n.right+OI}px`,t.style.top=`${n.top}px`,t}function Id(e,t,n){const r=x("div",{id:e,className:"gemini-qol-bulkFavorite-row"}),o=t.getBoundingClientRect();return n==="top"?r.style.bottom=`${window.innerHeight-o.top+hs}px`:r.style.top=`${o.bottom+hs}px`,r.style.left=`${o.left}px`,r.style.maxWidth=`${o.width}px`,r}function _d(){const e=ZI();kg()?r_(e):n_(e);}function n_(e){if(bt){if(bt.innerHTML="",e.length===0){bt.style.display="none";return}bt.style.display="flex";for(const t of e)bt.appendChild(xs(t,false));console.log(`🎯 [BulkFavorite] Desktop: Rendered ${e.length} produce types`);}}function r_(e){if(!xt||!mt)return;if(xt.innerHTML="",mt.innerHTML="",e.length===0){xt.style.display="none",mt.style.display="none";return}xt.style.display="flex";const t=e.slice(0,wd),n=e.slice(wd);for(const r of t)xt.appendChild(xs(r,true));if(n.length>0){mt.style.display="flex";for(const r of n)mt.appendChild(xs(r,true));}else mt.style.display="none";console.log(`🎯 [BulkFavorite] Mobile: Rendered ${e.length} types`);}function o_(){const e=document.querySelector(".McGrid");if(!e)return console.log("⚠️ [BulkFavorite] No .McGrid found"),null;const t=e.getBoundingClientRect();if(window.innerWidth<=Cg)return console.log(`🎯 [BulkFavorite] Mobile mode - using McGrid: ${Math.round(t.width)}x${Math.round(t.height)}`),e;const r=window.innerWidth/2;let o=null,a=0;const i=e.querySelectorAll(".McFlex, .McGrid");for(const s of i){const l=s.getBoundingClientRect();if(l.width<200||l.height<200||l.width>window.innerWidth-100)continue;const d=l.left+l.width/2,c=1-Math.abs(d-r)/r,p=l.width*l.height*c;p>a&&(o=s,a=p);}if(o){const s=o.getBoundingClientRect();return console.log(`🎯 [BulkFavorite] Found desktop container: ${Math.round(s.width)}x${Math.round(s.height)} @ (${Math.round(s.left)}, ${Math.round(s.top)})`),o}return console.log(`🎯 [BulkFavorite] Fallback to McGrid: ${Math.round(t.width)}x${Math.round(t.height)}`),e}let Mn=null;function ys(){Mn&&clearTimeout(Mn),Mn=setTimeout(()=>{a_();},GI);}function a_(){const e=o_();if(!e)return;console.log("🎯 [BulkFavorite] Found inventory modal container"),Mr(),Tg(),Er=e,kg()?(xt=Id(zI,e,"top"),mt=Id(HI,e,"bottom"),document.body.appendChild(xt),document.body.appendChild(mt)):(bt=t_(e),document.body.appendChild(bt)),_d(),En&&En(),En=ft().subscribeFavorites(()=>{xr&&_d();});}function Mr(){Mn&&(clearTimeout(Mn),Mn=null),En&&(En(),En=null),bt?.remove(),bt=null,xt?.remove(),xt=null,mt?.remove(),mt=null,Er=null;}function i_(){Mr();}async function vs(){if(!no().enabled){console.log("⚠️ [BulkFavorite] Feature disabled");return}Tg();const t=await $s.onChangeNow(o=>{const a=o==="inventory";a!==xr&&(xr=a,a?ys():Mr());}),n=MI(".McGrid",()=>{xr&&(bt||xt||ys());}),r=RI(".McGrid",o=>{Er&&Er===o&&Mr();});jo(()=>t()),jo(()=>n.disconnect()),jo(()=>r.disconnect()),jo(()=>{Mr(),xr=false,Er=null;}),console.log("✅ [BulkFavorite] Started (State-driven + DOM observation)");}function ws(){YI(),QI(),console.log("🛑 [BulkFavorite] Stopped");}function s_(e){const t=no();t.enabled=e,e?vs():ws();}let Wo=false;const l_={init(){Wo||(vs(),Wo=true);},destroy(){Wo&&(ws(),Wo=false);},isEnabled(){return Jp()},renderButton:ys,removeButton:i_,startWatching:vs,stopWatching:ws,setEnabled:s_},c_=`
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
`,d_=`
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
`;let Ad=false;function u_(){if(Ad)return;Ad=true;const e=document.createElement("style");e.textContent=d_,document.head.appendChild(e);}const Pd=["Chat","Leaderboard","Stats","Open Activity Log","Open MGH"],Ed=e=>{try{return typeof CSS<"u"&&CSS&&typeof CSS.escape=="function"?CSS.escape(e):e.replace(/"/g,'\\"')}catch{return e}};function p_(){const e=document.querySelector(Pd.map(n=>`button[aria-label="${Ed(n)}"]`).join(","));if(!e)return null;let t=e.parentElement;for(;t&&t!==document.body;){if(Pd.reduce((r,o)=>r+t.querySelectorAll(`button[aria-label="${Ed(o)}"]`).length,0)>=2)return t;t=t.parentElement;}return null}function f_(e){const t=Array.from(e.querySelectorAll("button[aria-label]"));if(!t.length)return {refBtn:null,refWrapper:null};const n=t.filter(s=>s.dataset.alertBtn!=="true"&&(s.getAttribute("aria-label")||"")!=="Alerts"),r=n.length?n:t,o=r[r.length-1]||null,a=o?.parentElement,i=a&&a.parentElement===e&&a.tagName==="DIV"?a:null;return {refBtn:o,refWrapper:i}}function g_(e,t,n){const r=e.cloneNode(false);r.type="button",r.setAttribute("aria-label",t),r.title=t,r.dataset.alertBtn="true",r.style.pointerEvents="auto",r.style.position="relative",r.removeAttribute("id");const o=document.createElement("div");return o.innerHTML=n,o.dataset.alertIcon="true",o.style.pointerEvents="none",o.style.userSelect="none",o.style.width="76%",o.style.height="76%",o.style.display="flex",o.style.alignItems="center",o.style.justifyContent="center",o.style.margin="auto",r.appendChild(o),r}function h_(){const e=document.createElement("span");return e.className="alert-badge",e.style.position="absolute",e.style.top="-4px",e.style.right="-4px",e.style.minWidth="18px",e.style.height="18px",e.style.borderRadius="9px",e.style.backgroundColor="#EF4444",e.style.color="white",e.style.fontSize="10px",e.style.fontWeight="700",e.style.display="none",e.style.alignItems="center",e.style.justifyContent="center",e.style.padding="0 4px",e.style.pointerEvents="none",e.style.boxShadow="0 2px 4px rgba(0,0,0,0.2)",e.style.zIndex="1",e.textContent="0",e}function m_(e){u_();const t=e.iconUrl?`<img src="${e.iconUrl}" alt="Alert" style="width:100%;height:100%;object-fit:contain;"/>`:c_,n=e.ariaLabel||"Alerts";let r=null,o=null,a=null,i=null,s=false,l=null,d=null,c=null;function u(){if(s)return  false;s=true;let b=false;try{const y=p_();if(!y)return !1;l!==y&&(l=y);const{refBtn:w,refWrapper:S}=f_(y);if(!w)return !1;o=y.querySelector('div[data-alert-wrapper="true"]'),!o&&S&&(o=S.cloneNode(!1),o.dataset.alertWrapper="true",o.removeAttribute("id"),b=!0);const T=o?.querySelector('button[data-alert-btn="true"]')||null;r||(r=T),r||(r=g_(w,n,t),r.addEventListener("click",C=>{C.preventDefault(),C.stopPropagation();try{e.onClick?.();}catch{}}),a=h_(),r.appendChild(a),o?o.appendChild(r):r.parentElement!==y&&y.appendChild(r),b=!0),o&&o.parentElement!==y&&(y.appendChild(o),b=!0);const v=y;if(v&&v!==d){try{h.disconnect();}catch{}d=v,h.observe(d,{childList:!0,subtree:!0});}return b}finally{s=false;}}const p=document.getElementById("App")||document.body;let f=null,g=false;const h=new MutationObserver(()=>{g&&r&&document.contains(r)||(r&&!document.contains(r)&&(g=false,r=null,a=null,o=null),f===null&&(f=window.setTimeout(()=>{if(f=null,u()&&r&&document.contains(r)&&(g=true,o)){const y=o.parentElement;y&&y.lastElementChild!==o&&y.appendChild(o);}},100)));});return u()&&r&&document.contains(r)&&(g=true),h.observe(p,{childList:true,subtree:true}),i=()=>h.disconnect(),{get root(){return r},updateBadge(b){a&&(b>0?(a.textContent=String(b),a.style.display="flex"):a.style.display="none");},ring(){if(!r)return;const b=r.querySelector('[data-alert-icon="true"]');b&&(b.classList.add("alert-btn-ringing"),setTimeout(()=>{b?.classList.remove("alert-btn-ringing");},600));},startRinging(){r&&(c!==null&&clearInterval(c),this.ring(),c=window.setInterval(()=>{this.ring();},3e3));},stopRinging(){if(c!==null&&(clearInterval(c),c=null),r){const b=r.querySelector('[data-alert-icon="true"]');b&&b.classList.remove("alert-btn-ringing");}},destroy(){this.stopRinging();try{i?.();}catch{}try{o?.remove();}catch{}}}}const b_=`
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
`;function x_(e,t){const n=x("div",{className:"alert-item-row"}),r=x("div",{className:"alert-item-sprite"});if(e.spriteId)try{const d=j.toCanvas(e.spriteId,{scale:.35});d?r.appendChild(d):r.textContent="?";}catch{r.textContent="?";}else r.textContent="?";const o=x("div",{className:"alert-item-info"}),a=x("div",{className:"alert-item-name"},e.itemName),i=x("div",{className:"alert-item-remaining"},`${e.remaining} remaining`);o.appendChild(a),o.appendChild(i);const s=x("div",{className:"alert-item-actions"}),l=x("button",{className:"alert-item-btn alert-item-btn--buy-all",type:"button",title:`Buy all ${e.remaining} available`},"Buy All");return l.addEventListener("click",d=>{d.stopPropagation(),t?.(e);}),s.appendChild(l),n.appendChild(r),n.appendChild(o),n.appendChild(s),n}function y_(){const e=x("div",{className:"alert-overlay-empty"}),t=x("div",{className:"alert-overlay-empty-icon"},"🔔"),n=x("div",{className:"alert-overlay-empty-text"},"No items available"),r=x("div",{className:"alert-overlay-empty-subtext"},"Tracked items will appear here when in stock");return e.appendChild(t),e.appendChild(n),e.appendChild(r),e}function Md(e,t){const n=t.getBoundingClientRect(),r=340,o=8;e.style.position="fixed",e.style.top="",e.style.bottom="",e.style.left="",e.style.right="";let a=n.bottom+o,i=window.innerWidth-n.right;const s=a+480>window.innerHeight,l=n.right-r<o;s?(e.style.bottom=`${window.innerHeight-n.top+o}px`,e.style.top="auto"):e.style.top=`${a}px`,e.style.right=`${i}px`,l&&(e.style.right="auto",e.style.left=`${o}px`);}function v_(e){const{items:t,anchorElement:n,onClose:r,onBuyAll:o}=e,a=x("div",{className:"alert-overlay"}),i=bI("theme",mr.theme),s=wn[i];let l="";s&&(l=`.alert-overlay {
    ${Object.entries(s).map(([y,w])=>`${y}: ${w};`).join(`
    `)}
  }

`);const d=document.createElement("style");d.textContent=l+b_,a.appendChild(d);const c=x("div",{className:"alert-overlay-header"}),u=x("div",{className:"alert-overlay-title"},"Available Items"),p=x("button",{className:"alert-overlay-close",type:"button",title:"Close"},"✕");p.addEventListener("click",b=>{b.stopPropagation(),r?.();}),c.appendChild(u),c.appendChild(p);const f=x("div",{className:"alert-overlay-list"});a.appendChild(c),a.appendChild(f);const g=b=>{if(f.replaceChildren(),b.length===0)f.appendChild(y_());else for(const y of b){const w=x_(y,o);f.appendChild(w);}};g(t),Md(a,n);const h=()=>{Md(a,n);};window.addEventListener("resize",h);const m=b=>{const y=b.target;!a.contains(y)&&!n.contains(y)&&r?.();};return document.addEventListener("click",m,{capture:true}),{root:a,updateItems:g,destroy(){window.removeEventListener("resize",h),document.removeEventListener("click",m,{capture:true}),a.remove();}}}const w_={seed:"plants",tool:"items",egg:"eggs",decor:"decor"},S_={seed:"seed",tool:null,egg:null,decor:null};function Ig(e,t,n){try{const r=w_[t],o=V.get(r);if(!o||typeof o!="object")return null;const a=o[e];if(!a||typeof a!="object")return null;const i=S_[t],s=i?a[i]:a;return !s||typeof s!="object"?null:s[n]??null}catch{return null}}function C_(e,t){return Ig(e,t,"spriteId")}function k_(e,t){return Ig(e,t,"name")??e}function T_(e,t){const n=Bt.getTrackedItems(),r=new Set(n.filter(a=>a.shopType===e).map(a=>a.itemId));return r.size===0?[]:t.items.filter(a=>{const i=r.has(a.id),s=a.isAvailable;return i&&s}).map(a=>({shopType:e,itemId:a.id,itemName:k_(a.id,e),spriteId:C_(a.id,e),remaining:a.remaining,price:a.price}))}function oa(){const t=zn().get(),n=["seed","tool","egg","decor"],r=[];for(const o of n){const a=t.byType[o];if(a){const i=T_(o,a);r.push(...i);}}return r}function I_(e){return zn().subscribeStable(()=>{const r=oa();e(r);})}function __(){let e=null,t=null,n=null,r=false,o=[];const a=f=>{const g=o.length>0,h=f.length>0;o=f,e?.updateBadge(f.length),h?g||e?.startRinging():g&&e?.stopRinging();},i=()=>{if(r||!e?.root)return;const f=oa();t=v_({items:f,anchorElement:e.root,onClose:s,onBuyAll:g=>{switch(g.shopType){case "seed":Kt.seed.buyAll(g.itemId);break;case "egg":Kt.egg.buyAll(g.itemId);break;case "decor":Kt.decor.buyAll(g.itemId);break;case "tool":Kt.tool.buyAll(g.itemId);break}}}),document.body.appendChild(t.root),r=true;},s=()=>{!r||!t||(t.destroy(),t=null,r=false);},l=()=>{r?s():i();},d=f=>{if(a(f),r&&t&&t.updateItems(f),f.length>0){const g=new CustomEvent("gemini:alert-available",{detail:{items:f}});window.dispatchEvent(g);}},c=()=>{const f=oa(),g=new Set(o.map(m=>`${m.shopType}:${m.itemId}`));new Set(f.map(m=>`${m.shopType}:${m.itemId}`));const h=f.some(m=>!g.has(`${m.shopType}:${m.itemId}`));if(a(f),r&&t&&t.updateItems(f),h&&f.length>0)try{$t.CustomSounds.play("default-notification");}catch{}};e=m_({onClick:l,ariaLabel:"Alerts"}),n=I_(d),window.addEventListener("gemini:tracked-items-changed",c);const u=()=>{try{$t.CustomSounds.play("default-notification");}catch{}};window.addEventListener("gemini:shop-restock-tracked",u);const p=(f=1,g=10)=>{if(zn().get().all.some(y=>y.items.length>0)||f>=g){const y=oa();if(a(y),y.length>0)try{$t.CustomSounds.play("default-notification");}catch{}}else setTimeout(()=>p(f+1,g),500);};return p(),{destroy(){s(),n?.(),n=null,window.removeEventListener("gemini:tracked-items-changed",c),window.removeEventListener("gemini:shop-restock-tracked",u),e?.destroy(),e=null;}}}function A_(e){e.logStep("WebSocket","Capturing WebSocket...");let t=null;return t=Tp(n=>{n.ws&&(e.logStep("WebSocket","WebSocket captured","success"),t?.(),t=null);},{intervalMs:250}),EI({debug:false}),()=>{t?.(),t=null;}}async function P_(e){e.logStep("Atoms","Prewarming Jotai store...");try{await Xx(),await jx({timeoutMs:8e3,intervalMs:50}),e.logStep("Atoms","Jotai store ready","success");}catch(t){e.logStep("Atoms","Jotai store not captured yet","error"),console.warn("[Bootstrap] Jotai store wait failed",t);}}function E_(e){e.logStep("Globals","Initializing global variables...");try{Lp(),e.logStep("Globals","Global variables ready","success");}catch(t){e.logStep("Globals","Failed to initialize global variables","error"),console.warn("[Bootstrap] Global variables init failed",t);}}function M_(e){e.logStep("API","Exposing Gemini API...");try{OT(),e.logStep("API","Gemini API ready","success");}catch(t){e.logStep("API","Failed to expose API","error"),console.warn("[Bootstrap] API init failed",t);}}function Li(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0);})}async function R_(e){e.logStep("HUD","Loading HUD preferences..."),await Li();const t=mI();await Li();const n=await hI({hostId:"gemini-hud-root",initialWidth:t.width,initialOpen:t.isOpen,onWidthChange:r=>Do("width",r),onOpenChange:r=>Do("isOpen",r),themes:wn,initialTheme:t.theme,onThemeChange:r=>Do("theme",r),buildSections:r=>BT({applyTheme:r.applyTheme,initialTheme:r.initialTheme,getCurrentTheme:r.getCurrentTheme,setHUDWidth:r.setHUDWidth,setHUDOpen:r.setHUDOpen}),initialTab:t.activeTab,onTabChange:r=>Do("activeTab",r)});return await Li(),e.logStep("HUD","HUD ready","success"),n}async function L_(e){e.setSubtitle("Activating Gemini modules...");const t=7;let n=0;await Np(r=>{r.status==="success"?(n++,e.logStep("Modules",`Loading modules... (${n}/${t})`)):r.status==="error"&&e.logStep("Modules",`Loading modules... (${n}/${t}) - ${r.name} failed`,"error");}),e.logStep("Modules",`All modules loaded (${t}/${t})`,"success");}async function N_(e){try{j.isReady()||await j.init(),V.resolveSprites();const t=[],n=V.get("plants");if(n)for(const l of Object.values(n))l?.seed?.spriteId&&t.push(l.seed.spriteId),l?.plant?.spriteId&&t.push(l.plant.spriteId),l?.crop?.spriteId&&t.push(l.crop.spriteId);const r=V.get("pets");if(r)for(const l of Object.values(r))l?.spriteId&&t.push(l.spriteId);const o=V.get("items");if(o)for(const l of Object.values(o))l?.spriteId&&t.push(l.spriteId);const a=V.get("eggs");if(a)for(const l of Object.values(a))l?.spriteId&&t.push(l.spriteId);const i=V.get("decor");if(i)for(const l of Object.values(i))l?.spriteId&&t.push(l.spriteId);const s=[...new Set(t)];s.length>0&&await j.warmup(s,()=>{},5);}catch(t){console.warn("[Bootstrap] Sprite warmup failed",t);}}async function F_(e){e.logStep("Sections","Preloading UI sections...");try{await DT(),e.logStep("Sections","Sections preloaded","success");}catch(t){e.logStep("Sections","Sections preload failed","error"),console.warn("[Bootstrap] Sections preload failed",t);}}function O_(e){e.logStep("Features","Initializing features...");const t=[{name:"AntiAfk",init:tn.init.bind(tn)},{name:"PetTeam",init:ae.init.bind(ae)},{name:"BulkFavorite",init:ma.init.bind(ma)},{name:"XPTracker",init:xa.init.bind(xa)},{name:"CropValueIndicator",init:_r.init.bind(_r)},{name:"CropSizeIndicator",init:Ar.init.bind(Ar)},{name:"ShopNotifier",init:Bt.init.bind(Bt)},{name:"WeatherNotifier",init:an.init.bind(an)}];let n=0;for(const r of t)try{r.init(),n++,e.logStep("Features",`Initializing features... (${n}/${t.length})`,"info");}catch(o){e.logStep("Features",`Initializing features... (${n}/${t.length}) - ${r.name} failed`,"error"),console.warn(`[Bootstrap] Feature ${r.name} init failed`,o);}e.logStep("Features",`All features initialized (${t.length}/${t.length})`,"success"),e.logStep("Injections","Initializing QOL injections...");try{const r=Ud();r.register({id:"bulkFavoriteInject",name:"Bulk Favorite Inject",description:"Quick favorite/unfavorite multiple mutations",injection:l_,storageKey:we.BULK_FAVORITE,defaultEnabled:!1}),r.register({id:"cropValueIndicator",name:"Crop Price",description:"Shows coin value in crop tooltips",injection:_r.render,storageKey:we.CROP_VALUE_INDICATOR,defaultEnabled:!1}),r.register({id:"cropSizeIndicator",name:"Crop Size",description:"Shows size percentage in crop tooltips",injection:Ar.render,storageKey:we.CROP_SIZE_INDICATOR,defaultEnabled:!1}),r.initAll(),e.logStep("Injections","QOL injections registered and initialized","success");}catch(r){e.logStep("Injections","QOL injections initialization failed","error"),console.warn("[Bootstrap] Injections init failed",r);}}ou();Dx();(async function(){qg();const e=Bg({title:"Gemini is loading",subtitle:"Connecting and preparing modules..."});let t=null;try{t=A_(e),await P_(e),E_(e),M_(e),await L_(e),await Promise.all([(async()=>{O_(e);})(),(async()=>{await N_(e);})()]),await F_(e),e.succeed("Gemini is ready!");}catch(r){e.fail("Failed to initialize the mod.",r);}finally{t?.();}const n=await R_(e);vI({onClick:()=>n.setOpen(true)}),__();})();

})();