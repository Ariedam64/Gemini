// ==UserScript==
// @name         Gemini
// @namespace    Gemini
// @version      1.0.0
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
  var Bl=Object.defineProperty;var Wl=(e,t,n)=>t in e?Bl(e,t,{enumerable:true,configurable:true,writable:true,value:n}):e[t]=n;var U=(e,t,n)=>Wl(e,typeof t!="symbol"?t+"":t,n);function w(e,t=null,...n){const r=document.createElement(e);for(const[o,i]of Object.entries(t||{}))i!=null&&(o==="style"?typeof i=="string"?r.setAttribute("style",i):typeof i=="object"&&Object.assign(r.style,i):o.startsWith("on")&&typeof i=="function"?r[o.toLowerCase()]=i:o in r?r[o]=i:r.setAttribute(o,String(i)));for(const o of n)o==null||o===false||r.appendChild(typeof o=="string"||typeof o=="number"?document.createTextNode(String(o)):o);return r}const kn="https://i.imgur.com/k5WuC32.png",pi="gemini-loader-style",dt="gemini-loader",ma=80;function Hl(){if(document.getElementById(pi))return;const e=document.createElement("style");e.id=pi,e.textContent=`
    /* ===== Loader Variables ===== */
    #${dt} {
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
    #${dt} {
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

    #${dt}.gemini-loader--error .gemini-loader__actions {
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
    #${dt}.gemini-loader--closing {
      animation: gemini-loader-fade-out 0.4s ease forwards;
      pointer-events: none;
    }

    #${dt}.gemini-loader--error .gemini-loader__spinner {
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
      #${dt} { padding: 16px 10px; }
      .gemini-loader__card { padding: 16px; }
      .gemini-loader__header { gap: 12px; }
      .gemini-loader__spinner { width: 42px; height: 42px; }
      .gemini-loader__spinner-icon { width: 56px; height: 56px; }
      .gemini-loader__title { font-size: 16px; }
    }
  `,document.head.appendChild(e);}function Sn(e,t,n){const r=w("div",{className:`gemini-loader__log ${n}`},w("div",{className:"gemini-loader__dot"}),w("div",{textContent:t}));for(e.appendChild(r);e.childElementCount>ma;)e.firstElementChild?.remove();e.scrollTop=e.scrollHeight;}function Ul(){return new Promise(e=>{if(typeof GM_xmlhttpRequest>"u"){e(kn);return}GM_xmlhttpRequest({method:"GET",url:kn,responseType:"blob",onload:t=>{const n=t.response,r=new FileReader;r.onloadend=()=>e(r.result),r.onerror=()=>e(kn),r.readAsDataURL(n);},onerror:()=>e(kn)});})}function Vl(e={}){const t=Number.isFinite(e.blurPx)?Math.max(4,Number(e.blurPx)):14;Hl();const n=w("div",{className:"gemini-loader__subtitle",textContent:e.subtitle??"Initializing the mod..."}),r=w("div",{className:"gemini-loader__logs"}),o=w("img",{className:"gemini-loader__spinner-icon",alt:"Gemini"}),i=w("div",{className:"gemini-loader__spinner"},o);Ul().then(b=>{o.src=b;});const a=w("div",{className:"gemini-loader__card"},w("div",{className:"gemini-loader__header"},i,w("div",{className:"gemini-loader__titles"},w("div",{className:"gemini-loader__title",textContent:e.title??"Gemini is loading"}),n)),r),s=w("div",{id:dt},a);(document.body||document.documentElement).appendChild(s);const c=w("div",{className:"gemini-loader__actions"},w("button",{className:"gemini-loader__button",textContent:"Close loader",onclick:()=>s.remove()}));a.appendChild(c),s.style.setProperty("--loader-blur",`${t}px`);const u=b=>{n.textContent=b;},l=new Map,d=(b,x)=>{b.className=`gemini-loader__log ${x}`;};return {log:(b,x="info")=>Sn(r,b,x),logStep:(b,x,S="info")=>{const v=String(b||"").trim();if(!v){Sn(r,x,S);return}const y=l.get(v);if(y){y.el.lastElementChild&&(y.el.lastElementChild.textContent=x),y.tone!==S&&(d(y.el,S),y.tone=S);return}const C=w("div",{className:`gemini-loader__log ${S}`},w("div",{className:"gemini-loader__dot"}),w("div",{textContent:x}));for(l.set(v,{el:C,tone:S}),r.appendChild(C);r.childElementCount>ma;){const h=r.firstElementChild;if(!h)break;const k=Array.from(l.entries()).find(([,T])=>T.el===h)?.[0];k&&l.delete(k),h.remove();}r.scrollTop=r.scrollHeight;},setSubtitle:u,succeed:(b,x=600)=>{b&&Sn(r,b,"success"),s.classList.add("gemini-loader--closing"),setTimeout(()=>s.remove(),x);},fail:(b,x)=>{Sn(r,b,"error"),u("Something went wrong. Check the console for details."),s.classList.add("gemini-loader--error"),console.error("[Gemini loader]",b,x);}}}const fi=150,Kl=30;function Yl(e,t,n){const r=w("div",{className:"lg-pill",id:"pill"}),o=e.map(v=>{const y=w("button",{className:"lg-tab"},v.label);return y.setAttribute("data-target",v.id),y}),i=w("div",{className:"lg-tabs",id:"lg-tabs-row"},r,...o);function a(v){const y=document.createElementNS("http://www.w3.org/2000/svg","svg");y.setAttribute("viewBox","0 0 24 24"),y.setAttribute("fill","none"),y.setAttribute("stroke","currentColor"),y.setAttribute("stroke-width","2"),y.setAttribute("stroke-linecap","round"),y.setAttribute("stroke-linejoin","round");const C=document.createElementNS("http://www.w3.org/2000/svg","polyline");return C.setAttribute("points",v==="left"?"15 18 9 12 15 6":"9 18 15 12 9 6"),y.appendChild(C),y}const s=w("button",{className:"lg-tabs-arrow lg-tabs-arrow-left",ariaLabel:"Scroll left"});s.appendChild(a("left"));const c=w("button",{className:"lg-tabs-arrow lg-tabs-arrow-right",ariaLabel:"Scroll right"});c.appendChild(a("right"));const l=w("div",{className:"lg-tabs-wrapper"},s,i,c);let d=0,p=0,f=false;function g(){const v=i.scrollLeft>0,y=i.scrollLeft<i.scrollWidth-i.clientWidth-1;s.classList.toggle("disabled",!v),c.classList.toggle("disabled",!y);}s.addEventListener("click",()=>{i.scrollBy({left:-fi,behavior:"smooth"}),setTimeout(g,300);}),c.addEventListener("click",()=>{i.scrollBy({left:fi,behavior:"smooth"}),setTimeout(g,300);}),i.addEventListener("wheel",v=>{Math.abs(v.deltaY)>Math.abs(v.deltaX)&&(v.preventDefault(),i.scrollLeft+=v.deltaY,g());},{passive:false});let m=0;i.addEventListener("touchstart",v=>{const y=v.touches[0];d=y.clientX,p=y.clientY,f=false,m=i.scrollLeft;},{passive:true}),i.addEventListener("touchmove",v=>{if(f)return;const y=v.touches[0],C=y.clientX-d,h=y.clientY-p;if(Math.abs(h)>Math.abs(C)){f=true;return}Math.abs(C)>Kl&&(v.preventDefault(),i.scrollLeft=m-C);},{passive:false}),i.addEventListener("touchend",()=>{g();},{passive:true}),i.addEventListener("scroll",g,{passive:true});function b(v){const y=o.find(C=>C.dataset.target===v)||o[0];y&&requestAnimationFrame(()=>{const C=y.offsetLeft,h=y.offsetWidth;r.style.width=`${h}px`,r.style.transform=`translateX(${C}px)`;const k=i.scrollLeft,T=k,I=k+i.clientWidth,L=C-12,_=C+h+12;L<T?i.scrollTo({left:L,behavior:"smooth"}):_>I&&i.scrollTo({left:_-i.clientWidth,behavior:"smooth"}),setTimeout(g,300);});}let x=t||(e[0]?.id??"");function S(v){x=v,o.forEach(y=>y.classList.toggle("active",y.dataset.target===v)),b(v),n(v);}return o.forEach(v=>v.addEventListener("click",()=>S(v.dataset.target))),queueMicrotask(()=>{b(x),g();}),{root:l,activate:S,recalc:()=>{b(x),g();},getActive:()=>x}}class Nt{constructor(t){U(this,"id");U(this,"label");U(this,"container",null);U(this,"cleanupFunctions",[]);U(this,"preloadedContent",null);U(this,"preloadPromise",null);this.id=t.id,this.label=t.label;}async preload(){if(this.preloadedContent||this.preloadPromise)return;const t=w("div");this.preloadPromise=(async()=>{const n=this.build(t);n instanceof Promise&&await n,this.preloadedContent=t,this.preloadPromise=null;})(),await this.preloadPromise;}isPreloaded(){return this.preloadedContent!==null}render(t){for(this.unmount();t.firstChild;)t.removeChild(t.firstChild);if(this.container=t,this.preloadedContent){for(;this.preloadedContent.firstChild;)t.appendChild(this.preloadedContent.firstChild);this.preloadedContent=null;}else {const r=this.build(t);r instanceof Promise&&r.catch(o=>{console.error(`[Gemini] Error building section ${this.id}:`,o);});}const n=t.firstElementChild;n&&n.classList.contains("gemini-section")&&n.classList.add("active");}unmount(){this.executeCleanup(),this.container=null;}createContainer(t,n){const r=n?`gemini-section ${n}`:"gemini-section";return w("section",{id:t,className:r})}addCleanup(t){this.cleanupFunctions.push(t);}createGrid(t="12px"){const n=w("div");return n.style.display="grid",n.style.gap=t,n}executeCleanup(){for(const t of this.cleanupFunctions)try{t();}catch(n){console.error(`[Gemini] Cleanup error in section ${this.id}:`,n);}this.cleanupFunctions=[];}}class ql{constructor(t,n,r){U(this,"sections");U(this,"activeId",null);U(this,"container");U(this,"theme");this.sections=new Map(t.map(o=>[o.id,o])),this.container=n,this.theme=r;}get ids(){return Array.from(this.sections.keys())}get all(){return Array.from(this.sections.values())}get active(){return this.activeId}activate(t){if(this.activeId!==t){if(!this.sections.has(t))throw new Error(`[Gemini] Unknown section: ${t}`);if(this.activeId&&this.sections.get(this.activeId).unmount(),this.activeId=t,this.sections.get(t).render(this.container),this.theme){const n=this.theme.getCurrentTheme();this.theme.applyTheme(n);}}}}const At="gemini:",We={AUTO_FAVORITE:"feature:autoFavorite:config",AUTO_FAVORITE_UI:"feature:autoFavorite:ui",JOURNAL_CHECKER:"feature:journalChecker:config",BULK_FAVORITE:"feature:bulkFavorite:config",ACHIEVEMENTS:"feature:achievements:data",TRACKER_STATS:"feature:tracker:stats",ANTI_AFK:"feature:antiAfk:config",CONFIG:"feature:config",PET_TEAM:"feature:petTeam:config"};function Pe(e,t){try{const n=e.startsWith(At)?e:At+e,r=GM_getValue(n);return r==null?t:typeof r=="string"?JSON.parse(r):r}catch(n){return console.error(`[Gemini Storage] Failed to read key "${e}":`,n),t}}function Ee(e,t){try{const n=e.startsWith(At)?e:At+e,r=e.startsWith(At)?e.slice(At.length):e,o=JSON.stringify(t);GM_setValue(n,o),window.dispatchEvent(new CustomEvent("gemini:storage:change",{detail:{key:r,value:t}}));}catch(n){console.error(`[Gemini Storage] Failed to write key "${e}":`,n);}}function Xl(){try{const e="gemini:",t=[];for(let o=0;o<localStorage.length;o++){const i=localStorage.key(o);i&&i.startsWith(e)&&t.push(i);}for(const o of t)try{const i=localStorage.getItem(o);if(i!==null){const a=JSON.parse(i),s=o.slice(e.length);Ee(s,a),console.log(`[Gemini Storage] Migrated key: ${o}`);}}catch(i){console.warn(`[Gemini Storage] Failed to migrate key "${o}":`,i);}const n="gemini.sections",r=GM_getValue(n);r!=null&&(Ee("sections",r),GM_setValue(n,void 0),console.log("[Gemini Storage] Migrated: gemini.sections → gemini:sections")),t.length>0&&console.log(`[Gemini Storage] Migration complete. ${t.length} keys migrated from localStorage to GM_* storage.`);}catch(e){console.error("[Gemini Storage] Migration failed:",e);}}const ha="gemini.sections";function ba(){const e=Pe(ha,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function Jl(e){Ee(ha,e);}async function Ql(e){return ba()[e]}function Zl(e,t){const n=ba();Jl({...n,[e]:t});}function gi(e,t){return {...e,...t??{}}}async function ec(e){const t=await Ql(e.path);let n;e.migrate?n=e.migrate(t):n=t??{},n=Object.assign((u=>JSON.parse(JSON.stringify(u)))(e.defaults),n),e.sanitize&&(n=e.sanitize(n));function o(){Zl(e.path,n);}function i(){return n}function a(u){n=e.sanitize?e.sanitize(u):u,o();}function s(u){const d=Object.assign((p=>JSON.parse(JSON.stringify(p)))(n),{});typeof u=="function"?u(d):Object.assign(d,u),n=e.sanitize?e.sanitize(d):d,o();}function c(){o();}return {get:i,set:a,update:s,save:c}}async function ya(e,t){const{path:n=e,...r}=t;return ec({path:n,...r})}let tc=0;const Cn=new Map;function Se(e={},...t){const{id:n,className:r,variant:o="default",padding:i="md",interactive:a=false,expandable:s=false,defaultExpanded:c=true,onExpandChange:u,mediaTop:l,title:d,subtitle:p,badge:f,actions:g,footer:m,divider:b=false,tone:x="neutral",stateKey:S}=e,v=w("div",{className:"card",id:n,tabIndex:a?0:void 0});v.classList.add(`card--${o}`,`card--p-${i}`),a&&v.classList.add("card--interactive"),x!=="neutral"&&v.classList.add(`card--tone-${x}`),r&&v.classList.add(...r.split(" ").filter(Boolean)),s&&v.classList.add("card--expandable");const y=s?S??n??(typeof d=="string"?`title:${d}`:null):null;let C=!s||c;y&&Cn.has(y)&&(C=!!Cn.get(y));let h=null,k=null,T=null,I=null,L=null;const _=n?`${n}-collapse`:`card-collapse-${++tc}`,D=()=>{if(I!==null&&(cancelAnimationFrame(I),I=null),L){const F=L;L=null,F();}},ee=(F,$)=>{if(!T)return;D();const O=T;if(O.setAttribute("aria-hidden",String(!F)),!$){O.classList.remove("card-collapse--animating"),O.style.display=F?"":"none",O.style.height="",O.style.opacity="";return}if(O.classList.add("card-collapse--animating"),O.style.display="",F){O.style.height="auto";const G=O.scrollHeight;if(!G){O.classList.remove("card-collapse--animating"),O.style.display="",O.style.height="",O.style.opacity="";return}O.style.height="0px",O.style.opacity="0",O.offsetHeight,I=requestAnimationFrame(()=>{I=null,O.style.height=`${G}px`,O.style.opacity="1";});}else {const G=O.scrollHeight;if(!G){O.classList.remove("card-collapse--animating"),O.style.display="none",O.style.height="",O.style.opacity="";return}O.style.height=`${G}px`,O.style.opacity="1",O.offsetHeight,I=requestAnimationFrame(()=>{I=null,O.style.height="0px",O.style.opacity="0";});}const N=()=>{O.classList.remove("card-collapse--animating"),O.style.height="",F||(O.style.display="none"),O.style.opacity="";};let P=null;const R=G=>{G.target===O&&(P!==null&&(clearTimeout(P),P=null),O.removeEventListener("transitionend",R),O.removeEventListener("transitioncancel",R),L=null,N());};L=()=>{P!==null&&(clearTimeout(P),P=null),O.removeEventListener("transitionend",R),O.removeEventListener("transitioncancel",R),L=null,N();},O.addEventListener("transitionend",R),O.addEventListener("transitioncancel",R),P=window.setTimeout(()=>{L?.();},420);};function z(F){const $=document.createElementNS("http://www.w3.org/2000/svg","svg");return $.setAttribute("viewBox","0 0 24 24"),$.setAttribute("width","16"),$.setAttribute("height","16"),$.innerHTML=F==="up"?'<path d="M7 14l5-5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>':'<path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',$}function X(F,$=true,O=true){C=F,v.classList.toggle("card--collapsed",!C),v.classList.toggle("card--expanded",C),h&&(h.dataset.expanded=String(C),h.setAttribute("aria-expanded",String(C))),k&&(k.setAttribute("aria-expanded",String(C)),k.classList.toggle("card-toggle--collapsed",!C),k.setAttribute("aria-label",C?"Replier le contenu":"Deplier le contenu"),k.replaceChildren(z(C?"up":"down"))),s?ee(C,O):T&&(T.style.display="",T.style.height="",T.style.opacity="",T.setAttribute("aria-hidden","false")),$&&u&&u(C),y&&Cn.set(y,C);}if(l){const F=w("div",{className:"card-media"});F.append(l),v.appendChild(F);}const ue=!!(d||p||f||g&&g.length||s);if(ue){h=w("div",{className:"card-header"});const F=w("div",{className:"card-headline",style:"min-width:0;display:flex;flex-direction:column;gap:2px;"});if(d){const N=w("h3",{className:"card-title",style:"margin:0;font-size:15px;font-weight:700;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:8px;color:var(--group-title, var(--fg));"},d);f&&N.append(typeof f=="string"?w("span",{className:"badge"},f):f),F.appendChild(N);}if(p){const N=w("div",{className:"card-subtitle",style:"opacity:.85;font-size:12px;color:color-mix(in oklab, var(--fg) 80%, #9ca3af)"},p);F.appendChild(N);}(F.childNodes.length||s)&&h.appendChild(F);const $=w("div",{className:"card-header-right",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"}),O=w("div",{className:"card-actions",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"});g?.forEach(N=>O.appendChild(N)),O.childNodes.length&&$.appendChild(O),s&&(k=w("button",{className:"card-toggle",type:"button",ariaExpanded:String(C),ariaControls:_,ariaLabel:C?"Replier le contenu":"Deplier le contenu"}),k.textContent=C?"▲":"▼",k.addEventListener("click",N=>{N.preventDefault(),N.stopPropagation(),X(!C);}),$.appendChild(k),h.classList.add("card-header--expandable"),h.addEventListener("click",N=>{const P=N.target;P?.closest(".card-actions")||P?.closest(".card-toggle")||X(!C);})),$.childNodes.length&&h.appendChild($),v.appendChild(h);}T=w("div",{className:"card-collapse",id:_,ariaHidden:s?String(!C):"false"}),v.appendChild(T),b&&ue&&T.appendChild(w("div",{className:"card-divider"}));const j=w("div",{className:"card-body"});if(j.append(...t),T.appendChild(j),m){b&&T.appendChild(w("div",{className:"card-divider"}));const F=w("div",{className:"card-footer"});F.append(m),T.appendChild(F);}return k&&k.setAttribute("aria-controls",_),X(C,false,false),y&&Cn.set(y,C),v}let Xn=false;const Jn=new Set,Re=e=>{const t=document.activeElement;for(const n of Jn)if(t&&(t===n||n.contains(t))){e.stopImmediatePropagation(),e.stopPropagation();return}};function nc(){Xn||(Xn=true,window.addEventListener("keydown",Re,true),window.addEventListener("keypress",Re,true),window.addEventListener("keyup",Re,true),document.addEventListener("keydown",Re,true),document.addEventListener("keypress",Re,true),document.addEventListener("keyup",Re,true));}function rc(){Xn&&(Jn.size>0||(Xn=false,window.removeEventListener("keydown",Re,true),window.removeEventListener("keypress",Re,true),window.removeEventListener("keyup",Re,true),document.removeEventListener("keydown",Re,true),document.removeEventListener("keypress",Re,true),document.removeEventListener("keyup",Re,true)));}function oc(e){const{id:t,value:n=null,options:r,placeholder:o="Select...",size:i="md",disabled:a=false,blockGameKeys:s=true,onChange:c,onOpenChange:u}=e,l=w("div",{className:"select",id:t}),d=w("button",{className:"select-trigger",type:"button"}),p=w("span",{className:"select-value"},o),f=w("span",{className:"select-caret"},"▾");d.append(p,f);const g=w("div",{className:"select-menu",role:"listbox",tabindex:"-1","aria-hidden":"true"});l.classList.add(`select--${i}`);let m=false,b=n,x=null,S=!!a;function v(N){return N==null?o:(e.options||r).find(R=>R.value===N)?.label??o}function y(N){p.textContent=v(N),g.querySelectorAll(".select-option").forEach(P=>{const R=P.dataset.value,G=N!=null&&R===N;P.classList.toggle("selected",G),P.setAttribute("aria-selected",String(G));});}function C(N){g.replaceChildren(),N.forEach(P=>{const R=w("button",{className:"select-option"+(P.disabled?" disabled":""),type:"button",role:"option","data-value":P.value,"aria-selected":String(P.value===b),tabindex:"-1"},P.label);P.value===b&&R.classList.add("selected"),P.disabled||R.addEventListener("pointerdown",G=>{G.preventDefault(),G.stopPropagation(),_(P.value,{notify:true}),I();},{capture:true}),g.appendChild(R);});}function h(){d.setAttribute("aria-expanded",String(m)),g.setAttribute("aria-hidden",String(!m));}function k(){const N=d.getBoundingClientRect();Object.assign(g.style,{minWidth:`${N.width}px`});}function T(){m||S||(m=true,l.classList.add("open"),h(),k(),document.addEventListener("mousedown",ue,true),document.addEventListener("scroll",j,true),window.addEventListener("resize",F),g.focus({preventScroll:true}),s&&(nc(),Jn.add(l),x=()=>{Jn.delete(l),rc();}),u?.(true));}function I(){m&&(m=false,l.classList.remove("open"),h(),document.removeEventListener("mousedown",ue,true),document.removeEventListener("scroll",j,true),window.removeEventListener("resize",F),d.focus({preventScroll:true}),x?.(),x=null,u?.(false));}function L(){m?I():T();}function _(N,P={}){const R=b;b=N,y(b),P.notify!==false&&R!==N&&c?.(N);}function D(){return b}function ee(N){const P=Array.from(g.querySelectorAll(".select-option:not(.disabled)"));if(!P.length)return;const R=P.findIndex(fe=>fe.classList.contains("active")),G=P[(R+(N===1?1:P.length-1))%P.length];P.forEach(fe=>fe.classList.remove("active")),G.classList.add("active"),G.focus({preventScroll:true}),G.scrollIntoView({block:"nearest"});}function z(N){(N.key===" "||N.key==="Enter"||N.key==="ArrowDown")&&(N.preventDefault(),T());}function X(N){if(N.key==="Escape"){N.preventDefault(),I();return}if(N.key==="Enter"||N.key===" "){const P=g.querySelector(".select-option.active")||g.querySelector(".select-option.selected");P&&!P.classList.contains("disabled")&&(N.preventDefault(),_(P.dataset.value,{notify:true}),I());return}if(N.key==="ArrowDown"){N.preventDefault(),ee(1);return}if(N.key==="ArrowUp"){N.preventDefault(),ee(-1);return}}function ue(N){l.contains(N.target)||I();}function j(){m&&k();}function F(){m&&k();}function $(N){S=!!N,d.disabled=S,l.classList.toggle("disabled",S),S&&I();}function O(N){e.options=N,C(N),N.some(P=>P.value===b)||(b=null,y(null));}return l.append(d,g),d.addEventListener("pointerdown",N=>{N.preventDefault(),N.stopPropagation(),L();},{capture:true}),d.addEventListener("keydown",z),g.addEventListener("keydown",X),C(r),n!=null?(b=n,y(b)):y(null),h(),$(S),{root:l,open:T,close:I,toggle:L,getValue:D,setValue:_,setOptions:O,setDisabled:$,destroy(){document.removeEventListener("mousedown",ue,true),document.removeEventListener("scroll",j,true),window.removeEventListener("resize",F),x?.(),x=null;}}}function lr(e={}){const{id:t,text:n="",htmlFor:r,tone:o="default",size:i="md",layout:a="inline",variant:s="text",required:c=false,disabled:u=false,tooltip:l,hint:d,icon:p,suffix:f,onClick:g}=e,m=w("div",{className:"lg-label-wrap",id:t}),b=w("label",{className:"lg-label",...r?{htmlFor:r}:{},...l?{title:l}:{}});if(p){const _=typeof p=="string"?w("span",{className:"lg-label-ico"},p):p;_.classList?.add?.("lg-label-ico"),b.appendChild(_);}const x=w("span",{className:"lg-label-text"},n);b.appendChild(x);const S=w("span",{className:"lg-label-req",ariaHidden:"true"}," *");c&&b.appendChild(S);let v=null;if(f!=null){v=typeof f=="string"?document.createTextNode(f):f;const _=w("span",{className:"lg-label-suffix"});_.appendChild(v),b.appendChild(_);}const y=d?w("div",{className:"lg-label-hint"},d):null;m.classList.add(`lg-label--${a}`),m.classList.add(`lg-label--${i}`),s==="title"&&m.classList.add("lg-label--title"),C(o),u&&m.classList.add("is-disabled"),m.appendChild(b),y&&m.appendChild(y),g&&b.addEventListener("click",g);function C(_){m.classList.remove("lg-label--default","lg-label--muted","lg-label--info","lg-label--success","lg-label--warning","lg-label--danger"),m.classList.add(`lg-label--${_}`);}function h(_){x.textContent=_;}function k(_){C(_);}function T(_){_&&!S.isConnected&&b.appendChild(S),!_&&S.isConnected&&S.remove(),_?b.setAttribute("aria-required","true"):b.removeAttribute("aria-required");}function I(_){m.classList.toggle("is-disabled",!!_);}function L(_){!_&&y&&y.isConnected?y.remove():_&&y?y.textContent=_:_&&!y&&m.appendChild(w("div",{className:"lg-label-hint"},_));}return {root:m,labelEl:b,hintEl:y,setText:h,setTone:k,setRequired:T,setDisabled:I,setHint:L}}function Ht(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function An(e,t){const n=document.createElement("span");n.className=`btn-ico btn-ico--${t}`;const r=Ht(e);return r&&n.appendChild(r),n}function ic(){const e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.marginRight="6px",t.style.display="none",t.style.flexShrink="0";const n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");const r=document.createElementNS(e,"animate");r.setAttribute("attributeName","stroke-dasharray"),r.setAttribute("values","1,150;90,150;90,150"),r.setAttribute("dur","1.5s"),r.setAttribute("repeatCount","indefinite");const o=document.createElementNS(e,"animateTransform");return o.setAttribute("attributeName","transform"),o.setAttribute("attributeType","XML"),o.setAttribute("type","rotate"),o.setAttribute("from","0 12 12"),o.setAttribute("to","360 12 12"),o.setAttribute("dur","1s"),o.setAttribute("repeatCount","indefinite"),n.appendChild(r),n.appendChild(o),t.appendChild(n),t}function nt(e={}){const{label:t="",id:n,variant:r="default",size:o="md",iconLeft:i,iconRight:a,loading:s=false,tooltip:c,type:u="button",onClick:l,disabled:d=false,fullWidth:p=false}=e,f=w("button",{className:"btn",id:n});f.type=u,r==="primary"&&f.classList.add("primary"),r==="danger"&&f.classList.add("danger"),o==="sm"&&f.classList.add("btn--sm"),c&&(f.title=c),p&&(f.style.width="100%");const g=ic(),m=i?An(i,"left"):null,b=a?An(a,"right"):null,x=document.createElement("span");x.className="btn-label";const S=Ht(t);S&&x.appendChild(S),!S&&(m||b)&&f.classList.add("btn--icon"),f.appendChild(g),m&&f.appendChild(m),f.appendChild(x),b&&f.appendChild(b);const v=d||s;f.disabled=v,f.setAttribute("aria-busy",String(!!s)),g.style.display=s?"inline-block":"none",l&&f.addEventListener("click",l);const y=f;return y.setLoading=C=>{f.setAttribute("aria-busy",String(!!C)),g.style.display=C?"inline-block":"none",f.disabled=C||d;},y.setDisabled=C=>{f.disabled=C||f.getAttribute("aria-busy")==="true";},y.setLabel=C=>{x.replaceChildren();const h=Ht(C);h&&x.appendChild(h),!h&&(m||b)?f.classList.add("btn--icon"):f.classList.remove("btn--icon");},y.setIconLeft=C=>{if(C==null){m?.remove();return}m?m.replaceChildren(Ht(C)):f.insertBefore(An(C,"left"),x);},y.setIconRight=C=>{if(C==null){b?.remove();return}b?b.replaceChildren(Ht(C)):f.appendChild(An(C,"right"));},y.setVariant=C=>{f.classList.remove("primary","danger"),C==="primary"&&f.classList.add("primary"),C==="danger"&&f.classList.add("danger");},y}let va=null,To=null;function ac(){return va}function sc(e){va=e,To=null;}function xa(){return To}function lc(e){To=e;}function cc(){try{const e=window.visualViewport,t=Math.round((e?.width??window.innerWidth)||0),n=Math.round((e?.height??window.innerHeight)||0);if(t&&n)return t>=n?"landscape":"portrait"}catch{}return "unknown"}function wa(){const e=navigator.userAgent||"",t=navigator.platform||"",n=navigator.userAgentData;if(n&&typeof n.platform=="string"){const o=n.platform.toLowerCase();if(o.includes("windows"))return "windows";if(o.includes("mac"))return "mac";if(o.includes("android"))return "android";if(o.includes("chrome os")||o.includes("cros"))return "chromeos";if(o.includes("linux"))return "linux";if(o.includes("ios"))return "ios"}return /iPhone|iPad|iPod/i.test(e)||t==="MacIntel"&&(navigator.maxTouchPoints??0)>1?"ios":/Android/i.test(e)?"android":/CrOS/i.test(e)?"chromeos":/Win/i.test(e)?"windows":/Mac/i.test(e)?"mac":/Linux/i.test(e)?"linux":"unknown"}function ka(){const e=navigator.userAgent||"",t=navigator.userAgentData;if(t&&Array.isArray(t.brands)){const n=t.brands.map(a=>String(a.brand||a.brandName||a.brandVersion||a)),r=n.some(a=>/Edge/i.test(a)||/Microsoft Edge/i.test(a)),o=n.some(a=>/Opera/i.test(a)||/OPR/i.test(a)),i=n.some(a=>/Chrome|Chromium/i.test(a));if(r)return "Edge";if(o)return "Opera";if(i)return "Chrome";if(navigator.brave)return "Brave"}return /FxiOS/i.test(e)?"Firefox":/CriOS/i.test(e)?"Chrome":/EdgiOS/i.test(e)?"Edge":/OPiOS|OPR|Opera Mini|Opera/i.test(e)?"Opera":/Edg\//i.test(e)?"Edge":/OPR\//i.test(e)||/Opera/i.test(e)?"Opera":/Firefox/i.test(e)?"Firefox":/Safari/i.test(e)&&!/Chrome|Chromium|Edg|OPR/i.test(e)?"Safari":/Brave/i.test(e)||window.Brave||navigator.brave?"Brave":/Chrome|Chromium/i.test(e)?"Chrome":"Unknown"}function dc(){const e=ac();if(e)return e;const t=navigator.userAgent||"",n=navigator.userAgentData;return n&&typeof n.mobile=="boolean"?n.mobile?"mobile":"desktop":/Android|iPhone|iPad|iPod|Mobile/i.test(t)?"mobile":"desktop"}function uc(e){if(!e)return null;try{return new URL(e).hostname}catch{return null}}function Sa(){try{return window.top!==window.self}catch{return  true}}function pc(){const e=Sa(),t=uc(document.referrer);return e&&!!t&&/(^|\.)discord(app)?\.com$/i.test(t)?"discord":"web"}function cr(){const e=xa();if(e)return e;const t=pc(),n=dc(),r=wa(),o=ka(),i=Sa(),a=window.screen||{},s=window.visualViewport,c=Math.round(window.innerWidth||document.documentElement.clientWidth||0),u=Math.round(window.innerHeight||document.documentElement.clientHeight||0),l=Math.round(s?.width??c),d=Math.round(s?.height??u),p=Math.round(a.width||0),f=Math.round(a.height||0),g=Math.round(a.availWidth||p),m=Math.round(a.availHeight||f),b=Number.isFinite(window.devicePixelRatio)?window.devicePixelRatio:1,x={surface:t,host:location.hostname,origin:location.origin,isInIframe:i,platform:n,browser:o,os:r,viewportWidth:c,viewportHeight:u,visualViewportWidth:l,visualViewportHeight:d,screenWidth:p,screenHeight:f,availScreenWidth:g,availScreenHeight:m,dpr:b,orientation:cc()};return lc(x),x}function fc(){return cr().surface==="discord"}function gc(){return cr().platform==="mobile"}function mc(){cr();}function hc(){return xa()!==null}const Qe={init:mc,isReady:hc,detect:cr,isDiscord:fc,isMobile:gc,detectOS:wa,detectBrowser:ka,setPlatformOverride:sc};let Qn=false;const Ut=new Set;function bc(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}const Oe=e=>{const t=bc();if(t){for(const n of Ut)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function yc(){Qn||(Qn=true,window.addEventListener("keydown",Oe,true),window.addEventListener("keypress",Oe,true),window.addEventListener("keyup",Oe,true),document.addEventListener("keydown",Oe,true),document.addEventListener("keypress",Oe,true),document.addEventListener("keyup",Oe,true));}function vc(){Qn&&(Qn=false,window.removeEventListener("keydown",Oe,true),window.removeEventListener("keypress",Oe,true),window.removeEventListener("keyup",Oe,true),document.removeEventListener("keydown",Oe,true),document.removeEventListener("keypress",Oe,true),document.removeEventListener("keyup",Oe,true));}function xc(e){return Ut.size===0&&yc(),Ut.add(e),()=>{Ut.delete(e),Ut.size===0&&vc();}}function wc(e,t,n,r){let o;switch(e){case "digits":o="0-9";break;case "alpha":o="\\p{L}";break;case "alphanumeric":o="\\p{L}0-9";break;default:return null}return t&&(o+=" "),n&&(o+="\\-"),r&&(o+="_"),new RegExp(`[^${o}]`,"gu")}function kc(e,t){return t?e.replace(t,""):e}function Sc(e,t=0){if(!t)return e;let n;return((...r)=>{clearTimeout(n),n=setTimeout(()=>e(...r),t);})}function Ca(e={}){const{id:t,placeholder:n="",value:r="",mode:o="any",allowSpaces:i=false,allowDashes:a=false,allowUnderscore:s=false,maxLength:c,blockGameKeys:u=true,debounceMs:l=0,onChange:d,onEnter:p,label:f}=e,g=w("div",{className:"lg-input-wrap"}),m=w("input",{className:"input",id:t,placeholder:n});if(typeof c=="number"&&c>0&&(m.maxLength=c),r&&(m.value=r),f){const _=w("div",{className:"lg-input-label"},f);g.appendChild(_);}g.appendChild(m);const b=wc(o,i,a,s),x=()=>{const _=m.selectionStart??m.value.length,D=m.value.length,ee=kc(m.value,b);if(ee!==m.value){m.value=ee;const z=D-ee.length,X=Math.max(0,_-z);m.setSelectionRange(X,X);}},S=Sc(()=>d?.(m.value),l);m.addEventListener("input",()=>{x(),S();}),m.addEventListener("paste",()=>queueMicrotask(()=>{x(),S();})),m.addEventListener("keydown",_=>{_.key==="Enter"&&p?.(m.value);});const v=u?xc(m):()=>{};function y(){return m.value}function C(_){m.value=_??"",x(),S();}function h(){m.focus();}function k(){m.blur();}function T(_){m.disabled=!!_;}function I(){return document.activeElement===m}function L(){v();}return {root:g,input:m,getValue:y,setValue:C,focus:h,blur:k,setDisabled:T,isFocused:I,destroy:L}}function be(e,t,n){return Math.min(n,Math.max(t,e))}function Qt({h:e,s:t,v:n,a:r}){const o=(e%360+360)%360/60,i=n*t,a=i*(1-Math.abs(o%2-1));let s=0,c=0,u=0;switch(Math.floor(o)){case 0:s=i,c=a;break;case 1:s=a,c=i;break;case 2:c=i,u=a;break;case 3:c=a,u=i;break;case 4:s=a,u=i;break;default:s=i,u=a;break}const d=n-i,p=Math.round((s+d)*255),f=Math.round((c+d)*255),g=Math.round((u+d)*255);return {r:be(p,0,255),g:be(f,0,255),b:be(g,0,255),a:be(r,0,1)}}function Aa({r:e,g:t,b:n,a:r}){const o=be(e,0,255)/255,i=be(t,0,255)/255,a=be(n,0,255)/255,s=Math.max(o,i,a),c=Math.min(o,i,a),u=s-c;let l=0;u!==0&&(s===o?l=60*((i-a)/u%6):s===i?l=60*((a-o)/u+2):l=60*((o-i)/u+4)),l<0&&(l+=360);const d=s===0?0:u/s;return {h:l,s:d,v:s,a:be(r,0,1)}}function Io({r:e,g:t,b:n}){const r=o=>be(Math.round(o),0,255).toString(16).padStart(2,"0");return `#${r(e)}${r(t)}${r(n)}`.toUpperCase()}function Cc({r:e,g:t,b:n,a:r}){const o=be(Math.round(r*255),0,255);return `${Io({r:e,g:t,b:n})}${o.toString(16).padStart(2,"0")}`.toUpperCase()}function Vt({r:e,g:t,b:n,a:r}){const o=Math.round(r*1e3)/1e3;return `rgba(${e}, ${t}, ${n}, ${o})`}function Tt(e){let t=e.trim();if(!t||(t.startsWith("#")&&(t=t.slice(1)),![3,4,6,8].includes(t.length))||!/^[0-9a-fA-F]+$/.test(t))return null;(t.length===3||t.length===4)&&(t=t.split("").map(a=>a+a).join(""));let n=255;t.length===8&&(n=parseInt(t.slice(6,8),16),t=t.slice(0,6));const r=parseInt(t.slice(0,2),16),o=parseInt(t.slice(2,4),16),i=parseInt(t.slice(4,6),16);return {r,g:o,b:i,a:n/255}}function Xr(e){if(!e)return null;const t=e.trim();if(t.startsWith("#"))return Tt(t);const n=t.match(/^rgba?\(([^)]+)\)$/i);if(n){const r=n[1].split(",").map(c=>c.trim());if(r.length<3)return null;const o=Number(r[0]),i=Number(r[1]),a=Number(r[2]),s=r[3]!=null?Number(r[3]):1;return [o,i,a,s].some(c=>Number.isNaN(c))?null:{r:o,g:i,b:a,a:s}}return null}function Ac(e,t){const n=Xr(e)??Tt(e??"")??{r:244,g:67,b:54,a:1};return typeof t=="number"&&(n.a=be(t,0,1)),Aa(n)}function Tc(e){return `#${e.trim().replace(/[^0-9a-fA-F#]/g,"").replace(/#/g,"")}`.slice(0,9).toUpperCase()}function Ic(e){let t=e.trim();return t&&(/^rgba?\s*\(/i.test(t)?t=t.replace(/^rgba?/i,"rgba"):(t=t.replace(/^\(?(.*)\)?$/,"$1"),t=`rgba(${t})`),t=t.replace(/\s*\(\s*/,"("),t=t.replace(/\s*\)\s*$/,")"),t=t.replace(/\s*,\s*/g,", "),t)}function ot(e){const t=Qt(e),n=Qt({...e,a:1});return {hsva:{...e},hex:Io(n),hexa:Cc(t),rgba:Vt(t),alpha:e.a}}function Pc(e={}){const{id:t,label:n="Color",value:r,alpha:o,defaultExpanded:i=false,detectMobile:a,onInput:s,onChange:c}=e,l=a?a():Qe.detect().platform==="mobile";let d=Ac(r,o);const p=Se({id:t,className:"color-picker",title:n,padding:l?"md":"lg",variant:"soft",expandable:!l,defaultExpanded:!l&&i});p.classList.add(l?"color-picker--mobile":"color-picker--desktop");const f=p.querySelector(".card-header");f&&f.classList.add("color-picker__header");const g=f?.querySelector(".card-title"),m=w("button",{className:"color-picker__preview",type:"button",title:`Preview ${n}`,"aria-label":`Change ${n}`});g?g.prepend(m):f?f.prepend(m):p.prepend(m);const b=p.querySelector(".card-toggle");!l&&b&&m.addEventListener("click",()=>{p.classList.contains("card--collapsed")&&b.click();});const x=p.querySelector(".card-collapse");let S=null,v=null,y=null,C=null,h=null,k=null,T=null,I=null,L=null,_="hex";function D(j){const F=ot(d);j==="input"?s?.(F):c?.(F);}function ee(){const j=ot(d);if(m.style.setProperty("--cp-preview-color",j.rgba),m.setAttribute("aria-label",`${n}: ${j.hexa}`),!l&&S&&v&&y&&C&&h&&k&&T){const F=Qt({...d,s:1,v:1,a:1}),$=Vt(F);S.style.setProperty("--cp-palette-hue",$),v.style.left=`${d.s*100}%`,v.style.top=`${(1-d.v)*100}%`,y.style.setProperty("--cp-alpha-gradient",`linear-gradient(180deg, ${Vt({...F,a:1})} 0%, ${Vt({...F,a:0})} 100%)`),C.style.top=`${(1-d.a)*100}%`,h.style.setProperty("--cp-hue-color",Vt(Qt({...d,v:1,s:1,a:1}))),k.style.left=`${d.h/360*100}%`;const O=d.a===1?j.hex:j.hexa,N=j.rgba,P=_==="hex"?O:N;T!==document.activeElement&&(T.value=P),T.setAttribute("aria-label",`${_.toUpperCase()} code for ${n}`),T.placeholder=_==="hex"?"#RRGGBB or #RRGGBBAA":"rgba(0, 0, 0, 1)",_==="hex"?T.maxLength=9:T.removeAttribute("maxLength"),T.dataset.mode=_,I&&(I.textContent=_.toUpperCase(),I.setAttribute("aria-label",_==="hex"?"Passer en saisie RGBA":"Revenir en saisie HEX"),I.setAttribute("aria-pressed",_==="rgba"?"true":"false"),I.classList.toggle("is-alt",_==="rgba"));}L&&L!==document.activeElement&&(L.value=j.hex);}function z(j,F=null){d={h:(j.h%360+360)%360,s:be(j.s,0,1),v:be(j.v,0,1),a:be(j.a,0,1)},ee(),F&&D(F);}function X(j,F=null){z(Aa(j),F);}function ue(j,F,$){j.addEventListener("pointerdown",O=>{O.preventDefault();const N=O.pointerId,P=G=>{G.pointerId===N&&F(G);},R=G=>{G.pointerId===N&&(document.removeEventListener("pointermove",P),document.removeEventListener("pointerup",R),document.removeEventListener("pointercancel",R),$?.(G));};F(O),document.addEventListener("pointermove",P),document.addEventListener("pointerup",R),document.addEventListener("pointercancel",R);});}if(!l&&x){const j=x.querySelector(".card-body");if(j){j.classList.add("color-picker__body"),v=w("div",{className:"color-picker__palette-cursor"}),S=w("div",{className:"color-picker__palette"},v),C=w("div",{className:"color-picker__alpha-thumb"}),y=w("div",{className:"color-picker__alpha"},C),k=w("div",{className:"color-picker__hue-thumb"}),h=w("div",{className:"color-picker__hue"},k);const F=w("div",{className:"color-picker__main"},S,y),$=w("div",{className:"color-picker__hue-row"},h),O=Ca({blockGameKeys:true});T=O.input,T.classList.add("color-picker__hex-input"),T.value="",T.maxLength=9,T.spellcheck=false,T.inputMode="text",T.setAttribute("aria-label",`Hex code for ${n}`),I=w("button",{type:"button",className:"color-picker__mode-btn",textContent:"HEX","aria-pressed":"false","aria-label":"Passer en saisie RGBA"}),O.root.classList.add("color-picker__hex-wrap");const N=w("div",{className:"color-picker__hex-row"},I,O.root);j.replaceChildren(F,$,N),ue(S,R=>{if(!S||!v)return;const G=S.getBoundingClientRect(),fe=be((R.clientX-G.left)/G.width,0,1),wt=be((R.clientY-G.top)/G.height,0,1);z({...d,s:fe,v:1-wt},"input");},()=>D("change")),ue(y,R=>{if(!y)return;const G=y.getBoundingClientRect(),fe=be((R.clientY-G.top)/G.height,0,1);z({...d,a:1-fe},"input");},()=>D("change")),ue(h,R=>{if(!h)return;const G=h.getBoundingClientRect(),fe=be((R.clientX-G.left)/G.width,0,1);z({...d,h:fe*360},"input");},()=>D("change")),I.addEventListener("click",()=>{if(_=_==="hex"?"rgba":"hex",T){const R=ot(d);T.value=_==="hex"?d.a===1?R.hex:R.hexa:R.rgba;}ee(),T?.focus(),T?.select();}),T.addEventListener("input",()=>{if(_==="hex"){const R=Tc(T.value);if(R!==T.value){const G=T.selectionStart??R.length;T.value=R,T.setSelectionRange(G,G);}}});const P=()=>{const R=T.value;if(_==="hex"){const G=Tt(R);if(!G){T.value=d.a===1?ot(d).hex:ot(d).hexa;return}const fe=R.startsWith("#")?R.slice(1):R,wt=fe.length===4||fe.length===8;G.a=wt?G.a:d.a,X(G,"change");}else {const G=Ic(R),fe=Xr(G);if(!fe){T.value=ot(d).rgba;return}X(fe,"change");}};T.addEventListener("change",P),T.addEventListener("blur",P),T.addEventListener("keydown",R=>{R.key==="Enter"&&(P(),T.blur());});}}return l&&(x&&x.remove(),L=w("input",{className:"color-picker__native",type:"color",value:Io(Qt({...d,a:1}))}),m.addEventListener("click",()=>L.click()),L.addEventListener("input",()=>{const j=Tt(L.value);j&&(j.a=d.a,X(j,"input"),D("change"));}),p.appendChild(L)),ee(),{root:p,isMobile:l,getValue:()=>ot(d),setValue:(j,F)=>{const $=Xr(j)??Tt(j)??Tt("#FFFFFF");$&&(typeof F=="number"&&($.a=F),X($,null));}}}const Ec=window;function Mc(){if(typeof unsafeWindow<"u"&&unsafeWindow)return unsafeWindow;const e=window.wrappedJSObject;return e&&e!==window?e:Ec}const _c=Mc(),M=_c;function Lc(e){try{return !!e.isSecureContext}catch{return  false}}function Po(e){const t=e?.getRootNode?.();return t&&(t instanceof Document||t.host)?t:document}function Ta(){const e=navigator.platform||"",t=navigator.userAgent||"";return /Mac|iPhone|iPad|iPod/i.test(e)||/Mac OS|iOS/i.test(t)}async function Rc(){try{const e=await navigator.permissions?.query?.({name:"clipboard-write"});return e?e.state==="granted"||e.state==="prompt":!0}catch{return  true}}function Oc(e,t){const n=document.createElement("textarea");return n.value=e,n.setAttribute("readonly","true"),n.style.position="fixed",n.style.opacity="0",n.style.pointerEvents="none",n.style.top="0",t.appendChild?t.appendChild(n):document.body.appendChild(n),n}function Nc(e){try{const t=window.getSelection?.();if(!t)return !1;const n=document.createRange();return n.selectNodeContents(e),t.removeAllRanges(),t.addRange(n),!0}catch{return  false}}async function $c(e){if(!("clipboard"in navigator))return {ok:false,method:"clipboard-write"};if(!Lc(M))return {ok:false,method:"clipboard-write"};if(!await Rc())return {ok:false,method:"clipboard-write"};try{return await navigator.clipboard.writeText(e),{ok:!0,method:"clipboard-write"}}catch{return {ok:false,method:"clipboard-write"}}}function Dc(e,t){try{const n=t||Po(),r=Oc(e,n);r.focus(),r.select(),r.setSelectionRange(0,r.value.length);let o=!1;try{o=document.execCommand("copy");}catch{o=!1;}return r.remove(),{ok:o,method:"execCommand"}}catch{return {ok:false,method:"execCommand"}}}function Fc(e,t){if(!t)return {ok:false,method:"selection"};const n=t.textContent??"";let r=false;if(n!==e)try{t.textContent=e,r=!0;}catch{}const o=Nc(t);r&&setTimeout(()=>{try{t.textContent=n;}catch{}},80);const i=Ta()?"⌘C pour copier":"Ctrl+C pour copier";return {ok:o,method:"selection",hint:i}}async function zc(e,t={}){const n=(e??"").toString();if(!n.length)return {ok:false,method:"noop"};const r=await $c(n);if(r.ok)return r;const o=t.injectionRoot||Po(t.valueNode||void 0),i=Dc(n,o);if(i.ok)return i;const a=Fc(n,t.valueNode||null);if(a.ok)return a;if(!t.disablePromptFallback)try{return window.prompt(Qe.isDiscord()?"Copie manuelle (Discord bloque clipboard):":"Copie manuelle:",n),{ok:!0,method:"prompt"}}catch{}return {ok:false,method:"noop"}}function Gc(e,t,n={}){const r=o=>{if(n.showTip){n.showTip(o);return}try{e.setAttribute("aria-label",o);const i=document.createElement("div");i.textContent=o,i.style.position="absolute",i.style.top="-28px",i.style.right="0",i.style.padding="4px 8px",i.style.borderRadius="8px",i.style.fontSize="12px",i.style.background="color-mix(in oklab, var(--bg) 85%, transparent)",i.style.border="1px solid var(--border)",i.style.color="var(--fg)",i.style.pointerEvents="none",i.style.opacity="0",i.style.transition="opacity .12s";const a=Po(e);a.appendChild?a.appendChild(i):document.body.appendChild(i);const s=e.getBoundingClientRect();i.style.left=`${s.right-8}px`,i.style.top=`${s.top-28}px`,requestAnimationFrame(()=>i.style.opacity="1"),setTimeout(()=>{i.style.opacity="0",setTimeout(()=>i.remove(),150);},1200);}catch{}};e.addEventListener("click",async o=>{o.stopPropagation();const i=(t()??"").toString(),a=await zc(i,{valueNode:n.valueNode??null,injectionRoot:n.injectionRoot??null,disablePromptFallback:n.disablePromptFallback??false});n.onResult?.(a),a.ok?a.method==="clipboard-write"||a.method==="execCommand"||a.method==="prompt"?r("Copié"):a.method==="selection"&&r(a.hint||(Ta()?"⌘C pour copier":"Ctrl+C pour copier")):r("Impossible de copier");});}const Zt={light:{"--bg":"rgba(255,255,255,0.7)","--fg":"#0f172a","--muted":"rgba(15,23,42,0.06)","--soft":"rgba(15,23,42,0.04)","--accent":"#2563eb","--border":"rgba(15,23,42,0.12)","--shadow":"rgba(2,6,23,.2)","--tab-bg":"#ffffff","--tab-fg":"#0f172a","--pill-from":"#4f46e5","--pill-to":"#06b6d4"},dark:{"--bg":"rgba(10,12,18,0.6)","--fg":"#e5e7eb","--muted":"rgba(229,231,235,0.08)","--soft":"rgba(229,231,235,0.05)","--accent":"#60a5fa","--border":"rgba(148,163,184,0.2)","--shadow":"rgba(0,0,0,.45)","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#e5e7eb","--pill-from":"#6366f1","--pill-to":"#06b6d4"},sepia:{"--bg":"rgba(247,242,231,0.72)","--fg":"#3b2f2f","--muted":"rgba(59,47,47,0.06)","--soft":"rgba(59,47,47,0.04)","--accent":"#b07d62","--border":"rgba(59,47,47,0.14)","--shadow":"rgba(0,0,0,.18)","--tab-bg":"#fff","--tab-fg":"#3b2f2f","--pill-from":"#b07d62","--pill-to":"#d4a373"},forest:{"--bg":"rgba(14,24,18,0.62)","--fg":"#e7f5e9","--muted":"rgba(231,245,233,0.08)","--soft":"rgba(231,245,233,0.05)","--accent":"#34d399","--border":"rgba(231,245,233,0.16)","--shadow":"rgba(0,0,0,.5)","--tab-bg":"rgba(255,255,255,0.06)","--tab-fg":"#e7f5e9","--pill-from":"#10b981","--pill-to":"#84cc16"},violet:{"--bg":"rgba(23, 16, 42, 0.68)","--fg":"#f5f3ff","--muted":"rgba(245,243,255,0.08)","--soft":"rgba(245,243,255,0.05)","--accent":"#a855f7","--border":"rgba(216,180,254,0.22)","--shadow":"rgba(12,3,30,.55)","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#ede9fe","--pill-from":"#a855f7","--pill-to":"#f472b6"},ocean:{"--bg":"rgba(10, 34, 46, 0.66)","--fg":"#e0f7ff","--muted":"rgba(224,247,255,0.07)","--soft":"rgba(224,247,255,0.05)","--accent":"#38bdf8","--border":"rgba(125, 211, 252, 0.22)","--shadow":"rgba(0, 16, 32, .52)","--tab-bg":"rgba(56,189,248,0.14)","--tab-fg":"#e0f7ff","--pill-from":"#0ea5e9","--pill-to":"#14b8a6"},ember:{"--bg":"rgba(34,18,10,0.64)","--fg":"#fff7ed","--muted":"rgba(255,247,237,0.08)","--soft":"rgba(255,247,237,0.05)","--accent":"#f97316","--border":"rgba(255, 159, 92, 0.24)","--shadow":"rgba(16,6,2,.52)","--tab-bg":"rgba(255,247,237,0.09)","--tab-fg":"#fff7ed","--pill-from":"#fb923c","--pill-to":"#facc15"},magicGarden:{"--bg":"#201D1D","--fg":"#F5F5F5","--muted":"rgba(255,255,255,0.6)","--soft":"rgba(0,0,0,0.3)","--accent":"#FFF27D","--border":"rgba(255,255,255,0.1)","--border-accent":"#4A3B2E","--shadow":"rgba(0,0,0,0.5)","--card-shadow":"0 4px 10px rgba(0, 0, 0, 0.5)","--tab-bg":"#10725A","--tab-fg":"#F5F5F5","--section-title":"#10725A","--group-title":"#5EB292","--item-label":"#F5F5F5","--item-desc":"rgba(255,255,255,0.6)","--item-value":"#FFF27D","--card-bg":"rgba(0,0,0,0.3)","--card-radius":"12px","--card-border":"#4A3B2E","--pill-from":"#FFF27D","--pill-to":"#5EB292","--scrollbar-thumb":"rgba(255,255,255,0.2)","--scrollbar-thumb-hover":"rgba(255,255,255,0.3)"}};function jc(e){const{host:t,themes:n,initialTheme:r,onThemeChange:o}=e;let i=r,a=null,s=false;function c(l){const d=n[l]||n[i]||{};s&&t.classList.add("theme-anim");for(const[p,f]of Object.entries(d))t.style.setProperty(p,f);s?(a!==null&&clearTimeout(a),a=M.setTimeout(()=>{t.classList.remove("theme-anim"),a=null;},320)):s=true,i=l,o?.(l);}function u(){return i}return c(r),{applyTheme:c,getCurrentTheme:u}}const Jr={ui:{expandedCards:{style:false,system:false}}};async function Bc(){const e=await ya("tab-settings",{version:1,defaults:Jr,sanitize:o=>({ui:{expandedCards:gi(Jr.ui.expandedCards,o.ui?.expandedCards)}})});function t(o){const i=e.get();e.update({ui:{...i.ui,...o,expandedCards:gi(i.ui.expandedCards,o.expandedCards)}});}function n(o,i){const a=e.get();e.update({ui:{...a.ui,expandedCards:{...a.ui.expandedCards,[o]:!!i}}});}function r(o){const i=e.get();n(o,!i.ui.expandedCards[o]);}return {get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:r}}function Ia(e){return e.replace(/[_-]+/g," ").replace(/^\w/,t=>t.toUpperCase())}function Wc(){return Object.keys(Zt).map(e=>({value:e,label:Ia(e)}))}const Hc=["--bg","--fg","--accent","--muted","--soft","--border","--shadow","--tab-bg","--tab-fg","--pill-from","--pill-to"];function Uc(e){return Ia(e.replace(/^--/,""))}function Vc(e){return e.alpha<1?e.rgba:e.hex}class Kc extends Nt{constructor(t){super({id:"tab-settings",label:"Settings"}),this.deps=t;}async build(t){const n=this.createGrid("12px");n.id="settings",t.appendChild(n);let r;try{r=await Bc();}catch{r={get:()=>Jr,set:()=>{},save:()=>{},setUI:()=>{},setCardExpanded:()=>{},toggleCard:()=>{}};}const o=r.get(),i=Object.keys(Zt),a=this.deps.getCurrentTheme?.()??this.deps.initialTheme,s=i.includes(a)?a:i[0]??"dark";let c=s;const u=lr({text:"Theme",tone:"muted",size:"lg"}),l=oc({options:Wc(),value:s,onChange:g=>{c=g,this.deps.applyTheme(g),this.renderThemePickers(g,d,c);}}),d=w("div",{className:"settings-theme-grid"}),p=Se({title:"Style",padding:"lg",expandable:true,defaultExpanded:!!o.ui.expandedCards.style,onExpandChange:g=>r.setCardExpanded("style",g)},w("div",{className:"kv settings-theme-row"},u.root,l.root),d);this.renderThemePickers(s,d,c);const f=this.createEnvCard({defaultExpanded:!!o.ui.expandedCards.system,onExpandChange:g=>r.setCardExpanded("system",g)});n.appendChild(p),n.appendChild(f);}renderThemePickers(t,n,r){const o=Zt[t];if(n.replaceChildren(),!!o)for(const i of Hc){const a=o[i];if(a==null)continue;const s=Pc({label:Uc(i),value:a,defaultExpanded:false,onInput:c=>this.updateThemeVar(t,i,c,r),onChange:c=>this.updateThemeVar(t,i,c,r)});n.appendChild(s.root);}}updateThemeVar(t,n,r,o){const i=Zt[t];i&&(i[n]=Vc(r),o===t&&this.deps.applyTheme(t));}createEnvCard(t){const n=t?.defaultExpanded??false,r=t?.onExpandChange,o=(b,x)=>{const S=w("div",{className:"kv kv--inline-mobile"}),v=w("label",{},b),y=w("div",{className:"ro"});return typeof x=="string"?y.textContent=x:y.append(x),S.append(v,y),S},i=w("code",{},"—"),a=w("span",{},"—"),s=w("span",{},"—"),c=w("span",{},"—"),u=w("span",{},"—"),l=w("span",{},"—"),d=()=>{const b=Qe.detect();s.textContent=b.surface,c.textContent=b.platform,u.textContent=b.browser??"Unknown",l.textContent=b.os??"Unknown",i.textContent=b.host,a.textContent=b.isInIframe?"Yes":"No";},p=nt({label:"Copy JSON",variant:"primary",size:"sm"});Gc(p,()=>{const b=Qe.detect();return JSON.stringify(b,null,2)});const f=w("div",{style:"width:100%;display:flex;justify-content:center;"},p),g=Se({title:"System",variant:"soft",padding:"lg",footer:f,expandable:true,defaultExpanded:n,onExpandChange:r},o("Surface",s),o("Platform",c),o("Browser",u),o("OS",l),o("Host",i),o("Iframe",a)),m=()=>{document.hidden||d();};return document.addEventListener("visibilitychange",m),d(),this.addCleanup(()=>document.removeEventListener("visibilitychange",m)),g}}function Eo(e={}){const{id:t,checked:n=false,disabled:r=false,size:o="md",label:i,labelSide:a="right",onChange:s}=e,c=w("div",{className:"lg-switch-wrap"}),u=w("button",{className:`lg-switch lg-switch--${o}`,id:t,type:"button",role:"switch","aria-checked":String(!!n),"aria-disabled":String(!!r),title:i??"Basculer"}),l=w("span",{className:"lg-switch-track"}),d=w("span",{className:"lg-switch-thumb"});u.append(l,d);let p=null;i&&a!=="none"&&(p=w("span",{className:"lg-switch-label"},i)),p&&a==="left"?c.append(p,u):p&&a==="right"?c.append(u,p):c.append(u);let f=!!n,g=!!r;function m(){u.classList.toggle("on",f),u.setAttribute("aria-checked",String(f)),u.disabled=g,u.setAttribute("aria-disabled",String(g));}function b(I=false){g||(f=!f,m(),I||s?.(f));}function x(I){I.preventDefault(),b();}function S(I){g||((I.key===" "||I.key==="Enter")&&(I.preventDefault(),b()),I.key==="ArrowLeft"&&(I.preventDefault(),y(false)),I.key==="ArrowRight"&&(I.preventDefault(),y(true)));}u.addEventListener("click",x),u.addEventListener("keydown",S);function v(){return f}function y(I,L=false){f=!!I,m(),L||s?.(f);}function C(I){g=!!I,m();}function h(I){if(!I){p&&(p.remove(),p=null);return}p?p.textContent=I:(p=w("span",{className:"lg-switch-label"},I),c.append(p));}function k(){u.focus();}function T(){u.removeEventListener("click",x),u.removeEventListener("keydown",S);}return m(),{root:c,button:u,isChecked:v,setChecked:y,setDisabled:C,setLabel:h,focus:k,destroy:T}}function Pa(e){const{id:t,columns:n,data:r,pageSize:o=0,stickyHeader:i=true,zebra:a=true,animations:s=true,respectReducedMotion:c=true,compact:u=false,maxHeight:l,selectable:d=false,selectionType:p="switch",selectOnRowClick:f=false,initialSelection:g=[],hideHeaderCheckbox:m=false,getRowId:b=(B,H)=>String(H),onSortChange:x,onSelectionChange:S,onRowClick:v}=e;let y=n.slice(),C=r.slice(),h=r.slice(),k=null,T=null,I=1;const L=typeof window<"u"&&typeof window.matchMedia=="function"?window.matchMedia("(prefers-reduced-motion: reduce)").matches:false,_=!!s&&!(c&&L),D=w("div",{className:"lg-table-wrap",id:t});if(l!=null){const B=typeof l=="number"?`${l}px`:l;D.style.setProperty("--tbl-max-h",B);}const ee=w("div",{className:"lg-table"}),z=w("div",{className:"lg-thead"}),X=w("div",{className:"lg-tbody"}),ue=w("div",{className:"lg-tfoot"});i&&D.classList.add("sticky"),a&&D.classList.add("zebra"),u&&D.classList.add("compact"),d&&D.classList.add("selectable");const j=p==="switch"?"52px":"36px";D.style.setProperty("--check-w",j);function F(B){return B==="center"?"center":B==="right"?"flex-end":"flex-start"}function $(){const B=y.map(Q=>{const oe=(Q.width||"1fr").trim();return /\bfr$/.test(oe)?`minmax(0, ${oe})`:oe}),H=(d?[j,...B]:B).join(" ");D.style.setProperty("--lg-cols",H);}$();function O(){return o?Math.max(1,Math.ceil(C.length/o)):1}function N(){if(!o)return C;const B=(I-1)*o;return C.slice(B,B+o)}function P(){if(!k||!T)return;const B=y.find(oe=>String(oe.key)===k),H=T==="asc"?1:-1,Q=B?.sortFn?(oe,se)=>H*B.sortFn(oe,se):(oe,se)=>{const q=oe[k],J=se[k];return q==null&&J==null?0:q==null?-1*H:J==null?1*H:typeof q=="number"&&typeof J=="number"?H*(q-J):H*String(q).localeCompare(String(J),void 0,{numeric:true,sensitivity:"base"})};C.sort(Q);}const R=new Set(g);function G(){return Array.from(R)}const fe=new Map;function wt(B){R.clear(),B.forEach(H=>R.add(H)),Te(),fe.forEach((H,Q)=>{H.setChecked(R.has(Q),true);}),zt(),S?.(G());}function re(){R.clear(),Te(),fe.forEach(B=>B.setChecked(false,true)),zt(),S?.(G());}let pe=null;function Te(){if(!pe)return;const B=N();if(!B.length){pe.indeterminate=false,pe.checked=false;return}const H=B.map((oe,se)=>b(oe,(I-1)*(o||0)+se)),Q=H.reduce((oe,se)=>oe+(R.has(se)?1:0),0);pe.checked=Q===H.length,pe.indeterminate=Q>0&&Q<H.length;}function vn(){const B=X.offsetWidth-X.clientWidth;z.style.paddingRight=B>0?`${B}px`:"0px";}function Cr(){requestAnimationFrame(vn);}const Ar=new ResizeObserver(()=>vn()),li=()=>vn();function $l(){z.replaceChildren();const B=w("div",{className:"lg-tr lg-tr-head"});if(d){const H=w("div",{className:"lg-th lg-th-check"});m||(pe=w("input",{type:"checkbox"}),pe.addEventListener("change",()=>{const Q=N(),oe=pe.checked;Q.forEach((se,q)=>{const J=b(se,(I-1)*(o||0)+q);oe?R.add(J):R.delete(J);}),S?.(G()),zt();}),H.appendChild(pe)),B.appendChild(H);}y.forEach(H=>{const Q=w("button",{className:"lg-th",type:"button",title:H.title||H.header});Q.textContent=H.header,H.align&&Q.style.setProperty("--col-justify",F(H.align)),H.sortable&&Q.classList.add("sortable"),k===String(H.key)&&T?Q.setAttribute("data-sort",T):Q.removeAttribute("data-sort"),H.sortable&&Q.addEventListener("click",()=>{const oe=String(H.key);k!==oe?(k=oe,T="asc"):(T=T==="asc"?"desc":T==="desc"?null:"asc",T||(k=null,C=h.slice())),x?.(k,T),k&&T&&P(),wn();}),B.appendChild(Q);}),z.appendChild(B);try{Ar.disconnect();}catch{}Ar.observe(X),Cr();}function Tr(B){return Array.from(B.querySelectorAll(":scope > .lg-td, :scope > .lg-td-check"))}function ci(B){return B.querySelector(".lg-td, .lg-td-check")}function di(B){const H=ci(B);return H?H.getBoundingClientRect():null}function zt(){const B=N(),H=new Map;Array.from(X.children).forEach(q=>{const J=q,ke=J.getAttribute("data-id");if(!ke)return;const Me=di(J);Me&&H.set(ke,Me);});const Q=new Map;Array.from(X.children).forEach(q=>{const J=q,ke=J.getAttribute("data-id");ke&&Q.set(ke,J);});const oe=[];for(let q=0;q<B.length;q++){const J=B[q],ke=(o?(I-1)*o:0)+q,Me=b(J,ke);oe.push(Me);let me=Q.get(Me);me||(me=Dl(J,ke),_&&Tr(me).forEach(Gt=>{Gt.style.transform="translateY(6px)",Gt.style.opacity="0";})),X.appendChild(me);}const se=[];if(Q.forEach((q,J)=>{oe.includes(J)||se.push(q);}),!_){se.forEach(q=>q.remove()),Te(),Cr();return}oe.forEach(q=>{const J=X.querySelector(`.lg-tr-body[data-id="${q}"]`);if(!J)return;const ke=di(J),Me=H.get(q),me=Tr(J);if(Me&&ke){const Ue=Me.left-ke.left,kt=Me.top-ke.top;me.forEach(tt=>{tt.style.transition="none",tt.style.transform=`translate(${Ue}px, ${kt}px)`,tt.style.opacity="1";}),ci(J)?.getBoundingClientRect(),me.forEach(tt=>{tt.style.willChange="transform, opacity",tt.style.transition="transform .18s ease, opacity .18s ease";}),requestAnimationFrame(()=>{me.forEach(tt=>{tt.style.transform="translate(0,0)";});});}else me.forEach(Ue=>{Ue.style.transition="transform .18s ease, opacity .18s ease";}),requestAnimationFrame(()=>{me.forEach(Ue=>{Ue.style.transform="translate(0,0)",Ue.style.opacity="1";});});const Ir=Ue=>{(Ue.propertyName==="transform"||Ue.propertyName==="opacity")&&(me.forEach(kt=>{kt.style.willChange="",kt.style.transition="",kt.style.transform="",kt.style.opacity="";}),Ue.currentTarget.removeEventListener("transitionend",Ir));},Gt=me[0];Gt&&Gt.addEventListener("transitionend",Ir);}),se.forEach(q=>{const J=Tr(q);J.forEach(me=>{me.style.willChange="transform, opacity",me.style.transition="transform .18s ease, opacity .18s ease",me.style.opacity="0",me.style.transform="translateY(-6px)";});const ke=me=>{me.propertyName==="opacity"&&(me.currentTarget.removeEventListener("transitionend",ke),q.remove());},Me=J[0];Me?Me.addEventListener("transitionend",ke):q.remove();}),Te(),Cr();}function Dl(B,H){const Q=b(B,H),oe=w("div",{className:"lg-tr lg-tr-body","data-id":Q});if(d){const se=w("div",{className:"lg-td lg-td-check"});if(p==="switch"){const q=Eo({size:"sm",checked:R.has(Q),onChange:J=>{J?R.add(Q):R.delete(Q),Te(),S?.(G());}});fe.set(Q,q),se.appendChild(q.root);}else {const q=w("input",{type:"checkbox",className:"lg-row-check"});q.checked=R.has(Q),q.addEventListener("change",J=>{J.stopPropagation(),q.checked?R.add(Q):R.delete(Q),Te(),S?.(G());}),q.addEventListener("click",J=>J.stopPropagation()),se.appendChild(q);}oe.appendChild(se);}return y.forEach(se=>{const q=w("div",{className:"lg-td"});se.align&&q.style.setProperty("--col-justify",F(se.align));let J=se.render?se.render(B,H):String(B[se.key]??"");typeof J=="string"?q.textContent=J:q.appendChild(J),oe.appendChild(q);}),(v||d&&f)&&(oe.classList.add("clickable"),oe.addEventListener("click",se=>{if(!se.target.closest(".lg-td-check")){if(d&&f){const q=!R.has(Q);if(q?R.add(Q):R.delete(Q),Te(),p==="switch"){const J=fe.get(Q);J&&J.setChecked(q,true);}else {const J=oe.querySelector(".lg-row-check");J&&(J.checked=q);}S?.(G());}v?.(B,H,se);}})),oe}function ui(){if(ue.replaceChildren(),!o)return;const B=O(),H=w("div",{className:"lg-pager"}),Q=w("button",{className:"btn",type:"button"},"←"),oe=w("button",{className:"btn",type:"button"},"→"),se=w("span",{className:"lg-pager-info"},`${I} / ${B}`);Q.disabled=I<=1,oe.disabled=I>=B,Q.addEventListener("click",()=>xn(I-1)),oe.addEventListener("click",()=>xn(I+1)),H.append(Q,se,oe),ue.appendChild(H);}function xn(B){const H=O();I=Math.min(Math.max(1,B),H),zt(),ui();}function wn(){$(),$l(),zt(),ui();}function Fl(B){h=B.slice(),C=B.slice(),k&&T&&P(),xn(1);}function zl(B){y=B.slice(),wn();}function Gl(B,H="asc"){k=B,T=B?H:null,k&&T?P():C=h.slice(),wn();}function jl(){try{Ar.disconnect();}catch{}window.removeEventListener("resize",li);}return ee.append(z,X,ue),D.appendChild(ee),window.addEventListener("resize",li),wn(),{root:D,setData:Fl,setColumns:zl,sortBy:Gl,getSelection:G,setSelection:wt,clearSelection:re,setPage:xn,getState:()=>({page:I,pageCount:O(),sortKey:k,sortDir:T}),destroy:jl}}let Zn=false;const Kt=new Set;function Yc(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}const Ne=e=>{const t=Yc();if(t){for(const n of Kt)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function qc(){Zn||(Zn=true,window.addEventListener("keydown",Ne,true),window.addEventListener("keypress",Ne,true),window.addEventListener("keyup",Ne,true),document.addEventListener("keydown",Ne,true),document.addEventListener("keypress",Ne,true),document.addEventListener("keyup",Ne,true));}function Xc(){Zn&&(Zn=false,window.removeEventListener("keydown",Ne,true),window.removeEventListener("keypress",Ne,true),window.removeEventListener("keyup",Ne,true),document.removeEventListener("keydown",Ne,true),document.removeEventListener("keypress",Ne,true),document.removeEventListener("keyup",Ne,true));}function Jc(e){return Kt.size===0&&qc(),Kt.add(e),()=>{Kt.delete(e),Kt.size===0&&Xc();}}function Tn(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function Qc(){const e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.display="none",t.style.flexShrink="0";const n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");const r=document.createElementNS(e,"animate");r.setAttribute("attributeName","stroke-dasharray"),r.setAttribute("values","1,150;90,150;90,150"),r.setAttribute("dur","1.5s"),r.setAttribute("repeatCount","indefinite");const o=document.createElementNS(e,"animateTransform");return o.setAttribute("attributeName","transform"),o.setAttribute("attributeType","XML"),o.setAttribute("type","rotate"),o.setAttribute("from","0 12 12"),o.setAttribute("to","360 12 12"),o.setAttribute("dur","1s"),o.setAttribute("repeatCount","indefinite"),n.append(r,o),t.appendChild(n),t}function Ea(e={}){const{id:t,placeholder:n="Rechercher…",value:r="",size:o="md",disabled:i=false,autoFocus:a=false,onChange:s,onSearch:c,autoSearch:u=false,debounceMs:l=0,focusKey:d="/",iconLeft:p,iconRight:f,withClear:g=true,clearTitle:m="Effacer",ariaLabel:b,submitLabel:x,loading:S=false,blockGameKeys:v=true}=e,y=w("div",{className:"search"+(o?` search--${o}`:""),id:t}),C=w("span",{className:"search-ico search-ico--left"});if(p){const re=Tn(p);re&&C.appendChild(re);}else C.textContent="🔎",C.style.opacity=".9";const h=w("input",{className:"input search-input",type:"text",placeholder:n,value:r,"aria-label":b||n}),k=w("span",{className:"search-ico search-ico--right"});if(f){const re=Tn(f);re&&k.appendChild(re);}const T=Qc();T.classList.add("search-spinner");const I=g?w("button",{className:"search-clear",type:"button",title:m},"×"):null,L=x!=null?w("button",{className:"btn search-submit",type:"button"},x):null,_=w("div",{className:"search-field"},C,h,k,T,...I?[I]:[]);y.append(_,...L?[L]:[]);let D=!!i,ee=null;function z(re){T.style.display=re?"inline-block":"none",y.classList.toggle("is-loading",re);}function X(){ee!=null&&(window.clearTimeout(ee),ee=null);}function ue(re){X(),l>0?ee=window.setTimeout(()=>{ee=null,re();},l):re();}function j(){s?.(h.value),u&&c&&c(h.value);}h.addEventListener("input",()=>{ue(j);}),h.addEventListener("keydown",re=>{re.key==="Enter"?(re.preventDefault(),X(),c?.(h.value)):re.key==="Escape"&&(h.value.length>0?O("",{notify:true}):h.blur());}),I&&I.addEventListener("click",()=>O("",{notify:true})),L&&L.addEventListener("click",()=>c?.(h.value));let F=()=>{};if(v&&(F=Jc(h)),d){const re=pe=>{if(pe.key===d&&!pe.ctrlKey&&!pe.metaKey&&!pe.altKey){const Te=document.activeElement;Te&&(Te.tagName==="INPUT"||Te.tagName==="TEXTAREA"||Te.isContentEditable)||(pe.preventDefault(),h.focus());}};window.addEventListener("keydown",re,true),y.__cleanup=()=>{window.removeEventListener("keydown",re,true),F();};}else y.__cleanup=()=>{F();};function $(re){D=!!re,h.disabled=D,I&&(I.disabled=D),L&&(L.disabled=D),y.classList.toggle("disabled",D);}function O(re,pe={}){const Te=h.value;h.value=re??"",pe.notify&&Te!==re&&ue(j);}function N(){return h.value}function P(){h.focus();}function R(){h.blur();}function G(re){h.placeholder=re;}function fe(re){O("",re);}return $(D),z(S),a&&P(),{root:y,input:h,getValue:N,setValue:O,focus:P,blur:R,setDisabled:$,setPlaceholder:G,clear:fe,setLoading:z,setIconLeft(re){C.replaceChildren();const pe=Tn(re??"🔎");pe&&C.appendChild(pe);},setIconRight(re){k.replaceChildren();const pe=Tn(re??"");pe&&k.appendChild(pe);}}}function Zc(e){const t=String(e??"").trim().toLowerCase();return t?t==="common"?"Common":t==="uncommon"?"Uncommon":t==="rare"?"Rare":t==="legendary"?"Legendary":t==="mythical"?"Mythical":t==="divine"?"Divine":t==="celestial"?"Celestial":t==="unknown"||t==="unknow"?"Unknown":null:null}function ed(e){return e.toLowerCase()}function Ma(e={}){const{id:t,label:n="",type:r="neutral",tone:o="soft",border:i,withBorder:a,pill:s=true,size:c="md",onClick:u,variant:l="default",rarity:d=null}=e,p=w("span",{className:"badge",id:t});s&&p.classList.add("badge--pill"),c==="sm"?p.classList.add("badge--sm"):c==="lg"?p.classList.add("badge--lg"):p.classList.add("badge--md"),u&&p.addEventListener("click",u);let f=false,g=a;function m(){f||(g===false?p.style.border="none":p.style.border="");}function b(h,k=o){p.classList.remove("badge--neutral","badge--info","badge--success","badge--warning","badge--danger","badge--soft","badge--outline","badge--solid"),p.classList.add(`badge--${h}`,`badge--${k}`),m();}function x(h){const k=(h??"").trim();k?(p.style.border=k,f=true):(f=false,m());}function S(h){g=h,m();}function v(h){p.textContent=h;}function y(h,k=o){b(h,k);}function C(h){p.classList.remove("badge--rarity","badge--rarity-common","badge--rarity-uncommon","badge--rarity-rare","badge--rarity-legendary","badge--rarity-mythical","badge--rarity-divine","badge--rarity-celestial","badge--rarity-unknown"),p.style.background="",p.style.backgroundSize="",p.style.animation="",p.style.color="",p.style.webkitTextStroke="";const k=Zc(h);if(!k){p.textContent=String(h??"—");return}p.textContent=k,p.classList.add("badge--rarity",`badge--rarity-${ed(k)}`);}return l==="rarity"?C(d):(p.textContent=n,b(r,o),typeof a=="boolean"&&S(a),i&&x(i)),{root:p,setLabel:v,setType:y,setBorder:x,setWithBorder:S,setRarity:C}}function td(){return {ready:false,app:null,renderer:null,ctors:null,baseUrl:null,textures:new Map,animations:new Map,live:new Set,defaultParent:null,overlay:null,categoryIndex:null}}function nd(){return {lru:new Map,cost:0,srcCanvas:new Map}}function rd(){return {cache:new Map,maxEntries:200}}const od={enabled:true,maxEntries:200,maxCost:800,srcCanvasMax:100},id={enabled:true,maxEntries:200},xe=td(),ad=nd(),sd={...od},ld=rd(),cd={...id};function Ce(){return xe}function _t(){return ad}function ln(){return sd}function cn(){return ld}function Qr(){return cd}function _a(){return xe.ready}const dr=e=>new Promise(t=>setTimeout(t,e)),Be=e=>{try{return e()}catch{return}},Ve=(e,t,n)=>Math.max(t,Math.min(n,e)),dd=e=>Ve(e,0,1);async function mi(e,t,n){const r=performance.now();for(;performance.now()-r<t;){const o=await Promise.race([e,dr(50).then(()=>null)]);if(o!==null)return o}throw new Error(`${n} timeout`)}const hi=Function.prototype.bind,ie={_bindPatched:false,engine:null,tos:null,app:null,renderer:null,ticker:null,stage:null};let La,Ra,Oa;const ud=new Promise(e=>{La=e;}),pd=new Promise(e=>{Ra=e;}),fd=new Promise(e=>{Oa=e;});function gd(e){return !!(e&&typeof e=="object"&&typeof e.start=="function"&&typeof e.destroy=="function"&&e.app&&e.app.stage&&e.app.renderer&&e.systems&&typeof e.systems.values=="function")}function md(e){try{for(const t of e.systems.values()){const n=t?.system;if(n?.name==="tileObject")return n}}catch{}return null}function hd(e){ie.engine=e,ie.tos=md(e)||null,ie.app=e.app||null,ie.renderer=e.app?.renderer||null,ie.ticker=e.app?.ticker||null,ie.stage=e.app?.stage||null;try{La(e);}catch{}try{ie.app&&Ra(ie.app);}catch{}try{ie.renderer&&Oa(ie.renderer);}catch{}}function Mo(){return ie.engine?true:(ie._bindPatched||(ie._bindPatched=true,Function.prototype.bind=function(e,...t){const n=hi.call(this,e,...t);try{!ie.engine&&gd(e)&&(Function.prototype.bind=hi,ie._bindPatched=!1,hd(e));}catch{}return n}),false)}Mo();async function bd(e=15e3){const t=performance.now();for(;performance.now()-t<e;){if(ie.engine)return  true;Mo(),await dr(50);}throw new Error("MGPixiHooks: engine capture timeout")}async function yd(e=15e3){return ie.engine||await bd(e),true}function vd(){return ie.engine&&ie.app?{ok:true,engine:ie.engine,tos:ie.tos,app:ie.app}:(Mo(),{ok:false,engine:ie.engine,tos:ie.tos,app:ie.app,note:"Not captured. Wait for room, or reload."})}const $e={engineReady:ud,appReady:pd,rendererReady:fd,engine:()=>ie.engine,tos:()=>ie.tos,app:()=>ie.app,renderer:()=>ie.renderer,ticker:()=>ie.ticker,stage:()=>ie.stage,PIXI:()=>M.PIXI||null,init:yd,hook:vd,ready:()=>!!ie.engine},xd=M?.location?.origin||"https://magicgarden.gg";function Na(){return typeof GM_xmlhttpRequest=="function"}function $a(e,t="text"){return new Promise((n,r)=>{GM_xmlhttpRequest({method:"GET",url:e,responseType:t,onload:o=>o.status>=200&&o.status<300?n(o):r(new Error(`HTTP ${o.status} for ${e}`)),onerror:()=>r(new Error(`Network error for ${e}`)),ontimeout:()=>r(new Error(`Timeout for ${e}`))});})}async function _o(e){if(Na())return JSON.parse((await $a(e,"text")).responseText);const t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.json()}async function Da(e){if(Na())return (await $a(e,"blob")).response;const t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.blob()}function wd(e){return new Promise((t,n)=>{const r=URL.createObjectURL(e),o=M?.Image||Image,i=new o;i.decoding="async",i.onload=()=>{URL.revokeObjectURL(r),t(i);},i.onerror=()=>{URL.revokeObjectURL(r),n(new Error("Image decode failed"));},i.src=r;})}const Xe=(e,t)=>e.replace(/\/?$/,"/")+String(t||"").replace(/^\//,""),kd=e=>e.lastIndexOf("/")>=0?e.slice(0,e.lastIndexOf("/")+1):"",bi=(e,t)=>String(t||"").startsWith("/")?String(t).slice(1):kd(e)+String(t||"");let Lo=null;function Fa(){return Lo}function Sd(e){Lo=e;}function za(){return Lo!==null}const Cd=/\/(?:r\/\d+\/)?version\/([^/]+)/,Ad=15e3,Td=50;function Id(){return M?.document??(typeof document<"u"?document:null)}function Ro(e={}){if(za())return;const t=e.doc??Id();if(!t)return;const n=t.scripts;for(let r=0;r<n.length;r++){const i=n.item(r)?.src;if(!i)continue;const a=i.match(Cd);if(a?.[1]){Sd(a[1]);return}}}function Pd(){return Ro(),Fa()}function Ed(){return za()}async function Md(e={}){const t=e.timeoutMs??Ad,n=performance.now();for(;performance.now()-n<t;){Ro();const r=Fa();if(r)return r;await dr(Td);}throw new Error("MGVersion timeout (gameVersion not found)")}const Oo={init:Ro,isReady:Ed,get:Pd,wait:Md};let No=null,Ga=null;function _d(){return No}function Ld(){return Ga}function Rd(e){No=e;}function Od(e){Ga=e;}function ja(){return No!==null}const Nd=15e3;async function $d(e={}){ja()||await $o(e);}async function $o(e={}){const t=_d();if(t)return t;const n=Ld();if(n)return n;const r=(async()=>{const o=e.gameVersion??await Oo.wait({timeoutMs:Nd}),i=`${xd}/version/${o}/assets/`;return Rd(i),i})();return Od(r),r}async function Dd(e){const t=await $o();return Xe(t,e)}function Fd(){return ja()}const bt={init:$d,isReady:Fd,base:$o,url:Dd};function er(e){const t=String(e||"").trim();return t?t.startsWith("sprite/")||t.startsWith("sprites/")?t:t.includes("/")?`sprite/${t}`:t:""}function gn(e,t){const n=String(e||"").trim().replace(/^sprites?\//,"").replace(/^\/+|\/+$/g,""),r=String(t||"").trim();return r.includes("/")||!n?er(r):`sprite/${n}/${r}`}function dn(e,t,n,r){const o=gn(e,t);if(n.has(o)||r.has(o))return o;const i=String(t||"").trim();if(n.has(i)||r.has(i))return i;const a=er(i);return n.has(a)||r.has(a)?a:o}function zd(e,t,n=25e3){const r=[e],o=new Set;let i=0;for(;r.length&&i++<n;){const a=r.pop();if(!a||o.has(a))continue;if(o.add(a),t(a))return a;const s=a.children;if(Array.isArray(s))for(let c=s.length-1;c>=0;c--)r.push(s[c]);}return null}function Gd(e){const t=M.PIXI;if(t?.Texture&&t?.Sprite&&t?.Container&&t?.Rectangle)return {Container:t.Container,Sprite:t.Sprite,Texture:t.Texture,Rectangle:t.Rectangle,AnimatedSprite:t.AnimatedSprite||null};const n=e?.stage,r=zd(n,o=>o?.texture?.frame&&o?.constructor&&o?.texture?.constructor&&o?.texture?.frame?.constructor);if(!r)throw new Error("No Sprite found yet (constructors).");return {Container:n.constructor,Sprite:r.constructor,Texture:r.texture.constructor,Rectangle:r.texture.frame.constructor,AnimatedSprite:t?.AnimatedSprite||null}}async function jd(e,t=15e3){const n=performance.now();for(;performance.now()-n<t;)try{return Gd(e)}catch{await dr(50);}throw new Error("Constructors timeout")}const it=(...e)=>{try{console.log("[MGSprite]",...e);}catch{}},Ba=new Map;function Bd(e){return Ba.get(e)}function Wd(e,t){Ba.set(e,t);}const Wa="manifest.json";let Zr=null;async function Hd(){Zr||(Zr=await Ha());}function Ud(){return Zr!==null}async function Ha(e={}){const t=e.baseUrl??await bt.base(),n=Bd(t);if(n)return n;const r=_o(Xe(t,Wa));return Wd(t,r),r}function Vd(e,t){return e.bundles.find(n=>n.name===t)??null}function Kd(e){if(!e)return [];const t=new Set;for(const n of e.assets)for(const r of n.src??[])typeof r=="string"&&r.endsWith(".json")&&r!==Wa&&t.add(r);return Array.from(t)}const Je={init:Hd,isReady:Ud,load:Ha,getBundle:Vd,listJsonFromBundle:Kd};function Yd(e){return e&&typeof e=="object"&&e.frames&&e.meta&&typeof e.meta.image=="string"}function Pr(e,t,n,r,o){return new e(t,n,r,o)}function qd(e,t,n,r,o,i,a){let s;try{s=new e({source:t.source,frame:n,orig:r,trim:o||void 0,rotate:i||0});}catch{s=new e(t.baseTexture||t,n,r,o||void 0,i||0);}if(a)if(s.defaultAnchor?.set)try{s.defaultAnchor.set(a.x,a.y);}catch{}else s.defaultAnchor?(s.defaultAnchor.x=a.x,s.defaultAnchor.y=a.y):s.defaultAnchor={x:a.x,y:a.y};try{s.updateUvs?.();}catch{}return s}function Xd(e,t,n,r){const{Texture:o,Rectangle:i}=r;for(const[a,s]of Object.entries(e.frames)){const c=s.frame,u=!!s.rotated,l=u?2:0,d=u?c.h:c.w,p=u?c.w:c.h,f=Pr(i,c.x,c.y,d,p),g=s.sourceSize||{w:c.w,h:c.h},m=Pr(i,0,0,g.w,g.h);let b=null;if(s.trimmed&&s.spriteSourceSize){const x=s.spriteSourceSize;b=Pr(i,x.x,x.y,x.w,x.h);}n.set(a,qd(o,t,f,m,b,l,s.anchor||null));}}function Jd(e,t,n){if(!(!e.animations||typeof e.animations!="object"))for(const[r,o]of Object.entries(e.animations)){if(!Array.isArray(o))continue;const i=o.map(a=>t.get(a)).filter(Boolean);i.length>=2&&n.set(r,i);}}function Qd(e,t){const n=(r,o)=>{const i=String(r||"").trim(),a=String(o||"").trim();!i||!a||(t.has(i)||t.set(i,new Set),t.get(i).add(a));};for(const r of Object.keys(e.frames||{})){const o=/^sprite\/([^/]+)\/(.+)$/.exec(r);o&&n(o[1],o[2]);}}async function Zd(e,t){const n=await Je.load(e),r=Je.getBundle(n,"default");if(!r)throw new Error("No default bundle in manifest");const o=Je.listJsonFromBundle(r),i=new Set,a=new Map,s=new Map,c=new Map;async function u(l){if(i.has(l))return;i.add(l);const d=await _o(Xe(e,l));if(!Yd(d))return;const p=d.meta?.related_multi_packs;if(Array.isArray(p))for(const b of p)await u(bi(l,b));const f=bi(l,d.meta.image),g=await wd(await Da(Xe(e,f))),m=t.Texture.from(g);Xd(d,m,a,t),Jd(d,a,s),Qd(d,c);}for(const l of o)await u(l);return {textures:a,animations:s,categoryIndex:c}}let In=null;async function eu(){return xe.ready?true:In||(In=(async()=>{const e=performance.now();it("init start");const t=await mi($e.appReady,15e3,"PIXI app");it("app ready");const n=await mi($e.rendererReady,15e3,"PIXI renderer");it("renderer ready"),xe.app=t,xe.renderer=n||t?.renderer||null,xe.ctors=await jd(t),it("constructors resolved"),xe.baseUrl=await bt.base(),it("base url",xe.baseUrl);const{textures:r,animations:o,categoryIndex:i}=await Zd(xe.baseUrl,xe.ctors);return xe.textures=r,xe.animations=o,xe.categoryIndex=i,it("atlases loaded","textures",xe.textures.size,"animations",xe.animations.size,"categories",xe.categoryIndex?.size??0),xe.ready=true,it("ready in",Math.round(performance.now()-e),"ms"),true})(),In)}const Lt={Gold:{overlayTall:null,tallIconOverride:null},Rainbow:{overlayTall:null,tallIconOverride:null,angle:130,angleTall:0},Wet:{overlayTall:"sprite/mutation-overlay/WetTallPlant",tallIconOverride:"sprite/mutation/Puddle"},Chilled:{overlayTall:"sprite/mutation-overlay/ChilledTallPlant",tallIconOverride:null},Frozen:{overlayTall:"sprite/mutation-overlay/FrozenTallPlant",tallIconOverride:null},Dawnlit:{overlayTall:null,tallIconOverride:null},Ambershine:{overlayTall:null,tallIconOverride:null},Dawncharged:{overlayTall:null,tallIconOverride:null},Ambercharged:{overlayTall:null,tallIconOverride:null}},Ua=Object.keys(Lt),tu=["Gold","Rainbow","Wet","Chilled","Frozen","Ambershine","Dawnlit","Dawncharged","Ambercharged"],yi=new Map(tu.map((e,t)=>[e,t]));function tr(e){return [...new Set(e.filter(Boolean))].sort((n,r)=>(yi.get(n)??1/0)-(yi.get(r)??1/0))}const nu=["Wet","Chilled","Frozen"],ru=new Set(["Dawnlit","Ambershine","Dawncharged","Ambercharged"]),ou={Banana:.6,Carrot:.6,Sunflower:.5,Starweaver:.5,FavaBean:.25,BurrosTail:.2},iu={Pepper:.5,Banana:.6},au=256,su=.5,lu=2;function Va(e){if(!e.length)return {muts:[],overlayMuts:[],selectedMuts:[],sig:""};const t=tr(e),n=cu(e),r=du(e);return {muts:n,overlayMuts:r,selectedMuts:t,sig:`${t.join(",")}|${n.join(",")}|${r.join(",")}`}}function cu(e){const t=e.filter((o,i,a)=>Lt[o]&&a.indexOf(o)===i);if(!t.length)return [];if(t.includes("Gold"))return ["Gold"];if(t.includes("Rainbow"))return ["Rainbow"];const n=["Ambershine","Dawnlit","Dawncharged","Ambercharged"];return t.some(o=>n.includes(o))?tr(t.filter(o=>!nu.includes(o))):tr(t)}function du(e){const t=e.filter((n,r,o)=>Lt[n]?.overlayTall&&o.indexOf(n)===r);return tr(t)}function Er(e,t){return e.map(n=>({name:n,meta:Lt[n],overlayTall:Lt[n]?.overlayTall??null,isTall:t}))}const uu={Gold:{op:"source-atop",colors:["rgb(235,200,0)"],a:.7},Rainbow:{op:"color",colors:["#FF1744","#FF9100","#FFEA00","#00E676","#2979FF","#D500F9"],ang:130,angTall:0,masked:true},Wet:{op:"source-atop",colors:["rgb(50,180,200)"],a:.25},Chilled:{op:"source-atop",colors:["rgb(100,160,210)"],a:.45},Frozen:{op:"source-atop",colors:["rgb(100,130,220)"],a:.5},Dawnlit:{op:"source-atop",colors:["rgb(209,70,231)"],a:.5},Ambershine:{op:"source-atop",colors:["rgb(190,100,40)"],a:.5},Dawncharged:{op:"source-atop",colors:["rgb(140,80,200)"],a:.5},Ambercharged:{op:"source-atop",colors:["rgb(170,60,25)"],a:.5}},Pn=(()=>{try{const t=document.createElement("canvas").getContext("2d");if(!t)return new Set;const n=["color","hue","saturation","luminosity","overlay","screen","lighter","source-atop"],r=new Set;for(const o of n)t.globalCompositeOperation=o,t.globalCompositeOperation===o&&r.add(o);return r}catch{return new Set}})();function pu(e){return Pn.has(e)?e:Pn.has("overlay")?"overlay":Pn.has("screen")?"screen":Pn.has("lighter")?"lighter":"source-atop"}function fu(e,t,n,r,o=false){const i=(r-90)*Math.PI/180,a=t/2,s=n/2;if(!o){const d=Math.min(t,n)/2;return e.createLinearGradient(a-Math.cos(i)*d,s-Math.sin(i)*d,a+Math.cos(i)*d,s+Math.sin(i)*d)}const c=Math.cos(i),u=Math.sin(i),l=Math.abs(c)*t/2+Math.abs(u)*n/2;return e.createLinearGradient(a-c*l,s-u*l,a+c*l,s+u*l)}function vi(e,t,n,r,o=false){const i=r.colors?.length?r.colors:["#fff"],a=r.ang!=null?fu(e,t,n,r.ang,o):e.createLinearGradient(0,0,0,n);i.length===1?(a.addColorStop(0,i[0]),a.addColorStop(1,i[0])):i.forEach((s,c)=>a.addColorStop(c/(i.length-1),s)),e.fillStyle=a,e.fillRect(0,0,t,n);}function gu(e,t,n,r){const o=uu[n];if(!o)return;const i={...o};n==="Rainbow"&&r&&i.angTall!=null&&(i.ang=i.angTall);const a=n==="Rainbow"&&r,s=t.width,c=t.height;e.save();const u=i.masked?pu(i.op):"source-in";if(e.globalCompositeOperation=u,i.a!=null&&(e.globalAlpha=i.a),i.masked){const l=document.createElement("canvas");l.width=s,l.height=c;const d=l.getContext("2d");d.imageSmoothingEnabled=false,vi(d,s,c,i,a),d.globalCompositeOperation="destination-in",d.drawImage(t,0,0),e.drawImage(l,0,0);}else vi(e,s,c,i,a);e.restore();}function mu(e){return /tallplant/i.test(e)}function Do(e){const t=String(e||"").split("/");return t[t.length-1]||""}function Ka(e){switch(e){case "Ambershine":return ["Ambershine","Amberlit"];case "Dawncharged":return ["Dawncharged","Dawnbound"];case "Ambercharged":return ["Ambercharged","Amberbound"];default:return [e]}}function hu(e,t){const n=String(e||"").toLowerCase();for(const r of t.keys()){const o=/sprite\/mutation-overlay\/([A-Za-z0-9]+)TallPlant/i.exec(String(r));if(!o||!o[1])continue;if(o[1].toLowerCase()===n){const a=t.get(r);if(a)return {tex:a,key:r}}}return null}function bu(e,t,n,r){if(!t)return null;const o=Do(e),i=Ka(t);for(const a of i){const s=[`sprite/mutation/${a}${o}`,`sprite/mutation/${a}-${o}`,`sprite/mutation/${a}_${o}`,`sprite/mutation/${a}/${o}`,`sprite/mutation/${a}`];for(const c of s){const u=n.get(c);if(u)return {tex:u,key:c}}{const c=`sprite/mutation-overlay/${a}TallPlant`,u=n.get(c);if(u)return {tex:u,key:c};const l=`sprite/mutation-overlay/${a}`,d=n.get(l);if(d)return {tex:d,key:l};const p=hu(t,n);if(p)return p}}return null}function yu(e,t,n,r){if(!t)return null;const o=Lt[t];if(n&&o?.tallIconOverride){const s=r.get(o.tallIconOverride);if(s)return s}const i=Do(e),a=Ka(t);for(const s of a){const c=[`sprite/mutation/${s}Icon`,`sprite/mutation/${s}`,`sprite/mutation/${s}${i}`,`sprite/mutation/${s}-${i}`,`sprite/mutation/${s}_${i}`,`sprite/mutation/${s}/${i}`];for(const u of c){const l=r.get(u);if(l)return l}if(n){const u=`sprite/mutation-overlay/${s}TallPlantIcon`,l=r.get(u);if(l)return l;const d=`sprite/mutation-overlay/${s}TallPlant`,p=r.get(d);if(p)return p}}return null}function vu(e,t,n){const r=e?.orig?.width??e?.frame?.width??e?.width??1,o=e?.orig?.height??e?.frame?.height??e?.height??1,i=e?.defaultAnchor?.x??0,a=e?.defaultAnchor?.y??0;let s=iu[t]??i;const c=o>r*1.5;let u=ou[t]??(c?a:.4);const l={x:(s-i)*r,y:(u-a)*o},d=Math.min(r,o),p=Math.min(1.5,d/au);let f=su*p;return n&&(f*=lu),{width:r,height:o,anchorX:i,anchorY:a,offset:l,iconScale:f}}function Ya(e,t){return `${t.sig}::${e}`}function qa(e){return e?e.isAnim?e.frames?.length||0:e.tex?1:0:0}function xu(e,t,n){e.lru.delete(t),e.lru.set(t,n);}function wu(e,t){if(t.enabled)for(;e.lru.size>t.maxEntries||e.cost>t.maxCost;){const n=e.lru.keys().next().value;if(n===void 0)break;const r=e.lru.get(n);e.lru.delete(n),e.cost=Math.max(0,e.cost-qa(r??null));}}function Xa(e,t){const n=e.lru.get(t);return n?(xu(e,t,n),n):null}function Ja(e,t,n,r){e.lru.set(t,n),e.cost+=qa(n),wu(e,r);}function ku(e){e.lru.clear(),e.cost=0,e.srcCanvas.clear();}function Su(e,t){return e.srcCanvas.get(t)??null}function Cu(e,t,n,r){if(e.srcCanvas.set(t,n),e.srcCanvas.size>r.srcCanvasMax){const o=e.srcCanvas.keys().next().value;o!==void 0&&e.srcCanvas.delete(o);}}function ur(e,t,n,r,o){const i=Su(r,e);if(i)return i;let a=null;const s=t?.resolution??1;try{if(t?.extract?.canvas){const c=new n.Sprite(e),u=t.extract.canvas(c);if(c.destroy?.({children:!0,texture:!1,baseTexture:!1}),s>1&&u){const l=Math.round(u.width/s),d=Math.round(u.height/s);a=document.createElement("canvas"),a.width=l,a.height=d;const p=a.getContext("2d");p&&(p.imageSmoothingEnabled=!1,p.drawImage(u,0,0,l,d));}else a=u;}}catch{}if(!a){const c=e?.frame||e?._frame,u=e?.orig||e?._orig,l=e?.trim||e?._trim,d=e?.rotate||e?._rotate||0,p=e?.baseTexture?.resource?.source||e?.baseTexture?.resource||e?.source?.resource?.source||e?.source?.resource||e?._source?.resource?.source||null;if(!c||!p)throw new Error("textureToCanvas fail");a=document.createElement("canvas");const f=Math.max(1,(u?.width??c.width)|0),g=Math.max(1,(u?.height??c.height)|0),m=l?.x??0,b=l?.y??0;a.width=f,a.height=g;const x=a.getContext("2d");x.imageSmoothingEnabled=false,d===true||d===2||d===8?(x.save(),x.translate(m+c.height/2,b+c.width/2),x.rotate(-Math.PI/2),x.drawImage(p,c.x,c.y,c.width,c.height,-c.width/2,-c.height/2,c.width,c.height),x.restore()):x.drawImage(p,c.x,c.y,c.width,c.height,m,b,c.width,c.height);}return Cu(r,e,a,o),a}function Au(e,t,n,r,o,i,a,s){const{w:c,h:u,aX:l,aY:d,basePos:p}=t,f=[];for(const g of n){const m=new r.Sprite(e);m.anchor?.set?.(l,d),m.position.set(p.x,p.y),m.zIndex=1;const b=document.createElement("canvas");b.width=c,b.height=u;const x=b.getContext("2d");x.imageSmoothingEnabled=false,x.save(),x.translate(c*l,u*d),x.drawImage(ur(e,o,r,i,a),-c*l,-u*d),x.restore(),gu(x,b,g.name,g.isTall);const S=r.Texture.from(b,{resolution:e.resolution??1});s.push(S),m.texture=S,f.push(m);}return f}function Tu(e,t,n,r,o,i,a,s,c,u){const{aX:l,basePos:d}=t,p=[];for(const f of n){const g=f.overlayTall&&r.get(f.overlayTall)&&{tex:r.get(f.overlayTall),key:f.overlayTall}||bu(e,f.name,r);if(!g?.tex)continue;const m=ur(g.tex,i,o,a,s);if(!m)continue;const b=m.width,x={x:0,y:0},S={x:d.x-l*b,y:0},v=document.createElement("canvas");v.width=b,v.height=m.height;const y=v.getContext("2d");if(!y)continue;y.imageSmoothingEnabled=false,y.drawImage(m,0,0),y.globalCompositeOperation="destination-in",y.drawImage(c,-S.x,-0);const C=o.Texture.from(v,{resolution:g.tex.resolution??1});u.push(C);const h=new o.Sprite(C);h.anchor?.set?.(x.x,x.y),h.position.set(S.x,S.y),h.scale.set(1),h.alpha=1,h.zIndex=3,p.push(h);}return p}function Iu(e,t,n,r,o,i){const{basePos:a}=t,s=[];for(const c of n){if(c.name==="Gold"||c.name==="Rainbow")continue;const u=yu(e,c.name,c.isTall,r);if(!u)continue;const l=new o.Sprite(u),d=u?.defaultAnchor?.x??.5,p=u?.defaultAnchor?.y??.5;l.anchor?.set?.(d,p),l.position.set(a.x+i.offset.x,a.y+i.offset.y),l.scale.set(i.iconScale),c.isTall&&(l.zIndex=-1),ru.has(c.name)&&(l.zIndex=10),l.zIndex||(l.zIndex=2),s.push(l);}return s}function Qa(e,t,n,r){try{if(!e||!r.renderer||!r.ctors?.Container||!r.ctors?.Sprite||!r.ctors?.Texture)return null;const{Container:o,Sprite:i,Texture:a}=r.ctors,s=e?.orig?.width??e?.frame?.width??e?.width??1,c=e?.orig?.height??e?.frame?.height??e?.height??1,u=e?.defaultAnchor?.x??.5,l=e?.defaultAnchor?.y??.5,d={x:s*u,y:c*l},p=ur(e,r.renderer,r.ctors,r.cacheState,r.cacheConfig),f=new o;f.sortableChildren=!0;const g=new i(e);g.anchor?.set?.(u,l),g.position.set(d.x,d.y),g.zIndex=0,f.addChild(g);const m=mu(t),b=Er(n.muts,m),x=Er(n.overlayMuts,m),S=Er(n.selectedMuts,m),v=[],y={w:s,h:c,aX:u,aY:l,basePos:d},C=Do(t),h=vu(e,C,m);Au(e,y,b,r.ctors,r.renderer,r.cacheState,r.cacheConfig,v).forEach(z=>f.addChild(z)),m&&Tu(t,y,x,r.textures,r.ctors,r.renderer,r.cacheState,r.cacheConfig,p,v).forEach(X=>f.addChild(X)),Iu(t,y,S,r.textures,r.ctors,h).forEach(z=>f.addChild(z));let I={x:0,y:0,width:s,height:c};try{const z=f.getLocalBounds?.()||f.getBounds?.(!0);z&&Number.isFinite(z.width)&&Number.isFinite(z.height)&&(I={x:z.x,y:z.y,width:z.width,height:z.height});}catch{}const{Rectangle:L}=r.ctors,_=L?new L(0,0,s,c):void 0;let D=null;if(typeof r.renderer.generateTexture=="function"?D=r.renderer.generateTexture(f,{resolution:1,region:_}):r.renderer.textureGenerator?.generateTexture&&(D=r.renderer.textureGenerator.generateTexture({target:f,resolution:1,region:_})),!D)throw new Error("no render texture");const ee=D instanceof a?D:a.from(r.renderer.extract.canvas(D));try{ee.__mg_base={baseX:-I.x,baseY:-I.y,baseW:s,baseH:c,texW:I.width,texH:I.height};}catch{}D&&D!==ee&&D.destroy?.(!0),f.destroy({children:!0,texture:!1,baseTexture:!1});try{ee.__mg_gen=!0,ee.label=`${t}|${n.sig}`;}catch{}return ee}catch{return null}}function Pu(e,t,n,r){if(!e||e.length<2)return null;const o=[];for(const i of e){const a=Qa(i,t,n,r);a&&o.push(a);}return o.length>=2?o:null}function Za(e,t,n,r,o){const i=t.scale??1,a=t.frameIndex??0,s=t.mutations?.slice().sort().join(",")||"",c=t.anchorX??.5,u=t.anchorY??.5;return `${e}|s${i}|f${a}|m${s}|ax${c}|ay${u}|bm${n}|bp${o}|p${r}`}function Eu(e,t){const n=e.cache.get(t);return n?(n.lastAccess=performance.now(),n.canvas):null}function Mu(e,t,n,r){if(t.enabled){if(e.cache.size>=t.maxEntries){let o=null,i=1/0;for(const[a,s]of e.cache)s.lastAccess<i&&(i=s.lastAccess,o=a);o&&e.cache.delete(o);}e.cache.set(n,{canvas:r,lastAccess:performance.now()});}}function xi(e){const t=document.createElement("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");return n&&n.drawImage(e,0,0),t}function _u(e){e.cache.clear();}function Lu(e){return {size:e.cache.size,maxEntries:e.maxEntries}}function Ru(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0);})}async function Ou(e,t,n,r,o,i,a,s=5,c=0){if(!t.ready||!i.enabled)return 0;const u=e.length;let l=0;a?.(0,u);for(let d=0;d<u;d+=s){const p=e.slice(d,d+s);for(const f of p)try{const g=dn(null,f,t.textures,t.animations),m={scale:1},b=ts(m),x=ns(b,m),S=os(b,m.boundsPadding),v=Za(g,m,b,x,S);o.cache.has(v)||eo(t,n,r,null,f,m,o,i),l++;}catch{l++;}a?.(l,u),d+s<u&&await Ru();}return l}function Nu(e){if(e.overlay)return e.overlay;const t=new e.ctors.Container;t.sortableChildren=true,t.zIndex=99999999;try{e.app.stage.sortableChildren=!0;}catch{}return e.app.stage.addChild(t),e.overlay=t,t}function $u(e){const t=e.defaultParent;if(!t)return null;try{return typeof t=="function"?t():t}catch{return null}}function Fo(e,t,n,r,o,i){if(!n.length)return t;const a=Va(n);if(!a.sig)return t;const s=Ya(e,a),c=Xa(o,s);if(c?.tex)return c.tex;const u=Qa(t,e,a,{renderer:r.renderer,ctors:r.ctors,textures:r.textures,cacheState:o,cacheConfig:i});return u?(Ja(o,s,{isAnim:false,tex:u},i),u):t}function es(e,t,n,r,o,i){if(!n.length)return t;const a=Va(n);if(!a.sig)return t;const s=Ya(e,a),c=Xa(o,s);if(c?.isAnim&&c.frames?.length)return c.frames;const u=Pu(t,e,a,{renderer:r.renderer,ctors:r.ctors,textures:r.textures,cacheState:o,cacheConfig:i});return u?(Ja(o,s,{isAnim:true,frames:u},i),u):t}function wi(e,t,n,r,o,i={}){if(!e.ready)throw new Error("MGSprite not ready yet");const a=dn(r,o,e.textures,e.animations),s=i.mutations||[],c=i.parent||$u(e)||Nu(e),u=e.renderer?.width||e.renderer?.view?.width||innerWidth,l=e.renderer?.height||e.renderer?.view?.height||innerHeight,d=i.center?u/2:i.x??u/2,p=i.center?l/2:i.y??l/2;let f;const g=e.animations.get(a);if(g&&g.length>=2){const x=es(a,g,s,e,t,n),S=e.ctors.AnimatedSprite;if(S)f=new S(x),f.animationSpeed=i.fps?i.fps/60:i.speed??.15,f.loop=i.loop??true,f.play();else {const v=new e.ctors.Sprite(x[0]),C=1e3/Math.max(1,i.fps||8);let h=0,k=0;const T=I=>{const L=e.app.ticker?.deltaMS??I*16.666666666666668;if(h+=L,h<C)return;const _=h/C|0;h%=C,k=(k+_)%x.length,v.texture=x[k];};v.__mgTick=T,e.app.ticker?.add?.(T),f=v;}}else {const x=e.textures.get(a);if(!x)throw new Error(`Unknown sprite/anim key: ${a}`);const S=Fo(a,x,s,e,t,n);f=new e.ctors.Sprite(S);}const m=i.anchorX??f.texture?.defaultAnchor?.x??.5,b=i.anchorY??f.texture?.defaultAnchor?.y??.5;return f.anchor?.set?.(m,b),f.position.set(d,p),f.scale.set(i.scale??1),f.alpha=i.alpha??1,f.rotation=i.rotation??0,f.zIndex=i.zIndex??999999,c.addChild(f),e.live.add(f),f.__mgDestroy=()=>{try{f.__mgTick&&e.app.ticker?.remove?.(f.__mgTick);}catch{}try{f.destroy?.({children:!0,texture:!1,baseTexture:!1});}catch{try{f.destroy?.();}catch{}}e.live.delete(f);},f}function Du(e,t){const n=e.renderer;if(n?.extract?.canvas)return n.extract.canvas(t);if(n?.plugins?.extract?.canvas)return n.plugins.extract.canvas(t);throw new Error("No extract.canvas available on renderer")}const ki=new Map;function ts(e){return e.boundsMode?e.boundsMode:e.mutations&&e.mutations.length>0?"base":"mutations"}function ns(e,t){return e==="mutations"?t.pad??2:t.pad??0}function jt(e){return Number.isFinite(e)?Math.max(0,e):0}function rs(e){if(typeof e=="number"){const t=jt(e);return {top:t,right:t,bottom:t,left:t}}return e?{top:jt(e.top??0),right:jt(e.right??0),bottom:jt(e.bottom??0),left:jt(e.left??0)}:{top:0,right:0,bottom:0,left:0}}function os(e,t){if(e==="mutations")return "0,0,0,0";if(e==="padded"&&t==null)return "auto";const n=rs(t);return `${n.top},${n.right},${n.bottom},${n.left}`}function is(e){const t=e?.orig?.width??e?.frame?.width??e?.width??1,n=e?.orig?.height??e?.frame?.height??e?.height??1;return {w:t,h:n}}function as(e,t,n){const r=e?.__mg_base;return r&&Number.isFinite(r.baseX)&&Number.isFinite(r.baseY)&&Number.isFinite(r.baseW)&&Number.isFinite(r.baseH)&&Number.isFinite(r.texW)&&Number.isFinite(r.texH)?r:{baseX:0,baseY:0,baseW:t,baseH:n,texW:t,texH:n}}function Fu(e,t,n,r,o,i){const a=`${e}|f${t}`,s=ki.get(a);if(s)return s;const c=is(n),u={top:0,right:0,bottom:0,left:0};for(const l of Ua){const d=Fo(e,n,[l],r,o,i),p=as(d,c.w,c.h),f=Math.max(0,p.baseX),g=Math.max(0,p.baseY),m=Math.max(0,p.texW-p.baseX-p.baseW),b=Math.max(0,p.texH-p.baseY-p.baseH);f>u.left&&(u.left=f),g>u.top&&(u.top=g),m>u.right&&(u.right=m),b>u.bottom&&(u.bottom=b);}return ki.set(a,u),u}function eo(e,t,n,r,o,i={},a,s){if(!e.ready)throw new Error("MGSprite not ready yet");const c=dn(r,o,e.textures,e.animations),u=ts(i),l=ns(u,i),d=os(u,i.boundsPadding),p=a&&s?.enabled?Za(c,i,u,l,d):null;if(p&&a&&s?.enabled){const v=Eu(a,p);if(v)return xi(v)}const f=i.mutations||[],g=e.animations.get(c),m=Math.max(0,(i.frameIndex??0)|0);let b,x;if(g?.length)if(b=g[m%g.length],f.length){const v=es(c,g,f,e,t,n);x=v[m%v.length];}else x=b;else {const v=e.textures.get(c);if(!v)throw new Error(`Unknown sprite/anim key: ${c}`);b=v,x=Fo(c,v,f,e,t,n);}let S;if(u==="mutations"){const v=new e.ctors.Sprite(x),y=i.anchorX??v.texture?.defaultAnchor?.x??.5,C=i.anchorY??v.texture?.defaultAnchor?.y??.5;v.anchor?.set?.(y,C),v.scale.set(i.scale??1);const h=new e.ctors.Container;h.addChild(v);try{h.updateTransform?.();}catch{}const k=v.getBounds?.(true)||{x:0,y:0,width:v.width,height:v.height};v.position.set(-k.x+l,-k.y+l),S=Du(e,h);try{h.destroy?.({children:!0});}catch{}}else {const v=i.scale??1;let y=rs(i.boundsPadding);u==="padded"&&i.boundsPadding==null&&(y=Fu(c,m,b,e,t,n)),l&&(y={top:y.top+l,right:y.right+l,bottom:y.bottom+l,left:y.left+l});const C=is(b),h=as(x,C.w,C.h),k=Math.max(1,Math.ceil((C.w+y.left+y.right)*v)),T=Math.max(1,Math.ceil((C.h+y.top+y.bottom)*v));S=document.createElement("canvas"),S.width=k,S.height=T;const I=S.getContext("2d");if(I){I.imageSmoothingEnabled=false;const L=ur(x,e.renderer,e.ctors,t,n),_=(y.left-h.baseX)*v,D=(y.top-h.baseY)*v;I.drawImage(L,_,D,L.width*v,L.height*v);}}return p&&a&&s?.enabled?(Mu(a,s,p,S),xi(S)):S}function zu(e){for(const t of Array.from(e.live))t.__mgDestroy?.();}function Gu(e,t){return e.defaultParent=t,true}function ju(e,t){return e.defaultParent=t,true}function yt(){if(!_a())throw new Error("MGSprite not ready yet")}function Bu(e,t,n){return typeof t=="string"?wi(Ce(),_t(),ln(),e,t,n||{}):wi(Ce(),_t(),ln(),null,e,t||{})}function Wu(e,t,n){return typeof t=="string"?eo(Ce(),_t(),ln(),e,t,n||{},cn(),Qr()):eo(Ce(),_t(),ln(),null,e,t||{},cn(),Qr())}function Hu(){zu(Ce());}function Uu(e){return Gu(Ce(),e)}function Vu(e){return ju(Ce(),e)}function Ku(e,t){const n=Ce(),r=typeof t=="string"?dn(e,t,n.textures,n.animations):dn(null,e,n.textures,n.animations);return n.textures.has(r)||n.animations.has(r)}function Yu(){yt();const e=Ce().categoryIndex;return e?Array.from(e.keys()).sort((t,n)=>t.localeCompare(n)):[]}function qu(e){yt();const t=String(e||"").trim();if(!t)return [];const n=Ce().categoryIndex;return n?Array.from(n.get(t)?.values()||[]):[]}function Xu(e,t){yt();const n=String(e||"").trim(),r=String(t||"").trim();if(!n||!r)return  false;const o=Ce().categoryIndex;if(!o)return  false;const i=n.toLowerCase(),a=r.toLowerCase();for(const[s,c]of o.entries())if(s.toLowerCase()===i){for(const u of c.values())if(u.toLowerCase()===a)return  true}return  false}function Ju(e){yt();const t=Ce().categoryIndex;if(!t)return [];const n=String(e||"").trim().toLowerCase(),r=[];for(const[o,i]of t.entries())for(const a of i.values()){const s=gn(o,a);(!n||s.toLowerCase().startsWith(n))&&r.push(s);}return r.sort((o,i)=>o.localeCompare(i))}function Qu(e){yt();const t=String(e||"").trim();if(!t)return null;const n=er(t),r=/^sprite\/([^/]+)\/(.+)$/.exec(n);if(!r)return null;const o=r[1],i=r[2],a=Ce().categoryIndex,s=o.toLowerCase(),c=i.toLowerCase();let u=o,l=i;if(a){const d=Array.from(a.keys()).find(g=>g.toLowerCase()===s);if(!d)return null;u=d;const p=a.get(d);if(!p)return null;const f=Array.from(p.values()).find(g=>g.toLowerCase()===c);if(!f)return null;l=f;}return {category:u,id:l,key:gn(u,l)}}function Zu(e,t){yt();const n=String(e||"").trim(),r=String(t||"").trim();if(!n||!r)throw new Error("getIdPath(category, id) requires both category and id");const o=Ce().categoryIndex;if(!o)throw new Error("Sprite categories not indexed");const i=n.toLowerCase(),a=r.toLowerCase(),s=Array.from(o.keys()).find(l=>l.toLowerCase()===i)||n,c=o.get(s);if(!c)throw new Error(`Unknown sprite category: ${n}`);const u=Array.from(c.values()).find(l=>l.toLowerCase()===a)||r;if(!c.has(u))throw new Error(`Unknown sprite id: ${n}/${r}`);return gn(s,u)}function ep(){ku(_t());}function tp(){_u(cn());}function np(){return Lu(cn())}function rp(){return [...Ua]}async function op(e,t,n=10,r=0){return yt(),Ou(e,Ce(),_t(),ln(),cn(),Qr(),t,n,r)}const ge={init:eu,isReady:_a,show:Bu,toCanvas:Wu,clear:Hu,attach:Uu,attachProvider:Vu,has:Ku,key:(e,t)=>gn(e,t),getCategories:Yu,getCategoryId:qu,hasId:Xu,listIds:Ju,getIdInfo:Qu,getIdPath:Zu,clearMutationCache:ep,clearToCanvasCache:tp,getToCanvasCacheStats:np,getMutationNames:rp,warmup:op},ip=M,je=ip.Object??Object,pr=je.keys,nr=je.values,rr=je.entries,Si=new WeakSet;function ap(){return {data:{items:null,decor:null,mutations:null,eggs:null,pets:null,abilities:null,plants:null,weather:null},isHookInstalled:false,scanInterval:null,scanAttempts:0,weatherPollingTimer:null,weatherPollAttempts:0}}const Z=ap(),at={items:["WateringCan","PlanterPot","Shovel"],decor:["SmallRock","MediumRock","LargeRock","WoodBench","StoneBench","MarbleBench"],mutations:["Gold","Rainbow","Wet","Chilled","Frozen"],eggs:["CommonEgg","UncommonEgg","RareEgg"],pets:["Worm","Snail","Bee","Chicken","Bunny"],abilities:["ProduceScaleBoost","DoubleHarvest","SeedFinderI","CoinFinderI"],plants:["Carrot","Strawberry","Aloe","Blueberry","Apple"]},sp=["Rain","Frost","Dawn","AmberMoon"],Ci=/main-[^/]+\.js(\?|$)/,lp=6,cp=150,dp=2e3,up=200,pp=50,st=(e,t)=>t.every(n=>e.includes(n));function lt(e,t){Z.data[e]==null&&(Z.data[e]=t,or()&&cs());}function or(){return Object.values(Z.data).every(e=>e!=null)}function ss(e,t){if(!e||typeof e!="object"||Si.has(e))return;Si.add(e);let n;try{n=pr(e);}catch{return}if(!n||n.length===0)return;const r=e;let o;if(!Z.data.items&&st(n,at.items)&&(o=r.WateringCan,o&&typeof o=="object"&&"coinPrice"in o&&"creditPrice"in o&&lt("items",r)),!Z.data.decor&&st(n,at.decor)&&(o=r.SmallRock,o&&typeof o=="object"&&"coinPrice"in o&&"creditPrice"in o&&lt("decor",r)),!Z.data.mutations&&st(n,at.mutations)&&(o=r.Gold,o&&typeof o=="object"&&"baseChance"in o&&"coinMultiplier"in o&&lt("mutations",r)),!Z.data.eggs&&st(n,at.eggs)&&(o=r.CommonEgg,o&&typeof o=="object"&&"faunaSpawnWeights"in o&&"secondsToHatch"in o&&lt("eggs",r)),!Z.data.pets&&st(n,at.pets)&&(o=r.Worm,o&&typeof o=="object"&&"coinsToFullyReplenishHunger"in o&&"diet"in o&&Array.isArray(o.diet)&&lt("pets",r)),!Z.data.abilities&&st(n,at.abilities)&&(o=r.ProduceScaleBoost,o&&typeof o=="object"&&"trigger"in o&&"baseParameters"in o&&lt("abilities",r)),!Z.data.plants&&st(n,at.plants)&&(o=r.Carrot,o&&typeof o=="object"&&"seed"in o&&"plant"in o&&"crop"in o&&lt("plants",r)),!(t>=lp))for(const i of n){let a;try{a=r[i];}catch{continue}a&&typeof a=="object"&&ss(a,t+1);}}function Hn(e){try{ss(e,0);}catch{}}function ls(){if(!Z.isHookInstalled){if(je.__MG_HOOKED__){Z.isHookInstalled=true;return}je.__MG_HOOKED__=true,Z.isHookInstalled=true;try{je.keys=function(t){return Hn(t),pr.apply(this,arguments)},nr&&(je.values=function(t){return Hn(t),nr.apply(this,arguments)}),rr&&(je.entries=function(t){return Hn(t),rr.apply(this,arguments)});}catch{}}}function cs(){if(Z.isHookInstalled){try{je.keys=pr,nr&&(je.values=nr),rr&&(je.entries=rr);}catch{}Z.isHookInstalled=false;}}function fp(){if(Z.scanInterval||or())return;const e=()=>{if(or()||Z.scanAttempts>cp){ds();return}Z.scanAttempts++;try{pr(M).forEach(t=>{try{Hn(M[t]);}catch{}});}catch{}};e(),Z.scanInterval=setInterval(e,dp);}function ds(){Z.scanInterval&&(clearInterval(Z.scanInterval),Z.scanInterval=null);}const Ai=M;function gp(){try{for(const e of Ai.document?.scripts||[]){const t=e?.src?String(e.src):"";if(Ci.test(t))return t}}catch{}try{for(const e of Ai.performance?.getEntriesByType?.("resource")||[]){const t=e?.name?String(e.name):"";if(Ci.test(t))return t}}catch{}return null}function mp(e,t){const n=Math.max(e.lastIndexOf("const ",t),e.lastIndexOf("let ",t),e.lastIndexOf("var ",t));if(n<0)return null;const r=e.indexOf("=",n);if(r<0||r>t)return null;const o=e.indexOf("{",r);if(o<0||o>t)return null;let i=0,a="",s=false;for(let c=o;c<e.length;c++){const u=e[c];if(a){if(s){s=false;continue}if(u==="\\"){s=true;continue}u===a&&(a="");continue}if(u==='"'||u==="'"){a=u;continue}if(u==="{")i++;else if(u==="}"&&--i===0)return e.slice(o,c+1)}return null}function hp(e){const t={};let n=false;for(const r of sp){const o=e?.[r];if(!o||typeof o!="object")continue;const i=o.iconSpriteKey||null,{iconSpriteKey:a,...s}=o;t[r]={weatherId:r,spriteId:i,...s},n=true;}return t.Sunny||(t.Sunny={weatherId:"Sunny",name:"Sunny",spriteId:"sprite/ui/SunnyIcon",type:"primary"}),!n||t.Rain&&t.Rain.mutator?.mutation!=="Wet"?null:t}async function bp(){if(Z.data.weather)return  true;const e=gp();if(!e)return  false;let t="";try{const s=await fetch(e,{credentials:"include"});if(!s.ok)return !1;t=await s.text();}catch{return  false}let n=t.indexOf("fixedTimeSlots:[0,48,96,144,192,240]");if(n<0&&(n=t.indexOf('name:"Amber Moon"')),n<0)return  false;const r=mp(t,n);if(!r)return  false;const o=r.replace(/\b[A-Za-z_$][\w$]*\.(Rain|Frost|Dawn|AmberMoon)\b/g,'"$1"');let i;try{i=Function('"use strict";return('+o+")")();}catch{return  false}const a=hp(i);return a?(Z.data.weather=a,true):false}function yp(){if(Z.weatherPollingTimer)return;Z.weatherPollAttempts=0;const e=setInterval(async()=>{(await bp()||++Z.weatherPollAttempts>up)&&(clearInterval(e),Z.weatherPollingTimer=null);},pp);Z.weatherPollingTimer=e;}function vp(){Z.weatherPollingTimer&&(clearInterval(Z.weatherPollingTimer),Z.weatherPollingTimer=null);}function xp(e){return String(e||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^A-Za-z0-9]/g,"").trim()}function wp(e,t=[]){const n=new Set,r=o=>{const i=String(o||"").trim();i&&n.add(i);};r(e);for(const o of t)r(o);for(const o of Array.from(n.values()))o.endsWith("s")?r(o.slice(0,-1)):r(`${o}s`),o.endsWith("es")&&r(o.slice(0,-2));return Array.from(n.values()).filter(Boolean)}function us(e,t,n,r=[],o=[]){const i=window.Gemini?.Modules?.Sprite;if(!i)return null;const a=wp(e,r);if(!a.length)return null;const s=[t,...o].filter(d=>typeof d=="string"),c=d=>{const p=String(d||"").trim();if(!p)return null;for(const f of a)try{if(i.has(f,p))return i.getIdPath(f,p)}catch{}return null};for(const d of s){const p=c(d);if(p)return p}const u=xp(n||""),l=c(u||n||"");if(l)return l;try{for(const d of a){const p=i.listIds(`sprite/${d}/`),f=s.map(m=>String(m||"").toLowerCase()),g=String(n||u||"").toLowerCase();for(const m of p){const x=(m.split("/").pop()||"").toLowerCase();if(f.some(S=>S&&S===x)||x===g)return m}for(const m of p){const x=(m.split("/").pop()||"").toLowerCase();if(f.some(S=>S&&x.includes(S))||g&&x.includes(g))return m}}}catch{}return null}function Le(e,t,n,r,o=[],i=[]){if(!e||typeof e!="object")return;const a=e.tileRef;if(!a||typeof a!="object")return;const s=String(a.spritesheet||t||"").trim(),c=us(s,n,r,o,i);if(c)try{e.spriteId=c;}catch{}const u=e.rotationVariants;if(u&&typeof u=="object")for(const l of Object.values(u))Le(l,s,n,r);if(e.immatureTileRef){const l={tileRef:e.immatureTileRef};Le(l,s,n,r),l.spriteId&&(e.immatureSpriteId=l.spriteId);}if(e.topmostLayerTileRef){const l={tileRef:e.topmostLayerTileRef};Le(l,s,n,r),l.spriteId&&(e.topmostLayerSpriteId=l.spriteId);}e.activeState&&typeof e.activeState=="object"&&Le(e.activeState,s,n,e.activeState?.name||r);}function kp(e,t,n,r=[]){if(!Array.isArray(t)||t.length===0)return null;const o=t[0],i=t.slice(1);return us(e,o,n??null,r,i)}function Sp(e){for(const[t,n]of Object.entries(e.items||{}))Le(n,"items",t,n?.name,["item"]);for(const[t,n]of Object.entries(e.decor||{}))Le(n,"decor",t,n?.name);for(const[t,n]of Object.entries(e.mutations||{})){Le(n,"mutations",t,n?.name,["mutation"]);const r=kp("mutation-overlay",[`${t}TallPlant`,`${t}TallPlantIcon`,t],n?.name,["mutation-overlay"]);if(r)try{n.overlaySpriteId=r;}catch{}}for(const[t,n]of Object.entries(e.eggs||{}))Le(n,"pets",t,n?.name,["pet"]);for(const[t,n]of Object.entries(e.pets||{}))Le(n,"pets",t,n?.name,["pet"]);for(const[t,n]of Object.entries(e.plants||{})){const r=n;r.seed&&Le(r.seed,r.seed?.tileRef?.spritesheet||"seeds",`${t}Seed`,r.seed?.name||`${t} Seed`,["seed","plant","plants"],[t]),r.plant&&Le(r.plant,r.plant?.tileRef?.spritesheet||"plants",`${t}Plant`,r.plant?.name||`${t} Plant`,["plant","plants","tallplants"],[t]),r.crop&&Le(r.crop,r.crop?.tileRef?.spritesheet||"plants",t,r.crop?.name||t,["plant","plants"],[`${t}Crop`]);}}function Cp(){try{Sp(Z.data);}catch(e){try{console.warn("[MGData] sprite resolution failed",e);}catch{}}}const ps=1e4,fs=50;function gs(e){return new Promise(t=>setTimeout(t,e))}function Ap(e){return Z.data[e]}function Tp(){return {...Z.data}}function Ip(e){return Z.data[e]!=null}async function Pp(e,t=ps,n=fs){const r=Date.now();for(;Date.now()-r<t;){const o=Z.data[e];if(o!=null)return o;await gs(n);}throw new Error(`MGData.waitFor: timeout waiting for "${e}"`)}async function Ep(e=ps,t=fs){const n=Date.now();for(;Date.now()-n<e;){if(Object.values(Z.data).some(r=>r!=null))return {...Z.data};await gs(t);}throw new Error("MGData.waitForAnyData: timeout")}const ae={async init(){ls(),fp(),yp();},isReady:or,get:Ap,getAll:Tp,has:Ip,waitFor:Pp,waitForAny:Ep,resolveSprites:Cp,cleanup(){cs(),ds(),vp();}},Mp={expanded:false,sort:{key:null,dir:null},search:""},_p={categories:{}};async function Lp(){const e=await ya("tab-test",{version:2,defaults:_p,sanitize:i=>({categories:i.categories&&typeof i.categories=="object"?i.categories:{}})});function t(i){return e.get().categories[i]||{...Mp}}function n(i,a){const s=e.get(),c=t(i);e.update({categories:{...s.categories,[i]:{...c,expanded:a}}});}function r(i,a,s){const c=e.get(),u=t(i);e.update({categories:{...c.categories,[i]:{...u,sort:{key:a,dir:s}}}});}function o(i,a){const s=e.get(),c=t(i);e.update({categories:{...s.categories,[i]:{...c,search:a}}});}return {get:e.get,set:e.set,save:e.save,getCategoryState:t,setCategoryExpanded:n,setCategorySort:r,setCategorySearch:o}}const Rp={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function En(e){return e?Rp[e]??0:0}class Op extends Nt{constructor(){super({id:"tab-test",label:"Test"});U(this,"stateCtrl",null);}async build(n){this.stateCtrl=await Lp();const r=this.createContainer("test-section");r.style.display="flex",r.style.flexDirection="column",r.style.gap="12px",n.appendChild(r),await this.buildSpriteTables(r);}renderSprite(n){const r=w("div",{style:"display:flex;align-items:center;justify-content:center;width:32px;height:32px;"});if(n.spriteId){const o=n.spriteId;requestAnimationFrame(()=>{try{const i=ge.toCanvas(o,{scale:1});i.style.maxWidth="32px",i.style.maxHeight="32px",i.style.objectFit="contain",r.appendChild(i);}catch{r.textContent="-";}});}else r.textContent="-";return r}renderRarity(n){if(!n.rarity){const o=w("span",{style:"opacity:0.5;"});return o.textContent="—",o}return Ma({variant:"rarity",rarity:n.rarity,size:"sm"}).root}createDataCard(n,r,o,i){const a=this.stateCtrl.getCategoryState(n),s=p=>{if(!p)return o;const f=p.toLowerCase();return o.filter(g=>g.name.toLowerCase().includes(f))},c=Pa({columns:i,data:s(a.search),pageSize:0,compact:true,maxHeight:"calc(var(--lg-row-h, 40px) * 6)",getRowId:p=>p.spriteId,onSortChange:(p,f)=>{this.stateCtrl.setCategorySort(n,p,f);}});a.sort.key&&a.sort.dir&&c.sortBy(a.sort.key,a.sort.dir);const u=Ea({placeholder:"Search...",value:a.search,debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:p=>{const f=p.trim();this.stateCtrl.setCategorySearch(n,f),c.setData(s(f));}}),l=w("div",{style:"margin-bottom:8px;"});l.appendChild(u.root);const d=w("div");return d.appendChild(l),d.appendChild(c.root),Se({title:r,subtitle:`${o.length} entries`,variant:"soft",padding:"sm",expandable:true,defaultExpanded:a.expanded,onExpandChange:p=>{this.stateCtrl.setCategoryExpanded(n,p);}},d)}formatCategoryName(n){return n.split("-").map(r=>r.charAt(0).toUpperCase()+r.slice(1)).join(" ")}findPlantBySprite(n,r){const o=ae.get("plants");if(!o)return null;for(const a of Object.values(o))if(a?.seed?.spriteId===n||a?.plant?.spriteId===n||a?.crop?.spriteId===n)return a;const i=r.toLowerCase();for(const a of Object.values(o)){const s=(a?.seed?.name||"").toLowerCase();if(s===i||s===`${i} seed`)return a}return null}findPetBySpriteId(n){const r=ae.get("pets");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}findItemBySpriteId(n){const r=ae.get("items");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}findDecorBySpriteId(n){const r=ae.get("decor");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}findEggBySpriteId(n){const r=ae.get("eggs");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}getRarityForSprite(n,r,o){const i=n.toLowerCase();if(i==="plant"||i==="seed"||i==="tallplant"){const a=this.findPlantBySprite(r,o);if(a?.seed?.rarity)return a.seed.rarity}if(i==="pet"){const a=this.findPetBySpriteId(r);if(a?.rarity)return a.rarity}if(i==="item"){const a=this.findItemBySpriteId(r);if(a?.rarity)return a.rarity}if(i==="decor"){const a=this.findDecorBySpriteId(r);if(a?.rarity)return a.rarity}if(i==="egg"){const a=this.findEggBySpriteId(r);if(a?.rarity)return a.rarity}return null}yieldToMain(n=0){return new Promise(r=>{n>0?setTimeout(r,n):typeof requestIdleCallback<"u"?requestIdleCallback(()=>r(),{timeout:50}):setTimeout(r,4);})}async buildSpriteTables(n){const r=[{key:"name",header:"Name",sortable:true,width:"1fr",sortFn:(i,a)=>i.name.localeCompare(a.name,void 0,{numeric:true,sensitivity:"base"})},{key:"rarity",header:"Rarity",sortable:true,width:"100px",align:"center",render:i=>this.renderRarity(i),sortFn:(i,a)=>En(i.rarity)-En(a.rarity)},{key:"sprite",header:"Sprite",width:"60px",align:"center",render:i=>this.renderSprite(i)}];if(!ge.isReady())try{await ge.init();}catch{return}const o=ge.getCategories();for(let i=0;i<o.length;i++){await this.yieldToMain(8);const a=o[i],c=ge.getCategoryId(a).map(u=>{const l=`sprite/${a}/${u}`;return {name:u,spriteId:l,rarity:this.getRarityForSprite(a,l,u)}});if(c.sort((u,l)=>En(u.rarity)-En(l.rarity)),c.length>0){const u=this.createDataCard(a,this.formatCategoryName(a),c,r);n.appendChild(u);}}}}const Np=new Map;function $p(){return Np}function to(){return M.jotaiAtomCache?.cache}function rt(e){const t=$p(),n=t.get(e);if(n)return n;const r=to();if(!r)return null;for(const o of r.values())if((o?.debugLabel||o?.label||"")===e)return t.set(e,o),o;return null}function Dp(){const e=M;if(e.__REACT_DEVTOOLS_GLOBAL_HOOK__)return;const t=new Map,n=new Map;e.__REACT_DEVTOOLS_GLOBAL_HOOK__={renderers:t,supportsFiber:true,inject:r=>{const o=t.size+1;return t.set(o,r),n.set(o,new Set),o},onCommitFiberRoot:(r,o)=>{const i=n.get(r);i&&i.add(o);},onCommitFiberUnmount:()=>{},onPostCommitFiberRoot:()=>{},getFiberRoots:r=>n.get(r),checkDCE:()=>{},isDisabled:false};}const Fp={baseStore:null,captureInProgress:false,captureError:null,lastCapturedVia:null,mirror:void 0};function $t(){return Fp}const zp="__JOTAI_STORE_READY__";let Ti=false;const no=new Set;function Mn(){if(!Ti){Ti=true;for(const e of no)try{e();}catch{}try{const e=M.CustomEvent||CustomEvent;M.dispatchEvent?.(new e(zp));}catch{}}}function Gp(e){no.add(e);const t=oo();if(t.via&&!t.polyfill)try{e();}catch{}return ()=>{no.delete(e);}}async function jp(e={}){const{timeoutMs:t=6e3,intervalMs:n=50}=e,r=oo();if(!(r.via&&!r.polyfill))return new Promise((o,i)=>{let a=false;const s=Gp(()=>{a||(a=true,s(),o());}),c=Date.now();(async()=>{for(;!a&&Date.now()-c<t;){const l=oo();if(l.via&&!l.polyfill){if(a)return;a=true,s(),o();return}await un(n);}a||(a=true,s(),i(new Error("Store not captured within timeout")));})();})}const un=e=>new Promise(t=>setTimeout(t,e));function ms(){try{const e=M.Event||Event;M.dispatchEvent?.(new e("visibilitychange"));}catch{}}function ro(e){return e&&typeof e=="object"&&typeof e.get=="function"&&typeof e.set=="function"&&typeof e.sub=="function"}function Mr(e,t=0,n=new WeakSet){if(t>3||!e||typeof e!="object"||n.has(e))return null;try{n.add(e);}catch{return null}if(ro(e))return e;const r=["store","value","current","state","s","baseStore"];for(const o of r)try{const i=e[o];if(ro(i))return i}catch{}return null}function hs(){const e=$t(),t=M.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t?.renderers?.size)return null;let n=0;for(const[r]of t.renderers){const o=t.getFiberRoots?.(r);o&&(n+=o.size||0);}if(n===0)return null;for(const[r]of t.renderers){const o=t.getFiberRoots?.(r);if(o)for(const i of o){const a=new Set,s=[i.current];for(;s.length;){const c=s.pop();if(!(!c||a.has(c))){a.add(c);try{const u=c?.pendingProps?.value;if(ro(u))return e.lastCapturedVia="fiber",u}catch{}try{let u=c?.memoizedState,l=0;for(;u&&l<15;){l++;const d=Mr(u);if(d)return e.lastCapturedVia="fiber",d;const p=Mr(u.memoizedState);if(p)return e.lastCapturedVia="fiber",p;u=u.next;}}catch{}try{if(c?.stateNode){const u=Mr(c.stateNode);if(u)return e.lastCapturedVia="fiber",u}}catch{}c.child&&s.push(c.child),c.sibling&&s.push(c.sibling),c.alternate&&s.push(c.alternate);}}}}return null}function bs(){return {get:()=>{throw new Error("Store not captured: get unavailable")},set:()=>{throw new Error("Store not captured: set unavailable")},sub:()=>()=>{},__polyfill:true}}async function Bp(e=5e3){const t=Date.now();let n=to();for(;!n&&Date.now()-t<e;)await un(100),n=to();if(!n)throw new Error("jotaiAtomCache.cache not found");const r=$t();let o=null,i=null;const a=[],s=()=>{for(const u of a)try{u.__origWrite&&(u.write=u.__origWrite,delete u.__origWrite);}catch{}};for(const u of n.values()){if(!u||typeof u.write!="function"||u.__origWrite)continue;const l=u.write;u.__origWrite=l,u.write=function(d,p,...f){return i||(o=d,i=p,s()),l.call(this,d,p,...f)},a.push(u);}ms();const c=Date.now();for(;!i&&Date.now()-c<e;)await un(50);return i?(r.lastCapturedVia="write",{get:u=>o(u),set:(u,l)=>i(u,l),sub:(u,l)=>{let d;try{d=o(u);}catch{}const p=setInterval(()=>{let f;try{f=o(u);}catch{return}if(f!==d){d=f;try{l();}catch{}}},100);return ()=>clearInterval(p)}}):(s(),r.lastCapturedVia="polyfill",bs())}async function Wp(e=1e4){const t=$t();ms();const n=Date.now();for(;Date.now()-n<e;){const r=hs();if(r)return r;await un(50);}return t.lastCapturedVia="polyfill",bs()}async function zo(){const e=$t();if(e.baseStore&&!e.baseStore.__polyfill)return Mn(),e.baseStore;if(e.captureInProgress){const t=Date.now(),n=2500;for(;!e.baseStore&&Date.now()-t<n;)await un(25);if(e.baseStore)return e.baseStore.__polyfill||Mn(),e.baseStore}e.captureInProgress=true;try{const t=hs();if(t)return e.baseStore=t,Mn(),t;try{const r=await Bp(5e3);return e.baseStore=r,r.__polyfill||Mn(),r}catch(r){e.captureError=r;}const n=await Wp();return e.baseStore=n,n}catch(t){throw e.captureError=t,t}finally{e.captureInProgress=false;}}function oo(){const e=$t();return {via:e.lastCapturedVia,polyfill:!!e.baseStore?.__polyfill,error:e.captureError}}async function Hp(){const e=await zo(),t=new WeakMap,n=async o=>{let i=t.get(o);if(i)return i;i={last:void 0,has:false,subs:new Set},t.set(o,i);try{i.last=e.get(o),i.has=!0;}catch{}const a=e.sub(o,()=>{let s;try{s=e.get(o);}catch{return}const c=i.last,u=!Object.is(s,c)||!i.has;if(i.last=s,i.has=true,u)for(const l of i.subs)try{l(s,c);}catch{}});return i.unsubUpstream=a,i};return {async get(o){const i=await n(o);if(i.has)return i.last;const a=e.get(o);return i.last=a,i.has=true,a},async set(o,i){await e.set(o,i);const a=await n(o);a.last=i,a.has=true;},async sub(o,i){const a=await n(o);if(a.subs.add(i),a.has)try{i(a.last,a.last);}catch{}return ()=>{a.subs.delete(i);}},getShadow(o){return t.get(o)?.last},hasShadow(o){return !!t.get(o)?.has},async ensureWatch(o){await n(o);},async asStore(){return {get:o=>this.get(o),set:(o,i)=>this.set(o,i),sub:(o,i)=>{let a=null;return this.sub(o,()=>i()).then(s=>a=s),()=>a?.()}}}}}async function Un(){const e=$t();return e.mirror||(e.mirror=await Hp()),e.mirror}const ce={async select(e){const t=await Un(),n=rt(e);if(!n)throw new Error(`[Store] Atom not found: "${e}"`);return t.get(n)},async set(e,t){const n=await Un(),r=rt(e);if(!r)throw new Error(`[Store] Atom not found: "${e}"`);await n.set(r,t);},async subscribe(e,t){const n=await Un(),r=rt(e);if(!r)throw new Error(`[Store] Atom not found: "${e}"`);return n.sub(r,o=>{try{t(o);}catch{}})},async subscribeImmediate(e,t){const n=await ce.select(e);try{t(n);}catch{}return ce.subscribe(e,t)}};async function Up(){await Un();}function Go(e){return e?Array.isArray(e)?e.slice():e.split(".").map(t=>t.match(/^\d+$/)?Number(t):t):[]}function pn(e,t){const n=Go(t);let r=e;for(const o of n){if(r==null)return;r=r[o];}return r}function Vp(e,t,n){const r=Go(t);if(!r.length)return n;const o=Array.isArray(e)?[...e]:{...e??{}};let i=o;for(let a=0;a<r.length-1;a++){const s=r[a],c=i[s],u=typeof c=="object"&&c!==null?Array.isArray(c)?[...c]:{...c}:{};i[s]=u,i=u;}return i[r[r.length-1]]=n,o}function Ii(e,t){const n={};for(const r of t)n[r]=r.includes(".")?pn(e,r):e?.[r];try{return JSON.stringify(n)}catch{return String(n)}}function Kp(e,t,n){const r=n.mode??"auto";function o(u){const l=t?pn(u,t):u,d=new Map;if(l==null)return {signatures:d,keys:[]};const p=Array.isArray(l);if((r==="array"||r==="auto"&&p)&&p)for(let g=0;g<l.length;g++){const m=l[g],b=n.key?n.key(m,g,u):g,x=n.sig?n.sig(m,g,u):n.fields?Ii(m,n.fields):JSON.stringify(m);d.set(b,x);}else for(const[g,m]of Object.entries(l)){const b=n.key?n.key(m,g,u):g,x=n.sig?n.sig(m,g,u):n.fields?Ii(m,n.fields):JSON.stringify(m);d.set(b,x);}return {signatures:d,keys:Array.from(d.keys())}}function i(u,l){if(u===l)return  true;if(!u||!l||u.size!==l.size)return  false;for(const[d,p]of u)if(l.get(d)!==p)return  false;return  true}async function a(u){let l=null;return ce.subscribeImmediate(e,d=>{const p=t?pn(d,t):d,{signatures:f}=o(p);if(!i(l,f)){const g=new Set([...l?Array.from(l.keys()):[],...Array.from(f.keys())]),m=[];for(const b of g){const x=l?.get(b)??"__NONE__",S=f.get(b)??"__NONE__";x!==S&&m.push(b);}l=f,u({value:p,changedKeys:m});}})}async function s(u,l){return a(({value:d,changedKeys:p})=>{p.includes(u)&&l({value:d});})}async function c(u,l){const d=new Set(u);return a(({value:p,changedKeys:f})=>{const g=f.filter(m=>d.has(m));g.length&&l({value:p,changedKeys:g});})}return {sub:a,subKey:s,subKeys:c}}const It=new Map;function Yp(e,t){const n=It.get(e);if(n)try{n();}catch{}return It.set(e,t),()=>{try{t();}catch{}It.get(e)===t&&It.delete(e);}}function de(e,t={}){const{path:n,write:r="replace"}=t,o=n?`${e}:${Go(n).join(".")}`:e;async function i(){const d=await ce.select(e);return n?pn(d,n):d}async function a(d){if(typeof r=="function"){const g=await ce.select(e),m=r(d,g);return ce.set(e,m)}const p=await ce.select(e),f=n?Vp(p,n,d):d;return r==="merge-shallow"&&!n&&p&&typeof p=="object"&&typeof d=="object"?ce.set(e,{...p,...d}):ce.set(e,f)}async function s(d){const p=await i(),f=d(p);return await a(f),f}async function c(d,p,f){let g;const m=x=>{const S=n?pn(x,n):x;if(typeof g>"u"||!f(g,S)){const v=g;g=S,p(S,v);}},b=d?await ce.subscribeImmediate(e,m):await ce.subscribe(e,m);return Yp(o,b)}function u(){const d=It.get(o);if(d){try{d();}catch{}It.delete(o);}}function l(d){return Kp(e,d?.path??n,d)}return {label:o,get:i,set:a,update:s,onChange:(d,p=Object.is)=>c(false,d,p),onChangeNow:(d,p=Object.is)=>c(true,d,p),asSignature:l,stopOnChange:u}}function A(e){return de(e)}A("positionAtom");A("lastPositionInMyGardenAtom");A("playerDirectionAtom");A("stateAtom");A("quinoaDataAtom");A("currentTimeAtom");A("actionAtom");A("isPressAndHoldActionAtom");A("mapAtom");A("tileSizeAtom");de("mapAtom",{path:"cols"});de("mapAtom",{path:"rows"});de("mapAtom",{path:"spawnTiles"});de("mapAtom",{path:"locations.seedShop.spawnTileIdx"});de("mapAtom",{path:"locations.eggShop.spawnTileIdx"});de("mapAtom",{path:"locations.toolShop.spawnTileIdx"});de("mapAtom",{path:"locations.decorShop.spawnTileIdx"});de("mapAtom",{path:"locations.sellCropsShop.spawnTileIdx"});de("mapAtom",{path:"locations.sellPetShop.spawnTileIdx"});de("mapAtom",{path:"locations.collectorsClub.spawnTileIdx"});de("mapAtom",{path:"locations.wishingWell.spawnTileIdx"});de("mapAtom",{path:"locations.shopsCenter.spawnTileIdx"});A("playerAtom");A("myDataAtom");A("myUserSlotIdxAtom");A("isSpectatingAtom");A("myCoinsCountAtom");A("numPlayersAtom");de("playerAtom",{path:"id"});A("userSlotsAtom");A("filteredUserSlotsAtom");A("myUserSlotAtom");A("spectatorsAtom");de("stateAtom",{path:"child"});de("stateAtom",{path:"child.data"});de("stateAtom",{path:"child.data.shops"});const qp=de("stateAtom",{path:"child.data.userSlots"}),Xp=de("stateAtom",{path:"data.players"}),Jp=de("stateAtom",{path:"data.hostPlayerId"});A("myInventoryAtom");A("myInventoryItemsAtom");A("isMyInventoryAtMaxLengthAtom");A("myFavoritedItemIdsAtom");A("myCropInventoryAtom");A("mySeedInventoryAtom");A("myToolInventoryAtom");A("myEggInventoryAtom");A("myDecorInventoryAtom");A("myPetInventoryAtom");de("myInventoryAtom",{path:"favoritedItemIds"});A("itemTypeFiltersAtom");A("myItemStoragesAtom");A("myPetHutchStoragesAtom");A("myPetHutchItemsAtom");A("myPetHutchPetItemsAtom");A("myNumPetHutchItemsAtom");A("myValidatedSelectedItemIndexAtom");A("isSelectedItemAtomSuspended");A("mySelectedItemAtom");A("mySelectedItemNameAtom");A("mySelectedItemRotationsAtom");A("mySelectedItemRotationAtom");A("setSelectedIndexToEndAtom");A("myPossiblyNoLongerValidSelectedItemIndexAtom");A("myCurrentGlobalTileIndexAtom");A("myCurrentGardenTileAtom");A("myCurrentGardenObjectAtom");A("myOwnCurrentGardenObjectAtom");A("myOwnCurrentDirtTileIndexAtom");A("myCurrentGardenObjectNameAtom");A("isInMyGardenAtom");A("myGardenBoardwalkTileObjectsAtom");const Qp=de("myDataAtom",{path:"garden"});de("myDataAtom",{path:"garden.tileObjects"});de("myOwnCurrentGardenObjectAtom",{path:"objectType"});A("myCurrentStablePlantObjectInfoAtom");A("myCurrentSortedGrowSlotIndicesAtom");A("myCurrentGrowSlotIndexAtom");A("myCurrentGrowSlotsAtom");A("myCurrentGrowSlotAtom");A("secondsUntilCurrentGrowSlotMaturesAtom");A("isCurrentGrowSlotMatureAtom");A("numGrowSlotsAtom");A("myCurrentEggAtom");A("petInfosAtom");A("myPetInfosAtom");A("myPetSlotInfosAtom");A("myPrimitivePetSlotsAtom");A("myNonPrimitivePetSlotsAtom");A("expandedPetSlotIdAtom");A("myPetsProgressAtom");A("myActiveCropMutationPetsAtom");A("totalPetSellPriceAtom");A("selectedPetHasNewVariantsAtom");const Zp=A("shopsAtom"),ef=A("myShopPurchasesAtom");A("seedShopAtom");A("seedShopInventoryAtom");A("seedShopRestockSecondsAtom");A("seedShopCustomRestockInventoryAtom");A("eggShopAtom");A("eggShopInventoryAtom");A("eggShopRestockSecondsAtom");A("eggShopCustomRestockInventoryAtom");A("toolShopAtom");A("toolShopInventoryAtom");A("toolShopRestockSecondsAtom");A("toolShopCustomRestockInventoryAtom");A("decorShopAtom");A("decorShopInventoryAtom");A("decorShopRestockSecondsAtom");A("decorShopCustomRestockInventoryAtom");A("isDecorShopAboutToRestockAtom");de("shopsAtom",{path:"seed"});de("shopsAtom",{path:"tool"});de("shopsAtom",{path:"egg"});de("shopsAtom",{path:"decor"});A("myCropItemsAtom");A("myCropItemsToSellAtom");A("totalCropSellPriceAtom");A("friendBonusMultiplierAtom");A("myJournalAtom");A("myCropJournalAtom");A("myPetJournalAtom");A("myStatsAtom");A("myActivityLogsAtom");A("newLogsAtom");A("hasNewLogsAtom");A("newCropLogsFromSellingAtom");A("hasNewCropLogsFromSellingAtom");A("myCompletedTasksAtom");A("myActiveTasksAtom");A("isWelcomeToastVisibleAtom");A("shouldCloseWelcomeToastAtom");A("isInitialMoveToDirtPatchToastVisibleAtom");A("isFirstPlantSeedActiveAtom");A("isThirdSeedPlantActiveAtom");A("isThirdSeedPlantCompletedAtom");A("isDemoTouchpadVisibleAtom");A("areShopAnnouncersEnabledAtom");A("arePresentablesEnabledAtom");A("isEmptyDirtTileHighlightedAtom");A("isPlantTileHighlightedAtom");A("isItemHiglightedInHotbarAtom");A("isItemHighlightedInModalAtom");A("isMyGardenButtonHighlightedAtom");A("isSellButtonHighlightedAtom");A("isShopButtonHighlightedAtom");A("isInstaGrowButtonHiddenAtom");A("isActionButtonHighlightedAtom");A("isGardenItemInfoCardHiddenAtom");A("isSeedPurchaseButtonHighlightedAtom");A("isFirstSeedPurchaseActiveAtom");A("isFirstCropHarvestActiveAtom");A("isWeatherStatusHighlightedAtom");const tf=A("weatherAtom"),ys=A("activeModalAtom");A("hotkeyBeingPressedAtom");A("avatarTriggerAnimationAtom");A("avatarDataAtom");A("emoteDataAtom");A("otherUserSlotsAtom");A("otherPlayerPositionsAtom");A("otherPlayerSelectedItemsAtom");A("otherPlayerLastActionsAtom");A("traderBunnyPlayerId");A("npcPlayersAtom");A("npcQuinoaUsersAtom");A("numNpcAvatarsAtom");A("traderBunnyEmoteTimeoutAtom");A("traderBunnyEmoteAtom");A("unsortedLeaderboardAtom");A("currentGardenNameAtom");A("quinoaEngineAtom");A("quinoaInitializationErrorAtom");A("avgPingAtom");A("serverClientTimeOffsetAtom");A("isEstablishingShotRunningAtom");A("isEstablishingShotCompleteAtom");const ne={initialized:false,activeModal:null,isCustom:false,shadow:null,patchedAtoms:new Set,originalReads:new Map,unsubscribes:[],listeners:{onOpen:new Set,onClose:new Set}};function fr(){return ne}function nf(){return ne.initialized}function vt(){return ne.isCustom&&ne.activeModal!==null}function gt(){return ne.activeModal}function vs(e){return !ne.shadow||ne.shadow.modal!==e?null:ne.shadow.data}function rf(e){ne.initialized=e;}function jo(e){ne.activeModal=e;}function Bo(e){ne.isCustom=e;}function xs(e,t){ne.shadow={modal:e,data:t,timestamp:Date.now()};}function ws(){ne.shadow=null;}function Pi(e,t){ne.patchedAtoms.add(e),ne.originalReads.set(e,t);}function of(e){return ne.originalReads.get(e)}function io(e){return ne.patchedAtoms.has(e)}function af(e){ne.patchedAtoms.delete(e),ne.originalReads.delete(e);}function sf(e){ne.unsubscribes.push(e);}function lf(){for(const e of ne.unsubscribes)try{e();}catch{}ne.unsubscribes.length=0;}function cf(e){return ne.listeners.onOpen.add(e),()=>ne.listeners.onOpen.delete(e)}function ks(e){return ne.listeners.onClose.add(e),()=>ne.listeners.onClose.delete(e)}function Ss(e){for(const t of Array.from(ne.listeners.onOpen))try{t(e);}catch{}}function Wo(e){for(const t of Array.from(ne.listeners.onClose))try{t(e);}catch{}}function df(){lf(),ne.initialized=false,ne.activeModal=null,ne.isCustom=false,ne.shadow=null,ne.patchedAtoms.clear(),ne.originalReads.clear(),ne.listeners.onOpen.clear(),ne.listeners.onClose.clear();}const Ho={inventory:{atoms:[{atomLabel:"myInventoryAtom",dataKey:"_full",transform:e=>{const t=e;return {items:t.items??[],storages:t.storages??[],favoritedItemIds:t.favoritedItemIds??[]}}}],derivedAtoms:[{atomLabel:"myCropInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Produce"):[]},{atomLabel:"mySeedInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Seed"):[]},{atomLabel:"myToolInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Tool"):[]},{atomLabel:"myEggInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Egg"):[]},{atomLabel:"myDecorInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Decor"):[]},{atomLabel:"myPetInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Pet"):[]}]},journal:{atoms:[{atomLabel:"myJournalAtom",dataKey:"_full"}],derivedAtoms:[{atomLabel:"myCropJournalAtom",sourceKey:"produce",deriveFn:e=>e??{}},{atomLabel:"myPetJournalAtom",sourceKey:"pets",deriveFn:e=>e??{}}]},stats:{atoms:[{atomLabel:"myStatsAtom",dataKey:"_full"}]},activityLog:{atoms:[{atomLabel:"myActivityLogsAtom",dataKey:"logs"}]},seedShop:{atoms:[{atomLabel:"seedShopInventoryAtom",dataKey:"inventory"},{atomLabel:"seedShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},eggShop:{atoms:[{atomLabel:"eggShopInventoryAtom",dataKey:"inventory"},{atomLabel:"eggShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},toolShop:{atoms:[{atomLabel:"toolShopInventoryAtom",dataKey:"inventory"},{atomLabel:"toolShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},decorShop:{atoms:[{atomLabel:"decorShopInventoryAtom",dataKey:"inventory"},{atomLabel:"decorShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},leaderboard:{atoms:[{atomLabel:"unsortedLeaderboardAtom",dataKey:"entries"}]},petHutch:{atoms:[{atomLabel:"myPetHutchItemsAtom",dataKey:"items"},{atomLabel:"myPetHutchPetItemsAtom",dataKey:"petItems"}]}};function Cs(e){return Ho[e]}function uf(e){const t=Ho[e],n=[];for(const r of t.atoms)n.push(r.atomLabel);if(t.derivedAtoms)for(const r of t.derivedAtoms)n.push(r.atomLabel);return n}const pf=new Set(["inventory","journal","stats","activityLog","petHutch"]),ff=new Set(["seedShop","eggShop","toolShop","decorShop"]),gf=new Set(["leaderboard"]);function mf(e,t,n,r){return function(i){const a=vt(),s=gt();if(a&&s===r){const c=vs(r);if(c!==null){let u;if(n.dataKey==="_full"?u=c:u=c[n.dataKey],u!==void 0)return t(i),n.transform?n.transform(u):u}}return t(i)}}function hf(e,t,n,r,o){return function(a){if(vt()&&gt()===o){const s=vs(o);if(s!==null){const c=s[n];if(c!==void 0)return t(a),r(c)}}return t(a)}}function bf(e){const t=Cs(e);for(const n of t.atoms){const r=rt(n.atomLabel);if(!r||io(n.atomLabel))continue;const o=r.read;if(typeof o!="function")continue;const i=mf(n.atomLabel,o,n,e);r.read=i,Pi(n.atomLabel,o);}if(t.derivedAtoms)for(const n of t.derivedAtoms){const r=rt(n.atomLabel);if(!r||io(n.atomLabel))continue;const o=r.read;if(typeof o!="function")continue;const i=hf(n.atomLabel,o,n.sourceKey,n.deriveFn,e);r.read=i,Pi(n.atomLabel,o);}}async function gr(e){const t=Cs(e);for(const r of t.atoms)Ei(r.atomLabel);if(t.derivedAtoms)for(const r of t.derivedAtoms)Ei(r.atomLabel);const n=await zo();await As(n,e);}async function yf(e){const t=await zo();await As(t,e);const n=uf(e);for(const r of n){const o=rt(r);if(o)try{t.get(o);}catch{}}}function Ei(e){if(!io(e))return;const t=rt(e),n=of(e);t&&n&&(t.read=n),af(e);}async function As(e,t){const n=pf.has(t),r=ff.has(t),o=gf.has(t);if(!n&&!r&&!o)return;const i=rt("stateAtom");if(i)try{const a=e.get(i);if(!a||typeof a!="object")return;let s=null;if(n||r){const c=a.child,u=c?.data;if(c&&u&&typeof u=="object"){let l=null;if(n&&Array.isArray(u.userSlots)){const d=u.userSlots.map(p=>{if(!p||typeof p!="object")return p;const f=p,g=f.data,m=g&&typeof g=="object"?{...g}:g;return {...f,data:m}});l={...l??u,userSlots:d};}if(r&&u.shops&&typeof u.shops=="object"&&(l={...l??u,shops:{...u.shops}}),l){const d={...c,data:l};s={...a,child:d};}}}if(o){const c=a.data;if(c&&Array.isArray(c.players)){const u={...c,players:[...c.players]};s={...s??a,data:u};}}if(!s)return;await e.set(i,s);}catch{}}async function vf(){for(const e of Object.keys(Ho))await gr(e);}let _n=null,en=null;async function xf(){if(fr().initialized)return;en=await ce.select("activeModalAtom"),_n=setInterval(async()=>{try{const n=await ce.select("activeModalAtom"),r=en;r!==n&&(en=n,wf(n,r));}catch{}},50),sf(()=>{_n&&(clearInterval(_n),_n=null);}),rf(true);}function wf(e,t){const n=vt(),r=gt();e===null&&t!==null&&(n&&r===t?kf("native"):n||Wo({modal:t,wasCustom:false,closedBy:"native"})),e!==null&&!n&&Ss({modal:e,isCustom:false});}async function kf(e){const t=gt();t&&(ws(),Bo(false),jo(null),await gr(t),Wo({modal:t,wasCustom:true,closedBy:e}));}async function Sf(e,t){if(!fr().initialized)throw new Error("[MGCustomModal] Not initialized. Call init() first.");vt()&&await Ts(),xs(e,t),Bo(true),jo(e),bf(e),await yf(e),await ys.set(e),en=e,Ss({modal:e,isCustom:true});}function Cf(e,t){const n=fr();if(!n.isCustom||n.activeModal!==e||!n.shadow)return;const o={...n.shadow.data,...t};xs(e,o);}async function Ts(){const e=fr();if(!e.isCustom||!e.activeModal)return;const t=e.activeModal;ws(),Bo(false),jo(null),await ys.set(null),en=null,await gr(t),Wo({modal:t,wasCustom:true,closedBy:"api"});}function Af(){return new Promise(e=>{if(!vt()){e();return}const t=ks(()=>{t(),e();});})}async function Tf(){if(vt()){const e=gt();e&&await gr(e);}await vf(),df();}const fn={async init(){return xf()},isReady(){return nf()},async show(e,t){return Sf(e,t)},update(e,t){return Cf(e,t)},async close(){return Ts()},isOpen(){return gt()!==null},isCustomOpen(){return vt()},getActiveModal(){return gt()},waitForClose(){return Af()},onOpen(e){return cf(e)},onClose(e){return ks(e)},async destroy(){return Tf()}};function If(){return {ready:false,xform:null,xformAt:0}}const De=If();function Is(){return De.ready}function Dt(e){try{if(typeof structuredClone=="function")return structuredClone(e)}catch{}try{return JSON.parse(JSON.stringify(e))}catch{}return e}function mn(){return $e.tos()}function Uo(){return $e.engine()}function Pf(){const e=mn()?.map?.cols;return Number.isFinite(e)&&e>0?e:null}function Vo(e,t){const n=Pf();return n?t*n+e|0:null}let Ln=null;async function Ef(e=15e3){return De.ready?true:Ln||(Ln=(async()=>{if(await $e.init(e),!mn())throw new Error("MGTile: engine captured but tileObject system not found");return De.ready=true,true})(),Ln)}function ft(e,t,n=true){const r=mn(),o=Vo(e,t);if(!r||o==null)return {gidx:null,tv:null};let i=r.tileViews?.get?.(o)||null;if(!i&&n&&typeof r.getOrCreateTileView=="function")try{i=r.getOrCreateTileView(o);}catch{}return {gidx:o,tv:i||null}}function _r(e,t){if("startTime"in t&&(e.startTime=Number(t.startTime)),"endTime"in t&&(e.endTime=Number(t.endTime)),"targetScale"in t&&(e.targetScale=Number(t.targetScale)),"mutations"in t){if(!Array.isArray(t.mutations))throw new Error("MGTile: mutations must be an array of strings");e.mutations=t.mutations.slice();}}function Ko(e,t){if(!e)throw new Error("MGTile: no tileObject on this tile");if(e.objectType!==t)throw new Error(`MGTile: expected objectType "${t}", got "${e.objectType}"`)}function Pt(e,t,n,r={}){const o=r.ensureView!==false,i=r.forceUpdate!==false,a=Uo(),{gidx:s,tv:c}=ft(Number(e),Number(t),o);if(s==null)throw new Error("MGTile: cols unavailable (engine/TOS not ready)");if(!c)throw new Error("MGTile: TileView unavailable (not instantiated)");const u=c.tileObject;if(typeof c.onDataChanged!="function")throw new Error("MGTile: tileView.onDataChanged not found (different API?)");if(c.onDataChanged(n),i&&a?.reusableContext&&typeof c.update=="function")try{c.update(a.reusableContext);}catch{}return {ok:true,tx:Number(e),ty:Number(t),gidx:s,before:u,after:c.tileObject}}function mr(e,t,n={}){const r=n.ensureView!==false,o=n.clone!==false,{gidx:i,tv:a}=ft(Number(e),Number(t),r);if(i==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!a)return {tx:Number(e),ty:Number(t),gidx:i,tileView:null,tileObject:void 0};const s=a.tileObject;return {tx:Number(e),ty:Number(t),gidx:i,tileView:a,tileObject:o?Dt(s):s}}function Mf(e,t,n={}){return Pt(e,t,null,n)}function _f(e,t,n,r={}){const i=mr(e,t,{...r,clone:false}).tileView?.tileObject;Ko(i,"plant");const a=Dt(i);if(Array.isArray(a.slots)||(a.slots=[]),"plantedAt"in n&&(a.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(a.maturedAt=Number(n.maturedAt)),"species"in n&&(a.species=String(n.species)),"slotIdx"in n&&"slotPatch"in n){const s=Number(n.slotIdx)|0;if(!a.slots[s])throw new Error(`MGTile: plant slot ${s} doesn't exist`);return _r(a.slots[s],n.slotPatch),Pt(e,t,a,r)}if("slots"in n){const s=n.slots;if(Array.isArray(s)){for(let c=0;c<s.length;c++)if(s[c]!=null){if(!a.slots[c])throw new Error(`MGTile: plant slot ${c} doesn't exist`);_r(a.slots[c],s[c]);}}else if(s&&typeof s=="object")for(const c of Object.keys(s)){const u=Number(c)|0;if(Number.isFinite(u)){if(!a.slots[u])throw new Error(`MGTile: plant slot ${u} doesn't exist`);_r(a.slots[u],s[u]);}}else throw new Error("MGTile: patch.slots must be array or object map");return Pt(e,t,a,r)}return Pt(e,t,a,r)}function Lf(e,t,n,r={}){const i=mr(e,t,{...r,clone:false}).tileView?.tileObject;Ko(i,"decor");const a=Dt(i);return "rotation"in n&&(a.rotation=Number(n.rotation)),Pt(e,t,a,r)}function Rf(e,t,n,r={}){const i=mr(e,t,{...r,clone:false}).tileView?.tileObject;Ko(i,"egg");const a=Dt(i);return "plantedAt"in n&&(a.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(a.maturedAt=Number(n.maturedAt)),Pt(e,t,a,r)}function Of(e,t,n,r={}){const o=r.ensureView!==false,i=r.forceUpdate!==false,a=Uo(),{gidx:s,tv:c}=ft(Number(e),Number(t),o);if(s==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!c)throw new Error("MGTile: TileView unavailable");const u=c.tileObject,l=typeof n=="function"?n(Dt(u)):n;if(c.onDataChanged(l),i&&a?.reusableContext&&typeof c.update=="function")try{c.update(a.reusableContext);}catch{}return {ok:true,tx:Number(e),ty:Number(t),gidx:s,before:u,after:c.tileObject}}function Nf(e,t,n={}){const r=n.ensureView!==false,{gidx:o,tv:i}=ft(Number(e),Number(t),r);if(o==null)throw new Error("MGTile: cols unavailable");if(!i)return {ok:true,tx:Number(e),ty:Number(t),gidx:o,tv:null,tileObject:void 0};const a=n.clone!==false,s=i.tileObject;return {ok:true,tx:Number(e),ty:Number(t),gidx:o,objectType:s?.objectType??null,tileObject:a?Dt(s):s,tvKeys:Object.keys(i||{}).sort(),tileView:i}}function Lr(e){if(!e)return null;const t=o=>o&&(typeof o.getGlobalPosition=="function"||typeof o.toGlobal=="function"),n=["container","root","view","tile","ground","base","floor","bg","background","baseSprite","tileSprite","displayObject","gfx","graphics","sprite"];for(const o of n)if(t(e[o]))return e[o];if(t(e))return e;const r=[e.container,e.root,e.view,e.displayObject,e.tileSprite,e.gfx,e.graphics,e.sprite];for(const o of r)if(t(o))return o;try{for(const o of Object.keys(e))if(t(e[o]))return e[o]}catch{}return null}function Vn(e){const t=Be(()=>e?.getGlobalPosition?.());if(t&&Number.isFinite(t.x)&&Number.isFinite(t.y))return {x:t.x,y:t.y};const n=Be(()=>e?.toGlobal?.({x:0,y:0}));return n&&Number.isFinite(n.x)&&Number.isFinite(n.y)?{x:n.x,y:n.y}:null}function $f(e){try{if(!e?.getBounds)return "center";const t=e.getBounds(),n=Vn(e);if(!n||!t||!Number.isFinite(t.width)||!Number.isFinite(t.height))return "center";const r=t.x+t.width/2,o=t.y+t.height/2;return Math.hypot(n.x-r,n.y-o)<Math.hypot(n.x-t.x,n.y-t.y)?"center":"topleft"}catch{return "center"}}function Df(){const e=mn(),t=e?.map?.cols,n=e?.map?.rows;if(!e||!Number.isFinite(t)||t<=1)return null;const r=Number.isFinite(n)&&n>1?n:null,o=[[0,0],[1,1],[Math.min(2,t-2),0],[0,1]];r&&r>2&&o.push([Math.floor(t/2),Math.floor(r/2)]);for(const[i,a]of o){if(i<0||a<0||i>=t||r&&a>=r)continue;const s=ft(i,a,true).tv,c=i+1<t?ft(i+1,a,true).tv:null,u=ft(i,a+1,true).tv,l=Lr(s),d=Lr(c),p=Lr(u);if(!l||!d||!p)continue;const f=Vn(l),g=Vn(d),m=Vn(p);if(!f||!g||!m)continue;const b={x:g.x-f.x,y:g.y-f.y},x={x:m.x-f.x,y:m.y-f.y},S=b.x*x.y-b.y*x.x;if(!Number.isFinite(S)||Math.abs(S)<1e-6)continue;const v=1/S,y={a:x.y*v,b:-x.x*v,c:-b.y*v,d:b.x*v},C={x:f.x-i*b.x-a*x.x,y:f.y-i*b.y-a*x.y},h=$f(l),k=h==="center"?C:{x:C.x+.5*(b.x+x.x),y:C.y+.5*(b.y+x.y)};return {ok:true,cols:t,rows:r,vx:b,vy:x,inv:y,anchorMode:h,originCenter:k}}return null}function Ps(){return De.xform=Df(),De.xformAt=Date.now(),{ok:!!De.xform?.ok,xform:De.xform}}function Ff(e,t={}){if(!e||!Number.isFinite(e.x)||!Number.isFinite(e.y))return null;const n=Number.isFinite(t.maxAgeMs)?Number(t.maxAgeMs):1500;(!De.xform?.ok||t.forceRebuild||Date.now()-De.xformAt>n)&&Ps();const r=De.xform;if(!r?.ok)return null;const o=e.x-r.originCenter.x,i=e.y-r.originCenter.y,a=r.inv.a*o+r.inv.b*i,s=r.inv.c*o+r.inv.d*i,c=Math.floor(a),u=Math.floor(s),l=[[c,u],[c+1,u],[c,u+1],[c+1,u+1]];let d=null,p=1/0;for(const[f,g]of l){if(f<0||g<0||f>=r.cols||Number.isFinite(r.rows)&&r.rows!==null&&g>=r.rows)continue;const m=r.originCenter.x+f*r.vx.x+g*r.vy.x,b=r.originCenter.y+f*r.vx.y+g*r.vy.y,x=(e.x-m)**2+(e.y-b)**2;x<p&&(p=x,d={tx:f,ty:g,fx:a,fy:s,x:e.x,y:e.y,gidx:null});}return d?(d.gidx=Vo(d.tx,d.ty),d):null}function zf(e,t){const n=De.xform;return n?.ok?{x:n.originCenter.x+e*n.vx.x+t*n.vy.x,y:n.originCenter.y+e*n.vx.y+t*n.vy.y}:null}function Fe(){if(!Is())throw new Error("MGTile: not ready. Call MGTile.init() first.")}function Gf(){return ["MGTile.init()","MGTile.hook()","MGTile.getTileObject(tx,ty) / inspect(tx,ty)","MGTile.setTileEmpty(tx,ty)","MGTile.setTilePlant(tx,ty,{...}) / setTileDecor / setTileEgg","MGTile.setTileObjectRaw(tx,ty,objOrFn)","MGTile.rebuildTransform() / pointToTile({x,y})","MGTile.tileToPoint(tx,ty)"].join(`
`)}const Ze={init:Ef,isReady:Is,hook:$e.hook,engine:Uo,tos:mn,gidx:(e,t)=>Vo(Number(e),Number(t)),getTileObject:(e,t,n={})=>(Fe(),mr(e,t,n)),inspect:(e,t,n={})=>(Fe(),Nf(e,t,n)),setTileEmpty:(e,t,n={})=>(Fe(),Mf(e,t,n)),setTilePlant:(e,t,n,r={})=>(Fe(),_f(e,t,n,r)),setTileDecor:(e,t,n,r={})=>(Fe(),Lf(e,t,n,r)),setTileEgg:(e,t,n,r={})=>(Fe(),Rf(e,t,n,r)),setTileObjectRaw:(e,t,n,r={})=>(Fe(),Of(e,t,n,r)),rebuildTransform:()=>(Fe(),Ps()),pointToTile:(e,t={})=>(Fe(),Ff(e,t)),tileToPoint:(e,t)=>(Fe(),zf(e,t)),getTransform:()=>(Fe(),De.xform),help:Gf};function jf(){return {ready:false,app:null,renderer:null,stage:null,ticker:null,tileSets:new Map,highlights:new Map,watches:new Map,fades:new Map,fadeWatches:new Map}}const W=jf();function Es(){return W.ready}async function Bf(e=15e3){if(W.ready)return ao(),true;if(await $e.init(e),W.app=$e.app(),W.ticker=$e.ticker(),W.renderer=$e.renderer(),W.stage=$e.stage(),!W.app||!W.ticker)throw new Error("MGPixi: PIXI app/ticker not found");return W.ready=true,ao(),true}function ao(){const e=M;return e.$PIXI=e.PIXI||null,e.$app=W.app||null,e.$renderer=W.renderer||null,e.$stage=W.stage||null,e.$ticker=W.ticker||null,e.__MG_PIXI__={PIXI:e.$PIXI,app:e.$app,renderer:e.$renderer,stage:e.$stage,ticker:e.$ticker,ready:W.ready},e.__MG_PIXI__}function Yo(e){return !!e&&typeof e=="object"&&!Array.isArray(e)}function so(e){return !!(e&&typeof e.getBounds=="function"&&("parent"in e||"children"in e))}function ir(e){return !!(e&&typeof e.tint=="number")}function mt(e){return !!(e&&typeof e.alpha=="number")}function Kn(e,t,n){return e+(t-e)*n}function Wf(e,t,n){const r=e>>16&255,o=e>>8&255,i=e&255,a=t>>16&255,s=t>>8&255,c=t&255,u=Kn(r,a,n)|0,l=Kn(o,s,n)|0,d=Kn(i,c,n)|0;return u<<16|l<<8|d}function Hf(e,t=900){const n=[],r=[e];for(;r.length&&n.length<t;){const o=r.pop();if(!o)continue;ir(o)&&n.push(o);const i=o.children;if(Array.isArray(i))for(let a=i.length-1;a>=0;a--)r.push(i[a]);}return n}function Uf(e,t=25e3){const n=[],r=[e];let o=0;for(;r.length&&o++<t;){const i=r.pop();if(!i)continue;mt(i)&&n.push(i);const a=i.children;if(Array.isArray(a))for(let s=a.length-1;s>=0;s--)r.push(a[s]);}return n}const Vf=["plantVisual","cropVisual","slotVisual","slotView","displayObject","view","container","root","sprite","gfx","graphics"];function lo(e){if(!e)return null;if(so(e))return e;if(!Yo(e))return null;for(const t of Vf){const n=e[t];if(so(n))return n}return null}function Kf(e,t){const n=[{o:e,d:0}],r=new Set,o=6;for(;n.length;){const{o:i,d:a}=n.shift();if(!(!i||a>o)&&!r.has(i)){if(r.add(i),Array.isArray(i)){if(i.length===t){const s=new Array(t);let c=true;for(let u=0;u<t;u++){const l=lo(i[u]);if(!l){c=false;break}s[u]=l;}if(c)return s}for(const s of i)n.push({o:s,d:a+1});continue}if(Yo(i)){const s=i;for(const c of Object.keys(s))n.push({o:s[c],d:a+1});}}}return null}function Ms(e){if(!Array.isArray(e))return [];const t=new Set,n=[];for(const r of e){let o,i;if(Array.isArray(r))o=r[0],i=r[1];else if(Yo(r))o=r.x??r.tx,i=r.y??r.ty;else continue;if(o=Number(o),i=Number(i),!Number.isFinite(o)||!Number.isFinite(i))continue;o|=0,i|=0;const a=`${o},${i}`;t.has(a)||(t.add(a),n.push({x:o,y:i}));}return n}function Yf(e,t){const n=String(e||"").trim();if(!n)throw new Error("MGPixi.defineTileSet: empty name");const r=Ms(t);return W.tileSets.set(n,r),{ok:true,name:n,count:r.length}}function qf(e){return W.tileSets.delete(String(e||"").trim())}function Xf(){return Array.from(W.tileSets.keys()).sort((e,t)=>e.localeCompare(t))}function _s(e){return !!(e&&(e.tileSet!=null||Array.isArray(e.tiles)))}function qo(e){const n=Ze.tos?.()?.tileViews;if(!n?.entries)throw new Error("MGPixi: TOS.tileViews not found");if(!_s(e))return {entries:Array.from(n.entries()),gidxSet:null};let r=[];if(e.tileSet!=null){const i=String(e.tileSet||"").trim(),a=W.tileSets.get(i);if(!a)throw new Error(`MGPixi: tileSet not found "${i}"`);r=a;}else r=Ms(e.tiles||[]);const o=new Map;for(const i of r){const a=Ze.getTileObject(i.x,i.y,{ensureView:true,clone:false});a?.tileView&&a.gidx!=null&&o.set(a.gidx,a.tileView);}return {entries:Array.from(o.entries()),gidxSet:new Set(o.keys())}}function Xo(e){const t=W.highlights.get(e);if(!t)return  false;Be(()=>W.ticker?.remove(t.tick)),t.root&&t.baseAlpha!=null&&mt(t.root)&&Be(()=>{t.root.alpha=t.baseAlpha;});for(const n of t.tint)n.o&&ir(n.o)&&Be(()=>{n.o.tint=n.baseTint;});return W.highlights.delete(e),true}function Ls(e=null){for(const t of Array.from(W.highlights.keys()))e&&!String(t).startsWith(e)||Xo(t);return  true}function Rs(e,t={}){if(!so(e))throw new Error("MGPixi.highlightPulse: invalid root");const n=String(t.key||`hl:${Math.random().toString(16).slice(2)}`);if(W.highlights.has(n))return n;const r=mt(e)?Number(e.alpha):null,o=Ve(Number(t.minAlpha??.12),0,1),i=Ve(Number(t.maxAlpha??1),0,1),a=Number(t.speed??1.25),s=(t.tint??8386303)>>>0,c=Ve(Number(t.tintMix??.85),0,1),u=t.deepTint!==false,l=[];if(u)for(const f of Hf(e))l.push({o:f,baseTint:f.tint});else ir(e)&&l.push({o:e,baseTint:e.tint});const d=performance.now(),p=()=>{const f=(performance.now()-d)/1e3,g=(Math.sin(f*Math.PI*2*a)+1)/2,m=g*g*(3-2*g);r!=null&&mt(e)&&(e.alpha=Ve(Kn(o,i,m)*r,0,1));const b=m*c;for(const x of l)x.o&&ir(x.o)&&(x.o.tint=Wf(x.baseTint,s,b));};return W.ticker?.add(p),W.highlights.set(n,{root:e,tick:p,baseAlpha:r,tint:l}),n}function Jf(e,t){const n=e?.mutations;if(!Array.isArray(n))return  false;for(const r of n)if(String(r||"").toLowerCase()===t)return  true;return  false}function Os(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.highlightMutation: empty mutation");const{entries:r,gidxSet:o}=qo(t),i=`hlmut:${n}:`;if(t.clear===true)if(!o)Ls(i);else for(const d of Array.from(W.highlights.keys())){if(!d.startsWith(i))continue;const p=d.split(":"),f=Number(p[2]);o.has(f)&&Xo(d);}const a={tint:(t.tint??8386303)>>>0,minAlpha:Number(t.minAlpha??.12),maxAlpha:Number(t.maxAlpha??1),speed:Number(t.speed??1.25),tintMix:Number(t.tintMix??.85),deepTint:t.deepTint!==false};let s=0,c=0,u=0,l=0;for(const[d,p]of r){const f=p?.tileObject;if(!f||f.objectType!=="plant")continue;const g=f.slots;if(!Array.isArray(g)||g.length===0)continue;let m=false;const b=[];for(let v=0;v<g.length;v++)Jf(g[v],n)&&(b.push(v),m=true);if(!m)continue;s++,c+=b.length;const x=p?.childView?.plantVisual||p?.childView||p,S=Kf(x,g.length);if(!S){l+=b.length;continue}for(const v of b){const y=S[v];if(!y){l++;continue}const C=`${i}${d}:${v}`;W.highlights.has(C)||(Rs(y,{key:C,...a}),u++);}}return {ok:true,mutation:n,filtered:!!o,plantsMatched:s,matchedSlots:c,newHighlights:u,failedSlots:l}}function Qf(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchMutation: empty mutation");const r=`watchmut:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,o=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,i=W.watches.get(r);i&&clearInterval(i);const a=setInterval(()=>{Be(()=>Os(n,{...t,clear:!1}));},o);return W.watches.set(r,a),{ok:true,key:r,mutation:n,intervalMs:o}}function Zf(e){const t=String(e||"").trim();if(!t)return  false;if(!t.startsWith("watchmut:")){const r=t.toLowerCase();let o=0;for(const[i,a]of Array.from(W.watches.entries()))i.startsWith(`watchmut:${r}:`)&&(clearInterval(a),W.watches.delete(i),o++);return o>0}const n=W.watches.get(t);return n?(clearInterval(n),W.watches.delete(t),true):false}function eg(e){const t=e?.childView?.plantVisual||e?.childView?.cropVisual||e?.childView||e?.displayObject||e;return lo(t)||lo(e?.displayObject)||null}function Ns(e){const t=W.fades.get(e);if(!t)return  false;for(const n of t.targets)n.o&&mt(n.o)&&Number.isFinite(n.baseAlpha)&&Be(()=>{n.o.alpha=n.baseAlpha;});return W.fades.delete(e),true}function co(e=null){for(const t of Array.from(W.fades.keys()))e&&!String(t).startsWith(e)||Ns(t);return  true}function $s(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.clearSpeciesFade: empty species");const r=`fade:${n}:`;if(!_s(t))return co(r);const{gidxSet:o}=qo(t);if(!o)return co(r);for(const i of Array.from(W.fades.keys())){if(!i.startsWith(r))continue;const a=Number(i.slice(r.length));o.has(a)&&Ns(i);}return  true}function Ds(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.fadeSpecies: empty species");const r=Ve(Number(t.alpha??.2),0,1),o=t.deep===true,{entries:i,gidxSet:a}=qo(t),s=`fade:${n}:`;t.clear===true&&$s(n,t);let c=0,u=0,l=0,d=0;for(const[p,f]of i){const g=f?.tileObject;if(!g||g.objectType!=="plant")continue;c++;const m=String(g.species||"").trim().toLowerCase();if(!m||m!==n)continue;u++;const b=eg(f);if(!b||!mt(b)){d++;continue}const x=`${s}${p}`;if(W.fades.has(x)){Be(()=>{b.alpha=r;}),l++;continue}const S=o?Uf(b):[b],v=[];for(const y of S)mt(y)&&v.push({o:y,baseAlpha:Number(y.alpha)});for(const y of v)Be(()=>{y.o.alpha=r;});W.fades.set(x,{targets:v}),l++;}return {ok:true,species:n,alpha:r,deep:o,filtered:!!a,plantsSeen:c,matchedPlants:u,applied:l,failed:d,totalFades:W.fades.size}}function tg(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchFadeSpecies: empty species");const r=`watchfade:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,o=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,i=W.fadeWatches.get(r);i&&clearInterval(i);const a=setInterval(()=>{Be(()=>Ds(n,{...t,clear:!1}));},o);return W.fadeWatches.set(r,a),{ok:true,key:r,species:n,intervalMs:o}}function ng(e){const t=String(e||"").trim();if(!t)return  false;if(!t.startsWith("watchfade:")){const r=t.toLowerCase();let o=0;for(const[i,a]of Array.from(W.fadeWatches.entries()))i.startsWith(`watchfade:${r}:`)&&(clearInterval(a),W.fadeWatches.delete(i),o++);return o>0}const n=W.fadeWatches.get(t);return n?(clearInterval(n),W.fadeWatches.delete(t),true):false}function rg(e){const t=Array.isArray(e?.slots)?e.slots:[];return {objectType:"plant",species:e?.species??null,plantedAt:e?.plantedAt??null,maturedAt:e?.maturedAt??null,slotCount:t.length,slots:t.map((n,r)=>({idx:r,mutations:Array.isArray(n?.mutations)?n.mutations.slice():[]}))}}function og(e,t,n={}){const r=Number(e)|0,o=Number(t)|0,i=n.ensureView!==false,a=Ze.getTileObject(r,o,{ensureView:i,clone:false}),s=a?.tileView||null,c=s?.tileObject,u={ok:true,tx:r,ty:o,gidx:a?.gidx??Ze.gidx?.(r,o)??null,hasTileView:!!s,objectType:c?.objectType??null,tileObject:c??null,summary:c?.objectType==="plant"?rg(c):c?{objectType:c.objectType??null}:null,display:s?s.childView?.plantVisual||s.childView||s.displayObject||s:null};return n.log!==false&&Be(()=>console.log("[MGPixi.inspectTile]",u)),u}function ig(e,t,n){const r=M.PIXI;if(!r)return;let o=W.stage.getChildByName("gemini-overlay");o||(o=new r.Container,o.name="gemini-overlay",W.stage.addChild(o));const i=n.key;let a=o.getChildByName(i);a||(a=new r.Graphics,a.name=i,o.addChild(a));const s=Ze.tileToPoint(e,t);if(!s)return;a.clear(),a.lineStyle(2,n.tint??65280,n.alpha??1),a.beginFill(n.tint??65280,(n.alpha??1)*.2);const c=Ze.getTransform(),u=c?Math.hypot(c.vx.x,c.vx.y):32,l=c?Math.hypot(c.vy.x,c.vy.y):32;a.drawRect(0,0,u,l),a.endFill(),a.x=s.x,a.y=s.y,c&&(a.rotation=Math.atan2(c.vx.y,c.vx.x));}function ag(e){const t=W.stage?.getChildByName("gemini-overlay");if(!t)return  false;const n=t.getChildByName(e);return n?(t.removeChild(n),n.destroy?.(),true):false}function ve(){if(!Es())throw new Error("MGPixi: call MGPixi.init() first")}const hr={init:Bf,isReady:Es,expose:ao,get app(){return W.app},get renderer(){return W.renderer},get stage(){return W.stage},get ticker(){return W.ticker},get PIXI(){return M.PIXI||null},defineTileSet:(e,t)=>(ve(),Yf(e,t)),deleteTileSet:e=>(ve(),qf(e)),listTileSets:()=>(ve(),Xf()),highlightPulse:(e,t)=>(ve(),Rs(e,t)),stopHighlight:e=>(ve(),Xo(e)),clearHighlights:e=>(ve(),Ls(e)),drawOverlayBox:(e,t,n)=>(ve(),ig(e,t,n)),stopOverlay:e=>(ve(),ag(e)),highlightMutation:(e,t)=>(ve(),Os(e,t)),watchMutation:(e,t)=>(ve(),Qf(e,t)),stopWatchMutation:e=>(ve(),Zf(e)),inspectTile:(e,t,n)=>(ve(),og(e,t,n)),fadeSpecies:(e,t)=>(ve(),Ds(e,t)),clearSpeciesFade:(e,t)=>(ve(),$s(e,t)),clearFades:e=>(ve(),co(e)),watchFadeSpecies:(e,t)=>(ve(),tg(e,t)),stopWatchFadeSpecies:e=>(ve(),ng(e))};function sg(){return {ready:false,baseUrl:null,urls:{ambience:new Map,music:new Map},sfx:{mp3Url:null,atlasUrl:null,atlas:null,groups:new Map,buffer:null},tracks:{ambience:null,music:null},ctx:null}}const V=sg();function Fs(){return V.ready}const Mi=M??window;async function zs(){const e=V.ctx;if(e)return e;const t=Mi.AudioContext||Mi.webkitAudioContext;if(!t)throw new Error("WebAudio not supported");const n=new t;return V.ctx=n,n}async function Gs(){if(V.ctx&&V.ctx.state==="suspended")try{await V.ctx.resume();}catch{}}const lg={sfx:"soundEffectsVolume",music:"musicVolume",ambience:"ambienceVolume"},cg={sfx:"soundEffectsVolumeAtom",music:"musicVolumeAtom",ambience:"ambienceVolumeAtom"},tn=.001,nn=.2;function _i(e,t=NaN){try{const n=localStorage.getItem(e);if(n==null)return t;let r;try{r=JSON.parse(n);}catch{r=n;}if(typeof r=="number"&&Number.isFinite(r))return r;if(typeof r=="string"){const o=parseFloat(r);if(Number.isFinite(o))return o}}catch{}return t}function uo(e){const t=lg[e],n=cg[e];if(!t)return {atom:nn,vol100:Rn(nn)};const r=_i(t,NaN);if(Number.isFinite(r)){const i=Ve(r,0,1);return {atom:i,vol100:Rn(i)}}if(n){const i=_i(n,NaN);if(Number.isFinite(i)){const a=Ve(i,0,1);return {atom:a,vol100:Rn(a)}}}const o=nn;return {atom:o,vol100:Rn(o)}}function dg(e){const t=Number(e);if(!Number.isFinite(t))return null;if(t<=0)return 0;const r=(Ve(t,1,100)-1)/99;return tn+r*(nn-tn)}function Rn(e){const t=Ve(Number(e),0,1);if(t<=tn)return 0;const n=(t-tn)/(nn-tn);return Math.round(1+n*99)}function js(e,t){if(t==null)return uo(e).atom;const n=dg(t);return n===null?uo(e).atom:dd(n)}function ug(e){const t=new Map,n=(r,o)=>{t.has(r)||t.set(r,[]),t.get(r).push(o);};for(const r of Object.keys(e||{})){const o=/^(.*)_([A-Z])$/.exec(r);o?.[1]?n(o[1],r):n(r,r);}for(const[r,o]of Array.from(t.entries()))o.sort((i,a)=>i.localeCompare(a)),t.set(r,o);V.sfx.groups=t;}function pg(e){const t=V.sfx.atlas;if(!t)throw new Error("SFX atlas not loaded");if(t[e])return e;const n=V.sfx.groups.get(e);if(n?.length)return n[Math.random()*n.length|0];throw new Error(`Unknown sfx/group: ${e}`)}async function fg(){if(V.sfx.buffer)return V.sfx.buffer;if(!V.sfx.mp3Url)throw new Error("SFX mp3 url missing");const e=await zs();await Gs();const n=await(await Da(V.sfx.mp3Url)).arrayBuffer(),r=await new Promise((o,i)=>{const a=e.decodeAudioData(n,o,i);a?.then&&a.then(o,i);});return V.sfx.buffer=r,r}async function gg(e,t={}){if(!V.ready)throw new Error("MGAudio not ready yet");const n=String(e||"").trim();if(!n)throw new Error("Missing sfx name");const r=pg(n),o=V.sfx.atlas[r];if(!o)throw new Error(`Missing segment for sfx: ${r}`);const i=await zs();await Gs();const a=await fg(),s=Math.max(0,+o.start||0),c=Math.max(s,+o.end||s),u=Math.max(.01,c-s),l=js("sfx",t.volume),d=i.createGain();d.gain.value=l,d.connect(i.destination);const p=i.createBufferSource();return p.buffer=a,p.connect(d),p.start(0,s,u),{name:r,source:p,start:s,end:c,duration:u,volume:l}}let On=null;async function mg(){return V.ready?true:On||(On=(async()=>{V.baseUrl=await bt.base();const e=await Je.load(V.baseUrl),t=Je.getBundle(e,"audio");if(!t)throw new Error("No audio bundle in manifest");for(const n of t.assets||[])for(const r of n.src||[]){if(typeof r!="string")continue;const o=/^audio\/(ambience|music)\/(.+)\.mp3$/i.exec(r);if(o){const i=o[1].toLowerCase(),a=o[2];V.urls[i].set(a,Xe(V.baseUrl,r));continue}/^audio\/sfx\/sfx\.mp3$/i.test(r)&&(V.sfx.mp3Url=Xe(V.baseUrl,r)),/^audio\/sfx\/sfx\.json$/i.test(r)&&(V.sfx.atlasUrl=Xe(V.baseUrl,r));}if(!V.sfx.atlasUrl)throw new Error("Missing audio/sfx/sfx.json in manifest");return V.sfx.atlas=await _o(V.sfx.atlasUrl),ug(V.sfx.atlas),V.ready=true,true})(),On)}function Bs(e){if(e!=="music"&&e!=="ambience")return  false;const t=V.tracks[e];if(t){try{t.pause();}catch{}try{t.src="";}catch{}}return V.tracks[e]=null,true}function hg(e,t,n={}){if(!V.ready)throw new Error("MGAudio not ready yet");if(e!=="music"&&e!=="ambience")throw new Error(`Invalid category: ${e}`);const r=V.urls[e].get(t);if(!r)throw new Error(`Unknown ${e}: ${t}`);Bs(e);const o=new Audio(r);return o.loop=!!n.loop,o.volume=js(e,n.volume),o.preload="auto",o.play().catch(()=>{}),V.tracks[e]=o,o}function bg(e,t={}){const n=String(e||"").trim();return n==="music"||n==="ambience"?Array.from(V.urls[n].keys()).sort():n==="sfx"?V.sfx.atlas?t.groups?Array.from(V.sfx.groups.keys()).sort():Object.keys(V.sfx.atlas).sort():[]:[]}function yg(){return ["sfx","music","ambience"]}function vg(){return Array.from(V.sfx.groups.keys()).sort((e,t)=>e.localeCompare(t))}function xg(e,t){const n=String(e||"").trim().toLowerCase(),r=String(t||"").trim();if(!r||n!=="music"&&n!=="ambience")return  false;const o=V.urls[n],i=r.toLowerCase();for(const a of Array.from(o.keys()))if(a.toLowerCase()===i)return  true;return  false}function wg(e){const t=String(e||"").trim();if(!t)return  false;const n=t.toLowerCase();for(const r of Array.from(V.sfx.groups.keys()))if(r.toLowerCase()===n)return  true;return  false}function kg(e,t){const n=String(e||"").trim().toLowerCase(),r=String(t||"").trim();if(!r)throw new Error("getTrackUrl(category, name) missing name");if(n!=="music"&&n!=="ambience")throw new Error(`Invalid category: ${e}`);const o=V.urls[n],i=r.toLowerCase();for(const[a,s]of Array.from(o.entries()))if(a.toLowerCase()===i)return s;return null}function Sg(){const{categoryVolume:e}=require("./volume");return V.tracks.music&&(V.tracks.music.volume=e("music").atom),V.tracks.ambience&&(V.tracks.ambience.volume=e("ambience").atom),true}function Ye(){if(!Fs())throw new Error("MGAudio not ready yet")}async function Cg(e,t,n={}){const r=String(e||"").trim(),o=String(t||"").trim();if(!r||!o)throw new Error("play(category, asset) missing args");if(r==="sfx")return gg(o,n);if(r==="music"||r==="ambience")return hg(r,o,n);throw new Error(`Unknown category: ${r}`)}const Jo={init:mg,isReady:Fs,play:Cg,stop:e=>(Ye(),Bs(e)),list:(e,t)=>(Ye(),bg(e,t)),refreshVolumes:()=>(Ye(),Sg()),categoryVolume:e=>(Ye(),uo(e)),getCategories:()=>(Ye(),yg()),getGroups:()=>(Ye(),vg()),hasTrack:(e,t)=>(Ye(),xg(e,t)),hasGroup:e=>(Ye(),wg(e)),getTrackUrl:(e,t)=>(Ye(),kg(e,t))};function Ag(){return {ready:false,baseUrl:null,byCat:new Map,byBase:new Map,overlay:null,live:new Set,defaultParent:null}}const le=Ag();function Ws(){return le.ready}let Nn=null;async function Tg(){return le.ready?true:Nn||(Nn=(async()=>{le.baseUrl=await bt.base();const e=await Je.load(le.baseUrl),t=Je.getBundle(e,"cosmetic");if(!t)throw new Error("No 'cosmetic' bundle in manifest");le.byCat.clear(),le.byBase.clear();for(const n of t.assets||[])for(const r of n.src||[]){if(typeof r!="string"||!/^cosmetic\/.+\.png$/i.test(r))continue;const i=r.split("/").pop().replace(/\.png$/i,""),a=i.indexOf("_");if(a<0)continue;const s=i.slice(0,a),c=i.slice(a+1),u=Xe(le.baseUrl,r);le.byBase.set(i,u),le.byCat.has(s)||le.byCat.set(s,new Map),le.byCat.get(s).set(c,u);}return le.ready=true,true})(),Nn)}function po(e){let t=String(e||"").trim();return t?(t=t.replace(/^cosmetic\//i,""),t=t.replace(/\.png$/i,""),t):""}function Ig(e,t){if(t===void 0){const i=po(e),a=i.indexOf("_");return a<0?{cat:"",asset:i,base:i}:{cat:i.slice(0,a),asset:i.slice(a+1),base:i}}const n=String(e||"").trim(),r=po(t),o=r.includes("_")?r:`${n}_${r}`;if(r.includes("_")&&!n){const i=r.indexOf("_");return {cat:r.slice(0,i),asset:r.slice(i+1),base:r}}return {cat:n,asset:r.replace(/^.+?_/,""),base:o}}function Pg(){return Array.from(le.byCat.keys()).sort((e,t)=>e.localeCompare(t))}function Eg(e){const t=le.byCat.get(String(e||"").trim());return t?Array.from(t.keys()).sort((n,r)=>n.localeCompare(r)):[]}function fo(e,t){const{cat:n,asset:r,base:o}=Ig(e,t),i=le.byBase.get(o);if(i)return i;const s=le.byCat.get(n)?.get(r);if(s)return s;if(!le.baseUrl)throw new Error("MGCosmetic not initialized");if(!o)throw new Error("Invalid cosmetic name");return Xe(le.baseUrl,`cosmetic/${o}.png`)}const Li=M?.document??document;function Mg(){if(le.overlay)return le.overlay;const e=Li.createElement("div");return e.id="MG_COSMETIC_OVERLAY",e.style.cssText=["position:fixed","left:0","top:0","width:100vw","height:100vh","pointer-events:none","z-index:99999999"].join(";"),Li.documentElement.appendChild(e),le.overlay=e,e}function _g(){const e=le.defaultParent;if(!e)return null;try{return typeof e=="function"?e():e}catch{return null}}function Lg(e){return le.defaultParent=e,true}const Rg=M?.document??document;function go(e,t,n){if(!le.ready)throw new Error("MGCosmetic not ready yet");let r,o;typeof t=="object"&&t!==null?(r=t,o=void 0):typeof t=="string"?(o=t,r=n||{}):(o=void 0,r=n||{});const i=o!==void 0?fo(e,o):fo(e),a=Rg.createElement("img");if(a.decoding="async",a.loading="eager",a.src=i,a.alt=r.alt!=null?String(r.alt):po(o??e),r.className&&(a.className=String(r.className)),r.width!=null&&(a.style.width=String(r.width)),r.height!=null&&(a.style.height=String(r.height)),r.opacity!=null&&(a.style.opacity=String(r.opacity)),r.style&&typeof r.style=="object")for(const[s,c]of Object.entries(r.style))try{a.style[s]=String(c);}catch{}return a}function Og(e,t,n){let r,o;typeof t=="object"&&t!==null?(r=t,o=void 0):typeof t=="string"?(o=t,r=n||{}):(o=void 0,r=n||{});const i=r.parent||_g()||Mg(),a=o!==void 0?go(e,o,r):go(e,r);if(i===le.overlay||r.center||r.x!=null||r.y!=null||r.absolute){a.style.position="absolute",a.style.pointerEvents="none",a.style.zIndex=String(r.zIndex??999999);const c=r.scale??1,u=r.rotation??0;if(r.center)a.style.left="50%",a.style.top="50%",a.style.transform=`translate(-50%, -50%) scale(${c}) rotate(${u}rad)`;else {const l=r.x??innerWidth/2,d=r.y??innerHeight/2;a.style.left=`${l}px`,a.style.top=`${d}px`,a.style.transform=`scale(${c}) rotate(${u}rad)`,r.anchor==="center"&&(a.style.transform=`translate(-50%, -50%) scale(${c}) rotate(${u}rad)`);}}return i.appendChild(a),le.live.add(a),a.__mgDestroy=()=>{try{a.remove();}catch{}le.live.delete(a);},a}function Ng(){for(const e of Array.from(le.live))e.__mgDestroy?.();}function ct(){if(!Ws())throw new Error("MGCosmetic not ready yet")}const Qo={init:Tg,isReady:Ws,categories:()=>(ct(),Pg()),list:e=>(ct(),Eg(e)),url:((e,t)=>(ct(),fo(e,t))),create:((e,t,n)=>(ct(),go(e,t,n))),show:((e,t,n)=>(ct(),Og(e,t,n))),attach:e=>(ct(),Lg(e)),clear:()=>(ct(),Ng())};async function Hs(e){const t=[{name:"Data",init:()=>ae.init()},{name:"CustomModal",init:()=>fn.init()},{name:"Sprites",init:()=>ge.init()},{name:"TileObjectSystem",init:()=>Ze.init()},{name:"Pixi",init:()=>hr.init()},{name:"Audio",init:()=>Jo.init()},{name:"Cosmetics",init:()=>Qo.init()}];await Promise.all(t.map(async n=>{e?.({status:"start",name:n.name});try{await n.init(),e?.({status:"success",name:n.name});}catch(r){console.error(`[${n.name}] failed`,r),e?.({status:"error",name:n.name,error:r});}})),console.log("[Gemini] Modules ready. Access via Gemini.Modules in console.");}const Ri=Object.freeze(Object.defineProperty({__proto__:null,MGAssets:bt,MGAudio:Jo,MGCosmetic:Qo,MGCustomModal:fn,MGData:ae,MGEnvironment:Qe,MGManifest:Je,MGPixi:hr,MGPixiHooks:$e,MGSprite:ge,MGTile:Ze,MGVersion:Oo,initAllModules:Hs},Symbol.toStringTag,{value:"Module"})),Zo=We.AUTO_FAVORITE,Us={enabled:false,mode:"simple",simple:{enabled:false,favoriteSpecies:[],favoriteMutations:[]}};function ht(){return Pe(Zo,Us)}function ei(e){Ee(Zo,e);}function Vs(e){const n={...ht(),...e};return ei(n),n}function ti(e){const t=ht();return t.mode="simple",t.simple={...t.simple,...e},ei(t),t}function $g(e){ti({favoriteSpecies:e});}function Dg(e){ti({favoriteMutations:e});}function Oi(){return ht().enabled}function Ke(e,t){if(e===t)return  true;if(e===null||t===null)return e===t;if(typeof e!=typeof t)return  false;if(typeof e!="object")return e===t;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return  false;for(let a=0;a<e.length;a++)if(!Ke(e[a],t[a]))return  false;return  true}if(Array.isArray(e)||Array.isArray(t))return  false;const n=e,r=t,o=Object.keys(n),i=Object.keys(r);if(o.length!==i.length)return  false;for(const a of o)if(!Object.prototype.hasOwnProperty.call(r,a)||!Ke(n[a],r[a]))return  false;return  true}const Ni={currentGardenTile:"myCurrentGardenTileAtom",globalTileIndex:"myCurrentGlobalTileIndexAtom",gardenObject:"myCurrentGardenObjectAtom",isMature:"isGardenObjectMatureAtom",isInMyGarden:"isInMyGardenAtom",gardenName:"currentGardenNameAtom",sortedSlotIndices:"myCurrentSortedGrowSlotIndicesAtom",currentGrowSlotIndex:"myCurrentGrowSlotIndexAtom"},$i={position:{globalIndex:null,localIndex:null},tile:{type:null,isEmpty:true},garden:{name:null,isOwner:false,playerSlotIndex:null},object:{type:null,data:null,isMature:false},plant:null};function Fg(e){const t=e.currentGardenTile;return {globalIndex:e.globalTileIndex,localIndex:t?.localTileIndex??null}}function zg(e){return {type:e.currentGardenTile?.tileType??null,isEmpty:e.gardenObject===null}}function Gg(e){const t=e.currentGardenTile;return {name:e.gardenName,isOwner:e.isInMyGarden??false,playerSlotIndex:t?.userSlotIdx??null}}function jg(e){const t=e.gardenObject;return t?{type:t.objectType,data:t,isMature:e.isMature??false}:{type:null,data:null,isMature:false}}function Bg(e){const t=e.gardenObject;if(!t||t.objectType!=="plant")return null;const n=t,r=e.sortedSlotIndices??[];return {species:n.species,slots:n.slots??[],currentSlotIndex:e.currentGrowSlotIndex,sortedSlotIndices:r,nextHarvestSlotIndex:r.length>0?r[0]:null}}function Di(e){return {position:Fg(e),tile:zg(e),garden:Gg(e),object:jg(e),plant:Bg(e)}}function Fi(e){return JSON.stringify({globalIndex:e.position.globalIndex,localIndex:e.position.localIndex,tileType:e.tile.type,isEmpty:e.tile.isEmpty,gardenName:e.garden.name,isOwner:e.garden.isOwner,playerSlotIndex:e.garden.playerSlotIndex,objectType:e.object.type,isMature:e.object.isMature,plantSpecies:e.plant?.species??null,slotCount:e.plant?.slots.length??0})}function Wg(e,t){return e.type!==t.type||e.isMature!==t.isMature?true:e.data===null&&t.data===null?false:e.data===null||t.data===null?true:!Ke(e.data,t.data)}function Hg(e,t){return e===null&&t===null?false:e===null||t===null||e.species!==t.species||e.currentSlotIndex!==t.currentSlotIndex||e.nextHarvestSlotIndex!==t.nextHarvestSlotIndex||e.slots.length!==t.slots.length?true:!Ke(e.sortedSlotIndices,t.sortedSlotIndices)}function Ug(e,t){return e.name!==t.name||e.isOwner!==t.isOwner||e.playerSlotIndex!==t.playerSlotIndex}function Vg(){let e=$i,t=$i,n=false;const r=[],o={all:new Set,stable:new Set,object:new Set,plantInfo:new Set,garden:new Set},i={},a=Object.keys(Ni),s=new Set;function c(){if(s.size<a.length)return;const l=Di(i);if(!Ke(e,l)&&(t=e,e=l,!!n)){for(const d of o.all)d(e,t);if(Fi(t)!==Fi(e))for(const d of o.stable)d(e,t);if(Wg(t.object,e.object)){const d={current:e.object,previous:t.object};for(const p of o.object)p(d);}if(Hg(t.plant,e.plant)){const d={current:e.plant,previous:t.plant};for(const p of o.plantInfo)p(d);}if(Ug(t.garden,e.garden)){const d={current:e.garden,previous:t.garden};for(const p of o.garden)p(d);}}}async function u(){if(n)return;const l=a.map(async d=>{const p=Ni[d],f=await ce.subscribe(p,g=>{i[d]=g,s.add(d),c();});r.push(f);});await Promise.all(l),n=true,s.size===a.length&&(e=Di(i));}return u(),{get(){return e},subscribe(l,d){return o.all.add(l),d?.immediate!==false&&n&&s.size===a.length&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,d){return o.stable.add(l),d?.immediate!==false&&n&&s.size===a.length&&l(e,e),()=>o.stable.delete(l)},subscribeObject(l,d){return o.object.add(l),d?.immediate&&n&&s.size===a.length&&l({current:e.object,previous:e.object}),()=>o.object.delete(l)},subscribePlantInfo(l,d){return o.plantInfo.add(l),d?.immediate&&n&&s.size===a.length&&l({current:e.plant,previous:e.plant}),()=>o.plantInfo.delete(l)},subscribeGarden(l,d){return o.garden.add(l),d?.immediate&&n&&s.size===a.length&&l({current:e.garden,previous:e.garden}),()=>o.garden.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.object.clear(),o.plantInfo.clear(),o.garden.clear(),n=false;}}}let Rr=null;function Kg(){return Rr||(Rr=Vg()),Rr}const Yt={Gold:25,Rainbow:50,Frozen:10,Chilled:5,Wet:2},Yg=new Set(["Gold","Rainbow"]),qg=new Set(["Frozen","Chilled","Wet"]);function Ks(e){let t=1,n=0,r=0;for(const o of e)o==="Gold"||o==="Rainbow"?o==="Rainbow"?t=Yt.Rainbow:t===1&&(t=Yt.Gold):o in Yt&&(n+=Yt[o],r++);return t*(1+n-r)}function Xg(e){return Yt[e]??null}function Jg(e){return Yg.has(e)}function Qg(e){return qg.has(e)}function Zg(e,t){const n=ni(e);if(!n)return 50;const r=n.maxScale;if(t<=1)return 50;if(t>=r)return 100;const o=(t-1)/(r-1);return Math.floor(50+50*o)}function em(e,t,n){const r=ni(e);if(!r)return 0;const o=r.baseSellPrice,i=Ks(n);return Math.round(o*t*i)}function tm(e,t,n){if(n>=t)return 100;if(n<=e)return 0;const r=t-e,o=n-e;return Math.floor(o/r*100)}function nm(e,t){return t>=e}function ni(e){const t=ae.get("plants");if(!t)return null;const n=t[e];return n?.crop?{baseSellPrice:n.crop.baseSellPrice??0,maxScale:n.crop.maxScale??1,growTime:n.crop.growTime??0}:null}const Ys=3600,Or=80,rm=100,qt=30;function br(e){return e/Ys}function yr(e,t){const n=hn(e);if(!n)return Or;const r=n.maxScale;if(t<=1)return Or;if(t>=r)return rm;const o=(t-1)/(r-1);return Math.floor(Or+20*o)}function vr(e,t,n){const r=hn(e);if(!r)return n-qt;const o=r.hoursToMature,i=t/Ys,a=qt/o,s=Math.min(a*i,qt),c=n-qt;return Math.floor(c+s)}function xr(e,t){const n=hn(e);return n?t>=n.hoursToMature:false}function qs(e){const t=hn(e);return t?qt/t.hoursToMature:0}function om(e,t,n){const r=t-e;return r<=0||n<=0?0:r/n}function hn(e){const t=ae.get("pets");if(!t)return null;const n=t[e];return n?{hoursToMature:n.hoursToMature??0,maxScale:n.maxScale??1,abilities:n.abilities??[]}:null}function im(e,t){return t<=0?1:Math.min(1,e/t)}const am={init(){},isReady(){return  true},crop:{calculateSize:Zg,calculateSellPrice:em,calculateProgress:tm,isReady:nm,getData:ni},pet:{calculateAge:br,calculateMaxStrength:yr,calculateCurrentStrength:vr,isMature:xr,calculateStrengthPerHour:qs,getData:hn},mutation:{calculateMultiplier:Ks,getValue:Xg,isGrowth:Jg,isEnvironmental:Qg}},zi={inventory:"myPetInventoryAtom",hutch:"myPetHutchPetItemsAtom",active:"myPetInfosAtom",slotInfos:"myPetSlotInfosAtom",expandedPetSlotId:"expandedPetSlotIdAtom"};function Gi(e,t){const n=br(e.xp),r=yr(e.petSpecies,e.targetScale),o=vr(e.petSpecies,e.xp,r),i=xr(e.petSpecies,n);return {id:e.id,petSpecies:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,mutations:[...e.mutations],targetScale:e.targetScale,abilities:[...e.abilities],location:t,position:null,lastAbilityTrigger:null,growthStage:n,currentStrength:o,maxStrength:r,isMature:i}}function sm(e,t){const r=t[e.slot.id]?.lastAbilityTrigger??null,o=br(e.slot.xp),i=yr(e.slot.petSpecies,e.slot.targetScale),a=vr(e.slot.petSpecies,e.slot.xp,i),s=xr(e.slot.petSpecies,o);return {id:e.slot.id,petSpecies:e.slot.petSpecies,name:e.slot.name,xp:e.slot.xp,hunger:e.slot.hunger,mutations:[...e.slot.mutations],targetScale:e.slot.targetScale,abilities:[...e.slot.abilities],location:"active",position:e.position?{x:e.position.x,y:e.position.y}:null,lastAbilityTrigger:r,growthStage:o,currentStrength:a,maxStrength:i,isMature:s}}function ji(e){const t=new Set,n=[];for(const c of e.active??[]){const u=sm(c,e.slotInfos??{});n.push(u),t.add(u.id);}const r=[];for(const c of e.inventory??[]){if(t.has(c.id))continue;const u=Gi(c,"inventory");r.push(u),t.add(u.id);}const o=[];for(const c of e.hutch??[]){if(t.has(c.id))continue;const u=Gi(c,"hutch");o.push(u),t.add(u.id);}const i=[...n,...r,...o],a=e.expandedPetSlotId??null,s=a?i.find(c=>c.id===a)??null:null;return {all:i,byLocation:{inventory:r,hutch:o,active:n},counts:{inventory:r.length,hutch:o.length,active:n.length,total:i.length},expandedPetSlotId:a,expandedPet:s}}const Bi={all:[],byLocation:{inventory:[],hutch:[],active:[]},counts:{inventory:0,hutch:0,active:0,total:0},expandedPetSlotId:null,expandedPet:null};function lm(e,t){if(e.length!==t.length)return  false;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return  false;return  true}function Wi(e){return JSON.stringify({id:e.id,petSpecies:e.petSpecies,name:e.name,mutations:e.mutations,abilities:e.abilities,location:e.location})}function cm(e,t){if(e.all.length!==t.all.length)return  false;const n=e.all.map(Wi),r=t.all.map(Wi);return lm(n,r)}function dm(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const i=r.get(o.id);i&&i.location!==o.location&&n.push({pet:o,from:i.location,to:o.location});}return n}function um(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){if(!o.lastAbilityTrigger)continue;const a=r.get(o.id)?.lastAbilityTrigger;(!a||a.abilityId!==o.lastAbilityTrigger.abilityId||a.performedAt!==o.lastAbilityTrigger.performedAt)&&n.push({pet:o,trigger:o.lastAbilityTrigger});}return n}function pm(e,t){const n=new Set(e.all.map(a=>a.id)),r=new Set(t.all.map(a=>a.id)),o=t.all.filter(a=>!n.has(a.id)),i=e.all.filter(a=>!r.has(a.id));return o.length===0&&i.length===0?null:{added:o,removed:i,counts:t.counts}}function fm(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const i=r.get(o.id);i&&o.growthStage>i.growthStage&&n.push({pet:o,previousStage:i.growthStage,newStage:o.growthStage});}return n}function gm(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const i=r.get(o.id);i&&o.currentStrength>i.currentStrength&&n.push({pet:o,previousStrength:i.currentStrength,newStrength:o.currentStrength});}return n}function mm(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const i=r.get(o.id);i&&o.currentStrength===o.maxStrength&&i.currentStrength<i.maxStrength&&n.push({pet:o});}return n}function hm(){let e=Bi,t=Bi,n=false;const r=[],o={all:new Set,stable:new Set,location:new Set,ability:new Set,count:new Set,expandedPet:new Set,growth:new Set,strengthGain:new Set,maxStrength:new Set},i={},a=Object.keys(zi),s=new Set;function c(){if(s.size<a.length)return;const l=ji(i);if(Ke(e,l)||(t=e,e=l,!n))return;for(const x of o.all)x(e,t);if(!cm(t,e))for(const x of o.stable)x(e,t);const d=dm(t,e);for(const x of d)for(const S of o.location)S(x);const p=um(t,e);for(const x of p)for(const S of o.ability)S(x);const f=pm(t,e);if(f)for(const x of o.count)x(f);const g=fm(t,e);for(const x of g)for(const S of o.growth)S(x);const m=gm(t,e);for(const x of m)for(const S of o.strengthGain)S(x);const b=mm(t,e);for(const x of b)for(const S of o.maxStrength)S(x);if(t.expandedPetSlotId!==e.expandedPetSlotId){const x={current:e.expandedPet,previous:t.expandedPet,currentId:e.expandedPetSlotId,previousId:t.expandedPetSlotId};for(const S of o.expandedPet)S(x);}}async function u(){if(n)return;const l=a.map(async d=>{const p=zi[d],f=await ce.subscribe(p,g=>{i[d]=g,s.add(d),c();});r.push(f);});await Promise.all(l),n=true,s.size===a.length&&(e=ji(i));}return u(),{get(){return e},subscribe(l,d){return o.all.add(l),d?.immediate!==false&&n&&s.size===a.length&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,d){return o.stable.add(l),d?.immediate!==false&&n&&s.size===a.length&&l(e,e),()=>o.stable.delete(l)},subscribeLocation(l,d){if(o.location.add(l),d?.immediate&&n&&s.size===a.length)for(const p of e.all)l({pet:p,from:p.location,to:p.location});return ()=>o.location.delete(l)},subscribeAbility(l,d){if(o.ability.add(l),d?.immediate&&n&&s.size===a.length)for(const p of e.all)p.lastAbilityTrigger&&l({pet:p,trigger:p.lastAbilityTrigger});return ()=>o.ability.delete(l)},subscribeCount(l,d){return o.count.add(l),d?.immediate&&n&&s.size===a.length&&l({added:e.all,removed:[],counts:e.counts}),()=>o.count.delete(l)},subscribeExpandedPet(l,d){return o.expandedPet.add(l),d?.immediate&&n&&s.size===a.length&&l({current:e.expandedPet,previous:e.expandedPet,currentId:e.expandedPetSlotId,previousId:e.expandedPetSlotId}),()=>o.expandedPet.delete(l)},subscribeGrowth(l,d){if(o.growth.add(l),d?.immediate&&n&&s.size===a.length)for(const p of e.all)l({pet:p,previousStage:p.growthStage,newStage:p.growthStage});return ()=>o.growth.delete(l)},subscribeStrengthGain(l,d){if(o.strengthGain.add(l),d?.immediate&&n&&s.size===a.length)for(const p of e.all)l({pet:p,previousStrength:p.currentStrength,newStrength:p.currentStrength});return ()=>o.strengthGain.delete(l)},subscribeMaxStrength(l,d){if(o.maxStrength.add(l),d?.immediate&&n&&s.size===a.length)for(const p of e.all)p.currentStrength===p.maxStrength&&l({pet:p});return ()=>o.maxStrength.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.location.clear(),o.ability.clear(),o.count.clear(),o.expandedPet.clear(),o.growth.clear(),o.strengthGain.clear(),o.maxStrength.clear(),n=false;}}}let Nr=null;function ri(){return Nr||(Nr=hm()),Nr}function bm(){let e=null;const t=[],n=new Set,r={},o=new Set,i=2;function a(d,p){return {x:p%d,y:Math.floor(p/d)}}function s(d,p,f){return f*d+p}function c(d,p){const{cols:f,rows:g}=d,m=f*g,b=new Set,x=new Set,S=new Map,v=[],y=d.userSlotIdxAndDirtTileIdxToGlobalTileIdx??[],C=d.userSlotIdxAndBoardwalkTileIdxToGlobalTileIdx??[],h=Math.max(y.length,C.length);for(let I=0;I<h;I++){const L=y[I]??[],_=C[I]??[],D=L.map((z,X)=>(b.add(z),S.set(z,I),{globalIndex:z,localIndex:X,position:a(f,z)})),ee=_.map((z,X)=>(x.add(z),S.set(z,I),{globalIndex:z,localIndex:X,position:a(f,z)}));v.push({userSlotIdx:I,dirtTiles:D,boardwalkTiles:ee,allTiles:[...D,...ee]});}const k=d.spawnTiles.map(I=>a(f,I)),T={};if(d.locations)for(const[I,L]of Object.entries(d.locations)){const _=L.spawnTileIdx??[];T[I]={name:I,spawnTiles:_,spawnPositions:_.map(D=>a(f,D))};}return {cols:f,rows:g,totalTiles:m,tileSize:p,spawnTiles:d.spawnTiles,spawnPositions:k,locations:T,userSlots:v,globalToXY(I){return a(f,I)},xyToGlobal(I,L){return s(f,I,L)},getTileOwner(I){return S.get(I)??null},isDirtTile(I){return b.has(I)},isBoardwalkTile(I){return x.has(I)}}}function u(){if(o.size<i||e)return;const d=r.map,p=r.tileSize??0;if(d){e=c(d,p);for(const f of n)f(e);n.clear();}}async function l(){const d=await ce.subscribe("mapAtom",f=>{r.map=f,o.add("map"),u();});t.push(d);const p=await ce.subscribe("tileSizeAtom",f=>{r.tileSize=f,o.add("tileSize"),u();});t.push(p);}return l(),{get(){return e},isReady(){return e!==null},onReady(d,p){return e?(p?.immediate!==false&&d(e),()=>{}):(n.add(d),()=>n.delete(d))},destroy(){for(const d of t)d();t.length=0,e=null,n.clear();}}}let $r=null;function mo(){return $r||($r=bm()),$r}const Hi={inventory:"myInventoryAtom",isFull:"isMyInventoryAtMaxLengthAtom",selectedItemIndex:"myPossiblyNoLongerValidSelectedItemIndexAtom"},Ui={items:[],favoritedItemIds:[],count:0,isFull:false,selectedItem:null};function Vi(e){const t=e.inventory,n=t?.items??[],r=t?.favoritedItemIds??[],o=e.selectedItemIndex;let i=null;return o!==null&&o>=0&&o<n.length&&(i={index:o,item:n[o]}),{items:n,favoritedItemIds:r,count:n.length,isFull:e.isFull??false,selectedItem:i}}function Ki(e){const t=e.items.map(n=>"id"in n?n.id:"species"in n&&n.itemType==="Seed"?`seed:${n.species}:${n.quantity}`:"toolId"in n?`tool:${n.toolId}:${n.quantity}`:"eggId"in n?`egg:${n.eggId}:${n.quantity}`:"decorId"in n?`decor:${n.decorId}:${n.quantity}`:JSON.stringify(n));return JSON.stringify({itemKeys:t,favoritedItemIds:e.favoritedItemIds,isFull:e.isFull,selectedItemIndex:e.selectedItem?.index??null})}function ym(e,t){return Ki(e)===Ki(t)}function vm(e,t){return e===null&&t===null?false:e===null||t===null?true:e.index!==t.index}function $n(e){return "id"in e?e.id:"species"in e&&e.itemType==="Seed"?`seed:${e.species}`:"toolId"in e?`tool:${e.toolId}`:"eggId"in e?`egg:${e.eggId}`:"decorId"in e?`decor:${e.decorId}`:JSON.stringify(e)}function xm(e,t){const n=new Set(e.map($n)),r=new Set(t.map($n)),o=t.filter(a=>!n.has($n(a))),i=e.filter(a=>!r.has($n(a)));return o.length===0&&i.length===0?null:{added:o,removed:i,counts:{before:e.length,after:t.length}}}function wm(e,t){const n=new Set(e),r=new Set(t),o=t.filter(a=>!n.has(a)),i=e.filter(a=>!r.has(a));return o.length===0&&i.length===0?null:{added:o,removed:i,current:t}}function km(){let e=Ui,t=Ui,n=false;const r=[],o={all:new Set,stable:new Set,selection:new Set,items:new Set,favorites:new Set},i={},a=Object.keys(Hi),s=new Set;function c(){if(s.size<a.length)return;const l=Vi(i);if(Ke(e,l)||(t=e,e=l,!n))return;for(const f of o.all)f(e,t);if(!ym(t,e))for(const f of o.stable)f(e,t);if(vm(t.selectedItem,e.selectedItem)){const f={current:e.selectedItem,previous:t.selectedItem};for(const g of o.selection)g(f);}const d=xm(t.items,e.items);if(d)for(const f of o.items)f(d);const p=wm(t.favoritedItemIds,e.favoritedItemIds);if(p)for(const f of o.favorites)f(p);}async function u(){if(n)return;const l=a.map(async d=>{const p=Hi[d],f=await ce.subscribe(p,g=>{i[d]=g,s.add(d),c();});r.push(f);});await Promise.all(l),n=true,s.size===a.length&&(e=Vi(i));}return u(),{get(){return e},subscribe(l,d){return o.all.add(l),d?.immediate!==false&&n&&s.size===a.length&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,d){return o.stable.add(l),d?.immediate!==false&&n&&s.size===a.length&&l(e,e),()=>o.stable.delete(l)},subscribeSelection(l,d){return o.selection.add(l),d?.immediate&&n&&s.size===a.length&&l({current:e.selectedItem,previous:e.selectedItem}),()=>o.selection.delete(l)},subscribeItems(l,d){return o.items.add(l),d?.immediate&&n&&s.size===a.length&&l({added:e.items,removed:[],counts:{before:0,after:e.count}}),()=>o.items.delete(l)},subscribeFavorites(l,d){return o.favorites.add(l),d?.immediate&&n&&s.size===a.length&&l({added:e.favoritedItemIds,removed:[],current:e.favoritedItemIds}),()=>o.favorites.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.selection.clear(),o.items.clear(),o.favorites.clear(),n=false;}}}let Dr=null;function wr(){return Dr||(Dr=km()),Dr}const ho={all:[],host:null,myPlayer:null,count:0};function Sm(e,t,n){const r=n.get(e.id),o=r?.slot,i=o?.data,a=o?.lastActionEvent;return {id:e.id,name:e.name,discordId:e.databaseUserId,discordAvatarUrl:e.discordAvatarUrl,guildId:e.guildId,isConnected:e.isConnected,isHost:e.id===t,slotIndex:r?.index??null,position:o?.position??null,cosmetic:{color:e.cosmetic?.color??"",avatar:e.cosmetic?.avatar?[...e.cosmetic.avatar]:[]},emote:{type:e.emoteData?.emoteType??-1},coins:i?.coinsCount??0,inventory:i?.inventory??null,shopPurchases:i?.shopPurchases??null,garden:i?.garden??null,pets:{slots:i?.petSlots??[],slotInfos:o?.petSlotInfos??null},journal:i?.journal??null,stats:i?.stats??null,tasksCompleted:i?.tasksCompleted??[],activityLogs:i?.activityLogs??[],customRestocks:{config:i?.customRestocks??null,inventories:o?.customRestockInventories??null},lastAction:a?{type:a.action,data:a.data,timestamp:a.timestamp}:null,selectedItemIndex:o?.notAuthoritative_selectedItemIndex??null,lastSlotMachineInfo:o?.lastSlotMachineInfo??null}}function Yi(e){const t=e.players,n=e.hostPlayerId??"",r=e.userSlots??[];if(!t||!Array.isArray(t)||t.length===0)return ho;const o=new Map;Array.isArray(r)&&r.forEach((c,u)=>{c?.type==="user"&&c?.playerId&&o.set(c.playerId,{slot:c,index:u});});const i=t.map(c=>Sm(c,n,o)),a=i.find(c=>c.isHost)??null,s=i.find(c=>c.slotIndex!==null&&c.slotIndex>=0)??null;return {all:i,host:a,myPlayer:s,count:i.length}}function qi(e){const t=e.all.map(n=>`${n.id}:${n.isConnected}:${n.isHost}`);return JSON.stringify({playerKeys:t,hostId:e.host?.id??null,count:e.count})}function Cm(e,t){const n=[],r=new Set(e.map(i=>i.id)),o=new Set(t.map(i=>i.id));for(const i of t)r.has(i.id)||n.push({player:i,type:"join"});for(const i of e)o.has(i.id)||n.push({player:i,type:"leave"});return n}function Am(e,t){const n=[],r=new Map(e.map(o=>[o.id,o]));for(const o of t){const i=r.get(o.id);i&&i.isConnected!==o.isConnected&&n.push({player:o,isConnected:o.isConnected});}return n}function Tm(){let e=ho,t=ho,n=false;const r=[],o={all:new Set,stable:new Set,joinLeave:new Set,connection:new Set,host:new Set},i={},a=new Set,s=3;function c(){if(a.size<s)return;const l=Yi(i);if(Ke(e,l)||(t=e,e=l,!n))return;for(const m of o.all)m(e,t);if(qi(t)!==qi(e))for(const m of o.stable)m(e,t);const d=Cm(t.all,e.all);for(const m of d)for(const b of o.joinLeave)b(m);const p=Am(t.all,e.all);for(const m of p)for(const b of o.connection)b(m);const f=t.host?.id??null,g=e.host?.id??null;if(f!==g){const m={current:e.host,previous:t.host};for(const b of o.host)b(m);}}async function u(){if(n)return;const l=await Xp.onChangeNow(f=>{i.players=f,a.add("players"),c();});r.push(l);const d=await Jp.onChangeNow(f=>{i.hostPlayerId=f,a.add("hostPlayerId"),c();});r.push(d);const p=await qp.onChangeNow(f=>{i.userSlots=f,a.add("userSlots"),c();});r.push(p),n=true,a.size===s&&(e=Yi(i));}return u(),{get(){return e},subscribe(l,d){return o.all.add(l),d?.immediate!==false&&n&&a.size===s&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,d){return o.stable.add(l),d?.immediate!==false&&n&&a.size===s&&l(e,e),()=>o.stable.delete(l)},subscribeJoinLeave(l,d){if(o.joinLeave.add(l),d?.immediate&&n&&a.size===s)for(const p of e.all)l({player:p,type:"join"});return ()=>o.joinLeave.delete(l)},subscribeConnection(l,d){if(o.connection.add(l),d?.immediate&&n&&a.size===s)for(const p of e.all)l({player:p,isConnected:p.isConnected});return ()=>o.connection.delete(l)},subscribeHost(l,d){return o.host.add(l),d?.immediate&&n&&a.size===s&&l({current:e.host,previous:e.host}),()=>o.host.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.joinLeave.clear(),o.connection.clear(),o.host.clear(),n=false;}}}let Fr=null;function Xs(){return Fr||(Fr=Tm()),Fr}const bn=["seed","tool","egg","decor"];function Im(e,t){switch(t){case "seed":return e.species??e.itemType;case "tool":return e.toolId??e.itemType;case "egg":return e.eggId??e.itemType;case "decor":return e.decorId??e.itemType;default:return e.itemType}}function Pm(e,t,n){const r=Im(e,t),o=n[r]??0,i=Math.max(0,e.initialStock-o);return {id:r,itemType:e.itemType,initialStock:e.initialStock,purchased:o,remaining:i,isAvailable:i>0}}function Em(e,t,n){if(!t)return {type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null};const o=n[e]?.purchases??{},i=(t.inventory??[]).map(u=>Pm(u,e,o)),a=i.filter(u=>u.isAvailable).length,s=t.secondsUntilRestock??0,c=s>0?Date.now()+s*1e3:null;return {type:e,items:i,availableCount:a,totalCount:i.length,secondsUntilRestock:s,restockAt:c}}function Xi(e){const t=e.shops,n=e.purchases??{},r=bn.map(s=>Em(s,t?.[s],n)),o={seed:r[0],tool:r[1],egg:r[2],decor:r[3]},i=r.filter(s=>s.restockAt!==null);let a=null;if(i.length>0){const c=i.sort((u,l)=>(u.restockAt??0)-(l.restockAt??0))[0];a={shop:c.type,seconds:c.secondsUntilRestock,at:c.restockAt};}return {all:r,byType:o,nextRestock:a}}const Ji={all:bn.map(e=>({type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null})),byType:{seed:{type:"seed",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},tool:{type:"tool",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},egg:{type:"egg",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},decor:{type:"decor",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null}},nextRestock:null};function Qi(e){return JSON.stringify({shops:e.all.map(t=>({type:t.type,itemCount:t.items.length,availableCount:t.availableCount}))})}function Mm(e,t){const n=e.secondsUntilRestock,r=t.secondsUntilRestock;return n>0&&n<=5&&r>n||n>0&&r===0&&t.items.some(i=>i.purchased===0)?{shop:t,previousItems:e.items}:null}function _m(e,t){const n=[];for(const r of bn){const o=e.byType[r],i=t.byType[r],a=new Map(o.items.map(s=>[s.id,s]));for(const s of i.items){const c=a.get(s.id);c&&s.purchased>c.purchased&&n.push({shopType:r,itemId:s.id,quantity:s.purchased-c.purchased,newPurchased:s.purchased,remaining:s.remaining});}}return n}function Lm(e,t){const n=[];for(const r of bn){const o=e.byType[r],i=t.byType[r],a=new Map(o.items.map(s=>[s.id,s]));for(const s of i.items){const c=a.get(s.id);c&&c.isAvailable!==s.isAvailable&&n.push({shopType:r,itemId:s.id,wasAvailable:c.isAvailable,isAvailable:s.isAvailable});}}return n}function Rm(){let e=Ji,t=Ji,n=false;const r=[],o={all:new Set,stable:new Set,seedRestock:new Set,toolRestock:new Set,eggRestock:new Set,decorRestock:new Set,purchase:new Set,availability:new Set},i={},a=new Set,s=2;function c(){if(a.size<s)return;const l=Xi(i);if(Ke(e,l)||(t=e,e=l,!n))return;for(const g of o.all)g(e,t);if(Qi(t)!==Qi(e))for(const g of o.stable)g(e,t);const d={seed:o.seedRestock,tool:o.toolRestock,egg:o.eggRestock,decor:o.decorRestock};for(const g of bn){const m=Mm(t.byType[g],e.byType[g]);if(m)for(const b of d[g])b(m);}const p=_m(t,e);for(const g of p)for(const m of o.purchase)m(g);const f=Lm(t,e);for(const g of f)for(const m of o.availability)m(g);}async function u(){if(n)return;const l=await Zp.onChangeNow(p=>{i.shops=p,a.add("shops"),c();});r.push(l);const d=await ef.onChangeNow(p=>{i.purchases=p,a.add("purchases"),c();});r.push(d),n=true,a.size===s&&(e=Xi(i));}return u(),{get(){return e},getShop(l){return e.byType[l]},getItem(l,d){return e.byType[l].items.find(f=>f.id===d)??null},subscribe(l,d){return o.all.add(l),d?.immediate!==false&&n&&a.size===s&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,d){return o.stable.add(l),d?.immediate!==false&&n&&a.size===s&&l(e,e),()=>o.stable.delete(l)},subscribeSeedRestock(l,d){return o.seedRestock.add(l),d?.immediate&&n&&a.size===s&&l({shop:e.byType.seed,previousItems:[]}),()=>o.seedRestock.delete(l)},subscribeToolRestock(l,d){return o.toolRestock.add(l),d?.immediate&&n&&a.size===s&&l({shop:e.byType.tool,previousItems:[]}),()=>o.toolRestock.delete(l)},subscribeEggRestock(l,d){return o.eggRestock.add(l),d?.immediate&&n&&a.size===s&&l({shop:e.byType.egg,previousItems:[]}),()=>o.eggRestock.delete(l)},subscribeDecorRestock(l,d){return o.decorRestock.add(l),d?.immediate&&n&&a.size===s&&l({shop:e.byType.decor,previousItems:[]}),()=>o.decorRestock.delete(l)},subscribePurchase(l,d){if(o.purchase.add(l),d?.immediate&&n&&a.size===s)for(const p of e.all)for(const f of p.items)f.purchased>0&&l({shopType:p.type,itemId:f.id,quantity:f.purchased,newPurchased:f.purchased,remaining:f.remaining});return ()=>o.purchase.delete(l)},subscribeAvailability(l,d){if(o.availability.add(l),d?.immediate&&n&&a.size===s)for(const p of e.all)for(const f of p.items)l({shopType:p.type,itemId:f.id,wasAvailable:f.isAvailable,isAvailable:f.isAvailable});return ()=>o.availability.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.seedRestock.clear(),o.toolRestock.clear(),o.eggRestock.clear(),o.decorRestock.clear(),o.purchase.clear(),o.availability.clear(),n=false;}}}let zr=null;function Om(){return zr||(zr=Rm()),zr}const Nm=["Sunny","Rain","Frost","Dawn","AmberMoon"];function $m(e){return Nm.includes(e)}const bo={type:"Sunny",isActive:false,startTime:null,endTime:null,remainingSeconds:0};function Dm(e){if(!e)return bo;const t=Date.now(),n=e.endTime??0,r=Math.max(0,n-t),o=Math.floor(r/1e3),i=o>0,a=e.type??"Sunny";return {type:$m(a)?a:"Sunny",isActive:i,startTime:e.startTime??null,endTime:e.endTime??null,remainingSeconds:o}}function Fm(){let e=bo,t=bo,n=false,r=null;const o={all:new Set,change:new Set};function i(s){const c=Dm(s);if(e.type===c.type&&e.isActive===c.isActive&&e.startTime===c.startTime&&e.endTime===c.endTime){e=c;return}if(t=e,e=c,!!n){for(const u of o.all)u(e,t);if(t.type!==e.type||t.isActive!==e.isActive){const u={current:e,previous:t};for(const l of o.change)l(u);}}}async function a(){n||(r=await tf.onChangeNow(s=>{i(s);}),n=true);}return a(),{get(){return e},subscribe(s,c){return o.all.add(s),c?.immediate!==false&&n&&s(e,e),()=>o.all.delete(s)},subscribeChange(s,c){return o.change.add(s),c?.immediate&&n&&s({current:e,previous:e}),()=>o.change.delete(s)},destroy(){r?.(),r=null,o.all.clear(),o.change.clear(),n=false;}}}let Gr=null;function zm(){return Gr||(Gr=Fm()),Gr}function Gm(){const e=ae.get("mutations");return e?Object.keys(e):[]}function Js(){const e={};for(const t of Gm())e[t]=[];return e}function yo(){return {garden:null,mySlotIndex:null,plants:{all:[],mature:[],growing:[],bySpecies:{},count:0},crops:{all:[],mature:[],growing:[],mutated:{all:[],byMutation:Js()}},eggs:{all:[],mature:[],growing:[],byType:{},count:0},decors:{tileObjects:[],boardwalk:[],all:[],byType:{},count:0},tiles:{tileObjects:[],boardwalk:[],empty:{tileObjects:[],boardwalk:[]}},counts:{plants:0,maturePlants:0,crops:0,matureCrops:0,eggs:0,matureEggs:0,decors:0,emptyTileObjects:0,emptyBoardwalk:0}}}function jm(e,t,n,r){const o=t.slots.filter(i=>r>=i.endTime).length;return {tileIndex:e,position:n,species:t.species,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:r>=t.maturedAt,slots:t.slots,slotsCount:t.slots.length,matureSlotsCount:o}}function Bm(e,t,n,r,o){return {tileIndex:e,position:t,slotIndex:n,species:r.species,startTime:r.startTime,endTime:r.endTime,targetScale:r.targetScale,mutations:[...r.mutations],isMature:o>=r.endTime}}function Wm(e,t,n,r){return {tileIndex:e,position:n,eggId:t.eggId,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:r>=t.maturedAt}}function Zi(e,t,n,r){return {tileIndex:e,position:n,decorId:t.decorId,rotation:t.rotation,location:r}}function ea(e,t){const{garden:n,mySlotIndex:r}=e,o=Date.now();if(!n||r===null)return yo();const i=t().get(),a=i?.userSlots[r],s=a?.dirtTiles??[],c=a?.boardwalkTiles??[],u=[],l=[],d=[],p={},f=[],g=[],m=[],b=[],x=Js(),S=[],v=[],y=[],C={},h=[],k=[],T={},I=new Set,L=new Set;for(const[z,X]of Object.entries(n.tileObjects)){const ue=parseInt(z,10);I.add(ue);const j=i?i.globalToXY(ue):{x:0,y:0};if(X.objectType==="plant"){const F=X,$=jm(z,F,j,o);u.push($),$.isMature?l.push($):d.push($),p[$.species]||(p[$.species]=[]),p[$.species].push($);for(let O=0;O<F.slots.length;O++){const N=F.slots[O],P=Bm(z,j,O,N,o);if(f.push(P),P.isMature?g.push(P):m.push(P),P.mutations.length>0){b.push(P);for(const R of P.mutations)x[R]||(x[R]=[]),x[R].push(P);}}}else if(X.objectType==="egg"){const $=Wm(z,X,j,o);S.push($),C[$.eggId]||(C[$.eggId]=[]),C[$.eggId].push($),$.isMature?v.push($):y.push($);}else if(X.objectType==="decor"){const $=Zi(z,X,j,"tileObjects");h.push($),T[$.decorId]||(T[$.decorId]=[]),T[$.decorId].push($);}}for(const[z,X]of Object.entries(n.boardwalkTileObjects)){const ue=parseInt(z,10);L.add(ue);const j=i?i.globalToXY(ue):{x:0,y:0},$=Zi(z,X,j,"boardwalk");k.push($),T[$.decorId]||(T[$.decorId]=[]),T[$.decorId].push($);}const _=[...h,...k],D=s.filter(z=>!I.has(z.localIndex)),ee=c.filter(z=>!L.has(z.localIndex));return {garden:n,mySlotIndex:r,plants:{all:u,mature:l,growing:d,bySpecies:p,count:u.length},crops:{all:f,mature:g,growing:m,mutated:{all:b,byMutation:x}},eggs:{all:S,mature:v,growing:y,byType:C,count:S.length},decors:{tileObjects:h,boardwalk:k,all:_,byType:T,count:_.length},tiles:{tileObjects:s,boardwalk:c,empty:{tileObjects:D,boardwalk:ee}},counts:{plants:u.length,maturePlants:l.length,crops:f.length,matureCrops:g.length,eggs:S.length,matureEggs:v.length,decors:_.length,emptyTileObjects:D.length,emptyBoardwalk:ee.length}}}function ta(e){return JSON.stringify({plants:e.counts.plants,maturePlants:e.counts.maturePlants,crops:e.counts.crops,matureCrops:e.counts.matureCrops,eggs:e.counts.eggs,matureEggs:e.counts.matureEggs,decors:e.counts.decors,emptyTileObjects:e.counts.emptyTileObjects,emptyBoardwalk:e.counts.emptyBoardwalk})}function Hm(e,t){const n=new Set(e.map(a=>a.tileIndex)),r=new Set(t.map(a=>a.tileIndex)),o=t.filter(a=>!n.has(a.tileIndex)),i=e.filter(a=>!r.has(a.tileIndex));return {added:o,removed:i}}function Um(e,t,n){const r=new Set(e.map(i=>i.tileIndex)),o=new Set(n.map(i=>i.tileIndex));return t.filter(i=>!r.has(i.tileIndex)&&o.has(i.tileIndex))}function Vm(e,t,n){const r=new Set(e.map(i=>`${i.tileIndex}:${i.slotIndex}`)),o=new Set(n.map(i=>`${i.tileIndex}:${i.slotIndex}`));return t.filter(i=>{const a=`${i.tileIndex}:${i.slotIndex}`;return !r.has(a)&&o.has(a)})}function Km(e,t,n){const r=new Set(e.map(i=>i.tileIndex)),o=new Set(n.map(i=>i.tileIndex));return t.filter(i=>!r.has(i.tileIndex)&&o.has(i.tileIndex))}function Ym(e,t){const n=[],r=new Map(e.map(o=>[o.tileIndex,o]));for(const o of t){const i=r.get(o.tileIndex);if(!i)continue;const a=Math.min(i.slots.length,o.slots.length);for(let s=0;s<a;s++){const c=new Set(i.slots[s].mutations),u=new Set(o.slots[s].mutations),l=[...u].filter(p=>!c.has(p)),d=[...c].filter(p=>!u.has(p));if(l.length>0||d.length>0){const p=Date.now(),f=o.slots[s],g={tileIndex:o.tileIndex,position:o.position,slotIndex:s,species:f.species,startTime:f.startTime,endTime:f.endTime,targetScale:f.targetScale,mutations:[...f.mutations],isMature:p>=f.endTime};n.push({crop:g,added:l,removed:d});}}}return n}function qm(e,t,n){const r=[],o=new Map(t.map(a=>[a.tileIndex,a])),i=new Map;for(const a of n)i.set(`${a.tileIndex}:${a.slotIndex}`,a);for(const a of e){const s=o.get(a.tileIndex);if(!s)continue;const c=Math.min(a.slots.length,s.slots.length);for(let u=0;u<c;u++){const l=a.slots[u],d=s.slots[u];if(l.startTime!==d.startTime){const p=i.get(`${a.tileIndex}:${u}`);if(!p||!p.isMature)continue;const f={tileIndex:a.tileIndex,position:a.position,slotIndex:u,species:l.species,startTime:l.startTime,endTime:l.endTime,targetScale:l.targetScale,mutations:[...l.mutations],isMature:true};r.push({crop:f,remainingSlots:s.slotsCount});}}if(s.slotsCount<a.slotsCount)for(let u=s.slotsCount;u<a.slotsCount;u++){const l=i.get(`${a.tileIndex}:${u}`);if(!l||!l.isMature)continue;const d=a.slots[u];if(!d)continue;const p={tileIndex:a.tileIndex,position:a.position,slotIndex:u,species:d.species,startTime:d.startTime,endTime:d.endTime,targetScale:d.targetScale,mutations:[...d.mutations],isMature:true};r.push({crop:p,remainingSlots:s.slotsCount});}}return r}function Xm(e,t){const n=new Set(e.map(a=>a.tileIndex)),r=new Set(t.map(a=>a.tileIndex)),o=t.filter(a=>!n.has(a.tileIndex)),i=e.filter(a=>!r.has(a.tileIndex));return {added:o,removed:i}}function Jm(e,t){const n=c=>`${c.tileIndex}:${c.location}`,r=c=>`${c.tileIndex}:${c.location}`,o=new Set(e.map(n)),i=new Set(t.map(r)),a=t.filter(c=>!o.has(r(c))),s=e.filter(c=>!i.has(n(c)));return {added:a,removed:s}}function Qm(){let e=yo(),t=yo(),n=false;const r=[],o={all:new Set,stable:new Set,plantAdded:new Set,plantRemoved:new Set,plantMatured:new Set,cropMutated:new Set,cropMatured:new Set,cropHarvested:new Set,eggPlaced:new Set,eggRemoved:new Set,eggMatured:new Set,decorPlaced:new Set,decorRemoved:new Set},i={},a=new Set,s=2;function c(){if(a.size<s)return;const l=ea(i,mo);if(Ke(e,l)||(t=e,e=l,!n))return;for(const v of o.all)v(e,t);if(ta(t)!==ta(e))for(const v of o.stable)v(e,t);const d=Hm(t.plants.all,e.plants.all);for(const v of d.added)for(const y of o.plantAdded)y({plant:v});for(const v of d.removed)for(const y of o.plantRemoved)y({plant:v,tileIndex:v.tileIndex});const p=Um(t.plants.mature,e.plants.mature,e.plants.all);for(const v of p)for(const y of o.plantMatured)y({plant:v});const f=Ym(t.plants.all,e.plants.all);for(const v of f)for(const y of o.cropMutated)y(v);const g=Vm(t.crops.mature,e.crops.mature,e.crops.all);for(const v of g)for(const y of o.cropMatured)y({crop:v});const m=qm(t.plants.all,e.plants.all,t.crops.all);for(const v of m)for(const y of o.cropHarvested)y(v);const b=Xm(t.eggs.all,e.eggs.all);for(const v of b.added)for(const y of o.eggPlaced)y({egg:v});for(const v of b.removed)for(const y of o.eggRemoved)y({egg:v});const x=Km(t.eggs.mature,e.eggs.mature,e.eggs.all);for(const v of x)for(const y of o.eggMatured)y({egg:v});const S=Jm(t.decors.all,e.decors.all);for(const v of S.added)for(const y of o.decorPlaced)y({decor:v});for(const v of S.removed)for(const y of o.decorRemoved)y({decor:v});}async function u(){if(n)return;const l=await Qp.onChangeNow(p=>{i.garden=p,a.add("garden"),c();});r.push(l);const d=await ce.subscribe("myUserSlotIdxAtom",p=>{i.mySlotIndex=p,a.add("mySlotIndex"),c();});r.push(d),n=true,a.size===s&&(e=ea(i,mo));}return u(),{get(){return e},subscribe(l,d){return o.all.add(l),d?.immediate!==false&&n&&a.size===s&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,d){return o.stable.add(l),d?.immediate!==false&&n&&a.size===s&&l(e,e),()=>o.stable.delete(l)},subscribePlantAdded(l,d){if(o.plantAdded.add(l),d?.immediate&&n&&a.size===s)for(const p of e.plants.all)l({plant:p});return ()=>o.plantAdded.delete(l)},subscribePlantRemoved(l,d){return o.plantRemoved.add(l),()=>o.plantRemoved.delete(l)},subscribePlantMatured(l,d){if(o.plantMatured.add(l),d?.immediate&&n&&a.size===s)for(const p of e.plants.mature)l({plant:p});return ()=>o.plantMatured.delete(l)},subscribeCropMutated(l,d){if(o.cropMutated.add(l),d?.immediate&&n&&a.size===s)for(const p of e.crops.mutated.all)l({crop:p,added:p.mutations,removed:[]});return ()=>o.cropMutated.delete(l)},subscribeCropMatured(l,d){if(o.cropMatured.add(l),d?.immediate&&n&&a.size===s)for(const p of e.crops.mature)l({crop:p});return ()=>o.cropMatured.delete(l)},subscribeCropHarvested(l,d){return o.cropHarvested.add(l),()=>o.cropHarvested.delete(l)},subscribeEggPlaced(l,d){if(o.eggPlaced.add(l),d?.immediate&&n&&a.size===s)for(const p of e.eggs.all)l({egg:p});return ()=>o.eggPlaced.delete(l)},subscribeEggRemoved(l,d){return o.eggRemoved.add(l),()=>o.eggRemoved.delete(l)},subscribeEggMatured(l,d){if(o.eggMatured.add(l),d?.immediate&&n&&a.size===s)for(const p of e.eggs.mature)l({egg:p});return ()=>o.eggMatured.delete(l)},subscribeDecorPlaced(l,d){if(o.decorPlaced.add(l),d?.immediate&&n&&a.size===s)for(const p of e.decors.all)l({decor:p});return ()=>o.decorPlaced.delete(l)},subscribeDecorRemoved(l,d){return o.decorRemoved.add(l),()=>o.decorRemoved.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.plantAdded.clear(),o.plantRemoved.clear(),o.plantMatured.clear(),o.cropMutated.clear(),o.cropMatured.clear(),o.cropHarvested.clear(),o.eggPlaced.clear(),o.eggRemoved.clear(),o.eggMatured.clear(),o.decorPlaced.clear(),o.decorRemoved.clear(),n=false;}}}let jr=null;function Zm(){return jr||(jr=Qm()),jr}let we=null;function Qs(){return we||(we={currentTile:Kg(),myPets:ri(),gameMap:mo(),myInventory:wr(),players:Xs(),shops:Om(),weather:zm(),myGarden:Zm()},we)}function qe(){if(!we)throw new Error("[Globals] Not initialized. Call initGlobals() first.");return we}function eh(){we&&(we.currentTile.destroy(),we.myPets.destroy(),we.gameMap.destroy(),we.myInventory.destroy(),we.players.destroy(),we.shops.destroy(),we.weather.destroy(),we.myGarden.destroy(),we=null);}const yn={get currentTile(){return qe().currentTile},get myPets(){return qe().myPets},get gameMap(){return qe().gameMap},get myInventory(){return qe().myInventory},get players(){return qe().players},get shops(){return qe().shops},get weather(){return qe().weather},get myGarden(){return qe().myGarden}},th=100,Br=[];function vo(e,t,n){let r="";if(n&&typeof n=="object"){if(t==="PartialState"){const o=n.op||"",i=n.path||"";let a="";if("value"in n){const s=n.value;a=typeof s=="object"?`{${Object.keys(s||{}).slice(0,2).join(",")}}`:String(s);}if(o||i)r=`PartialState : ${o} ${i} ${a}`.trim();else {const s=Object.keys(n).filter(c=>c!=="type");s.length>0&&(r=`PartialState - {${s.join(", ")}}`);}}if(!r&&n.event&&(r+=`${n.event} `),!r&&n.op&&(r+=`op:${n.op} `),!r&&n.data){const o=Object.keys(n.data);o.length>0&&(r+=`{${o.slice(0,3).join(",")}${o.length>3?"...":""}}`);}else !r&&Array.isArray(n)&&(r+=`[${n.length} items]`);}else typeof n=="string"&&(r=n.slice(0,50));Br.push({direction:e,type:String(t),timestamp:Date.now(),payload:n,summary:r.trim()||"-"}),Br.length>th&&Br.shift();}const Ie={nativeCtor:null,captured:[],latestOpen:null},na=Symbol.for("ariesmod.ws.capture.wrapped"),ra=Symbol.for("ariesmod.ws.capture.native"),Zs=1;function xo(e){return !!e&&e.readyState===Zs}function nh(){if(xo(Ie.latestOpen))return Ie.latestOpen;for(let e=Ie.captured.length-1;e>=0;e--){const t=Ie.captured[e];if(xo(t))return t}return null}function rh(e,t){Ie.captured.push(e),Ie.captured.length>25&&Ie.captured.splice(0,Ie.captured.length-25);const n=()=>{Ie.latestOpen=e,t&&console.log("[WS] captured socket opened",e.url);};e.addEventListener("open",n),e.addEventListener("close",()=>{Ie.latestOpen===e&&(Ie.latestOpen=null),t&&console.log("[WS] captured socket closed",e.url);}),e.addEventListener("message",r=>{try{const o=JSON.parse(r.data);vo("in",o.type||"unknown",o);}catch{vo("in","raw",r.data);}}),e.readyState===Zs&&n();}function oh(e=M,t={}){const n=!!t.debug,r=e?.WebSocket;if(typeof r!="function")return ()=>{};if(r[na])return Ie.nativeCtor=r[ra]??Ie.nativeCtor??null,()=>{};const o=r;Ie.nativeCtor=o;function i(a,s){const c=s!==void 0?new o(a,s):new o(a);try{rh(c,n);}catch{}return c}try{i.prototype=o.prototype;}catch{}try{Object.setPrototypeOf(i,o);}catch{}try{i.CONNECTING=o.CONNECTING,i.OPEN=o.OPEN,i.CLOSING=o.CLOSING,i.CLOSED=o.CLOSED;}catch{}i[na]=true,i[ra]=o;try{e.WebSocket=i,n&&console.log("[WS] WebSocket capture installed");}catch{return ()=>{}}return ()=>{try{e.WebSocket===i&&(e.WebSocket=o);}catch{}}}function ih(e=M){const t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function ar(e=M){const t=nh();if(t)return {ws:t,source:"captured"};const n=ih(e);return n?{ws:n,source:"roomConnection"}:{ws:null,source:null}}function el(e,t={}){const n=t.pageWindow??M,r=t.intervalMs??500,o=!!t.debug;let i=null,a=null;const s=()=>{const u=ar(n);(u.ws!==i||u.source!==a)&&(i=u.ws,a=u.source,o&&console.log("[WS] best socket changed:",u.source,u.ws),e(u));};s();const c=setInterval(s,r);return ()=>clearInterval(c)}function ah(e){if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return null}}function sh(e,t=M){const n=t?.MagicCircle_RoomConnection;if(n&&typeof n.sendMessage=="function")try{return Array.isArray(e)?n.sendMessage(...e):n.sendMessage(e),{ok:!0}}catch(i){return {ok:false,reason:"error",error:i}}const{ws:r}=ar(t);if(!r)return {ok:false,reason:"no-ws"};if(!xo(r))return {ok:false,reason:"not-open"};const o=ah(e);if(o==null)return {ok:false,reason:"error",error:new Error("Cannot stringify message")};try{const i=JSON.parse(o);vo("out",i.type||"unknown",i);}catch{}try{return r.send(o),{ok:!0}}catch(i){return {ok:false,reason:"error",error:i}}}function lh(e,t={},n=M){return sh({type:e,...t},n)}const et={Welcome:"Welcome",PartialState:"PartialState",ServerErrorMessage:"ServerErrorMessage",Config:"Config",InappropriateContentRejected:"InappropriateContentRejected",Emote:"Emote",CurrencyTransaction:"CurrencyTransaction",Pong:"Pong"},E={Chat:"Chat",Emote:"Emote",Wish:"Wish",KickPlayer:"KickPlayer",SetPlayerData:"SetPlayerData",UsurpHost:"UsurpHost",Dev:"Dev",SetSelectedGame:"SetSelectedGame",VoteForGame:"VoteForGame",RequestGame:"RequestGame",RestartGame:"RestartGame",Ping:"Ping",PlayerPosition:"PlayerPosition",Teleport:"Teleport",CheckWeatherStatus:"CheckWeatherStatus",MoveInventoryItem:"MoveInventoryItem",DropObject:"DropObject",PickupObject:"PickupObject",ToggleFavoriteItem:"ToggleFavoriteItem",PutItemInStorage:"PutItemInStorage",RetrieveItemFromStorage:"RetrieveItemFromStorage",MoveStorageItem:"MoveStorageItem",LogItems:"LogItems",PlantSeed:"PlantSeed",WaterPlant:"WaterPlant",HarvestCrop:"HarvestCrop",SellAllCrops:"SellAllCrops",PurchaseSeed:"PurchaseSeed",PurchaseEgg:"PurchaseEgg",PurchaseTool:"PurchaseTool",PurchaseDecor:"PurchaseDecor",PlantEgg:"PlantEgg",HatchEgg:"HatchEgg",PlantGardenPlant:"PlantGardenPlant",PotPlant:"PotPlant",MutationPotion:"MutationPotion",PickupDecor:"PickupDecor",PlaceDecor:"PlaceDecor",RemoveGardenObject:"RemoveGardenObject",PlacePet:"PlacePet",FeedPet:"FeedPet",PetPositions:"PetPositions",SwapPet:"SwapPet",StorePet:"StorePet",NamePet:"NamePet",SellPet:"SellPet",ReportSpeakingStart:"ReportSpeakingStart"};var He=(e=>(e[e.ReconnectInitiated=4100]="ReconnectInitiated",e[e.PlayerLeftVoluntarily=4200]="PlayerLeftVoluntarily",e[e.UserSessionSuperseded=4250]="UserSessionSuperseded",e[e.ConnectionSuperseded=4300]="ConnectionSuperseded",e[e.ServerDisposed=4310]="ServerDisposed",e[e.HeartbeatExpired=4400]="HeartbeatExpired",e[e.PlayerKicked=4500]="PlayerKicked",e[e.VersionMismatch=4700]="VersionMismatch",e[e.VersionExpired=4710]="VersionExpired",e[e.AuthenticationFailure=4800]="AuthenticationFailure",e))(He||{});new Set(Object.values(et));new Set(Object.values(E));const ch=["Room","Quinoa"],dh={Room:["Room"],Quinoa:ch};function Y(e,t={},n=M){const r=t,{scopePath:o,scope:i,...a}=r,s=typeof o=="string"?o:i,c=Array.isArray(o)?o:s==="Room"||s==="Quinoa"?dh[s]:null;return lh(e,c?{scopePath:c,...a}:a,n)}function uh(e,t=M){return Y(E.Chat,{scope:"Room",message:e},t)}function ph(e,t=M){return Y(E.Emote,{scope:"Room",emoteType:e},t)}function fh(e,t=M){return Y(E.Wish,{scope:"Quinoa",wish:e},t)}function gh(e,t=M){return Y(E.KickPlayer,{scope:"Room",playerId:e},t)}function mh(e,t=M){return Y(E.SetPlayerData,{scope:"Room",data:e},t)}function hh(e=M){return Y(E.UsurpHost,{scope:"Quinoa"},e)}function bh(e=M){return Y(E.ReportSpeakingStart,{scope:"Quinoa"},e)}function yh(e,t=M){return Y(E.SetSelectedGame,{scope:"Room",gameId:e},t)}function vh(e,t=M){return Y(E.VoteForGame,{scope:"Room",gameId:e},t)}function xh(e,t=M){return Y(E.RequestGame,{scope:"Room",gameId:e},t)}function wh(e=M){return Y(E.RestartGame,{scope:"Room"},e)}function kh(e,t=M){return Y(E.Ping,{scope:"Quinoa",id:e},t)}function tl(e,t,n=M){return Y(E.PlayerPosition,{scope:"Quinoa",x:e,y:t},n)}const Sh=tl;function Ch(e,t,n=M){return Y(E.Teleport,{scope:"Quinoa",x:e,y:t},n)}function Ah(e=M){return Y(E.CheckWeatherStatus,{scope:"Quinoa"},e)}function Th(e,t,n=M){return Y(E.MoveInventoryItem,{scope:"Quinoa",fromIndex:e,toIndex:t},n)}function Ih(e,t=M){return Y(E.DropObject,{scope:"Quinoa",slotIndex:e},t)}function Ph(e,t=M){return Y(E.PickupObject,{scope:"Quinoa",objectId:e},t)}function oi(e,t=M){return Y(E.ToggleFavoriteItem,{scope:"Quinoa",itemId:e},t)}function Eh(e,t=M){return Y(E.PutItemInStorage,{scope:"Quinoa",itemId:e},t)}function Mh(e,t=M){return Y(E.RetrieveItemFromStorage,{scope:"Quinoa",itemId:e},t)}function _h(e,t,n=M){return Y(E.MoveStorageItem,{scope:"Quinoa",fromIndex:e,toIndex:t},n)}function Lh(e=M){return Y(E.LogItems,{scope:"Quinoa"},e)}function Rh(e,t,n,r=M){return Y(E.PlantSeed,{scope:"Quinoa",seedId:e,x:t,y:n},r)}function Oh(e,t=M){return Y(E.WaterPlant,{scope:"Quinoa",plantId:e},t)}function Nh(e,t=M){return Y(E.HarvestCrop,{scope:"Quinoa",cropId:e},t)}function $h(e=M){return Y(E.SellAllCrops,{scope:"Quinoa"},e)}function Dh(e,t=M){return Y(E.PurchaseDecor,{scope:"Quinoa",decorId:e},t)}function Fh(e,t=M){return Y(E.PurchaseEgg,{scope:"Quinoa",eggId:e},t)}function zh(e,t=M){return Y(E.PurchaseTool,{scope:"Quinoa",toolId:e},t)}function Gh(e,t=M){return Y(E.PurchaseSeed,{scope:"Quinoa",seedId:e},t)}function jh(e,t,n,r=M){return Y(E.PlantEgg,{scope:"Quinoa",eggId:e,x:t,y:n},r)}function Bh(e,t=M){return Y(E.HatchEgg,{scope:"Quinoa",eggId:e},t)}function Wh(e,t,n,r=M){return Y(E.PlantGardenPlant,{scope:"Quinoa",plantId:e,x:t,y:n},r)}function Hh(e,t,n=M){return Y(E.PotPlant,{scope:"Quinoa",plantId:e,potId:t},n)}function Uh(e,t,n=M){return Y(E.MutationPotion,{scope:"Quinoa",potionId:e,targetId:t},n)}function Vh(e,t=M){return Y(E.PickupDecor,{scope:"Quinoa",decorInstanceId:e},t)}function Kh(e,t,n,r=M){return Y(E.PlaceDecor,{scope:"Quinoa",decorId:e,x:t,y:n},r)}function Yh(e,t=M){return Y(E.RemoveGardenObject,{scope:"Quinoa",objectId:e},t)}function qh(e,t,n,r=M){return Y(E.PlacePet,{scope:"Quinoa",petId:e,x:t,y:n},r)}function Xh(e,t,n=M){return Y(E.FeedPet,{scope:"Quinoa",petId:e,foodItemId:t},n)}function Jh(e,t=M){return Y(E.PetPositions,{scope:"Quinoa",positions:e},t)}function Qh(e,t,n=M){return Y(E.SwapPet,{scope:"Quinoa",petIdA:e,petIdB:t},n)}function Zh(e,t=M){return Y(E.StorePet,{scope:"Quinoa",petId:e},t)}function eb(e,t,n=M){return Y(E.NamePet,{scope:"Quinoa",petId:e,name:t},n)}function tb(e,t=M){return Y(E.SellPet,{scope:"Quinoa",petId:e},t)}let Yn=null;const rn=new Set;function wo(){const e=ht();if(!e.enabled){console.log("[AutoFavorite] Disabled");return}rn.clear(),Yn=wr().subscribeItems(t=>{if(t.added.length>0){const n=ht();for(const r of t.added)rb(r,n);}}),console.log(`✅ [AutoFavorite] Started - Watching ${e.simple.favoriteSpecies.length} species, ${e.simple.favoriteMutations.length} mutations`);}function nl(){Yn&&(Yn(),Yn=null),rn.clear(),console.log("🛑 [AutoFavorite] Stopped");}function nb(e){const t=ht();t.enabled=e,t.simple.enabled=e,Vs(t),e?wo():nl();}function rb(e,t){if(e.itemType!=="Produce"&&e.itemType!=="Pet")return;if(!e.id){console.warn("[AutoFavorite] Item has no ID:",e);return}if(!(rn.has(e.id)||e.isFavorited||e.favorited)&&rl(e,t.simple)){rn.add(e.id);try{oi(e.id),console.log(`[AutoFavorite] ⭐ Favorited ${e.itemType}: ${e.species||e.id}`);}catch(r){console.error("[AutoFavorite] WebSocket error:",r),rn.delete(e.id);}}}function rl(e,t){if(!t.enabled)return  false;const n=e.itemType==="Pet"?e.petSpecies:e.species;return n?!!(t.favoriteSpecies.includes(n)||t.favoriteMutations.length>0&&(e.mutations||[]).some(o=>t.favoriteMutations.includes(o))):false}function ob(){return Object.keys(ae.get("mutations")??{})}const ol={init(){this.isReady()||wo();},isReady(){return Oi()},DEFAULT_CONFIG:Us,STORAGE_KEY:Zo,loadConfig:ht,saveConfig:ei,updateConfig:Vs,updateSimpleConfig:ti,setFavoriteSpecies:$g,setFavoriteMutations:Dg,isEnabled:Oi,start:wo,stop:nl,setEnabled:nb,shouldFavorite:rl,getGameMutations:ob},ii=We.JOURNAL_CHECKER,il={enabled:false,autoRefresh:true,refreshIntervalMs:3e4};function Ft(){return Pe(ii,il)}function kr(e){Ee(ii,e);}function oa(){return Ft().enabled}function ib(e){const t=Ft();t.autoRefresh=e,kr(t);}function ab(e){const t=Ft();t.refreshIntervalMs=e,kr(t);}let Wr=null,ia=null;function al(){try{return Xs().get().myPlayer?.journal||null}catch{return null}}function sb(e){return e?`pro:${Object.keys(e.produce).length}-pet:${Object.keys(e.pets).length}`:"null"}function sl(){const e=ae.get("mutations")??{};return ["Normal",...Object.keys(e),"Max Weight"]}function ll(){const e=ae.get("mutations")??{};return ["Normal",...Object.entries(e).filter(([n,r])=>!("tileRef"in r)).map(([n])=>n),"Max Weight"]}function lb(){return Object.keys(ae.get("mutations")??{})}function cl(e){const n=(ae.get("pets")??{})[e];if(!n)return [];const r=new Set;return Array.isArray(n.abilities)&&n.abilities.forEach(o=>r.add(o)),Array.isArray(n.possibleAbilities)&&n.possibleAbilities.forEach(o=>r.add(o)),n.abilityTiers&&Object.values(n.abilityTiers).forEach(o=>{Array.isArray(o)&&o.forEach(i=>r.add(i));}),[...r]}function dl(e){const t=ae.get("plants")??{},n=Object.keys(t),r=sl(),o=e?.produce??{},i=[];let a=0;for(const u of n){const d=o[u]?.variantsLogged?.map(f=>f.variant)??[],p=r.filter(f=>!d.includes(f));a+=d.length,i.push({species:u,variantsLogged:d,variantsMissing:p,variantsTotal:r.length,variantsPercentage:r.length>0?d.length/r.length*100:0,isComplete:p.length===0});}const s=n.length*r.length,c=i.filter(u=>u.variantsLogged.length>0).length;return {total:n.length,logged:c,percentage:n.length>0?c/n.length*100:0,speciesDetails:i,variantsTotal:s,variantsLogged:a,variantsPercentage:s>0?a/s*100:0}}function ul(e){const t=ae.get("pets")??{},n=Object.keys(t),r=ll(),o=e?.pets??{},i=[];let a=0,s=0,c=0,u=0;for(const d of n){const p=o[d],f=p?.variantsLogged?.map(S=>S.variant)??[],g=p?.abilitiesLogged?.map(S=>S.ability)??[],m=r.filter(S=>!f.includes(S)),b=cl(d),x=b.filter(S=>!g.includes(S));s+=r.length,a+=f.length,u+=b.length,c+=Math.min(g.length,b.length),i.push({species:d,variantsLogged:f,variantsMissing:m,variantsTotal:r.length,variantsPercentage:r.length>0?f.length/r.length*100:0,abilitiesLogged:g,abilitiesMissing:x,abilitiesTotal:b.length,abilitiesPercentage:b.length>0?g.length/b.length*100:0,isComplete:m.length===0&&(b.length===0||x.length===0)});}const l=i.filter(d=>d.variantsLogged.length>0).length;return {total:n.length,logged:l,percentage:n.length>0?l/n.length*100:0,speciesDetails:i,variantsTotal:s,variantsLogged:a,variantsPercentage:s>0?a/s*100:0,abilitiesTotal:u,abilitiesLogged:c,abilitiesPercentage:u>0?c/u*100:0}}async function Sr(e=false){await ae.waitForAny();const t=al(),n=sb(t);if(!e&&Wr&&n===ia)return Wr;const r={plants:dl(t),pets:ul(t),lastUpdated:Date.now()};return Wr=r,ia=n,r}async function cb(){const e=await Sr();return {plants:e.plants.speciesDetails.filter(t=>t.variantsMissing.length>0).map(t=>({species:t.species,missing:t.variantsMissing})),pets:e.pets.speciesDetails.filter(t=>t.variantsMissing.length>0||(t.abilitiesMissing?.length??0)>0).map(t=>({species:t.species,missingVariants:t.variantsMissing,missingAbilities:t.abilitiesMissing??[]}))}}let on=null;function ko(){const e=Ft();e.enabled&&(e.autoRefresh&&!on&&(on=setInterval(async()=>{const t=await Sr();ai(t);},e.refreshIntervalMs)),console.log("✅ [JournalChecker] Started"));}function pl(){on&&(clearInterval(on),on=null);}function db(e){const t=Ft();t.enabled=e,kr(t),e?ko():pl();}function ai(e){window.dispatchEvent(new CustomEvent("gemini:journal-updated",{detail:e}));}async function ub(){const e=await Sr();return ai(e),e}const pb={init(){this.isReady()||ko();},isReady(){return oa()},DEFAULT_CONFIG:il,STORAGE_KEY:ii,loadConfig:Ft,saveConfig:kr,isEnabled:oa,setAutoRefresh:ib,setRefreshInterval:ab,getMyJournal:al,getCropVariants:sl,getPetVariants:ll,getAllMutations:lb,getPetAbilities:cl,calculateProduceProgress:dl,calculatePetProgress:ul,aggregateJournalProgress:Sr,getMissingSummary:cb,start:ko,stop:pl,setEnabled:db,refresh:ub,dispatchUpdate:ai},si=We.BULK_FAVORITE,fl={enabled:false,position:"top-right"};function Rt(){return Pe(si,fl)}function gl(e){Ee(si,e);}function fb(e){const t=Rt();t.position=e,gl(t);}function gb(){return Rt().enabled}function mb(e){return typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"}async function ml(e){const t=wr().get();if(!t?.items)return console.warn("[BulkFavorite] No inventory data available"),0;const n=new Set(t.favoritedItemIds??[]);let r=0;for(const o of t.items){if(!mb(o))continue;const i=n.has(o.id);e&&i||!e&&!i||(await oi(o.id,e),r++,await hb(50));}return console.log(`[BulkFavorite] ${e?"Favorited":"Unfavorited"} ${r} items`),r}function hb(e){return new Promise(t=>setTimeout(t,e))}function bb(e,t){const n=new MutationObserver(o=>{for(const i of o)for(const a of i.addedNodes){if(!(a instanceof Element))continue;a.matches(e)&&t(a);const s=a.querySelectorAll(e);for(const c of s)t(c);}});n.observe(document.body,{childList:true,subtree:true});const r=document.querySelectorAll(e);for(const o of r)t(o);return {disconnect:()=>n.disconnect()}}function yb(e,t){const n=new MutationObserver(r=>{for(const o of r)for(const i of o.removedNodes){if(!(i instanceof Element))continue;i.matches(e)&&t(i);const a=i.querySelectorAll(e);for(const s of a)t(s);}});return n.observe(document.body,{childList:true,subtree:true}),{disconnect:()=>n.disconnect()}}const hl=`
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
`;let ut=null,qn=null,Ot=null,Bt=null;const vb=`
  ${hl}

  :host {
    position: fixed;
    z-index: 9999;
    pointer-events: none;
  }
  
  .bulk-container {
    pointer-events: auto;
    display: flex;
    gap: 8px;
    padding: 10px;
    background: var(--bg);
    border-radius: var(--radius);
    border: 1px solid var(--border);
    box-shadow: 0 8px 32px var(--shadow);
    backdrop-filter: blur(var(--glass-blur));
    transition: all 0.3s ease;
  }
  
  .bulk-btn {
    padding: 8px 16px;
    border: 1px solid var(--btn-border);
    border-radius: var(--btn-radius);
    font-family: var(--font-ui);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    color: var(--fg);
    background: var(--btn-bg-start);
    box-shadow: 0 2px 4px var(--shadow);
    display: flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
  }
  
  .bulk-btn:hover:not(:disabled) {
    transform: translateY(-1px);
    border-color: var(--accent);
    background: var(--btn-primary-bg-start);
    box-shadow: 0 4px 12px var(--shadow);
  }
  
  .bulk-btn:active:not(:disabled) {
    transform: translateY(1px);
  }
  
  .bulk-btn.unfavorite {
    --accent: #f87171; /* Red accent for destructive action */
  }
  
  .bulk-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    filter: grayscale(1);
  }

  @media (max-width: 480px) {
    .bulk-container {
      flex-direction: column;
      width: calc(100vw - 40px);
      max-width: 280px;
    }
    .bulk-btn {
      width: 100%;
      justify-content: center;
    }
  }
`;function bl(e,t){an(),ut=w("div",{id:"gemini-bulk-favorite"}),qn=ut.attachShadow({mode:"open"});const n=w("style",null,vb),r=w("button",{className:"bulk-btn",id:"favorite-all",onclick:()=>aa(true,r,o)},"⭐ Favorite All"),o=w("button",{className:"bulk-btn unfavorite",id:"unfavorite-all",onclick:()=>aa(false,r,o)},"✖ Unfavorite All"),i=w("div",{className:"bulk-container"},r,o);qn.appendChild(n),qn.appendChild(i),document.body.appendChild(ut),Bt=new ResizeObserver(()=>{!ut||!e||xb(ut,e,t.position);}),Bt.observe(e),Bt.observe(document.body);const a=yb('[data-testid="inventory-panel"], .inventory-container, #inventory',an),s=Ot;Ot=()=>{s?.(),Bt?.disconnect(),Bt=null,a.disconnect(),an();};}function an(){ut?.remove(),ut=null,qn=null;}function xb(e,t,n){const r=t.getBoundingClientRect(),o=window.innerWidth<=480,i=12;if(o){e.style.top=`${r.bottom-110}px`,e.style.left="50%",e.style.transform="translateX(-50%)";return}switch(e.style.transform="none",n){case "top-right":e.style.top=`${r.top+i}px`,e.style.left=`${r.right-220}px`;break;case "top-left":e.style.top=`${r.top+i}px`,e.style.left=`${r.left+i}px`;break;case "bottom-right":e.style.top=`${r.bottom-60}px`,e.style.left=`${r.right-220}px`;break;case "bottom-left":e.style.top=`${r.bottom-60}px`,e.style.left=`${r.left+i}px`;break}}async function aa(e,t,n){t.disabled=true,n.disabled=true;const r=t.textContent,o=n.textContent;try{const i=await ml(e),a=e?t:n;a.textContent=`✓ ${i} items`,setTimeout(()=>{t.textContent=r,n.textContent=o;},2e3);}finally{t.disabled=false,n.disabled=false;}}function So(){const e=Rt();if(!e.enabled)return;const t=bb('[data-testid="inventory-panel"], .inventory-container, #inventory',r=>{bl(r,e);}),n=Ot;Ot=()=>{n?.(),t.disconnect(),an();},console.log("✅ [BulkFavorite] Started");}function Co(){Ot?.(),Ot=null,console.log("🛑 [BulkFavorite] Stopped");}function wb(e){const t=Rt();t.enabled=e,e?So():Co();}let Dn=false;const kb={init(){if(Dn)return;Rt().enabled&&So(),Dn=true,console.log("✅ [MGBulkFavorite] Initialized");},isReady(){return Dn},DEFAULT_CONFIG:fl,STORAGE_KEY:si,loadConfig:Rt,saveConfig:gl,isEnabled:gb,setPosition:fb,bulkFavorite:ml,start:So,stop:Co,setEnabled:wb,renderButton:bl,removeButton:an,destroy(){Co(),Dn=false;}};class Sb{constructor(){U(this,"achievements",new Map);U(this,"data");U(this,"STORAGE_KEY",We.ACHIEVEMENTS);U(this,"onUnlockCallbacks",[]);U(this,"onProgressCallbacks",[]);this.data=this.loadData();}loadData(){return Pe(this.STORAGE_KEY,{unlocked:{},progress:{}})}saveData(){Ee(this.STORAGE_KEY,this.data);}register(t){this.achievements.set(t.id,t),this.data.progress[t.id]||(this.data.progress[t.id]={current:0,target:t.target,percentage:0});}registerMany(t){for(const n of t)this.register(n);}async checkAchievement(t){const n=this.achievements.get(t);if(!n)throw new Error(`Achievement not found: ${t}`);const r=this.isUnlocked(t),o=await n.checkProgress(),i={current:o,target:n.target,percentage:Math.min(100,Math.floor(o/n.target*100))},a=this.data.progress[t];this.data.progress[t]=i;const s=o>=n.target;return !r&&s?this.unlock(t,i):s||this.triggerProgressCallbacks({achievement:n,progress:i,previousProgress:a}),this.saveData(),{id:t,wasUnlocked:r,isUnlocked:s,progress:i}}async checkAllAchievements(){const t=[];for(const n of this.achievements.keys()){const r=await this.checkAchievement(n);t.push(r);}return t}unlock(t,n){const r=this.achievements.get(t);if(!r)return;const o={achievementId:t,unlockedAt:Date.now(),progress:n};this.data.unlocked[t]=o,this.saveData(),this.triggerUnlockCallbacks({achievement:r,unlockedAt:o.unlockedAt,progress:n});}isUnlocked(t){return !!this.data.unlocked[t]}getAchievement(t){return this.achievements.get(t)||null}getAllAchievements(){return Array.from(this.achievements.values())}getAchievementsByCategory(t){return Array.from(this.achievements.values()).filter(n=>n.category===t)}getAchievementsByRarity(t){return Array.from(this.achievements.values()).filter(n=>n.rarity===t)}getUnlockedAchievements(){return Object.values(this.data.unlocked)}getLockedAchievements(){return Array.from(this.achievements.values()).filter(t=>!this.isUnlocked(t.id)&&!t.hidden)}getProgress(t){return this.data.progress[t]||null}getCompletionPercentage(){const t=this.achievements.size,n=Object.keys(this.data.unlocked).length;return t>0?Math.floor(n/t*100):0}getCompletionStats(){const t=this.achievements.size,n=Object.keys(this.data.unlocked).length,r=t-n,o=this.getCompletionPercentage();return {total:t,unlocked:n,locked:r,percentage:o}}onUnlock(t){return this.onUnlockCallbacks.push(t),()=>{const n=this.onUnlockCallbacks.indexOf(t);n!==-1&&this.onUnlockCallbacks.splice(n,1);}}onProgress(t){return this.onProgressCallbacks.push(t),()=>{const n=this.onProgressCallbacks.indexOf(t);n!==-1&&this.onProgressCallbacks.splice(n,1);}}triggerUnlockCallbacks(t){for(const n of this.onUnlockCallbacks)try{n(t);}catch(r){console.warn("[Achievements] Unlock callback error:",r);}}triggerProgressCallbacks(t){for(const n of this.onProgressCallbacks)try{n(t);}catch(r){console.warn("[Achievements] Progress callback error:",r);}}reset(){this.data={unlocked:{},progress:{}};for(const t of this.achievements.values())this.data.progress[t.id]={current:0,target:t.target,percentage:0};this.saveData();}exportData(){return JSON.stringify(this.data,null,2)}importData(t){try{const n=JSON.parse(t);return this.data=n,this.saveData(),!0}catch(n){return console.warn("[Achievements] Failed to import data:",n),false}}}let sn=null;function ze(){return sn||(sn=new Sb),sn}function Cb(){sn&&(sn=null);}let Fn=false;const Ab={init(){Fn||(ze(),Fn=true,console.log("✅ [MGAchievements] Initialized"));},isReady(){return Fn},getManager(){return ze()},register:(...e)=>ze().register(...e),registerMany:(...e)=>ze().registerMany(...e),isUnlocked:(...e)=>ze().isUnlocked(...e),getAll:()=>ze().getAllAchievements(),getUnlocked:()=>ze().getUnlockedAchievements(),getStats:()=>ze().getCompletionStats(),checkAll:()=>ze().checkAllAchievements(),onUnlock:(...e)=>ze().onUnlock(...e),onProgress:(...e)=>ze().onProgress(...e),destroy(){Cb(),Fn=false;}},Tb={enabled:true},yl=We.ANTI_AFK,Ib=["visibilitychange","blur","focus","focusout","pagehide","freeze","resume"],Pb=25e3,Eb=1,Mb=1e-5,te={listeners:[],savedProps:{hidden:void 0,visibilityState:void 0,hasFocus:null},audioCtx:null,oscillator:null,gainNode:null,heartbeatInterval:null};function _b(){const e=(t,n)=>{const r=o=>{o.stopImmediatePropagation(),o.preventDefault?.();};t.addEventListener(n,r,{capture:true}),te.listeners.push({type:n,handler:r,target:t});};for(const t of Ib)e(document,t),e(window,t);}function Lb(){for(const{type:e,handler:t,target:n}of te.listeners)try{n.removeEventListener(e,t,{capture:!0});}catch{}te.listeners.length=0;}function Rb(){const e=Object.getPrototypeOf(document);te.savedProps.hidden=Object.getOwnPropertyDescriptor(e,"hidden"),te.savedProps.visibilityState=Object.getOwnPropertyDescriptor(e,"visibilityState"),te.savedProps.hasFocus=document.hasFocus?document.hasFocus.bind(document):null;try{Object.defineProperty(e,"hidden",{configurable:!0,get:()=>!1});}catch{}try{Object.defineProperty(e,"visibilityState",{configurable:!0,get:()=>"visible"});}catch{}try{document.hasFocus=()=>!0;}catch{}}function Ob(){const e=Object.getPrototypeOf(document);try{te.savedProps.hidden&&Object.defineProperty(e,"hidden",te.savedProps.hidden);}catch{}try{te.savedProps.visibilityState&&Object.defineProperty(e,"visibilityState",te.savedProps.visibilityState);}catch{}try{te.savedProps.hasFocus&&(document.hasFocus=te.savedProps.hasFocus);}catch{}}function sr(){te.audioCtx&&te.audioCtx.state!=="running"&&te.audioCtx.resume?.().catch(()=>{});}function Nb(){try{const e=window.AudioContext||window.webkitAudioContext;te.audioCtx=new e({latencyHint:"interactive"}),te.gainNode=te.audioCtx.createGain(),te.gainNode.gain.value=Mb,te.oscillator=te.audioCtx.createOscillator(),te.oscillator.frequency.value=Eb,te.oscillator.connect(te.gainNode).connect(te.audioCtx.destination),te.oscillator.start(),document.addEventListener("visibilitychange",sr,{capture:!0}),window.addEventListener("focus",sr,{capture:!0});}catch{vl();}}function vl(){try{te.oscillator?.stop();}catch{}try{te.oscillator?.disconnect(),te.gainNode?.disconnect();}catch{}try{te.audioCtx?.close?.();}catch{}document.removeEventListener("visibilitychange",sr,{capture:true}),window.removeEventListener("focus",sr,{capture:true}),te.oscillator=null,te.gainNode=null,te.audioCtx=null;}function $b(){const e=document.querySelector("canvas")||document.body||document.documentElement;te.heartbeatInterval=window.setInterval(()=>{try{e.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:1,clientY:1}));}catch{}},Pb);}function Db(){te.heartbeatInterval!==null&&(clearInterval(te.heartbeatInterval),te.heartbeatInterval=null);}function Hr(){Rb(),_b(),Nb(),$b();}function Ur(){Db(),vl(),Lb(),Ob();}let zn=false,_e=false;function St(){return Pe(yl,Tb)}function Vr(e){Ee(yl,e);}const Et={init(){if(zn)return;const e=St();zn=true,e.enabled?(Hr(),_e=true,console.log("[MGAntiAfk] Initialized and started")):console.log("[MGAntiAfk] Initialized but disabled");},isReady(){return zn},isRunning(){return _e},isEnabled(){return St().enabled},enable(){const e=St();e.enabled=true,Vr(e),_e||(Hr(),_e=true,console.log("[MGAntiAfk] Enabled"));},disable(){const e=St();e.enabled=false,Vr(e),_e&&(Ur(),_e=false,console.log("[MGAntiAfk] Disabled"));},toggle(){Et.isEnabled()?Et.disable():Et.enable();},getConfig(){return St()},updateConfig(e){const n={...St(),...e};Vr(n),n.enabled&&!_e?(Hr(),_e=true):!n.enabled&&_e&&(Ur(),_e=false);},destroy(){_e&&(Ur(),_e=false),zn=false,console.log("[MGAntiAfk] Destroyed");}},xl=We.PET_TEAM,Fb={enabled:false,teams:[],activeTeamId:null},zb=3,sa=50,Xt="";function Ae(){return Pe(xl,Fb)}function xt(e){Ee(xl,e);}function Gb(e){const n={...Ae(),...e};return xt(n),n}function jb(){return Ae().enabled}function Bb(e){Gb({enabled:e});}function Wb(){return crypto.randomUUID()}function Ao(){return Date.now()}function wl(e=[]){const t=[...e];for(;t.length<zb;)t.push(Xt);return [t[0]||Xt,t[1]||Xt,t[2]||Xt]}function kl(e,t){const n=Ae(),r=e.trim();return r?!n.teams.some(o=>o.name.trim()===r&&o.id!==t):false}function Sl(e,t){const n=Ae(),r=[...e].sort().join(",");return !n.teams.some(o=>o.id===t?false:[...o.petIds].sort().join(",")===r)}function Cl(e){const n=ri().get(),r=new Set(n.all.map(o=>o.id));for(const o of e)if(o!==Xt&&!r.has(o))return  false;return  true}function Hb(e,t=[]){const n=Ae();if(n.teams.length>=sa)throw new Error(`Maximum number of teams (${sa}) reached`);if(!kl(e))throw new Error(`Team name "${e}" already exists`);const r=e.trim();if(!r)throw new Error("Team name cannot be empty");const o=wl(t);if(!Cl(o))throw new Error("One or more pet IDs do not exist");if(!Sl(o))throw new Error("A team with this exact composition already exists");const i={id:Wb(),name:r,petIds:o,createdAt:Ao(),updatedAt:Ao()};return n.teams.push(i),xt(n),i}function Al(e,t){const n=Ae(),r=n.teams.findIndex(a=>a.id===e);if(r===-1)return null;const o=n.teams[r];if(t.name!==void 0){const a=t.name.trim();if(!a)throw new Error("Team name cannot be empty");if(!kl(a,e))throw new Error(`Team name "${a}" already exists`);t.name=a;}if(t.petIds!==void 0){const a=wl(t.petIds);if(!Cl(a))throw new Error("One or more pet IDs do not exist");if(!Sl(a,e))throw new Error("A team with this exact composition already exists");t.petIds=a;}const i={...o,...t,id:o.id,createdAt:o.createdAt,updatedAt:Ao()};return n.teams[r]=i,xt(n),i}function Ub(e){const t=Ae(),n=t.teams.length;return t.teams=t.teams.filter(r=>r.id!==e),t.teams.length===n?false:(xt(t),true)}function Vb(e){return Ae().teams.find(n=>n.id===e)??null}function Kb(){return [...Ae().teams]}function Yb(e){const t=Ae(),n=e.trim();return t.teams.find(r=>r.name.trim()===n)??null}function qb(e){const t=Ae(),n=new Map(t.teams.map(r=>[r.id,r]));if(e.length!==t.teams.length)return  false;for(const r of e)if(!n.has(r))return  false;return t.teams=e.map(r=>n.get(r)),xt(t),true}function Xb(e,t){try{return Al(e,{name:t})!==null}catch(n){return console.warn(`[PetTeam] Failed to rename team ${e}:`,n),false}}function Jb(){const t=ri().get().byLocation.active;if(t.length===0)return null;const n=t.map(o=>o.id).sort(),r=Ae();for(const o of r.teams){const i=o.petIds.filter(a=>a!=="").sort();if(i.length===n.length&&i.every((a,s)=>a===n[s]))return o.id}return null}function Tl(){const e=Jb(),t=Ae();return e!==t.activeTeamId&&(t.activeTeamId=e,xt(t)),e}function Qb(e){const t=Ae();t.activeTeamId=e,xt(t);}function Zb(e){return Tl()===e}let Gn=false;const he={init(){if(Gn)return;if(!Ae().enabled){console.log("[PetTeam] Feature disabled");return}Gn=true,console.log("[PetTeam] Feature initialized");},destroy(){Gn&&(Gn=false,console.log("[PetTeam] Feature destroyed"));},isEnabled:jb,setEnabled:Bb,createTeam:Hb,updateTeam:Al,deleteTeam:Ub,renameTeam:Xb,getTeam:Vb,getAllTeams:Kb,getTeamByName:Yb,reorderTeams:qb,getActiveTeamId:Tl,setActiveTeamId:Qb,isActiveTeam:Zb};class Il{constructor(){U(this,"stats");U(this,"STORAGE_KEY",We.TRACKER_STATS);this.stats=this.loadStats(),this.startSession();}loadStats(){return Pe(this.STORAGE_KEY,this.getDefaultStats())}saveStats(){Ee(this.STORAGE_KEY,this.stats);}getDefaultStats(){return {session:{sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},allTime:{totalSessions:0,totalPlayTime:0,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0,crops:{},pets:{}}}}startSession(){this.stats.session={sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},this.stats.allTime.totalSessions++,this.saveStats();}endSession(){this.stats.session.sessionEnd=Date.now();const t=this.stats.session.sessionEnd-this.stats.session.sessionStart;this.stats.allTime.totalPlayTime+=t,this.saveStats();}recordHarvest(t,n=1,r=[]){this.stats.session.cropsHarvested+=n,this.stats.allTime.cropsHarvested+=n,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].harvested+=n;for(const o of r)this.stats.allTime.crops[t].mutations[o]||(this.stats.allTime.crops[t].mutations[o]=0),this.stats.allTime.crops[t].mutations[o]++;this.saveStats();}recordCropSale(t,n=1,r=0){this.stats.session.cropsSold+=n,this.stats.session.coinsEarned+=r,this.stats.allTime.cropsSold+=n,this.stats.allTime.coinsEarned+=r,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].sold+=n,this.stats.allTime.crops[t].totalValue+=r,this.saveStats();}recordPetHatch(t,n=[],r=[]){this.stats.session.petsHatched++,this.stats.allTime.petsHatched++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].hatched++;for(const o of n)this.stats.allTime.pets[t].mutations[o]||(this.stats.allTime.pets[t].mutations[o]=0),this.stats.allTime.pets[t].mutations[o]++;for(const o of r)this.stats.allTime.pets[t].abilities[o]||(this.stats.allTime.pets[t].abilities[o]=0),this.stats.allTime.pets[t].abilities[o]++;this.saveStats();}recordPetSale(t,n=0){this.stats.session.petsSold++,this.stats.session.coinsEarned+=n,this.stats.allTime.petsSold++,this.stats.allTime.coinsEarned+=n,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].sold++,this.saveStats();}recordPetFeed(t){this.stats.session.petsFed++,this.stats.allTime.petsFed++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].fed++,this.saveStats();}recordSeedPurchase(t,n=1,r=0){this.stats.session.seedsPurchased+=n,this.stats.session.coinsSpent+=r,this.stats.allTime.seedsPurchased+=n,this.stats.allTime.coinsSpent+=r,this.saveStats();}recordEggPurchase(t,n=1,r=0){this.stats.session.eggsPurchased+=n,this.stats.session.coinsSpent+=r,this.stats.allTime.eggsPurchased+=n,this.stats.allTime.coinsSpent+=r,this.saveStats();}recordAbilityProc(t){this.stats.session.abilityProcs++,this.stats.allTime.abilityProcs++,this.saveStats();}recordCoinsEarned(t){this.stats.session.coinsEarned+=t,this.stats.allTime.coinsEarned+=t,this.saveStats();}recordCoinsSpent(t){this.stats.session.coinsSpent+=t,this.stats.allTime.coinsSpent+=t,this.saveStats();}getStats(){return {...this.stats}}getSessionStats(){return {...this.stats.session}}getAllTimeStats(){return {...this.stats.allTime}}getCropStats(t){return this.stats.allTime.crops[t]||null}getPetStats(t){return this.stats.allTime.pets[t]||null}getTopCrops(t=10){return Object.entries(this.stats.allTime.crops).map(([n,r])=>({species:n,stats:r})).sort((n,r)=>r.stats.harvested-n.stats.harvested).slice(0,t)}getTopPets(t=10){return Object.entries(this.stats.allTime.pets).map(([n,r])=>({species:n,stats:r})).sort((n,r)=>r.stats.hatched-n.stats.hatched).slice(0,t)}resetSession(){this.startSession();}resetAll(){this.stats=this.getDefaultStats(),this.saveStats();}exportStats(){return JSON.stringify(this.stats,null,2)}importStats(t){try{const n=JSON.parse(t);return this.stats=n,this.saveStats(),!0}catch(n){return console.warn("[StatsTracker] Failed to import stats:",n),false}}}let Mt=null;function ey(){return Mt||(Mt=new Il),Mt}function ty(){Mt&&(Mt.endSession(),Mt=null);}function Pl(e){const t=br(e.xp),n=yr(e.petSpecies,e.targetScale),r=vr(e.petSpecies,e.xp,n),o=xr(e.petSpecies,t),i=qs(e.petSpecies),a=om(r,n,i),s=im(r,n);return {current:r,max:n,progress:s,age:t,isMature:o,strengthPerHour:i,hoursToMax:a}}function El(e){return {...e,strength:Pl(e)}}function Ml(e){return e.map(El)}function ny(e){if(e.length===0)return {averageCurrent:0,averageMax:0,totalMature:0,totalImmature:0,strongestPet:null,weakestPet:null};const t=Ml(e),n=t.reduce((c,u)=>c+u.strength.current,0),r=t.reduce((c,u)=>c+u.strength.max,0),o=t.filter(c=>c.strength.isMature).length,i=t.length-o,a=t.reduce((c,u)=>u.strength.max>(c?.strength.max||0)?u:c,t[0]),s=t.reduce((c,u)=>u.strength.max<(c?.strength.max||1/0)?u:c,t[0]);return {averageCurrent:Math.round(n/t.length),averageMax:Math.round(r/t.length),totalMature:o,totalImmature:i,strongestPet:a,weakestPet:s}}const ry=Object.freeze(Object.defineProperty({__proto__:null,calculatePetStrength:Pl,enrichPetWithStrength:El,enrichPetsWithStrength:Ml,getPetStrengthStats:ny},Symbol.toStringTag,{value:"Module"}));class _l{constructor(){U(this,"logs",[]);U(this,"maxLogs",1e3);U(this,"unsubscribe",null);U(this,"isInitialized",false);}init(){this.isInitialized||(this.unsubscribe=yn.myPets.subscribeAbility(t=>{this.log({abilityId:t.trigger.abilityId||"unknown",petId:t.pet.id,petSpecies:t.pet.petSpecies,petName:t.pet.name,timestamp:t.trigger.performedAt||Date.now()});}),this.isInitialized=true);}log(t){const n={...t,id:`${t.timestamp}-${Math.random().toString(36).substr(2,9)}`};this.logs.push(n),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs));}getLogs(t){let n=this.logs;t?.abilityId&&(n=n.filter(o=>o.abilityId===t.abilityId)),t?.petId&&(n=n.filter(o=>o.petId===t.petId)),t?.petSpecies&&(n=n.filter(o=>o.petSpecies===t.petSpecies));const{since:r}=t??{};return r!==void 0&&(n=n.filter(o=>o.timestamp>=r)),t?.limit&&(n=n.slice(-t.limit)),n}getStats(t=36e5){const n=Date.now()-t,r=this.logs.filter(i=>i.timestamp>=n),o=new Map;for(const i of r){o.has(i.abilityId)||o.set(i.abilityId,{abilityId:i.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});const a=o.get(i.abilityId);a.count++,(!a.lastProc||i.timestamp>a.lastProc)&&(a.lastProc=i.timestamp);}for(const i of o.values())i.procsPerMinute=i.count/t*6e4,i.procsPerHour=i.count/t*36e5;return o}getAbilityStats(t,n=36e5){return this.getStats(n).get(t)||null}getPetStats(t,n=36e5){const r=Date.now()-n,o=this.logs.filter(a=>a.petId===t&&a.timestamp>=r),i=new Map;for(const a of o){i.has(a.abilityId)||i.set(a.abilityId,{abilityId:a.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});const s=i.get(a.abilityId);s.count++,(!s.lastProc||a.timestamp>s.lastProc)&&(s.lastProc=a.timestamp);}for(const a of i.values())a.procsPerMinute=a.count/n*6e4,a.procsPerHour=a.count/n*36e5;return {totalProcs:o.length,abilities:i}}getTopAbilities(t=10,n=36e5){return Array.from(this.getStats(n).values()).sort((o,i)=>i.count-o.count).slice(0,t)}clear(){this.logs=[];}setMaxLogs(t){this.maxLogs=t,this.logs.length>t&&(this.logs=this.logs.slice(-t));}getLogCount(){return this.logs.length}isActive(){return this.isInitialized}destroy(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null),this.logs=[],this.isInitialized=false;}}let pt=null;function oy(){return pt||(pt=new _l,pt.init()),pt}function iy(){pt&&(pt.destroy(),pt=null);}const ay={StatsTracker:Il,getStatsTracker:ey,destroyStatsTracker:ty},sy={AbilityLogger:_l,getAbilityLogger:oy,destroyAbilityLogger:iy,...ry},la={enabled:false,favoriteProduceList:[],favoritePetsList:[],favoriteMutations:[]},Ge=[{id:"Rainbow",color:"#FF00FF",desc:"All Rainbow items"},{id:"Gold",color:"#EBC800",desc:"All Gold items"},{id:"Wet",color:"#5FFFFF",desc:"All Wet items"},{id:"Chilled",color:"#B4E6FF",desc:"All Chilled items"},{id:"Frozen",color:"#B9C8FF",desc:"All Frozen items"},{id:"Dawnlit",color:"#F59BE1",desc:"Dawn mutations"},{id:"Dawncharged",color:"#C896FF",desc:"Dawn charged"},{id:"Ambershine",color:"#FFB478",desc:"Amber mutations"},{id:"Ambercharged",color:"#FA8C4B",desc:"Amber charged"}],ly={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function Ct(e){return e?ly[e]??0:0}class cy extends Nt{constructor(){super({id:"tab-auto-favorite",label:"Auto-Favorite"});U(this,"config",la);U(this,"allPlants",[]);U(this,"allPets",[]);U(this,"sectionElement",null);}async build(n){const r=this.createGrid("12px");r.id="auto-favorite-settings";const o=document.createElement("style");o.textContent=`
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

      /* On narrow containers, buttons will stack automatically due to flex-basis */
    `,n.appendChild(o),this.sectionElement=r,n.appendChild(r),this.config=Pe(We.AUTO_FAVORITE_UI,la),await this.loadGameData(),await this.waitForSprites(),this.renderContent();}async loadGameData(){try{await ae.waitForAny(3e3).catch(()=>{}),await Promise.all([ae.waitFor("plants",3e3).catch(()=>console.warn("[AutoFavorite UI] Still waiting for plants data...")),ae.waitFor("pets",3e3).catch(()=>console.warn("[AutoFavorite UI] Still waiting for pets data..."))]);const n=ae.get("plants")||{},r=ae.get("pets")||{};this.allPlants=Object.keys(n).sort((o,i)=>{const a=n[o]?.seed?.rarity||null,s=n[i]?.seed?.rarity||null,c=Ct(a)-Ct(s);return c!==0?c:o.localeCompare(i,void 0,{numeric:!0,sensitivity:"base"})}),this.allPets=Object.keys(r).sort((o,i)=>{const a=r[o]?.rarity||null,s=r[i]?.rarity||null,c=Ct(a)-Ct(s);return c!==0?c:o.localeCompare(i,void 0,{numeric:!0,sensitivity:"base"})});}catch(n){console.error("[AutoFavorite UI] Failed to load game data:",n);}}async waitForSprites(){if(ge.isReady())return;const n=1e4,r=100;let o=0;return new Promise(i=>{const a=()=>{ge.isReady()||o>=n?i():(o+=r,setTimeout(a,r));};a();})}renderContent(){this.sectionElement&&(this.sectionElement.innerHTML="",this.sectionElement.appendChild(this.createMasterToggle()),this.sectionElement.appendChild(this.createMutationsCard()),this.sectionElement.appendChild(this.createProduceCard()),this.sectionElement.appendChild(this.createPetsCard()));}createMasterToggle(){const n=w("div",{className:"kv"}),r=lr({text:"Enable Auto-Favorite",tone:"default",size:"lg"}),o=Eo({checked:this.config.enabled,onChange:i=>{this.config.enabled=i,this.saveConfig();}});return n.append(r.root,o.root),Se({title:"Auto-Favorite",padding:"lg"},n,w("p",{style:"margin-top: 6px; font-size: 12px; color: var(--muted);"},"Automatically favorite items when added to inventory"))}createMutationsCard(){const n=w("div",{className:"u-col"}),r=w("div",{className:"mut-row"});r.appendChild(this.createMutationButton(Ge[0])),r.appendChild(this.createMutationButton(Ge[1])),n.appendChild(r);const o=w("div",{className:"mut-row"});o.appendChild(this.createMutationButton(Ge[2])),o.appendChild(this.createMutationButton(Ge[3])),o.appendChild(this.createMutationButton(Ge[4])),n.appendChild(o);const i=w("div",{className:"mut-row"});i.appendChild(this.createMutationButton(Ge[5])),i.appendChild(this.createMutationButton(Ge[6])),n.appendChild(i);const a=w("div",{className:"mut-row"});return a.appendChild(this.createMutationButton(Ge[7])),a.appendChild(this.createMutationButton(Ge[8])),n.appendChild(a),Se({title:"Mutations Priority",variant:"soft",padding:"lg",expandable:true,defaultExpanded:true},n,w("p",{style:"margin-top: 8px; font-size: 11px; color: var(--muted);"},`${this.config.favoriteMutations.length} / ${Ge.length} active`))}createMutationButton(n){let r=this.config.favoriteMutations.includes(n.id);const o=n.color,i=parseInt(o.slice(1,3),16),a=parseInt(o.slice(3,5),16),s=parseInt(o.slice(5,7),16),c=f=>{let g=`rgba(${i}, ${a}, ${s}, 0.25)`,m=o;return n.id==="Rainbow"&&f&&(g="linear-gradient(135deg, rgba(255,0,0,0.3) 0%, rgba(255,165,0,0.3) 20%, rgba(255,255,0,0.3) 40%, rgba(0,128,0,0.3) 60%, rgba(0,0,255,0.3) 80%, rgba(75,0,130,0.3) 100%)",m="#fff9c4"),`
                padding: 8px 12px;
                min-height: 52px;
                border-radius: var(--card-radius, 12px);
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                background: ${f?g:"color-mix(in oklab, var(--bg) 12%, transparent)"};
                border: 2px solid ${f?m:"color-mix(in oklab, var(--border) 40%, transparent)"};
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 12px;
                box-shadow: ${f?n.id==="Rainbow"?"0 4px 18px rgba(255,255,255,0.25)":`0 4px 12px rgba(${i}, ${a}, ${s}, 0.3)`:"none"};
                opacity: ${f?"1":"0.8"};
                width: 100%;
            `},u=w("div",{className:"mut-btn",style:c(r)}),l=w("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(ge.isReady()){const f=ge.toCanvas("plant","Sunflower",{mutations:[n.id],scale:.16});f.style.width="28px",f.style.height="28px",f.style.objectFit="contain",l.appendChild(f);}}catch{}const d=n.id.charAt(0).toUpperCase()+n.id.slice(1).toLowerCase(),p=w("div",{style:"font-size: 13px; font-weight: 600; color: var(--fg); text-shadow: 0 1px 2px rgba(0,0,0,0.5); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"},d);if(u.append(l,p),n.id==="Rainbow"||n.id==="Gold"){const f=w("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(ge.isReady()){const g=ge.toCanvas("pet","Capybara",{mutations:[n.id],scale:.16});g.style.width="28px",g.style.height="28px",g.style.objectFit="contain",f.appendChild(g);}}catch{}u.append(f);}else {const f=w("div",{style:"width: 28px; flex-shrink: 0;"});u.append(f);}return u.addEventListener("click",f=>{f.stopPropagation(),r?(this.config.favoriteMutations=this.config.favoriteMutations.filter(m=>m!==n.id),r=false):(this.config.favoriteMutations.push(n.id),r=true),u.style.cssText=c(r),this.saveConfig();const g=this.sectionElement?.querySelector(".card p");g&&(g.textContent=`${this.config.favoriteMutations.length} / ${Ge.length} active`);}),u}createProduceCard(){return this.createItemSelectionCard({title:"Produce",items:this.allPlants,category:"plant",selected:this.config.favoriteProduceList,onUpdate:n=>{this.config.favoriteProduceList=n,this.saveConfig();}})}createPetsCard(){return this.createItemSelectionCard({title:"Pets",items:this.allPets,category:"pet",selected:this.config.favoritePetsList,onUpdate:n=>{this.config.favoritePetsList=n,this.saveConfig();}})}createItemSelectionCard(n){const{title:r,items:o,category:i,selected:a,onUpdate:s}=n;let c=new Set(a),u=o;const l=w("div",{style:"margin-bottom: 8px;"}),d=Ea({placeholder:`Search ${r.toLowerCase()}...`,value:"",debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:h=>{const k=h.trim().toLowerCase();k?u=o.filter(T=>T.toLowerCase().includes(k)):u=o,v.setData(m());}});l.appendChild(d.root);const p=w("div",{style:"display: flex; gap: 8px; margin-bottom: 12px;"}),f=nt({label:"Select All",variant:"default",size:"sm",onClick:()=>{const h=m().map(k=>k.id);v.setSelection(h);}}),g=nt({label:"Deselect All",variant:"default",size:"sm",onClick:()=>{v.clearSelection();}});p.append(f,g);const m=()=>u.map(h=>({id:h,name:h,rarity:this.getItemRarity(h,i),selected:c.has(h)})),b=h=>{if(!h){const T=w("span",{style:"opacity:0.5;"});return T.textContent="—",T}return Ma({variant:"rarity",rarity:h,size:"sm"}).root},x=h=>{const k=w("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0; background: rgba(0,0,0,0.05); border-radius: 6px;"});try{if(ge.isReady()){let T=i,I=h;i==="plant"&&(["Bamboo","Cactus"].includes(h)&&(T="tallplant"),h==="DawnCelestial"&&(I="DawnCelestialCrop"),h==="MoonCelestial"&&(I="MoonCelestialCrop"),h==="OrangeTulip"&&(I="Tulip"));const L=ge.toCanvas(T,I,{scale:.5});L.style.width="28px",L.style.height="28px",L.style.objectFit="contain",k.appendChild(L);}}catch{}return k},v=Pa({columns:[{key:"name",header:"Name",width:"1fr",align:"center",sortable:true,sortFn:(h,k)=>h.name.localeCompare(k.name,void 0,{numeric:true,sensitivity:"base"}),render:h=>{const k=w("div",{style:"display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%;"}),T=x(h.id),I=w("span",{style:"font-weight: 500; color: var(--fg); white-space: nowrap;"},h.name);return k.append(T,I),k}},{key:"rarity",header:"Rarity",width:"100px",align:"center",sortable:true,sortFn:(h,k)=>Ct(h.rarity)-Ct(k.rarity),render:h=>b(h.rarity)}],data:m(),maxHeight:280,compact:true,zebra:true,animations:true,selectable:true,selectOnRowClick:true,hideHeaderCheckbox:true,initialSelection:Array.from(c),getRowId:h=>h.id,onSelectionChange:h=>{c.clear(),h.forEach(k=>c.add(k)),s(Array.from(c)),C();}}),y=w("p",{style:"margin-top: 8px; font-size: 11px; color: var(--muted);"}),C=()=>{y.textContent=`${c.size} / ${o.length} selected`;};return C(),Se({title:`${r} (${c.size}/${o.length})`,variant:"soft",padding:"lg",expandable:true,defaultExpanded:false},l,p,v.root,y)}getItemRarity(n,r){try{if(r==="pet")return (ae.get("pets")||{})[n]?.rarity||null;if(r==="plant"){const o=ae.get("plants")||{},i=o[n];if(i?.seed?.rarity)return i.seed.rarity;const a=n.toLowerCase();for(const s of Object.values(o))if(s?.seed?.name?.toLowerCase()===a||s?.plant?.name?.toLowerCase()===a)return s.seed.rarity}}catch{}return null}async saveConfig(){Ee(We.AUTO_FAVORITE_UI,this.config);try{const{setEnabled:n,updateSimpleConfig:r}=ol;await r({enabled:this.config.enabled,favoriteSpecies:[...this.config.favoriteProduceList,...this.config.favoritePetsList],favoriteMutations:this.config.favoriteMutations}),await n(this.config.enabled);}catch(n){console.error("[AutoFavorite UI] Failed to apply config:",n);}}}const ca={autoFavorite:{enabled:false},bulkFavorite:{enabled:false},journalChecker:{enabled:false},cropSizeIndicator:{enabled:false,showForGrowing:true,showForMature:true,showJournalBadges:true},eggProbabilityIndicator:{enabled:false},cropValueIndicator:{enabled:false},xpTracker:{enabled:false},abilityTracker:{enabled:false},mutationTracker:{enabled:false},cropBoostTracker:{enabled:false},turtleTimer:{enabled:false}};class dy extends Nt{constructor(){super({id:"tab-feature-settings",label:"Features"});U(this,"config",ca);}async build(n){const r=this.createGrid("12px");r.id="feature-settings",n.appendChild(r),this.config=Pe(We.CONFIG,ca),r.appendChild(this.createQOLCard()),r.appendChild(this.createVisualIndicatorsCard()),r.appendChild(this.createTrackingCard());}createQOLCard(){return Se({title:"Quality of Life",padding:"lg",expandable:true,defaultExpanded:true},this.createToggleRow("Auto-Favorite",this.config.autoFavorite.enabled,n=>{this.config.autoFavorite.enabled=n,this.saveConfig();}),this.createToggleRow("Bulk Favorite",this.config.bulkFavorite.enabled,n=>{this.config.bulkFavorite.enabled=n,this.saveConfig();}),this.createToggleRow("Journal Checker",this.config.journalChecker.enabled,n=>{this.config.journalChecker.enabled=n,this.saveConfig();}))}createVisualIndicatorsCard(){return Se({title:"Visual Indicators",variant:"soft",padding:"lg",expandable:true,defaultExpanded:true},this.createToggleRow("Crop Size",this.config.cropSizeIndicator.enabled,n=>{this.config.cropSizeIndicator.enabled=n,this.saveConfig();},"Shows size % and journal badges"),this.createToggleRow("Egg Probability",this.config.eggProbabilityIndicator.enabled,n=>{this.config.eggProbabilityIndicator.enabled=n,this.saveConfig();},"Shows hatch chances + mutation %"),this.createToggleRow("Crop Value",this.config.cropValueIndicator.enabled,n=>{this.config.cropValueIndicator.enabled=n,this.saveConfig();},"Shows coin value"))}createTrackingCard(){return Se({title:"Tracking & Analytics",variant:"soft",padding:"lg",expandable:true,defaultExpanded:false},this.createToggleRow("XP Tracker",this.config.xpTracker.enabled,n=>{this.config.xpTracker.enabled=n,this.saveConfig();}),this.createToggleRow("Ability Tracker",this.config.abilityTracker.enabled,n=>{this.config.abilityTracker.enabled=n,this.saveConfig();}),this.createToggleRow("Mutation Tracker",this.config.mutationTracker.enabled,n=>{this.config.mutationTracker.enabled=n,this.saveConfig();}),this.createToggleRow("Crop Boost Tracker",this.config.cropBoostTracker.enabled,n=>{this.config.cropBoostTracker.enabled=n,this.saveConfig();}),this.createToggleRow("Turtle Timer",this.config.turtleTimer.enabled,n=>{this.config.turtleTimer.enabled=n,this.saveConfig();}))}createToggleRow(n,r,o,i){const a=w("div",{className:i?"kv-col":"kv"}),s=w("div",{className:"kv"}),c=lr({text:n,tone:"default",size:"md"}),u=Eo({checked:r,onChange:o});if(s.append(c.root,u.root),i){a.appendChild(s);const l=w("p",{className:"helper-text",style:"font-size: 12px; color: var(--item-desc, var(--muted)); margin-top: 4px;"},i);return a.appendChild(l),a}return s}saveConfig(){Ee(We.CONFIG,this.config),console.log("[FeatureSettings] Config saved:",this.config);}}const uy=(function(){const t=typeof document<"u"&&document.createElement("link").relList;return t&&t.supports&&t.supports("modulepreload")?"modulepreload":"preload"})(),py=function(e){return "/"+e},da={},ua=function(t,n,r){let o=Promise.resolve();if(n&&n.length>0){let c=function(u){return Promise.all(u.map(l=>Promise.resolve(l).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),s=a?.nonce||a?.getAttribute("nonce");o=c(n.map(u=>{if(u=py(u),u in da)return;da[u]=true;const l=u.endsWith(".css"),d=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${d}`))return;const p=document.createElement("link");if(p.rel=l?"stylesheet":uy,l||(p.as="script"),p.crossOrigin="",p.href=u,s&&p.setAttribute("nonce",s),document.head.appendChild(p),l)return new Promise((f,g)=>{p.addEventListener("load",f),p.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${u}`)));})}));}function i(a){const s=new Event("vite:preloadError",{cancelable:true});if(s.payload=a,window.dispatchEvent(s),!s.defaultPrevented)throw a}return o.then(a=>{for(const s of a||[])s.status==="rejected"&&i(s.reason);return t().catch(i)})};class fy extends Nt{constructor(){super({id:"tab-journal-checker",label:"Journal"});U(this,"progress",null);}async build(n){this.container=n;const r=this.createGrid("12px");r.id="journal-checker",n.appendChild(r),await this.updateProgress();const o=(i=>{this.progress=i.detail,this.renderContent();});window.addEventListener("gemini:journal-updated",o),this.addCleanup(()=>{window.removeEventListener("gemini:journal-updated",o);});}async updateProgress(){try{const{MGJournalChecker:n}=await ua(async()=>{const{MGJournalChecker:r}=await Promise.resolve().then(()=>Ri);return {MGJournalChecker:r}},void 0);this.progress=await n.aggregateJournalProgress(),this.renderContent();}catch(n){console.error("[JournalChecker] Failed to load progress:",n);}}renderContent(){if(!this.container)return;const n=this.container.querySelector("#journal-checker");if(n){if(n.innerHTML="",!this.progress){n.appendChild(this.createLoadingCard());return}n.appendChild(this.createSummaryCard()),n.appendChild(this.createCategoryCard("🌱 Produce",this.progress.plants)),n.appendChild(this.createCategoryCard("🐾 Pets",this.progress.pets,true)),n.appendChild(this.createActionsCard());}}createLoadingCard(){return Se({title:"Loading...",padding:"lg"},w("p",{},"Fetching journal data..."))}createSummaryCard(){if(!this.progress)return w("div");const n=this.createProgressRow("🌱 Produce Species",this.progress.plants.logged,this.progress.plants.total,this.progress.plants.percentage),r=this.createProgressRow("   Variants Logged",this.progress.plants.variantsLogged,this.progress.plants.variantsTotal,this.progress.plants.variantsPercentage),o=this.createProgressRow("🐾 Pet Species",this.progress.pets.logged,this.progress.pets.total,this.progress.pets.percentage),i=this.createProgressRow("   Variants Logged",this.progress.pets.variantsLogged,this.progress.pets.variantsTotal,this.progress.pets.variantsPercentage),a=this.progress.pets.abilitiesTotal?this.createProgressRow("   Abilities Logged",this.progress.pets.abilitiesLogged??0,this.progress.pets.abilitiesTotal,this.progress.pets.abilitiesPercentage??0):null,s=[n,r,o,i];return a&&s.push(a),Se({title:"Collection Progress",padding:"lg",expandable:true,defaultExpanded:true},...s)}createCategoryCard(n,r,o=false){const i=r.speciesDetails.filter(s=>!s.isComplete).sort((s,c)=>c.variantsPercentage-s.variantsPercentage).slice(0,5),a=w("div",{style:"display: flex; flex-direction: column; gap: 8px;"});if(i.length===0){const s=w("div",{style:"color: var(--accent); font-size: 13px; text-align: center; padding: 8px;"},"✅ All species complete!");a.appendChild(s);}else {for(const c of i)a.appendChild(this.createSpeciesRow(c,o));const s=r.speciesDetails.filter(c=>!c.isComplete).length-5;if(s>0){const c=w("div",{style:"font-size: 12px; color: var(--muted); text-align: center; padding-top: 4px;"},`...and ${s} more species`);a.appendChild(c);}}return Se({title:n,padding:"lg",expandable:true,defaultExpanded:false},a)}createSpeciesRow(n,r=false){const o=w("div",{style:"display: flex; flex-direction: column; gap: 4px; padding: 6px 0; border-bottom: 1px solid var(--soft);"}),i=w("div",{style:"display: flex; justify-content: space-between; align-items: center;"}),a=w("span",{style:"font-weight: 500; font-size: 13px;"},n.species),s=w("span",{style:`font-size: 12px; color: ${n.isComplete?"var(--accent)":"var(--muted)"}`},n.isComplete?"✅ Complete":`${Math.round(n.variantsPercentage)}%`);i.append(a,s);const c=n.variantsMissing.slice(0,4),u=c.length>0?`Missing: ${c.join(", ")}${n.variantsMissing.length>4?"...":""}`:"All variants logged",l=w("div",{style:"font-size: 11px; color: var(--muted);"},u);if(o.append(i,l),r&&n.abilitiesMissing&&n.abilitiesMissing.length>0){const p=`Abilities: ${n.abilitiesMissing.slice(0,3).join(", ")}${n.abilitiesMissing.length>3?"...":""}`,f=w("div",{style:"font-size: 11px; color: var(--muted);"},p);o.appendChild(f);}return o}createProgressRow(n,r,o,i){const a=w("div",{className:"kv-col",style:"gap: 6px;"}),s=w("div",{className:"kv"}),c=lr({text:n,tone:"default",size:"md"}),u=w("span",{style:"font-size: 13px; color: var(--item-desc, var(--muted));"},`${r}/${o}`);s.append(c.root,u);const l=w("div",{style:`
        width: 100%;
        height: 6px;
        background: var(--card-bg, var(--soft));
        border-radius: 3px;
        overflow: hidden;
      `}),d=w("div",{style:`
        width: ${Math.min(100,i)}%;
        height: 100%;
        background: linear-gradient(90deg, var(--tab-bg, var(--accent)), var(--group-title, var(--pill-to)));
        transition: width 0.3s ease;
      `});return l.appendChild(d),a.append(s,l),a}createActionsCard(){const n=nt({label:"🔄 Refresh",variant:"default",size:"md",onClick:async()=>{await this.updateProgress();}}),r=nt({label:"📋 Log Missing",variant:"default",size:"md",onClick:()=>{this.showMissingItems();}}),o=w("div",{style:"display: flex; gap: 8px; flex-wrap: wrap;"});return o.append(n,r),Se({title:"Actions",variant:"soft",padding:"lg",expandable:true,defaultExpanded:false},o)}async showMissingItems(){if(this.progress)try{const{MGJournalChecker:n}=await ua(async()=>{const{MGJournalChecker:o}=await Promise.resolve().then(()=>Ri);return {MGJournalChecker:o}},void 0),r=await n.getMissingSummary();if(r.plants.length===0&&r.pets.length===0){console.log("🎉 [JournalChecker] Collection complete!");return}if(console.group("📋 Missing Journal Entries"),r.plants.length>0){console.group(`🌱 Produce (${r.plants.length} species incomplete)`);for(const o of r.plants)console.log(`${o.species}: ${o.missing.join(", ")}`);console.groupEnd();}if(r.pets.length>0){console.group(`🐾 Pets (${r.pets.length} species incomplete)`);for(const o of r.pets){const i=[];o.missingVariants.length>0&&i.push(`Variants: ${o.missingVariants.join(", ")}`),o.missingAbilities.length>0&&i.push(`Abilities: ${o.missingAbilities.join(", ")}`),console.log(`${o.species}: ${i.join(" | ")}`);}console.groupEnd();}console.groupEnd();}catch(n){console.error("[JournalChecker] Failed to get missing summary:",n);}}}function gy(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("width","24"),e.setAttribute("height","24"),e.setAttribute("fill","none"),e.setAttribute("stroke","white"),e.setAttribute("stroke-width","2"),e.setAttribute("stroke-linecap","round");const t=document.createElementNS("http://www.w3.org/2000/svg","line");t.setAttribute("x1","12"),t.setAttribute("y1","5"),t.setAttribute("x2","12"),t.setAttribute("y2","19");const n=document.createElementNS("http://www.w3.org/2000/svg","line");return n.setAttribute("x1","5"),n.setAttribute("y1","12"),n.setAttribute("x2","19"),n.setAttribute("y2","12"),e.appendChild(t),e.appendChild(n),e}function my(e,t){const n=e,r=Ca({value:e,placeholder:"Team name",mode:"alphanumeric",allowSpaces:true,maxLength:50,blockGameKeys:true,onEnter:o=>{const i=o.trim()||n;i!==n&&t?.(i);}});return r.root.className="team-list-item__name-input",r.input.addEventListener("blur",()=>{const o=r.getValue().trim()||n;o!==n&&t?.(o);}),r.input.addEventListener("keydown",o=>{o.key==="Escape"&&(o.preventDefault(),r.input.blur());}),r.root}function hy(e){const t=w("div",{className:"team-list-item"}),n=e.customIndicator??w("div",{className:`team-list-item__indicator ${e.isActive?"team-list-item__indicator--active":"team-list-item__indicator--inactive"}`}),r=e.isNameEditable?my(e.team.name,e.onNameChange):w("div",{textContent:e.team.name,className:`team-list-item__name ${e.isActive?"team-list-item__name--active":"team-list-item__name--inactive"}`}),o=yn.myPets.get(),i=w("div",{className:"team-list-item__sprites"});for(let a=0;a<3;a++){const s=e.team.petIds[a],c=s&&s!=="",u=w("div",{className:`team-list-item__sprite-slot ${e.onSlotClick?c?"team-list-item__sprite-slot--filled":"team-list-item__sprite-slot--empty":""}`});if(e.onSlotClick&&(u.style.cursor="pointer",u.addEventListener("click",()=>{e.onSlotClick(a);})),c){const l=o.all.find(d=>d.id===s);if(l)try{const d=ge.toCanvas("pet",l.petSpecies,{mutations:l.mutations,scale:1});d.style.width="100%",d.style.height="100%",d.style.objectFit="contain",u.appendChild(d);}catch(d){console.warn(`[TeamListItem] Failed to render sprite for pet ${l.petSpecies}:`,d);const p=w("div",{textContent:"🐾",className:"team-list-item__sprite-placeholder"});u.appendChild(p);}else {const d=w("div",{textContent:"?",className:"team-list-item__sprite-placeholder"});u.appendChild(d);}}else if(e.onSlotClick){const l=gy();u.appendChild(l);}i.appendChild(u);}if(!e.hideDragHandle){const a=w("div",{textContent:"⋮⋮",className:"team-list-item__drag-handle"});t.appendChild(a);}return t.appendChild(n),t.appendChild(r),t.appendChild(i),t}function by(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function yy(e){const{segments:t,selected:n=t[0]?.id??"",size:r="md",fullWidth:o=false,disabled:i=false,onChange:a}=e,s=w("div",{className:"sg-root"});r!=="md"&&s.classList.add(`sg--${r}`),o&&(s.style.width="100%");const c=w("div",{className:"sg-container",role:"tablist"}),u=w("div",{className:"sg-indicator"}),l=t.map(h=>{const k=w("button",{className:"sg-btn",type:"button",role:"tab","aria-selected":"false",title:h.label});if(k.id=h.id,h.icon){const I=w("span",{className:"sg-icon"}),L=by(h.icon);L&&I.appendChild(L),k.appendChild(I);}const T=w("span",{className:"sg-label"},h.label);return k.appendChild(T),k.disabled=!!h.disabled,k});c.appendChild(u),l.forEach(h=>c.appendChild(h)),s.appendChild(c);let d=n,p=i;function f(){const h=l.find(k=>k.id===d);h&&requestAnimationFrame(()=>{const k=u,T=h.offsetLeft,I=h.offsetWidth;k.style.width=`${I}px`,k.style.transform=`translateX(${T}px)`;});}function g(){l.forEach(h=>{const k=h.id===d;h.classList.toggle("active",k),h.setAttribute("aria-selected",String(k)),h.disabled=p||!!t.find(T=>T.id===h.id)?.disabled;}),f();}function m(h){const k=h.currentTarget;if(k.disabled)return;x(k.id);}function b(h){if(p)return;const k=l.findIndex(I=>I.id===d);let T=k;if(h.key==="ArrowLeft"||h.key==="ArrowUp"?(h.preventDefault(),T=(k-1+l.length)%l.length):h.key==="ArrowRight"||h.key==="ArrowDown"?(h.preventDefault(),T=(k+1)%l.length):h.key==="Home"?(h.preventDefault(),T=0):h.key==="End"&&(h.preventDefault(),T=l.length-1),T!==k){const I=l[T];I&&!I.disabled&&(x(I.id),I.focus());}}l.forEach(h=>{h.addEventListener("click",m),h.addEventListener("keydown",b);});function x(h){!t.some(T=>T.id===h)||d===h||(d=h,g(),a?.(d));}function S(){return d}function v(h){p=!!h,g();}function y(){l.forEach(h=>{h.removeEventListener("click",m),h.removeEventListener("keydown",b);});}g(),queueMicrotask(()=>{const h=l.find(k=>k.id===d);if(h){const k=u;k.style.width=`${h.offsetWidth}px`,k.style.transform=`translateX(${h.offsetLeft}px)`;}});const C=s;return C.select=x,C.getSelected=S,C.setDisabled=v,C.destroy=y,C}function vy(e={}){const{id:t,checked:n=false,disabled:r=false,size:o="md",label:i,labelSide:a="right",onChange:s}=e,c=w("div",{className:"lg-checkbox-wrap"}),u=w("input",{className:`lg-checkbox lg-checkbox--${o}`,id:t,type:"checkbox",checked:String(!!n),disabled:String(!!r)});u.checked=!!n,u.disabled=!!r;let l=null;i&&a!=="none"&&(l=w("label",{className:"lg-checkbox-label",htmlFor:t},i)),l&&a==="left"?c.append(l,u):l&&a==="right"?c.append(u,l):c.append(u);let d=!!n,p=!!r;function f(){u.checked=d,u.disabled=p;}function g(k=false){p||(d=!d,f(),k||s?.(d));}function m(){p||g();}function b(k){p||(k.key===" "||k.key==="Enter")&&(k.preventDefault(),g());}u.addEventListener("click",m),u.addEventListener("keydown",b);function x(){return d}function S(k,T=false){d=!!k,f(),T||s?.(d);}function v(k){p=!!k,f();}function y(k){if(!k){l&&(l.remove(),l=null);return}l?l.textContent=k:(l=w("label",{className:"lg-checkbox-label",htmlFor:t},k),c.append(l));}function C(){u.focus();}function h(){u.removeEventListener("click",m),u.removeEventListener("keydown",b);}return f(),{root:c,input:u,isChecked:x,setChecked:S,setDisabled:v,setLabel:y,focus:C,destroy:h}}function xy(e){const t=getComputedStyle(e);if(!/(auto|scroll|overlay)/.test(t.overflowY+t.overflowX))return  false;const n=e.scrollHeight,r=e.clientHeight,o=e.scrollWidth,i=e.clientWidth;return n>r+1||o>i+1}function wy(e){const t={overflow:e.style.overflow,overflowY:e.style.overflowY,overflowX:e.style.overflowX,touchAction:e.style.touchAction,overscrollBehavior:e.style.overscrollBehavior};e.style.overflow="hidden",e.style.overflowY="hidden",e.style.overflowX="hidden",e.style.touchAction="none",e.style.overscrollBehavior="contain";let n=false;return ()=>{n||(n=true,e.style.overflow=t.overflow,e.style.overflowY=t.overflowY,e.style.overflowX=t.overflowX,e.style.touchAction=t.touchAction,e.style.overscrollBehavior=t.overscrollBehavior);}}function ky(e){const t=[],n=new Set;let r=e;for(;r;){if(r instanceof ShadowRoot){r=r.host;continue}if(r instanceof HTMLElement)!n.has(r)&&r!==e&&xy(r)&&(t.push(r),n.add(r)),r=r.parentElement??r.parentNode;else break}return document.body&&t.push(document.body),document.documentElement&&t.push(document.documentElement),t.filter((o,i,a)=>a.indexOf(o)===i)}function Sy(e){const n=ky(e).map(wy);let r=false;return ()=>{if(!r){r=true;for(let o=n.length-1;o>=0;o--)try{n[o]();}catch{}}}}function Cy(e){return {id:e.id,itemType:"Pet",petSpecies:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,mutations:e.mutations,targetScale:e.targetScale,abilities:e.abilities}}function Ay(e){const t=wr(),n=yn.myPets.get();ce.set("myValidatedSelectedItemIndexAtom",null);const r=n.all.map(s=>Cy(s));fn.show("inventory",{items:r,storages:[],favoritedItemIds:[]});const o=document.querySelector("[data-element='hud']"),i=window.innerWidth<768;i&&o&&(o.style.display="none");const a=t.subscribeSelection(s=>{if(s.current&&"id"in s.current.item){const c=s.current.item.id;e(c),fn.close(),i&&o&&(o.style.display=""),a();}});}class Ty{constructor(t={}){U(this,"card",null);U(this,"modeControl",null);U(this,"modeContainer",null);U(this,"teamContent",null);U(this,"listContainer",null);U(this,"dragState",null);U(this,"teamMode","overview");U(this,"selectedTeamIds",new Set);U(this,"teamCheckboxes",new Map);U(this,"editingTeamId",null);U(this,"editingSlotIndex",null);U(this,"onPointerMove");U(this,"onPointerUp");U(this,"onPointerCancel");U(this,"options");this.options=t,this.onPointerMove=this.handlePointerMove.bind(this),this.onPointerUp=this.handlePointerUp.bind(this),this.onPointerCancel=this.handlePointerCancel.bind(this);}build(){return this.card?this.card:this.createTeamCard()}destroy(){this.cleanupDrag(),this.modeControl&&(this.modeControl.destroy(),this.modeControl=null),this.teamCheckboxes.forEach(t=>{t.destroy();}),this.teamCheckboxes.clear(),this.selectedTeamIds.clear(),this.card=null,this.modeContainer=null,this.teamContent=null,this.listContainer=null;}render(){if(!this.card)return;if(!he.isEnabled()){this.renderDisabledState();return}this.modeContainer&&(this.modeContainer.style.display="flex"),this.ensureModeControl(),this.renderTeamContent();}createTeamCard(){const t=w("div",{style:{display:"flex",flexDirection:"column",gap:"12px"}});this.modeContainer=w("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",width:"100%"}}),t.appendChild(this.modeContainer),this.teamContent=w("div",{style:{display:"flex",flexDirection:"column",gap:"12px",width:"100%"}}),t.appendChild(this.teamContent);const n=Se({title:"Team",expandable:true,defaultExpanded:true},t);return this.card=n,n}ensureModeControl(){if(this.modeContainer){if(!this.modeControl){this.modeControl=yy({segments:[{id:"overview",label:"Overview"},{id:"manage",label:"Manage"}],selected:this.teamMode,onChange:t=>{this.teamMode=t,this.renderTeamContent();}}),this.modeContainer.appendChild(this.modeControl);return}this.modeControl.getSelected()!==this.teamMode&&this.modeControl.select(this.teamMode);}}renderDisabledState(){if(!this.teamContent)return;this.cleanupDrag(),this.listContainer=null,this.modeContainer&&(this.modeContainer.style.display="none");const t=w("div",{style:{textAlign:"center"}}),n=w("div",{textContent:"Pet Team feature is disabled",style:{color:"var(--muted)",fontSize:"14px",marginBottom:"12px"}}),r=nt({label:"Enable Feature",onClick:()=>{he.setEnabled(true),this.render();}});t.appendChild(n),t.appendChild(r),this.teamContent.replaceChildren(t);}renderTeamContent(){if(!this.teamContent)return;this.cleanupDrag(),this.listContainer=null,this.teamContent.replaceChildren(),this.teamCheckboxes.forEach(r=>r.destroy()),this.teamCheckboxes.clear(),this.selectedTeamIds.clear();const t=he.getAllTeams(),n=he.getActiveTeamId();if(t.length===0){const r=w("div",{textContent:"No teams yet. Create your first team!",style:{color:"var(--muted)",textAlign:"center",fontSize:"14px"}});this.teamContent.appendChild(r);return}if(this.listContainer=w("div",{style:{display:"flex",flexDirection:"column",gap:"6px",position:"relative",width:"100%"}}),t.forEach(r=>{const o=n===r.id;let i;this.teamMode==="manage"&&(i=this.createCheckboxIndicator(r.id));const a=hy({team:r,isActive:o,customIndicator:i?.root,hideDragHandle:this.teamMode==="manage",isNameEditable:this.teamMode==="manage",onNameChange:s=>{this.handleRenameTeam(r.id,s);},onSlotClick:this.teamMode==="manage"?s=>{this.handleSlotClick(r.id,s);}:void 0});this.teamMode==="overview"&&a.addEventListener("pointerdown",s=>{s.button===0&&this.startDrag(s,a,r.id);}),this.listContainer.appendChild(a);}),this.teamContent.appendChild(this.listContainer),this.teamMode==="manage"){const r=w("div",{style:{display:"flex",gap:"12px",justifyContent:"center",width:"100%"}}),o=nt({label:"New Team",variant:"primary",onClick:()=>{this.handleCreateTeam();}}),i=nt({label:"Delete Team",variant:"danger",disabled:this.selectedTeamIds.size===0,onClick:()=>{this.handleDeleteTeam();}});i.setAttribute("data-action","delete-team"),r.appendChild(o),r.appendChild(i),this.teamContent.appendChild(r);}}handleCreateTeam(){console.log("[TeamCardPart] Creating new team..."),he.createTeam("New Team",[])?(console.log("[TeamCardPart] Team created successfully"),this.render()):console.warn("[TeamCardPart] Failed to create team");}handleDeleteTeam(){if(this.selectedTeamIds.size===0){console.warn("[TeamCardPart] No teams selected for deletion");return}const t=Array.from(this.selectedTeamIds);console.log("[TeamCardPart] Deleting teams:",t);let n=0;for(const r of t)he.deleteTeam(r)&&n++;console.log(`[TeamCardPart] Deleted ${n}/${t.length} teams`),this.render();}handleRenameTeam(t,n){console.log("[TeamCardPart] Renaming team:",t,"->",n),he.renameTeam(t,n)?console.log("[TeamCardPart] Team renamed successfully"):console.warn("[TeamCardPart] Failed to rename team");}handleSlotClick(t,n){const r=he.getTeam(t);if(!r)return;const o=r.petIds[n];if(o&&o!==""){console.log("[TeamCardPart] Removing pet from slot:",n);const i=[...r.petIds];i[n]="",he.updateTeam(t,{petIds:i}),this.render();return}console.log("[TeamCardPart] Opening inventory for slot:",n),this.editingTeamId=t,this.editingSlotIndex=n,Ay(i=>{this.handlePetSelection(i);});}handlePetSelection(t){if(this.editingTeamId===null||this.editingSlotIndex===null){console.warn("[TeamCardPart] No team/slot selected for pet addition");return}const n=he.getTeam(this.editingTeamId);if(!n){console.warn("[TeamCardPart] Team not found:",this.editingTeamId);return}console.log("[TeamCardPart] Adding pet to team:",this.editingTeamId,"slot:",this.editingSlotIndex);const r=[...n.petIds];r[this.editingSlotIndex]=t,he.updateTeam(this.editingTeamId,{petIds:r})?console.log("[TeamCardPart] Pet added successfully"):console.warn("[TeamCardPart] Failed to add pet to team"),this.editingTeamId=null,this.editingSlotIndex=null,this.render();}createCheckboxIndicator(t){const n=vy({checked:this.selectedTeamIds.has(t),size:"md",onChange:r=>{r?this.selectedTeamIds.add(t):this.selectedTeamIds.delete(t),console.log("[TeamCardPart] Selection changed:",Array.from(this.selectedTeamIds)),this.updateDeleteButtonState();}});return this.teamCheckboxes.set(t,n),n}updateDeleteButtonState(){const t=this.teamContent?.querySelector('[data-action="delete-team"]');t&&(t.disabled=this.selectedTeamIds.size===0);}cleanupDrag(){this.dragState&&(window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),window.removeEventListener("pointercancel",this.onPointerCancel),this.dragState=null);}handlePointerMove(t){if(!this.dragState||!this.listContainer||t.pointerId!==this.dragState.pointerId)return;t.preventDefault();const n=this.listContainer.getBoundingClientRect();let r=t.clientY-n.top-this.dragState.offsetY;const o=n.height-this.dragState.itemEl.offsetHeight;Number.isFinite(o)&&(r=Math.max(-8,Math.min(o+8,r))),this.dragState.itemEl.style.top=`${r}px`,this.updatePlaceholderPosition(t.clientY);}handlePointerUp(t){!this.dragState||t.pointerId!==this.dragState.pointerId||(t.preventDefault(),this.finishDrag());}handlePointerCancel(t){!this.dragState||t.pointerId!==this.dragState.pointerId||this.finishDrag({revert:true});}updatePlaceholderPosition(t){if(!this.dragState||!this.listContainer)return;const{placeholder:n,itemEl:r}=this.dragState,o=Array.from(this.listContainer.children).filter(s=>s!==r&&s!==n&&s instanceof HTMLElement&&s.classList.contains("team-list-item")),i=new Map;o.forEach(s=>{i.set(s,s.getBoundingClientRect().top);});let a=false;for(const s of o){const c=s.getBoundingClientRect(),u=c.top+c.height/2;if(t<u){n.nextSibling!==s&&this.listContainer.insertBefore(n,s),a=true;break}}a||this.listContainer.appendChild(n),o.forEach(s=>{const c=i.get(s),u=s.getBoundingClientRect().top;if(c!==void 0&&c!==u){const l=c-u;s.style.transform=`translateY(${l}px)`,s.style.transition="none",s.offsetHeight,s.style.transition="transform 0.14s ease",s.style.transform="translateY(0)";}});}startDrag(t,n,r){if(this.dragState||!this.listContainer)return;t.preventDefault();const i=he.getAllTeams().findIndex(d=>d.id===r);if(i===-1)return;const a=n.getBoundingClientRect(),s=this.listContainer.getBoundingClientRect(),c=n.cloneNode(true);c.classList.add("team-list-item--placeholder"),c.classList.remove("team-list-item--dragging");const u=n.style.touchAction;n.style.touchAction="none";const l=Sy(n);if(this.dragState={itemEl:n,pointerId:t.pointerId,placeholder:c,offsetY:t.clientY-a.top,fromIndex:i,teamId:r,captureTarget:n,touchActionPrev:u,releaseScrollLock:l},n.classList.add("team-list-item--dragging"),n.style.width=`${a.width}px`,n.style.height=`${a.height}px`,n.style.left=`${a.left-s.left}px`,n.style.top=`${a.top-s.top}px`,n.style.position="absolute",n.style.zIndex="30",n.style.pointerEvents="none",this.listContainer.style.position||(this.listContainer.style.position="relative"),this.listContainer.insertBefore(c,n.nextSibling),this.listContainer.classList.add("is-reordering"),n.setPointerCapture)try{n.setPointerCapture(t.pointerId);}catch{}window.addEventListener("pointermove",this.onPointerMove,{passive:false}),window.addEventListener("pointerup",this.onPointerUp,{passive:false}),window.addEventListener("pointercancel",this.onPointerCancel,{passive:false});}finishDrag(t={}){if(!this.dragState||!this.listContainer)return;const{revert:n=false}=t,{itemEl:r,placeholder:o,fromIndex:i,teamId:a,touchActionPrev:s,releaseScrollLock:c,pointerId:u}=this.dragState;if(this.listContainer.classList.remove("is-reordering"),r.hasPointerCapture(u))try{r.releasePointerCapture(u);}catch{}if(window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),window.removeEventListener("pointercancel",this.onPointerCancel),n){const p=Array.from(this.listContainer.children).filter(f=>f!==r&&f!==o&&f instanceof HTMLElement&&f.classList.contains("team-list-item"))[i]||null;p?this.listContainer.insertBefore(o,p):this.listContainer.appendChild(o);}else {const d=Array.from(this.listContainer.children).filter(f=>f!==r),p=d.indexOf(o);if(p!==-1){const f=d[p];f!==o&&this.listContainer.insertBefore(o,f);}}if(o.replaceWith(r),o.remove(),r.classList.remove("team-list-item--dragging"),r.style.width="",r.style.height="",r.style.left="",r.style.top="",r.style.position="",r.style.zIndex="",r.style.pointerEvents="",r.style.touchAction=s??"",Array.from(this.listContainer.children).filter(d=>d instanceof HTMLElement&&d.classList.contains("team-list-item")).forEach(d=>{d.style.transform="",d.style.transition="";}),c?.(),!n){const p=Array.from(this.listContainer.children).filter(f=>f instanceof HTMLElement&&f.classList.contains("team-list-item")).indexOf(r);if(p!==-1&&p!==i){const g=he.getAllTeams().slice(),[m]=g.splice(i,1);g.splice(p,0,m);const b=g.map(S=>S.id);he.reorderTeams(b)?(console.log("[TeamCardPart] Teams reordered successfully"),this.options.onTeamReordered?.(b)):console.warn("[TeamCardPart] Failed to reorder teams");}}this.dragState=null;}}class Iy extends Nt{constructor(){super({id:"tab-pets",label:"Pets"});U(this,"unsubscribeMyPets");U(this,"lastActiveTeamId",null);U(this,"teamCardPart",null);}async build(n){this.container=n;const r=this.createGrid("12px");r.id="pets",n.appendChild(r),this.initializeTeamCardPart(r),this.unsubscribeMyPets=yn.myPets.subscribeStable(()=>{const o=he.getActiveTeamId();o!==this.lastActiveTeamId&&(this.lastActiveTeamId=o,this.teamCardPart?.render());}),this.lastActiveTeamId=he.getActiveTeamId();}async destroy(){this.unsubscribeMyPets&&(this.unsubscribeMyPets(),this.unsubscribeMyPets=void 0),this.teamCardPart&&(this.teamCardPart.destroy(),this.teamCardPart=null);}initializeTeamCardPart(n){this.teamCardPart||(this.teamCardPart=new Ty({onTeamReordered:o=>{console.log("[PetsSection] Teams reordered:",o);}}));const r=this.teamCardPart.build();n.replaceChildren(r),this.teamCardPart.render();}}const Py={Store:{select:ce.select.bind(ce),set:ce.set.bind(ce),subscribe:ce.subscribe.bind(ce),subscribeImmediate:ce.subscribeImmediate.bind(ce)},Globals:yn,Modules:{Version:Oo,Assets:bt,Manifest:Je,Data:ae,Environment:Qe,CustomModal:fn,Sprite:ge,Tile:Ze,Pixi:hr,Audio:Jo,Cosmetic:Qo},Features:{AutoFavorite:ol,JournalChecker:pb,BulkFavorite:kb,Achievements:Ab,Tracker:ay,AntiAfk:Et,Calculators:am,Pets:sy,PetTeam:he},WebSocket:{chat:uh,emote:ph,wish:fh,kickPlayer:gh,setPlayerData:mh,usurpHost:hh,reportSpeakingStart:bh,setSelectedGame:yh,voteForGame:vh,requestGame:xh,restartGame:wh,ping:kh,checkWeatherStatus:Ah,move:Sh,playerPosition:tl,teleport:Ch,moveInventoryItem:Th,dropObject:Ih,pickupObject:Ph,toggleFavoriteItem:oi,putItemInStorage:Eh,retrieveItemFromStorage:Mh,moveStorageItem:_h,logItems:Lh,plantSeed:Rh,waterPlant:Oh,harvestCrop:Nh,sellAllCrops:$h,purchaseDecor:Dh,purchaseEgg:Fh,purchaseTool:zh,purchaseSeed:Gh,plantEgg:jh,hatchEgg:Bh,plantGardenPlant:Wh,potPlant:Hh,mutationPotion:Uh,pickupDecor:Vh,placeDecor:Kh,removeGardenObject:Yh,placePet:qh,feedPet:Xh,petPositions:Jh,swapPet:Qh,storePet:Zh,namePet:eb,sellPet:tb},_internal:{getGlobals:qe,initGlobals:Qs,destroyGlobals:eh}};function Ey(){const e=M;e.Gemini=Py,e.MGSprite=ge,e.MGData=ae,e.MGPixi=hr,e.MGAssets=bt,e.MGEnvironment=Qe;}let Kr=null;function My(){return Kr||(Kr=new Op),Kr}function _y(e){return [new Kc(e),new dy,new cy,new fy,new Iy]}async function Ly(){await My().preload();}function Ry(e){const{shadow:t,initialOpen:n}=e,r=w("div",{className:"gemini-panel",id:"panel",ariaHidden:String(!n)}),o=w("div",{className:"gemini-tabbar"}),i=w("div",{className:"gemini-content",id:"content"}),a=w("div",{className:"gemini-resizer",title:"Resize"}),s=w("button",{className:"gemini-close",title:"Fermer",ariaLabel:"Fermer"},"✕");r.append(o,i,a);const c=w("div",{className:"gemini-wrapper"},r);return t.append(c),{panel:r,tabbar:o,content:i,resizer:a,closeButton:s,wrapper:c}}function Oy(e){const{resizer:t,host:n,shadow:r,onWidthChange:o,initialWidth:i,minWidth:a,maxWidth:s}=e;let c=a,u=s;function l(){const y=Qe.detect(),C=Math.round(M.visualViewport?.width??M.innerWidth??0);if(y.platform==="mobile"||y.os==="ios"||y.os==="android"){const h=getComputedStyle(r.host),k=parseFloat(h.getPropertyValue("--inset-l"))||0,T=parseFloat(h.getPropertyValue("--inset-r"))||0,I=Math.max(280,C-Math.round(k+T));c=280,u=I;}else c=a,u=s;return {min:c,max:u}}function d(y){return Math.max(c,Math.min(u,Number(y)||i))}function p(y){const C=d(y);n.style.setProperty("--w",`${C}px`),o(C);}l();const f=Qe.detect(),g=!(f.platform==="mobile"||f.os==="ios"||f.os==="android");let m=false;const b=y=>{if(!m)return;y.preventDefault();const C=Math.round(M.innerWidth-y.clientX);p(C);},x=()=>{m&&(m=false,document.body.style.cursor="",M.removeEventListener("mousemove",b),M.removeEventListener("mouseup",x));},S=y=>{g&&(y.preventDefault(),m=true,document.body.style.cursor="ew-resize",M.addEventListener("mousemove",b),M.addEventListener("mouseup",x));};t.addEventListener("mousedown",S);function v(){t.removeEventListener("mousedown",S),M.removeEventListener("mousemove",b),M.removeEventListener("mouseup",x);}return {calculateResponsiveBounds:l,constrainWidthToLimits:d,setHudWidth:p,destroy:v}}function Ny(e){const{panel:t,onToggle:n,onClose:r,toggleCombo:o=c=>c.ctrlKey&&c.shiftKey&&c.key.toLowerCase()==="u",closeOnEscape:i=true}=e;function a(c){const u=t.classList.contains("open");if(i&&c.key==="Escape"&&u){r();return}o(c)&&(c.preventDefault(),c.stopPropagation(),n());}document.addEventListener("keydown",a,{capture:true});function s(){document.removeEventListener("keydown",a,{capture:true});}return {destroy:s}}const $y=`
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
    width: var(--w);
    max-width: 100vw;
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
`,Dy=`
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
`,Fy=`
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
`;function zy(e,t,n){if(e.querySelector(`style[data-style-id="${n}"]`))return;const r=document.createElement("style");r.setAttribute("data-style-id",n),r.textContent=t,e.appendChild(r);}const Gy=`
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
    border-left-color: #3b82f6;
  }
  .card--tone-success{
    border-left-width: var(--card-accent-w, 4px);
    border-left-color: #16a34a;
  }
  .card--tone-warning{
    border-left-width: var(--card-accent-w, 4px);
    border-left-color: #f59e0b;
  }
  .card--tone-danger{
    border-left-width: var(--card-accent-w, 4px);
    border-left-color: #ef4444;
  }
}
  
`,jy=`
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
.badge--info{    --bd: color-mix(in oklab, #38bdf8 65%, var(--border)); }
.badge--success{ --bd: color-mix(in oklab, #22c55e 65%, var(--border)); }
.badge--warning{ --bd: color-mix(in oklab, #f59e0b 65%, var(--border)); }
.badge--danger{  --bd: color-mix(in oklab, #ef4444 65%, var(--border)); }

.badge.badge--neutral,
.badge.badge--info,
.badge.badge--success,
.badge.badge--warning,
.badge.badge--danger{
  border-color: var(--bd, var(--border));
}

.badge--soft.badge--info    { background-color: color-mix(in oklab, #38bdf8 15%, transparent); }
.badge--soft.badge--success { background-color: color-mix(in oklab, #22c55e 14%, transparent); }
.badge--soft.badge--warning { background-color: color-mix(in oklab, #f59e0b 16%, transparent); }
.badge--soft.badge--danger  { background-color: color-mix(in oklab, #ef4444 15%, transparent); }

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

.badge.badge--rarity.badge--rarity-common    { background:#E7E7E7; color:#0b0b0b; }
.badge.badge--rarity.badge--rarity-uncommon  { background:#67BD4D; color:#0b0b0b; }
.badge.badge--rarity.badge--rarity-rare      { background:#0071C6; color:#ffffff; }
.badge.badge--rarity.badge--rarity-legendary { background:#FFC734; color:#0b0b0b; }
.badge.badge--rarity.badge--rarity-mythical  { background:#9944A7; color:#ffffff; }
.badge.badge--rarity.badge--rarity-divine    { background:#FF7835; color:#0b0b0b; }

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
`,By=`
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
`,Wy=`
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
`,Hy=`
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
`,Uy=`
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
`,Vy=`
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
`,Ky=`
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
`,Yy=`
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
  --thumb: #fff;

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
`,qy=`
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
  --cb-bg: var(--surface);
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
  color: var(--text);
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
`,Xy=`
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
`,Jy=`
.team-list-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background-color: var(--soft);
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: grab;
  transition: all 0.15s ease, transform 0.2s ease;
  position: relative;
}

.team-list-item:not(:last-child) {
  margin-bottom: 6px;
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

/* Manage mode - filled slot (red for removal) */
.team-list-item__sprite-slot--filled {
  border: 1.5px solid #f87171;
  background: color-mix(in oklab, #f87171 8%, var(--bg));
  box-shadow: inset 0 2px 4px color-mix(in oklab, #f87171 10%, transparent);
}

.team-list-item__sprite-slot--filled:hover {
  border-color: #ef4444;
  background: color-mix(in oklab, #f87171 12%, var(--bg));
  box-shadow: inset 0 2px 4px color-mix(in oklab, #f87171 15%, transparent);
}

/* Manage mode - empty slot (green for addition) */
.team-list-item__sprite-slot--empty {
  border: 1.5px solid #86efac;
  background: color-mix(in oklab, #86efac 8%, var(--bg));
  box-shadow: inset 0 2px 4px color-mix(in oklab, #86efac 10%, transparent);
}

.team-list-item__sprite-slot--empty svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.team-list-item__sprite-slot--empty:hover {
  border-color: #4ade80;
  background: color-mix(in oklab, #86efac 12%, var(--bg));
  box-shadow: inset 0 2px 4px color-mix(in oklab, #86efac 15%, transparent);
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
`,Qy=`
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
`,Zy=`
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
`,ev=`
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
`,tv=`
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
`,nv=`
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
`,rv=`
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
`,ov=`
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
`,iv=`
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
`,av={all:"initial",position:"fixed",top:"0",right:"0",zIndex:"2147483647",pointerEvents:"auto",fontFamily:'system-ui, -apple-system, "Segoe UI", Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',fontSize:"13px",lineHeight:"1.35"};function sv(e="gemini-root"){const t=document.createElement("div");t.id=e,Object.assign(t.style,av),(document.body||document.documentElement).appendChild(t);const n=t.attachShadow({mode:"open"});return {host:t,shadow:n}}function lv(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:16}):setTimeout(e,0);})}async function cv(e){const{hostId:t="gemini-hud-root",initialWidth:n,initialOpen:r,onWidthChange:o,onOpenChange:i,themes:a,initialTheme:s,onThemeChange:c,buildSections:u,initialTab:l,onTabChange:d,toggleCombo:p=P=>P.ctrlKey&&P.shiftKey&&P.key.toLowerCase()==="u",closeOnEscape:f=true,minWidth:g=420,maxWidth:m=720}=e,{host:b,shadow:x}=sv(t),S=[[hl,"variables"],[Dy,"primitives"],[Fy,"utilities"],[$y,"hud"],[Gy,"card"],[jy,"badge"],[By,"button"],[qy,"checkbox"],[Wy,"input"],[Hy,"label"],[Uy,"navTabs"],[Vy,"searchBar"],[Ky,"select"],[Yy,"switch"],[Xy,"table"],[Jy,"teamListItem"],[Qy,"timeRangePicker"],[Zy,"tooltip"],[ev,"slider"],[tv,"reorderableList"],[nv,"colorPicker"],[rv,"log"],[ov,"segmentedControl"],[iv,"settings"]];for(let P=0;P<S.length;P++){const[R,G]=S[P];zy(x,R,G),P%5===4&&await lv();}const{panel:v,tabbar:y,content:C,resizer:h,closeButton:k,wrapper:T}=Ry({shadow:x,initialOpen:r});function I(P){v.dispatchEvent(new CustomEvent("gemini:hud-open-change",{detail:{isOpen:P},bubbles:true})),i?.(P);}function L(P){const R=v.classList.contains("open");v.classList.toggle("open",P),v.setAttribute("aria-hidden",P?"false":"true"),P!==R&&I(P);}L(r),k.addEventListener("click",P=>{P.preventDefault(),P.stopPropagation(),L(false);});const _=jc({host:b,themes:a,initialTheme:s,onThemeChange:c}),D=Oy({resizer:h,host:b,shadow:x,onWidthChange:o||(()=>{}),initialWidth:n,minWidth:g,maxWidth:m});D.setHudWidth(n);const ee=u({applyTheme:_.applyTheme,initialTheme:s,getCurrentTheme:_.getCurrentTheme,setHUDWidth:D.setHudWidth,setHUDOpen:L}),z=new ql(ee,C,{applyTheme:_.applyTheme,getCurrentTheme:_.getCurrentTheme}),X=ee.map(P=>({id:P.id,label:P.label})),ue=l&&ee.some(P=>P.id===l)?l:X[0]?.id||"",j=Yl(X,ue,P=>{z.activate(P),d?.(P);});j.root.style.flex="1 1 auto",j.root.style.minWidth="0",y.append(j.root,k),ue&&z.activate(ue);const F=Ny({panel:v,onToggle:()=>L(!v.classList.contains("open")),onClose:()=>L(false),toggleCombo:p,closeOnEscape:f}),$=()=>{j.recalc();const P=parseInt(getComputedStyle(b).getPropertyValue("--w"))||n;D.calculateResponsiveBounds(),D.setHudWidth(P);};M.addEventListener("resize",$);const O=P=>{const R=P.detail?.width;R?D.setHudWidth(R):D.setHudWidth(n),j.recalc();};b.addEventListener("gemini:layout-resize",O);function N(){F.destroy(),D.destroy(),M.removeEventListener("resize",$),b.removeEventListener("gemini:layout-resize",O);}return {host:b,shadow:x,wrapper:T,panel:v,content:C,setOpen:L,setWidth:D.setHudWidth,sections:ee,manager:z,nav:j,destroy:N}}const Jt={isOpen:"gemini.hud.isOpen",width:"gemini.hud.width",theme:"gemini.hud.theme",activeTab:"gemini.hud.activeTab"},jn={isOpen:false,width:480,theme:"dark",activeTab:"tab-settings"};function dv(){return {isOpen:Pe(Jt.isOpen,jn.isOpen),width:Pe(Jt.width,jn.width),theme:Pe(Jt.theme,jn.theme),activeTab:Pe(Jt.activeTab,jn.activeTab)}}function Bn(e,t){Ee(Jt[e],t);}const uv="https://i.imgur.com/IMkhMur.png",pv="Stats";function fv(e){let t=e.iconUrl||uv;const n=e.ariaLabel||"Open MGH";let r=null,o=null,i=null,a=false,s=null,c=null;const u=["Chat","Leaderboard","Stats","Open Activity Log"],l=v=>{try{return typeof CSS<"u"&&CSS&&typeof CSS.escape=="function"?CSS.escape(v):v.replace(/"/g,'\\"')}catch{return v}};function d(){const v=document.querySelector(u.map(C=>`button[aria-label="${l(C)}"]`).join(","));if(!v)return null;let y=v.parentElement;for(;y&&y!==document.body;){if(u.reduce((h,k)=>h+y.querySelectorAll(`button[aria-label="${l(k)}"]`).length,0)>=2)return y;y=y.parentElement;}return null}function f(v){const y=Array.from(v.querySelectorAll("button[aria-label]"));if(!y.length)return {refBtn:null,refWrapper:null};const C=y.filter(D=>D.dataset.mghBtn!=="true"&&(D.getAttribute("aria-label")||"")!==(e.ariaLabel||"Open MGH")),h=C.length?C:y,k=h.find(D=>(D.getAttribute("aria-label")||"").toLowerCase()===pv.toLowerCase())||null,T=h.length>=2?h.length-2:h.length-1,I=k||h[T],L=I.parentElement,_=L&&L.parentElement===v&&L.tagName==="DIV"?L:null;return {refBtn:I,refWrapper:_}}function g(v,y,C){const h=v.cloneNode(false);h.type="button",h.setAttribute("aria-label",y),h.title=y,h.dataset.mghBtn="true",h.style.pointerEvents="auto",h.removeAttribute("id");const k=document.createElement("img");return k.src=C,k.alt="MGH",k.style.pointerEvents="none",k.style.userSelect="none",k.style.width="76%",k.style.height="76%",k.style.objectFit="contain",k.style.display="block",k.style.margin="auto",h.appendChild(k),h.addEventListener("click",T=>{T.preventDefault(),T.stopPropagation();try{e.onClick?.();}catch{}}),h}function m(){if(a)return  false;a=true;let v=false;try{const y=d();if(!y)return !1;s!==y&&(s=y);const{refBtn:C,refWrapper:h}=f(y);if(!C)return !1;o=y.querySelector('div[data-mgh-wrapper="true"]'),!o&&h&&(o=h.cloneNode(!1),o.dataset.mghWrapper="true",o.removeAttribute("id"),v=!0);const k=o?.querySelector('button[data-mgh-btn="true"]')||null;r||(r=k),r||(r=g(C,n,t),o?o.appendChild(r):r.parentElement!==y&&y.appendChild(r),v=!0),o&&o.parentElement!==y&&(y.appendChild(o),v=!0);const T=y;if(T&&T!==c){try{S.disconnect();}catch{}c=T,S.observe(c,{childList:!0,subtree:!0});}return v}finally{a=false;}}const b=document.getElementById("App")||document.body;let x=null;const S=new MutationObserver(v=>{const y=v.every(h=>{const k=Array.from(h.addedNodes||[]),T=Array.from(h.removedNodes||[]),I=k.concat(T);if(I.length===0){const L=h.target;return o&&(L===o||o.contains(L))||r&&(L===r||r.contains(L))}return I.every(L=>!!(!(L instanceof HTMLElement)||o&&(L===o||o.contains(L))||r&&(L===r||r.contains(L))))}),C=v.some(h=>Array.from(h.removedNodes||[]).some(k=>k instanceof HTMLElement?!!(o&&(k===o||o.contains(k))||r&&(k===r||r.contains(k))):false));y&&!C||x===null&&(x=window.setTimeout(()=>{if(x=null,m()&&o){const k=o.parentElement;k&&k.lastElementChild!==o&&k.appendChild(o);}},150));});return m(),S.observe(b,{childList:true,subtree:true}),i=()=>S.disconnect(),()=>{try{i?.();}catch{}try{o?.remove();}catch{}}}const Ll=[];function gv(){return Ll.slice()}function mv(e){Ll.push(e);}function Rl(e){try{return JSON.parse(e)}catch{return}}function pa(e){if(typeof e=="string"){const t=Rl(e);return t!==void 0?t:e}return e}function Ol(e){if(e!=null){if(typeof e=="string"){const t=Rl(e);return t!==void 0?Ol(t):e}if(Array.isArray(e)&&typeof e[0]=="string")return e[0];if(typeof e=="object"){const t=e;return t.type??t.Type??t.kind??t.messageType}}}function hv(e){const t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function K(e,t,n){const r=typeof t=="boolean"?t:true,o=typeof t=="function"?t:n,i=(a,s)=>{if(Ol(a)!==e)return;const u=o(a,s);return u&&typeof u=="object"&&"kind"in u?u:typeof u=="boolean"?u?void 0:{kind:"drop"}:r?void 0:{kind:"drop"}};return mv(i),i}const Wt=new WeakSet,fa=new WeakMap;function bv(e){const t=e.pageWindow,n=!!e.debug,r=e.middlewares&&e.middlewares.length?e.middlewares:gv();if(!r.length)return ()=>{};const o=p=>({ws:p,pageWindow:t,debug:n}),i=(p,f)=>{let g=p;for(const m of r){const b=m(g,o(f));if(b){if(b.kind==="drop")return {kind:"drop"};b.kind==="replace"&&(g=b.message);}}return g!==p?{kind:"replace",message:g}:void 0};let a=null,s=null,c=null;const u=()=>{const p=t?.MagicCircle_RoomConnection,f=p?.sendMessage;if(!p||typeof f!="function")return  false;if(Wt.has(f))return  true;const g=f.bind(p);function m(...b){const x=b.length===1?b[0]:b,S=pa(x),v=i(S,hv(t));if(v?.kind==="drop"){n&&console.log("[WS] drop outgoing (RoomConnection.sendMessage)",S);return}if(v?.kind==="replace"){const y=v.message;return b.length>1&&Array.isArray(y)?(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",S,"=>",y),g(...y)):(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",S,"=>",y),g(y))}return g(...b)}Wt.add(m),fa.set(m,f);try{p.sendMessage=m,Wt.add(p.sendMessage),n&&console.log("[WS] outgoing patched via MagicCircle_RoomConnection.sendMessage");}catch{return  false}return a=()=>{try{p.sendMessage===m&&(p.sendMessage=f);}catch{}},true};(()=>{const p=t?.WebSocket?.prototype,f=p?.send;if(typeof f!="function"||Wt.has(f))return;function g(m){const b=pa(m),x=i(b,this);if(x?.kind==="drop"){n&&console.log("[WS] drop outgoing (ws.send)",b);return}if(x?.kind==="replace"){const S=x.message,v=typeof S=="string"||S instanceof ArrayBuffer||S instanceof Blob?S:JSON.stringify(S);return n&&console.log("[WS] replace outgoing (ws.send)",b,"=>",S),f.call(this,v)}return f.call(this,m)}Wt.add(g),fa.set(g,f);try{p.send=g,n&&console.log("[WS] outgoing patched via WebSocket.prototype.send");}catch{return}s=()=>{try{p.send===g&&(p.send=f);}catch{}};})();const d=e.waitForRoomConnectionMs??4e3;if(!u()&&d>0){const p=Date.now();c=setInterval(()=>{if(u()){clearInterval(c),c=null;return}Date.now()-p>d&&(clearInterval(c),c=null,n&&console.log("[WS] RoomConnection not found, only ws.send is patched"));},250);}return ()=>{if(c){try{clearInterval(c);}catch{}c=null;}if(a){try{a();}catch{}a=null;}if(s){try{s();}catch{}s=null;}}}(function(){try{const t=({ url: (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('__entry.js', document.baseURI).href) }),n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();const Nl=[];function yv(){return Nl.slice()}function ga(e){Nl.push(e);}function vv(e){if(e!=null){if(typeof e=="object"){const t=e;if(typeof t.type=="string")return t.type;if(typeof t.Type=="string")return t.Type;if(typeof t.kind=="string")return t.kind;if(typeof t.messageType=="string")return t.messageType}if(Array.isArray(e)&&typeof e[0]=="string")return e[0]}}function xv(e){if(typeof e=="string")try{return JSON.parse(e)}catch{return e}return e}const Yr=Symbol.for("ariesmod.ws.handlers.patched");function ye(e,t){if(typeof e=="string"){const o=e,i={match:a=>a.kind==="message"&&a.type===o,handle:t};return ga(i),i}const n=e,r={match:o=>o.kind==="close"&&o.code===n,handle:t};return ga(r),r}function wv(e,t=yv(),n={}){const r=n.pageWindow??window,o=!!n.debug;if(e[Yr])return ()=>{};e[Yr]=true;const i={ws:e,pageWindow:r,debug:o},a=d=>{for(const p of t)try{if(!p.match(d))continue;if(p.handle(d,i)===!0)return}catch(f){o&&console.error("[WS] handler error",f,d);}},s=d=>{const p=xv(d.data),f=vv(p);a({kind:"message",raw:d.data,data:p,type:f});},c=d=>{a({kind:"close",code:d.code,reason:d.reason,wasClean:d.wasClean,event:d});},u=d=>a({kind:"open",event:d}),l=d=>a({kind:"error",event:d});return e.addEventListener("message",s),e.addEventListener("close",c),e.addEventListener("open",u),e.addEventListener("error",l),()=>{try{e.removeEventListener("message",s);}catch{}try{e.removeEventListener("close",c);}catch{}try{e.removeEventListener("open",u);}catch{}try{e.removeEventListener("error",l);}catch{}try{delete e[Yr];}catch{}}}(function(){try{const t=({ url: (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('__entry.js', document.baseURI).href) }),n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();ye(He.AuthenticationFailure,(e,t)=>{t.debug&&console.log("[WS][Close] Auth failure",e.code,e.reason);});ye(He.ConnectionSuperseded,(e,t)=>{t.debug&&console.log("[WS][Close] Superseded",e.code,e.reason);});ye(He.HeartbeatExpired,(e,t)=>{t.debug&&console.log("[WS][Close] Heartbeat expired",e.code,e.reason);});ye(He.PlayerKicked,(e,t)=>{t.debug&&console.log("[WS][Close] Player kicked",e.code,e.reason);});ye(He.PlayerLeftVoluntarily,(e,t)=>{t.debug&&console.log("[WS][Close] Player left voluntarily",e.code,e.reason);});ye(He.ReconnectInitiated,(e,t)=>{t.debug&&console.log("[WS][Close] Reconnect initiated",e.code,e.reason);});ye(He.ServerDisposed,(e,t)=>{t.debug&&console.log("[WS][Close] Server disposed",e.code,e.reason);});ye(He.UserSessionSuperseded,(e,t)=>{t.debug&&console.log("[WS][Close] User session superseded",e.code,e.reason);});ye(He.VersionExpired,(e,t)=>{t.debug&&console.log("[WS][Close] Version expired",e.code,e.reason);});ye(He.VersionMismatch,(e,t)=>{t.debug&&console.log("[WS][Close] Version mismatch",e.code,e.reason);});ye(et.Config,(e,t)=>{t.debug&&console.log("[WS][STC] Config",e.data);});ye(et.CurrencyTransaction,(e,t)=>{t.debug&&console.log("[WS][STC] CurrencyTransaction",e.data);});ye(et.Emote,(e,t)=>{t.debug&&console.log("[WS][STC] Emote",e.data);});ye(et.InappropriateContentRejected,(e,t)=>{t.debug&&console.log("[WS][STC] InappropriateContentRejected",e.data);});ye(et.PartialState,(e,t)=>{t.debug&&console.log("[WS][STC] PartialState",e.data);});ye(et.Pong,(e,t)=>{t.debug&&console.log("[WS][STC] Pong",e.data);});ye(et.ServerErrorMessage,(e,t)=>{t.debug&&console.log("[WS][STC] ServerErrorMessage",e.data);});ye(et.Welcome,(e,t)=>{t.debug&&console.log("[WS][STC] Welcome",e.data);});K(E.PlantSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantSeed"),true));K(E.WaterPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] WaterPlant"),true));K(E.HarvestCrop,(e,t)=>(t.debug&&console.log("[MW][Garden] HarvestCrop"),true));K(E.SellAllCrops,(e,t)=>(t.debug&&console.log("[MW][Garden] SellAllCrops"),true));K(E.PurchaseSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseSeed"),true));K(E.PurchaseEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseEgg"),true));K(E.PurchaseTool,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseTool"),true));K(E.PurchaseDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseDecor"),true));K(E.PlantEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantEgg"),true));K(E.HatchEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] HatchEgg"),true));K(E.PlantGardenPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantGardenPlant"),true));K(E.PotPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PotPlant"),true));K(E.MutationPotion,(e,t)=>(t.debug&&console.log("[MW][Garden] MutationPotion"),true));K(E.PickupDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PickupDecor"),true));K(E.PlaceDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PlaceDecor"),true));K(E.RemoveGardenObject,(e,t)=>(t.debug&&console.log("[MW][Garden] RemoveGardenObject"),true));K(E.MoveInventoryItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveInventoryItem"),true));K(E.DropObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] DropObject"),true));K(E.PickupObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] PickupObject"),true));K(E.ToggleFavoriteItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] ToggleFavoriteItem"),true));K(E.PutItemInStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] PutItemInStorage"),true));K(E.RetrieveItemFromStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] RetrieveItemFromStorage"),true));K(E.MoveStorageItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveStorageItem"),true));K(E.LogItems,(e,t)=>(t.debug&&console.log("[MW][Inventory] LogItems"),true));K(E.PlacePet,(e,t)=>(t.debug&&console.log("[MW][Pets] PlacePet"),true));K(E.FeedPet,(e,t)=>(t.debug&&console.log("[MW][Pets] FeedPet"),true));K(E.PetPositions,(e,t)=>(t.debug&&console.log("[MW][Pets] PetPositions"),true));K(E.SwapPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SwapPet"),true));K(E.StorePet,(e,t)=>(t.debug&&console.log("[MW][Pets] StorePet"),true));K(E.NamePet,(e,t)=>(t.debug&&console.log("[MW][Pets] NamePet"),true));K(E.SellPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SellPet"),true));console.log("[WS] TESTTEST");K(E.SetSelectedGame,(e,t)=>(t.debug&&console.log("[MW][Session] SetSelectedGame"),true));K(E.VoteForGame,(e,t)=>(t.debug&&console.log("[MW][Session] VoteForGame"),true));K(E.RequestGame,(e,t)=>(t.debug&&console.log("[MW][Session] RequestGame"),true));K(E.RestartGame,(e,t)=>(t.debug&&console.log("[MW][Session] RestartGame"),true));K(E.Ping,(e,t)=>(t.debug&&console.log("[MW][Session] Ping"),true));K(E.PlayerPosition,(e,t)=>(t.debug&&console.log("[MW][Session] PlayerPosition"),true));K(E.Teleport,(e,t)=>(t.debug&&console.log("[MW][Session] Teleport"),true));K(E.CheckWeatherStatus,(e,t)=>(t.debug&&console.log("[MW][Session] CheckWeatherStatus"),true));K(E.Chat,(e,t)=>(t.debug&&console.log("[MW][Social] Chat"),true));K(E.Dev,(e,t)=>(t.debug&&console.log("[MW][Social] Dev"),true));K(E.Emote,(e,t)=>(t.debug&&console.log("[MW][Social] Emote"),true));K(E.Wish,(e,t)=>(t.debug&&console.log("[MW][Social] Wish"),true));K(E.KickPlayer,(e,t)=>(t.debug&&console.log("[MW][Social] KickPlayer"),true));K(E.ReportSpeakingStart,(e,t)=>(t.debug&&console.log("[MW][Voice] ReportSpeakingStart"),true));K(E.SetPlayerData,(e,t)=>(t.debug&&console.log("[MW][Social] SetPlayerData"),true));K(E.UsurpHost,(e,t)=>(t.debug&&console.log("[MW][Social] UsurpHost"),true));function kv(e={}){const t=e.pageWindow??M,n=e.pollMs??500,r=!!e.debug,o=[];o.push(oh(t,{debug:r})),o.push(bv({pageWindow:t,middlewares:e.middlewares,debug:r}));let i=null;const a=s=>{if(i){try{i();}catch{}i=null;}s&&(i=wv(s,e.handlers,{debug:r,pageWindow:t}));};return a(ar(t).ws),o.push(el(s=>a(s.ws),{intervalMs:n,debug:r,pageWindow:t})),{getWs:()=>ar(t).ws,dispose:()=>{for(let s=o.length-1;s>=0;s--)try{o[s]();}catch{}if(i){try{i();}catch{}i=null;}}}}let Wn=null;function Sv(e={}){return Wn||(Wn=kv(e),Wn)}function Cv(e){e.logStep("WebSocket","Capturing WebSocket...");let t=null;return t=el(n=>{n.ws&&(e.logStep("WebSocket","WebSocket captured","success"),t?.(),t=null);},{intervalMs:250}),Sv({debug:false}),()=>{t?.(),t=null;}}async function Av(e){e.logStep("Atoms","Prewarming Jotai store...");try{await Up(),await jp({timeoutMs:8e3,intervalMs:50}),e.logStep("Atoms","Jotai store ready","success");}catch(t){e.logStep("Atoms","Jotai store not captured yet","error"),console.warn("[Bootstrap] Jotai store wait failed",t);}}function Tv(e){e.logStep("Globals","Initializing global variables...");try{Qs(),e.logStep("Globals","Global variables ready","success");}catch(t){e.logStep("Globals","Failed to initialize global variables","error"),console.warn("[Bootstrap] Global variables init failed",t);}}function Iv(e){e.logStep("API","Exposing Gemini API...");try{Ey(),e.logStep("API","Gemini API ready","success");}catch(t){e.logStep("API","Failed to expose API","error"),console.warn("[Bootstrap] API init failed",t);}}function qr(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0);})}async function Pv(e){e.logStep("HUD","Loading HUD preferences..."),await qr();const t=dv();await qr();const n=await cv({hostId:"gemini-hud-root",initialWidth:t.width,initialOpen:t.isOpen,onWidthChange:r=>Bn("width",r),onOpenChange:r=>Bn("isOpen",r),themes:Zt,initialTheme:t.theme,onThemeChange:r=>Bn("theme",r),buildSections:r=>_y({applyTheme:r.applyTheme,initialTheme:r.initialTheme,getCurrentTheme:r.getCurrentTheme}),initialTab:t.activeTab,onTabChange:r=>Bn("activeTab",r)});return await qr(),e.logStep("HUD","HUD ready","success"),n}async function Ev(e){e.setSubtitle("Activating Gemini modules...");const t=7;let n=0;await Hs(r=>{r.status==="success"?(n++,e.logStep("Modules",`Loading modules... (${n}/${t})`)):r.status==="error"&&e.logStep("Modules",`Loading modules... (${n}/${t}) - ${r.name} failed`,"error");}),e.logStep("Modules",`All modules loaded (${t}/${t})`,"success");}async function Mv(e){e.logStep("Sprites","Warming up sprite cache...");try{ge.isReady()||await ge.init();const t=[],n=ae.get("plants");if(n)for(const a of Object.values(n))a?.seed?.spriteId&&t.push(a.seed.spriteId),a?.plant?.spriteId&&t.push(a.plant.spriteId),a?.crop?.spriteId&&t.push(a.crop.spriteId);const r=ae.get("pets");if(r)for(const a of Object.values(r))a?.spriteId&&t.push(a.spriteId);const o=[...new Set(t)],i=o.length;if(i===0){e.logStep("Sprites","No sprites to warmup","success");return}await ge.warmup(o,(a,s)=>{e.logStep("Sprites",`Loading sprites (${a}/${s})...`);},5),e.logStep("Sprites",`${i} sprites loaded`,"success");}catch(t){e.logStep("Sprites","Sprite warmup failed","error"),console.warn("[Bootstrap] Sprite warmup failed",t);}}async function _v(e){e.logStep("Sections","Preloading UI sections...");try{await Ly(),e.logStep("Sections","Sections preloaded","success");}catch(t){e.logStep("Sections","Sections preload failed","error"),console.warn("[Bootstrap] Sections preload failed",t);}}function Lv(e){e.logStep("Features","Initializing features...");const t=[{name:"AntiAfk",init:Et.init.bind(Et)},{name:"PetTeam",init:he.init.bind(he)}];let n=0;for(const r of t)try{r.init(),n++,e.logStep("Features",`Initializing features... (${n}/${t.length})`,"info");}catch(o){e.logStep("Features",`Initializing features... (${n}/${t.length}) - ${r.name} failed`,"error"),console.warn(`[Bootstrap] Feature ${r.name} init failed`,o);}e.logStep("Features",`All features initialized (${t.length}/${t.length})`,"success");}ls();Dp();(async function(){Xl();const e=Vl({title:"Gemini is loading",subtitle:"Connecting and preparing modules..."});let t=null;try{t=Cv(e),await Av(e),Tv(e),Iv(e),await Promise.all([Ev(e),(async()=>{await Mv(e);})(),(async()=>{await _v(e);})(),(async()=>{Lv(e);})()]),e.succeed("Gemini is ready!");}catch(r){e.fail("Failed to initialize the mod.",r);}finally{t?.();}const n=await Pv(e);fv({onClick:()=>n.setOpen(true)});})();

})();