// ==UserScript==
// @name       Gemini
// @namespace  Gemini
// @version    1.0.0
// @author
// @match      https://1227719606223765687.discordsays.com/*
// @match      https://magiccircle.gg/r/*
// @match      https://magicgarden.gg/r/*
// @match      https://starweaver.org/r/*
// @require    https://cdn.jsdelivr.net/npm/systemjs@6.15.1/dist/system.min.js
// @require    https://cdn.jsdelivr.net/npm/systemjs@6.15.1/dist/extras/named-register.min.js
// @require    data:application/javascript,%3B(typeof%20System!%3D'undefined')%26%26(System%3Dnew%20System.constructor())%3B
// @resource   ICON  https://imgur.com/a/nf1ZKbp
// @connect    i.imgur.com
// @grant      GM_getValue
// @grant      GM_info
// @grant      GM_openInTab
// @grant      GM_registerMenuCommand
// @grant      GM_setValue
// @grant      GM_xmlhttpRequest
// @grant      unsafeWindow
// @run-at     document-start
// ==/UserScript==


System.register("./__entry.js", ['./__monkey.entry-BVC6Tyi9.js'], (function (exports, module) {
	'use strict';
	return {
		setters: [null],
		execute: (function () {



		})
	};
}));

System.register("./__monkey.entry-BVC6Tyi9.js", [], (function (exports, module) {
  'use strict';
  return {
    execute: (function () {

      exports("q", qf);

      var Ms=Object.defineProperty;var Ls=(e,t,n)=>t in e?Ms(e,t,{enumerable:true,configurable:true,writable:true,value:n}):e[t]=n;var le=(e,t,n)=>Ls(e,typeof t!="symbol"?t+"":t,n);function h(e,t=null,...n){const o=document.createElement(e);for(const[r,i]of Object.entries(t||{}))i!=null&&(r==="style"?typeof i=="string"?o.setAttribute("style",i):typeof i=="object"&&Object.assign(o.style,i):r.startsWith("on")&&typeof i=="function"?o[r.toLowerCase()]=i:r in o?o[r]=i:o.setAttribute(r,String(i)));for(const r of n)r==null||r===false||o.appendChild(typeof r=="string"||typeof r=="number"?document.createTextNode(String(r)):r);return o}const pn="https://i.imgur.com/k5WuC32.png",Lo="gemini-loader-style",ot="gemini-loader",Ai=80;function Rs(){if(document.getElementById(Lo))return;const e=document.createElement("style");e.id=Lo,e.textContent=`
    /* ===== Loader Variables ===== */
    #${ot} {
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
    #${ot} {
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

    #${ot}.gemini-loader--error .gemini-loader__actions {
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
    #${ot}.gemini-loader--closing {
      animation: gemini-loader-fade-out 0.4s ease forwards;
      pointer-events: none;
    }

    #${ot}.gemini-loader--error .gemini-loader__spinner {
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
      #${ot} { padding: 16px 10px; }
      .gemini-loader__card { padding: 16px; }
      .gemini-loader__header { gap: 12px; }
      .gemini-loader__spinner { width: 42px; height: 42px; }
      .gemini-loader__spinner-icon { width: 56px; height: 56px; }
      .gemini-loader__title { font-size: 16px; }
    }
  `,document.head.appendChild(e);}function fn(e,t,n){const o=h("div",{className:`gemini-loader__log ${n}`},h("div",{className:"gemini-loader__dot"}),h("div",{textContent:t}));for(e.appendChild(o);e.childElementCount>Ai;)e.firstElementChild?.remove();e.scrollTop=e.scrollHeight;}function _s(){return new Promise(e=>{if(typeof GM_xmlhttpRequest>"u"){e(pn);return}GM_xmlhttpRequest({method:"GET",url:pn,responseType:"blob",onload:t=>{const n=t.response,o=new FileReader;o.onloadend=()=>e(o.result),o.onerror=()=>e(pn),o.readAsDataURL(n);},onerror:()=>e(pn)});})}function Os(e={}){const t=Number.isFinite(e.blurPx)?Math.max(4,Number(e.blurPx)):14;Rs();const n=h("div",{className:"gemini-loader__subtitle",textContent:e.subtitle??"Initializing the mod..."}),o=h("div",{className:"gemini-loader__logs"}),r=h("img",{className:"gemini-loader__spinner-icon",alt:"Gemini"}),i=h("div",{className:"gemini-loader__spinner"},r);_s().then(m=>{r.src=m;});const a=h("div",{className:"gemini-loader__card"},h("div",{className:"gemini-loader__header"},i,h("div",{className:"gemini-loader__titles"},h("div",{className:"gemini-loader__title",textContent:e.title??"Gemini is loading"}),n)),o),s=h("div",{id:ot},a);(document.body||document.documentElement).appendChild(s);const c=h("div",{className:"gemini-loader__actions"},h("button",{className:"gemini-loader__button",textContent:"Close loader",onclick:()=>s.remove()}));a.appendChild(c),s.style.setProperty("--loader-blur",`${t}px`);const u=m=>{n.textContent=m;},l=new Map,d=(m,v)=>{m.className=`gemini-loader__log ${v}`;};return {log:(m,v="info")=>fn(o,m,v),logStep:(m,v,S="info")=>{const y=String(m||"").trim();if(!y){fn(o,v,S);return}const x=l.get(y);if(x){x.el.lastElementChild&&(x.el.lastElementChild.textContent=v),x.tone!==S&&(d(x.el,S),x.tone=S);return}const A=h("div",{className:`gemini-loader__log ${S}`},h("div",{className:"gemini-loader__dot"}),h("div",{textContent:v}));for(l.set(y,{el:A,tone:S}),o.appendChild(A);o.childElementCount>Ai;){const w=o.firstElementChild;if(!w)break;const T=Array.from(l.entries()).find(([,I])=>I.el===w)?.[0];T&&l.delete(T),w.remove();}o.scrollTop=o.scrollHeight;},setSubtitle:u,succeed:(m,v=600)=>{m&&fn(o,m,"success"),s.classList.add("gemini-loader--closing"),setTimeout(()=>s.remove(),v);},fail:(m,v)=>{fn(o,m,"error"),u("Something went wrong. Check the console for details."),s.classList.add("gemini-loader--error"),console.error("[Gemini loader]",m,v);}}}function Ti(e,t,n){const o=h("div",{className:"lg-pill",id:"pill"}),r=e.map(l=>{const d=h("button",{className:"lg-tab"},l.label);return d.setAttribute("data-target",l.id),d}),i=h("div",{className:"lg-tabs",id:"lg-tabs-row"},o,...r),a=i;i.addEventListener("wheel",l=>{Math.abs(l.deltaY)>Math.abs(l.deltaX)&&(l.preventDefault(),i.scrollLeft+=l.deltaY);},{passive:false});function s(l){const d=i.getBoundingClientRect(),p=r.find(A=>A.dataset.target===l)||r[0];if(!p)return;const f=p.getBoundingClientRect(),g=f.left-d.left,b=f.width;o.style.width=`${b}px`,o.style.transform=`translateX(${g}px)`;const m=i.scrollLeft,v=m,S=m+i.clientWidth,y=g-12,x=g+b+12;y<v?i.scrollTo({left:y,behavior:"smooth"}):x>S&&i.scrollTo({left:x-i.clientWidth,behavior:"smooth"});}let c=t||(e[0]?.id??"");function u(l){c=l,r.forEach(d=>d.classList.toggle("active",d.dataset.target===l)),s(l),n(l);}return r.forEach(l=>l.addEventListener("click",()=>u(l.dataset.target))),queueMicrotask(()=>s(c)),{root:a,activate:u,recalc:()=>s(c),getActive:()=>c}}class kt{constructor(t){le(this,"id");le(this,"label");le(this,"container",null);le(this,"cleanupFunctions",[]);le(this,"preloadedContent",null);le(this,"preloadPromise",null);this.id=t.id,this.label=t.label;}async preload(){if(this.preloadedContent||this.preloadPromise)return;const t=h("div");this.preloadPromise=(async()=>{const n=this.build(t);n instanceof Promise&&await n,this.preloadedContent=t,this.preloadPromise=null;})(),await this.preloadPromise;}isPreloaded(){return this.preloadedContent!==null}render(t){for(this.unmount();t.firstChild;)t.removeChild(t.firstChild);if(this.container=t,this.preloadedContent){for(;this.preloadedContent.firstChild;)t.appendChild(this.preloadedContent.firstChild);this.preloadedContent=null;}else {const o=this.build(t);o instanceof Promise&&o.catch(r=>{console.error(`[Gemini] Error building section ${this.id}:`,r);});}const n=t.firstElementChild;n&&n.classList.contains("gemini-section")&&n.classList.add("active");}unmount(){this.executeCleanup(),this.container=null;}createContainer(t,n){const o=n?`gemini-section ${n}`:"gemini-section";return h("section",{id:t,className:o})}addCleanup(t){this.cleanupFunctions.push(t);}createGrid(t="12px"){const n=h("div");return n.style.display="grid",n.style.gap=t,n}executeCleanup(){for(const t of this.cleanupFunctions)try{t();}catch(n){console.error(`[Gemini] Cleanup error in section ${this.id}:`,n);}this.cleanupFunctions=[];}}class Ns{constructor(t,n,o){le(this,"sections");le(this,"activeId",null);le(this,"container");le(this,"theme");this.sections=new Map(t.map(r=>[r.id,r])),this.container=n,this.theme=o;}get ids(){return Array.from(this.sections.keys())}get all(){return Array.from(this.sections.values())}get active(){return this.activeId}activate(t){if(this.activeId!==t){if(!this.sections.has(t))throw new Error(`[Gemini] Unknown section: ${t}`);if(this.activeId&&this.sections.get(this.activeId).unmount(),this.activeId=t,this.sections.get(t).render(this.container),this.theme){const n=this.theme.getCurrentTheme();this.theme.applyTheme(n);}}}}function Ii(e,t){try{const n=JSON.stringify(t);GM_setValue(e,n);}catch(n){console.error(`[Gemini] Failed to save key "${e}" to storage:`,n);}}function _t(e,t){try{const n=GM_getValue(e);return n==null?t:typeof n=="string"?JSON.parse(n):n}catch(n){return console.error(`[Gemini] Failed to load key "${e}" from storage, using default:`,n),t}}const Pi="gemini.sections";function Ei(){const e=_t(Pi,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function $s(e){Ii(Pi,e);}async function Ds(e){return Ei()[e]}function zs(e,t){const n=Ei();$s({...n,[e]:t});}function Ro(e,t){return {...e,...t??{}}}async function Fs(e){const t=await Ds(e.path);let n;e.migrate?n=e.migrate(t):n=t??{},n=Object.assign((u=>JSON.parse(JSON.stringify(u)))(e.defaults),n),e.sanitize&&(n=e.sanitize(n));function r(){zs(e.path,n);}function i(){return n}function a(u){n=e.sanitize?e.sanitize(u):u,r();}function s(u){const d=Object.assign((p=>JSON.parse(JSON.stringify(p)))(n),{});typeof u=="function"?u(d):Object.assign(d,u),n=e.sanitize?e.sanitize(d):d,r();}function c(){r();}return {get:i,set:a,update:s,save:c}}async function Mi(e,t){const{path:n=e,...o}=t;return Fs({path:n,...o})}let js=0;const gn=new Map;function be(e={},...t){const{id:n,className:o,variant:r="default",padding:i="md",interactive:a=false,expandable:s=false,defaultExpanded:c=true,onExpandChange:u,mediaTop:l,title:d,subtitle:p,badge:f,actions:g,footer:b,divider:m=false,tone:v="neutral",stateKey:S}=e,y=h("div",{className:"card",id:n,tabIndex:a?0:void 0});y.classList.add(`card--${r}`,`card--p-${i}`),a&&y.classList.add("card--interactive"),v!=="neutral"&&y.classList.add(`card--tone-${v}`),o&&y.classList.add(...o.split(" ").filter(Boolean)),s&&y.classList.add("card--expandable");const x=s?S??n??(typeof d=="string"?`title:${d}`:null):null;let A=!s||c;x&&gn.has(x)&&(A=!!gn.get(x));let w=null,T=null,I=null,k=null,E=null;const M=n?`${n}-collapse`:`card-collapse-${++js}`,G=()=>{if(k!==null&&(cancelAnimationFrame(k),k=null),E){const z=E;E=null,z();}},Q=(z,j)=>{if(!I)return;G();const F=I;if(F.setAttribute("aria-hidden",String(!z)),!j){F.classList.remove("card-collapse--animating"),F.style.display=z?"":"none",F.style.height="",F.style.opacity="";return}if(F.classList.add("card-collapse--animating"),F.style.display="",z){F.style.height="auto";const W=F.scrollHeight;if(!W){F.classList.remove("card-collapse--animating"),F.style.display="",F.style.height="",F.style.opacity="";return}F.style.height="0px",F.style.opacity="0",F.offsetHeight,k=requestAnimationFrame(()=>{k=null,F.style.height=`${W}px`,F.style.opacity="1";});}else {const W=F.scrollHeight;if(!W){F.classList.remove("card-collapse--animating"),F.style.display="none",F.style.height="",F.style.opacity="";return}F.style.height=`${W}px`,F.style.opacity="1",F.offsetHeight,k=requestAnimationFrame(()=>{k=null,F.style.height="0px",F.style.opacity="0";});}const _=()=>{F.classList.remove("card-collapse--animating"),F.style.height="",z||(F.style.display="none"),F.style.opacity="";};let L=null;const O=W=>{W.target===F&&(L!==null&&(clearTimeout(L),L=null),F.removeEventListener("transitionend",O),F.removeEventListener("transitioncancel",O),E=null,_());};E=()=>{L!==null&&(clearTimeout(L),L=null),F.removeEventListener("transitionend",O),F.removeEventListener("transitioncancel",O),E=null,_();},F.addEventListener("transitionend",O),F.addEventListener("transitioncancel",O),L=window.setTimeout(()=>{E?.();},420);};function P(z){const j=document.createElementNS("http://www.w3.org/2000/svg","svg");return j.setAttribute("viewBox","0 0 24 24"),j.setAttribute("width","16"),j.setAttribute("height","16"),j.innerHTML=z==="up"?'<path d="M7 14l5-5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>':'<path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',j}function D(z,j=true,F=true){A=z,y.classList.toggle("card--collapsed",!A),y.classList.toggle("card--expanded",A),w&&(w.dataset.expanded=String(A),w.setAttribute("aria-expanded",String(A))),T&&(T.setAttribute("aria-expanded",String(A)),T.classList.toggle("card-toggle--collapsed",!A),T.setAttribute("aria-label",A?"Replier le contenu":"Deplier le contenu"),T.replaceChildren(P(A?"up":"down"))),s?Q(A,F):I&&(I.style.display="",I.style.height="",I.style.opacity="",I.setAttribute("aria-hidden","false")),j&&u&&u(A),x&&gn.set(x,A);}if(l){const z=h("div",{className:"card-media"});z.append(l),y.appendChild(z);}const B=!!(d||p||f||g&&g.length||s);if(B){w=h("div",{className:"card-header"});const z=h("div",{className:"card-headline",style:"min-width:0;display:flex;flex-direction:column;gap:2px;"});if(d){const _=h("h3",{className:"card-title",style:"margin:0;font-size:15px;font-weight:700;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:8px;color:var(--group-title, var(--fg));"},d);f&&_.append(typeof f=="string"?h("span",{className:"badge"},f):f),z.appendChild(_);}if(p){const _=h("div",{className:"card-subtitle",style:"opacity:.85;font-size:12px;color:color-mix(in oklab, var(--fg) 80%, #9ca3af)"},p);z.appendChild(_);}(z.childNodes.length||s)&&w.appendChild(z);const j=h("div",{className:"card-header-right",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"}),F=h("div",{className:"card-actions",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"});g?.forEach(_=>F.appendChild(_)),F.childNodes.length&&j.appendChild(F),s&&(T=h("button",{className:"card-toggle",type:"button",ariaExpanded:String(A),ariaControls:M,ariaLabel:A?"Replier le contenu":"Deplier le contenu"}),T.textContent=A?"▲":"▼",T.addEventListener("click",_=>{_.preventDefault(),_.stopPropagation(),D(!A);}),j.appendChild(T),w.classList.add("card-header--expandable"),w.addEventListener("click",_=>{const L=_.target;L?.closest(".card-actions")||L?.closest(".card-toggle")||D(!A);})),j.childNodes.length&&w.appendChild(j),y.appendChild(w);}I=h("div",{className:"card-collapse",id:M,ariaHidden:s?String(!A):"false"}),y.appendChild(I),m&&B&&I.appendChild(h("div",{className:"card-divider"}));const $=h("div",{className:"card-body"});if($.append(...t),I.appendChild($),b){m&&I.appendChild(h("div",{className:"card-divider"}));const z=h("div",{className:"card-footer"});z.append(b),I.appendChild(z);}return T&&T.setAttribute("aria-controls",M),D(A,false,false),x&&gn.set(x,A),y}let $n=false;const Dn=new Set,Le=e=>{const t=document.activeElement;for(const n of Dn)if(t&&(t===n||n.contains(t))){e.stopImmediatePropagation(),e.stopPropagation();return}};function Gs(){$n||($n=true,window.addEventListener("keydown",Le,true),window.addEventListener("keypress",Le,true),window.addEventListener("keyup",Le,true),document.addEventListener("keydown",Le,true),document.addEventListener("keypress",Le,true),document.addEventListener("keyup",Le,true));}function Bs(){$n&&(Dn.size>0||($n=false,window.removeEventListener("keydown",Le,true),window.removeEventListener("keypress",Le,true),window.removeEventListener("keyup",Le,true),document.removeEventListener("keydown",Le,true),document.removeEventListener("keypress",Le,true),document.removeEventListener("keyup",Le,true)));}function zn(e){const{id:t,value:n=null,options:o,placeholder:r="Select...",size:i="md",disabled:a=false,blockGameKeys:s=true,onChange:c,onOpenChange:u}=e,l=h("div",{className:"select",id:t}),d=h("button",{className:"select-trigger",type:"button"}),p=h("span",{className:"select-value"},r),f=h("span",{className:"select-caret"},"▾");d.append(p,f);const g=h("div",{className:"select-menu",role:"listbox",tabindex:"-1","aria-hidden":"true"});l.classList.add(`select--${i}`);let b=false,m=n,v=null,S=!!a;function y(_){return _==null?r:(e.options||o).find(O=>O.value===_)?.label??r}function x(_){p.textContent=y(_),g.querySelectorAll(".select-option").forEach(L=>{const O=L.dataset.value,W=_!=null&&O===_;L.classList.toggle("selected",W),L.setAttribute("aria-selected",String(W));});}function A(_){g.replaceChildren(),_.forEach(L=>{const O=h("button",{className:"select-option"+(L.disabled?" disabled":""),type:"button",role:"option","data-value":L.value,"aria-selected":String(L.value===m),tabindex:"-1"},L.label);L.value===m&&O.classList.add("selected"),L.disabled||O.addEventListener("pointerdown",W=>{W.preventDefault(),W.stopPropagation(),M(L.value,{notify:true}),k();},{capture:true}),g.appendChild(O);});}function w(){d.setAttribute("aria-expanded",String(b)),g.setAttribute("aria-hidden",String(!b));}function T(){const _=d.getBoundingClientRect();Object.assign(g.style,{minWidth:`${_.width}px`});}function I(){b||S||(b=true,l.classList.add("open"),w(),T(),document.addEventListener("mousedown",B,true),document.addEventListener("scroll",$,true),window.addEventListener("resize",z),g.focus({preventScroll:true}),s&&(Gs(),Dn.add(l),v=()=>{Dn.delete(l),Bs();}),u?.(true));}function k(){b&&(b=false,l.classList.remove("open"),w(),document.removeEventListener("mousedown",B,true),document.removeEventListener("scroll",$,true),window.removeEventListener("resize",z),d.focus({preventScroll:true}),v?.(),v=null,u?.(false));}function E(){b?k():I();}function M(_,L={}){const O=m;m=_,x(m),L.notify!==false&&O!==_&&c?.(_);}function G(){return m}function Q(_){const L=Array.from(g.querySelectorAll(".select-option:not(.disabled)"));if(!L.length)return;const O=L.findIndex(oe=>oe.classList.contains("active")),W=L[(O+(_===1?1:L.length-1))%L.length];L.forEach(oe=>oe.classList.remove("active")),W.classList.add("active"),W.focus({preventScroll:true}),W.scrollIntoView({block:"nearest"});}function P(_){(_.key===" "||_.key==="Enter"||_.key==="ArrowDown")&&(_.preventDefault(),I());}function D(_){if(_.key==="Escape"){_.preventDefault(),k();return}if(_.key==="Enter"||_.key===" "){const L=g.querySelector(".select-option.active")||g.querySelector(".select-option.selected");L&&!L.classList.contains("disabled")&&(_.preventDefault(),M(L.dataset.value,{notify:true}),k());return}if(_.key==="ArrowDown"){_.preventDefault(),Q(1);return}if(_.key==="ArrowUp"){_.preventDefault(),Q(-1);return}}function B(_){l.contains(_.target)||k();}function $(){b&&T();}function z(){b&&T();}function j(_){S=!!_,d.disabled=S,l.classList.toggle("disabled",S),S&&k();}function F(_){e.options=_,A(_),_.some(L=>L.value===m)||(m=null,x(null));}return l.append(d,g),d.addEventListener("pointerdown",_=>{_.preventDefault(),_.stopPropagation(),E();},{capture:true}),d.addEventListener("keydown",P),g.addEventListener("keydown",D),A(o),n!=null?(m=n,x(m)):x(null),w(),j(S),{root:l,open:I,close:k,toggle:E,getValue:G,setValue:M,setOptions:F,setDisabled:j,destroy(){document.removeEventListener("mousedown",B,true),document.removeEventListener("scroll",$,true),window.removeEventListener("resize",z),v?.(),v=null;}}}function rn(e={}){const{id:t,text:n="",htmlFor:o,tone:r="default",size:i="md",layout:a="inline",variant:s="text",required:c=false,disabled:u=false,tooltip:l,hint:d,icon:p,suffix:f,onClick:g}=e,b=h("div",{className:"lg-label-wrap",id:t}),m=h("label",{className:"lg-label",...o?{htmlFor:o}:{},...l?{title:l}:{}});if(p){const M=typeof p=="string"?h("span",{className:"lg-label-ico"},p):p;M.classList?.add?.("lg-label-ico"),m.appendChild(M);}const v=h("span",{className:"lg-label-text"},n);m.appendChild(v);const S=h("span",{className:"lg-label-req",ariaHidden:"true"}," *");c&&m.appendChild(S);let y=null;if(f!=null){y=typeof f=="string"?document.createTextNode(f):f;const M=h("span",{className:"lg-label-suffix"});M.appendChild(y),m.appendChild(M);}const x=d?h("div",{className:"lg-label-hint"},d):null;b.classList.add(`lg-label--${a}`),b.classList.add(`lg-label--${i}`),s==="title"&&b.classList.add("lg-label--title"),A(r),u&&b.classList.add("is-disabled"),b.appendChild(m),x&&b.appendChild(x),g&&m.addEventListener("click",g);function A(M){b.classList.remove("lg-label--default","lg-label--muted","lg-label--info","lg-label--success","lg-label--warning","lg-label--danger"),b.classList.add(`lg-label--${M}`);}function w(M){v.textContent=M;}function T(M){A(M);}function I(M){M&&!S.isConnected&&m.appendChild(S),!M&&S.isConnected&&S.remove(),M?m.setAttribute("aria-required","true"):m.removeAttribute("aria-required");}function k(M){b.classList.toggle("is-disabled",!!M);}function E(M){!M&&x&&x.isConnected?x.remove():M&&x?x.textContent=M:M&&!x&&b.appendChild(h("div",{className:"lg-label-hint"},M));}return {root:b,labelEl:m,hintEl:x,setText:w,setTone:T,setRequired:I,setDisabled:k,setHint:E}}function Ot(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function mn(e,t){const n=document.createElement("span");n.className=`btn-ico btn-ico--${t}`;const o=Ot(e);return o&&n.appendChild(o),n}function Ws(){const e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.marginRight="6px",t.style.display="none",t.style.flexShrink="0";const n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");const o=document.createElementNS(e,"animate");o.setAttribute("attributeName","stroke-dasharray"),o.setAttribute("values","1,150;90,150;90,150"),o.setAttribute("dur","1.5s"),o.setAttribute("repeatCount","indefinite");const r=document.createElementNS(e,"animateTransform");return r.setAttribute("attributeName","transform"),r.setAttribute("attributeType","XML"),r.setAttribute("type","rotate"),r.setAttribute("from","0 12 12"),r.setAttribute("to","360 12 12"),r.setAttribute("dur","1s"),r.setAttribute("repeatCount","indefinite"),n.appendChild(o),n.appendChild(r),t.appendChild(n),t}function Pe(e={}){const{label:t="",id:n,variant:o="default",size:r="md",iconLeft:i,iconRight:a,loading:s=false,tooltip:c,type:u="button",onClick:l,disabled:d=false,fullWidth:p=false}=e,f=h("button",{className:"btn",id:n});f.type=u,o==="primary"&&f.classList.add("primary"),o==="danger"&&f.classList.add("danger"),r==="sm"&&f.classList.add("btn--sm"),c&&(f.title=c),p&&(f.style.width="100%");const g=Ws(),b=i?mn(i,"left"):null,m=a?mn(a,"right"):null,v=document.createElement("span");v.className="btn-label";const S=Ot(t);S&&v.appendChild(S),!S&&(b||m)&&f.classList.add("btn--icon"),f.appendChild(g),b&&f.appendChild(b),f.appendChild(v),m&&f.appendChild(m);const y=d||s;f.disabled=y,f.setAttribute("aria-busy",String(!!s)),g.style.display=s?"inline-block":"none",l&&f.addEventListener("click",l);const x=f;return x.setLoading=A=>{f.setAttribute("aria-busy",String(!!A)),g.style.display=A?"inline-block":"none",f.disabled=A||d;},x.setDisabled=A=>{f.disabled=A||f.getAttribute("aria-busy")==="true";},x.setLabel=A=>{v.replaceChildren();const w=Ot(A);w&&v.appendChild(w),!w&&(b||m)?f.classList.add("btn--icon"):f.classList.remove("btn--icon");},x.setIconLeft=A=>{if(A==null){b?.remove();return}b?b.replaceChildren(Ot(A)):f.insertBefore(mn(A,"left"),v);},x.setIconRight=A=>{if(A==null){m?.remove();return}m?m.replaceChildren(Ot(A)):f.appendChild(mn(A,"right"));},x.setVariant=A=>{f.classList.remove("primary","danger"),A==="primary"&&f.classList.add("primary"),A==="danger"&&f.classList.add("danger");},x}let kr=null;function Hs(){try{const e=window.visualViewport,t=Math.round((e?.width??window.innerWidth)||0),n=Math.round((e?.height??window.innerHeight)||0);if(t&&n)return t>=n?"landscape":"portrait"}catch{}return "unknown"}function Li(){const e=navigator.userAgent||"",t=navigator.platform||"",n=navigator.userAgentData;if(n&&typeof n.platform=="string"){const r=n.platform.toLowerCase();if(r.includes("windows"))return "windows";if(r.includes("mac"))return "mac";if(r.includes("android"))return "android";if(r.includes("chrome os")||r.includes("cros"))return "chromeos";if(r.includes("linux"))return "linux";if(r.includes("ios"))return "ios"}return /iPhone|iPad|iPod/i.test(e)||t==="MacIntel"&&(navigator.maxTouchPoints??0)>1?"ios":/Android/i.test(e)?"android":/CrOS/i.test(e)?"chromeos":/Win/i.test(e)?"windows":/Mac/i.test(e)?"mac":/Linux/i.test(e)?"linux":"unknown"}function Ri(){const e=navigator.userAgent||"",t=navigator.userAgentData;if(t&&Array.isArray(t.brands)){const n=t.brands.map(a=>String(a.brand||a.brandName||a.brandVersion||a)),o=n.some(a=>/Edge/i.test(a)||/Microsoft Edge/i.test(a)),r=n.some(a=>/Opera/i.test(a)||/OPR/i.test(a)),i=n.some(a=>/Chrome|Chromium/i.test(a));if(o)return "Edge";if(r)return "Opera";if(i)return "Chrome";if(navigator.brave)return "Brave"}return /FxiOS/i.test(e)?"Firefox":/CriOS/i.test(e)?"Chrome":/EdgiOS/i.test(e)?"Edge":/OPiOS|OPR|Opera Mini|Opera/i.test(e)?"Opera":/Edg\//i.test(e)?"Edge":/OPR\//i.test(e)||/Opera/i.test(e)?"Opera":/Firefox/i.test(e)?"Firefox":/Safari/i.test(e)&&!/Chrome|Chromium|Edg|OPR/i.test(e)?"Safari":/Brave/i.test(e)||window.Brave||navigator.brave?"Brave":/Chrome|Chromium/i.test(e)?"Chrome":"Unknown"}function Vs(){if(kr)return kr;const e=navigator.userAgent||"",t=navigator.userAgentData;return t&&typeof t.mobile=="boolean"?t.mobile?"mobile":"desktop":/Android|iPhone|iPad|iPod|Mobile/i.test(e)?"mobile":"desktop"}function Us(e){if(!e)return null;try{return new URL(e).hostname}catch{return null}}function Xr(){const e=(()=>{try{return window.top!==window.self}catch{return  true}})(),t=Us(document.referrer),o=e&&!!t&&/(^|\.)discord(app)?\.com$/i.test(t)?"discord":"web",r=Vs(),i=Li(),a=Ri(),s=window.screen||{},c=window.visualViewport,u=Math.round(window.innerWidth||document.documentElement.clientWidth||0),l=Math.round(window.innerHeight||document.documentElement.clientHeight||0),d=Math.round(c?.width??u),p=Math.round(c?.height??l),f=Math.round(s.width||0),g=Math.round(s.height||0),b=Math.round(s.availWidth||f),m=Math.round(s.availHeight||g),v=Number.isFinite(window.devicePixelRatio)?window.devicePixelRatio:1;return {surface:o,host:location.hostname,origin:location.origin,isInIframe:e,platform:r,browser:a,os:i,viewportWidth:u,viewportHeight:l,visualViewportWidth:d,visualViewportHeight:p,screenWidth:f,screenHeight:g,availScreenWidth:b,availScreenHeight:m,dpr:v,orientation:Hs()}}function Ks(){return Xr().surface==="discord"}function qs(){return Xr().platform==="mobile"}const $e={detect:Xr,isDiscord:Ks,isMobile:qs,detectOS:Li,detectBrowser:Ri,setPlatformOverride:e=>{kr=e;}};let Fn=false;const Nt=new Set;function Ys(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}const Re=e=>{const t=Ys();if(t){for(const n of Nt)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function Xs(){Fn||(Fn=true,window.addEventListener("keydown",Re,true),window.addEventListener("keypress",Re,true),window.addEventListener("keyup",Re,true),document.addEventListener("keydown",Re,true),document.addEventListener("keypress",Re,true),document.addEventListener("keyup",Re,true));}function Js(){Fn&&(Fn=false,window.removeEventListener("keydown",Re,true),window.removeEventListener("keypress",Re,true),window.removeEventListener("keyup",Re,true),document.removeEventListener("keydown",Re,true),document.removeEventListener("keypress",Re,true),document.removeEventListener("keyup",Re,true));}function Qs(e){return Nt.size===0&&Xs(),Nt.add(e),()=>{Nt.delete(e),Nt.size===0&&Js();}}function Zs(e,t,n,o){let r;switch(e){case "digits":r="0-9";break;case "alpha":r="\\p{L}";break;case "alphanumeric":r="\\p{L}0-9";break;default:return null}return t&&(r+=" "),n&&(r+="\\-"),o&&(r+="_"),new RegExp(`[^${r}]`,"gu")}function el(e,t){return t?e.replace(t,""):e}function tl(e,t=0){if(!t)return e;let n;return((...o)=>{clearTimeout(n),n=setTimeout(()=>e(...o),t);})}function qt(e={}){const{id:t,placeholder:n="",value:o="",mode:r="any",allowSpaces:i=false,allowDashes:a=false,allowUnderscore:s=false,maxLength:c,blockGameKeys:u=true,debounceMs:l=0,onChange:d,onEnter:p,label:f}=e,g=h("div",{className:"lg-input-wrap"}),b=h("input",{className:"input",id:t,placeholder:n});if(typeof c=="number"&&c>0&&(b.maxLength=c),o&&(b.value=o),f){const M=h("div",{className:"lg-input-label"},f);g.appendChild(M);}g.appendChild(b);const m=Zs(r,i,a,s),v=()=>{const M=b.selectionStart??b.value.length,G=b.value.length,Q=el(b.value,m);if(Q!==b.value){b.value=Q;const P=G-Q.length,D=Math.max(0,M-P);b.setSelectionRange(D,D);}},S=tl(()=>d?.(b.value),l);b.addEventListener("input",()=>{v(),S();}),b.addEventListener("paste",()=>queueMicrotask(()=>{v(),S();})),b.addEventListener("keydown",M=>{M.key==="Enter"&&p?.(b.value);});const y=u?Qs(b):()=>{};function x(){return b.value}function A(M){b.value=M??"",v(),S();}function w(){b.focus();}function T(){b.blur();}function I(M){b.disabled=!!M;}function k(){return document.activeElement===b}function E(){y();}return {root:g,input:b,getValue:x,setValue:A,focus:w,blur:T,setDisabled:I,isFocused:k,destroy:E}}function ye(e,t,n){return Math.min(n,Math.max(t,e))}function jt({h:e,s:t,v:n,a:o}){const r=(e%360+360)%360/60,i=n*t,a=i*(1-Math.abs(r%2-1));let s=0,c=0,u=0;switch(Math.floor(r)){case 0:s=i,c=a;break;case 1:s=a,c=i;break;case 2:c=i,u=a;break;case 3:c=a,u=i;break;case 4:s=a,u=i;break;default:s=i,u=a;break}const d=n-i,p=Math.round((s+d)*255),f=Math.round((c+d)*255),g=Math.round((u+d)*255);return {r:ye(p,0,255),g:ye(f,0,255),b:ye(g,0,255),a:ye(o,0,1)}}function _i({r:e,g:t,b:n,a:o}){const r=ye(e,0,255)/255,i=ye(t,0,255)/255,a=ye(n,0,255)/255,s=Math.max(r,i,a),c=Math.min(r,i,a),u=s-c;let l=0;u!==0&&(s===r?l=60*((i-a)/u%6):s===i?l=60*((a-r)/u+2):l=60*((r-i)/u+4)),l<0&&(l+=360);const d=s===0?0:u/s;return {h:l,s:d,v:s,a:ye(o,0,1)}}function Jr({r:e,g:t,b:n}){const o=r=>ye(Math.round(r),0,255).toString(16).padStart(2,"0");return `#${o(e)}${o(t)}${o(n)}`.toUpperCase()}function nl({r:e,g:t,b:n,a:o}){const r=ye(Math.round(o*255),0,255);return `${Jr({r:e,g:t,b:n})}${r.toString(16).padStart(2,"0")}`.toUpperCase()}function $t({r:e,g:t,b:n,a:o}){const r=Math.round(o*1e3)/1e3;return `rgba(${e}, ${t}, ${n}, ${r})`}function mt(e){let t=e.trim();if(!t||(t.startsWith("#")&&(t=t.slice(1)),![3,4,6,8].includes(t.length))||!/^[0-9a-fA-F]+$/.test(t))return null;(t.length===3||t.length===4)&&(t=t.split("").map(a=>a+a).join(""));let n=255;t.length===8&&(n=parseInt(t.slice(6,8),16),t=t.slice(0,6));const o=parseInt(t.slice(0,2),16),r=parseInt(t.slice(2,4),16),i=parseInt(t.slice(4,6),16);return {r:o,g:r,b:i,a:n/255}}function Cr(e){if(!e)return null;const t=e.trim();if(t.startsWith("#"))return mt(t);const n=t.match(/^rgba?\(([^)]+)\)$/i);if(n){const o=n[1].split(",").map(c=>c.trim());if(o.length<3)return null;const r=Number(o[0]),i=Number(o[1]),a=Number(o[2]),s=o[3]!=null?Number(o[3]):1;return [r,i,a,s].some(c=>Number.isNaN(c))?null:{r,g:i,b:a,a:s}}return null}function rl(e,t){const n=Cr(e)??mt(e??"")??{r:244,g:67,b:54,a:1};return typeof t=="number"&&(n.a=ye(t,0,1)),_i(n)}function ol(e){return `#${e.trim().replace(/[^0-9a-fA-F#]/g,"").replace(/#/g,"")}`.slice(0,9).toUpperCase()}function il(e){let t=e.trim();return t&&(/^rgba?\s*\(/i.test(t)?t=t.replace(/^rgba?/i,"rgba"):(t=t.replace(/^\(?(.*)\)?$/,"$1"),t=`rgba(${t})`),t=t.replace(/\s*\(\s*/,"("),t=t.replace(/\s*\)\s*$/,")"),t=t.replace(/\s*,\s*/g,", "),t)}function Ze(e){const t=jt(e),n=jt({...e,a:1});return {hsva:{...e},hex:Jr(n),hexa:nl(t),rgba:$t(t),alpha:e.a}}function al(e={}){const{id:t,label:n="Color",value:o,alpha:r,defaultExpanded:i=false,detectMobile:a,onInput:s,onChange:c}=e,l=a?a():$e.detect().platform==="mobile";let d=rl(o,r);const p=be({id:t,className:"color-picker",title:n,padding:l?"md":"lg",variant:"soft",expandable:!l,defaultExpanded:!l&&i});p.classList.add(l?"color-picker--mobile":"color-picker--desktop");const f=p.querySelector(".card-header");f&&f.classList.add("color-picker__header");const g=f?.querySelector(".card-title"),b=h("button",{className:"color-picker__preview",type:"button",title:`Preview ${n}`,"aria-label":`Change ${n}`});g?g.prepend(b):f?f.prepend(b):p.prepend(b);const m=p.querySelector(".card-toggle");!l&&m&&b.addEventListener("click",()=>{p.classList.contains("card--collapsed")&&m.click();});const v=p.querySelector(".card-collapse");let S=null,y=null,x=null,A=null,w=null,T=null,I=null,k=null,E=null,M="hex";function G($){const z=Ze(d);$==="input"?s?.(z):c?.(z);}function Q(){const $=Ze(d);if(b.style.setProperty("--cp-preview-color",$.rgba),b.setAttribute("aria-label",`${n}: ${$.hexa}`),!l&&S&&y&&x&&A&&w&&T&&I){const z=jt({...d,s:1,v:1,a:1}),j=$t(z);S.style.setProperty("--cp-palette-hue",j),y.style.left=`${d.s*100}%`,y.style.top=`${(1-d.v)*100}%`,x.style.setProperty("--cp-alpha-gradient",`linear-gradient(180deg, ${$t({...z,a:1})} 0%, ${$t({...z,a:0})} 100%)`),A.style.top=`${(1-d.a)*100}%`,w.style.setProperty("--cp-hue-color",$t(jt({...d,v:1,s:1,a:1}))),T.style.left=`${d.h/360*100}%`;const F=d.a===1?$.hex:$.hexa,_=$.rgba,L=M==="hex"?F:_;I!==document.activeElement&&(I.value=L),I.setAttribute("aria-label",`${M.toUpperCase()} code for ${n}`),I.placeholder=M==="hex"?"#RRGGBB or #RRGGBBAA":"rgba(0, 0, 0, 1)",M==="hex"?I.maxLength=9:I.removeAttribute("maxLength"),I.dataset.mode=M,k&&(k.textContent=M.toUpperCase(),k.setAttribute("aria-label",M==="hex"?"Passer en saisie RGBA":"Revenir en saisie HEX"),k.setAttribute("aria-pressed",M==="rgba"?"true":"false"),k.classList.toggle("is-alt",M==="rgba"));}E&&E!==document.activeElement&&(E.value=$.hex);}function P($,z=null){d={h:($.h%360+360)%360,s:ye($.s,0,1),v:ye($.v,0,1),a:ye($.a,0,1)},Q(),z&&G(z);}function D($,z=null){P(_i($),z);}function B($,z,j){$.addEventListener("pointerdown",F=>{F.preventDefault();const _=F.pointerId,L=W=>{W.pointerId===_&&z(W);},O=W=>{W.pointerId===_&&(document.removeEventListener("pointermove",L),document.removeEventListener("pointerup",O),document.removeEventListener("pointercancel",O),j?.(W));};z(F),document.addEventListener("pointermove",L),document.addEventListener("pointerup",O),document.addEventListener("pointercancel",O);});}if(!l&&v){const $=v.querySelector(".card-body");if($){$.classList.add("color-picker__body"),y=h("div",{className:"color-picker__palette-cursor"}),S=h("div",{className:"color-picker__palette"},y),A=h("div",{className:"color-picker__alpha-thumb"}),x=h("div",{className:"color-picker__alpha"},A),T=h("div",{className:"color-picker__hue-thumb"}),w=h("div",{className:"color-picker__hue"},T);const z=h("div",{className:"color-picker__main"},S,x),j=h("div",{className:"color-picker__hue-row"},w),F=qt({blockGameKeys:true});I=F.input,I.classList.add("color-picker__hex-input"),I.value="",I.maxLength=9,I.spellcheck=false,I.inputMode="text",I.setAttribute("aria-label",`Hex code for ${n}`),k=h("button",{type:"button",className:"color-picker__mode-btn",textContent:"HEX","aria-pressed":"false","aria-label":"Passer en saisie RGBA"}),F.root.classList.add("color-picker__hex-wrap");const _=h("div",{className:"color-picker__hex-row"},k,F.root);$.replaceChildren(z,j,_),B(S,O=>{if(!S||!y)return;const W=S.getBoundingClientRect(),oe=ye((O.clientX-W.left)/W.width,0,1),Te=ye((O.clientY-W.top)/W.height,0,1);P({...d,s:oe,v:1-Te},"input");},()=>G("change")),B(x,O=>{if(!x)return;const W=x.getBoundingClientRect(),oe=ye((O.clientY-W.top)/W.height,0,1);P({...d,a:1-oe},"input");},()=>G("change")),B(w,O=>{if(!w)return;const W=w.getBoundingClientRect(),oe=ye((O.clientX-W.left)/W.width,0,1);P({...d,h:oe*360},"input");},()=>G("change")),k.addEventListener("click",()=>{if(M=M==="hex"?"rgba":"hex",I){const O=Ze(d);I.value=M==="hex"?d.a===1?O.hex:O.hexa:O.rgba;}Q(),I?.focus(),I?.select();}),I.addEventListener("input",()=>{if(M==="hex"){const O=ol(I.value);if(O!==I.value){const W=I.selectionStart??O.length;I.value=O,I.setSelectionRange(W,W);}}});const L=()=>{const O=I.value;if(M==="hex"){const W=mt(O);if(!W){I.value=d.a===1?Ze(d).hex:Ze(d).hexa;return}const oe=O.startsWith("#")?O.slice(1):O,Te=oe.length===4||oe.length===8;W.a=Te?W.a:d.a,D(W,"change");}else {const W=il(O),oe=Cr(W);if(!oe){I.value=Ze(d).rgba;return}D(oe,"change");}};I.addEventListener("change",L),I.addEventListener("blur",L),I.addEventListener("keydown",O=>{O.key==="Enter"&&(L(),I.blur());});}}return l&&(v&&v.remove(),E=h("input",{className:"color-picker__native",type:"color",value:Jr(jt({...d,a:1}))}),b.addEventListener("click",()=>E.click()),E.addEventListener("input",()=>{const $=mt(E.value);$&&($.a=d.a,D($,"input"),G("change"));}),p.appendChild(E)),Q(),{root:p,isMobile:l,getValue:()=>Ze(d),setValue:($,z)=>{const j=Cr($)??mt($)??mt("#FFFFFF");j&&(typeof z=="number"&&(j.a=z),D(j,null));}}}const sl=window;function ll(){if(typeof unsafeWindow<"u"&&unsafeWindow)return unsafeWindow;const e=window.wrappedJSObject;return e&&e!==window?e:sl}const cl=ll(),N=cl;function dl(e){try{return !!e.isSecureContext}catch{return  false}}function Qr(e){const t=e?.getRootNode?.();return t&&(t instanceof Document||t.host)?t:document}function Oi(){const e=navigator.platform||"",t=navigator.userAgent||"";return /Mac|iPhone|iPad|iPod/i.test(e)||/Mac OS|iOS/i.test(t)}async function ul(){try{const e=await navigator.permissions?.query?.({name:"clipboard-write"});return e?e.state==="granted"||e.state==="prompt":!0}catch{return  true}}function pl(e,t){const n=document.createElement("textarea");return n.value=e,n.setAttribute("readonly","true"),n.style.position="fixed",n.style.opacity="0",n.style.pointerEvents="none",n.style.top="0",t.appendChild?t.appendChild(n):document.body.appendChild(n),n}function fl(e){try{const t=window.getSelection?.();if(!t)return !1;const n=document.createRange();return n.selectNodeContents(e),t.removeAllRanges(),t.addRange(n),!0}catch{return  false}}async function gl(e){if(!("clipboard"in navigator))return {ok:false,method:"clipboard-write"};if(!dl(N))return {ok:false,method:"clipboard-write"};if(!await ul())return {ok:false,method:"clipboard-write"};try{return await navigator.clipboard.writeText(e),{ok:!0,method:"clipboard-write"}}catch{return {ok:false,method:"clipboard-write"}}}function ml(e,t){try{const n=t||Qr(),o=pl(e,n);o.focus(),o.select(),o.setSelectionRange(0,o.value.length);let r=!1;try{r=document.execCommand("copy");}catch{r=!1;}return o.remove(),{ok:r,method:"execCommand"}}catch{return {ok:false,method:"execCommand"}}}function hl(e,t){if(!t)return {ok:false,method:"selection"};const n=t.textContent??"";let o=false;if(n!==e)try{t.textContent=e,o=!0;}catch{}const r=fl(t);o&&setTimeout(()=>{try{t.textContent=n;}catch{}},80);const i=Oi()?"⌘C pour copier":"Ctrl+C pour copier";return {ok:r,method:"selection",hint:i}}async function bl(e,t={}){const n=(e??"").toString();if(!n.length)return {ok:false,method:"noop"};const o=await gl(n);if(o.ok)return o;const r=t.injectionRoot||Qr(t.valueNode||void 0),i=ml(n,r);if(i.ok)return i;const a=hl(n,t.valueNode||null);if(a.ok)return a;if(!t.disablePromptFallback)try{return window.prompt($e.isDiscord()?"Copie manuelle (Discord bloque clipboard):":"Copie manuelle:",n),{ok:!0,method:"prompt"}}catch{}return {ok:false,method:"noop"}}function yl(e,t,n={}){const o=r=>{if(n.showTip){n.showTip(r);return}try{e.setAttribute("aria-label",r);const i=document.createElement("div");i.textContent=r,i.style.position="absolute",i.style.top="-28px",i.style.right="0",i.style.padding="4px 8px",i.style.borderRadius="8px",i.style.fontSize="12px",i.style.background="color-mix(in oklab, var(--bg) 85%, transparent)",i.style.border="1px solid var(--border)",i.style.color="var(--fg)",i.style.pointerEvents="none",i.style.opacity="0",i.style.transition="opacity .12s";const a=Qr(e);a.appendChild?a.appendChild(i):document.body.appendChild(i);const s=e.getBoundingClientRect();i.style.left=`${s.right-8}px`,i.style.top=`${s.top-28}px`,requestAnimationFrame(()=>i.style.opacity="1"),setTimeout(()=>{i.style.opacity="0",setTimeout(()=>i.remove(),150);},1200);}catch{}};e.addEventListener("click",async r=>{r.stopPropagation();const i=(t()??"").toString(),a=await bl(i,{valueNode:n.valueNode??null,injectionRoot:n.injectionRoot??null,disablePromptFallback:n.disablePromptFallback??false});n.onResult?.(a),a.ok?a.method==="clipboard-write"||a.method==="execCommand"||a.method==="prompt"?o("Copié"):a.method==="selection"&&o(a.hint||(Oi()?"⌘C pour copier":"Ctrl+C pour copier")):o("Impossible de copier");});}const Gt={light:{"--bg":"rgba(255,255,255,0.7)","--fg":"#0f172a","--muted":"rgba(15,23,42,0.06)","--soft":"rgba(15,23,42,0.04)","--accent":"#2563eb","--border":"rgba(15,23,42,0.12)","--shadow":"rgba(2,6,23,.2)","--tab-bg":"#ffffff","--tab-fg":"#0f172a","--pill-from":"#4f46e5","--pill-to":"#06b6d4"},dark:{"--bg":"rgba(10,12,18,0.6)","--fg":"#e5e7eb","--muted":"rgba(229,231,235,0.08)","--soft":"rgba(229,231,235,0.05)","--accent":"#60a5fa","--border":"rgba(148,163,184,0.2)","--shadow":"rgba(0,0,0,.45)","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#e5e7eb","--pill-from":"#6366f1","--pill-to":"#06b6d4"},sepia:{"--bg":"rgba(247,242,231,0.72)","--fg":"#3b2f2f","--muted":"rgba(59,47,47,0.06)","--soft":"rgba(59,47,47,0.04)","--accent":"#b07d62","--border":"rgba(59,47,47,0.14)","--shadow":"rgba(0,0,0,.18)","--tab-bg":"#fff","--tab-fg":"#3b2f2f","--pill-from":"#b07d62","--pill-to":"#d4a373"},forest:{"--bg":"rgba(14,24,18,0.62)","--fg":"#e7f5e9","--muted":"rgba(231,245,233,0.08)","--soft":"rgba(231,245,233,0.05)","--accent":"#34d399","--border":"rgba(231,245,233,0.16)","--shadow":"rgba(0,0,0,.5)","--tab-bg":"rgba(255,255,255,0.06)","--tab-fg":"#e7f5e9","--pill-from":"#10b981","--pill-to":"#84cc16"},violet:{"--bg":"rgba(23, 16, 42, 0.68)","--fg":"#f5f3ff","--muted":"rgba(245,243,255,0.08)","--soft":"rgba(245,243,255,0.05)","--accent":"#a855f7","--border":"rgba(216,180,254,0.22)","--shadow":"rgba(12,3,30,.55)","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#ede9fe","--pill-from":"#a855f7","--pill-to":"#f472b6"},ocean:{"--bg":"rgba(10, 34, 46, 0.66)","--fg":"#e0f7ff","--muted":"rgba(224,247,255,0.07)","--soft":"rgba(224,247,255,0.05)","--accent":"#38bdf8","--border":"rgba(125, 211, 252, 0.22)","--shadow":"rgba(0, 16, 32, .52)","--tab-bg":"rgba(56,189,248,0.14)","--tab-fg":"#e0f7ff","--pill-from":"#0ea5e9","--pill-to":"#14b8a6"},ember:{"--bg":"rgba(34,18,10,0.64)","--fg":"#fff7ed","--muted":"rgba(255,247,237,0.08)","--soft":"rgba(255,247,237,0.05)","--accent":"#f97316","--border":"rgba(255, 159, 92, 0.24)","--shadow":"rgba(16,6,2,.52)","--tab-bg":"rgba(255,247,237,0.09)","--tab-fg":"#fff7ed","--pill-from":"#fb923c","--pill-to":"#facc15"},magicGarden:{"--bg":"#201D1D","--fg":"#F5F5F5","--muted":"rgba(255,255,255,0.6)","--soft":"rgba(0,0,0,0.3)","--accent":"#FFF27D","--border":"rgba(255,255,255,0.1)","--border-accent":"#4A3B2E","--shadow":"rgba(0,0,0,0.5)","--card-shadow":"0 4px 10px rgba(0, 0, 0, 0.5)","--tab-bg":"#10725A","--tab-fg":"#F5F5F5","--section-title":"#10725A","--group-title":"#5EB292","--item-label":"#F5F5F5","--item-desc":"rgba(255,255,255,0.6)","--item-value":"#FFF27D","--card-bg":"rgba(0,0,0,0.3)","--card-radius":"12px","--card-border":"#4A3B2E","--pill-from":"#FFF27D","--pill-to":"#5EB292","--scrollbar-thumb":"rgba(255,255,255,0.2)","--scrollbar-thumb-hover":"rgba(255,255,255,0.3)"}};function vl(e){const{host:t,themes:n,initialTheme:o,onThemeChange:r}=e;let i=o,a=null,s=false;function c(l){const d=n[l]||n[i]||{};s&&t.classList.add("theme-anim");for(const[p,f]of Object.entries(d))t.style.setProperty(p,f);s?(a!==null&&clearTimeout(a),a=N.setTimeout(()=>{t.classList.remove("theme-anim"),a=null;},320)):s=true,i=l,r?.(l);}function u(){return i}return c(o),{applyTheme:c,getCurrentTheme:u}}const Ar={ui:{expandedCards:{style:false,system:false}}};async function xl(){const e=await Mi("tab-settings",{version:1,defaults:Ar,sanitize:r=>({ui:{expandedCards:Ro(Ar.ui.expandedCards,r.ui?.expandedCards)}})});function t(r){const i=e.get();e.update({ui:{...i.ui,...r,expandedCards:Ro(i.ui.expandedCards,r.expandedCards)}});}function n(r,i){const a=e.get();e.update({ui:{...a.ui,expandedCards:{...a.ui.expandedCards,[r]:!!i}}});}function o(r){const i=e.get();n(r,!i.ui.expandedCards[r]);}return {get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:o}}function Ni(e){return e.replace(/[_-]+/g," ").replace(/^\w/,t=>t.toUpperCase())}function wl(){return Object.keys(Gt).map(e=>({value:e,label:Ni(e)}))}const Sl=["--bg","--fg","--accent","--muted","--soft","--border","--shadow","--tab-bg","--tab-fg","--pill-from","--pill-to"];function kl(e){return Ni(e.replace(/^--/,""))}function Cl(e){return e.alpha<1?e.rgba:e.hex}class Al extends kt{constructor(t){super({id:"tab-settings",label:"Settings"}),this.deps=t;}async build(t){const n=this.createGrid("12px");n.id="settings",t.appendChild(n);let o;try{o=await xl();}catch{o={get:()=>Ar,set:()=>{},save:()=>{},setUI:()=>{},setCardExpanded:()=>{},toggleCard:()=>{}};}const r=o.get(),i=Object.keys(Gt),a=this.deps.getCurrentTheme?.()??this.deps.initialTheme,s=i.includes(a)?a:i[0]??"dark";let c=s;const u=rn({text:"Theme",tone:"muted",size:"lg"}),l=zn({options:wl(),value:s,onChange:g=>{c=g,this.deps.applyTheme(g),this.renderThemePickers(g,d,c);}}),d=h("div",{className:"settings-theme-grid"}),p=be({title:"Style",padding:"lg",expandable:true,defaultExpanded:!!r.ui.expandedCards.style,onExpandChange:g=>o.setCardExpanded("style",g)},h("div",{className:"kv settings-theme-row"},u.root,l.root),d);this.renderThemePickers(s,d,c);const f=this.createEnvCard({defaultExpanded:!!r.ui.expandedCards.system,onExpandChange:g=>o.setCardExpanded("system",g)});n.appendChild(p),n.appendChild(f);}renderThemePickers(t,n,o){const r=Gt[t];if(n.replaceChildren(),!!r)for(const i of Sl){const a=r[i];if(a==null)continue;const s=al({label:kl(i),value:a,defaultExpanded:false,onInput:c=>this.updateThemeVar(t,i,c,o),onChange:c=>this.updateThemeVar(t,i,c,o)});n.appendChild(s.root);}}updateThemeVar(t,n,o,r){const i=Gt[t];i&&(i[n]=Cl(o),r===t&&this.deps.applyTheme(t));}createEnvCard(t){const n=t?.defaultExpanded??false,o=t?.onExpandChange,r=(m,v)=>{const S=h("div",{className:"kv kv--inline-mobile"}),y=h("label",{},m),x=h("div",{className:"ro"});return typeof v=="string"?x.textContent=v:x.append(v),S.append(y,x),S},i=h("code",{},"—"),a=h("span",{},"—"),s=h("span",{},"—"),c=h("span",{},"—"),u=h("span",{},"—"),l=h("span",{},"—"),d=()=>{const m=$e.detect();s.textContent=m.surface,c.textContent=m.platform,u.textContent=m.browser??"Unknown",l.textContent=m.os??"Unknown",i.textContent=m.host,a.textContent=m.isInIframe?"Yes":"No";},p=Pe({label:"Copy JSON",variant:"primary",size:"sm"});yl(p,()=>{const m=$e.detect();return JSON.stringify(m,null,2)});const f=h("div",{style:"width:100%;display:flex;justify-content:center;"},p),g=be({title:"System",variant:"soft",padding:"lg",footer:f,expandable:true,defaultExpanded:n,onExpandChange:o},r("Surface",s),r("Platform",c),r("Browser",u),r("OS",l),r("Host",i),r("Iframe",a)),b=()=>{document.hidden||d();};return document.addEventListener("visibilitychange",b),d(),this.addCleanup(()=>document.removeEventListener("visibilitychange",b)),g}}function on(e={}){const{id:t,checked:n=false,disabled:o=false,size:r="md",label:i,labelSide:a="right",onChange:s}=e,c=h("div",{className:"lg-switch-wrap"}),u=h("button",{className:`lg-switch lg-switch--${r}`,id:t,type:"button",role:"switch","aria-checked":String(!!n),"aria-disabled":String(!!o),title:i??"Basculer"}),l=h("span",{className:"lg-switch-track"}),d=h("span",{className:"lg-switch-thumb"});u.append(l,d);let p=null;i&&a!=="none"&&(p=h("span",{className:"lg-switch-label"},i)),p&&a==="left"?c.append(p,u):p&&a==="right"?c.append(u,p):c.append(u);let f=!!n,g=!!o;function b(){u.classList.toggle("on",f),u.setAttribute("aria-checked",String(f)),u.disabled=g,u.setAttribute("aria-disabled",String(g));}function m(k=false){g||(f=!f,b(),k||s?.(f));}function v(k){k.preventDefault(),m();}function S(k){g||((k.key===" "||k.key==="Enter")&&(k.preventDefault(),m()),k.key==="ArrowLeft"&&(k.preventDefault(),x(false)),k.key==="ArrowRight"&&(k.preventDefault(),x(true)));}u.addEventListener("click",v),u.addEventListener("keydown",S);function y(){return f}function x(k,E=false){f=!!k,b(),E||s?.(f);}function A(k){g=!!k,b();}function w(k){if(!k){p&&(p.remove(),p=null);return}p?p.textContent=k:(p=h("span",{className:"lg-switch-label"},k),c.append(p));}function T(){u.focus();}function I(){u.removeEventListener("click",v),u.removeEventListener("keydown",S);}return b(),{root:c,button:u,isChecked:y,setChecked:x,setDisabled:A,setLabel:w,focus:T,destroy:I}}function $i(e){const{id:t,columns:n,data:o,pageSize:r=0,stickyHeader:i=true,zebra:a=true,animations:s=true,respectReducedMotion:c=true,compact:u=false,maxHeight:l,selectable:d=false,selectionType:p="switch",selectOnRowClick:f=false,initialSelection:g=[],hideHeaderCheckbox:b=false,getRowId:m=(H,K)=>String(K),onSortChange:v,onSelectionChange:S,onRowClick:y}=e;let x=n.slice(),A=o.slice(),w=o.slice(),T=null,I=null,k=1;const E=typeof window<"u"&&typeof window.matchMedia=="function"?window.matchMedia("(prefers-reduced-motion: reduce)").matches:false,M=!!s&&!(c&&E),G=h("div",{className:"lg-table-wrap",id:t});if(l!=null){const H=typeof l=="number"?`${l}px`:l;G.style.setProperty("--tbl-max-h",H);}const Q=h("div",{className:"lg-table"}),P=h("div",{className:"lg-thead"}),D=h("div",{className:"lg-tbody"}),B=h("div",{className:"lg-tfoot"});i&&G.classList.add("sticky"),a&&G.classList.add("zebra"),u&&G.classList.add("compact"),d&&G.classList.add("selectable");const $=p==="switch"?"52px":"36px";G.style.setProperty("--check-w",$);function z(H){return H==="center"?"center":H==="right"?"flex-end":"flex-start"}function j(){const H=x.map(te=>{const ie=(te.width||"1fr").trim();return /\bfr$/.test(ie)?`minmax(0, ${ie})`:ie}),K=(d?[$,...H]:H).join(" ");G.style.setProperty("--lg-cols",K);}j();function F(){return r?Math.max(1,Math.ceil(A.length/r)):1}function _(){if(!r)return A;const H=(k-1)*r;return A.slice(H,H+r)}function L(){if(!T||!I)return;const H=x.find(ie=>String(ie.key)===T),K=I==="asc"?1:-1,te=H?.sortFn?(ie,de)=>K*H.sortFn(ie,de):(ie,de)=>{const J=ie[T],ee=de[T];return J==null&&ee==null?0:J==null?-1*K:ee==null?1*K:typeof J=="number"&&typeof ee=="number"?K*(J-ee):K*String(J).localeCompare(String(ee),void 0,{numeric:true,sensitivity:"base"})};A.sort(te);}const O=new Set(g);function W(){return Array.from(O)}const oe=new Map;function Te(H){O.clear(),H.forEach(K=>O.add(K)),ge(),oe.forEach((K,te)=>{K.setChecked(O.has(te),true);}),Et(),S?.(W());}function ne(){O.clear(),ge(),oe.forEach(H=>H.setChecked(false,true)),Et(),S?.(W());}let ce=null;function ge(){if(!ce)return;const H=_();if(!H.length){ce.indeterminate=false,ce.checked=false;return}const K=H.map((ie,de)=>m(ie,(k-1)*(r||0)+de)),te=K.reduce((ie,de)=>ie+(O.has(de)?1:0),0);ce.checked=te===K.length,ce.indeterminate=te>0&&te<K.length;}function we(){const H=D.offsetWidth-D.clientWidth;P.style.paddingRight=H>0?`${H}px`:"0px";}function pt(){requestAnimationFrame(we);}const je=new ResizeObserver(()=>we()),Io=()=>we();function Cs(){P.replaceChildren();const H=h("div",{className:"lg-tr lg-tr-head"});if(d){const K=h("div",{className:"lg-th lg-th-check"});b||(ce=h("input",{type:"checkbox"}),ce.addEventListener("change",()=>{const te=_(),ie=ce.checked;te.forEach((de,J)=>{const ee=m(de,(k-1)*(r||0)+J);ie?O.add(ee):O.delete(ee);}),S?.(W()),Et();}),K.appendChild(ce)),H.appendChild(K);}x.forEach(K=>{const te=h("button",{className:"lg-th",type:"button",title:K.title||K.header});te.textContent=K.header,K.align&&te.style.setProperty("--col-justify",z(K.align)),K.sortable&&te.classList.add("sortable"),T===String(K.key)&&I?te.setAttribute("data-sort",I):te.removeAttribute("data-sort"),K.sortable&&te.addEventListener("click",()=>{const ie=String(K.key);T!==ie?(T=ie,I="asc"):(I=I==="asc"?"desc":I==="desc"?null:"asc",I||(T=null,A=w.slice())),v?.(T,I),T&&I&&L(),un();}),H.appendChild(te);}),P.appendChild(H);try{je.disconnect();}catch{}je.observe(D),pt();}function nr(H){return Array.from(H.querySelectorAll(":scope > .lg-td, :scope > .lg-td-check"))}function Po(H){return H.querySelector(".lg-td, .lg-td-check")}function Eo(H){const K=Po(H);return K?K.getBoundingClientRect():null}function Et(){const H=_(),K=new Map;Array.from(D.children).forEach(J=>{const ee=J,ke=ee.getAttribute("data-id");if(!ke)return;const Ee=Eo(ee);Ee&&K.set(ke,Ee);});const te=new Map;Array.from(D.children).forEach(J=>{const ee=J,ke=ee.getAttribute("data-id");ke&&te.set(ke,ee);});const ie=[];for(let J=0;J<H.length;J++){const ee=H[J],ke=(r?(k-1)*r:0)+J,Ee=m(ee,ke);ie.push(Ee);let he=te.get(Ee);he||(he=As(ee,ke),M&&nr(he).forEach(Mt=>{Mt.style.transform="translateY(6px)",Mt.style.opacity="0";})),D.appendChild(he);}const de=[];if(te.forEach((J,ee)=>{ie.includes(ee)||de.push(J);}),!M){de.forEach(J=>J.remove()),ge(),pt();return}ie.forEach(J=>{const ee=D.querySelector(`.lg-tr-body[data-id="${J}"]`);if(!ee)return;const ke=Eo(ee),Ee=K.get(J),he=nr(ee);if(Ee&&ke){const Ge=Ee.left-ke.left,ft=Ee.top-ke.top;he.forEach(Ye=>{Ye.style.transition="none",Ye.style.transform=`translate(${Ge}px, ${ft}px)`,Ye.style.opacity="1";}),Po(ee)?.getBoundingClientRect(),he.forEach(Ye=>{Ye.style.willChange="transform, opacity",Ye.style.transition="transform .18s ease, opacity .18s ease";}),requestAnimationFrame(()=>{he.forEach(Ye=>{Ye.style.transform="translate(0,0)";});});}else he.forEach(Ge=>{Ge.style.transition="transform .18s ease, opacity .18s ease";}),requestAnimationFrame(()=>{he.forEach(Ge=>{Ge.style.transform="translate(0,0)",Ge.style.opacity="1";});});const rr=Ge=>{(Ge.propertyName==="transform"||Ge.propertyName==="opacity")&&(he.forEach(ft=>{ft.style.willChange="",ft.style.transition="",ft.style.transform="",ft.style.opacity="";}),Ge.currentTarget.removeEventListener("transitionend",rr));},Mt=he[0];Mt&&Mt.addEventListener("transitionend",rr);}),de.forEach(J=>{const ee=nr(J);ee.forEach(he=>{he.style.willChange="transform, opacity",he.style.transition="transform .18s ease, opacity .18s ease",he.style.opacity="0",he.style.transform="translateY(-6px)";});const ke=he=>{he.propertyName==="opacity"&&(he.currentTarget.removeEventListener("transitionend",ke),J.remove());},Ee=ee[0];Ee?Ee.addEventListener("transitionend",ke):J.remove();}),ge(),pt();}function As(H,K){const te=m(H,K),ie=h("div",{className:"lg-tr lg-tr-body","data-id":te});if(d){const de=h("div",{className:"lg-td lg-td-check"});if(p==="switch"){const J=on({size:"sm",checked:O.has(te),onChange:ee=>{ee?O.add(te):O.delete(te),ge(),S?.(W());}});oe.set(te,J),de.appendChild(J.root);}else {const J=h("input",{type:"checkbox",className:"lg-row-check"});J.checked=O.has(te),J.addEventListener("change",ee=>{ee.stopPropagation(),J.checked?O.add(te):O.delete(te),ge(),S?.(W());}),J.addEventListener("click",ee=>ee.stopPropagation()),de.appendChild(J);}ie.appendChild(de);}return x.forEach(de=>{const J=h("div",{className:"lg-td"});de.align&&J.style.setProperty("--col-justify",z(de.align));let ee=de.render?de.render(H,K):String(H[de.key]??"");typeof ee=="string"?J.textContent=ee:J.appendChild(ee),ie.appendChild(J);}),(y||d&&f)&&(ie.classList.add("clickable"),ie.addEventListener("click",de=>{if(!de.target.closest(".lg-td-check")){if(d&&f){const J=!O.has(te);if(J?O.add(te):O.delete(te),ge(),p==="switch"){const ee=oe.get(te);ee&&ee.setChecked(J,true);}else {const ee=ie.querySelector(".lg-row-check");ee&&(ee.checked=J);}S?.(W());}y?.(H,K,de);}})),ie}function Mo(){if(B.replaceChildren(),!r)return;const H=F(),K=h("div",{className:"lg-pager"}),te=h("button",{className:"btn",type:"button"},"←"),ie=h("button",{className:"btn",type:"button"},"→"),de=h("span",{className:"lg-pager-info"},`${k} / ${H}`);te.disabled=k<=1,ie.disabled=k>=H,te.addEventListener("click",()=>dn(k-1)),ie.addEventListener("click",()=>dn(k+1)),K.append(te,de,ie),B.appendChild(K);}function dn(H){const K=F();k=Math.min(Math.max(1,H),K),Et(),Mo();}function un(){j(),Cs(),Et(),Mo();}function Ts(H){w=H.slice(),A=H.slice(),T&&I&&L(),dn(1);}function Is(H){x=H.slice(),un();}function Ps(H,K="asc"){T=H,I=H?K:null,T&&I?L():A=w.slice(),un();}function Es(){try{je.disconnect();}catch{}window.removeEventListener("resize",Io);}return Q.append(P,D,B),G.appendChild(Q),window.addEventListener("resize",Io),un(),{root:G,setData:Ts,setColumns:Is,sortBy:Ps,getSelection:W,setSelection:Te,clearSelection:ne,setPage:dn,getState:()=>({page:k,pageCount:F(),sortKey:T,sortDir:I}),destroy:Es}}let jn=false;const Dt=new Set;function Tl(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}const _e=e=>{const t=Tl();if(t){for(const n of Dt)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function Il(){jn||(jn=true,window.addEventListener("keydown",_e,true),window.addEventListener("keypress",_e,true),window.addEventListener("keyup",_e,true),document.addEventListener("keydown",_e,true),document.addEventListener("keypress",_e,true),document.addEventListener("keyup",_e,true));}function Pl(){jn&&(jn=false,window.removeEventListener("keydown",_e,true),window.removeEventListener("keypress",_e,true),window.removeEventListener("keyup",_e,true),document.removeEventListener("keydown",_e,true),document.removeEventListener("keypress",_e,true),document.removeEventListener("keyup",_e,true));}function El(e){return Dt.size===0&&Il(),Dt.add(e),()=>{Dt.delete(e),Dt.size===0&&Pl();}}function hn(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function Ml(){const e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.display="none",t.style.flexShrink="0";const n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");const o=document.createElementNS(e,"animate");o.setAttribute("attributeName","stroke-dasharray"),o.setAttribute("values","1,150;90,150;90,150"),o.setAttribute("dur","1.5s"),o.setAttribute("repeatCount","indefinite");const r=document.createElementNS(e,"animateTransform");return r.setAttribute("attributeName","transform"),r.setAttribute("attributeType","XML"),r.setAttribute("type","rotate"),r.setAttribute("from","0 12 12"),r.setAttribute("to","360 12 12"),r.setAttribute("dur","1s"),r.setAttribute("repeatCount","indefinite"),n.append(o,r),t.appendChild(n),t}function Di(e={}){const{id:t,placeholder:n="Rechercher…",value:o="",size:r="md",disabled:i=false,autoFocus:a=false,onChange:s,onSearch:c,autoSearch:u=false,debounceMs:l=0,focusKey:d="/",iconLeft:p,iconRight:f,withClear:g=true,clearTitle:b="Effacer",ariaLabel:m,submitLabel:v,loading:S=false,blockGameKeys:y=true}=e,x=h("div",{className:"search"+(r?` search--${r}`:""),id:t}),A=h("span",{className:"search-ico search-ico--left"});if(p){const ne=hn(p);ne&&A.appendChild(ne);}else A.textContent="🔎",A.style.opacity=".9";const w=h("input",{className:"input search-input",type:"text",placeholder:n,value:o,"aria-label":m||n}),T=h("span",{className:"search-ico search-ico--right"});if(f){const ne=hn(f);ne&&T.appendChild(ne);}const I=Ml();I.classList.add("search-spinner");const k=g?h("button",{className:"search-clear",type:"button",title:b},"×"):null,E=v!=null?h("button",{className:"btn search-submit",type:"button"},v):null,M=h("div",{className:"search-field"},A,w,T,I,...k?[k]:[]);x.append(M,...E?[E]:[]);let G=!!i,Q=null;function P(ne){I.style.display=ne?"inline-block":"none",x.classList.toggle("is-loading",ne);}function D(){Q!=null&&(window.clearTimeout(Q),Q=null);}function B(ne){D(),l>0?Q=window.setTimeout(()=>{Q=null,ne();},l):ne();}function $(){s?.(w.value),u&&c&&c(w.value);}w.addEventListener("input",()=>{B($);}),w.addEventListener("keydown",ne=>{ne.key==="Enter"?(ne.preventDefault(),D(),c?.(w.value)):ne.key==="Escape"&&(w.value.length>0?F("",{notify:true}):w.blur());}),k&&k.addEventListener("click",()=>F("",{notify:true})),E&&E.addEventListener("click",()=>c?.(w.value));let z=()=>{};if(y&&(z=El(w)),d){const ne=ce=>{if(ce.key===d&&!ce.ctrlKey&&!ce.metaKey&&!ce.altKey){const ge=document.activeElement;ge&&(ge.tagName==="INPUT"||ge.tagName==="TEXTAREA"||ge.isContentEditable)||(ce.preventDefault(),w.focus());}};window.addEventListener("keydown",ne,true),x.__cleanup=()=>{window.removeEventListener("keydown",ne,true),z();};}else x.__cleanup=()=>{z();};function j(ne){G=!!ne,w.disabled=G,k&&(k.disabled=G),E&&(E.disabled=G),x.classList.toggle("disabled",G);}function F(ne,ce={}){const ge=w.value;w.value=ne??"",ce.notify&&ge!==ne&&B($);}function _(){return w.value}function L(){w.focus();}function O(){w.blur();}function W(ne){w.placeholder=ne;}function oe(ne){F("",ne);}return j(G),P(S),a&&L(),{root:x,input:w,getValue:_,setValue:F,focus:L,blur:O,setDisabled:j,setPlaceholder:W,clear:oe,setLoading:P,setIconLeft(ne){A.replaceChildren();const ce=hn(ne??"🔎");ce&&A.appendChild(ce);},setIconRight(ne){T.replaceChildren();const ce=hn(ne??"");ce&&T.appendChild(ce);}}}function Ll(e){const t=String(e??"").trim().toLowerCase();return t?t==="common"?"Common":t==="uncommon"?"Uncommon":t==="rare"?"Rare":t==="legendary"?"Legendary":t==="mythical"?"Mythical":t==="divine"?"Divine":t==="celestial"?"Celestial":t==="unknown"||t==="unknow"?"Unknown":null:null}function Rl(e){return e.toLowerCase()}function Zr(e={}){const{id:t,label:n="",type:o="neutral",tone:r="soft",border:i,withBorder:a,pill:s=true,size:c="md",onClick:u,variant:l="default",rarity:d=null}=e,p=h("span",{className:"badge",id:t});s&&p.classList.add("badge--pill"),c==="sm"?p.classList.add("badge--sm"):c==="lg"?p.classList.add("badge--lg"):p.classList.add("badge--md"),u&&p.addEventListener("click",u);let f=false,g=a;function b(){f||(g===false?p.style.border="none":p.style.border="");}function m(w,T=r){p.classList.remove("badge--neutral","badge--info","badge--success","badge--warning","badge--danger","badge--soft","badge--outline","badge--solid"),p.classList.add(`badge--${w}`,`badge--${T}`),b();}function v(w){const T=(w??"").trim();T?(p.style.border=T,f=true):(f=false,b());}function S(w){g=w,b();}function y(w){p.textContent=w;}function x(w,T=r){m(w,T);}function A(w){p.classList.remove("badge--rarity","badge--rarity-common","badge--rarity-uncommon","badge--rarity-rare","badge--rarity-legendary","badge--rarity-mythical","badge--rarity-divine","badge--rarity-celestial","badge--rarity-unknown"),p.style.background="",p.style.backgroundSize="",p.style.animation="",p.style.color="",p.style.webkitTextStroke="";const T=Ll(w);if(!T){p.textContent=String(w??"—");return}p.textContent=T,p.classList.add("badge--rarity",`badge--rarity-${Rl(T)}`);}return l==="rarity"?A(d):(p.textContent=n,m(o,r),typeof a=="boolean"&&S(a),i&&v(i)),{root:p,setLabel:y,setType:x,setBorder:v,setWithBorder:S,setRarity:A}}const Ct=e=>new Promise(t=>setTimeout(t,e)),De=e=>{try{return e()}catch{return}},Be=(e,t,n)=>Math.max(t,Math.min(n,e)),_l=e=>Be(e,0,1);async function _o(e,t,n){const o=performance.now();for(;performance.now()-o<t;){const r=await Promise.race([e,Ct(50).then(()=>null)]);if(r!==null)return r}throw new Error(`${n} timeout`)}const Oo=Function.prototype.bind,ae={_bindPatched:false,engine:null,tos:null,app:null,renderer:null,ticker:null,stage:null};let zi,Fi,ji;const Ol=new Promise(e=>{zi=e;}),Nl=new Promise(e=>{Fi=e;}),$l=new Promise(e=>{ji=e;});function Dl(e){return !!(e&&typeof e=="object"&&typeof e.start=="function"&&typeof e.destroy=="function"&&e.app&&e.app.stage&&e.app.renderer&&e.systems&&typeof e.systems.values=="function")}function zl(e){try{for(const t of e.systems.values()){const n=t?.system;if(n?.name==="tileObject")return n}}catch{}return null}function Fl(e){ae.engine=e,ae.tos=zl(e)||null,ae.app=e.app||null,ae.renderer=e.app?.renderer||null,ae.ticker=e.app?.ticker||null,ae.stage=e.app?.stage||null;try{zi(e);}catch{}try{ae.app&&Fi(ae.app);}catch{}try{ae.renderer&&ji(ae.renderer);}catch{}}function eo(){return ae.engine?true:(ae._bindPatched||(ae._bindPatched=true,Function.prototype.bind=function(e,...t){const n=Oo.call(this,e,...t);try{!ae.engine&&Dl(e)&&(Function.prototype.bind=Oo,ae._bindPatched=!1,Fl(e));}catch{}return n}),false)}eo();async function jl(e=15e3){const t=performance.now();for(;performance.now()-t<e;){if(ae.engine)return  true;eo(),await Ct(50);}throw new Error("MGPixiHooks: engine capture timeout")}async function Gl(e=15e3){return ae.engine||await jl(e),true}function Bl(){return ae.engine&&ae.app?{ok:true,engine:ae.engine,tos:ae.tos,app:ae.app}:(eo(),{ok:false,engine:ae.engine,tos:ae.tos,app:ae.app,note:"Not captured. Wait for room, or reload."})}const Ne={engineReady:Ol,appReady:Nl,rendererReady:$l,engine:()=>ae.engine,tos:()=>ae.tos,app:()=>ae.app,renderer:()=>ae.renderer,ticker:()=>ae.ticker,stage:()=>ae.stage,PIXI:()=>N.PIXI||null,init:Gl,hook:Bl,ready:()=>!!ae.engine},Wl=N?.location?.origin||"https://magicgarden.gg";function Gi(){return typeof GM_xmlhttpRequest=="function"}function Bi(e,t="text"){return new Promise((n,o)=>{GM_xmlhttpRequest({method:"GET",url:e,responseType:t,onload:r=>r.status>=200&&r.status<300?n(r):o(new Error(`HTTP ${r.status} for ${e}`)),onerror:()=>o(new Error(`Network error for ${e}`)),ontimeout:()=>o(new Error(`Timeout for ${e}`))});})}async function to(e){if(Gi())return JSON.parse((await Bi(e,"text")).responseText);const t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.json()}async function Wi(e){if(Gi())return (await Bi(e,"blob")).response;const t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.blob()}function Hl(e){return new Promise((t,n)=>{const o=URL.createObjectURL(e),r=N?.Image||Image,i=new r;i.decoding="async",i.onload=()=>{URL.revokeObjectURL(o),t(i);},i.onerror=()=>{URL.revokeObjectURL(o),n(new Error("Image decode failed"));},i.src=o;})}const Ue=(e,t)=>e.replace(/\/?$/,"/")+String(t||"").replace(/^\//,""),Vl=e=>e.lastIndexOf("/")>=0?e.slice(0,e.lastIndexOf("/")+1):"",No=(e,t)=>String(t||"").startsWith("/")?String(t).slice(1):Vl(e)+String(t||"");let Yt=null;function Ul(){return N?.document??(typeof document<"u"?document:null)}function no(e){if(Yt!==null)return;const t=e??Ul();if(!t)return;const n=t.scripts;for(let o=0;o<n.length;o++){const i=n.item(o)?.src;if(!i)continue;const a=i.match(/\/(?:r\/\d+\/)?version\/([^/]+)/);if(a?.[1]){Yt=a[1];return}}}function Kl(){return no(),Yt}async function ql(e=15e3){const t=performance.now();for(;performance.now()-t<e;){if(no(),Yt)return Yt;await Ct(50);}throw new Error("MGVersion timeout (gameVersion not found)")}const Hi={init:no,get:Kl,wait:ql};let bn=null,yn=null;async function Vi(){return yn||bn||(bn=(async()=>{const e=await Hi.wait(15e3);return yn=`${Wl}/version/${e}/assets/`,yn})(),bn)}async function Yl(e){const t=await Vi();return Ue(t,e)}const At={base:Vi,url:Yl};function Gn(e){const t=String(e||"").trim();return t?t.startsWith("sprite/")||t.startsWith("sprites/")?t:t.includes("/")?`sprite/${t}`:t:""}function an(e,t){const n=String(e||"").trim().replace(/^sprites?\//,"").replace(/^\/+|\/+$/g,""),o=String(t||"").trim();return o.includes("/")||!n?Gn(o):`sprite/${n}/${o}`}function Xt(e,t,n,o){const r=an(e,t);if(n.has(r)||o.has(r))return r;const i=String(t||"").trim();if(n.has(i)||o.has(i))return i;const a=Gn(i);return n.has(a)||o.has(a)?a:r}function Xl(e,t,n=25e3){const o=[e],r=new Set;let i=0;for(;o.length&&i++<n;){const a=o.pop();if(!a||r.has(a))continue;if(r.add(a),t(a))return a;const s=a.children;if(Array.isArray(s))for(let c=s.length-1;c>=0;c--)o.push(s[c]);}return null}function Jl(e){const t=N.PIXI;if(t?.Texture&&t?.Sprite&&t?.Container&&t?.Rectangle)return {Container:t.Container,Sprite:t.Sprite,Texture:t.Texture,Rectangle:t.Rectangle,AnimatedSprite:t.AnimatedSprite||null};const n=e?.stage,o=Xl(n,r=>r?.texture?.frame&&r?.constructor&&r?.texture?.constructor&&r?.texture?.frame?.constructor);if(!o)throw new Error("No Sprite found yet (constructors).");return {Container:n.constructor,Sprite:o.constructor,Texture:o.texture.constructor,Rectangle:o.texture.frame.constructor,AnimatedSprite:t?.AnimatedSprite||null}}async function Ql(e,t=15e3){const n=performance.now();for(;performance.now()-n<t;)try{return Jl(e)}catch{await Ct(50);}throw new Error("Constructors timeout")}const et=(...e)=>{try{console.log("[MGSprite]",...e);}catch{}},or=new Map;async function Zl(e){const t=e||await At.base();if(or.has(t))return or.get(t);const n=to(Ue(t,"manifest.json"));return or.set(t,n),n}function ec(e,t){return e?.bundles?.find(n=>n?.name===t)||null}function tc(e){const t=new Set;for(const n of e?.assets||[])for(const o of n?.src||[])typeof o=="string"&&o.endsWith(".json")&&o!=="manifest.json"&&t.add(o);return Array.from(t)}const Xe={load:Zl,getBundle:ec,listJsonFromBundle:tc};function nc(e){return e&&typeof e=="object"&&e.frames&&e.meta&&typeof e.meta.image=="string"}function ir(e,t,n,o,r){return new e(t,n,o,r)}function rc(e,t,n,o,r,i,a){let s;try{s=new e({source:t.source,frame:n,orig:o,trim:r||void 0,rotate:i||0});}catch{s=new e(t.baseTexture||t,n,o,r||void 0,i||0);}if(a)if(s.defaultAnchor?.set)try{s.defaultAnchor.set(a.x,a.y);}catch{}else s.defaultAnchor?(s.defaultAnchor.x=a.x,s.defaultAnchor.y=a.y):s.defaultAnchor={x:a.x,y:a.y};try{s.updateUvs?.();}catch{}return s}function oc(e,t,n,o){const{Texture:r,Rectangle:i}=o;for(const[a,s]of Object.entries(e.frames)){const c=s.frame,u=!!s.rotated,l=u?2:0,d=u?c.h:c.w,p=u?c.w:c.h,f=ir(i,c.x,c.y,d,p),g=s.sourceSize||{w:c.w,h:c.h},b=ir(i,0,0,g.w,g.h);let m=null;if(s.trimmed&&s.spriteSourceSize){const v=s.spriteSourceSize;m=ir(i,v.x,v.y,v.w,v.h);}n.set(a,rc(r,t,f,b,m,l,s.anchor||null));}}function ic(e,t,n){if(!(!e.animations||typeof e.animations!="object"))for(const[o,r]of Object.entries(e.animations)){if(!Array.isArray(r))continue;const i=r.map(a=>t.get(a)).filter(Boolean);i.length>=2&&n.set(o,i);}}function ac(e,t){const n=(o,r)=>{const i=String(o||"").trim(),a=String(r||"").trim();!i||!a||(t.has(i)||t.set(i,new Set),t.get(i).add(a));};for(const o of Object.keys(e.frames||{})){const r=/^sprite\/([^/]+)\/(.+)$/.exec(o);r&&n(r[1],r[2]);}}async function sc(e,t){const n=await Xe.load(e),o=Xe.getBundle(n,"default");if(!o)throw new Error("No default bundle in manifest");const r=Xe.listJsonFromBundle(o),i=new Set,a=new Map,s=new Map,c=new Map;async function u(l){if(i.has(l))return;i.add(l);const d=await to(Ue(e,l));if(!nc(d))return;const p=d.meta?.related_multi_packs;if(Array.isArray(p))for(const m of p)await u(No(l,m));const f=No(l,d.meta.image),g=await Hl(await Wi(Ue(e,f))),b=t.Texture.from(g);oc(d,b,a,t),ic(d,a,s),ac(d,c);}for(const l of r)await u(l);return {textures:a,animations:s,categoryIndex:c}}const lc={enabled:true,maxEntries:1200,maxCost:5e3,srcCanvasMax:450};function cc(){return {lru:new Map,cost:0,srcCanvas:new Map}}function Ui(e,t){return `${t.sig}::${e}`}function Ki(e){return e?e.isAnim?e.frames?.length||0:e.tex?1:0:0}function dc(e,t,n){e.lru.delete(t),e.lru.set(t,n);}function uc(e,t){if(t.enabled)for(;e.lru.size>t.maxEntries||e.cost>t.maxCost;){const n=e.lru.keys().next().value;if(n===void 0)break;const o=e.lru.get(n);e.lru.delete(n),e.cost=Math.max(0,e.cost-Ki(o??null));}}function qi(e,t){const n=e.lru.get(t);return n?(dc(e,t,n),n):null}function Yi(e,t,n,o){e.lru.set(t,n),e.cost+=Ki(n),uc(e,o);}function pc(e){e.lru.clear(),e.cost=0,e.srcCanvas.clear();}function fc(e,t){return e.srcCanvas.get(t)??null}function gc(e,t,n,o){if(e.srcCanvas.set(t,n),e.srcCanvas.size>o.srcCanvasMax){const r=e.srcCanvas.keys().next().value;r!==void 0&&e.srcCanvas.delete(r);}}const wt={Gold:{overlayTall:null,tallIconOverride:null},Rainbow:{overlayTall:null,tallIconOverride:null,angle:130,angleTall:0},Wet:{overlayTall:"sprite/mutation-overlay/WetTallPlant",tallIconOverride:"sprite/mutation/Puddle"},Chilled:{overlayTall:"sprite/mutation-overlay/ChilledTallPlant",tallIconOverride:null},Frozen:{overlayTall:"sprite/mutation-overlay/FrozenTallPlant",tallIconOverride:null},Dawnlit:{overlayTall:null,tallIconOverride:null},Ambershine:{overlayTall:null,tallIconOverride:null},Dawncharged:{overlayTall:null,tallIconOverride:null},Ambercharged:{overlayTall:null,tallIconOverride:null}},Xi=Object.keys(wt),mc=["Gold","Rainbow","Wet","Chilled","Frozen","Ambershine","Dawnlit","Dawncharged","Ambercharged"],$o=new Map(mc.map((e,t)=>[e,t]));function Bn(e){return [...new Set(e.filter(Boolean))].sort((n,o)=>($o.get(n)??1/0)-($o.get(o)??1/0))}const hc=["Wet","Chilled","Frozen"],bc=new Set(["Dawnlit","Ambershine","Dawncharged","Ambercharged"]),yc={Banana:.6,Carrot:.6,Sunflower:.5,Starweaver:.5,FavaBean:.25,BurrosTail:.2},vc={Pepper:.5,Banana:.6},xc=256,wc=.5,Sc=2;function Ji(e){if(!e.length)return {muts:[],overlayMuts:[],selectedMuts:[],sig:""};const t=Bn(e),n=kc(e),o=Cc(e);return {muts:n,overlayMuts:o,selectedMuts:t,sig:`${t.join(",")}|${n.join(",")}|${o.join(",")}`}}function kc(e){const t=e.filter((r,i,a)=>wt[r]&&a.indexOf(r)===i);if(!t.length)return [];if(t.includes("Gold"))return ["Gold"];if(t.includes("Rainbow"))return ["Rainbow"];const n=["Ambershine","Dawnlit","Dawncharged","Ambercharged"];return t.some(r=>n.includes(r))?Bn(t.filter(r=>!hc.includes(r))):Bn(t)}function Cc(e){const t=e.filter((n,o,r)=>wt[n]?.overlayTall&&r.indexOf(n)===o);return Bn(t)}function ar(e,t){return e.map(n=>({name:n,meta:wt[n],overlayTall:wt[n]?.overlayTall??null,isTall:t}))}const Ac={Gold:{op:"source-atop",colors:["rgb(235,200,0)"],a:.7},Rainbow:{op:"color",colors:["#FF1744","#FF9100","#FFEA00","#00E676","#2979FF","#D500F9"],ang:130,angTall:0,masked:true},Wet:{op:"source-atop",colors:["rgb(50,180,200)"],a:.25},Chilled:{op:"source-atop",colors:["rgb(100,160,210)"],a:.45},Frozen:{op:"source-atop",colors:["rgb(100,130,220)"],a:.5},Dawnlit:{op:"source-atop",colors:["rgb(209,70,231)"],a:.5},Ambershine:{op:"source-atop",colors:["rgb(190,100,40)"],a:.5},Dawncharged:{op:"source-atop",colors:["rgb(140,80,200)"],a:.5},Ambercharged:{op:"source-atop",colors:["rgb(170,60,25)"],a:.5}},vn=(()=>{try{const t=document.createElement("canvas").getContext("2d");if(!t)return new Set;const n=["color","hue","saturation","luminosity","overlay","screen","lighter","source-atop"],o=new Set;for(const r of n)t.globalCompositeOperation=r,t.globalCompositeOperation===r&&o.add(r);return o}catch{return new Set}})();function Tc(e){return vn.has(e)?e:vn.has("overlay")?"overlay":vn.has("screen")?"screen":vn.has("lighter")?"lighter":"source-atop"}function Ic(e,t,n,o,r=false){const i=(o-90)*Math.PI/180,a=t/2,s=n/2;if(!r){const d=Math.min(t,n)/2;return e.createLinearGradient(a-Math.cos(i)*d,s-Math.sin(i)*d,a+Math.cos(i)*d,s+Math.sin(i)*d)}const c=Math.cos(i),u=Math.sin(i),l=Math.abs(c)*t/2+Math.abs(u)*n/2;return e.createLinearGradient(a-c*l,s-u*l,a+c*l,s+u*l)}function Do(e,t,n,o,r=false){const i=o.colors?.length?o.colors:["#fff"],a=o.ang!=null?Ic(e,t,n,o.ang,r):e.createLinearGradient(0,0,0,n);i.length===1?(a.addColorStop(0,i[0]),a.addColorStop(1,i[0])):i.forEach((s,c)=>a.addColorStop(c/(i.length-1),s)),e.fillStyle=a,e.fillRect(0,0,t,n);}function Pc(e,t,n,o){const r=Ac[n];if(!r)return;const i={...r};n==="Rainbow"&&o&&i.angTall!=null&&(i.ang=i.angTall);const a=n==="Rainbow"&&o,s=t.width,c=t.height;e.save();const u=i.masked?Tc(i.op):"source-in";if(e.globalCompositeOperation=u,i.a!=null&&(e.globalAlpha=i.a),i.masked){const l=document.createElement("canvas");l.width=s,l.height=c;const d=l.getContext("2d");d.imageSmoothingEnabled=false,Do(d,s,c,i,a),d.globalCompositeOperation="destination-in",d.drawImage(t,0,0),e.drawImage(l,0,0);}else Do(e,s,c,i,a);e.restore();}function Ec(e){return /tallplant/i.test(e)}function ro(e){const t=String(e||"").split("/");return t[t.length-1]||""}function Qi(e){switch(e){case "Ambershine":return ["Ambershine","Amberlit"];case "Dawncharged":return ["Dawncharged","Dawnbound"];case "Ambercharged":return ["Ambercharged","Amberbound"];default:return [e]}}function Mc(e,t){const n=String(e||"").toLowerCase();for(const o of t.keys()){const r=/sprite\/mutation-overlay\/([A-Za-z0-9]+)TallPlant/i.exec(String(o));if(!r||!r[1])continue;if(r[1].toLowerCase()===n){const a=t.get(o);if(a)return {tex:a,key:o}}}return null}function Lc(e,t,n,o){if(!t)return null;const r=ro(e),i=Qi(t);for(const a of i){const s=[`sprite/mutation/${a}${r}`,`sprite/mutation/${a}-${r}`,`sprite/mutation/${a}_${r}`,`sprite/mutation/${a}/${r}`,`sprite/mutation/${a}`];for(const c of s){const u=n.get(c);if(u)return {tex:u,key:c}}{const c=`sprite/mutation-overlay/${a}TallPlant`,u=n.get(c);if(u)return {tex:u,key:c};const l=`sprite/mutation-overlay/${a}`,d=n.get(l);if(d)return {tex:d,key:l};const p=Mc(t,n);if(p)return p}}return null}function Rc(e,t,n,o){if(!t)return null;const r=wt[t];if(n&&r?.tallIconOverride){const s=o.get(r.tallIconOverride);if(s)return s}const i=ro(e),a=Qi(t);for(const s of a){const c=[`sprite/mutation/${s}Icon`,`sprite/mutation/${s}`,`sprite/mutation/${s}${i}`,`sprite/mutation/${s}-${i}`,`sprite/mutation/${s}_${i}`,`sprite/mutation/${s}/${i}`];for(const u of c){const l=o.get(u);if(l)return l}if(n){const u=`sprite/mutation-overlay/${s}TallPlantIcon`,l=o.get(u);if(l)return l;const d=`sprite/mutation-overlay/${s}TallPlant`,p=o.get(d);if(p)return p}}return null}function _c(e,t,n){const o=e?.orig?.width??e?.frame?.width??e?.width??1,r=e?.orig?.height??e?.frame?.height??e?.height??1,i=e?.defaultAnchor?.x??0,a=e?.defaultAnchor?.y??0;let s=vc[t]??i;const c=r>o*1.5;let u=yc[t]??(c?a:.4);const l={x:(s-i)*o,y:(u-a)*r},d=Math.min(o,r),p=Math.min(1.5,d/xc);let f=wc*p;return n&&(f*=Sc),{width:o,height:r,anchorX:i,anchorY:a,offset:l,iconScale:f}}function qn(e,t,n,o,r){const i=fc(o,e);if(i)return i;let a=null;const s=t?.resolution??1;try{if(t?.extract?.canvas){const c=new n.Sprite(e),u=t.extract.canvas(c);if(c.destroy?.({children:!0,texture:!1,baseTexture:!1}),s>1&&u){const l=Math.round(u.width/s),d=Math.round(u.height/s);a=document.createElement("canvas"),a.width=l,a.height=d;const p=a.getContext("2d");p&&(p.imageSmoothingEnabled=!1,p.drawImage(u,0,0,l,d));}else a=u;}}catch{}if(!a){const c=e?.frame||e?._frame,u=e?.orig||e?._orig,l=e?.trim||e?._trim,d=e?.rotate||e?._rotate||0,p=e?.baseTexture?.resource?.source||e?.baseTexture?.resource||e?.source?.resource?.source||e?.source?.resource||e?._source?.resource?.source||null;if(!c||!p)throw new Error("textureToCanvas fail");a=document.createElement("canvas");const f=Math.max(1,(u?.width??c.width)|0),g=Math.max(1,(u?.height??c.height)|0),b=l?.x??0,m=l?.y??0;a.width=f,a.height=g;const v=a.getContext("2d");v.imageSmoothingEnabled=false,d===true||d===2||d===8?(v.save(),v.translate(b+c.height/2,m+c.width/2),v.rotate(-Math.PI/2),v.drawImage(p,c.x,c.y,c.width,c.height,-c.width/2,-c.height/2,c.width,c.height),v.restore()):v.drawImage(p,c.x,c.y,c.width,c.height,b,m,c.width,c.height);}return gc(o,e,a,r),a}function Oc(e,t,n,o,r,i,a,s){const{w:c,h:u,aX:l,aY:d,basePos:p}=t,f=[];for(const g of n){const b=new o.Sprite(e);b.anchor?.set?.(l,d),b.position.set(p.x,p.y),b.zIndex=1;const m=document.createElement("canvas");m.width=c,m.height=u;const v=m.getContext("2d");v.imageSmoothingEnabled=false,v.save(),v.translate(c*l,u*d),v.drawImage(qn(e,r,o,i,a),-c*l,-u*d),v.restore(),Pc(v,m,g.name,g.isTall);const S=o.Texture.from(m,{resolution:e.resolution??1});s.push(S),b.texture=S,f.push(b);}return f}function Nc(e,t,n,o,r,i,a,s,c,u){const{aX:l,basePos:d}=t,p=[];for(const f of n){const g=f.overlayTall&&o.get(f.overlayTall)&&{tex:o.get(f.overlayTall),key:f.overlayTall}||Lc(e,f.name,o);if(!g?.tex)continue;const b=qn(g.tex,i,r,a,s);if(!b)continue;const m=b.width,v={x:0,y:0},S={x:d.x-l*m,y:0},y=document.createElement("canvas");y.width=m,y.height=b.height;const x=y.getContext("2d");if(!x)continue;x.imageSmoothingEnabled=false,x.drawImage(b,0,0),x.globalCompositeOperation="destination-in",x.drawImage(c,-S.x,-0);const A=r.Texture.from(y,{resolution:g.tex.resolution??1});u.push(A);const w=new r.Sprite(A);w.anchor?.set?.(v.x,v.y),w.position.set(S.x,S.y),w.scale.set(1),w.alpha=1,w.zIndex=3,p.push(w);}return p}function $c(e,t,n,o,r,i){const{basePos:a}=t,s=[];for(const c of n){if(c.name==="Gold"||c.name==="Rainbow")continue;const u=Rc(e,c.name,c.isTall,o);if(!u)continue;const l=new r.Sprite(u),d=u?.defaultAnchor?.x??.5,p=u?.defaultAnchor?.y??.5;l.anchor?.set?.(d,p),l.position.set(a.x+i.offset.x,a.y+i.offset.y),l.scale.set(i.iconScale),c.isTall&&(l.zIndex=-1),bc.has(c.name)&&(l.zIndex=10),l.zIndex||(l.zIndex=2),s.push(l);}return s}function Zi(e,t,n,o){try{if(!e||!o.renderer||!o.ctors?.Container||!o.ctors?.Sprite||!o.ctors?.Texture)return null;const{Container:r,Sprite:i,Texture:a}=o.ctors,s=e?.orig?.width??e?.frame?.width??e?.width??1,c=e?.orig?.height??e?.frame?.height??e?.height??1,u=e?.defaultAnchor?.x??.5,l=e?.defaultAnchor?.y??.5,d={x:s*u,y:c*l},p=qn(e,o.renderer,o.ctors,o.cacheState,o.cacheConfig),f=new r;f.sortableChildren=!0;const g=new i(e);g.anchor?.set?.(u,l),g.position.set(d.x,d.y),g.zIndex=0,f.addChild(g);const b=Ec(t),m=ar(n.muts,b),v=ar(n.overlayMuts,b),S=ar(n.selectedMuts,b),y=[],x={w:s,h:c,aX:u,aY:l,basePos:d},A=ro(t),w=_c(e,A,b);Oc(e,x,m,o.ctors,o.renderer,o.cacheState,o.cacheConfig,y).forEach(P=>f.addChild(P)),b&&Nc(t,x,v,o.textures,o.ctors,o.renderer,o.cacheState,o.cacheConfig,p,y).forEach(D=>f.addChild(D)),$c(t,x,S,o.textures,o.ctors,w).forEach(P=>f.addChild(P));let k={x:0,y:0,width:s,height:c};try{const P=f.getLocalBounds?.()||f.getBounds?.(!0);P&&Number.isFinite(P.width)&&Number.isFinite(P.height)&&(k={x:P.x,y:P.y,width:P.width,height:P.height});}catch{}const{Rectangle:E}=o.ctors,M=E?new E(0,0,s,c):void 0;let G=null;if(typeof o.renderer.generateTexture=="function"?G=o.renderer.generateTexture(f,{resolution:1,region:M}):o.renderer.textureGenerator?.generateTexture&&(G=o.renderer.textureGenerator.generateTexture({target:f,resolution:1,region:M})),!G)throw new Error("no render texture");const Q=G instanceof a?G:a.from(o.renderer.extract.canvas(G));try{Q.__mg_base={baseX:-k.x,baseY:-k.y,baseW:s,baseH:c,texW:k.width,texH:k.height};}catch{}G&&G!==Q&&G.destroy?.(!0),f.destroy({children:!0,texture:!1,baseTexture:!1});try{Q.__mg_gen=!0,Q.label=`${t}|${n.sig}`;}catch{}return Q}catch{return null}}function Dc(e,t,n,o){if(!e||e.length<2)return null;const r=[];for(const i of e){const a=Zi(i,t,n,o);a&&r.push(a);}return r.length>=2?r:null}const ea={enabled:true,maxEntries:500};function zc(){return {cache:new Map,maxEntries:ea.maxEntries}}function ta(e,t,n,o,r){const i=t.scale??1,a=t.frameIndex??0,s=t.mutations?.slice().sort().join(",")||"",c=t.anchorX??.5,u=t.anchorY??.5;return `${e}|s${i}|f${a}|m${s}|ax${c}|ay${u}|bm${n}|bp${r}|p${o}`}function Fc(e,t){const n=e.cache.get(t);return n?(n.lastAccess=performance.now(),n.canvas):null}function jc(e,t,n,o){if(t.enabled){if(e.cache.size>=t.maxEntries){let r=null,i=1/0;for(const[a,s]of e.cache)s.lastAccess<i&&(i=s.lastAccess,r=a);r&&e.cache.delete(r);}e.cache.set(n,{canvas:o,lastAccess:performance.now()});}}function zo(e){const t=document.createElement("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");return n&&n.drawImage(e,0,0),t}function Gc(e){e.cache.clear();}function Bc(e){return {size:e.cache.size,maxEntries:e.maxEntries}}function Wc(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0);})}async function Hc(e,t,n,o,r,i,a,s=5,c=0){if(!t.ready||!i.enabled)return 0;const u=e.length;let l=0;a?.(0,u);for(let d=0;d<u;d+=s){const p=e.slice(d,d+s);for(const f of p)try{const g=Xt(null,f,t.textures,t.animations),b={scale:1},m=ra(b),v=oa(m,b),S=aa(m,b.boundsPadding),y=ta(g,b,m,v,S);r.cache.has(y)||Tr(t,n,o,null,f,b,r,i),l++;}catch{l++;}a?.(l,u),d+s<u&&await Wc();}return l}function Vc(e){if(e.overlay)return e.overlay;const t=new e.ctors.Container;t.sortableChildren=true,t.zIndex=99999999;try{e.app.stage.sortableChildren=!0;}catch{}return e.app.stage.addChild(t),e.overlay=t,t}function Uc(e){const t=e.defaultParent;if(!t)return null;try{return typeof t=="function"?t():t}catch{return null}}function oo(e,t,n,o,r,i){if(!n.length)return t;const a=Ji(n);if(!a.sig)return t;const s=Ui(e,a),c=qi(r,s);if(c?.tex)return c.tex;const u=Zi(t,e,a,{renderer:o.renderer,ctors:o.ctors,textures:o.textures,cacheState:r,cacheConfig:i});return u?(Yi(r,s,{isAnim:false,tex:u},i),u):t}function na(e,t,n,o,r,i){if(!n.length)return t;const a=Ji(n);if(!a.sig)return t;const s=Ui(e,a),c=qi(r,s);if(c?.isAnim&&c.frames?.length)return c.frames;const u=Dc(t,e,a,{renderer:o.renderer,ctors:o.ctors,textures:o.textures,cacheState:r,cacheConfig:i});return u?(Yi(r,s,{isAnim:true,frames:u},i),u):t}function Fo(e,t,n,o,r,i={}){if(!e.ready)throw new Error("MGSprite not ready yet");const a=Xt(o,r,e.textures,e.animations),s=i.mutations||[],c=i.parent||Uc(e)||Vc(e),u=e.renderer?.width||e.renderer?.view?.width||innerWidth,l=e.renderer?.height||e.renderer?.view?.height||innerHeight,d=i.center?u/2:i.x??u/2,p=i.center?l/2:i.y??l/2;let f;const g=e.animations.get(a);if(g&&g.length>=2){const v=na(a,g,s,e,t,n),S=e.ctors.AnimatedSprite;if(S)f=new S(v),f.animationSpeed=i.fps?i.fps/60:i.speed??.15,f.loop=i.loop??true,f.play();else {const y=new e.ctors.Sprite(v[0]),A=1e3/Math.max(1,i.fps||8);let w=0,T=0;const I=k=>{const E=e.app.ticker?.deltaMS??k*16.666666666666668;if(w+=E,w<A)return;const M=w/A|0;w%=A,T=(T+M)%v.length,y.texture=v[T];};y.__mgTick=I,e.app.ticker?.add?.(I),f=y;}}else {const v=e.textures.get(a);if(!v)throw new Error(`Unknown sprite/anim key: ${a}`);const S=oo(a,v,s,e,t,n);f=new e.ctors.Sprite(S);}const b=i.anchorX??f.texture?.defaultAnchor?.x??.5,m=i.anchorY??f.texture?.defaultAnchor?.y??.5;return f.anchor?.set?.(b,m),f.position.set(d,p),f.scale.set(i.scale??1),f.alpha=i.alpha??1,f.rotation=i.rotation??0,f.zIndex=i.zIndex??999999,c.addChild(f),e.live.add(f),f.__mgDestroy=()=>{try{f.__mgTick&&e.app.ticker?.remove?.(f.__mgTick);}catch{}try{f.destroy?.({children:!0,texture:!1,baseTexture:!1});}catch{try{f.destroy?.();}catch{}}e.live.delete(f);},f}function Kc(e,t){const n=e.renderer;if(n?.extract?.canvas)return n.extract.canvas(t);if(n?.plugins?.extract?.canvas)return n.plugins.extract.canvas(t);throw new Error("No extract.canvas available on renderer")}const jo=new Map;function ra(e){return e.boundsMode?e.boundsMode:e.mutations&&e.mutations.length>0?"base":"mutations"}function oa(e,t){return e==="mutations"?t.pad??2:t.pad??0}function Lt(e){return Number.isFinite(e)?Math.max(0,e):0}function ia(e){if(typeof e=="number"){const t=Lt(e);return {top:t,right:t,bottom:t,left:t}}return e?{top:Lt(e.top??0),right:Lt(e.right??0),bottom:Lt(e.bottom??0),left:Lt(e.left??0)}:{top:0,right:0,bottom:0,left:0}}function aa(e,t){if(e==="mutations")return "0,0,0,0";if(e==="padded"&&t==null)return "auto";const n=ia(t);return `${n.top},${n.right},${n.bottom},${n.left}`}function sa(e){const t=e?.orig?.width??e?.frame?.width??e?.width??1,n=e?.orig?.height??e?.frame?.height??e?.height??1;return {w:t,h:n}}function la(e,t,n){const o=e?.__mg_base;return o&&Number.isFinite(o.baseX)&&Number.isFinite(o.baseY)&&Number.isFinite(o.baseW)&&Number.isFinite(o.baseH)&&Number.isFinite(o.texW)&&Number.isFinite(o.texH)?o:{baseX:0,baseY:0,baseW:t,baseH:n,texW:t,texH:n}}function qc(e,t,n,o,r,i){const a=`${e}|f${t}`,s=jo.get(a);if(s)return s;const c=sa(n),u={top:0,right:0,bottom:0,left:0};for(const l of Xi){const d=oo(e,n,[l],o,r,i),p=la(d,c.w,c.h),f=Math.max(0,p.baseX),g=Math.max(0,p.baseY),b=Math.max(0,p.texW-p.baseX-p.baseW),m=Math.max(0,p.texH-p.baseY-p.baseH);f>u.left&&(u.left=f),g>u.top&&(u.top=g),b>u.right&&(u.right=b),m>u.bottom&&(u.bottom=m);}return jo.set(a,u),u}function Tr(e,t,n,o,r,i={},a,s){if(!e.ready)throw new Error("MGSprite not ready yet");const c=Xt(o,r,e.textures,e.animations),u=ra(i),l=oa(u,i),d=aa(u,i.boundsPadding),p=a&&s?.enabled?ta(c,i,u,l,d):null;if(p&&a&&s?.enabled){const y=Fc(a,p);if(y)return zo(y)}const f=i.mutations||[],g=e.animations.get(c),b=Math.max(0,(i.frameIndex??0)|0);let m,v;if(g?.length)if(m=g[b%g.length],f.length){const y=na(c,g,f,e,t,n);v=y[b%y.length];}else v=m;else {const y=e.textures.get(c);if(!y)throw new Error(`Unknown sprite/anim key: ${c}`);m=y,v=oo(c,y,f,e,t,n);}let S;if(u==="mutations"){const y=new e.ctors.Sprite(v),x=i.anchorX??y.texture?.defaultAnchor?.x??.5,A=i.anchorY??y.texture?.defaultAnchor?.y??.5;y.anchor?.set?.(x,A),y.scale.set(i.scale??1);const w=new e.ctors.Container;w.addChild(y);try{w.updateTransform?.();}catch{}const T=y.getBounds?.(true)||{x:0,y:0,width:y.width,height:y.height};y.position.set(-T.x+l,-T.y+l),S=Kc(e,w);try{w.destroy?.({children:!0});}catch{}}else {const y=i.scale??1;let x=ia(i.boundsPadding);u==="padded"&&i.boundsPadding==null&&(x=qc(c,b,m,e,t,n)),l&&(x={top:x.top+l,right:x.right+l,bottom:x.bottom+l,left:x.left+l});const A=sa(m),w=la(v,A.w,A.h),T=Math.max(1,Math.ceil((A.w+x.left+x.right)*y)),I=Math.max(1,Math.ceil((A.h+x.top+x.bottom)*y));S=document.createElement("canvas"),S.width=T,S.height=I;const k=S.getContext("2d");if(k){k.imageSmoothingEnabled=false;const E=qn(v,e.renderer,e.ctors,t,n),M=(x.left-w.baseX)*y,G=(x.top-w.baseY)*y;k.drawImage(E,M,G,E.width*y,E.height*y);}}return p&&a&&s?.enabled?(jc(a,s,p,S),zo(S)):S}function Yc(e){for(const t of Array.from(e.live))t.__mgDestroy?.();}function Xc(e,t){return e.defaultParent=t,true}function Jc(e,t){return e.defaultParent=t,true}function Qc(){return {ready:false,app:null,renderer:null,ctors:null,baseUrl:null,textures:new Map,animations:new Map,live:new Set,defaultParent:null,overlay:null,categoryIndex:null}}let xn=null;const xe=Qc(),Zc=cc(),ed={...lc},td=zc(),nd={...ea};function Ce(){return xe}function St(){return Zc}function Jt(){return ed}function Qt(){return td}function Ir(){return nd}function ca(){return xe.ready}async function rd(){return xe.ready?true:xn||(xn=(async()=>{const e=performance.now();et("init start");const t=await _o(Ne.appReady,15e3,"PIXI app");et("app ready");const n=await _o(Ne.rendererReady,15e3,"PIXI renderer");et("renderer ready"),xe.app=t,xe.renderer=n||t?.renderer||null,xe.ctors=await Ql(t),et("constructors resolved"),xe.baseUrl=await At.base(),et("base url",xe.baseUrl);const{textures:o,animations:r,categoryIndex:i}=await sc(xe.baseUrl,xe.ctors);return xe.textures=o,xe.animations=r,xe.categoryIndex=i,et("atlases loaded","textures",xe.textures.size,"animations",xe.animations.size,"categories",xe.categoryIndex?.size??0),xe.ready=true,et("ready in",Math.round(performance.now()-e),"ms"),true})(),xn)}function dt(){if(!ca())throw new Error("MGSprite not ready yet")}function od(e,t,n){return typeof t=="string"?Fo(Ce(),St(),Jt(),e,t,n||{}):Fo(Ce(),St(),Jt(),null,e,t||{})}function id(e,t,n){return typeof t=="string"?Tr(Ce(),St(),Jt(),e,t,n||{},Qt(),Ir()):Tr(Ce(),St(),Jt(),null,e,t||{},Qt(),Ir())}function ad(){Yc(Ce());}function sd(e){return Xc(Ce(),e)}function ld(e){return Jc(Ce(),e)}function cd(e,t){const n=Ce(),o=typeof t=="string"?Xt(e,t,n.textures,n.animations):Xt(null,e,n.textures,n.animations);return n.textures.has(o)||n.animations.has(o)}function dd(){dt();const e=Ce().categoryIndex;return e?Array.from(e.keys()).sort((t,n)=>t.localeCompare(n)):[]}function ud(e){dt();const t=String(e||"").trim();if(!t)return [];const n=Ce().categoryIndex;return n?Array.from(n.get(t)?.values()||[]):[]}function pd(e,t){dt();const n=String(e||"").trim(),o=String(t||"").trim();if(!n||!o)return  false;const r=Ce().categoryIndex;if(!r)return  false;const i=n.toLowerCase(),a=o.toLowerCase();for(const[s,c]of r.entries())if(s.toLowerCase()===i){for(const u of c.values())if(u.toLowerCase()===a)return  true}return  false}function fd(e){dt();const t=Ce().categoryIndex;if(!t)return [];const n=String(e||"").trim().toLowerCase(),o=[];for(const[r,i]of t.entries())for(const a of i.values()){const s=an(r,a);(!n||s.toLowerCase().startsWith(n))&&o.push(s);}return o.sort((r,i)=>r.localeCompare(i))}function gd(e){dt();const t=String(e||"").trim();if(!t)return null;const n=Gn(t),o=/^sprite\/([^/]+)\/(.+)$/.exec(n);if(!o)return null;const r=o[1],i=o[2],a=Ce().categoryIndex,s=r.toLowerCase(),c=i.toLowerCase();let u=r,l=i;if(a){const d=Array.from(a.keys()).find(g=>g.toLowerCase()===s);if(!d)return null;u=d;const p=a.get(d);if(!p)return null;const f=Array.from(p.values()).find(g=>g.toLowerCase()===c);if(!f)return null;l=f;}return {category:u,id:l,key:an(u,l)}}function md(e,t){dt();const n=String(e||"").trim(),o=String(t||"").trim();if(!n||!o)throw new Error("getIdPath(category, id) requires both category and id");const r=Ce().categoryIndex;if(!r)throw new Error("Sprite categories not indexed");const i=n.toLowerCase(),a=o.toLowerCase(),s=Array.from(r.keys()).find(l=>l.toLowerCase()===i)||n,c=r.get(s);if(!c)throw new Error(`Unknown sprite category: ${n}`);const u=Array.from(c.values()).find(l=>l.toLowerCase()===a)||o;if(!c.has(u))throw new Error(`Unknown sprite id: ${n}/${o}`);return an(s,u)}function hd(){pc(St());}function bd(){Gc(Qt());}function yd(){return Bc(Qt())}function vd(){return [...Xi]}async function xd(e,t,n=10,o=0){return dt(),Hc(e,Ce(),St(),Jt(),Qt(),Ir(),t,n,o)}const se={init:rd,ready:ca,show:od,toCanvas:id,clear:ad,attach:sd,attachProvider:ld,has:cd,key:(e,t)=>an(e,t),getCategories:dd,getCategoryId:ud,hasId:pd,listIds:fd,getIdInfo:gd,getIdPath:md,clearMutationCache:hd,clearToCanvasCache:bd,getToCanvasCacheStats:yd,getMutationNames:vd,warmup:xd},Pr=N,Ke=Pr.Object??Object,io=Ke.keys,Wn=Ke.values,Hn=Ke.entries,tt={items:["WateringCan","PlanterPot","Shovel"],decor:["SmallRock","MediumRock","LargeRock","WoodBench","StoneBench","MarbleBench"],mutations:["Gold","Rainbow","Wet","Chilled","Frozen"],eggs:["CommonEgg","UncommonEgg","RareEgg"],pets:["Worm","Snail","Bee","Chicken","Bunny"],abilities:["ProduceScaleBoost","DoubleHarvest","SeedFinderI","CoinFinderI"],plants:["Carrot","Strawberry","Aloe","Blueberry","Apple"]},wd=["Rain","Frost","Dawn","AmberMoon"],Go=/main-[^/]+\.js(\?|$)/,Sd=3,kd=200,Cd=50,Bo=new WeakSet,Z={isReady:false,isHookInstalled:false,data:{items:null,decor:null,mutations:null,eggs:null,pets:null,abilities:null,plants:null,weather:null},spritesResolved:false,spritesResolving:null,weatherPollingTimer:null,weatherPollAttempts:0},nt=(e,t)=>t.every(n=>e.includes(n));function rt(e,t){Z.data[e]==null&&(Z.data[e]=t,Ad()&&pa());}function Ad(){return Object.values(Z.data).every(e=>e!=null)}function da(e,t){if(!e||typeof e!="object"||Bo.has(e))return;Bo.add(e);let n;try{n=io(e);}catch{return}if(!n||n.length===0)return;const o=e;let r;if(!Z.data.items&&nt(n,tt.items)&&(r=o.WateringCan,r&&typeof r=="object"&&"coinPrice"in r&&"creditPrice"in r&&rt("items",o)),!Z.data.decor&&nt(n,tt.decor)&&(r=o.SmallRock,r&&typeof r=="object"&&"coinPrice"in r&&"creditPrice"in r&&rt("decor",o)),!Z.data.mutations&&nt(n,tt.mutations)&&(r=o.Gold,r&&typeof r=="object"&&"baseChance"in r&&"coinMultiplier"in r&&rt("mutations",o)),!Z.data.eggs&&nt(n,tt.eggs)&&(r=o.CommonEgg,r&&typeof r=="object"&&"faunaSpawnWeights"in r&&"secondsToHatch"in r&&rt("eggs",o)),!Z.data.pets&&nt(n,tt.pets)&&(r=o.Worm,r&&typeof r=="object"&&"coinsToFullyReplenishHunger"in r&&"diet"in r&&Array.isArray(r.diet)&&rt("pets",o)),!Z.data.abilities&&nt(n,tt.abilities)&&(r=o.ProduceScaleBoost,r&&typeof r=="object"&&"trigger"in r&&"baseParameters"in r&&rt("abilities",o)),!Z.data.plants&&nt(n,tt.plants)&&(r=o.Carrot,r&&typeof r=="object"&&"seed"in r&&"plant"in r&&"crop"in r&&rt("plants",o)),!(t>=Sd))for(const i of n){let a;try{a=o[i];}catch{continue}a&&typeof a=="object"&&da(a,t+1);}}function sr(e){try{da(e,0);}catch{}}function ua(){if(!Z.isHookInstalled){Z.isHookInstalled=true;try{Ke.keys=function(t){return sr(t),io.apply(this,arguments)},Wn&&(Ke.values=function(t){return sr(t),Wn.apply(this,arguments)}),Hn&&(Ke.entries=function(t){return sr(t),Hn.apply(this,arguments)});}catch{}}}function pa(){if(Z.isHookInstalled){try{Ke.keys=io,Wn&&(Ke.values=Wn),Hn&&(Ke.entries=Hn);}catch{}Z.isHookInstalled=false;}}function Td(){try{for(const e of Pr.document?.scripts||[]){const t=e?.src?String(e.src):"";if(Go.test(t))return t}}catch{}try{for(const e of Pr.performance?.getEntriesByType?.("resource")||[]){const t=e?.name?String(e.name):"";if(Go.test(t))return t}}catch{}return null}function Id(e,t){const n=Math.max(e.lastIndexOf("const ",t),e.lastIndexOf("let ",t),e.lastIndexOf("var ",t));if(n<0)return null;const o=e.indexOf("=",n);if(o<0||o>t)return null;const r=e.indexOf("{",o);if(r<0||r>t)return null;let i=0,a="",s=false;for(let c=r;c<e.length;c++){const u=e[c];if(a){if(s){s=false;continue}if(u==="\\"){s=true;continue}u===a&&(a="");continue}if(u==='"'||u==="'"){a=u;continue}if(u==="{")i++;else if(u==="}"&&--i===0)return e.slice(r,c+1)}return null}function Pd(e){const t={};let n=false;for(const o of wd){const r=e?.[o];if(!r||typeof r!="object")continue;const i=r.iconSpriteKey||null,{iconSpriteKey:a,...s}=r;t[o]={weatherId:o,spriteId:i,...s},n=true;}return t.Sunny||(t.Sunny={weatherId:"Sunny",name:"Sunny",spriteId:"sprite/ui/SunnyIcon",type:"primary"}),!n||t.Rain&&t.Rain.mutator?.mutation!=="Wet"?null:t}async function Ed(){if(Z.data.weather)return  true;const e=Td();if(!e)return  false;let t="";try{const s=await fetch(e,{credentials:"include"});if(!s.ok)return !1;t=await s.text();}catch{return  false}let n=t.indexOf("fixedTimeSlots:[0,48,96,144,192,240]");if(n<0&&(n=t.indexOf('name:"Amber Moon"')),n<0)return  false;const o=Id(t,n);if(!o)return  false;const r=o.replace(/\b[A-Za-z_$][\w$]*\.(Rain|Frost|Dawn|AmberMoon)\b/g,'"$1"');let i;try{i=Function('"use strict";return('+r+")")();}catch{return  false}const a=Pd(i);return a?(Z.data.weather=a,true):false}function Md(){if(Z.weatherPollingTimer)return;Z.weatherPollAttempts=0;const e=setInterval(async()=>{(await Ed()||++Z.weatherPollAttempts>kd)&&(clearInterval(e),Z.weatherPollingTimer=null);},Cd);Z.weatherPollingTimer=e;}function Ld(e){return String(e||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^A-Za-z0-9]/g,"").trim()}function Rd(e,t=[]){const n=new Set,o=r=>{const i=String(r||"").trim();i&&n.add(i);};o(e);for(const r of t)o(r);for(const r of Array.from(n.values()))r.endsWith("s")?o(r.slice(0,-1)):o(`${r}s`),r.endsWith("es")&&o(r.slice(0,-2));return Array.from(n.values()).filter(Boolean)}function fa(e,t,n,o=[],r=[]){const i=Rd(e,o);if(!i.length)return null;const a=[t,...r].filter(l=>typeof l=="string"),s=l=>{const d=String(l||"").trim();if(!d)return null;for(const p of i)try{if(se.has(p,d))return se.getIdPath(p,d)}catch{}return null};for(const l of a){const d=s(l);if(d)return d}const c=Ld(n||""),u=s(c||n||"");if(u)return u;try{for(const l of i){const d=se.listIds(`sprite/${l}/`),p=a.map(g=>String(g||"").toLowerCase()),f=String(n||c||"").toLowerCase();for(const g of d){const m=(g.split("/").pop()||"").toLowerCase();if(p.some(v=>v&&v===m)||m===f)return g}for(const g of d){const m=(g.split("/").pop()||"").toLowerCase();if(p.some(v=>v&&m.includes(v))||f&&m.includes(f))return g}}}catch{}return null}function Me(e,t,n,o,r=[],i=[]){if(!e||typeof e!="object")return;const a=e.tileRef;if(!a||typeof a!="object")return;const s=String(a.spritesheet||t||"").trim(),c=fa(s,n,o,r,i);if(c)try{e.spriteId=c;}catch{}const u=e.rotationVariants;if(u&&typeof u=="object")for(const l of Object.values(u))Me(l,s,n,o);if(e.immatureTileRef){const l={tileRef:e.immatureTileRef};Me(l,s,n,o),l.spriteId&&(e.immatureSpriteId=l.spriteId);}if(e.topmostLayerTileRef){const l={tileRef:e.topmostLayerTileRef};Me(l,s,n,o),l.spriteId&&(e.topmostLayerSpriteId=l.spriteId);}e.activeState&&typeof e.activeState=="object"&&Me(e.activeState,s,n,e.activeState?.name||o);}function _d(e,t,n,o=[]){if(!Array.isArray(t)||t.length===0)return null;const r=t[0],i=t.slice(1);return fa(e,r,n??null,o,i)}function Od(e){for(const[t,n]of Object.entries(e.items||{}))Me(n,"items",t,n?.name,["item"]);for(const[t,n]of Object.entries(e.decor||{}))Me(n,"decor",t,n?.name);for(const[t,n]of Object.entries(e.mutations||{})){Me(n,"mutations",t,n?.name,["mutation"]);const o=_d("mutation-overlay",[`${t}TallPlant`,`${t}TallPlantIcon`,t],n?.name,["mutation-overlay"]);if(o)try{n.overlaySpriteId=o;}catch{}}for(const[t,n]of Object.entries(e.eggs||{}))Me(n,"pets",t,n?.name,["pet"]);for(const[t,n]of Object.entries(e.pets||{}))Me(n,"pets",t,n?.name,["pet"]);for(const[t,n]of Object.entries(e.plants||{})){const o=n;o.seed&&Me(o.seed,o.seed?.tileRef?.spritesheet||"seeds",`${t}Seed`,o.seed?.name||`${t} Seed`,["seed","plant","plants"],[t]),o.plant&&Me(o.plant,o.plant?.tileRef?.spritesheet||"plants",`${t}Plant`,o.plant?.name||`${t} Plant`,["plant","plants","tallplants"],[t]),o.crop&&Me(o.crop,o.crop?.tileRef?.spritesheet||"plants",t,o.crop?.name||t,["plant","plants"],[`${t}Crop`]);}}async function ga(){if(!Z.spritesResolved)return Z.spritesResolving||(Z.spritesResolving=(async()=>{try{await ma(2e4,50),await se.init(),Od(Z.data),Z.spritesResolved=!0;}catch(e){try{console.warn("[MGData] sprite resolution failed",e);}catch{}}finally{Z.spritesResolving=null;}})()),Z.spritesResolving}async function Nd(){return Z.isReady||(ua(),Md(),ga(),Z.isReady=true),true}function $d(){return Z.isReady}function Dd(){return pa(),Z.weatherPollingTimer&&(clearInterval(Z.weatherPollingTimer),Z.weatherPollingTimer=null),Z.isReady=false,true}function zd(){return !Z.spritesResolved&&!Z.spritesResolving&&ga(),{...Z.data}}function Fd(e){return Z.data[e]??null}function jd(e){return Z.data[e]!=null}async function ma(e=1e4,t=50){const n=Date.now();for(;Date.now()-n<e;){if(Object.values(Z.data).some(o=>o!=null))return {...Z.data};await Ct(t);}throw new Error("MGData.waitForAnyData: timeout")}async function Gd(e,t=1e4,n=50){const o=Date.now();for(;Date.now()-o<t;){const r=Z.data[e];if(r!=null)return r;await Ct(n);}throw new Error(`MGData.waitFor: timeout waiting for "${e}"`)}const me=exports("m", {init:Nd,isReady:$d,stop:Dd,getAll:zd,get:Fd,has:jd,waitForAnyData:ma,waitFor:Gd});ua();const Bd={expanded:false,sort:{key:null,dir:null},search:""},Wd={categories:{}};async function Hd(){const e=await Mi("tab-test",{version:2,defaults:Wd,sanitize:i=>({categories:i.categories&&typeof i.categories=="object"?i.categories:{}})});function t(i){return e.get().categories[i]||{...Bd}}function n(i,a){const s=e.get(),c=t(i);e.update({categories:{...s.categories,[i]:{...c,expanded:a}}});}function o(i,a,s){const c=e.get(),u=t(i);e.update({categories:{...c.categories,[i]:{...u,sort:{key:a,dir:s}}}});}function r(i,a){const s=e.get(),c=t(i);e.update({categories:{...s.categories,[i]:{...c,search:a}}});}return {get:e.get,set:e.set,save:e.save,getCategoryState:t,setCategoryExpanded:n,setCategorySort:o,setCategorySearch:r}}const Vd={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function wn(e){return e?Vd[e]??0:0}class Ud extends kt{constructor(){super({id:"tab-test",label:"Test"});le(this,"stateCtrl",null);}async build(n){this.stateCtrl=await Hd();const o=this.createContainer("test-section");o.style.display="flex",o.style.flexDirection="column",o.style.gap="12px",n.appendChild(o),await this.buildSpriteTables(o);}renderSprite(n){const o=h("div",{style:"display:flex;align-items:center;justify-content:center;width:32px;height:32px;"});if(n.spriteId){const r=n.spriteId;requestAnimationFrame(()=>{try{const i=se.toCanvas(r,{scale:1});i.style.maxWidth="32px",i.style.maxHeight="32px",i.style.objectFit="contain",o.appendChild(i);}catch{o.textContent="-";}});}else o.textContent="-";return o}renderRarity(n){if(!n.rarity){const r=h("span",{style:"opacity:0.5;"});return r.textContent="—",r}return Zr({variant:"rarity",rarity:n.rarity,size:"sm"}).root}createDataCard(n,o,r,i){const a=this.stateCtrl.getCategoryState(n),s=p=>{if(!p)return r;const f=p.toLowerCase();return r.filter(g=>g.name.toLowerCase().includes(f))},c=$i({columns:i,data:s(a.search),pageSize:0,compact:true,maxHeight:"calc(var(--lg-row-h, 40px) * 6)",getRowId:p=>p.spriteId,onSortChange:(p,f)=>{this.stateCtrl.setCategorySort(n,p,f);}});a.sort.key&&a.sort.dir&&c.sortBy(a.sort.key,a.sort.dir);const u=Di({placeholder:"Search...",value:a.search,debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:p=>{const f=p.trim();this.stateCtrl.setCategorySearch(n,f),c.setData(s(f));}}),l=h("div",{style:"margin-bottom:8px;"});l.appendChild(u.root);const d=h("div");return d.appendChild(l),d.appendChild(c.root),be({title:o,subtitle:`${r.length} entries`,variant:"soft",padding:"sm",expandable:true,defaultExpanded:a.expanded,onExpandChange:p=>{this.stateCtrl.setCategoryExpanded(n,p);}},d)}formatCategoryName(n){return n.split("-").map(o=>o.charAt(0).toUpperCase()+o.slice(1)).join(" ")}findPlantBySprite(n,o){const r=me.get("plants");if(!r)return null;for(const a of Object.values(r))if(a?.seed?.spriteId===n||a?.plant?.spriteId===n||a?.crop?.spriteId===n)return a;const i=o.toLowerCase();for(const a of Object.values(r)){const s=(a?.seed?.name||"").toLowerCase();if(s===i||s===`${i} seed`)return a}return null}findPetBySpriteId(n){const o=me.get("pets");if(!o)return null;for(const r of Object.values(o))if(r?.spriteId===n)return r;return null}findItemBySpriteId(n){const o=me.get("items");if(!o)return null;for(const r of Object.values(o))if(r?.spriteId===n)return r;return null}findDecorBySpriteId(n){const o=me.get("decor");if(!o)return null;for(const r of Object.values(o))if(r?.spriteId===n)return r;return null}findEggBySpriteId(n){const o=me.get("eggs");if(!o)return null;for(const r of Object.values(o))if(r?.spriteId===n)return r;return null}getRarityForSprite(n,o,r){const i=n.toLowerCase();if(i==="plant"||i==="seed"||i==="tallplant"){const a=this.findPlantBySprite(o,r);if(a?.seed?.rarity)return a.seed.rarity}if(i==="pet"){const a=this.findPetBySpriteId(o);if(a?.rarity)return a.rarity}if(i==="item"){const a=this.findItemBySpriteId(o);if(a?.rarity)return a.rarity}if(i==="decor"){const a=this.findDecorBySpriteId(o);if(a?.rarity)return a.rarity}if(i==="egg"){const a=this.findEggBySpriteId(o);if(a?.rarity)return a.rarity}return null}yieldToMain(n=0){return new Promise(o=>{n>0?setTimeout(o,n):typeof requestIdleCallback<"u"?requestIdleCallback(()=>o(),{timeout:50}):setTimeout(o,4);})}async buildSpriteTables(n){const o=[{key:"name",header:"Name",sortable:true,width:"1fr",sortFn:(i,a)=>i.name.localeCompare(a.name,void 0,{numeric:true,sensitivity:"base"})},{key:"rarity",header:"Rarity",sortable:true,width:"100px",align:"center",render:i=>this.renderRarity(i),sortFn:(i,a)=>wn(i.rarity)-wn(a.rarity)},{key:"sprite",header:"Sprite",width:"60px",align:"center",render:i=>this.renderSprite(i)}];if(!se.ready())try{await se.init();}catch{return}const r=se.getCategories();for(let i=0;i<r.length;i++){await this.yieldToMain(8);const a=r[i],c=se.getCategoryId(a).map(u=>{const l=`sprite/${a}/${u}`;return {name:u,spriteId:l,rarity:this.getRarityForSprite(a,l,u)}});if(c.sort((u,l)=>wn(u.rarity)-wn(l.rarity)),c.length>0){const u=this.createDataCard(a,this.formatCategoryName(a),c,o);n.appendChild(u);}}}}const Kd=["visibilitychange","blur","focus","focusout","pagehide","freeze","resume"],Y={initialized:false,listeners:[],savedProps:{hidden:void 0,visibilityState:void 0,hasFocus:null},audioCtx:null,oscillator:null,gainNode:null,heartbeatInterval:null,running:false};function qd(){const e=(t,n)=>{const o=r=>{r.stopImmediatePropagation(),r.preventDefault?.();};t.addEventListener(n,o,{capture:true}),Y.listeners.push({type:n,handler:o,target:t});};for(const t of Kd)e(document,t),e(window,t);}function Yd(){for(const{type:e,handler:t,target:n}of Y.listeners)try{n.removeEventListener(e,t,{capture:!0});}catch{}Y.listeners.length=0;}function Xd(){const e=Object.getPrototypeOf(document);Y.savedProps.hidden=Object.getOwnPropertyDescriptor(e,"hidden"),Y.savedProps.visibilityState=Object.getOwnPropertyDescriptor(e,"visibilityState"),Y.savedProps.hasFocus=document.hasFocus?document.hasFocus.bind(document):null;try{Object.defineProperty(e,"hidden",{configurable:!0,get:()=>!1});}catch{}try{Object.defineProperty(e,"visibilityState",{configurable:!0,get:()=>"visible"});}catch{}try{document.hasFocus=()=>!0;}catch{}}function Jd(){const e=Object.getPrototypeOf(document);try{Y.savedProps.hidden&&Object.defineProperty(e,"hidden",Y.savedProps.hidden);}catch{}try{Y.savedProps.visibilityState&&Object.defineProperty(e,"visibilityState",Y.savedProps.visibilityState);}catch{}try{Y.savedProps.hasFocus&&(document.hasFocus=Y.savedProps.hasFocus);}catch{}}function Vn(){Y.audioCtx&&Y.audioCtx.state!=="running"&&Y.audioCtx.resume?.().catch(()=>{});}function Qd(){try{const e=window.AudioContext||window.webkitAudioContext;Y.audioCtx=new e({latencyHint:"interactive"}),Y.gainNode=Y.audioCtx.createGain(),Y.gainNode.gain.value=1e-5,Y.oscillator=Y.audioCtx.createOscillator(),Y.oscillator.frequency.value=1,Y.oscillator.connect(Y.gainNode).connect(Y.audioCtx.destination),Y.oscillator.start(),document.addEventListener("visibilitychange",Vn,{capture:!0}),window.addEventListener("focus",Vn,{capture:!0});}catch{ha();}}function ha(){try{Y.oscillator?.stop();}catch{}try{Y.oscillator?.disconnect(),Y.gainNode?.disconnect();}catch{}try{Y.audioCtx?.close?.();}catch{}document.removeEventListener("visibilitychange",Vn,{capture:true}),window.removeEventListener("focus",Vn,{capture:true}),Y.oscillator=null,Y.gainNode=null,Y.audioCtx=null;}function Zd(){const e=document.querySelector("canvas")||document.body||document.documentElement;Y.heartbeatInterval=window.setInterval(()=>{try{e.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:1,clientY:1}));}catch{}},25e3);}function eu(){Y.heartbeatInterval!==null&&(clearInterval(Y.heartbeatInterval),Y.heartbeatInterval=null);}function tu(){Y.initialized||(Y.initialized=true,ba());}function nu(){return Y.initialized}function ba(){Y.initialized&&(Y.running||(Y.running=true,Xd(),qd(),Qd(),Zd()));}function ru(){Y.running&&(Y.running=false,eu(),ha(),Yd(),Jd());}function ou(){return Y.running}const ya={init:tu,isReady:nu,start:ba,stop:ru,isRunning:ou},iu=new Map;function au(){return iu}function Er(){return N.jotaiAtomCache?.cache}function Je(e){const t=au(),n=t.get(e);if(n)return n;const o=Er();if(!o)return null;for(const r of o.values())if((r?.debugLabel||r?.label||"")===e)return t.set(e,r),r;return null}const su={baseStore:null,captureInProgress:false,captureError:null,lastCapturedVia:null,mirror:void 0};function Tt(){return su}const lu="__JOTAI_STORE_READY__";let Wo=false;const Mr=new Set;function Sn(){if(!Wo){Wo=true;for(const e of Mr)try{e();}catch{}try{const e=N.CustomEvent||CustomEvent;N.dispatchEvent?.(new e(lu));}catch{}}}function cu(e){Mr.add(e);const t=Rr();if(t.via&&!t.polyfill)try{e();}catch{}return ()=>{Mr.delete(e);}}async function du(e={}){const{timeoutMs:t=6e3,intervalMs:n=50}=e,o=Rr();if(!(o.via&&!o.polyfill))return new Promise((r,i)=>{let a=false;const s=cu(()=>{a||(a=true,s(),r());}),c=Date.now();(async()=>{for(;!a&&Date.now()-c<t;){const l=Rr();if(l.via&&!l.polyfill){if(a)return;a=true,s(),r();return}await Zt(n);}a||(a=true,s(),i(new Error("Store not captured within timeout")));})();})}const Zt=e=>new Promise(t=>setTimeout(t,e));function va(){try{const e=N.Event||Event;N.dispatchEvent?.(new e("visibilitychange"));}catch{}}function Lr(e){return e&&typeof e=="object"&&typeof e.get=="function"&&typeof e.set=="function"&&typeof e.sub=="function"}function lr(e,t=0,n=new WeakSet){if(t>3||!e||typeof e!="object"||n.has(e))return null;try{n.add(e);}catch{return null}if(Lr(e))return e;const o=["store","value","current","state","s","baseStore"];for(const r of o)try{const i=e[r];if(Lr(i))return i}catch{}return null}function xa(){const e=Tt(),t=N.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t?.renderers?.size)return null;let n=0;for(const[o]of t.renderers){const r=t.getFiberRoots?.(o);r&&(n+=r.size||0);}if(n===0)return null;for(const[o]of t.renderers){const r=t.getFiberRoots?.(o);if(r)for(const i of r){const a=new Set,s=[i.current];for(;s.length;){const c=s.pop();if(!(!c||a.has(c))){a.add(c);try{const u=c?.pendingProps?.value;if(Lr(u))return e.lastCapturedVia="fiber",u}catch{}try{let u=c?.memoizedState,l=0;for(;u&&l<15;){l++;const d=lr(u);if(d)return e.lastCapturedVia="fiber",d;const p=lr(u.memoizedState);if(p)return e.lastCapturedVia="fiber",p;u=u.next;}}catch{}try{if(c?.stateNode){const u=lr(c.stateNode);if(u)return e.lastCapturedVia="fiber",u}}catch{}c.child&&s.push(c.child),c.sibling&&s.push(c.sibling),c.alternate&&s.push(c.alternate);}}}}return null}function wa(){return {get:()=>{throw new Error("Store not captured: get unavailable")},set:()=>{throw new Error("Store not captured: set unavailable")},sub:()=>()=>{},__polyfill:true}}async function uu(e=5e3){const t=Date.now();let n=Er();for(;!n&&Date.now()-t<e;)await Zt(100),n=Er();if(!n)throw new Error("jotaiAtomCache.cache not found");const o=Tt();let r=null,i=null;const a=[],s=()=>{for(const u of a)try{u.__origWrite&&(u.write=u.__origWrite,delete u.__origWrite);}catch{}};for(const u of n.values()){if(!u||typeof u.write!="function"||u.__origWrite)continue;const l=u.write;u.__origWrite=l,u.write=function(d,p,...f){return i||(r=d,i=p,s()),l.call(this,d,p,...f)},a.push(u);}va();const c=Date.now();for(;!i&&Date.now()-c<e;)await Zt(50);return i?(o.lastCapturedVia="write",{get:u=>r(u),set:(u,l)=>i(u,l),sub:(u,l)=>{let d;try{d=r(u);}catch{}const p=setInterval(()=>{let f;try{f=r(u);}catch{return}if(f!==d){d=f;try{l();}catch{}}},100);return ()=>clearInterval(p)}}):(s(),o.lastCapturedVia="polyfill",wa())}async function pu(e=1e4){const t=Tt();va();const n=Date.now();for(;Date.now()-n<e;){const o=xa();if(o)return o;await Zt(50);}return t.lastCapturedVia="polyfill",wa()}async function ao(){const e=Tt();if(e.baseStore&&!e.baseStore.__polyfill)return Sn(),e.baseStore;if(e.captureInProgress){const t=Date.now(),n=2500;for(;!e.baseStore&&Date.now()-t<n;)await Zt(25);if(e.baseStore)return e.baseStore.__polyfill||Sn(),e.baseStore}e.captureInProgress=true;try{const t=xa();if(t)return e.baseStore=t,Sn(),t;try{const o=await uu(5e3);return e.baseStore=o,o.__polyfill||Sn(),o}catch(o){e.captureError=o;}const n=await pu();return e.baseStore=n,n}catch(t){throw e.captureError=t,t}finally{e.captureInProgress=false;}}function Rr(){const e=Tt();return {via:e.lastCapturedVia,polyfill:!!e.baseStore?.__polyfill,error:e.captureError}}async function fu(){const e=await ao(),t=new WeakMap,n=async r=>{let i=t.get(r);if(i)return i;i={last:void 0,has:false,subs:new Set},t.set(r,i);try{i.last=e.get(r),i.has=!0;}catch{}const a=e.sub(r,()=>{let s;try{s=e.get(r);}catch{return}const c=i.last,u=!Object.is(s,c)||!i.has;if(i.last=s,i.has=true,u)for(const l of i.subs)try{l(s,c);}catch{}});return i.unsubUpstream=a,i};return {async get(r){const i=await n(r);if(i.has)return i.last;const a=e.get(r);return i.last=a,i.has=true,a},async set(r,i){await e.set(r,i);const a=await n(r);a.last=i,a.has=true;},async sub(r,i){const a=await n(r);if(a.subs.add(i),a.has)try{i(a.last,a.last);}catch{}return ()=>{a.subs.delete(i);}},getShadow(r){return t.get(r)?.last},hasShadow(r){return !!t.get(r)?.has},async ensureWatch(r){await n(r);},async asStore(){return {get:r=>this.get(r),set:(r,i)=>this.set(r,i),sub:(r,i)=>{let a=null;return this.sub(r,()=>i()).then(s=>a=s),()=>a?.()}}}}}async function Rn(){const e=Tt();return e.mirror||(e.mirror=await fu()),e.mirror}const fe={async select(e){const t=await Rn(),n=Je(e);if(!n)throw new Error(`[Store] Atom not found: "${e}"`);return t.get(n)},async set(e,t){const n=await Rn(),o=Je(e);if(!o)throw new Error(`[Store] Atom not found: "${e}"`);await n.set(o,t);},async subscribe(e,t){const n=await Rn(),o=Je(e);if(!o)throw new Error(`[Store] Atom not found: "${e}"`);return n.sub(o,r=>{try{t(r);}catch{}})},async subscribeImmediate(e,t){const n=await fe.select(e);try{t(n);}catch{}return fe.subscribe(e,t)}};async function gu(){await Rn();}function so(e){return e?Array.isArray(e)?e.slice():e.split(".").map(t=>t.match(/^\d+$/)?Number(t):t):[]}function en(e,t){const n=so(t);let o=e;for(const r of n){if(o==null)return;o=o[r];}return o}function mu(e,t,n){const o=so(t);if(!o.length)return n;const r=Array.isArray(e)?[...e]:{...e??{}};let i=r;for(let a=0;a<o.length-1;a++){const s=o[a],c=i[s],u=typeof c=="object"&&c!==null?Array.isArray(c)?[...c]:{...c}:{};i[s]=u,i=u;}return i[o[o.length-1]]=n,r}function Ho(e,t){const n={};for(const o of t)n[o]=o.includes(".")?en(e,o):e?.[o];try{return JSON.stringify(n)}catch{return String(n)}}function hu(e,t,n){const o=n.mode??"auto";function r(u){const l=t?en(u,t):u,d=new Map;if(l==null)return {signatures:d,keys:[]};const p=Array.isArray(l);if((o==="array"||o==="auto"&&p)&&p)for(let g=0;g<l.length;g++){const b=l[g],m=n.key?n.key(b,g,u):g,v=n.sig?n.sig(b,g,u):n.fields?Ho(b,n.fields):JSON.stringify(b);d.set(m,v);}else for(const[g,b]of Object.entries(l)){const m=n.key?n.key(b,g,u):g,v=n.sig?n.sig(b,g,u):n.fields?Ho(b,n.fields):JSON.stringify(b);d.set(m,v);}return {signatures:d,keys:Array.from(d.keys())}}function i(u,l){if(u===l)return  true;if(!u||!l||u.size!==l.size)return  false;for(const[d,p]of u)if(l.get(d)!==p)return  false;return  true}async function a(u){let l=null;return fe.subscribeImmediate(e,d=>{const p=t?en(d,t):d,{signatures:f}=r(p);if(!i(l,f)){const g=new Set([...l?Array.from(l.keys()):[],...Array.from(f.keys())]),b=[];for(const m of g){const v=l?.get(m)??"__NONE__",S=f.get(m)??"__NONE__";v!==S&&b.push(m);}l=f,u({value:p,changedKeys:b});}})}async function s(u,l){return a(({value:d,changedKeys:p})=>{p.includes(u)&&l({value:d});})}async function c(u,l){const d=new Set(u);return a(({value:p,changedKeys:f})=>{const g=f.filter(b=>d.has(b));g.length&&l({value:p,changedKeys:g});})}return {sub:a,subKey:s,subKeys:c}}const ht=new Map;function bu(e,t){const n=ht.get(e);if(n)try{n();}catch{}return ht.set(e,t),()=>{try{t();}catch{}ht.get(e)===t&&ht.delete(e);}}function pe(e,t={}){const{path:n,write:o="replace"}=t,r=n?`${e}:${so(n).join(".")}`:e;async function i(){const d=await fe.select(e);return n?en(d,n):d}async function a(d){if(typeof o=="function"){const g=await fe.select(e),b=o(d,g);return fe.set(e,b)}const p=await fe.select(e),f=n?mu(p,n,d):d;return o==="merge-shallow"&&!n&&p&&typeof p=="object"&&typeof d=="object"?fe.set(e,{...p,...d}):fe.set(e,f)}async function s(d){const p=await i(),f=d(p);return await a(f),f}async function c(d,p,f){let g;const b=v=>{const S=n?en(v,n):v;if(typeof g>"u"||!f(g,S)){const y=g;g=S,p(S,y);}},m=d?await fe.subscribeImmediate(e,b):await fe.subscribe(e,b);return bu(r,m)}function u(){const d=ht.get(r);if(d){try{d();}catch{}ht.delete(r);}}function l(d){return hu(e,d?.path??n,d)}return {label:r,get:i,set:a,update:s,onChange:(d,p=Object.is)=>c(false,d,p),onChangeNow:(d,p=Object.is)=>c(true,d,p),asSignature:l,stopOnChange:u}}function C(e){return pe(e)}C("positionAtom");C("lastPositionInMyGardenAtom");C("playerDirectionAtom");C("stateAtom");C("quinoaDataAtom");C("currentTimeAtom");C("actionAtom");C("isPressAndHoldActionAtom");C("mapAtom");C("tileSizeAtom");pe("mapAtom",{path:"cols"});pe("mapAtom",{path:"rows"});pe("mapAtom",{path:"spawnTiles"});pe("mapAtom",{path:"locations.seedShop.spawnTileIdx"});pe("mapAtom",{path:"locations.eggShop.spawnTileIdx"});pe("mapAtom",{path:"locations.toolShop.spawnTileIdx"});pe("mapAtom",{path:"locations.decorShop.spawnTileIdx"});pe("mapAtom",{path:"locations.sellCropsShop.spawnTileIdx"});pe("mapAtom",{path:"locations.sellPetShop.spawnTileIdx"});pe("mapAtom",{path:"locations.collectorsClub.spawnTileIdx"});pe("mapAtom",{path:"locations.wishingWell.spawnTileIdx"});pe("mapAtom",{path:"locations.shopsCenter.spawnTileIdx"});C("playerAtom");C("myDataAtom");C("myUserSlotIdxAtom");C("isSpectatingAtom");C("myCoinsCountAtom");C("numPlayersAtom");pe("playerAtom",{path:"id"});C("userSlotsAtom");C("filteredUserSlotsAtom");C("myUserSlotAtom");C("spectatorsAtom");pe("stateAtom",{path:"child"});pe("stateAtom",{path:"child.data"});pe("stateAtom",{path:"child.data.shops"});const yu=pe("stateAtom",{path:"child.data.userSlots"}),vu=pe("stateAtom",{path:"data.players"}),xu=pe("stateAtom",{path:"data.hostPlayerId"});C("myInventoryAtom");C("myInventoryItemsAtom");C("isMyInventoryAtMaxLengthAtom");C("myFavoritedItemIdsAtom");C("myCropInventoryAtom");C("mySeedInventoryAtom");C("myToolInventoryAtom");C("myEggInventoryAtom");C("myDecorInventoryAtom");C("myPetInventoryAtom");pe("myInventoryAtom",{path:"favoritedItemIds"});C("itemTypeFiltersAtom");C("myItemStoragesAtom");C("myPetHutchStoragesAtom");C("myPetHutchItemsAtom");C("myPetHutchPetItemsAtom");C("myNumPetHutchItemsAtom");C("myValidatedSelectedItemIndexAtom");C("isSelectedItemAtomSuspended");C("mySelectedItemAtom");C("mySelectedItemNameAtom");C("mySelectedItemRotationsAtom");C("mySelectedItemRotationAtom");C("setSelectedIndexToEndAtom");C("myPossiblyNoLongerValidSelectedItemIndexAtom");C("myCurrentGlobalTileIndexAtom");C("myCurrentGardenTileAtom");C("myCurrentGardenObjectAtom");C("myOwnCurrentGardenObjectAtom");C("myOwnCurrentDirtTileIndexAtom");C("myCurrentGardenObjectNameAtom");C("isInMyGardenAtom");C("myGardenBoardwalkTileObjectsAtom");const wu=pe("myDataAtom",{path:"garden"});pe("myDataAtom",{path:"garden.tileObjects"});pe("myOwnCurrentGardenObjectAtom",{path:"objectType"});C("myCurrentStablePlantObjectInfoAtom");C("myCurrentSortedGrowSlotIndicesAtom");C("myCurrentGrowSlotIndexAtom");C("myCurrentGrowSlotsAtom");C("myCurrentGrowSlotAtom");C("secondsUntilCurrentGrowSlotMaturesAtom");C("isCurrentGrowSlotMatureAtom");C("numGrowSlotsAtom");C("myCurrentEggAtom");C("petInfosAtom");C("myPetInfosAtom");C("myPetSlotInfosAtom");C("myPrimitivePetSlotsAtom");C("myNonPrimitivePetSlotsAtom");C("expandedPetSlotIdAtom");C("myPetsProgressAtom");C("myActiveCropMutationPetsAtom");C("totalPetSellPriceAtom");C("selectedPetHasNewVariantsAtom");const Su=C("shopsAtom"),ku=C("myShopPurchasesAtom");C("seedShopAtom");C("seedShopInventoryAtom");C("seedShopRestockSecondsAtom");C("seedShopCustomRestockInventoryAtom");C("eggShopAtom");C("eggShopInventoryAtom");C("eggShopRestockSecondsAtom");C("eggShopCustomRestockInventoryAtom");C("toolShopAtom");C("toolShopInventoryAtom");C("toolShopRestockSecondsAtom");C("toolShopCustomRestockInventoryAtom");C("decorShopAtom");C("decorShopInventoryAtom");C("decorShopRestockSecondsAtom");C("decorShopCustomRestockInventoryAtom");C("isDecorShopAboutToRestockAtom");pe("shopsAtom",{path:"seed"});pe("shopsAtom",{path:"tool"});pe("shopsAtom",{path:"egg"});pe("shopsAtom",{path:"decor"});C("myCropItemsAtom");C("myCropItemsToSellAtom");C("totalCropSellPriceAtom");C("friendBonusMultiplierAtom");C("myJournalAtom");C("myCropJournalAtom");C("myPetJournalAtom");C("myStatsAtom");C("myActivityLogsAtom");C("newLogsAtom");C("hasNewLogsAtom");C("newCropLogsFromSellingAtom");C("hasNewCropLogsFromSellingAtom");C("myCompletedTasksAtom");C("myActiveTasksAtom");C("isWelcomeToastVisibleAtom");C("shouldCloseWelcomeToastAtom");C("isInitialMoveToDirtPatchToastVisibleAtom");C("isFirstPlantSeedActiveAtom");C("isThirdSeedPlantActiveAtom");C("isThirdSeedPlantCompletedAtom");C("isDemoTouchpadVisibleAtom");C("areShopAnnouncersEnabledAtom");C("arePresentablesEnabledAtom");C("isEmptyDirtTileHighlightedAtom");C("isPlantTileHighlightedAtom");C("isItemHiglightedInHotbarAtom");C("isItemHighlightedInModalAtom");C("isMyGardenButtonHighlightedAtom");C("isSellButtonHighlightedAtom");C("isShopButtonHighlightedAtom");C("isInstaGrowButtonHiddenAtom");C("isActionButtonHighlightedAtom");C("isGardenItemInfoCardHiddenAtom");C("isSeedPurchaseButtonHighlightedAtom");C("isFirstSeedPurchaseActiveAtom");C("isFirstCropHarvestActiveAtom");C("isWeatherStatusHighlightedAtom");const Cu=C("weatherAtom"),Sa=C("activeModalAtom");C("hotkeyBeingPressedAtom");C("avatarTriggerAnimationAtom");C("avatarDataAtom");C("emoteDataAtom");C("otherUserSlotsAtom");C("otherPlayerPositionsAtom");C("otherPlayerSelectedItemsAtom");C("otherPlayerLastActionsAtom");C("traderBunnyPlayerId");C("npcPlayersAtom");C("npcQuinoaUsersAtom");C("numNpcAvatarsAtom");C("traderBunnyEmoteTimeoutAtom");C("traderBunnyEmoteAtom");C("unsortedLeaderboardAtom");C("currentGardenNameAtom");C("quinoaEngineAtom");C("quinoaInitializationErrorAtom");C("avgPingAtom");C("serverClientTimeOffsetAtom");C("isEstablishingShotRunningAtom");C("isEstablishingShotCompleteAtom");const re={initialized:false,activeModal:null,isCustom:false,shadow:null,patchedAtoms:new Set,originalReads:new Map,unsubscribes:[],listeners:{onOpen:new Set,onClose:new Set}};function Yn(){return re}function Au(){return re.initialized}function ut(){return re.isCustom&&re.activeModal!==null}function st(){return re.activeModal}function ka(e){return !re.shadow||re.shadow.modal!==e?null:re.shadow.data}function Tu(e){re.initialized=e;}function lo(e){re.activeModal=e;}function co(e){re.isCustom=e;}function Ca(e,t){re.shadow={modal:e,data:t,timestamp:Date.now()};}function Aa(){re.shadow=null;}function Vo(e,t){re.patchedAtoms.add(e),re.originalReads.set(e,t);}function Iu(e){return re.originalReads.get(e)}function _r(e){return re.patchedAtoms.has(e)}function Pu(e){re.patchedAtoms.delete(e),re.originalReads.delete(e);}function Eu(e){re.unsubscribes.push(e);}function Mu(){for(const e of re.unsubscribes)try{e();}catch{}re.unsubscribes.length=0;}function Lu(e){return re.listeners.onOpen.add(e),()=>re.listeners.onOpen.delete(e)}function Ta(e){return re.listeners.onClose.add(e),()=>re.listeners.onClose.delete(e)}function Ia(e){for(const t of re.listeners.onOpen)try{t(e);}catch{}}function uo(e){for(const t of re.listeners.onClose)try{t(e);}catch{}}function Ru(){Mu(),re.initialized=false,re.activeModal=null,re.isCustom=false,re.shadow=null,re.patchedAtoms.clear(),re.originalReads.clear(),re.listeners.onOpen.clear(),re.listeners.onClose.clear();}const po={inventory:{atoms:[{atomLabel:"myInventoryAtom",dataKey:"_full",transform:e=>{const t=e;return {items:t.items??[],storages:t.storages??[],favoritedItemIds:t.favoritedItemIds??[]}}}],derivedAtoms:[{atomLabel:"myCropInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Produce"):[]},{atomLabel:"mySeedInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Seed"):[]},{atomLabel:"myToolInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Tool"):[]},{atomLabel:"myEggInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Egg"):[]},{atomLabel:"myDecorInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Decor"):[]},{atomLabel:"myPetInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Pet"):[]}]},journal:{atoms:[{atomLabel:"myJournalAtom",dataKey:"_full"}],derivedAtoms:[{atomLabel:"myCropJournalAtom",sourceKey:"produce",deriveFn:e=>e??{}},{atomLabel:"myPetJournalAtom",sourceKey:"pets",deriveFn:e=>e??{}}]},stats:{atoms:[{atomLabel:"myStatsAtom",dataKey:"_full"}]},activityLog:{atoms:[{atomLabel:"myActivityLogsAtom",dataKey:"logs"}]},seedShop:{atoms:[{atomLabel:"seedShopInventoryAtom",dataKey:"inventory"},{atomLabel:"seedShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},eggShop:{atoms:[{atomLabel:"eggShopInventoryAtom",dataKey:"inventory"},{atomLabel:"eggShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},toolShop:{atoms:[{atomLabel:"toolShopInventoryAtom",dataKey:"inventory"},{atomLabel:"toolShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},decorShop:{atoms:[{atomLabel:"decorShopInventoryAtom",dataKey:"inventory"},{atomLabel:"decorShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},leaderboard:{atoms:[{atomLabel:"unsortedLeaderboardAtom",dataKey:"entries"}]},petHutch:{atoms:[{atomLabel:"myPetHutchItemsAtom",dataKey:"items"},{atomLabel:"myPetHutchPetItemsAtom",dataKey:"petItems"}]}};function Pa(e){return po[e]}function _u(e){const t=po[e],n=[];for(const o of t.atoms)n.push(o.atomLabel);if(t.derivedAtoms)for(const o of t.derivedAtoms)n.push(o.atomLabel);return n}const Ou=new Set(["inventory","journal","stats","activityLog","petHutch"]),Nu=new Set(["seedShop","eggShop","toolShop","decorShop"]),$u=new Set(["leaderboard"]);function Du(e,t,n,o){return function(i){const a=ut(),s=st();if(a&&s===o){const c=ka(o);if(c!==null){let u;if(n.dataKey==="_full"?u=c:u=c[n.dataKey],u!==void 0)return t(i),n.transform?n.transform(u):u}}return t(i)}}function zu(e,t,n,o,r){return function(a){if(ut()&&st()===r){const s=ka(r);if(s!==null){const c=s[n];if(c!==void 0)return t(a),o(c)}}return t(a)}}function Fu(e){const t=Pa(e);for(const n of t.atoms){const o=Je(n.atomLabel);if(!o||_r(n.atomLabel))continue;const r=o.read;if(typeof r!="function")continue;const i=Du(n.atomLabel,r,n,e);o.read=i,Vo(n.atomLabel,r);}if(t.derivedAtoms)for(const n of t.derivedAtoms){const o=Je(n.atomLabel);if(!o||_r(n.atomLabel))continue;const r=o.read;if(typeof r!="function")continue;const i=zu(n.atomLabel,r,n.sourceKey,n.deriveFn,e);o.read=i,Vo(n.atomLabel,r);}}async function Xn(e){const t=Pa(e);for(const o of t.atoms)Uo(o.atomLabel);if(t.derivedAtoms)for(const o of t.derivedAtoms)Uo(o.atomLabel);const n=await ao();await Ea(n,e);}async function ju(e){const t=await ao();await Ea(t,e);const n=_u(e);for(const o of n){const r=Je(o);if(r)try{t.get(r);}catch{}}}function Uo(e){if(!_r(e))return;const t=Je(e),n=Iu(e);t&&n&&(t.read=n),Pu(e);}async function Ea(e,t){const n=Ou.has(t),o=Nu.has(t),r=$u.has(t);if(!n&&!o&&!r)return;const i=Je("stateAtom");if(i)try{const a=e.get(i);if(!a||typeof a!="object")return;let s=null;if(n||o){const c=a.child,u=c?.data;if(c&&u&&typeof u=="object"){let l=null;if(n&&Array.isArray(u.userSlots)){const d=u.userSlots.map(p=>{if(!p||typeof p!="object")return p;const f=p,g=f.data,b=g&&typeof g=="object"?{...g}:g;return {...f,data:b}});l={...l??u,userSlots:d};}if(o&&u.shops&&typeof u.shops=="object"&&(l={...l??u,shops:{...u.shops}}),l){const d={...c,data:l};s={...a,child:d};}}}if(r){const c=a.data;if(c&&Array.isArray(c.players)){const u={...c,players:[...c.players]};s={...s??a,data:u};}}if(!s)return;await e.set(i,s);}catch{}}async function Gu(){for(const e of Object.keys(po))await Xn(e);}let kn=null,Bt=null;async function Bu(){if(Yn().initialized)return;Bt=await fe.select("activeModalAtom"),kn=setInterval(async()=>{try{const n=await fe.select("activeModalAtom"),o=Bt;o!==n&&(Bt=n,Wu(n,o));}catch{}},50),Eu(()=>{kn&&(clearInterval(kn),kn=null);}),Tu(true);}function Wu(e,t){const n=ut(),o=st();e===null&&t!==null&&(n&&o===t?Hu("native"):n||uo({modal:t,wasCustom:false,closedBy:"native"})),e!==null&&!n&&Ia({modal:e,isCustom:false});}async function Hu(e){const t=st();t&&(Aa(),co(false),lo(null),await Xn(t),uo({modal:t,wasCustom:true,closedBy:e}));}async function Vu(e,t){if(!Yn().initialized)throw new Error("[MGCustomModal] Not initialized. Call init() first.");ut()&&await Ma(),Ca(e,t),co(true),lo(e),Fu(e),await ju(e),await Sa.set(e),Bt=e,Ia({modal:e,isCustom:true});}function Uu(e,t){const n=Yn();if(!n.isCustom||n.activeModal!==e||!n.shadow)return;const r={...n.shadow.data,...t};Ca(e,r);}async function Ma(){const e=Yn();if(!e.isCustom||!e.activeModal)return;const t=e.activeModal;Aa(),co(false),lo(null),await Sa.set(null),Bt=null,await Xn(t),uo({modal:t,wasCustom:true,closedBy:"api"});}function Ku(){return new Promise(e=>{if(!ut()){e();return}const t=Ta(()=>{t(),e();});})}async function qu(){if(ut()){const e=st();e&&await Xn(e);}await Gu(),Ru();}const La={async init(){return Bu()},isReady(){return Au()},async show(e,t){return Vu(e,t)},update(e,t){return Uu(e,t)},async close(){return Ma()},isOpen(){return st()!==null},isCustomOpen(){return ut()},getActiveModal(){return st()},waitForClose(){return Ku()},onOpen(e){return Lu(e)},onClose(e){return Ta(e)},destroy(){return qu()}};let Cn=null;const Ie={ready:false,xform:null,xformAt:0};function It(e){try{if(typeof structuredClone=="function")return structuredClone(e)}catch{}try{return JSON.parse(JSON.stringify(e))}catch{}return e}function sn(){return Ne.tos()}function fo(){return Ne.engine()}function Yu(){const e=sn()?.map?.cols;return Number.isFinite(e)&&e>0?e:null}function go(e,t){const n=Yu();return n?t*n+e|0:null}function at(e,t,n=true){const o=sn(),r=go(e,t);if(!o||r==null)return {gidx:null,tv:null};let i=o.tileViews?.get?.(r)||null;if(!i&&n&&typeof o.getOrCreateTileView=="function")try{i=o.getOrCreateTileView(r);}catch{}return {gidx:r,tv:i||null}}function vt(e,t,n,o={}){const r=o.ensureView!==false,i=o.forceUpdate!==false,a=fo(),{gidx:s,tv:c}=at(Number(e),Number(t),r);if(s==null)throw new Error("MGTile: cols unavailable (engine/TOS not ready)");if(!c)throw new Error("MGTile: TileView unavailable (not instantiated)");const u=c.tileObject;if(typeof c.onDataChanged!="function")throw new Error("MGTile: tileView.onDataChanged not found (different API?)");if(c.onDataChanged(n),i&&a?.reusableContext&&typeof c.update=="function")try{c.update(a.reusableContext);}catch{}return {ok:true,tx:Number(e),ty:Number(t),gidx:s,before:u,after:c.tileObject}}function mo(e,t){if(!e)throw new Error("MGTile: no tileObject on this tile");if(e.objectType!==t)throw new Error(`MGTile: expected objectType "${t}", got "${e.objectType}"`)}function cr(e,t){if("startTime"in t&&(e.startTime=Number(t.startTime)),"endTime"in t&&(e.endTime=Number(t.endTime)),"targetScale"in t&&(e.targetScale=Number(t.targetScale)),"mutations"in t){if(!Array.isArray(t.mutations))throw new Error("MGTile: mutations must be an array of strings");e.mutations=t.mutations.slice();}}function He(){if(!Ie.ready)throw new Error("MGTile: not ready. Call MGTile.init() first.")}function dr(e){if(!e)return null;const t=r=>r&&(typeof r.getGlobalPosition=="function"||typeof r.toGlobal=="function"),n=["container","root","view","tile","ground","base","floor","bg","background","baseSprite","tileSprite","displayObject","gfx","graphics","sprite"];for(const r of n)if(t(e[r]))return e[r];if(t(e))return e;const o=[e.container,e.root,e.view,e.displayObject,e.tileSprite,e.gfx,e.graphics,e.sprite];for(const r of o)if(t(r))return r;try{for(const r of Object.keys(e))if(t(e[r]))return e[r]}catch{}return null}function _n(e){const t=De(()=>e?.getGlobalPosition?.());if(t&&Number.isFinite(t.x)&&Number.isFinite(t.y))return {x:t.x,y:t.y};const n=De(()=>e?.toGlobal?.({x:0,y:0}));return n&&Number.isFinite(n.x)&&Number.isFinite(n.y)?{x:n.x,y:n.y}:null}function Xu(e){try{if(!e?.getBounds)return "center";const t=e.getBounds(),n=_n(e);if(!n||!t||!Number.isFinite(t.width)||!Number.isFinite(t.height))return "center";const o=t.x+t.width/2,r=t.y+t.height/2;return Math.hypot(n.x-o,n.y-r)<Math.hypot(n.x-t.x,n.y-t.y)?"center":"topleft"}catch{return "center"}}function Ju(){const e=sn(),t=e?.map?.cols,n=e?.map?.rows;if(!e||!Number.isFinite(t)||t<=1)return null;const o=Number.isFinite(n)&&n>1?n:null,r=[[0,0],[1,1],[Math.min(2,t-2),0],[0,1]];o&&o>2&&r.push([Math.floor(t/2),Math.floor(o/2)]);for(const[i,a]of r){if(i<0||a<0||i>=t||o&&a>=o)continue;const s=at(i,a,true).tv,c=i+1<t?at(i+1,a,true).tv:null,u=at(i,a+1,true).tv,l=dr(s),d=dr(c),p=dr(u);if(!l||!d||!p)continue;const f=_n(l),g=_n(d),b=_n(p);if(!f||!g||!b)continue;const m={x:g.x-f.x,y:g.y-f.y},v={x:b.x-f.x,y:b.y-f.y},S=m.x*v.y-m.y*v.x;if(!Number.isFinite(S)||Math.abs(S)<1e-6)continue;const y=1/S,x={a:v.y*y,b:-v.x*y,c:-m.y*y,d:m.x*y},A={x:f.x-i*m.x-a*v.x,y:f.y-i*m.y-a*v.y},w=Xu(l),T=w==="center"?A:{x:A.x+.5*(m.x+v.x),y:A.y+.5*(m.y+v.y)};return {ok:true,cols:t,rows:o,vx:m,vy:v,inv:x,anchorMode:w,originCenter:T}}return null}async function Qu(e=15e3){return Ie.ready?true:Cn||(Cn=(async()=>{if(await Ne.init(e),!sn())throw new Error("MGTile: engine captured but tileObject system not found");return Ie.ready=true,true})(),Cn)}function Zu(){return Ne.hook()}function Jn(e,t,n={}){He();const o=n.ensureView!==false,r=n.clone!==false,{gidx:i,tv:a}=at(Number(e),Number(t),o);if(i==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!a)return {tx:Number(e),ty:Number(t),gidx:i,tileView:null,tileObject:void 0};const s=a.tileObject;return {tx:Number(e),ty:Number(t),gidx:i,tileView:a,tileObject:r?It(s):s}}function ep(e,t,n={}){return He(),vt(e,t,null,n)}function tp(e,t,n,o={}){He();const i=Jn(e,t,{...o,clone:false}).tileView?.tileObject;mo(i,"plant");const a=It(i);if(Array.isArray(a.slots)||(a.slots=[]),"plantedAt"in n&&(a.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(a.maturedAt=Number(n.maturedAt)),"species"in n&&(a.species=String(n.species)),"slotIdx"in n&&"slotPatch"in n){const s=Number(n.slotIdx)|0;if(!a.slots[s])throw new Error(`MGTile: plant slot ${s} doesn't exist`);return cr(a.slots[s],n.slotPatch),vt(e,t,a,o)}if("slots"in n){const s=n.slots;if(Array.isArray(s)){for(let c=0;c<s.length;c++)if(s[c]!=null){if(!a.slots[c])throw new Error(`MGTile: plant slot ${c} doesn't exist`);cr(a.slots[c],s[c]);}}else if(s&&typeof s=="object")for(const c of Object.keys(s)){const u=Number(c)|0;if(Number.isFinite(u)){if(!a.slots[u])throw new Error(`MGTile: plant slot ${u} doesn't exist`);cr(a.slots[u],s[u]);}}else throw new Error("MGTile: patch.slots must be array or object map");return vt(e,t,a,o)}return vt(e,t,a,o)}function np(e,t,n,o={}){He();const i=Jn(e,t,{...o,clone:false}).tileView?.tileObject;mo(i,"decor");const a=It(i);return "rotation"in n&&(a.rotation=Number(n.rotation)),vt(e,t,a,o)}function rp(e,t,n,o={}){He();const i=Jn(e,t,{...o,clone:false}).tileView?.tileObject;mo(i,"egg");const a=It(i);return "plantedAt"in n&&(a.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(a.maturedAt=Number(n.maturedAt)),vt(e,t,a,o)}function op(e,t,n,o={}){He();const r=o.ensureView!==false,i=o.forceUpdate!==false,a=fo(),{gidx:s,tv:c}=at(Number(e),Number(t),r);if(s==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!c)throw new Error("MGTile: TileView unavailable");const u=c.tileObject,l=typeof n=="function"?n(It(u)):n;if(c.onDataChanged(l),i&&a?.reusableContext&&typeof c.update=="function")try{c.update(a.reusableContext);}catch{}return {ok:true,tx:Number(e),ty:Number(t),gidx:s,before:u,after:c.tileObject}}function ip(e,t,n={}){He();const o=n.ensureView!==false,{gidx:r,tv:i}=at(Number(e),Number(t),o);if(r==null)throw new Error("MGTile: cols unavailable");if(!i)return {ok:true,tx:Number(e),ty:Number(t),gidx:r,tv:null,tileObject:void 0};const a=n.clone!==false,s=i.tileObject;return {ok:true,tx:Number(e),ty:Number(t),gidx:r,objectType:s?.objectType??null,tileObject:a?It(s):s,tvKeys:Object.keys(i||{}).sort(),tileView:i}}function Ra(){return He(),Ie.xform=Ju(),Ie.xformAt=Date.now(),{ok:!!Ie.xform?.ok,xform:Ie.xform}}function ap(e,t={}){if(He(),!e||!Number.isFinite(e.x)||!Number.isFinite(e.y))return null;const n=Number.isFinite(t.maxAgeMs)?Number(t.maxAgeMs):1500;(!Ie.xform?.ok||t.forceRebuild||Date.now()-Ie.xformAt>n)&&Ra();const o=Ie.xform;if(!o?.ok)return null;const r=e.x-o.originCenter.x,i=e.y-o.originCenter.y,a=o.inv.a*r+o.inv.b*i,s=o.inv.c*r+o.inv.d*i,c=Math.floor(a),u=Math.floor(s),l=[[c,u],[c+1,u],[c,u+1],[c+1,u+1]];let d=null,p=1/0;for(const[f,g]of l){if(f<0||g<0||f>=o.cols||Number.isFinite(o.rows)&&o.rows!==null&&g>=o.rows)continue;const b=o.originCenter.x+f*o.vx.x+g*o.vy.x,m=o.originCenter.y+f*o.vx.y+g*o.vy.y,v=(e.x-b)**2+(e.y-m)**2;v<p&&(p=v,d={tx:f,ty:g,fx:a,fy:s,x:e.x,y:e.y,gidx:null});}return d?(d.gidx=go(d.tx,d.ty),d):null}function sp(e,t){He();const n=Ie.xform;return n?.ok?{x:n.originCenter.x+e*n.vx.x+t*n.vy.x,y:n.originCenter.y+e*n.vx.y+t*n.vy.y}:null}function lp(){return ["MGTile.init()","MGTile.hook()","MGTile.getTileObject(tx,ty) / inspect(tx,ty)","MGTile.setTileEmpty(tx,ty)","MGTile.setTilePlant(tx,ty,{...}) / setTileDecor / setTileEgg","MGTile.setTileObjectRaw(tx,ty,objOrFn)","MGTile.rebuildTransform() / pointToTile({x,y})","MGTile.tileToPoint(tx,ty)"].join(`
`)}const ze={init:Qu,ready:()=>Ie.ready,hook:Zu,engine:()=>fo(),tos:()=>sn(),gidx:(e,t)=>go(Number(e),Number(t)),getTileObject:Jn,inspect:ip,setTileEmpty:ep,setTilePlant:tp,setTileDecor:np,setTileEgg:rp,setTileObjectRaw:op,rebuildTransform:Ra,pointToTile:ap,tileToPoint:sp,getTransform:()=>Ie.xform,help:lp},V={ready:false,app:null,renderer:null,stage:null,ticker:null,tileSets:new Map,highlights:new Map,watches:new Map,fades:new Map,fadeWatches:new Map},ho=e=>!!e&&typeof e=="object"&&!Array.isArray(e),Or=e=>!!(e&&typeof e.getBounds=="function"&&("parent"in e||"children"in e)),Un=e=>!!(e&&typeof e.tint=="number"),lt=e=>!!(e&&typeof e.alpha=="number");function On(e,t,n){return e+(t-e)*n}function cp(e,t,n){const o=e>>16&255,r=e>>8&255,i=e&255,a=t>>16&255,s=t>>8&255,c=t&255,u=On(o,a,n)|0,l=On(r,s,n)|0,d=On(i,c,n)|0;return u<<16|l<<8|d}function dp(e,t=900){const n=[],o=[e];for(;o.length&&n.length<t;){const r=o.pop();if(!r)continue;Un(r)&&n.push(r);const i=r.children;if(Array.isArray(i))for(let a=i.length-1;a>=0;a--)o.push(i[a]);}return n}function up(e,t=25e3){const n=[],o=[e];let r=0;for(;o.length&&r++<t;){const i=o.pop();if(!i)continue;lt(i)&&n.push(i);const a=i.children;if(Array.isArray(a))for(let s=a.length-1;s>=0;s--)o.push(a[s]);}return n}function _a(e){if(!Array.isArray(e))return [];const t=new Set,n=[];for(const o of e){let r,i;if(Array.isArray(o))r=o[0],i=o[1];else if(ho(o))r=o.x??o.tx,i=o.y??o.ty;else continue;if(r=Number(r),i=Number(i),!Number.isFinite(r)||!Number.isFinite(i))continue;r|=0,i|=0;const a=`${r},${i}`;t.has(a)||(t.add(a),n.push({x:r,y:i}));}return n}function pp(e,t){const n=String(e||"").trim();if(!n)throw new Error("MGPixi.defineTileSet: empty name");const o=_a(t);return V.tileSets.set(n,o),{ok:true,name:n,count:o.length}}function fp(e){return V.tileSets.delete(String(e||"").trim())}function gp(){return Array.from(V.tileSets.keys()).sort((e,t)=>e.localeCompare(t))}function Oa(e){return !!(e&&(e.tileSet!=null||Array.isArray(e.tiles)))}function bo(e){const n=ze.tos?.()?.tileViews;if(!n?.entries)throw new Error("MGPixi: TOS.tileViews not found");if(!Oa(e))return {entries:Array.from(n.entries()),gidxSet:null};let o=[];if(e.tileSet!=null){const i=String(e.tileSet||"").trim(),a=V.tileSets.get(i);if(!a)throw new Error(`MGPixi: tileSet not found "${i}"`);o=a;}else o=_a(e.tiles||[]);const r=new Map;for(const i of o){const a=ze.getTileObject(i.x,i.y,{ensureView:true,clone:false});a?.tileView&&a.gidx!=null&&r.set(a.gidx,a.tileView);}return {entries:Array.from(r.entries()),gidxSet:new Set(r.keys())}}function yo(e){const t=V.highlights.get(e);if(!t)return  false;De(()=>V.ticker?.remove(t.tick)),t.root&&t.baseAlpha!=null&&lt(t.root)&&De(()=>{t.root.alpha=t.baseAlpha;});for(const n of t.tint)n.o&&Un(n.o)&&De(()=>{n.o.tint=n.baseTint;});return V.highlights.delete(e),true}function Na(e=null){for(const t of Array.from(V.highlights.keys()))e&&!String(t).startsWith(e)||yo(t);return  true}function $a(e,t={}){if(Qe(),!Or(e))throw new Error("MGPixi.highlightPulse: invalid root");const n=String(t.key||`hl:${Math.random().toString(16).slice(2)}`);if(V.highlights.has(n))return n;const o=lt(e)?Number(e.alpha):null,r=Be(Number(t.minAlpha??.12),0,1),i=Be(Number(t.maxAlpha??1),0,1),a=Number(t.speed??1.25),s=(t.tint??8386303)>>>0,c=Be(Number(t.tintMix??.85),0,1),u=t.deepTint!==false,l=[];if(u)for(const f of dp(e))l.push({o:f,baseTint:f.tint});else Un(e)&&l.push({o:e,baseTint:e.tint});const d=performance.now(),p=()=>{const f=(performance.now()-d)/1e3,g=(Math.sin(f*Math.PI*2*a)+1)/2,b=g*g*(3-2*g);o!=null&&lt(e)&&(e.alpha=Be(On(r,i,b)*o,0,1));const m=b*c;for(const v of l)v.o&&Un(v.o)&&(v.o.tint=cp(v.baseTint,s,m));};return V.ticker?.add(p),V.highlights.set(n,{root:e,tick:p,baseAlpha:o,tint:l}),n}const mp=["plantVisual","cropVisual","slotVisual","slotView","displayObject","view","container","root","sprite","gfx","graphics"];function Nr(e){if(!e)return null;if(Or(e))return e;if(!ho(e))return null;for(const t of mp){const n=e[t];if(Or(n))return n}return null}function hp(e,t){const n=[{o:e,d:0}],o=new Set,r=6;for(;n.length;){const{o:i,d:a}=n.shift();if(!(!i||a>r)&&!o.has(i)){if(o.add(i),Array.isArray(i)){if(i.length===t){const s=new Array(t);let c=true;for(let u=0;u<t;u++){const l=Nr(i[u]);if(!l){c=false;break}s[u]=l;}if(c)return s}for(const s of i)n.push({o:s,d:a+1});continue}if(ho(i)){const s=i;for(const c of Object.keys(s))n.push({o:s[c],d:a+1});}}}return null}function bp(e,t){const n=e?.mutations;if(!Array.isArray(n))return  false;for(const o of n)if(String(o||"").toLowerCase()===t)return  true;return  false}function Da(e,t={}){Qe();const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.highlightMutation: empty mutation");const{entries:o,gidxSet:r}=bo(t),i=`hlmut:${n}:`;if(t.clear===true)if(!r)Na(i);else for(const d of Array.from(V.highlights.keys())){if(!d.startsWith(i))continue;const p=d.split(":"),f=Number(p[2]);r.has(f)&&yo(d);}const a={tint:(t.tint??8386303)>>>0,minAlpha:Number(t.minAlpha??.12),maxAlpha:Number(t.maxAlpha??1),speed:Number(t.speed??1.25),tintMix:Number(t.tintMix??.85),deepTint:t.deepTint!==false};let s=0,c=0,u=0,l=0;for(const[d,p]of o){const f=p?.tileObject;if(!f||f.objectType!=="plant")continue;const g=f.slots;if(!Array.isArray(g)||g.length===0)continue;let b=false;const m=[];for(let y=0;y<g.length;y++)bp(g[y],n)&&(m.push(y),b=true);if(!b)continue;s++,c+=m.length;const v=p?.childView?.plantVisual||p?.childView||p,S=hp(v,g.length);if(!S){l+=m.length;continue}for(const y of m){const x=S[y];if(!x){l++;continue}const A=`${i}${d}:${y}`;V.highlights.has(A)||($a(x,{key:A,...a}),u++);}}return {ok:true,mutation:n,filtered:!!r,plantsMatched:s,matchedSlots:c,newHighlights:u,failedSlots:l}}function yp(e,t={}){Qe();const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchMutation: empty mutation");const o=`watchmut:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,r=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,i=V.watches.get(o);i&&clearInterval(i);const a=setInterval(()=>{De(()=>Da(n,{...t,clear:!1}));},r);return V.watches.set(o,a),{ok:true,key:o,mutation:n,intervalMs:r}}function vp(e){const t=String(e||"").trim();if(!t)return  false;if(!t.startsWith("watchmut:")){const o=t.toLowerCase();let r=0;for(const[i,a]of Array.from(V.watches.entries()))i.startsWith(`watchmut:${o}:`)&&(clearInterval(a),V.watches.delete(i),r++);return r>0}const n=V.watches.get(t);return n?(clearInterval(n),V.watches.delete(t),true):false}function xp(e){const t=Array.isArray(e?.slots)?e.slots:[];return {objectType:"plant",species:e?.species??null,plantedAt:e?.plantedAt??null,maturedAt:e?.maturedAt??null,slotCount:t.length,slots:t.map((n,o)=>({idx:o,mutations:Array.isArray(n?.mutations)?n.mutations.slice():[]}))}}function wp(e,t,n={}){Qe();const o=Number(e)|0,r=Number(t)|0,i=n.ensureView!==false,a=ze.getTileObject(o,r,{ensureView:i,clone:false}),s=a?.tileView||null,c=s?.tileObject,u={ok:true,tx:o,ty:r,gidx:a?.gidx??ze.gidx?.(o,r)??null,hasTileView:!!s,objectType:c?.objectType??null,tileObject:c??null,summary:c?.objectType==="plant"?xp(c):c?{objectType:c.objectType??null}:null,display:s?s.childView?.plantVisual||s.childView||s.displayObject||s:null};return n.log!==false&&De(()=>console.log("[MGPixi.inspectTile]",u)),u}function Sp(e){const t=e?.childView?.plantVisual||e?.childView?.cropVisual||e?.childView||e?.displayObject||e;return Nr(t)||Nr(e?.displayObject)||null}function za(e){const t=V.fades.get(e);if(!t)return  false;for(const n of t.targets)n.o&&lt(n.o)&&Number.isFinite(n.baseAlpha)&&De(()=>{n.o.alpha=n.baseAlpha;});return V.fades.delete(e),true}function $r(e=null){for(const t of Array.from(V.fades.keys()))e&&!String(t).startsWith(e)||za(t);return  true}function Fa(e,t={}){Qe();const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.clearSpeciesFade: empty species");const o=`fade:${n}:`;if(!Oa(t))return $r(o);const{gidxSet:r}=bo(t);if(!r)return $r(o);for(const i of Array.from(V.fades.keys())){if(!i.startsWith(o))continue;const a=Number(i.slice(o.length));r.has(a)&&za(i);}return  true}function ja(e,t={}){Qe();const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.fadeSpecies: empty species");const o=Be(Number(t.alpha??.2),0,1),r=t.deep===true,{entries:i,gidxSet:a}=bo(t),s=`fade:${n}:`;t.clear===true&&Fa(n,t);let c=0,u=0,l=0,d=0;for(const[p,f]of i){const g=f?.tileObject;if(!g||g.objectType!=="plant")continue;c++;const b=String(g.species||"").trim().toLowerCase();if(!b||b!==n)continue;u++;const m=Sp(f);if(!m||!lt(m)){d++;continue}const v=`${s}${p}`;if(V.fades.has(v)){De(()=>{m.alpha=o;}),l++;continue}const S=r?up(m):[m],y=[];for(const x of S)lt(x)&&y.push({o:x,baseAlpha:Number(x.alpha)});for(const x of y)De(()=>{x.o.alpha=o;});V.fades.set(v,{targets:y}),l++;}return {ok:true,species:n,alpha:o,deep:r,filtered:!!a,plantsSeen:c,matchedPlants:u,applied:l,failed:d,totalFades:V.fades.size}}function kp(e,t={}){Qe();const n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchFadeSpecies: empty species");const o=`watchfade:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,r=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,i=V.fadeWatches.get(o);i&&clearInterval(i);const a=setInterval(()=>{De(()=>ja(n,{...t,clear:!1}));},r);return V.fadeWatches.set(o,a),{ok:true,key:o,species:n,intervalMs:r}}function Cp(e){const t=String(e||"").trim();if(!t)return  false;if(!t.startsWith("watchfade:")){const o=t.toLowerCase();let r=0;for(const[i,a]of Array.from(V.fadeWatches.entries()))i.startsWith(`watchfade:${o}:`)&&(clearInterval(a),V.fadeWatches.delete(i),r++);return r>0}const n=V.fadeWatches.get(t);return n?(clearInterval(n),V.fadeWatches.delete(t),true):false}function Dr(){const e=N;return e.$PIXI=e.PIXI||null,e.$app=V.app||null,e.$renderer=V.renderer||null,e.$stage=V.stage||null,e.$ticker=V.ticker||null,e.__MG_PIXI__={PIXI:e.$PIXI,app:e.$app,renderer:e.$renderer,stage:e.$stage,ticker:e.$ticker,ready:V.ready},e.__MG_PIXI__}function Qe(){if(!V.ready)throw new Error("MGPixi: call MGPixi.init() first")}async function Ap(e=15e3){if(V.ready)return Dr(),true;if(await Ne.init(e),V.app=Ne.app(),V.ticker=Ne.ticker(),V.renderer=Ne.renderer(),V.stage=Ne.stage(),!V.app||!V.ticker)throw new Error("MGPixi: PIXI app/ticker not found");return V.ready=true,Dr(),true}function Tp(e,t,n){Qe();const o=N.PIXI;if(!o)return;let r=V.stage.getChildByName("gemini-overlay");r||(r=new o.Container,r.name="gemini-overlay",V.stage.addChild(r));const i=n.key;let a=r.getChildByName(i);a||(a=new o.Graphics,a.name=i,r.addChild(a));const s=ze.tileToPoint(e,t);if(!s)return;a.clear(),a.lineStyle(2,n.tint??65280,n.alpha??1),a.beginFill(n.tint??65280,(n.alpha??1)*.2);const c=ze.getTransform(),u=c?Math.hypot(c.vx.x,c.vx.y):32,l=c?Math.hypot(c.vy.x,c.vy.y):32;a.drawRect(0,0,u,l),a.endFill(),a.x=s.x,a.y=s.y,c&&(a.rotation=Math.atan2(c.vx.y,c.vx.x));}function Ip(e){const t=V.stage?.getChildByName("gemini-overlay");if(!t)return  false;const n=t.getChildByName(e);return n?(t.removeChild(n),n.destroy?.(),true):false}const tn={init:Ap,ready:()=>V.ready,expose:Dr,get app(){return V.app},get renderer(){return V.renderer},get stage(){return V.stage},get ticker(){return V.ticker},get PIXI(){return N.PIXI||null},defineTileSet:pp,deleteTileSet:fp,listTileSets:gp,highlightPulse:$a,stopHighlight:yo,clearHighlights:Na,drawOverlayBox:Tp,stopOverlay:Ip,highlightMutation:Da,watchMutation:yp,stopWatchMutation:vp,inspectTile:wp,fadeSpecies:ja,clearSpeciesFade:Fa,clearFades:$r,watchFadeSpecies:kp,stopWatchFadeSpecies:Cp},Ko=N??window,Pp={sfx:"soundEffectsVolume",music:"musicVolume",ambience:"ambienceVolume"},Ep={sfx:"soundEffectsVolumeAtom",music:"musicVolumeAtom",ambience:"ambienceVolumeAtom"},Wt=.001,Ht=.2;let An=null;const U={ready:false,baseUrl:null,urls:{ambience:new Map,music:new Map},sfx:{mp3Url:null,atlasUrl:null,atlas:null,groups:new Map,buffer:null},tracks:{ambience:null,music:null},ctx:null};function ln(){if(!U.ready)throw new Error("MGAudio not ready yet")}function qo(e,t=NaN){try{const n=localStorage.getItem(e);if(n==null)return t;let o;try{o=JSON.parse(n);}catch{o=n;}if(typeof o=="number"&&Number.isFinite(o))return o;if(typeof o=="string"){const r=parseFloat(o);if(Number.isFinite(r))return r}}catch{}return t}function nn(e){const t=Pp[e],n=Ep[e];if(!t)return {atom:Ht,vol100:Tn(Ht)};const o=qo(t,NaN);if(Number.isFinite(o)){const i=Be(o,0,1);return {atom:i,vol100:Tn(i)}}if(n){const i=qo(n,NaN);if(Number.isFinite(i)){const a=Be(i,0,1);return {atom:a,vol100:Tn(a)}}}const r=Ht;return {atom:r,vol100:Tn(r)}}function Mp(e){const t=Number(e);if(!Number.isFinite(t))return null;if(t<=0)return 0;const o=(Be(t,1,100)-1)/99;return Wt+o*(Ht-Wt)}function Tn(e){const t=Be(Number(e),0,1);if(t<=Wt)return 0;const n=(t-Wt)/(Ht-Wt);return Math.round(1+n*99)}function Ga(e,t){if(t==null)return nn(e).atom;const n=Mp(t);return n===null?nn(e).atom:_l(n)}async function Ba(){const e=U.ctx;if(e)return e;const t=Ko.AudioContext||Ko.webkitAudioContext;if(!t)throw new Error("WebAudio not supported");const n=new t;return U.ctx=n,n}async function Wa(){if(U.ctx&&U.ctx.state==="suspended")try{await U.ctx.resume();}catch{}}function Lp(e){const t=new Map,n=(o,r)=>{t.has(o)||t.set(o,[]),t.get(o).push(r);};for(const o of Object.keys(e||{})){const r=/^(.*)_([A-Z])$/.exec(o);r?.[1]?n(r[1],o):n(o,o);}for(const[o,r]of Array.from(t.entries()))r.sort((i,a)=>i.localeCompare(a)),t.set(o,r);U.sfx.groups=t;}function Rp(e){const t=U.sfx.atlas;if(!t)throw new Error("SFX atlas not loaded");if(t[e])return e;const n=U.sfx.groups.get(e);if(n?.length)return n[Math.random()*n.length|0];throw new Error(`Unknown sfx/group: ${e}`)}async function _p(){if(U.sfx.buffer)return U.sfx.buffer;if(!U.sfx.mp3Url)throw new Error("SFX mp3 url missing");const e=await Ba();await Wa();const n=await(await Wi(U.sfx.mp3Url)).arrayBuffer(),o=await new Promise((r,i)=>{const a=e.decodeAudioData(n,r,i);a?.then&&a.then(r,i);});return U.sfx.buffer=o,o}async function Op(e,t={}){if(!U.ready)throw new Error("MGAudio not ready yet");const n=String(e||"").trim();if(!n)throw new Error("Missing sfx name");const o=Rp(n),r=U.sfx.atlas[o];if(!r)throw new Error(`Missing segment for sfx: ${o}`);const i=await Ba();await Wa();const a=await _p(),s=Math.max(0,+r.start||0),c=Math.max(s,+r.end||s),u=Math.max(.01,c-s),l=Ga("sfx",t.volume),d=i.createGain();d.gain.value=l,d.connect(i.destination);const p=i.createBufferSource();return p.buffer=a,p.connect(d),p.start(0,s,u),{name:o,source:p,start:s,end:c,duration:u,volume:l}}function Ha(e){if(e!=="music"&&e!=="ambience")return  false;const t=U.tracks[e];if(t){try{t.pause();}catch{}try{t.src="";}catch{}}return U.tracks[e]=null,true}function Np(e,t,n={}){if(!U.ready)throw new Error("MGAudio not ready yet");if(e!=="music"&&e!=="ambience")throw new Error(`Invalid category: ${e}`);const o=U.urls[e].get(t);if(!o)throw new Error(`Unknown ${e}: ${t}`);Ha(e);const r=new Audio(o);return r.loop=!!n.loop,r.volume=Ga(e,n.volume),r.preload="auto",r.play().catch(()=>{}),U.tracks[e]=r,r}async function $p(e,t,n={}){const o=String(e||"").trim(),r=String(t||"").trim();if(!o||!r)throw new Error("play(category, asset) missing args");if(o==="sfx")return Op(r,n);if(o==="music"||o==="ambience")return Np(o,r,n);throw new Error(`Unknown category: ${o}`)}function Dp(e,t={}){const n=String(e||"").trim();return n==="music"||n==="ambience"?Array.from(U.urls[n].keys()).sort():n==="sfx"?U.sfx.atlas?t.groups?Array.from(U.sfx.groups.keys()).sort():Object.keys(U.sfx.atlas).sort():[]:[]}function zp(){return U.tracks.music&&(U.tracks.music.volume=nn("music").atom),U.tracks.ambience&&(U.tracks.ambience.volume=nn("ambience").atom),true}function Fp(){return ln(),["sfx","music","ambience"]}function jp(){return ln(),Array.from(U.sfx.groups.keys()).sort((e,t)=>e.localeCompare(t))}function Gp(e,t){ln();const n=String(e||"").trim().toLowerCase(),o=String(t||"").trim();if(!o||n!=="music"&&n!=="ambience")return  false;const r=U.urls[n],i=o.toLowerCase();for(const a of r.keys())if(a.toLowerCase()===i)return  true;return  false}function Bp(e){ln();const t=String(e||"").trim();if(!t)return  false;const n=t.toLowerCase();for(const o of U.sfx.groups.keys())if(o.toLowerCase()===n)return  true;return  false}function Wp(e,t){ln();const n=String(e||"").trim().toLowerCase(),o=String(t||"").trim();if(!o)throw new Error("getTrackUrl(category, name) missing name");if(n!=="music"&&n!=="ambience")throw new Error(`Invalid category: ${e}`);const r=U.urls[n],i=o.toLowerCase();for(const[a,s]of r.entries())if(a.toLowerCase()===i)return s;return null}async function Hp(){return U.ready?true:An||(An=(async()=>{U.baseUrl=await At.base();const e=await Xe.load(U.baseUrl),t=Xe.getBundle(e,"audio");if(!t)throw new Error("No audio bundle in manifest");for(const n of t.assets||[])for(const o of n.src||[]){if(typeof o!="string")continue;const r=/^audio\/(ambience|music)\/(.+)\.mp3$/i.exec(o);if(r){const i=r[1].toLowerCase(),a=r[2];U.urls[i].set(a,Ue(U.baseUrl,o));continue}/^audio\/sfx\/sfx\.mp3$/i.test(o)&&(U.sfx.mp3Url=Ue(U.baseUrl,o)),/^audio\/sfx\/sfx\.json$/i.test(o)&&(U.sfx.atlasUrl=Ue(U.baseUrl,o));}if(!U.sfx.atlasUrl)throw new Error("Missing audio/sfx/sfx.json in manifest");return U.sfx.atlas=await to(U.sfx.atlasUrl),Lp(U.sfx.atlas),U.ready=true,true})(),An)}const Va={init:Hp,ready:()=>U.ready,play:$p,stop:Ha,list:Dp,refreshVolumes:zp,categoryVolume:nn,getCategories:Fp,getGroups:jp,hasTrack:Gp,hasGroup:Bp,getTrackUrl:Wp},zr=N?.document??document;let In=null;const ue={ready:false,baseUrl:null,byCat:new Map,byBase:new Map,overlay:null,live:new Set,defaultParent:null};function Vp(){if(ue.overlay)return ue.overlay;const e=zr.createElement("div");return e.id="MG_COSMETIC_OVERLAY",e.style.cssText=["position:fixed","left:0","top:0","width:100vw","height:100vh","pointer-events:none","z-index:99999999"].join(";"),zr.documentElement.appendChild(e),ue.overlay=e,e}function Up(){const e=ue.defaultParent;if(!e)return null;try{return typeof e=="function"?e():e}catch{return null}}function Fr(e){let t=String(e||"").trim();return t?(t=t.replace(/^cosmetic\//i,""),t=t.replace(/\.png$/i,""),t):""}function Kp(e,t){if(t===void 0){const i=Fr(e),a=i.indexOf("_");return a<0?{cat:"",asset:i,base:i}:{cat:i.slice(0,a),asset:i.slice(a+1),base:i}}const n=String(e||"").trim(),o=Fr(t),r=o.includes("_")?o:`${n}_${o}`;if(o.includes("_")&&!n){const i=o.indexOf("_");return {cat:o.slice(0,i),asset:o.slice(i+1),base:o}}return {cat:n,asset:o.replace(/^.+?_/,""),base:r}}function qp(){return Array.from(ue.byCat.keys()).sort((e,t)=>e.localeCompare(t))}function Yp(e){const t=ue.byCat.get(String(e||"").trim());return t?Array.from(t.keys()).sort((n,o)=>n.localeCompare(o)):[]}function jr(e,t){const{cat:n,asset:o,base:r}=Kp(e,t),i=ue.byBase.get(r);if(i)return i;const s=ue.byCat.get(n)?.get(o);if(s)return s;if(!ue.baseUrl)throw new Error("MGCosmetic not initialized");if(!r)throw new Error("Invalid cosmetic name");return Ue(ue.baseUrl,`cosmetic/${r}.png`)}function Gr(e,t,n){if(!ue.ready)throw new Error("MGCosmetic not ready yet");let o,r;typeof t=="object"&&t!==null?(o=t,r=void 0):typeof t=="string"?(r=t,o=n||{}):(r=void 0,o=n||{});const i=r!==void 0?jr(e,r):jr(e),a=zr.createElement("img");if(a.decoding="async",a.loading="eager",a.src=i,a.alt=o.alt!=null?String(o.alt):Fr(r??e),o.className&&(a.className=String(o.className)),o.width!=null&&(a.style.width=String(o.width)),o.height!=null&&(a.style.height=String(o.height)),o.opacity!=null&&(a.style.opacity=String(o.opacity)),o.style&&typeof o.style=="object")for(const[s,c]of Object.entries(o.style))try{a.style[s]=String(c);}catch{}return a}function Xp(e,t,n){let o,r;typeof t=="object"&&t!==null?(o=t,r=void 0):typeof t=="string"?(r=t,o=n||{}):(r=void 0,o=n||{});const i=o.parent||Up()||Vp(),a=r!==void 0?Gr(e,r,o):Gr(e,o);if(i===ue.overlay||o.center||o.x!=null||o.y!=null||o.absolute){a.style.position="absolute",a.style.pointerEvents="none",a.style.zIndex=String(o.zIndex??999999);const c=o.scale??1,u=o.rotation??0;if(o.center)a.style.left="50%",a.style.top="50%",a.style.transform=`translate(-50%, -50%) scale(${c}) rotate(${u}rad)`;else {const l=o.x??innerWidth/2,d=o.y??innerHeight/2;a.style.left=`${l}px`,a.style.top=`${d}px`,a.style.transform=`scale(${c}) rotate(${u}rad)`,o.anchor==="center"&&(a.style.transform=`translate(-50%, -50%) scale(${c}) rotate(${u}rad)`);}}return i.appendChild(a),ue.live.add(a),a.__mgDestroy=()=>{try{a.remove();}catch{}ue.live.delete(a);},a}function Jp(e){return ue.defaultParent=e,true}function Qp(){for(const e of Array.from(ue.live))e.__mgDestroy?.();}async function Zp(){return ue.ready?true:In||(In=(async()=>{ue.baseUrl=await At.base();const e=await Xe.load(ue.baseUrl),t=Xe.getBundle(e,"cosmetic");if(!t)throw new Error("No 'cosmetic' bundle in manifest");ue.byCat.clear(),ue.byBase.clear();for(const n of t.assets||[])for(const o of n.src||[]){if(typeof o!="string"||!/^cosmetic\/.+\.png$/i.test(o))continue;const i=o.split("/").pop().replace(/\.png$/i,""),a=i.indexOf("_");if(a<0)continue;const s=i.slice(0,a),c=i.slice(a+1),u=Ue(ue.baseUrl,o);ue.byBase.set(i,u),ue.byCat.has(s)||ue.byCat.set(s,new Map),ue.byCat.get(s).set(c,u);}return ue.ready=true,true})(),In)}const Ua={init:Zp,ready:()=>ue.ready,categories:qp,list:Yp,url:jr,create:Gr,show:Xp,attach:Jp,clear:Qp},vo="gemini:features:autoFavorite",Ka={enabled:false,mode:"simple",simple:{enabled:false,favoriteSpecies:[],favoriteMutations:[]}},bt="gemini:";function xo(e,t){try{const n=e.startsWith(bt)?e:bt+e,o=localStorage.getItem(n);return o===null?t:JSON.parse(o)}catch(n){return console.error(`[Storage] Error reading key "${e}":`,n),t}}function wo(e,t){try{const n=e.startsWith(bt)?e:bt+e,o=e.startsWith(bt)?e.slice(bt.length):e;localStorage.setItem(n,JSON.stringify(t)),window.dispatchEvent(new CustomEvent("gemini:storage:change",{detail:{key:o,value:t}}));}catch(n){console.error(`[Storage] Error writing key "${e}":`,n);}}function ct(){return xo(vo,Ka)}function So(e){wo(vo,e);}function qa(e){const n={...ct(),...e};return So(n),n}function ko(e){const t=ct();return t.mode="simple",t.simple={...t.simple,...e},So(t),t}function ef(e){ko({favoriteSpecies:e});}function tf(e){ko({favoriteMutations:e});}function nf(){return ct().enabled}function We(e,t){if(e===t)return  true;if(e===null||t===null)return e===t;if(typeof e!=typeof t)return  false;if(typeof e!="object")return e===t;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return  false;for(let a=0;a<e.length;a++)if(!We(e[a],t[a]))return  false;return  true}if(Array.isArray(e)||Array.isArray(t))return  false;const n=e,o=t,r=Object.keys(n),i=Object.keys(o);if(r.length!==i.length)return  false;for(const a of r)if(!Object.prototype.hasOwnProperty.call(o,a)||!We(n[a],o[a]))return  false;return  true}const Yo={currentGardenTile:"myCurrentGardenTileAtom",globalTileIndex:"myCurrentGlobalTileIndexAtom",gardenObject:"myCurrentGardenObjectAtom",isMature:"isGardenObjectMatureAtom",isInMyGarden:"isInMyGardenAtom",gardenName:"currentGardenNameAtom",sortedSlotIndices:"myCurrentSortedGrowSlotIndicesAtom",currentGrowSlotIndex:"myCurrentGrowSlotIndexAtom"},Xo={position:{globalIndex:null,localIndex:null},tile:{type:null,isEmpty:true},garden:{name:null,isOwner:false,playerSlotIndex:null},object:{type:null,data:null,isMature:false},plant:null};function rf(e){const t=e.currentGardenTile;return {globalIndex:e.globalTileIndex,localIndex:t?.localTileIndex??null}}function of(e){return {type:e.currentGardenTile?.tileType??null,isEmpty:e.gardenObject===null}}function af(e){const t=e.currentGardenTile;return {name:e.gardenName,isOwner:e.isInMyGarden??false,playerSlotIndex:t?.userSlotIdx??null}}function sf(e){const t=e.gardenObject;return t?{type:t.objectType,data:t,isMature:e.isMature??false}:{type:null,data:null,isMature:false}}function lf(e){const t=e.gardenObject;if(!t||t.objectType!=="plant")return null;const n=t,o=e.sortedSlotIndices??[];return {species:n.species,slots:n.slots??[],currentSlotIndex:e.currentGrowSlotIndex,sortedSlotIndices:o,nextHarvestSlotIndex:o.length>0?o[0]:null}}function Jo(e){return {position:rf(e),tile:of(e),garden:af(e),object:sf(e),plant:lf(e)}}function Qo(e){return JSON.stringify({globalIndex:e.position.globalIndex,localIndex:e.position.localIndex,tileType:e.tile.type,isEmpty:e.tile.isEmpty,gardenName:e.garden.name,isOwner:e.garden.isOwner,playerSlotIndex:e.garden.playerSlotIndex,objectType:e.object.type,isMature:e.object.isMature,plantSpecies:e.plant?.species??null,slotCount:e.plant?.slots.length??0})}function cf(e,t){return e.type!==t.type||e.isMature!==t.isMature?true:e.data===null&&t.data===null?false:e.data===null||t.data===null?true:!We(e.data,t.data)}function df(e,t){return e===null&&t===null?false:e===null||t===null||e.species!==t.species||e.currentSlotIndex!==t.currentSlotIndex||e.nextHarvestSlotIndex!==t.nextHarvestSlotIndex||e.slots.length!==t.slots.length?true:!We(e.sortedSlotIndices,t.sortedSlotIndices)}function uf(e,t){return e.name!==t.name||e.isOwner!==t.isOwner||e.playerSlotIndex!==t.playerSlotIndex}function pf(){let e=Xo,t=Xo,n=false;const o=[],r={all:new Set,stable:new Set,object:new Set,plantInfo:new Set,garden:new Set},i={},a=Object.keys(Yo),s=new Set;function c(){if(s.size<a.length)return;const l=Jo(i);if(!We(e,l)&&(t=e,e=l,!!n)){for(const d of r.all)d(e,t);if(Qo(t)!==Qo(e))for(const d of r.stable)d(e,t);if(cf(t.object,e.object)){const d={current:e.object,previous:t.object};for(const p of r.object)p(d);}if(df(t.plant,e.plant)){const d={current:e.plant,previous:t.plant};for(const p of r.plantInfo)p(d);}if(uf(t.garden,e.garden)){const d={current:e.garden,previous:t.garden};for(const p of r.garden)p(d);}}}async function u(){if(n)return;const l=a.map(async d=>{const p=Yo[d],f=await fe.subscribe(p,g=>{i[d]=g,s.add(d),c();});o.push(f);});await Promise.all(l),n=true,s.size===a.length&&(e=Jo(i));}return u(),{get(){return e},subscribe(l,d){return r.all.add(l),d?.immediate!==false&&n&&s.size===a.length&&l(e,e),()=>r.all.delete(l)},subscribeStable(l,d){return r.stable.add(l),d?.immediate!==false&&n&&s.size===a.length&&l(e,e),()=>r.stable.delete(l)},subscribeObject(l,d){return r.object.add(l),d?.immediate&&n&&s.size===a.length&&l({current:e.object,previous:e.object}),()=>r.object.delete(l)},subscribePlantInfo(l,d){return r.plantInfo.add(l),d?.immediate&&n&&s.size===a.length&&l({current:e.plant,previous:e.plant}),()=>r.plantInfo.delete(l)},subscribeGarden(l,d){return r.garden.add(l),d?.immediate&&n&&s.size===a.length&&l({current:e.garden,previous:e.garden}),()=>r.garden.delete(l)},destroy(){for(const l of o)l();o.length=0,r.all.clear(),r.stable.clear(),r.object.clear(),r.plantInfo.clear(),r.garden.clear(),n=false;}}}let ur=null;function ff(){return ur||(ur=pf()),ur}const yt={Gold:25,Rainbow:50,Frozen:10,Chilled:5,Wet:2},gf=new Set(["Gold","Rainbow"]),mf=new Set(["Frozen","Chilled","Wet"]);function Ya(e){let t=1,n=0,o=0;for(const r of e)r==="Gold"||r==="Rainbow"?r==="Rainbow"?t=yt.Rainbow:t===1&&(t=yt.Gold):r in yt&&(n+=yt[r],o++);return t*(1+n-o)}function Xa(e){return yt[e]??null}function Ja(e){return gf.has(e)}function hf(e){return mf.has(e)}function bf(){return Object.keys(yt)}function yf(e){const t=Xa(e);return t===null?null:{name:e,value:t,type:Ja(e)?"growth":"environmental"}}function vf(e,t){const n=Co(e);if(!n)return 50;const o=n.maxScale;if(t<=1)return 50;if(t>=o)return 100;const r=(t-1)/(o-1);return Math.floor(50+50*r)}function Qa(e,t,n){const o=Co(e);if(!o)return 0;const r=o.baseSellPrice,i=Ya(n);return Math.round(r*t*i)}function xf(e,t,n){if(n>=t)return 100;if(n<=e)return 0;const o=t-e,r=n-e;return Math.floor(r/o*100)}function wf(e,t){return t>=e}function Sf(e,t){const n=Math.max(0,e-t);return Math.floor(n/1e3)}function Co(e){const t=me.get("plants");if(!t)return null;const n=t[e];return n?.crop?{baseSellPrice:n.crop.baseSellPrice??0,maxScale:n.crop.maxScale??1,growTime:n.crop.growTime??0}:null}function kf(e){return e.reduce((t,n)=>t+Qa(n.species,n.targetScale,n.mutations),0)}const Za=3600,pr=80,Cf=100,zt=30;function Qn(e){return e/Za}function Zn(e,t){const n=Pt(e);if(!n)return pr;const o=n.maxScale;if(t<=1)return pr;if(t>=o)return Cf;const r=(t-1)/(o-1);return Math.floor(pr+20*r)}function er(e,t,n){const o=Pt(e);if(!o)return n-zt;const r=o.hoursToMature,i=t/Za,a=zt/r,s=Math.min(a*i,zt),c=n-zt;return Math.floor(c+s)}function tr(e,t){const n=Pt(e);return n?t>=n.hoursToMature:false}function es(e){const t=Pt(e);return t?zt/t.hoursToMature:0}function ts(e,t,n){const o=t-e;return o<=0||n<=0?0:o/n}function Af(e,t){const n=Pt(e);if(!n)return 0;const o=n.hoursToMature-t;return Math.max(0,o)}function Pt(e){const t=me.get("pets");if(!t)return null;const n=t[e];return n?{hoursToMature:n.hoursToMature??0,maxScale:n.maxScale??1,abilities:n.abilities??[]}:null}function ns(e,t){return t<=0?1:Math.min(1,e/t)}const Tf=Object.freeze(Object.defineProperty({__proto__:null,calculateCropProgress:xf,calculateCropSellPrice:Qa,calculateCropSize:vf,calculateCurrentStrength:er,calculateHoursToMature:Af,calculateHoursToMaxStrength:ts,calculateMaxStrength:Zn,calculateMutationMultiplier:Ya,calculatePetAge:Qn,calculateStrengthPerHour:es,calculateStrengthProgress:ns,calculateTimeRemaining:Sf,calculateTotalCropValue:kf,getAllMutationNames:bf,getCropData:Co,getMutationInfo:yf,getMutationValue:Xa,getPetData:Pt,isCropReady:wf,isEnvironmentalMutation:hf,isGrowthMutation:Ja,isPetMature:tr},Symbol.toStringTag,{value:"Module"})),Zo={inventory:"myPetInventoryAtom",hutch:"myPetHutchPetItemsAtom",active:"myPetInfosAtom",slotInfos:"myPetSlotInfosAtom",expandedPetSlotId:"expandedPetSlotIdAtom"};function ei(e,t){const n=Qn(e.xp),o=Zn(e.petSpecies,e.targetScale),r=er(e.petSpecies,e.xp,o),i=tr(e.petSpecies,n);return {id:e.id,petSpecies:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,mutations:[...e.mutations],targetScale:e.targetScale,abilities:[...e.abilities],location:t,position:null,lastAbilityTrigger:null,growthStage:n,currentStrength:r,maxStrength:o,isMature:i}}function If(e,t){const o=t[e.slot.id]?.lastAbilityTrigger??null,r=Qn(e.slot.xp),i=Zn(e.slot.petSpecies,e.slot.targetScale),a=er(e.slot.petSpecies,e.slot.xp,i),s=tr(e.slot.petSpecies,r);return {id:e.slot.id,petSpecies:e.slot.petSpecies,name:e.slot.name,xp:e.slot.xp,hunger:e.slot.hunger,mutations:[...e.slot.mutations],targetScale:e.slot.targetScale,abilities:[...e.slot.abilities],location:"active",position:e.position?{x:e.position.x,y:e.position.y}:null,lastAbilityTrigger:o,growthStage:r,currentStrength:a,maxStrength:i,isMature:s}}function ti(e){const t=new Set,n=[];for(const c of e.active??[]){const u=If(c,e.slotInfos??{});n.push(u),t.add(u.id);}const o=[];for(const c of e.inventory??[]){if(t.has(c.id))continue;const u=ei(c,"inventory");o.push(u),t.add(u.id);}const r=[];for(const c of e.hutch??[]){if(t.has(c.id))continue;const u=ei(c,"hutch");r.push(u),t.add(u.id);}const i=[...n,...o,...r],a=e.expandedPetSlotId??null,s=a?i.find(c=>c.id===a)??null:null;return {all:i,byLocation:{inventory:o,hutch:r,active:n},counts:{inventory:o.length,hutch:r.length,active:n.length,total:i.length},expandedPetSlotId:a,expandedPet:s}}const ni={all:[],byLocation:{inventory:[],hutch:[],active:[]},counts:{inventory:0,hutch:0,active:0,total:0},expandedPetSlotId:null,expandedPet:null};function Pf(e,t){if(e.length!==t.length)return  false;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return  false;return  true}function ri(e){return JSON.stringify({id:e.id,petSpecies:e.petSpecies,name:e.name,mutations:e.mutations,abilities:e.abilities,location:e.location})}function Ef(e,t){if(e.all.length!==t.all.length)return  false;const n=e.all.map(ri),o=t.all.map(ri);return Pf(n,o)}function Mf(e,t){const n=[],o=new Map(e.all.map(r=>[r.id,r]));for(const r of t.all){const i=o.get(r.id);i&&i.location!==r.location&&n.push({pet:r,from:i.location,to:r.location});}return n}function Lf(e,t){const n=[],o=new Map(e.all.map(r=>[r.id,r]));for(const r of t.all){if(!r.lastAbilityTrigger)continue;const a=o.get(r.id)?.lastAbilityTrigger;(!a||a.abilityId!==r.lastAbilityTrigger.abilityId||a.performedAt!==r.lastAbilityTrigger.performedAt)&&n.push({pet:r,trigger:r.lastAbilityTrigger});}return n}function Rf(e,t){const n=new Set(e.all.map(a=>a.id)),o=new Set(t.all.map(a=>a.id)),r=t.all.filter(a=>!n.has(a.id)),i=e.all.filter(a=>!o.has(a.id));return r.length===0&&i.length===0?null:{added:r,removed:i,counts:t.counts}}function _f(e,t){const n=[],o=new Map(e.all.map(r=>[r.id,r]));for(const r of t.all){const i=o.get(r.id);i&&r.growthStage>i.growthStage&&n.push({pet:r,previousStage:i.growthStage,newStage:r.growthStage});}return n}function Of(e,t){const n=[],o=new Map(e.all.map(r=>[r.id,r]));for(const r of t.all){const i=o.get(r.id);i&&r.currentStrength>i.currentStrength&&n.push({pet:r,previousStrength:i.currentStrength,newStrength:r.currentStrength});}return n}function Nf(e,t){const n=[],o=new Map(e.all.map(r=>[r.id,r]));for(const r of t.all){const i=o.get(r.id);i&&r.currentStrength===r.maxStrength&&i.currentStrength<i.maxStrength&&n.push({pet:r});}return n}function $f(){let e=ni,t=ni,n=false;const o=[],r={all:new Set,stable:new Set,location:new Set,ability:new Set,count:new Set,expandedPet:new Set,growth:new Set,strengthGain:new Set,maxStrength:new Set},i={},a=Object.keys(Zo),s=new Set;function c(){if(s.size<a.length)return;const l=ti(i);if(We(e,l)||(t=e,e=l,!n))return;for(const v of r.all)v(e,t);if(!Ef(t,e))for(const v of r.stable)v(e,t);const d=Mf(t,e);for(const v of d)for(const S of r.location)S(v);const p=Lf(t,e);for(const v of p)for(const S of r.ability)S(v);const f=Rf(t,e);if(f)for(const v of r.count)v(f);const g=_f(t,e);for(const v of g)for(const S of r.growth)S(v);const b=Of(t,e);for(const v of b)for(const S of r.strengthGain)S(v);const m=Nf(t,e);for(const v of m)for(const S of r.maxStrength)S(v);if(t.expandedPetSlotId!==e.expandedPetSlotId){const v={current:e.expandedPet,previous:t.expandedPet,currentId:e.expandedPetSlotId,previousId:t.expandedPetSlotId};for(const S of r.expandedPet)S(v);}}async function u(){if(n)return;const l=a.map(async d=>{const p=Zo[d],f=await fe.subscribe(p,g=>{i[d]=g,s.add(d),c();});o.push(f);});await Promise.all(l),n=true,s.size===a.length&&(e=ti(i));}return u(),{get(){return e},subscribe(l,d){return r.all.add(l),d?.immediate!==false&&n&&s.size===a.length&&l(e,e),()=>r.all.delete(l)},subscribeStable(l,d){return r.stable.add(l),d?.immediate!==false&&n&&s.size===a.length&&l(e,e),()=>r.stable.delete(l)},subscribeLocation(l,d){if(r.location.add(l),d?.immediate&&n&&s.size===a.length)for(const p of e.all)l({pet:p,from:p.location,to:p.location});return ()=>r.location.delete(l)},subscribeAbility(l,d){if(r.ability.add(l),d?.immediate&&n&&s.size===a.length)for(const p of e.all)p.lastAbilityTrigger&&l({pet:p,trigger:p.lastAbilityTrigger});return ()=>r.ability.delete(l)},subscribeCount(l,d){return r.count.add(l),d?.immediate&&n&&s.size===a.length&&l({added:e.all,removed:[],counts:e.counts}),()=>r.count.delete(l)},subscribeExpandedPet(l,d){return r.expandedPet.add(l),d?.immediate&&n&&s.size===a.length&&l({current:e.expandedPet,previous:e.expandedPet,currentId:e.expandedPetSlotId,previousId:e.expandedPetSlotId}),()=>r.expandedPet.delete(l)},subscribeGrowth(l,d){if(r.growth.add(l),d?.immediate&&n&&s.size===a.length)for(const p of e.all)l({pet:p,previousStage:p.growthStage,newStage:p.growthStage});return ()=>r.growth.delete(l)},subscribeStrengthGain(l,d){if(r.strengthGain.add(l),d?.immediate&&n&&s.size===a.length)for(const p of e.all)l({pet:p,previousStrength:p.currentStrength,newStrength:p.currentStrength});return ()=>r.strengthGain.delete(l)},subscribeMaxStrength(l,d){if(r.maxStrength.add(l),d?.immediate&&n&&s.size===a.length)for(const p of e.all)p.currentStrength===p.maxStrength&&l({pet:p});return ()=>r.maxStrength.delete(l)},destroy(){for(const l of o)l();o.length=0,r.all.clear(),r.stable.clear(),r.location.clear(),r.ability.clear(),r.count.clear(),r.expandedPet.clear(),r.growth.clear(),r.strengthGain.clear(),r.maxStrength.clear(),n=false;}}}let fr=null;function Df(){return fr||(fr=$f()),fr}function zf(){let e=null;const t=[],n=new Set,o={},r=new Set,i=2;function a(d,p){return {x:p%d,y:Math.floor(p/d)}}function s(d,p,f){return f*d+p}function c(d,p){const{cols:f,rows:g}=d,b=f*g,m=new Set,v=new Set,S=new Map,y=[],x=d.userSlotIdxAndDirtTileIdxToGlobalTileIdx??[],A=d.userSlotIdxAndBoardwalkTileIdxToGlobalTileIdx??[],w=Math.max(x.length,A.length);for(let k=0;k<w;k++){const E=x[k]??[],M=A[k]??[],G=E.map((P,D)=>(m.add(P),S.set(P,k),{globalIndex:P,localIndex:D,position:a(f,P)})),Q=M.map((P,D)=>(v.add(P),S.set(P,k),{globalIndex:P,localIndex:D,position:a(f,P)}));y.push({userSlotIdx:k,dirtTiles:G,boardwalkTiles:Q,allTiles:[...G,...Q]});}const T=d.spawnTiles.map(k=>a(f,k)),I={};if(d.locations)for(const[k,E]of Object.entries(d.locations)){const M=E.spawnTileIdx??[];I[k]={name:k,spawnTiles:M,spawnPositions:M.map(G=>a(f,G))};}return {cols:f,rows:g,totalTiles:b,tileSize:p,spawnTiles:d.spawnTiles,spawnPositions:T,locations:I,userSlots:y,globalToXY(k){return a(f,k)},xyToGlobal(k,E){return s(f,k,E)},getTileOwner(k){return S.get(k)??null},isDirtTile(k){return m.has(k)},isBoardwalkTile(k){return v.has(k)}}}function u(){if(r.size<i||e)return;const d=o.map,p=o.tileSize??0;if(d){e=c(d,p);for(const f of n)f(e);n.clear();}}async function l(){const d=await fe.subscribe("mapAtom",f=>{o.map=f,r.add("map"),u();});t.push(d);const p=await fe.subscribe("tileSizeAtom",f=>{o.tileSize=f,r.add("tileSize"),u();});t.push(p);}return l(),{get(){return e},isReady(){return e!==null},onReady(d,p){return e?(p?.immediate!==false&&d(e),()=>{}):(n.add(d),()=>n.delete(d))},destroy(){for(const d of t)d();t.length=0,e=null,n.clear();}}}let gr=null;function Br(){return gr||(gr=zf()),gr}const oi={inventory:"myInventoryAtom",isFull:"isMyInventoryAtMaxLengthAtom",selectedItemIndex:"myPossiblyNoLongerValidSelectedItemIndexAtom"},ii={items:[],favoritedItemIds:[],count:0,isFull:false,selectedItem:null};function ai(e){const t=e.inventory,n=t?.items??[],o=t?.favoritedItemIds??[],r=e.selectedItemIndex;let i=null;return r!==null&&r>=0&&r<n.length&&(i={index:r,item:n[r]}),{items:n,favoritedItemIds:o,count:n.length,isFull:e.isFull??false,selectedItem:i}}function si(e){const t=e.items.map(n=>"id"in n?n.id:"species"in n&&n.itemType==="Seed"?`seed:${n.species}:${n.quantity}`:"toolId"in n?`tool:${n.toolId}:${n.quantity}`:"eggId"in n?`egg:${n.eggId}:${n.quantity}`:"decorId"in n?`decor:${n.decorId}:${n.quantity}`:JSON.stringify(n));return JSON.stringify({itemKeys:t,favoritedItemIds:e.favoritedItemIds,isFull:e.isFull,selectedItemIndex:e.selectedItem?.index??null})}function Ff(e,t){return si(e)===si(t)}function jf(e,t){return e===null&&t===null?false:e===null||t===null?true:e.index!==t.index}function Pn(e){return "id"in e?e.id:"species"in e&&e.itemType==="Seed"?`seed:${e.species}`:"toolId"in e?`tool:${e.toolId}`:"eggId"in e?`egg:${e.eggId}`:"decorId"in e?`decor:${e.decorId}`:JSON.stringify(e)}function Gf(e,t){const n=new Set(e.map(Pn)),o=new Set(t.map(Pn)),r=t.filter(a=>!n.has(Pn(a))),i=e.filter(a=>!o.has(Pn(a)));return r.length===0&&i.length===0?null:{added:r,removed:i,counts:{before:e.length,after:t.length}}}function Bf(e,t){const n=new Set(e),o=new Set(t),r=t.filter(a=>!n.has(a)),i=e.filter(a=>!o.has(a));return r.length===0&&i.length===0?null:{added:r,removed:i,current:t}}function Wf(){let e=ii,t=ii,n=false;const o=[],r={all:new Set,stable:new Set,selection:new Set,items:new Set,favorites:new Set},i={},a=Object.keys(oi),s=new Set;function c(){if(s.size<a.length)return;const l=ai(i);if(We(e,l)||(t=e,e=l,!n))return;for(const f of r.all)f(e,t);if(!Ff(t,e))for(const f of r.stable)f(e,t);if(jf(t.selectedItem,e.selectedItem)){const f={current:e.selectedItem,previous:t.selectedItem};for(const g of r.selection)g(f);}const d=Gf(t.items,e.items);if(d)for(const f of r.items)f(d);const p=Bf(t.favoritedItemIds,e.favoritedItemIds);if(p)for(const f of r.favorites)f(p);}async function u(){if(n)return;const l=a.map(async d=>{const p=oi[d],f=await fe.subscribe(p,g=>{i[d]=g,s.add(d),c();});o.push(f);});await Promise.all(l),n=true,s.size===a.length&&(e=ai(i));}return u(),{get(){return e},subscribe(l,d){return r.all.add(l),d?.immediate!==false&&n&&s.size===a.length&&l(e,e),()=>r.all.delete(l)},subscribeStable(l,d){return r.stable.add(l),d?.immediate!==false&&n&&s.size===a.length&&l(e,e),()=>r.stable.delete(l)},subscribeSelection(l,d){return r.selection.add(l),d?.immediate&&n&&s.size===a.length&&l({current:e.selectedItem,previous:e.selectedItem}),()=>r.selection.delete(l)},subscribeItems(l,d){return r.items.add(l),d?.immediate&&n&&s.size===a.length&&l({added:e.items,removed:[],counts:{before:0,after:e.count}}),()=>r.items.delete(l)},subscribeFavorites(l,d){return r.favorites.add(l),d?.immediate&&n&&s.size===a.length&&l({added:e.favoritedItemIds,removed:[],current:e.favoritedItemIds}),()=>r.favorites.delete(l)},destroy(){for(const l of o)l();o.length=0,r.all.clear(),r.stable.clear(),r.selection.clear(),r.items.clear(),r.favorites.clear(),n=false;}}}let mr=null;function rs(){return mr||(mr=Wf()),mr}const Wr={all:[],host:null,myPlayer:null,count:0};function Hf(e,t,n){const o=n.get(e.id),r=o?.slot,i=r?.data,a=r?.lastActionEvent;return {id:e.id,name:e.name,discordId:e.databaseUserId,discordAvatarUrl:e.discordAvatarUrl,guildId:e.guildId,isConnected:e.isConnected,isHost:e.id===t,slotIndex:o?.index??null,position:r?.position??null,cosmetic:{color:e.cosmetic?.color??"",avatar:e.cosmetic?.avatar?[...e.cosmetic.avatar]:[]},emote:{type:e.emoteData?.emoteType??-1},coins:i?.coinsCount??0,inventory:i?.inventory??null,shopPurchases:i?.shopPurchases??null,garden:i?.garden??null,pets:{slots:i?.petSlots??[],slotInfos:r?.petSlotInfos??null},journal:i?.journal??null,stats:i?.stats??null,tasksCompleted:i?.tasksCompleted??[],activityLogs:i?.activityLogs??[],customRestocks:{config:i?.customRestocks??null,inventories:r?.customRestockInventories??null},lastAction:a?{type:a.action,data:a.data,timestamp:a.timestamp}:null,selectedItemIndex:r?.notAuthoritative_selectedItemIndex??null,lastSlotMachineInfo:r?.lastSlotMachineInfo??null}}function li(e){const t=e.players,n=e.hostPlayerId??"",o=e.userSlots??[];if(!t||!Array.isArray(t)||t.length===0)return Wr;const r=new Map;Array.isArray(o)&&o.forEach((c,u)=>{c?.type==="user"&&c?.playerId&&r.set(c.playerId,{slot:c,index:u});});const i=t.map(c=>Hf(c,n,r)),a=i.find(c=>c.isHost)??null,s=i.find(c=>c.slotIndex!==null&&c.slotIndex>=0)??null;return {all:i,host:a,myPlayer:s,count:i.length}}function ci(e){const t=e.all.map(n=>`${n.id}:${n.isConnected}:${n.isHost}`);return JSON.stringify({playerKeys:t,hostId:e.host?.id??null,count:e.count})}function Vf(e,t){const n=[],o=new Set(e.map(i=>i.id)),r=new Set(t.map(i=>i.id));for(const i of t)o.has(i.id)||n.push({player:i,type:"join"});for(const i of e)r.has(i.id)||n.push({player:i,type:"leave"});return n}function Uf(e,t){const n=[],o=new Map(e.map(r=>[r.id,r]));for(const r of t){const i=o.get(r.id);i&&i.isConnected!==r.isConnected&&n.push({player:r,isConnected:r.isConnected});}return n}function Kf(){let e=Wr,t=Wr,n=false;const o=[],r={all:new Set,stable:new Set,joinLeave:new Set,connection:new Set,host:new Set},i={},a=new Set,s=3;function c(){if(a.size<s)return;const l=li(i);if(We(e,l)||(t=e,e=l,!n))return;for(const b of r.all)b(e,t);if(ci(t)!==ci(e))for(const b of r.stable)b(e,t);const d=Vf(t.all,e.all);for(const b of d)for(const m of r.joinLeave)m(b);const p=Uf(t.all,e.all);for(const b of p)for(const m of r.connection)m(b);const f=t.host?.id??null,g=e.host?.id??null;if(f!==g){const b={current:e.host,previous:t.host};for(const m of r.host)m(b);}}async function u(){if(n)return;const l=await vu.onChangeNow(f=>{i.players=f,a.add("players"),c();});o.push(l);const d=await xu.onChangeNow(f=>{i.hostPlayerId=f,a.add("hostPlayerId"),c();});o.push(d);const p=await yu.onChangeNow(f=>{i.userSlots=f,a.add("userSlots"),c();});o.push(p),n=true,a.size===s&&(e=li(i));}return u(),{get(){return e},subscribe(l,d){return r.all.add(l),d?.immediate!==false&&n&&a.size===s&&l(e,e),()=>r.all.delete(l)},subscribeStable(l,d){return r.stable.add(l),d?.immediate!==false&&n&&a.size===s&&l(e,e),()=>r.stable.delete(l)},subscribeJoinLeave(l,d){if(r.joinLeave.add(l),d?.immediate&&n&&a.size===s)for(const p of e.all)l({player:p,type:"join"});return ()=>r.joinLeave.delete(l)},subscribeConnection(l,d){if(r.connection.add(l),d?.immediate&&n&&a.size===s)for(const p of e.all)l({player:p,isConnected:p.isConnected});return ()=>r.connection.delete(l)},subscribeHost(l,d){return r.host.add(l),d?.immediate&&n&&a.size===s&&l({current:e.host,previous:e.host}),()=>r.host.delete(l)},destroy(){for(const l of o)l();o.length=0,r.all.clear(),r.stable.clear(),r.joinLeave.clear(),r.connection.clear(),r.host.clear(),n=false;}}}let hr=null;function qf(){return hr||(hr=Kf()),hr}const cn=["seed","tool","egg","decor"];function Yf(e,t){switch(t){case "seed":return e.species??e.itemType;case "tool":return e.toolId??e.itemType;case "egg":return e.eggId??e.itemType;case "decor":return e.decorId??e.itemType;default:return e.itemType}}function Xf(e,t,n){const o=Yf(e,t),r=n[o]??0,i=Math.max(0,e.initialStock-r);return {id:o,itemType:e.itemType,initialStock:e.initialStock,purchased:r,remaining:i,isAvailable:i>0}}function Jf(e,t,n){if(!t)return {type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null};const r=n[e]?.purchases??{},i=(t.inventory??[]).map(u=>Xf(u,e,r)),a=i.filter(u=>u.isAvailable).length,s=t.secondsUntilRestock??0,c=s>0?Date.now()+s*1e3:null;return {type:e,items:i,availableCount:a,totalCount:i.length,secondsUntilRestock:s,restockAt:c}}function di(e){const t=e.shops,n=e.purchases??{},o=cn.map(s=>Jf(s,t?.[s],n)),r={seed:o[0],tool:o[1],egg:o[2],decor:o[3]},i=o.filter(s=>s.restockAt!==null);let a=null;if(i.length>0){const c=i.sort((u,l)=>(u.restockAt??0)-(l.restockAt??0))[0];a={shop:c.type,seconds:c.secondsUntilRestock,at:c.restockAt};}return {all:o,byType:r,nextRestock:a}}const ui={all:cn.map(e=>({type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null})),byType:{seed:{type:"seed",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},tool:{type:"tool",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},egg:{type:"egg",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},decor:{type:"decor",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null}},nextRestock:null};function pi(e){return JSON.stringify({shops:e.all.map(t=>({type:t.type,itemCount:t.items.length,availableCount:t.availableCount}))})}function Qf(e,t){const n=e.secondsUntilRestock,o=t.secondsUntilRestock;return n>0&&n<=5&&o>n||n>0&&o===0&&t.items.some(i=>i.purchased===0)?{shop:t,previousItems:e.items}:null}function Zf(e,t){const n=[];for(const o of cn){const r=e.byType[o],i=t.byType[o],a=new Map(r.items.map(s=>[s.id,s]));for(const s of i.items){const c=a.get(s.id);c&&s.purchased>c.purchased&&n.push({shopType:o,itemId:s.id,quantity:s.purchased-c.purchased,newPurchased:s.purchased,remaining:s.remaining});}}return n}function eg(e,t){const n=[];for(const o of cn){const r=e.byType[o],i=t.byType[o],a=new Map(r.items.map(s=>[s.id,s]));for(const s of i.items){const c=a.get(s.id);c&&c.isAvailable!==s.isAvailable&&n.push({shopType:o,itemId:s.id,wasAvailable:c.isAvailable,isAvailable:s.isAvailable});}}return n}function tg(){let e=ui,t=ui,n=false;const o=[],r={all:new Set,stable:new Set,seedRestock:new Set,toolRestock:new Set,eggRestock:new Set,decorRestock:new Set,purchase:new Set,availability:new Set},i={},a=new Set,s=2;function c(){if(a.size<s)return;const l=di(i);if(We(e,l)||(t=e,e=l,!n))return;for(const g of r.all)g(e,t);if(pi(t)!==pi(e))for(const g of r.stable)g(e,t);const d={seed:r.seedRestock,tool:r.toolRestock,egg:r.eggRestock,decor:r.decorRestock};for(const g of cn){const b=Qf(t.byType[g],e.byType[g]);if(b)for(const m of d[g])m(b);}const p=Zf(t,e);for(const g of p)for(const b of r.purchase)b(g);const f=eg(t,e);for(const g of f)for(const b of r.availability)b(g);}async function u(){if(n)return;const l=await Su.onChangeNow(p=>{i.shops=p,a.add("shops"),c();});o.push(l);const d=await ku.onChangeNow(p=>{i.purchases=p,a.add("purchases"),c();});o.push(d),n=true,a.size===s&&(e=di(i));}return u(),{get(){return e},getShop(l){return e.byType[l]},getItem(l,d){return e.byType[l].items.find(f=>f.id===d)??null},subscribe(l,d){return r.all.add(l),d?.immediate!==false&&n&&a.size===s&&l(e,e),()=>r.all.delete(l)},subscribeStable(l,d){return r.stable.add(l),d?.immediate!==false&&n&&a.size===s&&l(e,e),()=>r.stable.delete(l)},subscribeSeedRestock(l,d){return r.seedRestock.add(l),d?.immediate&&n&&a.size===s&&l({shop:e.byType.seed,previousItems:[]}),()=>r.seedRestock.delete(l)},subscribeToolRestock(l,d){return r.toolRestock.add(l),d?.immediate&&n&&a.size===s&&l({shop:e.byType.tool,previousItems:[]}),()=>r.toolRestock.delete(l)},subscribeEggRestock(l,d){return r.eggRestock.add(l),d?.immediate&&n&&a.size===s&&l({shop:e.byType.egg,previousItems:[]}),()=>r.eggRestock.delete(l)},subscribeDecorRestock(l,d){return r.decorRestock.add(l),d?.immediate&&n&&a.size===s&&l({shop:e.byType.decor,previousItems:[]}),()=>r.decorRestock.delete(l)},subscribePurchase(l,d){if(r.purchase.add(l),d?.immediate&&n&&a.size===s)for(const p of e.all)for(const f of p.items)f.purchased>0&&l({shopType:p.type,itemId:f.id,quantity:f.purchased,newPurchased:f.purchased,remaining:f.remaining});return ()=>r.purchase.delete(l)},subscribeAvailability(l,d){if(r.availability.add(l),d?.immediate&&n&&a.size===s)for(const p of e.all)for(const f of p.items)l({shopType:p.type,itemId:f.id,wasAvailable:f.isAvailable,isAvailable:f.isAvailable});return ()=>r.availability.delete(l)},destroy(){for(const l of o)l();o.length=0,r.all.clear(),r.stable.clear(),r.seedRestock.clear(),r.toolRestock.clear(),r.eggRestock.clear(),r.decorRestock.clear(),r.purchase.clear(),r.availability.clear(),n=false;}}}let br=null;function ng(){return br||(br=tg()),br}const rg=["Sunny","Rain","Frost","Dawn","AmberMoon"];function og(e){return rg.includes(e)}const Hr={type:"Sunny",isActive:false,startTime:null,endTime:null,remainingSeconds:0};function ig(e){if(!e)return Hr;const t=Date.now(),n=e.endTime??0,o=Math.max(0,n-t),r=Math.floor(o/1e3),i=r>0,a=e.type??"Sunny";return {type:og(a)?a:"Sunny",isActive:i,startTime:e.startTime??null,endTime:e.endTime??null,remainingSeconds:r}}function ag(){let e=Hr,t=Hr,n=false,o=null;const r={all:new Set,change:new Set};function i(s){const c=ig(s);if(e.type===c.type&&e.isActive===c.isActive&&e.startTime===c.startTime&&e.endTime===c.endTime){e=c;return}if(t=e,e=c,!!n){for(const u of r.all)u(e,t);if(t.type!==e.type||t.isActive!==e.isActive){const u={current:e,previous:t};for(const l of r.change)l(u);}}}async function a(){n||(o=await Cu.onChangeNow(s=>{i(s);}),n=true);}return a(),{get(){return e},subscribe(s,c){return r.all.add(s),c?.immediate!==false&&n&&s(e,e),()=>r.all.delete(s)},subscribeChange(s,c){return r.change.add(s),c?.immediate&&n&&s({current:e,previous:e}),()=>r.change.delete(s)},destroy(){o?.(),o=null,r.all.clear(),r.change.clear(),n=false;}}}let yr=null;function sg(){return yr||(yr=ag()),yr}function lg(){const e=me.get("mutations");return e?Object.keys(e):[]}function os(){const e={};for(const t of lg())e[t]=[];return e}function Vr(){return {garden:null,mySlotIndex:null,plants:{all:[],mature:[],growing:[],bySpecies:{},count:0},crops:{all:[],mature:[],growing:[],mutated:{all:[],byMutation:os()}},eggs:{all:[],mature:[],growing:[],byType:{},count:0},decors:{tileObjects:[],boardwalk:[],all:[],byType:{},count:0},tiles:{tileObjects:[],boardwalk:[],empty:{tileObjects:[],boardwalk:[]}},counts:{plants:0,maturePlants:0,crops:0,matureCrops:0,eggs:0,matureEggs:0,decors:0,emptyTileObjects:0,emptyBoardwalk:0}}}function cg(e,t,n,o){const r=t.slots.filter(i=>o>=i.endTime).length;return {tileIndex:e,position:n,species:t.species,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:o>=t.maturedAt,slots:t.slots,slotsCount:t.slots.length,matureSlotsCount:r}}function dg(e,t,n,o,r){return {tileIndex:e,position:t,slotIndex:n,species:o.species,startTime:o.startTime,endTime:o.endTime,targetScale:o.targetScale,mutations:[...o.mutations],isMature:r>=o.endTime}}function ug(e,t,n,o){return {tileIndex:e,position:n,eggId:t.eggId,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:o>=t.maturedAt}}function fi(e,t,n,o){return {tileIndex:e,position:n,decorId:t.decorId,rotation:t.rotation,location:o}}function gi(e,t){const{garden:n,mySlotIndex:o}=e,r=Date.now();if(!n||o===null)return Vr();const i=t().get(),a=i?.userSlots[o],s=a?.dirtTiles??[],c=a?.boardwalkTiles??[],u=[],l=[],d=[],p={},f=[],g=[],b=[],m=[],v=os(),S=[],y=[],x=[],A={},w=[],T=[],I={},k=new Set,E=new Set;for(const[P,D]of Object.entries(n.tileObjects)){const B=parseInt(P,10);k.add(B);const $=i?i.globalToXY(B):{x:0,y:0};if(D.objectType==="plant"){const z=D,j=cg(P,z,$,r);u.push(j),j.isMature?l.push(j):d.push(j),p[j.species]||(p[j.species]=[]),p[j.species].push(j);for(let F=0;F<z.slots.length;F++){const _=z.slots[F],L=dg(P,$,F,_,r);if(f.push(L),L.isMature?g.push(L):b.push(L),L.mutations.length>0){m.push(L);for(const O of L.mutations)v[O]||(v[O]=[]),v[O].push(L);}}}else if(D.objectType==="egg"){const j=ug(P,D,$,r);S.push(j),A[j.eggId]||(A[j.eggId]=[]),A[j.eggId].push(j),j.isMature?y.push(j):x.push(j);}else if(D.objectType==="decor"){const j=fi(P,D,$,"tileObjects");w.push(j),I[j.decorId]||(I[j.decorId]=[]),I[j.decorId].push(j);}}for(const[P,D]of Object.entries(n.boardwalkTileObjects)){const B=parseInt(P,10);E.add(B);const $=i?i.globalToXY(B):{x:0,y:0},j=fi(P,D,$,"boardwalk");T.push(j),I[j.decorId]||(I[j.decorId]=[]),I[j.decorId].push(j);}const M=[...w,...T],G=s.filter(P=>!k.has(P.localIndex)),Q=c.filter(P=>!E.has(P.localIndex));return {garden:n,mySlotIndex:o,plants:{all:u,mature:l,growing:d,bySpecies:p,count:u.length},crops:{all:f,mature:g,growing:b,mutated:{all:m,byMutation:v}},eggs:{all:S,mature:y,growing:x,byType:A,count:S.length},decors:{tileObjects:w,boardwalk:T,all:M,byType:I,count:M.length},tiles:{tileObjects:s,boardwalk:c,empty:{tileObjects:G,boardwalk:Q}},counts:{plants:u.length,maturePlants:l.length,crops:f.length,matureCrops:g.length,eggs:S.length,matureEggs:y.length,decors:M.length,emptyTileObjects:G.length,emptyBoardwalk:Q.length}}}function mi(e){return JSON.stringify({plants:e.counts.plants,maturePlants:e.counts.maturePlants,crops:e.counts.crops,matureCrops:e.counts.matureCrops,eggs:e.counts.eggs,matureEggs:e.counts.matureEggs,decors:e.counts.decors,emptyTileObjects:e.counts.emptyTileObjects,emptyBoardwalk:e.counts.emptyBoardwalk})}function pg(e,t){const n=new Set(e.map(a=>a.tileIndex)),o=new Set(t.map(a=>a.tileIndex)),r=t.filter(a=>!n.has(a.tileIndex)),i=e.filter(a=>!o.has(a.tileIndex));return {added:r,removed:i}}function fg(e,t,n){const o=new Set(e.map(i=>i.tileIndex)),r=new Set(n.map(i=>i.tileIndex));return t.filter(i=>!o.has(i.tileIndex)&&r.has(i.tileIndex))}function gg(e,t,n){const o=new Set(e.map(i=>`${i.tileIndex}:${i.slotIndex}`)),r=new Set(n.map(i=>`${i.tileIndex}:${i.slotIndex}`));return t.filter(i=>{const a=`${i.tileIndex}:${i.slotIndex}`;return !o.has(a)&&r.has(a)})}function mg(e,t,n){const o=new Set(e.map(i=>i.tileIndex)),r=new Set(n.map(i=>i.tileIndex));return t.filter(i=>!o.has(i.tileIndex)&&r.has(i.tileIndex))}function hg(e,t){const n=[],o=new Map(e.map(r=>[r.tileIndex,r]));for(const r of t){const i=o.get(r.tileIndex);if(!i)continue;const a=Math.min(i.slots.length,r.slots.length);for(let s=0;s<a;s++){const c=new Set(i.slots[s].mutations),u=new Set(r.slots[s].mutations),l=[...u].filter(p=>!c.has(p)),d=[...c].filter(p=>!u.has(p));if(l.length>0||d.length>0){const p=Date.now(),f=r.slots[s],g={tileIndex:r.tileIndex,position:r.position,slotIndex:s,species:f.species,startTime:f.startTime,endTime:f.endTime,targetScale:f.targetScale,mutations:[...f.mutations],isMature:p>=f.endTime};n.push({crop:g,added:l,removed:d});}}}return n}function bg(e,t,n){const o=[],r=new Map(t.map(a=>[a.tileIndex,a])),i=new Map;for(const a of n)i.set(`${a.tileIndex}:${a.slotIndex}`,a);for(const a of e){const s=r.get(a.tileIndex);if(!s)continue;const c=Math.min(a.slots.length,s.slots.length);for(let u=0;u<c;u++){const l=a.slots[u],d=s.slots[u];if(l.startTime!==d.startTime){const p=i.get(`${a.tileIndex}:${u}`);if(!p||!p.isMature)continue;const f={tileIndex:a.tileIndex,position:a.position,slotIndex:u,species:l.species,startTime:l.startTime,endTime:l.endTime,targetScale:l.targetScale,mutations:[...l.mutations],isMature:true};o.push({crop:f,remainingSlots:s.slotsCount});}}if(s.slotsCount<a.slotsCount)for(let u=s.slotsCount;u<a.slotsCount;u++){const l=i.get(`${a.tileIndex}:${u}`);if(!l||!l.isMature)continue;const d=a.slots[u];if(!d)continue;const p={tileIndex:a.tileIndex,position:a.position,slotIndex:u,species:d.species,startTime:d.startTime,endTime:d.endTime,targetScale:d.targetScale,mutations:[...d.mutations],isMature:true};o.push({crop:p,remainingSlots:s.slotsCount});}}return o}function yg(e,t){const n=new Set(e.map(a=>a.tileIndex)),o=new Set(t.map(a=>a.tileIndex)),r=t.filter(a=>!n.has(a.tileIndex)),i=e.filter(a=>!o.has(a.tileIndex));return {added:r,removed:i}}function vg(e,t){const n=c=>`${c.tileIndex}:${c.location}`,o=c=>`${c.tileIndex}:${c.location}`,r=new Set(e.map(n)),i=new Set(t.map(o)),a=t.filter(c=>!r.has(o(c))),s=e.filter(c=>!i.has(n(c)));return {added:a,removed:s}}function xg(){let e=Vr(),t=Vr(),n=false;const o=[],r={all:new Set,stable:new Set,plantAdded:new Set,plantRemoved:new Set,plantMatured:new Set,cropMutated:new Set,cropMatured:new Set,cropHarvested:new Set,eggPlaced:new Set,eggRemoved:new Set,eggMatured:new Set,decorPlaced:new Set,decorRemoved:new Set},i={},a=new Set,s=2;function c(){if(a.size<s)return;const l=gi(i,Br);if(We(e,l)||(t=e,e=l,!n))return;for(const y of r.all)y(e,t);if(mi(t)!==mi(e))for(const y of r.stable)y(e,t);const d=pg(t.plants.all,e.plants.all);for(const y of d.added)for(const x of r.plantAdded)x({plant:y});for(const y of d.removed)for(const x of r.plantRemoved)x({plant:y,tileIndex:y.tileIndex});const p=fg(t.plants.mature,e.plants.mature,e.plants.all);for(const y of p)for(const x of r.plantMatured)x({plant:y});const f=hg(t.plants.all,e.plants.all);for(const y of f)for(const x of r.cropMutated)x(y);const g=gg(t.crops.mature,e.crops.mature,e.crops.all);for(const y of g)for(const x of r.cropMatured)x({crop:y});const b=bg(t.plants.all,e.plants.all,t.crops.all);for(const y of b)for(const x of r.cropHarvested)x(y);const m=yg(t.eggs.all,e.eggs.all);for(const y of m.added)for(const x of r.eggPlaced)x({egg:y});for(const y of m.removed)for(const x of r.eggRemoved)x({egg:y});const v=mg(t.eggs.mature,e.eggs.mature,e.eggs.all);for(const y of v)for(const x of r.eggMatured)x({egg:y});const S=vg(t.decors.all,e.decors.all);for(const y of S.added)for(const x of r.decorPlaced)x({decor:y});for(const y of S.removed)for(const x of r.decorRemoved)x({decor:y});}async function u(){if(n)return;const l=await wu.onChangeNow(p=>{i.garden=p,a.add("garden"),c();});o.push(l);const d=await fe.subscribe("myUserSlotIdxAtom",p=>{i.mySlotIndex=p,a.add("mySlotIndex"),c();});o.push(d),n=true,a.size===s&&(e=gi(i,Br));}return u(),{get(){return e},subscribe(l,d){return r.all.add(l),d?.immediate!==false&&n&&a.size===s&&l(e,e),()=>r.all.delete(l)},subscribeStable(l,d){return r.stable.add(l),d?.immediate!==false&&n&&a.size===s&&l(e,e),()=>r.stable.delete(l)},subscribePlantAdded(l,d){if(r.plantAdded.add(l),d?.immediate&&n&&a.size===s)for(const p of e.plants.all)l({plant:p});return ()=>r.plantAdded.delete(l)},subscribePlantRemoved(l,d){return r.plantRemoved.add(l),()=>r.plantRemoved.delete(l)},subscribePlantMatured(l,d){if(r.plantMatured.add(l),d?.immediate&&n&&a.size===s)for(const p of e.plants.mature)l({plant:p});return ()=>r.plantMatured.delete(l)},subscribeCropMutated(l,d){if(r.cropMutated.add(l),d?.immediate&&n&&a.size===s)for(const p of e.crops.mutated.all)l({crop:p,added:p.mutations,removed:[]});return ()=>r.cropMutated.delete(l)},subscribeCropMatured(l,d){if(r.cropMatured.add(l),d?.immediate&&n&&a.size===s)for(const p of e.crops.mature)l({crop:p});return ()=>r.cropMatured.delete(l)},subscribeCropHarvested(l,d){return r.cropHarvested.add(l),()=>r.cropHarvested.delete(l)},subscribeEggPlaced(l,d){if(r.eggPlaced.add(l),d?.immediate&&n&&a.size===s)for(const p of e.eggs.all)l({egg:p});return ()=>r.eggPlaced.delete(l)},subscribeEggRemoved(l,d){return r.eggRemoved.add(l),()=>r.eggRemoved.delete(l)},subscribeEggMatured(l,d){if(r.eggMatured.add(l),d?.immediate&&n&&a.size===s)for(const p of e.eggs.mature)l({egg:p});return ()=>r.eggMatured.delete(l)},subscribeDecorPlaced(l,d){if(r.decorPlaced.add(l),d?.immediate&&n&&a.size===s)for(const p of e.decors.all)l({decor:p});return ()=>r.decorPlaced.delete(l)},subscribeDecorRemoved(l,d){return r.decorRemoved.add(l),()=>r.decorRemoved.delete(l)},destroy(){for(const l of o)l();o.length=0,r.all.clear(),r.stable.clear(),r.plantAdded.clear(),r.plantRemoved.clear(),r.plantMatured.clear(),r.cropMutated.clear(),r.cropMatured.clear(),r.cropHarvested.clear(),r.eggPlaced.clear(),r.eggRemoved.clear(),r.eggMatured.clear(),r.decorPlaced.clear(),r.decorRemoved.clear(),n=false;}}}let vr=null;function wg(){return vr||(vr=xg()),vr}let Se=null;function is(){return Se||(Se={currentTile:ff(),myPets:Df(),gameMap:Br(),myInventory:rs(),players:qf(),shops:ng(),weather:sg(),myGarden:wg()},Se)}function Ve(){if(!Se)throw new Error("[Globals] Not initialized. Call initGlobals() first.");return Se}function Sg(){Se&&(Se.currentTile.destroy(),Se.myPets.destroy(),Se.gameMap.destroy(),Se.myInventory.destroy(),Se.players.destroy(),Se.shops.destroy(),Se.weather.destroy(),Se.myGarden.destroy(),Se=null);}const Ao={get currentTile(){return Ve().currentTile},get myPets(){return Ve().myPets},get gameMap(){return Ve().gameMap},get myInventory(){return Ve().myInventory},get players(){return Ve().players},get shops(){return Ve().shops},get weather(){return Ve().weather},get myGarden(){return Ve().myGarden}},kg=100,Vt=[];let Ur=null;function Cg(){const e=h("div",{className:"ws-logger",style:"display: flex; flex-direction: column; gap: 8px; font-family: monospace; font-size: 11px; height: 100%; overflow: hidden;"}),t=h("div",{style:"display: flex; justify-content: space-between; align-items: center; padding: 0 4px;"});t.appendChild(h("span",{textContent:"Live Traffic (Last 100)",style:"opacity: 0.6;"}));const n=h("button",{textContent:"Clear",style:"background: none; border: 1px solid rgba(255,255,255,0.2); color: #fff; cursor: pointer; padding: 2px 8px; border-radius: 4px; font-size: 10px;",onclick:()=>{Vt.length=0,a();}});t.appendChild(n),e.appendChild(t);const o=h("div",{style:"flex: 1; overflow-y: auto; background: #000; padding: 4px; border-radius: 4px; border: 1px solid var(--border-color); display: flex; flex-direction: column;"}),r=h("div",{style:"height: 150px; border-top: 1px solid var(--border-color); overflow: auto; background: rgba(0,0,0,0.5); padding: 8px; display: none;"}),i=h("pre",{style:"margin: 0; color: var(--color-primary); font-size: 10px;"});r.appendChild(i);const a=()=>{o.innerHTML="",Vt.slice().reverse().forEach(s=>{const c=h("div",{className:"ws-log-row",style:`padding: 4px; border-bottom: 1px solid #111; cursor: pointer; color: ${s.direction==="in"?"#4CAF50":"#2196F3"}; display: flex; gap: 8px;`}),u=new Date(s.timestamp).toLocaleTimeString([],{hour12:false,hour:"2-digit",minute:"2-digit",second:"2-digit"});c.appendChild(h("span",{textContent:u,style:"opacity: 0.4; flex-shrink: 0;"})),c.appendChild(h("strong",{textContent:s.direction.toUpperCase(),style:"width: 25px; flex-shrink: 0;"})),c.appendChild(h("span",{textContent:s.type,style:"font-weight: bold; flex-shrink: 0;"})),c.appendChild(h("span",{textContent:s.summary,style:"opacity: 0.8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"})),c.addEventListener("click",()=>{o.querySelectorAll(".ws-log-row").forEach(d=>d.style.background=""),c.style.background="rgba(255,255,255,0.1)",r.style.display="block",i.textContent=JSON.stringify(s.payload,null,2);}),o.appendChild(c);});};return Ur=a,e.appendChild(o),e.appendChild(r),a(),e}function Kr(e,t,n){let o="";if(n&&typeof n=="object"){if(t==="PartialState"){const r=n.op||"",i=n.path||"";let a="";if("value"in n){const s=n.value;a=typeof s=="object"?`{${Object.keys(s||{}).slice(0,2).join(",")}}`:String(s);}if(r||i)o=`PartialState : ${r} ${i} ${a}`.trim();else {const s=Object.keys(n).filter(c=>c!=="type");s.length>0&&(o=`PartialState - {${s.join(", ")}}`);}}if(!o&&n.event&&(o+=`${n.event} `),!o&&n.op&&(o+=`op:${n.op} `),!o&&n.data){const r=Object.keys(n.data);r.length>0&&(o+=`{${r.slice(0,3).join(",")}${r.length>3?"...":""}}`);}else !o&&Array.isArray(n)&&(o+=`[${n.length} items]`);}else typeof n=="string"&&(o=n.slice(0,50));Vt.push({direction:e,type:String(t),timestamp:Date.now(),payload:n,summary:o.trim()||"-"}),Vt.length>kg&&Vt.shift(),Ur&&Ur();}const Ae={nativeCtor:null,captured:[],latestOpen:null},hi=Symbol.for("ariesmod.ws.capture.wrapped"),bi=Symbol.for("ariesmod.ws.capture.native"),as=1;function qr(e){return !!e&&e.readyState===as}function Ag(){if(qr(Ae.latestOpen))return Ae.latestOpen;for(let e=Ae.captured.length-1;e>=0;e--){const t=Ae.captured[e];if(qr(t))return t}return null}function Tg(e,t){Ae.captured.push(e),Ae.captured.length>25&&Ae.captured.splice(0,Ae.captured.length-25);const n=()=>{Ae.latestOpen=e,t&&console.log("[WS] captured socket opened",e.url);};e.addEventListener("open",n),e.addEventListener("close",()=>{Ae.latestOpen===e&&(Ae.latestOpen=null),t&&console.log("[WS] captured socket closed",e.url);}),e.addEventListener("message",o=>{try{const r=JSON.parse(o.data);Kr("in",r.type||"unknown",r);}catch{Kr("in","raw",o.data);}}),e.readyState===as&&n();}function Ig(e=N,t={}){const n=!!t.debug,o=e?.WebSocket;if(typeof o!="function")return ()=>{};if(o[hi])return Ae.nativeCtor=o[bi]??Ae.nativeCtor??null,()=>{};const r=o;Ae.nativeCtor=r;function i(a,s){const c=s!==void 0?new r(a,s):new r(a);try{Tg(c,n);}catch{}return c}try{i.prototype=r.prototype;}catch{}try{Object.setPrototypeOf(i,r);}catch{}try{i.CONNECTING=r.CONNECTING,i.OPEN=r.OPEN,i.CLOSING=r.CLOSING,i.CLOSED=r.CLOSED;}catch{}i[hi]=true,i[bi]=r;try{e.WebSocket=i,n&&console.log("[WS] WebSocket capture installed");}catch{return ()=>{}}return ()=>{try{e.WebSocket===i&&(e.WebSocket=r);}catch{}}}function Pg(e=N){const t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function Kn(e=N){const t=Ag();if(t)return {ws:t,source:"captured"};const n=Pg(e);return n?{ws:n,source:"roomConnection"}:{ws:null,source:null}}function ss(e,t={}){const n=t.pageWindow??N,o=t.intervalMs??500,r=!!t.debug;let i=null,a=null;const s=()=>{const u=Kn(n);(u.ws!==i||u.source!==a)&&(i=u.ws,a=u.source,r&&console.log("[WS] best socket changed:",u.source,u.ws),e(u));};s();const c=setInterval(s,o);return ()=>clearInterval(c)}function Eg(e){if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return null}}function Mg(e,t=N){const n=t?.MagicCircle_RoomConnection;if(n&&typeof n.sendMessage=="function")try{return Array.isArray(e)?n.sendMessage(...e):n.sendMessage(e),{ok:!0}}catch(i){return {ok:false,reason:"error",error:i}}const{ws:o}=Kn(t);if(!o)return {ok:false,reason:"no-ws"};if(!qr(o))return {ok:false,reason:"not-open"};const r=Eg(e);if(r==null)return {ok:false,reason:"error",error:new Error("Cannot stringify message")};try{const i=JSON.parse(r);Kr("out",i.type||"unknown",i);}catch{}try{return o.send(r),{ok:!0}}catch(i){return {ok:false,reason:"error",error:i}}}function Lg(e,t={},n=N){return Mg({type:e,...t},n)}const qe={Welcome:"Welcome",PartialState:"PartialState",ServerErrorMessage:"ServerErrorMessage",Config:"Config",InappropriateContentRejected:"InappropriateContentRejected",Emote:"Emote",CurrencyTransaction:"CurrencyTransaction",Pong:"Pong"},R={Chat:"Chat",Emote:"Emote",Wish:"Wish",KickPlayer:"KickPlayer",SetPlayerData:"SetPlayerData",UsurpHost:"UsurpHost",Dev:"Dev",SetSelectedGame:"SetSelectedGame",VoteForGame:"VoteForGame",RequestGame:"RequestGame",RestartGame:"RestartGame",Ping:"Ping",PlayerPosition:"PlayerPosition",Teleport:"Teleport",CheckWeatherStatus:"CheckWeatherStatus",MoveInventoryItem:"MoveInventoryItem",DropObject:"DropObject",PickupObject:"PickupObject",ToggleFavoriteItem:"ToggleFavoriteItem",PutItemInStorage:"PutItemInStorage",RetrieveItemFromStorage:"RetrieveItemFromStorage",MoveStorageItem:"MoveStorageItem",LogItems:"LogItems",PlantSeed:"PlantSeed",WaterPlant:"WaterPlant",HarvestCrop:"HarvestCrop",SellAllCrops:"SellAllCrops",PurchaseSeed:"PurchaseSeed",PurchaseEgg:"PurchaseEgg",PurchaseTool:"PurchaseTool",PurchaseDecor:"PurchaseDecor",PlantEgg:"PlantEgg",HatchEgg:"HatchEgg",PlantGardenPlant:"PlantGardenPlant",PotPlant:"PotPlant",MutationPotion:"MutationPotion",PickupDecor:"PickupDecor",PlaceDecor:"PlaceDecor",RemoveGardenObject:"RemoveGardenObject",PlacePet:"PlacePet",FeedPet:"FeedPet",PetPositions:"PetPositions",SwapPet:"SwapPet",StorePet:"StorePet",NamePet:"NamePet",SellPet:"SellPet",ReportSpeakingStart:"ReportSpeakingStart"};var Fe=(e=>(e[e.ReconnectInitiated=4100]="ReconnectInitiated",e[e.PlayerLeftVoluntarily=4200]="PlayerLeftVoluntarily",e[e.UserSessionSuperseded=4250]="UserSessionSuperseded",e[e.ConnectionSuperseded=4300]="ConnectionSuperseded",e[e.ServerDisposed=4310]="ServerDisposed",e[e.HeartbeatExpired=4400]="HeartbeatExpired",e[e.PlayerKicked=4500]="PlayerKicked",e[e.VersionMismatch=4700]="VersionMismatch",e[e.VersionExpired=4710]="VersionExpired",e[e.AuthenticationFailure=4800]="AuthenticationFailure",e))(Fe||{});new Set(Object.values(qe));new Set(Object.values(R));const Rg=["Room","Quinoa"],_g={Room:["Room"],Quinoa:Rg};function X(e,t={},n=N){const o=t,{scopePath:r,scope:i,...a}=o,s=typeof r=="string"?r:i,c=Array.isArray(r)?r:s==="Room"||s==="Quinoa"?_g[s]:null;return Lg(e,c?{scopePath:c,...a}:a,n)}function Og(e,t=N){return X(R.Chat,{scope:"Room",message:e},t)}function Ng(e,t=N){return X(R.Emote,{scope:"Room",emoteType:e},t)}function $g(e,t=N){return X(R.Wish,{scope:"Quinoa",wish:e},t)}function Dg(e,t=N){return X(R.KickPlayer,{scope:"Room",playerId:e},t)}function zg(e,t=N){return X(R.SetPlayerData,{scope:"Room",data:e},t)}function Fg(e=N){return X(R.UsurpHost,{scope:"Quinoa"},e)}function jg(e=N){return X(R.ReportSpeakingStart,{scope:"Quinoa"},e)}function Gg(e,t=N){return X(R.SetSelectedGame,{scope:"Room",gameId:e},t)}function Bg(e,t=N){return X(R.VoteForGame,{scope:"Room",gameId:e},t)}function Wg(e,t=N){return X(R.RequestGame,{scope:"Room",gameId:e},t)}function Hg(e=N){return X(R.RestartGame,{scope:"Room"},e)}function Vg(e,t=N){return X(R.Ping,{scope:"Quinoa",id:e},t)}function ls(e,t,n=N){return X(R.PlayerPosition,{scope:"Quinoa",x:e,y:t},n)}const Ug=ls;function Kg(e,t,n=N){return X(R.Teleport,{scope:"Quinoa",x:e,y:t},n)}function qg(e=N){return X(R.CheckWeatherStatus,{scope:"Quinoa"},e)}function Yg(e,t,n=N){return X(R.MoveInventoryItem,{scope:"Quinoa",fromIndex:e,toIndex:t},n)}function Xg(e,t=N){return X(R.DropObject,{scope:"Quinoa",slotIndex:e},t)}function Jg(e,t=N){return X(R.PickupObject,{scope:"Quinoa",objectId:e},t)}function cs(e,t=N){return X(R.ToggleFavoriteItem,{scope:"Quinoa",itemId:e},t)}function Qg(e,t=N){return X(R.PutItemInStorage,{scope:"Quinoa",itemId:e},t)}function Zg(e,t=N){return X(R.RetrieveItemFromStorage,{scope:"Quinoa",itemId:e},t)}function em(e,t,n=N){return X(R.MoveStorageItem,{scope:"Quinoa",fromIndex:e,toIndex:t},n)}function tm(e=N){return X(R.LogItems,{scope:"Quinoa"},e)}function nm(e,t,n,o=N){return X(R.PlantSeed,{scope:"Quinoa",seedId:e,x:t,y:n},o)}function rm(e,t=N){return X(R.WaterPlant,{scope:"Quinoa",plantId:e},t)}function om(e,t=N){return X(R.HarvestCrop,{scope:"Quinoa",cropId:e},t)}function im(e=N){return X(R.SellAllCrops,{scope:"Quinoa"},e)}function am(e,t=N){return X(R.PurchaseDecor,{scope:"Quinoa",decorId:e},t)}function sm(e,t=N){return X(R.PurchaseEgg,{scope:"Quinoa",eggId:e},t)}function lm(e,t=N){return X(R.PurchaseTool,{scope:"Quinoa",toolId:e},t)}function cm(e,t=N){return X(R.PurchaseSeed,{scope:"Quinoa",seedId:e},t)}function dm(e,t,n,o=N){return X(R.PlantEgg,{scope:"Quinoa",eggId:e,x:t,y:n},o)}function um(e,t=N){return X(R.HatchEgg,{scope:"Quinoa",eggId:e},t)}function pm(e,t,n,o=N){return X(R.PlantGardenPlant,{scope:"Quinoa",plantId:e,x:t,y:n},o)}function fm(e,t,n=N){return X(R.PotPlant,{scope:"Quinoa",plantId:e,potId:t},n)}function gm(e,t,n=N){return X(R.MutationPotion,{scope:"Quinoa",potionId:e,targetId:t},n)}function mm(e,t=N){return X(R.PickupDecor,{scope:"Quinoa",decorInstanceId:e},t)}function hm(e,t,n,o=N){return X(R.PlaceDecor,{scope:"Quinoa",decorId:e,x:t,y:n},o)}function bm(e,t=N){return X(R.RemoveGardenObject,{scope:"Quinoa",objectId:e},t)}function ym(e,t,n,o=N){return X(R.PlacePet,{scope:"Quinoa",petId:e,x:t,y:n},o)}function vm(e,t,n=N){return X(R.FeedPet,{scope:"Quinoa",petId:e,foodItemId:t},n)}function xm(e,t=N){return X(R.PetPositions,{scope:"Quinoa",positions:e},t)}function wm(e,t,n=N){return X(R.SwapPet,{scope:"Quinoa",petIdA:e,petIdB:t},n)}function Sm(e,t=N){return X(R.StorePet,{scope:"Quinoa",petId:e},t)}function km(e,t,n=N){return X(R.NamePet,{scope:"Quinoa",petId:e,name:t},n)}function Cm(e,t=N){return X(R.SellPet,{scope:"Quinoa",petId:e},t)}let Nn=null;const Ut=new Set;function To(){const e=ct();if(!e.enabled){console.log("[AutoFavorite] Disabled");return}Ut.clear(),Nn=rs().subscribeItems(t=>{if(t.added.length>0){const n=ct();for(const o of t.added)Tm(o,n);}}),console.log(`✅ [AutoFavorite] Started - Watching ${e.simple.favoriteSpecies.length} species, ${e.simple.favoriteMutations.length} mutations`);}function ds(){Nn&&(Nn(),Nn=null),Ut.clear(),console.log("🛑 [AutoFavorite] Stopped");}function Am(e){const t=ct();t.enabled=e,t.simple.enabled=e,qa(t),e?To():ds();}function Tm(e,t){if(e.itemType!=="Produce"&&e.itemType!=="Pet")return;if(!e.id){console.warn("[AutoFavorite] Item has no ID:",e);return}if(!(Ut.has(e.id)||e.isFavorited||e.favorited)&&us(e,t.simple)){Ut.add(e.id);try{cs(e.id),console.log(`[AutoFavorite] ⭐ Favorited ${e.itemType}: ${e.species||e.id}`);}catch(o){console.error("[AutoFavorite] WebSocket error:",o),Ut.delete(e.id);}}}function us(e,t){if(!t.enabled)return  false;const n=e.itemType==="Pet"?e.petSpecies:e.species;return n?!!(t.favoriteSpecies.includes(n)||t.favoriteMutations.length>0&&(e.mutations||[]).some(r=>t.favoriteMutations.includes(r))):false}function Im(){return Object.keys(me.get("mutations")??{})}const Pm=Object.freeze(Object.defineProperty({__proto__:null,DEFAULT_CONFIG:Ka,STORAGE_KEY:vo,getGameMutations:Im,isEnabled:nf,loadConfig:ct,saveConfig:So,setEnabled:Am,setFavoriteMutations:tf,setFavoriteSpecies:ef,shouldFavorite:us,start:To,stop:ds,updateConfig:qa,updateSimpleConfig:ko},Symbol.toStringTag,{value:"Module"})),Em=`
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
`;class ps{constructor(){le(this,"achievements",new Map);le(this,"data");le(this,"storageKey","gemini_achievements");le(this,"onUnlockCallbacks",[]);le(this,"onProgressCallbacks",[]);this.data=this.loadData();}loadData(){try{const t=localStorage.getItem(this.storageKey);if(t)return JSON.parse(t)}catch(t){console.warn("[Achievements] Failed to load data:",t);}return {unlocked:{},progress:{}}}saveData(){try{localStorage.setItem(this.storageKey,JSON.stringify(this.data));}catch(t){console.warn("[Achievements] Failed to save data:",t);}}register(t){this.achievements.set(t.id,t),this.data.progress[t.id]||(this.data.progress[t.id]={current:0,target:t.target,percentage:0});}registerMany(t){for(const n of t)this.register(n);}async checkAchievement(t){const n=this.achievements.get(t);if(!n)throw new Error(`Achievement not found: ${t}`);const o=this.isUnlocked(t),r=await n.checkProgress(),i={current:r,target:n.target,percentage:Math.min(100,Math.floor(r/n.target*100))},a=this.data.progress[t];this.data.progress[t]=i;const s=r>=n.target;return !o&&s?this.unlock(t,i):s||this.triggerProgressCallbacks({achievement:n,progress:i,previousProgress:a}),this.saveData(),{id:t,wasUnlocked:o,isUnlocked:s,progress:i}}async checkAllAchievements(){const t=[];for(const n of this.achievements.keys()){const o=await this.checkAchievement(n);t.push(o);}return t}unlock(t,n){const o=this.achievements.get(t);if(!o)return;const r={achievementId:t,unlockedAt:Date.now(),progress:n};this.data.unlocked[t]=r,this.saveData(),this.triggerUnlockCallbacks({achievement:o,unlockedAt:r.unlockedAt,progress:n});}isUnlocked(t){return !!this.data.unlocked[t]}getAchievement(t){return this.achievements.get(t)||null}getAllAchievements(){return Array.from(this.achievements.values())}getAchievementsByCategory(t){return Array.from(this.achievements.values()).filter(n=>n.category===t)}getAchievementsByRarity(t){return Array.from(this.achievements.values()).filter(n=>n.rarity===t)}getUnlockedAchievements(){return Object.values(this.data.unlocked)}getLockedAchievements(){return Array.from(this.achievements.values()).filter(t=>!this.isUnlocked(t.id)&&!t.hidden)}getProgress(t){return this.data.progress[t]||null}getCompletionPercentage(){const t=this.achievements.size,n=Object.keys(this.data.unlocked).length;return t>0?Math.floor(n/t*100):0}getCompletionStats(){const t=this.achievements.size,n=Object.keys(this.data.unlocked).length,o=t-n,r=this.getCompletionPercentage();return {total:t,unlocked:n,locked:o,percentage:r}}onUnlock(t){return this.onUnlockCallbacks.push(t),()=>{const n=this.onUnlockCallbacks.indexOf(t);n!==-1&&this.onUnlockCallbacks.splice(n,1);}}onProgress(t){return this.onProgressCallbacks.push(t),()=>{const n=this.onProgressCallbacks.indexOf(t);n!==-1&&this.onProgressCallbacks.splice(n,1);}}triggerUnlockCallbacks(t){for(const n of this.onUnlockCallbacks)try{n(t);}catch(o){console.warn("[Achievements] Unlock callback error:",o);}}triggerProgressCallbacks(t){for(const n of this.onProgressCallbacks)try{n(t);}catch(o){console.warn("[Achievements] Progress callback error:",o);}}reset(){this.data={unlocked:{},progress:{}};for(const t of this.achievements.values())this.data.progress[t.id]={current:0,target:t.target,percentage:0};this.saveData();}exportData(){return JSON.stringify(this.data,null,2)}importData(t){try{const n=JSON.parse(t);return this.data=n,this.saveData(),!0}catch(n){return console.warn("[Achievements] Failed to import data:",n),false}}}let Kt=null;function Mm(){return Kt||(Kt=new ps),Kt}function Lm(){Kt&&(Kt=null);}const Rm=Object.freeze(Object.defineProperty({__proto__:null,AchievementManager:ps,destroyAchievementManager:Lm,getAchievementManager:Mm},Symbol.toStringTag,{value:"Module"}));function fs(e){const t=Qn(e.xp),n=Zn(e.petSpecies,e.targetScale),o=er(e.petSpecies,e.xp,n),r=tr(e.petSpecies,t),i=es(e.petSpecies),a=ts(o,n,i),s=ns(o,n);return {current:o,max:n,progress:s,age:t,isMature:r,strengthPerHour:i,hoursToMax:a}}function gs(e){return {...e,strength:fs(e)}}function ms(e){return e.map(gs)}function _m(e){if(e.length===0)return {averageCurrent:0,averageMax:0,totalMature:0,totalImmature:0,strongestPet:null,weakestPet:null};const t=ms(e),n=t.reduce((c,u)=>c+u.strength.current,0),o=t.reduce((c,u)=>c+u.strength.max,0),r=t.filter(c=>c.strength.isMature).length,i=t.length-r,a=t.reduce((c,u)=>u.strength.max>(c?.strength.max||0)?u:c,t[0]),s=t.reduce((c,u)=>u.strength.max<(c?.strength.max||1/0)?u:c,t[0]);return {averageCurrent:Math.round(n/t.length),averageMax:Math.round(o/t.length),totalMature:r,totalImmature:i,strongestPet:a,weakestPet:s}}const Om=Object.freeze(Object.defineProperty({__proto__:null,calculatePetStrength:fs,enrichPetWithStrength:gs,enrichPetsWithStrength:ms,getPetStrengthStats:_m},Symbol.toStringTag,{value:"Module"}));class hs{constructor(){le(this,"logs",[]);le(this,"maxLogs",1e3);le(this,"unsubscribe",null);le(this,"isInitialized",false);}init(){this.isInitialized||(this.unsubscribe=Ao.myPets.subscribeAbility(t=>{this.log({abilityId:t.trigger.abilityId||"unknown",petId:t.pet.id,petSpecies:t.pet.petSpecies,petName:t.pet.name,timestamp:t.trigger.performedAt||Date.now()});}),this.isInitialized=true);}log(t){const n={...t,id:`${t.timestamp}-${Math.random().toString(36).substr(2,9)}`};this.logs.push(n),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs));}getLogs(t){let n=this.logs;t?.abilityId&&(n=n.filter(r=>r.abilityId===t.abilityId)),t?.petId&&(n=n.filter(r=>r.petId===t.petId)),t?.petSpecies&&(n=n.filter(r=>r.petSpecies===t.petSpecies));const{since:o}=t??{};return o!==void 0&&(n=n.filter(r=>r.timestamp>=o)),t?.limit&&(n=n.slice(-t.limit)),n}getStats(t=36e5){const n=Date.now()-t,o=this.logs.filter(i=>i.timestamp>=n),r=new Map;for(const i of o){r.has(i.abilityId)||r.set(i.abilityId,{abilityId:i.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});const a=r.get(i.abilityId);a.count++,(!a.lastProc||i.timestamp>a.lastProc)&&(a.lastProc=i.timestamp);}for(const i of r.values())i.procsPerMinute=i.count/t*6e4,i.procsPerHour=i.count/t*36e5;return r}getAbilityStats(t,n=36e5){return this.getStats(n).get(t)||null}getPetStats(t,n=36e5){const o=Date.now()-n,r=this.logs.filter(a=>a.petId===t&&a.timestamp>=o),i=new Map;for(const a of r){i.has(a.abilityId)||i.set(a.abilityId,{abilityId:a.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});const s=i.get(a.abilityId);s.count++,(!s.lastProc||a.timestamp>s.lastProc)&&(s.lastProc=a.timestamp);}for(const a of i.values())a.procsPerMinute=a.count/n*6e4,a.procsPerHour=a.count/n*36e5;return {totalProcs:r.length,abilities:i}}getTopAbilities(t=10,n=36e5){return Array.from(this.getStats(n).values()).sort((r,i)=>i.count-r.count).slice(0,t)}clear(){this.logs=[];}setMaxLogs(t){this.maxLogs=t,this.logs.length>t&&(this.logs=this.logs.slice(-t));}getLogCount(){return this.logs.length}isActive(){return this.isInitialized}destroy(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null),this.logs=[],this.isInitialized=false;}}let it=null;function Nm(){return it||(it=new hs,it.init()),it}function $m(){it&&(it.destroy(),it=null);}class bs{constructor(){le(this,"stats");le(this,"storageKey","gemini_stats");this.stats=this.loadStats(),this.startSession();}loadStats(){try{const t=localStorage.getItem(this.storageKey);if(t)return JSON.parse(t)}catch(t){console.warn("[StatsTracker] Failed to load stats:",t);}return this.getDefaultStats()}saveStats(){try{localStorage.setItem(this.storageKey,JSON.stringify(this.stats));}catch(t){console.warn("[StatsTracker] Failed to save stats:",t);}}getDefaultStats(){return {session:{sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},allTime:{totalSessions:0,totalPlayTime:0,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0,crops:{},pets:{}}}}startSession(){this.stats.session={sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},this.stats.allTime.totalSessions++,this.saveStats();}endSession(){this.stats.session.sessionEnd=Date.now();const t=this.stats.session.sessionEnd-this.stats.session.sessionStart;this.stats.allTime.totalPlayTime+=t,this.saveStats();}recordHarvest(t,n=1,o=[]){this.stats.session.cropsHarvested+=n,this.stats.allTime.cropsHarvested+=n,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].harvested+=n;for(const r of o)this.stats.allTime.crops[t].mutations[r]||(this.stats.allTime.crops[t].mutations[r]=0),this.stats.allTime.crops[t].mutations[r]++;this.saveStats();}recordCropSale(t,n=1,o=0){this.stats.session.cropsSold+=n,this.stats.session.coinsEarned+=o,this.stats.allTime.cropsSold+=n,this.stats.allTime.coinsEarned+=o,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].sold+=n,this.stats.allTime.crops[t].totalValue+=o,this.saveStats();}recordPetHatch(t,n=[],o=[]){this.stats.session.petsHatched++,this.stats.allTime.petsHatched++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].hatched++;for(const r of n)this.stats.allTime.pets[t].mutations[r]||(this.stats.allTime.pets[t].mutations[r]=0),this.stats.allTime.pets[t].mutations[r]++;for(const r of o)this.stats.allTime.pets[t].abilities[r]||(this.stats.allTime.pets[t].abilities[r]=0),this.stats.allTime.pets[t].abilities[r]++;this.saveStats();}recordPetSale(t,n=0){this.stats.session.petsSold++,this.stats.session.coinsEarned+=n,this.stats.allTime.petsSold++,this.stats.allTime.coinsEarned+=n,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].sold++,this.saveStats();}recordPetFeed(t){this.stats.session.petsFed++,this.stats.allTime.petsFed++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].fed++,this.saveStats();}recordSeedPurchase(t,n=1,o=0){this.stats.session.seedsPurchased+=n,this.stats.session.coinsSpent+=o,this.stats.allTime.seedsPurchased+=n,this.stats.allTime.coinsSpent+=o,this.saveStats();}recordEggPurchase(t,n=1,o=0){this.stats.session.eggsPurchased+=n,this.stats.session.coinsSpent+=o,this.stats.allTime.eggsPurchased+=n,this.stats.allTime.coinsSpent+=o,this.saveStats();}recordAbilityProc(t){this.stats.session.abilityProcs++,this.stats.allTime.abilityProcs++,this.saveStats();}recordCoinsEarned(t){this.stats.session.coinsEarned+=t,this.stats.allTime.coinsEarned+=t,this.saveStats();}recordCoinsSpent(t){this.stats.session.coinsSpent+=t,this.stats.allTime.coinsSpent+=t,this.saveStats();}getStats(){return {...this.stats}}getSessionStats(){return {...this.stats.session}}getAllTimeStats(){return {...this.stats.allTime}}getCropStats(t){return this.stats.allTime.crops[t]||null}getPetStats(t){return this.stats.allTime.pets[t]||null}getTopCrops(t=10){return Object.entries(this.stats.allTime.crops).map(([n,o])=>({species:n,stats:o})).sort((n,o)=>o.stats.harvested-n.stats.harvested).slice(0,t)}getTopPets(t=10){return Object.entries(this.stats.allTime.pets).map(([n,o])=>({species:n,stats:o})).sort((n,o)=>o.stats.hatched-n.stats.hatched).slice(0,t)}resetSession(){this.startSession();}resetAll(){this.stats=this.getDefaultStats(),this.saveStats();}exportStats(){return JSON.stringify(this.stats,null,2)}importStats(t){try{const n=JSON.parse(t);return this.stats=n,this.saveStats(),!0}catch(n){return console.warn("[StatsTracker] Failed to import stats:",n),false}}}let xt=null;function Dm(){return xt||(xt=new bs),xt}function zm(){xt&&(xt.endSession(),xt=null);}const Fm={AbilityLogger:hs,getAbilityLogger:Nm,destroyAbilityLogger:$m,...Om},jm={StatsTracker:bs,getStatsTracker:Dm,destroyStatsTracker:zm};async function Gm(e){const t=[{name:"Data",init:()=>me.init()},{name:"AntiAfk",init:()=>ya.init()},{name:"CustomModal",init:()=>La.init()},{name:"Sprites",init:()=>se.init()},{name:"TileObjectSystem",init:()=>ze.init()},{name:"Pixi",init:()=>tn.init()},{name:"Audio",init:()=>Va.init()},{name:"Cosmetics",init:()=>Ua.init()},{name:"AutoFavorite",init:()=>To()}];await Promise.all(t.map(async n=>{e?.({status:"start",name:n.name});try{await n.init(),e?.({status:"success",name:n.name});}catch(o){console.error(`[${n.name}] failed`,o),e?.({status:"error",name:n.name,error:o});}})),console.log("[Gemini] Modules ready. Access via Gemini.Modules in console.");}const yi={enabled:false,favoriteProduceList:[],favoritePetsList:[],favoriteMutations:[]},Oe=[{id:"Rainbow",color:"#FF00FF",desc:"All Rainbow items"},{id:"Gold",color:"#EBC800",desc:"All Gold items"},{id:"Wet",color:"#5FFFFF",desc:"All Wet items"},{id:"Chilled",color:"#B4E6FF",desc:"All Chilled items"},{id:"Frozen",color:"#B9C8FF",desc:"All Frozen items"},{id:"Dawnlit",color:"#F59BE1",desc:"Dawn mutations"},{id:"Dawncharged",color:"#C896FF",desc:"Dawn charged"},{id:"Ambershine",color:"#FFB478",desc:"Amber mutations"},{id:"Ambercharged",color:"#FA8C4B",desc:"Amber charged"}],Bm={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function gt(e){return e?Bm[e]??0:0}class Wm extends kt{constructor(){super({id:"tab-auto-favorite",label:"Auto-Favorite"});le(this,"config",yi);le(this,"allPlants",[]);le(this,"allPets",[]);le(this,"sectionElement",null);}async build(n){const o=this.createGrid("12px");o.id="auto-favorite-settings";const r=document.createElement("style");r.textContent=`
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
    `,n.appendChild(r),this.sectionElement=o,n.appendChild(o),this.config=xo("gemini:features:autoFavorite:ui",yi),await this.loadGameData(),await this.waitForSprites(),this.renderContent();}async loadGameData(){try{await me.waitForAnyData(3e3).catch(()=>{}),await Promise.all([me.waitFor("plants",3e3).catch(()=>console.warn("[AutoFavorite UI] Still waiting for plants data...")),me.waitFor("pets",3e3).catch(()=>console.warn("[AutoFavorite UI] Still waiting for pets data..."))]);const n=me.get("plants")||{},o=me.get("pets")||{};this.allPlants=Object.keys(n).sort((r,i)=>{const a=n[r]?.seed?.rarity||null,s=n[i]?.seed?.rarity||null,c=gt(a)-gt(s);return c!==0?c:r.localeCompare(i,void 0,{numeric:!0,sensitivity:"base"})}),this.allPets=Object.keys(o).sort((r,i)=>{const a=o[r]?.rarity||null,s=o[i]?.rarity||null,c=gt(a)-gt(s);return c!==0?c:r.localeCompare(i,void 0,{numeric:!0,sensitivity:"base"})});}catch(n){console.error("[AutoFavorite UI] Failed to load game data:",n);}}async waitForSprites(){if(se.ready())return;const n=1e4,o=100;let r=0;return new Promise(i=>{const a=()=>{se.ready()||r>=n?i():(r+=o,setTimeout(a,o));};a();})}renderContent(){this.sectionElement&&(this.sectionElement.innerHTML="",this.sectionElement.appendChild(this.createMasterToggle()),this.sectionElement.appendChild(this.createMutationsCard()),this.sectionElement.appendChild(this.createProduceCard()),this.sectionElement.appendChild(this.createPetsCard()));}createMasterToggle(){const n=h("div",{className:"kv"}),o=rn({text:"Enable Auto-Favorite",tone:"default",size:"lg"}),r=on({checked:this.config.enabled,onChange:i=>{this.config.enabled=i,this.saveConfig();}});return n.append(o.root,r.root),be({title:"Auto-Favorite",padding:"lg"},n,h("p",{style:"margin-top: 6px; font-size: 12px; color: var(--muted);"},"Automatically favorite items when added to inventory"))}createMutationsCard(){const n=h("div",{className:"u-col"}),o=h("div",{className:"mut-row"});o.appendChild(this.createMutationButton(Oe[0])),o.appendChild(this.createMutationButton(Oe[1])),n.appendChild(o);const r=h("div",{className:"mut-row"});r.appendChild(this.createMutationButton(Oe[2])),r.appendChild(this.createMutationButton(Oe[3])),r.appendChild(this.createMutationButton(Oe[4])),n.appendChild(r);const i=h("div",{className:"mut-row"});i.appendChild(this.createMutationButton(Oe[5])),i.appendChild(this.createMutationButton(Oe[6])),n.appendChild(i);const a=h("div",{className:"mut-row"});return a.appendChild(this.createMutationButton(Oe[7])),a.appendChild(this.createMutationButton(Oe[8])),n.appendChild(a),be({title:"Mutations Priority",variant:"soft",padding:"lg",expandable:true,defaultExpanded:true},n,h("p",{style:"margin-top: 8px; font-size: 11px; color: var(--muted);"},`${this.config.favoriteMutations.length} / ${Oe.length} active`))}createMutationButton(n){let o=this.config.favoriteMutations.includes(n.id);const r=n.color,i=parseInt(r.slice(1,3),16),a=parseInt(r.slice(3,5),16),s=parseInt(r.slice(5,7),16),c=f=>{let g=`rgba(${i}, ${a}, ${s}, 0.25)`,b=r;return n.id==="Rainbow"&&f&&(g="linear-gradient(135deg, rgba(255,0,0,0.3) 0%, rgba(255,165,0,0.3) 20%, rgba(255,255,0,0.3) 40%, rgba(0,128,0,0.3) 60%, rgba(0,0,255,0.3) 80%, rgba(75,0,130,0.3) 100%)",b="#fff9c4"),`
                padding: 8px 12px;
                min-height: 52px;
                border-radius: var(--card-radius, 12px);
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                background: ${f?g:"color-mix(in oklab, var(--bg) 12%, transparent)"};
                border: 2px solid ${f?b:"color-mix(in oklab, var(--border) 40%, transparent)"};
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 12px;
                box-shadow: ${f?n.id==="Rainbow"?"0 4px 18px rgba(255,255,255,0.25)":`0 4px 12px rgba(${i}, ${a}, ${s}, 0.3)`:"none"};
                opacity: ${f?"1":"0.8"};
                width: 100%;
            `},u=h("div",{className:"mut-btn",style:c(o)}),l=h("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(se.ready()){const f=se.toCanvas("plant","Sunflower",{mutations:[n.id],scale:.16});f.style.width="28px",f.style.height="28px",f.style.objectFit="contain",l.appendChild(f);}}catch{}const d=n.id.charAt(0).toUpperCase()+n.id.slice(1).toLowerCase(),p=h("div",{style:"font-size: 13px; font-weight: 600; color: var(--fg); text-shadow: 0 1px 2px rgba(0,0,0,0.5); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"},d);if(u.append(l,p),n.id==="Rainbow"||n.id==="Gold"){const f=h("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(se.ready()){const g=se.toCanvas("pet","Capybara",{mutations:[n.id],scale:.16});g.style.width="28px",g.style.height="28px",g.style.objectFit="contain",f.appendChild(g);}}catch{}u.append(f);}else {const f=h("div",{style:"width: 28px; flex-shrink: 0;"});u.append(f);}return u.addEventListener("click",f=>{f.stopPropagation(),o?(this.config.favoriteMutations=this.config.favoriteMutations.filter(b=>b!==n.id),o=false):(this.config.favoriteMutations.push(n.id),o=true),u.style.cssText=c(o),this.saveConfig();const g=this.sectionElement?.querySelector(".card p");g&&(g.textContent=`${this.config.favoriteMutations.length} / ${Oe.length} active`);}),u}createProduceCard(){return this.createItemSelectionCard({title:"Produce",items:this.allPlants,category:"plant",selected:this.config.favoriteProduceList,onUpdate:n=>{this.config.favoriteProduceList=n,this.saveConfig();}})}createPetsCard(){return this.createItemSelectionCard({title:"Pets",items:this.allPets,category:"pet",selected:this.config.favoritePetsList,onUpdate:n=>{this.config.favoritePetsList=n,this.saveConfig();}})}createItemSelectionCard(n){const{title:o,items:r,category:i,selected:a,onUpdate:s}=n;let c=new Set(a),u=r;const l=h("div",{style:"margin-bottom: 8px;"}),d=Di({placeholder:`Search ${o.toLowerCase()}...`,value:"",debounceMs:150,withClear:true,size:"sm",focusKey:"",onChange:w=>{const T=w.trim().toLowerCase();T?u=r.filter(I=>I.toLowerCase().includes(T)):u=r,y.setData(b());}});l.appendChild(d.root);const p=h("div",{style:"display: flex; gap: 8px; margin-bottom: 12px;"}),f=Pe({label:"Select All",variant:"default",size:"sm",onClick:()=>{const w=b().map(T=>T.id);y.setSelection(w);}}),g=Pe({label:"Deselect All",variant:"default",size:"sm",onClick:()=>{y.clearSelection();}});p.append(f,g);const b=()=>u.map(w=>({id:w,name:w,rarity:this.getItemRarity(w,i),selected:c.has(w)})),m=w=>{if(!w){const I=h("span",{style:"opacity:0.5;"});return I.textContent="—",I}return Zr({variant:"rarity",rarity:w,size:"sm"}).root},v=w=>{const T=h("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0; background: rgba(0,0,0,0.05); border-radius: 6px;"});try{if(se.ready()){let I=i,k=w;i==="plant"&&(["Bamboo","Cactus"].includes(w)&&(I="tallplant"),w==="DawnCelestial"&&(k="DawnCelestialCrop"),w==="MoonCelestial"&&(k="MoonCelestialCrop"),w==="OrangeTulip"&&(k="Tulip"));const E=se.toCanvas(I,k,{scale:.5});E.style.width="28px",E.style.height="28px",E.style.objectFit="contain",T.appendChild(E);}}catch{}return T},y=$i({columns:[{key:"name",header:"Name",width:"1fr",align:"center",sortable:true,sortFn:(w,T)=>w.name.localeCompare(T.name,void 0,{numeric:true,sensitivity:"base"}),render:w=>{const T=h("div",{style:"display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%;"}),I=v(w.id),k=h("span",{style:"font-weight: 500; color: var(--fg); white-space: nowrap;"},w.name);return T.append(I,k),T}},{key:"rarity",header:"Rarity",width:"100px",align:"center",sortable:true,sortFn:(w,T)=>gt(w.rarity)-gt(T.rarity),render:w=>m(w.rarity)}],data:b(),maxHeight:280,compact:true,zebra:true,animations:true,selectable:true,selectOnRowClick:true,hideHeaderCheckbox:true,initialSelection:Array.from(c),getRowId:w=>w.id,onSelectionChange:w=>{c.clear(),w.forEach(T=>c.add(T)),s(Array.from(c)),A();}}),x=h("p",{style:"margin-top: 8px; font-size: 11px; color: var(--muted);"}),A=()=>{x.textContent=`${c.size} / ${r.length} selected`;};return A(),be({title:`${o} (${c.size}/${r.length})`,variant:"soft",padding:"lg",expandable:true,defaultExpanded:false},l,p,y.root,x)}getItemRarity(n,o){try{if(o==="pet")return (me.get("pets")||{})[n]?.rarity||null;if(o==="plant"){const r=me.get("plants")||{},i=r[n];if(i?.seed?.rarity)return i.seed.rarity;const a=n.toLowerCase();for(const s of Object.values(r))if(s?.seed?.name?.toLowerCase()===a||s?.plant?.name?.toLowerCase()===a)return s.seed.rarity}}catch{}return null}async saveConfig(){wo("gemini:features:autoFavorite:ui",this.config);try{const{setEnabled:n,updateSimpleConfig:o}=Pm;await o({enabled:this.config.enabled,favoriteSpecies:[...this.config.favoriteProduceList,...this.config.favoritePetsList],favoriteMutations:this.config.favoriteMutations}),await n(this.config.enabled);}catch(n){console.error("[AutoFavorite UI] Failed to apply config:",n);}}}const vi={autoFavorite:{enabled:false},bulkFavorite:{enabled:false},journalChecker:{enabled:false},cropSizeIndicator:{enabled:false,showForGrowing:true,showForMature:true,showJournalBadges:true},eggProbabilityIndicator:{enabled:false},cropValueIndicator:{enabled:false},xpTracker:{enabled:false},abilityTracker:{enabled:false},mutationTracker:{enabled:false},cropBoostTracker:{enabled:false},turtleTimer:{enabled:false}};class Hm extends kt{constructor(){super({id:"tab-feature-settings",label:"Features"});le(this,"config",vi);}async build(n){const o=this.createGrid("12px");o.id="feature-settings",n.appendChild(o),this.config=xo("gemini:features:config",vi),o.appendChild(this.createQOLCard()),o.appendChild(this.createVisualIndicatorsCard()),o.appendChild(this.createTrackingCard());}createQOLCard(){return be({title:"Quality of Life",padding:"lg",expandable:true,defaultExpanded:true},this.createToggleRow("Auto-Favorite",this.config.autoFavorite.enabled,n=>{this.config.autoFavorite.enabled=n,this.saveConfig();}),this.createToggleRow("Bulk Favorite",this.config.bulkFavorite.enabled,n=>{this.config.bulkFavorite.enabled=n,this.saveConfig();}),this.createToggleRow("Journal Checker",this.config.journalChecker.enabled,n=>{this.config.journalChecker.enabled=n,this.saveConfig();}))}createVisualIndicatorsCard(){return be({title:"Visual Indicators",variant:"soft",padding:"lg",expandable:true,defaultExpanded:true},this.createToggleRow("Crop Size",this.config.cropSizeIndicator.enabled,n=>{this.config.cropSizeIndicator.enabled=n,this.saveConfig();},"Shows size % and journal badges"),this.createToggleRow("Egg Probability",this.config.eggProbabilityIndicator.enabled,n=>{this.config.eggProbabilityIndicator.enabled=n,this.saveConfig();},"Shows hatch chances + mutation %"),this.createToggleRow("Crop Value",this.config.cropValueIndicator.enabled,n=>{this.config.cropValueIndicator.enabled=n,this.saveConfig();},"Shows coin value"))}createTrackingCard(){return be({title:"Tracking & Analytics",variant:"soft",padding:"lg",expandable:true,defaultExpanded:false},this.createToggleRow("XP Tracker",this.config.xpTracker.enabled,n=>{this.config.xpTracker.enabled=n,this.saveConfig();}),this.createToggleRow("Ability Tracker",this.config.abilityTracker.enabled,n=>{this.config.abilityTracker.enabled=n,this.saveConfig();}),this.createToggleRow("Mutation Tracker",this.config.mutationTracker.enabled,n=>{this.config.mutationTracker.enabled=n,this.saveConfig();}),this.createToggleRow("Crop Boost Tracker",this.config.cropBoostTracker.enabled,n=>{this.config.cropBoostTracker.enabled=n,this.saveConfig();}),this.createToggleRow("Turtle Timer",this.config.turtleTimer.enabled,n=>{this.config.turtleTimer.enabled=n,this.saveConfig();}))}createToggleRow(n,o,r,i){const a=h("div",{className:i?"kv-col":"kv"}),s=h("div",{className:"kv"}),c=rn({text:n,tone:"default",size:"md"}),u=on({checked:o,onChange:r});if(s.append(c.root,u.root),i){a.appendChild(s);const l=h("p",{className:"helper-text",style:"font-size: 12px; color: var(--item-desc, var(--muted)); margin-top: 4px;"},i);return a.appendChild(l),a}return s}saveConfig(){wo("gemini:features:config",this.config),console.log("[FeatureSettings] Config saved:",this.config);}}const Vm=(function(){const t=typeof document<"u"&&document.createElement("link").relList;return t&&t.supports&&t.supports("modulepreload")?"modulepreload":"preload"})(),Um=function(e){return "/"+e},xi={},wi=function(t,n,o){let r=Promise.resolve();if(n&&n.length>0){let c=function(u){return Promise.all(u.map(l=>Promise.resolve(l).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),s=a?.nonce||a?.getAttribute("nonce");r=c(n.map(u=>{if(u=Um(u),u in xi)return;xi[u]=true;const l=u.endsWith(".css"),d=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${d}`))return;const p=document.createElement("link");if(p.rel=l?"stylesheet":Vm,l||(p.as="script"),p.crossOrigin="",p.href=u,s&&p.setAttribute("nonce",s),document.head.appendChild(p),l)return new Promise((f,g)=>{p.addEventListener("load",f),p.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${u}`)));})}));}function i(a){const s=new Event("vite:preloadError",{cancelable:true});if(s.payload=a,window.dispatchEvent(s),!s.defaultPrevented)throw a}return r.then(a=>{for(const s of a||[])s.status==="rejected"&&i(s.reason);return t().catch(i)})};class Km extends kt{constructor(){super({id:"tab-journal-checker",label:"Journal"});le(this,"progress",null);}async build(n){this.container=n;const o=this.createGrid("12px");o.id="journal-checker",n.appendChild(o),await this.updateProgress();const r=(i=>{this.progress=i.detail,this.renderContent();});window.addEventListener("gemini:journal-updated",r),this.addCleanup(()=>{window.removeEventListener("gemini:journal-updated",r);});}async updateProgress(){try{const{aggregateJournalProgress:n}=await wi(async()=>{const{aggregateJournalProgress:o}=await module.import('./index-DBEq6NTa-xvDn0gMe.js');return {aggregateJournalProgress:o}},void 0);this.progress=await n(),this.renderContent();}catch(n){console.error("[JournalChecker] Failed to load progress:",n);}}renderContent(){if(!this.container)return;const n=this.container.querySelector("#journal-checker");if(n){if(n.innerHTML="",!this.progress){n.appendChild(this.createLoadingCard());return}n.appendChild(this.createSummaryCard()),n.appendChild(this.createCategoryCard("🌱 Produce",this.progress.plants)),n.appendChild(this.createCategoryCard("🐾 Pets",this.progress.pets,true)),n.appendChild(this.createActionsCard());}}createLoadingCard(){return be({title:"Loading...",padding:"lg"},h("p",{},"Fetching journal data..."))}createSummaryCard(){if(!this.progress)return h("div");const n=this.createProgressRow("🌱 Produce Species",this.progress.plants.logged,this.progress.plants.total,this.progress.plants.percentage),o=this.createProgressRow("   Variants Logged",this.progress.plants.variantsLogged,this.progress.plants.variantsTotal,this.progress.plants.variantsPercentage),r=this.createProgressRow("🐾 Pet Species",this.progress.pets.logged,this.progress.pets.total,this.progress.pets.percentage),i=this.createProgressRow("   Variants Logged",this.progress.pets.variantsLogged,this.progress.pets.variantsTotal,this.progress.pets.variantsPercentage),a=this.progress.pets.abilitiesTotal?this.createProgressRow("   Abilities Logged",this.progress.pets.abilitiesLogged??0,this.progress.pets.abilitiesTotal,this.progress.pets.abilitiesPercentage??0):null,s=[n,o,r,i];return a&&s.push(a),be({title:"Collection Progress",padding:"lg",expandable:true,defaultExpanded:true},...s)}createCategoryCard(n,o,r=false){const i=o.speciesDetails.filter(s=>!s.isComplete).sort((s,c)=>c.variantsPercentage-s.variantsPercentage).slice(0,5),a=h("div",{style:"display: flex; flex-direction: column; gap: 8px;"});if(i.length===0){const s=h("div",{style:"color: var(--accent); font-size: 13px; text-align: center; padding: 8px;"},"✅ All species complete!");a.appendChild(s);}else {for(const c of i)a.appendChild(this.createSpeciesRow(c,r));const s=o.speciesDetails.filter(c=>!c.isComplete).length-5;if(s>0){const c=h("div",{style:"font-size: 12px; color: var(--muted); text-align: center; padding-top: 4px;"},`...and ${s} more species`);a.appendChild(c);}}return be({title:n,padding:"lg",expandable:true,defaultExpanded:false},a)}createSpeciesRow(n,o=false){const r=h("div",{style:"display: flex; flex-direction: column; gap: 4px; padding: 6px 0; border-bottom: 1px solid var(--soft);"}),i=h("div",{style:"display: flex; justify-content: space-between; align-items: center;"}),a=h("span",{style:"font-weight: 500; font-size: 13px;"},n.species),s=h("span",{style:`font-size: 12px; color: ${n.isComplete?"var(--accent)":"var(--muted)"}`},n.isComplete?"✅ Complete":`${Math.round(n.variantsPercentage)}%`);i.append(a,s);const c=n.variantsMissing.slice(0,4),u=c.length>0?`Missing: ${c.join(", ")}${n.variantsMissing.length>4?"...":""}`:"All variants logged",l=h("div",{style:"font-size: 11px; color: var(--muted);"},u);if(r.append(i,l),o&&n.abilitiesMissing&&n.abilitiesMissing.length>0){const p=`Abilities: ${n.abilitiesMissing.slice(0,3).join(", ")}${n.abilitiesMissing.length>3?"...":""}`,f=h("div",{style:"font-size: 11px; color: var(--muted);"},p);r.appendChild(f);}return r}createProgressRow(n,o,r,i){const a=h("div",{className:"kv-col",style:"gap: 6px;"}),s=h("div",{className:"kv"}),c=rn({text:n,tone:"default",size:"md"}),u=h("span",{style:"font-size: 13px; color: var(--item-desc, var(--muted));"},`${o}/${r}`);s.append(c.root,u);const l=h("div",{style:`
        width: 100%;
        height: 6px;
        background: var(--card-bg, var(--soft));
        border-radius: 3px;
        overflow: hidden;
      `}),d=h("div",{style:`
        width: ${Math.min(100,i)}%;
        height: 100%;
        background: linear-gradient(90deg, var(--tab-bg, var(--accent)), var(--group-title, var(--pill-to)));
        transition: width 0.3s ease;
      `});return l.appendChild(d),a.append(s,l),a}createActionsCard(){const n=Pe({label:"🔄 Refresh",variant:"default",size:"md",onClick:async()=>{await this.updateProgress();}}),o=Pe({label:"📋 Log Missing",variant:"default",size:"md",onClick:()=>{this.showMissingItems();}}),r=h("div",{style:"display: flex; gap: 8px; flex-wrap: wrap;"});return r.append(n,o),be({title:"Actions",variant:"soft",padding:"lg",expandable:true,defaultExpanded:false},r)}async showMissingItems(){if(this.progress)try{const{getMissingSummary:n}=await wi(async()=>{const{getMissingSummary:r}=await module.import('./index-DBEq6NTa-xvDn0gMe.js');return {getMissingSummary:r}},void 0),o=await n();if(o.plants.length===0&&o.pets.length===0){console.log("🎉 [JournalChecker] Collection complete!");return}if(console.group("📋 Missing Journal Entries"),o.plants.length>0){console.group(`🌱 Produce (${o.plants.length} species incomplete)`);for(const r of o.plants)console.log(`${r.species}: ${r.missing.join(", ")}`);console.groupEnd();}if(o.pets.length>0){console.group(`🐾 Pets (${o.pets.length} species incomplete)`);for(const r of o.pets){const i=[];r.missingVariants.length>0&&i.push(`Variants: ${r.missingVariants.join(", ")}`),r.missingAbilities.length>0&&i.push(`Abilities: ${r.missingAbilities.join(", ")}`),console.log(`${r.species}: ${i.join(" | ")}`);}console.groupEnd();}console.groupEnd();}catch(n){console.error("[JournalChecker] Failed to get missing summary:",n);}}}const ys={Store:{select:fe.select.bind(fe),set:fe.set.bind(fe),subscribe:fe.subscribe.bind(fe),subscribeImmediate:fe.subscribeImmediate.bind(fe)},Globals:Ao,Modules:{Version:Hi,Assets:At,Manifest:Xe,Data:me,AntiAfk:ya,Environment:$e,CustomModal:La,Sprite:se,Tile:ze,Pixi:tn,Audio:Va,Cosmetic:Ua,Achievements:Rm,Calculators:Tf,Pets:Fm,Tracker:jm},WebSocket:{chat:Og,emote:Ng,wish:$g,kickPlayer:Dg,setPlayerData:zg,usurpHost:Fg,reportSpeakingStart:jg,setSelectedGame:Gg,voteForGame:Bg,requestGame:Wg,restartGame:Hg,ping:Vg,checkWeatherStatus:qg,move:Ug,playerPosition:ls,teleport:Kg,moveInventoryItem:Yg,dropObject:Xg,pickupObject:Jg,toggleFavoriteItem:cs,putItemInStorage:Qg,retrieveItemFromStorage:Zg,moveStorageItem:em,logItems:tm,plantSeed:nm,waterPlant:rm,harvestCrop:om,sellAllCrops:im,purchaseDecor:am,purchaseEgg:sm,purchaseTool:lm,purchaseSeed:cm,plantEgg:dm,hatchEgg:um,plantGardenPlant:pm,potPlant:fm,mutationPotion:gm,pickupDecor:mm,placeDecor:hm,removeGardenObject:bm,placePet:ym,feedPet:vm,petPositions:xm,swapPet:wm,storePet:Sm,namePet:km,sellPet:Cm},_internal:{getGlobals:Ve,initGlobals:is,destroyGlobals:Sg}};function qm(){const e=N;e.Gemini=ys,e.MGSprite=se,e.MGData=me,e.MGPixi=tn,e.MGAssets=At,e.MGEnvironment=$e;}function Ym(){const e=h("div",{className:"atom-inspector",style:"display: flex; flex-direction: column; gap: 12px; height: 100%; min-height: 0; overflow: hidden;"}),t=h("div",{style:"flex-shrink: 0; padding-bottom: 8px;"}),n=qt({placeholder:"Search data keys...",value:"",onChange:s=>a(s)});t.appendChild(n.root),e.appendChild(t);const o=h("div",{style:"flex: 1; min-height: 0; overflow-y: auto; display: flex; flex-direction: column; gap: 8px; padding-right: 4px; padding-bottom: 20px;"});e.appendChild(o);const r={MGData:["plants","pets","mutations","items","decor","eggs","abilities","weather"],Globals:["currentTile","myInventory","myPets","myGarden","players","shops","weather","gameMap"],Atoms:["positionAtom","myCoinsCountAtom","myInventoryAtom","myPetInfosAtom","weatherAtom","currentGardenNameAtom","numPlayersAtom","avgPingAtom"]},i=[],a=(s="")=>{o.innerHTML="",i.forEach(l=>l()),i.length=0;const c=s.toLowerCase(),u=(l,d,p,f)=>{const g=`${l} - ${d}`;if(s&&!g.toLowerCase().includes(c))return;let b=null;const m=h("pre",{style:"margin: 0; padding: 8px; font-size: 11px; background: rgba(0,0,0,0.3); border-radius: 4px; color: var(--color-primary); overflow: auto; max-height: 400px;"});m.textContent="Expand to load data...";const v=be({title:g,expandable:true,defaultExpanded:!!s,padding:"sm",onExpandChange:S=>{if(S)if(m.textContent="Loading...",f)b=f(y=>{m.textContent=JSON.stringify(y,null,2);});else try{const y=p();m.textContent=JSON.stringify(y,null,2);}catch(y){m.textContent=`Error: ${y}`;}else b&&(b(),b=null),m.textContent="Paused (Collapsed)";}});v.appendChild(m),o.appendChild(v),s&&setTimeout(()=>{f?b=f(S=>{m.textContent=JSON.stringify(S,null,2);}):m.textContent=JSON.stringify(p(),null,2);},0);};r.MGData.forEach(l=>{u(l,"Game Data (MGData)",()=>me.get(l));}),r.Globals.forEach(l=>{const d=Ao[l];d&&u(l,"Reactive Global",()=>d.get(),p=>d.subscribe?.(p)||(()=>{}));}),r.Atoms.forEach(l=>{u(l,"Jotai Atom",()=>null,d=>{let p=false,f=null;return ys.Store.subscribeImmediate(l,g=>{p||d(g);}).then(g=>{p?g():f=g;}),()=>{p=true,f?.();}});}),o.children.length===0&&(o.innerHTML='<div style="text-align:center; padding: 40px; opacity: 0.5;">No matches found for "'+s+'"</div>');};return a(),e.destroy=()=>{i.forEach(s=>s());},e}function Xm(e={}){const{id:t,min:n=0,max:o=100,step:r=1,value:i=n,label:a,showValue:s=true,disabled:c=false,onInput:u,onChange:l}=e,d=h("div",{className:"slider"}),p=h("div",{className:"slider-row"}),f=h("div",{className:"slider-track"}),g=h("div",{className:"slider-range"});f.appendChild(g);const b=h("input",{id:t,type:"range",min:String(n),max:String(o),step:String(r),value:String(i),disabled:c});b.addEventListener("input",T=>{v(),u?.(y(),T);}),b.addEventListener("change",T=>l?.(y(),T));function m(){const T=o-n;return T===0?0:(y()-n)/T}function v(){const T=Math.max(0,Math.min(1,m()));g.style.width=`${T*100}%`,w&&(w.textContent=String(y()));}function S(T){b.value=String(T),v();}function y(){return Number(b.value)}function x(T){b.disabled=!!T;}let A=null,w=null;return a&&(A=h("span",{className:"slider-label"},a),p.appendChild(A)),f.appendChild(b),p.appendChild(f),s&&(w=h("span",{className:"slider-value"},String(i)),p.appendChild(w)),d.append(p),v(),{root:d,input:b,setValue:S,getValue:y,setDisabled:x}}function Jm(e={}){const{id:t,min:n=420,max:o=720,step:r=10,value:i,onInput:a}=e,s=h("input",{id:t,type:"range",min:String(n),max:String(o),step:String(r)});return i!=null&&(s.value=String(i)),a&&s.addEventListener("input",a),s}function Qm(e={}){const{margin:t="8px 0",color:n}=e;return h("div",{className:"gemini-divider",style:`
      height: 1px;
      background: ${n||"var(--border, rgba(255,255,255,0.1))"};
      margin: ${t};
      width: 100%;
    `.replace(/\s+/g," ").trim()})}function Zm(e){const{label:t,description:n,value:o}=e,r=h("div",{className:"stat-row",style:`
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 6px 8px;
      border-radius: 8px;
      transition: background 0.2s ease;
      min-height: fit-content;
    `.replace(/\s+/g," ").trim()});r.addEventListener("mouseenter",()=>{r.style.background="rgba(255, 255, 255, 0.05)";}),r.addEventListener("mouseleave",()=>{r.style.background="transparent";});const i=h("div",{style:`
      display: flex;
      flex-direction: column;
      gap: 2px;
      flex: 1;
      min-width: 0;
    `.replace(/\s+/g," ").trim()}),a=h("span",{style:`
      color: var(--item-label, #F5F5F5);
      font-weight: 500;
      font-size: 14px;
      line-height: 1.3;
    `.replace(/\s+/g," ").trim()},t);if(i.appendChild(a),n){const u=h("span",{style:`
        color: var(--item-desc, rgba(255,255,255,0.6));
        font-size: 14px;
        line-height: 1.3;
        word-break: break-word;
      `.replace(/\s+/g," ").trim()},n);i.appendChild(u);}const s=typeof o=="number"?o.toLocaleString():o,c=h("span",{style:`
      color: var(--item-value, #FFF27D);
      font-weight: 700;
      font-size: 16px;
      text-align: right;
      min-width: 60px;
      flex-shrink: 0;
    `.replace(/\s+/g," ").trim()},s);return r.appendChild(i),r.appendChild(c),r}const eh=[{id:"badge-success",type:"Badge",label:"Success Badge",config:{label:"SUCCESS",type:"success"}},{id:"badge-warning",type:"Badge",label:"Warning Badge",config:{label:"WARNING",type:"warning"}},{id:"badge-danger",type:"Badge",label:"Danger Badge",config:{label:"DANGER",type:"danger"}},{id:"badge-info",type:"Badge",label:"Info Badge",config:{label:"INFO",type:"info"}},{id:"badge-primary",type:"Badge",label:"Primary Badge",config:{label:"NEW",type:"primary"}},{id:"button-primary",type:"Button",label:"Primary Button",config:{label:"Action",variant:"primary",size:"sm"}},{id:"button-danger",type:"Button",label:"Danger Button",config:{label:"Delete",variant:"danger",size:"sm"}},{id:"button-default",type:"Button",label:"Default Button",config:{label:"Cancel",variant:"default",size:"sm"}},{id:"switch-default",type:"Switch",label:"Toggle Switch",config:{label:"Enabled",checked:false}},{id:"input-text",type:"Input",label:"Text Input",config:{placeholder:"Enter text...",value:""}},{id:"input-number",type:"Input",label:"Number Input",config:{placeholder:"0",mode:"digits"}},{id:"select-basic",type:"Select",label:"Dropdown",config:{options:[{value:"a",label:"Option A"},{value:"b",label:"Option B"}],value:"a"}},{id:"slider-basic",type:"Slider",label:"Slider",config:{min:0,max:100,value:50}},{id:"range-basic",type:"Range",label:"Range Slider",config:{label:"Range",min:0,max:100,value:50}},{id:"label-default",type:"Label",label:"Label",config:{text:"Label Text",size:"md"}},{id:"divider-default",type:"Divider",label:"Divider",config:{}},{id:"statrow-basic",type:"StatRow",label:"Stat Row",config:{label:"Coins",value:"1,234"}},{id:"card-nested",type:"Card",label:"Nested Card",config:{title:"Nested",padding:"sm",variant:"soft"}},{id:"sprite-generic",type:"Sprite",label:"Sprite",config:{category:null,assetId:null}}];function Yr(e){try{switch(e.type){case "Badge":return Zr(e.config).root;case "Button":return Pe(e.config);case "Switch":return on(e.config).root;case "Input":return qt(e.config).root;case "Select":return zn(e.config).root;case "Slider":return Xm(e.config).root;case "Range":{const t=Jm(e.config);return t.root??t}case "Label":{const t=rn(e.config);return t.root??t}case "Divider":{const t=Qm(e.config);return t.root??t}case "StatRow":{const t=Zm(e.config);return t.root??t}case "Card":{const t=be(e.config);return t.appendChild(h("div",{textContent:"Nested content",style:"font-size: 11px; opacity: 0.7;"})),t}case "Sprite":{if(e.config.category&&e.config.assetId&&se.ready())try{const t=se.toCanvas(e.config.category,e.config.assetId,{mutations:e.config.mutations||[],scale:1.5});return t.style.imageRendering="pixelated",t}catch{}return h("div",{textContent:"🌱",style:"font-size: 24px; opacity: 0.5; display: flex; align-items: center; justify-content: center;"})}default:return null}}catch(t){return console.warn("[Gemini] ComponentPalette: Failed to create",e.type,t),h("div",{textContent:"Error",style:"color: var(--color-danger);"})}}function th(e={}){const t=h("div",{className:"component-palette",style:"display: grid; grid-template-columns: repeat(auto-fill, minmax(90px, 1fr)); gap: 8px;"});return eh.forEach(n=>{const o=h("div",{style:`
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
            `});o.setAttribute("draggable","true"),o.onmouseenter=()=>{o.style.background="rgba(255,255,255,0.08)";},o.onmouseleave=()=>{o.style.background="rgba(255,255,255,0.03)";},o.ondragstart=a=>{a.dataTransfer&&(a.dataTransfer.setData("application/json",JSON.stringify(n)),a.dataTransfer.effectAllowed="copy"),o.style.opacity="0.5",e.onDragStart?.(n,a);},o.ondragend=()=>{o.style.opacity="1";},o.onclick=()=>{e.onItemClick?.(n);};const r=Yr({...n,config:{...n.config}});r&&(r.style.pointerEvents="none",r.style.transform="scale(0.85)",r.style.maxWidth="100%",r.style.maxHeight="40px",r.style.overflow="hidden",o.appendChild(r));const i=h("small",{textContent:n.label,style:"font-size: 9px; opacity: 0.6; line-height: 1.2;"});o.appendChild(i),t.appendChild(o);}),t}function nh(e={}){const{width:t=400,height:n=300,gridSize:o=8,showGrid:r=true}=e;let i=o;const a=new Map;let s=1;const c=h("div",{className:"positioning-canvas-container",style:"display: flex; flex-direction: column; gap: 8px;"}),u=h("div",{style:"display: flex; gap: 8px; align-items: center; font-size: 11px;"});let l=false;const d=h("span",{textContent:`Grid: ${i}px`,style:"opacity: 0.6;"}),p=Pe({label:r?"Grid On":"Grid Off",size:"sm",variant:"default",onClick:()=>{m.style.backgroundImage=m.style.backgroundImage?"":b(),p.textContent=m.style.backgroundImage?"Grid On":"Grid Off";}}),f=Pe({label:"Preview",size:"sm",variant:"default",onClick:()=>{l=!l,f.textContent=l?"Edit Mode":"Preview",f.style.background=l?"var(--color-primary)":"",f.style.color=l?"#000":"",a.forEach(P=>{const D=P.element,B=D.querySelector("div:first-child"),$=D.querySelector('[style*="se-resize"]'),z=D.querySelector("div:has(select)");B&&(B.style.display=l?"none":"flex"),$&&($.style.display=l?"none":"block"),z&&(z.style.display=l?"none":"flex"),D.style.pointerEvents=l?"none":"auto",D.style.border=l?"none":"1px solid rgba(255,255,255,0.15)",D.style.background=l?"transparent":"rgba(255,255,255,0.08)";}),m.style.border=l?"none":"2px dashed rgba(255,255,255,0.15)";}}),g=Pe({label:"Clear All",size:"sm",variant:"danger",onClick:()=>Q.clear()});u.appendChild(d),u.appendChild(p),u.appendChild(f),u.appendChild(g),c.appendChild(u);const b=()=>i<=0?"":`repeating-linear-gradient(
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
        )`,m=h("div",{className:"positioning-canvas",style:`
            position: relative;
            width: ${t}px;
            height: ${n}px;
            min-height: ${n}px;
            background: rgba(0,0,0,0.3);
            border: 2px dashed rgba(255,255,255,0.15);
            border-radius: 8px;
            overflow: hidden;
            ${r?`background-image: ${b()};`:""}
        `}),v=h("div",{textContent:"Drop components here",style:`
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 12px;
            opacity: 0.3;
            pointer-events: none;
            transition: opacity 0.2s;
        `});m.appendChild(v);let S=null,y=null;const x=P=>i<=0?P:Math.round(P/i)*i,A=(P,D,B)=>Math.max(D,Math.min(B,P)),w=(P,D)=>{const B=m.getBoundingClientRect(),$={x:D.clientX-B.left,y:D.clientY-B.top};S={item:P,startX:D.clientX,startY:D.clientY,offsetX:$.x-P.position.x,offsetY:$.y-P.position.y},P.element.style.cursor="grabbing",P.element.style.zIndex=String(++s),P.zIndex=s,document.addEventListener("pointermove",T),document.addEventListener("pointerup",I);},T=P=>{if(!S)return;const D=m.getBoundingClientRect();let B=P.clientX-D.left-S.offsetX,$=P.clientY-D.top-S.offsetY;B=x(A(B,0,t-S.item.size.width)),$=x(A($,0,n-S.item.size.height)),S.item.position={x:B,y:$},S.item.element.style.left=`${B}px`,S.item.element.style.top=`${$}px`;},I=()=>{S&&(S.item.element.style.cursor="",e.onItemMove?.(S.item.id,S.item.position)),S=null,document.removeEventListener("pointermove",T),document.removeEventListener("pointerup",I);},k=(P,D,B)=>{B.stopPropagation(),y={item:P,startX:B.clientX,startY:B.clientY,startW:P.size.width,startH:P.size.height,corner:D},document.addEventListener("pointermove",E),document.addEventListener("pointerup",M);},E=P=>{if(!y)return;const D=P.clientX-y.startX,B=P.clientY-y.startY;let $=y.startW,z=y.startH;y.corner.includes("e")&&($=x(Math.max(40,y.startW+D))),y.corner.includes("s")&&(z=x(Math.max(24,y.startH+B))),y.item.size={width:$,height:z},y.item.element.style.width=`${$}px`,y.item.element.style.height=`${z}px`;},M=()=>{y&&e.onItemResize?.(y.item.id,y.item.size),y=null,document.removeEventListener("pointermove",E),document.removeEventListener("pointerup",M);},G=P=>{const D=P.type==="Sprite",B=h("div",{className:"positioned-item",style:`
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
            `}),$=h("div",{style:`
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 2px 4px;
                background: rgba(0,0,0,0.3);
                font-size: 9px;
                opacity: 0.9;
                cursor: grab;
                flex-wrap: ${D?"wrap":"nowrap"};
                gap: 4px;
            `});$.appendChild(h("span",{textContent:P.label,style:"font-weight: bold;"}));const z=h("button",{textContent:"×",style:"background: none; border: none; color: var(--color-danger); font-size: 12px; cursor: pointer; padding: 0 4px; margin-left: auto;"});z.onclick=_=>{_.stopPropagation(),Q.removeItem(P.id);},$.appendChild(z);const j=h("div",{style:"flex: 1; padding: 4px; overflow: auto; display: flex; align-items: center; justify-content: center;"});if(j.appendChild(P.element),D){const _=h("div",{style:"display: flex; gap: 4px; padding: 4px; background: rgba(0,0,0,0.2); flex-wrap: wrap;"}),L="font-size: 9px; padding: 2px 4px; background: rgba(0,0,0,0.4); color: #fff; border: 1px solid rgba(255,255,255,0.2); border-radius: 3px; flex: 1; min-width: 60px; max-width: 80px;",O=h("select",{style:L});se.getCategories().forEach(ge=>{const we=h("option",{value:ge,textContent:ge});O.appendChild(we);});const oe=h("select",{style:L});oe.appendChild(h("option",{value:"",textContent:"Asset..."}));const Te=h("select",{style:L});Te.appendChild(h("option",{value:"",textContent:"None"})),["Gold","Rainbow","Wet","Chilled","Frozen","Dawnlit"].forEach(ge=>{Te.appendChild(h("option",{value:ge,textContent:ge}));});const ne=()=>{oe.innerHTML="",oe.appendChild(h("option",{value:"",textContent:"Asset..."})),se.getCategoryId(O.value).forEach(we=>{oe.appendChild(h("option",{value:we,textContent:we}));});},ce=()=>{j.innerHTML="";const ge=O.value,we=oe.value,pt=Te.value;if(!we){j.appendChild(h("span",{textContent:"🌱 Select asset",style:"opacity: 0.4; font-size: 11px;"}));return}try{const je=se.toCanvas(ge,we,{mutations:pt?[pt]:[],scale:2});je.style.imageRendering="pixelated",je.style.maxWidth="100%",je.style.maxHeight="100%",je.style.objectFit="contain",j.appendChild(je);}catch{j.appendChild(h("span",{textContent:"Sprite Not Found",style:"color: var(--color-danger); font-size: 10px;"}));}};O.onchange=()=>{ne(),ce();},oe.onchange=ce,Te.onchange=ce,[O,oe,Te].forEach(ge=>{ge.onpointerdown=we=>we.stopPropagation(),ge.onclick=we=>we.stopPropagation();}),_.appendChild(O),_.appendChild(oe),_.appendChild(Te),ne(),ce(),B.appendChild($),B.appendChild(_),B.appendChild(j);}else B.appendChild($),B.appendChild(j);const F=h("div",{style:`
                position: absolute;
                right: 0;
                bottom: 0;
                width: 12px;
                height: 12px;
                cursor: se-resize;
                background: linear-gradient(135deg, transparent 50%, rgba(255,255,255,0.3) 50%);
            `});return F.onpointerdown=_=>k(P,"se",_),B.appendChild(F),$.onpointerdown=_=>w(P,_),B.onpointerdown=_=>{(_.target===B||_.target===j)&&w(P,_);},B};m.ondragover=P=>{P.preventDefault(),P.dataTransfer&&(P.dataTransfer.dropEffect="copy"),m.style.borderColor="var(--color-primary)",m.style.background="rgba(var(--color-primary-rgb, 0,200,150), 0.1)",v.style.opacity="0.6";},m.ondragleave=()=>{m.style.borderColor="rgba(255,255,255,0.15)",m.style.background="rgba(0,0,0,0.3)",v.style.opacity=a.size===0?"0.3":"0";},m.ondrop=P=>{P.preventDefault(),m.style.borderColor="rgba(255,255,255,0.15)",m.style.background="rgba(0,0,0,0.3)",v.style.opacity="0";const D=m.getBoundingClientRect(),B=x(P.clientX-D.left),$=x(P.clientY-D.top),z=new CustomEvent("canvas-drop",{detail:{x:B,y:$,dataTransfer:P.dataTransfer}});m.dispatchEvent(z);},c.appendChild(m);const Q={root:c,addItem(P,D,B,$,z){const j=a.size,F=z?.width??100,_=z?.height??60,L=x(20+j*16%(t-F)),O=x(20+j*16%Math.max(20,n-_)),W={id:P,type:D,label:B,element:$,position:{x:L,y:O},size:{width:F,height:_},zIndex:++s},oe=G(W);return W.element=oe,a.set(P,W),m.appendChild(oe),v.style.opacity="0",W},removeItem(P){const D=a.get(P);D&&(D.element.remove(),a.delete(P),e.onItemRemove?.(P),a.size===0&&(v.style.opacity="0.3"));},getItems(){return Array.from(a.values())},clear(){a.forEach(P=>P.element.remove()),a.clear(),v.style.opacity="0.3";},setGridSize(P){i=P,d.textContent=`Grid: ${P}px`,m.style.backgroundImage&&(m.style.backgroundImage=b());},destroy(){document.removeEventListener("pointermove",T),document.removeEventListener("pointerup",I),document.removeEventListener("pointermove",E),document.removeEventListener("pointerup",M),a.clear();}};return Q}function rh(){const e=(k,E)=>{E&&(E instanceof Node?k.appendChild(E):E.root instanceof Node?k.appendChild(E.root):console.warn("[Gemini] UI Gallery: Cannot mount child",E));},t=h("div",{className:"ui-gallery",style:"height: 100%; display: flex; flex-direction: column; gap: 24px; padding: 12px; overflow-y: auto;"}),n=(k,E)=>{const M=h("div",{style:"display: flex; flex-direction: column; gap: 12px; flex-shrink: 0;"}),G=h("div",{style:"border-left: 3px solid var(--color-primary); padding-left: 10px;"});return G.appendChild(h("strong",{style:"display: block; font-size: 15px; color: #fff;",textContent:k})),G.appendChild(h("small",{style:"opacity: 0.6; font-size: 12px;",textContent:E})),M.appendChild(G),M},o=n("Layout & Device Simulation","Test Geminis responsiveness and mobile views"),r=h("div",{style:"display: grid; grid-template-columns: 1fr 1fr; gap: 10px;"}),i=$e.isMobile(),a=Pe({label:"Switch to Mobile (360px)",variant:i?"primary":"default",onClick:()=>{$e.setPlatformOverride("mobile");const k=document.querySelector("#gemini-hud-root");k&&(k.style.setProperty("--w","360px"),k.dispatchEvent(new CustomEvent("gemini:layout-resize",{detail:{width:360}}))),a.setVariant("primary"),s.setVariant("default");}}),s=Pe({label:"Reset to Desktop",variant:i?"default":"primary",onClick:()=>{$e.setPlatformOverride(null);const k=document.querySelector("#gemini-hud-root");k&&(k.style.removeProperty("--w"),k.dispatchEvent(new CustomEvent("gemini:layout-resize",{detail:{width:null}}))),a.setVariant("default"),s.setVariant("primary");}});e(r,a),e(r,s),o.appendChild(r),t.appendChild(o);const c=n("Sprite Explorer","Live rendering of game assets and mutations"),u=be({title:"MGSprite Live Preview",padding:"sm"}),l=h("div",{style:"display: flex; flex-direction: column; gap: 12px;"}),d=h("div",{style:"height: 140px; background: rgba(0,0,0,0.3); border-radius: 8px; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.1); position: relative; overflow: hidden;"});let p="plants",f="Carrot";const g=new Set,b=()=>{d.innerHTML="";try{const k=se.toCanvas(p,f,{mutations:Array.from(g),scale:1.5});k.style.maxHeight="90%",k.style.imageRendering="pixelated",d.appendChild(k);}catch{d.innerHTML='<small style="color:var(--color-danger)">Sprite Not Found</small>';}},m=zn({options:se.getCategories().map(k=>({value:k,label:k})),value:p,onChange:k=>{p=k;const E=se.getCategoryId(k);v.setOptions(E.map(M=>({value:M,label:M}))),E.length&&(f=E[0],v.setValue(E[0])),b();}}),v=zn({options:se.getCategoryId(p).map(k=>({value:k,label:k})),value:f,onChange:k=>{f=k,b();}}),S=h("div",{style:"display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 4px;"});["Gold","Rainbow","Wet","Chilled","Frozen","Dawnlit"].forEach(k=>{const E=h("div",{style:"display: flex; align-items: center; gap: 8px;"});e(E,on({checked:g.has(k),onChange:M=>{M?g.add(k):g.delete(k),b();}})),E.appendChild(h("span",{textContent:k,style:"font-size: 12px;"})),S.appendChild(E);}),e(l,m),e(l,v),l.appendChild(h("small",{textContent:"MUTATIONS",style:"opacity: 0.5; font-size: 10px; font-weight: bold; margin-top: 4px;"})),l.appendChild(S),u.appendChild(d),u.appendChild(l),c.appendChild(u),t.appendChild(c);const y=n("Interactive Card Builder","Drag components from below - free-form positioning with snap-to-grid!");y.className="card-builder";const x=nh({width:380,height:280,gridSize:8,showGrid:true,onItemMove:(k,E)=>console.log("[CardBuilder] Item moved:",k,E),onItemResize:(k,E)=>console.log("[CardBuilder] Item resized:",k,E),onItemRemove:k=>console.log("[CardBuilder] Item removed:",k)}),A=x.root.querySelector(".positioning-canvas");A&&A.addEventListener("canvas-drop",k=>{const E=k,{x:M,y:G,dataTransfer:Q}=E.detail;try{const P=Q?.getData("application/json");if(P){const D=JSON.parse(P),B=`${D.id}-${Date.now()}`,$=Yr(D);if($){const z=x.addItem(B,D.type,D.label,$);z.position={x:M,y:G},z.element.style.left=`${M}px`,z.element.style.top=`${G}px`;}}}catch(P){console.warn("[Gemini] CardBuilder: Invalid drop data",P);}}),y.appendChild(x.root),t.appendChild(y);const w=n("Component Palette","Drag components into the Card Builder above"),I=th({onItemClick:k=>{const E=`${k.id}-${Date.now()}`;if(k.type==="Sprite"){const M=h("div",{style:"width: 100%; height: 100%;"});x.addItem(E,"Sprite","Sprite",M,{width:160,height:120});}else {const M=Yr(k);M&&x.addItem(E,k.type,k.label,M);}y.scrollIntoView({behavior:"smooth"});}});return w.appendChild(I),t.appendChild(w),t.appendChild(h("div",{style:"height: 60px; flex-shrink: 0;"})),b(),t}function oh(){const e=h("div",{className:"pixi-inspector",style:"display: flex; flex-direction: column; gap: 12px; height: 100%; min-height: 0; overflow: hidden;"}),t=h("div",{style:"display: flex; flex-direction: column; gap: 10px; padding: 2px;"}),n=h("div",{style:"display: grid; grid-template-columns: 1fr 1fr auto; gap: 8px; align-items: end;"});let o=0,r=0,i=false;const a=qt({label:"Tile X",mode:"digits",value:"0",onChange:f=>{o=parseInt(f)||0,p();}}),s=qt({label:"Tile Y",mode:"digits",value:"0",onChange:f=>{r=parseInt(f)||0,p();}}),c=Pe({label:"Pick from Canvas",variant:"default",onClick:()=>l()});a&&a.root&&n.appendChild(a.root),s&&s.root&&n.appendChild(s.root),n.appendChild(c),t.appendChild(n),e.appendChild(t);const u=h("div",{style:"flex: 1; min-height: 0; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; padding-right: 4px;"});e.appendChild(u);const l=()=>{i=!i,c.textContent=i?"🎯 Click any tile...":"Pick from Canvas",c.style.background=i?"var(--color-primary)":"",c.style.color=i?"#000":"",i?document.addEventListener("click",d,true):document.removeEventListener("click",d,true);},d=f=>{if(!i)return;const g=f.target;if(!g||g.tagName!=="CANVAS")return;f.preventDefault(),f.stopPropagation();const b=ze.pointToTile({x:f.clientX,y:f.clientY});b&&(o=b.tx,r=b.ty,a.setValue(String(o)),s.setValue(String(r)),p()),l();},p=()=>{u.innerHTML="";try{const f=ze.inspect(o,r),g=be({title:`Tile (${o}, ${r})`,subtitle:`GIDX: ${f.gidx} | ${f.objectType||"EMPTY"}`,expandable:!0,padding:"sm"}),b=h("pre",{style:"margin: 0; padding: 8px; font-size: 11px; background: rgba(0,0,0,0.3); border-radius: 4px; color: var(--color-primary); overflow: auto; max-height: 400px;"});if(b.textContent=JSON.stringify(f.tileObject||{},(m,v)=>m==="tileView"||m==="displayObject"?"[Circular/Ref]":v,2),g.appendChild(b),f.objectType==="plant"){const m=f.tileObject?.plant?.speciesId,S=me.get("plants")?.[m];if(S){const x=be({title:S.name||m,subtitle:"SPECIES METADATA",variant:"soft",padding:"sm"}),A=h("div",{style:"font-size: 11px; display: flex; flex-direction: column; gap: 4px;"});A.appendChild(h("div",{textContent:`Base Grow Time: ${S.growTime}s`}));const w=Array.isArray(S.mutations)?S.mutations.join(", "):"None";A.appendChild(h("div",{textContent:`Mutations: ${w}`})),x.appendChild(A),u.appendChild(x);}const y=h("div",{style:"display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; padding: 8px; background: rgba(255,255,255,0.05); border-radius: 4px;"});y.appendChild(Pe({label:"Clear Tile",size:"sm",variant:"danger",onClick:()=>{ze.setTileEmpty(o,r),p();}})),g.appendChild(y);}u.appendChild(g),tn.drawOverlayBox(o,r,{key:"pixi-inspect-hl",tint:8386303,alpha:.8});}catch(f){u.innerHTML=`<div style="color:var(--color-danger); padding: 10px;">Error: ${f instanceof Error?f.message:String(f)}</div>`;}};return e.destroy=()=>{document.removeEventListener("click",d,true),tn.stopOverlay("pixi-inspect-hl");},e}class ih extends kt{constructor(){super({id:"dev",label:"DEV"});}build(t){const n="gemini-dev-section-styles";if(!document.getElementById(n)){const m=document.createElement("style");m.id=n,m.textContent=`
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
            `,document.head.appendChild(m);}const o=h("div",{className:"gemini-dev-section",style:"height: 100%; display: flex; flex-direction: column;"}),r=h("div",{style:"padding: 6px 12px; background: rgba(0,0,0,0.3); border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; font-size: 11px;"}),a=localStorage.getItem("gemini:dev:auto-reload")!=="false",s=h("div",{style:"display: flex; align-items: center; gap: 12px;"}),c=h("input",{type:"checkbox",checked:a}),u=h("label",{style:"display: flex; align-items: center; gap: 4px; cursor: pointer;"});u.appendChild(c),u.appendChild(document.createTextNode("Auto-Reload on Save")),s.appendChild(u);const l=h("div",{style:"display: flex; align-items: center; gap: 8px;"}),d=h("button",{textContent:"Reload Script",style:"background: var(--color-primary); color: #fff; border: none; padding: 3px 8px; border-radius: 4px; cursor: pointer; font-weight: bold; display: none;"}),p=h("span",{textContent:"Vite Connected",style:"opacity: 0.5;"});l.appendChild(p),l.appendChild(d),r.appendChild(s),r.appendChild(l);const f=h("div",{style:"flex: 1; min-height: 0; display: flex; flex-direction: column; padding: 12px; overflow: hidden;"}),g=[{id:"atoms",label:"Atoms",content:Ym()},{id:"ws",label:"WS Trace",content:Cg()},{id:"pixi",label:"Pixi Tools",content:oh()},{id:"ui",label:"UI Gallery",content:rh()}],b=Ti(g.map(m=>({id:m.id,label:m.label})),"atoms",m=>{f.innerHTML="";const v=g.find(S=>S.id===m);v&&f.appendChild(v.content);});o.appendChild(r),o.appendChild(b.root),o.appendChild(f),f.appendChild(g[0].content),t.appendChild(o);}}let xr=null;function vs(){return xr||(xr=new Ud),xr}function ah(e){const t=[new Al(e),new Hm,new Wm,new Km];return t.push(new ih),t.push(vs()),t}async function sh(){await vs().preload();}function lh(e){const{shadow:t,initialOpen:n}=e,o=h("div",{className:"gemini-panel",id:"panel",ariaHidden:String(!n)}),r=h("div",{className:"gemini-tabbar"}),i=h("div",{className:"gemini-content",id:"content"}),a=h("div",{className:"gemini-resizer",title:"Resize"}),s=h("button",{className:"gemini-close",title:"Fermer",ariaLabel:"Fermer"},"✕");o.append(r,i,a);const c=h("div",{className:"gemini-wrapper"},o);return t.append(c),{panel:o,tabbar:r,content:i,resizer:a,closeButton:s,wrapper:c}}function ch(e){const{resizer:t,host:n,shadow:o,onWidthChange:r,initialWidth:i,minWidth:a,maxWidth:s}=e;let c=a,u=s;function l(){const x=$e.detect(),A=Math.round(N.visualViewport?.width??N.innerWidth??0);if(x.platform==="mobile"||x.os==="ios"||x.os==="android"){const w=getComputedStyle(o.host),T=parseFloat(w.getPropertyValue("--inset-l"))||0,I=parseFloat(w.getPropertyValue("--inset-r"))||0,k=Math.max(280,A-Math.round(T+I));c=280,u=k;}else c=a,u=s;return {min:c,max:u}}function d(x){return Math.max(c,Math.min(u,Number(x)||i))}function p(x){const A=d(x);n.style.setProperty("--w",`${A}px`),r(A);}l();const f=$e.detect(),g=!(f.platform==="mobile"||f.os==="ios"||f.os==="android");let b=false;const m=x=>{if(!b)return;x.preventDefault();const A=Math.round(N.innerWidth-x.clientX);p(A);},v=()=>{b&&(b=false,document.body.style.cursor="",N.removeEventListener("mousemove",m),N.removeEventListener("mouseup",v));},S=x=>{g&&(x.preventDefault(),b=true,document.body.style.cursor="ew-resize",N.addEventListener("mousemove",m),N.addEventListener("mouseup",v));};t.addEventListener("mousedown",S);function y(){t.removeEventListener("mousedown",S),N.removeEventListener("mousemove",m),N.removeEventListener("mouseup",v);}return {calculateResponsiveBounds:l,constrainWidthToLimits:d,setHudWidth:p,destroy:y}}function dh(e){const{panel:t,onToggle:n,onClose:o,toggleCombo:r=c=>c.ctrlKey&&c.shiftKey&&c.key.toLowerCase()==="u",closeOnEscape:i=true}=e;function a(c){const u=t.classList.contains("open");if(i&&c.key==="Escape"&&u){o();return}r(c)&&(c.preventDefault(),c.stopPropagation(),n());}document.addEventListener("keydown",a,{capture:true});function s(){document.removeEventListener("keydown",a,{capture:true});}return {destroy:s}}const uh=`
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
`,ph=`
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
`,fh=`
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
`;function gh(e,t,n){if(e.querySelector(`style[data-style-id="${n}"]`))return;const o=document.createElement("style");o.setAttribute("data-style-id",n),o.textContent=t,e.appendChild(o);}const mh=`
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
  
`,hh=`
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
`,bh=`
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
`,yh=`
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
`,vh=`
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
`,xh=`
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

/* Ribbon containing the tabs */
.lg-tabs{
  position: relative;
  display: flex;
  align-items: center;
  gap: 2px;

  min-width: 0;       /* allow shrink */
  width: 100%;
  max-width: none;

  background-color: var(--tab-bg);
  color: var(--tab-fg);
  border-radius: 999px;
  padding: 6px;

  box-shadow: 0 4px 12px color-mix(in oklab, var(--shadow) 32%, transparent);

  overflow: auto hidden;   /* horizontal scroll if too many tabs */
  scrollbar-width: none;
  transition: background-color .28s ease, color .28s ease;
}
.lg-tabs::-webkit-scrollbar{ display:none; }

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
  .lg-tabs{ padding: 5px; }
  .lg-tab{ padding: 9px 14px; font-size: 13.5px; }
  .lg-pill{ top: 5px; height: calc(100% - 10px); }
}

@media (max-width: 480px){
  .lg-tabbar{
    padding: 12px max(10px, var(--inset-l)) 12px max(10px, var(--inset-r));
    gap: 12px;
  }
  .lg-tabs{
    border-radius: 14px;
    padding: 4px;
  }
  .lg-tab{
    padding: 8px 12px;
    font-size: 13px;
  }
  .lg-pill{
    top: 4px;
    height: calc(100% - 8px);
  }
}

@media (max-width: 360px){
  .lg-tab{ padding: 6px 10px; font-size: 12px; }
}
`,wh=`
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
`,Sh=`
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
`,kh=`
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
`,Ch=`
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
`,Ah=`
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
`,Th=`
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
`,Ih=`
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
`,Ph=`
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
`,Eh=`
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
`,Mh=`
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
`,Lh=`
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
`,Rh={all:"initial",position:"fixed",top:"0",right:"0",zIndex:"2147483647",pointerEvents:"auto",fontFamily:'system-ui, -apple-system, "Segoe UI", Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',fontSize:"13px",lineHeight:"1.35"};function _h(e="gemini-root"){const t=document.createElement("div");t.id=e,Object.assign(t.style,Rh),(document.body||document.documentElement).appendChild(t);const n=t.attachShadow({mode:"open"});return {host:t,shadow:n}}function Oh(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:16}):setTimeout(e,0);})}async function Nh(e){const{hostId:t="gemini-hud-root",initialWidth:n,initialOpen:o,onWidthChange:r,onOpenChange:i,themes:a,initialTheme:s,onThemeChange:c,buildSections:u,initialTab:l,onTabChange:d,toggleCombo:p=L=>L.ctrlKey&&L.shiftKey&&L.key.toLowerCase()==="u",closeOnEscape:f=true,minWidth:g=420,maxWidth:b=720}=e,{host:m,shadow:v}=_h(t),S=[[Em,"variables"],[ph,"primitives"],[fh,"utilities"],[uh,"hud"],[mh,"card"],[hh,"badge"],[bh,"button"],[yh,"input"],[vh,"label"],[xh,"navTabs"],[wh,"searchBar"],[Sh,"select"],[kh,"switch"],[Ch,"table"],[Ah,"timeRangePicker"],[Th,"tooltip"],[Ih,"slider"],[Ph,"reorderableList"],[Eh,"colorPicker"],[Mh,"log"],[Lh,"settings"]];for(let L=0;L<S.length;L++){const[O,W]=S[L];gh(v,O,W),L%5===4&&await Oh();}const{panel:y,tabbar:x,content:A,resizer:w,closeButton:T,wrapper:I}=lh({shadow:v,initialOpen:o});function k(L){y.dispatchEvent(new CustomEvent("gemini:hud-open-change",{detail:{isOpen:L},bubbles:true})),i?.(L);}function E(L){const O=y.classList.contains("open");y.classList.toggle("open",L),y.setAttribute("aria-hidden",L?"false":"true"),L!==O&&k(L);}E(o),T.addEventListener("click",L=>{L.preventDefault(),L.stopPropagation(),E(false);});const M=vl({host:m,themes:a,initialTheme:s,onThemeChange:c}),G=ch({resizer:w,host:m,shadow:v,onWidthChange:r||(()=>{}),initialWidth:n,minWidth:g,maxWidth:b});G.setHudWidth(n);const Q=u({applyTheme:M.applyTheme,initialTheme:s,getCurrentTheme:M.getCurrentTheme,setHUDWidth:G.setHudWidth,setHUDOpen:E}),P=new Ns(Q,A,{applyTheme:M.applyTheme,getCurrentTheme:M.getCurrentTheme}),D=Q.map(L=>({id:L.id,label:L.label})),B=l&&Q.some(L=>L.id===l)?l:D[0]?.id||"",$=Ti(D,B,L=>{P.activate(L),d?.(L);});$.root.style.flex="1 1 auto",$.root.style.minWidth="0",x.append($.root,T),B&&P.activate(B);const z=dh({panel:y,onToggle:()=>E(!y.classList.contains("open")),onClose:()=>E(false),toggleCombo:p,closeOnEscape:f}),j=()=>{$.recalc();const L=parseInt(getComputedStyle(m).getPropertyValue("--w"))||n;G.calculateResponsiveBounds(),G.setHudWidth(L);};N.addEventListener("resize",j);const F=L=>{const O=L.detail?.width;O?G.setHudWidth(O):G.setHudWidth(n),$.recalc();};m.addEventListener("gemini:layout-resize",F);function _(){z.destroy(),G.destroy(),N.removeEventListener("resize",j),m.removeEventListener("gemini:layout-resize",F);}return {host:m,shadow:v,wrapper:I,panel:y,content:A,setOpen:E,setWidth:G.setHudWidth,sections:Q,manager:P,nav:$,destroy:_}}const Ft={isOpen:"gemini.hud.isOpen",width:"gemini.hud.width",theme:"gemini.hud.theme",activeTab:"gemini.hud.activeTab"},En={isOpen:false,width:480,theme:"dark",activeTab:"tab-settings"};function $h(){return {isOpen:_t(Ft.isOpen,En.isOpen),width:_t(Ft.width,En.width),theme:_t(Ft.theme,En.theme),activeTab:_t(Ft.activeTab,En.activeTab)}}function Mn(e,t){Ii(Ft[e],t);}const Dh="https://i.imgur.com/IMkhMur.png",zh="Stats";function Fh(e){let t=e.iconUrl||Dh;const n=e.ariaLabel||"Open MGH";let o=null,r=null,i=null,a=false,s=null,c=null;const u=["Chat","Leaderboard","Stats","Open Activity Log"],l=y=>{try{return typeof CSS<"u"&&CSS&&typeof CSS.escape=="function"?CSS.escape(y):y.replace(/"/g,'\\"')}catch{return y}};function d(){const y=document.querySelector(u.map(A=>`button[aria-label="${l(A)}"]`).join(","));if(!y)return null;let x=y.parentElement;for(;x&&x!==document.body;){if(u.reduce((w,T)=>w+x.querySelectorAll(`button[aria-label="${l(T)}"]`).length,0)>=2)return x;x=x.parentElement;}return null}function f(y){const x=Array.from(y.querySelectorAll("button[aria-label]"));if(!x.length)return {refBtn:null,refWrapper:null};const A=x.filter(G=>G.dataset.mghBtn!=="true"&&(G.getAttribute("aria-label")||"")!==(e.ariaLabel||"Open MGH")),w=A.length?A:x,T=w.find(G=>(G.getAttribute("aria-label")||"").toLowerCase()===zh.toLowerCase())||null,I=w.length>=2?w.length-2:w.length-1,k=T||w[I],E=k.parentElement,M=E&&E.parentElement===y&&E.tagName==="DIV"?E:null;return {refBtn:k,refWrapper:M}}function g(y,x,A){const w=y.cloneNode(false);w.type="button",w.setAttribute("aria-label",x),w.title=x,w.dataset.mghBtn="true",w.style.pointerEvents="auto",w.removeAttribute("id");const T=document.createElement("img");return T.src=A,T.alt="MGH",T.style.pointerEvents="none",T.style.userSelect="none",T.style.width="76%",T.style.height="76%",T.style.objectFit="contain",T.style.display="block",T.style.margin="auto",w.appendChild(T),w.addEventListener("click",I=>{I.preventDefault(),I.stopPropagation();try{e.onClick?.();}catch{}}),w}function b(){if(a)return  false;a=true;let y=false;try{const x=d();if(!x)return !1;s!==x&&(s=x);const{refBtn:A,refWrapper:w}=f(x);if(!A)return !1;r=x.querySelector('div[data-mgh-wrapper="true"]'),!r&&w&&(r=w.cloneNode(!1),r.dataset.mghWrapper="true",r.removeAttribute("id"),y=!0);const T=r?.querySelector('button[data-mgh-btn="true"]')||null;o||(o=T),o||(o=g(A,n,t),r?r.appendChild(o):o.parentElement!==x&&x.appendChild(o),y=!0),r&&r.parentElement!==x&&(x.appendChild(r),y=!0);const I=x;if(I&&I!==c){try{S.disconnect();}catch{}c=I,S.observe(c,{childList:!0,subtree:!0});}return y}finally{a=false;}}const m=document.getElementById("App")||document.body;let v=null;const S=new MutationObserver(y=>{const x=y.every(w=>{const T=Array.from(w.addedNodes||[]),I=Array.from(w.removedNodes||[]),k=T.concat(I);if(k.length===0){const E=w.target;return r&&(E===r||r.contains(E))||o&&(E===o||o.contains(E))}return k.every(E=>!!(!(E instanceof HTMLElement)||r&&(E===r||r.contains(E))||o&&(E===o||o.contains(E))))}),A=y.some(w=>Array.from(w.removedNodes||[]).some(T=>T instanceof HTMLElement?!!(r&&(T===r||r.contains(T))||o&&(T===o||o.contains(T))):false));x&&!A||v===null&&(v=window.setTimeout(()=>{if(v=null,b()&&r){const T=r.parentElement;T&&T.lastElementChild!==r&&T.appendChild(r);}},150));});return b(),S.observe(m,{childList:true,subtree:true}),i=()=>S.disconnect(),()=>{try{i?.();}catch{}try{r?.remove();}catch{}}}const xs=[];function jh(){return xs.slice()}function Gh(e){xs.push(e);}function ws(e){try{return JSON.parse(e)}catch{return}}function Si(e){if(typeof e=="string"){const t=ws(e);return t!==void 0?t:e}return e}function Ss(e){if(e!=null){if(typeof e=="string"){const t=ws(e);return t!==void 0?Ss(t):e}if(Array.isArray(e)&&typeof e[0]=="string")return e[0];if(typeof e=="object"){const t=e;return t.type??t.Type??t.kind??t.messageType}}}function Bh(e){const t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function q(e,t,n){const o=typeof t=="boolean"?t:true,r=typeof t=="function"?t:n,i=(a,s)=>{if(Ss(a)!==e)return;const u=r(a,s);return u&&typeof u=="object"&&"kind"in u?u:typeof u=="boolean"?u?void 0:{kind:"drop"}:o?void 0:{kind:"drop"}};return Gh(i),i}const Rt=new WeakSet,ki=new WeakMap;function Wh(e){const t=e.pageWindow,n=!!e.debug,o=e.middlewares&&e.middlewares.length?e.middlewares:jh();if(!o.length)return ()=>{};const r=p=>({ws:p,pageWindow:t,debug:n}),i=(p,f)=>{let g=p;for(const b of o){const m=b(g,r(f));if(m){if(m.kind==="drop")return {kind:"drop"};m.kind==="replace"&&(g=m.message);}}return g!==p?{kind:"replace",message:g}:void 0};let a=null,s=null,c=null;const u=()=>{const p=t?.MagicCircle_RoomConnection,f=p?.sendMessage;if(!p||typeof f!="function")return  false;if(Rt.has(f))return  true;const g=f.bind(p);function b(...m){const v=m.length===1?m[0]:m,S=Si(v),y=i(S,Bh(t));if(y?.kind==="drop"){n&&console.log("[WS] drop outgoing (RoomConnection.sendMessage)",S);return}if(y?.kind==="replace"){const x=y.message;return m.length>1&&Array.isArray(x)?(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",S,"=>",x),g(...x)):(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",S,"=>",x),g(x))}return g(...m)}Rt.add(b),ki.set(b,f);try{p.sendMessage=b,Rt.add(p.sendMessage),n&&console.log("[WS] outgoing patched via MagicCircle_RoomConnection.sendMessage");}catch{return  false}return a=()=>{try{p.sendMessage===b&&(p.sendMessage=f);}catch{}},true};(()=>{const p=t?.WebSocket?.prototype,f=p?.send;if(typeof f!="function"||Rt.has(f))return;function g(b){const m=Si(b),v=i(m,this);if(v?.kind==="drop"){n&&console.log("[WS] drop outgoing (ws.send)",m);return}if(v?.kind==="replace"){const S=v.message,y=typeof S=="string"||S instanceof ArrayBuffer||S instanceof Blob?S:JSON.stringify(S);return n&&console.log("[WS] replace outgoing (ws.send)",m,"=>",S),f.call(this,y)}return f.call(this,b)}Rt.add(g),ki.set(g,f);try{p.send=g,n&&console.log("[WS] outgoing patched via WebSocket.prototype.send");}catch{return}s=()=>{try{p.send===g&&(p.send=f);}catch{}};})();const d=e.waitForRoomConnectionMs??4e3;if(!u()&&d>0){const p=Date.now();c=setInterval(()=>{if(u()){clearInterval(c),c=null;return}Date.now()-p>d&&(clearInterval(c),c=null,n&&console.log("[WS] RoomConnection not found, only ws.send is patched"));},250);}return ()=>{if(c){try{clearInterval(c);}catch{}c=null;}if(a){try{a();}catch{}a=null;}if(s){try{s();}catch{}s=null;}}}(function(){try{const t=module.meta,n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();const ks=[];function Hh(){return ks.slice()}function Ci(e){ks.push(e);}function Vh(e){if(e!=null){if(typeof e=="object"){const t=e;if(typeof t.type=="string")return t.type;if(typeof t.Type=="string")return t.Type;if(typeof t.kind=="string")return t.kind;if(typeof t.messageType=="string")return t.messageType}if(Array.isArray(e)&&typeof e[0]=="string")return e[0]}}function Uh(e){if(typeof e=="string")try{return JSON.parse(e)}catch{return e}return e}const wr=Symbol.for("ariesmod.ws.handlers.patched");function ve(e,t){if(typeof e=="string"){const r=e,i={match:a=>a.kind==="message"&&a.type===r,handle:t};return Ci(i),i}const n=e,o={match:r=>r.kind==="close"&&r.code===n,handle:t};return Ci(o),o}function Kh(e,t=Hh(),n={}){const o=n.pageWindow??window,r=!!n.debug;if(e[wr])return ()=>{};e[wr]=true;const i={ws:e,pageWindow:o,debug:r},a=d=>{for(const p of t)try{if(!p.match(d))continue;if(p.handle(d,i)===!0)return}catch(f){r&&console.error("[WS] handler error",f,d);}},s=d=>{const p=Uh(d.data),f=Vh(p);a({kind:"message",raw:d.data,data:p,type:f});},c=d=>{a({kind:"close",code:d.code,reason:d.reason,wasClean:d.wasClean,event:d});},u=d=>a({kind:"open",event:d}),l=d=>a({kind:"error",event:d});return e.addEventListener("message",s),e.addEventListener("close",c),e.addEventListener("open",u),e.addEventListener("error",l),()=>{try{e.removeEventListener("message",s);}catch{}try{e.removeEventListener("close",c);}catch{}try{e.removeEventListener("open",u);}catch{}try{e.removeEventListener("error",l);}catch{}try{delete e[wr];}catch{}}}(function(){try{const t=module.meta,n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();ve(Fe.AuthenticationFailure,(e,t)=>{t.debug&&console.log("[WS][Close] Auth failure",e.code,e.reason);});ve(Fe.ConnectionSuperseded,(e,t)=>{t.debug&&console.log("[WS][Close] Superseded",e.code,e.reason);});ve(Fe.HeartbeatExpired,(e,t)=>{t.debug&&console.log("[WS][Close] Heartbeat expired",e.code,e.reason);});ve(Fe.PlayerKicked,(e,t)=>{t.debug&&console.log("[WS][Close] Player kicked",e.code,e.reason);});ve(Fe.PlayerLeftVoluntarily,(e,t)=>{t.debug&&console.log("[WS][Close] Player left voluntarily",e.code,e.reason);});ve(Fe.ReconnectInitiated,(e,t)=>{t.debug&&console.log("[WS][Close] Reconnect initiated",e.code,e.reason);});ve(Fe.ServerDisposed,(e,t)=>{t.debug&&console.log("[WS][Close] Server disposed",e.code,e.reason);});ve(Fe.UserSessionSuperseded,(e,t)=>{t.debug&&console.log("[WS][Close] User session superseded",e.code,e.reason);});ve(Fe.VersionExpired,(e,t)=>{t.debug&&console.log("[WS][Close] Version expired",e.code,e.reason);});ve(Fe.VersionMismatch,(e,t)=>{t.debug&&console.log("[WS][Close] Version mismatch",e.code,e.reason);});ve(qe.Config,(e,t)=>{t.debug&&console.log("[WS][STC] Config",e.data);});ve(qe.CurrencyTransaction,(e,t)=>{t.debug&&console.log("[WS][STC] CurrencyTransaction",e.data);});ve(qe.Emote,(e,t)=>{t.debug&&console.log("[WS][STC] Emote",e.data);});ve(qe.InappropriateContentRejected,(e,t)=>{t.debug&&console.log("[WS][STC] InappropriateContentRejected",e.data);});ve(qe.PartialState,(e,t)=>{t.debug&&console.log("[WS][STC] PartialState",e.data);});ve(qe.Pong,(e,t)=>{t.debug&&console.log("[WS][STC] Pong",e.data);});ve(qe.ServerErrorMessage,(e,t)=>{t.debug&&console.log("[WS][STC] ServerErrorMessage",e.data);});ve(qe.Welcome,(e,t)=>{t.debug&&console.log("[WS][STC] Welcome",e.data);});q(R.PlantSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantSeed"),true));q(R.WaterPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] WaterPlant"),true));q(R.HarvestCrop,(e,t)=>(t.debug&&console.log("[MW][Garden] HarvestCrop"),true));q(R.SellAllCrops,(e,t)=>(t.debug&&console.log("[MW][Garden] SellAllCrops"),true));q(R.PurchaseSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseSeed"),true));q(R.PurchaseEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseEgg"),true));q(R.PurchaseTool,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseTool"),true));q(R.PurchaseDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseDecor"),true));q(R.PlantEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantEgg"),true));q(R.HatchEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] HatchEgg"),true));q(R.PlantGardenPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantGardenPlant"),true));q(R.PotPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PotPlant"),true));q(R.MutationPotion,(e,t)=>(t.debug&&console.log("[MW][Garden] MutationPotion"),true));q(R.PickupDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PickupDecor"),true));q(R.PlaceDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PlaceDecor"),true));q(R.RemoveGardenObject,(e,t)=>(t.debug&&console.log("[MW][Garden] RemoveGardenObject"),true));q(R.MoveInventoryItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveInventoryItem"),true));q(R.DropObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] DropObject"),true));q(R.PickupObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] PickupObject"),true));q(R.ToggleFavoriteItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] ToggleFavoriteItem"),true));q(R.PutItemInStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] PutItemInStorage"),true));q(R.RetrieveItemFromStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] RetrieveItemFromStorage"),true));q(R.MoveStorageItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveStorageItem"),true));q(R.LogItems,(e,t)=>(t.debug&&console.log("[MW][Inventory] LogItems"),true));q(R.PlacePet,(e,t)=>(t.debug&&console.log("[MW][Pets] PlacePet"),true));q(R.FeedPet,(e,t)=>(t.debug&&console.log("[MW][Pets] FeedPet"),true));q(R.PetPositions,(e,t)=>(t.debug&&console.log("[MW][Pets] PetPositions"),true));q(R.SwapPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SwapPet"),true));q(R.StorePet,(e,t)=>(t.debug&&console.log("[MW][Pets] StorePet"),true));q(R.NamePet,(e,t)=>(t.debug&&console.log("[MW][Pets] NamePet"),true));q(R.SellPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SellPet"),true));console.log("[WS] TESTTEST");q(R.SetSelectedGame,(e,t)=>(t.debug&&console.log("[MW][Session] SetSelectedGame"),true));q(R.VoteForGame,(e,t)=>(t.debug&&console.log("[MW][Session] VoteForGame"),true));q(R.RequestGame,(e,t)=>(t.debug&&console.log("[MW][Session] RequestGame"),true));q(R.RestartGame,(e,t)=>(t.debug&&console.log("[MW][Session] RestartGame"),true));q(R.Ping,(e,t)=>(t.debug&&console.log("[MW][Session] Ping"),true));q(R.PlayerPosition,(e,t)=>(t.debug&&console.log("[MW][Session] PlayerPosition"),true));q(R.Teleport,(e,t)=>(t.debug&&console.log("[MW][Session] Teleport"),true));q(R.CheckWeatherStatus,(e,t)=>(t.debug&&console.log("[MW][Session] CheckWeatherStatus"),true));q(R.Chat,(e,t)=>(t.debug&&console.log("[MW][Social] Chat"),true));q(R.Dev,(e,t)=>(t.debug&&console.log("[MW][Social] Dev"),true));q(R.Emote,(e,t)=>(t.debug&&console.log("[MW][Social] Emote"),true));q(R.Wish,(e,t)=>(t.debug&&console.log("[MW][Social] Wish"),true));q(R.KickPlayer,(e,t)=>(t.debug&&console.log("[MW][Social] KickPlayer"),true));q(R.ReportSpeakingStart,(e,t)=>(t.debug&&console.log("[MW][Voice] ReportSpeakingStart"),true));q(R.SetPlayerData,(e,t)=>(t.debug&&console.log("[MW][Social] SetPlayerData"),true));q(R.UsurpHost,(e,t)=>(t.debug&&console.log("[MW][Social] UsurpHost"),true));function qh(e={}){const t=e.pageWindow??N,n=e.pollMs??500,o=!!e.debug,r=[];r.push(Ig(t,{debug:o})),r.push(Wh({pageWindow:t,middlewares:e.middlewares,debug:o}));let i=null;const a=s=>{if(i){try{i();}catch{}i=null;}s&&(i=Kh(s,e.handlers,{debug:o,pageWindow:t}));};return a(Kn(t).ws),r.push(ss(s=>a(s.ws),{intervalMs:n,debug:o,pageWindow:t})),{getWs:()=>Kn(t).ws,dispose:()=>{for(let s=r.length-1;s>=0;s--)try{r[s]();}catch{}if(i){try{i();}catch{}i=null;}}}}let Ln=null;function Yh(e={}){return Ln||(Ln=qh(e),Ln)}function Xh(e){e.logStep("WebSocket","Capturing WebSocket...");let t=null;return t=ss(n=>{n.ws&&(e.logStep("WebSocket","WebSocket captured","success"),t?.(),t=null);},{intervalMs:250}),Yh({debug:false}),()=>{t?.(),t=null;}}async function Jh(e){e.logStep("Atoms","Prewarming Jotai store...");try{await gu(),await du({timeoutMs:8e3,intervalMs:50}),e.logStep("Atoms","Jotai store ready","success");}catch(t){e.logStep("Atoms","Jotai store not captured yet","error"),console.warn("[Bootstrap] Jotai store wait failed",t);}}function Qh(e){e.logStep("Globals","Initializing global variables...");try{is(),e.logStep("Globals","Global variables ready","success");}catch(t){e.logStep("Globals","Failed to initialize global variables","error"),console.warn("[Bootstrap] Global variables init failed",t);}}function Zh(e){e.logStep("API","Exposing Gemini API...");try{qm(),e.logStep("API","Gemini API ready","success");}catch(t){e.logStep("API","Failed to expose API","error"),console.warn("[Bootstrap] API init failed",t);}}function Sr(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0);})}async function eb(e){e.logStep("HUD","Loading HUD preferences..."),await Sr();const t=$h();await Sr();const n=await Nh({hostId:"gemini-hud-root",initialWidth:t.width,initialOpen:t.isOpen,onWidthChange:o=>Mn("width",o),onOpenChange:o=>Mn("isOpen",o),themes:Gt,initialTheme:t.theme,onThemeChange:o=>Mn("theme",o),buildSections:o=>ah({applyTheme:o.applyTheme,initialTheme:o.initialTheme,getCurrentTheme:o.getCurrentTheme}),initialTab:t.activeTab,onTabChange:o=>Mn("activeTab",o)});return await Sr(),e.logStep("HUD","HUD ready","success"),n}async function tb(e){e.setSubtitle("Activating Gemini modules..."),await Gm(t=>{t.status==="start"?e.logStep(t.name,`Loading ${t.name}...`):t.status==="success"?e.logStep(t.name,`${t.name} ready`,"success"):e.logStep(t.name,`${t.name} encountered an issue.`,"error");});}async function nb(e){e.logStep("Sprites","Warming up sprite cache...");try{se.ready()||await se.init();const t=[],n=me.get("plants");if(n)for(const a of Object.values(n))a?.seed?.spriteId&&t.push(a.seed.spriteId),a?.plant?.spriteId&&t.push(a.plant.spriteId),a?.crop?.spriteId&&t.push(a.crop.spriteId);const o=me.get("pets");if(o)for(const a of Object.values(o))a?.spriteId&&t.push(a.spriteId);const r=[...new Set(t)],i=r.length;if(i===0){e.logStep("Sprites","No sprites to warmup","success");return}await se.warmup(r,(a,s)=>{e.logStep("Sprites",`Loading sprites (${a}/${s})...`);},5),e.logStep("Sprites",`${i} sprites loaded`,"success");}catch(t){e.logStep("Sprites","Sprite warmup failed","error"),console.warn("[Bootstrap] Sprite warmup failed",t);}}async function rb(e){e.logStep("Sections","Preloading UI sections...");try{await sh(),e.logStep("Sections","Sections preloaded","success");}catch(t){e.logStep("Sections","Sections preload failed","error"),console.warn("[Bootstrap] Sections preload failed",t);}}(async function(){const e=Os({title:"Gemini is loading",subtitle:"Connecting and preparing modules..."});let t=null;try{t=Xh(e),await Jh(e),Qh(e),Zh(e),await tb(e),await nb(e),await rb(e),e.succeed("Gemini is ready!");}catch(o){e.fail("Failed to initialize the mod.",o);}finally{t?.();}const n=await eb(e);Fh({onClick:()=>n.setOpen(true)});})();

    })
  };
}));

System.register("./index-DBEq6NTa-xvDn0gMe.js", ['./__monkey.entry-BVC6Tyi9.js'], (function (exports, module) {
	'use strict';
	var me, qf;
	return {
		setters: [module => {
			me = module.m;
			qf = module.q;
		}],
		execute: (function () {

			exports({
				aggregateJournalProgress: k,
				calculatePetProgress: J,
				calculateProduceProgress: O,
				getCropVariants: D,
				getMissingSummary: C,
				getMyJournal: L,
				getPetAbilities: j,
				getPetVariants: T
			});

			let y=null,M=null;function L(){try{return qf().get().myPlayer?.journal||null}catch{return null}}function V(n){return n?`pro:${Object.keys(n.produce).length}-pet:${Object.keys(n.pets).length}`:"null"}function D(){const n=me.get("mutations")??{};return ["Normal",...Object.keys(n),"Max Weight"]}function T(){const n=me.get("mutations")??{};return ["Normal",...Object.entries(n).filter(([t,s])=>!("tileRef"in s)).map(([t])=>t),"Max Weight"]}function j(n){const t=(me.get("pets")??{})[n];if(!t)return [];const s=new Set;return Array.isArray(t.abilities)&&t.abilities.forEach(a=>s.add(a)),Array.isArray(t.possibleAbilities)&&t.possibleAbilities.forEach(a=>s.add(a)),t.abilityTiers&&Object.values(t.abilityTiers).forEach(a=>{Array.isArray(a)&&a.forEach(l=>s.add(l));}),[...s]}function O(n){const e=me.get("plants")??{},t=Object.keys(e),s=D(),a=n?.produce??{},l=[];let c=0;for(const r of t){const i=a[r]?.variantsLogged?.map(o=>o.variant)??[],f=s.filter(o=>!i.includes(o));c+=i.length,l.push({species:r,variantsLogged:i,variantsMissing:f,variantsTotal:s.length,variantsPercentage:s.length>0?i.length/s.length*100:0,isComplete:f.length===0});}const g=t.length*s.length,h=l.filter(r=>r.variantsLogged.length>0).length;return {total:t.length,logged:h,percentage:t.length>0?h/t.length*100:0,speciesDetails:l,variantsTotal:g,variantsLogged:c,variantsPercentage:g>0?c/g*100:0}}function J(n){const e=me.get("pets")??{},t=Object.keys(e),s=T(),a=n?.pets??{},l=[];let c=0,g=0,h=0,r=0;for(const i of t){const f=a[i],o=f?.variantsLogged?.map(u=>u.variant)??[],b=f?.abilitiesLogged?.map(u=>u.ability)??[],v=s.filter(u=>!o.includes(u)),p=j(i),P=p.filter(u=>!b.includes(u));g+=s.length,c+=o.length,r+=p.length,h+=Math.min(b.length,p.length),l.push({species:i,variantsLogged:o,variantsMissing:v,variantsTotal:s.length,variantsPercentage:s.length>0?o.length/s.length*100:0,abilitiesLogged:b,abilitiesMissing:P,abilitiesTotal:p.length,abilitiesPercentage:p.length>0?b.length/p.length*100:0,isComplete:v.length===0&&(p.length===0||P.length===0)});}const m=l.filter(i=>i.variantsLogged.length>0).length;return {total:t.length,logged:m,percentage:t.length>0?m/t.length*100:0,speciesDetails:l,variantsTotal:g,variantsLogged:c,variantsPercentage:g>0?c/g*100:0,abilitiesTotal:r,abilitiesLogged:h,abilitiesPercentage:r>0?h/r*100:0}}async function k(n=false){await me.waitForAnyData();const e=L(),t=V(e);if(!n&&y&&t===M)return y;const s={plants:O(e),pets:J(e),lastUpdated:Date.now()};return y=s,M=t,s}async function C(){const n=await k();return {plants:n.plants.speciesDetails.filter(e=>e.variantsMissing.length>0).map(e=>({species:e.species,missing:e.variantsMissing})),pets:n.pets.speciesDetails.filter(e=>e.variantsMissing.length>0||(e.abilitiesMissing?.length??0)>0).map(e=>({species:e.species,missingVariants:e.variantsMissing,missingAbilities:e.abilitiesMissing??[]}))}}

		})
	};
}));

System.import("./__entry.js", "./");