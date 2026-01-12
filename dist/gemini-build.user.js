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
  var wu=Object.defineProperty;var Su=(e,t,n)=>t in e?wu(e,t,{enumerable:true,configurable:true,writable:true,value:n}):e[t]=n;var W=(e,t,n)=>Su(e,typeof t!="symbol"?t+"":t,n);function m(e,t=null,...n){const r=document.createElement(e);for(const[o,a]of Object.entries(t||{}))a!=null&&(o==="style"?typeof a=="string"?r.setAttribute("style",a):typeof a=="object"&&Object.assign(r.style,a):o.startsWith("on")&&typeof a=="function"?r[o.toLowerCase()]=a:o in r?r[o]=a:r.setAttribute(o,String(a)));for(const o of n)o==null||o===false||r.appendChild(typeof o=="string"||typeof o=="number"?document.createTextNode(String(o)):o);return r}const sr="https://i.imgur.com/k5WuC32.png",Wi="gemini-loader-style",It="gemini-loader",cl=80;function ku(){if(document.getElementById(Wi))return;const e=document.createElement("style");e.id=Wi,e.textContent=`
    /* ===== Loader Variables ===== */
    #${It} {
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
    #${It} {
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

    #${It}.gemini-loader--error .gemini-loader__actions {
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
    #${It}.gemini-loader--closing {
      animation: gemini-loader-fade-out 0.4s ease forwards;
      pointer-events: none;
    }

    #${It}.gemini-loader--error .gemini-loader__spinner {
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
      #${It} { padding: 16px 10px; }
      .gemini-loader__card { padding: 16px; }
      .gemini-loader__header { gap: 12px; }
      .gemini-loader__spinner { width: 42px; height: 42px; }
      .gemini-loader__spinner-icon { width: 56px; height: 56px; }
      .gemini-loader__title { font-size: 16px; }
    }
  `;const t=document.head||document.documentElement||document.body;if(t){t.appendChild(e);return}const n=()=>{(document.head||document.documentElement||document.body)?.appendChild(e);};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",n,{once:true}):setTimeout(n,0);}function lr(e,t,n){const r=m("div",{className:`gemini-loader__log ${n}`},m("div",{className:"gemini-loader__dot"}),m("div",{textContent:t}));for(e.appendChild(r);e.childElementCount>cl;)e.firstElementChild?.remove();e.scrollTop=e.scrollHeight;}function Cu(){return new Promise(e=>{if(typeof GM_xmlhttpRequest>"u"){e(sr);return}GM_xmlhttpRequest({method:"GET",url:sr,responseType:"blob",onload:t=>{const n=t.response,r=new FileReader;r.onloadend=()=>e(r.result),r.onerror=()=>e(sr),r.readAsDataURL(n);},onerror:()=>e(sr)});})}function Tu(e={}){const t=Number.isFinite(e.blurPx)?Math.max(4,Number(e.blurPx)):14;ku();const n=m("div",{className:"gemini-loader__subtitle",textContent:e.subtitle??"Initializing the mod..."}),r=m("div",{className:"gemini-loader__logs"}),o=m("img",{className:"gemini-loader__spinner-icon",alt:"Gemini"}),a=m("div",{className:"gemini-loader__spinner"},o);Cu().then(h=>{o.src=h;});const i=m("div",{className:"gemini-loader__card"},m("div",{className:"gemini-loader__header"},a,m("div",{className:"gemini-loader__titles"},m("div",{className:"gemini-loader__title",textContent:e.title??"Gemini is loading"}),n)),r),s=m("div",{id:It},i);(document.body||document.documentElement).appendChild(s);const c=m("div",{className:"gemini-loader__actions"},m("button",{className:"gemini-loader__button",textContent:"Close loader",onclick:()=>s.remove()}));i.appendChild(c),s.style.setProperty("--loader-blur",`${t}px`);const d=h=>{n.textContent=h;},l=new Map,u=(h,x)=>{h.className=`gemini-loader__log ${x}`;};return {log:(h,x="info")=>lr(r,h,x),logStep:(h,x,k="info")=>{const y=String(h||"").trim();if(!y){lr(r,x,k);return}const w=l.get(y);if(w){w.el.lastElementChild&&(w.el.lastElementChild.textContent=x),w.tone!==k&&(u(w.el,k),w.tone=k);return}const T=m("div",{className:`gemini-loader__log ${k}`},m("div",{className:"gemini-loader__dot"}),m("div",{textContent:x}));for(l.set(y,{el:T,tone:k}),r.appendChild(T);r.childElementCount>cl;){const S=r.firstElementChild;if(!S)break;const C=Array.from(l.entries()).find(([,I])=>I.el===S)?.[0];C&&l.delete(C),S.remove();}r.scrollTop=r.scrollHeight;},setSubtitle:d,succeed:(h,x=600)=>{h&&lr(r,h,"success"),s.classList.add("gemini-loader--closing"),setTimeout(()=>s.remove(),x);},fail:(h,x)=>{lr(r,h,"error"),d("Something went wrong. Check the console for details."),s.classList.add("gemini-loader--error"),console.error("[Gemini loader]",h,x);}}}const Ui=150,Pu=30;function dl(e,t,n){const r=m("div",{className:"lg-pill",id:"pill"}),o=e.map(v=>{const P=m("button",{className:"lg-tab"},v.label);return P.setAttribute("data-target",v.id),P}),a=m("div",{className:"lg-tabs",id:"lg-tabs-row"},r,...o),i=new Map(e.map(v=>[v.id,true])),s=new Map(o.map((v,P)=>[e[P].id,v]));function c(v){const P=document.createElementNS("http://www.w3.org/2000/svg","svg");P.setAttribute("viewBox","0 0 24 24"),P.setAttribute("fill","none"),P.setAttribute("stroke","currentColor"),P.setAttribute("stroke-width","2"),P.setAttribute("stroke-linecap","round"),P.setAttribute("stroke-linejoin","round");const E=document.createElementNS("http://www.w3.org/2000/svg","polyline");return E.setAttribute("points",v==="left"?"15 18 9 12 15 6":"9 18 15 12 9 6"),P.appendChild(E),P}const d=m("button",{className:"lg-tabs-arrow lg-tabs-arrow-left",ariaLabel:"Scroll left"});d.appendChild(c("left"));const l=m("button",{className:"lg-tabs-arrow lg-tabs-arrow-right",ariaLabel:"Scroll right"});l.appendChild(c("right"));const p=m("div",{className:"lg-tabs-wrapper"},d,a,l);let f=0,g=0,b=false;function h(){const v=a.scrollLeft>0,P=a.scrollLeft<a.scrollWidth-a.clientWidth-1;d.classList.toggle("disabled",!v),l.classList.toggle("disabled",!P);}d.addEventListener("click",()=>{a.scrollBy({left:-Ui,behavior:"smooth"}),setTimeout(h,300);}),l.addEventListener("click",()=>{a.scrollBy({left:Ui,behavior:"smooth"}),setTimeout(h,300);}),a.addEventListener("wheel",v=>{Math.abs(v.deltaY)>Math.abs(v.deltaX)&&(v.preventDefault(),a.scrollLeft+=v.deltaY,h());},{passive:false});let x=0;a.addEventListener("touchstart",v=>{const P=v.touches[0];f=P.clientX,g=P.clientY,b=false,x=a.scrollLeft;},{passive:true}),a.addEventListener("touchmove",v=>{if(b)return;const P=v.touches[0],E=P.clientX-f,F=P.clientY-g;if(Math.abs(F)>Math.abs(E)){b=true;return}Math.abs(E)>Pu&&(v.preventDefault(),a.scrollLeft=x-E);},{passive:false}),a.addEventListener("touchend",()=>{h();},{passive:true}),a.addEventListener("scroll",h,{passive:true});function k(v){const P=o.find(E=>E.dataset.target===v)||o[0];P&&requestAnimationFrame(()=>{const E=P.offsetLeft,F=P.offsetWidth;r.style.width=`${F}px`,r.style.transform=`translateX(${E}px)`;const $=a.scrollLeft,A=$,M=$+a.clientWidth,G=E-12,L=E+F+12;G<A?a.scrollTo({left:G,behavior:"smooth"}):L>M&&a.scrollTo({left:L-a.clientWidth,behavior:"smooth"}),setTimeout(h,300);});}function y(){for(const[v,P]of i)if(P)return v;return null}function w(v){const P=s.get(v);if(P)if(i.set(v,false),P.style.display="none",C===v){const E=y();E&&I(E);}else S();}function T(v){const P=s.get(v);P&&(i.set(v,true),P.style.display="",S());}function S(){k(C),h();}let C=t||(e[0]?.id??"");function I(v){i.get(v)&&(C=v,o.forEach(P=>P.classList.toggle("active",P.dataset.target===v)),k(v),n(v));}return o.forEach(v=>v.addEventListener("click",()=>I(v.dataset.target))),queueMicrotask(()=>{k(C),h();}),{root:p,activate:I,recalc:S,getActive:()=>C,showTab:T,hideTab:w,isTabVisible:v=>i.get(v)??false,getVisibleTabs:()=>[...i.entries()].filter(([v,P])=>P).map(([v])=>v)}}class Bt{constructor(t){W(this,"id");W(this,"label");W(this,"container",null);W(this,"cleanupFunctions",[]);W(this,"preloadedContent",null);W(this,"preloadPromise",null);this.id=t.id,this.label=t.label;}async preload(){if(this.preloadedContent||this.preloadPromise)return;const t=m("div");this.preloadPromise=(async()=>{const n=this.build(t);n instanceof Promise&&await n,this.preloadedContent=t,this.preloadPromise=null;})(),await this.preloadPromise;}isPreloaded(){return this.preloadedContent!==null}render(t){for(this.unmount();t.firstChild;)t.removeChild(t.firstChild);if(this.container=t,this.preloadedContent){for(;this.preloadedContent.firstChild;)t.appendChild(this.preloadedContent.firstChild);this.preloadedContent=null;}else {const r=this.build(t);r instanceof Promise&&r.catch(o=>{console.error(`[Gemini] Error building section ${this.id}:`,o);});}const n=t.firstElementChild;n&&n.classList.contains("gemini-section")&&n.classList.add("active");}unmount(){this.executeCleanup(),this.container=null;}createContainer(t,n){const r=n?`gemini-section ${n}`:"gemini-section";return m("section",{id:t,className:r})}addCleanup(t){this.cleanupFunctions.push(t);}createGrid(t="12px"){const n=m("div");return n.style.display="grid",n.style.gap=t,n}executeCleanup(){for(const t of this.cleanupFunctions)try{t();}catch(n){console.error(`[Gemini] Cleanup error in section ${this.id}:`,n);}this.cleanupFunctions=[];}}class Au{constructor(t,n,r){W(this,"sections");W(this,"activeId",null);W(this,"container");W(this,"theme");this.sections=new Map(t.map(o=>[o.id,o])),this.container=n,this.theme=r;}get ids(){return Array.from(this.sections.keys())}get all(){return Array.from(this.sections.values())}get active(){return this.activeId}activate(t){if(this.activeId!==t){if(!this.sections.has(t))throw new Error(`[Gemini] Unknown section: ${t}`);if(this.activeId&&this.sections.get(this.activeId).unmount(),this.activeId=t,this.sections.get(t).render(this.container),this.theme){const n=this.theme.getCurrentTheme();this.theme.applyTheme(n);}}}}const vt="gemini:",Iu={STATE:"hud:state",THEME:"hud:theme"},_u={ALL:"sections",SETTINGS:"sections:settings",TEST:"sections:test"},Eu={},Mu={MY_PETS_ABILITY_LOGS:"global:myPets:abilityLogs"},$e={AUTO_FAVORITE:"feature:autoFavorite:config",AUTO_FAVORITE_UI:"feature:autoFavorite:ui",JOURNAL_CHECKER:"feature:journalChecker:config",BULK_FAVORITE:"feature:bulkFavorite:config",ACHIEVEMENTS:"feature:achievements:data",TRACKER_STATS:"feature:tracker:stats",ANTI_AFK:"feature:antiAfk:config",CONFIG:"feature:config",PET_TEAM:"feature:petTeam:config",XP_TRACKER:"feature:xpTracker:config"},ul={AUTO_RELOAD:"dev:auto-reload"},pl={HUD:Iu,SECTION:_u,MODULE:Eu,GLOBAL:Mu,FEATURE:$e,DEV:ul},Vi={STORAGE_CHANGE:"gemini:storage:change"};function ke(e,t){try{const n=e.startsWith(vt)?e:vt+e,r=GM_getValue(n);return r==null?t:typeof r=="string"?JSON.parse(r):r}catch(n){return console.error(`[Gemini Storage] Failed to read key "${e}":`,n),t}}function Ge(e,t){try{const n=e.startsWith(vt)?e:vt+e,r=e.startsWith(vt)?e.slice(vt.length):e,o=JSON.stringify(t);GM_setValue(n,o),window.dispatchEvent(new CustomEvent("gemini:storage:change",{detail:{key:r,value:t}}));}catch(n){console.error(`[Gemini Storage] Failed to write key "${e}":`,n);}}function Lu(e){try{const t=e.startsWith(vt)?e:vt+e;GM_setValue(t,void 0);}catch(t){console.error(`[Gemini Storage] Failed to remove key "${e}":`,t);}}function Ru(){try{const e="gemini:",t=[];for(let o=0;o<localStorage.length;o++){const a=localStorage.key(o);a&&a.startsWith(e)&&t.push(a);}for(const o of t)try{const a=localStorage.getItem(o);if(a!==null){const i=JSON.parse(a),s=o.slice(e.length);Ge(s,i),console.log(`[Gemini Storage] Migrated key: ${o}`);}}catch(a){console.warn(`[Gemini Storage] Failed to migrate key "${o}":`,a);}const n="gemini.sections",r=GM_getValue(n);r!=null&&(Ge("sections",r),GM_setValue(n,void 0),console.log("[Gemini Storage] Migrated: gemini.sections → gemini:sections")),t.length>0&&console.log(`[Gemini Storage] Migration complete. ${t.length} keys migrated from localStorage to GM_* storage.`);}catch(e){console.error("[Gemini Storage] Migration failed:",e);}}const fl="gemini.sections";function gl(){const e=ke(fl,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function Fu(e){Ge(fl,e);}async function Nu(e){return gl()[e]}function Ou(e,t){const n=gl();Fu({...n,[e]:t});}function Xi(e,t){return {...e,...t??{}}}async function Bu(e){const t=await Nu(e.path);let n;e.migrate?n=e.migrate(t):n=t??{},n=Object.assign((d=>JSON.parse(JSON.stringify(d)))(e.defaults),n),e.sanitize&&(n=e.sanitize(n));function o(){Ou(e.path,n);}function a(){return n}function i(d){n=e.sanitize?e.sanitize(d):d,o();}function s(d){const u=Object.assign((p=>JSON.parse(JSON.stringify(p)))(n),{});typeof d=="function"?d(u):Object.assign(u,d),n=e.sanitize?e.sanitize(u):u,o();}function c(){o();}return {get:a,set:i,update:s,save:c}}async function lo(e,t){const{path:n=e,...r}=t;return Bu({path:n,...r})}let $u=0;const cr=new Map;function _e(e={},...t){const{id:n,className:r,variant:o="default",padding:a="md",interactive:i=false,expandable:s=false,defaultExpanded:c=true,onExpandChange:d,mediaTop:l,title:u,subtitle:p,badge:f,actions:g,footer:b,divider:h=false,tone:x="neutral",stateKey:k}=e,y=m("div",{className:"card",id:n,tabIndex:i?0:void 0});y.classList.add(`card--${o}`,`card--p-${a}`),i&&y.classList.add("card--interactive"),x!=="neutral"&&y.classList.add(`card--tone-${x}`),r&&y.classList.add(...r.split(" ").filter(Boolean)),s&&y.classList.add("card--expandable");const w=s?k??n??(typeof u=="string"?`title:${u}`:null):null;let T=!s||c;w&&cr.has(w)&&(T=!!cr.get(w));let S=null,C=null,I=null,v=null,P=null;const E=n?`${n}-collapse`:`card-collapse-${++$u}`,F=()=>{if(v!==null&&(cancelAnimationFrame(v),v=null),P){const D=P;P=null,D();}},$=(D,j)=>{if(!I)return;F();const z=I;if(z.setAttribute("aria-hidden",String(!D)),!j){z.classList.remove("card-collapse--animating"),z.style.display=D?"":"none",z.style.height="",z.style.opacity="";return}if(z.classList.add("card-collapse--animating"),z.style.display="",D){z.style.height="auto";const U=z.scrollHeight;if(!U){z.classList.remove("card-collapse--animating"),z.style.display="",z.style.height="",z.style.opacity="";return}z.style.height="0px",z.style.opacity="0",z.offsetHeight,v=requestAnimationFrame(()=>{v=null,z.style.height=`${U}px`,z.style.opacity="1";});}else {const U=z.scrollHeight;if(!U){z.classList.remove("card-collapse--animating"),z.style.display="none",z.style.height="",z.style.opacity="";return}z.style.height=`${U}px`,z.style.opacity="1",z.offsetHeight,v=requestAnimationFrame(()=>{v=null,z.style.height="0px",z.style.opacity="0";});}const R=()=>{z.classList.remove("card-collapse--animating"),z.style.height="",D||(z.style.display="none"),z.style.opacity="";};let H=null;const B=U=>{U.target===z&&(H!==null&&(clearTimeout(H),H=null),z.removeEventListener("transitionend",B),z.removeEventListener("transitioncancel",B),P=null,R());};P=()=>{H!==null&&(clearTimeout(H),H=null),z.removeEventListener("transitionend",B),z.removeEventListener("transitioncancel",B),P=null,R();},z.addEventListener("transitionend",B),z.addEventListener("transitioncancel",B),H=window.setTimeout(()=>{P?.();},420);};function A(D){const j=document.createElementNS("http://www.w3.org/2000/svg","svg");return j.setAttribute("viewBox","0 0 24 24"),j.setAttribute("width","16"),j.setAttribute("height","16"),j.innerHTML=D==="up"?'<path d="M7 14l5-5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>':'<path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',j}function M(D,j=true,z=true){T=D,y.classList.toggle("card--collapsed",!T),y.classList.toggle("card--expanded",T),S&&(S.dataset.expanded=String(T),S.setAttribute("aria-expanded",String(T))),C&&(C.setAttribute("aria-expanded",String(T)),C.classList.toggle("card-toggle--collapsed",!T),C.setAttribute("aria-label",T?"Replier le contenu":"Deplier le contenu"),C.replaceChildren(A(T?"up":"down"))),s?$(T,z):I&&(I.style.display="",I.style.height="",I.style.opacity="",I.setAttribute("aria-hidden","false")),j&&d&&d(T),w&&cr.set(w,T);}if(l){const D=m("div",{className:"card-media"});D.append(l),y.appendChild(D);}const G=!!(u||p||f||g&&g.length||s);if(G){S=m("div",{className:"card-header"});const D=m("div",{className:"card-headline",style:"min-width:0;display:flex;flex-direction:column;gap:2px;"});if(u){const R=m("h3",{className:"card-title",style:"margin:0;font-size:15px;font-weight:700;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:8px;color:var(--fg);"},u);f&&R.append(typeof f=="string"?m("span",{className:"badge"},f):f),D.appendChild(R);}if(p){const R=m("div",{className:"card-subtitle",style:"opacity:.85;font-size:12px;color:color-mix(in oklab, var(--fg) 80%, #9ca3af)"},p);D.appendChild(R);}(D.childNodes.length||s)&&S.appendChild(D);const j=m("div",{className:"card-header-right",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"}),z=m("div",{className:"card-actions",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"});g?.forEach(R=>z.appendChild(R)),z.childNodes.length&&j.appendChild(z),s&&(C=m("button",{className:"card-toggle",type:"button",ariaExpanded:String(T),ariaControls:E,ariaLabel:T?"Replier le contenu":"Deplier le contenu"}),C.textContent=T?"▲":"▼",C.addEventListener("click",R=>{R.preventDefault(),R.stopPropagation(),M(!T);}),j.appendChild(C),S.classList.add("card-header--expandable"),S.addEventListener("click",R=>{const H=R.target;H?.closest(".card-actions")||H?.closest(".card-toggle")||M(!T);})),j.childNodes.length&&S.appendChild(j),y.appendChild(S);}I=m("div",{className:"card-collapse",id:E,ariaHidden:s?String(!T):"false"}),y.appendChild(I),h&&G&&I.appendChild(m("div",{className:"card-divider"}));const L=m("div",{className:"card-body"});if(L.append(...t),I.appendChild(L),b){h&&I.appendChild(m("div",{className:"card-divider"}));const D=m("div",{className:"card-footer"});D.append(b),I.appendChild(D);}return C&&C.setAttribute("aria-controls",E),M(T,false,false),w&&cr.set(w,T),y}let Kr=false;const Yr=new Set,Ve=e=>{const t=document.activeElement;for(const n of Yr)if(t&&(t===n||n.contains(t))){e.stopImmediatePropagation(),e.stopPropagation();return}};function Du(){Kr||(Kr=true,window.addEventListener("keydown",Ve,true),window.addEventListener("keypress",Ve,true),window.addEventListener("keyup",Ve,true),document.addEventListener("keydown",Ve,true),document.addEventListener("keypress",Ve,true),document.addEventListener("keyup",Ve,true));}function zu(){Kr&&(Yr.size>0||(Kr=false,window.removeEventListener("keydown",Ve,true),window.removeEventListener("keypress",Ve,true),window.removeEventListener("keyup",Ve,true),document.removeEventListener("keydown",Ve,true),document.removeEventListener("keypress",Ve,true),document.removeEventListener("keyup",Ve,true)));}function qr(e){const{id:t,value:n=null,options:r,placeholder:o="Select...",size:a="md",disabled:i=false,blockGameKeys:s=true,onChange:c,onOpenChange:d}=e,l=m("div",{className:"select",id:t}),u=m("button",{className:"select-trigger",type:"button"}),p=m("span",{className:"select-value"},o),f=m("span",{className:"select-caret"},"▾");u.append(p,f);const g=m("div",{className:"select-menu",role:"listbox",tabindex:"-1","aria-hidden":"true"});l.classList.add(`select--${a}`);let b=false,h=n,x=null,k=!!i;function y(R){return R==null?o:(e.options||r).find(B=>B.value===R)?.label??o}function w(R){p.textContent=y(R),g.querySelectorAll(".select-option").forEach(H=>{const B=H.dataset.value,U=R!=null&&B===R;H.classList.toggle("selected",U),H.setAttribute("aria-selected",String(U));});}function T(R){g.replaceChildren(),R.forEach(H=>{const B=m("button",{className:"select-option"+(H.disabled?" disabled":""),type:"button",role:"option","data-value":H.value,"aria-selected":String(H.value===h),tabindex:"-1"},H.label);H.value===h&&B.classList.add("selected"),H.disabled||B.addEventListener("pointerdown",U=>{U.preventDefault(),U.stopPropagation(),E(H.value,{notify:true}),v();},{capture:true}),g.appendChild(B);});}function S(){u.setAttribute("aria-expanded",String(b)),g.setAttribute("aria-hidden",String(!b));}function C(){const R=u.getBoundingClientRect();Object.assign(g.style,{minWidth:`${R.width}px`});}function I(){b||k||(b=true,l.classList.add("open"),S(),C(),document.addEventListener("mousedown",G,true),document.addEventListener("scroll",L,true),window.addEventListener("resize",D),g.focus({preventScroll:true}),s&&(Du(),Yr.add(l),x=()=>{Yr.delete(l),zu();}),d?.(true));}function v(){b&&(b=false,l.classList.remove("open"),S(),document.removeEventListener("mousedown",G,true),document.removeEventListener("scroll",L,true),window.removeEventListener("resize",D),u.focus({preventScroll:true}),x?.(),x=null,d?.(false));}function P(){b?v():I();}function E(R,H={}){const B=h;h=R,w(h),H.notify!==false&&B!==R&&c?.(R);}function F(){return h}function $(R){const H=Array.from(g.querySelectorAll(".select-option:not(.disabled)"));if(!H.length)return;const B=H.findIndex(ae=>ae.classList.contains("active")),U=H[(B+(R===1?1:H.length-1))%H.length];H.forEach(ae=>ae.classList.remove("active")),U.classList.add("active"),U.focus({preventScroll:true}),U.scrollIntoView({block:"nearest"});}function A(R){(R.key===" "||R.key==="Enter"||R.key==="ArrowDown")&&(R.preventDefault(),I());}function M(R){if(R.key==="Escape"){R.preventDefault(),v();return}if(R.key==="Enter"||R.key===" "){const H=g.querySelector(".select-option.active")||g.querySelector(".select-option.selected");H&&!H.classList.contains("disabled")&&(R.preventDefault(),E(H.dataset.value,{notify:true}),v());return}if(R.key==="ArrowDown"){R.preventDefault(),$(1);return}if(R.key==="ArrowUp"){R.preventDefault(),$(-1);return}}function G(R){l.contains(R.target)||v();}function L(){b&&C();}function D(){b&&C();}function j(R){k=!!R,u.disabled=k,l.classList.toggle("disabled",k),k&&v();}function z(R){e.options=R,T(R),R.some(H=>H.value===h)||(h=null,w(null));}return l.append(u,g),u.addEventListener("pointerdown",R=>{R.preventDefault(),R.stopPropagation(),P();},{capture:true}),u.addEventListener("keydown",A),g.addEventListener("keydown",M),T(r),n!=null?(h=n,w(h)):w(null),S(),j(k),{root:l,open:I,close:v,toggle:P,getValue:F,setValue:E,setOptions:z,setDisabled:j,destroy(){document.removeEventListener("mousedown",G,true),document.removeEventListener("scroll",L,true),window.removeEventListener("resize",D),x?.(),x=null;}}}function co(e={}){const{id:t,text:n="",htmlFor:r,tone:o="default",size:a="md",layout:i="inline",variant:s="text",required:c=false,disabled:d=false,tooltip:l,hint:u,icon:p,suffix:f,onClick:g}=e,b=m("div",{className:"lg-label-wrap",id:t}),h=m("label",{className:"lg-label",...r?{htmlFor:r}:{},...l?{title:l}:{}});if(p){const E=typeof p=="string"?m("span",{className:"lg-label-ico"},p):p;E.classList?.add?.("lg-label-ico"),h.appendChild(E);}const x=m("span",{className:"lg-label-text"},n);h.appendChild(x);const k=m("span",{className:"lg-label-req",ariaHidden:"true"}," *");c&&h.appendChild(k);let y=null;if(f!=null){y=typeof f=="string"?document.createTextNode(f):f;const E=m("span",{className:"lg-label-suffix"});E.appendChild(y),h.appendChild(E);}const w=u?m("div",{className:"lg-label-hint"},u):null;b.classList.add(`lg-label--${i}`),b.classList.add(`lg-label--${a}`),s==="title"&&b.classList.add("lg-label--title"),T(o),d&&b.classList.add("is-disabled"),b.appendChild(h),w&&b.appendChild(w),g&&h.addEventListener("click",g);function T(E){b.classList.remove("lg-label--default","lg-label--muted","lg-label--info","lg-label--success","lg-label--warning","lg-label--danger"),b.classList.add(`lg-label--${E}`);}function S(E){x.textContent=E;}function C(E){T(E);}function I(E){E&&!k.isConnected&&h.appendChild(k),!E&&k.isConnected&&k.remove(),E?h.setAttribute("aria-required","true"):h.removeAttribute("aria-required");}function v(E){b.classList.toggle("is-disabled",!!E);}function P(E){!E&&w&&w.isConnected?w.remove():E&&w?w.textContent=E:E&&!w&&b.appendChild(m("div",{className:"lg-label-hint"},E));}return {root:b,labelEl:h,hintEl:w,setText:S,setTone:C,setRequired:I,setDisabled:v,setHint:P}}function wn(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function dr(e,t){const n=document.createElement("span");n.className=`btn-ico btn-ico--${t}`;const r=wn(e);return r&&n.appendChild(r),n}function Gu(){const e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.marginRight="6px",t.style.display="none",t.style.flexShrink="0";const n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");const r=document.createElementNS(e,"animate");r.setAttribute("attributeName","stroke-dasharray"),r.setAttribute("values","1,150;90,150;90,150"),r.setAttribute("dur","1.5s"),r.setAttribute("repeatCount","indefinite");const o=document.createElementNS(e,"animateTransform");return o.setAttribute("attributeName","transform"),o.setAttribute("attributeType","XML"),o.setAttribute("type","rotate"),o.setAttribute("from","0 12 12"),o.setAttribute("to","360 12 12"),o.setAttribute("dur","1s"),o.setAttribute("repeatCount","indefinite"),n.appendChild(r),n.appendChild(o),t.appendChild(n),t}function Be(e={}){const{label:t="",id:n,variant:r="default",size:o="md",iconLeft:a,iconRight:i,loading:s=false,tooltip:c,type:d="button",onClick:l,disabled:u=false,fullWidth:p=false}=e,f=m("button",{className:"btn",id:n});f.type=d,r==="primary"&&f.classList.add("primary"),r==="danger"&&f.classList.add("danger"),o==="sm"&&f.classList.add("btn--sm"),c&&(f.title=c),p&&(f.style.width="100%");const g=Gu(),b=a?dr(a,"left"):null,h=i?dr(i,"right"):null,x=document.createElement("span");x.className="btn-label";const k=wn(t);k&&x.appendChild(k),!k&&(b||h)&&f.classList.add("btn--icon"),f.appendChild(g),b&&f.appendChild(b),f.appendChild(x),h&&f.appendChild(h);const y=u||s;f.disabled=y,f.setAttribute("aria-busy",String(!!s)),g.style.display=s?"inline-block":"none",l&&f.addEventListener("click",l);const w=f;return w.setLoading=T=>{f.setAttribute("aria-busy",String(!!T)),g.style.display=T?"inline-block":"none",f.disabled=T||u;},w.setDisabled=T=>{f.disabled=T||f.getAttribute("aria-busy")==="true";},w.setLabel=T=>{x.replaceChildren();const S=wn(T);S&&x.appendChild(S),!S&&(b||h)?f.classList.add("btn--icon"):f.classList.remove("btn--icon");},w.setIconLeft=T=>{if(T==null){b?.remove();return}b?b.replaceChildren(wn(T)):f.insertBefore(dr(T,"left"),x);},w.setIconRight=T=>{if(T==null){h?.remove();return}h?h.replaceChildren(wn(T)):f.appendChild(dr(T,"right"));},w.setVariant=T=>{f.classList.remove("primary","danger"),T==="primary"&&f.classList.add("primary"),T==="danger"&&f.classList.add("danger");},w}let ml=null,ja=null;function ju(){return ml}function Hu(e){ml=e,ja=null;}function hl(){return ja}function Wu(e){ja=e;}function Uu(){try{const e=window.visualViewport,t=Math.round((e?.width??window.innerWidth)||0),n=Math.round((e?.height??window.innerHeight)||0);if(t&&n)return t>=n?"landscape":"portrait"}catch{}return "unknown"}function bl(){const e=navigator.userAgent||"",t=navigator.platform||"",n=navigator.userAgentData;if(n&&typeof n.platform=="string"){const o=n.platform.toLowerCase();if(o.includes("windows"))return "windows";if(o.includes("mac"))return "mac";if(o.includes("android"))return "android";if(o.includes("chrome os")||o.includes("cros"))return "chromeos";if(o.includes("linux"))return "linux";if(o.includes("ios"))return "ios"}return /iPhone|iPad|iPod/i.test(e)||t==="MacIntel"&&(navigator.maxTouchPoints??0)>1?"ios":/Android/i.test(e)?"android":/CrOS/i.test(e)?"chromeos":/Win/i.test(e)?"windows":/Mac/i.test(e)?"mac":/Linux/i.test(e)?"linux":"unknown"}function xl(){const e=navigator.userAgent||"",t=navigator.userAgentData;if(t&&Array.isArray(t.brands)){const n=t.brands.map(i=>String(i.brand||i.brandName||i.brandVersion||i)),r=n.some(i=>/Edge/i.test(i)||/Microsoft Edge/i.test(i)),o=n.some(i=>/Opera/i.test(i)||/OPR/i.test(i)),a=n.some(i=>/Chrome|Chromium/i.test(i));if(r)return "Edge";if(o)return "Opera";if(a)return "Chrome";if(navigator.brave)return "Brave"}return /FxiOS/i.test(e)?"Firefox":/CriOS/i.test(e)?"Chrome":/EdgiOS/i.test(e)?"Edge":/OPiOS|OPR|Opera Mini|Opera/i.test(e)?"Opera":/Edg\//i.test(e)?"Edge":/OPR\//i.test(e)||/Opera/i.test(e)?"Opera":/Firefox/i.test(e)?"Firefox":/Safari/i.test(e)&&!/Chrome|Chromium|Edg|OPR/i.test(e)?"Safari":/Brave/i.test(e)||window.Brave||navigator.brave?"Brave":/Chrome|Chromium/i.test(e)?"Chrome":"Unknown"}function Vu(){const e=ju();if(e)return e;const t=navigator.userAgent||"",n=navigator.userAgentData;return n&&typeof n.mobile=="boolean"?n.mobile?"mobile":"desktop":/Android|iPhone|iPad|iPod|Mobile/i.test(t)?"mobile":"desktop"}function Xu(e){if(!e)return null;try{return new URL(e).hostname}catch{return null}}function yl(){try{return window.top!==window.self}catch{return  true}}function Ku(){const e=yl(),t=Xu(document.referrer);return e&&!!t&&/(^|\.)discord(app)?\.com$/i.test(t)?"discord":"web"}function uo(){const e=hl();if(e)return e;const t=Ku(),n=Vu(),r=bl(),o=xl(),a=yl(),i=window.screen||{},s=window.visualViewport,c=Math.round(window.innerWidth||document.documentElement.clientWidth||0),d=Math.round(window.innerHeight||document.documentElement.clientHeight||0),l=Math.round(s?.width??c),u=Math.round(s?.height??d),p=Math.round(i.width||0),f=Math.round(i.height||0),g=Math.round(i.availWidth||p),b=Math.round(i.availHeight||f),h=Number.isFinite(window.devicePixelRatio)?window.devicePixelRatio:1,x={surface:t,host:location.hostname,origin:location.origin,isInIframe:a,platform:n,browser:o,os:r,viewportWidth:c,viewportHeight:d,visualViewportWidth:l,visualViewportHeight:u,screenWidth:p,screenHeight:f,availScreenWidth:g,availScreenHeight:b,dpr:h,orientation:Uu()};return Wu(x),x}function Yu(){return uo().surface==="discord"}function qu(){return uo().platform==="mobile"}function Ju(){uo();}function Qu(){return hl()!==null}const Re={init:Ju,isReady:Qu,detect:uo,isDiscord:Yu,isMobile:qu,detectOS:bl,detectBrowser:xl,setPlatformOverride:Hu};let Jr=false;const Sn=new Set;function Zu(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}const Xe=e=>{const t=Zu();if(t){for(const n of Sn)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function ep(){Jr||(Jr=true,window.addEventListener("keydown",Xe,true),window.addEventListener("keypress",Xe,true),window.addEventListener("keyup",Xe,true),document.addEventListener("keydown",Xe,true),document.addEventListener("keypress",Xe,true),document.addEventListener("keyup",Xe,true));}function tp(){Jr&&(Jr=false,window.removeEventListener("keydown",Xe,true),window.removeEventListener("keypress",Xe,true),window.removeEventListener("keyup",Xe,true),document.removeEventListener("keydown",Xe,true),document.removeEventListener("keypress",Xe,true),document.removeEventListener("keyup",Xe,true));}function np(e){return Sn.size===0&&ep(),Sn.add(e),()=>{Sn.delete(e),Sn.size===0&&tp();}}function rp(e,t,n,r){let o;switch(e){case "digits":o="0-9";break;case "alpha":o="\\p{L}";break;case "alphanumeric":o="\\p{L}0-9";break;default:return null}return t&&(o+=" "),n&&(o+="\\-"),r&&(o+="_"),new RegExp(`[^${o}]`,"gu")}function op(e,t){return t?e.replace(t,""):e}function ap(e,t=0){if(!t)return e;let n;return((...r)=>{clearTimeout(n),n=setTimeout(()=>e(...r),t);})}function rn(e={}){const{id:t,placeholder:n="",value:r="",mode:o="any",allowSpaces:a=false,allowDashes:i=false,allowUnderscore:s=false,maxLength:c,blockGameKeys:d=true,debounceMs:l=0,onChange:u,onEnter:p,label:f}=e,g=m("div",{className:"lg-input-wrap"}),b=m("input",{className:"input",id:t,placeholder:n});if(typeof c=="number"&&c>0&&(b.maxLength=c),r&&(b.value=r),f){const E=m("div",{className:"lg-input-label"},f);g.appendChild(E);}g.appendChild(b);const h=rp(o,a,i,s),x=()=>{const E=b.selectionStart??b.value.length,F=b.value.length,$=op(b.value,h);if($!==b.value){b.value=$;const A=F-$.length,M=Math.max(0,E-A);b.setSelectionRange(M,M);}},k=ap(()=>u?.(b.value),l);b.addEventListener("input",()=>{x(),k();}),b.addEventListener("paste",()=>queueMicrotask(()=>{x(),k();})),b.addEventListener("keydown",E=>{E.key==="Enter"&&p?.(b.value);});const y=d?np(b):()=>{};function w(){return b.value}function T(E){b.value=E??"",x(),k();}function S(){b.focus();}function C(){b.blur();}function I(E){b.disabled=!!E;}function v(){return document.activeElement===b}function P(){y();}return {root:g,input:b,getValue:w,setValue:T,focus:S,blur:C,setDisabled:I,isFocused:v,destroy:P}}function we(e,t,n){return Math.min(n,Math.max(t,e))}function En({h:e,s:t,v:n,a:r}){const o=(e%360+360)%360/60,a=n*t,i=a*(1-Math.abs(o%2-1));let s=0,c=0,d=0;switch(Math.floor(o)){case 0:s=a,c=i;break;case 1:s=i,c=a;break;case 2:c=a,d=i;break;case 3:c=i,d=a;break;case 4:s=i,d=a;break;default:s=a,d=i;break}const u=n-a,p=Math.round((s+u)*255),f=Math.round((c+u)*255),g=Math.round((d+u)*255);return {r:we(p,0,255),g:we(f,0,255),b:we(g,0,255),a:we(r,0,1)}}function vl({r:e,g:t,b:n,a:r}){const o=we(e,0,255)/255,a=we(t,0,255)/255,i=we(n,0,255)/255,s=Math.max(o,a,i),c=Math.min(o,a,i),d=s-c;let l=0;d!==0&&(s===o?l=60*((a-i)/d%6):s===a?l=60*((i-o)/d+2):l=60*((o-a)/d+4)),l<0&&(l+=360);const u=s===0?0:d/s;return {h:l,s:u,v:s,a:we(r,0,1)}}function Ha({r:e,g:t,b:n}){const r=o=>we(Math.round(o),0,255).toString(16).padStart(2,"0");return `#${r(e)}${r(t)}${r(n)}`.toUpperCase()}function ip({r:e,g:t,b:n,a:r}){const o=we(Math.round(r*255),0,255);return `${Ha({r:e,g:t,b:n})}${o.toString(16).padStart(2,"0")}`.toUpperCase()}function kn({r:e,g:t,b:n,a:r}){const o=Math.round(r*1e3)/1e3;return `rgba(${e}, ${t}, ${n}, ${o})`}function Kt(e){let t=e.trim();if(!t||(t.startsWith("#")&&(t=t.slice(1)),![3,4,6,8].includes(t.length))||!/^[0-9a-fA-F]+$/.test(t))return null;(t.length===3||t.length===4)&&(t=t.split("").map(i=>i+i).join(""));let n=255;t.length===8&&(n=parseInt(t.slice(6,8),16),t=t.slice(0,6));const r=parseInt(t.slice(0,2),16),o=parseInt(t.slice(2,4),16),a=parseInt(t.slice(4,6),16);return {r,g:o,b:a,a:n/255}}function ta(e){if(!e)return null;const t=e.trim();if(t.startsWith("#"))return Kt(t);const n=t.match(/^rgba?\(([^)]+)\)$/i);if(n){const r=n[1].split(",").map(c=>c.trim());if(r.length<3)return null;const o=Number(r[0]),a=Number(r[1]),i=Number(r[2]),s=r[3]!=null?Number(r[3]):1;return [o,a,i,s].some(c=>Number.isNaN(c))?null:{r:o,g:a,b:i,a:s}}return null}function sp(e,t){const n=ta(e)??Kt(e??"")??{r:244,g:67,b:54,a:1};return typeof t=="number"&&(n.a=we(t,0,1)),vl(n)}function lp(e){return `#${e.trim().replace(/[^0-9a-fA-F#]/g,"").replace(/#/g,"")}`.slice(0,9).toUpperCase()}function cp(e){let t=e.trim();return t&&(/^rgba?\s*\(/i.test(t)?t=t.replace(/^rgba?/i,"rgba"):(t=t.replace(/^\(?(.*)\)?$/,"$1"),t=`rgba(${t})`),t=t.replace(/\s*\(\s*/,"("),t=t.replace(/\s*\)\s*$/,")"),t=t.replace(/\s*,\s*/g,", "),t)}function St(e){const t=En(e),n=En({...e,a:1});return {hsva:{...e},hex:Ha(n),hexa:ip(t),rgba:kn(t),alpha:e.a}}function dp(e={}){const{id:t,label:n="Color",value:r,alpha:o,defaultExpanded:a=false,detectMobile:i,onInput:s,onChange:c}=e,l=i?i():Re.detect().platform==="mobile";let u=sp(r,o);const p=_e({id:t,className:"color-picker",title:n,padding:l?"md":"lg",variant:"soft",expandable:!l,defaultExpanded:!l&&a});p.classList.add(l?"color-picker--mobile":"color-picker--desktop");const f=p.querySelector(".card-header");f&&f.classList.add("color-picker__header");const g=f?.querySelector(".card-title"),b=m("button",{className:"color-picker__preview",type:"button",title:`Preview ${n}`,"aria-label":`Change ${n}`});g?g.prepend(b):f?f.prepend(b):p.prepend(b);const h=p.querySelector(".card-toggle");!l&&h&&b.addEventListener("click",()=>{p.classList.contains("card--collapsed")&&h.click();});const x=p.querySelector(".card-collapse");let k=null,y=null,w=null,T=null,S=null,C=null,I=null,v=null,P=null,E="hex";function F(L){const D=St(u);L==="input"?s?.(D):c?.(D);}function $(){const L=St(u);if(b.style.setProperty("--cp-preview-color",L.rgba),b.setAttribute("aria-label",`${n}: ${L.hexa}`),!l&&k&&y&&w&&T&&S&&C&&I){const D=En({...u,s:1,v:1,a:1}),j=kn(D);k.style.setProperty("--cp-palette-hue",j),y.style.left=`${u.s*100}%`,y.style.top=`${(1-u.v)*100}%`,w.style.setProperty("--cp-alpha-gradient",`linear-gradient(180deg, ${kn({...D,a:1})} 0%, ${kn({...D,a:0})} 100%)`),T.style.top=`${(1-u.a)*100}%`,S.style.setProperty("--cp-hue-color",kn(En({...u,v:1,s:1,a:1}))),C.style.left=`${u.h/360*100}%`;const z=u.a===1?L.hex:L.hexa,R=L.rgba,H=E==="hex"?z:R;I!==document.activeElement&&(I.value=H),I.setAttribute("aria-label",`${E.toUpperCase()} code for ${n}`),I.placeholder=E==="hex"?"#RRGGBB or #RRGGBBAA":"rgba(0, 0, 0, 1)",E==="hex"?I.maxLength=9:I.removeAttribute("maxLength"),I.dataset.mode=E,v&&(v.textContent=E.toUpperCase(),v.setAttribute("aria-label",E==="hex"?"Passer en saisie RGBA":"Revenir en saisie HEX"),v.setAttribute("aria-pressed",E==="rgba"?"true":"false"),v.classList.toggle("is-alt",E==="rgba"));}P&&P!==document.activeElement&&(P.value=L.hex);}function A(L,D=null){u={h:(L.h%360+360)%360,s:we(L.s,0,1),v:we(L.v,0,1),a:we(L.a,0,1)},$(),D&&F(D);}function M(L,D=null){A(vl(L),D);}function G(L,D,j){L.addEventListener("pointerdown",z=>{z.preventDefault();const R=z.pointerId,H=U=>{U.pointerId===R&&D(U);},B=U=>{U.pointerId===R&&(document.removeEventListener("pointermove",H),document.removeEventListener("pointerup",B),document.removeEventListener("pointercancel",B),j?.(U));};D(z),document.addEventListener("pointermove",H),document.addEventListener("pointerup",B),document.addEventListener("pointercancel",B);});}if(!l&&x){const L=x.querySelector(".card-body");if(L){L.classList.add("color-picker__body"),y=m("div",{className:"color-picker__palette-cursor"}),k=m("div",{className:"color-picker__palette"},y),T=m("div",{className:"color-picker__alpha-thumb"}),w=m("div",{className:"color-picker__alpha"},T),C=m("div",{className:"color-picker__hue-thumb"}),S=m("div",{className:"color-picker__hue"},C);const D=m("div",{className:"color-picker__main"},k,w),j=m("div",{className:"color-picker__hue-row"},S),z=rn({blockGameKeys:true});I=z.input,I.classList.add("color-picker__hex-input"),I.value="",I.maxLength=9,I.spellcheck=false,I.inputMode="text",I.setAttribute("aria-label",`Hex code for ${n}`),v=m("button",{type:"button",className:"color-picker__mode-btn",textContent:"HEX","aria-pressed":"false","aria-label":"Passer en saisie RGBA"}),z.root.classList.add("color-picker__hex-wrap");const R=m("div",{className:"color-picker__hex-row"},v,z.root);L.replaceChildren(D,j,R),G(k,B=>{if(!k||!y)return;const U=k.getBoundingClientRect(),ae=we((B.clientX-U.left)/U.width,0,1),X=we((B.clientY-U.top)/U.height,0,1);A({...u,s:ae,v:1-X},"input");},()=>F("change")),G(w,B=>{if(!w)return;const U=w.getBoundingClientRect(),ae=we((B.clientY-U.top)/U.height,0,1);A({...u,a:1-ae},"input");},()=>F("change")),G(S,B=>{if(!S)return;const U=S.getBoundingClientRect(),ae=we((B.clientX-U.left)/U.width,0,1);A({...u,h:ae*360},"input");},()=>F("change")),v.addEventListener("click",()=>{if(E=E==="hex"?"rgba":"hex",I){const B=St(u);I.value=E==="hex"?u.a===1?B.hex:B.hexa:B.rgba;}$(),I?.focus(),I?.select();}),I.addEventListener("input",()=>{if(E==="hex"){const B=lp(I.value);if(B!==I.value){const U=I.selectionStart??B.length;I.value=B,I.setSelectionRange(U,U);}}});const H=()=>{const B=I.value;if(E==="hex"){const U=Kt(B);if(!U){I.value=u.a===1?St(u).hex:St(u).hexa;return}const ae=B.startsWith("#")?B.slice(1):B,X=ae.length===4||ae.length===8;U.a=X?U.a:u.a,M(U,"change");}else {const U=cp(B),ae=ta(U);if(!ae){I.value=St(u).rgba;return}M(ae,"change");}};I.addEventListener("change",H),I.addEventListener("blur",H),I.addEventListener("keydown",B=>{B.key==="Enter"&&(H(),I.blur());});}}return l&&(x&&x.remove(),P=m("input",{className:"color-picker__native",type:"color",value:Ha(En({...u,a:1}))}),b.addEventListener("click",()=>P.click()),P.addEventListener("input",()=>{const L=Kt(P.value);L&&(L.a=u.a,M(L,"input"),F("change"));}),p.appendChild(P)),$(),{root:p,isMobile:l,getValue:()=>St(u),setValue:(L,D)=>{const j=ta(L)??Kt(L)??Kt("#FFFFFF");j&&(typeof D=="number"&&(j.a=D),M(j,null));}}}const up=window;function pp(){if(typeof unsafeWindow<"u"&&unsafeWindow)return unsafeWindow;const e=window.wrappedJSObject;return e&&e!==window?e:up}const fp=pp(),O=fp;function gp(e){try{return !!e.isSecureContext}catch{return  false}}function Wa(e){const t=e?.getRootNode?.();return t&&(t instanceof Document||t.host)?t:document}function wl(){const e=navigator.platform||"",t=navigator.userAgent||"";return /Mac|iPhone|iPad|iPod/i.test(e)||/Mac OS|iOS/i.test(t)}async function mp(){try{const e=await navigator.permissions?.query?.({name:"clipboard-write"});return e?e.state==="granted"||e.state==="prompt":!0}catch{return  true}}function hp(e,t){const n=document.createElement("textarea");return n.value=e,n.setAttribute("readonly","true"),n.style.position="fixed",n.style.opacity="0",n.style.pointerEvents="none",n.style.top="0",t.appendChild?t.appendChild(n):document.body.appendChild(n),n}function bp(e){try{const t=window.getSelection?.();if(!t)return !1;const n=document.createRange();return n.selectNodeContents(e),t.removeAllRanges(),t.addRange(n),!0}catch{return  false}}async function xp(e){if(!("clipboard"in navigator))return {ok:false,method:"clipboard-write"};if(!gp(O))return {ok:false,method:"clipboard-write"};if(!await mp())return {ok:false,method:"clipboard-write"};try{return await navigator.clipboard.writeText(e),{ok:!0,method:"clipboard-write"}}catch{return {ok:false,method:"clipboard-write"}}}function yp(e,t){try{const n=t||Wa(),r=hp(e,n);r.focus(),r.select(),r.setSelectionRange(0,r.value.length);let o=!1;try{o=document.execCommand("copy");}catch{o=!1;}return r.remove(),{ok:o,method:"execCommand"}}catch{return {ok:false,method:"execCommand"}}}function vp(e,t){if(!t)return {ok:false,method:"selection"};const n=t.textContent??"";let r=false;if(n!==e)try{t.textContent=e,r=!0;}catch{}const o=bp(t);r&&setTimeout(()=>{try{t.textContent=n;}catch{}},80);const a=wl()?"⌘C pour copier":"Ctrl+C pour copier";return {ok:o,method:"selection",hint:a}}async function wp(e,t={}){const n=(e??"").toString();if(!n.length)return {ok:false,method:"noop"};const r=await xp(n);if(r.ok)return r;const o=t.injectionRoot||Wa(t.valueNode||void 0),a=yp(n,o);if(a.ok)return a;const i=vp(n,t.valueNode||null);if(i.ok)return i;if(!t.disablePromptFallback)try{return window.prompt(Re.isDiscord()?"Copie manuelle (Discord bloque clipboard):":"Copie manuelle:",n),{ok:!0,method:"prompt"}}catch{}return {ok:false,method:"noop"}}function Sp(e,t,n={}){const r=o=>{if(n.showTip){n.showTip(o);return}try{e.setAttribute("aria-label",o);const a=document.createElement("div");a.textContent=o,a.style.position="absolute",a.style.top="-28px",a.style.right="0",a.style.padding="4px 8px",a.style.borderRadius="8px",a.style.fontSize="12px",a.style.background="color-mix(in oklab, var(--bg) 85%, transparent)",a.style.border="1px solid var(--border)",a.style.color="var(--fg)",a.style.pointerEvents="none",a.style.opacity="0",a.style.transition="opacity .12s";const i=Wa(e);i.appendChild?i.appendChild(a):document.body.appendChild(a);const s=e.getBoundingClientRect();a.style.left=`${s.right-8}px`,a.style.top=`${s.top-28}px`,requestAnimationFrame(()=>a.style.opacity="1"),setTimeout(()=>{a.style.opacity="0",setTimeout(()=>a.remove(),150);},1200);}catch{}};e.addEventListener("click",async o=>{o.stopPropagation();const a=(t()??"").toString(),i=await wp(a,{valueNode:n.valueNode??null,injectionRoot:n.injectionRoot??null,disablePromptFallback:n.disablePromptFallback??false});n.onResult?.(i),i.ok?i.method==="clipboard-write"||i.method==="execCommand"||i.method==="prompt"?r("Copié"):i.method==="selection"&&r(i.hint||(wl()?"⌘C pour copier":"Ctrl+C pour copier")):r("Impossible de copier");});}const Mn={light:{"--bg":"rgba(255,255,255,0.7)","--fg":"#0f172a","--muted":"rgba(15,23,42,0.06)","--soft":"rgba(15,23,42,0.04)","--accent":"#2563eb","--border":"rgba(15,23,42,0.12)","--shadow":"rgba(2,6,23,.2)","--paper":"#FDFBF7","--tab-bg":"#ffffff","--tab-fg":"#0f172a","--pill-from":"#4f46e5","--pill-to":"#06b6d4","--low":"#dc2626","--medium":"#f59e0b","--high":"#16a34a","--complete":"#15803d","--info":"#2563eb","--accent-1":"#16a34a","--accent-2":"#7c3aed","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--switch-thumb":"#ffffff","--journal-ink":"#333333"},dark:{"--bg":"rgba(10,12,18,0.6)","--fg":"#e5e7eb","--muted":"rgba(229,231,235,0.08)","--soft":"rgba(229,231,235,0.05)","--accent":"#60a5fa","--border":"rgba(148,163,184,0.2)","--shadow":"rgba(0,0,0,.45)","--paper":"#1a1d24","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#e5e7eb","--pill-from":"#6366f1","--pill-to":"#06b6d4","--low":"#ef4444","--medium":"#f59e0b","--high":"#22c55e","--complete":"#16a34a","--info":"#3b82f6","--accent-1":"#22c55e","--accent-2":"#a855f7","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},sepia:{"--bg":"rgba(247,242,231,0.72)","--fg":"#3b2f2f","--muted":"rgba(59,47,47,0.06)","--soft":"rgba(59,47,47,0.04)","--accent":"#b07d62","--border":"rgba(59,47,47,0.14)","--shadow":"rgba(0,0,0,.18)","--paper":"#F5E6D3","--tab-bg":"#fff","--tab-fg":"#3b2f2f","--pill-from":"#b07d62","--pill-to":"#d4a373","--low":"#c2410c","--medium":"#d97706","--high":"#15803d","--complete":"#166534","--info":"#1d4ed8","--accent-1":"#15803d","--accent-2":"#6b21a8","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--switch-thumb":"#ffffff","--journal-ink":"#3b2f2f"},forest:{"--bg":"rgba(14,24,18,0.62)","--fg":"#e7f5e9","--muted":"rgba(231,245,233,0.08)","--soft":"rgba(231,245,233,0.05)","--accent":"#34d399","--border":"rgba(231,245,233,0.16)","--shadow":"rgba(0,0,0,.5)","--paper":"#1e2820","--tab-bg":"rgba(255,255,255,0.06)","--tab-fg":"#e7f5e9","--pill-from":"#10b981","--pill-to":"#84cc16","--low":"#dc2626","--medium":"#eab308","--high":"#22c55e","--complete":"#16a34a","--info":"#06b6d4","--accent-1":"#22c55e","--accent-2":"#8b5cf6","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},violet:{"--bg":"rgba(23, 16, 42, 0.68)","--fg":"#f5f3ff","--muted":"rgba(245,243,255,0.08)","--soft":"rgba(245,243,255,0.05)","--accent":"#a855f7","--border":"rgba(216,180,254,0.22)","--shadow":"rgba(12,3,30,.55)","--paper":"#1a1424","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#ede9fe","--pill-from":"#a855f7","--pill-to":"#f472b6","--low":"#f43f5e","--medium":"#fbbf24","--high":"#4ade80","--complete":"#22c55e","--info":"#60a5fa","--accent-1":"#4ade80","--accent-2":"#c084fc","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},ocean:{"--bg":"rgba(10, 34, 46, 0.66)","--fg":"#e0f7ff","--muted":"rgba(224,247,255,0.07)","--soft":"rgba(224,247,255,0.05)","--accent":"#38bdf8","--border":"rgba(125, 211, 252, 0.22)","--shadow":"rgba(0, 16, 32, .52)","--paper":"#0f2027","--tab-bg":"rgba(56,189,248,0.14)","--tab-fg":"#e0f7ff","--pill-from":"#0ea5e9","--pill-to":"#14b8a6","--low":"#f43f5e","--medium":"#fbbf24","--high":"#34d399","--complete":"#10b981","--info":"#38bdf8","--accent-1":"#22c55e","--accent-2":"#a78bfa","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},ember:{"--bg":"rgba(34,18,10,0.64)","--fg":"#fff7ed","--muted":"rgba(255,247,237,0.08)","--soft":"rgba(255,247,237,0.05)","--accent":"#f97316","--border":"rgba(255, 159, 92, 0.24)","--shadow":"rgba(16,6,2,.52)","--paper":"#1a1210","--tab-bg":"rgba(255,247,237,0.09)","--tab-fg":"#fff7ed","--pill-from":"#fb923c","--pill-to":"#facc15","--low":"#dc2626","--medium":"#f59e0b","--high":"#22c55e","--complete":"#16a34a","--info":"#38bdf8","--accent-1":"#22c55e","--accent-2":"#c084fc","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},magicGarden:{"--bg":"#201D1D","--fg":"#F5F5F5","--muted":"rgba(255,255,255,0.6)","--soft":"rgba(0,0,0,0.3)","--accent":"#FFF27D","--border":"rgba(255,255,255,0.1)","--border-accent":"#4A3B2E","--shadow":"rgba(0,0,0,0.5)","--paper":"#FDFBF7","--card-shadow":"0 4px 10px rgba(0, 0, 0, 0.5)","--tab-bg":"#10725A","--tab-fg":"#F5F5F5","--section-title":"#10725A","--group-title":"#5EB292","--item-label":"#F5F5F5","--item-desc":"rgba(255,255,255,0.6)","--item-value":"#FFF27D","--card-bg":"rgba(0,0,0,0.3)","--card-radius":"12px","--card-border":"#4A3B2E","--pill-from":"#FFF27D","--pill-to":"#5EB292","--scrollbar-thumb":"rgba(255,255,255,0.2)","--scrollbar-thumb-hover":"rgba(255,255,255,0.3)","--low":"#F98B4B","--medium":"#F3D32B","--high":"#5EAC46","--complete":"#0B893F","--info":"#38bdf8","--accent-1":"#4caf50","--accent-2":"#9c27b0","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--switch-thumb":"#ffffff","--journal-ink":"#000000"}};function kp(e){const{host:t,themes:n,initialTheme:r,onThemeChange:o}=e;let a=r,i=null,s=false;function c(l){const u=n[l]||n[a]||{};t.setAttribute("data-theme",l),s&&t.classList.add("theme-anim");for(const[p,f]of Object.entries(u))t.style.setProperty(p,f);s?(i!==null&&clearTimeout(i),i=O.setTimeout(()=>{t.classList.remove("theme-anim"),i=null;},320)):s=true,a=l,o?.(l);}function d(){return a}return c(r),{applyTheme:c,getCurrentTheme:d}}const na={ui:{expandedCards:{style:false,system:false}}};async function Cp(){const e=await lo("tab-settings",{version:1,defaults:na,sanitize:o=>({ui:{expandedCards:Xi(na.ui.expandedCards,o.ui?.expandedCards)}})});function t(o){const a=e.get();e.update({ui:{...a.ui,...o,expandedCards:Xi(a.ui.expandedCards,o.expandedCards)}});}function n(o,a){const i=e.get();e.update({ui:{...i.ui,expandedCards:{...i.ui.expandedCards,[o]:!!a}}});}function r(o){const a=e.get();n(o,!a.ui.expandedCards[o]);}return {get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:r}}function Sl(e){return e.replace(/[_-]+/g," ").replace(/^\w/,t=>t.toUpperCase())}function Tp(){return Object.keys(Mn).map(e=>({value:e,label:Sl(e)}))}const Pp=["--bg","--fg","--accent","--muted","--soft","--border","--shadow","--paper","--tab-bg","--tab-fg","--pill-from","--pill-to","--low","--medium","--high","--complete","--info","--accent-1","--accent-2","--accent-3"];function Ap(e){return Sl(e.replace(/^--/,""))}function Ip(e){return e.alpha<1?e.rgba:e.hex}class _p extends Bt{constructor(t){super({id:"tab-settings",label:"Settings"}),this.deps=t;}async build(t){const n=this.createGrid("12px");n.id="settings",t.appendChild(n);let r;try{r=await Cp();}catch{r={get:()=>na,set:()=>{},save:()=>{},setUI:()=>{},setCardExpanded:()=>{},toggleCard:()=>{}};}const o=r.get(),a=Object.keys(Mn),i=this.deps.getCurrentTheme?.()??this.deps.initialTheme,s=a.includes(i)?i:a[0]??"dark";let c=s;const d=co({text:"Theme",tone:"muted",size:"lg"}),l=qr({options:Tp(),value:s,onChange:g=>{c=g,this.deps.applyTheme(g),this.renderThemePickers(g,u,c);}}),u=m("div",{className:"settings-theme-grid"}),p=_e({title:"Style",padding:"lg",expandable:true,defaultExpanded:!!o.ui.expandedCards.style,onExpandChange:g=>r.setCardExpanded("style",g)},m("div",{className:"kv settings-theme-row"},d.root,l.root),u);this.renderThemePickers(s,u,c);const f=this.createEnvCard({defaultExpanded:!!o.ui.expandedCards.system,onExpandChange:g=>r.setCardExpanded("system",g)});n.appendChild(p),n.appendChild(f);}renderThemePickers(t,n,r){const o=Mn[t];if(n.replaceChildren(),!!o)for(const a of Pp){const i=o[a];if(i==null)continue;const s=dp({label:Ap(a),value:i,defaultExpanded:false,onInput:c=>this.updateThemeVar(t,a,c,r),onChange:c=>this.updateThemeVar(t,a,c,r)});n.appendChild(s.root);}}updateThemeVar(t,n,r,o){const a=Mn[t];a&&(a[n]=Ip(r),o===t&&this.deps.applyTheme(t));}createEnvCard(t){const n=t?.defaultExpanded??false,r=t?.onExpandChange,o=(h,x)=>{const k=m("div",{className:"kv kv--inline-mobile"}),y=m("label",{},h),w=m("div",{className:"ro"});return typeof x=="string"?w.textContent=x:w.append(x),k.append(y,w),k},a=m("code",{},"—"),i=m("span",{},"—"),s=m("span",{},"—"),c=m("span",{},"—"),d=m("span",{},"—"),l=m("span",{},"—"),u=()=>{const h=Re.detect();s.textContent=h.surface,c.textContent=h.platform,d.textContent=h.browser??"Unknown",l.textContent=h.os??"Unknown",a.textContent=h.host,i.textContent=h.isInIframe?"Yes":"No";},p=Be({label:"Copy JSON",variant:"primary",size:"sm"});Sp(p,()=>{const h=Re.detect();return JSON.stringify(h,null,2)});const f=m("div",{style:"width:100%;display:flex;justify-content:center;"},p),g=_e({title:"System",variant:"soft",padding:"lg",footer:f,expandable:true,defaultExpanded:n,onExpandChange:r},o("Surface",s),o("Platform",c),o("Browser",d),o("OS",l),o("Host",a),o("Iframe",i)),b=()=>{document.hidden||u();};return document.addEventListener("visibilitychange",b),u(),this.addCleanup(()=>document.removeEventListener("visibilitychange",b)),g}}function Yn(e={}){const{id:t,checked:n=false,disabled:r=false,size:o="md",label:a,labelSide:i="right",onChange:s}=e,c=m("div",{className:"lg-switch-wrap"}),d=m("button",{className:`lg-switch lg-switch--${o}`,id:t,type:"button",role:"switch","aria-checked":String(!!n),"aria-disabled":String(!!r),title:a??"Basculer"}),l=m("span",{className:"lg-switch-track"}),u=m("span",{className:"lg-switch-thumb"});d.append(l,u);let p=null;a&&i!=="none"&&(p=m("span",{className:"lg-switch-label"},a)),p&&i==="left"?c.append(p,d):p&&i==="right"?c.append(d,p):c.append(d);let f=!!n,g=!!r;function b(){d.classList.toggle("on",f),d.setAttribute("aria-checked",String(f)),d.disabled=g,d.setAttribute("aria-disabled",String(g));}function h(v=false){g||(f=!f,b(),v||s?.(f));}function x(v){v.preventDefault(),h();}function k(v){g||((v.key===" "||v.key==="Enter")&&(v.preventDefault(),h()),v.key==="ArrowLeft"&&(v.preventDefault(),w(false)),v.key==="ArrowRight"&&(v.preventDefault(),w(true)));}d.addEventListener("click",x),d.addEventListener("keydown",k);function y(){return f}function w(v,P=false){f=!!v,b(),P||s?.(f);}function T(v){g=!!v,b();}function S(v){if(!v){p&&(p.remove(),p=null);return}p?p.textContent=v:(p=m("span",{className:"lg-switch-label"},v),c.append(p));}function C(){d.focus();}function I(){d.removeEventListener("click",x),d.removeEventListener("keydown",k);}return b(),{root:c,button:d,isChecked:y,setChecked:w,setDisabled:T,setLabel:S,focus:C,destroy:I}}function kl(e){const{id:t,columns:n,data:r,pageSize:o=0,stickyHeader:a=true,zebra:i=true,animations:s=true,respectReducedMotion:c=true,compact:d=false,maxHeight:l,selectable:u=false,selectionType:p="switch",selectOnRowClick:f=false,initialSelection:g=[],hideHeaderCheckbox:b=false,getRowId:h=(K,Q)=>String(Q),onSortChange:x,onSelectionChange:k,onRowClick:y}=e;let w=n.slice(),T=r.slice(),S=r.slice(),C=null,I=null,v=1;const P=typeof window<"u"&&typeof window.matchMedia=="function"?window.matchMedia("(prefers-reduced-motion: reduce)").matches:false,E=!!s&&!(c&&P),F=m("div",{className:"lg-table-wrap",id:t});if(l!=null){const K=typeof l=="number"?`${l}px`:l;F.style.setProperty("--tbl-max-h",K);}const $=m("div",{className:"lg-table"}),A=m("div",{className:"lg-thead"}),M=m("div",{className:"lg-tbody"}),G=m("div",{className:"lg-tfoot"});a&&F.classList.add("sticky"),i&&F.classList.add("zebra"),d&&F.classList.add("compact"),u&&F.classList.add("selectable");const L=p==="switch"?"52px":"36px";F.style.setProperty("--check-w",L);function D(K){return K==="center"?"center":K==="right"?"flex-end":"flex-start"}function j(){const K=w.map(ie=>{const ue=(ie.width||"1fr").trim();return /\bfr$/.test(ue)?`minmax(0, ${ue})`:ue}),Q=(u?[L,...K]:K).join(" ");F.style.setProperty("--lg-cols",Q);}j();function z(){return o?Math.max(1,Math.ceil(T.length/o)):1}function R(){if(!o)return T;const K=(v-1)*o;return T.slice(K,K+o)}function H(){if(!C||!I)return;const K=w.find(ue=>String(ue.key)===C),Q=I==="asc"?1:-1,ie=K?.sortFn?(ue,he)=>Q*K.sortFn(ue,he):(ue,he)=>{const ne=ue[C],re=he[C];return ne==null&&re==null?0:ne==null?-1*Q:re==null?1*Q:typeof ne=="number"&&typeof re=="number"?Q*(ne-re):Q*String(ne).localeCompare(String(re),void 0,{numeric:true,sensitivity:"base"})};T.sort(ie);}const B=new Set(g);function U(){return Array.from(B)}const ae=new Map;function X(K){B.clear(),K.forEach(Q=>B.add(Q)),fe(),ae.forEach((Q,ie)=>{Q.setChecked(B.has(ie),true);}),hn(),k?.(U());}function Y(){B.clear(),fe(),ae.forEach(K=>K.setChecked(false,true)),hn(),k?.(U());}let se=null;function fe(){if(!se)return;const K=R();if(!K.length){se.indeterminate=false,se.checked=false;return}const Q=K.map((ue,he)=>h(ue,(v-1)*(o||0)+he)),ie=Q.reduce((ue,he)=>ue+(B.has(he)?1:0),0);se.checked=ie===Q.length,se.indeterminate=ie>0&&ie<Q.length;}function Ee(){const K=M.offsetWidth-M.clientWidth;A.style.paddingRight=K>0?`${K}px`:"0px";}function Ht(){requestAnimationFrame(Ee);}const at=new ResizeObserver(()=>Ee()),zi=()=>Ee();function mu(){A.replaceChildren();const K=m("div",{className:"lg-tr lg-tr-head"});if(u){const Q=m("div",{className:"lg-th lg-th-check"});b||(se=m("input",{type:"checkbox"}),se.addEventListener("change",()=>{const ie=R(),ue=se.checked;ie.forEach((he,ne)=>{const re=h(he,(v-1)*(o||0)+ne);ue?B.add(re):B.delete(re);}),k?.(U()),hn();}),Q.appendChild(se)),K.appendChild(Q);}w.forEach(Q=>{const ie=m("button",{className:"lg-th",type:"button",title:Q.title||Q.header});ie.textContent=Q.header,Q.align&&ie.style.setProperty("--col-justify",D(Q.align)),Q.sortable&&ie.classList.add("sortable"),C===String(Q.key)&&I?ie.setAttribute("data-sort",I):ie.removeAttribute("data-sort"),Q.sortable&&ie.addEventListener("click",()=>{const ue=String(Q.key);C!==ue?(C=ue,I="asc"):(I=I==="asc"?"desc":I==="desc"?null:"asc",I||(C=null,T=S.slice())),x?.(C,I),C&&I&&H(),ir();}),K.appendChild(ie);}),A.appendChild(K);try{at.disconnect();}catch{}at.observe(M),Ht();}function Ao(K){return Array.from(K.querySelectorAll(":scope > .lg-td, :scope > .lg-td-check"))}function Gi(K){return K.querySelector(".lg-td, .lg-td-check")}function ji(K){const Q=Gi(K);return Q?Q.getBoundingClientRect():null}function hn(){const K=R(),Q=new Map;Array.from(M.children).forEach(ne=>{const re=ne,Ne=re.getAttribute("data-id");if(!Ne)return;const He=ji(re);He&&Q.set(Ne,He);});const ie=new Map;Array.from(M.children).forEach(ne=>{const re=ne,Ne=re.getAttribute("data-id");Ne&&ie.set(Ne,re);});const ue=[];for(let ne=0;ne<K.length;ne++){const re=K[ne],Ne=(o?(v-1)*o:0)+ne,He=h(re,Ne);ue.push(He);let ye=ie.get(He);ye||(ye=hu(re,Ne),E&&Ao(ye).forEach(bn=>{bn.style.transform="translateY(6px)",bn.style.opacity="0";})),M.appendChild(ye);}const he=[];if(ie.forEach((ne,re)=>{ue.includes(re)||he.push(ne);}),!E){he.forEach(ne=>ne.remove()),fe(),Ht();return}ue.forEach(ne=>{const re=M.querySelector(`.lg-tr-body[data-id="${ne}"]`);if(!re)return;const Ne=ji(re),He=Q.get(ne),ye=Ao(re);if(He&&Ne){const it=He.left-Ne.left,Wt=He.top-Ne.top;ye.forEach(yt=>{yt.style.transition="none",yt.style.transform=`translate(${it}px, ${Wt}px)`,yt.style.opacity="1";}),Gi(re)?.getBoundingClientRect(),ye.forEach(yt=>{yt.style.willChange="transform, opacity",yt.style.transition="transform .18s ease, opacity .18s ease";}),requestAnimationFrame(()=>{ye.forEach(yt=>{yt.style.transform="translate(0,0)";});});}else ye.forEach(it=>{it.style.transition="transform .18s ease, opacity .18s ease";}),requestAnimationFrame(()=>{ye.forEach(it=>{it.style.transform="translate(0,0)",it.style.opacity="1";});});const Io=it=>{(it.propertyName==="transform"||it.propertyName==="opacity")&&(ye.forEach(Wt=>{Wt.style.willChange="",Wt.style.transition="",Wt.style.transform="",Wt.style.opacity="";}),it.currentTarget.removeEventListener("transitionend",Io));},bn=ye[0];bn&&bn.addEventListener("transitionend",Io);}),he.forEach(ne=>{const re=Ao(ne);re.forEach(ye=>{ye.style.willChange="transform, opacity",ye.style.transition="transform .18s ease, opacity .18s ease",ye.style.opacity="0",ye.style.transform="translateY(-6px)";});const Ne=ye=>{ye.propertyName==="opacity"&&(ye.currentTarget.removeEventListener("transitionend",Ne),ne.remove());},He=re[0];He?He.addEventListener("transitionend",Ne):ne.remove();}),fe(),Ht();}function hu(K,Q){const ie=h(K,Q),ue=m("div",{className:"lg-tr lg-tr-body","data-id":ie});if(u){const he=m("div",{className:"lg-td lg-td-check"});if(p==="switch"){const ne=Yn({size:"sm",checked:B.has(ie),onChange:re=>{re?B.add(ie):B.delete(ie),fe(),k?.(U());}});ae.set(ie,ne),he.appendChild(ne.root);}else {const ne=m("input",{type:"checkbox",className:"lg-row-check"});ne.checked=B.has(ie),ne.addEventListener("change",re=>{re.stopPropagation(),ne.checked?B.add(ie):B.delete(ie),fe(),k?.(U());}),ne.addEventListener("click",re=>re.stopPropagation()),he.appendChild(ne);}ue.appendChild(he);}return w.forEach(he=>{const ne=m("div",{className:"lg-td"});he.align&&ne.style.setProperty("--col-justify",D(he.align));let re=he.render?he.render(K,Q):String(K[he.key]??"");typeof re=="string"?ne.textContent=re:ne.appendChild(re),ue.appendChild(ne);}),(y||u&&f)&&(ue.classList.add("clickable"),ue.addEventListener("click",he=>{if(!he.target.closest(".lg-td-check")){if(u&&f){const ne=!B.has(ie);if(ne?B.add(ie):B.delete(ie),fe(),p==="switch"){const re=ae.get(ie);re&&re.setChecked(ne,true);}else {const re=ue.querySelector(".lg-row-check");re&&(re.checked=ne);}k?.(U());}y?.(K,Q,he);}})),ue}function Hi(){if(G.replaceChildren(),!o)return;const K=z(),Q=m("div",{className:"lg-pager"}),ie=m("button",{className:"btn",type:"button"},"←"),ue=m("button",{className:"btn",type:"button"},"→"),he=m("span",{className:"lg-pager-info"},`${v} / ${K}`);ie.disabled=v<=1,ue.disabled=v>=K,ie.addEventListener("click",()=>ar(v-1)),ue.addEventListener("click",()=>ar(v+1)),Q.append(ie,he,ue),G.appendChild(Q);}function ar(K){const Q=z();v=Math.min(Math.max(1,K),Q),hn(),Hi();}function ir(){j(),mu(),hn(),Hi();}function bu(K){S=K.slice(),T=K.slice(),C&&I&&H(),ar(1);}function xu(K){w=K.slice(),ir();}function yu(K,Q="asc"){C=K,I=K?Q:null,C&&I?H():T=S.slice(),ir();}function vu(){try{at.disconnect();}catch{}window.removeEventListener("resize",zi);}return $.append(A,M,G),F.appendChild($),window.addEventListener("resize",zi),ir(),{root:F,setData:bu,setColumns:xu,sortBy:yu,getSelection:U,setSelection:X,clearSelection:Y,setPage:ar,getState:()=>({page:v,pageCount:z(),sortKey:C,sortDir:I}),destroy:vu}}let Qr=false;const Cn=new Set;function Ep(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}const Ke=e=>{const t=Ep();if(t){for(const n of Cn)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function Mp(){Qr||(Qr=true,window.addEventListener("keydown",Ke,true),window.addEventListener("keypress",Ke,true),window.addEventListener("keyup",Ke,true),document.addEventListener("keydown",Ke,true),document.addEventListener("keypress",Ke,true),document.addEventListener("keyup",Ke,true));}function Lp(){Qr&&(Qr=false,window.removeEventListener("keydown",Ke,true),window.removeEventListener("keypress",Ke,true),window.removeEventListener("keyup",Ke,true),document.removeEventListener("keydown",Ke,true),document.removeEventListener("keypress",Ke,true),document.removeEventListener("keyup",Ke,true));}function Rp(e){return Cn.size===0&&Mp(),Cn.add(e),()=>{Cn.delete(e),Cn.size===0&&Lp();}}function ur(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function Fp(){const e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.display="none",t.style.flexShrink="0";const n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");const r=document.createElementNS(e,"animate");r.setAttribute("attributeName","stroke-dasharray"),r.setAttribute("values","1,150;90,150;90,150"),r.setAttribute("dur","1.5s"),r.setAttribute("repeatCount","indefinite");const o=document.createElementNS(e,"animateTransform");return o.setAttribute("attributeName","transform"),o.setAttribute("attributeType","XML"),o.setAttribute("type","rotate"),o.setAttribute("from","0 12 12"),o.setAttribute("to","360 12 12"),o.setAttribute("dur","1s"),o.setAttribute("repeatCount","indefinite"),n.append(r,o),t.appendChild(n),t}function Ua(e={}){const{id:t,placeholder:n="Rechercher…",value:r="",size:o="md",disabled:a=false,autoFocus:i=false,onChange:s,onSearch:c,autoSearch:d=false,debounceMs:l=0,focusKey:u="/",iconLeft:p,iconRight:f,withClear:g=true,clearTitle:b="Effacer",ariaLabel:h,submitLabel:x,loading:k=false,blockGameKeys:y=true}=e,w=m("div",{className:"search"+(o?` search--${o}`:""),id:t}),T=m("span",{className:"search-ico search-ico--left"});if(p){const Y=ur(p);Y&&T.appendChild(Y);}else T.textContent="🔎",T.style.opacity=".9";const S=m("input",{className:"input search-input",type:"text",placeholder:n,value:r,"aria-label":h||n}),C=m("span",{className:"search-ico search-ico--right"});if(f){const Y=ur(f);Y&&C.appendChild(Y);}const I=Fp();I.classList.add("search-spinner");const v=g?m("button",{className:"search-clear",type:"button",title:b},"×"):null,P=x!=null?m("button",{className:"btn search-submit",type:"button"},x):null,E=m("div",{className:"search-field"},T,S,C,I,...v?[v]:[]);w.append(E,...P?[P]:[]);let F=!!a,$=null;function A(Y){I.style.display=Y?"inline-block":"none",w.classList.toggle("is-loading",Y);}function M(){$!=null&&(window.clearTimeout($),$=null);}function G(Y){M(),l>0?$=window.setTimeout(()=>{$=null,Y();},l):Y();}function L(){s?.(S.value),d&&c&&c(S.value);}S.addEventListener("input",()=>{G(L);}),S.addEventListener("keydown",Y=>{Y.key==="Enter"?(Y.preventDefault(),M(),c?.(S.value)):Y.key==="Escape"&&(S.value.length>0?z("",{notify:true}):S.blur());}),v&&v.addEventListener("click",()=>z("",{notify:true})),P&&P.addEventListener("click",()=>c?.(S.value));let D=()=>{};if(y&&(D=Rp(S)),u){const Y=se=>{if(se.key===u&&!se.ctrlKey&&!se.metaKey&&!se.altKey){const fe=document.activeElement;fe&&(fe.tagName==="INPUT"||fe.tagName==="TEXTAREA"||fe.isContentEditable)||(se.preventDefault(),S.focus());}};window.addEventListener("keydown",Y,true),w.__cleanup=()=>{window.removeEventListener("keydown",Y,true),D();};}else w.__cleanup=()=>{D();};function j(Y){F=!!Y,S.disabled=F,v&&(v.disabled=F),P&&(P.disabled=F),w.classList.toggle("disabled",F);}function z(Y,se={}){const fe=S.value;S.value=Y??"",se.notify&&fe!==Y&&G(L);}function R(){return S.value}function H(){S.focus();}function B(){S.blur();}function U(Y){S.placeholder=Y;}function ae(Y){z("",Y);}return j(F),A(k),i&&H(),{root:w,input:S,getValue:R,setValue:z,focus:H,blur:B,setDisabled:j,setPlaceholder:U,clear:ae,setLoading:A,setIconLeft(Y){T.replaceChildren();const se=ur(Y??"🔎");se&&T.appendChild(se);},setIconRight(Y){C.replaceChildren();const se=ur(Y??"");se&&C.appendChild(se);}}}const po=e=>new Promise(t=>setTimeout(t,e)),rt=e=>{try{return e()}catch{return}},ut=(e,t,n)=>Math.max(t,Math.min(n,e)),Np=e=>ut(e,0,1);async function Ki(e,t,n){const r=performance.now();for(;performance.now()-r<t;){const o=await Promise.race([e,po(50).then(()=>null)]);if(o!==null)return o}throw new Error(`${n} timeout`)}let Va=null;function Cl(){return Va}function Op(e){Va=e;}function Tl(){return Va!==null}const Bp=/\/(?:r\/\d+\/)?version\/([^/]+)/,$p=15e3,Dp=50;function zp(){return O?.document??(typeof document<"u"?document:null)}function Xa(e={}){if(Tl())return;const t=e.doc??zp();if(!t)return;const n=t.scripts;for(let r=0;r<n.length;r++){const a=n.item(r)?.src;if(!a)continue;const i=a.match(Bp);if(i?.[1]){Op(i[1]);return}}}function Gp(){return Xa(),Cl()}function jp(){return Tl()}async function Hp(e={}){const t=e.timeoutMs??$p,n=performance.now();for(;performance.now()-n<t;){Xa();const r=Cl();if(r)return r;await po(Dp);}throw new Error("MGVersion timeout (gameVersion not found)")}const Ka={init:Xa,isReady:jp,get:Gp,wait:Hp},Wp=O?.location?.origin||"https://magicgarden.gg";function Pl(){return typeof GM_xmlhttpRequest=="function"}function Al(e,t="text"){return new Promise((n,r)=>{GM_xmlhttpRequest({method:"GET",url:e,responseType:t,onload:o=>o.status>=200&&o.status<300?n(o):r(new Error(`HTTP ${o.status} for ${e}`)),onerror:()=>r(new Error(`Network error for ${e}`)),ontimeout:()=>r(new Error(`Timeout for ${e}`))});})}async function Ya(e){if(Pl())return JSON.parse((await Al(e,"text")).responseText);const t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.json()}async function Il(e){if(Pl())return (await Al(e,"blob")).response;const t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.blob()}function Up(e){return new Promise((t,n)=>{const r=URL.createObjectURL(e),o=O?.Image||Image,a=new o;a.decoding="async",a.onload=()=>{URL.revokeObjectURL(r),t(a);},a.onerror=()=>{URL.revokeObjectURL(r),n(new Error("Image decode failed"));},a.src=r;})}const ht=(e,t)=>e.replace(/\/?$/,"/")+String(t||"").replace(/^\//,""),Vp=e=>e.lastIndexOf("/")>=0?e.slice(0,e.lastIndexOf("/")+1):"",Yi=(e,t)=>String(t||"").startsWith("/")?String(t).slice(1):Vp(e)+String(t||"");let qa=null,_l=null;function Xp(){return qa}function Kp(){return _l}function Yp(e){qa=e;}function qp(e){_l=e;}function El(){return qa!==null}const Jp=15e3;async function Qp(e={}){El()||await Ja(e);}async function Ja(e={}){const t=Xp();if(t)return t;const n=Kp();if(n)return n;const r=(async()=>{const o=e.gameVersion??await Ka.wait({timeoutMs:Jp}),a=`${Wp}/version/${o}/assets/`;return Yp(a),a})();return qp(r),r}async function Zp(e){const t=await Ja();return ht(t,e)}function ef(){return El()}const $t={init:Qp,isReady:ef,base:Ja,url:Zp},Ml=new Map;function tf(e){return Ml.get(e)}function nf(e,t){Ml.set(e,t);}const Ll="manifest.json";let ra=null;async function rf(){ra||(ra=await Rl());}function of(){return ra!==null}async function Rl(e={}){const t=e.baseUrl??await $t.base(),n=tf(t);if(n)return n;const r=Ya(ht(t,Ll));return nf(t,r),r}function af(e,t){return e.bundles.find(n=>n.name===t)??null}function sf(e){if(!e)return [];const t=new Set;for(const n of e.assets)for(const r of n.src??[])typeof r=="string"&&r.endsWith(".json")&&r!==Ll&&t.add(r);return Array.from(t)}const bt={init:rf,isReady:of,load:Rl,getBundle:af,listJsonFromBundle:sf},lf=O,nt=lf.Object??Object,fo=nt.keys,Zr=nt.values,eo=nt.entries,qi=new WeakSet;function cf(){return {data:{items:null,decor:null,mutations:null,eggs:null,pets:null,abilities:null,plants:null,weather:null},isHookInstalled:false,scanInterval:null,scanAttempts:0,weatherPollingTimer:null,weatherPollAttempts:0,colorPollingTimer:null,colorPollAttempts:0}}const J=cf(),kt={items:["WateringCan","PlanterPot","Shovel"],decor:["SmallRock","MediumRock","LargeRock","WoodBench","StoneBench","MarbleBench"],mutations:["Gold","Rainbow","Wet","Chilled","Frozen"],eggs:["CommonEgg","UncommonEgg","RareEgg"],pets:["Worm","Snail","Bee","Chicken","Bunny"],abilities:["ProduceScaleBoost","DoubleHarvest","SeedFinderI","CoinFinderI"],plants:["Carrot","Strawberry","Aloe","Blueberry","Apple"]},df=["Rain","Frost","Dawn","AmberMoon"],Ji=/main-[^/]+\.js(\?|$)/,uf=6,pf=150,ff=2e3,gf=200,mf=50,hf=10,bf=1e3,oa="ProduceScaleBoost",Ct=(e,t)=>t.every(n=>e.includes(n));function Tt(e,t){J.data[e]==null&&(J.data[e]=t,to()&&Ol());}function to(){return Object.values(J.data).every(e=>e!=null)}function Fl(e,t){if(!e||typeof e!="object"||qi.has(e))return;qi.add(e);let n;try{n=fo(e);}catch{return}if(!n||n.length===0)return;const r=e;let o;if(!J.data.items&&Ct(n,kt.items)&&(o=r.WateringCan,o&&typeof o=="object"&&"coinPrice"in o&&"creditPrice"in o&&Tt("items",r)),!J.data.decor&&Ct(n,kt.decor)&&(o=r.SmallRock,o&&typeof o=="object"&&"coinPrice"in o&&"creditPrice"in o&&Tt("decor",r)),!J.data.mutations&&Ct(n,kt.mutations)&&(o=r.Gold,o&&typeof o=="object"&&"baseChance"in o&&"coinMultiplier"in o&&Tt("mutations",r)),!J.data.eggs&&Ct(n,kt.eggs)&&(o=r.CommonEgg,o&&typeof o=="object"&&"faunaSpawnWeights"in o&&"secondsToHatch"in o&&Tt("eggs",r)),!J.data.pets&&Ct(n,kt.pets)&&(o=r.Worm,o&&typeof o=="object"&&"coinsToFullyReplenishHunger"in o&&"diet"in o&&Array.isArray(o.diet)&&Tt("pets",r)),!J.data.abilities&&Ct(n,kt.abilities)&&(o=r.ProduceScaleBoost,o&&typeof o=="object"&&"trigger"in o&&"baseParameters"in o&&Tt("abilities",r)),!J.data.plants&&Ct(n,kt.plants)&&(o=r.Carrot,o&&typeof o=="object"&&"seed"in o&&"plant"in o&&"crop"in o&&Tt("plants",r)),!(t>=uf))for(const a of n){let i;try{i=r[a];}catch{continue}i&&typeof i=="object"&&Fl(i,t+1);}}function zr(e){try{Fl(e,0);}catch{}}function Nl(){if(!J.isHookInstalled){if(nt.__MG_HOOKED__){J.isHookInstalled=true;return}nt.__MG_HOOKED__=true,J.isHookInstalled=true;try{nt.keys=function(t){return zr(t),fo.apply(this,arguments)},Zr&&(nt.values=function(t){return zr(t),Zr.apply(this,arguments)}),eo&&(nt.entries=function(t){return zr(t),eo.apply(this,arguments)});}catch{}}}function Ol(){if(J.isHookInstalled){try{nt.keys=fo,Zr&&(nt.values=Zr),eo&&(nt.entries=eo);}catch{}J.isHookInstalled=false;}}function xf(){if(J.scanInterval||to())return;const e=()=>{if(to()||J.scanAttempts>pf){Bl();return}J.scanAttempts++;try{fo(O).forEach(t=>{try{zr(O[t]);}catch{}});}catch{}};e(),J.scanInterval=setInterval(e,ff);}function Bl(){J.scanInterval&&(clearInterval(J.scanInterval),J.scanInterval=null);}const Qi=O;function yf(){try{for(const e of Qi.document?.scripts||[]){const t=e?.src?String(e.src):"";if(Ji.test(t))return t}}catch{}try{for(const e of Qi.performance?.getEntriesByType?.("resource")||[]){const t=e?.name?String(e.name):"";if(Ji.test(t))return t}}catch{}return null}function vf(e,t){const n=[];let r=e.indexOf(t);for(;r!==-1;)n.push(r),r=e.indexOf(t,r+t.length);return n}function Qa(e,t){let n=0,r="",o=false;for(let a=t;a<e.length;a++){const i=e[a];if(r){if(o){o=false;continue}if(i==="\\"){o=true;continue}i===r&&(r="");continue}if(i==='"'||i==="'"||i==="`"){r=i;continue}if(i==="{")n++;else if(i==="}"&&--n===0)return e.slice(t,a+1)}return null}function wf(e,t){const n=Math.max(e.lastIndexOf("const ",t),e.lastIndexOf("let ",t),e.lastIndexOf("var ",t));if(n<0)return null;const r=e.indexOf("=",n);if(r<0||r>t)return null;const o=e.indexOf("{",r);return o<0||o>t?null:Qa(e,o)}let _o=null,xn=null;async function $l(){return _o||xn||(xn=(async()=>{const e=yf();if(!e)return null;try{const t=await fetch(e,{credentials:"include"});if(!t.ok)return null;const n=await t.text();return _o=n,n}catch{return null}finally{xn=null;}})(),xn)}function Sf(e){const t={};let n=false;for(const r of df){const o=e?.[r];if(!o||typeof o!="object")continue;const a=o.iconSpriteKey||null,{iconSpriteKey:i,...s}=o;t[r]={weatherId:r,spriteId:a,...s},n=true;}return t.Sunny||(t.Sunny={weatherId:"Sunny",name:"Sunny",spriteId:"sprite/ui/SunnyIcon",type:"primary"}),!n||t.Rain&&t.Rain.mutator?.mutation!=="Wet"?null:t}async function kf(){if(J.data.weather)return  true;const e=await $l();if(!e)return  false;let t=e.indexOf("fixedTimeSlots:[0,48,96,144,192,240]");if(t<0&&(t=e.indexOf('name:"Amber Moon"')),t<0)return  false;const n=wf(e,t);if(!n)return  false;const r=n.replace(/\b[A-Za-z_$][\w$]*\.(Rain|Frost|Dawn|AmberMoon)\b/g,'"$1"');let o;try{o=Function('"use strict";return('+r+")")();}catch{return  false}const a=Sf(o);return a?(J.data.weather=a,true):false}function Cf(){if(J.weatherPollingTimer)return;J.weatherPollAttempts=0;const e=setInterval(async()=>{(await kf()||++J.weatherPollAttempts>gf)&&(clearInterval(e),J.weatherPollingTimer=null);},mf);J.weatherPollingTimer=e;}function Tf(){J.weatherPollingTimer&&(clearInterval(J.weatherPollingTimer),J.weatherPollingTimer=null);}const Pf={bg:"rgba(100, 100, 100, 0.9)",hover:"rgba(150, 150, 150, 1)"};function Af(e){const t=vf(e,oa);if(!t.length)return null;for(const n of t){const r=Math.max(0,n-4e3),o=Math.min(e.length,n+4e3),i=e.slice(r,o).lastIndexOf("switch(");if(i===-1)continue;const s=r+i,c=e.indexOf("{",s);if(c===-1)continue;const d=Qa(e,c);if(d&&d.includes(oa)&&(d.includes('bg:"')||d.includes("bg:'")))return d}return null}function If(e){const t={},n=[],r=/case\s*(['"])([^'"]+)\1\s*:|default\s*:|return\s*\{/g,o=(i,s)=>{const c=new RegExp(`${s}\\s*:\\s*(['"])([\\s\\S]*?)\\1`),d=i.match(c);return d?d[2]:null};let a;for(;(a=r.exec(e))!==null;){if(a[2]){n.push(a[2]);continue}const i=a[0];if(i.startsWith("default")){n.length=0;continue}if(!i.startsWith("return"))continue;const s=e.indexOf("{",a.index);if(s===-1){n.length=0;continue}const c=Qa(e,s);if(!c){n.length=0;continue}const d=o(c,"bg");if(!d){n.length=0;continue}const l=o(c,"hover")||d;for(const u of n)t[u]||(t[u]={bg:d,hover:l});n.length=0;}return Object.keys(t).length?t:null}async function _f(){const e=await $l();if(!e)return null;const t=Af(e);return t?If(t):null}function Ef(e){const t=e[oa];return t!=null&&typeof t=="object"&&"color"in t}async function Mf(){if(!J.data.abilities)return  false;const e=J.data.abilities;if(Ef(e))return  true;const t=await _f();if(!t)return  false;const n={};for(const[r,o]of Object.entries(e)){const a=t[r]||Pf;n[r]={...o,color:{bg:a.bg,hover:a.hover}};}return J.data.abilities=n,console.log("[MGData] Enriched abilities with colors"),true}function Lf(){if(J.colorPollingTimer)return;J.colorPollAttempts=0;const e=setInterval(async()=>{(await Mf()||++J.colorPollAttempts>hf)&&(clearInterval(e),J.colorPollingTimer=null);},bf);J.colorPollingTimer=e;}function Rf(){J.colorPollingTimer&&(clearInterval(J.colorPollingTimer),J.colorPollingTimer=null);}function Ff(e){return String(e||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^A-Za-z0-9]/g,"").trim()}function Nf(e,t=[]){const n=new Set,r=o=>{const a=String(o||"").trim();a&&n.add(a);};r(e);for(const o of t)r(o);for(const o of Array.from(n.values()))o.endsWith("s")?r(o.slice(0,-1)):r(`${o}s`),o.endsWith("es")&&r(o.slice(0,-2));return Array.from(n.values()).filter(Boolean)}function Dl(e,t,n,r=[],o=[]){const a=window.Gemini?.Modules?.Sprite;if(!a)return null;const i=Nf(e,r);if(!i.length)return null;const s=[t,...o].filter(u=>typeof u=="string"),c=u=>{const p=String(u||"").trim();if(!p)return null;for(const f of i)try{if(a.has(f,p))return a.getIdPath(f,p)}catch{}return null};for(const u of s){const p=c(u);if(p)return p}const d=Ff(n||""),l=c(d||n||"");if(l)return l;try{for(const u of i){const p=a.listIds(`sprite/${u}/`),f=s.map(b=>String(b||"").toLowerCase()),g=String(n||d||"").toLowerCase();for(const b of p){const x=(b.split("/").pop()||"").toLowerCase();if(f.some(k=>k&&k===x)||x===g)return b}for(const b of p){const x=(b.split("/").pop()||"").toLowerCase();if(f.some(k=>k&&x.includes(k))||g&&x.includes(g))return b}}}catch{}return null}function Ue(e,t,n,r,o=[],a=[]){if(!e||typeof e!="object")return;const i=e.tileRef;if(!i||typeof i!="object")return;const s=String(i.spritesheet||t||"").trim(),c=Dl(s,n,r,o,a);if(c)try{e.spriteId=c;}catch{}const d=e.rotationVariants;if(d&&typeof d=="object")for(const l of Object.values(d))Ue(l,s,n,r);if(e.immatureTileRef){const l={tileRef:e.immatureTileRef};Ue(l,s,n,r),l.spriteId&&(e.immatureSpriteId=l.spriteId);}if(e.topmostLayerTileRef){const l={tileRef:e.topmostLayerTileRef};Ue(l,s,n,r),l.spriteId&&(e.topmostLayerSpriteId=l.spriteId);}e.activeState&&typeof e.activeState=="object"&&Ue(e.activeState,s,n,e.activeState?.name||r);}function Of(e,t,n,r=[]){if(!Array.isArray(t)||t.length===0)return null;const o=t[0],a=t.slice(1);return Dl(e,o,n??null,r,a)}function Bf(e){for(const[t,n]of Object.entries(e.items||{}))Ue(n,"items",t,n?.name,["item"]);for(const[t,n]of Object.entries(e.decor||{}))Ue(n,"decor",t,n?.name);for(const[t,n]of Object.entries(e.mutations||{})){Ue(n,"mutations",t,n?.name,["mutation"]);const r=Of("mutation-overlay",[`${t}TallPlant`,`${t}TallPlantIcon`,t],n?.name,["mutation-overlay"]);if(r)try{n.overlaySpriteId=r;}catch{}}for(const[t,n]of Object.entries(e.eggs||{}))Ue(n,"pets",t,n?.name,["pet"]);for(const[t,n]of Object.entries(e.pets||{}))Ue(n,"pets",t,n?.name,["pet"]);for(const[t,n]of Object.entries(e.plants||{})){const r=n;r.seed&&Ue(r.seed,r.seed?.tileRef?.spritesheet||"seeds",`${t}Seed`,r.seed?.name||`${t} Seed`,["seed","plant","plants"],[t]),r.plant&&Ue(r.plant,r.plant?.tileRef?.spritesheet||"plants",`${t}Plant`,r.plant?.name||`${t} Plant`,["plant","plants","tallplants"],[t]),r.crop&&Ue(r.crop,r.crop?.tileRef?.spritesheet||"plants",t,r.crop?.name||t,["plant","plants"],[`${t}Crop`]);}}function $f(){try{Bf(J.data);}catch(e){try{console.warn("[MGData] sprite resolution failed",e);}catch{}}}const zl=1e4,Gl=50;function jl(e){return new Promise(t=>setTimeout(t,e))}function Df(e){return J.data[e]}function zf(){return {...J.data}}function Gf(e){return J.data[e]!=null}async function jf(e,t=zl,n=Gl){const r=Date.now();for(;Date.now()-r<t;){const o=J.data[e];if(o!=null)return o;await jl(n);}throw new Error(`MGData.waitFor: timeout waiting for "${e}"`)}async function Hf(e=zl,t=Gl){const n=Date.now();for(;Date.now()-n<e;){if(Object.values(J.data).some(r=>r!=null))return {...J.data};await jl(t);}throw new Error("MGData.waitForAnyData: timeout")}const Hl=["CoinFinderI","CoinFinderII","CoinFinderIII","SeedFinderI","SeedFinderII","SeedFinderIII","SeedFinderIV","HungerRestore","HungerRestoreII","DoubleHarvest","DoubleHatch","ProduceEater","PetHatchSizeBoost","PetHatchSizeBoostII","PetAgeBoost","PetAgeBoostII","PetRefund","PetRefundII","ProduceRefund","SellBoostI","SellBoostII","SellBoostIII","SellBoostIV","GoldGranter","RainbowGranter","RainDance","PetXpBoost","PetXpBoostII","EggGrowthBoost","EggGrowthBoostII_NEW","EggGrowthBoostII","PlantGrowthBoost","PlantGrowthBoostII","ProduceScaleBoost","ProduceScaleBoostII"];function Wl(e){return Hl.includes(e)}function Ul(e){return e.filter(t=>Wl(t.action))}function Zi(e){const t=Math.floor(e/3600),n=Math.floor(e%3600/60),r=Math.floor(e%60);return t>0?`${t}h ${n}m`:n>0?`${n}m ${r}s`:`${r}s`}function Eo(e){return e?.name||e?.petSpecies||"Unknown Pet"}function Vl(e){const{action:t,parameters:n}=e,r=n;switch(t){case "CoinFinderI":case "CoinFinderII":case "CoinFinderIII":return `Found ${r.coinsFound||0} coins`;case "SeedFinderI":case "SeedFinderII":case "SeedFinderIII":case "SeedFinderIV":return `Found 1× ${r.speciesId||"Unknown"} seed`;case "HungerRestore":case "HungerRestoreII":{const o=Eo(r.targetPet),a=r.hungerRestoreAmount||0,s=r.pet?.id===r.targetPet?.id?"itself":o;return `Restored ${a} hunger to ${s}`}case "DoubleHarvest":return `Double harvested ${r.harvestedCrop?.species||"Unknown"}`;case "DoubleHatch":return `Double hatched ${r.extraPet?.petSpecies||"Unknown"}`;case "ProduceEater":{const o=r.growSlot?.species||"Unknown",a=r.sellPrice||0;return `Ate ${o} for ${a} coins`}case "PetHatchSizeBoost":case "PetHatchSizeBoostII":{const o=Eo(r.targetPet),a=r.strengthIncrease||0;return `Boosted ${o}'s size by +${a.toFixed(0)}`}case "PetAgeBoost":case "PetAgeBoostII":{const o=Eo(r.targetPet);return `Gave +${r.bonusXp||0} XP to ${o}`}case "PetRefund":case "PetRefundII":return `Refunded 1× ${r.eggId||"Unknown Egg"}`;case "ProduceRefund":{const o=r.cropsRefunded?.length||0;return `Refunded ${o} ${o===1?"crop":"crops"}`}case "SellBoostI":case "SellBoostII":case "SellBoostIII":case "SellBoostIV":return `Gave +${r.bonusCoins||0} bonus coins`;case "GoldGranter":case "RainbowGranter":case "RainDance":{const o=r.mutation||"Unknown";return `Made ${r.growSlot?.species||"Unknown"} turn ${o}`}case "PetXpBoost":case "PetXpBoostII":{const o=r.bonusXp||0,a=r.petsAffected?.length||0;return `Gave +${o} XP to ${a} ${a===1?"pet":"pets"}`}case "EggGrowthBoost":case "EggGrowthBoostII_NEW":case "EggGrowthBoostII":{const o=r.secondsReduced||0,a=r.eggsAffected?.length||0,i=Zi(o);return `Reduced ${a} ${a===1?"egg":"eggs"} growth by ${i}`}case "PlantGrowthBoost":case "PlantGrowthBoostII":{const o=r.secondsReduced||0,a=r.numPlantsAffected||0,i=Zi(o);return `Reduced ${a} ${a===1?"plant":"plants"} growth by ${i}`}case "ProduceScaleBoost":case "ProduceScaleBoostII":{const o=r.scaleIncreasePercentage||0,a=r.numPlantsAffected||0;return `Boosted ${a} ${a===1?"crop":"crops"} size by +${o.toFixed(0)}%`}default:return `Unknown ability: ${t}`}}const oe={async init(){Nl(),xf(),Cf(),Lf();},isReady:to,get:Df,getAll:zf,has:Gf,waitFor:jf,waitForAny:Hf,resolveSprites:$f,cleanup(){Ol(),Bl(),Tf(),Rf();}},Wf=new Map;function Uf(){return Wf}function aa(){return O.jotaiAtomCache?.cache}function wt(e){const t=Uf(),n=t.get(e);if(n)return n;const r=aa();if(!r)return null;for(const o of r.values())if((o?.debugLabel||o?.label||"")===e)return t.set(e,o),o;return null}function Vf(){const e=O;if(e.__REACT_DEVTOOLS_GLOBAL_HOOK__)return;const t=new Map,n=new Map;e.__REACT_DEVTOOLS_GLOBAL_HOOK__={renderers:t,supportsFiber:true,inject:r=>{const o=t.size+1;return t.set(o,r),n.set(o,new Set),o},onCommitFiberRoot:(r,o)=>{const a=n.get(r);a&&a.add(o);},onCommitFiberUnmount:()=>{},onPostCommitFiberRoot:()=>{},getFiberRoots:r=>n.get(r),checkDCE:()=>{},isDisabled:false};}const Xf={baseStore:null,captureInProgress:false,captureError:null,lastCapturedVia:null,mirror:void 0};function un(){return Xf}const Kf="__JOTAI_STORE_READY__";let es=false;const ia=new Set;function pr(){if(!es){es=true;for(const e of ia)try{e();}catch{}try{const e=O.CustomEvent||CustomEvent;O.dispatchEvent?.(new e(Kf));}catch{}}}function Yf(e){ia.add(e);const t=la();if(t.via&&!t.polyfill)try{e();}catch{}return ()=>{ia.delete(e);}}async function qf(e={}){const{timeoutMs:t=6e3,intervalMs:n=50}=e,r=la();if(!(r.via&&!r.polyfill))return new Promise((o,a)=>{let i=false;const s=Yf(()=>{i||(i=true,s(),o());}),c=Date.now();(async()=>{for(;!i&&Date.now()-c<t;){const l=la();if(l.via&&!l.polyfill){if(i)return;i=true,s(),o();return}await Gn(n);}i||(i=true,s(),a(new Error("Store not captured within timeout")));})();})}const Gn=e=>new Promise(t=>setTimeout(t,e));function Xl(){try{const e=O.Event||Event;O.dispatchEvent?.(new e("visibilitychange"));}catch{}}function sa(e){return e&&typeof e=="object"&&typeof e.get=="function"&&typeof e.set=="function"&&typeof e.sub=="function"}function Mo(e,t=0,n=new WeakSet){if(t>3||!e||typeof e!="object"||n.has(e))return null;try{n.add(e);}catch{return null}if(sa(e))return e;const r=["store","value","current","state","s","baseStore"];for(const o of r)try{const a=e[o];if(sa(a))return a}catch{}return null}function Kl(){const e=un(),t=O.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t?.renderers?.size)return null;let n=0;for(const[r]of t.renderers){const o=t.getFiberRoots?.(r);o&&(n+=o.size||0);}if(n===0)return null;for(const[r]of t.renderers){const o=t.getFiberRoots?.(r);if(o)for(const a of o){const i=new Set,s=[a.current];for(;s.length;){const c=s.pop();if(!(!c||i.has(c))){i.add(c);try{const d=c?.pendingProps?.value;if(sa(d))return e.lastCapturedVia="fiber",d}catch{}try{let d=c?.memoizedState,l=0;for(;d&&l<15;){l++;const u=Mo(d);if(u)return e.lastCapturedVia="fiber",u;const p=Mo(d.memoizedState);if(p)return e.lastCapturedVia="fiber",p;d=d.next;}}catch{}try{if(c?.stateNode){const d=Mo(c.stateNode);if(d)return e.lastCapturedVia="fiber",d}}catch{}c.child&&s.push(c.child),c.sibling&&s.push(c.sibling),c.alternate&&s.push(c.alternate);}}}}return null}function Yl(){return {get:()=>{throw new Error("Store not captured: get unavailable")},set:()=>{throw new Error("Store not captured: set unavailable")},sub:()=>()=>{},__polyfill:true}}async function Jf(e=5e3){const t=Date.now();let n=aa();for(;!n&&Date.now()-t<e;)await Gn(100),n=aa();if(!n)throw new Error("jotaiAtomCache.cache not found");const r=un();let o=null,a=null;const i=[],s=()=>{for(const d of i)try{d.__origWrite&&(d.write=d.__origWrite,delete d.__origWrite);}catch{}};for(const d of n.values()){if(!d||typeof d.write!="function"||d.__origWrite)continue;const l=d.write;d.__origWrite=l,d.write=function(u,p,...f){return a||(o=u,a=p,s()),l.call(this,u,p,...f)},i.push(d);}Xl();const c=Date.now();for(;!a&&Date.now()-c<e;)await Gn(50);return a?(r.lastCapturedVia="write",{get:d=>o(d),set:(d,l)=>a(d,l),sub:(d,l)=>{let u;try{u=o(d);}catch{}const p=setInterval(()=>{let f;try{f=o(d);}catch{return}if(f!==u){u=f;try{l();}catch{}}},100);return ()=>clearInterval(p)}}):(s(),r.lastCapturedVia="polyfill",Yl())}async function Qf(e=1e4){const t=un();Xl();const n=Date.now();for(;Date.now()-n<e;){const r=Kl();if(r)return r;await Gn(50);}return t.lastCapturedVia="polyfill",Yl()}async function Za(){const e=un();if(e.baseStore&&!e.baseStore.__polyfill)return pr(),e.baseStore;if(e.captureInProgress){const t=Date.now(),n=2500;for(;!e.baseStore&&Date.now()-t<n;)await Gn(25);if(e.baseStore)return e.baseStore.__polyfill||pr(),e.baseStore}e.captureInProgress=true;try{const t=Kl();if(t)return e.baseStore=t,pr(),t;try{const r=await Jf(5e3);return e.baseStore=r,r.__polyfill||pr(),r}catch(r){e.captureError=r;}const n=await Qf();return e.baseStore=n,n}catch(t){throw e.captureError=t,t}finally{e.captureInProgress=false;}}function la(){const e=un();return {via:e.lastCapturedVia,polyfill:!!e.baseStore?.__polyfill,error:e.captureError}}async function Zf(){const e=await Za(),t=new WeakMap,n=async o=>{let a=t.get(o);if(a)return a;a={last:void 0,has:false,subs:new Set},t.set(o,a);try{a.last=e.get(o),a.has=!0;}catch{}const i=e.sub(o,()=>{let s;try{s=e.get(o);}catch{return}const c=a.last,d=!Object.is(s,c)||!a.has;if(a.last=s,a.has=true,d)for(const l of a.subs)try{l(s,c);}catch{}});return a.unsubUpstream=i,a};return {async get(o){const a=await n(o);if(a.has)return a.last;const i=e.get(o);return a.last=i,a.has=true,i},async set(o,a){await e.set(o,a);const i=await n(o);i.last=a,i.has=true;},async sub(o,a){const i=await n(o);if(i.subs.add(a),i.has)try{a(i.last,i.last);}catch{}return ()=>{i.subs.delete(a);}},getShadow(o){return t.get(o)?.last},hasShadow(o){return !!t.get(o)?.has},async ensureWatch(o){await n(o);},async asStore(){return {get:o=>this.get(o),set:(o,a)=>this.set(o,a),sub:(o,a)=>{let i=null;return this.sub(o,()=>a()).then(s=>i=s),()=>i?.()}}}}}async function Gr(){const e=un();return e.mirror||(e.mirror=await Zf()),e.mirror}const ge={async select(e){const t=await Gr(),n=wt(e);if(!n)throw new Error(`[Store] Atom not found: "${e}"`);return t.get(n)},async set(e,t){const n=await Gr(),r=wt(e);if(!r)throw new Error(`[Store] Atom not found: "${e}"`);await n.set(r,t);},async subscribe(e,t){const n=await Gr(),r=wt(e);if(!r)throw new Error(`[Store] Atom not found: "${e}"`);return n.sub(r,o=>{try{t(o);}catch{}})},async subscribeImmediate(e,t){const n=await ge.select(e);try{t(n);}catch{}return ge.subscribe(e,t)}};async function eg(){await Gr();}function ei(e){return e?Array.isArray(e)?e.slice():e.split(".").map(t=>t.match(/^\d+$/)?Number(t):t):[]}function jn(e,t){const n=ei(t);let r=e;for(const o of n){if(r==null)return;r=r[o];}return r}function tg(e,t,n){const r=ei(t);if(!r.length)return n;const o=Array.isArray(e)?[...e]:{...e??{}};let a=o;for(let i=0;i<r.length-1;i++){const s=r[i],c=a[s],d=typeof c=="object"&&c!==null?Array.isArray(c)?[...c]:{...c}:{};a[s]=d,a=d;}return a[r[r.length-1]]=n,o}function ts(e,t){const n={};for(const r of t)n[r]=r.includes(".")?jn(e,r):e?.[r];try{return JSON.stringify(n)}catch{return String(n)}}function ng(e,t,n){const r=n.mode??"auto";function o(d){const l=t?jn(d,t):d,u=new Map;if(l==null)return {signatures:u,keys:[]};const p=Array.isArray(l);if((r==="array"||r==="auto"&&p)&&p)for(let g=0;g<l.length;g++){const b=l[g],h=n.key?n.key(b,g,d):g,x=n.sig?n.sig(b,g,d):n.fields?ts(b,n.fields):JSON.stringify(b);u.set(h,x);}else for(const[g,b]of Object.entries(l)){const h=n.key?n.key(b,g,d):g,x=n.sig?n.sig(b,g,d):n.fields?ts(b,n.fields):JSON.stringify(b);u.set(h,x);}return {signatures:u,keys:Array.from(u.keys())}}function a(d,l){if(d===l)return  true;if(!d||!l||d.size!==l.size)return  false;for(const[u,p]of d)if(l.get(u)!==p)return  false;return  true}async function i(d){let l=null;return ge.subscribeImmediate(e,u=>{const p=t?jn(u,t):u,{signatures:f}=o(p);if(!a(l,f)){const g=new Set([...l?Array.from(l.keys()):[],...Array.from(f.keys())]),b=[];for(const h of g){const x=l?.get(h)??"__NONE__",k=f.get(h)??"__NONE__";x!==k&&b.push(h);}l=f,d({value:p,changedKeys:b});}})}async function s(d,l){return i(({value:u,changedKeys:p})=>{p.includes(d)&&l({value:u});})}async function c(d,l){const u=new Set(d);return i(({value:p,changedKeys:f})=>{const g=f.filter(b=>u.has(b));g.length&&l({value:p,changedKeys:g});})}return {sub:i,subKey:s,subKeys:c}}const Yt=new Map;function rg(e,t){const n=Yt.get(e);if(n)try{n();}catch{}return Yt.set(e,t),()=>{try{t();}catch{}Yt.get(e)===t&&Yt.delete(e);}}function me(e,t={}){const{path:n,write:r="replace"}=t,o=n?`${e}:${ei(n).join(".")}`:e;async function a(){const u=await ge.select(e);return n?jn(u,n):u}async function i(u){if(typeof r=="function"){const g=await ge.select(e),b=r(u,g);return ge.set(e,b)}const p=await ge.select(e),f=n?tg(p,n,u):u;return r==="merge-shallow"&&!n&&p&&typeof p=="object"&&typeof u=="object"?ge.set(e,{...p,...u}):ge.set(e,f)}async function s(u){const p=await a(),f=u(p);return await i(f),f}async function c(u,p,f){let g;const b=x=>{const k=n?jn(x,n):x;if(typeof g>"u"||!f(g,k)){const y=g;g=k,p(k,y);}},h=u?await ge.subscribeImmediate(e,b):await ge.subscribe(e,b);return rg(o,h)}function d(){const u=Yt.get(o);if(u){try{u();}catch{}Yt.delete(o);}}function l(u){return ng(e,u?.path??n,u)}return {label:o,get:a,set:i,update:s,onChange:(u,p=Object.is)=>c(false,u,p),onChangeNow:(u,p=Object.is)=>c(true,u,p),asSignature:l,stopOnChange:d}}function _(e){return me(e)}_("positionAtom");_("lastPositionInMyGardenAtom");_("playerDirectionAtom");_("stateAtom");_("quinoaDataAtom");_("currentTimeAtom");_("actionAtom");_("isPressAndHoldActionAtom");_("mapAtom");_("tileSizeAtom");me("mapAtom",{path:"cols"});me("mapAtom",{path:"rows"});me("mapAtom",{path:"spawnTiles"});me("mapAtom",{path:"locations.seedShop.spawnTileIdx"});me("mapAtom",{path:"locations.eggShop.spawnTileIdx"});me("mapAtom",{path:"locations.toolShop.spawnTileIdx"});me("mapAtom",{path:"locations.decorShop.spawnTileIdx"});me("mapAtom",{path:"locations.sellCropsShop.spawnTileIdx"});me("mapAtom",{path:"locations.sellPetShop.spawnTileIdx"});me("mapAtom",{path:"locations.collectorsClub.spawnTileIdx"});me("mapAtom",{path:"locations.wishingWell.spawnTileIdx"});me("mapAtom",{path:"locations.shopsCenter.spawnTileIdx"});_("playerAtom");_("myDataAtom");_("myUserSlotIdxAtom");_("isSpectatingAtom");_("myCoinsCountAtom");_("numPlayersAtom");me("playerAtom",{path:"id"});me("myDataAtom",{path:"activityLogs"});_("userSlotsAtom");_("filteredUserSlotsAtom");_("myUserSlotAtom");_("spectatorsAtom");me("stateAtom",{path:"child"});me("stateAtom",{path:"child.data"});me("stateAtom",{path:"child.data.shops"});const og=me("stateAtom",{path:"child.data.userSlots"}),ag=me("stateAtom",{path:"data.players"}),ig=me("stateAtom",{path:"data.hostPlayerId"});_("myInventoryAtom");_("myInventoryItemsAtom");_("isMyInventoryAtMaxLengthAtom");_("myFavoritedItemIdsAtom");_("myCropInventoryAtom");_("mySeedInventoryAtom");_("myToolInventoryAtom");_("myEggInventoryAtom");_("myDecorInventoryAtom");_("myPetInventoryAtom");me("myInventoryAtom",{path:"favoritedItemIds"});_("itemTypeFiltersAtom");_("myItemStoragesAtom");_("myPetHutchStoragesAtom");_("myPetHutchItemsAtom");_("myPetHutchPetItemsAtom");_("myNumPetHutchItemsAtom");_("myValidatedSelectedItemIndexAtom");_("isSelectedItemAtomSuspended");_("mySelectedItemAtom");_("mySelectedItemNameAtom");_("mySelectedItemRotationsAtom");_("mySelectedItemRotationAtom");_("setSelectedIndexToEndAtom");_("myPossiblyNoLongerValidSelectedItemIndexAtom");_("myCurrentGlobalTileIndexAtom");_("myCurrentGardenTileAtom");_("myCurrentGardenObjectAtom");_("myOwnCurrentGardenObjectAtom");_("myOwnCurrentDirtTileIndexAtom");_("myCurrentGardenObjectNameAtom");_("isInMyGardenAtom");_("myGardenBoardwalkTileObjectsAtom");const sg=me("myDataAtom",{path:"garden"});me("myDataAtom",{path:"garden.tileObjects"});me("myOwnCurrentGardenObjectAtom",{path:"objectType"});_("myCurrentStablePlantObjectInfoAtom");_("myCurrentSortedGrowSlotIndicesAtom");_("myCurrentGrowSlotIndexAtom");_("myCurrentGrowSlotsAtom");_("myCurrentGrowSlotAtom");_("secondsUntilCurrentGrowSlotMaturesAtom");_("isCurrentGrowSlotMatureAtom");_("numGrowSlotsAtom");_("myCurrentEggAtom");_("petInfosAtom");_("myPetInfosAtom");_("myPetSlotInfosAtom");_("myPrimitivePetSlotsAtom");_("myNonPrimitivePetSlotsAtom");_("expandedPetSlotIdAtom");_("myPetsProgressAtom");_("myActiveCropMutationPetsAtom");_("totalPetSellPriceAtom");_("selectedPetHasNewVariantsAtom");const lg=_("shopsAtom"),cg=_("myShopPurchasesAtom");_("seedShopAtom");_("seedShopInventoryAtom");_("seedShopRestockSecondsAtom");_("seedShopCustomRestockInventoryAtom");_("eggShopAtom");_("eggShopInventoryAtom");_("eggShopRestockSecondsAtom");_("eggShopCustomRestockInventoryAtom");_("toolShopAtom");_("toolShopInventoryAtom");_("toolShopRestockSecondsAtom");_("toolShopCustomRestockInventoryAtom");_("decorShopAtom");_("decorShopInventoryAtom");_("decorShopRestockSecondsAtom");_("decorShopCustomRestockInventoryAtom");_("isDecorShopAboutToRestockAtom");me("shopsAtom",{path:"seed"});me("shopsAtom",{path:"tool"});me("shopsAtom",{path:"egg"});me("shopsAtom",{path:"decor"});_("myCropItemsAtom");_("myCropItemsToSellAtom");_("totalCropSellPriceAtom");_("friendBonusMultiplierAtom");_("myJournalAtom");_("myCropJournalAtom");_("myPetJournalAtom");_("myStatsAtom");_("myActivityLogsAtom");_("newLogsAtom");_("hasNewLogsAtom");_("newCropLogsFromSellingAtom");_("hasNewCropLogsFromSellingAtom");_("myCompletedTasksAtom");_("myActiveTasksAtom");_("isWelcomeToastVisibleAtom");_("shouldCloseWelcomeToastAtom");_("isInitialMoveToDirtPatchToastVisibleAtom");_("isFirstPlantSeedActiveAtom");_("isThirdSeedPlantActiveAtom");_("isThirdSeedPlantCompletedAtom");_("isDemoTouchpadVisibleAtom");_("areShopAnnouncersEnabledAtom");_("arePresentablesEnabledAtom");_("isEmptyDirtTileHighlightedAtom");_("isPlantTileHighlightedAtom");_("isItemHiglightedInHotbarAtom");_("isItemHighlightedInModalAtom");_("isMyGardenButtonHighlightedAtom");_("isSellButtonHighlightedAtom");_("isShopButtonHighlightedAtom");_("isInstaGrowButtonHiddenAtom");_("isActionButtonHighlightedAtom");_("isGardenItemInfoCardHiddenAtom");_("isSeedPurchaseButtonHighlightedAtom");_("isFirstSeedPurchaseActiveAtom");_("isFirstCropHarvestActiveAtom");_("isWeatherStatusHighlightedAtom");const dg=_("weatherAtom"),ti=_("activeModalAtom");_("hotkeyBeingPressedAtom");_("avatarTriggerAnimationAtom");_("avatarDataAtom");_("emoteDataAtom");_("otherUserSlotsAtom");_("otherPlayerPositionsAtom");_("otherPlayerSelectedItemsAtom");_("otherPlayerLastActionsAtom");_("traderBunnyPlayerId");_("npcPlayersAtom");_("npcQuinoaUsersAtom");_("numNpcAvatarsAtom");_("traderBunnyEmoteTimeoutAtom");_("traderBunnyEmoteAtom");_("unsortedLeaderboardAtom");_("currentGardenNameAtom");_("quinoaEngineAtom");_("quinoaInitializationErrorAtom");_("avgPingAtom");_("serverClientTimeOffsetAtom");_("isEstablishingShotRunningAtom");_("isEstablishingShotCompleteAtom");const ce={initialized:false,activeModal:null,isCustom:false,shadow:null,patchedAtoms:new Set,originalReads:new Map,unsubscribes:[],listeners:{onOpen:new Set,onClose:new Set}};function go(){return ce}function ug(){return ce.initialized}function Dt(){return ce.isCustom&&ce.activeModal!==null}function Ft(){return ce.activeModal}function ql(e){return !ce.shadow||ce.shadow.modal!==e?null:ce.shadow.data}function pg(e){ce.initialized=e;}function ni(e){ce.activeModal=e;}function ri(e){ce.isCustom=e;}function Jl(e,t){ce.shadow={modal:e,data:t,timestamp:Date.now()};}function Ql(){ce.shadow=null;}function ns(e,t){ce.patchedAtoms.add(e),ce.originalReads.set(e,t);}function fg(e){return ce.originalReads.get(e)}function ca(e){return ce.patchedAtoms.has(e)}function gg(e){ce.patchedAtoms.delete(e),ce.originalReads.delete(e);}function mg(e){ce.unsubscribes.push(e);}function hg(){for(const e of ce.unsubscribes)try{e();}catch{}ce.unsubscribes.length=0;}function bg(e){return ce.listeners.onOpen.add(e),()=>ce.listeners.onOpen.delete(e)}function Zl(e){return ce.listeners.onClose.add(e),()=>ce.listeners.onClose.delete(e)}function ec(e){for(const t of Array.from(ce.listeners.onOpen))try{t(e);}catch{}}function oi(e){for(const t of Array.from(ce.listeners.onClose))try{t(e);}catch{}}function xg(){hg(),ce.initialized=false,ce.activeModal=null,ce.isCustom=false,ce.shadow=null,ce.patchedAtoms.clear(),ce.originalReads.clear(),ce.listeners.onOpen.clear(),ce.listeners.onClose.clear();}const ai={inventory:{atoms:[{atomLabel:"myInventoryAtom",dataKey:"_full",transform:e=>{const t=e;return {items:t.items??[],storages:t.storages??[],favoritedItemIds:t.favoritedItemIds??[]}}}],derivedAtoms:[{atomLabel:"myCropInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Produce"):[]},{atomLabel:"mySeedInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Seed"):[]},{atomLabel:"myToolInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Tool"):[]},{atomLabel:"myEggInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Egg"):[]},{atomLabel:"myDecorInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Decor"):[]},{atomLabel:"myPetInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Pet"):[]}]},journal:{atoms:[{atomLabel:"myJournalAtom",dataKey:"_full"}],derivedAtoms:[{atomLabel:"myCropJournalAtom",sourceKey:"produce",deriveFn:e=>e??{}},{atomLabel:"myPetJournalAtom",sourceKey:"pets",deriveFn:e=>e??{}}]},stats:{atoms:[{atomLabel:"myStatsAtom",dataKey:"_full"}]},activityLog:{atoms:[{atomLabel:"myActivityLogsAtom",dataKey:"logs"}]},seedShop:{atoms:[{atomLabel:"seedShopInventoryAtom",dataKey:"inventory"},{atomLabel:"seedShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},eggShop:{atoms:[{atomLabel:"eggShopInventoryAtom",dataKey:"inventory"},{atomLabel:"eggShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},toolShop:{atoms:[{atomLabel:"toolShopInventoryAtom",dataKey:"inventory"},{atomLabel:"toolShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},decorShop:{atoms:[{atomLabel:"decorShopInventoryAtom",dataKey:"inventory"},{atomLabel:"decorShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},leaderboard:{atoms:[{atomLabel:"unsortedLeaderboardAtom",dataKey:"entries"}]},petHutch:{atoms:[{atomLabel:"myPetHutchItemsAtom",dataKey:"items"},{atomLabel:"myPetHutchPetItemsAtom",dataKey:"petItems"}]}};function tc(e){return ai[e]}function yg(e){const t=ai[e],n=[];for(const r of t.atoms)n.push(r.atomLabel);if(t.derivedAtoms)for(const r of t.derivedAtoms)n.push(r.atomLabel);return n}const vg=new Set(["inventory","journal","stats","activityLog","petHutch"]),wg=new Set(["seedShop","eggShop","toolShop","decorShop"]),Sg=new Set(["leaderboard"]);function kg(e,t,n,r){return function(a){const i=Dt(),s=Ft();if(i&&s===r){const c=ql(r);if(c!==null){let d;if(n.dataKey==="_full"?d=c:d=c[n.dataKey],d!==void 0)return t(a),n.transform?n.transform(d):d}}return t(a)}}function Cg(e,t,n,r,o){return function(i){if(Dt()&&Ft()===o){const s=ql(o);if(s!==null){const c=s[n];if(c!==void 0)return t(i),r(c)}}return t(i)}}function Tg(e){const t=tc(e);for(const n of t.atoms){const r=wt(n.atomLabel);if(!r||ca(n.atomLabel))continue;const o=r.read;if(typeof o!="function")continue;const a=kg(n.atomLabel,o,n,e);r.read=a,ns(n.atomLabel,o);}if(t.derivedAtoms)for(const n of t.derivedAtoms){const r=wt(n.atomLabel);if(!r||ca(n.atomLabel))continue;const o=r.read;if(typeof o!="function")continue;const a=Cg(n.atomLabel,o,n.sourceKey,n.deriveFn,e);r.read=a,ns(n.atomLabel,o);}}async function mo(e){const t=tc(e);for(const r of t.atoms)rs(r.atomLabel);if(t.derivedAtoms)for(const r of t.derivedAtoms)rs(r.atomLabel);const n=await Za();await nc(n,e);}async function Pg(e){const t=await Za();await nc(t,e);const n=yg(e);for(const r of n){const o=wt(r);if(o)try{t.get(o);}catch{}}}function rs(e){if(!ca(e))return;const t=wt(e),n=fg(e);t&&n&&(t.read=n),gg(e);}async function nc(e,t){const n=vg.has(t),r=wg.has(t),o=Sg.has(t);if(!n&&!r&&!o)return;const a=wt("stateAtom");if(a)try{const i=e.get(a);if(!i||typeof i!="object")return;let s=null;if(n||r){const c=i.child,d=c?.data;if(c&&d&&typeof d=="object"){let l=null;if(n&&Array.isArray(d.userSlots)){const u=d.userSlots.map(p=>{if(!p||typeof p!="object")return p;const f=p,g=f.data,b=g&&typeof g=="object"?{...g}:g;return {...f,data:b}});l={...l??d,userSlots:u};}if(r&&d.shops&&typeof d.shops=="object"&&(l={...l??d,shops:{...d.shops}}),l){const u={...c,data:l};s={...i,child:u};}}}if(o){const c=i.data;if(c&&Array.isArray(c.players)){const d={...c,players:[...c.players]};s={...s??i,data:d};}}if(!s)return;await e.set(a,s);}catch{}}async function Ag(){for(const e of Object.keys(ai))await mo(e);}let fr=null,Ln=null;async function Ig(){if(go().initialized)return;Ln=await ge.select("activeModalAtom"),fr=setInterval(async()=>{try{const n=await ge.select("activeModalAtom"),r=Ln;r!==n&&(Ln=n,_g(n,r));}catch{}},50),mg(()=>{fr&&(clearInterval(fr),fr=null);}),pg(true);}function _g(e,t){const n=Dt(),r=Ft();e===null&&t!==null&&(n&&r===t?Eg("native"):n||oi({modal:t,wasCustom:false,closedBy:"native"})),e!==null&&!n&&ec({modal:e,isCustom:false});}async function Eg(e){const t=Ft();t&&(Ql(),ri(false),ni(null),await mo(t),oi({modal:t,wasCustom:true,closedBy:e}));}async function Mg(e,t){if(!go().initialized)throw new Error("[MGCustomModal] Not initialized. Call init() first.");Dt()&&await rc(),Jl(e,t),ri(true),ni(e),Tg(e),await Pg(e),await ti.set(e),Ln=e,ec({modal:e,isCustom:true});}function Lg(e,t){const n=go();if(!n.isCustom||n.activeModal!==e||!n.shadow)return;const o={...n.shadow.data,...t};Jl(e,o);}async function rc(){const e=go();if(!e.isCustom||!e.activeModal)return;const t=e.activeModal;Ql(),ri(false),ni(null),await ti.set(null),Ln=null,await mo(t),oi({modal:t,wasCustom:true,closedBy:"api"});}function Rg(){return new Promise(e=>{if(!Dt()){e();return}const t=Zl(()=>{t(),e();});})}async function Fg(){if(Dt()){const e=Ft();e&&await mo(e);}await Ag(),xg();}const qt={async init(){return Ig()},isReady(){return ug()},async show(e,t){return Mg(e,t)},update(e,t){return Lg(e,t)},async close(){return rc()},isOpen(){return Ft()!==null},isCustomOpen(){return Dt()},getActiveModal(){return Ft()},waitForClose(){return Rg()},onOpen(e){return bg(e)},onClose(e){return Zl(e)},async destroy(){return Fg()}};function Ng(){return {ready:false,app:null,renderer:null,ctors:null,baseUrl:null,textures:new Map,animations:new Map,live:new Set,defaultParent:null,overlay:null,categoryIndex:null}}function Og(){return {lru:new Map,cost:0,srcCanvas:new Map}}function Bg(){return {cache:new Map,maxEntries:200}}const $g={enabled:true,maxEntries:200,maxCost:800,srcCanvasMax:100},Dg={enabled:true,maxEntries:200},Ie=Ng(),zg=Og(),Gg={...$g},jg=Bg(),Hg={...Dg};function De(){return Ie}function on(){return zg}function Hn(){return Gg}function Wn(){return jg}function da(){return Hg}function oc(){return Ie.ready}const os=Function.prototype.bind,pe={_bindPatched:false,engine:null,tos:null,app:null,renderer:null,ticker:null,stage:null};let ac,ic,sc;const Wg=new Promise(e=>{ac=e;}),Ug=new Promise(e=>{ic=e;}),Vg=new Promise(e=>{sc=e;});function Xg(e){return !!(e&&typeof e=="object"&&typeof e.start=="function"&&typeof e.destroy=="function"&&e.app&&e.app.stage&&e.app.renderer&&e.systems&&typeof e.systems.values=="function")}function Kg(e){try{for(const t of e.systems.values()){const n=t?.system;if(n?.name==="tileObject")return n}}catch{}return null}function Yg(e){pe.engine=e,pe.tos=Kg(e)||null,pe.app=e.app||null,pe.renderer=e.app?.renderer||null,pe.ticker=e.app?.ticker||null,pe.stage=e.app?.stage||null;try{ac(e);}catch{}try{pe.app&&ic(pe.app);}catch{}try{pe.renderer&&sc(pe.renderer);}catch{}}function ii(){return pe.engine?true:(pe._bindPatched||(pe._bindPatched=true,Function.prototype.bind=function(e,...t){const n=os.call(this,e,...t);try{!pe.engine&&Xg(e)&&(Function.prototype.bind=os,pe._bindPatched=!1,Yg(e));}catch{}return n}),false)}ii();async function qg(e=15e3){const t=performance.now();for(;performance.now()-t<e;){if(pe.engine)return  true;ii(),await po(50);}throw new Error("MGPixiHooks: engine capture timeout")}async function Jg(e=15e3){return pe.engine||await qg(e),true}function Qg(){return pe.engine&&pe.app?{ok:true,engine:pe.engine,tos:pe.tos,app:pe.app}:(ii(),{ok:false,engine:pe.engine,tos:pe.tos,app:pe.app,note:"Not captured. Wait for room, or reload."})}const Ye={engineReady:Wg,appReady:Ug,rendererReady:Vg,engine:()=>pe.engine,tos:()=>pe.tos,app:()=>pe.app,renderer:()=>pe.renderer,ticker:()=>pe.ticker,stage:()=>pe.stage,PIXI:()=>O.PIXI||null,init:Jg,hook:Qg,ready:()=>!!pe.engine};function no(e){const t=String(e||"").trim();return t?t.startsWith("sprite/")||t.startsWith("sprites/")?t:t.includes("/")?`sprite/${t}`:t:""}function qn(e,t){const n=String(e||"").trim().replace(/^sprites?\//,"").replace(/^\/+|\/+$/g,""),r=String(t||"").trim();return r.includes("/")||!n?no(r):`sprite/${n}/${r}`}function Un(e,t,n,r){const o=qn(e,t);if(n.has(o)||r.has(o))return o;const a=String(t||"").trim();if(n.has(a)||r.has(a))return a;const i=no(a);return n.has(i)||r.has(i)?i:o}function Zg(e,t,n=25e3){const r=[e],o=new Set;let a=0;for(;r.length&&a++<n;){const i=r.pop();if(!i||o.has(i))continue;if(o.add(i),t(i))return i;const s=i.children;if(Array.isArray(s))for(let c=s.length-1;c>=0;c--)r.push(s[c]);}return null}function em(e){const t=O.PIXI;if(t?.Texture&&t?.Sprite&&t?.Container&&t?.Rectangle)return {Container:t.Container,Sprite:t.Sprite,Texture:t.Texture,Rectangle:t.Rectangle,AnimatedSprite:t.AnimatedSprite||null};const n=e?.stage,r=Zg(n,o=>o?.texture?.frame&&o?.constructor&&o?.texture?.constructor&&o?.texture?.frame?.constructor);if(!r)throw new Error("No Sprite found yet (constructors).");return {Container:n.constructor,Sprite:r.constructor,Texture:r.texture.constructor,Rectangle:r.texture.frame.constructor,AnimatedSprite:t?.AnimatedSprite||null}}async function tm(e,t=15e3){const n=performance.now();for(;performance.now()-n<t;)try{return em(e)}catch{await po(50);}throw new Error("Constructors timeout")}const Pt=(...e)=>{try{console.log("[MGSprite]",...e);}catch{}};function nm(e){return e&&typeof e=="object"&&e.frames&&e.meta&&typeof e.meta.image=="string"}function Lo(e,t,n,r,o){return new e(t,n,r,o)}function rm(e,t,n,r,o,a,i){let s;try{s=new e({source:t.source,frame:n,orig:r,trim:o||void 0,rotate:a||0});}catch{s=new e(t.baseTexture||t,n,r,o||void 0,a||0);}if(i)if(s.defaultAnchor?.set)try{s.defaultAnchor.set(i.x,i.y);}catch{}else s.defaultAnchor?(s.defaultAnchor.x=i.x,s.defaultAnchor.y=i.y):s.defaultAnchor={x:i.x,y:i.y};try{s.updateUvs?.();}catch{}return s}function om(e,t,n,r){const{Texture:o,Rectangle:a}=r;for(const[i,s]of Object.entries(e.frames)){const c=s.frame,d=!!s.rotated,l=d?2:0,u=d?c.h:c.w,p=d?c.w:c.h,f=Lo(a,c.x,c.y,u,p),g=s.sourceSize||{w:c.w,h:c.h},b=Lo(a,0,0,g.w,g.h);let h=null;if(s.trimmed&&s.spriteSourceSize){const x=s.spriteSourceSize;h=Lo(a,x.x,x.y,x.w,x.h);}n.set(i,rm(o,t,f,b,h,l,s.anchor||null));}}function am(e,t,n){if(!(!e.animations||typeof e.animations!="object"))for(const[r,o]of Object.entries(e.animations)){if(!Array.isArray(o))continue;const a=o.map(i=>t.get(i)).filter(Boolean);a.length>=2&&n.set(r,a);}}function im(e,t){const n=(r,o)=>{const a=String(r||"").trim(),i=String(o||"").trim();!a||!i||(t.has(a)||t.set(a,new Set),t.get(a).add(i));};for(const r of Object.keys(e.frames||{})){const o=/^sprite\/([^/]+)\/(.+)$/.exec(r);o&&n(o[1],o[2]);}}async function sm(e,t){const n=await bt.load({baseUrl:e}),r=bt.getBundle(n,"default");if(!r)throw new Error("No default bundle in manifest");const o=bt.listJsonFromBundle(r),a=new Set,i=new Map,s=new Map,c=new Map;async function d(l){if(a.has(l))return;a.add(l);const u=await Ya(ht(e,l));if(!nm(u))return;const p=u.meta?.related_multi_packs;if(Array.isArray(p))for(const h of p)await d(Yi(l,h));const f=Yi(l,u.meta.image),g=await Up(await Il(ht(e,f))),b=t.Texture.from(g);om(u,b,i,t),am(u,i,s),im(u,c);}for(const l of o)await d(l);return {textures:i,animations:s,categoryIndex:c}}let gr=null;async function lm(){return Ie.ready?true:gr||(gr=(async()=>{const e=performance.now();Pt("init start");const t=await Ki(Ye.appReady,15e3,"PIXI app");Pt("app ready");const n=await Ki(Ye.rendererReady,15e3,"PIXI renderer");Pt("renderer ready"),Ie.app=t,Ie.renderer=n||t?.renderer||null,Ie.ctors=await tm(t),Pt("constructors resolved"),Ie.baseUrl=await $t.base(),Pt("base url",Ie.baseUrl);const{textures:r,animations:o,categoryIndex:a}=await sm(Ie.baseUrl,Ie.ctors);return Ie.textures=r,Ie.animations=o,Ie.categoryIndex=a,Pt("atlases loaded","textures",Ie.textures.size,"animations",Ie.animations.size,"categories",Ie.categoryIndex?.size??0),Ie.ready=true,Pt("ready in",Math.round(performance.now()-e),"ms"),true})(),gr)}const an={Gold:{overlayTall:null,tallIconOverride:null},Rainbow:{overlayTall:null,tallIconOverride:null,angle:130,angleTall:0},Wet:{overlayTall:"sprite/mutation-overlay/WetTallPlant",tallIconOverride:"sprite/mutation/Puddle"},Chilled:{overlayTall:"sprite/mutation-overlay/ChilledTallPlant",tallIconOverride:null},Frozen:{overlayTall:"sprite/mutation-overlay/FrozenTallPlant",tallIconOverride:null},Dawnlit:{overlayTall:null,tallIconOverride:null},Ambershine:{overlayTall:null,tallIconOverride:null},Dawncharged:{overlayTall:null,tallIconOverride:null},Ambercharged:{overlayTall:null,tallIconOverride:null}},lc=Object.keys(an),cm=["Gold","Rainbow","Wet","Chilled","Frozen","Ambershine","Dawnlit","Dawncharged","Ambercharged"],as=new Map(cm.map((e,t)=>[e,t]));function ro(e){return [...new Set(e.filter(Boolean))].sort((n,r)=>(as.get(n)??1/0)-(as.get(r)??1/0))}const dm=["Wet","Chilled","Frozen"],um=new Set(["Dawnlit","Ambershine","Dawncharged","Ambercharged"]),pm={Banana:.6,Carrot:.6,Sunflower:.5,Starweaver:.5,FavaBean:.25,BurrosTail:.2},fm={Pepper:.5,Banana:.6},gm=256,mm=.5,hm=2;function cc(e){if(!e.length)return {muts:[],overlayMuts:[],selectedMuts:[],sig:""};const t=ro(e),n=bm(e),r=xm(e);return {muts:n,overlayMuts:r,selectedMuts:t,sig:`${t.join(",")}|${n.join(",")}|${r.join(",")}`}}function bm(e){const t=e.filter((o,a,i)=>an[o]&&i.indexOf(o)===a);if(!t.length)return [];if(t.includes("Gold"))return ["Gold"];if(t.includes("Rainbow"))return ["Rainbow"];const n=["Ambershine","Dawnlit","Dawncharged","Ambercharged"];return t.some(o=>n.includes(o))?ro(t.filter(o=>!dm.includes(o))):ro(t)}function xm(e){const t=e.filter((n,r,o)=>an[n]?.overlayTall&&o.indexOf(n)===r);return ro(t)}function Ro(e,t){return e.map(n=>({name:n,meta:an[n],overlayTall:an[n]?.overlayTall??null,isTall:t}))}const ym={Gold:{op:"source-atop",colors:["rgb(235,200,0)"],a:.7},Rainbow:{op:"color",colors:["#FF1744","#FF9100","#FFEA00","#00E676","#2979FF","#D500F9"],ang:130,angTall:0,masked:true},Wet:{op:"source-atop",colors:["rgb(50,180,200)"],a:.25},Chilled:{op:"source-atop",colors:["rgb(100,160,210)"],a:.45},Frozen:{op:"source-atop",colors:["rgb(100,130,220)"],a:.5},Dawnlit:{op:"source-atop",colors:["rgb(209,70,231)"],a:.5},Ambershine:{op:"source-atop",colors:["rgb(190,100,40)"],a:.5},Dawncharged:{op:"source-atop",colors:["rgb(140,80,200)"],a:.5},Ambercharged:{op:"source-atop",colors:["rgb(170,60,25)"],a:.5}},mr=(()=>{try{const t=document.createElement("canvas").getContext("2d");if(!t)return new Set;const n=["color","hue","saturation","luminosity","overlay","screen","lighter","source-atop"],r=new Set;for(const o of n)t.globalCompositeOperation=o,t.globalCompositeOperation===o&&r.add(o);return r}catch{return new Set}})();function vm(e){return mr.has(e)?e:mr.has("overlay")?"overlay":mr.has("screen")?"screen":mr.has("lighter")?"lighter":"source-atop"}function wm(e,t,n,r,o=false){const a=(r-90)*Math.PI/180,i=t/2,s=n/2;if(!o){const u=Math.min(t,n)/2;return e.createLinearGradient(i-Math.cos(a)*u,s-Math.sin(a)*u,i+Math.cos(a)*u,s+Math.sin(a)*u)}const c=Math.cos(a),d=Math.sin(a),l=Math.abs(c)*t/2+Math.abs(d)*n/2;return e.createLinearGradient(i-c*l,s-d*l,i+c*l,s+d*l)}function is(e,t,n,r,o=false){const a=r.colors?.length?r.colors:["#fff"],i=r.ang!=null?wm(e,t,n,r.ang,o):e.createLinearGradient(0,0,0,n);a.length===1?(i.addColorStop(0,a[0]),i.addColorStop(1,a[0])):a.forEach((s,c)=>i.addColorStop(c/(a.length-1),s)),e.fillStyle=i,e.fillRect(0,0,t,n);}function Sm(e,t,n,r){const o=ym[n];if(!o)return;const a={...o};n==="Rainbow"&&r&&a.angTall!=null&&(a.ang=a.angTall);const i=n==="Rainbow"&&r,s=t.width,c=t.height;e.save();const d=a.masked?vm(a.op):"source-in";if(e.globalCompositeOperation=d,a.a!=null&&(e.globalAlpha=a.a),a.masked){const l=document.createElement("canvas");l.width=s,l.height=c;const u=l.getContext("2d");u.imageSmoothingEnabled=false,is(u,s,c,a,i),u.globalCompositeOperation="destination-in",u.drawImage(t,0,0),e.drawImage(l,0,0);}else is(e,s,c,a,i);e.restore();}function km(e){return /tallplant/i.test(e)}function si(e){const t=String(e||"").split("/");return t[t.length-1]||""}function dc(e){switch(e){case "Ambershine":return ["Ambershine","Amberlit"];case "Dawncharged":return ["Dawncharged","Dawnbound"];case "Ambercharged":return ["Ambercharged","Amberbound"];default:return [e]}}function Cm(e,t){const n=String(e||"").toLowerCase();for(const r of t.keys()){const o=/sprite\/mutation-overlay\/([A-Za-z0-9]+)TallPlant/i.exec(String(r));if(!o||!o[1])continue;if(o[1].toLowerCase()===n){const i=t.get(r);if(i)return {tex:i,key:r}}}return null}function Tm(e,t,n,r){if(!t)return null;const o=si(e),a=dc(t);for(const i of a){const s=[`sprite/mutation/${i}${o}`,`sprite/mutation/${i}-${o}`,`sprite/mutation/${i}_${o}`,`sprite/mutation/${i}/${o}`,`sprite/mutation/${i}`];for(const c of s){const d=n.get(c);if(d)return {tex:d,key:c}}{const c=`sprite/mutation-overlay/${i}TallPlant`,d=n.get(c);if(d)return {tex:d,key:c};const l=`sprite/mutation-overlay/${i}`,u=n.get(l);if(u)return {tex:u,key:l};const p=Cm(t,n);if(p)return p}}return null}function Pm(e,t,n,r){if(!t)return null;const o=an[t];if(n&&o?.tallIconOverride){const s=r.get(o.tallIconOverride);if(s)return s}const a=si(e),i=dc(t);for(const s of i){const c=[`sprite/mutation/${s}Icon`,`sprite/mutation/${s}`,`sprite/mutation/${s}${a}`,`sprite/mutation/${s}-${a}`,`sprite/mutation/${s}_${a}`,`sprite/mutation/${s}/${a}`];for(const d of c){const l=r.get(d);if(l)return l}if(n){const d=`sprite/mutation-overlay/${s}TallPlantIcon`,l=r.get(d);if(l)return l;const u=`sprite/mutation-overlay/${s}TallPlant`,p=r.get(u);if(p)return p}}return null}function Am(e,t,n){const r=e?.orig?.width??e?.frame?.width??e?.width??1,o=e?.orig?.height??e?.frame?.height??e?.height??1,a=e?.defaultAnchor?.x??0,i=e?.defaultAnchor?.y??0;let s=fm[t]??a;const c=o>r*1.5;let d=pm[t]??(c?i:.4);const l={x:(s-a)*r,y:(d-i)*o},u=Math.min(r,o),p=Math.min(1.5,u/gm);let f=mm*p;return n&&(f*=hm),{width:r,height:o,anchorX:a,anchorY:i,offset:l,iconScale:f}}function uc(e,t){return `${t.sig}::${e}`}function pc(e){return e?e.isAnim?e.frames?.length||0:e.tex?1:0:0}function Im(e,t,n){e.lru.delete(t),e.lru.set(t,n);}function _m(e,t){if(t.enabled)for(;e.lru.size>t.maxEntries||e.cost>t.maxCost;){const n=e.lru.keys().next().value;if(n===void 0)break;const r=e.lru.get(n);e.lru.delete(n),e.cost=Math.max(0,e.cost-pc(r??null));}}function fc(e,t){const n=e.lru.get(t);return n?(Im(e,t,n),n):null}function gc(e,t,n,r){e.lru.set(t,n),e.cost+=pc(n),_m(e,r);}function Em(e){e.lru.clear(),e.cost=0,e.srcCanvas.clear();}function Mm(e,t){return e.srcCanvas.get(t)??null}function Lm(e,t,n,r){if(e.srcCanvas.set(t,n),e.srcCanvas.size>r.srcCanvasMax){const o=e.srcCanvas.keys().next().value;o!==void 0&&e.srcCanvas.delete(o);}}function ho(e,t,n,r,o){const a=Mm(r,e);if(a)return a;let i=null;const s=t?.resolution??1;try{if(t?.extract?.canvas){const c=new n.Sprite(e),d=t.extract.canvas(c);if(c.destroy?.({children:!0,texture:!1,baseTexture:!1}),s>1&&d){const l=Math.round(d.width/s),u=Math.round(d.height/s);i=document.createElement("canvas"),i.width=l,i.height=u;const p=i.getContext("2d");p&&(p.imageSmoothingEnabled=!1,p.drawImage(d,0,0,l,u));}else i=d;}}catch{}if(!i){const c=e?.frame||e?._frame,d=e?.orig||e?._orig,l=e?.trim||e?._trim,u=e?.rotate||e?._rotate||0,p=e?.baseTexture?.resource?.source||e?.baseTexture?.resource||e?.source?.resource?.source||e?.source?.resource||e?._source?.resource?.source||null;if(!c||!p)throw new Error("textureToCanvas fail");i=document.createElement("canvas");const f=Math.max(1,(d?.width??c.width)|0),g=Math.max(1,(d?.height??c.height)|0),b=l?.x??0,h=l?.y??0;i.width=f,i.height=g;const x=i.getContext("2d");x.imageSmoothingEnabled=false,u===true||u===2||u===8?(x.save(),x.translate(b+c.height/2,h+c.width/2),x.rotate(-Math.PI/2),x.drawImage(p,c.x,c.y,c.width,c.height,-c.width/2,-c.height/2,c.width,c.height),x.restore()):x.drawImage(p,c.x,c.y,c.width,c.height,b,h,c.width,c.height);}return Lm(r,e,i,o),i}function Rm(e,t,n,r,o,a,i,s){const{w:c,h:d,aX:l,aY:u,basePos:p}=t,f=[];for(const g of n){const b=new r.Sprite(e);b.anchor?.set?.(l,u),b.position.set(p.x,p.y),b.zIndex=1;const h=document.createElement("canvas");h.width=c,h.height=d;const x=h.getContext("2d");x.imageSmoothingEnabled=false,x.save(),x.translate(c*l,d*u),x.drawImage(ho(e,o,r,a,i),-c*l,-d*u),x.restore(),Sm(x,h,g.name,g.isTall);const k=r.Texture.from(h,{resolution:e.resolution??1});s.push(k),b.texture=k,f.push(b);}return f}function Fm(e,t,n,r,o,a,i,s,c,d){const{aX:l,basePos:u}=t,p=[];for(const f of n){const g=f.overlayTall&&r.get(f.overlayTall)&&{tex:r.get(f.overlayTall),key:f.overlayTall}||Tm(e,f.name,r);if(!g?.tex)continue;const b=ho(g.tex,a,o,i,s);if(!b)continue;const h=b.width,x={x:0,y:0},k={x:u.x-l*h,y:0},y=document.createElement("canvas");y.width=h,y.height=b.height;const w=y.getContext("2d");if(!w)continue;w.imageSmoothingEnabled=false,w.drawImage(b,0,0),w.globalCompositeOperation="destination-in",w.drawImage(c,-k.x,-0);const T=o.Texture.from(y,{resolution:g.tex.resolution??1});d.push(T);const S=new o.Sprite(T);S.anchor?.set?.(x.x,x.y),S.position.set(k.x,k.y),S.scale.set(1),S.alpha=1,S.zIndex=3,p.push(S);}return p}function Nm(e,t,n,r,o,a){const{basePos:i}=t,s=[];for(const c of n){if(c.name==="Gold"||c.name==="Rainbow")continue;const d=Pm(e,c.name,c.isTall,r);if(!d)continue;const l=new o.Sprite(d),u=d?.defaultAnchor?.x??.5,p=d?.defaultAnchor?.y??.5;l.anchor?.set?.(u,p),l.position.set(i.x+a.offset.x,i.y+a.offset.y),l.scale.set(a.iconScale),c.isTall&&(l.zIndex=-1),um.has(c.name)&&(l.zIndex=10),l.zIndex||(l.zIndex=2),s.push(l);}return s}function mc(e,t,n,r){try{if(!e||!r.renderer||!r.ctors?.Container||!r.ctors?.Sprite||!r.ctors?.Texture)return null;const{Container:o,Sprite:a,Texture:i}=r.ctors,s=e?.orig?.width??e?.frame?.width??e?.width??1,c=e?.orig?.height??e?.frame?.height??e?.height??1,d=e?.defaultAnchor?.x??.5,l=e?.defaultAnchor?.y??.5,u={x:s*d,y:c*l},p=ho(e,r.renderer,r.ctors,r.cacheState,r.cacheConfig),f=new o;f.sortableChildren=!0;const g=new a(e);g.anchor?.set?.(d,l),g.position.set(u.x,u.y),g.zIndex=0,f.addChild(g);const b=km(t),h=Ro(n.muts,b),x=Ro(n.overlayMuts,b),k=Ro(n.selectedMuts,b),y=[],w={w:s,h:c,aX:d,aY:l,basePos:u},T=si(t),S=Am(e,T,b);Rm(e,w,h,r.ctors,r.renderer,r.cacheState,r.cacheConfig,y).forEach(A=>f.addChild(A)),b&&Fm(t,w,x,r.textures,r.ctors,r.renderer,r.cacheState,r.cacheConfig,p,y).forEach(M=>f.addChild(M)),Nm(t,w,k,r.textures,r.ctors,S).forEach(A=>f.addChild(A));let v={x:0,y:0,width:s,height:c};try{const A=f.getLocalBounds?.()||f.getBounds?.(!0);A&&Number.isFinite(A.width)&&Number.isFinite(A.height)&&(v={x:A.x,y:A.y,width:A.width,height:A.height});}catch{}const{Rectangle:P}=r.ctors,E=P?new P(0,0,s,c):void 0;let F=null;if(typeof r.renderer.generateTexture=="function"?F=r.renderer.generateTexture(f,{resolution:1,region:E}):r.renderer.textureGenerator?.generateTexture&&(F=r.renderer.textureGenerator.generateTexture({target:f,resolution:1,region:E})),!F)throw new Error("no render texture");const $=F instanceof i?F:i.from(r.renderer.extract.canvas(F));try{$.__mg_base={baseX:-v.x,baseY:-v.y,baseW:s,baseH:c,texW:v.width,texH:v.height};}catch{}F&&F!==$&&F.destroy?.(!0),f.destroy({children:!0,texture:!1,baseTexture:!1});try{$.__mg_gen=!0,$.label=`${t}|${n.sig}`;}catch{}return $}catch{return null}}function Om(e,t,n,r){if(!e||e.length<2)return null;const o=[];for(const a of e){const i=mc(a,t,n,r);i&&o.push(i);}return o.length>=2?o:null}function hc(e,t,n,r,o){const a=t.scale??1,i=t.frameIndex??0,s=t.mutations?.slice().sort().join(",")||"",c=t.anchorX??.5,d=t.anchorY??.5;return `${e}|s${a}|f${i}|m${s}|ax${c}|ay${d}|bm${n}|bp${o}|p${r}`}function Bm(e,t){const n=e.cache.get(t);return n?(n.lastAccess=performance.now(),n.canvas):null}function $m(e,t,n,r){if(t.enabled){if(e.cache.size>=t.maxEntries){let o=null,a=1/0;for(const[i,s]of e.cache)s.lastAccess<a&&(a=s.lastAccess,o=i);o&&e.cache.delete(o);}e.cache.set(n,{canvas:r,lastAccess:performance.now()});}}function ss(e){const t=document.createElement("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");return n&&n.drawImage(e,0,0),t}function Dm(e){e.cache.clear();}function zm(e){return {size:e.cache.size,maxEntries:e.maxEntries}}function Gm(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0);})}async function jm(e,t,n,r,o,a,i,s=5,c=0){if(!t.ready||!a.enabled)return 0;const d=e.length;let l=0;i?.(0,d);for(let u=0;u<d;u+=s){const p=e.slice(u,u+s);for(const f of p)try{const g=Un(null,f,t.textures,t.animations),b={scale:1},h=xc(b),x=yc(h,b),k=wc(h,b.boundsPadding),y=hc(g,b,h,x,k);o.cache.has(y)||ua(t,n,r,null,f,b,o,a),l++;}catch{l++;}i?.(l,d),u+s<d&&await Gm();}return l}function Hm(e){if(e.overlay)return e.overlay;const t=new e.ctors.Container;t.sortableChildren=true,t.zIndex=99999999;try{e.app.stage.sortableChildren=!0;}catch{}return e.app.stage.addChild(t),e.overlay=t,t}function Wm(e){const t=e.defaultParent;if(!t)return null;try{return typeof t=="function"?t():t}catch{return null}}function li(e,t,n,r,o,a){if(!n.length)return t;const i=cc(n);if(!i.sig)return t;const s=uc(e,i),c=fc(o,s);if(c?.tex)return c.tex;const d=mc(t,e,i,{renderer:r.renderer,ctors:r.ctors,textures:r.textures,cacheState:o,cacheConfig:a});return d?(gc(o,s,{isAnim:false,tex:d},a),d):t}function bc(e,t,n,r,o,a){if(!n.length)return t;const i=cc(n);if(!i.sig)return t;const s=uc(e,i),c=fc(o,s);if(c?.isAnim&&c.frames?.length)return c.frames;const d=Om(t,e,i,{renderer:r.renderer,ctors:r.ctors,textures:r.textures,cacheState:o,cacheConfig:a});return d?(gc(o,s,{isAnim:true,frames:d},a),d):t}function ls(e,t,n,r,o,a={}){if(!e.ready)throw new Error("MGSprite not ready yet");const i=Un(r,o,e.textures,e.animations),s=a.mutations||[],c=a.parent||Wm(e)||Hm(e),d=e.renderer?.width||e.renderer?.view?.width||innerWidth,l=e.renderer?.height||e.renderer?.view?.height||innerHeight,u=a.center?d/2:a.x??d/2,p=a.center?l/2:a.y??l/2;let f;const g=e.animations.get(i);if(g&&g.length>=2){const x=bc(i,g,s,e,t,n),k=e.ctors.AnimatedSprite;if(k)f=new k(x),f.animationSpeed=a.fps?a.fps/60:a.speed??.15,f.loop=a.loop??true,f.play();else {const y=new e.ctors.Sprite(x[0]),T=1e3/Math.max(1,a.fps||8);let S=0,C=0;const I=v=>{const P=e.app.ticker?.deltaMS??v*16.666666666666668;if(S+=P,S<T)return;const E=S/T|0;S%=T,C=(C+E)%x.length,y.texture=x[C];};y.__mgTick=I,e.app.ticker?.add?.(I),f=y;}}else {const x=e.textures.get(i);if(!x)throw new Error(`Unknown sprite/anim key: ${i}`);const k=li(i,x,s,e,t,n);f=new e.ctors.Sprite(k);}const b=a.anchorX??f.texture?.defaultAnchor?.x??.5,h=a.anchorY??f.texture?.defaultAnchor?.y??.5;return f.anchor?.set?.(b,h),f.position.set(u,p),f.scale.set(a.scale??1),f.alpha=a.alpha??1,f.rotation=a.rotation??0,f.zIndex=a.zIndex??999999,c.addChild(f),e.live.add(f),f.__mgDestroy=()=>{try{f.__mgTick&&e.app.ticker?.remove?.(f.__mgTick);}catch{}try{f.destroy?.({children:!0,texture:!1,baseTexture:!1});}catch{try{f.destroy?.();}catch{}}e.live.delete(f);},f}function Um(e,t){const n=e.renderer;if(n?.extract?.canvas)return n.extract.canvas(t);if(n?.plugins?.extract?.canvas)return n.plugins.extract.canvas(t);throw new Error("No extract.canvas available on renderer")}const cs=new Map;function xc(e){return e.boundsMode?e.boundsMode:e.mutations&&e.mutations.length>0?"base":"mutations"}function yc(e,t){return e==="mutations"?t.pad??2:t.pad??0}function yn(e){return Number.isFinite(e)?Math.max(0,e):0}function vc(e){if(typeof e=="number"){const t=yn(e);return {top:t,right:t,bottom:t,left:t}}return e?{top:yn(e.top??0),right:yn(e.right??0),bottom:yn(e.bottom??0),left:yn(e.left??0)}:{top:0,right:0,bottom:0,left:0}}function wc(e,t){if(e==="mutations")return "0,0,0,0";if(e==="padded"&&t==null)return "auto";const n=vc(t);return `${n.top},${n.right},${n.bottom},${n.left}`}function Sc(e){const t=e?.orig?.width??e?.frame?.width??e?.width??1,n=e?.orig?.height??e?.frame?.height??e?.height??1;return {w:t,h:n}}function kc(e,t,n){const r=e?.__mg_base;return r&&Number.isFinite(r.baseX)&&Number.isFinite(r.baseY)&&Number.isFinite(r.baseW)&&Number.isFinite(r.baseH)&&Number.isFinite(r.texW)&&Number.isFinite(r.texH)?r:{baseX:0,baseY:0,baseW:t,baseH:n,texW:t,texH:n}}function Vm(e,t,n,r,o,a){const i=`${e}|f${t}`,s=cs.get(i);if(s)return s;const c=Sc(n),d={top:0,right:0,bottom:0,left:0};for(const l of lc){const u=li(e,n,[l],r,o,a),p=kc(u,c.w,c.h),f=Math.max(0,p.baseX),g=Math.max(0,p.baseY),b=Math.max(0,p.texW-p.baseX-p.baseW),h=Math.max(0,p.texH-p.baseY-p.baseH);f>d.left&&(d.left=f),g>d.top&&(d.top=g),b>d.right&&(d.right=b),h>d.bottom&&(d.bottom=h);}return cs.set(i,d),d}function ua(e,t,n,r,o,a={},i,s){if(!e.ready)throw new Error("MGSprite not ready yet");const c=Un(r,o,e.textures,e.animations),d=xc(a),l=yc(d,a),u=wc(d,a.boundsPadding),p=i&&s?.enabled?hc(c,a,d,l,u):null;if(p&&i&&s?.enabled){const y=Bm(i,p);if(y)return ss(y)}const f=a.mutations||[],g=e.animations.get(c),b=Math.max(0,(a.frameIndex??0)|0);let h,x;if(g?.length)if(h=g[b%g.length],f.length){const y=bc(c,g,f,e,t,n);x=y[b%y.length];}else x=h;else {const y=e.textures.get(c);if(!y)throw new Error(`Unknown sprite/anim key: ${c}`);h=y,x=li(c,y,f,e,t,n);}let k;if(d==="mutations"){const y=new e.ctors.Sprite(x),w=a.anchorX??y.texture?.defaultAnchor?.x??.5,T=a.anchorY??y.texture?.defaultAnchor?.y??.5;y.anchor?.set?.(w,T),y.scale.set(a.scale??1);const S=new e.ctors.Container;S.addChild(y);try{S.updateTransform?.();}catch{}const C=y.getBounds?.(true)||{x:0,y:0,width:y.width,height:y.height};y.position.set(-C.x+l,-C.y+l),k=Um(e,S);try{S.destroy?.({children:!0});}catch{}}else {const y=a.scale??1;let w=vc(a.boundsPadding);d==="padded"&&a.boundsPadding==null&&(w=Vm(c,b,h,e,t,n)),l&&(w={top:w.top+l,right:w.right+l,bottom:w.bottom+l,left:w.left+l});const T=Sc(h),S=kc(x,T.w,T.h),C=Math.max(1,Math.ceil((T.w+w.left+w.right)*y)),I=Math.max(1,Math.ceil((T.h+w.top+w.bottom)*y));k=document.createElement("canvas"),k.width=C,k.height=I;const v=k.getContext("2d");if(v){v.imageSmoothingEnabled=false;const P=ho(x,e.renderer,e.ctors,t,n),E=(w.left-S.baseX)*y,F=(w.top-S.baseY)*y;v.drawImage(P,E,F,P.width*y,P.height*y);}}return p&&i&&s?.enabled?($m(i,s,p,k),ss(k)):k}function Xm(e){for(const t of Array.from(e.live))t.__mgDestroy?.();}function Km(e,t){return e.defaultParent=t,true}function Ym(e,t){return e.defaultParent=t,true}function zt(){if(!oc())throw new Error("MGSprite not ready yet")}function qm(e,t,n){return typeof t=="string"?ls(De(),on(),Hn(),e,t,n||{}):ls(De(),on(),Hn(),null,e,t||{})}function Jm(e,t,n){return typeof t=="string"?ua(De(),on(),Hn(),e,t,n||{},Wn(),da()):ua(De(),on(),Hn(),null,e,t||{},Wn(),da())}function Qm(){Xm(De());}function Zm(e){return Km(De(),e)}function eh(e){return Ym(De(),e)}function th(e,t){const n=De(),r=typeof t=="string"?Un(e,t,n.textures,n.animations):Un(null,e,n.textures,n.animations);return n.textures.has(r)||n.animations.has(r)}function nh(){zt();const e=De().categoryIndex;return e?Array.from(e.keys()).sort((t,n)=>t.localeCompare(n)):[]}function rh(e){zt();const t=String(e||"").trim();if(!t)return [];const n=De().categoryIndex;return n?Array.from(n.get(t)?.values()||[]):[]}function oh(e,t){zt();const n=String(e||"").trim(),r=String(t||"").trim();if(!n||!r)return  false;const o=De().categoryIndex;if(!o)return  false;const a=n.toLowerCase(),i=r.toLowerCase();for(const[s,c]of o.entries())if(s.toLowerCase()===a){for(const d of c.values())if(d.toLowerCase()===i)return  true}return  false}function ah(e){zt();const t=De().categoryIndex;if(!t)return [];const n=String(e||"").trim().toLowerCase(),r=[];for(const[o,a]of t.entries())for(const i of a.values()){const s=qn(o,i);(!n||s.toLowerCase().startsWith(n))&&r.push(s);}return r.sort((o,a)=>o.localeCompare(a))}function ih(e){zt();const t=String(e||"").trim();if(!t)return null;const n=no(t),r=/^sprite\/([^/]+)\/(.+)$/.exec(n);if(!r)return null;const o=r[1],a=r[2],i=De().categoryIndex,s=o.toLowerCase(),c=a.toLowerCase();let d=o,l=a;if(i){const u=Array.from(i.keys()).find(g=>g.toLowerCase()===s);if(!u)return null;d=u;const p=i.get(u);if(!p)return null;const f=Array.from(p.values()).find(g=>g.toLowerCase()===c);if(!f)return null;l=f;}return {category:d,id:l,key:qn(d,l)}}function sh(e,t){zt();const n=String(e||"").trim(),r=String(t||"").trim();if(!n||!r)throw new Error("getIdPath(category, id) requires both category and id");const o=De().categoryIndex;if(!o)throw new Error("Sprite categories not indexed");const a=n.toLowerCase(),i=r.toLowerCase(),s=Array.from(o.keys()).find(l=>l.toLowerCase()===a)||n,c=o.get(s);if(!c)throw new Error(`Unknown sprite category: ${n}`);const d=Array.from(c.values()).find(l=>l.toLowerCase()===i)||r;if(!c.has(d))throw new Error(`Unknown sprite id: ${n}/${r}`);return qn(s,d)}function lh(){Em(on());}function ch(){Dm(Wn());}function dh(){return zm(Wn())}function uh(){return [...lc]}async function ph(e,t,n=10,r=0){return zt(),jm(e,De(),on(),Hn(),Wn(),da(),t,n,r)}const V={init:lm,isReady:oc,show:qm,toCanvas:Jm,clear:Qm,attach:Zm,attachProvider:eh,has:th,key:(e,t)=>qn(e,t),getCategories:nh,getCategoryId:rh,hasId:oh,listIds:ah,getIdInfo:ih,getIdPath:sh,clearMutationCache:lh,clearToCanvasCache:ch,getToCanvasCacheStats:dh,getMutationNames:uh,warmup:ph};function fh(){return {ready:false,xform:null,xformAt:0}}const qe=fh();function Cc(){return qe.ready}function pn(e){try{if(typeof structuredClone=="function")return structuredClone(e)}catch{}try{return JSON.parse(JSON.stringify(e))}catch{}return e}function Jn(){return Ye.tos()}function ci(){return Ye.engine()}function gh(){const e=Jn()?.map?.cols;return Number.isFinite(e)&&e>0?e:null}function di(e,t){const n=gh();return n?t*n+e|0:null}let hr=null;async function mh(e=15e3){return qe.ready?true:hr||(hr=(async()=>{if(await Ye.init(e),!Jn())throw new Error("MGTile: engine captured but tileObject system not found");return qe.ready=true,true})(),hr)}function Lt(e,t,n=true){const r=Jn(),o=di(e,t);if(!r||o==null)return {gidx:null,tv:null};let a=r.tileViews?.get?.(o)||null;if(!a&&n&&typeof r.getOrCreateTileView=="function")try{a=r.getOrCreateTileView(o);}catch{}return {gidx:o,tv:a||null}}function Fo(e,t){if("startTime"in t&&(e.startTime=Number(t.startTime)),"endTime"in t&&(e.endTime=Number(t.endTime)),"targetScale"in t&&(e.targetScale=Number(t.targetScale)),"mutations"in t){if(!Array.isArray(t.mutations))throw new Error("MGTile: mutations must be an array of strings");e.mutations=t.mutations.slice();}}function ui(e,t){if(!e)throw new Error("MGTile: no tileObject on this tile");if(e.objectType!==t)throw new Error(`MGTile: expected objectType "${t}", got "${e.objectType}"`)}function Jt(e,t,n,r={}){const o=r.ensureView!==false,a=r.forceUpdate!==false,i=ci(),{gidx:s,tv:c}=Lt(Number(e),Number(t),o);if(s==null)throw new Error("MGTile: cols unavailable (engine/TOS not ready)");if(!c)throw new Error("MGTile: TileView unavailable (not instantiated)");const d=c.tileObject;if(typeof c.onDataChanged!="function")throw new Error("MGTile: tileView.onDataChanged not found (different API?)");if(c.onDataChanged(n),a&&i?.reusableContext&&typeof c.update=="function")try{c.update(i.reusableContext);}catch{}return {ok:true,tx:Number(e),ty:Number(t),gidx:s,before:d,after:c.tileObject}}function bo(e,t,n={}){const r=n.ensureView!==false,o=n.clone!==false,{gidx:a,tv:i}=Lt(Number(e),Number(t),r);if(a==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!i)return {tx:Number(e),ty:Number(t),gidx:a,tileView:null,tileObject:void 0};const s=i.tileObject;return {tx:Number(e),ty:Number(t),gidx:a,tileView:i,tileObject:o?pn(s):s}}function hh(e,t,n={}){return Jt(e,t,null,n)}function bh(e,t,n,r={}){const a=bo(e,t,{...r,clone:false}).tileView?.tileObject;ui(a,"plant");const i=pn(a);if(Array.isArray(i.slots)||(i.slots=[]),"plantedAt"in n&&(i.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(i.maturedAt=Number(n.maturedAt)),"species"in n&&(i.species=String(n.species)),"slotIdx"in n&&"slotPatch"in n){const s=Number(n.slotIdx)|0;if(!i.slots[s])throw new Error(`MGTile: plant slot ${s} doesn't exist`);return Fo(i.slots[s],n.slotPatch),Jt(e,t,i,r)}if("slots"in n){const s=n.slots;if(Array.isArray(s)){for(let c=0;c<s.length;c++)if(s[c]!=null){if(!i.slots[c])throw new Error(`MGTile: plant slot ${c} doesn't exist`);Fo(i.slots[c],s[c]);}}else if(s&&typeof s=="object")for(const c of Object.keys(s)){const d=Number(c)|0;if(Number.isFinite(d)){if(!i.slots[d])throw new Error(`MGTile: plant slot ${d} doesn't exist`);Fo(i.slots[d],s[d]);}}else throw new Error("MGTile: patch.slots must be array or object map");return Jt(e,t,i,r)}return Jt(e,t,i,r)}function xh(e,t,n,r={}){const a=bo(e,t,{...r,clone:false}).tileView?.tileObject;ui(a,"decor");const i=pn(a);return "rotation"in n&&(i.rotation=Number(n.rotation)),Jt(e,t,i,r)}function yh(e,t,n,r={}){const a=bo(e,t,{...r,clone:false}).tileView?.tileObject;ui(a,"egg");const i=pn(a);return "plantedAt"in n&&(i.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(i.maturedAt=Number(n.maturedAt)),Jt(e,t,i,r)}function vh(e,t,n,r={}){const o=r.ensureView!==false,a=r.forceUpdate!==false,i=ci(),{gidx:s,tv:c}=Lt(Number(e),Number(t),o);if(s==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!c)throw new Error("MGTile: TileView unavailable");const d=c.tileObject,l=typeof n=="function"?n(pn(d)):n;if(c.onDataChanged(l),a&&i?.reusableContext&&typeof c.update=="function")try{c.update(i.reusableContext);}catch{}return {ok:true,tx:Number(e),ty:Number(t),gidx:s,before:d,after:c.tileObject}}function wh(e,t,n={}){const r=n.ensureView!==false,{gidx:o,tv:a}=Lt(Number(e),Number(t),r);if(o==null)throw new Error("MGTile: cols unavailable");if(!a)return {ok:true,tx:Number(e),ty:Number(t),gidx:o,tv:null,tileObject:void 0};const i=n.clone!==false,s=a.tileObject;return {ok:true,tx:Number(e),ty:Number(t),gidx:o,objectType:s?.objectType??null,tileObject:i?pn(s):s,tvKeys:Object.keys(a||{}).sort(),tileView:a}}function No(e){if(!e)return null;const t=o=>o&&(typeof o.getGlobalPosition=="function"||typeof o.toGlobal=="function"),n=["container","root","view","tile","ground","base","floor","bg","background","baseSprite","tileSprite","displayObject","gfx","graphics","sprite"];for(const o of n)if(t(e[o]))return e[o];if(t(e))return e;const r=[e.container,e.root,e.view,e.displayObject,e.tileSprite,e.gfx,e.graphics,e.sprite];for(const o of r)if(t(o))return o;try{for(const o of Object.keys(e))if(t(e[o]))return e[o]}catch{}return null}function jr(e){const t=rt(()=>e?.getGlobalPosition?.());if(t&&Number.isFinite(t.x)&&Number.isFinite(t.y))return {x:t.x,y:t.y};const n=rt(()=>e?.toGlobal?.({x:0,y:0}));return n&&Number.isFinite(n.x)&&Number.isFinite(n.y)?{x:n.x,y:n.y}:null}function Sh(e){try{if(!e?.getBounds)return "center";const t=e.getBounds(),n=jr(e);if(!n||!t||!Number.isFinite(t.width)||!Number.isFinite(t.height))return "center";const r=t.x+t.width/2,o=t.y+t.height/2;return Math.hypot(n.x-r,n.y-o)<Math.hypot(n.x-t.x,n.y-t.y)?"center":"topleft"}catch{return "center"}}function kh(){const e=Jn(),t=e?.map?.cols,n=e?.map?.rows;if(!e||!Number.isFinite(t)||t<=1)return null;const r=Number.isFinite(n)&&n>1?n:null,o=[[0,0],[1,1],[Math.min(2,t-2),0],[0,1]];r&&r>2&&o.push([Math.floor(t/2),Math.floor(r/2)]);for(const[a,i]of o){if(a<0||i<0||a>=t||r&&i>=r)continue;const s=Lt(a,i,true).tv,c=a+1<t?Lt(a+1,i,true).tv:null,d=Lt(a,i+1,true).tv,l=No(s),u=No(c),p=No(d);if(!l||!u||!p)continue;const f=jr(l),g=jr(u),b=jr(p);if(!f||!g||!b)continue;const h={x:g.x-f.x,y:g.y-f.y},x={x:b.x-f.x,y:b.y-f.y},k=h.x*x.y-h.y*x.x;if(!Number.isFinite(k)||Math.abs(k)<1e-6)continue;const y=1/k,w={a:x.y*y,b:-x.x*y,c:-h.y*y,d:h.x*y},T={x:f.x-a*h.x-i*x.x,y:f.y-a*h.y-i*x.y},S=Sh(l),C=S==="center"?T:{x:T.x+.5*(h.x+x.x),y:T.y+.5*(h.y+x.y)};return {ok:true,cols:t,rows:r,vx:h,vy:x,inv:w,anchorMode:S,originCenter:C}}return null}function Tc(){return qe.xform=kh(),qe.xformAt=Date.now(),{ok:!!qe.xform?.ok,xform:qe.xform}}function Ch(e,t={}){if(!e||!Number.isFinite(e.x)||!Number.isFinite(e.y))return null;const n=Number.isFinite(t.maxAgeMs)?Number(t.maxAgeMs):1500;(!qe.xform?.ok||t.forceRebuild||Date.now()-qe.xformAt>n)&&Tc();const r=qe.xform;if(!r?.ok)return null;const o=e.x-r.originCenter.x,a=e.y-r.originCenter.y,i=r.inv.a*o+r.inv.b*a,s=r.inv.c*o+r.inv.d*a,c=Math.floor(i),d=Math.floor(s),l=[[c,d],[c+1,d],[c,d+1],[c+1,d+1]];let u=null,p=1/0;for(const[f,g]of l){if(f<0||g<0||f>=r.cols||Number.isFinite(r.rows)&&r.rows!==null&&g>=r.rows)continue;const b=r.originCenter.x+f*r.vx.x+g*r.vy.x,h=r.originCenter.y+f*r.vx.y+g*r.vy.y,x=(e.x-b)**2+(e.y-h)**2;x<p&&(p=x,u={tx:f,ty:g,fx:i,fy:s,x:e.x,y:e.y,gidx:null});}return u?(u.gidx=di(u.tx,u.ty),u):null}function Th(e,t){const n=qe.xform;return n?.ok?{x:n.originCenter.x+e*n.vx.x+t*n.vy.x,y:n.originCenter.y+e*n.vx.y+t*n.vy.y}:null}function Qe(){if(!Cc())throw new Error("MGTile: not ready. Call MGTile.init() first.")}function Ph(){return ["MGTile.init()","MGTile.hook()","MGTile.getTileObject(tx,ty) / inspect(tx,ty)","MGTile.setTileEmpty(tx,ty)","MGTile.setTilePlant(tx,ty,{...}) / setTileDecor / setTileEgg","MGTile.setTileObjectRaw(tx,ty,objOrFn)","MGTile.rebuildTransform() / pointToTile({x,y})","MGTile.tileToPoint(tx,ty)"].join(`
`)}const Je={init:mh,isReady:Cc,hook:Ye.hook,engine:ci,tos:Jn,gidx:(e,t)=>di(Number(e),Number(t)),getTileObject:(e,t,n={})=>(Qe(),bo(e,t,n)),inspect:(e,t,n={})=>(Qe(),wh(e,t,n)),setTileEmpty:(e,t,n={})=>(Qe(),hh(e,t,n)),setTilePlant:(e,t,n,r={})=>(Qe(),bh(e,t,n,r)),setTileDecor:(e,t,n,r={})=>(Qe(),xh(e,t,n,r)),setTileEgg:(e,t,n,r={})=>(Qe(),yh(e,t,n,r)),setTileObjectRaw:(e,t,n,r={})=>(Qe(),vh(e,t,n,r)),rebuildTransform:()=>(Qe(),Tc()),pointToTile:(e,t={})=>(Qe(),Ch(e,t)),tileToPoint:(e,t)=>(Qe(),Th(e,t)),getTransform:()=>(Qe(),qe.xform),help:Ph};function Ah(){return {ready:false,app:null,renderer:null,stage:null,ticker:null,tileSets:new Map,highlights:new Map,watches:new Map,fades:new Map,fadeWatches:new Map}}const q=Ah();function Pc(){return q.ready}async function Ih(e=15e3){if(q.ready)return pa(),true;if(await Ye.init(e),q.app=Ye.app(),q.ticker=Ye.ticker(),q.renderer=Ye.renderer(),q.stage=Ye.stage(),!q.app||!q.ticker)throw new Error("MGPixi: PIXI app/ticker not found");return q.ready=true,pa(),true}function pa(){const e=O;return e.$PIXI=e.PIXI||null,e.$app=q.app||null,e.$renderer=q.renderer||null,e.$stage=q.stage||null,e.$ticker=q.ticker||null,e.__MG_PIXI__={PIXI:e.$PIXI,app:e.$app,renderer:e.$renderer,stage:e.$stage,ticker:e.$ticker,ready:q.ready},e.__MG_PIXI__}function pi(e){return !!e&&typeof e=="object"&&!Array.isArray(e)}function fa(e){return !!(e&&typeof e.getBounds=="function"&&("parent"in e||"children"in e))}function oo(e){return !!(e&&typeof e.tint=="number")}function Nt(e){return !!(e&&typeof e.alpha=="number")}function Hr(e,t,n){return e+(t-e)*n}function _h(e,t,n){const r=e>>16&255,o=e>>8&255,a=e&255,i=t>>16&255,s=t>>8&255,c=t&255,d=Hr(r,i,n)|0,l=Hr(o,s,n)|0,u=Hr(a,c,n)|0;return d<<16|l<<8|u}function Eh(e,t=900){const n=[],r=[e];for(;r.length&&n.length<t;){const o=r.pop();if(!o)continue;oo(o)&&n.push(o);const a=o.children;if(Array.isArray(a))for(let i=a.length-1;i>=0;i--)r.push(a[i]);}return n}function Mh(e,t=25e3){const n=[],r=[e];let o=0;for(;r.length&&o++<t;){const a=r.pop();if(!a)continue;Nt(a)&&n.push(a);const i=a.children;if(Array.isArray(i))for(let s=i.length-1;s>=0;s--)r.push(i[s]);}return n}const Lh=["plantVisual","cropVisual","slotVisual","slotView","displayObject","view","container","root","sprite","gfx","graphics"];function ga(e){if(!e)return null;if(fa(e))return e;if(!pi(e))return null;for(const t of Lh){const n=e[t];if(fa(n))return n}return null}function Rh(e,t){const n=[{o:e,d:0}],r=new Set,o=6;for(;n.length;){const{o:a,d:i}=n.shift();if(!(!a||i>o)&&!r.has(a)){if(r.add(a),Array.isArray(a)){if(a.length===t){const s=new Array(t);let c=true;for(let d=0;d<t;d++){const l=ga(a[d]);if(!l){c=false;break}s[d]=l;}if(c)return s}for(const s of a)n.push({o:s,d:i+1});continue}if(pi(a)){const s=a;for(const c of Object.keys(s))n.push({o:s[c],d:i+1});}}}return null}function Ac(e){if(!Array.isArray(e))return [];const t=new Set,n=[];for(const r of e){let o,a;if(Array.isArray(r))o=r[0],a=r[1];else if(pi(r))o=r.x??r.tx,a=r.y??r.ty;else continue;if(o=Number(o),a=Number(a),!Number.isFinite(o)||!Number.isFinite(a))continue;o|=0,a|=0;const i=`${o},${a}`;t.has(i)||(t.add(i),n.push({x:o,y:a}));}return n}function Fh(e,t){const n=String(e||"").trim();if(!n)throw new Error("MGPixi.defineTileSet: empty name");const r=Ac(t);return q.tileSets.set(n,r),{ok:true,name:n,count:r.length}}function Nh(e){return q.tileSets.delete(String(e||"").trim())}function Oh(){return Array.from(q.tileSets.keys()).sort((e,t)=>e.localeCompare(t))}function Ic(e){return !!(e&&(e.tileSet!=null||Array.isArray(e.tiles)))}function fi(e){const n=Je.tos?.()?.tileViews;if(!n?.entries)throw new Error("MGPixi: TOS.tileViews not found");if(!Ic(e))return {entries:Array.from(n.entries()),gidxSet:null};let r=[];if(e.tileSet!=null){const a=String(e.tileSet||"").trim(),i=q.tileSets.get(a);if(!i)throw new Error(`MGPixi: tileSet not found "${a}"`);r=i;}else r=Ac(e.tiles||[]);const o=new Map;for(const a of r){const i=Je.getTileObject(a.x,a.y,{ensureView:true,clone:false});i?.tileView&&i.gidx!=null&&o.set(i.gidx,i.tileView);}return {entries:Array.from(o.entries()),gidxSet:new Set(o.keys())}}function gi(e){const t=q.highlights.get(e);if(!t)return  false;rt(()=>q.ticker?.remove(t.tick)),t.root&&t.baseAlpha!=null&&Nt(t.root)&&rt(()=>{t.root.alpha=t.baseAlpha;});for(const n of t.tint)n.o&&oo(n.o)&&rt(()=>{n.o.tint=n.baseTint;});return q.highlights.delete(e),true}function _c(e=null){for(const t of Array.from(q.highlights.keys()))e&&!String(t).startsWith(e)||gi(t);return  true}function Ec(e,t={}){if(!fa(e))throw new Error("MGPixi.highlightPulse: invalid root");const n=String(t.key||`hl:${Math.random().toString(16).slice(2)}`);if(q.highlights.has(n))return n;const r=Nt(e)?Number(e.alpha):null,o=ut(Number(t.minAlpha??.12),0,1),a=ut(Number(t.maxAlpha??1),0,1),i=Number(t.speed??1.25),s=(t.tint??8386303)>>>0,c=ut(Number(t.tintMix??.85),0,1),d=t.deepTint!==false,l=[];if(d)for(const f of Eh(e))l.push({o:f,baseTint:f.tint});else oo(e)&&l.push({o:e,baseTint:e.tint});const u=performance.now(),p=()=>{const f=(performance.now()-u)/1e3,g=(Math.sin(f*Math.PI*2*i)+1)/2,b=g*g*(3-2*g);r!=null&&Nt(e)&&(e.alpha=ut(Hr(o,a,b)*r,0,1));const h=b*c;for(const x of l)x.o&&oo(x.o)&&(x.o.tint=_h(x.baseTint,s,h));};return q.ticker?.add(p),q.highlights.set(n,{root:e,tick:p,baseAlpha:r,tint:l}),n}function Bh(e,t){const n=e?.mutations;if(!Array.isArray(n))return  false;for(const r of n)if(String(r||"").toLowerCase()===t)return  true;return  false}function Mc(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.highlightMutation: empty mutation");const{entries:r,gidxSet:o}=fi(t),a=`hlmut:${n}:`;if(t.clear===true)if(!o)_c(a);else for(const u of Array.from(q.highlights.keys())){if(!u.startsWith(a))continue;const p=u.split(":"),f=Number(p[2]);o.has(f)&&gi(u);}const i={tint:(t.tint??8386303)>>>0,minAlpha:Number(t.minAlpha??.12),maxAlpha:Number(t.maxAlpha??1),speed:Number(t.speed??1.25),tintMix:Number(t.tintMix??.85),deepTint:t.deepTint!==false};let s=0,c=0,d=0,l=0;for(const[u,p]of r){const f=p?.tileObject;if(!f||f.objectType!=="plant")continue;const g=f.slots;if(!Array.isArray(g)||g.length===0)continue;let b=false;const h=[];for(let y=0;y<g.length;y++)Bh(g[y],n)&&(h.push(y),b=true);if(!b)continue;s++,c+=h.length;const x=p?.childView?.plantVisual||p?.childView||p,k=Rh(x,g.length);if(!k){l+=h.length;continue}for(const y of h){const w=k[y];if(!w){l++;continue}const T=`${a}${u}:${y}`;q.highlights.has(T)||(Ec(w,{key:T,...i}),d++);}}return {ok:true,mutation:n,filtered:!!o,plantsMatched:s,matchedSlots:c,newHighlights:d,failedSlots:l}}function $h(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchMutation: empty mutation");const r=`watchmut:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,o=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,a=q.watches.get(r);a&&clearInterval(a);const i=setInterval(()=>{rt(()=>Mc(n,{...t,clear:!1}));},o);return q.watches.set(r,i),{ok:true,key:r,mutation:n,intervalMs:o}}function Dh(e){const t=String(e||"").trim();if(!t)return  false;if(!t.startsWith("watchmut:")){const r=t.toLowerCase();let o=0;for(const[a,i]of Array.from(q.watches.entries()))a.startsWith(`watchmut:${r}:`)&&(clearInterval(i),q.watches.delete(a),o++);return o>0}const n=q.watches.get(t);return n?(clearInterval(n),q.watches.delete(t),true):false}function zh(e){const t=e?.childView?.plantVisual||e?.childView?.cropVisual||e?.childView||e?.displayObject||e;return ga(t)||ga(e?.displayObject)||null}function Lc(e){const t=q.fades.get(e);if(!t)return  false;for(const n of t.targets)n.o&&Nt(n.o)&&Number.isFinite(n.baseAlpha)&&rt(()=>{n.o.alpha=n.baseAlpha;});return q.fades.delete(e),true}function ma(e=null){for(const t of Array.from(q.fades.keys()))e&&!String(t).startsWith(e)||Lc(t);return  true}function Rc(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.clearSpeciesFade: empty species");const r=`fade:${n}:`;if(!Ic(t))return ma(r);const{gidxSet:o}=fi(t);if(!o)return ma(r);for(const a of Array.from(q.fades.keys())){if(!a.startsWith(r))continue;const i=Number(a.slice(r.length));o.has(i)&&Lc(a);}return  true}function Fc(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.fadeSpecies: empty species");const r=ut(Number(t.alpha??.2),0,1),o=t.deep===true,{entries:a,gidxSet:i}=fi(t),s=`fade:${n}:`;t.clear===true&&Rc(n,t);let c=0,d=0,l=0,u=0;for(const[p,f]of a){const g=f?.tileObject;if(!g||g.objectType!=="plant")continue;c++;const b=String(g.species||"").trim().toLowerCase();if(!b||b!==n)continue;d++;const h=zh(f);if(!h||!Nt(h)){u++;continue}const x=`${s}${p}`;if(q.fades.has(x)){rt(()=>{h.alpha=r;}),l++;continue}const k=o?Mh(h):[h],y=[];for(const w of k)Nt(w)&&y.push({o:w,baseAlpha:Number(w.alpha)});for(const w of y)rt(()=>{w.o.alpha=r;});q.fades.set(x,{targets:y}),l++;}return {ok:true,species:n,alpha:r,deep:o,filtered:!!i,plantsSeen:c,matchedPlants:d,applied:l,failed:u,totalFades:q.fades.size}}function Gh(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchFadeSpecies: empty species");const r=`watchfade:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,o=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,a=q.fadeWatches.get(r);a&&clearInterval(a);const i=setInterval(()=>{rt(()=>Fc(n,{...t,clear:!1}));},o);return q.fadeWatches.set(r,i),{ok:true,key:r,species:n,intervalMs:o}}function jh(e){const t=String(e||"").trim();if(!t)return  false;if(!t.startsWith("watchfade:")){const r=t.toLowerCase();let o=0;for(const[a,i]of Array.from(q.fadeWatches.entries()))a.startsWith(`watchfade:${r}:`)&&(clearInterval(i),q.fadeWatches.delete(a),o++);return o>0}const n=q.fadeWatches.get(t);return n?(clearInterval(n),q.fadeWatches.delete(t),true):false}function Hh(e){const t=Array.isArray(e?.slots)?e.slots:[];return {objectType:"plant",species:e?.species??null,plantedAt:e?.plantedAt??null,maturedAt:e?.maturedAt??null,slotCount:t.length,slots:t.map((n,r)=>({idx:r,mutations:Array.isArray(n?.mutations)?n.mutations.slice():[]}))}}function Wh(e,t,n={}){const r=Number(e)|0,o=Number(t)|0,a=n.ensureView!==false,i=Je.getTileObject(r,o,{ensureView:a,clone:false}),s=i?.tileView||null,c=s?.tileObject,d={ok:true,tx:r,ty:o,gidx:i?.gidx??Je.gidx?.(r,o)??null,hasTileView:!!s,objectType:c?.objectType??null,tileObject:c??null,summary:c?.objectType==="plant"?Hh(c):c?{objectType:c.objectType??null}:null,display:s?s.childView?.plantVisual||s.childView||s.displayObject||s:null};return n.log!==false&&rt(()=>console.log("[MGPixi.inspectTile]",d)),d}function Uh(e,t,n){const r=O.PIXI;if(!r)return;let o=q.stage.getChildByName("gemini-overlay");o||(o=new r.Container,o.name="gemini-overlay",q.stage.addChild(o));const a=n.key;let i=o.getChildByName(a);i||(i=new r.Graphics,i.name=a,o.addChild(i));const s=Je.tileToPoint(e,t);if(!s)return;i.clear(),i.lineStyle(2,n.tint??65280,n.alpha??1),i.beginFill(n.tint??65280,(n.alpha??1)*.2);const c=Je.getTransform(),d=c?Math.hypot(c.vx.x,c.vx.y):32,l=c?Math.hypot(c.vy.x,c.vy.y):32;i.drawRect(0,0,d,l),i.endFill(),i.x=s.x,i.y=s.y,c&&(i.rotation=Math.atan2(c.vx.y,c.vx.x));}function Vh(e){const t=q.stage?.getChildByName("gemini-overlay");if(!t)return  false;const n=t.getChildByName(e);return n?(t.removeChild(n),n.destroy?.(),true):false}function Pe(){if(!Pc())throw new Error("MGPixi: call MGPixi.init() first")}const sn={init:Ih,isReady:Pc,expose:pa,get app(){return q.app},get renderer(){return q.renderer},get stage(){return q.stage},get ticker(){return q.ticker},get PIXI(){return O.PIXI||null},defineTileSet:(e,t)=>(Pe(),Fh(e,t)),deleteTileSet:e=>(Pe(),Nh(e)),listTileSets:()=>(Pe(),Oh()),highlightPulse:(e,t)=>(Pe(),Ec(e,t)),stopHighlight:e=>(Pe(),gi(e)),clearHighlights:e=>(Pe(),_c(e)),drawOverlayBox:(e,t,n)=>(Pe(),Uh(e,t,n)),stopOverlay:e=>(Pe(),Vh(e)),highlightMutation:(e,t)=>(Pe(),Mc(e,t)),watchMutation:(e,t)=>(Pe(),$h(e,t)),stopWatchMutation:e=>(Pe(),Dh(e)),inspectTile:(e,t,n)=>(Pe(),Wh(e,t,n)),fadeSpecies:(e,t)=>(Pe(),Fc(e,t)),clearSpeciesFade:(e,t)=>(Pe(),Rc(e,t)),clearFades:e=>(Pe(),ma(e)),watchFadeSpecies:(e,t)=>(Pe(),Gh(e,t)),stopWatchFadeSpecies:e=>(Pe(),jh(e))};function Xh(){return {ready:false,baseUrl:null,urls:{ambience:new Map,music:new Map},sfx:{mp3Url:null,atlasUrl:null,atlas:null,groups:new Map,buffer:null},tracks:{ambience:null,music:null},ctx:null}}const Z=Xh();function Nc(){return Z.ready}const ds=O??window;async function Oc(){const e=Z.ctx;if(e)return e;const t=ds.AudioContext||ds.webkitAudioContext;if(!t)throw new Error("WebAudio not supported");const n=new t;return Z.ctx=n,n}async function Bc(){if(Z.ctx&&Z.ctx.state==="suspended")try{await Z.ctx.resume();}catch{}}const Kh={sfx:"soundEffectsVolume",music:"musicVolume",ambience:"ambienceVolume"},Yh={sfx:"soundEffectsVolumeAtom",music:"musicVolumeAtom",ambience:"ambienceVolumeAtom"},Rn=.001,Fn=.2;function us(e,t=NaN){try{const n=localStorage.getItem(e);if(n==null)return t;let r;try{r=JSON.parse(n);}catch{r=n;}if(typeof r=="number"&&Number.isFinite(r))return r;if(typeof r=="string"){const o=parseFloat(r);if(Number.isFinite(o))return o}}catch{}return t}function Vn(e){const t=Kh[e],n=Yh[e];if(!t)return {atom:Fn,vol100:br(Fn)};const r=us(t,NaN);if(Number.isFinite(r)){const a=ut(r,0,1);return {atom:a,vol100:br(a)}}if(n){const a=us(n,NaN);if(Number.isFinite(a)){const i=ut(a,0,1);return {atom:i,vol100:br(i)}}}const o=Fn;return {atom:o,vol100:br(o)}}function qh(e){const t=Number(e);if(!Number.isFinite(t))return null;if(t<=0)return 0;const r=(ut(t,1,100)-1)/99;return Rn+r*(Fn-Rn)}function br(e){const t=ut(Number(e),0,1);if(t<=Rn)return 0;const n=(t-Rn)/(Fn-Rn);return Math.round(1+n*99)}function $c(e,t){if(t==null)return Vn(e).atom;const n=qh(t);return n===null?Vn(e).atom:Np(n)}function Jh(e){const t=new Map,n=(r,o)=>{t.has(r)||t.set(r,[]),t.get(r).push(o);};for(const r of Object.keys(e||{})){const o=/^(.*)_([A-Z])$/.exec(r);o?.[1]?n(o[1],r):n(r,r);}for(const[r,o]of Array.from(t.entries()))o.sort((a,i)=>a.localeCompare(i)),t.set(r,o);Z.sfx.groups=t;}function Qh(e){const t=Z.sfx.atlas;if(!t)throw new Error("SFX atlas not loaded");if(t[e])return e;const n=Z.sfx.groups.get(e);if(n?.length)return n[Math.random()*n.length|0];throw new Error(`Unknown sfx/group: ${e}`)}async function Zh(){if(Z.sfx.buffer)return Z.sfx.buffer;if(!Z.sfx.mp3Url)throw new Error("SFX mp3 url missing");const e=await Oc();await Bc();const n=await(await Il(Z.sfx.mp3Url)).arrayBuffer(),r=await new Promise((o,a)=>{const i=e.decodeAudioData(n,o,a);i?.then&&i.then(o,a);});return Z.sfx.buffer=r,r}async function eb(e,t={}){if(!Z.ready)throw new Error("MGAudio not ready yet");const n=String(e||"").trim();if(!n)throw new Error("Missing sfx name");const r=Qh(n),o=Z.sfx.atlas[r];if(!o)throw new Error(`Missing segment for sfx: ${r}`);const a=await Oc();await Bc();const i=await Zh(),s=Math.max(0,+o.start||0),c=Math.max(s,+o.end||s),d=Math.max(.01,c-s),l=$c("sfx",t.volume),u=a.createGain();u.gain.value=l,u.connect(a.destination);const p=a.createBufferSource();return p.buffer=i,p.connect(u),p.start(0,s,d),{name:r,source:p,start:s,end:c,duration:d,volume:l}}let xr=null;async function tb(){return Z.ready?true:xr||(xr=(async()=>{Z.baseUrl=await $t.base();const e=await bt.load({baseUrl:Z.baseUrl}),t=bt.getBundle(e,"audio");if(!t)throw new Error("No audio bundle in manifest");for(const n of t.assets||[])for(const r of n.src||[]){if(typeof r!="string")continue;const o=/^audio\/(ambience|music)\/(.+)\.mp3$/i.exec(r);if(o){const a=o[1].toLowerCase(),i=o[2];Z.urls[a].set(i,ht(Z.baseUrl,r));continue}/^audio\/sfx\/sfx\.mp3$/i.test(r)&&(Z.sfx.mp3Url=ht(Z.baseUrl,r)),/^audio\/sfx\/sfx\.json$/i.test(r)&&(Z.sfx.atlasUrl=ht(Z.baseUrl,r));}if(!Z.sfx.atlasUrl)throw new Error("Missing audio/sfx/sfx.json in manifest");return Z.sfx.atlas=await Ya(Z.sfx.atlasUrl),Jh(Z.sfx.atlas),Z.ready=true,true})(),xr)}function Dc(e){if(e!=="music"&&e!=="ambience")return  false;const t=Z.tracks[e];if(t){try{t.pause();}catch{}try{t.src="";}catch{}}return Z.tracks[e]=null,true}function nb(e,t,n={}){if(!Z.ready)throw new Error("MGAudio not ready yet");if(e!=="music"&&e!=="ambience")throw new Error(`Invalid category: ${e}`);const r=Z.urls[e].get(t);if(!r)throw new Error(`Unknown ${e}: ${t}`);Dc(e);const o=new Audio(r);return o.loop=!!n.loop,o.volume=$c(e,n.volume),o.preload="auto",o.play().catch(()=>{}),Z.tracks[e]=o,o}function rb(e,t={}){const n=String(e||"").trim();return n==="music"||n==="ambience"?Array.from(Z.urls[n].keys()).sort():n==="sfx"?Z.sfx.atlas?t.groups?Array.from(Z.sfx.groups.keys()).sort():Object.keys(Z.sfx.atlas).sort():[]:[]}function ob(){return ["sfx","music","ambience"]}function ab(){return Array.from(Z.sfx.groups.keys()).sort((e,t)=>e.localeCompare(t))}function ib(e,t){const n=String(e||"").trim().toLowerCase(),r=String(t||"").trim();if(!r||n!=="music"&&n!=="ambience")return  false;const o=Z.urls[n],a=r.toLowerCase();for(const i of Array.from(o.keys()))if(i.toLowerCase()===a)return  true;return  false}function sb(e){const t=String(e||"").trim();if(!t)return  false;const n=t.toLowerCase();for(const r of Array.from(Z.sfx.groups.keys()))if(r.toLowerCase()===n)return  true;return  false}function lb(e,t){const n=String(e||"").trim().toLowerCase(),r=String(t||"").trim();if(!r)throw new Error("getTrackUrl(category, name) missing name");if(n!=="music"&&n!=="ambience")throw new Error(`Invalid category: ${e}`);const o=Z.urls[n],a=r.toLowerCase();for(const[i,s]of Array.from(o.entries()))if(i.toLowerCase()===a)return s;return null}function cb(){return Z.tracks.music&&(Z.tracks.music.volume=Vn("music").atom),Z.tracks.ambience&&(Z.tracks.ambience.volume=Vn("ambience").atom),true}function gt(){if(!Nc())throw new Error("MGAudio not ready yet")}async function db(e,t,n={}){const r=String(e||"").trim(),o=String(t||"").trim();if(!r||!o)throw new Error("play(category, asset) missing args");if(r==="sfx")return eb(o,n);if(r==="music"||r==="ambience")return nb(r,o,n);throw new Error(`Unknown category: ${r}`)}const mi={init:tb,isReady:Nc,play:db,stop:e=>(gt(),Dc(e)),list:(e,t)=>(gt(),rb(e,t)),refreshVolumes:()=>(gt(),cb()),categoryVolume:e=>(gt(),Vn(e)),getCategories:()=>(gt(),ob()),getGroups:()=>(gt(),ab()),hasTrack:(e,t)=>(gt(),ib(e,t)),hasGroup:e=>(gt(),sb(e)),getTrackUrl:(e,t)=>(gt(),lb(e,t))};function ub(){return {ready:false,baseUrl:null,byCat:new Map,byBase:new Map,overlay:null,live:new Set,defaultParent:null}}const be=ub();function zc(){return be.ready}let yr=null;async function pb(){return be.ready?true:yr||(yr=(async()=>{be.baseUrl=await $t.base();const e=await bt.load({baseUrl:be.baseUrl}),t=bt.getBundle(e,"cosmetic");if(!t)throw new Error("No 'cosmetic' bundle in manifest");be.byCat.clear(),be.byBase.clear();for(const n of t.assets||[])for(const r of n.src||[]){if(typeof r!="string"||!/^cosmetic\/.+\.png$/i.test(r))continue;const a=r.split("/").pop().replace(/\.png$/i,""),i=a.indexOf("_");if(i<0)continue;const s=a.slice(0,i),c=a.slice(i+1),d=ht(be.baseUrl,r);be.byBase.set(a,d),be.byCat.has(s)||be.byCat.set(s,new Map),be.byCat.get(s).set(c,d);}return be.ready=true,true})(),yr)}function ha(e){let t=String(e||"").trim();return t?(t=t.replace(/^cosmetic\//i,""),t=t.replace(/\.png$/i,""),t):""}function fb(e,t){if(t===void 0){const a=ha(e),i=a.indexOf("_");return i<0?{cat:"",asset:a,base:a}:{cat:a.slice(0,i),asset:a.slice(i+1),base:a}}const n=String(e||"").trim(),r=ha(t),o=r.includes("_")?r:`${n}_${r}`;if(r.includes("_")&&!n){const a=r.indexOf("_");return {cat:r.slice(0,a),asset:r.slice(a+1),base:r}}return {cat:n,asset:r.replace(/^.+?_/,""),base:o}}function gb(){return Array.from(be.byCat.keys()).sort((e,t)=>e.localeCompare(t))}function mb(e){const t=be.byCat.get(String(e||"").trim());return t?Array.from(t.keys()).sort((n,r)=>n.localeCompare(r)):[]}function ba(e,t){const{cat:n,asset:r,base:o}=fb(e,t),a=be.byBase.get(o);if(a)return a;const s=be.byCat.get(n)?.get(r);if(s)return s;if(!be.baseUrl)throw new Error("MGCosmetic not initialized");if(!o)throw new Error("Invalid cosmetic name");return ht(be.baseUrl,`cosmetic/${o}.png`)}const ps=O?.document??document;function hb(){if(be.overlay)return be.overlay;const e=ps.createElement("div");return e.id="MG_COSMETIC_OVERLAY",e.style.cssText=["position:fixed","left:0","top:0","width:100vw","height:100vh","pointer-events:none","z-index:99999999"].join(";"),ps.documentElement.appendChild(e),be.overlay=e,e}function bb(){const e=be.defaultParent;if(!e)return null;try{return typeof e=="function"?e():e}catch{return null}}function xb(e){return be.defaultParent=e,true}const yb=O?.document??document;function xa(e,t,n){if(!be.ready)throw new Error("MGCosmetic not ready yet");let r,o;typeof t=="object"&&t!==null?(r=t,o=void 0):typeof t=="string"?(o=t,r=n||{}):(o=void 0,r=n||{});const a=o!==void 0?ba(e,o):ba(e),i=yb.createElement("img");if(i.decoding="async",i.loading="eager",i.src=a,i.alt=r.alt!=null?String(r.alt):ha(o??e),r.className&&(i.className=String(r.className)),r.width!=null&&(i.style.width=String(r.width)),r.height!=null&&(i.style.height=String(r.height)),r.opacity!=null&&(i.style.opacity=String(r.opacity)),r.style&&typeof r.style=="object")for(const[s,c]of Object.entries(r.style))try{i.style[s]=String(c);}catch{}return i}function vb(e,t,n){let r,o;typeof t=="object"&&t!==null?(r=t,o=void 0):typeof t=="string"?(o=t,r=n||{}):(o=void 0,r=n||{});const a=r.parent||bb()||hb(),i=o!==void 0?xa(e,o,r):xa(e,r);if(a===be.overlay||r.center||r.x!=null||r.y!=null||r.absolute){i.style.position="absolute",i.style.pointerEvents="none",i.style.zIndex=String(r.zIndex??999999);const c=r.scale??1,d=r.rotation??0;if(r.center)i.style.left="50%",i.style.top="50%",i.style.transform=`translate(-50%, -50%) scale(${c}) rotate(${d}rad)`;else {const l=r.x??innerWidth/2,u=r.y??innerHeight/2;i.style.left=`${l}px`,i.style.top=`${u}px`,i.style.transform=`scale(${c}) rotate(${d}rad)`,r.anchor==="center"&&(i.style.transform=`translate(-50%, -50%) scale(${c}) rotate(${d}rad)`);}}return a.appendChild(i),be.live.add(i),i.__mgDestroy=()=>{try{i.remove();}catch{}be.live.delete(i);},i}function wb(){for(const e of Array.from(be.live))e.__mgDestroy?.();}function At(){if(!zc())throw new Error("MGCosmetic not ready yet")}const hi={init:pb,isReady:zc,categories:()=>(At(),gb()),list:e=>(At(),mb(e)),url:((e,t)=>(At(),ba(e,t))),create:((e,t,n)=>(At(),xa(e,t,n))),show:((e,t,n)=>(At(),vb(e,t,n))),attach:e=>(At(),xb(e)),clear:()=>(At(),wb())},Tn={Gold:25,Rainbow:50,Frozen:10,Chilled:5,Wet:2},Sb=new Set(["Gold","Rainbow"]),kb=new Set(["Frozen","Chilled","Wet"]);function Gc(e){let t=1,n=0,r=0;for(const o of e)o==="Gold"||o==="Rainbow"?o==="Rainbow"?t=Tn.Rainbow:t===1&&(t=Tn.Gold):o in Tn&&(n+=Tn[o],r++);return t*(1+n-r)}function Cb(e){return Tn[e]??null}function Tb(e){return Sb.has(e)}function Pb(e){return kb.has(e)}function Ab(e,t){const n=bi(e);if(!n)return 50;const r=n.maxScale;if(t<=1)return 50;if(t>=r)return 100;const o=(t-1)/(r-1);return Math.floor(50+50*o)}function Ib(e,t,n){const r=bi(e);if(!r)return 0;const o=r.baseSellPrice,a=Gc(n);return Math.round(o*t*a)}function _b(e,t,n){if(n>=t)return 100;if(n<=e)return 0;const r=t-e,o=n-e;return Math.floor(o/r*100)}function Eb(e,t){return t>=e}function bi(e){const t=oe.get("plants");if(!t)return null;const n=t[e];return n?.crop?{baseSellPrice:n.crop.baseSellPrice??0,maxScale:n.crop.maxScale??1,growTime:n.crop.growTime??0}:null}const jc=3600,Oo=80,Mb=100,Pn=30;function xo(e){return e/jc}function yo(e,t){const n=Qn(e);if(!n)return Oo;const r=n.maxScale;if(t<=1)return Oo;if(t>=r)return Mb;const o=(t-1)/(r-1);return Math.floor(Oo+20*o)}function vo(e,t,n){const r=Qn(e);if(!r)return n-Pn;const o=r.hoursToMature,a=t/jc,i=Pn/o,s=Math.min(i*a,Pn),c=n-Pn;return Math.floor(c+s)}function wo(e,t){const n=Qn(e);return n?t>=n.hoursToMature:false}function Hc(e){const t=Qn(e);return t?Pn/t.hoursToMature:0}function Lb(e,t,n){const r=t-e;return r<=0||n<=0?0:r/n}function Qn(e){const t=oe.get("pets");if(!t)return null;const n=t[e];return n?{hoursToMature:n.hoursToMature??0,maxScale:n.maxScale??1,abilities:n.abilities??[]}:null}function Rb(e,t){return t<=0?1:Math.min(1,e/t)}const Ce=3600,vr=80,ya=100,pt=30,Fb={Worm:30,Snail:60,Bee:15,Chicken:60,Bunny:45,Dragonfly:15,Pig:60,Cow:75,Turkey:60,SnowFox:45,Stoat:60,WhiteCaribou:75,Squirrel:30,Turtle:90,Goat:60,Butterfly:30,Peacock:60,Capybara:60};function Zn(e){const t=oe.get("pets");if(!t)return null;const n=t[e];return n?{hoursToMature:n.hoursToMature??0,maxScale:n.maxScale??1}:null}function Nb(e){return e/Ce}function er(e,t){const n=Zn(e);if(!n)return vr;const{maxScale:r}=n;if(t<=1)return vr;if(t>=r)return ya;const o=(t-1)/(r-1);return Math.floor(vr+(ya-vr)*o)}function Ob(e){return e-pt}function Bb(e){const t=Zn(e);return !t||t.hoursToMature<=0?0:pt/t.hoursToMature}function tr(e,t,n){const r=Zn(e);if(!r)return n-pt;const o=t/Ce,a=pt/r.hoursToMature,i=Math.min(a*o,pt),s=n-pt;return Math.floor(s+i)}function Wc(e,t,n){const r=Zn(e);if(!r)return 0;const o=n-pt,a=t-o;if(a<=0)return 0;const i=pt/r.hoursToMature;return i<=0?0:a/i*Ce}function xi(e,t,n,r,o=Ce){const i=Wc(e,n,r)-t;return i<=0?0:o<=0?1/0:i/o}function So(e,t,n,r=Ce){return xi(e,t,n,n,r)}function yi(e,t,n,r,o=Ce){if(n>=r)return 0;const a=n+1;return xi(e,t,a,r,o)}function $b(e,t){return e>=t}function Db(e,t){const n=t-pt,o=(e-n)/pt*100;return Math.min(100,Math.max(0,o))}const zb=Object.freeze(Object.defineProperty({__proto__:null,calculateAge:Nb,calculateCurrentStrength:tr,calculateHoursToMaxStrength:So,calculateHoursToNextStrength:yi,calculateHoursToStrength:xi,calculateMaxStrength:er,calculateStartingStrength:Ob,calculateStrengthPerHour:Bb,calculateStrengthProgress:Db,calculateXpForStrength:Wc,getSpeciesData:Zn,isPetMature:$b},Symbol.toStringTag,{value:"Module"}));function vi(e){const t=oe.get("pets");if(!t)return 100/24;const n=t[e];if(!n?.coinsToFullyReplenishHunger)return 100/24;const r=Fb[e];return r?n.coinsToFullyReplenishHunger/r*60:(console.warn(`[Feed] Unknown species "${e}", using 60min default`),n.coinsToFullyReplenishHunger/60*60)}function Gb(e,t){return e<=0?0:t<=0?1/0:e/t}function wi(e,t,n,r){if(e<=0||n<=0)return 0;const o=t/n;if(o>=e)return 0;const a=e-o,i=r/n;return Math.ceil(a/i)}function Si(e,t,n){const r=oe.get("pets");if(!r)return 0;const o=r[e];if(!o?.coinsToFullyReplenishHunger)return 0;const a=o.coinsToFullyReplenishHunger,i=vi(e);return wi(n,t,i,a)}function Xn(e,t,n){const r=oe.get("pets");if(!r)return 0;const o=r[e];if(!o?.coinsToFullyReplenishHunger)return 0;const a=o.coinsToFullyReplenishHunger,i=vi(e);return wi(n,t,i,a)}function ki(e,t,n,r,o,a){return e?t&&a>0?Xn(n,r,a):0:Xn(n,r,o)}const jb=Object.freeze(Object.defineProperty({__proto__:null,calculateAdjustedFeedsToMax:ki,calculateFeedsForDuration:wi,calculateFeedsToMaxStrength:Xn,calculateFeedsToNextStrength:Si,calculateHoursUntilStarving:Gb,getHungerDrainPerHour:vi},Symbol.toStringTag,{value:"Module"})),Uc={init(){},isReady(){return  true},crop:{calculateSize:Ab,calculateSellPrice:Ib,calculateProgress:_b,isReady:Eb,getData:bi},pet:{calculateAge:xo,calculateMaxStrength:yo,calculateCurrentStrength:vo,isMature:wo,calculateStrengthPerHour:Hc,getData:Qn},mutation:{calculateMultiplier:Gc,getValue:Cb,isGrowth:Tb,isEnvironmental:Pb},xp:zb,feed:jb};async function Vc(e){const t=[{name:"Data",init:()=>oe.init()},{name:"CustomModal",init:()=>qt.init()},{name:"Sprites",init:()=>V.init()},{name:"TileObjectSystem",init:()=>Je.init()},{name:"Pixi",init:()=>sn.init()},{name:"Audio",init:()=>mi.init()},{name:"Cosmetics",init:()=>hi.init()}];await Promise.all(t.map(async n=>{e?.({status:"start",name:n.name});try{await n.init(),e?.({status:"success",name:n.name});}catch(r){console.error(`[${n.name}] failed`,r),e?.({status:"error",name:n.name,error:r});}})),console.log("[Gemini] Modules ready. Access via Gemini.Modules in console.");}const Hb=Object.freeze(Object.defineProperty({__proto__:null,MGAssets:$t,MGAudio:mi,MGCalculators:Uc,MGCosmetic:hi,MGCustomModal:qt,MGData:oe,MGEnvironment:Re,MGManifest:bt,MGPixi:sn,MGPixiHooks:Ye,MGSprite:V,MGTile:Je,MGVersion:Ka,PET_ABILITY_ACTIONS:Hl,filterPetAbilityLogs:Ul,formatAbilityLog:Vl,initAllModules:Vc,isPetAbilityAction:Wl},Symbol.toStringTag,{value:"Module"}));function Wb(e){const t=String(e??"").trim().toLowerCase();return t?t==="common"?"Common":t==="uncommon"?"Uncommon":t==="rare"?"Rare":t==="legendary"?"Legendary":t==="mythical"?"Mythical":t==="divine"?"Divine":t==="celestial"?"Celestial":t==="unknown"||t==="unknow"?"Unknown":null:null}function Ub(e){return e.toLowerCase()}function nr(e={}){const{id:t,label:n="",type:r="neutral",tone:o="soft",border:a,withBorder:i,pill:s=true,size:c="md",onClick:d,variant:l="default",rarity:u=null,abilityId:p="",abilityName:f=""}=e,g=m("span",{className:"badge",id:t});s&&g.classList.add("badge--pill"),c==="sm"?g.classList.add("badge--sm"):c==="lg"?g.classList.add("badge--lg"):g.classList.add("badge--md"),d&&g.addEventListener("click",d);let b=false,h=i;function x(){b||(h===false?g.style.border="none":g.style.border="");}function k(v,P=o){g.classList.remove("badge--neutral","badge--info","badge--success","badge--warning","badge--danger","badge--soft","badge--outline","badge--solid"),g.classList.add(`badge--${v}`,`badge--${P}`),x();}function y(v){const P=(v??"").trim();P?(g.style.border=P,b=true):(b=false,x());}function w(v){h=v,x();}function T(v){g.textContent=v;}function S(v,P=o){k(v,P);}function C(v){g.classList.remove("badge--rarity","badge--rarity-common","badge--rarity-uncommon","badge--rarity-rare","badge--rarity-legendary","badge--rarity-mythical","badge--rarity-divine","badge--rarity-celestial","badge--rarity-unknown"),g.style.background="",g.style.backgroundSize="",g.style.animation="",g.style.color="",g.style.webkitTextStroke="";const P=Wb(v);if(!P){g.textContent=String(v??"—");return}g.textContent=P,g.classList.add("badge--rarity",`badge--rarity-${Ub(P)}`);}function I(v,P){const F=oe.get("abilities")?.[v],$=F?.color,A=$?.bg||"rgba(100, 100, 100, 0.9)",M=$?.hover||"rgba(150, 150, 150, 1)";g.classList.remove("badge--neutral","badge--info","badge--success","badge--warning","badge--danger","badge--soft","badge--outline","badge--solid","badge--rarity","badge--rarity-common","badge--rarity-uncommon","badge--rarity-rare","badge--rarity-legendary","badge--rarity-mythical","badge--rarity-divine","badge--rarity-celestial","badge--rarity-unknown"),g.classList.add("badge--ability"),g.textContent=P||F?.name||v||"Unknown Ability",g.style.background=A,g.style.color="white",g.style.border="none",g.style.webkitTextStroke="",g.style.animation="",g.style.backgroundSize="";const G=()=>{g.style.background=M;},L=()=>{g.style.background=A;};g.removeEventListener("mouseenter",G),g.removeEventListener("mouseleave",L),g.addEventListener("mouseenter",G),g.addEventListener("mouseleave",L);}return l==="rarity"?C(u):l==="ability"?I(p,f):(g.textContent=n,k(r,o),typeof i=="boolean"&&w(i),a&&y(a)),{root:g,setLabel:T,setType:S,setBorder:y,setWithBorder:w,setRarity:C,setAbility:I}}const Vb={expanded:false,sort:{key:null,dir:null},search:""},Xb={categories:{}};async function Kb(){const e=await lo("tab-test",{version:2,defaults:Xb,sanitize:a=>({categories:a.categories&&typeof a.categories=="object"?a.categories:{}})});function t(a){return e.get().categories[a]||{...Vb}}function n(a,i){const s=e.get(),c=t(a);e.update({categories:{...s.categories,[a]:{...c,expanded:i}}});}function r(a,i,s){const c=e.get(),d=t(a);e.update({categories:{...c.categories,[a]:{...d,sort:{key:i,dir:s}}}});}function o(a,i){const s=e.get(),c=t(a);e.update({categories:{...s.categories,[a]:{...c,search:i}}});}return {get:e.get,set:e.set,save:e.save,getCategoryState:t,setCategoryExpanded:n,setCategorySort:r,setCategorySearch:o}}const Yb={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function wr(e){return e?Yb[e]??0:0}class qb extends Bt{constructor(){super({id:"tab-test",label:"Test"});W(this,"stateCtrl",null);}async build(n){this.stateCtrl=await Kb();const r=this.createContainer("test-section");r.style.display="flex",r.style.flexDirection="column",r.style.gap="12px",n.appendChild(r),await this.buildSpriteTables(r);}renderSprite(n){const r=m("div",{style:"display:flex;align-items:center;justify-content:center;width:32px;height:32px;"});if(n.spriteId){const o=n.spriteId;requestAnimationFrame(()=>{try{const a=V.toCanvas(o,{scale:1});a.style.maxWidth="32px",a.style.maxHeight="32px",a.style.objectFit="contain",r.appendChild(a);}catch{r.textContent="-";}});}else r.textContent="-";return r}renderRarity(n){if(!n.rarity){const o=m("span",{style:"opacity:0.5;"});return o.textContent="—",o}return nr({variant:"rarity",rarity:n.rarity,size:"sm"}).root}createDataCard(n,r,o,a){const i=this.stateCtrl.getCategoryState(n),s=p=>{if(!p)return o;const f=p.toLowerCase();return o.filter(g=>g.name.toLowerCase().includes(f))},c=kl({columns:a,data:s(i.search),pageSize:0,compact:true,maxHeight:"calc(var(--lg-row-h, 40px) * 6)",getRowId:p=>p.spriteId,onSortChange:(p,f)=>{this.stateCtrl.setCategorySort(n,p,f);}});i.sort.key&&i.sort.dir&&c.sortBy(i.sort.key,i.sort.dir);const d=Ua({placeholder:"Search...",value:i.search,debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:p=>{const f=p.trim();this.stateCtrl.setCategorySearch(n,f),c.setData(s(f));}}),l=m("div",{style:"margin-bottom:8px;"});l.appendChild(d.root);const u=m("div");return u.appendChild(l),u.appendChild(c.root),_e({title:r,subtitle:`${o.length} entries`,variant:"soft",padding:"sm",expandable:true,defaultExpanded:i.expanded,onExpandChange:p=>{this.stateCtrl.setCategoryExpanded(n,p);}},u)}formatCategoryName(n){return n.split("-").map(r=>r.charAt(0).toUpperCase()+r.slice(1)).join(" ")}findPlantBySprite(n,r){const o=oe.get("plants");if(!o)return null;for(const i of Object.values(o))if(i?.seed?.spriteId===n||i?.plant?.spriteId===n||i?.crop?.spriteId===n)return i;const a=r.toLowerCase();for(const i of Object.values(o)){const s=(i?.seed?.name||"").toLowerCase();if(s===a||s===`${a} seed`)return i}return null}findPetBySpriteId(n){const r=oe.get("pets");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}findItemBySpriteId(n){const r=oe.get("items");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}findDecorBySpriteId(n){const r=oe.get("decor");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}findEggBySpriteId(n){const r=oe.get("eggs");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}getRarityForSprite(n,r,o){const a=n.toLowerCase();if(a==="plant"||a==="seed"||a==="tallplant"){const i=this.findPlantBySprite(r,o);if(i?.seed?.rarity)return i.seed.rarity}if(a==="pet"){const i=this.findPetBySpriteId(r);if(i?.rarity)return i.rarity}if(a==="item"){const i=this.findItemBySpriteId(r);if(i?.rarity)return i.rarity}if(a==="decor"){const i=this.findDecorBySpriteId(r);if(i?.rarity)return i.rarity}if(a==="egg"){const i=this.findEggBySpriteId(r);if(i?.rarity)return i.rarity}return null}yieldToMain(n=0){return new Promise(r=>{n>0?setTimeout(r,n):typeof requestIdleCallback<"u"?requestIdleCallback(()=>r(),{timeout:50}):setTimeout(r,4);})}async buildSpriteTables(n){const r=[{key:"name",header:"Name",sortable:true,width:"1fr",sortFn:(a,i)=>a.name.localeCompare(i.name,void 0,{numeric:true,sensitivity:"base"})},{key:"rarity",header:"Rarity",sortable:true,width:"100px",align:"center",render:a=>this.renderRarity(a),sortFn:(a,i)=>wr(a.rarity)-wr(i.rarity)},{key:"sprite",header:"Sprite",width:"60px",align:"center",render:a=>this.renderSprite(a)}];if(!V.isReady())try{await V.init();}catch{return}const o=V.getCategories();for(let a=0;a<o.length;a++){await this.yieldToMain(8);const i=o[a],c=V.getCategoryId(i).map(d=>{const l=`sprite/${i}/${d}`;return {name:d,spriteId:l,rarity:this.getRarityForSprite(i,l,d)}});if(c.sort((d,l)=>wr(d.rarity)-wr(l.rarity)),c.length>0){const d=this.createDataCard(i,this.formatCategoryName(i),c,r);n.appendChild(d);}}}}function Oe(e,t,n){if(e.querySelector(`style[data-style-id="${n}"]`))return;const r=document.createElement("style");r.setAttribute("data-style-id",n),r.textContent=t,e.appendChild(r);}const Xc=`
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
`,Jb={enabled:false,favoriteProduceList:[],favoritePetsList:[],favoriteMutations:[]};let _t=null;async function Qb(){if(_t)return _t;_t=await lo("tab-auto-favorite",{version:1,defaults:Jb});const e=ke($e.AUTO_FAVORITE_UI,null);return e&&(await _t.set(e),Lu($e.AUTO_FAVORITE_UI),console.log("[AutoFavoriteSettings] Migrated old storage to new state")),_t}function Ze(){if(!_t)throw new Error("[AutoFavoriteSettings] Section state not initialized. Call initSectionState() first.");return _t}const Ci=$e.AUTO_FAVORITE,Kc={enabled:false,mode:"simple",simple:{enabled:false,favoriteSpecies:[],favoriteMutations:[]}};function Ot(){return ke(Ci,Kc)}function Ti(e){Ge(Ci,e);}function Yc(e){const n={...Ot(),...e};return Ti(n),n}function Pi(e){const t=Ot();return t.mode="simple",t.simple={...t.simple,...e},Ti(t),t}function Zb(e){Pi({favoriteSpecies:e});}function ex(e){Pi({favoriteMutations:e});}function fs(){return Ot().enabled}function ft(e,t){if(e===t)return  true;if(e===null||t===null)return e===t;if(typeof e!=typeof t)return  false;if(typeof e!="object")return e===t;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return  false;for(let i=0;i<e.length;i++)if(!ft(e[i],t[i]))return  false;return  true}if(Array.isArray(e)||Array.isArray(t))return  false;const n=e,r=t,o=Object.keys(n),a=Object.keys(r);if(o.length!==a.length)return  false;for(const i of o)if(!Object.prototype.hasOwnProperty.call(r,i)||!ft(n[i],r[i]))return  false;return  true}const gs={currentGardenTile:"myCurrentGardenTileAtom",globalTileIndex:"myCurrentGlobalTileIndexAtom",gardenObject:"myCurrentGardenObjectAtom",isMature:"isGardenObjectMatureAtom",isInMyGarden:"isInMyGardenAtom",gardenName:"currentGardenNameAtom",sortedSlotIndices:"myCurrentSortedGrowSlotIndicesAtom",currentGrowSlotIndex:"myCurrentGrowSlotIndexAtom"},ms={position:{globalIndex:null,localIndex:null},tile:{type:null,isEmpty:true},garden:{name:null,isOwner:false,playerSlotIndex:null},object:{type:null,data:null,isMature:false},plant:null};function tx(e){const t=e.currentGardenTile;return {globalIndex:e.globalTileIndex,localIndex:t?.localTileIndex??null}}function nx(e){return {type:e.currentGardenTile?.tileType??null,isEmpty:e.gardenObject===null}}function rx(e){const t=e.currentGardenTile;return {name:e.gardenName,isOwner:e.isInMyGarden??false,playerSlotIndex:t?.userSlotIdx??null}}function ox(e){const t=e.gardenObject;return t?{type:t.objectType,data:t,isMature:e.isMature??false}:{type:null,data:null,isMature:false}}function ax(e){const t=e.gardenObject;if(!t||t.objectType!=="plant")return null;const n=t,r=e.sortedSlotIndices??[];return {species:n.species,slots:n.slots??[],currentSlotIndex:e.currentGrowSlotIndex,sortedSlotIndices:r,nextHarvestSlotIndex:r.length>0?r[0]:null}}function hs(e){return {position:tx(e),tile:nx(e),garden:rx(e),object:ox(e),plant:ax(e)}}function bs(e){return JSON.stringify({globalIndex:e.position.globalIndex,localIndex:e.position.localIndex,tileType:e.tile.type,isEmpty:e.tile.isEmpty,gardenName:e.garden.name,isOwner:e.garden.isOwner,playerSlotIndex:e.garden.playerSlotIndex,objectType:e.object.type,isMature:e.object.isMature,plantSpecies:e.plant?.species??null,slotCount:e.plant?.slots.length??0})}function ix(e,t){return e.type!==t.type||e.isMature!==t.isMature?true:e.data===null&&t.data===null?false:e.data===null||t.data===null?true:!ft(e.data,t.data)}function sx(e,t){return e===null&&t===null?false:e===null||t===null||e.species!==t.species||e.currentSlotIndex!==t.currentSlotIndex||e.nextHarvestSlotIndex!==t.nextHarvestSlotIndex||e.slots.length!==t.slots.length?true:!ft(e.sortedSlotIndices,t.sortedSlotIndices)}function lx(e,t){return e.name!==t.name||e.isOwner!==t.isOwner||e.playerSlotIndex!==t.playerSlotIndex}function cx(){let e=ms,t=ms,n=false;const r=[],o={all:new Set,stable:new Set,object:new Set,plantInfo:new Set,garden:new Set},a={},i=Object.keys(gs),s=new Set;function c(){if(s.size<i.length)return;const l=hs(a);if(!ft(e,l)&&(t=e,e=l,!!n)){for(const u of o.all)u(e,t);if(bs(t)!==bs(e))for(const u of o.stable)u(e,t);if(ix(t.object,e.object)){const u={current:e.object,previous:t.object};for(const p of o.object)p(u);}if(sx(t.plant,e.plant)){const u={current:e.plant,previous:t.plant};for(const p of o.plantInfo)p(u);}if(lx(t.garden,e.garden)){const u={current:e.garden,previous:t.garden};for(const p of o.garden)p(u);}}}async function d(){if(n)return;const l=i.map(async u=>{const p=gs[u],f=await ge.subscribe(p,g=>{a[u]=g,s.add(u),c();});r.push(f);});await Promise.all(l),n=true,s.size===i.length&&(e=hs(a));}return d(),{get(){return e},subscribe(l,u){return o.all.add(l),u?.immediate!==false&&n&&s.size===i.length&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,u){return o.stable.add(l),u?.immediate!==false&&n&&s.size===i.length&&l(e,e),()=>o.stable.delete(l)},subscribeObject(l,u){return o.object.add(l),u?.immediate&&n&&s.size===i.length&&l({current:e.object,previous:e.object}),()=>o.object.delete(l)},subscribePlantInfo(l,u){return o.plantInfo.add(l),u?.immediate&&n&&s.size===i.length&&l({current:e.plant,previous:e.plant}),()=>o.plantInfo.delete(l)},subscribeGarden(l,u){return o.garden.add(l),u?.immediate&&n&&s.size===i.length&&l({current:e.garden,previous:e.garden}),()=>o.garden.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.object.clear(),o.plantInfo.clear(),o.garden.clear(),n=false;}}}let Bo=null;function dx(){return Bo||(Bo=cx()),Bo}function ux(){let e=null;const t=[],n=new Set,r={},o=new Set,a=2;function i(u,p){return {x:p%u,y:Math.floor(p/u)}}function s(u,p,f){return f*u+p}function c(u,p){const{cols:f,rows:g}=u,b=f*g,h=new Set,x=new Set,k=new Map,y=[],w=u.userSlotIdxAndDirtTileIdxToGlobalTileIdx??[],T=u.userSlotIdxAndBoardwalkTileIdxToGlobalTileIdx??[],S=Math.max(w.length,T.length);for(let v=0;v<S;v++){const P=w[v]??[],E=T[v]??[],F=P.map((A,M)=>(h.add(A),k.set(A,v),{globalIndex:A,localIndex:M,position:i(f,A)})),$=E.map((A,M)=>(x.add(A),k.set(A,v),{globalIndex:A,localIndex:M,position:i(f,A)}));y.push({userSlotIdx:v,dirtTiles:F,boardwalkTiles:$,allTiles:[...F,...$]});}const C=u.spawnTiles.map(v=>i(f,v)),I={};if(u.locations)for(const[v,P]of Object.entries(u.locations)){const E=P.spawnTileIdx??[];I[v]={name:v,spawnTiles:E,spawnPositions:E.map(F=>i(f,F))};}return {cols:f,rows:g,totalTiles:b,tileSize:p,spawnTiles:u.spawnTiles,spawnPositions:C,locations:I,userSlots:y,globalToXY(v){return i(f,v)},xyToGlobal(v,P){return s(f,v,P)},getTileOwner(v){return k.get(v)??null},isDirtTile(v){return h.has(v)},isBoardwalkTile(v){return x.has(v)}}}function d(){if(o.size<a||e)return;const u=r.map,p=r.tileSize??0;if(u){e=c(u,p);for(const f of n)f(e);n.clear();}}async function l(){const u=await ge.subscribe("mapAtom",f=>{r.map=f,o.add("map"),d();});t.push(u);const p=await ge.subscribe("tileSizeAtom",f=>{r.tileSize=f,o.add("tileSize"),d();});t.push(p);}return l(),{get(){return e},isReady(){return e!==null},onReady(u,p){return e?(p?.immediate!==false&&u(e),()=>{}):(n.add(u),()=>n.delete(u))},destroy(){for(const u of t)u();t.length=0,e=null,n.clear();}}}let $o=null;function va(){return $o||($o=ux()),$o}function px(){const e=oe.get("mutations");return e?Object.keys(e):[]}function qc(){const e={};for(const t of px())e[t]=[];return e}function wa(){return {garden:null,mySlotIndex:null,plants:{all:[],mature:[],growing:[],bySpecies:{},count:0},crops:{all:[],mature:[],growing:[],mutated:{all:[],byMutation:qc()}},eggs:{all:[],mature:[],growing:[],byType:{},count:0},decors:{tileObjects:[],boardwalk:[],all:[],byType:{},count:0},tiles:{tileObjects:[],boardwalk:[],empty:{tileObjects:[],boardwalk:[]}},counts:{plants:0,maturePlants:0,crops:0,matureCrops:0,eggs:0,matureEggs:0,decors:0,emptyTileObjects:0,emptyBoardwalk:0}}}function fx(e,t,n,r){const o=t.slots.filter(a=>r>=a.endTime).length;return {tileIndex:e,position:n,species:t.species,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:r>=t.maturedAt,slots:t.slots,slotsCount:t.slots.length,matureSlotsCount:o}}function gx(e,t,n,r,o){return {tileIndex:e,position:t,slotIndex:n,species:r.species,startTime:r.startTime,endTime:r.endTime,targetScale:r.targetScale,mutations:[...r.mutations],isMature:o>=r.endTime}}function mx(e,t,n,r){return {tileIndex:e,position:n,eggId:t.eggId,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:r>=t.maturedAt}}function xs(e,t,n,r){return {tileIndex:e,position:n,decorId:t.decorId,rotation:t.rotation,location:r}}function ys(e,t){const{garden:n,mySlotIndex:r}=e,o=Date.now();if(!n||r===null)return wa();const a=t().get(),i=a?.userSlots[r],s=i?.dirtTiles??[],c=i?.boardwalkTiles??[],d=[],l=[],u=[],p={},f=[],g=[],b=[],h=[],x=qc(),k=[],y=[],w=[],T={},S=[],C=[],I={},v=new Set,P=new Set;for(const[A,M]of Object.entries(n.tileObjects)){const G=parseInt(A,10);v.add(G);const L=a?a.globalToXY(G):{x:0,y:0};if(M.objectType==="plant"){const D=M,j=fx(A,D,L,o);d.push(j),j.isMature?l.push(j):u.push(j),p[j.species]||(p[j.species]=[]),p[j.species].push(j);for(let z=0;z<D.slots.length;z++){const R=D.slots[z],H=gx(A,L,z,R,o);if(f.push(H),H.isMature?g.push(H):b.push(H),H.mutations.length>0){h.push(H);for(const B of H.mutations)x[B]||(x[B]=[]),x[B].push(H);}}}else if(M.objectType==="egg"){const j=mx(A,M,L,o);k.push(j),T[j.eggId]||(T[j.eggId]=[]),T[j.eggId].push(j),j.isMature?y.push(j):w.push(j);}else if(M.objectType==="decor"){const j=xs(A,M,L,"tileObjects");S.push(j),I[j.decorId]||(I[j.decorId]=[]),I[j.decorId].push(j);}}for(const[A,M]of Object.entries(n.boardwalkTileObjects)){const G=parseInt(A,10);P.add(G);const L=a?a.globalToXY(G):{x:0,y:0},j=xs(A,M,L,"boardwalk");C.push(j),I[j.decorId]||(I[j.decorId]=[]),I[j.decorId].push(j);}const E=[...S,...C],F=s.filter(A=>!v.has(A.localIndex)),$=c.filter(A=>!P.has(A.localIndex));return {garden:n,mySlotIndex:r,plants:{all:d,mature:l,growing:u,bySpecies:p,count:d.length},crops:{all:f,mature:g,growing:b,mutated:{all:h,byMutation:x}},eggs:{all:k,mature:y,growing:w,byType:T,count:k.length},decors:{tileObjects:S,boardwalk:C,all:E,byType:I,count:E.length},tiles:{tileObjects:s,boardwalk:c,empty:{tileObjects:F,boardwalk:$}},counts:{plants:d.length,maturePlants:l.length,crops:f.length,matureCrops:g.length,eggs:k.length,matureEggs:y.length,decors:E.length,emptyTileObjects:F.length,emptyBoardwalk:$.length}}}function vs(e){return JSON.stringify({plants:e.counts.plants,maturePlants:e.counts.maturePlants,crops:e.counts.crops,matureCrops:e.counts.matureCrops,eggs:e.counts.eggs,matureEggs:e.counts.matureEggs,decors:e.counts.decors,emptyTileObjects:e.counts.emptyTileObjects,emptyBoardwalk:e.counts.emptyBoardwalk})}function hx(e,t){const n=new Set(e.map(i=>i.tileIndex)),r=new Set(t.map(i=>i.tileIndex)),o=t.filter(i=>!n.has(i.tileIndex)),a=e.filter(i=>!r.has(i.tileIndex));return {added:o,removed:a}}function bx(e,t,n){const r=new Set(e.map(a=>a.tileIndex)),o=new Set(n.map(a=>a.tileIndex));return t.filter(a=>!r.has(a.tileIndex)&&o.has(a.tileIndex))}function xx(e,t,n){const r=new Set(e.map(a=>`${a.tileIndex}:${a.slotIndex}`)),o=new Set(n.map(a=>`${a.tileIndex}:${a.slotIndex}`));return t.filter(a=>{const i=`${a.tileIndex}:${a.slotIndex}`;return !r.has(i)&&o.has(i)})}function yx(e,t,n){const r=new Set(e.map(a=>a.tileIndex)),o=new Set(n.map(a=>a.tileIndex));return t.filter(a=>!r.has(a.tileIndex)&&o.has(a.tileIndex))}function vx(e,t){const n=[],r=new Map(e.map(o=>[o.tileIndex,o]));for(const o of t){const a=r.get(o.tileIndex);if(!a)continue;const i=Math.min(a.slots.length,o.slots.length);for(let s=0;s<i;s++){const c=new Set(a.slots[s].mutations),d=new Set(o.slots[s].mutations),l=[...d].filter(p=>!c.has(p)),u=[...c].filter(p=>!d.has(p));if(l.length>0||u.length>0){const p=Date.now(),f=o.slots[s],g={tileIndex:o.tileIndex,position:o.position,slotIndex:s,species:f.species,startTime:f.startTime,endTime:f.endTime,targetScale:f.targetScale,mutations:[...f.mutations],isMature:p>=f.endTime};n.push({crop:g,added:l,removed:u});}}}return n}function wx(e,t,n){const r=[],o=new Map(t.map(i=>[i.tileIndex,i])),a=new Map;for(const i of n)a.set(`${i.tileIndex}:${i.slotIndex}`,i);for(const i of e){const s=o.get(i.tileIndex);if(!s)continue;const c=Math.min(i.slots.length,s.slots.length);for(let d=0;d<c;d++){const l=i.slots[d],u=s.slots[d];if(l.startTime!==u.startTime){const p=a.get(`${i.tileIndex}:${d}`);if(!p||!p.isMature)continue;const f={tileIndex:i.tileIndex,position:i.position,slotIndex:d,species:l.species,startTime:l.startTime,endTime:l.endTime,targetScale:l.targetScale,mutations:[...l.mutations],isMature:true};r.push({crop:f,remainingSlots:s.slotsCount});}}if(s.slotsCount<i.slotsCount)for(let d=s.slotsCount;d<i.slotsCount;d++){const l=a.get(`${i.tileIndex}:${d}`);if(!l||!l.isMature)continue;const u=i.slots[d];if(!u)continue;const p={tileIndex:i.tileIndex,position:i.position,slotIndex:d,species:u.species,startTime:u.startTime,endTime:u.endTime,targetScale:u.targetScale,mutations:[...u.mutations],isMature:true};r.push({crop:p,remainingSlots:s.slotsCount});}}return r}function Sx(e,t){const n=new Set(e.map(i=>i.tileIndex)),r=new Set(t.map(i=>i.tileIndex)),o=t.filter(i=>!n.has(i.tileIndex)),a=e.filter(i=>!r.has(i.tileIndex));return {added:o,removed:a}}function kx(e,t){const n=c=>`${c.tileIndex}:${c.location}`,r=c=>`${c.tileIndex}:${c.location}`,o=new Set(e.map(n)),a=new Set(t.map(r)),i=t.filter(c=>!o.has(r(c))),s=e.filter(c=>!a.has(n(c)));return {added:i,removed:s}}function Cx(){let e=wa(),t=wa(),n=false;const r=[],o={all:new Set,stable:new Set,plantAdded:new Set,plantRemoved:new Set,plantMatured:new Set,cropMutated:new Set,cropMatured:new Set,cropHarvested:new Set,eggPlaced:new Set,eggRemoved:new Set,eggMatured:new Set,decorPlaced:new Set,decorRemoved:new Set},a={},i=new Set,s=2;function c(){if(i.size<s)return;const l=ys(a,va);if(ft(e,l)||(t=e,e=l,!n))return;for(const y of o.all)y(e,t);if(vs(t)!==vs(e))for(const y of o.stable)y(e,t);const u=hx(t.plants.all,e.plants.all);for(const y of u.added)for(const w of o.plantAdded)w({plant:y});for(const y of u.removed)for(const w of o.plantRemoved)w({plant:y,tileIndex:y.tileIndex});const p=bx(t.plants.mature,e.plants.mature,e.plants.all);for(const y of p)for(const w of o.plantMatured)w({plant:y});const f=vx(t.plants.all,e.plants.all);for(const y of f)for(const w of o.cropMutated)w(y);const g=xx(t.crops.mature,e.crops.mature,e.crops.all);for(const y of g)for(const w of o.cropMatured)w({crop:y});const b=wx(t.plants.all,e.plants.all,t.crops.all);for(const y of b)for(const w of o.cropHarvested)w(y);const h=Sx(t.eggs.all,e.eggs.all);for(const y of h.added)for(const w of o.eggPlaced)w({egg:y});for(const y of h.removed)for(const w of o.eggRemoved)w({egg:y});const x=yx(t.eggs.mature,e.eggs.mature,e.eggs.all);for(const y of x)for(const w of o.eggMatured)w({egg:y});const k=kx(t.decors.all,e.decors.all);for(const y of k.added)for(const w of o.decorPlaced)w({decor:y});for(const y of k.removed)for(const w of o.decorRemoved)w({decor:y});}async function d(){if(n)return;const l=await sg.onChangeNow(p=>{a.garden=p,i.add("garden"),c();});r.push(l);const u=await ge.subscribe("myUserSlotIdxAtom",p=>{a.mySlotIndex=p,i.add("mySlotIndex"),c();});r.push(u),n=true,i.size===s&&(e=ys(a,va));}return d(),{get(){return e},subscribe(l,u){return o.all.add(l),u?.immediate!==false&&n&&i.size===s&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,u){return o.stable.add(l),u?.immediate!==false&&n&&i.size===s&&l(e,e),()=>o.stable.delete(l)},subscribePlantAdded(l,u){if(o.plantAdded.add(l),u?.immediate&&n&&i.size===s)for(const p of e.plants.all)l({plant:p});return ()=>o.plantAdded.delete(l)},subscribePlantRemoved(l,u){return o.plantRemoved.add(l),()=>o.plantRemoved.delete(l)},subscribePlantMatured(l,u){if(o.plantMatured.add(l),u?.immediate&&n&&i.size===s)for(const p of e.plants.mature)l({plant:p});return ()=>o.plantMatured.delete(l)},subscribeCropMutated(l,u){if(o.cropMutated.add(l),u?.immediate&&n&&i.size===s)for(const p of e.crops.mutated.all)l({crop:p,added:p.mutations,removed:[]});return ()=>o.cropMutated.delete(l)},subscribeCropMatured(l,u){if(o.cropMatured.add(l),u?.immediate&&n&&i.size===s)for(const p of e.crops.mature)l({crop:p});return ()=>o.cropMatured.delete(l)},subscribeCropHarvested(l,u){return o.cropHarvested.add(l),()=>o.cropHarvested.delete(l)},subscribeEggPlaced(l,u){if(o.eggPlaced.add(l),u?.immediate&&n&&i.size===s)for(const p of e.eggs.all)l({egg:p});return ()=>o.eggPlaced.delete(l)},subscribeEggRemoved(l,u){return o.eggRemoved.add(l),()=>o.eggRemoved.delete(l)},subscribeEggMatured(l,u){if(o.eggMatured.add(l),u?.immediate&&n&&i.size===s)for(const p of e.eggs.mature)l({egg:p});return ()=>o.eggMatured.delete(l)},subscribeDecorPlaced(l,u){if(o.decorPlaced.add(l),u?.immediate&&n&&i.size===s)for(const p of e.decors.all)l({decor:p});return ()=>o.decorPlaced.delete(l)},subscribeDecorRemoved(l,u){return o.decorRemoved.add(l),()=>o.decorRemoved.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.plantAdded.clear(),o.plantRemoved.clear(),o.plantMatured.clear(),o.cropMutated.clear(),o.cropMatured.clear(),o.cropHarvested.clear(),o.eggPlaced.clear(),o.eggRemoved.clear(),o.eggMatured.clear(),o.decorPlaced.clear(),o.decorRemoved.clear(),n=false;}}}let Do=null;function Jc(){return Do||(Do=Cx()),Do}const ws={inventory:"myPetInventoryAtom",hutch:"myPetHutchPetItemsAtom",active:"myPetInfosAtom",slotInfos:"myPetSlotInfosAtom",expandedPetSlotId:"expandedPetSlotIdAtom",myNumPetHutchItems:"myNumPetHutchItemsAtom",activityLogs:"myDataAtom"};function Ss(e,t){const n=xo(e.xp),r=yo(e.petSpecies,e.targetScale),o=vo(e.petSpecies,e.xp,r),a=wo(e.petSpecies,n);return {id:e.id,petSpecies:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,mutations:[...e.mutations],targetScale:e.targetScale,abilities:[...e.abilities],location:t,position:null,lastAbilityTrigger:null,growthStage:n,currentStrength:o,maxStrength:r,isMature:a}}function Tx(e,t){const r=t[e.slot.id]?.lastAbilityTrigger??null,o=xo(e.slot.xp),a=yo(e.slot.petSpecies,e.slot.targetScale),i=vo(e.slot.petSpecies,e.slot.xp,a),s=wo(e.slot.petSpecies,o);return {id:e.slot.id,petSpecies:e.slot.petSpecies,name:e.slot.name,xp:e.slot.xp,hunger:e.slot.hunger,mutations:[...e.slot.mutations],targetScale:e.slot.targetScale,abilities:[...e.slot.abilities],location:"active",position:e.position?{x:e.position.x,y:e.position.y}:null,lastAbilityTrigger:r,growthStage:o,currentStrength:i,maxStrength:a,isMature:s}}const ks=500;let st=[],Wr=0;function Px(){try{const e=ke(pl.GLOBAL.MY_PETS_ABILITY_LOGS,[]);if(!Array.isArray(e))return [];const t=e.filter(n=>typeof n=="object"&&n!==null&&typeof n.petId=="string"&&typeof n.petName=="string"&&typeof n.petSpecies=="string"&&typeof n.abilityId=="string"&&typeof n.performedAt=="number");return t.length<e.length&&console.log(`[myPets] Migrated ability logs: removed ${e.length-t.length} old entries`),t.length>0&&(Wr=Math.max(...t.map(n=>n.performedAt))),t}catch(e){return console.error("[myPets] Failed to load ability logs from storage:",e),[]}}function Ax(e){try{Ge(pl.GLOBAL.MY_PETS_ABILITY_LOGS,e);}catch(t){console.error("[myPets] Failed to save ability logs to storage:",t);}}function Ix(e){try{const n=e.parameters.pet;return !n||!n.id||!n.petSpecies?null:{petId:n.id,petName:n.name||n.petSpecies,petSpecies:n.petSpecies,abilityId:e.action,data:e.parameters,performedAt:e.timestamp}}catch(t){return console.error("[myPets] Failed to convert activity log:",t),null}}function _x(e){if(!e||!Array.isArray(e))return;const t=Ul(e),n=[];for(const r of t)if(r.timestamp>Wr){const o=Ix(r);o&&n.push(o);}n.length!==0&&(Wr=Math.max(...n.map(r=>r.performedAt),Wr),st=[...n,...st],st.length>ks&&(st=st.slice(0,ks)),Ax(st),console.log(`[myPets] Processed ${n.length} new ability logs (total: ${st.length})`));}function Cs(e){const t=new Set,n=[];for(const f of e.active??[]){const g=Tx(f,e.slotInfos??{});n.push(g),t.add(g.id);}const r=[];for(const f of e.inventory??[]){if(t.has(f.id))continue;const g=Ss(f,"inventory");r.push(g),t.add(g.id);}const o=[];for(const f of e.hutch??[]){if(t.has(f.id))continue;const g=Ss(f,"hutch");o.push(g),t.add(g.id);}const a=[...n,...r,...o],i=e.expandedPetSlotId??null,s=i?a.find(f=>f.id===i)??null:null,l=Jc().get().decors.all.some(f=>f.decorId==="PetHutch"),u=e.myNumPetHutchItems??0;return {all:a,byLocation:{inventory:r,hutch:o,active:n},counts:{inventory:r.length,hutch:o.length,active:n.length,total:a.length},hutch:{hasHutch:l,currentItems:u,maxItems:25},expandedPetSlotId:i,expandedPet:s,abilityLogs:[...st]}}const Ts={all:[],byLocation:{inventory:[],hutch:[],active:[]},counts:{inventory:0,hutch:0,active:0,total:0},hutch:{hasHutch:false,currentItems:0,maxItems:25},expandedPetSlotId:null,expandedPet:null,abilityLogs:[]};function Ex(e,t){if(e.length!==t.length)return  false;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return  false;return  true}function Ps(e){return JSON.stringify({id:e.id,petSpecies:e.petSpecies,name:e.name,mutations:e.mutations,abilities:e.abilities,location:e.location})}function Mx(e,t){if(e.all.length!==t.all.length)return  false;const n=e.all.map(Ps),r=t.all.map(Ps);return Ex(n,r)}function Lx(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const a=r.get(o.id);a&&a.location!==o.location&&n.push({pet:o,from:a.location,to:o.location});}return n}function Rx(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){if(!o.lastAbilityTrigger)continue;const i=r.get(o.id)?.lastAbilityTrigger;(!i||i.abilityId!==o.lastAbilityTrigger.abilityId||i.performedAt!==o.lastAbilityTrigger.performedAt)&&n.push({pet:o,trigger:o.lastAbilityTrigger});}return n}function Fx(e,t){const n=new Set(e.all.map(i=>i.id)),r=new Set(t.all.map(i=>i.id)),o=t.all.filter(i=>!n.has(i.id)),a=e.all.filter(i=>!r.has(i.id));return o.length===0&&a.length===0?null:{added:o,removed:a,counts:t.counts}}function Nx(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const a=r.get(o.id);a&&o.growthStage>a.growthStage&&n.push({pet:o,previousStage:a.growthStage,newStage:o.growthStage});}return n}function Ox(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const a=r.get(o.id);a&&o.currentStrength>a.currentStrength&&n.push({pet:o,previousStrength:a.currentStrength,newStrength:o.currentStrength});}return n}function Bx(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const a=r.get(o.id);a&&o.currentStrength===o.maxStrength&&a.currentStrength<a.maxStrength&&n.push({pet:o});}return n}function $x(){let e=Ts,t=Ts,n=false;const r=[],o={all:new Set,stable:new Set,location:new Set,ability:new Set,count:new Set,expandedPet:new Set,growth:new Set,strengthGain:new Set,maxStrength:new Set},a={},i=Object.keys(ws),s=new Set;function c(){if(s.size<i.length)return;if(a.activityLogs){const x=a.activityLogs?.activityLogs||a.activityLogs;Array.isArray(x)&&_x(x);}const l=Cs(a);if(ft(e,l)||(t=e,e=l,!n))return;for(const x of o.all)x(e,t);if(!Mx(t,e))for(const x of o.stable)x(e,t);const u=Lx(t,e);for(const x of u)for(const k of o.location)k(x);const p=Rx(t,e);for(const x of p)for(const k of o.ability)k(x);const f=Fx(t,e);if(f)for(const x of o.count)x(f);const g=Nx(t,e);for(const x of g)for(const k of o.growth)k(x);const b=Ox(t,e);for(const x of b)for(const k of o.strengthGain)k(x);const h=Bx(t,e);for(const x of h)for(const k of o.maxStrength)k(x);if(t.expandedPetSlotId!==e.expandedPetSlotId){const x={current:e.expandedPet,previous:t.expandedPet,currentId:e.expandedPetSlotId,previousId:t.expandedPetSlotId};for(const k of o.expandedPet)k(x);}}async function d(){if(n)return;st=Px(),console.log(`[myPets] Loaded ${st.length} ability logs from storage`);const l=i.map(async u=>{const p=ws[u],f=await ge.subscribe(p,g=>{a[u]=g,s.add(u),c();});r.push(f);});await Promise.all(l),n=true,s.size===i.length&&(e=Cs(a));}return d(),{get(){return e},subscribe(l,u){return o.all.add(l),u?.immediate!==false&&n&&s.size===i.length&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,u){return o.stable.add(l),u?.immediate!==false&&n&&s.size===i.length&&l(e,e),()=>o.stable.delete(l)},subscribeLocation(l,u){if(o.location.add(l),u?.immediate&&n&&s.size===i.length)for(const p of e.all)l({pet:p,from:p.location,to:p.location});return ()=>o.location.delete(l)},subscribeAbility(l,u){if(o.ability.add(l),u?.immediate&&n&&s.size===i.length)for(const p of e.all)p.lastAbilityTrigger&&l({pet:p,trigger:p.lastAbilityTrigger});return ()=>o.ability.delete(l)},subscribeCount(l,u){return o.count.add(l),u?.immediate&&n&&s.size===i.length&&l({added:e.all,removed:[],counts:e.counts}),()=>o.count.delete(l)},subscribeExpandedPet(l,u){return o.expandedPet.add(l),u?.immediate&&n&&s.size===i.length&&l({current:e.expandedPet,previous:e.expandedPet,currentId:e.expandedPetSlotId,previousId:e.expandedPetSlotId}),()=>o.expandedPet.delete(l)},subscribeGrowth(l,u){if(o.growth.add(l),u?.immediate&&n&&s.size===i.length)for(const p of e.all)l({pet:p,previousStage:p.growthStage,newStage:p.growthStage});return ()=>o.growth.delete(l)},subscribeStrengthGain(l,u){if(o.strengthGain.add(l),u?.immediate&&n&&s.size===i.length)for(const p of e.all)l({pet:p,previousStrength:p.currentStrength,newStrength:p.currentStrength});return ()=>o.strengthGain.delete(l)},subscribeMaxStrength(l,u){if(o.maxStrength.add(l),u?.immediate&&n&&s.size===i.length)for(const p of e.all)p.currentStrength===p.maxStrength&&l({pet:p});return ()=>o.maxStrength.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.location.clear(),o.ability.clear(),o.count.clear(),o.expandedPet.clear(),o.growth.clear(),o.strengthGain.clear(),o.maxStrength.clear(),n=false;}}}let zo=null;function fn(){return zo||(zo=$x()),zo}const As={inventory:"myInventoryAtom",isFull:"isMyInventoryAtMaxLengthAtom",selectedItemIndex:"myValidatedSelectedItemIndexAtom"},Is={items:[],favoritedItemIds:[],count:0,isFull:false,selectedItem:null};function _s(e){const t=e.inventory,n=t?.items??[],r=t?.favoritedItemIds??[],o=e.selectedItemIndex;let a=null;return o!==null&&o>=0&&o<n.length&&(a={index:o,item:n[o]}),{items:n,favoritedItemIds:r,count:n.length,isFull:e.isFull??false,selectedItem:a}}function Es(e){const t=e.items.map(n=>"id"in n?n.id:"species"in n&&n.itemType==="Seed"?`seed:${n.species}:${n.quantity}`:"toolId"in n?`tool:${n.toolId}:${n.quantity}`:"eggId"in n?`egg:${n.eggId}:${n.quantity}`:"decorId"in n?`decor:${n.decorId}:${n.quantity}`:JSON.stringify(n));return JSON.stringify({itemKeys:t,favoritedItemIds:e.favoritedItemIds,isFull:e.isFull,selectedItemIndex:e.selectedItem?.index??null})}function Dx(e,t){return Es(e)===Es(t)}function zx(e,t){return e===null&&t===null?false:e===null||t===null?true:e.index!==t.index}function Sr(e){return "id"in e?e.id:"species"in e&&e.itemType==="Seed"?`seed:${e.species}`:"toolId"in e?`tool:${e.toolId}`:"eggId"in e?`egg:${e.eggId}`:"decorId"in e?`decor:${e.decorId}`:JSON.stringify(e)}function Gx(e,t){const n=new Set(e.map(Sr)),r=new Set(t.map(Sr)),o=t.filter(i=>!n.has(Sr(i))),a=e.filter(i=>!r.has(Sr(i)));return o.length===0&&a.length===0?null:{added:o,removed:a,counts:{before:e.length,after:t.length}}}function jx(e,t){const n=new Set(e),r=new Set(t),o=t.filter(i=>!n.has(i)),a=e.filter(i=>!r.has(i));return o.length===0&&a.length===0?null:{added:o,removed:a,current:t}}function Hx(){let e=Is,t=Is,n=false;const r=[],o={all:new Set,stable:new Set,selection:new Set,items:new Set,favorites:new Set},a={},i=Object.keys(As),s=new Set;function c(){if(s.size<i.length)return;const l=_s(a);if(ft(e,l)||(t=e,e=l,!n))return;for(const f of o.all)f(e,t);if(!Dx(t,e))for(const f of o.stable)f(e,t);if(zx(t.selectedItem,e.selectedItem)){const f={current:e.selectedItem,previous:t.selectedItem};for(const g of o.selection)g(f);}const u=Gx(t.items,e.items);if(u)for(const f of o.items)f(u);const p=jx(t.favoritedItemIds,e.favoritedItemIds);if(p)for(const f of o.favorites)f(p);}async function d(){if(n)return;const l=i.map(async u=>{const p=As[u],f=await ge.subscribe(p,g=>{a[u]=g,s.add(u),c();});r.push(f);});await Promise.all(l),n=true,s.size===i.length&&(e=_s(a));}return d(),{get(){return e},subscribe(l,u){return o.all.add(l),u?.immediate!==false&&n&&s.size===i.length&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,u){return o.stable.add(l),u?.immediate!==false&&n&&s.size===i.length&&l(e,e),()=>o.stable.delete(l)},subscribeSelection(l,u){return o.selection.add(l),u?.immediate&&n&&s.size===i.length&&l({current:e.selectedItem,previous:e.selectedItem}),()=>o.selection.delete(l)},subscribeItems(l,u){return o.items.add(l),u?.immediate&&n&&s.size===i.length&&l({added:e.items,removed:[],counts:{before:0,after:e.count}}),()=>o.items.delete(l)},subscribeFavorites(l,u){return o.favorites.add(l),u?.immediate&&n&&s.size===i.length&&l({added:e.favoritedItemIds,removed:[],current:e.favoritedItemIds}),()=>o.favorites.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.selection.clear(),o.items.clear(),o.favorites.clear(),n=false;}}}let Go=null;function Gt(){return Go||(Go=Hx()),Go}const Sa={all:[],host:null,myPlayer:null,count:0};function Wx(e,t,n){const r=n.get(e.id),o=r?.slot,a=o?.data,i=o?.lastActionEvent;return {id:e.id,name:e.name,discordId:e.databaseUserId,discordAvatarUrl:e.discordAvatarUrl,guildId:e.guildId,isConnected:e.isConnected,isHost:e.id===t,slotIndex:r?.index??null,position:o?.position??null,cosmetic:{color:e.cosmetic?.color??"",avatar:e.cosmetic?.avatar?[...e.cosmetic.avatar]:[]},emote:{type:e.emoteData?.emoteType??-1},coins:a?.coinsCount??0,inventory:a?.inventory??null,shopPurchases:a?.shopPurchases??null,garden:a?.garden??null,pets:{slots:a?.petSlots??[],slotInfos:o?.petSlotInfos??null},journal:a?.journal??null,stats:a?.stats??null,tasksCompleted:a?.tasksCompleted??[],activityLogs:a?.activityLogs??[],customRestocks:{config:a?.customRestocks??null,inventories:o?.customRestockInventories??null},lastAction:i?{type:i.action,data:i.data,timestamp:i.timestamp}:null,selectedItemIndex:o?.notAuthoritative_selectedItemIndex??null,lastSlotMachineInfo:o?.lastSlotMachineInfo??null}}function Ms(e){const t=e.players,n=e.hostPlayerId??"",r=e.userSlots??[],o=e.myUserSlotIndex;if(!t||!Array.isArray(t)||t.length===0)return Sa;const a=new Map;Array.isArray(r)&&r.forEach((d,l)=>{d?.type==="user"&&d?.playerId&&a.set(d.playerId,{slot:d,index:l});});const i=t.map(d=>Wx(d,n,a)),s=i.find(d=>d.isHost)??null,c=o!==null?i.find(d=>d.slotIndex===o)??null:null;return {all:i,host:s,myPlayer:c,count:i.length}}function Ls(e){const t=e.all.map(n=>`${n.id}:${n.isConnected}:${n.isHost}`);return JSON.stringify({playerKeys:t,hostId:e.host?.id??null,count:e.count})}function Ux(e,t){const n=[],r=new Set(e.map(a=>a.id)),o=new Set(t.map(a=>a.id));for(const a of t)r.has(a.id)||n.push({player:a,type:"join"});for(const a of e)o.has(a.id)||n.push({player:a,type:"leave"});return n}function Vx(e,t){const n=[],r=new Map(e.map(o=>[o.id,o]));for(const o of t){const a=r.get(o.id);a&&a.isConnected!==o.isConnected&&n.push({player:o,isConnected:o.isConnected});}return n}function Xx(){let e=Sa,t=Sa,n=false;const r=[],o={all:new Set,stable:new Set,joinLeave:new Set,connection:new Set,host:new Set},a={},i=new Set,s=4;function c(){if(i.size<s)return;const l=Ms(a);if(ft(e,l)||(t=e,e=l,!n))return;for(const b of o.all)b(e,t);if(Ls(t)!==Ls(e))for(const b of o.stable)b(e,t);const u=Ux(t.all,e.all);for(const b of u)for(const h of o.joinLeave)h(b);const p=Vx(t.all,e.all);for(const b of p)for(const h of o.connection)h(b);const f=t.host?.id??null,g=e.host?.id??null;if(f!==g){const b={current:e.host,previous:t.host};for(const h of o.host)h(b);}}async function d(){if(n)return;const l=await ag.onChangeNow(g=>{a.players=g,i.add("players"),c();});r.push(l);const u=await ig.onChangeNow(g=>{a.hostPlayerId=g,i.add("hostPlayerId"),c();});r.push(u);const p=await og.onChangeNow(g=>{a.userSlots=g,i.add("userSlots"),c();});r.push(p);const f=await ge.subscribe("myUserSlotIdxAtom",g=>{a.myUserSlotIndex=g,i.add("myUserSlotIndex"),c();});r.push(f),n=true,i.size===s&&(e=Ms(a));}return d(),{get(){return e},subscribe(l,u){return o.all.add(l),u?.immediate!==false&&n&&i.size===s&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,u){return o.stable.add(l),u?.immediate!==false&&n&&i.size===s&&l(e,e),()=>o.stable.delete(l)},subscribeJoinLeave(l,u){if(o.joinLeave.add(l),u?.immediate&&n&&i.size===s)for(const p of e.all)l({player:p,type:"join"});return ()=>o.joinLeave.delete(l)},subscribeConnection(l,u){if(o.connection.add(l),u?.immediate&&n&&i.size===s)for(const p of e.all)l({player:p,isConnected:p.isConnected});return ()=>o.connection.delete(l)},subscribeHost(l,u){return o.host.add(l),u?.immediate&&n&&i.size===s&&l({current:e.host,previous:e.host}),()=>o.host.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.joinLeave.clear(),o.connection.clear(),o.host.clear(),n=false;}}}let jo=null;function Qc(){return jo||(jo=Xx()),jo}const rr=["seed","tool","egg","decor"];function Kx(e,t){switch(t){case "seed":return e.species??e.itemType;case "tool":return e.toolId??e.itemType;case "egg":return e.eggId??e.itemType;case "decor":return e.decorId??e.itemType;default:return e.itemType}}function Yx(e,t,n){const r=Kx(e,t),o=n[r]??0,a=Math.max(0,e.initialStock-o);return {id:r,itemType:e.itemType,initialStock:e.initialStock,purchased:o,remaining:a,isAvailable:a>0}}function qx(e,t,n){if(!t)return {type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null};const o=n[e]?.purchases??{},a=(t.inventory??[]).map(d=>Yx(d,e,o)),i=a.filter(d=>d.isAvailable).length,s=t.secondsUntilRestock??0,c=s>0?Date.now()+s*1e3:null;return {type:e,items:a,availableCount:i,totalCount:a.length,secondsUntilRestock:s,restockAt:c}}function Rs(e){const t=e.shops,n=e.purchases??{},r=rr.map(s=>qx(s,t?.[s],n)),o={seed:r[0],tool:r[1],egg:r[2],decor:r[3]},a=r.filter(s=>s.restockAt!==null);let i=null;if(a.length>0){const c=a.sort((d,l)=>(d.restockAt??0)-(l.restockAt??0))[0];i={shop:c.type,seconds:c.secondsUntilRestock,at:c.restockAt};}return {all:r,byType:o,nextRestock:i}}const Fs={all:rr.map(e=>({type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null})),byType:{seed:{type:"seed",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},tool:{type:"tool",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},egg:{type:"egg",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},decor:{type:"decor",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null}},nextRestock:null};function Ns(e){return JSON.stringify({shops:e.all.map(t=>({type:t.type,itemCount:t.items.length,availableCount:t.availableCount}))})}function Jx(e,t){const n=e.secondsUntilRestock,r=t.secondsUntilRestock;return n>0&&n<=5&&r>n||n>0&&r===0&&t.items.some(a=>a.purchased===0)?{shop:t,previousItems:e.items}:null}function Qx(e,t){const n=[];for(const r of rr){const o=e.byType[r],a=t.byType[r],i=new Map(o.items.map(s=>[s.id,s]));for(const s of a.items){const c=i.get(s.id);c&&s.purchased>c.purchased&&n.push({shopType:r,itemId:s.id,quantity:s.purchased-c.purchased,newPurchased:s.purchased,remaining:s.remaining});}}return n}function Zx(e,t){const n=[];for(const r of rr){const o=e.byType[r],a=t.byType[r],i=new Map(o.items.map(s=>[s.id,s]));for(const s of a.items){const c=i.get(s.id);c&&c.isAvailable!==s.isAvailable&&n.push({shopType:r,itemId:s.id,wasAvailable:c.isAvailable,isAvailable:s.isAvailable});}}return n}function ey(){let e=Fs,t=Fs,n=false;const r=[],o={all:new Set,stable:new Set,seedRestock:new Set,toolRestock:new Set,eggRestock:new Set,decorRestock:new Set,purchase:new Set,availability:new Set},a={},i=new Set,s=2;function c(){if(i.size<s)return;const l=Rs(a);if(ft(e,l)||(t=e,e=l,!n))return;for(const g of o.all)g(e,t);if(Ns(t)!==Ns(e))for(const g of o.stable)g(e,t);const u={seed:o.seedRestock,tool:o.toolRestock,egg:o.eggRestock,decor:o.decorRestock};for(const g of rr){const b=Jx(t.byType[g],e.byType[g]);if(b)for(const h of u[g])h(b);}const p=Qx(t,e);for(const g of p)for(const b of o.purchase)b(g);const f=Zx(t,e);for(const g of f)for(const b of o.availability)b(g);}async function d(){if(n)return;const l=await lg.onChangeNow(p=>{a.shops=p,i.add("shops"),c();});r.push(l);const u=await cg.onChangeNow(p=>{a.purchases=p,i.add("purchases"),c();});r.push(u),n=true,i.size===s&&(e=Rs(a));}return d(),{get(){return e},getShop(l){return e.byType[l]},getItem(l,u){return e.byType[l].items.find(f=>f.id===u)??null},subscribe(l,u){return o.all.add(l),u?.immediate!==false&&n&&i.size===s&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,u){return o.stable.add(l),u?.immediate!==false&&n&&i.size===s&&l(e,e),()=>o.stable.delete(l)},subscribeSeedRestock(l,u){return o.seedRestock.add(l),u?.immediate&&n&&i.size===s&&l({shop:e.byType.seed,previousItems:[]}),()=>o.seedRestock.delete(l)},subscribeToolRestock(l,u){return o.toolRestock.add(l),u?.immediate&&n&&i.size===s&&l({shop:e.byType.tool,previousItems:[]}),()=>o.toolRestock.delete(l)},subscribeEggRestock(l,u){return o.eggRestock.add(l),u?.immediate&&n&&i.size===s&&l({shop:e.byType.egg,previousItems:[]}),()=>o.eggRestock.delete(l)},subscribeDecorRestock(l,u){return o.decorRestock.add(l),u?.immediate&&n&&i.size===s&&l({shop:e.byType.decor,previousItems:[]}),()=>o.decorRestock.delete(l)},subscribePurchase(l,u){if(o.purchase.add(l),u?.immediate&&n&&i.size===s)for(const p of e.all)for(const f of p.items)f.purchased>0&&l({shopType:p.type,itemId:f.id,quantity:f.purchased,newPurchased:f.purchased,remaining:f.remaining});return ()=>o.purchase.delete(l)},subscribeAvailability(l,u){if(o.availability.add(l),u?.immediate&&n&&i.size===s)for(const p of e.all)for(const f of p.items)l({shopType:p.type,itemId:f.id,wasAvailable:f.isAvailable,isAvailable:f.isAvailable});return ()=>o.availability.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.seedRestock.clear(),o.toolRestock.clear(),o.eggRestock.clear(),o.decorRestock.clear(),o.purchase.clear(),o.availability.clear(),n=false;}}}let Ho=null;function ty(){return Ho||(Ho=ey()),Ho}const ny=["Sunny","Rain","Frost","Dawn","AmberMoon"];function ry(e){return ny.includes(e)}const ka={type:"Sunny",isActive:false,startTime:null,endTime:null,remainingSeconds:0};function oy(e){if(!e)return ka;const t=Date.now(),n=e.endTime??0,r=Math.max(0,n-t),o=Math.floor(r/1e3),a=o>0,i=e.type??"Sunny";return {type:ry(i)?i:"Sunny",isActive:a,startTime:e.startTime??null,endTime:e.endTime??null,remainingSeconds:o}}function ay(){let e=ka,t=ka,n=false,r=null;const o={all:new Set,change:new Set};function a(s){const c=oy(s);if(e.type===c.type&&e.isActive===c.isActive&&e.startTime===c.startTime&&e.endTime===c.endTime){e=c;return}if(t=e,e=c,!!n){for(const d of o.all)d(e,t);if(t.type!==e.type||t.isActive!==e.isActive){const d={current:e,previous:t};for(const l of o.change)l(d);}}}async function i(){n||(r=await dg.onChangeNow(s=>{a(s);}),n=true);}return i(),{get(){return e},subscribe(s,c){return o.all.add(s),c?.immediate!==false&&n&&s(e,e),()=>o.all.delete(s)},subscribeChange(s,c){return o.change.add(s),c?.immediate&&n&&s({current:e,previous:e}),()=>o.change.delete(s)},destroy(){r?.(),r=null,o.all.clear(),o.change.clear(),n=false;}}}let Wo=null;function iy(){return Wo||(Wo=ay()),Wo}let Me=null;function Zc(){return Me||(Me={currentTile:dx(),myPets:fn(),gameMap:va(),myInventory:Gt(),players:Qc(),shops:ty(),weather:iy(),myGarden:Jc()},Me)}function mt(){if(!Me)throw new Error("[Globals] Not initialized. Call initGlobals() first.");return Me}function sy(){Me&&(Me.currentTile.destroy(),Me.myPets.destroy(),Me.gameMap.destroy(),Me.myInventory.destroy(),Me.players.destroy(),Me.shops.destroy(),Me.weather.destroy(),Me.myGarden.destroy(),Me=null);}const ve={get currentTile(){return mt().currentTile},get myPets(){return mt().myPets},get gameMap(){return mt().gameMap},get myInventory(){return mt().myInventory},get players(){return mt().players},get shops(){return mt().shops},get weather(){return mt().weather},get myGarden(){return mt().myGarden}},ly=100,Nn=[];let Ca=null;function cy(){const e=m("div",{className:"ws-logger",style:"display: flex; flex-direction: column; gap: 8px; font-family: monospace; font-size: 11px; height: 100%; overflow: hidden;"}),t=m("div",{style:"display: flex; justify-content: space-between; align-items: center; padding: 0 4px;"});t.appendChild(m("span",{textContent:"Live Traffic (Last 100)",style:"opacity: 0.6;"}));const n=m("button",{textContent:"Clear",style:"background: none; border: 1px solid rgba(255,255,255,0.2); color: #fff; cursor: pointer; padding: 2px 8px; border-radius: 4px; font-size: 10px;",onclick:()=>{Nn.length=0,i();}});t.appendChild(n),e.appendChild(t);const r=m("div",{style:"flex: 1; overflow-y: auto; background: #000; padding: 4px; border-radius: 4px; border: 1px solid var(--border-color); display: flex; flex-direction: column;"}),o=m("div",{style:"height: 150px; border-top: 1px solid var(--border-color); overflow: auto; background: rgba(0,0,0,0.5); padding: 8px; display: none;"}),a=m("pre",{style:"margin: 0; color: var(--color-primary); font-size: 10px;"});o.appendChild(a);const i=()=>{r.innerHTML="",Nn.slice().reverse().forEach(s=>{const c=m("div",{className:"ws-log-row",style:`padding: 4px; border-bottom: 1px solid #111; cursor: pointer; color: ${s.direction==="in"?"#4CAF50":"#2196F3"}; display: flex; gap: 8px;`}),d=new Date(s.timestamp).toLocaleTimeString([],{hour12:false,hour:"2-digit",minute:"2-digit",second:"2-digit"});c.appendChild(m("span",{textContent:d,style:"opacity: 0.4; flex-shrink: 0;"})),c.appendChild(m("strong",{textContent:s.direction.toUpperCase(),style:"width: 25px; flex-shrink: 0;"})),c.appendChild(m("span",{textContent:s.type,style:"font-weight: bold; flex-shrink: 0;"})),c.appendChild(m("span",{textContent:s.summary,style:"opacity: 0.8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"})),c.addEventListener("click",()=>{r.querySelectorAll(".ws-log-row").forEach(u=>u.style.background=""),c.style.background="rgba(255,255,255,0.1)",o.style.display="block",a.textContent=JSON.stringify(s.payload,null,2);}),r.appendChild(c);});};return Ca=i,e.appendChild(r),e.appendChild(o),i(),e}function Ta(e,t,n){let r="";if(n&&typeof n=="object"){if(t==="PartialState"){const o=n.op||"",a=n.path||"";let i="";if("value"in n){const s=n.value;i=typeof s=="object"?`{${Object.keys(s||{}).slice(0,2).join(",")}}`:String(s);}if(o||a)r=`PartialState : ${o} ${a} ${i}`.trim();else {const s=Object.keys(n).filter(c=>c!=="type");s.length>0&&(r=`PartialState - {${s.join(", ")}}`);}}if(!r&&n.event&&(r+=`${n.event} `),!r&&n.op&&(r+=`op:${n.op} `),!r&&n.data){const o=Object.keys(n.data);o.length>0&&(r+=`{${o.slice(0,3).join(",")}${o.length>3?"...":""}}`);}else !r&&Array.isArray(n)&&(r+=`[${n.length} items]`);}else typeof n=="string"&&(r=n.slice(0,50));Nn.push({direction:e,type:String(t),timestamp:Date.now(),payload:n,summary:r.trim()||"-"}),Nn.length>ly&&Nn.shift(),Ca&&Ca();}const ze={nativeCtor:null,captured:[],latestOpen:null},Os=Symbol.for("ariesmod.ws.capture.wrapped"),Bs=Symbol.for("ariesmod.ws.capture.native"),ed=1;function Pa(e){return !!e&&e.readyState===ed}function dy(){if(Pa(ze.latestOpen))return ze.latestOpen;for(let e=ze.captured.length-1;e>=0;e--){const t=ze.captured[e];if(Pa(t))return t}return null}function uy(e,t){ze.captured.push(e),ze.captured.length>25&&ze.captured.splice(0,ze.captured.length-25);const n=()=>{ze.latestOpen=e,t&&console.log("[WS] captured socket opened",e.url);};e.addEventListener("open",n),e.addEventListener("close",()=>{ze.latestOpen===e&&(ze.latestOpen=null),t&&console.log("[WS] captured socket closed",e.url);}),e.addEventListener("message",r=>{try{const o=JSON.parse(r.data);Ta("in",o.type||"unknown",o);}catch{Ta("in","raw",r.data);}}),e.readyState===ed&&n();}function py(e=O,t={}){const n=!!t.debug,r=e?.WebSocket;if(typeof r!="function")return ()=>{};if(r[Os])return ze.nativeCtor=r[Bs]??ze.nativeCtor??null,()=>{};const o=r;ze.nativeCtor=o;function a(i,s){const c=s!==void 0?new o(i,s):new o(i);try{uy(c,n);}catch{}return c}try{a.prototype=o.prototype;}catch{}try{Object.setPrototypeOf(a,o);}catch{}try{a.CONNECTING=o.CONNECTING,a.OPEN=o.OPEN,a.CLOSING=o.CLOSING,a.CLOSED=o.CLOSED;}catch{}a[Os]=true,a[Bs]=o;try{e.WebSocket=a,n&&console.log("[WS] WebSocket capture installed");}catch{return ()=>{}}return ()=>{try{e.WebSocket===a&&(e.WebSocket=o);}catch{}}}function fy(e=O){const t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function ao(e=O){const t=dy();if(t)return {ws:t,source:"captured"};const n=fy(e);return n?{ws:n,source:"roomConnection"}:{ws:null,source:null}}function td(e,t={}){const n=t.pageWindow??O,r=t.intervalMs??500,o=!!t.debug;let a=null,i=null;const s=()=>{const d=ao(n);(d.ws!==a||d.source!==i)&&(a=d.ws,i=d.source,o&&console.log("[WS] best socket changed:",d.source,d.ws),e(d));};s();const c=setInterval(s,r);return ()=>clearInterval(c)}function gy(e){if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return null}}function my(e,t=O){const n=t?.MagicCircle_RoomConnection;if(n&&typeof n.sendMessage=="function")try{return Array.isArray(e)?n.sendMessage(...e):n.sendMessage(e),{ok:!0}}catch(a){return {ok:false,reason:"error",error:a}}const{ws:r}=ao(t);if(!r)return {ok:false,reason:"no-ws"};if(!Pa(r))return {ok:false,reason:"not-open"};const o=gy(e);if(o==null)return {ok:false,reason:"error",error:new Error("Cannot stringify message")};try{const a=JSON.parse(o);Ta("out",a.type||"unknown",a);}catch{}try{return r.send(o),{ok:!0}}catch(a){return {ok:false,reason:"error",error:a}}}function hy(e,t={},n=O){return my({type:e,...t},n)}const xt={Welcome:"Welcome",PartialState:"PartialState",ServerErrorMessage:"ServerErrorMessage",Config:"Config",InappropriateContentRejected:"InappropriateContentRejected",Emote:"Emote",CurrencyTransaction:"CurrencyTransaction",Pong:"Pong"},N={Chat:"Chat",Emote:"Emote",Wish:"Wish",KickPlayer:"KickPlayer",SetPlayerData:"SetPlayerData",UsurpHost:"UsurpHost",Dev:"Dev",SetSelectedGame:"SetSelectedGame",VoteForGame:"VoteForGame",RequestGame:"RequestGame",RestartGame:"RestartGame",Ping:"Ping",PlayerPosition:"PlayerPosition",Teleport:"Teleport",CheckWeatherStatus:"CheckWeatherStatus",MoveInventoryItem:"MoveInventoryItem",DropObject:"DropObject",PickupObject:"PickupObject",ToggleFavoriteItem:"ToggleFavoriteItem",PutItemInStorage:"PutItemInStorage",RetrieveItemFromStorage:"RetrieveItemFromStorage",MoveStorageItem:"MoveStorageItem",LogItems:"LogItems",PlantSeed:"PlantSeed",WaterPlant:"WaterPlant",HarvestCrop:"HarvestCrop",SellAllCrops:"SellAllCrops",PurchaseSeed:"PurchaseSeed",PurchaseEgg:"PurchaseEgg",PurchaseTool:"PurchaseTool",PurchaseDecor:"PurchaseDecor",PlantEgg:"PlantEgg",HatchEgg:"HatchEgg",PlantGardenPlant:"PlantGardenPlant",PotPlant:"PotPlant",MutationPotion:"MutationPotion",PickupDecor:"PickupDecor",PlaceDecor:"PlaceDecor",RemoveGardenObject:"RemoveGardenObject",PlacePet:"PlacePet",FeedPet:"FeedPet",PetPositions:"PetPositions",SwapPet:"SwapPet",StorePet:"StorePet",NamePet:"NamePet",SellPet:"SellPet",ReportSpeakingStart:"ReportSpeakingStart"};var ot=(e=>(e[e.ReconnectInitiated=4100]="ReconnectInitiated",e[e.PlayerLeftVoluntarily=4200]="PlayerLeftVoluntarily",e[e.UserSessionSuperseded=4250]="UserSessionSuperseded",e[e.ConnectionSuperseded=4300]="ConnectionSuperseded",e[e.ServerDisposed=4310]="ServerDisposed",e[e.HeartbeatExpired=4400]="HeartbeatExpired",e[e.PlayerKicked=4500]="PlayerKicked",e[e.VersionMismatch=4700]="VersionMismatch",e[e.VersionExpired=4710]="VersionExpired",e[e.AuthenticationFailure=4800]="AuthenticationFailure",e))(ot||{});new Set(Object.values(xt));new Set(Object.values(N));const by=["Room","Quinoa"],xy={Room:["Room"],Quinoa:by};function te(e,t={},n=O){const r=t,{scopePath:o,scope:a,...i}=r,s=typeof o=="string"?o:a,c=Array.isArray(o)?o:s==="Room"||s==="Quinoa"?xy[s]:null;return hy(e,c?{scopePath:c,...i}:i,n)}function yy(e,t=O){return te(N.Chat,{scope:"Room",message:e},t)}function vy(e,t=O){return te(N.Emote,{scope:"Room",emoteType:e},t)}function wy(e,t=O){return te(N.Wish,{scope:"Quinoa",wish:e},t)}function Sy(e,t=O){return te(N.KickPlayer,{scope:"Room",playerId:e},t)}function ky(e,t=O){return te(N.SetPlayerData,{scope:"Room",data:e},t)}function Cy(e=O){return te(N.UsurpHost,{scope:"Quinoa"},e)}function Ty(e=O){return te(N.ReportSpeakingStart,{scope:"Quinoa"},e)}function Py(e,t=O){return te(N.SetSelectedGame,{scope:"Room",gameId:e},t)}function Ay(e,t=O){return te(N.VoteForGame,{scope:"Room",gameId:e},t)}function Iy(e,t=O){return te(N.RequestGame,{scope:"Room",gameId:e},t)}function _y(e=O){return te(N.RestartGame,{scope:"Room"},e)}function Ey(e,t=O){return te(N.Ping,{scope:"Quinoa",id:e},t)}function nd(e,t,n=O){return te(N.PlayerPosition,{scope:"Quinoa",x:e,y:t},n)}const My=nd;function Ly(e,t,n=O){return te(N.Teleport,{scope:"Quinoa",x:e,y:t},n)}function Ry(e=O){return te(N.CheckWeatherStatus,{scope:"Quinoa"},e)}function Fy(e,t,n=O){return te(N.MoveInventoryItem,{scope:"Quinoa",fromIndex:e,toIndex:t},n)}function Ny(e,t=O){return te(N.DropObject,{scope:"Quinoa",slotIndex:e},t)}function Oy(e,t=O){return te(N.PickupObject,{scope:"Quinoa",objectId:e},t)}function ko(e,t=O){return te(N.ToggleFavoriteItem,{scope:"Quinoa",itemId:e},t)}function Ai(e,t="PetHutch",n=O){return te(N.PutItemInStorage,{scope:"Quinoa",itemId:e,storageId:t},n)}function Ii(e,t="PetHutch",n=O){return te(N.RetrieveItemFromStorage,{scope:"Quinoa",itemId:e,storageId:t},n)}function By(e,t,n=O){return te(N.MoveStorageItem,{scope:"Quinoa",fromIndex:e,toIndex:t},n)}function $y(e=O){return te(N.LogItems,{scope:"Quinoa"},e)}function Dy(e,t,n,r=O){return te(N.PlantSeed,{scope:"Quinoa",seedId:e,x:t,y:n},r)}function zy(e,t=O){return te(N.WaterPlant,{scope:"Quinoa",plantId:e},t)}function Gy(e,t=O){return te(N.HarvestCrop,{scope:"Quinoa",cropId:e},t)}function jy(e=O){return te(N.SellAllCrops,{scope:"Quinoa"},e)}function Hy(e,t=O){return te(N.PurchaseDecor,{scope:"Quinoa",decorId:e},t)}function Wy(e,t=O){return te(N.PurchaseEgg,{scope:"Quinoa",eggId:e},t)}function Uy(e,t=O){return te(N.PurchaseTool,{scope:"Quinoa",toolId:e},t)}function Vy(e,t=O){return te(N.PurchaseSeed,{scope:"Quinoa",seedId:e},t)}function Xy(e,t,n,r=O){return te(N.PlantEgg,{scope:"Quinoa",eggId:e,x:t,y:n},r)}function Ky(e,t=O){return te(N.HatchEgg,{scope:"Quinoa",eggId:e},t)}function Yy(e,t,n,r=O){return te(N.PlantGardenPlant,{scope:"Quinoa",plantId:e,x:t,y:n},r)}function qy(e,t,n=O){return te(N.PotPlant,{scope:"Quinoa",plantId:e,potId:t},n)}function Jy(e,t,n=O){return te(N.MutationPotion,{scope:"Quinoa",potionId:e,targetId:t},n)}function Qy(e,t=O){return te(N.PickupDecor,{scope:"Quinoa",decorInstanceId:e},t)}function Zy(e,t,n,r=O){return te(N.PlaceDecor,{scope:"Quinoa",decorId:e,x:t,y:n},r)}function ev(e,t=O){return te(N.RemoveGardenObject,{scope:"Quinoa",objectId:e},t)}function rd(e,t={x:0,y:0},n="Dirt",r=0,o=O){return te(N.PlacePet,{scope:"Quinoa",itemId:e,position:t,tileType:n,localTileIndex:r},o)}function tv(e,t,n=O){return te(N.FeedPet,{scope:"Quinoa",petId:e,foodItemId:t},n)}function nv(e,t=O){return te(N.PetPositions,{scope:"Quinoa",positions:e},t)}function od(e,t,n=O){return te(N.SwapPet,{scope:"Quinoa",petSlotId:e,petInventoryId:t},n)}function ad(e,t=O){return te(N.StorePet,{scope:"Quinoa",itemId:e},t)}function rv(e,t,n=O){return te(N.NamePet,{scope:"Quinoa",petId:e,name:t},n)}function ov(e,t=O){return te(N.SellPet,{scope:"Quinoa",petId:e},t)}let Ur=null;const On=new Set;function Aa(){const e=Ot();if(!e.enabled){console.log("[AutoFavorite] Disabled");return}On.clear(),Ur=Gt().subscribeItems(t=>{if(t.added.length>0){const n=Ot();for(const r of t.added)iv(r,n);}}),console.log(`✅ [AutoFavorite] Started - Watching ${e.simple.favoriteSpecies.length} species, ${e.simple.favoriteMutations.length} mutations`);}function id(){Ur&&(Ur(),Ur=null),On.clear(),console.log("🛑 [AutoFavorite] Stopped");}function av(e){const t=Ot();t.enabled=e,t.simple.enabled=e,Yc(t),e?Aa():id();}function iv(e,t){if(e.itemType!=="Produce"&&e.itemType!=="Pet")return;if(!e.id){console.warn("[AutoFavorite] Item has no ID:",e);return}if(!(On.has(e.id)||e.isFavorited||e.favorited)&&sd(e,t.simple)){On.add(e.id);try{ko(e.id),console.log(`[AutoFavorite] ⭐ Favorited ${e.itemType}: ${e.species||e.id}`);}catch(r){console.error("[AutoFavorite] WebSocket error:",r),On.delete(e.id);}}}function sd(e,t){if(!t.enabled)return  false;const n=e.itemType==="Pet"?e.petSpecies:e.species;return n?!!(t.favoriteSpecies.includes(n)||t.favoriteMutations.length>0&&(e.mutations||[]).some(o=>t.favoriteMutations.includes(o))):false}function sv(){return Object.keys(oe.get("mutations")??{})}const _i={init(){this.isReady()||Aa();},isReady(){return fs()},DEFAULT_CONFIG:Kc,STORAGE_KEY:Ci,loadConfig:Ot,saveConfig:Ti,updateConfig:Yc,updateSimpleConfig:Pi,setFavoriteSpecies:Zb,setFavoriteMutations:ex,isEnabled:fs,start:Aa,stop:id,setEnabled:av,shouldFavorite:sd,getGameMutations:sv},Ei=$e.JOURNAL_CHECKER,ld={enabled:false,autoRefresh:true,refreshIntervalMs:3e4};function gn(){return ke(Ei,ld)}function Co(e){Ge(Ei,e);}function $s(){return gn().enabled}function lv(e){const t=gn();t.autoRefresh=e,Co(t);}function cv(e){const t=gn();t.refreshIntervalMs=e,Co(t);}let Uo=null,Ds=null;function cd(){try{return Qc().get().myPlayer?.journal||null}catch{return null}}function dv(e){return e?`pro:${Object.keys(e.produce).length}-pet:${Object.keys(e.pets).length}`:"null"}function dd(){const e=oe.get("mutations")??{};return ["Normal",...Object.keys(e),"Max Weight"]}function ud(){const e=oe.get("mutations")??{};return ["Normal",...Object.entries(e).filter(([n,r])=>!("tileRef"in r)).map(([n])=>n),"Max Weight"]}function uv(){return Object.keys(oe.get("mutations")??{})}function pd(e){const n=(oe.get("pets")??{})[e];if(!n)return [];const r=new Set;return Array.isArray(n.abilities)&&n.abilities.forEach(o=>r.add(o)),Array.isArray(n.possibleAbilities)&&n.possibleAbilities.forEach(o=>r.add(o)),n.abilityTiers&&Object.values(n.abilityTiers).forEach(o=>{Array.isArray(o)&&o.forEach(a=>r.add(a));}),[...r]}function fd(e){const t=oe.get("plants")??{},n=Object.keys(t),r=dd(),o=e?.produce??{},a=[];let i=0;for(const d of n){const u=o[d]?.variantsLogged?.map(f=>f.variant)??[],p=r.filter(f=>!u.includes(f));i+=u.length,a.push({species:d,variantsLogged:u,variantsMissing:p,variantsTotal:r.length,variantsPercentage:r.length>0?u.length/r.length*100:0,isComplete:p.length===0});}const s=n.length*r.length,c=a.filter(d=>d.variantsLogged.length>0).length;return {total:n.length,logged:c,percentage:n.length>0?c/n.length*100:0,speciesDetails:a,variantsTotal:s,variantsLogged:i,variantsPercentage:s>0?i/s*100:0}}function gd(e){const t=oe.get("pets")??{},n=Object.keys(t),r=ud(),o=e?.pets??{},a=[];let i=0,s=0,c=0,d=0;for(const u of n){const p=o[u],f=p?.variantsLogged?.map(k=>k.variant)??[],g=p?.abilitiesLogged?.map(k=>k.ability)??[],b=r.filter(k=>!f.includes(k)),h=pd(u),x=h.filter(k=>!g.includes(k));s+=r.length,i+=f.length,d+=h.length,c+=Math.min(g.length,h.length),a.push({species:u,variantsLogged:f,variantsMissing:b,variantsTotal:r.length,variantsPercentage:r.length>0?f.length/r.length*100:0,abilitiesLogged:g,abilitiesMissing:x,abilitiesTotal:h.length,abilitiesPercentage:h.length>0?g.length/h.length*100:0,isComplete:b.length===0&&(h.length===0||x.length===0)});}const l=a.filter(u=>u.variantsLogged.length>0).length;return {total:n.length,logged:l,percentage:n.length>0?l/n.length*100:0,speciesDetails:a,variantsTotal:s,variantsLogged:i,variantsPercentage:s>0?i/s*100:0,abilitiesTotal:d,abilitiesLogged:c,abilitiesPercentage:d>0?c/d*100:0}}async function To(e=false){await oe.waitForAny();const t=cd(),n=dv(t);if(!e&&Uo&&n===Ds)return Uo;const r={plants:fd(t),pets:gd(t),lastUpdated:Date.now()};return Uo=r,Ds=n,r}async function pv(){const e=await To();return {plants:e.plants.speciesDetails.filter(t=>t.variantsMissing.length>0).map(t=>({species:t.species,missing:t.variantsMissing})),pets:e.pets.speciesDetails.filter(t=>t.variantsMissing.length>0||(t.abilitiesMissing?.length??0)>0).map(t=>({species:t.species,missingVariants:t.variantsMissing,missingAbilities:t.abilitiesMissing??[]}))}}let Bn=null;function Ia(){const e=gn();e.enabled&&(e.autoRefresh&&!Bn&&(Bn=setInterval(async()=>{const t=await To();Mi(t);},e.refreshIntervalMs)),console.log("✅ [JournalChecker] Started"));}function md(){Bn&&(clearInterval(Bn),Bn=null);}function fv(e){const t=gn();t.enabled=e,Co(t),e?Ia():md();}function Mi(e){window.dispatchEvent(new CustomEvent("gemini:journal-updated",{detail:e}));}async function gv(){const e=await To();return Mi(e),e}const hd={init(){this.isReady()||Ia();},isReady(){return $s()},DEFAULT_CONFIG:ld,STORAGE_KEY:Ei,loadConfig:gn,saveConfig:Co,isEnabled:$s,setAutoRefresh:lv,setRefreshInterval:cv,getMyJournal:cd,getCropVariants:dd,getPetVariants:ud,getAllMutations:uv,getPetAbilities:pd,calculateProduceProgress:fd,calculatePetProgress:gd,aggregateJournalProgress:To,getMissingSummary:pv,start:Ia,stop:md,setEnabled:fv,refresh:gv,dispatchUpdate:Mi},Li=$e.BULK_FAVORITE,bd={enabled:false,position:"top-right"};function or(){return ke(Li,bd)}function xd(e){Ge(Li,e);}function mv(e){const t=or();t.position=e,xd(t);}function yd(){return or().enabled}function hv(e){return typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"}async function bv(e){const t=Gt().get();if(!t?.items)return console.warn("[BulkFavorite] No inventory data available"),0;const n=new Set(t.favoritedItemIds??[]);let r=0;for(const o of t.items){if(!hv(o))continue;const a=n.has(o.id);e&&a||!e&&!a||(await ko(o.id,e),r++,await xv(50));}return console.log(`[BulkFavorite] ${e?"Favorited":"Unfavorited"} ${r} items`),r}function xv(e){return new Promise(t=>setTimeout(t,e))}let kr=false;const io={init(){kr||(kr=true,console.log("✅ [MGBulkFavorite] Feature initialized"));},isReady(){return kr},DEFAULT_CONFIG:bd,STORAGE_KEY:Li,loadConfig:or,saveConfig:xd,isEnabled:yd,setPosition:mv,bulkFavorite:bv,destroy(){kr=false;}};class yv{constructor(){W(this,"achievements",new Map);W(this,"data");W(this,"STORAGE_KEY",$e.ACHIEVEMENTS);W(this,"onUnlockCallbacks",[]);W(this,"onProgressCallbacks",[]);this.data=this.loadData();}loadData(){return ke(this.STORAGE_KEY,{unlocked:{},progress:{}})}saveData(){Ge(this.STORAGE_KEY,this.data);}register(t){this.achievements.set(t.id,t),this.data.progress[t.id]||(this.data.progress[t.id]={current:0,target:t.target,percentage:0});}registerMany(t){for(const n of t)this.register(n);}async checkAchievement(t){const n=this.achievements.get(t);if(!n)throw new Error(`Achievement not found: ${t}`);const r=this.isUnlocked(t),o=await n.checkProgress(),a={current:o,target:n.target,percentage:Math.min(100,Math.floor(o/n.target*100))},i=this.data.progress[t];this.data.progress[t]=a;const s=o>=n.target;return !r&&s?this.unlock(t,a):s||this.triggerProgressCallbacks({achievement:n,progress:a,previousProgress:i}),this.saveData(),{id:t,wasUnlocked:r,isUnlocked:s,progress:a}}async checkAllAchievements(){const t=[];for(const n of this.achievements.keys()){const r=await this.checkAchievement(n);t.push(r);}return t}unlock(t,n){const r=this.achievements.get(t);if(!r)return;const o={achievementId:t,unlockedAt:Date.now(),progress:n};this.data.unlocked[t]=o,this.saveData(),this.triggerUnlockCallbacks({achievement:r,unlockedAt:o.unlockedAt,progress:n});}isUnlocked(t){return !!this.data.unlocked[t]}getAchievement(t){return this.achievements.get(t)||null}getAllAchievements(){return Array.from(this.achievements.values())}getAchievementsByCategory(t){return Array.from(this.achievements.values()).filter(n=>n.category===t)}getAchievementsByRarity(t){return Array.from(this.achievements.values()).filter(n=>n.rarity===t)}getUnlockedAchievements(){return Object.values(this.data.unlocked)}getLockedAchievements(){return Array.from(this.achievements.values()).filter(t=>!this.isUnlocked(t.id)&&!t.hidden)}getProgress(t){return this.data.progress[t]||null}getCompletionPercentage(){const t=this.achievements.size,n=Object.keys(this.data.unlocked).length;return t>0?Math.floor(n/t*100):0}getCompletionStats(){const t=this.achievements.size,n=Object.keys(this.data.unlocked).length,r=t-n,o=this.getCompletionPercentage();return {total:t,unlocked:n,locked:r,percentage:o}}onUnlock(t){return this.onUnlockCallbacks.push(t),()=>{const n=this.onUnlockCallbacks.indexOf(t);n!==-1&&this.onUnlockCallbacks.splice(n,1);}}onProgress(t){return this.onProgressCallbacks.push(t),()=>{const n=this.onProgressCallbacks.indexOf(t);n!==-1&&this.onProgressCallbacks.splice(n,1);}}triggerUnlockCallbacks(t){for(const n of this.onUnlockCallbacks)try{n(t);}catch(r){console.warn("[Achievements] Unlock callback error:",r);}}triggerProgressCallbacks(t){for(const n of this.onProgressCallbacks)try{n(t);}catch(r){console.warn("[Achievements] Progress callback error:",r);}}reset(){this.data={unlocked:{},progress:{}};for(const t of this.achievements.values())this.data.progress[t.id]={current:0,target:t.target,percentage:0};this.saveData();}exportData(){return JSON.stringify(this.data,null,2)}importData(t){try{const n=JSON.parse(t);return this.data=n,this.saveData(),!0}catch(n){return console.warn("[Achievements] Failed to import data:",n),false}}}let $n=null;function et(){return $n||($n=new yv),$n}function vv(){$n&&($n=null);}let Cr=false;const vd={init(){Cr||(et(),Cr=true,console.log("✅ [MGAchievements] Initialized"));},isReady(){return Cr},getManager(){return et()},register:(...e)=>et().register(...e),registerMany:(...e)=>et().registerMany(...e),isUnlocked:(...e)=>et().isUnlocked(...e),getAll:()=>et().getAllAchievements(),getUnlocked:()=>et().getUnlockedAchievements(),getStats:()=>et().getCompletionStats(),checkAll:()=>et().checkAllAchievements(),onUnlock:(...e)=>et().onUnlock(...e),onProgress:(...e)=>et().onProgress(...e),destroy(){vv(),Cr=false;}},wv={enabled:true},wd=$e.ANTI_AFK,Sv=["visibilitychange","blur","focus","focusout","pagehide","freeze","resume"],kv=25e3,Cv=1,Tv=1e-5,le={listeners:[],savedProps:{hidden:void 0,visibilityState:void 0,hasFocus:null},audioCtx:null,oscillator:null,gainNode:null,heartbeatInterval:null};function Pv(){const e=(t,n)=>{const r=o=>{o.stopImmediatePropagation(),o.preventDefault?.();};t.addEventListener(n,r,{capture:true}),le.listeners.push({type:n,handler:r,target:t});};for(const t of Sv)e(document,t),e(window,t);}function Av(){for(const{type:e,handler:t,target:n}of le.listeners)try{n.removeEventListener(e,t,{capture:!0});}catch{}le.listeners.length=0;}function Iv(){const e=Object.getPrototypeOf(document);le.savedProps.hidden=Object.getOwnPropertyDescriptor(e,"hidden"),le.savedProps.visibilityState=Object.getOwnPropertyDescriptor(e,"visibilityState"),le.savedProps.hasFocus=document.hasFocus?document.hasFocus.bind(document):null;try{Object.defineProperty(e,"hidden",{configurable:!0,get:()=>!1});}catch{}try{Object.defineProperty(e,"visibilityState",{configurable:!0,get:()=>"visible"});}catch{}try{document.hasFocus=()=>!0;}catch{}}function _v(){const e=Object.getPrototypeOf(document);try{le.savedProps.hidden&&Object.defineProperty(e,"hidden",le.savedProps.hidden);}catch{}try{le.savedProps.visibilityState&&Object.defineProperty(e,"visibilityState",le.savedProps.visibilityState);}catch{}try{le.savedProps.hasFocus&&(document.hasFocus=le.savedProps.hasFocus);}catch{}}function so(){le.audioCtx&&le.audioCtx.state!=="running"&&le.audioCtx.resume?.().catch(()=>{});}function Ev(){try{const e=window.AudioContext||window.webkitAudioContext;le.audioCtx=new e({latencyHint:"interactive"}),le.gainNode=le.audioCtx.createGain(),le.gainNode.gain.value=Tv,le.oscillator=le.audioCtx.createOscillator(),le.oscillator.frequency.value=Cv,le.oscillator.connect(le.gainNode).connect(le.audioCtx.destination),le.oscillator.start(),document.addEventListener("visibilitychange",so,{capture:!0}),window.addEventListener("focus",so,{capture:!0});}catch{Sd();}}function Sd(){try{le.oscillator?.stop();}catch{}try{le.oscillator?.disconnect(),le.gainNode?.disconnect();}catch{}try{le.audioCtx?.close?.();}catch{}document.removeEventListener("visibilitychange",so,{capture:true}),window.removeEventListener("focus",so,{capture:true}),le.oscillator=null,le.gainNode=null,le.audioCtx=null;}function Mv(){const e=document.querySelector("canvas")||document.body||document.documentElement;le.heartbeatInterval=window.setInterval(()=>{try{e.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:1,clientY:1}));}catch{}},kv);}function Lv(){le.heartbeatInterval!==null&&(clearInterval(le.heartbeatInterval),le.heartbeatInterval=null);}function Vo(){Iv(),Pv(),Ev(),Mv();}function Xo(){Lv(),Sd(),Av(),_v();}let Tr=false,We=false;function Ut(){return ke(wd,wv)}function Ko(e){Ge(wd,e);}const Rt={init(){if(Tr)return;const e=Ut();Tr=true,e.enabled?(Vo(),We=true,console.log("[MGAntiAfk] Initialized and started")):console.log("[MGAntiAfk] Initialized but disabled");},isReady(){return Tr},isRunning(){return We},isEnabled(){return Ut().enabled},enable(){const e=Ut();e.enabled=true,Ko(e),We||(Vo(),We=true,console.log("[MGAntiAfk] Enabled"));},disable(){const e=Ut();e.enabled=false,Ko(e),We&&(Xo(),We=false,console.log("[MGAntiAfk] Disabled"));},toggle(){Rt.isEnabled()?Rt.disable():Rt.enable();},getConfig(){return Ut()},updateConfig(e){const n={...Ut(),...e};Ko(n),n.enabled&&!We?(Vo(),We=true):!n.enabled&&We&&(Xo(),We=false);},destroy(){We&&(Xo(),We=false),Tr=false,console.log("[MGAntiAfk] Destroyed");}},kd=$e.PET_TEAM,Rv={enabled:false,teams:[],activeTeamId:null},Ri=3,zs=50,Le="";function Fe(){return ke(kd,Rv)}function jt(e){Ge(kd,e);}function Fv(e){const n={...Fe(),...e};return jt(n),n}function Nv(){return Fe().enabled}function Ov(e){Fv({enabled:e});}function Bv(){return crypto.randomUUID()}function _a(){return Date.now()}function Cd(e=[]){const t=[...e];for(;t.length<Ri;)t.push(Le);return [t[0]||Le,t[1]||Le,t[2]||Le]}function Td(e,t){const n=Fe(),r=e.trim();return r?!n.teams.some(o=>o.name.trim()===r&&o.id!==t):false}function Pd(e,t){const n=Fe();if(!e.some(a=>a!==Le))return  true;const o=[...e].sort().join(",");return !n.teams.some(a=>a.id===t?false:[...a.petIds].sort().join(",")===o)}function Ad(e){const n=fn().get(),r=new Set(n.all.map(a=>a.id)),o=Fe();for(const a of o.teams)for(const i of a.petIds)i!==Le&&r.add(i);for(const a of e)if(a!==Le&&!r.has(a))return  false;return  true}function Id(e){const n=fn().get(),r=new Map(n.all.map(a=>[a.id,a])),o=[];for(const a of e.petIds){if(a===Le)continue;const i=r.get(a);i&&o.push(i);}return o}function $v(e){return e.petIds.every(t=>t!==Le)}function Dv(e){const t=[];for(let n=0;n<Ri;n++)e.petIds[n]===Le&&t.push(n);return t}function zv(e){return e.petIds.filter(t=>t!==Le).length}function Gv(e){return e.petIds.every(t=>t===Le)}function jv(e,t){return e.petIds.includes(t)}function Hv(e,t){return e.petIds.indexOf(t)}function Wv(e,t=[]){const n=Fe();if(n.teams.length>=zs)throw new Error(`Maximum number of teams (${zs}) reached`);if(!Td(e))throw new Error(`Team name "${e}" already exists`);const r=e.trim();if(!r)throw new Error("Team name cannot be empty");const o=Cd(t);if(!Ad(o))throw new Error("One or more pet IDs do not exist");if(!Pd(o))throw new Error("A team with this exact composition already exists");const a={id:Bv(),name:r,petIds:o,createdAt:_a(),updatedAt:_a()};return n.teams.push(a),jt(n),a}function _d(e,t){const n=Fe(),r=n.teams.findIndex(i=>i.id===e);if(r===-1)return null;const o=n.teams[r];if(t.name!==void 0){const i=t.name.trim();if(!i)throw new Error("Team name cannot be empty");if(!Td(i,e))throw new Error(`Team name "${i}" already exists`);t.name=i;}if(t.petIds!==void 0){const i=Cd(t.petIds);if(!Ad(i))throw new Error("One or more pet IDs do not exist");if(!Pd(i,e))throw new Error("A team with this exact composition already exists");t.petIds=i;}const a={...o,...t,id:o.id,createdAt:o.createdAt,updatedAt:_a()};return n.teams[r]=a,jt(n),a}function Uv(e){const t=Fe(),n=t.teams.length;return t.teams=t.teams.filter(r=>r.id!==e),t.teams.length===n?false:(jt(t),true)}function Vv(e){return Fe().teams.find(n=>n.id===e)??null}function Xv(){return [...Fe().teams]}function Kv(e){const t=Fe(),n=e.trim();return t.teams.find(r=>r.name.trim()===n)??null}function Yv(e){const t=Fe(),n=new Map(t.teams.map(r=>[r.id,r]));if(e.length!==t.teams.length)return  false;for(const r of e)if(!n.has(r))return  false;return t.teams=e.map(r=>n.get(r)),jt(t),true}function qv(e,t){try{return _d(e,{name:t})!==null}catch(n){return console.warn(`[PetTeam] Failed to rename team ${e}:`,n),false}}function Jv(){const n=fn().get().byLocation.active.map(o=>o.id).sort(),r=Fe();for(const o of r.teams){const a=o.petIds.filter(i=>i!=="").sort();if(a.length===n.length&&a.every((i,s)=>i===n[s]))return o.id}return null}function Ed(){const e=Jv(),t=Fe();return e!==t.activeTeamId&&(t.activeTeamId=e,jt(t)),e}function Md(e){const t=Fe();t.activeTeamId=e,jt(t);}function Qv(e){return Ed()===e}function Zv(e){const t=fn(),n=Gt(),r=t.get();if(n.get().isFull)throw new Error("Cannot activate team: inventory is full");const a=r.byLocation.active,i=e.petIds.filter(l=>l!==Le).sort(),s=a.map(l=>l.id).sort();if(JSON.stringify(i)===JSON.stringify(s)){console.log("[PetTeam] Team already active");return}const c=r.hutch,d=c.hasHutch?c.maxItems-c.currentItems:0;e0(e.petIds,d,r),Md(e.id),console.log("[PetTeam] Team activated successfully");}function e0(e,t,n){const r=n.byLocation.active;let o=t;console.log(`[PetTeam] Starting swap with ${t} hutch spaces available`);for(let a=0;a<Ri;a++){const i=e[a],s=r[a]??null;if(console.log(`[PetTeam] Slot ${a}: current=${s?.id.slice(0,8)??"empty"}, target=${i.slice(0,8)||"empty"}, hutchSpace=${o}`),s?.id===i){console.log(`[PetTeam] Slot ${a}: Same pet, skipping`);continue}if(i===Le&&s){const c=o>0;console.log(`[PetTeam] Slot ${a}: Removing pet, storeInHutch=${c}`),t0(s.id,c),c&&o--;continue}if(!s&&i!==Le){const d=n.all.find(l=>l.id===i)?.location==="hutch";console.log(`[PetTeam] Slot ${a}: Adding pet, fromHutch=${d}`),d&&o++,n0(i,n);continue}if(s&&i!==Le){const d=n.all.find(u=>u.id===i)?.location==="hutch";d&&o++;const l=o>0;console.log(`[PetTeam] Slot ${a}: Swapping pets, fromHutch=${d}, storeInHutch=${l}`),r0(s.id,i,n,l),l&&o--;continue}}console.log(`[PetTeam] Swap complete, ${o} hutch spaces remaining`);}function t0(e,t){ad(e),t&&Ai(e);}function n0(e,t){const n=t.all.find(r=>r.id===e);if(!n){console.warn(`[PetTeam] Pet ${e} not found`);return}n.location==="hutch"&&Ii(e),rd(e);}function r0(e,t,n,r){const o=n.all.find(a=>a.id===t);if(!o){console.warn(`[PetTeam] Pet ${t} not found`);return}o.location==="hutch"&&Ii(t),od(e,t),r&&Ai(e);}let Pr=false;const de={init(){if(Pr)return;if(!Fe().enabled){console.log("[PetTeam] Feature disabled");return}Pr=true,console.log("[PetTeam] Feature initialized");},destroy(){Pr&&(Pr=false,console.log("[PetTeam] Feature destroyed"));},isEnabled:Nv,setEnabled:Ov,createTeam:Wv,updateTeam:_d,deleteTeam:Uv,renameTeam:qv,getTeam:Vv,getAllTeams:Xv,getTeamByName:Kv,reorderTeams:Yv,getPetsForTeam:Id,isTeamFull:$v,getEmptySlots:Dv,getFilledSlotCount:zv,isTeamEmpty:Gv,isPetInTeam:jv,getPetSlotIndex:Hv,getActiveTeamId:Ed,setActiveTeamId:Md,isActiveTeam:Qv,activateTeam:Zv},o0=["PetXpBoost","PetXpBoostII","PetXpBoostIII","SnowyPetXpBoost"],Ld=$e.XP_TRACKER,a0={enabled:false,sortBy:"closestToMax",filterSpecies:[],filterHasXpBoost:false,updateIntervalMs:3e3,isPoppedOut:false,popOutPosition:null,collapsedSections:{activePets:false,allPets:false,xpBoostSummary:false}},Qt="XP Tracker",Zt="[XpTracker]";function mn(){return ke(Ld,a0)}function Rd(e){Ge(Ld,e);}function Fd(e){const n={...mn(),...e};return Rd(n),n}function Nd(){return mn().enabled}function i0(e){Fd({enabled:e});}function Fi(e){return o0.includes(e)}function s0(e){const t=oe.get("abilities");if(!t)return null;const n=t[e];return !n||!Fi(e)?null:{id:e,name:n.name??"XP Boost",baseProbability:n.baseProbability??0,bonusXp:n.baseParameters?.bonusXp??0,requiredWeather:n.baseParameters?.requiredWeather??null}}function Od(e){return e.filter(Fi)}function Bd(e){return e.some(Fi)}function l0(e){switch(e){case "PetXpBoost":return "I";case "PetXpBoostII":return "II";case "PetXpBoostIII":return "III";case "SnowyPetXpBoost":return "Snowy";default:return "I"}}function $d(e,t,n){const r=s0(e);if(!r)return null;const o=l0(e),a=r.requiredWeather,i=a===null||n===a,s=t/ya,c=s*s,d=r.baseProbability,l=r.bonusXp,u=d,p=Math.floor(l*c),f=u/100*60,g=i?Math.floor(f*p):0;return {abilityId:e,abilityName:r.name,tier:o,baseChancePerMinute:d,actualChancePerMinute:u,baseXpPerProc:l,actualXpPerProc:p,expectedProcsPerHour:f,expectedXpPerHour:g,requiredWeather:a,isActive:i}}function Dd(e,t){const n={totalBonusXpPerHour:0,totalProcsPerHour:0,activeBoosterCount:0,boosters:[]};for(const r of e){const o=Od(r.abilities);for(const a of o){const i=$d(a,r.strength,t);i&&(n.boosters.push({petId:r.petId,petName:r.petName,stats:i}),i.isActive&&(n.totalBonusXpPerHour+=i.expectedXpPerHour,n.totalProcsPerHour+=i.expectedProcsPerHour,n.activeBoosterCount++));}}return n}function zd(e,t,n){const r=Od(e);return r.length===0?null:$d(r[0],t,n)}function Gs(e,t){return e.hoursToMaxStrength-t.hoursToMaxStrength}function c0(e,t){return t.hoursToMaxStrength-e.hoursToMaxStrength}function d0(e,t){return e.species.localeCompare(t.species)}function u0(e,t){return t.currentStrength-e.currentStrength}function p0(e,t){const n={active:0,inventory:1,hutch:2};return n[e.location]-n[t.location]}function f0(e,t){return e.name.localeCompare(t.name)}function g0(e){switch(e){case "closestToMax":return Gs;case "furthestFromMax":return c0;case "species":return d0;case "strength":return u0;case "location":return p0;case "name":return f0;default:return Gs}}function Gd(e,t){const n=g0(t);return [...e].sort(n)}function m0(e,t){return t.length===0?e:e.filter(n=>t.includes(n.species))}function h0(e,t){return t?e.filter(n=>n.xpBoostStats!==null):e}function jd(e,t){let n=e;return n=m0(n,t.filterSpecies),n=h0(n,t.filterHasXpBoost),n=Gd(n,t.sortBy),n}function Ar(e){const t=de.getTeam(e);if(!t)return null;const n=Hd(t);if(n.length===0)return {teamId:t.id,teamName:t.name,pets:[],teamSummary:{baseXpPerHour:Ce,bonusXpPerHour:0,totalXpPerHour:Ce,activeBoosterCount:0,totalProcsPerHour:0}};const r=ve.weather.get(),o=r.isActive?r.type:null,a=n.filter(l=>!l.isMature||Bd(l.abilities)).filter(l=>l.hunger>0).map(l=>({petId:l.id,petName:l.name??"",abilities:l.abilities,strength:l.currentStrength})),i=Dd(a,o),s=[],c=b0(n,i.totalBonusXpPerHour);for(const l of n){const u=Wd(l,o,i.totalBonusXpPerHour,c);s.push(u);}const d={baseXpPerHour:Ce,bonusXpPerHour:i.totalBonusXpPerHour,totalXpPerHour:Ce+i.totalBonusXpPerHour,activeBoosterCount:i.activeBoosterCount,totalProcsPerHour:i.totalProcsPerHour};return {teamId:t.id,teamName:t.name,pets:s,teamSummary:d}}function Hd(e){const t=ve.myPets.get(),n=[];for(const r of e.petIds){if(!r)continue;const o=t.all.find(a=>a.id===r);o&&n.push(o);}return n}function b0(e,t){let n=0;for(const r of e){const o=er(r.petSpecies,r.targetScale);if(tr(r.petSpecies,r.xp,o)>=o)continue;const i=r.hunger>0?Ce+t:0,s=So(r.petSpecies,r.xp,o,i>0?i:Ce);n=Math.max(n,s);}return n}function Wd(e,t,n,r){const o=er(e.petSpecies,e.targetScale),a=tr(e.petSpecies,e.xp,o),i=a>=o,s=e.hunger<=0,d=s?0:(s?0:Ce)+n,l=zd(e.abilities,a,t),u=i?null:yi(e.petSpecies,e.xp,a,o,d>0?d:Ce),p=So(e.petSpecies,e.xp,o,d>0?d:Ce),f=u!==null?Si(e.petSpecies,e.hunger,u):null,g=Xn(e.petSpecies,e.hunger,p),b=i&&l&&r>0?ki(true,true,e.petSpecies,e.hunger,0,r):null;return {id:e.id,name:e.name??"",species:e.petSpecies,currentStrength:a,maxStrength:o,isMaxStrength:i,xpPerHour:d,hoursToNextStrength:u,hoursToMaxStrength:p,feedsToNextStrength:f,feedsToMaxStrength:g,isStarving:s,hunger:e.hunger,xpBoostStats:l,supportingFeeds:b,mutations:e.mutations,targetScale:e.targetScale}}function x0(e){const t=de.getTeam(e);if(!t)return 0;const n=Hd(t);if(n.length===0)return 0;const r=n.map(o=>{const a=er(o.petSpecies,o.targetScale);return tr(o.petSpecies,o.xp,a)/a*100});return r.reduce((o,a)=>o+a,0)/r.length}function js(e){if(!isFinite(e)||e<=0)return "0m";if(e<1)return `${Math.ceil(e*60)}m`;if(e<24)return `${e.toFixed(1)}h`;{const t=Math.floor(e/24),n=Math.floor(e%24);return `${t}d ${n}h`}}let ln=false,Vr=null,Po=[],Ni=null;function y0(e,t,n){const r=er(e.petSpecies,e.targetScale),o=tr(e.petSpecies,e.xp,r),a=o>=r,i=e.hunger<=0,s=i?0:Ce,c=zd(e.abilities,o,t);c?.isActive&&c.expectedXpPerHour;const d=e.location==="active"&&!i?s+n:0,l=yi(e.petSpecies,e.xp,o,r,d>0?d:Ce),u=So(e.petSpecies,e.xp,r,d>0?d:Ce),p=Si(e.petSpecies,e.hunger,l),f=Xn(e.petSpecies,e.hunger,u);return {id:e.id,species:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,location:e.location,isStarving:i,currentStrength:o,maxStrength:r,isMaxStrength:a,hoursToNextStrength:l,hoursToMaxStrength:u,feedsToNextStrength:p,feedsToMaxStrength:f,baseXpPerHour:s,totalXpPerHour:d,xpBoostStats:c,targetScale:e.targetScale,abilities:e.abilities,mutations:e.mutations}}function Ud(){const e=ve.myPets.get(),t=ve.weather.get(),n=t.isActive?t.type:null,o=e.byLocation.active.filter(c=>!c.isMature||Bd(c.abilities)).filter(c=>c.hunger>0).map(c=>({petId:c.id,petName:c.name??"",abilities:c.abilities,strength:c.currentStrength})),a=Dd(o,n);Ni=a;const i=[];for(const c of e.all){const d=y0({id:c.id,petSpecies:c.petSpecies,name:c.name??"",xp:c.xp,hunger:c.hunger,targetScale:c.targetScale,abilities:c.abilities,mutations:c.mutations,location:c.location},n,a.totalBonusXpPerHour);i.push(d);}const s=Math.max(0,...i.map(c=>c.hoursToMaxStrength));for(const c of i)c.isMaxStrength&&c.xpBoostStats&&(c.feedsToMaxStrength=ki(true,true,c.species,c.hunger,0,s));return i}function Vd(){if(ln)return;if(!mn().enabled){console.log(`${Zt} ${Qt} disabled`);return}console.log(`${Zt} Initializing ${Qt}...`),oe.isReady()&&(Po=Ud()),ln=true,console.log(`${Zt} ${Qt} initialized`);}function Oi(){return ln&&oe.isReady()}function Bi(){return Oi()?Po:[]}function v0(){return Bi().filter(e=>e.location==="active")}function w0(){return Ni}function $i(){Oi()&&(Po=Ud());}function S0(e){Di();const t=mn(),n=e??t.updateIntervalMs;Vr=setInterval(()=>{Nd()&&$i();},n);}function Di(){Vr&&(clearInterval(Vr),Vr=null);}function Xd(){ln&&(Di(),ln=false,Po=[],Ni=null,console.log(`${Zt} ${Qt} destroyed`));}function k0(){const e=mn();return jd(Bi(),{sortBy:e.sortBy,filterSpecies:e.filterSpecies,filterHasXpBoost:e.filterHasXpBoost})}function C0(e){i0(e),e?(ln=false,Vd(),oe.isReady()&&$i(),console.log(`${Zt} ${Qt} enabled`)):(Xd(),console.log(`${Zt} ${Qt} disabled`));}const Kn={init:Vd,isReady:Oi,destroy:Xd,loadConfig:mn,saveConfig:Rd,updateConfig:Fd,isEnabled:Nd,setEnabled:C0,getAllPetsProgress:Bi,getActivePetsProgress:v0,getCombinedBoostStats:w0,getFilteredPets:k0,refresh:$i,startAutoUpdate:S0,stopAutoUpdate:Di,sortPets:Gd,filterAndSortPets:jd},cn={EggGrowthBoost:{procRate:.21,minutesPerProc:7},EggGrowthBoostII_NEW:{procRate:.24,minutesPerProc:9},EggGrowthBoostII:{procRate:.27,minutesPerProc:11},SnowyEggGrowthBoost:{procRate:.35,minutesPerProc:10}},dn={PlantGrowthBoost:{procRate:.24,minutesPerProc:3},PlantGrowthBoostII:{procRate:.27,minutesPerProc:5},PlantGrowthBoostIII:{procRate:.3,minutesPerProc:7},SnowyPlantGrowthBoost:{procRate:.4,minutesPerProc:6}};[...Object.keys(cn),...Object.keys(dn)];function Kd(e){const t=[];for(const n of e)for(const r of n.abilities)if(r in cn){const o=cn[r];t.push({petId:n.id,petName:n.name||n.petSpecies,abilityId:r,procRate:o.procRate,minutesPerProc:o.minutesPerProc});}return t}function Yd(e){const t=[];for(const n of e)for(const r of n.abilities)if(r in dn){const o=dn[r];t.push({petId:n.id,petName:n.name||n.petSpecies,abilityId:r,procRate:o.procRate,minutesPerProc:o.minutesPerProc});}return t}function Ea(e){let t=0,n=0;for(const r of e){const o=r.procRate*60;t+=o,n+=o*r.minutesPerProc;}return {procsPerHour:t,timeReductionPerHour:n}}function Ma(e){return e.some(t=>t.abilities.some(n=>n in cn))}function La(e){return e.some(t=>t.abilities.some(n=>n in dn))}class qd{constructor(){W(this,"stats");W(this,"STORAGE_KEY",$e.TRACKER_STATS);this.stats=this.loadStats(),this.startSession();}loadStats(){return ke(this.STORAGE_KEY,this.getDefaultStats())}saveStats(){Ge(this.STORAGE_KEY,this.stats);}getDefaultStats(){return {session:{sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},allTime:{totalSessions:0,totalPlayTime:0,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0,crops:{},pets:{}}}}startSession(){this.stats.session={sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},this.stats.allTime.totalSessions++,this.saveStats();}endSession(){this.stats.session.sessionEnd=Date.now();const t=this.stats.session.sessionEnd-this.stats.session.sessionStart;this.stats.allTime.totalPlayTime+=t,this.saveStats();}recordHarvest(t,n=1,r=[]){this.stats.session.cropsHarvested+=n,this.stats.allTime.cropsHarvested+=n,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].harvested+=n;for(const o of r)this.stats.allTime.crops[t].mutations[o]||(this.stats.allTime.crops[t].mutations[o]=0),this.stats.allTime.crops[t].mutations[o]++;this.saveStats();}recordCropSale(t,n=1,r=0){this.stats.session.cropsSold+=n,this.stats.session.coinsEarned+=r,this.stats.allTime.cropsSold+=n,this.stats.allTime.coinsEarned+=r,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].sold+=n,this.stats.allTime.crops[t].totalValue+=r,this.saveStats();}recordPetHatch(t,n=[],r=[]){this.stats.session.petsHatched++,this.stats.allTime.petsHatched++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].hatched++;for(const o of n)this.stats.allTime.pets[t].mutations[o]||(this.stats.allTime.pets[t].mutations[o]=0),this.stats.allTime.pets[t].mutations[o]++;for(const o of r)this.stats.allTime.pets[t].abilities[o]||(this.stats.allTime.pets[t].abilities[o]=0),this.stats.allTime.pets[t].abilities[o]++;this.saveStats();}recordPetSale(t,n=0){this.stats.session.petsSold++,this.stats.session.coinsEarned+=n,this.stats.allTime.petsSold++,this.stats.allTime.coinsEarned+=n,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].sold++,this.saveStats();}recordPetFeed(t){this.stats.session.petsFed++,this.stats.allTime.petsFed++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].fed++,this.saveStats();}recordSeedPurchase(t,n=1,r=0){this.stats.session.seedsPurchased+=n,this.stats.session.coinsSpent+=r,this.stats.allTime.seedsPurchased+=n,this.stats.allTime.coinsSpent+=r,this.saveStats();}recordEggPurchase(t,n=1,r=0){this.stats.session.eggsPurchased+=n,this.stats.session.coinsSpent+=r,this.stats.allTime.eggsPurchased+=n,this.stats.allTime.coinsSpent+=r,this.saveStats();}recordAbilityProc(t){this.stats.session.abilityProcs++,this.stats.allTime.abilityProcs++,this.saveStats();}recordCoinsEarned(t){this.stats.session.coinsEarned+=t,this.stats.allTime.coinsEarned+=t,this.saveStats();}recordCoinsSpent(t){this.stats.session.coinsSpent+=t,this.stats.allTime.coinsSpent+=t,this.saveStats();}getStats(){return {...this.stats}}getSessionStats(){return {...this.stats.session}}getAllTimeStats(){return {...this.stats.allTime}}getCropStats(t){return this.stats.allTime.crops[t]||null}getPetStats(t){return this.stats.allTime.pets[t]||null}getTopCrops(t=10){return Object.entries(this.stats.allTime.crops).map(([n,r])=>({species:n,stats:r})).sort((n,r)=>r.stats.harvested-n.stats.harvested).slice(0,t)}getTopPets(t=10){return Object.entries(this.stats.allTime.pets).map(([n,r])=>({species:n,stats:r})).sort((n,r)=>r.stats.hatched-n.stats.hatched).slice(0,t)}resetSession(){this.startSession();}resetAll(){this.stats=this.getDefaultStats(),this.saveStats();}exportStats(){return JSON.stringify(this.stats,null,2)}importStats(t){try{const n=JSON.parse(t);return this.stats=n,this.saveStats(),!0}catch(n){return console.warn("[StatsTracker] Failed to import stats:",n),false}}}let en=null;function T0(){return en||(en=new qd),en}function P0(){en&&(en.endSession(),en=null);}function Jd(e){const t=xo(e.xp),n=yo(e.petSpecies,e.targetScale),r=vo(e.petSpecies,e.xp,n),o=wo(e.petSpecies,t),a=Hc(e.petSpecies),i=Lb(r,n,a),s=Rb(r,n);return {current:r,max:n,progress:s,age:t,isMature:o,strengthPerHour:a,hoursToMax:i}}function Qd(e){return {...e,strength:Jd(e)}}function Zd(e){return e.map(Qd)}function A0(e){if(e.length===0)return {averageCurrent:0,averageMax:0,totalMature:0,totalImmature:0,strongestPet:null,weakestPet:null};const t=Zd(e),n=t.reduce((c,d)=>c+d.strength.current,0),r=t.reduce((c,d)=>c+d.strength.max,0),o=t.filter(c=>c.strength.isMature).length,a=t.length-o,i=t.reduce((c,d)=>d.strength.max>(c?.strength.max||0)?d:c,t[0]),s=t.reduce((c,d)=>d.strength.max<(c?.strength.max||1/0)?d:c,t[0]);return {averageCurrent:Math.round(n/t.length),averageMax:Math.round(r/t.length),totalMature:o,totalImmature:a,strongestPet:i,weakestPet:s}}const I0=Object.freeze(Object.defineProperty({__proto__:null,calculatePetStrength:Jd,enrichPetWithStrength:Qd,enrichPetsWithStrength:Zd,getPetStrengthStats:A0},Symbol.toStringTag,{value:"Module"}));class eu{constructor(){W(this,"logs",[]);W(this,"maxLogs",1e3);W(this,"unsubscribe",null);W(this,"isInitialized",false);}init(){this.isInitialized||(this.unsubscribe=ve.myPets.subscribeAbility(t=>{this.log({abilityId:t.trigger.abilityId||"unknown",petId:t.pet.id,petSpecies:t.pet.petSpecies,petName:t.pet.name,timestamp:t.trigger.performedAt||Date.now()});}),this.isInitialized=true);}log(t){const n={...t,id:`${t.timestamp}-${Math.random().toString(36).substr(2,9)}`};this.logs.push(n),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs));}getLogs(t){let n=this.logs;t?.abilityId&&(n=n.filter(o=>o.abilityId===t.abilityId)),t?.petId&&(n=n.filter(o=>o.petId===t.petId)),t?.petSpecies&&(n=n.filter(o=>o.petSpecies===t.petSpecies));const{since:r}=t??{};return r!==void 0&&(n=n.filter(o=>o.timestamp>=r)),t?.limit&&(n=n.slice(-t.limit)),n}getStats(t=36e5){const n=Date.now()-t,r=this.logs.filter(a=>a.timestamp>=n),o=new Map;for(const a of r){o.has(a.abilityId)||o.set(a.abilityId,{abilityId:a.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});const i=o.get(a.abilityId);i.count++,(!i.lastProc||a.timestamp>i.lastProc)&&(i.lastProc=a.timestamp);}for(const a of o.values())a.procsPerMinute=a.count/t*6e4,a.procsPerHour=a.count/t*36e5;return o}getAbilityStats(t,n=36e5){return this.getStats(n).get(t)||null}getPetStats(t,n=36e5){const r=Date.now()-n,o=this.logs.filter(i=>i.petId===t&&i.timestamp>=r),a=new Map;for(const i of o){a.has(i.abilityId)||a.set(i.abilityId,{abilityId:i.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});const s=a.get(i.abilityId);s.count++,(!s.lastProc||i.timestamp>s.lastProc)&&(s.lastProc=i.timestamp);}for(const i of a.values())i.procsPerMinute=i.count/n*6e4,i.procsPerHour=i.count/n*36e5;return {totalProcs:o.length,abilities:a}}getTopAbilities(t=10,n=36e5){return Array.from(this.getStats(n).values()).sort((o,a)=>a.count-o.count).slice(0,t)}clear(){this.logs=[];}setMaxLogs(t){this.maxLogs=t,this.logs.length>t&&(this.logs=this.logs.slice(-t));}getLogCount(){return this.logs.length}isActive(){return this.isInitialized}destroy(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null),this.logs=[],this.isInitialized=false;}}let Et=null;function _0(){return Et||(Et=new eu,Et.init()),Et}function E0(){Et&&(Et.destroy(),Et=null);}const tu={StatsTracker:qd,getStatsTracker:T0,destroyStatsTracker:P0},nu={AbilityLogger:eu,getAbilityLogger:_0,destroyAbilityLogger:E0,...I0},M0=Object.freeze(Object.defineProperty({__proto__:null,MGAchievements:vd,MGAntiAfk:Rt,MGAutoFavorite:_i,MGBulkFavorite:io,MGJournalChecker:hd,MGPetTeam:de,MGPets:nu,MGTracker:tu,MGXPTracker:Kn},Symbol.toStringTag,{value:"Module"})),tt=[{id:"Rainbow",desc:"All Rainbow items"},{id:"Gold",desc:"All Gold items"},{id:"Wet",desc:"All Wet items"},{id:"Chilled",desc:"All Chilled items"},{id:"Frozen",desc:"All Frozen items"},{id:"Dawnlit",desc:"Dawn mutations"},{id:"Dawncharged",desc:"Dawn charged"},{id:"Ambershine",desc:"Amber mutations"},{id:"Ambercharged",desc:"Amber charged"}],L0={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function Vt(e){return e?L0[e]??0:0}class R0 extends Bt{constructor(){super({id:"tab-auto-favorite",label:"Auto-Favorite"});W(this,"allPlants",[]);W(this,"allPets",[]);W(this,"sectionElement",null);}async build(n){await Qb();const r=n.getRootNode();Oe(r,Xc,"auto-favorite-settings-styles");const o=this.createGrid("12px");o.id="auto-favorite-settings",this.sectionElement=o,n.appendChild(o),await this.loadGameData(),await this.waitForSprites(),this.renderContent();}async loadGameData(){try{await oe.waitForAny(3e3).catch(()=>{}),await Promise.all([oe.waitFor("plants",3e3).catch(()=>console.warn("[AutoFavorite UI] Still waiting for plants data...")),oe.waitFor("pets",3e3).catch(()=>console.warn("[AutoFavorite UI] Still waiting for pets data..."))]);const n=oe.get("plants")||{},r=oe.get("pets")||{};this.allPlants=Object.keys(n).sort((o,a)=>{const i=n[o]?.seed?.rarity||null,s=n[a]?.seed?.rarity||null,c=Vt(i)-Vt(s);return c!==0?c:o.localeCompare(a,void 0,{numeric:!0,sensitivity:"base"})}),this.allPets=Object.keys(r).sort((o,a)=>{const i=r[o]?.rarity||null,s=r[a]?.rarity||null,c=Vt(i)-Vt(s);return c!==0?c:o.localeCompare(a,void 0,{numeric:!0,sensitivity:"base"})});}catch(n){console.error("[AutoFavorite UI] Failed to load game data:",n);}}async waitForSprites(){if(V.isReady())return;const n=1e4,r=100;let o=0;return new Promise(a=>{const i=()=>{V.isReady()||o>=n?a():(o+=r,setTimeout(i,r));};i();})}renderContent(){this.sectionElement&&(this.sectionElement.innerHTML="",this.sectionElement.appendChild(this.createMasterToggle()),this.sectionElement.appendChild(this.createMutationsCard()),this.sectionElement.appendChild(this.createProduceCard()),this.sectionElement.appendChild(this.createPetsCard()));}createMasterToggle(){const n=m("div",{className:"kv"}),r=co({text:"Enable Auto-Favorite",tone:"default",size:"lg"}),o=Yn({checked:Ze().get().enabled,onChange:async a=>{const i=Ze(),s=i.get();await i.set({...s,enabled:a}),await this.saveConfig();}});return n.append(r.root,o.root),_e({title:"Auto-Favorite",padding:"lg"},n,m("p",{style:"margin-top: 6px; font-size: 12px; color: var(--muted);"},"Automatically favorite items when added to inventory"))}createMutationsCard(){const n=m("div",{className:"u-col"}),r=m("div",{className:"mut-row"});r.appendChild(this.createMutationButton(tt[0])),r.appendChild(this.createMutationButton(tt[1])),n.appendChild(r);const o=m("div",{className:"mut-row"});o.appendChild(this.createMutationButton(tt[2])),o.appendChild(this.createMutationButton(tt[3])),o.appendChild(this.createMutationButton(tt[4])),n.appendChild(o);const a=m("div",{className:"mut-row"});a.appendChild(this.createMutationButton(tt[5])),a.appendChild(this.createMutationButton(tt[6])),n.appendChild(a);const i=m("div",{className:"mut-row"});return i.appendChild(this.createMutationButton(tt[7])),i.appendChild(this.createMutationButton(tt[8])),n.appendChild(i),_e({title:"Mutations Priority",variant:"soft",padding:"lg",expandable:true,defaultExpanded:true},n,m("p",{style:"margin-top: 8px; font-size: 11px; color: var(--muted);"},`${Ze().get().favoriteMutations.length} / ${tt.length} active`))}createMutationButton(n){let r=Ze().get().favoriteMutations.includes(n.id);const a=["mut-btn",`mut-btn--${n.id.toLowerCase()}`];r&&a.push("active");const i=m("div",{className:a.join(" ")}),s=m("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(V.isReady()){const l=V.toCanvas("plant","Sunflower",{mutations:[n.id],scale:.16});l.style.width="28px",l.style.height="28px",l.style.objectFit="contain",s.appendChild(l);}}catch{}const c=n.id.charAt(0).toUpperCase()+n.id.slice(1).toLowerCase(),d=m("div",{style:"font-size: 13px; font-weight: 600; color: var(--fg); text-shadow: 0 1px 2px rgba(0,0,0,0.5); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"},c);if(i.append(s,d),n.id==="Rainbow"||n.id==="Gold"){const l=m("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(V.isReady()){const u=V.toCanvas("pet","Capybara",{mutations:[n.id],scale:.16});u.style.width="28px",u.style.height="28px",u.style.objectFit="contain",l.appendChild(u);}}catch{}i.append(l);}else {const l=m("div",{style:"width: 28px; flex-shrink: 0;"});i.append(l);}return i.addEventListener("click",async l=>{l.stopPropagation();const u=Ze(),p=u.get();if(r){const g=p.favoriteMutations.filter(b=>b!==n.id);await u.set({...p,favoriteMutations:g}),r=false,i.classList.remove("active");}else {const g=[...p.favoriteMutations,n.id];await u.set({...p,favoriteMutations:g}),r=true,i.classList.add("active");}await this.saveConfig();const f=this.sectionElement?.querySelector(".card p");f&&(f.textContent=`${Ze().get().favoriteMutations.length} / ${tt.length} active`);}),i}createProduceCard(){return this.createItemSelectionCard({title:"Produce",items:this.allPlants,category:"plant",selected:Ze().get().favoriteProduceList,onUpdate:async n=>{const r=Ze(),o=r.get();await r.set({...o,favoriteProduceList:n}),await this.saveConfig();}})}createPetsCard(){return this.createItemSelectionCard({title:"Pets",items:this.allPets,category:"pet",selected:Ze().get().favoritePetsList,onUpdate:async n=>{const r=Ze(),o=r.get();await r.set({...o,favoritePetsList:n}),await this.saveConfig();}})}createItemSelectionCard(n){const{title:r,items:o,category:a,selected:i,onUpdate:s}=n;let c=new Set(i),d=o;const l=m("div",{style:"margin-bottom: 8px;"}),u=Ua({placeholder:`Search ${r.toLowerCase()}...`,value:"",debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:S=>{const C=S.trim().toLowerCase();C?d=o.filter(I=>I.toLowerCase().includes(C)):d=o,y.setData(b());}});l.appendChild(u.root);const p=m("div",{style:"display: flex; gap: 8px; margin-bottom: 12px;"}),f=Be({label:"Select All",variant:"default",size:"sm",onClick:()=>{const S=b().map(C=>C.id);y.setSelection(S);}}),g=Be({label:"Deselect All",variant:"default",size:"sm",onClick:()=>{y.clearSelection();}});p.append(f,g);const b=()=>d.map(S=>({id:S,name:S,rarity:this.getItemRarity(S,a),selected:c.has(S)})),h=S=>{if(!S){const I=m("span",{style:"opacity:0.5;"});return I.textContent="—",I}return nr({variant:"rarity",rarity:S,size:"sm"}).root},x=S=>{const C=m("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0; background: color-mix(in oklab, var(--bg) 5%, transparent); border-radius: 6px;"});try{if(V.isReady()){let I=a,v=S;a==="plant"&&(["Bamboo","Cactus"].includes(S)&&(I="tallplant"),S==="DawnCelestial"&&(v="DawnCelestialCrop"),S==="MoonCelestial"&&(v="MoonCelestialCrop"),S==="OrangeTulip"&&(v="Tulip"));const P=V.toCanvas(I,v,{scale:.5});P.style.width="28px",P.style.height="28px",P.style.objectFit="contain",C.appendChild(P);}}catch{}return C},y=kl({columns:[{key:"name",header:"Name",width:"1fr",align:"center",sortable:true,sortFn:(S,C)=>S.name.localeCompare(C.name,void 0,{numeric:true,sensitivity:"base"}),render:S=>{const C=m("div",{style:"display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%;"}),I=x(S.id),v=m("span",{style:"font-weight: 500; color: var(--fg); white-space: nowrap;"},S.name);return C.append(I,v),C}},{key:"rarity",header:"Rarity",width:"100px",align:"center",sortable:true,sortFn:(S,C)=>Vt(S.rarity)-Vt(C.rarity),render:S=>h(S.rarity)}],data:b(),maxHeight:280,compact:true,zebra:true,animations:true,selectable:true,selectOnRowClick:true,hideHeaderCheckbox:true,initialSelection:Array.from(c),getRowId:S=>S.id,onSelectionChange:S=>{c.clear(),S.forEach(C=>c.add(C)),s(Array.from(c)),T();}}),w=m("p",{style:"margin-top: 8px; font-size: 11px; color: var(--muted);"}),T=()=>{w.textContent=`${c.size} / ${o.length} selected`;};return T(),_e({title:`${r} (${c.size}/${o.length})`,variant:"soft",padding:"lg",expandable:true,defaultExpanded:false},l,p,y.root,w)}getItemRarity(n,r){try{if(r==="pet")return (oe.get("pets")||{})[n]?.rarity||null;if(r==="plant"){const o=oe.get("plants")||{},a=o[n];if(a?.seed?.rarity)return a.seed.rarity;const i=n.toLowerCase();for(const s of Object.values(o))if(s?.seed?.name?.toLowerCase()===i||s?.plant?.name?.toLowerCase()===i)return s.seed.rarity}}catch{}return null}async saveConfig(){const n=Ze().get();try{const{updateSimpleConfig:r}=_i;await r({enabled:n.enabled,favoriteSpecies:[...n.favoriteProduceList,...n.favoritePetsList],favoriteMutations:n.favoriteMutations});}catch(r){console.error("[AutoFavoriteSettings] Failed to update feature config:",r);}}}function F0(e,t){const n=new MutationObserver(o=>{for(const a of o)for(const i of a.addedNodes){if(!(i instanceof Element))continue;i.matches(e)&&t(i);const s=i.querySelectorAll(e);for(const c of s)t(c);}});n.observe(document.body,{childList:true,subtree:true});const r=document.querySelectorAll(e);for(const o of r)t(o);return {disconnect:()=>n.disconnect()}}function N0(e,t){const n=new MutationObserver(r=>{for(const o of r)for(const a of o.removedNodes){if(!(a instanceof Element))continue;a.matches(e)&&t(a);const i=a.querySelectorAll(e);for(const s of i)t(s);}});return n.observe(document.body,{childList:true,subtree:true}),{disconnect:()=>n.disconnect()}}const ru=768,Hs=6,Yo=62,qo=50,O0=.5,B0=.4,Ir=36,_r=28,$0=6,Ra=4,D0=8,z0=100,G0=200,Ws=14,Us=3,j0=40,H0=50,Vs=2147483646,An="gemini-bulk-favorite-sidebar",W0="gemini-bulk-favorite-top-row",U0="gemini-bulk-favorite-bottom-row",Fa="gemini-qol-bulkFavorite-styles",V0=`
/* Desktop: vertical scrollable list next to inventory */
#${An} {
  display: flex;
  flex-direction: column;
  gap: ${$0}px;
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
  gap: ${Ra}px;
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

#${An}::-webkit-scrollbar {
  width: 4px;
}

#${An}::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}

#${An}::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

/* Individual species button */
.gemini-qol-bulkFavorite-btn {
  position: relative;
  width: ${Yo}px;
  height: ${Yo}px;
  min-width: ${Yo}px;
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
  width: ${qo}px;
  height: ${qo}px;
  min-width: ${qo}px;
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
  width: ${Ir}px;
  height: ${Ir}px;
  object-fit: contain;
  image-rendering: pixelated;
}

.gemini-qol-bulkFavorite-btn.mobile .gemini-qol-bulkFavorite-sprite {
  width: ${_r}px;
  height: ${_r}px;
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
  width: ${Ir}px;
  height: ${Ir}px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #fff;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 4px;
}

.gemini-qol-bulkFavorite-btn.mobile .gemini-qol-bulkFavorite-fallback {
  width: ${_r}px;
  height: ${_r}px;
  font-size: 14px;
}
`,X0='<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',K0='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';function Y0(e){const{species:t,itemCount:n,isFavorited:r,isMobile:o,onClick:a}=e,i=m("button",{className:`gemini-qol-bulkFavorite-btn${o?" mobile":""}`,title:`${r?"Unfavorite":"Favorite"} all ${n} ${t}`});return i.dataset.species=t,i.appendChild(q0(t,o)),i.appendChild(J0(r)),i.appendChild(Q0(t)),i.addEventListener("click",async s=>{s.preventDefault(),s.stopPropagation(),a();}),i}function q0(e,t){try{if(!V.isReady()||!V.has("plant",e))return Xs(e);const n=t?B0:O0,r=V.toCanvas("plant",e,{scale:n});return r.className="gemini-qol-bulkFavorite-sprite",r}catch(n){return console.warn(`[BulkFavorite] Failed to load sprite for ${e}:`,n),Xs(e)}}function Xs(e){return m("div",{className:"gemini-qol-bulkFavorite-fallback"},e.charAt(0).toUpperCase())}function J0(e){const t=m("span",{className:`gemini-qol-bulkFavorite-heart ${e?"filled":"outline"}`});return t.innerHTML=e?X0:K0,t}function Q0(e){return m("span",{className:"gemini-qol-bulkFavorite-label"},e)}let ct=null,dt=null,lt=null,Xr=false,Dn=null,In=false,tn=null;const Na=[];function Er(e){Na.push(e);}function Z0(){for(const e of Na)try{e();}catch(t){console.warn("[BulkFavorite] Cleanup error:",t);}Na.length=0;}function ou(){return window.innerWidth<=ru}function ew(e){return new Promise(t=>setTimeout(t,e))}function au(){if(Xr)return;if(document.getElementById(Fa)){Xr=true;return}const e=document.createElement("style");e.id=Fa,e.textContent=V0,document.head.appendChild(e),Xr=true;}function tw(){document.getElementById(Fa)?.remove(),Xr=false;}function nw(){const e=Gt().get();if(!e?.items)return [];const t=new Set(e.favoritedItemIds??[]),n=new Map;for(const o of e.items){const a=o;if(a.itemType!=="Produce")continue;const i=a.species,s=a.id;if(!i||!s)continue;const c=n.get(i);c?c.push(s):n.set(i,[s]);}const r=[];for(const[o,a]of n){const i=a.length>0&&a.every(s=>t.has(s));r.push({species:o,itemIds:a,allFavorited:i});}return r.sort((o,a)=>o.species.localeCompare(a.species)),r}async function rw(e){const t=Gt().get();if(!t?.items)return;const n=new Set(t.favoritedItemIds??[]),r=[];for(const i of t.items){const s=i;if(s.itemType!=="Produce"||s.species!==e)continue;const c=s.id;c&&r.push({id:c,favorited:n.has(c)});}if(r.length===0)return;const o=r.every(i=>i.favorited),a=o?r.filter(i=>i.favorited):r.filter(i=>!i.favorited);console.log(`🔄 [BulkFavorite] ${o?"Unfavoriting":"Favoriting"} ${a.length}/${r.length} ${e}`);for(const i of a)ko(i.id),await ew(j0);}function Oa(e,t){const{species:n,itemIds:r,allFavorited:o}=e;return Y0({species:n,itemCount:r.length,isFavorited:o,isMobile:t,onClick:()=>rw(n)})}function ow(e){const t=m("div",{id:An}),n=e.getBoundingClientRect(),r=Math.max(window.innerHeight-z0,G0);return t.style.maxHeight=`${r}px`,t.style.position="fixed",t.style.left=`${n.right+D0}px`,t.style.top=`${n.top}px`,t}function Ks(e,t,n){const r=m("div",{id:e,className:"gemini-qol-bulkFavorite-row"}),o=t.getBoundingClientRect();return n==="top"?r.style.bottom=`${window.innerHeight-o.top+Ra}px`:r.style.top=`${o.bottom+Ra}px`,r.style.left=`${o.left}px`,r.style.maxWidth=`${o.width}px`,r}function Ys(){const e=nw();ou()?iw(e):aw(e);}function aw(e){if(ct){if(ct.innerHTML="",e.length===0){ct.style.display="none";return}ct.style.display="flex";for(const t of e)ct.appendChild(Oa(t,false));console.log(`🎯 [BulkFavorite] Desktop: Rendered ${e.length} produce types`);}}function iw(e){if(!dt||!lt)return;if(dt.innerHTML="",lt.innerHTML="",e.length===0){dt.style.display="none",lt.style.display="none";return}dt.style.display="flex";const t=e.slice(0,Hs),n=e.slice(Hs);for(const r of t)dt.appendChild(Oa(r,true));if(n.length>0){lt.style.display="flex";for(const r of n)lt.appendChild(Oa(r,true));}else lt.style.display="none";console.log(`🎯 [BulkFavorite] Mobile: Rendered ${e.length} types`);}function sw(){const e=document.querySelector(".McGrid");if(!e)return console.log("⚠️ [BulkFavorite] No .McGrid found"),null;const t=e.getBoundingClientRect();if(window.innerWidth<=ru)return console.log(`🎯 [BulkFavorite] Mobile mode - using McGrid: ${Math.round(t.width)}x${Math.round(t.height)}`),e;const r=window.innerWidth/2;let o=null,a=0;const i=e.querySelectorAll(".McFlex, .McGrid");for(const s of i){const c=s.getBoundingClientRect();if(c.width<200||c.height<200||c.width>window.innerWidth-100)continue;const d=c.left+c.width/2,l=1-Math.abs(d-r)/r,p=c.width*c.height*l;p>a&&(o=s,a=p);}if(o){const s=o.getBoundingClientRect();return console.log(`🎯 [BulkFavorite] Found desktop container: ${Math.round(s.width)}x${Math.round(s.height)} @ (${Math.round(s.left)}, ${Math.round(s.top)})`),o}return console.log(`🎯 [BulkFavorite] Fallback to McGrid: ${Math.round(t.width)}x${Math.round(t.height)}`),e}let nn=null;function Ba(){nn&&clearTimeout(nn),nn=setTimeout(()=>{lw();},H0);}function lw(){const e=sw();if(!e)return;console.log("🎯 [BulkFavorite] Found inventory modal container"),zn(),au(),Dn=e,ou()?(dt=Ks(W0,e,"top"),lt=Ks(U0,e,"bottom"),document.body.appendChild(dt),document.body.appendChild(lt)):(ct=ow(e),document.body.appendChild(ct)),Ys(),tn&&tn(),tn=Gt().subscribeFavorites(()=>{In&&Ys();});}function zn(){nn&&(clearTimeout(nn),nn=null),tn&&(tn(),tn=null),ct?.remove(),ct=null,dt?.remove(),dt=null,lt?.remove(),lt=null,Dn=null;}function cw(){zn();}async function $a(){if(!or().enabled){console.log("⚠️ [BulkFavorite] Feature disabled");return}au();const t=await ti.onChangeNow(o=>{const a=o==="inventory";a!==In&&(In=a,a?Ba():zn());}),n=F0(".McGrid",()=>{In&&(ct||dt||Ba());}),r=N0(".McGrid",o=>{Dn&&Dn===o&&zn();});Er(()=>t()),Er(()=>n.disconnect()),Er(()=>r.disconnect()),Er(()=>{zn(),In=false,Dn=null;}),console.log("✅ [BulkFavorite] Started (State-driven + DOM observation)");}function Da(){Z0(),tw(),console.log("🛑 [BulkFavorite] Stopped");}function dw(e){const t=or();t.enabled=e,e?$a():Da();}let Mr=false;const za={init(){Mr||($a(),Mr=true);},destroy(){Mr&&(Da(),Mr=false);},isEnabled(){return yd()},renderButton:Ba,removeButton:cw,startWatching:$a,stopWatching:Da,setEnabled:dw},je={autoFavorite:{enabled:false},bulkFavorite:{enabled:false},journalChecker:{enabled:false},pets:{enabled:true},cropSizeIndicator:{enabled:false,showForGrowing:true,showForMature:true,showJournalBadges:true},eggProbabilityIndicator:{enabled:false},cropValueIndicator:{enabled:false},xpTracker:{enabled:false},abilityTracker:{enabled:false},mutationTracker:{enabled:false},cropBoostTracker:{enabled:false},turtleTimer:{enabled:false}};class uw extends Bt{constructor(){super({id:"tab-feature-settings",label:"Features"});W(this,"config",je);}async build(n){const r=this.createGrid("12px");r.id="feature-settings",n.appendChild(r);const o=ke($e.CONFIG,{});this.config=this.mergeConfig(o),r.appendChild(this.createQOLCard()),r.appendChild(this.createVisualIndicatorsCard()),r.appendChild(this.createTrackingCard());}mergeConfig(n){return {autoFavorite:{...je.autoFavorite,...n.autoFavorite},bulkFavorite:{...je.bulkFavorite,...n.bulkFavorite},journalChecker:{...je.journalChecker,...n.journalChecker},pets:{...je.pets,...n.pets},cropSizeIndicator:{...je.cropSizeIndicator,...n.cropSizeIndicator},eggProbabilityIndicator:{...je.eggProbabilityIndicator,...n.eggProbabilityIndicator},cropValueIndicator:{...je.cropValueIndicator,...n.cropValueIndicator},xpTracker:{...je.xpTracker,...n.xpTracker},abilityTracker:{...je.abilityTracker,...n.abilityTracker},mutationTracker:{...je.mutationTracker,...n.mutationTracker},cropBoostTracker:{...je.cropBoostTracker,...n.cropBoostTracker},turtleTimer:{...je.turtleTimer,...n.turtleTimer}}}createQOLCard(){return _e({title:"Quality of Life",padding:"lg",expandable:true,defaultExpanded:true},this.createToggleRow("Auto-Favorite",this.config.autoFavorite.enabled,n=>{this.config.autoFavorite.enabled=n,this.saveConfig();}),this.createToggleRow("Bulk Favorite",this.config.bulkFavorite.enabled,n=>{this.config.bulkFavorite.enabled=n,this.saveConfig(),za.setEnabled(n);}),this.createToggleRow("Journal Checker",this.config.journalChecker.enabled,n=>{this.config.journalChecker.enabled=n,this.saveConfig();}),this.createToggleRow("Pets Panel",this.config.pets.enabled,n=>{this.config.pets.enabled=n,this.saveConfig();},"Show/hide the Pets tab"))}createVisualIndicatorsCard(){return _e({title:"Visual Indicators",variant:"soft",padding:"lg",expandable:true,defaultExpanded:true},this.createToggleRow("Crop Size",this.config.cropSizeIndicator.enabled,n=>{this.config.cropSizeIndicator.enabled=n,this.saveConfig();},"Shows size % and journal badges"),this.createToggleRow("Egg Probability",this.config.eggProbabilityIndicator.enabled,n=>{this.config.eggProbabilityIndicator.enabled=n,this.saveConfig();},"Shows hatch chances + mutation %"),this.createToggleRow("Crop Value",this.config.cropValueIndicator.enabled,n=>{this.config.cropValueIndicator.enabled=n,this.saveConfig();},"Shows coin value"))}createTrackingCard(){return _e({title:"Tracking & Analytics",variant:"soft",padding:"lg",expandable:true,defaultExpanded:false},this.createToggleRow("XP Tracker",this.config.xpTracker.enabled,n=>{this.config.xpTracker.enabled=n,this.saveConfig(),Kn.setEnabled(n);}),this.createToggleRow("Ability Tracker",this.config.abilityTracker.enabled,n=>{this.config.abilityTracker.enabled=n,this.saveConfig();}),this.createToggleRow("Mutation Tracker",this.config.mutationTracker.enabled,n=>{this.config.mutationTracker.enabled=n,this.saveConfig();}),this.createToggleRow("Crop Boost Tracker",this.config.cropBoostTracker.enabled,n=>{this.config.cropBoostTracker.enabled=n,this.saveConfig();}),this.createToggleRow("Turtle Timer",this.config.turtleTimer.enabled,n=>{this.config.turtleTimer.enabled=n,this.saveConfig();}))}createToggleRow(n,r,o,a){const i=m("div",{className:a?"kv-col":"kv"}),s=m("div",{className:"kv"}),c=co({text:n,tone:"default",size:"md"}),d=Yn({checked:r,onChange:o});if(s.append(c.root,d.root),a){i.appendChild(s);const l=m("p",{className:"helper-text",style:"font-size: 12px; color: var(--item-desc, var(--muted)); margin-top: 4px;"},a);return i.appendChild(l),i}return s}saveConfig(){Ge($e.CONFIG,this.config),console.log("[FeatureSettings] Config saved:",this.config);}}const pw=(function(){const t=typeof document<"u"&&document.createElement("link").relList;return t&&t.supports&&t.supports("modulepreload")?"modulepreload":"preload"})(),fw=function(e){return "/"+e},qs={},iu=function(t,n,r){let o=Promise.resolve();if(n&&n.length>0){let c=function(d){return Promise.all(d.map(l=>Promise.resolve(l).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),s=i?.nonce||i?.getAttribute("nonce");o=c(n.map(d=>{if(d=fw(d),d in qs)return;qs[d]=true;const l=d.endsWith(".css"),u=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${u}`))return;const p=document.createElement("link");if(p.rel=l?"stylesheet":pw,l||(p.as="script"),p.crossOrigin="",p.href=d,s&&p.setAttribute("nonce",s),document.head.appendChild(p),l)return new Promise((f,g)=>{p.addEventListener("load",f),p.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${d}`)));})}));}function a(i){const s=new Event("vite:preloadError",{cancelable:true});if(s.payload=i,window.dispatchEvent(s),!s.defaultPrevented)throw i}return o.then(i=>{for(const s of i||[])s.status==="rejected"&&a(s.reason);return t().catch(a)})},gw=`
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
`,mw=`
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
`;function hw(e){const{count:t,expanded:n=false,onClick:r}=e,o=m("div",{className:"see-more"}),a=m("span",{className:"see-more-link"},Jo(t,n));r&&a.addEventListener("click",r),o.appendChild(a);const i=o;return i.setCount=s=>{a.textContent=Jo(s,n);},i.setExpanded=s=>{a.textContent=Jo(t,s);},i}function Jo(e,t){return t?"− Show less":`+ and ${e} more...`}const bw=e=>e<15?"#F98B4B":e<25?"#FC6D30":e<50?"#F3D32B":e<75?"#E9B52F":e<100?"#5EAC46":"#0B893F",xw=e=>e>=100?"var(--complete)":e>=75?"var(--high)":e>=50?"var(--medium)":"var(--low)",yw={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function Js(e){return e?yw[e]??0:0}function Qs(e,t){try{if(t==="pets")return (oe.get("pets")||{})[e]?.rarity||null;if(t==="plants")return (oe.get("plants")||{})[e]?.seed?.rarity||null}catch{}return null}function vw({progress:e,activeTab:t,expandedCategories:n,onSpeciesClick:r,onToggleExpand:o}){const a=m("div",{className:"journal-content"}),i=m("div",{className:"journal-header"},"Garden Journal");if(a.appendChild(i),t!=="all"){const s=t==="plants"?e.plants:e.pets,c=m("div",{className:"journal-progress-indicator"}),d=Math.floor(s.variantsLogged/s.variantsTotal*100),l=m("span",{className:"percentage"},`Collected ${d}%`),u=m("span",{className:"count"},` (${s.variantsLogged}/${s.variantsTotal})`);c.appendChild(l),c.appendChild(u),a.appendChild(c);}return t==="all"?(a.appendChild(Lr("Produce",e.plants,"plants",n.has("plants"),r,()=>o("plants"),true)),a.appendChild(Lr("Pets",e.pets,"pets",n.has("pets"),r,()=>o("pets"),true))):t==="plants"?a.appendChild(Lr("Produce",e.plants,"plants",n.has("plants"),r,()=>o("plants"))):a.appendChild(Lr("Pets",e.pets,"pets",n.has("pets"),r,()=>o("pets"))),a}function Lr(e,t,n,r,o,a,i=false){const s=m("div",{style:"display: flex; flex-direction: column;"}),c=m("div",{style:`
            max-height: ${r?"480px":"none"};
            overflow-y: ${r?"auto":"visible"};
            overflow-x: hidden;
            margin-bottom: 8px;
        `,className:"journal-species-list"}),d=m("div",{className:"journal-category-stats",style:"height: 28px; line-height: 28px; margin-bottom: 0; display: flex; align-items: center; gap: 6px;"}),l=m("div",{style:"width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(V.isReady()){const h=n==="plants"?"plant":"pet",x=n==="plants"?"Carrot":"CommonEgg";if(V.has(h,x)){const k=V.toCanvas(h,x,{scale:.3});k.style.maxWidth="20px",k.style.maxHeight="20px",k.style.display="block",l.appendChild(k);}}}catch{}const u=t.speciesDetails.length,p=t.total,f=m("span",{},`[ ${e.toUpperCase()} ] — ${u}/${p} SPECIES`);if(d.append(l,f),s.appendChild(d),i){const h=m("div",{className:"journal-progress-indicator",style:"text-align: right; margin-bottom: 4px;"}),x=Math.floor(t.variantsLogged/t.variantsTotal*100),k=m("span",{className:"percentage"},`Collected ${x}%`),y=m("span",{className:"count"},` (${t.variantsLogged}/${t.variantsTotal})`);h.appendChild(k),h.appendChild(y),s.appendChild(h);}const g=[...t.speciesDetails].sort((h,x)=>{const k=Qs(h.species,n),y=Qs(x.species,n),w=Js(k)-Js(y);return w!==0?w:h.species.localeCompare(x.species,void 0,{numeric:true,sensitivity:"base"})}),b=r?g:g.slice(0,5);for(const h of b)c.appendChild(ww(h,n,o));if(s.appendChild(c),t.speciesDetails.length>5){const h=hw({count:t.speciesDetails.length-5,expanded:r,onClick:()=>{a();}});s.appendChild(h);}else s.appendChild(m("div",{style:"height: 28px;"}));return s}function ww(e,t,n){const r=m("div",{className:"journal-row",style:"height: 56px;",onclick:p=>{p.stopPropagation(),n(e,t);}}),o=m("div",{style:"width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{let f=t==="plants"?"plant":"pet",g=e.species;t==="plants"&&(e.species==="DawnCelestial"&&(g="DawnCelestialCrop"),e.species==="MoonCelestial"&&(g="MoonCelestialCrop"),e.species==="OrangeTulip"&&(g="Tulip"));const b=e.isComplete?["Rainbow"]:[],h=(k,y)=>{try{if(V.has(k,y))return V.toCanvas(k,y,{scale:.4,mutations:b})}catch{}return null},x=h(f,g)||(t==="plants"?h("tallplant",g):null)||h(f,g.toLowerCase())||(t==="plants"?h("tallplant",g.toLowerCase()):null);x?(x.style.maxWidth="32px",x.style.maxHeight="32px",x.style.display="block",o.appendChild(x)):console.warn(`[JournalChecker] No sprite found for ${e.species} in ${t}`);}catch(p){console.error(`[JournalChecker] Sprite error for ${e.species}`,p);}const a=m("div",{style:"flex: 1; position: relative; height: 22px;"}),i=m("div",{className:"journal-bar-container",style:"width: 100%; height: 100%; border-radius: 4px; overflow: hidden;"});let s;if(e.isComplete)s="width: 100%; height: 100%; background: linear-gradient(90deg, rgb(255,0,0) 0%, rgb(255,154,0) 14%, rgb(255,255,0) 28%, rgb(0,255,0) 42%, rgb(0,200,255) 56%, rgb(0,0,255) 70%, rgb(143,0,255) 84%, rgb(255,0,255) 100%);";else {const p=bw(e.variantsPercentage);s=`width: ${Math.max(2,e.variantsPercentage)}%; height: 100%; background: ${p};`;}const c=m("div",{className:e.isComplete?"journal-bar-fill rainbow":"journal-bar-fill",style:s});i.appendChild(c);const d=m("div",{style:"position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-weight: 600; font-size: 14px; color: var(--journal-ink); z-index: 1; pointer-events: none;"},e.species);a.append(i,d);const l=xw(e.variantsPercentage),u=m("span",{style:`flex-shrink: 0; font-weight: 800; font-size: 13px; min-width: 50px; text-align: right; color: ${l};`},`${Math.round(e.variantsPercentage)}%`);return r.append(o,a,u),r}function Sw({species:e,category:t,onBack:n}){const r=m("div",{className:"journal-content"}),o=m("div",{className:"journal-back",onclick:d=>{d.stopPropagation(),n();}},"← Return");r.appendChild(o);const a=m("div",{className:"journal-header"},e.species);r.appendChild(a);const i=m("div",{className:"journal-category-stats",style:"text-align: center; height: 28px; line-height: 28px; margin-bottom: 28px;"},`[ ${e.variantsLogged.length} / ${e.variantsTotal} STAMPS ]`);r.appendChild(i);const s=m("div",{className:"journal-grid"}),c=[...e.variantsLogged,...e.variantsMissing].sort((d,l)=>d==="Normal"?-1:l==="Normal"||d==="Max Weight"?1:l==="Max Weight"?-1:d.localeCompare(l));for(const d of c){const l=e.variantsLogged.includes(d);s.appendChild(kw(e.species,d,t,l));}return r.appendChild(s),r}function kw(e,t,n,r){const o=m("div",{className:"journal-stamp-wrapper"}),a=m("div",{className:"journal-stamp",style:r?"":"opacity: 0.1; filter: grayscale(100%);"});try{const s=t!=="Normal"&&t!=="Max Weight"?[t]:[];let d=n==="plants"?"plant":"pet",l=e;n==="plants"&&(e==="DawnCelestial"&&(l="DawnCelestialCrop"),e==="MoonCelestial"&&(l="MoonCelestialCrop"),e==="OrangeTulip"&&(l="Tulip"));const u=(f,g)=>{try{const b=t==="Max Weight"?.72:.6;if(V.has(f,g))return V.toCanvas(f,g,{mutations:s,scale:b,boundsMode:"padded"})}catch{}return null},p=u(d,l)||(n==="plants"?u("tallplant",l):null)||u(d,l.toLowerCase())||(n==="plants"?u("tallplant",l.toLowerCase()):null);p&&(p.style.width="44px",p.style.height="44px",p.style.objectFit="contain",p.style.display="block",a.appendChild(p));}catch{}const i=m("div",{className:"journal-stamp-label"},t);return o.append(a,i),o}const Cw=`
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
`;function Tw(e){const{label:t,tabId:n,tabIndex:r,active:o=false,onClick:a}=e,i=m("button",{className:`tab ${o?"active":""}`,"data-tab":n,"data-tab-index":String(r)},t),s=`var(--journal-tab-${Math.min(5,Math.max(1,r))})`;i.style.setProperty("--tab-color",s),a&&i.addEventListener("click",a);const c=i;return c.setActive=d=>{d?i.classList.add("active"):i.classList.remove("active");},c.setLabel=d=>{i.textContent=d;},c}const Pw=`
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
`,Aw={activeTab:"all",expandedCategories:[]};let Mt=null;async function Iw(){return Mt||(Mt=await lo("tab-journal-checker",{version:1,defaults:Aw}),Mt)}function Rr(){if(!Mt)throw new Error("[JournalChecker] Section state not initialized. Call initSectionState() first.");return Mt}function Fr(){return Mt!==null}const _w=[{id:"all",label:"All",colorTheme:"teal"},{id:"plants",label:"Crops",colorTheme:"green"},{id:"pets",label:"Pets",colorTheme:"purple"}];class Ew extends Bt{constructor(){super({id:"tab-journal-checker",label:"Journal"});W(this,"progress",null);W(this,"currentView",{type:"overview"});}async build(n){this.container=n,await Iw(),await V.init(),console.log("[JournalChecker] Sprite categories:",V.getCategories());const r=n.getRootNode();Oe(r,gw,"journal-checker-styles"),Oe(r,Cw,"journal-tab-styles"),Oe(r,Pw,"journal-progress-bar-styles"),Oe(r,mw,"journal-see-more-styles"),this.container.classList.add("journal-checker-host"),this.container.style.height="100%",this.container.style.overflowY="auto",await this.updateProgress();const o=(a=>{this.progress=a.detail,this.refresh();});window.addEventListener("gemini:journal-updated",o),this.addCleanup(()=>{window.removeEventListener("gemini:journal-updated",o);});}async updateProgress(){try{const{MGJournalChecker:n}=await iu(async()=>{const{MGJournalChecker:r}=await Promise.resolve().then(()=>M0);return {MGJournalChecker:r}},void 0);this.progress=await n.aggregateJournalProgress(),this.refresh();}catch(n){console.error("[JournalChecker] Failed to load progress:",n);}}get activeTab(){return Fr()?Rr().get().activeTab:"all"}set activeTab(n){Fr()&&Rr().update({activeTab:n});}get expandedCategories(){return Fr()?new Set(Rr().get().expandedCategories):new Set}setExpandedCategories(n){Fr()&&Rr().update({expandedCategories:Array.from(n)});}refresh(){if(this.container){if(this.container.innerHTML="",!this.progress){this.container.appendChild(m("div",{style:"padding: 20px; text-align: center; font-family: var(--font-game); color: var(--journal-sub);"},"Loading Journal..."));return}this.container.appendChild(this.renderTabNavigation()),this.currentView.type==="overview"?this.container.appendChild(vw({progress:this.progress,activeTab:this.activeTab,expandedCategories:this.expandedCategories,onSpeciesClick:(n,r)=>{this.currentView={type:"species",species:n,category:r},this.refresh();},onToggleExpand:n=>{const r=this.expandedCategories;r.has(n)?r.delete(n):r.add(n),this.setExpandedCategories(r),this.refresh();}})):this.container.appendChild(Sw({species:this.currentView.species,category:this.currentView.category,onBack:()=>{this.currentView={type:"overview"},this.refresh();}}));}}renderTabNavigation(){const n=m("div",{className:"journal-tabs-container"});return _w.forEach((r,o)=>{const a=Tw({label:r.label,tabId:r.id,tabIndex:o+1,active:this.activeTab===r.id,onClick:()=>{this.activeTab=r.id,this.refresh();}});n.appendChild(a);}),n}}function Mw(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("width","24"),e.setAttribute("height","24"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","2"),e.setAttribute("stroke-linecap","round"),e.style.color="var(--accent)";const t=document.createElementNS("http://www.w3.org/2000/svg","line");t.setAttribute("x1","12"),t.setAttribute("y1","5"),t.setAttribute("x2","12"),t.setAttribute("y2","19");const n=document.createElementNS("http://www.w3.org/2000/svg","line");return n.setAttribute("x1","5"),n.setAttribute("y1","12"),n.setAttribute("x2","19"),n.setAttribute("y2","12"),e.appendChild(t),e.appendChild(n),e}function Lw(e,t){const n=e;let r=e;const o=rn({value:e,placeholder:"Team name",mode:"alphanumeric",allowSpaces:true,maxLength:50,blockGameKeys:true,onChange:a=>{const i=a.trim();i&&i!==r&&(r=i,t?.(i));},onEnter:a=>{const i=a.trim()||n;i!==r&&(r=i,t?.(i));}});return o.root.className="team-list-item__name-input",o.input.addEventListener("blur",()=>{const a=o.getValue().trim()||n;a!==r&&(r=a,t?.(a));}),o.input.addEventListener("keydown",a=>{a.key==="Escape"&&(a.preventDefault(),o.input.blur());}),o.root}function Rw(e){const t=m("div",{className:"team-list-item"}),n=e.customIndicator??m("div",{className:`team-list-item__indicator ${e.isActive?"team-list-item__indicator--active":"team-list-item__indicator--inactive"}`}),r=e.isNameEditable?Lw(e.team.name,e.onNameChange):m("div",{textContent:e.team.name,className:`team-list-item__name ${e.isActive?"team-list-item__name--active":"team-list-item__name--inactive"}`}),o=m("div",{className:"team-list-item__sprites"});function a(){const c=ve.myPets.get();o.innerHTML="";for(let d=0;d<3;d++){const l=e.team.petIds[d],u=l&&l!=="",p=m("div",{className:`team-list-item__sprite-slot ${e.showSlotStyles&&!u?"team-list-item__sprite-slot--empty":""}`});if(e.onSlotClick&&(p.style.cursor="pointer",p.addEventListener("click",()=>{e.onSlotClick(d);})),u){let f=c.all.find(g=>g.id===l);if(!f){const g=window.__petDataCache;g&&g.has(l)&&(f=g.get(l));}if(f)try{const g=V.toCanvas("pet",f.petSpecies,{mutations:f.mutations,scale:1}),b=document.createElement("canvas");b.width=g.width,b.height=g.height;const h=b.getContext("2d");if(h&&h.drawImage(g,0,0),b.style.width="100%",b.style.height="100%",b.style.objectFit="contain",p.appendChild(b),e.showSlotStyles){const x=m("div",{className:"team-list-item__sprite-slot-overlay"});p.appendChild(x),p.classList.add("team-list-item__sprite-slot--filled");}}catch(g){console.warn(`[TeamListItem] Failed to render sprite for pet ${f.petSpecies}:`,g);const b=m("div",{textContent:"🐾",className:"team-list-item__sprite-placeholder"});p.appendChild(b);}else {const g=m("div",{textContent:"⏳",className:"team-list-item__sprite-placeholder"});p.appendChild(g),console.warn(`[TeamListItem] Pet ${l} not found in myPets yet, waiting for update`);let b=false;const h=ve.myPets.subscribe(()=>{if(b)return;const k=ve.myPets.get().all.find(y=>y.id===l);if(k){b=true,h();try{p.innerHTML="";const y=V.toCanvas("pet",k.petSpecies,{mutations:k.mutations,scale:1}),w=document.createElement("canvas");w.width=y.width,w.height=y.height;const T=w.getContext("2d");if(T&&T.drawImage(y,0,0),w.style.width="100%",w.style.height="100%",w.style.objectFit="contain",p.appendChild(w),e.showSlotStyles){const S=m("div",{className:"team-list-item__sprite-slot-overlay"});p.appendChild(S),p.classList.add("team-list-item__sprite-slot--filled");}console.log(`[TeamListItem] Pet ${l} sprite updated`);}catch(y){console.warn(`[TeamListItem] Failed to render sprite for pet ${k.petSpecies}:`,y),p.innerHTML="<div class='team-list-item__sprite-placeholder'>🐾</div>";}}},{immediate:false});}}else if(e.showSlotStyles&&!u){const f=Mw();p.appendChild(f);}o.appendChild(p);}}a();const i=ve.myPets.subscribe(()=>{a();});if(!e.hideDragHandle){const c=m("div",{textContent:"⋮⋮",className:"team-list-item__drag-handle"});t.appendChild(c);}if(t.appendChild(n),t.appendChild(r),t.appendChild(o),e.onExpandClick){const c=m("button",{className:`team-list-item__expand ${e.isExpanded?"team-list-item__expand--open":""}`});c.innerHTML='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>',c.addEventListener("click",d=>{d.stopPropagation(),e.onExpandClick?.();}),t.appendChild(c);}const s=new MutationObserver(()=>{document.contains(t)||(s.disconnect(),i());});return s.observe(document.body,{childList:true,subtree:true}),t}function Fw(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function Nw(e){const{segments:t,selected:n=t[0]?.id??"",size:r="md",fullWidth:o=false,disabled:a=false,onChange:i}=e,s=m("div",{className:"sg-root"});r!=="md"&&s.classList.add(`sg--${r}`),o&&(s.style.width="100%");const c=m("div",{className:"sg-container",role:"tablist"}),d=m("div",{className:"sg-indicator"}),l=t.map(S=>{const C=m("button",{className:"sg-btn",type:"button",role:"tab","aria-selected":"false",title:S.label});if(C.id=S.id,S.icon){const v=m("span",{className:"sg-icon"}),P=Fw(S.icon);P&&v.appendChild(P),C.appendChild(v);}const I=m("span",{className:"sg-label"},S.label);return C.appendChild(I),C.disabled=!!S.disabled,C});c.appendChild(d),l.forEach(S=>c.appendChild(S)),s.appendChild(c);let u=n,p=a;function f(){const S=l.find(C=>C.id===u);S&&requestAnimationFrame(()=>{const C=d,I=S.offsetLeft,v=S.offsetWidth;C.style.width=`${v}px`,C.style.transform=`translateX(${I}px)`;});}function g(){l.forEach(S=>{const C=S.id===u;S.classList.toggle("active",C),S.setAttribute("aria-selected",String(C)),S.disabled=p||!!t.find(I=>I.id===S.id)?.disabled;}),f();}function b(S){const C=S.currentTarget;if(C.disabled)return;x(C.id);}function h(S){if(p)return;const C=l.findIndex(v=>v.id===u);let I=C;if(S.key==="ArrowLeft"||S.key==="ArrowUp"?(S.preventDefault(),I=(C-1+l.length)%l.length):S.key==="ArrowRight"||S.key==="ArrowDown"?(S.preventDefault(),I=(C+1)%l.length):S.key==="Home"?(S.preventDefault(),I=0):S.key==="End"&&(S.preventDefault(),I=l.length-1),I!==C){const v=l[I];v&&!v.disabled&&(x(v.id),v.focus());}}l.forEach(S=>{S.addEventListener("click",b),S.addEventListener("keydown",h);});function x(S){!t.some(I=>I.id===S)||u===S||(u=S,g(),i?.(u));}function k(){return u}function y(S){p=!!S,g();}function w(){l.forEach(S=>{S.removeEventListener("click",b),S.removeEventListener("keydown",h);});}g(),queueMicrotask(()=>{const S=l.find(C=>C.id===u);if(S){const C=d;C.style.width=`${S.offsetWidth}px`,C.style.transform=`translateX(${S.offsetLeft}px)`;}});const T=s;return T.select=x,T.getSelected=k,T.setDisabled=y,T.destroy=w,T}function Ow(e={}){const{id:t,checked:n=false,disabled:r=false,size:o="md",label:a,labelSide:i="right",onChange:s}=e,c=m("div",{className:"lg-checkbox-wrap"}),d=m("input",{className:`lg-checkbox lg-checkbox--${o}`,id:t,type:"checkbox",checked:!!n,disabled:!!r});let l=null;a&&i!=="none"&&(l=m("label",{className:"lg-checkbox-label",htmlFor:t},a)),l&&i==="left"?c.append(l,d):l&&i==="right"?c.append(d,l):c.append(d);let u=!!n,p=!!r;function f(){d.checked=u,d.disabled=p;}function g(C=false){p||(u=!u,f(),C||s?.(u));}function b(){p||g();}function h(C){p||(C.key===" "||C.key==="Enter")&&(C.preventDefault(),g());}d.addEventListener("click",b),d.addEventListener("keydown",h);function x(){return u}function k(C,I=false){u=!!C,f(),I||s?.(u);}function y(C){p=!!C,f();}function w(C){if(!C){l&&(l.remove(),l=null);return}l?l.textContent=C:(l=m("label",{className:"lg-checkbox-label",htmlFor:t},C),c.append(l));}function T(){d.focus();}function S(){d.removeEventListener("click",b),d.removeEventListener("keydown",h);}return f(),{root:c,input:d,isChecked:x,setChecked:k,setDisabled:y,setLabel:w,focus:T,destroy:S}}function Bw(e){const t=getComputedStyle(e);if(!/(auto|scroll|overlay)/.test(t.overflowY+t.overflowX))return  false;const n=e.scrollHeight,r=e.clientHeight,o=e.scrollWidth,a=e.clientWidth;return n>r+1||o>a+1}function $w(e){const t={overflow:e.style.overflow,overflowY:e.style.overflowY,overflowX:e.style.overflowX,touchAction:e.style.touchAction,overscrollBehavior:e.style.overscrollBehavior};e.style.overflow="hidden",e.style.overflowY="hidden",e.style.overflowX="hidden",e.style.touchAction="none",e.style.overscrollBehavior="contain";let n=false;return ()=>{n||(n=true,e.style.overflow=t.overflow,e.style.overflowY=t.overflowY,e.style.overflowX=t.overflowX,e.style.touchAction=t.touchAction,e.style.overscrollBehavior=t.overscrollBehavior);}}function Dw(e){const t=[],n=new Set;let r=e;for(;r;){if(r instanceof ShadowRoot){r=r.host;continue}if(r instanceof HTMLElement)!n.has(r)&&r!==e&&Bw(r)&&(t.push(r),n.add(r)),r=r.parentElement??r.parentNode;else break}return document.body&&t.push(document.body),document.documentElement&&t.push(document.documentElement),t.filter((o,a,i)=>i.indexOf(o)===a)}function zw(e){const n=Dw(e).map($w);let r=false;return ()=>{if(!r){r=true;for(let o=n.length-1;o>=0;o--)try{n[o]();}catch{}}}}class Gw{constructor(t){W(this,"dragState",null);W(this,"longPressState",null);W(this,"options");W(this,"onPointerMove");W(this,"onPointerUp");W(this,"onPointerCancel");W(this,"onLongPressPointerMove");W(this,"onLongPressPointerUp");this.options=t,this.onPointerMove=this.handlePointerMove.bind(this),this.onPointerUp=this.handlePointerUp.bind(this),this.onPointerCancel=this.handlePointerCancel.bind(this),this.onLongPressPointerMove=this.handleLongPressPointerMove.bind(this),this.onLongPressPointerUp=this.handleLongPressPointerUp.bind(this);}startLongPress(t,n,r){if(this.cleanupLongPress(),de.getAllTeams().findIndex(d=>d.id===r)===-1)return;const i=t.clientX,s=t.clientY,c=window.setTimeout(()=>{this.longPressState&&this.startDrag(t,n,r);},500);this.longPressState={pointerId:t.pointerId,startX:i,startY:s,timeout:c,target:n},window.addEventListener("pointermove",this.onLongPressPointerMove,{passive:false}),window.addEventListener("pointerup",this.onLongPressPointerUp,{passive:false});}startDrag(t,n,r){const o=this.options.getListContainer();if(this.dragState||!o)return;t.preventDefault();const i=de.getAllTeams().findIndex(p=>p.id===r);if(i===-1)return;const s=n.getBoundingClientRect(),c=o.getBoundingClientRect(),d=n.cloneNode(true);d.classList.add("team-list-item--placeholder"),d.classList.remove("team-list-item--dragging");const l=n.style.touchAction;n.style.touchAction="none";const u=zw(n);if(this.dragState={itemEl:n,pointerId:t.pointerId,placeholder:d,offsetY:t.clientY-s.top,fromIndex:i,teamId:r,captureTarget:n,touchActionPrev:l,releaseScrollLock:u},n.classList.add("team-list-item--dragging"),n.style.width=`${s.width}px`,n.style.height=`${s.height}px`,n.style.left=`${s.left-c.left}px`,n.style.top=`${s.top-c.top}px`,n.style.position="absolute",n.style.zIndex="30",n.style.pointerEvents="none",o.style.position||(o.style.position="relative"),o.insertBefore(d,n.nextSibling),o.classList.add("is-reordering"),n.setPointerCapture)try{n.setPointerCapture(t.pointerId);}catch{}window.addEventListener("pointermove",this.onPointerMove,{passive:false}),window.addEventListener("pointerup",this.onPointerUp,{passive:false}),window.addEventListener("pointercancel",this.onPointerCancel,{passive:false});}cleanup(){this.cleanupDrag(),this.cleanupLongPress();}handleLongPressPointerMove(t){if(!this.longPressState||t.pointerId!==this.longPressState.pointerId)return;const n=Math.abs(t.clientX-this.longPressState.startX),r=Math.abs(t.clientY-this.longPressState.startY),o=10;(n>o||r>o)&&this.cleanupLongPress();}handleLongPressPointerUp(t){!this.longPressState||t.pointerId!==this.longPressState.pointerId||this.cleanupLongPress();}handlePointerMove(t){const n=this.options.getListContainer();if(!this.dragState||!n||t.pointerId!==this.dragState.pointerId)return;t.preventDefault();const r=n.getBoundingClientRect();let o=t.clientY-r.top-this.dragState.offsetY;const a=r.height-this.dragState.itemEl.offsetHeight;Number.isFinite(a)&&(o=Math.max(-8,Math.min(a+8,o))),this.dragState.itemEl.style.top=`${o}px`,this.updatePlaceholderPosition(t.clientY);}handlePointerUp(t){!this.dragState||t.pointerId!==this.dragState.pointerId||(t.preventDefault(),this.finishDrag());}handlePointerCancel(t){!this.dragState||t.pointerId!==this.dragState.pointerId||this.finishDrag({revert:true});}updatePlaceholderPosition(t){const n=this.options.getListContainer();if(!this.dragState||!n)return;const{placeholder:r,itemEl:o}=this.dragState,a=Array.from(n.children).filter(c=>c!==o&&c!==r&&c instanceof HTMLElement&&c.classList.contains("team-list-item")),i=new Map;a.forEach(c=>{i.set(c,c.getBoundingClientRect().top);});let s=false;for(const c of a){const d=c.getBoundingClientRect(),l=d.top+d.height/2;if(t<l){r.nextSibling!==c&&n.insertBefore(r,c),s=true;break}}s||n.appendChild(r),a.forEach(c=>{const d=i.get(c),l=c.getBoundingClientRect().top;if(d!==void 0&&d!==l){const u=d-l;c.style.transform=`translateY(${u}px)`,c.style.transition="none",c.offsetHeight,c.style.transition="transform 0.14s ease",c.style.transform="translateY(0)";}});}finishDrag(t={}){const n=this.options.getListContainer();if(!this.dragState||!n)return;const{revert:r=false}=t,{itemEl:o,placeholder:a,fromIndex:i,touchActionPrev:s,releaseScrollLock:c,pointerId:d}=this.dragState;if(n.classList.remove("is-reordering"),o.hasPointerCapture(d))try{o.releasePointerCapture(d);}catch{}if(window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),window.removeEventListener("pointercancel",this.onPointerCancel),r){const p=Array.from(n.children).filter(f=>f!==o&&f!==a&&f instanceof HTMLElement&&f.classList.contains("team-list-item"))[i]||null;p?n.insertBefore(a,p):n.appendChild(a);}else {const u=Array.from(n.children).filter(f=>f!==o),p=u.indexOf(a);if(p!==-1){const f=u[p];f!==a&&n.insertBefore(a,f);}}if(a.replaceWith(o),a.remove(),o.classList.remove("team-list-item--dragging"),o.style.width="",o.style.height="",o.style.left="",o.style.top="",o.style.position="",o.style.zIndex="",o.style.pointerEvents="",o.style.touchAction=s??"",Array.from(n.children).filter(u=>u instanceof HTMLElement&&u.classList.contains("team-list-item")).forEach(u=>{u.style.transform="",u.style.transition="";}),c?.(),!r){const p=Array.from(n.children).filter(f=>f instanceof HTMLElement&&f.classList.contains("team-list-item")).indexOf(o);if(p!==-1&&p!==i){const g=de.getAllTeams().slice(),[b]=g.splice(i,1);g.splice(p,0,b);const h=g.map(x=>x.id);de.reorderTeams(h),this.options.onReorder(h);}}this.dragState=null;}cleanupDrag(){this.dragState&&(window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),window.removeEventListener("pointercancel",this.onPointerCancel),this.dragState=null);}cleanupLongPress(){this.longPressState&&(window.clearTimeout(this.longPressState.timeout),window.removeEventListener("pointermove",this.onLongPressPointerMove),window.removeEventListener("pointerup",this.onLongPressPointerUp),this.longPressState=null);}}class jw{constructor(t,n={}){W(this,"root");W(this,"pet");W(this,"options");W(this,"contentSlot",null);W(this,"isBuilt",false);this.pet=t,this.options=n,this.root=document.createElement("div"),this.root.className="base-pet-card",n.className&&this.root.classList.add(n.className);}build(){if(this.isBuilt)return this.root;this.updateStateClasses();const t=document.createElement("div");t.className="base-pet-card__left";const n=document.createElement("div");n.className="base-pet-card__sprite-wrapper",this.renderSprite(n),t.appendChild(n);const r=document.createElement("div");r.className="base-pet-card__info";const o=document.createElement("div");if(o.className="base-pet-card__name",o.textContent=this.pet.name||this.pet.petSpecies,r.appendChild(o),!this.options.hideStr){const a=document.createElement("div");a.className="base-pet-card__str",this.renderStr(a),r.appendChild(a);}return t.appendChild(r),this.root.appendChild(t),this.contentSlot=document.createElement("div"),this.contentSlot.className="base-pet-card__content",this.root.appendChild(this.contentSlot),this.options.onClick&&(this.root.style.cursor="pointer",this.root.addEventListener("click",()=>this.options.onClick?.(this.pet))),this.isBuilt=true,this.root}getContentSlot(){if(!this.contentSlot)throw new Error("BasePetCard must be built before getting slot");return this.contentSlot}update(t){if(this.pet=t,!this.isBuilt)return;this.updateStateClasses();const n=this.root.querySelector(".base-pet-card__name");n&&(n.textContent=t.name||t.petSpecies);const r=this.root.querySelector(".base-pet-card__str");r&&this.renderStr(r);const o=this.root.querySelector(".base-pet-card__sprite-wrapper");o instanceof HTMLElement&&this.renderSprite(o);}updateStateClasses(){this.root.classList.toggle("base-pet-card--max",this.pet.currentStrength>=this.pet.maxStrength),this.root.classList.toggle("base-pet-card--starving",(this.pet.hunger||0)===0);}renderStr(t){const r=this.pet.currentStrength>=this.pet.maxStrength?`MAX ${this.pet.maxStrength}`:`STR ${this.pet.currentStrength}/${this.pet.maxStrength}`;t.innerHTML="";const o=nr({label:r,type:"neutral",tone:"soft",size:"sm",pill:true});t.appendChild(o.root);}setCentered(t){this.root.classList.toggle("base-pet-card--centered",t);}renderSprite(t){t.innerHTML="";try{const n=this.pet.mutations||[];if(V.has("pet",this.pet.petSpecies)){const r=V.toCanvas("pet",this.pet.petSpecies,{mutations:n,scale:1,boundsMode:"padded"});r.style.width="64px",r.style.height="64px",r.style.objectFit="contain",t.appendChild(r);}else t.innerHTML='<div class="base-pet-card__sprite-fallback">🐾</div>';}catch{t.innerHTML='<div class="base-pet-card__sprite-fallback">🐾</div>';}}destroy(){this.root.remove(),this.contentSlot=null,this.isBuilt=false;}}class Hw{constructor(t){W(this,"root");W(this,"options");W(this,"headerElement",null);W(this,"petsContainer",null);W(this,"footerElement",null);this.options=t,this.root=document.createElement("div"),this.root.className="xp-panel";}build(){return this.headerElement=document.createElement("div"),this.headerElement.className="xp-panel__header",this.root.appendChild(this.headerElement),this.petsContainer=document.createElement("div"),this.petsContainer.className="xp-panel__pets",this.root.appendChild(this.petsContainer),this.footerElement=document.createElement("div"),this.footerElement.className="xp-panel__footer",this.root.appendChild(this.footerElement),this.root}update(t){this.updateHeader(t.teamSummary),this.updatePets(t.pets),this.updateFooter(t.teamSummary,t.pets);}updateHeader(t){this.headerElement&&(t.bonusXpPerHour>0,this.headerElement.innerHTML=`
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
        `;}formatHours(t){if(t===null||t===0)return "0h";if(!isFinite(t))return "∞";if(t<1)return `${Math.ceil(t*60)}m`;if(t<24)return `${t.toFixed(1)}h`;{const n=Math.floor(t/24),r=Math.floor(t%24);return `${n}d ${r}h`}}destroy(){this.root.parentNode&&this.root.parentNode.removeChild(this.root),this.headerElement=null,this.petsContainer=null,this.footerElement=null;}}const Ww={id:"xp",label:"XP",icon:"📊",category:"stats",isAvailable:()=>true,getSummary:(e,t)=>{const n=x0(e.id);return n>=99?null:{text:`${Math.round(n)}%`,variant:n<33?"low":n<67?"medium":"high",tooltip:`Average progress to max STR: ${Math.round(n)}%`,priority:10}},buildPanel:(e,t)=>{const n=new Hw({teamId:e.id});t.appendChild(n.build());const r=Ar(e.id);return r&&n.update(r),{update:(o,a)=>{const i=Ar(o.id);i&&n.update(i);},destroy:()=>n.destroy(),refresh:()=>{const o=Ar(e.id);o&&n.update(o);}}},renderPetSlot:(e,t,n)=>{const r=ve.weather.get(),o=r.isActive?r.type:null,a=Ar(t.id),i=a?.teamSummary.bonusXpPerHour||0,s=a?.pets||[],c=Math.max(0,...s.map(f=>f.hoursToMaxStrength||0)),d=Wd(e,o,i,c),l=d.isMaxStrength,u=!!d.xpBoostStats;let p="";if(l)u&&d.xpBoostStats&&(p=`
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
                `);const b=d.maxStrength-30,h=(d.currentStrength-b)/30,x=Math.min(100,Math.max(0,Math.floor(h*100))),k=e.xp%3600/3600*100,y=Math.min(99,Math.max(1,Math.floor(k))),w=d.currentStrength+1,T=d.maxStrength;p=f+`
                <div class="stat-row">
                    <span class="stat__label">NEXT STR</span>
                    <span class="stat__timer">${js(d.hoursToNextStrength||0)}</span>
                    <span class="stat__feeds">🍖 x${d.feedsToNextStrength}</span>
                    <span class="stat__str-label">STR ${w}</span>
                    <div class="stat__progress-mini">
                        <div class="stat__progress-fill stat__progress-fill--xp" style="width: ${y}%"></div>
                        <span class="stat__percent">${y}%</span>
                    </div>
                </div>
                <div class="stat-row">
                    <span class="stat__label">MAX STR</span>
                    <span class="stat__timer">${js(d.hoursToMaxStrength||0)}</span>
                    <span class="stat__feeds">🍖 x${d.feedsToMaxStrength}</span>
                    <span class="stat__str-label">STR ${T}</span>
                    <div class="stat__progress-mini">
                        <div class="stat__progress-fill stat__progress-fill--xp" style="width: ${x}%"></div>
                        <span class="stat__percent">${x}%</span>
                    </div>
                </div>
            `;}n.innerHTML=p?`<div class="xp-stats-compact">${p}</div>`:"";},shouldDisplay:(e,t)=>true};function Se(e,t,n){const r=document.createElement(e);return t&&(r.className=t),n&&(r.textContent=n),r}function Nr(e,t){const n=e==="egg"?"pet":"plant",r=Se("span","sprite-wrapper");if(!t)return r;let o=t;e==="plant"&&(o==="DawnCelestial"&&(o="DawnCelestialCrop"),o==="MoonCelestial"&&(o="MoonCelestialCrop"));try{if(V.isReady()&&V.has(n,o)){const a=V.toCanvas(n,o,{scale:.3});a.style.height="16px",a.style.width="auto",a.style.imageRendering="pixelated",r.appendChild(a);}}catch{}return r}function Zs(e,t){const n=Se("span","stacked-sprites");if(t.length===0)return n;const r=e==="egg"?"pet":"plant",o=4,i=[...new Set(t.map(c=>e==="egg"?c.eggId:c.species).filter(Boolean))].slice(0,o);if(i.length===0)return n;n.style.display="grid",n.style.gridTemplateColumns="repeat(2, 10px)",n.style.gridTemplateRows="repeat(2, 10px)",n.style.width="24px",n.style.height="24px";let s=false;for(let c=0;c<i.length;c++){let d=i[c];e==="plant"&&d&&(d==="DawnCelestial"&&(d="DawnCelestialCrop"),d==="MoonCelestial"&&(d="MoonCelestialCrop"));try{if(V.isReady()&&d&&V.has(r,d)){const l=V.toCanvas(r,d,{scale:.2});l.style.height="14px",l.style.width="auto",l.style.imageRendering="pixelated",l.style.position="relative",l.style.zIndex=String(o-c),n.appendChild(l),s=!0;}}catch{}}return s||(n.textContent=e==="egg"?"🥚":"🌱"),n}function Or(e,t,n,r,o){const a=Se("div","stat-row"),i=Se("span","stat__label",e),s=Se("span","stat__timer",t),c=Se("span","stat__str-label");c.appendChild(n);const d=Se("div","stat__progress-mini"),l=Se("div",`stat__progress-fill ${o}`);l.style.width=`${r}%`,d.appendChild(l);const u=Se("span","stat__percent",`${r}%`);return d.appendChild(u),a.appendChild(i),n&&n.innerHTML!==""&&n.textContent!=="🥚"&&n.textContent!=="🌱"&&a.appendChild(c),a.appendChild(s),a.appendChild(d),a}function Uw(e){const t=Se("div","stat-row stat-row--boost"),n=Se("span","stat__label","BOOST");t.appendChild(n);const r=Se("span","stat__values-row");return e.forEach((o,a)=>{const i=Se("span","stat__boost-item");i.appendChild(o.sprite),i.appendChild(Se("span","stat__value stat__value--accent",o.text)),r.appendChild(i),a<e.length-1&&r.appendChild(Se("span","stat__separator"," "));}),t.appendChild(r),t}function el(e,t){const n=t==="egg"?cn:dn;let r=0,o=false;const a=[];for(const i of e.abilities)if(i in n){const s=n[i],c=s.procRate*60;r+=c*s.minutesPerProc,o=true,a.push(i);}return {hasBoost:o,minutesPerProc:0,hourlyReduction:r,abilityName:a.join(", ")}}function tl(e,t){const n=t==="egg"?cn:dn;let r=0;for(const a of e.abilities)if(a in n){const i=n[a],s=i.procRate*60;r+=s*i.minutesPerProc;}return `${((60+r)/60).toFixed(2)}x`}function nl(e,t){const n=de.getPetsForTeam(e),r=t==="egg"?Kd(n):Yd(n);return `${((60+Ea(r).timeReductionPerHour)/60).toFixed(2)}x`}function rl(e,t,n=1){return e.length===0?0:Math.round(e.reduce((r,o)=>{const a=t-o.plantedAt,s=(o.maturedAt-t)/n,c=a+s,d=c>0?a/c*100:0;return r+Math.min(100,Math.max(0,d))},0)/e.length)}function ol(e,t,n=1){return e.length===0?0:Math.round(e.reduce((r,o)=>{const a=t-o.startTime,s=(o.endTime-t)/n,c=a+s,d=c>0?a/c*100:0;return r+Math.min(100,Math.max(0,d))},0)/e.length)}function Vw(e,t){if(e.length===0)return {remainingMs:0,name:null};const r=[...e].sort((o,a)=>o.maturedAt-a.maturedAt)[0];return {remainingMs:Math.max(0,r.maturedAt-t),name:r.eggId||null}}function Xw(e,t){if(e.length===0)return {remainingMs:0,name:null};const r=[...e].sort((o,a)=>o.endTime-a.endTime)[0];return {remainingMs:Math.max(0,r.endTime-t),name:r.species||null}}const Kw={id:"growth",label:"Growth",icon:"⏱️",category:"tracking",isAvailable:()=>true,getSummary:(e,t)=>{const n=ve.myGarden.get(),r=n.eggs.growing.length+n.plants.growing.length;return r===0?null:{text:`${r} growing`,variant:"neutral",tooltip:`${n.eggs.growing.length} eggs, ${n.plants.growing.length} plants`,priority:8}},buildPanel:(e,t)=>({update:()=>{},destroy:()=>{},refresh:()=>{}}),renderPetSlot:(e,t,n,r)=>{const o=ve.myGarden.get(),a=Date.now(),i=el(e,"egg"),s=el(e,"plant");if(n.innerHTML="",!i.hasBoost&&!s.hasBoost)return;const c=o.eggs.growing,d=o.crops.growing,l=Se("div","growth-stats-compact"),u=r==="egg"&&i.hasBoost||r==="plant"&&s.hasBoost,p=!r;if(!u&&!p){const w=r==="egg"?"Egg":"Plant",T=Se("div","stat-row stat-row--message");T.appendChild(Se("span","stat__message",`No ${w} Growth Boost, Click the Button to Switch View`)),l.appendChild(T),n.appendChild(l);return}const f=[],g=i.hasBoost&&(r==="egg"||p),b=s.hasBoost&&(r==="plant"||p);if(g){const w=Math.round(i.hourlyReduction/60*100);f.push({text:`+${w}%`,sprite:Nr("egg","UncommonEgg")});}if(b){const w=Math.round(s.hourlyReduction/60*100);f.push({text:`+${w}%`,sprite:Nr("plant","Carrot")});}f.length>0&&l.appendChild(Uw(f));const h=nl(t,"egg"),x=parseFloat(h.replace("x","")),k=nl(t,"plant"),y=parseFloat(k.replace("x",""));if(i.hasBoost&&(r==="egg"||p)){const w=tl(e,"egg"),T=Vw(c,a),S=c.length>0?rl(c,a,x):100;l.appendChild(Or("NEXT EGG",w,Nr("egg",T.name),S,"stat__progress-fill--egg"));}if(s.hasBoost&&(r==="plant"||p)){const w=tl(e,"plant"),T=Xw(d,a),S=d.length>0?ol(d,a,y):100;l.appendChild(Or("NEXT PLANT",w,Nr("plant",T.name),S,"stat__progress-fill--plant"));}if(i.hasBoost&&(r==="egg"||p)){const w=c.length>0?rl(c,a,x):100;l.appendChild(Or("ALL EGGS",`${c.length} total`,Zs("egg",c),w,"stat__progress-fill--egg"));}else if(s.hasBoost&&(r==="plant"||p)){const w=d.length>0?ol(d,a,y):100;l.appendChild(Or("ALL PLANTS",`${d.length} total`,Zs("plant",d),w,"stat__progress-fill--plant"));}n.appendChild(l);},shouldDisplay:(e,t)=>Ma(t)||La(t)},Yw=[Ww,Kw],xe={XP_BOOST:["PetXpBoost","PetXpBoostII","PetXpBoostIII","SnowyPetXpBoost"],COIN_FINDER:["CoinFinderI","CoinFinderII","CoinFinderIII","SnowyCoinFinder"],SELL_BOOST:["SellBoostI","SellBoostII","SellBoostIII","SellBoostIV"],CROP_REFUND_HARVEST:["ProduceRefund","DoubleHarvest"],PLANT_GROWTH:["PlantGrowthBoost","PlantGrowthBoostII","PlantGrowthBoostIII","SnowyPlantGrowthBoost"],CROP_SIZE:["ProduceScaleBoost","ProduceScaleBoostII","ProduceScaleBoostIII","SnowyCropSizeBoost"],CROP_MUTATION:["ProduceMutationBoost","ProduceMutationBoostII","ProduceMutationBoostIII","SnowyCropMutationBoost"],EGG_GROWTH:["EggGrowthBoost","EggGrowthBoostII_NEW","EggGrowthBoostII","SnowyEggGrowthBoost"],HUNGER_BOOST:["HungerBoost","HungerBoostII","HungerBoostIII","SnowyHungerBoost"],HUNGER_RESTORE:["HungerRestore","HungerRestoreII","HungerRestoreIII","SnowyHungerRestore"],RARE_GRANTERS:["FrostGranter","GoldGranter","RainbowGranter"],COMMON_GRANTERS:["RainDance","SnowGranter"],MAX_STR_BOOST:["PetHatchSizeBoost","PetHatchSizeBoostII","PetHatchSizeBoostIII"],HATCH_XP:["PetAgeBoost","PetAgeBoostII","PetAgeBoostIII"],PET_MUTATION:["PetMutationBoost","PetMutationBoostII","PetMutationBoostIII"],DOUBLE_HATCH:["DoubleHatch"],PET_REFUND:["PetRefund","PetRefundII"]};function qw(e,t){return e.abilities.some(n=>t.includes(n))}function Ae(e,t){return e.filter(n=>qw(n,t)).length}function Jw(e){return e.includes("IV")?4:e.includes("III")||e==="EggGrowthBoostII"?3:e.includes("II")||e.includes("_NEW")?2:1}function Xt(e,t){const n=e.flatMap(r=>r.abilities.filter(o=>t.includes(o))).map(Jw);return n.length===0?0:n.reduce((r,o)=>r+o,0)/n.length}function al(e){const t=Id(e);if(t.length===0)return {primary:"unknown",confidence:0,secondary:[],suggestedFeatures:[],reasons:["Team has no pets"]};const n=[],r={},o=Ae(t,xe.XP_BOOST),a=t.filter($=>$.currentStrength<$.maxStrength).length;if(o>=2){const $=Xt(t,xe.XP_BOOST);r["xp-farming"]=.75+$*.05,n.push(`${o} XP Boost pets (avg tier ${$.toFixed(1)})`);}else o===1&&a>=1?(r["xp-farming"]=.7,n.push(`1 XP Boost pet with ${a} leveling pet(s)`)):a>=2&&(r["xp-farming"]=.5,n.push(`${a} pets below max STR`));const i=Ae(t,xe.COIN_FINDER),s=Ae(t,xe.SELL_BOOST),c=Ae(t,xe.CROP_REFUND_HARVEST);if(i>=1){const $=Xt(t,xe.COIN_FINDER);r["coin-farming"]=Math.max(r["coin-farming"]||0,.65+$*.05),n.push(`${i} Coin Finder pet(s) (tier ${$.toFixed(1)})`);}s>=1&&c>=1?(r["coin-farming"]=Math.max(r["coin-farming"]||0,.85),n.push("Sell Boost + Crop Refund/Double Harvest combo")):c>=1&&(r["coin-farming"]=Math.max(r["coin-farming"]||0,.75),n.push("Crop Refund or Double Harvest (coin efficiency)"));const d=Ae(t,xe.RARE_GRANTERS),l=Ae(t,xe.COMMON_GRANTERS),u=Ae(t,xe.PLANT_GROWTH),p=Ae(t,xe.CROP_MUTATION),f=Ae(t,xe.CROP_SIZE);if(d>=1){const $=t.some(M=>M.abilities.includes("RainbowGranter")),A=t.some(M=>M.abilities.includes("GoldGranter"));$?(r["crop-farming"]=Math.max(r["crop-farming"]||0,.95),n.push("Rainbow Granter (ultra-rare, intentional)")):A?(r["crop-farming"]=Math.max(r["crop-farming"]||0,.9),n.push("Gold Granter (ultra-rare)")):(r["crop-farming"]=Math.max(r["crop-farming"]||0,.75),n.push("Frost Granter (rare mutation)"));}const g=u+p+f+l;if(g>=2){const $=(Xt(t,xe.PLANT_GROWTH)+Xt(t,xe.CROP_MUTATION)+Xt(t,xe.CROP_SIZE))/3;r["crop-farming"]=Math.max(r["crop-farming"]||0,.7+$*.03),n.push(`${g} crop-related abilities`);}const b=Ae(t,xe.EGG_GROWTH);if(b>=1&&(r["time-reduction"]=.7,n.push(`${b} Egg Growth Boost pet(s)`)),u>=1&&!r["crop-farming"]&&(r["time-reduction"]=Math.max(r["time-reduction"]||0,.5),n.push("Plant Growth Boost (crop speed)")),d>=1||p>=1){const $=t.some(M=>M.abilities.includes("RainbowGranter")),A=t.some(M=>M.abilities.includes("GoldGranter"));$||A?(r["mutation-hunting"]=.95,n.push(`${$?"Rainbow":"Gold"} Granter (mutation focus)`)):p>=1&&(r["mutation-hunting"]=.8,n.push("Crop Mutation Boost (targeted hunting)"));}const h=Ae(t,xe.HUNGER_BOOST),x=Ae(t,xe.HUNGER_RESTORE);h>=1&&x>=1?(r.efficiency=.85,n.push("Hunger Boost + Hunger Restore (long-term setup)")):(h>=1||x>=1)&&(r.efficiency=.6,n.push("Hunger management (reduced feeding)"));const k=i+d+l;k>=2&&(r.efficiency=Math.max(r.efficiency||0,.6),n.push(`${k} passive abilities (passive gains)`));const y=Ae(t,xe.MAX_STR_BOOST),w=Ae(t,xe.HATCH_XP),T=Ae(t,xe.PET_MUTATION),S=Ae(t,xe.DOUBLE_HATCH),C=Ae(t,xe.PET_REFUND);if(y>=1){const $=Xt(t,xe.MAX_STR_BOOST);r.hatching=.85+$*.05,n.push(`Max Strength Boost (tier ${$.toFixed(1)}) - late-game meta`);}if(T>=1||S>=1||C>=1){const $=T+S+C;r.hatching=Math.max(r.hatching||0,.7+$*.05),n.push(`${$} rainbow hunting abilities`);}w>=1&&!r.hatching&&(r.hatching=.5,n.push("Hatch XP Boost (early-game focus)"));const I=Object.entries(r).sort(([,$],[,A])=>A-$);if(I.length===0)return {primary:"balanced",confidence:.3,secondary:[],suggestedFeatures:["xp"],reasons:["Mixed or unclear purpose"]};const[v,P]=I[0],E=I.slice(1).map(([$,A])=>({purpose:$,confidence:A}));return {primary:v,confidence:P,secondary:E,suggestedFeatures:{"xp-farming":["xp"],"coin-farming":["coin","crop","xp"],"crop-farming":["crop","mutation","xp"],"time-reduction":["timer","xp"],"mutation-hunting":["mutation","crop","xp"],efficiency:["efficiency","hunger","xp"],hatching:["hatch","mutation","xp"],balanced:["xp","ability"],unknown:["xp"]}[v]||["xp"],reasons:n}}async function Qw(){try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;const t=new e,n=t.currentTime,r=t.createOscillator(),o=t.createGain();r.connect(o),o.connect(t.destination),r.type="sine",r.frequency.setValueAtTime(800,n),r.frequency.exponentialRampToValueAtTime(400,n+.03),o.gain.setValueAtTime(.12,n),o.gain.exponentialRampToValueAtTime(.001,n+.05),r.start(n),r.stop(n+.05),setTimeout(()=>t.close(),100);}catch{}}function Zw(e={}){const{id:t,variant:n="default",size:r="md",round:o=false,sprite:a=null,onClick:i,disabled:s=false,playSound:c=true,tooltip:d}=e,l=m("button",{className:"gemini-icon-btn",id:t});l.type="button",n!=="default"&&l.classList.add(`gemini-icon-btn--${n}`),r!=="md"&&l.classList.add(`gemini-icon-btn--${r}`),o&&l.classList.add("gemini-icon-btn--round"),d&&(l.title=d),l.disabled=s;const u=m("span",{className:"gemini-icon-btn__content"});l.appendChild(u),a&&u.appendChild(a);const p=m("span",{className:"gemini-icon-btn__swap"});p.textContent="⇄",l.appendChild(p),l.addEventListener("click",async g=>{l.disabled||(c&&Qw(),i?.(g));});const f=l;return f.setSprite=g=>{u.innerHTML="",g&&u.appendChild(g);},f.setVariant=g=>{l.classList.remove("gemini-icon-btn--default","gemini-icon-btn--plant","gemini-icon-btn--egg"),g!=="default"&&l.classList.add(`gemini-icon-btn--${g}`);},f.setDisabled=g=>{l.disabled=g;},f}const eS=`
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
`;class tS{constructor(t){W(this,"expandedTeams",new Map);W(this,"featureUpdateInterval",null);W(this,"options");this.options=t;}isExpanded(t){return this.expandedTeams.has(t)}toggle(t){this.expandedTeams.has(t)?this.collapse(t):this.expand(t);}expand(t){const n=this.options.getListContainer(),r=de.getTeam(t);if(!r||!n)return;const o=de.getPetsForTeam(r),a=ve.myPets.get(),i=Yw.filter(g=>!(!g.isAvailable()||g.shouldDisplay&&!g.shouldDisplay(r,o)));if(i.length===0){console.warn("[TeamCardExpansion] No available features to display");return}const s=al(r)?.primary==="time-reduction"||Ma(o)||La(o),c=s?"plant":void 0,d=m("div",{className:"team-expanded-container"}),l=[];for(let g=0;g<3;g++){const b=r.petIds[g],h=b?a.all.find(E=>E.id===b)??null:null,x=i.find(E=>E.id==="xp")||i[0],k=m("div",{className:"expanded-pet-row"}),y=m("div",{className:"pet-row__header"}),w=m("button",{textContent:"<",className:"pet-row__nav"}),T=m("div",{textContent:`${x.icon} ${x.label.toUpperCase()}`,className:"pet-label"}),S=m("button",{textContent:">",className:"pet-row__nav"});let C=null;h&&(C=new jw(h));const I=E=>{const F=i[E];if(T.textContent=`${F.icon} ${F.label.toUpperCase()}`,C&&h){const A=C.getContentSlot();if(A.innerHTML="",F.renderPetSlot){const L=this.expandedTeams.get(t);F.renderPetSlot(h,r,A,L?.growthViewType);}const M=h.currentStrength>=h.maxStrength,G=A.children.length>0||A.textContent.trim().length>0;C.setCentered(M&&!G);}const $=l.find(A=>A.slotIndex===g);$&&($.currentFeatureId=F.id,$.featureData=F),y.className=`pet-row__header pet-row__header--${F.id}`;};y.className=`pet-row__header pet-row__header--${x.id}`;let v=i.findIndex(E=>E.id===x.id);w.addEventListener("click",E=>{E.stopPropagation(),v=(v-1+i.length)%i.length,I(v);}),S.addEventListener("click",E=>{E.stopPropagation(),v=(v+1)%i.length,I(v);}),y.appendChild(w),y.appendChild(T),y.appendChild(S);let P;if(C&&h){if(P=C.build(),x.renderPetSlot){const E=C.getContentSlot();x.renderPetSlot(h,r,E,s?"plant":void 0);const F=h.currentStrength>=h.maxStrength,$=E.children.length>0||E.textContent.trim().length>0;C.setCentered(F&&!$);}y.className=`pet-row__header pet-row__header--${x.id}`;}else P=m("div",{className:"pet-row__content pet-row__content--empty"}),P.innerHTML=`
                    <div class="pet-row__sprite"><div class="pet-row__empty-slot">Empty</div></div>
                    <div class="pet-row__info"><span class="pet-row__empty-text">No pet assigned</span></div>
                `;k.appendChild(y),k.appendChild(P),d.appendChild(k),l.push({slotIndex:g,currentFeatureId:x.id,shell:C,container:k,featureData:x});}this.expandedTeams.set(t,{cards:l,expandedAt:Date.now(),container:d,growthViewType:c}),this.addProgressBar(d,o,t);const p=de.getAllTeams().findIndex(g=>g.id===t),f=Array.from(n.children).filter(g=>g instanceof HTMLElement&&g.classList.contains("team-list-item"));p!==-1&&p<f.length&&f[p].insertAdjacentElement("afterend",d),this.startUpdates();}collapse(t){const n=this.expandedTeams.get(t);if(n){for(const r of n.cards)r.shell&&r.shell.destroy();n.container.remove(),this.expandedTeams.delete(t),this.expandedTeams.size===0&&this.stopUpdates();}}cleanupAll(){const t=Array.from(this.expandedTeams.keys());for(const n of t)this.collapse(n);}destroy(){this.cleanupAll(),this.stopUpdates();}addProgressBar(t,n,r){const o=de.getTeam(r);(o?al(o):null)?.primary==="time-reduction"||Ma(n)||La(n)?this.renderGrowthSummaryBar(t,n,r):this.addXpProgressBar(t,n);}addXpProgressBar(t,n){if(n.some(o=>o.currentStrength<o.maxStrength)&&n.length>0){const o=Math.round(n.reduce((d,l)=>d+l.currentStrength/l.maxStrength,0)/n.length*100),a=m("div",{className:"team-progress-bar"}),i=o<33?"low":o<67?"medium":"high",s=m("div",{className:`team-progress-bar__fill team-progress-bar__fill--${i}`});s.style.width=`${o}%`;const c=m("div",{className:"team-progress-bar__percent",textContent:`${o}%`});a.appendChild(s),a.appendChild(c),t.prepend(a);}}renderGrowthSummaryBar(t,n,r){const o=this.expandedTeams.get(r),a=o?.growthViewType||"plant",i=ve.myGarden.get(),s=Date.now(),c=a==="egg"?i.eggs.growing:i.crops.growing,d=c.length,l=Kd(n),u=Yd(n),p=Ea(l).timeReductionPerHour,f=Ea(u).timeReductionPerHour,g=Math.round(a==="egg"?p:f);let b=d>0?0:100;if(d>0){const A=(60+g)/60;b=Math.round(c.reduce((M,G)=>{const L=a==="egg"?G.plantedAt:G.startTime,D=a==="egg"?G.maturedAt:G.endTime,j=s-L,R=(D-s)/A,H=j+R,B=H>0?j/H*100:0;return M+Math.min(100,Math.max(0,B))},0)/d);}let h=c.find(A=>A.tileIndex===o?.pinnedItemId);!h&&d>0&&(h=[...c].sort((A,M)=>{const G=a==="egg"?A.maturedAt:A.endTime,L=a==="egg"?M.maturedAt:M.endTime;return G-L})[0]);const x=m("div",{className:"growth-summary-overhaul"}),k=m("div",{className:`team-progress-bar team-progress-bar--${a}`}),y=m("div",{className:`team-progress-bar__fill team-progress-bar__fill--${a}`});y.style.width=`${b}%`;const w=A=>{const M=Math.floor(A/60),G=A%60;return M>0&&G>0?`${M}h ${G}m/h`:M>0?`${M}h/h`:`${G}m/h`};g>0&&((60+g)/60).toFixed(2)+"";const T=m("div",{className:"team-progress-bar__overlay"});T.innerHTML=`
            <span class="bar-percent">${b}%</span>
            <span class="bar-info">${d} total +${w(g)}</span>
        `,k.appendChild(y),k.appendChild(T);const S=m("div",{className:"growth-next-item"});if(h){let A=a==="egg"?h.eggId:h.species;const M=a==="egg"?"pet":"plant";a==="plant"&&A&&(A==="DawnCelestial"&&(A="DawnCelestialCrop"),A==="MoonCelestial"&&(A="MoonCelestialCrop"));const G=a==="egg"?h.maturedAt:h.endTime;a==="egg"?h.plantedAt:h.startTime;const L=(60+g)/60,D=Math.max(0,Math.round((G-s)/L)),j=s+D,z=new Date(j),R=z.getDate()!==new Date().getDate(),H=z.toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}).toLowerCase(),B=`${R?"Tomorrow ":""}${H}`,U=X=>{const Y=Math.floor(X/1e3),se=Math.floor(Y/60),fe=Math.floor(se/60);return fe>0?`${fe}h ${se%60}m ${Y%60}s`:se>0?`${se}m ${Y%60}s`:`${Y}s`},ae=m("div",{className:"growth-next-sprite"});try{if(V.isReady()&&V.has(M,A)){const X=V.toCanvas(M,A,{scale:.3});X.style.height="20px",X.style.width="auto",X.style.imageRendering="pixelated",ae.appendChild(X);}else ae.textContent=a==="egg"?"🥚":"🌱";}catch(X){console.warn("[GrowthSummary] Sprite error:",X),ae.textContent=a==="egg"?"🥚":"🌱";}S.innerHTML=`
                <div class="growth-next-details">
                    <span class="growth-next-time">${U(D)}</span>
                    <span class="growth-next-date">| ${B}</span>
                </div>
            `,S.prepend(ae);}else S.innerHTML='<span class="empty-text">No items growing</span>';const C=m("div",{className:"growth-overhaul-controls"}),I=a==="egg"?"UncommonEgg":"Carrot",v=a==="egg"?"pet":"plant";let P=null;try{V.isReady()&&V.has(v,I)&&(P=V.toCanvas(v,I,{scale:.35}));}catch{}const E=Zw({variant:a==="egg"?"egg":"plant",sprite:P,playSound:true,tooltip:`Switch to ${a==="egg"?"plants":"eggs"}`,onClick:A=>{A.stopPropagation(),o&&(o.growthViewType=a==="egg"?"plant":"egg",o.pinnedItemId=void 0,this.updateGrowthSummary(r));}}),F=m("button",{className:"growth-dropdown-overhaul",textContent:"▼"});F.onclick=A=>{A.stopPropagation(),this.showGrowthDropdown(F,c,a,r);},C.appendChild(E),C.appendChild(F),x.appendChild(k),x.appendChild(S),x.appendChild(C);const $=t.querySelector(".growth-summary-overhaul");$?$.replaceWith(x):t.prepend(x);}updateGrowthSummary(t){const n=this.expandedTeams.get(t);if(n){const r=de.getTeam(t),o=r?de.getPetsForTeam(r):[];this.renderGrowthSummaryBar(n.container,o,t),this.updateSpecificTeam(t,n);}}updateSpecificTeam(t,n){const r=de.getTeam(t);if(!r)return;const o=ve.myPets.get();for(const a of n.cards){const i=r.petIds[a.slotIndex],s=i?o.all.find(c=>c.id===i):null;if(s&&a.shell&&(a.shell.update(s),a.featureData.renderPetSlot))try{const c=a.shell.getContentSlot();a.featureData.renderPetSlot(s,r,c,n.growthViewType);const d=s.currentStrength>=s.maxStrength,l=c.children.length>0||c.textContent.trim().length>0;a.shell.setCentered(d&&!l);}catch(c){console.error(`[TeamCardExpansion] Failed to render slot for ${s.id}:`,c);}}}showGrowthDropdown(t,n,r,o){const a=t.closest(".growth-summary-overhaul")?.querySelector(".growth-dropdown-menu");if(a){a.remove();return}const i=m("div",{className:"growth-dropdown-menu"});if(n.length===0){const d=m("div",{className:"growth-dropdown-option"});d.textContent="No items growing",i.appendChild(d);}else {const d=r==="egg"?"pet":"plant";n.forEach(l=>{const u=l.tileIndex;let p=r==="egg"?l.eggId:l.species;r==="plant"&&(p==="DawnCelestial"&&(p="DawnCelestialCrop"),p==="MoonCelestial"&&(p="MoonCelestialCrop"));const f=m("div",{className:"growth-dropdown-option"}),g=m("span",{className:"dropdown-sprite"});try{if(V.isReady()&&V.has(d,p)){const y=V.toCanvas(d,p,{scale:.3});y.style.height="16px",y.style.width="auto",y.style.imageRendering="pixelated",g.appendChild(y);}else g.textContent=r==="egg"?"🥚":"🌱";}catch{g.textContent=r==="egg"?"🥚":"🌱";}const b=r==="egg"?l.maturedAt:l.endTime,x=new Date(b).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"}).toLowerCase(),k=m("span",{className:"dropdown-text"});k.textContent=`${p} - ${x}`,f.appendChild(g),f.appendChild(k),f.onclick=y=>{y.stopPropagation();const w=this.expandedTeams.get(o);w&&(w.pinnedItemId=u,this.updateGrowthSummary(o)),i.remove();},i.appendChild(f);});}i.style.position="absolute",i.style.top="100%",i.style.right="0",i.style.marginTop="4px",i.style.zIndex="100";const s=t.parentElement;s&&(s.style.position="relative",s.appendChild(i));const c=d=>{!i.contains(d.target)&&d.target!==t&&(i.remove(),document.removeEventListener("click",c,true));};setTimeout(()=>document.addEventListener("click",c,true),10);}startUpdates(){if(this.featureUpdateInterval!==null)return;const n=Re.detect().platform==="mobile"?8e3:5e3;this.featureUpdateInterval=setInterval(()=>{this.updateAllFeatures();},n);}stopUpdates(){this.featureUpdateInterval!==null&&(clearInterval(this.featureUpdateInterval),this.featureUpdateInterval=null);}updateAllFeatures(){for(const[t,n]of this.expandedTeams)this.updateSpecificTeam(t,n);}}class nS{constructor(t={}){W(this,"card",null);W(this,"modeControl",null);W(this,"modeContainer",null);W(this,"teamContent",null);W(this,"listContainer",null);W(this,"teamMode","overview");W(this,"selectedTeamIds",new Set);W(this,"teamCheckboxes",new Map);W(this,"options");W(this,"dragHandler");W(this,"expansionHandler");this.options=t,this.dragHandler=new Gw({getListContainer:()=>this.listContainer,onReorder:n=>this.options.onTeamReordered?.(n)}),this.expansionHandler=new tS({getListContainer:()=>this.listContainer});}build(){return this.card?this.card:this.createTeamCard()}destroy(){this.dragHandler.cleanup(),this.expansionHandler.destroy(),this.modeControl&&(this.modeControl.destroy(),this.modeControl=null),this.teamCheckboxes.forEach(t=>t.destroy()),this.teamCheckboxes.clear(),this.selectedTeamIds.clear(),this.card=null,this.modeContainer=null,this.teamContent=null,this.listContainer=null;}render(){if(!this.card)return;if(!de.isEnabled()){this.renderDisabledState();return}this.modeContainer&&(this.modeContainer.style.display="flex"),this.ensureModeControl(),this.renderTeamContent();}createTeamCard(){const t=m("div",{className:"team-card-wrapper"});this.modeContainer=m("div",{className:"team-card__mode-container"}),t.appendChild(this.modeContainer),this.teamContent=m("div",{className:"team-card__content"}),t.appendChild(this.teamContent);const n=_e({title:"Team",subtitle:"Organize and switch between pet teams",expandable:true,defaultExpanded:true},t);return this.card=n,n}ensureModeControl(){if(this.modeContainer){if(!this.modeControl){this.modeControl=Nw({segments:[{id:"overview",label:"Overview"},{id:"manage",label:"Manage"}],selected:this.teamMode,onChange:t=>{this.teamMode=t,this.renderTeamContent();}}),this.modeContainer.appendChild(this.modeControl);return}this.modeControl.getSelected()!==this.teamMode&&this.modeControl.select(this.teamMode);}}renderDisabledState(){if(!this.teamContent)return;this.dragHandler.cleanup(),this.listContainer=null,this.modeContainer&&(this.modeContainer.style.display="none");const t=m("div",{className:"team-card__disabled-state"}),n=m("div",{textContent:"Pet Team feature is disabled",className:"team-card__disabled-message"}),r=Be({label:"Enable Feature",onClick:()=>{de.setEnabled(true),this.render();}});t.appendChild(n),t.appendChild(r),this.teamContent.replaceChildren(t);}renderTeamContent(){if(!this.teamContent)return;this.dragHandler.cleanup(),this.listContainer=null,this.teamContent.replaceChildren(),this.teamCheckboxes.forEach(r=>r.destroy()),this.teamCheckboxes.clear(),this.selectedTeamIds.clear();const t=de.getAllTeams(),n=de.getActiveTeamId();if(t.length===0){this.renderEmptyState();return}this.listContainer=m("div",{className:"team-card__list-container"}),t.forEach(r=>{const o=n===r.id;let a;this.teamMode==="manage"&&(a=this.createCheckboxIndicator(r.id));const i=Rw({team:r,isActive:o,customIndicator:a?.root,hideDragHandle:this.teamMode==="manage",isNameEditable:this.teamMode==="manage",showSlotStyles:this.teamMode==="manage",onNameChange:s=>{this.handleRenameTeam(r.id,s);},onSlotClick:this.teamMode==="manage"?s=>{this.handleRemovePet(r.id,s);}:void 0,isExpanded:this.teamMode==="overview"?this.expansionHandler.isExpanded(r.id):void 0,onExpandClick:this.teamMode==="overview"?()=>{this.expansionHandler.toggle(r.id);}:void 0});this.teamMode==="manage"&&i.classList.add("team-list-item--manage"),this.teamMode==="overview"&&(i.addEventListener("click",async s=>{const c=s.target.closest(".team-list-item__drag-handle"),d=s.target.closest(".team-list-item__expand");if(!(c||d)){i.classList.add("team-list-item--clicked"),setTimeout(()=>{i.classList.remove("team-list-item--clicked");},300);try{await de.activateTeam(r);}catch(l){console.error("[TeamCard] Failed to activate team:",l);}}}),i.addEventListener("pointerdown",s=>{if(s.button!==0)return;s.target.closest(".team-list-item__drag-handle")?this.dragHandler.startDrag(s,i,r.id):this.dragHandler.startLongPress(s,i,r.id);})),this.listContainer.appendChild(i);}),this.teamContent.appendChild(this.listContainer),this.teamMode==="manage"&&this.renderManageActions();}renderEmptyState(){if(!this.teamContent)return;const t=m("div",{textContent:"No teams yet. Create your first team!",className:"team-card__empty-state"});if(this.teamContent.appendChild(t),this.teamMode==="manage"){const n=m("div",{className:"team-card__actions"}),r=Be({label:"New Team",variant:"primary",onClick:()=>{this.handleCreateTeam();}});n.appendChild(r),this.teamContent.appendChild(n);}}renderManageActions(){if(!this.teamContent)return;const t=m("div",{className:"team-card__actions"}),n=Be({label:"New Team",variant:"primary",onClick:()=>{this.handleCreateTeam();}}),r=Be({label:"Delete Team",variant:"danger",disabled:this.selectedTeamIds.size===0,onClick:()=>{this.handleDeleteTeam();}});r.setAttribute("data-action","delete-team"),t.appendChild(n),t.appendChild(r),this.teamContent.appendChild(t);}handleCreateTeam(){const t="New Team";let n=t,r=1;const o=de.getAllTeams(),a=new Set(o.map(i=>i.name));for(;a.has(n);)n=`${t} (${r})`,r++;try{de.createTeam(n,[])&&this.render();}catch{}}handleDeleteTeam(){if(this.selectedTeamIds.size===0)return;const t=Array.from(this.selectedTeamIds);for(const n of t)de.deleteTeam(n);this.render();}handleRenameTeam(t,n){de.renameTeam(t,n);}handleRemovePet(t,n){const r=de.getTeam(t);if(!r)return;const o=r.petIds[n];!o||o===""?this.handleAddPet(t,n):this.handleRemovePetFromSlot(t,n);}handleRemovePetFromSlot(t,n){const r=de.getTeam(t);if(!r)return;const o=[...r.petIds];o[n]="",de.updateTeam(t,{petIds:o}),this.render();}async handleAddPet(t,n){const r=de.getTeam(t);if(!r)return;const a=ve.myPets.get().all.map(f=>({id:f.id,itemType:"Pet",petSpecies:f.petSpecies,name:f.name??null,xp:f.xp,hunger:f.hunger,mutations:f.mutations||[],targetScale:f.targetScale,abilities:f.abilities||[]})),i=new Set(r.petIds.filter(f=>f!=="")),s=a.filter(f=>!i.has(f.id));await ge.set("myPossiblyNoLongerValidSelectedItemIndexAtom",null);const c=Re.detect();(c.platform==="mobile"||c.viewportWidth<768)&&this.options.setHUDOpen&&this.options.setHUDOpen(false);const l=ve.myInventory.subscribeSelection(f=>{if(f.current&&f.current.item){const g=f.current.item,b=[...r.petIds];b[n]=g.id,de.updateTeam(t,{petIds:b}),ge.set("myPossiblyNoLongerValidSelectedItemIndexAtom",null),qt.close().then(()=>{const h=Re.detect();(h.platform==="mobile"||h.viewportWidth<768)&&this.options.setHUDOpen&&this.options.setHUDOpen(true),this.render();});}});await qt.show("inventory",{items:s,favoritedItemIds:[]}),await qt.waitForClose();const u=Re.detect();(u.platform==="mobile"||u.viewportWidth<768)&&this.options.setHUDOpen&&this.options.setHUDOpen(true),l();}createCheckboxIndicator(t){const n=Ow({checked:this.selectedTeamIds.has(t),size:"md",onChange:r=>{r?this.selectedTeamIds.add(t):this.selectedTeamIds.delete(t),this.updateDeleteButtonState();}});return this.teamCheckboxes.set(t,n),n}updateDeleteButtonState(){const t=this.teamContent?.querySelector('[data-action="delete-team"]');t&&(t.disabled=this.selectedTeamIds.size===0);}}class rS{constructor(){W(this,"card",null);W(this,"listContainer",null);W(this,"logs",[]);W(this,"filteredLogs",[]);W(this,"unsubscribe",null);}build(){return this.card?this.card:this.createAbilityLogsCard()}destroy(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null),this.card=null,this.listContainer=null,this.logs=[],this.filteredLogs=[];}async render(){const t=fn();this.unsubscribe=t.subscribe(n=>{this.updateFromAbilityLogs(n.abilityLogs);});}updateFromAbilityLogs(t){if(!t||!Array.isArray(t)){this.logs=[],this.filteredLogs=[],this.updateList();return}this.logs=t.map(n=>{const a=oe.get("abilities")?.[n.abilityId]?.name||n.abilityId||"Unknown Ability",i={action:n.abilityId,timestamp:n.performedAt,parameters:n.data||{}},s=Vl(i);return {timestamp:n.performedAt,petName:n.petName,petSpecies:n.petSpecies,abilityName:a,abilityId:n.abilityId,description:s}}),this.filteredLogs=[...this.logs],this.updateList();}createAbilityBadge(t,n){return nr({variant:"ability",abilityId:t,abilityName:n}).root}createAbilityLogsCard(){const t=m("div",{className:"ability-logs-container",style:"display: flex; flex-direction: column; gap: 12px;"}),n=m("div",{style:"margin-bottom: 0;"}),r=Ua({placeholder:"Search logs...",value:"",debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:o=>{const a=o.trim().toLowerCase();a?this.filteredLogs=this.logs.filter(i=>i.petName.toLowerCase().includes(a)||i.petSpecies.toLowerCase().includes(a)||i.abilityName.toLowerCase().includes(a)||i.description.toLowerCase().includes(a)):this.filteredLogs=[...this.logs],this.updateList();}});return n.appendChild(r.root),t.appendChild(n),this.listContainer=m("div",{className:"ability-logs-list",style:"display: flex; flex-direction: column; gap: 8px; max-height: 480px; overflow-y: auto; overflow-x: hidden;"}),t.appendChild(this.listContainer),this.card=_e({title:"Ability Logs",subtitle:"Track all pet ability activations",expandable:true,defaultExpanded:true},t),this.card}updateList(){if(!this.listContainer)return;this.listContainer.replaceChildren();const t=[...this.filteredLogs].sort((n,r)=>r.timestamp-n.timestamp);if(t.length===0){const n=m("div",{className:"ability-logs-empty",style:"padding: 24px; text-align: center; color: color-mix(in oklab, var(--fg) 60%, #9ca3af); font-size: 14px;"},"No ability logs yet");this.listContainer.appendChild(n);return}t.forEach(n=>{const r=this.createLogItemCard(n);this.listContainer.appendChild(r);});}createLogItemCard(t){const n=m("div",{className:"ability-log-item",style:"background: var(--soft); border: 1px solid var(--border); border-radius: 8px; padding: 12px; display: flex; gap: 12px; align-items: center; transition: all 0.2s ease;"});n.addEventListener("mouseenter",()=>{n.style.background="color-mix(in oklab, var(--soft) 90%, var(--fg) 10%)",n.style.borderColor="color-mix(in oklab, var(--border) 70%, var(--fg) 30%)";}),n.addEventListener("mouseleave",()=>{n.style.background="var(--soft)",n.style.borderColor="var(--border)";});const r=m("div",{style:"width: 40px; height: 40px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: var(--muted); border-radius: 6px;"});try{const f=V.toCanvas("pet",t.petSpecies);f&&(f.style.width="100%",f.style.height="100%",f.style.objectFit="contain",r.appendChild(f));}catch{r.textContent="🐾",r.style.fontSize="24px";}n.appendChild(r);const o=m("div",{style:"flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px;"}),a=m("div",{style:"display: flex; align-items: center; justify-content: space-between; gap: 8px;"}),i=m("div",{style:"font-size: 14px; font-weight: 700; color: var(--fg); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"},t.petName),s=new Date(t.timestamp),c=s.toLocaleDateString("en-US",{month:"short",day:"numeric"}),d=s.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}),l=m("div",{style:"font-size: 11px; font-weight: 500; color: color-mix(in oklab, var(--fg) 60%, #9ca3af); white-space: nowrap;"},`${c} ${d}`);a.appendChild(i),a.appendChild(l),o.appendChild(a);const u=this.createAbilityBadge(t.abilityId,t.abilityName);o.appendChild(u);const p=m("div",{style:"font-size: 12px; color: color-mix(in oklab, var(--fg) 70%, #9ca3af); line-height: 1.4; overflow: hidden; text-overflow: ellipsis;"},t.description);return o.appendChild(p),n.appendChild(o),n}}const oS=`
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
`,aS=`
/* ═══════════════════════════════════════════════════════════════════════════
   GROWTH TIMER PANEL STYLES
   ═══════════════════════════════════════════════════════════════════════════ */

/* Growth Panel structural styles moved to growthPanel.css.ts */


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
`,su=`
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

`,iS=`
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
`,lu=`
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
`,sS=`
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
`,lS=`
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
`,cS=`
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
    justify-content: center; /* Center items with gap for exact placement */
    gap: 120px; /* Moves items to the spots in the red squares */
    align-items: center;
    padding: 0; /* Zero padding as requested */
    width: 100%;
    pointer-events: none;
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
        gap: 20px; /* Much smaller gap on mobile */
        padding: 0 10px; /* Slight space from edges */
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
        min-width: 80px; /* Fixed width for alignment */
        flex-shrink: 0;
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
`;class dS extends Bt{constructor(n){super({id:"tab-pets",label:"Pets"});W(this,"unsubscribeMyPets");W(this,"lastActiveTeamId",null);W(this,"teamCardPart",null);W(this,"abilityLogsCardPart",null);W(this,"deps");this.deps=n;}async build(n){this.container=n;const{MGSprite:r}=await iu(async()=>{const{MGSprite:i}=await Promise.resolve().then(()=>Hb);return {MGSprite:i}},void 0);await r.init();const o=n.getRootNode();Oe(o,oS,"team-xp-panel-styles"),Oe(o,aS,"feature-card-styles"),Oe(o,su,"team-card-styles"),Oe(o,iS,"base-pet-card-styles"),Oe(o,lu,"badge-styles"),Oe(o,sS,"arcade-button-styles"),Oe(o,eS,"gemini-icon-button-styles"),Oe(o,lS,"ability-logs-card-styles"),Oe(o,cS,"growth-panel-styles");const a=this.createGrid("12px");a.id="pets",n.appendChild(a),this.initializeTeamCardPart(a),this.initializeAbilityLogsCardPart(a),this.unsubscribeMyPets=ve.myPets.subscribeStable(()=>{const i=de.getActiveTeamId();i!==this.lastActiveTeamId&&(this.lastActiveTeamId=i,this.teamCardPart?.render());}),this.lastActiveTeamId=de.getActiveTeamId();}async destroy(){this.unsubscribeMyPets&&(this.unsubscribeMyPets(),this.unsubscribeMyPets=void 0),this.teamCardPart&&(this.teamCardPart.destroy(),this.teamCardPart=null),this.abilityLogsCardPart&&(this.abilityLogsCardPart.destroy(),this.abilityLogsCardPart=null);}initializeTeamCardPart(n){this.teamCardPart||(this.teamCardPart=new nS({onTeamReordered:o=>{console.log("[PetsSection] Teams reordered:",o);},setHUDOpen:this.deps?.setHUDOpen}));const r=this.teamCardPart.build();n.appendChild(r),this.teamCardPart.render();}initializeAbilityLogsCardPart(n){this.abilityLogsCardPart||(this.abilityLogsCardPart=new rS);const r=this.abilityLogsCardPart.build();n.appendChild(r),this.abilityLogsCardPart.render();}}const cu={Store:{select:ge.select.bind(ge),set:ge.set.bind(ge),subscribe:ge.subscribe.bind(ge),subscribeImmediate:ge.subscribeImmediate.bind(ge)},Globals:ve,Modules:{Version:Ka,Assets:$t,Manifest:bt,Data:oe,Environment:Re,CustomModal:qt,Sprite:V,Tile:Je,Pixi:sn,Audio:mi,Cosmetic:hi,Calculators:Uc},Features:{AutoFavorite:_i,JournalChecker:hd,BulkFavorite:io,Achievements:vd,Tracker:tu,AntiAfk:Rt,Pets:nu,PetTeam:de,XPTracker:Kn},WebSocket:{chat:yy,emote:vy,wish:wy,kickPlayer:Sy,setPlayerData:ky,usurpHost:Cy,reportSpeakingStart:Ty,setSelectedGame:Py,voteForGame:Ay,requestGame:Iy,restartGame:_y,ping:Ey,checkWeatherStatus:Ry,move:My,playerPosition:nd,teleport:Ly,moveInventoryItem:Fy,dropObject:Ny,pickupObject:Oy,toggleFavoriteItem:ko,putItemInStorage:Ai,retrieveItemFromStorage:Ii,moveStorageItem:By,logItems:$y,plantSeed:Dy,waterPlant:zy,harvestCrop:Gy,sellAllCrops:jy,purchaseDecor:Hy,purchaseEgg:Wy,purchaseTool:Uy,purchaseSeed:Vy,plantEgg:Xy,hatchEgg:Ky,plantGardenPlant:Yy,potPlant:qy,mutationPotion:Jy,pickupDecor:Qy,placeDecor:Zy,removeGardenObject:ev,placePet:rd,feedPet:tv,petPositions:nv,swapPet:od,storePet:ad,namePet:rv,sellPet:ov},_internal:{getGlobals:mt,initGlobals:Zc,destroyGlobals:sy}};function uS(){const e=O;e.Gemini=cu,e.MGSprite=V,e.MGData=oe,e.MGPixi=sn,e.MGAssets=$t,e.MGEnvironment=Re;}function pS(){const e=m("div",{className:"atom-inspector",style:"display: flex; flex-direction: column; gap: 12px; height: 100%; min-height: 0; overflow: hidden;"}),t=m("div",{style:"flex-shrink: 0; padding-bottom: 8px;"}),n=rn({placeholder:"Search data keys...",value:"",onChange:s=>i(s)});t.appendChild(n.root),e.appendChild(t);const r=m("div",{style:"flex: 1; min-height: 0; overflow-y: auto; display: flex; flex-direction: column; gap: 8px; padding-right: 4px; padding-bottom: 20px;"});e.appendChild(r);const o={MGData:["plants","pets","mutations","items","decor","eggs","abilities","weather"],Globals:["currentTile","myInventory","myPets","myGarden","players","shops","weather","gameMap"],Atoms:["positionAtom","myCoinsCountAtom","myInventoryAtom","myPetInfosAtom","weatherAtom","currentGardenNameAtom","numPlayersAtom","avgPingAtom"]},a=[],i=(s="")=>{r.innerHTML="",a.forEach(l=>l()),a.length=0;const c=s.toLowerCase(),d=(l,u,p,f)=>{const g=`${l} - ${u}`;if(s&&!g.toLowerCase().includes(c))return;let b=null;const h=m("pre",{style:"margin: 0; padding: 8px; font-size: 11px; background: rgba(0,0,0,0.3); border-radius: 4px; color: var(--color-primary); overflow: auto; max-height: 400px;"});h.textContent="Expand to load data...";const x=_e({title:g,expandable:true,defaultExpanded:!!s,padding:"sm",onExpandChange:k=>{if(k)if(h.textContent="Loading...",f)b=f(y=>{h.textContent=JSON.stringify(y,null,2);});else try{const y=p();h.textContent=JSON.stringify(y,null,2);}catch(y){h.textContent=`Error: ${y}`;}else b&&(b(),b=null),h.textContent="Paused (Collapsed)";}});x.appendChild(h),r.appendChild(x),s&&setTimeout(()=>{f?b=f(k=>{h.textContent=JSON.stringify(k,null,2);}):h.textContent=JSON.stringify(p(),null,2);},0);};o.MGData.forEach(l=>{d(l,"Game Data (MGData)",()=>oe.get(l));}),o.Globals.forEach(l=>{const u=ve[l];u&&d(l,"Reactive Global",()=>u.get(),p=>u.subscribe?.(p)||(()=>{}));}),o.Atoms.forEach(l=>{d(l,"Jotai Atom",()=>null,u=>{let p=false,f=null;return cu.Store.subscribeImmediate(l,g=>{p||u(g);}).then(g=>{p?g():f=g;}),()=>{p=true,f?.();}});}),r.children.length===0&&(r.innerHTML='<div style="text-align:center; padding: 40px; opacity: 0.5;">No matches found for "'+s+'"</div>');};return i(),e.destroy=()=>{a.forEach(s=>s());},e}function fS(e={}){const{id:t,min:n=0,max:r=100,step:o=1,value:a=n,label:i,showValue:s=true,disabled:c=false,onInput:d,onChange:l}=e,u=m("div",{className:"slider"}),p=m("div",{className:"slider-row"}),f=m("div",{className:"slider-track"}),g=m("div",{className:"slider-range"});f.appendChild(g);const b=m("input",{id:t,type:"range",min:String(n),max:String(r),step:String(o),value:String(a),disabled:c});b.addEventListener("input",C=>{x(),d?.(y(),C);}),b.addEventListener("change",C=>l?.(y(),C));function h(){const C=r-n;return C===0?0:(y()-n)/C}function x(){const C=Math.max(0,Math.min(1,h()));g.style.width=`${C*100}%`,S&&(S.textContent=String(y()));}function k(C){b.value=String(C),x();}function y(){return Number(b.value)}function w(C){b.disabled=!!C;}let T=null,S=null;return i&&(T=m("span",{className:"slider-label"},i),p.appendChild(T)),f.appendChild(b),p.appendChild(f),s&&(S=m("span",{className:"slider-value"},String(a)),p.appendChild(S)),u.append(p),x(),{root:u,input:b,setValue:k,getValue:y,setDisabled:w}}function gS(e={}){const{id:t,min:n=0,max:r=100,step:o=1,value:a=n,onInput:i,onChange:s,disabled:c=false}=e,d=m("input",{id:t,type:"range",className:"gemini-range",min:String(n),max:String(r),step:String(o)});d.value=String(a),d.disabled=c,i&&d.addEventListener("input",u=>i(Number(d.value),u)),s&&d.addEventListener("change",u=>s(Number(d.value),u));const l=d;return l.setValue=u=>{d.value=String(u);},l.getValue=()=>Number(d.value),l.setDisabled=u=>{d.disabled=u;},l}function mS(e={}){const{margin:t,color:n,variant:r="default"}=e,o=m("div",{className:"gemini-divider"});return r!=="default"&&o.classList.add(`gemini-divider--${r}`),t&&(o.style.margin=t),n&&(o.style.background=n),o}function hS(e){const{label:t,description:n,value:r,id:o}=e,a=m("div",{className:"gemini-stat-row",id:o}),i=m("div",{className:"gemini-stat-row__left"}),s=m("span",{className:"gemini-stat-row__label"},t);i.appendChild(s);let c=null;n&&(c=m("span",{className:"gemini-stat-row__desc"},n),i.appendChild(c));const d=typeof r=="number"?r.toLocaleString():r,l=m("span",{className:"gemini-stat-row__value"},d);a.appendChild(i),a.appendChild(l);const u=a;return u.setValue=p=>{l.textContent=typeof p=="number"?p.toLocaleString():p;},u.setLabel=p=>{s.textContent=p;},u.setDescription=p=>{p?c?c.textContent=p:(c=m("span",{className:"gemini-stat-row__desc"},p),i.appendChild(c)):c&&(c.remove(),c=null);},u}const bS=[{id:"badge-success",type:"Badge",label:"Success Badge",config:{label:"SUCCESS",type:"success"}},{id:"badge-warning",type:"Badge",label:"Warning Badge",config:{label:"WARNING",type:"warning"}},{id:"badge-danger",type:"Badge",label:"Danger Badge",config:{label:"DANGER",type:"danger"}},{id:"badge-info",type:"Badge",label:"Info Badge",config:{label:"INFO",type:"info"}},{id:"badge-primary",type:"Badge",label:"Primary Badge",config:{label:"NEW",type:"primary"}},{id:"button-primary",type:"Button",label:"Primary Button",config:{label:"Action",variant:"primary",size:"sm"}},{id:"button-danger",type:"Button",label:"Danger Button",config:{label:"Delete",variant:"danger",size:"sm"}},{id:"button-default",type:"Button",label:"Default Button",config:{label:"Cancel",variant:"default",size:"sm"}},{id:"switch-default",type:"Switch",label:"Toggle Switch",config:{label:"Enabled",checked:false}},{id:"input-text",type:"Input",label:"Text Input",config:{placeholder:"Enter text...",value:""}},{id:"input-number",type:"Input",label:"Number Input",config:{placeholder:"0",mode:"digits"}},{id:"select-basic",type:"Select",label:"Dropdown",config:{options:[{value:"a",label:"Option A"},{value:"b",label:"Option B"}],value:"a"}},{id:"slider-basic",type:"Slider",label:"Slider",config:{min:0,max:100,value:50}},{id:"range-basic",type:"Range",label:"Range Slider",config:{label:"Range",min:0,max:100,value:50}},{id:"label-default",type:"Label",label:"Label",config:{text:"Label Text",size:"md"}},{id:"divider-default",type:"Divider",label:"Divider",config:{}},{id:"statrow-basic",type:"StatRow",label:"Stat Row",config:{label:"Coins",value:"1,234"}},{id:"card-nested",type:"Card",label:"Nested Card",config:{title:"Nested",padding:"sm",variant:"soft"}},{id:"sprite-generic",type:"Sprite",label:"Sprite",config:{category:null,assetId:null}}];function Ga(e){try{switch(e.type){case "Badge":return nr(e.config).root;case "Button":return Be(e.config);case "Switch":return Yn(e.config).root;case "Input":return rn(e.config).root;case "Select":return qr(e.config).root;case "Slider":return fS(e.config).root;case "Range":{const t=gS(e.config);return t.root??t}case "Label":{const t=co(e.config);return t.root??t}case "Divider":{const t=mS(e.config);return t.root??t}case "StatRow":{const t=hS(e.config);return t.root??t}case "Card":{const t=_e(e.config);return t.appendChild(m("div",{textContent:"Nested content",style:"font-size: 11px; opacity: 0.7;"})),t}case "Sprite":{if(e.config.category&&e.config.assetId&&V.isReady())try{const t=V.toCanvas(e.config.category,e.config.assetId,{mutations:e.config.mutations||[],scale:1.5});return t.style.imageRendering="pixelated",t}catch{}return m("div",{textContent:"🌱",style:"font-size: 24px; opacity: 0.5; display: flex; align-items: center; justify-content: center;"})}default:return null}}catch(t){return console.warn("[Gemini] ComponentPalette: Failed to create",e.type,t),m("div",{textContent:"Error",style:"color: var(--color-danger);"})}}function xS(e={}){const t=m("div",{className:"component-palette",style:"display: grid; grid-template-columns: repeat(auto-fill, minmax(90px, 1fr)); gap: 8px;"});return bS.forEach(n=>{const r=m("div",{style:`
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 4px;
                padding: 8px;
                background: rgba(255,255,255,0.03);
                border-radius: 8px;
                cursor: grab;
                transition: background 0.2s, transform 0.1s;
                text-align: center;
                min-height: 60px;
                justify-content: center;
            `});r.setAttribute("draggable","true"),r.onmouseenter=()=>{r.style.background="rgba(255,255,255,0.08)";},r.onmouseleave=()=>{r.style.background="rgba(255,255,255,0.03)";},r.ondragstart=i=>{i.dataTransfer&&(i.dataTransfer.setData("application/json",JSON.stringify(n)),i.dataTransfer.effectAllowed="copy"),r.style.opacity="0.5",e.onDragStart?.(n,i);},r.ondragend=()=>{r.style.opacity="1";},r.onclick=()=>{e.onItemClick?.(n);};const o=Ga({...n,config:{...n.config}});o&&(o.style.pointerEvents="none",o.style.transform="scale(0.85)",o.style.maxWidth="100%",o.style.maxHeight="40px",o.style.overflow="hidden",r.appendChild(o));const a=m("small",{textContent:n.label,style:"font-size: 9px; opacity: 0.6; line-height: 1.2;"});r.appendChild(a),t.appendChild(r);}),t}function yS(e={}){const{width:t=400,height:n=300,gridSize:r=8,showGrid:o=true}=e;let a=r;const i=new Map;let s=1;const c=m("div",{className:"positioning-canvas-container",style:"display: flex; flex-direction: column; gap: 8px;"}),d=m("div",{style:"display: flex; gap: 8px; align-items: center; font-size: 11px;"});let l=false;const u=m("span",{textContent:`Grid: ${a}px`,style:"opacity: 0.6;"}),p=Be({label:o?"Grid On":"Grid Off",size:"sm",variant:"default",onClick:()=>{h.style.backgroundImage=h.style.backgroundImage?"":b(),p.textContent=h.style.backgroundImage?"Grid On":"Grid Off";}}),f=Be({label:"Preview",size:"sm",variant:"default",onClick:()=>{l=!l,f.textContent=l?"Edit Mode":"Preview",f.style.background=l?"var(--color-primary)":"",f.style.color=l?"#000":"",i.forEach(A=>{const M=A.element,G=M.querySelector("div:first-child"),L=M.querySelector('[style*="se-resize"]'),D=M.querySelector("div:has(select)");G&&(G.style.display=l?"none":"flex"),L&&(L.style.display=l?"none":"block"),D&&(D.style.display=l?"none":"flex"),M.style.pointerEvents=l?"none":"auto",M.style.border=l?"none":"1px solid rgba(255,255,255,0.15)",M.style.background=l?"transparent":"rgba(255,255,255,0.08)";}),h.style.border=l?"none":"2px dashed rgba(255,255,255,0.15)";}}),g=Be({label:"Clear All",size:"sm",variant:"danger",onClick:()=>$.clear()});d.appendChild(u),d.appendChild(p),d.appendChild(f),d.appendChild(g),c.appendChild(d);const b=()=>a<=0?"":`repeating-linear-gradient(
            0deg,
            transparent,
            transparent ${a-1}px,
            rgba(255,255,255,0.05) ${a-1}px,
            rgba(255,255,255,0.05) ${a}px
        ),
        repeating-linear-gradient(
            90deg,
            transparent,
            transparent ${a-1}px,
            rgba(255,255,255,0.05) ${a-1}px,
            rgba(255,255,255,0.05) ${a}px
        )`,h=m("div",{className:"positioning-canvas",style:`
            position: relative;
            width: ${t}px;
            height: ${n}px;
            min-height: ${n}px;
            background: rgba(0,0,0,0.3);
            border: 2px dashed rgba(255,255,255,0.15);
            border-radius: 8px;
            overflow: hidden;
            ${o?`background-image: ${b()};`:""}
        `}),x=m("div",{textContent:"Drop components here",style:`
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 12px;
            opacity: 0.3;
            pointer-events: none;
            transition: opacity 0.2s;
        `});h.appendChild(x);let k=null,y=null;const w=A=>a<=0?A:Math.round(A/a)*a,T=(A,M,G)=>Math.max(M,Math.min(G,A)),S=(A,M)=>{const G=h.getBoundingClientRect(),L={x:M.clientX-G.left,y:M.clientY-G.top};k={item:A,startX:M.clientX,startY:M.clientY,offsetX:L.x-A.position.x,offsetY:L.y-A.position.y},A.element.style.cursor="grabbing",A.element.style.zIndex=String(++s),A.zIndex=s,document.addEventListener("pointermove",C),document.addEventListener("pointerup",I);},C=A=>{if(!k)return;const M=h.getBoundingClientRect();let G=A.clientX-M.left-k.offsetX,L=A.clientY-M.top-k.offsetY;G=w(T(G,0,t-k.item.size.width)),L=w(T(L,0,n-k.item.size.height)),k.item.position={x:G,y:L},k.item.element.style.left=`${G}px`,k.item.element.style.top=`${L}px`;},I=()=>{k&&(k.item.element.style.cursor="",e.onItemMove?.(k.item.id,k.item.position)),k=null,document.removeEventListener("pointermove",C),document.removeEventListener("pointerup",I);},v=(A,M,G)=>{G.stopPropagation(),y={item:A,startX:G.clientX,startY:G.clientY,startW:A.size.width,startH:A.size.height,corner:M},document.addEventListener("pointermove",P),document.addEventListener("pointerup",E);},P=A=>{if(!y)return;const M=A.clientX-y.startX,G=A.clientY-y.startY;let L=y.startW,D=y.startH;y.corner.includes("e")&&(L=w(Math.max(40,y.startW+M))),y.corner.includes("s")&&(D=w(Math.max(24,y.startH+G))),y.item.size={width:L,height:D},y.item.element.style.width=`${L}px`,y.item.element.style.height=`${D}px`;},E=()=>{y&&e.onItemResize?.(y.item.id,y.item.size),y=null,document.removeEventListener("pointermove",P),document.removeEventListener("pointerup",E);},F=A=>{const M=A.type==="Sprite",G=m("div",{className:"positioned-item",style:`
                position: absolute;
                left: ${A.position.x}px;
                top: ${A.position.y}px;
                width: ${A.size.width}px;
                height: ${A.size.height}px;
                background: rgba(255,255,255,0.08);
                border: 1px solid rgba(255,255,255,0.15);
                border-radius: 6px;
                cursor: grab;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                z-index: ${A.zIndex};
            `}),L=m("div",{style:`
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 2px 4px;
                background: rgba(0,0,0,0.3);
                font-size: 9px;
                opacity: 0.9;
                cursor: grab;
                flex-wrap: ${M?"wrap":"nowrap"};
                gap: 4px;
            `});L.appendChild(m("span",{textContent:A.label,style:"font-weight: bold;"}));const D=m("button",{textContent:"×",style:"background: none; border: none; color: var(--color-danger); font-size: 12px; cursor: pointer; padding: 0 4px; margin-left: auto;"});D.onclick=R=>{R.stopPropagation(),$.removeItem(A.id);},L.appendChild(D);const j=m("div",{style:"flex: 1; padding: 4px; overflow: auto; display: flex; align-items: center; justify-content: center;"});if(j.appendChild(A.element),M){const R=m("div",{style:"display: flex; gap: 4px; padding: 4px; background: rgba(0,0,0,0.2); flex-wrap: wrap;"}),H="font-size: 9px; padding: 2px 4px; background: rgba(0,0,0,0.4); color: #fff; border: 1px solid rgba(255,255,255,0.2); border-radius: 3px; flex: 1; min-width: 60px; max-width: 80px;",B=m("select",{style:H});V.getCategories().forEach(fe=>{const Ee=m("option",{value:fe,textContent:fe});B.appendChild(Ee);});const ae=m("select",{style:H});ae.appendChild(m("option",{value:"",textContent:"Asset..."}));const X=m("select",{style:H});X.appendChild(m("option",{value:"",textContent:"None"})),["Gold","Rainbow","Wet","Chilled","Frozen","Dawnlit"].forEach(fe=>{X.appendChild(m("option",{value:fe,textContent:fe}));});const Y=()=>{ae.innerHTML="",ae.appendChild(m("option",{value:"",textContent:"Asset..."})),V.getCategoryId(B.value).forEach(Ee=>{ae.appendChild(m("option",{value:Ee,textContent:Ee}));});},se=()=>{j.innerHTML="";const fe=B.value,Ee=ae.value,Ht=X.value;if(!Ee){j.appendChild(m("span",{textContent:"🌱 Select asset",style:"opacity: 0.4; font-size: 11px;"}));return}try{const at=V.toCanvas(fe,Ee,{mutations:Ht?[Ht]:[],scale:2});at.style.imageRendering="pixelated",at.style.maxWidth="100%",at.style.maxHeight="100%",at.style.objectFit="contain",j.appendChild(at);}catch{j.appendChild(m("span",{textContent:"Sprite Not Found",style:"color: var(--color-danger); font-size: 10px;"}));}};B.onchange=()=>{Y(),se();},ae.onchange=se,X.onchange=se,[B,ae,X].forEach(fe=>{fe.onpointerdown=Ee=>Ee.stopPropagation(),fe.onclick=Ee=>Ee.stopPropagation();}),R.appendChild(B),R.appendChild(ae),R.appendChild(X),Y(),se(),G.appendChild(L),G.appendChild(R),G.appendChild(j);}else G.appendChild(L),G.appendChild(j);const z=m("div",{style:`
                position: absolute;
                right: 0;
                bottom: 0;
                width: 12px;
                height: 12px;
                cursor: se-resize;
                background: linear-gradient(135deg, transparent 50%, rgba(255,255,255,0.3) 50%);
            `});return z.onpointerdown=R=>v(A,"se",R),G.appendChild(z),L.onpointerdown=R=>S(A,R),G.onpointerdown=R=>{(R.target===G||R.target===j)&&S(A,R);},G};h.ondragover=A=>{A.preventDefault(),A.dataTransfer&&(A.dataTransfer.dropEffect="copy"),h.style.borderColor="var(--color-primary)",h.style.background="rgba(var(--color-primary-rgb, 0,200,150), 0.1)",x.style.opacity="0.6";},h.ondragleave=()=>{h.style.borderColor="rgba(255,255,255,0.15)",h.style.background="rgba(0,0,0,0.3)",x.style.opacity=i.size===0?"0.3":"0";},h.ondrop=A=>{A.preventDefault(),h.style.borderColor="rgba(255,255,255,0.15)",h.style.background="rgba(0,0,0,0.3)",x.style.opacity="0";const M=h.getBoundingClientRect(),G=w(A.clientX-M.left),L=w(A.clientY-M.top),D=new CustomEvent("canvas-drop",{detail:{x:G,y:L,dataTransfer:A.dataTransfer}});h.dispatchEvent(D);},c.appendChild(h);const $={root:c,addItem(A,M,G,L,D){const j=i.size,z=D?.width??100,R=D?.height??60,H=w(20+j*16%(t-z)),B=w(20+j*16%Math.max(20,n-R)),U={id:A,type:M,label:G,element:L,position:{x:H,y:B},size:{width:z,height:R},zIndex:++s},ae=F(U);return U.element=ae,i.set(A,U),h.appendChild(ae),x.style.opacity="0",U},removeItem(A){const M=i.get(A);M&&(M.element.remove(),i.delete(A),e.onItemRemove?.(A),i.size===0&&(x.style.opacity="0.3"));},getItems(){return Array.from(i.values())},clear(){i.forEach(A=>A.element.remove()),i.clear(),x.style.opacity="0.3";},setGridSize(A){a=A,u.textContent=`Grid: ${A}px`,h.style.backgroundImage&&(h.style.backgroundImage=b());},destroy(){document.removeEventListener("pointermove",C),document.removeEventListener("pointerup",I),document.removeEventListener("pointermove",P),document.removeEventListener("pointerup",E),i.clear();}};return $}function vS(){const e=(v,P)=>{P&&(P instanceof Node?v.appendChild(P):P.root instanceof Node?v.appendChild(P.root):console.warn("[Gemini] UI Gallery: Cannot mount child",P));},t=m("div",{className:"ui-gallery",style:"height: 100%; display: flex; flex-direction: column; gap: 24px; padding: 12px; overflow-y: auto;"}),n=(v,P)=>{const E=m("div",{style:"display: flex; flex-direction: column; gap: 12px; flex-shrink: 0;"}),F=m("div",{style:"border-left: 3px solid var(--color-primary); padding-left: 10px;"});return F.appendChild(m("strong",{style:"display: block; font-size: 15px; color: #fff;",textContent:v})),F.appendChild(m("small",{style:"opacity: 0.6; font-size: 12px;",textContent:P})),E.appendChild(F),E},r=n("Layout & Device Simulation","Test Geminis responsiveness and mobile views"),o=m("div",{style:"display: grid; grid-template-columns: 1fr 1fr; gap: 10px;"}),a=Re.isMobile(),i=Be({label:"Switch to Mobile (360px)",variant:a?"primary":"default",onClick:()=>{Re.setPlatformOverride("mobile");const v=document.querySelector("#gemini-hud-root");v&&(v.style.setProperty("--w","360px"),v.dispatchEvent(new CustomEvent("gemini:layout-resize",{detail:{width:360}}))),i.setVariant("primary"),s.setVariant("default");}}),s=Be({label:"Reset to Desktop",variant:a?"default":"primary",onClick:()=>{Re.setPlatformOverride(null);const v=document.querySelector("#gemini-hud-root");v&&(v.style.removeProperty("--w"),v.dispatchEvent(new CustomEvent("gemini:layout-resize",{detail:{width:null}}))),i.setVariant("default"),s.setVariant("primary");}});e(o,i),e(o,s),r.appendChild(o),t.appendChild(r);const c=n("Sprite Explorer","Live rendering of game assets and mutations"),d=_e({title:"MGSprite Live Preview",padding:"sm"}),l=m("div",{style:"display: flex; flex-direction: column; gap: 12px;"}),u=m("div",{style:"height: 140px; background: rgba(0,0,0,0.3); border-radius: 8px; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.1); position: relative; overflow: hidden;"});let p="plants",f="Carrot";const g=new Set,b=()=>{u.innerHTML="";try{const v=V.toCanvas(p,f,{mutations:Array.from(g),scale:1.5});v.style.maxHeight="90%",v.style.imageRendering="pixelated",u.appendChild(v);}catch{u.innerHTML='<small style="color:var(--color-danger)">Sprite Not Found</small>';}},h=qr({options:V.getCategories().map(v=>({value:v,label:v})),value:p,onChange:v=>{p=v;const P=V.getCategoryId(v);x.setOptions(P.map(E=>({value:E,label:E}))),P.length&&(f=P[0],x.setValue(P[0])),b();}}),x=qr({options:V.getCategoryId(p).map(v=>({value:v,label:v})),value:f,onChange:v=>{f=v,b();}}),k=m("div",{style:"display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 4px;"});["Gold","Rainbow","Wet","Chilled","Frozen","Dawnlit"].forEach(v=>{const P=m("div",{style:"display: flex; align-items: center; gap: 8px;"});e(P,Yn({checked:g.has(v),onChange:E=>{E?g.add(v):g.delete(v),b();}})),P.appendChild(m("span",{textContent:v,style:"font-size: 12px;"})),k.appendChild(P);}),e(l,h),e(l,x),l.appendChild(m("small",{textContent:"MUTATIONS",style:"opacity: 0.5; font-size: 10px; font-weight: bold; margin-top: 4px;"})),l.appendChild(k),d.appendChild(u),d.appendChild(l),c.appendChild(d),t.appendChild(c);const y=n("Interactive Card Builder","Drag components from below - free-form positioning with snap-to-grid!");y.className="card-builder";const w=yS({width:380,height:280,gridSize:8,showGrid:true,onItemMove:(v,P)=>console.log("[CardBuilder] Item moved:",v,P),onItemResize:(v,P)=>console.log("[CardBuilder] Item resized:",v,P),onItemRemove:v=>console.log("[CardBuilder] Item removed:",v)}),T=w.root.querySelector(".positioning-canvas");T&&T.addEventListener("canvas-drop",v=>{const P=v,{x:E,y:F,dataTransfer:$}=P.detail;try{const A=$?.getData("application/json");if(A){const M=JSON.parse(A),G=`${M.id}-${Date.now()}`,L=Ga(M);if(L){const D=w.addItem(G,M.type,M.label,L);D.position={x:E,y:F},D.element.style.left=`${E}px`,D.element.style.top=`${F}px`;}}}catch(A){console.warn("[Gemini] CardBuilder: Invalid drop data",A);}}),y.appendChild(w.root),t.appendChild(y);const S=n("Component Palette","Drag components into the Card Builder above"),I=xS({onItemClick:v=>{const P=`${v.id}-${Date.now()}`;if(v.type==="Sprite"){const E=m("div",{style:"width: 100%; height: 100%;"});w.addItem(P,"Sprite","Sprite",E,{width:160,height:120});}else {const E=Ga(v);E&&w.addItem(P,v.type,v.label,E);}y.scrollIntoView({behavior:"smooth"});}});return S.appendChild(I),t.appendChild(S),t.appendChild(m("div",{style:"height: 60px; flex-shrink: 0;"})),b(),t}function wS(){const e=m("div",{className:"pixi-inspector",style:"display: flex; flex-direction: column; gap: 12px; height: 100%; min-height: 0; overflow: hidden;"}),t=m("div",{style:"display: flex; flex-direction: column; gap: 10px; padding: 2px;"}),n=m("div",{style:"display: grid; grid-template-columns: 1fr 1fr auto; gap: 8px; align-items: end;"});let r=0,o=0,a=false;const i=rn({label:"Tile X",mode:"digits",value:"0",onChange:f=>{r=parseInt(f)||0,p();}}),s=rn({label:"Tile Y",mode:"digits",value:"0",onChange:f=>{o=parseInt(f)||0,p();}}),c=Be({label:"Pick from Canvas",variant:"default",onClick:()=>l()});i&&i.root&&n.appendChild(i.root),s&&s.root&&n.appendChild(s.root),n.appendChild(c),t.appendChild(n),e.appendChild(t);const d=m("div",{style:"flex: 1; min-height: 0; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; padding-right: 4px;"});e.appendChild(d);const l=()=>{a=!a,c.textContent=a?"🎯 Click any tile...":"Pick from Canvas",c.style.background=a?"var(--color-primary)":"",c.style.color=a?"#000":"",a?document.addEventListener("click",u,true):document.removeEventListener("click",u,true);},u=f=>{if(!a)return;const g=f.target;if(!g||g.tagName!=="CANVAS")return;f.preventDefault(),f.stopPropagation();const b=Je.pointToTile({x:f.clientX,y:f.clientY});b&&(r=b.tx,o=b.ty,i.setValue(String(r)),s.setValue(String(o)),p()),l();},p=()=>{d.innerHTML="";try{const f=Je.inspect(r,o),g=_e({title:`Tile (${r}, ${o})`,subtitle:`GIDX: ${f.gidx} | ${f.objectType||"EMPTY"}`,expandable:!0,padding:"sm"}),b=m("pre",{style:"margin: 0; padding: 8px; font-size: 11px; background: rgba(0,0,0,0.3); border-radius: 4px; color: var(--color-primary); overflow: auto; max-height: 400px;"});if(b.textContent=JSON.stringify(f.tileObject||{},(h,x)=>h==="tileView"||h==="displayObject"?"[Circular/Ref]":x,2),g.appendChild(b),f.objectType==="plant"){const h=f.tileObject?.plant?.speciesId,k=oe.get("plants")?.[h];if(k){const w=_e({title:k.name||h,subtitle:"SPECIES METADATA",variant:"soft",padding:"sm"}),T=m("div",{style:"font-size: 11px; display: flex; flex-direction: column; gap: 4px;"});T.appendChild(m("div",{textContent:`Base Grow Time: ${k.growTime}s`}));const S=Array.isArray(k.mutations)?k.mutations.join(", "):"None";T.appendChild(m("div",{textContent:`Mutations: ${S}`})),w.appendChild(T),d.appendChild(w);}const y=m("div",{style:"display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; padding: 8px; background: rgba(255,255,255,0.05); border-radius: 4px;"});y.appendChild(Be({label:"Clear Tile",size:"sm",variant:"danger",onClick:()=>{Je.setTileEmpty(r,o),p();}})),g.appendChild(y);}d.appendChild(g),sn.drawOverlayBox(r,o,{key:"pixi-inspect-hl",tint:8386303,alpha:.8});}catch(f){d.innerHTML=`<div style="color:var(--color-danger); padding: 10px;">Error: ${f instanceof Error?f.message:String(f)}</div>`;}};return e.destroy=()=>{document.removeEventListener("click",u,true),sn.stopOverlay("pixi-inspect-hl");},e}class SS extends Bt{constructor(){super({id:"dev",label:"DEV"});}build(t){const n="gemini-dev-section-styles";if(!document.getElementById(n)){const b=document.createElement("style");b.id=n,b.textContent=`
                /* Dev Section themed scrollbars */
                .gemini-dev-section *::-webkit-scrollbar {
                    width: 6px;
                    height: 6px;
                }
                .gemini-dev-section *::-webkit-scrollbar-track {
                    background: transparent;
                }
                .gemini-dev-section *::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.15);
                    border-radius: 3px;
                    transition: background 0.2s;
                }
                .gemini-dev-section *::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.25);
                }
                .gemini-dev-section *::-webkit-scrollbar-corner {
                    background: transparent;
                }
                /* Smooth scrolling for all containers */
                .gemini-dev-section .atom-inspector,
                .gemini-dev-section .pixi-inspector,
                .gemini-dev-section .ws-logger,
                .gemini-dev-section .ui-gallery {
                    scroll-behavior: smooth;
                }
            `,document.head.appendChild(b);}const r=m("div",{className:"gemini-dev-section",style:"height: 100%; display: flex; flex-direction: column;"}),o=m("div",{style:"padding: 6px 12px; background: rgba(0,0,0,0.3); border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; font-size: 11px;"}),a=ke(ul.AUTO_RELOAD,true),i=m("div",{style:"display: flex; align-items: center; gap: 12px;"}),s=m("input",{type:"checkbox",checked:a}),c=m("label",{style:"display: flex; align-items: center; gap: 4px; cursor: pointer;"});c.appendChild(s),c.appendChild(document.createTextNode("Auto-Reload on Save")),i.appendChild(c);const d=m("div",{style:"display: flex; align-items: center; gap: 8px;"}),l=m("button",{textContent:"Reload Script",style:"background: var(--color-primary); color: #fff; border: none; padding: 3px 8px; border-radius: 4px; cursor: pointer; font-weight: bold; display: none;"}),u=m("span",{textContent:"Vite Connected",style:"opacity: 0.5;"});d.appendChild(u),d.appendChild(l),o.appendChild(i),o.appendChild(d);const p=m("div",{style:"flex: 1; min-height: 0; display: flex; flex-direction: column; padding: 12px; overflow: hidden;"}),f=[{id:"atoms",label:"Atoms",content:pS()},{id:"ws",label:"WS Trace",content:cy()},{id:"pixi",label:"Pixi Tools",content:wS()},{id:"ui",label:"UI Gallery",content:vS()}],g=dl(f.map(b=>({id:b.id,label:b.label})),"atoms",b=>{p.innerHTML="";const h=f.find(x=>x.id===b);h&&p.appendChild(h.content);});r.appendChild(o),r.appendChild(g.root),r.appendChild(p),p.appendChild(f[0].content),t.appendChild(r);}}let Qo=null;function du(){return Qo||(Qo=new qb),Qo}function kS(e){const t=[new _p(e),new uw,new R0,new Ew,new dS(e)];return t.push(new SS),t.push(du()),t}async function CS(){await du().preload();}function TS(e){const{shadow:t,initialOpen:n}=e,r=m("div",{className:"gemini-panel",id:"panel",ariaHidden:String(!n)}),o=m("div",{className:"gemini-tabbar"}),a=m("div",{className:"gemini-content",id:"content"}),i=m("div",{className:"gemini-resizer",title:"Resize"}),s=m("button",{className:"gemini-close",title:"Fermer",ariaLabel:"Fermer"},"✕");r.append(o,a,i);const c=m("div",{className:"gemini-wrapper"},r);return t.append(c),{panel:r,tabbar:o,content:a,resizer:i,closeButton:s,wrapper:c}}function PS(e){const{resizer:t,host:n,shadow:r,onWidthChange:o,initialWidth:a,minWidth:i,maxWidth:s}=e;let c=i,d=s;function l(){const w=Re.detect(),T=Math.round(O.visualViewport?.width??O.innerWidth??0);if(w.platform==="mobile"||w.os==="ios"||w.os==="android"){const S=getComputedStyle(r.host),C=parseFloat(S.getPropertyValue("--inset-l"))||0,I=parseFloat(S.getPropertyValue("--inset-r"))||0,v=Math.max(280,T-Math.round(C+I));c=280,d=v;}else c=i,d=s;return {min:c,max:d}}function u(w){return Math.max(c,Math.min(d,Number(w)||a))}function p(w){const T=u(w);n.style.setProperty("--w",`${T}px`),o(T);}l();const f=Re.detect(),g=!(f.platform==="mobile"||f.os==="ios"||f.os==="android");let b=false;const h=w=>{if(!b)return;w.preventDefault();const T=Math.round(O.innerWidth-w.clientX);p(T);},x=()=>{b&&(b=false,document.body.style.cursor="",O.removeEventListener("mousemove",h),O.removeEventListener("mouseup",x));},k=w=>{g&&(w.preventDefault(),b=true,document.body.style.cursor="ew-resize",O.addEventListener("mousemove",h),O.addEventListener("mouseup",x));};t.addEventListener("mousedown",k);function y(){t.removeEventListener("mousedown",k),O.removeEventListener("mousemove",h),O.removeEventListener("mouseup",x);}return {calculateResponsiveBounds:l,constrainWidthToLimits:u,setHudWidth:p,destroy:y}}function AS(e){const{panel:t,onToggle:n,onClose:r,toggleCombo:o=c=>c.ctrlKey&&c.shiftKey&&c.key.toLowerCase()==="u",closeOnEscape:a=true}=e;function i(c){const d=t.classList.contains("open");if(a&&c.key==="Escape"&&d){r();return}o(c)&&(c.preventDefault(),c.stopPropagation(),n());}document.addEventListener("keydown",i,{capture:true});function s(){document.removeEventListener("keydown",i,{capture:true});}return {destroy:s}}const IS=`
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
`,_S=`
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
`,ES=`
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
`,MS=`
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
`,LS=`
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
  
`,RS=`
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
`,FS=`
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
`,NS=`
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
`,OS=`
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
`,BS=`
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
`,$S=`
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
`,DS=`
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
`,zS=`
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
`,GS=`
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
`,jS=`
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
`,HS=`
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
`,WS=`
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
`,US=`
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
`,VS=`
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
`,XS=`
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
`,KS=`
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
`,YS=`
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
`,qS=`
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
`,JS={all:"initial",position:"fixed",top:"0",right:"0",zIndex:"2147483647",pointerEvents:"auto",fontFamily:'system-ui, -apple-system, "Segoe UI", Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',fontSize:"13px",lineHeight:"1.35"};function QS(e="gemini-root"){const t=document.createElement("div");t.id=e,Object.assign(t.style,JS),(document.body||document.documentElement).appendChild(t);const n=t.attachShadow({mode:"open"});return {host:t,shadow:n}}function ZS(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:16}):setTimeout(e,0);})}async function ek(e){const{hostId:t="gemini-hud-root",initialWidth:n,initialOpen:r,onWidthChange:o,onOpenChange:a,themes:i,initialTheme:s,onThemeChange:c,buildSections:d,initialTab:l,onTabChange:u,toggleCombo:p=X=>X.ctrlKey&&X.shiftKey&&X.key.toLowerCase()==="u",closeOnEscape:f=true,minWidth:g=420,maxWidth:b=720}=e,{host:h,shadow:x}=QS(t),k=[[_S,"variables"],[ES,"primitives"],[MS,"utilities"],[IS,"hud"],[LS,"card"],[lu,"badge"],[RS,"button"],[zS,"checkbox"],[FS,"input"],[NS,"label"],[OS,"navTabs"],[BS,"searchBar"],[$S,"select"],[DS,"switch"],[GS,"table"],[jS,"teamListItem"],[HS,"timeRangePicker"],[WS,"tooltip"],[US,"slider"],[VS,"reorderableList"],[XS,"colorPicker"],[KS,"log"],[YS,"segmentedControl"],[qS,"settings"],[su,"teamCard"],[Xc,"autoFavoriteSettings"]];for(let X=0;X<k.length;X++){const[Y,se]=k[X];Oe(x,Y,se),X%5===4&&await ZS();}const{panel:y,tabbar:w,content:T,resizer:S,closeButton:C,wrapper:I}=TS({shadow:x,initialOpen:r});function v(X){y.dispatchEvent(new CustomEvent("gemini:hud-open-change",{detail:{isOpen:X},bubbles:true})),a?.(X);}function P(X){const Y=y.classList.contains("open");y.classList.toggle("open",X),y.setAttribute("aria-hidden",X?"false":"true"),X!==Y&&v(X);}P(r),C.addEventListener("click",X=>{X.preventDefault(),X.stopPropagation(),P(false);});const E=kp({host:h,themes:i,initialTheme:s,onThemeChange:c}),F=PS({resizer:S,host:h,shadow:x,onWidthChange:o||(()=>{}),initialWidth:n,minWidth:g,maxWidth:b});F.setHudWidth(n);const $=d({applyTheme:E.applyTheme,initialTheme:s,getCurrentTheme:E.getCurrentTheme,setHUDWidth:F.setHudWidth,setHUDOpen:P}),A=new Au($,T,{applyTheme:E.applyTheme,getCurrentTheme:E.getCurrentTheme}),M=$.map(X=>({id:X.id,label:X.label})),G=l&&$.some(X=>X.id===l)?l:M[0]?.id||"",L=dl(M,G,X=>{A.activate(X),u?.(X);});L.root.style.flex="1 1 auto",L.root.style.minWidth="0",w.append(L.root,C);const D={"tab-auto-favorite":"autoFavorite","tab-journal-checker":"journalChecker","tab-pets":"pets"};function j(){const X=ke($e.CONFIG,{autoFavorite:{enabled:false},journalChecker:{enabled:false},pets:{enabled:true}});for(const[Y,se]of Object.entries(D))X[se]?.enabled??false?L.showTab(Y):L.hideTab(Y);}function z(X){const{key:Y}=X.detail;(Y===$e.CONFIG||Y==="feature:config")&&j();}window.addEventListener(Vi.STORAGE_CHANGE,z),j();let R=G;if(!L.isTabVisible(G)){const X=L.getVisibleTabs();X.length>0&&(R=X[0]);}R&&A.activate(R);const H=AS({panel:y,onToggle:()=>P(!y.classList.contains("open")),onClose:()=>P(false),toggleCombo:p,closeOnEscape:f}),B=()=>{L.recalc();const X=parseInt(getComputedStyle(h).getPropertyValue("--w"))||n;F.calculateResponsiveBounds(),F.setHudWidth(X);};O.addEventListener("resize",B);const U=X=>{const Y=X.detail?.width;Y?F.setHudWidth(Y):F.setHudWidth(n),L.recalc();};h.addEventListener("gemini:layout-resize",U);function ae(){window.removeEventListener(Vi.STORAGE_CHANGE,z),H.destroy(),F.destroy(),O.removeEventListener("resize",B),h.removeEventListener("gemini:layout-resize",U);}return {host:h,shadow:x,wrapper:I,panel:y,content:T,setOpen:P,setWidth:F.setHudWidth,sections:$,manager:A,nav:L,destroy:ae}}const _n={isOpen:"gemini.hud.isOpen",width:"gemini.hud.width",theme:"gemini.hud.theme",activeTab:"gemini.hud.activeTab"},Br={isOpen:false,width:480,theme:"dark",activeTab:"tab-settings"};function tk(){return {isOpen:ke(_n.isOpen,Br.isOpen),width:ke(_n.width,Br.width),theme:ke(_n.theme,Br.theme),activeTab:ke(_n.activeTab,Br.activeTab)}}function $r(e,t){Ge(_n[e],t);}const nk="https://i.imgur.com/IMkhMur.png",rk="Stats";function ok(e){let t=e.iconUrl||nk;const n=e.ariaLabel||"Open MGH";let r=null,o=null,a=null,i=false,s=null,c=null;const d=["Chat","Leaderboard","Stats","Open Activity Log"],l=y=>{try{return typeof CSS<"u"&&CSS&&typeof CSS.escape=="function"?CSS.escape(y):y.replace(/"/g,'\\"')}catch{return y}};function u(){const y=document.querySelector(d.map(T=>`button[aria-label="${l(T)}"]`).join(","));if(!y)return null;let w=y.parentElement;for(;w&&w!==document.body;){if(d.reduce((S,C)=>S+w.querySelectorAll(`button[aria-label="${l(C)}"]`).length,0)>=2)return w;w=w.parentElement;}return null}function f(y){const w=Array.from(y.querySelectorAll("button[aria-label]"));if(!w.length)return {refBtn:null,refWrapper:null};const T=w.filter(F=>F.dataset.mghBtn!=="true"&&(F.getAttribute("aria-label")||"")!==(e.ariaLabel||"Open MGH")),S=T.length?T:w,C=S.find(F=>(F.getAttribute("aria-label")||"").toLowerCase()===rk.toLowerCase())||null,I=S.length>=2?S.length-2:S.length-1,v=C||S[I],P=v.parentElement,E=P&&P.parentElement===y&&P.tagName==="DIV"?P:null;return {refBtn:v,refWrapper:E}}function g(y,w,T){const S=y.cloneNode(false);S.type="button",S.setAttribute("aria-label",w),S.title=w,S.dataset.mghBtn="true",S.style.pointerEvents="auto",S.removeAttribute("id");const C=document.createElement("img");return C.src=T,C.alt="MGH",C.style.pointerEvents="none",C.style.userSelect="none",C.style.width="76%",C.style.height="76%",C.style.objectFit="contain",C.style.display="block",C.style.margin="auto",S.appendChild(C),S.addEventListener("click",I=>{I.preventDefault(),I.stopPropagation();try{e.onClick?.();}catch{}}),S}function b(){if(i)return  false;i=true;let y=false;try{const w=u();if(!w)return !1;s!==w&&(s=w);const{refBtn:T,refWrapper:S}=f(w);if(!T)return !1;o=w.querySelector('div[data-mgh-wrapper="true"]'),!o&&S&&(o=S.cloneNode(!1),o.dataset.mghWrapper="true",o.removeAttribute("id"),y=!0);const C=o?.querySelector('button[data-mgh-btn="true"]')||null;r||(r=C),r||(r=g(T,n,t),o?o.appendChild(r):r.parentElement!==w&&w.appendChild(r),y=!0),o&&o.parentElement!==w&&(w.appendChild(o),y=!0);const I=w;if(I&&I!==c){try{k.disconnect();}catch{}c=I,k.observe(c,{childList:!0,subtree:!0});}return y}finally{i=false;}}const h=document.getElementById("App")||document.body;let x=null;const k=new MutationObserver(y=>{const w=y.every(S=>{const C=Array.from(S.addedNodes||[]),I=Array.from(S.removedNodes||[]),v=C.concat(I);if(v.length===0){const P=S.target;return o&&(P===o||o.contains(P))||r&&(P===r||r.contains(P))}return v.every(P=>!!(!(P instanceof HTMLElement)||o&&(P===o||o.contains(P))||r&&(P===r||r.contains(P))))}),T=y.some(S=>Array.from(S.removedNodes||[]).some(C=>C instanceof HTMLElement?!!(o&&(C===o||o.contains(C))||r&&(C===r||r.contains(C))):false));w&&!T||x===null&&(x=window.setTimeout(()=>{if(x=null,b()&&o){const C=o.parentElement;C&&C.lastElementChild!==o&&C.appendChild(o);}},150));});return b(),k.observe(h,{childList:true,subtree:true}),a=()=>k.disconnect(),()=>{try{a?.();}catch{}try{o?.remove();}catch{}}}const uu=[];function ak(){return uu.slice()}function ik(e){uu.push(e);}function pu(e){try{return JSON.parse(e)}catch{return}}function il(e){if(typeof e=="string"){const t=pu(e);return t!==void 0?t:e}return e}function fu(e){if(e!=null){if(typeof e=="string"){const t=pu(e);return t!==void 0?fu(t):e}if(Array.isArray(e)&&typeof e[0]=="string")return e[0];if(typeof e=="object"){const t=e;return t.type??t.Type??t.kind??t.messageType}}}function sk(e){const t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function ee(e,t,n){const r=typeof t=="boolean"?t:true,o=typeof t=="function"?t:n,a=(i,s)=>{if(fu(i)!==e)return;const d=o(i,s);return d&&typeof d=="object"&&"kind"in d?d:typeof d=="boolean"?d?void 0:{kind:"drop"}:r?void 0:{kind:"drop"}};return ik(a),a}const vn=new WeakSet,sl=new WeakMap;function lk(e){const t=e.pageWindow,n=!!e.debug,r=e.middlewares&&e.middlewares.length?e.middlewares:ak();if(!r.length)return ()=>{};const o=p=>({ws:p,pageWindow:t,debug:n}),a=(p,f)=>{let g=p;for(const b of r){const h=b(g,o(f));if(h){if(h.kind==="drop")return {kind:"drop"};h.kind==="replace"&&(g=h.message);}}return g!==p?{kind:"replace",message:g}:void 0};let i=null,s=null,c=null;const d=()=>{const p=t?.MagicCircle_RoomConnection,f=p?.sendMessage;if(!p||typeof f!="function")return  false;if(vn.has(f))return  true;const g=f.bind(p);function b(...h){const x=h.length===1?h[0]:h,k=il(x),y=a(k,sk(t));if(y?.kind==="drop"){n&&console.log("[WS] drop outgoing (RoomConnection.sendMessage)",k);return}if(y?.kind==="replace"){const w=y.message;return h.length>1&&Array.isArray(w)?(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",k,"=>",w),g(...w)):(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",k,"=>",w),g(w))}return g(...h)}vn.add(b),sl.set(b,f);try{p.sendMessage=b,vn.add(p.sendMessage),n&&console.log("[WS] outgoing patched via MagicCircle_RoomConnection.sendMessage");}catch{return  false}return i=()=>{try{p.sendMessage===b&&(p.sendMessage=f);}catch{}},true};(()=>{const p=t?.WebSocket?.prototype,f=p?.send;if(typeof f!="function"||vn.has(f))return;function g(b){const h=il(b),x=a(h,this);if(x?.kind==="drop"){n&&console.log("[WS] drop outgoing (ws.send)",h);return}if(x?.kind==="replace"){const k=x.message,y=typeof k=="string"||k instanceof ArrayBuffer||k instanceof Blob?k:JSON.stringify(k);return n&&console.log("[WS] replace outgoing (ws.send)",h,"=>",k),f.call(this,y)}return f.call(this,b)}vn.add(g),sl.set(g,f);try{p.send=g,n&&console.log("[WS] outgoing patched via WebSocket.prototype.send");}catch{return}s=()=>{try{p.send===g&&(p.send=f);}catch{}};})();const u=e.waitForRoomConnectionMs??4e3;if(!d()&&u>0){const p=Date.now();c=setInterval(()=>{if(d()){clearInterval(c),c=null;return}Date.now()-p>u&&(clearInterval(c),c=null,n&&console.log("[WS] RoomConnection not found, only ws.send is patched"));},250);}return ()=>{if(c){try{clearInterval(c);}catch{}c=null;}if(i){try{i();}catch{}i=null;}if(s){try{s();}catch{}s=null;}}}(function(){try{const t=({ url: (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('__entry.js', document.baseURI).href) }),n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();const gu=[];function ck(){return gu.slice()}function ll(e){gu.push(e);}function dk(e){if(e!=null){if(typeof e=="object"){const t=e;if(typeof t.type=="string")return t.type;if(typeof t.Type=="string")return t.Type;if(typeof t.kind=="string")return t.kind;if(typeof t.messageType=="string")return t.messageType}if(Array.isArray(e)&&typeof e[0]=="string")return e[0]}}function uk(e){if(typeof e=="string")try{return JSON.parse(e)}catch{return e}return e}const Zo=Symbol.for("ariesmod.ws.handlers.patched");function Te(e,t){if(typeof e=="string"){const o=e,a={match:i=>i.kind==="message"&&i.type===o,handle:t};return ll(a),a}const n=e,r={match:o=>o.kind==="close"&&o.code===n,handle:t};return ll(r),r}function pk(e,t=ck(),n={}){const r=n.pageWindow??window,o=!!n.debug;if(e[Zo])return ()=>{};e[Zo]=true;const a={ws:e,pageWindow:r,debug:o},i=u=>{for(const p of t)try{if(!p.match(u))continue;if(p.handle(u,a)===!0)return}catch(f){o&&console.error("[WS] handler error",f,u);}},s=u=>{const p=uk(u.data),f=dk(p);i({kind:"message",raw:u.data,data:p,type:f});},c=u=>{i({kind:"close",code:u.code,reason:u.reason,wasClean:u.wasClean,event:u});},d=u=>i({kind:"open",event:u}),l=u=>i({kind:"error",event:u});return e.addEventListener("message",s),e.addEventListener("close",c),e.addEventListener("open",d),e.addEventListener("error",l),()=>{try{e.removeEventListener("message",s);}catch{}try{e.removeEventListener("close",c);}catch{}try{e.removeEventListener("open",d);}catch{}try{e.removeEventListener("error",l);}catch{}try{delete e[Zo];}catch{}}}(function(){try{const t=({ url: (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('__entry.js', document.baseURI).href) }),n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();Te(ot.AuthenticationFailure,(e,t)=>{t.debug&&console.log("[WS][Close] Auth failure",e.code,e.reason);});Te(ot.ConnectionSuperseded,(e,t)=>{t.debug&&console.log("[WS][Close] Superseded",e.code,e.reason);});Te(ot.HeartbeatExpired,(e,t)=>{t.debug&&console.log("[WS][Close] Heartbeat expired",e.code,e.reason);});Te(ot.PlayerKicked,(e,t)=>{t.debug&&console.log("[WS][Close] Player kicked",e.code,e.reason);});Te(ot.PlayerLeftVoluntarily,(e,t)=>{t.debug&&console.log("[WS][Close] Player left voluntarily",e.code,e.reason);});Te(ot.ReconnectInitiated,(e,t)=>{t.debug&&console.log("[WS][Close] Reconnect initiated",e.code,e.reason);});Te(ot.ServerDisposed,(e,t)=>{t.debug&&console.log("[WS][Close] Server disposed",e.code,e.reason);});Te(ot.UserSessionSuperseded,(e,t)=>{t.debug&&console.log("[WS][Close] User session superseded",e.code,e.reason);});Te(ot.VersionExpired,(e,t)=>{t.debug&&console.log("[WS][Close] Version expired",e.code,e.reason);});Te(ot.VersionMismatch,(e,t)=>{t.debug&&console.log("[WS][Close] Version mismatch",e.code,e.reason);});Te(xt.Config,(e,t)=>{t.debug&&console.log("[WS][STC] Config",e.data);});Te(xt.CurrencyTransaction,(e,t)=>{t.debug&&console.log("[WS][STC] CurrencyTransaction",e.data);});Te(xt.Emote,(e,t)=>{t.debug&&console.log("[WS][STC] Emote",e.data);});Te(xt.InappropriateContentRejected,(e,t)=>{t.debug&&console.log("[WS][STC] InappropriateContentRejected",e.data);});Te(xt.PartialState,(e,t)=>{t.debug&&console.log("[WS][STC] PartialState",e.data);});Te(xt.Pong,(e,t)=>{t.debug&&console.log("[WS][STC] Pong",e.data);});Te(xt.ServerErrorMessage,(e,t)=>{t.debug&&console.log("[WS][STC] ServerErrorMessage",e.data);});Te(xt.Welcome,(e,t)=>{t.debug&&console.log("[WS][STC] Welcome",e.data);});ee(N.PlantSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantSeed"),true));ee(N.WaterPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] WaterPlant"),true));ee(N.HarvestCrop,(e,t)=>(t.debug&&console.log("[MW][Garden] HarvestCrop"),true));ee(N.SellAllCrops,(e,t)=>(t.debug&&console.log("[MW][Garden] SellAllCrops"),true));ee(N.PurchaseSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseSeed"),true));ee(N.PurchaseEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseEgg"),true));ee(N.PurchaseTool,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseTool"),true));ee(N.PurchaseDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseDecor"),true));ee(N.PlantEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantEgg"),true));ee(N.HatchEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] HatchEgg"),true));ee(N.PlantGardenPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantGardenPlant"),true));ee(N.PotPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PotPlant"),true));ee(N.MutationPotion,(e,t)=>(t.debug&&console.log("[MW][Garden] MutationPotion"),true));ee(N.PickupDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PickupDecor"),true));ee(N.PlaceDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PlaceDecor"),true));ee(N.RemoveGardenObject,(e,t)=>(t.debug&&console.log("[MW][Garden] RemoveGardenObject"),true));ee(N.MoveInventoryItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveInventoryItem"),true));ee(N.DropObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] DropObject"),true));ee(N.PickupObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] PickupObject"),true));ee(N.ToggleFavoriteItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] ToggleFavoriteItem"),true));ee(N.PutItemInStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] PutItemInStorage"),true));ee(N.RetrieveItemFromStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] RetrieveItemFromStorage"),true));ee(N.MoveStorageItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveStorageItem"),true));ee(N.LogItems,(e,t)=>(t.debug&&console.log("[MW][Inventory] LogItems"),true));ee(N.PlacePet,(e,t)=>(t.debug&&console.log("[MW][Pets] PlacePet"),true));ee(N.FeedPet,(e,t)=>(t.debug&&console.log("[MW][Pets] FeedPet"),true));ee(N.PetPositions,(e,t)=>(t.debug&&console.log("[MW][Pets] PetPositions"),true));ee(N.SwapPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SwapPet"),true));ee(N.StorePet,(e,t)=>(t.debug&&console.log("[MW][Pets] StorePet"),true));ee(N.NamePet,(e,t)=>(t.debug&&console.log("[MW][Pets] NamePet"),true));ee(N.SellPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SellPet"),true));console.log("[WS] TESTTEST");ee(N.SetSelectedGame,(e,t)=>(t.debug&&console.log("[MW][Session] SetSelectedGame"),true));ee(N.VoteForGame,(e,t)=>(t.debug&&console.log("[MW][Session] VoteForGame"),true));ee(N.RequestGame,(e,t)=>(t.debug&&console.log("[MW][Session] RequestGame"),true));ee(N.RestartGame,(e,t)=>(t.debug&&console.log("[MW][Session] RestartGame"),true));ee(N.Ping,(e,t)=>(t.debug&&console.log("[MW][Session] Ping"),true));ee(N.PlayerPosition,(e,t)=>(t.debug&&console.log("[MW][Session] PlayerPosition"),true));ee(N.Teleport,(e,t)=>(t.debug&&console.log("[MW][Session] Teleport"),true));ee(N.CheckWeatherStatus,(e,t)=>(t.debug&&console.log("[MW][Session] CheckWeatherStatus"),true));ee(N.Chat,(e,t)=>(t.debug&&console.log("[MW][Social] Chat"),true));ee(N.Dev,(e,t)=>(t.debug&&console.log("[MW][Social] Dev"),true));ee(N.Emote,(e,t)=>(t.debug&&console.log("[MW][Social] Emote"),true));ee(N.Wish,(e,t)=>(t.debug&&console.log("[MW][Social] Wish"),true));ee(N.KickPlayer,(e,t)=>(t.debug&&console.log("[MW][Social] KickPlayer"),true));ee(N.ReportSpeakingStart,(e,t)=>(t.debug&&console.log("[MW][Voice] ReportSpeakingStart"),true));ee(N.SetPlayerData,(e,t)=>(t.debug&&console.log("[MW][Social] SetPlayerData"),true));ee(N.UsurpHost,(e,t)=>(t.debug&&console.log("[MW][Social] UsurpHost"),true));function fk(e={}){const t=e.pageWindow??O,n=e.pollMs??500,r=!!e.debug,o=[];o.push(py(t,{debug:r})),o.push(lk({pageWindow:t,middlewares:e.middlewares,debug:r}));let a=null;const i=s=>{if(a){try{a();}catch{}a=null;}s&&(a=pk(s,e.handlers,{debug:r,pageWindow:t}));};return i(ao(t).ws),o.push(td(s=>i(s.ws),{intervalMs:n,debug:r,pageWindow:t})),{getWs:()=>ao(t).ws,dispose:()=>{for(let s=o.length-1;s>=0;s--)try{o[s]();}catch{}if(a){try{a();}catch{}a=null;}}}}let Dr=null;function gk(e={}){return Dr||(Dr=fk(e),Dr)}function mk(e){e.logStep("WebSocket","Capturing WebSocket...");let t=null;return t=td(n=>{n.ws&&(e.logStep("WebSocket","WebSocket captured","success"),t?.(),t=null);},{intervalMs:250}),gk({debug:false}),()=>{t?.(),t=null;}}async function hk(e){e.logStep("Atoms","Prewarming Jotai store...");try{await eg(),await qf({timeoutMs:8e3,intervalMs:50}),e.logStep("Atoms","Jotai store ready","success");}catch(t){e.logStep("Atoms","Jotai store not captured yet","error"),console.warn("[Bootstrap] Jotai store wait failed",t);}}function bk(e){e.logStep("Globals","Initializing global variables...");try{Zc(),e.logStep("Globals","Global variables ready","success");}catch(t){e.logStep("Globals","Failed to initialize global variables","error"),console.warn("[Bootstrap] Global variables init failed",t);}}function xk(e){e.logStep("API","Exposing Gemini API...");try{uS(),e.logStep("API","Gemini API ready","success");}catch(t){e.logStep("API","Failed to expose API","error"),console.warn("[Bootstrap] API init failed",t);}}function ea(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0);})}async function yk(e){e.logStep("HUD","Loading HUD preferences..."),await ea();const t=tk();await ea();const n=await ek({hostId:"gemini-hud-root",initialWidth:t.width,initialOpen:t.isOpen,onWidthChange:r=>$r("width",r),onOpenChange:r=>$r("isOpen",r),themes:Mn,initialTheme:t.theme,onThemeChange:r=>$r("theme",r),buildSections:r=>kS({applyTheme:r.applyTheme,initialTheme:r.initialTheme,getCurrentTheme:r.getCurrentTheme,setHUDWidth:r.setHUDWidth,setHUDOpen:r.setHUDOpen}),initialTab:t.activeTab,onTabChange:r=>$r("activeTab",r)});return await ea(),e.logStep("HUD","HUD ready","success"),n}async function vk(e){e.setSubtitle("Activating Gemini modules...");const t=7;let n=0;await Vc(r=>{r.status==="success"?(n++,e.logStep("Modules",`Loading modules... (${n}/${t})`)):r.status==="error"&&e.logStep("Modules",`Loading modules... (${n}/${t}) - ${r.name} failed`,"error");}),e.logStep("Modules",`All modules loaded (${t}/${t})`,"success");}async function wk(e){e.logStep("Sprites","Warming up sprite cache...");try{V.isReady()||await V.init();const t=[],n=oe.get("plants");if(n)for(const i of Object.values(n))i?.seed?.spriteId&&t.push(i.seed.spriteId),i?.plant?.spriteId&&t.push(i.plant.spriteId),i?.crop?.spriteId&&t.push(i.crop.spriteId);const r=oe.get("pets");if(r)for(const i of Object.values(r))i?.spriteId&&t.push(i.spriteId);const o=[...new Set(t)],a=o.length;if(a===0){e.logStep("Sprites","No sprites to warmup","success");return}await V.warmup(o,(i,s)=>{e.logStep("Sprites",`Loading sprites (${i}/${s})...`);},5),e.logStep("Sprites",`${a} sprites loaded`,"success");}catch(t){e.logStep("Sprites","Sprite warmup failed","error"),console.warn("[Bootstrap] Sprite warmup failed",t);}}async function Sk(e){e.logStep("Sections","Preloading UI sections...");try{await CS(),e.logStep("Sections","Sections preloaded","success");}catch(t){e.logStep("Sections","Sections preload failed","error"),console.warn("[Bootstrap] Sections preload failed",t);}}function kk(e){e.logStep("Features","Initializing features...");const t=[{name:"AntiAfk",init:Rt.init.bind(Rt)},{name:"PetTeam",init:de.init.bind(de)},{name:"BulkFavorite",init:io.init.bind(io)},{name:"XPTracker",init:Kn.init.bind(Kn)}],n=[{name:"BulkFavoriteInject",init:za.init.bind(za)}];let r=0;for(const a of t)try{a.init(),r++,e.logStep("Features",`Initializing features... (${r}/${t.length})`,"info");}catch(i){e.logStep("Features",`Initializing features... (${r}/${t.length}) - ${a.name} failed`,"error"),console.warn(`[Bootstrap] Feature ${a.name} init failed`,i);}e.logStep("Features",`All features initialized (${t.length}/${t.length})`,"success"),e.logStep("UIInjections","Initializing UI injections...");let o=0;for(const a of n)try{a.init(),o++;}catch(i){console.warn(`[Bootstrap] UI injection ${a.name} init failed`,i);}e.logStep("UIInjections",`UI injections initialized (${o}/${n.length})`,"success");}Nl();Vf();(async function(){Ru();const e=Tu({title:"Gemini is loading",subtitle:"Connecting and preparing modules..."});let t=null;try{t=mk(e),await hk(e),bk(e),xk(e),await Promise.all([vk(e),(async()=>{await wk(e);})(),(async()=>{await Sk(e);})(),(async()=>{kk(e);})()]),e.succeed("Gemini is ready!");}catch(r){e.fail("Failed to initialize the mod.",r);}finally{t?.();}const n=await yk(e);ok({onClick:()=>n.setOpen(true)});})();

})();