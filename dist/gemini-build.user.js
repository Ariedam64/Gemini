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
  var Oc=Object.defineProperty;var Rc=(e,t,n)=>t in e?Oc(e,t,{enumerable:true,configurable:true,writable:true,value:n}):e[t]=n;var W=(e,t,n)=>Rc(e,typeof t!="symbol"?t+"":t,n);function b(e,t=null,...n){const r=document.createElement(e);for(const[o,i]of Object.entries(t||{}))i!=null&&(o==="style"?typeof i=="string"?r.setAttribute("style",i):typeof i=="object"&&Object.assign(r.style,i):o.startsWith("on")&&typeof i=="function"?r[o.toLowerCase()]=i:o in r?r[o]=i:r.setAttribute(o,String(i)));for(const o of n)o==null||o===false||r.appendChild(typeof o=="string"||typeof o=="number"?document.createTextNode(String(o)):o);return r}const On="https://i.imgur.com/k5WuC32.png",Gi="gemini-loader-style",yt="gemini-loader",Xa=80;function Nc(){if(document.getElementById(Gi))return;const e=document.createElement("style");e.id=Gi,e.textContent=`
    /* ===== Loader Variables ===== */
    #${yt} {
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
    #${yt} {
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

    #${yt}.gemini-loader--error .gemini-loader__actions {
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
    #${yt}.gemini-loader--closing {
      animation: gemini-loader-fade-out 0.4s ease forwards;
      pointer-events: none;
    }

    #${yt}.gemini-loader--error .gemini-loader__spinner {
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
      #${yt} { padding: 16px 10px; }
      .gemini-loader__card { padding: 16px; }
      .gemini-loader__header { gap: 12px; }
      .gemini-loader__spinner { width: 42px; height: 42px; }
      .gemini-loader__spinner-icon { width: 56px; height: 56px; }
      .gemini-loader__title { font-size: 16px; }
    }
  `;const t=document.head||document.documentElement||document.body;if(t){t.appendChild(e);return}const n=()=>{(document.head||document.documentElement||document.body)?.appendChild(e);};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",n,{once:true}):setTimeout(n,0);}function Rn(e,t,n){const r=b("div",{className:`gemini-loader__log ${n}`},b("div",{className:"gemini-loader__dot"}),b("div",{textContent:t}));for(e.appendChild(r);e.childElementCount>Xa;)e.firstElementChild?.remove();e.scrollTop=e.scrollHeight;}function Dc(){return new Promise(e=>{if(typeof GM_xmlhttpRequest>"u"){e(On);return}GM_xmlhttpRequest({method:"GET",url:On,responseType:"blob",onload:t=>{const n=t.response,r=new FileReader;r.onloadend=()=>e(r.result),r.onerror=()=>e(On),r.readAsDataURL(n);},onerror:()=>e(On)});})}function $c(e={}){const t=Number.isFinite(e.blurPx)?Math.max(4,Number(e.blurPx)):14;Nc();const n=b("div",{className:"gemini-loader__subtitle",textContent:e.subtitle??"Initializing the mod..."}),r=b("div",{className:"gemini-loader__logs"}),o=b("img",{className:"gemini-loader__spinner-icon",alt:"Gemini"}),i=b("div",{className:"gemini-loader__spinner"},o);Dc().then(h=>{o.src=h;});const a=b("div",{className:"gemini-loader__card"},b("div",{className:"gemini-loader__header"},i,b("div",{className:"gemini-loader__titles"},b("div",{className:"gemini-loader__title",textContent:e.title??"Gemini is loading"}),n)),r),s=b("div",{id:yt},a);(document.body||document.documentElement).appendChild(s);const c=b("div",{className:"gemini-loader__actions"},b("button",{className:"gemini-loader__button",textContent:"Close loader",onclick:()=>s.remove()}));a.appendChild(c),s.style.setProperty("--loader-blur",`${t}px`);const d=h=>{n.textContent=h;},l=new Map,u=(h,v)=>{h.className=`gemini-loader__log ${v}`;};return {log:(h,v="info")=>Rn(r,h,v),logStep:(h,v,k="info")=>{const w=String(h||"").trim();if(!w){Rn(r,v,k);return}const x=l.get(w);if(x){x.el.lastElementChild&&(x.el.lastElementChild.textContent=v),x.tone!==k&&(u(x.el,k),x.tone=k);return}const T=b("div",{className:`gemini-loader__log ${k}`},b("div",{className:"gemini-loader__dot"}),b("div",{textContent:v}));for(l.set(w,{el:T,tone:k}),r.appendChild(T);r.childElementCount>Xa;){const y=r.firstElementChild;if(!y)break;const C=Array.from(l.entries()).find(([,I])=>I.el===y)?.[0];C&&l.delete(C),y.remove();}r.scrollTop=r.scrollHeight;},setSubtitle:d,succeed:(h,v=600)=>{h&&Rn(r,h,"success"),s.classList.add("gemini-loader--closing"),setTimeout(()=>s.remove(),v);},fail:(h,v)=>{Rn(r,h,"error"),d("Something went wrong. Check the console for details."),s.classList.add("gemini-loader--error"),console.error("[Gemini loader]",h,v);}}}const Wi=150,jc=30;function Bc(e,t,n){const r=b("div",{className:"lg-pill",id:"pill"}),o=e.map(S=>{const P=b("button",{className:"lg-tab"},S.label);return P.setAttribute("data-target",S.id),P}),i=b("div",{className:"lg-tabs",id:"lg-tabs-row"},r,...o),a=new Map(e.map(S=>[S.id,true])),s=new Map(o.map((S,P)=>[e[P].id,S]));function c(S){const P=document.createElementNS("http://www.w3.org/2000/svg","svg");P.setAttribute("viewBox","0 0 24 24"),P.setAttribute("fill","none"),P.setAttribute("stroke","currentColor"),P.setAttribute("stroke-width","2"),P.setAttribute("stroke-linecap","round"),P.setAttribute("stroke-linejoin","round");const E=document.createElementNS("http://www.w3.org/2000/svg","polyline");return E.setAttribute("points",S==="left"?"15 18 9 12 15 6":"9 18 15 12 9 6"),P.appendChild(E),P}const d=b("button",{className:"lg-tabs-arrow lg-tabs-arrow-left",ariaLabel:"Scroll left"});d.appendChild(c("left"));const l=b("button",{className:"lg-tabs-arrow lg-tabs-arrow-right",ariaLabel:"Scroll right"});l.appendChild(c("right"));const p=b("div",{className:"lg-tabs-wrapper"},d,i,l);let f=0,m=0,g=false;function h(){const S=i.scrollLeft>0,P=i.scrollLeft<i.scrollWidth-i.clientWidth-1;d.classList.toggle("disabled",!S),l.classList.toggle("disabled",!P);}d.addEventListener("click",()=>{i.scrollBy({left:-Wi,behavior:"smooth"}),setTimeout(h,300);}),l.addEventListener("click",()=>{i.scrollBy({left:Wi,behavior:"smooth"}),setTimeout(h,300);}),i.addEventListener("wheel",S=>{Math.abs(S.deltaY)>Math.abs(S.deltaX)&&(S.preventDefault(),i.scrollLeft+=S.deltaY,h());},{passive:false});let v=0;i.addEventListener("touchstart",S=>{const P=S.touches[0];f=P.clientX,m=P.clientY,g=false,v=i.scrollLeft;},{passive:true}),i.addEventListener("touchmove",S=>{if(g)return;const P=S.touches[0],E=P.clientX-f,R=P.clientY-m;if(Math.abs(R)>Math.abs(E)){g=true;return}Math.abs(E)>jc&&(S.preventDefault(),i.scrollLeft=v-E);},{passive:false}),i.addEventListener("touchend",()=>{h();},{passive:true}),i.addEventListener("scroll",h,{passive:true});function k(S){const P=o.find(E=>E.dataset.target===S)||o[0];P&&requestAnimationFrame(()=>{const E=P.offsetLeft,R=P.offsetWidth;r.style.width=`${R}px`,r.style.transform=`translateX(${E}px)`;const ee=i.scrollLeft,B=ee,X=ee+i.clientWidth,le=E-12,$=E+R+12;le<B?i.scrollTo({left:le,behavior:"smooth"}):$>X&&i.scrollTo({left:$-i.clientWidth,behavior:"smooth"}),setTimeout(h,300);});}function w(){for(const[S,P]of a)if(P)return S;return null}function x(S){const P=s.get(S);if(P)if(a.set(S,false),P.style.display="none",C===S){const E=w();E&&I(E);}else y();}function T(S){const P=s.get(S);P&&(a.set(S,true),P.style.display="",y());}function y(){k(C),h();}let C=t||(e[0]?.id??"");function I(S){a.get(S)&&(C=S,o.forEach(P=>P.classList.toggle("active",P.dataset.target===S)),k(S),n(S));}return o.forEach(S=>S.addEventListener("click",()=>I(S.dataset.target))),queueMicrotask(()=>{k(C),h();}),{root:p,activate:I,recalc:y,getActive:()=>C,showTab:T,hideTab:x,isTabVisible:S=>a.get(S)??false,getVisibleTabs:()=>[...a.entries()].filter(([S,P])=>P).map(([S])=>S)}}class Ht{constructor(t){W(this,"id");W(this,"label");W(this,"container",null);W(this,"cleanupFunctions",[]);W(this,"preloadedContent",null);W(this,"preloadPromise",null);this.id=t.id,this.label=t.label;}async preload(){if(this.preloadedContent||this.preloadPromise)return;const t=b("div");this.preloadPromise=(async()=>{const n=this.build(t);n instanceof Promise&&await n,this.preloadedContent=t,this.preloadPromise=null;})(),await this.preloadPromise;}isPreloaded(){return this.preloadedContent!==null}render(t){for(this.unmount();t.firstChild;)t.removeChild(t.firstChild);if(this.container=t,this.preloadedContent){for(;this.preloadedContent.firstChild;)t.appendChild(this.preloadedContent.firstChild);this.preloadedContent=null;}else {const r=this.build(t);r instanceof Promise&&r.catch(o=>{console.error(`[Gemini] Error building section ${this.id}:`,o);});}const n=t.firstElementChild;n&&n.classList.contains("gemini-section")&&n.classList.add("active");}unmount(){this.executeCleanup(),this.container=null;}createContainer(t,n){const r=n?`gemini-section ${n}`:"gemini-section";return b("section",{id:t,className:r})}addCleanup(t){this.cleanupFunctions.push(t);}createGrid(t="12px"){const n=b("div");return n.style.display="grid",n.style.gap=t,n}executeCleanup(){for(const t of this.cleanupFunctions)try{t();}catch(n){console.error(`[Gemini] Cleanup error in section ${this.id}:`,n);}this.cleanupFunctions=[];}}class zc{constructor(t,n,r){W(this,"sections");W(this,"activeId",null);W(this,"container");W(this,"theme");this.sections=new Map(t.map(o=>[o.id,o])),this.container=n,this.theme=r;}get ids(){return Array.from(this.sections.keys())}get all(){return Array.from(this.sections.values())}get active(){return this.activeId}activate(t){if(this.activeId!==t){if(!this.sections.has(t))throw new Error(`[Gemini] Unknown section: ${t}`);if(this.activeId&&this.sections.get(this.activeId).unmount(),this.activeId=t,this.sections.get(t).render(this.container),this.theme){const n=this.theme.getCurrentTheme();this.theme.applyTheme(n);}}}}const lt="gemini:",Me={AUTO_FAVORITE:"feature:autoFavorite:config",AUTO_FAVORITE_UI:"feature:autoFavorite:ui",JOURNAL_CHECKER:"feature:journalChecker:config",BULK_FAVORITE:"feature:bulkFavorite:config",ACHIEVEMENTS:"feature:achievements:data",TRACKER_STATS:"feature:tracker:stats",ANTI_AFK:"feature:antiAfk:config",CONFIG:"feature:config",PET_TEAM:"feature:petTeam:config"},Hi={STORAGE_CHANGE:"gemini:storage:change"};function Te(e,t){try{const n=e.startsWith(lt)?e:lt+e,r=GM_getValue(n);return r==null?t:typeof r=="string"?JSON.parse(r):r}catch(n){return console.error(`[Gemini Storage] Failed to read key "${e}":`,n),t}}function je(e,t){try{const n=e.startsWith(lt)?e:lt+e,r=e.startsWith(lt)?e.slice(lt.length):e,o=JSON.stringify(t);GM_setValue(n,o),window.dispatchEvent(new CustomEvent("gemini:storage:change",{detail:{key:r,value:t}}));}catch(n){console.error(`[Gemini Storage] Failed to write key "${e}":`,n);}}function Gc(e){try{const t=e.startsWith(lt)?e:lt+e;GM_setValue(t,void 0);}catch(t){console.error(`[Gemini Storage] Failed to remove key "${e}":`,t);}}function Wc(){try{const e="gemini:",t=[];for(let o=0;o<localStorage.length;o++){const i=localStorage.key(o);i&&i.startsWith(e)&&t.push(i);}for(const o of t)try{const i=localStorage.getItem(o);if(i!==null){const a=JSON.parse(i),s=o.slice(e.length);je(s,a),console.log(`[Gemini Storage] Migrated key: ${o}`);}}catch(i){console.warn(`[Gemini Storage] Failed to migrate key "${o}":`,i);}const n="gemini.sections",r=GM_getValue(n);r!=null&&(je("sections",r),GM_setValue(n,void 0),console.log("[Gemini Storage] Migrated: gemini.sections → gemini:sections")),t.length>0&&console.log(`[Gemini Storage] Migration complete. ${t.length} keys migrated from localStorage to GM_* storage.`);}catch(e){console.error("[Gemini Storage] Migration failed:",e);}}const Ja="gemini.sections";function Qa(){const e=Te(Ja,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function Hc(e){je(Ja,e);}async function Uc(e){return Qa()[e]}function Vc(e,t){const n=Qa();Hc({...n,[e]:t});}function Ui(e,t){return {...e,...t??{}}}async function Kc(e){const t=await Uc(e.path);let n;e.migrate?n=e.migrate(t):n=t??{},n=Object.assign((d=>JSON.parse(JSON.stringify(d)))(e.defaults),n),e.sanitize&&(n=e.sanitize(n));function o(){Vc(e.path,n);}function i(){return n}function a(d){n=e.sanitize?e.sanitize(d):d,o();}function s(d){const u=Object.assign((p=>JSON.parse(JSON.stringify(p)))(n),{});typeof d=="function"?d(u):Object.assign(u,d),n=e.sanitize?e.sanitize(u):u,o();}function c(){o();}return {get:i,set:a,update:s,save:c}}async function Pr(e,t){const{path:n=e,...r}=t;return Kc({path:n,...r})}let Yc=0;const Nn=new Map;function $e(e={},...t){const{id:n,className:r,variant:o="default",padding:i="md",interactive:a=false,expandable:s=false,defaultExpanded:c=true,onExpandChange:d,mediaTop:l,title:u,subtitle:p,badge:f,actions:m,footer:g,divider:h=false,tone:v="neutral",stateKey:k}=e,w=b("div",{className:"card",id:n,tabIndex:a?0:void 0});w.classList.add(`card--${o}`,`card--p-${i}`),a&&w.classList.add("card--interactive"),v!=="neutral"&&w.classList.add(`card--tone-${v}`),r&&w.classList.add(...r.split(" ").filter(Boolean)),s&&w.classList.add("card--expandable");const x=s?k??n??(typeof u=="string"?`title:${u}`:null):null;let T=!s||c;x&&Nn.has(x)&&(T=!!Nn.get(x));let y=null,C=null,I=null,S=null,P=null;const E=n?`${n}-collapse`:`card-collapse-${++Yc}`,R=()=>{if(S!==null&&(cancelAnimationFrame(S),S=null),P){const j=P;P=null,j();}},ee=(j,N)=>{if(!I)return;R();const F=I;if(F.setAttribute("aria-hidden",String(!j)),!N){F.classList.remove("card-collapse--animating"),F.style.display=j?"":"none",F.style.height="",F.style.opacity="";return}if(F.classList.add("card-collapse--animating"),F.style.display="",j){F.style.height="auto";const z=F.scrollHeight;if(!z){F.classList.remove("card-collapse--animating"),F.style.display="",F.style.height="",F.style.opacity="";return}F.style.height="0px",F.style.opacity="0",F.offsetHeight,S=requestAnimationFrame(()=>{S=null,F.style.height=`${z}px`,F.style.opacity="1";});}else {const z=F.scrollHeight;if(!z){F.classList.remove("card-collapse--animating"),F.style.display="none",F.style.height="",F.style.opacity="";return}F.style.height=`${z}px`,F.style.opacity="1",F.offsetHeight,S=requestAnimationFrame(()=>{S=null,F.style.height="0px",F.style.opacity="0";});}const _=()=>{F.classList.remove("card-collapse--animating"),F.style.height="",j||(F.style.display="none"),F.style.opacity="";};let D=null;const O=z=>{z.target===F&&(D!==null&&(clearTimeout(D),D=null),F.removeEventListener("transitionend",O),F.removeEventListener("transitioncancel",O),P=null,_());};P=()=>{D!==null&&(clearTimeout(D),D=null),F.removeEventListener("transitionend",O),F.removeEventListener("transitioncancel",O),P=null,_();},F.addEventListener("transitionend",O),F.addEventListener("transitioncancel",O),D=window.setTimeout(()=>{P?.();},420);};function B(j){const N=document.createElementNS("http://www.w3.org/2000/svg","svg");return N.setAttribute("viewBox","0 0 24 24"),N.setAttribute("width","16"),N.setAttribute("height","16"),N.innerHTML=j==="up"?'<path d="M7 14l5-5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>':'<path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',N}function X(j,N=true,F=true){T=j,w.classList.toggle("card--collapsed",!T),w.classList.toggle("card--expanded",T),y&&(y.dataset.expanded=String(T),y.setAttribute("aria-expanded",String(T))),C&&(C.setAttribute("aria-expanded",String(T)),C.classList.toggle("card-toggle--collapsed",!T),C.setAttribute("aria-label",T?"Replier le contenu":"Deplier le contenu"),C.replaceChildren(B(T?"up":"down"))),s?ee(T,F):I&&(I.style.display="",I.style.height="",I.style.opacity="",I.setAttribute("aria-hidden","false")),N&&d&&d(T),x&&Nn.set(x,T);}if(l){const j=b("div",{className:"card-media"});j.append(l),w.appendChild(j);}const le=!!(u||p||f||m&&m.length||s);if(le){y=b("div",{className:"card-header"});const j=b("div",{className:"card-headline",style:"min-width:0;display:flex;flex-direction:column;gap:2px;"});if(u){const _=b("h3",{className:"card-title",style:"margin:0;font-size:15px;font-weight:700;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:8px;color:var(--fg);"},u);f&&_.append(typeof f=="string"?b("span",{className:"badge"},f):f),j.appendChild(_);}if(p){const _=b("div",{className:"card-subtitle",style:"opacity:.85;font-size:12px;color:color-mix(in oklab, var(--fg) 80%, #9ca3af)"},p);j.appendChild(_);}(j.childNodes.length||s)&&y.appendChild(j);const N=b("div",{className:"card-header-right",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"}),F=b("div",{className:"card-actions",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"});m?.forEach(_=>F.appendChild(_)),F.childNodes.length&&N.appendChild(F),s&&(C=b("button",{className:"card-toggle",type:"button",ariaExpanded:String(T),ariaControls:E,ariaLabel:T?"Replier le contenu":"Deplier le contenu"}),C.textContent=T?"▲":"▼",C.addEventListener("click",_=>{_.preventDefault(),_.stopPropagation(),X(!T);}),N.appendChild(C),y.classList.add("card-header--expandable"),y.addEventListener("click",_=>{const D=_.target;D?.closest(".card-actions")||D?.closest(".card-toggle")||X(!T);})),N.childNodes.length&&y.appendChild(N),w.appendChild(y);}I=b("div",{className:"card-collapse",id:E,ariaHidden:s?String(!T):"false"}),w.appendChild(I),h&&le&&I.appendChild(b("div",{className:"card-divider"}));const $=b("div",{className:"card-body"});if($.append(...t),I.appendChild($),g){h&&I.appendChild(b("div",{className:"card-divider"}));const j=b("div",{className:"card-footer"});j.append(g),I.appendChild(j);}return C&&C.setAttribute("aria-controls",E),X(T,false,false),x&&Nn.set(x,T),w}let gr=false;const hr=new Set,Oe=e=>{const t=document.activeElement;for(const n of hr)if(t&&(t===n||n.contains(t))){e.stopImmediatePropagation(),e.stopPropagation();return}};function qc(){gr||(gr=true,window.addEventListener("keydown",Oe,true),window.addEventListener("keypress",Oe,true),window.addEventListener("keyup",Oe,true),document.addEventListener("keydown",Oe,true),document.addEventListener("keypress",Oe,true),document.addEventListener("keyup",Oe,true));}function Xc(){gr&&(hr.size>0||(gr=false,window.removeEventListener("keydown",Oe,true),window.removeEventListener("keypress",Oe,true),window.removeEventListener("keyup",Oe,true),document.removeEventListener("keydown",Oe,true),document.removeEventListener("keypress",Oe,true),document.removeEventListener("keyup",Oe,true)));}function Jc(e){const{id:t,value:n=null,options:r,placeholder:o="Select...",size:i="md",disabled:a=false,blockGameKeys:s=true,onChange:c,onOpenChange:d}=e,l=b("div",{className:"select",id:t}),u=b("button",{className:"select-trigger",type:"button"}),p=b("span",{className:"select-value"},o),f=b("span",{className:"select-caret"},"▾");u.append(p,f);const m=b("div",{className:"select-menu",role:"listbox",tabindex:"-1","aria-hidden":"true"});l.classList.add(`select--${i}`);let g=false,h=n,v=null,k=!!a;function w(_){return _==null?o:(e.options||r).find(O=>O.value===_)?.label??o}function x(_){p.textContent=w(_),m.querySelectorAll(".select-option").forEach(D=>{const O=D.dataset.value,z=_!=null&&O===_;D.classList.toggle("selected",z),D.setAttribute("aria-selected",String(z));});}function T(_){m.replaceChildren(),_.forEach(D=>{const O=b("button",{className:"select-option"+(D.disabled?" disabled":""),type:"button",role:"option","data-value":D.value,"aria-selected":String(D.value===h),tabindex:"-1"},D.label);D.value===h&&O.classList.add("selected"),D.disabled||O.addEventListener("pointerdown",z=>{z.preventDefault(),z.stopPropagation(),E(D.value,{notify:true}),S();},{capture:true}),m.appendChild(O);});}function y(){u.setAttribute("aria-expanded",String(g)),m.setAttribute("aria-hidden",String(!g));}function C(){const _=u.getBoundingClientRect();Object.assign(m.style,{minWidth:`${_.width}px`});}function I(){g||k||(g=true,l.classList.add("open"),y(),C(),document.addEventListener("mousedown",le,true),document.addEventListener("scroll",$,true),window.addEventListener("resize",j),m.focus({preventScroll:true}),s&&(qc(),hr.add(l),v=()=>{hr.delete(l),Xc();}),d?.(true));}function S(){g&&(g=false,l.classList.remove("open"),y(),document.removeEventListener("mousedown",le,true),document.removeEventListener("scroll",$,true),window.removeEventListener("resize",j),u.focus({preventScroll:true}),v?.(),v=null,d?.(false));}function P(){g?S():I();}function E(_,D={}){const O=h;h=_,x(h),D.notify!==false&&O!==_&&c?.(_);}function R(){return h}function ee(_){const D=Array.from(m.querySelectorAll(".select-option:not(.disabled)"));if(!D.length)return;const O=D.findIndex(ge=>ge.classList.contains("active")),z=D[(O+(_===1?1:D.length-1))%D.length];D.forEach(ge=>ge.classList.remove("active")),z.classList.add("active"),z.focus({preventScroll:true}),z.scrollIntoView({block:"nearest"});}function B(_){(_.key===" "||_.key==="Enter"||_.key==="ArrowDown")&&(_.preventDefault(),I());}function X(_){if(_.key==="Escape"){_.preventDefault(),S();return}if(_.key==="Enter"||_.key===" "){const D=m.querySelector(".select-option.active")||m.querySelector(".select-option.selected");D&&!D.classList.contains("disabled")&&(_.preventDefault(),E(D.dataset.value,{notify:true}),S());return}if(_.key==="ArrowDown"){_.preventDefault(),ee(1);return}if(_.key==="ArrowUp"){_.preventDefault(),ee(-1);return}}function le(_){l.contains(_.target)||S();}function $(){g&&C();}function j(){g&&C();}function N(_){k=!!_,u.disabled=k,l.classList.toggle("disabled",k),k&&S();}function F(_){e.options=_,T(_),_.some(D=>D.value===h)||(h=null,x(null));}return l.append(u,m),u.addEventListener("pointerdown",_=>{_.preventDefault(),_.stopPropagation(),P();},{capture:true}),u.addEventListener("keydown",B),m.addEventListener("keydown",X),T(r),n!=null?(h=n,x(h)):x(null),y(),N(k),{root:l,open:I,close:S,toggle:P,getValue:R,setValue:E,setOptions:F,setDisabled:N,destroy(){document.removeEventListener("mousedown",le,true),document.removeEventListener("scroll",$,true),window.removeEventListener("resize",j),v?.(),v=null;}}}function ei(e={}){const{id:t,text:n="",htmlFor:r,tone:o="default",size:i="md",layout:a="inline",variant:s="text",required:c=false,disabled:d=false,tooltip:l,hint:u,icon:p,suffix:f,onClick:m}=e,g=b("div",{className:"lg-label-wrap",id:t}),h=b("label",{className:"lg-label",...r?{htmlFor:r}:{},...l?{title:l}:{}});if(p){const E=typeof p=="string"?b("span",{className:"lg-label-ico"},p):p;E.classList?.add?.("lg-label-ico"),h.appendChild(E);}const v=b("span",{className:"lg-label-text"},n);h.appendChild(v);const k=b("span",{className:"lg-label-req",ariaHidden:"true"}," *");c&&h.appendChild(k);let w=null;if(f!=null){w=typeof f=="string"?document.createTextNode(f):f;const E=b("span",{className:"lg-label-suffix"});E.appendChild(w),h.appendChild(E);}const x=u?b("div",{className:"lg-label-hint"},u):null;g.classList.add(`lg-label--${a}`),g.classList.add(`lg-label--${i}`),s==="title"&&g.classList.add("lg-label--title"),T(o),d&&g.classList.add("is-disabled"),g.appendChild(h),x&&g.appendChild(x),m&&h.addEventListener("click",m);function T(E){g.classList.remove("lg-label--default","lg-label--muted","lg-label--info","lg-label--success","lg-label--warning","lg-label--danger"),g.classList.add(`lg-label--${E}`);}function y(E){v.textContent=E;}function C(E){T(E);}function I(E){E&&!k.isConnected&&h.appendChild(k),!E&&k.isConnected&&k.remove(),E?h.setAttribute("aria-required","true"):h.removeAttribute("aria-required");}function S(E){g.classList.toggle("is-disabled",!!E);}function P(E){!E&&x&&x.isConnected?x.remove():E&&x?x.textContent=E:E&&!x&&g.appendChild(b("div",{className:"lg-label-hint"},E));}return {root:g,labelEl:h,hintEl:x,setText:y,setTone:C,setRequired:I,setDisabled:S,setHint:P}}function Zt(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function Dn(e,t){const n=document.createElement("span");n.className=`btn-ico btn-ico--${t}`;const r=Zt(e);return r&&n.appendChild(r),n}function Qc(){const e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.marginRight="6px",t.style.display="none",t.style.flexShrink="0";const n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");const r=document.createElementNS(e,"animate");r.setAttribute("attributeName","stroke-dasharray"),r.setAttribute("values","1,150;90,150;90,150"),r.setAttribute("dur","1.5s"),r.setAttribute("repeatCount","indefinite");const o=document.createElementNS(e,"animateTransform");return o.setAttribute("attributeName","transform"),o.setAttribute("attributeType","XML"),o.setAttribute("type","rotate"),o.setAttribute("from","0 12 12"),o.setAttribute("to","360 12 12"),o.setAttribute("dur","1s"),o.setAttribute("repeatCount","indefinite"),n.appendChild(r),n.appendChild(o),t.appendChild(n),t}function xt(e={}){const{label:t="",id:n,variant:r="default",size:o="md",iconLeft:i,iconRight:a,loading:s=false,tooltip:c,type:d="button",onClick:l,disabled:u=false,fullWidth:p=false}=e,f=b("button",{className:"btn",id:n});f.type=d,r==="primary"&&f.classList.add("primary"),r==="danger"&&f.classList.add("danger"),o==="sm"&&f.classList.add("btn--sm"),c&&(f.title=c),p&&(f.style.width="100%");const m=Qc(),g=i?Dn(i,"left"):null,h=a?Dn(a,"right"):null,v=document.createElement("span");v.className="btn-label";const k=Zt(t);k&&v.appendChild(k),!k&&(g||h)&&f.classList.add("btn--icon"),f.appendChild(m),g&&f.appendChild(g),f.appendChild(v),h&&f.appendChild(h);const w=u||s;f.disabled=w,f.setAttribute("aria-busy",String(!!s)),m.style.display=s?"inline-block":"none",l&&f.addEventListener("click",l);const x=f;return x.setLoading=T=>{f.setAttribute("aria-busy",String(!!T)),m.style.display=T?"inline-block":"none",f.disabled=T||u;},x.setDisabled=T=>{f.disabled=T||f.getAttribute("aria-busy")==="true";},x.setLabel=T=>{v.replaceChildren();const y=Zt(T);y&&v.appendChild(y),!y&&(g||h)?f.classList.add("btn--icon"):f.classList.remove("btn--icon");},x.setIconLeft=T=>{if(T==null){g?.remove();return}g?g.replaceChildren(Zt(T)):f.insertBefore(Dn(T,"left"),v);},x.setIconRight=T=>{if(T==null){h?.remove();return}h?h.replaceChildren(Zt(T)):f.appendChild(Dn(T,"right"));},x.setVariant=T=>{f.classList.remove("primary","danger"),T==="primary"&&f.classList.add("primary"),T==="danger"&&f.classList.add("danger");},x}let Za=null,ti=null;function Zc(){return Za}function ed(e){Za=e,ti=null;}function es(){return ti}function td(e){ti=e;}function nd(){try{const e=window.visualViewport,t=Math.round((e?.width??window.innerWidth)||0),n=Math.round((e?.height??window.innerHeight)||0);if(t&&n)return t>=n?"landscape":"portrait"}catch{}return "unknown"}function ts(){const e=navigator.userAgent||"",t=navigator.platform||"",n=navigator.userAgentData;if(n&&typeof n.platform=="string"){const o=n.platform.toLowerCase();if(o.includes("windows"))return "windows";if(o.includes("mac"))return "mac";if(o.includes("android"))return "android";if(o.includes("chrome os")||o.includes("cros"))return "chromeos";if(o.includes("linux"))return "linux";if(o.includes("ios"))return "ios"}return /iPhone|iPad|iPod/i.test(e)||t==="MacIntel"&&(navigator.maxTouchPoints??0)>1?"ios":/Android/i.test(e)?"android":/CrOS/i.test(e)?"chromeos":/Win/i.test(e)?"windows":/Mac/i.test(e)?"mac":/Linux/i.test(e)?"linux":"unknown"}function ns(){const e=navigator.userAgent||"",t=navigator.userAgentData;if(t&&Array.isArray(t.brands)){const n=t.brands.map(a=>String(a.brand||a.brandName||a.brandVersion||a)),r=n.some(a=>/Edge/i.test(a)||/Microsoft Edge/i.test(a)),o=n.some(a=>/Opera/i.test(a)||/OPR/i.test(a)),i=n.some(a=>/Chrome|Chromium/i.test(a));if(r)return "Edge";if(o)return "Opera";if(i)return "Chrome";if(navigator.brave)return "Brave"}return /FxiOS/i.test(e)?"Firefox":/CriOS/i.test(e)?"Chrome":/EdgiOS/i.test(e)?"Edge":/OPiOS|OPR|Opera Mini|Opera/i.test(e)?"Opera":/Edg\//i.test(e)?"Edge":/OPR\//i.test(e)||/Opera/i.test(e)?"Opera":/Firefox/i.test(e)?"Firefox":/Safari/i.test(e)&&!/Chrome|Chromium|Edg|OPR/i.test(e)?"Safari":/Brave/i.test(e)||window.Brave||navigator.brave?"Brave":/Chrome|Chromium/i.test(e)?"Chrome":"Unknown"}function rd(){const e=Zc();if(e)return e;const t=navigator.userAgent||"",n=navigator.userAgentData;return n&&typeof n.mobile=="boolean"?n.mobile?"mobile":"desktop":/Android|iPhone|iPad|iPod|Mobile/i.test(t)?"mobile":"desktop"}function od(e){if(!e)return null;try{return new URL(e).hostname}catch{return null}}function rs(){try{return window.top!==window.self}catch{return  true}}function id(){const e=rs(),t=od(document.referrer);return e&&!!t&&/(^|\.)discord(app)?\.com$/i.test(t)?"discord":"web"}function Er(){const e=es();if(e)return e;const t=id(),n=rd(),r=ts(),o=ns(),i=rs(),a=window.screen||{},s=window.visualViewport,c=Math.round(window.innerWidth||document.documentElement.clientWidth||0),d=Math.round(window.innerHeight||document.documentElement.clientHeight||0),l=Math.round(s?.width??c),u=Math.round(s?.height??d),p=Math.round(a.width||0),f=Math.round(a.height||0),m=Math.round(a.availWidth||p),g=Math.round(a.availHeight||f),h=Number.isFinite(window.devicePixelRatio)?window.devicePixelRatio:1,v={surface:t,host:location.hostname,origin:location.origin,isInIframe:i,platform:n,browser:o,os:r,viewportWidth:c,viewportHeight:d,visualViewportWidth:l,visualViewportHeight:u,screenWidth:p,screenHeight:f,availScreenWidth:m,availScreenHeight:g,dpr:h,orientation:nd()};return td(v),v}function ad(){return Er().surface==="discord"}function sd(){return Er().platform==="mobile"}function ld(){Er();}function cd(){return es()!==null}const Ke={init:ld,isReady:cd,detect:Er,isDiscord:ad,isMobile:sd,detectOS:ts,detectBrowser:ns,setPlatformOverride:ed};let br=false;const en=new Set;function dd(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}const Re=e=>{const t=dd();if(t){for(const n of en)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function ud(){br||(br=true,window.addEventListener("keydown",Re,true),window.addEventListener("keypress",Re,true),window.addEventListener("keyup",Re,true),document.addEventListener("keydown",Re,true),document.addEventListener("keypress",Re,true),document.addEventListener("keyup",Re,true));}function pd(){br&&(br=false,window.removeEventListener("keydown",Re,true),window.removeEventListener("keypress",Re,true),window.removeEventListener("keyup",Re,true),document.removeEventListener("keydown",Re,true),document.removeEventListener("keypress",Re,true),document.removeEventListener("keyup",Re,true));}function fd(e){return en.size===0&&ud(),en.add(e),()=>{en.delete(e),en.size===0&&pd();}}function md(e,t,n,r){let o;switch(e){case "digits":o="0-9";break;case "alpha":o="\\p{L}";break;case "alphanumeric":o="\\p{L}0-9";break;default:return null}return t&&(o+=" "),n&&(o+="\\-"),r&&(o+="_"),new RegExp(`[^${o}]`,"gu")}function gd(e,t){return t?e.replace(t,""):e}function hd(e,t=0){if(!t)return e;let n;return((...r)=>{clearTimeout(n),n=setTimeout(()=>e(...r),t);})}function os(e={}){const{id:t,placeholder:n="",value:r="",mode:o="any",allowSpaces:i=false,allowDashes:a=false,allowUnderscore:s=false,maxLength:c,blockGameKeys:d=true,debounceMs:l=0,onChange:u,onEnter:p,label:f}=e,m=b("div",{className:"lg-input-wrap"}),g=b("input",{className:"input",id:t,placeholder:n});if(typeof c=="number"&&c>0&&(g.maxLength=c),r&&(g.value=r),f){const E=b("div",{className:"lg-input-label"},f);m.appendChild(E);}m.appendChild(g);const h=md(o,i,a,s),v=()=>{const E=g.selectionStart??g.value.length,R=g.value.length,ee=gd(g.value,h);if(ee!==g.value){g.value=ee;const B=R-ee.length,X=Math.max(0,E-B);g.setSelectionRange(X,X);}},k=hd(()=>u?.(g.value),l);g.addEventListener("input",()=>{v(),k();}),g.addEventListener("paste",()=>queueMicrotask(()=>{v(),k();})),g.addEventListener("keydown",E=>{E.key==="Enter"&&p?.(g.value);});const w=d?fd(g):()=>{};function x(){return g.value}function T(E){g.value=E??"",v(),k();}function y(){g.focus();}function C(){g.blur();}function I(E){g.disabled=!!E;}function S(){return document.activeElement===g}function P(){w();}return {root:m,input:g,getValue:x,setValue:T,focus:y,blur:C,setDisabled:I,isFocused:S,destroy:P}}function ye(e,t,n){return Math.min(n,Math.max(t,e))}function cn({h:e,s:t,v:n,a:r}){const o=(e%360+360)%360/60,i=n*t,a=i*(1-Math.abs(o%2-1));let s=0,c=0,d=0;switch(Math.floor(o)){case 0:s=i,c=a;break;case 1:s=a,c=i;break;case 2:c=i,d=a;break;case 3:c=a,d=i;break;case 4:s=a,d=i;break;default:s=i,d=a;break}const u=n-i,p=Math.round((s+u)*255),f=Math.round((c+u)*255),m=Math.round((d+u)*255);return {r:ye(p,0,255),g:ye(f,0,255),b:ye(m,0,255),a:ye(r,0,1)}}function is({r:e,g:t,b:n,a:r}){const o=ye(e,0,255)/255,i=ye(t,0,255)/255,a=ye(n,0,255)/255,s=Math.max(o,i,a),c=Math.min(o,i,a),d=s-c;let l=0;d!==0&&(s===o?l=60*((i-a)/d%6):s===i?l=60*((a-o)/d+2):l=60*((o-i)/d+4)),l<0&&(l+=360);const u=s===0?0:d/s;return {h:l,s:u,v:s,a:ye(r,0,1)}}function ni({r:e,g:t,b:n}){const r=o=>ye(Math.round(o),0,255).toString(16).padStart(2,"0");return `#${r(e)}${r(t)}${r(n)}`.toUpperCase()}function bd({r:e,g:t,b:n,a:r}){const o=ye(Math.round(r*255),0,255);return `${ni({r:e,g:t,b:n})}${o.toString(16).padStart(2,"0")}`.toUpperCase()}function tn({r:e,g:t,b:n,a:r}){const o=Math.round(r*1e3)/1e3;return `rgba(${e}, ${t}, ${n}, ${o})`}function Nt(e){let t=e.trim();if(!t||(t.startsWith("#")&&(t=t.slice(1)),![3,4,6,8].includes(t.length))||!/^[0-9a-fA-F]+$/.test(t))return null;(t.length===3||t.length===4)&&(t=t.split("").map(a=>a+a).join(""));let n=255;t.length===8&&(n=parseInt(t.slice(6,8),16),t=t.slice(0,6));const r=parseInt(t.slice(0,2),16),o=parseInt(t.slice(2,4),16),i=parseInt(t.slice(4,6),16);return {r,g:o,b:i,a:n/255}}function xo(e){if(!e)return null;const t=e.trim();if(t.startsWith("#"))return Nt(t);const n=t.match(/^rgba?\(([^)]+)\)$/i);if(n){const r=n[1].split(",").map(c=>c.trim());if(r.length<3)return null;const o=Number(r[0]),i=Number(r[1]),a=Number(r[2]),s=r[3]!=null?Number(r[3]):1;return [o,i,a,s].some(c=>Number.isNaN(c))?null:{r:o,g:i,b:a,a:s}}return null}function yd(e,t){const n=xo(e)??Nt(e??"")??{r:244,g:67,b:54,a:1};return typeof t=="number"&&(n.a=ye(t,0,1)),is(n)}function vd(e){return `#${e.trim().replace(/[^0-9a-fA-F#]/g,"").replace(/#/g,"")}`.slice(0,9).toUpperCase()}function xd(e){let t=e.trim();return t&&(/^rgba?\s*\(/i.test(t)?t=t.replace(/^rgba?/i,"rgba"):(t=t.replace(/^\(?(.*)\)?$/,"$1"),t=`rgba(${t})`),t=t.replace(/\s*\(\s*/,"("),t=t.replace(/\s*\)\s*$/,")"),t=t.replace(/\s*,\s*/g,", "),t)}function pt(e){const t=cn(e),n=cn({...e,a:1});return {hsva:{...e},hex:ni(n),hexa:bd(t),rgba:tn(t),alpha:e.a}}function wd(e={}){const{id:t,label:n="Color",value:r,alpha:o,defaultExpanded:i=false,detectMobile:a,onInput:s,onChange:c}=e,l=a?a():Ke.detect().platform==="mobile";let u=yd(r,o);const p=$e({id:t,className:"color-picker",title:n,padding:l?"md":"lg",variant:"soft",expandable:!l,defaultExpanded:!l&&i});p.classList.add(l?"color-picker--mobile":"color-picker--desktop");const f=p.querySelector(".card-header");f&&f.classList.add("color-picker__header");const m=f?.querySelector(".card-title"),g=b("button",{className:"color-picker__preview",type:"button",title:`Preview ${n}`,"aria-label":`Change ${n}`});m?m.prepend(g):f?f.prepend(g):p.prepend(g);const h=p.querySelector(".card-toggle");!l&&h&&g.addEventListener("click",()=>{p.classList.contains("card--collapsed")&&h.click();});const v=p.querySelector(".card-collapse");let k=null,w=null,x=null,T=null,y=null,C=null,I=null,S=null,P=null,E="hex";function R($){const j=pt(u);$==="input"?s?.(j):c?.(j);}function ee(){const $=pt(u);if(g.style.setProperty("--cp-preview-color",$.rgba),g.setAttribute("aria-label",`${n}: ${$.hexa}`),!l&&k&&w&&x&&T&&y&&C&&I){const j=cn({...u,s:1,v:1,a:1}),N=tn(j);k.style.setProperty("--cp-palette-hue",N),w.style.left=`${u.s*100}%`,w.style.top=`${(1-u.v)*100}%`,x.style.setProperty("--cp-alpha-gradient",`linear-gradient(180deg, ${tn({...j,a:1})} 0%, ${tn({...j,a:0})} 100%)`),T.style.top=`${(1-u.a)*100}%`,y.style.setProperty("--cp-hue-color",tn(cn({...u,v:1,s:1,a:1}))),C.style.left=`${u.h/360*100}%`;const F=u.a===1?$.hex:$.hexa,_=$.rgba,D=E==="hex"?F:_;I!==document.activeElement&&(I.value=D),I.setAttribute("aria-label",`${E.toUpperCase()} code for ${n}`),I.placeholder=E==="hex"?"#RRGGBB or #RRGGBBAA":"rgba(0, 0, 0, 1)",E==="hex"?I.maxLength=9:I.removeAttribute("maxLength"),I.dataset.mode=E,S&&(S.textContent=E.toUpperCase(),S.setAttribute("aria-label",E==="hex"?"Passer en saisie RGBA":"Revenir en saisie HEX"),S.setAttribute("aria-pressed",E==="rgba"?"true":"false"),S.classList.toggle("is-alt",E==="rgba"));}P&&P!==document.activeElement&&(P.value=$.hex);}function B($,j=null){u={h:($.h%360+360)%360,s:ye($.s,0,1),v:ye($.v,0,1),a:ye($.a,0,1)},ee(),j&&R(j);}function X($,j=null){B(is($),j);}function le($,j,N){$.addEventListener("pointerdown",F=>{F.preventDefault();const _=F.pointerId,D=z=>{z.pointerId===_&&j(z);},O=z=>{z.pointerId===_&&(document.removeEventListener("pointermove",D),document.removeEventListener("pointerup",O),document.removeEventListener("pointercancel",O),N?.(z));};j(F),document.addEventListener("pointermove",D),document.addEventListener("pointerup",O),document.addEventListener("pointercancel",O);});}if(!l&&v){const $=v.querySelector(".card-body");if($){$.classList.add("color-picker__body"),w=b("div",{className:"color-picker__palette-cursor"}),k=b("div",{className:"color-picker__palette"},w),T=b("div",{className:"color-picker__alpha-thumb"}),x=b("div",{className:"color-picker__alpha"},T),C=b("div",{className:"color-picker__hue-thumb"}),y=b("div",{className:"color-picker__hue"},C);const j=b("div",{className:"color-picker__main"},k,x),N=b("div",{className:"color-picker__hue-row"},y),F=os({blockGameKeys:true});I=F.input,I.classList.add("color-picker__hex-input"),I.value="",I.maxLength=9,I.spellcheck=false,I.inputMode="text",I.setAttribute("aria-label",`Hex code for ${n}`),S=b("button",{type:"button",className:"color-picker__mode-btn",textContent:"HEX","aria-pressed":"false","aria-label":"Passer en saisie RGBA"}),F.root.classList.add("color-picker__hex-wrap");const _=b("div",{className:"color-picker__hex-row"},S,F.root);$.replaceChildren(j,N,_),le(k,O=>{if(!k||!w)return;const z=k.getBoundingClientRect(),ge=ye((O.clientX-z.left)/z.width,0,1),J=ye((O.clientY-z.top)/z.height,0,1);B({...u,s:ge,v:1-J},"input");},()=>R("change")),le(x,O=>{if(!x)return;const z=x.getBoundingClientRect(),ge=ye((O.clientY-z.top)/z.height,0,1);B({...u,a:1-ge},"input");},()=>R("change")),le(y,O=>{if(!y)return;const z=y.getBoundingClientRect(),ge=ye((O.clientX-z.left)/z.width,0,1);B({...u,h:ge*360},"input");},()=>R("change")),S.addEventListener("click",()=>{if(E=E==="hex"?"rgba":"hex",I){const O=pt(u);I.value=E==="hex"?u.a===1?O.hex:O.hexa:O.rgba;}ee(),I?.focus(),I?.select();}),I.addEventListener("input",()=>{if(E==="hex"){const O=vd(I.value);if(O!==I.value){const z=I.selectionStart??O.length;I.value=O,I.setSelectionRange(z,z);}}});const D=()=>{const O=I.value;if(E==="hex"){const z=Nt(O);if(!z){I.value=u.a===1?pt(u).hex:pt(u).hexa;return}const ge=O.startsWith("#")?O.slice(1):O,J=ge.length===4||ge.length===8;z.a=J?z.a:u.a,X(z,"change");}else {const z=xd(O),ge=xo(z);if(!ge){I.value=pt(u).rgba;return}X(ge,"change");}};I.addEventListener("change",D),I.addEventListener("blur",D),I.addEventListener("keydown",O=>{O.key==="Enter"&&(D(),I.blur());});}}return l&&(v&&v.remove(),P=b("input",{className:"color-picker__native",type:"color",value:ni(cn({...u,a:1}))}),g.addEventListener("click",()=>P.click()),P.addEventListener("input",()=>{const $=Nt(P.value);$&&($.a=u.a,X($,"input"),R("change"));}),p.appendChild(P)),ee(),{root:p,isMobile:l,getValue:()=>pt(u),setValue:($,j)=>{const N=xo($)??Nt($)??Nt("#FFFFFF");N&&(typeof j=="number"&&(N.a=j),X(N,null));}}}const kd=window;function Sd(){if(typeof unsafeWindow<"u"&&unsafeWindow)return unsafeWindow;const e=window.wrappedJSObject;return e&&e!==window?e:kd}const Cd=Sd(),L=Cd;function Ad(e){try{return !!e.isSecureContext}catch{return  false}}function ri(e){const t=e?.getRootNode?.();return t&&(t instanceof Document||t.host)?t:document}function as(){const e=navigator.platform||"",t=navigator.userAgent||"";return /Mac|iPhone|iPad|iPod/i.test(e)||/Mac OS|iOS/i.test(t)}async function Td(){try{const e=await navigator.permissions?.query?.({name:"clipboard-write"});return e?e.state==="granted"||e.state==="prompt":!0}catch{return  true}}function Id(e,t){const n=document.createElement("textarea");return n.value=e,n.setAttribute("readonly","true"),n.style.position="fixed",n.style.opacity="0",n.style.pointerEvents="none",n.style.top="0",t.appendChild?t.appendChild(n):document.body.appendChild(n),n}function Pd(e){try{const t=window.getSelection?.();if(!t)return !1;const n=document.createRange();return n.selectNodeContents(e),t.removeAllRanges(),t.addRange(n),!0}catch{return  false}}async function Ed(e){if(!("clipboard"in navigator))return {ok:false,method:"clipboard-write"};if(!Ad(L))return {ok:false,method:"clipboard-write"};if(!await Td())return {ok:false,method:"clipboard-write"};try{return await navigator.clipboard.writeText(e),{ok:!0,method:"clipboard-write"}}catch{return {ok:false,method:"clipboard-write"}}}function Md(e,t){try{const n=t||ri(),r=Id(e,n);r.focus(),r.select(),r.setSelectionRange(0,r.value.length);let o=!1;try{o=document.execCommand("copy");}catch{o=!1;}return r.remove(),{ok:o,method:"execCommand"}}catch{return {ok:false,method:"execCommand"}}}function Ld(e,t){if(!t)return {ok:false,method:"selection"};const n=t.textContent??"";let r=false;if(n!==e)try{t.textContent=e,r=!0;}catch{}const o=Pd(t);r&&setTimeout(()=>{try{t.textContent=n;}catch{}},80);const i=as()?"⌘C pour copier":"Ctrl+C pour copier";return {ok:o,method:"selection",hint:i}}async function _d(e,t={}){const n=(e??"").toString();if(!n.length)return {ok:false,method:"noop"};const r=await Ed(n);if(r.ok)return r;const o=t.injectionRoot||ri(t.valueNode||void 0),i=Md(n,o);if(i.ok)return i;const a=Ld(n,t.valueNode||null);if(a.ok)return a;if(!t.disablePromptFallback)try{return window.prompt(Ke.isDiscord()?"Copie manuelle (Discord bloque clipboard):":"Copie manuelle:",n),{ok:!0,method:"prompt"}}catch{}return {ok:false,method:"noop"}}function Fd(e,t,n={}){const r=o=>{if(n.showTip){n.showTip(o);return}try{e.setAttribute("aria-label",o);const i=document.createElement("div");i.textContent=o,i.style.position="absolute",i.style.top="-28px",i.style.right="0",i.style.padding="4px 8px",i.style.borderRadius="8px",i.style.fontSize="12px",i.style.background="color-mix(in oklab, var(--bg) 85%, transparent)",i.style.border="1px solid var(--border)",i.style.color="var(--fg)",i.style.pointerEvents="none",i.style.opacity="0",i.style.transition="opacity .12s";const a=ri(e);a.appendChild?a.appendChild(i):document.body.appendChild(i);const s=e.getBoundingClientRect();i.style.left=`${s.right-8}px`,i.style.top=`${s.top-28}px`,requestAnimationFrame(()=>i.style.opacity="1"),setTimeout(()=>{i.style.opacity="0",setTimeout(()=>i.remove(),150);},1200);}catch{}};e.addEventListener("click",async o=>{o.stopPropagation();const i=(t()??"").toString(),a=await _d(i,{valueNode:n.valueNode??null,injectionRoot:n.injectionRoot??null,disablePromptFallback:n.disablePromptFallback??false});n.onResult?.(a),a.ok?a.method==="clipboard-write"||a.method==="execCommand"||a.method==="prompt"?r("Copié"):a.method==="selection"&&r(a.hint||(as()?"⌘C pour copier":"Ctrl+C pour copier")):r("Impossible de copier");});}const dn={light:{"--bg":"rgba(255,255,255,0.7)","--fg":"#0f172a","--muted":"rgba(15,23,42,0.06)","--soft":"rgba(15,23,42,0.04)","--accent":"#2563eb","--border":"rgba(15,23,42,0.12)","--shadow":"rgba(2,6,23,.2)","--paper":"#FDFBF7","--tab-bg":"#ffffff","--tab-fg":"#0f172a","--pill-from":"#4f46e5","--pill-to":"#06b6d4","--low":"#dc2626","--medium":"#f59e0b","--high":"#16a34a","--complete":"#15803d","--info":"#2563eb","--accent-1":"#16a34a","--accent-2":"#7c3aed","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--switch-thumb":"#ffffff","--journal-ink":"#333333"},dark:{"--bg":"rgba(10,12,18,0.6)","--fg":"#e5e7eb","--muted":"rgba(229,231,235,0.08)","--soft":"rgba(229,231,235,0.05)","--accent":"#60a5fa","--border":"rgba(148,163,184,0.2)","--shadow":"rgba(0,0,0,.45)","--paper":"#1a1d24","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#e5e7eb","--pill-from":"#6366f1","--pill-to":"#06b6d4","--low":"#ef4444","--medium":"#f59e0b","--high":"#22c55e","--complete":"#16a34a","--info":"#3b82f6","--accent-1":"#22c55e","--accent-2":"#a855f7","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},sepia:{"--bg":"rgba(247,242,231,0.72)","--fg":"#3b2f2f","--muted":"rgba(59,47,47,0.06)","--soft":"rgba(59,47,47,0.04)","--accent":"#b07d62","--border":"rgba(59,47,47,0.14)","--shadow":"rgba(0,0,0,.18)","--paper":"#F5E6D3","--tab-bg":"#fff","--tab-fg":"#3b2f2f","--pill-from":"#b07d62","--pill-to":"#d4a373","--low":"#c2410c","--medium":"#d97706","--high":"#15803d","--complete":"#166534","--info":"#1d4ed8","--accent-1":"#15803d","--accent-2":"#6b21a8","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--switch-thumb":"#ffffff","--journal-ink":"#3b2f2f"},forest:{"--bg":"rgba(14,24,18,0.62)","--fg":"#e7f5e9","--muted":"rgba(231,245,233,0.08)","--soft":"rgba(231,245,233,0.05)","--accent":"#34d399","--border":"rgba(231,245,233,0.16)","--shadow":"rgba(0,0,0,.5)","--paper":"#1e2820","--tab-bg":"rgba(255,255,255,0.06)","--tab-fg":"#e7f5e9","--pill-from":"#10b981","--pill-to":"#84cc16","--low":"#dc2626","--medium":"#eab308","--high":"#22c55e","--complete":"#16a34a","--info":"#06b6d4","--accent-1":"#22c55e","--accent-2":"#8b5cf6","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},violet:{"--bg":"rgba(23, 16, 42, 0.68)","--fg":"#f5f3ff","--muted":"rgba(245,243,255,0.08)","--soft":"rgba(245,243,255,0.05)","--accent":"#a855f7","--border":"rgba(216,180,254,0.22)","--shadow":"rgba(12,3,30,.55)","--paper":"#1a1424","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#ede9fe","--pill-from":"#a855f7","--pill-to":"#f472b6","--low":"#f43f5e","--medium":"#fbbf24","--high":"#4ade80","--complete":"#22c55e","--info":"#60a5fa","--accent-1":"#4ade80","--accent-2":"#c084fc","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},ocean:{"--bg":"rgba(10, 34, 46, 0.66)","--fg":"#e0f7ff","--muted":"rgba(224,247,255,0.07)","--soft":"rgba(224,247,255,0.05)","--accent":"#38bdf8","--border":"rgba(125, 211, 252, 0.22)","--shadow":"rgba(0, 16, 32, .52)","--paper":"#0f2027","--tab-bg":"rgba(56,189,248,0.14)","--tab-fg":"#e0f7ff","--pill-from":"#0ea5e9","--pill-to":"#14b8a6","--low":"#f43f5e","--medium":"#fbbf24","--high":"#34d399","--complete":"#10b981","--info":"#38bdf8","--accent-1":"#22c55e","--accent-2":"#a78bfa","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},ember:{"--bg":"rgba(34,18,10,0.64)","--fg":"#fff7ed","--muted":"rgba(255,247,237,0.08)","--soft":"rgba(255,247,237,0.05)","--accent":"#f97316","--border":"rgba(255, 159, 92, 0.24)","--shadow":"rgba(16,6,2,.52)","--paper":"#1a1210","--tab-bg":"rgba(255,247,237,0.09)","--tab-fg":"#fff7ed","--pill-from":"#fb923c","--pill-to":"#facc15","--low":"#dc2626","--medium":"#f59e0b","--high":"#22c55e","--complete":"#16a34a","--info":"#38bdf8","--accent-1":"#22c55e","--accent-2":"#c084fc","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},magicGarden:{"--bg":"#201D1D","--fg":"#F5F5F5","--muted":"rgba(255,255,255,0.6)","--soft":"rgba(0,0,0,0.3)","--accent":"#FFF27D","--border":"rgba(255,255,255,0.1)","--border-accent":"#4A3B2E","--shadow":"rgba(0,0,0,0.5)","--paper":"#FDFBF7","--card-shadow":"0 4px 10px rgba(0, 0, 0, 0.5)","--tab-bg":"#10725A","--tab-fg":"#F5F5F5","--section-title":"#10725A","--group-title":"#5EB292","--item-label":"#F5F5F5","--item-desc":"rgba(255,255,255,0.6)","--item-value":"#FFF27D","--card-bg":"rgba(0,0,0,0.3)","--card-radius":"12px","--card-border":"#4A3B2E","--pill-from":"#FFF27D","--pill-to":"#5EB292","--scrollbar-thumb":"rgba(255,255,255,0.2)","--scrollbar-thumb-hover":"rgba(255,255,255,0.3)","--low":"#F98B4B","--medium":"#F3D32B","--high":"#5EAC46","--complete":"#0B893F","--info":"#38bdf8","--accent-1":"#4caf50","--accent-2":"#9c27b0","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--switch-thumb":"#ffffff","--journal-ink":"#000000"}};function Od(e){const{host:t,themes:n,initialTheme:r,onThemeChange:o}=e;let i=r,a=null,s=false;function c(l){const u=n[l]||n[i]||{};t.setAttribute("data-theme",l),s&&t.classList.add("theme-anim");for(const[p,f]of Object.entries(u))t.style.setProperty(p,f);s?(a!==null&&clearTimeout(a),a=L.setTimeout(()=>{t.classList.remove("theme-anim"),a=null;},320)):s=true,i=l,o?.(l);}function d(){return i}return c(r),{applyTheme:c,getCurrentTheme:d}}const wo={ui:{expandedCards:{style:false,system:false}}};async function Rd(){const e=await Pr("tab-settings",{version:1,defaults:wo,sanitize:o=>({ui:{expandedCards:Ui(wo.ui.expandedCards,o.ui?.expandedCards)}})});function t(o){const i=e.get();e.update({ui:{...i.ui,...o,expandedCards:Ui(i.ui.expandedCards,o.expandedCards)}});}function n(o,i){const a=e.get();e.update({ui:{...a.ui,expandedCards:{...a.ui.expandedCards,[o]:!!i}}});}function r(o){const i=e.get();n(o,!i.ui.expandedCards[o]);}return {get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:r}}function ss(e){return e.replace(/[_-]+/g," ").replace(/^\w/,t=>t.toUpperCase())}function Nd(){return Object.keys(dn).map(e=>({value:e,label:ss(e)}))}const Dd=["--bg","--fg","--accent","--muted","--soft","--border","--shadow","--paper","--tab-bg","--tab-fg","--pill-from","--pill-to","--low","--medium","--high","--complete","--info","--accent-1","--accent-2","--accent-3"];function $d(e){return ss(e.replace(/^--/,""))}function jd(e){return e.alpha<1?e.rgba:e.hex}class Bd extends Ht{constructor(t){super({id:"tab-settings",label:"Settings"}),this.deps=t;}async build(t){const n=this.createGrid("12px");n.id="settings",t.appendChild(n);let r;try{r=await Rd();}catch{r={get:()=>wo,set:()=>{},save:()=>{},setUI:()=>{},setCardExpanded:()=>{},toggleCard:()=>{}};}const o=r.get(),i=Object.keys(dn),a=this.deps.getCurrentTheme?.()??this.deps.initialTheme,s=i.includes(a)?a:i[0]??"dark";let c=s;const d=ei({text:"Theme",tone:"muted",size:"lg"}),l=Jc({options:Nd(),value:s,onChange:m=>{c=m,this.deps.applyTheme(m),this.renderThemePickers(m,u,c);}}),u=b("div",{className:"settings-theme-grid"}),p=$e({title:"Style",padding:"lg",expandable:true,defaultExpanded:!!o.ui.expandedCards.style,onExpandChange:m=>r.setCardExpanded("style",m)},b("div",{className:"kv settings-theme-row"},d.root,l.root),u);this.renderThemePickers(s,u,c);const f=this.createEnvCard({defaultExpanded:!!o.ui.expandedCards.system,onExpandChange:m=>r.setCardExpanded("system",m)});n.appendChild(p),n.appendChild(f);}renderThemePickers(t,n,r){const o=dn[t];if(n.replaceChildren(),!!o)for(const i of Dd){const a=o[i];if(a==null)continue;const s=wd({label:$d(i),value:a,defaultExpanded:false,onInput:c=>this.updateThemeVar(t,i,c,r),onChange:c=>this.updateThemeVar(t,i,c,r)});n.appendChild(s.root);}}updateThemeVar(t,n,r,o){const i=dn[t];i&&(i[n]=jd(r),o===t&&this.deps.applyTheme(t));}createEnvCard(t){const n=t?.defaultExpanded??false,r=t?.onExpandChange,o=(h,v)=>{const k=b("div",{className:"kv kv--inline-mobile"}),w=b("label",{},h),x=b("div",{className:"ro"});return typeof v=="string"?x.textContent=v:x.append(v),k.append(w,x),k},i=b("code",{},"—"),a=b("span",{},"—"),s=b("span",{},"—"),c=b("span",{},"—"),d=b("span",{},"—"),l=b("span",{},"—"),u=()=>{const h=Ke.detect();s.textContent=h.surface,c.textContent=h.platform,d.textContent=h.browser??"Unknown",l.textContent=h.os??"Unknown",i.textContent=h.host,a.textContent=h.isInIframe?"Yes":"No";},p=xt({label:"Copy JSON",variant:"primary",size:"sm"});Fd(p,()=>{const h=Ke.detect();return JSON.stringify(h,null,2)});const f=b("div",{style:"width:100%;display:flex;justify-content:center;"},p),m=$e({title:"System",variant:"soft",padding:"lg",footer:f,expandable:true,defaultExpanded:n,onExpandChange:r},o("Surface",s),o("Platform",c),o("Browser",d),o("OS",l),o("Host",i),o("Iframe",a)),g=()=>{document.hidden||u();};return document.addEventListener("visibilitychange",g),u(),this.addCleanup(()=>document.removeEventListener("visibilitychange",g)),m}}function oi(e={}){const{id:t,checked:n=false,disabled:r=false,size:o="md",label:i,labelSide:a="right",onChange:s}=e,c=b("div",{className:"lg-switch-wrap"}),d=b("button",{className:`lg-switch lg-switch--${o}`,id:t,type:"button",role:"switch","aria-checked":String(!!n),"aria-disabled":String(!!r),title:i??"Basculer"}),l=b("span",{className:"lg-switch-track"}),u=b("span",{className:"lg-switch-thumb"});d.append(l,u);let p=null;i&&a!=="none"&&(p=b("span",{className:"lg-switch-label"},i)),p&&a==="left"?c.append(p,d):p&&a==="right"?c.append(d,p):c.append(d);let f=!!n,m=!!r;function g(){d.classList.toggle("on",f),d.setAttribute("aria-checked",String(f)),d.disabled=m,d.setAttribute("aria-disabled",String(m));}function h(S=false){m||(f=!f,g(),S||s?.(f));}function v(S){S.preventDefault(),h();}function k(S){m||((S.key===" "||S.key==="Enter")&&(S.preventDefault(),h()),S.key==="ArrowLeft"&&(S.preventDefault(),x(false)),S.key==="ArrowRight"&&(S.preventDefault(),x(true)));}d.addEventListener("click",v),d.addEventListener("keydown",k);function w(){return f}function x(S,P=false){f=!!S,g(),P||s?.(f);}function T(S){m=!!S,g();}function y(S){if(!S){p&&(p.remove(),p=null);return}p?p.textContent=S:(p=b("span",{className:"lg-switch-label"},S),c.append(p));}function C(){d.focus();}function I(){d.removeEventListener("click",v),d.removeEventListener("keydown",k);}return g(),{root:c,button:d,isChecked:w,setChecked:x,setDisabled:T,setLabel:y,focus:C,destroy:I}}function ls(e){const{id:t,columns:n,data:r,pageSize:o=0,stickyHeader:i=true,zebra:a=true,animations:s=true,respectReducedMotion:c=true,compact:d=false,maxHeight:l,selectable:u=false,selectionType:p="switch",selectOnRowClick:f=false,initialSelection:m=[],hideHeaderCheckbox:g=false,getRowId:h=(G,U)=>String(U),onSortChange:v,onSelectionChange:k,onRowClick:w}=e;let x=n.slice(),T=r.slice(),y=r.slice(),C=null,I=null,S=1;const P=typeof window<"u"&&typeof window.matchMedia=="function"?window.matchMedia("(prefers-reduced-motion: reduce)").matches:false,E=!!s&&!(c&&P),R=b("div",{className:"lg-table-wrap",id:t});if(l!=null){const G=typeof l=="number"?`${l}px`:l;R.style.setProperty("--tbl-max-h",G);}const ee=b("div",{className:"lg-table"}),B=b("div",{className:"lg-thead"}),X=b("div",{className:"lg-tbody"}),le=b("div",{className:"lg-tfoot"});i&&R.classList.add("sticky"),a&&R.classList.add("zebra"),d&&R.classList.add("compact"),u&&R.classList.add("selectable");const $=p==="switch"?"52px":"36px";R.style.setProperty("--check-w",$);function j(G){return G==="center"?"center":G==="right"?"flex-end":"flex-start"}function N(){const G=x.map(te=>{const ae=(te.width||"1fr").trim();return /\bfr$/.test(ae)?`minmax(0, ${ae})`:ae}),U=(u?[$,...G]:G).join(" ");R.style.setProperty("--lg-cols",U);}N();function F(){return o?Math.max(1,Math.ceil(T.length/o)):1}function _(){if(!o)return T;const G=(S-1)*o;return T.slice(G,G+o)}function D(){if(!C||!I)return;const G=x.find(ae=>String(ae.key)===C),U=I==="asc"?1:-1,te=G?.sortFn?(ae,ue)=>U*G.sortFn(ae,ue):(ae,ue)=>{const Q=ae[C],Z=ue[C];return Q==null&&Z==null?0:Q==null?-1*U:Z==null?1*U:typeof Q=="number"&&typeof Z=="number"?U*(Q-Z):U*String(Q).localeCompare(String(Z),void 0,{numeric:true,sensitivity:"base"})};T.sort(te);}const O=new Set(m);function z(){return Array.from(O)}const ge=new Map;function J(G){O.clear(),G.forEach(U=>O.add(U)),Ce(),ge.forEach((U,te)=>{U.setChecked(O.has(te),true);}),qt(),k?.(z());}function Y(){O.clear(),Ce(),ge.forEach(G=>G.setChecked(false,true)),qt(),k?.(z());}let me=null;function Ce(){if(!me)return;const G=_();if(!G.length){me.indeterminate=false,me.checked=false;return}const U=G.map((ae,ue)=>h(ae,(S-1)*(o||0)+ue)),te=U.reduce((ae,ue)=>ae+(O.has(ue)?1:0),0);me.checked=te===U.length,me.indeterminate=te>0&&te<U.length;}function Ln(){const G=X.offsetWidth-X.clientWidth;B.style.paddingRight=G>0?`${G}px`:"0px";}function Hr(){requestAnimationFrame(Ln);}const Ur=new ResizeObserver(()=>Ln()),$i=()=>Ln();function Pc(){B.replaceChildren();const G=b("div",{className:"lg-tr lg-tr-head"});if(u){const U=b("div",{className:"lg-th lg-th-check"});g||(me=b("input",{type:"checkbox"}),me.addEventListener("change",()=>{const te=_(),ae=me.checked;te.forEach((ue,Q)=>{const Z=h(ue,(S-1)*(o||0)+Q);ae?O.add(Z):O.delete(Z);}),k?.(z()),qt();}),U.appendChild(me)),G.appendChild(U);}x.forEach(U=>{const te=b("button",{className:"lg-th",type:"button",title:U.title||U.header});te.textContent=U.header,U.align&&te.style.setProperty("--col-justify",j(U.align)),U.sortable&&te.classList.add("sortable"),C===String(U.key)&&I?te.setAttribute("data-sort",I):te.removeAttribute("data-sort"),U.sortable&&te.addEventListener("click",()=>{const ae=String(U.key);C!==ae?(C=ae,I="asc"):(I=I==="asc"?"desc":I==="desc"?null:"asc",I||(C=null,T=y.slice())),v?.(C,I),C&&I&&D(),Fn();}),G.appendChild(te);}),B.appendChild(G);try{Ur.disconnect();}catch{}Ur.observe(X),Hr();}function Vr(G){return Array.from(G.querySelectorAll(":scope > .lg-td, :scope > .lg-td-check"))}function ji(G){return G.querySelector(".lg-td, .lg-td-check")}function Bi(G){const U=ji(G);return U?U.getBoundingClientRect():null}function qt(){const G=_(),U=new Map;Array.from(X.children).forEach(Q=>{const Z=Q,Ae=Z.getAttribute("data-id");if(!Ae)return;const Le=Bi(Z);Le&&U.set(Ae,Le);});const te=new Map;Array.from(X.children).forEach(Q=>{const Z=Q,Ae=Z.getAttribute("data-id");Ae&&te.set(Ae,Z);});const ae=[];for(let Q=0;Q<G.length;Q++){const Z=G[Q],Ae=(o?(S-1)*o:0)+Q,Le=h(Z,Ae);ae.push(Le);let be=te.get(Le);be||(be=Ec(Z,Ae),E&&Vr(be).forEach(Xt=>{Xt.style.transform="translateY(6px)",Xt.style.opacity="0";})),X.appendChild(be);}const ue=[];if(te.forEach((Q,Z)=>{ae.includes(Z)||ue.push(Q);}),!E){ue.forEach(Q=>Q.remove()),Ce(),Hr();return}ae.forEach(Q=>{const Z=X.querySelector(`.lg-tr-body[data-id="${Q}"]`);if(!Z)return;const Ae=Bi(Z),Le=U.get(Q),be=Vr(Z);if(Le&&Ae){const Xe=Le.left-Ae.left,Ft=Le.top-Ae.top;be.forEach(st=>{st.style.transition="none",st.style.transform=`translate(${Xe}px, ${Ft}px)`,st.style.opacity="1";}),ji(Z)?.getBoundingClientRect(),be.forEach(st=>{st.style.willChange="transform, opacity",st.style.transition="transform .18s ease, opacity .18s ease";}),requestAnimationFrame(()=>{be.forEach(st=>{st.style.transform="translate(0,0)";});});}else be.forEach(Xe=>{Xe.style.transition="transform .18s ease, opacity .18s ease";}),requestAnimationFrame(()=>{be.forEach(Xe=>{Xe.style.transform="translate(0,0)",Xe.style.opacity="1";});});const Kr=Xe=>{(Xe.propertyName==="transform"||Xe.propertyName==="opacity")&&(be.forEach(Ft=>{Ft.style.willChange="",Ft.style.transition="",Ft.style.transform="",Ft.style.opacity="";}),Xe.currentTarget.removeEventListener("transitionend",Kr));},Xt=be[0];Xt&&Xt.addEventListener("transitionend",Kr);}),ue.forEach(Q=>{const Z=Vr(Q);Z.forEach(be=>{be.style.willChange="transform, opacity",be.style.transition="transform .18s ease, opacity .18s ease",be.style.opacity="0",be.style.transform="translateY(-6px)";});const Ae=be=>{be.propertyName==="opacity"&&(be.currentTarget.removeEventListener("transitionend",Ae),Q.remove());},Le=Z[0];Le?Le.addEventListener("transitionend",Ae):Q.remove();}),Ce(),Hr();}function Ec(G,U){const te=h(G,U),ae=b("div",{className:"lg-tr lg-tr-body","data-id":te});if(u){const ue=b("div",{className:"lg-td lg-td-check"});if(p==="switch"){const Q=oi({size:"sm",checked:O.has(te),onChange:Z=>{Z?O.add(te):O.delete(te),Ce(),k?.(z());}});ge.set(te,Q),ue.appendChild(Q.root);}else {const Q=b("input",{type:"checkbox",className:"lg-row-check"});Q.checked=O.has(te),Q.addEventListener("change",Z=>{Z.stopPropagation(),Q.checked?O.add(te):O.delete(te),Ce(),k?.(z());}),Q.addEventListener("click",Z=>Z.stopPropagation()),ue.appendChild(Q);}ae.appendChild(ue);}return x.forEach(ue=>{const Q=b("div",{className:"lg-td"});ue.align&&Q.style.setProperty("--col-justify",j(ue.align));let Z=ue.render?ue.render(G,U):String(G[ue.key]??"");typeof Z=="string"?Q.textContent=Z:Q.appendChild(Z),ae.appendChild(Q);}),(w||u&&f)&&(ae.classList.add("clickable"),ae.addEventListener("click",ue=>{if(!ue.target.closest(".lg-td-check")){if(u&&f){const Q=!O.has(te);if(Q?O.add(te):O.delete(te),Ce(),p==="switch"){const Z=ge.get(te);Z&&Z.setChecked(Q,true);}else {const Z=ae.querySelector(".lg-row-check");Z&&(Z.checked=Q);}k?.(z());}w?.(G,U,ue);}})),ae}function zi(){if(le.replaceChildren(),!o)return;const G=F(),U=b("div",{className:"lg-pager"}),te=b("button",{className:"btn",type:"button"},"←"),ae=b("button",{className:"btn",type:"button"},"→"),ue=b("span",{className:"lg-pager-info"},`${S} / ${G}`);te.disabled=S<=1,ae.disabled=S>=G,te.addEventListener("click",()=>_n(S-1)),ae.addEventListener("click",()=>_n(S+1)),U.append(te,ue,ae),le.appendChild(U);}function _n(G){const U=F();S=Math.min(Math.max(1,G),U),qt(),zi();}function Fn(){N(),Pc(),qt(),zi();}function Mc(G){y=G.slice(),T=G.slice(),C&&I&&D(),_n(1);}function Lc(G){x=G.slice(),Fn();}function _c(G,U="asc"){C=G,I=G?U:null,C&&I?D():T=y.slice(),Fn();}function Fc(){try{Ur.disconnect();}catch{}window.removeEventListener("resize",$i);}return ee.append(B,X,le),R.appendChild(ee),window.addEventListener("resize",$i),Fn(),{root:R,setData:Mc,setColumns:Lc,sortBy:_c,getSelection:z,setSelection:J,clearSelection:Y,setPage:_n,getState:()=>({page:S,pageCount:F(),sortKey:C,sortDir:I}),destroy:Fc}}let yr=false;const nn=new Set;function zd(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}const Ne=e=>{const t=zd();if(t){for(const n of nn)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function Gd(){yr||(yr=true,window.addEventListener("keydown",Ne,true),window.addEventListener("keypress",Ne,true),window.addEventListener("keyup",Ne,true),document.addEventListener("keydown",Ne,true),document.addEventListener("keypress",Ne,true),document.addEventListener("keyup",Ne,true));}function Wd(){yr&&(yr=false,window.removeEventListener("keydown",Ne,true),window.removeEventListener("keypress",Ne,true),window.removeEventListener("keyup",Ne,true),document.removeEventListener("keydown",Ne,true),document.removeEventListener("keypress",Ne,true),document.removeEventListener("keyup",Ne,true));}function Hd(e){return nn.size===0&&Gd(),nn.add(e),()=>{nn.delete(e),nn.size===0&&Wd();}}function $n(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function Ud(){const e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.display="none",t.style.flexShrink="0";const n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");const r=document.createElementNS(e,"animate");r.setAttribute("attributeName","stroke-dasharray"),r.setAttribute("values","1,150;90,150;90,150"),r.setAttribute("dur","1.5s"),r.setAttribute("repeatCount","indefinite");const o=document.createElementNS(e,"animateTransform");return o.setAttribute("attributeName","transform"),o.setAttribute("attributeType","XML"),o.setAttribute("type","rotate"),o.setAttribute("from","0 12 12"),o.setAttribute("to","360 12 12"),o.setAttribute("dur","1s"),o.setAttribute("repeatCount","indefinite"),n.append(r,o),t.appendChild(n),t}function ii(e={}){const{id:t,placeholder:n="Rechercher…",value:r="",size:o="md",disabled:i=false,autoFocus:a=false,onChange:s,onSearch:c,autoSearch:d=false,debounceMs:l=0,focusKey:u="/",iconLeft:p,iconRight:f,withClear:m=true,clearTitle:g="Effacer",ariaLabel:h,submitLabel:v,loading:k=false,blockGameKeys:w=true}=e,x=b("div",{className:"search"+(o?` search--${o}`:""),id:t}),T=b("span",{className:"search-ico search-ico--left"});if(p){const Y=$n(p);Y&&T.appendChild(Y);}else T.textContent="🔎",T.style.opacity=".9";const y=b("input",{className:"input search-input",type:"text",placeholder:n,value:r,"aria-label":h||n}),C=b("span",{className:"search-ico search-ico--right"});if(f){const Y=$n(f);Y&&C.appendChild(Y);}const I=Ud();I.classList.add("search-spinner");const S=m?b("button",{className:"search-clear",type:"button",title:g},"×"):null,P=v!=null?b("button",{className:"btn search-submit",type:"button"},v):null,E=b("div",{className:"search-field"},T,y,C,I,...S?[S]:[]);x.append(E,...P?[P]:[]);let R=!!i,ee=null;function B(Y){I.style.display=Y?"inline-block":"none",x.classList.toggle("is-loading",Y);}function X(){ee!=null&&(window.clearTimeout(ee),ee=null);}function le(Y){X(),l>0?ee=window.setTimeout(()=>{ee=null,Y();},l):Y();}function $(){s?.(y.value),d&&c&&c(y.value);}y.addEventListener("input",()=>{le($);}),y.addEventListener("keydown",Y=>{Y.key==="Enter"?(Y.preventDefault(),X(),c?.(y.value)):Y.key==="Escape"&&(y.value.length>0?F("",{notify:true}):y.blur());}),S&&S.addEventListener("click",()=>F("",{notify:true})),P&&P.addEventListener("click",()=>c?.(y.value));let j=()=>{};if(w&&(j=Hd(y)),u){const Y=me=>{if(me.key===u&&!me.ctrlKey&&!me.metaKey&&!me.altKey){const Ce=document.activeElement;Ce&&(Ce.tagName==="INPUT"||Ce.tagName==="TEXTAREA"||Ce.isContentEditable)||(me.preventDefault(),y.focus());}};window.addEventListener("keydown",Y,true),x.__cleanup=()=>{window.removeEventListener("keydown",Y,true),j();};}else x.__cleanup=()=>{j();};function N(Y){R=!!Y,y.disabled=R,S&&(S.disabled=R),P&&(P.disabled=R),x.classList.toggle("disabled",R);}function F(Y,me={}){const Ce=y.value;y.value=Y??"",me.notify&&Ce!==Y&&le($);}function _(){return y.value}function D(){y.focus();}function O(){y.blur();}function z(Y){y.placeholder=Y;}function ge(Y){F("",Y);}return N(R),B(k),a&&D(),{root:x,input:y,getValue:_,setValue:F,focus:D,blur:O,setDisabled:N,setPlaceholder:z,clear:ge,setLoading:B,setIconLeft(Y){T.replaceChildren();const me=$n(Y??"🔎");me&&T.appendChild(me);},setIconRight(Y){C.replaceChildren();const me=$n(Y??"");me&&C.appendChild(me);}}}function Vd(e){const t=String(e??"").trim().toLowerCase();return t?t==="common"?"Common":t==="uncommon"?"Uncommon":t==="rare"?"Rare":t==="legendary"?"Legendary":t==="mythical"?"Mythical":t==="divine"?"Divine":t==="celestial"?"Celestial":t==="unknown"||t==="unknow"?"Unknown":null:null}function Kd(e){return e.toLowerCase()}function cs(e={}){const{id:t,label:n="",type:r="neutral",tone:o="soft",border:i,withBorder:a,pill:s=true,size:c="md",onClick:d,variant:l="default",rarity:u=null}=e,p=b("span",{className:"badge",id:t});s&&p.classList.add("badge--pill"),c==="sm"?p.classList.add("badge--sm"):c==="lg"?p.classList.add("badge--lg"):p.classList.add("badge--md"),d&&p.addEventListener("click",d);let f=false,m=a;function g(){f||(m===false?p.style.border="none":p.style.border="");}function h(y,C=o){p.classList.remove("badge--neutral","badge--info","badge--success","badge--warning","badge--danger","badge--soft","badge--outline","badge--solid"),p.classList.add(`badge--${y}`,`badge--${C}`),g();}function v(y){const C=(y??"").trim();C?(p.style.border=C,f=true):(f=false,g());}function k(y){m=y,g();}function w(y){p.textContent=y;}function x(y,C=o){h(y,C);}function T(y){p.classList.remove("badge--rarity","badge--rarity-common","badge--rarity-uncommon","badge--rarity-rare","badge--rarity-legendary","badge--rarity-mythical","badge--rarity-divine","badge--rarity-celestial","badge--rarity-unknown"),p.style.background="",p.style.backgroundSize="",p.style.animation="",p.style.color="",p.style.webkitTextStroke="";const C=Vd(y);if(!C){p.textContent=String(y??"—");return}p.textContent=C,p.classList.add("badge--rarity",`badge--rarity-${Kd(C)}`);}return l==="rarity"?T(u):(p.textContent=n,h(r,o),typeof a=="boolean"&&k(a),i&&v(i)),{root:p,setLabel:w,setType:x,setBorder:v,setWithBorder:k,setRarity:T}}function Yd(){return {ready:false,app:null,renderer:null,ctors:null,baseUrl:null,textures:new Map,animations:new Map,live:new Set,defaultParent:null,overlay:null,categoryIndex:null}}function qd(){return {lru:new Map,cost:0,srcCanvas:new Map}}function Xd(){return {cache:new Map,maxEntries:200}}const Jd={enabled:true,maxEntries:200,maxCost:800,srcCanvasMax:100},Qd={enabled:true,maxEntries:200},we=Yd(),Zd=qd(),eu={...Jd},tu=Xd(),nu={...Qd};function Ie(){return we}function Gt(){return Zd}function xn(){return eu}function wn(){return tu}function ko(){return nu}function ds(){return we.ready}const Mr=e=>new Promise(t=>setTimeout(t,e)),Ye=e=>{try{return e()}catch{return}},et=(e,t,n)=>Math.max(t,Math.min(n,e)),ru=e=>et(e,0,1);async function Vi(e,t,n){const r=performance.now();for(;performance.now()-r<t;){const o=await Promise.race([e,Mr(50).then(()=>null)]);if(o!==null)return o}throw new Error(`${n} timeout`)}const Ki=Function.prototype.bind,se={_bindPatched:false,engine:null,tos:null,app:null,renderer:null,ticker:null,stage:null};let us,ps,fs;const ou=new Promise(e=>{us=e;}),iu=new Promise(e=>{ps=e;}),au=new Promise(e=>{fs=e;});function su(e){return !!(e&&typeof e=="object"&&typeof e.start=="function"&&typeof e.destroy=="function"&&e.app&&e.app.stage&&e.app.renderer&&e.systems&&typeof e.systems.values=="function")}function lu(e){try{for(const t of e.systems.values()){const n=t?.system;if(n?.name==="tileObject")return n}}catch{}return null}function cu(e){se.engine=e,se.tos=lu(e)||null,se.app=e.app||null,se.renderer=e.app?.renderer||null,se.ticker=e.app?.ticker||null,se.stage=e.app?.stage||null;try{us(e);}catch{}try{se.app&&ps(se.app);}catch{}try{se.renderer&&fs(se.renderer);}catch{}}function ai(){return se.engine?true:(se._bindPatched||(se._bindPatched=true,Function.prototype.bind=function(e,...t){const n=Ki.call(this,e,...t);try{!se.engine&&su(e)&&(Function.prototype.bind=Ki,se._bindPatched=!1,cu(e));}catch{}return n}),false)}ai();async function du(e=15e3){const t=performance.now();for(;performance.now()-t<e;){if(se.engine)return  true;ai(),await Mr(50);}throw new Error("MGPixiHooks: engine capture timeout")}async function uu(e=15e3){return se.engine||await du(e),true}function pu(){return se.engine&&se.app?{ok:true,engine:se.engine,tos:se.tos,app:se.app}:(ai(),{ok:false,engine:se.engine,tos:se.tos,app:se.app,note:"Not captured. Wait for room, or reload."})}const He={engineReady:ou,appReady:iu,rendererReady:au,engine:()=>se.engine,tos:()=>se.tos,app:()=>se.app,renderer:()=>se.renderer,ticker:()=>se.ticker,stage:()=>se.stage,PIXI:()=>L.PIXI||null,init:uu,hook:pu,ready:()=>!!se.engine},fu=L?.location?.origin||"https://magicgarden.gg";function ms(){return typeof GM_xmlhttpRequest=="function"}function gs(e,t="text"){return new Promise((n,r)=>{GM_xmlhttpRequest({method:"GET",url:e,responseType:t,onload:o=>o.status>=200&&o.status<300?n(o):r(new Error(`HTTP ${o.status} for ${e}`)),onerror:()=>r(new Error(`Network error for ${e}`)),ontimeout:()=>r(new Error(`Timeout for ${e}`))});})}async function si(e){if(ms())return JSON.parse((await gs(e,"text")).responseText);const t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.json()}async function hs(e){if(ms())return (await gs(e,"blob")).response;const t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.blob()}function mu(e){return new Promise((t,n)=>{const r=URL.createObjectURL(e),o=L?.Image||Image,i=new o;i.decoding="async",i.onload=()=>{URL.revokeObjectURL(r),t(i);},i.onerror=()=>{URL.revokeObjectURL(r),n(new Error("Image decode failed"));},i.src=r;})}const it=(e,t)=>e.replace(/\/?$/,"/")+String(t||"").replace(/^\//,""),gu=e=>e.lastIndexOf("/")>=0?e.slice(0,e.lastIndexOf("/")+1):"",Yi=(e,t)=>String(t||"").startsWith("/")?String(t).slice(1):gu(e)+String(t||"");let li=null;function bs(){return li}function hu(e){li=e;}function ys(){return li!==null}const bu=/\/(?:r\/\d+\/)?version\/([^/]+)/,yu=15e3,vu=50;function xu(){return L?.document??(typeof document<"u"?document:null)}function ci(e={}){if(ys())return;const t=e.doc??xu();if(!t)return;const n=t.scripts;for(let r=0;r<n.length;r++){const i=n.item(r)?.src;if(!i)continue;const a=i.match(bu);if(a?.[1]){hu(a[1]);return}}}function wu(){return ci(),bs()}function ku(){return ys()}async function Su(e={}){const t=e.timeoutMs??yu,n=performance.now();for(;performance.now()-n<t;){ci();const r=bs();if(r)return r;await Mr(vu);}throw new Error("MGVersion timeout (gameVersion not found)")}const vs={init:ci,isReady:ku,get:wu,wait:Su};let di=null,xs=null;function Cu(){return di}function Au(){return xs}function Tu(e){di=e;}function Iu(e){xs=e;}function ws(){return di!==null}const Pu=15e3;async function Eu(e={}){ws()||await ui(e);}async function ui(e={}){const t=Cu();if(t)return t;const n=Au();if(n)return n;const r=(async()=>{const o=e.gameVersion??await vs.wait({timeoutMs:Pu}),i=`${fu}/version/${o}/assets/`;return Tu(i),i})();return Iu(r),r}async function Mu(e){const t=await ui();return it(t,e)}function Lu(){return ws()}const Ut={init:Eu,isReady:Lu,base:ui,url:Mu};function vr(e){const t=String(e||"").trim();return t?t.startsWith("sprite/")||t.startsWith("sprites/")?t:t.includes("/")?`sprite/${t}`:t:""}function Tn(e,t){const n=String(e||"").trim().replace(/^sprites?\//,"").replace(/^\/+|\/+$/g,""),r=String(t||"").trim();return r.includes("/")||!n?vr(r):`sprite/${n}/${r}`}function kn(e,t,n,r){const o=Tn(e,t);if(n.has(o)||r.has(o))return o;const i=String(t||"").trim();if(n.has(i)||r.has(i))return i;const a=vr(i);return n.has(a)||r.has(a)?a:o}function _u(e,t,n=25e3){const r=[e],o=new Set;let i=0;for(;r.length&&i++<n;){const a=r.pop();if(!a||o.has(a))continue;if(o.add(a),t(a))return a;const s=a.children;if(Array.isArray(s))for(let c=s.length-1;c>=0;c--)r.push(s[c]);}return null}function Fu(e){const t=L.PIXI;if(t?.Texture&&t?.Sprite&&t?.Container&&t?.Rectangle)return {Container:t.Container,Sprite:t.Sprite,Texture:t.Texture,Rectangle:t.Rectangle,AnimatedSprite:t.AnimatedSprite||null};const n=e?.stage,r=_u(n,o=>o?.texture?.frame&&o?.constructor&&o?.texture?.constructor&&o?.texture?.frame?.constructor);if(!r)throw new Error("No Sprite found yet (constructors).");return {Container:n.constructor,Sprite:r.constructor,Texture:r.texture.constructor,Rectangle:r.texture.frame.constructor,AnimatedSprite:t?.AnimatedSprite||null}}async function Ou(e,t=15e3){const n=performance.now();for(;performance.now()-n<t;)try{return Fu(e)}catch{await Mr(50);}throw new Error("Constructors timeout")}const ft=(...e)=>{try{console.log("[MGSprite]",...e);}catch{}},ks=new Map;function Ru(e){return ks.get(e)}function Nu(e,t){ks.set(e,t);}const Ss="manifest.json";let So=null;async function Du(){So||(So=await Cs());}function $u(){return So!==null}async function Cs(e={}){const t=e.baseUrl??await Ut.base(),n=Ru(t);if(n)return n;const r=si(it(t,Ss));return Nu(t,r),r}function ju(e,t){return e.bundles.find(n=>n.name===t)??null}function Bu(e){if(!e)return [];const t=new Set;for(const n of e.assets)for(const r of n.src??[])typeof r=="string"&&r.endsWith(".json")&&r!==Ss&&t.add(r);return Array.from(t)}const ct={init:Du,isReady:$u,load:Cs,getBundle:ju,listJsonFromBundle:Bu};function zu(e){return e&&typeof e=="object"&&e.frames&&e.meta&&typeof e.meta.image=="string"}function Yr(e,t,n,r,o){return new e(t,n,r,o)}function Gu(e,t,n,r,o,i,a){let s;try{s=new e({source:t.source,frame:n,orig:r,trim:o||void 0,rotate:i||0});}catch{s=new e(t.baseTexture||t,n,r,o||void 0,i||0);}if(a)if(s.defaultAnchor?.set)try{s.defaultAnchor.set(a.x,a.y);}catch{}else s.defaultAnchor?(s.defaultAnchor.x=a.x,s.defaultAnchor.y=a.y):s.defaultAnchor={x:a.x,y:a.y};try{s.updateUvs?.();}catch{}return s}function Wu(e,t,n,r){const{Texture:o,Rectangle:i}=r;for(const[a,s]of Object.entries(e.frames)){const c=s.frame,d=!!s.rotated,l=d?2:0,u=d?c.h:c.w,p=d?c.w:c.h,f=Yr(i,c.x,c.y,u,p),m=s.sourceSize||{w:c.w,h:c.h},g=Yr(i,0,0,m.w,m.h);let h=null;if(s.trimmed&&s.spriteSourceSize){const v=s.spriteSourceSize;h=Yr(i,v.x,v.y,v.w,v.h);}n.set(a,Gu(o,t,f,g,h,l,s.anchor||null));}}function Hu(e,t,n){if(!(!e.animations||typeof e.animations!="object"))for(const[r,o]of Object.entries(e.animations)){if(!Array.isArray(o))continue;const i=o.map(a=>t.get(a)).filter(Boolean);i.length>=2&&n.set(r,i);}}function Uu(e,t){const n=(r,o)=>{const i=String(r||"").trim(),a=String(o||"").trim();!i||!a||(t.has(i)||t.set(i,new Set),t.get(i).add(a));};for(const r of Object.keys(e.frames||{})){const o=/^sprite\/([^/]+)\/(.+)$/.exec(r);o&&n(o[1],o[2]);}}async function Vu(e,t){const n=await ct.load({baseUrl:e}),r=ct.getBundle(n,"default");if(!r)throw new Error("No default bundle in manifest");const o=ct.listJsonFromBundle(r),i=new Set,a=new Map,s=new Map,c=new Map;async function d(l){if(i.has(l))return;i.add(l);const u=await si(it(e,l));if(!zu(u))return;const p=u.meta?.related_multi_packs;if(Array.isArray(p))for(const h of p)await d(Yi(l,h));const f=Yi(l,u.meta.image),m=await mu(await hs(it(e,f))),g=t.Texture.from(m);Wu(u,g,a,t),Hu(u,a,s),Uu(u,c);}for(const l of o)await d(l);return {textures:a,animations:s,categoryIndex:c}}let jn=null;async function Ku(){return we.ready?true:jn||(jn=(async()=>{const e=performance.now();ft("init start");const t=await Vi(He.appReady,15e3,"PIXI app");ft("app ready");const n=await Vi(He.rendererReady,15e3,"PIXI renderer");ft("renderer ready"),we.app=t,we.renderer=n||t?.renderer||null,we.ctors=await Ou(t),ft("constructors resolved"),we.baseUrl=await Ut.base(),ft("base url",we.baseUrl);const{textures:r,animations:o,categoryIndex:i}=await Vu(we.baseUrl,we.ctors);return we.textures=r,we.animations=o,we.categoryIndex=i,ft("atlases loaded","textures",we.textures.size,"animations",we.animations.size,"categories",we.categoryIndex?.size??0),we.ready=true,ft("ready in",Math.round(performance.now()-e),"ms"),true})(),jn)}const Wt={Gold:{overlayTall:null,tallIconOverride:null},Rainbow:{overlayTall:null,tallIconOverride:null,angle:130,angleTall:0},Wet:{overlayTall:"sprite/mutation-overlay/WetTallPlant",tallIconOverride:"sprite/mutation/Puddle"},Chilled:{overlayTall:"sprite/mutation-overlay/ChilledTallPlant",tallIconOverride:null},Frozen:{overlayTall:"sprite/mutation-overlay/FrozenTallPlant",tallIconOverride:null},Dawnlit:{overlayTall:null,tallIconOverride:null},Ambershine:{overlayTall:null,tallIconOverride:null},Dawncharged:{overlayTall:null,tallIconOverride:null},Ambercharged:{overlayTall:null,tallIconOverride:null}},As=Object.keys(Wt),Yu=["Gold","Rainbow","Wet","Chilled","Frozen","Ambershine","Dawnlit","Dawncharged","Ambercharged"],qi=new Map(Yu.map((e,t)=>[e,t]));function xr(e){return [...new Set(e.filter(Boolean))].sort((n,r)=>(qi.get(n)??1/0)-(qi.get(r)??1/0))}const qu=["Wet","Chilled","Frozen"],Xu=new Set(["Dawnlit","Ambershine","Dawncharged","Ambercharged"]),Ju={Banana:.6,Carrot:.6,Sunflower:.5,Starweaver:.5,FavaBean:.25,BurrosTail:.2},Qu={Pepper:.5,Banana:.6},Zu=256,ep=.5,tp=2;function Ts(e){if(!e.length)return {muts:[],overlayMuts:[],selectedMuts:[],sig:""};const t=xr(e),n=np(e),r=rp(e);return {muts:n,overlayMuts:r,selectedMuts:t,sig:`${t.join(",")}|${n.join(",")}|${r.join(",")}`}}function np(e){const t=e.filter((o,i,a)=>Wt[o]&&a.indexOf(o)===i);if(!t.length)return [];if(t.includes("Gold"))return ["Gold"];if(t.includes("Rainbow"))return ["Rainbow"];const n=["Ambershine","Dawnlit","Dawncharged","Ambercharged"];return t.some(o=>n.includes(o))?xr(t.filter(o=>!qu.includes(o))):xr(t)}function rp(e){const t=e.filter((n,r,o)=>Wt[n]?.overlayTall&&o.indexOf(n)===r);return xr(t)}function qr(e,t){return e.map(n=>({name:n,meta:Wt[n],overlayTall:Wt[n]?.overlayTall??null,isTall:t}))}const op={Gold:{op:"source-atop",colors:["rgb(235,200,0)"],a:.7},Rainbow:{op:"color",colors:["#FF1744","#FF9100","#FFEA00","#00E676","#2979FF","#D500F9"],ang:130,angTall:0,masked:true},Wet:{op:"source-atop",colors:["rgb(50,180,200)"],a:.25},Chilled:{op:"source-atop",colors:["rgb(100,160,210)"],a:.45},Frozen:{op:"source-atop",colors:["rgb(100,130,220)"],a:.5},Dawnlit:{op:"source-atop",colors:["rgb(209,70,231)"],a:.5},Ambershine:{op:"source-atop",colors:["rgb(190,100,40)"],a:.5},Dawncharged:{op:"source-atop",colors:["rgb(140,80,200)"],a:.5},Ambercharged:{op:"source-atop",colors:["rgb(170,60,25)"],a:.5}},Bn=(()=>{try{const t=document.createElement("canvas").getContext("2d");if(!t)return new Set;const n=["color","hue","saturation","luminosity","overlay","screen","lighter","source-atop"],r=new Set;for(const o of n)t.globalCompositeOperation=o,t.globalCompositeOperation===o&&r.add(o);return r}catch{return new Set}})();function ip(e){return Bn.has(e)?e:Bn.has("overlay")?"overlay":Bn.has("screen")?"screen":Bn.has("lighter")?"lighter":"source-atop"}function ap(e,t,n,r,o=false){const i=(r-90)*Math.PI/180,a=t/2,s=n/2;if(!o){const u=Math.min(t,n)/2;return e.createLinearGradient(a-Math.cos(i)*u,s-Math.sin(i)*u,a+Math.cos(i)*u,s+Math.sin(i)*u)}const c=Math.cos(i),d=Math.sin(i),l=Math.abs(c)*t/2+Math.abs(d)*n/2;return e.createLinearGradient(a-c*l,s-d*l,a+c*l,s+d*l)}function Xi(e,t,n,r,o=false){const i=r.colors?.length?r.colors:["#fff"],a=r.ang!=null?ap(e,t,n,r.ang,o):e.createLinearGradient(0,0,0,n);i.length===1?(a.addColorStop(0,i[0]),a.addColorStop(1,i[0])):i.forEach((s,c)=>a.addColorStop(c/(i.length-1),s)),e.fillStyle=a,e.fillRect(0,0,t,n);}function sp(e,t,n,r){const o=op[n];if(!o)return;const i={...o};n==="Rainbow"&&r&&i.angTall!=null&&(i.ang=i.angTall);const a=n==="Rainbow"&&r,s=t.width,c=t.height;e.save();const d=i.masked?ip(i.op):"source-in";if(e.globalCompositeOperation=d,i.a!=null&&(e.globalAlpha=i.a),i.masked){const l=document.createElement("canvas");l.width=s,l.height=c;const u=l.getContext("2d");u.imageSmoothingEnabled=false,Xi(u,s,c,i,a),u.globalCompositeOperation="destination-in",u.drawImage(t,0,0),e.drawImage(l,0,0);}else Xi(e,s,c,i,a);e.restore();}function lp(e){return /tallplant/i.test(e)}function pi(e){const t=String(e||"").split("/");return t[t.length-1]||""}function Is(e){switch(e){case "Ambershine":return ["Ambershine","Amberlit"];case "Dawncharged":return ["Dawncharged","Dawnbound"];case "Ambercharged":return ["Ambercharged","Amberbound"];default:return [e]}}function cp(e,t){const n=String(e||"").toLowerCase();for(const r of t.keys()){const o=/sprite\/mutation-overlay\/([A-Za-z0-9]+)TallPlant/i.exec(String(r));if(!o||!o[1])continue;if(o[1].toLowerCase()===n){const a=t.get(r);if(a)return {tex:a,key:r}}}return null}function dp(e,t,n,r){if(!t)return null;const o=pi(e),i=Is(t);for(const a of i){const s=[`sprite/mutation/${a}${o}`,`sprite/mutation/${a}-${o}`,`sprite/mutation/${a}_${o}`,`sprite/mutation/${a}/${o}`,`sprite/mutation/${a}`];for(const c of s){const d=n.get(c);if(d)return {tex:d,key:c}}{const c=`sprite/mutation-overlay/${a}TallPlant`,d=n.get(c);if(d)return {tex:d,key:c};const l=`sprite/mutation-overlay/${a}`,u=n.get(l);if(u)return {tex:u,key:l};const p=cp(t,n);if(p)return p}}return null}function up(e,t,n,r){if(!t)return null;const o=Wt[t];if(n&&o?.tallIconOverride){const s=r.get(o.tallIconOverride);if(s)return s}const i=pi(e),a=Is(t);for(const s of a){const c=[`sprite/mutation/${s}Icon`,`sprite/mutation/${s}`,`sprite/mutation/${s}${i}`,`sprite/mutation/${s}-${i}`,`sprite/mutation/${s}_${i}`,`sprite/mutation/${s}/${i}`];for(const d of c){const l=r.get(d);if(l)return l}if(n){const d=`sprite/mutation-overlay/${s}TallPlantIcon`,l=r.get(d);if(l)return l;const u=`sprite/mutation-overlay/${s}TallPlant`,p=r.get(u);if(p)return p}}return null}function pp(e,t,n){const r=e?.orig?.width??e?.frame?.width??e?.width??1,o=e?.orig?.height??e?.frame?.height??e?.height??1,i=e?.defaultAnchor?.x??0,a=e?.defaultAnchor?.y??0;let s=Qu[t]??i;const c=o>r*1.5;let d=Ju[t]??(c?a:.4);const l={x:(s-i)*r,y:(d-a)*o},u=Math.min(r,o),p=Math.min(1.5,u/Zu);let f=ep*p;return n&&(f*=tp),{width:r,height:o,anchorX:i,anchorY:a,offset:l,iconScale:f}}function Ps(e,t){return `${t.sig}::${e}`}function Es(e){return e?e.isAnim?e.frames?.length||0:e.tex?1:0:0}function fp(e,t,n){e.lru.delete(t),e.lru.set(t,n);}function mp(e,t){if(t.enabled)for(;e.lru.size>t.maxEntries||e.cost>t.maxCost;){const n=e.lru.keys().next().value;if(n===void 0)break;const r=e.lru.get(n);e.lru.delete(n),e.cost=Math.max(0,e.cost-Es(r??null));}}function Ms(e,t){const n=e.lru.get(t);return n?(fp(e,t,n),n):null}function Ls(e,t,n,r){e.lru.set(t,n),e.cost+=Es(n),mp(e,r);}function gp(e){e.lru.clear(),e.cost=0,e.srcCanvas.clear();}function hp(e,t){return e.srcCanvas.get(t)??null}function bp(e,t,n,r){if(e.srcCanvas.set(t,n),e.srcCanvas.size>r.srcCanvasMax){const o=e.srcCanvas.keys().next().value;o!==void 0&&e.srcCanvas.delete(o);}}function Lr(e,t,n,r,o){const i=hp(r,e);if(i)return i;let a=null;const s=t?.resolution??1;try{if(t?.extract?.canvas){const c=new n.Sprite(e),d=t.extract.canvas(c);if(c.destroy?.({children:!0,texture:!1,baseTexture:!1}),s>1&&d){const l=Math.round(d.width/s),u=Math.round(d.height/s);a=document.createElement("canvas"),a.width=l,a.height=u;const p=a.getContext("2d");p&&(p.imageSmoothingEnabled=!1,p.drawImage(d,0,0,l,u));}else a=d;}}catch{}if(!a){const c=e?.frame||e?._frame,d=e?.orig||e?._orig,l=e?.trim||e?._trim,u=e?.rotate||e?._rotate||0,p=e?.baseTexture?.resource?.source||e?.baseTexture?.resource||e?.source?.resource?.source||e?.source?.resource||e?._source?.resource?.source||null;if(!c||!p)throw new Error("textureToCanvas fail");a=document.createElement("canvas");const f=Math.max(1,(d?.width??c.width)|0),m=Math.max(1,(d?.height??c.height)|0),g=l?.x??0,h=l?.y??0;a.width=f,a.height=m;const v=a.getContext("2d");v.imageSmoothingEnabled=false,u===true||u===2||u===8?(v.save(),v.translate(g+c.height/2,h+c.width/2),v.rotate(-Math.PI/2),v.drawImage(p,c.x,c.y,c.width,c.height,-c.width/2,-c.height/2,c.width,c.height),v.restore()):v.drawImage(p,c.x,c.y,c.width,c.height,g,h,c.width,c.height);}return bp(r,e,a,o),a}function yp(e,t,n,r,o,i,a,s){const{w:c,h:d,aX:l,aY:u,basePos:p}=t,f=[];for(const m of n){const g=new r.Sprite(e);g.anchor?.set?.(l,u),g.position.set(p.x,p.y),g.zIndex=1;const h=document.createElement("canvas");h.width=c,h.height=d;const v=h.getContext("2d");v.imageSmoothingEnabled=false,v.save(),v.translate(c*l,d*u),v.drawImage(Lr(e,o,r,i,a),-c*l,-d*u),v.restore(),sp(v,h,m.name,m.isTall);const k=r.Texture.from(h,{resolution:e.resolution??1});s.push(k),g.texture=k,f.push(g);}return f}function vp(e,t,n,r,o,i,a,s,c,d){const{aX:l,basePos:u}=t,p=[];for(const f of n){const m=f.overlayTall&&r.get(f.overlayTall)&&{tex:r.get(f.overlayTall),key:f.overlayTall}||dp(e,f.name,r);if(!m?.tex)continue;const g=Lr(m.tex,i,o,a,s);if(!g)continue;const h=g.width,v={x:0,y:0},k={x:u.x-l*h,y:0},w=document.createElement("canvas");w.width=h,w.height=g.height;const x=w.getContext("2d");if(!x)continue;x.imageSmoothingEnabled=false,x.drawImage(g,0,0),x.globalCompositeOperation="destination-in",x.drawImage(c,-k.x,-0);const T=o.Texture.from(w,{resolution:m.tex.resolution??1});d.push(T);const y=new o.Sprite(T);y.anchor?.set?.(v.x,v.y),y.position.set(k.x,k.y),y.scale.set(1),y.alpha=1,y.zIndex=3,p.push(y);}return p}function xp(e,t,n,r,o,i){const{basePos:a}=t,s=[];for(const c of n){if(c.name==="Gold"||c.name==="Rainbow")continue;const d=up(e,c.name,c.isTall,r);if(!d)continue;const l=new o.Sprite(d),u=d?.defaultAnchor?.x??.5,p=d?.defaultAnchor?.y??.5;l.anchor?.set?.(u,p),l.position.set(a.x+i.offset.x,a.y+i.offset.y),l.scale.set(i.iconScale),c.isTall&&(l.zIndex=-1),Xu.has(c.name)&&(l.zIndex=10),l.zIndex||(l.zIndex=2),s.push(l);}return s}function _s(e,t,n,r){try{if(!e||!r.renderer||!r.ctors?.Container||!r.ctors?.Sprite||!r.ctors?.Texture)return null;const{Container:o,Sprite:i,Texture:a}=r.ctors,s=e?.orig?.width??e?.frame?.width??e?.width??1,c=e?.orig?.height??e?.frame?.height??e?.height??1,d=e?.defaultAnchor?.x??.5,l=e?.defaultAnchor?.y??.5,u={x:s*d,y:c*l},p=Lr(e,r.renderer,r.ctors,r.cacheState,r.cacheConfig),f=new o;f.sortableChildren=!0;const m=new i(e);m.anchor?.set?.(d,l),m.position.set(u.x,u.y),m.zIndex=0,f.addChild(m);const g=lp(t),h=qr(n.muts,g),v=qr(n.overlayMuts,g),k=qr(n.selectedMuts,g),w=[],x={w:s,h:c,aX:d,aY:l,basePos:u},T=pi(t),y=pp(e,T,g);yp(e,x,h,r.ctors,r.renderer,r.cacheState,r.cacheConfig,w).forEach(B=>f.addChild(B)),g&&vp(t,x,v,r.textures,r.ctors,r.renderer,r.cacheState,r.cacheConfig,p,w).forEach(X=>f.addChild(X)),xp(t,x,k,r.textures,r.ctors,y).forEach(B=>f.addChild(B));let S={x:0,y:0,width:s,height:c};try{const B=f.getLocalBounds?.()||f.getBounds?.(!0);B&&Number.isFinite(B.width)&&Number.isFinite(B.height)&&(S={x:B.x,y:B.y,width:B.width,height:B.height});}catch{}const{Rectangle:P}=r.ctors,E=P?new P(0,0,s,c):void 0;let R=null;if(typeof r.renderer.generateTexture=="function"?R=r.renderer.generateTexture(f,{resolution:1,region:E}):r.renderer.textureGenerator?.generateTexture&&(R=r.renderer.textureGenerator.generateTexture({target:f,resolution:1,region:E})),!R)throw new Error("no render texture");const ee=R instanceof a?R:a.from(r.renderer.extract.canvas(R));try{ee.__mg_base={baseX:-S.x,baseY:-S.y,baseW:s,baseH:c,texW:S.width,texH:S.height};}catch{}R&&R!==ee&&R.destroy?.(!0),f.destroy({children:!0,texture:!1,baseTexture:!1});try{ee.__mg_gen=!0,ee.label=`${t}|${n.sig}`;}catch{}return ee}catch{return null}}function wp(e,t,n,r){if(!e||e.length<2)return null;const o=[];for(const i of e){const a=_s(i,t,n,r);a&&o.push(a);}return o.length>=2?o:null}function Fs(e,t,n,r,o){const i=t.scale??1,a=t.frameIndex??0,s=t.mutations?.slice().sort().join(",")||"",c=t.anchorX??.5,d=t.anchorY??.5;return `${e}|s${i}|f${a}|m${s}|ax${c}|ay${d}|bm${n}|bp${o}|p${r}`}function kp(e,t){const n=e.cache.get(t);return n?(n.lastAccess=performance.now(),n.canvas):null}function Sp(e,t,n,r){if(t.enabled){if(e.cache.size>=t.maxEntries){let o=null,i=1/0;for(const[a,s]of e.cache)s.lastAccess<i&&(i=s.lastAccess,o=a);o&&e.cache.delete(o);}e.cache.set(n,{canvas:r,lastAccess:performance.now()});}}function Ji(e){const t=document.createElement("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");return n&&n.drawImage(e,0,0),t}function Cp(e){e.cache.clear();}function Ap(e){return {size:e.cache.size,maxEntries:e.maxEntries}}function Tp(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0);})}async function Ip(e,t,n,r,o,i,a,s=5,c=0){if(!t.ready||!i.enabled)return 0;const d=e.length;let l=0;a?.(0,d);for(let u=0;u<d;u+=s){const p=e.slice(u,u+s);for(const f of p)try{const m=kn(null,f,t.textures,t.animations),g={scale:1},h=Rs(g),v=Ns(h,g),k=$s(h,g.boundsPadding),w=Fs(m,g,h,v,k);o.cache.has(w)||Co(t,n,r,null,f,g,o,i),l++;}catch{l++;}a?.(l,d),u+s<d&&await Tp();}return l}function Pp(e){if(e.overlay)return e.overlay;const t=new e.ctors.Container;t.sortableChildren=true,t.zIndex=99999999;try{e.app.stage.sortableChildren=!0;}catch{}return e.app.stage.addChild(t),e.overlay=t,t}function Ep(e){const t=e.defaultParent;if(!t)return null;try{return typeof t=="function"?t():t}catch{return null}}function fi(e,t,n,r,o,i){if(!n.length)return t;const a=Ts(n);if(!a.sig)return t;const s=Ps(e,a),c=Ms(o,s);if(c?.tex)return c.tex;const d=_s(t,e,a,{renderer:r.renderer,ctors:r.ctors,textures:r.textures,cacheState:o,cacheConfig:i});return d?(Ls(o,s,{isAnim:false,tex:d},i),d):t}function Os(e,t,n,r,o,i){if(!n.length)return t;const a=Ts(n);if(!a.sig)return t;const s=Ps(e,a),c=Ms(o,s);if(c?.isAnim&&c.frames?.length)return c.frames;const d=wp(t,e,a,{renderer:r.renderer,ctors:r.ctors,textures:r.textures,cacheState:o,cacheConfig:i});return d?(Ls(o,s,{isAnim:true,frames:d},i),d):t}function Qi(e,t,n,r,o,i={}){if(!e.ready)throw new Error("MGSprite not ready yet");const a=kn(r,o,e.textures,e.animations),s=i.mutations||[],c=i.parent||Ep(e)||Pp(e),d=e.renderer?.width||e.renderer?.view?.width||innerWidth,l=e.renderer?.height||e.renderer?.view?.height||innerHeight,u=i.center?d/2:i.x??d/2,p=i.center?l/2:i.y??l/2;let f;const m=e.animations.get(a);if(m&&m.length>=2){const v=Os(a,m,s,e,t,n),k=e.ctors.AnimatedSprite;if(k)f=new k(v),f.animationSpeed=i.fps?i.fps/60:i.speed??.15,f.loop=i.loop??true,f.play();else {const w=new e.ctors.Sprite(v[0]),T=1e3/Math.max(1,i.fps||8);let y=0,C=0;const I=S=>{const P=e.app.ticker?.deltaMS??S*16.666666666666668;if(y+=P,y<T)return;const E=y/T|0;y%=T,C=(C+E)%v.length,w.texture=v[C];};w.__mgTick=I,e.app.ticker?.add?.(I),f=w;}}else {const v=e.textures.get(a);if(!v)throw new Error(`Unknown sprite/anim key: ${a}`);const k=fi(a,v,s,e,t,n);f=new e.ctors.Sprite(k);}const g=i.anchorX??f.texture?.defaultAnchor?.x??.5,h=i.anchorY??f.texture?.defaultAnchor?.y??.5;return f.anchor?.set?.(g,h),f.position.set(u,p),f.scale.set(i.scale??1),f.alpha=i.alpha??1,f.rotation=i.rotation??0,f.zIndex=i.zIndex??999999,c.addChild(f),e.live.add(f),f.__mgDestroy=()=>{try{f.__mgTick&&e.app.ticker?.remove?.(f.__mgTick);}catch{}try{f.destroy?.({children:!0,texture:!1,baseTexture:!1});}catch{try{f.destroy?.();}catch{}}e.live.delete(f);},f}function Mp(e,t){const n=e.renderer;if(n?.extract?.canvas)return n.extract.canvas(t);if(n?.plugins?.extract?.canvas)return n.plugins.extract.canvas(t);throw new Error("No extract.canvas available on renderer")}const Zi=new Map;function Rs(e){return e.boundsMode?e.boundsMode:e.mutations&&e.mutations.length>0?"base":"mutations"}function Ns(e,t){return e==="mutations"?t.pad??2:t.pad??0}function Jt(e){return Number.isFinite(e)?Math.max(0,e):0}function Ds(e){if(typeof e=="number"){const t=Jt(e);return {top:t,right:t,bottom:t,left:t}}return e?{top:Jt(e.top??0),right:Jt(e.right??0),bottom:Jt(e.bottom??0),left:Jt(e.left??0)}:{top:0,right:0,bottom:0,left:0}}function $s(e,t){if(e==="mutations")return "0,0,0,0";if(e==="padded"&&t==null)return "auto";const n=Ds(t);return `${n.top},${n.right},${n.bottom},${n.left}`}function js(e){const t=e?.orig?.width??e?.frame?.width??e?.width??1,n=e?.orig?.height??e?.frame?.height??e?.height??1;return {w:t,h:n}}function Bs(e,t,n){const r=e?.__mg_base;return r&&Number.isFinite(r.baseX)&&Number.isFinite(r.baseY)&&Number.isFinite(r.baseW)&&Number.isFinite(r.baseH)&&Number.isFinite(r.texW)&&Number.isFinite(r.texH)?r:{baseX:0,baseY:0,baseW:t,baseH:n,texW:t,texH:n}}function Lp(e,t,n,r,o,i){const a=`${e}|f${t}`,s=Zi.get(a);if(s)return s;const c=js(n),d={top:0,right:0,bottom:0,left:0};for(const l of As){const u=fi(e,n,[l],r,o,i),p=Bs(u,c.w,c.h),f=Math.max(0,p.baseX),m=Math.max(0,p.baseY),g=Math.max(0,p.texW-p.baseX-p.baseW),h=Math.max(0,p.texH-p.baseY-p.baseH);f>d.left&&(d.left=f),m>d.top&&(d.top=m),g>d.right&&(d.right=g),h>d.bottom&&(d.bottom=h);}return Zi.set(a,d),d}function Co(e,t,n,r,o,i={},a,s){if(!e.ready)throw new Error("MGSprite not ready yet");const c=kn(r,o,e.textures,e.animations),d=Rs(i),l=Ns(d,i),u=$s(d,i.boundsPadding),p=a&&s?.enabled?Fs(c,i,d,l,u):null;if(p&&a&&s?.enabled){const w=kp(a,p);if(w)return Ji(w)}const f=i.mutations||[],m=e.animations.get(c),g=Math.max(0,(i.frameIndex??0)|0);let h,v;if(m?.length)if(h=m[g%m.length],f.length){const w=Os(c,m,f,e,t,n);v=w[g%w.length];}else v=h;else {const w=e.textures.get(c);if(!w)throw new Error(`Unknown sprite/anim key: ${c}`);h=w,v=fi(c,w,f,e,t,n);}let k;if(d==="mutations"){const w=new e.ctors.Sprite(v),x=i.anchorX??w.texture?.defaultAnchor?.x??.5,T=i.anchorY??w.texture?.defaultAnchor?.y??.5;w.anchor?.set?.(x,T),w.scale.set(i.scale??1);const y=new e.ctors.Container;y.addChild(w);try{y.updateTransform?.();}catch{}const C=w.getBounds?.(true)||{x:0,y:0,width:w.width,height:w.height};w.position.set(-C.x+l,-C.y+l),k=Mp(e,y);try{y.destroy?.({children:!0});}catch{}}else {const w=i.scale??1;let x=Ds(i.boundsPadding);d==="padded"&&i.boundsPadding==null&&(x=Lp(c,g,h,e,t,n)),l&&(x={top:x.top+l,right:x.right+l,bottom:x.bottom+l,left:x.left+l});const T=js(h),y=Bs(v,T.w,T.h),C=Math.max(1,Math.ceil((T.w+x.left+x.right)*w)),I=Math.max(1,Math.ceil((T.h+x.top+x.bottom)*w));k=document.createElement("canvas"),k.width=C,k.height=I;const S=k.getContext("2d");if(S){S.imageSmoothingEnabled=false;const P=Lr(v,e.renderer,e.ctors,t,n),E=(x.left-y.baseX)*w,R=(x.top-y.baseY)*w;S.drawImage(P,E,R,P.width*w,P.height*w);}}return p&&a&&s?.enabled?(Sp(a,s,p,k),Ji(k)):k}function _p(e){for(const t of Array.from(e.live))t.__mgDestroy?.();}function Fp(e,t){return e.defaultParent=t,true}function Op(e,t){return e.defaultParent=t,true}function Et(){if(!ds())throw new Error("MGSprite not ready yet")}function Rp(e,t,n){return typeof t=="string"?Qi(Ie(),Gt(),xn(),e,t,n||{}):Qi(Ie(),Gt(),xn(),null,e,t||{})}function Np(e,t,n){return typeof t=="string"?Co(Ie(),Gt(),xn(),e,t,n||{},wn(),ko()):Co(Ie(),Gt(),xn(),null,e,t||{},wn(),ko())}function Dp(){_p(Ie());}function $p(e){return Fp(Ie(),e)}function jp(e){return Op(Ie(),e)}function Bp(e,t){const n=Ie(),r=typeof t=="string"?kn(e,t,n.textures,n.animations):kn(null,e,n.textures,n.animations);return n.textures.has(r)||n.animations.has(r)}function zp(){Et();const e=Ie().categoryIndex;return e?Array.from(e.keys()).sort((t,n)=>t.localeCompare(n)):[]}function Gp(e){Et();const t=String(e||"").trim();if(!t)return [];const n=Ie().categoryIndex;return n?Array.from(n.get(t)?.values()||[]):[]}function Wp(e,t){Et();const n=String(e||"").trim(),r=String(t||"").trim();if(!n||!r)return  false;const o=Ie().categoryIndex;if(!o)return  false;const i=n.toLowerCase(),a=r.toLowerCase();for(const[s,c]of o.entries())if(s.toLowerCase()===i){for(const d of c.values())if(d.toLowerCase()===a)return  true}return  false}function Hp(e){Et();const t=Ie().categoryIndex;if(!t)return [];const n=String(e||"").trim().toLowerCase(),r=[];for(const[o,i]of t.entries())for(const a of i.values()){const s=Tn(o,a);(!n||s.toLowerCase().startsWith(n))&&r.push(s);}return r.sort((o,i)=>o.localeCompare(i))}function Up(e){Et();const t=String(e||"").trim();if(!t)return null;const n=vr(t),r=/^sprite\/([^/]+)\/(.+)$/.exec(n);if(!r)return null;const o=r[1],i=r[2],a=Ie().categoryIndex,s=o.toLowerCase(),c=i.toLowerCase();let d=o,l=i;if(a){const u=Array.from(a.keys()).find(m=>m.toLowerCase()===s);if(!u)return null;d=u;const p=a.get(u);if(!p)return null;const f=Array.from(p.values()).find(m=>m.toLowerCase()===c);if(!f)return null;l=f;}return {category:d,id:l,key:Tn(d,l)}}function Vp(e,t){Et();const n=String(e||"").trim(),r=String(t||"").trim();if(!n||!r)throw new Error("getIdPath(category, id) requires both category and id");const o=Ie().categoryIndex;if(!o)throw new Error("Sprite categories not indexed");const i=n.toLowerCase(),a=r.toLowerCase(),s=Array.from(o.keys()).find(l=>l.toLowerCase()===i)||n,c=o.get(s);if(!c)throw new Error(`Unknown sprite category: ${n}`);const d=Array.from(c.values()).find(l=>l.toLowerCase()===a)||r;if(!c.has(d))throw new Error(`Unknown sprite id: ${n}/${r}`);return Tn(s,d)}function Kp(){gp(Gt());}function Yp(){Cp(wn());}function qp(){return Ap(wn())}function Xp(){return [...As]}async function Jp(e,t,n=10,r=0){return Et(),Ip(e,Ie(),Gt(),xn(),wn(),ko(),t,n,r)}const ie={init:Ku,isReady:ds,show:Rp,toCanvas:Np,clear:Dp,attach:$p,attachProvider:jp,has:Bp,key:(e,t)=>Tn(e,t),getCategories:zp,getCategoryId:Gp,hasId:Wp,listIds:Hp,getIdInfo:Up,getIdPath:Vp,clearMutationCache:Kp,clearToCanvasCache:Yp,getToCanvasCacheStats:qp,getMutationNames:Xp,warmup:Jp},Qp=L,Ue=Qp.Object??Object,_r=Ue.keys,wr=Ue.values,kr=Ue.entries,ea=new WeakSet;function Zp(){return {data:{items:null,decor:null,mutations:null,eggs:null,pets:null,abilities:null,plants:null,weather:null},isHookInstalled:false,scanInterval:null,scanAttempts:0,weatherPollingTimer:null,weatherPollAttempts:0}}const ne=Zp(),mt={items:["WateringCan","PlanterPot","Shovel"],decor:["SmallRock","MediumRock","LargeRock","WoodBench","StoneBench","MarbleBench"],mutations:["Gold","Rainbow","Wet","Chilled","Frozen"],eggs:["CommonEgg","UncommonEgg","RareEgg"],pets:["Worm","Snail","Bee","Chicken","Bunny"],abilities:["ProduceScaleBoost","DoubleHarvest","SeedFinderI","CoinFinderI"],plants:["Carrot","Strawberry","Aloe","Blueberry","Apple"]},ef=["Rain","Frost","Dawn","AmberMoon"],ta=/main-[^/]+\.js(\?|$)/,tf=6,nf=150,rf=2e3,of=200,af=50,gt=(e,t)=>t.every(n=>e.includes(n));function ht(e,t){ne.data[e]==null&&(ne.data[e]=t,Sr()&&Ws());}function Sr(){return Object.values(ne.data).every(e=>e!=null)}function zs(e,t){if(!e||typeof e!="object"||ea.has(e))return;ea.add(e);let n;try{n=_r(e);}catch{return}if(!n||n.length===0)return;const r=e;let o;if(!ne.data.items&&gt(n,mt.items)&&(o=r.WateringCan,o&&typeof o=="object"&&"coinPrice"in o&&"creditPrice"in o&&ht("items",r)),!ne.data.decor&&gt(n,mt.decor)&&(o=r.SmallRock,o&&typeof o=="object"&&"coinPrice"in o&&"creditPrice"in o&&ht("decor",r)),!ne.data.mutations&&gt(n,mt.mutations)&&(o=r.Gold,o&&typeof o=="object"&&"baseChance"in o&&"coinMultiplier"in o&&ht("mutations",r)),!ne.data.eggs&&gt(n,mt.eggs)&&(o=r.CommonEgg,o&&typeof o=="object"&&"faunaSpawnWeights"in o&&"secondsToHatch"in o&&ht("eggs",r)),!ne.data.pets&&gt(n,mt.pets)&&(o=r.Worm,o&&typeof o=="object"&&"coinsToFullyReplenishHunger"in o&&"diet"in o&&Array.isArray(o.diet)&&ht("pets",r)),!ne.data.abilities&&gt(n,mt.abilities)&&(o=r.ProduceScaleBoost,o&&typeof o=="object"&&"trigger"in o&&"baseParameters"in o&&ht("abilities",r)),!ne.data.plants&&gt(n,mt.plants)&&(o=r.Carrot,o&&typeof o=="object"&&"seed"in o&&"plant"in o&&"crop"in o&&ht("plants",r)),!(t>=tf))for(const i of n){let a;try{a=r[i];}catch{continue}a&&typeof a=="object"&&zs(a,t+1);}}function cr(e){try{zs(e,0);}catch{}}function Gs(){if(!ne.isHookInstalled){if(Ue.__MG_HOOKED__){ne.isHookInstalled=true;return}Ue.__MG_HOOKED__=true,ne.isHookInstalled=true;try{Ue.keys=function(t){return cr(t),_r.apply(this,arguments)},wr&&(Ue.values=function(t){return cr(t),wr.apply(this,arguments)}),kr&&(Ue.entries=function(t){return cr(t),kr.apply(this,arguments)});}catch{}}}function Ws(){if(ne.isHookInstalled){try{Ue.keys=_r,wr&&(Ue.values=wr),kr&&(Ue.entries=kr);}catch{}ne.isHookInstalled=false;}}function sf(){if(ne.scanInterval||Sr())return;const e=()=>{if(Sr()||ne.scanAttempts>nf){Hs();return}ne.scanAttempts++;try{_r(L).forEach(t=>{try{cr(L[t]);}catch{}});}catch{}};e(),ne.scanInterval=setInterval(e,rf);}function Hs(){ne.scanInterval&&(clearInterval(ne.scanInterval),ne.scanInterval=null);}const na=L;function lf(){try{for(const e of na.document?.scripts||[]){const t=e?.src?String(e.src):"";if(ta.test(t))return t}}catch{}try{for(const e of na.performance?.getEntriesByType?.("resource")||[]){const t=e?.name?String(e.name):"";if(ta.test(t))return t}}catch{}return null}function cf(e,t){const n=Math.max(e.lastIndexOf("const ",t),e.lastIndexOf("let ",t),e.lastIndexOf("var ",t));if(n<0)return null;const r=e.indexOf("=",n);if(r<0||r>t)return null;const o=e.indexOf("{",r);if(o<0||o>t)return null;let i=0,a="",s=false;for(let c=o;c<e.length;c++){const d=e[c];if(a){if(s){s=false;continue}if(d==="\\"){s=true;continue}d===a&&(a="");continue}if(d==='"'||d==="'"){a=d;continue}if(d==="{")i++;else if(d==="}"&&--i===0)return e.slice(o,c+1)}return null}function df(e){const t={};let n=false;for(const r of ef){const o=e?.[r];if(!o||typeof o!="object")continue;const i=o.iconSpriteKey||null,{iconSpriteKey:a,...s}=o;t[r]={weatherId:r,spriteId:i,...s},n=true;}return t.Sunny||(t.Sunny={weatherId:"Sunny",name:"Sunny",spriteId:"sprite/ui/SunnyIcon",type:"primary"}),!n||t.Rain&&t.Rain.mutator?.mutation!=="Wet"?null:t}async function uf(){if(ne.data.weather)return  true;const e=lf();if(!e)return  false;let t="";try{const s=await fetch(e,{credentials:"include"});if(!s.ok)return !1;t=await s.text();}catch{return  false}let n=t.indexOf("fixedTimeSlots:[0,48,96,144,192,240]");if(n<0&&(n=t.indexOf('name:"Amber Moon"')),n<0)return  false;const r=cf(t,n);if(!r)return  false;const o=r.replace(/\b[A-Za-z_$][\w$]*\.(Rain|Frost|Dawn|AmberMoon)\b/g,'"$1"');let i;try{i=Function('"use strict";return('+o+")")();}catch{return  false}const a=df(i);return a?(ne.data.weather=a,true):false}function pf(){if(ne.weatherPollingTimer)return;ne.weatherPollAttempts=0;const e=setInterval(async()=>{(await uf()||++ne.weatherPollAttempts>of)&&(clearInterval(e),ne.weatherPollingTimer=null);},af);ne.weatherPollingTimer=e;}function ff(){ne.weatherPollingTimer&&(clearInterval(ne.weatherPollingTimer),ne.weatherPollingTimer=null);}function mf(e){return String(e||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^A-Za-z0-9]/g,"").trim()}function gf(e,t=[]){const n=new Set,r=o=>{const i=String(o||"").trim();i&&n.add(i);};r(e);for(const o of t)r(o);for(const o of Array.from(n.values()))o.endsWith("s")?r(o.slice(0,-1)):r(`${o}s`),o.endsWith("es")&&r(o.slice(0,-2));return Array.from(n.values()).filter(Boolean)}function Us(e,t,n,r=[],o=[]){const i=window.Gemini?.Modules?.Sprite;if(!i)return null;const a=gf(e,r);if(!a.length)return null;const s=[t,...o].filter(u=>typeof u=="string"),c=u=>{const p=String(u||"").trim();if(!p)return null;for(const f of a)try{if(i.has(f,p))return i.getIdPath(f,p)}catch{}return null};for(const u of s){const p=c(u);if(p)return p}const d=mf(n||""),l=c(d||n||"");if(l)return l;try{for(const u of a){const p=i.listIds(`sprite/${u}/`),f=s.map(g=>String(g||"").toLowerCase()),m=String(n||d||"").toLowerCase();for(const g of p){const v=(g.split("/").pop()||"").toLowerCase();if(f.some(k=>k&&k===v)||v===m)return g}for(const g of p){const v=(g.split("/").pop()||"").toLowerCase();if(f.some(k=>k&&v.includes(k))||m&&v.includes(m))return g}}}catch{}return null}function Fe(e,t,n,r,o=[],i=[]){if(!e||typeof e!="object")return;const a=e.tileRef;if(!a||typeof a!="object")return;const s=String(a.spritesheet||t||"").trim(),c=Us(s,n,r,o,i);if(c)try{e.spriteId=c;}catch{}const d=e.rotationVariants;if(d&&typeof d=="object")for(const l of Object.values(d))Fe(l,s,n,r);if(e.immatureTileRef){const l={tileRef:e.immatureTileRef};Fe(l,s,n,r),l.spriteId&&(e.immatureSpriteId=l.spriteId);}if(e.topmostLayerTileRef){const l={tileRef:e.topmostLayerTileRef};Fe(l,s,n,r),l.spriteId&&(e.topmostLayerSpriteId=l.spriteId);}e.activeState&&typeof e.activeState=="object"&&Fe(e.activeState,s,n,e.activeState?.name||r);}function hf(e,t,n,r=[]){if(!Array.isArray(t)||t.length===0)return null;const o=t[0],i=t.slice(1);return Us(e,o,n??null,r,i)}function bf(e){for(const[t,n]of Object.entries(e.items||{}))Fe(n,"items",t,n?.name,["item"]);for(const[t,n]of Object.entries(e.decor||{}))Fe(n,"decor",t,n?.name);for(const[t,n]of Object.entries(e.mutations||{})){Fe(n,"mutations",t,n?.name,["mutation"]);const r=hf("mutation-overlay",[`${t}TallPlant`,`${t}TallPlantIcon`,t],n?.name,["mutation-overlay"]);if(r)try{n.overlaySpriteId=r;}catch{}}for(const[t,n]of Object.entries(e.eggs||{}))Fe(n,"pets",t,n?.name,["pet"]);for(const[t,n]of Object.entries(e.pets||{}))Fe(n,"pets",t,n?.name,["pet"]);for(const[t,n]of Object.entries(e.plants||{})){const r=n;r.seed&&Fe(r.seed,r.seed?.tileRef?.spritesheet||"seeds",`${t}Seed`,r.seed?.name||`${t} Seed`,["seed","plant","plants"],[t]),r.plant&&Fe(r.plant,r.plant?.tileRef?.spritesheet||"plants",`${t}Plant`,r.plant?.name||`${t} Plant`,["plant","plants","tallplants"],[t]),r.crop&&Fe(r.crop,r.crop?.tileRef?.spritesheet||"plants",t,r.crop?.name||t,["plant","plants"],[`${t}Crop`]);}}function yf(){try{bf(ne.data);}catch(e){try{console.warn("[MGData] sprite resolution failed",e);}catch{}}}const Vs=1e4,Ks=50;function Ys(e){return new Promise(t=>setTimeout(t,e))}function vf(e){return ne.data[e]}function xf(){return {...ne.data}}function wf(e){return ne.data[e]!=null}async function kf(e,t=Vs,n=Ks){const r=Date.now();for(;Date.now()-r<t;){const o=ne.data[e];if(o!=null)return o;await Ys(n);}throw new Error(`MGData.waitFor: timeout waiting for "${e}"`)}async function Sf(e=Vs,t=Ks){const n=Date.now();for(;Date.now()-n<e;){if(Object.values(ne.data).some(r=>r!=null))return {...ne.data};await Ys(t);}throw new Error("MGData.waitForAnyData: timeout")}const de={async init(){Gs(),sf(),pf();},isReady:Sr,get:vf,getAll:xf,has:wf,waitFor:kf,waitForAny:Sf,resolveSprites:yf,cleanup(){Ws(),Hs(),ff();}},Cf={expanded:false,sort:{key:null,dir:null},search:""},Af={categories:{}};async function Tf(){const e=await Pr("tab-test",{version:2,defaults:Af,sanitize:i=>({categories:i.categories&&typeof i.categories=="object"?i.categories:{}})});function t(i){return e.get().categories[i]||{...Cf}}function n(i,a){const s=e.get(),c=t(i);e.update({categories:{...s.categories,[i]:{...c,expanded:a}}});}function r(i,a,s){const c=e.get(),d=t(i);e.update({categories:{...c.categories,[i]:{...d,sort:{key:a,dir:s}}}});}function o(i,a){const s=e.get(),c=t(i);e.update({categories:{...s.categories,[i]:{...c,search:a}}});}return {get:e.get,set:e.set,save:e.save,getCategoryState:t,setCategoryExpanded:n,setCategorySort:r,setCategorySearch:o}}const If={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function zn(e){return e?If[e]??0:0}class Pf extends Ht{constructor(){super({id:"tab-test",label:"Test"});W(this,"stateCtrl",null);}async build(n){this.stateCtrl=await Tf();const r=this.createContainer("test-section");r.style.display="flex",r.style.flexDirection="column",r.style.gap="12px",n.appendChild(r),await this.buildSpriteTables(r);}renderSprite(n){const r=b("div",{style:"display:flex;align-items:center;justify-content:center;width:32px;height:32px;"});if(n.spriteId){const o=n.spriteId;requestAnimationFrame(()=>{try{const i=ie.toCanvas(o,{scale:1});i.style.maxWidth="32px",i.style.maxHeight="32px",i.style.objectFit="contain",r.appendChild(i);}catch{r.textContent="-";}});}else r.textContent="-";return r}renderRarity(n){if(!n.rarity){const o=b("span",{style:"opacity:0.5;"});return o.textContent="—",o}return cs({variant:"rarity",rarity:n.rarity,size:"sm"}).root}createDataCard(n,r,o,i){const a=this.stateCtrl.getCategoryState(n),s=p=>{if(!p)return o;const f=p.toLowerCase();return o.filter(m=>m.name.toLowerCase().includes(f))},c=ls({columns:i,data:s(a.search),pageSize:0,compact:true,maxHeight:"calc(var(--lg-row-h, 40px) * 6)",getRowId:p=>p.spriteId,onSortChange:(p,f)=>{this.stateCtrl.setCategorySort(n,p,f);}});a.sort.key&&a.sort.dir&&c.sortBy(a.sort.key,a.sort.dir);const d=ii({placeholder:"Search...",value:a.search,debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:p=>{const f=p.trim();this.stateCtrl.setCategorySearch(n,f),c.setData(s(f));}}),l=b("div",{style:"margin-bottom:8px;"});l.appendChild(d.root);const u=b("div");return u.appendChild(l),u.appendChild(c.root),$e({title:r,subtitle:`${o.length} entries`,variant:"soft",padding:"sm",expandable:true,defaultExpanded:a.expanded,onExpandChange:p=>{this.stateCtrl.setCategoryExpanded(n,p);}},u)}formatCategoryName(n){return n.split("-").map(r=>r.charAt(0).toUpperCase()+r.slice(1)).join(" ")}findPlantBySprite(n,r){const o=de.get("plants");if(!o)return null;for(const a of Object.values(o))if(a?.seed?.spriteId===n||a?.plant?.spriteId===n||a?.crop?.spriteId===n)return a;const i=r.toLowerCase();for(const a of Object.values(o)){const s=(a?.seed?.name||"").toLowerCase();if(s===i||s===`${i} seed`)return a}return null}findPetBySpriteId(n){const r=de.get("pets");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}findItemBySpriteId(n){const r=de.get("items");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}findDecorBySpriteId(n){const r=de.get("decor");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}findEggBySpriteId(n){const r=de.get("eggs");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}getRarityForSprite(n,r,o){const i=n.toLowerCase();if(i==="plant"||i==="seed"||i==="tallplant"){const a=this.findPlantBySprite(r,o);if(a?.seed?.rarity)return a.seed.rarity}if(i==="pet"){const a=this.findPetBySpriteId(r);if(a?.rarity)return a.rarity}if(i==="item"){const a=this.findItemBySpriteId(r);if(a?.rarity)return a.rarity}if(i==="decor"){const a=this.findDecorBySpriteId(r);if(a?.rarity)return a.rarity}if(i==="egg"){const a=this.findEggBySpriteId(r);if(a?.rarity)return a.rarity}return null}yieldToMain(n=0){return new Promise(r=>{n>0?setTimeout(r,n):typeof requestIdleCallback<"u"?requestIdleCallback(()=>r(),{timeout:50}):setTimeout(r,4);})}async buildSpriteTables(n){const r=[{key:"name",header:"Name",sortable:true,width:"1fr",sortFn:(i,a)=>i.name.localeCompare(a.name,void 0,{numeric:true,sensitivity:"base"})},{key:"rarity",header:"Rarity",sortable:true,width:"100px",align:"center",render:i=>this.renderRarity(i),sortFn:(i,a)=>zn(i.rarity)-zn(a.rarity)},{key:"sprite",header:"Sprite",width:"60px",align:"center",render:i=>this.renderSprite(i)}];if(!ie.isReady())try{await ie.init();}catch{return}const o=ie.getCategories();for(let i=0;i<o.length;i++){await this.yieldToMain(8);const a=o[i],c=ie.getCategoryId(a).map(d=>{const l=`sprite/${a}/${d}`;return {name:d,spriteId:l,rarity:this.getRarityForSprite(a,l,d)}});if(c.sort((d,l)=>zn(d.rarity)-zn(l.rarity)),c.length>0){const d=this.createDataCard(a,this.formatCategoryName(a),c,r);n.appendChild(d);}}}}function wt(e,t,n){if(e.querySelector(`style[data-style-id="${n}"]`))return;const r=document.createElement("style");r.setAttribute("data-style-id",n),r.textContent=t,e.appendChild(r);}const qs=`
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
`,Ef={enabled:false,favoriteProduceList:[],favoritePetsList:[],favoriteMutations:[]};let vt=null;async function Mf(){if(vt)return vt;vt=await Pr("tab-auto-favorite",{version:1,defaults:Ef});const e=Te(Me.AUTO_FAVORITE_UI,null);return e&&(await vt.set(e),Gc(Me.AUTO_FAVORITE_UI),console.log("[AutoFavoriteSettings] Migrated old storage to new state")),vt}function Be(){if(!vt)throw new Error("[AutoFavoriteSettings] Section state not initialized. Call initSectionState() first.");return vt}const Lf=new Map;function _f(){return Lf}function Ao(){return L.jotaiAtomCache?.cache}function dt(e){const t=_f(),n=t.get(e);if(n)return n;const r=Ao();if(!r)return null;for(const o of r.values())if((o?.debugLabel||o?.label||"")===e)return t.set(e,o),o;return null}function Ff(){const e=L;if(e.__REACT_DEVTOOLS_GLOBAL_HOOK__)return;const t=new Map,n=new Map;e.__REACT_DEVTOOLS_GLOBAL_HOOK__={renderers:t,supportsFiber:true,inject:r=>{const o=t.size+1;return t.set(o,r),n.set(o,new Set),o},onCommitFiberRoot:(r,o)=>{const i=n.get(r);i&&i.add(o);},onCommitFiberUnmount:()=>{},onPostCommitFiberRoot:()=>{},getFiberRoots:r=>n.get(r),checkDCE:()=>{},isDisabled:false};}const Of={baseStore:null,captureInProgress:false,captureError:null,lastCapturedVia:null,mirror:void 0};function Vt(){return Of}const Rf="__JOTAI_STORE_READY__";let ra=false;const To=new Set;function Gn(){if(!ra){ra=true;for(const e of To)try{e();}catch{}try{const e=L.CustomEvent||CustomEvent;L.dispatchEvent?.(new e(Rf));}catch{}}}function Nf(e){To.add(e);const t=Po();if(t.via&&!t.polyfill)try{e();}catch{}return ()=>{To.delete(e);}}async function Df(e={}){const{timeoutMs:t=6e3,intervalMs:n=50}=e,r=Po();if(!(r.via&&!r.polyfill))return new Promise((o,i)=>{let a=false;const s=Nf(()=>{a||(a=true,s(),o());}),c=Date.now();(async()=>{for(;!a&&Date.now()-c<t;){const l=Po();if(l.via&&!l.polyfill){if(a)return;a=true,s(),o();return}await Sn(n);}a||(a=true,s(),i(new Error("Store not captured within timeout")));})();})}const Sn=e=>new Promise(t=>setTimeout(t,e));function Xs(){try{const e=L.Event||Event;L.dispatchEvent?.(new e("visibilitychange"));}catch{}}function Io(e){return e&&typeof e=="object"&&typeof e.get=="function"&&typeof e.set=="function"&&typeof e.sub=="function"}function Xr(e,t=0,n=new WeakSet){if(t>3||!e||typeof e!="object"||n.has(e))return null;try{n.add(e);}catch{return null}if(Io(e))return e;const r=["store","value","current","state","s","baseStore"];for(const o of r)try{const i=e[o];if(Io(i))return i}catch{}return null}function Js(){const e=Vt(),t=L.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t?.renderers?.size)return null;let n=0;for(const[r]of t.renderers){const o=t.getFiberRoots?.(r);o&&(n+=o.size||0);}if(n===0)return null;for(const[r]of t.renderers){const o=t.getFiberRoots?.(r);if(o)for(const i of o){const a=new Set,s=[i.current];for(;s.length;){const c=s.pop();if(!(!c||a.has(c))){a.add(c);try{const d=c?.pendingProps?.value;if(Io(d))return e.lastCapturedVia="fiber",d}catch{}try{let d=c?.memoizedState,l=0;for(;d&&l<15;){l++;const u=Xr(d);if(u)return e.lastCapturedVia="fiber",u;const p=Xr(d.memoizedState);if(p)return e.lastCapturedVia="fiber",p;d=d.next;}}catch{}try{if(c?.stateNode){const d=Xr(c.stateNode);if(d)return e.lastCapturedVia="fiber",d}}catch{}c.child&&s.push(c.child),c.sibling&&s.push(c.sibling),c.alternate&&s.push(c.alternate);}}}}return null}function Qs(){return {get:()=>{throw new Error("Store not captured: get unavailable")},set:()=>{throw new Error("Store not captured: set unavailable")},sub:()=>()=>{},__polyfill:true}}async function $f(e=5e3){const t=Date.now();let n=Ao();for(;!n&&Date.now()-t<e;)await Sn(100),n=Ao();if(!n)throw new Error("jotaiAtomCache.cache not found");const r=Vt();let o=null,i=null;const a=[],s=()=>{for(const d of a)try{d.__origWrite&&(d.write=d.__origWrite,delete d.__origWrite);}catch{}};for(const d of n.values()){if(!d||typeof d.write!="function"||d.__origWrite)continue;const l=d.write;d.__origWrite=l,d.write=function(u,p,...f){return i||(o=u,i=p,s()),l.call(this,u,p,...f)},a.push(d);}Xs();const c=Date.now();for(;!i&&Date.now()-c<e;)await Sn(50);return i?(r.lastCapturedVia="write",{get:d=>o(d),set:(d,l)=>i(d,l),sub:(d,l)=>{let u;try{u=o(d);}catch{}const p=setInterval(()=>{let f;try{f=o(d);}catch{return}if(f!==u){u=f;try{l();}catch{}}},100);return ()=>clearInterval(p)}}):(s(),r.lastCapturedVia="polyfill",Qs())}async function jf(e=1e4){const t=Vt();Xs();const n=Date.now();for(;Date.now()-n<e;){const r=Js();if(r)return r;await Sn(50);}return t.lastCapturedVia="polyfill",Qs()}async function mi(){const e=Vt();if(e.baseStore&&!e.baseStore.__polyfill)return Gn(),e.baseStore;if(e.captureInProgress){const t=Date.now(),n=2500;for(;!e.baseStore&&Date.now()-t<n;)await Sn(25);if(e.baseStore)return e.baseStore.__polyfill||Gn(),e.baseStore}e.captureInProgress=true;try{const t=Js();if(t)return e.baseStore=t,Gn(),t;try{const r=await $f(5e3);return e.baseStore=r,r.__polyfill||Gn(),r}catch(r){e.captureError=r;}const n=await jf();return e.baseStore=n,n}catch(t){throw e.captureError=t,t}finally{e.captureInProgress=false;}}function Po(){const e=Vt();return {via:e.lastCapturedVia,polyfill:!!e.baseStore?.__polyfill,error:e.captureError}}async function Bf(){const e=await mi(),t=new WeakMap,n=async o=>{let i=t.get(o);if(i)return i;i={last:void 0,has:false,subs:new Set},t.set(o,i);try{i.last=e.get(o),i.has=!0;}catch{}const a=e.sub(o,()=>{let s;try{s=e.get(o);}catch{return}const c=i.last,d=!Object.is(s,c)||!i.has;if(i.last=s,i.has=true,d)for(const l of i.subs)try{l(s,c);}catch{}});return i.unsubUpstream=a,i};return {async get(o){const i=await n(o);if(i.has)return i.last;const a=e.get(o);return i.last=a,i.has=true,a},async set(o,i){await e.set(o,i);const a=await n(o);a.last=i,a.has=true;},async sub(o,i){const a=await n(o);if(a.subs.add(i),a.has)try{i(a.last,a.last);}catch{}return ()=>{a.subs.delete(i);}},getShadow(o){return t.get(o)?.last},hasShadow(o){return !!t.get(o)?.has},async ensureWatch(o){await n(o);},async asStore(){return {get:o=>this.get(o),set:(o,i)=>this.set(o,i),sub:(o,i)=>{let a=null;return this.sub(o,()=>i()).then(s=>a=s),()=>a?.()}}}}}async function dr(){const e=Vt();return e.mirror||(e.mirror=await Bf()),e.mirror}const ce={async select(e){const t=await dr(),n=dt(e);if(!n)throw new Error(`[Store] Atom not found: "${e}"`);return t.get(n)},async set(e,t){const n=await dr(),r=dt(e);if(!r)throw new Error(`[Store] Atom not found: "${e}"`);await n.set(r,t);},async subscribe(e,t){const n=await dr(),r=dt(e);if(!r)throw new Error(`[Store] Atom not found: "${e}"`);return n.sub(r,o=>{try{t(o);}catch{}})},async subscribeImmediate(e,t){const n=await ce.select(e);try{t(n);}catch{}return ce.subscribe(e,t)}};async function zf(){await dr();}function gi(e){return e?Array.isArray(e)?e.slice():e.split(".").map(t=>t.match(/^\d+$/)?Number(t):t):[]}function Cn(e,t){const n=gi(t);let r=e;for(const o of n){if(r==null)return;r=r[o];}return r}function Gf(e,t,n){const r=gi(t);if(!r.length)return n;const o=Array.isArray(e)?[...e]:{...e??{}};let i=o;for(let a=0;a<r.length-1;a++){const s=r[a],c=i[s],d=typeof c=="object"&&c!==null?Array.isArray(c)?[...c]:{...c}:{};i[s]=d,i=d;}return i[r[r.length-1]]=n,o}function oa(e,t){const n={};for(const r of t)n[r]=r.includes(".")?Cn(e,r):e?.[r];try{return JSON.stringify(n)}catch{return String(n)}}function Wf(e,t,n){const r=n.mode??"auto";function o(d){const l=t?Cn(d,t):d,u=new Map;if(l==null)return {signatures:u,keys:[]};const p=Array.isArray(l);if((r==="array"||r==="auto"&&p)&&p)for(let m=0;m<l.length;m++){const g=l[m],h=n.key?n.key(g,m,d):m,v=n.sig?n.sig(g,m,d):n.fields?oa(g,n.fields):JSON.stringify(g);u.set(h,v);}else for(const[m,g]of Object.entries(l)){const h=n.key?n.key(g,m,d):m,v=n.sig?n.sig(g,m,d):n.fields?oa(g,n.fields):JSON.stringify(g);u.set(h,v);}return {signatures:u,keys:Array.from(u.keys())}}function i(d,l){if(d===l)return  true;if(!d||!l||d.size!==l.size)return  false;for(const[u,p]of d)if(l.get(u)!==p)return  false;return  true}async function a(d){let l=null;return ce.subscribeImmediate(e,u=>{const p=t?Cn(u,t):u,{signatures:f}=o(p);if(!i(l,f)){const m=new Set([...l?Array.from(l.keys()):[],...Array.from(f.keys())]),g=[];for(const h of m){const v=l?.get(h)??"__NONE__",k=f.get(h)??"__NONE__";v!==k&&g.push(h);}l=f,d({value:p,changedKeys:g});}})}async function s(d,l){return a(({value:u,changedKeys:p})=>{p.includes(d)&&l({value:u});})}async function c(d,l){const u=new Set(d);return a(({value:p,changedKeys:f})=>{const m=f.filter(g=>u.has(g));m.length&&l({value:p,changedKeys:m});})}return {sub:a,subKey:s,subKeys:c}}const Dt=new Map;function Hf(e,t){const n=Dt.get(e);if(n)try{n();}catch{}return Dt.set(e,t),()=>{try{t();}catch{}Dt.get(e)===t&&Dt.delete(e);}}function fe(e,t={}){const{path:n,write:r="replace"}=t,o=n?`${e}:${gi(n).join(".")}`:e;async function i(){const u=await ce.select(e);return n?Cn(u,n):u}async function a(u){if(typeof r=="function"){const m=await ce.select(e),g=r(u,m);return ce.set(e,g)}const p=await ce.select(e),f=n?Gf(p,n,u):u;return r==="merge-shallow"&&!n&&p&&typeof p=="object"&&typeof u=="object"?ce.set(e,{...p,...u}):ce.set(e,f)}async function s(u){const p=await i(),f=u(p);return await a(f),f}async function c(u,p,f){let m;const g=v=>{const k=n?Cn(v,n):v;if(typeof m>"u"||!f(m,k)){const w=m;m=k,p(k,w);}},h=u?await ce.subscribeImmediate(e,g):await ce.subscribe(e,g);return Hf(o,h)}function d(){const u=Dt.get(o);if(u){try{u();}catch{}Dt.delete(o);}}function l(u){return Wf(e,u?.path??n,u)}return {label:o,get:i,set:a,update:s,onChange:(u,p=Object.is)=>c(false,u,p),onChangeNow:(u,p=Object.is)=>c(true,u,p),asSignature:l,stopOnChange:d}}function A(e){return fe(e)}A("positionAtom");A("lastPositionInMyGardenAtom");A("playerDirectionAtom");A("stateAtom");A("quinoaDataAtom");A("currentTimeAtom");A("actionAtom");A("isPressAndHoldActionAtom");A("mapAtom");A("tileSizeAtom");fe("mapAtom",{path:"cols"});fe("mapAtom",{path:"rows"});fe("mapAtom",{path:"spawnTiles"});fe("mapAtom",{path:"locations.seedShop.spawnTileIdx"});fe("mapAtom",{path:"locations.eggShop.spawnTileIdx"});fe("mapAtom",{path:"locations.toolShop.spawnTileIdx"});fe("mapAtom",{path:"locations.decorShop.spawnTileIdx"});fe("mapAtom",{path:"locations.sellCropsShop.spawnTileIdx"});fe("mapAtom",{path:"locations.sellPetShop.spawnTileIdx"});fe("mapAtom",{path:"locations.collectorsClub.spawnTileIdx"});fe("mapAtom",{path:"locations.wishingWell.spawnTileIdx"});fe("mapAtom",{path:"locations.shopsCenter.spawnTileIdx"});A("playerAtom");A("myDataAtom");A("myUserSlotIdxAtom");A("isSpectatingAtom");A("myCoinsCountAtom");A("numPlayersAtom");fe("playerAtom",{path:"id"});A("userSlotsAtom");A("filteredUserSlotsAtom");A("myUserSlotAtom");A("spectatorsAtom");fe("stateAtom",{path:"child"});fe("stateAtom",{path:"child.data"});fe("stateAtom",{path:"child.data.shops"});const Uf=fe("stateAtom",{path:"child.data.userSlots"}),Vf=fe("stateAtom",{path:"data.players"}),Kf=fe("stateAtom",{path:"data.hostPlayerId"});A("myInventoryAtom");A("myInventoryItemsAtom");A("isMyInventoryAtMaxLengthAtom");A("myFavoritedItemIdsAtom");A("myCropInventoryAtom");A("mySeedInventoryAtom");A("myToolInventoryAtom");A("myEggInventoryAtom");A("myDecorInventoryAtom");A("myPetInventoryAtom");fe("myInventoryAtom",{path:"favoritedItemIds"});A("itemTypeFiltersAtom");A("myItemStoragesAtom");A("myPetHutchStoragesAtom");A("myPetHutchItemsAtom");A("myPetHutchPetItemsAtom");A("myNumPetHutchItemsAtom");A("myValidatedSelectedItemIndexAtom");A("isSelectedItemAtomSuspended");A("mySelectedItemAtom");A("mySelectedItemNameAtom");A("mySelectedItemRotationsAtom");A("mySelectedItemRotationAtom");A("setSelectedIndexToEndAtom");A("myPossiblyNoLongerValidSelectedItemIndexAtom");A("myCurrentGlobalTileIndexAtom");A("myCurrentGardenTileAtom");A("myCurrentGardenObjectAtom");A("myOwnCurrentGardenObjectAtom");A("myOwnCurrentDirtTileIndexAtom");A("myCurrentGardenObjectNameAtom");A("isInMyGardenAtom");A("myGardenBoardwalkTileObjectsAtom");const Yf=fe("myDataAtom",{path:"garden"});fe("myDataAtom",{path:"garden.tileObjects"});fe("myOwnCurrentGardenObjectAtom",{path:"objectType"});A("myCurrentStablePlantObjectInfoAtom");A("myCurrentSortedGrowSlotIndicesAtom");A("myCurrentGrowSlotIndexAtom");A("myCurrentGrowSlotsAtom");A("myCurrentGrowSlotAtom");A("secondsUntilCurrentGrowSlotMaturesAtom");A("isCurrentGrowSlotMatureAtom");A("numGrowSlotsAtom");A("myCurrentEggAtom");A("petInfosAtom");A("myPetInfosAtom");A("myPetSlotInfosAtom");A("myPrimitivePetSlotsAtom");A("myNonPrimitivePetSlotsAtom");A("expandedPetSlotIdAtom");A("myPetsProgressAtom");A("myActiveCropMutationPetsAtom");A("totalPetSellPriceAtom");A("selectedPetHasNewVariantsAtom");const qf=A("shopsAtom"),Xf=A("myShopPurchasesAtom");A("seedShopAtom");A("seedShopInventoryAtom");A("seedShopRestockSecondsAtom");A("seedShopCustomRestockInventoryAtom");A("eggShopAtom");A("eggShopInventoryAtom");A("eggShopRestockSecondsAtom");A("eggShopCustomRestockInventoryAtom");A("toolShopAtom");A("toolShopInventoryAtom");A("toolShopRestockSecondsAtom");A("toolShopCustomRestockInventoryAtom");A("decorShopAtom");A("decorShopInventoryAtom");A("decorShopRestockSecondsAtom");A("decorShopCustomRestockInventoryAtom");A("isDecorShopAboutToRestockAtom");fe("shopsAtom",{path:"seed"});fe("shopsAtom",{path:"tool"});fe("shopsAtom",{path:"egg"});fe("shopsAtom",{path:"decor"});A("myCropItemsAtom");A("myCropItemsToSellAtom");A("totalCropSellPriceAtom");A("friendBonusMultiplierAtom");A("myJournalAtom");A("myCropJournalAtom");A("myPetJournalAtom");A("myStatsAtom");A("myActivityLogsAtom");A("newLogsAtom");A("hasNewLogsAtom");A("newCropLogsFromSellingAtom");A("hasNewCropLogsFromSellingAtom");A("myCompletedTasksAtom");A("myActiveTasksAtom");A("isWelcomeToastVisibleAtom");A("shouldCloseWelcomeToastAtom");A("isInitialMoveToDirtPatchToastVisibleAtom");A("isFirstPlantSeedActiveAtom");A("isThirdSeedPlantActiveAtom");A("isThirdSeedPlantCompletedAtom");A("isDemoTouchpadVisibleAtom");A("areShopAnnouncersEnabledAtom");A("arePresentablesEnabledAtom");A("isEmptyDirtTileHighlightedAtom");A("isPlantTileHighlightedAtom");A("isItemHiglightedInHotbarAtom");A("isItemHighlightedInModalAtom");A("isMyGardenButtonHighlightedAtom");A("isSellButtonHighlightedAtom");A("isShopButtonHighlightedAtom");A("isInstaGrowButtonHiddenAtom");A("isActionButtonHighlightedAtom");A("isGardenItemInfoCardHiddenAtom");A("isSeedPurchaseButtonHighlightedAtom");A("isFirstSeedPurchaseActiveAtom");A("isFirstCropHarvestActiveAtom");A("isWeatherStatusHighlightedAtom");const Jf=A("weatherAtom"),hi=A("activeModalAtom");A("hotkeyBeingPressedAtom");A("avatarTriggerAnimationAtom");A("avatarDataAtom");A("emoteDataAtom");A("otherUserSlotsAtom");A("otherPlayerPositionsAtom");A("otherPlayerSelectedItemsAtom");A("otherPlayerLastActionsAtom");A("traderBunnyPlayerId");A("npcPlayersAtom");A("npcQuinoaUsersAtom");A("numNpcAvatarsAtom");A("traderBunnyEmoteTimeoutAtom");A("traderBunnyEmoteAtom");A("unsortedLeaderboardAtom");A("currentGardenNameAtom");A("quinoaEngineAtom");A("quinoaInitializationErrorAtom");A("avgPingAtom");A("serverClientTimeOffsetAtom");A("isEstablishingShotRunningAtom");A("isEstablishingShotCompleteAtom");const oe={initialized:false,activeModal:null,isCustom:false,shadow:null,patchedAtoms:new Set,originalReads:new Map,unsubscribes:[],listeners:{onOpen:new Set,onClose:new Set}};function Fr(){return oe}function Qf(){return oe.initialized}function Mt(){return oe.isCustom&&oe.activeModal!==null}function Tt(){return oe.activeModal}function Zs(e){return !oe.shadow||oe.shadow.modal!==e?null:oe.shadow.data}function Zf(e){oe.initialized=e;}function bi(e){oe.activeModal=e;}function yi(e){oe.isCustom=e;}function el(e,t){oe.shadow={modal:e,data:t,timestamp:Date.now()};}function tl(){oe.shadow=null;}function ia(e,t){oe.patchedAtoms.add(e),oe.originalReads.set(e,t);}function em(e){return oe.originalReads.get(e)}function Eo(e){return oe.patchedAtoms.has(e)}function tm(e){oe.patchedAtoms.delete(e),oe.originalReads.delete(e);}function nm(e){oe.unsubscribes.push(e);}function rm(){for(const e of oe.unsubscribes)try{e();}catch{}oe.unsubscribes.length=0;}function om(e){return oe.listeners.onOpen.add(e),()=>oe.listeners.onOpen.delete(e)}function nl(e){return oe.listeners.onClose.add(e),()=>oe.listeners.onClose.delete(e)}function rl(e){for(const t of Array.from(oe.listeners.onOpen))try{t(e);}catch{}}function vi(e){for(const t of Array.from(oe.listeners.onClose))try{t(e);}catch{}}function im(){rm(),oe.initialized=false,oe.activeModal=null,oe.isCustom=false,oe.shadow=null,oe.patchedAtoms.clear(),oe.originalReads.clear(),oe.listeners.onOpen.clear(),oe.listeners.onClose.clear();}const xi={inventory:{atoms:[{atomLabel:"myInventoryAtom",dataKey:"_full",transform:e=>{const t=e;return {items:t.items??[],storages:t.storages??[],favoritedItemIds:t.favoritedItemIds??[]}}}],derivedAtoms:[{atomLabel:"myCropInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Produce"):[]},{atomLabel:"mySeedInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Seed"):[]},{atomLabel:"myToolInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Tool"):[]},{atomLabel:"myEggInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Egg"):[]},{atomLabel:"myDecorInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Decor"):[]},{atomLabel:"myPetInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Pet"):[]}]},journal:{atoms:[{atomLabel:"myJournalAtom",dataKey:"_full"}],derivedAtoms:[{atomLabel:"myCropJournalAtom",sourceKey:"produce",deriveFn:e=>e??{}},{atomLabel:"myPetJournalAtom",sourceKey:"pets",deriveFn:e=>e??{}}]},stats:{atoms:[{atomLabel:"myStatsAtom",dataKey:"_full"}]},activityLog:{atoms:[{atomLabel:"myActivityLogsAtom",dataKey:"logs"}]},seedShop:{atoms:[{atomLabel:"seedShopInventoryAtom",dataKey:"inventory"},{atomLabel:"seedShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},eggShop:{atoms:[{atomLabel:"eggShopInventoryAtom",dataKey:"inventory"},{atomLabel:"eggShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},toolShop:{atoms:[{atomLabel:"toolShopInventoryAtom",dataKey:"inventory"},{atomLabel:"toolShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},decorShop:{atoms:[{atomLabel:"decorShopInventoryAtom",dataKey:"inventory"},{atomLabel:"decorShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},leaderboard:{atoms:[{atomLabel:"unsortedLeaderboardAtom",dataKey:"entries"}]},petHutch:{atoms:[{atomLabel:"myPetHutchItemsAtom",dataKey:"items"},{atomLabel:"myPetHutchPetItemsAtom",dataKey:"petItems"}]}};function ol(e){return xi[e]}function am(e){const t=xi[e],n=[];for(const r of t.atoms)n.push(r.atomLabel);if(t.derivedAtoms)for(const r of t.derivedAtoms)n.push(r.atomLabel);return n}const sm=new Set(["inventory","journal","stats","activityLog","petHutch"]),lm=new Set(["seedShop","eggShop","toolShop","decorShop"]),cm=new Set(["leaderboard"]);function dm(e,t,n,r){return function(i){const a=Mt(),s=Tt();if(a&&s===r){const c=Zs(r);if(c!==null){let d;if(n.dataKey==="_full"?d=c:d=c[n.dataKey],d!==void 0)return t(i),n.transform?n.transform(d):d}}return t(i)}}function um(e,t,n,r,o){return function(a){if(Mt()&&Tt()===o){const s=Zs(o);if(s!==null){const c=s[n];if(c!==void 0)return t(a),r(c)}}return t(a)}}function pm(e){const t=ol(e);for(const n of t.atoms){const r=dt(n.atomLabel);if(!r||Eo(n.atomLabel))continue;const o=r.read;if(typeof o!="function")continue;const i=dm(n.atomLabel,o,n,e);r.read=i,ia(n.atomLabel,o);}if(t.derivedAtoms)for(const n of t.derivedAtoms){const r=dt(n.atomLabel);if(!r||Eo(n.atomLabel))continue;const o=r.read;if(typeof o!="function")continue;const i=um(n.atomLabel,o,n.sourceKey,n.deriveFn,e);r.read=i,ia(n.atomLabel,o);}}async function Or(e){const t=ol(e);for(const r of t.atoms)aa(r.atomLabel);if(t.derivedAtoms)for(const r of t.derivedAtoms)aa(r.atomLabel);const n=await mi();await il(n,e);}async function fm(e){const t=await mi();await il(t,e);const n=am(e);for(const r of n){const o=dt(r);if(o)try{t.get(o);}catch{}}}function aa(e){if(!Eo(e))return;const t=dt(e),n=em(e);t&&n&&(t.read=n),tm(e);}async function il(e,t){const n=sm.has(t),r=lm.has(t),o=cm.has(t);if(!n&&!r&&!o)return;const i=dt("stateAtom");if(i)try{const a=e.get(i);if(!a||typeof a!="object")return;let s=null;if(n||r){const c=a.child,d=c?.data;if(c&&d&&typeof d=="object"){let l=null;if(n&&Array.isArray(d.userSlots)){const u=d.userSlots.map(p=>{if(!p||typeof p!="object")return p;const f=p,m=f.data,g=m&&typeof m=="object"?{...m}:m;return {...f,data:g}});l={...l??d,userSlots:u};}if(r&&d.shops&&typeof d.shops=="object"&&(l={...l??d,shops:{...d.shops}}),l){const u={...c,data:l};s={...a,child:u};}}}if(o){const c=a.data;if(c&&Array.isArray(c.players)){const d={...c,players:[...c.players]};s={...s??a,data:d};}}if(!s)return;await e.set(i,s);}catch{}}async function mm(){for(const e of Object.keys(xi))await Or(e);}let Wn=null,un=null;async function gm(){if(Fr().initialized)return;un=await ce.select("activeModalAtom"),Wn=setInterval(async()=>{try{const n=await ce.select("activeModalAtom"),r=un;r!==n&&(un=n,hm(n,r));}catch{}},50),nm(()=>{Wn&&(clearInterval(Wn),Wn=null);}),Zf(true);}function hm(e,t){const n=Mt(),r=Tt();e===null&&t!==null&&(n&&r===t?bm("native"):n||vi({modal:t,wasCustom:false,closedBy:"native"})),e!==null&&!n&&rl({modal:e,isCustom:false});}async function bm(e){const t=Tt();t&&(tl(),yi(false),bi(null),await Or(t),vi({modal:t,wasCustom:true,closedBy:e}));}async function ym(e,t){if(!Fr().initialized)throw new Error("[MGCustomModal] Not initialized. Call init() first.");Mt()&&await al(),el(e,t),yi(true),bi(e),pm(e),await fm(e),await hi.set(e),un=e,rl({modal:e,isCustom:true});}function vm(e,t){const n=Fr();if(!n.isCustom||n.activeModal!==e||!n.shadow)return;const o={...n.shadow.data,...t};el(e,o);}async function al(){const e=Fr();if(!e.isCustom||!e.activeModal)return;const t=e.activeModal;tl(),yi(false),bi(null),await hi.set(null),un=null,await Or(t),vi({modal:t,wasCustom:true,closedBy:"api"});}function xm(){return new Promise(e=>{if(!Mt()){e();return}const t=nl(()=>{t(),e();});})}async function wm(){if(Mt()){const e=Tt();e&&await Or(e);}await mm(),im();}const pn={async init(){return gm()},isReady(){return Qf()},async show(e,t){return ym(e,t)},update(e,t){return vm(e,t)},async close(){return al()},isOpen(){return Tt()!==null},isCustomOpen(){return Mt()},getActiveModal(){return Tt()},waitForClose(){return xm()},onOpen(e){return om(e)},onClose(e){return nl(e)},async destroy(){return wm()}};function km(){return {ready:false,xform:null,xformAt:0}}const De=km();function sl(){return De.ready}function Kt(e){try{if(typeof structuredClone=="function")return structuredClone(e)}catch{}try{return JSON.parse(JSON.stringify(e))}catch{}return e}function In(){return He.tos()}function wi(){return He.engine()}function Sm(){const e=In()?.map?.cols;return Number.isFinite(e)&&e>0?e:null}function ki(e,t){const n=Sm();return n?t*n+e|0:null}let Hn=null;async function Cm(e=15e3){return De.ready?true:Hn||(Hn=(async()=>{if(await He.init(e),!In())throw new Error("MGTile: engine captured but tileObject system not found");return De.ready=true,true})(),Hn)}function Ct(e,t,n=true){const r=In(),o=ki(e,t);if(!r||o==null)return {gidx:null,tv:null};let i=r.tileViews?.get?.(o)||null;if(!i&&n&&typeof r.getOrCreateTileView=="function")try{i=r.getOrCreateTileView(o);}catch{}return {gidx:o,tv:i||null}}function Jr(e,t){if("startTime"in t&&(e.startTime=Number(t.startTime)),"endTime"in t&&(e.endTime=Number(t.endTime)),"targetScale"in t&&(e.targetScale=Number(t.targetScale)),"mutations"in t){if(!Array.isArray(t.mutations))throw new Error("MGTile: mutations must be an array of strings");e.mutations=t.mutations.slice();}}function Si(e,t){if(!e)throw new Error("MGTile: no tileObject on this tile");if(e.objectType!==t)throw new Error(`MGTile: expected objectType "${t}", got "${e.objectType}"`)}function $t(e,t,n,r={}){const o=r.ensureView!==false,i=r.forceUpdate!==false,a=wi(),{gidx:s,tv:c}=Ct(Number(e),Number(t),o);if(s==null)throw new Error("MGTile: cols unavailable (engine/TOS not ready)");if(!c)throw new Error("MGTile: TileView unavailable (not instantiated)");const d=c.tileObject;if(typeof c.onDataChanged!="function")throw new Error("MGTile: tileView.onDataChanged not found (different API?)");if(c.onDataChanged(n),i&&a?.reusableContext&&typeof c.update=="function")try{c.update(a.reusableContext);}catch{}return {ok:true,tx:Number(e),ty:Number(t),gidx:s,before:d,after:c.tileObject}}function Rr(e,t,n={}){const r=n.ensureView!==false,o=n.clone!==false,{gidx:i,tv:a}=Ct(Number(e),Number(t),r);if(i==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!a)return {tx:Number(e),ty:Number(t),gidx:i,tileView:null,tileObject:void 0};const s=a.tileObject;return {tx:Number(e),ty:Number(t),gidx:i,tileView:a,tileObject:o?Kt(s):s}}function Am(e,t,n={}){return $t(e,t,null,n)}function Tm(e,t,n,r={}){const i=Rr(e,t,{...r,clone:false}).tileView?.tileObject;Si(i,"plant");const a=Kt(i);if(Array.isArray(a.slots)||(a.slots=[]),"plantedAt"in n&&(a.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(a.maturedAt=Number(n.maturedAt)),"species"in n&&(a.species=String(n.species)),"slotIdx"in n&&"slotPatch"in n){const s=Number(n.slotIdx)|0;if(!a.slots[s])throw new Error(`MGTile: plant slot ${s} doesn't exist`);return Jr(a.slots[s],n.slotPatch),$t(e,t,a,r)}if("slots"in n){const s=n.slots;if(Array.isArray(s)){for(let c=0;c<s.length;c++)if(s[c]!=null){if(!a.slots[c])throw new Error(`MGTile: plant slot ${c} doesn't exist`);Jr(a.slots[c],s[c]);}}else if(s&&typeof s=="object")for(const c of Object.keys(s)){const d=Number(c)|0;if(Number.isFinite(d)){if(!a.slots[d])throw new Error(`MGTile: plant slot ${d} doesn't exist`);Jr(a.slots[d],s[d]);}}else throw new Error("MGTile: patch.slots must be array or object map");return $t(e,t,a,r)}return $t(e,t,a,r)}function Im(e,t,n,r={}){const i=Rr(e,t,{...r,clone:false}).tileView?.tileObject;Si(i,"decor");const a=Kt(i);return "rotation"in n&&(a.rotation=Number(n.rotation)),$t(e,t,a,r)}function Pm(e,t,n,r={}){const i=Rr(e,t,{...r,clone:false}).tileView?.tileObject;Si(i,"egg");const a=Kt(i);return "plantedAt"in n&&(a.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(a.maturedAt=Number(n.maturedAt)),$t(e,t,a,r)}function Em(e,t,n,r={}){const o=r.ensureView!==false,i=r.forceUpdate!==false,a=wi(),{gidx:s,tv:c}=Ct(Number(e),Number(t),o);if(s==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!c)throw new Error("MGTile: TileView unavailable");const d=c.tileObject,l=typeof n=="function"?n(Kt(d)):n;if(c.onDataChanged(l),i&&a?.reusableContext&&typeof c.update=="function")try{c.update(a.reusableContext);}catch{}return {ok:true,tx:Number(e),ty:Number(t),gidx:s,before:d,after:c.tileObject}}function Mm(e,t,n={}){const r=n.ensureView!==false,{gidx:o,tv:i}=Ct(Number(e),Number(t),r);if(o==null)throw new Error("MGTile: cols unavailable");if(!i)return {ok:true,tx:Number(e),ty:Number(t),gidx:o,tv:null,tileObject:void 0};const a=n.clone!==false,s=i.tileObject;return {ok:true,tx:Number(e),ty:Number(t),gidx:o,objectType:s?.objectType??null,tileObject:a?Kt(s):s,tvKeys:Object.keys(i||{}).sort(),tileView:i}}function Qr(e){if(!e)return null;const t=o=>o&&(typeof o.getGlobalPosition=="function"||typeof o.toGlobal=="function"),n=["container","root","view","tile","ground","base","floor","bg","background","baseSprite","tileSprite","displayObject","gfx","graphics","sprite"];for(const o of n)if(t(e[o]))return e[o];if(t(e))return e;const r=[e.container,e.root,e.view,e.displayObject,e.tileSprite,e.gfx,e.graphics,e.sprite];for(const o of r)if(t(o))return o;try{for(const o of Object.keys(e))if(t(e[o]))return e[o]}catch{}return null}function ur(e){const t=Ye(()=>e?.getGlobalPosition?.());if(t&&Number.isFinite(t.x)&&Number.isFinite(t.y))return {x:t.x,y:t.y};const n=Ye(()=>e?.toGlobal?.({x:0,y:0}));return n&&Number.isFinite(n.x)&&Number.isFinite(n.y)?{x:n.x,y:n.y}:null}function Lm(e){try{if(!e?.getBounds)return "center";const t=e.getBounds(),n=ur(e);if(!n||!t||!Number.isFinite(t.width)||!Number.isFinite(t.height))return "center";const r=t.x+t.width/2,o=t.y+t.height/2;return Math.hypot(n.x-r,n.y-o)<Math.hypot(n.x-t.x,n.y-t.y)?"center":"topleft"}catch{return "center"}}function _m(){const e=In(),t=e?.map?.cols,n=e?.map?.rows;if(!e||!Number.isFinite(t)||t<=1)return null;const r=Number.isFinite(n)&&n>1?n:null,o=[[0,0],[1,1],[Math.min(2,t-2),0],[0,1]];r&&r>2&&o.push([Math.floor(t/2),Math.floor(r/2)]);for(const[i,a]of o){if(i<0||a<0||i>=t||r&&a>=r)continue;const s=Ct(i,a,true).tv,c=i+1<t?Ct(i+1,a,true).tv:null,d=Ct(i,a+1,true).tv,l=Qr(s),u=Qr(c),p=Qr(d);if(!l||!u||!p)continue;const f=ur(l),m=ur(u),g=ur(p);if(!f||!m||!g)continue;const h={x:m.x-f.x,y:m.y-f.y},v={x:g.x-f.x,y:g.y-f.y},k=h.x*v.y-h.y*v.x;if(!Number.isFinite(k)||Math.abs(k)<1e-6)continue;const w=1/k,x={a:v.y*w,b:-v.x*w,c:-h.y*w,d:h.x*w},T={x:f.x-i*h.x-a*v.x,y:f.y-i*h.y-a*v.y},y=Lm(l),C=y==="center"?T:{x:T.x+.5*(h.x+v.x),y:T.y+.5*(h.y+v.y)};return {ok:true,cols:t,rows:r,vx:h,vy:v,inv:x,anchorMode:y,originCenter:C}}return null}function ll(){return De.xform=_m(),De.xformAt=Date.now(),{ok:!!De.xform?.ok,xform:De.xform}}function Fm(e,t={}){if(!e||!Number.isFinite(e.x)||!Number.isFinite(e.y))return null;const n=Number.isFinite(t.maxAgeMs)?Number(t.maxAgeMs):1500;(!De.xform?.ok||t.forceRebuild||Date.now()-De.xformAt>n)&&ll();const r=De.xform;if(!r?.ok)return null;const o=e.x-r.originCenter.x,i=e.y-r.originCenter.y,a=r.inv.a*o+r.inv.b*i,s=r.inv.c*o+r.inv.d*i,c=Math.floor(a),d=Math.floor(s),l=[[c,d],[c+1,d],[c,d+1],[c+1,d+1]];let u=null,p=1/0;for(const[f,m]of l){if(f<0||m<0||f>=r.cols||Number.isFinite(r.rows)&&r.rows!==null&&m>=r.rows)continue;const g=r.originCenter.x+f*r.vx.x+m*r.vy.x,h=r.originCenter.y+f*r.vx.y+m*r.vy.y,v=(e.x-g)**2+(e.y-h)**2;v<p&&(p=v,u={tx:f,ty:m,fx:a,fy:s,x:e.x,y:e.y,gidx:null});}return u?(u.gidx=ki(u.tx,u.ty),u):null}function Om(e,t){const n=De.xform;return n?.ok?{x:n.originCenter.x+e*n.vx.x+t*n.vy.x,y:n.originCenter.y+e*n.vx.y+t*n.vy.y}:null}function ze(){if(!sl())throw new Error("MGTile: not ready. Call MGTile.init() first.")}function Rm(){return ["MGTile.init()","MGTile.hook()","MGTile.getTileObject(tx,ty) / inspect(tx,ty)","MGTile.setTileEmpty(tx,ty)","MGTile.setTilePlant(tx,ty,{...}) / setTileDecor / setTileEgg","MGTile.setTileObjectRaw(tx,ty,objOrFn)","MGTile.rebuildTransform() / pointToTile({x,y})","MGTile.tileToPoint(tx,ty)"].join(`
`)}const ut={init:Cm,isReady:sl,hook:He.hook,engine:wi,tos:In,gidx:(e,t)=>ki(Number(e),Number(t)),getTileObject:(e,t,n={})=>(ze(),Rr(e,t,n)),inspect:(e,t,n={})=>(ze(),Mm(e,t,n)),setTileEmpty:(e,t,n={})=>(ze(),Am(e,t,n)),setTilePlant:(e,t,n,r={})=>(ze(),Tm(e,t,n,r)),setTileDecor:(e,t,n,r={})=>(ze(),Im(e,t,n,r)),setTileEgg:(e,t,n,r={})=>(ze(),Pm(e,t,n,r)),setTileObjectRaw:(e,t,n,r={})=>(ze(),Em(e,t,n,r)),rebuildTransform:()=>(ze(),ll()),pointToTile:(e,t={})=>(ze(),Fm(e,t)),tileToPoint:(e,t)=>(ze(),Om(e,t)),getTransform:()=>(ze(),De.xform),help:Rm};function Nm(){return {ready:false,app:null,renderer:null,stage:null,ticker:null,tileSets:new Map,highlights:new Map,watches:new Map,fades:new Map,fadeWatches:new Map}}const H=Nm();function cl(){return H.ready}async function Dm(e=15e3){if(H.ready)return Mo(),true;if(await He.init(e),H.app=He.app(),H.ticker=He.ticker(),H.renderer=He.renderer(),H.stage=He.stage(),!H.app||!H.ticker)throw new Error("MGPixi: PIXI app/ticker not found");return H.ready=true,Mo(),true}function Mo(){const e=L;return e.$PIXI=e.PIXI||null,e.$app=H.app||null,e.$renderer=H.renderer||null,e.$stage=H.stage||null,e.$ticker=H.ticker||null,e.__MG_PIXI__={PIXI:e.$PIXI,app:e.$app,renderer:e.$renderer,stage:e.$stage,ticker:e.$ticker,ready:H.ready},e.__MG_PIXI__}function Ci(e){return !!e&&typeof e=="object"&&!Array.isArray(e)}function Lo(e){return !!(e&&typeof e.getBounds=="function"&&("parent"in e||"children"in e))}function Cr(e){return !!(e&&typeof e.tint=="number")}function It(e){return !!(e&&typeof e.alpha=="number")}function pr(e,t,n){return e+(t-e)*n}function $m(e,t,n){const r=e>>16&255,o=e>>8&255,i=e&255,a=t>>16&255,s=t>>8&255,c=t&255,d=pr(r,a,n)|0,l=pr(o,s,n)|0,u=pr(i,c,n)|0;return d<<16|l<<8|u}function jm(e,t=900){const n=[],r=[e];for(;r.length&&n.length<t;){const o=r.pop();if(!o)continue;Cr(o)&&n.push(o);const i=o.children;if(Array.isArray(i))for(let a=i.length-1;a>=0;a--)r.push(i[a]);}return n}function Bm(e,t=25e3){const n=[],r=[e];let o=0;for(;r.length&&o++<t;){const i=r.pop();if(!i)continue;It(i)&&n.push(i);const a=i.children;if(Array.isArray(a))for(let s=a.length-1;s>=0;s--)r.push(a[s]);}return n}const zm=["plantVisual","cropVisual","slotVisual","slotView","displayObject","view","container","root","sprite","gfx","graphics"];function _o(e){if(!e)return null;if(Lo(e))return e;if(!Ci(e))return null;for(const t of zm){const n=e[t];if(Lo(n))return n}return null}function Gm(e,t){const n=[{o:e,d:0}],r=new Set,o=6;for(;n.length;){const{o:i,d:a}=n.shift();if(!(!i||a>o)&&!r.has(i)){if(r.add(i),Array.isArray(i)){if(i.length===t){const s=new Array(t);let c=true;for(let d=0;d<t;d++){const l=_o(i[d]);if(!l){c=false;break}s[d]=l;}if(c)return s}for(const s of i)n.push({o:s,d:a+1});continue}if(Ci(i)){const s=i;for(const c of Object.keys(s))n.push({o:s[c],d:a+1});}}}return null}function dl(e){if(!Array.isArray(e))return [];const t=new Set,n=[];for(const r of e){let o,i;if(Array.isArray(r))o=r[0],i=r[1];else if(Ci(r))o=r.x??r.tx,i=r.y??r.ty;else continue;if(o=Number(o),i=Number(i),!Number.isFinite(o)||!Number.isFinite(i))continue;o|=0,i|=0;const a=`${o},${i}`;t.has(a)||(t.add(a),n.push({x:o,y:i}));}return n}function Wm(e,t){const n=String(e||"").trim();if(!n)throw new Error("MGPixi.defineTileSet: empty name");const r=dl(t);return H.tileSets.set(n,r),{ok:true,name:n,count:r.length}}function Hm(e){return H.tileSets.delete(String(e||"").trim())}function Um(){return Array.from(H.tileSets.keys()).sort((e,t)=>e.localeCompare(t))}function ul(e){return !!(e&&(e.tileSet!=null||Array.isArray(e.tiles)))}function Ai(e){const n=ut.tos?.()?.tileViews;if(!n?.entries)throw new Error("MGPixi: TOS.tileViews not found");if(!ul(e))return {entries:Array.from(n.entries()),gidxSet:null};let r=[];if(e.tileSet!=null){const i=String(e.tileSet||"").trim(),a=H.tileSets.get(i);if(!a)throw new Error(`MGPixi: tileSet not found "${i}"`);r=a;}else r=dl(e.tiles||[]);const o=new Map;for(const i of r){const a=ut.getTileObject(i.x,i.y,{ensureView:true,clone:false});a?.tileView&&a.gidx!=null&&o.set(a.gidx,a.tileView);}return {entries:Array.from(o.entries()),gidxSet:new Set(o.keys())}}function Ti(e){const t=H.highlights.get(e);if(!t)return  false;Ye(()=>H.ticker?.remove(t.tick)),t.root&&t.baseAlpha!=null&&It(t.root)&&Ye(()=>{t.root.alpha=t.baseAlpha;});for(const n of t.tint)n.o&&Cr(n.o)&&Ye(()=>{n.o.tint=n.baseTint;});return H.highlights.delete(e),true}function pl(e=null){for(const t of Array.from(H.highlights.keys()))e&&!String(t).startsWith(e)||Ti(t);return  true}function fl(e,t={}){if(!Lo(e))throw new Error("MGPixi.highlightPulse: invalid root");const n=String(t.key||`hl:${Math.random().toString(16).slice(2)}`);if(H.highlights.has(n))return n;const r=It(e)?Number(e.alpha):null,o=et(Number(t.minAlpha??.12),0,1),i=et(Number(t.maxAlpha??1),0,1),a=Number(t.speed??1.25),s=(t.tint??8386303)>>>0,c=et(Number(t.tintMix??.85),0,1),d=t.deepTint!==false,l=[];if(d)for(const f of jm(e))l.push({o:f,baseTint:f.tint});else Cr(e)&&l.push({o:e,baseTint:e.tint});const u=performance.now(),p=()=>{const f=(performance.now()-u)/1e3,m=(Math.sin(f*Math.PI*2*a)+1)/2,g=m*m*(3-2*m);r!=null&&It(e)&&(e.alpha=et(pr(o,i,g)*r,0,1));const h=g*c;for(const v of l)v.o&&Cr(v.o)&&(v.o.tint=$m(v.baseTint,s,h));};return H.ticker?.add(p),H.highlights.set(n,{root:e,tick:p,baseAlpha:r,tint:l}),n}function Vm(e,t){const n=e?.mutations;if(!Array.isArray(n))return  false;for(const r of n)if(String(r||"").toLowerCase()===t)return  true;return  false}function ml(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.highlightMutation: empty mutation");const{entries:r,gidxSet:o}=Ai(t),i=`hlmut:${n}:`;if(t.clear===true)if(!o)pl(i);else for(const u of Array.from(H.highlights.keys())){if(!u.startsWith(i))continue;const p=u.split(":"),f=Number(p[2]);o.has(f)&&Ti(u);}const a={tint:(t.tint??8386303)>>>0,minAlpha:Number(t.minAlpha??.12),maxAlpha:Number(t.maxAlpha??1),speed:Number(t.speed??1.25),tintMix:Number(t.tintMix??.85),deepTint:t.deepTint!==false};let s=0,c=0,d=0,l=0;for(const[u,p]of r){const f=p?.tileObject;if(!f||f.objectType!=="plant")continue;const m=f.slots;if(!Array.isArray(m)||m.length===0)continue;let g=false;const h=[];for(let w=0;w<m.length;w++)Vm(m[w],n)&&(h.push(w),g=true);if(!g)continue;s++,c+=h.length;const v=p?.childView?.plantVisual||p?.childView||p,k=Gm(v,m.length);if(!k){l+=h.length;continue}for(const w of h){const x=k[w];if(!x){l++;continue}const T=`${i}${u}:${w}`;H.highlights.has(T)||(fl(x,{key:T,...a}),d++);}}return {ok:true,mutation:n,filtered:!!o,plantsMatched:s,matchedSlots:c,newHighlights:d,failedSlots:l}}function Km(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchMutation: empty mutation");const r=`watchmut:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,o=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,i=H.watches.get(r);i&&clearInterval(i);const a=setInterval(()=>{Ye(()=>ml(n,{...t,clear:!1}));},o);return H.watches.set(r,a),{ok:true,key:r,mutation:n,intervalMs:o}}function Ym(e){const t=String(e||"").trim();if(!t)return  false;if(!t.startsWith("watchmut:")){const r=t.toLowerCase();let o=0;for(const[i,a]of Array.from(H.watches.entries()))i.startsWith(`watchmut:${r}:`)&&(clearInterval(a),H.watches.delete(i),o++);return o>0}const n=H.watches.get(t);return n?(clearInterval(n),H.watches.delete(t),true):false}function qm(e){const t=e?.childView?.plantVisual||e?.childView?.cropVisual||e?.childView||e?.displayObject||e;return _o(t)||_o(e?.displayObject)||null}function gl(e){const t=H.fades.get(e);if(!t)return  false;for(const n of t.targets)n.o&&It(n.o)&&Number.isFinite(n.baseAlpha)&&Ye(()=>{n.o.alpha=n.baseAlpha;});return H.fades.delete(e),true}function Fo(e=null){for(const t of Array.from(H.fades.keys()))e&&!String(t).startsWith(e)||gl(t);return  true}function hl(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.clearSpeciesFade: empty species");const r=`fade:${n}:`;if(!ul(t))return Fo(r);const{gidxSet:o}=Ai(t);if(!o)return Fo(r);for(const i of Array.from(H.fades.keys())){if(!i.startsWith(r))continue;const a=Number(i.slice(r.length));o.has(a)&&gl(i);}return  true}function bl(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.fadeSpecies: empty species");const r=et(Number(t.alpha??.2),0,1),o=t.deep===true,{entries:i,gidxSet:a}=Ai(t),s=`fade:${n}:`;t.clear===true&&hl(n,t);let c=0,d=0,l=0,u=0;for(const[p,f]of i){const m=f?.tileObject;if(!m||m.objectType!=="plant")continue;c++;const g=String(m.species||"").trim().toLowerCase();if(!g||g!==n)continue;d++;const h=qm(f);if(!h||!It(h)){u++;continue}const v=`${s}${p}`;if(H.fades.has(v)){Ye(()=>{h.alpha=r;}),l++;continue}const k=o?Bm(h):[h],w=[];for(const x of k)It(x)&&w.push({o:x,baseAlpha:Number(x.alpha)});for(const x of w)Ye(()=>{x.o.alpha=r;});H.fades.set(v,{targets:w}),l++;}return {ok:true,species:n,alpha:r,deep:o,filtered:!!a,plantsSeen:c,matchedPlants:d,applied:l,failed:u,totalFades:H.fades.size}}function Xm(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchFadeSpecies: empty species");const r=`watchfade:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,o=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,i=H.fadeWatches.get(r);i&&clearInterval(i);const a=setInterval(()=>{Ye(()=>bl(n,{...t,clear:!1}));},o);return H.fadeWatches.set(r,a),{ok:true,key:r,species:n,intervalMs:o}}function Jm(e){const t=String(e||"").trim();if(!t)return  false;if(!t.startsWith("watchfade:")){const r=t.toLowerCase();let o=0;for(const[i,a]of Array.from(H.fadeWatches.entries()))i.startsWith(`watchfade:${r}:`)&&(clearInterval(a),H.fadeWatches.delete(i),o++);return o>0}const n=H.fadeWatches.get(t);return n?(clearInterval(n),H.fadeWatches.delete(t),true):false}function Qm(e){const t=Array.isArray(e?.slots)?e.slots:[];return {objectType:"plant",species:e?.species??null,plantedAt:e?.plantedAt??null,maturedAt:e?.maturedAt??null,slotCount:t.length,slots:t.map((n,r)=>({idx:r,mutations:Array.isArray(n?.mutations)?n.mutations.slice():[]}))}}function Zm(e,t,n={}){const r=Number(e)|0,o=Number(t)|0,i=n.ensureView!==false,a=ut.getTileObject(r,o,{ensureView:i,clone:false}),s=a?.tileView||null,c=s?.tileObject,d={ok:true,tx:r,ty:o,gidx:a?.gidx??ut.gidx?.(r,o)??null,hasTileView:!!s,objectType:c?.objectType??null,tileObject:c??null,summary:c?.objectType==="plant"?Qm(c):c?{objectType:c.objectType??null}:null,display:s?s.childView?.plantVisual||s.childView||s.displayObject||s:null};return n.log!==false&&Ye(()=>console.log("[MGPixi.inspectTile]",d)),d}function eg(e,t,n){const r=L.PIXI;if(!r)return;let o=H.stage.getChildByName("gemini-overlay");o||(o=new r.Container,o.name="gemini-overlay",H.stage.addChild(o));const i=n.key;let a=o.getChildByName(i);a||(a=new r.Graphics,a.name=i,o.addChild(a));const s=ut.tileToPoint(e,t);if(!s)return;a.clear(),a.lineStyle(2,n.tint??65280,n.alpha??1),a.beginFill(n.tint??65280,(n.alpha??1)*.2);const c=ut.getTransform(),d=c?Math.hypot(c.vx.x,c.vx.y):32,l=c?Math.hypot(c.vy.x,c.vy.y):32;a.drawRect(0,0,d,l),a.endFill(),a.x=s.x,a.y=s.y,c&&(a.rotation=Math.atan2(c.vx.y,c.vx.x));}function tg(e){const t=H.stage?.getChildByName("gemini-overlay");if(!t)return  false;const n=t.getChildByName(e);return n?(t.removeChild(n),n.destroy?.(),true):false}function xe(){if(!cl())throw new Error("MGPixi: call MGPixi.init() first")}const Ii={init:Dm,isReady:cl,expose:Mo,get app(){return H.app},get renderer(){return H.renderer},get stage(){return H.stage},get ticker(){return H.ticker},get PIXI(){return L.PIXI||null},defineTileSet:(e,t)=>(xe(),Wm(e,t)),deleteTileSet:e=>(xe(),Hm(e)),listTileSets:()=>(xe(),Um()),highlightPulse:(e,t)=>(xe(),fl(e,t)),stopHighlight:e=>(xe(),Ti(e)),clearHighlights:e=>(xe(),pl(e)),drawOverlayBox:(e,t,n)=>(xe(),eg(e,t,n)),stopOverlay:e=>(xe(),tg(e)),highlightMutation:(e,t)=>(xe(),ml(e,t)),watchMutation:(e,t)=>(xe(),Km(e,t)),stopWatchMutation:e=>(xe(),Ym(e)),inspectTile:(e,t,n)=>(xe(),Zm(e,t,n)),fadeSpecies:(e,t)=>(xe(),bl(e,t)),clearSpeciesFade:(e,t)=>(xe(),hl(e,t)),clearFades:e=>(xe(),Fo(e)),watchFadeSpecies:(e,t)=>(xe(),Xm(e,t)),stopWatchFadeSpecies:e=>(xe(),Jm(e))};function ng(){return {ready:false,baseUrl:null,urls:{ambience:new Map,music:new Map},sfx:{mp3Url:null,atlasUrl:null,atlas:null,groups:new Map,buffer:null},tracks:{ambience:null,music:null},ctx:null}}const V=ng();function yl(){return V.ready}const sa=L??window;async function vl(){const e=V.ctx;if(e)return e;const t=sa.AudioContext||sa.webkitAudioContext;if(!t)throw new Error("WebAudio not supported");const n=new t;return V.ctx=n,n}async function xl(){if(V.ctx&&V.ctx.state==="suspended")try{await V.ctx.resume();}catch{}}const rg={sfx:"soundEffectsVolume",music:"musicVolume",ambience:"ambienceVolume"},og={sfx:"soundEffectsVolumeAtom",music:"musicVolumeAtom",ambience:"ambienceVolumeAtom"},fn=.001,mn=.2;function la(e,t=NaN){try{const n=localStorage.getItem(e);if(n==null)return t;let r;try{r=JSON.parse(n);}catch{r=n;}if(typeof r=="number"&&Number.isFinite(r))return r;if(typeof r=="string"){const o=parseFloat(r);if(Number.isFinite(o))return o}}catch{}return t}function An(e){const t=rg[e],n=og[e];if(!t)return {atom:mn,vol100:Un(mn)};const r=la(t,NaN);if(Number.isFinite(r)){const i=et(r,0,1);return {atom:i,vol100:Un(i)}}if(n){const i=la(n,NaN);if(Number.isFinite(i)){const a=et(i,0,1);return {atom:a,vol100:Un(a)}}}const o=mn;return {atom:o,vol100:Un(o)}}function ig(e){const t=Number(e);if(!Number.isFinite(t))return null;if(t<=0)return 0;const r=(et(t,1,100)-1)/99;return fn+r*(mn-fn)}function Un(e){const t=et(Number(e),0,1);if(t<=fn)return 0;const n=(t-fn)/(mn-fn);return Math.round(1+n*99)}function wl(e,t){if(t==null)return An(e).atom;const n=ig(t);return n===null?An(e).atom:ru(n)}function ag(e){const t=new Map,n=(r,o)=>{t.has(r)||t.set(r,[]),t.get(r).push(o);};for(const r of Object.keys(e||{})){const o=/^(.*)_([A-Z])$/.exec(r);o?.[1]?n(o[1],r):n(r,r);}for(const[r,o]of Array.from(t.entries()))o.sort((i,a)=>i.localeCompare(a)),t.set(r,o);V.sfx.groups=t;}function sg(e){const t=V.sfx.atlas;if(!t)throw new Error("SFX atlas not loaded");if(t[e])return e;const n=V.sfx.groups.get(e);if(n?.length)return n[Math.random()*n.length|0];throw new Error(`Unknown sfx/group: ${e}`)}async function lg(){if(V.sfx.buffer)return V.sfx.buffer;if(!V.sfx.mp3Url)throw new Error("SFX mp3 url missing");const e=await vl();await xl();const n=await(await hs(V.sfx.mp3Url)).arrayBuffer(),r=await new Promise((o,i)=>{const a=e.decodeAudioData(n,o,i);a?.then&&a.then(o,i);});return V.sfx.buffer=r,r}async function cg(e,t={}){if(!V.ready)throw new Error("MGAudio not ready yet");const n=String(e||"").trim();if(!n)throw new Error("Missing sfx name");const r=sg(n),o=V.sfx.atlas[r];if(!o)throw new Error(`Missing segment for sfx: ${r}`);const i=await vl();await xl();const a=await lg(),s=Math.max(0,+o.start||0),c=Math.max(s,+o.end||s),d=Math.max(.01,c-s),l=wl("sfx",t.volume),u=i.createGain();u.gain.value=l,u.connect(i.destination);const p=i.createBufferSource();return p.buffer=a,p.connect(u),p.start(0,s,d),{name:r,source:p,start:s,end:c,duration:d,volume:l}}let Vn=null;async function dg(){return V.ready?true:Vn||(Vn=(async()=>{V.baseUrl=await Ut.base();const e=await ct.load({baseUrl:V.baseUrl}),t=ct.getBundle(e,"audio");if(!t)throw new Error("No audio bundle in manifest");for(const n of t.assets||[])for(const r of n.src||[]){if(typeof r!="string")continue;const o=/^audio\/(ambience|music)\/(.+)\.mp3$/i.exec(r);if(o){const i=o[1].toLowerCase(),a=o[2];V.urls[i].set(a,it(V.baseUrl,r));continue}/^audio\/sfx\/sfx\.mp3$/i.test(r)&&(V.sfx.mp3Url=it(V.baseUrl,r)),/^audio\/sfx\/sfx\.json$/i.test(r)&&(V.sfx.atlasUrl=it(V.baseUrl,r));}if(!V.sfx.atlasUrl)throw new Error("Missing audio/sfx/sfx.json in manifest");return V.sfx.atlas=await si(V.sfx.atlasUrl),ag(V.sfx.atlas),V.ready=true,true})(),Vn)}function kl(e){if(e!=="music"&&e!=="ambience")return  false;const t=V.tracks[e];if(t){try{t.pause();}catch{}try{t.src="";}catch{}}return V.tracks[e]=null,true}function ug(e,t,n={}){if(!V.ready)throw new Error("MGAudio not ready yet");if(e!=="music"&&e!=="ambience")throw new Error(`Invalid category: ${e}`);const r=V.urls[e].get(t);if(!r)throw new Error(`Unknown ${e}: ${t}`);kl(e);const o=new Audio(r);return o.loop=!!n.loop,o.volume=wl(e,n.volume),o.preload="auto",o.play().catch(()=>{}),V.tracks[e]=o,o}function pg(e,t={}){const n=String(e||"").trim();return n==="music"||n==="ambience"?Array.from(V.urls[n].keys()).sort():n==="sfx"?V.sfx.atlas?t.groups?Array.from(V.sfx.groups.keys()).sort():Object.keys(V.sfx.atlas).sort():[]:[]}function fg(){return ["sfx","music","ambience"]}function mg(){return Array.from(V.sfx.groups.keys()).sort((e,t)=>e.localeCompare(t))}function gg(e,t){const n=String(e||"").trim().toLowerCase(),r=String(t||"").trim();if(!r||n!=="music"&&n!=="ambience")return  false;const o=V.urls[n],i=r.toLowerCase();for(const a of Array.from(o.keys()))if(a.toLowerCase()===i)return  true;return  false}function hg(e){const t=String(e||"").trim();if(!t)return  false;const n=t.toLowerCase();for(const r of Array.from(V.sfx.groups.keys()))if(r.toLowerCase()===n)return  true;return  false}function bg(e,t){const n=String(e||"").trim().toLowerCase(),r=String(t||"").trim();if(!r)throw new Error("getTrackUrl(category, name) missing name");if(n!=="music"&&n!=="ambience")throw new Error(`Invalid category: ${e}`);const o=V.urls[n],i=r.toLowerCase();for(const[a,s]of Array.from(o.entries()))if(a.toLowerCase()===i)return s;return null}function yg(){return V.tracks.music&&(V.tracks.music.volume=An("music").atom),V.tracks.ambience&&(V.tracks.ambience.volume=An("ambience").atom),true}function nt(){if(!yl())throw new Error("MGAudio not ready yet")}async function vg(e,t,n={}){const r=String(e||"").trim(),o=String(t||"").trim();if(!r||!o)throw new Error("play(category, asset) missing args");if(r==="sfx")return cg(o,n);if(r==="music"||r==="ambience")return ug(r,o,n);throw new Error(`Unknown category: ${r}`)}const Sl={init:dg,isReady:yl,play:vg,stop:e=>(nt(),kl(e)),list:(e,t)=>(nt(),pg(e,t)),refreshVolumes:()=>(nt(),yg()),categoryVolume:e=>(nt(),An(e)),getCategories:()=>(nt(),fg()),getGroups:()=>(nt(),mg()),hasTrack:(e,t)=>(nt(),gg(e,t)),hasGroup:e=>(nt(),hg(e)),getTrackUrl:(e,t)=>(nt(),bg(e,t))};function xg(){return {ready:false,baseUrl:null,byCat:new Map,byBase:new Map,overlay:null,live:new Set,defaultParent:null}}const pe=xg();function Cl(){return pe.ready}let Kn=null;async function wg(){return pe.ready?true:Kn||(Kn=(async()=>{pe.baseUrl=await Ut.base();const e=await ct.load({baseUrl:pe.baseUrl}),t=ct.getBundle(e,"cosmetic");if(!t)throw new Error("No 'cosmetic' bundle in manifest");pe.byCat.clear(),pe.byBase.clear();for(const n of t.assets||[])for(const r of n.src||[]){if(typeof r!="string"||!/^cosmetic\/.+\.png$/i.test(r))continue;const i=r.split("/").pop().replace(/\.png$/i,""),a=i.indexOf("_");if(a<0)continue;const s=i.slice(0,a),c=i.slice(a+1),d=it(pe.baseUrl,r);pe.byBase.set(i,d),pe.byCat.has(s)||pe.byCat.set(s,new Map),pe.byCat.get(s).set(c,d);}return pe.ready=true,true})(),Kn)}function Oo(e){let t=String(e||"").trim();return t?(t=t.replace(/^cosmetic\//i,""),t=t.replace(/\.png$/i,""),t):""}function kg(e,t){if(t===void 0){const i=Oo(e),a=i.indexOf("_");return a<0?{cat:"",asset:i,base:i}:{cat:i.slice(0,a),asset:i.slice(a+1),base:i}}const n=String(e||"").trim(),r=Oo(t),o=r.includes("_")?r:`${n}_${r}`;if(r.includes("_")&&!n){const i=r.indexOf("_");return {cat:r.slice(0,i),asset:r.slice(i+1),base:r}}return {cat:n,asset:r.replace(/^.+?_/,""),base:o}}function Sg(){return Array.from(pe.byCat.keys()).sort((e,t)=>e.localeCompare(t))}function Cg(e){const t=pe.byCat.get(String(e||"").trim());return t?Array.from(t.keys()).sort((n,r)=>n.localeCompare(r)):[]}function Ro(e,t){const{cat:n,asset:r,base:o}=kg(e,t),i=pe.byBase.get(o);if(i)return i;const s=pe.byCat.get(n)?.get(r);if(s)return s;if(!pe.baseUrl)throw new Error("MGCosmetic not initialized");if(!o)throw new Error("Invalid cosmetic name");return it(pe.baseUrl,`cosmetic/${o}.png`)}const ca=L?.document??document;function Ag(){if(pe.overlay)return pe.overlay;const e=ca.createElement("div");return e.id="MG_COSMETIC_OVERLAY",e.style.cssText=["position:fixed","left:0","top:0","width:100vw","height:100vh","pointer-events:none","z-index:99999999"].join(";"),ca.documentElement.appendChild(e),pe.overlay=e,e}function Tg(){const e=pe.defaultParent;if(!e)return null;try{return typeof e=="function"?e():e}catch{return null}}function Ig(e){return pe.defaultParent=e,true}const Pg=L?.document??document;function No(e,t,n){if(!pe.ready)throw new Error("MGCosmetic not ready yet");let r,o;typeof t=="object"&&t!==null?(r=t,o=void 0):typeof t=="string"?(o=t,r=n||{}):(o=void 0,r=n||{});const i=o!==void 0?Ro(e,o):Ro(e),a=Pg.createElement("img");if(a.decoding="async",a.loading="eager",a.src=i,a.alt=r.alt!=null?String(r.alt):Oo(o??e),r.className&&(a.className=String(r.className)),r.width!=null&&(a.style.width=String(r.width)),r.height!=null&&(a.style.height=String(r.height)),r.opacity!=null&&(a.style.opacity=String(r.opacity)),r.style&&typeof r.style=="object")for(const[s,c]of Object.entries(r.style))try{a.style[s]=String(c);}catch{}return a}function Eg(e,t,n){let r,o;typeof t=="object"&&t!==null?(r=t,o=void 0):typeof t=="string"?(o=t,r=n||{}):(o=void 0,r=n||{});const i=r.parent||Tg()||Ag(),a=o!==void 0?No(e,o,r):No(e,r);if(i===pe.overlay||r.center||r.x!=null||r.y!=null||r.absolute){a.style.position="absolute",a.style.pointerEvents="none",a.style.zIndex=String(r.zIndex??999999);const c=r.scale??1,d=r.rotation??0;if(r.center)a.style.left="50%",a.style.top="50%",a.style.transform=`translate(-50%, -50%) scale(${c}) rotate(${d}rad)`;else {const l=r.x??innerWidth/2,u=r.y??innerHeight/2;a.style.left=`${l}px`,a.style.top=`${u}px`,a.style.transform=`scale(${c}) rotate(${d}rad)`,r.anchor==="center"&&(a.style.transform=`translate(-50%, -50%) scale(${c}) rotate(${d}rad)`);}}return i.appendChild(a),pe.live.add(a),a.__mgDestroy=()=>{try{a.remove();}catch{}pe.live.delete(a);},a}function Mg(){for(const e of Array.from(pe.live))e.__mgDestroy?.();}function bt(){if(!Cl())throw new Error("MGCosmetic not ready yet")}const Al={init:wg,isReady:Cl,categories:()=>(bt(),Sg()),list:e=>(bt(),Cg(e)),url:((e,t)=>(bt(),Ro(e,t))),create:((e,t,n)=>(bt(),No(e,t,n))),show:((e,t,n)=>(bt(),Eg(e,t,n))),attach:e=>(bt(),Ig(e)),clear:()=>(bt(),Mg())};async function Lg(e){const t=[{name:"Data",init:()=>de.init()},{name:"CustomModal",init:()=>pn.init()},{name:"Sprites",init:()=>ie.init()},{name:"TileObjectSystem",init:()=>ut.init()},{name:"Pixi",init:()=>Ii.init()},{name:"Audio",init:()=>Sl.init()},{name:"Cosmetics",init:()=>Al.init()}];await Promise.all(t.map(async n=>{e?.({status:"start",name:n.name});try{await n.init(),e?.({status:"success",name:n.name});}catch(r){console.error(`[${n.name}] failed`,r),e?.({status:"error",name:n.name,error:r});}})),console.log("[Gemini] Modules ready. Access via Gemini.Modules in console.");}const Pi=Me.AUTO_FAVORITE,Tl={enabled:false,mode:"simple",simple:{enabled:false,favoriteSpecies:[],favoriteMutations:[]}};function Pt(){return Te(Pi,Tl)}function Ei(e){je(Pi,e);}function Il(e){const n={...Pt(),...e};return Ei(n),n}function Mi(e){const t=Pt();return t.mode="simple",t.simple={...t.simple,...e},Ei(t),t}function _g(e){Mi({favoriteSpecies:e});}function Fg(e){Mi({favoriteMutations:e});}function da(){return Pt().enabled}function tt(e,t){if(e===t)return  true;if(e===null||t===null)return e===t;if(typeof e!=typeof t)return  false;if(typeof e!="object")return e===t;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return  false;for(let a=0;a<e.length;a++)if(!tt(e[a],t[a]))return  false;return  true}if(Array.isArray(e)||Array.isArray(t))return  false;const n=e,r=t,o=Object.keys(n),i=Object.keys(r);if(o.length!==i.length)return  false;for(const a of o)if(!Object.prototype.hasOwnProperty.call(r,a)||!tt(n[a],r[a]))return  false;return  true}const ua={currentGardenTile:"myCurrentGardenTileAtom",globalTileIndex:"myCurrentGlobalTileIndexAtom",gardenObject:"myCurrentGardenObjectAtom",isMature:"isGardenObjectMatureAtom",isInMyGarden:"isInMyGardenAtom",gardenName:"currentGardenNameAtom",sortedSlotIndices:"myCurrentSortedGrowSlotIndicesAtom",currentGrowSlotIndex:"myCurrentGrowSlotIndexAtom"},pa={position:{globalIndex:null,localIndex:null},tile:{type:null,isEmpty:true},garden:{name:null,isOwner:false,playerSlotIndex:null},object:{type:null,data:null,isMature:false},plant:null};function Og(e){const t=e.currentGardenTile;return {globalIndex:e.globalTileIndex,localIndex:t?.localTileIndex??null}}function Rg(e){return {type:e.currentGardenTile?.tileType??null,isEmpty:e.gardenObject===null}}function Ng(e){const t=e.currentGardenTile;return {name:e.gardenName,isOwner:e.isInMyGarden??false,playerSlotIndex:t?.userSlotIdx??null}}function Dg(e){const t=e.gardenObject;return t?{type:t.objectType,data:t,isMature:e.isMature??false}:{type:null,data:null,isMature:false}}function $g(e){const t=e.gardenObject;if(!t||t.objectType!=="plant")return null;const n=t,r=e.sortedSlotIndices??[];return {species:n.species,slots:n.slots??[],currentSlotIndex:e.currentGrowSlotIndex,sortedSlotIndices:r,nextHarvestSlotIndex:r.length>0?r[0]:null}}function fa(e){return {position:Og(e),tile:Rg(e),garden:Ng(e),object:Dg(e),plant:$g(e)}}function ma(e){return JSON.stringify({globalIndex:e.position.globalIndex,localIndex:e.position.localIndex,tileType:e.tile.type,isEmpty:e.tile.isEmpty,gardenName:e.garden.name,isOwner:e.garden.isOwner,playerSlotIndex:e.garden.playerSlotIndex,objectType:e.object.type,isMature:e.object.isMature,plantSpecies:e.plant?.species??null,slotCount:e.plant?.slots.length??0})}function jg(e,t){return e.type!==t.type||e.isMature!==t.isMature?true:e.data===null&&t.data===null?false:e.data===null||t.data===null?true:!tt(e.data,t.data)}function Bg(e,t){return e===null&&t===null?false:e===null||t===null||e.species!==t.species||e.currentSlotIndex!==t.currentSlotIndex||e.nextHarvestSlotIndex!==t.nextHarvestSlotIndex||e.slots.length!==t.slots.length?true:!tt(e.sortedSlotIndices,t.sortedSlotIndices)}function zg(e,t){return e.name!==t.name||e.isOwner!==t.isOwner||e.playerSlotIndex!==t.playerSlotIndex}function Gg(){let e=pa,t=pa,n=false;const r=[],o={all:new Set,stable:new Set,object:new Set,plantInfo:new Set,garden:new Set},i={},a=Object.keys(ua),s=new Set;function c(){if(s.size<a.length)return;const l=fa(i);if(!tt(e,l)&&(t=e,e=l,!!n)){for(const u of o.all)u(e,t);if(ma(t)!==ma(e))for(const u of o.stable)u(e,t);if(jg(t.object,e.object)){const u={current:e.object,previous:t.object};for(const p of o.object)p(u);}if(Bg(t.plant,e.plant)){const u={current:e.plant,previous:t.plant};for(const p of o.plantInfo)p(u);}if(zg(t.garden,e.garden)){const u={current:e.garden,previous:t.garden};for(const p of o.garden)p(u);}}}async function d(){if(n)return;const l=a.map(async u=>{const p=ua[u],f=await ce.subscribe(p,m=>{i[u]=m,s.add(u),c();});r.push(f);});await Promise.all(l),n=true,s.size===a.length&&(e=fa(i));}return d(),{get(){return e},subscribe(l,u){return o.all.add(l),u?.immediate!==false&&n&&s.size===a.length&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,u){return o.stable.add(l),u?.immediate!==false&&n&&s.size===a.length&&l(e,e),()=>o.stable.delete(l)},subscribeObject(l,u){return o.object.add(l),u?.immediate&&n&&s.size===a.length&&l({current:e.object,previous:e.object}),()=>o.object.delete(l)},subscribePlantInfo(l,u){return o.plantInfo.add(l),u?.immediate&&n&&s.size===a.length&&l({current:e.plant,previous:e.plant}),()=>o.plantInfo.delete(l)},subscribeGarden(l,u){return o.garden.add(l),u?.immediate&&n&&s.size===a.length&&l({current:e.garden,previous:e.garden}),()=>o.garden.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.object.clear(),o.plantInfo.clear(),o.garden.clear(),n=false;}}}let Zr=null;function Wg(){return Zr||(Zr=Gg()),Zr}function Hg(){let e=null;const t=[],n=new Set,r={},o=new Set,i=2;function a(u,p){return {x:p%u,y:Math.floor(p/u)}}function s(u,p,f){return f*u+p}function c(u,p){const{cols:f,rows:m}=u,g=f*m,h=new Set,v=new Set,k=new Map,w=[],x=u.userSlotIdxAndDirtTileIdxToGlobalTileIdx??[],T=u.userSlotIdxAndBoardwalkTileIdxToGlobalTileIdx??[],y=Math.max(x.length,T.length);for(let S=0;S<y;S++){const P=x[S]??[],E=T[S]??[],R=P.map((B,X)=>(h.add(B),k.set(B,S),{globalIndex:B,localIndex:X,position:a(f,B)})),ee=E.map((B,X)=>(v.add(B),k.set(B,S),{globalIndex:B,localIndex:X,position:a(f,B)}));w.push({userSlotIdx:S,dirtTiles:R,boardwalkTiles:ee,allTiles:[...R,...ee]});}const C=u.spawnTiles.map(S=>a(f,S)),I={};if(u.locations)for(const[S,P]of Object.entries(u.locations)){const E=P.spawnTileIdx??[];I[S]={name:S,spawnTiles:E,spawnPositions:E.map(R=>a(f,R))};}return {cols:f,rows:m,totalTiles:g,tileSize:p,spawnTiles:u.spawnTiles,spawnPositions:C,locations:I,userSlots:w,globalToXY(S){return a(f,S)},xyToGlobal(S,P){return s(f,S,P)},getTileOwner(S){return k.get(S)??null},isDirtTile(S){return h.has(S)},isBoardwalkTile(S){return v.has(S)}}}function d(){if(o.size<i||e)return;const u=r.map,p=r.tileSize??0;if(u){e=c(u,p);for(const f of n)f(e);n.clear();}}async function l(){const u=await ce.subscribe("mapAtom",f=>{r.map=f,o.add("map"),d();});t.push(u);const p=await ce.subscribe("tileSizeAtom",f=>{r.tileSize=f,o.add("tileSize"),d();});t.push(p);}return l(),{get(){return e},isReady(){return e!==null},onReady(u,p){return e?(p?.immediate!==false&&u(e),()=>{}):(n.add(u),()=>n.delete(u))},destroy(){for(const u of t)u();t.length=0,e=null,n.clear();}}}let eo=null;function Do(){return eo||(eo=Hg()),eo}function Ug(){const e=de.get("mutations");return e?Object.keys(e):[]}function Pl(){const e={};for(const t of Ug())e[t]=[];return e}function $o(){return {garden:null,mySlotIndex:null,plants:{all:[],mature:[],growing:[],bySpecies:{},count:0},crops:{all:[],mature:[],growing:[],mutated:{all:[],byMutation:Pl()}},eggs:{all:[],mature:[],growing:[],byType:{},count:0},decors:{tileObjects:[],boardwalk:[],all:[],byType:{},count:0},tiles:{tileObjects:[],boardwalk:[],empty:{tileObjects:[],boardwalk:[]}},counts:{plants:0,maturePlants:0,crops:0,matureCrops:0,eggs:0,matureEggs:0,decors:0,emptyTileObjects:0,emptyBoardwalk:0}}}function Vg(e,t,n,r){const o=t.slots.filter(i=>r>=i.endTime).length;return {tileIndex:e,position:n,species:t.species,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:r>=t.maturedAt,slots:t.slots,slotsCount:t.slots.length,matureSlotsCount:o}}function Kg(e,t,n,r,o){return {tileIndex:e,position:t,slotIndex:n,species:r.species,startTime:r.startTime,endTime:r.endTime,targetScale:r.targetScale,mutations:[...r.mutations],isMature:o>=r.endTime}}function Yg(e,t,n,r){return {tileIndex:e,position:n,eggId:t.eggId,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:r>=t.maturedAt}}function ga(e,t,n,r){return {tileIndex:e,position:n,decorId:t.decorId,rotation:t.rotation,location:r}}function ha(e,t){const{garden:n,mySlotIndex:r}=e,o=Date.now();if(!n||r===null)return $o();const i=t().get(),a=i?.userSlots[r],s=a?.dirtTiles??[],c=a?.boardwalkTiles??[],d=[],l=[],u=[],p={},f=[],m=[],g=[],h=[],v=Pl(),k=[],w=[],x=[],T={},y=[],C=[],I={},S=new Set,P=new Set;for(const[B,X]of Object.entries(n.tileObjects)){const le=parseInt(B,10);S.add(le);const $=i?i.globalToXY(le):{x:0,y:0};if(X.objectType==="plant"){const j=X,N=Vg(B,j,$,o);d.push(N),N.isMature?l.push(N):u.push(N),p[N.species]||(p[N.species]=[]),p[N.species].push(N);for(let F=0;F<j.slots.length;F++){const _=j.slots[F],D=Kg(B,$,F,_,o);if(f.push(D),D.isMature?m.push(D):g.push(D),D.mutations.length>0){h.push(D);for(const O of D.mutations)v[O]||(v[O]=[]),v[O].push(D);}}}else if(X.objectType==="egg"){const N=Yg(B,X,$,o);k.push(N),T[N.eggId]||(T[N.eggId]=[]),T[N.eggId].push(N),N.isMature?w.push(N):x.push(N);}else if(X.objectType==="decor"){const N=ga(B,X,$,"tileObjects");y.push(N),I[N.decorId]||(I[N.decorId]=[]),I[N.decorId].push(N);}}for(const[B,X]of Object.entries(n.boardwalkTileObjects)){const le=parseInt(B,10);P.add(le);const $=i?i.globalToXY(le):{x:0,y:0},N=ga(B,X,$,"boardwalk");C.push(N),I[N.decorId]||(I[N.decorId]=[]),I[N.decorId].push(N);}const E=[...y,...C],R=s.filter(B=>!S.has(B.localIndex)),ee=c.filter(B=>!P.has(B.localIndex));return {garden:n,mySlotIndex:r,plants:{all:d,mature:l,growing:u,bySpecies:p,count:d.length},crops:{all:f,mature:m,growing:g,mutated:{all:h,byMutation:v}},eggs:{all:k,mature:w,growing:x,byType:T,count:k.length},decors:{tileObjects:y,boardwalk:C,all:E,byType:I,count:E.length},tiles:{tileObjects:s,boardwalk:c,empty:{tileObjects:R,boardwalk:ee}},counts:{plants:d.length,maturePlants:l.length,crops:f.length,matureCrops:m.length,eggs:k.length,matureEggs:w.length,decors:E.length,emptyTileObjects:R.length,emptyBoardwalk:ee.length}}}function ba(e){return JSON.stringify({plants:e.counts.plants,maturePlants:e.counts.maturePlants,crops:e.counts.crops,matureCrops:e.counts.matureCrops,eggs:e.counts.eggs,matureEggs:e.counts.matureEggs,decors:e.counts.decors,emptyTileObjects:e.counts.emptyTileObjects,emptyBoardwalk:e.counts.emptyBoardwalk})}function qg(e,t){const n=new Set(e.map(a=>a.tileIndex)),r=new Set(t.map(a=>a.tileIndex)),o=t.filter(a=>!n.has(a.tileIndex)),i=e.filter(a=>!r.has(a.tileIndex));return {added:o,removed:i}}function Xg(e,t,n){const r=new Set(e.map(i=>i.tileIndex)),o=new Set(n.map(i=>i.tileIndex));return t.filter(i=>!r.has(i.tileIndex)&&o.has(i.tileIndex))}function Jg(e,t,n){const r=new Set(e.map(i=>`${i.tileIndex}:${i.slotIndex}`)),o=new Set(n.map(i=>`${i.tileIndex}:${i.slotIndex}`));return t.filter(i=>{const a=`${i.tileIndex}:${i.slotIndex}`;return !r.has(a)&&o.has(a)})}function Qg(e,t,n){const r=new Set(e.map(i=>i.tileIndex)),o=new Set(n.map(i=>i.tileIndex));return t.filter(i=>!r.has(i.tileIndex)&&o.has(i.tileIndex))}function Zg(e,t){const n=[],r=new Map(e.map(o=>[o.tileIndex,o]));for(const o of t){const i=r.get(o.tileIndex);if(!i)continue;const a=Math.min(i.slots.length,o.slots.length);for(let s=0;s<a;s++){const c=new Set(i.slots[s].mutations),d=new Set(o.slots[s].mutations),l=[...d].filter(p=>!c.has(p)),u=[...c].filter(p=>!d.has(p));if(l.length>0||u.length>0){const p=Date.now(),f=o.slots[s],m={tileIndex:o.tileIndex,position:o.position,slotIndex:s,species:f.species,startTime:f.startTime,endTime:f.endTime,targetScale:f.targetScale,mutations:[...f.mutations],isMature:p>=f.endTime};n.push({crop:m,added:l,removed:u});}}}return n}function eh(e,t,n){const r=[],o=new Map(t.map(a=>[a.tileIndex,a])),i=new Map;for(const a of n)i.set(`${a.tileIndex}:${a.slotIndex}`,a);for(const a of e){const s=o.get(a.tileIndex);if(!s)continue;const c=Math.min(a.slots.length,s.slots.length);for(let d=0;d<c;d++){const l=a.slots[d],u=s.slots[d];if(l.startTime!==u.startTime){const p=i.get(`${a.tileIndex}:${d}`);if(!p||!p.isMature)continue;const f={tileIndex:a.tileIndex,position:a.position,slotIndex:d,species:l.species,startTime:l.startTime,endTime:l.endTime,targetScale:l.targetScale,mutations:[...l.mutations],isMature:true};r.push({crop:f,remainingSlots:s.slotsCount});}}if(s.slotsCount<a.slotsCount)for(let d=s.slotsCount;d<a.slotsCount;d++){const l=i.get(`${a.tileIndex}:${d}`);if(!l||!l.isMature)continue;const u=a.slots[d];if(!u)continue;const p={tileIndex:a.tileIndex,position:a.position,slotIndex:d,species:u.species,startTime:u.startTime,endTime:u.endTime,targetScale:u.targetScale,mutations:[...u.mutations],isMature:true};r.push({crop:p,remainingSlots:s.slotsCount});}}return r}function th(e,t){const n=new Set(e.map(a=>a.tileIndex)),r=new Set(t.map(a=>a.tileIndex)),o=t.filter(a=>!n.has(a.tileIndex)),i=e.filter(a=>!r.has(a.tileIndex));return {added:o,removed:i}}function nh(e,t){const n=c=>`${c.tileIndex}:${c.location}`,r=c=>`${c.tileIndex}:${c.location}`,o=new Set(e.map(n)),i=new Set(t.map(r)),a=t.filter(c=>!o.has(r(c))),s=e.filter(c=>!i.has(n(c)));return {added:a,removed:s}}function rh(){let e=$o(),t=$o(),n=false;const r=[],o={all:new Set,stable:new Set,plantAdded:new Set,plantRemoved:new Set,plantMatured:new Set,cropMutated:new Set,cropMatured:new Set,cropHarvested:new Set,eggPlaced:new Set,eggRemoved:new Set,eggMatured:new Set,decorPlaced:new Set,decorRemoved:new Set},i={},a=new Set,s=2;function c(){if(a.size<s)return;const l=ha(i,Do);if(tt(e,l)||(t=e,e=l,!n))return;for(const w of o.all)w(e,t);if(ba(t)!==ba(e))for(const w of o.stable)w(e,t);const u=qg(t.plants.all,e.plants.all);for(const w of u.added)for(const x of o.plantAdded)x({plant:w});for(const w of u.removed)for(const x of o.plantRemoved)x({plant:w,tileIndex:w.tileIndex});const p=Xg(t.plants.mature,e.plants.mature,e.plants.all);for(const w of p)for(const x of o.plantMatured)x({plant:w});const f=Zg(t.plants.all,e.plants.all);for(const w of f)for(const x of o.cropMutated)x(w);const m=Jg(t.crops.mature,e.crops.mature,e.crops.all);for(const w of m)for(const x of o.cropMatured)x({crop:w});const g=eh(t.plants.all,e.plants.all,t.crops.all);for(const w of g)for(const x of o.cropHarvested)x(w);const h=th(t.eggs.all,e.eggs.all);for(const w of h.added)for(const x of o.eggPlaced)x({egg:w});for(const w of h.removed)for(const x of o.eggRemoved)x({egg:w});const v=Qg(t.eggs.mature,e.eggs.mature,e.eggs.all);for(const w of v)for(const x of o.eggMatured)x({egg:w});const k=nh(t.decors.all,e.decors.all);for(const w of k.added)for(const x of o.decorPlaced)x({decor:w});for(const w of k.removed)for(const x of o.decorRemoved)x({decor:w});}async function d(){if(n)return;const l=await Yf.onChangeNow(p=>{i.garden=p,a.add("garden"),c();});r.push(l);const u=await ce.subscribe("myUserSlotIdxAtom",p=>{i.mySlotIndex=p,a.add("mySlotIndex"),c();});r.push(u),n=true,a.size===s&&(e=ha(i,Do));}return d(),{get(){return e},subscribe(l,u){return o.all.add(l),u?.immediate!==false&&n&&a.size===s&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,u){return o.stable.add(l),u?.immediate!==false&&n&&a.size===s&&l(e,e),()=>o.stable.delete(l)},subscribePlantAdded(l,u){if(o.plantAdded.add(l),u?.immediate&&n&&a.size===s)for(const p of e.plants.all)l({plant:p});return ()=>o.plantAdded.delete(l)},subscribePlantRemoved(l,u){return o.plantRemoved.add(l),()=>o.plantRemoved.delete(l)},subscribePlantMatured(l,u){if(o.plantMatured.add(l),u?.immediate&&n&&a.size===s)for(const p of e.plants.mature)l({plant:p});return ()=>o.plantMatured.delete(l)},subscribeCropMutated(l,u){if(o.cropMutated.add(l),u?.immediate&&n&&a.size===s)for(const p of e.crops.mutated.all)l({crop:p,added:p.mutations,removed:[]});return ()=>o.cropMutated.delete(l)},subscribeCropMatured(l,u){if(o.cropMatured.add(l),u?.immediate&&n&&a.size===s)for(const p of e.crops.mature)l({crop:p});return ()=>o.cropMatured.delete(l)},subscribeCropHarvested(l,u){return o.cropHarvested.add(l),()=>o.cropHarvested.delete(l)},subscribeEggPlaced(l,u){if(o.eggPlaced.add(l),u?.immediate&&n&&a.size===s)for(const p of e.eggs.all)l({egg:p});return ()=>o.eggPlaced.delete(l)},subscribeEggRemoved(l,u){return o.eggRemoved.add(l),()=>o.eggRemoved.delete(l)},subscribeEggMatured(l,u){if(o.eggMatured.add(l),u?.immediate&&n&&a.size===s)for(const p of e.eggs.mature)l({egg:p});return ()=>o.eggMatured.delete(l)},subscribeDecorPlaced(l,u){if(o.decorPlaced.add(l),u?.immediate&&n&&a.size===s)for(const p of e.decors.all)l({decor:p});return ()=>o.decorPlaced.delete(l)},subscribeDecorRemoved(l,u){return o.decorRemoved.add(l),()=>o.decorRemoved.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.plantAdded.clear(),o.plantRemoved.clear(),o.plantMatured.clear(),o.cropMutated.clear(),o.cropMatured.clear(),o.cropHarvested.clear(),o.eggPlaced.clear(),o.eggRemoved.clear(),o.eggMatured.clear(),o.decorPlaced.clear(),o.decorRemoved.clear(),n=false;}}}let to=null;function El(){return to||(to=rh()),to}const rn={Gold:25,Rainbow:50,Frozen:10,Chilled:5,Wet:2},oh=new Set(["Gold","Rainbow"]),ih=new Set(["Frozen","Chilled","Wet"]);function Ml(e){let t=1,n=0,r=0;for(const o of e)o==="Gold"||o==="Rainbow"?o==="Rainbow"?t=rn.Rainbow:t===1&&(t=rn.Gold):o in rn&&(n+=rn[o],r++);return t*(1+n-r)}function ah(e){return rn[e]??null}function sh(e){return oh.has(e)}function lh(e){return ih.has(e)}function ch(e,t){const n=Li(e);if(!n)return 50;const r=n.maxScale;if(t<=1)return 50;if(t>=r)return 100;const o=(t-1)/(r-1);return Math.floor(50+50*o)}function dh(e,t,n){const r=Li(e);if(!r)return 0;const o=r.baseSellPrice,i=Ml(n);return Math.round(o*t*i)}function uh(e,t,n){if(n>=t)return 100;if(n<=e)return 0;const r=t-e,o=n-e;return Math.floor(o/r*100)}function ph(e,t){return t>=e}function Li(e){const t=de.get("plants");if(!t)return null;const n=t[e];return n?.crop?{baseSellPrice:n.crop.baseSellPrice??0,maxScale:n.crop.maxScale??1,growTime:n.crop.growTime??0}:null}const Ll=3600,no=80,fh=100,on=30;function Nr(e){return e/Ll}function Dr(e,t){const n=Pn(e);if(!n)return no;const r=n.maxScale;if(t<=1)return no;if(t>=r)return fh;const o=(t-1)/(r-1);return Math.floor(no+20*o)}function $r(e,t,n){const r=Pn(e);if(!r)return n-on;const o=r.hoursToMature,i=t/Ll,a=on/o,s=Math.min(a*i,on),c=n-on;return Math.floor(c+s)}function jr(e,t){const n=Pn(e);return n?t>=n.hoursToMature:false}function _l(e){const t=Pn(e);return t?on/t.hoursToMature:0}function mh(e,t,n){const r=t-e;return r<=0||n<=0?0:r/n}function Pn(e){const t=de.get("pets");if(!t)return null;const n=t[e];return n?{hoursToMature:n.hoursToMature??0,maxScale:n.maxScale??1,abilities:n.abilities??[]}:null}function gh(e,t){return t<=0?1:Math.min(1,e/t)}const Fl={init(){},isReady(){return  true},crop:{calculateSize:ch,calculateSellPrice:dh,calculateProgress:uh,isReady:ph,getData:Li},pet:{calculateAge:Nr,calculateMaxStrength:Dr,calculateCurrentStrength:$r,isMature:jr,calculateStrengthPerHour:_l,getData:Pn},mutation:{calculateMultiplier:Ml,getValue:ah,isGrowth:sh,isEnvironmental:lh}},ya={inventory:"myPetInventoryAtom",hutch:"myPetHutchPetItemsAtom",active:"myPetInfosAtom",slotInfos:"myPetSlotInfosAtom",expandedPetSlotId:"expandedPetSlotIdAtom",myNumPetHutchItems:"myNumPetHutchItemsAtom"};function va(e,t){const n=Nr(e.xp),r=Dr(e.petSpecies,e.targetScale),o=$r(e.petSpecies,e.xp,r),i=jr(e.petSpecies,n);return {id:e.id,petSpecies:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,mutations:[...e.mutations],targetScale:e.targetScale,abilities:[...e.abilities],location:t,position:null,lastAbilityTrigger:null,growthStage:n,currentStrength:o,maxStrength:r,isMature:i}}function hh(e,t){const r=t[e.slot.id]?.lastAbilityTrigger??null,o=Nr(e.slot.xp),i=Dr(e.slot.petSpecies,e.slot.targetScale),a=$r(e.slot.petSpecies,e.slot.xp,i),s=jr(e.slot.petSpecies,o);return {id:e.slot.id,petSpecies:e.slot.petSpecies,name:e.slot.name,xp:e.slot.xp,hunger:e.slot.hunger,mutations:[...e.slot.mutations],targetScale:e.slot.targetScale,abilities:[...e.slot.abilities],location:"active",position:e.position?{x:e.position.x,y:e.position.y}:null,lastAbilityTrigger:r,growthStage:o,currentStrength:a,maxStrength:i,isMature:s}}function xa(e){const t=new Set,n=[];for(const f of e.active??[]){const m=hh(f,e.slotInfos??{});n.push(m),t.add(m.id);}const r=[];for(const f of e.inventory??[]){if(t.has(f.id))continue;const m=va(f,"inventory");r.push(m),t.add(m.id);}const o=[];for(const f of e.hutch??[]){if(t.has(f.id))continue;const m=va(f,"hutch");o.push(m),t.add(m.id);}const i=[...n,...r,...o],a=e.expandedPetSlotId??null,s=a?i.find(f=>f.id===a)??null:null,l=El().get().decors.all.some(f=>f.decorId==="PetHutch"),u=e.myNumPetHutchItems??0;return {all:i,byLocation:{inventory:r,hutch:o,active:n},counts:{inventory:r.length,hutch:o.length,active:n.length,total:i.length},hutch:{hasHutch:l,currentItems:u,maxItems:25},expandedPetSlotId:a,expandedPet:s}}const wa={all:[],byLocation:{inventory:[],hutch:[],active:[]},counts:{inventory:0,hutch:0,active:0,total:0},hutch:{hasHutch:false,currentItems:0,maxItems:25},expandedPetSlotId:null,expandedPet:null};function bh(e,t){if(e.length!==t.length)return  false;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return  false;return  true}function ka(e){return JSON.stringify({id:e.id,petSpecies:e.petSpecies,name:e.name,mutations:e.mutations,abilities:e.abilities,location:e.location})}function yh(e,t){if(e.all.length!==t.all.length)return  false;const n=e.all.map(ka),r=t.all.map(ka);return bh(n,r)}function vh(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const i=r.get(o.id);i&&i.location!==o.location&&n.push({pet:o,from:i.location,to:o.location});}return n}function xh(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){if(!o.lastAbilityTrigger)continue;const a=r.get(o.id)?.lastAbilityTrigger;(!a||a.abilityId!==o.lastAbilityTrigger.abilityId||a.performedAt!==o.lastAbilityTrigger.performedAt)&&n.push({pet:o,trigger:o.lastAbilityTrigger});}return n}function wh(e,t){const n=new Set(e.all.map(a=>a.id)),r=new Set(t.all.map(a=>a.id)),o=t.all.filter(a=>!n.has(a.id)),i=e.all.filter(a=>!r.has(a.id));return o.length===0&&i.length===0?null:{added:o,removed:i,counts:t.counts}}function kh(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const i=r.get(o.id);i&&o.growthStage>i.growthStage&&n.push({pet:o,previousStage:i.growthStage,newStage:o.growthStage});}return n}function Sh(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const i=r.get(o.id);i&&o.currentStrength>i.currentStrength&&n.push({pet:o,previousStrength:i.currentStrength,newStrength:o.currentStrength});}return n}function Ch(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const i=r.get(o.id);i&&o.currentStrength===o.maxStrength&&i.currentStrength<i.maxStrength&&n.push({pet:o});}return n}function Ah(){let e=wa,t=wa,n=false;const r=[],o={all:new Set,stable:new Set,location:new Set,ability:new Set,count:new Set,expandedPet:new Set,growth:new Set,strengthGain:new Set,maxStrength:new Set},i={},a=Object.keys(ya),s=new Set;function c(){if(s.size<a.length)return;const l=xa(i);if(tt(e,l)||(t=e,e=l,!n))return;for(const v of o.all)v(e,t);if(!yh(t,e))for(const v of o.stable)v(e,t);const u=vh(t,e);for(const v of u)for(const k of o.location)k(v);const p=xh(t,e);for(const v of p)for(const k of o.ability)k(v);const f=wh(t,e);if(f)for(const v of o.count)v(f);const m=kh(t,e);for(const v of m)for(const k of o.growth)k(v);const g=Sh(t,e);for(const v of g)for(const k of o.strengthGain)k(v);const h=Ch(t,e);for(const v of h)for(const k of o.maxStrength)k(v);if(t.expandedPetSlotId!==e.expandedPetSlotId){const v={current:e.expandedPet,previous:t.expandedPet,currentId:e.expandedPetSlotId,previousId:t.expandedPetSlotId};for(const k of o.expandedPet)k(v);}}async function d(){if(n)return;const l=a.map(async u=>{const p=ya[u],f=await ce.subscribe(p,m=>{i[u]=m,s.add(u),c();});r.push(f);});await Promise.all(l),n=true,s.size===a.length&&(e=xa(i));}return d(),{get(){return e},subscribe(l,u){return o.all.add(l),u?.immediate!==false&&n&&s.size===a.length&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,u){return o.stable.add(l),u?.immediate!==false&&n&&s.size===a.length&&l(e,e),()=>o.stable.delete(l)},subscribeLocation(l,u){if(o.location.add(l),u?.immediate&&n&&s.size===a.length)for(const p of e.all)l({pet:p,from:p.location,to:p.location});return ()=>o.location.delete(l)},subscribeAbility(l,u){if(o.ability.add(l),u?.immediate&&n&&s.size===a.length)for(const p of e.all)p.lastAbilityTrigger&&l({pet:p,trigger:p.lastAbilityTrigger});return ()=>o.ability.delete(l)},subscribeCount(l,u){return o.count.add(l),u?.immediate&&n&&s.size===a.length&&l({added:e.all,removed:[],counts:e.counts}),()=>o.count.delete(l)},subscribeExpandedPet(l,u){return o.expandedPet.add(l),u?.immediate&&n&&s.size===a.length&&l({current:e.expandedPet,previous:e.expandedPet,currentId:e.expandedPetSlotId,previousId:e.expandedPetSlotId}),()=>o.expandedPet.delete(l)},subscribeGrowth(l,u){if(o.growth.add(l),u?.immediate&&n&&s.size===a.length)for(const p of e.all)l({pet:p,previousStage:p.growthStage,newStage:p.growthStage});return ()=>o.growth.delete(l)},subscribeStrengthGain(l,u){if(o.strengthGain.add(l),u?.immediate&&n&&s.size===a.length)for(const p of e.all)l({pet:p,previousStrength:p.currentStrength,newStrength:p.currentStrength});return ()=>o.strengthGain.delete(l)},subscribeMaxStrength(l,u){if(o.maxStrength.add(l),u?.immediate&&n&&s.size===a.length)for(const p of e.all)p.currentStrength===p.maxStrength&&l({pet:p});return ()=>o.maxStrength.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.location.clear(),o.ability.clear(),o.count.clear(),o.expandedPet.clear(),o.growth.clear(),o.strengthGain.clear(),o.maxStrength.clear(),n=false;}}}let ro=null;function Br(){return ro||(ro=Ah()),ro}const Sa={inventory:"myInventoryAtom",isFull:"isMyInventoryAtMaxLengthAtom",selectedItemIndex:"myValidatedSelectedItemIndexAtom"},Ca={items:[],favoritedItemIds:[],count:0,isFull:false,selectedItem:null};function Aa(e){const t=e.inventory,n=t?.items??[],r=t?.favoritedItemIds??[],o=e.selectedItemIndex;let i=null;return o!==null&&o>=0&&o<n.length&&(i={index:o,item:n[o]}),{items:n,favoritedItemIds:r,count:n.length,isFull:e.isFull??false,selectedItem:i}}function Ta(e){const t=e.items.map(n=>"id"in n?n.id:"species"in n&&n.itemType==="Seed"?`seed:${n.species}:${n.quantity}`:"toolId"in n?`tool:${n.toolId}:${n.quantity}`:"eggId"in n?`egg:${n.eggId}:${n.quantity}`:"decorId"in n?`decor:${n.decorId}:${n.quantity}`:JSON.stringify(n));return JSON.stringify({itemKeys:t,favoritedItemIds:e.favoritedItemIds,isFull:e.isFull,selectedItemIndex:e.selectedItem?.index??null})}function Th(e,t){return Ta(e)===Ta(t)}function Ih(e,t){return e===null&&t===null?false:e===null||t===null?true:e.index!==t.index}function Yn(e){return "id"in e?e.id:"species"in e&&e.itemType==="Seed"?`seed:${e.species}`:"toolId"in e?`tool:${e.toolId}`:"eggId"in e?`egg:${e.eggId}`:"decorId"in e?`decor:${e.decorId}`:JSON.stringify(e)}function Ph(e,t){const n=new Set(e.map(Yn)),r=new Set(t.map(Yn)),o=t.filter(a=>!n.has(Yn(a))),i=e.filter(a=>!r.has(Yn(a)));return o.length===0&&i.length===0?null:{added:o,removed:i,counts:{before:e.length,after:t.length}}}function Eh(e,t){const n=new Set(e),r=new Set(t),o=t.filter(a=>!n.has(a)),i=e.filter(a=>!r.has(a));return o.length===0&&i.length===0?null:{added:o,removed:i,current:t}}function Mh(){let e=Ca,t=Ca,n=false;const r=[],o={all:new Set,stable:new Set,selection:new Set,items:new Set,favorites:new Set},i={},a=Object.keys(Sa),s=new Set;function c(){if(s.size<a.length)return;const l=Aa(i);if(tt(e,l)||(t=e,e=l,!n))return;for(const f of o.all)f(e,t);if(!Th(t,e))for(const f of o.stable)f(e,t);if(Ih(t.selectedItem,e.selectedItem)){const f={current:e.selectedItem,previous:t.selectedItem};for(const m of o.selection)m(f);}const u=Ph(t.items,e.items);if(u)for(const f of o.items)f(u);const p=Eh(t.favoritedItemIds,e.favoritedItemIds);if(p)for(const f of o.favorites)f(p);}async function d(){if(n)return;const l=a.map(async u=>{const p=Sa[u],f=await ce.subscribe(p,m=>{i[u]=m,s.add(u),c();});r.push(f);});await Promise.all(l),n=true,s.size===a.length&&(e=Aa(i));}return d(),{get(){return e},subscribe(l,u){return o.all.add(l),u?.immediate!==false&&n&&s.size===a.length&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,u){return o.stable.add(l),u?.immediate!==false&&n&&s.size===a.length&&l(e,e),()=>o.stable.delete(l)},subscribeSelection(l,u){return o.selection.add(l),u?.immediate&&n&&s.size===a.length&&l({current:e.selectedItem,previous:e.selectedItem}),()=>o.selection.delete(l)},subscribeItems(l,u){return o.items.add(l),u?.immediate&&n&&s.size===a.length&&l({added:e.items,removed:[],counts:{before:0,after:e.count}}),()=>o.items.delete(l)},subscribeFavorites(l,u){return o.favorites.add(l),u?.immediate&&n&&s.size===a.length&&l({added:e.favoritedItemIds,removed:[],current:e.favoritedItemIds}),()=>o.favorites.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.selection.clear(),o.items.clear(),o.favorites.clear(),n=false;}}}let oo=null;function Lt(){return oo||(oo=Mh()),oo}const jo={all:[],host:null,myPlayer:null,count:0};function Lh(e,t,n){const r=n.get(e.id),o=r?.slot,i=o?.data,a=o?.lastActionEvent;return {id:e.id,name:e.name,discordId:e.databaseUserId,discordAvatarUrl:e.discordAvatarUrl,guildId:e.guildId,isConnected:e.isConnected,isHost:e.id===t,slotIndex:r?.index??null,position:o?.position??null,cosmetic:{color:e.cosmetic?.color??"",avatar:e.cosmetic?.avatar?[...e.cosmetic.avatar]:[]},emote:{type:e.emoteData?.emoteType??-1},coins:i?.coinsCount??0,inventory:i?.inventory??null,shopPurchases:i?.shopPurchases??null,garden:i?.garden??null,pets:{slots:i?.petSlots??[],slotInfos:o?.petSlotInfos??null},journal:i?.journal??null,stats:i?.stats??null,tasksCompleted:i?.tasksCompleted??[],activityLogs:i?.activityLogs??[],customRestocks:{config:i?.customRestocks??null,inventories:o?.customRestockInventories??null},lastAction:a?{type:a.action,data:a.data,timestamp:a.timestamp}:null,selectedItemIndex:o?.notAuthoritative_selectedItemIndex??null,lastSlotMachineInfo:o?.lastSlotMachineInfo??null}}function Ia(e){const t=e.players,n=e.hostPlayerId??"",r=e.userSlots??[],o=e.myUserSlotIndex;if(!t||!Array.isArray(t)||t.length===0)return jo;const i=new Map;Array.isArray(r)&&r.forEach((d,l)=>{d?.type==="user"&&d?.playerId&&i.set(d.playerId,{slot:d,index:l});});const a=t.map(d=>Lh(d,n,i)),s=a.find(d=>d.isHost)??null,c=o!==null?a.find(d=>d.slotIndex===o)??null:null;return {all:a,host:s,myPlayer:c,count:a.length}}function Pa(e){const t=e.all.map(n=>`${n.id}:${n.isConnected}:${n.isHost}`);return JSON.stringify({playerKeys:t,hostId:e.host?.id??null,count:e.count})}function _h(e,t){const n=[],r=new Set(e.map(i=>i.id)),o=new Set(t.map(i=>i.id));for(const i of t)r.has(i.id)||n.push({player:i,type:"join"});for(const i of e)o.has(i.id)||n.push({player:i,type:"leave"});return n}function Fh(e,t){const n=[],r=new Map(e.map(o=>[o.id,o]));for(const o of t){const i=r.get(o.id);i&&i.isConnected!==o.isConnected&&n.push({player:o,isConnected:o.isConnected});}return n}function Oh(){let e=jo,t=jo,n=false;const r=[],o={all:new Set,stable:new Set,joinLeave:new Set,connection:new Set,host:new Set},i={},a=new Set,s=4;function c(){if(a.size<s)return;const l=Ia(i);if(tt(e,l)||(t=e,e=l,!n))return;for(const g of o.all)g(e,t);if(Pa(t)!==Pa(e))for(const g of o.stable)g(e,t);const u=_h(t.all,e.all);for(const g of u)for(const h of o.joinLeave)h(g);const p=Fh(t.all,e.all);for(const g of p)for(const h of o.connection)h(g);const f=t.host?.id??null,m=e.host?.id??null;if(f!==m){const g={current:e.host,previous:t.host};for(const h of o.host)h(g);}}async function d(){if(n)return;const l=await Vf.onChangeNow(m=>{i.players=m,a.add("players"),c();});r.push(l);const u=await Kf.onChangeNow(m=>{i.hostPlayerId=m,a.add("hostPlayerId"),c();});r.push(u);const p=await Uf.onChangeNow(m=>{i.userSlots=m,a.add("userSlots"),c();});r.push(p);const f=await ce.subscribe("myUserSlotIdxAtom",m=>{i.myUserSlotIndex=m,a.add("myUserSlotIndex"),c();});r.push(f),n=true,a.size===s&&(e=Ia(i));}return d(),{get(){return e},subscribe(l,u){return o.all.add(l),u?.immediate!==false&&n&&a.size===s&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,u){return o.stable.add(l),u?.immediate!==false&&n&&a.size===s&&l(e,e),()=>o.stable.delete(l)},subscribeJoinLeave(l,u){if(o.joinLeave.add(l),u?.immediate&&n&&a.size===s)for(const p of e.all)l({player:p,type:"join"});return ()=>o.joinLeave.delete(l)},subscribeConnection(l,u){if(o.connection.add(l),u?.immediate&&n&&a.size===s)for(const p of e.all)l({player:p,isConnected:p.isConnected});return ()=>o.connection.delete(l)},subscribeHost(l,u){return o.host.add(l),u?.immediate&&n&&a.size===s&&l({current:e.host,previous:e.host}),()=>o.host.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.joinLeave.clear(),o.connection.clear(),o.host.clear(),n=false;}}}let io=null;function Ol(){return io||(io=Oh()),io}const En=["seed","tool","egg","decor"];function Rh(e,t){switch(t){case "seed":return e.species??e.itemType;case "tool":return e.toolId??e.itemType;case "egg":return e.eggId??e.itemType;case "decor":return e.decorId??e.itemType;default:return e.itemType}}function Nh(e,t,n){const r=Rh(e,t),o=n[r]??0,i=Math.max(0,e.initialStock-o);return {id:r,itemType:e.itemType,initialStock:e.initialStock,purchased:o,remaining:i,isAvailable:i>0}}function Dh(e,t,n){if(!t)return {type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null};const o=n[e]?.purchases??{},i=(t.inventory??[]).map(d=>Nh(d,e,o)),a=i.filter(d=>d.isAvailable).length,s=t.secondsUntilRestock??0,c=s>0?Date.now()+s*1e3:null;return {type:e,items:i,availableCount:a,totalCount:i.length,secondsUntilRestock:s,restockAt:c}}function Ea(e){const t=e.shops,n=e.purchases??{},r=En.map(s=>Dh(s,t?.[s],n)),o={seed:r[0],tool:r[1],egg:r[2],decor:r[3]},i=r.filter(s=>s.restockAt!==null);let a=null;if(i.length>0){const c=i.sort((d,l)=>(d.restockAt??0)-(l.restockAt??0))[0];a={shop:c.type,seconds:c.secondsUntilRestock,at:c.restockAt};}return {all:r,byType:o,nextRestock:a}}const Ma={all:En.map(e=>({type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null})),byType:{seed:{type:"seed",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},tool:{type:"tool",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},egg:{type:"egg",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},decor:{type:"decor",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null}},nextRestock:null};function La(e){return JSON.stringify({shops:e.all.map(t=>({type:t.type,itemCount:t.items.length,availableCount:t.availableCount}))})}function $h(e,t){const n=e.secondsUntilRestock,r=t.secondsUntilRestock;return n>0&&n<=5&&r>n||n>0&&r===0&&t.items.some(i=>i.purchased===0)?{shop:t,previousItems:e.items}:null}function jh(e,t){const n=[];for(const r of En){const o=e.byType[r],i=t.byType[r],a=new Map(o.items.map(s=>[s.id,s]));for(const s of i.items){const c=a.get(s.id);c&&s.purchased>c.purchased&&n.push({shopType:r,itemId:s.id,quantity:s.purchased-c.purchased,newPurchased:s.purchased,remaining:s.remaining});}}return n}function Bh(e,t){const n=[];for(const r of En){const o=e.byType[r],i=t.byType[r],a=new Map(o.items.map(s=>[s.id,s]));for(const s of i.items){const c=a.get(s.id);c&&c.isAvailable!==s.isAvailable&&n.push({shopType:r,itemId:s.id,wasAvailable:c.isAvailable,isAvailable:s.isAvailable});}}return n}function zh(){let e=Ma,t=Ma,n=false;const r=[],o={all:new Set,stable:new Set,seedRestock:new Set,toolRestock:new Set,eggRestock:new Set,decorRestock:new Set,purchase:new Set,availability:new Set},i={},a=new Set,s=2;function c(){if(a.size<s)return;const l=Ea(i);if(tt(e,l)||(t=e,e=l,!n))return;for(const m of o.all)m(e,t);if(La(t)!==La(e))for(const m of o.stable)m(e,t);const u={seed:o.seedRestock,tool:o.toolRestock,egg:o.eggRestock,decor:o.decorRestock};for(const m of En){const g=$h(t.byType[m],e.byType[m]);if(g)for(const h of u[m])h(g);}const p=jh(t,e);for(const m of p)for(const g of o.purchase)g(m);const f=Bh(t,e);for(const m of f)for(const g of o.availability)g(m);}async function d(){if(n)return;const l=await qf.onChangeNow(p=>{i.shops=p,a.add("shops"),c();});r.push(l);const u=await Xf.onChangeNow(p=>{i.purchases=p,a.add("purchases"),c();});r.push(u),n=true,a.size===s&&(e=Ea(i));}return d(),{get(){return e},getShop(l){return e.byType[l]},getItem(l,u){return e.byType[l].items.find(f=>f.id===u)??null},subscribe(l,u){return o.all.add(l),u?.immediate!==false&&n&&a.size===s&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,u){return o.stable.add(l),u?.immediate!==false&&n&&a.size===s&&l(e,e),()=>o.stable.delete(l)},subscribeSeedRestock(l,u){return o.seedRestock.add(l),u?.immediate&&n&&a.size===s&&l({shop:e.byType.seed,previousItems:[]}),()=>o.seedRestock.delete(l)},subscribeToolRestock(l,u){return o.toolRestock.add(l),u?.immediate&&n&&a.size===s&&l({shop:e.byType.tool,previousItems:[]}),()=>o.toolRestock.delete(l)},subscribeEggRestock(l,u){return o.eggRestock.add(l),u?.immediate&&n&&a.size===s&&l({shop:e.byType.egg,previousItems:[]}),()=>o.eggRestock.delete(l)},subscribeDecorRestock(l,u){return o.decorRestock.add(l),u?.immediate&&n&&a.size===s&&l({shop:e.byType.decor,previousItems:[]}),()=>o.decorRestock.delete(l)},subscribePurchase(l,u){if(o.purchase.add(l),u?.immediate&&n&&a.size===s)for(const p of e.all)for(const f of p.items)f.purchased>0&&l({shopType:p.type,itemId:f.id,quantity:f.purchased,newPurchased:f.purchased,remaining:f.remaining});return ()=>o.purchase.delete(l)},subscribeAvailability(l,u){if(o.availability.add(l),u?.immediate&&n&&a.size===s)for(const p of e.all)for(const f of p.items)l({shopType:p.type,itemId:f.id,wasAvailable:f.isAvailable,isAvailable:f.isAvailable});return ()=>o.availability.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.seedRestock.clear(),o.toolRestock.clear(),o.eggRestock.clear(),o.decorRestock.clear(),o.purchase.clear(),o.availability.clear(),n=false;}}}let ao=null;function Gh(){return ao||(ao=zh()),ao}const Wh=["Sunny","Rain","Frost","Dawn","AmberMoon"];function Hh(e){return Wh.includes(e)}const Bo={type:"Sunny",isActive:false,startTime:null,endTime:null,remainingSeconds:0};function Uh(e){if(!e)return Bo;const t=Date.now(),n=e.endTime??0,r=Math.max(0,n-t),o=Math.floor(r/1e3),i=o>0,a=e.type??"Sunny";return {type:Hh(a)?a:"Sunny",isActive:i,startTime:e.startTime??null,endTime:e.endTime??null,remainingSeconds:o}}function Vh(){let e=Bo,t=Bo,n=false,r=null;const o={all:new Set,change:new Set};function i(s){const c=Uh(s);if(e.type===c.type&&e.isActive===c.isActive&&e.startTime===c.startTime&&e.endTime===c.endTime){e=c;return}if(t=e,e=c,!!n){for(const d of o.all)d(e,t);if(t.type!==e.type||t.isActive!==e.isActive){const d={current:e,previous:t};for(const l of o.change)l(d);}}}async function a(){n||(r=await Jf.onChangeNow(s=>{i(s);}),n=true);}return a(),{get(){return e},subscribe(s,c){return o.all.add(s),c?.immediate!==false&&n&&s(e,e),()=>o.all.delete(s)},subscribeChange(s,c){return o.change.add(s),c?.immediate&&n&&s({current:e,previous:e}),()=>o.change.delete(s)},destroy(){r?.(),r=null,o.all.clear(),o.change.clear(),n=false;}}}let so=null;function Kh(){return so||(so=Vh()),so}let ke=null;function Rl(){return ke||(ke={currentTile:Wg(),myPets:Br(),gameMap:Do(),myInventory:Lt(),players:Ol(),shops:Gh(),weather:Kh(),myGarden:El()},ke)}function rt(){if(!ke)throw new Error("[Globals] Not initialized. Call initGlobals() first.");return ke}function Yh(){ke&&(ke.currentTile.destroy(),ke.myPets.destroy(),ke.gameMap.destroy(),ke.myInventory.destroy(),ke.players.destroy(),ke.shops.destroy(),ke.weather.destroy(),ke.myGarden.destroy(),ke=null);}const ot={get currentTile(){return rt().currentTile},get myPets(){return rt().myPets},get gameMap(){return rt().gameMap},get myInventory(){return rt().myInventory},get players(){return rt().players},get shops(){return rt().shops},get weather(){return rt().weather},get myGarden(){return rt().myGarden}},qh=100,lo=[];function zo(e,t,n){let r="";if(n&&typeof n=="object"){if(t==="PartialState"){const o=n.op||"",i=n.path||"";let a="";if("value"in n){const s=n.value;a=typeof s=="object"?`{${Object.keys(s||{}).slice(0,2).join(",")}}`:String(s);}if(o||i)r=`PartialState : ${o} ${i} ${a}`.trim();else {const s=Object.keys(n).filter(c=>c!=="type");s.length>0&&(r=`PartialState - {${s.join(", ")}}`);}}if(!r&&n.event&&(r+=`${n.event} `),!r&&n.op&&(r+=`op:${n.op} `),!r&&n.data){const o=Object.keys(n.data);o.length>0&&(r+=`{${o.slice(0,3).join(",")}${o.length>3?"...":""}}`);}else !r&&Array.isArray(n)&&(r+=`[${n.length} items]`);}else typeof n=="string"&&(r=n.slice(0,50));lo.push({direction:e,type:String(t),timestamp:Date.now(),payload:n,summary:r.trim()||"-"}),lo.length>qh&&lo.shift();}const Pe={nativeCtor:null,captured:[],latestOpen:null},_a=Symbol.for("ariesmod.ws.capture.wrapped"),Fa=Symbol.for("ariesmod.ws.capture.native"),Nl=1;function Go(e){return !!e&&e.readyState===Nl}function Xh(){if(Go(Pe.latestOpen))return Pe.latestOpen;for(let e=Pe.captured.length-1;e>=0;e--){const t=Pe.captured[e];if(Go(t))return t}return null}function Jh(e,t){Pe.captured.push(e),Pe.captured.length>25&&Pe.captured.splice(0,Pe.captured.length-25);const n=()=>{Pe.latestOpen=e,t&&console.log("[WS] captured socket opened",e.url);};e.addEventListener("open",n),e.addEventListener("close",()=>{Pe.latestOpen===e&&(Pe.latestOpen=null),t&&console.log("[WS] captured socket closed",e.url);}),e.addEventListener("message",r=>{try{const o=JSON.parse(r.data);zo("in",o.type||"unknown",o);}catch{zo("in","raw",r.data);}}),e.readyState===Nl&&n();}function Qh(e=L,t={}){const n=!!t.debug,r=e?.WebSocket;if(typeof r!="function")return ()=>{};if(r[_a])return Pe.nativeCtor=r[Fa]??Pe.nativeCtor??null,()=>{};const o=r;Pe.nativeCtor=o;function i(a,s){const c=s!==void 0?new o(a,s):new o(a);try{Jh(c,n);}catch{}return c}try{i.prototype=o.prototype;}catch{}try{Object.setPrototypeOf(i,o);}catch{}try{i.CONNECTING=o.CONNECTING,i.OPEN=o.OPEN,i.CLOSING=o.CLOSING,i.CLOSED=o.CLOSED;}catch{}i[_a]=true,i[Fa]=o;try{e.WebSocket=i,n&&console.log("[WS] WebSocket capture installed");}catch{return ()=>{}}return ()=>{try{e.WebSocket===i&&(e.WebSocket=o);}catch{}}}function Zh(e=L){const t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function Ar(e=L){const t=Xh();if(t)return {ws:t,source:"captured"};const n=Zh(e);return n?{ws:n,source:"roomConnection"}:{ws:null,source:null}}function Dl(e,t={}){const n=t.pageWindow??L,r=t.intervalMs??500,o=!!t.debug;let i=null,a=null;const s=()=>{const d=Ar(n);(d.ws!==i||d.source!==a)&&(i=d.ws,a=d.source,o&&console.log("[WS] best socket changed:",d.source,d.ws),e(d));};s();const c=setInterval(s,r);return ()=>clearInterval(c)}function eb(e){if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return null}}function tb(e,t=L){const n=t?.MagicCircle_RoomConnection;if(n&&typeof n.sendMessage=="function")try{return Array.isArray(e)?n.sendMessage(...e):n.sendMessage(e),{ok:!0}}catch(i){return {ok:false,reason:"error",error:i}}const{ws:r}=Ar(t);if(!r)return {ok:false,reason:"no-ws"};if(!Go(r))return {ok:false,reason:"not-open"};const o=eb(e);if(o==null)return {ok:false,reason:"error",error:new Error("Cannot stringify message")};try{const i=JSON.parse(o);zo("out",i.type||"unknown",i);}catch{}try{return r.send(o),{ok:!0}}catch(i){return {ok:false,reason:"error",error:i}}}function nb(e,t={},n=L){return tb({type:e,...t},n)}const at={Welcome:"Welcome",PartialState:"PartialState",ServerErrorMessage:"ServerErrorMessage",Config:"Config",InappropriateContentRejected:"InappropriateContentRejected",Emote:"Emote",CurrencyTransaction:"CurrencyTransaction",Pong:"Pong"},M={Chat:"Chat",Emote:"Emote",Wish:"Wish",KickPlayer:"KickPlayer",SetPlayerData:"SetPlayerData",UsurpHost:"UsurpHost",Dev:"Dev",SetSelectedGame:"SetSelectedGame",VoteForGame:"VoteForGame",RequestGame:"RequestGame",RestartGame:"RestartGame",Ping:"Ping",PlayerPosition:"PlayerPosition",Teleport:"Teleport",CheckWeatherStatus:"CheckWeatherStatus",MoveInventoryItem:"MoveInventoryItem",DropObject:"DropObject",PickupObject:"PickupObject",ToggleFavoriteItem:"ToggleFavoriteItem",PutItemInStorage:"PutItemInStorage",RetrieveItemFromStorage:"RetrieveItemFromStorage",MoveStorageItem:"MoveStorageItem",LogItems:"LogItems",PlantSeed:"PlantSeed",WaterPlant:"WaterPlant",HarvestCrop:"HarvestCrop",SellAllCrops:"SellAllCrops",PurchaseSeed:"PurchaseSeed",PurchaseEgg:"PurchaseEgg",PurchaseTool:"PurchaseTool",PurchaseDecor:"PurchaseDecor",PlantEgg:"PlantEgg",HatchEgg:"HatchEgg",PlantGardenPlant:"PlantGardenPlant",PotPlant:"PotPlant",MutationPotion:"MutationPotion",PickupDecor:"PickupDecor",PlaceDecor:"PlaceDecor",RemoveGardenObject:"RemoveGardenObject",PlacePet:"PlacePet",FeedPet:"FeedPet",PetPositions:"PetPositions",SwapPet:"SwapPet",StorePet:"StorePet",NamePet:"NamePet",SellPet:"SellPet",ReportSpeakingStart:"ReportSpeakingStart"};var qe=(e=>(e[e.ReconnectInitiated=4100]="ReconnectInitiated",e[e.PlayerLeftVoluntarily=4200]="PlayerLeftVoluntarily",e[e.UserSessionSuperseded=4250]="UserSessionSuperseded",e[e.ConnectionSuperseded=4300]="ConnectionSuperseded",e[e.ServerDisposed=4310]="ServerDisposed",e[e.HeartbeatExpired=4400]="HeartbeatExpired",e[e.PlayerKicked=4500]="PlayerKicked",e[e.VersionMismatch=4700]="VersionMismatch",e[e.VersionExpired=4710]="VersionExpired",e[e.AuthenticationFailure=4800]="AuthenticationFailure",e))(qe||{});new Set(Object.values(at));new Set(Object.values(M));const rb=["Room","Quinoa"],ob={Room:["Room"],Quinoa:rb};function q(e,t={},n=L){const r=t,{scopePath:o,scope:i,...a}=r,s=typeof o=="string"?o:i,c=Array.isArray(o)?o:s==="Room"||s==="Quinoa"?ob[s]:null;return nb(e,c?{scopePath:c,...a}:a,n)}function ib(e,t=L){return q(M.Chat,{scope:"Room",message:e},t)}function ab(e,t=L){return q(M.Emote,{scope:"Room",emoteType:e},t)}function sb(e,t=L){return q(M.Wish,{scope:"Quinoa",wish:e},t)}function lb(e,t=L){return q(M.KickPlayer,{scope:"Room",playerId:e},t)}function cb(e,t=L){return q(M.SetPlayerData,{scope:"Room",data:e},t)}function db(e=L){return q(M.UsurpHost,{scope:"Quinoa"},e)}function ub(e=L){return q(M.ReportSpeakingStart,{scope:"Quinoa"},e)}function pb(e,t=L){return q(M.SetSelectedGame,{scope:"Room",gameId:e},t)}function fb(e,t=L){return q(M.VoteForGame,{scope:"Room",gameId:e},t)}function mb(e,t=L){return q(M.RequestGame,{scope:"Room",gameId:e},t)}function gb(e=L){return q(M.RestartGame,{scope:"Room"},e)}function hb(e,t=L){return q(M.Ping,{scope:"Quinoa",id:e},t)}function $l(e,t,n=L){return q(M.PlayerPosition,{scope:"Quinoa",x:e,y:t},n)}const bb=$l;function yb(e,t,n=L){return q(M.Teleport,{scope:"Quinoa",x:e,y:t},n)}function vb(e=L){return q(M.CheckWeatherStatus,{scope:"Quinoa"},e)}function xb(e,t,n=L){return q(M.MoveInventoryItem,{scope:"Quinoa",fromIndex:e,toIndex:t},n)}function wb(e,t=L){return q(M.DropObject,{scope:"Quinoa",slotIndex:e},t)}function kb(e,t=L){return q(M.PickupObject,{scope:"Quinoa",objectId:e},t)}function zr(e,t=L){return q(M.ToggleFavoriteItem,{scope:"Quinoa",itemId:e},t)}function _i(e,t="PetHutch",n=L){return q(M.PutItemInStorage,{scope:"Quinoa",itemId:e,storageId:t},n)}function Fi(e,t="PetHutch",n=L){return q(M.RetrieveItemFromStorage,{scope:"Quinoa",itemId:e,storageId:t},n)}function Sb(e,t,n=L){return q(M.MoveStorageItem,{scope:"Quinoa",fromIndex:e,toIndex:t},n)}function Cb(e=L){return q(M.LogItems,{scope:"Quinoa"},e)}function Ab(e,t,n,r=L){return q(M.PlantSeed,{scope:"Quinoa",seedId:e,x:t,y:n},r)}function Tb(e,t=L){return q(M.WaterPlant,{scope:"Quinoa",plantId:e},t)}function Ib(e,t=L){return q(M.HarvestCrop,{scope:"Quinoa",cropId:e},t)}function Pb(e=L){return q(M.SellAllCrops,{scope:"Quinoa"},e)}function Eb(e,t=L){return q(M.PurchaseDecor,{scope:"Quinoa",decorId:e},t)}function Mb(e,t=L){return q(M.PurchaseEgg,{scope:"Quinoa",eggId:e},t)}function Lb(e,t=L){return q(M.PurchaseTool,{scope:"Quinoa",toolId:e},t)}function _b(e,t=L){return q(M.PurchaseSeed,{scope:"Quinoa",seedId:e},t)}function Fb(e,t,n,r=L){return q(M.PlantEgg,{scope:"Quinoa",eggId:e,x:t,y:n},r)}function Ob(e,t=L){return q(M.HatchEgg,{scope:"Quinoa",eggId:e},t)}function Rb(e,t,n,r=L){return q(M.PlantGardenPlant,{scope:"Quinoa",plantId:e,x:t,y:n},r)}function Nb(e,t,n=L){return q(M.PotPlant,{scope:"Quinoa",plantId:e,potId:t},n)}function Db(e,t,n=L){return q(M.MutationPotion,{scope:"Quinoa",potionId:e,targetId:t},n)}function $b(e,t=L){return q(M.PickupDecor,{scope:"Quinoa",decorInstanceId:e},t)}function jb(e,t,n,r=L){return q(M.PlaceDecor,{scope:"Quinoa",decorId:e,x:t,y:n},r)}function Bb(e,t=L){return q(M.RemoveGardenObject,{scope:"Quinoa",objectId:e},t)}function jl(e,t={x:0,y:0},n="Dirt",r=0,o=L){return q(M.PlacePet,{scope:"Quinoa",itemId:e,position:t,tileType:n,localTileIndex:r},o)}function zb(e,t,n=L){return q(M.FeedPet,{scope:"Quinoa",petId:e,foodItemId:t},n)}function Gb(e,t=L){return q(M.PetPositions,{scope:"Quinoa",positions:e},t)}function Bl(e,t,n=L){return q(M.SwapPet,{scope:"Quinoa",petSlotId:e,petInventoryId:t},n)}function zl(e,t=L){return q(M.StorePet,{scope:"Quinoa",itemId:e},t)}function Wb(e,t,n=L){return q(M.NamePet,{scope:"Quinoa",petId:e,name:t},n)}function Hb(e,t=L){return q(M.SellPet,{scope:"Quinoa",petId:e},t)}let fr=null;const gn=new Set;function Wo(){const e=Pt();if(!e.enabled){console.log("[AutoFavorite] Disabled");return}gn.clear(),fr=Lt().subscribeItems(t=>{if(t.added.length>0){const n=Pt();for(const r of t.added)Vb(r,n);}}),console.log(`✅ [AutoFavorite] Started - Watching ${e.simple.favoriteSpecies.length} species, ${e.simple.favoriteMutations.length} mutations`);}function Gl(){fr&&(fr(),fr=null),gn.clear(),console.log("🛑 [AutoFavorite] Stopped");}function Ub(e){const t=Pt();t.enabled=e,t.simple.enabled=e,Il(t),e?Wo():Gl();}function Vb(e,t){if(e.itemType!=="Produce"&&e.itemType!=="Pet")return;if(!e.id){console.warn("[AutoFavorite] Item has no ID:",e);return}if(!(gn.has(e.id)||e.isFavorited||e.favorited)&&Wl(e,t.simple)){gn.add(e.id);try{zr(e.id),console.log(`[AutoFavorite] ⭐ Favorited ${e.itemType}: ${e.species||e.id}`);}catch(r){console.error("[AutoFavorite] WebSocket error:",r),gn.delete(e.id);}}}function Wl(e,t){if(!t.enabled)return  false;const n=e.itemType==="Pet"?e.petSpecies:e.species;return n?!!(t.favoriteSpecies.includes(n)||t.favoriteMutations.length>0&&(e.mutations||[]).some(o=>t.favoriteMutations.includes(o))):false}function Kb(){return Object.keys(de.get("mutations")??{})}const Oi={init(){this.isReady()||Wo();},isReady(){return da()},DEFAULT_CONFIG:Tl,STORAGE_KEY:Pi,loadConfig:Pt,saveConfig:Ei,updateConfig:Il,updateSimpleConfig:Mi,setFavoriteSpecies:_g,setFavoriteMutations:Fg,isEnabled:da,start:Wo,stop:Gl,setEnabled:Ub,shouldFavorite:Wl,getGameMutations:Kb},Ri=Me.JOURNAL_CHECKER,Hl={enabled:false,autoRefresh:true,refreshIntervalMs:3e4};function Yt(){return Te(Ri,Hl)}function Gr(e){je(Ri,e);}function Oa(){return Yt().enabled}function Yb(e){const t=Yt();t.autoRefresh=e,Gr(t);}function qb(e){const t=Yt();t.refreshIntervalMs=e,Gr(t);}let co=null,Ra=null;function Ul(){try{return Ol().get().myPlayer?.journal||null}catch{return null}}function Xb(e){return e?`pro:${Object.keys(e.produce).length}-pet:${Object.keys(e.pets).length}`:"null"}function Vl(){const e=de.get("mutations")??{};return ["Normal",...Object.keys(e),"Max Weight"]}function Kl(){const e=de.get("mutations")??{};return ["Normal",...Object.entries(e).filter(([n,r])=>!("tileRef"in r)).map(([n])=>n),"Max Weight"]}function Jb(){return Object.keys(de.get("mutations")??{})}function Yl(e){const n=(de.get("pets")??{})[e];if(!n)return [];const r=new Set;return Array.isArray(n.abilities)&&n.abilities.forEach(o=>r.add(o)),Array.isArray(n.possibleAbilities)&&n.possibleAbilities.forEach(o=>r.add(o)),n.abilityTiers&&Object.values(n.abilityTiers).forEach(o=>{Array.isArray(o)&&o.forEach(i=>r.add(i));}),[...r]}function ql(e){const t=de.get("plants")??{},n=Object.keys(t),r=Vl(),o=e?.produce??{},i=[];let a=0;for(const d of n){const u=o[d]?.variantsLogged?.map(f=>f.variant)??[],p=r.filter(f=>!u.includes(f));a+=u.length,i.push({species:d,variantsLogged:u,variantsMissing:p,variantsTotal:r.length,variantsPercentage:r.length>0?u.length/r.length*100:0,isComplete:p.length===0});}const s=n.length*r.length,c=i.filter(d=>d.variantsLogged.length>0).length;return {total:n.length,logged:c,percentage:n.length>0?c/n.length*100:0,speciesDetails:i,variantsTotal:s,variantsLogged:a,variantsPercentage:s>0?a/s*100:0}}function Xl(e){const t=de.get("pets")??{},n=Object.keys(t),r=Kl(),o=e?.pets??{},i=[];let a=0,s=0,c=0,d=0;for(const u of n){const p=o[u],f=p?.variantsLogged?.map(k=>k.variant)??[],m=p?.abilitiesLogged?.map(k=>k.ability)??[],g=r.filter(k=>!f.includes(k)),h=Yl(u),v=h.filter(k=>!m.includes(k));s+=r.length,a+=f.length,d+=h.length,c+=Math.min(m.length,h.length),i.push({species:u,variantsLogged:f,variantsMissing:g,variantsTotal:r.length,variantsPercentage:r.length>0?f.length/r.length*100:0,abilitiesLogged:m,abilitiesMissing:v,abilitiesTotal:h.length,abilitiesPercentage:h.length>0?m.length/h.length*100:0,isComplete:g.length===0&&(h.length===0||v.length===0)});}const l=i.filter(u=>u.variantsLogged.length>0).length;return {total:n.length,logged:l,percentage:n.length>0?l/n.length*100:0,speciesDetails:i,variantsTotal:s,variantsLogged:a,variantsPercentage:s>0?a/s*100:0,abilitiesTotal:d,abilitiesLogged:c,abilitiesPercentage:d>0?c/d*100:0}}async function Wr(e=false){await de.waitForAny();const t=Ul(),n=Xb(t);if(!e&&co&&n===Ra)return co;const r={plants:ql(t),pets:Xl(t),lastUpdated:Date.now()};return co=r,Ra=n,r}async function Qb(){const e=await Wr();return {plants:e.plants.speciesDetails.filter(t=>t.variantsMissing.length>0).map(t=>({species:t.species,missing:t.variantsMissing})),pets:e.pets.speciesDetails.filter(t=>t.variantsMissing.length>0||(t.abilitiesMissing?.length??0)>0).map(t=>({species:t.species,missingVariants:t.variantsMissing,missingAbilities:t.abilitiesMissing??[]}))}}let hn=null;function Ho(){const e=Yt();e.enabled&&(e.autoRefresh&&!hn&&(hn=setInterval(async()=>{const t=await Wr();Ni(t);},e.refreshIntervalMs)),console.log("✅ [JournalChecker] Started"));}function Jl(){hn&&(clearInterval(hn),hn=null);}function Zb(e){const t=Yt();t.enabled=e,Gr(t),e?Ho():Jl();}function Ni(e){window.dispatchEvent(new CustomEvent("gemini:journal-updated",{detail:e}));}async function ey(){const e=await Wr();return Ni(e),e}const Ql={init(){this.isReady()||Ho();},isReady(){return Oa()},DEFAULT_CONFIG:Hl,STORAGE_KEY:Ri,loadConfig:Yt,saveConfig:Gr,isEnabled:Oa,setAutoRefresh:Yb,setRefreshInterval:qb,getMyJournal:Ul,getCropVariants:Vl,getPetVariants:Kl,getAllMutations:Jb,getPetAbilities:Yl,calculateProduceProgress:ql,calculatePetProgress:Xl,aggregateJournalProgress:Wr,getMissingSummary:Qb,start:Ho,stop:Jl,setEnabled:Zb,refresh:ey,dispatchUpdate:Ni},Di=Me.BULK_FAVORITE,Zl={enabled:false,position:"top-right"};function Mn(){return Te(Di,Zl)}function ec(e){je(Di,e);}function ty(e){const t=Mn();t.position=e,ec(t);}function tc(){return Mn().enabled}function ny(e){return typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"}async function ry(e){const t=Lt().get();if(!t?.items)return console.warn("[BulkFavorite] No inventory data available"),0;const n=new Set(t.favoritedItemIds??[]);let r=0;for(const o of t.items){if(!ny(o))continue;const i=n.has(o.id);e&&i||!e&&!i||(await zr(o.id,e),r++,await oy(50));}return console.log(`[BulkFavorite] ${e?"Favorited":"Unfavorited"} ${r} items`),r}function oy(e){return new Promise(t=>setTimeout(t,e))}let qn=false;const Tr={init(){qn||(qn=true,console.log("✅ [MGBulkFavorite] Feature initialized"));},isReady(){return qn},DEFAULT_CONFIG:Zl,STORAGE_KEY:Di,loadConfig:Mn,saveConfig:ec,isEnabled:tc,setPosition:ty,bulkFavorite:ry,destroy(){qn=false;}};class iy{constructor(){W(this,"achievements",new Map);W(this,"data");W(this,"STORAGE_KEY",Me.ACHIEVEMENTS);W(this,"onUnlockCallbacks",[]);W(this,"onProgressCallbacks",[]);this.data=this.loadData();}loadData(){return Te(this.STORAGE_KEY,{unlocked:{},progress:{}})}saveData(){je(this.STORAGE_KEY,this.data);}register(t){this.achievements.set(t.id,t),this.data.progress[t.id]||(this.data.progress[t.id]={current:0,target:t.target,percentage:0});}registerMany(t){for(const n of t)this.register(n);}async checkAchievement(t){const n=this.achievements.get(t);if(!n)throw new Error(`Achievement not found: ${t}`);const r=this.isUnlocked(t),o=await n.checkProgress(),i={current:o,target:n.target,percentage:Math.min(100,Math.floor(o/n.target*100))},a=this.data.progress[t];this.data.progress[t]=i;const s=o>=n.target;return !r&&s?this.unlock(t,i):s||this.triggerProgressCallbacks({achievement:n,progress:i,previousProgress:a}),this.saveData(),{id:t,wasUnlocked:r,isUnlocked:s,progress:i}}async checkAllAchievements(){const t=[];for(const n of this.achievements.keys()){const r=await this.checkAchievement(n);t.push(r);}return t}unlock(t,n){const r=this.achievements.get(t);if(!r)return;const o={achievementId:t,unlockedAt:Date.now(),progress:n};this.data.unlocked[t]=o,this.saveData(),this.triggerUnlockCallbacks({achievement:r,unlockedAt:o.unlockedAt,progress:n});}isUnlocked(t){return !!this.data.unlocked[t]}getAchievement(t){return this.achievements.get(t)||null}getAllAchievements(){return Array.from(this.achievements.values())}getAchievementsByCategory(t){return Array.from(this.achievements.values()).filter(n=>n.category===t)}getAchievementsByRarity(t){return Array.from(this.achievements.values()).filter(n=>n.rarity===t)}getUnlockedAchievements(){return Object.values(this.data.unlocked)}getLockedAchievements(){return Array.from(this.achievements.values()).filter(t=>!this.isUnlocked(t.id)&&!t.hidden)}getProgress(t){return this.data.progress[t]||null}getCompletionPercentage(){const t=this.achievements.size,n=Object.keys(this.data.unlocked).length;return t>0?Math.floor(n/t*100):0}getCompletionStats(){const t=this.achievements.size,n=Object.keys(this.data.unlocked).length,r=t-n,o=this.getCompletionPercentage();return {total:t,unlocked:n,locked:r,percentage:o}}onUnlock(t){return this.onUnlockCallbacks.push(t),()=>{const n=this.onUnlockCallbacks.indexOf(t);n!==-1&&this.onUnlockCallbacks.splice(n,1);}}onProgress(t){return this.onProgressCallbacks.push(t),()=>{const n=this.onProgressCallbacks.indexOf(t);n!==-1&&this.onProgressCallbacks.splice(n,1);}}triggerUnlockCallbacks(t){for(const n of this.onUnlockCallbacks)try{n(t);}catch(r){console.warn("[Achievements] Unlock callback error:",r);}}triggerProgressCallbacks(t){for(const n of this.onProgressCallbacks)try{n(t);}catch(r){console.warn("[Achievements] Progress callback error:",r);}}reset(){this.data={unlocked:{},progress:{}};for(const t of this.achievements.values())this.data.progress[t.id]={current:0,target:t.target,percentage:0};this.saveData();}exportData(){return JSON.stringify(this.data,null,2)}importData(t){try{const n=JSON.parse(t);return this.data=n,this.saveData(),!0}catch(n){return console.warn("[Achievements] Failed to import data:",n),false}}}let bn=null;function Ge(){return bn||(bn=new iy),bn}function ay(){bn&&(bn=null);}let Xn=false;const nc={init(){Xn||(Ge(),Xn=true,console.log("✅ [MGAchievements] Initialized"));},isReady(){return Xn},getManager(){return Ge()},register:(...e)=>Ge().register(...e),registerMany:(...e)=>Ge().registerMany(...e),isUnlocked:(...e)=>Ge().isUnlocked(...e),getAll:()=>Ge().getAllAchievements(),getUnlocked:()=>Ge().getUnlockedAchievements(),getStats:()=>Ge().getCompletionStats(),checkAll:()=>Ge().checkAllAchievements(),onUnlock:(...e)=>Ge().onUnlock(...e),onProgress:(...e)=>Ge().onProgress(...e),destroy(){ay(),Xn=false;}},sy={enabled:true},rc=Me.ANTI_AFK,ly=["visibilitychange","blur","focus","focusout","pagehide","freeze","resume"],cy=25e3,dy=1,uy=1e-5,re={listeners:[],savedProps:{hidden:void 0,visibilityState:void 0,hasFocus:null},audioCtx:null,oscillator:null,gainNode:null,heartbeatInterval:null};function py(){const e=(t,n)=>{const r=o=>{o.stopImmediatePropagation(),o.preventDefault?.();};t.addEventListener(n,r,{capture:true}),re.listeners.push({type:n,handler:r,target:t});};for(const t of ly)e(document,t),e(window,t);}function fy(){for(const{type:e,handler:t,target:n}of re.listeners)try{n.removeEventListener(e,t,{capture:!0});}catch{}re.listeners.length=0;}function my(){const e=Object.getPrototypeOf(document);re.savedProps.hidden=Object.getOwnPropertyDescriptor(e,"hidden"),re.savedProps.visibilityState=Object.getOwnPropertyDescriptor(e,"visibilityState"),re.savedProps.hasFocus=document.hasFocus?document.hasFocus.bind(document):null;try{Object.defineProperty(e,"hidden",{configurable:!0,get:()=>!1});}catch{}try{Object.defineProperty(e,"visibilityState",{configurable:!0,get:()=>"visible"});}catch{}try{document.hasFocus=()=>!0;}catch{}}function gy(){const e=Object.getPrototypeOf(document);try{re.savedProps.hidden&&Object.defineProperty(e,"hidden",re.savedProps.hidden);}catch{}try{re.savedProps.visibilityState&&Object.defineProperty(e,"visibilityState",re.savedProps.visibilityState);}catch{}try{re.savedProps.hasFocus&&(document.hasFocus=re.savedProps.hasFocus);}catch{}}function Ir(){re.audioCtx&&re.audioCtx.state!=="running"&&re.audioCtx.resume?.().catch(()=>{});}function hy(){try{const e=window.AudioContext||window.webkitAudioContext;re.audioCtx=new e({latencyHint:"interactive"}),re.gainNode=re.audioCtx.createGain(),re.gainNode.gain.value=uy,re.oscillator=re.audioCtx.createOscillator(),re.oscillator.frequency.value=dy,re.oscillator.connect(re.gainNode).connect(re.audioCtx.destination),re.oscillator.start(),document.addEventListener("visibilitychange",Ir,{capture:!0}),window.addEventListener("focus",Ir,{capture:!0});}catch{oc();}}function oc(){try{re.oscillator?.stop();}catch{}try{re.oscillator?.disconnect(),re.gainNode?.disconnect();}catch{}try{re.audioCtx?.close?.();}catch{}document.removeEventListener("visibilitychange",Ir,{capture:true}),window.removeEventListener("focus",Ir,{capture:true}),re.oscillator=null,re.gainNode=null,re.audioCtx=null;}function by(){const e=document.querySelector("canvas")||document.body||document.documentElement;re.heartbeatInterval=window.setInterval(()=>{try{e.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:1,clientY:1}));}catch{}},cy);}function yy(){re.heartbeatInterval!==null&&(clearInterval(re.heartbeatInterval),re.heartbeatInterval=null);}function uo(){my(),py(),hy(),by();}function po(){yy(),oc(),fy(),gy();}let Jn=false,_e=false;function Ot(){return Te(rc,sy)}function fo(e){je(rc,e);}const At={init(){if(Jn)return;const e=Ot();Jn=true,e.enabled?(uo(),_e=true,console.log("[MGAntiAfk] Initialized and started")):console.log("[MGAntiAfk] Initialized but disabled");},isReady(){return Jn},isRunning(){return _e},isEnabled(){return Ot().enabled},enable(){const e=Ot();e.enabled=true,fo(e),_e||(uo(),_e=true,console.log("[MGAntiAfk] Enabled"));},disable(){const e=Ot();e.enabled=false,fo(e),_e&&(po(),_e=false,console.log("[MGAntiAfk] Disabled"));},toggle(){At.isEnabled()?At.disable():At.enable();},getConfig(){return Ot()},updateConfig(e){const n={...Ot(),...e};fo(n),n.enabled&&!_e?(uo(),_e=true):!n.enabled&&_e&&(po(),_e=false);},destroy(){_e&&(po(),_e=false),Jn=false,console.log("[MGAntiAfk] Destroyed");}},ic=Me.PET_TEAM,vy={enabled:false,teams:[],activeTeamId:null},ac=3,Na=50,Ve="";function Se(){return Te(ic,vy)}function _t(e){je(ic,e);}function xy(e){const n={...Se(),...e};return _t(n),n}function wy(){return Se().enabled}function ky(e){xy({enabled:e});}function Sy(){return crypto.randomUUID()}function Uo(){return Date.now()}function sc(e=[]){const t=[...e];for(;t.length<ac;)t.push(Ve);return [t[0]||Ve,t[1]||Ve,t[2]||Ve]}function lc(e,t){const n=Se(),r=e.trim();return r?!n.teams.some(o=>o.name.trim()===r&&o.id!==t):false}function cc(e,t){const n=Se();if(!e.some(i=>i!==Ve))return  true;const o=[...e].sort().join(",");return !n.teams.some(i=>i.id===t?false:[...i.petIds].sort().join(",")===o)}function dc(e){const n=Br().get(),r=new Set(n.all.map(i=>i.id)),o=Se();for(const i of o.teams)for(const a of i.petIds)a!==Ve&&r.add(a);for(const i of e)if(i!==Ve&&!r.has(i))return  false;return  true}function Cy(e,t=[]){const n=Se();if(n.teams.length>=Na)throw new Error(`Maximum number of teams (${Na}) reached`);if(!lc(e))throw new Error(`Team name "${e}" already exists`);const r=e.trim();if(!r)throw new Error("Team name cannot be empty");const o=sc(t);if(!dc(o))throw new Error("One or more pet IDs do not exist");if(!cc(o))throw new Error("A team with this exact composition already exists");const i={id:Sy(),name:r,petIds:o,createdAt:Uo(),updatedAt:Uo()};return n.teams.push(i),_t(n),i}function uc(e,t){const n=Se(),r=n.teams.findIndex(a=>a.id===e);if(r===-1)return null;const o=n.teams[r];if(t.name!==void 0){const a=t.name.trim();if(!a)throw new Error("Team name cannot be empty");if(!lc(a,e))throw new Error(`Team name "${a}" already exists`);t.name=a;}if(t.petIds!==void 0){const a=sc(t.petIds);if(!dc(a))throw new Error("One or more pet IDs do not exist");if(!cc(a,e))throw new Error("A team with this exact composition already exists");t.petIds=a;}const i={...o,...t,id:o.id,createdAt:o.createdAt,updatedAt:Uo()};return n.teams[r]=i,_t(n),i}function Ay(e){const t=Se(),n=t.teams.length;return t.teams=t.teams.filter(r=>r.id!==e),t.teams.length===n?false:(_t(t),true)}function Ty(e){return Se().teams.find(n=>n.id===e)??null}function Iy(){return [...Se().teams]}function Py(e){const t=Se(),n=e.trim();return t.teams.find(r=>r.name.trim()===n)??null}function Ey(e){const t=Se(),n=new Map(t.teams.map(r=>[r.id,r]));if(e.length!==t.teams.length)return  false;for(const r of e)if(!n.has(r))return  false;return t.teams=e.map(r=>n.get(r)),_t(t),true}function My(e,t){try{return uc(e,{name:t})!==null}catch(n){return console.warn(`[PetTeam] Failed to rename team ${e}:`,n),false}}function Ly(){const n=Br().get().byLocation.active.map(o=>o.id).sort(),r=Se();for(const o of r.teams){const i=o.petIds.filter(a=>a!=="").sort();if(i.length===n.length&&i.every((a,s)=>a===n[s]))return o.id}return null}function pc(){const e=Ly(),t=Se();return e!==t.activeTeamId&&(t.activeTeamId=e,_t(t)),e}function fc(e){const t=Se();t.activeTeamId=e,_t(t);}function _y(e){return pc()===e}function Fy(e){const t=Br(),n=Lt(),r=t.get();if(n.get().isFull)throw new Error("Cannot activate team: inventory is full");const i=r.byLocation.active,a=e.petIds.filter(l=>l!==Ve).sort(),s=i.map(l=>l.id).sort();if(JSON.stringify(a)===JSON.stringify(s)){console.log("[PetTeam] Team already active");return}const c=r.hutch,d=c.hasHutch?c.maxItems-c.currentItems:0;Oy(e.petIds,d,r),fc(e.id),console.log("[PetTeam] Team activated successfully");}function Oy(e,t,n){const r=n.byLocation.active;let o=t;console.log(`[PetTeam] Starting swap with ${t} hutch spaces available`);for(let i=0;i<ac;i++){const a=e[i],s=r[i]??null;if(console.log(`[PetTeam] Slot ${i}: current=${s?.id.slice(0,8)??"empty"}, target=${a.slice(0,8)||"empty"}, hutchSpace=${o}`),s?.id===a){console.log(`[PetTeam] Slot ${i}: Same pet, skipping`);continue}if(a===Ve&&s){const c=o>0;console.log(`[PetTeam] Slot ${i}: Removing pet, storeInHutch=${c}`),Ry(s.id,c),c&&o--;continue}if(!s&&a!==Ve){const d=n.all.find(l=>l.id===a)?.location==="hutch";console.log(`[PetTeam] Slot ${i}: Adding pet, fromHutch=${d}`),d&&o++,Ny(a,n);continue}if(s&&a!==Ve){const d=n.all.find(u=>u.id===a)?.location==="hutch";d&&o++;const l=o>0;console.log(`[PetTeam] Slot ${i}: Swapping pets, fromHutch=${d}, storeInHutch=${l}`),Dy(s.id,a,n,l),l&&o--;continue}}console.log(`[PetTeam] Swap complete, ${o} hutch spaces remaining`);}function Ry(e,t){zl(e),t&&_i(e);}function Ny(e,t){const n=t.all.find(r=>r.id===e);if(!n){console.warn(`[PetTeam] Pet ${e} not found`);return}n.location==="hutch"&&Fi(e),jl(e);}function Dy(e,t,n,r){const o=n.all.find(i=>i.id===t);if(!o){console.warn(`[PetTeam] Pet ${t} not found`);return}o.location==="hutch"&&Fi(t),Bl(e,t),r&&_i(e);}let Qn=false;const he={init(){if(Qn)return;if(!Se().enabled){console.log("[PetTeam] Feature disabled");return}Qn=true,console.log("[PetTeam] Feature initialized");},destroy(){Qn&&(Qn=false,console.log("[PetTeam] Feature destroyed"));},isEnabled:wy,setEnabled:ky,createTeam:Cy,updateTeam:uc,deleteTeam:Ay,renameTeam:My,getTeam:Ty,getAllTeams:Iy,getTeamByName:Py,reorderTeams:Ey,getActiveTeamId:pc,setActiveTeamId:fc,isActiveTeam:_y,activateTeam:Fy};class mc{constructor(){W(this,"stats");W(this,"STORAGE_KEY",Me.TRACKER_STATS);this.stats=this.loadStats(),this.startSession();}loadStats(){return Te(this.STORAGE_KEY,this.getDefaultStats())}saveStats(){je(this.STORAGE_KEY,this.stats);}getDefaultStats(){return {session:{sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},allTime:{totalSessions:0,totalPlayTime:0,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0,crops:{},pets:{}}}}startSession(){this.stats.session={sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},this.stats.allTime.totalSessions++,this.saveStats();}endSession(){this.stats.session.sessionEnd=Date.now();const t=this.stats.session.sessionEnd-this.stats.session.sessionStart;this.stats.allTime.totalPlayTime+=t,this.saveStats();}recordHarvest(t,n=1,r=[]){this.stats.session.cropsHarvested+=n,this.stats.allTime.cropsHarvested+=n,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].harvested+=n;for(const o of r)this.stats.allTime.crops[t].mutations[o]||(this.stats.allTime.crops[t].mutations[o]=0),this.stats.allTime.crops[t].mutations[o]++;this.saveStats();}recordCropSale(t,n=1,r=0){this.stats.session.cropsSold+=n,this.stats.session.coinsEarned+=r,this.stats.allTime.cropsSold+=n,this.stats.allTime.coinsEarned+=r,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].sold+=n,this.stats.allTime.crops[t].totalValue+=r,this.saveStats();}recordPetHatch(t,n=[],r=[]){this.stats.session.petsHatched++,this.stats.allTime.petsHatched++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].hatched++;for(const o of n)this.stats.allTime.pets[t].mutations[o]||(this.stats.allTime.pets[t].mutations[o]=0),this.stats.allTime.pets[t].mutations[o]++;for(const o of r)this.stats.allTime.pets[t].abilities[o]||(this.stats.allTime.pets[t].abilities[o]=0),this.stats.allTime.pets[t].abilities[o]++;this.saveStats();}recordPetSale(t,n=0){this.stats.session.petsSold++,this.stats.session.coinsEarned+=n,this.stats.allTime.petsSold++,this.stats.allTime.coinsEarned+=n,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].sold++,this.saveStats();}recordPetFeed(t){this.stats.session.petsFed++,this.stats.allTime.petsFed++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].fed++,this.saveStats();}recordSeedPurchase(t,n=1,r=0){this.stats.session.seedsPurchased+=n,this.stats.session.coinsSpent+=r,this.stats.allTime.seedsPurchased+=n,this.stats.allTime.coinsSpent+=r,this.saveStats();}recordEggPurchase(t,n=1,r=0){this.stats.session.eggsPurchased+=n,this.stats.session.coinsSpent+=r,this.stats.allTime.eggsPurchased+=n,this.stats.allTime.coinsSpent+=r,this.saveStats();}recordAbilityProc(t){this.stats.session.abilityProcs++,this.stats.allTime.abilityProcs++,this.saveStats();}recordCoinsEarned(t){this.stats.session.coinsEarned+=t,this.stats.allTime.coinsEarned+=t,this.saveStats();}recordCoinsSpent(t){this.stats.session.coinsSpent+=t,this.stats.allTime.coinsSpent+=t,this.saveStats();}getStats(){return {...this.stats}}getSessionStats(){return {...this.stats.session}}getAllTimeStats(){return {...this.stats.allTime}}getCropStats(t){return this.stats.allTime.crops[t]||null}getPetStats(t){return this.stats.allTime.pets[t]||null}getTopCrops(t=10){return Object.entries(this.stats.allTime.crops).map(([n,r])=>({species:n,stats:r})).sort((n,r)=>r.stats.harvested-n.stats.harvested).slice(0,t)}getTopPets(t=10){return Object.entries(this.stats.allTime.pets).map(([n,r])=>({species:n,stats:r})).sort((n,r)=>r.stats.hatched-n.stats.hatched).slice(0,t)}resetSession(){this.startSession();}resetAll(){this.stats=this.getDefaultStats(),this.saveStats();}exportStats(){return JSON.stringify(this.stats,null,2)}importStats(t){try{const n=JSON.parse(t);return this.stats=n,this.saveStats(),!0}catch(n){return console.warn("[StatsTracker] Failed to import stats:",n),false}}}let jt=null;function $y(){return jt||(jt=new mc),jt}function jy(){jt&&(jt.endSession(),jt=null);}function gc(e){const t=Nr(e.xp),n=Dr(e.petSpecies,e.targetScale),r=$r(e.petSpecies,e.xp,n),o=jr(e.petSpecies,t),i=_l(e.petSpecies),a=mh(r,n,i),s=gh(r,n);return {current:r,max:n,progress:s,age:t,isMature:o,strengthPerHour:i,hoursToMax:a}}function hc(e){return {...e,strength:gc(e)}}function bc(e){return e.map(hc)}function By(e){if(e.length===0)return {averageCurrent:0,averageMax:0,totalMature:0,totalImmature:0,strongestPet:null,weakestPet:null};const t=bc(e),n=t.reduce((c,d)=>c+d.strength.current,0),r=t.reduce((c,d)=>c+d.strength.max,0),o=t.filter(c=>c.strength.isMature).length,i=t.length-o,a=t.reduce((c,d)=>d.strength.max>(c?.strength.max||0)?d:c,t[0]),s=t.reduce((c,d)=>d.strength.max<(c?.strength.max||1/0)?d:c,t[0]);return {averageCurrent:Math.round(n/t.length),averageMax:Math.round(r/t.length),totalMature:o,totalImmature:i,strongestPet:a,weakestPet:s}}const zy=Object.freeze(Object.defineProperty({__proto__:null,calculatePetStrength:gc,enrichPetWithStrength:hc,enrichPetsWithStrength:bc,getPetStrengthStats:By},Symbol.toStringTag,{value:"Module"}));class yc{constructor(){W(this,"logs",[]);W(this,"maxLogs",1e3);W(this,"unsubscribe",null);W(this,"isInitialized",false);}init(){this.isInitialized||(this.unsubscribe=ot.myPets.subscribeAbility(t=>{this.log({abilityId:t.trigger.abilityId||"unknown",petId:t.pet.id,petSpecies:t.pet.petSpecies,petName:t.pet.name,timestamp:t.trigger.performedAt||Date.now()});}),this.isInitialized=true);}log(t){const n={...t,id:`${t.timestamp}-${Math.random().toString(36).substr(2,9)}`};this.logs.push(n),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs));}getLogs(t){let n=this.logs;t?.abilityId&&(n=n.filter(o=>o.abilityId===t.abilityId)),t?.petId&&(n=n.filter(o=>o.petId===t.petId)),t?.petSpecies&&(n=n.filter(o=>o.petSpecies===t.petSpecies));const{since:r}=t??{};return r!==void 0&&(n=n.filter(o=>o.timestamp>=r)),t?.limit&&(n=n.slice(-t.limit)),n}getStats(t=36e5){const n=Date.now()-t,r=this.logs.filter(i=>i.timestamp>=n),o=new Map;for(const i of r){o.has(i.abilityId)||o.set(i.abilityId,{abilityId:i.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});const a=o.get(i.abilityId);a.count++,(!a.lastProc||i.timestamp>a.lastProc)&&(a.lastProc=i.timestamp);}for(const i of o.values())i.procsPerMinute=i.count/t*6e4,i.procsPerHour=i.count/t*36e5;return o}getAbilityStats(t,n=36e5){return this.getStats(n).get(t)||null}getPetStats(t,n=36e5){const r=Date.now()-n,o=this.logs.filter(a=>a.petId===t&&a.timestamp>=r),i=new Map;for(const a of o){i.has(a.abilityId)||i.set(a.abilityId,{abilityId:a.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});const s=i.get(a.abilityId);s.count++,(!s.lastProc||a.timestamp>s.lastProc)&&(s.lastProc=a.timestamp);}for(const a of i.values())a.procsPerMinute=a.count/n*6e4,a.procsPerHour=a.count/n*36e5;return {totalProcs:o.length,abilities:i}}getTopAbilities(t=10,n=36e5){return Array.from(this.getStats(n).values()).sort((o,i)=>i.count-o.count).slice(0,t)}clear(){this.logs=[];}setMaxLogs(t){this.maxLogs=t,this.logs.length>t&&(this.logs=this.logs.slice(-t));}getLogCount(){return this.logs.length}isActive(){return this.isInitialized}destroy(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null),this.logs=[],this.isInitialized=false;}}let kt=null;function Gy(){return kt||(kt=new yc,kt.init()),kt}function Wy(){kt&&(kt.destroy(),kt=null);}const vc={StatsTracker:mc,getStatsTracker:$y,destroyStatsTracker:jy},xc={AbilityLogger:yc,getAbilityLogger:Gy,destroyAbilityLogger:Wy,...zy},Hy=Object.freeze(Object.defineProperty({__proto__:null,MGAchievements:nc,MGAntiAfk:At,MGAutoFavorite:Oi,MGBulkFavorite:Tr,MGCalculators:Fl,MGJournalChecker:Ql,MGPetTeam:he,MGPets:xc,MGTracker:vc},Symbol.toStringTag,{value:"Module"})),We=[{id:"Rainbow",desc:"All Rainbow items"},{id:"Gold",desc:"All Gold items"},{id:"Wet",desc:"All Wet items"},{id:"Chilled",desc:"All Chilled items"},{id:"Frozen",desc:"All Frozen items"},{id:"Dawnlit",desc:"Dawn mutations"},{id:"Dawncharged",desc:"Dawn charged"},{id:"Ambershine",desc:"Amber mutations"},{id:"Ambercharged",desc:"Amber charged"}],Uy={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function Rt(e){return e?Uy[e]??0:0}class Vy extends Ht{constructor(){super({id:"tab-auto-favorite",label:"Auto-Favorite"});W(this,"allPlants",[]);W(this,"allPets",[]);W(this,"sectionElement",null);}async build(n){await Mf();const r=n.getRootNode();wt(r,qs,"auto-favorite-settings-styles");const o=this.createGrid("12px");o.id="auto-favorite-settings",this.sectionElement=o,n.appendChild(o),await this.loadGameData(),await this.waitForSprites(),this.renderContent();}async loadGameData(){try{await de.waitForAny(3e3).catch(()=>{}),await Promise.all([de.waitFor("plants",3e3).catch(()=>console.warn("[AutoFavorite UI] Still waiting for plants data...")),de.waitFor("pets",3e3).catch(()=>console.warn("[AutoFavorite UI] Still waiting for pets data..."))]);const n=de.get("plants")||{},r=de.get("pets")||{};this.allPlants=Object.keys(n).sort((o,i)=>{const a=n[o]?.seed?.rarity||null,s=n[i]?.seed?.rarity||null,c=Rt(a)-Rt(s);return c!==0?c:o.localeCompare(i,void 0,{numeric:!0,sensitivity:"base"})}),this.allPets=Object.keys(r).sort((o,i)=>{const a=r[o]?.rarity||null,s=r[i]?.rarity||null,c=Rt(a)-Rt(s);return c!==0?c:o.localeCompare(i,void 0,{numeric:!0,sensitivity:"base"})});}catch(n){console.error("[AutoFavorite UI] Failed to load game data:",n);}}async waitForSprites(){if(ie.isReady())return;const n=1e4,r=100;let o=0;return new Promise(i=>{const a=()=>{ie.isReady()||o>=n?i():(o+=r,setTimeout(a,r));};a();})}renderContent(){this.sectionElement&&(this.sectionElement.innerHTML="",this.sectionElement.appendChild(this.createMasterToggle()),this.sectionElement.appendChild(this.createMutationsCard()),this.sectionElement.appendChild(this.createProduceCard()),this.sectionElement.appendChild(this.createPetsCard()));}createMasterToggle(){const n=b("div",{className:"kv"}),r=ei({text:"Enable Auto-Favorite",tone:"default",size:"lg"}),o=oi({checked:Be().get().enabled,onChange:async i=>{const a=Be(),s=a.get();await a.set({...s,enabled:i}),await this.saveConfig();}});return n.append(r.root,o.root),$e({title:"Auto-Favorite",padding:"lg"},n,b("p",{style:"margin-top: 6px; font-size: 12px; color: var(--muted);"},"Automatically favorite items when added to inventory"))}createMutationsCard(){const n=b("div",{className:"u-col"}),r=b("div",{className:"mut-row"});r.appendChild(this.createMutationButton(We[0])),r.appendChild(this.createMutationButton(We[1])),n.appendChild(r);const o=b("div",{className:"mut-row"});o.appendChild(this.createMutationButton(We[2])),o.appendChild(this.createMutationButton(We[3])),o.appendChild(this.createMutationButton(We[4])),n.appendChild(o);const i=b("div",{className:"mut-row"});i.appendChild(this.createMutationButton(We[5])),i.appendChild(this.createMutationButton(We[6])),n.appendChild(i);const a=b("div",{className:"mut-row"});return a.appendChild(this.createMutationButton(We[7])),a.appendChild(this.createMutationButton(We[8])),n.appendChild(a),$e({title:"Mutations Priority",variant:"soft",padding:"lg",expandable:true,defaultExpanded:true},n,b("p",{style:"margin-top: 8px; font-size: 11px; color: var(--muted);"},`${Be().get().favoriteMutations.length} / ${We.length} active`))}createMutationButton(n){let r=Be().get().favoriteMutations.includes(n.id);const i=["mut-btn",`mut-btn--${n.id.toLowerCase()}`];r&&i.push("active");const a=b("div",{className:i.join(" ")}),s=b("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(ie.isReady()){const l=ie.toCanvas("plant","Sunflower",{mutations:[n.id],scale:.16});l.style.width="28px",l.style.height="28px",l.style.objectFit="contain",s.appendChild(l);}}catch{}const c=n.id.charAt(0).toUpperCase()+n.id.slice(1).toLowerCase(),d=b("div",{style:"font-size: 13px; font-weight: 600; color: var(--fg); text-shadow: 0 1px 2px rgba(0,0,0,0.5); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"},c);if(a.append(s,d),n.id==="Rainbow"||n.id==="Gold"){const l=b("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(ie.isReady()){const u=ie.toCanvas("pet","Capybara",{mutations:[n.id],scale:.16});u.style.width="28px",u.style.height="28px",u.style.objectFit="contain",l.appendChild(u);}}catch{}a.append(l);}else {const l=b("div",{style:"width: 28px; flex-shrink: 0;"});a.append(l);}return a.addEventListener("click",async l=>{l.stopPropagation();const u=Be(),p=u.get();if(r){const m=p.favoriteMutations.filter(g=>g!==n.id);await u.set({...p,favoriteMutations:m}),r=false,a.classList.remove("active");}else {const m=[...p.favoriteMutations,n.id];await u.set({...p,favoriteMutations:m}),r=true,a.classList.add("active");}await this.saveConfig();const f=this.sectionElement?.querySelector(".card p");f&&(f.textContent=`${Be().get().favoriteMutations.length} / ${We.length} active`);}),a}createProduceCard(){return this.createItemSelectionCard({title:"Produce",items:this.allPlants,category:"plant",selected:Be().get().favoriteProduceList,onUpdate:async n=>{const r=Be(),o=r.get();await r.set({...o,favoriteProduceList:n}),await this.saveConfig();}})}createPetsCard(){return this.createItemSelectionCard({title:"Pets",items:this.allPets,category:"pet",selected:Be().get().favoritePetsList,onUpdate:async n=>{const r=Be(),o=r.get();await r.set({...o,favoritePetsList:n}),await this.saveConfig();}})}createItemSelectionCard(n){const{title:r,items:o,category:i,selected:a,onUpdate:s}=n;let c=new Set(a),d=o;const l=b("div",{style:"margin-bottom: 8px;"}),u=ii({placeholder:`Search ${r.toLowerCase()}...`,value:"",debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:y=>{const C=y.trim().toLowerCase();C?d=o.filter(I=>I.toLowerCase().includes(C)):d=o,w.setData(g());}});l.appendChild(u.root);const p=b("div",{style:"display: flex; gap: 8px; margin-bottom: 12px;"}),f=xt({label:"Select All",variant:"default",size:"sm",onClick:()=>{const y=g().map(C=>C.id);w.setSelection(y);}}),m=xt({label:"Deselect All",variant:"default",size:"sm",onClick:()=>{w.clearSelection();}});p.append(f,m);const g=()=>d.map(y=>({id:y,name:y,rarity:this.getItemRarity(y,i),selected:c.has(y)})),h=y=>{if(!y){const I=b("span",{style:"opacity:0.5;"});return I.textContent="—",I}return cs({variant:"rarity",rarity:y,size:"sm"}).root},v=y=>{const C=b("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0; background: color-mix(in oklab, var(--bg) 5%, transparent); border-radius: 6px;"});try{if(ie.isReady()){let I=i,S=y;i==="plant"&&(["Bamboo","Cactus"].includes(y)&&(I="tallplant"),y==="DawnCelestial"&&(S="DawnCelestialCrop"),y==="MoonCelestial"&&(S="MoonCelestialCrop"),y==="OrangeTulip"&&(S="Tulip"));const P=ie.toCanvas(I,S,{scale:.5});P.style.width="28px",P.style.height="28px",P.style.objectFit="contain",C.appendChild(P);}}catch{}return C},w=ls({columns:[{key:"name",header:"Name",width:"1fr",align:"center",sortable:true,sortFn:(y,C)=>y.name.localeCompare(C.name,void 0,{numeric:true,sensitivity:"base"}),render:y=>{const C=b("div",{style:"display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%;"}),I=v(y.id),S=b("span",{style:"font-weight: 500; color: var(--fg); white-space: nowrap;"},y.name);return C.append(I,S),C}},{key:"rarity",header:"Rarity",width:"100px",align:"center",sortable:true,sortFn:(y,C)=>Rt(y.rarity)-Rt(C.rarity),render:y=>h(y.rarity)}],data:g(),maxHeight:280,compact:true,zebra:true,animations:true,selectable:true,selectOnRowClick:true,hideHeaderCheckbox:true,initialSelection:Array.from(c),getRowId:y=>y.id,onSelectionChange:y=>{c.clear(),y.forEach(C=>c.add(C)),s(Array.from(c)),T();}}),x=b("p",{style:"margin-top: 8px; font-size: 11px; color: var(--muted);"}),T=()=>{x.textContent=`${c.size} / ${o.length} selected`;};return T(),$e({title:`${r} (${c.size}/${o.length})`,variant:"soft",padding:"lg",expandable:true,defaultExpanded:false},l,p,w.root,x)}getItemRarity(n,r){try{if(r==="pet")return (de.get("pets")||{})[n]?.rarity||null;if(r==="plant"){const o=de.get("plants")||{},i=o[n];if(i?.seed?.rarity)return i.seed.rarity;const a=n.toLowerCase();for(const s of Object.values(o))if(s?.seed?.name?.toLowerCase()===a||s?.plant?.name?.toLowerCase()===a)return s.seed.rarity}}catch{}return null}async saveConfig(){const n=Be().get();try{const{updateSimpleConfig:r}=Oi;await r({enabled:n.enabled,favoriteSpecies:[...n.favoriteProduceList,...n.favoritePetsList],favoriteMutations:n.favoriteMutations});}catch(r){console.error("[AutoFavoriteSettings] Failed to update feature config:",r);}}}function Ky(e,t){const n=new MutationObserver(o=>{for(const i of o)for(const a of i.addedNodes){if(!(a instanceof Element))continue;a.matches(e)&&t(a);const s=a.querySelectorAll(e);for(const c of s)t(c);}});n.observe(document.body,{childList:true,subtree:true});const r=document.querySelectorAll(e);for(const o of r)t(o);return {disconnect:()=>n.disconnect()}}function Yy(e,t){const n=new MutationObserver(r=>{for(const o of r)for(const i of o.removedNodes){if(!(i instanceof Element))continue;i.matches(e)&&t(i);const a=i.querySelectorAll(e);for(const s of a)t(s);}});return n.observe(document.body,{childList:true,subtree:true}),{disconnect:()=>n.disconnect()}}const wc=768,Da=6,mo=62,go=50,qy=.5,Xy=.4,Zn=36,er=28,Jy=6,Vo=4,Qy=8,Zy=100,ev=200,$a=14,ja=3,tv=40,nv=50,Ba=2147483646,an="gemini-bulk-favorite-sidebar",rv="gemini-bulk-favorite-top-row",ov="gemini-bulk-favorite-bottom-row",Ko="gemini-qol-bulkFavorite-styles",iv=`
/* Desktop: vertical scrollable list next to inventory */
#${an} {
  display: flex;
  flex-direction: column;
  gap: ${Jy}px;
  pointer-events: auto;
  padding: 4px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.6);
  z-index: ${Ba};
  overflow-y: auto;
}

/* Mobile: horizontal scrollable rows */
.gemini-qol-bulkFavorite-row {
  display: flex;
  flex-direction: row;
  gap: ${Vo}px;
  pointer-events: auto;
  padding: 4px;
  position: fixed;
  z-index: ${Ba};
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

#${an}::-webkit-scrollbar {
  width: 4px;
}

#${an}::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}

#${an}::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

/* Individual species button */
.gemini-qol-bulkFavorite-btn {
  position: relative;
  width: ${mo}px;
  height: ${mo}px;
  min-width: ${mo}px;
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
  width: ${go}px;
  height: ${go}px;
  min-width: ${go}px;
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
  width: ${Zn}px;
  height: ${Zn}px;
  object-fit: contain;
  image-rendering: pixelated;
}

.gemini-qol-bulkFavorite-btn.mobile .gemini-qol-bulkFavorite-sprite {
  width: ${er}px;
  height: ${er}px;
}

/* Heart indicator */
.gemini-qol-bulkFavorite-heart {
  position: absolute;
  top: ${ja}px;
  right: ${ja}px;
  width: ${$a}px;
  height: ${$a}px;
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
  width: ${Zn}px;
  height: ${Zn}px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #fff;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 4px;
}

.gemini-qol-bulkFavorite-btn.mobile .gemini-qol-bulkFavorite-fallback {
  width: ${er}px;
  height: ${er}px;
  font-size: 14px;
}
`,av='<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',sv='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';function lv(e){const{species:t,itemCount:n,isFavorited:r,isMobile:o,onClick:i}=e,a=b("button",{className:`gemini-qol-bulkFavorite-btn${o?" mobile":""}`,title:`${r?"Unfavorite":"Favorite"} all ${n} ${t}`});return a.dataset.species=t,a.appendChild(cv(t,o)),a.appendChild(dv(r)),a.appendChild(uv(t)),a.addEventListener("click",async s=>{s.preventDefault(),s.stopPropagation(),i();}),a}function cv(e,t){try{if(!ie.isReady()||!ie.has("plant",e))return za(e);const n=t?Xy:qy,r=ie.toCanvas("plant",e,{scale:n});return r.className="gemini-qol-bulkFavorite-sprite",r}catch(n){return console.warn(`[BulkFavorite] Failed to load sprite for ${e}:`,n),za(e)}}function za(e){return b("div",{className:"gemini-qol-bulkFavorite-fallback"},e.charAt(0).toUpperCase())}function dv(e){const t=b("span",{className:`gemini-qol-bulkFavorite-heart ${e?"filled":"outline"}`});return t.innerHTML=e?av:sv,t}function uv(e){return b("span",{className:"gemini-qol-bulkFavorite-label"},e)}let Qe=null,Ze=null,Je=null,mr=false,yn=null,sn=false,Bt=null;const Yo=[];function tr(e){Yo.push(e);}function pv(){for(const e of Yo)try{e();}catch(t){console.warn("[BulkFavorite] Cleanup error:",t);}Yo.length=0;}function kc(){return window.innerWidth<=wc}function fv(e){return new Promise(t=>setTimeout(t,e))}function Sc(){if(mr)return;if(document.getElementById(Ko)){mr=true;return}const e=document.createElement("style");e.id=Ko,e.textContent=iv,document.head.appendChild(e),mr=true;}function mv(){document.getElementById(Ko)?.remove(),mr=false;}function gv(){const e=Lt().get();if(!e?.items)return [];const t=new Set(e.favoritedItemIds??[]),n=new Map;for(const o of e.items){const i=o;if(i.itemType!=="Produce")continue;const a=i.species,s=i.id;if(!a||!s)continue;const c=n.get(a);c?c.push(s):n.set(a,[s]);}const r=[];for(const[o,i]of n){const a=i.length>0&&i.every(s=>t.has(s));r.push({species:o,itemIds:i,allFavorited:a});}return r.sort((o,i)=>o.species.localeCompare(i.species)),r}async function hv(e){const t=Lt().get();if(!t?.items)return;const n=new Set(t.favoritedItemIds??[]),r=[];for(const a of t.items){const s=a;if(s.itemType!=="Produce"||s.species!==e)continue;const c=s.id;c&&r.push({id:c,favorited:n.has(c)});}if(r.length===0)return;const o=r.every(a=>a.favorited),i=o?r.filter(a=>a.favorited):r.filter(a=>!a.favorited);console.log(`🔄 [BulkFavorite] ${o?"Unfavoriting":"Favoriting"} ${i.length}/${r.length} ${e}`);for(const a of i)zr(a.id),await fv(tv);}function qo(e,t){const{species:n,itemIds:r,allFavorited:o}=e;return lv({species:n,itemCount:r.length,isFavorited:o,isMobile:t,onClick:()=>hv(n)})}function bv(e){const t=b("div",{id:an}),n=e.getBoundingClientRect(),r=Math.max(window.innerHeight-Zy,ev);return t.style.maxHeight=`${r}px`,t.style.position="fixed",t.style.left=`${n.right+Qy}px`,t.style.top=`${n.top}px`,t}function Ga(e,t,n){const r=b("div",{id:e,className:"gemini-qol-bulkFavorite-row"}),o=t.getBoundingClientRect();return n==="top"?r.style.bottom=`${window.innerHeight-o.top+Vo}px`:r.style.top=`${o.bottom+Vo}px`,r.style.left=`${o.left}px`,r.style.maxWidth=`${o.width}px`,r}function Wa(){const e=gv();kc()?vv(e):yv(e);}function yv(e){if(Qe){if(Qe.innerHTML="",e.length===0){Qe.style.display="none";return}Qe.style.display="flex";for(const t of e)Qe.appendChild(qo(t,false));console.log(`🎯 [BulkFavorite] Desktop: Rendered ${e.length} produce types`);}}function vv(e){if(!Ze||!Je)return;if(Ze.innerHTML="",Je.innerHTML="",e.length===0){Ze.style.display="none",Je.style.display="none";return}Ze.style.display="flex";const t=e.slice(0,Da),n=e.slice(Da);for(const r of t)Ze.appendChild(qo(r,true));if(n.length>0){Je.style.display="flex";for(const r of n)Je.appendChild(qo(r,true));}else Je.style.display="none";console.log(`🎯 [BulkFavorite] Mobile: Rendered ${e.length} types`);}function xv(){const e=document.querySelector(".McGrid");if(!e)return console.log("⚠️ [BulkFavorite] No .McGrid found"),null;const t=e.getBoundingClientRect();if(window.innerWidth<=wc)return console.log(`🎯 [BulkFavorite] Mobile mode - using McGrid: ${Math.round(t.width)}x${Math.round(t.height)}`),e;const r=window.innerWidth/2;let o=null,i=0;const a=e.querySelectorAll(".McFlex, .McGrid");for(const s of a){const c=s.getBoundingClientRect();if(c.width<200||c.height<200||c.width>window.innerWidth-100)continue;const d=c.left+c.width/2,l=1-Math.abs(d-r)/r,p=c.width*c.height*l;p>i&&(o=s,i=p);}if(o){const s=o.getBoundingClientRect();return console.log(`🎯 [BulkFavorite] Found desktop container: ${Math.round(s.width)}x${Math.round(s.height)} @ (${Math.round(s.left)}, ${Math.round(s.top)})`),o}return console.log(`🎯 [BulkFavorite] Fallback to McGrid: ${Math.round(t.width)}x${Math.round(t.height)}`),e}let zt=null;function Xo(){zt&&clearTimeout(zt),zt=setTimeout(()=>{wv();},nv);}function wv(){const e=xv();if(!e)return;console.log("🎯 [BulkFavorite] Found inventory modal container"),vn(),Sc(),yn=e,kc()?(Ze=Ga(rv,e,"top"),Je=Ga(ov,e,"bottom"),document.body.appendChild(Ze),document.body.appendChild(Je)):(Qe=bv(e),document.body.appendChild(Qe)),Wa(),Bt&&Bt(),Bt=Lt().subscribeFavorites(()=>{sn&&Wa();});}function vn(){zt&&(clearTimeout(zt),zt=null),Bt&&(Bt(),Bt=null),Qe?.remove(),Qe=null,Ze?.remove(),Ze=null,Je?.remove(),Je=null,yn=null;}function kv(){vn();}async function Jo(){if(!Mn().enabled){console.log("⚠️ [BulkFavorite] Feature disabled");return}Sc();const t=await hi.onChangeNow(o=>{const i=o==="inventory";i!==sn&&(sn=i,i?Xo():vn());}),n=Ky(".McGrid",()=>{sn&&(Qe||Ze||Xo());}),r=Yy(".McGrid",o=>{yn&&yn===o&&vn();});tr(()=>t()),tr(()=>n.disconnect()),tr(()=>r.disconnect()),tr(()=>{vn(),sn=false,yn=null;}),console.log("✅ [BulkFavorite] Started (State-driven + DOM observation)");}function Qo(){pv(),mv(),console.log("🛑 [BulkFavorite] Stopped");}function Sv(e){const t=Mn();t.enabled=e,e?Jo():Qo();}let nr=false;const Zo={init(){nr||(Jo(),nr=true);},destroy(){nr&&(Qo(),nr=false);},isEnabled(){return tc()},renderButton:Xo,removeButton:kv,startWatching:Jo,stopWatching:Qo,setEnabled:Sv},Ee={autoFavorite:{enabled:false},bulkFavorite:{enabled:false},journalChecker:{enabled:false},pets:{enabled:true},cropSizeIndicator:{enabled:false,showForGrowing:true,showForMature:true,showJournalBadges:true},eggProbabilityIndicator:{enabled:false},cropValueIndicator:{enabled:false},xpTracker:{enabled:false},abilityTracker:{enabled:false},mutationTracker:{enabled:false},cropBoostTracker:{enabled:false},turtleTimer:{enabled:false}};class Cv extends Ht{constructor(){super({id:"tab-feature-settings",label:"Features"});W(this,"config",Ee);}async build(n){const r=this.createGrid("12px");r.id="feature-settings",n.appendChild(r);const o=Te(Me.CONFIG,{});this.config=this.mergeConfig(o),r.appendChild(this.createQOLCard()),r.appendChild(this.createVisualIndicatorsCard()),r.appendChild(this.createTrackingCard());}mergeConfig(n){return {autoFavorite:{...Ee.autoFavorite,...n.autoFavorite},bulkFavorite:{...Ee.bulkFavorite,...n.bulkFavorite},journalChecker:{...Ee.journalChecker,...n.journalChecker},pets:{...Ee.pets,...n.pets},cropSizeIndicator:{...Ee.cropSizeIndicator,...n.cropSizeIndicator},eggProbabilityIndicator:{...Ee.eggProbabilityIndicator,...n.eggProbabilityIndicator},cropValueIndicator:{...Ee.cropValueIndicator,...n.cropValueIndicator},xpTracker:{...Ee.xpTracker,...n.xpTracker},abilityTracker:{...Ee.abilityTracker,...n.abilityTracker},mutationTracker:{...Ee.mutationTracker,...n.mutationTracker},cropBoostTracker:{...Ee.cropBoostTracker,...n.cropBoostTracker},turtleTimer:{...Ee.turtleTimer,...n.turtleTimer}}}createQOLCard(){return $e({title:"Quality of Life",padding:"lg",expandable:true,defaultExpanded:true},this.createToggleRow("Auto-Favorite",this.config.autoFavorite.enabled,n=>{this.config.autoFavorite.enabled=n,this.saveConfig();}),this.createToggleRow("Bulk Favorite",this.config.bulkFavorite.enabled,n=>{this.config.bulkFavorite.enabled=n,this.saveConfig(),Zo.setEnabled(n);}),this.createToggleRow("Journal Checker",this.config.journalChecker.enabled,n=>{this.config.journalChecker.enabled=n,this.saveConfig();}),this.createToggleRow("Pets Panel",this.config.pets.enabled,n=>{this.config.pets.enabled=n,this.saveConfig();},"Show/hide the Pets tab"))}createVisualIndicatorsCard(){return $e({title:"Visual Indicators",variant:"soft",padding:"lg",expandable:true,defaultExpanded:true},this.createToggleRow("Crop Size",this.config.cropSizeIndicator.enabled,n=>{this.config.cropSizeIndicator.enabled=n,this.saveConfig();},"Shows size % and journal badges"),this.createToggleRow("Egg Probability",this.config.eggProbabilityIndicator.enabled,n=>{this.config.eggProbabilityIndicator.enabled=n,this.saveConfig();},"Shows hatch chances + mutation %"),this.createToggleRow("Crop Value",this.config.cropValueIndicator.enabled,n=>{this.config.cropValueIndicator.enabled=n,this.saveConfig();},"Shows coin value"))}createTrackingCard(){return $e({title:"Tracking & Analytics",variant:"soft",padding:"lg",expandable:true,defaultExpanded:false},this.createToggleRow("XP Tracker",this.config.xpTracker.enabled,n=>{this.config.xpTracker.enabled=n,this.saveConfig();}),this.createToggleRow("Ability Tracker",this.config.abilityTracker.enabled,n=>{this.config.abilityTracker.enabled=n,this.saveConfig();}),this.createToggleRow("Mutation Tracker",this.config.mutationTracker.enabled,n=>{this.config.mutationTracker.enabled=n,this.saveConfig();}),this.createToggleRow("Crop Boost Tracker",this.config.cropBoostTracker.enabled,n=>{this.config.cropBoostTracker.enabled=n,this.saveConfig();}),this.createToggleRow("Turtle Timer",this.config.turtleTimer.enabled,n=>{this.config.turtleTimer.enabled=n,this.saveConfig();}))}createToggleRow(n,r,o,i){const a=b("div",{className:i?"kv-col":"kv"}),s=b("div",{className:"kv"}),c=ei({text:n,tone:"default",size:"md"}),d=oi({checked:r,onChange:o});if(s.append(c.root,d.root),i){a.appendChild(s);const l=b("p",{className:"helper-text",style:"font-size: 12px; color: var(--item-desc, var(--muted)); margin-top: 4px;"},i);return a.appendChild(l),a}return s}saveConfig(){je(Me.CONFIG,this.config),console.log("[FeatureSettings] Config saved:",this.config);}}const Av=(function(){const t=typeof document<"u"&&document.createElement("link").relList;return t&&t.supports&&t.supports("modulepreload")?"modulepreload":"preload"})(),Tv=function(e){return "/"+e},Ha={},Iv=function(t,n,r){let o=Promise.resolve();if(n&&n.length>0){let c=function(d){return Promise.all(d.map(l=>Promise.resolve(l).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),s=a?.nonce||a?.getAttribute("nonce");o=c(n.map(d=>{if(d=Tv(d),d in Ha)return;Ha[d]=true;const l=d.endsWith(".css"),u=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${u}`))return;const p=document.createElement("link");if(p.rel=l?"stylesheet":Av,l||(p.as="script"),p.crossOrigin="",p.href=d,s&&p.setAttribute("nonce",s),document.head.appendChild(p),l)return new Promise((f,m)=>{p.addEventListener("load",f),p.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${d}`)));})}));}function i(a){const s=new Event("vite:preloadError",{cancelable:true});if(s.payload=a,window.dispatchEvent(s),!s.defaultPrevented)throw a}return o.then(a=>{for(const s of a||[])s.status==="rejected"&&i(s.reason);return t().catch(i)})},Pv=`
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
`,Ev=`
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
`;function Mv(e){const{count:t,expanded:n=false,onClick:r}=e,o=b("div",{className:"journal-see-more"}),i=b("span",{className:"journal-see-more-link"},ho(t,n));r&&i.addEventListener("click",r),o.appendChild(i);const a=o;return a.setCount=s=>{i.textContent=ho(s,n);},a.setExpanded=s=>{i.textContent=ho(t,s);},a}function ho(e,t){return t?"− Show less":`+ and ${e} more...`}const Lv=e=>e<15?"#F98B4B":e<25?"#FC6D30":e<50?"#F3D32B":e<75?"#E9B52F":e<100?"#5EAC46":"#0B893F",_v=e=>e>=100?"var(--complete)":e>=75?"var(--high)":e>=50?"var(--medium)":"var(--low)",Fv={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function Ua(e){return e?Fv[e]??0:0}function Va(e,t){try{if(t==="pets")return (de.get("pets")||{})[e]?.rarity||null;if(t==="plants")return (de.get("plants")||{})[e]?.seed?.rarity||null}catch{}return null}function Ov({progress:e,activeTab:t,expandedCategories:n,onSpeciesClick:r,onToggleExpand:o}){const i=b("div",{className:"journal-content"}),a=b("div",{className:"journal-header"},"Garden Journal");if(i.appendChild(a),t!=="all"){const s=t==="plants"?e.plants:e.pets,c=b("div",{className:"journal-progress-indicator"}),d=Math.floor(s.variantsLogged/s.variantsTotal*100),l=b("span",{className:"percentage"},`Collected ${d}%`),u=b("span",{className:"count"},` (${s.variantsLogged}/${s.variantsTotal})`);c.appendChild(l),c.appendChild(u),i.appendChild(c);}return t==="all"?(i.appendChild(rr("Produce",e.plants,"plants",n.has("plants"),r,()=>o("plants"),true)),i.appendChild(rr("Pets",e.pets,"pets",n.has("pets"),r,()=>o("pets"),true))):t==="plants"?i.appendChild(rr("Produce",e.plants,"plants",n.has("plants"),r,()=>o("plants"))):i.appendChild(rr("Pets",e.pets,"pets",n.has("pets"),r,()=>o("pets"))),i}function rr(e,t,n,r,o,i,a=false){const s=b("div",{style:"display: flex; flex-direction: column;"}),c=b("div",{style:`
            max-height: ${r?"480px":"none"};
            overflow-y: ${r?"auto":"visible"};
            overflow-x: hidden;
            margin-bottom: 8px;
        `,className:"journal-species-list"}),d=b("div",{className:"journal-category-stats",style:"height: 28px; line-height: 28px; margin-bottom: 0; display: flex; align-items: center; gap: 6px;"}),l=b("div",{style:"width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(ie.isReady()){const h=n==="plants"?"plant":"pet",v=n==="plants"?"Carrot":"CommonEgg";if(ie.has(h,v)){const k=ie.toCanvas(h,v,{scale:.3});k.style.maxWidth="20px",k.style.maxHeight="20px",k.style.display="block",l.appendChild(k);}}}catch{}const u=t.speciesDetails.length,p=t.total,f=b("span",{},`[ ${e.toUpperCase()} ] — ${u}/${p} SPECIES`);if(d.append(l,f),s.appendChild(d),a){const h=b("div",{className:"journal-progress-indicator",style:"text-align: right; margin-bottom: 4px;"}),v=Math.floor(t.variantsLogged/t.variantsTotal*100),k=b("span",{className:"percentage"},`Collected ${v}%`),w=b("span",{className:"count"},` (${t.variantsLogged}/${t.variantsTotal})`);h.appendChild(k),h.appendChild(w),s.appendChild(h);}const m=[...t.speciesDetails].sort((h,v)=>{const k=Va(h.species,n),w=Va(v.species,n),x=Ua(k)-Ua(w);return x!==0?x:h.species.localeCompare(v.species,void 0,{numeric:true,sensitivity:"base"})}),g=r?m:m.slice(0,5);for(const h of g)c.appendChild(Rv(h,n,o));if(s.appendChild(c),t.speciesDetails.length>5){const h=Mv({count:t.speciesDetails.length-5,expanded:r,onClick:()=>{i();}});s.appendChild(h);}else s.appendChild(b("div",{style:"height: 28px;"}));return s}function Rv(e,t,n){const r=b("div",{className:"journal-row",style:"height: 56px;",onclick:p=>{p.stopPropagation(),n(e,t);}}),o=b("div",{style:"width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{let f=t==="plants"?"plant":"pet",m=e.species;t==="plants"&&(e.species==="DawnCelestial"&&(m="DawnCelestialCrop"),e.species==="MoonCelestial"&&(m="MoonCelestialCrop"),e.species==="OrangeTulip"&&(m="Tulip"));const g=e.isComplete?["Rainbow"]:[],h=(k,w)=>{try{if(ie.has(k,w))return ie.toCanvas(k,w,{scale:.4,mutations:g})}catch{}return null},v=h(f,m)||(t==="plants"?h("tallplant",m):null)||h(f,m.toLowerCase())||(t==="plants"?h("tallplant",m.toLowerCase()):null);v?(v.style.maxWidth="32px",v.style.maxHeight="32px",v.style.display="block",o.appendChild(v)):console.warn(`[JournalChecker] No sprite found for ${e.species} in ${t}`);}catch(p){console.error(`[JournalChecker] Sprite error for ${e.species}`,p);}const i=b("div",{style:"flex: 1; position: relative; height: 22px;"}),a=b("div",{className:"journal-bar-container",style:"width: 100%; height: 100%; border-radius: 4px; overflow: hidden;"});let s;if(e.isComplete)s="width: 100%; height: 100%; background: linear-gradient(90deg, rgb(255,0,0) 0%, rgb(255,154,0) 14%, rgb(255,255,0) 28%, rgb(0,255,0) 42%, rgb(0,200,255) 56%, rgb(0,0,255) 70%, rgb(143,0,255) 84%, rgb(255,0,255) 100%);";else {const p=Lv(e.variantsPercentage);s=`width: ${Math.max(2,e.variantsPercentage)}%; height: 100%; background: ${p};`;}const c=b("div",{className:e.isComplete?"journal-bar-fill rainbow":"journal-bar-fill",style:s});a.appendChild(c);const d=b("div",{style:"position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-weight: 600; font-size: 14px; color: var(--journal-ink); z-index: 1; pointer-events: none;"},e.species);i.append(a,d);const l=_v(e.variantsPercentage),u=b("span",{style:`flex-shrink: 0; font-weight: 800; font-size: 13px; min-width: 50px; text-align: right; color: ${l};`},`${Math.round(e.variantsPercentage)}%`);return r.append(o,i,u),r}function Nv({species:e,category:t,onBack:n}){const r=b("div",{className:"journal-content"}),o=b("div",{className:"journal-back",onclick:d=>{d.stopPropagation(),n();}},"← Return");r.appendChild(o);const i=b("div",{className:"journal-header"},e.species);r.appendChild(i);const a=b("div",{className:"journal-category-stats",style:"text-align: center; height: 28px; line-height: 28px; margin-bottom: 28px;"},`[ ${e.variantsLogged.length} / ${e.variantsTotal} STAMPS ]`);r.appendChild(a);const s=b("div",{className:"journal-grid"}),c=[...e.variantsLogged,...e.variantsMissing].sort((d,l)=>d==="Normal"?-1:l==="Normal"||d==="Max Weight"?1:l==="Max Weight"?-1:d.localeCompare(l));for(const d of c){const l=e.variantsLogged.includes(d);s.appendChild(Dv(e.species,d,t,l));}return r.appendChild(s),r}function Dv(e,t,n,r){const o=b("div",{className:"journal-stamp-wrapper"}),i=b("div",{className:"journal-stamp",style:r?"":"opacity: 0.1; filter: grayscale(100%);"});try{const s=t!=="Normal"&&t!=="Max Weight"?[t]:[];let d=n==="plants"?"plant":"pet",l=e;n==="plants"&&(e==="DawnCelestial"&&(l="DawnCelestialCrop"),e==="MoonCelestial"&&(l="MoonCelestialCrop"),e==="OrangeTulip"&&(l="Tulip"));const u=(f,m)=>{try{const g=t==="Max Weight"?.72:.6;if(ie.has(f,m))return ie.toCanvas(f,m,{mutations:s,scale:g,boundsMode:"padded"})}catch{}return null},p=u(d,l)||(n==="plants"?u("tallplant",l):null)||u(d,l.toLowerCase())||(n==="plants"?u("tallplant",l.toLowerCase()):null);p&&(p.style.width="44px",p.style.height="44px",p.style.objectFit="contain",p.style.display="block",i.appendChild(p));}catch{}const a=b("div",{className:"journal-stamp-label"},t);return o.append(i,a),o}const $v=`
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
`;function jv(e){const{label:t,tabId:n,tabIndex:r,active:o=false,onClick:i}=e,a=b("button",{className:`journal-tab ${o?"active":""}`,"data-tab":n,"data-tab-index":String(r)},t),s=`var(--journal-tab-${Math.min(5,Math.max(1,r))})`;a.style.setProperty("--tab-color",s),i&&a.addEventListener("click",i);const c=a;return c.setActive=d=>{d?a.classList.add("active"):a.classList.remove("active");},c.setLabel=d=>{a.textContent=d;},c}const Bv=`
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
`,zv={activeTab:"all",expandedCategories:[]};let St=null;async function Gv(){return St||(St=await Pr("tab-journal-checker",{version:1,defaults:zv}),St)}function or(){if(!St)throw new Error("[JournalChecker] Section state not initialized. Call initSectionState() first.");return St}function ir(){return St!==null}const Wv=[{id:"all",label:"All",colorTheme:"teal"},{id:"plants",label:"Crops",colorTheme:"green"},{id:"pets",label:"Pets",colorTheme:"purple"}];class Hv extends Ht{constructor(){super({id:"tab-journal-checker",label:"Journal"});W(this,"progress",null);W(this,"currentView",{type:"overview"});}async build(n){this.container=n,await Gv(),await ie.init(),console.log("[JournalChecker] Sprite categories:",ie.getCategories());const r=n.getRootNode();wt(r,Pv,"journal-checker-styles"),wt(r,$v,"journal-tab-styles"),wt(r,Bv,"journal-progress-bar-styles"),wt(r,Ev,"journal-see-more-styles"),this.container.classList.add("journal-checker-host"),this.container.style.height="100%",this.container.style.overflowY="auto",await this.updateProgress();const o=(i=>{this.progress=i.detail,this.refresh();});window.addEventListener("gemini:journal-updated",o),this.addCleanup(()=>{window.removeEventListener("gemini:journal-updated",o);});}async updateProgress(){try{const{MGJournalChecker:n}=await Iv(async()=>{const{MGJournalChecker:r}=await Promise.resolve().then(()=>Hy);return {MGJournalChecker:r}},void 0);this.progress=await n.aggregateJournalProgress(),this.refresh();}catch(n){console.error("[JournalChecker] Failed to load progress:",n);}}get activeTab(){return ir()?or().get().activeTab:"all"}set activeTab(n){ir()&&or().update({activeTab:n});}get expandedCategories(){return ir()?new Set(or().get().expandedCategories):new Set}setExpandedCategories(n){ir()&&or().update({expandedCategories:Array.from(n)});}refresh(){if(this.container){if(this.container.innerHTML="",!this.progress){this.container.appendChild(b("div",{style:"padding: 20px; text-align: center; font-family: var(--font-game); color: var(--journal-sub);"},"Loading Journal..."));return}this.container.appendChild(this.renderTabNavigation()),this.currentView.type==="overview"?this.container.appendChild(Ov({progress:this.progress,activeTab:this.activeTab,expandedCategories:this.expandedCategories,onSpeciesClick:(n,r)=>{this.currentView={type:"species",species:n,category:r},this.refresh();},onToggleExpand:n=>{const r=this.expandedCategories;r.has(n)?r.delete(n):r.add(n),this.setExpandedCategories(r),this.refresh();}})):this.container.appendChild(Nv({species:this.currentView.species,category:this.currentView.category,onBack:()=>{this.currentView={type:"overview"},this.refresh();}}));}}renderTabNavigation(){const n=b("div",{className:"journal-tabs-container"});return Wv.forEach((r,o)=>{const i=jv({label:r.label,tabId:r.id,tabIndex:o+1,active:this.activeTab===r.id,onClick:()=>{this.activeTab=r.id,this.refresh();}});n.appendChild(i);}),n}}function Uv(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("width","24"),e.setAttribute("height","24"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","2"),e.setAttribute("stroke-linecap","round"),e.style.color="var(--accent)";const t=document.createElementNS("http://www.w3.org/2000/svg","line");t.setAttribute("x1","12"),t.setAttribute("y1","5"),t.setAttribute("x2","12"),t.setAttribute("y2","19");const n=document.createElementNS("http://www.w3.org/2000/svg","line");return n.setAttribute("x1","5"),n.setAttribute("y1","12"),n.setAttribute("x2","19"),n.setAttribute("y2","12"),e.appendChild(t),e.appendChild(n),e}function Vv(e,t){const n=e;let r=e;const o=os({value:e,placeholder:"Team name",mode:"alphanumeric",allowSpaces:true,maxLength:50,blockGameKeys:true,onChange:i=>{const a=i.trim();a&&a!==r&&(r=a,t?.(a));},onEnter:i=>{const a=i.trim()||n;a!==r&&(r=a,t?.(a));}});return o.root.className="team-list-item__name-input",o.input.addEventListener("blur",()=>{const i=o.getValue().trim()||n;i!==r&&(r=i,t?.(i));}),o.input.addEventListener("keydown",i=>{i.key==="Escape"&&(i.preventDefault(),o.input.blur());}),o.root}function Kv(e){const t=b("div",{className:"team-list-item"}),n=e.customIndicator??b("div",{className:`team-list-item__indicator ${e.isActive?"team-list-item__indicator--active":"team-list-item__indicator--inactive"}`}),r=e.isNameEditable?Vv(e.team.name,e.onNameChange):b("div",{textContent:e.team.name,className:`team-list-item__name ${e.isActive?"team-list-item__name--active":"team-list-item__name--inactive"}`}),o=b("div",{className:"team-list-item__sprites"});function i(){const c=ot.myPets.get();o.innerHTML="";for(let d=0;d<3;d++){const l=e.team.petIds[d],u=l&&l!=="",p=b("div",{className:`team-list-item__sprite-slot ${e.showSlotStyles&&!u?"team-list-item__sprite-slot--empty":""}`});if(e.onSlotClick&&(p.style.cursor="pointer",p.addEventListener("click",()=>{e.onSlotClick(d);})),u){let f=c.all.find(m=>m.id===l);if(!f){const m=window.__petDataCache;m&&m.has(l)&&(f=m.get(l));}if(f)try{const m=ie.toCanvas("pet",f.petSpecies,{mutations:f.mutations,scale:1}),g=document.createElement("canvas");g.width=m.width,g.height=m.height;const h=g.getContext("2d");if(h&&h.drawImage(m,0,0),g.style.width="100%",g.style.height="100%",g.style.objectFit="contain",p.appendChild(g),e.showSlotStyles){const v=b("div",{className:"team-list-item__sprite-slot-overlay"});p.appendChild(v),p.classList.add("team-list-item__sprite-slot--filled");}}catch(m){console.warn(`[TeamListItem] Failed to render sprite for pet ${f.petSpecies}:`,m);const g=b("div",{textContent:"🐾",className:"team-list-item__sprite-placeholder"});p.appendChild(g);}else {const m=b("div",{textContent:"⏳",className:"team-list-item__sprite-placeholder"});p.appendChild(m),console.warn(`[TeamListItem] Pet ${l} not found in myPets yet, waiting for update`);let g=false;const h=ot.myPets.subscribe(()=>{if(g)return;const k=ot.myPets.get().all.find(w=>w.id===l);if(k){g=true,h();try{p.innerHTML="";const w=ie.toCanvas("pet",k.petSpecies,{mutations:k.mutations,scale:1}),x=document.createElement("canvas");x.width=w.width,x.height=w.height;const T=x.getContext("2d");if(T&&T.drawImage(w,0,0),x.style.width="100%",x.style.height="100%",x.style.objectFit="contain",p.appendChild(x),e.showSlotStyles){const y=b("div",{className:"team-list-item__sprite-slot-overlay"});p.appendChild(y),p.classList.add("team-list-item__sprite-slot--filled");}console.log(`[TeamListItem] Pet ${l} sprite updated`);}catch(w){console.warn(`[TeamListItem] Failed to render sprite for pet ${k.petSpecies}:`,w),p.innerHTML="<div class='team-list-item__sprite-placeholder'>🐾</div>";}}},{immediate:false});}}else if(e.showSlotStyles&&!u){const f=Uv();p.appendChild(f);}o.appendChild(p);}}i();const a=ot.myPets.subscribe(()=>{i();});if(!e.hideDragHandle){const c=b("div",{textContent:"⋮⋮",className:"team-list-item__drag-handle"});t.appendChild(c);}t.appendChild(n),t.appendChild(r),t.appendChild(o);const s=new MutationObserver(()=>{document.contains(t)||(s.disconnect(),a());});return s.observe(document.body,{childList:true,subtree:true}),t}function Yv(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function qv(e){const{segments:t,selected:n=t[0]?.id??"",size:r="md",fullWidth:o=false,disabled:i=false,onChange:a}=e,s=b("div",{className:"sg-root"});r!=="md"&&s.classList.add(`sg--${r}`),o&&(s.style.width="100%");const c=b("div",{className:"sg-container",role:"tablist"}),d=b("div",{className:"sg-indicator"}),l=t.map(y=>{const C=b("button",{className:"sg-btn",type:"button",role:"tab","aria-selected":"false",title:y.label});if(C.id=y.id,y.icon){const S=b("span",{className:"sg-icon"}),P=Yv(y.icon);P&&S.appendChild(P),C.appendChild(S);}const I=b("span",{className:"sg-label"},y.label);return C.appendChild(I),C.disabled=!!y.disabled,C});c.appendChild(d),l.forEach(y=>c.appendChild(y)),s.appendChild(c);let u=n,p=i;function f(){const y=l.find(C=>C.id===u);y&&requestAnimationFrame(()=>{const C=d,I=y.offsetLeft,S=y.offsetWidth;C.style.width=`${S}px`,C.style.transform=`translateX(${I}px)`;});}function m(){l.forEach(y=>{const C=y.id===u;y.classList.toggle("active",C),y.setAttribute("aria-selected",String(C)),y.disabled=p||!!t.find(I=>I.id===y.id)?.disabled;}),f();}function g(y){const C=y.currentTarget;if(C.disabled)return;v(C.id);}function h(y){if(p)return;const C=l.findIndex(S=>S.id===u);let I=C;if(y.key==="ArrowLeft"||y.key==="ArrowUp"?(y.preventDefault(),I=(C-1+l.length)%l.length):y.key==="ArrowRight"||y.key==="ArrowDown"?(y.preventDefault(),I=(C+1)%l.length):y.key==="Home"?(y.preventDefault(),I=0):y.key==="End"&&(y.preventDefault(),I=l.length-1),I!==C){const S=l[I];S&&!S.disabled&&(v(S.id),S.focus());}}l.forEach(y=>{y.addEventListener("click",g),y.addEventListener("keydown",h);});function v(y){!t.some(I=>I.id===y)||u===y||(u=y,m(),a?.(u));}function k(){return u}function w(y){p=!!y,m();}function x(){l.forEach(y=>{y.removeEventListener("click",g),y.removeEventListener("keydown",h);});}m(),queueMicrotask(()=>{const y=l.find(C=>C.id===u);if(y){const C=d;C.style.width=`${y.offsetWidth}px`,C.style.transform=`translateX(${y.offsetLeft}px)`;}});const T=s;return T.select=v,T.getSelected=k,T.setDisabled=w,T.destroy=x,T}function Xv(e={}){const{id:t,checked:n=false,disabled:r=false,size:o="md",label:i,labelSide:a="right",onChange:s}=e,c=b("div",{className:"lg-checkbox-wrap"}),d=b("input",{className:`lg-checkbox lg-checkbox--${o}`,id:t,type:"checkbox",checked:!!n,disabled:!!r});let l=null;i&&a!=="none"&&(l=b("label",{className:"lg-checkbox-label",htmlFor:t},i)),l&&a==="left"?c.append(l,d):l&&a==="right"?c.append(d,l):c.append(d);let u=!!n,p=!!r;function f(){d.checked=u,d.disabled=p;}function m(C=false){p||(u=!u,f(),C||s?.(u));}function g(){p||m();}function h(C){p||(C.key===" "||C.key==="Enter")&&(C.preventDefault(),m());}d.addEventListener("click",g),d.addEventListener("keydown",h);function v(){return u}function k(C,I=false){u=!!C,f(),I||s?.(u);}function w(C){p=!!C,f();}function x(C){if(!C){l&&(l.remove(),l=null);return}l?l.textContent=C:(l=b("label",{className:"lg-checkbox-label",htmlFor:t},C),c.append(l));}function T(){d.focus();}function y(){d.removeEventListener("click",g),d.removeEventListener("keydown",h);}return f(),{root:c,input:d,isChecked:v,setChecked:k,setDisabled:w,setLabel:x,focus:T,destroy:y}}function Jv(e){const t=getComputedStyle(e);if(!/(auto|scroll|overlay)/.test(t.overflowY+t.overflowX))return  false;const n=e.scrollHeight,r=e.clientHeight,o=e.scrollWidth,i=e.clientWidth;return n>r+1||o>i+1}function Qv(e){const t={overflow:e.style.overflow,overflowY:e.style.overflowY,overflowX:e.style.overflowX,touchAction:e.style.touchAction,overscrollBehavior:e.style.overscrollBehavior};e.style.overflow="hidden",e.style.overflowY="hidden",e.style.overflowX="hidden",e.style.touchAction="none",e.style.overscrollBehavior="contain";let n=false;return ()=>{n||(n=true,e.style.overflow=t.overflow,e.style.overflowY=t.overflowY,e.style.overflowX=t.overflowX,e.style.touchAction=t.touchAction,e.style.overscrollBehavior=t.overscrollBehavior);}}function Zv(e){const t=[],n=new Set;let r=e;for(;r;){if(r instanceof ShadowRoot){r=r.host;continue}if(r instanceof HTMLElement)!n.has(r)&&r!==e&&Jv(r)&&(t.push(r),n.add(r)),r=r.parentElement??r.parentNode;else break}return document.body&&t.push(document.body),document.documentElement&&t.push(document.documentElement),t.filter((o,i,a)=>a.indexOf(o)===i)}function ex(e){const n=Zv(e).map(Qv);let r=false;return ()=>{if(!r){r=true;for(let o=n.length-1;o>=0;o--)try{n[o]();}catch{}}}}class tx{constructor(t={}){W(this,"card",null);W(this,"modeControl",null);W(this,"modeContainer",null);W(this,"teamContent",null);W(this,"listContainer",null);W(this,"dragState",null);W(this,"longPressState",null);W(this,"teamMode","overview");W(this,"selectedTeamIds",new Set);W(this,"teamCheckboxes",new Map);W(this,"onPointerMove");W(this,"onPointerUp");W(this,"onPointerCancel");W(this,"onLongPressPointerMove");W(this,"onLongPressPointerUp");W(this,"options");this.options=t,this.onPointerMove=this.handlePointerMove.bind(this),this.onPointerUp=this.handlePointerUp.bind(this),this.onPointerCancel=this.handlePointerCancel.bind(this),this.onLongPressPointerMove=this.handleLongPressPointerMove.bind(this),this.onLongPressPointerUp=this.handleLongPressPointerUp.bind(this);}build(){return this.card?this.card:this.createTeamCard()}destroy(){this.cleanupDrag(),this.cleanupLongPress(),this.modeControl&&(this.modeControl.destroy(),this.modeControl=null),this.teamCheckboxes.forEach(t=>{t.destroy();}),this.teamCheckboxes.clear(),this.selectedTeamIds.clear(),this.card=null,this.modeContainer=null,this.teamContent=null,this.listContainer=null;}render(){if(!this.card)return;if(!he.isEnabled()){this.renderDisabledState();return}this.modeContainer&&(this.modeContainer.style.display="flex"),this.ensureModeControl(),this.renderTeamContent();}createTeamCard(){const t=b("div",{className:"team-card-wrapper"});this.modeContainer=b("div",{className:"team-card__mode-container"}),t.appendChild(this.modeContainer),this.teamContent=b("div",{className:"team-card__content"}),t.appendChild(this.teamContent);const n=$e({title:"Team",subtitle:"Organize and switch between pet teams",expandable:true,defaultExpanded:true},t);return this.card=n,n}ensureModeControl(){if(this.modeContainer){if(!this.modeControl){this.modeControl=qv({segments:[{id:"overview",label:"Overview"},{id:"manage",label:"Manage"}],selected:this.teamMode,onChange:t=>{this.teamMode=t,this.renderTeamContent();}}),this.modeContainer.appendChild(this.modeControl);return}this.modeControl.getSelected()!==this.teamMode&&this.modeControl.select(this.teamMode);}}renderDisabledState(){if(!this.teamContent)return;this.cleanupDrag(),this.listContainer=null,this.modeContainer&&(this.modeContainer.style.display="none");const t=b("div",{className:"team-card__disabled-state"}),n=b("div",{textContent:"Pet Team feature is disabled",className:"team-card__disabled-message"}),r=xt({label:"Enable Feature",onClick:()=>{he.setEnabled(true),this.render();}});t.appendChild(n),t.appendChild(r),this.teamContent.replaceChildren(t);}renderTeamContent(){if(!this.teamContent)return;this.cleanupDrag(),this.cleanupLongPress(),this.listContainer=null,this.teamContent.replaceChildren(),this.teamCheckboxes.forEach(r=>r.destroy()),this.teamCheckboxes.clear(),this.selectedTeamIds.clear();const t=he.getAllTeams(),n=he.getActiveTeamId();if(t.length===0){const r=b("div",{textContent:"No teams yet. Create your first team!",className:"team-card__empty-state"});if(this.teamContent.appendChild(r),this.teamMode==="manage"){const o=b("div",{className:"team-card__actions"}),i=xt({label:"New Team",variant:"primary",onClick:()=>{this.handleCreateTeam();}});o.appendChild(i),this.teamContent.appendChild(o);}return}if(this.listContainer=b("div",{className:"team-card__list-container"}),t.forEach(r=>{const o=n===r.id;let i;this.teamMode==="manage"&&(i=this.createCheckboxIndicator(r.id));const a=Kv({team:r,isActive:o,customIndicator:i?.root,hideDragHandle:this.teamMode==="manage",isNameEditable:this.teamMode==="manage",showSlotStyles:this.teamMode==="manage",onNameChange:s=>{this.handleRenameTeam(r.id,s);},onSlotClick:this.teamMode==="manage"?s=>{this.handleRemovePet(r.id,s);}:void 0});this.teamMode==="manage"&&a.classList.add("team-list-item--manage"),this.teamMode==="overview"&&(a.addEventListener("click",async s=>{if(!s.target.closest(".team-list-item__drag-handle")){a.classList.add("team-list-item--clicked"),setTimeout(()=>{a.classList.remove("team-list-item--clicked");},300);try{await he.activateTeam(r);}catch(d){console.error("[TeamCard] Failed to activate team:",d);}}}),a.addEventListener("pointerdown",s=>{if(s.button!==0)return;s.target.closest(".team-list-item__drag-handle")?this.startDrag(s,a,r.id):this.startLongPress(s,a,r.id);})),this.listContainer.appendChild(a);}),this.teamContent.appendChild(this.listContainer),this.teamMode==="manage"){const r=b("div",{className:"team-card__actions"}),o=xt({label:"New Team",variant:"primary",onClick:()=>{this.handleCreateTeam();}}),i=xt({label:"Delete Team",variant:"danger",disabled:this.selectedTeamIds.size===0,onClick:()=>{this.handleDeleteTeam();}});i.setAttribute("data-action","delete-team"),r.appendChild(o),r.appendChild(i),this.teamContent.appendChild(r);}}handleCreateTeam(){const t="New Team";let n=t,r=1;const o=he.getAllTeams(),i=new Set(o.map(a=>a.name));for(;i.has(n);)n=`${t} (${r})`,r++;try{he.createTeam(n,[])&&this.render();}catch{}}handleDeleteTeam(){if(this.selectedTeamIds.size===0)return;const t=Array.from(this.selectedTeamIds);for(const n of t)he.deleteTeam(n);this.render();}handleRenameTeam(t,n){he.renameTeam(t,n);}handleRemovePet(t,n){const r=he.getTeam(t);if(!r)return;const o=r.petIds[n];!o||o===""?this.handleAddPet(t,n):this.handleRemovePetFromSlot(t,n);}handleRemovePetFromSlot(t,n){const r=he.getTeam(t);if(!r)return;const o=[...r.petIds];o[n]="",he.updateTeam(t,{petIds:o}),this.render();}async handleAddPet(t,n){const r=he.getTeam(t);if(!r)return;const i=ot.myPets.get().all.map(f=>({id:f.id,itemType:"Pet",petSpecies:f.petSpecies,name:f.name??null,xp:f.xp,hunger:f.hunger,mutations:f.mutations||[],targetScale:f.targetScale,abilities:f.abilities||[]})),a=new Set(r.petIds.filter(f=>f!=="")),s=i.filter(f=>!a.has(f.id));await ce.set("myPossiblyNoLongerValidSelectedItemIndexAtom",null);const c=Ke.detect(),d=c.platform==="mobile"||c.viewportWidth<768;console.log("[TeamCard] Environment detection:",{platform:c.platform,viewportWidth:c.viewportWidth,isSmallScreen:d,hasSetHUDOpen:!!this.options.setHUDOpen}),d&&this.options.setHUDOpen&&(console.log("[TeamCard] Closing HUD for small screen"),this.options.setHUDOpen(false));const l=ot.myInventory.subscribeSelection(f=>{if(f.current&&f.current.item){const m=f.current.item,g=[...r.petIds];g[n]=m.id,he.updateTeam(t,{petIds:g}),ce.set("myPossiblyNoLongerValidSelectedItemIndexAtom",null),pn.close().then(()=>{const h=Ke.detect(),v=h.platform==="mobile"||h.viewportWidth<768;console.log("[TeamCard] After selection - reopening HUD:",{platform:h.platform,viewportWidth:h.viewportWidth,shouldReopenHUD:v,hasSetHUDOpen:!!this.options.setHUDOpen}),v&&this.options.setHUDOpen&&(console.log("[TeamCard] Reopening HUD after selection"),this.options.setHUDOpen(true)),this.render();});}});await pn.show("inventory",{items:s,favoritedItemIds:[]}),await pn.waitForClose();const u=Ke.detect(),p=u.platform==="mobile"||u.viewportWidth<768;console.log("[TeamCard] Modal closed without selection - reopening HUD:",{platform:u.platform,viewportWidth:u.viewportWidth,shouldReopenHUD:p,hasSetHUDOpen:!!this.options.setHUDOpen}),p&&this.options.setHUDOpen&&(console.log("[TeamCard] Reopening HUD after modal close"),this.options.setHUDOpen(true)),l();}createCheckboxIndicator(t){const n=Xv({checked:this.selectedTeamIds.has(t),size:"md",onChange:r=>{r?this.selectedTeamIds.add(t):this.selectedTeamIds.delete(t),this.updateDeleteButtonState();}});return this.teamCheckboxes.set(t,n),n}updateDeleteButtonState(){const t=this.teamContent?.querySelector('[data-action="delete-team"]');t&&(t.disabled=this.selectedTeamIds.size===0);}cleanupDrag(){this.dragState&&(window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),window.removeEventListener("pointercancel",this.onPointerCancel),this.dragState=null);}cleanupLongPress(){this.longPressState&&(window.clearTimeout(this.longPressState.timeout),window.removeEventListener("pointermove",this.onLongPressPointerMove),window.removeEventListener("pointerup",this.onLongPressPointerUp),this.longPressState=null);}startLongPress(t,n,r){if(this.cleanupLongPress(),he.getAllTeams().findIndex(d=>d.id===r)===-1)return;const a=t.clientX,s=t.clientY,c=window.setTimeout(()=>{this.longPressState&&this.startDrag(t,n,r);},500);this.longPressState={pointerId:t.pointerId,startX:a,startY:s,timeout:c,target:n},window.addEventListener("pointermove",this.onLongPressPointerMove,{passive:false}),window.addEventListener("pointerup",this.onLongPressPointerUp,{passive:false});}handleLongPressPointerMove(t){if(!this.longPressState||t.pointerId!==this.longPressState.pointerId)return;const n=Math.abs(t.clientX-this.longPressState.startX),r=Math.abs(t.clientY-this.longPressState.startY),o=10;(n>o||r>o)&&this.cleanupLongPress();}handleLongPressPointerUp(t){!this.longPressState||t.pointerId!==this.longPressState.pointerId||this.cleanupLongPress();}handlePointerMove(t){if(!this.dragState||!this.listContainer||t.pointerId!==this.dragState.pointerId)return;t.preventDefault();const n=this.listContainer.getBoundingClientRect();let r=t.clientY-n.top-this.dragState.offsetY;const o=n.height-this.dragState.itemEl.offsetHeight;Number.isFinite(o)&&(r=Math.max(-8,Math.min(o+8,r))),this.dragState.itemEl.style.top=`${r}px`,this.updatePlaceholderPosition(t.clientY);}handlePointerUp(t){!this.dragState||t.pointerId!==this.dragState.pointerId||(t.preventDefault(),this.finishDrag());}handlePointerCancel(t){!this.dragState||t.pointerId!==this.dragState.pointerId||this.finishDrag({revert:true});}updatePlaceholderPosition(t){if(!this.dragState||!this.listContainer)return;const{placeholder:n,itemEl:r}=this.dragState,o=Array.from(this.listContainer.children).filter(s=>s!==r&&s!==n&&s instanceof HTMLElement&&s.classList.contains("team-list-item")),i=new Map;o.forEach(s=>{i.set(s,s.getBoundingClientRect().top);});let a=false;for(const s of o){const c=s.getBoundingClientRect(),d=c.top+c.height/2;if(t<d){n.nextSibling!==s&&this.listContainer.insertBefore(n,s),a=true;break}}a||this.listContainer.appendChild(n),o.forEach(s=>{const c=i.get(s),d=s.getBoundingClientRect().top;if(c!==void 0&&c!==d){const l=c-d;s.style.transform=`translateY(${l}px)`,s.style.transition="none",s.offsetHeight,s.style.transition="transform 0.14s ease",s.style.transform="translateY(0)";}});}startDrag(t,n,r){if(this.dragState||!this.listContainer)return;t.preventDefault();const i=he.getAllTeams().findIndex(u=>u.id===r);if(i===-1)return;const a=n.getBoundingClientRect(),s=this.listContainer.getBoundingClientRect(),c=n.cloneNode(true);c.classList.add("team-list-item--placeholder"),c.classList.remove("team-list-item--dragging");const d=n.style.touchAction;n.style.touchAction="none";const l=ex(n);if(this.dragState={itemEl:n,pointerId:t.pointerId,placeholder:c,offsetY:t.clientY-a.top,fromIndex:i,teamId:r,captureTarget:n,touchActionPrev:d,releaseScrollLock:l},n.classList.add("team-list-item--dragging"),n.style.width=`${a.width}px`,n.style.height=`${a.height}px`,n.style.left=`${a.left-s.left}px`,n.style.top=`${a.top-s.top}px`,n.style.position="absolute",n.style.zIndex="30",n.style.pointerEvents="none",this.listContainer.style.position||(this.listContainer.style.position="relative"),this.listContainer.insertBefore(c,n.nextSibling),this.listContainer.classList.add("is-reordering"),n.setPointerCapture)try{n.setPointerCapture(t.pointerId);}catch{}window.addEventListener("pointermove",this.onPointerMove,{passive:false}),window.addEventListener("pointerup",this.onPointerUp,{passive:false}),window.addEventListener("pointercancel",this.onPointerCancel,{passive:false});}finishDrag(t={}){if(!this.dragState||!this.listContainer)return;const{revert:n=false}=t,{itemEl:r,placeholder:o,fromIndex:i,teamId:a,touchActionPrev:s,releaseScrollLock:c,pointerId:d}=this.dragState;if(this.listContainer.classList.remove("is-reordering"),r.hasPointerCapture(d))try{r.releasePointerCapture(d);}catch{}if(window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),window.removeEventListener("pointercancel",this.onPointerCancel),n){const p=Array.from(this.listContainer.children).filter(f=>f!==r&&f!==o&&f instanceof HTMLElement&&f.classList.contains("team-list-item"))[i]||null;p?this.listContainer.insertBefore(o,p):this.listContainer.appendChild(o);}else {const u=Array.from(this.listContainer.children).filter(f=>f!==r),p=u.indexOf(o);if(p!==-1){const f=u[p];f!==o&&this.listContainer.insertBefore(o,f);}}if(o.replaceWith(r),o.remove(),r.classList.remove("team-list-item--dragging"),r.style.width="",r.style.height="",r.style.left="",r.style.top="",r.style.position="",r.style.zIndex="",r.style.pointerEvents="",r.style.touchAction=s??"",Array.from(this.listContainer.children).filter(u=>u instanceof HTMLElement&&u.classList.contains("team-list-item")).forEach(u=>{u.style.transform="",u.style.transition="";}),c?.(),!n){const p=Array.from(this.listContainer.children).filter(f=>f instanceof HTMLElement&&f.classList.contains("team-list-item")).indexOf(r);if(p!==-1&&p!==i){const m=he.getAllTeams().slice(),[g]=m.splice(i,1);m.splice(p,0,g);const h=m.map(v=>v.id);he.reorderTeams(h),this.options.onTeamReordered?.(h);}}this.dragState=null;}}const nx=[{timestamp:Date.now()-5e3,petName:"Fluffy",petSpecies:"Capybara",abilityName:"Water Boost",data:"+15% water speed"},{timestamp:Date.now()-6e4,petName:"Shadow",petSpecies:"Cat",abilityName:"Night Vision",data:"Revealed 3 hidden items"},{timestamp:Date.now()-12e4,petName:"Buddy",petSpecies:"Dog",abilityName:"Treasure Hunter",data:"Found: Gold Coin x2"},{timestamp:Date.now()-18e4,petName:"Whiskers",petSpecies:"Ferret",abilityName:"Quick Dig",data:"Harvested 5 plots instantly"},{timestamp:Date.now()-24e4,petName:"Fluffy",petSpecies:"Capybara",abilityName:"Water Boost",data:"+15% water speed"},{timestamp:Date.now()-3e5,petName:"Shadow",petSpecies:"Cat",abilityName:"Stealth",data:"Avoided 2 encounters"}];class rx{constructor(){W(this,"card",null);W(this,"listContainer",null);W(this,"logs",[]);W(this,"filteredLogs",[]);}build(){return this.card?this.card:this.createAbilityLogsCard()}destroy(){this.card=null,this.listContainer=null,this.logs=[],this.filteredLogs=[];}render(){this.logs=nx,this.filteredLogs=[...this.logs],this.updateList();}createAbilityLogsCard(){const t=b("div",{className:"ability-logs-container",style:"display: flex; flex-direction: column; gap: 12px;"}),n=b("div",{style:"margin-bottom: 0;"}),r=ii({placeholder:"Search logs...",value:"",debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:i=>{const a=i.trim().toLowerCase();a?this.filteredLogs=this.logs.filter(s=>s.petName.toLowerCase().includes(a)||s.petSpecies.toLowerCase().includes(a)||s.abilityName.toLowerCase().includes(a)||s.data.toLowerCase().includes(a)):this.filteredLogs=[...this.logs],this.updateTable();}});n.appendChild(r.root),t.appendChild(n);const o=[{id:"datetime",header:"Date/Time",sortable:true,width:"140px",render:i=>{const a=new Date(i.timestamp),s=a.toLocaleDateString("en-US",{month:"short",day:"numeric"}),c=a.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"});return b("div",{style:"font-size: 12px; color: var(--fg);"},`${s} ${c}`)}},{id:"pet",header:"Pet",sortable:true,width:"180px",render:i=>{const a=b("div",{style:"display: flex; align-items: center; gap: 8px;"}),s=b("div",{style:"width: 32px; height: 32px; flex-shrink: 0;"});try{const d=ie.toCanvas("pet",i.petSpecies);d&&(d.style.width="100%",d.style.height="100%",d.style.objectFit="contain",s.appendChild(d));}catch{s.textContent="🐾",s.style.display="flex",s.style.alignItems="center",s.style.justifyContent="center",s.style.fontSize="20px";}const c=b("div",{style:"font-size: 13px; font-weight: 600; color: var(--fg); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"},i.petName);return a.appendChild(s),a.appendChild(c),a}},{id:"ability",header:"Ability",sortable:true,width:"150px",render:i=>b("div",{style:"font-size: 13px; font-weight: 600; color: var(--fg);"},i.abilityName)},{id:"data",header:"Data",sortable:false,render:i=>b("div",{style:"font-size: 12px; color: color-mix(in oklab, var(--fg) 80%, #9ca3af); overflow: hidden; text-overflow: ellipsis;"},i.data)}];return this.tableHandle=Table({columns:o,data:[],maxRows:6,emptyText:"No ability logs yet"}),t.appendChild(this.tableHandle.root),this.card=$e({title:"Ability Logs",subtitle:"Track all pet ability activations",expandable:true,defaultExpanded:true},t),this.card}updateTable(){if(!this.tableHandle)return;const t=[...this.filteredLogs].sort((n,r)=>r.timestamp-n.timestamp);this.tableHandle.setData(t);}}const ox=`
  .ability-logs-container {
    /* Container styles are inline in AbilityLogsCard.ts */
  }

  /* Pet sprite container alignment */
  .ability-logs-container .lg-td {
    vertical-align: middle;
  }

  /* Ensure proper spacing in table cells */
  .ability-logs-container .lg-table {
    border-spacing: 0;
  }

  .ability-logs-container .lg-tr {
    border-bottom: 1px solid var(--border);
  }

  .ability-logs-container .lg-tr:last-child {
    border-bottom: none;
  }

  /* Hover effect for rows */
  .ability-logs-container .lg-tr:hover {
    background: color-mix(in oklab, var(--fg) 3%, transparent);
  }
`;class ix extends Ht{constructor(n){super({id:"tab-pets",label:"Pets"});W(this,"unsubscribeMyPets");W(this,"lastActiveTeamId",null);W(this,"teamCardPart",null);W(this,"abilityLogsCardPart",null);W(this,"deps");this.deps=n;}async build(n){this.container=n;const r=n.getRootNode();wt(r,ox,"ability-logs-card-styles");const o=this.createGrid("12px");o.id="pets",n.appendChild(o),this.initializeTeamCardPart(o),this.initializeAbilityLogsCardPart(o),this.unsubscribeMyPets=ot.myPets.subscribeStable(()=>{const i=he.getActiveTeamId();i!==this.lastActiveTeamId&&(this.lastActiveTeamId=i,this.teamCardPart?.render());}),this.lastActiveTeamId=he.getActiveTeamId();}async destroy(){this.unsubscribeMyPets&&(this.unsubscribeMyPets(),this.unsubscribeMyPets=void 0),this.teamCardPart&&(this.teamCardPart.destroy(),this.teamCardPart=null),this.abilityLogsCardPart&&(this.abilityLogsCardPart.destroy(),this.abilityLogsCardPart=null);}initializeTeamCardPart(n){this.teamCardPart||(this.teamCardPart=new tx({onTeamReordered:o=>{console.log("[PetsSection] Teams reordered:",o);},setHUDOpen:this.deps?.setHUDOpen}));const r=this.teamCardPart.build();n.appendChild(r),this.teamCardPart.render();}initializeAbilityLogsCardPart(n){this.abilityLogsCardPart||(this.abilityLogsCardPart=new rx);const r=this.abilityLogsCardPart.build();n.appendChild(r),this.abilityLogsCardPart.render();}}const ax={Store:{select:ce.select.bind(ce),set:ce.set.bind(ce),subscribe:ce.subscribe.bind(ce),subscribeImmediate:ce.subscribeImmediate.bind(ce)},Globals:ot,Modules:{Version:vs,Assets:Ut,Manifest:ct,Data:de,Environment:Ke,CustomModal:pn,Sprite:ie,Tile:ut,Pixi:Ii,Audio:Sl,Cosmetic:Al},Features:{AutoFavorite:Oi,JournalChecker:Ql,BulkFavorite:Tr,Achievements:nc,Tracker:vc,AntiAfk:At,Calculators:Fl,Pets:xc,PetTeam:he},WebSocket:{chat:ib,emote:ab,wish:sb,kickPlayer:lb,setPlayerData:cb,usurpHost:db,reportSpeakingStart:ub,setSelectedGame:pb,voteForGame:fb,requestGame:mb,restartGame:gb,ping:hb,checkWeatherStatus:vb,move:bb,playerPosition:$l,teleport:yb,moveInventoryItem:xb,dropObject:wb,pickupObject:kb,toggleFavoriteItem:zr,putItemInStorage:_i,retrieveItemFromStorage:Fi,moveStorageItem:Sb,logItems:Cb,plantSeed:Ab,waterPlant:Tb,harvestCrop:Ib,sellAllCrops:Pb,purchaseDecor:Eb,purchaseEgg:Mb,purchaseTool:Lb,purchaseSeed:_b,plantEgg:Fb,hatchEgg:Ob,plantGardenPlant:Rb,potPlant:Nb,mutationPotion:Db,pickupDecor:$b,placeDecor:jb,removeGardenObject:Bb,placePet:jl,feedPet:zb,petPositions:Gb,swapPet:Bl,storePet:zl,namePet:Wb,sellPet:Hb},_internal:{getGlobals:rt,initGlobals:Rl,destroyGlobals:Yh}};function sx(){const e=L;e.Gemini=ax,e.MGSprite=ie,e.MGData=de,e.MGPixi=Ii,e.MGAssets=Ut,e.MGEnvironment=Ke;}let bo=null;function lx(){return bo||(bo=new Pf),bo}function cx(e){return [new Bd(e),new Cv,new Vy,new Hv,new ix(e)]}async function dx(){await lx().preload();}function ux(e){const{shadow:t,initialOpen:n}=e,r=b("div",{className:"gemini-panel",id:"panel",ariaHidden:String(!n)}),o=b("div",{className:"gemini-tabbar"}),i=b("div",{className:"gemini-content",id:"content"}),a=b("div",{className:"gemini-resizer",title:"Resize"}),s=b("button",{className:"gemini-close",title:"Fermer",ariaLabel:"Fermer"},"✕");r.append(o,i,a);const c=b("div",{className:"gemini-wrapper"},r);return t.append(c),{panel:r,tabbar:o,content:i,resizer:a,closeButton:s,wrapper:c}}function px(e){const{resizer:t,host:n,shadow:r,onWidthChange:o,initialWidth:i,minWidth:a,maxWidth:s}=e;let c=a,d=s;function l(){const x=Ke.detect(),T=Math.round(L.visualViewport?.width??L.innerWidth??0);if(x.platform==="mobile"||x.os==="ios"||x.os==="android"){const y=getComputedStyle(r.host),C=parseFloat(y.getPropertyValue("--inset-l"))||0,I=parseFloat(y.getPropertyValue("--inset-r"))||0,S=Math.max(280,T-Math.round(C+I));c=280,d=S;}else c=a,d=s;return {min:c,max:d}}function u(x){return Math.max(c,Math.min(d,Number(x)||i))}function p(x){const T=u(x);n.style.setProperty("--w",`${T}px`),o(T);}l();const f=Ke.detect(),m=!(f.platform==="mobile"||f.os==="ios"||f.os==="android");let g=false;const h=x=>{if(!g)return;x.preventDefault();const T=Math.round(L.innerWidth-x.clientX);p(T);},v=()=>{g&&(g=false,document.body.style.cursor="",L.removeEventListener("mousemove",h),L.removeEventListener("mouseup",v));},k=x=>{m&&(x.preventDefault(),g=true,document.body.style.cursor="ew-resize",L.addEventListener("mousemove",h),L.addEventListener("mouseup",v));};t.addEventListener("mousedown",k);function w(){t.removeEventListener("mousedown",k),L.removeEventListener("mousemove",h),L.removeEventListener("mouseup",v);}return {calculateResponsiveBounds:l,constrainWidthToLimits:u,setHudWidth:p,destroy:w}}function fx(e){const{panel:t,onToggle:n,onClose:r,toggleCombo:o=c=>c.ctrlKey&&c.shiftKey&&c.key.toLowerCase()==="u",closeOnEscape:i=true}=e;function a(c){const d=t.classList.contains("open");if(i&&c.key==="Escape"&&d){r();return}o(c)&&(c.preventDefault(),c.stopPropagation(),n());}document.addEventListener("keydown",a,{capture:true});function s(){document.removeEventListener("keydown",a,{capture:true});}return {destroy:s}}const mx=`
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
`,gx=`
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
`,hx=`
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
`,bx=`
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
`,yx=`
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
  
`,vx=`
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
`,xx=`
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
`,wx=`
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
`,kx=`
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
`,Sx=`
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
`,Cx=`
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
`,Ax=`
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
`,Tx=`
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
`,Ix=`
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
`,Px=`
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
`,Ex=`
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
`,Mx=`
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
`,Lx=`
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
`,_x=`
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
`,Fx=`
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
`,Ox=`
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
`,Rx=`
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
`,Nx=`
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
`,Dx=`
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
`,$x=`
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
`,jx={all:"initial",position:"fixed",top:"0",right:"0",zIndex:"2147483647",pointerEvents:"auto",fontFamily:'system-ui, -apple-system, "Segoe UI", Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',fontSize:"13px",lineHeight:"1.35"};function Bx(e="gemini-root"){const t=document.createElement("div");t.id=e,Object.assign(t.style,jx),(document.body||document.documentElement).appendChild(t);const n=t.attachShadow({mode:"open"});return {host:t,shadow:n}}function zx(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:16}):setTimeout(e,0);})}async function Gx(e){const{hostId:t="gemini-hud-root",initialWidth:n,initialOpen:r,onWidthChange:o,onOpenChange:i,themes:a,initialTheme:s,onThemeChange:c,buildSections:d,initialTab:l,onTabChange:u,toggleCombo:p=J=>J.ctrlKey&&J.shiftKey&&J.key.toLowerCase()==="u",closeOnEscape:f=true,minWidth:m=420,maxWidth:g=720}=e,{host:h,shadow:v}=Bx(t),k=[[gx,"variables"],[hx,"primitives"],[bx,"utilities"],[mx,"hud"],[yx,"card"],[vx,"badge"],[xx,"button"],[Ix,"checkbox"],[wx,"input"],[kx,"label"],[Sx,"navTabs"],[Cx,"searchBar"],[Ax,"select"],[Tx,"switch"],[Px,"table"],[Ex,"teamListItem"],[Mx,"timeRangePicker"],[Lx,"tooltip"],[_x,"slider"],[Fx,"reorderableList"],[Ox,"colorPicker"],[Rx,"log"],[Nx,"segmentedControl"],[Dx,"settings"],[$x,"teamCard"],[qs,"autoFavoriteSettings"]];for(let J=0;J<k.length;J++){const[Y,me]=k[J];wt(v,Y,me),J%5===4&&await zx();}const{panel:w,tabbar:x,content:T,resizer:y,closeButton:C,wrapper:I}=ux({shadow:v,initialOpen:r});function S(J){w.dispatchEvent(new CustomEvent("gemini:hud-open-change",{detail:{isOpen:J},bubbles:true})),i?.(J);}function P(J){const Y=w.classList.contains("open");w.classList.toggle("open",J),w.setAttribute("aria-hidden",J?"false":"true"),J!==Y&&S(J);}P(r),C.addEventListener("click",J=>{J.preventDefault(),J.stopPropagation(),P(false);});const E=Od({host:h,themes:a,initialTheme:s,onThemeChange:c}),R=px({resizer:y,host:h,shadow:v,onWidthChange:o||(()=>{}),initialWidth:n,minWidth:m,maxWidth:g});R.setHudWidth(n);const ee=d({applyTheme:E.applyTheme,initialTheme:s,getCurrentTheme:E.getCurrentTheme,setHUDWidth:R.setHudWidth,setHUDOpen:P}),B=new zc(ee,T,{applyTheme:E.applyTheme,getCurrentTheme:E.getCurrentTheme}),X=ee.map(J=>({id:J.id,label:J.label})),le=l&&ee.some(J=>J.id===l)?l:X[0]?.id||"",$=Bc(X,le,J=>{B.activate(J),u?.(J);});$.root.style.flex="1 1 auto",$.root.style.minWidth="0",x.append($.root,C);const j={"tab-auto-favorite":"autoFavorite","tab-journal-checker":"journalChecker","tab-pets":"pets"};function N(){const J=Te(Me.CONFIG,{autoFavorite:{enabled:false},journalChecker:{enabled:false},pets:{enabled:true}});for(const[Y,me]of Object.entries(j))J[me]?.enabled??false?$.showTab(Y):$.hideTab(Y);}function F(J){const{key:Y}=J.detail;(Y===Me.CONFIG||Y==="feature:config")&&N();}window.addEventListener(Hi.STORAGE_CHANGE,F),N();let _=le;if(!$.isTabVisible(le)){const J=$.getVisibleTabs();J.length>0&&(_=J[0]);}_&&B.activate(_);const D=fx({panel:w,onToggle:()=>P(!w.classList.contains("open")),onClose:()=>P(false),toggleCombo:p,closeOnEscape:f}),O=()=>{$.recalc();const J=parseInt(getComputedStyle(h).getPropertyValue("--w"))||n;R.calculateResponsiveBounds(),R.setHudWidth(J);};L.addEventListener("resize",O);const z=J=>{const Y=J.detail?.width;Y?R.setHudWidth(Y):R.setHudWidth(n),$.recalc();};h.addEventListener("gemini:layout-resize",z);function ge(){window.removeEventListener(Hi.STORAGE_CHANGE,F),D.destroy(),R.destroy(),L.removeEventListener("resize",O),h.removeEventListener("gemini:layout-resize",z);}return {host:h,shadow:v,wrapper:I,panel:w,content:T,setOpen:P,setWidth:R.setHudWidth,sections:ee,manager:B,nav:$,destroy:ge}}const ln={isOpen:"gemini.hud.isOpen",width:"gemini.hud.width",theme:"gemini.hud.theme",activeTab:"gemini.hud.activeTab"},ar={isOpen:false,width:480,theme:"dark",activeTab:"tab-settings"};function Wx(){return {isOpen:Te(ln.isOpen,ar.isOpen),width:Te(ln.width,ar.width),theme:Te(ln.theme,ar.theme),activeTab:Te(ln.activeTab,ar.activeTab)}}function sr(e,t){je(ln[e],t);}const Hx="https://i.imgur.com/IMkhMur.png",Ux="Stats";function Vx(e){let t=e.iconUrl||Hx;const n=e.ariaLabel||"Open MGH";let r=null,o=null,i=null,a=false,s=null,c=null;const d=["Chat","Leaderboard","Stats","Open Activity Log"],l=w=>{try{return typeof CSS<"u"&&CSS&&typeof CSS.escape=="function"?CSS.escape(w):w.replace(/"/g,'\\"')}catch{return w}};function u(){const w=document.querySelector(d.map(T=>`button[aria-label="${l(T)}"]`).join(","));if(!w)return null;let x=w.parentElement;for(;x&&x!==document.body;){if(d.reduce((y,C)=>y+x.querySelectorAll(`button[aria-label="${l(C)}"]`).length,0)>=2)return x;x=x.parentElement;}return null}function f(w){const x=Array.from(w.querySelectorAll("button[aria-label]"));if(!x.length)return {refBtn:null,refWrapper:null};const T=x.filter(R=>R.dataset.mghBtn!=="true"&&(R.getAttribute("aria-label")||"")!==(e.ariaLabel||"Open MGH")),y=T.length?T:x,C=y.find(R=>(R.getAttribute("aria-label")||"").toLowerCase()===Ux.toLowerCase())||null,I=y.length>=2?y.length-2:y.length-1,S=C||y[I],P=S.parentElement,E=P&&P.parentElement===w&&P.tagName==="DIV"?P:null;return {refBtn:S,refWrapper:E}}function m(w,x,T){const y=w.cloneNode(false);y.type="button",y.setAttribute("aria-label",x),y.title=x,y.dataset.mghBtn="true",y.style.pointerEvents="auto",y.removeAttribute("id");const C=document.createElement("img");return C.src=T,C.alt="MGH",C.style.pointerEvents="none",C.style.userSelect="none",C.style.width="76%",C.style.height="76%",C.style.objectFit="contain",C.style.display="block",C.style.margin="auto",y.appendChild(C),y.addEventListener("click",I=>{I.preventDefault(),I.stopPropagation();try{e.onClick?.();}catch{}}),y}function g(){if(a)return  false;a=true;let w=false;try{const x=u();if(!x)return !1;s!==x&&(s=x);const{refBtn:T,refWrapper:y}=f(x);if(!T)return !1;o=x.querySelector('div[data-mgh-wrapper="true"]'),!o&&y&&(o=y.cloneNode(!1),o.dataset.mghWrapper="true",o.removeAttribute("id"),w=!0);const C=o?.querySelector('button[data-mgh-btn="true"]')||null;r||(r=C),r||(r=m(T,n,t),o?o.appendChild(r):r.parentElement!==x&&x.appendChild(r),w=!0),o&&o.parentElement!==x&&(x.appendChild(o),w=!0);const I=x;if(I&&I!==c){try{k.disconnect();}catch{}c=I,k.observe(c,{childList:!0,subtree:!0});}return w}finally{a=false;}}const h=document.getElementById("App")||document.body;let v=null;const k=new MutationObserver(w=>{const x=w.every(y=>{const C=Array.from(y.addedNodes||[]),I=Array.from(y.removedNodes||[]),S=C.concat(I);if(S.length===0){const P=y.target;return o&&(P===o||o.contains(P))||r&&(P===r||r.contains(P))}return S.every(P=>!!(!(P instanceof HTMLElement)||o&&(P===o||o.contains(P))||r&&(P===r||r.contains(P))))}),T=w.some(y=>Array.from(y.removedNodes||[]).some(C=>C instanceof HTMLElement?!!(o&&(C===o||o.contains(C))||r&&(C===r||r.contains(C))):false));x&&!T||v===null&&(v=window.setTimeout(()=>{if(v=null,g()&&o){const C=o.parentElement;C&&C.lastElementChild!==o&&C.appendChild(o);}},150));});return g(),k.observe(h,{childList:true,subtree:true}),i=()=>k.disconnect(),()=>{try{i?.();}catch{}try{o?.remove();}catch{}}}const Cc=[];function Kx(){return Cc.slice()}function Yx(e){Cc.push(e);}function Ac(e){try{return JSON.parse(e)}catch{return}}function Ka(e){if(typeof e=="string"){const t=Ac(e);return t!==void 0?t:e}return e}function Tc(e){if(e!=null){if(typeof e=="string"){const t=Ac(e);return t!==void 0?Tc(t):e}if(Array.isArray(e)&&typeof e[0]=="string")return e[0];if(typeof e=="object"){const t=e;return t.type??t.Type??t.kind??t.messageType}}}function qx(e){const t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function K(e,t,n){const r=typeof t=="boolean"?t:true,o=typeof t=="function"?t:n,i=(a,s)=>{if(Tc(a)!==e)return;const d=o(a,s);return d&&typeof d=="object"&&"kind"in d?d:typeof d=="boolean"?d?void 0:{kind:"drop"}:r?void 0:{kind:"drop"}};return Yx(i),i}const Qt=new WeakSet,Ya=new WeakMap;function Xx(e){const t=e.pageWindow,n=!!e.debug,r=e.middlewares&&e.middlewares.length?e.middlewares:Kx();if(!r.length)return ()=>{};const o=p=>({ws:p,pageWindow:t,debug:n}),i=(p,f)=>{let m=p;for(const g of r){const h=g(m,o(f));if(h){if(h.kind==="drop")return {kind:"drop"};h.kind==="replace"&&(m=h.message);}}return m!==p?{kind:"replace",message:m}:void 0};let a=null,s=null,c=null;const d=()=>{const p=t?.MagicCircle_RoomConnection,f=p?.sendMessage;if(!p||typeof f!="function")return  false;if(Qt.has(f))return  true;const m=f.bind(p);function g(...h){const v=h.length===1?h[0]:h,k=Ka(v),w=i(k,qx(t));if(w?.kind==="drop"){n&&console.log("[WS] drop outgoing (RoomConnection.sendMessage)",k);return}if(w?.kind==="replace"){const x=w.message;return h.length>1&&Array.isArray(x)?(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",k,"=>",x),m(...x)):(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",k,"=>",x),m(x))}return m(...h)}Qt.add(g),Ya.set(g,f);try{p.sendMessage=g,Qt.add(p.sendMessage),n&&console.log("[WS] outgoing patched via MagicCircle_RoomConnection.sendMessage");}catch{return  false}return a=()=>{try{p.sendMessage===g&&(p.sendMessage=f);}catch{}},true};(()=>{const p=t?.WebSocket?.prototype,f=p?.send;if(typeof f!="function"||Qt.has(f))return;function m(g){const h=Ka(g),v=i(h,this);if(v?.kind==="drop"){n&&console.log("[WS] drop outgoing (ws.send)",h);return}if(v?.kind==="replace"){const k=v.message,w=typeof k=="string"||k instanceof ArrayBuffer||k instanceof Blob?k:JSON.stringify(k);return n&&console.log("[WS] replace outgoing (ws.send)",h,"=>",k),f.call(this,w)}return f.call(this,g)}Qt.add(m),Ya.set(m,f);try{p.send=m,n&&console.log("[WS] outgoing patched via WebSocket.prototype.send");}catch{return}s=()=>{try{p.send===m&&(p.send=f);}catch{}};})();const u=e.waitForRoomConnectionMs??4e3;if(!d()&&u>0){const p=Date.now();c=setInterval(()=>{if(d()){clearInterval(c),c=null;return}Date.now()-p>u&&(clearInterval(c),c=null,n&&console.log("[WS] RoomConnection not found, only ws.send is patched"));},250);}return ()=>{if(c){try{clearInterval(c);}catch{}c=null;}if(a){try{a();}catch{}a=null;}if(s){try{s();}catch{}s=null;}}}(function(){try{const t=({ url: (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('__entry.js', document.baseURI).href) }),n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();const Ic=[];function Jx(){return Ic.slice()}function qa(e){Ic.push(e);}function Qx(e){if(e!=null){if(typeof e=="object"){const t=e;if(typeof t.type=="string")return t.type;if(typeof t.Type=="string")return t.Type;if(typeof t.kind=="string")return t.kind;if(typeof t.messageType=="string")return t.messageType}if(Array.isArray(e)&&typeof e[0]=="string")return e[0]}}function Zx(e){if(typeof e=="string")try{return JSON.parse(e)}catch{return e}return e}const yo=Symbol.for("ariesmod.ws.handlers.patched");function ve(e,t){if(typeof e=="string"){const o=e,i={match:a=>a.kind==="message"&&a.type===o,handle:t};return qa(i),i}const n=e,r={match:o=>o.kind==="close"&&o.code===n,handle:t};return qa(r),r}function ew(e,t=Jx(),n={}){const r=n.pageWindow??window,o=!!n.debug;if(e[yo])return ()=>{};e[yo]=true;const i={ws:e,pageWindow:r,debug:o},a=u=>{for(const p of t)try{if(!p.match(u))continue;if(p.handle(u,i)===!0)return}catch(f){o&&console.error("[WS] handler error",f,u);}},s=u=>{const p=Zx(u.data),f=Qx(p);a({kind:"message",raw:u.data,data:p,type:f});},c=u=>{a({kind:"close",code:u.code,reason:u.reason,wasClean:u.wasClean,event:u});},d=u=>a({kind:"open",event:u}),l=u=>a({kind:"error",event:u});return e.addEventListener("message",s),e.addEventListener("close",c),e.addEventListener("open",d),e.addEventListener("error",l),()=>{try{e.removeEventListener("message",s);}catch{}try{e.removeEventListener("close",c);}catch{}try{e.removeEventListener("open",d);}catch{}try{e.removeEventListener("error",l);}catch{}try{delete e[yo];}catch{}}}(function(){try{const t=({ url: (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('__entry.js', document.baseURI).href) }),n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();ve(qe.AuthenticationFailure,(e,t)=>{t.debug&&console.log("[WS][Close] Auth failure",e.code,e.reason);});ve(qe.ConnectionSuperseded,(e,t)=>{t.debug&&console.log("[WS][Close] Superseded",e.code,e.reason);});ve(qe.HeartbeatExpired,(e,t)=>{t.debug&&console.log("[WS][Close] Heartbeat expired",e.code,e.reason);});ve(qe.PlayerKicked,(e,t)=>{t.debug&&console.log("[WS][Close] Player kicked",e.code,e.reason);});ve(qe.PlayerLeftVoluntarily,(e,t)=>{t.debug&&console.log("[WS][Close] Player left voluntarily",e.code,e.reason);});ve(qe.ReconnectInitiated,(e,t)=>{t.debug&&console.log("[WS][Close] Reconnect initiated",e.code,e.reason);});ve(qe.ServerDisposed,(e,t)=>{t.debug&&console.log("[WS][Close] Server disposed",e.code,e.reason);});ve(qe.UserSessionSuperseded,(e,t)=>{t.debug&&console.log("[WS][Close] User session superseded",e.code,e.reason);});ve(qe.VersionExpired,(e,t)=>{t.debug&&console.log("[WS][Close] Version expired",e.code,e.reason);});ve(qe.VersionMismatch,(e,t)=>{t.debug&&console.log("[WS][Close] Version mismatch",e.code,e.reason);});ve(at.Config,(e,t)=>{t.debug&&console.log("[WS][STC] Config",e.data);});ve(at.CurrencyTransaction,(e,t)=>{t.debug&&console.log("[WS][STC] CurrencyTransaction",e.data);});ve(at.Emote,(e,t)=>{t.debug&&console.log("[WS][STC] Emote",e.data);});ve(at.InappropriateContentRejected,(e,t)=>{t.debug&&console.log("[WS][STC] InappropriateContentRejected",e.data);});ve(at.PartialState,(e,t)=>{t.debug&&console.log("[WS][STC] PartialState",e.data);});ve(at.Pong,(e,t)=>{t.debug&&console.log("[WS][STC] Pong",e.data);});ve(at.ServerErrorMessage,(e,t)=>{t.debug&&console.log("[WS][STC] ServerErrorMessage",e.data);});ve(at.Welcome,(e,t)=>{t.debug&&console.log("[WS][STC] Welcome",e.data);});K(M.PlantSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantSeed"),true));K(M.WaterPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] WaterPlant"),true));K(M.HarvestCrop,(e,t)=>(t.debug&&console.log("[MW][Garden] HarvestCrop"),true));K(M.SellAllCrops,(e,t)=>(t.debug&&console.log("[MW][Garden] SellAllCrops"),true));K(M.PurchaseSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseSeed"),true));K(M.PurchaseEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseEgg"),true));K(M.PurchaseTool,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseTool"),true));K(M.PurchaseDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseDecor"),true));K(M.PlantEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantEgg"),true));K(M.HatchEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] HatchEgg"),true));K(M.PlantGardenPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantGardenPlant"),true));K(M.PotPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PotPlant"),true));K(M.MutationPotion,(e,t)=>(t.debug&&console.log("[MW][Garden] MutationPotion"),true));K(M.PickupDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PickupDecor"),true));K(M.PlaceDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PlaceDecor"),true));K(M.RemoveGardenObject,(e,t)=>(t.debug&&console.log("[MW][Garden] RemoveGardenObject"),true));K(M.MoveInventoryItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveInventoryItem"),true));K(M.DropObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] DropObject"),true));K(M.PickupObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] PickupObject"),true));K(M.ToggleFavoriteItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] ToggleFavoriteItem"),true));K(M.PutItemInStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] PutItemInStorage"),true));K(M.RetrieveItemFromStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] RetrieveItemFromStorage"),true));K(M.MoveStorageItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveStorageItem"),true));K(M.LogItems,(e,t)=>(t.debug&&console.log("[MW][Inventory] LogItems"),true));K(M.PlacePet,(e,t)=>(t.debug&&console.log("[MW][Pets] PlacePet"),true));K(M.FeedPet,(e,t)=>(t.debug&&console.log("[MW][Pets] FeedPet"),true));K(M.PetPositions,(e,t)=>(t.debug&&console.log("[MW][Pets] PetPositions"),true));K(M.SwapPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SwapPet"),true));K(M.StorePet,(e,t)=>(t.debug&&console.log("[MW][Pets] StorePet"),true));K(M.NamePet,(e,t)=>(t.debug&&console.log("[MW][Pets] NamePet"),true));K(M.SellPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SellPet"),true));console.log("[WS] TESTTEST");K(M.SetSelectedGame,(e,t)=>(t.debug&&console.log("[MW][Session] SetSelectedGame"),true));K(M.VoteForGame,(e,t)=>(t.debug&&console.log("[MW][Session] VoteForGame"),true));K(M.RequestGame,(e,t)=>(t.debug&&console.log("[MW][Session] RequestGame"),true));K(M.RestartGame,(e,t)=>(t.debug&&console.log("[MW][Session] RestartGame"),true));K(M.Ping,(e,t)=>(t.debug&&console.log("[MW][Session] Ping"),true));K(M.PlayerPosition,(e,t)=>(t.debug&&console.log("[MW][Session] PlayerPosition"),true));K(M.Teleport,(e,t)=>(t.debug&&console.log("[MW][Session] Teleport"),true));K(M.CheckWeatherStatus,(e,t)=>(t.debug&&console.log("[MW][Session] CheckWeatherStatus"),true));K(M.Chat,(e,t)=>(t.debug&&console.log("[MW][Social] Chat"),true));K(M.Dev,(e,t)=>(t.debug&&console.log("[MW][Social] Dev"),true));K(M.Emote,(e,t)=>(t.debug&&console.log("[MW][Social] Emote"),true));K(M.Wish,(e,t)=>(t.debug&&console.log("[MW][Social] Wish"),true));K(M.KickPlayer,(e,t)=>(t.debug&&console.log("[MW][Social] KickPlayer"),true));K(M.ReportSpeakingStart,(e,t)=>(t.debug&&console.log("[MW][Voice] ReportSpeakingStart"),true));K(M.SetPlayerData,(e,t)=>(t.debug&&console.log("[MW][Social] SetPlayerData"),true));K(M.UsurpHost,(e,t)=>(t.debug&&console.log("[MW][Social] UsurpHost"),true));function tw(e={}){const t=e.pageWindow??L,n=e.pollMs??500,r=!!e.debug,o=[];o.push(Qh(t,{debug:r})),o.push(Xx({pageWindow:t,middlewares:e.middlewares,debug:r}));let i=null;const a=s=>{if(i){try{i();}catch{}i=null;}s&&(i=ew(s,e.handlers,{debug:r,pageWindow:t}));};return a(Ar(t).ws),o.push(Dl(s=>a(s.ws),{intervalMs:n,debug:r,pageWindow:t})),{getWs:()=>Ar(t).ws,dispose:()=>{for(let s=o.length-1;s>=0;s--)try{o[s]();}catch{}if(i){try{i();}catch{}i=null;}}}}let lr=null;function nw(e={}){return lr||(lr=tw(e),lr)}function rw(e){e.logStep("WebSocket","Capturing WebSocket...");let t=null;return t=Dl(n=>{n.ws&&(e.logStep("WebSocket","WebSocket captured","success"),t?.(),t=null);},{intervalMs:250}),nw({debug:false}),()=>{t?.(),t=null;}}async function ow(e){e.logStep("Atoms","Prewarming Jotai store...");try{await zf(),await Df({timeoutMs:8e3,intervalMs:50}),e.logStep("Atoms","Jotai store ready","success");}catch(t){e.logStep("Atoms","Jotai store not captured yet","error"),console.warn("[Bootstrap] Jotai store wait failed",t);}}function iw(e){e.logStep("Globals","Initializing global variables...");try{Rl(),e.logStep("Globals","Global variables ready","success");}catch(t){e.logStep("Globals","Failed to initialize global variables","error"),console.warn("[Bootstrap] Global variables init failed",t);}}function aw(e){e.logStep("API","Exposing Gemini API...");try{sx(),e.logStep("API","Gemini API ready","success");}catch(t){e.logStep("API","Failed to expose API","error"),console.warn("[Bootstrap] API init failed",t);}}function vo(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0);})}async function sw(e){e.logStep("HUD","Loading HUD preferences..."),await vo();const t=Wx();await vo();const n=await Gx({hostId:"gemini-hud-root",initialWidth:t.width,initialOpen:t.isOpen,onWidthChange:r=>sr("width",r),onOpenChange:r=>sr("isOpen",r),themes:dn,initialTheme:t.theme,onThemeChange:r=>sr("theme",r),buildSections:r=>cx({applyTheme:r.applyTheme,initialTheme:r.initialTheme,getCurrentTheme:r.getCurrentTheme,setHUDWidth:r.setHUDWidth,setHUDOpen:r.setHUDOpen}),initialTab:t.activeTab,onTabChange:r=>sr("activeTab",r)});return await vo(),e.logStep("HUD","HUD ready","success"),n}async function lw(e){e.setSubtitle("Activating Gemini modules...");const t=7;let n=0;await Lg(r=>{r.status==="success"?(n++,e.logStep("Modules",`Loading modules... (${n}/${t})`)):r.status==="error"&&e.logStep("Modules",`Loading modules... (${n}/${t}) - ${r.name} failed`,"error");}),e.logStep("Modules",`All modules loaded (${t}/${t})`,"success");}async function cw(e){e.logStep("Sprites","Warming up sprite cache...");try{ie.isReady()||await ie.init();const t=[],n=de.get("plants");if(n)for(const a of Object.values(n))a?.seed?.spriteId&&t.push(a.seed.spriteId),a?.plant?.spriteId&&t.push(a.plant.spriteId),a?.crop?.spriteId&&t.push(a.crop.spriteId);const r=de.get("pets");if(r)for(const a of Object.values(r))a?.spriteId&&t.push(a.spriteId);const o=[...new Set(t)],i=o.length;if(i===0){e.logStep("Sprites","No sprites to warmup","success");return}await ie.warmup(o,(a,s)=>{e.logStep("Sprites",`Loading sprites (${a}/${s})...`);},5),e.logStep("Sprites",`${i} sprites loaded`,"success");}catch(t){e.logStep("Sprites","Sprite warmup failed","error"),console.warn("[Bootstrap] Sprite warmup failed",t);}}async function dw(e){e.logStep("Sections","Preloading UI sections...");try{await dx(),e.logStep("Sections","Sections preloaded","success");}catch(t){e.logStep("Sections","Sections preload failed","error"),console.warn("[Bootstrap] Sections preload failed",t);}}function uw(e){e.logStep("Features","Initializing features...");const t=[{name:"AntiAfk",init:At.init.bind(At)},{name:"PetTeam",init:he.init.bind(he)},{name:"BulkFavorite",init:Tr.init.bind(Tr)}],n=[{name:"BulkFavoriteInject",init:Zo.init.bind(Zo)}];let r=0;for(const i of t)try{i.init(),r++,e.logStep("Features",`Initializing features... (${r}/${t.length})`,"info");}catch(a){e.logStep("Features",`Initializing features... (${r}/${t.length}) - ${i.name} failed`,"error"),console.warn(`[Bootstrap] Feature ${i.name} init failed`,a);}e.logStep("Features",`All features initialized (${t.length}/${t.length})`,"success"),e.logStep("UIInjections","Initializing UI injections...");let o=0;for(const i of n)try{i.init(),o++;}catch(a){console.warn(`[Bootstrap] UI injection ${i.name} init failed`,a);}e.logStep("UIInjections",`UI injections initialized (${o}/${n.length})`,"success");}Gs();Ff();(async function(){Wc();const e=$c({title:"Gemini is loading",subtitle:"Connecting and preparing modules..."});let t=null;try{t=rw(e),await ow(e),iw(e),aw(e),await Promise.all([lw(e),(async()=>{await cw(e);})(),(async()=>{await dw(e);})(),(async()=>{uw(e);})()]),e.succeed("Gemini is ready!");}catch(r){e.fail("Failed to initialize the mod.",r);}finally{t?.();}const n=await sw(e);Vx({onClick:()=>n.setOpen(true)});})();

})();