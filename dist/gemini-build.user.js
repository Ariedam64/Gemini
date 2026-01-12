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
  var zc=Object.defineProperty;var Gc=(e,t,n)=>t in e?zc(e,t,{enumerable:true,configurable:true,writable:true,value:n}):e[t]=n;var H=(e,t,n)=>Gc(e,typeof t!="symbol"?t+"":t,n);function b(e,t=null,...n){const r=document.createElement(e);for(const[o,i]of Object.entries(t||{}))i!=null&&(o==="style"?typeof i=="string"?r.setAttribute("style",i):typeof i=="object"&&Object.assign(r.style,i):o.startsWith("on")&&typeof i=="function"?r[o.toLowerCase()]=i:o in r?r[o]=i:r.setAttribute(o,String(i)));for(const o of n)o==null||o===false||r.appendChild(typeof o=="string"||typeof o=="number"?document.createTextNode(String(o)):o);return r}const Nn="https://i.imgur.com/k5WuC32.png",Vi="gemini-loader-style",vt="gemini-loader",rs=80;function Hc(){if(document.getElementById(Vi))return;const e=document.createElement("style");e.id=Vi,e.textContent=`
    /* ===== Loader Variables ===== */
    #${vt} {
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
    #${vt} {
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

    #${vt}.gemini-loader--error .gemini-loader__actions {
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
    #${vt}.gemini-loader--closing {
      animation: gemini-loader-fade-out 0.4s ease forwards;
      pointer-events: none;
    }

    #${vt}.gemini-loader--error .gemini-loader__spinner {
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
      #${vt} { padding: 16px 10px; }
      .gemini-loader__card { padding: 16px; }
      .gemini-loader__header { gap: 12px; }
      .gemini-loader__spinner { width: 42px; height: 42px; }
      .gemini-loader__spinner-icon { width: 56px; height: 56px; }
      .gemini-loader__title { font-size: 16px; }
    }
  `;const t=document.head||document.documentElement||document.body;if(t){t.appendChild(e);return}const n=()=>{(document.head||document.documentElement||document.body)?.appendChild(e);};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",n,{once:true}):setTimeout(n,0);}function $n(e,t,n){const r=b("div",{className:`gemini-loader__log ${n}`},b("div",{className:"gemini-loader__dot"}),b("div",{textContent:t}));for(e.appendChild(r);e.childElementCount>rs;)e.firstElementChild?.remove();e.scrollTop=e.scrollHeight;}function Wc(){return new Promise(e=>{if(typeof GM_xmlhttpRequest>"u"){e(Nn);return}GM_xmlhttpRequest({method:"GET",url:Nn,responseType:"blob",onload:t=>{const n=t.response,r=new FileReader;r.onloadend=()=>e(r.result),r.onerror=()=>e(Nn),r.readAsDataURL(n);},onerror:()=>e(Nn)});})}function Uc(e={}){const t=Number.isFinite(e.blurPx)?Math.max(4,Number(e.blurPx)):14;Hc();const n=b("div",{className:"gemini-loader__subtitle",textContent:e.subtitle??"Initializing the mod..."}),r=b("div",{className:"gemini-loader__logs"}),o=b("img",{className:"gemini-loader__spinner-icon",alt:"Gemini"}),i=b("div",{className:"gemini-loader__spinner"},o);Wc().then(h=>{o.src=h;});const a=b("div",{className:"gemini-loader__card"},b("div",{className:"gemini-loader__header"},i,b("div",{className:"gemini-loader__titles"},b("div",{className:"gemini-loader__title",textContent:e.title??"Gemini is loading"}),n)),r),s=b("div",{id:vt},a);(document.body||document.documentElement).appendChild(s);const c=b("div",{className:"gemini-loader__actions"},b("button",{className:"gemini-loader__button",textContent:"Close loader",onclick:()=>s.remove()}));a.appendChild(c),s.style.setProperty("--loader-blur",`${t}px`);const d=h=>{n.textContent=h;},l=new Map,u=(h,y)=>{h.className=`gemini-loader__log ${y}`;};return {log:(h,y="info")=>$n(r,h,y),logStep:(h,y,S="info")=>{const w=String(h||"").trim();if(!w){$n(r,y,S);return}const x=l.get(w);if(x){x.el.lastElementChild&&(x.el.lastElementChild.textContent=y),x.tone!==S&&(u(x.el,S),x.tone=S);return}const I=b("div",{className:`gemini-loader__log ${S}`},b("div",{className:"gemini-loader__dot"}),b("div",{textContent:y}));for(l.set(w,{el:I,tone:S}),r.appendChild(I);r.childElementCount>rs;){const v=r.firstElementChild;if(!v)break;const C=Array.from(l.entries()).find(([,T])=>T.el===v)?.[0];C&&l.delete(C),v.remove();}r.scrollTop=r.scrollHeight;},setSubtitle:d,succeed:(h,y=600)=>{h&&$n(r,h,"success"),s.classList.add("gemini-loader--closing"),setTimeout(()=>s.remove(),y);},fail:(h,y)=>{$n(r,h,"error"),d("Something went wrong. Check the console for details."),s.classList.add("gemini-loader--error"),console.error("[Gemini loader]",h,y);}}}const Ki=150,Vc=30;function Kc(e,t,n){const r=b("div",{className:"lg-pill",id:"pill"}),o=e.map(k=>{const P=b("button",{className:"lg-tab"},k.label);return P.setAttribute("data-target",k.id),P}),i=b("div",{className:"lg-tabs",id:"lg-tabs-row"},r,...o),a=new Map(e.map(k=>[k.id,true])),s=new Map(o.map((k,P)=>[e[P].id,k]));function c(k){const P=document.createElementNS("http://www.w3.org/2000/svg","svg");P.setAttribute("viewBox","0 0 24 24"),P.setAttribute("fill","none"),P.setAttribute("stroke","currentColor"),P.setAttribute("stroke-width","2"),P.setAttribute("stroke-linecap","round"),P.setAttribute("stroke-linejoin","round");const E=document.createElementNS("http://www.w3.org/2000/svg","polyline");return E.setAttribute("points",k==="left"?"15 18 9 12 15 6":"9 18 15 12 9 6"),P.appendChild(E),P}const d=b("button",{className:"lg-tabs-arrow lg-tabs-arrow-left",ariaLabel:"Scroll left"});d.appendChild(c("left"));const l=b("button",{className:"lg-tabs-arrow lg-tabs-arrow-right",ariaLabel:"Scroll right"});l.appendChild(c("right"));const p=b("div",{className:"lg-tabs-wrapper"},d,i,l);let f=0,g=0,m=false;function h(){const k=i.scrollLeft>0,P=i.scrollLeft<i.scrollWidth-i.clientWidth-1;d.classList.toggle("disabled",!k),l.classList.toggle("disabled",!P);}d.addEventListener("click",()=>{i.scrollBy({left:-Ki,behavior:"smooth"}),setTimeout(h,300);}),l.addEventListener("click",()=>{i.scrollBy({left:Ki,behavior:"smooth"}),setTimeout(h,300);}),i.addEventListener("wheel",k=>{Math.abs(k.deltaY)>Math.abs(k.deltaX)&&(k.preventDefault(),i.scrollLeft+=k.deltaY,h());},{passive:false});let y=0;i.addEventListener("touchstart",k=>{const P=k.touches[0];f=P.clientX,g=P.clientY,m=false,y=i.scrollLeft;},{passive:true}),i.addEventListener("touchmove",k=>{if(m)return;const P=k.touches[0],E=P.clientX-f,O=P.clientY-g;if(Math.abs(O)>Math.abs(E)){m=true;return}Math.abs(E)>Vc&&(k.preventDefault(),i.scrollLeft=y-E);},{passive:false}),i.addEventListener("touchend",()=>{h();},{passive:true}),i.addEventListener("scroll",h,{passive:true});function S(k){const P=o.find(E=>E.dataset.target===k)||o[0];P&&requestAnimationFrame(()=>{const E=P.offsetLeft,O=P.offsetWidth;r.style.width=`${O}px`,r.style.transform=`translateX(${E}px)`;const ee=i.scrollLeft,B=ee,V=ee+i.clientWidth,ae=E-12,$=E+O+12;ae<B?i.scrollTo({left:ae,behavior:"smooth"}):$>V&&i.scrollTo({left:$-i.clientWidth,behavior:"smooth"}),setTimeout(h,300);});}function w(){for(const[k,P]of a)if(P)return k;return null}function x(k){const P=s.get(k);if(P)if(a.set(k,false),P.style.display="none",C===k){const E=w();E&&T(E);}else v();}function I(k){const P=s.get(k);P&&(a.set(k,true),P.style.display="",v());}function v(){S(C),h();}let C=t||(e[0]?.id??"");function T(k){a.get(k)&&(C=k,o.forEach(P=>P.classList.toggle("active",P.dataset.target===k)),S(k),n(k));}return o.forEach(k=>k.addEventListener("click",()=>T(k.dataset.target))),queueMicrotask(()=>{S(C),h();}),{root:p,activate:T,recalc:v,getActive:()=>C,showTab:I,hideTab:x,isTabVisible:k=>a.get(k)??false,getVisibleTabs:()=>[...a.entries()].filter(([k,P])=>P).map(([k])=>k)}}class Ut{constructor(t){H(this,"id");H(this,"label");H(this,"container",null);H(this,"cleanupFunctions",[]);H(this,"preloadedContent",null);H(this,"preloadPromise",null);this.id=t.id,this.label=t.label;}async preload(){if(this.preloadedContent||this.preloadPromise)return;const t=b("div");this.preloadPromise=(async()=>{const n=this.build(t);n instanceof Promise&&await n,this.preloadedContent=t,this.preloadPromise=null;})(),await this.preloadPromise;}isPreloaded(){return this.preloadedContent!==null}render(t){for(this.unmount();t.firstChild;)t.removeChild(t.firstChild);if(this.container=t,this.preloadedContent){for(;this.preloadedContent.firstChild;)t.appendChild(this.preloadedContent.firstChild);this.preloadedContent=null;}else {const r=this.build(t);r instanceof Promise&&r.catch(o=>{console.error(`[Gemini] Error building section ${this.id}:`,o);});}const n=t.firstElementChild;n&&n.classList.contains("gemini-section")&&n.classList.add("active");}unmount(){this.executeCleanup(),this.container=null;}createContainer(t,n){const r=n?`gemini-section ${n}`:"gemini-section";return b("section",{id:t,className:r})}addCleanup(t){this.cleanupFunctions.push(t);}createGrid(t="12px"){const n=b("div");return n.style.display="grid",n.style.gap=t,n}executeCleanup(){for(const t of this.cleanupFunctions)try{t();}catch(n){console.error(`[Gemini] Cleanup error in section ${this.id}:`,n);}this.cleanupFunctions=[];}}class Yc{constructor(t,n,r){H(this,"sections");H(this,"activeId",null);H(this,"container");H(this,"theme");this.sections=new Map(t.map(o=>[o.id,o])),this.container=n,this.theme=r;}get ids(){return Array.from(this.sections.keys())}get all(){return Array.from(this.sections.values())}get active(){return this.activeId}activate(t){if(this.activeId!==t){if(!this.sections.has(t))throw new Error(`[Gemini] Unknown section: ${t}`);if(this.activeId&&this.sections.get(this.activeId).unmount(),this.activeId=t,this.sections.get(t).render(this.container),this.theme){const n=this.theme.getCurrentTheme();this.theme.applyTheme(n);}}}}const ct="gemini:",qc={STATE:"hud:state",THEME:"hud:theme"},Xc={ALL:"sections",SETTINGS:"sections:settings",TEST:"sections:test"},Jc={},Qc={MY_PETS_ABILITY_LOGS:"global:myPets:abilityLogs"},Ee={AUTO_FAVORITE:"feature:autoFavorite:config",AUTO_FAVORITE_UI:"feature:autoFavorite:ui",JOURNAL_CHECKER:"feature:journalChecker:config",BULK_FAVORITE:"feature:bulkFavorite:config",ACHIEVEMENTS:"feature:achievements:data",TRACKER_STATS:"feature:tracker:stats",ANTI_AFK:"feature:antiAfk:config",CONFIG:"feature:config",PET_TEAM:"feature:petTeam:config"},Zc={AUTO_RELOAD:"dev:auto-reload"},os={HUD:qc,SECTION:Xc,MODULE:Jc,GLOBAL:Qc,FEATURE:Ee,DEV:Zc},Yi={STORAGE_CHANGE:"gemini:storage:change"};function Se(e,t){try{const n=e.startsWith(ct)?e:ct+e,r=GM_getValue(n);return r==null?t:typeof r=="string"?JSON.parse(r):r}catch(n){return console.error(`[Gemini Storage] Failed to read key "${e}":`,n),t}}function Le(e,t){try{const n=e.startsWith(ct)?e:ct+e,r=e.startsWith(ct)?e.slice(ct.length):e,o=JSON.stringify(t);GM_setValue(n,o),window.dispatchEvent(new CustomEvent("gemini:storage:change",{detail:{key:r,value:t}}));}catch(n){console.error(`[Gemini Storage] Failed to write key "${e}":`,n);}}function ed(e){try{const t=e.startsWith(ct)?e:ct+e;GM_setValue(t,void 0);}catch(t){console.error(`[Gemini Storage] Failed to remove key "${e}":`,t);}}function td(){try{const e="gemini:",t=[];for(let o=0;o<localStorage.length;o++){const i=localStorage.key(o);i&&i.startsWith(e)&&t.push(i);}for(const o of t)try{const i=localStorage.getItem(o);if(i!==null){const a=JSON.parse(i),s=o.slice(e.length);Le(s,a),console.log(`[Gemini Storage] Migrated key: ${o}`);}}catch(i){console.warn(`[Gemini Storage] Failed to migrate key "${o}":`,i);}const n="gemini.sections",r=GM_getValue(n);r!=null&&(Le("sections",r),GM_setValue(n,void 0),console.log("[Gemini Storage] Migrated: gemini.sections → gemini:sections")),t.length>0&&console.log(`[Gemini Storage] Migration complete. ${t.length} keys migrated from localStorage to GM_* storage.`);}catch(e){console.error("[Gemini Storage] Migration failed:",e);}}const is="gemini.sections";function as(){const e=Se(is,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function nd(e){Le(is,e);}async function rd(e){return as()[e]}function od(e,t){const n=as();nd({...n,[e]:t});}function qi(e,t){return {...e,...t??{}}}async function id(e){const t=await rd(e.path);let n;e.migrate?n=e.migrate(t):n=t??{},n=Object.assign((d=>JSON.parse(JSON.stringify(d)))(e.defaults),n),e.sanitize&&(n=e.sanitize(n));function o(){od(e.path,n);}function i(){return n}function a(d){n=e.sanitize?e.sanitize(d):d,o();}function s(d){const u=Object.assign((p=>JSON.parse(JSON.stringify(p)))(n),{});typeof d=="function"?d(u):Object.assign(u,d),n=e.sanitize?e.sanitize(u):u,o();}function c(){o();}return {get:i,set:a,update:s,save:c}}async function Lr(e,t){const{path:n=e,...r}=t;return id({path:n,...r})}let ad=0;const Dn=new Map;function Be(e={},...t){const{id:n,className:r,variant:o="default",padding:i="md",interactive:a=false,expandable:s=false,defaultExpanded:c=true,onExpandChange:d,mediaTop:l,title:u,subtitle:p,badge:f,actions:g,footer:m,divider:h=false,tone:y="neutral",stateKey:S}=e,w=b("div",{className:"card",id:n,tabIndex:a?0:void 0});w.classList.add(`card--${o}`,`card--p-${i}`),a&&w.classList.add("card--interactive"),y!=="neutral"&&w.classList.add(`card--tone-${y}`),r&&w.classList.add(...r.split(" ").filter(Boolean)),s&&w.classList.add("card--expandable");const x=s?S??n??(typeof u=="string"?`title:${u}`:null):null;let I=!s||c;x&&Dn.has(x)&&(I=!!Dn.get(x));let v=null,C=null,T=null,k=null,P=null;const E=n?`${n}-collapse`:`card-collapse-${++ad}`,O=()=>{if(k!==null&&(cancelAnimationFrame(k),k=null),P){const j=P;P=null,j();}},ee=(j,N)=>{if(!T)return;O();const F=T;if(F.setAttribute("aria-hidden",String(!j)),!N){F.classList.remove("card-collapse--animating"),F.style.display=j?"":"none",F.style.height="",F.style.opacity="";return}if(F.classList.add("card-collapse--animating"),F.style.display="",j){F.style.height="auto";const z=F.scrollHeight;if(!z){F.classList.remove("card-collapse--animating"),F.style.display="",F.style.height="",F.style.opacity="";return}F.style.height="0px",F.style.opacity="0",F.offsetHeight,k=requestAnimationFrame(()=>{k=null,F.style.height=`${z}px`,F.style.opacity="1";});}else {const z=F.scrollHeight;if(!z){F.classList.remove("card-collapse--animating"),F.style.display="none",F.style.height="",F.style.opacity="";return}F.style.height=`${z}px`,F.style.opacity="1",F.offsetHeight,k=requestAnimationFrame(()=>{k=null,F.style.height="0px",F.style.opacity="0";});}const _=()=>{F.classList.remove("card-collapse--animating"),F.style.height="",j||(F.style.display="none"),F.style.opacity="";};let D=null;const R=z=>{z.target===F&&(D!==null&&(clearTimeout(D),D=null),F.removeEventListener("transitionend",R),F.removeEventListener("transitioncancel",R),P=null,_());};P=()=>{D!==null&&(clearTimeout(D),D=null),F.removeEventListener("transitionend",R),F.removeEventListener("transitioncancel",R),P=null,_();},F.addEventListener("transitionend",R),F.addEventListener("transitioncancel",R),D=window.setTimeout(()=>{P?.();},420);};function B(j){const N=document.createElementNS("http://www.w3.org/2000/svg","svg");return N.setAttribute("viewBox","0 0 24 24"),N.setAttribute("width","16"),N.setAttribute("height","16"),N.innerHTML=j==="up"?'<path d="M7 14l5-5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>':'<path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',N}function V(j,N=true,F=true){I=j,w.classList.toggle("card--collapsed",!I),w.classList.toggle("card--expanded",I),v&&(v.dataset.expanded=String(I),v.setAttribute("aria-expanded",String(I))),C&&(C.setAttribute("aria-expanded",String(I)),C.classList.toggle("card-toggle--collapsed",!I),C.setAttribute("aria-label",I?"Replier le contenu":"Deplier le contenu"),C.replaceChildren(B(I?"up":"down"))),s?ee(I,F):T&&(T.style.display="",T.style.height="",T.style.opacity="",T.setAttribute("aria-hidden","false")),N&&d&&d(I),x&&Dn.set(x,I);}if(l){const j=b("div",{className:"card-media"});j.append(l),w.appendChild(j);}const ae=!!(u||p||f||g&&g.length||s);if(ae){v=b("div",{className:"card-header"});const j=b("div",{className:"card-headline",style:"min-width:0;display:flex;flex-direction:column;gap:2px;"});if(u){const _=b("h3",{className:"card-title",style:"margin:0;font-size:15px;font-weight:700;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:8px;color:var(--fg);"},u);f&&_.append(typeof f=="string"?b("span",{className:"badge"},f):f),j.appendChild(_);}if(p){const _=b("div",{className:"card-subtitle",style:"opacity:.85;font-size:12px;color:color-mix(in oklab, var(--fg) 80%, #9ca3af)"},p);j.appendChild(_);}(j.childNodes.length||s)&&v.appendChild(j);const N=b("div",{className:"card-header-right",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"}),F=b("div",{className:"card-actions",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"});g?.forEach(_=>F.appendChild(_)),F.childNodes.length&&N.appendChild(F),s&&(C=b("button",{className:"card-toggle",type:"button",ariaExpanded:String(I),ariaControls:E,ariaLabel:I?"Replier le contenu":"Deplier le contenu"}),C.textContent=I?"▲":"▼",C.addEventListener("click",_=>{_.preventDefault(),_.stopPropagation(),V(!I);}),N.appendChild(C),v.classList.add("card-header--expandable"),v.addEventListener("click",_=>{const D=_.target;D?.closest(".card-actions")||D?.closest(".card-toggle")||V(!I);})),N.childNodes.length&&v.appendChild(N),w.appendChild(v);}T=b("div",{className:"card-collapse",id:E,ariaHidden:s?String(!I):"false"}),w.appendChild(T),h&&ae&&T.appendChild(b("div",{className:"card-divider"}));const $=b("div",{className:"card-body"});if($.append(...t),T.appendChild($),m){h&&T.appendChild(b("div",{className:"card-divider"}));const j=b("div",{className:"card-footer"});j.append(m),T.appendChild(j);}return C&&C.setAttribute("aria-controls",E),V(I,false,false),x&&Dn.set(x,I),w}let yr=false;const vr=new Set,Oe=e=>{const t=document.activeElement;for(const n of vr)if(t&&(t===n||n.contains(t))){e.stopImmediatePropagation(),e.stopPropagation();return}};function sd(){yr||(yr=true,window.addEventListener("keydown",Oe,true),window.addEventListener("keypress",Oe,true),window.addEventListener("keyup",Oe,true),document.addEventListener("keydown",Oe,true),document.addEventListener("keypress",Oe,true),document.addEventListener("keyup",Oe,true));}function ld(){yr&&(vr.size>0||(yr=false,window.removeEventListener("keydown",Oe,true),window.removeEventListener("keypress",Oe,true),window.removeEventListener("keyup",Oe,true),document.removeEventListener("keydown",Oe,true),document.removeEventListener("keypress",Oe,true),document.removeEventListener("keyup",Oe,true)));}function cd(e){const{id:t,value:n=null,options:r,placeholder:o="Select...",size:i="md",disabled:a=false,blockGameKeys:s=true,onChange:c,onOpenChange:d}=e,l=b("div",{className:"select",id:t}),u=b("button",{className:"select-trigger",type:"button"}),p=b("span",{className:"select-value"},o),f=b("span",{className:"select-caret"},"▾");u.append(p,f);const g=b("div",{className:"select-menu",role:"listbox",tabindex:"-1","aria-hidden":"true"});l.classList.add(`select--${i}`);let m=false,h=n,y=null,S=!!a;function w(_){return _==null?o:(e.options||r).find(R=>R.value===_)?.label??o}function x(_){p.textContent=w(_),g.querySelectorAll(".select-option").forEach(D=>{const R=D.dataset.value,z=_!=null&&R===_;D.classList.toggle("selected",z),D.setAttribute("aria-selected",String(z));});}function I(_){g.replaceChildren(),_.forEach(D=>{const R=b("button",{className:"select-option"+(D.disabled?" disabled":""),type:"button",role:"option","data-value":D.value,"aria-selected":String(D.value===h),tabindex:"-1"},D.label);D.value===h&&R.classList.add("selected"),D.disabled||R.addEventListener("pointerdown",z=>{z.preventDefault(),z.stopPropagation(),E(D.value,{notify:true}),k();},{capture:true}),g.appendChild(R);});}function v(){u.setAttribute("aria-expanded",String(m)),g.setAttribute("aria-hidden",String(!m));}function C(){const _=u.getBoundingClientRect();Object.assign(g.style,{minWidth:`${_.width}px`});}function T(){m||S||(m=true,l.classList.add("open"),v(),C(),document.addEventListener("mousedown",ae,true),document.addEventListener("scroll",$,true),window.addEventListener("resize",j),g.focus({preventScroll:true}),s&&(sd(),vr.add(l),y=()=>{vr.delete(l),ld();}),d?.(true));}function k(){m&&(m=false,l.classList.remove("open"),v(),document.removeEventListener("mousedown",ae,true),document.removeEventListener("scroll",$,true),window.removeEventListener("resize",j),u.focus({preventScroll:true}),y?.(),y=null,d?.(false));}function P(){m?k():T();}function E(_,D={}){const R=h;h=_,x(h),D.notify!==false&&R!==_&&c?.(_);}function O(){return h}function ee(_){const D=Array.from(g.querySelectorAll(".select-option:not(.disabled)"));if(!D.length)return;const R=D.findIndex(me=>me.classList.contains("active")),z=D[(R+(_===1?1:D.length-1))%D.length];D.forEach(me=>me.classList.remove("active")),z.classList.add("active"),z.focus({preventScroll:true}),z.scrollIntoView({block:"nearest"});}function B(_){(_.key===" "||_.key==="Enter"||_.key==="ArrowDown")&&(_.preventDefault(),T());}function V(_){if(_.key==="Escape"){_.preventDefault(),k();return}if(_.key==="Enter"||_.key===" "){const D=g.querySelector(".select-option.active")||g.querySelector(".select-option.selected");D&&!D.classList.contains("disabled")&&(_.preventDefault(),E(D.dataset.value,{notify:true}),k());return}if(_.key==="ArrowDown"){_.preventDefault(),ee(1);return}if(_.key==="ArrowUp"){_.preventDefault(),ee(-1);return}}function ae(_){l.contains(_.target)||k();}function $(){m&&C();}function j(){m&&C();}function N(_){S=!!_,u.disabled=S,l.classList.toggle("disabled",S),S&&k();}function F(_){e.options=_,I(_),_.some(D=>D.value===h)||(h=null,x(null));}return l.append(u,g),u.addEventListener("pointerdown",_=>{_.preventDefault(),_.stopPropagation(),P();},{capture:true}),u.addEventListener("keydown",B),g.addEventListener("keydown",V),I(r),n!=null?(h=n,x(h)):x(null),v(),N(S),{root:l,open:T,close:k,toggle:P,getValue:O,setValue:E,setOptions:F,setDisabled:N,destroy(){document.removeEventListener("mousedown",ae,true),document.removeEventListener("scroll",$,true),window.removeEventListener("resize",j),y?.(),y=null;}}}function ri(e={}){const{id:t,text:n="",htmlFor:r,tone:o="default",size:i="md",layout:a="inline",variant:s="text",required:c=false,disabled:d=false,tooltip:l,hint:u,icon:p,suffix:f,onClick:g}=e,m=b("div",{className:"lg-label-wrap",id:t}),h=b("label",{className:"lg-label",...r?{htmlFor:r}:{},...l?{title:l}:{}});if(p){const E=typeof p=="string"?b("span",{className:"lg-label-ico"},p):p;E.classList?.add?.("lg-label-ico"),h.appendChild(E);}const y=b("span",{className:"lg-label-text"},n);h.appendChild(y);const S=b("span",{className:"lg-label-req",ariaHidden:"true"}," *");c&&h.appendChild(S);let w=null;if(f!=null){w=typeof f=="string"?document.createTextNode(f):f;const E=b("span",{className:"lg-label-suffix"});E.appendChild(w),h.appendChild(E);}const x=u?b("div",{className:"lg-label-hint"},u):null;m.classList.add(`lg-label--${a}`),m.classList.add(`lg-label--${i}`),s==="title"&&m.classList.add("lg-label--title"),I(o),d&&m.classList.add("is-disabled"),m.appendChild(h),x&&m.appendChild(x),g&&h.addEventListener("click",g);function I(E){m.classList.remove("lg-label--default","lg-label--muted","lg-label--info","lg-label--success","lg-label--warning","lg-label--danger"),m.classList.add(`lg-label--${E}`);}function v(E){y.textContent=E;}function C(E){I(E);}function T(E){E&&!S.isConnected&&h.appendChild(S),!E&&S.isConnected&&S.remove(),E?h.setAttribute("aria-required","true"):h.removeAttribute("aria-required");}function k(E){m.classList.toggle("is-disabled",!!E);}function P(E){!E&&x&&x.isConnected?x.remove():E&&x?x.textContent=E:E&&!x&&m.appendChild(b("div",{className:"lg-label-hint"},E));}return {root:m,labelEl:h,hintEl:x,setText:v,setTone:C,setRequired:T,setDisabled:k,setHint:P}}function en(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function Bn(e,t){const n=document.createElement("span");n.className=`btn-ico btn-ico--${t}`;const r=en(e);return r&&n.appendChild(r),n}function dd(){const e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.marginRight="6px",t.style.display="none",t.style.flexShrink="0";const n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");const r=document.createElementNS(e,"animate");r.setAttribute("attributeName","stroke-dasharray"),r.setAttribute("values","1,150;90,150;90,150"),r.setAttribute("dur","1.5s"),r.setAttribute("repeatCount","indefinite");const o=document.createElementNS(e,"animateTransform");return o.setAttribute("attributeName","transform"),o.setAttribute("attributeType","XML"),o.setAttribute("type","rotate"),o.setAttribute("from","0 12 12"),o.setAttribute("to","360 12 12"),o.setAttribute("dur","1s"),o.setAttribute("repeatCount","indefinite"),n.appendChild(r),n.appendChild(o),t.appendChild(n),t}function wt(e={}){const{label:t="",id:n,variant:r="default",size:o="md",iconLeft:i,iconRight:a,loading:s=false,tooltip:c,type:d="button",onClick:l,disabled:u=false,fullWidth:p=false}=e,f=b("button",{className:"btn",id:n});f.type=d,r==="primary"&&f.classList.add("primary"),r==="danger"&&f.classList.add("danger"),o==="sm"&&f.classList.add("btn--sm"),c&&(f.title=c),p&&(f.style.width="100%");const g=dd(),m=i?Bn(i,"left"):null,h=a?Bn(a,"right"):null,y=document.createElement("span");y.className="btn-label";const S=en(t);S&&y.appendChild(S),!S&&(m||h)&&f.classList.add("btn--icon"),f.appendChild(g),m&&f.appendChild(m),f.appendChild(y),h&&f.appendChild(h);const w=u||s;f.disabled=w,f.setAttribute("aria-busy",String(!!s)),g.style.display=s?"inline-block":"none",l&&f.addEventListener("click",l);const x=f;return x.setLoading=I=>{f.setAttribute("aria-busy",String(!!I)),g.style.display=I?"inline-block":"none",f.disabled=I||u;},x.setDisabled=I=>{f.disabled=I||f.getAttribute("aria-busy")==="true";},x.setLabel=I=>{y.replaceChildren();const v=en(I);v&&y.appendChild(v),!v&&(m||h)?f.classList.add("btn--icon"):f.classList.remove("btn--icon");},x.setIconLeft=I=>{if(I==null){m?.remove();return}m?m.replaceChildren(en(I)):f.insertBefore(Bn(I,"left"),y);},x.setIconRight=I=>{if(I==null){h?.remove();return}h?h.replaceChildren(en(I)):f.appendChild(Bn(I,"right"));},x.setVariant=I=>{f.classList.remove("primary","danger"),I==="primary"&&f.classList.add("primary"),I==="danger"&&f.classList.add("danger");},x}let ss=null,oi=null;function ud(){return ss}function pd(e){ss=e,oi=null;}function ls(){return oi}function fd(e){oi=e;}function gd(){try{const e=window.visualViewport,t=Math.round((e?.width??window.innerWidth)||0),n=Math.round((e?.height??window.innerHeight)||0);if(t&&n)return t>=n?"landscape":"portrait"}catch{}return "unknown"}function cs(){const e=navigator.userAgent||"",t=navigator.platform||"",n=navigator.userAgentData;if(n&&typeof n.platform=="string"){const o=n.platform.toLowerCase();if(o.includes("windows"))return "windows";if(o.includes("mac"))return "mac";if(o.includes("android"))return "android";if(o.includes("chrome os")||o.includes("cros"))return "chromeos";if(o.includes("linux"))return "linux";if(o.includes("ios"))return "ios"}return /iPhone|iPad|iPod/i.test(e)||t==="MacIntel"&&(navigator.maxTouchPoints??0)>1?"ios":/Android/i.test(e)?"android":/CrOS/i.test(e)?"chromeos":/Win/i.test(e)?"windows":/Mac/i.test(e)?"mac":/Linux/i.test(e)?"linux":"unknown"}function ds(){const e=navigator.userAgent||"",t=navigator.userAgentData;if(t&&Array.isArray(t.brands)){const n=t.brands.map(a=>String(a.brand||a.brandName||a.brandVersion||a)),r=n.some(a=>/Edge/i.test(a)||/Microsoft Edge/i.test(a)),o=n.some(a=>/Opera/i.test(a)||/OPR/i.test(a)),i=n.some(a=>/Chrome|Chromium/i.test(a));if(r)return "Edge";if(o)return "Opera";if(i)return "Chrome";if(navigator.brave)return "Brave"}return /FxiOS/i.test(e)?"Firefox":/CriOS/i.test(e)?"Chrome":/EdgiOS/i.test(e)?"Edge":/OPiOS|OPR|Opera Mini|Opera/i.test(e)?"Opera":/Edg\//i.test(e)?"Edge":/OPR\//i.test(e)||/Opera/i.test(e)?"Opera":/Firefox/i.test(e)?"Firefox":/Safari/i.test(e)&&!/Chrome|Chromium|Edg|OPR/i.test(e)?"Safari":/Brave/i.test(e)||window.Brave||navigator.brave?"Brave":/Chrome|Chromium/i.test(e)?"Chrome":"Unknown"}function md(){const e=ud();if(e)return e;const t=navigator.userAgent||"",n=navigator.userAgentData;return n&&typeof n.mobile=="boolean"?n.mobile?"mobile":"desktop":/Android|iPhone|iPad|iPod|Mobile/i.test(t)?"mobile":"desktop"}function hd(e){if(!e)return null;try{return new URL(e).hostname}catch{return null}}function us(){try{return window.top!==window.self}catch{return  true}}function bd(){const e=us(),t=hd(document.referrer);return e&&!!t&&/(^|\.)discord(app)?\.com$/i.test(t)?"discord":"web"}function _r(){const e=ls();if(e)return e;const t=bd(),n=md(),r=cs(),o=ds(),i=us(),a=window.screen||{},s=window.visualViewport,c=Math.round(window.innerWidth||document.documentElement.clientWidth||0),d=Math.round(window.innerHeight||document.documentElement.clientHeight||0),l=Math.round(s?.width??c),u=Math.round(s?.height??d),p=Math.round(a.width||0),f=Math.round(a.height||0),g=Math.round(a.availWidth||p),m=Math.round(a.availHeight||f),h=Number.isFinite(window.devicePixelRatio)?window.devicePixelRatio:1,y={surface:t,host:location.hostname,origin:location.origin,isInIframe:i,platform:n,browser:o,os:r,viewportWidth:c,viewportHeight:d,visualViewportWidth:l,visualViewportHeight:u,screenWidth:p,screenHeight:f,availScreenWidth:g,availScreenHeight:m,dpr:h,orientation:gd()};return fd(y),y}function yd(){return _r().surface==="discord"}function vd(){return _r().platform==="mobile"}function xd(){_r();}function wd(){return ls()!==null}const Ke={init:xd,isReady:wd,detect:_r,isDiscord:yd,isMobile:vd,detectOS:cs,detectBrowser:ds,setPlatformOverride:pd};let xr=false;const tn=new Set;function kd(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}const Ne=e=>{const t=kd();if(t){for(const n of tn)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function Sd(){xr||(xr=true,window.addEventListener("keydown",Ne,true),window.addEventListener("keypress",Ne,true),window.addEventListener("keyup",Ne,true),document.addEventListener("keydown",Ne,true),document.addEventListener("keypress",Ne,true),document.addEventListener("keyup",Ne,true));}function Cd(){xr&&(xr=false,window.removeEventListener("keydown",Ne,true),window.removeEventListener("keypress",Ne,true),window.removeEventListener("keyup",Ne,true),document.removeEventListener("keydown",Ne,true),document.removeEventListener("keypress",Ne,true),document.removeEventListener("keyup",Ne,true));}function Ad(e){return tn.size===0&&Sd(),tn.add(e),()=>{tn.delete(e),tn.size===0&&Cd();}}function Id(e,t,n,r){let o;switch(e){case "digits":o="0-9";break;case "alpha":o="\\p{L}";break;case "alphanumeric":o="\\p{L}0-9";break;default:return null}return t&&(o+=" "),n&&(o+="\\-"),r&&(o+="_"),new RegExp(`[^${o}]`,"gu")}function Td(e,t){return t?e.replace(t,""):e}function Pd(e,t=0){if(!t)return e;let n;return((...r)=>{clearTimeout(n),n=setTimeout(()=>e(...r),t);})}function ps(e={}){const{id:t,placeholder:n="",value:r="",mode:o="any",allowSpaces:i=false,allowDashes:a=false,allowUnderscore:s=false,maxLength:c,blockGameKeys:d=true,debounceMs:l=0,onChange:u,onEnter:p,label:f}=e,g=b("div",{className:"lg-input-wrap"}),m=b("input",{className:"input",id:t,placeholder:n});if(typeof c=="number"&&c>0&&(m.maxLength=c),r&&(m.value=r),f){const E=b("div",{className:"lg-input-label"},f);g.appendChild(E);}g.appendChild(m);const h=Id(o,i,a,s),y=()=>{const E=m.selectionStart??m.value.length,O=m.value.length,ee=Td(m.value,h);if(ee!==m.value){m.value=ee;const B=O-ee.length,V=Math.max(0,E-B);m.setSelectionRange(V,V);}},S=Pd(()=>u?.(m.value),l);m.addEventListener("input",()=>{y(),S();}),m.addEventListener("paste",()=>queueMicrotask(()=>{y(),S();})),m.addEventListener("keydown",E=>{E.key==="Enter"&&p?.(m.value);});const w=d?Ad(m):()=>{};function x(){return m.value}function I(E){m.value=E??"",y(),S();}function v(){m.focus();}function C(){m.blur();}function T(E){m.disabled=!!E;}function k(){return document.activeElement===m}function P(){w();}return {root:g,input:m,getValue:x,setValue:I,focus:v,blur:C,setDisabled:T,isFocused:k,destroy:P}}function ye(e,t,n){return Math.min(n,Math.max(t,e))}function dn({h:e,s:t,v:n,a:r}){const o=(e%360+360)%360/60,i=n*t,a=i*(1-Math.abs(o%2-1));let s=0,c=0,d=0;switch(Math.floor(o)){case 0:s=i,c=a;break;case 1:s=a,c=i;break;case 2:c=i,d=a;break;case 3:c=a,d=i;break;case 4:s=a,d=i;break;default:s=i,d=a;break}const u=n-i,p=Math.round((s+u)*255),f=Math.round((c+u)*255),g=Math.round((d+u)*255);return {r:ye(p,0,255),g:ye(f,0,255),b:ye(g,0,255),a:ye(r,0,1)}}function fs({r:e,g:t,b:n,a:r}){const o=ye(e,0,255)/255,i=ye(t,0,255)/255,a=ye(n,0,255)/255,s=Math.max(o,i,a),c=Math.min(o,i,a),d=s-c;let l=0;d!==0&&(s===o?l=60*((i-a)/d%6):s===i?l=60*((a-o)/d+2):l=60*((o-i)/d+4)),l<0&&(l+=360);const u=s===0?0:d/s;return {h:l,s:u,v:s,a:ye(r,0,1)}}function ii({r:e,g:t,b:n}){const r=o=>ye(Math.round(o),0,255).toString(16).padStart(2,"0");return `#${r(e)}${r(t)}${r(n)}`.toUpperCase()}function Ed({r:e,g:t,b:n,a:r}){const o=ye(Math.round(r*255),0,255);return `${ii({r:e,g:t,b:n})}${o.toString(16).padStart(2,"0")}`.toUpperCase()}function nn({r:e,g:t,b:n,a:r}){const o=Math.round(r*1e3)/1e3;return `rgba(${e}, ${t}, ${n}, ${o})`}function $t(e){let t=e.trim();if(!t||(t.startsWith("#")&&(t=t.slice(1)),![3,4,6,8].includes(t.length))||!/^[0-9a-fA-F]+$/.test(t))return null;(t.length===3||t.length===4)&&(t=t.split("").map(a=>a+a).join(""));let n=255;t.length===8&&(n=parseInt(t.slice(6,8),16),t=t.slice(0,6));const r=parseInt(t.slice(0,2),16),o=parseInt(t.slice(2,4),16),i=parseInt(t.slice(4,6),16);return {r,g:o,b:i,a:n/255}}function So(e){if(!e)return null;const t=e.trim();if(t.startsWith("#"))return $t(t);const n=t.match(/^rgba?\(([^)]+)\)$/i);if(n){const r=n[1].split(",").map(c=>c.trim());if(r.length<3)return null;const o=Number(r[0]),i=Number(r[1]),a=Number(r[2]),s=r[3]!=null?Number(r[3]):1;return [o,i,a,s].some(c=>Number.isNaN(c))?null:{r:o,g:i,b:a,a:s}}return null}function Md(e,t){const n=So(e)??$t(e??"")??{r:244,g:67,b:54,a:1};return typeof t=="number"&&(n.a=ye(t,0,1)),fs(n)}function Ld(e){return `#${e.trim().replace(/[^0-9a-fA-F#]/g,"").replace(/#/g,"")}`.slice(0,9).toUpperCase()}function _d(e){let t=e.trim();return t&&(/^rgba?\s*\(/i.test(t)?t=t.replace(/^rgba?/i,"rgba"):(t=t.replace(/^\(?(.*)\)?$/,"$1"),t=`rgba(${t})`),t=t.replace(/\s*\(\s*/,"("),t=t.replace(/\s*\)\s*$/,")"),t=t.replace(/\s*,\s*/g,", "),t)}function ft(e){const t=dn(e),n=dn({...e,a:1});return {hsva:{...e},hex:ii(n),hexa:Ed(t),rgba:nn(t),alpha:e.a}}function Fd(e={}){const{id:t,label:n="Color",value:r,alpha:o,defaultExpanded:i=false,detectMobile:a,onInput:s,onChange:c}=e,l=a?a():Ke.detect().platform==="mobile";let u=Md(r,o);const p=Be({id:t,className:"color-picker",title:n,padding:l?"md":"lg",variant:"soft",expandable:!l,defaultExpanded:!l&&i});p.classList.add(l?"color-picker--mobile":"color-picker--desktop");const f=p.querySelector(".card-header");f&&f.classList.add("color-picker__header");const g=f?.querySelector(".card-title"),m=b("button",{className:"color-picker__preview",type:"button",title:`Preview ${n}`,"aria-label":`Change ${n}`});g?g.prepend(m):f?f.prepend(m):p.prepend(m);const h=p.querySelector(".card-toggle");!l&&h&&m.addEventListener("click",()=>{p.classList.contains("card--collapsed")&&h.click();});const y=p.querySelector(".card-collapse");let S=null,w=null,x=null,I=null,v=null,C=null,T=null,k=null,P=null,E="hex";function O($){const j=ft(u);$==="input"?s?.(j):c?.(j);}function ee(){const $=ft(u);if(m.style.setProperty("--cp-preview-color",$.rgba),m.setAttribute("aria-label",`${n}: ${$.hexa}`),!l&&S&&w&&x&&I&&v&&C&&T){const j=dn({...u,s:1,v:1,a:1}),N=nn(j);S.style.setProperty("--cp-palette-hue",N),w.style.left=`${u.s*100}%`,w.style.top=`${(1-u.v)*100}%`,x.style.setProperty("--cp-alpha-gradient",`linear-gradient(180deg, ${nn({...j,a:1})} 0%, ${nn({...j,a:0})} 100%)`),I.style.top=`${(1-u.a)*100}%`,v.style.setProperty("--cp-hue-color",nn(dn({...u,v:1,s:1,a:1}))),C.style.left=`${u.h/360*100}%`;const F=u.a===1?$.hex:$.hexa,_=$.rgba,D=E==="hex"?F:_;T!==document.activeElement&&(T.value=D),T.setAttribute("aria-label",`${E.toUpperCase()} code for ${n}`),T.placeholder=E==="hex"?"#RRGGBB or #RRGGBBAA":"rgba(0, 0, 0, 1)",E==="hex"?T.maxLength=9:T.removeAttribute("maxLength"),T.dataset.mode=E,k&&(k.textContent=E.toUpperCase(),k.setAttribute("aria-label",E==="hex"?"Passer en saisie RGBA":"Revenir en saisie HEX"),k.setAttribute("aria-pressed",E==="rgba"?"true":"false"),k.classList.toggle("is-alt",E==="rgba"));}P&&P!==document.activeElement&&(P.value=$.hex);}function B($,j=null){u={h:($.h%360+360)%360,s:ye($.s,0,1),v:ye($.v,0,1),a:ye($.a,0,1)},ee(),j&&O(j);}function V($,j=null){B(fs($),j);}function ae($,j,N){$.addEventListener("pointerdown",F=>{F.preventDefault();const _=F.pointerId,D=z=>{z.pointerId===_&&j(z);},R=z=>{z.pointerId===_&&(document.removeEventListener("pointermove",D),document.removeEventListener("pointerup",R),document.removeEventListener("pointercancel",R),N?.(z));};j(F),document.addEventListener("pointermove",D),document.addEventListener("pointerup",R),document.addEventListener("pointercancel",R);});}if(!l&&y){const $=y.querySelector(".card-body");if($){$.classList.add("color-picker__body"),w=b("div",{className:"color-picker__palette-cursor"}),S=b("div",{className:"color-picker__palette"},w),I=b("div",{className:"color-picker__alpha-thumb"}),x=b("div",{className:"color-picker__alpha"},I),C=b("div",{className:"color-picker__hue-thumb"}),v=b("div",{className:"color-picker__hue"},C);const j=b("div",{className:"color-picker__main"},S,x),N=b("div",{className:"color-picker__hue-row"},v),F=ps({blockGameKeys:true});T=F.input,T.classList.add("color-picker__hex-input"),T.value="",T.maxLength=9,T.spellcheck=false,T.inputMode="text",T.setAttribute("aria-label",`Hex code for ${n}`),k=b("button",{type:"button",className:"color-picker__mode-btn",textContent:"HEX","aria-pressed":"false","aria-label":"Passer en saisie RGBA"}),F.root.classList.add("color-picker__hex-wrap");const _=b("div",{className:"color-picker__hex-row"},k,F.root);$.replaceChildren(j,N,_),ae(S,R=>{if(!S||!w)return;const z=S.getBoundingClientRect(),me=ye((R.clientX-z.left)/z.width,0,1),Q=ye((R.clientY-z.top)/z.height,0,1);B({...u,s:me,v:1-Q},"input");},()=>O("change")),ae(x,R=>{if(!x)return;const z=x.getBoundingClientRect(),me=ye((R.clientY-z.top)/z.height,0,1);B({...u,a:1-me},"input");},()=>O("change")),ae(v,R=>{if(!v)return;const z=v.getBoundingClientRect(),me=ye((R.clientX-z.left)/z.width,0,1);B({...u,h:me*360},"input");},()=>O("change")),k.addEventListener("click",()=>{if(E=E==="hex"?"rgba":"hex",T){const R=ft(u);T.value=E==="hex"?u.a===1?R.hex:R.hexa:R.rgba;}ee(),T?.focus(),T?.select();}),T.addEventListener("input",()=>{if(E==="hex"){const R=Ld(T.value);if(R!==T.value){const z=T.selectionStart??R.length;T.value=R,T.setSelectionRange(z,z);}}});const D=()=>{const R=T.value;if(E==="hex"){const z=$t(R);if(!z){T.value=u.a===1?ft(u).hex:ft(u).hexa;return}const me=R.startsWith("#")?R.slice(1):R,Q=me.length===4||me.length===8;z.a=Q?z.a:u.a,V(z,"change");}else {const z=_d(R),me=So(z);if(!me){T.value=ft(u).rgba;return}V(me,"change");}};T.addEventListener("change",D),T.addEventListener("blur",D),T.addEventListener("keydown",R=>{R.key==="Enter"&&(D(),T.blur());});}}return l&&(y&&y.remove(),P=b("input",{className:"color-picker__native",type:"color",value:ii(dn({...u,a:1}))}),m.addEventListener("click",()=>P.click()),P.addEventListener("input",()=>{const $=$t(P.value);$&&($.a=u.a,V($,"input"),O("change"));}),p.appendChild(P)),ee(),{root:p,isMobile:l,getValue:()=>ft(u),setValue:($,j)=>{const N=So($)??$t($)??$t("#FFFFFF");N&&(typeof j=="number"&&(N.a=j),V(N,null));}}}const Rd=window;function Od(){if(typeof unsafeWindow<"u"&&unsafeWindow)return unsafeWindow;const e=window.wrappedJSObject;return e&&e!==window?e:Rd}const Nd=Od(),L=Nd;function $d(e){try{return !!e.isSecureContext}catch{return  false}}function ai(e){const t=e?.getRootNode?.();return t&&(t instanceof Document||t.host)?t:document}function gs(){const e=navigator.platform||"",t=navigator.userAgent||"";return /Mac|iPhone|iPad|iPod/i.test(e)||/Mac OS|iOS/i.test(t)}async function Dd(){try{const e=await navigator.permissions?.query?.({name:"clipboard-write"});return e?e.state==="granted"||e.state==="prompt":!0}catch{return  true}}function Bd(e,t){const n=document.createElement("textarea");return n.value=e,n.setAttribute("readonly","true"),n.style.position="fixed",n.style.opacity="0",n.style.pointerEvents="none",n.style.top="0",t.appendChild?t.appendChild(n):document.body.appendChild(n),n}function jd(e){try{const t=window.getSelection?.();if(!t)return !1;const n=document.createRange();return n.selectNodeContents(e),t.removeAllRanges(),t.addRange(n),!0}catch{return  false}}async function zd(e){if(!("clipboard"in navigator))return {ok:false,method:"clipboard-write"};if(!$d(L))return {ok:false,method:"clipboard-write"};if(!await Dd())return {ok:false,method:"clipboard-write"};try{return await navigator.clipboard.writeText(e),{ok:!0,method:"clipboard-write"}}catch{return {ok:false,method:"clipboard-write"}}}function Gd(e,t){try{const n=t||ai(),r=Bd(e,n);r.focus(),r.select(),r.setSelectionRange(0,r.value.length);let o=!1;try{o=document.execCommand("copy");}catch{o=!1;}return r.remove(),{ok:o,method:"execCommand"}}catch{return {ok:false,method:"execCommand"}}}function Hd(e,t){if(!t)return {ok:false,method:"selection"};const n=t.textContent??"";let r=false;if(n!==e)try{t.textContent=e,r=!0;}catch{}const o=jd(t);r&&setTimeout(()=>{try{t.textContent=n;}catch{}},80);const i=gs()?"⌘C pour copier":"Ctrl+C pour copier";return {ok:o,method:"selection",hint:i}}async function Wd(e,t={}){const n=(e??"").toString();if(!n.length)return {ok:false,method:"noop"};const r=await zd(n);if(r.ok)return r;const o=t.injectionRoot||ai(t.valueNode||void 0),i=Gd(n,o);if(i.ok)return i;const a=Hd(n,t.valueNode||null);if(a.ok)return a;if(!t.disablePromptFallback)try{return window.prompt(Ke.isDiscord()?"Copie manuelle (Discord bloque clipboard):":"Copie manuelle:",n),{ok:!0,method:"prompt"}}catch{}return {ok:false,method:"noop"}}function Ud(e,t,n={}){const r=o=>{if(n.showTip){n.showTip(o);return}try{e.setAttribute("aria-label",o);const i=document.createElement("div");i.textContent=o,i.style.position="absolute",i.style.top="-28px",i.style.right="0",i.style.padding="4px 8px",i.style.borderRadius="8px",i.style.fontSize="12px",i.style.background="color-mix(in oklab, var(--bg) 85%, transparent)",i.style.border="1px solid var(--border)",i.style.color="var(--fg)",i.style.pointerEvents="none",i.style.opacity="0",i.style.transition="opacity .12s";const a=ai(e);a.appendChild?a.appendChild(i):document.body.appendChild(i);const s=e.getBoundingClientRect();i.style.left=`${s.right-8}px`,i.style.top=`${s.top-28}px`,requestAnimationFrame(()=>i.style.opacity="1"),setTimeout(()=>{i.style.opacity="0",setTimeout(()=>i.remove(),150);},1200);}catch{}};e.addEventListener("click",async o=>{o.stopPropagation();const i=(t()??"").toString(),a=await Wd(i,{valueNode:n.valueNode??null,injectionRoot:n.injectionRoot??null,disablePromptFallback:n.disablePromptFallback??false});n.onResult?.(a),a.ok?a.method==="clipboard-write"||a.method==="execCommand"||a.method==="prompt"?r("Copié"):a.method==="selection"&&r(a.hint||(gs()?"⌘C pour copier":"Ctrl+C pour copier")):r("Impossible de copier");});}const un={light:{"--bg":"rgba(255,255,255,0.7)","--fg":"#0f172a","--muted":"rgba(15,23,42,0.06)","--soft":"rgba(15,23,42,0.04)","--accent":"#2563eb","--border":"rgba(15,23,42,0.12)","--shadow":"rgba(2,6,23,.2)","--paper":"#FDFBF7","--tab-bg":"#ffffff","--tab-fg":"#0f172a","--pill-from":"#4f46e5","--pill-to":"#06b6d4","--low":"#dc2626","--medium":"#f59e0b","--high":"#16a34a","--complete":"#15803d","--info":"#2563eb","--accent-1":"#16a34a","--accent-2":"#7c3aed","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--switch-thumb":"#ffffff","--journal-ink":"#333333"},dark:{"--bg":"rgba(10,12,18,0.6)","--fg":"#e5e7eb","--muted":"rgba(229,231,235,0.08)","--soft":"rgba(229,231,235,0.05)","--accent":"#60a5fa","--border":"rgba(148,163,184,0.2)","--shadow":"rgba(0,0,0,.45)","--paper":"#1a1d24","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#e5e7eb","--pill-from":"#6366f1","--pill-to":"#06b6d4","--low":"#ef4444","--medium":"#f59e0b","--high":"#22c55e","--complete":"#16a34a","--info":"#3b82f6","--accent-1":"#22c55e","--accent-2":"#a855f7","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},sepia:{"--bg":"rgba(247,242,231,0.72)","--fg":"#3b2f2f","--muted":"rgba(59,47,47,0.06)","--soft":"rgba(59,47,47,0.04)","--accent":"#b07d62","--border":"rgba(59,47,47,0.14)","--shadow":"rgba(0,0,0,.18)","--paper":"#F5E6D3","--tab-bg":"#fff","--tab-fg":"#3b2f2f","--pill-from":"#b07d62","--pill-to":"#d4a373","--low":"#c2410c","--medium":"#d97706","--high":"#15803d","--complete":"#166534","--info":"#1d4ed8","--accent-1":"#15803d","--accent-2":"#6b21a8","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--switch-thumb":"#ffffff","--journal-ink":"#3b2f2f"},forest:{"--bg":"rgba(14,24,18,0.62)","--fg":"#e7f5e9","--muted":"rgba(231,245,233,0.08)","--soft":"rgba(231,245,233,0.05)","--accent":"#34d399","--border":"rgba(231,245,233,0.16)","--shadow":"rgba(0,0,0,.5)","--paper":"#1e2820","--tab-bg":"rgba(255,255,255,0.06)","--tab-fg":"#e7f5e9","--pill-from":"#10b981","--pill-to":"#84cc16","--low":"#dc2626","--medium":"#eab308","--high":"#22c55e","--complete":"#16a34a","--info":"#06b6d4","--accent-1":"#22c55e","--accent-2":"#8b5cf6","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},violet:{"--bg":"rgba(23, 16, 42, 0.68)","--fg":"#f5f3ff","--muted":"rgba(245,243,255,0.08)","--soft":"rgba(245,243,255,0.05)","--accent":"#a855f7","--border":"rgba(216,180,254,0.22)","--shadow":"rgba(12,3,30,.55)","--paper":"#1a1424","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#ede9fe","--pill-from":"#a855f7","--pill-to":"#f472b6","--low":"#f43f5e","--medium":"#fbbf24","--high":"#4ade80","--complete":"#22c55e","--info":"#60a5fa","--accent-1":"#4ade80","--accent-2":"#c084fc","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},ocean:{"--bg":"rgba(10, 34, 46, 0.66)","--fg":"#e0f7ff","--muted":"rgba(224,247,255,0.07)","--soft":"rgba(224,247,255,0.05)","--accent":"#38bdf8","--border":"rgba(125, 211, 252, 0.22)","--shadow":"rgba(0, 16, 32, .52)","--paper":"#0f2027","--tab-bg":"rgba(56,189,248,0.14)","--tab-fg":"#e0f7ff","--pill-from":"#0ea5e9","--pill-to":"#14b8a6","--low":"#f43f5e","--medium":"#fbbf24","--high":"#34d399","--complete":"#10b981","--info":"#38bdf8","--accent-1":"#22c55e","--accent-2":"#a78bfa","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},ember:{"--bg":"rgba(34,18,10,0.64)","--fg":"#fff7ed","--muted":"rgba(255,247,237,0.08)","--soft":"rgba(255,247,237,0.05)","--accent":"#f97316","--border":"rgba(255, 159, 92, 0.24)","--shadow":"rgba(16,6,2,.52)","--paper":"#1a1210","--tab-bg":"rgba(255,247,237,0.09)","--tab-fg":"#fff7ed","--pill-from":"#fb923c","--pill-to":"#facc15","--low":"#dc2626","--medium":"#f59e0b","--high":"#22c55e","--complete":"#16a34a","--info":"#38bdf8","--accent-1":"#22c55e","--accent-2":"#c084fc","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},magicGarden:{"--bg":"#201D1D","--fg":"#F5F5F5","--muted":"rgba(255,255,255,0.6)","--soft":"rgba(0,0,0,0.3)","--accent":"#FFF27D","--border":"rgba(255,255,255,0.1)","--border-accent":"#4A3B2E","--shadow":"rgba(0,0,0,0.5)","--paper":"#FDFBF7","--card-shadow":"0 4px 10px rgba(0, 0, 0, 0.5)","--tab-bg":"#10725A","--tab-fg":"#F5F5F5","--section-title":"#10725A","--group-title":"#5EB292","--item-label":"#F5F5F5","--item-desc":"rgba(255,255,255,0.6)","--item-value":"#FFF27D","--card-bg":"rgba(0,0,0,0.3)","--card-radius":"12px","--card-border":"#4A3B2E","--pill-from":"#FFF27D","--pill-to":"#5EB292","--scrollbar-thumb":"rgba(255,255,255,0.2)","--scrollbar-thumb-hover":"rgba(255,255,255,0.3)","--low":"#F98B4B","--medium":"#F3D32B","--high":"#5EAC46","--complete":"#0B893F","--info":"#38bdf8","--accent-1":"#4caf50","--accent-2":"#9c27b0","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--switch-thumb":"#ffffff","--journal-ink":"#000000"}};function Vd(e){const{host:t,themes:n,initialTheme:r,onThemeChange:o}=e;let i=r,a=null,s=false;function c(l){const u=n[l]||n[i]||{};t.setAttribute("data-theme",l),s&&t.classList.add("theme-anim");for(const[p,f]of Object.entries(u))t.style.setProperty(p,f);s?(a!==null&&clearTimeout(a),a=L.setTimeout(()=>{t.classList.remove("theme-anim"),a=null;},320)):s=true,i=l,o?.(l);}function d(){return i}return c(r),{applyTheme:c,getCurrentTheme:d}}const Co={ui:{expandedCards:{style:false,system:false}}};async function Kd(){const e=await Lr("tab-settings",{version:1,defaults:Co,sanitize:o=>({ui:{expandedCards:qi(Co.ui.expandedCards,o.ui?.expandedCards)}})});function t(o){const i=e.get();e.update({ui:{...i.ui,...o,expandedCards:qi(i.ui.expandedCards,o.expandedCards)}});}function n(o,i){const a=e.get();e.update({ui:{...a.ui,expandedCards:{...a.ui.expandedCards,[o]:!!i}}});}function r(o){const i=e.get();n(o,!i.ui.expandedCards[o]);}return {get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:r}}function ms(e){return e.replace(/[_-]+/g," ").replace(/^\w/,t=>t.toUpperCase())}function Yd(){return Object.keys(un).map(e=>({value:e,label:ms(e)}))}const qd=["--bg","--fg","--accent","--muted","--soft","--border","--shadow","--paper","--tab-bg","--tab-fg","--pill-from","--pill-to","--low","--medium","--high","--complete","--info","--accent-1","--accent-2","--accent-3"];function Xd(e){return ms(e.replace(/^--/,""))}function Jd(e){return e.alpha<1?e.rgba:e.hex}class Qd extends Ut{constructor(t){super({id:"tab-settings",label:"Settings"}),this.deps=t;}async build(t){const n=this.createGrid("12px");n.id="settings",t.appendChild(n);let r;try{r=await Kd();}catch{r={get:()=>Co,set:()=>{},save:()=>{},setUI:()=>{},setCardExpanded:()=>{},toggleCard:()=>{}};}const o=r.get(),i=Object.keys(un),a=this.deps.getCurrentTheme?.()??this.deps.initialTheme,s=i.includes(a)?a:i[0]??"dark";let c=s;const d=ri({text:"Theme",tone:"muted",size:"lg"}),l=cd({options:Yd(),value:s,onChange:g=>{c=g,this.deps.applyTheme(g),this.renderThemePickers(g,u,c);}}),u=b("div",{className:"settings-theme-grid"}),p=Be({title:"Style",padding:"lg",expandable:true,defaultExpanded:!!o.ui.expandedCards.style,onExpandChange:g=>r.setCardExpanded("style",g)},b("div",{className:"kv settings-theme-row"},d.root,l.root),u);this.renderThemePickers(s,u,c);const f=this.createEnvCard({defaultExpanded:!!o.ui.expandedCards.system,onExpandChange:g=>r.setCardExpanded("system",g)});n.appendChild(p),n.appendChild(f);}renderThemePickers(t,n,r){const o=un[t];if(n.replaceChildren(),!!o)for(const i of qd){const a=o[i];if(a==null)continue;const s=Fd({label:Xd(i),value:a,defaultExpanded:false,onInput:c=>this.updateThemeVar(t,i,c,r),onChange:c=>this.updateThemeVar(t,i,c,r)});n.appendChild(s.root);}}updateThemeVar(t,n,r,o){const i=un[t];i&&(i[n]=Jd(r),o===t&&this.deps.applyTheme(t));}createEnvCard(t){const n=t?.defaultExpanded??false,r=t?.onExpandChange,o=(h,y)=>{const S=b("div",{className:"kv kv--inline-mobile"}),w=b("label",{},h),x=b("div",{className:"ro"});return typeof y=="string"?x.textContent=y:x.append(y),S.append(w,x),S},i=b("code",{},"—"),a=b("span",{},"—"),s=b("span",{},"—"),c=b("span",{},"—"),d=b("span",{},"—"),l=b("span",{},"—"),u=()=>{const h=Ke.detect();s.textContent=h.surface,c.textContent=h.platform,d.textContent=h.browser??"Unknown",l.textContent=h.os??"Unknown",i.textContent=h.host,a.textContent=h.isInIframe?"Yes":"No";},p=wt({label:"Copy JSON",variant:"primary",size:"sm"});Ud(p,()=>{const h=Ke.detect();return JSON.stringify(h,null,2)});const f=b("div",{style:"width:100%;display:flex;justify-content:center;"},p),g=Be({title:"System",variant:"soft",padding:"lg",footer:f,expandable:true,defaultExpanded:n,onExpandChange:r},o("Surface",s),o("Platform",c),o("Browser",d),o("OS",l),o("Host",i),o("Iframe",a)),m=()=>{document.hidden||u();};return document.addEventListener("visibilitychange",m),u(),this.addCleanup(()=>document.removeEventListener("visibilitychange",m)),g}}function si(e={}){const{id:t,checked:n=false,disabled:r=false,size:o="md",label:i,labelSide:a="right",onChange:s}=e,c=b("div",{className:"lg-switch-wrap"}),d=b("button",{className:`lg-switch lg-switch--${o}`,id:t,type:"button",role:"switch","aria-checked":String(!!n),"aria-disabled":String(!!r),title:i??"Basculer"}),l=b("span",{className:"lg-switch-track"}),u=b("span",{className:"lg-switch-thumb"});d.append(l,u);let p=null;i&&a!=="none"&&(p=b("span",{className:"lg-switch-label"},i)),p&&a==="left"?c.append(p,d):p&&a==="right"?c.append(d,p):c.append(d);let f=!!n,g=!!r;function m(){d.classList.toggle("on",f),d.setAttribute("aria-checked",String(f)),d.disabled=g,d.setAttribute("aria-disabled",String(g));}function h(k=false){g||(f=!f,m(),k||s?.(f));}function y(k){k.preventDefault(),h();}function S(k){g||((k.key===" "||k.key==="Enter")&&(k.preventDefault(),h()),k.key==="ArrowLeft"&&(k.preventDefault(),x(false)),k.key==="ArrowRight"&&(k.preventDefault(),x(true)));}d.addEventListener("click",y),d.addEventListener("keydown",S);function w(){return f}function x(k,P=false){f=!!k,m(),P||s?.(f);}function I(k){g=!!k,m();}function v(k){if(!k){p&&(p.remove(),p=null);return}p?p.textContent=k:(p=b("span",{className:"lg-switch-label"},k),c.append(p));}function C(){d.focus();}function T(){d.removeEventListener("click",y),d.removeEventListener("keydown",S);}return m(),{root:c,button:d,isChecked:w,setChecked:x,setDisabled:I,setLabel:v,focus:C,destroy:T}}function hs(e){const{id:t,columns:n,data:r,pageSize:o=0,stickyHeader:i=true,zebra:a=true,animations:s=true,respectReducedMotion:c=true,compact:d=false,maxHeight:l,selectable:u=false,selectionType:p="switch",selectOnRowClick:f=false,initialSelection:g=[],hideHeaderCheckbox:m=false,getRowId:h=(G,K)=>String(K),onSortChange:y,onSelectionChange:S,onRowClick:w}=e;let x=n.slice(),I=r.slice(),v=r.slice(),C=null,T=null,k=1;const P=typeof window<"u"&&typeof window.matchMedia=="function"?window.matchMedia("(prefers-reduced-motion: reduce)").matches:false,E=!!s&&!(c&&P),O=b("div",{className:"lg-table-wrap",id:t});if(l!=null){const G=typeof l=="number"?`${l}px`:l;O.style.setProperty("--tbl-max-h",G);}const ee=b("div",{className:"lg-table"}),B=b("div",{className:"lg-thead"}),V=b("div",{className:"lg-tbody"}),ae=b("div",{className:"lg-tfoot"});i&&O.classList.add("sticky"),a&&O.classList.add("zebra"),d&&O.classList.add("compact"),u&&O.classList.add("selectable");const $=p==="switch"?"52px":"36px";O.style.setProperty("--check-w",$);function j(G){return G==="center"?"center":G==="right"?"flex-end":"flex-start"}function N(){const G=x.map(ne=>{const se=(ne.width||"1fr").trim();return /\bfr$/.test(se)?`minmax(0, ${se})`:se}),K=(u?[$,...G]:G).join(" ");O.style.setProperty("--lg-cols",K);}N();function F(){return o?Math.max(1,Math.ceil(I.length/o)):1}function _(){if(!o)return I;const G=(k-1)*o;return I.slice(G,G+o)}function D(){if(!C||!T)return;const G=x.find(se=>String(se.key)===C),K=T==="asc"?1:-1,ne=G?.sortFn?(se,pe)=>K*G.sortFn(se,pe):(se,pe)=>{const Z=se[C],te=pe[C];return Z==null&&te==null?0:Z==null?-1*K:te==null?1*K:typeof Z=="number"&&typeof te=="number"?K*(Z-te):K*String(Z).localeCompare(String(te),void 0,{numeric:true,sensitivity:"base"})};I.sort(ne);}const R=new Set(g);function z(){return Array.from(R)}const me=new Map;function Q(G){R.clear(),G.forEach(K=>R.add(K)),Ae(),me.forEach((K,ne)=>{K.setChecked(R.has(ne),true);}),Xt(),S?.(z());}function X(){R.clear(),Ae(),me.forEach(G=>G.setChecked(false,true)),Xt(),S?.(z());}let ge=null;function Ae(){if(!ge)return;const G=_();if(!G.length){ge.indeterminate=false,ge.checked=false;return}const K=G.map((se,pe)=>h(se,(k-1)*(o||0)+pe)),ne=K.reduce((se,pe)=>se+(R.has(pe)?1:0),0);ge.checked=ne===K.length,ge.indeterminate=ne>0&&ne<K.length;}function Fn(){const G=V.offsetWidth-V.clientWidth;B.style.paddingRight=G>0?`${G}px`:"0px";}function Vr(){requestAnimationFrame(Fn);}const Kr=new ResizeObserver(()=>Fn()),Gi=()=>Fn();function Oc(){B.replaceChildren();const G=b("div",{className:"lg-tr lg-tr-head"});if(u){const K=b("div",{className:"lg-th lg-th-check"});m||(ge=b("input",{type:"checkbox"}),ge.addEventListener("change",()=>{const ne=_(),se=ge.checked;ne.forEach((pe,Z)=>{const te=h(pe,(k-1)*(o||0)+Z);se?R.add(te):R.delete(te);}),S?.(z()),Xt();}),K.appendChild(ge)),G.appendChild(K);}x.forEach(K=>{const ne=b("button",{className:"lg-th",type:"button",title:K.title||K.header});ne.textContent=K.header,K.align&&ne.style.setProperty("--col-justify",j(K.align)),K.sortable&&ne.classList.add("sortable"),C===String(K.key)&&T?ne.setAttribute("data-sort",T):ne.removeAttribute("data-sort"),K.sortable&&ne.addEventListener("click",()=>{const se=String(K.key);C!==se?(C=se,T="asc"):(T=T==="asc"?"desc":T==="desc"?null:"asc",T||(C=null,I=v.slice())),y?.(C,T),C&&T&&D(),On();}),G.appendChild(ne);}),B.appendChild(G);try{Kr.disconnect();}catch{}Kr.observe(V),Vr();}function Yr(G){return Array.from(G.querySelectorAll(":scope > .lg-td, :scope > .lg-td-check"))}function Hi(G){return G.querySelector(".lg-td, .lg-td-check")}function Wi(G){const K=Hi(G);return K?K.getBoundingClientRect():null}function Xt(){const G=_(),K=new Map;Array.from(V.children).forEach(Z=>{const te=Z,Ie=te.getAttribute("data-id");if(!Ie)return;const _e=Wi(te);_e&&K.set(Ie,_e);});const ne=new Map;Array.from(V.children).forEach(Z=>{const te=Z,Ie=te.getAttribute("data-id");Ie&&ne.set(Ie,te);});const se=[];for(let Z=0;Z<G.length;Z++){const te=G[Z],Ie=(o?(k-1)*o:0)+Z,_e=h(te,Ie);se.push(_e);let be=ne.get(_e);be||(be=Nc(te,Ie),E&&Yr(be).forEach(Jt=>{Jt.style.transform="translateY(6px)",Jt.style.opacity="0";})),V.appendChild(be);}const pe=[];if(ne.forEach((Z,te)=>{se.includes(te)||pe.push(Z);}),!E){pe.forEach(Z=>Z.remove()),Ae(),Vr();return}se.forEach(Z=>{const te=V.querySelector(`.lg-tr-body[data-id="${Z}"]`);if(!te)return;const Ie=Wi(te),_e=K.get(Z),be=Yr(te);if(_e&&Ie){const Xe=_e.left-Ie.left,Rt=_e.top-Ie.top;be.forEach(lt=>{lt.style.transition="none",lt.style.transform=`translate(${Xe}px, ${Rt}px)`,lt.style.opacity="1";}),Hi(te)?.getBoundingClientRect(),be.forEach(lt=>{lt.style.willChange="transform, opacity",lt.style.transition="transform .18s ease, opacity .18s ease";}),requestAnimationFrame(()=>{be.forEach(lt=>{lt.style.transform="translate(0,0)";});});}else be.forEach(Xe=>{Xe.style.transition="transform .18s ease, opacity .18s ease";}),requestAnimationFrame(()=>{be.forEach(Xe=>{Xe.style.transform="translate(0,0)",Xe.style.opacity="1";});});const qr=Xe=>{(Xe.propertyName==="transform"||Xe.propertyName==="opacity")&&(be.forEach(Rt=>{Rt.style.willChange="",Rt.style.transition="",Rt.style.transform="",Rt.style.opacity="";}),Xe.currentTarget.removeEventListener("transitionend",qr));},Jt=be[0];Jt&&Jt.addEventListener("transitionend",qr);}),pe.forEach(Z=>{const te=Yr(Z);te.forEach(be=>{be.style.willChange="transform, opacity",be.style.transition="transform .18s ease, opacity .18s ease",be.style.opacity="0",be.style.transform="translateY(-6px)";});const Ie=be=>{be.propertyName==="opacity"&&(be.currentTarget.removeEventListener("transitionend",Ie),Z.remove());},_e=te[0];_e?_e.addEventListener("transitionend",Ie):Z.remove();}),Ae(),Vr();}function Nc(G,K){const ne=h(G,K),se=b("div",{className:"lg-tr lg-tr-body","data-id":ne});if(u){const pe=b("div",{className:"lg-td lg-td-check"});if(p==="switch"){const Z=si({size:"sm",checked:R.has(ne),onChange:te=>{te?R.add(ne):R.delete(ne),Ae(),S?.(z());}});me.set(ne,Z),pe.appendChild(Z.root);}else {const Z=b("input",{type:"checkbox",className:"lg-row-check"});Z.checked=R.has(ne),Z.addEventListener("change",te=>{te.stopPropagation(),Z.checked?R.add(ne):R.delete(ne),Ae(),S?.(z());}),Z.addEventListener("click",te=>te.stopPropagation()),pe.appendChild(Z);}se.appendChild(pe);}return x.forEach(pe=>{const Z=b("div",{className:"lg-td"});pe.align&&Z.style.setProperty("--col-justify",j(pe.align));let te=pe.render?pe.render(G,K):String(G[pe.key]??"");typeof te=="string"?Z.textContent=te:Z.appendChild(te),se.appendChild(Z);}),(w||u&&f)&&(se.classList.add("clickable"),se.addEventListener("click",pe=>{if(!pe.target.closest(".lg-td-check")){if(u&&f){const Z=!R.has(ne);if(Z?R.add(ne):R.delete(ne),Ae(),p==="switch"){const te=me.get(ne);te&&te.setChecked(Z,true);}else {const te=se.querySelector(".lg-row-check");te&&(te.checked=Z);}S?.(z());}w?.(G,K,pe);}})),se}function Ui(){if(ae.replaceChildren(),!o)return;const G=F(),K=b("div",{className:"lg-pager"}),ne=b("button",{className:"btn",type:"button"},"←"),se=b("button",{className:"btn",type:"button"},"→"),pe=b("span",{className:"lg-pager-info"},`${k} / ${G}`);ne.disabled=k<=1,se.disabled=k>=G,ne.addEventListener("click",()=>Rn(k-1)),se.addEventListener("click",()=>Rn(k+1)),K.append(ne,pe,se),ae.appendChild(K);}function Rn(G){const K=F();k=Math.min(Math.max(1,G),K),Xt(),Ui();}function On(){N(),Oc(),Xt(),Ui();}function $c(G){v=G.slice(),I=G.slice(),C&&T&&D(),Rn(1);}function Dc(G){x=G.slice(),On();}function Bc(G,K="asc"){C=G,T=G?K:null,C&&T?D():I=v.slice(),On();}function jc(){try{Kr.disconnect();}catch{}window.removeEventListener("resize",Gi);}return ee.append(B,V,ae),O.appendChild(ee),window.addEventListener("resize",Gi),On(),{root:O,setData:$c,setColumns:Dc,sortBy:Bc,getSelection:z,setSelection:Q,clearSelection:X,setPage:Rn,getState:()=>({page:k,pageCount:F(),sortKey:C,sortDir:T}),destroy:jc}}let wr=false;const rn=new Set;function Zd(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}const $e=e=>{const t=Zd();if(t){for(const n of rn)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function eu(){wr||(wr=true,window.addEventListener("keydown",$e,true),window.addEventListener("keypress",$e,true),window.addEventListener("keyup",$e,true),document.addEventListener("keydown",$e,true),document.addEventListener("keypress",$e,true),document.addEventListener("keyup",$e,true));}function tu(){wr&&(wr=false,window.removeEventListener("keydown",$e,true),window.removeEventListener("keypress",$e,true),window.removeEventListener("keyup",$e,true),document.removeEventListener("keydown",$e,true),document.removeEventListener("keypress",$e,true),document.removeEventListener("keyup",$e,true));}function nu(e){return rn.size===0&&eu(),rn.add(e),()=>{rn.delete(e),rn.size===0&&tu();}}function jn(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function ru(){const e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.display="none",t.style.flexShrink="0";const n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");const r=document.createElementNS(e,"animate");r.setAttribute("attributeName","stroke-dasharray"),r.setAttribute("values","1,150;90,150;90,150"),r.setAttribute("dur","1.5s"),r.setAttribute("repeatCount","indefinite");const o=document.createElementNS(e,"animateTransform");return o.setAttribute("attributeName","transform"),o.setAttribute("attributeType","XML"),o.setAttribute("type","rotate"),o.setAttribute("from","0 12 12"),o.setAttribute("to","360 12 12"),o.setAttribute("dur","1s"),o.setAttribute("repeatCount","indefinite"),n.append(r,o),t.appendChild(n),t}function li(e={}){const{id:t,placeholder:n="Rechercher…",value:r="",size:o="md",disabled:i=false,autoFocus:a=false,onChange:s,onSearch:c,autoSearch:d=false,debounceMs:l=0,focusKey:u="/",iconLeft:p,iconRight:f,withClear:g=true,clearTitle:m="Effacer",ariaLabel:h,submitLabel:y,loading:S=false,blockGameKeys:w=true}=e,x=b("div",{className:"search"+(o?` search--${o}`:""),id:t}),I=b("span",{className:"search-ico search-ico--left"});if(p){const X=jn(p);X&&I.appendChild(X);}else I.textContent="🔎",I.style.opacity=".9";const v=b("input",{className:"input search-input",type:"text",placeholder:n,value:r,"aria-label":h||n}),C=b("span",{className:"search-ico search-ico--right"});if(f){const X=jn(f);X&&C.appendChild(X);}const T=ru();T.classList.add("search-spinner");const k=g?b("button",{className:"search-clear",type:"button",title:m},"×"):null,P=y!=null?b("button",{className:"btn search-submit",type:"button"},y):null,E=b("div",{className:"search-field"},I,v,C,T,...k?[k]:[]);x.append(E,...P?[P]:[]);let O=!!i,ee=null;function B(X){T.style.display=X?"inline-block":"none",x.classList.toggle("is-loading",X);}function V(){ee!=null&&(window.clearTimeout(ee),ee=null);}function ae(X){V(),l>0?ee=window.setTimeout(()=>{ee=null,X();},l):X();}function $(){s?.(v.value),d&&c&&c(v.value);}v.addEventListener("input",()=>{ae($);}),v.addEventListener("keydown",X=>{X.key==="Enter"?(X.preventDefault(),V(),c?.(v.value)):X.key==="Escape"&&(v.value.length>0?F("",{notify:true}):v.blur());}),k&&k.addEventListener("click",()=>F("",{notify:true})),P&&P.addEventListener("click",()=>c?.(v.value));let j=()=>{};if(w&&(j=nu(v)),u){const X=ge=>{if(ge.key===u&&!ge.ctrlKey&&!ge.metaKey&&!ge.altKey){const Ae=document.activeElement;Ae&&(Ae.tagName==="INPUT"||Ae.tagName==="TEXTAREA"||Ae.isContentEditable)||(ge.preventDefault(),v.focus());}};window.addEventListener("keydown",X,true),x.__cleanup=()=>{window.removeEventListener("keydown",X,true),j();};}else x.__cleanup=()=>{j();};function N(X){O=!!X,v.disabled=O,k&&(k.disabled=O),P&&(P.disabled=O),x.classList.toggle("disabled",O);}function F(X,ge={}){const Ae=v.value;v.value=X??"",ge.notify&&Ae!==X&&ae($);}function _(){return v.value}function D(){v.focus();}function R(){v.blur();}function z(X){v.placeholder=X;}function me(X){F("",X);}return N(O),B(S),a&&D(),{root:x,input:v,getValue:_,setValue:F,focus:D,blur:R,setDisabled:N,setPlaceholder:z,clear:me,setLoading:B,setIconLeft(X){I.replaceChildren();const ge=jn(X??"🔎");ge&&I.appendChild(ge);},setIconRight(X){C.replaceChildren();const ge=jn(X??"");ge&&C.appendChild(ge);}}}const Fr=e=>new Promise(t=>setTimeout(t,e)),Ye=e=>{try{return e()}catch{return}},tt=(e,t,n)=>Math.max(t,Math.min(n,e)),ou=e=>tt(e,0,1);async function Xi(e,t,n){const r=performance.now();for(;performance.now()-r<t;){const o=await Promise.race([e,Fr(50).then(()=>null)]);if(o!==null)return o}throw new Error(`${n} timeout`)}let ci=null;function bs(){return ci}function iu(e){ci=e;}function ys(){return ci!==null}const au=/\/(?:r\/\d+\/)?version\/([^/]+)/,su=15e3,lu=50;function cu(){return L?.document??(typeof document<"u"?document:null)}function di(e={}){if(ys())return;const t=e.doc??cu();if(!t)return;const n=t.scripts;for(let r=0;r<n.length;r++){const i=n.item(r)?.src;if(!i)continue;const a=i.match(au);if(a?.[1]){iu(a[1]);return}}}function du(){return di(),bs()}function uu(){return ys()}async function pu(e={}){const t=e.timeoutMs??su,n=performance.now();for(;performance.now()-n<t;){di();const r=bs();if(r)return r;await Fr(lu);}throw new Error("MGVersion timeout (gameVersion not found)")}const vs={init:di,isReady:uu,get:du,wait:pu},fu=L?.location?.origin||"https://magicgarden.gg";function xs(){return typeof GM_xmlhttpRequest=="function"}function ws(e,t="text"){return new Promise((n,r)=>{GM_xmlhttpRequest({method:"GET",url:e,responseType:t,onload:o=>o.status>=200&&o.status<300?n(o):r(new Error(`HTTP ${o.status} for ${e}`)),onerror:()=>r(new Error(`Network error for ${e}`)),ontimeout:()=>r(new Error(`Timeout for ${e}`))});})}async function ui(e){if(xs())return JSON.parse((await ws(e,"text")).responseText);const t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.json()}async function ks(e){if(xs())return (await ws(e,"blob")).response;const t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.blob()}function gu(e){return new Promise((t,n)=>{const r=URL.createObjectURL(e),o=L?.Image||Image,i=new o;i.decoding="async",i.onload=()=>{URL.revokeObjectURL(r),t(i);},i.onerror=()=>{URL.revokeObjectURL(r),n(new Error("Image decode failed"));},i.src=r;})}const at=(e,t)=>e.replace(/\/?$/,"/")+String(t||"").replace(/^\//,""),mu=e=>e.lastIndexOf("/")>=0?e.slice(0,e.lastIndexOf("/")+1):"",Ji=(e,t)=>String(t||"").startsWith("/")?String(t).slice(1):mu(e)+String(t||"");let pi=null,Ss=null;function hu(){return pi}function bu(){return Ss}function yu(e){pi=e;}function vu(e){Ss=e;}function Cs(){return pi!==null}const xu=15e3;async function wu(e={}){Cs()||await fi(e);}async function fi(e={}){const t=hu();if(t)return t;const n=bu();if(n)return n;const r=(async()=>{const o=e.gameVersion??await vs.wait({timeoutMs:xu}),i=`${fu}/version/${o}/assets/`;return yu(i),i})();return vu(r),r}async function ku(e){const t=await fi();return at(t,e)}function Su(){return Cs()}const Vt={init:wu,isReady:Su,base:fi,url:ku},As=new Map;function Cu(e){return As.get(e)}function Au(e,t){As.set(e,t);}const Is="manifest.json";let Ao=null;async function Iu(){Ao||(Ao=await Ts());}function Tu(){return Ao!==null}async function Ts(e={}){const t=e.baseUrl??await Vt.base(),n=Cu(t);if(n)return n;const r=ui(at(t,Is));return Au(t,r),r}function Pu(e,t){return e.bundles.find(n=>n.name===t)??null}function Eu(e){if(!e)return [];const t=new Set;for(const n of e.assets)for(const r of n.src??[])typeof r=="string"&&r.endsWith(".json")&&r!==Is&&t.add(r);return Array.from(t)}const dt={init:Iu,isReady:Tu,load:Ts,getBundle:Pu,listJsonFromBundle:Eu},Mu=L,We=Mu.Object??Object,Rr=We.keys,kr=We.values,Sr=We.entries,Qi=new WeakSet;function Lu(){return {data:{items:null,decor:null,mutations:null,eggs:null,pets:null,abilities:null,plants:null,weather:null},isHookInstalled:false,scanInterval:null,scanAttempts:0,weatherPollingTimer:null,weatherPollAttempts:0,colorPollingTimer:null,colorPollAttempts:0}}const W=Lu(),gt={items:["WateringCan","PlanterPot","Shovel"],decor:["SmallRock","MediumRock","LargeRock","WoodBench","StoneBench","MarbleBench"],mutations:["Gold","Rainbow","Wet","Chilled","Frozen"],eggs:["CommonEgg","UncommonEgg","RareEgg"],pets:["Worm","Snail","Bee","Chicken","Bunny"],abilities:["ProduceScaleBoost","DoubleHarvest","SeedFinderI","CoinFinderI"],plants:["Carrot","Strawberry","Aloe","Blueberry","Apple"]},_u=["Rain","Frost","Dawn","AmberMoon"],Zi=/main-[^/]+\.js(\?|$)/,Fu=6,Ru=150,Ou=2e3,Nu=200,$u=50,mt=(e,t)=>t.every(n=>e.includes(n));function ht(e,t){W.data[e]==null&&(W.data[e]=t,Cr()&&Ms());}function Cr(){return Object.values(W.data).every(e=>e!=null)}function Ps(e,t){if(!e||typeof e!="object"||Qi.has(e))return;Qi.add(e);let n;try{n=Rr(e);}catch{return}if(!n||n.length===0)return;const r=e;let o;if(!W.data.items&&mt(n,gt.items)&&(o=r.WateringCan,o&&typeof o=="object"&&"coinPrice"in o&&"creditPrice"in o&&ht("items",r)),!W.data.decor&&mt(n,gt.decor)&&(o=r.SmallRock,o&&typeof o=="object"&&"coinPrice"in o&&"creditPrice"in o&&ht("decor",r)),!W.data.mutations&&mt(n,gt.mutations)&&(o=r.Gold,o&&typeof o=="object"&&"baseChance"in o&&"coinMultiplier"in o&&ht("mutations",r)),!W.data.eggs&&mt(n,gt.eggs)&&(o=r.CommonEgg,o&&typeof o=="object"&&"faunaSpawnWeights"in o&&"secondsToHatch"in o&&ht("eggs",r)),!W.data.pets&&mt(n,gt.pets)&&(o=r.Worm,o&&typeof o=="object"&&"coinsToFullyReplenishHunger"in o&&"diet"in o&&Array.isArray(o.diet)&&ht("pets",r)),!W.data.abilities&&mt(n,gt.abilities)&&(o=r.ProduceScaleBoost,o&&typeof o=="object"&&"trigger"in o&&"baseParameters"in o&&ht("abilities",r)),!W.data.plants&&mt(n,gt.plants)&&(o=r.Carrot,o&&typeof o=="object"&&"seed"in o&&"plant"in o&&"crop"in o&&ht("plants",r)),!(t>=Fu))for(const i of n){let a;try{a=r[i];}catch{continue}a&&typeof a=="object"&&Ps(a,t+1);}}function ur(e){try{Ps(e,0);}catch{}}function Es(){if(!W.isHookInstalled){if(We.__MG_HOOKED__){W.isHookInstalled=true;return}We.__MG_HOOKED__=true,W.isHookInstalled=true;try{We.keys=function(t){return ur(t),Rr.apply(this,arguments)},kr&&(We.values=function(t){return ur(t),kr.apply(this,arguments)}),Sr&&(We.entries=function(t){return ur(t),Sr.apply(this,arguments)});}catch{}}}function Ms(){if(W.isHookInstalled){try{We.keys=Rr,kr&&(We.values=kr),Sr&&(We.entries=Sr);}catch{}W.isHookInstalled=false;}}function Du(){if(W.scanInterval||Cr())return;const e=()=>{if(Cr()||W.scanAttempts>Ru){Ls();return}W.scanAttempts++;try{Rr(L).forEach(t=>{try{ur(L[t]);}catch{}});}catch{}};e(),W.scanInterval=setInterval(e,Ou);}function Ls(){W.scanInterval&&(clearInterval(W.scanInterval),W.scanInterval=null);}const ea=L;function Bu(){try{for(const e of ea.document?.scripts||[]){const t=e?.src?String(e.src):"";if(Zi.test(t))return t}}catch{}try{for(const e of ea.performance?.getEntriesByType?.("resource")||[]){const t=e?.name?String(e.name):"";if(Zi.test(t))return t}}catch{}return null}function ju(e,t){const n=Math.max(e.lastIndexOf("const ",t),e.lastIndexOf("let ",t),e.lastIndexOf("var ",t));if(n<0)return null;const r=e.indexOf("=",n);if(r<0||r>t)return null;const o=e.indexOf("{",r);if(o<0||o>t)return null;let i=0,a="",s=false;for(let c=o;c<e.length;c++){const d=e[c];if(a){if(s){s=false;continue}if(d==="\\"){s=true;continue}d===a&&(a="");continue}if(d==='"'||d==="'"){a=d;continue}if(d==="{")i++;else if(d==="}"&&--i===0)return e.slice(o,c+1)}return null}function zu(e){const t={};let n=false;for(const r of _u){const o=e?.[r];if(!o||typeof o!="object")continue;const i=o.iconSpriteKey||null,{iconSpriteKey:a,...s}=o;t[r]={weatherId:r,spriteId:i,...s},n=true;}return t.Sunny||(t.Sunny={weatherId:"Sunny",name:"Sunny",spriteId:"sprite/ui/SunnyIcon",type:"primary"}),!n||t.Rain&&t.Rain.mutator?.mutation!=="Wet"?null:t}async function Gu(){if(W.data.weather)return  true;const e=Bu();if(!e)return  false;let t="";try{const s=await fetch(e,{credentials:"include"});if(!s.ok)return !1;t=await s.text();}catch{return  false}let n=t.indexOf("fixedTimeSlots:[0,48,96,144,192,240]");if(n<0&&(n=t.indexOf('name:"Amber Moon"')),n<0)return  false;const r=ju(t,n);if(!r)return  false;const o=r.replace(/\b[A-Za-z_$][\w$]*\.(Rain|Frost|Dawn|AmberMoon)\b/g,'"$1"');let i;try{i=Function('"use strict";return('+o+")")();}catch{return  false}const a=zu(i);return a?(W.data.weather=a,true):false}function Hu(){if(W.weatherPollingTimer)return;W.weatherPollAttempts=0;const e=setInterval(async()=>{(await Gu()||++W.weatherPollAttempts>Nu)&&(clearInterval(e),W.weatherPollingTimer=null);},$u);W.weatherPollingTimer=e;}function Wu(){W.weatherPollingTimer&&(clearInterval(W.weatherPollingTimer),W.weatherPollingTimer=null);}const Uu={MoonKisser:{bg:"rgba(250, 166, 35, 0.9)",hover:"rgba(250, 166, 35, 1)"},DawnKisser:{bg:"rgba(162, 92, 242, 0.9)",hover:"rgba(162, 92, 242, 1)"},ProduceScaleBoost:{bg:"rgba(34, 139, 34, 0.9)",hover:"rgba(34, 139, 34, 1)"},ProduceScaleBoostII:{bg:"rgba(34, 139, 34, 0.9)",hover:"rgba(34, 139, 34, 1)"},SnowyCropSizeBoost:{bg:"rgba(34, 139, 34, 0.9)",hover:"rgba(34, 139, 34, 1)"},PlantGrowthBoost:{bg:"rgba(0, 128, 128, 0.9)",hover:"rgba(0, 128, 128, 1)"},PlantGrowthBoostII:{bg:"rgba(0, 128, 128, 0.9)",hover:"rgba(0, 128, 128, 1)"},SnowyPlantGrowthBoost:{bg:"rgba(0, 128, 128, 0.9)",hover:"rgba(0, 128, 128, 1)"},EggGrowthBoost:{bg:"rgba(180, 90, 240, 0.9)",hover:"rgba(180, 90, 240, 1)"},EggGrowthBoostII_NEW:{bg:"rgba(180, 90, 240, 0.9)",hover:"rgba(180, 90, 240, 1)"},EggGrowthBoostII:{bg:"rgba(180, 90, 240, 0.9)",hover:"rgba(180, 90, 240, 1)"},SnowyEggGrowthBoost:{bg:"rgba(180, 90, 240, 0.9)",hover:"rgba(180, 90, 240, 1)"},PetAgeBoost:{bg:"rgba(147, 112, 219, 0.9)",hover:"rgba(147, 112, 219, 1)"},PetAgeBoostII:{bg:"rgba(147, 112, 219, 0.9)",hover:"rgba(147, 112, 219, 1)"},PetHatchSizeBoost:{bg:"rgba(128, 0, 128, 0.9)",hover:"rgba(128, 0, 128, 1)"},PetHatchSizeBoostII:{bg:"rgba(128, 0, 128, 0.9)",hover:"rgba(128, 0, 128, 1)"},PetXpBoost:{bg:"rgba(30, 144, 255, 0.9)",hover:"rgba(30, 144, 255, 1)"},PetXpBoostII:{bg:"rgba(30, 144, 255, 0.9)",hover:"rgba(30, 144, 255, 1)"},SnowyPetXpBoost:{bg:"rgba(30, 144, 255, 0.9)",hover:"rgba(30, 144, 255, 1)"},HungerBoost:{bg:"rgba(255, 20, 147, 0.9)",hover:"rgba(255, 20, 147, 1)"},HungerBoostII:{bg:"rgba(255, 20, 147, 0.9)",hover:"rgba(255, 20, 147, 1)"},SnowyHungerBoost:{bg:"rgba(255, 20, 147, 0.9)",hover:"rgba(255, 20, 147, 1)"},SellBoostI:{bg:"rgba(220, 20, 60, 0.9)",hover:"rgba(220, 20, 60, 1)"},SellBoostII:{bg:"rgba(220, 20, 60, 0.9)",hover:"rgba(220, 20, 60, 1)"},SellBoostIII:{bg:"rgba(220, 20, 60, 0.9)",hover:"rgba(220, 20, 60, 1)"},SellBoostIV:{bg:"rgba(220, 20, 60, 0.9)",hover:"rgba(220, 20, 60, 1)"},CoinFinderI:{bg:"rgba(180, 150, 0, 0.9)",hover:"rgba(180, 150, 0, 1)"},CoinFinderII:{bg:"rgba(180, 150, 0, 0.9)",hover:"rgba(180, 150, 0, 1)"},CoinFinderIII:{bg:"rgba(180, 150, 0, 0.9)",hover:"rgba(180, 150, 0, 1)"},SnowyCoinFinder:{bg:"rgba(180, 150, 0, 0.9)",hover:"rgba(180, 150, 0, 1)"},ProduceMutationBoost:{bg:"rgba(140, 15, 70, 0.9)",hover:"rgba(140, 15, 70, 1)"},ProduceMutationBoostII:{bg:"rgba(140, 15, 70, 0.9)",hover:"rgba(140, 15, 70, 1)"},SnowyCropMutationBoost:{bg:"rgba(140, 15, 70, 0.9)",hover:"rgba(140, 15, 70, 1)"},DoubleHarvest:{bg:"rgba(0, 120, 180, 0.9)",hover:"rgba(0, 120, 180, 1)"},DoubleHatch:{bg:"rgba(60, 90, 180, 0.9)",hover:"rgba(60, 90, 180, 1)"},ProduceEater:{bg:"rgba(255, 69, 0, 0.9)",hover:"rgba(255, 69, 0, 1)"},ProduceRefund:{bg:"rgba(255, 99, 71, 0.9)",hover:"rgba(255, 99, 71, 1)"},PetMutationBoost:{bg:"rgba(160, 50, 100, 0.9)",hover:"rgba(160, 50, 100, 1)"},PetMutationBoostII:{bg:"rgba(160, 50, 100, 0.9)",hover:"rgba(160, 50, 100, 1)"},HungerRestore:{bg:"rgba(255, 105, 180, 0.9)",hover:"rgba(255, 105, 180, 1)"},HungerRestoreII:{bg:"rgba(255, 105, 180, 0.9)",hover:"rgba(255, 105, 180, 1)"},SnowyHungerRestore:{bg:"rgba(255, 105, 180, 0.9)",hover:"rgba(255, 105, 180, 1)"},PetRefund:{bg:"rgba(0, 80, 120, 0.9)",hover:"rgba(0, 80, 120, 1)"},PetRefundII:{bg:"rgba(0, 80, 120, 0.9)",hover:"rgba(0, 80, 120, 1)"},Copycat:{bg:"rgba(255, 140, 0, 0.9)",hover:"rgba(255, 140, 0, 1)"},GoldGranter:{bg:"linear-gradient(135deg, rgba(225, 200, 55, 0.9) 0%, rgba(225, 180, 10, 0.9) 40%, rgba(215, 185, 45, 0.9) 70%, rgba(210, 185, 45, 0.9) 100%)",hover:"linear-gradient(135deg, rgba(220, 200, 70, 1) 0%, rgba(210, 175, 5, 1) 40%, rgba(210, 185, 55, 1) 70%, rgba(200, 175, 30, 1) 100%)"},RainbowGranter:{bg:"linear-gradient(45deg, rgba(200,0,0,0.9), rgba(200,120,0,0.9), rgba(160,170,30,0.9), rgba(60,170,60,0.9), rgba(50,170,170,0.9), rgba(40,150,180,0.9), rgba(20,90,180,0.9), rgba(70,30,150,0.9))",hover:"linear-gradient(45deg, rgba(200,0,0,1), rgba(200,120,0,1), rgba(160,170,30,1), rgba(60,170,60,1), rgba(50,170,170,1), rgba(40,150,180,1), rgba(20,90,180,1), rgba(70,30,150,1))"},RainDance:{bg:"rgba(102, 204, 216, 0.9)",hover:"rgba(102, 204, 216, 1)"},SnowGranter:{bg:"rgba(144, 184, 204, 0.9)",hover:"rgba(144, 184, 204, 1)"},FrostGranter:{bg:"rgba(148, 160, 204, 0.9)",hover:"rgba(148, 160, 204, 1)"},SeedFinderI:{bg:"rgba(168, 102, 38, 0.9)",hover:"rgba(168, 102, 38, 1)"},SeedFinderII:{bg:"rgba(168, 102, 38, 0.9)",hover:"rgba(168, 102, 38, 1)"},SeedFinderIII:{bg:"rgba(168, 102, 38, 0.9)",hover:"rgba(168, 102, 38, 1)"},SeedFinderIV:{bg:"rgba(168, 102, 38, 0.9)",hover:"rgba(168, 102, 38, 1)"}},Vu={bg:"rgba(100, 100, 100, 0.9)",hover:"rgba(150, 150, 150, 1)"};function Ku(e){return Uu[e]||Vu}function ta(){if(!W.data.abilities)return;const e=W.data.abilities;let t=false;for(const r of Object.values(e))if(r&&typeof r=="object"&&"colors"in r){t=true;break}if(t)return;const n={};for(const[r,o]of Object.entries(e)){const i=Ku(r);n[r]={...o,colors:{bg:i.bg,hover:i.hover}};}W.data.abilities=n,console.log("[MGData] Enriched abilities with colors");}function Yu(){if(W.colorPollingTimer)return;W.colorPollAttempts=0;const e=10,n=setInterval(()=>{W.data.abilities?(ta(),clearInterval(n),W.colorPollingTimer=null):++W.colorPollAttempts>e&&(clearInterval(n),W.colorPollingTimer=null);},1e3);W.colorPollingTimer=n,W.data.abilities&&(ta(),clearInterval(n),W.colorPollingTimer=null);}function qu(){W.colorPollingTimer&&(clearInterval(W.colorPollingTimer),W.colorPollingTimer=null);}function Xu(e){return String(e||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^A-Za-z0-9]/g,"").trim()}function Ju(e,t=[]){const n=new Set,r=o=>{const i=String(o||"").trim();i&&n.add(i);};r(e);for(const o of t)r(o);for(const o of Array.from(n.values()))o.endsWith("s")?r(o.slice(0,-1)):r(`${o}s`),o.endsWith("es")&&r(o.slice(0,-2));return Array.from(n.values()).filter(Boolean)}function _s(e,t,n,r=[],o=[]){const i=window.Gemini?.Modules?.Sprite;if(!i)return null;const a=Ju(e,r);if(!a.length)return null;const s=[t,...o].filter(u=>typeof u=="string"),c=u=>{const p=String(u||"").trim();if(!p)return null;for(const f of a)try{if(i.has(f,p))return i.getIdPath(f,p)}catch{}return null};for(const u of s){const p=c(u);if(p)return p}const d=Xu(n||""),l=c(d||n||"");if(l)return l;try{for(const u of a){const p=i.listIds(`sprite/${u}/`),f=s.map(m=>String(m||"").toLowerCase()),g=String(n||d||"").toLowerCase();for(const m of p){const y=(m.split("/").pop()||"").toLowerCase();if(f.some(S=>S&&S===y)||y===g)return m}for(const m of p){const y=(m.split("/").pop()||"").toLowerCase();if(f.some(S=>S&&y.includes(S))||g&&y.includes(g))return m}}}catch{}return null}function Re(e,t,n,r,o=[],i=[]){if(!e||typeof e!="object")return;const a=e.tileRef;if(!a||typeof a!="object")return;const s=String(a.spritesheet||t||"").trim(),c=_s(s,n,r,o,i);if(c)try{e.spriteId=c;}catch{}const d=e.rotationVariants;if(d&&typeof d=="object")for(const l of Object.values(d))Re(l,s,n,r);if(e.immatureTileRef){const l={tileRef:e.immatureTileRef};Re(l,s,n,r),l.spriteId&&(e.immatureSpriteId=l.spriteId);}if(e.topmostLayerTileRef){const l={tileRef:e.topmostLayerTileRef};Re(l,s,n,r),l.spriteId&&(e.topmostLayerSpriteId=l.spriteId);}e.activeState&&typeof e.activeState=="object"&&Re(e.activeState,s,n,e.activeState?.name||r);}function Qu(e,t,n,r=[]){if(!Array.isArray(t)||t.length===0)return null;const o=t[0],i=t.slice(1);return _s(e,o,n??null,r,i)}function Zu(e){for(const[t,n]of Object.entries(e.items||{}))Re(n,"items",t,n?.name,["item"]);for(const[t,n]of Object.entries(e.decor||{}))Re(n,"decor",t,n?.name);for(const[t,n]of Object.entries(e.mutations||{})){Re(n,"mutations",t,n?.name,["mutation"]);const r=Qu("mutation-overlay",[`${t}TallPlant`,`${t}TallPlantIcon`,t],n?.name,["mutation-overlay"]);if(r)try{n.overlaySpriteId=r;}catch{}}for(const[t,n]of Object.entries(e.eggs||{}))Re(n,"pets",t,n?.name,["pet"]);for(const[t,n]of Object.entries(e.pets||{}))Re(n,"pets",t,n?.name,["pet"]);for(const[t,n]of Object.entries(e.plants||{})){const r=n;r.seed&&Re(r.seed,r.seed?.tileRef?.spritesheet||"seeds",`${t}Seed`,r.seed?.name||`${t} Seed`,["seed","plant","plants"],[t]),r.plant&&Re(r.plant,r.plant?.tileRef?.spritesheet||"plants",`${t}Plant`,r.plant?.name||`${t} Plant`,["plant","plants","tallplants"],[t]),r.crop&&Re(r.crop,r.crop?.tileRef?.spritesheet||"plants",t,r.crop?.name||t,["plant","plants"],[`${t}Crop`]);}}function ep(){try{Zu(W.data);}catch(e){try{console.warn("[MGData] sprite resolution failed",e);}catch{}}}const Fs=1e4,Rs=50;function Os(e){return new Promise(t=>setTimeout(t,e))}function tp(e){return W.data[e]}function np(){return {...W.data}}function rp(e){return W.data[e]!=null}async function op(e,t=Fs,n=Rs){const r=Date.now();for(;Date.now()-r<t;){const o=W.data[e];if(o!=null)return o;await Os(n);}throw new Error(`MGData.waitFor: timeout waiting for "${e}"`)}async function ip(e=Fs,t=Rs){const n=Date.now();for(;Date.now()-n<e;){if(Object.values(W.data).some(r=>r!=null))return {...W.data};await Os(t);}throw new Error("MGData.waitForAnyData: timeout")}const ap=["CoinFinderI","CoinFinderII","CoinFinderIII","SeedFinderI","SeedFinderII","SeedFinderIII","SeedFinderIV","HungerRestore","HungerRestoreII","DoubleHarvest","DoubleHatch","ProduceEater","PetHatchSizeBoost","PetHatchSizeBoostII","PetAgeBoost","PetAgeBoostII","PetRefund","PetRefundII","ProduceRefund","SellBoostI","SellBoostII","SellBoostIII","SellBoostIV","GoldGranter","RainbowGranter","RainDance","PetXpBoost","PetXpBoostII","EggGrowthBoost","EggGrowthBoostII_NEW","EggGrowthBoostII","PlantGrowthBoost","PlantGrowthBoostII","ProduceScaleBoost","ProduceScaleBoostII"];function sp(e){return ap.includes(e)}function lp(e){return e.filter(t=>sp(t.action))}function na(e){const t=Math.floor(e/3600),n=Math.floor(e%3600/60),r=Math.floor(e%60);return t>0?`${t}h ${n}m`:n>0?`${n}m ${r}s`:`${r}s`}function Xr(e){return e?.name||e?.petSpecies||"Unknown Pet"}function cp(e){const{action:t,parameters:n}=e,r=n;switch(t){case "CoinFinderI":case "CoinFinderII":case "CoinFinderIII":return `Found ${r.coinsFound||0} coins`;case "SeedFinderI":case "SeedFinderII":case "SeedFinderIII":case "SeedFinderIV":return `Found 1× ${r.speciesId||"Unknown"} seed`;case "HungerRestore":case "HungerRestoreII":{const o=Xr(r.targetPet),i=r.hungerRestoreAmount||0,s=r.pet?.id===r.targetPet?.id?"itself":o;return `Restored ${i} hunger to ${s}`}case "DoubleHarvest":return `Double harvested ${r.harvestedCrop?.species||"Unknown"}`;case "DoubleHatch":return `Double hatched ${r.extraPet?.petSpecies||"Unknown"}`;case "ProduceEater":{const o=r.growSlot?.species||"Unknown",i=r.sellPrice||0;return `Ate ${o} for ${i} coins`}case "PetHatchSizeBoost":case "PetHatchSizeBoostII":{const o=Xr(r.targetPet),i=r.strengthIncrease||0;return `Boosted ${o}'s size by +${i.toFixed(0)}`}case "PetAgeBoost":case "PetAgeBoostII":{const o=Xr(r.targetPet);return `Gave +${r.bonusXp||0} XP to ${o}`}case "PetRefund":case "PetRefundII":return `Refunded 1× ${r.eggId||"Unknown Egg"}`;case "ProduceRefund":{const o=r.cropsRefunded?.length||0;return `Refunded ${o} ${o===1?"crop":"crops"}`}case "SellBoostI":case "SellBoostII":case "SellBoostIII":case "SellBoostIV":return `Gave +${r.bonusCoins||0} bonus coins`;case "GoldGranter":case "RainbowGranter":case "RainDance":{const o=r.mutation||"Unknown";return `Made ${r.growSlot?.species||"Unknown"} turn ${o}`}case "PetXpBoost":case "PetXpBoostII":{const o=r.bonusXp||0,i=r.petsAffected?.length||0;return `Gave +${o} XP to ${i} ${i===1?"pet":"pets"}`}case "EggGrowthBoost":case "EggGrowthBoostII_NEW":case "EggGrowthBoostII":{const o=r.secondsReduced||0,i=r.eggsAffected?.length||0,a=na(o);return `Reduced ${i} ${i===1?"egg":"eggs"} growth by ${a}`}case "PlantGrowthBoost":case "PlantGrowthBoostII":{const o=r.secondsReduced||0,i=r.numPlantsAffected||0,a=na(o);return `Reduced ${i} ${i===1?"plant":"plants"} growth by ${a}`}case "ProduceScaleBoost":case "ProduceScaleBoostII":{const o=r.scaleIncreasePercentage||0,i=r.numPlantsAffected||0;return `Boosted ${i} ${i===1?"crop":"crops"} size by +${o.toFixed(0)}%`}default:return `Unknown ability: ${t}`}}const ce={async init(){Es(),Du(),Hu(),Yu();},isReady:Cr,get:tp,getAll:np,has:rp,waitFor:op,waitForAny:ip,resolveSprites:ep,cleanup(){Ms(),Ls(),Wu(),qu();}},dp=new Map;function up(){return dp}function Io(){return L.jotaiAtomCache?.cache}function ut(e){const t=up(),n=t.get(e);if(n)return n;const r=Io();if(!r)return null;for(const o of r.values())if((o?.debugLabel||o?.label||"")===e)return t.set(e,o),o;return null}function pp(){const e=L;if(e.__REACT_DEVTOOLS_GLOBAL_HOOK__)return;const t=new Map,n=new Map;e.__REACT_DEVTOOLS_GLOBAL_HOOK__={renderers:t,supportsFiber:true,inject:r=>{const o=t.size+1;return t.set(o,r),n.set(o,new Set),o},onCommitFiberRoot:(r,o)=>{const i=n.get(r);i&&i.add(o);},onCommitFiberUnmount:()=>{},onPostCommitFiberRoot:()=>{},getFiberRoots:r=>n.get(r),checkDCE:()=>{},isDisabled:false};}const fp={baseStore:null,captureInProgress:false,captureError:null,lastCapturedVia:null,mirror:void 0};function Kt(){return fp}const gp="__JOTAI_STORE_READY__";let ra=false;const To=new Set;function zn(){if(!ra){ra=true;for(const e of To)try{e();}catch{}try{const e=L.CustomEvent||CustomEvent;L.dispatchEvent?.(new e(gp));}catch{}}}function mp(e){To.add(e);const t=Eo();if(t.via&&!t.polyfill)try{e();}catch{}return ()=>{To.delete(e);}}async function hp(e={}){const{timeoutMs:t=6e3,intervalMs:n=50}=e,r=Eo();if(!(r.via&&!r.polyfill))return new Promise((o,i)=>{let a=false;const s=mp(()=>{a||(a=true,s(),o());}),c=Date.now();(async()=>{for(;!a&&Date.now()-c<t;){const l=Eo();if(l.via&&!l.polyfill){if(a)return;a=true,s(),o();return}await wn(n);}a||(a=true,s(),i(new Error("Store not captured within timeout")));})();})}const wn=e=>new Promise(t=>setTimeout(t,e));function Ns(){try{const e=L.Event||Event;L.dispatchEvent?.(new e("visibilitychange"));}catch{}}function Po(e){return e&&typeof e=="object"&&typeof e.get=="function"&&typeof e.set=="function"&&typeof e.sub=="function"}function Jr(e,t=0,n=new WeakSet){if(t>3||!e||typeof e!="object"||n.has(e))return null;try{n.add(e);}catch{return null}if(Po(e))return e;const r=["store","value","current","state","s","baseStore"];for(const o of r)try{const i=e[o];if(Po(i))return i}catch{}return null}function $s(){const e=Kt(),t=L.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t?.renderers?.size)return null;let n=0;for(const[r]of t.renderers){const o=t.getFiberRoots?.(r);o&&(n+=o.size||0);}if(n===0)return null;for(const[r]of t.renderers){const o=t.getFiberRoots?.(r);if(o)for(const i of o){const a=new Set,s=[i.current];for(;s.length;){const c=s.pop();if(!(!c||a.has(c))){a.add(c);try{const d=c?.pendingProps?.value;if(Po(d))return e.lastCapturedVia="fiber",d}catch{}try{let d=c?.memoizedState,l=0;for(;d&&l<15;){l++;const u=Jr(d);if(u)return e.lastCapturedVia="fiber",u;const p=Jr(d.memoizedState);if(p)return e.lastCapturedVia="fiber",p;d=d.next;}}catch{}try{if(c?.stateNode){const d=Jr(c.stateNode);if(d)return e.lastCapturedVia="fiber",d}}catch{}c.child&&s.push(c.child),c.sibling&&s.push(c.sibling),c.alternate&&s.push(c.alternate);}}}}return null}function Ds(){return {get:()=>{throw new Error("Store not captured: get unavailable")},set:()=>{throw new Error("Store not captured: set unavailable")},sub:()=>()=>{},__polyfill:true}}async function bp(e=5e3){const t=Date.now();let n=Io();for(;!n&&Date.now()-t<e;)await wn(100),n=Io();if(!n)throw new Error("jotaiAtomCache.cache not found");const r=Kt();let o=null,i=null;const a=[],s=()=>{for(const d of a)try{d.__origWrite&&(d.write=d.__origWrite,delete d.__origWrite);}catch{}};for(const d of n.values()){if(!d||typeof d.write!="function"||d.__origWrite)continue;const l=d.write;d.__origWrite=l,d.write=function(u,p,...f){return i||(o=u,i=p,s()),l.call(this,u,p,...f)},a.push(d);}Ns();const c=Date.now();for(;!i&&Date.now()-c<e;)await wn(50);return i?(r.lastCapturedVia="write",{get:d=>o(d),set:(d,l)=>i(d,l),sub:(d,l)=>{let u;try{u=o(d);}catch{}const p=setInterval(()=>{let f;try{f=o(d);}catch{return}if(f!==u){u=f;try{l();}catch{}}},100);return ()=>clearInterval(p)}}):(s(),r.lastCapturedVia="polyfill",Ds())}async function yp(e=1e4){const t=Kt();Ns();const n=Date.now();for(;Date.now()-n<e;){const r=$s();if(r)return r;await wn(50);}return t.lastCapturedVia="polyfill",Ds()}async function gi(){const e=Kt();if(e.baseStore&&!e.baseStore.__polyfill)return zn(),e.baseStore;if(e.captureInProgress){const t=Date.now(),n=2500;for(;!e.baseStore&&Date.now()-t<n;)await wn(25);if(e.baseStore)return e.baseStore.__polyfill||zn(),e.baseStore}e.captureInProgress=true;try{const t=$s();if(t)return e.baseStore=t,zn(),t;try{const r=await bp(5e3);return e.baseStore=r,r.__polyfill||zn(),r}catch(r){e.captureError=r;}const n=await yp();return e.baseStore=n,n}catch(t){throw e.captureError=t,t}finally{e.captureInProgress=false;}}function Eo(){const e=Kt();return {via:e.lastCapturedVia,polyfill:!!e.baseStore?.__polyfill,error:e.captureError}}async function vp(){const e=await gi(),t=new WeakMap,n=async o=>{let i=t.get(o);if(i)return i;i={last:void 0,has:false,subs:new Set},t.set(o,i);try{i.last=e.get(o),i.has=!0;}catch{}const a=e.sub(o,()=>{let s;try{s=e.get(o);}catch{return}const c=i.last,d=!Object.is(s,c)||!i.has;if(i.last=s,i.has=true,d)for(const l of i.subs)try{l(s,c);}catch{}});return i.unsubUpstream=a,i};return {async get(o){const i=await n(o);if(i.has)return i.last;const a=e.get(o);return i.last=a,i.has=true,a},async set(o,i){await e.set(o,i);const a=await n(o);a.last=i,a.has=true;},async sub(o,i){const a=await n(o);if(a.subs.add(i),a.has)try{i(a.last,a.last);}catch{}return ()=>{a.subs.delete(i);}},getShadow(o){return t.get(o)?.last},hasShadow(o){return !!t.get(o)?.has},async ensureWatch(o){await n(o);},async asStore(){return {get:o=>this.get(o),set:(o,i)=>this.set(o,i),sub:(o,i)=>{let a=null;return this.sub(o,()=>i()).then(s=>a=s),()=>a?.()}}}}}async function pr(){const e=Kt();return e.mirror||(e.mirror=await vp()),e.mirror}const de={async select(e){const t=await pr(),n=ut(e);if(!n)throw new Error(`[Store] Atom not found: "${e}"`);return t.get(n)},async set(e,t){const n=await pr(),r=ut(e);if(!r)throw new Error(`[Store] Atom not found: "${e}"`);await n.set(r,t);},async subscribe(e,t){const n=await pr(),r=ut(e);if(!r)throw new Error(`[Store] Atom not found: "${e}"`);return n.sub(r,o=>{try{t(o);}catch{}})},async subscribeImmediate(e,t){const n=await de.select(e);try{t(n);}catch{}return de.subscribe(e,t)}};async function xp(){await pr();}function mi(e){return e?Array.isArray(e)?e.slice():e.split(".").map(t=>t.match(/^\d+$/)?Number(t):t):[]}function kn(e,t){const n=mi(t);let r=e;for(const o of n){if(r==null)return;r=r[o];}return r}function wp(e,t,n){const r=mi(t);if(!r.length)return n;const o=Array.isArray(e)?[...e]:{...e??{}};let i=o;for(let a=0;a<r.length-1;a++){const s=r[a],c=i[s],d=typeof c=="object"&&c!==null?Array.isArray(c)?[...c]:{...c}:{};i[s]=d,i=d;}return i[r[r.length-1]]=n,o}function oa(e,t){const n={};for(const r of t)n[r]=r.includes(".")?kn(e,r):e?.[r];try{return JSON.stringify(n)}catch{return String(n)}}function kp(e,t,n){const r=n.mode??"auto";function o(d){const l=t?kn(d,t):d,u=new Map;if(l==null)return {signatures:u,keys:[]};const p=Array.isArray(l);if((r==="array"||r==="auto"&&p)&&p)for(let g=0;g<l.length;g++){const m=l[g],h=n.key?n.key(m,g,d):g,y=n.sig?n.sig(m,g,d):n.fields?oa(m,n.fields):JSON.stringify(m);u.set(h,y);}else for(const[g,m]of Object.entries(l)){const h=n.key?n.key(m,g,d):g,y=n.sig?n.sig(m,g,d):n.fields?oa(m,n.fields):JSON.stringify(m);u.set(h,y);}return {signatures:u,keys:Array.from(u.keys())}}function i(d,l){if(d===l)return  true;if(!d||!l||d.size!==l.size)return  false;for(const[u,p]of d)if(l.get(u)!==p)return  false;return  true}async function a(d){let l=null;return de.subscribeImmediate(e,u=>{const p=t?kn(u,t):u,{signatures:f}=o(p);if(!i(l,f)){const g=new Set([...l?Array.from(l.keys()):[],...Array.from(f.keys())]),m=[];for(const h of g){const y=l?.get(h)??"__NONE__",S=f.get(h)??"__NONE__";y!==S&&m.push(h);}l=f,d({value:p,changedKeys:m});}})}async function s(d,l){return a(({value:u,changedKeys:p})=>{p.includes(d)&&l({value:u});})}async function c(d,l){const u=new Set(d);return a(({value:p,changedKeys:f})=>{const g=f.filter(m=>u.has(m));g.length&&l({value:p,changedKeys:g});})}return {sub:a,subKey:s,subKeys:c}}const Dt=new Map;function Sp(e,t){const n=Dt.get(e);if(n)try{n();}catch{}return Dt.set(e,t),()=>{try{t();}catch{}Dt.get(e)===t&&Dt.delete(e);}}function ue(e,t={}){const{path:n,write:r="replace"}=t,o=n?`${e}:${mi(n).join(".")}`:e;async function i(){const u=await de.select(e);return n?kn(u,n):u}async function a(u){if(typeof r=="function"){const g=await de.select(e),m=r(u,g);return de.set(e,m)}const p=await de.select(e),f=n?wp(p,n,u):u;return r==="merge-shallow"&&!n&&p&&typeof p=="object"&&typeof u=="object"?de.set(e,{...p,...u}):de.set(e,f)}async function s(u){const p=await i(),f=u(p);return await a(f),f}async function c(u,p,f){let g;const m=y=>{const S=n?kn(y,n):y;if(typeof g>"u"||!f(g,S)){const w=g;g=S,p(S,w);}},h=u?await de.subscribeImmediate(e,m):await de.subscribe(e,m);return Sp(o,h)}function d(){const u=Dt.get(o);if(u){try{u();}catch{}Dt.delete(o);}}function l(u){return kp(e,u?.path??n,u)}return {label:o,get:i,set:a,update:s,onChange:(u,p=Object.is)=>c(false,u,p),onChangeNow:(u,p=Object.is)=>c(true,u,p),asSignature:l,stopOnChange:d}}function A(e){return ue(e)}A("positionAtom");A("lastPositionInMyGardenAtom");A("playerDirectionAtom");A("stateAtom");A("quinoaDataAtom");A("currentTimeAtom");A("actionAtom");A("isPressAndHoldActionAtom");A("mapAtom");A("tileSizeAtom");ue("mapAtom",{path:"cols"});ue("mapAtom",{path:"rows"});ue("mapAtom",{path:"spawnTiles"});ue("mapAtom",{path:"locations.seedShop.spawnTileIdx"});ue("mapAtom",{path:"locations.eggShop.spawnTileIdx"});ue("mapAtom",{path:"locations.toolShop.spawnTileIdx"});ue("mapAtom",{path:"locations.decorShop.spawnTileIdx"});ue("mapAtom",{path:"locations.sellCropsShop.spawnTileIdx"});ue("mapAtom",{path:"locations.sellPetShop.spawnTileIdx"});ue("mapAtom",{path:"locations.collectorsClub.spawnTileIdx"});ue("mapAtom",{path:"locations.wishingWell.spawnTileIdx"});ue("mapAtom",{path:"locations.shopsCenter.spawnTileIdx"});A("playerAtom");A("myDataAtom");A("myUserSlotIdxAtom");A("isSpectatingAtom");A("myCoinsCountAtom");A("numPlayersAtom");ue("playerAtom",{path:"id"});ue("myDataAtom",{path:"activityLogs"});A("userSlotsAtom");A("filteredUserSlotsAtom");A("myUserSlotAtom");A("spectatorsAtom");ue("stateAtom",{path:"child"});ue("stateAtom",{path:"child.data"});ue("stateAtom",{path:"child.data.shops"});const Cp=ue("stateAtom",{path:"child.data.userSlots"}),Ap=ue("stateAtom",{path:"data.players"}),Ip=ue("stateAtom",{path:"data.hostPlayerId"});A("myInventoryAtom");A("myInventoryItemsAtom");A("isMyInventoryAtMaxLengthAtom");A("myFavoritedItemIdsAtom");A("myCropInventoryAtom");A("mySeedInventoryAtom");A("myToolInventoryAtom");A("myEggInventoryAtom");A("myDecorInventoryAtom");A("myPetInventoryAtom");ue("myInventoryAtom",{path:"favoritedItemIds"});A("itemTypeFiltersAtom");A("myItemStoragesAtom");A("myPetHutchStoragesAtom");A("myPetHutchItemsAtom");A("myPetHutchPetItemsAtom");A("myNumPetHutchItemsAtom");A("myValidatedSelectedItemIndexAtom");A("isSelectedItemAtomSuspended");A("mySelectedItemAtom");A("mySelectedItemNameAtom");A("mySelectedItemRotationsAtom");A("mySelectedItemRotationAtom");A("setSelectedIndexToEndAtom");A("myPossiblyNoLongerValidSelectedItemIndexAtom");A("myCurrentGlobalTileIndexAtom");A("myCurrentGardenTileAtom");A("myCurrentGardenObjectAtom");A("myOwnCurrentGardenObjectAtom");A("myOwnCurrentDirtTileIndexAtom");A("myCurrentGardenObjectNameAtom");A("isInMyGardenAtom");A("myGardenBoardwalkTileObjectsAtom");const Tp=ue("myDataAtom",{path:"garden"});ue("myDataAtom",{path:"garden.tileObjects"});ue("myOwnCurrentGardenObjectAtom",{path:"objectType"});A("myCurrentStablePlantObjectInfoAtom");A("myCurrentSortedGrowSlotIndicesAtom");A("myCurrentGrowSlotIndexAtom");A("myCurrentGrowSlotsAtom");A("myCurrentGrowSlotAtom");A("secondsUntilCurrentGrowSlotMaturesAtom");A("isCurrentGrowSlotMatureAtom");A("numGrowSlotsAtom");A("myCurrentEggAtom");A("petInfosAtom");A("myPetInfosAtom");A("myPetSlotInfosAtom");A("myPrimitivePetSlotsAtom");A("myNonPrimitivePetSlotsAtom");A("expandedPetSlotIdAtom");A("myPetsProgressAtom");A("myActiveCropMutationPetsAtom");A("totalPetSellPriceAtom");A("selectedPetHasNewVariantsAtom");const Pp=A("shopsAtom"),Ep=A("myShopPurchasesAtom");A("seedShopAtom");A("seedShopInventoryAtom");A("seedShopRestockSecondsAtom");A("seedShopCustomRestockInventoryAtom");A("eggShopAtom");A("eggShopInventoryAtom");A("eggShopRestockSecondsAtom");A("eggShopCustomRestockInventoryAtom");A("toolShopAtom");A("toolShopInventoryAtom");A("toolShopRestockSecondsAtom");A("toolShopCustomRestockInventoryAtom");A("decorShopAtom");A("decorShopInventoryAtom");A("decorShopRestockSecondsAtom");A("decorShopCustomRestockInventoryAtom");A("isDecorShopAboutToRestockAtom");ue("shopsAtom",{path:"seed"});ue("shopsAtom",{path:"tool"});ue("shopsAtom",{path:"egg"});ue("shopsAtom",{path:"decor"});A("myCropItemsAtom");A("myCropItemsToSellAtom");A("totalCropSellPriceAtom");A("friendBonusMultiplierAtom");A("myJournalAtom");A("myCropJournalAtom");A("myPetJournalAtom");A("myStatsAtom");A("myActivityLogsAtom");A("newLogsAtom");A("hasNewLogsAtom");A("newCropLogsFromSellingAtom");A("hasNewCropLogsFromSellingAtom");A("myCompletedTasksAtom");A("myActiveTasksAtom");A("isWelcomeToastVisibleAtom");A("shouldCloseWelcomeToastAtom");A("isInitialMoveToDirtPatchToastVisibleAtom");A("isFirstPlantSeedActiveAtom");A("isThirdSeedPlantActiveAtom");A("isThirdSeedPlantCompletedAtom");A("isDemoTouchpadVisibleAtom");A("areShopAnnouncersEnabledAtom");A("arePresentablesEnabledAtom");A("isEmptyDirtTileHighlightedAtom");A("isPlantTileHighlightedAtom");A("isItemHiglightedInHotbarAtom");A("isItemHighlightedInModalAtom");A("isMyGardenButtonHighlightedAtom");A("isSellButtonHighlightedAtom");A("isShopButtonHighlightedAtom");A("isInstaGrowButtonHiddenAtom");A("isActionButtonHighlightedAtom");A("isGardenItemInfoCardHiddenAtom");A("isSeedPurchaseButtonHighlightedAtom");A("isFirstSeedPurchaseActiveAtom");A("isFirstCropHarvestActiveAtom");A("isWeatherStatusHighlightedAtom");const Mp=A("weatherAtom"),hi=A("activeModalAtom");A("hotkeyBeingPressedAtom");A("avatarTriggerAnimationAtom");A("avatarDataAtom");A("emoteDataAtom");A("otherUserSlotsAtom");A("otherPlayerPositionsAtom");A("otherPlayerSelectedItemsAtom");A("otherPlayerLastActionsAtom");A("traderBunnyPlayerId");A("npcPlayersAtom");A("npcQuinoaUsersAtom");A("numNpcAvatarsAtom");A("traderBunnyEmoteTimeoutAtom");A("traderBunnyEmoteAtom");A("unsortedLeaderboardAtom");A("currentGardenNameAtom");A("quinoaEngineAtom");A("quinoaInitializationErrorAtom");A("avgPingAtom");A("serverClientTimeOffsetAtom");A("isEstablishingShotRunningAtom");A("isEstablishingShotCompleteAtom");const oe={initialized:false,activeModal:null,isCustom:false,shadow:null,patchedAtoms:new Set,originalReads:new Map,unsubscribes:[],listeners:{onOpen:new Set,onClose:new Set}};function Or(){return oe}function Lp(){return oe.initialized}function Mt(){return oe.isCustom&&oe.activeModal!==null}function Tt(){return oe.activeModal}function Bs(e){return !oe.shadow||oe.shadow.modal!==e?null:oe.shadow.data}function _p(e){oe.initialized=e;}function bi(e){oe.activeModal=e;}function yi(e){oe.isCustom=e;}function js(e,t){oe.shadow={modal:e,data:t,timestamp:Date.now()};}function zs(){oe.shadow=null;}function ia(e,t){oe.patchedAtoms.add(e),oe.originalReads.set(e,t);}function Fp(e){return oe.originalReads.get(e)}function Mo(e){return oe.patchedAtoms.has(e)}function Rp(e){oe.patchedAtoms.delete(e),oe.originalReads.delete(e);}function Op(e){oe.unsubscribes.push(e);}function Np(){for(const e of oe.unsubscribes)try{e();}catch{}oe.unsubscribes.length=0;}function $p(e){return oe.listeners.onOpen.add(e),()=>oe.listeners.onOpen.delete(e)}function Gs(e){return oe.listeners.onClose.add(e),()=>oe.listeners.onClose.delete(e)}function Hs(e){for(const t of Array.from(oe.listeners.onOpen))try{t(e);}catch{}}function vi(e){for(const t of Array.from(oe.listeners.onClose))try{t(e);}catch{}}function Dp(){Np(),oe.initialized=false,oe.activeModal=null,oe.isCustom=false,oe.shadow=null,oe.patchedAtoms.clear(),oe.originalReads.clear(),oe.listeners.onOpen.clear(),oe.listeners.onClose.clear();}const xi={inventory:{atoms:[{atomLabel:"myInventoryAtom",dataKey:"_full",transform:e=>{const t=e;return {items:t.items??[],storages:t.storages??[],favoritedItemIds:t.favoritedItemIds??[]}}}],derivedAtoms:[{atomLabel:"myCropInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Produce"):[]},{atomLabel:"mySeedInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Seed"):[]},{atomLabel:"myToolInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Tool"):[]},{atomLabel:"myEggInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Egg"):[]},{atomLabel:"myDecorInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Decor"):[]},{atomLabel:"myPetInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Pet"):[]}]},journal:{atoms:[{atomLabel:"myJournalAtom",dataKey:"_full"}],derivedAtoms:[{atomLabel:"myCropJournalAtom",sourceKey:"produce",deriveFn:e=>e??{}},{atomLabel:"myPetJournalAtom",sourceKey:"pets",deriveFn:e=>e??{}}]},stats:{atoms:[{atomLabel:"myStatsAtom",dataKey:"_full"}]},activityLog:{atoms:[{atomLabel:"myActivityLogsAtom",dataKey:"logs"}]},seedShop:{atoms:[{atomLabel:"seedShopInventoryAtom",dataKey:"inventory"},{atomLabel:"seedShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},eggShop:{atoms:[{atomLabel:"eggShopInventoryAtom",dataKey:"inventory"},{atomLabel:"eggShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},toolShop:{atoms:[{atomLabel:"toolShopInventoryAtom",dataKey:"inventory"},{atomLabel:"toolShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},decorShop:{atoms:[{atomLabel:"decorShopInventoryAtom",dataKey:"inventory"},{atomLabel:"decorShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},leaderboard:{atoms:[{atomLabel:"unsortedLeaderboardAtom",dataKey:"entries"}]},petHutch:{atoms:[{atomLabel:"myPetHutchItemsAtom",dataKey:"items"},{atomLabel:"myPetHutchPetItemsAtom",dataKey:"petItems"}]}};function Ws(e){return xi[e]}function Bp(e){const t=xi[e],n=[];for(const r of t.atoms)n.push(r.atomLabel);if(t.derivedAtoms)for(const r of t.derivedAtoms)n.push(r.atomLabel);return n}const jp=new Set(["inventory","journal","stats","activityLog","petHutch"]),zp=new Set(["seedShop","eggShop","toolShop","decorShop"]),Gp=new Set(["leaderboard"]);function Hp(e,t,n,r){return function(i){const a=Mt(),s=Tt();if(a&&s===r){const c=Bs(r);if(c!==null){let d;if(n.dataKey==="_full"?d=c:d=c[n.dataKey],d!==void 0)return t(i),n.transform?n.transform(d):d}}return t(i)}}function Wp(e,t,n,r,o){return function(a){if(Mt()&&Tt()===o){const s=Bs(o);if(s!==null){const c=s[n];if(c!==void 0)return t(a),r(c)}}return t(a)}}function Up(e){const t=Ws(e);for(const n of t.atoms){const r=ut(n.atomLabel);if(!r||Mo(n.atomLabel))continue;const o=r.read;if(typeof o!="function")continue;const i=Hp(n.atomLabel,o,n,e);r.read=i,ia(n.atomLabel,o);}if(t.derivedAtoms)for(const n of t.derivedAtoms){const r=ut(n.atomLabel);if(!r||Mo(n.atomLabel))continue;const o=r.read;if(typeof o!="function")continue;const i=Wp(n.atomLabel,o,n.sourceKey,n.deriveFn,e);r.read=i,ia(n.atomLabel,o);}}async function Nr(e){const t=Ws(e);for(const r of t.atoms)aa(r.atomLabel);if(t.derivedAtoms)for(const r of t.derivedAtoms)aa(r.atomLabel);const n=await gi();await Us(n,e);}async function Vp(e){const t=await gi();await Us(t,e);const n=Bp(e);for(const r of n){const o=ut(r);if(o)try{t.get(o);}catch{}}}function aa(e){if(!Mo(e))return;const t=ut(e),n=Fp(e);t&&n&&(t.read=n),Rp(e);}async function Us(e,t){const n=jp.has(t),r=zp.has(t),o=Gp.has(t);if(!n&&!r&&!o)return;const i=ut("stateAtom");if(i)try{const a=e.get(i);if(!a||typeof a!="object")return;let s=null;if(n||r){const c=a.child,d=c?.data;if(c&&d&&typeof d=="object"){let l=null;if(n&&Array.isArray(d.userSlots)){const u=d.userSlots.map(p=>{if(!p||typeof p!="object")return p;const f=p,g=f.data,m=g&&typeof g=="object"?{...g}:g;return {...f,data:m}});l={...l??d,userSlots:u};}if(r&&d.shops&&typeof d.shops=="object"&&(l={...l??d,shops:{...d.shops}}),l){const u={...c,data:l};s={...a,child:u};}}}if(o){const c=a.data;if(c&&Array.isArray(c.players)){const d={...c,players:[...c.players]};s={...s??a,data:d};}}if(!s)return;await e.set(i,s);}catch{}}async function Kp(){for(const e of Object.keys(xi))await Nr(e);}let Gn=null,pn=null;async function Yp(){if(Or().initialized)return;pn=await de.select("activeModalAtom"),Gn=setInterval(async()=>{try{const n=await de.select("activeModalAtom"),r=pn;r!==n&&(pn=n,qp(n,r));}catch{}},50),Op(()=>{Gn&&(clearInterval(Gn),Gn=null);}),_p(true);}function qp(e,t){const n=Mt(),r=Tt();e===null&&t!==null&&(n&&r===t?Xp("native"):n||vi({modal:t,wasCustom:false,closedBy:"native"})),e!==null&&!n&&Hs({modal:e,isCustom:false});}async function Xp(e){const t=Tt();t&&(zs(),yi(false),bi(null),await Nr(t),vi({modal:t,wasCustom:true,closedBy:e}));}async function Jp(e,t){if(!Or().initialized)throw new Error("[MGCustomModal] Not initialized. Call init() first.");Mt()&&await Vs(),js(e,t),yi(true),bi(e),Up(e),await Vp(e),await hi.set(e),pn=e,Hs({modal:e,isCustom:true});}function Qp(e,t){const n=Or();if(!n.isCustom||n.activeModal!==e||!n.shadow)return;const o={...n.shadow.data,...t};js(e,o);}async function Vs(){const e=Or();if(!e.isCustom||!e.activeModal)return;const t=e.activeModal;zs(),yi(false),bi(null),await hi.set(null),pn=null,await Nr(t),vi({modal:t,wasCustom:true,closedBy:"api"});}function Zp(){return new Promise(e=>{if(!Mt()){e();return}const t=Gs(()=>{t(),e();});})}async function ef(){if(Mt()){const e=Tt();e&&await Nr(e);}await Kp(),Dp();}const fn={async init(){return Yp()},isReady(){return Lp()},async show(e,t){return Jp(e,t)},update(e,t){return Qp(e,t)},async close(){return Vs()},isOpen(){return Tt()!==null},isCustomOpen(){return Mt()},getActiveModal(){return Tt()},waitForClose(){return Zp()},onOpen(e){return $p(e)},onClose(e){return Gs(e)},async destroy(){return ef()}};function tf(){return {ready:false,app:null,renderer:null,ctors:null,baseUrl:null,textures:new Map,animations:new Map,live:new Set,defaultParent:null,overlay:null,categoryIndex:null}}function nf(){return {lru:new Map,cost:0,srcCanvas:new Map}}function rf(){return {cache:new Map,maxEntries:200}}const of={enabled:true,maxEntries:200,maxCost:800,srcCanvasMax:100},af={enabled:true,maxEntries:200},we=tf(),sf=nf(),lf={...of},cf=rf(),df={...af};function Te(){return we}function Ht(){return sf}function Sn(){return lf}function Cn(){return cf}function Lo(){return df}function Ks(){return we.ready}const sa=Function.prototype.bind,le={_bindPatched:false,engine:null,tos:null,app:null,renderer:null,ticker:null,stage:null};let Ys,qs,Xs;const uf=new Promise(e=>{Ys=e;}),pf=new Promise(e=>{qs=e;}),ff=new Promise(e=>{Xs=e;});function gf(e){return !!(e&&typeof e=="object"&&typeof e.start=="function"&&typeof e.destroy=="function"&&e.app&&e.app.stage&&e.app.renderer&&e.systems&&typeof e.systems.values=="function")}function mf(e){try{for(const t of e.systems.values()){const n=t?.system;if(n?.name==="tileObject")return n}}catch{}return null}function hf(e){le.engine=e,le.tos=mf(e)||null,le.app=e.app||null,le.renderer=e.app?.renderer||null,le.ticker=e.app?.ticker||null,le.stage=e.app?.stage||null;try{Ys(e);}catch{}try{le.app&&qs(le.app);}catch{}try{le.renderer&&Xs(le.renderer);}catch{}}function wi(){return le.engine?true:(le._bindPatched||(le._bindPatched=true,Function.prototype.bind=function(e,...t){const n=sa.call(this,e,...t);try{!le.engine&&gf(e)&&(Function.prototype.bind=sa,le._bindPatched=!1,hf(e));}catch{}return n}),false)}wi();async function bf(e=15e3){const t=performance.now();for(;performance.now()-t<e;){if(le.engine)return  true;wi(),await Fr(50);}throw new Error("MGPixiHooks: engine capture timeout")}async function yf(e=15e3){return le.engine||await bf(e),true}function vf(){return le.engine&&le.app?{ok:true,engine:le.engine,tos:le.tos,app:le.app}:(wi(),{ok:false,engine:le.engine,tos:le.tos,app:le.app,note:"Not captured. Wait for room, or reload."})}const Ue={engineReady:uf,appReady:pf,rendererReady:ff,engine:()=>le.engine,tos:()=>le.tos,app:()=>le.app,renderer:()=>le.renderer,ticker:()=>le.ticker,stage:()=>le.stage,PIXI:()=>L.PIXI||null,init:yf,hook:vf,ready:()=>!!le.engine};function Ar(e){const t=String(e||"").trim();return t?t.startsWith("sprite/")||t.startsWith("sprites/")?t:t.includes("/")?`sprite/${t}`:t:""}function Tn(e,t){const n=String(e||"").trim().replace(/^sprites?\//,"").replace(/^\/+|\/+$/g,""),r=String(t||"").trim();return r.includes("/")||!n?Ar(r):`sprite/${n}/${r}`}function An(e,t,n,r){const o=Tn(e,t);if(n.has(o)||r.has(o))return o;const i=String(t||"").trim();if(n.has(i)||r.has(i))return i;const a=Ar(i);return n.has(a)||r.has(a)?a:o}function xf(e,t,n=25e3){const r=[e],o=new Set;let i=0;for(;r.length&&i++<n;){const a=r.pop();if(!a||o.has(a))continue;if(o.add(a),t(a))return a;const s=a.children;if(Array.isArray(s))for(let c=s.length-1;c>=0;c--)r.push(s[c]);}return null}function wf(e){const t=L.PIXI;if(t?.Texture&&t?.Sprite&&t?.Container&&t?.Rectangle)return {Container:t.Container,Sprite:t.Sprite,Texture:t.Texture,Rectangle:t.Rectangle,AnimatedSprite:t.AnimatedSprite||null};const n=e?.stage,r=xf(n,o=>o?.texture?.frame&&o?.constructor&&o?.texture?.constructor&&o?.texture?.frame?.constructor);if(!r)throw new Error("No Sprite found yet (constructors).");return {Container:n.constructor,Sprite:r.constructor,Texture:r.texture.constructor,Rectangle:r.texture.frame.constructor,AnimatedSprite:t?.AnimatedSprite||null}}async function kf(e,t=15e3){const n=performance.now();for(;performance.now()-n<t;)try{return wf(e)}catch{await Fr(50);}throw new Error("Constructors timeout")}const bt=(...e)=>{try{console.log("[MGSprite]",...e);}catch{}};function Sf(e){return e&&typeof e=="object"&&e.frames&&e.meta&&typeof e.meta.image=="string"}function Qr(e,t,n,r,o){return new e(t,n,r,o)}function Cf(e,t,n,r,o,i,a){let s;try{s=new e({source:t.source,frame:n,orig:r,trim:o||void 0,rotate:i||0});}catch{s=new e(t.baseTexture||t,n,r,o||void 0,i||0);}if(a)if(s.defaultAnchor?.set)try{s.defaultAnchor.set(a.x,a.y);}catch{}else s.defaultAnchor?(s.defaultAnchor.x=a.x,s.defaultAnchor.y=a.y):s.defaultAnchor={x:a.x,y:a.y};try{s.updateUvs?.();}catch{}return s}function Af(e,t,n,r){const{Texture:o,Rectangle:i}=r;for(const[a,s]of Object.entries(e.frames)){const c=s.frame,d=!!s.rotated,l=d?2:0,u=d?c.h:c.w,p=d?c.w:c.h,f=Qr(i,c.x,c.y,u,p),g=s.sourceSize||{w:c.w,h:c.h},m=Qr(i,0,0,g.w,g.h);let h=null;if(s.trimmed&&s.spriteSourceSize){const y=s.spriteSourceSize;h=Qr(i,y.x,y.y,y.w,y.h);}n.set(a,Cf(o,t,f,m,h,l,s.anchor||null));}}function If(e,t,n){if(!(!e.animations||typeof e.animations!="object"))for(const[r,o]of Object.entries(e.animations)){if(!Array.isArray(o))continue;const i=o.map(a=>t.get(a)).filter(Boolean);i.length>=2&&n.set(r,i);}}function Tf(e,t){const n=(r,o)=>{const i=String(r||"").trim(),a=String(o||"").trim();!i||!a||(t.has(i)||t.set(i,new Set),t.get(i).add(a));};for(const r of Object.keys(e.frames||{})){const o=/^sprite\/([^/]+)\/(.+)$/.exec(r);o&&n(o[1],o[2]);}}async function Pf(e,t){const n=await dt.load({baseUrl:e}),r=dt.getBundle(n,"default");if(!r)throw new Error("No default bundle in manifest");const o=dt.listJsonFromBundle(r),i=new Set,a=new Map,s=new Map,c=new Map;async function d(l){if(i.has(l))return;i.add(l);const u=await ui(at(e,l));if(!Sf(u))return;const p=u.meta?.related_multi_packs;if(Array.isArray(p))for(const h of p)await d(Ji(l,h));const f=Ji(l,u.meta.image),g=await gu(await ks(at(e,f))),m=t.Texture.from(g);Af(u,m,a,t),If(u,a,s),Tf(u,c);}for(const l of o)await d(l);return {textures:a,animations:s,categoryIndex:c}}let Hn=null;async function Ef(){return we.ready?true:Hn||(Hn=(async()=>{const e=performance.now();bt("init start");const t=await Xi(Ue.appReady,15e3,"PIXI app");bt("app ready");const n=await Xi(Ue.rendererReady,15e3,"PIXI renderer");bt("renderer ready"),we.app=t,we.renderer=n||t?.renderer||null,we.ctors=await kf(t),bt("constructors resolved"),we.baseUrl=await Vt.base(),bt("base url",we.baseUrl);const{textures:r,animations:o,categoryIndex:i}=await Pf(we.baseUrl,we.ctors);return we.textures=r,we.animations=o,we.categoryIndex=i,bt("atlases loaded","textures",we.textures.size,"animations",we.animations.size,"categories",we.categoryIndex?.size??0),we.ready=true,bt("ready in",Math.round(performance.now()-e),"ms"),true})(),Hn)}const Wt={Gold:{overlayTall:null,tallIconOverride:null},Rainbow:{overlayTall:null,tallIconOverride:null,angle:130,angleTall:0},Wet:{overlayTall:"sprite/mutation-overlay/WetTallPlant",tallIconOverride:"sprite/mutation/Puddle"},Chilled:{overlayTall:"sprite/mutation-overlay/ChilledTallPlant",tallIconOverride:null},Frozen:{overlayTall:"sprite/mutation-overlay/FrozenTallPlant",tallIconOverride:null},Dawnlit:{overlayTall:null,tallIconOverride:null},Ambershine:{overlayTall:null,tallIconOverride:null},Dawncharged:{overlayTall:null,tallIconOverride:null},Ambercharged:{overlayTall:null,tallIconOverride:null}},Js=Object.keys(Wt),Mf=["Gold","Rainbow","Wet","Chilled","Frozen","Ambershine","Dawnlit","Dawncharged","Ambercharged"],la=new Map(Mf.map((e,t)=>[e,t]));function Ir(e){return [...new Set(e.filter(Boolean))].sort((n,r)=>(la.get(n)??1/0)-(la.get(r)??1/0))}const Lf=["Wet","Chilled","Frozen"],_f=new Set(["Dawnlit","Ambershine","Dawncharged","Ambercharged"]),Ff={Banana:.6,Carrot:.6,Sunflower:.5,Starweaver:.5,FavaBean:.25,BurrosTail:.2},Rf={Pepper:.5,Banana:.6},Of=256,Nf=.5,$f=2;function Qs(e){if(!e.length)return {muts:[],overlayMuts:[],selectedMuts:[],sig:""};const t=Ir(e),n=Df(e),r=Bf(e);return {muts:n,overlayMuts:r,selectedMuts:t,sig:`${t.join(",")}|${n.join(",")}|${r.join(",")}`}}function Df(e){const t=e.filter((o,i,a)=>Wt[o]&&a.indexOf(o)===i);if(!t.length)return [];if(t.includes("Gold"))return ["Gold"];if(t.includes("Rainbow"))return ["Rainbow"];const n=["Ambershine","Dawnlit","Dawncharged","Ambercharged"];return t.some(o=>n.includes(o))?Ir(t.filter(o=>!Lf.includes(o))):Ir(t)}function Bf(e){const t=e.filter((n,r,o)=>Wt[n]?.overlayTall&&o.indexOf(n)===r);return Ir(t)}function Zr(e,t){return e.map(n=>({name:n,meta:Wt[n],overlayTall:Wt[n]?.overlayTall??null,isTall:t}))}const jf={Gold:{op:"source-atop",colors:["rgb(235,200,0)"],a:.7},Rainbow:{op:"color",colors:["#FF1744","#FF9100","#FFEA00","#00E676","#2979FF","#D500F9"],ang:130,angTall:0,masked:true},Wet:{op:"source-atop",colors:["rgb(50,180,200)"],a:.25},Chilled:{op:"source-atop",colors:["rgb(100,160,210)"],a:.45},Frozen:{op:"source-atop",colors:["rgb(100,130,220)"],a:.5},Dawnlit:{op:"source-atop",colors:["rgb(209,70,231)"],a:.5},Ambershine:{op:"source-atop",colors:["rgb(190,100,40)"],a:.5},Dawncharged:{op:"source-atop",colors:["rgb(140,80,200)"],a:.5},Ambercharged:{op:"source-atop",colors:["rgb(170,60,25)"],a:.5}},Wn=(()=>{try{const t=document.createElement("canvas").getContext("2d");if(!t)return new Set;const n=["color","hue","saturation","luminosity","overlay","screen","lighter","source-atop"],r=new Set;for(const o of n)t.globalCompositeOperation=o,t.globalCompositeOperation===o&&r.add(o);return r}catch{return new Set}})();function zf(e){return Wn.has(e)?e:Wn.has("overlay")?"overlay":Wn.has("screen")?"screen":Wn.has("lighter")?"lighter":"source-atop"}function Gf(e,t,n,r,o=false){const i=(r-90)*Math.PI/180,a=t/2,s=n/2;if(!o){const u=Math.min(t,n)/2;return e.createLinearGradient(a-Math.cos(i)*u,s-Math.sin(i)*u,a+Math.cos(i)*u,s+Math.sin(i)*u)}const c=Math.cos(i),d=Math.sin(i),l=Math.abs(c)*t/2+Math.abs(d)*n/2;return e.createLinearGradient(a-c*l,s-d*l,a+c*l,s+d*l)}function ca(e,t,n,r,o=false){const i=r.colors?.length?r.colors:["#fff"],a=r.ang!=null?Gf(e,t,n,r.ang,o):e.createLinearGradient(0,0,0,n);i.length===1?(a.addColorStop(0,i[0]),a.addColorStop(1,i[0])):i.forEach((s,c)=>a.addColorStop(c/(i.length-1),s)),e.fillStyle=a,e.fillRect(0,0,t,n);}function Hf(e,t,n,r){const o=jf[n];if(!o)return;const i={...o};n==="Rainbow"&&r&&i.angTall!=null&&(i.ang=i.angTall);const a=n==="Rainbow"&&r,s=t.width,c=t.height;e.save();const d=i.masked?zf(i.op):"source-in";if(e.globalCompositeOperation=d,i.a!=null&&(e.globalAlpha=i.a),i.masked){const l=document.createElement("canvas");l.width=s,l.height=c;const u=l.getContext("2d");u.imageSmoothingEnabled=false,ca(u,s,c,i,a),u.globalCompositeOperation="destination-in",u.drawImage(t,0,0),e.drawImage(l,0,0);}else ca(e,s,c,i,a);e.restore();}function Wf(e){return /tallplant/i.test(e)}function ki(e){const t=String(e||"").split("/");return t[t.length-1]||""}function Zs(e){switch(e){case "Ambershine":return ["Ambershine","Amberlit"];case "Dawncharged":return ["Dawncharged","Dawnbound"];case "Ambercharged":return ["Ambercharged","Amberbound"];default:return [e]}}function Uf(e,t){const n=String(e||"").toLowerCase();for(const r of t.keys()){const o=/sprite\/mutation-overlay\/([A-Za-z0-9]+)TallPlant/i.exec(String(r));if(!o||!o[1])continue;if(o[1].toLowerCase()===n){const a=t.get(r);if(a)return {tex:a,key:r}}}return null}function Vf(e,t,n,r){if(!t)return null;const o=ki(e),i=Zs(t);for(const a of i){const s=[`sprite/mutation/${a}${o}`,`sprite/mutation/${a}-${o}`,`sprite/mutation/${a}_${o}`,`sprite/mutation/${a}/${o}`,`sprite/mutation/${a}`];for(const c of s){const d=n.get(c);if(d)return {tex:d,key:c}}{const c=`sprite/mutation-overlay/${a}TallPlant`,d=n.get(c);if(d)return {tex:d,key:c};const l=`sprite/mutation-overlay/${a}`,u=n.get(l);if(u)return {tex:u,key:l};const p=Uf(t,n);if(p)return p}}return null}function Kf(e,t,n,r){if(!t)return null;const o=Wt[t];if(n&&o?.tallIconOverride){const s=r.get(o.tallIconOverride);if(s)return s}const i=ki(e),a=Zs(t);for(const s of a){const c=[`sprite/mutation/${s}Icon`,`sprite/mutation/${s}`,`sprite/mutation/${s}${i}`,`sprite/mutation/${s}-${i}`,`sprite/mutation/${s}_${i}`,`sprite/mutation/${s}/${i}`];for(const d of c){const l=r.get(d);if(l)return l}if(n){const d=`sprite/mutation-overlay/${s}TallPlantIcon`,l=r.get(d);if(l)return l;const u=`sprite/mutation-overlay/${s}TallPlant`,p=r.get(u);if(p)return p}}return null}function Yf(e,t,n){const r=e?.orig?.width??e?.frame?.width??e?.width??1,o=e?.orig?.height??e?.frame?.height??e?.height??1,i=e?.defaultAnchor?.x??0,a=e?.defaultAnchor?.y??0;let s=Rf[t]??i;const c=o>r*1.5;let d=Ff[t]??(c?a:.4);const l={x:(s-i)*r,y:(d-a)*o},u=Math.min(r,o),p=Math.min(1.5,u/Of);let f=Nf*p;return n&&(f*=$f),{width:r,height:o,anchorX:i,anchorY:a,offset:l,iconScale:f}}function el(e,t){return `${t.sig}::${e}`}function tl(e){return e?e.isAnim?e.frames?.length||0:e.tex?1:0:0}function qf(e,t,n){e.lru.delete(t),e.lru.set(t,n);}function Xf(e,t){if(t.enabled)for(;e.lru.size>t.maxEntries||e.cost>t.maxCost;){const n=e.lru.keys().next().value;if(n===void 0)break;const r=e.lru.get(n);e.lru.delete(n),e.cost=Math.max(0,e.cost-tl(r??null));}}function nl(e,t){const n=e.lru.get(t);return n?(qf(e,t,n),n):null}function rl(e,t,n,r){e.lru.set(t,n),e.cost+=tl(n),Xf(e,r);}function Jf(e){e.lru.clear(),e.cost=0,e.srcCanvas.clear();}function Qf(e,t){return e.srcCanvas.get(t)??null}function Zf(e,t,n,r){if(e.srcCanvas.set(t,n),e.srcCanvas.size>r.srcCanvasMax){const o=e.srcCanvas.keys().next().value;o!==void 0&&e.srcCanvas.delete(o);}}function $r(e,t,n,r,o){const i=Qf(r,e);if(i)return i;let a=null;const s=t?.resolution??1;try{if(t?.extract?.canvas){const c=new n.Sprite(e),d=t.extract.canvas(c);if(c.destroy?.({children:!0,texture:!1,baseTexture:!1}),s>1&&d){const l=Math.round(d.width/s),u=Math.round(d.height/s);a=document.createElement("canvas"),a.width=l,a.height=u;const p=a.getContext("2d");p&&(p.imageSmoothingEnabled=!1,p.drawImage(d,0,0,l,u));}else a=d;}}catch{}if(!a){const c=e?.frame||e?._frame,d=e?.orig||e?._orig,l=e?.trim||e?._trim,u=e?.rotate||e?._rotate||0,p=e?.baseTexture?.resource?.source||e?.baseTexture?.resource||e?.source?.resource?.source||e?.source?.resource||e?._source?.resource?.source||null;if(!c||!p)throw new Error("textureToCanvas fail");a=document.createElement("canvas");const f=Math.max(1,(d?.width??c.width)|0),g=Math.max(1,(d?.height??c.height)|0),m=l?.x??0,h=l?.y??0;a.width=f,a.height=g;const y=a.getContext("2d");y.imageSmoothingEnabled=false,u===true||u===2||u===8?(y.save(),y.translate(m+c.height/2,h+c.width/2),y.rotate(-Math.PI/2),y.drawImage(p,c.x,c.y,c.width,c.height,-c.width/2,-c.height/2,c.width,c.height),y.restore()):y.drawImage(p,c.x,c.y,c.width,c.height,m,h,c.width,c.height);}return Zf(r,e,a,o),a}function eg(e,t,n,r,o,i,a,s){const{w:c,h:d,aX:l,aY:u,basePos:p}=t,f=[];for(const g of n){const m=new r.Sprite(e);m.anchor?.set?.(l,u),m.position.set(p.x,p.y),m.zIndex=1;const h=document.createElement("canvas");h.width=c,h.height=d;const y=h.getContext("2d");y.imageSmoothingEnabled=false,y.save(),y.translate(c*l,d*u),y.drawImage($r(e,o,r,i,a),-c*l,-d*u),y.restore(),Hf(y,h,g.name,g.isTall);const S=r.Texture.from(h,{resolution:e.resolution??1});s.push(S),m.texture=S,f.push(m);}return f}function tg(e,t,n,r,o,i,a,s,c,d){const{aX:l,basePos:u}=t,p=[];for(const f of n){const g=f.overlayTall&&r.get(f.overlayTall)&&{tex:r.get(f.overlayTall),key:f.overlayTall}||Vf(e,f.name,r);if(!g?.tex)continue;const m=$r(g.tex,i,o,a,s);if(!m)continue;const h=m.width,y={x:0,y:0},S={x:u.x-l*h,y:0},w=document.createElement("canvas");w.width=h,w.height=m.height;const x=w.getContext("2d");if(!x)continue;x.imageSmoothingEnabled=false,x.drawImage(m,0,0),x.globalCompositeOperation="destination-in",x.drawImage(c,-S.x,-0);const I=o.Texture.from(w,{resolution:g.tex.resolution??1});d.push(I);const v=new o.Sprite(I);v.anchor?.set?.(y.x,y.y),v.position.set(S.x,S.y),v.scale.set(1),v.alpha=1,v.zIndex=3,p.push(v);}return p}function ng(e,t,n,r,o,i){const{basePos:a}=t,s=[];for(const c of n){if(c.name==="Gold"||c.name==="Rainbow")continue;const d=Kf(e,c.name,c.isTall,r);if(!d)continue;const l=new o.Sprite(d),u=d?.defaultAnchor?.x??.5,p=d?.defaultAnchor?.y??.5;l.anchor?.set?.(u,p),l.position.set(a.x+i.offset.x,a.y+i.offset.y),l.scale.set(i.iconScale),c.isTall&&(l.zIndex=-1),_f.has(c.name)&&(l.zIndex=10),l.zIndex||(l.zIndex=2),s.push(l);}return s}function ol(e,t,n,r){try{if(!e||!r.renderer||!r.ctors?.Container||!r.ctors?.Sprite||!r.ctors?.Texture)return null;const{Container:o,Sprite:i,Texture:a}=r.ctors,s=e?.orig?.width??e?.frame?.width??e?.width??1,c=e?.orig?.height??e?.frame?.height??e?.height??1,d=e?.defaultAnchor?.x??.5,l=e?.defaultAnchor?.y??.5,u={x:s*d,y:c*l},p=$r(e,r.renderer,r.ctors,r.cacheState,r.cacheConfig),f=new o;f.sortableChildren=!0;const g=new i(e);g.anchor?.set?.(d,l),g.position.set(u.x,u.y),g.zIndex=0,f.addChild(g);const m=Wf(t),h=Zr(n.muts,m),y=Zr(n.overlayMuts,m),S=Zr(n.selectedMuts,m),w=[],x={w:s,h:c,aX:d,aY:l,basePos:u},I=ki(t),v=Yf(e,I,m);eg(e,x,h,r.ctors,r.renderer,r.cacheState,r.cacheConfig,w).forEach(B=>f.addChild(B)),m&&tg(t,x,y,r.textures,r.ctors,r.renderer,r.cacheState,r.cacheConfig,p,w).forEach(V=>f.addChild(V)),ng(t,x,S,r.textures,r.ctors,v).forEach(B=>f.addChild(B));let k={x:0,y:0,width:s,height:c};try{const B=f.getLocalBounds?.()||f.getBounds?.(!0);B&&Number.isFinite(B.width)&&Number.isFinite(B.height)&&(k={x:B.x,y:B.y,width:B.width,height:B.height});}catch{}const{Rectangle:P}=r.ctors,E=P?new P(0,0,s,c):void 0;let O=null;if(typeof r.renderer.generateTexture=="function"?O=r.renderer.generateTexture(f,{resolution:1,region:E}):r.renderer.textureGenerator?.generateTexture&&(O=r.renderer.textureGenerator.generateTexture({target:f,resolution:1,region:E})),!O)throw new Error("no render texture");const ee=O instanceof a?O:a.from(r.renderer.extract.canvas(O));try{ee.__mg_base={baseX:-k.x,baseY:-k.y,baseW:s,baseH:c,texW:k.width,texH:k.height};}catch{}O&&O!==ee&&O.destroy?.(!0),f.destroy({children:!0,texture:!1,baseTexture:!1});try{ee.__mg_gen=!0,ee.label=`${t}|${n.sig}`;}catch{}return ee}catch{return null}}function rg(e,t,n,r){if(!e||e.length<2)return null;const o=[];for(const i of e){const a=ol(i,t,n,r);a&&o.push(a);}return o.length>=2?o:null}function il(e,t,n,r,o){const i=t.scale??1,a=t.frameIndex??0,s=t.mutations?.slice().sort().join(",")||"",c=t.anchorX??.5,d=t.anchorY??.5;return `${e}|s${i}|f${a}|m${s}|ax${c}|ay${d}|bm${n}|bp${o}|p${r}`}function og(e,t){const n=e.cache.get(t);return n?(n.lastAccess=performance.now(),n.canvas):null}function ig(e,t,n,r){if(t.enabled){if(e.cache.size>=t.maxEntries){let o=null,i=1/0;for(const[a,s]of e.cache)s.lastAccess<i&&(i=s.lastAccess,o=a);o&&e.cache.delete(o);}e.cache.set(n,{canvas:r,lastAccess:performance.now()});}}function da(e){const t=document.createElement("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");return n&&n.drawImage(e,0,0),t}function ag(e){e.cache.clear();}function sg(e){return {size:e.cache.size,maxEntries:e.maxEntries}}function lg(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0);})}async function cg(e,t,n,r,o,i,a,s=5,c=0){if(!t.ready||!i.enabled)return 0;const d=e.length;let l=0;a?.(0,d);for(let u=0;u<d;u+=s){const p=e.slice(u,u+s);for(const f of p)try{const g=An(null,f,t.textures,t.animations),m={scale:1},h=sl(m),y=ll(h,m),S=dl(h,m.boundsPadding),w=il(g,m,h,y,S);o.cache.has(w)||_o(t,n,r,null,f,m,o,i),l++;}catch{l++;}a?.(l,d),u+s<d&&await lg();}return l}function dg(e){if(e.overlay)return e.overlay;const t=new e.ctors.Container;t.sortableChildren=true,t.zIndex=99999999;try{e.app.stage.sortableChildren=!0;}catch{}return e.app.stage.addChild(t),e.overlay=t,t}function ug(e){const t=e.defaultParent;if(!t)return null;try{return typeof t=="function"?t():t}catch{return null}}function Si(e,t,n,r,o,i){if(!n.length)return t;const a=Qs(n);if(!a.sig)return t;const s=el(e,a),c=nl(o,s);if(c?.tex)return c.tex;const d=ol(t,e,a,{renderer:r.renderer,ctors:r.ctors,textures:r.textures,cacheState:o,cacheConfig:i});return d?(rl(o,s,{isAnim:false,tex:d},i),d):t}function al(e,t,n,r,o,i){if(!n.length)return t;const a=Qs(n);if(!a.sig)return t;const s=el(e,a),c=nl(o,s);if(c?.isAnim&&c.frames?.length)return c.frames;const d=rg(t,e,a,{renderer:r.renderer,ctors:r.ctors,textures:r.textures,cacheState:o,cacheConfig:i});return d?(rl(o,s,{isAnim:true,frames:d},i),d):t}function ua(e,t,n,r,o,i={}){if(!e.ready)throw new Error("MGSprite not ready yet");const a=An(r,o,e.textures,e.animations),s=i.mutations||[],c=i.parent||ug(e)||dg(e),d=e.renderer?.width||e.renderer?.view?.width||innerWidth,l=e.renderer?.height||e.renderer?.view?.height||innerHeight,u=i.center?d/2:i.x??d/2,p=i.center?l/2:i.y??l/2;let f;const g=e.animations.get(a);if(g&&g.length>=2){const y=al(a,g,s,e,t,n),S=e.ctors.AnimatedSprite;if(S)f=new S(y),f.animationSpeed=i.fps?i.fps/60:i.speed??.15,f.loop=i.loop??true,f.play();else {const w=new e.ctors.Sprite(y[0]),I=1e3/Math.max(1,i.fps||8);let v=0,C=0;const T=k=>{const P=e.app.ticker?.deltaMS??k*16.666666666666668;if(v+=P,v<I)return;const E=v/I|0;v%=I,C=(C+E)%y.length,w.texture=y[C];};w.__mgTick=T,e.app.ticker?.add?.(T),f=w;}}else {const y=e.textures.get(a);if(!y)throw new Error(`Unknown sprite/anim key: ${a}`);const S=Si(a,y,s,e,t,n);f=new e.ctors.Sprite(S);}const m=i.anchorX??f.texture?.defaultAnchor?.x??.5,h=i.anchorY??f.texture?.defaultAnchor?.y??.5;return f.anchor?.set?.(m,h),f.position.set(u,p),f.scale.set(i.scale??1),f.alpha=i.alpha??1,f.rotation=i.rotation??0,f.zIndex=i.zIndex??999999,c.addChild(f),e.live.add(f),f.__mgDestroy=()=>{try{f.__mgTick&&e.app.ticker?.remove?.(f.__mgTick);}catch{}try{f.destroy?.({children:!0,texture:!1,baseTexture:!1});}catch{try{f.destroy?.();}catch{}}e.live.delete(f);},f}function pg(e,t){const n=e.renderer;if(n?.extract?.canvas)return n.extract.canvas(t);if(n?.plugins?.extract?.canvas)return n.plugins.extract.canvas(t);throw new Error("No extract.canvas available on renderer")}const pa=new Map;function sl(e){return e.boundsMode?e.boundsMode:e.mutations&&e.mutations.length>0?"base":"mutations"}function ll(e,t){return e==="mutations"?t.pad??2:t.pad??0}function Qt(e){return Number.isFinite(e)?Math.max(0,e):0}function cl(e){if(typeof e=="number"){const t=Qt(e);return {top:t,right:t,bottom:t,left:t}}return e?{top:Qt(e.top??0),right:Qt(e.right??0),bottom:Qt(e.bottom??0),left:Qt(e.left??0)}:{top:0,right:0,bottom:0,left:0}}function dl(e,t){if(e==="mutations")return "0,0,0,0";if(e==="padded"&&t==null)return "auto";const n=cl(t);return `${n.top},${n.right},${n.bottom},${n.left}`}function ul(e){const t=e?.orig?.width??e?.frame?.width??e?.width??1,n=e?.orig?.height??e?.frame?.height??e?.height??1;return {w:t,h:n}}function pl(e,t,n){const r=e?.__mg_base;return r&&Number.isFinite(r.baseX)&&Number.isFinite(r.baseY)&&Number.isFinite(r.baseW)&&Number.isFinite(r.baseH)&&Number.isFinite(r.texW)&&Number.isFinite(r.texH)?r:{baseX:0,baseY:0,baseW:t,baseH:n,texW:t,texH:n}}function fg(e,t,n,r,o,i){const a=`${e}|f${t}`,s=pa.get(a);if(s)return s;const c=ul(n),d={top:0,right:0,bottom:0,left:0};for(const l of Js){const u=Si(e,n,[l],r,o,i),p=pl(u,c.w,c.h),f=Math.max(0,p.baseX),g=Math.max(0,p.baseY),m=Math.max(0,p.texW-p.baseX-p.baseW),h=Math.max(0,p.texH-p.baseY-p.baseH);f>d.left&&(d.left=f),g>d.top&&(d.top=g),m>d.right&&(d.right=m),h>d.bottom&&(d.bottom=h);}return pa.set(a,d),d}function _o(e,t,n,r,o,i={},a,s){if(!e.ready)throw new Error("MGSprite not ready yet");const c=An(r,o,e.textures,e.animations),d=sl(i),l=ll(d,i),u=dl(d,i.boundsPadding),p=a&&s?.enabled?il(c,i,d,l,u):null;if(p&&a&&s?.enabled){const w=og(a,p);if(w)return da(w)}const f=i.mutations||[],g=e.animations.get(c),m=Math.max(0,(i.frameIndex??0)|0);let h,y;if(g?.length)if(h=g[m%g.length],f.length){const w=al(c,g,f,e,t,n);y=w[m%w.length];}else y=h;else {const w=e.textures.get(c);if(!w)throw new Error(`Unknown sprite/anim key: ${c}`);h=w,y=Si(c,w,f,e,t,n);}let S;if(d==="mutations"){const w=new e.ctors.Sprite(y),x=i.anchorX??w.texture?.defaultAnchor?.x??.5,I=i.anchorY??w.texture?.defaultAnchor?.y??.5;w.anchor?.set?.(x,I),w.scale.set(i.scale??1);const v=new e.ctors.Container;v.addChild(w);try{v.updateTransform?.();}catch{}const C=w.getBounds?.(true)||{x:0,y:0,width:w.width,height:w.height};w.position.set(-C.x+l,-C.y+l),S=pg(e,v);try{v.destroy?.({children:!0});}catch{}}else {const w=i.scale??1;let x=cl(i.boundsPadding);d==="padded"&&i.boundsPadding==null&&(x=fg(c,m,h,e,t,n)),l&&(x={top:x.top+l,right:x.right+l,bottom:x.bottom+l,left:x.left+l});const I=ul(h),v=pl(y,I.w,I.h),C=Math.max(1,Math.ceil((I.w+x.left+x.right)*w)),T=Math.max(1,Math.ceil((I.h+x.top+x.bottom)*w));S=document.createElement("canvas"),S.width=C,S.height=T;const k=S.getContext("2d");if(k){k.imageSmoothingEnabled=false;const P=$r(y,e.renderer,e.ctors,t,n),E=(x.left-v.baseX)*w,O=(x.top-v.baseY)*w;k.drawImage(P,E,O,P.width*w,P.height*w);}}return p&&a&&s?.enabled?(ig(a,s,p,S),da(S)):S}function gg(e){for(const t of Array.from(e.live))t.__mgDestroy?.();}function mg(e,t){return e.defaultParent=t,true}function hg(e,t){return e.defaultParent=t,true}function Lt(){if(!Ks())throw new Error("MGSprite not ready yet")}function bg(e,t,n){return typeof t=="string"?ua(Te(),Ht(),Sn(),e,t,n||{}):ua(Te(),Ht(),Sn(),null,e,t||{})}function yg(e,t,n){return typeof t=="string"?_o(Te(),Ht(),Sn(),e,t,n||{},Cn(),Lo()):_o(Te(),Ht(),Sn(),null,e,t||{},Cn(),Lo())}function vg(){gg(Te());}function xg(e){return mg(Te(),e)}function wg(e){return hg(Te(),e)}function kg(e,t){const n=Te(),r=typeof t=="string"?An(e,t,n.textures,n.animations):An(null,e,n.textures,n.animations);return n.textures.has(r)||n.animations.has(r)}function Sg(){Lt();const e=Te().categoryIndex;return e?Array.from(e.keys()).sort((t,n)=>t.localeCompare(n)):[]}function Cg(e){Lt();const t=String(e||"").trim();if(!t)return [];const n=Te().categoryIndex;return n?Array.from(n.get(t)?.values()||[]):[]}function Ag(e,t){Lt();const n=String(e||"").trim(),r=String(t||"").trim();if(!n||!r)return  false;const o=Te().categoryIndex;if(!o)return  false;const i=n.toLowerCase(),a=r.toLowerCase();for(const[s,c]of o.entries())if(s.toLowerCase()===i){for(const d of c.values())if(d.toLowerCase()===a)return  true}return  false}function Ig(e){Lt();const t=Te().categoryIndex;if(!t)return [];const n=String(e||"").trim().toLowerCase(),r=[];for(const[o,i]of t.entries())for(const a of i.values()){const s=Tn(o,a);(!n||s.toLowerCase().startsWith(n))&&r.push(s);}return r.sort((o,i)=>o.localeCompare(i))}function Tg(e){Lt();const t=String(e||"").trim();if(!t)return null;const n=Ar(t),r=/^sprite\/([^/]+)\/(.+)$/.exec(n);if(!r)return null;const o=r[1],i=r[2],a=Te().categoryIndex,s=o.toLowerCase(),c=i.toLowerCase();let d=o,l=i;if(a){const u=Array.from(a.keys()).find(g=>g.toLowerCase()===s);if(!u)return null;d=u;const p=a.get(u);if(!p)return null;const f=Array.from(p.values()).find(g=>g.toLowerCase()===c);if(!f)return null;l=f;}return {category:d,id:l,key:Tn(d,l)}}function Pg(e,t){Lt();const n=String(e||"").trim(),r=String(t||"").trim();if(!n||!r)throw new Error("getIdPath(category, id) requires both category and id");const o=Te().categoryIndex;if(!o)throw new Error("Sprite categories not indexed");const i=n.toLowerCase(),a=r.toLowerCase(),s=Array.from(o.keys()).find(l=>l.toLowerCase()===i)||n,c=o.get(s);if(!c)throw new Error(`Unknown sprite category: ${n}`);const d=Array.from(c.values()).find(l=>l.toLowerCase()===a)||r;if(!c.has(d))throw new Error(`Unknown sprite id: ${n}/${r}`);return Tn(s,d)}function Eg(){Jf(Ht());}function Mg(){ag(Cn());}function Lg(){return sg(Cn())}function _g(){return [...Js]}async function Fg(e,t,n=10,r=0){return Lt(),cg(e,Te(),Ht(),Sn(),Cn(),Lo(),t,n,r)}const ie={init:Ef,isReady:Ks,show:bg,toCanvas:yg,clear:vg,attach:xg,attachProvider:wg,has:kg,key:(e,t)=>Tn(e,t),getCategories:Sg,getCategoryId:Cg,hasId:Ag,listIds:Ig,getIdInfo:Tg,getIdPath:Pg,clearMutationCache:Eg,clearToCanvasCache:Mg,getToCanvasCacheStats:Lg,getMutationNames:_g,warmup:Fg};function Rg(){return {ready:false,xform:null,xformAt:0}}const De=Rg();function fl(){return De.ready}function Yt(e){try{if(typeof structuredClone=="function")return structuredClone(e)}catch{}try{return JSON.parse(JSON.stringify(e))}catch{}return e}function Pn(){return Ue.tos()}function Ci(){return Ue.engine()}function Og(){const e=Pn()?.map?.cols;return Number.isFinite(e)&&e>0?e:null}function Ai(e,t){const n=Og();return n?t*n+e|0:null}let Un=null;async function Ng(e=15e3){return De.ready?true:Un||(Un=(async()=>{if(await Ue.init(e),!Pn())throw new Error("MGTile: engine captured but tileObject system not found");return De.ready=true,true})(),Un)}function At(e,t,n=true){const r=Pn(),o=Ai(e,t);if(!r||o==null)return {gidx:null,tv:null};let i=r.tileViews?.get?.(o)||null;if(!i&&n&&typeof r.getOrCreateTileView=="function")try{i=r.getOrCreateTileView(o);}catch{}return {gidx:o,tv:i||null}}function eo(e,t){if("startTime"in t&&(e.startTime=Number(t.startTime)),"endTime"in t&&(e.endTime=Number(t.endTime)),"targetScale"in t&&(e.targetScale=Number(t.targetScale)),"mutations"in t){if(!Array.isArray(t.mutations))throw new Error("MGTile: mutations must be an array of strings");e.mutations=t.mutations.slice();}}function Ii(e,t){if(!e)throw new Error("MGTile: no tileObject on this tile");if(e.objectType!==t)throw new Error(`MGTile: expected objectType "${t}", got "${e.objectType}"`)}function Bt(e,t,n,r={}){const o=r.ensureView!==false,i=r.forceUpdate!==false,a=Ci(),{gidx:s,tv:c}=At(Number(e),Number(t),o);if(s==null)throw new Error("MGTile: cols unavailable (engine/TOS not ready)");if(!c)throw new Error("MGTile: TileView unavailable (not instantiated)");const d=c.tileObject;if(typeof c.onDataChanged!="function")throw new Error("MGTile: tileView.onDataChanged not found (different API?)");if(c.onDataChanged(n),i&&a?.reusableContext&&typeof c.update=="function")try{c.update(a.reusableContext);}catch{}return {ok:true,tx:Number(e),ty:Number(t),gidx:s,before:d,after:c.tileObject}}function Dr(e,t,n={}){const r=n.ensureView!==false,o=n.clone!==false,{gidx:i,tv:a}=At(Number(e),Number(t),r);if(i==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!a)return {tx:Number(e),ty:Number(t),gidx:i,tileView:null,tileObject:void 0};const s=a.tileObject;return {tx:Number(e),ty:Number(t),gidx:i,tileView:a,tileObject:o?Yt(s):s}}function $g(e,t,n={}){return Bt(e,t,null,n)}function Dg(e,t,n,r={}){const i=Dr(e,t,{...r,clone:false}).tileView?.tileObject;Ii(i,"plant");const a=Yt(i);if(Array.isArray(a.slots)||(a.slots=[]),"plantedAt"in n&&(a.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(a.maturedAt=Number(n.maturedAt)),"species"in n&&(a.species=String(n.species)),"slotIdx"in n&&"slotPatch"in n){const s=Number(n.slotIdx)|0;if(!a.slots[s])throw new Error(`MGTile: plant slot ${s} doesn't exist`);return eo(a.slots[s],n.slotPatch),Bt(e,t,a,r)}if("slots"in n){const s=n.slots;if(Array.isArray(s)){for(let c=0;c<s.length;c++)if(s[c]!=null){if(!a.slots[c])throw new Error(`MGTile: plant slot ${c} doesn't exist`);eo(a.slots[c],s[c]);}}else if(s&&typeof s=="object")for(const c of Object.keys(s)){const d=Number(c)|0;if(Number.isFinite(d)){if(!a.slots[d])throw new Error(`MGTile: plant slot ${d} doesn't exist`);eo(a.slots[d],s[d]);}}else throw new Error("MGTile: patch.slots must be array or object map");return Bt(e,t,a,r)}return Bt(e,t,a,r)}function Bg(e,t,n,r={}){const i=Dr(e,t,{...r,clone:false}).tileView?.tileObject;Ii(i,"decor");const a=Yt(i);return "rotation"in n&&(a.rotation=Number(n.rotation)),Bt(e,t,a,r)}function jg(e,t,n,r={}){const i=Dr(e,t,{...r,clone:false}).tileView?.tileObject;Ii(i,"egg");const a=Yt(i);return "plantedAt"in n&&(a.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(a.maturedAt=Number(n.maturedAt)),Bt(e,t,a,r)}function zg(e,t,n,r={}){const o=r.ensureView!==false,i=r.forceUpdate!==false,a=Ci(),{gidx:s,tv:c}=At(Number(e),Number(t),o);if(s==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!c)throw new Error("MGTile: TileView unavailable");const d=c.tileObject,l=typeof n=="function"?n(Yt(d)):n;if(c.onDataChanged(l),i&&a?.reusableContext&&typeof c.update=="function")try{c.update(a.reusableContext);}catch{}return {ok:true,tx:Number(e),ty:Number(t),gidx:s,before:d,after:c.tileObject}}function Gg(e,t,n={}){const r=n.ensureView!==false,{gidx:o,tv:i}=At(Number(e),Number(t),r);if(o==null)throw new Error("MGTile: cols unavailable");if(!i)return {ok:true,tx:Number(e),ty:Number(t),gidx:o,tv:null,tileObject:void 0};const a=n.clone!==false,s=i.tileObject;return {ok:true,tx:Number(e),ty:Number(t),gidx:o,objectType:s?.objectType??null,tileObject:a?Yt(s):s,tvKeys:Object.keys(i||{}).sort(),tileView:i}}function to(e){if(!e)return null;const t=o=>o&&(typeof o.getGlobalPosition=="function"||typeof o.toGlobal=="function"),n=["container","root","view","tile","ground","base","floor","bg","background","baseSprite","tileSprite","displayObject","gfx","graphics","sprite"];for(const o of n)if(t(e[o]))return e[o];if(t(e))return e;const r=[e.container,e.root,e.view,e.displayObject,e.tileSprite,e.gfx,e.graphics,e.sprite];for(const o of r)if(t(o))return o;try{for(const o of Object.keys(e))if(t(e[o]))return e[o]}catch{}return null}function fr(e){const t=Ye(()=>e?.getGlobalPosition?.());if(t&&Number.isFinite(t.x)&&Number.isFinite(t.y))return {x:t.x,y:t.y};const n=Ye(()=>e?.toGlobal?.({x:0,y:0}));return n&&Number.isFinite(n.x)&&Number.isFinite(n.y)?{x:n.x,y:n.y}:null}function Hg(e){try{if(!e?.getBounds)return "center";const t=e.getBounds(),n=fr(e);if(!n||!t||!Number.isFinite(t.width)||!Number.isFinite(t.height))return "center";const r=t.x+t.width/2,o=t.y+t.height/2;return Math.hypot(n.x-r,n.y-o)<Math.hypot(n.x-t.x,n.y-t.y)?"center":"topleft"}catch{return "center"}}function Wg(){const e=Pn(),t=e?.map?.cols,n=e?.map?.rows;if(!e||!Number.isFinite(t)||t<=1)return null;const r=Number.isFinite(n)&&n>1?n:null,o=[[0,0],[1,1],[Math.min(2,t-2),0],[0,1]];r&&r>2&&o.push([Math.floor(t/2),Math.floor(r/2)]);for(const[i,a]of o){if(i<0||a<0||i>=t||r&&a>=r)continue;const s=At(i,a,true).tv,c=i+1<t?At(i+1,a,true).tv:null,d=At(i,a+1,true).tv,l=to(s),u=to(c),p=to(d);if(!l||!u||!p)continue;const f=fr(l),g=fr(u),m=fr(p);if(!f||!g||!m)continue;const h={x:g.x-f.x,y:g.y-f.y},y={x:m.x-f.x,y:m.y-f.y},S=h.x*y.y-h.y*y.x;if(!Number.isFinite(S)||Math.abs(S)<1e-6)continue;const w=1/S,x={a:y.y*w,b:-y.x*w,c:-h.y*w,d:h.x*w},I={x:f.x-i*h.x-a*y.x,y:f.y-i*h.y-a*y.y},v=Hg(l),C=v==="center"?I:{x:I.x+.5*(h.x+y.x),y:I.y+.5*(h.y+y.y)};return {ok:true,cols:t,rows:r,vx:h,vy:y,inv:x,anchorMode:v,originCenter:C}}return null}function gl(){return De.xform=Wg(),De.xformAt=Date.now(),{ok:!!De.xform?.ok,xform:De.xform}}function Ug(e,t={}){if(!e||!Number.isFinite(e.x)||!Number.isFinite(e.y))return null;const n=Number.isFinite(t.maxAgeMs)?Number(t.maxAgeMs):1500;(!De.xform?.ok||t.forceRebuild||Date.now()-De.xformAt>n)&&gl();const r=De.xform;if(!r?.ok)return null;const o=e.x-r.originCenter.x,i=e.y-r.originCenter.y,a=r.inv.a*o+r.inv.b*i,s=r.inv.c*o+r.inv.d*i,c=Math.floor(a),d=Math.floor(s),l=[[c,d],[c+1,d],[c,d+1],[c+1,d+1]];let u=null,p=1/0;for(const[f,g]of l){if(f<0||g<0||f>=r.cols||Number.isFinite(r.rows)&&r.rows!==null&&g>=r.rows)continue;const m=r.originCenter.x+f*r.vx.x+g*r.vy.x,h=r.originCenter.y+f*r.vx.y+g*r.vy.y,y=(e.x-m)**2+(e.y-h)**2;y<p&&(p=y,u={tx:f,ty:g,fx:a,fy:s,x:e.x,y:e.y,gidx:null});}return u?(u.gidx=Ai(u.tx,u.ty),u):null}function Vg(e,t){const n=De.xform;return n?.ok?{x:n.originCenter.x+e*n.vx.x+t*n.vy.x,y:n.originCenter.y+e*n.vx.y+t*n.vy.y}:null}function je(){if(!fl())throw new Error("MGTile: not ready. Call MGTile.init() first.")}function Kg(){return ["MGTile.init()","MGTile.hook()","MGTile.getTileObject(tx,ty) / inspect(tx,ty)","MGTile.setTileEmpty(tx,ty)","MGTile.setTilePlant(tx,ty,{...}) / setTileDecor / setTileEgg","MGTile.setTileObjectRaw(tx,ty,objOrFn)","MGTile.rebuildTransform() / pointToTile({x,y})","MGTile.tileToPoint(tx,ty)"].join(`
`)}const pt={init:Ng,isReady:fl,hook:Ue.hook,engine:Ci,tos:Pn,gidx:(e,t)=>Ai(Number(e),Number(t)),getTileObject:(e,t,n={})=>(je(),Dr(e,t,n)),inspect:(e,t,n={})=>(je(),Gg(e,t,n)),setTileEmpty:(e,t,n={})=>(je(),$g(e,t,n)),setTilePlant:(e,t,n,r={})=>(je(),Dg(e,t,n,r)),setTileDecor:(e,t,n,r={})=>(je(),Bg(e,t,n,r)),setTileEgg:(e,t,n,r={})=>(je(),jg(e,t,n,r)),setTileObjectRaw:(e,t,n,r={})=>(je(),zg(e,t,n,r)),rebuildTransform:()=>(je(),gl()),pointToTile:(e,t={})=>(je(),Ug(e,t)),tileToPoint:(e,t)=>(je(),Vg(e,t)),getTransform:()=>(je(),De.xform),help:Kg};function Yg(){return {ready:false,app:null,renderer:null,stage:null,ticker:null,tileSets:new Map,highlights:new Map,watches:new Map,fades:new Map,fadeWatches:new Map}}const U=Yg();function ml(){return U.ready}async function qg(e=15e3){if(U.ready)return Fo(),true;if(await Ue.init(e),U.app=Ue.app(),U.ticker=Ue.ticker(),U.renderer=Ue.renderer(),U.stage=Ue.stage(),!U.app||!U.ticker)throw new Error("MGPixi: PIXI app/ticker not found");return U.ready=true,Fo(),true}function Fo(){const e=L;return e.$PIXI=e.PIXI||null,e.$app=U.app||null,e.$renderer=U.renderer||null,e.$stage=U.stage||null,e.$ticker=U.ticker||null,e.__MG_PIXI__={PIXI:e.$PIXI,app:e.$app,renderer:e.$renderer,stage:e.$stage,ticker:e.$ticker,ready:U.ready},e.__MG_PIXI__}function Ti(e){return !!e&&typeof e=="object"&&!Array.isArray(e)}function Ro(e){return !!(e&&typeof e.getBounds=="function"&&("parent"in e||"children"in e))}function Tr(e){return !!(e&&typeof e.tint=="number")}function Pt(e){return !!(e&&typeof e.alpha=="number")}function gr(e,t,n){return e+(t-e)*n}function Xg(e,t,n){const r=e>>16&255,o=e>>8&255,i=e&255,a=t>>16&255,s=t>>8&255,c=t&255,d=gr(r,a,n)|0,l=gr(o,s,n)|0,u=gr(i,c,n)|0;return d<<16|l<<8|u}function Jg(e,t=900){const n=[],r=[e];for(;r.length&&n.length<t;){const o=r.pop();if(!o)continue;Tr(o)&&n.push(o);const i=o.children;if(Array.isArray(i))for(let a=i.length-1;a>=0;a--)r.push(i[a]);}return n}function Qg(e,t=25e3){const n=[],r=[e];let o=0;for(;r.length&&o++<t;){const i=r.pop();if(!i)continue;Pt(i)&&n.push(i);const a=i.children;if(Array.isArray(a))for(let s=a.length-1;s>=0;s--)r.push(a[s]);}return n}const Zg=["plantVisual","cropVisual","slotVisual","slotView","displayObject","view","container","root","sprite","gfx","graphics"];function Oo(e){if(!e)return null;if(Ro(e))return e;if(!Ti(e))return null;for(const t of Zg){const n=e[t];if(Ro(n))return n}return null}function em(e,t){const n=[{o:e,d:0}],r=new Set,o=6;for(;n.length;){const{o:i,d:a}=n.shift();if(!(!i||a>o)&&!r.has(i)){if(r.add(i),Array.isArray(i)){if(i.length===t){const s=new Array(t);let c=true;for(let d=0;d<t;d++){const l=Oo(i[d]);if(!l){c=false;break}s[d]=l;}if(c)return s}for(const s of i)n.push({o:s,d:a+1});continue}if(Ti(i)){const s=i;for(const c of Object.keys(s))n.push({o:s[c],d:a+1});}}}return null}function hl(e){if(!Array.isArray(e))return [];const t=new Set,n=[];for(const r of e){let o,i;if(Array.isArray(r))o=r[0],i=r[1];else if(Ti(r))o=r.x??r.tx,i=r.y??r.ty;else continue;if(o=Number(o),i=Number(i),!Number.isFinite(o)||!Number.isFinite(i))continue;o|=0,i|=0;const a=`${o},${i}`;t.has(a)||(t.add(a),n.push({x:o,y:i}));}return n}function tm(e,t){const n=String(e||"").trim();if(!n)throw new Error("MGPixi.defineTileSet: empty name");const r=hl(t);return U.tileSets.set(n,r),{ok:true,name:n,count:r.length}}function nm(e){return U.tileSets.delete(String(e||"").trim())}function rm(){return Array.from(U.tileSets.keys()).sort((e,t)=>e.localeCompare(t))}function bl(e){return !!(e&&(e.tileSet!=null||Array.isArray(e.tiles)))}function Pi(e){const n=pt.tos?.()?.tileViews;if(!n?.entries)throw new Error("MGPixi: TOS.tileViews not found");if(!bl(e))return {entries:Array.from(n.entries()),gidxSet:null};let r=[];if(e.tileSet!=null){const i=String(e.tileSet||"").trim(),a=U.tileSets.get(i);if(!a)throw new Error(`MGPixi: tileSet not found "${i}"`);r=a;}else r=hl(e.tiles||[]);const o=new Map;for(const i of r){const a=pt.getTileObject(i.x,i.y,{ensureView:true,clone:false});a?.tileView&&a.gidx!=null&&o.set(a.gidx,a.tileView);}return {entries:Array.from(o.entries()),gidxSet:new Set(o.keys())}}function Ei(e){const t=U.highlights.get(e);if(!t)return  false;Ye(()=>U.ticker?.remove(t.tick)),t.root&&t.baseAlpha!=null&&Pt(t.root)&&Ye(()=>{t.root.alpha=t.baseAlpha;});for(const n of t.tint)n.o&&Tr(n.o)&&Ye(()=>{n.o.tint=n.baseTint;});return U.highlights.delete(e),true}function yl(e=null){for(const t of Array.from(U.highlights.keys()))e&&!String(t).startsWith(e)||Ei(t);return  true}function vl(e,t={}){if(!Ro(e))throw new Error("MGPixi.highlightPulse: invalid root");const n=String(t.key||`hl:${Math.random().toString(16).slice(2)}`);if(U.highlights.has(n))return n;const r=Pt(e)?Number(e.alpha):null,o=tt(Number(t.minAlpha??.12),0,1),i=tt(Number(t.maxAlpha??1),0,1),a=Number(t.speed??1.25),s=(t.tint??8386303)>>>0,c=tt(Number(t.tintMix??.85),0,1),d=t.deepTint!==false,l=[];if(d)for(const f of Jg(e))l.push({o:f,baseTint:f.tint});else Tr(e)&&l.push({o:e,baseTint:e.tint});const u=performance.now(),p=()=>{const f=(performance.now()-u)/1e3,g=(Math.sin(f*Math.PI*2*a)+1)/2,m=g*g*(3-2*g);r!=null&&Pt(e)&&(e.alpha=tt(gr(o,i,m)*r,0,1));const h=m*c;for(const y of l)y.o&&Tr(y.o)&&(y.o.tint=Xg(y.baseTint,s,h));};return U.ticker?.add(p),U.highlights.set(n,{root:e,tick:p,baseAlpha:r,tint:l}),n}function om(e,t){const n=e?.mutations;if(!Array.isArray(n))return  false;for(const r of n)if(String(r||"").toLowerCase()===t)return  true;return  false}function xl(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.highlightMutation: empty mutation");const{entries:r,gidxSet:o}=Pi(t),i=`hlmut:${n}:`;if(t.clear===true)if(!o)yl(i);else for(const u of Array.from(U.highlights.keys())){if(!u.startsWith(i))continue;const p=u.split(":"),f=Number(p[2]);o.has(f)&&Ei(u);}const a={tint:(t.tint??8386303)>>>0,minAlpha:Number(t.minAlpha??.12),maxAlpha:Number(t.maxAlpha??1),speed:Number(t.speed??1.25),tintMix:Number(t.tintMix??.85),deepTint:t.deepTint!==false};let s=0,c=0,d=0,l=0;for(const[u,p]of r){const f=p?.tileObject;if(!f||f.objectType!=="plant")continue;const g=f.slots;if(!Array.isArray(g)||g.length===0)continue;let m=false;const h=[];for(let w=0;w<g.length;w++)om(g[w],n)&&(h.push(w),m=true);if(!m)continue;s++,c+=h.length;const y=p?.childView?.plantVisual||p?.childView||p,S=em(y,g.length);if(!S){l+=h.length;continue}for(const w of h){const x=S[w];if(!x){l++;continue}const I=`${i}${u}:${w}`;U.highlights.has(I)||(vl(x,{key:I,...a}),d++);}}return {ok:true,mutation:n,filtered:!!o,plantsMatched:s,matchedSlots:c,newHighlights:d,failedSlots:l}}function im(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchMutation: empty mutation");const r=`watchmut:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,o=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,i=U.watches.get(r);i&&clearInterval(i);const a=setInterval(()=>{Ye(()=>xl(n,{...t,clear:!1}));},o);return U.watches.set(r,a),{ok:true,key:r,mutation:n,intervalMs:o}}function am(e){const t=String(e||"").trim();if(!t)return  false;if(!t.startsWith("watchmut:")){const r=t.toLowerCase();let o=0;for(const[i,a]of Array.from(U.watches.entries()))i.startsWith(`watchmut:${r}:`)&&(clearInterval(a),U.watches.delete(i),o++);return o>0}const n=U.watches.get(t);return n?(clearInterval(n),U.watches.delete(t),true):false}function sm(e){const t=e?.childView?.plantVisual||e?.childView?.cropVisual||e?.childView||e?.displayObject||e;return Oo(t)||Oo(e?.displayObject)||null}function wl(e){const t=U.fades.get(e);if(!t)return  false;for(const n of t.targets)n.o&&Pt(n.o)&&Number.isFinite(n.baseAlpha)&&Ye(()=>{n.o.alpha=n.baseAlpha;});return U.fades.delete(e),true}function No(e=null){for(const t of Array.from(U.fades.keys()))e&&!String(t).startsWith(e)||wl(t);return  true}function kl(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.clearSpeciesFade: empty species");const r=`fade:${n}:`;if(!bl(t))return No(r);const{gidxSet:o}=Pi(t);if(!o)return No(r);for(const i of Array.from(U.fades.keys())){if(!i.startsWith(r))continue;const a=Number(i.slice(r.length));o.has(a)&&wl(i);}return  true}function Sl(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.fadeSpecies: empty species");const r=tt(Number(t.alpha??.2),0,1),o=t.deep===true,{entries:i,gidxSet:a}=Pi(t),s=`fade:${n}:`;t.clear===true&&kl(n,t);let c=0,d=0,l=0,u=0;for(const[p,f]of i){const g=f?.tileObject;if(!g||g.objectType!=="plant")continue;c++;const m=String(g.species||"").trim().toLowerCase();if(!m||m!==n)continue;d++;const h=sm(f);if(!h||!Pt(h)){u++;continue}const y=`${s}${p}`;if(U.fades.has(y)){Ye(()=>{h.alpha=r;}),l++;continue}const S=o?Qg(h):[h],w=[];for(const x of S)Pt(x)&&w.push({o:x,baseAlpha:Number(x.alpha)});for(const x of w)Ye(()=>{x.o.alpha=r;});U.fades.set(y,{targets:w}),l++;}return {ok:true,species:n,alpha:r,deep:o,filtered:!!a,plantsSeen:c,matchedPlants:d,applied:l,failed:u,totalFades:U.fades.size}}function lm(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchFadeSpecies: empty species");const r=`watchfade:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,o=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,i=U.fadeWatches.get(r);i&&clearInterval(i);const a=setInterval(()=>{Ye(()=>Sl(n,{...t,clear:!1}));},o);return U.fadeWatches.set(r,a),{ok:true,key:r,species:n,intervalMs:o}}function cm(e){const t=String(e||"").trim();if(!t)return  false;if(!t.startsWith("watchfade:")){const r=t.toLowerCase();let o=0;for(const[i,a]of Array.from(U.fadeWatches.entries()))i.startsWith(`watchfade:${r}:`)&&(clearInterval(a),U.fadeWatches.delete(i),o++);return o>0}const n=U.fadeWatches.get(t);return n?(clearInterval(n),U.fadeWatches.delete(t),true):false}function dm(e){const t=Array.isArray(e?.slots)?e.slots:[];return {objectType:"plant",species:e?.species??null,plantedAt:e?.plantedAt??null,maturedAt:e?.maturedAt??null,slotCount:t.length,slots:t.map((n,r)=>({idx:r,mutations:Array.isArray(n?.mutations)?n.mutations.slice():[]}))}}function um(e,t,n={}){const r=Number(e)|0,o=Number(t)|0,i=n.ensureView!==false,a=pt.getTileObject(r,o,{ensureView:i,clone:false}),s=a?.tileView||null,c=s?.tileObject,d={ok:true,tx:r,ty:o,gidx:a?.gidx??pt.gidx?.(r,o)??null,hasTileView:!!s,objectType:c?.objectType??null,tileObject:c??null,summary:c?.objectType==="plant"?dm(c):c?{objectType:c.objectType??null}:null,display:s?s.childView?.plantVisual||s.childView||s.displayObject||s:null};return n.log!==false&&Ye(()=>console.log("[MGPixi.inspectTile]",d)),d}function pm(e,t,n){const r=L.PIXI;if(!r)return;let o=U.stage.getChildByName("gemini-overlay");o||(o=new r.Container,o.name="gemini-overlay",U.stage.addChild(o));const i=n.key;let a=o.getChildByName(i);a||(a=new r.Graphics,a.name=i,o.addChild(a));const s=pt.tileToPoint(e,t);if(!s)return;a.clear(),a.lineStyle(2,n.tint??65280,n.alpha??1),a.beginFill(n.tint??65280,(n.alpha??1)*.2);const c=pt.getTransform(),d=c?Math.hypot(c.vx.x,c.vx.y):32,l=c?Math.hypot(c.vy.x,c.vy.y):32;a.drawRect(0,0,d,l),a.endFill(),a.x=s.x,a.y=s.y,c&&(a.rotation=Math.atan2(c.vx.y,c.vx.x));}function fm(e){const t=U.stage?.getChildByName("gemini-overlay");if(!t)return  false;const n=t.getChildByName(e);return n?(t.removeChild(n),n.destroy?.(),true):false}function xe(){if(!ml())throw new Error("MGPixi: call MGPixi.init() first")}const Mi={init:qg,isReady:ml,expose:Fo,get app(){return U.app},get renderer(){return U.renderer},get stage(){return U.stage},get ticker(){return U.ticker},get PIXI(){return L.PIXI||null},defineTileSet:(e,t)=>(xe(),tm(e,t)),deleteTileSet:e=>(xe(),nm(e)),listTileSets:()=>(xe(),rm()),highlightPulse:(e,t)=>(xe(),vl(e,t)),stopHighlight:e=>(xe(),Ei(e)),clearHighlights:e=>(xe(),yl(e)),drawOverlayBox:(e,t,n)=>(xe(),pm(e,t,n)),stopOverlay:e=>(xe(),fm(e)),highlightMutation:(e,t)=>(xe(),xl(e,t)),watchMutation:(e,t)=>(xe(),im(e,t)),stopWatchMutation:e=>(xe(),am(e)),inspectTile:(e,t,n)=>(xe(),um(e,t,n)),fadeSpecies:(e,t)=>(xe(),Sl(e,t)),clearSpeciesFade:(e,t)=>(xe(),kl(e,t)),clearFades:e=>(xe(),No(e)),watchFadeSpecies:(e,t)=>(xe(),lm(e,t)),stopWatchFadeSpecies:e=>(xe(),cm(e))};function gm(){return {ready:false,baseUrl:null,urls:{ambience:new Map,music:new Map},sfx:{mp3Url:null,atlasUrl:null,atlas:null,groups:new Map,buffer:null},tracks:{ambience:null,music:null},ctx:null}}const Y=gm();function Cl(){return Y.ready}const fa=L??window;async function Al(){const e=Y.ctx;if(e)return e;const t=fa.AudioContext||fa.webkitAudioContext;if(!t)throw new Error("WebAudio not supported");const n=new t;return Y.ctx=n,n}async function Il(){if(Y.ctx&&Y.ctx.state==="suspended")try{await Y.ctx.resume();}catch{}}const mm={sfx:"soundEffectsVolume",music:"musicVolume",ambience:"ambienceVolume"},hm={sfx:"soundEffectsVolumeAtom",music:"musicVolumeAtom",ambience:"ambienceVolumeAtom"},gn=.001,mn=.2;function ga(e,t=NaN){try{const n=localStorage.getItem(e);if(n==null)return t;let r;try{r=JSON.parse(n);}catch{r=n;}if(typeof r=="number"&&Number.isFinite(r))return r;if(typeof r=="string"){const o=parseFloat(r);if(Number.isFinite(o))return o}}catch{}return t}function In(e){const t=mm[e],n=hm[e];if(!t)return {atom:mn,vol100:Vn(mn)};const r=ga(t,NaN);if(Number.isFinite(r)){const i=tt(r,0,1);return {atom:i,vol100:Vn(i)}}if(n){const i=ga(n,NaN);if(Number.isFinite(i)){const a=tt(i,0,1);return {atom:a,vol100:Vn(a)}}}const o=mn;return {atom:o,vol100:Vn(o)}}function bm(e){const t=Number(e);if(!Number.isFinite(t))return null;if(t<=0)return 0;const r=(tt(t,1,100)-1)/99;return gn+r*(mn-gn)}function Vn(e){const t=tt(Number(e),0,1);if(t<=gn)return 0;const n=(t-gn)/(mn-gn);return Math.round(1+n*99)}function Tl(e,t){if(t==null)return In(e).atom;const n=bm(t);return n===null?In(e).atom:ou(n)}function ym(e){const t=new Map,n=(r,o)=>{t.has(r)||t.set(r,[]),t.get(r).push(o);};for(const r of Object.keys(e||{})){const o=/^(.*)_([A-Z])$/.exec(r);o?.[1]?n(o[1],r):n(r,r);}for(const[r,o]of Array.from(t.entries()))o.sort((i,a)=>i.localeCompare(a)),t.set(r,o);Y.sfx.groups=t;}function vm(e){const t=Y.sfx.atlas;if(!t)throw new Error("SFX atlas not loaded");if(t[e])return e;const n=Y.sfx.groups.get(e);if(n?.length)return n[Math.random()*n.length|0];throw new Error(`Unknown sfx/group: ${e}`)}async function xm(){if(Y.sfx.buffer)return Y.sfx.buffer;if(!Y.sfx.mp3Url)throw new Error("SFX mp3 url missing");const e=await Al();await Il();const n=await(await ks(Y.sfx.mp3Url)).arrayBuffer(),r=await new Promise((o,i)=>{const a=e.decodeAudioData(n,o,i);a?.then&&a.then(o,i);});return Y.sfx.buffer=r,r}async function wm(e,t={}){if(!Y.ready)throw new Error("MGAudio not ready yet");const n=String(e||"").trim();if(!n)throw new Error("Missing sfx name");const r=vm(n),o=Y.sfx.atlas[r];if(!o)throw new Error(`Missing segment for sfx: ${r}`);const i=await Al();await Il();const a=await xm(),s=Math.max(0,+o.start||0),c=Math.max(s,+o.end||s),d=Math.max(.01,c-s),l=Tl("sfx",t.volume),u=i.createGain();u.gain.value=l,u.connect(i.destination);const p=i.createBufferSource();return p.buffer=a,p.connect(u),p.start(0,s,d),{name:r,source:p,start:s,end:c,duration:d,volume:l}}let Kn=null;async function km(){return Y.ready?true:Kn||(Kn=(async()=>{Y.baseUrl=await Vt.base();const e=await dt.load({baseUrl:Y.baseUrl}),t=dt.getBundle(e,"audio");if(!t)throw new Error("No audio bundle in manifest");for(const n of t.assets||[])for(const r of n.src||[]){if(typeof r!="string")continue;const o=/^audio\/(ambience|music)\/(.+)\.mp3$/i.exec(r);if(o){const i=o[1].toLowerCase(),a=o[2];Y.urls[i].set(a,at(Y.baseUrl,r));continue}/^audio\/sfx\/sfx\.mp3$/i.test(r)&&(Y.sfx.mp3Url=at(Y.baseUrl,r)),/^audio\/sfx\/sfx\.json$/i.test(r)&&(Y.sfx.atlasUrl=at(Y.baseUrl,r));}if(!Y.sfx.atlasUrl)throw new Error("Missing audio/sfx/sfx.json in manifest");return Y.sfx.atlas=await ui(Y.sfx.atlasUrl),ym(Y.sfx.atlas),Y.ready=true,true})(),Kn)}function Pl(e){if(e!=="music"&&e!=="ambience")return  false;const t=Y.tracks[e];if(t){try{t.pause();}catch{}try{t.src="";}catch{}}return Y.tracks[e]=null,true}function Sm(e,t,n={}){if(!Y.ready)throw new Error("MGAudio not ready yet");if(e!=="music"&&e!=="ambience")throw new Error(`Invalid category: ${e}`);const r=Y.urls[e].get(t);if(!r)throw new Error(`Unknown ${e}: ${t}`);Pl(e);const o=new Audio(r);return o.loop=!!n.loop,o.volume=Tl(e,n.volume),o.preload="auto",o.play().catch(()=>{}),Y.tracks[e]=o,o}function Cm(e,t={}){const n=String(e||"").trim();return n==="music"||n==="ambience"?Array.from(Y.urls[n].keys()).sort():n==="sfx"?Y.sfx.atlas?t.groups?Array.from(Y.sfx.groups.keys()).sort():Object.keys(Y.sfx.atlas).sort():[]:[]}function Am(){return ["sfx","music","ambience"]}function Im(){return Array.from(Y.sfx.groups.keys()).sort((e,t)=>e.localeCompare(t))}function Tm(e,t){const n=String(e||"").trim().toLowerCase(),r=String(t||"").trim();if(!r||n!=="music"&&n!=="ambience")return  false;const o=Y.urls[n],i=r.toLowerCase();for(const a of Array.from(o.keys()))if(a.toLowerCase()===i)return  true;return  false}function Pm(e){const t=String(e||"").trim();if(!t)return  false;const n=t.toLowerCase();for(const r of Array.from(Y.sfx.groups.keys()))if(r.toLowerCase()===n)return  true;return  false}function Em(e,t){const n=String(e||"").trim().toLowerCase(),r=String(t||"").trim();if(!r)throw new Error("getTrackUrl(category, name) missing name");if(n!=="music"&&n!=="ambience")throw new Error(`Invalid category: ${e}`);const o=Y.urls[n],i=r.toLowerCase();for(const[a,s]of Array.from(o.entries()))if(a.toLowerCase()===i)return s;return null}function Mm(){return Y.tracks.music&&(Y.tracks.music.volume=In("music").atom),Y.tracks.ambience&&(Y.tracks.ambience.volume=In("ambience").atom),true}function rt(){if(!Cl())throw new Error("MGAudio not ready yet")}async function Lm(e,t,n={}){const r=String(e||"").trim(),o=String(t||"").trim();if(!r||!o)throw new Error("play(category, asset) missing args");if(r==="sfx")return wm(o,n);if(r==="music"||r==="ambience")return Sm(r,o,n);throw new Error(`Unknown category: ${r}`)}const El={init:km,isReady:Cl,play:Lm,stop:e=>(rt(),Pl(e)),list:(e,t)=>(rt(),Cm(e,t)),refreshVolumes:()=>(rt(),Mm()),categoryVolume:e=>(rt(),In(e)),getCategories:()=>(rt(),Am()),getGroups:()=>(rt(),Im()),hasTrack:(e,t)=>(rt(),Tm(e,t)),hasGroup:e=>(rt(),Pm(e)),getTrackUrl:(e,t)=>(rt(),Em(e,t))};function _m(){return {ready:false,baseUrl:null,byCat:new Map,byBase:new Map,overlay:null,live:new Set,defaultParent:null}}const fe=_m();function Ml(){return fe.ready}let Yn=null;async function Fm(){return fe.ready?true:Yn||(Yn=(async()=>{fe.baseUrl=await Vt.base();const e=await dt.load({baseUrl:fe.baseUrl}),t=dt.getBundle(e,"cosmetic");if(!t)throw new Error("No 'cosmetic' bundle in manifest");fe.byCat.clear(),fe.byBase.clear();for(const n of t.assets||[])for(const r of n.src||[]){if(typeof r!="string"||!/^cosmetic\/.+\.png$/i.test(r))continue;const i=r.split("/").pop().replace(/\.png$/i,""),a=i.indexOf("_");if(a<0)continue;const s=i.slice(0,a),c=i.slice(a+1),d=at(fe.baseUrl,r);fe.byBase.set(i,d),fe.byCat.has(s)||fe.byCat.set(s,new Map),fe.byCat.get(s).set(c,d);}return fe.ready=true,true})(),Yn)}function $o(e){let t=String(e||"").trim();return t?(t=t.replace(/^cosmetic\//i,""),t=t.replace(/\.png$/i,""),t):""}function Rm(e,t){if(t===void 0){const i=$o(e),a=i.indexOf("_");return a<0?{cat:"",asset:i,base:i}:{cat:i.slice(0,a),asset:i.slice(a+1),base:i}}const n=String(e||"").trim(),r=$o(t),o=r.includes("_")?r:`${n}_${r}`;if(r.includes("_")&&!n){const i=r.indexOf("_");return {cat:r.slice(0,i),asset:r.slice(i+1),base:r}}return {cat:n,asset:r.replace(/^.+?_/,""),base:o}}function Om(){return Array.from(fe.byCat.keys()).sort((e,t)=>e.localeCompare(t))}function Nm(e){const t=fe.byCat.get(String(e||"").trim());return t?Array.from(t.keys()).sort((n,r)=>n.localeCompare(r)):[]}function Do(e,t){const{cat:n,asset:r,base:o}=Rm(e,t),i=fe.byBase.get(o);if(i)return i;const s=fe.byCat.get(n)?.get(r);if(s)return s;if(!fe.baseUrl)throw new Error("MGCosmetic not initialized");if(!o)throw new Error("Invalid cosmetic name");return at(fe.baseUrl,`cosmetic/${o}.png`)}const ma=L?.document??document;function $m(){if(fe.overlay)return fe.overlay;const e=ma.createElement("div");return e.id="MG_COSMETIC_OVERLAY",e.style.cssText=["position:fixed","left:0","top:0","width:100vw","height:100vh","pointer-events:none","z-index:99999999"].join(";"),ma.documentElement.appendChild(e),fe.overlay=e,e}function Dm(){const e=fe.defaultParent;if(!e)return null;try{return typeof e=="function"?e():e}catch{return null}}function Bm(e){return fe.defaultParent=e,true}const jm=L?.document??document;function Bo(e,t,n){if(!fe.ready)throw new Error("MGCosmetic not ready yet");let r,o;typeof t=="object"&&t!==null?(r=t,o=void 0):typeof t=="string"?(o=t,r=n||{}):(o=void 0,r=n||{});const i=o!==void 0?Do(e,o):Do(e),a=jm.createElement("img");if(a.decoding="async",a.loading="eager",a.src=i,a.alt=r.alt!=null?String(r.alt):$o(o??e),r.className&&(a.className=String(r.className)),r.width!=null&&(a.style.width=String(r.width)),r.height!=null&&(a.style.height=String(r.height)),r.opacity!=null&&(a.style.opacity=String(r.opacity)),r.style&&typeof r.style=="object")for(const[s,c]of Object.entries(r.style))try{a.style[s]=String(c);}catch{}return a}function zm(e,t,n){let r,o;typeof t=="object"&&t!==null?(r=t,o=void 0):typeof t=="string"?(o=t,r=n||{}):(o=void 0,r=n||{});const i=r.parent||Dm()||$m(),a=o!==void 0?Bo(e,o,r):Bo(e,r);if(i===fe.overlay||r.center||r.x!=null||r.y!=null||r.absolute){a.style.position="absolute",a.style.pointerEvents="none",a.style.zIndex=String(r.zIndex??999999);const c=r.scale??1,d=r.rotation??0;if(r.center)a.style.left="50%",a.style.top="50%",a.style.transform=`translate(-50%, -50%) scale(${c}) rotate(${d}rad)`;else {const l=r.x??innerWidth/2,u=r.y??innerHeight/2;a.style.left=`${l}px`,a.style.top=`${u}px`,a.style.transform=`scale(${c}) rotate(${d}rad)`,r.anchor==="center"&&(a.style.transform=`translate(-50%, -50%) scale(${c}) rotate(${d}rad)`);}}return i.appendChild(a),fe.live.add(a),a.__mgDestroy=()=>{try{a.remove();}catch{}fe.live.delete(a);},a}function Gm(){for(const e of Array.from(fe.live))e.__mgDestroy?.();}function yt(){if(!Ml())throw new Error("MGCosmetic not ready yet")}const Ll={init:Fm,isReady:Ml,categories:()=>(yt(),Om()),list:e=>(yt(),Nm(e)),url:((e,t)=>(yt(),Do(e,t))),create:((e,t,n)=>(yt(),Bo(e,t,n))),show:((e,t,n)=>(yt(),zm(e,t,n))),attach:e=>(yt(),Bm(e)),clear:()=>(yt(),Gm())};async function Hm(e){const t=[{name:"Data",init:()=>ce.init()},{name:"CustomModal",init:()=>fn.init()},{name:"Sprites",init:()=>ie.init()},{name:"TileObjectSystem",init:()=>pt.init()},{name:"Pixi",init:()=>Mi.init()},{name:"Audio",init:()=>El.init()},{name:"Cosmetics",init:()=>Ll.init()}];await Promise.all(t.map(async n=>{e?.({status:"start",name:n.name});try{await n.init(),e?.({status:"success",name:n.name});}catch(r){console.error(`[${n.name}] failed`,r),e?.({status:"error",name:n.name,error:r});}})),console.log("[Gemini] Modules ready. Access via Gemini.Modules in console.");}function Wm(e){const t=String(e??"").trim().toLowerCase();return t?t==="common"?"Common":t==="uncommon"?"Uncommon":t==="rare"?"Rare":t==="legendary"?"Legendary":t==="mythical"?"Mythical":t==="divine"?"Divine":t==="celestial"?"Celestial":t==="unknown"||t==="unknow"?"Unknown":null:null}function Um(e){return e.toLowerCase()}function Li(e={}){const{id:t,label:n="",type:r="neutral",tone:o="soft",border:i,withBorder:a,pill:s=true,size:c="md",onClick:d,variant:l="default",rarity:u=null,abilityId:p="",abilityName:f=""}=e,g=b("span",{className:"badge",id:t});s&&g.classList.add("badge--pill"),c==="sm"?g.classList.add("badge--sm"):c==="lg"?g.classList.add("badge--lg"):g.classList.add("badge--md"),d&&g.addEventListener("click",d);let m=false,h=a;function y(){m||(h===false?g.style.border="none":g.style.border="");}function S(k,P=o){g.classList.remove("badge--neutral","badge--info","badge--success","badge--warning","badge--danger","badge--soft","badge--outline","badge--solid"),g.classList.add(`badge--${k}`,`badge--${P}`),y();}function w(k){const P=(k??"").trim();P?(g.style.border=P,m=true):(m=false,y());}function x(k){h=k,y();}function I(k){g.textContent=k;}function v(k,P=o){S(k,P);}function C(k){g.classList.remove("badge--rarity","badge--rarity-common","badge--rarity-uncommon","badge--rarity-rare","badge--rarity-legendary","badge--rarity-mythical","badge--rarity-divine","badge--rarity-celestial","badge--rarity-unknown"),g.style.background="",g.style.backgroundSize="",g.style.animation="",g.style.color="",g.style.webkitTextStroke="";const P=Wm(k);if(!P){g.textContent=String(k??"—");return}g.textContent=P,g.classList.add("badge--rarity",`badge--rarity-${Um(P)}`);}function T(k,P){const O=ce.get("abilities")?.[k],ee=O?.colors,B=ee?.bg||"rgba(100, 100, 100, 0.9)",V=ee?.hover||"rgba(150, 150, 150, 1)";g.classList.remove("badge--neutral","badge--info","badge--success","badge--warning","badge--danger","badge--soft","badge--outline","badge--solid","badge--rarity","badge--rarity-common","badge--rarity-uncommon","badge--rarity-rare","badge--rarity-legendary","badge--rarity-mythical","badge--rarity-divine","badge--rarity-celestial","badge--rarity-unknown"),g.classList.add("badge--ability"),g.textContent=P||O?.name||k||"Unknown Ability",g.style.background=B,g.style.color="white",g.style.border="none",g.style.webkitTextStroke="",g.style.animation="",g.style.backgroundSize="";const ae=()=>{g.style.background=V;},$=()=>{g.style.background=B;};g.removeEventListener("mouseenter",ae),g.removeEventListener("mouseleave",$),g.addEventListener("mouseenter",ae),g.addEventListener("mouseleave",$);}return l==="rarity"?C(u):l==="ability"?T(p,f):(g.textContent=n,S(r,o),typeof a=="boolean"&&x(a),i&&w(i)),{root:g,setLabel:I,setType:v,setBorder:w,setWithBorder:x,setRarity:C,setAbility:T}}const Vm={expanded:false,sort:{key:null,dir:null},search:""},Km={categories:{}};async function Ym(){const e=await Lr("tab-test",{version:2,defaults:Km,sanitize:i=>({categories:i.categories&&typeof i.categories=="object"?i.categories:{}})});function t(i){return e.get().categories[i]||{...Vm}}function n(i,a){const s=e.get(),c=t(i);e.update({categories:{...s.categories,[i]:{...c,expanded:a}}});}function r(i,a,s){const c=e.get(),d=t(i);e.update({categories:{...c.categories,[i]:{...d,sort:{key:a,dir:s}}}});}function o(i,a){const s=e.get(),c=t(i);e.update({categories:{...s.categories,[i]:{...c,search:a}}});}return {get:e.get,set:e.set,save:e.save,getCategoryState:t,setCategoryExpanded:n,setCategorySort:r,setCategorySearch:o}}const qm={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function qn(e){return e?qm[e]??0:0}class Xm extends Ut{constructor(){super({id:"tab-test",label:"Test"});H(this,"stateCtrl",null);}async build(n){this.stateCtrl=await Ym();const r=this.createContainer("test-section");r.style.display="flex",r.style.flexDirection="column",r.style.gap="12px",n.appendChild(r),await this.buildSpriteTables(r);}renderSprite(n){const r=b("div",{style:"display:flex;align-items:center;justify-content:center;width:32px;height:32px;"});if(n.spriteId){const o=n.spriteId;requestAnimationFrame(()=>{try{const i=ie.toCanvas(o,{scale:1});i.style.maxWidth="32px",i.style.maxHeight="32px",i.style.objectFit="contain",r.appendChild(i);}catch{r.textContent="-";}});}else r.textContent="-";return r}renderRarity(n){if(!n.rarity){const o=b("span",{style:"opacity:0.5;"});return o.textContent="—",o}return Li({variant:"rarity",rarity:n.rarity,size:"sm"}).root}createDataCard(n,r,o,i){const a=this.stateCtrl.getCategoryState(n),s=p=>{if(!p)return o;const f=p.toLowerCase();return o.filter(g=>g.name.toLowerCase().includes(f))},c=hs({columns:i,data:s(a.search),pageSize:0,compact:true,maxHeight:"calc(var(--lg-row-h, 40px) * 6)",getRowId:p=>p.spriteId,onSortChange:(p,f)=>{this.stateCtrl.setCategorySort(n,p,f);}});a.sort.key&&a.sort.dir&&c.sortBy(a.sort.key,a.sort.dir);const d=li({placeholder:"Search...",value:a.search,debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:p=>{const f=p.trim();this.stateCtrl.setCategorySearch(n,f),c.setData(s(f));}}),l=b("div",{style:"margin-bottom:8px;"});l.appendChild(d.root);const u=b("div");return u.appendChild(l),u.appendChild(c.root),Be({title:r,subtitle:`${o.length} entries`,variant:"soft",padding:"sm",expandable:true,defaultExpanded:a.expanded,onExpandChange:p=>{this.stateCtrl.setCategoryExpanded(n,p);}},u)}formatCategoryName(n){return n.split("-").map(r=>r.charAt(0).toUpperCase()+r.slice(1)).join(" ")}findPlantBySprite(n,r){const o=ce.get("plants");if(!o)return null;for(const a of Object.values(o))if(a?.seed?.spriteId===n||a?.plant?.spriteId===n||a?.crop?.spriteId===n)return a;const i=r.toLowerCase();for(const a of Object.values(o)){const s=(a?.seed?.name||"").toLowerCase();if(s===i||s===`${i} seed`)return a}return null}findPetBySpriteId(n){const r=ce.get("pets");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}findItemBySpriteId(n){const r=ce.get("items");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}findDecorBySpriteId(n){const r=ce.get("decor");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}findEggBySpriteId(n){const r=ce.get("eggs");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}getRarityForSprite(n,r,o){const i=n.toLowerCase();if(i==="plant"||i==="seed"||i==="tallplant"){const a=this.findPlantBySprite(r,o);if(a?.seed?.rarity)return a.seed.rarity}if(i==="pet"){const a=this.findPetBySpriteId(r);if(a?.rarity)return a.rarity}if(i==="item"){const a=this.findItemBySpriteId(r);if(a?.rarity)return a.rarity}if(i==="decor"){const a=this.findDecorBySpriteId(r);if(a?.rarity)return a.rarity}if(i==="egg"){const a=this.findEggBySpriteId(r);if(a?.rarity)return a.rarity}return null}yieldToMain(n=0){return new Promise(r=>{n>0?setTimeout(r,n):typeof requestIdleCallback<"u"?requestIdleCallback(()=>r(),{timeout:50}):setTimeout(r,4);})}async buildSpriteTables(n){const r=[{key:"name",header:"Name",sortable:true,width:"1fr",sortFn:(i,a)=>i.name.localeCompare(a.name,void 0,{numeric:true,sensitivity:"base"})},{key:"rarity",header:"Rarity",sortable:true,width:"100px",align:"center",render:i=>this.renderRarity(i),sortFn:(i,a)=>qn(i.rarity)-qn(a.rarity)},{key:"sprite",header:"Sprite",width:"60px",align:"center",render:i=>this.renderSprite(i)}];if(!ie.isReady())try{await ie.init();}catch{return}const o=ie.getCategories();for(let i=0;i<o.length;i++){await this.yieldToMain(8);const a=o[i],c=ie.getCategoryId(a).map(d=>{const l=`sprite/${a}/${d}`;return {name:d,spriteId:l,rarity:this.getRarityForSprite(a,l,d)}});if(c.sort((d,l)=>qn(d.rarity)-qn(l.rarity)),c.length>0){const d=this.createDataCard(a,this.formatCategoryName(a),c,r);n.appendChild(d);}}}}function kt(e,t,n){if(e.querySelector(`style[data-style-id="${n}"]`))return;const r=document.createElement("style");r.setAttribute("data-style-id",n),r.textContent=t,e.appendChild(r);}const _l=`
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
`,Jm={enabled:false,favoriteProduceList:[],favoritePetsList:[],favoriteMutations:[]};let xt=null;async function Qm(){if(xt)return xt;xt=await Lr("tab-auto-favorite",{version:1,defaults:Jm});const e=Se(Ee.AUTO_FAVORITE_UI,null);return e&&(await xt.set(e),ed(Ee.AUTO_FAVORITE_UI),console.log("[AutoFavoriteSettings] Migrated old storage to new state")),xt}function ze(){if(!xt)throw new Error("[AutoFavoriteSettings] Section state not initialized. Call initSectionState() first.");return xt}const _i=Ee.AUTO_FAVORITE,Fl={enabled:false,mode:"simple",simple:{enabled:false,favoriteSpecies:[],favoriteMutations:[]}};function Et(){return Se(_i,Fl)}function Fi(e){Le(_i,e);}function Rl(e){const n={...Et(),...e};return Fi(n),n}function Ri(e){const t=Et();return t.mode="simple",t.simple={...t.simple,...e},Fi(t),t}function Zm(e){Ri({favoriteSpecies:e});}function eh(e){Ri({favoriteMutations:e});}function ha(){return Et().enabled}function nt(e,t){if(e===t)return  true;if(e===null||t===null)return e===t;if(typeof e!=typeof t)return  false;if(typeof e!="object")return e===t;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return  false;for(let a=0;a<e.length;a++)if(!nt(e[a],t[a]))return  false;return  true}if(Array.isArray(e)||Array.isArray(t))return  false;const n=e,r=t,o=Object.keys(n),i=Object.keys(r);if(o.length!==i.length)return  false;for(const a of o)if(!Object.prototype.hasOwnProperty.call(r,a)||!nt(n[a],r[a]))return  false;return  true}const ba={currentGardenTile:"myCurrentGardenTileAtom",globalTileIndex:"myCurrentGlobalTileIndexAtom",gardenObject:"myCurrentGardenObjectAtom",isMature:"isGardenObjectMatureAtom",isInMyGarden:"isInMyGardenAtom",gardenName:"currentGardenNameAtom",sortedSlotIndices:"myCurrentSortedGrowSlotIndicesAtom",currentGrowSlotIndex:"myCurrentGrowSlotIndexAtom"},ya={position:{globalIndex:null,localIndex:null},tile:{type:null,isEmpty:true},garden:{name:null,isOwner:false,playerSlotIndex:null},object:{type:null,data:null,isMature:false},plant:null};function th(e){const t=e.currentGardenTile;return {globalIndex:e.globalTileIndex,localIndex:t?.localTileIndex??null}}function nh(e){return {type:e.currentGardenTile?.tileType??null,isEmpty:e.gardenObject===null}}function rh(e){const t=e.currentGardenTile;return {name:e.gardenName,isOwner:e.isInMyGarden??false,playerSlotIndex:t?.userSlotIdx??null}}function oh(e){const t=e.gardenObject;return t?{type:t.objectType,data:t,isMature:e.isMature??false}:{type:null,data:null,isMature:false}}function ih(e){const t=e.gardenObject;if(!t||t.objectType!=="plant")return null;const n=t,r=e.sortedSlotIndices??[];return {species:n.species,slots:n.slots??[],currentSlotIndex:e.currentGrowSlotIndex,sortedSlotIndices:r,nextHarvestSlotIndex:r.length>0?r[0]:null}}function va(e){return {position:th(e),tile:nh(e),garden:rh(e),object:oh(e),plant:ih(e)}}function xa(e){return JSON.stringify({globalIndex:e.position.globalIndex,localIndex:e.position.localIndex,tileType:e.tile.type,isEmpty:e.tile.isEmpty,gardenName:e.garden.name,isOwner:e.garden.isOwner,playerSlotIndex:e.garden.playerSlotIndex,objectType:e.object.type,isMature:e.object.isMature,plantSpecies:e.plant?.species??null,slotCount:e.plant?.slots.length??0})}function ah(e,t){return e.type!==t.type||e.isMature!==t.isMature?true:e.data===null&&t.data===null?false:e.data===null||t.data===null?true:!nt(e.data,t.data)}function sh(e,t){return e===null&&t===null?false:e===null||t===null||e.species!==t.species||e.currentSlotIndex!==t.currentSlotIndex||e.nextHarvestSlotIndex!==t.nextHarvestSlotIndex||e.slots.length!==t.slots.length?true:!nt(e.sortedSlotIndices,t.sortedSlotIndices)}function lh(e,t){return e.name!==t.name||e.isOwner!==t.isOwner||e.playerSlotIndex!==t.playerSlotIndex}function ch(){let e=ya,t=ya,n=false;const r=[],o={all:new Set,stable:new Set,object:new Set,plantInfo:new Set,garden:new Set},i={},a=Object.keys(ba),s=new Set;function c(){if(s.size<a.length)return;const l=va(i);if(!nt(e,l)&&(t=e,e=l,!!n)){for(const u of o.all)u(e,t);if(xa(t)!==xa(e))for(const u of o.stable)u(e,t);if(ah(t.object,e.object)){const u={current:e.object,previous:t.object};for(const p of o.object)p(u);}if(sh(t.plant,e.plant)){const u={current:e.plant,previous:t.plant};for(const p of o.plantInfo)p(u);}if(lh(t.garden,e.garden)){const u={current:e.garden,previous:t.garden};for(const p of o.garden)p(u);}}}async function d(){if(n)return;const l=a.map(async u=>{const p=ba[u],f=await de.subscribe(p,g=>{i[u]=g,s.add(u),c();});r.push(f);});await Promise.all(l),n=true,s.size===a.length&&(e=va(i));}return d(),{get(){return e},subscribe(l,u){return o.all.add(l),u?.immediate!==false&&n&&s.size===a.length&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,u){return o.stable.add(l),u?.immediate!==false&&n&&s.size===a.length&&l(e,e),()=>o.stable.delete(l)},subscribeObject(l,u){return o.object.add(l),u?.immediate&&n&&s.size===a.length&&l({current:e.object,previous:e.object}),()=>o.object.delete(l)},subscribePlantInfo(l,u){return o.plantInfo.add(l),u?.immediate&&n&&s.size===a.length&&l({current:e.plant,previous:e.plant}),()=>o.plantInfo.delete(l)},subscribeGarden(l,u){return o.garden.add(l),u?.immediate&&n&&s.size===a.length&&l({current:e.garden,previous:e.garden}),()=>o.garden.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.object.clear(),o.plantInfo.clear(),o.garden.clear(),n=false;}}}let no=null;function dh(){return no||(no=ch()),no}function uh(){let e=null;const t=[],n=new Set,r={},o=new Set,i=2;function a(u,p){return {x:p%u,y:Math.floor(p/u)}}function s(u,p,f){return f*u+p}function c(u,p){const{cols:f,rows:g}=u,m=f*g,h=new Set,y=new Set,S=new Map,w=[],x=u.userSlotIdxAndDirtTileIdxToGlobalTileIdx??[],I=u.userSlotIdxAndBoardwalkTileIdxToGlobalTileIdx??[],v=Math.max(x.length,I.length);for(let k=0;k<v;k++){const P=x[k]??[],E=I[k]??[],O=P.map((B,V)=>(h.add(B),S.set(B,k),{globalIndex:B,localIndex:V,position:a(f,B)})),ee=E.map((B,V)=>(y.add(B),S.set(B,k),{globalIndex:B,localIndex:V,position:a(f,B)}));w.push({userSlotIdx:k,dirtTiles:O,boardwalkTiles:ee,allTiles:[...O,...ee]});}const C=u.spawnTiles.map(k=>a(f,k)),T={};if(u.locations)for(const[k,P]of Object.entries(u.locations)){const E=P.spawnTileIdx??[];T[k]={name:k,spawnTiles:E,spawnPositions:E.map(O=>a(f,O))};}return {cols:f,rows:g,totalTiles:m,tileSize:p,spawnTiles:u.spawnTiles,spawnPositions:C,locations:T,userSlots:w,globalToXY(k){return a(f,k)},xyToGlobal(k,P){return s(f,k,P)},getTileOwner(k){return S.get(k)??null},isDirtTile(k){return h.has(k)},isBoardwalkTile(k){return y.has(k)}}}function d(){if(o.size<i||e)return;const u=r.map,p=r.tileSize??0;if(u){e=c(u,p);for(const f of n)f(e);n.clear();}}async function l(){const u=await de.subscribe("mapAtom",f=>{r.map=f,o.add("map"),d();});t.push(u);const p=await de.subscribe("tileSizeAtom",f=>{r.tileSize=f,o.add("tileSize"),d();});t.push(p);}return l(),{get(){return e},isReady(){return e!==null},onReady(u,p){return e?(p?.immediate!==false&&u(e),()=>{}):(n.add(u),()=>n.delete(u))},destroy(){for(const u of t)u();t.length=0,e=null,n.clear();}}}let ro=null;function jo(){return ro||(ro=uh()),ro}function ph(){const e=ce.get("mutations");return e?Object.keys(e):[]}function Ol(){const e={};for(const t of ph())e[t]=[];return e}function zo(){return {garden:null,mySlotIndex:null,plants:{all:[],mature:[],growing:[],bySpecies:{},count:0},crops:{all:[],mature:[],growing:[],mutated:{all:[],byMutation:Ol()}},eggs:{all:[],mature:[],growing:[],byType:{},count:0},decors:{tileObjects:[],boardwalk:[],all:[],byType:{},count:0},tiles:{tileObjects:[],boardwalk:[],empty:{tileObjects:[],boardwalk:[]}},counts:{plants:0,maturePlants:0,crops:0,matureCrops:0,eggs:0,matureEggs:0,decors:0,emptyTileObjects:0,emptyBoardwalk:0}}}function fh(e,t,n,r){const o=t.slots.filter(i=>r>=i.endTime).length;return {tileIndex:e,position:n,species:t.species,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:r>=t.maturedAt,slots:t.slots,slotsCount:t.slots.length,matureSlotsCount:o}}function gh(e,t,n,r,o){return {tileIndex:e,position:t,slotIndex:n,species:r.species,startTime:r.startTime,endTime:r.endTime,targetScale:r.targetScale,mutations:[...r.mutations],isMature:o>=r.endTime}}function mh(e,t,n,r){return {tileIndex:e,position:n,eggId:t.eggId,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:r>=t.maturedAt}}function wa(e,t,n,r){return {tileIndex:e,position:n,decorId:t.decorId,rotation:t.rotation,location:r}}function ka(e,t){const{garden:n,mySlotIndex:r}=e,o=Date.now();if(!n||r===null)return zo();const i=t().get(),a=i?.userSlots[r],s=a?.dirtTiles??[],c=a?.boardwalkTiles??[],d=[],l=[],u=[],p={},f=[],g=[],m=[],h=[],y=Ol(),S=[],w=[],x=[],I={},v=[],C=[],T={},k=new Set,P=new Set;for(const[B,V]of Object.entries(n.tileObjects)){const ae=parseInt(B,10);k.add(ae);const $=i?i.globalToXY(ae):{x:0,y:0};if(V.objectType==="plant"){const j=V,N=fh(B,j,$,o);d.push(N),N.isMature?l.push(N):u.push(N),p[N.species]||(p[N.species]=[]),p[N.species].push(N);for(let F=0;F<j.slots.length;F++){const _=j.slots[F],D=gh(B,$,F,_,o);if(f.push(D),D.isMature?g.push(D):m.push(D),D.mutations.length>0){h.push(D);for(const R of D.mutations)y[R]||(y[R]=[]),y[R].push(D);}}}else if(V.objectType==="egg"){const N=mh(B,V,$,o);S.push(N),I[N.eggId]||(I[N.eggId]=[]),I[N.eggId].push(N),N.isMature?w.push(N):x.push(N);}else if(V.objectType==="decor"){const N=wa(B,V,$,"tileObjects");v.push(N),T[N.decorId]||(T[N.decorId]=[]),T[N.decorId].push(N);}}for(const[B,V]of Object.entries(n.boardwalkTileObjects)){const ae=parseInt(B,10);P.add(ae);const $=i?i.globalToXY(ae):{x:0,y:0},N=wa(B,V,$,"boardwalk");C.push(N),T[N.decorId]||(T[N.decorId]=[]),T[N.decorId].push(N);}const E=[...v,...C],O=s.filter(B=>!k.has(B.localIndex)),ee=c.filter(B=>!P.has(B.localIndex));return {garden:n,mySlotIndex:r,plants:{all:d,mature:l,growing:u,bySpecies:p,count:d.length},crops:{all:f,mature:g,growing:m,mutated:{all:h,byMutation:y}},eggs:{all:S,mature:w,growing:x,byType:I,count:S.length},decors:{tileObjects:v,boardwalk:C,all:E,byType:T,count:E.length},tiles:{tileObjects:s,boardwalk:c,empty:{tileObjects:O,boardwalk:ee}},counts:{plants:d.length,maturePlants:l.length,crops:f.length,matureCrops:g.length,eggs:S.length,matureEggs:w.length,decors:E.length,emptyTileObjects:O.length,emptyBoardwalk:ee.length}}}function Sa(e){return JSON.stringify({plants:e.counts.plants,maturePlants:e.counts.maturePlants,crops:e.counts.crops,matureCrops:e.counts.matureCrops,eggs:e.counts.eggs,matureEggs:e.counts.matureEggs,decors:e.counts.decors,emptyTileObjects:e.counts.emptyTileObjects,emptyBoardwalk:e.counts.emptyBoardwalk})}function hh(e,t){const n=new Set(e.map(a=>a.tileIndex)),r=new Set(t.map(a=>a.tileIndex)),o=t.filter(a=>!n.has(a.tileIndex)),i=e.filter(a=>!r.has(a.tileIndex));return {added:o,removed:i}}function bh(e,t,n){const r=new Set(e.map(i=>i.tileIndex)),o=new Set(n.map(i=>i.tileIndex));return t.filter(i=>!r.has(i.tileIndex)&&o.has(i.tileIndex))}function yh(e,t,n){const r=new Set(e.map(i=>`${i.tileIndex}:${i.slotIndex}`)),o=new Set(n.map(i=>`${i.tileIndex}:${i.slotIndex}`));return t.filter(i=>{const a=`${i.tileIndex}:${i.slotIndex}`;return !r.has(a)&&o.has(a)})}function vh(e,t,n){const r=new Set(e.map(i=>i.tileIndex)),o=new Set(n.map(i=>i.tileIndex));return t.filter(i=>!r.has(i.tileIndex)&&o.has(i.tileIndex))}function xh(e,t){const n=[],r=new Map(e.map(o=>[o.tileIndex,o]));for(const o of t){const i=r.get(o.tileIndex);if(!i)continue;const a=Math.min(i.slots.length,o.slots.length);for(let s=0;s<a;s++){const c=new Set(i.slots[s].mutations),d=new Set(o.slots[s].mutations),l=[...d].filter(p=>!c.has(p)),u=[...c].filter(p=>!d.has(p));if(l.length>0||u.length>0){const p=Date.now(),f=o.slots[s],g={tileIndex:o.tileIndex,position:o.position,slotIndex:s,species:f.species,startTime:f.startTime,endTime:f.endTime,targetScale:f.targetScale,mutations:[...f.mutations],isMature:p>=f.endTime};n.push({crop:g,added:l,removed:u});}}}return n}function wh(e,t,n){const r=[],o=new Map(t.map(a=>[a.tileIndex,a])),i=new Map;for(const a of n)i.set(`${a.tileIndex}:${a.slotIndex}`,a);for(const a of e){const s=o.get(a.tileIndex);if(!s)continue;const c=Math.min(a.slots.length,s.slots.length);for(let d=0;d<c;d++){const l=a.slots[d],u=s.slots[d];if(l.startTime!==u.startTime){const p=i.get(`${a.tileIndex}:${d}`);if(!p||!p.isMature)continue;const f={tileIndex:a.tileIndex,position:a.position,slotIndex:d,species:l.species,startTime:l.startTime,endTime:l.endTime,targetScale:l.targetScale,mutations:[...l.mutations],isMature:true};r.push({crop:f,remainingSlots:s.slotsCount});}}if(s.slotsCount<a.slotsCount)for(let d=s.slotsCount;d<a.slotsCount;d++){const l=i.get(`${a.tileIndex}:${d}`);if(!l||!l.isMature)continue;const u=a.slots[d];if(!u)continue;const p={tileIndex:a.tileIndex,position:a.position,slotIndex:d,species:u.species,startTime:u.startTime,endTime:u.endTime,targetScale:u.targetScale,mutations:[...u.mutations],isMature:true};r.push({crop:p,remainingSlots:s.slotsCount});}}return r}function kh(e,t){const n=new Set(e.map(a=>a.tileIndex)),r=new Set(t.map(a=>a.tileIndex)),o=t.filter(a=>!n.has(a.tileIndex)),i=e.filter(a=>!r.has(a.tileIndex));return {added:o,removed:i}}function Sh(e,t){const n=c=>`${c.tileIndex}:${c.location}`,r=c=>`${c.tileIndex}:${c.location}`,o=new Set(e.map(n)),i=new Set(t.map(r)),a=t.filter(c=>!o.has(r(c))),s=e.filter(c=>!i.has(n(c)));return {added:a,removed:s}}function Ch(){let e=zo(),t=zo(),n=false;const r=[],o={all:new Set,stable:new Set,plantAdded:new Set,plantRemoved:new Set,plantMatured:new Set,cropMutated:new Set,cropMatured:new Set,cropHarvested:new Set,eggPlaced:new Set,eggRemoved:new Set,eggMatured:new Set,decorPlaced:new Set,decorRemoved:new Set},i={},a=new Set,s=2;function c(){if(a.size<s)return;const l=ka(i,jo);if(nt(e,l)||(t=e,e=l,!n))return;for(const w of o.all)w(e,t);if(Sa(t)!==Sa(e))for(const w of o.stable)w(e,t);const u=hh(t.plants.all,e.plants.all);for(const w of u.added)for(const x of o.plantAdded)x({plant:w});for(const w of u.removed)for(const x of o.plantRemoved)x({plant:w,tileIndex:w.tileIndex});const p=bh(t.plants.mature,e.plants.mature,e.plants.all);for(const w of p)for(const x of o.plantMatured)x({plant:w});const f=xh(t.plants.all,e.plants.all);for(const w of f)for(const x of o.cropMutated)x(w);const g=yh(t.crops.mature,e.crops.mature,e.crops.all);for(const w of g)for(const x of o.cropMatured)x({crop:w});const m=wh(t.plants.all,e.plants.all,t.crops.all);for(const w of m)for(const x of o.cropHarvested)x(w);const h=kh(t.eggs.all,e.eggs.all);for(const w of h.added)for(const x of o.eggPlaced)x({egg:w});for(const w of h.removed)for(const x of o.eggRemoved)x({egg:w});const y=vh(t.eggs.mature,e.eggs.mature,e.eggs.all);for(const w of y)for(const x of o.eggMatured)x({egg:w});const S=Sh(t.decors.all,e.decors.all);for(const w of S.added)for(const x of o.decorPlaced)x({decor:w});for(const w of S.removed)for(const x of o.decorRemoved)x({decor:w});}async function d(){if(n)return;const l=await Tp.onChangeNow(p=>{i.garden=p,a.add("garden"),c();});r.push(l);const u=await de.subscribe("myUserSlotIdxAtom",p=>{i.mySlotIndex=p,a.add("mySlotIndex"),c();});r.push(u),n=true,a.size===s&&(e=ka(i,jo));}return d(),{get(){return e},subscribe(l,u){return o.all.add(l),u?.immediate!==false&&n&&a.size===s&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,u){return o.stable.add(l),u?.immediate!==false&&n&&a.size===s&&l(e,e),()=>o.stable.delete(l)},subscribePlantAdded(l,u){if(o.plantAdded.add(l),u?.immediate&&n&&a.size===s)for(const p of e.plants.all)l({plant:p});return ()=>o.plantAdded.delete(l)},subscribePlantRemoved(l,u){return o.plantRemoved.add(l),()=>o.plantRemoved.delete(l)},subscribePlantMatured(l,u){if(o.plantMatured.add(l),u?.immediate&&n&&a.size===s)for(const p of e.plants.mature)l({plant:p});return ()=>o.plantMatured.delete(l)},subscribeCropMutated(l,u){if(o.cropMutated.add(l),u?.immediate&&n&&a.size===s)for(const p of e.crops.mutated.all)l({crop:p,added:p.mutations,removed:[]});return ()=>o.cropMutated.delete(l)},subscribeCropMatured(l,u){if(o.cropMatured.add(l),u?.immediate&&n&&a.size===s)for(const p of e.crops.mature)l({crop:p});return ()=>o.cropMatured.delete(l)},subscribeCropHarvested(l,u){return o.cropHarvested.add(l),()=>o.cropHarvested.delete(l)},subscribeEggPlaced(l,u){if(o.eggPlaced.add(l),u?.immediate&&n&&a.size===s)for(const p of e.eggs.all)l({egg:p});return ()=>o.eggPlaced.delete(l)},subscribeEggRemoved(l,u){return o.eggRemoved.add(l),()=>o.eggRemoved.delete(l)},subscribeEggMatured(l,u){if(o.eggMatured.add(l),u?.immediate&&n&&a.size===s)for(const p of e.eggs.mature)l({egg:p});return ()=>o.eggMatured.delete(l)},subscribeDecorPlaced(l,u){if(o.decorPlaced.add(l),u?.immediate&&n&&a.size===s)for(const p of e.decors.all)l({decor:p});return ()=>o.decorPlaced.delete(l)},subscribeDecorRemoved(l,u){return o.decorRemoved.add(l),()=>o.decorRemoved.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.plantAdded.clear(),o.plantRemoved.clear(),o.plantMatured.clear(),o.cropMutated.clear(),o.cropMatured.clear(),o.cropHarvested.clear(),o.eggPlaced.clear(),o.eggRemoved.clear(),o.eggMatured.clear(),o.decorPlaced.clear(),o.decorRemoved.clear(),n=false;}}}let oo=null;function Nl(){return oo||(oo=Ch()),oo}const on={Gold:25,Rainbow:50,Frozen:10,Chilled:5,Wet:2},Ah=new Set(["Gold","Rainbow"]),Ih=new Set(["Frozen","Chilled","Wet"]);function $l(e){let t=1,n=0,r=0;for(const o of e)o==="Gold"||o==="Rainbow"?o==="Rainbow"?t=on.Rainbow:t===1&&(t=on.Gold):o in on&&(n+=on[o],r++);return t*(1+n-r)}function Th(e){return on[e]??null}function Ph(e){return Ah.has(e)}function Eh(e){return Ih.has(e)}function Mh(e,t){const n=Oi(e);if(!n)return 50;const r=n.maxScale;if(t<=1)return 50;if(t>=r)return 100;const o=(t-1)/(r-1);return Math.floor(50+50*o)}function Lh(e,t,n){const r=Oi(e);if(!r)return 0;const o=r.baseSellPrice,i=$l(n);return Math.round(o*t*i)}function _h(e,t,n){if(n>=t)return 100;if(n<=e)return 0;const r=t-e,o=n-e;return Math.floor(o/r*100)}function Fh(e,t){return t>=e}function Oi(e){const t=ce.get("plants");if(!t)return null;const n=t[e];return n?.crop?{baseSellPrice:n.crop.baseSellPrice??0,maxScale:n.crop.maxScale??1,growTime:n.crop.growTime??0}:null}const Dl=3600,io=80,Rh=100,an=30;function Br(e){return e/Dl}function jr(e,t){const n=En(e);if(!n)return io;const r=n.maxScale;if(t<=1)return io;if(t>=r)return Rh;const o=(t-1)/(r-1);return Math.floor(io+20*o)}function zr(e,t,n){const r=En(e);if(!r)return n-an;const o=r.hoursToMature,i=t/Dl,a=an/o,s=Math.min(a*i,an),c=n-an;return Math.floor(c+s)}function Gr(e,t){const n=En(e);return n?t>=n.hoursToMature:false}function Bl(e){const t=En(e);return t?an/t.hoursToMature:0}function Oh(e,t,n){const r=t-e;return r<=0||n<=0?0:r/n}function En(e){const t=ce.get("pets");if(!t)return null;const n=t[e];return n?{hoursToMature:n.hoursToMature??0,maxScale:n.maxScale??1,abilities:n.abilities??[]}:null}function Nh(e,t){return t<=0?1:Math.min(1,e/t)}const jl={init(){},isReady(){return  true},crop:{calculateSize:Mh,calculateSellPrice:Lh,calculateProgress:_h,isReady:Fh,getData:Oi},pet:{calculateAge:Br,calculateMaxStrength:jr,calculateCurrentStrength:zr,isMature:Gr,calculateStrengthPerHour:Bl,getData:En},mutation:{calculateMultiplier:$l,getValue:Th,isGrowth:Ph,isEnvironmental:Eh}},Ca={inventory:"myPetInventoryAtom",hutch:"myPetHutchPetItemsAtom",active:"myPetInfosAtom",slotInfos:"myPetSlotInfosAtom",expandedPetSlotId:"expandedPetSlotIdAtom",myNumPetHutchItems:"myNumPetHutchItemsAtom",activityLogs:"myDataAtom"};function Aa(e,t){const n=Br(e.xp),r=jr(e.petSpecies,e.targetScale),o=zr(e.petSpecies,e.xp,r),i=Gr(e.petSpecies,n);return {id:e.id,petSpecies:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,mutations:[...e.mutations],targetScale:e.targetScale,abilities:[...e.abilities],location:t,position:null,lastAbilityTrigger:null,growthStage:n,currentStrength:o,maxStrength:r,isMature:i}}function $h(e,t){const r=t[e.slot.id]?.lastAbilityTrigger??null,o=Br(e.slot.xp),i=jr(e.slot.petSpecies,e.slot.targetScale),a=zr(e.slot.petSpecies,e.slot.xp,i),s=Gr(e.slot.petSpecies,o);return {id:e.slot.id,petSpecies:e.slot.petSpecies,name:e.slot.name,xp:e.slot.xp,hunger:e.slot.hunger,mutations:[...e.slot.mutations],targetScale:e.slot.targetScale,abilities:[...e.slot.abilities],location:"active",position:e.position?{x:e.position.x,y:e.position.y}:null,lastAbilityTrigger:r,growthStage:o,currentStrength:a,maxStrength:i,isMature:s}}const Ia=500;let Je=[],mr=0;function Dh(){try{const e=Se(os.GLOBAL.MY_PETS_ABILITY_LOGS,[]);if(!Array.isArray(e))return [];const t=e.filter(n=>typeof n=="object"&&n!==null&&typeof n.petId=="string"&&typeof n.petName=="string"&&typeof n.petSpecies=="string"&&typeof n.abilityId=="string"&&typeof n.performedAt=="number");return t.length<e.length&&console.log(`[myPets] Migrated ability logs: removed ${e.length-t.length} old entries`),t.length>0&&(mr=Math.max(...t.map(n=>n.performedAt))),t}catch(e){return console.error("[myPets] Failed to load ability logs from storage:",e),[]}}function Bh(e){try{Le(os.GLOBAL.MY_PETS_ABILITY_LOGS,e);}catch(t){console.error("[myPets] Failed to save ability logs to storage:",t);}}function jh(e){try{const n=e.parameters.pet;return !n||!n.id||!n.petSpecies?null:{petId:n.id,petName:n.name||n.petSpecies,petSpecies:n.petSpecies,abilityId:e.action,data:e.parameters,performedAt:e.timestamp}}catch(t){return console.error("[myPets] Failed to convert activity log:",t),null}}function zh(e){if(!e||!Array.isArray(e))return;const t=lp(e),n=[];for(const r of t)if(r.timestamp>mr){const o=jh(r);o&&n.push(o);}n.length!==0&&(mr=Math.max(...n.map(r=>r.performedAt),mr),Je=[...n,...Je],Je.length>Ia&&(Je=Je.slice(0,Ia)),Bh(Je),console.log(`[myPets] Processed ${n.length} new ability logs (total: ${Je.length})`));}function Ta(e){const t=new Set,n=[];for(const f of e.active??[]){const g=$h(f,e.slotInfos??{});n.push(g),t.add(g.id);}const r=[];for(const f of e.inventory??[]){if(t.has(f.id))continue;const g=Aa(f,"inventory");r.push(g),t.add(g.id);}const o=[];for(const f of e.hutch??[]){if(t.has(f.id))continue;const g=Aa(f,"hutch");o.push(g),t.add(g.id);}const i=[...n,...r,...o],a=e.expandedPetSlotId??null,s=a?i.find(f=>f.id===a)??null:null,l=Nl().get().decors.all.some(f=>f.decorId==="PetHutch"),u=e.myNumPetHutchItems??0;return {all:i,byLocation:{inventory:r,hutch:o,active:n},counts:{inventory:r.length,hutch:o.length,active:n.length,total:i.length},hutch:{hasHutch:l,currentItems:u,maxItems:25},expandedPetSlotId:a,expandedPet:s,abilityLogs:[...Je]}}const Pa={all:[],byLocation:{inventory:[],hutch:[],active:[]},counts:{inventory:0,hutch:0,active:0,total:0},hutch:{hasHutch:false,currentItems:0,maxItems:25},expandedPetSlotId:null,expandedPet:null,abilityLogs:[]};function Gh(e,t){if(e.length!==t.length)return  false;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return  false;return  true}function Ea(e){return JSON.stringify({id:e.id,petSpecies:e.petSpecies,name:e.name,mutations:e.mutations,abilities:e.abilities,location:e.location})}function Hh(e,t){if(e.all.length!==t.all.length)return  false;const n=e.all.map(Ea),r=t.all.map(Ea);return Gh(n,r)}function Wh(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const i=r.get(o.id);i&&i.location!==o.location&&n.push({pet:o,from:i.location,to:o.location});}return n}function Uh(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){if(!o.lastAbilityTrigger)continue;const a=r.get(o.id)?.lastAbilityTrigger;(!a||a.abilityId!==o.lastAbilityTrigger.abilityId||a.performedAt!==o.lastAbilityTrigger.performedAt)&&n.push({pet:o,trigger:o.lastAbilityTrigger});}return n}function Vh(e,t){const n=new Set(e.all.map(a=>a.id)),r=new Set(t.all.map(a=>a.id)),o=t.all.filter(a=>!n.has(a.id)),i=e.all.filter(a=>!r.has(a.id));return o.length===0&&i.length===0?null:{added:o,removed:i,counts:t.counts}}function Kh(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const i=r.get(o.id);i&&o.growthStage>i.growthStage&&n.push({pet:o,previousStage:i.growthStage,newStage:o.growthStage});}return n}function Yh(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const i=r.get(o.id);i&&o.currentStrength>i.currentStrength&&n.push({pet:o,previousStrength:i.currentStrength,newStrength:o.currentStrength});}return n}function qh(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const i=r.get(o.id);i&&o.currentStrength===o.maxStrength&&i.currentStrength<i.maxStrength&&n.push({pet:o});}return n}function Xh(){let e=Pa,t=Pa,n=false;const r=[],o={all:new Set,stable:new Set,location:new Set,ability:new Set,count:new Set,expandedPet:new Set,growth:new Set,strengthGain:new Set,maxStrength:new Set},i={},a=Object.keys(Ca),s=new Set;function c(){if(s.size<a.length)return;if(i.activityLogs){const y=i.activityLogs?.activityLogs||i.activityLogs;Array.isArray(y)&&zh(y);}const l=Ta(i);if(nt(e,l)||(t=e,e=l,!n))return;for(const y of o.all)y(e,t);if(!Hh(t,e))for(const y of o.stable)y(e,t);const u=Wh(t,e);for(const y of u)for(const S of o.location)S(y);const p=Uh(t,e);for(const y of p)for(const S of o.ability)S(y);const f=Vh(t,e);if(f)for(const y of o.count)y(f);const g=Kh(t,e);for(const y of g)for(const S of o.growth)S(y);const m=Yh(t,e);for(const y of m)for(const S of o.strengthGain)S(y);const h=qh(t,e);for(const y of h)for(const S of o.maxStrength)S(y);if(t.expandedPetSlotId!==e.expandedPetSlotId){const y={current:e.expandedPet,previous:t.expandedPet,currentId:e.expandedPetSlotId,previousId:t.expandedPetSlotId};for(const S of o.expandedPet)S(y);}}async function d(){if(n)return;Je=Dh(),console.log(`[myPets] Loaded ${Je.length} ability logs from storage`);const l=a.map(async u=>{const p=Ca[u],f=await de.subscribe(p,g=>{i[u]=g,s.add(u),c();});r.push(f);});await Promise.all(l),n=true,s.size===a.length&&(e=Ta(i));}return d(),{get(){return e},subscribe(l,u){return o.all.add(l),u?.immediate!==false&&n&&s.size===a.length&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,u){return o.stable.add(l),u?.immediate!==false&&n&&s.size===a.length&&l(e,e),()=>o.stable.delete(l)},subscribeLocation(l,u){if(o.location.add(l),u?.immediate&&n&&s.size===a.length)for(const p of e.all)l({pet:p,from:p.location,to:p.location});return ()=>o.location.delete(l)},subscribeAbility(l,u){if(o.ability.add(l),u?.immediate&&n&&s.size===a.length)for(const p of e.all)p.lastAbilityTrigger&&l({pet:p,trigger:p.lastAbilityTrigger});return ()=>o.ability.delete(l)},subscribeCount(l,u){return o.count.add(l),u?.immediate&&n&&s.size===a.length&&l({added:e.all,removed:[],counts:e.counts}),()=>o.count.delete(l)},subscribeExpandedPet(l,u){return o.expandedPet.add(l),u?.immediate&&n&&s.size===a.length&&l({current:e.expandedPet,previous:e.expandedPet,currentId:e.expandedPetSlotId,previousId:e.expandedPetSlotId}),()=>o.expandedPet.delete(l)},subscribeGrowth(l,u){if(o.growth.add(l),u?.immediate&&n&&s.size===a.length)for(const p of e.all)l({pet:p,previousStage:p.growthStage,newStage:p.growthStage});return ()=>o.growth.delete(l)},subscribeStrengthGain(l,u){if(o.strengthGain.add(l),u?.immediate&&n&&s.size===a.length)for(const p of e.all)l({pet:p,previousStrength:p.currentStrength,newStrength:p.currentStrength});return ()=>o.strengthGain.delete(l)},subscribeMaxStrength(l,u){if(o.maxStrength.add(l),u?.immediate&&n&&s.size===a.length)for(const p of e.all)p.currentStrength===p.maxStrength&&l({pet:p});return ()=>o.maxStrength.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.location.clear(),o.ability.clear(),o.count.clear(),o.expandedPet.clear(),o.growth.clear(),o.strengthGain.clear(),o.maxStrength.clear(),n=false;}}}let ao=null;function Mn(){return ao||(ao=Xh()),ao}const Ma={inventory:"myInventoryAtom",isFull:"isMyInventoryAtMaxLengthAtom",selectedItemIndex:"myValidatedSelectedItemIndexAtom"},La={items:[],favoritedItemIds:[],count:0,isFull:false,selectedItem:null};function _a(e){const t=e.inventory,n=t?.items??[],r=t?.favoritedItemIds??[],o=e.selectedItemIndex;let i=null;return o!==null&&o>=0&&o<n.length&&(i={index:o,item:n[o]}),{items:n,favoritedItemIds:r,count:n.length,isFull:e.isFull??false,selectedItem:i}}function Fa(e){const t=e.items.map(n=>"id"in n?n.id:"species"in n&&n.itemType==="Seed"?`seed:${n.species}:${n.quantity}`:"toolId"in n?`tool:${n.toolId}:${n.quantity}`:"eggId"in n?`egg:${n.eggId}:${n.quantity}`:"decorId"in n?`decor:${n.decorId}:${n.quantity}`:JSON.stringify(n));return JSON.stringify({itemKeys:t,favoritedItemIds:e.favoritedItemIds,isFull:e.isFull,selectedItemIndex:e.selectedItem?.index??null})}function Jh(e,t){return Fa(e)===Fa(t)}function Qh(e,t){return e===null&&t===null?false:e===null||t===null?true:e.index!==t.index}function Xn(e){return "id"in e?e.id:"species"in e&&e.itemType==="Seed"?`seed:${e.species}`:"toolId"in e?`tool:${e.toolId}`:"eggId"in e?`egg:${e.eggId}`:"decorId"in e?`decor:${e.decorId}`:JSON.stringify(e)}function Zh(e,t){const n=new Set(e.map(Xn)),r=new Set(t.map(Xn)),o=t.filter(a=>!n.has(Xn(a))),i=e.filter(a=>!r.has(Xn(a)));return o.length===0&&i.length===0?null:{added:o,removed:i,counts:{before:e.length,after:t.length}}}function eb(e,t){const n=new Set(e),r=new Set(t),o=t.filter(a=>!n.has(a)),i=e.filter(a=>!r.has(a));return o.length===0&&i.length===0?null:{added:o,removed:i,current:t}}function tb(){let e=La,t=La,n=false;const r=[],o={all:new Set,stable:new Set,selection:new Set,items:new Set,favorites:new Set},i={},a=Object.keys(Ma),s=new Set;function c(){if(s.size<a.length)return;const l=_a(i);if(nt(e,l)||(t=e,e=l,!n))return;for(const f of o.all)f(e,t);if(!Jh(t,e))for(const f of o.stable)f(e,t);if(Qh(t.selectedItem,e.selectedItem)){const f={current:e.selectedItem,previous:t.selectedItem};for(const g of o.selection)g(f);}const u=Zh(t.items,e.items);if(u)for(const f of o.items)f(u);const p=eb(t.favoritedItemIds,e.favoritedItemIds);if(p)for(const f of o.favorites)f(p);}async function d(){if(n)return;const l=a.map(async u=>{const p=Ma[u],f=await de.subscribe(p,g=>{i[u]=g,s.add(u),c();});r.push(f);});await Promise.all(l),n=true,s.size===a.length&&(e=_a(i));}return d(),{get(){return e},subscribe(l,u){return o.all.add(l),u?.immediate!==false&&n&&s.size===a.length&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,u){return o.stable.add(l),u?.immediate!==false&&n&&s.size===a.length&&l(e,e),()=>o.stable.delete(l)},subscribeSelection(l,u){return o.selection.add(l),u?.immediate&&n&&s.size===a.length&&l({current:e.selectedItem,previous:e.selectedItem}),()=>o.selection.delete(l)},subscribeItems(l,u){return o.items.add(l),u?.immediate&&n&&s.size===a.length&&l({added:e.items,removed:[],counts:{before:0,after:e.count}}),()=>o.items.delete(l)},subscribeFavorites(l,u){return o.favorites.add(l),u?.immediate&&n&&s.size===a.length&&l({added:e.favoritedItemIds,removed:[],current:e.favoritedItemIds}),()=>o.favorites.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.selection.clear(),o.items.clear(),o.favorites.clear(),n=false;}}}let so=null;function _t(){return so||(so=tb()),so}const Go={all:[],host:null,myPlayer:null,count:0};function nb(e,t,n){const r=n.get(e.id),o=r?.slot,i=o?.data,a=o?.lastActionEvent;return {id:e.id,name:e.name,discordId:e.databaseUserId,discordAvatarUrl:e.discordAvatarUrl,guildId:e.guildId,isConnected:e.isConnected,isHost:e.id===t,slotIndex:r?.index??null,position:o?.position??null,cosmetic:{color:e.cosmetic?.color??"",avatar:e.cosmetic?.avatar?[...e.cosmetic.avatar]:[]},emote:{type:e.emoteData?.emoteType??-1},coins:i?.coinsCount??0,inventory:i?.inventory??null,shopPurchases:i?.shopPurchases??null,garden:i?.garden??null,pets:{slots:i?.petSlots??[],slotInfos:o?.petSlotInfos??null},journal:i?.journal??null,stats:i?.stats??null,tasksCompleted:i?.tasksCompleted??[],activityLogs:i?.activityLogs??[],customRestocks:{config:i?.customRestocks??null,inventories:o?.customRestockInventories??null},lastAction:a?{type:a.action,data:a.data,timestamp:a.timestamp}:null,selectedItemIndex:o?.notAuthoritative_selectedItemIndex??null,lastSlotMachineInfo:o?.lastSlotMachineInfo??null}}function Ra(e){const t=e.players,n=e.hostPlayerId??"",r=e.userSlots??[],o=e.myUserSlotIndex;if(!t||!Array.isArray(t)||t.length===0)return Go;const i=new Map;Array.isArray(r)&&r.forEach((d,l)=>{d?.type==="user"&&d?.playerId&&i.set(d.playerId,{slot:d,index:l});});const a=t.map(d=>nb(d,n,i)),s=a.find(d=>d.isHost)??null,c=o!==null?a.find(d=>d.slotIndex===o)??null:null;return {all:a,host:s,myPlayer:c,count:a.length}}function Oa(e){const t=e.all.map(n=>`${n.id}:${n.isConnected}:${n.isHost}`);return JSON.stringify({playerKeys:t,hostId:e.host?.id??null,count:e.count})}function rb(e,t){const n=[],r=new Set(e.map(i=>i.id)),o=new Set(t.map(i=>i.id));for(const i of t)r.has(i.id)||n.push({player:i,type:"join"});for(const i of e)o.has(i.id)||n.push({player:i,type:"leave"});return n}function ob(e,t){const n=[],r=new Map(e.map(o=>[o.id,o]));for(const o of t){const i=r.get(o.id);i&&i.isConnected!==o.isConnected&&n.push({player:o,isConnected:o.isConnected});}return n}function ib(){let e=Go,t=Go,n=false;const r=[],o={all:new Set,stable:new Set,joinLeave:new Set,connection:new Set,host:new Set},i={},a=new Set,s=4;function c(){if(a.size<s)return;const l=Ra(i);if(nt(e,l)||(t=e,e=l,!n))return;for(const m of o.all)m(e,t);if(Oa(t)!==Oa(e))for(const m of o.stable)m(e,t);const u=rb(t.all,e.all);for(const m of u)for(const h of o.joinLeave)h(m);const p=ob(t.all,e.all);for(const m of p)for(const h of o.connection)h(m);const f=t.host?.id??null,g=e.host?.id??null;if(f!==g){const m={current:e.host,previous:t.host};for(const h of o.host)h(m);}}async function d(){if(n)return;const l=await Ap.onChangeNow(g=>{i.players=g,a.add("players"),c();});r.push(l);const u=await Ip.onChangeNow(g=>{i.hostPlayerId=g,a.add("hostPlayerId"),c();});r.push(u);const p=await Cp.onChangeNow(g=>{i.userSlots=g,a.add("userSlots"),c();});r.push(p);const f=await de.subscribe("myUserSlotIdxAtom",g=>{i.myUserSlotIndex=g,a.add("myUserSlotIndex"),c();});r.push(f),n=true,a.size===s&&(e=Ra(i));}return d(),{get(){return e},subscribe(l,u){return o.all.add(l),u?.immediate!==false&&n&&a.size===s&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,u){return o.stable.add(l),u?.immediate!==false&&n&&a.size===s&&l(e,e),()=>o.stable.delete(l)},subscribeJoinLeave(l,u){if(o.joinLeave.add(l),u?.immediate&&n&&a.size===s)for(const p of e.all)l({player:p,type:"join"});return ()=>o.joinLeave.delete(l)},subscribeConnection(l,u){if(o.connection.add(l),u?.immediate&&n&&a.size===s)for(const p of e.all)l({player:p,isConnected:p.isConnected});return ()=>o.connection.delete(l)},subscribeHost(l,u){return o.host.add(l),u?.immediate&&n&&a.size===s&&l({current:e.host,previous:e.host}),()=>o.host.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.joinLeave.clear(),o.connection.clear(),o.host.clear(),n=false;}}}let lo=null;function zl(){return lo||(lo=ib()),lo}const Ln=["seed","tool","egg","decor"];function ab(e,t){switch(t){case "seed":return e.species??e.itemType;case "tool":return e.toolId??e.itemType;case "egg":return e.eggId??e.itemType;case "decor":return e.decorId??e.itemType;default:return e.itemType}}function sb(e,t,n){const r=ab(e,t),o=n[r]??0,i=Math.max(0,e.initialStock-o);return {id:r,itemType:e.itemType,initialStock:e.initialStock,purchased:o,remaining:i,isAvailable:i>0}}function lb(e,t,n){if(!t)return {type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null};const o=n[e]?.purchases??{},i=(t.inventory??[]).map(d=>sb(d,e,o)),a=i.filter(d=>d.isAvailable).length,s=t.secondsUntilRestock??0,c=s>0?Date.now()+s*1e3:null;return {type:e,items:i,availableCount:a,totalCount:i.length,secondsUntilRestock:s,restockAt:c}}function Na(e){const t=e.shops,n=e.purchases??{},r=Ln.map(s=>lb(s,t?.[s],n)),o={seed:r[0],tool:r[1],egg:r[2],decor:r[3]},i=r.filter(s=>s.restockAt!==null);let a=null;if(i.length>0){const c=i.sort((d,l)=>(d.restockAt??0)-(l.restockAt??0))[0];a={shop:c.type,seconds:c.secondsUntilRestock,at:c.restockAt};}return {all:r,byType:o,nextRestock:a}}const $a={all:Ln.map(e=>({type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null})),byType:{seed:{type:"seed",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},tool:{type:"tool",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},egg:{type:"egg",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},decor:{type:"decor",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null}},nextRestock:null};function Da(e){return JSON.stringify({shops:e.all.map(t=>({type:t.type,itemCount:t.items.length,availableCount:t.availableCount}))})}function cb(e,t){const n=e.secondsUntilRestock,r=t.secondsUntilRestock;return n>0&&n<=5&&r>n||n>0&&r===0&&t.items.some(i=>i.purchased===0)?{shop:t,previousItems:e.items}:null}function db(e,t){const n=[];for(const r of Ln){const o=e.byType[r],i=t.byType[r],a=new Map(o.items.map(s=>[s.id,s]));for(const s of i.items){const c=a.get(s.id);c&&s.purchased>c.purchased&&n.push({shopType:r,itemId:s.id,quantity:s.purchased-c.purchased,newPurchased:s.purchased,remaining:s.remaining});}}return n}function ub(e,t){const n=[];for(const r of Ln){const o=e.byType[r],i=t.byType[r],a=new Map(o.items.map(s=>[s.id,s]));for(const s of i.items){const c=a.get(s.id);c&&c.isAvailable!==s.isAvailable&&n.push({shopType:r,itemId:s.id,wasAvailable:c.isAvailable,isAvailable:s.isAvailable});}}return n}function pb(){let e=$a,t=$a,n=false;const r=[],o={all:new Set,stable:new Set,seedRestock:new Set,toolRestock:new Set,eggRestock:new Set,decorRestock:new Set,purchase:new Set,availability:new Set},i={},a=new Set,s=2;function c(){if(a.size<s)return;const l=Na(i);if(nt(e,l)||(t=e,e=l,!n))return;for(const g of o.all)g(e,t);if(Da(t)!==Da(e))for(const g of o.stable)g(e,t);const u={seed:o.seedRestock,tool:o.toolRestock,egg:o.eggRestock,decor:o.decorRestock};for(const g of Ln){const m=cb(t.byType[g],e.byType[g]);if(m)for(const h of u[g])h(m);}const p=db(t,e);for(const g of p)for(const m of o.purchase)m(g);const f=ub(t,e);for(const g of f)for(const m of o.availability)m(g);}async function d(){if(n)return;const l=await Pp.onChangeNow(p=>{i.shops=p,a.add("shops"),c();});r.push(l);const u=await Ep.onChangeNow(p=>{i.purchases=p,a.add("purchases"),c();});r.push(u),n=true,a.size===s&&(e=Na(i));}return d(),{get(){return e},getShop(l){return e.byType[l]},getItem(l,u){return e.byType[l].items.find(f=>f.id===u)??null},subscribe(l,u){return o.all.add(l),u?.immediate!==false&&n&&a.size===s&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,u){return o.stable.add(l),u?.immediate!==false&&n&&a.size===s&&l(e,e),()=>o.stable.delete(l)},subscribeSeedRestock(l,u){return o.seedRestock.add(l),u?.immediate&&n&&a.size===s&&l({shop:e.byType.seed,previousItems:[]}),()=>o.seedRestock.delete(l)},subscribeToolRestock(l,u){return o.toolRestock.add(l),u?.immediate&&n&&a.size===s&&l({shop:e.byType.tool,previousItems:[]}),()=>o.toolRestock.delete(l)},subscribeEggRestock(l,u){return o.eggRestock.add(l),u?.immediate&&n&&a.size===s&&l({shop:e.byType.egg,previousItems:[]}),()=>o.eggRestock.delete(l)},subscribeDecorRestock(l,u){return o.decorRestock.add(l),u?.immediate&&n&&a.size===s&&l({shop:e.byType.decor,previousItems:[]}),()=>o.decorRestock.delete(l)},subscribePurchase(l,u){if(o.purchase.add(l),u?.immediate&&n&&a.size===s)for(const p of e.all)for(const f of p.items)f.purchased>0&&l({shopType:p.type,itemId:f.id,quantity:f.purchased,newPurchased:f.purchased,remaining:f.remaining});return ()=>o.purchase.delete(l)},subscribeAvailability(l,u){if(o.availability.add(l),u?.immediate&&n&&a.size===s)for(const p of e.all)for(const f of p.items)l({shopType:p.type,itemId:f.id,wasAvailable:f.isAvailable,isAvailable:f.isAvailable});return ()=>o.availability.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.seedRestock.clear(),o.toolRestock.clear(),o.eggRestock.clear(),o.decorRestock.clear(),o.purchase.clear(),o.availability.clear(),n=false;}}}let co=null;function fb(){return co||(co=pb()),co}const gb=["Sunny","Rain","Frost","Dawn","AmberMoon"];function mb(e){return gb.includes(e)}const Ho={type:"Sunny",isActive:false,startTime:null,endTime:null,remainingSeconds:0};function hb(e){if(!e)return Ho;const t=Date.now(),n=e.endTime??0,r=Math.max(0,n-t),o=Math.floor(r/1e3),i=o>0,a=e.type??"Sunny";return {type:mb(a)?a:"Sunny",isActive:i,startTime:e.startTime??null,endTime:e.endTime??null,remainingSeconds:o}}function bb(){let e=Ho,t=Ho,n=false,r=null;const o={all:new Set,change:new Set};function i(s){const c=hb(s);if(e.type===c.type&&e.isActive===c.isActive&&e.startTime===c.startTime&&e.endTime===c.endTime){e=c;return}if(t=e,e=c,!!n){for(const d of o.all)d(e,t);if(t.type!==e.type||t.isActive!==e.isActive){const d={current:e,previous:t};for(const l of o.change)l(d);}}}async function a(){n||(r=await Mp.onChangeNow(s=>{i(s);}),n=true);}return a(),{get(){return e},subscribe(s,c){return o.all.add(s),c?.immediate!==false&&n&&s(e,e),()=>o.all.delete(s)},subscribeChange(s,c){return o.change.add(s),c?.immediate&&n&&s({current:e,previous:e}),()=>o.change.delete(s)},destroy(){r?.(),r=null,o.all.clear(),o.change.clear(),n=false;}}}let uo=null;function yb(){return uo||(uo=bb()),uo}let ke=null;function Gl(){return ke||(ke={currentTile:dh(),myPets:Mn(),gameMap:jo(),myInventory:_t(),players:zl(),shops:fb(),weather:yb(),myGarden:Nl()},ke)}function ot(){if(!ke)throw new Error("[Globals] Not initialized. Call initGlobals() first.");return ke}function vb(){ke&&(ke.currentTile.destroy(),ke.myPets.destroy(),ke.gameMap.destroy(),ke.myInventory.destroy(),ke.players.destroy(),ke.shops.destroy(),ke.weather.destroy(),ke.myGarden.destroy(),ke=null);}const it={get currentTile(){return ot().currentTile},get myPets(){return ot().myPets},get gameMap(){return ot().gameMap},get myInventory(){return ot().myInventory},get players(){return ot().players},get shops(){return ot().shops},get weather(){return ot().weather},get myGarden(){return ot().myGarden}},xb=100,po=[];function Wo(e,t,n){let r="";if(n&&typeof n=="object"){if(t==="PartialState"){const o=n.op||"",i=n.path||"";let a="";if("value"in n){const s=n.value;a=typeof s=="object"?`{${Object.keys(s||{}).slice(0,2).join(",")}}`:String(s);}if(o||i)r=`PartialState : ${o} ${i} ${a}`.trim();else {const s=Object.keys(n).filter(c=>c!=="type");s.length>0&&(r=`PartialState - {${s.join(", ")}}`);}}if(!r&&n.event&&(r+=`${n.event} `),!r&&n.op&&(r+=`op:${n.op} `),!r&&n.data){const o=Object.keys(n.data);o.length>0&&(r+=`{${o.slice(0,3).join(",")}${o.length>3?"...":""}}`);}else !r&&Array.isArray(n)&&(r+=`[${n.length} items]`);}else typeof n=="string"&&(r=n.slice(0,50));po.push({direction:e,type:String(t),timestamp:Date.now(),payload:n,summary:r.trim()||"-"}),po.length>xb&&po.shift();}const Pe={nativeCtor:null,captured:[],latestOpen:null},Ba=Symbol.for("ariesmod.ws.capture.wrapped"),ja=Symbol.for("ariesmod.ws.capture.native"),Hl=1;function Uo(e){return !!e&&e.readyState===Hl}function wb(){if(Uo(Pe.latestOpen))return Pe.latestOpen;for(let e=Pe.captured.length-1;e>=0;e--){const t=Pe.captured[e];if(Uo(t))return t}return null}function kb(e,t){Pe.captured.push(e),Pe.captured.length>25&&Pe.captured.splice(0,Pe.captured.length-25);const n=()=>{Pe.latestOpen=e,t&&console.log("[WS] captured socket opened",e.url);};e.addEventListener("open",n),e.addEventListener("close",()=>{Pe.latestOpen===e&&(Pe.latestOpen=null),t&&console.log("[WS] captured socket closed",e.url);}),e.addEventListener("message",r=>{try{const o=JSON.parse(r.data);Wo("in",o.type||"unknown",o);}catch{Wo("in","raw",r.data);}}),e.readyState===Hl&&n();}function Sb(e=L,t={}){const n=!!t.debug,r=e?.WebSocket;if(typeof r!="function")return ()=>{};if(r[Ba])return Pe.nativeCtor=r[ja]??Pe.nativeCtor??null,()=>{};const o=r;Pe.nativeCtor=o;function i(a,s){const c=s!==void 0?new o(a,s):new o(a);try{kb(c,n);}catch{}return c}try{i.prototype=o.prototype;}catch{}try{Object.setPrototypeOf(i,o);}catch{}try{i.CONNECTING=o.CONNECTING,i.OPEN=o.OPEN,i.CLOSING=o.CLOSING,i.CLOSED=o.CLOSED;}catch{}i[Ba]=true,i[ja]=o;try{e.WebSocket=i,n&&console.log("[WS] WebSocket capture installed");}catch{return ()=>{}}return ()=>{try{e.WebSocket===i&&(e.WebSocket=o);}catch{}}}function Cb(e=L){const t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function Pr(e=L){const t=wb();if(t)return {ws:t,source:"captured"};const n=Cb(e);return n?{ws:n,source:"roomConnection"}:{ws:null,source:null}}function Wl(e,t={}){const n=t.pageWindow??L,r=t.intervalMs??500,o=!!t.debug;let i=null,a=null;const s=()=>{const d=Pr(n);(d.ws!==i||d.source!==a)&&(i=d.ws,a=d.source,o&&console.log("[WS] best socket changed:",d.source,d.ws),e(d));};s();const c=setInterval(s,r);return ()=>clearInterval(c)}function Ab(e){if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return null}}function Ib(e,t=L){const n=t?.MagicCircle_RoomConnection;if(n&&typeof n.sendMessage=="function")try{return Array.isArray(e)?n.sendMessage(...e):n.sendMessage(e),{ok:!0}}catch(i){return {ok:false,reason:"error",error:i}}const{ws:r}=Pr(t);if(!r)return {ok:false,reason:"no-ws"};if(!Uo(r))return {ok:false,reason:"not-open"};const o=Ab(e);if(o==null)return {ok:false,reason:"error",error:new Error("Cannot stringify message")};try{const i=JSON.parse(o);Wo("out",i.type||"unknown",i);}catch{}try{return r.send(o),{ok:!0}}catch(i){return {ok:false,reason:"error",error:i}}}function Tb(e,t={},n=L){return Ib({type:e,...t},n)}const st={Welcome:"Welcome",PartialState:"PartialState",ServerErrorMessage:"ServerErrorMessage",Config:"Config",InappropriateContentRejected:"InappropriateContentRejected",Emote:"Emote",CurrencyTransaction:"CurrencyTransaction",Pong:"Pong"},M={Chat:"Chat",Emote:"Emote",Wish:"Wish",KickPlayer:"KickPlayer",SetPlayerData:"SetPlayerData",UsurpHost:"UsurpHost",Dev:"Dev",SetSelectedGame:"SetSelectedGame",VoteForGame:"VoteForGame",RequestGame:"RequestGame",RestartGame:"RestartGame",Ping:"Ping",PlayerPosition:"PlayerPosition",Teleport:"Teleport",CheckWeatherStatus:"CheckWeatherStatus",MoveInventoryItem:"MoveInventoryItem",DropObject:"DropObject",PickupObject:"PickupObject",ToggleFavoriteItem:"ToggleFavoriteItem",PutItemInStorage:"PutItemInStorage",RetrieveItemFromStorage:"RetrieveItemFromStorage",MoveStorageItem:"MoveStorageItem",LogItems:"LogItems",PlantSeed:"PlantSeed",WaterPlant:"WaterPlant",HarvestCrop:"HarvestCrop",SellAllCrops:"SellAllCrops",PurchaseSeed:"PurchaseSeed",PurchaseEgg:"PurchaseEgg",PurchaseTool:"PurchaseTool",PurchaseDecor:"PurchaseDecor",PlantEgg:"PlantEgg",HatchEgg:"HatchEgg",PlantGardenPlant:"PlantGardenPlant",PotPlant:"PotPlant",MutationPotion:"MutationPotion",PickupDecor:"PickupDecor",PlaceDecor:"PlaceDecor",RemoveGardenObject:"RemoveGardenObject",PlacePet:"PlacePet",FeedPet:"FeedPet",PetPositions:"PetPositions",SwapPet:"SwapPet",StorePet:"StorePet",NamePet:"NamePet",SellPet:"SellPet",ReportSpeakingStart:"ReportSpeakingStart"};var qe=(e=>(e[e.ReconnectInitiated=4100]="ReconnectInitiated",e[e.PlayerLeftVoluntarily=4200]="PlayerLeftVoluntarily",e[e.UserSessionSuperseded=4250]="UserSessionSuperseded",e[e.ConnectionSuperseded=4300]="ConnectionSuperseded",e[e.ServerDisposed=4310]="ServerDisposed",e[e.HeartbeatExpired=4400]="HeartbeatExpired",e[e.PlayerKicked=4500]="PlayerKicked",e[e.VersionMismatch=4700]="VersionMismatch",e[e.VersionExpired=4710]="VersionExpired",e[e.AuthenticationFailure=4800]="AuthenticationFailure",e))(qe||{});new Set(Object.values(st));new Set(Object.values(M));const Pb=["Room","Quinoa"],Eb={Room:["Room"],Quinoa:Pb};function J(e,t={},n=L){const r=t,{scopePath:o,scope:i,...a}=r,s=typeof o=="string"?o:i,c=Array.isArray(o)?o:s==="Room"||s==="Quinoa"?Eb[s]:null;return Tb(e,c?{scopePath:c,...a}:a,n)}function Mb(e,t=L){return J(M.Chat,{scope:"Room",message:e},t)}function Lb(e,t=L){return J(M.Emote,{scope:"Room",emoteType:e},t)}function _b(e,t=L){return J(M.Wish,{scope:"Quinoa",wish:e},t)}function Fb(e,t=L){return J(M.KickPlayer,{scope:"Room",playerId:e},t)}function Rb(e,t=L){return J(M.SetPlayerData,{scope:"Room",data:e},t)}function Ob(e=L){return J(M.UsurpHost,{scope:"Quinoa"},e)}function Nb(e=L){return J(M.ReportSpeakingStart,{scope:"Quinoa"},e)}function $b(e,t=L){return J(M.SetSelectedGame,{scope:"Room",gameId:e},t)}function Db(e,t=L){return J(M.VoteForGame,{scope:"Room",gameId:e},t)}function Bb(e,t=L){return J(M.RequestGame,{scope:"Room",gameId:e},t)}function jb(e=L){return J(M.RestartGame,{scope:"Room"},e)}function zb(e,t=L){return J(M.Ping,{scope:"Quinoa",id:e},t)}function Ul(e,t,n=L){return J(M.PlayerPosition,{scope:"Quinoa",x:e,y:t},n)}const Gb=Ul;function Hb(e,t,n=L){return J(M.Teleport,{scope:"Quinoa",x:e,y:t},n)}function Wb(e=L){return J(M.CheckWeatherStatus,{scope:"Quinoa"},e)}function Ub(e,t,n=L){return J(M.MoveInventoryItem,{scope:"Quinoa",fromIndex:e,toIndex:t},n)}function Vb(e,t=L){return J(M.DropObject,{scope:"Quinoa",slotIndex:e},t)}function Kb(e,t=L){return J(M.PickupObject,{scope:"Quinoa",objectId:e},t)}function Hr(e,t=L){return J(M.ToggleFavoriteItem,{scope:"Quinoa",itemId:e},t)}function Ni(e,t="PetHutch",n=L){return J(M.PutItemInStorage,{scope:"Quinoa",itemId:e,storageId:t},n)}function $i(e,t="PetHutch",n=L){return J(M.RetrieveItemFromStorage,{scope:"Quinoa",itemId:e,storageId:t},n)}function Yb(e,t,n=L){return J(M.MoveStorageItem,{scope:"Quinoa",fromIndex:e,toIndex:t},n)}function qb(e=L){return J(M.LogItems,{scope:"Quinoa"},e)}function Xb(e,t,n,r=L){return J(M.PlantSeed,{scope:"Quinoa",seedId:e,x:t,y:n},r)}function Jb(e,t=L){return J(M.WaterPlant,{scope:"Quinoa",plantId:e},t)}function Qb(e,t=L){return J(M.HarvestCrop,{scope:"Quinoa",cropId:e},t)}function Zb(e=L){return J(M.SellAllCrops,{scope:"Quinoa"},e)}function ey(e,t=L){return J(M.PurchaseDecor,{scope:"Quinoa",decorId:e},t)}function ty(e,t=L){return J(M.PurchaseEgg,{scope:"Quinoa",eggId:e},t)}function ny(e,t=L){return J(M.PurchaseTool,{scope:"Quinoa",toolId:e},t)}function ry(e,t=L){return J(M.PurchaseSeed,{scope:"Quinoa",seedId:e},t)}function oy(e,t,n,r=L){return J(M.PlantEgg,{scope:"Quinoa",eggId:e,x:t,y:n},r)}function iy(e,t=L){return J(M.HatchEgg,{scope:"Quinoa",eggId:e},t)}function ay(e,t,n,r=L){return J(M.PlantGardenPlant,{scope:"Quinoa",plantId:e,x:t,y:n},r)}function sy(e,t,n=L){return J(M.PotPlant,{scope:"Quinoa",plantId:e,potId:t},n)}function ly(e,t,n=L){return J(M.MutationPotion,{scope:"Quinoa",potionId:e,targetId:t},n)}function cy(e,t=L){return J(M.PickupDecor,{scope:"Quinoa",decorInstanceId:e},t)}function dy(e,t,n,r=L){return J(M.PlaceDecor,{scope:"Quinoa",decorId:e,x:t,y:n},r)}function uy(e,t=L){return J(M.RemoveGardenObject,{scope:"Quinoa",objectId:e},t)}function Vl(e,t={x:0,y:0},n="Dirt",r=0,o=L){return J(M.PlacePet,{scope:"Quinoa",itemId:e,position:t,tileType:n,localTileIndex:r},o)}function py(e,t,n=L){return J(M.FeedPet,{scope:"Quinoa",petId:e,foodItemId:t},n)}function fy(e,t=L){return J(M.PetPositions,{scope:"Quinoa",positions:e},t)}function Kl(e,t,n=L){return J(M.SwapPet,{scope:"Quinoa",petSlotId:e,petInventoryId:t},n)}function Yl(e,t=L){return J(M.StorePet,{scope:"Quinoa",itemId:e},t)}function gy(e,t,n=L){return J(M.NamePet,{scope:"Quinoa",petId:e,name:t},n)}function my(e,t=L){return J(M.SellPet,{scope:"Quinoa",petId:e},t)}let hr=null;const hn=new Set;function Vo(){const e=Et();if(!e.enabled){console.log("[AutoFavorite] Disabled");return}hn.clear(),hr=_t().subscribeItems(t=>{if(t.added.length>0){const n=Et();for(const r of t.added)by(r,n);}}),console.log(`✅ [AutoFavorite] Started - Watching ${e.simple.favoriteSpecies.length} species, ${e.simple.favoriteMutations.length} mutations`);}function ql(){hr&&(hr(),hr=null),hn.clear(),console.log("🛑 [AutoFavorite] Stopped");}function hy(e){const t=Et();t.enabled=e,t.simple.enabled=e,Rl(t),e?Vo():ql();}function by(e,t){if(e.itemType!=="Produce"&&e.itemType!=="Pet")return;if(!e.id){console.warn("[AutoFavorite] Item has no ID:",e);return}if(!(hn.has(e.id)||e.isFavorited||e.favorited)&&Xl(e,t.simple)){hn.add(e.id);try{Hr(e.id),console.log(`[AutoFavorite] ⭐ Favorited ${e.itemType}: ${e.species||e.id}`);}catch(r){console.error("[AutoFavorite] WebSocket error:",r),hn.delete(e.id);}}}function Xl(e,t){if(!t.enabled)return  false;const n=e.itemType==="Pet"?e.petSpecies:e.species;return n?!!(t.favoriteSpecies.includes(n)||t.favoriteMutations.length>0&&(e.mutations||[]).some(o=>t.favoriteMutations.includes(o))):false}function yy(){return Object.keys(ce.get("mutations")??{})}const Di={init(){this.isReady()||Vo();},isReady(){return ha()},DEFAULT_CONFIG:Fl,STORAGE_KEY:_i,loadConfig:Et,saveConfig:Fi,updateConfig:Rl,updateSimpleConfig:Ri,setFavoriteSpecies:Zm,setFavoriteMutations:eh,isEnabled:ha,start:Vo,stop:ql,setEnabled:hy,shouldFavorite:Xl,getGameMutations:yy},Bi=Ee.JOURNAL_CHECKER,Jl={enabled:false,autoRefresh:true,refreshIntervalMs:3e4};function qt(){return Se(Bi,Jl)}function Wr(e){Le(Bi,e);}function za(){return qt().enabled}function vy(e){const t=qt();t.autoRefresh=e,Wr(t);}function xy(e){const t=qt();t.refreshIntervalMs=e,Wr(t);}let fo=null,Ga=null;function Ql(){try{return zl().get().myPlayer?.journal||null}catch{return null}}function wy(e){return e?`pro:${Object.keys(e.produce).length}-pet:${Object.keys(e.pets).length}`:"null"}function Zl(){const e=ce.get("mutations")??{};return ["Normal",...Object.keys(e),"Max Weight"]}function ec(){const e=ce.get("mutations")??{};return ["Normal",...Object.entries(e).filter(([n,r])=>!("tileRef"in r)).map(([n])=>n),"Max Weight"]}function ky(){return Object.keys(ce.get("mutations")??{})}function tc(e){const n=(ce.get("pets")??{})[e];if(!n)return [];const r=new Set;return Array.isArray(n.abilities)&&n.abilities.forEach(o=>r.add(o)),Array.isArray(n.possibleAbilities)&&n.possibleAbilities.forEach(o=>r.add(o)),n.abilityTiers&&Object.values(n.abilityTiers).forEach(o=>{Array.isArray(o)&&o.forEach(i=>r.add(i));}),[...r]}function nc(e){const t=ce.get("plants")??{},n=Object.keys(t),r=Zl(),o=e?.produce??{},i=[];let a=0;for(const d of n){const u=o[d]?.variantsLogged?.map(f=>f.variant)??[],p=r.filter(f=>!u.includes(f));a+=u.length,i.push({species:d,variantsLogged:u,variantsMissing:p,variantsTotal:r.length,variantsPercentage:r.length>0?u.length/r.length*100:0,isComplete:p.length===0});}const s=n.length*r.length,c=i.filter(d=>d.variantsLogged.length>0).length;return {total:n.length,logged:c,percentage:n.length>0?c/n.length*100:0,speciesDetails:i,variantsTotal:s,variantsLogged:a,variantsPercentage:s>0?a/s*100:0}}function rc(e){const t=ce.get("pets")??{},n=Object.keys(t),r=ec(),o=e?.pets??{},i=[];let a=0,s=0,c=0,d=0;for(const u of n){const p=o[u],f=p?.variantsLogged?.map(S=>S.variant)??[],g=p?.abilitiesLogged?.map(S=>S.ability)??[],m=r.filter(S=>!f.includes(S)),h=tc(u),y=h.filter(S=>!g.includes(S));s+=r.length,a+=f.length,d+=h.length,c+=Math.min(g.length,h.length),i.push({species:u,variantsLogged:f,variantsMissing:m,variantsTotal:r.length,variantsPercentage:r.length>0?f.length/r.length*100:0,abilitiesLogged:g,abilitiesMissing:y,abilitiesTotal:h.length,abilitiesPercentage:h.length>0?g.length/h.length*100:0,isComplete:m.length===0&&(h.length===0||y.length===0)});}const l=i.filter(u=>u.variantsLogged.length>0).length;return {total:n.length,logged:l,percentage:n.length>0?l/n.length*100:0,speciesDetails:i,variantsTotal:s,variantsLogged:a,variantsPercentage:s>0?a/s*100:0,abilitiesTotal:d,abilitiesLogged:c,abilitiesPercentage:d>0?c/d*100:0}}async function Ur(e=false){await ce.waitForAny();const t=Ql(),n=wy(t);if(!e&&fo&&n===Ga)return fo;const r={plants:nc(t),pets:rc(t),lastUpdated:Date.now()};return fo=r,Ga=n,r}async function Sy(){const e=await Ur();return {plants:e.plants.speciesDetails.filter(t=>t.variantsMissing.length>0).map(t=>({species:t.species,missing:t.variantsMissing})),pets:e.pets.speciesDetails.filter(t=>t.variantsMissing.length>0||(t.abilitiesMissing?.length??0)>0).map(t=>({species:t.species,missingVariants:t.variantsMissing,missingAbilities:t.abilitiesMissing??[]}))}}let bn=null;function Ko(){const e=qt();e.enabled&&(e.autoRefresh&&!bn&&(bn=setInterval(async()=>{const t=await Ur();ji(t);},e.refreshIntervalMs)),console.log("✅ [JournalChecker] Started"));}function oc(){bn&&(clearInterval(bn),bn=null);}function Cy(e){const t=qt();t.enabled=e,Wr(t),e?Ko():oc();}function ji(e){window.dispatchEvent(new CustomEvent("gemini:journal-updated",{detail:e}));}async function Ay(){const e=await Ur();return ji(e),e}const ic={init(){this.isReady()||Ko();},isReady(){return za()},DEFAULT_CONFIG:Jl,STORAGE_KEY:Bi,loadConfig:qt,saveConfig:Wr,isEnabled:za,setAutoRefresh:vy,setRefreshInterval:xy,getMyJournal:Ql,getCropVariants:Zl,getPetVariants:ec,getAllMutations:ky,getPetAbilities:tc,calculateProduceProgress:nc,calculatePetProgress:rc,aggregateJournalProgress:Ur,getMissingSummary:Sy,start:Ko,stop:oc,setEnabled:Cy,refresh:Ay,dispatchUpdate:ji},zi=Ee.BULK_FAVORITE,ac={enabled:false,position:"top-right"};function _n(){return Se(zi,ac)}function sc(e){Le(zi,e);}function Iy(e){const t=_n();t.position=e,sc(t);}function lc(){return _n().enabled}function Ty(e){return typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"}async function Py(e){const t=_t().get();if(!t?.items)return console.warn("[BulkFavorite] No inventory data available"),0;const n=new Set(t.favoritedItemIds??[]);let r=0;for(const o of t.items){if(!Ty(o))continue;const i=n.has(o.id);e&&i||!e&&!i||(await Hr(o.id,e),r++,await Ey(50));}return console.log(`[BulkFavorite] ${e?"Favorited":"Unfavorited"} ${r} items`),r}function Ey(e){return new Promise(t=>setTimeout(t,e))}let Jn=false;const Er={init(){Jn||(Jn=true,console.log("✅ [MGBulkFavorite] Feature initialized"));},isReady(){return Jn},DEFAULT_CONFIG:ac,STORAGE_KEY:zi,loadConfig:_n,saveConfig:sc,isEnabled:lc,setPosition:Iy,bulkFavorite:Py,destroy(){Jn=false;}};class My{constructor(){H(this,"achievements",new Map);H(this,"data");H(this,"STORAGE_KEY",Ee.ACHIEVEMENTS);H(this,"onUnlockCallbacks",[]);H(this,"onProgressCallbacks",[]);this.data=this.loadData();}loadData(){return Se(this.STORAGE_KEY,{unlocked:{},progress:{}})}saveData(){Le(this.STORAGE_KEY,this.data);}register(t){this.achievements.set(t.id,t),this.data.progress[t.id]||(this.data.progress[t.id]={current:0,target:t.target,percentage:0});}registerMany(t){for(const n of t)this.register(n);}async checkAchievement(t){const n=this.achievements.get(t);if(!n)throw new Error(`Achievement not found: ${t}`);const r=this.isUnlocked(t),o=await n.checkProgress(),i={current:o,target:n.target,percentage:Math.min(100,Math.floor(o/n.target*100))},a=this.data.progress[t];this.data.progress[t]=i;const s=o>=n.target;return !r&&s?this.unlock(t,i):s||this.triggerProgressCallbacks({achievement:n,progress:i,previousProgress:a}),this.saveData(),{id:t,wasUnlocked:r,isUnlocked:s,progress:i}}async checkAllAchievements(){const t=[];for(const n of this.achievements.keys()){const r=await this.checkAchievement(n);t.push(r);}return t}unlock(t,n){const r=this.achievements.get(t);if(!r)return;const o={achievementId:t,unlockedAt:Date.now(),progress:n};this.data.unlocked[t]=o,this.saveData(),this.triggerUnlockCallbacks({achievement:r,unlockedAt:o.unlockedAt,progress:n});}isUnlocked(t){return !!this.data.unlocked[t]}getAchievement(t){return this.achievements.get(t)||null}getAllAchievements(){return Array.from(this.achievements.values())}getAchievementsByCategory(t){return Array.from(this.achievements.values()).filter(n=>n.category===t)}getAchievementsByRarity(t){return Array.from(this.achievements.values()).filter(n=>n.rarity===t)}getUnlockedAchievements(){return Object.values(this.data.unlocked)}getLockedAchievements(){return Array.from(this.achievements.values()).filter(t=>!this.isUnlocked(t.id)&&!t.hidden)}getProgress(t){return this.data.progress[t]||null}getCompletionPercentage(){const t=this.achievements.size,n=Object.keys(this.data.unlocked).length;return t>0?Math.floor(n/t*100):0}getCompletionStats(){const t=this.achievements.size,n=Object.keys(this.data.unlocked).length,r=t-n,o=this.getCompletionPercentage();return {total:t,unlocked:n,locked:r,percentage:o}}onUnlock(t){return this.onUnlockCallbacks.push(t),()=>{const n=this.onUnlockCallbacks.indexOf(t);n!==-1&&this.onUnlockCallbacks.splice(n,1);}}onProgress(t){return this.onProgressCallbacks.push(t),()=>{const n=this.onProgressCallbacks.indexOf(t);n!==-1&&this.onProgressCallbacks.splice(n,1);}}triggerUnlockCallbacks(t){for(const n of this.onUnlockCallbacks)try{n(t);}catch(r){console.warn("[Achievements] Unlock callback error:",r);}}triggerProgressCallbacks(t){for(const n of this.onProgressCallbacks)try{n(t);}catch(r){console.warn("[Achievements] Progress callback error:",r);}}reset(){this.data={unlocked:{},progress:{}};for(const t of this.achievements.values())this.data.progress[t.id]={current:0,target:t.target,percentage:0};this.saveData();}exportData(){return JSON.stringify(this.data,null,2)}importData(t){try{const n=JSON.parse(t);return this.data=n,this.saveData(),!0}catch(n){return console.warn("[Achievements] Failed to import data:",n),false}}}let yn=null;function Ge(){return yn||(yn=new My),yn}function Ly(){yn&&(yn=null);}let Qn=false;const cc={init(){Qn||(Ge(),Qn=true,console.log("✅ [MGAchievements] Initialized"));},isReady(){return Qn},getManager(){return Ge()},register:(...e)=>Ge().register(...e),registerMany:(...e)=>Ge().registerMany(...e),isUnlocked:(...e)=>Ge().isUnlocked(...e),getAll:()=>Ge().getAllAchievements(),getUnlocked:()=>Ge().getUnlockedAchievements(),getStats:()=>Ge().getCompletionStats(),checkAll:()=>Ge().checkAllAchievements(),onUnlock:(...e)=>Ge().onUnlock(...e),onProgress:(...e)=>Ge().onProgress(...e),destroy(){Ly(),Qn=false;}},_y={enabled:true},dc=Ee.ANTI_AFK,Fy=["visibilitychange","blur","focus","focusout","pagehide","freeze","resume"],Ry=25e3,Oy=1,Ny=1e-5,re={listeners:[],savedProps:{hidden:void 0,visibilityState:void 0,hasFocus:null},audioCtx:null,oscillator:null,gainNode:null,heartbeatInterval:null};function $y(){const e=(t,n)=>{const r=o=>{o.stopImmediatePropagation(),o.preventDefault?.();};t.addEventListener(n,r,{capture:true}),re.listeners.push({type:n,handler:r,target:t});};for(const t of Fy)e(document,t),e(window,t);}function Dy(){for(const{type:e,handler:t,target:n}of re.listeners)try{n.removeEventListener(e,t,{capture:!0});}catch{}re.listeners.length=0;}function By(){const e=Object.getPrototypeOf(document);re.savedProps.hidden=Object.getOwnPropertyDescriptor(e,"hidden"),re.savedProps.visibilityState=Object.getOwnPropertyDescriptor(e,"visibilityState"),re.savedProps.hasFocus=document.hasFocus?document.hasFocus.bind(document):null;try{Object.defineProperty(e,"hidden",{configurable:!0,get:()=>!1});}catch{}try{Object.defineProperty(e,"visibilityState",{configurable:!0,get:()=>"visible"});}catch{}try{document.hasFocus=()=>!0;}catch{}}function jy(){const e=Object.getPrototypeOf(document);try{re.savedProps.hidden&&Object.defineProperty(e,"hidden",re.savedProps.hidden);}catch{}try{re.savedProps.visibilityState&&Object.defineProperty(e,"visibilityState",re.savedProps.visibilityState);}catch{}try{re.savedProps.hasFocus&&(document.hasFocus=re.savedProps.hasFocus);}catch{}}function Mr(){re.audioCtx&&re.audioCtx.state!=="running"&&re.audioCtx.resume?.().catch(()=>{});}function zy(){try{const e=window.AudioContext||window.webkitAudioContext;re.audioCtx=new e({latencyHint:"interactive"}),re.gainNode=re.audioCtx.createGain(),re.gainNode.gain.value=Ny,re.oscillator=re.audioCtx.createOscillator(),re.oscillator.frequency.value=Oy,re.oscillator.connect(re.gainNode).connect(re.audioCtx.destination),re.oscillator.start(),document.addEventListener("visibilitychange",Mr,{capture:!0}),window.addEventListener("focus",Mr,{capture:!0});}catch{uc();}}function uc(){try{re.oscillator?.stop();}catch{}try{re.oscillator?.disconnect(),re.gainNode?.disconnect();}catch{}try{re.audioCtx?.close?.();}catch{}document.removeEventListener("visibilitychange",Mr,{capture:true}),window.removeEventListener("focus",Mr,{capture:true}),re.oscillator=null,re.gainNode=null,re.audioCtx=null;}function Gy(){const e=document.querySelector("canvas")||document.body||document.documentElement;re.heartbeatInterval=window.setInterval(()=>{try{e.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:1,clientY:1}));}catch{}},Ry);}function Hy(){re.heartbeatInterval!==null&&(clearInterval(re.heartbeatInterval),re.heartbeatInterval=null);}function go(){By(),$y(),zy(),Gy();}function mo(){Hy(),uc(),Dy(),jy();}let Zn=false,Fe=false;function Ot(){return Se(dc,_y)}function ho(e){Le(dc,e);}const It={init(){if(Zn)return;const e=Ot();Zn=true,e.enabled?(go(),Fe=true,console.log("[MGAntiAfk] Initialized and started")):console.log("[MGAntiAfk] Initialized but disabled");},isReady(){return Zn},isRunning(){return Fe},isEnabled(){return Ot().enabled},enable(){const e=Ot();e.enabled=true,ho(e),Fe||(go(),Fe=true,console.log("[MGAntiAfk] Enabled"));},disable(){const e=Ot();e.enabled=false,ho(e),Fe&&(mo(),Fe=false,console.log("[MGAntiAfk] Disabled"));},toggle(){It.isEnabled()?It.disable():It.enable();},getConfig(){return Ot()},updateConfig(e){const n={...Ot(),...e};ho(n),n.enabled&&!Fe?(go(),Fe=true):!n.enabled&&Fe&&(mo(),Fe=false);},destroy(){Fe&&(mo(),Fe=false),Zn=false,console.log("[MGAntiAfk] Destroyed");}},pc=Ee.PET_TEAM,Wy={enabled:false,teams:[],activeTeamId:null},fc=3,Ha=50,Ve="";function Ce(){return Se(pc,Wy)}function Ft(e){Le(pc,e);}function Uy(e){const n={...Ce(),...e};return Ft(n),n}function Vy(){return Ce().enabled}function Ky(e){Uy({enabled:e});}function Yy(){return crypto.randomUUID()}function Yo(){return Date.now()}function gc(e=[]){const t=[...e];for(;t.length<fc;)t.push(Ve);return [t[0]||Ve,t[1]||Ve,t[2]||Ve]}function mc(e,t){const n=Ce(),r=e.trim();return r?!n.teams.some(o=>o.name.trim()===r&&o.id!==t):false}function hc(e,t){const n=Ce();if(!e.some(i=>i!==Ve))return  true;const o=[...e].sort().join(",");return !n.teams.some(i=>i.id===t?false:[...i.petIds].sort().join(",")===o)}function bc(e){const n=Mn().get(),r=new Set(n.all.map(i=>i.id)),o=Ce();for(const i of o.teams)for(const a of i.petIds)a!==Ve&&r.add(a);for(const i of e)if(i!==Ve&&!r.has(i))return  false;return  true}function qy(e,t=[]){const n=Ce();if(n.teams.length>=Ha)throw new Error(`Maximum number of teams (${Ha}) reached`);if(!mc(e))throw new Error(`Team name "${e}" already exists`);const r=e.trim();if(!r)throw new Error("Team name cannot be empty");const o=gc(t);if(!bc(o))throw new Error("One or more pet IDs do not exist");if(!hc(o))throw new Error("A team with this exact composition already exists");const i={id:Yy(),name:r,petIds:o,createdAt:Yo(),updatedAt:Yo()};return n.teams.push(i),Ft(n),i}function yc(e,t){const n=Ce(),r=n.teams.findIndex(a=>a.id===e);if(r===-1)return null;const o=n.teams[r];if(t.name!==void 0){const a=t.name.trim();if(!a)throw new Error("Team name cannot be empty");if(!mc(a,e))throw new Error(`Team name "${a}" already exists`);t.name=a;}if(t.petIds!==void 0){const a=gc(t.petIds);if(!bc(a))throw new Error("One or more pet IDs do not exist");if(!hc(a,e))throw new Error("A team with this exact composition already exists");t.petIds=a;}const i={...o,...t,id:o.id,createdAt:o.createdAt,updatedAt:Yo()};return n.teams[r]=i,Ft(n),i}function Xy(e){const t=Ce(),n=t.teams.length;return t.teams=t.teams.filter(r=>r.id!==e),t.teams.length===n?false:(Ft(t),true)}function Jy(e){return Ce().teams.find(n=>n.id===e)??null}function Qy(){return [...Ce().teams]}function Zy(e){const t=Ce(),n=e.trim();return t.teams.find(r=>r.name.trim()===n)??null}function ev(e){const t=Ce(),n=new Map(t.teams.map(r=>[r.id,r]));if(e.length!==t.teams.length)return  false;for(const r of e)if(!n.has(r))return  false;return t.teams=e.map(r=>n.get(r)),Ft(t),true}function tv(e,t){try{return yc(e,{name:t})!==null}catch(n){return console.warn(`[PetTeam] Failed to rename team ${e}:`,n),false}}function nv(){const n=Mn().get().byLocation.active.map(o=>o.id).sort(),r=Ce();for(const o of r.teams){const i=o.petIds.filter(a=>a!=="").sort();if(i.length===n.length&&i.every((a,s)=>a===n[s]))return o.id}return null}function vc(){const e=nv(),t=Ce();return e!==t.activeTeamId&&(t.activeTeamId=e,Ft(t)),e}function xc(e){const t=Ce();t.activeTeamId=e,Ft(t);}function rv(e){return vc()===e}function ov(e){const t=Mn(),n=_t(),r=t.get();if(n.get().isFull)throw new Error("Cannot activate team: inventory is full");const i=r.byLocation.active,a=e.petIds.filter(l=>l!==Ve).sort(),s=i.map(l=>l.id).sort();if(JSON.stringify(a)===JSON.stringify(s)){console.log("[PetTeam] Team already active");return}const c=r.hutch,d=c.hasHutch?c.maxItems-c.currentItems:0;iv(e.petIds,d,r),xc(e.id),console.log("[PetTeam] Team activated successfully");}function iv(e,t,n){const r=n.byLocation.active;let o=t;console.log(`[PetTeam] Starting swap with ${t} hutch spaces available`);for(let i=0;i<fc;i++){const a=e[i],s=r[i]??null;if(console.log(`[PetTeam] Slot ${i}: current=${s?.id.slice(0,8)??"empty"}, target=${a.slice(0,8)||"empty"}, hutchSpace=${o}`),s?.id===a){console.log(`[PetTeam] Slot ${i}: Same pet, skipping`);continue}if(a===Ve&&s){const c=o>0;console.log(`[PetTeam] Slot ${i}: Removing pet, storeInHutch=${c}`),av(s.id,c),c&&o--;continue}if(!s&&a!==Ve){const d=n.all.find(l=>l.id===a)?.location==="hutch";console.log(`[PetTeam] Slot ${i}: Adding pet, fromHutch=${d}`),d&&o++,sv(a,n);continue}if(s&&a!==Ve){const d=n.all.find(u=>u.id===a)?.location==="hutch";d&&o++;const l=o>0;console.log(`[PetTeam] Slot ${i}: Swapping pets, fromHutch=${d}, storeInHutch=${l}`),lv(s.id,a,n,l),l&&o--;continue}}console.log(`[PetTeam] Swap complete, ${o} hutch spaces remaining`);}function av(e,t){Yl(e),t&&Ni(e);}function sv(e,t){const n=t.all.find(r=>r.id===e);if(!n){console.warn(`[PetTeam] Pet ${e} not found`);return}n.location==="hutch"&&$i(e),Vl(e);}function lv(e,t,n,r){const o=n.all.find(i=>i.id===t);if(!o){console.warn(`[PetTeam] Pet ${t} not found`);return}o.location==="hutch"&&$i(t),Kl(e,t),r&&Ni(e);}let er=false;const he={init(){if(er)return;if(!Ce().enabled){console.log("[PetTeam] Feature disabled");return}er=true,console.log("[PetTeam] Feature initialized");},destroy(){er&&(er=false,console.log("[PetTeam] Feature destroyed"));},isEnabled:Vy,setEnabled:Ky,createTeam:qy,updateTeam:yc,deleteTeam:Xy,renameTeam:tv,getTeam:Jy,getAllTeams:Qy,getTeamByName:Zy,reorderTeams:ev,getActiveTeamId:vc,setActiveTeamId:xc,isActiveTeam:rv,activateTeam:ov};class wc{constructor(){H(this,"stats");H(this,"STORAGE_KEY",Ee.TRACKER_STATS);this.stats=this.loadStats(),this.startSession();}loadStats(){return Se(this.STORAGE_KEY,this.getDefaultStats())}saveStats(){Le(this.STORAGE_KEY,this.stats);}getDefaultStats(){return {session:{sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},allTime:{totalSessions:0,totalPlayTime:0,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0,crops:{},pets:{}}}}startSession(){this.stats.session={sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},this.stats.allTime.totalSessions++,this.saveStats();}endSession(){this.stats.session.sessionEnd=Date.now();const t=this.stats.session.sessionEnd-this.stats.session.sessionStart;this.stats.allTime.totalPlayTime+=t,this.saveStats();}recordHarvest(t,n=1,r=[]){this.stats.session.cropsHarvested+=n,this.stats.allTime.cropsHarvested+=n,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].harvested+=n;for(const o of r)this.stats.allTime.crops[t].mutations[o]||(this.stats.allTime.crops[t].mutations[o]=0),this.stats.allTime.crops[t].mutations[o]++;this.saveStats();}recordCropSale(t,n=1,r=0){this.stats.session.cropsSold+=n,this.stats.session.coinsEarned+=r,this.stats.allTime.cropsSold+=n,this.stats.allTime.coinsEarned+=r,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].sold+=n,this.stats.allTime.crops[t].totalValue+=r,this.saveStats();}recordPetHatch(t,n=[],r=[]){this.stats.session.petsHatched++,this.stats.allTime.petsHatched++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].hatched++;for(const o of n)this.stats.allTime.pets[t].mutations[o]||(this.stats.allTime.pets[t].mutations[o]=0),this.stats.allTime.pets[t].mutations[o]++;for(const o of r)this.stats.allTime.pets[t].abilities[o]||(this.stats.allTime.pets[t].abilities[o]=0),this.stats.allTime.pets[t].abilities[o]++;this.saveStats();}recordPetSale(t,n=0){this.stats.session.petsSold++,this.stats.session.coinsEarned+=n,this.stats.allTime.petsSold++,this.stats.allTime.coinsEarned+=n,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].sold++,this.saveStats();}recordPetFeed(t){this.stats.session.petsFed++,this.stats.allTime.petsFed++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].fed++,this.saveStats();}recordSeedPurchase(t,n=1,r=0){this.stats.session.seedsPurchased+=n,this.stats.session.coinsSpent+=r,this.stats.allTime.seedsPurchased+=n,this.stats.allTime.coinsSpent+=r,this.saveStats();}recordEggPurchase(t,n=1,r=0){this.stats.session.eggsPurchased+=n,this.stats.session.coinsSpent+=r,this.stats.allTime.eggsPurchased+=n,this.stats.allTime.coinsSpent+=r,this.saveStats();}recordAbilityProc(t){this.stats.session.abilityProcs++,this.stats.allTime.abilityProcs++,this.saveStats();}recordCoinsEarned(t){this.stats.session.coinsEarned+=t,this.stats.allTime.coinsEarned+=t,this.saveStats();}recordCoinsSpent(t){this.stats.session.coinsSpent+=t,this.stats.allTime.coinsSpent+=t,this.saveStats();}getStats(){return {...this.stats}}getSessionStats(){return {...this.stats.session}}getAllTimeStats(){return {...this.stats.allTime}}getCropStats(t){return this.stats.allTime.crops[t]||null}getPetStats(t){return this.stats.allTime.pets[t]||null}getTopCrops(t=10){return Object.entries(this.stats.allTime.crops).map(([n,r])=>({species:n,stats:r})).sort((n,r)=>r.stats.harvested-n.stats.harvested).slice(0,t)}getTopPets(t=10){return Object.entries(this.stats.allTime.pets).map(([n,r])=>({species:n,stats:r})).sort((n,r)=>r.stats.hatched-n.stats.hatched).slice(0,t)}resetSession(){this.startSession();}resetAll(){this.stats=this.getDefaultStats(),this.saveStats();}exportStats(){return JSON.stringify(this.stats,null,2)}importStats(t){try{const n=JSON.parse(t);return this.stats=n,this.saveStats(),!0}catch(n){return console.warn("[StatsTracker] Failed to import stats:",n),false}}}let jt=null;function cv(){return jt||(jt=new wc),jt}function dv(){jt&&(jt.endSession(),jt=null);}function kc(e){const t=Br(e.xp),n=jr(e.petSpecies,e.targetScale),r=zr(e.petSpecies,e.xp,n),o=Gr(e.petSpecies,t),i=Bl(e.petSpecies),a=Oh(r,n,i),s=Nh(r,n);return {current:r,max:n,progress:s,age:t,isMature:o,strengthPerHour:i,hoursToMax:a}}function Sc(e){return {...e,strength:kc(e)}}function Cc(e){return e.map(Sc)}function uv(e){if(e.length===0)return {averageCurrent:0,averageMax:0,totalMature:0,totalImmature:0,strongestPet:null,weakestPet:null};const t=Cc(e),n=t.reduce((c,d)=>c+d.strength.current,0),r=t.reduce((c,d)=>c+d.strength.max,0),o=t.filter(c=>c.strength.isMature).length,i=t.length-o,a=t.reduce((c,d)=>d.strength.max>(c?.strength.max||0)?d:c,t[0]),s=t.reduce((c,d)=>d.strength.max<(c?.strength.max||1/0)?d:c,t[0]);return {averageCurrent:Math.round(n/t.length),averageMax:Math.round(r/t.length),totalMature:o,totalImmature:i,strongestPet:a,weakestPet:s}}const pv=Object.freeze(Object.defineProperty({__proto__:null,calculatePetStrength:kc,enrichPetWithStrength:Sc,enrichPetsWithStrength:Cc,getPetStrengthStats:uv},Symbol.toStringTag,{value:"Module"}));class Ac{constructor(){H(this,"logs",[]);H(this,"maxLogs",1e3);H(this,"unsubscribe",null);H(this,"isInitialized",false);}init(){this.isInitialized||(this.unsubscribe=it.myPets.subscribeAbility(t=>{this.log({abilityId:t.trigger.abilityId||"unknown",petId:t.pet.id,petSpecies:t.pet.petSpecies,petName:t.pet.name,timestamp:t.trigger.performedAt||Date.now()});}),this.isInitialized=true);}log(t){const n={...t,id:`${t.timestamp}-${Math.random().toString(36).substr(2,9)}`};this.logs.push(n),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs));}getLogs(t){let n=this.logs;t?.abilityId&&(n=n.filter(o=>o.abilityId===t.abilityId)),t?.petId&&(n=n.filter(o=>o.petId===t.petId)),t?.petSpecies&&(n=n.filter(o=>o.petSpecies===t.petSpecies));const{since:r}=t??{};return r!==void 0&&(n=n.filter(o=>o.timestamp>=r)),t?.limit&&(n=n.slice(-t.limit)),n}getStats(t=36e5){const n=Date.now()-t,r=this.logs.filter(i=>i.timestamp>=n),o=new Map;for(const i of r){o.has(i.abilityId)||o.set(i.abilityId,{abilityId:i.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});const a=o.get(i.abilityId);a.count++,(!a.lastProc||i.timestamp>a.lastProc)&&(a.lastProc=i.timestamp);}for(const i of o.values())i.procsPerMinute=i.count/t*6e4,i.procsPerHour=i.count/t*36e5;return o}getAbilityStats(t,n=36e5){return this.getStats(n).get(t)||null}getPetStats(t,n=36e5){const r=Date.now()-n,o=this.logs.filter(a=>a.petId===t&&a.timestamp>=r),i=new Map;for(const a of o){i.has(a.abilityId)||i.set(a.abilityId,{abilityId:a.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});const s=i.get(a.abilityId);s.count++,(!s.lastProc||a.timestamp>s.lastProc)&&(s.lastProc=a.timestamp);}for(const a of i.values())a.procsPerMinute=a.count/n*6e4,a.procsPerHour=a.count/n*36e5;return {totalProcs:o.length,abilities:i}}getTopAbilities(t=10,n=36e5){return Array.from(this.getStats(n).values()).sort((o,i)=>i.count-o.count).slice(0,t)}clear(){this.logs=[];}setMaxLogs(t){this.maxLogs=t,this.logs.length>t&&(this.logs=this.logs.slice(-t));}getLogCount(){return this.logs.length}isActive(){return this.isInitialized}destroy(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null),this.logs=[],this.isInitialized=false;}}let St=null;function fv(){return St||(St=new Ac,St.init()),St}function gv(){St&&(St.destroy(),St=null);}const Ic={StatsTracker:wc,getStatsTracker:cv,destroyStatsTracker:dv},Tc={AbilityLogger:Ac,getAbilityLogger:fv,destroyAbilityLogger:gv,...pv},mv=Object.freeze(Object.defineProperty({__proto__:null,MGAchievements:cc,MGAntiAfk:It,MGAutoFavorite:Di,MGBulkFavorite:Er,MGCalculators:jl,MGJournalChecker:ic,MGPetTeam:he,MGPets:Tc,MGTracker:Ic},Symbol.toStringTag,{value:"Module"})),He=[{id:"Rainbow",desc:"All Rainbow items"},{id:"Gold",desc:"All Gold items"},{id:"Wet",desc:"All Wet items"},{id:"Chilled",desc:"All Chilled items"},{id:"Frozen",desc:"All Frozen items"},{id:"Dawnlit",desc:"Dawn mutations"},{id:"Dawncharged",desc:"Dawn charged"},{id:"Ambershine",desc:"Amber mutations"},{id:"Ambercharged",desc:"Amber charged"}],hv={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function Nt(e){return e?hv[e]??0:0}class bv extends Ut{constructor(){super({id:"tab-auto-favorite",label:"Auto-Favorite"});H(this,"allPlants",[]);H(this,"allPets",[]);H(this,"sectionElement",null);}async build(n){await Qm();const r=n.getRootNode();kt(r,_l,"auto-favorite-settings-styles");const o=this.createGrid("12px");o.id="auto-favorite-settings",this.sectionElement=o,n.appendChild(o),await this.loadGameData(),await this.waitForSprites(),this.renderContent();}async loadGameData(){try{await ce.waitForAny(3e3).catch(()=>{}),await Promise.all([ce.waitFor("plants",3e3).catch(()=>console.warn("[AutoFavorite UI] Still waiting for plants data...")),ce.waitFor("pets",3e3).catch(()=>console.warn("[AutoFavorite UI] Still waiting for pets data..."))]);const n=ce.get("plants")||{},r=ce.get("pets")||{};this.allPlants=Object.keys(n).sort((o,i)=>{const a=n[o]?.seed?.rarity||null,s=n[i]?.seed?.rarity||null,c=Nt(a)-Nt(s);return c!==0?c:o.localeCompare(i,void 0,{numeric:!0,sensitivity:"base"})}),this.allPets=Object.keys(r).sort((o,i)=>{const a=r[o]?.rarity||null,s=r[i]?.rarity||null,c=Nt(a)-Nt(s);return c!==0?c:o.localeCompare(i,void 0,{numeric:!0,sensitivity:"base"})});}catch(n){console.error("[AutoFavorite UI] Failed to load game data:",n);}}async waitForSprites(){if(ie.isReady())return;const n=1e4,r=100;let o=0;return new Promise(i=>{const a=()=>{ie.isReady()||o>=n?i():(o+=r,setTimeout(a,r));};a();})}renderContent(){this.sectionElement&&(this.sectionElement.innerHTML="",this.sectionElement.appendChild(this.createMasterToggle()),this.sectionElement.appendChild(this.createMutationsCard()),this.sectionElement.appendChild(this.createProduceCard()),this.sectionElement.appendChild(this.createPetsCard()));}createMasterToggle(){const n=b("div",{className:"kv"}),r=ri({text:"Enable Auto-Favorite",tone:"default",size:"lg"}),o=si({checked:ze().get().enabled,onChange:async i=>{const a=ze(),s=a.get();await a.set({...s,enabled:i}),await this.saveConfig();}});return n.append(r.root,o.root),Be({title:"Auto-Favorite",padding:"lg"},n,b("p",{style:"margin-top: 6px; font-size: 12px; color: var(--muted);"},"Automatically favorite items when added to inventory"))}createMutationsCard(){const n=b("div",{className:"u-col"}),r=b("div",{className:"mut-row"});r.appendChild(this.createMutationButton(He[0])),r.appendChild(this.createMutationButton(He[1])),n.appendChild(r);const o=b("div",{className:"mut-row"});o.appendChild(this.createMutationButton(He[2])),o.appendChild(this.createMutationButton(He[3])),o.appendChild(this.createMutationButton(He[4])),n.appendChild(o);const i=b("div",{className:"mut-row"});i.appendChild(this.createMutationButton(He[5])),i.appendChild(this.createMutationButton(He[6])),n.appendChild(i);const a=b("div",{className:"mut-row"});return a.appendChild(this.createMutationButton(He[7])),a.appendChild(this.createMutationButton(He[8])),n.appendChild(a),Be({title:"Mutations Priority",variant:"soft",padding:"lg",expandable:true,defaultExpanded:true},n,b("p",{style:"margin-top: 8px; font-size: 11px; color: var(--muted);"},`${ze().get().favoriteMutations.length} / ${He.length} active`))}createMutationButton(n){let r=ze().get().favoriteMutations.includes(n.id);const i=["mut-btn",`mut-btn--${n.id.toLowerCase()}`];r&&i.push("active");const a=b("div",{className:i.join(" ")}),s=b("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(ie.isReady()){const l=ie.toCanvas("plant","Sunflower",{mutations:[n.id],scale:.16});l.style.width="28px",l.style.height="28px",l.style.objectFit="contain",s.appendChild(l);}}catch{}const c=n.id.charAt(0).toUpperCase()+n.id.slice(1).toLowerCase(),d=b("div",{style:"font-size: 13px; font-weight: 600; color: var(--fg); text-shadow: 0 1px 2px rgba(0,0,0,0.5); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"},c);if(a.append(s,d),n.id==="Rainbow"||n.id==="Gold"){const l=b("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(ie.isReady()){const u=ie.toCanvas("pet","Capybara",{mutations:[n.id],scale:.16});u.style.width="28px",u.style.height="28px",u.style.objectFit="contain",l.appendChild(u);}}catch{}a.append(l);}else {const l=b("div",{style:"width: 28px; flex-shrink: 0;"});a.append(l);}return a.addEventListener("click",async l=>{l.stopPropagation();const u=ze(),p=u.get();if(r){const g=p.favoriteMutations.filter(m=>m!==n.id);await u.set({...p,favoriteMutations:g}),r=false,a.classList.remove("active");}else {const g=[...p.favoriteMutations,n.id];await u.set({...p,favoriteMutations:g}),r=true,a.classList.add("active");}await this.saveConfig();const f=this.sectionElement?.querySelector(".card p");f&&(f.textContent=`${ze().get().favoriteMutations.length} / ${He.length} active`);}),a}createProduceCard(){return this.createItemSelectionCard({title:"Produce",items:this.allPlants,category:"plant",selected:ze().get().favoriteProduceList,onUpdate:async n=>{const r=ze(),o=r.get();await r.set({...o,favoriteProduceList:n}),await this.saveConfig();}})}createPetsCard(){return this.createItemSelectionCard({title:"Pets",items:this.allPets,category:"pet",selected:ze().get().favoritePetsList,onUpdate:async n=>{const r=ze(),o=r.get();await r.set({...o,favoritePetsList:n}),await this.saveConfig();}})}createItemSelectionCard(n){const{title:r,items:o,category:i,selected:a,onUpdate:s}=n;let c=new Set(a),d=o;const l=b("div",{style:"margin-bottom: 8px;"}),u=li({placeholder:`Search ${r.toLowerCase()}...`,value:"",debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:v=>{const C=v.trim().toLowerCase();C?d=o.filter(T=>T.toLowerCase().includes(C)):d=o,w.setData(m());}});l.appendChild(u.root);const p=b("div",{style:"display: flex; gap: 8px; margin-bottom: 12px;"}),f=wt({label:"Select All",variant:"default",size:"sm",onClick:()=>{const v=m().map(C=>C.id);w.setSelection(v);}}),g=wt({label:"Deselect All",variant:"default",size:"sm",onClick:()=>{w.clearSelection();}});p.append(f,g);const m=()=>d.map(v=>({id:v,name:v,rarity:this.getItemRarity(v,i),selected:c.has(v)})),h=v=>{if(!v){const T=b("span",{style:"opacity:0.5;"});return T.textContent="—",T}return Li({variant:"rarity",rarity:v,size:"sm"}).root},y=v=>{const C=b("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0; background: color-mix(in oklab, var(--bg) 5%, transparent); border-radius: 6px;"});try{if(ie.isReady()){let T=i,k=v;i==="plant"&&(["Bamboo","Cactus"].includes(v)&&(T="tallplant"),v==="DawnCelestial"&&(k="DawnCelestialCrop"),v==="MoonCelestial"&&(k="MoonCelestialCrop"),v==="OrangeTulip"&&(k="Tulip"));const P=ie.toCanvas(T,k,{scale:.5});P.style.width="28px",P.style.height="28px",P.style.objectFit="contain",C.appendChild(P);}}catch{}return C},w=hs({columns:[{key:"name",header:"Name",width:"1fr",align:"center",sortable:true,sortFn:(v,C)=>v.name.localeCompare(C.name,void 0,{numeric:true,sensitivity:"base"}),render:v=>{const C=b("div",{style:"display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%;"}),T=y(v.id),k=b("span",{style:"font-weight: 500; color: var(--fg); white-space: nowrap;"},v.name);return C.append(T,k),C}},{key:"rarity",header:"Rarity",width:"100px",align:"center",sortable:true,sortFn:(v,C)=>Nt(v.rarity)-Nt(C.rarity),render:v=>h(v.rarity)}],data:m(),maxHeight:280,compact:true,zebra:true,animations:true,selectable:true,selectOnRowClick:true,hideHeaderCheckbox:true,initialSelection:Array.from(c),getRowId:v=>v.id,onSelectionChange:v=>{c.clear(),v.forEach(C=>c.add(C)),s(Array.from(c)),I();}}),x=b("p",{style:"margin-top: 8px; font-size: 11px; color: var(--muted);"}),I=()=>{x.textContent=`${c.size} / ${o.length} selected`;};return I(),Be({title:`${r} (${c.size}/${o.length})`,variant:"soft",padding:"lg",expandable:true,defaultExpanded:false},l,p,w.root,x)}getItemRarity(n,r){try{if(r==="pet")return (ce.get("pets")||{})[n]?.rarity||null;if(r==="plant"){const o=ce.get("plants")||{},i=o[n];if(i?.seed?.rarity)return i.seed.rarity;const a=n.toLowerCase();for(const s of Object.values(o))if(s?.seed?.name?.toLowerCase()===a||s?.plant?.name?.toLowerCase()===a)return s.seed.rarity}}catch{}return null}async saveConfig(){const n=ze().get();try{const{updateSimpleConfig:r}=Di;await r({enabled:n.enabled,favoriteSpecies:[...n.favoriteProduceList,...n.favoritePetsList],favoriteMutations:n.favoriteMutations});}catch(r){console.error("[AutoFavoriteSettings] Failed to update feature config:",r);}}}function yv(e,t){const n=new MutationObserver(o=>{for(const i of o)for(const a of i.addedNodes){if(!(a instanceof Element))continue;a.matches(e)&&t(a);const s=a.querySelectorAll(e);for(const c of s)t(c);}});n.observe(document.body,{childList:true,subtree:true});const r=document.querySelectorAll(e);for(const o of r)t(o);return {disconnect:()=>n.disconnect()}}function vv(e,t){const n=new MutationObserver(r=>{for(const o of r)for(const i of o.removedNodes){if(!(i instanceof Element))continue;i.matches(e)&&t(i);const a=i.querySelectorAll(e);for(const s of a)t(s);}});return n.observe(document.body,{childList:true,subtree:true}),{disconnect:()=>n.disconnect()}}const Pc=768,Wa=6,bo=62,yo=50,xv=.5,wv=.4,tr=36,nr=28,kv=6,qo=4,Sv=8,Cv=100,Av=200,Ua=14,Va=3,Iv=40,Tv=50,Ka=2147483646,sn="gemini-bulk-favorite-sidebar",Pv="gemini-bulk-favorite-top-row",Ev="gemini-bulk-favorite-bottom-row",Xo="gemini-qol-bulkFavorite-styles",Mv=`
/* Desktop: vertical scrollable list next to inventory */
#${sn} {
  display: flex;
  flex-direction: column;
  gap: ${kv}px;
  pointer-events: auto;
  padding: 4px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.6);
  z-index: ${Ka};
  overflow-y: auto;
}

/* Mobile: horizontal scrollable rows */
.gemini-qol-bulkFavorite-row {
  display: flex;
  flex-direction: row;
  gap: ${qo}px;
  pointer-events: auto;
  padding: 4px;
  position: fixed;
  z-index: ${Ka};
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

#${sn}::-webkit-scrollbar {
  width: 4px;
}

#${sn}::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}

#${sn}::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

/* Individual species button */
.gemini-qol-bulkFavorite-btn {
  position: relative;
  width: ${bo}px;
  height: ${bo}px;
  min-width: ${bo}px;
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
  width: ${yo}px;
  height: ${yo}px;
  min-width: ${yo}px;
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
  width: ${tr}px;
  height: ${tr}px;
  object-fit: contain;
  image-rendering: pixelated;
}

.gemini-qol-bulkFavorite-btn.mobile .gemini-qol-bulkFavorite-sprite {
  width: ${nr}px;
  height: ${nr}px;
}

/* Heart indicator */
.gemini-qol-bulkFavorite-heart {
  position: absolute;
  top: ${Va}px;
  right: ${Va}px;
  width: ${Ua}px;
  height: ${Ua}px;
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
  width: ${tr}px;
  height: ${tr}px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #fff;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 4px;
}

.gemini-qol-bulkFavorite-btn.mobile .gemini-qol-bulkFavorite-fallback {
  width: ${nr}px;
  height: ${nr}px;
  font-size: 14px;
}
`,Lv='<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',_v='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';function Fv(e){const{species:t,itemCount:n,isFavorited:r,isMobile:o,onClick:i}=e,a=b("button",{className:`gemini-qol-bulkFavorite-btn${o?" mobile":""}`,title:`${r?"Unfavorite":"Favorite"} all ${n} ${t}`});return a.dataset.species=t,a.appendChild(Rv(t,o)),a.appendChild(Ov(r)),a.appendChild(Nv(t)),a.addEventListener("click",async s=>{s.preventDefault(),s.stopPropagation(),i();}),a}function Rv(e,t){try{if(!ie.isReady()||!ie.has("plant",e))return Ya(e);const n=t?wv:xv,r=ie.toCanvas("plant",e,{scale:n});return r.className="gemini-qol-bulkFavorite-sprite",r}catch(n){return console.warn(`[BulkFavorite] Failed to load sprite for ${e}:`,n),Ya(e)}}function Ya(e){return b("div",{className:"gemini-qol-bulkFavorite-fallback"},e.charAt(0).toUpperCase())}function Ov(e){const t=b("span",{className:`gemini-qol-bulkFavorite-heart ${e?"filled":"outline"}`});return t.innerHTML=e?Lv:_v,t}function Nv(e){return b("span",{className:"gemini-qol-bulkFavorite-label"},e)}let Ze=null,et=null,Qe=null,br=false,vn=null,ln=false,zt=null;const Jo=[];function rr(e){Jo.push(e);}function $v(){for(const e of Jo)try{e();}catch(t){console.warn("[BulkFavorite] Cleanup error:",t);}Jo.length=0;}function Ec(){return window.innerWidth<=Pc}function Dv(e){return new Promise(t=>setTimeout(t,e))}function Mc(){if(br)return;if(document.getElementById(Xo)){br=true;return}const e=document.createElement("style");e.id=Xo,e.textContent=Mv,document.head.appendChild(e),br=true;}function Bv(){document.getElementById(Xo)?.remove(),br=false;}function jv(){const e=_t().get();if(!e?.items)return [];const t=new Set(e.favoritedItemIds??[]),n=new Map;for(const o of e.items){const i=o;if(i.itemType!=="Produce")continue;const a=i.species,s=i.id;if(!a||!s)continue;const c=n.get(a);c?c.push(s):n.set(a,[s]);}const r=[];for(const[o,i]of n){const a=i.length>0&&i.every(s=>t.has(s));r.push({species:o,itemIds:i,allFavorited:a});}return r.sort((o,i)=>o.species.localeCompare(i.species)),r}async function zv(e){const t=_t().get();if(!t?.items)return;const n=new Set(t.favoritedItemIds??[]),r=[];for(const a of t.items){const s=a;if(s.itemType!=="Produce"||s.species!==e)continue;const c=s.id;c&&r.push({id:c,favorited:n.has(c)});}if(r.length===0)return;const o=r.every(a=>a.favorited),i=o?r.filter(a=>a.favorited):r.filter(a=>!a.favorited);console.log(`🔄 [BulkFavorite] ${o?"Unfavoriting":"Favoriting"} ${i.length}/${r.length} ${e}`);for(const a of i)Hr(a.id),await Dv(Iv);}function Qo(e,t){const{species:n,itemIds:r,allFavorited:o}=e;return Fv({species:n,itemCount:r.length,isFavorited:o,isMobile:t,onClick:()=>zv(n)})}function Gv(e){const t=b("div",{id:sn}),n=e.getBoundingClientRect(),r=Math.max(window.innerHeight-Cv,Av);return t.style.maxHeight=`${r}px`,t.style.position="fixed",t.style.left=`${n.right+Sv}px`,t.style.top=`${n.top}px`,t}function qa(e,t,n){const r=b("div",{id:e,className:"gemini-qol-bulkFavorite-row"}),o=t.getBoundingClientRect();return n==="top"?r.style.bottom=`${window.innerHeight-o.top+qo}px`:r.style.top=`${o.bottom+qo}px`,r.style.left=`${o.left}px`,r.style.maxWidth=`${o.width}px`,r}function Xa(){const e=jv();Ec()?Wv(e):Hv(e);}function Hv(e){if(Ze){if(Ze.innerHTML="",e.length===0){Ze.style.display="none";return}Ze.style.display="flex";for(const t of e)Ze.appendChild(Qo(t,false));console.log(`🎯 [BulkFavorite] Desktop: Rendered ${e.length} produce types`);}}function Wv(e){if(!et||!Qe)return;if(et.innerHTML="",Qe.innerHTML="",e.length===0){et.style.display="none",Qe.style.display="none";return}et.style.display="flex";const t=e.slice(0,Wa),n=e.slice(Wa);for(const r of t)et.appendChild(Qo(r,true));if(n.length>0){Qe.style.display="flex";for(const r of n)Qe.appendChild(Qo(r,true));}else Qe.style.display="none";console.log(`🎯 [BulkFavorite] Mobile: Rendered ${e.length} types`);}function Uv(){const e=document.querySelector(".McGrid");if(!e)return console.log("⚠️ [BulkFavorite] No .McGrid found"),null;const t=e.getBoundingClientRect();if(window.innerWidth<=Pc)return console.log(`🎯 [BulkFavorite] Mobile mode - using McGrid: ${Math.round(t.width)}x${Math.round(t.height)}`),e;const r=window.innerWidth/2;let o=null,i=0;const a=e.querySelectorAll(".McFlex, .McGrid");for(const s of a){const c=s.getBoundingClientRect();if(c.width<200||c.height<200||c.width>window.innerWidth-100)continue;const d=c.left+c.width/2,l=1-Math.abs(d-r)/r,p=c.width*c.height*l;p>i&&(o=s,i=p);}if(o){const s=o.getBoundingClientRect();return console.log(`🎯 [BulkFavorite] Found desktop container: ${Math.round(s.width)}x${Math.round(s.height)} @ (${Math.round(s.left)}, ${Math.round(s.top)})`),o}return console.log(`🎯 [BulkFavorite] Fallback to McGrid: ${Math.round(t.width)}x${Math.round(t.height)}`),e}let Gt=null;function Zo(){Gt&&clearTimeout(Gt),Gt=setTimeout(()=>{Vv();},Tv);}function Vv(){const e=Uv();if(!e)return;console.log("🎯 [BulkFavorite] Found inventory modal container"),xn(),Mc(),vn=e,Ec()?(et=qa(Pv,e,"top"),Qe=qa(Ev,e,"bottom"),document.body.appendChild(et),document.body.appendChild(Qe)):(Ze=Gv(e),document.body.appendChild(Ze)),Xa(),zt&&zt(),zt=_t().subscribeFavorites(()=>{ln&&Xa();});}function xn(){Gt&&(clearTimeout(Gt),Gt=null),zt&&(zt(),zt=null),Ze?.remove(),Ze=null,et?.remove(),et=null,Qe?.remove(),Qe=null,vn=null;}function Kv(){xn();}async function ei(){if(!_n().enabled){console.log("⚠️ [BulkFavorite] Feature disabled");return}Mc();const t=await hi.onChangeNow(o=>{const i=o==="inventory";i!==ln&&(ln=i,i?Zo():xn());}),n=yv(".McGrid",()=>{ln&&(Ze||et||Zo());}),r=vv(".McGrid",o=>{vn&&vn===o&&xn();});rr(()=>t()),rr(()=>n.disconnect()),rr(()=>r.disconnect()),rr(()=>{xn(),ln=false,vn=null;}),console.log("✅ [BulkFavorite] Started (State-driven + DOM observation)");}function ti(){$v(),Bv(),console.log("🛑 [BulkFavorite] Stopped");}function Yv(e){const t=_n();t.enabled=e,e?ei():ti();}let or=false;const ni={init(){or||(ei(),or=true);},destroy(){or&&(ti(),or=false);},isEnabled(){return lc()},renderButton:Zo,removeButton:Kv,startWatching:ei,stopWatching:ti,setEnabled:Yv},Me={autoFavorite:{enabled:false},bulkFavorite:{enabled:false},journalChecker:{enabled:false},pets:{enabled:true},cropSizeIndicator:{enabled:false,showForGrowing:true,showForMature:true,showJournalBadges:true},eggProbabilityIndicator:{enabled:false},cropValueIndicator:{enabled:false},xpTracker:{enabled:false},abilityTracker:{enabled:false},mutationTracker:{enabled:false},cropBoostTracker:{enabled:false},turtleTimer:{enabled:false}};class qv extends Ut{constructor(){super({id:"tab-feature-settings",label:"Features"});H(this,"config",Me);}async build(n){const r=this.createGrid("12px");r.id="feature-settings",n.appendChild(r);const o=Se(Ee.CONFIG,{});this.config=this.mergeConfig(o),r.appendChild(this.createQOLCard()),r.appendChild(this.createVisualIndicatorsCard()),r.appendChild(this.createTrackingCard());}mergeConfig(n){return {autoFavorite:{...Me.autoFavorite,...n.autoFavorite},bulkFavorite:{...Me.bulkFavorite,...n.bulkFavorite},journalChecker:{...Me.journalChecker,...n.journalChecker},pets:{...Me.pets,...n.pets},cropSizeIndicator:{...Me.cropSizeIndicator,...n.cropSizeIndicator},eggProbabilityIndicator:{...Me.eggProbabilityIndicator,...n.eggProbabilityIndicator},cropValueIndicator:{...Me.cropValueIndicator,...n.cropValueIndicator},xpTracker:{...Me.xpTracker,...n.xpTracker},abilityTracker:{...Me.abilityTracker,...n.abilityTracker},mutationTracker:{...Me.mutationTracker,...n.mutationTracker},cropBoostTracker:{...Me.cropBoostTracker,...n.cropBoostTracker},turtleTimer:{...Me.turtleTimer,...n.turtleTimer}}}createQOLCard(){return Be({title:"Quality of Life",padding:"lg",expandable:true,defaultExpanded:true},this.createToggleRow("Auto-Favorite",this.config.autoFavorite.enabled,n=>{this.config.autoFavorite.enabled=n,this.saveConfig();}),this.createToggleRow("Bulk Favorite",this.config.bulkFavorite.enabled,n=>{this.config.bulkFavorite.enabled=n,this.saveConfig(),ni.setEnabled(n);}),this.createToggleRow("Journal Checker",this.config.journalChecker.enabled,n=>{this.config.journalChecker.enabled=n,this.saveConfig();}),this.createToggleRow("Pets Panel",this.config.pets.enabled,n=>{this.config.pets.enabled=n,this.saveConfig();},"Show/hide the Pets tab"))}createVisualIndicatorsCard(){return Be({title:"Visual Indicators",variant:"soft",padding:"lg",expandable:true,defaultExpanded:true},this.createToggleRow("Crop Size",this.config.cropSizeIndicator.enabled,n=>{this.config.cropSizeIndicator.enabled=n,this.saveConfig();},"Shows size % and journal badges"),this.createToggleRow("Egg Probability",this.config.eggProbabilityIndicator.enabled,n=>{this.config.eggProbabilityIndicator.enabled=n,this.saveConfig();},"Shows hatch chances + mutation %"),this.createToggleRow("Crop Value",this.config.cropValueIndicator.enabled,n=>{this.config.cropValueIndicator.enabled=n,this.saveConfig();},"Shows coin value"))}createTrackingCard(){return Be({title:"Tracking & Analytics",variant:"soft",padding:"lg",expandable:true,defaultExpanded:false},this.createToggleRow("XP Tracker",this.config.xpTracker.enabled,n=>{this.config.xpTracker.enabled=n,this.saveConfig();}),this.createToggleRow("Ability Tracker",this.config.abilityTracker.enabled,n=>{this.config.abilityTracker.enabled=n,this.saveConfig();}),this.createToggleRow("Mutation Tracker",this.config.mutationTracker.enabled,n=>{this.config.mutationTracker.enabled=n,this.saveConfig();}),this.createToggleRow("Crop Boost Tracker",this.config.cropBoostTracker.enabled,n=>{this.config.cropBoostTracker.enabled=n,this.saveConfig();}),this.createToggleRow("Turtle Timer",this.config.turtleTimer.enabled,n=>{this.config.turtleTimer.enabled=n,this.saveConfig();}))}createToggleRow(n,r,o,i){const a=b("div",{className:i?"kv-col":"kv"}),s=b("div",{className:"kv"}),c=ri({text:n,tone:"default",size:"md"}),d=si({checked:r,onChange:o});if(s.append(c.root,d.root),i){a.appendChild(s);const l=b("p",{className:"helper-text",style:"font-size: 12px; color: var(--item-desc, var(--muted)); margin-top: 4px;"},i);return a.appendChild(l),a}return s}saveConfig(){Le(Ee.CONFIG,this.config),console.log("[FeatureSettings] Config saved:",this.config);}}const Xv=(function(){const t=typeof document<"u"&&document.createElement("link").relList;return t&&t.supports&&t.supports("modulepreload")?"modulepreload":"preload"})(),Jv=function(e){return "/"+e},Ja={},Qv=function(t,n,r){let o=Promise.resolve();if(n&&n.length>0){let c=function(d){return Promise.all(d.map(l=>Promise.resolve(l).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),s=a?.nonce||a?.getAttribute("nonce");o=c(n.map(d=>{if(d=Jv(d),d in Ja)return;Ja[d]=true;const l=d.endsWith(".css"),u=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${u}`))return;const p=document.createElement("link");if(p.rel=l?"stylesheet":Xv,l||(p.as="script"),p.crossOrigin="",p.href=d,s&&p.setAttribute("nonce",s),document.head.appendChild(p),l)return new Promise((f,g)=>{p.addEventListener("load",f),p.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${d}`)));})}));}function i(a){const s=new Event("vite:preloadError",{cancelable:true});if(s.payload=a,window.dispatchEvent(s),!s.defaultPrevented)throw a}return o.then(a=>{for(const s of a||[])s.status==="rejected"&&i(s.reason);return t().catch(i)})},Zv=`
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
`,ex=`
  .journal-see-more {
    display: flex;
    justify-content: center;
    padding: 8px 0;
  }

  .journal-see-more-link {
    font-family: 'Fredoka', var(--font-game), sans-serif;
    font-size: 12px;
    font-weight: 500;
    color: var(--accent, #60a5fa);
    cursor: pointer;
    transition: color 0.2s ease, transform 0.2s ease;
    text-decoration: none;
  }

  .journal-see-more-link:hover {
    color: var(--accent, #60a5fa);
    filter: brightness(1.2);
    text-decoration: underline;
  }

  .journal-see-more-link:active {
    transform: scale(0.98);
  }

  /* MagicGarden theme - use pill-to (greenish) instead of accent (yellow) */
  :host-context([data-theme="magicGarden"]) .journal-see-more-link {
    color: var(--pill-to);
  }

  :host-context([data-theme="magicGarden"]) .journal-see-more-link:hover {
    color: var(--pill-to);
  }
`;function tx(e){const{count:t,expanded:n=false,onClick:r}=e,o=b("div",{className:"journal-see-more"}),i=b("span",{className:"journal-see-more-link"},vo(t,n));r&&i.addEventListener("click",r),o.appendChild(i);const a=o;return a.setCount=s=>{i.textContent=vo(s,n);},a.setExpanded=s=>{i.textContent=vo(t,s);},a}function vo(e,t){return t?"− Show less":`+ and ${e} more...`}const nx=e=>e<15?"#F98B4B":e<25?"#FC6D30":e<50?"#F3D32B":e<75?"#E9B52F":e<100?"#5EAC46":"#0B893F",rx=e=>e>=100?"var(--complete)":e>=75?"var(--high)":e>=50?"var(--medium)":"var(--low)",ox={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function Qa(e){return e?ox[e]??0:0}function Za(e,t){try{if(t==="pets")return (ce.get("pets")||{})[e]?.rarity||null;if(t==="plants")return (ce.get("plants")||{})[e]?.seed?.rarity||null}catch{}return null}function ix({progress:e,activeTab:t,expandedCategories:n,onSpeciesClick:r,onToggleExpand:o}){const i=b("div",{className:"journal-content"}),a=b("div",{className:"journal-header"},"Garden Journal");if(i.appendChild(a),t!=="all"){const s=t==="plants"?e.plants:e.pets,c=b("div",{className:"journal-progress-indicator"}),d=Math.floor(s.variantsLogged/s.variantsTotal*100),l=b("span",{className:"percentage"},`Collected ${d}%`),u=b("span",{className:"count"},` (${s.variantsLogged}/${s.variantsTotal})`);c.appendChild(l),c.appendChild(u),i.appendChild(c);}return t==="all"?(i.appendChild(ir("Produce",e.plants,"plants",n.has("plants"),r,()=>o("plants"),true)),i.appendChild(ir("Pets",e.pets,"pets",n.has("pets"),r,()=>o("pets"),true))):t==="plants"?i.appendChild(ir("Produce",e.plants,"plants",n.has("plants"),r,()=>o("plants"))):i.appendChild(ir("Pets",e.pets,"pets",n.has("pets"),r,()=>o("pets"))),i}function ir(e,t,n,r,o,i,a=false){const s=b("div",{style:"display: flex; flex-direction: column;"}),c=b("div",{style:`
            max-height: ${r?"480px":"none"};
            overflow-y: ${r?"auto":"visible"};
            overflow-x: hidden;
            margin-bottom: 8px;
        `,className:"journal-species-list"}),d=b("div",{className:"journal-category-stats",style:"height: 28px; line-height: 28px; margin-bottom: 0; display: flex; align-items: center; gap: 6px;"}),l=b("div",{style:"width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(ie.isReady()){const h=n==="plants"?"plant":"pet",y=n==="plants"?"Carrot":"CommonEgg";if(ie.has(h,y)){const S=ie.toCanvas(h,y,{scale:.3});S.style.maxWidth="20px",S.style.maxHeight="20px",S.style.display="block",l.appendChild(S);}}}catch{}const u=t.speciesDetails.length,p=t.total,f=b("span",{},`[ ${e.toUpperCase()} ] — ${u}/${p} SPECIES`);if(d.append(l,f),s.appendChild(d),a){const h=b("div",{className:"journal-progress-indicator",style:"text-align: right; margin-bottom: 4px;"}),y=Math.floor(t.variantsLogged/t.variantsTotal*100),S=b("span",{className:"percentage"},`Collected ${y}%`),w=b("span",{className:"count"},` (${t.variantsLogged}/${t.variantsTotal})`);h.appendChild(S),h.appendChild(w),s.appendChild(h);}const g=[...t.speciesDetails].sort((h,y)=>{const S=Za(h.species,n),w=Za(y.species,n),x=Qa(S)-Qa(w);return x!==0?x:h.species.localeCompare(y.species,void 0,{numeric:true,sensitivity:"base"})}),m=r?g:g.slice(0,5);for(const h of m)c.appendChild(ax(h,n,o));if(s.appendChild(c),t.speciesDetails.length>5){const h=tx({count:t.speciesDetails.length-5,expanded:r,onClick:()=>{i();}});s.appendChild(h);}else s.appendChild(b("div",{style:"height: 28px;"}));return s}function ax(e,t,n){const r=b("div",{className:"journal-row",style:"height: 56px;",onclick:p=>{p.stopPropagation(),n(e,t);}}),o=b("div",{style:"width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{let f=t==="plants"?"plant":"pet",g=e.species;t==="plants"&&(e.species==="DawnCelestial"&&(g="DawnCelestialCrop"),e.species==="MoonCelestial"&&(g="MoonCelestialCrop"),e.species==="OrangeTulip"&&(g="Tulip"));const m=e.isComplete?["Rainbow"]:[],h=(S,w)=>{try{if(ie.has(S,w))return ie.toCanvas(S,w,{scale:.4,mutations:m})}catch{}return null},y=h(f,g)||(t==="plants"?h("tallplant",g):null)||h(f,g.toLowerCase())||(t==="plants"?h("tallplant",g.toLowerCase()):null);y?(y.style.maxWidth="32px",y.style.maxHeight="32px",y.style.display="block",o.appendChild(y)):console.warn(`[JournalChecker] No sprite found for ${e.species} in ${t}`);}catch(p){console.error(`[JournalChecker] Sprite error for ${e.species}`,p);}const i=b("div",{style:"flex: 1; position: relative; height: 22px;"}),a=b("div",{className:"journal-bar-container",style:"width: 100%; height: 100%; border-radius: 4px; overflow: hidden;"});let s;if(e.isComplete)s="width: 100%; height: 100%; background: linear-gradient(90deg, rgb(255,0,0) 0%, rgb(255,154,0) 14%, rgb(255,255,0) 28%, rgb(0,255,0) 42%, rgb(0,200,255) 56%, rgb(0,0,255) 70%, rgb(143,0,255) 84%, rgb(255,0,255) 100%);";else {const p=nx(e.variantsPercentage);s=`width: ${Math.max(2,e.variantsPercentage)}%; height: 100%; background: ${p};`;}const c=b("div",{className:e.isComplete?"journal-bar-fill rainbow":"journal-bar-fill",style:s});a.appendChild(c);const d=b("div",{style:"position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-weight: 600; font-size: 14px; color: var(--journal-ink); z-index: 1; pointer-events: none;"},e.species);i.append(a,d);const l=rx(e.variantsPercentage),u=b("span",{style:`flex-shrink: 0; font-weight: 800; font-size: 13px; min-width: 50px; text-align: right; color: ${l};`},`${Math.round(e.variantsPercentage)}%`);return r.append(o,i,u),r}function sx({species:e,category:t,onBack:n}){const r=b("div",{className:"journal-content"}),o=b("div",{className:"journal-back",onclick:d=>{d.stopPropagation(),n();}},"← Return");r.appendChild(o);const i=b("div",{className:"journal-header"},e.species);r.appendChild(i);const a=b("div",{className:"journal-category-stats",style:"text-align: center; height: 28px; line-height: 28px; margin-bottom: 28px;"},`[ ${e.variantsLogged.length} / ${e.variantsTotal} STAMPS ]`);r.appendChild(a);const s=b("div",{className:"journal-grid"}),c=[...e.variantsLogged,...e.variantsMissing].sort((d,l)=>d==="Normal"?-1:l==="Normal"||d==="Max Weight"?1:l==="Max Weight"?-1:d.localeCompare(l));for(const d of c){const l=e.variantsLogged.includes(d);s.appendChild(lx(e.species,d,t,l));}return r.appendChild(s),r}function lx(e,t,n,r){const o=b("div",{className:"journal-stamp-wrapper"}),i=b("div",{className:"journal-stamp",style:r?"":"opacity: 0.1; filter: grayscale(100%);"});try{const s=t!=="Normal"&&t!=="Max Weight"?[t]:[];let d=n==="plants"?"plant":"pet",l=e;n==="plants"&&(e==="DawnCelestial"&&(l="DawnCelestialCrop"),e==="MoonCelestial"&&(l="MoonCelestialCrop"),e==="OrangeTulip"&&(l="Tulip"));const u=(f,g)=>{try{const m=t==="Max Weight"?.72:.6;if(ie.has(f,g))return ie.toCanvas(f,g,{mutations:s,scale:m,boundsMode:"padded"})}catch{}return null},p=u(d,l)||(n==="plants"?u("tallplant",l):null)||u(d,l.toLowerCase())||(n==="plants"?u("tallplant",l.toLowerCase()):null);p&&(p.style.width="44px",p.style.height="44px",p.style.objectFit="contain",p.style.display="block",i.appendChild(p));}catch{}const a=b("div",{className:"journal-stamp-label"},t);return o.append(i,a),o}const cx=`
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
    
    /* Dynamic color from tab index */
    background: linear-gradient(180deg, var(--tab-color) 0%, color-mix(in srgb, var(--tab-color), black 20%) 100%);
    border-left: 1px solid color-mix(in srgb, var(--tab-color), white 20%);
    border-right: 1px solid color-mix(in srgb, var(--tab-color), white 20%);
    border-top: 2px solid color-mix(in srgb, var(--tab-color), white 30%);
  }

  .journal-tab:hover {
    filter: brightness(1.1);
  }

  .journal-tab:active {
    transform: translateY(0);
  }

  /* Tab index color assignments using semantic accents */
  .journal-tab[data-tab-index="1"] { --tab-color: var(--accent-1); }
  .journal-tab[data-tab-index="2"] { --tab-color: var(--accent-2); }
  .journal-tab[data-tab-index="3"] { --tab-color: var(--accent-3); }
  .journal-tab[data-tab-index="4"] { --tab-color: var(--accent-1); }
  .journal-tab[data-tab-index="5"] { --tab-color: var(--accent-2); }

  /* Active State - Raised and Extended */
  .journal-tab.active {
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

  .journal-tab:not(.active) {
    opacity: 0.85;
  }
`;function dx(e){const{label:t,tabId:n,tabIndex:r,active:o=false,onClick:i}=e,a=b("button",{className:`journal-tab ${o?"active":""}`,"data-tab":n,"data-tab-index":String(r)},t),s=`var(--journal-tab-${Math.min(5,Math.max(1,r))})`;a.style.setProperty("--tab-color",s),i&&a.addEventListener("click",i);const c=a;return c.setActive=d=>{d?a.classList.add("active"):a.classList.remove("active");},c.setLabel=d=>{a.textContent=d;},c}const ux=`
  .journal-progress-row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 0;
    min-height: 40px;
  }

  .journal-progress-sprite {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .journal-progress-bar-wrapper {
    flex: 1;
    position: relative;
    min-width: 0;
  }

  .journal-progress-label {
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
  }

  .journal-progress-track {
    width: 100%;
    height: 24px;
    background: var(--muted, rgba(229,231,235,0.08));
    border-radius: 4px;
    overflow: hidden;
    position: relative;
  }

  .journal-progress-fill {
    height: 100%;
    border-radius: 4px;
    transition: width 0.3s ease, background 0.3s ease;
  }

  .journal-progress-fill.journal-bar-rainbow {
    background-size: 200% 100%;
    animation: rainbow-shimmer 3s linear infinite;
  }

  @keyframes rainbow-shimmer {
    0% { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
  }

  .journal-progress-pct {
    width: 45px;
    text-align: right;
    font-family: 'Fredoka', var(--font-game), sans-serif;
    font-size: 12px;
    font-weight: 700;
    color: var(--journal-header, #5E5043);
    flex-shrink: 0;
  }
`,px={activeTab:"all",expandedCategories:[]};let Ct=null;async function fx(){return Ct||(Ct=await Lr("tab-journal-checker",{version:1,defaults:px}),Ct)}function ar(){if(!Ct)throw new Error("[JournalChecker] Section state not initialized. Call initSectionState() first.");return Ct}function sr(){return Ct!==null}const gx=[{id:"all",label:"All",colorTheme:"teal"},{id:"plants",label:"Crops",colorTheme:"green"},{id:"pets",label:"Pets",colorTheme:"purple"}];class mx extends Ut{constructor(){super({id:"tab-journal-checker",label:"Journal"});H(this,"progress",null);H(this,"currentView",{type:"overview"});}async build(n){this.container=n,await fx(),await ie.init(),console.log("[JournalChecker] Sprite categories:",ie.getCategories());const r=n.getRootNode();kt(r,Zv,"journal-checker-styles"),kt(r,cx,"journal-tab-styles"),kt(r,ux,"journal-progress-bar-styles"),kt(r,ex,"journal-see-more-styles"),this.container.classList.add("journal-checker-host"),this.container.style.height="100%",this.container.style.overflowY="auto",await this.updateProgress();const o=(i=>{this.progress=i.detail,this.refresh();});window.addEventListener("gemini:journal-updated",o),this.addCleanup(()=>{window.removeEventListener("gemini:journal-updated",o);});}async updateProgress(){try{const{MGJournalChecker:n}=await Qv(async()=>{const{MGJournalChecker:r}=await Promise.resolve().then(()=>mv);return {MGJournalChecker:r}},void 0);this.progress=await n.aggregateJournalProgress(),this.refresh();}catch(n){console.error("[JournalChecker] Failed to load progress:",n);}}get activeTab(){return sr()?ar().get().activeTab:"all"}set activeTab(n){sr()&&ar().update({activeTab:n});}get expandedCategories(){return sr()?new Set(ar().get().expandedCategories):new Set}setExpandedCategories(n){sr()&&ar().update({expandedCategories:Array.from(n)});}refresh(){if(this.container){if(this.container.innerHTML="",!this.progress){this.container.appendChild(b("div",{style:"padding: 20px; text-align: center; font-family: var(--font-game); color: var(--journal-sub);"},"Loading Journal..."));return}this.container.appendChild(this.renderTabNavigation()),this.currentView.type==="overview"?this.container.appendChild(ix({progress:this.progress,activeTab:this.activeTab,expandedCategories:this.expandedCategories,onSpeciesClick:(n,r)=>{this.currentView={type:"species",species:n,category:r},this.refresh();},onToggleExpand:n=>{const r=this.expandedCategories;r.has(n)?r.delete(n):r.add(n),this.setExpandedCategories(r),this.refresh();}})):this.container.appendChild(sx({species:this.currentView.species,category:this.currentView.category,onBack:()=>{this.currentView={type:"overview"},this.refresh();}}));}}renderTabNavigation(){const n=b("div",{className:"journal-tabs-container"});return gx.forEach((r,o)=>{const i=dx({label:r.label,tabId:r.id,tabIndex:o+1,active:this.activeTab===r.id,onClick:()=>{this.activeTab=r.id,this.refresh();}});n.appendChild(i);}),n}}function hx(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("width","24"),e.setAttribute("height","24"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","2"),e.setAttribute("stroke-linecap","round"),e.style.color="var(--accent)";const t=document.createElementNS("http://www.w3.org/2000/svg","line");t.setAttribute("x1","12"),t.setAttribute("y1","5"),t.setAttribute("x2","12"),t.setAttribute("y2","19");const n=document.createElementNS("http://www.w3.org/2000/svg","line");return n.setAttribute("x1","5"),n.setAttribute("y1","12"),n.setAttribute("x2","19"),n.setAttribute("y2","12"),e.appendChild(t),e.appendChild(n),e}function bx(e,t){const n=e;let r=e;const o=ps({value:e,placeholder:"Team name",mode:"alphanumeric",allowSpaces:true,maxLength:50,blockGameKeys:true,onChange:i=>{const a=i.trim();a&&a!==r&&(r=a,t?.(a));},onEnter:i=>{const a=i.trim()||n;a!==r&&(r=a,t?.(a));}});return o.root.className="team-list-item__name-input",o.input.addEventListener("blur",()=>{const i=o.getValue().trim()||n;i!==r&&(r=i,t?.(i));}),o.input.addEventListener("keydown",i=>{i.key==="Escape"&&(i.preventDefault(),o.input.blur());}),o.root}function yx(e){const t=b("div",{className:"team-list-item"}),n=e.customIndicator??b("div",{className:`team-list-item__indicator ${e.isActive?"team-list-item__indicator--active":"team-list-item__indicator--inactive"}`}),r=e.isNameEditable?bx(e.team.name,e.onNameChange):b("div",{textContent:e.team.name,className:`team-list-item__name ${e.isActive?"team-list-item__name--active":"team-list-item__name--inactive"}`}),o=b("div",{className:"team-list-item__sprites"});function i(){const c=it.myPets.get();o.innerHTML="";for(let d=0;d<3;d++){const l=e.team.petIds[d],u=l&&l!=="",p=b("div",{className:`team-list-item__sprite-slot ${e.showSlotStyles&&!u?"team-list-item__sprite-slot--empty":""}`});if(e.onSlotClick&&(p.style.cursor="pointer",p.addEventListener("click",()=>{e.onSlotClick(d);})),u){let f=c.all.find(g=>g.id===l);if(!f){const g=window.__petDataCache;g&&g.has(l)&&(f=g.get(l));}if(f)try{const g=ie.toCanvas("pet",f.petSpecies,{mutations:f.mutations,scale:1}),m=document.createElement("canvas");m.width=g.width,m.height=g.height;const h=m.getContext("2d");if(h&&h.drawImage(g,0,0),m.style.width="100%",m.style.height="100%",m.style.objectFit="contain",p.appendChild(m),e.showSlotStyles){const y=b("div",{className:"team-list-item__sprite-slot-overlay"});p.appendChild(y),p.classList.add("team-list-item__sprite-slot--filled");}}catch(g){console.warn(`[TeamListItem] Failed to render sprite for pet ${f.petSpecies}:`,g);const m=b("div",{textContent:"🐾",className:"team-list-item__sprite-placeholder"});p.appendChild(m);}else {const g=b("div",{textContent:"⏳",className:"team-list-item__sprite-placeholder"});p.appendChild(g),console.warn(`[TeamListItem] Pet ${l} not found in myPets yet, waiting for update`);let m=false;const h=it.myPets.subscribe(()=>{if(m)return;const S=it.myPets.get().all.find(w=>w.id===l);if(S){m=true,h();try{p.innerHTML="";const w=ie.toCanvas("pet",S.petSpecies,{mutations:S.mutations,scale:1}),x=document.createElement("canvas");x.width=w.width,x.height=w.height;const I=x.getContext("2d");if(I&&I.drawImage(w,0,0),x.style.width="100%",x.style.height="100%",x.style.objectFit="contain",p.appendChild(x),e.showSlotStyles){const v=b("div",{className:"team-list-item__sprite-slot-overlay"});p.appendChild(v),p.classList.add("team-list-item__sprite-slot--filled");}console.log(`[TeamListItem] Pet ${l} sprite updated`);}catch(w){console.warn(`[TeamListItem] Failed to render sprite for pet ${S.petSpecies}:`,w),p.innerHTML="<div class='team-list-item__sprite-placeholder'>🐾</div>";}}},{immediate:false});}}else if(e.showSlotStyles&&!u){const f=hx();p.appendChild(f);}o.appendChild(p);}}i();const a=it.myPets.subscribe(()=>{i();});if(!e.hideDragHandle){const c=b("div",{textContent:"⋮⋮",className:"team-list-item__drag-handle"});t.appendChild(c);}t.appendChild(n),t.appendChild(r),t.appendChild(o);const s=new MutationObserver(()=>{document.contains(t)||(s.disconnect(),a());});return s.observe(document.body,{childList:true,subtree:true}),t}function vx(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function xx(e){const{segments:t,selected:n=t[0]?.id??"",size:r="md",fullWidth:o=false,disabled:i=false,onChange:a}=e,s=b("div",{className:"sg-root"});r!=="md"&&s.classList.add(`sg--${r}`),o&&(s.style.width="100%");const c=b("div",{className:"sg-container",role:"tablist"}),d=b("div",{className:"sg-indicator"}),l=t.map(v=>{const C=b("button",{className:"sg-btn",type:"button",role:"tab","aria-selected":"false",title:v.label});if(C.id=v.id,v.icon){const k=b("span",{className:"sg-icon"}),P=vx(v.icon);P&&k.appendChild(P),C.appendChild(k);}const T=b("span",{className:"sg-label"},v.label);return C.appendChild(T),C.disabled=!!v.disabled,C});c.appendChild(d),l.forEach(v=>c.appendChild(v)),s.appendChild(c);let u=n,p=i;function f(){const v=l.find(C=>C.id===u);v&&requestAnimationFrame(()=>{const C=d,T=v.offsetLeft,k=v.offsetWidth;C.style.width=`${k}px`,C.style.transform=`translateX(${T}px)`;});}function g(){l.forEach(v=>{const C=v.id===u;v.classList.toggle("active",C),v.setAttribute("aria-selected",String(C)),v.disabled=p||!!t.find(T=>T.id===v.id)?.disabled;}),f();}function m(v){const C=v.currentTarget;if(C.disabled)return;y(C.id);}function h(v){if(p)return;const C=l.findIndex(k=>k.id===u);let T=C;if(v.key==="ArrowLeft"||v.key==="ArrowUp"?(v.preventDefault(),T=(C-1+l.length)%l.length):v.key==="ArrowRight"||v.key==="ArrowDown"?(v.preventDefault(),T=(C+1)%l.length):v.key==="Home"?(v.preventDefault(),T=0):v.key==="End"&&(v.preventDefault(),T=l.length-1),T!==C){const k=l[T];k&&!k.disabled&&(y(k.id),k.focus());}}l.forEach(v=>{v.addEventListener("click",m),v.addEventListener("keydown",h);});function y(v){!t.some(T=>T.id===v)||u===v||(u=v,g(),a?.(u));}function S(){return u}function w(v){p=!!v,g();}function x(){l.forEach(v=>{v.removeEventListener("click",m),v.removeEventListener("keydown",h);});}g(),queueMicrotask(()=>{const v=l.find(C=>C.id===u);if(v){const C=d;C.style.width=`${v.offsetWidth}px`,C.style.transform=`translateX(${v.offsetLeft}px)`;}});const I=s;return I.select=y,I.getSelected=S,I.setDisabled=w,I.destroy=x,I}function wx(e={}){const{id:t,checked:n=false,disabled:r=false,size:o="md",label:i,labelSide:a="right",onChange:s}=e,c=b("div",{className:"lg-checkbox-wrap"}),d=b("input",{className:`lg-checkbox lg-checkbox--${o}`,id:t,type:"checkbox",checked:!!n,disabled:!!r});let l=null;i&&a!=="none"&&(l=b("label",{className:"lg-checkbox-label",htmlFor:t},i)),l&&a==="left"?c.append(l,d):l&&a==="right"?c.append(d,l):c.append(d);let u=!!n,p=!!r;function f(){d.checked=u,d.disabled=p;}function g(C=false){p||(u=!u,f(),C||s?.(u));}function m(){p||g();}function h(C){p||(C.key===" "||C.key==="Enter")&&(C.preventDefault(),g());}d.addEventListener("click",m),d.addEventListener("keydown",h);function y(){return u}function S(C,T=false){u=!!C,f(),T||s?.(u);}function w(C){p=!!C,f();}function x(C){if(!C){l&&(l.remove(),l=null);return}l?l.textContent=C:(l=b("label",{className:"lg-checkbox-label",htmlFor:t},C),c.append(l));}function I(){d.focus();}function v(){d.removeEventListener("click",m),d.removeEventListener("keydown",h);}return f(),{root:c,input:d,isChecked:y,setChecked:S,setDisabled:w,setLabel:x,focus:I,destroy:v}}function kx(e){const t=getComputedStyle(e);if(!/(auto|scroll|overlay)/.test(t.overflowY+t.overflowX))return  false;const n=e.scrollHeight,r=e.clientHeight,o=e.scrollWidth,i=e.clientWidth;return n>r+1||o>i+1}function Sx(e){const t={overflow:e.style.overflow,overflowY:e.style.overflowY,overflowX:e.style.overflowX,touchAction:e.style.touchAction,overscrollBehavior:e.style.overscrollBehavior};e.style.overflow="hidden",e.style.overflowY="hidden",e.style.overflowX="hidden",e.style.touchAction="none",e.style.overscrollBehavior="contain";let n=false;return ()=>{n||(n=true,e.style.overflow=t.overflow,e.style.overflowY=t.overflowY,e.style.overflowX=t.overflowX,e.style.touchAction=t.touchAction,e.style.overscrollBehavior=t.overscrollBehavior);}}function Cx(e){const t=[],n=new Set;let r=e;for(;r;){if(r instanceof ShadowRoot){r=r.host;continue}if(r instanceof HTMLElement)!n.has(r)&&r!==e&&kx(r)&&(t.push(r),n.add(r)),r=r.parentElement??r.parentNode;else break}return document.body&&t.push(document.body),document.documentElement&&t.push(document.documentElement),t.filter((o,i,a)=>a.indexOf(o)===i)}function Ax(e){const n=Cx(e).map(Sx);let r=false;return ()=>{if(!r){r=true;for(let o=n.length-1;o>=0;o--)try{n[o]();}catch{}}}}class Ix{constructor(t={}){H(this,"card",null);H(this,"modeControl",null);H(this,"modeContainer",null);H(this,"teamContent",null);H(this,"listContainer",null);H(this,"dragState",null);H(this,"longPressState",null);H(this,"teamMode","overview");H(this,"selectedTeamIds",new Set);H(this,"teamCheckboxes",new Map);H(this,"onPointerMove");H(this,"onPointerUp");H(this,"onPointerCancel");H(this,"onLongPressPointerMove");H(this,"onLongPressPointerUp");H(this,"options");this.options=t,this.onPointerMove=this.handlePointerMove.bind(this),this.onPointerUp=this.handlePointerUp.bind(this),this.onPointerCancel=this.handlePointerCancel.bind(this),this.onLongPressPointerMove=this.handleLongPressPointerMove.bind(this),this.onLongPressPointerUp=this.handleLongPressPointerUp.bind(this);}build(){return this.card?this.card:this.createTeamCard()}destroy(){this.cleanupDrag(),this.cleanupLongPress(),this.modeControl&&(this.modeControl.destroy(),this.modeControl=null),this.teamCheckboxes.forEach(t=>{t.destroy();}),this.teamCheckboxes.clear(),this.selectedTeamIds.clear(),this.card=null,this.modeContainer=null,this.teamContent=null,this.listContainer=null;}render(){if(!this.card)return;if(!he.isEnabled()){this.renderDisabledState();return}this.modeContainer&&(this.modeContainer.style.display="flex"),this.ensureModeControl(),this.renderTeamContent();}createTeamCard(){const t=b("div",{className:"team-card-wrapper"});this.modeContainer=b("div",{className:"team-card__mode-container"}),t.appendChild(this.modeContainer),this.teamContent=b("div",{className:"team-card__content"}),t.appendChild(this.teamContent);const n=Be({title:"Team",subtitle:"Organize and switch between pet teams",expandable:true,defaultExpanded:true},t);return this.card=n,n}ensureModeControl(){if(this.modeContainer){if(!this.modeControl){this.modeControl=xx({segments:[{id:"overview",label:"Overview"},{id:"manage",label:"Manage"}],selected:this.teamMode,onChange:t=>{this.teamMode=t,this.renderTeamContent();}}),this.modeContainer.appendChild(this.modeControl);return}this.modeControl.getSelected()!==this.teamMode&&this.modeControl.select(this.teamMode);}}renderDisabledState(){if(!this.teamContent)return;this.cleanupDrag(),this.listContainer=null,this.modeContainer&&(this.modeContainer.style.display="none");const t=b("div",{className:"team-card__disabled-state"}),n=b("div",{textContent:"Pet Team feature is disabled",className:"team-card__disabled-message"}),r=wt({label:"Enable Feature",onClick:()=>{he.setEnabled(true),this.render();}});t.appendChild(n),t.appendChild(r),this.teamContent.replaceChildren(t);}renderTeamContent(){if(!this.teamContent)return;this.cleanupDrag(),this.cleanupLongPress(),this.listContainer=null,this.teamContent.replaceChildren(),this.teamCheckboxes.forEach(r=>r.destroy()),this.teamCheckboxes.clear(),this.selectedTeamIds.clear();const t=he.getAllTeams(),n=he.getActiveTeamId();if(t.length===0){const r=b("div",{textContent:"No teams yet. Create your first team!",className:"team-card__empty-state"});if(this.teamContent.appendChild(r),this.teamMode==="manage"){const o=b("div",{className:"team-card__actions"}),i=wt({label:"New Team",variant:"primary",onClick:()=>{this.handleCreateTeam();}});o.appendChild(i),this.teamContent.appendChild(o);}return}if(this.listContainer=b("div",{className:"team-card__list-container"}),t.forEach(r=>{const o=n===r.id;let i;this.teamMode==="manage"&&(i=this.createCheckboxIndicator(r.id));const a=yx({team:r,isActive:o,customIndicator:i?.root,hideDragHandle:this.teamMode==="manage",isNameEditable:this.teamMode==="manage",showSlotStyles:this.teamMode==="manage",onNameChange:s=>{this.handleRenameTeam(r.id,s);},onSlotClick:this.teamMode==="manage"?s=>{this.handleRemovePet(r.id,s);}:void 0});this.teamMode==="manage"&&a.classList.add("team-list-item--manage"),this.teamMode==="overview"&&(a.addEventListener("click",async s=>{if(!s.target.closest(".team-list-item__drag-handle")){a.classList.add("team-list-item--clicked"),setTimeout(()=>{a.classList.remove("team-list-item--clicked");},300);try{await he.activateTeam(r);}catch(d){console.error("[TeamCard] Failed to activate team:",d);}}}),a.addEventListener("pointerdown",s=>{if(s.button!==0)return;s.target.closest(".team-list-item__drag-handle")?this.startDrag(s,a,r.id):this.startLongPress(s,a,r.id);})),this.listContainer.appendChild(a);}),this.teamContent.appendChild(this.listContainer),this.teamMode==="manage"){const r=b("div",{className:"team-card__actions"}),o=wt({label:"New Team",variant:"primary",onClick:()=>{this.handleCreateTeam();}}),i=wt({label:"Delete Team",variant:"danger",disabled:this.selectedTeamIds.size===0,onClick:()=>{this.handleDeleteTeam();}});i.setAttribute("data-action","delete-team"),r.appendChild(o),r.appendChild(i),this.teamContent.appendChild(r);}}handleCreateTeam(){const t="New Team";let n=t,r=1;const o=he.getAllTeams(),i=new Set(o.map(a=>a.name));for(;i.has(n);)n=`${t} (${r})`,r++;try{he.createTeam(n,[])&&this.render();}catch{}}handleDeleteTeam(){if(this.selectedTeamIds.size===0)return;const t=Array.from(this.selectedTeamIds);for(const n of t)he.deleteTeam(n);this.render();}handleRenameTeam(t,n){he.renameTeam(t,n);}handleRemovePet(t,n){const r=he.getTeam(t);if(!r)return;const o=r.petIds[n];!o||o===""?this.handleAddPet(t,n):this.handleRemovePetFromSlot(t,n);}handleRemovePetFromSlot(t,n){const r=he.getTeam(t);if(!r)return;const o=[...r.petIds];o[n]="",he.updateTeam(t,{petIds:o}),this.render();}async handleAddPet(t,n){const r=he.getTeam(t);if(!r)return;const i=it.myPets.get().all.map(f=>({id:f.id,itemType:"Pet",petSpecies:f.petSpecies,name:f.name??null,xp:f.xp,hunger:f.hunger,mutations:f.mutations||[],targetScale:f.targetScale,abilities:f.abilities||[]})),a=new Set(r.petIds.filter(f=>f!=="")),s=i.filter(f=>!a.has(f.id));await de.set("myPossiblyNoLongerValidSelectedItemIndexAtom",null);const c=Ke.detect(),d=c.platform==="mobile"||c.viewportWidth<768;console.log("[TeamCard] Environment detection:",{platform:c.platform,viewportWidth:c.viewportWidth,isSmallScreen:d,hasSetHUDOpen:!!this.options.setHUDOpen}),d&&this.options.setHUDOpen&&(console.log("[TeamCard] Closing HUD for small screen"),this.options.setHUDOpen(false));const l=it.myInventory.subscribeSelection(f=>{if(f.current&&f.current.item){const g=f.current.item,m=[...r.petIds];m[n]=g.id,he.updateTeam(t,{petIds:m}),de.set("myPossiblyNoLongerValidSelectedItemIndexAtom",null),fn.close().then(()=>{const h=Ke.detect(),y=h.platform==="mobile"||h.viewportWidth<768;console.log("[TeamCard] After selection - reopening HUD:",{platform:h.platform,viewportWidth:h.viewportWidth,shouldReopenHUD:y,hasSetHUDOpen:!!this.options.setHUDOpen}),y&&this.options.setHUDOpen&&(console.log("[TeamCard] Reopening HUD after selection"),this.options.setHUDOpen(true)),this.render();});}});await fn.show("inventory",{items:s,favoritedItemIds:[]}),await fn.waitForClose();const u=Ke.detect(),p=u.platform==="mobile"||u.viewportWidth<768;console.log("[TeamCard] Modal closed without selection - reopening HUD:",{platform:u.platform,viewportWidth:u.viewportWidth,shouldReopenHUD:p,hasSetHUDOpen:!!this.options.setHUDOpen}),p&&this.options.setHUDOpen&&(console.log("[TeamCard] Reopening HUD after modal close"),this.options.setHUDOpen(true)),l();}createCheckboxIndicator(t){const n=wx({checked:this.selectedTeamIds.has(t),size:"md",onChange:r=>{r?this.selectedTeamIds.add(t):this.selectedTeamIds.delete(t),this.updateDeleteButtonState();}});return this.teamCheckboxes.set(t,n),n}updateDeleteButtonState(){const t=this.teamContent?.querySelector('[data-action="delete-team"]');t&&(t.disabled=this.selectedTeamIds.size===0);}cleanupDrag(){this.dragState&&(window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),window.removeEventListener("pointercancel",this.onPointerCancel),this.dragState=null);}cleanupLongPress(){this.longPressState&&(window.clearTimeout(this.longPressState.timeout),window.removeEventListener("pointermove",this.onLongPressPointerMove),window.removeEventListener("pointerup",this.onLongPressPointerUp),this.longPressState=null);}startLongPress(t,n,r){if(this.cleanupLongPress(),he.getAllTeams().findIndex(d=>d.id===r)===-1)return;const a=t.clientX,s=t.clientY,c=window.setTimeout(()=>{this.longPressState&&this.startDrag(t,n,r);},500);this.longPressState={pointerId:t.pointerId,startX:a,startY:s,timeout:c,target:n},window.addEventListener("pointermove",this.onLongPressPointerMove,{passive:false}),window.addEventListener("pointerup",this.onLongPressPointerUp,{passive:false});}handleLongPressPointerMove(t){if(!this.longPressState||t.pointerId!==this.longPressState.pointerId)return;const n=Math.abs(t.clientX-this.longPressState.startX),r=Math.abs(t.clientY-this.longPressState.startY),o=10;(n>o||r>o)&&this.cleanupLongPress();}handleLongPressPointerUp(t){!this.longPressState||t.pointerId!==this.longPressState.pointerId||this.cleanupLongPress();}handlePointerMove(t){if(!this.dragState||!this.listContainer||t.pointerId!==this.dragState.pointerId)return;t.preventDefault();const n=this.listContainer.getBoundingClientRect();let r=t.clientY-n.top-this.dragState.offsetY;const o=n.height-this.dragState.itemEl.offsetHeight;Number.isFinite(o)&&(r=Math.max(-8,Math.min(o+8,r))),this.dragState.itemEl.style.top=`${r}px`,this.updatePlaceholderPosition(t.clientY);}handlePointerUp(t){!this.dragState||t.pointerId!==this.dragState.pointerId||(t.preventDefault(),this.finishDrag());}handlePointerCancel(t){!this.dragState||t.pointerId!==this.dragState.pointerId||this.finishDrag({revert:true});}updatePlaceholderPosition(t){if(!this.dragState||!this.listContainer)return;const{placeholder:n,itemEl:r}=this.dragState,o=Array.from(this.listContainer.children).filter(s=>s!==r&&s!==n&&s instanceof HTMLElement&&s.classList.contains("team-list-item")),i=new Map;o.forEach(s=>{i.set(s,s.getBoundingClientRect().top);});let a=false;for(const s of o){const c=s.getBoundingClientRect(),d=c.top+c.height/2;if(t<d){n.nextSibling!==s&&this.listContainer.insertBefore(n,s),a=true;break}}a||this.listContainer.appendChild(n),o.forEach(s=>{const c=i.get(s),d=s.getBoundingClientRect().top;if(c!==void 0&&c!==d){const l=c-d;s.style.transform=`translateY(${l}px)`,s.style.transition="none",s.offsetHeight,s.style.transition="transform 0.14s ease",s.style.transform="translateY(0)";}});}startDrag(t,n,r){if(this.dragState||!this.listContainer)return;t.preventDefault();const i=he.getAllTeams().findIndex(u=>u.id===r);if(i===-1)return;const a=n.getBoundingClientRect(),s=this.listContainer.getBoundingClientRect(),c=n.cloneNode(true);c.classList.add("team-list-item--placeholder"),c.classList.remove("team-list-item--dragging");const d=n.style.touchAction;n.style.touchAction="none";const l=Ax(n);if(this.dragState={itemEl:n,pointerId:t.pointerId,placeholder:c,offsetY:t.clientY-a.top,fromIndex:i,teamId:r,captureTarget:n,touchActionPrev:d,releaseScrollLock:l},n.classList.add("team-list-item--dragging"),n.style.width=`${a.width}px`,n.style.height=`${a.height}px`,n.style.left=`${a.left-s.left}px`,n.style.top=`${a.top-s.top}px`,n.style.position="absolute",n.style.zIndex="30",n.style.pointerEvents="none",this.listContainer.style.position||(this.listContainer.style.position="relative"),this.listContainer.insertBefore(c,n.nextSibling),this.listContainer.classList.add("is-reordering"),n.setPointerCapture)try{n.setPointerCapture(t.pointerId);}catch{}window.addEventListener("pointermove",this.onPointerMove,{passive:false}),window.addEventListener("pointerup",this.onPointerUp,{passive:false}),window.addEventListener("pointercancel",this.onPointerCancel,{passive:false});}finishDrag(t={}){if(!this.dragState||!this.listContainer)return;const{revert:n=false}=t,{itemEl:r,placeholder:o,fromIndex:i,teamId:a,touchActionPrev:s,releaseScrollLock:c,pointerId:d}=this.dragState;if(this.listContainer.classList.remove("is-reordering"),r.hasPointerCapture(d))try{r.releasePointerCapture(d);}catch{}if(window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),window.removeEventListener("pointercancel",this.onPointerCancel),n){const p=Array.from(this.listContainer.children).filter(f=>f!==r&&f!==o&&f instanceof HTMLElement&&f.classList.contains("team-list-item"))[i]||null;p?this.listContainer.insertBefore(o,p):this.listContainer.appendChild(o);}else {const u=Array.from(this.listContainer.children).filter(f=>f!==r),p=u.indexOf(o);if(p!==-1){const f=u[p];f!==o&&this.listContainer.insertBefore(o,f);}}if(o.replaceWith(r),o.remove(),r.classList.remove("team-list-item--dragging"),r.style.width="",r.style.height="",r.style.left="",r.style.top="",r.style.position="",r.style.zIndex="",r.style.pointerEvents="",r.style.touchAction=s??"",Array.from(this.listContainer.children).filter(u=>u instanceof HTMLElement&&u.classList.contains("team-list-item")).forEach(u=>{u.style.transform="",u.style.transition="";}),c?.(),!n){const p=Array.from(this.listContainer.children).filter(f=>f instanceof HTMLElement&&f.classList.contains("team-list-item")).indexOf(r);if(p!==-1&&p!==i){const g=he.getAllTeams().slice(),[m]=g.splice(i,1);g.splice(p,0,m);const h=g.map(y=>y.id);he.reorderTeams(h),this.options.onTeamReordered?.(h);}}this.dragState=null;}}class Tx{constructor(){H(this,"card",null);H(this,"listContainer",null);H(this,"logs",[]);H(this,"filteredLogs",[]);H(this,"unsubscribe",null);}build(){return this.card?this.card:this.createAbilityLogsCard()}destroy(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null),this.card=null,this.listContainer=null,this.logs=[],this.filteredLogs=[];}async render(){const t=Mn();this.unsubscribe=t.subscribe(n=>{this.updateFromAbilityLogs(n.abilityLogs);});}updateFromAbilityLogs(t){if(!t||!Array.isArray(t)){this.logs=[],this.filteredLogs=[],this.updateList();return}this.logs=t.map(n=>{const i=ce.get("abilities")?.[n.abilityId]?.name||n.abilityId||"Unknown Ability",a={action:n.abilityId,timestamp:n.performedAt,parameters:n.data||{}},s=cp(a);return {timestamp:n.performedAt,petName:n.petName,petSpecies:n.petSpecies,abilityName:i,abilityId:n.abilityId,description:s}}),this.filteredLogs=[...this.logs],this.updateList();}createAbilityBadge(t,n){return Li({variant:"ability",abilityId:t,abilityName:n}).root}createAbilityLogsCard(){const t=b("div",{className:"ability-logs-container",style:"display: flex; flex-direction: column; gap: 12px;"}),n=b("div",{style:"margin-bottom: 0;"}),r=li({placeholder:"Search logs...",value:"",debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:o=>{const i=o.trim().toLowerCase();i?this.filteredLogs=this.logs.filter(a=>a.petName.toLowerCase().includes(i)||a.petSpecies.toLowerCase().includes(i)||a.abilityName.toLowerCase().includes(i)||a.description.toLowerCase().includes(i)):this.filteredLogs=[...this.logs],this.updateList();}});return n.appendChild(r.root),t.appendChild(n),this.listContainer=b("div",{className:"ability-logs-list",style:"display: flex; flex-direction: column; gap: 8px; max-height: 480px; overflow-y: auto; overflow-x: hidden;"}),t.appendChild(this.listContainer),this.card=Be({title:"Ability Logs",subtitle:"Track all pet ability activations",expandable:true,defaultExpanded:true},t),this.card}updateList(){if(!this.listContainer)return;this.listContainer.replaceChildren();const t=[...this.filteredLogs].sort((n,r)=>r.timestamp-n.timestamp);if(t.length===0){const n=b("div",{className:"ability-logs-empty",style:"padding: 24px; text-align: center; color: color-mix(in oklab, var(--fg) 60%, #9ca3af); font-size: 14px;"},"No ability logs yet");this.listContainer.appendChild(n);return}t.forEach(n=>{const r=this.createLogItemCard(n);this.listContainer.appendChild(r);});}createLogItemCard(t){const n=b("div",{className:"ability-log-item",style:"background: var(--soft); border: 1px solid var(--border); border-radius: 8px; padding: 12px; display: flex; gap: 12px; align-items: center; transition: all 0.2s ease;"});n.addEventListener("mouseenter",()=>{n.style.background="color-mix(in oklab, var(--soft) 90%, var(--fg) 10%)",n.style.borderColor="color-mix(in oklab, var(--border) 70%, var(--fg) 30%)";}),n.addEventListener("mouseleave",()=>{n.style.background="var(--soft)",n.style.borderColor="var(--border)";});const r=b("div",{style:"width: 40px; height: 40px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: var(--muted); border-radius: 6px;"});try{const f=ie.toCanvas("pet",t.petSpecies);f&&(f.style.width="100%",f.style.height="100%",f.style.objectFit="contain",r.appendChild(f));}catch{r.textContent="🐾",r.style.fontSize="24px";}n.appendChild(r);const o=b("div",{style:"flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px;"}),i=b("div",{style:"display: flex; align-items: center; justify-content: space-between; gap: 8px;"}),a=b("div",{style:"font-size: 14px; font-weight: 700; color: var(--fg); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"},t.petName),s=new Date(t.timestamp),c=s.toLocaleDateString("en-US",{month:"short",day:"numeric"}),d=s.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}),l=b("div",{style:"font-size: 11px; font-weight: 500; color: color-mix(in oklab, var(--fg) 60%, #9ca3af); white-space: nowrap;"},`${c} ${d}`);i.appendChild(a),i.appendChild(l),o.appendChild(i);const u=this.createAbilityBadge(t.abilityId,t.abilityName);o.appendChild(u);const p=b("div",{style:"font-size: 12px; color: color-mix(in oklab, var(--fg) 70%, #9ca3af); line-height: 1.4; overflow: hidden; text-overflow: ellipsis;"},t.description);return o.appendChild(p),n.appendChild(o),n}}const Px=`
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
`;class Ex extends Ut{constructor(n){super({id:"tab-pets",label:"Pets"});H(this,"unsubscribeMyPets");H(this,"lastActiveTeamId",null);H(this,"teamCardPart",null);H(this,"abilityLogsCardPart",null);H(this,"deps");this.deps=n;}async build(n){this.container=n;const r=n.getRootNode();kt(r,Px,"ability-logs-card-styles");const o=this.createGrid("12px");o.id="pets",n.appendChild(o),this.initializeTeamCardPart(o),this.initializeAbilityLogsCardPart(o),this.unsubscribeMyPets=it.myPets.subscribeStable(()=>{const i=he.getActiveTeamId();i!==this.lastActiveTeamId&&(this.lastActiveTeamId=i,this.teamCardPart?.render());}),this.lastActiveTeamId=he.getActiveTeamId();}async destroy(){this.unsubscribeMyPets&&(this.unsubscribeMyPets(),this.unsubscribeMyPets=void 0),this.teamCardPart&&(this.teamCardPart.destroy(),this.teamCardPart=null),this.abilityLogsCardPart&&(this.abilityLogsCardPart.destroy(),this.abilityLogsCardPart=null);}initializeTeamCardPart(n){this.teamCardPart||(this.teamCardPart=new Ix({onTeamReordered:o=>{console.log("[PetsSection] Teams reordered:",o);},setHUDOpen:this.deps?.setHUDOpen}));const r=this.teamCardPart.build();n.appendChild(r),this.teamCardPart.render();}initializeAbilityLogsCardPart(n){this.abilityLogsCardPart||(this.abilityLogsCardPart=new Tx);const r=this.abilityLogsCardPart.build();n.appendChild(r),this.abilityLogsCardPart.render();}}const Mx={Store:{select:de.select.bind(de),set:de.set.bind(de),subscribe:de.subscribe.bind(de),subscribeImmediate:de.subscribeImmediate.bind(de)},Globals:it,Modules:{Version:vs,Assets:Vt,Manifest:dt,Data:ce,Environment:Ke,CustomModal:fn,Sprite:ie,Tile:pt,Pixi:Mi,Audio:El,Cosmetic:Ll},Features:{AutoFavorite:Di,JournalChecker:ic,BulkFavorite:Er,Achievements:cc,Tracker:Ic,AntiAfk:It,Calculators:jl,Pets:Tc,PetTeam:he},WebSocket:{chat:Mb,emote:Lb,wish:_b,kickPlayer:Fb,setPlayerData:Rb,usurpHost:Ob,reportSpeakingStart:Nb,setSelectedGame:$b,voteForGame:Db,requestGame:Bb,restartGame:jb,ping:zb,checkWeatherStatus:Wb,move:Gb,playerPosition:Ul,teleport:Hb,moveInventoryItem:Ub,dropObject:Vb,pickupObject:Kb,toggleFavoriteItem:Hr,putItemInStorage:Ni,retrieveItemFromStorage:$i,moveStorageItem:Yb,logItems:qb,plantSeed:Xb,waterPlant:Jb,harvestCrop:Qb,sellAllCrops:Zb,purchaseDecor:ey,purchaseEgg:ty,purchaseTool:ny,purchaseSeed:ry,plantEgg:oy,hatchEgg:iy,plantGardenPlant:ay,potPlant:sy,mutationPotion:ly,pickupDecor:cy,placeDecor:dy,removeGardenObject:uy,placePet:Vl,feedPet:py,petPositions:fy,swapPet:Kl,storePet:Yl,namePet:gy,sellPet:my},_internal:{getGlobals:ot,initGlobals:Gl,destroyGlobals:vb}};function Lx(){const e=L;e.Gemini=Mx,e.MGSprite=ie,e.MGData=ce,e.MGPixi=Mi,e.MGAssets=Vt,e.MGEnvironment=Ke;}let xo=null;function _x(){return xo||(xo=new Xm),xo}function Fx(e){return [new Qd(e),new qv,new bv,new mx,new Ex(e)]}async function Rx(){await _x().preload();}function Ox(e){const{shadow:t,initialOpen:n}=e,r=b("div",{className:"gemini-panel",id:"panel",ariaHidden:String(!n)}),o=b("div",{className:"gemini-tabbar"}),i=b("div",{className:"gemini-content",id:"content"}),a=b("div",{className:"gemini-resizer",title:"Resize"}),s=b("button",{className:"gemini-close",title:"Fermer",ariaLabel:"Fermer"},"✕");r.append(o,i,a);const c=b("div",{className:"gemini-wrapper"},r);return t.append(c),{panel:r,tabbar:o,content:i,resizer:a,closeButton:s,wrapper:c}}function Nx(e){const{resizer:t,host:n,shadow:r,onWidthChange:o,initialWidth:i,minWidth:a,maxWidth:s}=e;let c=a,d=s;function l(){const x=Ke.detect(),I=Math.round(L.visualViewport?.width??L.innerWidth??0);if(x.platform==="mobile"||x.os==="ios"||x.os==="android"){const v=getComputedStyle(r.host),C=parseFloat(v.getPropertyValue("--inset-l"))||0,T=parseFloat(v.getPropertyValue("--inset-r"))||0,k=Math.max(280,I-Math.round(C+T));c=280,d=k;}else c=a,d=s;return {min:c,max:d}}function u(x){return Math.max(c,Math.min(d,Number(x)||i))}function p(x){const I=u(x);n.style.setProperty("--w",`${I}px`),o(I);}l();const f=Ke.detect(),g=!(f.platform==="mobile"||f.os==="ios"||f.os==="android");let m=false;const h=x=>{if(!m)return;x.preventDefault();const I=Math.round(L.innerWidth-x.clientX);p(I);},y=()=>{m&&(m=false,document.body.style.cursor="",L.removeEventListener("mousemove",h),L.removeEventListener("mouseup",y));},S=x=>{g&&(x.preventDefault(),m=true,document.body.style.cursor="ew-resize",L.addEventListener("mousemove",h),L.addEventListener("mouseup",y));};t.addEventListener("mousedown",S);function w(){t.removeEventListener("mousedown",S),L.removeEventListener("mousemove",h),L.removeEventListener("mouseup",y);}return {calculateResponsiveBounds:l,constrainWidthToLimits:u,setHudWidth:p,destroy:w}}function $x(e){const{panel:t,onToggle:n,onClose:r,toggleCombo:o=c=>c.ctrlKey&&c.shiftKey&&c.key.toLowerCase()==="u",closeOnEscape:i=true}=e;function a(c){const d=t.classList.contains("open");if(i&&c.key==="Escape"&&d){r();return}o(c)&&(c.preventDefault(),c.stopPropagation(),n());}document.addEventListener("keydown",a,{capture:true});function s(){document.removeEventListener("keydown",a,{capture:true});}return {destroy:s}}const Dx=`
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
`,Bx=`
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
`,jx=`
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
`,zx=`
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
`,Gx=`
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
  
`,Hx=`
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
`,Wx=`
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
`,Ux=`
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
`,Vx=`
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
`,Kx=`
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
`,Yx=`
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
`,qx=`
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
`,Xx=`
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
`,Jx=`
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
`,Qx=`
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
`,Zx=`
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
  background-color: #4ade80;
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
  border: 1.5px solid #ef4444 !important;
  box-shadow: inset 0 2px 4px color-mix(in oklab, #ef4444 15%, transparent);
}

.team-list-item__sprite-slot-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: color-mix(in oklab, #ef4444 25%, transparent);
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
`,e0=`
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
`,t0=`
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
`,n0=`
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
`,r0=`
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
`,o0=`
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
`,i0=`
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
`,a0=`
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
`,s0=`
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
`,l0=`
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
`,c0={all:"initial",position:"fixed",top:"0",right:"0",zIndex:"2147483647",pointerEvents:"auto",fontFamily:'system-ui, -apple-system, "Segoe UI", Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',fontSize:"13px",lineHeight:"1.35"};function d0(e="gemini-root"){const t=document.createElement("div");t.id=e,Object.assign(t.style,c0),(document.body||document.documentElement).appendChild(t);const n=t.attachShadow({mode:"open"});return {host:t,shadow:n}}function u0(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:16}):setTimeout(e,0);})}async function p0(e){const{hostId:t="gemini-hud-root",initialWidth:n,initialOpen:r,onWidthChange:o,onOpenChange:i,themes:a,initialTheme:s,onThemeChange:c,buildSections:d,initialTab:l,onTabChange:u,toggleCombo:p=Q=>Q.ctrlKey&&Q.shiftKey&&Q.key.toLowerCase()==="u",closeOnEscape:f=true,minWidth:g=420,maxWidth:m=720}=e,{host:h,shadow:y}=d0(t),S=[[Bx,"variables"],[jx,"primitives"],[zx,"utilities"],[Dx,"hud"],[Gx,"card"],[Hx,"badge"],[Wx,"button"],[Jx,"checkbox"],[Ux,"input"],[Vx,"label"],[Kx,"navTabs"],[Yx,"searchBar"],[qx,"select"],[Xx,"switch"],[Qx,"table"],[Zx,"teamListItem"],[e0,"timeRangePicker"],[t0,"tooltip"],[n0,"slider"],[r0,"reorderableList"],[o0,"colorPicker"],[i0,"log"],[a0,"segmentedControl"],[s0,"settings"],[l0,"teamCard"],[_l,"autoFavoriteSettings"]];for(let Q=0;Q<S.length;Q++){const[X,ge]=S[Q];kt(y,X,ge),Q%5===4&&await u0();}const{panel:w,tabbar:x,content:I,resizer:v,closeButton:C,wrapper:T}=Ox({shadow:y,initialOpen:r});function k(Q){w.dispatchEvent(new CustomEvent("gemini:hud-open-change",{detail:{isOpen:Q},bubbles:true})),i?.(Q);}function P(Q){const X=w.classList.contains("open");w.classList.toggle("open",Q),w.setAttribute("aria-hidden",Q?"false":"true"),Q!==X&&k(Q);}P(r),C.addEventListener("click",Q=>{Q.preventDefault(),Q.stopPropagation(),P(false);});const E=Vd({host:h,themes:a,initialTheme:s,onThemeChange:c}),O=Nx({resizer:v,host:h,shadow:y,onWidthChange:o||(()=>{}),initialWidth:n,minWidth:g,maxWidth:m});O.setHudWidth(n);const ee=d({applyTheme:E.applyTheme,initialTheme:s,getCurrentTheme:E.getCurrentTheme,setHUDWidth:O.setHudWidth,setHUDOpen:P}),B=new Yc(ee,I,{applyTheme:E.applyTheme,getCurrentTheme:E.getCurrentTheme}),V=ee.map(Q=>({id:Q.id,label:Q.label})),ae=l&&ee.some(Q=>Q.id===l)?l:V[0]?.id||"",$=Kc(V,ae,Q=>{B.activate(Q),u?.(Q);});$.root.style.flex="1 1 auto",$.root.style.minWidth="0",x.append($.root,C);const j={"tab-auto-favorite":"autoFavorite","tab-journal-checker":"journalChecker","tab-pets":"pets"};function N(){const Q=Se(Ee.CONFIG,{autoFavorite:{enabled:false},journalChecker:{enabled:false},pets:{enabled:true}});for(const[X,ge]of Object.entries(j))Q[ge]?.enabled??false?$.showTab(X):$.hideTab(X);}function F(Q){const{key:X}=Q.detail;(X===Ee.CONFIG||X==="feature:config")&&N();}window.addEventListener(Yi.STORAGE_CHANGE,F),N();let _=ae;if(!$.isTabVisible(ae)){const Q=$.getVisibleTabs();Q.length>0&&(_=Q[0]);}_&&B.activate(_);const D=$x({panel:w,onToggle:()=>P(!w.classList.contains("open")),onClose:()=>P(false),toggleCombo:p,closeOnEscape:f}),R=()=>{$.recalc();const Q=parseInt(getComputedStyle(h).getPropertyValue("--w"))||n;O.calculateResponsiveBounds(),O.setHudWidth(Q);};L.addEventListener("resize",R);const z=Q=>{const X=Q.detail?.width;X?O.setHudWidth(X):O.setHudWidth(n),$.recalc();};h.addEventListener("gemini:layout-resize",z);function me(){window.removeEventListener(Yi.STORAGE_CHANGE,F),D.destroy(),O.destroy(),L.removeEventListener("resize",R),h.removeEventListener("gemini:layout-resize",z);}return {host:h,shadow:y,wrapper:T,panel:w,content:I,setOpen:P,setWidth:O.setHudWidth,sections:ee,manager:B,nav:$,destroy:me}}const cn={isOpen:"gemini.hud.isOpen",width:"gemini.hud.width",theme:"gemini.hud.theme",activeTab:"gemini.hud.activeTab"},lr={isOpen:false,width:480,theme:"dark",activeTab:"tab-settings"};function f0(){return {isOpen:Se(cn.isOpen,lr.isOpen),width:Se(cn.width,lr.width),theme:Se(cn.theme,lr.theme),activeTab:Se(cn.activeTab,lr.activeTab)}}function cr(e,t){Le(cn[e],t);}const g0="https://i.imgur.com/IMkhMur.png",m0="Stats";function h0(e){let t=e.iconUrl||g0;const n=e.ariaLabel||"Open MGH";let r=null,o=null,i=null,a=false,s=null,c=null;const d=["Chat","Leaderboard","Stats","Open Activity Log"],l=w=>{try{return typeof CSS<"u"&&CSS&&typeof CSS.escape=="function"?CSS.escape(w):w.replace(/"/g,'\\"')}catch{return w}};function u(){const w=document.querySelector(d.map(I=>`button[aria-label="${l(I)}"]`).join(","));if(!w)return null;let x=w.parentElement;for(;x&&x!==document.body;){if(d.reduce((v,C)=>v+x.querySelectorAll(`button[aria-label="${l(C)}"]`).length,0)>=2)return x;x=x.parentElement;}return null}function f(w){const x=Array.from(w.querySelectorAll("button[aria-label]"));if(!x.length)return {refBtn:null,refWrapper:null};const I=x.filter(O=>O.dataset.mghBtn!=="true"&&(O.getAttribute("aria-label")||"")!==(e.ariaLabel||"Open MGH")),v=I.length?I:x,C=v.find(O=>(O.getAttribute("aria-label")||"").toLowerCase()===m0.toLowerCase())||null,T=v.length>=2?v.length-2:v.length-1,k=C||v[T],P=k.parentElement,E=P&&P.parentElement===w&&P.tagName==="DIV"?P:null;return {refBtn:k,refWrapper:E}}function g(w,x,I){const v=w.cloneNode(false);v.type="button",v.setAttribute("aria-label",x),v.title=x,v.dataset.mghBtn="true",v.style.pointerEvents="auto",v.removeAttribute("id");const C=document.createElement("img");return C.src=I,C.alt="MGH",C.style.pointerEvents="none",C.style.userSelect="none",C.style.width="76%",C.style.height="76%",C.style.objectFit="contain",C.style.display="block",C.style.margin="auto",v.appendChild(C),v.addEventListener("click",T=>{T.preventDefault(),T.stopPropagation();try{e.onClick?.();}catch{}}),v}function m(){if(a)return  false;a=true;let w=false;try{const x=u();if(!x)return !1;s!==x&&(s=x);const{refBtn:I,refWrapper:v}=f(x);if(!I)return !1;o=x.querySelector('div[data-mgh-wrapper="true"]'),!o&&v&&(o=v.cloneNode(!1),o.dataset.mghWrapper="true",o.removeAttribute("id"),w=!0);const C=o?.querySelector('button[data-mgh-btn="true"]')||null;r||(r=C),r||(r=g(I,n,t),o?o.appendChild(r):r.parentElement!==x&&x.appendChild(r),w=!0),o&&o.parentElement!==x&&(x.appendChild(o),w=!0);const T=x;if(T&&T!==c){try{S.disconnect();}catch{}c=T,S.observe(c,{childList:!0,subtree:!0});}return w}finally{a=false;}}const h=document.getElementById("App")||document.body;let y=null;const S=new MutationObserver(w=>{const x=w.every(v=>{const C=Array.from(v.addedNodes||[]),T=Array.from(v.removedNodes||[]),k=C.concat(T);if(k.length===0){const P=v.target;return o&&(P===o||o.contains(P))||r&&(P===r||r.contains(P))}return k.every(P=>!!(!(P instanceof HTMLElement)||o&&(P===o||o.contains(P))||r&&(P===r||r.contains(P))))}),I=w.some(v=>Array.from(v.removedNodes||[]).some(C=>C instanceof HTMLElement?!!(o&&(C===o||o.contains(C))||r&&(C===r||r.contains(C))):false));x&&!I||y===null&&(y=window.setTimeout(()=>{if(y=null,m()&&o){const C=o.parentElement;C&&C.lastElementChild!==o&&C.appendChild(o);}},150));});return m(),S.observe(h,{childList:true,subtree:true}),i=()=>S.disconnect(),()=>{try{i?.();}catch{}try{o?.remove();}catch{}}}const Lc=[];function b0(){return Lc.slice()}function y0(e){Lc.push(e);}function _c(e){try{return JSON.parse(e)}catch{return}}function es(e){if(typeof e=="string"){const t=_c(e);return t!==void 0?t:e}return e}function Fc(e){if(e!=null){if(typeof e=="string"){const t=_c(e);return t!==void 0?Fc(t):e}if(Array.isArray(e)&&typeof e[0]=="string")return e[0];if(typeof e=="object"){const t=e;return t.type??t.Type??t.kind??t.messageType}}}function v0(e){const t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function q(e,t,n){const r=typeof t=="boolean"?t:true,o=typeof t=="function"?t:n,i=(a,s)=>{if(Fc(a)!==e)return;const d=o(a,s);return d&&typeof d=="object"&&"kind"in d?d:typeof d=="boolean"?d?void 0:{kind:"drop"}:r?void 0:{kind:"drop"}};return y0(i),i}const Zt=new WeakSet,ts=new WeakMap;function x0(e){const t=e.pageWindow,n=!!e.debug,r=e.middlewares&&e.middlewares.length?e.middlewares:b0();if(!r.length)return ()=>{};const o=p=>({ws:p,pageWindow:t,debug:n}),i=(p,f)=>{let g=p;for(const m of r){const h=m(g,o(f));if(h){if(h.kind==="drop")return {kind:"drop"};h.kind==="replace"&&(g=h.message);}}return g!==p?{kind:"replace",message:g}:void 0};let a=null,s=null,c=null;const d=()=>{const p=t?.MagicCircle_RoomConnection,f=p?.sendMessage;if(!p||typeof f!="function")return  false;if(Zt.has(f))return  true;const g=f.bind(p);function m(...h){const y=h.length===1?h[0]:h,S=es(y),w=i(S,v0(t));if(w?.kind==="drop"){n&&console.log("[WS] drop outgoing (RoomConnection.sendMessage)",S);return}if(w?.kind==="replace"){const x=w.message;return h.length>1&&Array.isArray(x)?(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",S,"=>",x),g(...x)):(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",S,"=>",x),g(x))}return g(...h)}Zt.add(m),ts.set(m,f);try{p.sendMessage=m,Zt.add(p.sendMessage),n&&console.log("[WS] outgoing patched via MagicCircle_RoomConnection.sendMessage");}catch{return  false}return a=()=>{try{p.sendMessage===m&&(p.sendMessage=f);}catch{}},true};(()=>{const p=t?.WebSocket?.prototype,f=p?.send;if(typeof f!="function"||Zt.has(f))return;function g(m){const h=es(m),y=i(h,this);if(y?.kind==="drop"){n&&console.log("[WS] drop outgoing (ws.send)",h);return}if(y?.kind==="replace"){const S=y.message,w=typeof S=="string"||S instanceof ArrayBuffer||S instanceof Blob?S:JSON.stringify(S);return n&&console.log("[WS] replace outgoing (ws.send)",h,"=>",S),f.call(this,w)}return f.call(this,m)}Zt.add(g),ts.set(g,f);try{p.send=g,n&&console.log("[WS] outgoing patched via WebSocket.prototype.send");}catch{return}s=()=>{try{p.send===g&&(p.send=f);}catch{}};})();const u=e.waitForRoomConnectionMs??4e3;if(!d()&&u>0){const p=Date.now();c=setInterval(()=>{if(d()){clearInterval(c),c=null;return}Date.now()-p>u&&(clearInterval(c),c=null,n&&console.log("[WS] RoomConnection not found, only ws.send is patched"));},250);}return ()=>{if(c){try{clearInterval(c);}catch{}c=null;}if(a){try{a();}catch{}a=null;}if(s){try{s();}catch{}s=null;}}}(function(){try{const t=({ url: (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('__entry.js', document.baseURI).href) }),n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();const Rc=[];function w0(){return Rc.slice()}function ns(e){Rc.push(e);}function k0(e){if(e!=null){if(typeof e=="object"){const t=e;if(typeof t.type=="string")return t.type;if(typeof t.Type=="string")return t.Type;if(typeof t.kind=="string")return t.kind;if(typeof t.messageType=="string")return t.messageType}if(Array.isArray(e)&&typeof e[0]=="string")return e[0]}}function S0(e){if(typeof e=="string")try{return JSON.parse(e)}catch{return e}return e}const wo=Symbol.for("ariesmod.ws.handlers.patched");function ve(e,t){if(typeof e=="string"){const o=e,i={match:a=>a.kind==="message"&&a.type===o,handle:t};return ns(i),i}const n=e,r={match:o=>o.kind==="close"&&o.code===n,handle:t};return ns(r),r}function C0(e,t=w0(),n={}){const r=n.pageWindow??window,o=!!n.debug;if(e[wo])return ()=>{};e[wo]=true;const i={ws:e,pageWindow:r,debug:o},a=u=>{for(const p of t)try{if(!p.match(u))continue;if(p.handle(u,i)===!0)return}catch(f){o&&console.error("[WS] handler error",f,u);}},s=u=>{const p=S0(u.data),f=k0(p);a({kind:"message",raw:u.data,data:p,type:f});},c=u=>{a({kind:"close",code:u.code,reason:u.reason,wasClean:u.wasClean,event:u});},d=u=>a({kind:"open",event:u}),l=u=>a({kind:"error",event:u});return e.addEventListener("message",s),e.addEventListener("close",c),e.addEventListener("open",d),e.addEventListener("error",l),()=>{try{e.removeEventListener("message",s);}catch{}try{e.removeEventListener("close",c);}catch{}try{e.removeEventListener("open",d);}catch{}try{e.removeEventListener("error",l);}catch{}try{delete e[wo];}catch{}}}(function(){try{const t=({ url: (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('__entry.js', document.baseURI).href) }),n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();ve(qe.AuthenticationFailure,(e,t)=>{t.debug&&console.log("[WS][Close] Auth failure",e.code,e.reason);});ve(qe.ConnectionSuperseded,(e,t)=>{t.debug&&console.log("[WS][Close] Superseded",e.code,e.reason);});ve(qe.HeartbeatExpired,(e,t)=>{t.debug&&console.log("[WS][Close] Heartbeat expired",e.code,e.reason);});ve(qe.PlayerKicked,(e,t)=>{t.debug&&console.log("[WS][Close] Player kicked",e.code,e.reason);});ve(qe.PlayerLeftVoluntarily,(e,t)=>{t.debug&&console.log("[WS][Close] Player left voluntarily",e.code,e.reason);});ve(qe.ReconnectInitiated,(e,t)=>{t.debug&&console.log("[WS][Close] Reconnect initiated",e.code,e.reason);});ve(qe.ServerDisposed,(e,t)=>{t.debug&&console.log("[WS][Close] Server disposed",e.code,e.reason);});ve(qe.UserSessionSuperseded,(e,t)=>{t.debug&&console.log("[WS][Close] User session superseded",e.code,e.reason);});ve(qe.VersionExpired,(e,t)=>{t.debug&&console.log("[WS][Close] Version expired",e.code,e.reason);});ve(qe.VersionMismatch,(e,t)=>{t.debug&&console.log("[WS][Close] Version mismatch",e.code,e.reason);});ve(st.Config,(e,t)=>{t.debug&&console.log("[WS][STC] Config",e.data);});ve(st.CurrencyTransaction,(e,t)=>{t.debug&&console.log("[WS][STC] CurrencyTransaction",e.data);});ve(st.Emote,(e,t)=>{t.debug&&console.log("[WS][STC] Emote",e.data);});ve(st.InappropriateContentRejected,(e,t)=>{t.debug&&console.log("[WS][STC] InappropriateContentRejected",e.data);});ve(st.PartialState,(e,t)=>{t.debug&&console.log("[WS][STC] PartialState",e.data);});ve(st.Pong,(e,t)=>{t.debug&&console.log("[WS][STC] Pong",e.data);});ve(st.ServerErrorMessage,(e,t)=>{t.debug&&console.log("[WS][STC] ServerErrorMessage",e.data);});ve(st.Welcome,(e,t)=>{t.debug&&console.log("[WS][STC] Welcome",e.data);});q(M.PlantSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantSeed"),true));q(M.WaterPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] WaterPlant"),true));q(M.HarvestCrop,(e,t)=>(t.debug&&console.log("[MW][Garden] HarvestCrop"),true));q(M.SellAllCrops,(e,t)=>(t.debug&&console.log("[MW][Garden] SellAllCrops"),true));q(M.PurchaseSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseSeed"),true));q(M.PurchaseEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseEgg"),true));q(M.PurchaseTool,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseTool"),true));q(M.PurchaseDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseDecor"),true));q(M.PlantEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantEgg"),true));q(M.HatchEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] HatchEgg"),true));q(M.PlantGardenPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantGardenPlant"),true));q(M.PotPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PotPlant"),true));q(M.MutationPotion,(e,t)=>(t.debug&&console.log("[MW][Garden] MutationPotion"),true));q(M.PickupDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PickupDecor"),true));q(M.PlaceDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PlaceDecor"),true));q(M.RemoveGardenObject,(e,t)=>(t.debug&&console.log("[MW][Garden] RemoveGardenObject"),true));q(M.MoveInventoryItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveInventoryItem"),true));q(M.DropObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] DropObject"),true));q(M.PickupObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] PickupObject"),true));q(M.ToggleFavoriteItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] ToggleFavoriteItem"),true));q(M.PutItemInStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] PutItemInStorage"),true));q(M.RetrieveItemFromStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] RetrieveItemFromStorage"),true));q(M.MoveStorageItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveStorageItem"),true));q(M.LogItems,(e,t)=>(t.debug&&console.log("[MW][Inventory] LogItems"),true));q(M.PlacePet,(e,t)=>(t.debug&&console.log("[MW][Pets] PlacePet"),true));q(M.FeedPet,(e,t)=>(t.debug&&console.log("[MW][Pets] FeedPet"),true));q(M.PetPositions,(e,t)=>(t.debug&&console.log("[MW][Pets] PetPositions"),true));q(M.SwapPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SwapPet"),true));q(M.StorePet,(e,t)=>(t.debug&&console.log("[MW][Pets] StorePet"),true));q(M.NamePet,(e,t)=>(t.debug&&console.log("[MW][Pets] NamePet"),true));q(M.SellPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SellPet"),true));console.log("[WS] TESTTEST");q(M.SetSelectedGame,(e,t)=>(t.debug&&console.log("[MW][Session] SetSelectedGame"),true));q(M.VoteForGame,(e,t)=>(t.debug&&console.log("[MW][Session] VoteForGame"),true));q(M.RequestGame,(e,t)=>(t.debug&&console.log("[MW][Session] RequestGame"),true));q(M.RestartGame,(e,t)=>(t.debug&&console.log("[MW][Session] RestartGame"),true));q(M.Ping,(e,t)=>(t.debug&&console.log("[MW][Session] Ping"),true));q(M.PlayerPosition,(e,t)=>(t.debug&&console.log("[MW][Session] PlayerPosition"),true));q(M.Teleport,(e,t)=>(t.debug&&console.log("[MW][Session] Teleport"),true));q(M.CheckWeatherStatus,(e,t)=>(t.debug&&console.log("[MW][Session] CheckWeatherStatus"),true));q(M.Chat,(e,t)=>(t.debug&&console.log("[MW][Social] Chat"),true));q(M.Dev,(e,t)=>(t.debug&&console.log("[MW][Social] Dev"),true));q(M.Emote,(e,t)=>(t.debug&&console.log("[MW][Social] Emote"),true));q(M.Wish,(e,t)=>(t.debug&&console.log("[MW][Social] Wish"),true));q(M.KickPlayer,(e,t)=>(t.debug&&console.log("[MW][Social] KickPlayer"),true));q(M.ReportSpeakingStart,(e,t)=>(t.debug&&console.log("[MW][Voice] ReportSpeakingStart"),true));q(M.SetPlayerData,(e,t)=>(t.debug&&console.log("[MW][Social] SetPlayerData"),true));q(M.UsurpHost,(e,t)=>(t.debug&&console.log("[MW][Social] UsurpHost"),true));function A0(e={}){const t=e.pageWindow??L,n=e.pollMs??500,r=!!e.debug,o=[];o.push(Sb(t,{debug:r})),o.push(x0({pageWindow:t,middlewares:e.middlewares,debug:r}));let i=null;const a=s=>{if(i){try{i();}catch{}i=null;}s&&(i=C0(s,e.handlers,{debug:r,pageWindow:t}));};return a(Pr(t).ws),o.push(Wl(s=>a(s.ws),{intervalMs:n,debug:r,pageWindow:t})),{getWs:()=>Pr(t).ws,dispose:()=>{for(let s=o.length-1;s>=0;s--)try{o[s]();}catch{}if(i){try{i();}catch{}i=null;}}}}let dr=null;function I0(e={}){return dr||(dr=A0(e),dr)}function T0(e){e.logStep("WebSocket","Capturing WebSocket...");let t=null;return t=Wl(n=>{n.ws&&(e.logStep("WebSocket","WebSocket captured","success"),t?.(),t=null);},{intervalMs:250}),I0({debug:false}),()=>{t?.(),t=null;}}async function P0(e){e.logStep("Atoms","Prewarming Jotai store...");try{await xp(),await hp({timeoutMs:8e3,intervalMs:50}),e.logStep("Atoms","Jotai store ready","success");}catch(t){e.logStep("Atoms","Jotai store not captured yet","error"),console.warn("[Bootstrap] Jotai store wait failed",t);}}function E0(e){e.logStep("Globals","Initializing global variables...");try{Gl(),e.logStep("Globals","Global variables ready","success");}catch(t){e.logStep("Globals","Failed to initialize global variables","error"),console.warn("[Bootstrap] Global variables init failed",t);}}function M0(e){e.logStep("API","Exposing Gemini API...");try{Lx(),e.logStep("API","Gemini API ready","success");}catch(t){e.logStep("API","Failed to expose API","error"),console.warn("[Bootstrap] API init failed",t);}}function ko(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0);})}async function L0(e){e.logStep("HUD","Loading HUD preferences..."),await ko();const t=f0();await ko();const n=await p0({hostId:"gemini-hud-root",initialWidth:t.width,initialOpen:t.isOpen,onWidthChange:r=>cr("width",r),onOpenChange:r=>cr("isOpen",r),themes:un,initialTheme:t.theme,onThemeChange:r=>cr("theme",r),buildSections:r=>Fx({applyTheme:r.applyTheme,initialTheme:r.initialTheme,getCurrentTheme:r.getCurrentTheme,setHUDWidth:r.setHUDWidth,setHUDOpen:r.setHUDOpen}),initialTab:t.activeTab,onTabChange:r=>cr("activeTab",r)});return await ko(),e.logStep("HUD","HUD ready","success"),n}async function _0(e){e.setSubtitle("Activating Gemini modules...");const t=7;let n=0;await Hm(r=>{r.status==="success"?(n++,e.logStep("Modules",`Loading modules... (${n}/${t})`)):r.status==="error"&&e.logStep("Modules",`Loading modules... (${n}/${t}) - ${r.name} failed`,"error");}),e.logStep("Modules",`All modules loaded (${t}/${t})`,"success");}async function F0(e){e.logStep("Sprites","Warming up sprite cache...");try{ie.isReady()||await ie.init();const t=[],n=ce.get("plants");if(n)for(const a of Object.values(n))a?.seed?.spriteId&&t.push(a.seed.spriteId),a?.plant?.spriteId&&t.push(a.plant.spriteId),a?.crop?.spriteId&&t.push(a.crop.spriteId);const r=ce.get("pets");if(r)for(const a of Object.values(r))a?.spriteId&&t.push(a.spriteId);const o=[...new Set(t)],i=o.length;if(i===0){e.logStep("Sprites","No sprites to warmup","success");return}await ie.warmup(o,(a,s)=>{e.logStep("Sprites",`Loading sprites (${a}/${s})...`);},5),e.logStep("Sprites",`${i} sprites loaded`,"success");}catch(t){e.logStep("Sprites","Sprite warmup failed","error"),console.warn("[Bootstrap] Sprite warmup failed",t);}}async function R0(e){e.logStep("Sections","Preloading UI sections...");try{await Rx(),e.logStep("Sections","Sections preloaded","success");}catch(t){e.logStep("Sections","Sections preload failed","error"),console.warn("[Bootstrap] Sections preload failed",t);}}function O0(e){e.logStep("Features","Initializing features...");const t=[{name:"AntiAfk",init:It.init.bind(It)},{name:"PetTeam",init:he.init.bind(he)},{name:"BulkFavorite",init:Er.init.bind(Er)}],n=[{name:"BulkFavoriteInject",init:ni.init.bind(ni)}];let r=0;for(const i of t)try{i.init(),r++,e.logStep("Features",`Initializing features... (${r}/${t.length})`,"info");}catch(a){e.logStep("Features",`Initializing features... (${r}/${t.length}) - ${i.name} failed`,"error"),console.warn(`[Bootstrap] Feature ${i.name} init failed`,a);}e.logStep("Features",`All features initialized (${t.length}/${t.length})`,"success"),e.logStep("UIInjections","Initializing UI injections...");let o=0;for(const i of n)try{i.init(),o++;}catch(a){console.warn(`[Bootstrap] UI injection ${i.name} init failed`,a);}e.logStep("UIInjections",`UI injections initialized (${o}/${n.length})`,"success");}Es();pp();(async function(){td();const e=Uc({title:"Gemini is loading",subtitle:"Connecting and preparing modules..."});let t=null;try{t=T0(e),await P0(e),E0(e),M0(e),await Promise.all([_0(e),(async()=>{await F0(e);})(),(async()=>{await R0(e);})(),(async()=>{O0(e);})()]),e.succeed("Gemini is ready!");}catch(r){e.fail("Failed to initialize the mod.",r);}finally{t?.();}const n=await L0(e);h0({onClick:()=>n.setOpen(true)});})();

})();