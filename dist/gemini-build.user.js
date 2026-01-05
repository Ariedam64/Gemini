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
  var zc=Object.defineProperty;var Bc=(e,t,n)=>t in e?zc(e,t,{enumerable:true,configurable:true,writable:true,value:n}):e[t]=n;var Y=(e,t,n)=>Bc(e,typeof t!="symbol"?t+"":t,n);function g(e,t=null,...n){const r=document.createElement(e);for(const[o,i]of Object.entries(t||{}))i!=null&&(o==="style"?typeof i=="string"?r.setAttribute("style",i):typeof i=="object"&&Object.assign(r.style,i):o.startsWith("on")&&typeof i=="function"?r[o.toLowerCase()]=i:o in r?r[o]=i:r.setAttribute(o,String(i)));for(const o of n)o==null||o===false||r.appendChild(typeof o=="string"||typeof o=="number"?document.createTextNode(String(o)):o);return r}const zn="https://i.imgur.com/k5WuC32.png",Vi="gemini-loader-style",wt="gemini-loader",es=80;function Gc(){if(document.getElementById(Vi))return;const e=document.createElement("style");e.id=Vi,e.textContent=`
    /* ===== Loader Variables ===== */
    #${wt} {
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
    #${wt} {
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

    #${wt}.gemini-loader--error .gemini-loader__actions {
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
    #${wt}.gemini-loader--closing {
      animation: gemini-loader-fade-out 0.4s ease forwards;
      pointer-events: none;
    }

    #${wt}.gemini-loader--error .gemini-loader__spinner {
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
      #${wt} { padding: 16px 10px; }
      .gemini-loader__card { padding: 16px; }
      .gemini-loader__header { gap: 12px; }
      .gemini-loader__spinner { width: 42px; height: 42px; }
      .gemini-loader__spinner-icon { width: 56px; height: 56px; }
      .gemini-loader__title { font-size: 16px; }
    }
  `;const t=document.head||document.documentElement||document.body;if(t){t.appendChild(e);return}const n=()=>{(document.head||document.documentElement||document.body)?.appendChild(e);};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",n,{once:true}):setTimeout(n,0);}function Bn(e,t,n){const r=g("div",{className:`gemini-loader__log ${n}`},g("div",{className:"gemini-loader__dot"}),g("div",{textContent:t}));for(e.appendChild(r);e.childElementCount>es;)e.firstElementChild?.remove();e.scrollTop=e.scrollHeight;}function Wc(){return new Promise(e=>{if(typeof GM_xmlhttpRequest>"u"){e(zn);return}GM_xmlhttpRequest({method:"GET",url:zn,responseType:"blob",onload:t=>{const n=t.response,r=new FileReader;r.onloadend=()=>e(r.result),r.onerror=()=>e(zn),r.readAsDataURL(n);},onerror:()=>e(zn)});})}function Hc(e={}){const t=Number.isFinite(e.blurPx)?Math.max(4,Number(e.blurPx)):14;Gc();const n=g("div",{className:"gemini-loader__subtitle",textContent:e.subtitle??"Initializing the mod..."}),r=g("div",{className:"gemini-loader__logs"}),o=g("img",{className:"gemini-loader__spinner-icon",alt:"Gemini"}),i=g("div",{className:"gemini-loader__spinner"},o);Wc().then(h=>{o.src=h;});const a=g("div",{className:"gemini-loader__card"},g("div",{className:"gemini-loader__header"},i,g("div",{className:"gemini-loader__titles"},g("div",{className:"gemini-loader__title",textContent:e.title??"Gemini is loading"}),n)),r),s=g("div",{id:wt},a);(document.body||document.documentElement).appendChild(s);const c=g("div",{className:"gemini-loader__actions"},g("button",{className:"gemini-loader__button",textContent:"Close loader",onclick:()=>s.remove()}));a.appendChild(c),s.style.setProperty("--loader-blur",`${t}px`);const u=h=>{n.textContent=h;},l=new Map,d=(h,y)=>{h.className=`gemini-loader__log ${y}`;};return {log:(h,y="info")=>Bn(r,h,y),logStep:(h,y,S="info")=>{const v=String(h||"").trim();if(!v){Bn(r,y,S);return}const k=l.get(v);if(k){k.el.lastElementChild&&(k.el.lastElementChild.textContent=y),k.tone!==S&&(d(k.el,S),k.tone=S);return}const A=g("div",{className:`gemini-loader__log ${S}`},g("div",{className:"gemini-loader__dot"}),g("div",{textContent:y}));for(l.set(v,{el:A,tone:S}),r.appendChild(A);r.childElementCount>es;){const x=r.firstElementChild;if(!x)break;const C=Array.from(l.entries()).find(([,E])=>E.el===x)?.[0];C&&l.delete(C),x.remove();}r.scrollTop=r.scrollHeight;},setSubtitle:u,succeed:(h,y=600)=>{h&&Bn(r,h,"success"),s.classList.add("gemini-loader--closing"),setTimeout(()=>s.remove(),y);},fail:(h,y)=>{Bn(r,h,"error"),u("Something went wrong. Check the console for details."),s.classList.add("gemini-loader--error"),console.error("[Gemini loader]",h,y);}}}const Ki=150,Uc=30;function ts(e,t,n){const r=g("div",{className:"lg-pill",id:"pill"}),o=e.map(w=>{const T=g("button",{className:"lg-tab"},w.label);return T.setAttribute("data-target",w.id),T}),i=g("div",{className:"lg-tabs",id:"lg-tabs-row"},r,...o),a=new Map(e.map(w=>[w.id,true])),s=new Map(o.map((w,T)=>[e[T].id,w]));function c(w){const T=document.createElementNS("http://www.w3.org/2000/svg","svg");T.setAttribute("viewBox","0 0 24 24"),T.setAttribute("fill","none"),T.setAttribute("stroke","currentColor"),T.setAttribute("stroke-width","2"),T.setAttribute("stroke-linecap","round"),T.setAttribute("stroke-linejoin","round");const M=document.createElementNS("http://www.w3.org/2000/svg","polyline");return M.setAttribute("points",w==="left"?"15 18 9 12 15 6":"9 18 15 12 9 6"),T.appendChild(M),T}const u=g("button",{className:"lg-tabs-arrow lg-tabs-arrow-left",ariaLabel:"Scroll left"});u.appendChild(c("left"));const l=g("button",{className:"lg-tabs-arrow lg-tabs-arrow-right",ariaLabel:"Scroll right"});l.appendChild(c("right"));const p=g("div",{className:"lg-tabs-wrapper"},u,i,l);let f=0,m=0,b=false;function h(){const w=i.scrollLeft>0,T=i.scrollLeft<i.scrollWidth-i.clientWidth-1;u.classList.toggle("disabled",!w),l.classList.toggle("disabled",!T);}u.addEventListener("click",()=>{i.scrollBy({left:-Ki,behavior:"smooth"}),setTimeout(h,300);}),l.addEventListener("click",()=>{i.scrollBy({left:Ki,behavior:"smooth"}),setTimeout(h,300);}),i.addEventListener("wheel",w=>{Math.abs(w.deltaY)>Math.abs(w.deltaX)&&(w.preventDefault(),i.scrollLeft+=w.deltaY,h());},{passive:false});let y=0;i.addEventListener("touchstart",w=>{const T=w.touches[0];f=T.clientX,m=T.clientY,b=false,y=i.scrollLeft;},{passive:true}),i.addEventListener("touchmove",w=>{if(b)return;const T=w.touches[0],M=T.clientX-f,z=T.clientY-m;if(Math.abs(z)>Math.abs(M)){b=true;return}Math.abs(M)>Uc&&(w.preventDefault(),i.scrollLeft=y-M);},{passive:false}),i.addEventListener("touchend",()=>{h();},{passive:true}),i.addEventListener("scroll",h,{passive:true});function S(w){const T=o.find(M=>M.dataset.target===w)||o[0];T&&requestAnimationFrame(()=>{const M=T.offsetLeft,z=T.offsetWidth;r.style.width=`${z}px`,r.style.transform=`translateX(${M}px)`;const q=i.scrollLeft,P=q,O=q+i.clientWidth,G=M-12,F=M+z+12;G<P?i.scrollTo({left:G,behavior:"smooth"}):F>O&&i.scrollTo({left:F-i.clientWidth,behavior:"smooth"}),setTimeout(h,300);});}function v(){for(const[w,T]of a)if(T)return w;return null}function k(w){const T=s.get(w);if(T)if(a.set(w,false),T.style.display="none",C===w){const M=v();M&&E(M);}else x();}function A(w){const T=s.get(w);T&&(a.set(w,true),T.style.display="",x());}function x(){S(C),h();}let C=t||(e[0]?.id??"");function E(w){a.get(w)&&(C=w,o.forEach(T=>T.classList.toggle("active",T.dataset.target===w)),S(w),n(w));}return o.forEach(w=>w.addEventListener("click",()=>E(w.dataset.target))),queueMicrotask(()=>{S(C),h();}),{root:p,activate:E,recalc:x,getActive:()=>C,showTab:A,hideTab:k,isTabVisible:w=>a.get(w)??false,getVisibleTabs:()=>[...a.entries()].filter(([w,T])=>T).map(([w])=>w)}}class Mt{constructor(t){Y(this,"id");Y(this,"label");Y(this,"container",null);Y(this,"cleanupFunctions",[]);Y(this,"preloadedContent",null);Y(this,"preloadPromise",null);this.id=t.id,this.label=t.label;}async preload(){if(this.preloadedContent||this.preloadPromise)return;const t=g("div");this.preloadPromise=(async()=>{const n=this.build(t);n instanceof Promise&&await n,this.preloadedContent=t,this.preloadPromise=null;})(),await this.preloadPromise;}isPreloaded(){return this.preloadedContent!==null}render(t){for(this.unmount();t.firstChild;)t.removeChild(t.firstChild);if(this.container=t,this.preloadedContent){for(;this.preloadedContent.firstChild;)t.appendChild(this.preloadedContent.firstChild);this.preloadedContent=null;}else {const r=this.build(t);r instanceof Promise&&r.catch(o=>{console.error(`[Gemini] Error building section ${this.id}:`,o);});}const n=t.firstElementChild;n&&n.classList.contains("gemini-section")&&n.classList.add("active");}unmount(){this.executeCleanup(),this.container=null;}createContainer(t,n){const r=n?`gemini-section ${n}`:"gemini-section";return g("section",{id:t,className:r})}addCleanup(t){this.cleanupFunctions.push(t);}createGrid(t="12px"){const n=g("div");return n.style.display="grid",n.style.gap=t,n}executeCleanup(){for(const t of this.cleanupFunctions)try{t();}catch(n){console.error(`[Gemini] Cleanup error in section ${this.id}:`,n);}this.cleanupFunctions=[];}}class Vc{constructor(t,n,r){Y(this,"sections");Y(this,"activeId",null);Y(this,"container");Y(this,"theme");this.sections=new Map(t.map(o=>[o.id,o])),this.container=n,this.theme=r;}get ids(){return Array.from(this.sections.keys())}get all(){return Array.from(this.sections.values())}get active(){return this.activeId}activate(t){if(this.activeId!==t){if(!this.sections.has(t))throw new Error(`[Gemini] Unknown section: ${t}`);if(this.activeId&&this.sections.get(this.activeId).unmount(),this.activeId=t,this.sections.get(t).render(this.container),this.theme){const n=this.theme.getCurrentTheme();this.theme.applyTheme(n);}}}}const pt="gemini:",Re={AUTO_FAVORITE:"feature:autoFavorite:config",AUTO_FAVORITE_UI:"feature:autoFavorite:ui",JOURNAL_CHECKER:"feature:journalChecker:config",BULK_FAVORITE:"feature:bulkFavorite:config",ACHIEVEMENTS:"feature:achievements:data",TRACKER_STATS:"feature:tracker:stats",ANTI_AFK:"feature:antiAfk:config",CONFIG:"feature:config",PET_TEAM:"feature:petTeam:config"},Kc={AUTO_RELOAD:"dev:auto-reload"},Yi={STORAGE_CHANGE:"gemini:storage:change"};function Ae(e,t){try{const n=e.startsWith(pt)?e:pt+e,r=GM_getValue(n);return r==null?t:typeof r=="string"?JSON.parse(r):r}catch(n){return console.error(`[Gemini Storage] Failed to read key "${e}":`,n),t}}function Ge(e,t){try{const n=e.startsWith(pt)?e:pt+e,r=e.startsWith(pt)?e.slice(pt.length):e,o=JSON.stringify(t);GM_setValue(n,o),window.dispatchEvent(new CustomEvent("gemini:storage:change",{detail:{key:r,value:t}}));}catch(n){console.error(`[Gemini Storage] Failed to write key "${e}":`,n);}}function Yc(e){try{const t=e.startsWith(pt)?e:pt+e;GM_setValue(t,void 0);}catch(t){console.error(`[Gemini Storage] Failed to remove key "${e}":`,t);}}function qc(){try{const e="gemini:",t=[];for(let o=0;o<localStorage.length;o++){const i=localStorage.key(o);i&&i.startsWith(e)&&t.push(i);}for(const o of t)try{const i=localStorage.getItem(o);if(i!==null){const a=JSON.parse(i),s=o.slice(e.length);Ge(s,a),console.log(`[Gemini Storage] Migrated key: ${o}`);}}catch(i){console.warn(`[Gemini Storage] Failed to migrate key "${o}":`,i);}const n="gemini.sections",r=GM_getValue(n);r!=null&&(Ge("sections",r),GM_setValue(n,void 0),console.log("[Gemini Storage] Migrated: gemini.sections → gemini:sections")),t.length>0&&console.log(`[Gemini Storage] Migration complete. ${t.length} keys migrated from localStorage to GM_* storage.`);}catch(e){console.error("[Gemini Storage] Migration failed:",e);}}const ns="gemini.sections";function rs(){const e=Ae(ns,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function Xc(e){Ge(ns,e);}async function Jc(e){return rs()[e]}function Qc(e,t){const n=rs();Xc({...n,[e]:t});}function qi(e,t){return {...e,...t??{}}}async function Zc(e){const t=await Jc(e.path);let n;e.migrate?n=e.migrate(t):n=t??{},n=Object.assign((u=>JSON.parse(JSON.stringify(u)))(e.defaults),n),e.sanitize&&(n=e.sanitize(n));function o(){Qc(e.path,n);}function i(){return n}function a(u){n=e.sanitize?e.sanitize(u):u,o();}function s(u){const d=Object.assign((p=>JSON.parse(JSON.stringify(p)))(n),{});typeof u=="function"?u(d):Object.assign(d,u),n=e.sanitize?e.sanitize(d):d,o();}function c(){o();}return {get:i,set:a,update:s,save:c}}async function Or(e,t){const{path:n=e,...r}=t;return Zc({path:n,...r})}let ed=0;const Gn=new Map;function Te(e={},...t){const{id:n,className:r,variant:o="default",padding:i="md",interactive:a=false,expandable:s=false,defaultExpanded:c=true,onExpandChange:u,mediaTop:l,title:d,subtitle:p,badge:f,actions:m,footer:b,divider:h=false,tone:y="neutral",stateKey:S}=e,v=g("div",{className:"card",id:n,tabIndex:a?0:void 0});v.classList.add(`card--${o}`,`card--p-${i}`),a&&v.classList.add("card--interactive"),y!=="neutral"&&v.classList.add(`card--tone-${y}`),r&&v.classList.add(...r.split(" ").filter(Boolean)),s&&v.classList.add("card--expandable");const k=s?S??n??(typeof d=="string"?`title:${d}`:null):null;let A=!s||c;k&&Gn.has(k)&&(A=!!Gn.get(k));let x=null,C=null,E=null,w=null,T=null;const M=n?`${n}-collapse`:`card-collapse-${++ed}`,z=()=>{if(w!==null&&(cancelAnimationFrame(w),w=null),T){const $=T;T=null,$();}},q=($,j)=>{if(!E)return;z();const D=E;if(D.setAttribute("aria-hidden",String(!$)),!j){D.classList.remove("card-collapse--animating"),D.style.display=$?"":"none",D.style.height="",D.style.opacity="";return}if(D.classList.add("card-collapse--animating"),D.style.display="",$){D.style.height="auto";const W=D.scrollHeight;if(!W){D.classList.remove("card-collapse--animating"),D.style.display="",D.style.height="",D.style.opacity="";return}D.style.height="0px",D.style.opacity="0",D.offsetHeight,w=requestAnimationFrame(()=>{w=null,D.style.height=`${W}px`,D.style.opacity="1";});}else {const W=D.scrollHeight;if(!W){D.classList.remove("card-collapse--animating"),D.style.display="none",D.style.height="",D.style.opacity="";return}D.style.height=`${W}px`,D.style.opacity="1",D.offsetHeight,w=requestAnimationFrame(()=>{w=null,D.style.height="0px",D.style.opacity="0";});}const L=()=>{D.classList.remove("card-collapse--animating"),D.style.height="",$||(D.style.display="none"),D.style.opacity="";};let B=null;const N=W=>{W.target===D&&(B!==null&&(clearTimeout(B),B=null),D.removeEventListener("transitionend",N),D.removeEventListener("transitioncancel",N),T=null,L());};T=()=>{B!==null&&(clearTimeout(B),B=null),D.removeEventListener("transitionend",N),D.removeEventListener("transitioncancel",N),T=null,L();},D.addEventListener("transitionend",N),D.addEventListener("transitioncancel",N),B=window.setTimeout(()=>{T?.();},420);};function P($){const j=document.createElementNS("http://www.w3.org/2000/svg","svg");return j.setAttribute("viewBox","0 0 24 24"),j.setAttribute("width","16"),j.setAttribute("height","16"),j.innerHTML=$==="up"?'<path d="M7 14l5-5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>':'<path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',j}function O($,j=true,D=true){A=$,v.classList.toggle("card--collapsed",!A),v.classList.toggle("card--expanded",A),x&&(x.dataset.expanded=String(A),x.setAttribute("aria-expanded",String(A))),C&&(C.setAttribute("aria-expanded",String(A)),C.classList.toggle("card-toggle--collapsed",!A),C.setAttribute("aria-label",A?"Replier le contenu":"Deplier le contenu"),C.replaceChildren(P(A?"up":"down"))),s?q(A,D):E&&(E.style.display="",E.style.height="",E.style.opacity="",E.setAttribute("aria-hidden","false")),j&&u&&u(A),k&&Gn.set(k,A);}if(l){const $=g("div",{className:"card-media"});$.append(l),v.appendChild($);}const G=!!(d||p||f||m&&m.length||s);if(G){x=g("div",{className:"card-header"});const $=g("div",{className:"card-headline",style:"min-width:0;display:flex;flex-direction:column;gap:2px;"});if(d){const L=g("h3",{className:"card-title",style:"margin:0;font-size:15px;font-weight:700;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:8px;color:var(--pill-to);"},d);f&&L.append(typeof f=="string"?g("span",{className:"badge"},f):f),$.appendChild(L);}if(p){const L=g("div",{className:"card-subtitle",style:"opacity:.85;font-size:12px;color:color-mix(in oklab, var(--fg) 80%, #9ca3af)"},p);$.appendChild(L);}($.childNodes.length||s)&&x.appendChild($);const j=g("div",{className:"card-header-right",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"}),D=g("div",{className:"card-actions",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"});m?.forEach(L=>D.appendChild(L)),D.childNodes.length&&j.appendChild(D),s&&(C=g("button",{className:"card-toggle",type:"button",ariaExpanded:String(A),ariaControls:M,ariaLabel:A?"Replier le contenu":"Deplier le contenu"}),C.textContent=A?"▲":"▼",C.addEventListener("click",L=>{L.preventDefault(),L.stopPropagation(),O(!A);}),j.appendChild(C),x.classList.add("card-header--expandable"),x.addEventListener("click",L=>{const B=L.target;B?.closest(".card-actions")||B?.closest(".card-toggle")||O(!A);})),j.childNodes.length&&x.appendChild(j),v.appendChild(x);}E=g("div",{className:"card-collapse",id:M,ariaHidden:s?String(!A):"false"}),v.appendChild(E),h&&G&&E.appendChild(g("div",{className:"card-divider"}));const F=g("div",{className:"card-body"});if(F.append(...t),E.appendChild(F),b){h&&E.appendChild(g("div",{className:"card-divider"}));const $=g("div",{className:"card-footer"});$.append(b),E.appendChild($);}return C&&C.setAttribute("aria-controls",M),O(A,false,false),k&&Gn.set(k,A),v}let wr=false;const kr=new Set,De=e=>{const t=document.activeElement;for(const n of kr)if(t&&(t===n||n.contains(t))){e.stopImmediatePropagation(),e.stopPropagation();return}};function td(){wr||(wr=true,window.addEventListener("keydown",De,true),window.addEventListener("keypress",De,true),window.addEventListener("keyup",De,true),document.addEventListener("keydown",De,true),document.addEventListener("keypress",De,true),document.addEventListener("keyup",De,true));}function nd(){wr&&(kr.size>0||(wr=false,window.removeEventListener("keydown",De,true),window.removeEventListener("keypress",De,true),window.removeEventListener("keyup",De,true),document.removeEventListener("keydown",De,true),document.removeEventListener("keypress",De,true),document.removeEventListener("keyup",De,true)));}function Sr(e){const{id:t,value:n=null,options:r,placeholder:o="Select...",size:i="md",disabled:a=false,blockGameKeys:s=true,onChange:c,onOpenChange:u}=e,l=g("div",{className:"select",id:t}),d=g("button",{className:"select-trigger",type:"button"}),p=g("span",{className:"select-value"},o),f=g("span",{className:"select-caret"},"▾");d.append(p,f);const m=g("div",{className:"select-menu",role:"listbox",tabindex:"-1","aria-hidden":"true"});l.classList.add(`select--${i}`);let b=false,h=n,y=null,S=!!a;function v(L){return L==null?o:(e.options||r).find(N=>N.value===L)?.label??o}function k(L){p.textContent=v(L),m.querySelectorAll(".select-option").forEach(B=>{const N=B.dataset.value,W=L!=null&&N===L;B.classList.toggle("selected",W),B.setAttribute("aria-selected",String(W));});}function A(L){m.replaceChildren(),L.forEach(B=>{const N=g("button",{className:"select-option"+(B.disabled?" disabled":""),type:"button",role:"option","data-value":B.value,"aria-selected":String(B.value===h),tabindex:"-1"},B.label);B.value===h&&N.classList.add("selected"),B.disabled||N.addEventListener("pointerdown",W=>{W.preventDefault(),W.stopPropagation(),M(B.value,{notify:true}),w();},{capture:true}),m.appendChild(N);});}function x(){d.setAttribute("aria-expanded",String(b)),m.setAttribute("aria-hidden",String(!b));}function C(){const L=d.getBoundingClientRect();Object.assign(m.style,{minWidth:`${L.width}px`});}function E(){b||S||(b=true,l.classList.add("open"),x(),C(),document.addEventListener("mousedown",G,true),document.addEventListener("scroll",F,true),window.addEventListener("resize",$),m.focus({preventScroll:true}),s&&(td(),kr.add(l),y=()=>{kr.delete(l),nd();}),u?.(true));}function w(){b&&(b=false,l.classList.remove("open"),x(),document.removeEventListener("mousedown",G,true),document.removeEventListener("scroll",F,true),window.removeEventListener("resize",$),d.focus({preventScroll:true}),y?.(),y=null,u?.(false));}function T(){b?w():E();}function M(L,B={}){const N=h;h=L,k(h),B.notify!==false&&N!==L&&c?.(L);}function z(){return h}function q(L){const B=Array.from(m.querySelectorAll(".select-option:not(.disabled)"));if(!B.length)return;const N=B.findIndex(ae=>ae.classList.contains("active")),W=B[(N+(L===1?1:B.length-1))%B.length];B.forEach(ae=>ae.classList.remove("active")),W.classList.add("active"),W.focus({preventScroll:true}),W.scrollIntoView({block:"nearest"});}function P(L){(L.key===" "||L.key==="Enter"||L.key==="ArrowDown")&&(L.preventDefault(),E());}function O(L){if(L.key==="Escape"){L.preventDefault(),w();return}if(L.key==="Enter"||L.key===" "){const B=m.querySelector(".select-option.active")||m.querySelector(".select-option.selected");B&&!B.classList.contains("disabled")&&(L.preventDefault(),M(B.dataset.value,{notify:true}),w());return}if(L.key==="ArrowDown"){L.preventDefault(),q(1);return}if(L.key==="ArrowUp"){L.preventDefault(),q(-1);return}}function G(L){l.contains(L.target)||w();}function F(){b&&C();}function $(){b&&C();}function j(L){S=!!L,d.disabled=S,l.classList.toggle("disabled",S),S&&w();}function D(L){e.options=L,A(L),L.some(B=>B.value===h)||(h=null,k(null));}return l.append(d,m),d.addEventListener("pointerdown",L=>{L.preventDefault(),L.stopPropagation(),T();},{capture:true}),d.addEventListener("keydown",P),m.addEventListener("keydown",O),A(r),n!=null?(h=n,k(h)):k(null),x(),j(S),{root:l,open:E,close:w,toggle:T,getValue:z,setValue:M,setOptions:D,setDisabled:j,destroy(){document.removeEventListener("mousedown",G,true),document.removeEventListener("scroll",F,true),window.removeEventListener("resize",$),y?.(),y=null;}}}function Nr(e={}){const{id:t,text:n="",htmlFor:r,tone:o="default",size:i="md",layout:a="inline",variant:s="text",required:c=false,disabled:u=false,tooltip:l,hint:d,icon:p,suffix:f,onClick:m}=e,b=g("div",{className:"lg-label-wrap",id:t}),h=g("label",{className:"lg-label",...r?{htmlFor:r}:{},...l?{title:l}:{}});if(p){const M=typeof p=="string"?g("span",{className:"lg-label-ico"},p):p;M.classList?.add?.("lg-label-ico"),h.appendChild(M);}const y=g("span",{className:"lg-label-text"},n);h.appendChild(y);const S=g("span",{className:"lg-label-req",ariaHidden:"true"}," *");c&&h.appendChild(S);let v=null;if(f!=null){v=typeof f=="string"?document.createTextNode(f):f;const M=g("span",{className:"lg-label-suffix"});M.appendChild(v),h.appendChild(M);}const k=d?g("div",{className:"lg-label-hint"},d):null;b.classList.add(`lg-label--${a}`),b.classList.add(`lg-label--${i}`),s==="title"&&b.classList.add("lg-label--title"),A(o),u&&b.classList.add("is-disabled"),b.appendChild(h),k&&b.appendChild(k),m&&h.addEventListener("click",m);function A(M){b.classList.remove("lg-label--default","lg-label--muted","lg-label--info","lg-label--success","lg-label--warning","lg-label--danger"),b.classList.add(`lg-label--${M}`);}function x(M){y.textContent=M;}function C(M){A(M);}function E(M){M&&!S.isConnected&&h.appendChild(S),!M&&S.isConnected&&S.remove(),M?h.setAttribute("aria-required","true"):h.removeAttribute("aria-required");}function w(M){b.classList.toggle("is-disabled",!!M);}function T(M){!M&&k&&k.isConnected?k.remove():M&&k?k.textContent=M:M&&!k&&b.appendChild(g("div",{className:"lg-label-hint"},M));}return {root:b,labelEl:h,hintEl:k,setText:x,setTone:C,setRequired:E,setDisabled:w,setHint:T}}function rn(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function Wn(e,t){const n=document.createElement("span");n.className=`btn-ico btn-ico--${t}`;const r=rn(e);return r&&n.appendChild(r),n}function rd(){const e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.marginRight="6px",t.style.display="none",t.style.flexShrink="0";const n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");const r=document.createElementNS(e,"animate");r.setAttribute("attributeName","stroke-dasharray"),r.setAttribute("values","1,150;90,150;90,150"),r.setAttribute("dur","1.5s"),r.setAttribute("repeatCount","indefinite");const o=document.createElementNS(e,"animateTransform");return o.setAttribute("attributeName","transform"),o.setAttribute("attributeType","XML"),o.setAttribute("type","rotate"),o.setAttribute("from","0 12 12"),o.setAttribute("to","360 12 12"),o.setAttribute("dur","1s"),o.setAttribute("repeatCount","indefinite"),n.appendChild(r),n.appendChild(o),t.appendChild(n),t}function Pe(e={}){const{label:t="",id:n,variant:r="default",size:o="md",iconLeft:i,iconRight:a,loading:s=false,tooltip:c,type:u="button",onClick:l,disabled:d=false,fullWidth:p=false}=e,f=g("button",{className:"btn",id:n});f.type=u,r==="primary"&&f.classList.add("primary"),r==="danger"&&f.classList.add("danger"),o==="sm"&&f.classList.add("btn--sm"),c&&(f.title=c),p&&(f.style.width="100%");const m=rd(),b=i?Wn(i,"left"):null,h=a?Wn(a,"right"):null,y=document.createElement("span");y.className="btn-label";const S=rn(t);S&&y.appendChild(S),!S&&(b||h)&&f.classList.add("btn--icon"),f.appendChild(m),b&&f.appendChild(b),f.appendChild(y),h&&f.appendChild(h);const v=d||s;f.disabled=v,f.setAttribute("aria-busy",String(!!s)),m.style.display=s?"inline-block":"none",l&&f.addEventListener("click",l);const k=f;return k.setLoading=A=>{f.setAttribute("aria-busy",String(!!A)),m.style.display=A?"inline-block":"none",f.disabled=A||d;},k.setDisabled=A=>{f.disabled=A||f.getAttribute("aria-busy")==="true";},k.setLabel=A=>{y.replaceChildren();const x=rn(A);x&&y.appendChild(x),!x&&(b||h)?f.classList.add("btn--icon"):f.classList.remove("btn--icon");},k.setIconLeft=A=>{if(A==null){b?.remove();return}b?b.replaceChildren(rn(A)):f.insertBefore(Wn(A,"left"),y);},k.setIconRight=A=>{if(A==null){h?.remove();return}h?h.replaceChildren(rn(A)):f.appendChild(Wn(A,"right"));},k.setVariant=A=>{f.classList.remove("primary","danger"),A==="primary"&&f.classList.add("primary"),A==="danger"&&f.classList.add("danger");},k}let os=null,si=null;function od(){return os}function id(e){os=e,si=null;}function is(){return si}function ad(e){si=e;}function sd(){try{const e=window.visualViewport,t=Math.round((e?.width??window.innerWidth)||0),n=Math.round((e?.height??window.innerHeight)||0);if(t&&n)return t>=n?"landscape":"portrait"}catch{}return "unknown"}function as(){const e=navigator.userAgent||"",t=navigator.platform||"",n=navigator.userAgentData;if(n&&typeof n.platform=="string"){const o=n.platform.toLowerCase();if(o.includes("windows"))return "windows";if(o.includes("mac"))return "mac";if(o.includes("android"))return "android";if(o.includes("chrome os")||o.includes("cros"))return "chromeos";if(o.includes("linux"))return "linux";if(o.includes("ios"))return "ios"}return /iPhone|iPad|iPod/i.test(e)||t==="MacIntel"&&(navigator.maxTouchPoints??0)>1?"ios":/Android/i.test(e)?"android":/CrOS/i.test(e)?"chromeos":/Win/i.test(e)?"windows":/Mac/i.test(e)?"mac":/Linux/i.test(e)?"linux":"unknown"}function ss(){const e=navigator.userAgent||"",t=navigator.userAgentData;if(t&&Array.isArray(t.brands)){const n=t.brands.map(a=>String(a.brand||a.brandName||a.brandVersion||a)),r=n.some(a=>/Edge/i.test(a)||/Microsoft Edge/i.test(a)),o=n.some(a=>/Opera/i.test(a)||/OPR/i.test(a)),i=n.some(a=>/Chrome|Chromium/i.test(a));if(r)return "Edge";if(o)return "Opera";if(i)return "Chrome";if(navigator.brave)return "Brave"}return /FxiOS/i.test(e)?"Firefox":/CriOS/i.test(e)?"Chrome":/EdgiOS/i.test(e)?"Edge":/OPiOS|OPR|Opera Mini|Opera/i.test(e)?"Opera":/Edg\//i.test(e)?"Edge":/OPR\//i.test(e)||/Opera/i.test(e)?"Opera":/Firefox/i.test(e)?"Firefox":/Safari/i.test(e)&&!/Chrome|Chromium|Edg|OPR/i.test(e)?"Safari":/Brave/i.test(e)||window.Brave||navigator.brave?"Brave":/Chrome|Chromium/i.test(e)?"Chrome":"Unknown"}function ld(){const e=od();if(e)return e;const t=navigator.userAgent||"",n=navigator.userAgentData;return n&&typeof n.mobile=="boolean"?n.mobile?"mobile":"desktop":/Android|iPhone|iPad|iPod|Mobile/i.test(t)?"mobile":"desktop"}function cd(e){if(!e)return null;try{return new URL(e).hostname}catch{return null}}function ls(){try{return window.top!==window.self}catch{return  true}}function dd(){const e=ls(),t=cd(document.referrer);return e&&!!t&&/(^|\.)discord(app)?\.com$/i.test(t)?"discord":"web"}function $r(){const e=is();if(e)return e;const t=dd(),n=ld(),r=as(),o=ss(),i=ls(),a=window.screen||{},s=window.visualViewport,c=Math.round(window.innerWidth||document.documentElement.clientWidth||0),u=Math.round(window.innerHeight||document.documentElement.clientHeight||0),l=Math.round(s?.width??c),d=Math.round(s?.height??u),p=Math.round(a.width||0),f=Math.round(a.height||0),m=Math.round(a.availWidth||p),b=Math.round(a.availHeight||f),h=Number.isFinite(window.devicePixelRatio)?window.devicePixelRatio:1,y={surface:t,host:location.hostname,origin:location.origin,isInIframe:i,platform:n,browser:o,os:r,viewportWidth:c,viewportHeight:u,visualViewportWidth:l,visualViewportHeight:d,screenWidth:p,screenHeight:f,availScreenWidth:m,availScreenHeight:b,dpr:h,orientation:sd()};return ad(y),y}function ud(){return $r().surface==="discord"}function pd(){return $r().platform==="mobile"}function fd(){$r();}function gd(){return is()!==null}const _e={init:fd,isReady:gd,detect:$r,isDiscord:ud,isMobile:pd,detectOS:as,detectBrowser:ss,setPlatformOverride:id};let Cr=false;const on=new Set;function md(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}const je=e=>{const t=md();if(t){for(const n of on)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function hd(){Cr||(Cr=true,window.addEventListener("keydown",je,true),window.addEventListener("keypress",je,true),window.addEventListener("keyup",je,true),document.addEventListener("keydown",je,true),document.addEventListener("keypress",je,true),document.addEventListener("keyup",je,true));}function bd(){Cr&&(Cr=false,window.removeEventListener("keydown",je,true),window.removeEventListener("keypress",je,true),window.removeEventListener("keyup",je,true),document.removeEventListener("keydown",je,true),document.removeEventListener("keypress",je,true),document.removeEventListener("keyup",je,true));}function yd(e){return on.size===0&&hd(),on.add(e),()=>{on.delete(e),on.size===0&&bd();}}function vd(e,t,n,r){let o;switch(e){case "digits":o="0-9";break;case "alpha":o="\\p{L}";break;case "alphanumeric":o="\\p{L}0-9";break;default:return null}return t&&(o+=" "),n&&(o+="\\-"),r&&(o+="_"),new RegExp(`[^${o}]`,"gu")}function xd(e,t){return t?e.replace(t,""):e}function wd(e,t=0){if(!t)return e;let n;return((...r)=>{clearTimeout(n),n=setTimeout(()=>e(...r),t);})}function Vt(e={}){const{id:t,placeholder:n="",value:r="",mode:o="any",allowSpaces:i=false,allowDashes:a=false,allowUnderscore:s=false,maxLength:c,blockGameKeys:u=true,debounceMs:l=0,onChange:d,onEnter:p,label:f}=e,m=g("div",{className:"lg-input-wrap"}),b=g("input",{className:"input",id:t,placeholder:n});if(typeof c=="number"&&c>0&&(b.maxLength=c),r&&(b.value=r),f){const M=g("div",{className:"lg-input-label"},f);m.appendChild(M);}m.appendChild(b);const h=vd(o,i,a,s),y=()=>{const M=b.selectionStart??b.value.length,z=b.value.length,q=xd(b.value,h);if(q!==b.value){b.value=q;const P=z-q.length,O=Math.max(0,M-P);b.setSelectionRange(O,O);}},S=wd(()=>d?.(b.value),l);b.addEventListener("input",()=>{y(),S();}),b.addEventListener("paste",()=>queueMicrotask(()=>{y(),S();})),b.addEventListener("keydown",M=>{M.key==="Enter"&&p?.(b.value);});const v=u?yd(b):()=>{};function k(){return b.value}function A(M){b.value=M??"",y(),S();}function x(){b.focus();}function C(){b.blur();}function E(M){b.disabled=!!M;}function w(){return document.activeElement===b}function T(){v();}return {root:m,input:b,getValue:k,setValue:A,focus:x,blur:C,setDisabled:E,isFocused:w,destroy:T}}function ve(e,t,n){return Math.min(n,Math.max(t,e))}function fn({h:e,s:t,v:n,a:r}){const o=(e%360+360)%360/60,i=n*t,a=i*(1-Math.abs(o%2-1));let s=0,c=0,u=0;switch(Math.floor(o)){case 0:s=i,c=a;break;case 1:s=a,c=i;break;case 2:c=i,u=a;break;case 3:c=a,u=i;break;case 4:s=a,u=i;break;default:s=i,u=a;break}const d=n-i,p=Math.round((s+d)*255),f=Math.round((c+d)*255),m=Math.round((u+d)*255);return {r:ve(p,0,255),g:ve(f,0,255),b:ve(m,0,255),a:ve(r,0,1)}}function cs({r:e,g:t,b:n,a:r}){const o=ve(e,0,255)/255,i=ve(t,0,255)/255,a=ve(n,0,255)/255,s=Math.max(o,i,a),c=Math.min(o,i,a),u=s-c;let l=0;u!==0&&(s===o?l=60*((i-a)/u%6):s===i?l=60*((a-o)/u+2):l=60*((o-i)/u+4)),l<0&&(l+=360);const d=s===0?0:u/s;return {h:l,s:d,v:s,a:ve(r,0,1)}}function li({r:e,g:t,b:n}){const r=o=>ve(Math.round(o),0,255).toString(16).padStart(2,"0");return `#${r(e)}${r(t)}${r(n)}`.toUpperCase()}function kd({r:e,g:t,b:n,a:r}){const o=ve(Math.round(r*255),0,255);return `${li({r:e,g:t,b:n})}${o.toString(16).padStart(2,"0")}`.toUpperCase()}function an({r:e,g:t,b:n,a:r}){const o=Math.round(r*1e3)/1e3;return `rgba(${e}, ${t}, ${n}, ${o})`}function jt(e){let t=e.trim();if(!t||(t.startsWith("#")&&(t=t.slice(1)),![3,4,6,8].includes(t.length))||!/^[0-9a-fA-F]+$/.test(t))return null;(t.length===3||t.length===4)&&(t=t.split("").map(a=>a+a).join(""));let n=255;t.length===8&&(n=parseInt(t.slice(6,8),16),t=t.slice(0,6));const r=parseInt(t.slice(0,2),16),o=parseInt(t.slice(2,4),16),i=parseInt(t.slice(4,6),16);return {r,g:o,b:i,a:n/255}}function Ao(e){if(!e)return null;const t=e.trim();if(t.startsWith("#"))return jt(t);const n=t.match(/^rgba?\(([^)]+)\)$/i);if(n){const r=n[1].split(",").map(c=>c.trim());if(r.length<3)return null;const o=Number(r[0]),i=Number(r[1]),a=Number(r[2]),s=r[3]!=null?Number(r[3]):1;return [o,i,a,s].some(c=>Number.isNaN(c))?null:{r:o,g:i,b:a,a:s}}return null}function Sd(e,t){const n=Ao(e)??jt(e??"")??{r:244,g:67,b:54,a:1};return typeof t=="number"&&(n.a=ve(t,0,1)),cs(n)}function Cd(e){return `#${e.trim().replace(/[^0-9a-fA-F#]/g,"").replace(/#/g,"")}`.slice(0,9).toUpperCase()}function Ad(e){let t=e.trim();return t&&(/^rgba?\s*\(/i.test(t)?t=t.replace(/^rgba?/i,"rgba"):(t=t.replace(/^\(?(.*)\)?$/,"$1"),t=`rgba(${t})`),t=t.replace(/\s*\(\s*/,"("),t=t.replace(/\s*\)\s*$/,")"),t=t.replace(/\s*,\s*/g,", "),t)}function mt(e){const t=fn(e),n=fn({...e,a:1});return {hsva:{...e},hex:li(n),hexa:kd(t),rgba:an(t),alpha:e.a}}function Td(e={}){const{id:t,label:n="Color",value:r,alpha:o,defaultExpanded:i=false,detectMobile:a,onInput:s,onChange:c}=e,l=a?a():_e.detect().platform==="mobile";let d=Sd(r,o);const p=Te({id:t,className:"color-picker",title:n,padding:l?"md":"lg",variant:"soft",expandable:!l,defaultExpanded:!l&&i});p.classList.add(l?"color-picker--mobile":"color-picker--desktop");const f=p.querySelector(".card-header");f&&f.classList.add("color-picker__header");const m=f?.querySelector(".card-title"),b=g("button",{className:"color-picker__preview",type:"button",title:`Preview ${n}`,"aria-label":`Change ${n}`});m?m.prepend(b):f?f.prepend(b):p.prepend(b);const h=p.querySelector(".card-toggle");!l&&h&&b.addEventListener("click",()=>{p.classList.contains("card--collapsed")&&h.click();});const y=p.querySelector(".card-collapse");let S=null,v=null,k=null,A=null,x=null,C=null,E=null,w=null,T=null,M="hex";function z(F){const $=mt(d);F==="input"?s?.($):c?.($);}function q(){const F=mt(d);if(b.style.setProperty("--cp-preview-color",F.rgba),b.setAttribute("aria-label",`${n}: ${F.hexa}`),!l&&S&&v&&k&&A&&x&&C&&E){const $=fn({...d,s:1,v:1,a:1}),j=an($);S.style.setProperty("--cp-palette-hue",j),v.style.left=`${d.s*100}%`,v.style.top=`${(1-d.v)*100}%`,k.style.setProperty("--cp-alpha-gradient",`linear-gradient(180deg, ${an({...$,a:1})} 0%, ${an({...$,a:0})} 100%)`),A.style.top=`${(1-d.a)*100}%`,x.style.setProperty("--cp-hue-color",an(fn({...d,v:1,s:1,a:1}))),C.style.left=`${d.h/360*100}%`;const D=d.a===1?F.hex:F.hexa,L=F.rgba,B=M==="hex"?D:L;E!==document.activeElement&&(E.value=B),E.setAttribute("aria-label",`${M.toUpperCase()} code for ${n}`),E.placeholder=M==="hex"?"#RRGGBB or #RRGGBBAA":"rgba(0, 0, 0, 1)",M==="hex"?E.maxLength=9:E.removeAttribute("maxLength"),E.dataset.mode=M,w&&(w.textContent=M.toUpperCase(),w.setAttribute("aria-label",M==="hex"?"Passer en saisie RGBA":"Revenir en saisie HEX"),w.setAttribute("aria-pressed",M==="rgba"?"true":"false"),w.classList.toggle("is-alt",M==="rgba"));}T&&T!==document.activeElement&&(T.value=F.hex);}function P(F,$=null){d={h:(F.h%360+360)%360,s:ve(F.s,0,1),v:ve(F.v,0,1),a:ve(F.a,0,1)},q(),$&&z($);}function O(F,$=null){P(cs(F),$);}function G(F,$,j){F.addEventListener("pointerdown",D=>{D.preventDefault();const L=D.pointerId,B=W=>{W.pointerId===L&&$(W);},N=W=>{W.pointerId===L&&(document.removeEventListener("pointermove",B),document.removeEventListener("pointerup",N),document.removeEventListener("pointercancel",N),j?.(W));};$(D),document.addEventListener("pointermove",B),document.addEventListener("pointerup",N),document.addEventListener("pointercancel",N);});}if(!l&&y){const F=y.querySelector(".card-body");if(F){F.classList.add("color-picker__body"),v=g("div",{className:"color-picker__palette-cursor"}),S=g("div",{className:"color-picker__palette"},v),A=g("div",{className:"color-picker__alpha-thumb"}),k=g("div",{className:"color-picker__alpha"},A),C=g("div",{className:"color-picker__hue-thumb"}),x=g("div",{className:"color-picker__hue"},C);const $=g("div",{className:"color-picker__main"},S,k),j=g("div",{className:"color-picker__hue-row"},x),D=Vt({blockGameKeys:true});E=D.input,E.classList.add("color-picker__hex-input"),E.value="",E.maxLength=9,E.spellcheck=false,E.inputMode="text",E.setAttribute("aria-label",`Hex code for ${n}`),w=g("button",{type:"button",className:"color-picker__mode-btn",textContent:"HEX","aria-pressed":"false","aria-label":"Passer en saisie RGBA"}),D.root.classList.add("color-picker__hex-wrap");const L=g("div",{className:"color-picker__hex-row"},w,D.root);F.replaceChildren($,j,L),G(S,N=>{if(!S||!v)return;const W=S.getBoundingClientRect(),ae=ve((N.clientX-W.left)/W.width,0,1),V=ve((N.clientY-W.top)/W.height,0,1);P({...d,s:ae,v:1-V},"input");},()=>z("change")),G(k,N=>{if(!k)return;const W=k.getBoundingClientRect(),ae=ve((N.clientY-W.top)/W.height,0,1);P({...d,a:1-ae},"input");},()=>z("change")),G(x,N=>{if(!x)return;const W=x.getBoundingClientRect(),ae=ve((N.clientX-W.left)/W.width,0,1);P({...d,h:ae*360},"input");},()=>z("change")),w.addEventListener("click",()=>{if(M=M==="hex"?"rgba":"hex",E){const N=mt(d);E.value=M==="hex"?d.a===1?N.hex:N.hexa:N.rgba;}q(),E?.focus(),E?.select();}),E.addEventListener("input",()=>{if(M==="hex"){const N=Cd(E.value);if(N!==E.value){const W=E.selectionStart??N.length;E.value=N,E.setSelectionRange(W,W);}}});const B=()=>{const N=E.value;if(M==="hex"){const W=jt(N);if(!W){E.value=d.a===1?mt(d).hex:mt(d).hexa;return}const ae=N.startsWith("#")?N.slice(1):N,V=ae.length===4||ae.length===8;W.a=V?W.a:d.a,O(W,"change");}else {const W=Ad(N),ae=Ao(W);if(!ae){E.value=mt(d).rgba;return}O(ae,"change");}};E.addEventListener("change",B),E.addEventListener("blur",B),E.addEventListener("keydown",N=>{N.key==="Enter"&&(B(),E.blur());});}}return l&&(y&&y.remove(),T=g("input",{className:"color-picker__native",type:"color",value:li(fn({...d,a:1}))}),b.addEventListener("click",()=>T.click()),T.addEventListener("input",()=>{const F=jt(T.value);F&&(F.a=d.a,O(F,"input"),z("change"));}),p.appendChild(T)),q(),{root:p,isMobile:l,getValue:()=>mt(d),setValue:(F,$)=>{const j=Ao(F)??jt(F)??jt("#FFFFFF");j&&(typeof $=="number"&&(j.a=$),O(j,null));}}}const Id=window;function Ed(){if(typeof unsafeWindow<"u"&&unsafeWindow)return unsafeWindow;const e=window.wrappedJSObject;return e&&e!==window?e:Id}const Pd=Ed(),R=Pd;function Md(e){try{return !!e.isSecureContext}catch{return  false}}function ci(e){const t=e?.getRootNode?.();return t&&(t instanceof Document||t.host)?t:document}function ds(){const e=navigator.platform||"",t=navigator.userAgent||"";return /Mac|iPhone|iPad|iPod/i.test(e)||/Mac OS|iOS/i.test(t)}async function Ld(){try{const e=await navigator.permissions?.query?.({name:"clipboard-write"});return e?e.state==="granted"||e.state==="prompt":!0}catch{return  true}}function _d(e,t){const n=document.createElement("textarea");return n.value=e,n.setAttribute("readonly","true"),n.style.position="fixed",n.style.opacity="0",n.style.pointerEvents="none",n.style.top="0",t.appendChild?t.appendChild(n):document.body.appendChild(n),n}function Fd(e){try{const t=window.getSelection?.();if(!t)return !1;const n=document.createRange();return n.selectNodeContents(e),t.removeAllRanges(),t.addRange(n),!0}catch{return  false}}async function Rd(e){if(!("clipboard"in navigator))return {ok:false,method:"clipboard-write"};if(!Md(R))return {ok:false,method:"clipboard-write"};if(!await Ld())return {ok:false,method:"clipboard-write"};try{return await navigator.clipboard.writeText(e),{ok:!0,method:"clipboard-write"}}catch{return {ok:false,method:"clipboard-write"}}}function Od(e,t){try{const n=t||ci(),r=_d(e,n);r.focus(),r.select(),r.setSelectionRange(0,r.value.length);let o=!1;try{o=document.execCommand("copy");}catch{o=!1;}return r.remove(),{ok:o,method:"execCommand"}}catch{return {ok:false,method:"execCommand"}}}function Nd(e,t){if(!t)return {ok:false,method:"selection"};const n=t.textContent??"";let r=false;if(n!==e)try{t.textContent=e,r=!0;}catch{}const o=Fd(t);r&&setTimeout(()=>{try{t.textContent=n;}catch{}},80);const i=ds()?"⌘C pour copier":"Ctrl+C pour copier";return {ok:o,method:"selection",hint:i}}async function $d(e,t={}){const n=(e??"").toString();if(!n.length)return {ok:false,method:"noop"};const r=await Rd(n);if(r.ok)return r;const o=t.injectionRoot||ci(t.valueNode||void 0),i=Od(n,o);if(i.ok)return i;const a=Nd(n,t.valueNode||null);if(a.ok)return a;if(!t.disablePromptFallback)try{return window.prompt(_e.isDiscord()?"Copie manuelle (Discord bloque clipboard):":"Copie manuelle:",n),{ok:!0,method:"prompt"}}catch{}return {ok:false,method:"noop"}}function Dd(e,t,n={}){const r=o=>{if(n.showTip){n.showTip(o);return}try{e.setAttribute("aria-label",o);const i=document.createElement("div");i.textContent=o,i.style.position="absolute",i.style.top="-28px",i.style.right="0",i.style.padding="4px 8px",i.style.borderRadius="8px",i.style.fontSize="12px",i.style.background="color-mix(in oklab, var(--bg) 85%, transparent)",i.style.border="1px solid var(--border)",i.style.color="var(--fg)",i.style.pointerEvents="none",i.style.opacity="0",i.style.transition="opacity .12s";const a=ci(e);a.appendChild?a.appendChild(i):document.body.appendChild(i);const s=e.getBoundingClientRect();i.style.left=`${s.right-8}px`,i.style.top=`${s.top-28}px`,requestAnimationFrame(()=>i.style.opacity="1"),setTimeout(()=>{i.style.opacity="0",setTimeout(()=>i.remove(),150);},1200);}catch{}};e.addEventListener("click",async o=>{o.stopPropagation();const i=(t()??"").toString(),a=await $d(i,{valueNode:n.valueNode??null,injectionRoot:n.injectionRoot??null,disablePromptFallback:n.disablePromptFallback??false});n.onResult?.(a),a.ok?a.method==="clipboard-write"||a.method==="execCommand"||a.method==="prompt"?r("Copié"):a.method==="selection"&&r(a.hint||(ds()?"⌘C pour copier":"Ctrl+C pour copier")):r("Impossible de copier");});}const gn={light:{"--bg":"rgba(255,255,255,0.7)","--fg":"#0f172a","--muted":"rgba(15,23,42,0.06)","--soft":"rgba(15,23,42,0.04)","--accent":"#2563eb","--border":"rgba(15,23,42,0.12)","--shadow":"rgba(2,6,23,.2)","--paper":"#FDFBF7","--tab-bg":"#ffffff","--tab-fg":"#0f172a","--pill-from":"#4f46e5","--pill-to":"#06b6d4","--low":"#dc2626","--medium":"#f59e0b","--high":"#16a34a","--complete":"#15803d","--info":"#2563eb","--accent-1":"#16a34a","--accent-2":"#7c3aed","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--switch-thumb":"#ffffff","--journal-ink":"#333333"},dark:{"--bg":"rgba(10,12,18,0.6)","--fg":"#e5e7eb","--muted":"rgba(229,231,235,0.08)","--soft":"rgba(229,231,235,0.05)","--accent":"#60a5fa","--border":"rgba(148,163,184,0.2)","--shadow":"rgba(0,0,0,.45)","--paper":"#1a1d24","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#e5e7eb","--pill-from":"#6366f1","--pill-to":"#06b6d4","--low":"#ef4444","--medium":"#f59e0b","--high":"#22c55e","--complete":"#16a34a","--info":"#3b82f6","--accent-1":"#22c55e","--accent-2":"#a855f7","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},sepia:{"--bg":"rgba(247,242,231,0.72)","--fg":"#3b2f2f","--muted":"rgba(59,47,47,0.06)","--soft":"rgba(59,47,47,0.04)","--accent":"#b07d62","--border":"rgba(59,47,47,0.14)","--shadow":"rgba(0,0,0,.18)","--paper":"#F5E6D3","--tab-bg":"#fff","--tab-fg":"#3b2f2f","--pill-from":"#b07d62","--pill-to":"#d4a373","--low":"#c2410c","--medium":"#d97706","--high":"#15803d","--complete":"#166534","--info":"#1d4ed8","--accent-1":"#15803d","--accent-2":"#6b21a8","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--switch-thumb":"#ffffff","--journal-ink":"#3b2f2f"},forest:{"--bg":"rgba(14,24,18,0.62)","--fg":"#e7f5e9","--muted":"rgba(231,245,233,0.08)","--soft":"rgba(231,245,233,0.05)","--accent":"#34d399","--border":"rgba(231,245,233,0.16)","--shadow":"rgba(0,0,0,.5)","--paper":"#1e2820","--tab-bg":"rgba(255,255,255,0.06)","--tab-fg":"#e7f5e9","--pill-from":"#10b981","--pill-to":"#84cc16","--low":"#dc2626","--medium":"#eab308","--high":"#22c55e","--complete":"#16a34a","--info":"#06b6d4","--accent-1":"#22c55e","--accent-2":"#8b5cf6","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},violet:{"--bg":"rgba(23, 16, 42, 0.68)","--fg":"#f5f3ff","--muted":"rgba(245,243,255,0.08)","--soft":"rgba(245,243,255,0.05)","--accent":"#a855f7","--border":"rgba(216,180,254,0.22)","--shadow":"rgba(12,3,30,.55)","--paper":"#1a1424","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#ede9fe","--pill-from":"#a855f7","--pill-to":"#f472b6","--low":"#f43f5e","--medium":"#fbbf24","--high":"#4ade80","--complete":"#22c55e","--info":"#60a5fa","--accent-1":"#4ade80","--accent-2":"#c084fc","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},ocean:{"--bg":"rgba(10, 34, 46, 0.66)","--fg":"#e0f7ff","--muted":"rgba(224,247,255,0.07)","--soft":"rgba(224,247,255,0.05)","--accent":"#38bdf8","--border":"rgba(125, 211, 252, 0.22)","--shadow":"rgba(0, 16, 32, .52)","--paper":"#0f2027","--tab-bg":"rgba(56,189,248,0.14)","--tab-fg":"#e0f7ff","--pill-from":"#0ea5e9","--pill-to":"#14b8a6","--low":"#f43f5e","--medium":"#fbbf24","--high":"#34d399","--complete":"#10b981","--info":"#38bdf8","--accent-1":"#22c55e","--accent-2":"#a78bfa","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},ember:{"--bg":"rgba(34,18,10,0.64)","--fg":"#fff7ed","--muted":"rgba(255,247,237,0.08)","--soft":"rgba(255,247,237,0.05)","--accent":"#f97316","--border":"rgba(255, 159, 92, 0.24)","--shadow":"rgba(16,6,2,.52)","--paper":"#1a1210","--tab-bg":"rgba(255,247,237,0.09)","--tab-fg":"#fff7ed","--pill-from":"#fb923c","--pill-to":"#facc15","--low":"#dc2626","--medium":"#f59e0b","--high":"#22c55e","--complete":"#16a34a","--info":"#38bdf8","--accent-1":"#22c55e","--accent-2":"#c084fc","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--switch-thumb":"#ffffff","--journal-ink":"#ffffff"},magicGarden:{"--bg":"#201D1D","--fg":"#F5F5F5","--muted":"rgba(255,255,255,0.6)","--soft":"rgba(0,0,0,0.3)","--accent":"#FFF27D","--border":"rgba(255,255,255,0.1)","--border-accent":"#4A3B2E","--shadow":"rgba(0,0,0,0.5)","--paper":"#FDFBF7","--card-shadow":"0 4px 10px rgba(0, 0, 0, 0.5)","--tab-bg":"#10725A","--tab-fg":"#F5F5F5","--section-title":"#10725A","--group-title":"#5EB292","--item-label":"#F5F5F5","--item-desc":"rgba(255,255,255,0.6)","--item-value":"#FFF27D","--card-bg":"rgba(0,0,0,0.3)","--card-radius":"12px","--card-border":"#4A3B2E","--pill-from":"#FFF27D","--pill-to":"#5EB292","--scrollbar-thumb":"rgba(255,255,255,0.2)","--scrollbar-thumb-hover":"rgba(255,255,255,0.3)","--low":"#F98B4B","--medium":"#F3D32B","--high":"#5EAC46","--complete":"#0B893F","--info":"#38bdf8","--accent-1":"#4caf50","--accent-2":"#9c27b0","--mut-rainbow":"#FF00FF","--mut-gold":"#EBC800","--mut-wet":"#5FFFFF","--mut-chilled":"#B4E6FF","--mut-frozen":"#B9C8FF","--mut-dawnlit":"#F59BE1","--mut-dawncharged":"#C896FF","--mut-ambershine":"#FFB478","--mut-ambercharged":"#FA8C4B","--rarity-common":"#E7E7E7","--rarity-uncommon":"#67BD4D","--rarity-rare":"#0071C6","--rarity-legendary":"#FFC734","--rarity-mythical":"#9944A7","--rarity-divine":"#FF7835","--rarity-celestial":"#FF00FF","--switch-thumb":"#ffffff","--journal-ink":"#000000"}};function jd(e){const{host:t,themes:n,initialTheme:r,onThemeChange:o}=e;let i=r,a=null,s=false;function c(l){const d=n[l]||n[i]||{};t.setAttribute("data-theme",l),s&&t.classList.add("theme-anim");for(const[p,f]of Object.entries(d))t.style.setProperty(p,f);s?(a!==null&&clearTimeout(a),a=R.setTimeout(()=>{t.classList.remove("theme-anim"),a=null;},320)):s=true,i=l,o?.(l);}function u(){return i}return c(r),{applyTheme:c,getCurrentTheme:u}}const To={ui:{expandedCards:{style:false,system:false}}};async function zd(){const e=await Or("tab-settings",{version:1,defaults:To,sanitize:o=>({ui:{expandedCards:qi(To.ui.expandedCards,o.ui?.expandedCards)}})});function t(o){const i=e.get();e.update({ui:{...i.ui,...o,expandedCards:qi(i.ui.expandedCards,o.expandedCards)}});}function n(o,i){const a=e.get();e.update({ui:{...a.ui,expandedCards:{...a.ui.expandedCards,[o]:!!i}}});}function r(o){const i=e.get();n(o,!i.ui.expandedCards[o]);}return {get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:r}}function us(e){return e.replace(/[_-]+/g," ").replace(/^\w/,t=>t.toUpperCase())}function Bd(){return Object.keys(gn).map(e=>({value:e,label:us(e)}))}const Gd=["--bg","--fg","--accent","--muted","--soft","--border","--shadow","--paper","--tab-bg","--tab-fg","--pill-from","--pill-to","--low","--medium","--high","--complete","--info","--accent-1","--accent-2","--accent-3"];function Wd(e){return us(e.replace(/^--/,""))}function Hd(e){return e.alpha<1?e.rgba:e.hex}class Ud extends Mt{constructor(t){super({id:"tab-settings",label:"Settings"}),this.deps=t;}async build(t){const n=this.createGrid("12px");n.id="settings",t.appendChild(n);let r;try{r=await zd();}catch{r={get:()=>To,set:()=>{},save:()=>{},setUI:()=>{},setCardExpanded:()=>{},toggleCard:()=>{}};}const o=r.get(),i=Object.keys(gn),a=this.deps.getCurrentTheme?.()??this.deps.initialTheme,s=i.includes(a)?a:i[0]??"dark";let c=s;const u=Nr({text:"Theme",tone:"muted",size:"lg"}),l=Sr({options:Bd(),value:s,onChange:m=>{c=m,this.deps.applyTheme(m),this.renderThemePickers(m,d,c);}}),d=g("div",{className:"settings-theme-grid"}),p=Te({title:"Style",padding:"lg",expandable:true,defaultExpanded:!!o.ui.expandedCards.style,onExpandChange:m=>r.setCardExpanded("style",m)},g("div",{className:"kv settings-theme-row"},u.root,l.root),d);this.renderThemePickers(s,d,c);const f=this.createEnvCard({defaultExpanded:!!o.ui.expandedCards.system,onExpandChange:m=>r.setCardExpanded("system",m)});n.appendChild(p),n.appendChild(f);}renderThemePickers(t,n,r){const o=gn[t];if(n.replaceChildren(),!!o)for(const i of Gd){const a=o[i];if(a==null)continue;const s=Td({label:Wd(i),value:a,defaultExpanded:false,onInput:c=>this.updateThemeVar(t,i,c,r),onChange:c=>this.updateThemeVar(t,i,c,r)});n.appendChild(s.root);}}updateThemeVar(t,n,r,o){const i=gn[t];i&&(i[n]=Hd(r),o===t&&this.deps.applyTheme(t));}createEnvCard(t){const n=t?.defaultExpanded??false,r=t?.onExpandChange,o=(h,y)=>{const S=g("div",{className:"kv kv--inline-mobile"}),v=g("label",{},h),k=g("div",{className:"ro"});return typeof y=="string"?k.textContent=y:k.append(y),S.append(v,k),S},i=g("code",{},"—"),a=g("span",{},"—"),s=g("span",{},"—"),c=g("span",{},"—"),u=g("span",{},"—"),l=g("span",{},"—"),d=()=>{const h=_e.detect();s.textContent=h.surface,c.textContent=h.platform,u.textContent=h.browser??"Unknown",l.textContent=h.os??"Unknown",i.textContent=h.host,a.textContent=h.isInIframe?"Yes":"No";},p=Pe({label:"Copy JSON",variant:"primary",size:"sm"});Dd(p,()=>{const h=_e.detect();return JSON.stringify(h,null,2)});const f=g("div",{style:"width:100%;display:flex;justify-content:center;"},p),m=Te({title:"System",variant:"soft",padding:"lg",footer:f,expandable:true,defaultExpanded:n,onExpandChange:r},o("Surface",s),o("Platform",c),o("Browser",u),o("OS",l),o("Host",i),o("Iframe",a)),b=()=>{document.hidden||d();};return document.addEventListener("visibilitychange",b),d(),this.addCleanup(()=>document.removeEventListener("visibilitychange",b)),m}}function _n(e={}){const{id:t,checked:n=false,disabled:r=false,size:o="md",label:i,labelSide:a="right",onChange:s}=e,c=g("div",{className:"lg-switch-wrap"}),u=g("button",{className:`lg-switch lg-switch--${o}`,id:t,type:"button",role:"switch","aria-checked":String(!!n),"aria-disabled":String(!!r),title:i??"Basculer"}),l=g("span",{className:"lg-switch-track"}),d=g("span",{className:"lg-switch-thumb"});u.append(l,d);let p=null;i&&a!=="none"&&(p=g("span",{className:"lg-switch-label"},i)),p&&a==="left"?c.append(p,u):p&&a==="right"?c.append(u,p):c.append(u);let f=!!n,m=!!r;function b(){u.classList.toggle("on",f),u.setAttribute("aria-checked",String(f)),u.disabled=m,u.setAttribute("aria-disabled",String(m));}function h(w=false){m||(f=!f,b(),w||s?.(f));}function y(w){w.preventDefault(),h();}function S(w){m||((w.key===" "||w.key==="Enter")&&(w.preventDefault(),h()),w.key==="ArrowLeft"&&(w.preventDefault(),k(false)),w.key==="ArrowRight"&&(w.preventDefault(),k(true)));}u.addEventListener("click",y),u.addEventListener("keydown",S);function v(){return f}function k(w,T=false){f=!!w,b(),T||s?.(f);}function A(w){m=!!w,b();}function x(w){if(!w){p&&(p.remove(),p=null);return}p?p.textContent=w:(p=g("span",{className:"lg-switch-label"},w),c.append(p));}function C(){u.focus();}function E(){u.removeEventListener("click",y),u.removeEventListener("keydown",S);}return b(),{root:c,button:u,isChecked:v,setChecked:k,setDisabled:A,setLabel:x,focus:C,destroy:E}}function ps(e){const{id:t,columns:n,data:r,pageSize:o=0,stickyHeader:i=true,zebra:a=true,animations:s=true,respectReducedMotion:c=true,compact:u=false,maxHeight:l,selectable:d=false,selectionType:p="switch",selectOnRowClick:f=false,initialSelection:m=[],hideHeaderCheckbox:b=false,getRowId:h=(H,X)=>String(X),onSortChange:y,onSelectionChange:S,onRowClick:v}=e;let k=n.slice(),A=r.slice(),x=r.slice(),C=null,E=null,w=1;const T=typeof window<"u"&&typeof window.matchMedia=="function"?window.matchMedia("(prefers-reduced-motion: reduce)").matches:false,M=!!s&&!(c&&T),z=g("div",{className:"lg-table-wrap",id:t});if(l!=null){const H=typeof l=="number"?`${l}px`:l;z.style.setProperty("--tbl-max-h",H);}const q=g("div",{className:"lg-table"}),P=g("div",{className:"lg-thead"}),O=g("div",{className:"lg-tbody"}),G=g("div",{className:"lg-tfoot"});i&&z.classList.add("sticky"),a&&z.classList.add("zebra"),u&&z.classList.add("compact"),d&&z.classList.add("selectable");const F=p==="switch"?"52px":"36px";z.style.setProperty("--check-w",F);function $(H){return H==="center"?"center":H==="right"?"flex-end":"flex-start"}function j(){const H=k.map(re=>{const le=(re.width||"1fr").trim();return /\bfr$/.test(le)?`minmax(0, ${le})`:le}),X=(d?[F,...H]:H).join(" ");z.style.setProperty("--lg-cols",X);}j();function D(){return o?Math.max(1,Math.ceil(A.length/o)):1}function L(){if(!o)return A;const H=(w-1)*o;return A.slice(H,H+o)}function B(){if(!C||!E)return;const H=k.find(le=>String(le.key)===C),X=E==="asc"?1:-1,re=H?.sortFn?(le,fe)=>X*H.sortFn(le,fe):(le,fe)=>{const ee=le[C],te=fe[C];return ee==null&&te==null?0:ee==null?-1*X:te==null?1*X:typeof ee=="number"&&typeof te=="number"?X*(ee-te):X*String(ee).localeCompare(String(te),void 0,{numeric:true,sensitivity:"base"})};A.sort(re);}const N=new Set(m);function W(){return Array.from(N)}const ae=new Map;function V(H){N.clear(),H.forEach(X=>N.add(X)),he(),ae.forEach((X,re)=>{X.setChecked(N.has(re),true);}),Zt(),S?.(W());}function K(){N.clear(),he(),ae.forEach(H=>H.setChecked(false,true)),Zt(),S?.(W());}let ce=null;function he(){if(!ce)return;const H=L();if(!H.length){ce.indeterminate=false,ce.checked=false;return}const X=H.map((le,fe)=>h(le,(w-1)*(o||0)+fe)),re=X.reduce((le,fe)=>le+(N.has(fe)?1:0),0);ce.checked=re===X.length,ce.indeterminate=re>0&&re<X.length;}function Se(){const H=O.offsetWidth-O.clientWidth;P.style.paddingRight=H>0?`${H}px`:"0px";}function Ot(){requestAnimationFrame(Se);}const Ze=new ResizeObserver(()=>Se()),Gi=()=>Se();function Rc(){P.replaceChildren();const H=g("div",{className:"lg-tr lg-tr-head"});if(d){const X=g("div",{className:"lg-th lg-th-check"});b||(ce=g("input",{type:"checkbox"}),ce.addEventListener("change",()=>{const re=L(),le=ce.checked;re.forEach((fe,ee)=>{const te=h(fe,(w-1)*(o||0)+ee);le?N.add(te):N.delete(te);}),S?.(W()),Zt();}),X.appendChild(ce)),H.appendChild(X);}k.forEach(X=>{const re=g("button",{className:"lg-th",type:"button",title:X.title||X.header});re.textContent=X.header,X.align&&re.style.setProperty("--col-justify",$(X.align)),X.sortable&&re.classList.add("sortable"),C===String(X.key)&&E?re.setAttribute("data-sort",E):re.removeAttribute("data-sort"),X.sortable&&re.addEventListener("click",()=>{const le=String(X.key);C!==le?(C=le,E="asc"):(E=E==="asc"?"desc":E==="desc"?null:"asc",E||(C=null,A=x.slice())),y?.(C,E),C&&E&&B(),jn();}),H.appendChild(re);}),P.appendChild(H);try{Ze.disconnect();}catch{}Ze.observe(O),Ot();}function Qr(H){return Array.from(H.querySelectorAll(":scope > .lg-td, :scope > .lg-td-check"))}function Wi(H){return H.querySelector(".lg-td, .lg-td-check")}function Hi(H){const X=Wi(H);return X?X.getBoundingClientRect():null}function Zt(){const H=L(),X=new Map;Array.from(O.children).forEach(ee=>{const te=ee,Ee=te.getAttribute("data-id");if(!Ee)return;const Oe=Hi(te);Oe&&X.set(Ee,Oe);});const re=new Map;Array.from(O.children).forEach(ee=>{const te=ee,Ee=te.getAttribute("data-id");Ee&&re.set(Ee,te);});const le=[];for(let ee=0;ee<H.length;ee++){const te=H[ee],Ee=(o?(w-1)*o:0)+ee,Oe=h(te,Ee);le.push(Oe);let ye=re.get(Oe);ye||(ye=Oc(te,Ee),M&&Qr(ye).forEach(en=>{en.style.transform="translateY(6px)",en.style.opacity="0";})),O.appendChild(ye);}const fe=[];if(re.forEach((ee,te)=>{le.includes(te)||fe.push(ee);}),!M){fe.forEach(ee=>ee.remove()),he(),Ot();return}le.forEach(ee=>{const te=O.querySelector(`.lg-tr-body[data-id="${ee}"]`);if(!te)return;const Ee=Hi(te),Oe=X.get(ee),ye=Qr(te);if(Oe&&Ee){const et=Oe.left-Ee.left,Nt=Oe.top-Ee.top;ye.forEach(ut=>{ut.style.transition="none",ut.style.transform=`translate(${et}px, ${Nt}px)`,ut.style.opacity="1";}),Wi(te)?.getBoundingClientRect(),ye.forEach(ut=>{ut.style.willChange="transform, opacity",ut.style.transition="transform .18s ease, opacity .18s ease";}),requestAnimationFrame(()=>{ye.forEach(ut=>{ut.style.transform="translate(0,0)";});});}else ye.forEach(et=>{et.style.transition="transform .18s ease, opacity .18s ease";}),requestAnimationFrame(()=>{ye.forEach(et=>{et.style.transform="translate(0,0)",et.style.opacity="1";});});const Zr=et=>{(et.propertyName==="transform"||et.propertyName==="opacity")&&(ye.forEach(Nt=>{Nt.style.willChange="",Nt.style.transition="",Nt.style.transform="",Nt.style.opacity="";}),et.currentTarget.removeEventListener("transitionend",Zr));},en=ye[0];en&&en.addEventListener("transitionend",Zr);}),fe.forEach(ee=>{const te=Qr(ee);te.forEach(ye=>{ye.style.willChange="transform, opacity",ye.style.transition="transform .18s ease, opacity .18s ease",ye.style.opacity="0",ye.style.transform="translateY(-6px)";});const Ee=ye=>{ye.propertyName==="opacity"&&(ye.currentTarget.removeEventListener("transitionend",Ee),ee.remove());},Oe=te[0];Oe?Oe.addEventListener("transitionend",Ee):ee.remove();}),he(),Ot();}function Oc(H,X){const re=h(H,X),le=g("div",{className:"lg-tr lg-tr-body","data-id":re});if(d){const fe=g("div",{className:"lg-td lg-td-check"});if(p==="switch"){const ee=_n({size:"sm",checked:N.has(re),onChange:te=>{te?N.add(re):N.delete(re),he(),S?.(W());}});ae.set(re,ee),fe.appendChild(ee.root);}else {const ee=g("input",{type:"checkbox",className:"lg-row-check"});ee.checked=N.has(re),ee.addEventListener("change",te=>{te.stopPropagation(),ee.checked?N.add(re):N.delete(re),he(),S?.(W());}),ee.addEventListener("click",te=>te.stopPropagation()),fe.appendChild(ee);}le.appendChild(fe);}return k.forEach(fe=>{const ee=g("div",{className:"lg-td"});fe.align&&ee.style.setProperty("--col-justify",$(fe.align));let te=fe.render?fe.render(H,X):String(H[fe.key]??"");typeof te=="string"?ee.textContent=te:ee.appendChild(te),le.appendChild(ee);}),(v||d&&f)&&(le.classList.add("clickable"),le.addEventListener("click",fe=>{if(!fe.target.closest(".lg-td-check")){if(d&&f){const ee=!N.has(re);if(ee?N.add(re):N.delete(re),he(),p==="switch"){const te=ae.get(re);te&&te.setChecked(ee,true);}else {const te=le.querySelector(".lg-row-check");te&&(te.checked=ee);}S?.(W());}v?.(H,X,fe);}})),le}function Ui(){if(G.replaceChildren(),!o)return;const H=D(),X=g("div",{className:"lg-pager"}),re=g("button",{className:"btn",type:"button"},"←"),le=g("button",{className:"btn",type:"button"},"→"),fe=g("span",{className:"lg-pager-info"},`${w} / ${H}`);re.disabled=w<=1,le.disabled=w>=H,re.addEventListener("click",()=>Dn(w-1)),le.addEventListener("click",()=>Dn(w+1)),X.append(re,fe,le),G.appendChild(X);}function Dn(H){const X=D();w=Math.min(Math.max(1,H),X),Zt(),Ui();}function jn(){j(),Rc(),Zt(),Ui();}function Nc(H){x=H.slice(),A=H.slice(),C&&E&&B(),Dn(1);}function $c(H){k=H.slice(),jn();}function Dc(H,X="asc"){C=H,E=H?X:null,C&&E?B():A=x.slice(),jn();}function jc(){try{Ze.disconnect();}catch{}window.removeEventListener("resize",Gi);}return q.append(P,O,G),z.appendChild(q),window.addEventListener("resize",Gi),jn(),{root:z,setData:Nc,setColumns:$c,sortBy:Dc,getSelection:W,setSelection:V,clearSelection:K,setPage:Dn,getState:()=>({page:w,pageCount:D(),sortKey:C,sortDir:E}),destroy:jc}}let Ar=false;const sn=new Set;function Vd(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}const ze=e=>{const t=Vd();if(t){for(const n of sn)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function Kd(){Ar||(Ar=true,window.addEventListener("keydown",ze,true),window.addEventListener("keypress",ze,true),window.addEventListener("keyup",ze,true),document.addEventListener("keydown",ze,true),document.addEventListener("keypress",ze,true),document.addEventListener("keyup",ze,true));}function Yd(){Ar&&(Ar=false,window.removeEventListener("keydown",ze,true),window.removeEventListener("keypress",ze,true),window.removeEventListener("keyup",ze,true),document.removeEventListener("keydown",ze,true),document.removeEventListener("keypress",ze,true),document.removeEventListener("keyup",ze,true));}function qd(e){return sn.size===0&&Kd(),sn.add(e),()=>{sn.delete(e),sn.size===0&&Yd();}}function Hn(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function Xd(){const e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.display="none",t.style.flexShrink="0";const n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");const r=document.createElementNS(e,"animate");r.setAttribute("attributeName","stroke-dasharray"),r.setAttribute("values","1,150;90,150;90,150"),r.setAttribute("dur","1.5s"),r.setAttribute("repeatCount","indefinite");const o=document.createElementNS(e,"animateTransform");return o.setAttribute("attributeName","transform"),o.setAttribute("attributeType","XML"),o.setAttribute("type","rotate"),o.setAttribute("from","0 12 12"),o.setAttribute("to","360 12 12"),o.setAttribute("dur","1s"),o.setAttribute("repeatCount","indefinite"),n.append(r,o),t.appendChild(n),t}function fs(e={}){const{id:t,placeholder:n="Rechercher…",value:r="",size:o="md",disabled:i=false,autoFocus:a=false,onChange:s,onSearch:c,autoSearch:u=false,debounceMs:l=0,focusKey:d="/",iconLeft:p,iconRight:f,withClear:m=true,clearTitle:b="Effacer",ariaLabel:h,submitLabel:y,loading:S=false,blockGameKeys:v=true}=e,k=g("div",{className:"search"+(o?` search--${o}`:""),id:t}),A=g("span",{className:"search-ico search-ico--left"});if(p){const K=Hn(p);K&&A.appendChild(K);}else A.textContent="🔎",A.style.opacity=".9";const x=g("input",{className:"input search-input",type:"text",placeholder:n,value:r,"aria-label":h||n}),C=g("span",{className:"search-ico search-ico--right"});if(f){const K=Hn(f);K&&C.appendChild(K);}const E=Xd();E.classList.add("search-spinner");const w=m?g("button",{className:"search-clear",type:"button",title:b},"×"):null,T=y!=null?g("button",{className:"btn search-submit",type:"button"},y):null,M=g("div",{className:"search-field"},A,x,C,E,...w?[w]:[]);k.append(M,...T?[T]:[]);let z=!!i,q=null;function P(K){E.style.display=K?"inline-block":"none",k.classList.toggle("is-loading",K);}function O(){q!=null&&(window.clearTimeout(q),q=null);}function G(K){O(),l>0?q=window.setTimeout(()=>{q=null,K();},l):K();}function F(){s?.(x.value),u&&c&&c(x.value);}x.addEventListener("input",()=>{G(F);}),x.addEventListener("keydown",K=>{K.key==="Enter"?(K.preventDefault(),O(),c?.(x.value)):K.key==="Escape"&&(x.value.length>0?D("",{notify:true}):x.blur());}),w&&w.addEventListener("click",()=>D("",{notify:true})),T&&T.addEventListener("click",()=>c?.(x.value));let $=()=>{};if(v&&($=qd(x)),d){const K=ce=>{if(ce.key===d&&!ce.ctrlKey&&!ce.metaKey&&!ce.altKey){const he=document.activeElement;he&&(he.tagName==="INPUT"||he.tagName==="TEXTAREA"||he.isContentEditable)||(ce.preventDefault(),x.focus());}};window.addEventListener("keydown",K,true),k.__cleanup=()=>{window.removeEventListener("keydown",K,true),$();};}else k.__cleanup=()=>{$();};function j(K){z=!!K,x.disabled=z,w&&(w.disabled=z),T&&(T.disabled=z),k.classList.toggle("disabled",z);}function D(K,ce={}){const he=x.value;x.value=K??"",ce.notify&&he!==K&&G(F);}function L(){return x.value}function B(){x.focus();}function N(){x.blur();}function W(K){x.placeholder=K;}function ae(K){D("",K);}return j(z),P(S),a&&B(),{root:k,input:x,getValue:L,setValue:D,focus:B,blur:N,setDisabled:j,setPlaceholder:W,clear:ae,setLoading:P,setIconLeft(K){A.replaceChildren();const ce=Hn(K??"🔎");ce&&A.appendChild(ce);},setIconRight(K){C.replaceChildren();const ce=Hn(K??"");ce&&C.appendChild(ce);}}}function Jd(e){const t=String(e??"").trim().toLowerCase();return t?t==="common"?"Common":t==="uncommon"?"Uncommon":t==="rare"?"Rare":t==="legendary"?"Legendary":t==="mythical"?"Mythical":t==="divine"?"Divine":t==="celestial"?"Celestial":t==="unknown"||t==="unknow"?"Unknown":null:null}function Qd(e){return e.toLowerCase()}function di(e={}){const{id:t,label:n="",type:r="neutral",tone:o="soft",border:i,withBorder:a,pill:s=true,size:c="md",onClick:u,variant:l="default",rarity:d=null}=e,p=g("span",{className:"badge",id:t});s&&p.classList.add("badge--pill"),c==="sm"?p.classList.add("badge--sm"):c==="lg"?p.classList.add("badge--lg"):p.classList.add("badge--md"),u&&p.addEventListener("click",u);let f=false,m=a;function b(){f||(m===false?p.style.border="none":p.style.border="");}function h(x,C=o){p.classList.remove("badge--neutral","badge--info","badge--success","badge--warning","badge--danger","badge--soft","badge--outline","badge--solid"),p.classList.add(`badge--${x}`,`badge--${C}`),b();}function y(x){const C=(x??"").trim();C?(p.style.border=C,f=true):(f=false,b());}function S(x){m=x,b();}function v(x){p.textContent=x;}function k(x,C=o){h(x,C);}function A(x){p.classList.remove("badge--rarity","badge--rarity-common","badge--rarity-uncommon","badge--rarity-rare","badge--rarity-legendary","badge--rarity-mythical","badge--rarity-divine","badge--rarity-celestial","badge--rarity-unknown"),p.style.background="",p.style.backgroundSize="",p.style.animation="",p.style.color="",p.style.webkitTextStroke="";const C=Jd(x);if(!C){p.textContent=String(x??"—");return}p.textContent=C,p.classList.add("badge--rarity",`badge--rarity-${Qd(C)}`);}return l==="rarity"?A(d):(p.textContent=n,h(r,o),typeof a=="boolean"&&S(a),i&&y(i)),{root:p,setLabel:v,setType:k,setBorder:y,setWithBorder:S,setRarity:A}}function Zd(){return {ready:false,app:null,renderer:null,ctors:null,baseUrl:null,textures:new Map,animations:new Map,live:new Set,defaultParent:null,overlay:null,categoryIndex:null}}function eu(){return {lru:new Map,cost:0,srcCanvas:new Map}}function tu(){return {cache:new Map,maxEntries:200}}const nu={enabled:true,maxEntries:200,maxCost:800,srcCanvasMax:100},ru={enabled:true,maxEntries:200},ke=Zd(),ou=eu(),iu={...nu},au=tu(),su={...ru};function Me(){return ke}function Kt(){return ou}function An(){return iu}function Tn(){return au}function Io(){return su}function gs(){return ke.ready}const Dr=e=>new Promise(t=>setTimeout(t,e)),Xe=e=>{try{return e()}catch{return}},ot=(e,t,n)=>Math.max(t,Math.min(n,e)),lu=e=>ot(e,0,1);async function Xi(e,t,n){const r=performance.now();for(;performance.now()-r<t;){const o=await Promise.race([e,Dr(50).then(()=>null)]);if(o!==null)return o}throw new Error(`${n} timeout`)}const Ji=Function.prototype.bind,de={_bindPatched:false,engine:null,tos:null,app:null,renderer:null,ticker:null,stage:null};let ms,hs,bs;const cu=new Promise(e=>{ms=e;}),du=new Promise(e=>{hs=e;}),uu=new Promise(e=>{bs=e;});function pu(e){return !!(e&&typeof e=="object"&&typeof e.start=="function"&&typeof e.destroy=="function"&&e.app&&e.app.stage&&e.app.renderer&&e.systems&&typeof e.systems.values=="function")}function fu(e){try{for(const t of e.systems.values()){const n=t?.system;if(n?.name==="tileObject")return n}}catch{}return null}function gu(e){de.engine=e,de.tos=fu(e)||null,de.app=e.app||null,de.renderer=e.app?.renderer||null,de.ticker=e.app?.ticker||null,de.stage=e.app?.stage||null;try{ms(e);}catch{}try{de.app&&hs(de.app);}catch{}try{de.renderer&&bs(de.renderer);}catch{}}function ui(){return de.engine?true:(de._bindPatched||(de._bindPatched=true,Function.prototype.bind=function(e,...t){const n=Ji.call(this,e,...t);try{!de.engine&&pu(e)&&(Function.prototype.bind=Ji,de._bindPatched=!1,gu(e));}catch{}return n}),false)}ui();async function mu(e=15e3){const t=performance.now();for(;performance.now()-t<e;){if(de.engine)return  true;ui(),await Dr(50);}throw new Error("MGPixiHooks: engine capture timeout")}async function hu(e=15e3){return de.engine||await mu(e),true}function bu(){return de.engine&&de.app?{ok:true,engine:de.engine,tos:de.tos,app:de.app}:(ui(),{ok:false,engine:de.engine,tos:de.tos,app:de.app,note:"Not captured. Wait for room, or reload."})}const Ke={engineReady:cu,appReady:du,rendererReady:uu,engine:()=>de.engine,tos:()=>de.tos,app:()=>de.app,renderer:()=>de.renderer,ticker:()=>de.ticker,stage:()=>de.stage,PIXI:()=>R.PIXI||null,init:hu,hook:bu,ready:()=>!!de.engine},yu=R?.location?.origin||"https://magicgarden.gg";function ys(){return typeof GM_xmlhttpRequest=="function"}function vs(e,t="text"){return new Promise((n,r)=>{GM_xmlhttpRequest({method:"GET",url:e,responseType:t,onload:o=>o.status>=200&&o.status<300?n(o):r(new Error(`HTTP ${o.status} for ${e}`)),onerror:()=>r(new Error(`Network error for ${e}`)),ontimeout:()=>r(new Error(`Timeout for ${e}`))});})}async function pi(e){if(ys())return JSON.parse((await vs(e,"text")).responseText);const t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.json()}async function xs(e){if(ys())return (await vs(e,"blob")).response;const t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.blob()}function vu(e){return new Promise((t,n)=>{const r=URL.createObjectURL(e),o=R?.Image||Image,i=new o;i.decoding="async",i.onload=()=>{URL.revokeObjectURL(r),t(i);},i.onerror=()=>{URL.revokeObjectURL(r),n(new Error("Image decode failed"));},i.src=r;})}const ct=(e,t)=>e.replace(/\/?$/,"/")+String(t||"").replace(/^\//,""),xu=e=>e.lastIndexOf("/")>=0?e.slice(0,e.lastIndexOf("/")+1):"",Qi=(e,t)=>String(t||"").startsWith("/")?String(t).slice(1):xu(e)+String(t||"");let fi=null;function ws(){return fi}function wu(e){fi=e;}function ks(){return fi!==null}const ku=/\/(?:r\/\d+\/)?version\/([^/]+)/,Su=15e3,Cu=50;function Au(){return R?.document??(typeof document<"u"?document:null)}function gi(e={}){if(ks())return;const t=e.doc??Au();if(!t)return;const n=t.scripts;for(let r=0;r<n.length;r++){const i=n.item(r)?.src;if(!i)continue;const a=i.match(ku);if(a?.[1]){wu(a[1]);return}}}function Tu(){return gi(),ws()}function Iu(){return ks()}async function Eu(e={}){const t=e.timeoutMs??Su,n=performance.now();for(;performance.now()-n<t;){gi();const r=ws();if(r)return r;await Dr(Cu);}throw new Error("MGVersion timeout (gameVersion not found)")}const Ss={init:gi,isReady:Iu,get:Tu,wait:Eu};let mi=null,Cs=null;function Pu(){return mi}function Mu(){return Cs}function Lu(e){mi=e;}function _u(e){Cs=e;}function As(){return mi!==null}const Fu=15e3;async function Ru(e={}){As()||await hi(e);}async function hi(e={}){const t=Pu();if(t)return t;const n=Mu();if(n)return n;const r=(async()=>{const o=e.gameVersion??await Ss.wait({timeoutMs:Fu}),i=`${yu}/version/${o}/assets/`;return Lu(i),i})();return _u(r),r}async function Ou(e){const t=await hi();return ct(t,e)}function Nu(){return As()}const qt={init:Ru,isReady:Nu,base:hi,url:Ou};function Tr(e){const t=String(e||"").trim();return t?t.startsWith("sprite/")||t.startsWith("sprites/")?t:t.includes("/")?`sprite/${t}`:t:""}function Fn(e,t){const n=String(e||"").trim().replace(/^sprites?\//,"").replace(/^\/+|\/+$/g,""),r=String(t||"").trim();return r.includes("/")||!n?Tr(r):`sprite/${n}/${r}`}function In(e,t,n,r){const o=Fn(e,t);if(n.has(o)||r.has(o))return o;const i=String(t||"").trim();if(n.has(i)||r.has(i))return i;const a=Tr(i);return n.has(a)||r.has(a)?a:o}function $u(e,t,n=25e3){const r=[e],o=new Set;let i=0;for(;r.length&&i++<n;){const a=r.pop();if(!a||o.has(a))continue;if(o.add(a),t(a))return a;const s=a.children;if(Array.isArray(s))for(let c=s.length-1;c>=0;c--)r.push(s[c]);}return null}function Du(e){const t=R.PIXI;if(t?.Texture&&t?.Sprite&&t?.Container&&t?.Rectangle)return {Container:t.Container,Sprite:t.Sprite,Texture:t.Texture,Rectangle:t.Rectangle,AnimatedSprite:t.AnimatedSprite||null};const n=e?.stage,r=$u(n,o=>o?.texture?.frame&&o?.constructor&&o?.texture?.constructor&&o?.texture?.frame?.constructor);if(!r)throw new Error("No Sprite found yet (constructors).");return {Container:n.constructor,Sprite:r.constructor,Texture:r.texture.constructor,Rectangle:r.texture.frame.constructor,AnimatedSprite:t?.AnimatedSprite||null}}async function ju(e,t=15e3){const n=performance.now();for(;performance.now()-n<t;)try{return Du(e)}catch{await Dr(50);}throw new Error("Constructors timeout")}const ht=(...e)=>{try{console.log("[MGSprite]",...e);}catch{}},Ts=new Map;function zu(e){return Ts.get(e)}function Bu(e,t){Ts.set(e,t);}const Is="manifest.json";let Eo=null;async function Gu(){Eo||(Eo=await Es());}function Wu(){return Eo!==null}async function Es(e={}){const t=e.baseUrl??await qt.base(),n=zu(t);if(n)return n;const r=pi(ct(t,Is));return Bu(t,r),r}function Hu(e,t){return e.bundles.find(n=>n.name===t)??null}function Uu(e){if(!e)return [];const t=new Set;for(const n of e.assets)for(const r of n.src??[])typeof r=="string"&&r.endsWith(".json")&&r!==Is&&t.add(r);return Array.from(t)}const ft={init:Gu,isReady:Wu,load:Es,getBundle:Hu,listJsonFromBundle:Uu};function Vu(e){return e&&typeof e=="object"&&e.frames&&e.meta&&typeof e.meta.image=="string"}function eo(e,t,n,r,o){return new e(t,n,r,o)}function Ku(e,t,n,r,o,i,a){let s;try{s=new e({source:t.source,frame:n,orig:r,trim:o||void 0,rotate:i||0});}catch{s=new e(t.baseTexture||t,n,r,o||void 0,i||0);}if(a)if(s.defaultAnchor?.set)try{s.defaultAnchor.set(a.x,a.y);}catch{}else s.defaultAnchor?(s.defaultAnchor.x=a.x,s.defaultAnchor.y=a.y):s.defaultAnchor={x:a.x,y:a.y};try{s.updateUvs?.();}catch{}return s}function Yu(e,t,n,r){const{Texture:o,Rectangle:i}=r;for(const[a,s]of Object.entries(e.frames)){const c=s.frame,u=!!s.rotated,l=u?2:0,d=u?c.h:c.w,p=u?c.w:c.h,f=eo(i,c.x,c.y,d,p),m=s.sourceSize||{w:c.w,h:c.h},b=eo(i,0,0,m.w,m.h);let h=null;if(s.trimmed&&s.spriteSourceSize){const y=s.spriteSourceSize;h=eo(i,y.x,y.y,y.w,y.h);}n.set(a,Ku(o,t,f,b,h,l,s.anchor||null));}}function qu(e,t,n){if(!(!e.animations||typeof e.animations!="object"))for(const[r,o]of Object.entries(e.animations)){if(!Array.isArray(o))continue;const i=o.map(a=>t.get(a)).filter(Boolean);i.length>=2&&n.set(r,i);}}function Xu(e,t){const n=(r,o)=>{const i=String(r||"").trim(),a=String(o||"").trim();!i||!a||(t.has(i)||t.set(i,new Set),t.get(i).add(a));};for(const r of Object.keys(e.frames||{})){const o=/^sprite\/([^/]+)\/(.+)$/.exec(r);o&&n(o[1],o[2]);}}async function Ju(e,t){const n=await ft.load({baseUrl:e}),r=ft.getBundle(n,"default");if(!r)throw new Error("No default bundle in manifest");const o=ft.listJsonFromBundle(r),i=new Set,a=new Map,s=new Map,c=new Map;async function u(l){if(i.has(l))return;i.add(l);const d=await pi(ct(e,l));if(!Vu(d))return;const p=d.meta?.related_multi_packs;if(Array.isArray(p))for(const h of p)await u(Qi(l,h));const f=Qi(l,d.meta.image),m=await vu(await xs(ct(e,f))),b=t.Texture.from(m);Yu(d,b,a,t),qu(d,a,s),Xu(d,c);}for(const l of o)await u(l);return {textures:a,animations:s,categoryIndex:c}}let Un=null;async function Qu(){return ke.ready?true:Un||(Un=(async()=>{const e=performance.now();ht("init start");const t=await Xi(Ke.appReady,15e3,"PIXI app");ht("app ready");const n=await Xi(Ke.rendererReady,15e3,"PIXI renderer");ht("renderer ready"),ke.app=t,ke.renderer=n||t?.renderer||null,ke.ctors=await ju(t),ht("constructors resolved"),ke.baseUrl=await qt.base(),ht("base url",ke.baseUrl);const{textures:r,animations:o,categoryIndex:i}=await Ju(ke.baseUrl,ke.ctors);return ke.textures=r,ke.animations=o,ke.categoryIndex=i,ht("atlases loaded","textures",ke.textures.size,"animations",ke.animations.size,"categories",ke.categoryIndex?.size??0),ke.ready=true,ht("ready in",Math.round(performance.now()-e),"ms"),true})(),Un)}const Yt={Gold:{overlayTall:null,tallIconOverride:null},Rainbow:{overlayTall:null,tallIconOverride:null,angle:130,angleTall:0},Wet:{overlayTall:"sprite/mutation-overlay/WetTallPlant",tallIconOverride:"sprite/mutation/Puddle"},Chilled:{overlayTall:"sprite/mutation-overlay/ChilledTallPlant",tallIconOverride:null},Frozen:{overlayTall:"sprite/mutation-overlay/FrozenTallPlant",tallIconOverride:null},Dawnlit:{overlayTall:null,tallIconOverride:null},Ambershine:{overlayTall:null,tallIconOverride:null},Dawncharged:{overlayTall:null,tallIconOverride:null},Ambercharged:{overlayTall:null,tallIconOverride:null}},Ps=Object.keys(Yt),Zu=["Gold","Rainbow","Wet","Chilled","Frozen","Ambershine","Dawnlit","Dawncharged","Ambercharged"],Zi=new Map(Zu.map((e,t)=>[e,t]));function Ir(e){return [...new Set(e.filter(Boolean))].sort((n,r)=>(Zi.get(n)??1/0)-(Zi.get(r)??1/0))}const ep=["Wet","Chilled","Frozen"],tp=new Set(["Dawnlit","Ambershine","Dawncharged","Ambercharged"]),np={Banana:.6,Carrot:.6,Sunflower:.5,Starweaver:.5,FavaBean:.25,BurrosTail:.2},rp={Pepper:.5,Banana:.6},op=256,ip=.5,ap=2;function Ms(e){if(!e.length)return {muts:[],overlayMuts:[],selectedMuts:[],sig:""};const t=Ir(e),n=sp(e),r=lp(e);return {muts:n,overlayMuts:r,selectedMuts:t,sig:`${t.join(",")}|${n.join(",")}|${r.join(",")}`}}function sp(e){const t=e.filter((o,i,a)=>Yt[o]&&a.indexOf(o)===i);if(!t.length)return [];if(t.includes("Gold"))return ["Gold"];if(t.includes("Rainbow"))return ["Rainbow"];const n=["Ambershine","Dawnlit","Dawncharged","Ambercharged"];return t.some(o=>n.includes(o))?Ir(t.filter(o=>!ep.includes(o))):Ir(t)}function lp(e){const t=e.filter((n,r,o)=>Yt[n]?.overlayTall&&o.indexOf(n)===r);return Ir(t)}function to(e,t){return e.map(n=>({name:n,meta:Yt[n],overlayTall:Yt[n]?.overlayTall??null,isTall:t}))}const cp={Gold:{op:"source-atop",colors:["rgb(235,200,0)"],a:.7},Rainbow:{op:"color",colors:["#FF1744","#FF9100","#FFEA00","#00E676","#2979FF","#D500F9"],ang:130,angTall:0,masked:true},Wet:{op:"source-atop",colors:["rgb(50,180,200)"],a:.25},Chilled:{op:"source-atop",colors:["rgb(100,160,210)"],a:.45},Frozen:{op:"source-atop",colors:["rgb(100,130,220)"],a:.5},Dawnlit:{op:"source-atop",colors:["rgb(209,70,231)"],a:.5},Ambershine:{op:"source-atop",colors:["rgb(190,100,40)"],a:.5},Dawncharged:{op:"source-atop",colors:["rgb(140,80,200)"],a:.5},Ambercharged:{op:"source-atop",colors:["rgb(170,60,25)"],a:.5}},Vn=(()=>{try{const t=document.createElement("canvas").getContext("2d");if(!t)return new Set;const n=["color","hue","saturation","luminosity","overlay","screen","lighter","source-atop"],r=new Set;for(const o of n)t.globalCompositeOperation=o,t.globalCompositeOperation===o&&r.add(o);return r}catch{return new Set}})();function dp(e){return Vn.has(e)?e:Vn.has("overlay")?"overlay":Vn.has("screen")?"screen":Vn.has("lighter")?"lighter":"source-atop"}function up(e,t,n,r,o=false){const i=(r-90)*Math.PI/180,a=t/2,s=n/2;if(!o){const d=Math.min(t,n)/2;return e.createLinearGradient(a-Math.cos(i)*d,s-Math.sin(i)*d,a+Math.cos(i)*d,s+Math.sin(i)*d)}const c=Math.cos(i),u=Math.sin(i),l=Math.abs(c)*t/2+Math.abs(u)*n/2;return e.createLinearGradient(a-c*l,s-u*l,a+c*l,s+u*l)}function ea(e,t,n,r,o=false){const i=r.colors?.length?r.colors:["#fff"],a=r.ang!=null?up(e,t,n,r.ang,o):e.createLinearGradient(0,0,0,n);i.length===1?(a.addColorStop(0,i[0]),a.addColorStop(1,i[0])):i.forEach((s,c)=>a.addColorStop(c/(i.length-1),s)),e.fillStyle=a,e.fillRect(0,0,t,n);}function pp(e,t,n,r){const o=cp[n];if(!o)return;const i={...o};n==="Rainbow"&&r&&i.angTall!=null&&(i.ang=i.angTall);const a=n==="Rainbow"&&r,s=t.width,c=t.height;e.save();const u=i.masked?dp(i.op):"source-in";if(e.globalCompositeOperation=u,i.a!=null&&(e.globalAlpha=i.a),i.masked){const l=document.createElement("canvas");l.width=s,l.height=c;const d=l.getContext("2d");d.imageSmoothingEnabled=false,ea(d,s,c,i,a),d.globalCompositeOperation="destination-in",d.drawImage(t,0,0),e.drawImage(l,0,0);}else ea(e,s,c,i,a);e.restore();}function fp(e){return /tallplant/i.test(e)}function bi(e){const t=String(e||"").split("/");return t[t.length-1]||""}function Ls(e){switch(e){case "Ambershine":return ["Ambershine","Amberlit"];case "Dawncharged":return ["Dawncharged","Dawnbound"];case "Ambercharged":return ["Ambercharged","Amberbound"];default:return [e]}}function gp(e,t){const n=String(e||"").toLowerCase();for(const r of t.keys()){const o=/sprite\/mutation-overlay\/([A-Za-z0-9]+)TallPlant/i.exec(String(r));if(!o||!o[1])continue;if(o[1].toLowerCase()===n){const a=t.get(r);if(a)return {tex:a,key:r}}}return null}function mp(e,t,n,r){if(!t)return null;const o=bi(e),i=Ls(t);for(const a of i){const s=[`sprite/mutation/${a}${o}`,`sprite/mutation/${a}-${o}`,`sprite/mutation/${a}_${o}`,`sprite/mutation/${a}/${o}`,`sprite/mutation/${a}`];for(const c of s){const u=n.get(c);if(u)return {tex:u,key:c}}{const c=`sprite/mutation-overlay/${a}TallPlant`,u=n.get(c);if(u)return {tex:u,key:c};const l=`sprite/mutation-overlay/${a}`,d=n.get(l);if(d)return {tex:d,key:l};const p=gp(t,n);if(p)return p}}return null}function hp(e,t,n,r){if(!t)return null;const o=Yt[t];if(n&&o?.tallIconOverride){const s=r.get(o.tallIconOverride);if(s)return s}const i=bi(e),a=Ls(t);for(const s of a){const c=[`sprite/mutation/${s}Icon`,`sprite/mutation/${s}`,`sprite/mutation/${s}${i}`,`sprite/mutation/${s}-${i}`,`sprite/mutation/${s}_${i}`,`sprite/mutation/${s}/${i}`];for(const u of c){const l=r.get(u);if(l)return l}if(n){const u=`sprite/mutation-overlay/${s}TallPlantIcon`,l=r.get(u);if(l)return l;const d=`sprite/mutation-overlay/${s}TallPlant`,p=r.get(d);if(p)return p}}return null}function bp(e,t,n){const r=e?.orig?.width??e?.frame?.width??e?.width??1,o=e?.orig?.height??e?.frame?.height??e?.height??1,i=e?.defaultAnchor?.x??0,a=e?.defaultAnchor?.y??0;let s=rp[t]??i;const c=o>r*1.5;let u=np[t]??(c?a:.4);const l={x:(s-i)*r,y:(u-a)*o},d=Math.min(r,o),p=Math.min(1.5,d/op);let f=ip*p;return n&&(f*=ap),{width:r,height:o,anchorX:i,anchorY:a,offset:l,iconScale:f}}function _s(e,t){return `${t.sig}::${e}`}function Fs(e){return e?e.isAnim?e.frames?.length||0:e.tex?1:0:0}function yp(e,t,n){e.lru.delete(t),e.lru.set(t,n);}function vp(e,t){if(t.enabled)for(;e.lru.size>t.maxEntries||e.cost>t.maxCost;){const n=e.lru.keys().next().value;if(n===void 0)break;const r=e.lru.get(n);e.lru.delete(n),e.cost=Math.max(0,e.cost-Fs(r??null));}}function Rs(e,t){const n=e.lru.get(t);return n?(yp(e,t,n),n):null}function Os(e,t,n,r){e.lru.set(t,n),e.cost+=Fs(n),vp(e,r);}function xp(e){e.lru.clear(),e.cost=0,e.srcCanvas.clear();}function wp(e,t){return e.srcCanvas.get(t)??null}function kp(e,t,n,r){if(e.srcCanvas.set(t,n),e.srcCanvas.size>r.srcCanvasMax){const o=e.srcCanvas.keys().next().value;o!==void 0&&e.srcCanvas.delete(o);}}function jr(e,t,n,r,o){const i=wp(r,e);if(i)return i;let a=null;const s=t?.resolution??1;try{if(t?.extract?.canvas){const c=new n.Sprite(e),u=t.extract.canvas(c);if(c.destroy?.({children:!0,texture:!1,baseTexture:!1}),s>1&&u){const l=Math.round(u.width/s),d=Math.round(u.height/s);a=document.createElement("canvas"),a.width=l,a.height=d;const p=a.getContext("2d");p&&(p.imageSmoothingEnabled=!1,p.drawImage(u,0,0,l,d));}else a=u;}}catch{}if(!a){const c=e?.frame||e?._frame,u=e?.orig||e?._orig,l=e?.trim||e?._trim,d=e?.rotate||e?._rotate||0,p=e?.baseTexture?.resource?.source||e?.baseTexture?.resource||e?.source?.resource?.source||e?.source?.resource||e?._source?.resource?.source||null;if(!c||!p)throw new Error("textureToCanvas fail");a=document.createElement("canvas");const f=Math.max(1,(u?.width??c.width)|0),m=Math.max(1,(u?.height??c.height)|0),b=l?.x??0,h=l?.y??0;a.width=f,a.height=m;const y=a.getContext("2d");y.imageSmoothingEnabled=false,d===true||d===2||d===8?(y.save(),y.translate(b+c.height/2,h+c.width/2),y.rotate(-Math.PI/2),y.drawImage(p,c.x,c.y,c.width,c.height,-c.width/2,-c.height/2,c.width,c.height),y.restore()):y.drawImage(p,c.x,c.y,c.width,c.height,b,h,c.width,c.height);}return kp(r,e,a,o),a}function Sp(e,t,n,r,o,i,a,s){const{w:c,h:u,aX:l,aY:d,basePos:p}=t,f=[];for(const m of n){const b=new r.Sprite(e);b.anchor?.set?.(l,d),b.position.set(p.x,p.y),b.zIndex=1;const h=document.createElement("canvas");h.width=c,h.height=u;const y=h.getContext("2d");y.imageSmoothingEnabled=false,y.save(),y.translate(c*l,u*d),y.drawImage(jr(e,o,r,i,a),-c*l,-u*d),y.restore(),pp(y,h,m.name,m.isTall);const S=r.Texture.from(h,{resolution:e.resolution??1});s.push(S),b.texture=S,f.push(b);}return f}function Cp(e,t,n,r,o,i,a,s,c,u){const{aX:l,basePos:d}=t,p=[];for(const f of n){const m=f.overlayTall&&r.get(f.overlayTall)&&{tex:r.get(f.overlayTall),key:f.overlayTall}||mp(e,f.name,r);if(!m?.tex)continue;const b=jr(m.tex,i,o,a,s);if(!b)continue;const h=b.width,y={x:0,y:0},S={x:d.x-l*h,y:0},v=document.createElement("canvas");v.width=h,v.height=b.height;const k=v.getContext("2d");if(!k)continue;k.imageSmoothingEnabled=false,k.drawImage(b,0,0),k.globalCompositeOperation="destination-in",k.drawImage(c,-S.x,-0);const A=o.Texture.from(v,{resolution:m.tex.resolution??1});u.push(A);const x=new o.Sprite(A);x.anchor?.set?.(y.x,y.y),x.position.set(S.x,S.y),x.scale.set(1),x.alpha=1,x.zIndex=3,p.push(x);}return p}function Ap(e,t,n,r,o,i){const{basePos:a}=t,s=[];for(const c of n){if(c.name==="Gold"||c.name==="Rainbow")continue;const u=hp(e,c.name,c.isTall,r);if(!u)continue;const l=new o.Sprite(u),d=u?.defaultAnchor?.x??.5,p=u?.defaultAnchor?.y??.5;l.anchor?.set?.(d,p),l.position.set(a.x+i.offset.x,a.y+i.offset.y),l.scale.set(i.iconScale),c.isTall&&(l.zIndex=-1),tp.has(c.name)&&(l.zIndex=10),l.zIndex||(l.zIndex=2),s.push(l);}return s}function Ns(e,t,n,r){try{if(!e||!r.renderer||!r.ctors?.Container||!r.ctors?.Sprite||!r.ctors?.Texture)return null;const{Container:o,Sprite:i,Texture:a}=r.ctors,s=e?.orig?.width??e?.frame?.width??e?.width??1,c=e?.orig?.height??e?.frame?.height??e?.height??1,u=e?.defaultAnchor?.x??.5,l=e?.defaultAnchor?.y??.5,d={x:s*u,y:c*l},p=jr(e,r.renderer,r.ctors,r.cacheState,r.cacheConfig),f=new o;f.sortableChildren=!0;const m=new i(e);m.anchor?.set?.(u,l),m.position.set(d.x,d.y),m.zIndex=0,f.addChild(m);const b=fp(t),h=to(n.muts,b),y=to(n.overlayMuts,b),S=to(n.selectedMuts,b),v=[],k={w:s,h:c,aX:u,aY:l,basePos:d},A=bi(t),x=bp(e,A,b);Sp(e,k,h,r.ctors,r.renderer,r.cacheState,r.cacheConfig,v).forEach(P=>f.addChild(P)),b&&Cp(t,k,y,r.textures,r.ctors,r.renderer,r.cacheState,r.cacheConfig,p,v).forEach(O=>f.addChild(O)),Ap(t,k,S,r.textures,r.ctors,x).forEach(P=>f.addChild(P));let w={x:0,y:0,width:s,height:c};try{const P=f.getLocalBounds?.()||f.getBounds?.(!0);P&&Number.isFinite(P.width)&&Number.isFinite(P.height)&&(w={x:P.x,y:P.y,width:P.width,height:P.height});}catch{}const{Rectangle:T}=r.ctors,M=T?new T(0,0,s,c):void 0;let z=null;if(typeof r.renderer.generateTexture=="function"?z=r.renderer.generateTexture(f,{resolution:1,region:M}):r.renderer.textureGenerator?.generateTexture&&(z=r.renderer.textureGenerator.generateTexture({target:f,resolution:1,region:M})),!z)throw new Error("no render texture");const q=z instanceof a?z:a.from(r.renderer.extract.canvas(z));try{q.__mg_base={baseX:-w.x,baseY:-w.y,baseW:s,baseH:c,texW:w.width,texH:w.height};}catch{}z&&z!==q&&z.destroy?.(!0),f.destroy({children:!0,texture:!1,baseTexture:!1});try{q.__mg_gen=!0,q.label=`${t}|${n.sig}`;}catch{}return q}catch{return null}}function Tp(e,t,n,r){if(!e||e.length<2)return null;const o=[];for(const i of e){const a=Ns(i,t,n,r);a&&o.push(a);}return o.length>=2?o:null}function $s(e,t,n,r,o){const i=t.scale??1,a=t.frameIndex??0,s=t.mutations?.slice().sort().join(",")||"",c=t.anchorX??.5,u=t.anchorY??.5;return `${e}|s${i}|f${a}|m${s}|ax${c}|ay${u}|bm${n}|bp${o}|p${r}`}function Ip(e,t){const n=e.cache.get(t);return n?(n.lastAccess=performance.now(),n.canvas):null}function Ep(e,t,n,r){if(t.enabled){if(e.cache.size>=t.maxEntries){let o=null,i=1/0;for(const[a,s]of e.cache)s.lastAccess<i&&(i=s.lastAccess,o=a);o&&e.cache.delete(o);}e.cache.set(n,{canvas:r,lastAccess:performance.now()});}}function ta(e){const t=document.createElement("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");return n&&n.drawImage(e,0,0),t}function Pp(e){e.cache.clear();}function Mp(e){return {size:e.cache.size,maxEntries:e.maxEntries}}function Lp(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0);})}async function _p(e,t,n,r,o,i,a,s=5,c=0){if(!t.ready||!i.enabled)return 0;const u=e.length;let l=0;a?.(0,u);for(let d=0;d<u;d+=s){const p=e.slice(d,d+s);for(const f of p)try{const m=In(null,f,t.textures,t.animations),b={scale:1},h=js(b),y=zs(h,b),S=Gs(h,b.boundsPadding),v=$s(m,b,h,y,S);o.cache.has(v)||Po(t,n,r,null,f,b,o,i),l++;}catch{l++;}a?.(l,u),d+s<u&&await Lp();}return l}function Fp(e){if(e.overlay)return e.overlay;const t=new e.ctors.Container;t.sortableChildren=true,t.zIndex=99999999;try{e.app.stage.sortableChildren=!0;}catch{}return e.app.stage.addChild(t),e.overlay=t,t}function Rp(e){const t=e.defaultParent;if(!t)return null;try{return typeof t=="function"?t():t}catch{return null}}function yi(e,t,n,r,o,i){if(!n.length)return t;const a=Ms(n);if(!a.sig)return t;const s=_s(e,a),c=Rs(o,s);if(c?.tex)return c.tex;const u=Ns(t,e,a,{renderer:r.renderer,ctors:r.ctors,textures:r.textures,cacheState:o,cacheConfig:i});return u?(Os(o,s,{isAnim:false,tex:u},i),u):t}function Ds(e,t,n,r,o,i){if(!n.length)return t;const a=Ms(n);if(!a.sig)return t;const s=_s(e,a),c=Rs(o,s);if(c?.isAnim&&c.frames?.length)return c.frames;const u=Tp(t,e,a,{renderer:r.renderer,ctors:r.ctors,textures:r.textures,cacheState:o,cacheConfig:i});return u?(Os(o,s,{isAnim:true,frames:u},i),u):t}function na(e,t,n,r,o,i={}){if(!e.ready)throw new Error("MGSprite not ready yet");const a=In(r,o,e.textures,e.animations),s=i.mutations||[],c=i.parent||Rp(e)||Fp(e),u=e.renderer?.width||e.renderer?.view?.width||innerWidth,l=e.renderer?.height||e.renderer?.view?.height||innerHeight,d=i.center?u/2:i.x??u/2,p=i.center?l/2:i.y??l/2;let f;const m=e.animations.get(a);if(m&&m.length>=2){const y=Ds(a,m,s,e,t,n),S=e.ctors.AnimatedSprite;if(S)f=new S(y),f.animationSpeed=i.fps?i.fps/60:i.speed??.15,f.loop=i.loop??true,f.play();else {const v=new e.ctors.Sprite(y[0]),A=1e3/Math.max(1,i.fps||8);let x=0,C=0;const E=w=>{const T=e.app.ticker?.deltaMS??w*16.666666666666668;if(x+=T,x<A)return;const M=x/A|0;x%=A,C=(C+M)%y.length,v.texture=y[C];};v.__mgTick=E,e.app.ticker?.add?.(E),f=v;}}else {const y=e.textures.get(a);if(!y)throw new Error(`Unknown sprite/anim key: ${a}`);const S=yi(a,y,s,e,t,n);f=new e.ctors.Sprite(S);}const b=i.anchorX??f.texture?.defaultAnchor?.x??.5,h=i.anchorY??f.texture?.defaultAnchor?.y??.5;return f.anchor?.set?.(b,h),f.position.set(d,p),f.scale.set(i.scale??1),f.alpha=i.alpha??1,f.rotation=i.rotation??0,f.zIndex=i.zIndex??999999,c.addChild(f),e.live.add(f),f.__mgDestroy=()=>{try{f.__mgTick&&e.app.ticker?.remove?.(f.__mgTick);}catch{}try{f.destroy?.({children:!0,texture:!1,baseTexture:!1});}catch{try{f.destroy?.();}catch{}}e.live.delete(f);},f}function Op(e,t){const n=e.renderer;if(n?.extract?.canvas)return n.extract.canvas(t);if(n?.plugins?.extract?.canvas)return n.plugins.extract.canvas(t);throw new Error("No extract.canvas available on renderer")}const ra=new Map;function js(e){return e.boundsMode?e.boundsMode:e.mutations&&e.mutations.length>0?"base":"mutations"}function zs(e,t){return e==="mutations"?t.pad??2:t.pad??0}function tn(e){return Number.isFinite(e)?Math.max(0,e):0}function Bs(e){if(typeof e=="number"){const t=tn(e);return {top:t,right:t,bottom:t,left:t}}return e?{top:tn(e.top??0),right:tn(e.right??0),bottom:tn(e.bottom??0),left:tn(e.left??0)}:{top:0,right:0,bottom:0,left:0}}function Gs(e,t){if(e==="mutations")return "0,0,0,0";if(e==="padded"&&t==null)return "auto";const n=Bs(t);return `${n.top},${n.right},${n.bottom},${n.left}`}function Ws(e){const t=e?.orig?.width??e?.frame?.width??e?.width??1,n=e?.orig?.height??e?.frame?.height??e?.height??1;return {w:t,h:n}}function Hs(e,t,n){const r=e?.__mg_base;return r&&Number.isFinite(r.baseX)&&Number.isFinite(r.baseY)&&Number.isFinite(r.baseW)&&Number.isFinite(r.baseH)&&Number.isFinite(r.texW)&&Number.isFinite(r.texH)?r:{baseX:0,baseY:0,baseW:t,baseH:n,texW:t,texH:n}}function Np(e,t,n,r,o,i){const a=`${e}|f${t}`,s=ra.get(a);if(s)return s;const c=Ws(n),u={top:0,right:0,bottom:0,left:0};for(const l of Ps){const d=yi(e,n,[l],r,o,i),p=Hs(d,c.w,c.h),f=Math.max(0,p.baseX),m=Math.max(0,p.baseY),b=Math.max(0,p.texW-p.baseX-p.baseW),h=Math.max(0,p.texH-p.baseY-p.baseH);f>u.left&&(u.left=f),m>u.top&&(u.top=m),b>u.right&&(u.right=b),h>u.bottom&&(u.bottom=h);}return ra.set(a,u),u}function Po(e,t,n,r,o,i={},a,s){if(!e.ready)throw new Error("MGSprite not ready yet");const c=In(r,o,e.textures,e.animations),u=js(i),l=zs(u,i),d=Gs(u,i.boundsPadding),p=a&&s?.enabled?$s(c,i,u,l,d):null;if(p&&a&&s?.enabled){const v=Ip(a,p);if(v)return ta(v)}const f=i.mutations||[],m=e.animations.get(c),b=Math.max(0,(i.frameIndex??0)|0);let h,y;if(m?.length)if(h=m[b%m.length],f.length){const v=Ds(c,m,f,e,t,n);y=v[b%v.length];}else y=h;else {const v=e.textures.get(c);if(!v)throw new Error(`Unknown sprite/anim key: ${c}`);h=v,y=yi(c,v,f,e,t,n);}let S;if(u==="mutations"){const v=new e.ctors.Sprite(y),k=i.anchorX??v.texture?.defaultAnchor?.x??.5,A=i.anchorY??v.texture?.defaultAnchor?.y??.5;v.anchor?.set?.(k,A),v.scale.set(i.scale??1);const x=new e.ctors.Container;x.addChild(v);try{x.updateTransform?.();}catch{}const C=v.getBounds?.(true)||{x:0,y:0,width:v.width,height:v.height};v.position.set(-C.x+l,-C.y+l),S=Op(e,x);try{x.destroy?.({children:!0});}catch{}}else {const v=i.scale??1;let k=Bs(i.boundsPadding);u==="padded"&&i.boundsPadding==null&&(k=Np(c,b,h,e,t,n)),l&&(k={top:k.top+l,right:k.right+l,bottom:k.bottom+l,left:k.left+l});const A=Ws(h),x=Hs(y,A.w,A.h),C=Math.max(1,Math.ceil((A.w+k.left+k.right)*v)),E=Math.max(1,Math.ceil((A.h+k.top+k.bottom)*v));S=document.createElement("canvas"),S.width=C,S.height=E;const w=S.getContext("2d");if(w){w.imageSmoothingEnabled=false;const T=jr(y,e.renderer,e.ctors,t,n),M=(k.left-x.baseX)*v,z=(k.top-x.baseY)*v;w.drawImage(T,M,z,T.width*v,T.height*v);}}return p&&a&&s?.enabled?(Ep(a,s,p,S),ta(S)):S}function $p(e){for(const t of Array.from(e.live))t.__mgDestroy?.();}function Dp(e,t){return e.defaultParent=t,true}function jp(e,t){return e.defaultParent=t,true}function Lt(){if(!gs())throw new Error("MGSprite not ready yet")}function zp(e,t,n){return typeof t=="string"?na(Me(),Kt(),An(),e,t,n||{}):na(Me(),Kt(),An(),null,e,t||{})}function Bp(e,t,n){return typeof t=="string"?Po(Me(),Kt(),An(),e,t,n||{},Tn(),Io()):Po(Me(),Kt(),An(),null,e,t||{},Tn(),Io())}function Gp(){$p(Me());}function Wp(e){return Dp(Me(),e)}function Hp(e){return jp(Me(),e)}function Up(e,t){const n=Me(),r=typeof t=="string"?In(e,t,n.textures,n.animations):In(null,e,n.textures,n.animations);return n.textures.has(r)||n.animations.has(r)}function Vp(){Lt();const e=Me().categoryIndex;return e?Array.from(e.keys()).sort((t,n)=>t.localeCompare(n)):[]}function Kp(e){Lt();const t=String(e||"").trim();if(!t)return [];const n=Me().categoryIndex;return n?Array.from(n.get(t)?.values()||[]):[]}function Yp(e,t){Lt();const n=String(e||"").trim(),r=String(t||"").trim();if(!n||!r)return  false;const o=Me().categoryIndex;if(!o)return  false;const i=n.toLowerCase(),a=r.toLowerCase();for(const[s,c]of o.entries())if(s.toLowerCase()===i){for(const u of c.values())if(u.toLowerCase()===a)return  true}return  false}function qp(e){Lt();const t=Me().categoryIndex;if(!t)return [];const n=String(e||"").trim().toLowerCase(),r=[];for(const[o,i]of t.entries())for(const a of i.values()){const s=Fn(o,a);(!n||s.toLowerCase().startsWith(n))&&r.push(s);}return r.sort((o,i)=>o.localeCompare(i))}function Xp(e){Lt();const t=String(e||"").trim();if(!t)return null;const n=Tr(t),r=/^sprite\/([^/]+)\/(.+)$/.exec(n);if(!r)return null;const o=r[1],i=r[2],a=Me().categoryIndex,s=o.toLowerCase(),c=i.toLowerCase();let u=o,l=i;if(a){const d=Array.from(a.keys()).find(m=>m.toLowerCase()===s);if(!d)return null;u=d;const p=a.get(d);if(!p)return null;const f=Array.from(p.values()).find(m=>m.toLowerCase()===c);if(!f)return null;l=f;}return {category:u,id:l,key:Fn(u,l)}}function Jp(e,t){Lt();const n=String(e||"").trim(),r=String(t||"").trim();if(!n||!r)throw new Error("getIdPath(category, id) requires both category and id");const o=Me().categoryIndex;if(!o)throw new Error("Sprite categories not indexed");const i=n.toLowerCase(),a=r.toLowerCase(),s=Array.from(o.keys()).find(l=>l.toLowerCase()===i)||n,c=o.get(s);if(!c)throw new Error(`Unknown sprite category: ${n}`);const u=Array.from(c.values()).find(l=>l.toLowerCase()===a)||r;if(!c.has(u))throw new Error(`Unknown sprite id: ${n}/${r}`);return Fn(s,u)}function Qp(){xp(Kt());}function Zp(){Pp(Tn());}function ef(){return Mp(Tn())}function tf(){return [...Ps]}async function nf(e,t,n=10,r=0){return Lt(),_p(e,Me(),Kt(),An(),Tn(),Io(),t,n,r)}const ne={init:Qu,isReady:gs,show:zp,toCanvas:Bp,clear:Gp,attach:Wp,attachProvider:Hp,has:Up,key:(e,t)=>Fn(e,t),getCategories:Vp,getCategoryId:Kp,hasId:Yp,listIds:qp,getIdInfo:Xp,getIdPath:Jp,clearMutationCache:Qp,clearToCanvasCache:Zp,getToCanvasCacheStats:ef,getMutationNames:tf,warmup:nf},rf=R,Ye=rf.Object??Object,zr=Ye.keys,Er=Ye.values,Pr=Ye.entries,oa=new WeakSet;function of(){return {data:{items:null,decor:null,mutations:null,eggs:null,pets:null,abilities:null,plants:null,weather:null},isHookInstalled:false,scanInterval:null,scanAttempts:0,weatherPollingTimer:null,weatherPollAttempts:0}}const oe=of(),bt={items:["WateringCan","PlanterPot","Shovel"],decor:["SmallRock","MediumRock","LargeRock","WoodBench","StoneBench","MarbleBench"],mutations:["Gold","Rainbow","Wet","Chilled","Frozen"],eggs:["CommonEgg","UncommonEgg","RareEgg"],pets:["Worm","Snail","Bee","Chicken","Bunny"],abilities:["ProduceScaleBoost","DoubleHarvest","SeedFinderI","CoinFinderI"],plants:["Carrot","Strawberry","Aloe","Blueberry","Apple"]},af=["Rain","Frost","Dawn","AmberMoon"],ia=/main-[^/]+\.js(\?|$)/,sf=6,lf=150,cf=2e3,df=200,uf=50,yt=(e,t)=>t.every(n=>e.includes(n));function vt(e,t){oe.data[e]==null&&(oe.data[e]=t,Mr()&&Ks());}function Mr(){return Object.values(oe.data).every(e=>e!=null)}function Us(e,t){if(!e||typeof e!="object"||oa.has(e))return;oa.add(e);let n;try{n=zr(e);}catch{return}if(!n||n.length===0)return;const r=e;let o;if(!oe.data.items&&yt(n,bt.items)&&(o=r.WateringCan,o&&typeof o=="object"&&"coinPrice"in o&&"creditPrice"in o&&vt("items",r)),!oe.data.decor&&yt(n,bt.decor)&&(o=r.SmallRock,o&&typeof o=="object"&&"coinPrice"in o&&"creditPrice"in o&&vt("decor",r)),!oe.data.mutations&&yt(n,bt.mutations)&&(o=r.Gold,o&&typeof o=="object"&&"baseChance"in o&&"coinMultiplier"in o&&vt("mutations",r)),!oe.data.eggs&&yt(n,bt.eggs)&&(o=r.CommonEgg,o&&typeof o=="object"&&"faunaSpawnWeights"in o&&"secondsToHatch"in o&&vt("eggs",r)),!oe.data.pets&&yt(n,bt.pets)&&(o=r.Worm,o&&typeof o=="object"&&"coinsToFullyReplenishHunger"in o&&"diet"in o&&Array.isArray(o.diet)&&vt("pets",r)),!oe.data.abilities&&yt(n,bt.abilities)&&(o=r.ProduceScaleBoost,o&&typeof o=="object"&&"trigger"in o&&"baseParameters"in o&&vt("abilities",r)),!oe.data.plants&&yt(n,bt.plants)&&(o=r.Carrot,o&&typeof o=="object"&&"seed"in o&&"plant"in o&&"crop"in o&&vt("plants",r)),!(t>=sf))for(const i of n){let a;try{a=r[i];}catch{continue}a&&typeof a=="object"&&Us(a,t+1);}}function mr(e){try{Us(e,0);}catch{}}function Vs(){if(!oe.isHookInstalled){if(Ye.__MG_HOOKED__){oe.isHookInstalled=true;return}Ye.__MG_HOOKED__=true,oe.isHookInstalled=true;try{Ye.keys=function(t){return mr(t),zr.apply(this,arguments)},Er&&(Ye.values=function(t){return mr(t),Er.apply(this,arguments)}),Pr&&(Ye.entries=function(t){return mr(t),Pr.apply(this,arguments)});}catch{}}}function Ks(){if(oe.isHookInstalled){try{Ye.keys=zr,Er&&(Ye.values=Er),Pr&&(Ye.entries=Pr);}catch{}oe.isHookInstalled=false;}}function pf(){if(oe.scanInterval||Mr())return;const e=()=>{if(Mr()||oe.scanAttempts>lf){Ys();return}oe.scanAttempts++;try{zr(R).forEach(t=>{try{mr(R[t]);}catch{}});}catch{}};e(),oe.scanInterval=setInterval(e,cf);}function Ys(){oe.scanInterval&&(clearInterval(oe.scanInterval),oe.scanInterval=null);}const aa=R;function ff(){try{for(const e of aa.document?.scripts||[]){const t=e?.src?String(e.src):"";if(ia.test(t))return t}}catch{}try{for(const e of aa.performance?.getEntriesByType?.("resource")||[]){const t=e?.name?String(e.name):"";if(ia.test(t))return t}}catch{}return null}function gf(e,t){const n=Math.max(e.lastIndexOf("const ",t),e.lastIndexOf("let ",t),e.lastIndexOf("var ",t));if(n<0)return null;const r=e.indexOf("=",n);if(r<0||r>t)return null;const o=e.indexOf("{",r);if(o<0||o>t)return null;let i=0,a="",s=false;for(let c=o;c<e.length;c++){const u=e[c];if(a){if(s){s=false;continue}if(u==="\\"){s=true;continue}u===a&&(a="");continue}if(u==='"'||u==="'"){a=u;continue}if(u==="{")i++;else if(u==="}"&&--i===0)return e.slice(o,c+1)}return null}function mf(e){const t={};let n=false;for(const r of af){const o=e?.[r];if(!o||typeof o!="object")continue;const i=o.iconSpriteKey||null,{iconSpriteKey:a,...s}=o;t[r]={weatherId:r,spriteId:i,...s},n=true;}return t.Sunny||(t.Sunny={weatherId:"Sunny",name:"Sunny",spriteId:"sprite/ui/SunnyIcon",type:"primary"}),!n||t.Rain&&t.Rain.mutator?.mutation!=="Wet"?null:t}async function hf(){if(oe.data.weather)return  true;const e=ff();if(!e)return  false;let t="";try{const s=await fetch(e,{credentials:"include"});if(!s.ok)return !1;t=await s.text();}catch{return  false}let n=t.indexOf("fixedTimeSlots:[0,48,96,144,192,240]");if(n<0&&(n=t.indexOf('name:"Amber Moon"')),n<0)return  false;const r=gf(t,n);if(!r)return  false;const o=r.replace(/\b[A-Za-z_$][\w$]*\.(Rain|Frost|Dawn|AmberMoon)\b/g,'"$1"');let i;try{i=Function('"use strict";return('+o+")")();}catch{return  false}const a=mf(i);return a?(oe.data.weather=a,true):false}function bf(){if(oe.weatherPollingTimer)return;oe.weatherPollAttempts=0;const e=setInterval(async()=>{(await hf()||++oe.weatherPollAttempts>df)&&(clearInterval(e),oe.weatherPollingTimer=null);},uf);oe.weatherPollingTimer=e;}function yf(){oe.weatherPollingTimer&&(clearInterval(oe.weatherPollingTimer),oe.weatherPollingTimer=null);}function vf(e){return String(e||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^A-Za-z0-9]/g,"").trim()}function xf(e,t=[]){const n=new Set,r=o=>{const i=String(o||"").trim();i&&n.add(i);};r(e);for(const o of t)r(o);for(const o of Array.from(n.values()))o.endsWith("s")?r(o.slice(0,-1)):r(`${o}s`),o.endsWith("es")&&r(o.slice(0,-2));return Array.from(n.values()).filter(Boolean)}function qs(e,t,n,r=[],o=[]){const i=window.Gemini?.Modules?.Sprite;if(!i)return null;const a=xf(e,r);if(!a.length)return null;const s=[t,...o].filter(d=>typeof d=="string"),c=d=>{const p=String(d||"").trim();if(!p)return null;for(const f of a)try{if(i.has(f,p))return i.getIdPath(f,p)}catch{}return null};for(const d of s){const p=c(d);if(p)return p}const u=vf(n||""),l=c(u||n||"");if(l)return l;try{for(const d of a){const p=i.listIds(`sprite/${d}/`),f=s.map(b=>String(b||"").toLowerCase()),m=String(n||u||"").toLowerCase();for(const b of p){const y=(b.split("/").pop()||"").toLowerCase();if(f.some(S=>S&&S===y)||y===m)return b}for(const b of p){const y=(b.split("/").pop()||"").toLowerCase();if(f.some(S=>S&&y.includes(S))||m&&y.includes(m))return b}}}catch{}return null}function $e(e,t,n,r,o=[],i=[]){if(!e||typeof e!="object")return;const a=e.tileRef;if(!a||typeof a!="object")return;const s=String(a.spritesheet||t||"").trim(),c=qs(s,n,r,o,i);if(c)try{e.spriteId=c;}catch{}const u=e.rotationVariants;if(u&&typeof u=="object")for(const l of Object.values(u))$e(l,s,n,r);if(e.immatureTileRef){const l={tileRef:e.immatureTileRef};$e(l,s,n,r),l.spriteId&&(e.immatureSpriteId=l.spriteId);}if(e.topmostLayerTileRef){const l={tileRef:e.topmostLayerTileRef};$e(l,s,n,r),l.spriteId&&(e.topmostLayerSpriteId=l.spriteId);}e.activeState&&typeof e.activeState=="object"&&$e(e.activeState,s,n,e.activeState?.name||r);}function wf(e,t,n,r=[]){if(!Array.isArray(t)||t.length===0)return null;const o=t[0],i=t.slice(1);return qs(e,o,n??null,r,i)}function kf(e){for(const[t,n]of Object.entries(e.items||{}))$e(n,"items",t,n?.name,["item"]);for(const[t,n]of Object.entries(e.decor||{}))$e(n,"decor",t,n?.name);for(const[t,n]of Object.entries(e.mutations||{})){$e(n,"mutations",t,n?.name,["mutation"]);const r=wf("mutation-overlay",[`${t}TallPlant`,`${t}TallPlantIcon`,t],n?.name,["mutation-overlay"]);if(r)try{n.overlaySpriteId=r;}catch{}}for(const[t,n]of Object.entries(e.eggs||{}))$e(n,"pets",t,n?.name,["pet"]);for(const[t,n]of Object.entries(e.pets||{}))$e(n,"pets",t,n?.name,["pet"]);for(const[t,n]of Object.entries(e.plants||{})){const r=n;r.seed&&$e(r.seed,r.seed?.tileRef?.spritesheet||"seeds",`${t}Seed`,r.seed?.name||`${t} Seed`,["seed","plant","plants"],[t]),r.plant&&$e(r.plant,r.plant?.tileRef?.spritesheet||"plants",`${t}Plant`,r.plant?.name||`${t} Plant`,["plant","plants","tallplants"],[t]),r.crop&&$e(r.crop,r.crop?.tileRef?.spritesheet||"plants",t,r.crop?.name||t,["plant","plants"],[`${t}Crop`]);}}function Sf(){try{kf(oe.data);}catch(e){try{console.warn("[MGData] sprite resolution failed",e);}catch{}}}const Xs=1e4,Js=50;function Qs(e){return new Promise(t=>setTimeout(t,e))}function Cf(e){return oe.data[e]}function Af(){return {...oe.data}}function Tf(e){return oe.data[e]!=null}async function If(e,t=Xs,n=Js){const r=Date.now();for(;Date.now()-r<t;){const o=oe.data[e];if(o!=null)return o;await Qs(n);}throw new Error(`MGData.waitFor: timeout waiting for "${e}"`)}async function Ef(e=Xs,t=Js){const n=Date.now();for(;Date.now()-n<e;){if(Object.values(oe.data).some(r=>r!=null))return {...oe.data};await Qs(t);}throw new Error("MGData.waitForAnyData: timeout")}const ue={async init(){Vs(),pf(),bf();},isReady:Mr,get:Cf,getAll:Af,has:Tf,waitFor:If,waitForAny:Ef,resolveSprites:Sf,cleanup(){Ks(),Ys(),yf();}},Pf={expanded:false,sort:{key:null,dir:null},search:""},Mf={categories:{}};async function Lf(){const e=await Or("tab-test",{version:2,defaults:Mf,sanitize:i=>({categories:i.categories&&typeof i.categories=="object"?i.categories:{}})});function t(i){return e.get().categories[i]||{...Pf}}function n(i,a){const s=e.get(),c=t(i);e.update({categories:{...s.categories,[i]:{...c,expanded:a}}});}function r(i,a,s){const c=e.get(),u=t(i);e.update({categories:{...c.categories,[i]:{...u,sort:{key:a,dir:s}}}});}function o(i,a){const s=e.get(),c=t(i);e.update({categories:{...s.categories,[i]:{...c,search:a}}});}return {get:e.get,set:e.set,save:e.save,getCategoryState:t,setCategoryExpanded:n,setCategorySort:r,setCategorySearch:o}}const _f={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function Kn(e){return e?_f[e]??0:0}class Ff extends Mt{constructor(){super({id:"tab-test",label:"Test"});Y(this,"stateCtrl",null);}async build(n){this.stateCtrl=await Lf();const r=this.createContainer("test-section");r.style.display="flex",r.style.flexDirection="column",r.style.gap="12px",n.appendChild(r),await this.buildSpriteTables(r);}renderSprite(n){const r=g("div",{style:"display:flex;align-items:center;justify-content:center;width:32px;height:32px;"});if(n.spriteId){const o=n.spriteId;requestAnimationFrame(()=>{try{const i=ne.toCanvas(o,{scale:1});i.style.maxWidth="32px",i.style.maxHeight="32px",i.style.objectFit="contain",r.appendChild(i);}catch{r.textContent="-";}});}else r.textContent="-";return r}renderRarity(n){if(!n.rarity){const o=g("span",{style:"opacity:0.5;"});return o.textContent="—",o}return di({variant:"rarity",rarity:n.rarity,size:"sm"}).root}createDataCard(n,r,o,i){const a=this.stateCtrl.getCategoryState(n),s=p=>{if(!p)return o;const f=p.toLowerCase();return o.filter(m=>m.name.toLowerCase().includes(f))},c=ps({columns:i,data:s(a.search),pageSize:0,compact:true,maxHeight:"calc(var(--lg-row-h, 40px) * 6)",getRowId:p=>p.spriteId,onSortChange:(p,f)=>{this.stateCtrl.setCategorySort(n,p,f);}});a.sort.key&&a.sort.dir&&c.sortBy(a.sort.key,a.sort.dir);const u=fs({placeholder:"Search...",value:a.search,debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:p=>{const f=p.trim();this.stateCtrl.setCategorySearch(n,f),c.setData(s(f));}}),l=g("div",{style:"margin-bottom:8px;"});l.appendChild(u.root);const d=g("div");return d.appendChild(l),d.appendChild(c.root),Te({title:r,subtitle:`${o.length} entries`,variant:"soft",padding:"sm",expandable:true,defaultExpanded:a.expanded,onExpandChange:p=>{this.stateCtrl.setCategoryExpanded(n,p);}},d)}formatCategoryName(n){return n.split("-").map(r=>r.charAt(0).toUpperCase()+r.slice(1)).join(" ")}findPlantBySprite(n,r){const o=ue.get("plants");if(!o)return null;for(const a of Object.values(o))if(a?.seed?.spriteId===n||a?.plant?.spriteId===n||a?.crop?.spriteId===n)return a;const i=r.toLowerCase();for(const a of Object.values(o)){const s=(a?.seed?.name||"").toLowerCase();if(s===i||s===`${i} seed`)return a}return null}findPetBySpriteId(n){const r=ue.get("pets");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}findItemBySpriteId(n){const r=ue.get("items");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}findDecorBySpriteId(n){const r=ue.get("decor");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}findEggBySpriteId(n){const r=ue.get("eggs");if(!r)return null;for(const o of Object.values(r))if(o?.spriteId===n)return o;return null}getRarityForSprite(n,r,o){const i=n.toLowerCase();if(i==="plant"||i==="seed"||i==="tallplant"){const a=this.findPlantBySprite(r,o);if(a?.seed?.rarity)return a.seed.rarity}if(i==="pet"){const a=this.findPetBySpriteId(r);if(a?.rarity)return a.rarity}if(i==="item"){const a=this.findItemBySpriteId(r);if(a?.rarity)return a.rarity}if(i==="decor"){const a=this.findDecorBySpriteId(r);if(a?.rarity)return a.rarity}if(i==="egg"){const a=this.findEggBySpriteId(r);if(a?.rarity)return a.rarity}return null}yieldToMain(n=0){return new Promise(r=>{n>0?setTimeout(r,n):typeof requestIdleCallback<"u"?requestIdleCallback(()=>r(),{timeout:50}):setTimeout(r,4);})}async buildSpriteTables(n){const r=[{key:"name",header:"Name",sortable:true,width:"1fr",sortFn:(i,a)=>i.name.localeCompare(a.name,void 0,{numeric:true,sensitivity:"base"})},{key:"rarity",header:"Rarity",sortable:true,width:"100px",align:"center",render:i=>this.renderRarity(i),sortFn:(i,a)=>Kn(i.rarity)-Kn(a.rarity)},{key:"sprite",header:"Sprite",width:"60px",align:"center",render:i=>this.renderSprite(i)}];if(!ne.isReady())try{await ne.init();}catch{return}const o=ne.getCategories();for(let i=0;i<o.length;i++){await this.yieldToMain(8);const a=o[i],c=ne.getCategoryId(a).map(u=>{const l=`sprite/${a}/${u}`;return {name:u,spriteId:l,rarity:this.getRarityForSprite(a,l,u)}});if(c.sort((u,l)=>Kn(u.rarity)-Kn(l.rarity)),c.length>0){const u=this.createDataCard(a,this.formatCategoryName(a),c,r);n.appendChild(u);}}}}function zt(e,t,n){if(e.querySelector(`style[data-style-id="${n}"]`))return;const r=document.createElement("style");r.setAttribute("data-style-id",n),r.textContent=t,e.appendChild(r);}const Zs=`
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
`,Rf={enabled:false,favoriteProduceList:[],favoritePetsList:[],favoriteMutations:[]};let kt=null;async function Of(){if(kt)return kt;kt=await Or("tab-auto-favorite",{version:1,defaults:Rf});const e=Ae(Re.AUTO_FAVORITE_UI,null);return e&&(await kt.set(e),Yc(Re.AUTO_FAVORITE_UI),console.log("[AutoFavoriteSettings] Migrated old storage to new state")),kt}function We(){if(!kt)throw new Error("[AutoFavoriteSettings] Section state not initialized. Call initSectionState() first.");return kt}const Nf=new Map;function $f(){return Nf}function Mo(){return R.jotaiAtomCache?.cache}function gt(e){const t=$f(),n=t.get(e);if(n)return n;const r=Mo();if(!r)return null;for(const o of r.values())if((o?.debugLabel||o?.label||"")===e)return t.set(e,o),o;return null}function Df(){const e=R;if(e.__REACT_DEVTOOLS_GLOBAL_HOOK__)return;const t=new Map,n=new Map;e.__REACT_DEVTOOLS_GLOBAL_HOOK__={renderers:t,supportsFiber:true,inject:r=>{const o=t.size+1;return t.set(o,r),n.set(o,new Set),o},onCommitFiberRoot:(r,o)=>{const i=n.get(r);i&&i.add(o);},onCommitFiberUnmount:()=>{},onPostCommitFiberRoot:()=>{},getFiberRoots:r=>n.get(r),checkDCE:()=>{},isDisabled:false};}const jf={baseStore:null,captureInProgress:false,captureError:null,lastCapturedVia:null,mirror:void 0};function Xt(){return jf}const zf="__JOTAI_STORE_READY__";let sa=false;const Lo=new Set;function Yn(){if(!sa){sa=true;for(const e of Lo)try{e();}catch{}try{const e=R.CustomEvent||CustomEvent;R.dispatchEvent?.(new e(zf));}catch{}}}function Bf(e){Lo.add(e);const t=Fo();if(t.via&&!t.polyfill)try{e();}catch{}return ()=>{Lo.delete(e);}}async function Gf(e={}){const{timeoutMs:t=6e3,intervalMs:n=50}=e,r=Fo();if(!(r.via&&!r.polyfill))return new Promise((o,i)=>{let a=false;const s=Bf(()=>{a||(a=true,s(),o());}),c=Date.now();(async()=>{for(;!a&&Date.now()-c<t;){const l=Fo();if(l.via&&!l.polyfill){if(a)return;a=true,s(),o();return}await En(n);}a||(a=true,s(),i(new Error("Store not captured within timeout")));})();})}const En=e=>new Promise(t=>setTimeout(t,e));function el(){try{const e=R.Event||Event;R.dispatchEvent?.(new e("visibilitychange"));}catch{}}function _o(e){return e&&typeof e=="object"&&typeof e.get=="function"&&typeof e.set=="function"&&typeof e.sub=="function"}function no(e,t=0,n=new WeakSet){if(t>3||!e||typeof e!="object"||n.has(e))return null;try{n.add(e);}catch{return null}if(_o(e))return e;const r=["store","value","current","state","s","baseStore"];for(const o of r)try{const i=e[o];if(_o(i))return i}catch{}return null}function tl(){const e=Xt(),t=R.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t?.renderers?.size)return null;let n=0;for(const[r]of t.renderers){const o=t.getFiberRoots?.(r);o&&(n+=o.size||0);}if(n===0)return null;for(const[r]of t.renderers){const o=t.getFiberRoots?.(r);if(o)for(const i of o){const a=new Set,s=[i.current];for(;s.length;){const c=s.pop();if(!(!c||a.has(c))){a.add(c);try{const u=c?.pendingProps?.value;if(_o(u))return e.lastCapturedVia="fiber",u}catch{}try{let u=c?.memoizedState,l=0;for(;u&&l<15;){l++;const d=no(u);if(d)return e.lastCapturedVia="fiber",d;const p=no(u.memoizedState);if(p)return e.lastCapturedVia="fiber",p;u=u.next;}}catch{}try{if(c?.stateNode){const u=no(c.stateNode);if(u)return e.lastCapturedVia="fiber",u}}catch{}c.child&&s.push(c.child),c.sibling&&s.push(c.sibling),c.alternate&&s.push(c.alternate);}}}}return null}function nl(){return {get:()=>{throw new Error("Store not captured: get unavailable")},set:()=>{throw new Error("Store not captured: set unavailable")},sub:()=>()=>{},__polyfill:true}}async function Wf(e=5e3){const t=Date.now();let n=Mo();for(;!n&&Date.now()-t<e;)await En(100),n=Mo();if(!n)throw new Error("jotaiAtomCache.cache not found");const r=Xt();let o=null,i=null;const a=[],s=()=>{for(const u of a)try{u.__origWrite&&(u.write=u.__origWrite,delete u.__origWrite);}catch{}};for(const u of n.values()){if(!u||typeof u.write!="function"||u.__origWrite)continue;const l=u.write;u.__origWrite=l,u.write=function(d,p,...f){return i||(o=d,i=p,s()),l.call(this,d,p,...f)},a.push(u);}el();const c=Date.now();for(;!i&&Date.now()-c<e;)await En(50);return i?(r.lastCapturedVia="write",{get:u=>o(u),set:(u,l)=>i(u,l),sub:(u,l)=>{let d;try{d=o(u);}catch{}const p=setInterval(()=>{let f;try{f=o(u);}catch{return}if(f!==d){d=f;try{l();}catch{}}},100);return ()=>clearInterval(p)}}):(s(),r.lastCapturedVia="polyfill",nl())}async function Hf(e=1e4){const t=Xt();el();const n=Date.now();for(;Date.now()-n<e;){const r=tl();if(r)return r;await En(50);}return t.lastCapturedVia="polyfill",nl()}async function vi(){const e=Xt();if(e.baseStore&&!e.baseStore.__polyfill)return Yn(),e.baseStore;if(e.captureInProgress){const t=Date.now(),n=2500;for(;!e.baseStore&&Date.now()-t<n;)await En(25);if(e.baseStore)return e.baseStore.__polyfill||Yn(),e.baseStore}e.captureInProgress=true;try{const t=tl();if(t)return e.baseStore=t,Yn(),t;try{const r=await Wf(5e3);return e.baseStore=r,r.__polyfill||Yn(),r}catch(r){e.captureError=r;}const n=await Hf();return e.baseStore=n,n}catch(t){throw e.captureError=t,t}finally{e.captureInProgress=false;}}function Fo(){const e=Xt();return {via:e.lastCapturedVia,polyfill:!!e.baseStore?.__polyfill,error:e.captureError}}async function Uf(){const e=await vi(),t=new WeakMap,n=async o=>{let i=t.get(o);if(i)return i;i={last:void 0,has:false,subs:new Set},t.set(o,i);try{i.last=e.get(o),i.has=!0;}catch{}const a=e.sub(o,()=>{let s;try{s=e.get(o);}catch{return}const c=i.last,u=!Object.is(s,c)||!i.has;if(i.last=s,i.has=true,u)for(const l of i.subs)try{l(s,c);}catch{}});return i.unsubUpstream=a,i};return {async get(o){const i=await n(o);if(i.has)return i.last;const a=e.get(o);return i.last=a,i.has=true,a},async set(o,i){await e.set(o,i);const a=await n(o);a.last=i,a.has=true;},async sub(o,i){const a=await n(o);if(a.subs.add(i),a.has)try{i(a.last,a.last);}catch{}return ()=>{a.subs.delete(i);}},getShadow(o){return t.get(o)?.last},hasShadow(o){return !!t.get(o)?.has},async ensureWatch(o){await n(o);},async asStore(){return {get:o=>this.get(o),set:(o,i)=>this.set(o,i),sub:(o,i)=>{let a=null;return this.sub(o,()=>i()).then(s=>a=s),()=>a?.()}}}}}async function hr(){const e=Xt();return e.mirror||(e.mirror=await Uf()),e.mirror}const pe={async select(e){const t=await hr(),n=gt(e);if(!n)throw new Error(`[Store] Atom not found: "${e}"`);return t.get(n)},async set(e,t){const n=await hr(),r=gt(e);if(!r)throw new Error(`[Store] Atom not found: "${e}"`);await n.set(r,t);},async subscribe(e,t){const n=await hr(),r=gt(e);if(!r)throw new Error(`[Store] Atom not found: "${e}"`);return n.sub(r,o=>{try{t(o);}catch{}})},async subscribeImmediate(e,t){const n=await pe.select(e);try{t(n);}catch{}return pe.subscribe(e,t)}};async function Vf(){await hr();}function xi(e){return e?Array.isArray(e)?e.slice():e.split(".").map(t=>t.match(/^\d+$/)?Number(t):t):[]}function Pn(e,t){const n=xi(t);let r=e;for(const o of n){if(r==null)return;r=r[o];}return r}function Kf(e,t,n){const r=xi(t);if(!r.length)return n;const o=Array.isArray(e)?[...e]:{...e??{}};let i=o;for(let a=0;a<r.length-1;a++){const s=r[a],c=i[s],u=typeof c=="object"&&c!==null?Array.isArray(c)?[...c]:{...c}:{};i[s]=u,i=u;}return i[r[r.length-1]]=n,o}function la(e,t){const n={};for(const r of t)n[r]=r.includes(".")?Pn(e,r):e?.[r];try{return JSON.stringify(n)}catch{return String(n)}}function Yf(e,t,n){const r=n.mode??"auto";function o(u){const l=t?Pn(u,t):u,d=new Map;if(l==null)return {signatures:d,keys:[]};const p=Array.isArray(l);if((r==="array"||r==="auto"&&p)&&p)for(let m=0;m<l.length;m++){const b=l[m],h=n.key?n.key(b,m,u):m,y=n.sig?n.sig(b,m,u):n.fields?la(b,n.fields):JSON.stringify(b);d.set(h,y);}else for(const[m,b]of Object.entries(l)){const h=n.key?n.key(b,m,u):m,y=n.sig?n.sig(b,m,u):n.fields?la(b,n.fields):JSON.stringify(b);d.set(h,y);}return {signatures:d,keys:Array.from(d.keys())}}function i(u,l){if(u===l)return  true;if(!u||!l||u.size!==l.size)return  false;for(const[d,p]of u)if(l.get(d)!==p)return  false;return  true}async function a(u){let l=null;return pe.subscribeImmediate(e,d=>{const p=t?Pn(d,t):d,{signatures:f}=o(p);if(!i(l,f)){const m=new Set([...l?Array.from(l.keys()):[],...Array.from(f.keys())]),b=[];for(const h of m){const y=l?.get(h)??"__NONE__",S=f.get(h)??"__NONE__";y!==S&&b.push(h);}l=f,u({value:p,changedKeys:b});}})}async function s(u,l){return a(({value:d,changedKeys:p})=>{p.includes(u)&&l({value:d});})}async function c(u,l){const d=new Set(u);return a(({value:p,changedKeys:f})=>{const m=f.filter(b=>d.has(b));m.length&&l({value:p,changedKeys:m});})}return {sub:a,subKey:s,subKeys:c}}const Bt=new Map;function qf(e,t){const n=Bt.get(e);if(n)try{n();}catch{}return Bt.set(e,t),()=>{try{t();}catch{}Bt.get(e)===t&&Bt.delete(e);}}function me(e,t={}){const{path:n,write:r="replace"}=t,o=n?`${e}:${xi(n).join(".")}`:e;async function i(){const d=await pe.select(e);return n?Pn(d,n):d}async function a(d){if(typeof r=="function"){const m=await pe.select(e),b=r(d,m);return pe.set(e,b)}const p=await pe.select(e),f=n?Kf(p,n,d):d;return r==="merge-shallow"&&!n&&p&&typeof p=="object"&&typeof d=="object"?pe.set(e,{...p,...d}):pe.set(e,f)}async function s(d){const p=await i(),f=d(p);return await a(f),f}async function c(d,p,f){let m;const b=y=>{const S=n?Pn(y,n):y;if(typeof m>"u"||!f(m,S)){const v=m;m=S,p(S,v);}},h=d?await pe.subscribeImmediate(e,b):await pe.subscribe(e,b);return qf(o,h)}function u(){const d=Bt.get(o);if(d){try{d();}catch{}Bt.delete(o);}}function l(d){return Yf(e,d?.path??n,d)}return {label:o,get:i,set:a,update:s,onChange:(d,p=Object.is)=>c(false,d,p),onChangeNow:(d,p=Object.is)=>c(true,d,p),asSignature:l,stopOnChange:u}}function I(e){return me(e)}I("positionAtom");I("lastPositionInMyGardenAtom");I("playerDirectionAtom");I("stateAtom");I("quinoaDataAtom");I("currentTimeAtom");I("actionAtom");I("isPressAndHoldActionAtom");I("mapAtom");I("tileSizeAtom");me("mapAtom",{path:"cols"});me("mapAtom",{path:"rows"});me("mapAtom",{path:"spawnTiles"});me("mapAtom",{path:"locations.seedShop.spawnTileIdx"});me("mapAtom",{path:"locations.eggShop.spawnTileIdx"});me("mapAtom",{path:"locations.toolShop.spawnTileIdx"});me("mapAtom",{path:"locations.decorShop.spawnTileIdx"});me("mapAtom",{path:"locations.sellCropsShop.spawnTileIdx"});me("mapAtom",{path:"locations.sellPetShop.spawnTileIdx"});me("mapAtom",{path:"locations.collectorsClub.spawnTileIdx"});me("mapAtom",{path:"locations.wishingWell.spawnTileIdx"});me("mapAtom",{path:"locations.shopsCenter.spawnTileIdx"});I("playerAtom");I("myDataAtom");I("myUserSlotIdxAtom");I("isSpectatingAtom");I("myCoinsCountAtom");I("numPlayersAtom");me("playerAtom",{path:"id"});I("userSlotsAtom");I("filteredUserSlotsAtom");I("myUserSlotAtom");I("spectatorsAtom");me("stateAtom",{path:"child"});me("stateAtom",{path:"child.data"});me("stateAtom",{path:"child.data.shops"});const Xf=me("stateAtom",{path:"child.data.userSlots"}),Jf=me("stateAtom",{path:"data.players"}),Qf=me("stateAtom",{path:"data.hostPlayerId"});I("myInventoryAtom");I("myInventoryItemsAtom");I("isMyInventoryAtMaxLengthAtom");I("myFavoritedItemIdsAtom");I("myCropInventoryAtom");I("mySeedInventoryAtom");I("myToolInventoryAtom");I("myEggInventoryAtom");I("myDecorInventoryAtom");I("myPetInventoryAtom");me("myInventoryAtom",{path:"favoritedItemIds"});I("itemTypeFiltersAtom");I("myItemStoragesAtom");I("myPetHutchStoragesAtom");I("myPetHutchItemsAtom");I("myPetHutchPetItemsAtom");I("myNumPetHutchItemsAtom");I("myValidatedSelectedItemIndexAtom");I("isSelectedItemAtomSuspended");I("mySelectedItemAtom");I("mySelectedItemNameAtom");I("mySelectedItemRotationsAtom");I("mySelectedItemRotationAtom");I("setSelectedIndexToEndAtom");I("myPossiblyNoLongerValidSelectedItemIndexAtom");I("myCurrentGlobalTileIndexAtom");I("myCurrentGardenTileAtom");I("myCurrentGardenObjectAtom");I("myOwnCurrentGardenObjectAtom");I("myOwnCurrentDirtTileIndexAtom");I("myCurrentGardenObjectNameAtom");I("isInMyGardenAtom");I("myGardenBoardwalkTileObjectsAtom");const Zf=me("myDataAtom",{path:"garden"});me("myDataAtom",{path:"garden.tileObjects"});me("myOwnCurrentGardenObjectAtom",{path:"objectType"});I("myCurrentStablePlantObjectInfoAtom");I("myCurrentSortedGrowSlotIndicesAtom");I("myCurrentGrowSlotIndexAtom");I("myCurrentGrowSlotsAtom");I("myCurrentGrowSlotAtom");I("secondsUntilCurrentGrowSlotMaturesAtom");I("isCurrentGrowSlotMatureAtom");I("numGrowSlotsAtom");I("myCurrentEggAtom");I("petInfosAtom");I("myPetInfosAtom");I("myPetSlotInfosAtom");I("myPrimitivePetSlotsAtom");I("myNonPrimitivePetSlotsAtom");I("expandedPetSlotIdAtom");I("myPetsProgressAtom");I("myActiveCropMutationPetsAtom");I("totalPetSellPriceAtom");I("selectedPetHasNewVariantsAtom");const eg=I("shopsAtom"),tg=I("myShopPurchasesAtom");I("seedShopAtom");I("seedShopInventoryAtom");I("seedShopRestockSecondsAtom");I("seedShopCustomRestockInventoryAtom");I("eggShopAtom");I("eggShopInventoryAtom");I("eggShopRestockSecondsAtom");I("eggShopCustomRestockInventoryAtom");I("toolShopAtom");I("toolShopInventoryAtom");I("toolShopRestockSecondsAtom");I("toolShopCustomRestockInventoryAtom");I("decorShopAtom");I("decorShopInventoryAtom");I("decorShopRestockSecondsAtom");I("decorShopCustomRestockInventoryAtom");I("isDecorShopAboutToRestockAtom");me("shopsAtom",{path:"seed"});me("shopsAtom",{path:"tool"});me("shopsAtom",{path:"egg"});me("shopsAtom",{path:"decor"});I("myCropItemsAtom");I("myCropItemsToSellAtom");I("totalCropSellPriceAtom");I("friendBonusMultiplierAtom");I("myJournalAtom");I("myCropJournalAtom");I("myPetJournalAtom");I("myStatsAtom");I("myActivityLogsAtom");I("newLogsAtom");I("hasNewLogsAtom");I("newCropLogsFromSellingAtom");I("hasNewCropLogsFromSellingAtom");I("myCompletedTasksAtom");I("myActiveTasksAtom");I("isWelcomeToastVisibleAtom");I("shouldCloseWelcomeToastAtom");I("isInitialMoveToDirtPatchToastVisibleAtom");I("isFirstPlantSeedActiveAtom");I("isThirdSeedPlantActiveAtom");I("isThirdSeedPlantCompletedAtom");I("isDemoTouchpadVisibleAtom");I("areShopAnnouncersEnabledAtom");I("arePresentablesEnabledAtom");I("isEmptyDirtTileHighlightedAtom");I("isPlantTileHighlightedAtom");I("isItemHiglightedInHotbarAtom");I("isItemHighlightedInModalAtom");I("isMyGardenButtonHighlightedAtom");I("isSellButtonHighlightedAtom");I("isShopButtonHighlightedAtom");I("isInstaGrowButtonHiddenAtom");I("isActionButtonHighlightedAtom");I("isGardenItemInfoCardHiddenAtom");I("isSeedPurchaseButtonHighlightedAtom");I("isFirstSeedPurchaseActiveAtom");I("isFirstCropHarvestActiveAtom");I("isWeatherStatusHighlightedAtom");const ng=I("weatherAtom"),wi=I("activeModalAtom");I("hotkeyBeingPressedAtom");I("avatarTriggerAnimationAtom");I("avatarDataAtom");I("emoteDataAtom");I("otherUserSlotsAtom");I("otherPlayerPositionsAtom");I("otherPlayerSelectedItemsAtom");I("otherPlayerLastActionsAtom");I("traderBunnyPlayerId");I("npcPlayersAtom");I("npcQuinoaUsersAtom");I("numNpcAvatarsAtom");I("traderBunnyEmoteTimeoutAtom");I("traderBunnyEmoteAtom");I("unsortedLeaderboardAtom");I("currentGardenNameAtom");I("quinoaEngineAtom");I("quinoaInitializationErrorAtom");I("avgPingAtom");I("serverClientTimeOffsetAtom");I("isEstablishingShotRunningAtom");I("isEstablishingShotCompleteAtom");const se={initialized:false,activeModal:null,isCustom:false,shadow:null,patchedAtoms:new Set,originalReads:new Map,unsubscribes:[],listeners:{onOpen:new Set,onClose:new Set}};function Br(){return se}function rg(){return se.initialized}function _t(){return se.isCustom&&se.activeModal!==null}function It(){return se.activeModal}function rl(e){return !se.shadow||se.shadow.modal!==e?null:se.shadow.data}function og(e){se.initialized=e;}function ki(e){se.activeModal=e;}function Si(e){se.isCustom=e;}function ol(e,t){se.shadow={modal:e,data:t,timestamp:Date.now()};}function il(){se.shadow=null;}function ca(e,t){se.patchedAtoms.add(e),se.originalReads.set(e,t);}function ig(e){return se.originalReads.get(e)}function Ro(e){return se.patchedAtoms.has(e)}function ag(e){se.patchedAtoms.delete(e),se.originalReads.delete(e);}function sg(e){se.unsubscribes.push(e);}function lg(){for(const e of se.unsubscribes)try{e();}catch{}se.unsubscribes.length=0;}function cg(e){return se.listeners.onOpen.add(e),()=>se.listeners.onOpen.delete(e)}function al(e){return se.listeners.onClose.add(e),()=>se.listeners.onClose.delete(e)}function sl(e){for(const t of Array.from(se.listeners.onOpen))try{t(e);}catch{}}function Ci(e){for(const t of Array.from(se.listeners.onClose))try{t(e);}catch{}}function dg(){lg(),se.initialized=false,se.activeModal=null,se.isCustom=false,se.shadow=null,se.patchedAtoms.clear(),se.originalReads.clear(),se.listeners.onOpen.clear(),se.listeners.onClose.clear();}const Ai={inventory:{atoms:[{atomLabel:"myInventoryAtom",dataKey:"_full",transform:e=>{const t=e;return {items:t.items??[],storages:t.storages??[],favoritedItemIds:t.favoritedItemIds??[]}}}],derivedAtoms:[{atomLabel:"myCropInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Produce"):[]},{atomLabel:"mySeedInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Seed"):[]},{atomLabel:"myToolInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Tool"):[]},{atomLabel:"myEggInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Egg"):[]},{atomLabel:"myDecorInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Decor"):[]},{atomLabel:"myPetInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Pet"):[]}]},journal:{atoms:[{atomLabel:"myJournalAtom",dataKey:"_full"}],derivedAtoms:[{atomLabel:"myCropJournalAtom",sourceKey:"produce",deriveFn:e=>e??{}},{atomLabel:"myPetJournalAtom",sourceKey:"pets",deriveFn:e=>e??{}}]},stats:{atoms:[{atomLabel:"myStatsAtom",dataKey:"_full"}]},activityLog:{atoms:[{atomLabel:"myActivityLogsAtom",dataKey:"logs"}]},seedShop:{atoms:[{atomLabel:"seedShopInventoryAtom",dataKey:"inventory"},{atomLabel:"seedShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},eggShop:{atoms:[{atomLabel:"eggShopInventoryAtom",dataKey:"inventory"},{atomLabel:"eggShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},toolShop:{atoms:[{atomLabel:"toolShopInventoryAtom",dataKey:"inventory"},{atomLabel:"toolShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},decorShop:{atoms:[{atomLabel:"decorShopInventoryAtom",dataKey:"inventory"},{atomLabel:"decorShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},leaderboard:{atoms:[{atomLabel:"unsortedLeaderboardAtom",dataKey:"entries"}]},petHutch:{atoms:[{atomLabel:"myPetHutchItemsAtom",dataKey:"items"},{atomLabel:"myPetHutchPetItemsAtom",dataKey:"petItems"}]}};function ll(e){return Ai[e]}function ug(e){const t=Ai[e],n=[];for(const r of t.atoms)n.push(r.atomLabel);if(t.derivedAtoms)for(const r of t.derivedAtoms)n.push(r.atomLabel);return n}const pg=new Set(["inventory","journal","stats","activityLog","petHutch"]),fg=new Set(["seedShop","eggShop","toolShop","decorShop"]),gg=new Set(["leaderboard"]);function mg(e,t,n,r){return function(i){const a=_t(),s=It();if(a&&s===r){const c=rl(r);if(c!==null){let u;if(n.dataKey==="_full"?u=c:u=c[n.dataKey],u!==void 0)return t(i),n.transform?n.transform(u):u}}return t(i)}}function hg(e,t,n,r,o){return function(a){if(_t()&&It()===o){const s=rl(o);if(s!==null){const c=s[n];if(c!==void 0)return t(a),r(c)}}return t(a)}}function bg(e){const t=ll(e);for(const n of t.atoms){const r=gt(n.atomLabel);if(!r||Ro(n.atomLabel))continue;const o=r.read;if(typeof o!="function")continue;const i=mg(n.atomLabel,o,n,e);r.read=i,ca(n.atomLabel,o);}if(t.derivedAtoms)for(const n of t.derivedAtoms){const r=gt(n.atomLabel);if(!r||Ro(n.atomLabel))continue;const o=r.read;if(typeof o!="function")continue;const i=hg(n.atomLabel,o,n.sourceKey,n.deriveFn,e);r.read=i,ca(n.atomLabel,o);}}async function Gr(e){const t=ll(e);for(const r of t.atoms)da(r.atomLabel);if(t.derivedAtoms)for(const r of t.derivedAtoms)da(r.atomLabel);const n=await vi();await cl(n,e);}async function yg(e){const t=await vi();await cl(t,e);const n=ug(e);for(const r of n){const o=gt(r);if(o)try{t.get(o);}catch{}}}function da(e){if(!Ro(e))return;const t=gt(e),n=ig(e);t&&n&&(t.read=n),ag(e);}async function cl(e,t){const n=pg.has(t),r=fg.has(t),o=gg.has(t);if(!n&&!r&&!o)return;const i=gt("stateAtom");if(i)try{const a=e.get(i);if(!a||typeof a!="object")return;let s=null;if(n||r){const c=a.child,u=c?.data;if(c&&u&&typeof u=="object"){let l=null;if(n&&Array.isArray(u.userSlots)){const d=u.userSlots.map(p=>{if(!p||typeof p!="object")return p;const f=p,m=f.data,b=m&&typeof m=="object"?{...m}:m;return {...f,data:b}});l={...l??u,userSlots:d};}if(r&&u.shops&&typeof u.shops=="object"&&(l={...l??u,shops:{...u.shops}}),l){const d={...c,data:l};s={...a,child:d};}}}if(o){const c=a.data;if(c&&Array.isArray(c.players)){const u={...c,players:[...c.players]};s={...s??a,data:u};}}if(!s)return;await e.set(i,s);}catch{}}async function vg(){for(const e of Object.keys(Ai))await Gr(e);}let qn=null,mn=null;async function xg(){if(Br().initialized)return;mn=await pe.select("activeModalAtom"),qn=setInterval(async()=>{try{const n=await pe.select("activeModalAtom"),r=mn;r!==n&&(mn=n,wg(n,r));}catch{}},50),sg(()=>{qn&&(clearInterval(qn),qn=null);}),og(true);}function wg(e,t){const n=_t(),r=It();e===null&&t!==null&&(n&&r===t?kg("native"):n||Ci({modal:t,wasCustom:false,closedBy:"native"})),e!==null&&!n&&sl({modal:e,isCustom:false});}async function kg(e){const t=It();t&&(il(),Si(false),ki(null),await Gr(t),Ci({modal:t,wasCustom:true,closedBy:e}));}async function Sg(e,t){if(!Br().initialized)throw new Error("[MGCustomModal] Not initialized. Call init() first.");_t()&&await dl(),ol(e,t),Si(true),ki(e),bg(e),await yg(e),await wi.set(e),mn=e,sl({modal:e,isCustom:true});}function Cg(e,t){const n=Br();if(!n.isCustom||n.activeModal!==e||!n.shadow)return;const o={...n.shadow.data,...t};ol(e,o);}async function dl(){const e=Br();if(!e.isCustom||!e.activeModal)return;const t=e.activeModal;il(),Si(false),ki(null),await wi.set(null),mn=null,await Gr(t),Ci({modal:t,wasCustom:true,closedBy:"api"});}function Ag(){return new Promise(e=>{if(!_t()){e();return}const t=al(()=>{t(),e();});})}async function Tg(){if(_t()){const e=It();e&&await Gr(e);}await vg(),dg();}const hn={async init(){return xg()},isReady(){return rg()},async show(e,t){return Sg(e,t)},update(e,t){return Cg(e,t)},async close(){return dl()},isOpen(){return It()!==null},isCustomOpen(){return _t()},getActiveModal(){return It()},waitForClose(){return Ag()},onOpen(e){return cg(e)},onClose(e){return al(e)},async destroy(){return Tg()}};function Ig(){return {ready:false,xform:null,xformAt:0}}const Be=Ig();function ul(){return Be.ready}function Jt(e){try{if(typeof structuredClone=="function")return structuredClone(e)}catch{}try{return JSON.parse(JSON.stringify(e))}catch{}return e}function Rn(){return Ke.tos()}function Ti(){return Ke.engine()}function Eg(){const e=Rn()?.map?.cols;return Number.isFinite(e)&&e>0?e:null}function Ii(e,t){const n=Eg();return n?t*n+e|0:null}let Xn=null;async function Pg(e=15e3){return Be.ready?true:Xn||(Xn=(async()=>{if(await Ke.init(e),!Rn())throw new Error("MGTile: engine captured but tileObject system not found");return Be.ready=true,true})(),Xn)}function At(e,t,n=true){const r=Rn(),o=Ii(e,t);if(!r||o==null)return {gidx:null,tv:null};let i=r.tileViews?.get?.(o)||null;if(!i&&n&&typeof r.getOrCreateTileView=="function")try{i=r.getOrCreateTileView(o);}catch{}return {gidx:o,tv:i||null}}function ro(e,t){if("startTime"in t&&(e.startTime=Number(t.startTime)),"endTime"in t&&(e.endTime=Number(t.endTime)),"targetScale"in t&&(e.targetScale=Number(t.targetScale)),"mutations"in t){if(!Array.isArray(t.mutations))throw new Error("MGTile: mutations must be an array of strings");e.mutations=t.mutations.slice();}}function Ei(e,t){if(!e)throw new Error("MGTile: no tileObject on this tile");if(e.objectType!==t)throw new Error(`MGTile: expected objectType "${t}", got "${e.objectType}"`)}function Gt(e,t,n,r={}){const o=r.ensureView!==false,i=r.forceUpdate!==false,a=Ti(),{gidx:s,tv:c}=At(Number(e),Number(t),o);if(s==null)throw new Error("MGTile: cols unavailable (engine/TOS not ready)");if(!c)throw new Error("MGTile: TileView unavailable (not instantiated)");const u=c.tileObject;if(typeof c.onDataChanged!="function")throw new Error("MGTile: tileView.onDataChanged not found (different API?)");if(c.onDataChanged(n),i&&a?.reusableContext&&typeof c.update=="function")try{c.update(a.reusableContext);}catch{}return {ok:true,tx:Number(e),ty:Number(t),gidx:s,before:u,after:c.tileObject}}function Wr(e,t,n={}){const r=n.ensureView!==false,o=n.clone!==false,{gidx:i,tv:a}=At(Number(e),Number(t),r);if(i==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!a)return {tx:Number(e),ty:Number(t),gidx:i,tileView:null,tileObject:void 0};const s=a.tileObject;return {tx:Number(e),ty:Number(t),gidx:i,tileView:a,tileObject:o?Jt(s):s}}function Mg(e,t,n={}){return Gt(e,t,null,n)}function Lg(e,t,n,r={}){const i=Wr(e,t,{...r,clone:false}).tileView?.tileObject;Ei(i,"plant");const a=Jt(i);if(Array.isArray(a.slots)||(a.slots=[]),"plantedAt"in n&&(a.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(a.maturedAt=Number(n.maturedAt)),"species"in n&&(a.species=String(n.species)),"slotIdx"in n&&"slotPatch"in n){const s=Number(n.slotIdx)|0;if(!a.slots[s])throw new Error(`MGTile: plant slot ${s} doesn't exist`);return ro(a.slots[s],n.slotPatch),Gt(e,t,a,r)}if("slots"in n){const s=n.slots;if(Array.isArray(s)){for(let c=0;c<s.length;c++)if(s[c]!=null){if(!a.slots[c])throw new Error(`MGTile: plant slot ${c} doesn't exist`);ro(a.slots[c],s[c]);}}else if(s&&typeof s=="object")for(const c of Object.keys(s)){const u=Number(c)|0;if(Number.isFinite(u)){if(!a.slots[u])throw new Error(`MGTile: plant slot ${u} doesn't exist`);ro(a.slots[u],s[u]);}}else throw new Error("MGTile: patch.slots must be array or object map");return Gt(e,t,a,r)}return Gt(e,t,a,r)}function _g(e,t,n,r={}){const i=Wr(e,t,{...r,clone:false}).tileView?.tileObject;Ei(i,"decor");const a=Jt(i);return "rotation"in n&&(a.rotation=Number(n.rotation)),Gt(e,t,a,r)}function Fg(e,t,n,r={}){const i=Wr(e,t,{...r,clone:false}).tileView?.tileObject;Ei(i,"egg");const a=Jt(i);return "plantedAt"in n&&(a.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(a.maturedAt=Number(n.maturedAt)),Gt(e,t,a,r)}function Rg(e,t,n,r={}){const o=r.ensureView!==false,i=r.forceUpdate!==false,a=Ti(),{gidx:s,tv:c}=At(Number(e),Number(t),o);if(s==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!c)throw new Error("MGTile: TileView unavailable");const u=c.tileObject,l=typeof n=="function"?n(Jt(u)):n;if(c.onDataChanged(l),i&&a?.reusableContext&&typeof c.update=="function")try{c.update(a.reusableContext);}catch{}return {ok:true,tx:Number(e),ty:Number(t),gidx:s,before:u,after:c.tileObject}}function Og(e,t,n={}){const r=n.ensureView!==false,{gidx:o,tv:i}=At(Number(e),Number(t),r);if(o==null)throw new Error("MGTile: cols unavailable");if(!i)return {ok:true,tx:Number(e),ty:Number(t),gidx:o,tv:null,tileObject:void 0};const a=n.clone!==false,s=i.tileObject;return {ok:true,tx:Number(e),ty:Number(t),gidx:o,objectType:s?.objectType??null,tileObject:a?Jt(s):s,tvKeys:Object.keys(i||{}).sort(),tileView:i}}function oo(e){if(!e)return null;const t=o=>o&&(typeof o.getGlobalPosition=="function"||typeof o.toGlobal=="function"),n=["container","root","view","tile","ground","base","floor","bg","background","baseSprite","tileSprite","displayObject","gfx","graphics","sprite"];for(const o of n)if(t(e[o]))return e[o];if(t(e))return e;const r=[e.container,e.root,e.view,e.displayObject,e.tileSprite,e.gfx,e.graphics,e.sprite];for(const o of r)if(t(o))return o;try{for(const o of Object.keys(e))if(t(e[o]))return e[o]}catch{}return null}function br(e){const t=Xe(()=>e?.getGlobalPosition?.());if(t&&Number.isFinite(t.x)&&Number.isFinite(t.y))return {x:t.x,y:t.y};const n=Xe(()=>e?.toGlobal?.({x:0,y:0}));return n&&Number.isFinite(n.x)&&Number.isFinite(n.y)?{x:n.x,y:n.y}:null}function Ng(e){try{if(!e?.getBounds)return "center";const t=e.getBounds(),n=br(e);if(!n||!t||!Number.isFinite(t.width)||!Number.isFinite(t.height))return "center";const r=t.x+t.width/2,o=t.y+t.height/2;return Math.hypot(n.x-r,n.y-o)<Math.hypot(n.x-t.x,n.y-t.y)?"center":"topleft"}catch{return "center"}}function $g(){const e=Rn(),t=e?.map?.cols,n=e?.map?.rows;if(!e||!Number.isFinite(t)||t<=1)return null;const r=Number.isFinite(n)&&n>1?n:null,o=[[0,0],[1,1],[Math.min(2,t-2),0],[0,1]];r&&r>2&&o.push([Math.floor(t/2),Math.floor(r/2)]);for(const[i,a]of o){if(i<0||a<0||i>=t||r&&a>=r)continue;const s=At(i,a,true).tv,c=i+1<t?At(i+1,a,true).tv:null,u=At(i,a+1,true).tv,l=oo(s),d=oo(c),p=oo(u);if(!l||!d||!p)continue;const f=br(l),m=br(d),b=br(p);if(!f||!m||!b)continue;const h={x:m.x-f.x,y:m.y-f.y},y={x:b.x-f.x,y:b.y-f.y},S=h.x*y.y-h.y*y.x;if(!Number.isFinite(S)||Math.abs(S)<1e-6)continue;const v=1/S,k={a:y.y*v,b:-y.x*v,c:-h.y*v,d:h.x*v},A={x:f.x-i*h.x-a*y.x,y:f.y-i*h.y-a*y.y},x=Ng(l),C=x==="center"?A:{x:A.x+.5*(h.x+y.x),y:A.y+.5*(h.y+y.y)};return {ok:true,cols:t,rows:r,vx:h,vy:y,inv:k,anchorMode:x,originCenter:C}}return null}function pl(){return Be.xform=$g(),Be.xformAt=Date.now(),{ok:!!Be.xform?.ok,xform:Be.xform}}function Dg(e,t={}){if(!e||!Number.isFinite(e.x)||!Number.isFinite(e.y))return null;const n=Number.isFinite(t.maxAgeMs)?Number(t.maxAgeMs):1500;(!Be.xform?.ok||t.forceRebuild||Date.now()-Be.xformAt>n)&&pl();const r=Be.xform;if(!r?.ok)return null;const o=e.x-r.originCenter.x,i=e.y-r.originCenter.y,a=r.inv.a*o+r.inv.b*i,s=r.inv.c*o+r.inv.d*i,c=Math.floor(a),u=Math.floor(s),l=[[c,u],[c+1,u],[c,u+1],[c+1,u+1]];let d=null,p=1/0;for(const[f,m]of l){if(f<0||m<0||f>=r.cols||Number.isFinite(r.rows)&&r.rows!==null&&m>=r.rows)continue;const b=r.originCenter.x+f*r.vx.x+m*r.vy.x,h=r.originCenter.y+f*r.vx.y+m*r.vy.y,y=(e.x-b)**2+(e.y-h)**2;y<p&&(p=y,d={tx:f,ty:m,fx:a,fy:s,x:e.x,y:e.y,gidx:null});}return d?(d.gidx=Ii(d.tx,d.ty),d):null}function jg(e,t){const n=Be.xform;return n?.ok?{x:n.originCenter.x+e*n.vx.x+t*n.vy.x,y:n.originCenter.y+e*n.vx.y+t*n.vy.y}:null}function He(){if(!ul())throw new Error("MGTile: not ready. Call MGTile.init() first.")}function zg(){return ["MGTile.init()","MGTile.hook()","MGTile.getTileObject(tx,ty) / inspect(tx,ty)","MGTile.setTileEmpty(tx,ty)","MGTile.setTilePlant(tx,ty,{...}) / setTileDecor / setTileEgg","MGTile.setTileObjectRaw(tx,ty,objOrFn)","MGTile.rebuildTransform() / pointToTile({x,y})","MGTile.tileToPoint(tx,ty)"].join(`
`)}const Je={init:Pg,isReady:ul,hook:Ke.hook,engine:Ti,tos:Rn,gidx:(e,t)=>Ii(Number(e),Number(t)),getTileObject:(e,t,n={})=>(He(),Wr(e,t,n)),inspect:(e,t,n={})=>(He(),Og(e,t,n)),setTileEmpty:(e,t,n={})=>(He(),Mg(e,t,n)),setTilePlant:(e,t,n,r={})=>(He(),Lg(e,t,n,r)),setTileDecor:(e,t,n,r={})=>(He(),_g(e,t,n,r)),setTileEgg:(e,t,n,r={})=>(He(),Fg(e,t,n,r)),setTileObjectRaw:(e,t,n,r={})=>(He(),Rg(e,t,n,r)),rebuildTransform:()=>(He(),pl()),pointToTile:(e,t={})=>(He(),Dg(e,t)),tileToPoint:(e,t)=>(He(),jg(e,t)),getTransform:()=>(He(),Be.xform),help:zg};function Bg(){return {ready:false,app:null,renderer:null,stage:null,ticker:null,tileSets:new Map,highlights:new Map,watches:new Map,fades:new Map,fadeWatches:new Map}}const U=Bg();function fl(){return U.ready}async function Gg(e=15e3){if(U.ready)return Oo(),true;if(await Ke.init(e),U.app=Ke.app(),U.ticker=Ke.ticker(),U.renderer=Ke.renderer(),U.stage=Ke.stage(),!U.app||!U.ticker)throw new Error("MGPixi: PIXI app/ticker not found");return U.ready=true,Oo(),true}function Oo(){const e=R;return e.$PIXI=e.PIXI||null,e.$app=U.app||null,e.$renderer=U.renderer||null,e.$stage=U.stage||null,e.$ticker=U.ticker||null,e.__MG_PIXI__={PIXI:e.$PIXI,app:e.$app,renderer:e.$renderer,stage:e.$stage,ticker:e.$ticker,ready:U.ready},e.__MG_PIXI__}function Pi(e){return !!e&&typeof e=="object"&&!Array.isArray(e)}function No(e){return !!(e&&typeof e.getBounds=="function"&&("parent"in e||"children"in e))}function Lr(e){return !!(e&&typeof e.tint=="number")}function Et(e){return !!(e&&typeof e.alpha=="number")}function yr(e,t,n){return e+(t-e)*n}function Wg(e,t,n){const r=e>>16&255,o=e>>8&255,i=e&255,a=t>>16&255,s=t>>8&255,c=t&255,u=yr(r,a,n)|0,l=yr(o,s,n)|0,d=yr(i,c,n)|0;return u<<16|l<<8|d}function Hg(e,t=900){const n=[],r=[e];for(;r.length&&n.length<t;){const o=r.pop();if(!o)continue;Lr(o)&&n.push(o);const i=o.children;if(Array.isArray(i))for(let a=i.length-1;a>=0;a--)r.push(i[a]);}return n}function Ug(e,t=25e3){const n=[],r=[e];let o=0;for(;r.length&&o++<t;){const i=r.pop();if(!i)continue;Et(i)&&n.push(i);const a=i.children;if(Array.isArray(a))for(let s=a.length-1;s>=0;s--)r.push(a[s]);}return n}const Vg=["plantVisual","cropVisual","slotVisual","slotView","displayObject","view","container","root","sprite","gfx","graphics"];function $o(e){if(!e)return null;if(No(e))return e;if(!Pi(e))return null;for(const t of Vg){const n=e[t];if(No(n))return n}return null}function Kg(e,t){const n=[{o:e,d:0}],r=new Set,o=6;for(;n.length;){const{o:i,d:a}=n.shift();if(!(!i||a>o)&&!r.has(i)){if(r.add(i),Array.isArray(i)){if(i.length===t){const s=new Array(t);let c=true;for(let u=0;u<t;u++){const l=$o(i[u]);if(!l){c=false;break}s[u]=l;}if(c)return s}for(const s of i)n.push({o:s,d:a+1});continue}if(Pi(i)){const s=i;for(const c of Object.keys(s))n.push({o:s[c],d:a+1});}}}return null}function gl(e){if(!Array.isArray(e))return [];const t=new Set,n=[];for(const r of e){let o,i;if(Array.isArray(r))o=r[0],i=r[1];else if(Pi(r))o=r.x??r.tx,i=r.y??r.ty;else continue;if(o=Number(o),i=Number(i),!Number.isFinite(o)||!Number.isFinite(i))continue;o|=0,i|=0;const a=`${o},${i}`;t.has(a)||(t.add(a),n.push({x:o,y:i}));}return n}function Yg(e,t){const n=String(e||"").trim();if(!n)throw new Error("MGPixi.defineTileSet: empty name");const r=gl(t);return U.tileSets.set(n,r),{ok:true,name:n,count:r.length}}function qg(e){return U.tileSets.delete(String(e||"").trim())}function Xg(){return Array.from(U.tileSets.keys()).sort((e,t)=>e.localeCompare(t))}function ml(e){return !!(e&&(e.tileSet!=null||Array.isArray(e.tiles)))}function Mi(e){const n=Je.tos?.()?.tileViews;if(!n?.entries)throw new Error("MGPixi: TOS.tileViews not found");if(!ml(e))return {entries:Array.from(n.entries()),gidxSet:null};let r=[];if(e.tileSet!=null){const i=String(e.tileSet||"").trim(),a=U.tileSets.get(i);if(!a)throw new Error(`MGPixi: tileSet not found "${i}"`);r=a;}else r=gl(e.tiles||[]);const o=new Map;for(const i of r){const a=Je.getTileObject(i.x,i.y,{ensureView:true,clone:false});a?.tileView&&a.gidx!=null&&o.set(a.gidx,a.tileView);}return {entries:Array.from(o.entries()),gidxSet:new Set(o.keys())}}function Li(e){const t=U.highlights.get(e);if(!t)return  false;Xe(()=>U.ticker?.remove(t.tick)),t.root&&t.baseAlpha!=null&&Et(t.root)&&Xe(()=>{t.root.alpha=t.baseAlpha;});for(const n of t.tint)n.o&&Lr(n.o)&&Xe(()=>{n.o.tint=n.baseTint;});return U.highlights.delete(e),true}function hl(e=null){for(const t of Array.from(U.highlights.keys()))e&&!String(t).startsWith(e)||Li(t);return  true}function bl(e,t={}){if(!No(e))throw new Error("MGPixi.highlightPulse: invalid root");const n=String(t.key||`hl:${Math.random().toString(16).slice(2)}`);if(U.highlights.has(n))return n;const r=Et(e)?Number(e.alpha):null,o=ot(Number(t.minAlpha??.12),0,1),i=ot(Number(t.maxAlpha??1),0,1),a=Number(t.speed??1.25),s=(t.tint??8386303)>>>0,c=ot(Number(t.tintMix??.85),0,1),u=t.deepTint!==false,l=[];if(u)for(const f of Hg(e))l.push({o:f,baseTint:f.tint});else Lr(e)&&l.push({o:e,baseTint:e.tint});const d=performance.now(),p=()=>{const f=(performance.now()-d)/1e3,m=(Math.sin(f*Math.PI*2*a)+1)/2,b=m*m*(3-2*m);r!=null&&Et(e)&&(e.alpha=ot(yr(o,i,b)*r,0,1));const h=b*c;for(const y of l)y.o&&Lr(y.o)&&(y.o.tint=Wg(y.baseTint,s,h));};return U.ticker?.add(p),U.highlights.set(n,{root:e,tick:p,baseAlpha:r,tint:l}),n}function Jg(e,t){const n=e?.mutations;if(!Array.isArray(n))return  false;for(const r of n)if(String(r||"").toLowerCase()===t)return  true;return  false}function yl(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.highlightMutation: empty mutation");const{entries:r,gidxSet:o}=Mi(t),i=`hlmut:${n}:`;if(t.clear===true)if(!o)hl(i);else for(const d of Array.from(U.highlights.keys())){if(!d.startsWith(i))continue;const p=d.split(":"),f=Number(p[2]);o.has(f)&&Li(d);}const a={tint:(t.tint??8386303)>>>0,minAlpha:Number(t.minAlpha??.12),maxAlpha:Number(t.maxAlpha??1),speed:Number(t.speed??1.25),tintMix:Number(t.tintMix??.85),deepTint:t.deepTint!==false};let s=0,c=0,u=0,l=0;for(const[d,p]of r){const f=p?.tileObject;if(!f||f.objectType!=="plant")continue;const m=f.slots;if(!Array.isArray(m)||m.length===0)continue;let b=false;const h=[];for(let v=0;v<m.length;v++)Jg(m[v],n)&&(h.push(v),b=true);if(!b)continue;s++,c+=h.length;const y=p?.childView?.plantVisual||p?.childView||p,S=Kg(y,m.length);if(!S){l+=h.length;continue}for(const v of h){const k=S[v];if(!k){l++;continue}const A=`${i}${d}:${v}`;U.highlights.has(A)||(bl(k,{key:A,...a}),u++);}}return {ok:true,mutation:n,filtered:!!o,plantsMatched:s,matchedSlots:c,newHighlights:u,failedSlots:l}}function Qg(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchMutation: empty mutation");const r=`watchmut:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,o=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,i=U.watches.get(r);i&&clearInterval(i);const a=setInterval(()=>{Xe(()=>yl(n,{...t,clear:!1}));},o);return U.watches.set(r,a),{ok:true,key:r,mutation:n,intervalMs:o}}function Zg(e){const t=String(e||"").trim();if(!t)return  false;if(!t.startsWith("watchmut:")){const r=t.toLowerCase();let o=0;for(const[i,a]of Array.from(U.watches.entries()))i.startsWith(`watchmut:${r}:`)&&(clearInterval(a),U.watches.delete(i),o++);return o>0}const n=U.watches.get(t);return n?(clearInterval(n),U.watches.delete(t),true):false}function em(e){const t=e?.childView?.plantVisual||e?.childView?.cropVisual||e?.childView||e?.displayObject||e;return $o(t)||$o(e?.displayObject)||null}function vl(e){const t=U.fades.get(e);if(!t)return  false;for(const n of t.targets)n.o&&Et(n.o)&&Number.isFinite(n.baseAlpha)&&Xe(()=>{n.o.alpha=n.baseAlpha;});return U.fades.delete(e),true}function Do(e=null){for(const t of Array.from(U.fades.keys()))e&&!String(t).startsWith(e)||vl(t);return  true}function xl(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.clearSpeciesFade: empty species");const r=`fade:${n}:`;if(!ml(t))return Do(r);const{gidxSet:o}=Mi(t);if(!o)return Do(r);for(const i of Array.from(U.fades.keys())){if(!i.startsWith(r))continue;const a=Number(i.slice(r.length));o.has(a)&&vl(i);}return  true}function wl(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.fadeSpecies: empty species");const r=ot(Number(t.alpha??.2),0,1),o=t.deep===true,{entries:i,gidxSet:a}=Mi(t),s=`fade:${n}:`;t.clear===true&&xl(n,t);let c=0,u=0,l=0,d=0;for(const[p,f]of i){const m=f?.tileObject;if(!m||m.objectType!=="plant")continue;c++;const b=String(m.species||"").trim().toLowerCase();if(!b||b!==n)continue;u++;const h=em(f);if(!h||!Et(h)){d++;continue}const y=`${s}${p}`;if(U.fades.has(y)){Xe(()=>{h.alpha=r;}),l++;continue}const S=o?Ug(h):[h],v=[];for(const k of S)Et(k)&&v.push({o:k,baseAlpha:Number(k.alpha)});for(const k of v)Xe(()=>{k.o.alpha=r;});U.fades.set(y,{targets:v}),l++;}return {ok:true,species:n,alpha:r,deep:o,filtered:!!a,plantsSeen:c,matchedPlants:u,applied:l,failed:d,totalFades:U.fades.size}}function tm(e,t={}){const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchFadeSpecies: empty species");const r=`watchfade:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,o=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,i=U.fadeWatches.get(r);i&&clearInterval(i);const a=setInterval(()=>{Xe(()=>wl(n,{...t,clear:!1}));},o);return U.fadeWatches.set(r,a),{ok:true,key:r,species:n,intervalMs:o}}function nm(e){const t=String(e||"").trim();if(!t)return  false;if(!t.startsWith("watchfade:")){const r=t.toLowerCase();let o=0;for(const[i,a]of Array.from(U.fadeWatches.entries()))i.startsWith(`watchfade:${r}:`)&&(clearInterval(a),U.fadeWatches.delete(i),o++);return o>0}const n=U.fadeWatches.get(t);return n?(clearInterval(n),U.fadeWatches.delete(t),true):false}function rm(e){const t=Array.isArray(e?.slots)?e.slots:[];return {objectType:"plant",species:e?.species??null,plantedAt:e?.plantedAt??null,maturedAt:e?.maturedAt??null,slotCount:t.length,slots:t.map((n,r)=>({idx:r,mutations:Array.isArray(n?.mutations)?n.mutations.slice():[]}))}}function om(e,t,n={}){const r=Number(e)|0,o=Number(t)|0,i=n.ensureView!==false,a=Je.getTileObject(r,o,{ensureView:i,clone:false}),s=a?.tileView||null,c=s?.tileObject,u={ok:true,tx:r,ty:o,gidx:a?.gidx??Je.gidx?.(r,o)??null,hasTileView:!!s,objectType:c?.objectType??null,tileObject:c??null,summary:c?.objectType==="plant"?rm(c):c?{objectType:c.objectType??null}:null,display:s?s.childView?.plantVisual||s.childView||s.displayObject||s:null};return n.log!==false&&Xe(()=>console.log("[MGPixi.inspectTile]",u)),u}function im(e,t,n){const r=R.PIXI;if(!r)return;let o=U.stage.getChildByName("gemini-overlay");o||(o=new r.Container,o.name="gemini-overlay",U.stage.addChild(o));const i=n.key;let a=o.getChildByName(i);a||(a=new r.Graphics,a.name=i,o.addChild(a));const s=Je.tileToPoint(e,t);if(!s)return;a.clear(),a.lineStyle(2,n.tint??65280,n.alpha??1),a.beginFill(n.tint??65280,(n.alpha??1)*.2);const c=Je.getTransform(),u=c?Math.hypot(c.vx.x,c.vx.y):32,l=c?Math.hypot(c.vy.x,c.vy.y):32;a.drawRect(0,0,u,l),a.endFill(),a.x=s.x,a.y=s.y,c&&(a.rotation=Math.atan2(c.vx.y,c.vx.x));}function am(e){const t=U.stage?.getChildByName("gemini-overlay");if(!t)return  false;const n=t.getChildByName(e);return n?(t.removeChild(n),n.destroy?.(),true):false}function we(){if(!fl())throw new Error("MGPixi: call MGPixi.init() first")}const Mn={init:Gg,isReady:fl,expose:Oo,get app(){return U.app},get renderer(){return U.renderer},get stage(){return U.stage},get ticker(){return U.ticker},get PIXI(){return R.PIXI||null},defineTileSet:(e,t)=>(we(),Yg(e,t)),deleteTileSet:e=>(we(),qg(e)),listTileSets:()=>(we(),Xg()),highlightPulse:(e,t)=>(we(),bl(e,t)),stopHighlight:e=>(we(),Li(e)),clearHighlights:e=>(we(),hl(e)),drawOverlayBox:(e,t,n)=>(we(),im(e,t,n)),stopOverlay:e=>(we(),am(e)),highlightMutation:(e,t)=>(we(),yl(e,t)),watchMutation:(e,t)=>(we(),Qg(e,t)),stopWatchMutation:e=>(we(),Zg(e)),inspectTile:(e,t,n)=>(we(),om(e,t,n)),fadeSpecies:(e,t)=>(we(),wl(e,t)),clearSpeciesFade:(e,t)=>(we(),xl(e,t)),clearFades:e=>(we(),Do(e)),watchFadeSpecies:(e,t)=>(we(),tm(e,t)),stopWatchFadeSpecies:e=>(we(),nm(e))};function sm(){return {ready:false,baseUrl:null,urls:{ambience:new Map,music:new Map},sfx:{mp3Url:null,atlasUrl:null,atlas:null,groups:new Map,buffer:null},tracks:{ambience:null,music:null},ctx:null}}const J=sm();function kl(){return J.ready}const ua=R??window;async function Sl(){const e=J.ctx;if(e)return e;const t=ua.AudioContext||ua.webkitAudioContext;if(!t)throw new Error("WebAudio not supported");const n=new t;return J.ctx=n,n}async function Cl(){if(J.ctx&&J.ctx.state==="suspended")try{await J.ctx.resume();}catch{}}const lm={sfx:"soundEffectsVolume",music:"musicVolume",ambience:"ambienceVolume"},cm={sfx:"soundEffectsVolumeAtom",music:"musicVolumeAtom",ambience:"ambienceVolumeAtom"},bn=.001,yn=.2;function pa(e,t=NaN){try{const n=localStorage.getItem(e);if(n==null)return t;let r;try{r=JSON.parse(n);}catch{r=n;}if(typeof r=="number"&&Number.isFinite(r))return r;if(typeof r=="string"){const o=parseFloat(r);if(Number.isFinite(o))return o}}catch{}return t}function Ln(e){const t=lm[e],n=cm[e];if(!t)return {atom:yn,vol100:Jn(yn)};const r=pa(t,NaN);if(Number.isFinite(r)){const i=ot(r,0,1);return {atom:i,vol100:Jn(i)}}if(n){const i=pa(n,NaN);if(Number.isFinite(i)){const a=ot(i,0,1);return {atom:a,vol100:Jn(a)}}}const o=yn;return {atom:o,vol100:Jn(o)}}function dm(e){const t=Number(e);if(!Number.isFinite(t))return null;if(t<=0)return 0;const r=(ot(t,1,100)-1)/99;return bn+r*(yn-bn)}function Jn(e){const t=ot(Number(e),0,1);if(t<=bn)return 0;const n=(t-bn)/(yn-bn);return Math.round(1+n*99)}function Al(e,t){if(t==null)return Ln(e).atom;const n=dm(t);return n===null?Ln(e).atom:lu(n)}function um(e){const t=new Map,n=(r,o)=>{t.has(r)||t.set(r,[]),t.get(r).push(o);};for(const r of Object.keys(e||{})){const o=/^(.*)_([A-Z])$/.exec(r);o?.[1]?n(o[1],r):n(r,r);}for(const[r,o]of Array.from(t.entries()))o.sort((i,a)=>i.localeCompare(a)),t.set(r,o);J.sfx.groups=t;}function pm(e){const t=J.sfx.atlas;if(!t)throw new Error("SFX atlas not loaded");if(t[e])return e;const n=J.sfx.groups.get(e);if(n?.length)return n[Math.random()*n.length|0];throw new Error(`Unknown sfx/group: ${e}`)}async function fm(){if(J.sfx.buffer)return J.sfx.buffer;if(!J.sfx.mp3Url)throw new Error("SFX mp3 url missing");const e=await Sl();await Cl();const n=await(await xs(J.sfx.mp3Url)).arrayBuffer(),r=await new Promise((o,i)=>{const a=e.decodeAudioData(n,o,i);a?.then&&a.then(o,i);});return J.sfx.buffer=r,r}async function gm(e,t={}){if(!J.ready)throw new Error("MGAudio not ready yet");const n=String(e||"").trim();if(!n)throw new Error("Missing sfx name");const r=pm(n),o=J.sfx.atlas[r];if(!o)throw new Error(`Missing segment for sfx: ${r}`);const i=await Sl();await Cl();const a=await fm(),s=Math.max(0,+o.start||0),c=Math.max(s,+o.end||s),u=Math.max(.01,c-s),l=Al("sfx",t.volume),d=i.createGain();d.gain.value=l,d.connect(i.destination);const p=i.createBufferSource();return p.buffer=a,p.connect(d),p.start(0,s,u),{name:r,source:p,start:s,end:c,duration:u,volume:l}}let Qn=null;async function mm(){return J.ready?true:Qn||(Qn=(async()=>{J.baseUrl=await qt.base();const e=await ft.load({baseUrl:J.baseUrl}),t=ft.getBundle(e,"audio");if(!t)throw new Error("No audio bundle in manifest");for(const n of t.assets||[])for(const r of n.src||[]){if(typeof r!="string")continue;const o=/^audio\/(ambience|music)\/(.+)\.mp3$/i.exec(r);if(o){const i=o[1].toLowerCase(),a=o[2];J.urls[i].set(a,ct(J.baseUrl,r));continue}/^audio\/sfx\/sfx\.mp3$/i.test(r)&&(J.sfx.mp3Url=ct(J.baseUrl,r)),/^audio\/sfx\/sfx\.json$/i.test(r)&&(J.sfx.atlasUrl=ct(J.baseUrl,r));}if(!J.sfx.atlasUrl)throw new Error("Missing audio/sfx/sfx.json in manifest");return J.sfx.atlas=await pi(J.sfx.atlasUrl),um(J.sfx.atlas),J.ready=true,true})(),Qn)}function Tl(e){if(e!=="music"&&e!=="ambience")return  false;const t=J.tracks[e];if(t){try{t.pause();}catch{}try{t.src="";}catch{}}return J.tracks[e]=null,true}function hm(e,t,n={}){if(!J.ready)throw new Error("MGAudio not ready yet");if(e!=="music"&&e!=="ambience")throw new Error(`Invalid category: ${e}`);const r=J.urls[e].get(t);if(!r)throw new Error(`Unknown ${e}: ${t}`);Tl(e);const o=new Audio(r);return o.loop=!!n.loop,o.volume=Al(e,n.volume),o.preload="auto",o.play().catch(()=>{}),J.tracks[e]=o,o}function bm(e,t={}){const n=String(e||"").trim();return n==="music"||n==="ambience"?Array.from(J.urls[n].keys()).sort():n==="sfx"?J.sfx.atlas?t.groups?Array.from(J.sfx.groups.keys()).sort():Object.keys(J.sfx.atlas).sort():[]:[]}function ym(){return ["sfx","music","ambience"]}function vm(){return Array.from(J.sfx.groups.keys()).sort((e,t)=>e.localeCompare(t))}function xm(e,t){const n=String(e||"").trim().toLowerCase(),r=String(t||"").trim();if(!r||n!=="music"&&n!=="ambience")return  false;const o=J.urls[n],i=r.toLowerCase();for(const a of Array.from(o.keys()))if(a.toLowerCase()===i)return  true;return  false}function wm(e){const t=String(e||"").trim();if(!t)return  false;const n=t.toLowerCase();for(const r of Array.from(J.sfx.groups.keys()))if(r.toLowerCase()===n)return  true;return  false}function km(e,t){const n=String(e||"").trim().toLowerCase(),r=String(t||"").trim();if(!r)throw new Error("getTrackUrl(category, name) missing name");if(n!=="music"&&n!=="ambience")throw new Error(`Invalid category: ${e}`);const o=J.urls[n],i=r.toLowerCase();for(const[a,s]of Array.from(o.entries()))if(a.toLowerCase()===i)return s;return null}function Sm(){return J.tracks.music&&(J.tracks.music.volume=Ln("music").atom),J.tracks.ambience&&(J.tracks.ambience.volume=Ln("ambience").atom),true}function st(){if(!kl())throw new Error("MGAudio not ready yet")}async function Cm(e,t,n={}){const r=String(e||"").trim(),o=String(t||"").trim();if(!r||!o)throw new Error("play(category, asset) missing args");if(r==="sfx")return gm(o,n);if(r==="music"||r==="ambience")return hm(r,o,n);throw new Error(`Unknown category: ${r}`)}const Il={init:mm,isReady:kl,play:Cm,stop:e=>(st(),Tl(e)),list:(e,t)=>(st(),bm(e,t)),refreshVolumes:()=>(st(),Sm()),categoryVolume:e=>(st(),Ln(e)),getCategories:()=>(st(),ym()),getGroups:()=>(st(),vm()),hasTrack:(e,t)=>(st(),xm(e,t)),hasGroup:e=>(st(),wm(e)),getTrackUrl:(e,t)=>(st(),km(e,t))};function Am(){return {ready:false,baseUrl:null,byCat:new Map,byBase:new Map,overlay:null,live:new Set,defaultParent:null}}const ge=Am();function El(){return ge.ready}let Zn=null;async function Tm(){return ge.ready?true:Zn||(Zn=(async()=>{ge.baseUrl=await qt.base();const e=await ft.load({baseUrl:ge.baseUrl}),t=ft.getBundle(e,"cosmetic");if(!t)throw new Error("No 'cosmetic' bundle in manifest");ge.byCat.clear(),ge.byBase.clear();for(const n of t.assets||[])for(const r of n.src||[]){if(typeof r!="string"||!/^cosmetic\/.+\.png$/i.test(r))continue;const i=r.split("/").pop().replace(/\.png$/i,""),a=i.indexOf("_");if(a<0)continue;const s=i.slice(0,a),c=i.slice(a+1),u=ct(ge.baseUrl,r);ge.byBase.set(i,u),ge.byCat.has(s)||ge.byCat.set(s,new Map),ge.byCat.get(s).set(c,u);}return ge.ready=true,true})(),Zn)}function jo(e){let t=String(e||"").trim();return t?(t=t.replace(/^cosmetic\//i,""),t=t.replace(/\.png$/i,""),t):""}function Im(e,t){if(t===void 0){const i=jo(e),a=i.indexOf("_");return a<0?{cat:"",asset:i,base:i}:{cat:i.slice(0,a),asset:i.slice(a+1),base:i}}const n=String(e||"").trim(),r=jo(t),o=r.includes("_")?r:`${n}_${r}`;if(r.includes("_")&&!n){const i=r.indexOf("_");return {cat:r.slice(0,i),asset:r.slice(i+1),base:r}}return {cat:n,asset:r.replace(/^.+?_/,""),base:o}}function Em(){return Array.from(ge.byCat.keys()).sort((e,t)=>e.localeCompare(t))}function Pm(e){const t=ge.byCat.get(String(e||"").trim());return t?Array.from(t.keys()).sort((n,r)=>n.localeCompare(r)):[]}function zo(e,t){const{cat:n,asset:r,base:o}=Im(e,t),i=ge.byBase.get(o);if(i)return i;const s=ge.byCat.get(n)?.get(r);if(s)return s;if(!ge.baseUrl)throw new Error("MGCosmetic not initialized");if(!o)throw new Error("Invalid cosmetic name");return ct(ge.baseUrl,`cosmetic/${o}.png`)}const fa=R?.document??document;function Mm(){if(ge.overlay)return ge.overlay;const e=fa.createElement("div");return e.id="MG_COSMETIC_OVERLAY",e.style.cssText=["position:fixed","left:0","top:0","width:100vw","height:100vh","pointer-events:none","z-index:99999999"].join(";"),fa.documentElement.appendChild(e),ge.overlay=e,e}function Lm(){const e=ge.defaultParent;if(!e)return null;try{return typeof e=="function"?e():e}catch{return null}}function _m(e){return ge.defaultParent=e,true}const Fm=R?.document??document;function Bo(e,t,n){if(!ge.ready)throw new Error("MGCosmetic not ready yet");let r,o;typeof t=="object"&&t!==null?(r=t,o=void 0):typeof t=="string"?(o=t,r=n||{}):(o=void 0,r=n||{});const i=o!==void 0?zo(e,o):zo(e),a=Fm.createElement("img");if(a.decoding="async",a.loading="eager",a.src=i,a.alt=r.alt!=null?String(r.alt):jo(o??e),r.className&&(a.className=String(r.className)),r.width!=null&&(a.style.width=String(r.width)),r.height!=null&&(a.style.height=String(r.height)),r.opacity!=null&&(a.style.opacity=String(r.opacity)),r.style&&typeof r.style=="object")for(const[s,c]of Object.entries(r.style))try{a.style[s]=String(c);}catch{}return a}function Rm(e,t,n){let r,o;typeof t=="object"&&t!==null?(r=t,o=void 0):typeof t=="string"?(o=t,r=n||{}):(o=void 0,r=n||{});const i=r.parent||Lm()||Mm(),a=o!==void 0?Bo(e,o,r):Bo(e,r);if(i===ge.overlay||r.center||r.x!=null||r.y!=null||r.absolute){a.style.position="absolute",a.style.pointerEvents="none",a.style.zIndex=String(r.zIndex??999999);const c=r.scale??1,u=r.rotation??0;if(r.center)a.style.left="50%",a.style.top="50%",a.style.transform=`translate(-50%, -50%) scale(${c}) rotate(${u}rad)`;else {const l=r.x??innerWidth/2,d=r.y??innerHeight/2;a.style.left=`${l}px`,a.style.top=`${d}px`,a.style.transform=`scale(${c}) rotate(${u}rad)`,r.anchor==="center"&&(a.style.transform=`translate(-50%, -50%) scale(${c}) rotate(${u}rad)`);}}return i.appendChild(a),ge.live.add(a),a.__mgDestroy=()=>{try{a.remove();}catch{}ge.live.delete(a);},a}function Om(){for(const e of Array.from(ge.live))e.__mgDestroy?.();}function xt(){if(!El())throw new Error("MGCosmetic not ready yet")}const Pl={init:Tm,isReady:El,categories:()=>(xt(),Em()),list:e=>(xt(),Pm(e)),url:((e,t)=>(xt(),zo(e,t))),create:((e,t,n)=>(xt(),Bo(e,t,n))),show:((e,t,n)=>(xt(),Rm(e,t,n))),attach:e=>(xt(),_m(e)),clear:()=>(xt(),Om())};async function Nm(e){const t=[{name:"Data",init:()=>ue.init()},{name:"CustomModal",init:()=>hn.init()},{name:"Sprites",init:()=>ne.init()},{name:"TileObjectSystem",init:()=>Je.init()},{name:"Pixi",init:()=>Mn.init()},{name:"Audio",init:()=>Il.init()},{name:"Cosmetics",init:()=>Pl.init()}];await Promise.all(t.map(async n=>{e?.({status:"start",name:n.name});try{await n.init(),e?.({status:"success",name:n.name});}catch(r){console.error(`[${n.name}] failed`,r),e?.({status:"error",name:n.name,error:r});}})),console.log("[Gemini] Modules ready. Access via Gemini.Modules in console.");}const _i=Re.AUTO_FAVORITE,Ml={enabled:false,mode:"simple",simple:{enabled:false,favoriteSpecies:[],favoriteMutations:[]}};function Pt(){return Ae(_i,Ml)}function Fi(e){Ge(_i,e);}function Ll(e){const n={...Pt(),...e};return Fi(n),n}function Ri(e){const t=Pt();return t.mode="simple",t.simple={...t.simple,...e},Fi(t),t}function $m(e){Ri({favoriteSpecies:e});}function Dm(e){Ri({favoriteMutations:e});}function ga(){return Pt().enabled}function at(e,t){if(e===t)return  true;if(e===null||t===null)return e===t;if(typeof e!=typeof t)return  false;if(typeof e!="object")return e===t;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return  false;for(let a=0;a<e.length;a++)if(!at(e[a],t[a]))return  false;return  true}if(Array.isArray(e)||Array.isArray(t))return  false;const n=e,r=t,o=Object.keys(n),i=Object.keys(r);if(o.length!==i.length)return  false;for(const a of o)if(!Object.prototype.hasOwnProperty.call(r,a)||!at(n[a],r[a]))return  false;return  true}const ma={currentGardenTile:"myCurrentGardenTileAtom",globalTileIndex:"myCurrentGlobalTileIndexAtom",gardenObject:"myCurrentGardenObjectAtom",isMature:"isGardenObjectMatureAtom",isInMyGarden:"isInMyGardenAtom",gardenName:"currentGardenNameAtom",sortedSlotIndices:"myCurrentSortedGrowSlotIndicesAtom",currentGrowSlotIndex:"myCurrentGrowSlotIndexAtom"},ha={position:{globalIndex:null,localIndex:null},tile:{type:null,isEmpty:true},garden:{name:null,isOwner:false,playerSlotIndex:null},object:{type:null,data:null,isMature:false},plant:null};function jm(e){const t=e.currentGardenTile;return {globalIndex:e.globalTileIndex,localIndex:t?.localTileIndex??null}}function zm(e){return {type:e.currentGardenTile?.tileType??null,isEmpty:e.gardenObject===null}}function Bm(e){const t=e.currentGardenTile;return {name:e.gardenName,isOwner:e.isInMyGarden??false,playerSlotIndex:t?.userSlotIdx??null}}function Gm(e){const t=e.gardenObject;return t?{type:t.objectType,data:t,isMature:e.isMature??false}:{type:null,data:null,isMature:false}}function Wm(e){const t=e.gardenObject;if(!t||t.objectType!=="plant")return null;const n=t,r=e.sortedSlotIndices??[];return {species:n.species,slots:n.slots??[],currentSlotIndex:e.currentGrowSlotIndex,sortedSlotIndices:r,nextHarvestSlotIndex:r.length>0?r[0]:null}}function ba(e){return {position:jm(e),tile:zm(e),garden:Bm(e),object:Gm(e),plant:Wm(e)}}function ya(e){return JSON.stringify({globalIndex:e.position.globalIndex,localIndex:e.position.localIndex,tileType:e.tile.type,isEmpty:e.tile.isEmpty,gardenName:e.garden.name,isOwner:e.garden.isOwner,playerSlotIndex:e.garden.playerSlotIndex,objectType:e.object.type,isMature:e.object.isMature,plantSpecies:e.plant?.species??null,slotCount:e.plant?.slots.length??0})}function Hm(e,t){return e.type!==t.type||e.isMature!==t.isMature?true:e.data===null&&t.data===null?false:e.data===null||t.data===null?true:!at(e.data,t.data)}function Um(e,t){return e===null&&t===null?false:e===null||t===null||e.species!==t.species||e.currentSlotIndex!==t.currentSlotIndex||e.nextHarvestSlotIndex!==t.nextHarvestSlotIndex||e.slots.length!==t.slots.length?true:!at(e.sortedSlotIndices,t.sortedSlotIndices)}function Vm(e,t){return e.name!==t.name||e.isOwner!==t.isOwner||e.playerSlotIndex!==t.playerSlotIndex}function Km(){let e=ha,t=ha,n=false;const r=[],o={all:new Set,stable:new Set,object:new Set,plantInfo:new Set,garden:new Set},i={},a=Object.keys(ma),s=new Set;function c(){if(s.size<a.length)return;const l=ba(i);if(!at(e,l)&&(t=e,e=l,!!n)){for(const d of o.all)d(e,t);if(ya(t)!==ya(e))for(const d of o.stable)d(e,t);if(Hm(t.object,e.object)){const d={current:e.object,previous:t.object};for(const p of o.object)p(d);}if(Um(t.plant,e.plant)){const d={current:e.plant,previous:t.plant};for(const p of o.plantInfo)p(d);}if(Vm(t.garden,e.garden)){const d={current:e.garden,previous:t.garden};for(const p of o.garden)p(d);}}}async function u(){if(n)return;const l=a.map(async d=>{const p=ma[d],f=await pe.subscribe(p,m=>{i[d]=m,s.add(d),c();});r.push(f);});await Promise.all(l),n=true,s.size===a.length&&(e=ba(i));}return u(),{get(){return e},subscribe(l,d){return o.all.add(l),d?.immediate!==false&&n&&s.size===a.length&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,d){return o.stable.add(l),d?.immediate!==false&&n&&s.size===a.length&&l(e,e),()=>o.stable.delete(l)},subscribeObject(l,d){return o.object.add(l),d?.immediate&&n&&s.size===a.length&&l({current:e.object,previous:e.object}),()=>o.object.delete(l)},subscribePlantInfo(l,d){return o.plantInfo.add(l),d?.immediate&&n&&s.size===a.length&&l({current:e.plant,previous:e.plant}),()=>o.plantInfo.delete(l)},subscribeGarden(l,d){return o.garden.add(l),d?.immediate&&n&&s.size===a.length&&l({current:e.garden,previous:e.garden}),()=>o.garden.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.object.clear(),o.plantInfo.clear(),o.garden.clear(),n=false;}}}let io=null;function Ym(){return io||(io=Km()),io}function qm(){let e=null;const t=[],n=new Set,r={},o=new Set,i=2;function a(d,p){return {x:p%d,y:Math.floor(p/d)}}function s(d,p,f){return f*d+p}function c(d,p){const{cols:f,rows:m}=d,b=f*m,h=new Set,y=new Set,S=new Map,v=[],k=d.userSlotIdxAndDirtTileIdxToGlobalTileIdx??[],A=d.userSlotIdxAndBoardwalkTileIdxToGlobalTileIdx??[],x=Math.max(k.length,A.length);for(let w=0;w<x;w++){const T=k[w]??[],M=A[w]??[],z=T.map((P,O)=>(h.add(P),S.set(P,w),{globalIndex:P,localIndex:O,position:a(f,P)})),q=M.map((P,O)=>(y.add(P),S.set(P,w),{globalIndex:P,localIndex:O,position:a(f,P)}));v.push({userSlotIdx:w,dirtTiles:z,boardwalkTiles:q,allTiles:[...z,...q]});}const C=d.spawnTiles.map(w=>a(f,w)),E={};if(d.locations)for(const[w,T]of Object.entries(d.locations)){const M=T.spawnTileIdx??[];E[w]={name:w,spawnTiles:M,spawnPositions:M.map(z=>a(f,z))};}return {cols:f,rows:m,totalTiles:b,tileSize:p,spawnTiles:d.spawnTiles,spawnPositions:C,locations:E,userSlots:v,globalToXY(w){return a(f,w)},xyToGlobal(w,T){return s(f,w,T)},getTileOwner(w){return S.get(w)??null},isDirtTile(w){return h.has(w)},isBoardwalkTile(w){return y.has(w)}}}function u(){if(o.size<i||e)return;const d=r.map,p=r.tileSize??0;if(d){e=c(d,p);for(const f of n)f(e);n.clear();}}async function l(){const d=await pe.subscribe("mapAtom",f=>{r.map=f,o.add("map"),u();});t.push(d);const p=await pe.subscribe("tileSizeAtom",f=>{r.tileSize=f,o.add("tileSize"),u();});t.push(p);}return l(),{get(){return e},isReady(){return e!==null},onReady(d,p){return e?(p?.immediate!==false&&d(e),()=>{}):(n.add(d),()=>n.delete(d))},destroy(){for(const d of t)d();t.length=0,e=null,n.clear();}}}let ao=null;function Go(){return ao||(ao=qm()),ao}function Xm(){const e=ue.get("mutations");return e?Object.keys(e):[]}function _l(){const e={};for(const t of Xm())e[t]=[];return e}function Wo(){return {garden:null,mySlotIndex:null,plants:{all:[],mature:[],growing:[],bySpecies:{},count:0},crops:{all:[],mature:[],growing:[],mutated:{all:[],byMutation:_l()}},eggs:{all:[],mature:[],growing:[],byType:{},count:0},decors:{tileObjects:[],boardwalk:[],all:[],byType:{},count:0},tiles:{tileObjects:[],boardwalk:[],empty:{tileObjects:[],boardwalk:[]}},counts:{plants:0,maturePlants:0,crops:0,matureCrops:0,eggs:0,matureEggs:0,decors:0,emptyTileObjects:0,emptyBoardwalk:0}}}function Jm(e,t,n,r){const o=t.slots.filter(i=>r>=i.endTime).length;return {tileIndex:e,position:n,species:t.species,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:r>=t.maturedAt,slots:t.slots,slotsCount:t.slots.length,matureSlotsCount:o}}function Qm(e,t,n,r,o){return {tileIndex:e,position:t,slotIndex:n,species:r.species,startTime:r.startTime,endTime:r.endTime,targetScale:r.targetScale,mutations:[...r.mutations],isMature:o>=r.endTime}}function Zm(e,t,n,r){return {tileIndex:e,position:n,eggId:t.eggId,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:r>=t.maturedAt}}function va(e,t,n,r){return {tileIndex:e,position:n,decorId:t.decorId,rotation:t.rotation,location:r}}function xa(e,t){const{garden:n,mySlotIndex:r}=e,o=Date.now();if(!n||r===null)return Wo();const i=t().get(),a=i?.userSlots[r],s=a?.dirtTiles??[],c=a?.boardwalkTiles??[],u=[],l=[],d=[],p={},f=[],m=[],b=[],h=[],y=_l(),S=[],v=[],k=[],A={},x=[],C=[],E={},w=new Set,T=new Set;for(const[P,O]of Object.entries(n.tileObjects)){const G=parseInt(P,10);w.add(G);const F=i?i.globalToXY(G):{x:0,y:0};if(O.objectType==="plant"){const $=O,j=Jm(P,$,F,o);u.push(j),j.isMature?l.push(j):d.push(j),p[j.species]||(p[j.species]=[]),p[j.species].push(j);for(let D=0;D<$.slots.length;D++){const L=$.slots[D],B=Qm(P,F,D,L,o);if(f.push(B),B.isMature?m.push(B):b.push(B),B.mutations.length>0){h.push(B);for(const N of B.mutations)y[N]||(y[N]=[]),y[N].push(B);}}}else if(O.objectType==="egg"){const j=Zm(P,O,F,o);S.push(j),A[j.eggId]||(A[j.eggId]=[]),A[j.eggId].push(j),j.isMature?v.push(j):k.push(j);}else if(O.objectType==="decor"){const j=va(P,O,F,"tileObjects");x.push(j),E[j.decorId]||(E[j.decorId]=[]),E[j.decorId].push(j);}}for(const[P,O]of Object.entries(n.boardwalkTileObjects)){const G=parseInt(P,10);T.add(G);const F=i?i.globalToXY(G):{x:0,y:0},j=va(P,O,F,"boardwalk");C.push(j),E[j.decorId]||(E[j.decorId]=[]),E[j.decorId].push(j);}const M=[...x,...C],z=s.filter(P=>!w.has(P.localIndex)),q=c.filter(P=>!T.has(P.localIndex));return {garden:n,mySlotIndex:r,plants:{all:u,mature:l,growing:d,bySpecies:p,count:u.length},crops:{all:f,mature:m,growing:b,mutated:{all:h,byMutation:y}},eggs:{all:S,mature:v,growing:k,byType:A,count:S.length},decors:{tileObjects:x,boardwalk:C,all:M,byType:E,count:M.length},tiles:{tileObjects:s,boardwalk:c,empty:{tileObjects:z,boardwalk:q}},counts:{plants:u.length,maturePlants:l.length,crops:f.length,matureCrops:m.length,eggs:S.length,matureEggs:v.length,decors:M.length,emptyTileObjects:z.length,emptyBoardwalk:q.length}}}function wa(e){return JSON.stringify({plants:e.counts.plants,maturePlants:e.counts.maturePlants,crops:e.counts.crops,matureCrops:e.counts.matureCrops,eggs:e.counts.eggs,matureEggs:e.counts.matureEggs,decors:e.counts.decors,emptyTileObjects:e.counts.emptyTileObjects,emptyBoardwalk:e.counts.emptyBoardwalk})}function eh(e,t){const n=new Set(e.map(a=>a.tileIndex)),r=new Set(t.map(a=>a.tileIndex)),o=t.filter(a=>!n.has(a.tileIndex)),i=e.filter(a=>!r.has(a.tileIndex));return {added:o,removed:i}}function th(e,t,n){const r=new Set(e.map(i=>i.tileIndex)),o=new Set(n.map(i=>i.tileIndex));return t.filter(i=>!r.has(i.tileIndex)&&o.has(i.tileIndex))}function nh(e,t,n){const r=new Set(e.map(i=>`${i.tileIndex}:${i.slotIndex}`)),o=new Set(n.map(i=>`${i.tileIndex}:${i.slotIndex}`));return t.filter(i=>{const a=`${i.tileIndex}:${i.slotIndex}`;return !r.has(a)&&o.has(a)})}function rh(e,t,n){const r=new Set(e.map(i=>i.tileIndex)),o=new Set(n.map(i=>i.tileIndex));return t.filter(i=>!r.has(i.tileIndex)&&o.has(i.tileIndex))}function oh(e,t){const n=[],r=new Map(e.map(o=>[o.tileIndex,o]));for(const o of t){const i=r.get(o.tileIndex);if(!i)continue;const a=Math.min(i.slots.length,o.slots.length);for(let s=0;s<a;s++){const c=new Set(i.slots[s].mutations),u=new Set(o.slots[s].mutations),l=[...u].filter(p=>!c.has(p)),d=[...c].filter(p=>!u.has(p));if(l.length>0||d.length>0){const p=Date.now(),f=o.slots[s],m={tileIndex:o.tileIndex,position:o.position,slotIndex:s,species:f.species,startTime:f.startTime,endTime:f.endTime,targetScale:f.targetScale,mutations:[...f.mutations],isMature:p>=f.endTime};n.push({crop:m,added:l,removed:d});}}}return n}function ih(e,t,n){const r=[],o=new Map(t.map(a=>[a.tileIndex,a])),i=new Map;for(const a of n)i.set(`${a.tileIndex}:${a.slotIndex}`,a);for(const a of e){const s=o.get(a.tileIndex);if(!s)continue;const c=Math.min(a.slots.length,s.slots.length);for(let u=0;u<c;u++){const l=a.slots[u],d=s.slots[u];if(l.startTime!==d.startTime){const p=i.get(`${a.tileIndex}:${u}`);if(!p||!p.isMature)continue;const f={tileIndex:a.tileIndex,position:a.position,slotIndex:u,species:l.species,startTime:l.startTime,endTime:l.endTime,targetScale:l.targetScale,mutations:[...l.mutations],isMature:true};r.push({crop:f,remainingSlots:s.slotsCount});}}if(s.slotsCount<a.slotsCount)for(let u=s.slotsCount;u<a.slotsCount;u++){const l=i.get(`${a.tileIndex}:${u}`);if(!l||!l.isMature)continue;const d=a.slots[u];if(!d)continue;const p={tileIndex:a.tileIndex,position:a.position,slotIndex:u,species:d.species,startTime:d.startTime,endTime:d.endTime,targetScale:d.targetScale,mutations:[...d.mutations],isMature:true};r.push({crop:p,remainingSlots:s.slotsCount});}}return r}function ah(e,t){const n=new Set(e.map(a=>a.tileIndex)),r=new Set(t.map(a=>a.tileIndex)),o=t.filter(a=>!n.has(a.tileIndex)),i=e.filter(a=>!r.has(a.tileIndex));return {added:o,removed:i}}function sh(e,t){const n=c=>`${c.tileIndex}:${c.location}`,r=c=>`${c.tileIndex}:${c.location}`,o=new Set(e.map(n)),i=new Set(t.map(r)),a=t.filter(c=>!o.has(r(c))),s=e.filter(c=>!i.has(n(c)));return {added:a,removed:s}}function lh(){let e=Wo(),t=Wo(),n=false;const r=[],o={all:new Set,stable:new Set,plantAdded:new Set,plantRemoved:new Set,plantMatured:new Set,cropMutated:new Set,cropMatured:new Set,cropHarvested:new Set,eggPlaced:new Set,eggRemoved:new Set,eggMatured:new Set,decorPlaced:new Set,decorRemoved:new Set},i={},a=new Set,s=2;function c(){if(a.size<s)return;const l=xa(i,Go);if(at(e,l)||(t=e,e=l,!n))return;for(const v of o.all)v(e,t);if(wa(t)!==wa(e))for(const v of o.stable)v(e,t);const d=eh(t.plants.all,e.plants.all);for(const v of d.added)for(const k of o.plantAdded)k({plant:v});for(const v of d.removed)for(const k of o.plantRemoved)k({plant:v,tileIndex:v.tileIndex});const p=th(t.plants.mature,e.plants.mature,e.plants.all);for(const v of p)for(const k of o.plantMatured)k({plant:v});const f=oh(t.plants.all,e.plants.all);for(const v of f)for(const k of o.cropMutated)k(v);const m=nh(t.crops.mature,e.crops.mature,e.crops.all);for(const v of m)for(const k of o.cropMatured)k({crop:v});const b=ih(t.plants.all,e.plants.all,t.crops.all);for(const v of b)for(const k of o.cropHarvested)k(v);const h=ah(t.eggs.all,e.eggs.all);for(const v of h.added)for(const k of o.eggPlaced)k({egg:v});for(const v of h.removed)for(const k of o.eggRemoved)k({egg:v});const y=rh(t.eggs.mature,e.eggs.mature,e.eggs.all);for(const v of y)for(const k of o.eggMatured)k({egg:v});const S=sh(t.decors.all,e.decors.all);for(const v of S.added)for(const k of o.decorPlaced)k({decor:v});for(const v of S.removed)for(const k of o.decorRemoved)k({decor:v});}async function u(){if(n)return;const l=await Zf.onChangeNow(p=>{i.garden=p,a.add("garden"),c();});r.push(l);const d=await pe.subscribe("myUserSlotIdxAtom",p=>{i.mySlotIndex=p,a.add("mySlotIndex"),c();});r.push(d),n=true,a.size===s&&(e=xa(i,Go));}return u(),{get(){return e},subscribe(l,d){return o.all.add(l),d?.immediate!==false&&n&&a.size===s&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,d){return o.stable.add(l),d?.immediate!==false&&n&&a.size===s&&l(e,e),()=>o.stable.delete(l)},subscribePlantAdded(l,d){if(o.plantAdded.add(l),d?.immediate&&n&&a.size===s)for(const p of e.plants.all)l({plant:p});return ()=>o.plantAdded.delete(l)},subscribePlantRemoved(l,d){return o.plantRemoved.add(l),()=>o.plantRemoved.delete(l)},subscribePlantMatured(l,d){if(o.plantMatured.add(l),d?.immediate&&n&&a.size===s)for(const p of e.plants.mature)l({plant:p});return ()=>o.plantMatured.delete(l)},subscribeCropMutated(l,d){if(o.cropMutated.add(l),d?.immediate&&n&&a.size===s)for(const p of e.crops.mutated.all)l({crop:p,added:p.mutations,removed:[]});return ()=>o.cropMutated.delete(l)},subscribeCropMatured(l,d){if(o.cropMatured.add(l),d?.immediate&&n&&a.size===s)for(const p of e.crops.mature)l({crop:p});return ()=>o.cropMatured.delete(l)},subscribeCropHarvested(l,d){return o.cropHarvested.add(l),()=>o.cropHarvested.delete(l)},subscribeEggPlaced(l,d){if(o.eggPlaced.add(l),d?.immediate&&n&&a.size===s)for(const p of e.eggs.all)l({egg:p});return ()=>o.eggPlaced.delete(l)},subscribeEggRemoved(l,d){return o.eggRemoved.add(l),()=>o.eggRemoved.delete(l)},subscribeEggMatured(l,d){if(o.eggMatured.add(l),d?.immediate&&n&&a.size===s)for(const p of e.eggs.mature)l({egg:p});return ()=>o.eggMatured.delete(l)},subscribeDecorPlaced(l,d){if(o.decorPlaced.add(l),d?.immediate&&n&&a.size===s)for(const p of e.decors.all)l({decor:p});return ()=>o.decorPlaced.delete(l)},subscribeDecorRemoved(l,d){return o.decorRemoved.add(l),()=>o.decorRemoved.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.plantAdded.clear(),o.plantRemoved.clear(),o.plantMatured.clear(),o.cropMutated.clear(),o.cropMatured.clear(),o.cropHarvested.clear(),o.eggPlaced.clear(),o.eggRemoved.clear(),o.eggMatured.clear(),o.decorPlaced.clear(),o.decorRemoved.clear(),n=false;}}}let so=null;function Fl(){return so||(so=lh()),so}const ln={Gold:25,Rainbow:50,Frozen:10,Chilled:5,Wet:2},ch=new Set(["Gold","Rainbow"]),dh=new Set(["Frozen","Chilled","Wet"]);function Rl(e){let t=1,n=0,r=0;for(const o of e)o==="Gold"||o==="Rainbow"?o==="Rainbow"?t=ln.Rainbow:t===1&&(t=ln.Gold):o in ln&&(n+=ln[o],r++);return t*(1+n-r)}function uh(e){return ln[e]??null}function ph(e){return ch.has(e)}function fh(e){return dh.has(e)}function gh(e,t){const n=Oi(e);if(!n)return 50;const r=n.maxScale;if(t<=1)return 50;if(t>=r)return 100;const o=(t-1)/(r-1);return Math.floor(50+50*o)}function mh(e,t,n){const r=Oi(e);if(!r)return 0;const o=r.baseSellPrice,i=Rl(n);return Math.round(o*t*i)}function hh(e,t,n){if(n>=t)return 100;if(n<=e)return 0;const r=t-e,o=n-e;return Math.floor(o/r*100)}function bh(e,t){return t>=e}function Oi(e){const t=ue.get("plants");if(!t)return null;const n=t[e];return n?.crop?{baseSellPrice:n.crop.baseSellPrice??0,maxScale:n.crop.maxScale??1,growTime:n.crop.growTime??0}:null}const Ol=3600,lo=80,yh=100,cn=30;function Hr(e){return e/Ol}function Ur(e,t){const n=On(e);if(!n)return lo;const r=n.maxScale;if(t<=1)return lo;if(t>=r)return yh;const o=(t-1)/(r-1);return Math.floor(lo+20*o)}function Vr(e,t,n){const r=On(e);if(!r)return n-cn;const o=r.hoursToMature,i=t/Ol,a=cn/o,s=Math.min(a*i,cn),c=n-cn;return Math.floor(c+s)}function Kr(e,t){const n=On(e);return n?t>=n.hoursToMature:false}function Nl(e){const t=On(e);return t?cn/t.hoursToMature:0}function vh(e,t,n){const r=t-e;return r<=0||n<=0?0:r/n}function On(e){const t=ue.get("pets");if(!t)return null;const n=t[e];return n?{hoursToMature:n.hoursToMature??0,maxScale:n.maxScale??1,abilities:n.abilities??[]}:null}function xh(e,t){return t<=0?1:Math.min(1,e/t)}const $l={init(){},isReady(){return  true},crop:{calculateSize:gh,calculateSellPrice:mh,calculateProgress:hh,isReady:bh,getData:Oi},pet:{calculateAge:Hr,calculateMaxStrength:Ur,calculateCurrentStrength:Vr,isMature:Kr,calculateStrengthPerHour:Nl,getData:On},mutation:{calculateMultiplier:Rl,getValue:uh,isGrowth:ph,isEnvironmental:fh}},ka={inventory:"myPetInventoryAtom",hutch:"myPetHutchPetItemsAtom",active:"myPetInfosAtom",slotInfos:"myPetSlotInfosAtom",expandedPetSlotId:"expandedPetSlotIdAtom",myNumPetHutchItems:"myNumPetHutchItemsAtom"};function Sa(e,t){const n=Hr(e.xp),r=Ur(e.petSpecies,e.targetScale),o=Vr(e.petSpecies,e.xp,r),i=Kr(e.petSpecies,n);return {id:e.id,petSpecies:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,mutations:[...e.mutations],targetScale:e.targetScale,abilities:[...e.abilities],location:t,position:null,lastAbilityTrigger:null,growthStage:n,currentStrength:o,maxStrength:r,isMature:i}}function wh(e,t){const r=t[e.slot.id]?.lastAbilityTrigger??null,o=Hr(e.slot.xp),i=Ur(e.slot.petSpecies,e.slot.targetScale),a=Vr(e.slot.petSpecies,e.slot.xp,i),s=Kr(e.slot.petSpecies,o);return {id:e.slot.id,petSpecies:e.slot.petSpecies,name:e.slot.name,xp:e.slot.xp,hunger:e.slot.hunger,mutations:[...e.slot.mutations],targetScale:e.slot.targetScale,abilities:[...e.slot.abilities],location:"active",position:e.position?{x:e.position.x,y:e.position.y}:null,lastAbilityTrigger:r,growthStage:o,currentStrength:a,maxStrength:i,isMature:s}}function Ca(e){const t=new Set,n=[];for(const f of e.active??[]){const m=wh(f,e.slotInfos??{});n.push(m),t.add(m.id);}const r=[];for(const f of e.inventory??[]){if(t.has(f.id))continue;const m=Sa(f,"inventory");r.push(m),t.add(m.id);}const o=[];for(const f of e.hutch??[]){if(t.has(f.id))continue;const m=Sa(f,"hutch");o.push(m),t.add(m.id);}const i=[...n,...r,...o],a=e.expandedPetSlotId??null,s=a?i.find(f=>f.id===a)??null:null,l=Fl().get().decors.all.some(f=>f.decorId==="PetHutch"),d=e.myNumPetHutchItems??0;return {all:i,byLocation:{inventory:r,hutch:o,active:n},counts:{inventory:r.length,hutch:o.length,active:n.length,total:i.length},hutch:{hasHutch:l,currentItems:d,maxItems:25},expandedPetSlotId:a,expandedPet:s}}const Aa={all:[],byLocation:{inventory:[],hutch:[],active:[]},counts:{inventory:0,hutch:0,active:0,total:0},hutch:{hasHutch:false,currentItems:0,maxItems:25},expandedPetSlotId:null,expandedPet:null};function kh(e,t){if(e.length!==t.length)return  false;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return  false;return  true}function Ta(e){return JSON.stringify({id:e.id,petSpecies:e.petSpecies,name:e.name,mutations:e.mutations,abilities:e.abilities,location:e.location})}function Sh(e,t){if(e.all.length!==t.all.length)return  false;const n=e.all.map(Ta),r=t.all.map(Ta);return kh(n,r)}function Ch(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const i=r.get(o.id);i&&i.location!==o.location&&n.push({pet:o,from:i.location,to:o.location});}return n}function Ah(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){if(!o.lastAbilityTrigger)continue;const a=r.get(o.id)?.lastAbilityTrigger;(!a||a.abilityId!==o.lastAbilityTrigger.abilityId||a.performedAt!==o.lastAbilityTrigger.performedAt)&&n.push({pet:o,trigger:o.lastAbilityTrigger});}return n}function Th(e,t){const n=new Set(e.all.map(a=>a.id)),r=new Set(t.all.map(a=>a.id)),o=t.all.filter(a=>!n.has(a.id)),i=e.all.filter(a=>!r.has(a.id));return o.length===0&&i.length===0?null:{added:o,removed:i,counts:t.counts}}function Ih(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const i=r.get(o.id);i&&o.growthStage>i.growthStage&&n.push({pet:o,previousStage:i.growthStage,newStage:o.growthStage});}return n}function Eh(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const i=r.get(o.id);i&&o.currentStrength>i.currentStrength&&n.push({pet:o,previousStrength:i.currentStrength,newStrength:o.currentStrength});}return n}function Ph(e,t){const n=[],r=new Map(e.all.map(o=>[o.id,o]));for(const o of t.all){const i=r.get(o.id);i&&o.currentStrength===o.maxStrength&&i.currentStrength<i.maxStrength&&n.push({pet:o});}return n}function Mh(){let e=Aa,t=Aa,n=false;const r=[],o={all:new Set,stable:new Set,location:new Set,ability:new Set,count:new Set,expandedPet:new Set,growth:new Set,strengthGain:new Set,maxStrength:new Set},i={},a=Object.keys(ka),s=new Set;function c(){if(s.size<a.length)return;const l=Ca(i);if(at(e,l)||(t=e,e=l,!n))return;for(const y of o.all)y(e,t);if(!Sh(t,e))for(const y of o.stable)y(e,t);const d=Ch(t,e);for(const y of d)for(const S of o.location)S(y);const p=Ah(t,e);for(const y of p)for(const S of o.ability)S(y);const f=Th(t,e);if(f)for(const y of o.count)y(f);const m=Ih(t,e);for(const y of m)for(const S of o.growth)S(y);const b=Eh(t,e);for(const y of b)for(const S of o.strengthGain)S(y);const h=Ph(t,e);for(const y of h)for(const S of o.maxStrength)S(y);if(t.expandedPetSlotId!==e.expandedPetSlotId){const y={current:e.expandedPet,previous:t.expandedPet,currentId:e.expandedPetSlotId,previousId:t.expandedPetSlotId};for(const S of o.expandedPet)S(y);}}async function u(){if(n)return;const l=a.map(async d=>{const p=ka[d],f=await pe.subscribe(p,m=>{i[d]=m,s.add(d),c();});r.push(f);});await Promise.all(l),n=true,s.size===a.length&&(e=Ca(i));}return u(),{get(){return e},subscribe(l,d){return o.all.add(l),d?.immediate!==false&&n&&s.size===a.length&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,d){return o.stable.add(l),d?.immediate!==false&&n&&s.size===a.length&&l(e,e),()=>o.stable.delete(l)},subscribeLocation(l,d){if(o.location.add(l),d?.immediate&&n&&s.size===a.length)for(const p of e.all)l({pet:p,from:p.location,to:p.location});return ()=>o.location.delete(l)},subscribeAbility(l,d){if(o.ability.add(l),d?.immediate&&n&&s.size===a.length)for(const p of e.all)p.lastAbilityTrigger&&l({pet:p,trigger:p.lastAbilityTrigger});return ()=>o.ability.delete(l)},subscribeCount(l,d){return o.count.add(l),d?.immediate&&n&&s.size===a.length&&l({added:e.all,removed:[],counts:e.counts}),()=>o.count.delete(l)},subscribeExpandedPet(l,d){return o.expandedPet.add(l),d?.immediate&&n&&s.size===a.length&&l({current:e.expandedPet,previous:e.expandedPet,currentId:e.expandedPetSlotId,previousId:e.expandedPetSlotId}),()=>o.expandedPet.delete(l)},subscribeGrowth(l,d){if(o.growth.add(l),d?.immediate&&n&&s.size===a.length)for(const p of e.all)l({pet:p,previousStage:p.growthStage,newStage:p.growthStage});return ()=>o.growth.delete(l)},subscribeStrengthGain(l,d){if(o.strengthGain.add(l),d?.immediate&&n&&s.size===a.length)for(const p of e.all)l({pet:p,previousStrength:p.currentStrength,newStrength:p.currentStrength});return ()=>o.strengthGain.delete(l)},subscribeMaxStrength(l,d){if(o.maxStrength.add(l),d?.immediate&&n&&s.size===a.length)for(const p of e.all)p.currentStrength===p.maxStrength&&l({pet:p});return ()=>o.maxStrength.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.location.clear(),o.ability.clear(),o.count.clear(),o.expandedPet.clear(),o.growth.clear(),o.strengthGain.clear(),o.maxStrength.clear(),n=false;}}}let co=null;function Yr(){return co||(co=Mh()),co}const Ia={inventory:"myInventoryAtom",isFull:"isMyInventoryAtMaxLengthAtom",selectedItemIndex:"myValidatedSelectedItemIndexAtom"},Ea={items:[],favoritedItemIds:[],count:0,isFull:false,selectedItem:null};function Pa(e){const t=e.inventory,n=t?.items??[],r=t?.favoritedItemIds??[],o=e.selectedItemIndex;let i=null;return o!==null&&o>=0&&o<n.length&&(i={index:o,item:n[o]}),{items:n,favoritedItemIds:r,count:n.length,isFull:e.isFull??false,selectedItem:i}}function Ma(e){const t=e.items.map(n=>"id"in n?n.id:"species"in n&&n.itemType==="Seed"?`seed:${n.species}:${n.quantity}`:"toolId"in n?`tool:${n.toolId}:${n.quantity}`:"eggId"in n?`egg:${n.eggId}:${n.quantity}`:"decorId"in n?`decor:${n.decorId}:${n.quantity}`:JSON.stringify(n));return JSON.stringify({itemKeys:t,favoritedItemIds:e.favoritedItemIds,isFull:e.isFull,selectedItemIndex:e.selectedItem?.index??null})}function Lh(e,t){return Ma(e)===Ma(t)}function _h(e,t){return e===null&&t===null?false:e===null||t===null?true:e.index!==t.index}function er(e){return "id"in e?e.id:"species"in e&&e.itemType==="Seed"?`seed:${e.species}`:"toolId"in e?`tool:${e.toolId}`:"eggId"in e?`egg:${e.eggId}`:"decorId"in e?`decor:${e.decorId}`:JSON.stringify(e)}function Fh(e,t){const n=new Set(e.map(er)),r=new Set(t.map(er)),o=t.filter(a=>!n.has(er(a))),i=e.filter(a=>!r.has(er(a)));return o.length===0&&i.length===0?null:{added:o,removed:i,counts:{before:e.length,after:t.length}}}function Rh(e,t){const n=new Set(e),r=new Set(t),o=t.filter(a=>!n.has(a)),i=e.filter(a=>!r.has(a));return o.length===0&&i.length===0?null:{added:o,removed:i,current:t}}function Oh(){let e=Ea,t=Ea,n=false;const r=[],o={all:new Set,stable:new Set,selection:new Set,items:new Set,favorites:new Set},i={},a=Object.keys(Ia),s=new Set;function c(){if(s.size<a.length)return;const l=Pa(i);if(at(e,l)||(t=e,e=l,!n))return;for(const f of o.all)f(e,t);if(!Lh(t,e))for(const f of o.stable)f(e,t);if(_h(t.selectedItem,e.selectedItem)){const f={current:e.selectedItem,previous:t.selectedItem};for(const m of o.selection)m(f);}const d=Fh(t.items,e.items);if(d)for(const f of o.items)f(d);const p=Rh(t.favoritedItemIds,e.favoritedItemIds);if(p)for(const f of o.favorites)f(p);}async function u(){if(n)return;const l=a.map(async d=>{const p=Ia[d],f=await pe.subscribe(p,m=>{i[d]=m,s.add(d),c();});r.push(f);});await Promise.all(l),n=true,s.size===a.length&&(e=Pa(i));}return u(),{get(){return e},subscribe(l,d){return o.all.add(l),d?.immediate!==false&&n&&s.size===a.length&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,d){return o.stable.add(l),d?.immediate!==false&&n&&s.size===a.length&&l(e,e),()=>o.stable.delete(l)},subscribeSelection(l,d){return o.selection.add(l),d?.immediate&&n&&s.size===a.length&&l({current:e.selectedItem,previous:e.selectedItem}),()=>o.selection.delete(l)},subscribeItems(l,d){return o.items.add(l),d?.immediate&&n&&s.size===a.length&&l({added:e.items,removed:[],counts:{before:0,after:e.count}}),()=>o.items.delete(l)},subscribeFavorites(l,d){return o.favorites.add(l),d?.immediate&&n&&s.size===a.length&&l({added:e.favoritedItemIds,removed:[],current:e.favoritedItemIds}),()=>o.favorites.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.selection.clear(),o.items.clear(),o.favorites.clear(),n=false;}}}let uo=null;function Ft(){return uo||(uo=Oh()),uo}const Ho={all:[],host:null,myPlayer:null,count:0};function Nh(e,t,n){const r=n.get(e.id),o=r?.slot,i=o?.data,a=o?.lastActionEvent;return {id:e.id,name:e.name,discordId:e.databaseUserId,discordAvatarUrl:e.discordAvatarUrl,guildId:e.guildId,isConnected:e.isConnected,isHost:e.id===t,slotIndex:r?.index??null,position:o?.position??null,cosmetic:{color:e.cosmetic?.color??"",avatar:e.cosmetic?.avatar?[...e.cosmetic.avatar]:[]},emote:{type:e.emoteData?.emoteType??-1},coins:i?.coinsCount??0,inventory:i?.inventory??null,shopPurchases:i?.shopPurchases??null,garden:i?.garden??null,pets:{slots:i?.petSlots??[],slotInfos:o?.petSlotInfos??null},journal:i?.journal??null,stats:i?.stats??null,tasksCompleted:i?.tasksCompleted??[],activityLogs:i?.activityLogs??[],customRestocks:{config:i?.customRestocks??null,inventories:o?.customRestockInventories??null},lastAction:a?{type:a.action,data:a.data,timestamp:a.timestamp}:null,selectedItemIndex:o?.notAuthoritative_selectedItemIndex??null,lastSlotMachineInfo:o?.lastSlotMachineInfo??null}}function La(e){const t=e.players,n=e.hostPlayerId??"",r=e.userSlots??[];if(!t||!Array.isArray(t)||t.length===0)return Ho;const o=new Map;Array.isArray(r)&&r.forEach((c,u)=>{c?.type==="user"&&c?.playerId&&o.set(c.playerId,{slot:c,index:u});});const i=t.map(c=>Nh(c,n,o)),a=i.find(c=>c.isHost)??null,s=i.find(c=>c.slotIndex!==null&&c.slotIndex>=0)??null;return {all:i,host:a,myPlayer:s,count:i.length}}function _a(e){const t=e.all.map(n=>`${n.id}:${n.isConnected}:${n.isHost}`);return JSON.stringify({playerKeys:t,hostId:e.host?.id??null,count:e.count})}function $h(e,t){const n=[],r=new Set(e.map(i=>i.id)),o=new Set(t.map(i=>i.id));for(const i of t)r.has(i.id)||n.push({player:i,type:"join"});for(const i of e)o.has(i.id)||n.push({player:i,type:"leave"});return n}function Dh(e,t){const n=[],r=new Map(e.map(o=>[o.id,o]));for(const o of t){const i=r.get(o.id);i&&i.isConnected!==o.isConnected&&n.push({player:o,isConnected:o.isConnected});}return n}function jh(){let e=Ho,t=Ho,n=false;const r=[],o={all:new Set,stable:new Set,joinLeave:new Set,connection:new Set,host:new Set},i={},a=new Set,s=3;function c(){if(a.size<s)return;const l=La(i);if(at(e,l)||(t=e,e=l,!n))return;for(const b of o.all)b(e,t);if(_a(t)!==_a(e))for(const b of o.stable)b(e,t);const d=$h(t.all,e.all);for(const b of d)for(const h of o.joinLeave)h(b);const p=Dh(t.all,e.all);for(const b of p)for(const h of o.connection)h(b);const f=t.host?.id??null,m=e.host?.id??null;if(f!==m){const b={current:e.host,previous:t.host};for(const h of o.host)h(b);}}async function u(){if(n)return;const l=await Jf.onChangeNow(f=>{i.players=f,a.add("players"),c();});r.push(l);const d=await Qf.onChangeNow(f=>{i.hostPlayerId=f,a.add("hostPlayerId"),c();});r.push(d);const p=await Xf.onChangeNow(f=>{i.userSlots=f,a.add("userSlots"),c();});r.push(p),n=true,a.size===s&&(e=La(i));}return u(),{get(){return e},subscribe(l,d){return o.all.add(l),d?.immediate!==false&&n&&a.size===s&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,d){return o.stable.add(l),d?.immediate!==false&&n&&a.size===s&&l(e,e),()=>o.stable.delete(l)},subscribeJoinLeave(l,d){if(o.joinLeave.add(l),d?.immediate&&n&&a.size===s)for(const p of e.all)l({player:p,type:"join"});return ()=>o.joinLeave.delete(l)},subscribeConnection(l,d){if(o.connection.add(l),d?.immediate&&n&&a.size===s)for(const p of e.all)l({player:p,isConnected:p.isConnected});return ()=>o.connection.delete(l)},subscribeHost(l,d){return o.host.add(l),d?.immediate&&n&&a.size===s&&l({current:e.host,previous:e.host}),()=>o.host.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.joinLeave.clear(),o.connection.clear(),o.host.clear(),n=false;}}}let po=null;function Dl(){return po||(po=jh()),po}const Nn=["seed","tool","egg","decor"];function zh(e,t){switch(t){case "seed":return e.species??e.itemType;case "tool":return e.toolId??e.itemType;case "egg":return e.eggId??e.itemType;case "decor":return e.decorId??e.itemType;default:return e.itemType}}function Bh(e,t,n){const r=zh(e,t),o=n[r]??0,i=Math.max(0,e.initialStock-o);return {id:r,itemType:e.itemType,initialStock:e.initialStock,purchased:o,remaining:i,isAvailable:i>0}}function Gh(e,t,n){if(!t)return {type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null};const o=n[e]?.purchases??{},i=(t.inventory??[]).map(u=>Bh(u,e,o)),a=i.filter(u=>u.isAvailable).length,s=t.secondsUntilRestock??0,c=s>0?Date.now()+s*1e3:null;return {type:e,items:i,availableCount:a,totalCount:i.length,secondsUntilRestock:s,restockAt:c}}function Fa(e){const t=e.shops,n=e.purchases??{},r=Nn.map(s=>Gh(s,t?.[s],n)),o={seed:r[0],tool:r[1],egg:r[2],decor:r[3]},i=r.filter(s=>s.restockAt!==null);let a=null;if(i.length>0){const c=i.sort((u,l)=>(u.restockAt??0)-(l.restockAt??0))[0];a={shop:c.type,seconds:c.secondsUntilRestock,at:c.restockAt};}return {all:r,byType:o,nextRestock:a}}const Ra={all:Nn.map(e=>({type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null})),byType:{seed:{type:"seed",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},tool:{type:"tool",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},egg:{type:"egg",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},decor:{type:"decor",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null}},nextRestock:null};function Oa(e){return JSON.stringify({shops:e.all.map(t=>({type:t.type,itemCount:t.items.length,availableCount:t.availableCount}))})}function Wh(e,t){const n=e.secondsUntilRestock,r=t.secondsUntilRestock;return n>0&&n<=5&&r>n||n>0&&r===0&&t.items.some(i=>i.purchased===0)?{shop:t,previousItems:e.items}:null}function Hh(e,t){const n=[];for(const r of Nn){const o=e.byType[r],i=t.byType[r],a=new Map(o.items.map(s=>[s.id,s]));for(const s of i.items){const c=a.get(s.id);c&&s.purchased>c.purchased&&n.push({shopType:r,itemId:s.id,quantity:s.purchased-c.purchased,newPurchased:s.purchased,remaining:s.remaining});}}return n}function Uh(e,t){const n=[];for(const r of Nn){const o=e.byType[r],i=t.byType[r],a=new Map(o.items.map(s=>[s.id,s]));for(const s of i.items){const c=a.get(s.id);c&&c.isAvailable!==s.isAvailable&&n.push({shopType:r,itemId:s.id,wasAvailable:c.isAvailable,isAvailable:s.isAvailable});}}return n}function Vh(){let e=Ra,t=Ra,n=false;const r=[],o={all:new Set,stable:new Set,seedRestock:new Set,toolRestock:new Set,eggRestock:new Set,decorRestock:new Set,purchase:new Set,availability:new Set},i={},a=new Set,s=2;function c(){if(a.size<s)return;const l=Fa(i);if(at(e,l)||(t=e,e=l,!n))return;for(const m of o.all)m(e,t);if(Oa(t)!==Oa(e))for(const m of o.stable)m(e,t);const d={seed:o.seedRestock,tool:o.toolRestock,egg:o.eggRestock,decor:o.decorRestock};for(const m of Nn){const b=Wh(t.byType[m],e.byType[m]);if(b)for(const h of d[m])h(b);}const p=Hh(t,e);for(const m of p)for(const b of o.purchase)b(m);const f=Uh(t,e);for(const m of f)for(const b of o.availability)b(m);}async function u(){if(n)return;const l=await eg.onChangeNow(p=>{i.shops=p,a.add("shops"),c();});r.push(l);const d=await tg.onChangeNow(p=>{i.purchases=p,a.add("purchases"),c();});r.push(d),n=true,a.size===s&&(e=Fa(i));}return u(),{get(){return e},getShop(l){return e.byType[l]},getItem(l,d){return e.byType[l].items.find(f=>f.id===d)??null},subscribe(l,d){return o.all.add(l),d?.immediate!==false&&n&&a.size===s&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,d){return o.stable.add(l),d?.immediate!==false&&n&&a.size===s&&l(e,e),()=>o.stable.delete(l)},subscribeSeedRestock(l,d){return o.seedRestock.add(l),d?.immediate&&n&&a.size===s&&l({shop:e.byType.seed,previousItems:[]}),()=>o.seedRestock.delete(l)},subscribeToolRestock(l,d){return o.toolRestock.add(l),d?.immediate&&n&&a.size===s&&l({shop:e.byType.tool,previousItems:[]}),()=>o.toolRestock.delete(l)},subscribeEggRestock(l,d){return o.eggRestock.add(l),d?.immediate&&n&&a.size===s&&l({shop:e.byType.egg,previousItems:[]}),()=>o.eggRestock.delete(l)},subscribeDecorRestock(l,d){return o.decorRestock.add(l),d?.immediate&&n&&a.size===s&&l({shop:e.byType.decor,previousItems:[]}),()=>o.decorRestock.delete(l)},subscribePurchase(l,d){if(o.purchase.add(l),d?.immediate&&n&&a.size===s)for(const p of e.all)for(const f of p.items)f.purchased>0&&l({shopType:p.type,itemId:f.id,quantity:f.purchased,newPurchased:f.purchased,remaining:f.remaining});return ()=>o.purchase.delete(l)},subscribeAvailability(l,d){if(o.availability.add(l),d?.immediate&&n&&a.size===s)for(const p of e.all)for(const f of p.items)l({shopType:p.type,itemId:f.id,wasAvailable:f.isAvailable,isAvailable:f.isAvailable});return ()=>o.availability.delete(l)},destroy(){for(const l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.seedRestock.clear(),o.toolRestock.clear(),o.eggRestock.clear(),o.decorRestock.clear(),o.purchase.clear(),o.availability.clear(),n=false;}}}let fo=null;function Kh(){return fo||(fo=Vh()),fo}const Yh=["Sunny","Rain","Frost","Dawn","AmberMoon"];function qh(e){return Yh.includes(e)}const Uo={type:"Sunny",isActive:false,startTime:null,endTime:null,remainingSeconds:0};function Xh(e){if(!e)return Uo;const t=Date.now(),n=e.endTime??0,r=Math.max(0,n-t),o=Math.floor(r/1e3),i=o>0,a=e.type??"Sunny";return {type:qh(a)?a:"Sunny",isActive:i,startTime:e.startTime??null,endTime:e.endTime??null,remainingSeconds:o}}function Jh(){let e=Uo,t=Uo,n=false,r=null;const o={all:new Set,change:new Set};function i(s){const c=Xh(s);if(e.type===c.type&&e.isActive===c.isActive&&e.startTime===c.startTime&&e.endTime===c.endTime){e=c;return}if(t=e,e=c,!!n){for(const u of o.all)u(e,t);if(t.type!==e.type||t.isActive!==e.isActive){const u={current:e,previous:t};for(const l of o.change)l(u);}}}async function a(){n||(r=await ng.onChangeNow(s=>{i(s);}),n=true);}return a(),{get(){return e},subscribe(s,c){return o.all.add(s),c?.immediate!==false&&n&&s(e,e),()=>o.all.delete(s)},subscribeChange(s,c){return o.change.add(s),c?.immediate&&n&&s({current:e,previous:e}),()=>o.change.delete(s)},destroy(){r?.(),r=null,o.all.clear(),o.change.clear(),n=false;}}}let go=null;function Qh(){return go||(go=Jh()),go}let Ce=null;function jl(){return Ce||(Ce={currentTile:Ym(),myPets:Yr(),gameMap:Go(),myInventory:Ft(),players:Dl(),shops:Kh(),weather:Qh(),myGarden:Fl()},Ce)}function lt(){if(!Ce)throw new Error("[Globals] Not initialized. Call initGlobals() first.");return Ce}function Zh(){Ce&&(Ce.currentTile.destroy(),Ce.myPets.destroy(),Ce.gameMap.destroy(),Ce.myInventory.destroy(),Ce.players.destroy(),Ce.shops.destroy(),Ce.weather.destroy(),Ce.myGarden.destroy(),Ce=null);}const it={get currentTile(){return lt().currentTile},get myPets(){return lt().myPets},get gameMap(){return lt().gameMap},get myInventory(){return lt().myInventory},get players(){return lt().players},get shops(){return lt().shops},get weather(){return lt().weather},get myGarden(){return lt().myGarden}},eb=100,vn=[];let Vo=null;function tb(){const e=g("div",{className:"ws-logger",style:"display: flex; flex-direction: column; gap: 8px; font-family: monospace; font-size: 11px; height: 100%; overflow: hidden;"}),t=g("div",{style:"display: flex; justify-content: space-between; align-items: center; padding: 0 4px;"});t.appendChild(g("span",{textContent:"Live Traffic (Last 100)",style:"opacity: 0.6;"}));const n=g("button",{textContent:"Clear",style:"background: none; border: 1px solid rgba(255,255,255,0.2); color: #fff; cursor: pointer; padding: 2px 8px; border-radius: 4px; font-size: 10px;",onclick:()=>{vn.length=0,a();}});t.appendChild(n),e.appendChild(t);const r=g("div",{style:"flex: 1; overflow-y: auto; background: #000; padding: 4px; border-radius: 4px; border: 1px solid var(--border-color); display: flex; flex-direction: column;"}),o=g("div",{style:"height: 150px; border-top: 1px solid var(--border-color); overflow: auto; background: rgba(0,0,0,0.5); padding: 8px; display: none;"}),i=g("pre",{style:"margin: 0; color: var(--color-primary); font-size: 10px;"});o.appendChild(i);const a=()=>{r.innerHTML="",vn.slice().reverse().forEach(s=>{const c=g("div",{className:"ws-log-row",style:`padding: 4px; border-bottom: 1px solid #111; cursor: pointer; color: ${s.direction==="in"?"#4CAF50":"#2196F3"}; display: flex; gap: 8px;`}),u=new Date(s.timestamp).toLocaleTimeString([],{hour12:false,hour:"2-digit",minute:"2-digit",second:"2-digit"});c.appendChild(g("span",{textContent:u,style:"opacity: 0.4; flex-shrink: 0;"})),c.appendChild(g("strong",{textContent:s.direction.toUpperCase(),style:"width: 25px; flex-shrink: 0;"})),c.appendChild(g("span",{textContent:s.type,style:"font-weight: bold; flex-shrink: 0;"})),c.appendChild(g("span",{textContent:s.summary,style:"opacity: 0.8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"})),c.addEventListener("click",()=>{r.querySelectorAll(".ws-log-row").forEach(d=>d.style.background=""),c.style.background="rgba(255,255,255,0.1)",o.style.display="block",i.textContent=JSON.stringify(s.payload,null,2);}),r.appendChild(c);});};return Vo=a,e.appendChild(r),e.appendChild(o),a(),e}function Ko(e,t,n){let r="";if(n&&typeof n=="object"){if(t==="PartialState"){const o=n.op||"",i=n.path||"";let a="";if("value"in n){const s=n.value;a=typeof s=="object"?`{${Object.keys(s||{}).slice(0,2).join(",")}}`:String(s);}if(o||i)r=`PartialState : ${o} ${i} ${a}`.trim();else {const s=Object.keys(n).filter(c=>c!=="type");s.length>0&&(r=`PartialState - {${s.join(", ")}}`);}}if(!r&&n.event&&(r+=`${n.event} `),!r&&n.op&&(r+=`op:${n.op} `),!r&&n.data){const o=Object.keys(n.data);o.length>0&&(r+=`{${o.slice(0,3).join(",")}${o.length>3?"...":""}}`);}else !r&&Array.isArray(n)&&(r+=`[${n.length} items]`);}else typeof n=="string"&&(r=n.slice(0,50));vn.push({direction:e,type:String(t),timestamp:Date.now(),payload:n,summary:r.trim()||"-"}),vn.length>eb&&vn.shift(),Vo&&Vo();}const Le={nativeCtor:null,captured:[],latestOpen:null},Na=Symbol.for("ariesmod.ws.capture.wrapped"),$a=Symbol.for("ariesmod.ws.capture.native"),zl=1;function Yo(e){return !!e&&e.readyState===zl}function nb(){if(Yo(Le.latestOpen))return Le.latestOpen;for(let e=Le.captured.length-1;e>=0;e--){const t=Le.captured[e];if(Yo(t))return t}return null}function rb(e,t){Le.captured.push(e),Le.captured.length>25&&Le.captured.splice(0,Le.captured.length-25);const n=()=>{Le.latestOpen=e,t&&console.log("[WS] captured socket opened",e.url);};e.addEventListener("open",n),e.addEventListener("close",()=>{Le.latestOpen===e&&(Le.latestOpen=null),t&&console.log("[WS] captured socket closed",e.url);}),e.addEventListener("message",r=>{try{const o=JSON.parse(r.data);Ko("in",o.type||"unknown",o);}catch{Ko("in","raw",r.data);}}),e.readyState===zl&&n();}function ob(e=R,t={}){const n=!!t.debug,r=e?.WebSocket;if(typeof r!="function")return ()=>{};if(r[Na])return Le.nativeCtor=r[$a]??Le.nativeCtor??null,()=>{};const o=r;Le.nativeCtor=o;function i(a,s){const c=s!==void 0?new o(a,s):new o(a);try{rb(c,n);}catch{}return c}try{i.prototype=o.prototype;}catch{}try{Object.setPrototypeOf(i,o);}catch{}try{i.CONNECTING=o.CONNECTING,i.OPEN=o.OPEN,i.CLOSING=o.CLOSING,i.CLOSED=o.CLOSED;}catch{}i[Na]=true,i[$a]=o;try{e.WebSocket=i,n&&console.log("[WS] WebSocket capture installed");}catch{return ()=>{}}return ()=>{try{e.WebSocket===i&&(e.WebSocket=o);}catch{}}}function ib(e=R){const t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function _r(e=R){const t=nb();if(t)return {ws:t,source:"captured"};const n=ib(e);return n?{ws:n,source:"roomConnection"}:{ws:null,source:null}}function Bl(e,t={}){const n=t.pageWindow??R,r=t.intervalMs??500,o=!!t.debug;let i=null,a=null;const s=()=>{const u=_r(n);(u.ws!==i||u.source!==a)&&(i=u.ws,a=u.source,o&&console.log("[WS] best socket changed:",u.source,u.ws),e(u));};s();const c=setInterval(s,r);return ()=>clearInterval(c)}function ab(e){if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return null}}function sb(e,t=R){const n=t?.MagicCircle_RoomConnection;if(n&&typeof n.sendMessage=="function")try{return Array.isArray(e)?n.sendMessage(...e):n.sendMessage(e),{ok:!0}}catch(i){return {ok:false,reason:"error",error:i}}const{ws:r}=_r(t);if(!r)return {ok:false,reason:"no-ws"};if(!Yo(r))return {ok:false,reason:"not-open"};const o=ab(e);if(o==null)return {ok:false,reason:"error",error:new Error("Cannot stringify message")};try{const i=JSON.parse(o);Ko("out",i.type||"unknown",i);}catch{}try{return r.send(o),{ok:!0}}catch(i){return {ok:false,reason:"error",error:i}}}function lb(e,t={},n=R){return sb({type:e,...t},n)}const dt={Welcome:"Welcome",PartialState:"PartialState",ServerErrorMessage:"ServerErrorMessage",Config:"Config",InappropriateContentRejected:"InappropriateContentRejected",Emote:"Emote",CurrencyTransaction:"CurrencyTransaction",Pong:"Pong"},_={Chat:"Chat",Emote:"Emote",Wish:"Wish",KickPlayer:"KickPlayer",SetPlayerData:"SetPlayerData",UsurpHost:"UsurpHost",Dev:"Dev",SetSelectedGame:"SetSelectedGame",VoteForGame:"VoteForGame",RequestGame:"RequestGame",RestartGame:"RestartGame",Ping:"Ping",PlayerPosition:"PlayerPosition",Teleport:"Teleport",CheckWeatherStatus:"CheckWeatherStatus",MoveInventoryItem:"MoveInventoryItem",DropObject:"DropObject",PickupObject:"PickupObject",ToggleFavoriteItem:"ToggleFavoriteItem",PutItemInStorage:"PutItemInStorage",RetrieveItemFromStorage:"RetrieveItemFromStorage",MoveStorageItem:"MoveStorageItem",LogItems:"LogItems",PlantSeed:"PlantSeed",WaterPlant:"WaterPlant",HarvestCrop:"HarvestCrop",SellAllCrops:"SellAllCrops",PurchaseSeed:"PurchaseSeed",PurchaseEgg:"PurchaseEgg",PurchaseTool:"PurchaseTool",PurchaseDecor:"PurchaseDecor",PlantEgg:"PlantEgg",HatchEgg:"HatchEgg",PlantGardenPlant:"PlantGardenPlant",PotPlant:"PotPlant",MutationPotion:"MutationPotion",PickupDecor:"PickupDecor",PlaceDecor:"PlaceDecor",RemoveGardenObject:"RemoveGardenObject",PlacePet:"PlacePet",FeedPet:"FeedPet",PetPositions:"PetPositions",SwapPet:"SwapPet",StorePet:"StorePet",NamePet:"NamePet",SellPet:"SellPet",ReportSpeakingStart:"ReportSpeakingStart"};var Qe=(e=>(e[e.ReconnectInitiated=4100]="ReconnectInitiated",e[e.PlayerLeftVoluntarily=4200]="PlayerLeftVoluntarily",e[e.UserSessionSuperseded=4250]="UserSessionSuperseded",e[e.ConnectionSuperseded=4300]="ConnectionSuperseded",e[e.ServerDisposed=4310]="ServerDisposed",e[e.HeartbeatExpired=4400]="HeartbeatExpired",e[e.PlayerKicked=4500]="PlayerKicked",e[e.VersionMismatch=4700]="VersionMismatch",e[e.VersionExpired=4710]="VersionExpired",e[e.AuthenticationFailure=4800]="AuthenticationFailure",e))(Qe||{});new Set(Object.values(dt));new Set(Object.values(_));const cb=["Room","Quinoa"],db={Room:["Room"],Quinoa:cb};function Z(e,t={},n=R){const r=t,{scopePath:o,scope:i,...a}=r,s=typeof o=="string"?o:i,c=Array.isArray(o)?o:s==="Room"||s==="Quinoa"?db[s]:null;return lb(e,c?{scopePath:c,...a}:a,n)}function ub(e,t=R){return Z(_.Chat,{scope:"Room",message:e},t)}function pb(e,t=R){return Z(_.Emote,{scope:"Room",emoteType:e},t)}function fb(e,t=R){return Z(_.Wish,{scope:"Quinoa",wish:e},t)}function gb(e,t=R){return Z(_.KickPlayer,{scope:"Room",playerId:e},t)}function mb(e,t=R){return Z(_.SetPlayerData,{scope:"Room",data:e},t)}function hb(e=R){return Z(_.UsurpHost,{scope:"Quinoa"},e)}function bb(e=R){return Z(_.ReportSpeakingStart,{scope:"Quinoa"},e)}function yb(e,t=R){return Z(_.SetSelectedGame,{scope:"Room",gameId:e},t)}function vb(e,t=R){return Z(_.VoteForGame,{scope:"Room",gameId:e},t)}function xb(e,t=R){return Z(_.RequestGame,{scope:"Room",gameId:e},t)}function wb(e=R){return Z(_.RestartGame,{scope:"Room"},e)}function kb(e,t=R){return Z(_.Ping,{scope:"Quinoa",id:e},t)}function Gl(e,t,n=R){return Z(_.PlayerPosition,{scope:"Quinoa",x:e,y:t},n)}const Sb=Gl;function Cb(e,t,n=R){return Z(_.Teleport,{scope:"Quinoa",x:e,y:t},n)}function Ab(e=R){return Z(_.CheckWeatherStatus,{scope:"Quinoa"},e)}function Tb(e,t,n=R){return Z(_.MoveInventoryItem,{scope:"Quinoa",fromIndex:e,toIndex:t},n)}function Ib(e,t=R){return Z(_.DropObject,{scope:"Quinoa",slotIndex:e},t)}function Eb(e,t=R){return Z(_.PickupObject,{scope:"Quinoa",objectId:e},t)}function qr(e,t=R){return Z(_.ToggleFavoriteItem,{scope:"Quinoa",itemId:e},t)}function Ni(e,t="PetHutch",n=R){return Z(_.PutItemInStorage,{scope:"Quinoa",itemId:e,storageId:t},n)}function $i(e,t="PetHutch",n=R){return Z(_.RetrieveItemFromStorage,{scope:"Quinoa",itemId:e,storageId:t},n)}function Pb(e,t,n=R){return Z(_.MoveStorageItem,{scope:"Quinoa",fromIndex:e,toIndex:t},n)}function Mb(e=R){return Z(_.LogItems,{scope:"Quinoa"},e)}function Lb(e,t,n,r=R){return Z(_.PlantSeed,{scope:"Quinoa",seedId:e,x:t,y:n},r)}function _b(e,t=R){return Z(_.WaterPlant,{scope:"Quinoa",plantId:e},t)}function Fb(e,t=R){return Z(_.HarvestCrop,{scope:"Quinoa",cropId:e},t)}function Rb(e=R){return Z(_.SellAllCrops,{scope:"Quinoa"},e)}function Ob(e,t=R){return Z(_.PurchaseDecor,{scope:"Quinoa",decorId:e},t)}function Nb(e,t=R){return Z(_.PurchaseEgg,{scope:"Quinoa",eggId:e},t)}function $b(e,t=R){return Z(_.PurchaseTool,{scope:"Quinoa",toolId:e},t)}function Db(e,t=R){return Z(_.PurchaseSeed,{scope:"Quinoa",seedId:e},t)}function jb(e,t,n,r=R){return Z(_.PlantEgg,{scope:"Quinoa",eggId:e,x:t,y:n},r)}function zb(e,t=R){return Z(_.HatchEgg,{scope:"Quinoa",eggId:e},t)}function Bb(e,t,n,r=R){return Z(_.PlantGardenPlant,{scope:"Quinoa",plantId:e,x:t,y:n},r)}function Gb(e,t,n=R){return Z(_.PotPlant,{scope:"Quinoa",plantId:e,potId:t},n)}function Wb(e,t,n=R){return Z(_.MutationPotion,{scope:"Quinoa",potionId:e,targetId:t},n)}function Hb(e,t=R){return Z(_.PickupDecor,{scope:"Quinoa",decorInstanceId:e},t)}function Ub(e,t,n,r=R){return Z(_.PlaceDecor,{scope:"Quinoa",decorId:e,x:t,y:n},r)}function Vb(e,t=R){return Z(_.RemoveGardenObject,{scope:"Quinoa",objectId:e},t)}function Wl(e,t={x:0,y:0},n="Dirt",r=0,o=R){return Z(_.PlacePet,{scope:"Quinoa",itemId:e,position:t,tileType:n,localTileIndex:r},o)}function Kb(e,t,n=R){return Z(_.FeedPet,{scope:"Quinoa",petId:e,foodItemId:t},n)}function Yb(e,t=R){return Z(_.PetPositions,{scope:"Quinoa",positions:e},t)}function Hl(e,t,n=R){return Z(_.SwapPet,{scope:"Quinoa",petSlotId:e,petInventoryId:t},n)}function Ul(e,t=R){return Z(_.StorePet,{scope:"Quinoa",itemId:e},t)}function qb(e,t,n=R){return Z(_.NamePet,{scope:"Quinoa",petId:e,name:t},n)}function Xb(e,t=R){return Z(_.SellPet,{scope:"Quinoa",petId:e},t)}let vr=null;const xn=new Set;function qo(){const e=Pt();if(!e.enabled){console.log("[AutoFavorite] Disabled");return}xn.clear(),vr=Ft().subscribeItems(t=>{if(t.added.length>0){const n=Pt();for(const r of t.added)Qb(r,n);}}),console.log(`✅ [AutoFavorite] Started - Watching ${e.simple.favoriteSpecies.length} species, ${e.simple.favoriteMutations.length} mutations`);}function Vl(){vr&&(vr(),vr=null),xn.clear(),console.log("🛑 [AutoFavorite] Stopped");}function Jb(e){const t=Pt();t.enabled=e,t.simple.enabled=e,Ll(t),e?qo():Vl();}function Qb(e,t){if(e.itemType!=="Produce"&&e.itemType!=="Pet")return;if(!e.id){console.warn("[AutoFavorite] Item has no ID:",e);return}if(!(xn.has(e.id)||e.isFavorited||e.favorited)&&Kl(e,t.simple)){xn.add(e.id);try{qr(e.id),console.log(`[AutoFavorite] ⭐ Favorited ${e.itemType}: ${e.species||e.id}`);}catch(r){console.error("[AutoFavorite] WebSocket error:",r),xn.delete(e.id);}}}function Kl(e,t){if(!t.enabled)return  false;const n=e.itemType==="Pet"?e.petSpecies:e.species;return n?!!(t.favoriteSpecies.includes(n)||t.favoriteMutations.length>0&&(e.mutations||[]).some(o=>t.favoriteMutations.includes(o))):false}function Zb(){return Object.keys(ue.get("mutations")??{})}const Di={init(){this.isReady()||qo();},isReady(){return ga()},DEFAULT_CONFIG:Ml,STORAGE_KEY:_i,loadConfig:Pt,saveConfig:Fi,updateConfig:Ll,updateSimpleConfig:Ri,setFavoriteSpecies:$m,setFavoriteMutations:Dm,isEnabled:ga,start:qo,stop:Vl,setEnabled:Jb,shouldFavorite:Kl,getGameMutations:Zb},ji=Re.JOURNAL_CHECKER,Yl={enabled:false,autoRefresh:true,refreshIntervalMs:3e4};function Qt(){return Ae(ji,Yl)}function Xr(e){Ge(ji,e);}function Da(){return Qt().enabled}function ey(e){const t=Qt();t.autoRefresh=e,Xr(t);}function ty(e){const t=Qt();t.refreshIntervalMs=e,Xr(t);}let mo=null,ja=null;function ql(){try{return Dl().get().myPlayer?.journal||null}catch{return null}}function ny(e){return e?`pro:${Object.keys(e.produce).length}-pet:${Object.keys(e.pets).length}`:"null"}function Xl(){const e=ue.get("mutations")??{};return ["Normal",...Object.keys(e),"Max Weight"]}function Jl(){const e=ue.get("mutations")??{};return ["Normal",...Object.entries(e).filter(([n,r])=>!("tileRef"in r)).map(([n])=>n),"Max Weight"]}function ry(){return Object.keys(ue.get("mutations")??{})}function Ql(e){const n=(ue.get("pets")??{})[e];if(!n)return [];const r=new Set;return Array.isArray(n.abilities)&&n.abilities.forEach(o=>r.add(o)),Array.isArray(n.possibleAbilities)&&n.possibleAbilities.forEach(o=>r.add(o)),n.abilityTiers&&Object.values(n.abilityTiers).forEach(o=>{Array.isArray(o)&&o.forEach(i=>r.add(i));}),[...r]}function Zl(e){const t=ue.get("plants")??{},n=Object.keys(t),r=Xl(),o=e?.produce??{},i=[];let a=0;for(const u of n){const d=o[u]?.variantsLogged?.map(f=>f.variant)??[],p=r.filter(f=>!d.includes(f));a+=d.length,i.push({species:u,variantsLogged:d,variantsMissing:p,variantsTotal:r.length,variantsPercentage:r.length>0?d.length/r.length*100:0,isComplete:p.length===0});}const s=n.length*r.length,c=i.filter(u=>u.variantsLogged.length>0).length;return {total:n.length,logged:c,percentage:n.length>0?c/n.length*100:0,speciesDetails:i,variantsTotal:s,variantsLogged:a,variantsPercentage:s>0?a/s*100:0}}function ec(e){const t=ue.get("pets")??{},n=Object.keys(t),r=Jl(),o=e?.pets??{},i=[];let a=0,s=0,c=0,u=0;for(const d of n){const p=o[d],f=p?.variantsLogged?.map(S=>S.variant)??[],m=p?.abilitiesLogged?.map(S=>S.ability)??[],b=r.filter(S=>!f.includes(S)),h=Ql(d),y=h.filter(S=>!m.includes(S));s+=r.length,a+=f.length,u+=h.length,c+=Math.min(m.length,h.length),i.push({species:d,variantsLogged:f,variantsMissing:b,variantsTotal:r.length,variantsPercentage:r.length>0?f.length/r.length*100:0,abilitiesLogged:m,abilitiesMissing:y,abilitiesTotal:h.length,abilitiesPercentage:h.length>0?m.length/h.length*100:0,isComplete:b.length===0&&(h.length===0||y.length===0)});}const l=i.filter(d=>d.variantsLogged.length>0).length;return {total:n.length,logged:l,percentage:n.length>0?l/n.length*100:0,speciesDetails:i,variantsTotal:s,variantsLogged:a,variantsPercentage:s>0?a/s*100:0,abilitiesTotal:u,abilitiesLogged:c,abilitiesPercentage:u>0?c/u*100:0}}async function Jr(e=false){await ue.waitForAny();const t=ql(),n=ny(t);if(!e&&mo&&n===ja)return mo;const r={plants:Zl(t),pets:ec(t),lastUpdated:Date.now()};return mo=r,ja=n,r}async function oy(){const e=await Jr();return {plants:e.plants.speciesDetails.filter(t=>t.variantsMissing.length>0).map(t=>({species:t.species,missing:t.variantsMissing})),pets:e.pets.speciesDetails.filter(t=>t.variantsMissing.length>0||(t.abilitiesMissing?.length??0)>0).map(t=>({species:t.species,missingVariants:t.variantsMissing,missingAbilities:t.abilitiesMissing??[]}))}}let wn=null;function Xo(){const e=Qt();e.enabled&&(e.autoRefresh&&!wn&&(wn=setInterval(async()=>{const t=await Jr();zi(t);},e.refreshIntervalMs)),console.log("✅ [JournalChecker] Started"));}function tc(){wn&&(clearInterval(wn),wn=null);}function iy(e){const t=Qt();t.enabled=e,Xr(t),e?Xo():tc();}function zi(e){window.dispatchEvent(new CustomEvent("gemini:journal-updated",{detail:e}));}async function ay(){const e=await Jr();return zi(e),e}const nc={init(){this.isReady()||Xo();},isReady(){return Da()},DEFAULT_CONFIG:Yl,STORAGE_KEY:ji,loadConfig:Qt,saveConfig:Xr,isEnabled:Da,setAutoRefresh:ey,setRefreshInterval:ty,getMyJournal:ql,getCropVariants:Xl,getPetVariants:Jl,getAllMutations:ry,getPetAbilities:Ql,calculateProduceProgress:Zl,calculatePetProgress:ec,aggregateJournalProgress:Jr,getMissingSummary:oy,start:Xo,stop:tc,setEnabled:iy,refresh:ay,dispatchUpdate:zi},Bi=Re.BULK_FAVORITE,rc={enabled:false,position:"top-right"};function $n(){return Ae(Bi,rc)}function oc(e){Ge(Bi,e);}function sy(e){const t=$n();t.position=e,oc(t);}function ic(){return $n().enabled}function ly(e){return typeof e=="object"&&e!==null&&"id"in e&&typeof e.id=="string"}async function cy(e){const t=Ft().get();if(!t?.items)return console.warn("[BulkFavorite] No inventory data available"),0;const n=new Set(t.favoritedItemIds??[]);let r=0;for(const o of t.items){if(!ly(o))continue;const i=n.has(o.id);e&&i||!e&&!i||(await qr(o.id,e),r++,await dy(50));}return console.log(`[BulkFavorite] ${e?"Favorited":"Unfavorited"} ${r} items`),r}function dy(e){return new Promise(t=>setTimeout(t,e))}let tr=false;const Fr={init(){tr||(tr=true,console.log("✅ [MGBulkFavorite] Feature initialized"));},isReady(){return tr},DEFAULT_CONFIG:rc,STORAGE_KEY:Bi,loadConfig:$n,saveConfig:oc,isEnabled:ic,setPosition:sy,bulkFavorite:cy,destroy(){tr=false;}};class uy{constructor(){Y(this,"achievements",new Map);Y(this,"data");Y(this,"STORAGE_KEY",Re.ACHIEVEMENTS);Y(this,"onUnlockCallbacks",[]);Y(this,"onProgressCallbacks",[]);this.data=this.loadData();}loadData(){return Ae(this.STORAGE_KEY,{unlocked:{},progress:{}})}saveData(){Ge(this.STORAGE_KEY,this.data);}register(t){this.achievements.set(t.id,t),this.data.progress[t.id]||(this.data.progress[t.id]={current:0,target:t.target,percentage:0});}registerMany(t){for(const n of t)this.register(n);}async checkAchievement(t){const n=this.achievements.get(t);if(!n)throw new Error(`Achievement not found: ${t}`);const r=this.isUnlocked(t),o=await n.checkProgress(),i={current:o,target:n.target,percentage:Math.min(100,Math.floor(o/n.target*100))},a=this.data.progress[t];this.data.progress[t]=i;const s=o>=n.target;return !r&&s?this.unlock(t,i):s||this.triggerProgressCallbacks({achievement:n,progress:i,previousProgress:a}),this.saveData(),{id:t,wasUnlocked:r,isUnlocked:s,progress:i}}async checkAllAchievements(){const t=[];for(const n of this.achievements.keys()){const r=await this.checkAchievement(n);t.push(r);}return t}unlock(t,n){const r=this.achievements.get(t);if(!r)return;const o={achievementId:t,unlockedAt:Date.now(),progress:n};this.data.unlocked[t]=o,this.saveData(),this.triggerUnlockCallbacks({achievement:r,unlockedAt:o.unlockedAt,progress:n});}isUnlocked(t){return !!this.data.unlocked[t]}getAchievement(t){return this.achievements.get(t)||null}getAllAchievements(){return Array.from(this.achievements.values())}getAchievementsByCategory(t){return Array.from(this.achievements.values()).filter(n=>n.category===t)}getAchievementsByRarity(t){return Array.from(this.achievements.values()).filter(n=>n.rarity===t)}getUnlockedAchievements(){return Object.values(this.data.unlocked)}getLockedAchievements(){return Array.from(this.achievements.values()).filter(t=>!this.isUnlocked(t.id)&&!t.hidden)}getProgress(t){return this.data.progress[t]||null}getCompletionPercentage(){const t=this.achievements.size,n=Object.keys(this.data.unlocked).length;return t>0?Math.floor(n/t*100):0}getCompletionStats(){const t=this.achievements.size,n=Object.keys(this.data.unlocked).length,r=t-n,o=this.getCompletionPercentage();return {total:t,unlocked:n,locked:r,percentage:o}}onUnlock(t){return this.onUnlockCallbacks.push(t),()=>{const n=this.onUnlockCallbacks.indexOf(t);n!==-1&&this.onUnlockCallbacks.splice(n,1);}}onProgress(t){return this.onProgressCallbacks.push(t),()=>{const n=this.onProgressCallbacks.indexOf(t);n!==-1&&this.onProgressCallbacks.splice(n,1);}}triggerUnlockCallbacks(t){for(const n of this.onUnlockCallbacks)try{n(t);}catch(r){console.warn("[Achievements] Unlock callback error:",r);}}triggerProgressCallbacks(t){for(const n of this.onProgressCallbacks)try{n(t);}catch(r){console.warn("[Achievements] Progress callback error:",r);}}reset(){this.data={unlocked:{},progress:{}};for(const t of this.achievements.values())this.data.progress[t.id]={current:0,target:t.target,percentage:0};this.saveData();}exportData(){return JSON.stringify(this.data,null,2)}importData(t){try{const n=JSON.parse(t);return this.data=n,this.saveData(),!0}catch(n){return console.warn("[Achievements] Failed to import data:",n),false}}}let kn=null;function Ue(){return kn||(kn=new uy),kn}function py(){kn&&(kn=null);}let nr=false;const ac={init(){nr||(Ue(),nr=true,console.log("✅ [MGAchievements] Initialized"));},isReady(){return nr},getManager(){return Ue()},register:(...e)=>Ue().register(...e),registerMany:(...e)=>Ue().registerMany(...e),isUnlocked:(...e)=>Ue().isUnlocked(...e),getAll:()=>Ue().getAllAchievements(),getUnlocked:()=>Ue().getUnlockedAchievements(),getStats:()=>Ue().getCompletionStats(),checkAll:()=>Ue().checkAllAchievements(),onUnlock:(...e)=>Ue().onUnlock(...e),onProgress:(...e)=>Ue().onProgress(...e),destroy(){py(),nr=false;}},fy={enabled:true},sc=Re.ANTI_AFK,gy=["visibilitychange","blur","focus","focusout","pagehide","freeze","resume"],my=25e3,hy=1,by=1e-5,ie={listeners:[],savedProps:{hidden:void 0,visibilityState:void 0,hasFocus:null},audioCtx:null,oscillator:null,gainNode:null,heartbeatInterval:null};function yy(){const e=(t,n)=>{const r=o=>{o.stopImmediatePropagation(),o.preventDefault?.();};t.addEventListener(n,r,{capture:true}),ie.listeners.push({type:n,handler:r,target:t});};for(const t of gy)e(document,t),e(window,t);}function vy(){for(const{type:e,handler:t,target:n}of ie.listeners)try{n.removeEventListener(e,t,{capture:!0});}catch{}ie.listeners.length=0;}function xy(){const e=Object.getPrototypeOf(document);ie.savedProps.hidden=Object.getOwnPropertyDescriptor(e,"hidden"),ie.savedProps.visibilityState=Object.getOwnPropertyDescriptor(e,"visibilityState"),ie.savedProps.hasFocus=document.hasFocus?document.hasFocus.bind(document):null;try{Object.defineProperty(e,"hidden",{configurable:!0,get:()=>!1});}catch{}try{Object.defineProperty(e,"visibilityState",{configurable:!0,get:()=>"visible"});}catch{}try{document.hasFocus=()=>!0;}catch{}}function wy(){const e=Object.getPrototypeOf(document);try{ie.savedProps.hidden&&Object.defineProperty(e,"hidden",ie.savedProps.hidden);}catch{}try{ie.savedProps.visibilityState&&Object.defineProperty(e,"visibilityState",ie.savedProps.visibilityState);}catch{}try{ie.savedProps.hasFocus&&(document.hasFocus=ie.savedProps.hasFocus);}catch{}}function Rr(){ie.audioCtx&&ie.audioCtx.state!=="running"&&ie.audioCtx.resume?.().catch(()=>{});}function ky(){try{const e=window.AudioContext||window.webkitAudioContext;ie.audioCtx=new e({latencyHint:"interactive"}),ie.gainNode=ie.audioCtx.createGain(),ie.gainNode.gain.value=by,ie.oscillator=ie.audioCtx.createOscillator(),ie.oscillator.frequency.value=hy,ie.oscillator.connect(ie.gainNode).connect(ie.audioCtx.destination),ie.oscillator.start(),document.addEventListener("visibilitychange",Rr,{capture:!0}),window.addEventListener("focus",Rr,{capture:!0});}catch{lc();}}function lc(){try{ie.oscillator?.stop();}catch{}try{ie.oscillator?.disconnect(),ie.gainNode?.disconnect();}catch{}try{ie.audioCtx?.close?.();}catch{}document.removeEventListener("visibilitychange",Rr,{capture:true}),window.removeEventListener("focus",Rr,{capture:true}),ie.oscillator=null,ie.gainNode=null,ie.audioCtx=null;}function Sy(){const e=document.querySelector("canvas")||document.body||document.documentElement;ie.heartbeatInterval=window.setInterval(()=>{try{e.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:1,clientY:1}));}catch{}},my);}function Cy(){ie.heartbeatInterval!==null&&(clearInterval(ie.heartbeatInterval),ie.heartbeatInterval=null);}function ho(){xy(),yy(),ky(),Sy();}function bo(){Cy(),lc(),vy(),wy();}let rr=false,Ne=false;function $t(){return Ae(sc,fy)}function yo(e){Ge(sc,e);}const Tt={init(){if(rr)return;const e=$t();rr=true,e.enabled?(ho(),Ne=true,console.log("[MGAntiAfk] Initialized and started")):console.log("[MGAntiAfk] Initialized but disabled");},isReady(){return rr},isRunning(){return Ne},isEnabled(){return $t().enabled},enable(){const e=$t();e.enabled=true,yo(e),Ne||(ho(),Ne=true,console.log("[MGAntiAfk] Enabled"));},disable(){const e=$t();e.enabled=false,yo(e),Ne&&(bo(),Ne=false,console.log("[MGAntiAfk] Disabled"));},toggle(){Tt.isEnabled()?Tt.disable():Tt.enable();},getConfig(){return $t()},updateConfig(e){const n={...$t(),...e};yo(n),n.enabled&&!Ne?(ho(),Ne=true):!n.enabled&&Ne&&(bo(),Ne=false);},destroy(){Ne&&(bo(),Ne=false),rr=false,console.log("[MGAntiAfk] Destroyed");}},cc=Re.PET_TEAM,Ay={enabled:false,teams:[],activeTeamId:null},dc=3,za=50,qe="";function Ie(){return Ae(cc,Ay)}function Rt(e){Ge(cc,e);}function Ty(e){const n={...Ie(),...e};return Rt(n),n}function Iy(){return Ie().enabled}function Ey(e){Ty({enabled:e});}function Py(){return crypto.randomUUID()}function Jo(){return Date.now()}function uc(e=[]){const t=[...e];for(;t.length<dc;)t.push(qe);return [t[0]||qe,t[1]||qe,t[2]||qe]}function pc(e,t){const n=Ie(),r=e.trim();return r?!n.teams.some(o=>o.name.trim()===r&&o.id!==t):false}function fc(e,t){const n=Ie();if(!e.some(i=>i!==qe))return  true;const o=[...e].sort().join(",");return !n.teams.some(i=>i.id===t?false:[...i.petIds].sort().join(",")===o)}function gc(e){const n=Yr().get(),r=new Set(n.all.map(i=>i.id)),o=Ie();for(const i of o.teams)for(const a of i.petIds)a!==qe&&r.add(a);for(const i of e)if(i!==qe&&!r.has(i))return  false;return  true}function My(e,t=[]){const n=Ie();if(n.teams.length>=za)throw new Error(`Maximum number of teams (${za}) reached`);if(!pc(e))throw new Error(`Team name "${e}" already exists`);const r=e.trim();if(!r)throw new Error("Team name cannot be empty");const o=uc(t);if(!gc(o))throw new Error("One or more pet IDs do not exist");if(!fc(o))throw new Error("A team with this exact composition already exists");const i={id:Py(),name:r,petIds:o,createdAt:Jo(),updatedAt:Jo()};return n.teams.push(i),Rt(n),i}function mc(e,t){const n=Ie(),r=n.teams.findIndex(a=>a.id===e);if(r===-1)return null;const o=n.teams[r];if(t.name!==void 0){const a=t.name.trim();if(!a)throw new Error("Team name cannot be empty");if(!pc(a,e))throw new Error(`Team name "${a}" already exists`);t.name=a;}if(t.petIds!==void 0){const a=uc(t.petIds);if(!gc(a))throw new Error("One or more pet IDs do not exist");if(!fc(a,e))throw new Error("A team with this exact composition already exists");t.petIds=a;}const i={...o,...t,id:o.id,createdAt:o.createdAt,updatedAt:Jo()};return n.teams[r]=i,Rt(n),i}function Ly(e){const t=Ie(),n=t.teams.length;return t.teams=t.teams.filter(r=>r.id!==e),t.teams.length===n?false:(Rt(t),true)}function _y(e){return Ie().teams.find(n=>n.id===e)??null}function Fy(){return [...Ie().teams]}function Ry(e){const t=Ie(),n=e.trim();return t.teams.find(r=>r.name.trim()===n)??null}function Oy(e){const t=Ie(),n=new Map(t.teams.map(r=>[r.id,r]));if(e.length!==t.teams.length)return  false;for(const r of e)if(!n.has(r))return  false;return t.teams=e.map(r=>n.get(r)),Rt(t),true}function Ny(e,t){try{return mc(e,{name:t})!==null}catch(n){return console.warn(`[PetTeam] Failed to rename team ${e}:`,n),false}}function $y(){const n=Yr().get().byLocation.active.map(o=>o.id).sort(),r=Ie();for(const o of r.teams){const i=o.petIds.filter(a=>a!=="").sort();if(i.length===n.length&&i.every((a,s)=>a===n[s]))return o.id}return null}function hc(){const e=$y(),t=Ie();return e!==t.activeTeamId&&(t.activeTeamId=e,Rt(t)),e}function bc(e){const t=Ie();t.activeTeamId=e,Rt(t);}function Dy(e){return hc()===e}function jy(e){const t=Yr(),n=Ft(),r=t.get();if(n.get().isFull)throw new Error("Cannot activate team: inventory is full");const i=r.byLocation.active,a=e.petIds.filter(l=>l!==qe).sort(),s=i.map(l=>l.id).sort();if(JSON.stringify(a)===JSON.stringify(s)){console.log("[PetTeam] Team already active");return}const c=r.hutch,u=c.hasHutch?c.maxItems-c.currentItems:0;zy(e.petIds,u,r),bc(e.id),console.log("[PetTeam] Team activated successfully");}function zy(e,t,n){const r=n.byLocation.active;let o=t;console.log(`[PetTeam] Starting swap with ${t} hutch spaces available`);for(let i=0;i<dc;i++){const a=e[i],s=r[i]??null;if(console.log(`[PetTeam] Slot ${i}: current=${s?.id.slice(0,8)??"empty"}, target=${a.slice(0,8)||"empty"}, hutchSpace=${o}`),s?.id===a){console.log(`[PetTeam] Slot ${i}: Same pet, skipping`);continue}if(a===qe&&s){const c=o>0;console.log(`[PetTeam] Slot ${i}: Removing pet, storeInHutch=${c}`),By(s.id,c),c&&o--;continue}if(!s&&a!==qe){const u=n.all.find(l=>l.id===a)?.location==="hutch";console.log(`[PetTeam] Slot ${i}: Adding pet, fromHutch=${u}`),u&&o++,Gy(a,n);continue}if(s&&a!==qe){const u=n.all.find(d=>d.id===a)?.location==="hutch";u&&o++;const l=o>0;console.log(`[PetTeam] Slot ${i}: Swapping pets, fromHutch=${u}, storeInHutch=${l}`),Wy(s.id,a,n,l),l&&o--;continue}}console.log(`[PetTeam] Swap complete, ${o} hutch spaces remaining`);}function By(e,t){Ul(e),t&&Ni(e);}function Gy(e,t){const n=t.all.find(r=>r.id===e);if(!n){console.warn(`[PetTeam] Pet ${e} not found`);return}n.location==="hutch"&&$i(e),Wl(e);}function Wy(e,t,n,r){const o=n.all.find(i=>i.id===t);if(!o){console.warn(`[PetTeam] Pet ${t} not found`);return}o.location==="hutch"&&$i(t),Hl(e,t),r&&Ni(e);}let or=false;const be={init(){if(or)return;if(!Ie().enabled){console.log("[PetTeam] Feature disabled");return}or=true,console.log("[PetTeam] Feature initialized");},destroy(){or&&(or=false,console.log("[PetTeam] Feature destroyed"));},isEnabled:Iy,setEnabled:Ey,createTeam:My,updateTeam:mc,deleteTeam:Ly,renameTeam:Ny,getTeam:_y,getAllTeams:Fy,getTeamByName:Ry,reorderTeams:Oy,getActiveTeamId:hc,setActiveTeamId:bc,isActiveTeam:Dy,activateTeam:jy};class yc{constructor(){Y(this,"stats");Y(this,"STORAGE_KEY",Re.TRACKER_STATS);this.stats=this.loadStats(),this.startSession();}loadStats(){return Ae(this.STORAGE_KEY,this.getDefaultStats())}saveStats(){Ge(this.STORAGE_KEY,this.stats);}getDefaultStats(){return {session:{sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},allTime:{totalSessions:0,totalPlayTime:0,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0,crops:{},pets:{}}}}startSession(){this.stats.session={sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},this.stats.allTime.totalSessions++,this.saveStats();}endSession(){this.stats.session.sessionEnd=Date.now();const t=this.stats.session.sessionEnd-this.stats.session.sessionStart;this.stats.allTime.totalPlayTime+=t,this.saveStats();}recordHarvest(t,n=1,r=[]){this.stats.session.cropsHarvested+=n,this.stats.allTime.cropsHarvested+=n,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].harvested+=n;for(const o of r)this.stats.allTime.crops[t].mutations[o]||(this.stats.allTime.crops[t].mutations[o]=0),this.stats.allTime.crops[t].mutations[o]++;this.saveStats();}recordCropSale(t,n=1,r=0){this.stats.session.cropsSold+=n,this.stats.session.coinsEarned+=r,this.stats.allTime.cropsSold+=n,this.stats.allTime.coinsEarned+=r,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].sold+=n,this.stats.allTime.crops[t].totalValue+=r,this.saveStats();}recordPetHatch(t,n=[],r=[]){this.stats.session.petsHatched++,this.stats.allTime.petsHatched++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].hatched++;for(const o of n)this.stats.allTime.pets[t].mutations[o]||(this.stats.allTime.pets[t].mutations[o]=0),this.stats.allTime.pets[t].mutations[o]++;for(const o of r)this.stats.allTime.pets[t].abilities[o]||(this.stats.allTime.pets[t].abilities[o]=0),this.stats.allTime.pets[t].abilities[o]++;this.saveStats();}recordPetSale(t,n=0){this.stats.session.petsSold++,this.stats.session.coinsEarned+=n,this.stats.allTime.petsSold++,this.stats.allTime.coinsEarned+=n,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].sold++,this.saveStats();}recordPetFeed(t){this.stats.session.petsFed++,this.stats.allTime.petsFed++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].fed++,this.saveStats();}recordSeedPurchase(t,n=1,r=0){this.stats.session.seedsPurchased+=n,this.stats.session.coinsSpent+=r,this.stats.allTime.seedsPurchased+=n,this.stats.allTime.coinsSpent+=r,this.saveStats();}recordEggPurchase(t,n=1,r=0){this.stats.session.eggsPurchased+=n,this.stats.session.coinsSpent+=r,this.stats.allTime.eggsPurchased+=n,this.stats.allTime.coinsSpent+=r,this.saveStats();}recordAbilityProc(t){this.stats.session.abilityProcs++,this.stats.allTime.abilityProcs++,this.saveStats();}recordCoinsEarned(t){this.stats.session.coinsEarned+=t,this.stats.allTime.coinsEarned+=t,this.saveStats();}recordCoinsSpent(t){this.stats.session.coinsSpent+=t,this.stats.allTime.coinsSpent+=t,this.saveStats();}getStats(){return {...this.stats}}getSessionStats(){return {...this.stats.session}}getAllTimeStats(){return {...this.stats.allTime}}getCropStats(t){return this.stats.allTime.crops[t]||null}getPetStats(t){return this.stats.allTime.pets[t]||null}getTopCrops(t=10){return Object.entries(this.stats.allTime.crops).map(([n,r])=>({species:n,stats:r})).sort((n,r)=>r.stats.harvested-n.stats.harvested).slice(0,t)}getTopPets(t=10){return Object.entries(this.stats.allTime.pets).map(([n,r])=>({species:n,stats:r})).sort((n,r)=>r.stats.hatched-n.stats.hatched).slice(0,t)}resetSession(){this.startSession();}resetAll(){this.stats=this.getDefaultStats(),this.saveStats();}exportStats(){return JSON.stringify(this.stats,null,2)}importStats(t){try{const n=JSON.parse(t);return this.stats=n,this.saveStats(),!0}catch(n){return console.warn("[StatsTracker] Failed to import stats:",n),false}}}let Wt=null;function Hy(){return Wt||(Wt=new yc),Wt}function Uy(){Wt&&(Wt.endSession(),Wt=null);}function vc(e){const t=Hr(e.xp),n=Ur(e.petSpecies,e.targetScale),r=Vr(e.petSpecies,e.xp,n),o=Kr(e.petSpecies,t),i=Nl(e.petSpecies),a=vh(r,n,i),s=xh(r,n);return {current:r,max:n,progress:s,age:t,isMature:o,strengthPerHour:i,hoursToMax:a}}function xc(e){return {...e,strength:vc(e)}}function wc(e){return e.map(xc)}function Vy(e){if(e.length===0)return {averageCurrent:0,averageMax:0,totalMature:0,totalImmature:0,strongestPet:null,weakestPet:null};const t=wc(e),n=t.reduce((c,u)=>c+u.strength.current,0),r=t.reduce((c,u)=>c+u.strength.max,0),o=t.filter(c=>c.strength.isMature).length,i=t.length-o,a=t.reduce((c,u)=>u.strength.max>(c?.strength.max||0)?u:c,t[0]),s=t.reduce((c,u)=>u.strength.max<(c?.strength.max||1/0)?u:c,t[0]);return {averageCurrent:Math.round(n/t.length),averageMax:Math.round(r/t.length),totalMature:o,totalImmature:i,strongestPet:a,weakestPet:s}}const Ky=Object.freeze(Object.defineProperty({__proto__:null,calculatePetStrength:vc,enrichPetWithStrength:xc,enrichPetsWithStrength:wc,getPetStrengthStats:Vy},Symbol.toStringTag,{value:"Module"}));class kc{constructor(){Y(this,"logs",[]);Y(this,"maxLogs",1e3);Y(this,"unsubscribe",null);Y(this,"isInitialized",false);}init(){this.isInitialized||(this.unsubscribe=it.myPets.subscribeAbility(t=>{this.log({abilityId:t.trigger.abilityId||"unknown",petId:t.pet.id,petSpecies:t.pet.petSpecies,petName:t.pet.name,timestamp:t.trigger.performedAt||Date.now()});}),this.isInitialized=true);}log(t){const n={...t,id:`${t.timestamp}-${Math.random().toString(36).substr(2,9)}`};this.logs.push(n),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs));}getLogs(t){let n=this.logs;t?.abilityId&&(n=n.filter(o=>o.abilityId===t.abilityId)),t?.petId&&(n=n.filter(o=>o.petId===t.petId)),t?.petSpecies&&(n=n.filter(o=>o.petSpecies===t.petSpecies));const{since:r}=t??{};return r!==void 0&&(n=n.filter(o=>o.timestamp>=r)),t?.limit&&(n=n.slice(-t.limit)),n}getStats(t=36e5){const n=Date.now()-t,r=this.logs.filter(i=>i.timestamp>=n),o=new Map;for(const i of r){o.has(i.abilityId)||o.set(i.abilityId,{abilityId:i.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});const a=o.get(i.abilityId);a.count++,(!a.lastProc||i.timestamp>a.lastProc)&&(a.lastProc=i.timestamp);}for(const i of o.values())i.procsPerMinute=i.count/t*6e4,i.procsPerHour=i.count/t*36e5;return o}getAbilityStats(t,n=36e5){return this.getStats(n).get(t)||null}getPetStats(t,n=36e5){const r=Date.now()-n,o=this.logs.filter(a=>a.petId===t&&a.timestamp>=r),i=new Map;for(const a of o){i.has(a.abilityId)||i.set(a.abilityId,{abilityId:a.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});const s=i.get(a.abilityId);s.count++,(!s.lastProc||a.timestamp>s.lastProc)&&(s.lastProc=a.timestamp);}for(const a of i.values())a.procsPerMinute=a.count/n*6e4,a.procsPerHour=a.count/n*36e5;return {totalProcs:o.length,abilities:i}}getTopAbilities(t=10,n=36e5){return Array.from(this.getStats(n).values()).sort((o,i)=>i.count-o.count).slice(0,t)}clear(){this.logs=[];}setMaxLogs(t){this.maxLogs=t,this.logs.length>t&&(this.logs=this.logs.slice(-t));}getLogCount(){return this.logs.length}isActive(){return this.isInitialized}destroy(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null),this.logs=[],this.isInitialized=false;}}let St=null;function Yy(){return St||(St=new kc,St.init()),St}function qy(){St&&(St.destroy(),St=null);}const Sc={StatsTracker:yc,getStatsTracker:Hy,destroyStatsTracker:Uy},Cc={AbilityLogger:kc,getAbilityLogger:Yy,destroyAbilityLogger:qy,...Ky},Xy=Object.freeze(Object.defineProperty({__proto__:null,MGAchievements:ac,MGAntiAfk:Tt,MGAutoFavorite:Di,MGBulkFavorite:Fr,MGCalculators:$l,MGJournalChecker:nc,MGPetTeam:be,MGPets:Cc,MGTracker:Sc},Symbol.toStringTag,{value:"Module"})),Ve=[{id:"Rainbow",desc:"All Rainbow items"},{id:"Gold",desc:"All Gold items"},{id:"Wet",desc:"All Wet items"},{id:"Chilled",desc:"All Chilled items"},{id:"Frozen",desc:"All Frozen items"},{id:"Dawnlit",desc:"Dawn mutations"},{id:"Dawncharged",desc:"Dawn charged"},{id:"Ambershine",desc:"Amber mutations"},{id:"Ambercharged",desc:"Amber charged"}],Jy={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function Dt(e){return e?Jy[e]??0:0}class Qy extends Mt{constructor(){super({id:"tab-auto-favorite",label:"Auto-Favorite"});Y(this,"allPlants",[]);Y(this,"allPets",[]);Y(this,"sectionElement",null);}async build(n){await Of();const r=n.getRootNode();zt(r,Zs,"auto-favorite-settings-styles");const o=this.createGrid("12px");o.id="auto-favorite-settings",this.sectionElement=o,n.appendChild(o),await this.loadGameData(),await this.waitForSprites(),this.renderContent();}async loadGameData(){try{await ue.waitForAny(3e3).catch(()=>{}),await Promise.all([ue.waitFor("plants",3e3).catch(()=>console.warn("[AutoFavorite UI] Still waiting for plants data...")),ue.waitFor("pets",3e3).catch(()=>console.warn("[AutoFavorite UI] Still waiting for pets data..."))]);const n=ue.get("plants")||{},r=ue.get("pets")||{};this.allPlants=Object.keys(n).sort((o,i)=>{const a=n[o]?.seed?.rarity||null,s=n[i]?.seed?.rarity||null,c=Dt(a)-Dt(s);return c!==0?c:o.localeCompare(i,void 0,{numeric:!0,sensitivity:"base"})}),this.allPets=Object.keys(r).sort((o,i)=>{const a=r[o]?.rarity||null,s=r[i]?.rarity||null,c=Dt(a)-Dt(s);return c!==0?c:o.localeCompare(i,void 0,{numeric:!0,sensitivity:"base"})});}catch(n){console.error("[AutoFavorite UI] Failed to load game data:",n);}}async waitForSprites(){if(ne.isReady())return;const n=1e4,r=100;let o=0;return new Promise(i=>{const a=()=>{ne.isReady()||o>=n?i():(o+=r,setTimeout(a,r));};a();})}renderContent(){this.sectionElement&&(this.sectionElement.innerHTML="",this.sectionElement.appendChild(this.createMasterToggle()),this.sectionElement.appendChild(this.createMutationsCard()),this.sectionElement.appendChild(this.createProduceCard()),this.sectionElement.appendChild(this.createPetsCard()));}createMasterToggle(){const n=g("div",{className:"kv"}),r=Nr({text:"Enable Auto-Favorite",tone:"default",size:"lg"}),o=_n({checked:We().get().enabled,onChange:async i=>{const a=We(),s=a.get();await a.set({...s,enabled:i}),await this.saveConfig();}});return n.append(r.root,o.root),Te({title:"Auto-Favorite",padding:"lg"},n,g("p",{style:"margin-top: 6px; font-size: 12px; color: var(--muted);"},"Automatically favorite items when added to inventory"))}createMutationsCard(){const n=g("div",{className:"u-col"}),r=g("div",{className:"mut-row"});r.appendChild(this.createMutationButton(Ve[0])),r.appendChild(this.createMutationButton(Ve[1])),n.appendChild(r);const o=g("div",{className:"mut-row"});o.appendChild(this.createMutationButton(Ve[2])),o.appendChild(this.createMutationButton(Ve[3])),o.appendChild(this.createMutationButton(Ve[4])),n.appendChild(o);const i=g("div",{className:"mut-row"});i.appendChild(this.createMutationButton(Ve[5])),i.appendChild(this.createMutationButton(Ve[6])),n.appendChild(i);const a=g("div",{className:"mut-row"});return a.appendChild(this.createMutationButton(Ve[7])),a.appendChild(this.createMutationButton(Ve[8])),n.appendChild(a),Te({title:"Mutations Priority",variant:"soft",padding:"lg",expandable:true,defaultExpanded:true},n,g("p",{style:"margin-top: 8px; font-size: 11px; color: var(--muted);"},`${We().get().favoriteMutations.length} / ${Ve.length} active`))}createMutationButton(n){let r=We().get().favoriteMutations.includes(n.id);const i=["mut-btn",`mut-btn--${n.id.toLowerCase()}`];r&&i.push("active");const a=g("div",{className:i.join(" ")}),s=g("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(ne.isReady()){const l=ne.toCanvas("plant","Sunflower",{mutations:[n.id],scale:.16});l.style.width="28px",l.style.height="28px",l.style.objectFit="contain",s.appendChild(l);}}catch{}const c=n.id.charAt(0).toUpperCase()+n.id.slice(1).toLowerCase(),u=g("div",{style:"font-size: 13px; font-weight: 600; color: var(--fg); text-shadow: 0 1px 2px rgba(0,0,0,0.5); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"},c);if(a.append(s,u),n.id==="Rainbow"||n.id==="Gold"){const l=g("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(ne.isReady()){const d=ne.toCanvas("pet","Capybara",{mutations:[n.id],scale:.16});d.style.width="28px",d.style.height="28px",d.style.objectFit="contain",l.appendChild(d);}}catch{}a.append(l);}else {const l=g("div",{style:"width: 28px; flex-shrink: 0;"});a.append(l);}return a.addEventListener("click",async l=>{l.stopPropagation();const d=We(),p=d.get();if(r){const m=p.favoriteMutations.filter(b=>b!==n.id);await d.set({...p,favoriteMutations:m}),r=false,a.classList.remove("active");}else {const m=[...p.favoriteMutations,n.id];await d.set({...p,favoriteMutations:m}),r=true,a.classList.add("active");}await this.saveConfig();const f=this.sectionElement?.querySelector(".card p");f&&(f.textContent=`${We().get().favoriteMutations.length} / ${Ve.length} active`);}),a}createProduceCard(){return this.createItemSelectionCard({title:"Produce",items:this.allPlants,category:"plant",selected:We().get().favoriteProduceList,onUpdate:async n=>{const r=We(),o=r.get();await r.set({...o,favoriteProduceList:n}),await this.saveConfig();}})}createPetsCard(){return this.createItemSelectionCard({title:"Pets",items:this.allPets,category:"pet",selected:We().get().favoritePetsList,onUpdate:async n=>{const r=We(),o=r.get();await r.set({...o,favoritePetsList:n}),await this.saveConfig();}})}createItemSelectionCard(n){const{title:r,items:o,category:i,selected:a,onUpdate:s}=n;let c=new Set(a),u=o;const l=g("div",{style:"margin-bottom: 8px;"}),d=fs({placeholder:`Search ${r.toLowerCase()}...`,value:"",debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:x=>{const C=x.trim().toLowerCase();C?u=o.filter(E=>E.toLowerCase().includes(C)):u=o,v.setData(b());}});l.appendChild(d.root);const p=g("div",{style:"display: flex; gap: 8px; margin-bottom: 12px;"}),f=Pe({label:"Select All",variant:"default",size:"sm",onClick:()=>{const x=b().map(C=>C.id);v.setSelection(x);}}),m=Pe({label:"Deselect All",variant:"default",size:"sm",onClick:()=>{v.clearSelection();}});p.append(f,m);const b=()=>u.map(x=>({id:x,name:x,rarity:this.getItemRarity(x,i),selected:c.has(x)})),h=x=>{if(!x){const E=g("span",{style:"opacity:0.5;"});return E.textContent="—",E}return di({variant:"rarity",rarity:x,size:"sm"}).root},y=x=>{const C=g("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0; background: color-mix(in oklab, var(--bg) 5%, transparent); border-radius: 6px;"});try{if(ne.isReady()){let E=i,w=x;i==="plant"&&(["Bamboo","Cactus"].includes(x)&&(E="tallplant"),x==="DawnCelestial"&&(w="DawnCelestialCrop"),x==="MoonCelestial"&&(w="MoonCelestialCrop"),x==="OrangeTulip"&&(w="Tulip"));const T=ne.toCanvas(E,w,{scale:.5});T.style.width="28px",T.style.height="28px",T.style.objectFit="contain",C.appendChild(T);}}catch{}return C},v=ps({columns:[{key:"name",header:"Name",width:"1fr",align:"center",sortable:true,sortFn:(x,C)=>x.name.localeCompare(C.name,void 0,{numeric:true,sensitivity:"base"}),render:x=>{const C=g("div",{style:"display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%;"}),E=y(x.id),w=g("span",{style:"font-weight: 500; color: var(--fg); white-space: nowrap;"},x.name);return C.append(E,w),C}},{key:"rarity",header:"Rarity",width:"100px",align:"center",sortable:true,sortFn:(x,C)=>Dt(x.rarity)-Dt(C.rarity),render:x=>h(x.rarity)}],data:b(),maxHeight:280,compact:true,zebra:true,animations:true,selectable:true,selectOnRowClick:true,hideHeaderCheckbox:true,initialSelection:Array.from(c),getRowId:x=>x.id,onSelectionChange:x=>{c.clear(),x.forEach(C=>c.add(C)),s(Array.from(c)),A();}}),k=g("p",{style:"margin-top: 8px; font-size: 11px; color: var(--muted);"}),A=()=>{k.textContent=`${c.size} / ${o.length} selected`;};return A(),Te({title:`${r} (${c.size}/${o.length})`,variant:"soft",padding:"lg",expandable:true,defaultExpanded:false},l,p,v.root,k)}getItemRarity(n,r){try{if(r==="pet")return (ue.get("pets")||{})[n]?.rarity||null;if(r==="plant"){const o=ue.get("plants")||{},i=o[n];if(i?.seed?.rarity)return i.seed.rarity;const a=n.toLowerCase();for(const s of Object.values(o))if(s?.seed?.name?.toLowerCase()===a||s?.plant?.name?.toLowerCase()===a)return s.seed.rarity}}catch{}return null}async saveConfig(){const n=We().get();try{const{updateSimpleConfig:r}=Di;await r({enabled:n.enabled,favoriteSpecies:[...n.favoriteProduceList,...n.favoritePetsList],favoriteMutations:n.favoriteMutations});}catch(r){console.error("[AutoFavoriteSettings] Failed to update feature config:",r);}}}function Zy(e,t){const n=new MutationObserver(o=>{for(const i of o)for(const a of i.addedNodes){if(!(a instanceof Element))continue;a.matches(e)&&t(a);const s=a.querySelectorAll(e);for(const c of s)t(c);}});n.observe(document.body,{childList:true,subtree:true});const r=document.querySelectorAll(e);for(const o of r)t(o);return {disconnect:()=>n.disconnect()}}function ev(e,t){const n=new MutationObserver(r=>{for(const o of r)for(const i of o.removedNodes){if(!(i instanceof Element))continue;i.matches(e)&&t(i);const a=i.querySelectorAll(e);for(const s of a)t(s);}});return n.observe(document.body,{childList:true,subtree:true}),{disconnect:()=>n.disconnect()}}const Ac=768,Ba=6,vo=62,xo=50,tv=.5,nv=.4,ir=36,ar=28,rv=6,Qo=4,ov=8,iv=100,av=200,Ga=14,Wa=3,sv=40,lv=50,Ha=2147483646,dn="gemini-bulk-favorite-sidebar",cv="gemini-bulk-favorite-top-row",dv="gemini-bulk-favorite-bottom-row",Zo="gemini-qol-bulkFavorite-styles",uv=`
/* Desktop: vertical scrollable list next to inventory */
#${dn} {
  display: flex;
  flex-direction: column;
  gap: ${rv}px;
  pointer-events: auto;
  padding: 4px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.6);
  z-index: ${Ha};
  overflow-y: auto;
}

/* Mobile: horizontal scrollable rows */
.gemini-qol-bulkFavorite-row {
  display: flex;
  flex-direction: row;
  gap: ${Qo}px;
  pointer-events: auto;
  padding: 4px;
  position: fixed;
  z-index: ${Ha};
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

#${dn}::-webkit-scrollbar {
  width: 4px;
}

#${dn}::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}

#${dn}::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

/* Individual species button */
.gemini-qol-bulkFavorite-btn {
  position: relative;
  width: ${vo}px;
  height: ${vo}px;
  min-width: ${vo}px;
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
  width: ${xo}px;
  height: ${xo}px;
  min-width: ${xo}px;
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
  width: ${ir}px;
  height: ${ir}px;
  object-fit: contain;
  image-rendering: pixelated;
}

.gemini-qol-bulkFavorite-btn.mobile .gemini-qol-bulkFavorite-sprite {
  width: ${ar}px;
  height: ${ar}px;
}

/* Heart indicator */
.gemini-qol-bulkFavorite-heart {
  position: absolute;
  top: ${Wa}px;
  right: ${Wa}px;
  width: ${Ga}px;
  height: ${Ga}px;
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
  width: ${ir}px;
  height: ${ir}px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #fff;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 4px;
}

.gemini-qol-bulkFavorite-btn.mobile .gemini-qol-bulkFavorite-fallback {
  width: ${ar}px;
  height: ${ar}px;
  font-size: 14px;
}
`,pv='<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',fv='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';function gv(e){const{species:t,itemCount:n,isFavorited:r,isMobile:o,onClick:i}=e,a=g("button",{className:`gemini-qol-bulkFavorite-btn${o?" mobile":""}`,title:`${r?"Unfavorite":"Favorite"} all ${n} ${t}`});return a.dataset.species=t,a.appendChild(mv(t,o)),a.appendChild(hv(r)),a.appendChild(bv(t)),a.addEventListener("click",async s=>{s.preventDefault(),s.stopPropagation(),i();}),a}function mv(e,t){try{if(!ne.isReady()||!ne.has("plant",e))return Ua(e);const n=t?nv:tv,r=ne.toCanvas("plant",e,{scale:n});return r.className="gemini-qol-bulkFavorite-sprite",r}catch(n){return console.warn(`[BulkFavorite] Failed to load sprite for ${e}:`,n),Ua(e)}}function Ua(e){return g("div",{className:"gemini-qol-bulkFavorite-fallback"},e.charAt(0).toUpperCase())}function hv(e){const t=g("span",{className:`gemini-qol-bulkFavorite-heart ${e?"filled":"outline"}`});return t.innerHTML=e?pv:fv,t}function bv(e){return g("span",{className:"gemini-qol-bulkFavorite-label"},e)}let nt=null,rt=null,tt=null,xr=false,Sn=null,un=false,Ht=null;const ei=[];function sr(e){ei.push(e);}function yv(){for(const e of ei)try{e();}catch(t){console.warn("[BulkFavorite] Cleanup error:",t);}ei.length=0;}function Tc(){return window.innerWidth<=Ac}function vv(e){return new Promise(t=>setTimeout(t,e))}function Ic(){if(xr)return;if(document.getElementById(Zo)){xr=true;return}const e=document.createElement("style");e.id=Zo,e.textContent=uv,document.head.appendChild(e),xr=true;}function xv(){document.getElementById(Zo)?.remove(),xr=false;}function wv(){const e=Ft().get();if(!e?.items)return [];const t=new Set(e.favoritedItemIds??[]),n=new Map;for(const o of e.items){const i=o;if(i.itemType!=="Produce")continue;const a=i.species,s=i.id;if(!a||!s)continue;const c=n.get(a);c?c.push(s):n.set(a,[s]);}const r=[];for(const[o,i]of n){const a=i.length>0&&i.every(s=>t.has(s));r.push({species:o,itemIds:i,allFavorited:a});}return r.sort((o,i)=>o.species.localeCompare(i.species)),r}async function kv(e){const t=Ft().get();if(!t?.items)return;const n=new Set(t.favoritedItemIds??[]),r=[];for(const a of t.items){const s=a;if(s.itemType!=="Produce"||s.species!==e)continue;const c=s.id;c&&r.push({id:c,favorited:n.has(c)});}if(r.length===0)return;const o=r.every(a=>a.favorited),i=o?r.filter(a=>a.favorited):r.filter(a=>!a.favorited);console.log(`🔄 [BulkFavorite] ${o?"Unfavoriting":"Favoriting"} ${i.length}/${r.length} ${e}`);for(const a of i)qr(a.id),await vv(sv);}function ti(e,t){const{species:n,itemIds:r,allFavorited:o}=e;return gv({species:n,itemCount:r.length,isFavorited:o,isMobile:t,onClick:()=>kv(n)})}function Sv(e){const t=g("div",{id:dn}),n=e.getBoundingClientRect(),r=Math.max(window.innerHeight-iv,av);return t.style.maxHeight=`${r}px`,t.style.position="fixed",t.style.left=`${n.right+ov}px`,t.style.top=`${n.top}px`,t}function Va(e,t,n){const r=g("div",{id:e,className:"gemini-qol-bulkFavorite-row"}),o=t.getBoundingClientRect();return n==="top"?r.style.bottom=`${window.innerHeight-o.top+Qo}px`:r.style.top=`${o.bottom+Qo}px`,r.style.left=`${o.left}px`,r.style.maxWidth=`${o.width}px`,r}function Ka(){const e=wv();Tc()?Av(e):Cv(e);}function Cv(e){if(nt){if(nt.innerHTML="",e.length===0){nt.style.display="none";return}nt.style.display="flex";for(const t of e)nt.appendChild(ti(t,false));console.log(`🎯 [BulkFavorite] Desktop: Rendered ${e.length} produce types`);}}function Av(e){if(!rt||!tt)return;if(rt.innerHTML="",tt.innerHTML="",e.length===0){rt.style.display="none",tt.style.display="none";return}rt.style.display="flex";const t=e.slice(0,Ba),n=e.slice(Ba);for(const r of t)rt.appendChild(ti(r,true));if(n.length>0){tt.style.display="flex";for(const r of n)tt.appendChild(ti(r,true));}else tt.style.display="none";console.log(`🎯 [BulkFavorite] Mobile: Rendered ${e.length} types`);}function Tv(){const e=document.querySelector(".McGrid");if(!e)return console.log("⚠️ [BulkFavorite] No .McGrid found"),null;const t=e.getBoundingClientRect();if(window.innerWidth<=Ac)return console.log(`🎯 [BulkFavorite] Mobile mode - using McGrid: ${Math.round(t.width)}x${Math.round(t.height)}`),e;const r=window.innerWidth/2;let o=null,i=0;const a=e.querySelectorAll(".McFlex, .McGrid");for(const s of a){const c=s.getBoundingClientRect();if(c.width<200||c.height<200||c.width>window.innerWidth-100)continue;const u=c.left+c.width/2,l=1-Math.abs(u-r)/r,p=c.width*c.height*l;p>i&&(o=s,i=p);}if(o){const s=o.getBoundingClientRect();return console.log(`🎯 [BulkFavorite] Found desktop container: ${Math.round(s.width)}x${Math.round(s.height)} @ (${Math.round(s.left)}, ${Math.round(s.top)})`),o}return console.log(`🎯 [BulkFavorite] Fallback to McGrid: ${Math.round(t.width)}x${Math.round(t.height)}`),e}let Ut=null;function ni(){Ut&&clearTimeout(Ut),Ut=setTimeout(()=>{Iv();},lv);}function Iv(){const e=Tv();if(!e)return;console.log("🎯 [BulkFavorite] Found inventory modal container"),Cn(),Ic(),Sn=e,Tc()?(rt=Va(cv,e,"top"),tt=Va(dv,e,"bottom"),document.body.appendChild(rt),document.body.appendChild(tt)):(nt=Sv(e),document.body.appendChild(nt)),Ka(),Ht&&Ht(),Ht=Ft().subscribeFavorites(()=>{un&&Ka();});}function Cn(){Ut&&(clearTimeout(Ut),Ut=null),Ht&&(Ht(),Ht=null),nt?.remove(),nt=null,rt?.remove(),rt=null,tt?.remove(),tt=null,Sn=null;}function Ev(){Cn();}async function ri(){if(!$n().enabled){console.log("⚠️ [BulkFavorite] Feature disabled");return}Ic();const t=await wi.onChangeNow(o=>{const i=o==="inventory";i!==un&&(un=i,i?ni():Cn());}),n=Zy(".McGrid",()=>{un&&(nt||rt||ni());}),r=ev(".McGrid",o=>{Sn&&Sn===o&&Cn();});sr(()=>t()),sr(()=>n.disconnect()),sr(()=>r.disconnect()),sr(()=>{Cn(),un=false,Sn=null;}),console.log("✅ [BulkFavorite] Started (State-driven + DOM observation)");}function oi(){yv(),xv(),console.log("🛑 [BulkFavorite] Stopped");}function Pv(e){const t=$n();t.enabled=e,e?ri():oi();}let lr=false;const ii={init(){lr||(ri(),lr=true);},destroy(){lr&&(oi(),lr=false);},isEnabled(){return ic()},renderButton:ni,removeButton:Ev,startWatching:ri,stopWatching:oi,setEnabled:Pv},Fe={autoFavorite:{enabled:false},bulkFavorite:{enabled:false},journalChecker:{enabled:false},pets:{enabled:true},cropSizeIndicator:{enabled:false,showForGrowing:true,showForMature:true,showJournalBadges:true},eggProbabilityIndicator:{enabled:false},cropValueIndicator:{enabled:false},xpTracker:{enabled:false},abilityTracker:{enabled:false},mutationTracker:{enabled:false},cropBoostTracker:{enabled:false},turtleTimer:{enabled:false}};class Mv extends Mt{constructor(){super({id:"tab-feature-settings",label:"Features"});Y(this,"config",Fe);}async build(n){const r=this.createGrid("12px");r.id="feature-settings",n.appendChild(r);const o=Ae(Re.CONFIG,{});this.config=this.mergeConfig(o),r.appendChild(this.createQOLCard()),r.appendChild(this.createVisualIndicatorsCard()),r.appendChild(this.createTrackingCard());}mergeConfig(n){return {autoFavorite:{...Fe.autoFavorite,...n.autoFavorite},bulkFavorite:{...Fe.bulkFavorite,...n.bulkFavorite},journalChecker:{...Fe.journalChecker,...n.journalChecker},pets:{...Fe.pets,...n.pets},cropSizeIndicator:{...Fe.cropSizeIndicator,...n.cropSizeIndicator},eggProbabilityIndicator:{...Fe.eggProbabilityIndicator,...n.eggProbabilityIndicator},cropValueIndicator:{...Fe.cropValueIndicator,...n.cropValueIndicator},xpTracker:{...Fe.xpTracker,...n.xpTracker},abilityTracker:{...Fe.abilityTracker,...n.abilityTracker},mutationTracker:{...Fe.mutationTracker,...n.mutationTracker},cropBoostTracker:{...Fe.cropBoostTracker,...n.cropBoostTracker},turtleTimer:{...Fe.turtleTimer,...n.turtleTimer}}}createQOLCard(){return Te({title:"Quality of Life",padding:"lg",expandable:true,defaultExpanded:true},this.createToggleRow("Auto-Favorite",this.config.autoFavorite.enabled,n=>{this.config.autoFavorite.enabled=n,this.saveConfig();}),this.createToggleRow("Bulk Favorite",this.config.bulkFavorite.enabled,n=>{this.config.bulkFavorite.enabled=n,this.saveConfig(),ii.setEnabled(n);}),this.createToggleRow("Journal Checker",this.config.journalChecker.enabled,n=>{this.config.journalChecker.enabled=n,this.saveConfig();}),this.createToggleRow("Pets Panel",this.config.pets.enabled,n=>{this.config.pets.enabled=n,this.saveConfig();},"Show/hide the Pets tab"))}createVisualIndicatorsCard(){return Te({title:"Visual Indicators",variant:"soft",padding:"lg",expandable:true,defaultExpanded:true},this.createToggleRow("Crop Size",this.config.cropSizeIndicator.enabled,n=>{this.config.cropSizeIndicator.enabled=n,this.saveConfig();},"Shows size % and journal badges"),this.createToggleRow("Egg Probability",this.config.eggProbabilityIndicator.enabled,n=>{this.config.eggProbabilityIndicator.enabled=n,this.saveConfig();},"Shows hatch chances + mutation %"),this.createToggleRow("Crop Value",this.config.cropValueIndicator.enabled,n=>{this.config.cropValueIndicator.enabled=n,this.saveConfig();},"Shows coin value"))}createTrackingCard(){return Te({title:"Tracking & Analytics",variant:"soft",padding:"lg",expandable:true,defaultExpanded:false},this.createToggleRow("XP Tracker",this.config.xpTracker.enabled,n=>{this.config.xpTracker.enabled=n,this.saveConfig();}),this.createToggleRow("Ability Tracker",this.config.abilityTracker.enabled,n=>{this.config.abilityTracker.enabled=n,this.saveConfig();}),this.createToggleRow("Mutation Tracker",this.config.mutationTracker.enabled,n=>{this.config.mutationTracker.enabled=n,this.saveConfig();}),this.createToggleRow("Crop Boost Tracker",this.config.cropBoostTracker.enabled,n=>{this.config.cropBoostTracker.enabled=n,this.saveConfig();}),this.createToggleRow("Turtle Timer",this.config.turtleTimer.enabled,n=>{this.config.turtleTimer.enabled=n,this.saveConfig();}))}createToggleRow(n,r,o,i){const a=g("div",{className:i?"kv-col":"kv"}),s=g("div",{className:"kv"}),c=Nr({text:n,tone:"default",size:"md"}),u=_n({checked:r,onChange:o});if(s.append(c.root,u.root),i){a.appendChild(s);const l=g("p",{className:"helper-text",style:"font-size: 12px; color: var(--item-desc, var(--muted)); margin-top: 4px;"},i);return a.appendChild(l),a}return s}saveConfig(){Ge(Re.CONFIG,this.config),console.log("[FeatureSettings] Config saved:",this.config);}}const Lv=(function(){const t=typeof document<"u"&&document.createElement("link").relList;return t&&t.supports&&t.supports("modulepreload")?"modulepreload":"preload"})(),_v=function(e){return "/"+e},Ya={},Fv=function(t,n,r){let o=Promise.resolve();if(n&&n.length>0){let c=function(u){return Promise.all(u.map(l=>Promise.resolve(l).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),s=a?.nonce||a?.getAttribute("nonce");o=c(n.map(u=>{if(u=_v(u),u in Ya)return;Ya[u]=true;const l=u.endsWith(".css"),d=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${d}`))return;const p=document.createElement("link");if(p.rel=l?"stylesheet":Lv,l||(p.as="script"),p.crossOrigin="",p.href=u,s&&p.setAttribute("nonce",s),document.head.appendChild(p),l)return new Promise((f,m)=>{p.addEventListener("load",f),p.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${u}`)));})}));}function i(a){const s=new Event("vite:preloadError",{cancelable:true});if(s.payload=a,window.dispatchEvent(s),!s.defaultPrevented)throw a}return o.then(a=>{for(const s of a||[])s.status==="rejected"&&i(s.reason);return t().catch(i)})},Rv=`
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
    color: var(--pill-to);
    text-transform: uppercase;
    letter-spacing: 2px;
    text-shadow: 1px 1px 0px rgba(255,255,255,0.8);
    position: relative;
    z-index: 2;
  }

  .journal-category-stats {
    font-size: 11px;
    font-weight: 800;
    color: var(--pill-to);
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
    color: var(--pill-to);
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
    color: var(--pill-to);
    margin-bottom: 8px;
    padding: 0 8px;
  }

  .journal-progress-indicator .percentage {
    color: var(--pill-to);
  }

  .journal-progress-indicator .count {
    font-size: 10px;
    opacity: 0.9;
  }
`,Ov=`
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
`;function Nv(e){const{count:t,expanded:n=false,onClick:r}=e,o=g("div",{className:"journal-see-more"}),i=g("span",{className:"journal-see-more-link"},wo(t,n));r&&i.addEventListener("click",r),o.appendChild(i);const a=o;return a.setCount=s=>{i.textContent=wo(s,n);},a.setExpanded=s=>{i.textContent=wo(t,s);},a}function wo(e,t){return t?"− Show less":`+ and ${e} more...`}const $v=e=>e<15?"#F98B4B":e<25?"#FC6D30":e<50?"#F3D32B":e<75?"#E9B52F":e<100?"#5EAC46":"#0B893F",Dv=e=>e>=100?"var(--complete)":e>=75?"var(--high)":e>=50?"var(--medium)":"var(--low)",jv={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function qa(e){return e?jv[e]??0:0}function Xa(e,t){try{if(t==="pets")return (ue.get("pets")||{})[e]?.rarity||null;if(t==="plants")return (ue.get("plants")||{})[e]?.seed?.rarity||null}catch{}return null}function zv({progress:e,activeTab:t,expandedCategories:n,onSpeciesClick:r,onToggleExpand:o}){const i=g("div",{className:"journal-content"}),a=g("div",{className:"journal-header"},"Garden Journal");if(i.appendChild(a),t!=="all"){const s=t==="plants"?e.plants:e.pets,c=g("div",{className:"journal-progress-indicator"}),u=Math.floor(s.variantsLogged/s.variantsTotal*100),l=g("span",{className:"percentage"},`Collected ${u}%`),d=g("span",{className:"count"},` (${s.variantsLogged}/${s.variantsTotal})`);c.appendChild(l),c.appendChild(d),i.appendChild(c);}return t==="all"?(i.appendChild(cr("Produce",e.plants,"plants",n.has("plants"),r,()=>o("plants"),true)),i.appendChild(cr("Pets",e.pets,"pets",n.has("pets"),r,()=>o("pets"),true))):t==="plants"?i.appendChild(cr("Produce",e.plants,"plants",n.has("plants"),r,()=>o("plants"))):i.appendChild(cr("Pets",e.pets,"pets",n.has("pets"),r,()=>o("pets"))),i}function cr(e,t,n,r,o,i,a=false){const s=g("div",{style:"display: flex; flex-direction: column;"}),c=g("div",{style:`
            max-height: ${r?"480px":"none"};
            overflow-y: ${r?"auto":"visible"};
            overflow-x: hidden;
            margin-bottom: 8px;
        `,className:"journal-species-list"}),u=g("div",{className:"journal-category-stats",style:"height: 28px; line-height: 28px; margin-bottom: 0; display: flex; align-items: center; gap: 6px;"}),l=g("div",{style:"width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(ne.isReady()){const h=n==="plants"?"plant":"pet",y=n==="plants"?"Carrot":"CommonEgg";if(ne.has(h,y)){const S=ne.toCanvas(h,y,{scale:.3});S.style.maxWidth="20px",S.style.maxHeight="20px",S.style.display="block",l.appendChild(S);}}}catch{}const d=t.speciesDetails.length,p=t.total,f=g("span",{},`[ ${e.toUpperCase()} ] — ${d}/${p} SPECIES`);if(u.append(l,f),s.appendChild(u),a){const h=g("div",{className:"journal-progress-indicator",style:"text-align: right; margin-bottom: 4px;"}),y=Math.floor(t.variantsLogged/t.variantsTotal*100),S=g("span",{className:"percentage"},`Collected ${y}%`),v=g("span",{className:"count"},` (${t.variantsLogged}/${t.variantsTotal})`);h.appendChild(S),h.appendChild(v),s.appendChild(h);}const m=[...t.speciesDetails].sort((h,y)=>{const S=Xa(h.species,n),v=Xa(y.species,n),k=qa(S)-qa(v);return k!==0?k:h.species.localeCompare(y.species,void 0,{numeric:true,sensitivity:"base"})}),b=r?m:m.slice(0,5);for(const h of b)c.appendChild(Bv(h,n,o));if(s.appendChild(c),t.speciesDetails.length>5){const h=Nv({count:t.speciesDetails.length-5,expanded:r,onClick:()=>{i();}});s.appendChild(h);}else s.appendChild(g("div",{style:"height: 28px;"}));return s}function Bv(e,t,n){const r=g("div",{className:"journal-row",style:"height: 56px;",onclick:p=>{p.stopPropagation(),n(e,t);}}),o=g("div",{style:"width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{let f=t==="plants"?"plant":"pet",m=e.species;t==="plants"&&(e.species==="DawnCelestial"&&(m="DawnCelestialCrop"),e.species==="MoonCelestial"&&(m="MoonCelestialCrop"),e.species==="OrangeTulip"&&(m="Tulip"));const b=e.isComplete?["Rainbow"]:[],h=(S,v)=>{try{if(ne.has(S,v))return ne.toCanvas(S,v,{scale:.4,mutations:b})}catch{}return null},y=h(f,m)||(t==="plants"?h("tallplant",m):null)||h(f,m.toLowerCase())||(t==="plants"?h("tallplant",m.toLowerCase()):null);y?(y.style.maxWidth="32px",y.style.maxHeight="32px",y.style.display="block",o.appendChild(y)):console.warn(`[JournalChecker] No sprite found for ${e.species} in ${t}`);}catch(p){console.error(`[JournalChecker] Sprite error for ${e.species}`,p);}const i=g("div",{style:"flex: 1; position: relative; height: 22px;"}),a=g("div",{className:"journal-bar-container",style:"width: 100%; height: 100%; border-radius: 4px; overflow: hidden;"});let s;if(e.isComplete)s="width: 100%; height: 100%; background: linear-gradient(90deg, rgb(255,0,0) 0%, rgb(255,154,0) 14%, rgb(255,255,0) 28%, rgb(0,255,0) 42%, rgb(0,200,255) 56%, rgb(0,0,255) 70%, rgb(143,0,255) 84%, rgb(255,0,255) 100%);";else {const p=$v(e.variantsPercentage);s=`width: ${Math.max(2,e.variantsPercentage)}%; height: 100%; background: ${p};`;}const c=g("div",{className:e.isComplete?"journal-bar-fill rainbow":"journal-bar-fill",style:s});a.appendChild(c);const u=g("div",{style:"position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-weight: 600; font-size: 14px; color: var(--journal-ink); z-index: 1; pointer-events: none;"},e.species);i.append(a,u);const l=Dv(e.variantsPercentage),d=g("span",{style:`flex-shrink: 0; font-weight: 800; font-size: 13px; min-width: 50px; text-align: right; color: ${l};`},`${Math.round(e.variantsPercentage)}%`);return r.append(o,i,d),r}function Gv({species:e,category:t,onBack:n}){const r=g("div",{className:"journal-content"}),o=g("div",{className:"journal-back",onclick:u=>{u.stopPropagation(),n();}},"← Return");r.appendChild(o);const i=g("div",{className:"journal-header"},e.species);r.appendChild(i);const a=g("div",{className:"journal-category-stats",style:"text-align: center; height: 28px; line-height: 28px; margin-bottom: 28px;"},`[ ${e.variantsLogged.length} / ${e.variantsTotal} STAMPS ]`);r.appendChild(a);const s=g("div",{className:"journal-grid"}),c=[...e.variantsLogged,...e.variantsMissing].sort((u,l)=>u==="Normal"?-1:l==="Normal"||u==="Max Weight"?1:l==="Max Weight"?-1:u.localeCompare(l));for(const u of c){const l=e.variantsLogged.includes(u);s.appendChild(Wv(e.species,u,t,l));}return r.appendChild(s),r}function Wv(e,t,n,r){const o=g("div",{className:"journal-stamp-wrapper"}),i=g("div",{className:"journal-stamp",style:r?"":"opacity: 0.1; filter: grayscale(100%);"});try{const s=t!=="Normal"&&t!=="Max Weight"?[t]:[];let u=n==="plants"?"plant":"pet",l=e;n==="plants"&&(e==="DawnCelestial"&&(l="DawnCelestialCrop"),e==="MoonCelestial"&&(l="MoonCelestialCrop"),e==="OrangeTulip"&&(l="Tulip"));const d=(f,m)=>{try{const b=t==="Max Weight"?.72:.6;if(ne.has(f,m))return ne.toCanvas(f,m,{mutations:s,scale:b,boundsMode:"padded"})}catch{}return null},p=d(u,l)||(n==="plants"?d("tallplant",l):null)||d(u,l.toLowerCase())||(n==="plants"?d("tallplant",l.toLowerCase()):null);p&&(p.style.width="44px",p.style.height="44px",p.style.objectFit="contain",p.style.display="block",i.appendChild(p));}catch{}const a=g("div",{className:"journal-stamp-label"},t);return o.append(i,a),o}const Hv=`
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
`;function Uv(e){const{label:t,tabId:n,tabIndex:r,active:o=false,onClick:i}=e,a=g("button",{className:`journal-tab ${o?"active":""}`,"data-tab":n,"data-tab-index":String(r)},t),s=`var(--journal-tab-${Math.min(5,Math.max(1,r))})`;a.style.setProperty("--tab-color",s),i&&a.addEventListener("click",i);const c=a;return c.setActive=u=>{u?a.classList.add("active"):a.classList.remove("active");},c.setLabel=u=>{a.textContent=u;},c}const Vv=`
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
`,Kv={activeTab:"all",expandedCategories:[]};let Ct=null;async function Yv(){return Ct||(Ct=await Or("tab-journal-checker",{version:1,defaults:Kv}),Ct)}function dr(){if(!Ct)throw new Error("[JournalChecker] Section state not initialized. Call initSectionState() first.");return Ct}function ur(){return Ct!==null}const qv=[{id:"all",label:"All",colorTheme:"teal"},{id:"plants",label:"Crops",colorTheme:"green"},{id:"pets",label:"Pets",colorTheme:"purple"}];class Xv extends Mt{constructor(){super({id:"tab-journal-checker",label:"Journal"});Y(this,"progress",null);Y(this,"currentView",{type:"overview"});}async build(n){this.container=n,await Yv(),await ne.init(),console.log("[JournalChecker] Sprite categories:",ne.getCategories());const r=n.getRootNode();zt(r,Rv,"journal-checker-styles"),zt(r,Hv,"journal-tab-styles"),zt(r,Vv,"journal-progress-bar-styles"),zt(r,Ov,"journal-see-more-styles"),this.container.classList.add("journal-checker-host"),this.container.style.height="100%",this.container.style.overflowY="auto",await this.updateProgress();const o=(i=>{this.progress=i.detail,this.refresh();});window.addEventListener("gemini:journal-updated",o),this.addCleanup(()=>{window.removeEventListener("gemini:journal-updated",o);});}async updateProgress(){try{const{MGJournalChecker:n}=await Fv(async()=>{const{MGJournalChecker:r}=await Promise.resolve().then(()=>Xy);return {MGJournalChecker:r}},void 0);this.progress=await n.aggregateJournalProgress(),this.refresh();}catch(n){console.error("[JournalChecker] Failed to load progress:",n);}}get activeTab(){return ur()?dr().get().activeTab:"all"}set activeTab(n){ur()&&dr().update({activeTab:n});}get expandedCategories(){return ur()?new Set(dr().get().expandedCategories):new Set}setExpandedCategories(n){ur()&&dr().update({expandedCategories:Array.from(n)});}refresh(){if(this.container){if(this.container.innerHTML="",!this.progress){this.container.appendChild(g("div",{style:"padding: 20px; text-align: center; font-family: var(--font-game); color: var(--journal-sub);"},"Loading Journal..."));return}this.container.appendChild(this.renderTabNavigation()),this.currentView.type==="overview"?this.container.appendChild(zv({progress:this.progress,activeTab:this.activeTab,expandedCategories:this.expandedCategories,onSpeciesClick:(n,r)=>{this.currentView={type:"species",species:n,category:r},this.refresh();},onToggleExpand:n=>{const r=this.expandedCategories;r.has(n)?r.delete(n):r.add(n),this.setExpandedCategories(r),this.refresh();}})):this.container.appendChild(Gv({species:this.currentView.species,category:this.currentView.category,onBack:()=>{this.currentView={type:"overview"},this.refresh();}}));}}renderTabNavigation(){const n=g("div",{className:"journal-tabs-container"});return qv.forEach((r,o)=>{const i=Uv({label:r.label,tabId:r.id,tabIndex:o+1,active:this.activeTab===r.id,onClick:()=>{this.activeTab=r.id,this.refresh();}});n.appendChild(i);}),n}}function Jv(){const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.setAttribute("viewBox","0 0 24 24"),e.setAttribute("width","24"),e.setAttribute("height","24"),e.setAttribute("fill","none"),e.setAttribute("stroke","currentColor"),e.setAttribute("stroke-width","2"),e.setAttribute("stroke-linecap","round"),e.style.color="var(--accent)";const t=document.createElementNS("http://www.w3.org/2000/svg","line");t.setAttribute("x1","12"),t.setAttribute("y1","5"),t.setAttribute("x2","12"),t.setAttribute("y2","19");const n=document.createElementNS("http://www.w3.org/2000/svg","line");return n.setAttribute("x1","5"),n.setAttribute("y1","12"),n.setAttribute("x2","19"),n.setAttribute("y2","12"),e.appendChild(t),e.appendChild(n),e}function Qv(e,t){const n=e;let r=e;const o=Vt({value:e,placeholder:"Team name",mode:"alphanumeric",allowSpaces:true,maxLength:50,blockGameKeys:true,onChange:i=>{const a=i.trim();a&&a!==r&&(r=a,t?.(a));},onEnter:i=>{const a=i.trim()||n;a!==r&&(r=a,t?.(a));}});return o.root.className="team-list-item__name-input",o.input.addEventListener("blur",()=>{const i=o.getValue().trim()||n;i!==r&&(r=i,t?.(i));}),o.input.addEventListener("keydown",i=>{i.key==="Escape"&&(i.preventDefault(),o.input.blur());}),o.root}function Zv(e){const t=g("div",{className:"team-list-item"}),n=e.customIndicator??g("div",{className:`team-list-item__indicator ${e.isActive?"team-list-item__indicator--active":"team-list-item__indicator--inactive"}`}),r=e.isNameEditable?Qv(e.team.name,e.onNameChange):g("div",{textContent:e.team.name,className:`team-list-item__name ${e.isActive?"team-list-item__name--active":"team-list-item__name--inactive"}`}),o=g("div",{className:"team-list-item__sprites"});function i(){const c=it.myPets.get();o.innerHTML="";for(let u=0;u<3;u++){const l=e.team.petIds[u],d=l&&l!=="",p=g("div",{className:`team-list-item__sprite-slot ${e.showSlotStyles&&!d?"team-list-item__sprite-slot--empty":""}`});if(e.onSlotClick&&(p.style.cursor="pointer",p.addEventListener("click",()=>{e.onSlotClick(u);})),d){let f=c.all.find(m=>m.id===l);if(!f){const m=window.__petDataCache;m&&m.has(l)&&(f=m.get(l));}if(f)try{const m=ne.toCanvas("pet",f.petSpecies,{mutations:f.mutations,scale:1}),b=document.createElement("canvas");b.width=m.width,b.height=m.height;const h=b.getContext("2d");if(h&&h.drawImage(m,0,0),b.style.width="100%",b.style.height="100%",b.style.objectFit="contain",p.appendChild(b),e.showSlotStyles){const y=g("div",{className:"team-list-item__sprite-slot-overlay"});p.appendChild(y),p.classList.add("team-list-item__sprite-slot--filled");}}catch(m){console.warn(`[TeamListItem] Failed to render sprite for pet ${f.petSpecies}:`,m);const b=g("div",{textContent:"🐾",className:"team-list-item__sprite-placeholder"});p.appendChild(b);}else {const m=g("div",{textContent:"⏳",className:"team-list-item__sprite-placeholder"});p.appendChild(m),console.warn(`[TeamListItem] Pet ${l} not found in myPets yet, waiting for update`);let b=false;const h=it.myPets.subscribe(()=>{if(b)return;const S=it.myPets.get().all.find(v=>v.id===l);if(S){b=true,h();try{p.innerHTML="";const v=ne.toCanvas("pet",S.petSpecies,{mutations:S.mutations,scale:1}),k=document.createElement("canvas");k.width=v.width,k.height=v.height;const A=k.getContext("2d");if(A&&A.drawImage(v,0,0),k.style.width="100%",k.style.height="100%",k.style.objectFit="contain",p.appendChild(k),e.showSlotStyles){const x=g("div",{className:"team-list-item__sprite-slot-overlay"});p.appendChild(x),p.classList.add("team-list-item__sprite-slot--filled");}console.log(`[TeamListItem] Pet ${l} sprite updated`);}catch(v){console.warn(`[TeamListItem] Failed to render sprite for pet ${S.petSpecies}:`,v),p.innerHTML="<div class='team-list-item__sprite-placeholder'>🐾</div>";}}},{immediate:false});}}else if(e.showSlotStyles&&!d){const f=Jv();p.appendChild(f);}o.appendChild(p);}}i();const a=it.myPets.subscribe(()=>{i();});if(!e.hideDragHandle){const c=g("div",{textContent:"⋮⋮",className:"team-list-item__drag-handle"});t.appendChild(c);}t.appendChild(n),t.appendChild(r),t.appendChild(o);const s=new MutationObserver(()=>{document.contains(t)||(s.disconnect(),a());});return s.observe(document.body,{childList:true,subtree:true}),t}function ex(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function tx(e){const{segments:t,selected:n=t[0]?.id??"",size:r="md",fullWidth:o=false,disabled:i=false,onChange:a}=e,s=g("div",{className:"sg-root"});r!=="md"&&s.classList.add(`sg--${r}`),o&&(s.style.width="100%");const c=g("div",{className:"sg-container",role:"tablist"}),u=g("div",{className:"sg-indicator"}),l=t.map(x=>{const C=g("button",{className:"sg-btn",type:"button",role:"tab","aria-selected":"false",title:x.label});if(C.id=x.id,x.icon){const w=g("span",{className:"sg-icon"}),T=ex(x.icon);T&&w.appendChild(T),C.appendChild(w);}const E=g("span",{className:"sg-label"},x.label);return C.appendChild(E),C.disabled=!!x.disabled,C});c.appendChild(u),l.forEach(x=>c.appendChild(x)),s.appendChild(c);let d=n,p=i;function f(){const x=l.find(C=>C.id===d);x&&requestAnimationFrame(()=>{const C=u,E=x.offsetLeft,w=x.offsetWidth;C.style.width=`${w}px`,C.style.transform=`translateX(${E}px)`;});}function m(){l.forEach(x=>{const C=x.id===d;x.classList.toggle("active",C),x.setAttribute("aria-selected",String(C)),x.disabled=p||!!t.find(E=>E.id===x.id)?.disabled;}),f();}function b(x){const C=x.currentTarget;if(C.disabled)return;y(C.id);}function h(x){if(p)return;const C=l.findIndex(w=>w.id===d);let E=C;if(x.key==="ArrowLeft"||x.key==="ArrowUp"?(x.preventDefault(),E=(C-1+l.length)%l.length):x.key==="ArrowRight"||x.key==="ArrowDown"?(x.preventDefault(),E=(C+1)%l.length):x.key==="Home"?(x.preventDefault(),E=0):x.key==="End"&&(x.preventDefault(),E=l.length-1),E!==C){const w=l[E];w&&!w.disabled&&(y(w.id),w.focus());}}l.forEach(x=>{x.addEventListener("click",b),x.addEventListener("keydown",h);});function y(x){!t.some(E=>E.id===x)||d===x||(d=x,m(),a?.(d));}function S(){return d}function v(x){p=!!x,m();}function k(){l.forEach(x=>{x.removeEventListener("click",b),x.removeEventListener("keydown",h);});}m(),queueMicrotask(()=>{const x=l.find(C=>C.id===d);if(x){const C=u;C.style.width=`${x.offsetWidth}px`,C.style.transform=`translateX(${x.offsetLeft}px)`;}});const A=s;return A.select=y,A.getSelected=S,A.setDisabled=v,A.destroy=k,A}function nx(e={}){const{id:t,checked:n=false,disabled:r=false,size:o="md",label:i,labelSide:a="right",onChange:s}=e,c=g("div",{className:"lg-checkbox-wrap"}),u=g("input",{className:`lg-checkbox lg-checkbox--${o}`,id:t,type:"checkbox",checked:!!n,disabled:!!r});let l=null;i&&a!=="none"&&(l=g("label",{className:"lg-checkbox-label",htmlFor:t},i)),l&&a==="left"?c.append(l,u):l&&a==="right"?c.append(u,l):c.append(u);let d=!!n,p=!!r;function f(){u.checked=d,u.disabled=p;}function m(C=false){p||(d=!d,f(),C||s?.(d));}function b(){p||m();}function h(C){p||(C.key===" "||C.key==="Enter")&&(C.preventDefault(),m());}u.addEventListener("click",b),u.addEventListener("keydown",h);function y(){return d}function S(C,E=false){d=!!C,f(),E||s?.(d);}function v(C){p=!!C,f();}function k(C){if(!C){l&&(l.remove(),l=null);return}l?l.textContent=C:(l=g("label",{className:"lg-checkbox-label",htmlFor:t},C),c.append(l));}function A(){u.focus();}function x(){u.removeEventListener("click",b),u.removeEventListener("keydown",h);}return f(),{root:c,input:u,isChecked:y,setChecked:S,setDisabled:v,setLabel:k,focus:A,destroy:x}}function rx(e){const t=getComputedStyle(e);if(!/(auto|scroll|overlay)/.test(t.overflowY+t.overflowX))return  false;const n=e.scrollHeight,r=e.clientHeight,o=e.scrollWidth,i=e.clientWidth;return n>r+1||o>i+1}function ox(e){const t={overflow:e.style.overflow,overflowY:e.style.overflowY,overflowX:e.style.overflowX,touchAction:e.style.touchAction,overscrollBehavior:e.style.overscrollBehavior};e.style.overflow="hidden",e.style.overflowY="hidden",e.style.overflowX="hidden",e.style.touchAction="none",e.style.overscrollBehavior="contain";let n=false;return ()=>{n||(n=true,e.style.overflow=t.overflow,e.style.overflowY=t.overflowY,e.style.overflowX=t.overflowX,e.style.touchAction=t.touchAction,e.style.overscrollBehavior=t.overscrollBehavior);}}function ix(e){const t=[],n=new Set;let r=e;for(;r;){if(r instanceof ShadowRoot){r=r.host;continue}if(r instanceof HTMLElement)!n.has(r)&&r!==e&&rx(r)&&(t.push(r),n.add(r)),r=r.parentElement??r.parentNode;else break}return document.body&&t.push(document.body),document.documentElement&&t.push(document.documentElement),t.filter((o,i,a)=>a.indexOf(o)===i)}function ax(e){const n=ix(e).map(ox);let r=false;return ()=>{if(!r){r=true;for(let o=n.length-1;o>=0;o--)try{n[o]();}catch{}}}}class sx{constructor(t={}){Y(this,"card",null);Y(this,"modeControl",null);Y(this,"modeContainer",null);Y(this,"teamContent",null);Y(this,"listContainer",null);Y(this,"dragState",null);Y(this,"longPressState",null);Y(this,"teamMode","overview");Y(this,"selectedTeamIds",new Set);Y(this,"teamCheckboxes",new Map);Y(this,"onPointerMove");Y(this,"onPointerUp");Y(this,"onPointerCancel");Y(this,"onLongPressPointerMove");Y(this,"onLongPressPointerUp");Y(this,"options");this.options=t,this.onPointerMove=this.handlePointerMove.bind(this),this.onPointerUp=this.handlePointerUp.bind(this),this.onPointerCancel=this.handlePointerCancel.bind(this),this.onLongPressPointerMove=this.handleLongPressPointerMove.bind(this),this.onLongPressPointerUp=this.handleLongPressPointerUp.bind(this);}build(){return this.card?this.card:this.createTeamCard()}destroy(){this.cleanupDrag(),this.cleanupLongPress(),this.modeControl&&(this.modeControl.destroy(),this.modeControl=null),this.teamCheckboxes.forEach(t=>{t.destroy();}),this.teamCheckboxes.clear(),this.selectedTeamIds.clear(),this.card=null,this.modeContainer=null,this.teamContent=null,this.listContainer=null;}render(){if(!this.card)return;if(!be.isEnabled()){this.renderDisabledState();return}this.modeContainer&&(this.modeContainer.style.display="flex"),this.ensureModeControl(),this.renderTeamContent();}createTeamCard(){const t=g("div",{className:"team-card-wrapper"});this.modeContainer=g("div",{className:"team-card__mode-container"}),t.appendChild(this.modeContainer),this.teamContent=g("div",{className:"team-card__content"}),t.appendChild(this.teamContent);const n=Te({title:"Team",expandable:true,defaultExpanded:true},t);return this.card=n,n}ensureModeControl(){if(this.modeContainer){if(!this.modeControl){this.modeControl=tx({segments:[{id:"overview",label:"Overview"},{id:"manage",label:"Manage"}],selected:this.teamMode,onChange:t=>{this.teamMode=t,this.renderTeamContent();}}),this.modeContainer.appendChild(this.modeControl);return}this.modeControl.getSelected()!==this.teamMode&&this.modeControl.select(this.teamMode);}}renderDisabledState(){if(!this.teamContent)return;this.cleanupDrag(),this.listContainer=null,this.modeContainer&&(this.modeContainer.style.display="none");const t=g("div",{className:"team-card__disabled-state"}),n=g("div",{textContent:"Pet Team feature is disabled",className:"team-card__disabled-message"}),r=Pe({label:"Enable Feature",onClick:()=>{be.setEnabled(true),this.render();}});t.appendChild(n),t.appendChild(r),this.teamContent.replaceChildren(t);}renderTeamContent(){if(!this.teamContent)return;this.cleanupDrag(),this.cleanupLongPress(),this.listContainer=null,this.teamContent.replaceChildren(),this.teamCheckboxes.forEach(r=>r.destroy()),this.teamCheckboxes.clear(),this.selectedTeamIds.clear();const t=be.getAllTeams(),n=be.getActiveTeamId();if(t.length===0){const r=g("div",{textContent:"No teams yet. Create your first team!",className:"team-card__empty-state"});if(this.teamContent.appendChild(r),this.teamMode==="manage"){const o=g("div",{className:"team-card__actions"}),i=Pe({label:"New Team",variant:"primary",onClick:()=>{this.handleCreateTeam();}});o.appendChild(i),this.teamContent.appendChild(o);}return}if(this.listContainer=g("div",{className:"team-card__list-container"}),t.forEach(r=>{const o=n===r.id;let i;this.teamMode==="manage"&&(i=this.createCheckboxIndicator(r.id));const a=Zv({team:r,isActive:o,customIndicator:i?.root,hideDragHandle:this.teamMode==="manage",isNameEditable:this.teamMode==="manage",showSlotStyles:this.teamMode==="manage",onNameChange:s=>{this.handleRenameTeam(r.id,s);},onSlotClick:this.teamMode==="manage"?s=>{this.handleRemovePet(r.id,s);}:void 0});this.teamMode==="manage"&&a.classList.add("team-list-item--manage"),this.teamMode==="overview"&&(a.addEventListener("click",async s=>{if(!s.target.closest(".team-list-item__drag-handle")){a.classList.add("team-list-item--clicked"),setTimeout(()=>{a.classList.remove("team-list-item--clicked");},300);try{await be.activateTeam(r);}catch(u){console.error("[TeamCard] Failed to activate team:",u);}}}),a.addEventListener("pointerdown",s=>{if(s.button!==0)return;s.target.closest(".team-list-item__drag-handle")?this.startDrag(s,a,r.id):this.startLongPress(s,a,r.id);})),this.listContainer.appendChild(a);}),this.teamContent.appendChild(this.listContainer),this.teamMode==="manage"){const r=g("div",{className:"team-card__actions"}),o=Pe({label:"New Team",variant:"primary",onClick:()=>{this.handleCreateTeam();}}),i=Pe({label:"Delete Team",variant:"danger",disabled:this.selectedTeamIds.size===0,onClick:()=>{this.handleDeleteTeam();}});i.setAttribute("data-action","delete-team"),r.appendChild(o),r.appendChild(i),this.teamContent.appendChild(r);}}handleCreateTeam(){const t="New Team";let n=t,r=1;const o=be.getAllTeams(),i=new Set(o.map(a=>a.name));for(;i.has(n);)n=`${t} (${r})`,r++;try{be.createTeam(n,[])&&this.render();}catch{}}handleDeleteTeam(){if(this.selectedTeamIds.size===0)return;const t=Array.from(this.selectedTeamIds);for(const n of t)be.deleteTeam(n);this.render();}handleRenameTeam(t,n){be.renameTeam(t,n);}handleRemovePet(t,n){const r=be.getTeam(t);if(!r)return;const o=r.petIds[n];!o||o===""?this.handleAddPet(t,n):this.handleRemovePetFromSlot(t,n);}handleRemovePetFromSlot(t,n){const r=be.getTeam(t);if(!r)return;const o=[...r.petIds];o[n]="",be.updateTeam(t,{petIds:o}),this.render();}async handleAddPet(t,n){const r=be.getTeam(t);if(!r)return;const i=it.myPets.get().all.map(f=>({id:f.id,itemType:"Pet",petSpecies:f.petSpecies,name:f.name??null,xp:f.xp,hunger:f.hunger,mutations:f.mutations||[],targetScale:f.targetScale,abilities:f.abilities||[]})),a=new Set(r.petIds.filter(f=>f!=="")),s=i.filter(f=>!a.has(f.id));await pe.set("myPossiblyNoLongerValidSelectedItemIndexAtom",null);const c=_e.detect(),u=c.platform==="mobile"||c.viewportWidth<768;console.log("[TeamCard] Environment detection:",{platform:c.platform,viewportWidth:c.viewportWidth,isSmallScreen:u,hasSetHUDOpen:!!this.options.setHUDOpen}),u&&this.options.setHUDOpen&&(console.log("[TeamCard] Closing HUD for small screen"),this.options.setHUDOpen(false));const l=it.myInventory.subscribeSelection(f=>{if(f.current&&f.current.item){const m=f.current.item,b=[...r.petIds];b[n]=m.id,be.updateTeam(t,{petIds:b}),pe.set("myPossiblyNoLongerValidSelectedItemIndexAtom",null),hn.close().then(()=>{const h=_e.detect(),y=h.platform==="mobile"||h.viewportWidth<768;console.log("[TeamCard] After selection - reopening HUD:",{platform:h.platform,viewportWidth:h.viewportWidth,shouldReopenHUD:y,hasSetHUDOpen:!!this.options.setHUDOpen}),y&&this.options.setHUDOpen&&(console.log("[TeamCard] Reopening HUD after selection"),this.options.setHUDOpen(true)),this.render();});}});await hn.show("inventory",{items:s,favoritedItemIds:[]}),await hn.waitForClose();const d=_e.detect(),p=d.platform==="mobile"||d.viewportWidth<768;console.log("[TeamCard] Modal closed without selection - reopening HUD:",{platform:d.platform,viewportWidth:d.viewportWidth,shouldReopenHUD:p,hasSetHUDOpen:!!this.options.setHUDOpen}),p&&this.options.setHUDOpen&&(console.log("[TeamCard] Reopening HUD after modal close"),this.options.setHUDOpen(true)),l();}createCheckboxIndicator(t){const n=nx({checked:this.selectedTeamIds.has(t),size:"md",onChange:r=>{r?this.selectedTeamIds.add(t):this.selectedTeamIds.delete(t),this.updateDeleteButtonState();}});return this.teamCheckboxes.set(t,n),n}updateDeleteButtonState(){const t=this.teamContent?.querySelector('[data-action="delete-team"]');t&&(t.disabled=this.selectedTeamIds.size===0);}cleanupDrag(){this.dragState&&(window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),window.removeEventListener("pointercancel",this.onPointerCancel),this.dragState=null);}cleanupLongPress(){this.longPressState&&(window.clearTimeout(this.longPressState.timeout),window.removeEventListener("pointermove",this.onLongPressPointerMove),window.removeEventListener("pointerup",this.onLongPressPointerUp),this.longPressState=null);}startLongPress(t,n,r){if(this.cleanupLongPress(),be.getAllTeams().findIndex(u=>u.id===r)===-1)return;const a=t.clientX,s=t.clientY,c=window.setTimeout(()=>{this.longPressState&&this.startDrag(t,n,r);},500);this.longPressState={pointerId:t.pointerId,startX:a,startY:s,timeout:c,target:n},window.addEventListener("pointermove",this.onLongPressPointerMove,{passive:false}),window.addEventListener("pointerup",this.onLongPressPointerUp,{passive:false});}handleLongPressPointerMove(t){if(!this.longPressState||t.pointerId!==this.longPressState.pointerId)return;const n=Math.abs(t.clientX-this.longPressState.startX),r=Math.abs(t.clientY-this.longPressState.startY),o=10;(n>o||r>o)&&this.cleanupLongPress();}handleLongPressPointerUp(t){!this.longPressState||t.pointerId!==this.longPressState.pointerId||this.cleanupLongPress();}handlePointerMove(t){if(!this.dragState||!this.listContainer||t.pointerId!==this.dragState.pointerId)return;t.preventDefault();const n=this.listContainer.getBoundingClientRect();let r=t.clientY-n.top-this.dragState.offsetY;const o=n.height-this.dragState.itemEl.offsetHeight;Number.isFinite(o)&&(r=Math.max(-8,Math.min(o+8,r))),this.dragState.itemEl.style.top=`${r}px`,this.updatePlaceholderPosition(t.clientY);}handlePointerUp(t){!this.dragState||t.pointerId!==this.dragState.pointerId||(t.preventDefault(),this.finishDrag());}handlePointerCancel(t){!this.dragState||t.pointerId!==this.dragState.pointerId||this.finishDrag({revert:true});}updatePlaceholderPosition(t){if(!this.dragState||!this.listContainer)return;const{placeholder:n,itemEl:r}=this.dragState,o=Array.from(this.listContainer.children).filter(s=>s!==r&&s!==n&&s instanceof HTMLElement&&s.classList.contains("team-list-item")),i=new Map;o.forEach(s=>{i.set(s,s.getBoundingClientRect().top);});let a=false;for(const s of o){const c=s.getBoundingClientRect(),u=c.top+c.height/2;if(t<u){n.nextSibling!==s&&this.listContainer.insertBefore(n,s),a=true;break}}a||this.listContainer.appendChild(n),o.forEach(s=>{const c=i.get(s),u=s.getBoundingClientRect().top;if(c!==void 0&&c!==u){const l=c-u;s.style.transform=`translateY(${l}px)`,s.style.transition="none",s.offsetHeight,s.style.transition="transform 0.14s ease",s.style.transform="translateY(0)";}});}startDrag(t,n,r){if(this.dragState||!this.listContainer)return;t.preventDefault();const i=be.getAllTeams().findIndex(d=>d.id===r);if(i===-1)return;const a=n.getBoundingClientRect(),s=this.listContainer.getBoundingClientRect(),c=n.cloneNode(true);c.classList.add("team-list-item--placeholder"),c.classList.remove("team-list-item--dragging");const u=n.style.touchAction;n.style.touchAction="none";const l=ax(n);if(this.dragState={itemEl:n,pointerId:t.pointerId,placeholder:c,offsetY:t.clientY-a.top,fromIndex:i,teamId:r,captureTarget:n,touchActionPrev:u,releaseScrollLock:l},n.classList.add("team-list-item--dragging"),n.style.width=`${a.width}px`,n.style.height=`${a.height}px`,n.style.left=`${a.left-s.left}px`,n.style.top=`${a.top-s.top}px`,n.style.position="absolute",n.style.zIndex="30",n.style.pointerEvents="none",this.listContainer.style.position||(this.listContainer.style.position="relative"),this.listContainer.insertBefore(c,n.nextSibling),this.listContainer.classList.add("is-reordering"),n.setPointerCapture)try{n.setPointerCapture(t.pointerId);}catch{}window.addEventListener("pointermove",this.onPointerMove,{passive:false}),window.addEventListener("pointerup",this.onPointerUp,{passive:false}),window.addEventListener("pointercancel",this.onPointerCancel,{passive:false});}finishDrag(t={}){if(!this.dragState||!this.listContainer)return;const{revert:n=false}=t,{itemEl:r,placeholder:o,fromIndex:i,teamId:a,touchActionPrev:s,releaseScrollLock:c,pointerId:u}=this.dragState;if(this.listContainer.classList.remove("is-reordering"),r.hasPointerCapture(u))try{r.releasePointerCapture(u);}catch{}if(window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),window.removeEventListener("pointercancel",this.onPointerCancel),n){const p=Array.from(this.listContainer.children).filter(f=>f!==r&&f!==o&&f instanceof HTMLElement&&f.classList.contains("team-list-item"))[i]||null;p?this.listContainer.insertBefore(o,p):this.listContainer.appendChild(o);}else {const d=Array.from(this.listContainer.children).filter(f=>f!==r),p=d.indexOf(o);if(p!==-1){const f=d[p];f!==o&&this.listContainer.insertBefore(o,f);}}if(o.replaceWith(r),o.remove(),r.classList.remove("team-list-item--dragging"),r.style.width="",r.style.height="",r.style.left="",r.style.top="",r.style.position="",r.style.zIndex="",r.style.pointerEvents="",r.style.touchAction=s??"",Array.from(this.listContainer.children).filter(d=>d instanceof HTMLElement&&d.classList.contains("team-list-item")).forEach(d=>{d.style.transform="",d.style.transition="";}),c?.(),!n){const p=Array.from(this.listContainer.children).filter(f=>f instanceof HTMLElement&&f.classList.contains("team-list-item")).indexOf(r);if(p!==-1&&p!==i){const m=be.getAllTeams().slice(),[b]=m.splice(i,1);m.splice(p,0,b);const h=m.map(y=>y.id);be.reorderTeams(h),this.options.onTeamReordered?.(h);}}this.dragState=null;}}class lx extends Mt{constructor(n){super({id:"tab-pets",label:"Pets"});Y(this,"unsubscribeMyPets");Y(this,"lastActiveTeamId",null);Y(this,"teamCardPart",null);Y(this,"deps");this.deps=n;}async build(n){this.container=n;const r=this.createGrid("12px");r.id="pets",n.appendChild(r),this.initializeTeamCardPart(r),this.unsubscribeMyPets=it.myPets.subscribeStable(()=>{const o=be.getActiveTeamId();o!==this.lastActiveTeamId&&(this.lastActiveTeamId=o,this.teamCardPart?.render());}),this.lastActiveTeamId=be.getActiveTeamId();}async destroy(){this.unsubscribeMyPets&&(this.unsubscribeMyPets(),this.unsubscribeMyPets=void 0),this.teamCardPart&&(this.teamCardPart.destroy(),this.teamCardPart=null);}initializeTeamCardPart(n){this.teamCardPart||(this.teamCardPart=new sx({onTeamReordered:o=>{console.log("[PetsSection] Teams reordered:",o);},setHUDOpen:this.deps?.setHUDOpen}));const r=this.teamCardPart.build();n.replaceChildren(r),this.teamCardPart.render();}}const Ec={Store:{select:pe.select.bind(pe),set:pe.set.bind(pe),subscribe:pe.subscribe.bind(pe),subscribeImmediate:pe.subscribeImmediate.bind(pe)},Globals:it,Modules:{Version:Ss,Assets:qt,Manifest:ft,Data:ue,Environment:_e,CustomModal:hn,Sprite:ne,Tile:Je,Pixi:Mn,Audio:Il,Cosmetic:Pl},Features:{AutoFavorite:Di,JournalChecker:nc,BulkFavorite:Fr,Achievements:ac,Tracker:Sc,AntiAfk:Tt,Calculators:$l,Pets:Cc,PetTeam:be},WebSocket:{chat:ub,emote:pb,wish:fb,kickPlayer:gb,setPlayerData:mb,usurpHost:hb,reportSpeakingStart:bb,setSelectedGame:yb,voteForGame:vb,requestGame:xb,restartGame:wb,ping:kb,checkWeatherStatus:Ab,move:Sb,playerPosition:Gl,teleport:Cb,moveInventoryItem:Tb,dropObject:Ib,pickupObject:Eb,toggleFavoriteItem:qr,putItemInStorage:Ni,retrieveItemFromStorage:$i,moveStorageItem:Pb,logItems:Mb,plantSeed:Lb,waterPlant:_b,harvestCrop:Fb,sellAllCrops:Rb,purchaseDecor:Ob,purchaseEgg:Nb,purchaseTool:$b,purchaseSeed:Db,plantEgg:jb,hatchEgg:zb,plantGardenPlant:Bb,potPlant:Gb,mutationPotion:Wb,pickupDecor:Hb,placeDecor:Ub,removeGardenObject:Vb,placePet:Wl,feedPet:Kb,petPositions:Yb,swapPet:Hl,storePet:Ul,namePet:qb,sellPet:Xb},_internal:{getGlobals:lt,initGlobals:jl,destroyGlobals:Zh}};function cx(){const e=R;e.Gemini=Ec,e.MGSprite=ne,e.MGData=ue,e.MGPixi=Mn,e.MGAssets=qt,e.MGEnvironment=_e;}function dx(){const e=g("div",{className:"atom-inspector",style:"display: flex; flex-direction: column; gap: 12px; height: 100%; min-height: 0; overflow: hidden;"}),t=g("div",{style:"flex-shrink: 0; padding-bottom: 8px;"}),n=Vt({placeholder:"Search data keys...",value:"",onChange:s=>a(s)});t.appendChild(n.root),e.appendChild(t);const r=g("div",{style:"flex: 1; min-height: 0; overflow-y: auto; display: flex; flex-direction: column; gap: 8px; padding-right: 4px; padding-bottom: 20px;"});e.appendChild(r);const o={MGData:["plants","pets","mutations","items","decor","eggs","abilities","weather"],Globals:["currentTile","myInventory","myPets","myGarden","players","shops","weather","gameMap"],Atoms:["positionAtom","myCoinsCountAtom","myInventoryAtom","myPetInfosAtom","weatherAtom","currentGardenNameAtom","numPlayersAtom","avgPingAtom"]},i=[],a=(s="")=>{r.innerHTML="",i.forEach(l=>l()),i.length=0;const c=s.toLowerCase(),u=(l,d,p,f)=>{const m=`${l} - ${d}`;if(s&&!m.toLowerCase().includes(c))return;let b=null;const h=g("pre",{style:"margin: 0; padding: 8px; font-size: 11px; background: rgba(0,0,0,0.3); border-radius: 4px; color: var(--color-primary); overflow: auto; max-height: 400px;"});h.textContent="Expand to load data...";const y=Te({title:m,expandable:true,defaultExpanded:!!s,padding:"sm",onExpandChange:S=>{if(S)if(h.textContent="Loading...",f)b=f(v=>{h.textContent=JSON.stringify(v,null,2);});else try{const v=p();h.textContent=JSON.stringify(v,null,2);}catch(v){h.textContent=`Error: ${v}`;}else b&&(b(),b=null),h.textContent="Paused (Collapsed)";}});y.appendChild(h),r.appendChild(y),s&&setTimeout(()=>{f?b=f(S=>{h.textContent=JSON.stringify(S,null,2);}):h.textContent=JSON.stringify(p(),null,2);},0);};o.MGData.forEach(l=>{u(l,"Game Data (MGData)",()=>ue.get(l));}),o.Globals.forEach(l=>{const d=it[l];d&&u(l,"Reactive Global",()=>d.get(),p=>d.subscribe?.(p)||(()=>{}));}),o.Atoms.forEach(l=>{u(l,"Jotai Atom",()=>null,d=>{let p=false,f=null;return Ec.Store.subscribeImmediate(l,m=>{p||d(m);}).then(m=>{p?m():f=m;}),()=>{p=true,f?.();}});}),r.children.length===0&&(r.innerHTML='<div style="text-align:center; padding: 40px; opacity: 0.5;">No matches found for "'+s+'"</div>');};return a(),e.destroy=()=>{i.forEach(s=>s());},e}function ux(e={}){const{id:t,min:n=0,max:r=100,step:o=1,value:i=n,label:a,showValue:s=true,disabled:c=false,onInput:u,onChange:l}=e,d=g("div",{className:"slider"}),p=g("div",{className:"slider-row"}),f=g("div",{className:"slider-track"}),m=g("div",{className:"slider-range"});f.appendChild(m);const b=g("input",{id:t,type:"range",min:String(n),max:String(r),step:String(o),value:String(i),disabled:c});b.addEventListener("input",C=>{y(),u?.(v(),C);}),b.addEventListener("change",C=>l?.(v(),C));function h(){const C=r-n;return C===0?0:(v()-n)/C}function y(){const C=Math.max(0,Math.min(1,h()));m.style.width=`${C*100}%`,x&&(x.textContent=String(v()));}function S(C){b.value=String(C),y();}function v(){return Number(b.value)}function k(C){b.disabled=!!C;}let A=null,x=null;return a&&(A=g("span",{className:"slider-label"},a),p.appendChild(A)),f.appendChild(b),p.appendChild(f),s&&(x=g("span",{className:"slider-value"},String(i)),p.appendChild(x)),d.append(p),y(),{root:d,input:b,setValue:S,getValue:v,setDisabled:k}}function px(e={}){const{id:t,min:n=0,max:r=100,step:o=1,value:i=n,onInput:a,onChange:s,disabled:c=false}=e,u=g("input",{id:t,type:"range",className:"gemini-range",min:String(n),max:String(r),step:String(o)});u.value=String(i),u.disabled=c,a&&u.addEventListener("input",d=>a(Number(u.value),d)),s&&u.addEventListener("change",d=>s(Number(u.value),d));const l=u;return l.setValue=d=>{u.value=String(d);},l.getValue=()=>Number(u.value),l.setDisabled=d=>{u.disabled=d;},l}function fx(e={}){const{margin:t,color:n,variant:r="default"}=e,o=g("div",{className:"gemini-divider"});return r!=="default"&&o.classList.add(`gemini-divider--${r}`),t&&(o.style.margin=t),n&&(o.style.background=n),o}function gx(e){const{label:t,description:n,value:r,id:o}=e,i=g("div",{className:"gemini-stat-row",id:o}),a=g("div",{className:"gemini-stat-row__left"}),s=g("span",{className:"gemini-stat-row__label"},t);a.appendChild(s);let c=null;n&&(c=g("span",{className:"gemini-stat-row__desc"},n),a.appendChild(c));const u=typeof r=="number"?r.toLocaleString():r,l=g("span",{className:"gemini-stat-row__value"},u);i.appendChild(a),i.appendChild(l);const d=i;return d.setValue=p=>{l.textContent=typeof p=="number"?p.toLocaleString():p;},d.setLabel=p=>{s.textContent=p;},d.setDescription=p=>{p?c?c.textContent=p:(c=g("span",{className:"gemini-stat-row__desc"},p),a.appendChild(c)):c&&(c.remove(),c=null);},d}const mx=[{id:"badge-success",type:"Badge",label:"Success Badge",config:{label:"SUCCESS",type:"success"}},{id:"badge-warning",type:"Badge",label:"Warning Badge",config:{label:"WARNING",type:"warning"}},{id:"badge-danger",type:"Badge",label:"Danger Badge",config:{label:"DANGER",type:"danger"}},{id:"badge-info",type:"Badge",label:"Info Badge",config:{label:"INFO",type:"info"}},{id:"badge-primary",type:"Badge",label:"Primary Badge",config:{label:"NEW",type:"primary"}},{id:"button-primary",type:"Button",label:"Primary Button",config:{label:"Action",variant:"primary",size:"sm"}},{id:"button-danger",type:"Button",label:"Danger Button",config:{label:"Delete",variant:"danger",size:"sm"}},{id:"button-default",type:"Button",label:"Default Button",config:{label:"Cancel",variant:"default",size:"sm"}},{id:"switch-default",type:"Switch",label:"Toggle Switch",config:{label:"Enabled",checked:false}},{id:"input-text",type:"Input",label:"Text Input",config:{placeholder:"Enter text...",value:""}},{id:"input-number",type:"Input",label:"Number Input",config:{placeholder:"0",mode:"digits"}},{id:"select-basic",type:"Select",label:"Dropdown",config:{options:[{value:"a",label:"Option A"},{value:"b",label:"Option B"}],value:"a"}},{id:"slider-basic",type:"Slider",label:"Slider",config:{min:0,max:100,value:50}},{id:"range-basic",type:"Range",label:"Range Slider",config:{label:"Range",min:0,max:100,value:50}},{id:"label-default",type:"Label",label:"Label",config:{text:"Label Text",size:"md"}},{id:"divider-default",type:"Divider",label:"Divider",config:{}},{id:"statrow-basic",type:"StatRow",label:"Stat Row",config:{label:"Coins",value:"1,234"}},{id:"card-nested",type:"Card",label:"Nested Card",config:{title:"Nested",padding:"sm",variant:"soft"}},{id:"sprite-generic",type:"Sprite",label:"Sprite",config:{category:null,assetId:null}}];function ai(e){try{switch(e.type){case "Badge":return di(e.config).root;case "Button":return Pe(e.config);case "Switch":return _n(e.config).root;case "Input":return Vt(e.config).root;case "Select":return Sr(e.config).root;case "Slider":return ux(e.config).root;case "Range":{const t=px(e.config);return t.root??t}case "Label":{const t=Nr(e.config);return t.root??t}case "Divider":{const t=fx(e.config);return t.root??t}case "StatRow":{const t=gx(e.config);return t.root??t}case "Card":{const t=Te(e.config);return t.appendChild(g("div",{textContent:"Nested content",style:"font-size: 11px; opacity: 0.7;"})),t}case "Sprite":{if(e.config.category&&e.config.assetId&&ne.isReady())try{const t=ne.toCanvas(e.config.category,e.config.assetId,{mutations:e.config.mutations||[],scale:1.5});return t.style.imageRendering="pixelated",t}catch{}return g("div",{textContent:"🌱",style:"font-size: 24px; opacity: 0.5; display: flex; align-items: center; justify-content: center;"})}default:return null}}catch(t){return console.warn("[Gemini] ComponentPalette: Failed to create",e.type,t),g("div",{textContent:"Error",style:"color: var(--color-danger);"})}}function hx(e={}){const t=g("div",{className:"component-palette",style:"display: grid; grid-template-columns: repeat(auto-fill, minmax(90px, 1fr)); gap: 8px;"});return mx.forEach(n=>{const r=g("div",{style:`
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
            `});r.setAttribute("draggable","true"),r.onmouseenter=()=>{r.style.background="rgba(255,255,255,0.08)";},r.onmouseleave=()=>{r.style.background="rgba(255,255,255,0.03)";},r.ondragstart=a=>{a.dataTransfer&&(a.dataTransfer.setData("application/json",JSON.stringify(n)),a.dataTransfer.effectAllowed="copy"),r.style.opacity="0.5",e.onDragStart?.(n,a);},r.ondragend=()=>{r.style.opacity="1";},r.onclick=()=>{e.onItemClick?.(n);};const o=ai({...n,config:{...n.config}});o&&(o.style.pointerEvents="none",o.style.transform="scale(0.85)",o.style.maxWidth="100%",o.style.maxHeight="40px",o.style.overflow="hidden",r.appendChild(o));const i=g("small",{textContent:n.label,style:"font-size: 9px; opacity: 0.6; line-height: 1.2;"});r.appendChild(i),t.appendChild(r);}),t}function bx(e={}){const{width:t=400,height:n=300,gridSize:r=8,showGrid:o=true}=e;let i=r;const a=new Map;let s=1;const c=g("div",{className:"positioning-canvas-container",style:"display: flex; flex-direction: column; gap: 8px;"}),u=g("div",{style:"display: flex; gap: 8px; align-items: center; font-size: 11px;"});let l=false;const d=g("span",{textContent:`Grid: ${i}px`,style:"opacity: 0.6;"}),p=Pe({label:o?"Grid On":"Grid Off",size:"sm",variant:"default",onClick:()=>{h.style.backgroundImage=h.style.backgroundImage?"":b(),p.textContent=h.style.backgroundImage?"Grid On":"Grid Off";}}),f=Pe({label:"Preview",size:"sm",variant:"default",onClick:()=>{l=!l,f.textContent=l?"Edit Mode":"Preview",f.style.background=l?"var(--color-primary)":"",f.style.color=l?"#000":"",a.forEach(P=>{const O=P.element,G=O.querySelector("div:first-child"),F=O.querySelector('[style*="se-resize"]'),$=O.querySelector("div:has(select)");G&&(G.style.display=l?"none":"flex"),F&&(F.style.display=l?"none":"block"),$&&($.style.display=l?"none":"flex"),O.style.pointerEvents=l?"none":"auto",O.style.border=l?"none":"1px solid rgba(255,255,255,0.15)",O.style.background=l?"transparent":"rgba(255,255,255,0.08)";}),h.style.border=l?"none":"2px dashed rgba(255,255,255,0.15)";}}),m=Pe({label:"Clear All",size:"sm",variant:"danger",onClick:()=>q.clear()});u.appendChild(d),u.appendChild(p),u.appendChild(f),u.appendChild(m),c.appendChild(u);const b=()=>i<=0?"":`repeating-linear-gradient(
            0deg,
            transparent,
            transparent ${i-1}px,
            rgba(255,255,255,0.05) ${i-1}px,
            rgba(255,255,255,0.05) ${i}px
        ),
        repeating-linear-gradient(
            90deg,
            transparent,
            transparent ${i-1}px,
            rgba(255,255,255,0.05) ${i-1}px,
            rgba(255,255,255,0.05) ${i}px
        )`,h=g("div",{className:"positioning-canvas",style:`
            position: relative;
            width: ${t}px;
            height: ${n}px;
            min-height: ${n}px;
            background: rgba(0,0,0,0.3);
            border: 2px dashed rgba(255,255,255,0.15);
            border-radius: 8px;
            overflow: hidden;
            ${o?`background-image: ${b()};`:""}
        `}),y=g("div",{textContent:"Drop components here",style:`
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 12px;
            opacity: 0.3;
            pointer-events: none;
            transition: opacity 0.2s;
        `});h.appendChild(y);let S=null,v=null;const k=P=>i<=0?P:Math.round(P/i)*i,A=(P,O,G)=>Math.max(O,Math.min(G,P)),x=(P,O)=>{const G=h.getBoundingClientRect(),F={x:O.clientX-G.left,y:O.clientY-G.top};S={item:P,startX:O.clientX,startY:O.clientY,offsetX:F.x-P.position.x,offsetY:F.y-P.position.y},P.element.style.cursor="grabbing",P.element.style.zIndex=String(++s),P.zIndex=s,document.addEventListener("pointermove",C),document.addEventListener("pointerup",E);},C=P=>{if(!S)return;const O=h.getBoundingClientRect();let G=P.clientX-O.left-S.offsetX,F=P.clientY-O.top-S.offsetY;G=k(A(G,0,t-S.item.size.width)),F=k(A(F,0,n-S.item.size.height)),S.item.position={x:G,y:F},S.item.element.style.left=`${G}px`,S.item.element.style.top=`${F}px`;},E=()=>{S&&(S.item.element.style.cursor="",e.onItemMove?.(S.item.id,S.item.position)),S=null,document.removeEventListener("pointermove",C),document.removeEventListener("pointerup",E);},w=(P,O,G)=>{G.stopPropagation(),v={item:P,startX:G.clientX,startY:G.clientY,startW:P.size.width,startH:P.size.height,corner:O},document.addEventListener("pointermove",T),document.addEventListener("pointerup",M);},T=P=>{if(!v)return;const O=P.clientX-v.startX,G=P.clientY-v.startY;let F=v.startW,$=v.startH;v.corner.includes("e")&&(F=k(Math.max(40,v.startW+O))),v.corner.includes("s")&&($=k(Math.max(24,v.startH+G))),v.item.size={width:F,height:$},v.item.element.style.width=`${F}px`,v.item.element.style.height=`${$}px`;},M=()=>{v&&e.onItemResize?.(v.item.id,v.item.size),v=null,document.removeEventListener("pointermove",T),document.removeEventListener("pointerup",M);},z=P=>{const O=P.type==="Sprite",G=g("div",{className:"positioned-item",style:`
                position: absolute;
                left: ${P.position.x}px;
                top: ${P.position.y}px;
                width: ${P.size.width}px;
                height: ${P.size.height}px;
                background: rgba(255,255,255,0.08);
                border: 1px solid rgba(255,255,255,0.15);
                border-radius: 6px;
                cursor: grab;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                z-index: ${P.zIndex};
            `}),F=g("div",{style:`
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 2px 4px;
                background: rgba(0,0,0,0.3);
                font-size: 9px;
                opacity: 0.9;
                cursor: grab;
                flex-wrap: ${O?"wrap":"nowrap"};
                gap: 4px;
            `});F.appendChild(g("span",{textContent:P.label,style:"font-weight: bold;"}));const $=g("button",{textContent:"×",style:"background: none; border: none; color: var(--color-danger); font-size: 12px; cursor: pointer; padding: 0 4px; margin-left: auto;"});$.onclick=L=>{L.stopPropagation(),q.removeItem(P.id);},F.appendChild($);const j=g("div",{style:"flex: 1; padding: 4px; overflow: auto; display: flex; align-items: center; justify-content: center;"});if(j.appendChild(P.element),O){const L=g("div",{style:"display: flex; gap: 4px; padding: 4px; background: rgba(0,0,0,0.2); flex-wrap: wrap;"}),B="font-size: 9px; padding: 2px 4px; background: rgba(0,0,0,0.4); color: #fff; border: 1px solid rgba(255,255,255,0.2); border-radius: 3px; flex: 1; min-width: 60px; max-width: 80px;",N=g("select",{style:B});ne.getCategories().forEach(he=>{const Se=g("option",{value:he,textContent:he});N.appendChild(Se);});const ae=g("select",{style:B});ae.appendChild(g("option",{value:"",textContent:"Asset..."}));const V=g("select",{style:B});V.appendChild(g("option",{value:"",textContent:"None"})),["Gold","Rainbow","Wet","Chilled","Frozen","Dawnlit"].forEach(he=>{V.appendChild(g("option",{value:he,textContent:he}));});const K=()=>{ae.innerHTML="",ae.appendChild(g("option",{value:"",textContent:"Asset..."})),ne.getCategoryId(N.value).forEach(Se=>{ae.appendChild(g("option",{value:Se,textContent:Se}));});},ce=()=>{j.innerHTML="";const he=N.value,Se=ae.value,Ot=V.value;if(!Se){j.appendChild(g("span",{textContent:"🌱 Select asset",style:"opacity: 0.4; font-size: 11px;"}));return}try{const Ze=ne.toCanvas(he,Se,{mutations:Ot?[Ot]:[],scale:2});Ze.style.imageRendering="pixelated",Ze.style.maxWidth="100%",Ze.style.maxHeight="100%",Ze.style.objectFit="contain",j.appendChild(Ze);}catch{j.appendChild(g("span",{textContent:"Sprite Not Found",style:"color: var(--color-danger); font-size: 10px;"}));}};N.onchange=()=>{K(),ce();},ae.onchange=ce,V.onchange=ce,[N,ae,V].forEach(he=>{he.onpointerdown=Se=>Se.stopPropagation(),he.onclick=Se=>Se.stopPropagation();}),L.appendChild(N),L.appendChild(ae),L.appendChild(V),K(),ce(),G.appendChild(F),G.appendChild(L),G.appendChild(j);}else G.appendChild(F),G.appendChild(j);const D=g("div",{style:`
                position: absolute;
                right: 0;
                bottom: 0;
                width: 12px;
                height: 12px;
                cursor: se-resize;
                background: linear-gradient(135deg, transparent 50%, rgba(255,255,255,0.3) 50%);
            `});return D.onpointerdown=L=>w(P,"se",L),G.appendChild(D),F.onpointerdown=L=>x(P,L),G.onpointerdown=L=>{(L.target===G||L.target===j)&&x(P,L);},G};h.ondragover=P=>{P.preventDefault(),P.dataTransfer&&(P.dataTransfer.dropEffect="copy"),h.style.borderColor="var(--color-primary)",h.style.background="rgba(var(--color-primary-rgb, 0,200,150), 0.1)",y.style.opacity="0.6";},h.ondragleave=()=>{h.style.borderColor="rgba(255,255,255,0.15)",h.style.background="rgba(0,0,0,0.3)",y.style.opacity=a.size===0?"0.3":"0";},h.ondrop=P=>{P.preventDefault(),h.style.borderColor="rgba(255,255,255,0.15)",h.style.background="rgba(0,0,0,0.3)",y.style.opacity="0";const O=h.getBoundingClientRect(),G=k(P.clientX-O.left),F=k(P.clientY-O.top),$=new CustomEvent("canvas-drop",{detail:{x:G,y:F,dataTransfer:P.dataTransfer}});h.dispatchEvent($);},c.appendChild(h);const q={root:c,addItem(P,O,G,F,$){const j=a.size,D=$?.width??100,L=$?.height??60,B=k(20+j*16%(t-D)),N=k(20+j*16%Math.max(20,n-L)),W={id:P,type:O,label:G,element:F,position:{x:B,y:N},size:{width:D,height:L},zIndex:++s},ae=z(W);return W.element=ae,a.set(P,W),h.appendChild(ae),y.style.opacity="0",W},removeItem(P){const O=a.get(P);O&&(O.element.remove(),a.delete(P),e.onItemRemove?.(P),a.size===0&&(y.style.opacity="0.3"));},getItems(){return Array.from(a.values())},clear(){a.forEach(P=>P.element.remove()),a.clear(),y.style.opacity="0.3";},setGridSize(P){i=P,d.textContent=`Grid: ${P}px`,h.style.backgroundImage&&(h.style.backgroundImage=b());},destroy(){document.removeEventListener("pointermove",C),document.removeEventListener("pointerup",E),document.removeEventListener("pointermove",T),document.removeEventListener("pointerup",M),a.clear();}};return q}function yx(){const e=(w,T)=>{T&&(T instanceof Node?w.appendChild(T):T.root instanceof Node?w.appendChild(T.root):console.warn("[Gemini] UI Gallery: Cannot mount child",T));},t=g("div",{className:"ui-gallery",style:"height: 100%; display: flex; flex-direction: column; gap: 24px; padding: 12px; overflow-y: auto;"}),n=(w,T)=>{const M=g("div",{style:"display: flex; flex-direction: column; gap: 12px; flex-shrink: 0;"}),z=g("div",{style:"border-left: 3px solid var(--color-primary); padding-left: 10px;"});return z.appendChild(g("strong",{style:"display: block; font-size: 15px; color: #fff;",textContent:w})),z.appendChild(g("small",{style:"opacity: 0.6; font-size: 12px;",textContent:T})),M.appendChild(z),M},r=n("Layout & Device Simulation","Test Geminis responsiveness and mobile views"),o=g("div",{style:"display: grid; grid-template-columns: 1fr 1fr; gap: 10px;"}),i=_e.isMobile(),a=Pe({label:"Switch to Mobile (360px)",variant:i?"primary":"default",onClick:()=>{_e.setPlatformOverride("mobile");const w=document.querySelector("#gemini-hud-root");w&&(w.style.setProperty("--w","360px"),w.dispatchEvent(new CustomEvent("gemini:layout-resize",{detail:{width:360}}))),a.setVariant("primary"),s.setVariant("default");}}),s=Pe({label:"Reset to Desktop",variant:i?"default":"primary",onClick:()=>{_e.setPlatformOverride(null);const w=document.querySelector("#gemini-hud-root");w&&(w.style.removeProperty("--w"),w.dispatchEvent(new CustomEvent("gemini:layout-resize",{detail:{width:null}}))),a.setVariant("default"),s.setVariant("primary");}});e(o,a),e(o,s),r.appendChild(o),t.appendChild(r);const c=n("Sprite Explorer","Live rendering of game assets and mutations"),u=Te({title:"MGSprite Live Preview",padding:"sm"}),l=g("div",{style:"display: flex; flex-direction: column; gap: 12px;"}),d=g("div",{style:"height: 140px; background: rgba(0,0,0,0.3); border-radius: 8px; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.1); position: relative; overflow: hidden;"});let p="plants",f="Carrot";const m=new Set,b=()=>{d.innerHTML="";try{const w=ne.toCanvas(p,f,{mutations:Array.from(m),scale:1.5});w.style.maxHeight="90%",w.style.imageRendering="pixelated",d.appendChild(w);}catch{d.innerHTML='<small style="color:var(--color-danger)">Sprite Not Found</small>';}},h=Sr({options:ne.getCategories().map(w=>({value:w,label:w})),value:p,onChange:w=>{p=w;const T=ne.getCategoryId(w);y.setOptions(T.map(M=>({value:M,label:M}))),T.length&&(f=T[0],y.setValue(T[0])),b();}}),y=Sr({options:ne.getCategoryId(p).map(w=>({value:w,label:w})),value:f,onChange:w=>{f=w,b();}}),S=g("div",{style:"display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 4px;"});["Gold","Rainbow","Wet","Chilled","Frozen","Dawnlit"].forEach(w=>{const T=g("div",{style:"display: flex; align-items: center; gap: 8px;"});e(T,_n({checked:m.has(w),onChange:M=>{M?m.add(w):m.delete(w),b();}})),T.appendChild(g("span",{textContent:w,style:"font-size: 12px;"})),S.appendChild(T);}),e(l,h),e(l,y),l.appendChild(g("small",{textContent:"MUTATIONS",style:"opacity: 0.5; font-size: 10px; font-weight: bold; margin-top: 4px;"})),l.appendChild(S),u.appendChild(d),u.appendChild(l),c.appendChild(u),t.appendChild(c);const v=n("Interactive Card Builder","Drag components from below - free-form positioning with snap-to-grid!");v.className="card-builder";const k=bx({width:380,height:280,gridSize:8,showGrid:true,onItemMove:(w,T)=>console.log("[CardBuilder] Item moved:",w,T),onItemResize:(w,T)=>console.log("[CardBuilder] Item resized:",w,T),onItemRemove:w=>console.log("[CardBuilder] Item removed:",w)}),A=k.root.querySelector(".positioning-canvas");A&&A.addEventListener("canvas-drop",w=>{const T=w,{x:M,y:z,dataTransfer:q}=T.detail;try{const P=q?.getData("application/json");if(P){const O=JSON.parse(P),G=`${O.id}-${Date.now()}`,F=ai(O);if(F){const $=k.addItem(G,O.type,O.label,F);$.position={x:M,y:z},$.element.style.left=`${M}px`,$.element.style.top=`${z}px`;}}}catch(P){console.warn("[Gemini] CardBuilder: Invalid drop data",P);}}),v.appendChild(k.root),t.appendChild(v);const x=n("Component Palette","Drag components into the Card Builder above"),E=hx({onItemClick:w=>{const T=`${w.id}-${Date.now()}`;if(w.type==="Sprite"){const M=g("div",{style:"width: 100%; height: 100%;"});k.addItem(T,"Sprite","Sprite",M,{width:160,height:120});}else {const M=ai(w);M&&k.addItem(T,w.type,w.label,M);}v.scrollIntoView({behavior:"smooth"});}});return x.appendChild(E),t.appendChild(x),t.appendChild(g("div",{style:"height: 60px; flex-shrink: 0;"})),b(),t}function vx(){const e=g("div",{className:"pixi-inspector",style:"display: flex; flex-direction: column; gap: 12px; height: 100%; min-height: 0; overflow: hidden;"}),t=g("div",{style:"display: flex; flex-direction: column; gap: 10px; padding: 2px;"}),n=g("div",{style:"display: grid; grid-template-columns: 1fr 1fr auto; gap: 8px; align-items: end;"});let r=0,o=0,i=false;const a=Vt({label:"Tile X",mode:"digits",value:"0",onChange:f=>{r=parseInt(f)||0,p();}}),s=Vt({label:"Tile Y",mode:"digits",value:"0",onChange:f=>{o=parseInt(f)||0,p();}}),c=Pe({label:"Pick from Canvas",variant:"default",onClick:()=>l()});a&&a.root&&n.appendChild(a.root),s&&s.root&&n.appendChild(s.root),n.appendChild(c),t.appendChild(n),e.appendChild(t);const u=g("div",{style:"flex: 1; min-height: 0; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; padding-right: 4px;"});e.appendChild(u);const l=()=>{i=!i,c.textContent=i?"🎯 Click any tile...":"Pick from Canvas",c.style.background=i?"var(--color-primary)":"",c.style.color=i?"#000":"",i?document.addEventListener("click",d,true):document.removeEventListener("click",d,true);},d=f=>{if(!i)return;const m=f.target;if(!m||m.tagName!=="CANVAS")return;f.preventDefault(),f.stopPropagation();const b=Je.pointToTile({x:f.clientX,y:f.clientY});b&&(r=b.tx,o=b.ty,a.setValue(String(r)),s.setValue(String(o)),p()),l();},p=()=>{u.innerHTML="";try{const f=Je.inspect(r,o),m=Te({title:`Tile (${r}, ${o})`,subtitle:`GIDX: ${f.gidx} | ${f.objectType||"EMPTY"}`,expandable:!0,padding:"sm"}),b=g("pre",{style:"margin: 0; padding: 8px; font-size: 11px; background: rgba(0,0,0,0.3); border-radius: 4px; color: var(--color-primary); overflow: auto; max-height: 400px;"});if(b.textContent=JSON.stringify(f.tileObject||{},(h,y)=>h==="tileView"||h==="displayObject"?"[Circular/Ref]":y,2),m.appendChild(b),f.objectType==="plant"){const h=f.tileObject?.plant?.speciesId,S=ue.get("plants")?.[h];if(S){const k=Te({title:S.name||h,subtitle:"SPECIES METADATA",variant:"soft",padding:"sm"}),A=g("div",{style:"font-size: 11px; display: flex; flex-direction: column; gap: 4px;"});A.appendChild(g("div",{textContent:`Base Grow Time: ${S.growTime}s`}));const x=Array.isArray(S.mutations)?S.mutations.join(", "):"None";A.appendChild(g("div",{textContent:`Mutations: ${x}`})),k.appendChild(A),u.appendChild(k);}const v=g("div",{style:"display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; padding: 8px; background: rgba(255,255,255,0.05); border-radius: 4px;"});v.appendChild(Pe({label:"Clear Tile",size:"sm",variant:"danger",onClick:()=>{Je.setTileEmpty(r,o),p();}})),m.appendChild(v);}u.appendChild(m),Mn.drawOverlayBox(r,o,{key:"pixi-inspect-hl",tint:8386303,alpha:.8});}catch(f){u.innerHTML=`<div style="color:var(--color-danger); padding: 10px;">Error: ${f instanceof Error?f.message:String(f)}</div>`;}};return e.destroy=()=>{document.removeEventListener("click",d,true),Mn.stopOverlay("pixi-inspect-hl");},e}class xx extends Mt{constructor(){super({id:"dev",label:"DEV"});}build(t){const n="gemini-dev-section-styles";if(!document.getElementById(n)){const b=document.createElement("style");b.id=n,b.textContent=`
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
            `,document.head.appendChild(b);}const r=g("div",{className:"gemini-dev-section",style:"height: 100%; display: flex; flex-direction: column;"}),o=g("div",{style:"padding: 6px 12px; background: rgba(0,0,0,0.3); border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; font-size: 11px;"}),i=Ae(Kc.AUTO_RELOAD,true),a=g("div",{style:"display: flex; align-items: center; gap: 12px;"}),s=g("input",{type:"checkbox",checked:i}),c=g("label",{style:"display: flex; align-items: center; gap: 4px; cursor: pointer;"});c.appendChild(s),c.appendChild(document.createTextNode("Auto-Reload on Save")),a.appendChild(c);const u=g("div",{style:"display: flex; align-items: center; gap: 8px;"}),l=g("button",{textContent:"Reload Script",style:"background: var(--color-primary); color: #fff; border: none; padding: 3px 8px; border-radius: 4px; cursor: pointer; font-weight: bold; display: none;"}),d=g("span",{textContent:"Vite Connected",style:"opacity: 0.5;"});u.appendChild(d),u.appendChild(l),o.appendChild(a),o.appendChild(u);const p=g("div",{style:"flex: 1; min-height: 0; display: flex; flex-direction: column; padding: 12px; overflow: hidden;"}),f=[{id:"atoms",label:"Atoms",content:dx()},{id:"ws",label:"WS Trace",content:tb()},{id:"pixi",label:"Pixi Tools",content:vx()},{id:"ui",label:"UI Gallery",content:yx()}],m=ts(f.map(b=>({id:b.id,label:b.label})),"atoms",b=>{p.innerHTML="";const h=f.find(y=>y.id===b);h&&p.appendChild(h.content);});r.appendChild(o),r.appendChild(m.root),r.appendChild(p),p.appendChild(f[0].content),t.appendChild(r);}}let ko=null;function Pc(){return ko||(ko=new Ff),ko}function wx(e){const t=[new Ud(e),new Mv,new Qy,new Xv,new lx(e)];return t.push(new xx),t.push(Pc()),t}async function kx(){await Pc().preload();}function Sx(e){const{shadow:t,initialOpen:n}=e,r=g("div",{className:"gemini-panel",id:"panel",ariaHidden:String(!n)}),o=g("div",{className:"gemini-tabbar"}),i=g("div",{className:"gemini-content",id:"content"}),a=g("div",{className:"gemini-resizer",title:"Resize"}),s=g("button",{className:"gemini-close",title:"Fermer",ariaLabel:"Fermer"},"✕");r.append(o,i,a);const c=g("div",{className:"gemini-wrapper"},r);return t.append(c),{panel:r,tabbar:o,content:i,resizer:a,closeButton:s,wrapper:c}}function Cx(e){const{resizer:t,host:n,shadow:r,onWidthChange:o,initialWidth:i,minWidth:a,maxWidth:s}=e;let c=a,u=s;function l(){const k=_e.detect(),A=Math.round(R.visualViewport?.width??R.innerWidth??0);if(k.platform==="mobile"||k.os==="ios"||k.os==="android"){const x=getComputedStyle(r.host),C=parseFloat(x.getPropertyValue("--inset-l"))||0,E=parseFloat(x.getPropertyValue("--inset-r"))||0,w=Math.max(280,A-Math.round(C+E));c=280,u=w;}else c=a,u=s;return {min:c,max:u}}function d(k){return Math.max(c,Math.min(u,Number(k)||i))}function p(k){const A=d(k);n.style.setProperty("--w",`${A}px`),o(A);}l();const f=_e.detect(),m=!(f.platform==="mobile"||f.os==="ios"||f.os==="android");let b=false;const h=k=>{if(!b)return;k.preventDefault();const A=Math.round(R.innerWidth-k.clientX);p(A);},y=()=>{b&&(b=false,document.body.style.cursor="",R.removeEventListener("mousemove",h),R.removeEventListener("mouseup",y));},S=k=>{m&&(k.preventDefault(),b=true,document.body.style.cursor="ew-resize",R.addEventListener("mousemove",h),R.addEventListener("mouseup",y));};t.addEventListener("mousedown",S);function v(){t.removeEventListener("mousedown",S),R.removeEventListener("mousemove",h),R.removeEventListener("mouseup",y);}return {calculateResponsiveBounds:l,constrainWidthToLimits:d,setHudWidth:p,destroy:v}}function Ax(e){const{panel:t,onToggle:n,onClose:r,toggleCombo:o=c=>c.ctrlKey&&c.shiftKey&&c.key.toLowerCase()==="u",closeOnEscape:i=true}=e;function a(c){const u=t.classList.contains("open");if(i&&c.key==="Escape"&&u){r();return}o(c)&&(c.preventDefault(),c.stopPropagation(),n());}document.addEventListener("keydown",a,{capture:true});function s(){document.removeEventListener("keydown",a,{capture:true});}return {destroy:s}}const Tx=`
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
`,Ix=`
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
`,Ex=`
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
`,Px=`
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
`,Mx=`
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
  
`,Lx=`
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
`,_x=`
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
`,Fx=`
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
`,Rx=`
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
`,Ox=`
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
`,Nx=`
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
`,$x=`
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
`,Dx=`
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
`,jx=`
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
`,zx=`
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
`,Bx=`
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
`,Gx=`
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
`,Wx=`
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
`,Hx=`
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
`,Ux=`
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
`,Vx=`
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
`,Kx=`
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
`,Yx=`
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
`,qx=`
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
`,Xx=`
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
`,Jx={all:"initial",position:"fixed",top:"0",right:"0",zIndex:"2147483647",pointerEvents:"auto",fontFamily:'system-ui, -apple-system, "Segoe UI", Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',fontSize:"13px",lineHeight:"1.35"};function Qx(e="gemini-root"){const t=document.createElement("div");t.id=e,Object.assign(t.style,Jx),(document.body||document.documentElement).appendChild(t);const n=t.attachShadow({mode:"open"});return {host:t,shadow:n}}function Zx(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:16}):setTimeout(e,0);})}async function e0(e){const{hostId:t="gemini-hud-root",initialWidth:n,initialOpen:r,onWidthChange:o,onOpenChange:i,themes:a,initialTheme:s,onThemeChange:c,buildSections:u,initialTab:l,onTabChange:d,toggleCombo:p=V=>V.ctrlKey&&V.shiftKey&&V.key.toLowerCase()==="u",closeOnEscape:f=true,minWidth:m=420,maxWidth:b=720}=e,{host:h,shadow:y}=Qx(t),S=[[Ix,"variables"],[Ex,"primitives"],[Px,"utilities"],[Tx,"hud"],[Mx,"card"],[Lx,"badge"],[_x,"button"],[jx,"checkbox"],[Fx,"input"],[Rx,"label"],[Ox,"navTabs"],[Nx,"searchBar"],[$x,"select"],[Dx,"switch"],[zx,"table"],[Bx,"teamListItem"],[Gx,"timeRangePicker"],[Wx,"tooltip"],[Hx,"slider"],[Ux,"reorderableList"],[Vx,"colorPicker"],[Kx,"log"],[Yx,"segmentedControl"],[qx,"settings"],[Xx,"teamCard"],[Zs,"autoFavoriteSettings"]];for(let V=0;V<S.length;V++){const[K,ce]=S[V];zt(y,K,ce),V%5===4&&await Zx();}const{panel:v,tabbar:k,content:A,resizer:x,closeButton:C,wrapper:E}=Sx({shadow:y,initialOpen:r});function w(V){v.dispatchEvent(new CustomEvent("gemini:hud-open-change",{detail:{isOpen:V},bubbles:true})),i?.(V);}function T(V){const K=v.classList.contains("open");v.classList.toggle("open",V),v.setAttribute("aria-hidden",V?"false":"true"),V!==K&&w(V);}T(r),C.addEventListener("click",V=>{V.preventDefault(),V.stopPropagation(),T(false);});const M=jd({host:h,themes:a,initialTheme:s,onThemeChange:c}),z=Cx({resizer:x,host:h,shadow:y,onWidthChange:o||(()=>{}),initialWidth:n,minWidth:m,maxWidth:b});z.setHudWidth(n);const q=u({applyTheme:M.applyTheme,initialTheme:s,getCurrentTheme:M.getCurrentTheme,setHUDWidth:z.setHudWidth,setHUDOpen:T}),P=new Vc(q,A,{applyTheme:M.applyTheme,getCurrentTheme:M.getCurrentTheme}),O=q.map(V=>({id:V.id,label:V.label})),G=l&&q.some(V=>V.id===l)?l:O[0]?.id||"",F=ts(O,G,V=>{P.activate(V),d?.(V);});F.root.style.flex="1 1 auto",F.root.style.minWidth="0",k.append(F.root,C);const $={"tab-auto-favorite":"autoFavorite","tab-journal-checker":"journalChecker","tab-pets":"pets"};function j(){const V=Ae(Re.CONFIG,{autoFavorite:{enabled:false},journalChecker:{enabled:false},pets:{enabled:true}});for(const[K,ce]of Object.entries($))V[ce]?.enabled??false?F.showTab(K):F.hideTab(K);}function D(V){const{key:K}=V.detail;(K===Re.CONFIG||K==="feature:config")&&j();}window.addEventListener(Yi.STORAGE_CHANGE,D),j();let L=G;if(!F.isTabVisible(G)){const V=F.getVisibleTabs();V.length>0&&(L=V[0]);}L&&P.activate(L);const B=Ax({panel:v,onToggle:()=>T(!v.classList.contains("open")),onClose:()=>T(false),toggleCombo:p,closeOnEscape:f}),N=()=>{F.recalc();const V=parseInt(getComputedStyle(h).getPropertyValue("--w"))||n;z.calculateResponsiveBounds(),z.setHudWidth(V);};R.addEventListener("resize",N);const W=V=>{const K=V.detail?.width;K?z.setHudWidth(K):z.setHudWidth(n),F.recalc();};h.addEventListener("gemini:layout-resize",W);function ae(){window.removeEventListener(Yi.STORAGE_CHANGE,D),B.destroy(),z.destroy(),R.removeEventListener("resize",N),h.removeEventListener("gemini:layout-resize",W);}return {host:h,shadow:y,wrapper:E,panel:v,content:A,setOpen:T,setWidth:z.setHudWidth,sections:q,manager:P,nav:F,destroy:ae}}const pn={isOpen:"gemini.hud.isOpen",width:"gemini.hud.width",theme:"gemini.hud.theme",activeTab:"gemini.hud.activeTab"},pr={isOpen:false,width:480,theme:"dark",activeTab:"tab-settings"};function t0(){return {isOpen:Ae(pn.isOpen,pr.isOpen),width:Ae(pn.width,pr.width),theme:Ae(pn.theme,pr.theme),activeTab:Ae(pn.activeTab,pr.activeTab)}}function fr(e,t){Ge(pn[e],t);}const n0="https://i.imgur.com/IMkhMur.png",r0="Stats";function o0(e){let t=e.iconUrl||n0;const n=e.ariaLabel||"Open MGH";let r=null,o=null,i=null,a=false,s=null,c=null;const u=["Chat","Leaderboard","Stats","Open Activity Log"],l=v=>{try{return typeof CSS<"u"&&CSS&&typeof CSS.escape=="function"?CSS.escape(v):v.replace(/"/g,'\\"')}catch{return v}};function d(){const v=document.querySelector(u.map(A=>`button[aria-label="${l(A)}"]`).join(","));if(!v)return null;let k=v.parentElement;for(;k&&k!==document.body;){if(u.reduce((x,C)=>x+k.querySelectorAll(`button[aria-label="${l(C)}"]`).length,0)>=2)return k;k=k.parentElement;}return null}function f(v){const k=Array.from(v.querySelectorAll("button[aria-label]"));if(!k.length)return {refBtn:null,refWrapper:null};const A=k.filter(z=>z.dataset.mghBtn!=="true"&&(z.getAttribute("aria-label")||"")!==(e.ariaLabel||"Open MGH")),x=A.length?A:k,C=x.find(z=>(z.getAttribute("aria-label")||"").toLowerCase()===r0.toLowerCase())||null,E=x.length>=2?x.length-2:x.length-1,w=C||x[E],T=w.parentElement,M=T&&T.parentElement===v&&T.tagName==="DIV"?T:null;return {refBtn:w,refWrapper:M}}function m(v,k,A){const x=v.cloneNode(false);x.type="button",x.setAttribute("aria-label",k),x.title=k,x.dataset.mghBtn="true",x.style.pointerEvents="auto",x.removeAttribute("id");const C=document.createElement("img");return C.src=A,C.alt="MGH",C.style.pointerEvents="none",C.style.userSelect="none",C.style.width="76%",C.style.height="76%",C.style.objectFit="contain",C.style.display="block",C.style.margin="auto",x.appendChild(C),x.addEventListener("click",E=>{E.preventDefault(),E.stopPropagation();try{e.onClick?.();}catch{}}),x}function b(){if(a)return  false;a=true;let v=false;try{const k=d();if(!k)return !1;s!==k&&(s=k);const{refBtn:A,refWrapper:x}=f(k);if(!A)return !1;o=k.querySelector('div[data-mgh-wrapper="true"]'),!o&&x&&(o=x.cloneNode(!1),o.dataset.mghWrapper="true",o.removeAttribute("id"),v=!0);const C=o?.querySelector('button[data-mgh-btn="true"]')||null;r||(r=C),r||(r=m(A,n,t),o?o.appendChild(r):r.parentElement!==k&&k.appendChild(r),v=!0),o&&o.parentElement!==k&&(k.appendChild(o),v=!0);const E=k;if(E&&E!==c){try{S.disconnect();}catch{}c=E,S.observe(c,{childList:!0,subtree:!0});}return v}finally{a=false;}}const h=document.getElementById("App")||document.body;let y=null;const S=new MutationObserver(v=>{const k=v.every(x=>{const C=Array.from(x.addedNodes||[]),E=Array.from(x.removedNodes||[]),w=C.concat(E);if(w.length===0){const T=x.target;return o&&(T===o||o.contains(T))||r&&(T===r||r.contains(T))}return w.every(T=>!!(!(T instanceof HTMLElement)||o&&(T===o||o.contains(T))||r&&(T===r||r.contains(T))))}),A=v.some(x=>Array.from(x.removedNodes||[]).some(C=>C instanceof HTMLElement?!!(o&&(C===o||o.contains(C))||r&&(C===r||r.contains(C))):false));k&&!A||y===null&&(y=window.setTimeout(()=>{if(y=null,b()&&o){const C=o.parentElement;C&&C.lastElementChild!==o&&C.appendChild(o);}},150));});return b(),S.observe(h,{childList:true,subtree:true}),i=()=>S.disconnect(),()=>{try{i?.();}catch{}try{o?.remove();}catch{}}}const Mc=[];function i0(){return Mc.slice()}function a0(e){Mc.push(e);}function Lc(e){try{return JSON.parse(e)}catch{return}}function Ja(e){if(typeof e=="string"){const t=Lc(e);return t!==void 0?t:e}return e}function _c(e){if(e!=null){if(typeof e=="string"){const t=Lc(e);return t!==void 0?_c(t):e}if(Array.isArray(e)&&typeof e[0]=="string")return e[0];if(typeof e=="object"){const t=e;return t.type??t.Type??t.kind??t.messageType}}}function s0(e){const t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function Q(e,t,n){const r=typeof t=="boolean"?t:true,o=typeof t=="function"?t:n,i=(a,s)=>{if(_c(a)!==e)return;const u=o(a,s);return u&&typeof u=="object"&&"kind"in u?u:typeof u=="boolean"?u?void 0:{kind:"drop"}:r?void 0:{kind:"drop"}};return a0(i),i}const nn=new WeakSet,Qa=new WeakMap;function l0(e){const t=e.pageWindow,n=!!e.debug,r=e.middlewares&&e.middlewares.length?e.middlewares:i0();if(!r.length)return ()=>{};const o=p=>({ws:p,pageWindow:t,debug:n}),i=(p,f)=>{let m=p;for(const b of r){const h=b(m,o(f));if(h){if(h.kind==="drop")return {kind:"drop"};h.kind==="replace"&&(m=h.message);}}return m!==p?{kind:"replace",message:m}:void 0};let a=null,s=null,c=null;const u=()=>{const p=t?.MagicCircle_RoomConnection,f=p?.sendMessage;if(!p||typeof f!="function")return  false;if(nn.has(f))return  true;const m=f.bind(p);function b(...h){const y=h.length===1?h[0]:h,S=Ja(y),v=i(S,s0(t));if(v?.kind==="drop"){n&&console.log("[WS] drop outgoing (RoomConnection.sendMessage)",S);return}if(v?.kind==="replace"){const k=v.message;return h.length>1&&Array.isArray(k)?(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",S,"=>",k),m(...k)):(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",S,"=>",k),m(k))}return m(...h)}nn.add(b),Qa.set(b,f);try{p.sendMessage=b,nn.add(p.sendMessage),n&&console.log("[WS] outgoing patched via MagicCircle_RoomConnection.sendMessage");}catch{return  false}return a=()=>{try{p.sendMessage===b&&(p.sendMessage=f);}catch{}},true};(()=>{const p=t?.WebSocket?.prototype,f=p?.send;if(typeof f!="function"||nn.has(f))return;function m(b){const h=Ja(b),y=i(h,this);if(y?.kind==="drop"){n&&console.log("[WS] drop outgoing (ws.send)",h);return}if(y?.kind==="replace"){const S=y.message,v=typeof S=="string"||S instanceof ArrayBuffer||S instanceof Blob?S:JSON.stringify(S);return n&&console.log("[WS] replace outgoing (ws.send)",h,"=>",S),f.call(this,v)}return f.call(this,b)}nn.add(m),Qa.set(m,f);try{p.send=m,n&&console.log("[WS] outgoing patched via WebSocket.prototype.send");}catch{return}s=()=>{try{p.send===m&&(p.send=f);}catch{}};})();const d=e.waitForRoomConnectionMs??4e3;if(!u()&&d>0){const p=Date.now();c=setInterval(()=>{if(u()){clearInterval(c),c=null;return}Date.now()-p>d&&(clearInterval(c),c=null,n&&console.log("[WS] RoomConnection not found, only ws.send is patched"));},250);}return ()=>{if(c){try{clearInterval(c);}catch{}c=null;}if(a){try{a();}catch{}a=null;}if(s){try{s();}catch{}s=null;}}}(function(){try{const t=({ url: (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('__entry.js', document.baseURI).href) }),n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();const Fc=[];function c0(){return Fc.slice()}function Za(e){Fc.push(e);}function d0(e){if(e!=null){if(typeof e=="object"){const t=e;if(typeof t.type=="string")return t.type;if(typeof t.Type=="string")return t.Type;if(typeof t.kind=="string")return t.kind;if(typeof t.messageType=="string")return t.messageType}if(Array.isArray(e)&&typeof e[0]=="string")return e[0]}}function u0(e){if(typeof e=="string")try{return JSON.parse(e)}catch{return e}return e}const So=Symbol.for("ariesmod.ws.handlers.patched");function xe(e,t){if(typeof e=="string"){const o=e,i={match:a=>a.kind==="message"&&a.type===o,handle:t};return Za(i),i}const n=e,r={match:o=>o.kind==="close"&&o.code===n,handle:t};return Za(r),r}function p0(e,t=c0(),n={}){const r=n.pageWindow??window,o=!!n.debug;if(e[So])return ()=>{};e[So]=true;const i={ws:e,pageWindow:r,debug:o},a=d=>{for(const p of t)try{if(!p.match(d))continue;if(p.handle(d,i)===!0)return}catch(f){o&&console.error("[WS] handler error",f,d);}},s=d=>{const p=u0(d.data),f=d0(p);a({kind:"message",raw:d.data,data:p,type:f});},c=d=>{a({kind:"close",code:d.code,reason:d.reason,wasClean:d.wasClean,event:d});},u=d=>a({kind:"open",event:d}),l=d=>a({kind:"error",event:d});return e.addEventListener("message",s),e.addEventListener("close",c),e.addEventListener("open",u),e.addEventListener("error",l),()=>{try{e.removeEventListener("message",s);}catch{}try{e.removeEventListener("close",c);}catch{}try{e.removeEventListener("open",u);}catch{}try{e.removeEventListener("error",l);}catch{}try{delete e[So];}catch{}}}(function(){try{const t=({ url: (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('__entry.js', document.baseURI).href) }),n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();xe(Qe.AuthenticationFailure,(e,t)=>{t.debug&&console.log("[WS][Close] Auth failure",e.code,e.reason);});xe(Qe.ConnectionSuperseded,(e,t)=>{t.debug&&console.log("[WS][Close] Superseded",e.code,e.reason);});xe(Qe.HeartbeatExpired,(e,t)=>{t.debug&&console.log("[WS][Close] Heartbeat expired",e.code,e.reason);});xe(Qe.PlayerKicked,(e,t)=>{t.debug&&console.log("[WS][Close] Player kicked",e.code,e.reason);});xe(Qe.PlayerLeftVoluntarily,(e,t)=>{t.debug&&console.log("[WS][Close] Player left voluntarily",e.code,e.reason);});xe(Qe.ReconnectInitiated,(e,t)=>{t.debug&&console.log("[WS][Close] Reconnect initiated",e.code,e.reason);});xe(Qe.ServerDisposed,(e,t)=>{t.debug&&console.log("[WS][Close] Server disposed",e.code,e.reason);});xe(Qe.UserSessionSuperseded,(e,t)=>{t.debug&&console.log("[WS][Close] User session superseded",e.code,e.reason);});xe(Qe.VersionExpired,(e,t)=>{t.debug&&console.log("[WS][Close] Version expired",e.code,e.reason);});xe(Qe.VersionMismatch,(e,t)=>{t.debug&&console.log("[WS][Close] Version mismatch",e.code,e.reason);});xe(dt.Config,(e,t)=>{t.debug&&console.log("[WS][STC] Config",e.data);});xe(dt.CurrencyTransaction,(e,t)=>{t.debug&&console.log("[WS][STC] CurrencyTransaction",e.data);});xe(dt.Emote,(e,t)=>{t.debug&&console.log("[WS][STC] Emote",e.data);});xe(dt.InappropriateContentRejected,(e,t)=>{t.debug&&console.log("[WS][STC] InappropriateContentRejected",e.data);});xe(dt.PartialState,(e,t)=>{t.debug&&console.log("[WS][STC] PartialState",e.data);});xe(dt.Pong,(e,t)=>{t.debug&&console.log("[WS][STC] Pong",e.data);});xe(dt.ServerErrorMessage,(e,t)=>{t.debug&&console.log("[WS][STC] ServerErrorMessage",e.data);});xe(dt.Welcome,(e,t)=>{t.debug&&console.log("[WS][STC] Welcome",e.data);});Q(_.PlantSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantSeed"),true));Q(_.WaterPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] WaterPlant"),true));Q(_.HarvestCrop,(e,t)=>(t.debug&&console.log("[MW][Garden] HarvestCrop"),true));Q(_.SellAllCrops,(e,t)=>(t.debug&&console.log("[MW][Garden] SellAllCrops"),true));Q(_.PurchaseSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseSeed"),true));Q(_.PurchaseEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseEgg"),true));Q(_.PurchaseTool,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseTool"),true));Q(_.PurchaseDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseDecor"),true));Q(_.PlantEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantEgg"),true));Q(_.HatchEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] HatchEgg"),true));Q(_.PlantGardenPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantGardenPlant"),true));Q(_.PotPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PotPlant"),true));Q(_.MutationPotion,(e,t)=>(t.debug&&console.log("[MW][Garden] MutationPotion"),true));Q(_.PickupDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PickupDecor"),true));Q(_.PlaceDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PlaceDecor"),true));Q(_.RemoveGardenObject,(e,t)=>(t.debug&&console.log("[MW][Garden] RemoveGardenObject"),true));Q(_.MoveInventoryItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveInventoryItem"),true));Q(_.DropObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] DropObject"),true));Q(_.PickupObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] PickupObject"),true));Q(_.ToggleFavoriteItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] ToggleFavoriteItem"),true));Q(_.PutItemInStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] PutItemInStorage"),true));Q(_.RetrieveItemFromStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] RetrieveItemFromStorage"),true));Q(_.MoveStorageItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveStorageItem"),true));Q(_.LogItems,(e,t)=>(t.debug&&console.log("[MW][Inventory] LogItems"),true));Q(_.PlacePet,(e,t)=>(t.debug&&console.log("[MW][Pets] PlacePet"),true));Q(_.FeedPet,(e,t)=>(t.debug&&console.log("[MW][Pets] FeedPet"),true));Q(_.PetPositions,(e,t)=>(t.debug&&console.log("[MW][Pets] PetPositions"),true));Q(_.SwapPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SwapPet"),true));Q(_.StorePet,(e,t)=>(t.debug&&console.log("[MW][Pets] StorePet"),true));Q(_.NamePet,(e,t)=>(t.debug&&console.log("[MW][Pets] NamePet"),true));Q(_.SellPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SellPet"),true));console.log("[WS] TESTTEST");Q(_.SetSelectedGame,(e,t)=>(t.debug&&console.log("[MW][Session] SetSelectedGame"),true));Q(_.VoteForGame,(e,t)=>(t.debug&&console.log("[MW][Session] VoteForGame"),true));Q(_.RequestGame,(e,t)=>(t.debug&&console.log("[MW][Session] RequestGame"),true));Q(_.RestartGame,(e,t)=>(t.debug&&console.log("[MW][Session] RestartGame"),true));Q(_.Ping,(e,t)=>(t.debug&&console.log("[MW][Session] Ping"),true));Q(_.PlayerPosition,(e,t)=>(t.debug&&console.log("[MW][Session] PlayerPosition"),true));Q(_.Teleport,(e,t)=>(t.debug&&console.log("[MW][Session] Teleport"),true));Q(_.CheckWeatherStatus,(e,t)=>(t.debug&&console.log("[MW][Session] CheckWeatherStatus"),true));Q(_.Chat,(e,t)=>(t.debug&&console.log("[MW][Social] Chat"),true));Q(_.Dev,(e,t)=>(t.debug&&console.log("[MW][Social] Dev"),true));Q(_.Emote,(e,t)=>(t.debug&&console.log("[MW][Social] Emote"),true));Q(_.Wish,(e,t)=>(t.debug&&console.log("[MW][Social] Wish"),true));Q(_.KickPlayer,(e,t)=>(t.debug&&console.log("[MW][Social] KickPlayer"),true));Q(_.ReportSpeakingStart,(e,t)=>(t.debug&&console.log("[MW][Voice] ReportSpeakingStart"),true));Q(_.SetPlayerData,(e,t)=>(t.debug&&console.log("[MW][Social] SetPlayerData"),true));Q(_.UsurpHost,(e,t)=>(t.debug&&console.log("[MW][Social] UsurpHost"),true));function f0(e={}){const t=e.pageWindow??R,n=e.pollMs??500,r=!!e.debug,o=[];o.push(ob(t,{debug:r})),o.push(l0({pageWindow:t,middlewares:e.middlewares,debug:r}));let i=null;const a=s=>{if(i){try{i();}catch{}i=null;}s&&(i=p0(s,e.handlers,{debug:r,pageWindow:t}));};return a(_r(t).ws),o.push(Bl(s=>a(s.ws),{intervalMs:n,debug:r,pageWindow:t})),{getWs:()=>_r(t).ws,dispose:()=>{for(let s=o.length-1;s>=0;s--)try{o[s]();}catch{}if(i){try{i();}catch{}i=null;}}}}let gr=null;function g0(e={}){return gr||(gr=f0(e),gr)}function m0(e){e.logStep("WebSocket","Capturing WebSocket...");let t=null;return t=Bl(n=>{n.ws&&(e.logStep("WebSocket","WebSocket captured","success"),t?.(),t=null);},{intervalMs:250}),g0({debug:false}),()=>{t?.(),t=null;}}async function h0(e){e.logStep("Atoms","Prewarming Jotai store...");try{await Vf(),await Gf({timeoutMs:8e3,intervalMs:50}),e.logStep("Atoms","Jotai store ready","success");}catch(t){e.logStep("Atoms","Jotai store not captured yet","error"),console.warn("[Bootstrap] Jotai store wait failed",t);}}function b0(e){e.logStep("Globals","Initializing global variables...");try{jl(),e.logStep("Globals","Global variables ready","success");}catch(t){e.logStep("Globals","Failed to initialize global variables","error"),console.warn("[Bootstrap] Global variables init failed",t);}}function y0(e){e.logStep("API","Exposing Gemini API...");try{cx(),e.logStep("API","Gemini API ready","success");}catch(t){e.logStep("API","Failed to expose API","error"),console.warn("[Bootstrap] API init failed",t);}}function Co(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0);})}async function v0(e){e.logStep("HUD","Loading HUD preferences..."),await Co();const t=t0();await Co();const n=await e0({hostId:"gemini-hud-root",initialWidth:t.width,initialOpen:t.isOpen,onWidthChange:r=>fr("width",r),onOpenChange:r=>fr("isOpen",r),themes:gn,initialTheme:t.theme,onThemeChange:r=>fr("theme",r),buildSections:r=>wx({applyTheme:r.applyTheme,initialTheme:r.initialTheme,getCurrentTheme:r.getCurrentTheme,setHUDWidth:r.setHUDWidth,setHUDOpen:r.setHUDOpen}),initialTab:t.activeTab,onTabChange:r=>fr("activeTab",r)});return await Co(),e.logStep("HUD","HUD ready","success"),n}async function x0(e){e.setSubtitle("Activating Gemini modules...");const t=7;let n=0;await Nm(r=>{r.status==="success"?(n++,e.logStep("Modules",`Loading modules... (${n}/${t})`)):r.status==="error"&&e.logStep("Modules",`Loading modules... (${n}/${t}) - ${r.name} failed`,"error");}),e.logStep("Modules",`All modules loaded (${t}/${t})`,"success");}async function w0(e){e.logStep("Sprites","Warming up sprite cache...");try{ne.isReady()||await ne.init();const t=[],n=ue.get("plants");if(n)for(const a of Object.values(n))a?.seed?.spriteId&&t.push(a.seed.spriteId),a?.plant?.spriteId&&t.push(a.plant.spriteId),a?.crop?.spriteId&&t.push(a.crop.spriteId);const r=ue.get("pets");if(r)for(const a of Object.values(r))a?.spriteId&&t.push(a.spriteId);const o=[...new Set(t)],i=o.length;if(i===0){e.logStep("Sprites","No sprites to warmup","success");return}await ne.warmup(o,(a,s)=>{e.logStep("Sprites",`Loading sprites (${a}/${s})...`);},5),e.logStep("Sprites",`${i} sprites loaded`,"success");}catch(t){e.logStep("Sprites","Sprite warmup failed","error"),console.warn("[Bootstrap] Sprite warmup failed",t);}}async function k0(e){e.logStep("Sections","Preloading UI sections...");try{await kx(),e.logStep("Sections","Sections preloaded","success");}catch(t){e.logStep("Sections","Sections preload failed","error"),console.warn("[Bootstrap] Sections preload failed",t);}}function S0(e){e.logStep("Features","Initializing features...");const t=[{name:"AntiAfk",init:Tt.init.bind(Tt)},{name:"PetTeam",init:be.init.bind(be)},{name:"BulkFavorite",init:Fr.init.bind(Fr)}],n=[{name:"BulkFavoriteInject",init:ii.init.bind(ii)}];let r=0;for(const i of t)try{i.init(),r++,e.logStep("Features",`Initializing features... (${r}/${t.length})`,"info");}catch(a){e.logStep("Features",`Initializing features... (${r}/${t.length}) - ${i.name} failed`,"error"),console.warn(`[Bootstrap] Feature ${i.name} init failed`,a);}e.logStep("Features",`All features initialized (${t.length}/${t.length})`,"success"),e.logStep("UIInjections","Initializing UI injections...");let o=0;for(const i of n)try{i.init(),o++;}catch(a){console.warn(`[Bootstrap] UI injection ${i.name} init failed`,a);}e.logStep("UIInjections",`UI injections initialized (${o}/${n.length})`,"success");}Vs();Df();(async function(){qc();const e=Hc({title:"Gemini is loading",subtitle:"Connecting and preparing modules..."});let t=null;try{t=m0(e),await h0(e),b0(e),y0(e),await Promise.all([x0(e),(async()=>{await w0(e);})(),(async()=>{await k0(e);})(),(async()=>{S0(e);})()]),e.succeed("Gemini is ready!");}catch(r){e.fail("Failed to initialize the mod.",r);}finally{t?.();}const n=await v0(e);o0({onClick:()=>n.setOpen(true)});})();

})();