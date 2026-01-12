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
  var gu=Object.defineProperty;var mu=(e,t,n)=>t in e?gu(e,t,{enumerable:true,configurable:true,writable:true,value:n}):e[t]=n;var D=(e,t,n)=>mu(e,typeof t!="symbol"?t+"":t,n);function b(e,t=null,...n){const r=document.createElement(e);for(const[o,a]of Object.entries(t||{}))a!=null&&(o==="style"?typeof a=="string"?r.setAttribute("style",a):typeof a=="object"&&Object.assign(r.style,a):o.startsWith("on")&&typeof a=="function"?r[o.toLowerCase()]=a:o in r?r[o]=a:r.setAttribute(o,String(a)));for(const o of n)o==null||o===false||r.appendChild(typeof o=="string"||typeof o=="number"?document.createTextNode(String(o)):o);return r}const tr="https://i.imgur.com/k5WuC32.png",Hi="gemini-loader-style",Tt="gemini-loader",sl=80;function hu(){if(document.getElementById(Hi))return;const e=document.createElement("style");e.id=Hi,e.textContent=`
    /* ===== Loader Variables ===== */
    #${Tt} {
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
    #${Tt} {
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

    #${Tt}.gemini-loader--error .gemini-loader__actions {
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
    #${Tt}.gemini-loader--closing {
      animation: gemini-loader-fade-out 0.4s ease forwards;
      pointer-events: none;
    }

    #${Tt}.gemini-loader--error .gemini-loader__spinner {
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
      #${Tt} { padding: 16px 10px; }
      .gemini-loader__card { padding: 16px; }
      .gemini-loader__header { gap: 12px; }
      .gemini-loader__spinner { width: 42px; height: 42px; }
      .gemini-loader__spinner-icon { width: 56px; height: 56px; }
      .gemini-loader__title { font-size: 16px; }
    }
  `;const t=document.head||document.documentElement||document.body;if(t){t.appendChild(e);return}const n=()=>{(document.head||document.documentElement||document.body)?.appendChild(e);};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",n,{once:true}):setTimeout(n,0);}function nr(e,t,n){const r=b("div",{className:`gemini-loader__log ${n}`},b("div",{className:"gemini-loader__dot"}),b("div",{textContent:t}));for(e.appendChild(r);e.childElementCount>sl;)e.firstElementChild?.remove();e.scrollTop=e.scrollHeight;}function bu(){return new Promise(e=>{if(typeof GM_xmlhttpRequest>"u"){e(tr);return}GM_xmlhttpRequest({method:"GET",url:tr,responseType:"blob",onload:t=>{const n=t.response,r=new FileReader;r.onloadend=()=>e(r.result),r.onerror=()=>e(tr),r.readAsDataURL(n);},onerror:()=>e(tr)});})}function xu(e={}){const t=Number.isFinite(e.blurPx)?Math.max(4,Number(e.blurPx)):14;hu();const n=b("div",{className:"gemini-loader__subtitle",textContent:e.subtitle??"Initializing the mod..."}),r=b("div",{className:"gemini-loader__logs"}),o=b("img",{className:"gemini-loader__spinner-icon",alt:"Gemini"}),a=b("div",{className:"gemini-loader__spinner"},o);bu().then(h=>{o.src=h;});const i=b("div",{className:"gemini-loader__card"},b("div",{className:"gemini-loader__header"},a,b("div",{className:"gemini-loader__titles"},b("div",{className:"gemini-loader__title",textContent:e.title??"Gemini is loading"}),n)),r),s=b("div",{id:Tt},i);(document.body||document.documentElement).appendChild(s);const c=b("div",{className:"gemini-loader__actions"},b("button",{className:"gemini-loader__button",textContent:"Close loader",onclick:()=>s.remove()}));i.appendChild(c),s.style.setProperty("--loader-blur",`${t}px`);const d=h=>{n.textContent=h;},l=new Map,u=(h,x)=>{h.className=`gemini-loader__log ${x}`;};return {log:(h,x="info")=>nr(r,h,x),logStep:(h,x,k="info")=>{const v=String(h||"").trim();if(!v){nr(r,x,k);return}const w=l.get(v);if(w){w.el.lastElementChild&&(w.el.lastElementChild.textContent=x),w.tone!==k&&(u(w.el,k),w.tone=k);return}const P=b("div",{className:`gemini-loader__log ${k}`},b("div",{className:"gemini-loader__dot"}),b("div",{textContent:x}));for(l.set(v,{el:P,tone:k}),r.appendChild(P);r.childElementCount>sl;){const y=r.firstElementChild;if(!y)break;const C=Array.from(l.entries()).find(([,T])=>T.el===y)?.[0];C&&l.delete(C),y.remove();}r.scrollTop=r.scrollHeight;},setSubtitle:d,succeed:(h,x=600)=>{h&&nr(r,h,"success"),s.classList.add("gemini-loader--closing"),setTimeout(()=>s.remove(),x);},fail:(h,x)=>{nr(r,h,"error"),d("Something went wrong. Check the console for details."),s.classList.add("gemini-loader--error"),console.error("[Gemini loader]",h,x);}}}const Wi=150,yu=30;function vu(e,t,n){const r=b("div",{className:"lg-pill",id:"pill"}),o=e.map(S=>{const A=b("button",{className:"lg-tab"},S.label);return A.setAttribute("data-target",S.id),A}),a=b("div",{className:"lg-tabs",id:"lg-tabs-row"},r,...o),i=new Map(e.map(S=>[S.id,true])),s=new Map(o.map((S,A)=>[e[A].id,S]));function c(S){const A=document.createElementNS("http://www.w3.org/2000/svg","svg");A.setAttribute("viewBox","0 0 24 24"),A.setAttribute("fill","none"),A.setAttribute("stroke","currentColor"),A.setAttribute("stroke-width","2"),A.setAttribute("stroke-linecap","round"),A.setAttribute("stroke-linejoin","round");const I=document.createElementNS("http://www.w3.org/2000/svg","polyline");return I.setAttribute("points",S==="left"?"15 18 9 12 15 6":"9 18 15 12 9 6"),A.appendChild(I),A}const d=b("button",{className:"lg-tabs-arrow lg-tabs-arrow-left",ariaLabel:"Scroll left"});d.appendChild(c("left"));const l=b("button",{className:"lg-tabs-arrow lg-tabs-arrow-right",ariaLabel:"Scroll right"});l.appendChild(c("right"));const p=b("div",{className:"lg-tabs-wrapper"},d,a,l);let f=0,g=0,m=false;function h(){const S=a.scrollLeft>0,A=a.scrollLeft<a.scrollWidth-a.clientWidth-1;d.classList.toggle("disabled",!S),l.classList.toggle("disabled",!A);}d.addEventListener("click",()=>{a.scrollBy({left:-Wi,behavior:"smooth"}),setTimeout(h,300);}),l.addEventListener("click",()=>{a.scrollBy({left:Wi,behavior:"smooth"}),setTimeout(h,300);}),a.addEventListener("wheel",S=>{Math.abs(S.deltaY)>Math.abs(S.deltaX)&&(S.preventDefault(),a.scrollLeft+=S.deltaY,h());},{passive:false});let x=0;a.addEventListener("touchstart",S=>{const A=S.touches[0];f=A.clientX,g=A.clientY,m=false,x=a.scrollLeft;},{passive:true}),a.addEventListener("touchmove",S=>{if(m)return;const A=S.touches[0],I=A.clientX-f,F=A.clientY-g;if(Math.abs(F)>Math.abs(I)){m=true;return}Math.abs(I)>yu&&(S.preventDefault(),a.scrollLeft=x-I);},{passive:false}),a.addEventListener("touchend",()=>{h();},{passive:true}),a.addEventListener("scroll",h,{passive:true});function k(S){const A=o.find(I=>I.dataset.target===S)||o[0];A&&requestAnimationFrame(()=>{const I=A.offsetLeft,F=A.offsetWidth;r.style.width=`${F}px`,r.style.transform=`translateX(${I}px)`;const R=a.scrollLeft,E=R,$=R+a.clientWidth,te=I-12,z=I+F+12;te<E?a.scrollTo({left:te,behavior:"smooth"}):z>$&&a.scrollTo({left:z-a.clientWidth,behavior:"smooth"}),setTimeout(h,300);});}function v(){for(const[S,A]of i)if(A)return S;return null}function w(S){const A=s.get(S);if(A)if(i.set(S,false),A.style.display="none",C===S){const I=v();I&&T(I);}else y();}function P(S){const A=s.get(S);A&&(i.set(S,true),A.style.display="",y());}function y(){k(C),h();}let C=t||(e[0]?.id??"");function T(S){i.get(S)&&(C=S,o.forEach(A=>A.classList.toggle("active",A.dataset.target===S)),k(S),n(S));}return o.forEach(S=>S.addEventListener("click",()=>T(S.dataset.target))),queueMicrotask(()=>{k(C),h();}),{root:p,activate:T,recalc:y,getActive:()=>C,showTab:P,hideTab:w,isTabVisible:S=>i.get(S)??false,getVisibleTabs:()=>[...i.entries()].filter(([S,A])=>A).map(([S])=>S)}}class rn{constructor(t){D(this,"id");D(this,"label");D(this,"container",null);D(this,"cleanupFunctions",[]);D(this,"preloadedContent",null);D(this,"preloadPromise",null);this.id=t.id,this.label=t.label;}async preload(){if(this.preloadedContent||this.preloadPromise)return;const t=b("div");this.preloadPromise=(async()=>{const n=this.build(t);n instanceof Promise&&await n,this.preloadedContent=t,this.preloadPromise=null;})(),await this.preloadPromise;}isPreloaded(){return this.preloadedContent!==null}render(t){for(this.unmount();t.firstChild;)t.removeChild(t.firstChild);if(this.container=t,this.preloadedContent){for(;this.preloadedContent.firstChild;)t.appendChild(this.preloadedContent.firstChild);this.preloadedContent=null;}else {const r=this.build(t);r instanceof Promise&&r.catch(o=>{console.error(`[Gemini] Error building section ${this.id}:`,o);});}const n=t.firstElementChild;n&&n.classList.contains("gemini-section")&&n.classList.add("active");}unmount(){this.executeCleanup(),this.container=null;}createContainer(t,n){const r=n?`gemini-section ${n}`:"gemini-section";return b("section",{id:t,className:r})}addCleanup(t){this.cleanupFunctions.push(t);}createGrid(t="12px"){const n=b("div");return n.style.display="grid",n.style.gap=t,n}executeCleanup(){for(const t of this.cleanupFunctions)try{t();}catch(n){console.error(`[Gemini] Cleanup error in section ${this.id}:`,n);}this.cleanupFunctions=[];}}class wu{constructor(t,n,r){D(this,"sections");D(this,"activeId",null);D(this,"container");D(this,"theme");this.sections=new Map(t.map(o=>[o.id,o])),this.container=n,this.theme=r;}get ids(){return Array.from(this.sections.keys())}get all(){return Array.from(this.sections.values())}get active(){return this.activeId}activate(t){if(this.activeId!==t){if(!this.sections.has(t))throw new Error(`[Gemini] Unknown section: ${t}`);if(this.activeId&&this.sections.get(this.activeId).unmount(),this.activeId=t,this.sections.get(t).render(this.container),this.theme){const n=this.theme.getCurrentTheme();this.theme.applyTheme(n);}}}}const bt="gemini:",Su={STATE:"hud:state",THEME:"hud:theme"},ku={ALL:"sections",SETTINGS:"sections:settings",TEST:"sections:test"},Cu={},Tu={MY_PETS_ABILITY_LOGS:"global:myPets:abilityLogs"},Le={AUTO_FAVORITE:"feature:autoFavorite:config",AUTO_FAVORITE_UI:"feature:autoFavorite:ui",JOURNAL_CHECKER:"feature:journalChecker:config",BULK_FAVORITE:"feature:bulkFavorite:config",ACHIEVEMENTS:"feature:achievements:data",TRACKER_STATS:"feature:tracker:stats",ANTI_AFK:"feature:antiAfk:config",CONFIG:"feature:config",PET_TEAM:"feature:petTeam:config",XP_TRACKER:"feature:xpTracker:config"},Pu={AUTO_RELOAD:"dev:auto-reload"},ll={HUD:Su,SECTION:ku,MODULE:Cu,GLOBAL:Tu,FEATURE:Le,DEV:Pu},Ui={STORAGE_CHANGE:"gemini:storage:change"};function Pe(e,t){try{const n=e.startsWith(bt)?e:bt+e,r=GM_getValue(n);return r==null?t:typeof r=="string"?JSON.parse(r):r}catch(n){return console.error(`[Gemini Storage] Failed to read key "${e}":`,n),t}}function Oe(e,t){try{const n=e.startsWith(bt)?e:bt+e,r=e.startsWith(bt)?e.slice(bt.length):e,o=JSON.stringify(t);GM_setValue(n,o),window.dispatchEvent(new CustomEvent("gemini:storage:change",{detail:{key:r,value:t}}));}catch(n){console.error(`[Gemini Storage] Failed to write key "${e}":`,n);}}function Au(e){try{const t=e.startsWith(bt)?e:bt+e;GM_setValue(t,void 0);}catch(t){console.error(`[Gemini Storage] Failed to remove key "${e}":`,t);}}function _u(){try{const e="gemini:",t=[];for(let o=0;o<localStorage.length;o++){const a=localStorage.key(o);a&&a.startsWith(e)&&t.push(a);}for(const o of t)try{const a=localStorage.getItem(o);if(a!==null){const i=JSON.parse(a),s=o.slice(e.length);Oe(s,i),console.log(`[Gemini Storage] Migrated key: ${o}`);}}catch(a){console.warn(`[Gemini Storage] Failed to migrate key "${o}":`,a);}const n="gemini.sections",r=GM_getValue(n);r!=null&&(Oe("sections",r),GM_setValue(n,void 0),console.log("[Gemini Storage] Migrated: gemini.sections → gemini:sections")),t.length>0&&console.log(`[Gemini Storage] Migration complete. ${t.length} keys migrated from localStorage to GM_* storage.`);}catch(e){console.error("[Gemini Storage] Migration failed:",e);}}const cl="gemini.sections";function dl(){const e=Pe(cl,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function Iu(e){Oe(cl,e);}async function Eu(e){return dl()[e]}function Mu(e,t){const n=dl();Iu({...n,[e]:t});}function Vi(e,t){return {...e,...t??{}}}async function Lu(e){const t=await Eu(e.path);let n;e.migrate?n=e.migrate(t):n=t??{},n=Object.assign((d=>JSON.parse(JSON.stringify(d)))(e.defaults),n),e.sanitize&&(n=e.sanitize(n));function o(){Mu(e.path,n);}function a(){return n}function i(d){n=e.sanitize?e.sanitize(d):d,o();}function s(d){const u=Object.assign((p=>JSON.parse(JSON.stringify(p)))(n),{});typeof d=="function"?d(u):Object.assign(u,d),n=e.sanitize?e.sanitize(u):u,o();}function c(){o();}return {get:a,set:i,update:s,save:c}}async function to(e,t){const{path:n=e,...r}=t;return Lu({path:n,...r})}let Fu=0;const rr=new Map;function Ke(e={},...t){const{id:n,className:r,variant:o="default",padding:a="md",interactive:i=false,expandable:s=false,defaultExpanded:c=true,onExpandChange:d,mediaTop:l,title:u,subtitle:p,badge:f,actions:g,footer:m,divider:h=false,tone:x="neutral",stateKey:k}=e,v=b("div",{className:"card",id:n,tabIndex:i?0:void 0});v.classList.add(`card--${o}`,`card--p-${a}`),i&&v.classList.add("card--interactive"),x!=="neutral"&&v.classList.add(`card--tone-${x}`),r&&v.classList.add(...r.split(" ").filter(Boolean)),s&&v.classList.add("card--expandable");const w=s?k??n??(typeof u=="string"?`title:${u}`:null):null;let P=!s||c;w&&rr.has(w)&&(P=!!rr.get(w));let y=null,C=null,T=null,S=null,A=null;const I=n?`${n}-collapse`:`card-collapse-${++Fu}`,F=()=>{if(S!==null&&(cancelAnimationFrame(S),S=null),A){const H=A;A=null,H();}},R=(H,G)=>{if(!T)return;F();const N=T;if(N.setAttribute("aria-hidden",String(!H)),!G){N.classList.remove("card-collapse--animating"),N.style.display=H?"":"none",N.style.height="",N.style.opacity="";return}if(N.classList.add("card-collapse--animating"),N.style.display="",H){N.style.height="auto";const W=N.scrollHeight;if(!W){N.classList.remove("card-collapse--animating"),N.style.display="",N.style.height="",N.style.opacity="";return}N.style.height="0px",N.style.opacity="0",N.offsetHeight,S=requestAnimationFrame(()=>{S=null,N.style.height=`${W}px`,N.style.opacity="1";});}else {const W=N.scrollHeight;if(!W){N.classList.remove("card-collapse--animating"),N.style.display="none",N.style.height="",N.style.opacity="";return}N.style.height=`${W}px`,N.style.opacity="1",N.offsetHeight,S=requestAnimationFrame(()=>{S=null,N.style.height="0px",N.style.opacity="0";});}const O=()=>{N.classList.remove("card-collapse--animating"),N.style.height="",H||(N.style.display="none"),N.style.opacity="";};let j=null;const B=W=>{W.target===N&&(j!==null&&(clearTimeout(j),j=null),N.removeEventListener("transitionend",B),N.removeEventListener("transitioncancel",B),A=null,O());};A=()=>{j!==null&&(clearTimeout(j),j=null),N.removeEventListener("transitionend",B),N.removeEventListener("transitioncancel",B),A=null,O();},N.addEventListener("transitionend",B),N.addEventListener("transitioncancel",B),j=window.setTimeout(()=>{A?.();},420);};function E(H){const G=document.createElementNS("http://www.w3.org/2000/svg","svg");return G.setAttribute("viewBox","0 0 24 24"),G.setAttribute("width","16"),G.setAttribute("height","16"),G.innerHTML=H==="up"?'<path d="M7 14l5-5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>':'<path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',G}function $(H,G=true,N=true){P=H,v.classList.toggle("card--collapsed",!P),v.classList.toggle("card--expanded",P),y&&(y.dataset.expanded=String(P),y.setAttribute("aria-expanded",String(P))),C&&(C.setAttribute("aria-expanded",String(P)),C.classList.toggle("card-toggle--collapsed",!P),C.setAttribute("aria-label",P?"Replier le contenu":"Deplier le contenu"),C.replaceChildren(E(P?"up":"down"))),s?R(P,N):T&&(T.style.display="",T.style.height="",T.style.opacity="",T.setAttribute("aria-hidden","false")),G&&d&&d(P),w&&rr.set(w,P);}if(l){const H=b("div",{className:"card-media"});H.append(l),v.appendChild(H);}const te=!!(u||p||f||g&&g.length||s);if(te){y=b("div",{className:"card-header"});const H=b("div",{className:"card-headline",style:"min-width:0;display:flex;flex-direction:column;gap:2px;"});if(u){const O=b("h3",{className:"card-title",style:"margin:0;font-size:15px;font-weight:700;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:8px;color:var(--fg);"},u);f&&O.append(typeof f=="string"?b("span",{className:"badge"},f):f),H.appendChild(O);}if(p){const O=b("div",{className:"card-subtitle",style:"opacity:.85;font-size:12px;color:color-mix(in oklab, var(--fg) 80%, #9ca3af)"},p);H.appendChild(O);}(H.childNodes.length||s)&&y.appendChild(H);const G=b("div",{className:"card-header-right",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"}),N=b("div",{className:"card-actions",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"});g?.forEach(O=>N.appendChild(O)),N.childNodes.length&&G.appendChild(N),s&&(C=b("button",{className:"card-toggle",type:"button",ariaExpanded:String(P),ariaControls:I,ariaLabel:P?"Replier le contenu":"Deplier le contenu"}),C.textContent=P?"▲":"▼",C.addEventListener("click",O=>{O.preventDefault(),O.stopPropagation(),$(!P);}),G.appendChild(C),y.classList.add("card-header--expandable"),y.addEventListener("click",O=>{const j=O.target;j?.closest(".card-actions")||j?.closest(".card-toggle")||$(!P);})),G.childNodes.length&&y.appendChild(G),v.appendChild(y);}T=b("div",{className:"card-collapse",id:I,ariaHidden:s?String(!P):"false"}),v.appendChild(T),h&&te&&T.appendChild(b("div",{className:"card-divider"}));const z=b("div",{className:"card-body"});if(z.append(...t),T.appendChild(z),m){h&&T.appendChild(b("div",{className:"card-divider"}));const H=b("div",{className:"card-footer"});H.append(m),T.appendChild(H);}return C&&C.setAttribute("aria-controls",I),$(P,false,false),w&&rr.set(w,P),v}let jr=false;const Hr=new Set,He=e=>{const t=document.activeElement;for(const n of Hr)if(t&&(t===n||n.contains(t))){e.stopImmediatePropagation(),e.stopPropagation();return}};function Ru(){jr||(jr=true,window.addEventListener("keydown",He,true),window.addEventListener("keypress",He,true),window.addEventListener("keyup",He,true),document.addEventListener("keydown",He,true),document.addEventListener("keypress",He,true),document.addEventListener("keyup",He,true));}function Nu(){jr&&(Hr.size>0||(jr=false,window.removeEventListener("keydown",He,true),window.removeEventListener("keypress",He,true),window.removeEventListener("keyup",He,true),document.removeEventListener("keydown",He,true),document.removeEventListener("keypress",He,true),document.removeEventListener("keyup",He,true)));}function Ou(e){const{id:t,value:n=null,options:r,placeholder:o="Select...",size:a="md",disabled:i=false,blockGameKeys:s=true,onChange:c,onOpenChange:d}=e,l=b("div",{className:"select",id:t}),u=b("button",{className:"select-trigger",type:"button"}),p=b("span",{className:"select-value"},o),f=b("span",{className:"select-caret"},"▾");u.append(p,f);const g=b("div",{className:"select-menu",role:"listbox",tabindex:"-1","aria-hidden":"true"});l.classList.add(`select--${a}`);let m=false,h=n,x=null,k=!!i;function v(O){return O==null?o:(e.options||r).find(B=>B.value===O)?.label??o}function w(O){p.textContent=v(O),g.querySelectorAll(".select-option").forEach(j=>{const B=j.dataset.value,W=O!=null&&B===O;j.classList.toggle("selected",W),j.setAttribute("aria-selected",String(W));});}function P(O){g.replaceChildren(),O.forEach(j=>{const B=b("button",{className:"select-option"+(j.disabled?" disabled":""),type:"button",role:"option","data-value":j.value,"aria-selected":String(j.value===h),tabindex:"-1"},j.label);j.value===h&&B.classList.add("selected"),j.disabled||B.addEventListener("pointerdown",W=>{W.preventDefault(),W.stopPropagation(),I(j.value,{notify:true}),S();},{capture:true}),g.appendChild(B);});}function y(){u.setAttribute("aria-expanded",String(m)),g.setAttribute("aria-hidden",String(!m));}function C(){const O=u.getBoundingClientRect();Object.assign(g.style,{minWidth:`${O.width}px`});}function T(){m||k||(m=true,l.classList.add("open"),y(),C(),document.addEventListener("mousedown",te,true),document.addEventListener("scroll",z,true),window.addEventListener("resize",H),g.focus({preventScroll:true}),s&&(Ru(),Hr.add(l),x=()=>{Hr.delete(l),Nu();}),d?.(true));}function S(){m&&(m=false,l.classList.remove("open"),y(),document.removeEventListener("mousedown",te,true),document.removeEventListener("scroll",z,true),window.removeEventListener("resize",H),u.focus({preventScroll:true}),x?.(),x=null,d?.(false));}function A(){m?S():T();}function I(O,j={}){const B=h;h=O,w(h),j.notify!==false&&B!==O&&c?.(O);}function F(){return h}function R(O){const j=Array.from(g.querySelectorAll(".select-option:not(.disabled)"));if(!j.length)return;const B=j.findIndex(pe=>pe.classList.contains("active")),W=j[(B+(O===1?1:j.length-1))%j.length];j.forEach(pe=>pe.classList.remove("active")),W.classList.add("active"),W.focus({preventScroll:true}),W.scrollIntoView({block:"nearest"});}function E(O){(O.key===" "||O.key==="Enter"||O.key==="ArrowDown")&&(O.preventDefault(),T());}function $(O){if(O.key==="Escape"){O.preventDefault(),S();return}if(O.key==="Enter"||O.key===" "){const j=g.querySelector(".select-option.active")||g.querySelector(".select-option.selected");j&&!j.classList.contains("disabled")&&(O.preventDefault(),I(j.dataset.value,{notify:true}),S());return}if(O.key==="ArrowDown"){O.preventDefault(),R(1);return}if(O.key==="ArrowUp"){O.preventDefault(),R(-1);return}}function te(O){l.contains(O.target)||S();}function z(){m&&C();}function H(){m&&C();}function G(O){k=!!O,u.disabled=k,l.classList.toggle("disabled",k),k&&S();}function N(O){e.options=O,P(O),O.some(j=>j.value===h)||(h=null,w(null));}return l.append(u,g),u.addEventListener("pointerdown",O=>{O.preventDefault(),O.stopPropagation(),A();},{capture:true}),u.addEventListener("keydown",E),g.addEventListener("keydown",$),P(r),n!=null?(h=n,w(h)):w(null),y(),G(k),{root:l,open:T,close:S,toggle:A,getValue:F,setValue:I,setOptions:N,setDisabled:G,destroy(){document.removeEventListener("mousedown",te,true),document.removeEventListener("scroll",z,true),window.removeEventListener("resize",H),x?.(),x=null;}}}function Da(e={}){const{id:t,text:n="",htmlFor:r,tone:o="default",size:a="md",layout:i="inline",variant:s="text",required:c=false,disabled:d=false,tooltip:l,hint:u,icon:p,suffix:f,onClick:g}=e,m=b("div",{className:"lg-label-wrap",id:t}),h=b("label",{className:"lg-label",...r?{htmlFor:r}:{},...l?{title:l}:{}});if(p){const I=typeof p=="string"?b("span",{className:"lg-label-ico"},p):p;I.classList?.add?.("lg-label-ico"),h.appendChild(I);}const x=b("span",{className:"lg-label-text"},n);h.appendChild(x);const k=b("span",{className:"lg-label-req",ariaHidden:"true"}," *");c&&h.appendChild(k);let v=null;if(f!=null){v=typeof f=="string"?document.createTextNode(f):f;const I=b("span",{className:"lg-label-suffix"});I.appendChild(v),h.appendChild(I);}const w=u?b("div",{className:"lg-label-hint"},u):null;m.classList.add(`lg-label--${i}`),m.classList.add(`lg-label--${a}`),s==="title"&&m.classList.add("lg-label--title"),P(o),d&&m.classList.add("is-disabled"),m.appendChild(h),w&&m.appendChild(w),g&&h.addEventListener("click",g);function P(I){m.classList.remove("lg-label--default","lg-label--muted","lg-label--info","lg-label--success","lg-label--warning","lg-label--danger"),m.classList.add(`lg-label--${I}`);}function y(I){x.textContent=I;}function C(I){P(I);}function T(I){I&&!k.isConnected&&h.appendChild(k),!I&&k.isConnected&&k.remove(),I?h.setAttribute("aria-required","true"):h.removeAttribute("aria-required");}function S(I){m.classList.toggle("is-disabled",!!I);}function A(I){!I&&w&&w.isConnected?w.remove():I&&w?w.textContent=I:I&&!w&&m.appendChild(b("div",{className:"lg-label-hint"},I));}return {root:m,labelEl:h,hintEl:w,setText:y,setTone:C,setRequired:T,setDisabled:S,setHint:A}}function mn(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function or(e,t){const n=document.createElement("span");n.className=`btn-ico btn-ico--${t}`;const r=mn(e);return r&&n.appendChild(r),n}function Bu(){const e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.marginRight="6px",t.style.display="none",t.style.flexShrink="0";const n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");const r=document.createElementNS(e,"animate");r.setAttribute("attributeName","stroke-dasharray"),r.setAttribute("values","1,150;90,150;90,150"),r.setAttribute("dur","1.5s"),r.setAttribute("repeatCount","indefinite");const o=document.createElementNS(e,"animateTransform");return o.setAttribute("attributeName","transform"),o.setAttribute("attributeType","XML"),o.setAttribute("type","rotate"),o.setAttribute("from","0 12 12"),o.setAttribute("to","360 12 12"),o.setAttribute("dur","1s"),o.setAttribute("repeatCount","indefinite"),n.appendChild(r),n.appendChild(o),t.appendChild(n),t}function At(e={}){const{label:t="",id:n,variant:r="default",size:o="md",iconLeft:a,iconRight:i,loading:s=false,tooltip:c,type:d="button",onClick:l,disabled:u=false,fullWidth:p=false}=e,f=b("button",{className:"btn",id:n});f.type=d,r==="primary"&&f.classList.add("primary"),r==="danger"&&f.classList.add("danger"),o==="sm"&&f.classList.add("btn--sm"),c&&(f.title=c),p&&(f.style.width="100%");const g=Bu(),m=a?or(a,"left"):null,h=i?or(i,"right"):null,x=document.createElement("span");x.className="btn-label";const k=mn(t);k&&x.appendChild(k),!k&&(m||h)&&f.classList.add("btn--icon"),f.appendChild(g),m&&f.appendChild(m),f.appendChild(x),h&&f.appendChild(h);const v=u||s;f.disabled=v,f.setAttribute("aria-busy",String(!!s)),g.style.display=s?"inline-block":"none",l&&f.addEventListener("click",l);const w=f;return w.setLoading=P=>{f.setAttribute("aria-busy",String(!!P)),g.style.display=P?"inline-block":"none",f.disabled=P||u;},w.setDisabled=P=>{f.disabled=P||f.getAttribute("aria-busy")==="true";},w.setLabel=P=>{x.replaceChildren();const y=mn(P);y&&x.appendChild(y),!y&&(m||h)?f.classList.add("btn--icon"):f.classList.remove("btn--icon");},w.setIconLeft=P=>{if(P==null){m?.remove();return}m?m.replaceChildren(mn(P)):f.insertBefore(or(P,"left"),x);},w.setIconRight=P=>{if(P==null){h?.remove();return}h?h.replaceChildren(mn(P)):f.appendChild(or(P,"right"));},w.setVariant=P=>{f.classList.remove("primary","danger"),P==="primary"&&f.classList.add("primary"),P==="danger"&&f.classList.add("danger");},w}let ul=null,za=null;function $u(){return ul}function Du(e){ul=e,za=null;}function pl(){return za}function zu(e){za=e;}function Gu(){try{const e=window.visualViewport,t=Math.round((e?.width??window.innerWidth)||0),n=Math.round((e?.height??window.innerHeight)||0);if(t&&n)return t>=n?"landscape":"portrait"}catch{}return "unknown"}function fl(){const e=navigator.userAgent||"",t=navigator.platform||"",n=navigator.userAgentData;if(n&&typeof n.platform=="string"){const o=n.platform.toLowerCase();if(o.includes("windows"))return "windows";if(o.includes("mac"))return "mac";if(o.includes("android"))return "android";if(o.includes("chrome os")||o.includes("cros"))return "chromeos";if(o.includes("linux"))return "linux";if(o.includes("ios"))return "ios"}return /iPhone|iPad|iPod/i.test(e)||t==="MacIntel"&&(navigator.maxTouchPoints??0)>1?"ios":/Android/i.test(e)?"android":/CrOS/i.test(e)?"chromeos":/Win/i.test(e)?"windows":/Mac/i.test(e)?"mac":/Linux/i.test(e)?"linux":"unknown"}function gl(){const e=navigator.userAgent||"",t=navigator.userAgentData;if(t&&Array.isArray(t.brands)){const n=t.brands.map(i=>String(i.brand||i.brandName||i.brandVersion||i)),r=n.some(i=>/Edge/i.test(i)||/Microsoft Edge/i.test(i)),o=n.some(i=>/Opera/i.test(i)||/OPR/i.test(i)),a=n.some(i=>/Chrome|Chromium/i.test(i));if(r)return "Edge";if(o)return "Opera";if(a)return "Chrome";if(navigator.brave)return "Brave"}return /FxiOS/i.test(e)?"Firefox":/CriOS/i.test(e)?"Chrome":/EdgiOS/i.test(e)?"Edge":/OPiOS|OPR|Opera Mini|Opera/i.test(e)?"Opera":/Edg\//i.test(e)?"Edge":/OPR\//i.test(e)||/Opera/i.test(e)?"Opera":/Firefox/i.test(e)?"Firefox":/Safari/i.test(e)&&!/Chrome|Chromium|Edg|OPR/i.test(e)?"Safari":/Brave/i.test(e)||window.Brave||navigator.brave?"Brave":/Chrome|Chromium/i.test(e)?"Chrome":"Unknown"}function ju(){const e=$u();if(e)return e;const t=navigator.userAgent||"",n=navigator.userAgentData;return n&&typeof n.mobile=="boolean"?n.mobile?"mobile":"desktop":/Android|iPhone|iPad|iPod|Mobile/i.test(t)?"mobile":"desktop"}function Hu(e){if(!e)return null;try{return new URL(e).hostname}catch{return null}}function ml(){try{return window.top!==window.self}catch{return  true}}function Wu(){const e=ml(),t=Hu(document.referrer);return e&&!!t&&/(^|\.)discord(app)?\.com$/i.test(t)?"discord":"web"}function no(){const e=pl();if(e)return e;const t=Wu(),n=ju(),r=fl(),o=gl(),a=ml(),i=window.screen||{},s=window.visualViewport,c=Math.round(window.innerWidth||document.documentElement.clientWidth||0),d=Math.round(window.innerHeight||document.documentElement.clientHeight||0),l=Math.round(s?.width??c),u=Math.round(s?.height??d),p=Math.round(i.width||0),f=Math.round(i.height||0),g=Math.round(i.availWidth||p),m=Math.round(i.availHeight||f),h=Number.isFinite(window.devicePixelRatio)?window.devicePixelRatio:1,x={surface:t,host:location.hostname,origin:location.origin,isInIframe:a,platform:n,browser:o,os:r,viewportWidth:c,viewportHeight:d,visualViewportWidth:l,visualViewportHeight:u,screenWidth:p,screenHeight:f,availScreenWidth:g,availScreenHeight:m,dpr:h,orientation:Gu()};return zu(x),x}function Uu(){return no().surface==="discord"}function Vu(){return no().platform==="mobile"}function Xu(){no();}function Ku(){return pl()!==null}const De={init:Xu,isReady:Ku,detect:no,isDiscord:Uu,isMobile:Vu,detectOS:fl,detectBrowser:gl,setPlatformOverride:Du};let Wr=false;const hn=new Set;function Yu(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}const We=e=>{const t=Yu();if(t){for(const n of hn)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function qu(){Wr||(Wr=true,window.addEventListener("keydown",We,true),window.addEventListener("keypress",We,true),window.addEventListener("keyup",We,true),document.addEventListener("keydown",We,true),document.addEventListener("keypress",We,true),document.addEventListener("keyup",We,true));}function Ju(){Wr&&(Wr=false,window.removeEventListener("keydown",We,true),window.removeEventListener("keypress",We,true),window.removeEventListener("keyup",We,true),document.removeEventListener("keydown",We,true),document.removeEventListener("keypress",We,true),document.removeEventListener("keyup",We,true));}function Qu(e){return hn.size===0&&qu(),hn.add(e),()=>{hn.delete(e),hn.size===0&&Ju();}}function Zu(e,t,n,r){let o;switch(e){case "digits":o="0-9";break;case "alpha":o="\\p{L}";break;case "alphanumeric":o="\\p{L}0-9";break;default:return null}return t&&(o+=" "),n&&(o+="\\-"),r&&(o+="_"),new RegExp(`[^${o}]`,"gu")}function ep(e,t){return t?e.replace(t,""):e}function tp(e,t=0){if(!t)return e;let n;return((...r)=>{clearTimeout(n),n=setTimeout(()=>e(...r),t);})}function hl(e={}){const{id:t,placeholder:n="",value:r="",mode:o="any",allowSpaces:a=false,allowDashes:i=false,allowUnderscore:s=false,maxLength:c,blockGameKeys:d=true,debounceMs:l=0,onChange:u,onEnter:p,label:f}=e,g=b("div",{className:"lg-input-wrap"}),m=b("input",{className:"input",id:t,placeholder:n});if(typeof c=="number"&&c>0&&(m.maxLength=c),r&&(m.value=r),f){const I=b("div",{className:"lg-input-label"},f);g.appendChild(I);}g.appendChild(m);const h=Zu(o,a,i,s),x=()=>{const I=m.selectionStart??m.value.length,F=m.value.length,R=ep(m.value,h);if(R!==m.value){m.value=R;const E=F-R.length,$=Math.max(0,I-E);m.setSelectionRange($,$);}},k=tp(()=>u?.(m.value),l);m.addEventListener("input",()=>{x(),k();}),m.addEventListener("paste",()=>queueMicrotask(()=>{x(),k();})),m.addEventListener("keydown",I=>{I.key==="Enter"&&p?.(m.value);});const v=d?Qu(m):()=>{};function w(){return m.value}function P(I){m.value=I??"",x(),k();}function y(){m.focus();}function C(){m.blur();}function T(I){m.disabled=!!I;}function S(){return document.activeElement===m}function A(){v();}return {root:g,input:m,getValue:w,setValue:P,focus:y,blur:C,setDisabled:T,isFocused:S,destroy:A}}function ve(e,t,n){return Math.min(n,Math.max(t,e))}function Cn({h:e,s:t,v:n,a:r}){const o=(e%360+360)%360/60,a=n*t,i=a*(1-Math.abs(o%2-1));let s=0,c=0,d=0;switch(Math.floor(o)){case 0:s=a,c=i;break;case 1:s=i,c=a;break;case 2:c=a,d=i;break;case 3:c=i,d=a;break;case 4:s=i,d=a;break;default:s=a,d=i;break}const u=n-a,p=Math.round((s+u)*255),f=Math.round((c+u)*255),g=Math.round((d+u)*255);return {r:ve(p,0,255),g:ve(f,0,255),b:ve(g,0,255),a:ve(r,0,1)}}function bl({r:e,g:t,b:n,a:r}){const o=ve(e,0,255)/255,a=ve(t,0,255)/255,i=ve(n,0,255)/255,s=Math.max(o,a,i),c=Math.min(o,a,i),d=s-c;let l=0;d!==0&&(s===o?l=60*((a-i)/d%6):s===a?l=60*((i-o)/d+2):l=60*((o-a)/d+4)),l<0&&(l+=360);const u=s===0?0:d/s;return {h:l,s:u,v:s,a:ve(r,0,1)}}function Ga({r:e,g:t,b:n}){const r=o=>ve(Math.round(o),0,255).toString(16).padStart(2,"0");return `#${r(e)}${r(t)}${r(n)}`.toUpperCase()}function np({r:e,g:t,b:n,a:r}){const o=ve(Math.round(r*255),0,255);return `${Ga({r:e,g:t,b:n})}${o.toString(16).padStart(2,"0")}`.toUpperCase()}function bn({r:e,g:t,b:n,a:r}){const o=Math.round(r*1e3)/1e3;return `rgba(${e}, ${t}, ${n}, ${o})`}function Ut(e){let t=e.trim();if(!t||(t.startsWith("#")&&(t=t.slice(1)),![3,4,6,8].includes(t.length))||!/^[0-9a-fA-F]+$/.test(t))return null;(t.length===3||t.length===4)&&(t=t.split("").map(i=>i+i).join(""));let n=255;t.length===8&&(n=parseInt(t.slice(6,8),16),t=t.slice(0,6));const r=parseInt(t.slice(0,2),16),o=parseInt(t.slice(2,4),16),a=parseInt(t.slice(4,6),16);return {r,g:o,b:a,a:n/255}}function ta(e){if(!e)return null;const t=e.trim();if(t.startsWith("#"))return Ut(t);const n=t.match(/^rgba?\(([^)]+)\)$/i);if(n){const r=n[1].split(",").map(c=>c.trim());if(r.length<3)return null;const o=Number(r[0]),a=Number(r[1]),i=Number(r[2]),s=r[3]!=null?Number(r[3]):1;return [o,a,i,s].some(c=>Number.isNaN(c))?null:{r:o,g:a,b:i,a:s}}return null}function rp(e,t){const n=ta(e)??Ut(e??"")??{r:244,g:67,b:54,a:1};return typeof t=="number"&&(n.a=ve(t,0,1)),bl(n)}function op(e){return `#${e.trim().replace(/[^0-9a-fA-F#]/g,"").replace(/#/g,"")}`.slice(0,9).toUpperCase()}function ap(e){let t=e.trim();return t&&(/^rgba?\s*\(/i.test(t)?t=t.replace(/^rgba?/i,"rgba"):(t=t.replace(/^\(?(.*)\)?$/,"$1"),t=`rgba(${t})`),t=t.replace(/\s*\(\s*/,"("),t=t.replace(/\s*\)\s*$/,")"),t=t.replace(/\s*,\s*/g,", "),t)}function yt(e){const t=Cn(e),n=Cn({...e,a:1});return {hsva:{...e},hex:Ga(n),hexa:np(t),rgba:bn(t),alpha:e.a}}function ip(e={}){const{id:t,label:n="Color",value:r,alpha:o,defaultExpanded:a=false,detectMobile:i,onInput:s,onChange:c}=e,l=i?i():De.detect().platform==="mobile";let u=rp(r,o);const p=Ke({id:t,className:"color-picker",title:n,padding:l?"md":"lg",variant:"soft",expandable:!l,defaultExpanded:!l&&a});p.classList.add(l?"color-picker--mobile":"color-picker--desktop");const f=p.querySelector(".card-header");f&&f.classList.add("color-picker__header");const g=f?.querySelector(".card-title"),m=b("button",{className:"color-picker__preview",type:"button",title:`Preview ${n}`,"aria-label":`Change ${n}`});g?g.prepend(m):f?f.prepend(m):p.prepend(m);const h=p.querySelector(".card-toggle");!l&&h&&m.addEventListener("click",()=>{p.classList.contains("card--collapsed")&&h.click();});const x=p.querySelector(".card-collapse");let k=null,v=null,w=null,P=null,y=null,C=null,T=null,S=null,A=null,I="hex";function F(z){const H=yt(u);z==="input"?s?.(H):c?.(H);}function R(){const z=yt(u);if(m.style.setProperty("--cp-preview-color",z.rgba),m.setAttribute("aria-label",`${n}: ${z.hexa}`),!l&&k&&v&&w&&P&&y&&C&&T){const H=Cn({...u,s:1,v:1,a:1}),G=bn(H);k.style.setProperty("--cp-palette-hue",G),v.style.left=`${u.s*100}%`,v.style.top=`${(1-u.v)*100}%`,w.style.setProperty("--cp-alpha-gradient",`linear-gradient(180deg, ${bn({...H,a:1})} 0%, ${bn({...H,a:0})} 100%)`),P.style.top=`${(1-u.a)*100}%`,y.style.setProperty("--cp-hue-color",bn(Cn({...u,v:1,s:1,a:1}))),C.style.left=`${u.h/360*100}%`;const N=u.a===1?z.hex:z.hexa,O=z.rgba,j=I==="hex"?N:O;T!==document.activeElement&&(T.value=j),T.setAttribute("aria-label",`${I.toUpperCase()} code for ${n}`),T.placeholder=I==="hex"?"#RRGGBB or #RRGGBBAA":"rgba(0, 0, 0, 1)",I==="hex"?T.maxLength=9:T.removeAttribute("maxLength"),T.dataset.mode=I,S&&(S.textContent=I.toUpperCase(),S.setAttribute("aria-label",I==="hex"?"Passer en saisie RGBA":"Revenir en saisie HEX"),S.setAttribute("aria-pressed",I==="rgba"?"true":"false"),S.classList.toggle("is-alt",I==="rgba"));}A&&A!==document.activeElement&&(A.value=z.hex);}function E(z,H=null){u={h:(z.h%360+360)%360,s:ve(z.s,0,1),v:ve(z.v,0,1),a:ve(z.a,0,1)},R(),H&&F(H);}function $(z,H=null){E(bl(z),H);}function te(z,H,G){z.addEventListener("pointerdown",N=>{N.preventDefault();const O=N.pointerId,j=W=>{W.pointerId===O&&H(W);},B=W=>{W.pointerId===O&&(document.removeEventListener("pointermove",j),document.removeEventListener("pointerup",B),document.removeEventListener("pointercancel",B),G?.(W));};H(N),document.addEventListener("pointermove",j),document.addEventListener("pointerup",B),document.addEventListener("pointercancel",B);});}if(!l&&x){const z=x.querySelector(".card-body");if(z){z.classList.add("color-picker__body"),v=b("div",{className:"color-picker__palette-cursor"}),k=b("div",{className:"color-picker__palette"},v),P=b("div",{className:"color-picker__alpha-thumb"}),w=b("div",{className:"color-picker__alpha"},P),C=b("div",{className:"color-picker__hue-thumb"}),y=b("div",{className:"color-picker__hue"},C);const H=b("div",{className:"color-picker__main"},k,w),G=b("div",{className:"color-picker__hue-row"},y),N=hl({blockGameKeys:true});T=N.input,T.classList.add("color-picker__hex-input"),T.value="",T.maxLength=9,T.spellcheck=false,T.inputMode="text",T.setAttribute("aria-label",`Hex code for ${n}`),S=b("button",{type:"button",className:"color-picker__mode-btn",textContent:"HEX","aria-pressed":"false","aria-label":"Passer en saisie RGBA"}),N.root.classList.add("color-picker__hex-wrap");const O=b("div",{className:"color-picker__hex-row"},S,N.root);z.replaceChildren(H,G,O),te(k,B=>{if(!k||!v)return;const W=k.getBoundingClientRect(),pe=ve((B.clientX-W.left)/W.width,0,1),K=ve((B.clientY-W.top)/W.height,0,1);E({...u,s:pe,v:1-K},"input");},()=>F("change")),te(w,B=>{if(!w)return;const W=w.getBoundingClientRect(),pe=ve((B.clientY-W.top)/W.height,0,1);E({...u,a:1-pe},"input");},()=>F("change")),te(y,B=>{if(!y)return;const W=y.getBoundingClientRect(),pe=ve((B.clientX-W.left)/W.width,0,1);E({...u,h:pe*360},"input");},()=>F("change")),S.addEventListener("click",()=>{if(I=I==="hex"?"rgba":"hex",T){const B=yt(u);T.value=I==="hex"?u.a===1?B.hex:B.hexa:B.rgba;}R(),T?.focus(),T?.select();}),T.addEventListener("input",()=>{if(I==="hex"){const B=op(T.value);if(B!==T.value){const W=T.selectionStart??B.length;T.value=B,T.setSelectionRange(W,W);}}});const j=()=>{const B=T.value;if(I==="hex"){const W=Ut(B);if(!W){T.value=u.a===1?yt(u).hex:yt(u).hexa;return}const pe=B.startsWith("#")?B.slice(1):B,K=pe.length===4||pe.length===8;W.a=K?W.a:u.a,$(W,"change");}else {const W=ap(B),pe=ta(W);if(!pe){T.value=yt(u).rgba;return}$(pe,"change");}};T.addEventListener("change",j),T.addEventListener("blur",j),T.addEventListener("keydown",B=>{B.key==="Enter"&&(j(),T.blur());});}}return l&&(x&&x.remove(),A=b("input",{className:"color-picker__native",type:"color",value:Ga(Cn({...u,a:1}))}),m.addEventListener("click",()=>A.click()),A.addEventListener("input",()=>{const z=Ut(A.value);z&&(z.a=u.a,$(z,"input"),F("change"));}),p.appendChild(A)),R(),{root:p,isMobile:l,getValue:()=>yt(u),setValue:(z,H)=>{const G=ta(z)??Ut(z)??Ut("#FFFFFF");G&&(typeof H=="number"&&(G.a=H),$(G,null));}}}const sp=window;function lp(){if(typeof unsafeWindow<"u"&&unsafeWindow)return unsafeWindow;const e=window.wrappedJSObject;return e&&e!==window?e:sp}const cp=lp(),L=cp;function dp(e){try{return !!e.isSecureContext}catch{return  false}}function ja(e){const t=e?.getRootNode?.();return t&&(t instanceof Document||t.host)?t:document}function xl(){const e=navigator.platform||"",t=navigator.userAgent||"";return /Mac|iPhone|iPad|iPod/i.test(e)||/Mac OS|iOS/i.test(t)}async function up(){try{const e=await navigator.permissions?.query?.({name:"clipboard-write"});return e?e.state==="granted"||e.state==="prompt":!0}catch{return  true}}function pp(e,t){const n=document.createElement("textarea");return n.value=e,n.setAttribute("readonly","true"),n.style.position="fixed",n.style.opacity="0",n.style.pointerEvents="none",n.style.top="0",t.appendChild?t.appendChild(n):document.body.appendChild(n),n}function fp(e){try{const t=window.getSelection?.();if(!t)return !1;const n=document.createRange();return n.selectNodeContents(e),t.removeAllRanges(),t.addRange(n),!0}catch{return  false}}async function gp(e){if(!("clipboard"in navigator))return {ok:false,method:"clipboard-write"};if(!dp(L))return {ok:false,method:"clipboard-write"};if(!await up())return {ok:false,method:"clipboard-write"};try{return await navigator.clipboard.writeText(e),{ok:!0,method:"clipboard-write"}}catch{return {ok:false,method:"clipboard-write"}}}function mp(e,t){try{const n=t||ja(),r=pp(e,n);r.focus(),r.select(),r.setSelectionRange(0,r.value.length);let o=!1;try{o=document.execCommand("copy");}catch{o=!1;}return r.remove(),{ok:o,method:"execCommand"}}catch{return {ok:false,method:"execCommand"}}}function hp(e,t){if(!t)return {ok:false,method:"selection"};const n=t.textContent??"";let r=false;if(n!==e)try{t.textContent=e,r=!0;}catch{}const o=fp(t);r&&setTimeout(()=>{try{t.textContent=n;}catch{}},80);const a=xl()?"⌘C pour copier":"Ctrl+C pour copier";return {ok:o,method:"selection",hint:a}}async function bp(e,t={}){const n=(e??"").toString();if(!n.length)return {ok:false,method:"noop"};const r=await gp(n);if(r.ok)return r;const o=t.injectionRoot||ja(t.valueNode||void 0),a=mp(n,o);if(a.ok)return a;const i=hp(n,t.valueNode||null);if(i.ok)return i;if(!t.disablePromptFallback)try{return window.prompt(De.isDiscord()?"Copie manuelle (Discord bloque clipboard):":"Copie manuelle:",n),{ok:!0,method:"prompt"}}catch{}return {ok:false,method:"noop"}}function xp(e,t,n={}){const r=o=>{if(n.showTip){n.showTip(o);return}try{e.setAttribute("aria-label",o);const a=document.createElement("div");a.textContent=o,a.style.position="absolute",a.style.top="-28px",a.style.right="0",a.style.padding="4px 8px",a.style.borderRadius="8px",a.style.fontSize="12px",a.style.background="color-mix(in oklab, var(--bg) 85%, transparent)",a.style.border="1px solid var(--border)",a.style.color="var(--fg)",a.style.pointerEvents="none",a.style.opacity="0",a.style.transition="opacity .12s";const i=ja(e);i.appendChild?i.appendChild(a):document.body.appendChild(a);const s=e.getBoundingClientRect();a.style.left=`${s.right-8}px`,a.style.top=`${s.top-28}px`,requestAnimationFrame(()=>a.style.opacity="1"),setTimeout(()=>{a.style.opacity="0",setTimeout(()=>a.remove(),150);},1200);}catch{}};e.addEventListener("click",async o=>{o.stopPropagation();const a=(t()??"").toString(),i=await bp(a,{valueNode:n.valueNode??null,injectionRoot:n.injectionRoot??null,disablePromptFallback:n.disablePromptFallback??false});n.onResult?.(i),i.ok?i.method==="clipboard-write"||i.method==="execCommand"||i.method==="prompt"?r("Copié"):i.method==="selection"&&r(i.hint||(xl()?"⌘C pour copier":"Ctrl+C pour copier")):r("Impossible de copier");});}const Tn={light:{"--bg":"rgba(255,255,255,0.7)","--fg":"#0f172a","--muted":"rgba(15,23,42,0.06)","--soft":"rgba(15,23,42,0.04)","--accent":"#2563eb","--border":"rgba(15,23,42,0.12)","--shadow":"rgba(2,6,23,.2)","--paper":"#FDFBF7","--tab-bg":"#ffffff","--tab-fg":"#0f172a","--pill-from":"#4f46e5","--pill-to":"#06b6d4","--low":"#dc2626","--medium":"#f59e0b","--high":"#16a34a","--complete":"#15803d","--info":"#2563eb","--accent-1":"#16a34a","--accent-2":"#7c3aed","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--switch-thumb":"#ffffff","--journal-ink":"#333333"},dark:{"--bg":"rgba(10,12,18,0.6)","--fg":"#e5e7eb","--muted":"rgba(229,231,235,0.08)","--soft":"rgba(229,231,235,0.05)","--accent":"#60a5fa","--border":"rgba(148,163,184,0.2)","--shadow":"rgba(0,0,0,.45)","--paper":"#1a1d24","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#e5e7eb","--pill-from":"#6366f1","--pill-to":"#06b6d4","--low":"#ef4444","--medium":"#f59e0b","--high":"#22c55e","--complete":"#16a34a","--info":"#3b82f6","--accent-1":"#22c55e","--accent-2":"#a855f7","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},sepia:{"--bg":"rgba(247,242,231,0.72)","--fg":"#3b2f2f","--muted":"rgba(59,47,47,0.06)","--soft":"rgba(59,47,47,0.04)","--accent":"#b07d62","--border":"rgba(59,47,47,0.14)","--shadow":"rgba(0,0,0,.18)","--paper":"#F5E6D3","--tab-bg":"#fff","--tab-fg":"#3b2f2f","--pill-from":"#b07d62","--pill-to":"#d4a373","--low":"#c2410c","--medium":"#d97706","--high":"#15803d","--complete":"#166534","--info":"#1d4ed8","--accent-1":"#15803d","--accent-2":"#6b21a8","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--switch-thumb":"#ffffff","--journal-ink":"#3b2f2f"},forest:{"--bg":"rgba(14,24,18,0.62)","--fg":"#e7f5e9","--muted":"rgba(231,245,233,0.08)","--soft":"rgba(231,245,233,0.05)","--accent":"#34d399","--border":"rgba(231,245,233,0.16)","--shadow":"rgba(0,0,0,.5)","--paper":"#1e2820","--tab-bg":"rgba(255,255,255,0.06)","--tab-fg":"#e7f5e9","--pill-from":"#10b981","--pill-to":"#84cc16","--low":"#dc2626","--medium":"#eab308","--high":"#22c55e","--complete":"#16a34a","--info":"#06b6d4","--accent-1":"#22c55e","--accent-2":"#8b5cf6","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},violet:{"--bg":"rgba(23, 16, 42, 0.68)","--fg":"#f5f3ff","--muted":"rgba(245,243,255,0.08)","--soft":"rgba(245,243,255,0.05)","--accent":"#a855f7","--border":"rgba(216,180,254,0.22)","--shadow":"rgba(12,3,30,.55)","--paper":"#1a1424","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#ede9fe","--pill-from":"#a855f7","--pill-to":"#f472b6","--low":"#f43f5e","--medium":"#fbbf24","--high":"#4ade80","--complete":"#22c55e","--info":"#60a5fa","--accent-1":"#4ade80","--accent-2":"#c084fc","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},ocean:{"--bg":"rgba(10, 34, 46, 0.66)","--fg":"#e0f7ff","--muted":"rgba(224,247,255,0.07)","--soft":"rgba(224,247,255,0.05)","--accent":"#38bdf8","--border":"rgba(125, 211, 252, 0.22)","--shadow":"rgba(0, 16, 32, .52)","--paper":"#0f2027","--tab-bg":"rgba(56,189,248,0.14)","--tab-fg":"#e0f7ff","--pill-from":"#0ea5e9","--pill-to":"#14b8a6","--low":"#f43f5e","--medium":"#fbbf24","--high":"#34d399","--complete":"#10b981","--info":"#38bdf8","--accent-1":"#22c55e","--accent-2":"#a78bfa","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},ember:{"--bg":"rgba(34,18,10,0.64)","--fg":"#fff7ed","--muted":"rgba(255,247,237,0.08)","--soft":"rgba(255,247,237,0.05)","--accent":"#f97316","--border":"rgba(255, 159, 92, 0.24)","--shadow":"rgba(16,6,2,.52)","--paper":"#1a1210","--tab-bg":"rgba(255,247,237,0.09)","--tab-fg":"#fff7ed","--pill-from":"#fb923c","--pill-to":"#facc15","--low":"#dc2626","--medium":"#f59e0b","--high":"#22c55e","--complete":"#16a34a","--info":"#38bdf8","--accent-1":"#22c55e","--accent-2":"#c084fc","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},magicGarden:{"--bg":"#201D1D","--fg":"#F5F5F5","--muted":"rgba(255,255,255,0.6)","--soft":"rgba(0,0,0,0.3)","--accent":"#FFF27D","--border":"rgba(255,255,255,0.1)","--border-accent":"#4A3B2E","--shadow":"rgba(0,0,0,0.5)","--paper":"#FDFBF7","--card-shadow":"0 4px 10px rgba(0, 0, 0, 0.5)","--tab-bg":"#10725A","--tab-fg":"#F5F5F5","--section-title":"#10725A","--group-title":"#5EB292","--item-label":"#F5F5F5","--item-desc":"rgba(255,255,255,0.6)","--item-value":"#FFF27D","--card-bg":"rgba(0,0,0,0.3)","--card-radius":"12px","--card-border":"#4A3B2E","--pill-from":"#FFF27D","--pill-to":"#5EB292","--scrollbar-thumb":"rgba(255,255,255,0.2)","--scrollbar-thumb-hover":"rgba(255,255,255,0.3)","--low":"#F98B4B","--medium":"#F3D32B","--high":"#5EAC46","--complete":"#0B893F","--info":"#38bdf8","--accent-1":"#4caf50","--accent-2":"#9c27b0","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--switch-thumb":"#ffffff","--journal-ink":"#000000"}};function yp(e){const{host:t,themes:n,initialTheme:r,onThemeChange:o}=e;let a=r,i=null,s=false;function c(l){const u=n[l]||n[a]||{};t.setAttribute("data-theme",l),s&&t.classList.add("theme-anim");for(const[p,f]of Object.entries(u))t.style.setProperty(p,f);s?(i!==null&&clearTimeout(i),i=L.setTimeout(()=>{t.classList.remove("theme-anim"),i=null;},320)):s=true,a=l,o?.(l);}function d(){return a}return c(r),{applyTheme:c,getCurrentTheme:d}}const na={ui:{expandedCards:{style:false,system:false}}};async function vp(){const e=await to("tab-settings",{version:1,defaults:na,sanitize:o=>({ui:{expandedCards:Vi(na.ui.expandedCards,o.ui?.expandedCards)}})});function t(o){const a=e.get();e.update({ui:{...a.ui,...o,expandedCards:Vi(a.ui.expandedCards,o.expandedCards)}});}function n(o,a){const i=e.get();e.update({ui:{...i.ui,expandedCards:{...i.ui.expandedCards,[o]:!!a}}});}function r(o){const a=e.get();n(o,!a.ui.expandedCards[o]);}return {get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:r}}function yl(e){return e.replace(/[_-]+/g," ").replace(/^\w/,t=>t.toUpperCase())}function wp(){return Object.keys(Tn).map(e=>({value:e,label:yl(e)}))}const Sp=["--bg","--fg","--accent","--muted","--soft","--border","--shadow","--paper","--tab-bg","--tab-fg","--pill-from","--pill-to","--low","--medium","--high","--complete","--info","--accent-1","--accent-2","--accent-3"];function kp(e){return yl(e.replace(/^--/,""))}function Cp(e){return e.alpha<1?e.rgba:e.hex}class Tp extends rn{constructor(t){super({id:"tab-settings",label:"Settings"}),this.deps=t;}async build(t){const n=this.createGrid("12px");n.id="settings",t.appendChild(n);let r;try{r=await vp();}catch{r={get:()=>na,set:()=>{},save:()=>{},setUI:()=>{},setCardExpanded:()=>{},toggleCard:()=>{}};}const o=r.get(),a=Object.keys(Tn),i=this.deps.getCurrentTheme?.()??this.deps.initialTheme,s=a.includes(i)?i:a[0]??"dark";let c=s;const d=Da({text:"Theme",tone:"muted",size:"lg"}),l=Ou({options:wp(),value:s,onChange:g=>{c=g,this.deps.applyTheme(g),this.renderThemePickers(g,u,c);}}),u=b("div",{className:"settings-theme-grid"}),p=Ke({title:"Style",padding:"lg",expandable:true,defaultExpanded:!!o.ui.expandedCards.style,onExpandChange:g=>r.setCardExpanded("style",g)},b("div",{className:"kv settings-theme-row"},d.root,l.root),u);this.renderThemePickers(s,u,c);const f=this.createEnvCard({defaultExpanded:!!o.ui.expandedCards.system,onExpandChange:g=>r.setCardExpanded("system",g)});n.appendChild(p),n.appendChild(f);}renderThemePickers(t,n,r){const o=Tn[t];if(n.replaceChildren(),!!o)for(const a of Sp){const i=o[a];if(i==null)continue;const s=ip({label:kp(a),value:i,defaultExpanded:false,onInput:c=>this.updateThemeVar(t,a,c,r),onChange:c=>this.updateThemeVar(t,a,c,r)});n.appendChild(s.root);}}updateThemeVar(t,n,r,o){const a=Tn[t];a&&(a[n]=Cp(r),o===t&&this.deps.applyTheme(t));}createEnvCard(t){const n=t?.defaultExpanded??false,r=t?.onExpandChange,o=(h,x)=>{const k=b("div",{className:"kv kv--inline-mobile"}),v=b("label",{},h),w=b("div",{className:"ro"});return typeof x=="string"?w.textContent=x:w.append(x),k.append(v,w),k},a=b("code",{},"—"),i=b("span",{},"—"),s=b("span",{},"—"),c=b("span",{},"—"),d=b("span",{},"—"),l=b("span",{},"—"),u=()=>{const h=De.detect();s.textContent=h.surface,c.textContent=h.platform,d.textContent=h.browser??"Unknown",l.textContent=h.os??"Unknown",a.textContent=h.host,i.textContent=h.isInIframe?"Yes":"No";},p=At({label:"Copy JSON",variant:"primary",size:"sm"});xp(p,()=>{const h=De.detect();return JSON.stringify(h,null,2)});const f=b("div",{style:"width:100%;display:flex;justify-content:center;"},p),g=Ke({title:"System",variant:"soft",padding:"lg",footer:f,expandable:true,defaultExpanded:n,onExpandChange:r},o("Surface",s),o("Platform",c),o("Browser",d),o("OS",l),o("Host",a),o("Iframe",i)),m=()=>{document.hidden||u();};return document.addEventListener("visibilitychange",m),u(),this.addCleanup(()=>document.removeEventListener("visibilitychange",m)),g}}function Ha(e={}){const{id:t,checked:n=false,disabled:r=false,size:o="md",label:a,labelSide:i="right",onChange:s}=e,c=b("div",{className:"lg-switch-wrap"}),d=b("button",{className:`lg-switch lg-switch--${o}`,id:t,type:"button",role:"switch","aria-checked":String(!!n),"aria-disabled":String(!!r),title:a??"Basculer"}),l=b("span",{className:"lg-switch-track"}),u=b("span",{className:"lg-switch-thumb"});d.append(l,u);let p=null;a&&i!=="none"&&(p=b("span",{className:"lg-switch-label"},a)),p&&i==="left"?c.append(p,d):p&&i==="right"?c.append(d,p):c.append(d);let f=!!n,g=!!r;function m(){d.classList.toggle("on",f),d.setAttribute("aria-checked",String(f)),d.disabled=g,d.setAttribute("aria-disabled",String(g));}function h(S=false){g||(f=!f,m(),S||s?.(f));}function x(S){S.preventDefault(),h();}function k(S){g||((S.key===" "||S.key==="Enter")&&(S.preventDefault(),h()),S.key==="ArrowLeft"&&(S.preventDefault(),w(false)),S.key==="ArrowRight"&&(S.preventDefault(),w(true)));}d.addEventListener("click",x),d.addEventListener("keydown",k);function v(){return f}function w(S,A=false){f=!!S,m(),A||s?.(f);}function P(S){g=!!S,m();}function y(S){if(!S){p&&(p.remove(),p=null);return}p?p.textContent=S:(p=b("span",{className:"lg-switch-label"},S),c.append(p));}function C(){d.focus();}function T(){d.removeEventListener("click",x),d.removeEventListener("keydown",k);}return m(),{root:c,button:d,isChecked:v,setChecked:w,setDisabled:P,setLabel:y,focus:C,destroy:T}}function vl(e){const{id:t,columns:n,data:r,pageSize:o=0,stickyHeader:a=true,zebra:i=true,animations:s=true,respectReducedMotion:c=true,compact:d=false,maxHeight:l,selectable:u=false,selectionType:p="switch",selectOnRowClick:f=false,initialSelection:g=[],hideHeaderCheckbox:m=false,getRowId:h=(U,J)=>String(J),onSortChange:x,onSelectionChange:k,onRowClick:v}=e;let w=n.slice(),P=r.slice(),y=r.slice(),C=null,T=null,S=1;const A=typeof window<"u"&&typeof window.matchMedia=="function"?window.matchMedia("(prefers-reduced-motion: reduce)").matches:false,I=!!s&&!(c&&A),F=b("div",{className:"lg-table-wrap",id:t});if(l!=null){const U=typeof l=="number"?`${l}px`:l;F.style.setProperty("--tbl-max-h",U);}const R=b("div",{className:"lg-table"}),E=b("div",{className:"lg-thead"}),$=b("div",{className:"lg-tbody"}),te=b("div",{className:"lg-tfoot"});a&&F.classList.add("sticky"),i&&F.classList.add("zebra"),d&&F.classList.add("compact"),u&&F.classList.add("selectable");const z=p==="switch"?"52px":"36px";F.style.setProperty("--check-w",z);function H(U){return U==="center"?"center":U==="right"?"flex-end":"flex-start"}function G(){const U=w.map(ae=>{const le=(ae.width||"1fr").trim();return /\bfr$/.test(le)?`minmax(0, ${le})`:le}),J=(u?[z,...U]:U).join(" ");F.style.setProperty("--lg-cols",J);}G();function N(){return o?Math.max(1,Math.ceil(P.length/o)):1}function O(){if(!o)return P;const U=(S-1)*o;return P.slice(U,U+o)}function j(){if(!C||!T)return;const U=w.find(le=>String(le.key)===C),J=T==="asc"?1:-1,ae=U?.sortFn?(le,ge)=>J*U.sortFn(le,ge):(le,ge)=>{const ne=le[C],re=ge[C];return ne==null&&re==null?0:ne==null?-1*J:re==null?1*J:typeof ne=="number"&&typeof re=="number"?J*(ne-re):J*String(ne).localeCompare(String(re),void 0,{numeric:true,sensitivity:"base"})};P.sort(ae);}const B=new Set(g);function W(){return Array.from(B)}const pe=new Map;function K(U){B.clear(),U.forEach(J=>B.add(J)),Ee(),pe.forEach((J,ae)=>{J.setChecked(B.has(ae),true);}),dn(),k?.(W());}function q(){B.clear(),Ee(),pe.forEach(U=>U.setChecked(false,true)),dn(),k?.(W());}let he=null;function Ee(){if(!he)return;const U=O();if(!U.length){he.indeterminate=false,he.checked=false;return}const J=U.map((le,ge)=>h(le,(S-1)*(o||0)+ge)),ae=J.reduce((le,ge)=>le+(B.has(ge)?1:0),0);he.checked=ae===J.length,he.indeterminate=ae>0&&ae<J.length;}function Qn(){const U=$.offsetWidth-$.clientWidth;E.style.paddingRight=U>0?`${U}px`:"0px";}function wo(){requestAnimationFrame(Qn);}const So=new ResizeObserver(()=>Qn()),Di=()=>Qn();function lu(){E.replaceChildren();const U=b("div",{className:"lg-tr lg-tr-head"});if(u){const J=b("div",{className:"lg-th lg-th-check"});m||(he=b("input",{type:"checkbox"}),he.addEventListener("change",()=>{const ae=O(),le=he.checked;ae.forEach((ge,ne)=>{const re=h(ge,(S-1)*(o||0)+ne);le?B.add(re):B.delete(re);}),k?.(W()),dn();}),J.appendChild(he)),U.appendChild(J);}w.forEach(J=>{const ae=b("button",{className:"lg-th",type:"button",title:J.title||J.header});ae.textContent=J.header,J.align&&ae.style.setProperty("--col-justify",H(J.align)),J.sortable&&ae.classList.add("sortable"),C===String(J.key)&&T?ae.setAttribute("data-sort",T):ae.removeAttribute("data-sort"),J.sortable&&ae.addEventListener("click",()=>{const le=String(J.key);C!==le?(C=le,T="asc"):(T=T==="asc"?"desc":T==="desc"?null:"asc",T||(C=null,P=y.slice())),x?.(C,T),C&&T&&j(),er();}),U.appendChild(ae);}),E.appendChild(U);try{So.disconnect();}catch{}So.observe($),wo();}function ko(U){return Array.from(U.querySelectorAll(":scope > .lg-td, :scope > .lg-td-check"))}function zi(U){return U.querySelector(".lg-td, .lg-td-check")}function Gi(U){const J=zi(U);return J?J.getBoundingClientRect():null}function dn(){const U=O(),J=new Map;Array.from($.children).forEach(ne=>{const re=ne,Me=re.getAttribute("data-id");if(!Me)return;const ze=Gi(re);ze&&J.set(Me,ze);});const ae=new Map;Array.from($.children).forEach(ne=>{const re=ne,Me=re.getAttribute("data-id");Me&&ae.set(Me,re);});const le=[];for(let ne=0;ne<U.length;ne++){const re=U[ne],Me=(o?(S-1)*o:0)+ne,ze=h(re,Me);le.push(ze);let xe=ae.get(ze);xe||(xe=cu(re,Me),I&&ko(xe).forEach(un=>{un.style.transform="translateY(6px)",un.style.opacity="0";})),$.appendChild(xe);}const ge=[];if(ae.forEach((ne,re)=>{le.includes(re)||ge.push(ne);}),!I){ge.forEach(ne=>ne.remove()),Ee(),wo();return}le.forEach(ne=>{const re=$.querySelector(`.lg-tr-body[data-id="${ne}"]`);if(!re)return;const Me=Gi(re),ze=J.get(ne),xe=ko(re);if(ze&&Me){const nt=ze.left-Me.left,zt=ze.top-Me.top;xe.forEach(ht=>{ht.style.transition="none",ht.style.transform=`translate(${nt}px, ${zt}px)`,ht.style.opacity="1";}),zi(re)?.getBoundingClientRect(),xe.forEach(ht=>{ht.style.willChange="transform, opacity",ht.style.transition="transform .18s ease, opacity .18s ease";}),requestAnimationFrame(()=>{xe.forEach(ht=>{ht.style.transform="translate(0,0)";});});}else xe.forEach(nt=>{nt.style.transition="transform .18s ease, opacity .18s ease";}),requestAnimationFrame(()=>{xe.forEach(nt=>{nt.style.transform="translate(0,0)",nt.style.opacity="1";});});const Co=nt=>{(nt.propertyName==="transform"||nt.propertyName==="opacity")&&(xe.forEach(zt=>{zt.style.willChange="",zt.style.transition="",zt.style.transform="",zt.style.opacity="";}),nt.currentTarget.removeEventListener("transitionend",Co));},un=xe[0];un&&un.addEventListener("transitionend",Co);}),ge.forEach(ne=>{const re=ko(ne);re.forEach(xe=>{xe.style.willChange="transform, opacity",xe.style.transition="transform .18s ease, opacity .18s ease",xe.style.opacity="0",xe.style.transform="translateY(-6px)";});const Me=xe=>{xe.propertyName==="opacity"&&(xe.currentTarget.removeEventListener("transitionend",Me),ne.remove());},ze=re[0];ze?ze.addEventListener("transitionend",Me):ne.remove();}),Ee(),wo();}function cu(U,J){const ae=h(U,J),le=b("div",{className:"lg-tr lg-tr-body","data-id":ae});if(u){const ge=b("div",{className:"lg-td lg-td-check"});if(p==="switch"){const ne=Ha({size:"sm",checked:B.has(ae),onChange:re=>{re?B.add(ae):B.delete(ae),Ee(),k?.(W());}});pe.set(ae,ne),ge.appendChild(ne.root);}else {const ne=b("input",{type:"checkbox",className:"lg-row-check"});ne.checked=B.has(ae),ne.addEventListener("change",re=>{re.stopPropagation(),ne.checked?B.add(ae):B.delete(ae),Ee(),k?.(W());}),ne.addEventListener("click",re=>re.stopPropagation()),ge.appendChild(ne);}le.appendChild(ge);}return w.forEach(ge=>{const ne=b("div",{className:"lg-td"});ge.align&&ne.style.setProperty("--col-justify",H(ge.align));let re=ge.render?ge.render(U,J):String(U[ge.key]??"");typeof re=="string"?ne.textContent=re:ne.appendChild(re),le.appendChild(ne);}),(v||u&&f)&&(le.classList.add("clickable"),le.addEventListener("click",ge=>{if(!ge.target.closest(".lg-td-check")){if(u&&f){const ne=!B.has(ae);if(ne?B.add(ae):B.delete(ae),Ee(),p==="switch"){const re=pe.get(ae);re&&re.setChecked(ne,true);}else {const re=le.querySelector(".lg-row-check");re&&(re.checked=ne);}k?.(W());}v?.(U,J,ge);}})),le}function ji(){if(te.replaceChildren(),!o)return;const U=N(),J=b("div",{className:"lg-pager"}),ae=b("button",{className:"btn",type:"button"},"←"),le=b("button",{className:"btn",type:"button"},"→"),ge=b("span",{className:"lg-pager-info"},`${S} / ${U}`);ae.disabled=S<=1,le.disabled=S>=U,ae.addEventListener("click",()=>Zn(S-1)),le.addEventListener("click",()=>Zn(S+1)),J.append(ae,ge,le),te.appendChild(J);}function Zn(U){const J=N();S=Math.min(Math.max(1,U),J),dn(),ji();}function er(){G(),lu(),dn(),ji();}function du(U){y=U.slice(),P=U.slice(),C&&T&&j(),Zn(1);}function uu(U){w=U.slice(),er();}function pu(U,J="asc"){C=U,T=U?J:null,C&&T?j():P=y.slice(),er();}function fu(){try{So.disconnect();}catch{}window.removeEventListener("resize",Di);}return R.append(E,$,te),F.appendChild(R),window.addEventListener("resize",Di),er(),{root:F,setData:du,setColumns:uu,sortBy:pu,getSelection:W,setSelection:K,clearSelection:q,setPage:Zn,getState:()=>({page:S,pageCount:N(),sortKey:C,sortDir:T}),destroy:fu}}let Ur=false;const xn=new Set;function Pp(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}const Ue=e=>{const t=Pp();if(t){for(const n of xn)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function Ap(){Ur||(Ur=true,window.addEventListener("keydown",Ue,true),window.addEventListener("keypress",Ue,true),window.addEventListener("keyup",Ue,true),document.addEventListener("keydown",Ue,true),document.addEventListener("keypress",Ue,true),document.addEventListener("keyup",Ue,true));}function _p(){Ur&&(Ur=false,window.removeEventListener("keydown",Ue,true),window.removeEventListener("keypress",Ue,true),window.removeEventListener("keyup",Ue,true),document.removeEventListener("keydown",Ue,true),document.removeEventListener("keypress",Ue,true),document.removeEventListener("keyup",Ue,true));}function Ip(e){return xn.size===0&&Ap(),xn.add(e),()=>{xn.delete(e),xn.size===0&&_p();}}function ar(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function Ep(){const e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.display="none",t.style.flexShrink="0";const n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");const r=document.createElementNS(e,"animate");r.setAttribute("attributeName","stroke-dasharray"),r.setAttribute("values","1,150;90,150;90,150"),r.setAttribute("dur","1.5s"),r.setAttribute("repeatCount","indefinite");const o=document.createElementNS(e,"animateTransform");return o.setAttribute("attributeName","transform"),o.setAttribute("attributeType","XML"),o.setAttribute("type","rotate"),o.setAttribute("from","0 12 12"),o.setAttribute("to","360 12 12"),o.setAttribute("dur","1s"),o.setAttribute("repeatCount","indefinite"),n.append(r,o),t.appendChild(n),t}function Wa(e={}){const{id:t,placeholder:n="Rechercher…",value:r="",size:o="md",disabled:a=false,autoFocus:i=false,onChange:s,onSearch:c,autoSearch:d=false,debounceMs:l=0,focusKey:u="/",iconLeft:p,iconRight:f,withClear:g=true,clearTitle:m="Effacer",ariaLabel:h,submitLabel:x,loading:k=false,blockGameKeys:v=true}=e,w=b("div",{className:"search"+(o?` search--${o}`:""),id:t}),P=b("span",{className:"search-ico search-ico--left"});if(p){const q=ar(p);q&&P.appendChild(q);}else P.textContent="🔎",P.style.opacity=".9";const y=b("input",{className:"input search-input",type:"text",placeholder:n,value:r,"aria-label":h||n}),C=b("span",{className:"search-ico search-ico--right"});if(f){const q=ar(f);q&&C.appendChild(q);}const T=Ep();T.classList.add("search-spinner");const S=g?b("button",{className:"search-clear",type:"button",title:m},"×"):null,A=x!=null?b("button",{className:"btn search-submit",type:"button"},x):null,I=b("div",{className:"search-field"},P,y,C,T,...S?[S]:[]);w.append(I,...A?[A]:[]);let F=!!a,R=null;function E(q){T.style.display=q?"inline-block":"none",w.classList.toggle("is-loading",q);}function $(){R!=null&&(window.clearTimeout(R),R=null);}function te(q){$(),l>0?R=window.setTimeout(()=>{R=null,q();},l):q();}function z(){s?.(y.value),d&&c&&c(y.value);}y.addEventListener("input",()=>{te(z);}),y.addEventListener("keydown",q=>{q.key==="Enter"?(q.preventDefault(),$(),c?.(y.value)):q.key==="Escape"&&(y.value.length>0?N("",{notify:true}):y.blur());}),S&&S.addEventListener("click",()=>N("",{notify:true})),A&&A.addEventListener("click",()=>c?.(y.value));let H=()=>{};if(v&&(H=Ip(y)),u){const q=he=>{if(he.key===u&&!he.ctrlKey&&!he.metaKey&&!he.altKey){const Ee=document.activeElement;Ee&&(Ee.tagName==="INPUT"||Ee.tagName==="TEXTAREA"||Ee.isContentEditable)||(he.preventDefault(),y.focus());}};window.addEventListener("keydown",q,true),w.__cleanup=()=>{window.removeEventListener("keydown",q,true),H();};}else w.__cleanup=()=>{H();};function G(q){F=!!q,y.disabled=F,S&&(S.disabled=F),A&&(A.disabled=F),w.classList.toggle("disabled",F);}function N(q,he={}){const Ee=y.value;y.value=q??"",he.notify&&Ee!==q&&te(z);}function O(){return y.value}function j(){y.focus();}function B(){y.blur();}function W(q){y.placeholder=q;}function pe(q){N("",q);}return G(F),E(k),i&&j(),{root:w,input:y,getValue:O,setValue:N,focus:j,blur:B,setDisabled:G,setPlaceholder:W,clear:pe,setLoading:E,setIconLeft(q){P.replaceChildren();const he=ar(q??"🔎");he&&P.appendChild(he);},setIconRight(q){C.replaceChildren();const he=ar(q??"");he&&C.appendChild(he);}}}const ro=e=>new Promise(t=>setTimeout(t,e)),et=e=>{try{return e()}catch{return}},st=(e,t,n)=>Math.max(t,Math.min(n,e)),Mp=e=>st(e,0,1);async function Xi(e,t,n){const r=performance.now();for(;performance.now()-r<t;){const o=await Promise.race([e,ro(50).then(()=>null)]);if(o!==null)return o}throw new Error(`${n} timeout`)}let Ua=null;function wl(){return Ua}function Lp(e){Ua=e;}function Sl(){return Ua!==null}const Fp=/\/(?:r\/\d+\/)?version\/([^/]+)/,Rp=15e3,Np=50;function Op(){return L?.document??(typeof document<"u"?document:null)}function Va(e={}){if(Sl())return;const t=e.doc??Op();if(!t)return;const n=t.scripts;for(let r=0;r<n.length;r++){const a=n.item(r)?.src;if(!a)continue;const i=a.match(Fp);if(i?.[1]){Lp(i[1]);return}}}function Bp(){return Va(),wl()}function $p(){return Sl()}async function Dp(e={}){const t=e.timeoutMs??Rp,n=performance.now();for(;performance.now()-n<t;){Va();const r=wl();if(r)return r;await ro(Np);}throw new Error("MGVersion timeout (gameVersion not found)")}const Xa={init:Va,isReady:$p,get:Bp,wait:Dp},zp=L?.location?.origin||"https://magicgarden.gg";function kl(){return typeof GM_xmlhttpRequest=="function"}function Cl(e,t="text"){return new Promise((n,r)=>{GM_xmlhttpRequest({method:"GET",url:e,responseType:t,onload:o=>o.status>=200&&o.status<300?n(o):r(new Error(`HTTP ${o.status} for ${e}`)),onerror:()=>r(new Error(`Network error for ${e}`)),ontimeout:()=>r(new Error(`Timeout for ${e}`))});})}async function Ka(e){if(kl())return JSON.parse((await Cl(e,"text")).responseText);const t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.json()}async function Tl(e){if(kl())return (await Cl(e,"blob")).response;const t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.blob()}function Gp(e){return new Promise((t,n)=>{const r=URL.createObjectURL(e),o=L?.Image||Image,a=new o;a.decoding="async",a.onload=()=>{URL.revokeObjectURL(r),t(a);},a.onerror=()=>{URL.revokeObjectURL(r),n(new Error("Image decode failed"));},a.src=r;})}const pt=(e,t)=>e.replace(/\/?$/,"/")+String(t||"").replace(/^\//,""),jp=e=>e.lastIndexOf("/")>=0?e.slice(0,e.lastIndexOf("/")+1):"",Ki=(e,t)=>String(t||"").startsWith("/")?String(t).slice(1):jp(e)+String(t||"");let Ya=null,Pl=null;function Hp(){return Ya}function Wp(){return Pl}function Up(e){Ya=e;}function Vp(e){Pl=e;}function Al(){return Ya!==null}const Xp=15e3;async function Kp(e={}){Al()||await qa(e);}async function qa(e={}){const t=Hp();if(t)return t;const n=Wp();if(n)return n;const r=(async()=>{const o=e.gameVersion??await Xa.wait({timeoutMs:Xp}),a=`${zp}/version/${o}/assets/`;return Up(a),a})();return Vp(r),r}async function Yp(e){const t=await qa();return pt(t,e)}function qp(){return Al()}const Nt={init:Kp,isReady:qp,base:qa,url:Yp},_l=new Map;function Jp(e){return _l.get(e)}function Qp(e,t){_l.set(e,t);}const Il="manifest.json";let ra=null;async function Zp(){ra||(ra=await El());}function ef(){return ra!==null}async function El(e={}){const t=e.baseUrl??await Nt.base(),n=Jp(t);if(n)return n;const r=Ka(pt(t,Il));return Qp(t,r),r}function tf(e,t){return e.bundles.find(n=>n.name===t)??null}function nf(e){if(!e)return [];const t=new Set;for(const n of e.assets)for(const r of n.src??[])typeof r=="string"&&r.endsWith(".json")&&r!==Il&&t.add(r);return Array.from(t)}const ft={init:Zp,isReady:ef,load:El,getBundle:tf,listJsonFromBundle:nf},rf=L,Ze=rf.Object??Object,oo=Ze.keys,Vr=Ze.values,Xr=Ze.entries,Yi=new WeakSet;function of(){return {data:{items:null,decor:null,mutations:null,eggs:null,pets:null,abilities:null,plants:null,weather:null},isHookInstalled:false,scanInterval:null,scanAttempts:0,weatherPollingTimer:null,weatherPollAttempts:0,colorPollingTimer:null,colorPollAttempts:0}}const Y=of(),vt={items:["WateringCan","PlanterPot","Shovel"],decor:["SmallRock","MediumRock","LargeRock","WoodBench","StoneBench","MarbleBench"],mutations:["Gold","Rainbow","Wet","Chilled","Frozen"],eggs:["CommonEgg","UncommonEgg","RareEgg"],pets:["Worm","Snail","Bee","Chicken","Bunny"],abilities:["ProduceScaleBoost","DoubleHarvest","SeedFinderI","CoinFinderI"],plants:["Carrot","Strawberry","Aloe","Blueberry","Apple"]},af=["Rain","Frost","Dawn","AmberMoon"],qi=/main-[^/]+\.js(\?|$)/,sf=6,lf=150,cf=2e3,df=200,uf=50,pf=10,ff=1e3,oa="ProduceScaleBoost",wt=(e,t)=>t.every(n=>e.includes(n));function St(e,t){Y.data[e]==null&&(Y.data[e]=t,Kr()&&Fl());}function Kr(){return Object.values(Y.data).every(e=>e!=null)}function Ml(e,t){if(!e||typeof e!="object"||Yi.has(e))return;Yi.add(e);let n;try{n=oo(e);}catch{return}if(!n||n.length===0)return;const r=e;let o;if(!Y.data.items&&wt(n,vt.items)&&(o=r.WateringCan,o&&typeof o=="object"&&"coinPrice"in o&&"creditPrice"in o&&St("items",r)),!Y.data.decor&&wt(n,vt.decor)&&(o=r.SmallRock,o&&typeof o=="object"&&"coinPrice"in o&&"creditPrice"in o&&St("decor",r)),!Y.data.mutations&&wt(n,vt.mutations)&&(o=r.Gold,o&&typeof o=="object"&&"baseChance"in o&&"coinMultiplier"in o&&St("mutations",r)),!Y.data.eggs&&wt(n,vt.eggs)&&(o=r.CommonEgg,o&&typeof o=="object"&&"faunaSpawnWeights"in o&&"secondsToHatch"in o&&St("eggs",r)),!Y.data.pets&&wt(n,vt.pets)&&(o=r.Worm,o&&typeof o=="object"&&"coinsToFullyReplenishHunger"in o&&"diet"in o&&Array.isArray(o.diet)&&St("pets",r)),!Y.data.abilities&&wt(n,vt.abilities)&&(o=r.ProduceScaleBoost,o&&typeof o=="object"&&"trigger"in o&&"baseParameters"in o&&St("abilities",r)),!Y.data.plants&&wt(n,vt.plants)&&(o=r.Carrot,o&&typeof o=="object"&&"seed"in o&&"plant"in o&&"crop"in o&&St("plants",r)),!(t>=sf))for(const a of n){let i;try{i=r[a];}catch{continue}i&&typeof i=="object"&&Ml(i,t+1);}}function Rr(e){try{Ml(e,0);}catch{}}function Ll(){if(!Y.isHookInstalled){if(Ze.__MG_HOOKED__){Y.isHookInstalled=true;return}Ze.__MG_HOOKED__=true,Y.isHookInstalled=true;try{Ze.keys=function(t){return Rr(t),oo.apply(this,arguments)},Vr&&(Ze.values=function(t){return Rr(t),Vr.apply(this,arguments)}),Xr&&(Ze.entries=function(t){return Rr(t),Xr.apply(this,arguments)});}catch{}}}function Fl(){if(Y.isHookInstalled){try{Ze.keys=oo,Vr&&(Ze.values=Vr),Xr&&(Ze.entries=Xr);}catch{}Y.isHookInstalled=false;}}function gf(){if(Y.scanInterval||Kr())return;const e=()=>{if(Kr()||Y.scanAttempts>lf){Rl();return}Y.scanAttempts++;try{oo(L).forEach(t=>{try{Rr(L[t]);}catch{}});}catch{}};e(),Y.scanInterval=setInterval(e,cf);}function Rl(){Y.scanInterval&&(clearInterval(Y.scanInterval),Y.scanInterval=null);}const Ji=L;function mf(){try{for(const e of Ji.document?.scripts||[]){const t=e?.src?String(e.src):"";if(qi.test(t))return t}}catch{}try{for(const e of Ji.performance?.getEntriesByType?.("resource")||[]){const t=e?.name?String(e.name):"";if(qi.test(t))return t}}catch{}return null}function hf(e,t){const n=[];let r=e.indexOf(t);for(;r!==-1;)n.push(r),r=e.indexOf(t,r+t.length);return n}function Ja(e,t){let n=0,r="",o=false;for(let a=t;a<e.length;a++){const i=e[a];if(r){if(o){o=false;continue}if(i==="\\"){o=true;continue}i===r&&(r="");continue}if(i==='"'||i==="'"||i==="`"){r=i;continue}if(i==="{")n++;else if(i==="}"&&--n===0)return e.slice(t,a+1)}return null}function bf(e,t){const n=Math.max(e.lastIndexOf("const ",t),e.lastIndexOf("let ",t),e.lastIndexOf("var ",t));if(n<0)return null;const r=e.indexOf("=",n);if(r<0||r>t)return null;const o=e.indexOf("{",r);return o<0||o>t?null:Ja(e,o)}let To=null,pn=null;async function Nl(){return To||pn||(pn=(async()=>{const e=mf();if(!e)return null;try{const t=await fetch(e,{credentials:"include"});if(!t.ok)return null;const n=await t.text();return To=n,n}catch{return null}finally{pn=null;}})(),pn)}function xf(e){const t={};let n=false;for(const r of af){const o=e?.[r];if(!o||typeof o!="object")continue;const a=o.iconSpriteKey||null,{iconSpriteKey:i,...s}=o;t[r]={weatherId:r,spriteId:a,...s},n=true;}return t.Sunny||(t.Sunny={weatherId:"Sunny",name:"Sunny",spriteId:"sprite/ui/SunnyIcon",type:"primary"}),!n||t.Rain&&t.Rain.mutator?.mutation!=="Wet"?null:t}async function yf(){if(Y.data.weather)return  true;const e=await Nl();if(!e)return  false;let t=e.indexOf("fixedTimeSlots:[0,48,96,144,192,240]");if(t<0&&(t=e.indexOf('name:"Amber Moon"')),t<0)return  false;const n=bf(e,t);if(!n)return  false;const r=n.replace(/\b[A-Za-z_$][\w$]*\.(Rain|Frost|Dawn|AmberMoon)\b/g,'"$1"');let o;try{o=Function('"use strict";return('+r+")")();}catch{return  false}const a=xf(o);return a?(Y.data.weather=a,true):false}function vf(){if(Y.weatherPollingTimer)return;Y.weatherPollAttempts=0;const e=setInterval(async()=>{(await yf()||++Y.weatherPollAttempts>df)&&(clearInterval(e),Y.weatherPollingTimer=null);},uf);Y.weatherPollingTimer=e;}function wf(){Y.weatherPollingTimer&&(clearInterval(Y.weatherPollingTimer),Y.weatherPollingTimer=null);}const Sf={bg:"rgba(100, 100, 100, 0.9)",hover:"rgba(150, 150, 150, 1)"};function kf(e){const t=hf(e,oa);if(!t.length)return null;for(const n of t){const r=Math.max(0,n-4e3),o=Math.min(e.length,n+4e3),i=e.slice(r,o).lastIndexOf("switch(");if(i===-1)continue;const s=r+i,c=e.indexOf("{",s);if(c===-1)continue;const d=Ja(e,c);if(d&&d.includes(oa)&&(d.includes('bg:"')||d.includes("bg:'")))return d}return null}function Cf(e){const t={},n=[],r=/case\s*(['"])([^'"]+)\1\s*:|default\s*:|return\s*\{/g,o=(i,s)=>{const c=new RegExp(`${s}\\s*:\\s*(['"])([\\s\\S]*?)\\1`),d=i.match(c);return d?d[2]:null};let a;for(;(a=r.exec(e))!==null;){if(a[2]){n.push(a[2]);continue}const i=a[0];if(i.startsWith("default")){n.length=0;continue}if(!i.startsWith("return"))continue;const s=e.indexOf("{",a.index);if(s===-1){n.length=0;continue}const c=Ja(e,s);if(!c){n.length=0;continue}const d=o(c,"bg");if(!d){n.length=0;continue}const l=o(c,"hover")||d;for(const u of n)t[u]||(t[u]={bg:d,hover:l});n.length=0;}return Object.keys(t).length?t:null}async function Tf(){const e=await Nl();if(!e)return null;const t=kf(e);return t?Cf(t):null}function Pf(e){const t=e[oa];return t!=null&&typeof t=="object"&&"color"in t}async function Af(){if(!Y.data.abilities)return  false;const e=Y.data.abilities;if(Pf(e))return  true;const t=await Tf();if(!t)return  false;const n={};for(const[r,o]of Object.entries(e)){const a=t[r]||Sf;n[r]={...o,color:{bg:a.bg,hover:a.hover}};}return Y.data.abilities=n,console.log("[MGData] Enriched abilities with colors"),true}function _f(){if(Y.colorPollingTimer)return;Y.colorPollAttempts=0;const e=setInterval(async()=>{(await Af()||++Y.colorPollAttempts>pf)&&(clearInterval(e),Y.colorPollingTimer=null);},ff);Y.colorPollingTimer=e;}function If(){Y.colorPollingTimer&&(clearInterval(Y.colorPollingTimer),Y.colorPollingTimer=null);}function Ef(e){return String(e||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^A-Za-z0-9]/g,"").trim()}function Mf(e,t=[]){const n=new Set,r=o=>{const a=String(o||"").trim();a&&n.add(a);};r(e);for(const o of t)r(o);for(const o of Array.from(n.values()))o.endsWith("s")?r(o.slice(0,-1)):r(`${o}s`),o.endsWith("es")&&r(o.slice(0,-2));return Array.from(n.values()).filter(Boolean)}function Ol(e,t,n,r=[],o=[]){const a=window.Gemini?.Modules?.Sprite;if(!a)return null;const i=Mf(e,r);if(!i.length)return null;const s=[t,...o].filter(u=>typeof u=="string"),c=u=>{const p=String(u||"").trim();if(!p)return null;for(const f of i)try{if(a.has(f,p))return a.getIdPath(f,p)}catch{}return null};for(const u of s){const p=c(u);if(p)return p}const d=Ef(n||""),l=c(d||n||"");if(l)return l;try{for(const u of i){const p=a.listIds(`sprite/${u}/`),f=s.map(m=>String(m||"").toLowerCase()),g=String(n||d||"").toLowerCase();for(const m of p){const x=(m.split("/").pop()||"").toLowerCase();if(f.some(k=>k&&k===x)||x===g)return m}for(const m of p){const x=(m.split("/").pop()||"").toLowerCase();if(f.some(k=>k&&x.includes(k))||g&&x.includes(g))return m}}}catch{}return null}function je(e,t,n,r,o=[],a=[]){if(!e||typeof e!="object")return;const i=e.tileRef;if(!i||typeof i!="object")return;const s=String(i.spritesheet||t||"").trim(),c=Ol(s,n,r,o,a);if(c)try{e.spriteId=c;}catch{}const d=e.rotationVariants;if(d&&typeof d=="object")for(const l of Object.values(d))je(l,s,n,r);if(e.immatureTileRef){const l={tileRef:e.immatureTileRef};je(l,s,n,r),l.spriteId&&(e.immatureSpriteId=l.spriteId);}if(e.topmostLayerTileRef){const l={tileRef:e.topmostLayerTileRef};je(l,s,n,r),l.spriteId&&(e.topmostLayerSpriteId=l.spriteId);}e.activeState&&typeof e.activeState=="object"&&je(e.activeState,s,n,e.activeState?.name||r);}function Lf(e,t,n,r=[]){if(!Array.isArray(t)||t.length===0)return null;const o=t[0],a=t.slice(1);return Ol(e,o,n??null,r,a)}function Ff(e){for(const[t,n]of Object.entries(e.items||{}))je(n,"items",t,n?.name,["item"]);for(const[t,n]of Object.entries(e.decor||{}))je(n,"decor",t,n?.name);for(const[t,n]of Object.entries(e.mutations||{})){je(n,"mutations",t,n?.name,["mutation"]);const r=Lf("mutation-overlay",[`${t}TallPlant`,`${t}TallPlantIcon`,t],n?.name,["mutation-overlay"]);if(r)try{n.overlaySpriteId=r;}catch{}}for(const[t,n]of Object.entries(e.eggs||{}))je(n,"pets",t,n?.name,["pet"]);for(const[t,n]of Object.entries(e.pets||{}))je(n,"pets",t,n?.name,["pet"]);for(const[t,n]of Object.entries(e.plants||{})){const r=n;r.seed&&je(r.seed,r.seed?.tileRef?.spritesheet||"seeds",`${t}Seed`,r.seed?.name||`${t} Seed`,["seed","plant","plants"],[t]),r.plant&&je(r.plant,r.plant?.tileRef?.spritesheet||"plants",`${t}Plant`,r.plant?.name||`${t} Plant`,["plant","plants","tallplants"],[t]),r.crop&&je(r.crop,r.crop?.tileRef?.spritesheet||"plants",t,r.crop?.name||t,["plant","plants"],[`${t}Crop`]);}}function Rf(){try{Ff(Y.data);}catch(e){try{console.warn("[MGData] sprite resolution failed",e);}catch{}}}const Bl=1e4,$l=50;function Dl(e){return new Promise(t=>setTimeout(t,e))}function Nf(e){return Y.data[e]}function Of(){return {...Y.data}}function Bf(e){return Y.data[e]!=null}async function $f(e,t=Bl,n=$l){const r=Date.now();for(;Date.now()-r<t;){const o=Y.data[e];if(o!=null)return o;await Dl(n);}throw new Error(`MGData.waitFor: timeout waiting for "${e}"`)}async function Df(e=Bl,t=$l){const n=Date.now();for(;Date.now()-n<e;){if(Object.values(Y.data).some(r=>r!=null))return {...Y.data};await Dl(t);}throw new Error("MGData.waitForAnyData: timeout")}const zl=["CoinFinderI","CoinFinderII","CoinFinderIII","SeedFinderI","SeedFinderII","SeedFinderIII","SeedFinderIV","HungerRestore","HungerRestoreII","DoubleHarvest","DoubleHatch","ProduceEater","PetHatchSizeBoost","PetHatchSizeBoostII","PetAgeBoost","PetAgeBoostII","PetRefund","PetRefundII","ProduceRefund","SellBoostI","SellBoostII","SellBoostIII","SellBoostIV","GoldGranter","RainbowGranter","RainDance","PetXpBoost","PetXpBoostII","EggGrowthBoost","EggGrowthBoostII_NEW","EggGrowthBoostII","PlantGrowthBoost","PlantGrowthBoostII","ProduceScaleBoost","ProduceScaleBoostII"];function Gl(e){return zl.includes(e)}function jl(e){return e.filter(t=>Gl(t.action))}function Qi(e){const t=Math.floor(e/3600),n=Math.floor(e%3600/60),r=Math.floor(e%60);return t>0?`${t}h ${n}m`:n>0?`${n}m ${r}s`:`${r}s`}function Po(e){return e?.name||e?.petSpecies||"Unknown Pet"}function Hl(e){const{action:t,parameters:n}=e,r=n;switch(t){case "CoinFinderI":case "CoinFinderII":case "CoinFinderIII":return `Found ${r.coinsFound||0} coins`;case "SeedFinderI":case "SeedFinderII":case "SeedFinderIII":case "SeedFinderIV":return `Found 1× ${r.speciesId||"Unknown"} seed`;case "HungerRestore":case "HungerRestoreII":{const o=Po(r.targetPet),a=r.hungerRestoreAmount||0,s=r.pet?.id===r.targetPet?.id?"itself":o;return `Restored ${a} hunger to ${s}`}case "DoubleHarvest":return `Double harvested ${r.harvestedCrop?.species||"Unknown"}`;case "DoubleHatch":return `Double hatched ${r.extraPet?.petSpecies||"Unknown"}`;case "ProduceEater":{const o=r.growSlot?.species||"Unknown",a=r.sellPrice||0;return `Ate ${o} for ${a} coins`}case "PetHatchSizeBoost":case "PetHatchSizeBoostII":{const o=Po(r.targetPet),a=r.strengthIncrease||0;return `Boosted ${o}'s size by +${a.toFixed(0)}`}case "PetAgeBoost":case "PetAgeBoostII":{const o=Po(r.targetPet);return `Gave +${r.bonusXp||0} XP to ${o}`}case "PetRefund":case "PetRefundII":return `Refunded 1× ${r.eggId||"Unknown Egg"}`;case "ProduceRefund":{const o=r.cropsRefunded?.length||0;return `Refunded ${o} ${o===1?"crop":"crops"}`}case "SellBoostI":case "SellBoostII":case "SellBoostIII":case "SellBoostIV":return `Gave +${r.bonusCoins||0} bonus coins`;case "GoldGranter":case "RainbowGranter":case "RainDance":{const o=r.mutation||"Unknown";return `Made ${r.growSlot?.species||"Unknown"} turn ${o}`}case "PetXpBoost":case "PetXpBoostII":{const o=r.bonusXp||0,a=r.petsAffected?.length||0;return `Gave +${o} XP to ${a} ${a===1?"pet":"pets"}`}case "EggGrowthBoost":case "EggGrowthBoostII_NEW":case "EggGrowthBoostII":{const o=r.secondsReduced||0,a=r.eggsAffected?.length||0,i=Qi(o);return `Reduced ${a} ${a===1?"egg":"eggs"} growth by ${i}`}case "PlantGrowthBoost":case "PlantGrowthBoostII":{const o=r.secondsReduced||0,a=r.numPlantsAffected||0,i=Qi(o);return `Reduced ${a} ${a===1?"plant":"plants"} growth by ${i}`}case "ProduceScaleBoost":case "ProduceScaleBoostII":{const o=r.scaleIncreasePercentage||0,a=r.numPlantsAffected||0;return `Boosted ${a} ${a===1?"crop":"crops"} size by +${o.toFixed(0)}%`}default:return `Unknown ability: ${t}`}}const oe={async init(){Ll(),gf(),vf(),_f();},isReady:Kr,get:Nf,getAll:Of,has:Bf,waitFor:$f,waitForAny:Df,resolveSprites:Rf,cleanup(){Fl(),Rl(),wf(),If();}},zf=new Map;function Gf(){return zf}function aa(){return L.jotaiAtomCache?.cache}function xt(e){const t=Gf(),n=t.get(e);if(n)return n;const r=aa();if(!r)return null;for(const o of r.values())if((o?.debugLabel||o?.label||"")===e)return t.set(e,o),o;return null}function jf(){const e=L;if(e.__REACT_DEVTOOLS_GLOBAL_HOOK__)return;const t=new Map,n=new Map;e.__REACT_DEVTOOLS_GLOBAL_HOOK__={renderers:t,supportsFiber:true,inject:r=>{const o=t.size+1;return t.set(o,r),n.set(o,new Set),o},onCommitFiberRoot:(r,o)=>{const a=n.get(r);a&&a.add(o);},onCommitFiberUnmount:()=>{},onPostCommitFiberRoot:()=>{},getFiberRoots:r=>n.get(r),checkDCE:()=>{},isDisabled:false};}const Hf={baseStore:null,captureInProgress:false,captureError:null,lastCapturedVia:null,mirror:void 0};function on(){return Hf}const Wf="__JOTAI_STORE_READY__";let Zi=false;const ia=new Set;function ir(){if(!Zi){Zi=true;for(const e of ia)try{e();}catch{}try{const e=L.CustomEvent||CustomEvent;L.dispatchEvent?.(new e(Wf));}catch{}}}function Uf(e){ia.add(e);const t=la();if(t.via&&!t.polyfill)try{e();}catch{}return ()=>{ia.delete(e);}}async function Vf(e={}){const{timeoutMs:t=6e3,intervalMs:n=50}=e,r=la();if(!(r.via&&!r.polyfill))return new Promise((o,a)=>{let i=false;const s=Uf(()=>{i||(i=true,s(),o());}),c=Date.now();(async()=>{for(;!i&&Date.now()-c<t;){const l=la();if(l.via&&!l.polyfill){if(i)return;i=true,s(),o();return}await Rn(n);}i||(i=true,s(),a(new Error("Store not captured within timeout")));})();})}const Rn=e=>new Promise(t=>setTimeout(t,e));function Wl(){try{const e=L.Event||Event;L.dispatchEvent?.(new e("visibilitychange"));}catch{}}function sa(e){return e&&typeof e=="object"&&typeof e.get=="function"&&typeof e.set=="function"&&typeof e.sub=="function"}function Ao(e,t=0,n=new WeakSet){if(t>3||!e||typeof e!="object"||n.has(e))return null;try{n.add(e);}catch{return null}if(sa(e))return e;const r=["store","value","current","state","s","baseStore"];for(const o of r)try{const a=e[o];if(sa(a))return a}catch{}return null}function Ul(){const e=on(),t=L.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t?.renderers?.size)return null;let n=0;for(const[r]of t.renderers){const o=t.getFiberRoots?.(r);o&&(n+=o.size||0);}if(n===0)return null;for(const[r]of t.renderers){const o=t.getFiberRoots?.(r);if(o)for(const a of o){const i=new Set,s=[a.current];for(;s.length;){const c=s.pop();if(!(!c||i.has(c))){i.add(c);try{const d=c?.pendingProps?.value;if(sa(d))return e.lastCapturedVia="fiber",d}catch{}try{let d=c?.memoizedState,l=0;for(;d&&l<15;){l++;const u=Ao(d);if(u)return e.lastCapturedVia="fiber",u;const p=Ao(d.memoizedState);if(p)return e.lastCapturedVia="fiber",p;d=d.next;}}catch{}try{if(c?.stateNode){const d=Ao(c.stateNode);if(d)return e.lastCapturedVia="fiber",d}}catch{}c.child&&s.push(c.child),c.sibling&&s.push(c.sibling),c.alternate&&s.push(c.alternate);}}}}return null}function Vl(){return {get:()=>{throw new Error("Store not captured: get unavailable")},set:()=>{throw new Error("Store not captured: set unavailable")},sub:()=>()=>{},__polyfill:true}}async function Xf(e=5e3){const t=Date.now();let n=aa();for(;!n&&Date.now()-t<e;)await Rn(100),n=aa();if(!n)throw new Error("jotaiAtomCache.cache not found");const r=on();let o=null,a=null;const i=[],s=()=>{for(const d of i)try{d.__origWrite&&(d.write=d.__origWrite,delete d.__origWrite);}catch{}};for(const d of n.values()){if(!d||typeof d.write!="function"||d.__origWrite)continue;const l=d.write;d.__origWrite=l,d.write=function(u,p,...f){return a||(o=u,a=p,s()),l.call(this,u,p,...f)},i.push(d);}Wl();const c=Date.now();for(;!a&&Date.now()-c<e;)await Rn(50);return a?(r.lastCapturedVia="write",{get:d=>o(d),set:(d,l)=>a(d,l),sub:(d,l)=>{let u;try{u=o(d);}catch{}const p=setInterval(()=>{let f;try{f=o(d);}catch{return}if(f!==u){u=f;try{l();}catch{}}},100);return ()=>clearInterval(p)}}):(s(),r.lastCapturedVia="polyfill",Vl())}async function Kf(e=1e4){const t=on();Wl();const n=Date.now();for(;Date.now()-n<e;){const r=Ul();if(r)return r;await Rn(50);}return t.lastCapturedVia="polyfill",Vl()}async function Qa(){const e=on();if(e.baseStore&&!e.baseStore.__polyfill)return ir(),e.baseStore;if(e.captureInProgress){const t=Date.now(),n=2500;for(;!e.baseStore&&Date.now()-t<n;)await Rn(25);if(e.baseStore)return e.baseStore.__polyfill||ir(),e.baseStore}e.captureInProgress=true;try{const t=Ul();if(t)return e.baseStore=t,ir(),t;try{const r=await Xf(5e3);return e.baseStore=r,r.__polyfill||ir(),r}catch(r){e.captureError=r;}const n=await Kf();return e.baseStore=n,n}catch(t){throw e.captureError=t,t}finally{e.captureInProgress=false;}}function la(){const e=on();return {via:e.lastCapturedVia,polyfill:!!e.baseStore?.__polyfill,error:e.captureError}}async function Yf(){const e=await Qa(),t=new WeakMap,n=async o=>{let a=t.get(o);if(a)return a;a={last:void 0,has:false,subs:new Set},t.set(o,a);try{a.last=e.get(o),a.has=!0;}catch{}const i=e.sub(o,()=>{let s;try{s=e.get(o);}catch{return}const c=a.last,d=!Object.is(s,c)||!a.has;if(a.last=s,a.has=true,d)for(const l of a.subs)try{l(s,c);}catch{}});return a.unsubUpstream=i,a};return {async get(o){const a=await n(o);if(a.has)return a.last;const i=e.get(o);return a.last=i,a.has=true,i},async set(o,a){await e.set(o,a);const i=await n(o);i.last=a,i.has=true;},async sub(o,a){const i=await n(o);if(i.subs.add(a),i.has)try{a(i.last,i.last);}catch{}return ()=>{i.subs.delete(a);}},getShadow(o){return t.get(o)?.last},hasShadow(o){return !!t.get(o)?.has},async ensureWatch(o){await n(o);},async asStore(){return {get:o=>this.get(o),set:(o,a)=>this.set(o,a),sub:(o,a)=>{let i=null;return this.sub(o,()=>a()).then(s=>i=s),()=>i?.()}}}}}async function Nr(){const e=on();return e.mirror||(e.mirror=await Yf()),e.mirror}const ue={async select(e){const t=await Nr(),n=xt(e);if(!n)throw new Error(`[Store] Atom not found: "${e}"`);return t.get(n)},async set(e,t){const n=await Nr(),r=xt(e);if(!r)throw new Error(`[Store] Atom not found: "${e}"`);await n.set(r,t);},async subscribe(e,t){const n=await Nr(),r=xt(e);if(!r)throw new Error(`[Store] Atom not found: "${e}"`);return n.sub(r,o=>{try{t(o);}catch{}})},async subscribeImmediate(e,t){const n=await ue.select(e);try{t(n);}catch{}return ue.subscribe(e,t)}};async function qf(){await Nr();}function Za(e){return e?Array.isArray(e)?e.slice():e.split(".").map(t=>t.match(/^\d+$/)?Number(t):t):[]}function Nn(e,t){const n=Za(t);let r=e;for(const o of n){if(r==null)return;r=r[o];}return r}function Jf(e,t,n){const r=Za(t);if(!r.length)return n;const o=Array.isArray(e)?[...e]:{...e??{}};let a=o;for(let i=0;i<r.length-1;i++){const s=r[i],c=a[s],d=typeof c=="object"&&c!==null?Array.isArray(c)?[...c]:{...c}:{};a[s]=d,a=d;}return a[r[r.length-1]]=n,o}function es(e,t){const n={};for(const r of t)n[r]=r.includes(".")?Nn(e,r):e?.[r];try{return JSON.stringify(n)}catch{return String(n)}}function Qf(e,t,n){const r=n.mode??"auto";function o(d){const l=t?Nn(d,t):d,u=new Map;if(l==null)return {signatures:u,keys:[]};const p=Array.isArray(l);if((r==="array"||r==="auto"&&p)&&p)for(let g=0;g<l.length;g++){const m=l[g],h=n.key?n.key(m,g,d):g,x=n.sig?n.sig(m,g,d):n.fields?es(m,n.fields):JSON.stringify(m);u.set(h,x);}else for(const[g,m]of Object.entries(l)){const h=n.key?n.key(m,g,d):g,x=n.sig?n.sig(m,g,d):n.fields?es(m,n.fields):JSON.stringify(m);u.set(h,x);}return {signatures:u,keys:Array.from(u.keys())}}function a(d,l){if(d===l)return  true;if(!d||!l||d.size!==l.size)return  false;for(const[u,p]of d)if(l.get(u)!==p)return  false;return  true}async function i(d){let l=null;return ue.subscribeImmediate(e,u=>{const p=t?Nn(u,t):u,{signatures:f}=o(p);if(!a(l,f)){const g=new Set([...l?Array.from(l.keys()):[],...Array.from(f.keys())]),m=[];for(const h of g){const x=l?.get(h)??"__NONE__",k=f.get(h)??"__NONE__";x!==k&&m.push(h);}l=f,d({value:p,changedKeys:m});}})}async function s(d,l){return i(({value:u,changedKeys:p})=>{p.includes(d)&&l({value:u});})}async function c(d,l){const u=new Set(d);return i(({value:p,changedKeys:f})=>{const g=f.filter(m=>u.has(m));g.length&&l({value:p,changedKeys:g});})}return {sub:i,subKey:s,subKeys:c}}const Vt=new Map;function Zf(e,t){const n=Vt.get(e);if(n)try{n();}catch{}return Vt.set(e,t),()=>{try{t();}catch{}Vt.get(e)===t&&Vt.delete(e);}}function fe(e,t={}){const{path:n,write:r="replace"}=t,o=n?`${e}:${Za(n).join(".")}`:e;async function a(){const u=await ue.select(e);return n?Nn(u,n):u}async function i(u){if(typeof r=="function"){const g=await ue.select(e),m=r(u,g);return ue.set(e,m)}const p=await ue.select(e),f=n?Jf(p,n,u):u;return r==="merge-shallow"&&!n&&p&&typeof p=="object"&&typeof u=="object"?ue.set(e,{...p,...u}):ue.set(e,f)}async function s(u){const p=await a(),f=u(p);return await i(f),f}async function c(u,p,f){let g;const m=x=>{const k=n?Nn(x,n):x;if(typeof g>"u"||!f(g,k)){const v=g;g=k,p(k,v);}},h=u?await ue.subscribeImmediate(e,m):await ue.subscribe(e,m);return Zf(o,h)}function d(){const u=Vt.get(o);if(u){try{u();}catch{}Vt.delete(o);}}function l(u){return Qf(e,u?.path??n,u)}return {label:o,get:a,set:i,update:s,onChange:(u,p=Object.is)=>c(false,u,p),onChangeNow:(u,p=Object.is)=>c(true,u,p),asSignature:l,stopOnChange:d}}function _(e){return fe(e)}_("positionAtom");_("lastPositionInMyGardenAtom");_("playerDirectionAtom");_("stateAtom");_("quinoaDataAtom");_("currentTimeAtom");_("actionAtom");_("isPressAndHoldActionAtom");_("mapAtom");_("tileSizeAtom");fe("mapAtom",{path:"cols"});fe("mapAtom",{path:"rows"});fe("mapAtom",{path:"spawnTiles"});fe("mapAtom",{path:"locations.seedShop.spawnTileIdx"});fe("mapAtom",{path:"locations.eggShop.spawnTileIdx"});fe("mapAtom",{path:"locations.toolShop.spawnTileIdx"});fe("mapAtom",{path:"locations.decorShop.spawnTileIdx"});fe("mapAtom",{path:"locations.sellCropsShop.spawnTileIdx"});fe("mapAtom",{path:"locations.sellPetShop.spawnTileIdx"});fe("mapAtom",{path:"locations.collectorsClub.spawnTileIdx"});fe("mapAtom",{path:"locations.wishingWell.spawnTileIdx"});fe("mapAtom",{path:"locations.shopsCenter.spawnTileIdx"});_("playerAtom");_("myDataAtom");_("myUserSlotIdxAtom");_("isSpectatingAtom");_("myCoinsCountAtom");_("numPlayersAtom");fe("playerAtom",{path:"id"});fe("myDataAtom",{path:"activityLogs"});_("userSlotsAtom");_("filteredUserSlotsAtom");_("myUserSlotAtom");_("spectatorsAtom");fe("stateAtom",{path:"child"});fe("stateAtom",{path:"child.data"});fe("stateAtom",{path:"child.data.shops"});const eg=fe("stateAtom",{path:"child.data.userSlots"}),tg=fe("stateAtom",{path:"data.players"}),ng=fe("stateAtom",{path:"data.hostPlayerId"});_("myInventoryAtom");_("myInventoryItemsAtom");_("isMyInventoryAtMaxLengthAtom");_("myFavoritedItemIdsAtom");_("myCropInventoryAtom");_("mySeedInventoryAtom");_("myToolInventoryAtom");_("myEggInventoryAtom");_("myDecorInventoryAtom");_("myPetInventoryAtom");fe("myInventoryAtom",{path:"favoritedItemIds"});_("itemTypeFiltersAtom");_("myItemStoragesAtom");_("myPetHutchStoragesAtom");_("myPetHutchItemsAtom");_("myPetHutchPetItemsAtom");_("myNumPetHutchItemsAtom");_("myValidatedSelectedItemIndexAtom");_("isSelectedItemAtomSuspended");_("mySelectedItemAtom");_("mySelectedItemNameAtom");_("mySelectedItemRotationsAtom");_("mySelectedItemRotationAtom");_("setSelectedIndexToEndAtom");_("myPossiblyNoLongerValidSelectedItemIndexAtom");_("myCurrentGlobalTileIndexAtom");_("myCurrentGardenTileAtom");_("myCurrentGardenObjectAtom");_("myOwnCurrentGardenObjectAtom");_("myOwnCurrentDirtTileIndexAtom");_("myCurrentGardenObjectNameAtom");_("isInMyGardenAtom");_("myGardenBoardwalkTileObjectsAtom");const rg=fe("myDataAtom",{path:"garden"});fe("myDataAtom",{path:"garden.tileObjects"});fe("myOwnCurrentGardenObjectAtom",{path:"objectType"});_("myCurrentStablePlantObjectInfoAtom");_("myCurrentSortedGrowSlotIndicesAtom");_("myCurrentGrowSlotIndexAtom");_("myCurrentGrowSlotsAtom");_("myCurrentGrowSlotAtom");_("secondsUntilCurrentGrowSlotMaturesAtom");_("isCurrentGrowSlotMatureAtom");_("numGrowSlotsAtom");_("myCurrentEggAtom");_("petInfosAtom");_("myPetInfosAtom");_("myPetSlotInfosAtom");_("myPrimitivePetSlotsAtom");_("myNonPrimitivePetSlotsAtom");_("expandedPetSlotIdAtom");_("myPetsProgressAtom");_("myActiveCropMutationPetsAtom");_("totalPetSellPriceAtom");_("selectedPetHasNewVariantsAtom");const og=_("shopsAtom"),ag=_("myShopPurchasesAtom");_("seedShopAtom");_("seedShopInventoryAtom");_("seedShopRestockSecondsAtom");_("seedShopCustomRestockInventoryAtom");_("eggShopAtom");_("eggShopInventoryAtom");_("eggShopRestockSecondsAtom");_("eggShopCustomRestockInventoryAtom");_("toolShopAtom");_("toolShopInventoryAtom");_("toolShopRestockSecondsAtom");_("toolShopCustomRestockInventoryAtom");_("decorShopAtom");_("decorShopInventoryAtom");_("decorShopRestockSecondsAtom");_("decorShopCustomRestockInventoryAtom");_("isDecorShopAboutToRestockAtom");fe("shopsAtom",{path:"seed"});fe("shopsAtom",{path:"tool"});fe("shopsAtom",{path:"egg"});fe("shopsAtom",{path:"decor"});_("myCropItemsAtom");_("myCropItemsToSellAtom");_("totalCropSellPriceAtom");_("friendBonusMultiplierAtom");_("myJournalAtom");_("myCropJournalAtom");_("myPetJournalAtom");_("myStatsAtom");_("myActivityLogsAtom");_("newLogsAtom");_("hasNewLogsAtom");_("newCropLogsFromSellingAtom");_("hasNewCropLogsFromSellingAtom");_("myCompletedTasksAtom");_("myActiveTasksAtom");_("isWelcomeToastVisibleAtom");_("shouldCloseWelcomeToastAtom");_("isInitialMoveToDirtPatchToastVisibleAtom");_("isFirstPlantSeedActiveAtom");_("isThirdSeedPlantActiveAtom");_("isThirdSeedPlantCompletedAtom");_("isDemoTouchpadVisibleAtom");_("areShopAnnouncersEnabledAtom");_("arePresentablesEnabledAtom");_("isEmptyDirtTileHighlightedAtom");_("isPlantTileHighlightedAtom");_("isItemHiglightedInHotbarAtom");_("isItemHighlightedInModalAtom");_("isMyGardenButtonHighlightedAtom");_("isSellButtonHighlightedAtom");_("isShopButtonHighlightedAtom");_("isInstaGrowButtonHiddenAtom");_("isActionButtonHighlightedAtom");_("isGardenItemInfoCardHiddenAtom");_("isSeedPurchaseButtonHighlightedAtom");_("isFirstSeedPurchaseActiveAtom");_("isFirstCropHarvestActiveAtom");_("isWeatherStatusHighlightedAtom");const ig=_("weatherAtom"),ei=_("activeModalAtom");_("hotkeyBeingPressedAtom");_("avatarTriggerAnimationAtom");_("avatarDataAtom");_("emoteDataAtom");_("otherUserSlotsAtom");_("otherPlayerPositionsAtom");_("otherPlayerSelectedItemsAtom");_("otherPlayerLastActionsAtom");_("traderBunnyPlayerId");_("npcPlayersAtom");_("npcQuinoaUsersAtom");_("numNpcAvatarsAtom");_("traderBunnyEmoteTimeoutAtom");_("traderBunnyEmoteAtom");_("unsortedLeaderboardAtom");_("currentGardenNameAtom");_("quinoaEngineAtom");_("quinoaInitializationErrorAtom");_("avgPingAtom");_("serverClientTimeOffsetAtom");_("isEstablishingShotRunningAtom");_("isEstablishingShotCompleteAtom");const se={initialized:false,activeModal:null,isCustom:false,shadow:null,patchedAtoms:new Set,originalReads:new Map,unsubscribes:[],listeners:{onOpen:new Set,onClose:new Set}};function ao(){return se}function sg(){return se.initialized}function Ot(){return se.isCustom&&se.activeModal!==null}function Lt(){return se.activeModal}function Xl(e){return !se.shadow||se.shadow.modal!==e?null:se.shadow.data}function lg(e){se.initialized=e;}function ti(e){se.activeModal=e;}function ni(e){se.isCustom=e;}function Kl(e,t){se.shadow={modal:e,data:t,timestamp:Date.now()};}function Yl(){se.shadow=null;}function ts(e,t){se.patchedAtoms.add(e),se.originalReads.set(e,t);}function cg(e){return se.originalReads.get(e)}function ca(e){return se.patchedAtoms.has(e)}function dg(e){se.patchedAtoms.delete(e),se.originalReads.delete(e);}function ug(e){se.unsubscribes.push(e);}function pg(){for(const e of se.unsubscribes)try{e();}catch{}se.unsubscribes.length=0;}function fg(e){return se.listeners.onOpen.add(e),()=>se.listeners.onOpen.delete(e)}function ql(e){return se.listeners.onClose.add(e),()=>se.listeners.onClose.delete(e)}function Jl(e){for(const t of Array.from(se.listeners.onOpen))try{t(e);}catch{}}function ri(e){for(const t of Array.from(se.listeners.onClose))try{t(e);}catch{}}function gg(){pg(),se.initialized=false,se.activeModal=null,se.isCustom=false,se.shadow=null,se.patchedAtoms.clear(),se.originalReads.clear(),se.listeners.onOpen.clear(),se.listeners.onClose.clear();}const oi={inventory:{atoms:[{atomLabel:"myInventoryAtom",dataKey:"_full",transform:e=>{const t=e;return {items:t.items??[],storages:t.storages??[],favoritedItemIds:t.favoritedItemIds??[]}}}],derivedAtoms:[{atomLabel:"myCropInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Produce"):[]},{atomLabel:"mySeedInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Seed"):[]},{atomLabel:"myToolInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Tool"):[]},{atomLabel:"myEggInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Egg"):[]},{atomLabel:"myDecorInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Decor"):[]},{atomLabel:"myPetInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Pet"):[]}]},journal:{atoms:[{atomLabel:"myJournalAtom",dataKey:"_full"}],derivedAtoms:[{atomLabel:"myCropJournalAtom",sourceKey:"produce",deriveFn:e=>e??{}},{atomLabel:"myPetJournalAtom",sourceKey:"pets",deriveFn:e=>e??{}}]},stats:{atoms:[{atomLabel:"myStatsAtom",dataKey:"_full"}]},activityLog:{atoms:[{atomLabel:"myActivityLogsAtom",dataKey:"logs"}]},seedShop:{atoms:[{atomLabel:"seedShopInventoryAtom",dataKey:"inventory"},{atomLabel:"seedShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},eggShop:{atoms:[{atomLabel:"eggShopInventoryAtom",dataKey:"inventory"},{atomLabel:"eggShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},toolShop:{atoms:[{atomLabel:"toolShopInventoryAtom",dataKey:"inventory"},{atomLabel:"toolShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},decorShop:{atoms:[{atomLabel:"decorShopInventoryAtom",dataKey:"inventory"},{atomLabel:"decorShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},leaderboard:{atoms:[{atomLabel:"unsortedLeaderboardAtom",dataKey:"entries"}]},petHutch:{atoms:[{atomLabel:"myPetHutchItemsAtom",dataKey:"items"},{atomLabel:"myPetHutchPetItemsAtom",dataKey:"petItems"}]}};function Ql(e){return oi[e]}function mg(e){const t=oi[e],n=[];for(const r of t.atoms)n.push(r.atomLabel);if(t.derivedAtoms)for(const r of t.derivedAtoms)n.push(r.atomLabel);return n}const hg=new Set(["inventory","journal","stats","activityLog","petHutch"]),bg=new Set(["seedShop","eggShop","toolShop","decorShop"]),xg=new Set(["leaderboard"]);function yg(e,t,n,r){return function(a){const i=Ot(),s=Lt();if(i&&s===r){const c=Xl(r);if(c!==null){let d;if(n.dataKey==="_full"?d=c:d=c[n.dataKey],d!==void 0)return t(a),n.transform?n.transform(d):d}}return t(a)}}function vg(e,t,n,r,o){return function(i){if(Ot()&&Lt()===o){const s=Xl(o);if(s!==null){const c=s[n];if(c!==void 0)return t(i),r(c)}}return t(i)}}function wg(e){const t=Ql(e);for(const n of t.atoms){const r=xt(n.atomLabel);if(!r||ca(n.atomLabel))continue;const o=r.read;if(typeof o!="function")continue;const a=yg(n.atomLabel,o,n,e);r.read=a,ts(n.atomLabel,o);}if(t.derivedAtoms)for(const n of t.derivedAtoms){const r=xt(n.atomLabel);if(!r||ca(n.atomLabel))continue;const o=r.read;if(typeof o!="function")continue;const a=vg(n.atomLabel,o,n.sourceKey,n.deriveFn,e);r.read=a,ts(n.atomLabel,o);}}async function io(e){const t=Ql(e);for(const r of t.atoms)ns(r.atomLabel);if(t.derivedAtoms)for(const r of t.derivedAtoms)ns(r.atomLabel);const n=await Qa();await Zl(n,e);}async function Sg(e){const t=await Qa();await Zl(t,e);const n=mg(e);for(const r of n){const o=xt(r);if(o)try{t.get(o);}catch{}}}function ns(e){if(!ca(e))return;const t=xt(e),n=cg(e);t&&n&&(t.read=n),dg(e);}async function Zl(e,t){const n=hg.has(t),r=bg.has(t),o=xg.has(t);if(!n&&!r&&!o)return;const a=xt("stateAtom");if(a)try{const i=e.get(a);if(!i||typeof i!="object")return;let s=null;if(n||r){const c=i.child,d=c?.data;if(c&&d&&typeof d=="object"){let l=null;if(n&&Array.isArray(d.userSlots)){const u=d.userSlots.map(p=>{if(!p||typeof p!="object")return p;const f=p,g=f.data,m=g&&typeof g=="object"?{...g}:g;return {...f,data:m}});l={...l??d,userSlots:u};}if(r&&d.shops&&typeof d.shops=="object"&&(l={...l??d,shops:{...d.shops}}),l){const u={...c,data:l};s={...i,child:u};}}}if(o){const c=i.data;if(c&&Array.isArray(c.players)){const d={...c,players:[...c.players]};s={...s??i,data:d};}}if(!s)return;await e.set(a,s);}catch{}}async function kg(){for(const e of Object.keys(oi))await io(e);}let sr=null,Pn=null;async function Cg(){if(ao().initialized)return;Pn=await ue.select("activeModalAtom"),sr=setInterval(async()=>{try{const n=await ue.select("activeModalAtom"),r=Pn;r!==n&&(Pn=n,Tg(n,r));}catch{}},50),ug(()=>{sr&&(clearInterval(sr),sr=null);}),lg(true);}function Tg(e,t){const n=Ot(),r=Lt();e===null&&t!==null&&(n&&r===t?Pg("native"):n||ri({modal:t,wasCustom:false,closedBy:"native"})),e!==null&&!n&&Jl({modal:e,isCustom:false});}async function Pg(e){const t=Lt();t&&(Yl(),ni(false),ti(null),await io(t),ri({modal:t,wasCustom:true,closedBy:e}));}async function Ag(e,t){if(!ao().initialized)throw new Error("[MGCustomModal] Not initialized. Call init() first.");Ot()&&await ec(),Kl(e,t),ni(true),ti(e),wg(e),await Sg(e),await ei.set(e),Pn=e,Jl({modal:e,isCustom:true});}function _g(e,t){const n=ao();if(!n.isCustom||n.activeModal!==e||!n.shadow)return;const o={...n.shadow.data,...t};Kl(e,o);}async function ec(){const e=ao();if(!e.isCustom||!e.activeModal)return;const t=e.activeModal;Yl(),ni(false),ti(null),await ei.set(null),Pn=null,await io(t),ri({modal:t,wasCustom:true,closedBy:"api"});}function Ig(){return new Promise(e=>{if(!Ot()){e();return}const t=ql(()=>{t(),e();});})}async function Eg(){if(Ot()){const e=Lt();e&&await io(e);}await kg(),gg();}const Xt={async init(){return Cg()},isReady(){return sg()},async show(e,t){return Ag(e,t)},update(e,t){return _g(e,t)},async close(){return ec()},isOpen(){return Lt()!==null},isCustomOpen(){return Ot()},getActiveModal(){return Lt()},waitForClose(){return Ig()},onOpen(e){return fg(e)},onClose(e){return ql(e)},async destroy(){return Eg()}};function Mg(){return {ready:false,app:null,renderer:null,ctors:null,baseUrl:null,textures:new Map,animations:new Map,live:new Set,defaultParent:null,overlay:null,categoryIndex:null}}function Lg(){return {lru:new Map,cost:0,srcCanvas:new Map}}function Fg(){return {cache:new Map,maxEntries:200}}const Rg={enabled:true,maxEntries:200,maxCost:800,srcCanvasMax:100},Ng={enabled:true,maxEntries:200},Te=Mg(),Og=Lg(),Bg={...Rg},$g=Fg(),Dg={...Ng};function Fe(){return Te}function en(){return Og}function On(){return Bg}function Bn(){return $g}function da(){return Dg}function tc(){return Te.ready}const rs=Function.prototype.bind,de={_bindPatched:false,engine:null,tos:null,app:null,renderer:null,ticker:null,stage:null};let nc,rc,oc;const zg=new Promise(e=>{nc=e;}),Gg=new Promise(e=>{rc=e;}),jg=new Promise(e=>{oc=e;});function Hg(e){return !!(e&&typeof e=="object"&&typeof e.start=="function"&&typeof e.destroy=="function"&&e.app&&e.app.stage&&e.app.renderer&&e.systems&&typeof e.systems.values=="function")}function Wg(e){try{for(const t of e.systems.values()){const n=t?.system;if(n?.name==="tileObject")return n}}catch{}return null}function Ug(e){de.engine=e,de.tos=Wg(e)||null,de.app=e.app||null,de.renderer=e.app?.renderer||null,de.ticker=e.app?.ticker||null,de.stage=e.app?.stage||null;try{nc(e);}catch{}try{de.app&&rc(de.app);}catch{}try{de.renderer&&oc(de.renderer);}catch{}}function ai(){return de.engine?true:(de._bindPatched||(de._bindPatched=true,Function.prototype.bind=function(e,...t){const n=rs.call(this,e,...t);try{!de.engine&&Hg(e)&&(Function.prototype.bind=rs,de._bindPatched=!1,Ug(e));}catch{}return n}),false)}ai();async function Vg(e=15e3){const t=performance.now();for(;performance.now()-t<e;){if(de.engine)return  true;ai(),await ro(50);}throw new Error("MGPixiHooks: engine capture timeout")}async function Xg(e=15e3){return de.engine||await Vg(e),true}function Kg(){return de.engine&&de.app?{ok:true,engine:de.engine,tos:de.tos,app:de.app}:(ai(),{ok:false,engine:de.engine,tos:de.tos,app:de.app,note:"Not captured. Wait for room, or reload."})}const Ve={engineReady:zg,appReady:Gg,rendererReady:jg,engine:()=>de.engine,tos:()=>de.tos,app:()=>de.app,renderer:()=>de.renderer,ticker:()=>de.ticker,stage:()=>de.stage,PIXI:()=>L.PIXI||null,init:Xg,hook:Kg,ready:()=>!!de.engine};function Yr(e){const t=String(e||"").trim();return t?t.startsWith("sprite/")||t.startsWith("sprites/")?t:t.includes("/")?`sprite/${t}`:t:""}function Wn(e,t){const n=String(e||"").trim().replace(/^sprites?\//,"").replace(/^\/+|\/+$/g,""),r=String(t||"").trim();return r.includes("/")||!n?Yr(r):`sprite/${n}/${r}`}function $n(e,t,n,r){const o=Wn(e,t);if(n.has(o)||r.has(o))return o;const a=String(t||"").trim();if(n.has(a)||r.has(a))return a;const i=Yr(a);return n.has(i)||r.has(i)?i:o}function Yg(e,t,n=25e3){const r=[e],o=new Set;let a=0;for(;r.length&&a++<n;){const i=r.pop();if(!i||o.has(i))continue;if(o.add(i),t(i))return i;const s=i.children;if(Array.isArray(s))for(let c=s.length-1;c>=0;c--)r.push(s[c]);}return null}function qg(e){const t=L.PIXI;if(t?.Texture&&t?.Sprite&&t?.Container&&t?.Rectangle)return {Container:t.Container,Sprite:t.Sprite,Texture:t.Texture,Rectangle:t.Rectangle,AnimatedSprite:t.AnimatedSprite||null};const n=e?.stage,r=Yg(n,o=>o?.texture?.frame&&o?.constructor&&o?.texture?.constructor&&o?.texture?.frame?.constructor);if(!r)throw new Error("No Sprite found yet (constructors).");return {Container:n.constructor,Sprite:r.constructor,Texture:r.texture.constructor,Rectangle:r.texture.frame.constructor,AnimatedSprite:t?.AnimatedSprite||null}}async function Jg(e,t=15e3){const n=performance.now();for(;performance.now()-n<t;)try{return qg(e)}catch{await ro(50);}throw new Error("Constructors timeout")}const kt=(...e)=>{try{console.log("[MGSprite]",...e);}catch{}};function Qg(e){return e&&typeof e=="object"&&e.frames&&e.meta&&typeof e.meta.image=="string"}function _o(e,t,n,r,o){return new e(t,n,r,o)}function Zg(e,t,n,r,o,a,i){let s;try{s=new e({source:t.source,frame:n,orig:r,trim:o||void 0,rotate:a||0});}catch{s=new e(t.baseTexture||t,n,r,o||void 0,a||0);}if(i)if(s.defaultAnchor?.set)try{s.defaultAnchor.set(i.x,i.y);}catch{}else s.defaultAnchor?(s.defaultAnchor.x=i.x,s.defaultAnchor.y=i.y):s.defaultAnchor={x:i.x,y:i.y};try{s.updateUvs?.();}catch{}return s}function em(e,t,n,r){const{Texture:o,Rectangle:a}=r;for(const[i,s]of Object.entries(e.frames)){const c=s.frame,d=!!s.rotated,l=d?2:0,u=d?c.h:c.w,p=d?c.w:c.h,f=_o(a,c.x,c.y,u,p),g=s.sourceSize||{w:c.w,h:c.h},m=_o(a,0,0,g.w,g.h);let h=null;if(s.trimmed&&s.spriteSourceSize){const x=s.spriteSourceSize;h=_o(a,x.x,x.y,x.w,x.h);}n.set(i,Zg(o,t,f,m,h,l,s.anchor||null));}}function tm(e,t,n){if(!(!e.animations||typeof e.animations!="object"))for(const[r,o]of Object.entries(e.animations)){if(!Array.isArray(o))continue;const a=o.map(i=>t.get(i)).filter(Boolean);a.length>=2&&n.set(r,a);}}function nm(e,t){const n=(r,o)=>{const a=String(r||"").trim(),i=String(o||"").trim();!a||!i||(t.has(a)||t.set(a,new Set),t.get(a).add(i));};for(const r of Object.keys(e.frames||{})){const o=/^sprite\/([^/]+)\/(.+)$/.exec(r);o&&n(o[1],o[2]);}}async function rm(e,t){const n=await ft.load({baseUrl:e}),r=ft.getBundle(n,"default");if(!r)throw new Error("No default bundle in manifest");const o=ft.listJsonFromBundle(r),a=new Set,i=new Map,s=new Map,c=new Map;async function d(l){if(a.has(l))return;a.add(l);const u=await Ka(pt(e,l));if(!Qg(u))return;const p=u.meta?.related_multi_packs;if(Array.isArray(p))for(const h of p)await d(Ki(l,h));const f=Ki(l,u.meta.image),g=await Gp(await Tl(pt(e,f))),m=t.Texture.from(g);em(u,m,i,t),tm(u,i,s),nm(u,c);}for(const l of o)await d(l);return {textures:i,animations:s,categoryIndex:c}}let lr=null;async function om(){return Te.ready?true:lr||(lr=(async()=>{const e=performance.now();kt("init start");const t=await Xi(Ve.appReady,15e3,"PIXI app");kt("app ready");const n=await Xi(Ve.rendererReady,15e3,"PIXI renderer");kt("renderer ready"),Te.app=t,Te.renderer=n||t?.renderer||null,Te.ctors=await Jg(t),kt("constructors resolved"),Te.baseUrl=await Nt.base(),kt("base url",Te.baseUrl);const{textures:r,animations:o,categoryIndex:a}=await rm(Te.baseUrl,Te.ctors);return Te.textures=r,Te.animations=o,Te.categoryIndex=a,kt("atlases loaded","textures",Te.textures.size,"animations",Te.animations.size,"categories",Te.categoryIndex?.size??0),Te.ready=true,kt("ready in",Math.round(performance.now()-e),"ms"),true})(),lr)}const tn={Gold:{overlayTall:null,tallIconOverride:null},Rainbow:{overlayTall:null,tallIconOverride:null,angle:130,angleTall:0},Wet:{overlayTall:"sprite/mutation-overlay/WetTallPlant",tallIconOverride:"sprite/mutation/Puddle"},Chilled:{overlayTall:"sprite/mutation-overlay/ChilledTallPlant",tallIconOverride:null},Frozen:{overlayTall:"sprite/mutation-overlay/FrozenTallPlant",tallIconOverride:null},Dawnlit:{overlayTall:null,tallIconOverride:null},Ambershine:{overlayTall:null,tallIconOverride:null},Dawncharged:{overlayTall:null,tallIconOverride:null},Ambercharged:{overlayTall:null,tallIconOverride:null}},ac=Object.keys(tn),am=["Gold","Rainbow","Wet","Chilled","Frozen","Ambershine","Dawnlit","Dawncharged","Ambercharged"],os=new Map(am.map((e,t)=>[e,t]));function qr(e){return [...new Set(e.filter(Boolean))].sort((n,r)=>(os.get(n)??1/0)-(os.get(r)??1/0))}const im=["Wet","Chilled","Frozen"],sm=new Set(["Dawnlit","Ambershine","Dawncharged","Ambercharged"]),lm={Banana:.6,Carrot:.6,Sunflower:.5,Starweaver:.5,FavaBean:.25,BurrosTail:.2},cm={Pepper:.5,Banana:.6},dm=256,um=.5,pm=2;function ic(e){if(!e.length)return {muts:[],overlayMuts:[],selectedMuts:[],sig:""};const t=qr(e),n=fm(e),r=gm(e);return {muts:n,overlayMuts:r,selectedMuts:t,sig:`${t.join(",")}|${n.join(",")}|${r.join(",")}`}}function fm(e){const t=e.filter((o,a,i)=>tn[o]&&i.indexOf(o)===a);if(!t.length)return [];if(t.includes("Gold"))return ["Gold"];if(t.includes("Rainbow"))return ["Rainbow"];const n=["Ambershine","Dawnlit","Dawncharged","Ambercharged"];return t.some(o=>n.includes(o))?qr(t.filter(o=>!im.includes(o))):qr(t)}function gm(e){const t=e.filter((n,r,o)=>tn[n]?.overlayTall&&o.indexOf(n)===r);return qr(t)}function Io(e,t){return e.map(n=>({name:n,meta:tn[n],overlayTall:tn[n]?.overlayTall??null,isTall:t}))}const mm={Gold:{op:"source-atop",colors:["rgb(235,200,0)"],a:.7},Rainbow:{op:"color",colors:["#FF1744","#FF9100","#FFEA00","#00E676","#2979FF","#D500F9"],ang:130,angTall:0,masked:true},Wet:{op:"source-atop",colors:["rgb(50,180,200)"],a:.25},Chilled:{op:"source-atop",colors:["rgb(100,160,210)"],a:.45},Frozen:{op:"source-atop",colors:["rgb(100,130,220)"],a:.5},Dawnlit:{op:"source-atop",colors:["rgb(209,70,231)"],a:.5},Ambershine:{op:"source-atop",colors:["rgb(190,100,40)"],a:.5},Dawncharged:{op:"source-atop",colors:["rgb(140,80,200)"],a:.5},Ambercharged:{op:"source-atop",colors:["rgb(170,60,25)"],a:.5}},cr=(()=>{try{const t=document.createElement("canvas").getContext("2d");if(!t)return new Set;const n=["color","hue","saturation","luminosity","overlay","screen","lighter","source-atop"],r=new Set;for(const o of n)t.globalCompositeOperation=o,t.globalCompositeOperation===o&&r.add(o);return r}catch{return new Set}})();function hm(e){return cr.has(e)?e:cr.has("overlay")?"overlay":cr.has("screen")?"screen":cr.has("lighter")?"lighter":"source-atop"}function bm(e,t,n,r,o=false){const a=(r-90)*Math.PI/180,i=t/2,s=n/2;if(!o){const u=Math.min(t,n)/2;return e.createLinearGradient(i-Math.cos(a)*u,s-Math.sin(a)*u,i+Math.cos(a)*u,s+Math.sin(a)*u)}const c=Math.cos(a),d=Math.sin(a),l=Math.abs(c)*t/2+Math.abs(d)*n/2;return e.createLinearGradient(i-c*l,s-d*l,i+c*l,s+d*l)}function as(e,t,n,r,o=false){const a=r.colors?.length?r.colors:["#fff"],i=r.ang!=null?bm(e,t,n,r.ang,o):e.createLinearGradient(0,0,0,n);a.length===1?(i.addColorStop(0,a[0]),i.addColorStop(1,a[0])):a.forEach((s,c)=>i.addColorStop(c/(a.length-1),s)),e.fillStyle=i,e.fillRect(0,0,t,n);}function xm(e,t,n,r){const o=mm[n];if(!o)return;const a={...o};n==="Rainbow"&&r&&a.angTall!=null&&(a.ang=a.angTall);const i=n==="Rainbow"&&r,s=t.width,c=t.height;e.save();const d=a.masked?hm(a.op):"source-in";if(e.globalCompositeOperation=d,a.a!=null&&(e.globalAlpha=a.a),a.masked){const l=document.createElement("canvas");l.width=s,l.height=c;const u=l.getContext("2d");u.imageSmoothingEnabled=false,as(u,s,c,a,i),u.globalCompositeOperation="destination-in",u.drawImage(t,0,0),e.drawImage(l,0,0);}else as(e,s,c,a,i);e.restore();}function ym(e){return /tallplant/i.test(e)}function ii(e){const t=String(e||"").split("/");return t[t.length-1]||""}function sc(e){switch(e){case "Ambershine":return ["Ambershine","Amberlit"];case "Dawncharged":return ["Dawncharged","Dawnbound"];case "Ambercharged":return ["Ambercharged","Amberbound"];default:return [e]}}function vm(e,t){const n=String(e||"").toLowerCase();for(const r of t.keys()){const o=/sprite\/mutation-overlay\/([A-Za-z0-9]+)TallPlant/i.exec(String(r));if(!o||!o[1])continue;if(o[1].toLowerCase()===n){const i=t.get(r);if(i)return {tex:i,key:r}}}return null}function wm(e,t,n,r){if(!t)return null;const o=ii(e),a=sc(t);for(const i of a){const s=[`sprite/mutation/${i}${o}`,`sprite/mutation/${i}-${o}`,`sprite/mutation/${i}_${o}`,`sprite/mutation/${i}/${o}`,`sprite/mutation/${i}`];for(const c of s){const d=n.get(c);if(d)return {tex:d,key:c}}{const c=`sprite/mutation-overlay/${i}TallPlant`,d=n.get(c);if(d)return {tex:d,key:c};const l=`sprite/mutation-overlay/${i}`,u=n.get(l);if(u)return {tex:u,key:l};const p=vm(t,n);if(p)return p}}return null}function Sm(e,t,n,r){if(!t)return null;const o=tn[t];if(n&&o?.tallIconOverride){const s=r.get(o.tallIconOverride);if(s)return s}const a=ii(e),i=sc(t);for(const s of i){const c=[`sprite/mutation/${s}Icon`,`sprite/mutation/${s}`,`sprite/mutation/${s}${a}`,`sprite/mutation/${s}-${a}`,`sprite/mutation/${s}_${a}`,`sprite/mutation/${s}/${a}`];for(const d of c){const l=r.get(d);if(l)return l}if(n){const d=`sprite/mutation-overlay/${s}TallPlantIcon`,l=r.get(d);if(l)return l;const u=`sprite/mutation-overlay/${s}TallPlant`,p=r.get(u);if(p)return p}}return null}function km(e,t,n){const r=e?.orig?.width??e?.frame?.width??e?.width??1,o=e?.orig?.height??e?.frame?.height??e?.height??1,a=e?.defaultAnchor?.x??0,i=e?.defaultAnchor?.y??0;let s=cm[t]??a;const c=o>r*1.5;let d=lm[t]??(c?i:.4);const l={x:(s-a)*r,y:(d-i)*o},u=Math.min(r,o),p=Math.min(1.5,u/dm);let f=um*p;return n&&(f*=pm),{width:r,height:o,anchorX:a,anchorY:i,offset:l,iconScale:f}}function lc(e,t){return `${t.sig}::${e}`}function cc(e){return e?e.isAnim?e.frames?.length||0:e.tex?1:0:0}function Cm(e,t,n){e.lru.delete(t),e.lru.set(t,n);}function Tm(e,t){if(t.enabled)for(;e.lru.size>t.maxEntries||e.cost>t.maxCost;){const n=e.lru.keys().next().value;if(n===void 0)break;const r=e.lru.get(n);e.lru.delete(n),e.cost=Math.max(0,e.cost-cc(r??null));}}function dc(e,t){const n=e.lru.get(t);return n?(Cm(e,t,n),n):null}function uc(e,t,n,r){e.lru.set(t,n),e.cost+=cc(n),Tm(e,r);}function Pm(e){e.lru.clear(),e.cost=0,e.srcCanvas.clear();}function Am(e,t){return e.srcCanvas.get(t)??null}function _m(e,t,n,r){if(e.srcCanvas.set(t,n),e.srcCanvas.size>r.srcCanvasMax){const o=e.srcCanvas.keys().next().value;o!==void 0&&e.srcCanvas.delete(o);}}function so(e,t,n,r,o){const a=Am(r,e);if(a)return a;let i=null;const s=t?.resolution??1;try{if(t?.extract?.canvas){const c=new n.Sprite(e),d=t.extract.canvas(c);if(c.destroy?.({children:!0,texture:!1,baseTexture:!1}),s>1&&d){const l=Math.round(d.width/s),u=Math.round(d.height/s);i=document.createElement("canvas"),i.width=l,i.height=u;const p=i.getContext("2d");p&&(p.imageSmoothingEnabled=!1,p.drawImage(d,0,0,l,u));}else i=d;}}catch{}if(!i){const c=e?.frame||e?._frame,d=e?.orig||e?._orig,l=e?.trim||e?._trim,u=e?.rotate||e?._rotate||0,p=e?.baseTexture?.resource?.source||e?.baseTexture?.resource||e?.source?.resource?.source||e?.source?.resource||e?._source?.resource?.source||null;if(!c||!p)throw new Error("textureToCanvas fail");i=document.createElement("canvas");const f=Math.max(1,(d?.width??c.width)|0),g=Math.max(1,(d?.height??c.height)|0),m=l?.x??0,h=l?.y??0;i.width=f,i.height=g;const x=i.getContext("2d");x.imageSmoothingEnabled=false,u===true||u===2||u===8?(x.save(),x.translate(m+c.height/2,h+c.width/2),x.rotate(-Math.PI/2),x.drawImage(p,c.x,c.y,c.width,c.height,-c.width/2,-c.height/2,c.width,c.height),x.restore()):x.drawImage(p,c.x,c.y,c.width,c.height,m,h,c.width,c.height);}return _m(r,e,i,o),i}function Im(e,t,n,r,o,a,i,s){const{w:c,h:d,aX:l,aY:u,basePos:p}=t,f=[];for(const g of n){const m=new r.Sprite(e);m.anchor?.set?.(l,u),m.position.set(p.x,p.y),m.zIndex=1;const h=document.createElement("canvas");h.width=c,h.height=d;const x=h.getContext("2d");x.imageSmoothingEnabled=false,x.save(),x.translate(c*l,d*u),x.drawImage(so(e,o,r,a,i),-c*l,-d*u),x.restore(),xm(x,h,g.name,g.isTall);const k=r.Texture.from(h,{resolution:e.resolution??1});s.push(k),m.texture=k,f.push(m);}return f}function Em(e,t,n,r,o,a,i,s,c,d){const{aX:l,basePos:u}=t,p=[];for(const f of n){const g=f.overlayTall&&r.get(f.overlayTall)&&{tex:r.get(f.overlayTall),key:f.overlayTall}||wm(e,f.name,r);if(!g?.tex)continue;const m=so(g.tex,a,o,i,s);if(!m)continue;const h=m.width,x={x:0,y:0},k={x:u.x-l*h,y:0},v=document.createElement("canvas");v.width=h,v.height=m.height;const w=v.getContext("2d");if(!w)continue;w.imageSmoothingEnabled=false,w.drawImage(m,0,0),w.globalCompositeOperation="destination-in",w.drawImage(c,-k.x,-0);const P=o.Texture.from(v,{resolution:g.tex.resolution??1});d.push(P);const y=new o.Sprite(P);y.anchor?.set?.(x.x,x.y),y.position.set(k.x,k.y),y.scale.set(1),y.alpha=1,y.zIndex=3,p.push(y);}return p}function Mm(e,t,n,r,o,a){const{basePos:i}=t,s=[];for(const c of n){if(c.name==="Gold"||c.name==="Rainbow")continue;const d=Sm(e,c.name,c.isTall,r);if(!d)continue;const l=new o.Sprite(d),u=d?.defaultAnchor?.x??.5,p=d?.defaultAnchor?.y??.5;l.anchor?.set?.(u,p),l.position.set(i.x+a.offset.x,i.y+a.offset.y),l.scale.set(a.iconScale),c.isTall&&(l.zIndex=-1),sm.has(c.name)&&(l.zIndex=10),l.zIndex||(l.zIndex=2),s.push(l);}return s}function pc(e,t,n,r){try{if(!e||!r.renderer||!r.ctors?.Container||!r.ctors?.Sprite||!r.ctors?.Texture)return null;const{Container:o,Sprite:a,Texture:i}=r.ctors,s=e?.orig?.width??e?.frame?.width??e?.width??1,c=e?.orig?.height??e?.frame?.height??e?.height??1,d=e?.defaultAnchor?.x??.5,l=e?.defaultAnchor?.y??.5,u={x:s*d,y:c*l},p=so(e,r.renderer,r.ctors,r.cacheState,r.cacheConfig),f=new o;f.sortableChildren=!0;const g=new a(e);g.anchor?.set?.(d,l),g.position.set(u.x,u.y),g.zIndex=0,f.addChild(g);const m=ym(t),h=Io(n.muts,m),x=Io(n.overlayMuts,m),k=Io(n.selectedMuts,m),v=[],w={w:s,h:c,aX:d,aY:l,basePos:u},P=ii(t),y=km(e,P,m);Im(e,w,h,r.ctors,r.renderer,r.cacheState,r.cacheConfig,v).forEach(E=>f.addChild(E)),m&&Em(t,w,x,r.textures,r.ctors,r.renderer,r.cacheState,r.cacheConfig,p,v).forEach($=>f.addChild($)),Mm(t,w,k,r.textures,r.ctors,y).forEach(E=>f.addChild(E));let S={x:0,y:0,width:s,height:c};try{const E=f.getLocalBounds?.()||f.getBounds?.(!0);E&&Number.isFinite(E.width)&&Number.isFinite(E.height)&&(S={x:E.x,y:E.y,width:E.width,height:E.height});}catch{}const{Rectangle:A}=r.ctors,I=A?new A(0,0,s,c):void 0;let F=null;if(typeof r.renderer.generateTexture=="function"?F=r.renderer.generateTexture(f,{resolution:1,region:I}):r.renderer.textureGenerator?.generateTexture&&(F=r.renderer.textureGenerator.generateTexture({target:f,resolution:1,region:I})),!F)throw new Error("no render texture");const R=F instanceof i?F:i.from(r.renderer.extract.canvas(F));try{R.__mg_base={baseX:-S.x,baseY:-S.y,baseW:s,baseH:c,texW:S.width,texH:S.height};}catch{}F&&F!==R&&F.destroy?.(!0),f.destroy({children:!0,texture:!1,baseTexture:!1});try{R.__mg_gen=!0,R.label=`${t}|${n.sig}`;}catch{}return R}catch{return null}}function Lm(e,t,n,r){if(!e||e.length<2)return null;const o=[];for(const a of e){const i=pc(a,t,n,r);i&&o.push(i);}return o.length>=2?o:null}function fc(e,t,n,r,o){const a=t.scale??1,i=t.frameIndex??0,s=t.mutations?.slice().sort().join(",")||"",c=t.anchorX??.5,d=t.anchorY??.5;return `${e}|s${a}|f${i}|m${s}|ax${c}|ay${d}|bm${n}|bp${o}|p${r}`}function Fm(e,t){const n=e.cache.get(t);return n?(n.lastAccess=performance.now(),n.canvas):null}function Rm(e,t,n,r){if(t.enabled){if(e.cache.size>=t.maxEntries){let o=null,a=1/0;for(const[i,s]of e.cache)s.lastAccess<a&&(a=s.lastAccess,o=i);o&&e.cache.delete(o);}e.cache.set(n,{canvas:r,lastAccess:performance.now()});}}function is(e){const t=document.createElement("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");return n&&n.drawImage(e,0,0),t}function Nm(e){e.cache.clear();}function Om(e){return {size:e.cache.size,maxEntries:e.maxEntries}}function Bm(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0);})}async function $m(e,t,n,r,o,a,i,s=5,c=0){if(!t.ready||!a.enabled)return 0;const d=e.length;let l=0;i?.(0,d);for(let u=0;u<d;u+=s){const p=e.slice(u,u+s);for(const f of p)try{const g=$n(null,f,t.textures,t.animations),m={scale:1},h=mc(m),x=hc(h,m),k=xc(h,m.boundsPadding),v=fc(g,m,h,x,k);o.cache.has(v)||ua(t,n,r,null,f,m,o,a),l++;}catch{l++;}i?.(l,d),u+s<d&&await Bm();}return l}function Dm(e){if(e.overlay)return e.overlay;const t=new e.ctors.Container;t.sortableChildren=true,t.zIndex=99999999;try{e.app.stage.sortableChildren=!0;}catch{}return e.app.stage.addChild(t),e.overlay=t,t}function zm(e){const t=e.defaultParent;if(!t)return null;try{return typeof t=="function"?t():t}catch{return null}}function si(e,t,n,r,o,a){if(!n.length)return t;const i=ic(n);if(!i.sig)return t;const s=lc(e,i),c=dc(o,s);if(c?.tex)return c.tex;const d=pc(t,e,i,{renderer:r.renderer,ctors:r.ctors,textures:r.textures,cacheState:o,cacheConfig:a});return d?(uc(o,s,{isAnim:false,tex:d},a),d):t}function gc(e,t,n,r,o,a){if(!n.length)return t;const i=ic(n);if(!i.sig)return t;const s=lc(e,i),c=dc(o,s);if(c?.isAnim&&c.frames?.length)return c.frames;const d=Lm(t,e,i,{renderer:r.renderer,ctors:r.ctors,textures:r.textures,cacheState:o,cacheConfig:a});return d?(uc(o,s,{isAnim:true,frames:d},a),d):t}function ss(e,t,n,r,o,a={}){if(!e.ready)throw new Error("MGSprite not ready yet");const i=$n(r,o,e.textures,e.animations),s=a.mutations||[],c=a.parent||zm(e)||Dm(e),d=e.renderer?.width||e.renderer?.view?.width||innerWidth,l=e.renderer?.height||e.renderer?.view?.height||innerHeight,u=a.center?d/2:a.x??d/2,p=a.center?l/2:a.y??l/2;let f;const g=e.animations.get(i);if(g&&g.length>=2){const x=gc(i,g,s,e,t,n),k=e.ctors.AnimatedSprite;if(k)f=new k(x),f.animationSpeed=a.fps?a.fps/60:a.speed??.15,f.loop=a.loop??true,f.play();else {const v=new e.ctors.Sprite(x[0]),P=1e3/Math.max(1,a.fps||8);let y=0,C=0;const T=S=>{const A=e.app.ticker?.deltaMS??S*16.666666666666668;if(y+=A,y<P)return;const I=y/P|0;y%=P,C=(C+I)%x.length,v.texture=x[C];};v.__mgTick=T,e.app.ticker?.add?.(T),f=v;}}else {const x=e.textures.get(i);if(!x)throw new Error(`Unknown sprite/anim key: ${i}`);const k=si(i,x,s,e,t,n);f=new e.ctors.Sprite(k);}const m=a.anchorX??f.texture?.defaultAnchor?.x??.5,h=a.anchorY??f.texture?.defaultAnchor?.y??.5;return f.anchor?.set?.(m,h),f.position.set(u,p),f.scale.set(a.scale??1),f.alpha=a.alpha??1,f.rotation=a.rotation??0,f.zIndex=a.zIndex??999999,c.addChild(f),e.live.add(f),f.__mgDestroy=()=>{try{f.__mgTick&&e.app.ticker?.remove?.(f.__mgTick);}catch{}try{f.destroy?.({children:!0,texture:!1,baseTexture:!1});}catch{try{f.destroy?.();}catch{}}e.live.delete(f);},f}function Gm(e,t){const n=e.renderer;if(n?.extract?.canvas)return n.extract.canvas(t);if(n?.plugins?.extract?.canvas)return n.plugins.extract.canvas(t);throw new Error("No extract.canvas available on renderer")}const ls=new Map;function mc(e){return e.boundsMode?e.boundsMode:e.mutations&&e.mutations.length>0?"base":"mutations"}function hc(e,t){return e==="mutations"?t.pad??2:t.pad??0}function fn(e){return Number.isFinite(e)?Math.max(0,e):0}function bc(e){if(typeof e=="number"){const t=fn(e);return {top:t,right:t,bottom:t,left:t}}return e?{top:fn(e.top??0),right:fn(e.right??0),bottom:fn(e.bottom??0),left:fn(e.left??0)}:{top:0,right:0,bottom:0,left:0}}function xc(e,t){if(e==="mutations")return "0,0,0,0";if(e==="padded"&&t==null)return "auto";const n=bc(t);return `${n.top},${n.right},${n.bottom},${n.left}`}function yc(e){const t=e?.orig?.width??e?.frame?.width??e?.width??1,n=e?.orig?.height??e?.frame?.height??e?.height??1;return {w:t,h:n}}function vc(e,t,n){const r=e?.__mg_base;return r&&Number.isFinite(r.baseX)&&Number.isFinite(r.baseY)&&Number.isFinite(r.baseW)&&Number.isFinite(r.baseH)&&Number.isFinite(r.texW)&&Number.isFinite(r.texH)?r:{baseX:0,baseY:0,baseW:t,baseH:n,texW:t,texH:n}}function jm(e,t,n,r,o,a){const i=`${e}|f${t}`,s=ls.get(i);if(s)return s;const c=yc(n),d={top:0,right:0,bottom:0,left:0};for(const l of ac){const u=si(e,n,[l],r,o,a),p=vc(u,c.w,c.h),f=Math.max(0,p.baseX),g=Math.max(0,p.baseY),m=Math.max(0,p.texW-p.baseX-p.baseW),h=Math.max(0,p.texH-p.baseY-p.baseH);f>d.left&&(d.left=f),g>d.top&&(d.top=g),m>d.right&&(d.right=m),h>d.bottom&&(d.bottom=h);}return ls.set(i,d),d}function ua(e,t,n,r,o,a={},i,s){if(!e.ready)throw new Error("MGSprite not ready yet");const c=$n(r,o,e.textures,e.animations),d=mc(a),l=hc(d,a),u=xc(d,a.boundsPadding),p=i&&s?.enabled?fc(c,a,d,l,u):null;if(p&&i&&s?.enabled){const v=Fm(i,p);if(v)return is(v)}const f=a.mutations||[],g=e.animations.get(c),m=Math.max(0,(a.frameIndex??0)|0);let h,x;if(g?.length)if(h=g[m%g.length],f.length){const v=gc(c,g,f,e,t,n);x=v[m%v.length];}else x=h;else {const v=e.textures.get(c);if(!v)throw new Error(`Unknown sprite/anim key: ${c}`);h=v,x=si(c,v,f,e,t,n);}let k;if(d==="mutations"){const v=new e.ctors.Sprite(x),w=a.anchorX??v.texture?.defaultAnchor?.x??.5,P=a.anchorY??v.texture?.defaultAnchor?.y??.5;v.anchor?.set?.(w,P),v.scale.set(a.scale??1);const y=new e.ctors.Container;y.addChild(v);try{y.updateTransform?.();}catch{}const C=v.getBounds?.(true)||{x:0,y:0,width:v.width,height:v.height};v.position.set(-C.x+l,-C.y+l),k=Gm(e,y);try{y.destroy?.({children:!0});}catch{}}else {const v=a.scale??1;let w=bc(a.boundsPadding);d==="padded"&&a.boundsPadding==null&&(w=jm(c,m,h,e,t,n)),l&&(w={top:w.top+l,right:w.right+l,bottom:w.bottom+l,left:w.left+l});const P=yc(h),y=vc(x,P.w,P.h),C=Math.max(1,Math.ceil((P.w+w.left+w.right)*v)),T=Math.max(1,Math.ceil((P.h+w.top+w.bottom)*v));k=document.createElement("canvas"),k.width=C,k.height=T;const S=k.getContext("2d");if(S){S.imageSmoothingEnabled=false;const A=so(x,e.renderer,e.ctors,t,n),I=(w.left-y.baseX)*v,F=(w.top-y.baseY)*v;S.drawImage(A,I,F,A.width*v,A.height*v);}}return p&&i&&s?.enabled?(Rm(i,s,p,k),is(k)):k}function Hm(e){for(const t of Array.from(e.live))t.__mgDestroy?.();}function Wm(e,t){return e.defaultParent=t,true}function Um(e,t){return e.defaultParent=t,true}function Bt(){if(!tc())throw new Error("MGSprite not ready yet")}function Vm(e,t,n){return typeof t=="string"?ss(Fe(),en(),On(),e,t,n||{}):ss(Fe(),en(),On(),null,e,t||{})}function Xm(e,t,n){return typeof t=="string"?ua(Fe(),en(),On(),e,t,n||{},Bn(),da()):ua(Fe(),en(),On(),null,e,t||{},Bn(),da())}function Km(){Hm(Fe());}function Ym(e){return Wm(Fe(),e)}function qm(e){return Um(Fe(),e)}function Jm(e,t){const n=Fe(),r=typeof t=="string"?$n(e,t,n.textures,n.animations):$n(null,e,n.textures,n.animations);return n.textures.has(r)||n.animations.has(r)}function Qm(){Bt();const e=Fe().categoryIndex;return e?Array.from(e.keys()).sort((t,n)=>t.localeCompare(n)):[]}function Zm(e){Bt();const t=String(e||"").trim();if(!t)return [];const n=Fe().categoryIndex;return n?Array.from(n.get(t)?.values()||[]):[]}function eh(e,t){Bt();const n=String(e||"").trim(),r=String(t||"").trim();if(!n||!r)return  false;const o=Fe().categoryIndex;if(!o)return  false;const a=n.toLowerCase(),i=r.toLowerCase();for(const[s,c]of o.entries())if(s.toLowerCase()===a){for(const d of c.values())if(d.toLowerCase()===i)return  true}return  false}function th(e){Bt();const t=Fe().categoryIndex;if(!t)return [];const n=String(e||"").trim().toLowerCase(),r=[];for(const[o,a]of t.entries())for(const i of a.values()){const s=Wn(o,i);(!n||s.toLowerCase().startsWith(n))&&r.push(s);}return r.sort((o,a)=>o.localeCompare(a))}function nh(e){Bt();const t=String(e||"").trim();if(!t)return null;const n=Yr(t),r=/^sprite\/([^/]+)\/(.+)$/.exec(n);if(!r)return null;const o=r[1],a=r[2],i=Fe().categoryIndex,s=o.toLowerCase(),c=a.toLowerCase();let d=o,l=a;if(i){const u=Array.from(i.keys()).find(g=>g.toLowerCase()===s);if(!u)return null;d=u;const p=i.get(u);if(!p)return null;const f=Array.from(p.values()).find(g=>g.toLowerCase()===c);if(!f)return null;l=f;}return {category:d,id:l,key:Wn(d,l)}}function rh(e,t){Bt();const n=String(e||"").trim(),r=String(t||"").trim();if(!n||!r)throw new Error("getIdPath(category, id) requires both category and id");const o=Fe().categoryIndex;if(!o)throw new Error("Sprite categories not indexed");const a=n.toLowerCase(),i=r.toLowerCase(),s=Array.from(o.keys()).find(l=>l.toLowerCase()===a)||n,c=o.get(s);if(!c)throw new Error(`Unknown sprite category: ${n}`);const d=Array.from(c.values()).find(l=>l.toLowerCase()===i)||r;if(!c.has(d))throw new Error(`Unknown sprite id: ${n}/${r}`);return Wn(s,d)}function oh(){Pm(en());}function ah(){Nm(Bn());}function ih(){return Om(Bn())}function sh(){return [...ac]}async function lh(e,t,n=10,r=0){return Bt(),$m(e,Fe(),en(),On(),Bn(),da(),t,n,r)}const V={init:om,isReady:tc,show:Vm,toCanvas:Xm,clear:Km,attach:Ym,attachProvider:qm,has:Jm,key:(e,t)=>Wn(e,t),getCategories:Qm,getCategoryId:Zm,hasId:eh,listIds:th,getIdInfo:nh,getIdPath:rh,clearMutationCache:oh,clearToCanvasCache:ah,getToCanvasCacheStats:ih,getMutationNames:sh,warmup:lh};function ch(){return {ready:false,xform:null,xformAt:0}}const Xe=ch();function wc(){return Xe.ready}function an(e){try{if(typeof structuredClone=="function")return structuredClone(e)}catch{}try{return JSON.parse(JSON.stringify(e))}catch{}return e}function Un(){return Ve.tos()}function li(){return Ve.engine()}function dh(){const e=Un()?.map?.cols;return Number.isFinite(e)&&e>0?e:null}function ci(e,t){const n=dh();return n?t*n+e|0:null}let dr=null;async function uh(e=15e3){return Xe.ready?true:dr||(dr=(async()=>{if(await Ve.init(e),!Un())throw new Error("MGTile: engine captured but tileObject system not found");return Xe.ready=true,true})(),dr)}function Et(e,t,n=true){const r=Un(),o=ci(e,t);if(!r||o==null)return {gidx:null,tv:null};let a=r.tileViews?.get?.(o)||null;if(!a&&n&&typeof r.getOrCreateTileView=="function")try{a=r.getOrCreateTileView(o);}catch{}return {gidx:o,tv:a||null}}function Eo(e,t){if("startTime"in t&&(e.startTime=Number(t.startTime)),"endTime"in t&&(e.endTime=Number(t.endTime)),"targetScale"in t&&(e.targetScale=Number(t.targetScale)),"mutations"in t){if(!Array.isArray(t.mutations))throw new Error("MGTile: mutations must be an array of strings");e.mutations=t.mutations.slice();}}function di(e,t){if(!e)throw new Error("MGTile: no tileObject on this tile");if(e.objectType!==t)throw new Error(`MGTile: expected objectType "${t}", got "${e.objectType}"`)}function Kt(e,t,n,r={}){const o=r.ensureView!==false,a=r.forceUpdate!==false,i=li(),{gidx:s,tv:c}=Et(Number(e),Number(t),o);if(s==null)throw new Error("MGTile: cols unavailable (engine/TOS not ready)");if(!c)throw new Error("MGTile: TileView unavailable (not instantiated)");const d=c.tileObject;if(typeof c.onDataChanged!="function")throw new Error("MGTile: tileView.onDataChanged not found (different API?)");if(c.onDataChanged(n),a&&i?.reusableContext&&typeof c.update=="function")try{c.update(i.reusableContext);}catch{}return {ok:true,tx:Number(e),ty:Number(t),gidx:s,before:d,after:c.tileObject}}function lo(e,t,n={}){const r=n.ensureView!==false,o=n.clone!==false,{gidx:a,tv:i}=Et(Number(e),Number(t),r);if(a==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!i)return {tx:Number(e),ty:Number(t),gidx:a,tileView:null,tileObject:void 0};const s=i.tileObject;return {tx:Number(e),ty:Number(t),gidx:a,tileView:i,tileObject:o?an(s):s}}function ph(e,t,n={}){return Kt(e,t,null,n)}function fh(e,t,n,r={}){const a=lo(e,t,{...r,clone:false}).tileView?.tileObject;di(a,"plant");const i=an(a);if(Array.isArray(i.slots)||(i.slots=[]),"plantedAt"in n&&(i.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(i.maturedAt=Number(n.maturedAt)),"species"in n&&(i.species=String(n.species)),"slotIdx"in n&&"slotPatch"in n){const s=Number(n.slotIdx)|0;if(!i.slots[s])throw new Error(`MGTile: plant slot ${s} doesn't exist`);return Eo(i.slots[s],n.slotPatch),Kt(e,t,i,r)}if("slots"in n){const s=n.slots;if(Array.isArray(s)){for(let c=0;c<s.length;c++)if(s[c]!=null){if(!i.slots[c])throw new Error(`MGTile: plant slot ${c} doesn't exist`);Eo(i.slots[c],s[c]);}}else if(s&&typeof s=="object")for(const c of Object.keys(s)){const d=Number(c)|0;if(Number.isFinite(d)){if(!i.slots[d])throw new Error(`MGTile: plant slot ${d} doesn't exist`);Eo(i.slots[d],s[d]);}}else throw new Error("MGTile: patch.slots must be array or object map");return Kt(e,t,i,r)}return Kt(e,t,i,r)}function gh(e,t,n,r={}){const a=lo(e,t,{...r,clone:false}).tileView?.tileObject;di(a,"decor");const i=an(a);return "rotation"in n&&(i.rotation=Number(n.rotation)),Kt(e,t,i,r)}function mh(e,t,n,r={}){const a=lo(e,t,{...r,clone:false}).tileView?.tileObject;di(a,"egg");const i=an(a);return "plantedAt"in n&&(i.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(i.maturedAt=Number(n.maturedAt)),Kt(e,t,i,r)}function hh(e,t,n,r={}){const o=r.ensureView!==false,a=r.forceUpdate!==false,i=li(),{gidx:s,tv:c}=Et(Number(e),Number(t),o);if(s==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!c)throw new Error("MGTile: TileView unavailable");const d=c.tileObject,l=typeof n=="function"?n(an(d)):n;if(c.onDataChanged(l),a&&i?.reusableContext&&typeof c.update=="function")try{c.update(i.reusableContext);}catch{}return {ok:true,tx:Number(e),ty:Number(t),gidx:s,before:d,after:c.tileObject}}function bh(e,t,n={}){const r=n.ensureView!==false,{gidx:o,tv:a}=Et(Number(e),Number(t),r);if(o==null)throw new Error("MGTile: cols unavailable");if(!a)return {ok:true,tx:Number(e),ty:Number(t),gidx:o,tv:null,tileObject:void 0};const i=n.clone!==false,s=a.tileObject;return {ok:true,tx:Number(e),ty:Number(t),gidx:o,objectType:s?.objectType??null,tileObject:i?an(s):s,tvKeys:Object.keys(a||{}).sort(),tileView:a}}function Mo(e){if(!e)return null;const t=o=>o&&(typeof o.getGlobalPosition=="function"||typeof o.toGlobal=="function"),n=["container","root","view","tile","ground","base","floor","bg","background","baseSprite","tileSprite","displayObject","gfx","graphics","sprite"];for(const o of n)if(t(e[o]))return e[o];if(t(e))return e;const r=[e.container,e.root,e.view,e.displayObject,e.tileSprite,e.gfx,e.graphics,e.sprite];for(const o of r)if(t(o))return o;try{for(const o of Object.keys(e))if(t(e[o]))return e[o]}catch{}return null}function Or(e){const t=et(()=>e?.getGlobalPosition?.());if(t&&Number.isFinite(t.x)&&Number.isFinite(t.y))return {x:t.x,y:t.y};const n=et(()=>e?.toGlobal?.({x:0,y:0}));return n&&Number.isFinite(n.x)&&Number.isFinite(n.y)?{x:n.x,y:n.y}:null}function xh(e){try{if(!e?.getBounds)return "center";const t=e.getBounds(),n=Or(e);if(!n||!t||!Number.isFinite(t.width)||!Number.isFinite(t.height))return "center";const r=t.x+t.width/2,o=t.y+t.height/2;return Math.hypot(n.x-r,n.y-o)<Math.hypot(n.x-t.x,n.y-t.y)?"center":"topleft"}catch{return "center"}}function yh(){const e=Un(),t=e?.map?.cols,n=e?.map?.rows;if(!e||!Number.isFinite(t)||t<=1)return null;const r=Number.isFinite(n)&&n>1?n:null,o=[[0,0],[1,1],[Math.min(2,t-2),0],[0,1]];r&&r>2&&o.push([Math.floor(t/2),Math.floor(r/2)]);for(const[a,i]of o){if(a<0||i<0||a>=t||r&&i>=r)continue;const s=Et(a,i,true).tv,c=a+1<t?Et(a+1,i,true).tv:null,d=Et(a,i+1,true).tv,l=Mo(s),u=Mo(c),p=Mo(d);if(!l||!u||!p)continue;const f=Or(l),g=Or(u),m=Or(p);if(!f||!g||!m)continue;const h={x:g.x-f.x,y:g.y-f.y},x={x:m.x-f.x,y:m.y-f.y},k=h.x*x.y-h.y*x.x;if(!Number.isFinite(k)||Math.abs(k)<1e-6)continue;const v=1/k,w={a:x.y*v,b:-x.x*v,c:-h.y*v,d:h.x*v},P={x:f.x-a*h.x-i*x.x,y:f.y-a*h.y-i*x.y},y=xh(l),C=y==="center"?P:{x:P.x+.5*(h.x+x.x),y:P.y+.5*(h.y+x.y)};return {ok:true,cols:t,rows:r,vx:h,vy:x,inv:w,anchorMode:y,originCenter:C}}return null}function Sc(){return Xe.xform=yh(),Xe.xformAt=Date.now(),{ok:!!Xe.xform?.ok,xform:Xe.xform}}function vh(e,t={}){if(!e||!Number.isFinite(e.x)||!Number.isFinite(e.y))return null;const n=Number.isFinite(t.maxAgeMs)?Number(t.maxAgeMs):1500;(!Xe.xform?.ok||t.forceRebuild||Date.now()-Xe.xformAt>n)&&Sc();const r=Xe.xform;if(!r?.ok)return null;const o=e.x-r.originCenter.x,a=e.y-r.originCenter.y,i=r.inv.a*o+r.inv.b*a,s=r.inv.c*o+r.inv.d*a,c=Math.floor(i),d=Math.floor(s),l=[[c,d],[c+1,d],[c,d+1],[c+1,d+1]];let u=null,p=1/0;for(const[f,g]of l){if(f<0||g<0||f>=r.cols||Number.isFinite(r.rows)&&r.rows!==null&&g>=r.rows)continue;const m=r.originCenter.x+f*r.vx.x+g*r.vy.x,h=r.originCenter.y+f*r.vx.y+g*r.vy.y,x=(e.x-m)**2+(e.y-h)**2;x<p&&(p=x,u={tx:f,ty:g,fx:i,fy:s,x:e.x,y:e.y,gidx:null});}return u?(u.gidx=ci(u.tx,u.ty),u):null}function wh(e,t){const n=Xe.xform;return n?.ok?{x:n.originCenter.x+e*n.vx.x+t*n.vy.x,y:n.originCenter.y+e*n.vx.y+t*n.vy.y}:null}function Ye(){if(!wc())throw new Error("MGTile: not ready. Call MGTile.init() first.")}function Sh(){return ["MGTile.init()","MGTile.hook()","MGTile.getTileObject(tx,ty) / inspect(tx,ty)","MGTile.setTileEmpty(tx,ty)","MGTile.setTilePlant(tx,ty,{...}) / setTileDecor / setTileEgg","MGTile.setTileObjectRaw(tx,ty,objOrFn)","MGTile.rebuildTransform() / pointToTile({x,y})","MGTile.tileToPoint(tx,ty)"].join(`
`)}const gt={init:uh,isReady:wc,hook:Ve.hook,engine:li,tos:Un,gidx:(e,t)=>ci(Number(e),Number(t)),getTileObject:(e,t,n={})=>(Ye(),lo(e,t,n)),inspect:(e,t,n={})=>(Ye(),bh(e,t,n)),setTileEmpty:(e,t,n={})=>(Ye(),ph(e,t,n)),setTilePlant:(e,t,n,r={})=>(Ye(),fh(e,t,n,r)),setTileDecor:(e,t,n,r={})=>(Ye(),gh(e,t,n,r)),setTileEgg:(e,t,n,r={})=>(Ye(),mh(e,t,n,r)),setTileObjectRaw:(e,t,n,r={})=>(Ye(),hh(e,t,n,r)),rebuildTransform:()=>(Ye(),Sc()),pointToTile:(e,t={})=>(Ye(),vh(e,t)),tileToPoint:(e,t)=>(Ye(),wh(e,t)),getTransform:()=>(Ye(),Xe.xform),help:Sh};function kh(){return {ready:false,app:null,renderer:null,stage:null,ticker:null,tileSets:new Map,highlights:new Map,watches:new Map,fades:new Map,fadeWatches:new Map}}const X=kh();function kc(){return X.ready}async function Ch(e=15e3){if(X.ready)return pa(),true;if(await Ve.init(e),X.app=Ve.app(),X.ticker=Ve.ticker(),X.renderer=Ve.renderer(),X.stage=Ve.stage(),!X.app||!X.ticker)throw new Error("MGPixi: PIXI app/ticker not found");return X.ready=true,pa(),true}function pa(){const e=L;return e.$PIXI=e.PIXI||null,e.$app=X.app||null,e.$renderer=X.renderer||null,e.$stage=X.stage||null,e.$ticker=X.ticker||null,e.__MG_PIXI__={PIXI:e.$PIXI,app:e.$app,renderer:e.$renderer,stage:e.$stage,ticker:e.$ticker,ready:X.ready},e.__MG_PIXI__}function ui(e){return !!e&&typeof e=="object"&&!Array.isArray(e)}function fa(e){return !!(e&&typeof e.getBounds=="function"&&("parent"in e||"children"in e))}function Jr(e){return !!(e&&typeof e.tint=="number")}function Ft(e){return !!(e&&typeof e.alpha=="number")}function Br(e,t,n){return e+(t-e)*n}function Th(e,t,n){const r=e>>16&255,o=e>>8&255,a=e&255,i=t>>16&255,s=t>>8&255,c=t&255,d=Br(r,i,n)|0,l=Br(o,s,n)|0,u=Br(a,c,n)|0;return d<<16|l<<8|u}function Ph(e,t=900){const n=[],r=[e];for(;r.length&&n.length<t;){const o=r.pop();if(!o)continue;Jr(o)&&n.push(o);const a=o.children;if(Array.isArray(a))for(let i=a.length-1;i>=0;i--)r.push(a[i]);}return n}function Ah(e,t=25e3){const n=[],r=[e];let o=0;for(;r.length&&o++<t;){const a=r.pop();if(!a)continue;Ft(a)&&n.push(a);const i=a.children;if(Array.isArray(i))for(let s=i.length-1;s>=0;s--)r.push(i[s]);}return n}const _h=["plantVisual","cropVisual","slotVisual","slotView","displayObject","view","container","root","sprite","gfx","graphics"];function ga(e){if(!e)return null;if(fa(e))return e;if(!ui(e))return null;for(const t of _h){const n=e[t];if(fa(n))return n}return null}function Ih(e,t){const n=[{o:e,d:0}],r=new Set,o=6;for(;n.length;){const{o:a,d:i}=n.shift();if(!(!a||i>o)&&!r.has(a)){if(r.add(a),Array.isArray(a)){if(a.length===t){const s=new Array(t);let c=true;for(let d=0;d<t;d++){const l=ga(a[d]);if(!l){c=false;break}s[d]=l;}if(c)return s}for(const s of a)n.push({o:s,d:i+1});continue}if(ui(a)){const s=a;for(const c of Object.keys(s))n.push({o:s[c],d:i+1});}}}return null}function Cc(e){if(!Array.isArray(e))return [];const t=new Set,n=[];for(const r of e){let o,a;if(Array.isArray(r))o=r[0],a=r[1];else if(ui(r))o=r.x??r.tx,a=r.y??r.ty;else continue;if(o=Number(o),a=Number(a),!Number.isFinite(o)||!Number.isFinite(a))continue;o|=0,a|=0;const i=`${o},${a}`;t.has(i)||(t.add(i),n.push({x:o,y:a}));}return n}function Eh(e,t){const n=String(e||"").trim();if(!n)throw new Error("MGPixi.defineTileSet: empty name");const r=Cc(t);return X.tileSets.set(n,r),{ok:true,name:n,count:r.length}}function Mh(e){return X.tileSets.delete(String(e||"").trim())}function Lh(){return Array.from(X.tileSets.keys()).sort((e,t)=>e.localeCompare(t))}function Tc(e){return !!(e&&(e.tileSet!=null||Array.isArray(e.tiles)))}function pi(e){const n=gt.tos?.()?.tileViews;if(!n?.entries)throw new Error("MGPixi: TOS.tileViews not found");if(!Tc(e))return {entries:Array.from(n.entries()),gidxSet:null};let r=[];if(e.tileSet!=null){const a=String(e.tileSet||"").trim(),i=X.tileSets.get(a);if(!i)throw new Error(`MGPixi: tileSet not found "${a}"`);r=i;}else r=Cc(e.tiles||[]);const o=new Map;for(const a of r){const i=gt.getTileObject(a.x,a.y,{ensureView:true,clone:false});i?.tileView&&i.gidx!=null&&o.set(i.gidx,i.tileView);}return {entries:Array.from(o.entries()),gidxSet:new Set(o.keys())}}function fi(e){const t=X.highlights.get(e);if(!t)return  false;et(()=>X.ticker?.remove(t.tick)),t.root&&t.baseAlpha!=null&&Ft(t.root)&&et(()=>{t.root.alpha=t.baseAlpha;});for(const n of t.tint)n.o&&Jr(n.o)&&et(()=>{n.o.tint=n.baseTint;});return X.highlights.delete(e),true}function Pc(e=null){for(const t of Array.from(X.highlights.keys()))e&&!String(t).startsWith(e)||fi(t);return  true}function Ac(e,t={}){if(!fa(e))throw new Error("MGPixi.highlightPulse: invalid root");const n=String(t.key||`hl:${Math.random().toString(16).slice(2)}`);if(X.highlights.has(n))return n;const r=Ft(e)?Number(e.alpha):null,o=st(Number(t.minAlpha??.12),0,1),a=st(Number(t.maxAlpha??1),0,1),i=Number(t.speed??1.25),s=(t.tint??8386303)>>>0,c=st(Number(t.tintMix??.85),0,1),d=t.deepTint!==false,l=[];if(d)for(const f of Ph(e))l.push({o:f,baseTint:f.tint});else Jr(e)&&l.push({o:e,baseTint:e.tint});const u=performance.now(),p=()=>{const f=(performance.now()-u)/1e3,g=(Math.sin(f*Math.PI*2*i)+1)/2,m=g*g*(3-2*g);r!=null&&Ft(e)&&(e.alpha=st(Br(o,a,m)*r,0,1));const h=m*c;for(const x of l)x.o&&Jr(x.o)&&(x.o.tint=Th(x.baseTint,s,h));};return X.ticker?.add(p),X.highlights.set(n,{root:e,tick:p,baseAlpha:r,tint:l}),n}function Fh(e,t){const n=e?.mutations;if(!Array.isArray(n))return  false;for(const r of n)if(String(r||"").toLowerCase()===t)return  true;return  false}function _c(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.highlightMutation: empty mutation");const{entries:r,gidxSet:o}=pi(t),a=`hlmut:${n}:`;if(t.clear===true)if(!o)Pc(a);else for(const u of Array.from(X.highlights.keys())){if(!u.startsWith(a))continue;const p=u.split(":"),f=Number(p[2]);o.has(f)&&fi(u);}const i={tint:(t.tint??8386303)>>>0,minAlpha:Number(t.minAlpha??.12),maxAlpha:Number(t.maxAlpha??1),speed:Number(t.speed??1.25),tintMix:Number(t.tintMix??.85),deepTint:t.deepTint!==false};let s=0,c=0,d=0,l=0;for(const[u,p]of r){const f=p?.tileObject;if(!f||f.objectType!=="plant")continue;const g=f.slots;if(!Array.isArray(g)||g.length===0)continue;let m=false;const h=[];for(let v=0;v<g.length;v++)Fh(g[v],n)&&(h.push(v),m=true);if(!m)continue;s++,c+=h.length;const x=p?.childView?.plantVisual||p?.childView||p,k=Ih(x,g.length);if(!k){l+=h.length;continue}for(const v of h){const w=k[v];if(!w){l++;continue}const P=`${a}${u}:${v}`;X.highlights.has(P)||(Ac(w,{key:P,...i}),d++);}}return {ok:true,mutation:n,filtered:!!o,plantsMatched:s,matchedSlots:c,newHighlights:d,failedSlots:l}}function Rh(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchMutation: empty mutation");const r=`watchmut:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,o=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,a=X.watches.get(r);a&&clearInterval(a);const i=setInterval(()=>{et(()=>_c(n,{...t,clear:!1}));},o);return X.watches.set(r,i),{ok:true,key:r,mutation:n,intervalMs:o}}function Nh(e){const t=String(e||"").trim();if(!t)return  false;if(!t.startsWith("watchmut:")){const r=t.toLowerCase();let o=0;for(const[a,i]of Array.from(X.watches.entries()))a.startsWith(`watchmut:${r}:`)&&(clearInterval(i),X.watches.delete(a),o++);return o>0}const n=X.watches.get(t);return n?(clearInterval(n),X.watches.delete(t),true):false}function Oh(e){const t=e?.childView?.plantVisual||e?.childView?.cropVisual||e?.childView||e?.displayObject||e;return ga(t)||ga(e?.displayObject)||null}function Ic(e){const t=X.fades.get(e);if(!t)return  false;for(const n of t.targets)n.o&&Ft(n.o)&&Number.isFinite(n.baseAlpha)&&et(()=>{n.o.alpha=n.baseAlpha;});return X.fades.delete(e),true}function ma(e=null){for(const t of Array.from(X.fades.keys()))e&&!String(t).startsWith(e)||Ic(t);return  true}function Ec(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.clearSpeciesFade: empty species");const r=`fade:${n}:`;if(!Tc(t))return ma(r);const{gidxSet:o}=pi(t);if(!o)return ma(r);for(const a of Array.from(X.fades.keys())){if(!a.startsWith(r))continue;const i=Number(a.slice(r.length));o.has(i)&&Ic(a);}return  true}function Mc(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.fadeSpecies: empty species");const r=st(Number(t.alpha??.2),0,1),o=t.deep===true,{entries:a,gidxSet:i}=pi(t),s=`fade:${n}:`;t.clear===true&&Ec(n,t);let c=0,d=0,l=0,u=0;for(const[p,f]of a){const g=f?.tileObject;if(!g||g.objectType!=="plant")continue;c++;const m=String(g.species||"").trim().toLowerCase();if(!m||m!==n)continue;d++;const h=Oh(f);if(!h||!Ft(h)){u++;continue}const x=`${s}${p}`;if(X.fades.has(x)){et(()=>{h.alpha=r;}),l++;continue}const k=o?Ah(h):[h],v=[];for(const w of k)Ft(w)&&v.push({o:w,baseAlpha:Number(w.alpha)});for(const w of v)et(()=>{w.o.alpha=r;});X.fades.set(x,{targets:v}),l++;}return {ok:true,species:n,alpha:r,deep:o,filtered:!!i,plantsSeen:c,matchedPlants:d,applied:l,failed:u,totalFades:X.fades.size}}function Bh(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchFadeSpecies: empty species");const r=`watchfade:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,o=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,a=X.fadeWatches.get(r);a&&clearInterval(a);const i=setInterval(()=>{et(()=>Mc(n,{...t,clear:!1}));},o);return X.fadeWatches.set(r,i),{ok:true,key:r,species:n,intervalMs:o}}function $h(e){const t=String(e||"").trim();if(!t)return  false;if(!t.startsWith("watchfade:")){const r=t.toLowerCase();let o=0;for(const[a,i]of Array.from(X.fadeWatches.entries()))a.startsWith(`watchfade:${r}:`)&&(clearInterval(i),X.fadeWatches.delete(a),o++);return o>0}const n=X.fadeWatches.get(t);return n?(clearInterval(n),X.fadeWatches.delete(t),true):false}function Dh(e){const t=Array.isArray(e?.slots)?e.slots:[];return {objectType:"plant",species:e?.species??null,plantedAt:e?.plantedAt??null,maturedAt:e?.maturedAt??null,slotCount:t.length,slots:t.map((n,r)=>({idx:r,mutations:Array.isArray(n?.mutations)?n.mutations.slice():[]}))}}function zh(e,t,n={}){const r=Number(e)|0,o=Number(t)|0,a=n.ensureView!==false,i=gt.getTileObject(r,o,{ensureView:a,clone:false}),s=i?.tileView||null,c=s?.tileObject,d={ok:true,tx:r,ty:o,gidx:i?.gidx??gt.gidx?.(r,o)??null,hasTileView:!!s,objectType:c?.objectType??null,tileObject:c??null,summary:c?.objectType==="plant"?Dh(c):c?{objectType:c.objectType??null}:null,display:s?s.childView?.plantVisual||s.childView||s.displayObject||s:null};return n.log!==false&&et(()=>console.log("[MGPixi.inspectTile]",d)),d}function Gh(e,t,n){const r=L.PIXI;if(!r)return;let o=X.stage.getChildByName("gemini-overlay");o||(o=new r.Container,o.name="gemini-overlay",X.stage.addChild(o));const a=n.key;let i=o.getChildByName(a);i||(i=new r.Graphics,i.name=a,o.addChild(i));const s=gt.tileToPoint(e,t);if(!s)return;i.clear(),i.lineStyle(2,n.tint??65280,n.alpha??1),i.beginFill(n.tint??65280,(n.alpha??1)*.2);const c=gt.getTransform(),d=c?Math.hypot(c.vx.x,c.vx.y):32,l=c?Math.hypot(c.vy.x,c.vy.y):32;i.drawRect(0,0,d,l),i.endFill(),i.x=s.x,i.y=s.y,c&&(i.rotation=Math.atan2(c.vx.y,c.vx.x));}function jh(e){const t=X.stage?.getChildByName("gemini-overlay");if(!t)return  false;const n=t.getChildByName(e);return n?(t.removeChild(n),n.destroy?.(),true):false}function ke(){if(!kc())throw new Error("MGPixi: call MGPixi.init() first")}const co={init:Ch,isReady:kc,expose:pa,get app(){return X.app},get renderer(){return X.renderer},get stage(){return X.stage},get ticker(){return X.ticker},get PIXI(){return L.PIXI||null},defineTileSet:(e,t)=>(ke(),Eh(e,t)),deleteTileSet:e=>(ke(),Mh(e)),listTileSets:()=>(ke(),Lh()),highlightPulse:(e,t)=>(ke(),Ac(e,t)),stopHighlight:e=>(ke(),fi(e)),clearHighlights:e=>(ke(),Pc(e)),drawOverlayBox:(e,t,n)=>(ke(),Gh(e,t,n)),stopOverlay:e=>(ke(),jh(e)),highlightMutation:(e,t)=>(ke(),_c(e,t)),watchMutation:(e,t)=>(ke(),Rh(e,t)),stopWatchMutation:e=>(ke(),Nh(e)),inspectTile:(e,t,n)=>(ke(),zh(e,t,n)),fadeSpecies:(e,t)=>(ke(),Mc(e,t)),clearSpeciesFade:(e,t)=>(ke(),Ec(e,t)),clearFades:e=>(ke(),ma(e)),watchFadeSpecies:(e,t)=>(ke(),Bh(e,t)),stopWatchFadeSpecies:e=>(ke(),$h(e))};function Hh(){return {ready:false,baseUrl:null,urls:{ambience:new Map,music:new Map},sfx:{mp3Url:null,atlasUrl:null,atlas:null,groups:new Map,buffer:null},tracks:{ambience:null,music:null},ctx:null}}const Q=Hh();function Lc(){return Q.ready}const cs=L??window;async function Fc(){const e=Q.ctx;if(e)return e;const t=cs.AudioContext||cs.webkitAudioContext;if(!t)throw new Error("WebAudio not supported");const n=new t;return Q.ctx=n,n}async function Rc(){if(Q.ctx&&Q.ctx.state==="suspended")try{await Q.ctx.resume();}catch{}}const Wh={sfx:"soundEffectsVolume",music:"musicVolume",ambience:"ambienceVolume"},Uh={sfx:"soundEffectsVolumeAtom",music:"musicVolumeAtom",ambience:"ambienceVolumeAtom"},An=.001,_n=.2;function ds(e,t=NaN){try{const n=localStorage.getItem(e);if(n==null)return t;let r;try{r=JSON.parse(n);}catch{r=n;}if(typeof r=="number"&&Number.isFinite(r))return r;if(typeof r=="string"){const o=parseFloat(r);if(Number.isFinite(o))return o}}catch{}return t}function Dn(e){const t=Wh[e],n=Uh[e];if(!t)return {atom:_n,vol100:ur(_n)};const r=ds(t,NaN);if(Number.isFinite(r)){const a=st(r,0,1);return {atom:a,vol100:ur(a)}}if(n){const a=ds(n,NaN);if(Number.isFinite(a)){const i=st(a,0,1);return {atom:i,vol100:ur(i)}}}const o=_n;return {atom:o,vol100:ur(o)}}function Vh(e){const t=Number(e);if(!Number.isFinite(t))return null;if(t<=0)return 0;const r=(st(t,1,100)-1)/99;return An+r*(_n-An)}function ur(e){const t=st(Number(e),0,1);if(t<=An)return 0;const n=(t-An)/(_n-An);return Math.round(1+n*99)}function Nc(e,t){if(t==null)return Dn(e).atom;const n=Vh(t);return n===null?Dn(e).atom:Mp(n)}function Xh(e){const t=new Map,n=(r,o)=>{t.has(r)||t.set(r,[]),t.get(r).push(o);};for(const r of Object.keys(e||{})){const o=/^(.*)_([A-Z])$/.exec(r);o?.[1]?n(o[1],r):n(r,r);}for(const[r,o]of Array.from(t.entries()))o.sort((a,i)=>a.localeCompare(i)),t.set(r,o);Q.sfx.groups=t;}function Kh(e){const t=Q.sfx.atlas;if(!t)throw new Error("SFX atlas not loaded");if(t[e])return e;const n=Q.sfx.groups.get(e);if(n?.length)return n[Math.random()*n.length|0];throw new Error(`Unknown sfx/group: ${e}`)}async function Yh(){if(Q.sfx.buffer)return Q.sfx.buffer;if(!Q.sfx.mp3Url)throw new Error("SFX mp3 url missing");const e=await Fc();await Rc();const n=await(await Tl(Q.sfx.mp3Url)).arrayBuffer(),r=await new Promise((o,a)=>{const i=e.decodeAudioData(n,o,a);i?.then&&i.then(o,a);});return Q.sfx.buffer=r,r}async function qh(e,t={}){if(!Q.ready)throw new Error("MGAudio not ready yet");const n=String(e||"").trim();if(!n)throw new Error("Missing sfx name");const r=Kh(n),o=Q.sfx.atlas[r];if(!o)throw new Error(`Missing segment for sfx: ${r}`);const a=await Fc();await Rc();const i=await Yh(),s=Math.max(0,+o.start||0),c=Math.max(s,+o.end||s),d=Math.max(.01,c-s),l=Nc("sfx",t.volume),u=a.createGain();u.gain.value=l,u.connect(a.destination);const p=a.createBufferSource();return p.buffer=i,p.connect(u),p.start(0,s,d),{name:r,source:p,start:s,end:c,duration:d,volume:l}}let pr=null;async function Jh(){return Q.ready?true:pr||(pr=(async()=>{Q.baseUrl=await Nt.base();const e=await ft.load({baseUrl:Q.baseUrl}),t=ft.getBundle(e,"audio");if(!t)throw new Error("No audio bundle in manifest");for(const n of t.assets||[])for(const r of n.src||[]){if(typeof r!="string")continue;const o=/^audio\/(ambience|music)\/(.+)\.mp3$/i.exec(r);if(o){const a=o[1].toLowerCase(),i=o[2];Q.urls[a].set(i,pt(Q.baseUrl,r));continue}/^audio\/sfx\/sfx\.mp3$/i.test(r)&&(Q.sfx.mp3Url=pt(Q.baseUrl,r)),/^audio\/sfx\/sfx\.json$/i.test(r)&&(Q.sfx.atlasUrl=pt(Q.baseUrl,r));}if(!Q.sfx.atlasUrl)throw new Error("Missing audio/sfx/sfx.json in manifest");return Q.sfx.atlas=await Ka(Q.sfx.atlasUrl),Xh(Q.sfx.atlas),Q.ready=true,true})(),pr)}function Oc(e){if(e!=="music"&&e!=="ambience")return  false;const t=Q.tracks[e];if(t){try{t.pause();}catch{}try{t.src="";}catch{}}return Q.tracks[e]=null,true}function Qh(e,t,n={}){if(!Q.ready)throw new Error("MGAudio not ready yet");if(e!=="music"&&e!=="ambience")throw new Error(`Invalid category: ${e}`);const r=Q.urls[e].get(t);if(!r)throw new Error(`Unknown ${e}: ${t}`);Oc(e);const o=new Audio(r);return o.loop=!!n.loop,o.volume=Nc(e,n.volume),o.preload="auto",o.play().catch(()=>{}),Q.tracks[e]=o,o}function Zh(e,t={}){const n=String(e||"").trim();return n==="music"||n==="ambience"?Array.from(Q.urls[n].keys()).sort():n==="sfx"?Q.sfx.atlas?t.groups?Array.from(Q.sfx.groups.keys()).sort():Object.keys(Q.sfx.atlas).sort():[]:[]}function eb(){return ["sfx","music","ambience"]}function tb(){return Array.from(Q.sfx.groups.keys()).sort((e,t)=>e.localeCompare(t))}function nb(e,t){const n=String(e||"").trim().toLowerCase(),r=String(t||"").trim();if(!r||n!=="music"&&n!=="ambience")return  false;const o=Q.urls[n],a=r.toLowerCase();for(const i of Array.from(o.keys()))if(i.toLowerCase()===a)return  true;return  false}function rb(e){const t=String(e||"").trim();if(!t)return  false;const n=t.toLowerCase();for(const r of Array.from(Q.sfx.groups.keys()))if(r.toLowerCase()===n)return  true;return  false}function ob(e,t){const n=String(e||"").trim().toLowerCase(),r=String(t||"").trim();if(!r)throw new Error("getTrackUrl(category, name) missing name");if(n!=="music"&&n!=="ambience")throw new Error(`Invalid category: ${e}`);const o=Q.urls[n],a=r.toLowerCase();for(const[i,s]of Array.from(o.entries()))if(i.toLowerCase()===a)return s;return null}function ab(){return Q.tracks.music&&(Q.tracks.music.volume=Dn("music").atom),Q.tracks.ambience&&(Q.tracks.ambience.volume=Dn("ambience").atom),true}function dt(){if(!Lc())throw new Error("MGAudio not ready yet")}async function ib(e,t,n={}){const r=String(e||"").trim(),o=String(t||"").trim();if(!r||!o)throw new Error("play(category, asset) missing args");if(r==="sfx")return qh(o,n);if(r==="music"||r==="ambience")return Qh(r,o,n);throw new Error(`Unknown category: ${r}`)}const gi={init:Jh,isReady:Lc,play:ib,stop:e=>(dt(),Oc(e)),list:(e,t)=>(dt(),Zh(e,t)),refreshVolumes:()=>(dt(),ab()),categoryVolume:e=>(dt(),Dn(e)),getCategories:()=>(dt(),eb()),getGroups:()=>(dt(),tb()),hasTrack:(e,t)=>(dt(),nb(e,t)),hasGroup:e=>(dt(),rb(e)),getTrackUrl:(e,t)=>(dt(),ob(e,t))};function sb(){return {ready:false,baseUrl:null,byCat:new Map,byBase:new Map,overlay:null,live:new Set,defaultParent:null}}const me=sb();function Bc(){return me.ready}let fr=null;async function lb(){return me.ready?true:fr||(fr=(async()=>{me.baseUrl=await Nt.base();const e=await ft.load({baseUrl:me.baseUrl}),t=ft.getBundle(e,"cosmetic");if(!t)throw new Error("No 'cosmetic' bundle in manifest");me.byCat.clear(),me.byBase.clear();for(const n of t.assets||[])for(const r of n.src||[]){if(typeof r!="string"||!/^cosmetic\/.+\.png$/i.test(r))continue;const a=r.split("/").pop().replace(/\.png$/i,""),i=a.indexOf("_");if(i<0)continue;const s=a.slice(0,i),c=a.slice(i+1),d=pt(me.baseUrl,r);me.byBase.set(a,d),me.byCat.has(s)||me.byCat.set(s,new Map),me.byCat.get(s).set(c,d);}return me.ready=true,true})(),fr)}function ha(e){let t=String(e||"").trim();return t?(t=t.replace(/^cosmetic\//i,""),t=t.replace(/\.png$/i,""),t):""}function cb(e,t){if(t===void 0){const a=ha(e),i=a.indexOf("_");return i<0?{cat:"",asset:a,base:a}:{cat:a.slice(0,i),asset:a.slice(i+1),base:a}}const n=String(e||"").trim(),r=ha(t),o=r.includes("_")?r:`${n}_${r}`;if(r.includes("_")&&!n){const a=r.indexOf("_");return {cat:r.slice(0,a),asset:r.slice(a+1),base:r}}return {cat:n,asset:r.replace(/^.+?_/,""),base:o}}function db(){return Array.from(me.byCat.keys()).sort((e,t)=>e.localeCompare(t))}function ub(e){const t=me.byCat.get(String(e||"").trim());return t?Array.from(t.keys()).sort((n,r)=>n.localeCompare(r)):[]}function ba(e,t){const{cat:n,asset:r,base:o}=cb(e,t),a=me.byBase.get(o);if(a)return a;const s=me.byCat.get(n)?.get(r);if(s)return s;if(!me.baseUrl)throw new Error("MGCosmetic not initialized");if(!o)throw new Error("Invalid cosmetic name");return pt(me.baseUrl,`cosmetic/${o}.png`)}const us=L?.document??document;function pb(){if(me.overlay)return me.overlay;const e=us.createElement("div");return e.id="MG_COSMETIC_OVERLAY",e.style.cssText=["position:fixed","left:0","top:0","width:100vw","height:100vh","pointer-events:none","z-index:99999999"].join(";"),us.documentElement.appendChild(e),me.overlay=e,e}function fb(){const e=me.defaultParent;if(!e)return null;try{return typeof e=="function"?e():e}catch{return null}}function gb(e){return me.defaultParent=e,true}const mb=L?.document??document;function xa(e,t,n){if(!me.ready)throw new Error("MGCosmetic not ready yet");let r,o;typeof t=="object"&&t!==null?(r=t,o=void 0):typeof t=="string"?(o=t,r=n||{}):(o=void 0,r=n||{});const a=o!==void 0?ba(e,o):ba(e),i=mb.createElement("img");if(i.decoding="async",i.loading="eager",i.src=a,i.alt=r.alt!=null?String(r.alt):ha(o??e),r.className&&(i.className=String(r.className)),r.width!=null&&(i.style.width=String(r.width)),r.height!=null&&(i.style.height=String(r.height)),r.opacity!=null&&(i.style.opacity=String(r.opacity)),r.style&&typeof r.style=="object")for(const[s,c]of Object.entries(r.style))try{i.style[s]=String(c);}catch{}return i}function hb(e,t,n){let r,o;typeof t=="object"&&t!==null?(r=t,o=void 0):typeof t=="string"?(o=t,r=n||{}):(o=void 0,r=n||{});const a=r.parent||fb()||pb(),i=o!==void 0?xa(e,o,r):xa(e,r);if(a===me.overlay||r.center||r.x!=null||r.y!=null||r.absolute){i.style.position="absolute",i.style.pointerEvents="none",i.style.zIndex=String(r.zIndex??999999);const c=r.scale??1,d=r.rotation??0;if(r.center)i.style.left="50%",i.style.top="50%",i.style.transform=`translate(-50%, -50%) scale(${c}) rotate(${d}rad)`;else {const l=r.x??innerWidth/2,u=r.y??innerHeight/2;i.style.left=`${l}px`,i.style.top=`${u}px`,i.style.transform=`scale(${c}) rotate(${d}rad)`,r.anchor==="center"&&(i.style.transform=`translate(-50%, -50%) scale(${c}) rotate(${d}rad)`);}}return a.appendChild(i),me.live.add(i),i.__mgDestroy=()=>{try{i.remove();}catch{}me.live.delete(i);},i}function bb(){for(const e of Array.from(me.live))e.__mgDestroy?.();}function Ct(){if(!Bc())throw new Error("MGCosmetic not ready yet")}const mi={init:lb,isReady:Bc,categories:()=>(Ct(),db()),list:e=>(Ct(),ub(e)),url:((e,t)=>(Ct(),ba(e,t))),create:((e,t,n)=>(Ct(),xa(e,t,n))),show:((e,t,n)=>(Ct(),hb(e,t,n))),attach:e=>(Ct(),gb(e)),clear:()=>(Ct(),bb())},yn={Gold:25,Rainbow:50,Frozen:10,Chilled:5,Wet:2},xb=new Set(["Gold","Rainbow"]),yb=new Set(["Frozen","Chilled","Wet"]);function $c(e){let t=1,n=0,r=0;for(const o of e)o==="Gold"||o==="Rainbow"?o==="Rainbow"?t=yn.Rainbow:t===1&&(t=yn.Gold):o in yn&&(n+=yn[o],r++);return t*(1+n-r)}function vb(e){return yn[e]??null}function wb(e){return xb.has(e)}function Sb(e){return yb.has(e)}function kb(e,t){const n=hi(e);if(!n)return 50;const r=n.maxScale;if(t<=1)return 50;if(t>=r)return 100;const o=(t-1)/(r-1);return Math.floor(50+50*o)}function Cb(e,t,n){const r=hi(e);if(!r)return 0;const o=r.baseSellPrice,a=$c(n);return Math.round(o*t*a)}function Tb(e,t,n){if(n>=t)return 100;if(n<=e)return 0;const r=t-e,o=n-e;return Math.floor(o/r*100)}function Pb(e,t){return t>=e}function hi(e){const t=oe.get("plants");if(!t)return null;const n=t[e];return n?.crop?{baseSellPrice:n.crop.baseSellPrice??0,maxScale:n.crop.maxScale??1,growTime:n.crop.growTime??0}:null}const Dc=3600,Lo=80,Ab=100,vn=30;function uo(e){return e/Dc}function po(e,t){const n=Vn(e);if(!n)return Lo;const r=n.maxScale;if(t<=1)return Lo;if(t>=r)return Ab;const o=(t-1)/(r-1);return Math.floor(Lo+20*o)}function fo(e,t,n){const r=Vn(e);if(!r)return n-vn;const o=r.hoursToMature,a=t/Dc,i=vn/o,s=Math.min(i*a,vn),c=n-vn;return Math.floor(c+s)}function go(e,t){const n=Vn(e);return n?t>=n.hoursToMature:false}function zc(e){const t=Vn(e);return t?vn/t.hoursToMature:0}function _b(e,t,n){const r=t-e;return r<=0||n<=0?0:r/n}function Vn(e){const t=oe.get("pets");if(!t)return null;const n=t[e];return n?{hoursToMature:n.hoursToMature??0,maxScale:n.maxScale??1,abilities:n.abilities??[]}:null}function Ib(e,t){return t<=0?1:Math.min(1,e/t)}const we=3600,gr=80,ya=100,lt=30,Eb={Worm:30,Snail:60,Bee:15,Chicken:60,Bunny:45,Dragonfly:15,Pig:60,Cow:75,Turkey:60,SnowFox:45,Stoat:60,WhiteCaribou:75,Squirrel:30,Turtle:90,Goat:60,Butterfly:30,Peacock:60,Capybara:60};function Xn(e){const t=oe.get("pets");if(!t)return null;const n=t[e];return n?{hoursToMature:n.hoursToMature??0,maxScale:n.maxScale??1}:null}function Mb(e){return e/we}function Kn(e,t){const n=Xn(e);if(!n)return gr;const{maxScale:r}=n;if(t<=1)return gr;if(t>=r)return ya;const o=(t-1)/(r-1);return Math.floor(gr+(ya-gr)*o)}function Lb(e){return e-lt}function Fb(e){const t=Xn(e);return !t||t.hoursToMature<=0?0:lt/t.hoursToMature}function Yn(e,t,n){const r=Xn(e);if(!r)return n-lt;const o=t/we,a=lt/r.hoursToMature,i=Math.min(a*o,lt),s=n-lt;return Math.floor(s+i)}function Gc(e,t,n){const r=Xn(e);if(!r)return 0;const o=n-lt,a=t-o;if(a<=0)return 0;const i=lt/r.hoursToMature;return i<=0?0:a/i*we}function bi(e,t,n,r,o=we){const i=Gc(e,n,r)-t;return i<=0?0:o<=0?1/0:i/o}function mo(e,t,n,r=we){return bi(e,t,n,n,r)}function xi(e,t,n,r,o=we){if(n>=r)return 0;const a=n+1;return bi(e,t,a,r,o)}function Rb(e,t){return e>=t}function Nb(e,t){const n=t-lt,o=(e-n)/lt*100;return Math.min(100,Math.max(0,o))}const Ob=Object.freeze(Object.defineProperty({__proto__:null,calculateAge:Mb,calculateCurrentStrength:Yn,calculateHoursToMaxStrength:mo,calculateHoursToNextStrength:xi,calculateHoursToStrength:bi,calculateMaxStrength:Kn,calculateStartingStrength:Lb,calculateStrengthPerHour:Fb,calculateStrengthProgress:Nb,calculateXpForStrength:Gc,getSpeciesData:Xn,isPetMature:Rb},Symbol.toStringTag,{value:"Module"}));function yi(e){const t=oe.get("pets");if(!t)return 100/24;const n=t[e];if(!n?.coinsToFullyReplenishHunger)return 100/24;const r=Eb[e];return r?n.coinsToFullyReplenishHunger/r*60:(console.warn(`[Feed] Unknown species "${e}", using 60min default`),n.coinsToFullyReplenishHunger/60*60)}function Bb(e,t){return e<=0?0:t<=0?1/0:e/t}function vi(e,t,n,r){if(e<=0||n<=0)return 0;const o=t/n;if(o>=e)return 0;const a=e-o,i=r/n;return Math.ceil(a/i)}function wi(e,t,n){const r=oe.get("pets");if(!r)return 0;const o=r[e];if(!o?.coinsToFullyReplenishHunger)return 0;const a=o.coinsToFullyReplenishHunger,i=yi(e);return vi(n,t,i,a)}function zn(e,t,n){const r=oe.get("pets");if(!r)return 0;const o=r[e];if(!o?.coinsToFullyReplenishHunger)return 0;const a=o.coinsToFullyReplenishHunger,i=yi(e);return vi(n,t,i,a)}function Si(e,t,n,r,o,a){return e?t&&a>0?zn(n,r,a):0:zn(n,r,o)}const $b=Object.freeze(Object.defineProperty({__proto__:null,calculateAdjustedFeedsToMax:Si,calculateFeedsForDuration:vi,calculateFeedsToMaxStrength:zn,calculateFeedsToNextStrength:wi,calculateHoursUntilStarving:Bb,getHungerDrainPerHour:yi},Symbol.toStringTag,{value:"Module"})),jc={init(){},isReady(){return  true},crop:{calculateSize:kb,calculateSellPrice:Cb,calculateProgress:Tb,isReady:Pb,getData:hi},pet:{calculateAge:uo,calculateMaxStrength:po,calculateCurrentStrength:fo,isMature:go,calculateStrengthPerHour:zc,getData:Vn},mutation:{calculateMultiplier:$c,getValue:vb,isGrowth:wb,isEnvironmental:Sb},xp:Ob,feed:$b};async function Hc(e){const t=[{name:"Data",init:()=>oe.init()},{name:"CustomModal",init:()=>Xt.init()},{name:"Sprites",init:()=>V.init()},{name:"TileObjectSystem",init:()=>gt.init()},{name:"Pixi",init:()=>co.init()},{name:"Audio",init:()=>gi.init()},{name:"Cosmetics",init:()=>mi.init()}];await Promise.all(t.map(async n=>{e?.({status:"start",name:n.name});try{await n.init(),e?.({status:"success",name:n.name});}catch(r){console.error(`[${n.name}] failed`,r),e?.({status:"error",name:n.name,error:r});}})),console.log("[Gemini] Modules ready. Access via Gemini.Modules in console.");}const Db=Object.freeze(Object.defineProperty({__proto__:null,MGAssets:Nt,MGAudio:gi,MGCalculators:jc,MGCosmetic:mi,MGCustomModal:Xt,MGData:oe,MGEnvironment:De,MGManifest:ft,MGPixi:co,MGPixiHooks:Ve,MGSprite:V,MGTile:gt,MGVersion:Xa,PET_ABILITY_ACTIONS:zl,filterPetAbilityLogs:jl,formatAbilityLog:Hl,initAllModules:Hc,isPetAbilityAction:Gl},Symbol.toStringTag,{value:"Module"}));function zb(e){const t=String(e??"").trim().toLowerCase();return t?t==="common"?"Common":t==="uncommon"?"Uncommon":t==="rare"?"Rare":t==="legendary"?"Legendary":t==="mythical"?"Mythical":t==="divine"?"Divine":t==="celestial"?"Celestial":t==="unknown"||t==="unknow"?"Unknown":null:null}function Gb(e){return e.toLowerCase()}function ho(e={}){const{id:t,label:n="",type:r="neutral",tone:o="soft",border:a,withBorder:i,pill:s=true,size:c="md",onClick:d,variant:l="default",rarity:u=null,abilityId:p="",abilityName:f=""}=e,g=b("span",{className:"badge",id:t});s&&g.classList.add("badge--pill"),c==="sm"?g.classList.add("badge--sm"):c==="lg"?g.classList.add("badge--lg"):g.classList.add("badge--md"),d&&g.addEventListener("click",d);let m=false,h=i;function x(){m||(h===false?g.style.border="none":g.style.border="");}function k(S,A=o){g.classList.remove("badge--neutral","badge--info","badge--success","badge--warning","badge--danger","badge--soft","badge--outline","badge--solid"),g.classList.add(`badge--${S}`,`badge--${A}`),x();}function v(S){const A=(S??"").trim();A?(g.style.border=A,m=true):(m=false,x());}function w(S){h=S,x();}function P(S){g.textContent=S;}function y(S,A=o){k(S,A);}function C(S){g.classList.remove("badge--rarity","badge--rarity-common","badge--rarity-uncommon","badge--rarity-rare","badge--rarity-legendary","badge--rarity-mythical","badge--rarity-divine","badge--rarity-celestial","badge--rarity-unknown"),g.style.background="",g.style.backgroundSize="",g.style.animation="",g.style.color="",g.style.webkitTextStroke="";const A=zb(S);if(!A){g.textContent=String(S??"—");return}g.textContent=A,g.classList.add("badge--rarity",`badge--rarity-${Gb(A)}`);}function T(S,A){const F=oe.get("abilities")?.[S],R=F?.color,E=R?.bg||"rgba(100, 100, 100, 0.9)",$=R?.hover||"rgba(150, 150, 150, 1)";g.classList.remove("badge--neutral","badge--info","badge--success","badge--warning","badge--danger","badge--soft","badge--outline","badge--solid","badge--rarity","badge--rarity-common","badge--rarity-uncommon","badge--rarity-rare","badge--rarity-legendary","badge--rarity-mythical","badge--rarity-divine","badge--rarity-celestial","badge--rarity-unknown"),g.classList.add("badge--ability"),g.textContent=A||F?.name||S||"Unknown Ability",g.style.background=E,g.style.color="white",g.style.border="none",g.style.webkitTextStroke="",g.style.animation="",g.style.backgroundSize="";const te=()=>{g.style.background=$;},z=()=>{g.style.background=E;};g.removeEventListener("mouseenter",te),g.removeEventListener("mouseleave",z),g.addEventListener("mouseenter",te),g.addEventListener("mouseleave",z);}return l==="rarity"?C(u):l==="ability"?T(p,f):(g.textContent=n,k(r,o),typeof i=="boolean"&&w(i),a&&v(a)),{root:g,setLabel:P,setType:y,setBorder:v,setWithBorder:w,setRarity:C,setAbility:T}}const jb={expanded:false,sort:{key:null,dir:null},search:""},Hb={categories:{}};async function Wb(){const e=await to("tab-test",{version:2,defaults:Hb,sanitize:a=>({categories:a.categories&&typeof a.categories=="object"?a.categories:{}})});function t(a){return e.get().categories[a]||{...jb}}function n(a,i){const s=e.get(),c=t(a);e.update({categories:{...s.categories,[a]:{...c,expanded:i}}});}function r(a,i,s){const c=e.get(),d=t(a);e.update({categories:{...c.categories,[a]:{...d,sort:{key:i,dir:s}}}});}function o(a,i){const s=e.get(),c=t(a);e.update({categories:{...s.categories,[a]:{...c,search:i}}});}return {get:e.get,set:e.set,save:e.save,getCategoryState:t,setCategoryExpanded:n,setCategorySort:r,setCategorySearch:o}}const Ub={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function mr(e){return e?Ub[e]??0:0}class Vb extends rn{constructor(){super({id:"tab-test",label:"Test"});D(this,"stateCtrl",null);}async build(n){this.stateCtrl=await Wb();const r=this.createContainer("test-section");r.style.display="flex",r.style.flexDirection="column",r.style.gap="12px",n.appendChild(r),await this.buildSpriteTables(r);}renderSprite(n){const r=b("div",{style:"display:flex;align-items:center;justify-content:center;width:32px;height:32px;"});if(n.spriteId){const o=n.spriteId;requestAnimationFrame(()=>{try{const a=V.toCanvas(o,{scale:1});a.style.maxWidth="32px",a.style.maxHeight="32px",a.style.objectFit="contain",r.appendChild(a);}catch{r.textContent="-";}});}else r.textContent="-";return r}renderRarity(n){if(!n.rarity){const o=b("span",{style:"opacity:0.5;"});return o.textContent="—",o}return ho({variant:"rarity",rarity:n.rarity,size:"sm"}).root}createDataCard(n,r,o,a){const i=this.stateCtrl.getCategoryState(n),s=p=>{if(!p)return o;const f=p.toLowerCase();return o.filter(g=>g.name.toLowerCase().includes(f))},c=vl({columns:a,data:s(i.search),pageSize:0,compact:true,maxHeight:"calc(var(--lg-row-h, 40px) * 6)",getRowId:p=>p.spriteId,onSortChange:(p,f)=>{this.stateCtrl.setCategorySort(n,p,f);}});i.sort.key&&i.sort.dir&&c.sortBy(i.sort.key,i.sort.dir);const d=Wa({placeholder:"Search...",value:i.search,debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:p=>{const f=p.trim();this.stateCtrl.setCategorySearch(n,f),c.setData(s(f));}}),l=b("div",{style:"margin-bottom:8px;"});l.appendChild(d.root);const u=b("div");return u.appendChild(l),u.appendChild(c.root),Ke({title:r,subtitle:`${o.length} entries`,variant:"soft",padding:"sm",expandable:true,defaultExpanded:i.expanded,onExpandChange:p=>{this.stateCtrl.setCategoryExpanded(n,p);}},u)}formatCategoryName(n){return n.split("-").map(r=>r.charAt(0).toUpperCase()+r.slice(1)).join(" ")}findPlantBySprite(n,r){const o=oe.get("plants");if(!o)return null;for(const i of Object.values(o))if(i?.seed?.spriteId===n||i?.plant?.spriteId===n||i?.crop?.spriteId===n)return i;const a=r.toLowerCase();for(const i of Object.values(o)){const s=(i?.seed?.name||"").toLowerCase();if(s===a||s===`${a} seed`)return i}return null}findPetBySpriteId(n){const r=oe.get("pets");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}findItemBySpriteId(n){const r=oe.get("items");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}findDecorBySpriteId(n){const r=oe.get("decor");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}findEggBySpriteId(n){const r=oe.get("eggs");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}getRarityForSprite(n,r,o){const a=n.toLowerCase();if(a==="plant"||a==="seed"||a==="tallplant"){const i=this.findPlantBySprite(r,o);if(i?.seed?.rarity)return i.seed.rarity}if(a==="pet"){const i=this.findPetBySpriteId(r);if(i?.rarity)return i.rarity}if(a==="item"){const i=this.findItemBySpriteId(r);if(i?.rarity)return i.rarity}if(a==="decor"){const i=this.findDecorBySpriteId(r);if(i?.rarity)return i.rarity}if(a==="egg"){const i=this.findEggBySpriteId(r);if(i?.rarity)return i.rarity}return null}yieldToMain(n=0){return new Promise(r=>{n>0?setTimeout(r,n):typeof requestIdleCallback<"u"?requestIdleCallback(()=>r(),{timeout:50}):setTimeout(r,4);})}async buildSpriteTables(n){const r=[{key:"name",header:"Name",sortable:true,width:"1fr",sortFn:(a,i)=>a.name.localeCompare(i.name,void 0,{numeric:true,sensitivity:"base"})},{key:"rarity",header:"Rarity",sortable:true,width:"100px",align:"center",render:a=>this.renderRarity(a),sortFn:(a,i)=>mr(a.rarity)-mr(i.rarity)},{key:"sprite",header:"Sprite",width:"60px",align:"center",render:a=>this.renderSprite(a)}];if(!V.isReady())try{await V.init();}catch{return}const o=V.getCategories();for(let a=0;a<o.length;a++){await this.yieldToMain(8);const i=o[a],c=V.getCategoryId(i).map(d=>{const l=`sprite/${i}/${d}`;return {name:d,spriteId:l,rarity:this.getRarityForSprite(i,l,d)}});if(c.sort((d,l)=>mr(d.rarity)-mr(l.rarity)),c.length>0){const d=this.createDataCard(i,this.formatCategoryName(i),c,r);n.appendChild(d);}}}}function Re(e,t,n){if(e.querySelector(`style[data-style-id="${n}"]`))return;const r=document.createElement("style");r.setAttribute("data-style-id",n),r.textContent=t,e.appendChild(r);}const Wc=`
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
`,Xb={enabled:false,favoriteProduceList:[],favoritePetsList:[],favoriteMutations:[]};let Pt=null;async function Kb(){if(Pt)return Pt;Pt=await to("tab-auto-favorite",{version:1,defaults:Xb});const e=Pe(Le.AUTO_FAVORITE_UI,null);return e&&(await Pt.set(e),Au(Le.AUTO_FAVORITE_UI),console.log("[AutoFavoriteSettings] Migrated old storage to new state")),Pt}function qe(){if(!Pt)throw new Error("[AutoFavoriteSettings] Section state not initialized. Call initSectionState() first.");return Pt}const ki=Le.AUTO_FAVORITE,Uc={enabled:false,mode:"simple",simple:{enabled:false,favoriteSpecies:[],favoriteMutations:[]}};function Rt(){return Pe(ki,Uc)}function Ci(e){Oe(ki,e);}function Vc(e){const n={...Rt(),...e};return Ci(n),n}function Ti(e){const t=Rt();return t.mode="simple",t.simple={...t.simple,...e},Ci(t),t}function Yb(e){Ti({favoriteSpecies:e});}function qb(e){Ti({favoriteMutations:e});}function ps(){return Rt().enabled}function ct(e,t){if(e===t)return  true;if(e===null||t===null)return e===t;if(typeof e!=typeof t)return  false;if(typeof e!="object")return e===t;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return  false;for(let i=0;i<e.length;i++)if(!ct(e[i],t[i]))return  false;return  true}if(Array.isArray(e)||Array.isArray(t))return  false;const n=e,r=t,o=Object.keys(n),a=Object.keys(r);if(o.length!==a.length)return  false;for(const i of o)if(!Object.prototype.hasOwnProperty.call(r,i)||!ct(n[i],r[i]))return  false;return  true}const fs={currentGardenTile:"myCurrentGardenTileAtom",globalTileIndex:"myCurrentGlobalTileIndexAtom",gardenObject:"myCurrentGardenObjectAtom",isMature:"isGardenObjectMatureAtom",isInMyGarden:"isInMyGardenAtom",gardenName:"currentGardenNameAtom",sortedSlotIndices:"myCurrentSortedGrowSlotIndicesAtom",currentGrowSlotIndex:"myCurrentGrowSlotIndexAtom"},gs={position:{globalIndex:null,localIndex:null},tile:{type:null,isEmpty:true},garden:{name:null,isOwner:false,playerSlotIndex:null},object:{type:null,data:null,isMature:false},plant:null};function Jb(e){const t=e.currentGardenTile;return {globalIndex:e.globalTileIndex,localIndex:t?.localTileIndex??null}}function Qb(e){return {type:e.currentGardenTile?.tileType??null,isEmpty:e.gardenObject===null}}function Zb(e){const t=e.currentGardenTile;return {name:e.gardenName,isOwner:e.isInMyGarden??false,playerSlotIndex:t?.userSlotIdx??null}}function ex(e){const t=e.gardenObject;return t?{type:t.objectType,data:t,isMature:e.isMature??false}:{type:null,data:null,isMature:false}}function tx(e){const t=e.gardenObject;if(!t||t.objectType!=="plant")return null;const n=t,r=e.sortedSlotIndices??[];return {species:n.species,slots:n.slots??[],currentSlotIndex:e.currentGrowSlotIndex,sortedSlotIndices:r,nextHarvestSlotIndex:r.length>0?r[0]:null}}function ms(e){return {position:Jb(e),tile:Qb(e),garden:Zb(e),object:ex(e),plant:tx(e)}}function hs(e){return JSON.stringify({globalIndex:e.position.globalIndex,localIndex:e.position.localIndex,tileType:e.tile.type,isEmpty:e.tile.isEmpty,gardenName:e.garden.name,isOwner:e.garden.isOwner,playerSlotIndex:e.garden.playerSlotIndex,objectType:e.object.type,isMature:e.object.isMature,plantSpecies:e.plant?.species??null,slotCount:e.plant?.slots.length??0})}function nx(e,t){return e.type!==t.type||e.isMature!==t.isMature?true:e.data===null&&t.data===null?false:e.data===null||t.data===null?true:!ct(e.data,t.data)}function rx(e,t){return e===null&&t===null?false:e===null||t===null||e.species!==t.species||e.currentSlotIndex!==t.currentSlotIndex||e.nextHarvestSlotIndex!==t.nextHarvestSlotIndex||e.slots.length!==t.slots.length?true:!ct(e.sortedSlotIndices,t.sortedSlotIndices)}function ox(e,t){return e.name!==t.name||e.isOwner!==t.isOwner||e.playerSlotIndex!==t.playerSlotIndex}function ax(){let e=gs,t=gs,n=false;const r=[],o={all:new Set,stable:new Set,object:new Set,plantInfo:new Set,garden:new Set},a={},i=Object.keys(fs),s=new Set;function c(){if(s.size<i.length)return;const l=ms(a);if(!ct(e,l)&&(t=e,e=l,!!n)){for(const u of o.all)u(e,t);if(hs(t)!==hs(e))for(const u of o.stable)u(e,t);if(nx(t.object,e.object)){const u={current:e.object,previous:t.object};for(const p of o.object)p(u);}if(rx(t.plant,e.plant)){const u={current:e.plant,previous:t.plant};for(const p of o.plantInfo)p(u);}if(ox(t.garden,e.garden)){const u={current:e.garden,previous:t.garden};for(const p of o.garden)p(u);}}}async function d(){if(n)return;const l=i.map(async u=>{const p=fs[u],f=await ue.subscribe(p,g=>{a[u]=g,s.add(u),c();});r.push(f);});await Promise.all(l),n=true,s.size===i.length&&(e=ms(a));}return d(),{get(){return e},subscribe(l,u){return o.all.add(l),u?.immediate!==false&&n&&s.size===i.length&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,u){return o.stable.add(l),u?.immediate!==false&&n&&s.size===i.length&&l(e,e),()=>o.stable.delete(l)},subscribeObject(l,u){return o.object.add(l),u?.immediate&&n&&s.size===i.length&&l({current:e.object,previous:e.object}),()=>o.object.delete(l)},subscribePlantInfo(l,u){return o.plantInfo.add(l),u?.immediate&&n&&s.size===i.length&&l({current:e.plant,previous:e.plant}),()=>o.plantInfo.delete(l)},subscribeGarden(l,u){return o.garden.add(l),u?.immediate&&n&&s.size===i.length&&l({current:e.garden,previous:e.garden}),()=>o.garden.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.object.clear(),o.plantInfo.clear(),o.garden.clear(),n=false;}}}let Fo=null;function ix(){return Fo||(Fo=ax()),Fo}function sx(){let e=null;const t=[],n=new Set,r={},o=new Set,a=2;function i(u,p){return {x:p%u,y:Math.floor(p/u)}}function s(u,p,f){return f*u+p}function c(u,p){const{cols:f,rows:g}=u,m=f*g,h=new Set,x=new Set,k=new Map,v=[],w=u.userSlotIdxAndDirtTileIdxToGlobalTileIdx??[],P=u.userSlotIdxAndBoardwalkTileIdxToGlobalTileIdx??[],y=Math.max(w.length,P.length);for(let S=0;S<y;S++){const A=w[S]??[],I=P[S]??[],F=A.map((E,$)=>(h.add(E),k.set(E,S),{globalIndex:E,localIndex:$,position:i(f,E)})),R=I.map((E,$)=>(x.add(E),k.set(E,S),{globalIndex:E,localIndex:$,position:i(f,E)}));v.push({userSlotIdx:S,dirtTiles:F,boardwalkTiles:R,allTiles:[...F,...R]});}const C=u.spawnTiles.map(S=>i(f,S)),T={};if(u.locations)for(const[S,A]of Object.entries(u.locations)){const I=A.spawnTileIdx??[];T[S]={name:S,spawnTiles:I,spawnPositions:I.map(F=>i(f,F))};}return {cols:f,rows:g,totalTiles:m,tileSize:p,spawnTiles:u.spawnTiles,spawnPositions:C,locations:T,userSlots:v,globalToXY(S){return i(f,S)},xyToGlobal(S,A){return s(f,S,A)},getTileOwner(S){return k.get(S)??null},isDirtTile(S){return h.has(S)},isBoardwalkTile(S){return x.has(S)}}}function d(){if(o.size<a||e)return;const u=r.map,p=r.tileSize??0;if(u){e=c(u,p);for(const f of n)f(e);n.clear();}}async function l(){const u=await ue.subscribe("mapAtom",f=>{r.map=f,o.add("map"),d();});t.push(u);const p=await ue.subscribe("tileSizeAtom",f=>{r.tileSize=f,o.add("tileSize"),d();});t.push(p);}return l(),{get(){return e},isReady(){return e!==null},onReady(u,p){return e?(p?.immediate!==false&&u(e),()=>{}):(n.add(u),()=>n.delete(u))},destroy(){for(const u of t)u();t.length=0,e=null,n.clear();}}}let Ro=null;function va(){return Ro||(Ro=sx()),Ro}function lx(){const e=oe.get("mutations");return e?Object.keys(e):[]}function Xc(){const e={};for(const t of lx())e[t]=[];return e}function wa(){return {garden:null,mySlotIndex:null,plants:{all:[],mature:[],growing:[],bySpecies:{},count:0},crops:{all:[],mature:[],growing:[],mutated:{all:[],byMutation:Xc()}},eggs:{all:[],mature:[],growing:[],byType:{},count:0},decors:{tileObjects:[],boardwalk:[],all:[],byType:{},count:0},tiles:{tileObjects:[],boardwalk:[],empty:{tileObjects:[],boardwalk:[]}},counts:{plants:0,maturePlants:0,crops:0,matureCrops:0,eggs:0,matureEggs:0,decors:0,emptyTileObjects:0,emptyBoardwalk:0}}}function cx(e,t,n,r){const o=t.slots.filter(a=>r>=a.endTime).length;return {tileIndex:e,position:n,species:t.species,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:r>=t.maturedAt,slots:t.slots,slotsCount:t.slots.length,matureSlotsCount:o}}function dx(e,t,n,r,o){return {tileIndex:e,position:t,slotIndex:n,species:r.species,startTime:r.startTime,endTime:r.endTime,targetScale:r.targetScale,mutations:[...r.mutations],isMature:o>=r.endTime}}function ux(e,t,n,r){return {tileIndex:e,position:n,eggId:t.eggId,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:r>=t.maturedAt}}function bs(e,t,n,r){return {tileIndex:e,position:n,decorId:t.decorId,rotation:t.rotation,location:r}}function xs(e,t){const{garden:n,mySlotIndex:r}=e,o=Date.now();if(!n||r===null)return wa();const a=t().get(),i=a?.userSlots[r],s=i?.dirtTiles??[],c=i?.boardwalkTiles??[],d=[],l=[],u=[],p={},f=[],g=[],m=[],h=[],x=Xc(),k=[],v=[],w=[],P={},y=[],C=[],T={},S=new Set,A=new Set;for(const[E,$]of Object.entries(n.tileObjects)){const te=parseInt(E,10);S.add(te);const z=a?a.globalToXY(te):{x:0,y:0};if($.objectType==="plant"){const H=$,G=cx(E,H,z,o);d.push(G),G.isMature?l.push(G):u.push(G),p[G.species]||(p[G.species]=[]),p[G.species].push(G);for(let N=0;N<H.slots.length;N++){const O=H.slots[N],j=dx(E,z,N,O,o);if(f.push(j),j.isMature?g.push(j):m.push(j),j.mutations.length>0){h.push(j);for(const B of j.mutations)x[B]||(x[B]=[]),x[B].push(j);}}}else if($.objectType==="egg"){const G=ux(E,$,z,o);k.push(G),P[G.eggId]||(P[G.eggId]=[]),P[G.eggId].push(G),G.isMature?v.push(G):w.push(G);}else if($.objectType==="decor"){const G=bs(E,$,z,"tileObjects");y.push(G),T[G.decorId]||(T[G.decorId]=[]),T[G.decorId].push(G);}}for(const[E,$]of Object.entries(n.boardwalkTileObjects)){const te=parseInt(E,10);A.add(te);const z=a?a.globalToXY(te):{x:0,y:0},G=bs(E,$,z,"boardwalk");C.push(G),T[G.decorId]||(T[G.decorId]=[]),T[G.decorId].push(G);}const I=[...y,...C],F=s.filter(E=>!S.has(E.localIndex)),R=c.filter(E=>!A.has(E.localIndex));return {garden:n,mySlotIndex:r,plants:{all:d,mature:l,growing:u,bySpecies:p,count:d.length},crops:{all:f,mature:g,growing:m,mutated:{all:h,byMutation:x}},eggs:{all:k,mature:v,growing:w,byType:P,count:k.length},decors:{tileObjects:y,boardwalk:C,all:I,byType:T,count:I.length},tiles:{tileObjects:s,boardwalk:c,empty:{tileObjects:F,boardwalk:R}},counts:{plants:d.length,maturePlants:l.length,crops:f.length,matureCrops:g.length,eggs:k.length,matureEggs:v.length,decors:I.length,emptyTileObjects:F.length,emptyBoardwalk:R.length}}}function ys(e){return JSON.stringify({plants:e.counts.plants,maturePlants:e.counts.maturePlants,crops:e.counts.crops,matureCrops:e.counts.matureCrops,eggs:e.counts.eggs,matureEggs:e.counts.matureEggs,decors:e.counts.decors,emptyTileObjects:e.counts.emptyTileObjects,emptyBoardwalk:e.counts.emptyBoardwalk})}function px(e,t){const n=new Set(e.map(i=>i.tileIndex)),r=new Set(t.map(i=>i.tileIndex)),o=t.filter(i=>!n.has(i.tileIndex)),a=e.filter(i=>!r.has(i.tileIndex));return {added:o,removed:a}}function fx(e,t,n){const r=new Set(e.map(a=>a.tileIndex)),o=new Set(n.map(a=>a.tileIndex));return t.filter(a=>!r.has(a.tileIndex)&&o.has(a.tileIndex))}function gx(e,t,n){const r=new Set(e.map(a=>`${a.tileIndex}:${a.slotIndex}`)),o=new Set(n.map(a=>`${a.tileIndex}:${a.slotIndex}`));return t.filter(a=>{const i=`${a.tileIndex}:${a.slotIndex}`;return !r.has(i)&&o.has(i)})}function mx(e,t,n){const r=new Set(e.map(a=>a.tileIndex)),o=new Set(n.map(a=>a.tileIndex));return t.filter(a=>!r.has(a.tileIndex)&&o.has(a.tileIndex))}function hx(e,t){const n=[],r=new Map(e.map(o=>[o.tileIndex,o]));for(const o of t){const a=r.get(o.tileIndex);if(!a)continue;const i=Math.min(a.slots.length,o.slots.length);for(let s=0;s<i;s++){const c=new Set(a.slots[s].mutations),d=new Set(o.slots[s].mutations),l=[...d].filter(p=>!c.has(p)),u=[...c].filter(p=>!d.has(p));if(l.length>0||u.length>0){const p=Date.now(),f=o.slots[s],g={tileIndex:o.tileIndex,position:o.position,slotIndex:s,species:f.species,startTime:f.startTime,endTime:f.endTime,targetScale:f.targetScale,mutations:[...f.mutations],isMature:p>=f.endTime};n.push({crop:g,added:l,removed:u});}}}return n}function bx(e,t,n){const r=[],o=new Map(t.map(i=>[i.tileIndex,i])),a=new Map;for(const i of n)a.set(`${i.tileIndex}:${i.slotIndex}`,i);for(const i of e){const s=o.get(i.tileIndex);if(!s)continue;const c=Math.min(i.slots.length,s.slots.length);for(let d=0;d<c;d++){const l=i.slots[d],u=s.slots[d];if(l.startTime!==u.startTime){const p=a.get(`${i.tileIndex}:${d}`);if(!p||!p.isMature)continue;const f={tileIndex:i.tileIndex,position:i.position,slotIndex:d,species:l.species,startTime:l.startTime,endTime:l.endTime,targetScale:l.targetScale,mutations:[...l.mutations],isMature:true};r.push({crop:f,remainingSlots:s.slotsCount});}}if(s.slotsCount<i.slotsCount)for(let d=s.slotsCount;d<i.slotsCount;d++){const l=a.get(`${i.tileIndex}:${d}`);if(!l||!l.isMature)continue;const u=i.slots[d];if(!u)continue;const p={tileIndex:i.tileIndex,position:i.position,slotIndex:d,species:u.species,startTime:u.startTime,endTime:u.endTime,targetScale:u.targetScale,mutations:[...u.mutations],isMature:true};r.push({crop:p,remainingSlots:s.slotsCount});}}return r}function xx(e,t){const n=new Set(e.map(i=>i.tileIndex)),r=new Set(t.map(i=>i.tileIndex)),o=t.filter(i=>!n.has(i.tileIndex)),a=e.filter(i=>!r.has(i.tileIndex));return {added:o,removed:a}}function yx(e,t){const n=c=>`${c.tileIndex}:${c.location}`,r=c=>`${c.tileIndex}:${c.location}`,o=new Set(e.map(n)),a=new Set(t.map(r)),i=t.filter(c=>!o.has(r(c))),s=e.filter(c=>!a.has(n(c)));return {added:i,removed:s}}function vx(){let e=wa(),t=wa(),n=false;const r=[],o={all:new Set,stable:new Set,plantAdded:new Set,plantRemoved:new Set,plantMatured:new Set,cropMutated:new Set,cropMatured:new Set,cropHarvested:new Set,eggPlaced:new Set,eggRemoved:new Set,eggMatured:new Set,decorPlaced:new Set,decorRemoved:new Set},a={},i=new Set,s=2;function c(){if(i.size<s)return;const l=xs(a,va);if(ct(e,l)||(t=e,e=l,!n))return;for(const v of o.all)v(e,t);if(ys(t)!==ys(e))for(const v of o.stable)v(e,t);const u=px(t.plants.all,e.plants.all);for(const v of u.added)for(const w of o.plantAdded)w({plant:v});for(const v of u.removed)for(const w of o.plantRemoved)w({plant:v,tileIndex:v.tileIndex});const p=fx(t.plants.mature,e.plants.mature,e.plants.all);for(const v of p)for(const w of o.plantMatured)w({plant:v});const f=hx(t.plants.all,e.plants.all);for(const v of f)for(const w of o.cropMutated)w(v);const g=gx(t.crops.mature,e.crops.mature,e.crops.all);for(const v of g)for(const w of o.cropMatured)w({crop:v});const m=bx(t.plants.all,e.plants.all,t.crops.all);for(const v of m)for(const w of o.cropHarvested)w(v);const h=xx(t.eggs.all,e.eggs.all);for(const v of h.added)for(const w of o.eggPlaced)w({egg:v});for(const v of h.removed)for(const w of o.eggRemoved)w({egg:v});const x=mx(t.eggs.mature,e.eggs.mature,e.eggs.all);for(const v of x)for(const w of o.eggMatured)w({egg:v});const k=yx(t.decors.all,e.decors.all);for(const v of k.added)for(const w of o.decorPlaced)w({decor:v});for(const v of k.removed)for(const w of o.decorRemoved)w({decor:v});}async function d(){if(n)return;const l=await rg.onChangeNow(p=>{a.garden=p,i.add("garden"),c();});r.push(l);const u=await ue.subscribe("myUserSlotIdxAtom",p=>{a.mySlotIndex=p,i.add("mySlotIndex"),c();});r.push(u),n=true,i.size===s&&(e=xs(a,va));}return d(),{get(){return e},subscribe(l,u){return o.all.add(l),u?.immediate!==false&&n&&i.size===s&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,u){return o.stable.add(l),u?.immediate!==false&&n&&i.size===s&&l(e,e),()=>o.stable.delete(l)},subscribePlantAdded(l,u){if(o.plantAdded.add(l),u?.immediate&&n&&i.size===s)for(const p of e.plants.all)l({plant:p});return ()=>o.plantAdded.delete(l)},subscribePlantRemoved(l,u){return o.plantRemoved.add(l),()=>o.plantRemoved.delete(l)},subscribePlantMatured(l,u){if(o.plantMatured.add(l),u?.immediate&&n&&i.size===s)for(const p of e.plants.mature)l({plant:p});return ()=>o.plantMatured.delete(l)},subscribeCropMutated(l,u){if(o.cropMutated.add(l),u?.immediate&&n&&i.size===s)for(const p of e.crops.mutated.all)l({crop:p,added:p.mutations,removed:[]});return ()=>o.cropMutated.delete(l)},subscribeCropMatured(l,u){if(o.cropMatured.add(l),u?.immediate&&n&&i.size===s)for(const p of e.crops.mature)l({crop:p});return ()=>o.cropMatured.delete(l)},subscribeCropHarvested(l,u){return o.cropHarvested.add(l),()=>o.cropHarvested.delete(l)},subscribeEggPlaced(l,u){if(o.eggPlaced.add(l),u?.immediate&&n&&i.size===s)for(const p of e.eggs.all)l({egg:p});return ()=>o.eggPlaced.delete(l)},subscribeEggRemoved(l,u){return o.eggRemoved.add(l),()=>o.eggRemoved.delete(l)},subscribeEggMatured(l,u){if(o.eggMatured.add(l),u?.immediate&&n&&i.size===s)for(const p of e.eggs.mature)l({egg:p});return ()=>o.eggMatured.delete(l)},subscribeDecorPlaced(l,u){if(o.decorPlaced.add(l),u?.immediate&&n&&i.size===s)for(const p of e.decors.all)l({decor:p});return ()=>o.decorPlaced.delete(l)},subscribeDecorRemoved(l,u){return o.decorRemoved.add(l),()=>o.decorRemoved.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.plantAdded.clear(),o.plantRemoved.clear(),o.plantMatured.clear(),o.cropMutated.clear(),o.cropMatured.clear(),o.cropHarvested.clear(),o.eggPlaced.clear(),o.eggRemoved.clear(),o.eggMatured.clear(),o.decorPlaced.clear(),o.decorRemoved.clear(),n=false;}}}let No=null;function Kc(){return No||(No=vx()),No}const vs={inventory:"myPetInventoryAtom",hutch:"myPetHutchPetItemsAtom",active:"myPetInfosAtom",slotInfos:"myPetSlotInfosAtom",expandedPetSlotId:"expandedPetSlotIdAtom",myNumPetHutchItems:"myNumPetHutchItemsAtom",activityLogs:"myDataAtom"};function ws(e,t){const n=uo(e.xp),r=po(e.petSpecies,e.targetScale),o=fo(e.petSpecies,e.xp,r),a=go(e.petSpecies,n);return {id:e.id,petSpecies:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,mutations:[...e.mutations],targetScale:e.targetScale,abilities:[...e.abilities],location:t,position:null,lastAbilityTrigger:null,growthStage:n,currentStrength:o,maxStrength:r,isMature:a}}function wx(e,t){const r=t[e.slot.id]?.lastAbilityTrigger??null,o=uo(e.slot.xp),a=po(e.slot.petSpecies,e.slot.targetScale),i=fo(e.slot.petSpecies,e.slot.xp,a),s=go(e.slot.petSpecies,o);return {id:e.slot.id,petSpecies:e.slot.petSpecies,name:e.slot.name,xp:e.slot.xp,hunger:e.slot.hunger,mutations:[...e.slot.mutations],targetScale:e.slot.targetScale,abilities:[...e.slot.abilities],location:"active",position:e.position?{x:e.position.x,y:e.position.y}:null,lastAbilityTrigger:r,growthStage:o,currentStrength:i,maxStrength:a,isMature:s}}const Ss=500;let rt=[],$r=0;function Sx(){try{const e=Pe(ll.GLOBAL.MY_PETS_ABILITY_LOGS,[]);if(!Array.isArray(e))return [];const t=e.filter(n=>typeof n=="object"&&n!==null&&typeof n.petId=="string"&&typeof n.petName=="string"&&typeof n.petSpecies=="string"&&typeof n.abilityId=="string"&&typeof n.performedAt=="number");return t.length<e.length&&console.log(`[myPets] Migrated ability logs: removed ${e.length-t.length} old entries`),t.length>0&&($r=Math.max(...t.map(n=>n.performedAt))),t}catch(e){return console.error("[myPets] Failed to load ability logs from storage:",e),[]}}function kx(e){try{Oe(ll.GLOBAL.MY_PETS_ABILITY_LOGS,e);}catch(t){console.error("[myPets] Failed to save ability logs to storage:",t);}}function Cx(e){try{const n=e.parameters.pet;return !n||!n.id||!n.petSpecies?null:{petId:n.id,petName:n.name||n.petSpecies,petSpecies:n.petSpecies,abilityId:e.action,data:e.parameters,performedAt:e.timestamp}}catch(t){return console.error("[myPets] Failed to convert activity log:",t),null}}function Tx(e){if(!e||!Array.isArray(e))return;const t=jl(e),n=[];for(const r of t)if(r.timestamp>$r){const o=Cx(r);o&&n.push(o);}n.length!==0&&($r=Math.max(...n.map(r=>r.performedAt),$r),rt=[...n,...rt],rt.length>Ss&&(rt=rt.slice(0,Ss)),kx(rt),console.log(`[myPets] Processed ${n.length} new ability logs (total: ${rt.length})`));}function ks(e){const t=new Set,n=[];for(const f of e.active??[]){const g=wx(f,e.slotInfos??{});n.push(g),t.add(g.id);}const r=[];for(const f of e.inventory??[]){if(t.has(f.id))continue;const g=ws(f,"inventory");r.push(g),t.add(g.id);}const o=[];for(const f of e.hutch??[]){if(t.has(f.id))continue;const g=ws(f,"hutch");o.push(g),t.add(g.id);}const a=[...n,...r,...o],i=e.expandedPetSlotId??null,s=i?a.find(f=>f.id===i)??null:null,l=Kc().get().decors.all.some(f=>f.decorId==="PetHutch"),u=e.myNumPetHutchItems??0;return {all:a,byLocation:{inventory:r,hutch:o,active:n},counts:{inventory:r.length,hutch:o.length,active:n.length,total:a.length},hutch:{hasHutch:l,currentItems:u,maxItems:25},expandedPetSlotId:i,expandedPet:s,abilityLogs:[...rt]}}const Cs={all:[],byLocation:{inventory:[],hutch:[],active:[]},counts:{inventory:0,hutch:0,active:0,total:0},hutch:{hasHutch:false,currentItems:0,maxItems:25},expandedPetSlotId:null,expandedPet:null,abilityLogs:[]};function Px(e,t){if(e.length!==t.length)return  false;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return  false;return  true}function Ts(e){return JSON.stringify({id:e.id,petSpecies:e.petSpecies,name:e.name,mutations:e.mutations,abilities:e.abilities,location:e.location})}function Ax(e,t){if(e.all.length!==t.all.length)return  false;const n=e.all.map(Ts),r=t.all.map(Ts);return Px(n,r)}function _x(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const a=r.get(o.id);a&&a.location!==o.location&&n.push({pet:o,from:a.location,to:o.location});}return n}function Ix(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){if(!o.lastAbilityTrigger)continue;const i=r.get(o.id)?.lastAbilityTrigger;(!i||i.abilityId!==o.lastAbilityTrigger.abilityId||i.performedAt!==o.lastAbilityTrigger.performedAt)&&n.push({pet:o,trigger:o.lastAbilityTrigger});}return n}function Ex(e,t){const n=new Set(e.all.map(i=>i.id)),r=new Set(t.all.map(i=>i.id)),o=t.all.filter(i=>!n.has(i.id)),a=e.all.filter(i=>!r.has(i.id));return o.length===0&&a.length===0?null:{added:o,removed:a,counts:t.counts}}function Mx(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const a=r.get(o.id);a&&o.growthStage>a.growthStage&&n.push({pet:o,previousStage:a.growthStage,newStage:o.growthStage});}return n}function Lx(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const a=r.get(o.id);a&&o.currentStrength>a.currentStrength&&n.push({pet:o,previousStrength:a.currentStrength,newStrength:o.currentStrength});}return n}function Fx(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const a=r.get(o.id);a&&o.currentStrength===o.maxStrength&&a.currentStrength<a.maxStrength&&n.push({pet:o});}return n}function Rx(){let e=Cs,t=Cs,n=false;const r=[],o={all:new Set,stable:new Set,location:new Set,ability:new Set,count:new Set,expandedPet:new Set,growth:new Set,strengthGain:new Set,maxStrength:new Set},a={},i=Object.keys(vs),s=new Set;function c(){if(s.size<i.length)return;if(a.activityLogs){const x=a.activityLogs?.activityLogs||a.activityLogs;Array.isArray(x)&&Tx(x);}const l=ks(a);if(ct(e,l)||(t=e,e=l,!n))return;for(const x of o.all)x(e,t);if(!Ax(t,e))for(const x of o.stable)x(e,t);const u=_x(t,e);for(const x of u)for(const k of o.location)k(x);const p=Ix(t,e);for(const x of p)for(const k of o.ability)k(x);const f=Ex(t,e);if(f)for(const x of o.count)x(f);const g=Mx(t,e);for(const x of g)for(const k of o.growth)k(x);const m=Lx(t,e);for(const x of m)for(const k of o.strengthGain)k(x);const h=Fx(t,e);for(const x of h)for(const k of o.maxStrength)k(x);if(t.expandedPetSlotId!==e.expandedPetSlotId){const x={current:e.expandedPet,previous:t.expandedPet,currentId:e.expandedPetSlotId,previousId:t.expandedPetSlotId};for(const k of o.expandedPet)k(x);}}async function d(){if(n)return;rt=Sx(),console.log(`[myPets] Loaded ${rt.length} ability logs from storage`);const l=i.map(async u=>{const p=vs[u],f=await ue.subscribe(p,g=>{a[u]=g,s.add(u),c();});r.push(f);});await Promise.all(l),n=true,s.size===i.length&&(e=ks(a));}return d(),{get(){return e},subscribe(l,u){return o.all.add(l),u?.immediate!==false&&n&&s.size===i.length&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,u){return o.stable.add(l),u?.immediate!==false&&n&&s.size===i.length&&l(e,e),()=>o.stable.delete(l)},subscribeLocation(l,u){if(o.location.add(l),u?.immediate&&n&&s.size===i.length)for(const p of e.all)l({pet:p,from:p.location,to:p.location});return ()=>o.location.delete(l)},subscribeAbility(l,u){if(o.ability.add(l),u?.immediate&&n&&s.size===i.length)for(const p of e.all)p.lastAbilityTrigger&&l({pet:p,trigger:p.lastAbilityTrigger});return ()=>o.ability.delete(l)},subscribeCount(l,u){return o.count.add(l),u?.immediate&&n&&s.size===i.length&&l({added:e.all,removed:[],counts:e.counts}),()=>o.count.delete(l)},subscribeExpandedPet(l,u){return o.expandedPet.add(l),u?.immediate&&n&&s.size===i.length&&l({current:e.expandedPet,previous:e.expandedPet,currentId:e.expandedPetSlotId,previousId:e.expandedPetSlotId}),()=>o.expandedPet.delete(l)},subscribeGrowth(l,u){if(o.growth.add(l),u?.immediate&&n&&s.size===i.length)for(const p of e.all)l({pet:p,previousStage:p.growthStage,newStage:p.growthStage});return ()=>o.growth.delete(l)},subscribeStrengthGain(l,u){if(o.strengthGain.add(l),u?.immediate&&n&&s.size===i.length)for(const p of e.all)l({pet:p,previousStrength:p.currentStrength,newStrength:p.currentStrength});return ()=>o.strengthGain.delete(l)},subscribeMaxStrength(l,u){if(o.maxStrength.add(l),u?.immediate&&n&&s.size===i.length)for(const p of e.all)p.currentStrength===p.maxStrength&&l({pet:p});return ()=>o.maxStrength.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.location.clear(),o.ability.clear(),o.count.clear(),o.expandedPet.clear(),o.growth.clear(),o.strengthGain.clear(),o.maxStrength.clear(),n=false;}}}let Oo=null;function sn(){return Oo||(Oo=Rx()),Oo}const Ps={inventory:"myInventoryAtom",isFull:"isMyInventoryAtMaxLengthAtom",selectedItemIndex:"myValidatedSelectedItemIndexAtom"},As={items:[],favoritedItemIds:[],count:0,isFull:false,selectedItem:null};function _s(e){const t=e.inventory,n=t?.items??[],r=t?.favoritedItemIds??[],o=e.selectedItemIndex;let a=null;return o!==null&&o>=0&&o<n.length&&(a={index:o,item:n[o]}),{items:n,favoritedItemIds:r,count:n.length,isFull:e.isFull??false,selectedItem:a}}function Is(e){const t=e.items.map(n=>"id"in n?n.id:"species"in n&&n.itemType==="Seed"?`seed:${n.species}:${n.quantity}`:"toolId"in n?`tool:${n.toolId}:${n.quantity}`:"eggId"in n?`egg:${n.eggId}:${n.quantity}`:"decorId"in n?`decor:${n.decorId}:${n.quantity}`:JSON.stringify(n));return JSON.stringify({itemKeys:t,favoritedItemIds:e.favoritedItemIds,isFull:e.isFull,selectedItemIndex:e.selectedItem?.index??null})}function Nx(e,t){return Is(e)===Is(t)}function Ox(e,t){return e===null&&t===null?false:e===null||t===null?true:e.index!==t.index}function hr(e){return "id"in e?e.id:"species"in e&&e.itemType==="Seed"?`seed:${e.species}`:"toolId"in e?`tool:${e.toolId}`:"eggId"in e?`egg:${e.eggId}`:"decorId"in e?`decor:${e.decorId}`:JSON.stringify(e)}function Bx(e,t){const n=new Set(e.map(hr)),r=new Set(t.map(hr)),o=t.filter(i=>!n.has(hr(i))),a=e.filter(i=>!r.has(hr(i)));return o.length===0&&a.length===0?null:{added:o,removed:a,counts:{before:e.length,after:t.length}}}function $x(e,t){const n=new Set(e),r=new Set(t),o=t.filter(i=>!n.has(i)),a=e.filter(i=>!r.has(i));return o.length===0&&a.length===0?null:{added:o,removed:a,current:t}}function Dx(){let e=As,t=As,n=false;const r=[],o={all:new Set,stable:new Set,selection:new Set,items:new Set,favorites:new Set},a={},i=Object.keys(Ps),s=new Set;function c(){if(s.size<i.length)return;const l=_s(a);if(ct(e,l)||(t=e,e=l,!n))return;for(const f of o.all)f(e,t);if(!Nx(t,e))for(const f of o.stable)f(e,t);if(Ox(t.selectedItem,e.selectedItem)){const f={current:e.selectedItem,previous:t.selectedItem};for(const g of o.selection)g(f);}const u=Bx(t.items,e.items);if(u)for(const f of o.items)f(u);const p=$x(t.favoritedItemIds,e.favoritedItemIds);if(p)for(const f of o.favorites)f(p);}async function d(){if(n)return;const l=i.map(async u=>{const p=Ps[u],f=await ue.subscribe(p,g=>{a[u]=g,s.add(u),c();});r.push(f);});await Promise.all(l),n=true,s.size===i.length&&(e=_s(a));}return d(),{get(){return e},subscribe(l,u){return o.all.add(l),u?.immediate!==false&&n&&s.size===i.length&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,u){return o.stable.add(l),u?.immediate!==false&&n&&s.size===i.length&&l(e,e),()=>o.stable.delete(l)},subscribeSelection(l,u){return o.selection.add(l),u?.immediate&&n&&s.size===i.length&&l({current:e.selectedItem,previous:e.selectedItem}),()=>o.selection.delete(l)},subscribeItems(l,u){return o.items.add(l),u?.immediate&&n&&s.size===i.length&&l({added:e.items,removed:[],counts:{before:0,after:e.count}}),()=>o.items.delete(l)},subscribeFavorites(l,u){return o.favorites.add(l),u?.immediate&&n&&s.size===i.length&&l({added:e.favoritedItemIds,removed:[],current:e.favoritedItemIds}),()=>o.favorites.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.selection.clear(),o.items.clear(),o.favorites.clear(),n=false;}}}let Bo=null;function $t(){return Bo||(Bo=Dx()),Bo}const Sa={all:[],host:null,myPlayer:null,count:0};function zx(e,t,n){const r=n.get(e.id),o=r?.slot,a=o?.data,i=o?.lastActionEvent;return {id:e.id,name:e.name,discordId:e.databaseUserId,discordAvatarUrl:e.discordAvatarUrl,guildId:e.guildId,isConnected:e.isConnected,isHost:e.id===t,slotIndex:r?.index??null,position:o?.position??null,cosmetic:{color:e.cosmetic?.color??"",avatar:e.cosmetic?.avatar?[...e.cosmetic.avatar]:[]},emote:{type:e.emoteData?.emoteType??-1},coins:a?.coinsCount??0,inventory:a?.inventory??null,shopPurchases:a?.shopPurchases??null,garden:a?.garden??null,pets:{slots:a?.petSlots??[],slotInfos:o?.petSlotInfos??null},journal:a?.journal??null,stats:a?.stats??null,tasksCompleted:a?.tasksCompleted??[],activityLogs:a?.activityLogs??[],customRestocks:{config:a?.customRestocks??null,inventories:o?.customRestockInventories??null},lastAction:i?{type:i.action,data:i.data,timestamp:i.timestamp}:null,selectedItemIndex:o?.notAuthoritative_selectedItemIndex??null,lastSlotMachineInfo:o?.lastSlotMachineInfo??null}}function Es(e){const t=e.players,n=e.hostPlayerId??"",r=e.userSlots??[],o=e.myUserSlotIndex;if(!t||!Array.isArray(t)||t.length===0)return Sa;const a=new Map;Array.isArray(r)&&r.forEach((d,l)=>{d?.type==="user"&&d?.playerId&&a.set(d.playerId,{slot:d,index:l});});const i=t.map(d=>zx(d,n,a)),s=i.find(d=>d.isHost)??null,c=o!==null?i.find(d=>d.slotIndex===o)??null:null;return {all:i,host:s,myPlayer:c,count:i.length}}function Ms(e){const t=e.all.map(n=>`${n.id}:${n.isConnected}:${n.isHost}`);return JSON.stringify({playerKeys:t,hostId:e.host?.id??null,count:e.count})}function Gx(e,t){const n=[],r=new Set(e.map(a=>a.id)),o=new Set(t.map(a=>a.id));for(const a of t)r.has(a.id)||n.push({player:a,type:"join"});for(const a of e)o.has(a.id)||n.push({player:a,type:"leave"});return n}function jx(e,t){const n=[],r=new Map(e.map(o=>[o.id,o]));for(const o of t){const a=r.get(o.id);a&&a.isConnected!==o.isConnected&&n.push({player:o,isConnected:o.isConnected});}return n}function Hx(){let e=Sa,t=Sa,n=false;const r=[],o={all:new Set,stable:new Set,joinLeave:new Set,connection:new Set,host:new Set},a={},i=new Set,s=4;function c(){if(i.size<s)return;const l=Es(a);if(ct(e,l)||(t=e,e=l,!n))return;for(const m of o.all)m(e,t);if(Ms(t)!==Ms(e))for(const m of o.stable)m(e,t);const u=Gx(t.all,e.all);for(const m of u)for(const h of o.joinLeave)h(m);const p=jx(t.all,e.all);for(const m of p)for(const h of o.connection)h(m);const f=t.host?.id??null,g=e.host?.id??null;if(f!==g){const m={current:e.host,previous:t.host};for(const h of o.host)h(m);}}async function d(){if(n)return;const l=await tg.onChangeNow(g=>{a.players=g,i.add("players"),c();});r.push(l);const u=await ng.onChangeNow(g=>{a.hostPlayerId=g,i.add("hostPlayerId"),c();});r.push(u);const p=await eg.onChangeNow(g=>{a.userSlots=g,i.add("userSlots"),c();});r.push(p);const f=await ue.subscribe("myUserSlotIdxAtom",g=>{a.myUserSlotIndex=g,i.add("myUserSlotIndex"),c();});r.push(f),n=true,i.size===s&&(e=Es(a));}return d(),{get(){return e},subscribe(l,u){return o.all.add(l),u?.immediate!==false&&n&&i.size===s&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,u){return o.stable.add(l),u?.immediate!==false&&n&&i.size===s&&l(e,e),()=>o.stable.delete(l)},subscribeJoinLeave(l,u){if(o.joinLeave.add(l),u?.immediate&&n&&i.size===s)for(const p of e.all)l({player:p,type:"join"});return ()=>o.joinLeave.delete(l)},subscribeConnection(l,u){if(o.connection.add(l),u?.immediate&&n&&i.size===s)for(const p of e.all)l({player:p,isConnected:p.isConnected});return ()=>o.connection.delete(l)},subscribeHost(l,u){return o.host.add(l),u?.immediate&&n&&i.size===s&&l({current:e.host,previous:e.host}),()=>o.host.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.joinLeave.clear(),o.connection.clear(),o.host.clear(),n=false;}}}let $o=null;function Yc(){return $o||($o=Hx()),$o}const qn=["seed","tool","egg","decor"];function Wx(e,t){switch(t){case "seed":return e.species??e.itemType;case "tool":return e.toolId??e.itemType;case "egg":return e.eggId??e.itemType;case "decor":return e.decorId??e.itemType;default:return e.itemType}}function Ux(e,t,n){const r=Wx(e,t),o=n[r]??0,a=Math.max(0,e.initialStock-o);return {id:r,itemType:e.itemType,initialStock:e.initialStock,purchased:o,remaining:a,isAvailable:a>0}}function Vx(e,t,n){if(!t)return {type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null};const o=n[e]?.purchases??{},a=(t.inventory??[]).map(d=>Ux(d,e,o)),i=a.filter(d=>d.isAvailable).length,s=t.secondsUntilRestock??0,c=s>0?Date.now()+s*1e3:null;return {type:e,items:a,availableCount:i,totalCount:a.length,secondsUntilRestock:s,restockAt:c}}function Ls(e){const t=e.shops,n=e.purchases??{},r=qn.map(s=>Vx(s,t?.[s],n)),o={seed:r[0],tool:r[1],egg:r[2],decor:r[3]},a=r.filter(s=>s.restockAt!==null);let i=null;if(a.length>0){const c=a.sort((d,l)=>(d.restockAt??0)-(l.restockAt??0))[0];i={shop:c.type,seconds:c.secondsUntilRestock,at:c.restockAt};}return {all:r,byType:o,nextRestock:i}}const Fs={all:qn.map(e=>({type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null})),byType:{seed:{type:"seed",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},tool:{type:"tool",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},egg:{type:"egg",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},decor:{type:"decor",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null}},nextRestock:null};function Rs(e){return JSON.stringify({shops:e.all.map(t=>({type:t.type,itemCount:t.items.length,availableCount:t.availableCount}))})}function Xx(e,t){const n=e.secondsUntilRestock,r=t.secondsUntilRestock;return n>0&&n<=5&&r>n||n>0&&r===0&&t.items.some(a=>a.purchased===0)?{shop:t,previousItems:e.items}:null}function Kx(e,t){const n=[];for(const r of qn){const o=e.byType[r],a=t.byType[r],i=new Map(o.items.map(s=>[s.id,s]));for(const s of a.items){const c=i.get(s.id);c&&s.purchased>c.purchased&&n.push({shopType:r,itemId:s.id,quantity:s.purchased-c.purchased,newPurchased:s.purchased,remaining:s.remaining});}}return n}function Yx(e,t){const n=[];for(const r of qn){const o=e.byType[r],a=t.byType[r],i=new Map(o.items.map(s=>[s.id,s]));for(const s of a.items){const c=i.get(s.id);c&&c.isAvailable!==s.isAvailable&&n.push({shopType:r,itemId:s.id,wasAvailable:c.isAvailable,isAvailable:s.isAvailable});}}return n}function qx(){let e=Fs,t=Fs,n=false;const r=[],o={all:new Set,stable:new Set,seedRestock:new Set,toolRestock:new Set,eggRestock:new Set,decorRestock:new Set,purchase:new Set,availability:new Set},a={},i=new Set,s=2;function c(){if(i.size<s)return;const l=Ls(a);if(ct(e,l)||(t=e,e=l,!n))return;for(const g of o.all)g(e,t);if(Rs(t)!==Rs(e))for(const g of o.stable)g(e,t);const u={seed:o.seedRestock,tool:o.toolRestock,egg:o.eggRestock,decor:o.decorRestock};for(const g of qn){const m=Xx(t.byType[g],e.byType[g]);if(m)for(const h of u[g])h(m);}const p=Kx(t,e);for(const g of p)for(const m of o.purchase)m(g);const f=Yx(t,e);for(const g of f)for(const m of o.availability)m(g);}async function d(){if(n)return;const l=await og.onChangeNow(p=>{a.shops=p,i.add("shops"),c();});r.push(l);const u=await ag.onChangeNow(p=>{a.purchases=p,i.add("purchases"),c();});r.push(u),n=true,i.size===s&&(e=Ls(a));}return d(),{get(){return e},getShop(l){return e.byType[l]},getItem(l,u){return e.byType[l].items.find(f=>f.id===u)??null},subscribe(l,u){return o.all.add(l),u?.immediate!==false&&n&&i.size===s&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,u){return o.stable.add(l),u?.immediate!==false&&n&&i.size===s&&l(e,e),()=>o.stable.delete(l)},subscribeSeedRestock(l,u){return o.seedRestock.add(l),u?.immediate&&n&&i.size===s&&l({shop:e.byType.seed,previousItems:[]}),()=>o.seedRestock.delete(l)},subscribeToolRestock(l,u){return o.toolRestock.add(l),u?.immediate&&n&&i.size===s&&l({shop:e.byType.tool,previousItems:[]}),()=>o.toolRestock.delete(l)},subscribeEggRestock(l,u){return o.eggRestock.add(l),u?.immediate&&n&&i.size===s&&l({shop:e.byType.egg,previousItems:[]}),()=>o.eggRestock.delete(l)},subscribeDecorRestock(l,u){return o.decorRestock.add(l),u?.immediate&&n&&i.size===s&&l({shop:e.byType.decor,previousItems:[]}),()=>o.decorRestock.delete(l)},subscribePurchase(l,u){if(o.purchase.add(l),u?.immediate&&n&&i.size===s)for(const p of e.all)for(const f of p.items)f.purchased>0&&l({shopType:p.type,itemId:f.id,quantity:f.purchased,newPurchased:f.purchased,remaining:f.remaining});return ()=>o.purchase.delete(l)},subscribeAvailability(l,u){if(o.availability.add(l),u?.immediate&&n&&i.size===s)for(const p of e.all)for(const f of p.items)l({shopType:p.type,itemId:f.id,wasAvailable:f.isAvailable,isAvailable:f.isAvailable});return ()=>o.availability.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.seedRestock.clear(),o.toolRestock.clear(),o.eggRestock.clear(),o.decorRestock.clear(),o.purchase.clear(),o.availability.clear(),n=false;}}}let Do=null;function Jx(){return Do||(Do=qx()),Do}const Qx=["Sunny","Rain","Frost","Dawn","AmberMoon"];function Zx(e){return Qx.includes(e)}const ka={type:"Sunny",isActive:false,startTime:null,endTime:null,remainingSeconds:0};function ey(e){if(!e)return ka;const t=Date.now(),n=e.endTime??0,r=Math.max(0,n-t),o=Math.floor(r/1e3),a=o>0,i=e.type??"Sunny";return {type:Zx(i)?i:"Sunny",isActive:a,startTime:e.startTime??null,endTime:e.endTime??null,remainingSeconds:o}}function ty(){let e=ka,t=ka,n=false,r=null;const o={all:new Set,change:new Set};function a(s){const c=ey(s);if(e.type===c.type&&e.isActive===c.isActive&&e.startTime===c.startTime&&e.endTime===c.endTime){e=c;return}if(t=e,e=c,!!n){for(const d of o.all)d(e,t);if(t.type!==e.type||t.isActive!==e.isActive){const d={current:e,previous:t};for(const l of o.change)l(d);}}}async function i(){n||(r=await ig.onChangeNow(s=>{a(s);}),n=true);}return i(),{get(){return e},subscribe(s,c){return o.all.add(s),c?.immediate!==false&&n&&s(e,e),()=>o.all.delete(s)},subscribeChange(s,c){return o.change.add(s),c?.immediate&&n&&s({current:e,previous:e}),()=>o.change.delete(s)},destroy(){r?.(),r=null,o.all.clear(),o.change.clear(),n=false;}}}let zo=null;function ny(){return zo||(zo=ty()),zo}let Ae=null;function qc(){return Ae||(Ae={currentTile:ix(),myPets:sn(),gameMap:va(),myInventory:$t(),players:Yc(),shops:Jx(),weather:ny(),myGarden:Kc()},Ae)}function ut(){if(!Ae)throw new Error("[Globals] Not initialized. Call initGlobals() first.");return Ae}function ry(){Ae&&(Ae.currentTile.destroy(),Ae.myPets.destroy(),Ae.gameMap.destroy(),Ae.myInventory.destroy(),Ae.players.destroy(),Ae.shops.destroy(),Ae.weather.destroy(),Ae.myGarden.destroy(),Ae=null);}const ye={get currentTile(){return ut().currentTile},get myPets(){return ut().myPets},get gameMap(){return ut().gameMap},get myInventory(){return ut().myInventory},get players(){return ut().players},get shops(){return ut().shops},get weather(){return ut().weather},get myGarden(){return ut().myGarden}},oy=100,Go=[];function Ca(e,t,n){let r="";if(n&&typeof n=="object"){if(t==="PartialState"){const o=n.op||"",a=n.path||"";let i="";if("value"in n){const s=n.value;i=typeof s=="object"?`{${Object.keys(s||{}).slice(0,2).join(",")}}`:String(s);}if(o||a)r=`PartialState : ${o} ${a} ${i}`.trim();else {const s=Object.keys(n).filter(c=>c!=="type");s.length>0&&(r=`PartialState - {${s.join(", ")}}`);}}if(!r&&n.event&&(r+=`${n.event} `),!r&&n.op&&(r+=`op:${n.op} `),!r&&n.data){const o=Object.keys(n.data);o.length>0&&(r+=`{${o.slice(0,3).join(",")}${o.length>3?"...":""}}`);}else !r&&Array.isArray(n)&&(r+=`[${n.length} items]`);}else typeof n=="string"&&(r=n.slice(0,50));Go.push({direction:e,type:String(t),timestamp:Date.now(),payload:n,summary:r.trim()||"-"}),Go.length>oy&&Go.shift();}const Ne={nativeCtor:null,captured:[],latestOpen:null},Ns=Symbol.for("ariesmod.ws.capture.wrapped"),Os=Symbol.for("ariesmod.ws.capture.native"),Jc=1;function Ta(e){return !!e&&e.readyState===Jc}function ay(){if(Ta(Ne.latestOpen))return Ne.latestOpen;for(let e=Ne.captured.length-1;e>=0;e--){const t=Ne.captured[e];if(Ta(t))return t}return null}function iy(e,t){Ne.captured.push(e),Ne.captured.length>25&&Ne.captured.splice(0,Ne.captured.length-25);const n=()=>{Ne.latestOpen=e,t&&console.log("[WS] captured socket opened",e.url);};e.addEventListener("open",n),e.addEventListener("close",()=>{Ne.latestOpen===e&&(Ne.latestOpen=null),t&&console.log("[WS] captured socket closed",e.url);}),e.addEventListener("message",r=>{try{const o=JSON.parse(r.data);Ca("in",o.type||"unknown",o);}catch{Ca("in","raw",r.data);}}),e.readyState===Jc&&n();}function sy(e=L,t={}){const n=!!t.debug,r=e?.WebSocket;if(typeof r!="function")return ()=>{};if(r[Ns])return Ne.nativeCtor=r[Os]??Ne.nativeCtor??null,()=>{};const o=r;Ne.nativeCtor=o;function a(i,s){const c=s!==void 0?new o(i,s):new o(i);try{iy(c,n);}catch{}return c}try{a.prototype=o.prototype;}catch{}try{Object.setPrototypeOf(a,o);}catch{}try{a.CONNECTING=o.CONNECTING,a.OPEN=o.OPEN,a.CLOSING=o.CLOSING,a.CLOSED=o.CLOSED;}catch{}a[Ns]=true,a[Os]=o;try{e.WebSocket=a,n&&console.log("[WS] WebSocket capture installed");}catch{return ()=>{}}return ()=>{try{e.WebSocket===a&&(e.WebSocket=o);}catch{}}}function ly(e=L){const t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function Qr(e=L){const t=ay();if(t)return {ws:t,source:"captured"};const n=ly(e);return n?{ws:n,source:"roomConnection"}:{ws:null,source:null}}function Qc(e,t={}){const n=t.pageWindow??L,r=t.intervalMs??500,o=!!t.debug;let a=null,i=null;const s=()=>{const d=Qr(n);(d.ws!==a||d.source!==i)&&(a=d.ws,i=d.source,o&&console.log("[WS] best socket changed:",d.source,d.ws),e(d));};s();const c=setInterval(s,r);return ()=>clearInterval(c)}function cy(e){if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return null}}function dy(e,t=L){const n=t?.MagicCircle_RoomConnection;if(n&&typeof n.sendMessage=="function")try{return Array.isArray(e)?n.sendMessage(...e):n.sendMessage(e),{ok:!0}}catch(a){return {ok:false,reason:"error",error:a}}const{ws:r}=Qr(t);if(!r)return {ok:false,reason:"no-ws"};if(!Ta(r))return {ok:false,reason:"not-open"};const o=cy(e);if(o==null)return {ok:false,reason:"error",error:new Error("Cannot stringify message")};try{const a=JSON.parse(o);Ca("out",a.type||"unknown",a);}catch{}try{return r.send(o),{ok:!0}}catch(a){return {ok:false,reason:"error",error:a}}}function uy(e,t={},n=L){return dy({type:e,...t},n)}const mt={Welcome:"Welcome",PartialState:"PartialState",ServerErrorMessage:"ServerErrorMessage",Config:"Config",InappropriateContentRejected:"InappropriateContentRejected",Emote:"Emote",CurrencyTransaction:"CurrencyTransaction",Pong:"Pong"},M={Chat:"Chat",Emote:"Emote",Wish:"Wish",KickPlayer:"KickPlayer",SetPlayerData:"SetPlayerData",UsurpHost:"UsurpHost",Dev:"Dev",SetSelectedGame:"SetSelectedGame",VoteForGame:"VoteForGame",RequestGame:"RequestGame",RestartGame:"RestartGame",Ping:"Ping",PlayerPosition:"PlayerPosition",Teleport:"Teleport",CheckWeatherStatus:"CheckWeatherStatus",MoveInventoryItem:"MoveInventoryItem",DropObject:"DropObject",PickupObject:"PickupObject",ToggleFavoriteItem:"ToggleFavoriteItem",PutItemInStorage:"PutItemInStorage",RetrieveItemFromStorage:"RetrieveItemFromStorage",MoveStorageItem:"MoveStorageItem",LogItems:"LogItems",PlantSeed:"PlantSeed",WaterPlant:"WaterPlant",HarvestCrop:"HarvestCrop",SellAllCrops:"SellAllCrops",PurchaseSeed:"PurchaseSeed",PurchaseEgg:"PurchaseEgg",PurchaseTool:"PurchaseTool",PurchaseDecor:"PurchaseDecor",PlantEgg:"PlantEgg",HatchEgg:"HatchEgg",PlantGardenPlant:"PlantGardenPlant",PotPlant:"PotPlant",MutationPotion:"MutationPotion",PickupDecor:"PickupDecor",PlaceDecor:"PlaceDecor",RemoveGardenObject:"RemoveGardenObject",PlacePet:"PlacePet",FeedPet:"FeedPet",PetPositions:"PetPositions",SwapPet:"SwapPet",StorePet:"StorePet",NamePet:"NamePet",SellPet:"SellPet",ReportSpeakingStart:"ReportSpeakingStart"};var tt=(e=>(e[e.ReconnectInitiated=4100]="ReconnectInitiated",e[e.PlayerLeftVoluntarily=4200]="PlayerLeftVoluntarily",e[e.UserSessionSuperseded=4250]="UserSessionSuperseded",e[e.ConnectionSuperseded=4300]="ConnectionSuperseded",e[e.ServerDisposed=4310]="ServerDisposed",e[e.HeartbeatExpired=4400]="HeartbeatExpired",e[e.PlayerKicked=4500]="PlayerKicked",e[e.VersionMismatch=4700]="VersionMismatch",e[e.VersionExpired=4710]="VersionExpired",e[e.AuthenticationFailure=4800]="AuthenticationFailure",e))(tt||{});new Set(Object.values(mt));new Set(Object.values(M));const py=["Room","Quinoa"],fy={Room:["Room"],Quinoa:py};function ee(e,t={},n=L){const r=t,{scopePath:o,scope:a,...i}=r,s=typeof o=="string"?o:a,c=Array.isArray(o)?o:s==="Room"||s==="Quinoa"?fy[s]:null;return uy(e,c?{scopePath:c,...i}:i,n)}function gy(e,t=L){return ee(M.Chat,{scope:"Room",message:e},t)}function my(e,t=L){return ee(M.Emote,{scope:"Room",emoteType:e},t)}function hy(e,t=L){return ee(M.Wish,{scope:"Quinoa",wish:e},t)}function by(e,t=L){return ee(M.KickPlayer,{scope:"Room",playerId:e},t)}function xy(e,t=L){return ee(M.SetPlayerData,{scope:"Room",data:e},t)}function yy(e=L){return ee(M.UsurpHost,{scope:"Quinoa"},e)}function vy(e=L){return ee(M.ReportSpeakingStart,{scope:"Quinoa"},e)}function wy(e,t=L){return ee(M.SetSelectedGame,{scope:"Room",gameId:e},t)}function Sy(e,t=L){return ee(M.VoteForGame,{scope:"Room",gameId:e},t)}function ky(e,t=L){return ee(M.RequestGame,{scope:"Room",gameId:e},t)}function Cy(e=L){return ee(M.RestartGame,{scope:"Room"},e)}function Ty(e,t=L){return ee(M.Ping,{scope:"Quinoa",id:e},t)}function Zc(e,t,n=L){return ee(M.PlayerPosition,{scope:"Quinoa",x:e,y:t},n)}const Py=Zc;function Ay(e,t,n=L){return ee(M.Teleport,{scope:"Quinoa",x:e,y:t},n)}function _y(e=L){return ee(M.CheckWeatherStatus,{scope:"Quinoa"},e)}function Iy(e,t,n=L){return ee(M.MoveInventoryItem,{scope:"Quinoa",fromIndex:e,toIndex:t},n)}function Ey(e,t=L){return ee(M.DropObject,{scope:"Quinoa",slotIndex:e},t)}function My(e,t=L){return ee(M.PickupObject,{scope:"Quinoa",objectId:e},t)}function bo(e,t=L){return ee(M.ToggleFavoriteItem,{scope:"Quinoa",itemId:e},t)}function Pi(e,t="PetHutch",n=L){return ee(M.PutItemInStorage,{scope:"Quinoa",itemId:e,storageId:t},n)}function Ai(e,t="PetHutch",n=L){return ee(M.RetrieveItemFromStorage,{scope:"Quinoa",itemId:e,storageId:t},n)}function Ly(e,t,n=L){return ee(M.MoveStorageItem,{scope:"Quinoa",fromIndex:e,toIndex:t},n)}function Fy(e=L){return ee(M.LogItems,{scope:"Quinoa"},e)}function Ry(e,t,n,r=L){return ee(M.PlantSeed,{scope:"Quinoa",seedId:e,x:t,y:n},r)}function Ny(e,t=L){return ee(M.WaterPlant,{scope:"Quinoa",plantId:e},t)}function Oy(e,t=L){return ee(M.HarvestCrop,{scope:"Quinoa",cropId:e},t)}function By(e=L){return ee(M.SellAllCrops,{scope:"Quinoa"},e)}function $y(e,t=L){return ee(M.PurchaseDecor,{scope:"Quinoa",decorId:e},t)}function Dy(e,t=L){return ee(M.PurchaseEgg,{scope:"Quinoa",eggId:e},t)}function zy(e,t=L){return ee(M.PurchaseTool,{scope:"Quinoa",toolId:e},t)}function Gy(e,t=L){return ee(M.PurchaseSeed,{scope:"Quinoa",seedId:e},t)}function jy(e,t,n,r=L){return ee(M.PlantEgg,{scope:"Quinoa",eggId:e,x:t,y:n},r)}function Hy(e,t=L){return ee(M.HatchEgg,{scope:"Quinoa",eggId:e},t)}function Wy(e,t,n,r=L){return ee(M.PlantGardenPlant,{scope:"Quinoa",plantId:e,x:t,y:n},r)}function Uy(e,t,n=L){return ee(M.PotPlant,{scope:"Quinoa",plantId:e,potId:t},n)}function Vy(e,t,n=L){return ee(M.MutationPotion,{scope:"Quinoa",potionId:e,targetId:t},n)}function Xy(e,t=L){return ee(M.PickupDecor,{scope:"Quinoa",decorInstanceId:e},t)}function Ky(e,t,n,r=L){return ee(M.PlaceDecor,{scope:"Quinoa",decorId:e,x:t,y:n},r)}function Yy(e,t=L){return ee(M.RemoveGardenObject,{scope:"Quinoa",objectId:e},t)}function ed(e,t={x:0,y:0},n="Dirt",r=0,o=L){return ee(M.PlacePet,{scope:"Quinoa",itemId:e,position:t,tileType:n,localTileIndex:r},o)}function qy(e,t,n=L){return ee(M.FeedPet,{scope:"Quinoa",petId:e,foodItemId:t},n)}function Jy(e,t=L){return ee(M.PetPositions,{scope:"Quinoa",positions:e},t)}function td(e,t,n=L){return ee(M.SwapPet,{scope:"Quinoa",petSlotId:e,petInventoryId:t},n)}function nd(e,t=L){return ee(M.StorePet,{scope:"Quinoa",itemId:e},t)}function Qy(e,t,n=L){return ee(M.NamePet,{scope:"Quinoa",petId:e,name:t},n)}function Zy(e,t=L){return ee(M.SellPet,{scope:"Quinoa",petId:e},t)}let Dr=null;const In=new Set;function Pa(){const e=Rt();if(!e.enabled){console.log("[AutoFavorite] Disabled");return}In.clear(),Dr=$t().subscribeItems(t=>{if(t.added.length>0){const n=Rt();for(const r of t.added)tv(r,n);}}),console.log(`✅ [AutoFavorite] Started - Watching ${e.simple.favoriteSpecies.length} species, ${e.simple.favoriteMutations.length} mutations`);}function rd(){Dr&&(Dr(),Dr=null),In.clear(),console.log("🛑 [AutoFavorite] Stopped");}function ev(e){const t=Rt();t.enabled=e,t.simple.enabled=e,Vc(t),e?Pa():rd();}function tv(e,t){if(e.itemType!=="Produce"&&e.itemType!=="Pet")return;if(!e.id){console.warn("[AutoFavorite] Item has no ID:",e);return}if(!(In.has(e.id)||e.isFavorited||e.favorited)&&od(e,t.simple)){In.add(e.id);try{bo(e.id),console.log(`[AutoFavorite] ⭐ Favorited ${e.itemType}: ${e.species||e.id}`);}catch(r){console.error("[AutoFavorite] WebSocket error:",r),In.delete(e.id);}}}function od(e,t){if(!t.enabled)return  false;const n=e.itemType==="Pet"?e.petSpecies:e.species;return n?!!(t.favoriteSpecies.includes(n)||t.favoriteMutations.length>0&&(e.mutations||[]).some(o=>t.favoriteMutations.includes(o))):false}function nv(){return Object.keys(oe.get("mutations")??{})}const _i={init(){this.isReady()||Pa();},isReady(){return ps()},DEFAULT_CONFIG:Uc,STORAGE_KEY:ki,loadConfig:Rt,saveConfig:Ci,updateConfig:Vc,updateSimpleConfig:Ti,setFavoriteSpecies:Yb,setFavoriteMutations:qb,isEnabled:ps,start:Pa,stop:rd,setEnabled:ev,shouldFavorite:od,getGameMutations:nv},Ii=Le.JOURNAL_CHECKER,ad={enabled:false,autoRefresh:true,refreshIntervalMs:3e4};function ln(){return Pe(Ii,ad)}function xo(e){Oe(Ii,e);}function Bs(){return ln().enabled}function rv(e){const t=ln();t.autoRefresh=e,xo(t);}function ov(e){const t=ln();t.refreshIntervalMs=e,xo(t);}let jo=null,$s=null;function id(){try{return Yc().get().myPlayer?.journal||null}catch{return null}}function av(e){return e?`pro:${Object.keys(e.produce).length}-pet:${Object.keys(e.pets).length}`:"null"}function sd(){const e=oe.get("mutations")??{};return ["Normal",...Object.keys(e),"Max Weight"]}function ld(){const e=oe.get("mutations")??{};return ["Normal",...Object.entries(e).filter(([n,r])=>!("tileRef"in r)).map(([n])=>n),"Max Weight"]}function iv(){return Object.keys(oe.get("mutations")??{})}function cd(e){const n=(oe.get("pets")??{})[e];if(!n)return [];const r=new Set;return Array.isArray(n.abilities)&&n.abilities.forEach(o=>r.add(o)),Array.isArray(n.possibleAbilities)&&n.possibleAbilities.forEach(o=>r.add(o)),n.abilityTiers&&Object.values(n.abilityTiers).forEach(o=>{Array.isArray(o)&&o.forEach(a=>r.add(a));}),[...r]}function dd(e){const t=oe.get("plants")??{},n=Object.keys(t),r=sd(),o=e?.produce??{},a=[];let i=0;for(const d of n){const u=o[d]?.variantsLogged?.map(f=>f.variant)??[],p=r.filter(f=>!u.includes(f));i+=u.length,a.push({species:d,variantsLogged:u,variantsMissing:p,variantsTotal:r.length,variantsPercentage:r.length>0?u.length/r.length*100:0,isComplete:p.length===0});}const s=n.length*r.length,c=a.filter(d=>d.variantsLogged.length>0).length;return {total:n.length,logged:c,percentage:n.length>0?c/n.length*100:0,speciesDetails:a,variantsTotal:s,variantsLogged:i,variantsPercentage:s>0?i/s*100:0}}function ud(e){const t=oe.get("pets")??{},n=Object.keys(t),r=ld(),o=e?.pets??{},a=[];let i=0,s=0,c=0,d=0;for(const u of n){const p=o[u],f=p?.variantsLogged?.map(k=>k.variant)??[],g=p?.abilitiesLogged?.map(k=>k.ability)??[],m=r.filter(k=>!f.includes(k)),h=cd(u),x=h.filter(k=>!g.includes(k));s+=r.length,i+=f.length,d+=h.length,c+=Math.min(g.length,h.length),a.push({species:u,variantsLogged:f,variantsMissing:m,variantsTotal:r.length,variantsPercentage:r.length>0?f.length/r.length*100:0,abilitiesLogged:g,abilitiesMissing:x,abilitiesTotal:h.length,abilitiesPercentage:h.length>0?g.length/h.length*100:0,isComplete:m.length===0&&(h.length===0||x.length===0)});}const l=a.filter(u=>u.variantsLogged.length>0).length;return {total:n.length,logged:l,percentage:n.length>0?l/n.length*100:0,speciesDetails:a,variantsTotal:s,variantsLogged:i,variantsPercentage:s>0?i/s*100:0,abilitiesTotal:d,abilitiesLogged:c,abilitiesPercentage:d>0?c/d*100:0}}async function yo(e=false){await oe.waitForAny();const t=id(),n=av(t);if(!e&&jo&&n===$s)return jo;const r={plants:dd(t),pets:ud(t),lastUpdated:Date.now()};return jo=r,$s=n,r}async function sv(){const e=await yo();return {plants:e.plants.speciesDetails.filter(t=>t.variantsMissing.length>0).map(t=>({species:t.species,missing:t.variantsMissing})),pets:e.pets.speciesDetails.filter(t=>t.variantsMissing.length>0||(t.abilitiesMissing?.length??0)>0).map(t=>({species:t.species,missingVariants:t.variantsMissing,missingAbilities:t.abilitiesMissing??[]}))}}let En=null;function Aa(){const e=ln();e.enabled&&(e.autoRefresh&&!En&&(En=setInterval(async()=>{const t=await yo();Ei(t);},e.refreshIntervalMs)),console.log("✅ [JournalChecker] Started"));}function pd(){En&&(clearInterval(En),En=null);}function lv(e){const t=ln();t.enabled=e,xo(t),e?Aa():pd();}function Ei(e){window.dispatchEvent(new CustomEvent("gemini:journal-updated",{detail:e}));}async function cv(){const e=await yo();return Ei(e),e}const fd={init(){this.isReady()||Aa();},isReady(){return Bs()},DEFAULT_CONFIG:ad,STORAGE_KEY:Ii,loadConfig:ln,saveConfig:xo,isEnabled:Bs,setAutoRefresh:rv,setRefreshInterval:ov,getMyJournal:id,getCropVariants:sd,getPetVariants:ld,getAllMutations:iv,getPetAbilities:cd,calculateProduceProgress:dd,calculatePetProgress:ud,aggregateJournalProgress:yo,getMissingSummary:sv,start:Aa,stop:pd,setEnabled:lv,refresh:cv,dispatchUpdate:Ei},Mi=Le.BULK_FAVORITE,gd={enabled:false,position:"top-right"};function Jn(){return Pe(Mi,gd)}function md(e){Oe(Mi,e);}function dv(e){const t=Jn();t.position=e,md(t);}function hd(){return Jn().enabled}function uv(e){return typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"}async function pv(e){const t=$t().get();if(!t?.items)return console.warn("[BulkFavorite] No inventory data available"),0;const n=new Set(t.favoritedItemIds??[]);let r=0;for(const o of t.items){if(!uv(o))continue;const a=n.has(o.id);e&&a||!e&&!a||(await bo(o.id,e),r++,await fv(50));}return console.log(`[BulkFavorite] ${e?"Favorited":"Unfavorited"} ${r} items`),r}function fv(e){return new Promise(t=>setTimeout(t,e))}let br=false;const Zr={init(){br||(br=true,console.log("✅ [MGBulkFavorite] Feature initialized"));},isReady(){return br},DEFAULT_CONFIG:gd,STORAGE_KEY:Mi,loadConfig:Jn,saveConfig:md,isEnabled:hd,setPosition:dv,bulkFavorite:pv,destroy(){br=false;}};class gv{constructor(){D(this,"achievements",new Map);D(this,"data");D(this,"STORAGE_KEY",Le.ACHIEVEMENTS);D(this,"onUnlockCallbacks",[]);D(this,"onProgressCallbacks",[]);this.data=this.loadData();}loadData(){return Pe(this.STORAGE_KEY,{unlocked:{},progress:{}})}saveData(){Oe(this.STORAGE_KEY,this.data);}register(t){this.achievements.set(t.id,t),this.data.progress[t.id]||(this.data.progress[t.id]={current:0,target:t.target,percentage:0});}registerMany(t){for(const n of t)this.register(n);}async checkAchievement(t){const n=this.achievements.get(t);if(!n)throw new Error(`Achievement not found: ${t}`);const r=this.isUnlocked(t),o=await n.checkProgress(),a={current:o,target:n.target,percentage:Math.min(100,Math.floor(o/n.target*100))},i=this.data.progress[t];this.data.progress[t]=a;const s=o>=n.target;return !r&&s?this.unlock(t,a):s||this.triggerProgressCallbacks({achievement:n,progress:a,previousProgress:i}),this.saveData(),{id:t,wasUnlocked:r,isUnlocked:s,progress:a}}async checkAllAchievements(){const t=[];for(const n of this.achievements.keys()){const r=await this.checkAchievement(n);t.push(r);}return t}unlock(t,n){const r=this.achievements.get(t);if(!r)return;const o={achievementId:t,unlockedAt:Date.now(),progress:n};this.data.unlocked[t]=o,this.saveData(),this.triggerUnlockCallbacks({achievement:r,unlockedAt:o.unlockedAt,progress:n});}isUnlocked(t){return !!this.data.unlocked[t]}getAchievement(t){return this.achievements.get(t)||null}getAllAchievements(){return Array.from(this.achievements.values())}getAchievementsByCategory(t){return Array.from(this.achievements.values()).filter(n=>n.category===t)}getAchievementsByRarity(t){return Array.from(this.achievements.values()).filter(n=>n.rarity===t)}getUnlockedAchievements(){return Object.values(this.data.unlocked)}getLockedAchievements(){return Array.from(this.achievements.values()).filter(t=>!this.isUnlocked(t.id)&&!t.hidden)}getProgress(t){return this.data.progress[t]||null}getCompletionPercentage(){const t=this.achievements.size,n=Object.keys(this.data.unlocked).length;return t>0?Math.floor(n/t*100):0}getCompletionStats(){const t=this.achievements.size,n=Object.keys(this.data.unlocked).length,r=t-n,o=this.getCompletionPercentage();return {total:t,unlocked:n,locked:r,percentage:o}}onUnlock(t){return this.onUnlockCallbacks.push(t),()=>{const n=this.onUnlockCallbacks.indexOf(t);n!==-1&&this.onUnlockCallbacks.splice(n,1);}}onProgress(t){return this.onProgressCallbacks.push(t),()=>{const n=this.onProgressCallbacks.indexOf(t);n!==-1&&this.onProgressCallbacks.splice(n,1);}}triggerUnlockCallbacks(t){for(const n of this.onUnlockCallbacks)try{n(t);}catch(r){console.warn("[Achievements] Unlock callback error:",r);}}triggerProgressCallbacks(t){for(const n of this.onProgressCallbacks)try{n(t);}catch(r){console.warn("[Achievements] Progress callback error:",r);}}reset(){this.data={unlocked:{},progress:{}};for(const t of this.achievements.values())this.data.progress[t.id]={current:0,target:t.target,percentage:0};this.saveData();}exportData(){return JSON.stringify(this.data,null,2)}importData(t){try{const n=JSON.parse(t);return this.data=n,this.saveData(),!0}catch(n){return console.warn("[Achievements] Failed to import data:",n),false}}}let Mn=null;function Je(){return Mn||(Mn=new gv),Mn}function mv(){Mn&&(Mn=null);}let xr=false;const bd={init(){xr||(Je(),xr=true,console.log("✅ [MGAchievements] Initialized"));},isReady(){return xr},getManager(){return Je()},register:(...e)=>Je().register(...e),registerMany:(...e)=>Je().registerMany(...e),isUnlocked:(...e)=>Je().isUnlocked(...e),getAll:()=>Je().getAllAchievements(),getUnlocked:()=>Je().getUnlockedAchievements(),getStats:()=>Je().getCompletionStats(),checkAll:()=>Je().checkAllAchievements(),onUnlock:(...e)=>Je().onUnlock(...e),onProgress:(...e)=>Je().onProgress(...e),destroy(){mv(),xr=false;}},hv={enabled:true},xd=Le.ANTI_AFK,bv=["visibilitychange","blur","focus","focusout","pagehide","freeze","resume"],xv=25e3,yv=1,vv=1e-5,ie={listeners:[],savedProps:{hidden:void 0,visibilityState:void 0,hasFocus:null},audioCtx:null,oscillator:null,gainNode:null,heartbeatInterval:null};function wv(){const e=(t,n)=>{const r=o=>{o.stopImmediatePropagation(),o.preventDefault?.();};t.addEventListener(n,r,{capture:true}),ie.listeners.push({type:n,handler:r,target:t});};for(const t of bv)e(document,t),e(window,t);}function Sv(){for(const{type:e,handler:t,target:n}of ie.listeners)try{n.removeEventListener(e,t,{capture:!0});}catch{}ie.listeners.length=0;}function kv(){const e=Object.getPrototypeOf(document);ie.savedProps.hidden=Object.getOwnPropertyDescriptor(e,"hidden"),ie.savedProps.visibilityState=Object.getOwnPropertyDescriptor(e,"visibilityState"),ie.savedProps.hasFocus=document.hasFocus?document.hasFocus.bind(document):null;try{Object.defineProperty(e,"hidden",{configurable:!0,get:()=>!1});}catch{}try{Object.defineProperty(e,"visibilityState",{configurable:!0,get:()=>"visible"});}catch{}try{document.hasFocus=()=>!0;}catch{}}function Cv(){const e=Object.getPrototypeOf(document);try{ie.savedProps.hidden&&Object.defineProperty(e,"hidden",ie.savedProps.hidden);}catch{}try{ie.savedProps.visibilityState&&Object.defineProperty(e,"visibilityState",ie.savedProps.visibilityState);}catch{}try{ie.savedProps.hasFocus&&(document.hasFocus=ie.savedProps.hasFocus);}catch{}}function eo(){ie.audioCtx&&ie.audioCtx.state!=="running"&&ie.audioCtx.resume?.().catch(()=>{});}function Tv(){try{const e=window.AudioContext||window.webkitAudioContext;ie.audioCtx=new e({latencyHint:"interactive"}),ie.gainNode=ie.audioCtx.createGain(),ie.gainNode.gain.value=vv,ie.oscillator=ie.audioCtx.createOscillator(),ie.oscillator.frequency.value=yv,ie.oscillator.connect(ie.gainNode).connect(ie.audioCtx.destination),ie.oscillator.start(),document.addEventListener("visibilitychange",eo,{capture:!0}),window.addEventListener("focus",eo,{capture:!0});}catch{yd();}}function yd(){try{ie.oscillator?.stop();}catch{}try{ie.oscillator?.disconnect(),ie.gainNode?.disconnect();}catch{}try{ie.audioCtx?.close?.();}catch{}document.removeEventListener("visibilitychange",eo,{capture:true}),window.removeEventListener("focus",eo,{capture:true}),ie.oscillator=null,ie.gainNode=null,ie.audioCtx=null;}function Pv(){const e=document.querySelector("canvas")||document.body||document.documentElement;ie.heartbeatInterval=window.setInterval(()=>{try{e.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:1,clientY:1}));}catch{}},xv);}function Av(){ie.heartbeatInterval!==null&&(clearInterval(ie.heartbeatInterval),ie.heartbeatInterval=null);}function Ho(){kv(),wv(),Tv(),Pv();}function Wo(){Av(),yd(),Sv(),Cv();}let yr=false,Ge=false;function Gt(){return Pe(xd,hv)}function Uo(e){Oe(xd,e);}const Mt={init(){if(yr)return;const e=Gt();yr=true,e.enabled?(Ho(),Ge=true,console.log("[MGAntiAfk] Initialized and started")):console.log("[MGAntiAfk] Initialized but disabled");},isReady(){return yr},isRunning(){return Ge},isEnabled(){return Gt().enabled},enable(){const e=Gt();e.enabled=true,Uo(e),Ge||(Ho(),Ge=true,console.log("[MGAntiAfk] Enabled"));},disable(){const e=Gt();e.enabled=false,Uo(e),Ge&&(Wo(),Ge=false,console.log("[MGAntiAfk] Disabled"));},toggle(){Mt.isEnabled()?Mt.disable():Mt.enable();},getConfig(){return Gt()},updateConfig(e){const n={...Gt(),...e};Uo(n),n.enabled&&!Ge?(Ho(),Ge=true):!n.enabled&&Ge&&(Wo(),Ge=false);},destroy(){Ge&&(Wo(),Ge=false),yr=false,console.log("[MGAntiAfk] Destroyed");}},vd=Le.PET_TEAM,_v={enabled:false,teams:[],activeTeamId:null},Li=3,Ds=50,_e="";function Ie(){return Pe(vd,_v)}function Dt(e){Oe(vd,e);}function Iv(e){const n={...Ie(),...e};return Dt(n),n}function Ev(){return Ie().enabled}function Mv(e){Iv({enabled:e});}function Lv(){return crypto.randomUUID()}function _a(){return Date.now()}function wd(e=[]){const t=[...e];for(;t.length<Li;)t.push(_e);return [t[0]||_e,t[1]||_e,t[2]||_e]}function Sd(e,t){const n=Ie(),r=e.trim();return r?!n.teams.some(o=>o.name.trim()===r&&o.id!==t):false}function kd(e,t){const n=Ie();if(!e.some(a=>a!==_e))return  true;const o=[...e].sort().join(",");return !n.teams.some(a=>a.id===t?false:[...a.petIds].sort().join(",")===o)}function Cd(e){const n=sn().get(),r=new Set(n.all.map(a=>a.id)),o=Ie();for(const a of o.teams)for(const i of a.petIds)i!==_e&&r.add(i);for(const a of e)if(a!==_e&&!r.has(a))return  false;return  true}function Td(e){const n=sn().get(),r=new Map(n.all.map(a=>[a.id,a])),o=[];for(const a of e.petIds){if(a===_e)continue;const i=r.get(a);i&&o.push(i);}return o}function Fv(e){return e.petIds.every(t=>t!==_e)}function Rv(e){const t=[];for(let n=0;n<Li;n++)e.petIds[n]===_e&&t.push(n);return t}function Nv(e){return e.petIds.filter(t=>t!==_e).length}function Ov(e){return e.petIds.every(t=>t===_e)}function Bv(e,t){return e.petIds.includes(t)}function $v(e,t){return e.petIds.indexOf(t)}function Dv(e,t=[]){const n=Ie();if(n.teams.length>=Ds)throw new Error(`Maximum number of teams (${Ds}) reached`);if(!Sd(e))throw new Error(`Team name "${e}" already exists`);const r=e.trim();if(!r)throw new Error("Team name cannot be empty");const o=wd(t);if(!Cd(o))throw new Error("One or more pet IDs do not exist");if(!kd(o))throw new Error("A team with this exact composition already exists");const a={id:Lv(),name:r,petIds:o,createdAt:_a(),updatedAt:_a()};return n.teams.push(a),Dt(n),a}function Pd(e,t){const n=Ie(),r=n.teams.findIndex(i=>i.id===e);if(r===-1)return null;const o=n.teams[r];if(t.name!==void 0){const i=t.name.trim();if(!i)throw new Error("Team name cannot be empty");if(!Sd(i,e))throw new Error(`Team name "${i}" already exists`);t.name=i;}if(t.petIds!==void 0){const i=wd(t.petIds);if(!Cd(i))throw new Error("One or more pet IDs do not exist");if(!kd(i,e))throw new Error("A team with this exact composition already exists");t.petIds=i;}const a={...o,...t,id:o.id,createdAt:o.createdAt,updatedAt:_a()};return n.teams[r]=a,Dt(n),a}function zv(e){const t=Ie(),n=t.teams.length;return t.teams=t.teams.filter(r=>r.id!==e),t.teams.length===n?false:(Dt(t),true)}function Gv(e){return Ie().teams.find(n=>n.id===e)??null}function jv(){return [...Ie().teams]}function Hv(e){const t=Ie(),n=e.trim();return t.teams.find(r=>r.name.trim()===n)??null}function Wv(e){const t=Ie(),n=new Map(t.teams.map(r=>[r.id,r]));if(e.length!==t.teams.length)return  false;for(const r of e)if(!n.has(r))return  false;return t.teams=e.map(r=>n.get(r)),Dt(t),true}function Uv(e,t){try{return Pd(e,{name:t})!==null}catch(n){return console.warn(`[PetTeam] Failed to rename team ${e}:`,n),false}}function Vv(){const n=sn().get().byLocation.active.map(o=>o.id).sort(),r=Ie();for(const o of r.teams){const a=o.petIds.filter(i=>i!=="").sort();if(a.length===n.length&&a.every((i,s)=>i===n[s]))return o.id}return null}function Ad(){const e=Vv(),t=Ie();return e!==t.activeTeamId&&(t.activeTeamId=e,Dt(t)),e}function _d(e){const t=Ie();t.activeTeamId=e,Dt(t);}function Xv(e){return Ad()===e}function Kv(e){const t=sn(),n=$t(),r=t.get();if(n.get().isFull)throw new Error("Cannot activate team: inventory is full");const a=r.byLocation.active,i=e.petIds.filter(l=>l!==_e).sort(),s=a.map(l=>l.id).sort();if(JSON.stringify(i)===JSON.stringify(s)){console.log("[PetTeam] Team already active");return}const c=r.hutch,d=c.hasHutch?c.maxItems-c.currentItems:0;Yv(e.petIds,d,r),_d(e.id),console.log("[PetTeam] Team activated successfully");}function Yv(e,t,n){const r=n.byLocation.active;let o=t;console.log(`[PetTeam] Starting swap with ${t} hutch spaces available`);for(let a=0;a<Li;a++){const i=e[a],s=r[a]??null;if(console.log(`[PetTeam] Slot ${a}: current=${s?.id.slice(0,8)??"empty"}, target=${i.slice(0,8)||"empty"}, hutchSpace=${o}`),s?.id===i){console.log(`[PetTeam] Slot ${a}: Same pet, skipping`);continue}if(i===_e&&s){const c=o>0;console.log(`[PetTeam] Slot ${a}: Removing pet, storeInHutch=${c}`),qv(s.id,c),c&&o--;continue}if(!s&&i!==_e){const d=n.all.find(l=>l.id===i)?.location==="hutch";console.log(`[PetTeam] Slot ${a}: Adding pet, fromHutch=${d}`),d&&o++,Jv(i,n);continue}if(s&&i!==_e){const d=n.all.find(u=>u.id===i)?.location==="hutch";d&&o++;const l=o>0;console.log(`[PetTeam] Slot ${a}: Swapping pets, fromHutch=${d}, storeInHutch=${l}`),Qv(s.id,i,n,l),l&&o--;continue}}console.log(`[PetTeam] Swap complete, ${o} hutch spaces remaining`);}function qv(e,t){nd(e),t&&Pi(e);}function Jv(e,t){const n=t.all.find(r=>r.id===e);if(!n){console.warn(`[PetTeam] Pet ${e} not found`);return}n.location==="hutch"&&Ai(e),ed(e);}function Qv(e,t,n,r){const o=n.all.find(a=>a.id===t);if(!o){console.warn(`[PetTeam] Pet ${t} not found`);return}o.location==="hutch"&&Ai(t),td(e,t),r&&Pi(e);}let vr=false;const ce={init(){if(vr)return;if(!Ie().enabled){console.log("[PetTeam] Feature disabled");return}vr=true,console.log("[PetTeam] Feature initialized");},destroy(){vr&&(vr=false,console.log("[PetTeam] Feature destroyed"));},isEnabled:Ev,setEnabled:Mv,createTeam:Dv,updateTeam:Pd,deleteTeam:zv,renameTeam:Uv,getTeam:Gv,getAllTeams:jv,getTeamByName:Hv,reorderTeams:Wv,getPetsForTeam:Td,isTeamFull:Fv,getEmptySlots:Rv,getFilledSlotCount:Nv,isTeamEmpty:Ov,isPetInTeam:Bv,getPetSlotIndex:$v,getActiveTeamId:Ad,setActiveTeamId:_d,isActiveTeam:Xv,activateTeam:Kv},Zv=["PetXpBoost","PetXpBoostII","PetXpBoostIII","SnowyPetXpBoost"],Id=Le.XP_TRACKER,e0={enabled:false,sortBy:"closestToMax",filterSpecies:[],filterHasXpBoost:false,updateIntervalMs:3e3,isPoppedOut:false,popOutPosition:null,collapsedSections:{activePets:false,allPets:false,xpBoostSummary:false}},Yt="XP Tracker",qt="[XpTracker]";function cn(){return Pe(Id,e0)}function Ed(e){Oe(Id,e);}function Md(e){const n={...cn(),...e};return Ed(n),n}function Ld(){return cn().enabled}function t0(e){Md({enabled:e});}function Fi(e){return Zv.includes(e)}function n0(e){const t=oe.get("abilities");if(!t)return null;const n=t[e];return !n||!Fi(e)?null:{id:e,name:n.name??"XP Boost",baseProbability:n.baseProbability??0,bonusXp:n.baseParameters?.bonusXp??0,requiredWeather:n.baseParameters?.requiredWeather??null}}function Fd(e){return e.filter(Fi)}function Rd(e){return e.some(Fi)}function r0(e){switch(e){case "PetXpBoost":return "I";case "PetXpBoostII":return "II";case "PetXpBoostIII":return "III";case "SnowyPetXpBoost":return "Snowy";default:return "I"}}function Nd(e,t,n){const r=n0(e);if(!r)return null;const o=r0(e),a=r.requiredWeather,i=a===null||n===a,s=t/ya,c=s*s,d=r.baseProbability,l=r.bonusXp,u=d,p=Math.floor(l*c),f=u/100*60,g=i?Math.floor(f*p):0;return {abilityId:e,abilityName:r.name,tier:o,baseChancePerMinute:d,actualChancePerMinute:u,baseXpPerProc:l,actualXpPerProc:p,expectedProcsPerHour:f,expectedXpPerHour:g,requiredWeather:a,isActive:i}}function Od(e,t){const n={totalBonusXpPerHour:0,totalProcsPerHour:0,activeBoosterCount:0,boosters:[]};for(const r of e){const o=Fd(r.abilities);for(const a of o){const i=Nd(a,r.strength,t);i&&(n.boosters.push({petId:r.petId,petName:r.petName,stats:i}),i.isActive&&(n.totalBonusXpPerHour+=i.expectedXpPerHour,n.totalProcsPerHour+=i.expectedProcsPerHour,n.activeBoosterCount++));}}return n}function Bd(e,t,n){const r=Fd(e);return r.length===0?null:Nd(r[0],t,n)}function zs(e,t){return e.hoursToMaxStrength-t.hoursToMaxStrength}function o0(e,t){return t.hoursToMaxStrength-e.hoursToMaxStrength}function a0(e,t){return e.species.localeCompare(t.species)}function i0(e,t){return t.currentStrength-e.currentStrength}function s0(e,t){const n={active:0,inventory:1,hutch:2};return n[e.location]-n[t.location]}function l0(e,t){return e.name.localeCompare(t.name)}function c0(e){switch(e){case "closestToMax":return zs;case "furthestFromMax":return o0;case "species":return a0;case "strength":return i0;case "location":return s0;case "name":return l0;default:return zs}}function $d(e,t){const n=c0(t);return [...e].sort(n)}function d0(e,t){return t.length===0?e:e.filter(n=>t.includes(n.species))}function u0(e,t){return t?e.filter(n=>n.xpBoostStats!==null):e}function Dd(e,t){let n=e;return n=d0(n,t.filterSpecies),n=u0(n,t.filterHasXpBoost),n=$d(n,t.sortBy),n}function wr(e){const t=ce.getTeam(e);if(!t)return null;const n=zd(t);if(n.length===0)return {teamId:t.id,teamName:t.name,pets:[],teamSummary:{baseXpPerHour:we,bonusXpPerHour:0,totalXpPerHour:we,activeBoosterCount:0,totalProcsPerHour:0}};const r=ye.weather.get(),o=r.isActive?r.type:null,a=n.filter(l=>!l.isMature||Rd(l.abilities)).filter(l=>l.hunger>0).map(l=>({petId:l.id,petName:l.name??"",abilities:l.abilities,strength:l.currentStrength})),i=Od(a,o),s=[],c=p0(n,i.totalBonusXpPerHour);for(const l of n){const u=Gd(l,o,i.totalBonusXpPerHour,c);s.push(u);}const d={baseXpPerHour:we,bonusXpPerHour:i.totalBonusXpPerHour,totalXpPerHour:we+i.totalBonusXpPerHour,activeBoosterCount:i.activeBoosterCount,totalProcsPerHour:i.totalProcsPerHour};return {teamId:t.id,teamName:t.name,pets:s,teamSummary:d}}function zd(e){const t=ye.myPets.get(),n=[];for(const r of e.petIds){if(!r)continue;const o=t.all.find(a=>a.id===r);o&&n.push(o);}return n}function p0(e,t){let n=0;for(const r of e){const o=Kn(r.petSpecies,r.targetScale);if(Yn(r.petSpecies,r.xp,o)>=o)continue;const i=r.hunger>0?we+t:0,s=mo(r.petSpecies,r.xp,o,i>0?i:we);n=Math.max(n,s);}return n}function Gd(e,t,n,r){const o=Kn(e.petSpecies,e.targetScale),a=Yn(e.petSpecies,e.xp,o),i=a>=o,s=e.hunger<=0,d=s?0:(s?0:we)+n,l=Bd(e.abilities,a,t),u=i?null:xi(e.petSpecies,e.xp,a,o,d>0?d:we),p=mo(e.petSpecies,e.xp,o,d>0?d:we),f=u!==null?wi(e.petSpecies,e.hunger,u):null,g=zn(e.petSpecies,e.hunger,p),m=i&&l&&r>0?Si(true,true,e.petSpecies,e.hunger,0,r):null;return {id:e.id,name:e.name??"",species:e.petSpecies,currentStrength:a,maxStrength:o,isMaxStrength:i,xpPerHour:d,hoursToNextStrength:u,hoursToMaxStrength:p,feedsToNextStrength:f,feedsToMaxStrength:g,isStarving:s,hunger:e.hunger,xpBoostStats:l,supportingFeeds:m,mutations:e.mutations,targetScale:e.targetScale}}function f0(e){const t=ce.getTeam(e);if(!t)return 0;const n=zd(t);if(n.length===0)return 0;const r=n.map(o=>{const a=Kn(o.petSpecies,o.targetScale);return Yn(o.petSpecies,o.xp,a)/a*100});return r.reduce((o,a)=>o+a,0)/r.length}function Gs(e){if(!isFinite(e)||e<=0)return "0m";if(e<1)return `${Math.ceil(e*60)}m`;if(e<24)return `${e.toFixed(1)}h`;{const t=Math.floor(e/24),n=Math.floor(e%24);return `${t}d ${n}h`}}let nn=false,zr=null,vo=[],Ri=null;function g0(e,t,n){const r=Kn(e.petSpecies,e.targetScale),o=Yn(e.petSpecies,e.xp,r),a=o>=r,i=e.hunger<=0,s=i?0:we,c=Bd(e.abilities,o,t);c?.isActive&&c.expectedXpPerHour;const d=e.location==="active"&&!i?s+n:0,l=xi(e.petSpecies,e.xp,o,r,d>0?d:we),u=mo(e.petSpecies,e.xp,r,d>0?d:we),p=wi(e.petSpecies,e.hunger,l),f=zn(e.petSpecies,e.hunger,u);return {id:e.id,species:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,location:e.location,isStarving:i,currentStrength:o,maxStrength:r,isMaxStrength:a,hoursToNextStrength:l,hoursToMaxStrength:u,feedsToNextStrength:p,feedsToMaxStrength:f,baseXpPerHour:s,totalXpPerHour:d,xpBoostStats:c,targetScale:e.targetScale,abilities:e.abilities,mutations:e.mutations}}function jd(){const e=ye.myPets.get(),t=ye.weather.get(),n=t.isActive?t.type:null,o=e.byLocation.active.filter(c=>!c.isMature||Rd(c.abilities)).filter(c=>c.hunger>0).map(c=>({petId:c.id,petName:c.name??"",abilities:c.abilities,strength:c.currentStrength})),a=Od(o,n);Ri=a;const i=[];for(const c of e.all){const d=g0({id:c.id,petSpecies:c.petSpecies,name:c.name??"",xp:c.xp,hunger:c.hunger,targetScale:c.targetScale,abilities:c.abilities,mutations:c.mutations,location:c.location},n,a.totalBonusXpPerHour);i.push(d);}const s=Math.max(0,...i.map(c=>c.hoursToMaxStrength));for(const c of i)c.isMaxStrength&&c.xpBoostStats&&(c.feedsToMaxStrength=Si(true,true,c.species,c.hunger,0,s));return i}function Hd(){if(nn)return;if(!cn().enabled){console.log(`${qt} ${Yt} disabled`);return}console.log(`${qt} Initializing ${Yt}...`),oe.isReady()&&(vo=jd()),nn=true,console.log(`${qt} ${Yt} initialized`);}function Ni(){return nn&&oe.isReady()}function Oi(){return Ni()?vo:[]}function m0(){return Oi().filter(e=>e.location==="active")}function h0(){return Ri}function Bi(){Ni()&&(vo=jd());}function b0(e){$i();const t=cn(),n=e??t.updateIntervalMs;zr=setInterval(()=>{Ld()&&Bi();},n);}function $i(){zr&&(clearInterval(zr),zr=null);}function Wd(){nn&&($i(),nn=false,vo=[],Ri=null,console.log(`${qt} ${Yt} destroyed`));}function x0(){const e=cn();return Dd(Oi(),{sortBy:e.sortBy,filterSpecies:e.filterSpecies,filterHasXpBoost:e.filterHasXpBoost})}function y0(e){t0(e),e?(nn=false,Hd(),oe.isReady()&&Bi(),console.log(`${qt} ${Yt} enabled`)):(Wd(),console.log(`${qt} ${Yt} disabled`));}const Gn={init:Hd,isReady:Ni,destroy:Wd,loadConfig:cn,saveConfig:Ed,updateConfig:Md,isEnabled:Ld,setEnabled:y0,getAllPetsProgress:Oi,getActivePetsProgress:m0,getCombinedBoostStats:h0,getFilteredPets:x0,refresh:Bi,startAutoUpdate:b0,stopAutoUpdate:$i,sortPets:$d,filterAndSortPets:Dd},jn={EggGrowthBoost:{procRate:.21,minutesPerProc:7},EggGrowthBoostII_NEW:{procRate:.24,minutesPerProc:9},EggGrowthBoostII:{procRate:.27,minutesPerProc:11},SnowyEggGrowthBoost:{procRate:.35,minutesPerProc:10}},Hn={PlantGrowthBoost:{procRate:.24,minutesPerProc:3},PlantGrowthBoostII:{procRate:.27,minutesPerProc:5},PlantGrowthBoostIII:{procRate:.3,minutesPerProc:7},SnowyPlantGrowthBoost:{procRate:.4,minutesPerProc:6}};[...Object.keys(jn),...Object.keys(Hn)];function v0(e){const t=[];for(const n of e)for(const r of n.abilities)if(r in jn){const o=jn[r];t.push({petId:n.id,petName:n.name||n.petSpecies,abilityId:r,procRate:o.procRate,minutesPerProc:o.minutesPerProc});}return t}function w0(e){const t=[];for(const n of e)for(const r of n.abilities)if(r in Hn){const o=Hn[r];t.push({petId:n.id,petName:n.name||n.petSpecies,abilityId:r,procRate:o.procRate,minutesPerProc:o.minutesPerProc});}return t}function js(e){let t=0,n=0;for(const r of e){const o=r.procRate*60;t+=o,n+=o*r.minutesPerProc;}return {procsPerHour:t,timeReductionPerHour:n}}function Ia(e){return e.some(t=>t.abilities.some(n=>n in jn))}function Ea(e){return e.some(t=>t.abilities.some(n=>n in Hn))}class Ud{constructor(){D(this,"stats");D(this,"STORAGE_KEY",Le.TRACKER_STATS);this.stats=this.loadStats(),this.startSession();}loadStats(){return Pe(this.STORAGE_KEY,this.getDefaultStats())}saveStats(){Oe(this.STORAGE_KEY,this.stats);}getDefaultStats(){return {session:{sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},allTime:{totalSessions:0,totalPlayTime:0,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0,crops:{},pets:{}}}}startSession(){this.stats.session={sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},this.stats.allTime.totalSessions++,this.saveStats();}endSession(){this.stats.session.sessionEnd=Date.now();const t=this.stats.session.sessionEnd-this.stats.session.sessionStart;this.stats.allTime.totalPlayTime+=t,this.saveStats();}recordHarvest(t,n=1,r=[]){this.stats.session.cropsHarvested+=n,this.stats.allTime.cropsHarvested+=n,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].harvested+=n;for(const o of r)this.stats.allTime.crops[t].mutations[o]||(this.stats.allTime.crops[t].mutations[o]=0),this.stats.allTime.crops[t].mutations[o]++;this.saveStats();}recordCropSale(t,n=1,r=0){this.stats.session.cropsSold+=n,this.stats.session.coinsEarned+=r,this.stats.allTime.cropsSold+=n,this.stats.allTime.coinsEarned+=r,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].sold+=n,this.stats.allTime.crops[t].totalValue+=r,this.saveStats();}recordPetHatch(t,n=[],r=[]){this.stats.session.petsHatched++,this.stats.allTime.petsHatched++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].hatched++;for(const o of n)this.stats.allTime.pets[t].mutations[o]||(this.stats.allTime.pets[t].mutations[o]=0),this.stats.allTime.pets[t].mutations[o]++;for(const o of r)this.stats.allTime.pets[t].abilities[o]||(this.stats.allTime.pets[t].abilities[o]=0),this.stats.allTime.pets[t].abilities[o]++;this.saveStats();}recordPetSale(t,n=0){this.stats.session.petsSold++,this.stats.session.coinsEarned+=n,this.stats.allTime.petsSold++,this.stats.allTime.coinsEarned+=n,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].sold++,this.saveStats();}recordPetFeed(t){this.stats.session.petsFed++,this.stats.allTime.petsFed++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].fed++,this.saveStats();}recordSeedPurchase(t,n=1,r=0){this.stats.session.seedsPurchased+=n,this.stats.session.coinsSpent+=r,this.stats.allTime.seedsPurchased+=n,this.stats.allTime.coinsSpent+=r,this.saveStats();}recordEggPurchase(t,n=1,r=0){this.stats.session.eggsPurchased+=n,this.stats.session.coinsSpent+=r,this.stats.allTime.eggsPurchased+=n,this.stats.allTime.coinsSpent+=r,this.saveStats();}recordAbilityProc(t){this.stats.session.abilityProcs++,this.stats.allTime.abilityProcs++,this.saveStats();}recordCoinsEarned(t){this.stats.session.coinsEarned+=t,this.stats.allTime.coinsEarned+=t,this.saveStats();}recordCoinsSpent(t){this.stats.session.coinsSpent+=t,this.stats.allTime.coinsSpent+=t,this.saveStats();}getStats(){return {...this.stats}}getSessionStats(){return {...this.stats.session}}getAllTimeStats(){return {...this.stats.allTime}}getCropStats(t){return this.stats.allTime.crops[t]||null}getPetStats(t){return this.stats.allTime.pets[t]||null}getTopCrops(t=10){return Object.entries(this.stats.allTime.crops).map(([n,r])=>({species:n,stats:r})).sort((n,r)=>r.stats.harvested-n.stats.harvested).slice(0,t)}getTopPets(t=10){return Object.entries(this.stats.allTime.pets).map(([n,r])=>({species:n,stats:r})).sort((n,r)=>r.stats.hatched-n.stats.hatched).slice(0,t)}resetSession(){this.startSession();}resetAll(){this.stats=this.getDefaultStats(),this.saveStats();}exportStats(){return JSON.stringify(this.stats,null,2)}importStats(t){try{const n=JSON.parse(t);return this.stats=n,this.saveStats(),!0}catch(n){return console.warn("[StatsTracker] Failed to import stats:",n),false}}}let Jt=null;function S0(){return Jt||(Jt=new Ud),Jt}function k0(){Jt&&(Jt.endSession(),Jt=null);}function Vd(e){const t=uo(e.xp),n=po(e.petSpecies,e.targetScale),r=fo(e.petSpecies,e.xp,n),o=go(e.petSpecies,t),a=zc(e.petSpecies),i=_b(r,n,a),s=Ib(r,n);return {current:r,max:n,progress:s,age:t,isMature:o,strengthPerHour:a,hoursToMax:i}}function Xd(e){return {...e,strength:Vd(e)}}function Kd(e){return e.map(Xd)}function C0(e){if(e.length===0)return {averageCurrent:0,averageMax:0,totalMature:0,totalImmature:0,strongestPet:null,weakestPet:null};const t=Kd(e),n=t.reduce((c,d)=>c+d.strength.current,0),r=t.reduce((c,d)=>c+d.strength.max,0),o=t.filter(c=>c.strength.isMature).length,a=t.length-o,i=t.reduce((c,d)=>d.strength.max>(c?.strength.max||0)?d:c,t[0]),s=t.reduce((c,d)=>d.strength.max<(c?.strength.max||1/0)?d:c,t[0]);return {averageCurrent:Math.round(n/t.length),averageMax:Math.round(r/t.length),totalMature:o,totalImmature:a,strongestPet:i,weakestPet:s}}const T0=Object.freeze(Object.defineProperty({__proto__:null,calculatePetStrength:Vd,enrichPetWithStrength:Xd,enrichPetsWithStrength:Kd,getPetStrengthStats:C0},Symbol.toStringTag,{value:"Module"}));class Yd{constructor(){D(this,"logs",[]);D(this,"maxLogs",1e3);D(this,"unsubscribe",null);D(this,"isInitialized",false);}init(){this.isInitialized||(this.unsubscribe=ye.myPets.subscribeAbility(t=>{this.log({abilityId:t.trigger.abilityId||"unknown",petId:t.pet.id,petSpecies:t.pet.petSpecies,petName:t.pet.name,timestamp:t.trigger.performedAt||Date.now()});}),this.isInitialized=true);}log(t){const n={...t,id:`${t.timestamp}-${Math.random().toString(36).substr(2,9)}`};this.logs.push(n),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs));}getLogs(t){let n=this.logs;t?.abilityId&&(n=n.filter(o=>o.abilityId===t.abilityId)),t?.petId&&(n=n.filter(o=>o.petId===t.petId)),t?.petSpecies&&(n=n.filter(o=>o.petSpecies===t.petSpecies));const{since:r}=t??{};return r!==void 0&&(n=n.filter(o=>o.timestamp>=r)),t?.limit&&(n=n.slice(-t.limit)),n}getStats(t=36e5){const n=Date.now()-t,r=this.logs.filter(a=>a.timestamp>=n),o=new Map;for(const a of r){o.has(a.abilityId)||o.set(a.abilityId,{abilityId:a.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});const i=o.get(a.abilityId);i.count++,(!i.lastProc||a.timestamp>i.lastProc)&&(i.lastProc=a.timestamp);}for(const a of o.values())a.procsPerMinute=a.count/t*6e4,a.procsPerHour=a.count/t*36e5;return o}getAbilityStats(t,n=36e5){return this.getStats(n).get(t)||null}getPetStats(t,n=36e5){const r=Date.now()-n,o=this.logs.filter(i=>i.petId===t&&i.timestamp>=r),a=new Map;for(const i of o){a.has(i.abilityId)||a.set(i.abilityId,{abilityId:i.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});const s=a.get(i.abilityId);s.count++,(!s.lastProc||i.timestamp>s.lastProc)&&(s.lastProc=i.timestamp);}for(const i of a.values())i.procsPerMinute=i.count/n*6e4,i.procsPerHour=i.count/n*36e5;return {totalProcs:o.length,abilities:a}}getTopAbilities(t=10,n=36e5){return Array.from(this.getStats(n).values()).sort((o,a)=>a.count-o.count).slice(0,t)}clear(){this.logs=[];}setMaxLogs(t){this.maxLogs=t,this.logs.length>t&&(this.logs=this.logs.slice(-t));}getLogCount(){return this.logs.length}isActive(){return this.isInitialized}destroy(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null),this.logs=[],this.isInitialized=false;}}let _t=null;function P0(){return _t||(_t=new Yd,_t.init()),_t}function A0(){_t&&(_t.destroy(),_t=null);}const qd={StatsTracker:Ud,getStatsTracker:S0,destroyStatsTracker:k0},Jd={AbilityLogger:Yd,getAbilityLogger:P0,destroyAbilityLogger:A0,...T0},_0=Object.freeze(Object.defineProperty({__proto__:null,MGAchievements:bd,MGAntiAfk:Mt,MGAutoFavorite:_i,MGBulkFavorite:Zr,MGJournalChecker:fd,MGPetTeam:ce,MGPets:Jd,MGTracker:qd,MGXPTracker:Gn},Symbol.toStringTag,{value:"Module"})),Qe=[{id:"Rainbow",desc:"All Rainbow items"},{id:"Gold",desc:"All Gold items"},{id:"Wet",desc:"All Wet items"},{id:"Chilled",desc:"All Chilled items"},{id:"Frozen",desc:"All Frozen items"},{id:"Dawnlit",desc:"Dawn mutations"},{id:"Dawncharged",desc:"Dawn charged"},{id:"Ambershine",desc:"Amber mutations"},{id:"Ambercharged",desc:"Amber charged"}],I0={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function jt(e){return e?I0[e]??0:0}class E0 extends rn{constructor(){super({id:"tab-auto-favorite",label:"Auto-Favorite"});D(this,"allPlants",[]);D(this,"allPets",[]);D(this,"sectionElement",null);}async build(n){await Kb();const r=n.getRootNode();Re(r,Wc,"auto-favorite-settings-styles");const o=this.createGrid("12px");o.id="auto-favorite-settings",this.sectionElement=o,n.appendChild(o),await this.loadGameData(),await this.waitForSprites(),this.renderContent();}async loadGameData(){try{await oe.waitForAny(3e3).catch(()=>{}),await Promise.all([oe.waitFor("plants",3e3).catch(()=>console.warn("[AutoFavorite UI] Still waiting for plants data...")),oe.waitFor("pets",3e3).catch(()=>console.warn("[AutoFavorite UI] Still waiting for pets data..."))]);const n=oe.get("plants")||{},r=oe.get("pets")||{};this.allPlants=Object.keys(n).sort((o,a)=>{const i=n[o]?.seed?.rarity||null,s=n[a]?.seed?.rarity||null,c=jt(i)-jt(s);return c!==0?c:o.localeCompare(a,void 0,{numeric:!0,sensitivity:"base"})}),this.allPets=Object.keys(r).sort((o,a)=>{const i=r[o]?.rarity||null,s=r[a]?.rarity||null,c=jt(i)-jt(s);return c!==0?c:o.localeCompare(a,void 0,{numeric:!0,sensitivity:"base"})});}catch(n){console.error("[AutoFavorite UI] Failed to load game data:",n);}}async waitForSprites(){if(V.isReady())return;const n=1e4,r=100;let o=0;return new Promise(a=>{const i=()=>{V.isReady()||o>=n?a():(o+=r,setTimeout(i,r));};i();})}renderContent(){this.sectionElement&&(this.sectionElement.innerHTML="",this.sectionElement.appendChild(this.createMasterToggle()),this.sectionElement.appendChild(this.createMutationsCard()),this.sectionElement.appendChild(this.createProduceCard()),this.sectionElement.appendChild(this.createPetsCard()));}createMasterToggle(){const n=b("div",{className:"kv"}),r=Da({text:"Enable Auto-Favorite",tone:"default",size:"lg"}),o=Ha({checked:qe().get().enabled,onChange:async a=>{const i=qe(),s=i.get();await i.set({...s,enabled:a}),await this.saveConfig();}});return n.append(r.root,o.root),Ke({title:"Auto-Favorite",padding:"lg"},n,b("p",{style:"margin-top: 6px; font-size: 12px; color: var(--muted);"},"Automatically favorite items when added to inventory"))}createMutationsCard(){const n=b("div",{className:"u-col"}),r=b("div",{className:"mut-row"});r.appendChild(this.createMutationButton(Qe[0])),r.appendChild(this.createMutationButton(Qe[1])),n.appendChild(r);const o=b("div",{className:"mut-row"});o.appendChild(this.createMutationButton(Qe[2])),o.appendChild(this.createMutationButton(Qe[3])),o.appendChild(this.createMutationButton(Qe[4])),n.appendChild(o);const a=b("div",{className:"mut-row"});a.appendChild(this.createMutationButton(Qe[5])),a.appendChild(this.createMutationButton(Qe[6])),n.appendChild(a);const i=b("div",{className:"mut-row"});return i.appendChild(this.createMutationButton(Qe[7])),i.appendChild(this.createMutationButton(Qe[8])),n.appendChild(i),Ke({title:"Mutations Priority",variant:"soft",padding:"lg",expandable:true,defaultExpanded:true},n,b("p",{style:"margin-top: 8px; font-size: 11px; color: var(--muted);"},`${qe().get().favoriteMutations.length} / ${Qe.length} active`))}createMutationButton(n){let r=qe().get().favoriteMutations.includes(n.id);const a=["mut-btn",`mut-btn--${n.id.toLowerCase()}`];r&&a.push("active");const i=b("div",{className:a.join(" ")}),s=b("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(V.isReady()){const l=V.toCanvas("plant","Sunflower",{mutations:[n.id],scale:.16});l.style.width="28px",l.style.height="28px",l.style.objectFit="contain",s.appendChild(l);}}catch{}const c=n.id.charAt(0).toUpperCase()+n.id.slice(1).toLowerCase(),d=b("div",{style:"font-size: 13px; font-weight: 600; color: var(--fg); text-shadow: 0 1px 2px rgba(0,0,0,0.5); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"},c);if(i.append(s,d),n.id==="Rainbow"||n.id==="Gold"){const l=b("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(V.isReady()){const u=V.toCanvas("pet","Capybara",{mutations:[n.id],scale:.16});u.style.width="28px",u.style.height="28px",u.style.objectFit="contain",l.appendChild(u);}}catch{}i.append(l);}else {const l=b("div",{style:"width: 28px; flex-shrink: 0;"});i.append(l);}return i.addEventListener("click",async l=>{l.stopPropagation();const u=qe(),p=u.get();if(r){const g=p.favoriteMutations.filter(m=>m!==n.id);await u.set({...p,favoriteMutations:g}),r=false,i.classList.remove("active");}else {const g=[...p.favoriteMutations,n.id];await u.set({...p,favoriteMutations:g}),r=true,i.classList.add("active");}await this.saveConfig();const f=this.sectionElement?.querySelector(".card p");f&&(f.textContent=`${qe().get().favoriteMutations.length} / ${Qe.length} active`);}),i}createProduceCard(){return this.createItemSelectionCard({title:"Produce",items:this.allPlants,category:"plant",selected:qe().get().favoriteProduceList,onUpdate:async n=>{const r=qe(),o=r.get();await r.set({...o,favoriteProduceList:n}),await this.saveConfig();}})}createPetsCard(){return this.createItemSelectionCard({title:"Pets",items:this.allPets,category:"pet",selected:qe().get().favoritePetsList,onUpdate:async n=>{const r=qe(),o=r.get();await r.set({...o,favoritePetsList:n}),await this.saveConfig();}})}createItemSelectionCard(n){const{title:r,items:o,category:a,selected:i,onUpdate:s}=n;let c=new Set(i),d=o;const l=b("div",{style:"margin-bottom: 8px;"}),u=Wa({placeholder:`Search ${r.toLowerCase()}...`,value:"",debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:y=>{const C=y.trim().toLowerCase();C?d=o.filter(T=>T.toLowerCase().includes(C)):d=o,v.setData(m());}});l.appendChild(u.root);const p=b("div",{style:"display: flex; gap: 8px; margin-bottom: 12px;"}),f=At({label:"Select All",variant:"default",size:"sm",onClick:()=>{const y=m().map(C=>C.id);v.setSelection(y);}}),g=At({label:"Deselect All",variant:"default",size:"sm",onClick:()=>{v.clearSelection();}});p.append(f,g);const m=()=>d.map(y=>({id:y,name:y,rarity:this.getItemRarity(y,a),selected:c.has(y)})),h=y=>{if(!y){const T=b("span",{style:"opacity:0.5;"});return T.textContent="—",T}return ho({variant:"rarity",rarity:y,size:"sm"}).root},x=y=>{const C=b("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0; background: color-mix(in oklab, var(--bg) 5%, transparent); border-radius: 6px;"});try{if(V.isReady()){let T=a,S=y;a==="plant"&&(["Bamboo","Cactus"].includes(y)&&(T="tallplant"),y==="DawnCelestial"&&(S="DawnCelestialCrop"),y==="MoonCelestial"&&(S="MoonCelestialCrop"),y==="OrangeTulip"&&(S="Tulip"));const A=V.toCanvas(T,S,{scale:.5});A.style.width="28px",A.style.height="28px",A.style.objectFit="contain",C.appendChild(A);}}catch{}return C},v=vl({columns:[{key:"name",header:"Name",width:"1fr",align:"center",sortable:true,sortFn:(y,C)=>y.name.localeCompare(C.name,void 0,{numeric:true,sensitivity:"base"}),render:y=>{const C=b("div",{style:"display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%;"}),T=x(y.id),S=b("span",{style:"font-weight: 500; color: var(--fg); white-space: nowrap;"},y.name);return C.append(T,S),C}},{key:"rarity",header:"Rarity",width:"100px",align:"center",sortable:true,sortFn:(y,C)=>jt(y.rarity)-jt(C.rarity),render:y=>h(y.rarity)}],data:m(),maxHeight:280,compact:true,zebra:true,animations:true,selectable:true,selectOnRowClick:true,hideHeaderCheckbox:true,initialSelection:Array.from(c),getRowId:y=>y.id,onSelectionChange:y=>{c.clear(),y.forEach(C=>c.add(C)),s(Array.from(c)),P();}}),w=b("p",{style:"margin-top: 8px; font-size: 11px; color: var(--muted);"}),P=()=>{w.textContent=`${c.size} / ${o.length} selected`;};return P(),Ke({title:`${r} (${c.size}/${o.length})`,variant:"soft",padding:"lg",expandable:true,defaultExpanded:false},l,p,v.root,w)}getItemRarity(n,r){try{if(r==="pet")return (oe.get("pets")||{})[n]?.rarity||null;if(r==="plant"){const o=oe.get("plants")||{},a=o[n];if(a?.seed?.rarity)return a.seed.rarity;const i=n.toLowerCase();for(const s of Object.values(o))if(s?.seed?.name?.toLowerCase()===i||s?.plant?.name?.toLowerCase()===i)return s.seed.rarity}}catch{}return null}async saveConfig(){const n=qe().get();try{const{updateSimpleConfig:r}=_i;await r({enabled:n.enabled,favoriteSpecies:[...n.favoriteProduceList,...n.favoritePetsList],favoriteMutations:n.favoriteMutations});}catch(r){console.error("[AutoFavoriteSettings] Failed to update feature config:",r);}}}function M0(e,t){const n=new MutationObserver(o=>{for(const a of o)for(const i of a.addedNodes){if(!(i instanceof Element))continue;i.matches(e)&&t(i);const s=i.querySelectorAll(e);for(const c of s)t(c);}});n.observe(document.body,{childList:true,subtree:true});const r=document.querySelectorAll(e);for(const o of r)t(o);return {disconnect:()=>n.disconnect()}}function L0(e,t){const n=new MutationObserver(r=>{for(const o of r)for(const a of o.removedNodes){if(!(a instanceof Element))continue;a.matches(e)&&t(a);const i=a.querySelectorAll(e);for(const s of i)t(s);}});return n.observe(document.body,{childList:true,subtree:true}),{disconnect:()=>n.disconnect()}}const Qd=768,Hs=6,Vo=62,Xo=50,F0=.5,R0=.4,Sr=36,kr=28,N0=6,Ma=4,O0=8,B0=100,$0=200,Ws=14,Us=3,D0=40,z0=50,Vs=2147483646,wn="gemini-bulk-favorite-sidebar",G0="gemini-bulk-favorite-top-row",j0="gemini-bulk-favorite-bottom-row",La="gemini-qol-bulkFavorite-styles",H0=`
/* Desktop: vertical scrollable list next to inventory */
#${wn} {
  display: flex;
  flex-direction: column;
  gap: ${N0}px;
  pointer-events: auto;
  padding: 4px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.6);
  z-index: ${Vs};
  overflow-y: auto;
}

/* Mobile: horizontal scrollable rows */
.gemini-qol-bulkFavorite-row {
  display: flex;
  flex-direction: row;
  gap: ${Ma}px;
  pointer-events: auto;
  padding: 4px;
  position: fixed;
  z-index: ${Vs};
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

#${wn}::-webkit-scrollbar {
  width: 4px;
}

#${wn}::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}

#${wn}::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

/* Individual species button */
.gemini-qol-bulkFavorite-btn {
  position: relative;
  width: ${Vo}px;
  height: ${Vo}px;
  min-width: ${Vo}px;
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
  width: ${Xo}px;
  height: ${Xo}px;
  min-width: ${Xo}px;
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
  width: ${Sr}px;
  height: ${Sr}px;
  object-fit: contain;
  image-rendering: pixelated;
}

.gemini-qol-bulkFavorite-btn.mobile .gemini-qol-bulkFavorite-sprite {
  width: ${kr}px;
  height: ${kr}px;
}

/* Heart indicator */
.gemini-qol-bulkFavorite-heart {
  position: absolute;
  top: ${Us}px;
  right: ${Us}px;
  width: ${Ws}px;
  height: ${Ws}px;
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
  width: ${Sr}px;
  height: ${Sr}px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #fff;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 4px;
}

.gemini-qol-bulkFavorite-btn.mobile .gemini-qol-bulkFavorite-fallback {
  width: ${kr}px;
  height: ${kr}px;
  font-size: 14px;
}
`,W0='<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',U0='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';function V0(e){const{species:t,itemCount:n,isFavorited:r,isMobile:o,onClick:a}=e,i=b("button",{className:`gemini-qol-bulkFavorite-btn${o?" mobile":""}`,title:`${r?"Unfavorite":"Favorite"} all ${n} ${t}`});return i.dataset.species=t,i.appendChild(X0(t,o)),i.appendChild(K0(r)),i.appendChild(Y0(t)),i.addEventListener("click",async s=>{s.preventDefault(),s.stopPropagation(),a();}),i}function X0(e,t){try{if(!V.isReady()||!V.has("plant",e))return Xs(e);const n=t?R0:F0,r=V.toCanvas("plant",e,{scale:n});return r.className="gemini-qol-bulkFavorite-sprite",r}catch(n){return console.warn(`[BulkFavorite] Failed to load sprite for ${e}:`,n),Xs(e)}}function Xs(e){return b("div",{className:"gemini-qol-bulkFavorite-fallback"},e.charAt(0).toUpperCase())}function K0(e){const t=b("span",{className:`gemini-qol-bulkFavorite-heart ${e?"filled":"outline"}`});return t.innerHTML=e?W0:U0,t}function Y0(e){return b("span",{className:"gemini-qol-bulkFavorite-label"},e)}let at=null,it=null,ot=null,Gr=false,Ln=null,Sn=false,Qt=null;const Fa=[];function Cr(e){Fa.push(e);}function q0(){for(const e of Fa)try{e();}catch(t){console.warn("[BulkFavorite] Cleanup error:",t);}Fa.length=0;}function Zd(){return window.innerWidth<=Qd}function J0(e){return new Promise(t=>setTimeout(t,e))}function eu(){if(Gr)return;if(document.getElementById(La)){Gr=true;return}const e=document.createElement("style");e.id=La,e.textContent=H0,document.head.appendChild(e),Gr=true;}function Q0(){document.getElementById(La)?.remove(),Gr=false;}function Z0(){const e=$t().get();if(!e?.items)return [];const t=new Set(e.favoritedItemIds??[]),n=new Map;for(const o of e.items){const a=o;if(a.itemType!=="Produce")continue;const i=a.species,s=a.id;if(!i||!s)continue;const c=n.get(i);c?c.push(s):n.set(i,[s]);}const r=[];for(const[o,a]of n){const i=a.length>0&&a.every(s=>t.has(s));r.push({species:o,itemIds:a,allFavorited:i});}return r.sort((o,a)=>o.species.localeCompare(a.species)),r}async function ew(e){const t=$t().get();if(!t?.items)return;const n=new Set(t.favoritedItemIds??[]),r=[];for(const i of t.items){const s=i;if(s.itemType!=="Produce"||s.species!==e)continue;const c=s.id;c&&r.push({id:c,favorited:n.has(c)});}if(r.length===0)return;const o=r.every(i=>i.favorited),a=o?r.filter(i=>i.favorited):r.filter(i=>!i.favorited);console.log(`🔄 [BulkFavorite] ${o?"Unfavoriting":"Favoriting"} ${a.length}/${r.length} ${e}`);for(const i of a)bo(i.id),await J0(D0);}function Ra(e,t){const{species:n,itemIds:r,allFavorited:o}=e;return V0({species:n,itemCount:r.length,isFavorited:o,isMobile:t,onClick:()=>ew(n)})}function tw(e){const t=b("div",{id:wn}),n=e.getBoundingClientRect(),r=Math.max(window.innerHeight-B0,$0);return t.style.maxHeight=`${r}px`,t.style.position="fixed",t.style.left=`${n.right+O0}px`,t.style.top=`${n.top}px`,t}function Ks(e,t,n){const r=b("div",{id:e,className:"gemini-qol-bulkFavorite-row"}),o=t.getBoundingClientRect();return n==="top"?r.style.bottom=`${window.innerHeight-o.top+Ma}px`:r.style.top=`${o.bottom+Ma}px`,r.style.left=`${o.left}px`,r.style.maxWidth=`${o.width}px`,r}function Ys(){const e=Z0();Zd()?rw(e):nw(e);}function nw(e){if(at){if(at.innerHTML="",e.length===0){at.style.display="none";return}at.style.display="flex";for(const t of e)at.appendChild(Ra(t,false));console.log(`🎯 [BulkFavorite] Desktop: Rendered ${e.length} produce types`);}}function rw(e){if(!it||!ot)return;if(it.innerHTML="",ot.innerHTML="",e.length===0){it.style.display="none",ot.style.display="none";return}it.style.display="flex";const t=e.slice(0,Hs),n=e.slice(Hs);for(const r of t)it.appendChild(Ra(r,true));if(n.length>0){ot.style.display="flex";for(const r of n)ot.appendChild(Ra(r,true));}else ot.style.display="none";console.log(`🎯 [BulkFavorite] Mobile: Rendered ${e.length} types`);}function ow(){const e=document.querySelector(".McGrid");if(!e)return console.log("⚠️ [BulkFavorite] No .McGrid found"),null;const t=e.getBoundingClientRect();if(window.innerWidth<=Qd)return console.log(`🎯 [BulkFavorite] Mobile mode - using McGrid: ${Math.round(t.width)}x${Math.round(t.height)}`),e;const r=window.innerWidth/2;let o=null,a=0;const i=e.querySelectorAll(".McFlex, .McGrid");for(const s of i){const c=s.getBoundingClientRect();if(c.width<200||c.height<200||c.width>window.innerWidth-100)continue;const d=c.left+c.width/2,l=1-Math.abs(d-r)/r,p=c.width*c.height*l;p>a&&(o=s,a=p);}if(o){const s=o.getBoundingClientRect();return console.log(`🎯 [BulkFavorite] Found desktop container: ${Math.round(s.width)}x${Math.round(s.height)} @ (${Math.round(s.left)}, ${Math.round(s.top)})`),o}return console.log(`🎯 [BulkFavorite] Fallback to McGrid: ${Math.round(t.width)}x${Math.round(t.height)}`),e}let Zt=null;function Na(){Zt&&clearTimeout(Zt),Zt=setTimeout(()=>{aw();},z0);}function aw(){const e=ow();if(!e)return;console.log("🎯 [BulkFavorite] Found inventory modal container"),Fn(),eu(),Ln=e,Zd()?(it=Ks(G0,e,"top"),ot=Ks(j0,e,"bottom"),document.body.appendChild(it),document.body.appendChild(ot)):(at=tw(e),document.body.appendChild(at)),Ys(),Qt&&Qt(),Qt=$t().subscribeFavorites(()=>{Sn&&Ys();});}function Fn(){Zt&&(clearTimeout(Zt),Zt=null),Qt&&(Qt(),Qt=null),at?.remove(),at=null,it?.remove(),it=null,ot?.remove(),ot=null,Ln=null;}function iw(){Fn();}async function Oa(){if(!Jn().enabled){console.log("⚠️ [BulkFavorite] Feature disabled");return}eu();const t=await ei.onChangeNow(o=>{const a=o==="inventory";a!==Sn&&(Sn=a,a?Na():Fn());}),n=M0(".McGrid",()=>{Sn&&(at||it||Na());}),r=L0(".McGrid",o=>{Ln&&Ln===o&&Fn();});Cr(()=>t()),Cr(()=>n.disconnect()),Cr(()=>r.disconnect()),Cr(()=>{Fn(),Sn=false,Ln=null;}),console.log("✅ [BulkFavorite] Started (State-driven + DOM observation)");}function Ba(){q0(),Q0(),console.log("🛑 [BulkFavorite] Stopped");}function sw(e){const t=Jn();t.enabled=e,e?Oa():Ba();}let Tr=false;const $a={init(){Tr||(Oa(),Tr=true);},destroy(){Tr&&(Ba(),Tr=false);},isEnabled(){return hd()},renderButton:Na,removeButton:iw,startWatching:Oa,stopWatching:Ba,setEnabled:sw},Be={autoFavorite:{enabled:false},bulkFavorite:{enabled:false},journalChecker:{enabled:false},pets:{enabled:true},cropSizeIndicator:{enabled:false,showForGrowing:true,showForMature:true,showJournalBadges:true},eggProbabilityIndicator:{enabled:false},cropValueIndicator:{enabled:false},xpTracker:{enabled:false},abilityTracker:{enabled:false},mutationTracker:{enabled:false},cropBoostTracker:{enabled:false},turtleTimer:{enabled:false}};class lw extends rn{constructor(){super({id:"tab-feature-settings",label:"Features"});D(this,"config",Be);}async build(n){const r=this.createGrid("12px");r.id="feature-settings",n.appendChild(r);const o=Pe(Le.CONFIG,{});this.config=this.mergeConfig(o),r.appendChild(this.createQOLCard()),r.appendChild(this.createVisualIndicatorsCard()),r.appendChild(this.createTrackingCard());}mergeConfig(n){return {autoFavorite:{...Be.autoFavorite,...n.autoFavorite},bulkFavorite:{...Be.bulkFavorite,...n.bulkFavorite},journalChecker:{...Be.journalChecker,...n.journalChecker},pets:{...Be.pets,...n.pets},cropSizeIndicator:{...Be.cropSizeIndicator,...n.cropSizeIndicator},eggProbabilityIndicator:{...Be.eggProbabilityIndicator,...n.eggProbabilityIndicator},cropValueIndicator:{...Be.cropValueIndicator,...n.cropValueIndicator},xpTracker:{...Be.xpTracker,...n.xpTracker},abilityTracker:{...Be.abilityTracker,...n.abilityTracker},mutationTracker:{...Be.mutationTracker,...n.mutationTracker},cropBoostTracker:{...Be.cropBoostTracker,...n.cropBoostTracker},turtleTimer:{...Be.turtleTimer,...n.turtleTimer}}}createQOLCard(){return Ke({title:"Quality of Life",padding:"lg",expandable:true,defaultExpanded:true},this.createToggleRow("Auto-Favorite",this.config.autoFavorite.enabled,n=>{this.config.autoFavorite.enabled=n,this.saveConfig();}),this.createToggleRow("Bulk Favorite",this.config.bulkFavorite.enabled,n=>{this.config.bulkFavorite.enabled=n,this.saveConfig(),$a.setEnabled(n);}),this.createToggleRow("Journal Checker",this.config.journalChecker.enabled,n=>{this.config.journalChecker.enabled=n,this.saveConfig();}),this.createToggleRow("Pets Panel",this.config.pets.enabled,n=>{this.config.pets.enabled=n,this.saveConfig();},"Show/hide the Pets tab"))}createVisualIndicatorsCard(){return Ke({title:"Visual Indicators",variant:"soft",padding:"lg",expandable:true,defaultExpanded:true},this.createToggleRow("Crop Size",this.config.cropSizeIndicator.enabled,n=>{this.config.cropSizeIndicator.enabled=n,this.saveConfig();},"Shows size % and journal badges"),this.createToggleRow("Egg Probability",this.config.eggProbabilityIndicator.enabled,n=>{this.config.eggProbabilityIndicator.enabled=n,this.saveConfig();},"Shows hatch chances + mutation %"),this.createToggleRow("Crop Value",this.config.cropValueIndicator.enabled,n=>{this.config.cropValueIndicator.enabled=n,this.saveConfig();},"Shows coin value"))}createTrackingCard(){return Ke({title:"Tracking & Analytics",variant:"soft",padding:"lg",expandable:true,defaultExpanded:false},this.createToggleRow("XP Tracker",this.config.xpTracker.enabled,n=>{this.config.xpTracker.enabled=n,this.saveConfig(),Gn.setEnabled(n);}),this.createToggleRow("Ability Tracker",this.config.abilityTracker.enabled,n=>{this.config.abilityTracker.enabled=n,this.saveConfig();}),this.createToggleRow("Mutation Tracker",this.config.mutationTracker.enabled,n=>{this.config.mutationTracker.enabled=n,this.saveConfig();}),this.createToggleRow("Crop Boost Tracker",this.config.cropBoostTracker.enabled,n=>{this.config.cropBoostTracker.enabled=n,this.saveConfig();}),this.createToggleRow("Turtle Timer",this.config.turtleTimer.enabled,n=>{this.config.turtleTimer.enabled=n,this.saveConfig();}))}createToggleRow(n,r,o,a){const i=b("div",{className:a?"kv-col":"kv"}),s=b("div",{className:"kv"}),c=Da({text:n,tone:"default",size:"md"}),d=Ha({checked:r,onChange:o});if(s.append(c.root,d.root),a){i.appendChild(s);const l=b("p",{className:"helper-text",style:"font-size: 12px; color: var(--item-desc, var(--muted)); margin-top: 4px;"},a);return i.appendChild(l),i}return s}saveConfig(){Oe(Le.CONFIG,this.config),console.log("[FeatureSettings] Config saved:",this.config);}}const cw=(function(){const t=typeof document<"u"&&document.createElement("link").relList;return t&&t.supports&&t.supports("modulepreload")?"modulepreload":"preload"})(),dw=function(e){return "/"+e},qs={},tu=function(t,n,r){let o=Promise.resolve();if(n&&n.length>0){let c=function(d){return Promise.all(d.map(l=>Promise.resolve(l).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),s=i?.nonce||i?.getAttribute("nonce");o=c(n.map(d=>{if(d=dw(d),d in qs)return;qs[d]=true;const l=d.endsWith(".css"),u=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${u}`))return;const p=document.createElement("link");if(p.rel=l?"stylesheet":cw,l||(p.as="script"),p.crossOrigin="",p.href=d,s&&p.setAttribute("nonce",s),document.head.appendChild(p),l)return new Promise((f,g)=>{p.addEventListener("load",f),p.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${d}`)));})}));}function a(i){const s=new Event("vite:preloadError",{cancelable:true});if(s.payload=i,window.dispatchEvent(s),!s.defaultPrevented)throw i}return o.then(i=>{for(const s of i||[])s.status==="rejected"&&a(s.reason);return t().catch(a)})},uw=`
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
`,pw=`
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
`;function fw(e){const{count:t,expanded:n=false,onClick:r}=e,o=b("div",{className:"see-more"}),a=b("span",{className:"see-more-link"},Ko(t,n));r&&a.addEventListener("click",r),o.appendChild(a);const i=o;return i.setCount=s=>{a.textContent=Ko(s,n);},i.setExpanded=s=>{a.textContent=Ko(t,s);},i}function Ko(e,t){return t?"− Show less":`+ and ${e} more...`}const gw=e=>e<15?"#F98B4B":e<25?"#FC6D30":e<50?"#F3D32B":e<75?"#E9B52F":e<100?"#5EAC46":"#0B893F",mw=e=>e>=100?"var(--complete)":e>=75?"var(--high)":e>=50?"var(--medium)":"var(--low)",hw={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function Js(e){return e?hw[e]??0:0}function Qs(e,t){try{if(t==="pets")return (oe.get("pets")||{})[e]?.rarity||null;if(t==="plants")return (oe.get("plants")||{})[e]?.seed?.rarity||null}catch{}return null}function bw({progress:e,activeTab:t,expandedCategories:n,onSpeciesClick:r,onToggleExpand:o}){const a=b("div",{className:"journal-content"}),i=b("div",{className:"journal-header"},"Garden Journal");if(a.appendChild(i),t!=="all"){const s=t==="plants"?e.plants:e.pets,c=b("div",{className:"journal-progress-indicator"}),d=Math.floor(s.variantsLogged/s.variantsTotal*100),l=b("span",{className:"percentage"},`Collected ${d}%`),u=b("span",{className:"count"},` (${s.variantsLogged}/${s.variantsTotal})`);c.appendChild(l),c.appendChild(u),a.appendChild(c);}return t==="all"?(a.appendChild(Pr("Produce",e.plants,"plants",n.has("plants"),r,()=>o("plants"),true)),a.appendChild(Pr("Pets",e.pets,"pets",n.has("pets"),r,()=>o("pets"),true))):t==="plants"?a.appendChild(Pr("Produce",e.plants,"plants",n.has("plants"),r,()=>o("plants"))):a.appendChild(Pr("Pets",e.pets,"pets",n.has("pets"),r,()=>o("pets"))),a}function Pr(e,t,n,r,o,a,i=false){const s=b("div",{style:"display: flex; flex-direction: column;"}),c=b("div",{style:`
            max-height: ${r?"480px":"none"};
            overflow-y: ${r?"auto":"visible"};
            overflow-x: hidden;
            margin-bottom: 8px;
        `,className:"journal-species-list"}),d=b("div",{className:"journal-category-stats",style:"height: 28px; line-height: 28px; margin-bottom: 0; display: flex; align-items: center; gap: 6px;"}),l=b("div",{style:"width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(V.isReady()){const h=n==="plants"?"plant":"pet",x=n==="plants"?"Carrot":"CommonEgg";if(V.has(h,x)){const k=V.toCanvas(h,x,{scale:.3});k.style.maxWidth="20px",k.style.maxHeight="20px",k.style.display="block",l.appendChild(k);}}}catch{}const u=t.speciesDetails.length,p=t.total,f=b("span",{},`[ ${e.toUpperCase()} ] — ${u}/${p} SPECIES`);if(d.append(l,f),s.appendChild(d),i){const h=b("div",{className:"journal-progress-indicator",style:"text-align: right; margin-bottom: 4px;"}),x=Math.floor(t.variantsLogged/t.variantsTotal*100),k=b("span",{className:"percentage"},`Collected ${x}%`),v=b("span",{className:"count"},` (${t.variantsLogged}/${t.variantsTotal})`);h.appendChild(k),h.appendChild(v),s.appendChild(h);}const g=[...t.speciesDetails].sort((h,x)=>{const k=Qs(h.species,n),v=Qs(x.species,n),w=Js(k)-Js(v);return w!==0?w:h.species.localeCompare(x.species,void 0,{numeric:true,sensitivity:"base"})}),m=r?g:g.slice(0,5);for(const h of m)c.appendChild(xw(h,n,o));if(s.appendChild(c),t.speciesDetails.length>5){const h=fw({count:t.speciesDetails.length-5,expanded:r,onClick:()=>{a();}});s.appendChild(h);}else s.appendChild(b("div",{style:"height: 28px;"}));return s}function xw(e,t,n){const r=b("div",{className:"journal-row",style:"height: 56px;",onclick:p=>{p.stopPropagation(),n(e,t);}}),o=b("div",{style:"width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{let f=t==="plants"?"plant":"pet",g=e.species;t==="plants"&&(e.species==="DawnCelestial"&&(g="DawnCelestialCrop"),e.species==="MoonCelestial"&&(g="MoonCelestialCrop"),e.species==="OrangeTulip"&&(g="Tulip"));const m=e.isComplete?["Rainbow"]:[],h=(k,v)=>{try{if(V.has(k,v))return V.toCanvas(k,v,{scale:.4,mutations:m})}catch{}return null},x=h(f,g)||(t==="plants"?h("tallplant",g):null)||h(f,g.toLowerCase())||(t==="plants"?h("tallplant",g.toLowerCase()):null);x?(x.style.maxWidth="32px",x.style.maxHeight="32px",x.style.display="block",o.appendChild(x)):console.warn(`[JournalChecker] No sprite found for ${e.species} in ${t}`);}catch(p){console.error(`[JournalChecker] Sprite error for ${e.species}`,p);}const a=b("div",{style:"flex: 1; position: relative; height: 22px;"}),i=b("div",{className:"journal-bar-container",style:"width: 100%; height: 100%; border-radius: 4px; overflow: hidden;"});let s;if(e.isComplete)s="width: 100%; height: 100%; background: linear-gradient(90deg, rgb(255,0,0) 0%, rgb(255,154,0) 14%, rgb(255,255,0) 28%, rgb(0,255,0) 42%, rgb(0,200,255) 56%, rgb(0,0,255) 70%, rgb(143,0,255) 84%, rgb(255,0,255) 100%);";else {const p=gw(e.variantsPercentage);s=`width: ${Math.max(2,e.variantsPercentage)}%; height: 100%; background: ${p};`;}const c=b("div",{className:e.isComplete?"journal-bar-fill rainbow":"journal-bar-fill",style:s});i.appendChild(c);const d=b("div",{style:"position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-weight: 600; font-size: 14px; color: var(--journal-ink); z-index: 1; pointer-events: none;"},e.species);a.append(i,d);const l=mw(e.variantsPercentage),u=b("span",{style:`flex-shrink: 0; font-weight: 800; font-size: 13px; min-width: 50px; text-align: right; color: ${l};`},`${Math.round(e.variantsPercentage)}%`);return r.append(o,a,u),r}function yw({species:e,category:t,onBack:n}){const r=b("div",{className:"journal-content"}),o=b("div",{className:"journal-back",onclick:d=>{d.stopPropagation(),n();}},"← Return");r.appendChild(o);const a=b("div",{className:"journal-header"},e.species);r.appendChild(a);const i=b("div",{className:"journal-category-stats",style:"text-align: center; height: 28px; line-height: 28px; margin-bottom: 28px;"},`[ ${e.variantsLogged.length} / ${e.variantsTotal} STAMPS ]`);r.appendChild(i);const s=b("div",{className:"journal-grid"}),c=[...e.variantsLogged,...e.variantsMissing].sort((d,l)=>d==="Normal"?-1:l==="Normal"||d==="Max Weight"?1:l==="Max Weight"?-1:d.localeCompare(l));for(const d of c){const l=e.variantsLogged.includes(d);s.appendChild(vw(e.species,d,t,l));}return r.appendChild(s),r}function vw(e,t,n,r){const o=b("div",{className:"journal-stamp-wrapper"}),a=b("div",{className:"journal-stamp",style:r?"":"opacity: 0.1; filter: grayscale(100%);"});try{const s=t!=="Normal"&&t!=="Max Weight"?[t]:[];let d=n==="plants"?"plant":"pet",l=e;n==="plants"&&(e==="DawnCelestial"&&(l="DawnCelestialCrop"),e==="MoonCelestial"&&(l="MoonCelestialCrop"),e==="OrangeTulip"&&(l="Tulip"));const u=(f,g)=>{try{const m=t==="Max Weight"?.72:.6;if(V.has(f,g))return V.toCanvas(f,g,{mutations:s,scale:m,boundsMode:"padded"})}catch{}return null},p=u(d,l)||(n==="plants"?u("tallplant",l):null)||u(d,l.toLowerCase())||(n==="plants"?u("tallplant",l.toLowerCase()):null);p&&(p.style.width="44px",p.style.height="44px",p.style.objectFit="contain",p.style.display="block",a.appendChild(p));}catch{}const i=b("div",{className:"journal-stamp-label"},t);return o.append(a,i),o}const ww=`
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
`;function Sw(e){const{label:t,tabId:n,tabIndex:r,active:o=false,onClick:a}=e,i=b("button",{className:`tab ${o?"active":""}`,"data-tab":n,"data-tab-index":String(r)},t),s=`var(--journal-tab-${Math.min(5,Math.max(1,r))})`;i.style.setProperty("--tab-color",s),a&&i.addEventListener("click",a);const c=i;return c.setActive=d=>{d?i.classList.add("active"):i.classList.remove("active");},c.setLabel=d=>{i.textContent=d;},c}const kw=`
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
`,Cw={activeTab:"all",expandedCategories:[]};let It=null;async function Tw(){return It||(It=await to("tab-journal-checker",{version:1,defaults:Cw}),It)}function Ar(){if(!It)throw new Error("[JournalChecker] Section state not initialized. Call initSectionState() first.");return It}function _r(){return It!==null}const Pw=[{id:"all",label:"All",colorTheme:"teal"},{id:"plants",label:"Crops",colorTheme:"green"},{id:"pets",label:"Pets",colorTheme:"purple"}];class Aw extends rn{constructor(){super({id:"tab-journal-checker",label:"Journal"});D(this,"progress",null);D(this,"currentView",{type:"overview"});}async build(n){this.container=n,await Tw(),await V.init(),console.log("[JournalChecker] Sprite categories:",V.getCategories());const r=n.getRootNode();Re(r,uw,"journal-checker-styles"),Re(r,ww,"journal-tab-styles"),Re(r,kw,"journal-progress-bar-styles"),Re(r,pw,"journal-see-more-styles"),this.container.classList.add("journal-checker-host"),this.container.style.height="100%",this.container.style.overflowY="auto",await this.updateProgress();const o=(a=>{this.progress=a.detail,this.refresh();});window.addEventListener("gemini:journal-updated",o),this.addCleanup(()=>{window.removeEventListener("gemini:journal-updated",o);});}async updateProgress(){try{const{MGJournalChecker:n}=await tu(async()=>{const{MGJournalChecker:r}=await Promise.resolve().then(()=>_0);return {MGJournalChecker:r}},void 0);this.progress=await n.aggregateJournalProgress(),this.refresh();}catch(n){console.error("[JournalChecker] Failed to load progress:",n);}}get activeTab(){return _r()?Ar().get().activeTab:"all"}set activeTab(n){_r()&&Ar().update({activeTab:n});}get expandedCategories(){return _r()?new Set(Ar().get().expandedCategories):new Set}setExpandedCategories(n){_r()&&Ar().update({expandedCategories:Array.from(n)});}refresh(){if(this.container){if(this.container.innerHTML="",!this.progress){this.container.appendChild(b("div",{style:"padding: 20px; text-align: center; font-family: var(--font-game); color: var(--journal-sub);"},"Loading Journal..."));return}this.container.appendChild(this.renderTabNavigation()),this.currentView.type==="overview"?this.container.appendChild(bw({progress:this.progress,activeTab:this.activeTab,expandedCategories:this.expandedCategories,onSpeciesClick:(n,r)=>{this.currentView={type:"species",species:n,category:r},this.refresh();},onToggleExpand:n=>{const r=this.expandedCategories;r.has(n)?r.delete(n):r.add(n),this.setExpandedCategories(r),this.refresh();}})):this.container.appendChild(yw({species:this.currentView.species,category:this.currentView.category,onBack:()=>{this.currentView={type:"overview"},this.refresh();}}));}}renderTabNavigation(){const n=b("div",{className:"journal-tabs-container"});return Pw.forEach((r,o)=>{const a=Sw({label:r.label,tabId:r.id,tabIndex:o+1,active:this.activeTab===r.id,onClick:()=>{this.activeTab=r.id,this.refresh();}});n.appendChild(a);}),n}}function _w(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("width","24"),e.setAttribute("height","24"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","2"),e.setAttribute("stroke-linecap","round"),e.style.color="var(--accent)";const t=document.createElementNS("http://www.w3.org/2000/svg","line");t.setAttribute("x1","12"),t.setAttribute("y1","5"),t.setAttribute("x2","12"),t.setAttribute("y2","19");const n=document.createElementNS("http://www.w3.org/2000/svg","line");return n.setAttribute("x1","5"),n.setAttribute("y1","12"),n.setAttribute("x2","19"),n.setAttribute("y2","12"),e.appendChild(t),e.appendChild(n),e}function Iw(e,t){const n=e;let r=e;const o=hl({value:e,placeholder:"Team name",mode:"alphanumeric",allowSpaces:true,maxLength:50,blockGameKeys:true,onChange:a=>{const i=a.trim();i&&i!==r&&(r=i,t?.(i));},onEnter:a=>{const i=a.trim()||n;i!==r&&(r=i,t?.(i));}});return o.root.className="team-list-item__name-input",o.input.addEventListener("blur",()=>{const a=o.getValue().trim()||n;a!==r&&(r=a,t?.(a));}),o.input.addEventListener("keydown",a=>{a.key==="Escape"&&(a.preventDefault(),o.input.blur());}),o.root}function Ew(e){const t=b("div",{className:"team-list-item"}),n=e.customIndicator??b("div",{className:`team-list-item__indicator ${e.isActive?"team-list-item__indicator--active":"team-list-item__indicator--inactive"}`}),r=e.isNameEditable?Iw(e.team.name,e.onNameChange):b("div",{textContent:e.team.name,className:`team-list-item__name ${e.isActive?"team-list-item__name--active":"team-list-item__name--inactive"}`}),o=b("div",{className:"team-list-item__sprites"});function a(){const c=ye.myPets.get();o.innerHTML="";for(let d=0;d<3;d++){const l=e.team.petIds[d],u=l&&l!=="",p=b("div",{className:`team-list-item__sprite-slot ${e.showSlotStyles&&!u?"team-list-item__sprite-slot--empty":""}`});if(e.onSlotClick&&(p.style.cursor="pointer",p.addEventListener("click",()=>{e.onSlotClick(d);})),u){let f=c.all.find(g=>g.id===l);if(!f){const g=window.__petDataCache;g&&g.has(l)&&(f=g.get(l));}if(f)try{const g=V.toCanvas("pet",f.petSpecies,{mutations:f.mutations,scale:1}),m=document.createElement("canvas");m.width=g.width,m.height=g.height;const h=m.getContext("2d");if(h&&h.drawImage(g,0,0),m.style.width="100%",m.style.height="100%",m.style.objectFit="contain",p.appendChild(m),e.showSlotStyles){const x=b("div",{className:"team-list-item__sprite-slot-overlay"});p.appendChild(x),p.classList.add("team-list-item__sprite-slot--filled");}}catch(g){console.warn(`[TeamListItem] Failed to render sprite for pet ${f.petSpecies}:`,g);const m=b("div",{textContent:"🐾",className:"team-list-item__sprite-placeholder"});p.appendChild(m);}else {const g=b("div",{textContent:"⏳",className:"team-list-item__sprite-placeholder"});p.appendChild(g),console.warn(`[TeamListItem] Pet ${l} not found in myPets yet, waiting for update`);let m=false;const h=ye.myPets.subscribe(()=>{if(m)return;const k=ye.myPets.get().all.find(v=>v.id===l);if(k){m=true,h();try{p.innerHTML="";const v=V.toCanvas("pet",k.petSpecies,{mutations:k.mutations,scale:1}),w=document.createElement("canvas");w.width=v.width,w.height=v.height;const P=w.getContext("2d");if(P&&P.drawImage(v,0,0),w.style.width="100%",w.style.height="100%",w.style.objectFit="contain",p.appendChild(w),e.showSlotStyles){const y=b("div",{className:"team-list-item__sprite-slot-overlay"});p.appendChild(y),p.classList.add("team-list-item__sprite-slot--filled");}console.log(`[TeamListItem] Pet ${l} sprite updated`);}catch(v){console.warn(`[TeamListItem] Failed to render sprite for pet ${k.petSpecies}:`,v),p.innerHTML="<div class='team-list-item__sprite-placeholder'>🐾</div>";}}},{immediate:false});}}else if(e.showSlotStyles&&!u){const f=_w();p.appendChild(f);}o.appendChild(p);}}a();const i=ye.myPets.subscribe(()=>{a();});if(!e.hideDragHandle){const c=b("div",{textContent:"⋮⋮",className:"team-list-item__drag-handle"});t.appendChild(c);}if(t.appendChild(n),t.appendChild(r),t.appendChild(o),e.onExpandClick){const c=b("button",{className:`team-list-item__expand ${e.isExpanded?"team-list-item__expand--open":""}`});c.innerHTML='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>',c.addEventListener("click",d=>{d.stopPropagation(),e.onExpandClick?.();}),t.appendChild(c);}const s=new MutationObserver(()=>{document.contains(t)||(s.disconnect(),i());});return s.observe(document.body,{childList:true,subtree:true}),t}function Mw(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function Lw(e){const{segments:t,selected:n=t[0]?.id??"",size:r="md",fullWidth:o=false,disabled:a=false,onChange:i}=e,s=b("div",{className:"sg-root"});r!=="md"&&s.classList.add(`sg--${r}`),o&&(s.style.width="100%");const c=b("div",{className:"sg-container",role:"tablist"}),d=b("div",{className:"sg-indicator"}),l=t.map(y=>{const C=b("button",{className:"sg-btn",type:"button",role:"tab","aria-selected":"false",title:y.label});if(C.id=y.id,y.icon){const S=b("span",{className:"sg-icon"}),A=Mw(y.icon);A&&S.appendChild(A),C.appendChild(S);}const T=b("span",{className:"sg-label"},y.label);return C.appendChild(T),C.disabled=!!y.disabled,C});c.appendChild(d),l.forEach(y=>c.appendChild(y)),s.appendChild(c);let u=n,p=a;function f(){const y=l.find(C=>C.id===u);y&&requestAnimationFrame(()=>{const C=d,T=y.offsetLeft,S=y.offsetWidth;C.style.width=`${S}px`,C.style.transform=`translateX(${T}px)`;});}function g(){l.forEach(y=>{const C=y.id===u;y.classList.toggle("active",C),y.setAttribute("aria-selected",String(C)),y.disabled=p||!!t.find(T=>T.id===y.id)?.disabled;}),f();}function m(y){const C=y.currentTarget;if(C.disabled)return;x(C.id);}function h(y){if(p)return;const C=l.findIndex(S=>S.id===u);let T=C;if(y.key==="ArrowLeft"||y.key==="ArrowUp"?(y.preventDefault(),T=(C-1+l.length)%l.length):y.key==="ArrowRight"||y.key==="ArrowDown"?(y.preventDefault(),T=(C+1)%l.length):y.key==="Home"?(y.preventDefault(),T=0):y.key==="End"&&(y.preventDefault(),T=l.length-1),T!==C){const S=l[T];S&&!S.disabled&&(x(S.id),S.focus());}}l.forEach(y=>{y.addEventListener("click",m),y.addEventListener("keydown",h);});function x(y){!t.some(T=>T.id===y)||u===y||(u=y,g(),i?.(u));}function k(){return u}function v(y){p=!!y,g();}function w(){l.forEach(y=>{y.removeEventListener("click",m),y.removeEventListener("keydown",h);});}g(),queueMicrotask(()=>{const y=l.find(C=>C.id===u);if(y){const C=d;C.style.width=`${y.offsetWidth}px`,C.style.transform=`translateX(${y.offsetLeft}px)`;}});const P=s;return P.select=x,P.getSelected=k,P.setDisabled=v,P.destroy=w,P}function Fw(e={}){const{id:t,checked:n=false,disabled:r=false,size:o="md",label:a,labelSide:i="right",onChange:s}=e,c=b("div",{className:"lg-checkbox-wrap"}),d=b("input",{className:`lg-checkbox lg-checkbox--${o}`,id:t,type:"checkbox",checked:!!n,disabled:!!r});let l=null;a&&i!=="none"&&(l=b("label",{className:"lg-checkbox-label",htmlFor:t},a)),l&&i==="left"?c.append(l,d):l&&i==="right"?c.append(d,l):c.append(d);let u=!!n,p=!!r;function f(){d.checked=u,d.disabled=p;}function g(C=false){p||(u=!u,f(),C||s?.(u));}function m(){p||g();}function h(C){p||(C.key===" "||C.key==="Enter")&&(C.preventDefault(),g());}d.addEventListener("click",m),d.addEventListener("keydown",h);function x(){return u}function k(C,T=false){u=!!C,f(),T||s?.(u);}function v(C){p=!!C,f();}function w(C){if(!C){l&&(l.remove(),l=null);return}l?l.textContent=C:(l=b("label",{className:"lg-checkbox-label",htmlFor:t},C),c.append(l));}function P(){d.focus();}function y(){d.removeEventListener("click",m),d.removeEventListener("keydown",h);}return f(),{root:c,input:d,isChecked:x,setChecked:k,setDisabled:v,setLabel:w,focus:P,destroy:y}}function Rw(e){const t=getComputedStyle(e);if(!/(auto|scroll|overlay)/.test(t.overflowY+t.overflowX))return  false;const n=e.scrollHeight,r=e.clientHeight,o=e.scrollWidth,a=e.clientWidth;return n>r+1||o>a+1}function Nw(e){const t={overflow:e.style.overflow,overflowY:e.style.overflowY,overflowX:e.style.overflowX,touchAction:e.style.touchAction,overscrollBehavior:e.style.overscrollBehavior};e.style.overflow="hidden",e.style.overflowY="hidden",e.style.overflowX="hidden",e.style.touchAction="none",e.style.overscrollBehavior="contain";let n=false;return ()=>{n||(n=true,e.style.overflow=t.overflow,e.style.overflowY=t.overflowY,e.style.overflowX=t.overflowX,e.style.touchAction=t.touchAction,e.style.overscrollBehavior=t.overscrollBehavior);}}function Ow(e){const t=[],n=new Set;let r=e;for(;r;){if(r instanceof ShadowRoot){r=r.host;continue}if(r instanceof HTMLElement)!n.has(r)&&r!==e&&Rw(r)&&(t.push(r),n.add(r)),r=r.parentElement??r.parentNode;else break}return document.body&&t.push(document.body),document.documentElement&&t.push(document.documentElement),t.filter((o,a,i)=>i.indexOf(o)===a)}function Bw(e){const n=Ow(e).map(Nw);let r=false;return ()=>{if(!r){r=true;for(let o=n.length-1;o>=0;o--)try{n[o]();}catch{}}}}class $w{constructor(t){D(this,"dragState",null);D(this,"longPressState",null);D(this,"options");D(this,"onPointerMove");D(this,"onPointerUp");D(this,"onPointerCancel");D(this,"onLongPressPointerMove");D(this,"onLongPressPointerUp");this.options=t,this.onPointerMove=this.handlePointerMove.bind(this),this.onPointerUp=this.handlePointerUp.bind(this),this.onPointerCancel=this.handlePointerCancel.bind(this),this.onLongPressPointerMove=this.handleLongPressPointerMove.bind(this),this.onLongPressPointerUp=this.handleLongPressPointerUp.bind(this);}startLongPress(t,n,r){if(this.cleanupLongPress(),ce.getAllTeams().findIndex(d=>d.id===r)===-1)return;const i=t.clientX,s=t.clientY,c=window.setTimeout(()=>{this.longPressState&&this.startDrag(t,n,r);},500);this.longPressState={pointerId:t.pointerId,startX:i,startY:s,timeout:c,target:n},window.addEventListener("pointermove",this.onLongPressPointerMove,{passive:false}),window.addEventListener("pointerup",this.onLongPressPointerUp,{passive:false});}startDrag(t,n,r){const o=this.options.getListContainer();if(this.dragState||!o)return;t.preventDefault();const i=ce.getAllTeams().findIndex(p=>p.id===r);if(i===-1)return;const s=n.getBoundingClientRect(),c=o.getBoundingClientRect(),d=n.cloneNode(true);d.classList.add("team-list-item--placeholder"),d.classList.remove("team-list-item--dragging");const l=n.style.touchAction;n.style.touchAction="none";const u=Bw(n);if(this.dragState={itemEl:n,pointerId:t.pointerId,placeholder:d,offsetY:t.clientY-s.top,fromIndex:i,teamId:r,captureTarget:n,touchActionPrev:l,releaseScrollLock:u},n.classList.add("team-list-item--dragging"),n.style.width=`${s.width}px`,n.style.height=`${s.height}px`,n.style.left=`${s.left-c.left}px`,n.style.top=`${s.top-c.top}px`,n.style.position="absolute",n.style.zIndex="30",n.style.pointerEvents="none",o.style.position||(o.style.position="relative"),o.insertBefore(d,n.nextSibling),o.classList.add("is-reordering"),n.setPointerCapture)try{n.setPointerCapture(t.pointerId);}catch{}window.addEventListener("pointermove",this.onPointerMove,{passive:false}),window.addEventListener("pointerup",this.onPointerUp,{passive:false}),window.addEventListener("pointercancel",this.onPointerCancel,{passive:false});}cleanup(){this.cleanupDrag(),this.cleanupLongPress();}handleLongPressPointerMove(t){if(!this.longPressState||t.pointerId!==this.longPressState.pointerId)return;const n=Math.abs(t.clientX-this.longPressState.startX),r=Math.abs(t.clientY-this.longPressState.startY),o=10;(n>o||r>o)&&this.cleanupLongPress();}handleLongPressPointerUp(t){!this.longPressState||t.pointerId!==this.longPressState.pointerId||this.cleanupLongPress();}handlePointerMove(t){const n=this.options.getListContainer();if(!this.dragState||!n||t.pointerId!==this.dragState.pointerId)return;t.preventDefault();const r=n.getBoundingClientRect();let o=t.clientY-r.top-this.dragState.offsetY;const a=r.height-this.dragState.itemEl.offsetHeight;Number.isFinite(a)&&(o=Math.max(-8,Math.min(a+8,o))),this.dragState.itemEl.style.top=`${o}px`,this.updatePlaceholderPosition(t.clientY);}handlePointerUp(t){!this.dragState||t.pointerId!==this.dragState.pointerId||(t.preventDefault(),this.finishDrag());}handlePointerCancel(t){!this.dragState||t.pointerId!==this.dragState.pointerId||this.finishDrag({revert:true});}updatePlaceholderPosition(t){const n=this.options.getListContainer();if(!this.dragState||!n)return;const{placeholder:r,itemEl:o}=this.dragState,a=Array.from(n.children).filter(c=>c!==o&&c!==r&&c instanceof HTMLElement&&c.classList.contains("team-list-item")),i=new Map;a.forEach(c=>{i.set(c,c.getBoundingClientRect().top);});let s=false;for(const c of a){const d=c.getBoundingClientRect(),l=d.top+d.height/2;if(t<l){r.nextSibling!==c&&n.insertBefore(r,c),s=true;break}}s||n.appendChild(r),a.forEach(c=>{const d=i.get(c),l=c.getBoundingClientRect().top;if(d!==void 0&&d!==l){const u=d-l;c.style.transform=`translateY(${u}px)`,c.style.transition="none",c.offsetHeight,c.style.transition="transform 0.14s ease",c.style.transform="translateY(0)";}});}finishDrag(t={}){const n=this.options.getListContainer();if(!this.dragState||!n)return;const{revert:r=false}=t,{itemEl:o,placeholder:a,fromIndex:i,touchActionPrev:s,releaseScrollLock:c,pointerId:d}=this.dragState;if(n.classList.remove("is-reordering"),o.hasPointerCapture(d))try{o.releasePointerCapture(d);}catch{}if(window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),window.removeEventListener("pointercancel",this.onPointerCancel),r){const p=Array.from(n.children).filter(f=>f!==o&&f!==a&&f instanceof HTMLElement&&f.classList.contains("team-list-item"))[i]||null;p?n.insertBefore(a,p):n.appendChild(a);}else {const u=Array.from(n.children).filter(f=>f!==o),p=u.indexOf(a);if(p!==-1){const f=u[p];f!==a&&n.insertBefore(a,f);}}if(a.replaceWith(o),a.remove(),o.classList.remove("team-list-item--dragging"),o.style.width="",o.style.height="",o.style.left="",o.style.top="",o.style.position="",o.style.zIndex="",o.style.pointerEvents="",o.style.touchAction=s??"",Array.from(n.children).filter(u=>u instanceof HTMLElement&&u.classList.contains("team-list-item")).forEach(u=>{u.style.transform="",u.style.transition="";}),c?.(),!r){const p=Array.from(n.children).filter(f=>f instanceof HTMLElement&&f.classList.contains("team-list-item")).indexOf(o);if(p!==-1&&p!==i){const g=ce.getAllTeams().slice(),[m]=g.splice(i,1);g.splice(p,0,m);const h=g.map(x=>x.id);ce.reorderTeams(h),this.options.onReorder(h);}}this.dragState=null;}cleanupDrag(){this.dragState&&(window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),window.removeEventListener("pointercancel",this.onPointerCancel),this.dragState=null);}cleanupLongPress(){this.longPressState&&(window.clearTimeout(this.longPressState.timeout),window.removeEventListener("pointermove",this.onLongPressPointerMove),window.removeEventListener("pointerup",this.onLongPressPointerUp),this.longPressState=null);}}class Dw{constructor(t,n={}){D(this,"root");D(this,"pet");D(this,"options");D(this,"contentSlot",null);D(this,"isBuilt",false);this.pet=t,this.options=n,this.root=document.createElement("div"),this.root.className="base-pet-card",n.className&&this.root.classList.add(n.className);}build(){if(this.isBuilt)return this.root;this.updateStateClasses();const t=document.createElement("div");t.className="base-pet-card__left";const n=document.createElement("div");n.className="base-pet-card__sprite-wrapper",this.renderSprite(n),t.appendChild(n);const r=document.createElement("div");r.className="base-pet-card__info";const o=document.createElement("div");if(o.className="base-pet-card__name",o.textContent=this.pet.name||this.pet.petSpecies,r.appendChild(o),!this.options.hideStr){const a=document.createElement("div");a.className="base-pet-card__str",this.renderStr(a),r.appendChild(a);}return t.appendChild(r),this.root.appendChild(t),this.contentSlot=document.createElement("div"),this.contentSlot.className="base-pet-card__content",this.root.appendChild(this.contentSlot),this.options.onClick&&(this.root.style.cursor="pointer",this.root.addEventListener("click",()=>this.options.onClick?.(this.pet))),this.isBuilt=true,this.root}getContentSlot(){if(!this.contentSlot)throw new Error("BasePetCard must be built before getting slot");return this.contentSlot}update(t){if(this.pet=t,!this.isBuilt)return;this.updateStateClasses();const n=this.root.querySelector(".base-pet-card__name");n&&(n.textContent=t.name||t.petSpecies);const r=this.root.querySelector(".base-pet-card__str");r&&this.renderStr(r);const o=this.root.querySelector(".base-pet-card__sprite-wrapper");o instanceof HTMLElement&&this.renderSprite(o);}updateStateClasses(){this.root.classList.toggle("base-pet-card--max",this.pet.currentStrength>=this.pet.maxStrength),this.root.classList.toggle("base-pet-card--starving",(this.pet.hunger||0)===0);}renderStr(t){const r=this.pet.currentStrength>=this.pet.maxStrength?`MAX ${this.pet.maxStrength}`:`STR ${this.pet.currentStrength}/${this.pet.maxStrength}`;t.innerHTML="";const o=ho({label:r,type:"neutral",tone:"soft",size:"sm",pill:true});t.appendChild(o.root);}setCentered(t){this.root.classList.toggle("base-pet-card--centered",t);}renderSprite(t){t.innerHTML="";try{const n=this.pet.mutations||[];if(V.has("pet",this.pet.petSpecies)){const r=V.toCanvas("pet",this.pet.petSpecies,{mutations:n,scale:1,boundsMode:"padded"});r.style.width="64px",r.style.height="64px",r.style.objectFit="contain",t.appendChild(r);}else t.innerHTML='<div class="base-pet-card__sprite-fallback">🐾</div>';}catch{t.innerHTML='<div class="base-pet-card__sprite-fallback">🐾</div>';}}destroy(){this.root.remove(),this.contentSlot=null,this.isBuilt=false;}}class zw{constructor(t){D(this,"root");D(this,"options");D(this,"headerElement",null);D(this,"petsContainer",null);D(this,"footerElement",null);this.options=t,this.root=document.createElement("div"),this.root.className="xp-panel";}build(){return this.headerElement=document.createElement("div"),this.headerElement.className="xp-panel__header",this.root.appendChild(this.headerElement),this.petsContainer=document.createElement("div"),this.petsContainer.className="xp-panel__pets",this.root.appendChild(this.petsContainer),this.footerElement=document.createElement("div"),this.footerElement.className="xp-panel__footer",this.root.appendChild(this.footerElement),this.root}update(t){this.updateHeader(t.teamSummary),this.updatePets(t.pets),this.updateFooter(t.teamSummary,t.pets);}updateHeader(t){this.headerElement&&(t.bonusXpPerHour>0,this.headerElement.innerHTML=`
            <div class="xp-panel__header-title">
                <span class="xp-panel__header-icon">📊</span>
                <span>XP Tracker</span>
            </div>
            <div class="xp-panel__header-rate">
                <span class="xp-panel__rate-total">${t.totalXpPerHour.toLocaleString()} XP/hr</span>
            </div>
        `);}updatePets(t){if(this.petsContainer){this.petsContainer.innerHTML="";for(const n of t){const r=this.buildPetCard(n);this.petsContainer.appendChild(r);}}}buildPetCard(t){const n=document.createElement("div");n.className="xp-pet-card",t.isStarving&&n.classList.add("xp-pet-card--starving"),t.isMaxStrength&&n.classList.add("xp-pet-card--max");const r=document.createElement("div");r.className="xp-pet-card__sprite";const o=document.createElement("div");o.className="xp-pet-card__sprite-wrapper";try{const l=t.mutations;if(V.has("pet",t.species)){const u=V.toCanvas("pet",t.species,{mutations:l,scale:1,boundsMode:"padded"});u.style.width="64px",u.style.height="64px",u.style.objectFit="contain",u.style.display="block",o.appendChild(u);}else o.innerHTML='<div class="xp-pet-card__sprite-fallback">🐾</div>';}catch(l){console.warn(`[TeamXpPanel] Failed to render sprite for ${t.species}:`,l),o.innerHTML='<div class="xp-pet-card__sprite-fallback">🐾</div>';}r.appendChild(o);const a=document.createElement("div");if(a.className="xp-pet-card__badges",t.isMaxStrength&&(a.innerHTML+='<span class="xp-badge xp-badge--max">MAX</span>'),t.isStarving&&(a.innerHTML+='<span class="xp-badge xp-badge--starving">STARVING</span>'),t.xpBoostStats){const l=t.xpBoostStats.tier==="Snowy"?"❄":"⚡";a.innerHTML+=`<span class="xp-badge xp-badge--boost">${l}${t.xpBoostStats.tier}</span>`;}r.appendChild(a);const i=document.createElement("div");i.className="xp-pet-card__str-display",i.innerHTML=`
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
        `;}formatHours(t){if(t===null||t===0)return "0h";if(!isFinite(t))return "∞";if(t<1)return `${Math.ceil(t*60)}m`;if(t<24)return `${t.toFixed(1)}h`;{const n=Math.floor(t/24),r=Math.floor(t%24);return `${n}d ${r}h`}}destroy(){this.root.parentNode&&this.root.parentNode.removeChild(this.root),this.headerElement=null,this.petsContainer=null,this.footerElement=null;}}const Gw={id:"xp",label:"XP",icon:"📊",category:"stats",isAvailable:()=>true,getSummary:(e,t)=>{const n=f0(e.id);return n>=99?null:{text:`${Math.round(n)}%`,variant:n<33?"low":n<67?"medium":"high",tooltip:`Average progress to max STR: ${Math.round(n)}%`,priority:10}},buildPanel:(e,t)=>{const n=new zw({teamId:e.id});t.appendChild(n.build());const r=wr(e.id);return r&&n.update(r),{update:(o,a)=>{const i=wr(o.id);i&&n.update(i);},destroy:()=>n.destroy(),refresh:()=>{const o=wr(e.id);o&&n.update(o);}}},renderPetSlot:(e,t,n)=>{const r=ye.weather.get(),o=r.isActive?r.type:null,a=wr(t.id),i=a?.teamSummary.bonusXpPerHour||0,s=a?.pets||[],c=Math.max(0,...s.map(f=>f.hoursToMaxStrength||0)),d=Gd(e,o,i,c),l=d.isMaxStrength,u=!!d.xpBoostStats;let p="";if(l)u&&d.xpBoostStats&&(p=`
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
                `);const m=d.maxStrength-30,h=(d.currentStrength-m)/30,x=Math.min(100,Math.max(0,Math.floor(h*100))),k=e.xp%3600/3600*100,v=Math.min(99,Math.max(1,Math.floor(k))),w=d.currentStrength+1,P=d.maxStrength;p=f+`
                <div class="stat-row">
                    <span class="stat__label">NEXT STR</span>
                    <span class="stat__timer">${Gs(d.hoursToNextStrength||0)}</span>
                    <span class="stat__feeds">🍖 x${d.feedsToNextStrength}</span>
                    <span class="stat__str-label">STR ${w}</span>
                    <div class="stat__progress-mini">
                        <div class="stat__progress-fill stat__progress-fill--xp" style="width: ${v}%"></div>
                        <span class="stat__percent">${v}%</span>
                    </div>
                </div>
                <div class="stat-row">
                    <span class="stat__label">MAX STR</span>
                    <span class="stat__timer">${Gs(d.hoursToMaxStrength||0)}</span>
                    <span class="stat__feeds">🍖 x${d.feedsToMaxStrength}</span>
                    <span class="stat__str-label">STR ${P}</span>
                    <div class="stat__progress-mini">
                        <div class="stat__progress-fill stat__progress-fill--xp" style="width: ${x}%"></div>
                        <span class="stat__percent">${x}%</span>
                    </div>
                </div>
            `;}n.innerHTML=p?`<div class="xp-stats-compact">${p}</div>`:"";},shouldDisplay:(e,t)=>true},jw=`
/* ═══════════════════════════════════════════════════════════════════════════
   GROWTH STATS COMPACT - Summary Bar
   ═══════════════════════════════════════════════════════════════════════════ */

.growth-stats-compact {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

/* ═══════════════════════════════════════════════════════════════════════════
   STAT ROW - Individual Stat Display
   ═══════════════════════════════════════════════════════════════════════════ */

.stat-row {
    display: flex;
    align-items: center;
    gap: 4px; /* Tighter spacing on desktop */
    padding: 6px 8px;
    background: var(--soft);
    border: 1px solid var(--border);
    border-radius: 6px;
    flex-wrap: nowrap; /* Prevent vertical stacking on desktop */
}

.stat-row--boost {
    background: linear-gradient(90deg, var(--soft), transparent);
}

.stat__label {
    font-size: 10px;
    font-weight: 700;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    min-width: 70px;
}

.stat__timer {
    font-size: 12px;
    font-weight: 700;
    color: var(--pill-to); /* Per user: timer text */
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
    right: 4px;
    transform: translateY(-50%);
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
    color: var(--fg);
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

/* ═══════════════════════════════════════════════════════════════════════════
   DROPDOWN MENU - Gemini Scrollbar Implementation
   ═══════════════════════════════════════════════════════════════════════════ */

.growth-dropdown-menu {
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
    .stat-row {
        padding: 8px 6px;
        flex-wrap: wrap; /* Allow wrapping on mobile */
        gap: 6px;
    }

    /* Swap sprite and timer positions on mobile */
    .stat__timer {
        order: 1;
    }

    .stat__str-label {
        order: 0;
    }

    .stat__progress-mini {
        order: 2;
    }

    .stat__percent {
        order: 3;
    }

    .stat__label {
        font-size: 9px;
    }

    .stat__progress-mini {
        width: 100%;
        height: 12px; /* Slightly larger for touch */
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

    .growth-stats-compact {
        padding: 6px;
    }
}

/* ═══════════════════════════════════════════════════════════════════════════
   ACCESSIBILITY
   ═══════════════════════════════════════════════════════════════════════════ */

@media (prefers-reduced-motion: reduce) {
    .stat__progress-fill {
        transition: none;
    }
}
`;function Ir(e){if(e<=0)return "Ready!";const t=Math.floor(e/1e3),n=Math.floor(t/60),r=Math.floor(n/60);if(r>=24){const o=Math.floor(r/24),a=r%24;return `${o}d ${a}h`}if(r>=1){const o=n%60;return `${r}h ${o}m`}if(n>=1){const o=t%60;return `${n}m ${o}s`}return `${t}s`}function $e(e,t,n){const r=document.createElement(e);return t&&(r.className=t),n&&(r.textContent=n),r}function Er(e,t){const n=e==="egg"?"pet":"plant";let o=t||(e==="egg"?"UncommonEgg":"Carrot");e==="plant"&&(o==="DawnCelestial"&&(o="DawnCelestialCrop"),o==="MoonCelestial"&&(o="MoonCelestialCrop"));const a=$e("span","sprite-wrapper");try{if(V.isReady()&&V.has(n,o)){const i=V.toCanvas(n,o,{scale:.3});return i.style.height="16px",i.style.width="auto",i.style.imageRendering="pixelated",a.appendChild(i),a}}catch{}return a.textContent=e==="egg"?"🥚":"🌱",a}function Zs(e,t){const n=$e("span","stacked-sprites");if(t.length===0)return n.textContent=e==="egg"?"🥚":"🌱",n;const r=e==="egg"?"pet":"plant",o=4,i=[...new Set(t.map(c=>e==="egg"?c.eggId:c.species).filter(Boolean))].slice(0,o);if(i.length===0)return n.textContent=e==="egg"?"🥚":"🌱",n;n.style.display="grid",n.style.gridTemplateColumns="repeat(2, 10px)",n.style.gridTemplateRows="repeat(2, 10px)",n.style.width="24px",n.style.height="24px";let s=false;for(let c=0;c<i.length;c++){let d=i[c];e==="plant"&&d&&(d==="DawnCelestial"&&(d="DawnCelestialCrop"),d==="MoonCelestial"&&(d="MoonCelestialCrop"));try{if(V.isReady()&&d&&V.has(r,d)){const l=V.toCanvas(r,d,{scale:.2});l.style.height="14px",l.style.width="auto",l.style.imageRendering="pixelated",l.style.position="relative",l.style.zIndex=String(o-c),n.appendChild(l),s=!0;}}catch{}}return s||(n.textContent=e==="egg"?"🥚":"🌱"),n}function Ht(e,t,n,r,o){const a=$e("div","stat-row"),i=$e("span","stat__label",e),s=$e("span","stat__timer",t),c=$e("span","stat__str-label");c.appendChild(n);const d=$e("div","stat__progress-mini"),l=$e("div",`stat__progress-fill ${o}`);l.style.width=`${r}%`,d.appendChild(l);const u=$e("span","stat__percent",`${r}%`);return d.appendChild(u),a.appendChild(i),a.appendChild(c),a.appendChild(s),a.appendChild(d),a}function Yo(e){const t=$e("div","stat-row stat-row--boost"),n=$e("span","stat__label","BOOST"),r=$e("span","stat__value stat__value--accent",e);return t.appendChild(n),t.appendChild(r),t}function el(e,t){const n=t==="egg"?jn:Hn;for(const r of e.abilities)if(r in n)return {hasBoost:true,minutesPerProc:n[r].minutesPerProc,abilityName:r};return {hasBoost:false,minutesPerProc:0,abilityName:""}}function qo(e,t){return e.length===0?0:Math.round(e.reduce((n,r)=>{const o=r.maturedAt-r.plantedAt,a=t-r.plantedAt;return n+Math.min(100,Math.max(0,a/o*100))},0)/e.length)}function Jo(e,t){return e.length===0?0:Math.round(e.reduce((n,r)=>{const o=r.endTime-r.startTime,a=t-r.startTime;return n+Math.min(100,Math.max(0,a/o*100))},0)/e.length)}function tl(e,t){if(e.length===0)return {remainingMs:0,name:null};const r=[...e].sort((o,a)=>o.maturedAt-a.maturedAt)[0];return {remainingMs:Math.max(0,r.maturedAt-t),name:r.eggId||null}}function nl(e,t){if(e.length===0)return {remainingMs:0,name:null};const r=[...e].sort((o,a)=>o.endTime-a.endTime)[0];return {remainingMs:Math.max(0,r.endTime-t),name:r.species||null}}const Hw={id:"growth",label:"Growth",icon:"⏱️",category:"tracking",isAvailable:()=>true,getSummary:(e,t)=>{const n=ye.myGarden.get(),r=n.eggs.growing.length+n.plants.growing.length;return r===0?null:{text:`${r} growing`,variant:"neutral",tooltip:`${n.eggs.growing.length} eggs, ${n.plants.growing.length} plants`,priority:8}},buildPanel:(e,t)=>({update:()=>{},destroy:()=>{},refresh:()=>{}}),renderPetSlot:(e,t,n)=>{if(!document.getElementById("growth-panel-styles")){const l=document.createElement("style");l.id="growth-panel-styles",l.textContent=jw,document.head.appendChild(l);}const r=ye.myGarden.get(),o=Date.now(),a=el(e,"egg"),i=el(e,"plant");if(n.innerHTML="",!a.hasBoost&&!i.hasBoost)return;const s=r.eggs.growing,c=r.crops.growing,d=$e("div","growth-stats-compact");if(a.hasBoost&&i.hasBoost){d.appendChild(Yo(`+${a.minutesPerProc}min (egg) +${i.minutesPerProc}min (plant)`));const l=tl(s,o),u=qo(s,o);d.appendChild(Ht("NEXT EGG",Ir(l.remainingMs),Er("egg",l.name),u,"stat__progress-fill--egg"));const p=nl(c,o),f=Jo(c,o);d.appendChild(Ht("NEXT PLANT",Ir(p.remainingMs),Er("plant",p.name),f,"stat__progress-fill--plant"));}else if(a.hasBoost){d.appendChild(Yo(`+${a.minutesPerProc}min/proc`));const l=tl(s,o),u=qo(s,o);d.appendChild(Ht("NEXT EGG",Ir(l.remainingMs),Er("egg",l.name),u,"stat__progress-fill--egg"));const p=qo(s,o);d.appendChild(Ht("ALL EGGS",`${s.length} total`,Zs("egg",s),p,"stat__progress-fill--egg"));}else if(i.hasBoost){d.appendChild(Yo(`+${i.minutesPerProc}min/proc`));const l=nl(c,o),u=Jo(c,o);d.appendChild(Ht("NEXT PLANT",Ir(l.remainingMs),Er("plant",l.name),u,"stat__progress-fill--plant"));const p=Jo(c,o);d.appendChild(Ht("ALL PLANTS",`${c.length} total`,Zs("plant",c),p,"stat__progress-fill--plant"));}n.appendChild(d);},shouldDisplay:(e,t)=>Ia(t)||Ea(t)},Ww=[Gw,Hw],be={XP_BOOST:["PetXpBoost","PetXpBoostII","PetXpBoostIII","SnowyPetXpBoost"],COIN_FINDER:["CoinFinderI","CoinFinderII","CoinFinderIII","SnowyCoinFinder"],SELL_BOOST:["SellBoostI","SellBoostII","SellBoostIII","SellBoostIV"],CROP_REFUND_HARVEST:["ProduceRefund","DoubleHarvest"],PLANT_GROWTH:["PlantGrowthBoost","PlantGrowthBoostII","PlantGrowthBoostIII","SnowyPlantGrowthBoost"],CROP_SIZE:["ProduceScaleBoost","ProduceScaleBoostII","ProduceScaleBoostIII","SnowyCropSizeBoost"],CROP_MUTATION:["ProduceMutationBoost","ProduceMutationBoostII","ProduceMutationBoostIII","SnowyCropMutationBoost"],EGG_GROWTH:["EggGrowthBoost","EggGrowthBoostII_NEW","EggGrowthBoostII","SnowyEggGrowthBoost"],HUNGER_BOOST:["HungerBoost","HungerBoostII","HungerBoostIII","SnowyHungerBoost"],HUNGER_RESTORE:["HungerRestore","HungerRestoreII","HungerRestoreIII","SnowyHungerRestore"],RARE_GRANTERS:["FrostGranter","GoldGranter","RainbowGranter"],COMMON_GRANTERS:["RainDance","SnowGranter"],MAX_STR_BOOST:["PetHatchSizeBoost","PetHatchSizeBoostII","PetHatchSizeBoostIII"],HATCH_XP:["PetAgeBoost","PetAgeBoostII","PetAgeBoostIII"],PET_MUTATION:["PetMutationBoost","PetMutationBoostII","PetMutationBoostIII"],DOUBLE_HATCH:["DoubleHatch"],PET_REFUND:["PetRefund","PetRefundII"]};function Uw(e,t){return e.abilities.some(n=>t.includes(n))}function Ce(e,t){return e.filter(n=>Uw(n,t)).length}function Vw(e){return e.includes("IV")?4:e.includes("III")||e==="EggGrowthBoostII"?3:e.includes("II")||e.includes("_NEW")?2:1}function Wt(e,t){const n=e.flatMap(r=>r.abilities.filter(o=>t.includes(o))).map(Vw);return n.length===0?0:n.reduce((r,o)=>r+o,0)/n.length}function rl(e){const t=Td(e);if(t.length===0)return {primary:"unknown",confidence:0,secondary:[],suggestedFeatures:[],reasons:["Team has no pets"]};const n=[],r={},o=Ce(t,be.XP_BOOST),a=t.filter(R=>R.currentStrength<R.maxStrength).length;if(o>=2){const R=Wt(t,be.XP_BOOST);r["xp-farming"]=.75+R*.05,n.push(`${o} XP Boost pets (avg tier ${R.toFixed(1)})`);}else o===1&&a>=1?(r["xp-farming"]=.7,n.push(`1 XP Boost pet with ${a} leveling pet(s)`)):a>=2&&(r["xp-farming"]=.5,n.push(`${a} pets below max STR`));const i=Ce(t,be.COIN_FINDER),s=Ce(t,be.SELL_BOOST),c=Ce(t,be.CROP_REFUND_HARVEST);if(i>=1){const R=Wt(t,be.COIN_FINDER);r["coin-farming"]=Math.max(r["coin-farming"]||0,.65+R*.05),n.push(`${i} Coin Finder pet(s) (tier ${R.toFixed(1)})`);}s>=1&&c>=1?(r["coin-farming"]=Math.max(r["coin-farming"]||0,.85),n.push("Sell Boost + Crop Refund/Double Harvest combo")):c>=1&&(r["coin-farming"]=Math.max(r["coin-farming"]||0,.75),n.push("Crop Refund or Double Harvest (coin efficiency)"));const d=Ce(t,be.RARE_GRANTERS),l=Ce(t,be.COMMON_GRANTERS),u=Ce(t,be.PLANT_GROWTH),p=Ce(t,be.CROP_MUTATION),f=Ce(t,be.CROP_SIZE);if(d>=1){const R=t.some($=>$.abilities.includes("RainbowGranter")),E=t.some($=>$.abilities.includes("GoldGranter"));R?(r["crop-farming"]=Math.max(r["crop-farming"]||0,.95),n.push("Rainbow Granter (ultra-rare, intentional)")):E?(r["crop-farming"]=Math.max(r["crop-farming"]||0,.9),n.push("Gold Granter (ultra-rare)")):(r["crop-farming"]=Math.max(r["crop-farming"]||0,.75),n.push("Frost Granter (rare mutation)"));}const g=u+p+f+l;if(g>=2){const R=(Wt(t,be.PLANT_GROWTH)+Wt(t,be.CROP_MUTATION)+Wt(t,be.CROP_SIZE))/3;r["crop-farming"]=Math.max(r["crop-farming"]||0,.7+R*.03),n.push(`${g} crop-related abilities`);}const m=Ce(t,be.EGG_GROWTH);if(m>=1&&(r["time-reduction"]=.7,n.push(`${m} Egg Growth Boost pet(s)`)),u>=1&&!r["crop-farming"]&&(r["time-reduction"]=Math.max(r["time-reduction"]||0,.5),n.push("Plant Growth Boost (crop speed)")),d>=1||p>=1){const R=t.some($=>$.abilities.includes("RainbowGranter")),E=t.some($=>$.abilities.includes("GoldGranter"));R||E?(r["mutation-hunting"]=.95,n.push(`${R?"Rainbow":"Gold"} Granter (mutation focus)`)):p>=1&&(r["mutation-hunting"]=.8,n.push("Crop Mutation Boost (targeted hunting)"));}const h=Ce(t,be.HUNGER_BOOST),x=Ce(t,be.HUNGER_RESTORE);h>=1&&x>=1?(r.efficiency=.85,n.push("Hunger Boost + Hunger Restore (long-term setup)")):(h>=1||x>=1)&&(r.efficiency=.6,n.push("Hunger management (reduced feeding)"));const k=i+d+l;k>=2&&(r.efficiency=Math.max(r.efficiency||0,.6),n.push(`${k} passive abilities (passive gains)`));const v=Ce(t,be.MAX_STR_BOOST),w=Ce(t,be.HATCH_XP),P=Ce(t,be.PET_MUTATION),y=Ce(t,be.DOUBLE_HATCH),C=Ce(t,be.PET_REFUND);if(v>=1){const R=Wt(t,be.MAX_STR_BOOST);r.hatching=.85+R*.05,n.push(`Max Strength Boost (tier ${R.toFixed(1)}) - late-game meta`);}if(P>=1||y>=1||C>=1){const R=P+y+C;r.hatching=Math.max(r.hatching||0,.7+R*.05),n.push(`${R} rainbow hunting abilities`);}w>=1&&!r.hatching&&(r.hatching=.5,n.push("Hatch XP Boost (early-game focus)"));const T=Object.entries(r).sort(([,R],[,E])=>E-R);if(T.length===0)return {primary:"balanced",confidence:.3,secondary:[],suggestedFeatures:["xp"],reasons:["Mixed or unclear purpose"]};const[S,A]=T[0],I=T.slice(1).map(([R,E])=>({purpose:R,confidence:E}));return {primary:S,confidence:A,secondary:I,suggestedFeatures:{"xp-farming":["xp"],"coin-farming":["coin","crop","xp"],"crop-farming":["crop","mutation","xp"],"time-reduction":["timer","xp"],"mutation-hunting":["mutation","crop","xp"],efficiency:["efficiency","hunger","xp"],hatching:["hatch","mutation","xp"],balanced:["xp","ability"],unknown:["xp"]}[S]||["xp"],reasons:n}}async function Xw(){try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;const t=new e,n=t.currentTime,r=t.createOscillator(),o=t.createGain();r.connect(o),o.connect(t.destination),r.type="sine",r.frequency.setValueAtTime(800,n),r.frequency.exponentialRampToValueAtTime(400,n+.03),o.gain.setValueAtTime(.12,n),o.gain.exponentialRampToValueAtTime(.001,n+.05),r.start(n),r.stop(n+.05),setTimeout(()=>t.close(),100);}catch{}}function Kw(e={}){const{id:t,variant:n="default",size:r="md",round:o=false,sprite:a=null,onClick:i,disabled:s=false,playSound:c=true,tooltip:d}=e,l=b("button",{className:"gemini-icon-btn",id:t});l.type="button",n!=="default"&&l.classList.add(`gemini-icon-btn--${n}`),r!=="md"&&l.classList.add(`gemini-icon-btn--${r}`),o&&l.classList.add("gemini-icon-btn--round"),d&&(l.title=d),l.disabled=s;const u=b("span",{className:"gemini-icon-btn__content"});l.appendChild(u),a&&u.appendChild(a);const p=b("span",{className:"gemini-icon-btn__swap"});p.textContent="⇄",l.appendChild(p),l.addEventListener("click",async g=>{l.disabled||(c&&Xw(),i?.(g));});const f=l;return f.setSprite=g=>{u.innerHTML="",g&&u.appendChild(g);},f.setVariant=g=>{l.classList.remove("gemini-icon-btn--default","gemini-icon-btn--plant","gemini-icon-btn--egg"),g!=="default"&&l.classList.add(`gemini-icon-btn--${g}`);},f.setDisabled=g=>{l.disabled=g;},f}const Yw=`
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
`;class qw{constructor(t){D(this,"expandedTeams",new Map);D(this,"featureUpdateInterval",null);D(this,"options");this.options=t;}isExpanded(t){return this.expandedTeams.has(t)}toggle(t){this.expandedTeams.has(t)?this.collapse(t):this.expand(t);}expand(t){const n=this.options.getListContainer(),r=ce.getTeam(t);if(!r||!n)return;const o=ce.getPetsForTeam(r),a=ye.myPets.get(),i=Ww.filter(f=>!(!f.isAvailable()||f.shouldDisplay&&!f.shouldDisplay(r,o)));if(i.length===0){console.warn("[TeamCardExpansion] No available features to display");return}const s=b("div",{className:"team-expanded-container"}),c=[];for(let f=0;f<3;f++){const g=r.petIds[f],m=g?a.all.find(A=>A.id===g)??null:null,h=i.find(A=>A.id==="xp")||i[0],x=b("div",{className:"expanded-pet-row"}),k=b("div",{className:"pet-row__header"}),v=b("button",{textContent:"<",className:"pet-row__nav"}),w=b("div",{textContent:`${h.icon} ${h.label.toUpperCase()}`,className:"pet-label"}),P=b("button",{textContent:">",className:"pet-row__nav"});let y=null;m&&(y=new Dw(m));const C=A=>{const I=i[A];if(w.textContent=`${I.icon} ${I.label.toUpperCase()}`,y&&m){const R=y.getContentSlot();R.innerHTML="",I.renderPetSlot&&I.renderPetSlot(m,r,R);const E=m.currentStrength>=m.maxStrength,$=R.children.length>0||R.textContent.trim().length>0;y.setCentered(E&&!$);}const F=c.find(R=>R.slotIndex===f);F&&(F.currentFeatureId=I.id,F.featureData=I),k.className=`pet-row__header pet-row__header--${I.id}`;};k.className=`pet-row__header pet-row__header--${h.id}`;let T=i.findIndex(A=>A.id===h.id);v.addEventListener("click",A=>{A.stopPropagation(),T=(T-1+i.length)%i.length,C(T);}),P.addEventListener("click",A=>{A.stopPropagation(),T=(T+1)%i.length,C(T);}),k.appendChild(v),k.appendChild(w),k.appendChild(P);let S;if(y&&m){if(S=y.build(),h.renderPetSlot){const A=y.getContentSlot();h.renderPetSlot(m,r,A);const I=m.currentStrength>=m.maxStrength,F=A.children.length>0||A.textContent.trim().length>0;y.setCentered(I&&!F);}k.className=`pet-row__header pet-row__header--${h.id}`;}else S=b("div",{className:"pet-row__content pet-row__content--empty"}),S.innerHTML=`
                    <div class="pet-row__sprite"><div class="pet-row__empty-slot">Empty</div></div>
                    <div class="pet-row__info"><span class="pet-row__empty-text">No pet assigned</span></div>
                `;x.appendChild(k),x.appendChild(S),s.appendChild(x),c.push({slotIndex:f,currentFeatureId:h.id,shell:y,container:x,featureData:h});}const d=rl(r)?.primary==="time-reduction"||Ia(o)||Ea(o);this.expandedTeams.set(t,{cards:c,expandedAt:Date.now(),container:s,growthViewType:d?"plant":void 0}),this.addProgressBar(s,o,t);const u=ce.getAllTeams().findIndex(f=>f.id===t),p=Array.from(n.children).filter(f=>f instanceof HTMLElement&&f.classList.contains("team-list-item"));u!==-1&&u<p.length&&p[u].insertAdjacentElement("afterend",s),this.startUpdates();}collapse(t){const n=this.expandedTeams.get(t);if(n){for(const r of n.cards)r.shell&&r.shell.destroy();n.container.remove(),this.expandedTeams.delete(t),this.expandedTeams.size===0&&this.stopUpdates();}}cleanupAll(){const t=Array.from(this.expandedTeams.keys());for(const n of t)this.collapse(n);}destroy(){this.cleanupAll(),this.stopUpdates();}addProgressBar(t,n,r){const o=ce.getTeam(r);(o?rl(o):null)?.primary==="time-reduction"||Ia(n)||Ea(n)?this.renderGrowthSummaryBar(t,n,r):this.addXpProgressBar(t,n);}addXpProgressBar(t,n){if(n.some(o=>o.currentStrength<o.maxStrength)&&n.length>0){const o=Math.round(n.reduce((d,l)=>d+l.currentStrength/l.maxStrength,0)/n.length*100),a=b("div",{className:"team-progress-bar"}),i=o<33?"low":o<67?"medium":"high",s=b("div",{className:`team-progress-bar__fill team-progress-bar__fill--${i}`});s.style.width=`${o}%`;const c=b("div",{className:"team-progress-bar__percent",textContent:`${o}%`});a.appendChild(s),a.appendChild(c),t.prepend(a);}}renderGrowthSummaryBar(t,n,r){const o=this.expandedTeams.get(r),a=o?.growthViewType||"plant",i=ye.myGarden.get(),s=Date.now(),c=a==="egg"?i.eggs.growing:i.crops.growing,d=c.length,l=v0(n),u=w0(n),p=js(l).timeReductionPerHour,f=js(u).timeReductionPerHour,g=Math.round(a==="egg"?p:f);let m=0;d>0&&(m=Math.round(c.reduce((E,$)=>{const te=a==="egg"?$.plantedAt:$.startTime,H=(a==="egg"?$.maturedAt:$.endTime)-te,G=s-te,N=Math.min(100,Math.max(0,G/H*100));return E+N},0)/d));let h=c.find(E=>E.tileIndex===o?.pinnedItemId);!h&&d>0&&(h=[...c].sort((E,$)=>{const te=a==="egg"?E.maturedAt:E.endTime,z=a==="egg"?$.maturedAt:$.endTime;return te-z})[0]);const x=b("div",{className:"growth-summary-overhaul"}),k=b("div",{className:`team-progress-bar team-progress-bar--${a}`}),v=b("div",{className:`team-progress-bar__fill team-progress-bar__fill--${a}`});v.style.width=`${m}%`;const w=E=>{const $=Math.floor(E/60),te=E%60;return $>0&&te>0?`${$}h ${te}m/h`:$>0?`${$}h/h`:`${te}m/h`},P=b("div",{className:"team-progress-bar__overlay"});P.innerHTML=`
            <span class="bar-percent">${m}%</span>
            <span class="bar-info">${d} growing +${w(g)}</span>
        `,k.appendChild(v),k.appendChild(P);const y=b("div",{className:"growth-next-item"});if(h){let E=a==="egg"?h.eggId:h.species;const $=a==="egg"?"pet":"plant";a==="plant"&&E&&(E==="DawnCelestial"&&(E="DawnCelestialCrop"),E==="MoonCelestial"&&(E="MoonCelestialCrop"));const te=a==="egg"?h.maturedAt:h.endTime,z=Math.max(0,te-s),H=new Date(te),G=H.getDate()!==new Date().getDate(),N=H.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}).toLowerCase(),O=`${G?"Tomorrow ":""}${N}`,j=W=>{const pe=Math.floor(W/1e3),K=Math.floor(pe/60),q=Math.floor(K/60);return q>0?`${q}h ${K%60}m ${pe%60}s`:K>0?`${K}m ${pe%60}s`:`${pe}s`},B=b("div",{className:"growth-next-sprite"});try{if(V.isReady()&&V.has($,E)){const W=V.toCanvas($,E,{scale:.3});W.style.height="20px",W.style.width="auto",W.style.imageRendering="pixelated",B.appendChild(W);}else B.textContent=a==="egg"?"🥚":"🌱";}catch(W){console.warn("[GrowthSummary] Sprite error:",W),B.textContent=a==="egg"?"🥚":"🌱";}y.innerHTML=`
                <div class="growth-next-details">
                    <span class="growth-next-time">${j(z)}</span>
                    <span class="growth-next-date">| ${O}</span>
                </div>
            `,y.prepend(B);}else y.innerHTML='<span class="empty-text">No items growing</span>';const C=b("div",{className:"growth-overhaul-controls"}),T=a==="egg"?"UncommonEgg":"Carrot",S=a==="egg"?"pet":"plant";let A=null;try{V.isReady()&&V.has(S,T)&&(A=V.toCanvas(S,T,{scale:.35}));}catch{}const I=Kw({variant:a==="egg"?"egg":"plant",sprite:A,playSound:true,tooltip:`Switch to ${a==="egg"?"plants":"eggs"}`,onClick:E=>{E.stopPropagation(),o&&(o.growthViewType=a==="egg"?"plant":"egg",o.pinnedItemId=void 0,this.updateGrowthSummary(r));}}),F=b("button",{className:"growth-dropdown-overhaul",textContent:"▼"});F.onclick=E=>{E.stopPropagation(),this.showGrowthDropdown(F,c,a,r);},C.appendChild(I),C.appendChild(F),x.appendChild(k),x.appendChild(y),x.appendChild(C);const R=t.querySelector(".growth-summary-overhaul");R?R.replaceWith(x):t.prepend(x);}updateGrowthSummary(t){const n=this.expandedTeams.get(t);if(n){const r=ce.getTeam(t),o=r?ce.getPetsForTeam(r):[];this.renderGrowthSummaryBar(n.container,o,t);}}showGrowthDropdown(t,n,r,o){const a=t.closest(".growth-summary-overhaul")?.querySelector(".growth-dropdown-menu");if(a){a.remove();return}const i=b("div",{className:"growth-dropdown-menu"});if(n.length===0){const d=b("div",{className:"growth-dropdown-option"});d.textContent="No items growing",i.appendChild(d);}else {const d=r==="egg"?"pet":"plant";n.forEach(l=>{const u=l.tileIndex;let p=r==="egg"?l.eggId:l.species;r==="plant"&&(p==="DawnCelestial"&&(p="DawnCelestialCrop"),p==="MoonCelestial"&&(p="MoonCelestialCrop"));const f=b("div",{className:"growth-dropdown-option"}),g=b("span",{className:"dropdown-sprite"});try{if(V.isReady()&&V.has(d,p)){const v=V.toCanvas(d,p,{scale:.3});v.style.height="16px",v.style.width="auto",v.style.imageRendering="pixelated",g.appendChild(v);}else g.textContent=r==="egg"?"🥚":"🌱";}catch{g.textContent=r==="egg"?"🥚":"🌱";}const m=r==="egg"?l.maturedAt:l.endTime,x=new Date(m).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}).toLowerCase(),k=b("span",{className:"dropdown-text"});k.textContent=`${p} - ${x}`,f.appendChild(g),f.appendChild(k),f.onclick=v=>{v.stopPropagation();const w=this.expandedTeams.get(o);w&&(w.pinnedItemId=u,this.updateGrowthSummary(o)),i.remove();},i.appendChild(f);});}i.style.position="absolute",i.style.top="100%",i.style.right="0",i.style.marginTop="4px",i.style.zIndex="100";const s=t.parentElement;s&&(s.style.position="relative",s.appendChild(i));const c=d=>{!i.contains(d.target)&&d.target!==t&&(i.remove(),document.removeEventListener("click",c,true));};setTimeout(()=>document.addEventListener("click",c,true),10);}startUpdates(){if(this.featureUpdateInterval!==null)return;const n=De.detect().platform==="mobile"?8e3:5e3;this.featureUpdateInterval=setInterval(()=>{this.updateAllFeatures();},n);}stopUpdates(){this.featureUpdateInterval!==null&&(clearInterval(this.featureUpdateInterval),this.featureUpdateInterval=null);}updateAllFeatures(){const t=ye.myPets.get();for(const[n,r]of this.expandedTeams){const o=ce.getTeam(n);if(o)for(const a of r.cards){const i=o.petIds[a.slotIndex],s=i?t.all.find(c=>c.id===i):null;if(s&&a.shell&&(a.shell.update(s),a.featureData.renderPetSlot))try{const c=a.shell.getContentSlot();a.featureData.renderPetSlot(s,o,c);const d=s.currentStrength>=s.maxStrength,l=c.children.length>0||c.textContent.trim().length>0;a.shell.setCentered(d&&!l);}catch(c){console.error(`[TeamCardExpansion] Failed to render slot for ${s.id}:`,c);}}}}}class Jw{constructor(t={}){D(this,"card",null);D(this,"modeControl",null);D(this,"modeContainer",null);D(this,"teamContent",null);D(this,"listContainer",null);D(this,"teamMode","overview");D(this,"selectedTeamIds",new Set);D(this,"teamCheckboxes",new Map);D(this,"options");D(this,"dragHandler");D(this,"expansionHandler");this.options=t,this.dragHandler=new $w({getListContainer:()=>this.listContainer,onReorder:n=>this.options.onTeamReordered?.(n)}),this.expansionHandler=new qw({getListContainer:()=>this.listContainer});}build(){return this.card?this.card:this.createTeamCard()}destroy(){this.dragHandler.cleanup(),this.expansionHandler.destroy(),this.modeControl&&(this.modeControl.destroy(),this.modeControl=null),this.teamCheckboxes.forEach(t=>t.destroy()),this.teamCheckboxes.clear(),this.selectedTeamIds.clear(),this.card=null,this.modeContainer=null,this.teamContent=null,this.listContainer=null;}render(){if(!this.card)return;if(!ce.isEnabled()){this.renderDisabledState();return}this.modeContainer&&(this.modeContainer.style.display="flex"),this.ensureModeControl(),this.renderTeamContent();}createTeamCard(){const t=b("div",{className:"team-card-wrapper"});this.modeContainer=b("div",{className:"team-card__mode-container"}),t.appendChild(this.modeContainer),this.teamContent=b("div",{className:"team-card__content"}),t.appendChild(this.teamContent);const n=Ke({title:"Team",subtitle:"Organize and switch between pet teams",expandable:true,defaultExpanded:true},t);return this.card=n,n}ensureModeControl(){if(this.modeContainer){if(!this.modeControl){this.modeControl=Lw({segments:[{id:"overview",label:"Overview"},{id:"manage",label:"Manage"}],selected:this.teamMode,onChange:t=>{this.teamMode=t,this.renderTeamContent();}}),this.modeContainer.appendChild(this.modeControl);return}this.modeControl.getSelected()!==this.teamMode&&this.modeControl.select(this.teamMode);}}renderDisabledState(){if(!this.teamContent)return;this.dragHandler.cleanup(),this.listContainer=null,this.modeContainer&&(this.modeContainer.style.display="none");const t=b("div",{className:"team-card__disabled-state"}),n=b("div",{textContent:"Pet Team feature is disabled",className:"team-card__disabled-message"}),r=At({label:"Enable Feature",onClick:()=>{ce.setEnabled(true),this.render();}});t.appendChild(n),t.appendChild(r),this.teamContent.replaceChildren(t);}renderTeamContent(){if(!this.teamContent)return;this.dragHandler.cleanup(),this.listContainer=null,this.teamContent.replaceChildren(),this.teamCheckboxes.forEach(r=>r.destroy()),this.teamCheckboxes.clear(),this.selectedTeamIds.clear();const t=ce.getAllTeams(),n=ce.getActiveTeamId();if(t.length===0){this.renderEmptyState();return}this.listContainer=b("div",{className:"team-card__list-container"}),t.forEach(r=>{const o=n===r.id;let a;this.teamMode==="manage"&&(a=this.createCheckboxIndicator(r.id));const i=Ew({team:r,isActive:o,customIndicator:a?.root,hideDragHandle:this.teamMode==="manage",isNameEditable:this.teamMode==="manage",showSlotStyles:this.teamMode==="manage",onNameChange:s=>{this.handleRenameTeam(r.id,s);},onSlotClick:this.teamMode==="manage"?s=>{this.handleRemovePet(r.id,s);}:void 0,isExpanded:this.teamMode==="overview"?this.expansionHandler.isExpanded(r.id):void 0,onExpandClick:this.teamMode==="overview"?()=>{this.expansionHandler.toggle(r.id);}:void 0});this.teamMode==="manage"&&i.classList.add("team-list-item--manage"),this.teamMode==="overview"&&(i.addEventListener("click",async s=>{const c=s.target.closest(".team-list-item__drag-handle"),d=s.target.closest(".team-list-item__expand");if(!(c||d)){i.classList.add("team-list-item--clicked"),setTimeout(()=>{i.classList.remove("team-list-item--clicked");},300);try{await ce.activateTeam(r);}catch(l){console.error("[TeamCard] Failed to activate team:",l);}}}),i.addEventListener("pointerdown",s=>{if(s.button!==0)return;s.target.closest(".team-list-item__drag-handle")?this.dragHandler.startDrag(s,i,r.id):this.dragHandler.startLongPress(s,i,r.id);})),this.listContainer.appendChild(i);}),this.teamContent.appendChild(this.listContainer),this.teamMode==="manage"&&this.renderManageActions();}renderEmptyState(){if(!this.teamContent)return;const t=b("div",{textContent:"No teams yet. Create your first team!",className:"team-card__empty-state"});if(this.teamContent.appendChild(t),this.teamMode==="manage"){const n=b("div",{className:"team-card__actions"}),r=At({label:"New Team",variant:"primary",onClick:()=>{this.handleCreateTeam();}});n.appendChild(r),this.teamContent.appendChild(n);}}renderManageActions(){if(!this.teamContent)return;const t=b("div",{className:"team-card__actions"}),n=At({label:"New Team",variant:"primary",onClick:()=>{this.handleCreateTeam();}}),r=At({label:"Delete Team",variant:"danger",disabled:this.selectedTeamIds.size===0,onClick:()=>{this.handleDeleteTeam();}});r.setAttribute("data-action","delete-team"),t.appendChild(n),t.appendChild(r),this.teamContent.appendChild(t);}handleCreateTeam(){const t="New Team";let n=t,r=1;const o=ce.getAllTeams(),a=new Set(o.map(i=>i.name));for(;a.has(n);)n=`${t} (${r})`,r++;try{ce.createTeam(n,[])&&this.render();}catch{}}handleDeleteTeam(){if(this.selectedTeamIds.size===0)return;const t=Array.from(this.selectedTeamIds);for(const n of t)ce.deleteTeam(n);this.render();}handleRenameTeam(t,n){ce.renameTeam(t,n);}handleRemovePet(t,n){const r=ce.getTeam(t);if(!r)return;const o=r.petIds[n];!o||o===""?this.handleAddPet(t,n):this.handleRemovePetFromSlot(t,n);}handleRemovePetFromSlot(t,n){const r=ce.getTeam(t);if(!r)return;const o=[...r.petIds];o[n]="",ce.updateTeam(t,{petIds:o}),this.render();}async handleAddPet(t,n){const r=ce.getTeam(t);if(!r)return;const a=ye.myPets.get().all.map(f=>({id:f.id,itemType:"Pet",petSpecies:f.petSpecies,name:f.name??null,xp:f.xp,hunger:f.hunger,mutations:f.mutations||[],targetScale:f.targetScale,abilities:f.abilities||[]})),i=new Set(r.petIds.filter(f=>f!=="")),s=a.filter(f=>!i.has(f.id));await ue.set("myPossiblyNoLongerValidSelectedItemIndexAtom",null);const c=De.detect();(c.platform==="mobile"||c.viewportWidth<768)&&this.options.setHUDOpen&&this.options.setHUDOpen(false);const l=ye.myInventory.subscribeSelection(f=>{if(f.current&&f.current.item){const g=f.current.item,m=[...r.petIds];m[n]=g.id,ce.updateTeam(t,{petIds:m}),ue.set("myPossiblyNoLongerValidSelectedItemIndexAtom",null),Xt.close().then(()=>{const h=De.detect();(h.platform==="mobile"||h.viewportWidth<768)&&this.options.setHUDOpen&&this.options.setHUDOpen(true),this.render();});}});await Xt.show("inventory",{items:s,favoritedItemIds:[]}),await Xt.waitForClose();const u=De.detect();(u.platform==="mobile"||u.viewportWidth<768)&&this.options.setHUDOpen&&this.options.setHUDOpen(true),l();}createCheckboxIndicator(t){const n=Fw({checked:this.selectedTeamIds.has(t),size:"md",onChange:r=>{r?this.selectedTeamIds.add(t):this.selectedTeamIds.delete(t),this.updateDeleteButtonState();}});return this.teamCheckboxes.set(t,n),n}updateDeleteButtonState(){const t=this.teamContent?.querySelector('[data-action="delete-team"]');t&&(t.disabled=this.selectedTeamIds.size===0);}}class Qw{constructor(){D(this,"card",null);D(this,"listContainer",null);D(this,"logs",[]);D(this,"filteredLogs",[]);D(this,"unsubscribe",null);}build(){return this.card?this.card:this.createAbilityLogsCard()}destroy(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null),this.card=null,this.listContainer=null,this.logs=[],this.filteredLogs=[];}async render(){const t=sn();this.unsubscribe=t.subscribe(n=>{this.updateFromAbilityLogs(n.abilityLogs);});}updateFromAbilityLogs(t){if(!t||!Array.isArray(t)){this.logs=[],this.filteredLogs=[],this.updateList();return}this.logs=t.map(n=>{const a=oe.get("abilities")?.[n.abilityId]?.name||n.abilityId||"Unknown Ability",i={action:n.abilityId,timestamp:n.performedAt,parameters:n.data||{}},s=Hl(i);return {timestamp:n.performedAt,petName:n.petName,petSpecies:n.petSpecies,abilityName:a,abilityId:n.abilityId,description:s}}),this.filteredLogs=[...this.logs],this.updateList();}createAbilityBadge(t,n){return ho({variant:"ability",abilityId:t,abilityName:n}).root}createAbilityLogsCard(){const t=b("div",{className:"ability-logs-container",style:"display: flex; flex-direction: column; gap: 12px;"}),n=b("div",{style:"margin-bottom: 0;"}),r=Wa({placeholder:"Search logs...",value:"",debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:o=>{const a=o.trim().toLowerCase();a?this.filteredLogs=this.logs.filter(i=>i.petName.toLowerCase().includes(a)||i.petSpecies.toLowerCase().includes(a)||i.abilityName.toLowerCase().includes(a)||i.description.toLowerCase().includes(a)):this.filteredLogs=[...this.logs],this.updateList();}});return n.appendChild(r.root),t.appendChild(n),this.listContainer=b("div",{className:"ability-logs-list",style:"display: flex; flex-direction: column; gap: 8px; max-height: 480px; overflow-y: auto; overflow-x: hidden;"}),t.appendChild(this.listContainer),this.card=Ke({title:"Ability Logs",subtitle:"Track all pet ability activations",expandable:true,defaultExpanded:true},t),this.card}updateList(){if(!this.listContainer)return;this.listContainer.replaceChildren();const t=[...this.filteredLogs].sort((n,r)=>r.timestamp-n.timestamp);if(t.length===0){const n=b("div",{className:"ability-logs-empty",style:"padding: 24px; text-align: center; color: color-mix(in oklab, var(--fg) 60%, #9ca3af); font-size: 14px;"},"No ability logs yet");this.listContainer.appendChild(n);return}t.forEach(n=>{const r=this.createLogItemCard(n);this.listContainer.appendChild(r);});}createLogItemCard(t){const n=b("div",{className:"ability-log-item",style:"background: var(--soft); border: 1px solid var(--border); border-radius: 8px; padding: 12px; display: flex; gap: 12px; align-items: center; transition: all 0.2s ease;"});n.addEventListener("mouseenter",()=>{n.style.background="color-mix(in oklab, var(--soft) 90%, var(--fg) 10%)",n.style.borderColor="color-mix(in oklab, var(--border) 70%, var(--fg) 30%)";}),n.addEventListener("mouseleave",()=>{n.style.background="var(--soft)",n.style.borderColor="var(--border)";});const r=b("div",{style:"width: 40px; height: 40px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: var(--muted); border-radius: 6px;"});try{const f=V.toCanvas("pet",t.petSpecies);f&&(f.style.width="100%",f.style.height="100%",f.style.objectFit="contain",r.appendChild(f));}catch{r.textContent="🐾",r.style.fontSize="24px";}n.appendChild(r);const o=b("div",{style:"flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px;"}),a=b("div",{style:"display: flex; align-items: center; justify-content: space-between; gap: 8px;"}),i=b("div",{style:"font-size: 14px; font-weight: 700; color: var(--fg); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"},t.petName),s=new Date(t.timestamp),c=s.toLocaleDateString("en-US",{month:"short",day:"numeric"}),d=s.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}),l=b("div",{style:"font-size: 11px; font-weight: 500; color: color-mix(in oklab, var(--fg) 60%, #9ca3af); white-space: nowrap;"},`${c} ${d}`);a.appendChild(i),a.appendChild(l),o.appendChild(a);const u=this.createAbilityBadge(t.abilityId,t.abilityName);o.appendChild(u);const p=b("div",{style:"font-size: 12px; color: color-mix(in oklab, var(--fg) 70%, #9ca3af); line-height: 1.4; overflow: hidden; text-overflow: ellipsis;"},t.description);return o.appendChild(p),n.appendChild(o),n}}const Zw=`
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
    color: var(--muted);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-size: 10px;
}

.xp-str__current {
    color: var(--fg);
    font-weight: 800;
    font-size: 13px;
}

.xp-str__separator {
    color: var(--muted);
    font-size: 11px;
}

.xp-str__max {
    color: var(--muted);
    font-size: 11px;
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
    color: var(--muted);
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
`,eS=`
/* ═══════════════════════════════════════════════════════════════════════════
   GROWTH TIMER PANEL STYLES
   ═══════════════════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════════════════
   GROWTH TIMER OVERHAUL STYLES - XP BAR INLINE LAYOUT
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

.team-progress-bar__overlay {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    pointer-events: none;
    z-index: 2;
}

.bar-percent {
    font-size: 12px;
    font-weight: 800;
    color: var(--accent); /* Per user: percentage */
    text-shadow: 
        -1px -1px 0 rgba(0, 0, 0, 0.8),
        1px -1px 0 rgba(0, 0, 0, 0.8),
        -1px 1px 0 rgba(0, 0, 0, 0.8),
        1px 1px 0 rgba(0, 0, 0, 0.8); /* Black outline */
}

.bar-info {
    font-size: 10px;
    font-weight: 600;
    color: var(--pill-from); /* Per user: "9 growing +162min/h" */
    text-shadow: 
        -1px -1px 0 rgba(0, 0, 0, 0.8),
        1px -1px 0 rgba(0, 0, 0, 0.8),
        -1px 1px 0 rgba(0, 0, 0, 0.8),
        1px 1px 0 rgba(0, 0, 0, 0.8); /* Black outline */
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
    color: var(--pill-to); /* Per user: "6m 28s" */
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

/* Dropdown Menu */
.growth-dropdown-menu {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 8px;
    box-shadow: 0 8px 32px var(--shadow);
    padding: 4px;
    min-width: 180px;
    max-height: 200px;
    overflow-y: auto;
    
    /* Gemini scrollbar */
    scrollbar-width: thin;
    scrollbar-color: var(--border) transparent;
    -webkit-overflow-scrolling: touch; /* Smooth touch scrolling */
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
`,nu=`
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

`,tS=`
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
.base-str__current { color: var(--pill-to); font-weight: 800; }
.base-str__max { color: var(--muted); }

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
    text-shadow: 0 1px 2px rgba(0,0,0,0.8);
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
`,ru=`
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
`,nS=`
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
`,rS=`
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
`;class oS extends rn{constructor(n){super({id:"tab-pets",label:"Pets"});D(this,"unsubscribeMyPets");D(this,"lastActiveTeamId",null);D(this,"teamCardPart",null);D(this,"abilityLogsCardPart",null);D(this,"deps");this.deps=n;}async build(n){this.container=n;const{MGSprite:r}=await tu(async()=>{const{MGSprite:i}=await Promise.resolve().then(()=>Db);return {MGSprite:i}},void 0);await r.init();const o=n.getRootNode();Re(o,Zw,"team-xp-panel-styles"),Re(o,eS,"feature-card-styles"),Re(o,nu,"team-card-styles"),Re(o,tS,"base-pet-card-styles"),Re(o,ru,"badge-styles"),Re(o,nS,"arcade-button-styles"),Re(o,Yw,"gemini-icon-button-styles"),Re(o,rS,"ability-logs-card-styles");const a=this.createGrid("12px");a.id="pets",n.appendChild(a),this.initializeTeamCardPart(a),this.initializeAbilityLogsCardPart(a),this.unsubscribeMyPets=ye.myPets.subscribeStable(()=>{const i=ce.getActiveTeamId();i!==this.lastActiveTeamId&&(this.lastActiveTeamId=i,this.teamCardPart?.render());}),this.lastActiveTeamId=ce.getActiveTeamId();}async destroy(){this.unsubscribeMyPets&&(this.unsubscribeMyPets(),this.unsubscribeMyPets=void 0),this.teamCardPart&&(this.teamCardPart.destroy(),this.teamCardPart=null),this.abilityLogsCardPart&&(this.abilityLogsCardPart.destroy(),this.abilityLogsCardPart=null);}initializeTeamCardPart(n){this.teamCardPart||(this.teamCardPart=new Jw({onTeamReordered:o=>{console.log("[PetsSection] Teams reordered:",o);},setHUDOpen:this.deps?.setHUDOpen}));const r=this.teamCardPart.build();n.appendChild(r),this.teamCardPart.render();}initializeAbilityLogsCardPart(n){this.abilityLogsCardPart||(this.abilityLogsCardPart=new Qw);const r=this.abilityLogsCardPart.build();n.appendChild(r),this.abilityLogsCardPart.render();}}const aS={Store:{select:ue.select.bind(ue),set:ue.set.bind(ue),subscribe:ue.subscribe.bind(ue),subscribeImmediate:ue.subscribeImmediate.bind(ue)},Globals:ye,Modules:{Version:Xa,Assets:Nt,Manifest:ft,Data:oe,Environment:De,CustomModal:Xt,Sprite:V,Tile:gt,Pixi:co,Audio:gi,Cosmetic:mi,Calculators:jc},Features:{AutoFavorite:_i,JournalChecker:fd,BulkFavorite:Zr,Achievements:bd,Tracker:qd,AntiAfk:Mt,Pets:Jd,PetTeam:ce,XPTracker:Gn},WebSocket:{chat:gy,emote:my,wish:hy,kickPlayer:by,setPlayerData:xy,usurpHost:yy,reportSpeakingStart:vy,setSelectedGame:wy,voteForGame:Sy,requestGame:ky,restartGame:Cy,ping:Ty,checkWeatherStatus:_y,move:Py,playerPosition:Zc,teleport:Ay,moveInventoryItem:Iy,dropObject:Ey,pickupObject:My,toggleFavoriteItem:bo,putItemInStorage:Pi,retrieveItemFromStorage:Ai,moveStorageItem:Ly,logItems:Fy,plantSeed:Ry,waterPlant:Ny,harvestCrop:Oy,sellAllCrops:By,purchaseDecor:$y,purchaseEgg:Dy,purchaseTool:zy,purchaseSeed:Gy,plantEgg:jy,hatchEgg:Hy,plantGardenPlant:Wy,potPlant:Uy,mutationPotion:Vy,pickupDecor:Xy,placeDecor:Ky,removeGardenObject:Yy,placePet:ed,feedPet:qy,petPositions:Jy,swapPet:td,storePet:nd,namePet:Qy,sellPet:Zy},_internal:{getGlobals:ut,initGlobals:qc,destroyGlobals:ry}};function iS(){const e=L;e.Gemini=aS,e.MGSprite=V,e.MGData=oe,e.MGPixi=co,e.MGAssets=Nt,e.MGEnvironment=De;}let Qo=null;function sS(){return Qo||(Qo=new Vb),Qo}function lS(e){return [new Tp(e),new lw,new E0,new Aw,new oS(e)]}async function cS(){await sS().preload();}function dS(e){const{shadow:t,initialOpen:n}=e,r=b("div",{className:"gemini-panel",id:"panel",ariaHidden:String(!n)}),o=b("div",{className:"gemini-tabbar"}),a=b("div",{className:"gemini-content",id:"content"}),i=b("div",{className:"gemini-resizer",title:"Resize"}),s=b("button",{className:"gemini-close",title:"Fermer",ariaLabel:"Fermer"},"✕");r.append(o,a,i);const c=b("div",{className:"gemini-wrapper"},r);return t.append(c),{panel:r,tabbar:o,content:a,resizer:i,closeButton:s,wrapper:c}}function uS(e){const{resizer:t,host:n,shadow:r,onWidthChange:o,initialWidth:a,minWidth:i,maxWidth:s}=e;let c=i,d=s;function l(){const w=De.detect(),P=Math.round(L.visualViewport?.width??L.innerWidth??0);if(w.platform==="mobile"||w.os==="ios"||w.os==="android"){const y=getComputedStyle(r.host),C=parseFloat(y.getPropertyValue("--inset-l"))||0,T=parseFloat(y.getPropertyValue("--inset-r"))||0,S=Math.max(280,P-Math.round(C+T));c=280,d=S;}else c=i,d=s;return {min:c,max:d}}function u(w){return Math.max(c,Math.min(d,Number(w)||a))}function p(w){const P=u(w);n.style.setProperty("--w",`${P}px`),o(P);}l();const f=De.detect(),g=!(f.platform==="mobile"||f.os==="ios"||f.os==="android");let m=false;const h=w=>{if(!m)return;w.preventDefault();const P=Math.round(L.innerWidth-w.clientX);p(P);},x=()=>{m&&(m=false,document.body.style.cursor="",L.removeEventListener("mousemove",h),L.removeEventListener("mouseup",x));},k=w=>{g&&(w.preventDefault(),m=true,document.body.style.cursor="ew-resize",L.addEventListener("mousemove",h),L.addEventListener("mouseup",x));};t.addEventListener("mousedown",k);function v(){t.removeEventListener("mousedown",k),L.removeEventListener("mousemove",h),L.removeEventListener("mouseup",x);}return {calculateResponsiveBounds:l,constrainWidthToLimits:u,setHudWidth:p,destroy:v}}function pS(e){const{panel:t,onToggle:n,onClose:r,toggleCombo:o=c=>c.ctrlKey&&c.shiftKey&&c.key.toLowerCase()==="u",closeOnEscape:a=true}=e;function i(c){const d=t.classList.contains("open");if(a&&c.key==="Escape"&&d){r();return}o(c)&&(c.preventDefault(),c.stopPropagation(),n());}document.addEventListener("keydown",i,{capture:true});function s(){document.removeEventListener("keydown",i,{capture:true});}return {destroy:s}}const fS=`
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
`,gS=`
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
`,mS=`
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
`,hS=`
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
`,bS=`
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
  
`,xS=`
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
`,yS=`
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
`,vS=`
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
`,wS=`
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
`,SS=`
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
`,kS=`
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
`,CS=`
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
`,TS=`
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
`,PS=`
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
`,AS=`
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
`,_S=`
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
`,IS=`
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
`,ES=`
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
`,MS=`
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
`,LS=`
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
`,FS=`
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
`,RS=`
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
`,NS=`
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
`,OS={all:"initial",position:"fixed",top:"0",right:"0",zIndex:"2147483647",pointerEvents:"auto",fontFamily:'system-ui, -apple-system, "Segoe UI", Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',fontSize:"13px",lineHeight:"1.35"};function BS(e="gemini-root"){const t=document.createElement("div");t.id=e,Object.assign(t.style,OS),(document.body||document.documentElement).appendChild(t);const n=t.attachShadow({mode:"open"});return {host:t,shadow:n}}function $S(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:16}):setTimeout(e,0);})}async function DS(e){const{hostId:t="gemini-hud-root",initialWidth:n,initialOpen:r,onWidthChange:o,onOpenChange:a,themes:i,initialTheme:s,onThemeChange:c,buildSections:d,initialTab:l,onTabChange:u,toggleCombo:p=K=>K.ctrlKey&&K.shiftKey&&K.key.toLowerCase()==="u",closeOnEscape:f=true,minWidth:g=420,maxWidth:m=720}=e,{host:h,shadow:x}=BS(t),k=[[gS,"variables"],[mS,"primitives"],[hS,"utilities"],[fS,"hud"],[bS,"card"],[ru,"badge"],[xS,"button"],[TS,"checkbox"],[yS,"input"],[vS,"label"],[wS,"navTabs"],[SS,"searchBar"],[kS,"select"],[CS,"switch"],[PS,"table"],[AS,"teamListItem"],[_S,"timeRangePicker"],[IS,"tooltip"],[ES,"slider"],[MS,"reorderableList"],[LS,"colorPicker"],[FS,"log"],[RS,"segmentedControl"],[NS,"settings"],[nu,"teamCard"],[Wc,"autoFavoriteSettings"]];for(let K=0;K<k.length;K++){const[q,he]=k[K];Re(x,q,he),K%5===4&&await $S();}const{panel:v,tabbar:w,content:P,resizer:y,closeButton:C,wrapper:T}=dS({shadow:x,initialOpen:r});function S(K){v.dispatchEvent(new CustomEvent("gemini:hud-open-change",{detail:{isOpen:K},bubbles:true})),a?.(K);}function A(K){const q=v.classList.contains("open");v.classList.toggle("open",K),v.setAttribute("aria-hidden",K?"false":"true"),K!==q&&S(K);}A(r),C.addEventListener("click",K=>{K.preventDefault(),K.stopPropagation(),A(false);});const I=yp({host:h,themes:i,initialTheme:s,onThemeChange:c}),F=uS({resizer:y,host:h,shadow:x,onWidthChange:o||(()=>{}),initialWidth:n,minWidth:g,maxWidth:m});F.setHudWidth(n);const R=d({applyTheme:I.applyTheme,initialTheme:s,getCurrentTheme:I.getCurrentTheme,setHUDWidth:F.setHudWidth,setHUDOpen:A}),E=new wu(R,P,{applyTheme:I.applyTheme,getCurrentTheme:I.getCurrentTheme}),$=R.map(K=>({id:K.id,label:K.label})),te=l&&R.some(K=>K.id===l)?l:$[0]?.id||"",z=vu($,te,K=>{E.activate(K),u?.(K);});z.root.style.flex="1 1 auto",z.root.style.minWidth="0",w.append(z.root,C);const H={"tab-auto-favorite":"autoFavorite","tab-journal-checker":"journalChecker","tab-pets":"pets"};function G(){const K=Pe(Le.CONFIG,{autoFavorite:{enabled:false},journalChecker:{enabled:false},pets:{enabled:true}});for(const[q,he]of Object.entries(H))K[he]?.enabled??false?z.showTab(q):z.hideTab(q);}function N(K){const{key:q}=K.detail;(q===Le.CONFIG||q==="feature:config")&&G();}window.addEventListener(Ui.STORAGE_CHANGE,N),G();let O=te;if(!z.isTabVisible(te)){const K=z.getVisibleTabs();K.length>0&&(O=K[0]);}O&&E.activate(O);const j=pS({panel:v,onToggle:()=>A(!v.classList.contains("open")),onClose:()=>A(false),toggleCombo:p,closeOnEscape:f}),B=()=>{z.recalc();const K=parseInt(getComputedStyle(h).getPropertyValue("--w"))||n;F.calculateResponsiveBounds(),F.setHudWidth(K);};L.addEventListener("resize",B);const W=K=>{const q=K.detail?.width;q?F.setHudWidth(q):F.setHudWidth(n),z.recalc();};h.addEventListener("gemini:layout-resize",W);function pe(){window.removeEventListener(Ui.STORAGE_CHANGE,N),j.destroy(),F.destroy(),L.removeEventListener("resize",B),h.removeEventListener("gemini:layout-resize",W);}return {host:h,shadow:x,wrapper:T,panel:v,content:P,setOpen:A,setWidth:F.setHudWidth,sections:R,manager:E,nav:z,destroy:pe}}const kn={isOpen:"gemini.hud.isOpen",width:"gemini.hud.width",theme:"gemini.hud.theme",activeTab:"gemini.hud.activeTab"},Mr={isOpen:false,width:480,theme:"dark",activeTab:"tab-settings"};function zS(){return {isOpen:Pe(kn.isOpen,Mr.isOpen),width:Pe(kn.width,Mr.width),theme:Pe(kn.theme,Mr.theme),activeTab:Pe(kn.activeTab,Mr.activeTab)}}function Lr(e,t){Oe(kn[e],t);}const GS="https://i.imgur.com/IMkhMur.png",jS="Stats";function HS(e){let t=e.iconUrl||GS;const n=e.ariaLabel||"Open MGH";let r=null,o=null,a=null,i=false,s=null,c=null;const d=["Chat","Leaderboard","Stats","Open Activity Log"],l=v=>{try{return typeof CSS<"u"&&CSS&&typeof CSS.escape=="function"?CSS.escape(v):v.replace(/"/g,'\\"')}catch{return v}};function u(){const v=document.querySelector(d.map(P=>`button[aria-label="${l(P)}"]`).join(","));if(!v)return null;let w=v.parentElement;for(;w&&w!==document.body;){if(d.reduce((y,C)=>y+w.querySelectorAll(`button[aria-label="${l(C)}"]`).length,0)>=2)return w;w=w.parentElement;}return null}function f(v){const w=Array.from(v.querySelectorAll("button[aria-label]"));if(!w.length)return {refBtn:null,refWrapper:null};const P=w.filter(F=>F.dataset.mghBtn!=="true"&&(F.getAttribute("aria-label")||"")!==(e.ariaLabel||"Open MGH")),y=P.length?P:w,C=y.find(F=>(F.getAttribute("aria-label")||"").toLowerCase()===jS.toLowerCase())||null,T=y.length>=2?y.length-2:y.length-1,S=C||y[T],A=S.parentElement,I=A&&A.parentElement===v&&A.tagName==="DIV"?A:null;return {refBtn:S,refWrapper:I}}function g(v,w,P){const y=v.cloneNode(false);y.type="button",y.setAttribute("aria-label",w),y.title=w,y.dataset.mghBtn="true",y.style.pointerEvents="auto",y.removeAttribute("id");const C=document.createElement("img");return C.src=P,C.alt="MGH",C.style.pointerEvents="none",C.style.userSelect="none",C.style.width="76%",C.style.height="76%",C.style.objectFit="contain",C.style.display="block",C.style.margin="auto",y.appendChild(C),y.addEventListener("click",T=>{T.preventDefault(),T.stopPropagation();try{e.onClick?.();}catch{}}),y}function m(){if(i)return  false;i=true;let v=false;try{const w=u();if(!w)return !1;s!==w&&(s=w);const{refBtn:P,refWrapper:y}=f(w);if(!P)return !1;o=w.querySelector('div[data-mgh-wrapper="true"]'),!o&&y&&(o=y.cloneNode(!1),o.dataset.mghWrapper="true",o.removeAttribute("id"),v=!0);const C=o?.querySelector('button[data-mgh-btn="true"]')||null;r||(r=C),r||(r=g(P,n,t),o?o.appendChild(r):r.parentElement!==w&&w.appendChild(r),v=!0),o&&o.parentElement!==w&&(w.appendChild(o),v=!0);const T=w;if(T&&T!==c){try{k.disconnect();}catch{}c=T,k.observe(c,{childList:!0,subtree:!0});}return v}finally{i=false;}}const h=document.getElementById("App")||document.body;let x=null;const k=new MutationObserver(v=>{const w=v.every(y=>{const C=Array.from(y.addedNodes||[]),T=Array.from(y.removedNodes||[]),S=C.concat(T);if(S.length===0){const A=y.target;return o&&(A===o||o.contains(A))||r&&(A===r||r.contains(A))}return S.every(A=>!!(!(A instanceof HTMLElement)||o&&(A===o||o.contains(A))||r&&(A===r||r.contains(A))))}),P=v.some(y=>Array.from(y.removedNodes||[]).some(C=>C instanceof HTMLElement?!!(o&&(C===o||o.contains(C))||r&&(C===r||r.contains(C))):false));w&&!P||x===null&&(x=window.setTimeout(()=>{if(x=null,m()&&o){const C=o.parentElement;C&&C.lastElementChild!==o&&C.appendChild(o);}},150));});return m(),k.observe(h,{childList:true,subtree:true}),a=()=>k.disconnect(),()=>{try{a?.();}catch{}try{o?.remove();}catch{}}}const ou=[];function WS(){return ou.slice()}function US(e){ou.push(e);}function au(e){try{return JSON.parse(e)}catch{return}}function ol(e){if(typeof e=="string"){const t=au(e);return t!==void 0?t:e}return e}function iu(e){if(e!=null){if(typeof e=="string"){const t=au(e);return t!==void 0?iu(t):e}if(Array.isArray(e)&&typeof e[0]=="string")return e[0];if(typeof e=="object"){const t=e;return t.type??t.Type??t.kind??t.messageType}}}function VS(e){const t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function Z(e,t,n){const r=typeof t=="boolean"?t:true,o=typeof t=="function"?t:n,a=(i,s)=>{if(iu(i)!==e)return;const d=o(i,s);return d&&typeof d=="object"&&"kind"in d?d:typeof d=="boolean"?d?void 0:{kind:"drop"}:r?void 0:{kind:"drop"}};return US(a),a}const gn=new WeakSet,al=new WeakMap;function XS(e){const t=e.pageWindow,n=!!e.debug,r=e.middlewares&&e.middlewares.length?e.middlewares:WS();if(!r.length)return ()=>{};const o=p=>({ws:p,pageWindow:t,debug:n}),a=(p,f)=>{let g=p;for(const m of r){const h=m(g,o(f));if(h){if(h.kind==="drop")return {kind:"drop"};h.kind==="replace"&&(g=h.message);}}return g!==p?{kind:"replace",message:g}:void 0};let i=null,s=null,c=null;const d=()=>{const p=t?.MagicCircle_RoomConnection,f=p?.sendMessage;if(!p||typeof f!="function")return  false;if(gn.has(f))return  true;const g=f.bind(p);function m(...h){const x=h.length===1?h[0]:h,k=ol(x),v=a(k,VS(t));if(v?.kind==="drop"){n&&console.log("[WS] drop outgoing (RoomConnection.sendMessage)",k);return}if(v?.kind==="replace"){const w=v.message;return h.length>1&&Array.isArray(w)?(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",k,"=>",w),g(...w)):(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",k,"=>",w),g(w))}return g(...h)}gn.add(m),al.set(m,f);try{p.sendMessage=m,gn.add(p.sendMessage),n&&console.log("[WS] outgoing patched via MagicCircle_RoomConnection.sendMessage");}catch{return  false}return i=()=>{try{p.sendMessage===m&&(p.sendMessage=f);}catch{}},true};(()=>{const p=t?.WebSocket?.prototype,f=p?.send;if(typeof f!="function"||gn.has(f))return;function g(m){const h=ol(m),x=a(h,this);if(x?.kind==="drop"){n&&console.log("[WS] drop outgoing (ws.send)",h);return}if(x?.kind==="replace"){const k=x.message,v=typeof k=="string"||k instanceof ArrayBuffer||k instanceof Blob?k:JSON.stringify(k);return n&&console.log("[WS] replace outgoing (ws.send)",h,"=>",k),f.call(this,v)}return f.call(this,m)}gn.add(g),al.set(g,f);try{p.send=g,n&&console.log("[WS] outgoing patched via WebSocket.prototype.send");}catch{return}s=()=>{try{p.send===g&&(p.send=f);}catch{}};})();const u=e.waitForRoomConnectionMs??4e3;if(!d()&&u>0){const p=Date.now();c=setInterval(()=>{if(d()){clearInterval(c),c=null;return}Date.now()-p>u&&(clearInterval(c),c=null,n&&console.log("[WS] RoomConnection not found, only ws.send is patched"));},250);}return ()=>{if(c){try{clearInterval(c);}catch{}c=null;}if(i){try{i();}catch{}i=null;}if(s){try{s();}catch{}s=null;}}}(function(){try{const t=({ url: (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('__entry.js', document.baseURI).href) }),n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();const su=[];function KS(){return su.slice()}function il(e){su.push(e);}function YS(e){if(e!=null){if(typeof e=="object"){const t=e;if(typeof t.type=="string")return t.type;if(typeof t.Type=="string")return t.Type;if(typeof t.kind=="string")return t.kind;if(typeof t.messageType=="string")return t.messageType}if(Array.isArray(e)&&typeof e[0]=="string")return e[0]}}function qS(e){if(typeof e=="string")try{return JSON.parse(e)}catch{return e}return e}const Zo=Symbol.for("ariesmod.ws.handlers.patched");function Se(e,t){if(typeof e=="string"){const o=e,a={match:i=>i.kind==="message"&&i.type===o,handle:t};return il(a),a}const n=e,r={match:o=>o.kind==="close"&&o.code===n,handle:t};return il(r),r}function JS(e,t=KS(),n={}){const r=n.pageWindow??window,o=!!n.debug;if(e[Zo])return ()=>{};e[Zo]=true;const a={ws:e,pageWindow:r,debug:o},i=u=>{for(const p of t)try{if(!p.match(u))continue;if(p.handle(u,a)===!0)return}catch(f){o&&console.error("[WS] handler error",f,u);}},s=u=>{const p=qS(u.data),f=YS(p);i({kind:"message",raw:u.data,data:p,type:f});},c=u=>{i({kind:"close",code:u.code,reason:u.reason,wasClean:u.wasClean,event:u});},d=u=>i({kind:"open",event:u}),l=u=>i({kind:"error",event:u});return e.addEventListener("message",s),e.addEventListener("close",c),e.addEventListener("open",d),e.addEventListener("error",l),()=>{try{e.removeEventListener("message",s);}catch{}try{e.removeEventListener("close",c);}catch{}try{e.removeEventListener("open",d);}catch{}try{e.removeEventListener("error",l);}catch{}try{delete e[Zo];}catch{}}}(function(){try{const t=({ url: (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('__entry.js', document.baseURI).href) }),n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();Se(tt.AuthenticationFailure,(e,t)=>{t.debug&&console.log("[WS][Close] Auth failure",e.code,e.reason);});Se(tt.ConnectionSuperseded,(e,t)=>{t.debug&&console.log("[WS][Close] Superseded",e.code,e.reason);});Se(tt.HeartbeatExpired,(e,t)=>{t.debug&&console.log("[WS][Close] Heartbeat expired",e.code,e.reason);});Se(tt.PlayerKicked,(e,t)=>{t.debug&&console.log("[WS][Close] Player kicked",e.code,e.reason);});Se(tt.PlayerLeftVoluntarily,(e,t)=>{t.debug&&console.log("[WS][Close] Player left voluntarily",e.code,e.reason);});Se(tt.ReconnectInitiated,(e,t)=>{t.debug&&console.log("[WS][Close] Reconnect initiated",e.code,e.reason);});Se(tt.ServerDisposed,(e,t)=>{t.debug&&console.log("[WS][Close] Server disposed",e.code,e.reason);});Se(tt.UserSessionSuperseded,(e,t)=>{t.debug&&console.log("[WS][Close] User session superseded",e.code,e.reason);});Se(tt.VersionExpired,(e,t)=>{t.debug&&console.log("[WS][Close] Version expired",e.code,e.reason);});Se(tt.VersionMismatch,(e,t)=>{t.debug&&console.log("[WS][Close] Version mismatch",e.code,e.reason);});Se(mt.Config,(e,t)=>{t.debug&&console.log("[WS][STC] Config",e.data);});Se(mt.CurrencyTransaction,(e,t)=>{t.debug&&console.log("[WS][STC] CurrencyTransaction",e.data);});Se(mt.Emote,(e,t)=>{t.debug&&console.log("[WS][STC] Emote",e.data);});Se(mt.InappropriateContentRejected,(e,t)=>{t.debug&&console.log("[WS][STC] InappropriateContentRejected",e.data);});Se(mt.PartialState,(e,t)=>{t.debug&&console.log("[WS][STC] PartialState",e.data);});Se(mt.Pong,(e,t)=>{t.debug&&console.log("[WS][STC] Pong",e.data);});Se(mt.ServerErrorMessage,(e,t)=>{t.debug&&console.log("[WS][STC] ServerErrorMessage",e.data);});Se(mt.Welcome,(e,t)=>{t.debug&&console.log("[WS][STC] Welcome",e.data);});Z(M.PlantSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantSeed"),true));Z(M.WaterPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] WaterPlant"),true));Z(M.HarvestCrop,(e,t)=>(t.debug&&console.log("[MW][Garden] HarvestCrop"),true));Z(M.SellAllCrops,(e,t)=>(t.debug&&console.log("[MW][Garden] SellAllCrops"),true));Z(M.PurchaseSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseSeed"),true));Z(M.PurchaseEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseEgg"),true));Z(M.PurchaseTool,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseTool"),true));Z(M.PurchaseDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseDecor"),true));Z(M.PlantEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantEgg"),true));Z(M.HatchEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] HatchEgg"),true));Z(M.PlantGardenPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantGardenPlant"),true));Z(M.PotPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PotPlant"),true));Z(M.MutationPotion,(e,t)=>(t.debug&&console.log("[MW][Garden] MutationPotion"),true));Z(M.PickupDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PickupDecor"),true));Z(M.PlaceDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PlaceDecor"),true));Z(M.RemoveGardenObject,(e,t)=>(t.debug&&console.log("[MW][Garden] RemoveGardenObject"),true));Z(M.MoveInventoryItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveInventoryItem"),true));Z(M.DropObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] DropObject"),true));Z(M.PickupObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] PickupObject"),true));Z(M.ToggleFavoriteItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] ToggleFavoriteItem"),true));Z(M.PutItemInStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] PutItemInStorage"),true));Z(M.RetrieveItemFromStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] RetrieveItemFromStorage"),true));Z(M.MoveStorageItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveStorageItem"),true));Z(M.LogItems,(e,t)=>(t.debug&&console.log("[MW][Inventory] LogItems"),true));Z(M.PlacePet,(e,t)=>(t.debug&&console.log("[MW][Pets] PlacePet"),true));Z(M.FeedPet,(e,t)=>(t.debug&&console.log("[MW][Pets] FeedPet"),true));Z(M.PetPositions,(e,t)=>(t.debug&&console.log("[MW][Pets] PetPositions"),true));Z(M.SwapPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SwapPet"),true));Z(M.StorePet,(e,t)=>(t.debug&&console.log("[MW][Pets] StorePet"),true));Z(M.NamePet,(e,t)=>(t.debug&&console.log("[MW][Pets] NamePet"),true));Z(M.SellPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SellPet"),true));console.log("[WS] TESTTEST");Z(M.SetSelectedGame,(e,t)=>(t.debug&&console.log("[MW][Session] SetSelectedGame"),true));Z(M.VoteForGame,(e,t)=>(t.debug&&console.log("[MW][Session] VoteForGame"),true));Z(M.RequestGame,(e,t)=>(t.debug&&console.log("[MW][Session] RequestGame"),true));Z(M.RestartGame,(e,t)=>(t.debug&&console.log("[MW][Session] RestartGame"),true));Z(M.Ping,(e,t)=>(t.debug&&console.log("[MW][Session] Ping"),true));Z(M.PlayerPosition,(e,t)=>(t.debug&&console.log("[MW][Session] PlayerPosition"),true));Z(M.Teleport,(e,t)=>(t.debug&&console.log("[MW][Session] Teleport"),true));Z(M.CheckWeatherStatus,(e,t)=>(t.debug&&console.log("[MW][Session] CheckWeatherStatus"),true));Z(M.Chat,(e,t)=>(t.debug&&console.log("[MW][Social] Chat"),true));Z(M.Dev,(e,t)=>(t.debug&&console.log("[MW][Social] Dev"),true));Z(M.Emote,(e,t)=>(t.debug&&console.log("[MW][Social] Emote"),true));Z(M.Wish,(e,t)=>(t.debug&&console.log("[MW][Social] Wish"),true));Z(M.KickPlayer,(e,t)=>(t.debug&&console.log("[MW][Social] KickPlayer"),true));Z(M.ReportSpeakingStart,(e,t)=>(t.debug&&console.log("[MW][Voice] ReportSpeakingStart"),true));Z(M.SetPlayerData,(e,t)=>(t.debug&&console.log("[MW][Social] SetPlayerData"),true));Z(M.UsurpHost,(e,t)=>(t.debug&&console.log("[MW][Social] UsurpHost"),true));function QS(e={}){const t=e.pageWindow??L,n=e.pollMs??500,r=!!e.debug,o=[];o.push(sy(t,{debug:r})),o.push(XS({pageWindow:t,middlewares:e.middlewares,debug:r}));let a=null;const i=s=>{if(a){try{a();}catch{}a=null;}s&&(a=JS(s,e.handlers,{debug:r,pageWindow:t}));};return i(Qr(t).ws),o.push(Qc(s=>i(s.ws),{intervalMs:n,debug:r,pageWindow:t})),{getWs:()=>Qr(t).ws,dispose:()=>{for(let s=o.length-1;s>=0;s--)try{o[s]();}catch{}if(a){try{a();}catch{}a=null;}}}}let Fr=null;function ZS(e={}){return Fr||(Fr=QS(e),Fr)}function ek(e){e.logStep("WebSocket","Capturing WebSocket...");let t=null;return t=Qc(n=>{n.ws&&(e.logStep("WebSocket","WebSocket captured","success"),t?.(),t=null);},{intervalMs:250}),ZS({debug:false}),()=>{t?.(),t=null;}}async function tk(e){e.logStep("Atoms","Prewarming Jotai store...");try{await qf(),await Vf({timeoutMs:8e3,intervalMs:50}),e.logStep("Atoms","Jotai store ready","success");}catch(t){e.logStep("Atoms","Jotai store not captured yet","error"),console.warn("[Bootstrap] Jotai store wait failed",t);}}function nk(e){e.logStep("Globals","Initializing global variables...");try{qc(),e.logStep("Globals","Global variables ready","success");}catch(t){e.logStep("Globals","Failed to initialize global variables","error"),console.warn("[Bootstrap] Global variables init failed",t);}}function rk(e){e.logStep("API","Exposing Gemini API...");try{iS(),e.logStep("API","Gemini API ready","success");}catch(t){e.logStep("API","Failed to expose API","error"),console.warn("[Bootstrap] API init failed",t);}}function ea(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0);})}async function ok(e){e.logStep("HUD","Loading HUD preferences..."),await ea();const t=zS();await ea();const n=await DS({hostId:"gemini-hud-root",initialWidth:t.width,initialOpen:t.isOpen,onWidthChange:r=>Lr("width",r),onOpenChange:r=>Lr("isOpen",r),themes:Tn,initialTheme:t.theme,onThemeChange:r=>Lr("theme",r),buildSections:r=>lS({applyTheme:r.applyTheme,initialTheme:r.initialTheme,getCurrentTheme:r.getCurrentTheme,setHUDWidth:r.setHUDWidth,setHUDOpen:r.setHUDOpen}),initialTab:t.activeTab,onTabChange:r=>Lr("activeTab",r)});return await ea(),e.logStep("HUD","HUD ready","success"),n}async function ak(e){e.setSubtitle("Activating Gemini modules...");const t=7;let n=0;await Hc(r=>{r.status==="success"?(n++,e.logStep("Modules",`Loading modules... (${n}/${t})`)):r.status==="error"&&e.logStep("Modules",`Loading modules... (${n}/${t}) - ${r.name} failed`,"error");}),e.logStep("Modules",`All modules loaded (${t}/${t})`,"success");}async function ik(e){e.logStep("Sprites","Warming up sprite cache...");try{V.isReady()||await V.init();const t=[],n=oe.get("plants");if(n)for(const i of Object.values(n))i?.seed?.spriteId&&t.push(i.seed.spriteId),i?.plant?.spriteId&&t.push(i.plant.spriteId),i?.crop?.spriteId&&t.push(i.crop.spriteId);const r=oe.get("pets");if(r)for(const i of Object.values(r))i?.spriteId&&t.push(i.spriteId);const o=[...new Set(t)],a=o.length;if(a===0){e.logStep("Sprites","No sprites to warmup","success");return}await V.warmup(o,(i,s)=>{e.logStep("Sprites",`Loading sprites (${i}/${s})...`);},5),e.logStep("Sprites",`${a} sprites loaded`,"success");}catch(t){e.logStep("Sprites","Sprite warmup failed","error"),console.warn("[Bootstrap] Sprite warmup failed",t);}}async function sk(e){e.logStep("Sections","Preloading UI sections...");try{await cS(),e.logStep("Sections","Sections preloaded","success");}catch(t){e.logStep("Sections","Sections preload failed","error"),console.warn("[Bootstrap] Sections preload failed",t);}}function lk(e){e.logStep("Features","Initializing features...");const t=[{name:"AntiAfk",init:Mt.init.bind(Mt)},{name:"PetTeam",init:ce.init.bind(ce)},{name:"BulkFavorite",init:Zr.init.bind(Zr)},{name:"XPTracker",init:Gn.init.bind(Gn)}],n=[{name:"BulkFavoriteInject",init:$a.init.bind($a)}];let r=0;for(const a of t)try{a.init(),r++,e.logStep("Features",`Initializing features... (${r}/${t.length})`,"info");}catch(i){e.logStep("Features",`Initializing features... (${r}/${t.length}) - ${a.name} failed`,"error"),console.warn(`[Bootstrap] Feature ${a.name} init failed`,i);}e.logStep("Features",`All features initialized (${t.length}/${t.length})`,"success"),e.logStep("UIInjections","Initializing UI injections...");let o=0;for(const a of n)try{a.init(),o++;}catch(i){console.warn(`[Bootstrap] UI injection ${a.name} init failed`,i);}e.logStep("UIInjections",`UI injections initialized (${o}/${n.length})`,"success");}Ll();jf();(async function(){_u();const e=xu({title:"Gemini is loading",subtitle:"Connecting and preparing modules..."});let t=null;try{t=ek(e),await tk(e),nk(e),rk(e),await Promise.all([ak(e),(async()=>{await ik(e);})(),(async()=>{await sk(e);})(),(async()=>{lk(e);})()]),e.succeed("Gemini is ready!");}catch(r){e.fail("Failed to initialize the mod.",r);}finally{t?.();}const n=await ok(e);HS({onClick:()=>n.setOpen(true)});})();

})();