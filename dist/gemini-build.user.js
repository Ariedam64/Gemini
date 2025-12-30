// ==UserScript==
// @name         Gemini
// @namespace    Gemini
// @version      1.0.0
// @match        https://1227719606223765687.discordsays.com/*
// @match        https://magiccircle.gg/r/*
// @match        https://magicgarden.gg/r/*
// @match        https://starweaver.org/r/*
// @run-at       document-start
// @inject-into  page
// @grant        GM_xmlhttpRequest
// @grant        GM_info
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_openInTab
// @grant        GM_registerMenuCommand
// @resource     ICON https://imgur.com/a/nf1ZKbp
// @connect      i.imgur.com
// ==/UserScript==
"use strict";(()=>{var Ha=Object.defineProperty;var su=(e,t,n)=>t in e?Ha(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var lu=(e,t)=>()=>(e&&(t=e(e=0)),t);var Tn=(e,t)=>{for(var n in t)Ha(e,n,{get:t[n],enumerable:!0})};var le=(e,t,n)=>su(e,typeof t!="symbol"?t+"":t,n);var ai={};Tn(ai,{clamp:()=>Me,clamp01:()=>No,sleep:()=>Ve,tryDo:()=>ke,waitWithTimeout:()=>Gn});async function Gn(e,t,n){let r=performance.now();for(;performance.now()-r<t;){let o=await Promise.race([e,Ve(50).then(()=>null)]);if(o!==null)return o}throw new Error(`${n} timeout`)}var Ve,ke,Me,No,$e=lu(()=>{"use strict";Ve=e=>new Promise(t=>setTimeout(t,e)),ke=e=>{try{return e()}catch{return}},Me=(e,t,n)=>Math.max(t,Math.min(n,e)),No=e=>Me(e,0,1)});function w(e,t=null,...n){let r=document.createElement(e);for(let[o,a]of Object.entries(t||{}))a!=null&&(o==="style"?typeof a=="string"?r.setAttribute("style",a):typeof a=="object"&&Object.assign(r.style,a):o.startsWith("on")&&typeof a=="function"?r[o.toLowerCase()]=a:o in r?r[o]=a:r.setAttribute(o,String(a)));for(let o of n)o==null||o===!1||r.appendChild(typeof o=="string"||typeof o=="number"?document.createTextNode(String(o)):o);return r}var kn="https://i.imgur.com/k5WuC32.png",Ga="gemini-loader-style",et="gemini-loader",Na=80;function cu(){if(document.getElementById(Ga))return;let e=document.createElement("style");e.id=Ga,e.textContent=`
    /* ===== Loader Variables ===== */
    #${et} {
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
    #${et} {
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

    #${et}.gemini-loader--error .gemini-loader__actions {
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
    #${et}.gemini-loader--closing {
      animation: gemini-loader-fade-out 0.4s ease forwards;
      pointer-events: none;
    }

    #${et}.gemini-loader--error .gemini-loader__spinner {
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
      #${et} { padding: 16px 10px; }
      .gemini-loader__card { padding: 16px; }
      .gemini-loader__header { gap: 12px; }
      .gemini-loader__spinner { width: 42px; height: 42px; }
      .gemini-loader__spinner-icon { width: 56px; height: 56px; }
      .gemini-loader__title { font-size: 16px; }
    }
  `,document.head.appendChild(e)}function Cn(e,t,n){let r=w("div",{className:`gemini-loader__log ${n}`},w("div",{className:"gemini-loader__dot"}),w("div",{textContent:t}));for(e.appendChild(r);e.childElementCount>Na;)e.firstElementChild?.remove();e.scrollTop=e.scrollHeight}function uu(){return new Promise(e=>{if(typeof GM_xmlhttpRequest>"u"){e(kn);return}GM_xmlhttpRequest({method:"GET",url:kn,responseType:"blob",onload:t=>{let n=t.response,r=new FileReader;r.onloadend=()=>e(r.result),r.onerror=()=>e(kn),r.readAsDataURL(n)},onerror:()=>e(kn)})})}function Lo(e={}){let t=Number.isFinite(e.blurPx)?Math.max(4,Number(e.blurPx)):14;cu();let n=w("div",{className:"gemini-loader__subtitle",textContent:e.subtitle??"Initializing the mod..."}),r=w("div",{className:"gemini-loader__logs"}),o=w("img",{className:"gemini-loader__spinner-icon",alt:"Gemini"}),a=w("div",{className:"gemini-loader__spinner"},o);uu().then(b=>{o.src=b});let i=w("div",{className:"gemini-loader__card"},w("div",{className:"gemini-loader__header"},a,w("div",{className:"gemini-loader__titles"},w("div",{className:"gemini-loader__title",textContent:e.title??"Gemini is loading"}),n)),r),s=w("div",{id:et},i);(document.body||document.documentElement).appendChild(s);let u=w("div",{className:"gemini-loader__actions"},w("button",{className:"gemini-loader__button",textContent:"Close loader",onclick:()=>s.remove()}));i.appendChild(u),s.style.setProperty("--loader-blur",`${t}px`);let d=b=>{n.textContent=b},l=new Map,c=(b,h)=>{b.className=`gemini-loader__log ${h}`};return{log:(b,h="info")=>Cn(r,b,h),logStep:(b,h,S="info")=>{let v=String(b||"").trim();if(!v){Cn(r,h,S);return}let y=l.get(v);if(y){y.el.lastElementChild&&(y.el.lastElementChild.textContent=h),y.tone!==S&&(c(y.el,S),y.tone=S);return}let k=w("div",{className:`gemini-loader__log ${S}`},w("div",{className:"gemini-loader__dot"}),w("div",{textContent:h}));for(l.set(v,{el:k,tone:S}),r.appendChild(k);r.childElementCount>Na;){let T=r.firstElementChild;if(!T)break;let A=Array.from(l.entries()).find(([,I])=>I.el===T)?.[0];A&&l.delete(A),T.remove()}r.scrollTop=r.scrollHeight},setSubtitle:d,succeed:(b,h=600)=>{b&&Cn(r,b,"success"),s.classList.add("gemini-loader--closing"),setTimeout(()=>s.remove(),h)},fail:(b,h)=>{Cn(r,b,"error"),d("Something went wrong. Check the console for details."),s.classList.add("gemini-loader--error"),console.error("[Gemini loader]",b,h)}}}function _a(e,t,n){let r=w("div",{className:"lg-pill",id:"pill"}),o=e.map(l=>{let c=w("button",{className:"lg-tab"},l.label);return c.setAttribute("data-target",l.id),c}),a=w("div",{className:"lg-tabs",id:"lg-tabs-row"},r,...o),i=a;a.addEventListener("wheel",l=>{Math.abs(l.deltaY)>Math.abs(l.deltaX)&&(l.preventDefault(),a.scrollLeft+=l.deltaY)},{passive:!1});function s(l){let c=a.getBoundingClientRect(),p=o.find(k=>k.dataset.target===l)||o[0];if(!p)return;let m=p.getBoundingClientRect(),f=m.left-c.left,g=m.width;r.style.width=`${g}px`,r.style.transform=`translateX(${f}px)`;let b=a.scrollLeft,h=b,S=b+a.clientWidth,v=f-12,y=f+g+12;v<h?a.scrollTo({left:v,behavior:"smooth"}):y>S&&a.scrollTo({left:y-a.clientWidth,behavior:"smooth"})}let u=t||(e[0]?.id??"");function d(l){u=l,o.forEach(c=>c.classList.toggle("active",c.dataset.target===l)),s(l),n(l)}return o.forEach(l=>l.addEventListener("click",()=>d(l.dataset.target))),queueMicrotask(()=>s(u)),{root:i,activate:d,recalc:()=>s(u),getActive:()=>u}}var tt=class{constructor(t){le(this,"id");le(this,"label");le(this,"container",null);le(this,"cleanupFunctions",[]);le(this,"preloadedContent",null);le(this,"preloadPromise",null);this.id=t.id,this.label=t.label}async preload(){if(this.preloadedContent||this.preloadPromise)return;let t=w("div");this.preloadPromise=(async()=>{let n=this.build(t);n instanceof Promise&&await n,this.preloadedContent=t,this.preloadPromise=null})(),await this.preloadPromise}isPreloaded(){return this.preloadedContent!==null}render(t){for(this.unmount();t.firstChild;)t.removeChild(t.firstChild);if(this.container=t,this.preloadedContent){for(;this.preloadedContent.firstChild;)t.appendChild(this.preloadedContent.firstChild);this.preloadedContent=null}else{let r=this.build(t);r instanceof Promise&&r.catch(o=>{console.error(`[Gemini] Error building section ${this.id}:`,o)})}let n=t.firstElementChild;n&&n.classList.contains("gemini-section")&&n.classList.add("active")}unmount(){this.executeCleanup(),this.container=null}createContainer(t,n){let r=n?`gemini-section ${n}`:"gemini-section";return w("section",{id:t,className:r})}addCleanup(t){this.cleanupFunctions.push(t)}createGrid(t="12px"){let n=w("div");return n.style.display="grid",n.style.gap=t,n}executeCleanup(){for(let t of this.cleanupFunctions)try{t()}catch(n){console.error(`[Gemini] Cleanup error in section ${this.id}:`,n)}this.cleanupFunctions=[]}};var Nt=class{constructor(t,n,r){le(this,"sections");le(this,"activeId",null);le(this,"container");le(this,"theme");this.sections=new Map(t.map(o=>[o.id,o])),this.container=n,this.theme=r}get ids(){return Array.from(this.sections.keys())}get all(){return Array.from(this.sections.values())}get active(){return this.activeId}activate(t){if(this.activeId!==t){if(!this.sections.has(t))throw new Error(`[Gemini] Unknown section: ${t}`);if(this.activeId&&this.sections.get(this.activeId).unmount(),this.activeId=t,this.sections.get(t).render(this.container),this.theme){let n=this.theme.getCurrentTheme();this.theme.applyTheme(n)}}}};function _t(e,t){try{let n=JSON.stringify(t);GM_setValue(e,n)}catch(n){console.error(`[Gemini] Failed to save key "${e}" to storage:`,n)}}function Ye(e,t){try{let n=GM_getValue(e);return n==null?t:typeof n=="string"?JSON.parse(n):n}catch(n){return console.error(`[Gemini] Failed to load key "${e}" from storage, using default:`,n),t}}var Wa="gemini.sections";function Ba(){let e=Ye(Wa,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function du(e){_t(Wa,e)}async function ja(e){return Ba()[e]}function za(e,t){let n=Ba();du({...n,[e]:t})}function Pn(e,t){return{...e,...t??{}}}async function Fa(e){let t=await ja(e.path),n;e.migrate?n=e.migrate(t):n=t??{},n=Object.assign((d=>JSON.parse(JSON.stringify(d)))(e.defaults),n),e.sanitize&&(n=e.sanitize(n));function o(){za(e.path,n)}function a(){return n}function i(d){n=e.sanitize?e.sanitize(d):d,o()}function s(d){let c=Object.assign((p=>JSON.parse(JSON.stringify(p)))(n),{});typeof d=="function"?d(c):Object.assign(c,d),n=e.sanitize?e.sanitize(c):c,o()}function u(){o()}return{get:a,set:i,update:s,save:u}}async function Wt(e,t){let{path:n=e,...r}=t;return Fa({path:n,...r})}var pu=0,An=new Map;function nt(e={},...t){let{id:n,className:r,variant:o="default",padding:a="md",interactive:i=!1,expandable:s=!1,defaultExpanded:u=!0,onExpandChange:d,mediaTop:l,title:c,subtitle:p,badge:m,actions:f,footer:g,divider:b=!1,tone:h="neutral",stateKey:S}=e,v=w("div",{className:"card",id:n,tabIndex:i?0:void 0});v.classList.add(`card--${o}`,`card--p-${a}`),i&&v.classList.add("card--interactive"),h!=="neutral"&&v.classList.add(`card--tone-${h}`),r&&v.classList.add(...r.split(" ").filter(Boolean)),s&&v.classList.add("card--expandable");let y=s?S??n??(typeof c=="string"?`title:${c}`:null):null,k=!s||u;y&&An.has(y)&&(k=!!An.get(y));let T=null,A=null,I=null,E=null,R=null,L=n?`${n}-collapse`:`card-collapse-${++pu}`,$=()=>{if(E!==null&&(cancelAnimationFrame(E),E=null),R){let G=R;R=null,G()}},oe=(G,H)=>{if(!I)return;$();let C=I;if(C.setAttribute("aria-hidden",String(!G)),!H){C.classList.remove("card-collapse--animating"),C.style.display=G?"":"none",C.style.height="",C.style.opacity="";return}if(C.classList.add("card-collapse--animating"),C.style.display="",G){C.style.height="auto";let j=C.scrollHeight;if(!j){C.classList.remove("card-collapse--animating"),C.style.display="",C.style.height="",C.style.opacity="";return}C.style.height="0px",C.style.opacity="0",C.offsetHeight,E=requestAnimationFrame(()=>{E=null,C.style.height=`${j}px`,C.style.opacity="1"})}else{let j=C.scrollHeight;if(!j){C.classList.remove("card-collapse--animating"),C.style.display="none",C.style.height="",C.style.opacity="";return}C.style.height=`${j}px`,C.style.opacity="1",C.offsetHeight,E=requestAnimationFrame(()=>{E=null,C.style.height="0px",C.style.opacity="0"})}let O=()=>{C.classList.remove("card-collapse--animating"),C.style.height="",G||(C.style.display="none"),C.style.opacity=""},D=null,_=j=>{j.target===C&&(D!==null&&(clearTimeout(D),D=null),C.removeEventListener("transitionend",_),C.removeEventListener("transitioncancel",_),R=null,O())};R=()=>{D!==null&&(clearTimeout(D),D=null),C.removeEventListener("transitionend",_),C.removeEventListener("transitioncancel",_),R=null,O()},C.addEventListener("transitionend",_),C.addEventListener("transitioncancel",_),D=window.setTimeout(()=>{R?.()},420)};function K(G){let H=document.createElementNS("http://www.w3.org/2000/svg","svg");return H.setAttribute("viewBox","0 0 24 24"),H.setAttribute("width","16"),H.setAttribute("height","16"),H.innerHTML=G==="up"?'<path d="M7 14l5-5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>':'<path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',H}function X(G,H=!0,C=!0){k=G,v.classList.toggle("card--collapsed",!k),v.classList.toggle("card--expanded",k),T&&(T.dataset.expanded=String(k),T.setAttribute("aria-expanded",String(k))),A&&(A.setAttribute("aria-expanded",String(k)),A.classList.toggle("card-toggle--collapsed",!k),A.setAttribute("aria-label",k?"Replier le contenu":"Deplier le contenu"),A.replaceChildren(K(k?"up":"down"))),s?oe(k,C):I&&(I.style.display="",I.style.height="",I.style.opacity="",I.setAttribute("aria-hidden","false")),H&&d&&d(k),y&&An.set(y,k)}if(l){let G=w("div",{className:"card-media"});G.append(l),v.appendChild(G)}let se=!!(c||p||m||f&&f.length||s);if(se){T=w("div",{className:"card-header"});let G=w("div",{className:"card-headline",style:"min-width:0;display:flex;flex-direction:column;gap:2px;"});if(c){let O=w("h3",{className:"card-title",style:"margin:0;font-size:15px;font-weight:700;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:8px;"},c);m&&O.append(typeof m=="string"?w("span",{className:"badge"},m):m),G.appendChild(O)}if(p){let O=w("div",{className:"card-subtitle",style:"opacity:.85;font-size:12px;color:color-mix(in oklab, var(--fg) 80%, #9ca3af)"},p);G.appendChild(O)}(G.childNodes.length||s)&&T.appendChild(G);let H=w("div",{className:"card-header-right",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"}),C=w("div",{className:"card-actions",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"});f?.forEach(O=>C.appendChild(O)),C.childNodes.length&&H.appendChild(C),s&&(A=w("button",{className:"card-toggle",type:"button",ariaExpanded:String(k),ariaControls:L,ariaLabel:k?"Replier le contenu":"Deplier le contenu"}),A.textContent=k?"\u25B2":"\u25BC",A.addEventListener("click",O=>{O.preventDefault(),O.stopPropagation(),X(!k)}),H.appendChild(A),T.classList.add("card-header--expandable"),T.addEventListener("click",O=>{let D=O.target;D?.closest(".card-actions")||D?.closest(".card-toggle")||X(!k)})),H.childNodes.length&&T.appendChild(H),v.appendChild(T)}I=w("div",{className:"card-collapse",id:L,ariaHidden:s?String(!k):"false"}),v.appendChild(I),b&&se&&I.appendChild(w("div",{className:"card-divider"}));let N=w("div",{className:"card-body"});if(N.append(...t),I.appendChild(N),g){b&&I.appendChild(w("div",{className:"card-divider"}));let G=w("div",{className:"card-footer"});G.append(g),I.appendChild(G)}return A&&A.setAttribute("aria-controls",L),X(k,!1,!1),y&&An.set(y,k),v}var Mn=!1,In=new Set,Le=e=>{let t=document.activeElement;for(let n of In)if(t&&(t===n||n.contains(t))){e.stopImmediatePropagation(),e.stopPropagation();return}};function mu(){Mn||(Mn=!0,window.addEventListener("keydown",Le,!0),window.addEventListener("keypress",Le,!0),window.addEventListener("keyup",Le,!0),document.addEventListener("keydown",Le,!0),document.addEventListener("keypress",Le,!0),document.addEventListener("keyup",Le,!0))}function gu(){Mn&&(In.size>0||(Mn=!1,window.removeEventListener("keydown",Le,!0),window.removeEventListener("keypress",Le,!0),window.removeEventListener("keyup",Le,!0),document.removeEventListener("keydown",Le,!0),document.removeEventListener("keypress",Le,!0),document.removeEventListener("keyup",Le,!0)))}function Ua(e){let{id:t,value:n=null,options:r,placeholder:o="Select...",size:a="md",disabled:i=!1,blockGameKeys:s=!0,onChange:u,onOpenChange:d}=e,l=w("div",{className:"select",id:t}),c=w("button",{className:"select-trigger",type:"button"}),p=w("span",{className:"select-value"},o),m=w("span",{className:"select-caret"},"\u25BE");c.append(p,m);let f=w("div",{className:"select-menu",role:"listbox",tabindex:"-1","aria-hidden":"true"});l.classList.add(`select--${a}`);let g=!1,b=n,h=null,S=!!i;function v(O){return O==null?o:(e.options||r).find(_=>_.value===O)?.label??o}function y(O){p.textContent=v(O),f.querySelectorAll(".select-option").forEach(D=>{let _=D.dataset.value,j=O!=null&&_===O;D.classList.toggle("selected",j),D.setAttribute("aria-selected",String(j))})}function k(O){f.replaceChildren(),O.forEach(D=>{let _=w("button",{className:"select-option"+(D.disabled?" disabled":""),type:"button",role:"option","data-value":D.value,"aria-selected":String(D.value===b),tabindex:"-1"},D.label);D.value===b&&_.classList.add("selected"),D.disabled||_.addEventListener("pointerdown",j=>{j.preventDefault(),j.stopPropagation(),L(D.value,{notify:!0}),E()},{capture:!0}),f.appendChild(_)})}function T(){c.setAttribute("aria-expanded",String(g)),f.setAttribute("aria-hidden",String(!g))}function A(){let O=c.getBoundingClientRect();Object.assign(f.style,{minWidth:`${O.width}px`})}function I(){g||S||(g=!0,l.classList.add("open"),T(),A(),document.addEventListener("mousedown",se,!0),document.addEventListener("scroll",N,!0),window.addEventListener("resize",G),f.focus({preventScroll:!0}),s&&(mu(),In.add(l),h=()=>{In.delete(l),gu()}),d?.(!0))}function E(){g&&(g=!1,l.classList.remove("open"),T(),document.removeEventListener("mousedown",se,!0),document.removeEventListener("scroll",N,!0),window.removeEventListener("resize",G),c.focus({preventScroll:!0}),h?.(),h=null,d?.(!1))}function R(){g?E():I()}function L(O,D={}){let _=b;b=O,y(b),D.notify!==!1&&_!==O&&u?.(O)}function $(){return b}function oe(O){let D=Array.from(f.querySelectorAll(".select-option:not(.disabled)"));if(!D.length)return;let _=D.findIndex(de=>de.classList.contains("active")),j=D[(_+(O===1?1:D.length-1))%D.length];D.forEach(de=>de.classList.remove("active")),j.classList.add("active"),j.focus({preventScroll:!0}),j.scrollIntoView({block:"nearest"})}function K(O){(O.key===" "||O.key==="Enter"||O.key==="ArrowDown")&&(O.preventDefault(),I())}function X(O){if(O.key==="Escape"){O.preventDefault(),E();return}if(O.key==="Enter"||O.key===" "){let D=f.querySelector(".select-option.active")||f.querySelector(".select-option.selected");D&&!D.classList.contains("disabled")&&(O.preventDefault(),L(D.dataset.value,{notify:!0}),E());return}if(O.key==="ArrowDown"){O.preventDefault(),oe(1);return}if(O.key==="ArrowUp"){O.preventDefault(),oe(-1);return}}function se(O){l.contains(O.target)||E()}function N(){g&&A()}function G(){g&&A()}function H(O){S=!!O,c.disabled=S,l.classList.toggle("disabled",S),S&&E()}function C(O){e.options=O,k(O),O.some(D=>D.value===b)||(b=null,y(null))}return l.append(c,f),c.addEventListener("pointerdown",O=>{O.preventDefault(),O.stopPropagation(),R()},{capture:!0}),c.addEventListener("keydown",K),f.addEventListener("keydown",X),k(r),n!=null?(b=n,y(b)):y(null),T(),H(S),{root:l,open:I,close:E,toggle:R,getValue:$,setValue:L,setOptions:C,setDisabled:H,destroy(){document.removeEventListener("mousedown",se,!0),document.removeEventListener("scroll",N,!0),window.removeEventListener("resize",G),h?.(),h=null}}}function Va(e={}){let{id:t,text:n="",htmlFor:r,tone:o="default",size:a="md",layout:i="inline",variant:s="text",required:u=!1,disabled:d=!1,tooltip:l,hint:c,icon:p,suffix:m,onClick:f}=e,g=w("div",{className:"lg-label-wrap",id:t}),b=w("label",{className:"lg-label",...r?{htmlFor:r}:{},...l?{title:l}:{}});if(p){let L=typeof p=="string"?w("span",{className:"lg-label-ico"},p):p;L.classList?.add?.("lg-label-ico"),b.appendChild(L)}let h=w("span",{className:"lg-label-text"},n);b.appendChild(h);let S=w("span",{className:"lg-label-req",ariaHidden:"true"}," *");u&&b.appendChild(S);let v=null;if(m!=null){v=typeof m=="string"?document.createTextNode(m):m;let L=w("span",{className:"lg-label-suffix"});L.appendChild(v),b.appendChild(L)}let y=c?w("div",{className:"lg-label-hint"},c):null;g.classList.add(`lg-label--${i}`),g.classList.add(`lg-label--${a}`),s==="title"&&g.classList.add("lg-label--title"),k(o),d&&g.classList.add("is-disabled"),g.appendChild(b),y&&g.appendChild(y),f&&b.addEventListener("click",f);function k(L){g.classList.remove("lg-label--default","lg-label--muted","lg-label--info","lg-label--success","lg-label--warning","lg-label--danger"),g.classList.add(`lg-label--${L}`)}function T(L){h.textContent=L}function A(L){k(L)}function I(L){L&&!S.isConnected&&b.appendChild(S),!L&&S.isConnected&&S.remove(),L?b.setAttribute("aria-required","true"):b.removeAttribute("aria-required")}function E(L){g.classList.toggle("is-disabled",!!L)}function R(L){!L&&y&&y.isConnected?y.remove():L&&y?y.textContent=L:L&&!y&&g.appendChild(w("div",{className:"lg-label-hint"},L))}return{root:g,labelEl:b,hintEl:y,setText:T,setTone:A,setRequired:I,setDisabled:E,setHint:R}}function Bt(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function En(e,t){let n=document.createElement("span");n.className=`btn-ico btn-ico--${t}`;let r=Bt(e);return r&&n.appendChild(r),n}function fu(){let e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.marginRight="6px",t.style.display="none",t.style.flexShrink="0";let n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");let r=document.createElementNS(e,"animate");r.setAttribute("attributeName","stroke-dasharray"),r.setAttribute("values","1,150;90,150;90,150"),r.setAttribute("dur","1.5s"),r.setAttribute("repeatCount","indefinite");let o=document.createElementNS(e,"animateTransform");return o.setAttribute("attributeName","transform"),o.setAttribute("attributeType","XML"),o.setAttribute("type","rotate"),o.setAttribute("from","0 12 12"),o.setAttribute("to","360 12 12"),o.setAttribute("dur","1s"),o.setAttribute("repeatCount","indefinite"),n.appendChild(r),n.appendChild(o),t.appendChild(n),t}function $a(e={}){let{label:t="",id:n,variant:r="default",size:o="md",iconLeft:a,iconRight:i,loading:s=!1,tooltip:u,type:d="button",onClick:l,disabled:c=!1,fullWidth:p=!1}=e,m=w("button",{className:"btn",id:n});m.type=d,r==="primary"&&m.classList.add("primary"),o==="sm"&&m.classList.add("btn--sm"),u&&(m.title=u),p&&(m.style.width="100%");let f=fu(),g=a?En(a,"left"):null,b=i?En(i,"right"):null,h=document.createElement("span");h.className="btn-label";let S=Bt(t);S&&h.appendChild(S),!S&&(g||b)&&m.classList.add("btn--icon"),m.appendChild(f),g&&m.appendChild(g),m.appendChild(h),b&&m.appendChild(b);let v=c||s;m.disabled=v,m.setAttribute("aria-busy",String(!!s)),f.style.display=s?"inline-block":"none",l&&m.addEventListener("click",l);let y=m;return y.setLoading=k=>{m.setAttribute("aria-busy",String(!!k)),f.style.display=k?"inline-block":"none",m.disabled=k||c},y.setDisabled=k=>{m.disabled=k||m.getAttribute("aria-busy")==="true"},y.setLabel=k=>{h.replaceChildren();let T=Bt(k);T&&h.appendChild(T),!T&&(g||b)?m.classList.add("btn--icon"):m.classList.remove("btn--icon")},y.setIconLeft=k=>{if(k==null){g?.remove();return}g?g.replaceChildren(Bt(k)):m.insertBefore(En(k,"left"),h)},y.setIconRight=k=>{if(k==null){b?.remove();return}b?b.replaceChildren(Bt(k)):m.appendChild(En(k,"right"))},y}function bu(){try{let e=window.visualViewport,t=Math.round((e?.width??window.innerWidth)||0),n=Math.round((e?.height??window.innerHeight)||0);if(t&&n)return t>=n?"landscape":"portrait"}catch{}return"unknown"}function Ka(){let e=navigator.userAgent||"",t=navigator.platform||"",n=navigator.userAgentData;if(n&&typeof n.platform=="string"){let o=n.platform.toLowerCase();if(o.includes("windows"))return"windows";if(o.includes("mac"))return"mac";if(o.includes("android"))return"android";if(o.includes("chrome os")||o.includes("cros"))return"chromeos";if(o.includes("linux"))return"linux";if(o.includes("ios"))return"ios"}return/iPhone|iPad|iPod/i.test(e)||t==="MacIntel"&&(navigator.maxTouchPoints??0)>1?"ios":/Android/i.test(e)?"android":/CrOS/i.test(e)?"chromeos":/Win/i.test(e)?"windows":/Mac/i.test(e)?"mac":/Linux/i.test(e)?"linux":"unknown"}function qa(){let e=navigator.userAgent||"",t=navigator.userAgentData;if(t&&Array.isArray(t.brands)){let n=t.brands.map(i=>String(i.brand||i.brandName||i.brandVersion||i)),r=n.some(i=>/Edge/i.test(i)||/Microsoft Edge/i.test(i)),o=n.some(i=>/Opera/i.test(i)||/OPR/i.test(i)),a=n.some(i=>/Chrome|Chromium/i.test(i));if(r)return"Edge";if(o)return"Opera";if(a)return"Chrome";if(navigator.brave)return"Brave"}return/FxiOS/i.test(e)?"Firefox":/CriOS/i.test(e)?"Chrome":/EdgiOS/i.test(e)?"Edge":/OPiOS|OPR|Opera Mini|Opera/i.test(e)?"Opera":/Edg\//i.test(e)?"Edge":/OPR\//i.test(e)||/Opera/i.test(e)?"Opera":/Firefox/i.test(e)?"Firefox":/Safari/i.test(e)&&!/Chrome|Chromium|Edg|OPR/i.test(e)?"Safari":/Brave/i.test(e)||window.Brave||navigator.brave?"Brave":/Chrome|Chromium/i.test(e)?"Chrome":"Unknown"}function hu(){let e=navigator.userAgent||"",t=navigator.userAgentData;return t&&typeof t.mobile=="boolean"?t.mobile?"mobile":"desktop":/Android|iPhone|iPad|iPod|Mobile/i.test(e)?"mobile":"desktop"}function yu(e){if(!e)return null;try{return new URL(e).hostname}catch{return null}}function Ro(){let e=(()=>{try{return window.top!==window.self}catch{return!0}})(),t=yu(document.referrer),r=e&&!!t&&/(^|\.)discord(app)?\.com$/i.test(t)?"discord":"web",o=hu(),a=Ka(),i=qa(),s=window.screen||{},u=window.visualViewport,d=Math.round(window.innerWidth||document.documentElement.clientWidth||0),l=Math.round(window.innerHeight||document.documentElement.clientHeight||0),c=Math.round(u?.width??d),p=Math.round(u?.height??l),m=Math.round(s.width||0),f=Math.round(s.height||0),g=Math.round(s.availWidth||m),b=Math.round(s.availHeight||f),h=Number.isFinite(window.devicePixelRatio)?window.devicePixelRatio:1;return{surface:r,host:location.hostname,origin:location.origin,isInIframe:e,platform:o,browser:i,os:a,viewportWidth:d,viewportHeight:l,visualViewportWidth:c,visualViewportHeight:p,screenWidth:m,screenHeight:f,availScreenWidth:g,availScreenHeight:b,dpr:h,orientation:bu()}}function vu(){return Ro().surface==="discord"}function xu(){return Ro().platform==="mobile"}var Ae={detect:Ro,isDiscord:vu,isMobile:xu,detectOS:Ka,detectBrowser:qa};var Ln=!1,jt=new Set;function Su(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}var Re=e=>{let t=Su();if(t){for(let n of jt)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function wu(){Ln||(Ln=!0,window.addEventListener("keydown",Re,!0),window.addEventListener("keypress",Re,!0),window.addEventListener("keyup",Re,!0),document.addEventListener("keydown",Re,!0),document.addEventListener("keypress",Re,!0),document.addEventListener("keyup",Re,!0))}function Tu(){Ln&&(Ln=!1,window.removeEventListener("keydown",Re,!0),window.removeEventListener("keypress",Re,!0),window.removeEventListener("keyup",Re,!0),document.removeEventListener("keydown",Re,!0),document.removeEventListener("keypress",Re,!0),document.removeEventListener("keyup",Re,!0))}function ku(e){return jt.size===0&&wu(),jt.add(e),()=>{jt.delete(e),jt.size===0&&Tu()}}function Cu(e,t,n,r){let o;switch(e){case"digits":o="0-9";break;case"alpha":o="\\p{L}";break;case"alphanumeric":o="\\p{L}0-9";break;default:return null}return t&&(o+=" "),n&&(o+="\\-"),r&&(o+="_"),new RegExp(`[^${o}]`,"gu")}function Pu(e,t){return t?e.replace(t,""):e}function Au(e,t=0){if(!t)return e;let n;return((...r)=>{clearTimeout(n),n=setTimeout(()=>e(...r),t)})}function Ja(e={}){let{id:t,placeholder:n="",value:r="",mode:o="any",allowSpaces:a=!1,allowDashes:i=!1,allowUnderscore:s=!1,maxLength:u,blockGameKeys:d=!0,debounceMs:l=0,onChange:c,onEnter:p,label:m}=e,f=w("div",{className:"lg-input-wrap"}),g=w("input",{className:"input",id:t,placeholder:n});if(typeof u=="number"&&u>0&&(g.maxLength=u),r&&(g.value=r),m){let L=w("div",{className:"lg-input-label"},m);f.appendChild(L)}f.appendChild(g);let b=Cu(o,a,i,s),h=()=>{let L=g.selectionStart??g.value.length,$=g.value.length,oe=Pu(g.value,b);if(oe!==g.value){g.value=oe;let K=$-oe.length,X=Math.max(0,L-K);g.setSelectionRange(X,X)}},S=Au(()=>c?.(g.value),l);g.addEventListener("input",()=>{h(),S()}),g.addEventListener("paste",()=>queueMicrotask(()=>{h(),S()})),g.addEventListener("keydown",L=>{L.key==="Enter"&&p?.(g.value)});let v=d?ku(g):()=>{};function y(){return g.value}function k(L){g.value=L??"",h(),S()}function T(){g.focus()}function A(){g.blur()}function I(L){g.disabled=!!L}function E(){return document.activeElement===g}function R(){v()}return{root:f,input:g,getValue:y,setValue:k,focus:T,blur:A,setDisabled:I,isFocused:E,destroy:R}}function be(e,t,n){return Math.min(n,Math.max(t,e))}function Ft({h:e,s:t,v:n,a:r}){let o=(e%360+360)%360/60,a=n*t,i=a*(1-Math.abs(o%2-1)),s=0,u=0,d=0;switch(Math.floor(o)){case 0:s=a,u=i;break;case 1:s=i,u=a;break;case 2:u=a,d=i;break;case 3:u=i,d=a;break;case 4:s=i,d=a;break;default:s=a,d=i;break}let c=n-a,p=Math.round((s+c)*255),m=Math.round((u+c)*255),f=Math.round((d+c)*255);return{r:be(p,0,255),g:be(m,0,255),b:be(f,0,255),a:be(r,0,1)}}function Ya({r:e,g:t,b:n,a:r}){let o=be(e,0,255)/255,a=be(t,0,255)/255,i=be(n,0,255)/255,s=Math.max(o,a,i),u=Math.min(o,a,i),d=s-u,l=0;d!==0&&(s===o?l=60*((a-i)/d%6):s===a?l=60*((i-o)/d+2):l=60*((o-a)/d+4)),l<0&&(l+=360);let c=s===0?0:d/s;return{h:l,s:c,v:s,a:be(r,0,1)}}function Do({r:e,g:t,b:n}){let r=o=>be(Math.round(o),0,255).toString(16).padStart(2,"0");return`#${r(e)}${r(t)}${r(n)}`.toUpperCase()}function Mu({r:e,g:t,b:n,a:r}){let o=be(Math.round(r*255),0,255);return`${Do({r:e,g:t,b:n,a:r})}${o.toString(16).padStart(2,"0")}`.toUpperCase()}function zt({r:e,g:t,b:n,a:r}){let o=Math.round(r*1e3)/1e3;return`rgba(${e}, ${t}, ${n}, ${o})`}function wt(e){let t=e.trim();if(!t||(t.startsWith("#")&&(t=t.slice(1)),![3,4,6,8].includes(t.length))||!/^[0-9a-fA-F]+$/.test(t))return null;(t.length===3||t.length===4)&&(t=t.split("").map(i=>i+i).join(""));let n=255;t.length===8&&(n=parseInt(t.slice(6,8),16),t=t.slice(0,6));let r=parseInt(t.slice(0,2),16),o=parseInt(t.slice(2,4),16),a=parseInt(t.slice(4,6),16);return{r,g:o,b:a,a:n/255}}function Oo(e){if(!e)return null;let t=e.trim();if(t.startsWith("#"))return wt(t);let n=t.match(/^rgba?\(([^)]+)\)$/i);if(n){let r=n[1].split(",").map(u=>u.trim());if(r.length<3)return null;let o=Number(r[0]),a=Number(r[1]),i=Number(r[2]),s=r[3]!=null?Number(r[3]):1;return[o,a,i,s].some(u=>Number.isNaN(u))?null:{r:o,g:a,b:i,a:s}}return null}function Iu(e,t){let n=Oo(e)??wt(e??"")??{r:244,g:67,b:54,a:1};return typeof t=="number"&&(n.a=be(t,0,1)),Ya(n)}function Eu(e){return`#${e.trim().replace(/[^0-9a-fA-F#]/g,"").replace(/#/g,"")}`.slice(0,9).toUpperCase()}function Lu(e){let t=e.trim();return t&&(/^rgba?\s*\(/i.test(t)?t=t.replace(/^rgba?/i,"rgba"):(t=t.replace(/^\(?(.*)\)?$/,"$1"),t=`rgba(${t})`),t=t.replace(/\s*\(\s*/,"("),t=t.replace(/\s*\)\s*$/,")"),t=t.replace(/\s*,\s*/g,", "),t)}function ot(e){let t=Ft(e),n=Ft({...e,a:1});return{hsva:{...e},hex:Do(n),hexa:Mu(t),rgba:zt(t),alpha:e.a}}function Xa(e={}){let{id:t,label:n="Color",value:r,alpha:o,defaultExpanded:a=!1,detectMobile:i,onInput:s,onChange:u}=e,l=i?i():Ae.detect().platform==="mobile",c=Iu(r,o),p=nt({id:t,className:"color-picker",title:n,padding:l?"md":"lg",variant:"soft",expandable:!l,defaultExpanded:!l&&a});p.classList.add(l?"color-picker--mobile":"color-picker--desktop");let m=p.querySelector(".card-header");m&&m.classList.add("color-picker__header");let f=m?.querySelector(".card-title"),g=w("button",{className:"color-picker__preview",type:"button",title:`Preview ${n}`,"aria-label":`Change ${n}`});f?f.prepend(g):m?m.prepend(g):p.prepend(g);let b=p.querySelector(".card-toggle");!l&&b&&g.addEventListener("click",()=>{p.classList.contains("card--collapsed")&&b.click()});let h=p.querySelector(".card-collapse"),S=null,v=null,y=null,k=null,T=null,A=null,I=null,E=null,R=null,L="hex";function $(N){let G=ot(c);N==="input"?s?.(G):u?.(G)}function oe(){let N=ot(c);if(g.style.setProperty("--cp-preview-color",N.rgba),g.setAttribute("aria-label",`${n}: ${N.hexa}`),!l&&S&&v&&y&&k&&T&&A&&I){let G=Ft({...c,s:1,v:1,a:1}),H=zt(G);S.style.setProperty("--cp-palette-hue",H),v.style.left=`${c.s*100}%`,v.style.top=`${(1-c.v)*100}%`,y.style.setProperty("--cp-alpha-gradient",`linear-gradient(180deg, ${zt({...G,a:1})} 0%, ${zt({...G,a:0})} 100%)`),k.style.top=`${(1-c.a)*100}%`,T.style.setProperty("--cp-hue-color",zt(Ft({...c,v:1,s:1,a:1}))),A.style.left=`${c.h/360*100}%`;let C=c.a===1?N.hex:N.hexa,O=N.rgba,D=L==="hex"?C:O;I!==document.activeElement&&(I.value=D),I.setAttribute("aria-label",`${L.toUpperCase()} code for ${n}`),I.placeholder=L==="hex"?"#RRGGBB or #RRGGBBAA":"rgba(0, 0, 0, 1)",L==="hex"?I.maxLength=9:I.removeAttribute("maxLength"),I.dataset.mode=L,E&&(E.textContent=L.toUpperCase(),E.setAttribute("aria-label",L==="hex"?"Passer en saisie RGBA":"Revenir en saisie HEX"),E.setAttribute("aria-pressed",L==="rgba"?"true":"false"),E.classList.toggle("is-alt",L==="rgba"))}R&&R!==document.activeElement&&(R.value=N.hex)}function K(N,G=null){c={h:(N.h%360+360)%360,s:be(N.s,0,1),v:be(N.v,0,1),a:be(N.a,0,1)},oe(),G&&$(G)}function X(N,G=null){K(Ya(N),G)}function se(N,G,H){N.addEventListener("pointerdown",C=>{C.preventDefault();let O=C.pointerId,D=j=>{j.pointerId===O&&G(j)},_=j=>{j.pointerId===O&&(document.removeEventListener("pointermove",D),document.removeEventListener("pointerup",_),document.removeEventListener("pointercancel",_),H?.(j))};G(C),document.addEventListener("pointermove",D),document.addEventListener("pointerup",_),document.addEventListener("pointercancel",_)})}if(!l&&h){let N=h.querySelector(".card-body");if(N){N.classList.add("color-picker__body"),v=w("div",{className:"color-picker__palette-cursor"}),S=w("div",{className:"color-picker__palette"},v),k=w("div",{className:"color-picker__alpha-thumb"}),y=w("div",{className:"color-picker__alpha"},k),A=w("div",{className:"color-picker__hue-thumb"}),T=w("div",{className:"color-picker__hue"},A);let G=w("div",{className:"color-picker__main"},S,y),H=w("div",{className:"color-picker__hue-row"},T),C=Ja({blockGameKeys:!0});I=C.input,I.classList.add("color-picker__hex-input"),I.value="",I.maxLength=9,I.spellcheck=!1,I.inputMode="text",I.setAttribute("aria-label",`Hex code for ${n}`),E=w("button",{type:"button",className:"color-picker__mode-btn",textContent:"HEX","aria-pressed":"false","aria-label":"Passer en saisie RGBA"}),C.root.classList.add("color-picker__hex-wrap");let O=w("div",{className:"color-picker__hex-row"},E,C.root);N.replaceChildren(G,H,O),se(S,_=>{if(!S||!v)return;let j=S.getBoundingClientRect(),de=be((_.clientX-j.left)/j.width,0,1),xt=be((_.clientY-j.top)/j.height,0,1);K({...c,s:de,v:1-xt},"input")},()=>$("change")),se(y,_=>{if(!y)return;let j=y.getBoundingClientRect(),de=be((_.clientY-j.top)/j.height,0,1);K({...c,a:1-de},"input")},()=>$("change")),se(T,_=>{if(!T)return;let j=T.getBoundingClientRect(),de=be((_.clientX-j.left)/j.width,0,1);K({...c,h:de*360},"input")},()=>$("change")),E.addEventListener("click",()=>{if(L=L==="hex"?"rgba":"hex",I){let _=ot(c);I.value=L==="hex"?c.a===1?_.hex:_.hexa:_.rgba}oe(),I?.focus(),I?.select()}),I.addEventListener("input",()=>{if(L==="hex"){let _=Eu(I.value);if(_!==I.value){let j=I.selectionStart??_.length;I.value=_,I.setSelectionRange(j,j)}}});let D=()=>{let _=I.value;if(L==="hex"){let j=wt(_);if(!j){I.value=c.a===1?ot(c).hex:ot(c).hexa;return}let de=_.startsWith("#")?_.slice(1):_,xt=de.length===4||de.length===8;j.a=xt?j.a:c.a,X(j,"change")}else{let j=Lu(_),de=Oo(j);if(!de){I.value=ot(c).rgba;return}X(de,"change")}};I.addEventListener("change",D),I.addEventListener("blur",D),I.addEventListener("keydown",_=>{_.key==="Enter"&&(D(),I.blur())})}}return l&&(h&&h.remove(),R=w("input",{className:"color-picker__native",type:"color",value:Do(Ft({...c,a:1}))}),g.addEventListener("click",()=>R.click()),R.addEventListener("input",()=>{let N=wt(R.value);N&&(N.a=c.a,X(N,"input"),$("change"))}),p.appendChild(R)),oe(),{root:p,isMobile:l,getValue:()=>ot(c),setValue:(N,G)=>{let H=Oo(N)??wt(N)??wt("#FFFFFF");H&&(typeof G=="number"&&(H.a=G),X(H,null))}}}var Ru=window;function Ou(){if(typeof unsafeWindow<"u"&&unsafeWindow)return unsafeWindow;let e=window.wrappedJSObject;return e&&e!==window?e:Ru}var Du=Ou(),P=Du;function Hu(e){try{return!!e.isSecureContext}catch{return!1}}function Ho(e){let t=e?.getRootNode?.();return t&&(t instanceof Document||t.host)?t:document}function Qa(){let e=navigator.platform||"",t=navigator.userAgent||"";return/Mac|iPhone|iPad|iPod/i.test(e)||/Mac OS|iOS/i.test(t)}async function Gu(){try{let e=await navigator.permissions?.query?.({name:"clipboard-write"});return e?e.state==="granted"||e.state==="prompt":!0}catch{return!0}}function Nu(e,t){let n=document.createElement("textarea");return n.value=e,n.setAttribute("readonly","true"),n.style.position="fixed",n.style.opacity="0",n.style.pointerEvents="none",n.style.top="0",t.appendChild?t.appendChild(n):document.body.appendChild(n),n}function _u(e){try{let t=window.getSelection?.();if(!t)return!1;let n=document.createRange();return n.selectNodeContents(e),t.removeAllRanges(),t.addRange(n),!0}catch{return!1}}async function Wu(e){if(!("clipboard"in navigator))return{ok:!1,method:"clipboard-write"};if(!Hu(P))return{ok:!1,method:"clipboard-write"};if(!await Gu())return{ok:!1,method:"clipboard-write"};try{return await navigator.clipboard.writeText(e),{ok:!0,method:"clipboard-write"}}catch{return{ok:!1,method:"clipboard-write"}}}function Bu(e,t){try{let n=t||Ho(),r=Nu(e,n);r.focus(),r.select(),r.setSelectionRange(0,r.value.length);let o=!1;try{o=document.execCommand("copy")}catch{o=!1}return r.remove(),{ok:o,method:"execCommand"}}catch{return{ok:!1,method:"execCommand"}}}function ju(e,t){if(!t)return{ok:!1,method:"selection"};let n=t.textContent??"",r=!1;if(n!==e)try{t.textContent=e,r=!0}catch{}let o=_u(t);r&&setTimeout(()=>{try{t.textContent=n}catch{}},80);let a=Qa()?"\u2318C pour copier":"Ctrl+C pour copier";return{ok:o,method:"selection",hint:a}}async function zu(e,t={}){let n=(e??"").toString();if(!n.length)return{ok:!1,method:"noop"};let r=await Wu(n);if(r.ok)return r;let o=t.injectionRoot||Ho(t.valueNode||void 0),a=Bu(n,o);if(a.ok)return a;let i=ju(n,t.valueNode||null);if(i.ok)return i;if(!t.disablePromptFallback)try{return window.prompt(Ae.isDiscord()?"Copie manuelle (Discord bloque clipboard):":"Copie manuelle:",n),{ok:!0,method:"prompt"}}catch{}return{ok:!1,method:"noop"}}function Za(e,t,n={}){let r=o=>{if(n.showTip){n.showTip(o);return}try{e.setAttribute("aria-label",o);let a=document.createElement("div");a.textContent=o,a.style.position="absolute",a.style.top="-28px",a.style.right="0",a.style.padding="4px 8px",a.style.borderRadius="8px",a.style.fontSize="12px",a.style.background="color-mix(in oklab, var(--bg) 85%, transparent)",a.style.border="1px solid var(--border)",a.style.color="var(--fg)",a.style.pointerEvents="none",a.style.opacity="0",a.style.transition="opacity .12s";let i=Ho(e);i.appendChild?i.appendChild(a):document.body.appendChild(a);let s=e.getBoundingClientRect();a.style.left=`${s.right-8}px`,a.style.top=`${s.top-28}px`,requestAnimationFrame(()=>a.style.opacity="1"),setTimeout(()=>{a.style.opacity="0",setTimeout(()=>a.remove(),150)},1200)}catch{}};e.addEventListener("click",async o=>{o.stopPropagation();let a=(t()??"").toString(),i=await zu(a,{valueNode:n.valueNode??null,injectionRoot:n.injectionRoot??null,disablePromptFallback:n.disablePromptFallback??!1});n.onResult?.(i),i.ok?i.method==="clipboard-write"||i.method==="execCommand"||i.method==="prompt"?r("Copi\xE9"):i.method==="selection"&&r(i.hint||(Qa()?"\u2318C pour copier":"Ctrl+C pour copier")):r("Impossible de copier")})}var Xe={light:{"--bg":"rgba(255,255,255,0.7)","--fg":"#0f172a","--muted":"rgba(15,23,42,0.06)","--soft":"rgba(15,23,42,0.04)","--accent":"#2563eb","--border":"rgba(15,23,42,0.12)","--shadow":"rgba(2,6,23,.2)","--tab-bg":"#ffffff","--tab-fg":"#0f172a","--pill-from":"#4f46e5","--pill-to":"#06b6d4"},dark:{"--bg":"rgba(10,12,18,0.6)","--fg":"#e5e7eb","--muted":"rgba(229,231,235,0.08)","--soft":"rgba(229,231,235,0.05)","--accent":"#60a5fa","--border":"rgba(148,163,184,0.2)","--shadow":"rgba(0,0,0,.45)","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#e5e7eb","--pill-from":"#6366f1","--pill-to":"#06b6d4"},sepia:{"--bg":"rgba(247,242,231,0.72)","--fg":"#3b2f2f","--muted":"rgba(59,47,47,0.06)","--soft":"rgba(59,47,47,0.04)","--accent":"#b07d62","--border":"rgba(59,47,47,0.14)","--shadow":"rgba(0,0,0,.18)","--tab-bg":"#fff","--tab-fg":"#3b2f2f","--pill-from":"#b07d62","--pill-to":"#d4a373"},forest:{"--bg":"rgba(14,24,18,0.62)","--fg":"#e7f5e9","--muted":"rgba(231,245,233,0.08)","--soft":"rgba(231,245,233,0.05)","--accent":"#34d399","--border":"rgba(231,245,233,0.16)","--shadow":"rgba(0,0,0,.5)","--tab-bg":"rgba(255,255,255,0.06)","--tab-fg":"#e7f5e9","--pill-from":"#10b981","--pill-to":"#84cc16"},violet:{"--bg":"rgba(23, 16, 42, 0.68)","--fg":"#f5f3ff","--muted":"rgba(245,243,255,0.08)","--soft":"rgba(245,243,255,0.05)","--accent":"#a855f7","--border":"rgba(216,180,254,0.22)","--shadow":"rgba(12,3,30,.55)","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#ede9fe","--pill-from":"#a855f7","--pill-to":"#f472b6"},ocean:{"--bg":"rgba(10, 34, 46, 0.66)","--fg":"#e0f7ff","--muted":"rgba(224,247,255,0.07)","--soft":"rgba(224,247,255,0.05)","--accent":"#38bdf8","--border":"rgba(125, 211, 252, 0.22)","--shadow":"rgba(0, 16, 32, .52)","--tab-bg":"rgba(56,189,248,0.14)","--tab-fg":"#e0f7ff","--pill-from":"#0ea5e9","--pill-to":"#14b8a6"},ember:{"--bg":"rgba(34,18,10,0.64)","--fg":"#fff7ed","--muted":"rgba(255,247,237,0.08)","--soft":"rgba(255,247,237,0.05)","--accent":"#f97316","--border":"rgba(255, 159, 92, 0.24)","--shadow":"rgba(16,6,2,.52)","--tab-bg":"rgba(255,247,237,0.09)","--tab-fg":"#fff7ed","--pill-from":"#fb923c","--pill-to":"#facc15"}};function Go(e){let{host:t,themes:n,initialTheme:r,onThemeChange:o}=e,a=r,i=null,s=!1;function u(l){let c=n[l]||n[a]||{};s&&t.classList.add("theme-anim");for(let[p,m]of Object.entries(c))t.style.setProperty(p,m);s?(i!==null&&clearTimeout(i),i=P.setTimeout(()=>{t.classList.remove("theme-anim"),i=null},320)):s=!0,a=l,o?.(l)}function d(){return a}return u(r),{applyTheme:u,getCurrentTheme:d}}var Rn={ui:{expandedCards:{style:!1,system:!1}}};async function ei(){let e=await Wt("tab-settings",{version:1,defaults:Rn,sanitize:o=>({ui:{expandedCards:Pn(Rn.ui.expandedCards,o.ui?.expandedCards)}})});function t(o){let a=e.get();e.update({ui:{...a.ui,...o,expandedCards:Pn(a.ui.expandedCards,o.expandedCards)}})}function n(o,a){let i=e.get();e.update({ui:{...i.ui,expandedCards:{...i.ui.expandedCards,[o]:!!a}}})}function r(o){let a=e.get();n(o,!a.ui.expandedCards[o])}return{get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:r}}function ti(e){return e.replace(/[_-]+/g," ").replace(/^\w/,t=>t.toUpperCase())}function Fu(){return Object.keys(Xe).map(e=>({value:e,label:ti(e)}))}var Uu=["--bg","--fg","--accent","--muted","--soft","--border","--shadow","--tab-bg","--tab-fg","--pill-from","--pill-to"];function Vu(e){return ti(e.replace(/^--/,""))}function $u(e){return e.alpha<1?e.rgba:e.hex}var On=class extends tt{constructor(n){super({id:"tab-settings",label:"Settings"});this.deps=n}async build(n){let r=this.createGrid("12px");r.id="settings",n.appendChild(r);let o;try{o=await ei()}catch{o={get:()=>Rn,set:()=>{},save:()=>{},setUI:()=>{},setCardExpanded:()=>{},toggleCard:()=>{}}}let a=o.get(),i=Object.keys(Xe),s=this.deps.getCurrentTheme?.()??this.deps.initialTheme,u=i.includes(s)?s:i[0]??"dark",d=u,l=Va({text:"Theme",tone:"muted",size:"lg"}),c=Ua({options:Fu(),value:u,onChange:g=>{d=g,this.deps.applyTheme(g),this.renderThemePickers(g,p,d)}}),p=w("div",{className:"settings-theme-grid"}),m=nt({title:"Style",padding:"lg",expandable:!0,defaultExpanded:!!a.ui.expandedCards.style,onExpandChange:g=>o.setCardExpanded("style",g)},w("div",{className:"kv settings-theme-row"},l.root,c.root),p);this.renderThemePickers(u,p,d);let f=this.createEnvCard({defaultExpanded:!!a.ui.expandedCards.system,onExpandChange:g=>o.setCardExpanded("system",g)});r.appendChild(m),r.appendChild(f)}renderThemePickers(n,r,o){let a=Xe[n];if(r.replaceChildren(),!!a)for(let i of Uu){let s=a[i];if(s==null)continue;let u=Xa({label:Vu(i),value:s,defaultExpanded:!1,onInput:d=>this.updateThemeVar(n,i,d,o),onChange:d=>this.updateThemeVar(n,i,d,o)});r.appendChild(u.root)}}updateThemeVar(n,r,o,a){let i=Xe[n];i&&(i[r]=$u(o),a===n&&this.deps.applyTheme(n))}createEnvCard(n){let r=n?.defaultExpanded??!1,o=n?.onExpandChange,a=(h,S)=>{let v=w("div",{className:"kv kv--inline-mobile"}),y=w("label",{},h),k=w("div",{className:"ro"});return typeof S=="string"?k.textContent=S:k.append(S),v.append(y,k),v},i=w("code",{},"\u2014"),s=w("span",{},"\u2014"),u=w("span",{},"\u2014"),d=w("span",{},"\u2014"),l=w("span",{},"\u2014"),c=w("span",{},"\u2014"),p=()=>{let h=Ae.detect();u.textContent=h.surface,d.textContent=h.platform,l.textContent=h.browser??"Unknown",c.textContent=h.os??"Unknown",i.textContent=h.host,s.textContent=h.isInIframe?"Yes":"No"},m=$a({label:"Copy JSON",variant:"primary",size:"sm"});Za(m,()=>{let h=Ae.detect();return JSON.stringify(h,null,2)});let f=w("div",{style:"width:100%;display:flex;justify-content:center;"},m),g=nt({title:"System",variant:"soft",padding:"lg",footer:f,expandable:!0,defaultExpanded:r,onExpandChange:o},a("Surface",u),a("Platform",d),a("Browser",l),a("OS",c),a("Host",i),a("Iframe",s)),b=()=>{document.hidden||p()};return document.addEventListener("visibilitychange",b),p(),this.addCleanup(()=>document.removeEventListener("visibilitychange",b)),g}};function ni(e){let{id:t,columns:n,data:r,pageSize:o=0,stickyHeader:a=!0,zebra:i=!0,animations:s=!0,respectReducedMotion:u=!0,compact:d=!1,maxHeight:l,selectable:c=!1,getRowId:p=(z,J)=>String(J),onSortChange:m,onRowClick:f}=e,g=n.slice(),b=r.slice(),h=r.slice(),S=null,v=null,y=1,k=typeof window<"u"&&typeof window.matchMedia=="function"?window.matchMedia("(prefers-reduced-motion: reduce)").matches:!1,T=!!s&&!(u&&k),A=w("div",{className:"lg-table-wrap",id:t});if(l!=null){let z=typeof l=="number"?`${l}px`:l;A.style.setProperty("--tbl-max-h",z)}let I=w("div",{className:"lg-table"}),E=w("div",{className:"lg-thead"}),R=w("div",{className:"lg-tbody"}),L=w("div",{className:"lg-tfoot"});a&&A.classList.add("sticky"),i&&A.classList.add("zebra"),d&&A.classList.add("compact"),c&&A.classList.add("selectable");let $="36px";A.style.setProperty("--check-w",$);function oe(){let z=g.map(ae=>{let te=(ae.width||"1fr").trim();return/\bfr$/.test(te)?`minmax(0, ${te})`:te}),J=(c?[$,...z]:z).join(" ");A.style.setProperty("--lg-cols",J)}oe();function K(){return o?Math.max(1,Math.ceil(b.length/o)):1}function X(){if(!o)return b;let z=(y-1)*o;return b.slice(z,z+o)}function se(){if(!S||!v)return;let z=g.find(te=>String(te.key)===S),J=v==="asc"?1:-1,ae=z?.sortFn?(te,ue)=>J*z.sortFn(te,ue):(te,ue)=>{let Q=te[S],re=ue[S];return Q==null&&re==null?0:Q==null?-1*J:re==null?1*J:typeof Q=="number"&&typeof re=="number"?J*(Q-re):J*String(Q).localeCompare(String(re),void 0,{numeric:!0,sensitivity:"base"})};b.sort(ae)}let N=new Set;function G(){return Array.from(N)}function H(){N.clear(),O(),R.querySelectorAll(".lg-row-check").forEach(z=>z.checked=!1)}let C=null;function O(){if(!C)return;let z=X();if(!z.length){C.indeterminate=!1,C.checked=!1;return}let J=z.map((te,ue)=>p(te,(y-1)*(o||0)+ue)),ae=J.reduce((te,ue)=>te+(N.has(ue)?1:0),0);C.checked=ae===J.length,C.indeterminate=ae>0&&ae<J.length}function D(){let z=R.offsetWidth-R.clientWidth;E.style.paddingRight=z>0?`${z}px`:"0px"}function _(){requestAnimationFrame(D)}let j=new ResizeObserver(()=>D()),de=()=>D();function xt(){E.replaceChildren();let z=w("div",{className:"lg-tr lg-tr-head"});if(c){let J=w("div",{className:"lg-th lg-th-check"});C=w("input",{type:"checkbox"}),C.addEventListener("change",()=>{let ae=X(),te=C.checked;ae.forEach((ue,Q)=>{let re=p(ue,(y-1)*(o||0)+Q);te?N.add(re):N.delete(re)}),xn()}),J.appendChild(C),z.appendChild(J)}g.forEach(J=>{let ae=w("button",{className:"lg-th",type:"button",title:J.title||J.header});ae.textContent=J.header,J.align&&ae.style.setProperty("--col-align",J.align),J.sortable&&ae.classList.add("sortable"),S===String(J.key)&&v?ae.setAttribute("data-sort",v):ae.removeAttribute("data-sort"),J.sortable&&ae.addEventListener("click",()=>{let te=String(J.key);S!==te?(S=te,v="asc"):(v=v==="asc"?"desc":v==="desc"?null:"asc",v||(S=null,b=h.slice())),m?.(S,v),S&&v&&se(),wn()}),z.appendChild(ae)}),E.appendChild(z);try{j.disconnect()}catch{}j.observe(R),_()}function ee(z){return Array.from(z.querySelectorAll(":scope > .lg-td, :scope > .lg-td-check"))}function ye(z){return z.querySelector(".lg-td, .lg-td-check")}function Ue(z){let J=ye(z);return J?J.getBoundingClientRect():null}function xn(){let z=X(),J=new Map;Array.from(R.children).forEach(Q=>{let re=Q,we=re.getAttribute("data-id");if(!we)return;let Ee=Ue(re);Ee&&J.set(we,Ee)});let ae=new Map;Array.from(R.children).forEach(Q=>{let re=Q,we=re.getAttribute("data-id");we&&ae.set(we,re)});let te=[];for(let Q=0;Q<z.length;Q++){let re=z[Q],we=(o?(y-1)*o:0)+Q,Ee=p(re,we);te.push(Ee);let pe=ae.get(Ee);pe||(pe=nu(re,we),T&&ee(pe).forEach(Gt=>{Gt.style.transform="translateY(6px)",Gt.style.opacity="0"})),R.appendChild(pe)}let ue=[];if(ae.forEach((Q,re)=>{te.includes(re)||ue.push(Q)}),!T){ue.forEach(Q=>Q.remove()),O(),_();return}te.forEach(Q=>{let re=R.querySelector(`.lg-tr-body[data-id="${Q}"]`);if(!re)return;let we=Ue(re),Ee=J.get(Q),pe=ee(re);if(Ee&&we){let _e=Ee.left-we.left,St=Ee.top-we.top;pe.forEach(Je=>{Je.style.transition="none",Je.style.transform=`translate(${_e}px, ${St}px)`,Je.style.opacity="1"}),ye(re)?.getBoundingClientRect(),pe.forEach(Je=>{Je.style.willChange="transform, opacity",Je.style.transition="transform .18s ease, opacity .18s ease"}),requestAnimationFrame(()=>{pe.forEach(Je=>{Je.style.transform="translate(0,0)"})})}else pe.forEach(_e=>{_e.style.transition="transform .18s ease, opacity .18s ease"}),requestAnimationFrame(()=>{pe.forEach(_e=>{_e.style.transform="translate(0,0)",_e.style.opacity="1"})});let Eo=_e=>{(_e.propertyName==="transform"||_e.propertyName==="opacity")&&(pe.forEach(St=>{St.style.willChange="",St.style.transition="",St.style.transform="",St.style.opacity=""}),_e.currentTarget.removeEventListener("transitionend",Eo))},Gt=pe[0];Gt&&Gt.addEventListener("transitionend",Eo)}),ue.forEach(Q=>{let re=ee(Q);re.forEach(pe=>{pe.style.willChange="transform, opacity",pe.style.transition="transform .18s ease, opacity .18s ease",pe.style.opacity="0",pe.style.transform="translateY(-6px)"});let we=pe=>{pe.propertyName==="opacity"&&(pe.currentTarget.removeEventListener("transitionend",we),Q.remove())},Ee=re[0];Ee?Ee.addEventListener("transitionend",we):Q.remove()}),O(),_()}function nu(z,J){let ae=p(z,J),te=w("div",{className:"lg-tr lg-tr-body","data-id":ae});if(c){let ue=w("div",{className:"lg-td lg-td-check"}),Q=w("input",{type:"checkbox",className:"lg-row-check"});Q.checked=N.has(ae),Q.addEventListener("change",()=>{Q.checked?N.add(ae):N.delete(ae),O()}),ue.appendChild(Q),te.appendChild(ue)}return g.forEach(ue=>{let Q=w("div",{className:"lg-td"});ue.align&&Q.style.setProperty("--col-align",ue.align);let re=ue.render?ue.render(z,J):String(z[ue.key]??"");typeof re=="string"?Q.textContent=re:Q.appendChild(re),te.appendChild(Q)}),f&&(te.classList.add("clickable"),te.addEventListener("click",ue=>{ue.target.closest(".lg-td-check")||f(z,J,ue)})),te}function Da(){if(L.replaceChildren(),!o)return;let z=K(),J=w("div",{className:"lg-pager"}),ae=w("button",{className:"btn",type:"button"},"\u2190"),te=w("button",{className:"btn",type:"button"},"\u2192"),ue=w("span",{className:"lg-pager-info"},`${y} / ${z}`);ae.disabled=y<=1,te.disabled=y>=z,ae.addEventListener("click",()=>Sn(y-1)),te.addEventListener("click",()=>Sn(y+1)),J.append(ae,ue,te),L.appendChild(J)}function Sn(z){let J=K();y=Math.min(Math.max(1,z),J),xn(),Da()}function wn(){oe(),xt(),xn(),Da()}function ou(z){h=z.slice(),b=z.slice(),S&&v&&se(),Sn(1)}function ru(z){g=z.slice(),wn()}function au(z,J="asc"){S=z,v=z?J:null,S&&v?se():b=h.slice(),wn()}function iu(){try{j.disconnect()}catch{}window.removeEventListener("resize",de)}return I.append(E,R,L),A.appendChild(I),window.addEventListener("resize",de),wn(),{root:A,setData:ou,setColumns:ru,sortBy:au,getSelection:G,clearSelection:H,setPage:Sn,getState:()=>({page:y,pageCount:K(),sortKey:S,sortDir:v}),destroy:iu}}var Hn=!1,Ut=new Set;function Ku(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}var Oe=e=>{let t=Ku();if(t){for(let n of Ut)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function qu(){Hn||(Hn=!0,window.addEventListener("keydown",Oe,!0),window.addEventListener("keypress",Oe,!0),window.addEventListener("keyup",Oe,!0),document.addEventListener("keydown",Oe,!0),document.addEventListener("keypress",Oe,!0),document.addEventListener("keyup",Oe,!0))}function Ju(){Hn&&(Hn=!1,window.removeEventListener("keydown",Oe,!0),window.removeEventListener("keypress",Oe,!0),window.removeEventListener("keyup",Oe,!0),document.removeEventListener("keydown",Oe,!0),document.removeEventListener("keypress",Oe,!0),document.removeEventListener("keyup",Oe,!0))}function Yu(e){return Ut.size===0&&qu(),Ut.add(e),()=>{Ut.delete(e),Ut.size===0&&Ju()}}function Dn(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function Xu(){let e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.display="none",t.style.flexShrink="0";let n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");let r=document.createElementNS(e,"animate");r.setAttribute("attributeName","stroke-dasharray"),r.setAttribute("values","1,150;90,150;90,150"),r.setAttribute("dur","1.5s"),r.setAttribute("repeatCount","indefinite");let o=document.createElementNS(e,"animateTransform");return o.setAttribute("attributeName","transform"),o.setAttribute("attributeType","XML"),o.setAttribute("type","rotate"),o.setAttribute("from","0 12 12"),o.setAttribute("to","360 12 12"),o.setAttribute("dur","1s"),o.setAttribute("repeatCount","indefinite"),n.append(r,o),t.appendChild(n),t}function oi(e={}){let{id:t,placeholder:n="Rechercher\u2026",value:r="",size:o="md",disabled:a=!1,autoFocus:i=!1,onChange:s,onSearch:u,autoSearch:d=!1,debounceMs:l=0,focusKey:c="/",iconLeft:p,iconRight:m,withClear:f=!0,clearTitle:g="Effacer",ariaLabel:b,submitLabel:h,loading:S=!1,blockGameKeys:v=!0}=e,y=w("div",{className:"search"+(o?` search--${o}`:""),id:t}),k=w("span",{className:"search-ico search-ico--left"});if(p){let ee=Dn(p);ee&&k.appendChild(ee)}else k.textContent="\u{1F50E}",k.style.opacity=".9";let T=w("input",{className:"input search-input",type:"text",placeholder:n,value:r,"aria-label":b||n}),A=w("span",{className:"search-ico search-ico--right"});if(m){let ee=Dn(m);ee&&A.appendChild(ee)}let I=Xu();I.classList.add("search-spinner");let E=f?w("button",{className:"search-clear",type:"button",title:g},"\xD7"):null,R=h!=null?w("button",{className:"btn search-submit",type:"button"},h):null,L=w("div",{className:"search-field"},k,T,A,I,...E?[E]:[]);y.append(L,...R?[R]:[]);let $=!!a,oe=null;function K(ee){I.style.display=ee?"inline-block":"none",y.classList.toggle("is-loading",ee)}function X(){oe!=null&&(window.clearTimeout(oe),oe=null)}function se(ee){X(),l>0?oe=window.setTimeout(()=>{oe=null,ee()},l):ee()}function N(){s?.(T.value),d&&u&&u(T.value)}T.addEventListener("input",()=>{se(N)}),T.addEventListener("keydown",ee=>{ee.key==="Enter"?(ee.preventDefault(),X(),u?.(T.value)):ee.key==="Escape"&&(T.value.length>0?C("",{notify:!0}):T.blur())}),E&&E.addEventListener("click",()=>C("",{notify:!0})),R&&R.addEventListener("click",()=>u?.(T.value));let G=()=>{};if(v&&(G=Yu(T)),c){let ee=ye=>{if(ye.key===c&&!ye.ctrlKey&&!ye.metaKey&&!ye.altKey){let Ue=document.activeElement;Ue&&(Ue.tagName==="INPUT"||Ue.tagName==="TEXTAREA"||Ue.isContentEditable)||(ye.preventDefault(),T.focus())}};window.addEventListener("keydown",ee,!0),y.__cleanup=()=>{window.removeEventListener("keydown",ee,!0),G()}}else y.__cleanup=()=>{G()};function H(ee){$=!!ee,T.disabled=$,E&&(E.disabled=$),R&&(R.disabled=$),y.classList.toggle("disabled",$)}function C(ee,ye={}){let Ue=T.value;T.value=ee??"",ye.notify&&Ue!==ee&&se(N)}function O(){return T.value}function D(){T.focus()}function _(){T.blur()}function j(ee){T.placeholder=ee}function de(ee){C("",ee)}return H($),K(S),i&&D(),{root:y,input:T,getValue:O,setValue:C,focus:D,blur:_,setDisabled:H,setPlaceholder:j,clear:de,setLoading:K,setIconLeft(ee){k.replaceChildren();let ye=Dn(ee??"\u{1F50E}");ye&&k.appendChild(ye)},setIconRight(ee){A.replaceChildren();let ye=Dn(ee??"");ye&&A.appendChild(ye)}}}function Qu(e){let t=String(e??"").trim().toLowerCase();return t?t==="common"?"Common":t==="uncommon"?"Uncommon":t==="rare"?"Rare":t==="legendary"?"Legendary":t==="mythical"?"Mythical":t==="divine"?"Divine":t==="celestial"?"Celestial":t==="unknown"||t==="unknow"?"Unknown":null:null}function Zu(e){return e.toLowerCase()}function ri(e={}){let{id:t,label:n="",type:r="neutral",tone:o="soft",border:a,withBorder:i,pill:s=!0,size:u="md",onClick:d,variant:l="default",rarity:c=null}=e,p=w("span",{className:"badge",id:t});s&&p.classList.add("badge--pill"),u==="sm"?p.classList.add("badge--sm"):u==="lg"?p.classList.add("badge--lg"):p.classList.add("badge--md"),d&&p.addEventListener("click",d);let m=!1,f=i;function g(){m||(f===!1?p.style.border="none":p.style.border="")}function b(T,A=o){p.classList.remove("badge--neutral","badge--info","badge--success","badge--warning","badge--danger","badge--soft","badge--outline","badge--solid"),p.classList.add(`badge--${T}`,`badge--${A}`),g()}function h(T){let A=(T??"").trim();A?(p.style.border=A,m=!0):(m=!1,g())}function S(T){f=T,g()}function v(T){p.textContent=T}function y(T,A=o){b(T,A)}function k(T){p.classList.remove("badge--rarity","badge--rarity-common","badge--rarity-uncommon","badge--rarity-rare","badge--rarity-legendary","badge--rarity-mythical","badge--rarity-divine","badge--rarity-celestial","badge--rarity-unknown"),p.style.background="",p.style.backgroundSize="",p.style.animation="",p.style.color="",p.style.webkitTextStroke="";let A=Qu(T);if(!A){p.textContent=String(T??"\u2014");return}p.textContent=A,p.classList.add("badge--rarity",`badge--rarity-${Zu(A)}`)}return l==="rarity"?k(c):(p.textContent=n,b(r,o),typeof i=="boolean"&&S(i),a&&h(a)),{root:p,setLabel:v,setType:y,setBorder:h,setWithBorder:S,setRarity:k}}$e();$e();var ii=Function.prototype.bind,ne={_bindPatched:!1,engine:null,tos:null,app:null,renderer:null,ticker:null,stage:null},si,li,ci,ed=new Promise(e=>{si=e}),td=new Promise(e=>{li=e}),nd=new Promise(e=>{ci=e});function od(e){return!!(e&&typeof e=="object"&&typeof e.start=="function"&&typeof e.destroy=="function"&&e.app&&e.app.stage&&e.app.renderer&&e.systems&&typeof e.systems.values=="function")}function rd(e){try{for(let t of e.systems.values()){let n=t?.system;if(n?.name==="tileObject")return n}}catch{}return null}function ad(e){ne.engine=e,ne.tos=rd(e)||null,ne.app=e.app||null,ne.renderer=e.app?.renderer||null,ne.ticker=e.app?.ticker||null,ne.stage=e.app?.stage||null;try{si(e)}catch{}try{ne.app&&li(ne.app)}catch{}try{ne.renderer&&ci(ne.renderer)}catch{}}function _o(){return ne.engine?!0:(ne._bindPatched||(ne._bindPatched=!0,Function.prototype.bind=function(e,...t){let n=ii.call(this,e,...t);try{!ne.engine&&od(e)&&(Function.prototype.bind=ii,ne._bindPatched=!1,ad(e))}catch{}return n}),!1)}_o();async function id(e=15e3){let t=performance.now();for(;performance.now()-t<e;){if(ne.engine)return!0;_o(),await Ve(50)}throw new Error("MGPixiHooks: engine capture timeout")}async function sd(e=15e3){return ne.engine||await id(e),!0}function ld(){return ne.engine&&ne.app?{ok:!0,engine:ne.engine,tos:ne.tos,app:ne.app}:(_o(),{ok:!1,engine:ne.engine,tos:ne.tos,app:ne.app,note:"Not captured. Wait for room, or reload."})}var Te={engineReady:ed,appReady:td,rendererReady:nd,engine:()=>ne.engine,tos:()=>ne.tos,app:()=>ne.app,renderer:()=>ne.renderer,ticker:()=>ne.ticker,stage:()=>ne.stage,PIXI:()=>P.PIXI||null,init:sd,hook:ld,ready:()=>!!ne.engine};var ui=P?.location?.origin||"https://magicgarden.gg";function di(){return typeof GM_xmlhttpRequest=="function"}function pi(e,t="text"){return new Promise((n,r)=>{GM_xmlhttpRequest({method:"GET",url:e,responseType:t,onload:o=>o.status>=200&&o.status<300?n(o):r(new Error(`HTTP ${o.status} for ${e}`)),onerror:()=>r(new Error(`Network error for ${e}`)),ontimeout:()=>r(new Error(`Timeout for ${e}`))})})}async function Tt(e){if(di())return JSON.parse((await pi(e,"text")).responseText);let t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.json()}async function Nn(e){if(di())return(await pi(e,"blob")).response;let t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.blob()}function mi(e){return new Promise((t,n)=>{let r=URL.createObjectURL(e),o=P?.Image||Image,a=new o;a.decoding="async",a.onload=()=>{URL.revokeObjectURL(r),t(a)},a.onerror=()=>{URL.revokeObjectURL(r),n(new Error("Image decode failed"))},a.src=r})}var Ce=(e,t)=>e.replace(/\/?$/,"/")+String(t||"").replace(/^\//,""),cd=e=>e.lastIndexOf("/")>=0?e.slice(0,e.lastIndexOf("/")+1):"",Wo=(e,t)=>String(t||"").startsWith("/")?String(t).slice(1):cd(e)+String(t||"");$e();var Vt=null;function ud(){return P?.document??(typeof document<"u"?document:null)}function Bo(e){if(Vt!==null)return;let t=e??ud();if(!t)return;let n=t.scripts;for(let r=0;r<n.length;r++){let a=n.item(r)?.src;if(!a)continue;let i=a.match(/\/(?:r\/\d+\/)?version\/([^/]+)/);if(i?.[1]){Vt=i[1];return}}}function dd(){return Bo(),Vt}async function pd(e=15e3){let t=performance.now();for(;performance.now()-t<e;){if(Bo(),Vt)return Vt;await Ve(50)}throw new Error("MGVersion timeout (gameVersion not found)")}var $t={init:Bo,get:dd,wait:pd};var _n=null,Wn=null;async function gi(){return Wn||_n||(_n=(async()=>{let e=await $t.wait(15e3);return Wn=`${ui}/version/${e}/assets/`,Wn})(),_n)}async function md(e){let t=await gi();return Ce(t,e)}var He={base:gi,url:md};function Kt(e){let t=String(e||"").trim();return t?t.startsWith("sprite/")||t.startsWith("sprites/")?t:t.includes("/")?`sprite/${t}`:t:""}function kt(e,t){let n=String(e||"").trim().replace(/^sprites?\//,"").replace(/^\/+|\/+$/g,""),r=String(t||"").trim();return r.includes("/")||!n?Kt(r):`sprite/${n}/${r}`}function rt(e,t,n,r){let o=kt(e,t);if(n.has(o)||r.has(o))return o;let a=String(t||"").trim();if(n.has(a)||r.has(a))return a;let i=Kt(a);return n.has(i)||r.has(i)?i:o}function gd(e,t,n=25e3){let r=[e],o=new Set,a=0;for(;r.length&&a++<n;){let i=r.pop();if(!i||o.has(i))continue;if(o.add(i),t(i))return i;let s=i.children;if(Array.isArray(s))for(let u=s.length-1;u>=0;u--)r.push(s[u])}return null}function fd(e){let t=P.PIXI;if(t?.Texture&&t?.Sprite&&t?.Container&&t?.Rectangle)return{Container:t.Container,Sprite:t.Sprite,Texture:t.Texture,Rectangle:t.Rectangle,AnimatedSprite:t.AnimatedSprite||null};let n=e?.stage,r=gd(n,o=>o?.texture?.frame&&o?.constructor&&o?.texture?.constructor&&o?.texture?.frame?.constructor);if(!r)throw new Error("No Sprite found yet (constructors).");return{Container:n.constructor,Sprite:r.constructor,Texture:r.texture.constructor,Rectangle:r.texture.frame.constructor,AnimatedSprite:t?.AnimatedSprite||null}}async function fi(e,t=15e3){let{sleep:n}=await Promise.resolve().then(()=>($e(),ai)),r=performance.now();for(;performance.now()-r<t;)try{return fd(e)}catch{await n(50)}throw new Error("Constructors timeout")}var Qe=(...e)=>{try{console.log("[MGSprite]",...e)}catch{}};var jo=new Map;async function bd(e){let t=e||await He.base();if(jo.has(t))return jo.get(t);let n=Tt(Ce(t,"manifest.json"));return jo.set(t,n),n}function hd(e,t){return e?.bundles?.find(n=>n?.name===t)||null}function yd(e){let t=new Set;for(let n of e?.assets||[])for(let r of n?.src||[])typeof r=="string"&&r.endsWith(".json")&&r!=="manifest.json"&&t.add(r);return Array.from(t)}var Ie={load:bd,getBundle:hd,listJsonFromBundle:yd};function vd(e){return e&&typeof e=="object"&&e.frames&&e.meta&&typeof e.meta.image=="string"}function zo(e,t,n,r,o){return new e(t,n,r,o)}function xd(e,t,n,r,o,a,i){let s;try{s=new e({source:t.source,frame:n,orig:r,trim:o||void 0,rotate:a||0})}catch{s=new e(t.baseTexture||t,n,r,o||void 0,a||0)}if(i)if(s.defaultAnchor?.set)try{s.defaultAnchor.set(i.x,i.y)}catch{}else s.defaultAnchor?(s.defaultAnchor.x=i.x,s.defaultAnchor.y=i.y):s.defaultAnchor={x:i.x,y:i.y};try{s.updateUvs?.()}catch{}return s}function Sd(e,t,n,r){let{Texture:o,Rectangle:a}=r;for(let[i,s]of Object.entries(e.frames)){let u=s.frame,d=!!s.rotated,l=d?2:0,c=d?u.h:u.w,p=d?u.w:u.h,m=zo(a,u.x,u.y,c,p),f=s.sourceSize||{w:u.w,h:u.h},g=zo(a,0,0,f.w,f.h),b=null;if(s.trimmed&&s.spriteSourceSize){let h=s.spriteSourceSize;b=zo(a,h.x,h.y,h.w,h.h)}n.set(i,xd(o,t,m,g,b,l,s.anchor||null))}}function wd(e,t,n){if(!(!e.animations||typeof e.animations!="object"))for(let[r,o]of Object.entries(e.animations)){if(!Array.isArray(o))continue;let a=o.map(i=>t.get(i)).filter(Boolean);a.length>=2&&n.set(r,a)}}function Td(e,t){let n=(r,o)=>{let a=String(r||"").trim(),i=String(o||"").trim();!a||!i||(t.has(a)||t.set(a,new Set),t.get(a).add(i))};for(let r of Object.keys(e.frames||{})){let o=/^sprite\/([^/]+)\/(.+)$/.exec(r);o&&n(o[1],o[2])}}async function bi(e,t){let n=await Ie.load(e),r=Ie.getBundle(n,"default");if(!r)throw new Error("No default bundle in manifest");let o=Ie.listJsonFromBundle(r),a=new Set,i=new Map,s=new Map,u=new Map;async function d(l){if(a.has(l))return;a.add(l);let c=await Tt(Ce(e,l));if(!vd(c))return;let p=c.meta?.related_multi_packs;if(Array.isArray(p))for(let b of p)await d(Wo(l,b));let m=Wo(l,c.meta.image),f=await mi(await Nn(Ce(e,m))),g=t.Texture.from(f);Sd(c,g,i,t),wd(c,i,s),Td(c,u)}for(let l of o)await d(l);return{textures:i,animations:s,categoryIndex:u}}var hi={enabled:!0,maxEntries:1200,maxCost:5e3,srcCanvasMax:450};function yi(){return{lru:new Map,cost:0,srcCanvas:new Map}}function Fo(e,t){return`${t.sig}::${e}`}function vi(e){return e?e.isAnim?e.frames?.length||0:e.tex?1:0:0}function kd(e,t,n){e.lru.delete(t),e.lru.set(t,n)}function Cd(e,t){if(t.enabled)for(;e.lru.size>t.maxEntries||e.cost>t.maxCost;){let n=e.lru.keys().next().value;if(n===void 0)break;let r=e.lru.get(n);e.lru.delete(n),e.cost=Math.max(0,e.cost-vi(r??null))}}function Uo(e,t){let n=e.lru.get(t);return n?(kd(e,t,n),n):null}function Vo(e,t,n,r){e.lru.set(t,n),e.cost+=vi(n),Cd(e,r)}function xi(e){e.lru.clear(),e.cost=0,e.srcCanvas.clear()}function Si(e,t){return e.srcCanvas.get(t)??null}function wi(e,t,n,r){if(e.srcCanvas.set(t,n),e.srcCanvas.size>r.srcCanvasMax){let o=e.srcCanvas.keys().next().value;o!==void 0&&e.srcCanvas.delete(o)}}var at={Gold:{overlayTall:null,tallIconOverride:null},Rainbow:{overlayTall:null,tallIconOverride:null,angle:130,angleTall:0},Wet:{overlayTall:"sprite/mutation-overlay/WetTallPlant",tallIconOverride:"sprite/mutation/Puddle"},Chilled:{overlayTall:"sprite/mutation-overlay/ChilledTallPlant",tallIconOverride:null},Frozen:{overlayTall:"sprite/mutation-overlay/FrozenTallPlant",tallIconOverride:null},Dawnlit:{overlayTall:null,tallIconOverride:null},Ambershine:{overlayTall:null,tallIconOverride:null},Dawncharged:{overlayTall:null,tallIconOverride:null},Ambercharged:{overlayTall:null,tallIconOverride:null}},ki=Object.keys(at),Pd=["Gold","Rainbow","Wet","Chilled","Frozen","Ambershine","Dawnlit","Dawncharged","Ambercharged"],Ti=new Map(Pd.map((e,t)=>[e,t]));function Bn(e){return[...new Set(e.filter(Boolean))].sort((n,r)=>(Ti.get(n)??1/0)-(Ti.get(r)??1/0))}var Ad=["Wet","Chilled","Frozen"];var Ci=new Set(["Dawnlit","Ambershine","Dawncharged","Ambercharged"]),Pi={Banana:.6,Carrot:.6,Sunflower:.5,Starweaver:.5,FavaBean:.25,BurrosTail:.2},Ai={Pepper:.5,Banana:.6},Mi=256,Ii=.5,Ei=2;function $o(e){if(!e.length)return{muts:[],overlayMuts:[],selectedMuts:[],sig:""};let t=Bn(e),n=Md(e),r=Id(e);return{muts:n,overlayMuts:r,selectedMuts:t,sig:`${t.join(",")}|${n.join(",")}|${r.join(",")}`}}function Md(e){let t=e.filter((o,a,i)=>at[o]&&i.indexOf(o)===a);if(!t.length)return[];if(t.includes("Gold"))return["Gold"];if(t.includes("Rainbow"))return["Rainbow"];let n=["Ambershine","Dawnlit","Dawncharged","Ambercharged"];return t.some(o=>n.includes(o))?Bn(t.filter(o=>!Ad.includes(o))):Bn(t)}function Id(e){let t=e.filter((n,r,o)=>at[n]?.overlayTall&&o.indexOf(n)===r);return Bn(t)}function jn(e,t){return e.map(n=>({name:n,meta:at[n],overlayTall:at[n]?.overlayTall??null,isTall:t}))}var Ed={Gold:{op:"source-atop",colors:["rgb(235,200,0)"],a:.7},Rainbow:{op:"color",colors:["#FF1744","#FF9100","#FFEA00","#00E676","#2979FF","#D500F9"],ang:130,angTall:0,masked:!0},Wet:{op:"source-atop",colors:["rgb(50,180,200)"],a:.25},Chilled:{op:"source-atop",colors:["rgb(100,160,210)"],a:.45},Frozen:{op:"source-atop",colors:["rgb(100,130,220)"],a:.5},Dawnlit:{op:"source-atop",colors:["rgb(209,70,231)"],a:.5},Ambershine:{op:"source-atop",colors:["rgb(190,100,40)"],a:.5},Dawncharged:{op:"source-atop",colors:["rgb(140,80,200)"],a:.5},Ambercharged:{op:"source-atop",colors:["rgb(170,60,25)"],a:.5}};var zn=(()=>{try{let t=document.createElement("canvas").getContext("2d");if(!t)return new Set;let n=["color","hue","saturation","luminosity","overlay","screen","lighter","source-atop"],r=new Set;for(let o of n)t.globalCompositeOperation=o,t.globalCompositeOperation===o&&r.add(o);return r}catch{return new Set}})();function Ld(e){return zn.has(e)?e:zn.has("overlay")?"overlay":zn.has("screen")?"screen":zn.has("lighter")?"lighter":"source-atop"}function Rd(e,t,n,r,o=!1){let a=(r-90)*Math.PI/180,i=t/2,s=n/2;if(!o){let c=Math.min(t,n)/2;return e.createLinearGradient(i-Math.cos(a)*c,s-Math.sin(a)*c,i+Math.cos(a)*c,s+Math.sin(a)*c)}let u=Math.cos(a),d=Math.sin(a),l=Math.abs(u)*t/2+Math.abs(d)*n/2;return e.createLinearGradient(i-u*l,s-d*l,i+u*l,s+d*l)}function Li(e,t,n,r,o=!1){let a=r.colors?.length?r.colors:["#fff"],i=r.ang!=null?Rd(e,t,n,r.ang,o):e.createLinearGradient(0,0,0,n);a.length===1?(i.addColorStop(0,a[0]),i.addColorStop(1,a[0])):a.forEach((s,u)=>i.addColorStop(u/(a.length-1),s)),e.fillStyle=i,e.fillRect(0,0,t,n)}function Ri(e,t,n,r){let o=Ed[n];if(!o)return;let a={...o};n==="Rainbow"&&r&&a.angTall!=null&&(a.ang=a.angTall);let i=n==="Rainbow"&&r,s=t.width,u=t.height;e.save();let d=a.masked?Ld(a.op):"source-in";if(e.globalCompositeOperation=d,a.a!=null&&(e.globalAlpha=a.a),a.masked){let l=document.createElement("canvas");l.width=s,l.height=u;let c=l.getContext("2d");c.imageSmoothingEnabled=!1,Li(c,s,u,a,i),c.globalCompositeOperation="destination-in",c.drawImage(t,0,0),e.drawImage(l,0,0)}else Li(e,s,u,a,i);e.restore()}function Oi(e){return/tallplant/i.test(e)}function Fn(e){let t=String(e||"").split("/");return t[t.length-1]||""}function Di(e){switch(e){case"Ambershine":return["Ambershine","Amberlit"];case"Dawncharged":return["Dawncharged","Dawnbound"];case"Ambercharged":return["Ambercharged","Amberbound"];default:return[e]}}function Od(e,t){let n=String(e||"").toLowerCase();for(let r of t.keys()){let o=/sprite\/mutation-overlay\/([A-Za-z0-9]+)TallPlant/i.exec(String(r));if(!o||!o[1])continue;if(o[1].toLowerCase()===n){let i=t.get(r);if(i)return{tex:i,key:r}}}return null}function Hi(e,t,n,r){if(!t)return null;let o=Fn(e),a=Di(t);for(let i of a){let s=[`sprite/mutation/${i}${o}`,`sprite/mutation/${i}-${o}`,`sprite/mutation/${i}_${o}`,`sprite/mutation/${i}/${o}`,`sprite/mutation/${i}`];for(let u of s){let d=n.get(u);if(d)return{tex:d,key:u}}if(r){let u=`sprite/mutation-overlay/${i}TallPlant`,d=n.get(u);if(d)return{tex:d,key:u};let l=`sprite/mutation-overlay/${i}`,c=n.get(l);if(c)return{tex:c,key:l};let p=Od(t,n);if(p)return p}}return null}function Gi(e,t,n,r){if(!t)return null;let o=at[t];if(n&&o?.tallIconOverride){let s=r.get(o.tallIconOverride);if(s)return s}let a=Fn(e),i=Di(t);for(let s of i){let u=[`sprite/mutation/${s}Icon`,`sprite/mutation/${s}`,`sprite/mutation/${s}${a}`,`sprite/mutation/${s}-${a}`,`sprite/mutation/${s}_${a}`,`sprite/mutation/${s}/${a}`];for(let d of u){let l=r.get(d);if(l)return l}if(n){let d=`sprite/mutation-overlay/${s}TallPlantIcon`,l=r.get(d);if(l)return l;let c=`sprite/mutation-overlay/${s}TallPlant`,p=r.get(c);if(p)return p}}return null}function Ni(e,t,n){let r=e?.orig?.width??e?.frame?.width??e?.width??1,o=e?.orig?.height??e?.frame?.height??e?.height??1,a=e?.defaultAnchor?.x??0,i=e?.defaultAnchor?.y??0,s=Ai[t]??a,u=o>r*1.5,d=Pi[t]??(u?i:.4),l={x:(s-a)*r,y:(d-i)*o},c=Math.min(r,o),p=Math.min(1.5,c/Mi),m=Ii*p;return n&&(m*=Ei),{width:r,height:o,anchorX:a,anchorY:i,offset:l,iconScale:m}}function Ko(e,t,n,r,o){let a=Si(r,e);if(a)return a;let i=null;try{if(t?.extract?.canvas){let s=new n.Sprite(e);i=t.extract.canvas(s),s.destroy?.({children:!0,texture:!1,baseTexture:!1})}}catch{}if(!i){let s=e?.frame||e?._frame,u=e?.orig||e?._orig,d=e?.trim||e?._trim,l=e?.rotate||e?._rotate||0,c=e?.baseTexture?.resource?.source||e?.baseTexture?.resource||e?.source?.resource?.source||e?.source?.resource||e?._source?.resource?.source||null;if(!s||!c)throw new Error("textureToCanvas fail");i=document.createElement("canvas");let p=Math.max(1,(u?.width??s.width)|0),m=Math.max(1,(u?.height??s.height)|0),f=d?.x??0,g=d?.y??0;i.width=p,i.height=m;let b=i.getContext("2d");b.imageSmoothingEnabled=!1,l===!0||l===2||l===8?(b.save(),b.translate(f+s.height/2,g+s.width/2),b.rotate(-Math.PI/2),b.drawImage(c,s.x,s.y,s.width,s.height,-s.width/2,-s.height/2,s.width,s.height),b.restore()):b.drawImage(c,s.x,s.y,s.width,s.height,f,g,s.width,s.height)}return wi(r,e,i,o),i}function Dd(e,t,n,r,o,a,i,s){let{w:u,h:d,aX:l,aY:c,basePos:p}=t,m=[];for(let f of n){let g=new r.Sprite(e);g.anchor?.set?.(l,c),g.position.set(p.x,p.y),g.zIndex=1;let b=document.createElement("canvas");b.width=u,b.height=d;let h=b.getContext("2d");h.imageSmoothingEnabled=!1,h.save(),h.translate(u*l,d*c),h.drawImage(Ko(e,o,r,a,i),-u*l,-d*c),h.restore(),Ri(h,b,f.name,f.isTall);let S=r.Texture.from(b);s.push(S),g.texture=S,m.push(g)}return m}function Hd(e,t,n,r,o,a,i,s,u,d){let{aX:l,basePos:c}=t,p=[];for(let m of n){let f=m.overlayTall&&r.get(m.overlayTall)&&{tex:r.get(m.overlayTall),key:m.overlayTall}||Hi(e,m.name,r,!0);if(!f?.tex)continue;let g=Ko(f.tex,a,o,i,s);if(!g)continue;let b=g.width,h={x:0,y:0},S={x:c.x-l*b,y:0},v=document.createElement("canvas");v.width=b,v.height=g.height;let y=v.getContext("2d");if(!y)continue;y.imageSmoothingEnabled=!1,y.drawImage(g,0,0),y.globalCompositeOperation="destination-in",y.drawImage(u,-S.x,-S.y);let k=o.Texture.from(v);d.push(k);let T=new o.Sprite(k);T.anchor?.set?.(h.x,h.y),T.position.set(S.x,S.y),T.scale.set(1),T.alpha=1,T.zIndex=3,p.push(T)}return p}function Gd(e,t,n,r,o,a){let{basePos:i}=t,s=[];for(let u of n){if(u.name==="Gold"||u.name==="Rainbow")continue;let d=Gi(e,u.name,u.isTall,r);if(!d)continue;let l=new o.Sprite(d),c=d?.defaultAnchor?.x??.5,p=d?.defaultAnchor?.y??.5;l.anchor?.set?.(c,p),l.position.set(i.x+a.offset.x,i.y+a.offset.y),l.scale.set(a.iconScale),u.isTall&&(l.zIndex=-1),Ci.has(u.name)&&(l.zIndex=10),l.zIndex||(l.zIndex=2),s.push(l)}return s}function qo(e,t,n,r){try{if(!e||!r.renderer||!r.ctors?.Container||!r.ctors?.Sprite||!r.ctors?.Texture)return null;let{Container:o,Sprite:a,Texture:i}=r.ctors,s=e?.orig?.width??e?.frame?.width??e?.width??1,u=e?.orig?.height??e?.frame?.height??e?.height??1,d=e?.defaultAnchor?.x??.5,l=e?.defaultAnchor?.y??.5,c={x:s*d,y:u*l},p=Ko(e,r.renderer,r.ctors,r.cacheState,r.cacheConfig),m=new o;m.sortableChildren=!0;let f=new a(e);f.anchor?.set?.(d,l),f.position.set(c.x,c.y),f.zIndex=0,m.addChild(f);let g=Oi(t),b=jn(n.muts,g),h=jn(n.overlayMuts,g),S=jn(n.selectedMuts,g),v=[],y={w:s,h:u,aX:d,aY:l,basePos:c},k=Fn(t),T=Ni(e,k,g);Dd(e,y,b,r.ctors,r.renderer,r.cacheState,r.cacheConfig,v).forEach(L=>m.addChild(L)),g&&Hd(t,y,h,r.textures,r.ctors,r.renderer,r.cacheState,r.cacheConfig,p,v).forEach($=>m.addChild($)),Gd(t,y,S,r.textures,r.ctors,T).forEach(L=>m.addChild(L));let E=null;if(typeof r.renderer.generateTexture=="function"?E=r.renderer.generateTexture(m,{resolution:1}):r.renderer.textureGenerator?.generateTexture&&(E=r.renderer.textureGenerator.generateTexture({target:m,resolution:1})),!E)throw new Error("no render texture");let R=E instanceof i?E:i.from(r.renderer.extract.canvas(E));E&&E!==R&&E.destroy?.(!0),m.destroy({children:!0,texture:!1,baseTexture:!1});try{R.__mg_gen=!0,R.label=`${t}|${n.sig}`}catch{}return R}catch{return null}}function _i(e,t,n,r){if(!e||e.length<2)return null;let o=[];for(let a of e){let i=qo(a,t,n,r);i&&o.push(i)}return o.length>=2?o:null}var Yo={enabled:!0,maxEntries:500};function Bi(){return{cache:new Map,maxEntries:Yo.maxEntries}}function Jo(e,t){let n=t.scale??1,r=t.frameIndex??0,o=t.mutations?.slice().sort().join(",")||"",a=t.anchorX??.5,i=t.anchorY??.5,s=t.pad??2;return`${e}|s${n}|f${r}|m${o}|ax${a}|ay${i}|p${s}`}function Nd(e,t){let n=e.cache.get(t);return n?(n.lastAccess=performance.now(),n.canvas):null}function _d(e,t,n,r){if(t.enabled){if(e.cache.size>=t.maxEntries){let o=null,a=1/0;for(let[i,s]of e.cache)s.lastAccess<a&&(a=s.lastAccess,o=i);o&&e.cache.delete(o)}e.cache.set(n,{canvas:r,lastAccess:performance.now()})}}function Wi(e){let t=document.createElement("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");return n&&n.drawImage(e,0,0),t}function ji(e){e.cache.clear()}function zi(e){return{size:e.cache.size,maxEntries:e.maxEntries}}function Wd(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0)})}async function Fi(e,t,n,r,o,a,i,s=5,u=0){if(!t.ready||!a.enabled)return 0;let d=e.length,l=0;i?.(0,d);for(let c=0;c<d;c+=s){let p=e.slice(c,c+s);for(let m of p)try{let f=rt(null,m,t.textures,t.animations),g=Jo(f,{scale:1});o.cache.has(g)||Un(t,n,r,null,m,{scale:1},o,a),l++}catch{l++}i?.(l,d),c+s<d&&await Wd()}return l}function Bd(e){if(e.overlay)return e.overlay;let t=new e.ctors.Container;t.sortableChildren=!0,t.zIndex=99999999;try{e.app.stage.sortableChildren=!0}catch{}return e.app.stage.addChild(t),e.overlay=t,t}function jd(e){let t=e.defaultParent;if(!t)return null;try{return typeof t=="function"?t():t}catch{return null}}function Ui(e,t,n,r,o,a){if(!n.length)return t;let i=$o(n);if(!i.sig)return t;let s=Fo(e,i),u=Uo(o,s);if(u?.tex)return u.tex;let d=qo(t,e,i,{renderer:r.renderer,ctors:r.ctors,textures:r.textures,cacheState:o,cacheConfig:a});return d?(Vo(o,s,{isAnim:!1,tex:d},a),d):t}function Vi(e,t,n,r,o,a){if(!n.length)return t;let i=$o(n);if(!i.sig)return t;let s=Fo(e,i),u=Uo(o,s);if(u?.isAnim&&u.frames?.length)return u.frames;let d=_i(t,e,i,{renderer:r.renderer,ctors:r.ctors,textures:r.textures,cacheState:o,cacheConfig:a});return d?(Vo(o,s,{isAnim:!0,frames:d},a),d):t}function Xo(e,t,n,r,o,a={}){if(!e.ready)throw new Error("MGSprite not ready yet");let i=rt(r,o,e.textures,e.animations),s=a.mutations||[],u=a.parent||jd(e)||Bd(e),d=e.renderer?.width||e.renderer?.view?.width||innerWidth,l=e.renderer?.height||e.renderer?.view?.height||innerHeight,c=a.center?d/2:a.x??d/2,p=a.center?l/2:a.y??l/2,m,f=e.animations.get(i);if(f&&f.length>=2){let h=Vi(i,f,s,e,t,n),S=e.ctors.AnimatedSprite;if(S)m=new S(h),m.animationSpeed=a.fps?a.fps/60:a.speed??.15,m.loop=a.loop??!0,m.play();else{let v=new e.ctors.Sprite(h[0]),k=1e3/Math.max(1,a.fps||8),T=0,A=0,I=E=>{let R=e.app.ticker?.deltaMS??E*16.666666666666668;if(T+=R,T<k)return;let L=T/k|0;T%=k,A=(A+L)%h.length,v.texture=h[A]};v.__mgTick=I,e.app.ticker?.add?.(I),m=v}}else{let h=e.textures.get(i);if(!h)throw new Error(`Unknown sprite/anim key: ${i}`);let S=Ui(i,h,s,e,t,n);m=new e.ctors.Sprite(S)}let g=a.anchorX??m.texture?.defaultAnchor?.x??.5,b=a.anchorY??m.texture?.defaultAnchor?.y??.5;return m.anchor?.set?.(g,b),m.position.set(c,p),m.scale.set(a.scale??1),m.alpha=a.alpha??1,m.rotation=a.rotation??0,m.zIndex=a.zIndex??999999,u.addChild(m),e.live.add(m),m.__mgDestroy=()=>{try{m.__mgTick&&e.app.ticker?.remove?.(m.__mgTick)}catch{}try{m.destroy?.({children:!0,texture:!1,baseTexture:!1})}catch{try{m.destroy?.()}catch{}}e.live.delete(m)},m}function zd(e,t){let n=e.renderer;if(n?.extract?.canvas)return n.extract.canvas(t);if(n?.plugins?.extract?.canvas)return n.plugins.extract.canvas(t);throw new Error("No extract.canvas available on renderer")}function Un(e,t,n,r,o,a={},i,s){if(!e.ready)throw new Error("MGSprite not ready yet");let u=rt(r,o,e.textures,e.animations);if(i&&s?.enabled){let y=Jo(u,a),k=Nd(i,y);if(k)return Wi(k)}let d=a.mutations||[],l=e.animations.get(u),c=Math.max(0,(a.frameIndex??0)|0),p;if(l?.length){let y=Vi(u,l,d,e,t,n);p=y[c%y.length]}else{let y=e.textures.get(u);if(!y)throw new Error(`Unknown sprite/anim key: ${u}`);p=Ui(u,y,d,e,t,n)}let m=new e.ctors.Sprite(p),f=a.anchorX??m.texture?.defaultAnchor?.x??.5,g=a.anchorY??m.texture?.defaultAnchor?.y??.5;m.anchor?.set?.(f,g),m.scale.set(a.scale??1);let b=a.pad??2,h=new e.ctors.Container;h.addChild(m);try{h.updateTransform?.()}catch{}let S=m.getBounds?.(!0)||{x:0,y:0,width:m.width,height:m.height};m.position.set(-S.x+b,-S.y+b);let v=zd(e,h);try{h.destroy?.({children:!0})}catch{}if(i&&s?.enabled){let y=Jo(u,a);return _d(i,s,y,v),Wi(v)}return v}function $i(e){for(let t of Array.from(e.live))t.__mgDestroy?.()}function Ki(e,t){return e.defaultParent=t,!0}function qi(e,t){return e.defaultParent=t,!0}function Fd(){return{ready:!1,app:null,renderer:null,ctors:null,baseUrl:null,textures:new Map,animations:new Map,live:new Set,defaultParent:null,overlay:null,categoryIndex:null}}var Vn=null,he=Fd(),Ud=yi(),Vd={...hi},$d=Bi(),Kd={...Yo};function ve(){return he}function it(){return Ud}function Ct(){return Vd}function Pt(){return $d}function $n(){return Kd}function Qo(){return he.ready}async function Ji(){return he.ready?!0:Vn||(Vn=(async()=>{let e=performance.now();Qe("init start");let t=await Gn(Te.appReady,15e3,"PIXI app");Qe("app ready");let n=await Gn(Te.rendererReady,15e3,"PIXI renderer");Qe("renderer ready"),he.app=t,he.renderer=n||t?.renderer||null,he.ctors=await fi(t),Qe("constructors resolved"),he.baseUrl=await He.base(),Qe("base url",he.baseUrl);let{textures:r,animations:o,categoryIndex:a}=await bi(he.baseUrl,he.ctors);return he.textures=r,he.animations=o,he.categoryIndex=a,Qe("atlases loaded","textures",he.textures.size,"animations",he.animations.size,"categories",he.categoryIndex?.size??0),he.ready=!0,Qe("ready in",Math.round(performance.now()-e),"ms"),!0})(),Vn)}function st(){if(!Qo())throw new Error("MGSprite not ready yet")}function qd(e,t,n){return typeof t=="string"?Xo(ve(),it(),Ct(),e,t,n||{}):Xo(ve(),it(),Ct(),null,e,t||{})}function Jd(e,t,n){return typeof t=="string"?Un(ve(),it(),Ct(),e,t,n||{},Pt(),$n()):Un(ve(),it(),Ct(),null,e,t||{},Pt(),$n())}function Yd(){$i(ve())}function Xd(e){return Ki(ve(),e)}function Qd(e){return qi(ve(),e)}function Zd(e,t){let n=ve(),r=typeof t=="string"?rt(e,t,n.textures,n.animations):rt(null,e,n.textures,n.animations);return n.textures.has(r)||n.animations.has(r)}function ep(){st();let e=ve().categoryIndex;return e?Array.from(e.keys()).sort((t,n)=>t.localeCompare(n)):[]}function tp(e){st();let t=String(e||"").trim();if(!t)return[];let n=ve().categoryIndex;return n?Array.from(n.get(t)?.values()||[]):[]}function np(e,t){st();let n=String(e||"").trim(),r=String(t||"").trim();if(!n||!r)return!1;let o=ve().categoryIndex;if(!o)return!1;let a=n.toLowerCase(),i=r.toLowerCase();for(let[s,u]of o.entries())if(s.toLowerCase()===a){for(let d of u.values())if(d.toLowerCase()===i)return!0}return!1}function op(e){st();let t=ve().categoryIndex;if(!t)return[];let n=String(e||"").trim().toLowerCase(),r=[];for(let[o,a]of t.entries())for(let i of a.values()){let s=kt(o,i);(!n||s.toLowerCase().startsWith(n))&&r.push(s)}return r.sort((o,a)=>o.localeCompare(a))}function rp(e){st();let t=String(e||"").trim();if(!t)return null;let n=Kt(t),r=/^sprite\/([^/]+)\/(.+)$/.exec(n);if(!r)return null;let o=r[1],a=r[2],i=ve().categoryIndex,s=o.toLowerCase(),u=a.toLowerCase(),d=o,l=a;if(i){let c=Array.from(i.keys()).find(f=>f.toLowerCase()===s);if(!c)return null;d=c;let p=i.get(c);if(!p)return null;let m=Array.from(p.values()).find(f=>f.toLowerCase()===u);if(!m)return null;l=m}return{category:d,id:l,key:kt(d,l)}}function ap(e,t){st();let n=String(e||"").trim(),r=String(t||"").trim();if(!n||!r)throw new Error("getIdPath(category, id) requires both category and id");let o=ve().categoryIndex;if(!o)throw new Error("Sprite categories not indexed");let a=n.toLowerCase(),i=r.toLowerCase(),s=Array.from(o.keys()).find(l=>l.toLowerCase()===a)||n,u=o.get(s);if(!u)throw new Error(`Unknown sprite category: ${n}`);let d=Array.from(u.values()).find(l=>l.toLowerCase()===i)||r;if(!u.has(d))throw new Error(`Unknown sprite id: ${n}/${r}`);return kt(s,d)}function ip(){xi(it())}function sp(){ji(Pt())}function lp(){return zi(Pt())}function cp(){return[...ki]}async function up(e,t,n=10,r=0){return st(),Fi(e,ve(),it(),Ct(),Pt(),$n(),t,n,r)}var me={init:Ji,ready:Qo,show:qd,toCanvas:Jd,clear:Yd,attach:Xd,attachProvider:Qd,has:Zd,key:(e,t)=>kt(e,t),getCategories:ep,getCategoryId:tp,hasId:np,listIds:op,getIdInfo:rp,getIdPath:ap,clearMutationCache:ip,clearToCanvasCache:sp,getToCanvasCacheStats:lp,getMutationNames:cp,warmup:up};$e();var er=P,Ke=er.Object??Object,tr=Ke.keys,Kn=Ke.values,qn=Ke.entries,lt={items:["WateringCan","PlanterPot","Shovel"],decor:["SmallRock","MediumRock","LargeRock","WoodBench","StoneBench","MarbleBench"],mutations:["Gold","Rainbow","Wet","Chilled","Frozen"],eggs:["CommonEgg","UncommonEgg","RareEgg"],pets:["Worm","Snail","Bee","Chicken","Bunny"],abilities:["ProduceScaleBoost","DoubleHarvest","SeedFinderI","CoinFinderI"],plants:["Carrot","Strawberry","Aloe","Blueberry","Apple"]},dp=["Rain","Frost","Dawn","AmberMoon"],Yi=/main-[^/]+\.js(\?|$)/,pp=3,mp=200,gp=50,Xi=new WeakSet,q={isReady:!1,isHookInstalled:!1,data:{items:null,decor:null,mutations:null,eggs:null,pets:null,abilities:null,plants:null,weather:null},spritesResolved:!1,spritesResolving:null,weatherPollingTimer:null,weatherPollAttempts:0},ct=(e,t)=>t.every(n=>e.includes(n));function ut(e,t){q.data[e]==null&&(q.data[e]=t,fp()&&es())}function fp(){return Object.values(q.data).every(e=>e!=null)}function Qi(e,t){if(!e||typeof e!="object"||Xi.has(e))return;Xi.add(e);let n;try{n=tr(e)}catch{return}if(!n||n.length===0)return;let r=e,o;if(!q.data.items&&ct(n,lt.items)&&(o=r.WateringCan,o&&typeof o=="object"&&"coinPrice"in o&&"creditPrice"in o&&ut("items",r)),!q.data.decor&&ct(n,lt.decor)&&(o=r.SmallRock,o&&typeof o=="object"&&"coinPrice"in o&&"creditPrice"in o&&ut("decor",r)),!q.data.mutations&&ct(n,lt.mutations)&&(o=r.Gold,o&&typeof o=="object"&&"baseChance"in o&&"coinMultiplier"in o&&ut("mutations",r)),!q.data.eggs&&ct(n,lt.eggs)&&(o=r.CommonEgg,o&&typeof o=="object"&&"faunaSpawnWeights"in o&&"secondsToHatch"in o&&ut("eggs",r)),!q.data.pets&&ct(n,lt.pets)&&(o=r.Worm,o&&typeof o=="object"&&"coinsToFullyReplenishHunger"in o&&"diet"in o&&Array.isArray(o.diet)&&ut("pets",r)),!q.data.abilities&&ct(n,lt.abilities)&&(o=r.ProduceScaleBoost,o&&typeof o=="object"&&"trigger"in o&&"baseParameters"in o&&ut("abilities",r)),!q.data.plants&&ct(n,lt.plants)&&(o=r.Carrot,o&&typeof o=="object"&&"seed"in o&&"plant"in o&&"crop"in o&&ut("plants",r)),!(t>=pp))for(let a of n){let i;try{i=r[a]}catch{continue}i&&typeof i=="object"&&Qi(i,t+1)}}function Zo(e){try{Qi(e,0)}catch{}}function Zi(){if(!q.isHookInstalled){q.isHookInstalled=!0;try{Ke.keys=function(t){return Zo(t),tr.apply(this,arguments)},Kn&&(Ke.values=function(t){return Zo(t),Kn.apply(this,arguments)}),qn&&(Ke.entries=function(t){return Zo(t),qn.apply(this,arguments)})}catch{}}}function es(){if(q.isHookInstalled){try{Ke.keys=tr,Kn&&(Ke.values=Kn),qn&&(Ke.entries=qn)}catch{}q.isHookInstalled=!1}}function bp(){try{for(let e of er.document?.scripts||[]){let t=e?.src?String(e.src):"";if(Yi.test(t))return t}}catch{}try{for(let e of er.performance?.getEntriesByType?.("resource")||[]){let t=e?.name?String(e.name):"";if(Yi.test(t))return t}}catch{}return null}function hp(e,t){let n=Math.max(e.lastIndexOf("const ",t),e.lastIndexOf("let ",t),e.lastIndexOf("var ",t));if(n<0)return null;let r=e.indexOf("=",n);if(r<0||r>t)return null;let o=e.indexOf("{",r);if(o<0||o>t)return null;let a=0,i="",s=!1;for(let u=o;u<e.length;u++){let d=e[u];if(i){if(s){s=!1;continue}if(d==="\\"){s=!0;continue}d===i&&(i="");continue}if(d==='"'||d==="'"){i=d;continue}if(d==="{")a++;else if(d==="}"&&--a===0)return e.slice(o,u+1)}return null}function yp(e){let t={},n=!1;for(let r of dp){let o=e?.[r];if(!o||typeof o!="object")continue;let a=o.iconSpriteKey||null,{iconSpriteKey:i,...s}=o;t[r]={weatherId:r,spriteId:a,...s},n=!0}return t.Sunny||(t.Sunny={weatherId:"Sunny",name:"Sunny",spriteId:"sprite/ui/SunnyIcon",type:"primary"}),!n||t.Rain&&t.Rain.mutator?.mutation!=="Wet"?null:t}async function vp(){if(q.data.weather)return!0;let e=bp();if(!e)return!1;let t="";try{let s=await fetch(e,{credentials:"include"});if(!s.ok)return!1;t=await s.text()}catch{return!1}let n=t.indexOf("fixedTimeSlots:[0,48,96,144,192,240]");if(n<0&&(n=t.indexOf('name:"Amber Moon"')),n<0)return!1;let r=hp(t,n);if(!r)return!1;let o=r.replace(/\b[A-Za-z_$][\w$]*\.(Rain|Frost|Dawn|AmberMoon)\b/g,'"$1"'),a;try{a=Function('"use strict";return('+o+")")()}catch{return!1}let i=yp(a);return i?(q.data.weather=i,!0):!1}function xp(){if(q.weatherPollingTimer)return;q.weatherPollAttempts=0;let e=setInterval(async()=>{(await vp()||++q.weatherPollAttempts>mp)&&(clearInterval(e),q.weatherPollingTimer=null)},gp);q.weatherPollingTimer=e}function Sp(e){return String(e||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^A-Za-z0-9]/g,"").trim()}function wp(e,t=[]){let n=new Set,r=o=>{let a=String(o||"").trim();a&&n.add(a)};r(e);for(let o of t)r(o);for(let o of Array.from(n.values()))o.endsWith("s")?r(o.slice(0,-1)):r(`${o}s`),o.endsWith("es")&&r(o.slice(0,-2));return Array.from(n.values()).filter(Boolean)}function ts(e,t,n,r=[],o=[]){let a=wp(e,r);if(!a.length)return null;let i=[t,...o].filter(l=>typeof l=="string"),s=l=>{let c=String(l||"").trim();if(!c)return null;for(let p of a)try{if(me.has(p,c))return me.getIdPath(p,c)}catch{}return null};for(let l of i){let c=s(l);if(c)return c}let u=Sp(n||""),d=s(u||n||"");if(d)return d;try{for(let l of a){let c=me.listIds(`sprite/${l}/`),p=i.map(f=>String(f||"").toLowerCase()),m=String(n||u||"").toLowerCase();for(let f of c){let b=(f.split("/").pop()||"").toLowerCase();if(p.some(h=>h&&h===b)||b===m)return f}for(let f of c){let b=(f.split("/").pop()||"").toLowerCase();if(p.some(h=>h&&b.includes(h))||m&&b.includes(m))return f}}}catch{}return null}function De(e,t,n,r,o=[],a=[]){if(!e||typeof e!="object")return;let i=e.tileRef;if(!i||typeof i!="object")return;let s=String(i.spritesheet||t||"").trim(),u=ts(s,n,r,o,a);if(u)try{e.spriteId=u}catch{}let d=e.rotationVariants;if(d&&typeof d=="object")for(let l of Object.values(d))De(l,s,n,r);if(e.immatureTileRef){let l={tileRef:e.immatureTileRef};De(l,s,n,r),l.spriteId&&(e.immatureSpriteId=l.spriteId)}if(e.topmostLayerTileRef){let l={tileRef:e.topmostLayerTileRef};De(l,s,n,r),l.spriteId&&(e.topmostLayerSpriteId=l.spriteId)}e.activeState&&typeof e.activeState=="object"&&De(e.activeState,s,n,e.activeState?.name||r)}function Tp(e,t,n,r=[]){if(!Array.isArray(t)||t.length===0)return null;let o=t[0],a=t.slice(1);return ts(e,o,n??null,r,a)}function kp(e){for(let[t,n]of Object.entries(e.items||{}))De(n,"items",t,n?.name,["item"]);for(let[t,n]of Object.entries(e.decor||{}))De(n,"decor",t,n?.name);for(let[t,n]of Object.entries(e.mutations||{})){De(n,"mutations",t,n?.name,["mutation"]);let r=Tp("mutation-overlay",[`${t}TallPlant`,`${t}TallPlantIcon`,t],n?.name,["mutation-overlay"]);if(r)try{n.overlaySpriteId=r}catch{}}for(let[t,n]of Object.entries(e.eggs||{}))De(n,"pets",t,n?.name,["pet"]);for(let[t,n]of Object.entries(e.pets||{}))De(n,"pets",t,n?.name,["pet"]);for(let[t,n]of Object.entries(e.plants||{})){let r=n;r.seed&&De(r.seed,r.seed?.tileRef?.spritesheet||"seeds",`${t}Seed`,r.seed?.name||`${t} Seed`,["seed","plant","plants"],[t]),r.plant&&De(r.plant,r.plant?.tileRef?.spritesheet||"plants",`${t}Plant`,r.plant?.name||`${t} Plant`,["plant","plants","tallplants"],[t]),r.crop&&De(r.crop,r.crop?.tileRef?.spritesheet||"plants",t,r.crop?.name||t,["plant","plants"],[`${t}Crop`])}}async function ns(){if(!q.spritesResolved)return q.spritesResolving||(q.spritesResolving=(async()=>{try{await os(2e4,50),await me.init(),kp(q.data),q.spritesResolved=!0}catch(e){try{console.warn("[MGData] sprite resolution failed",e)}catch{}}finally{q.spritesResolving=null}})()),q.spritesResolving}async function Cp(){return q.isReady||(Zi(),xp(),ns(),q.isReady=!0),!0}function Pp(){return q.isReady}function Ap(){return es(),q.weatherPollingTimer&&(clearInterval(q.weatherPollingTimer),q.weatherPollingTimer=null),q.isReady=!1,!0}function Mp(){return!q.spritesResolved&&!q.spritesResolving&&ns(),{...q.data}}function Ip(e){return q.data[e]??null}function Ep(e){return q.data[e]!=null}async function os(e=1e4,t=50){let n=Date.now();for(;Date.now()-n<e;){if(Object.values(q.data).some(r=>r!=null))return{...q.data};await Ve(t)}throw new Error("MGData.waitForAnyData: timeout")}async function Lp(e,t=1e4,n=50){let r=Date.now();for(;Date.now()-r<t;){let o=q.data[e];if(o!=null)return o;await Ve(n)}throw new Error(`MGData.waitFor: timeout waiting for "${e}"`)}var ge={init:Cp,isReady:Pp,stop:Ap,getAll:Mp,get:Ip,has:Ep,waitForAnyData:os,waitFor:Lp};Zi();var Rp={expanded:!1,sort:{key:null,dir:null},search:""},Op={categories:{}};async function rs(){let e=await Wt("tab-test",{version:2,defaults:Op,sanitize:a=>({categories:a.categories&&typeof a.categories=="object"?a.categories:{}})});function t(a){return e.get().categories[a]||{...Rp}}function n(a,i){let s=e.get(),u=t(a);e.update({categories:{...s.categories,[a]:{...u,expanded:i}}})}function r(a,i,s){let u=e.get(),d=t(a);e.update({categories:{...u.categories,[a]:{...d,sort:{key:i,dir:s}}}})}function o(a,i){let s=e.get(),u=t(a);e.update({categories:{...s.categories,[a]:{...u,search:i}}})}return{get:e.get,set:e.set,save:e.save,getCategoryState:t,setCategoryExpanded:n,setCategorySort:r,setCategorySearch:o}}var Dp={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function Jn(e){return e?Dp[e]??0:0}var Yn=class extends tt{constructor(){super({id:"tab-test",label:"Test"});le(this,"stateCtrl",null)}async build(n){this.stateCtrl=await rs();let r=this.createContainer("test-section");r.style.display="flex",r.style.flexDirection="column",r.style.gap="12px",n.appendChild(r),await this.buildSpriteTables(r)}renderSprite(n){let r=w("div",{style:"display:flex;align-items:center;justify-content:center;width:32px;height:32px;"});if(n.spriteId){let o=n.spriteId;requestAnimationFrame(()=>{try{let a=me.toCanvas(o,{scale:1});a.style.maxWidth="32px",a.style.maxHeight="32px",a.style.objectFit="contain",r.appendChild(a)}catch{r.textContent="-"}})}else r.textContent="-";return r}renderRarity(n){if(!n.rarity){let o=w("span",{style:"opacity:0.5;"});return o.textContent="\u2014",o}return ri({variant:"rarity",rarity:n.rarity,size:"sm"}).root}createDataCard(n,r,o,a){let i=this.stateCtrl.getCategoryState(n),s=p=>{if(!p)return o;let m=p.toLowerCase();return o.filter(f=>f.name.toLowerCase().includes(m))},u=ni({columns:a,data:s(i.search),pageSize:0,compact:!0,maxHeight:"calc(var(--lg-row-h, 40px) * 6)",getRowId:p=>p.spriteId,onSortChange:(p,m)=>{this.stateCtrl.setCategorySort(n,p,m)}});i.sort.key&&i.sort.dir&&u.sortBy(i.sort.key,i.sort.dir);let d=oi({placeholder:"Search...",value:i.search,debounceMs:150,withClear:!0,size:"sm",focusKey:"",onChange:p=>{let m=p.trim();this.stateCtrl.setCategorySearch(n,m),u.setData(s(m))}}),l=w("div",{style:"margin-bottom:8px;"});l.appendChild(d.root);let c=w("div");return c.appendChild(l),c.appendChild(u.root),nt({title:r,subtitle:`${o.length} entries`,variant:"soft",padding:"sm",expandable:!0,defaultExpanded:i.expanded,onExpandChange:p=>{this.stateCtrl.setCategoryExpanded(n,p)}},c)}formatCategoryName(n){return n.split("-").map(r=>r.charAt(0).toUpperCase()+r.slice(1)).join(" ")}findPlantBySprite(n,r){let o=ge.get("plants");if(!o)return null;for(let i of Object.values(o))if(i?.seed?.spriteId===n||i?.plant?.spriteId===n||i?.crop?.spriteId===n)return i;let a=r.toLowerCase();for(let i of Object.values(o)){let s=(i?.seed?.name||"").toLowerCase();if(s===a||s===`${a} seed`)return i}return null}findPetBySpriteId(n){let r=ge.get("pets");if(!r)return null;for(let o of Object.values(r))if(o?.spriteId===n)return o;return null}findItemBySpriteId(n){let r=ge.get("items");if(!r)return null;for(let o of Object.values(r))if(o?.spriteId===n)return o;return null}findDecorBySpriteId(n){let r=ge.get("decor");if(!r)return null;for(let o of Object.values(r))if(o?.spriteId===n)return o;return null}findEggBySpriteId(n){let r=ge.get("eggs");if(!r)return null;for(let o of Object.values(r))if(o?.spriteId===n)return o;return null}getRarityForSprite(n,r,o){let a=n.toLowerCase();if(a==="plant"||a==="seed"||a==="tallplant"){let i=this.findPlantBySprite(r,o);if(i?.seed?.rarity)return i.seed.rarity}if(a==="pet"){let i=this.findPetBySpriteId(r);if(i?.rarity)return i.rarity}if(a==="item"){let i=this.findItemBySpriteId(r);if(i?.rarity)return i.rarity}if(a==="decor"){let i=this.findDecorBySpriteId(r);if(i?.rarity)return i.rarity}if(a==="egg"){let i=this.findEggBySpriteId(r);if(i?.rarity)return i.rarity}return null}yieldToMain(n=0){return new Promise(r=>{n>0?setTimeout(r,n):typeof requestIdleCallback<"u"?requestIdleCallback(()=>r(),{timeout:50}):setTimeout(r,4)})}async buildSpriteTables(n){let r=[{key:"name",header:"Name",sortable:!0,width:"1fr",sortFn:(a,i)=>a.name.localeCompare(i.name,void 0,{numeric:!0,sensitivity:"base"})},{key:"rarity",header:"Rarity",sortable:!0,width:"100px",align:"center",render:a=>this.renderRarity(a),sortFn:(a,i)=>Jn(a.rarity)-Jn(i.rarity)},{key:"sprite",header:"Sprite",width:"60px",align:"center",render:a=>this.renderSprite(a)}];if(!me.ready())try{await me.init()}catch{return}let o=me.getCategories();for(let a=0;a<o.length;a++){await this.yieldToMain(8);let i=o[a],u=me.getCategoryId(i).map(d=>{let l=`sprite/${i}/${d}`;return{name:d,spriteId:l,rarity:this.getRarityForSprite(i,l,d)}});if(u.sort((d,l)=>Jn(d.rarity)-Jn(l.rarity)),u.length>0){let d=this.createDataCard(i,this.formatCategoryName(i),u,r);n.appendChild(d)}}}};var nr=null;function as(){return nr||(nr=new Yn),nr}async function or(){await as().preload()}function rr(e){return[new On(e),as()]}function ar(e){let{shadow:t,initialOpen:n}=e,r=w("div",{className:"gemini-panel",id:"panel",ariaHidden:String(!n)}),o=w("div",{className:"gemini-tabbar"}),a=w("div",{className:"gemini-content",id:"content"}),i=w("div",{className:"gemini-resizer",title:"Resize"}),s=w("button",{className:"gemini-close",title:"Fermer",ariaLabel:"Fermer"},"\u2715");r.append(o,a,i);let u=w("div",{className:"gemini-wrapper"},r);return t.append(u),{panel:r,tabbar:o,content:a,resizer:i,closeButton:s,wrapper:u}}function ir(e){let{resizer:t,host:n,panel:r,shadow:o,onWidthChange:a,initialWidth:i,minWidth:s,maxWidth:u}=e,d=s,l=u;function c(){let k=Ae.detect(),T=Math.round(P.visualViewport?.width??P.innerWidth??0);if(k.platform==="mobile"||k.os==="ios"||k.os==="android"){let A=getComputedStyle(o.host),I=parseFloat(A.getPropertyValue("--inset-l"))||0,E=parseFloat(A.getPropertyValue("--inset-r"))||0,R=Math.max(280,T-Math.round(I+E)),L=Math.min(420,Math.max(300,Math.floor(T*.66))),$=R;d=Math.min(L,R),l=$}else d=s,l=u;return{min:d,max:l}}function p(k){return Math.max(d,Math.min(l,Number(k)||i))}function m(k){let T=p(k);n.style.setProperty("--w",`${T}px`),a(T)}c();let f=Ae.detect(),g=!(f.platform==="mobile"||f.os==="ios"||f.os==="android"),b=!1,h=k=>{if(!b)return;k.preventDefault();let T=Math.round(P.innerWidth-k.clientX);m(T)},S=()=>{b&&(b=!1,document.body.style.cursor="",P.removeEventListener("mousemove",h),P.removeEventListener("mouseup",S))},v=k=>{g&&(k.preventDefault(),b=!0,document.body.style.cursor="ew-resize",P.addEventListener("mousemove",h),P.addEventListener("mouseup",S))};t.addEventListener("mousedown",v);function y(){t.removeEventListener("mousedown",v),P.removeEventListener("mousemove",h),P.removeEventListener("mouseup",S)}return{calculateResponsiveBounds:c,constrainWidthToLimits:p,setHudWidth:m,destroy:y}}function sr(e){let{panel:t,onToggle:n,onClose:r,toggleCombo:o=u=>u.ctrlKey&&u.shiftKey&&u.key.toLowerCase()==="u",closeOnEscape:a=!0}=e;function i(u){let d=t.classList.contains("open");if(a&&u.key==="Escape"&&d){r();return}o(u)&&(u.preventDefault(),u.stopPropagation(),n())}document.addEventListener("keydown",i,{capture:!0});function s(){document.removeEventListener("keydown",i,{capture:!0})}return{destroy:s}}var is=`
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
`;var lr=`
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
`;var cr=`
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
`;var ur=`
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
`;function dr(e,t,n){if(e.querySelector(`style[data-style-id="${n}"]`))return;let r=document.createElement("style");r.setAttribute("data-style-id",n),r.textContent=t,e.appendChild(r)}var ss=`
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

  /* \u2014\u2014 Sous-structure \u2014\u2014 */
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
    margin:-2px -4px 0;
  }

  .card-header--expandable{
    cursor:pointer;
    user-select:none;
    border-radius:12px;
    padding:2px 4px;
    margin:-2px -4px 8px;
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
  
`;var ls=`
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
`;var cs=`
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
`;var us=`
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
`;var ds=`
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

/* \u201CStacked\u201D variant (forces title no-wrap) */
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
`;var ps=`
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
`;var ms=`
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
`;var gs=`
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
`;var fs=`
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
`;var bs=`
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
  text-align: var(--col-align, left);
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
  padding-right:22px; /* space for the sort icon */
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
  overflow-x:hidden;
  scrollbar-gutter:stable;
  min-height:0; /* key so scrolling does not jump */
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
`;var hs=`
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
`;var ys=`
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
`;var vs=`
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
`;var xs=`
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
`;var Ss=`
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
`;var ws=`
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
    content: '\u25BE';
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
`;var Ts=`
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
`;var Hp={all:"initial",position:"fixed",top:"0",right:"0",zIndex:"2147483647",pointerEvents:"auto",fontFamily:'system-ui, -apple-system, "Segoe UI", Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',fontSize:"13px",lineHeight:"1.35"};function Gp(e="gemini-root"){let t=document.createElement("div");t.id=e,Object.assign(t.style,Hp),(document.body||document.documentElement).appendChild(t);let n=t.attachShadow({mode:"open"});return{host:t,shadow:n}}function Np(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:16}):setTimeout(e,0)})}async function pr(e){let{hostId:t="gemini-hud-root",initialWidth:n,initialOpen:r,onWidthChange:o,onOpenChange:a,themes:i,initialTheme:s,onThemeChange:u,buildSections:d,initialTab:l,onTabChange:c,toggleCombo:p=C=>C.ctrlKey&&C.shiftKey&&C.key.toLowerCase()==="u",closeOnEscape:m=!0,minWidth:f=420,maxWidth:g=720}=e,{host:b,shadow:h}=Gp(t),S=[[lr,"variables"],[cr,"primitives"],[ur,"utilities"],[is,"hud"],[ss,"card"],[ls,"badge"],[cs,"button"],[us,"input"],[ds,"label"],[ps,"navTabs"],[ms,"searchBar"],[gs,"select"],[fs,"switch"],[bs,"table"],[hs,"timeRangePicker"],[ys,"tooltip"],[vs,"slider"],[xs,"reorderableList"],[Ss,"colorPicker"],[ws,"log"],[Ts,"settings"]];for(let C=0;C<S.length;C++){let[O,D]=S[C];dr(h,O,D),C%5===4&&await Np()}let{panel:v,tabbar:y,content:k,resizer:T,closeButton:A,wrapper:I}=ar({shadow:h,initialOpen:r});function E(C){v.dispatchEvent(new CustomEvent("gemini:hud-open-change",{detail:{isOpen:C},bubbles:!0})),a?.(C)}function R(C){let O=v.classList.contains("open");v.classList.toggle("open",C),v.setAttribute("aria-hidden",C?"false":"true"),C!==O&&E(C)}R(r),A.addEventListener("click",C=>{C.preventDefault(),C.stopPropagation(),R(!1)});let L=Go({host:b,themes:i,initialTheme:s,onThemeChange:u}),$=ir({resizer:T,host:b,panel:v,shadow:h,onWidthChange:o||(()=>{}),initialWidth:n,minWidth:f,maxWidth:g});$.setHudWidth(n);let oe=d({applyTheme:L.applyTheme,initialTheme:s,getCurrentTheme:L.getCurrentTheme,setHUDWidth:$.setHudWidth,setHUDOpen:R}),K=new Nt(oe,k,{applyTheme:L.applyTheme,getCurrentTheme:L.getCurrentTheme}),X=oe.map(C=>({id:C.id,label:C.label})),se=_a(X,l||X[0]?.id||"",C=>{K.activate(C),c?.(C)});se.root.style.flex="1 1 auto",se.root.style.minWidth="0",y.append(se.root,A),K.activate(l||X[0]?.id||"");let N=sr({panel:v,onToggle:()=>R(!v.classList.contains("open")),onClose:()=>R(!1),toggleCombo:p,closeOnEscape:m}),G=()=>{se.recalc();let C=parseInt(getComputedStyle(b).getPropertyValue("--w"))||n;$.calculateResponsiveBounds(),$.setHudWidth(C)};P.addEventListener("resize",G);function H(){N.destroy(),$.destroy(),P.removeEventListener("resize",G)}return{host:b,shadow:h,wrapper:I,panel:v,content:k,setOpen:R,setWidth:$.setHudWidth,sections:oe,manager:K,nav:se,destroy:H}}var At={isOpen:"gemini.hud.isOpen",width:"gemini.hud.width",theme:"gemini.hud.theme",activeTab:"gemini.hud.activeTab"},qt={isOpen:!1,width:480,theme:"dark",activeTab:"tab-settings"};function mr(){return{isOpen:Ye(At.isOpen,qt.isOpen),width:Ye(At.width,qt.width),theme:Ye(At.theme,qt.theme),activeTab:Ye(At.activeTab,qt.activeTab)}}function Mt(e,t){_t(At[e],t)}var _p="https://i.imgur.com/IMkhMur.png",Wp="Stats";function Xn(e){let t=e.iconUrl||_p,n=e.ariaLabel||"Open MGH",r=null,o=null,a=null,i=!1,s=null,u=null,d=["Chat","Leaderboard","Stats","Open Activity Log"],l=v=>{try{return typeof CSS<"u"&&CSS&&typeof CSS.escape=="function"?CSS.escape(v):v.replace(/"/g,'\\"')}catch{return v}};function c(){let v=document.querySelector(d.map(k=>`button[aria-label="${l(k)}"]`).join(","));if(!v)return null;let y=v.parentElement;for(;y&&y!==document.body;){if(d.reduce((T,A)=>T+y.querySelectorAll(`button[aria-label="${l(A)}"]`).length,0)>=2)return y;y=y.parentElement}return null}function p(v){return v}function m(v){let y=Array.from(v.querySelectorAll("button[aria-label]"));if(!y.length)return{refBtn:null,refWrapper:null};let k=y.filter($=>$.dataset.mghBtn!=="true"&&($.getAttribute("aria-label")||"")!==(e.ariaLabel||"Open MGH")),T=k.length?k:y,A=T.find($=>($.getAttribute("aria-label")||"").toLowerCase()===Wp.toLowerCase())||null,I=T.length>=2?T.length-2:T.length-1,E=A||T[I],R=E.parentElement,L=R&&R.parentElement===v&&R.tagName==="DIV"?R:null;return{refBtn:E,refWrapper:L}}function f(v,y,k){let T=v.cloneNode(!1);T.type="button",T.setAttribute("aria-label",y),T.title=y,T.dataset.mghBtn="true",T.style.pointerEvents="auto",T.removeAttribute("id");let A=document.createElement("img");return A.src=k,A.alt="MGH",A.style.pointerEvents="none",A.style.userSelect="none",A.style.width="76%",A.style.height="76%",A.style.objectFit="contain",A.style.display="block",A.style.margin="auto",T.appendChild(A),T.addEventListener("click",I=>{I.preventDefault(),I.stopPropagation();try{e.onClick?.()}catch{}}),T}function g(){if(i)return!1;i=!0;let v=!1;try{let y=c();if(!y)return!1;s!==y&&(s=y);let{refBtn:k,refWrapper:T}=m(y);if(!k)return!1;o=y.querySelector('div[data-mgh-wrapper="true"]'),!o&&T&&(o=T.cloneNode(!1),o.dataset.mghWrapper="true",o.removeAttribute("id"),v=!0);let A=o?.querySelector('button[data-mgh-btn="true"]')||null;r||(r=A),r||(r=f(k,n,t),o?o.appendChild(r):r.parentElement!==y&&y.appendChild(r),v=!0),o&&o.parentElement!==y&&(y.appendChild(o),v=!0);let I=y;if(I&&I!==u){try{S.disconnect()}catch{}u=I,S.observe(u,{childList:!0,subtree:!0})}return v}finally{i=!1}}g();let b=document.getElementById("App")||document.body,h=null,S=new MutationObserver(v=>{let y=v.every(T=>{let A=Array.from(T.addedNodes||[]),I=Array.from(T.removedNodes||[]),E=A.concat(I);if(E.length===0){let R=T.target;return o&&(R===o||o.contains(R))||r&&(R===r||r.contains(R))}return E.every(R=>!!(!(R instanceof HTMLElement)||o&&(R===o||o.contains(R))||r&&(R===r||r.contains(R))))}),k=v.some(T=>Array.from(T.removedNodes||[]).some(A=>A instanceof HTMLElement?!!(o&&(A===o||o.contains(A))||r&&(A===r||r.contains(A))):!1));y&&!k||h===null&&(h=window.setTimeout(()=>{if(h=null,g()&&o){let A=o.parentElement;A&&A.lastElementChild!==o&&A.appendChild(o)}},150))});return S.observe(b,{childList:!0,subtree:!0}),a=()=>S.disconnect(),()=>{try{a?.()}catch{}try{o?.remove()}catch{}}}var Pe={nativeCtor:null,captured:[],latestOpen:null},ks=Symbol.for("ariesmod.ws.capture.wrapped"),Cs=Symbol.for("ariesmod.ws.capture.native"),Ps=1;function gr(e){return!!e&&e.readyState===Ps}function Bp(){if(gr(Pe.latestOpen))return Pe.latestOpen;for(let e=Pe.captured.length-1;e>=0;e--){let t=Pe.captured[e];if(gr(t))return t}return null}function jp(e,t){Pe.captured.push(e),Pe.captured.length>25&&Pe.captured.splice(0,Pe.captured.length-25);let n=()=>{Pe.latestOpen=e,t&&console.log("[WS] captured socket opened",e.url)};e.addEventListener("open",n),e.addEventListener("close",()=>{Pe.latestOpen===e&&(Pe.latestOpen=null),t&&console.log("[WS] captured socket closed",e.url)}),e.readyState===Ps&&n()}function As(e=P,t={}){let n=!!t.debug,r=e?.WebSocket;if(typeof r!="function")return()=>{};if(r[ks])return Pe.nativeCtor=r[Cs]??Pe.nativeCtor??null,()=>{};let o=r;Pe.nativeCtor=o;function a(i,s){let u=s!==void 0?new o(i,s):new o(i);try{jp(u,n)}catch{}return u}try{a.prototype=o.prototype}catch{}try{Object.setPrototypeOf(a,o)}catch{}try{a.CONNECTING=o.CONNECTING,a.OPEN=o.OPEN,a.CLOSING=o.CLOSING,a.CLOSED=o.CLOSED}catch{}a[ks]=!0,a[Cs]=o;try{e.WebSocket=a,n&&console.log("[WS] WebSocket capture installed")}catch{return()=>{}}return()=>{try{e.WebSocket===a&&(e.WebSocket=o)}catch{}}}function zp(e=P){let t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function Jt(e=P){let t=Bp();if(t)return{ws:t,source:"captured"};let n=zp(e);return n?{ws:n,source:"roomConnection"}:{ws:null,source:null}}function Qn(e,t={}){let n=t.pageWindow??P,r=t.intervalMs??500,o=!!t.debug,a=null,i=null,s=()=>{let d=Jt(n);(d.ws!==a||d.source!==i)&&(a=d.ws,i=d.source,o&&console.log("[WS] best socket changed:",d.source,d.ws),e(d))};s();let u=setInterval(s,r);return()=>clearInterval(u)}function Fp(e){if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return null}}function Up(e,t=P){let n=t?.MagicCircle_RoomConnection;if(n&&typeof n.sendMessage=="function")try{return Array.isArray(e)?n.sendMessage(...e):n.sendMessage(e),{ok:!0}}catch(a){return{ok:!1,reason:"error",error:a}}let{ws:r}=Jt(t);if(!r)return{ok:!1,reason:"no-ws"};if(!gr(r))return{ok:!1,reason:"not-open"};let o=Fp(e);if(o==null)return{ok:!1,reason:"error",error:new Error("Cannot stringify message")};try{return r.send(o),{ok:!0}}catch(a){return{ok:!1,reason:"error",error:a}}}function Ms(e,t={},n=P){return Up({type:e,...t},n)}var qp={},Ls=[];function Vp(){return Ls.slice()}function $p(e){Ls.push(e)}function Rs(e){try{return JSON.parse(e)}catch{return}}function Is(e){if(typeof e=="string"){let t=Rs(e);return t!==void 0?t:e}return e}function Os(e){if(e!=null){if(typeof e=="string"){let t=Rs(e);return t!==void 0?Os(t):e}if(Array.isArray(e)&&typeof e[0]=="string")return e[0];if(typeof e=="object"){let t=e;return t.type??t.Type??t.kind??t.messageType}}}function Kp(e){let t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function W(e,t,n){let r=typeof t=="boolean"?t:!0,o=typeof t=="function"?t:n,a=(i,s)=>{if(Os(i)!==e)return;let d=o(i,s);return d&&typeof d=="object"&&"kind"in d?d:typeof d=="boolean"?d?void 0:{kind:"drop"}:r?void 0:{kind:"drop"}};return $p(a),a}var Yt=new WeakSet,Es=new WeakMap;function Ds(e){let t=e.pageWindow,n=!!e.debug,r=e.middlewares&&e.middlewares.length?e.middlewares:Vp();if(!r.length)return()=>{};let o=p=>({ws:p,pageWindow:t,debug:n}),a=(p,m)=>{let f=p;for(let g of r){let b=g(f,o(m));if(b){if(b.kind==="drop")return{kind:"drop"};b.kind==="replace"&&(f=b.message)}}return f!==p?{kind:"replace",message:f}:void 0},i=null,s=null,u=null,d=()=>{let p=t?.MagicCircle_RoomConnection,m=p?.sendMessage;if(!p||typeof m!="function")return!1;if(Yt.has(m))return!0;let f=m.bind(p);function g(...b){let h=b.length===1?b[0]:b,S=Is(h),v=a(S,Kp(t));if(v?.kind==="drop"){n&&console.log("[WS] drop outgoing (RoomConnection.sendMessage)",S);return}if(v?.kind==="replace"){let y=v.message;return b.length>1&&Array.isArray(y)?(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",S,"=>",y),f(...y)):(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",S,"=>",y),f(y))}return f(...b)}Yt.add(g),Es.set(g,m);try{p.sendMessage=g,Yt.add(p.sendMessage),n&&console.log("[WS] outgoing patched via MagicCircle_RoomConnection.sendMessage")}catch{return!1}return i=()=>{try{p.sendMessage===g&&(p.sendMessage=m)}catch{}},!0};(()=>{let p=t?.WebSocket?.prototype,m=p?.send;if(typeof m!="function"||Yt.has(m))return;function f(g){let b=Is(g),h=a(b,this);if(h?.kind==="drop"){n&&console.log("[WS] drop outgoing (ws.send)",b);return}if(h?.kind==="replace"){let S=h.message,v=typeof S=="string"||S instanceof ArrayBuffer||S instanceof Blob?S:JSON.stringify(S);return n&&console.log("[WS] replace outgoing (ws.send)",b,"=>",S),m.call(this,v)}return m.call(this,g)}Yt.add(f),Es.set(f,m);try{p.send=f,n&&console.log("[WS] outgoing patched via WebSocket.prototype.send")}catch{return}s=()=>{try{p.send===f&&(p.send=m)}catch{}}})();let c=e.waitForRoomConnectionMs??4e3;if(!d()&&c>0){let p=Date.now();u=setInterval(()=>{if(d()){clearInterval(u),u=null;return}Date.now()-p>c&&(clearInterval(u),u=null,n&&console.log("[WS] RoomConnection not found, only ws.send is patched"))},250)}return()=>{if(u){try{clearInterval(u)}catch{}u=null}if(i){try{i()}catch{}i=null}if(s){try{s()}catch{}s=null}}}(function(){try{let t=qp,n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();var Qp={},Gs=[];function Jp(){return Gs.slice()}function Hs(e){Gs.push(e)}function Yp(e){if(e!=null){if(typeof e=="object"){let t=e;if(typeof t.type=="string")return t.type;if(typeof t.Type=="string")return t.Type;if(typeof t.kind=="string")return t.kind;if(typeof t.messageType=="string")return t.messageType}if(Array.isArray(e)&&typeof e[0]=="string")return e[0]}}function Xp(e){if(typeof e=="string")try{return JSON.parse(e)}catch{return e}return e}var fr=Symbol.for("ariesmod.ws.handlers.patched");function fe(e,t){if(typeof e=="string"){let o=e,a={match:i=>i.kind==="message"&&i.type===o,handle:t};return Hs(a),a}let n=e,r={match:o=>o.kind==="close"&&o.code===n,handle:t};return Hs(r),r}function Ns(e,t=Jp(),n={}){let r=n.pageWindow??window,o=!!n.debug;if(e[fr])return()=>{};e[fr]=!0;let a={ws:e,pageWindow:r,debug:o},i=c=>{for(let p of t)try{if(!p.match(c))continue;if(p.handle(c,a)===!0)return}catch(m){o&&console.error("[WS] handler error",m,c)}},s=c=>{let p=Xp(c.data),m=Yp(p);i({kind:"message",raw:c.data,data:p,type:m})},u=c=>{i({kind:"close",code:c.code,reason:c.reason,wasClean:c.wasClean,event:c})},d=c=>i({kind:"open",event:c}),l=c=>i({kind:"error",event:c});return e.addEventListener("message",s),e.addEventListener("close",u),e.addEventListener("open",d),e.addEventListener("error",l),()=>{try{e.removeEventListener("message",s)}catch{}try{e.removeEventListener("close",u)}catch{}try{e.removeEventListener("open",d)}catch{}try{e.removeEventListener("error",l)}catch{}try{delete e[fr]}catch{}}}(function(){try{let t=Qp,n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();var We={Welcome:"Welcome",PartialState:"PartialState",ServerErrorMessage:"ServerErrorMessage",Config:"Config",InappropriateContentRejected:"InappropriateContentRejected",Emote:"Emote",CurrencyTransaction:"CurrencyTransaction",Pong:"Pong"},M={Chat:"Chat",Emote:"Emote",Wish:"Wish",KickPlayer:"KickPlayer",SetPlayerData:"SetPlayerData",UsurpHost:"UsurpHost",Dev:"Dev",SetSelectedGame:"SetSelectedGame",VoteForGame:"VoteForGame",RequestGame:"RequestGame",RestartGame:"RestartGame",Ping:"Ping",PlayerPosition:"PlayerPosition",Teleport:"Teleport",CheckWeatherStatus:"CheckWeatherStatus",MoveInventoryItem:"MoveInventoryItem",DropObject:"DropObject",PickupObject:"PickupObject",ToggleFavoriteItem:"ToggleFavoriteItem",PutItemInStorage:"PutItemInStorage",RetrieveItemFromStorage:"RetrieveItemFromStorage",MoveStorageItem:"MoveStorageItem",LogItems:"LogItems",PlantSeed:"PlantSeed",WaterPlant:"WaterPlant",HarvestCrop:"HarvestCrop",SellAllCrops:"SellAllCrops",PurchaseSeed:"PurchaseSeed",PurchaseEgg:"PurchaseEgg",PurchaseTool:"PurchaseTool",PurchaseDecor:"PurchaseDecor",PlantEgg:"PlantEgg",HatchEgg:"HatchEgg",PlantGardenPlant:"PlantGardenPlant",PotPlant:"PotPlant",MutationPotion:"MutationPotion",PickupDecor:"PickupDecor",PlaceDecor:"PlaceDecor",RemoveGardenObject:"RemoveGardenObject",PlacePet:"PlacePet",FeedPet:"FeedPet",PetPositions:"PetPositions",SwapPet:"SwapPet",StorePet:"StorePet",NamePet:"NamePet",SellPet:"SellPet",ReportSpeakingStart:"ReportSpeakingStart"};var fT=new Set(Object.values(We)),bT=new Set(Object.values(M));fe(4800,(e,t)=>{t.debug&&console.log("[WS][Close] Auth failure",e.code,e.reason)});fe(4300,(e,t)=>{t.debug&&console.log("[WS][Close] Superseded",e.code,e.reason)});fe(4400,(e,t)=>{t.debug&&console.log("[WS][Close] Heartbeat expired",e.code,e.reason)});fe(4500,(e,t)=>{t.debug&&console.log("[WS][Close] Player kicked",e.code,e.reason)});fe(4200,(e,t)=>{t.debug&&console.log("[WS][Close] Player left voluntarily",e.code,e.reason)});fe(4100,(e,t)=>{t.debug&&console.log("[WS][Close] Reconnect initiated",e.code,e.reason)});fe(4310,(e,t)=>{t.debug&&console.log("[WS][Close] Server disposed",e.code,e.reason)});fe(4250,(e,t)=>{t.debug&&console.log("[WS][Close] User session superseded",e.code,e.reason)});fe(4710,(e,t)=>{t.debug&&console.log("[WS][Close] Version expired",e.code,e.reason)});fe(4700,(e,t)=>{t.debug&&console.log("[WS][Close] Version mismatch",e.code,e.reason)});fe(We.Config,(e,t)=>{t.debug&&console.log("[WS][STC] Config",e.data)});fe(We.CurrencyTransaction,(e,t)=>{t.debug&&console.log("[WS][STC] CurrencyTransaction",e.data)});fe(We.Emote,(e,t)=>{t.debug&&console.log("[WS][STC] Emote",e.data)});fe(We.InappropriateContentRejected,(e,t)=>{t.debug&&console.log("[WS][STC] InappropriateContentRejected",e.data)});fe(We.PartialState,(e,t)=>{t.debug&&console.log("[WS][STC] PartialState",e.data)});fe(We.Pong,(e,t)=>{t.debug&&console.log("[WS][STC] Pong",e.data)});fe(We.ServerErrorMessage,(e,t)=>{t.debug&&console.log("[WS][STC] ServerErrorMessage",e.data)});fe(We.Welcome,(e,t)=>{t.debug&&console.log("[WS][STC] Welcome",e.data)});W(M.PlantSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantSeed"),!!1));W(M.WaterPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] WaterPlant"),!!1));W(M.HarvestCrop,(e,t)=>(t.debug&&console.log("[MW][Garden] HarvestCrop"),!!1));W(M.SellAllCrops,(e,t)=>(t.debug&&console.log("[MW][Garden] SellAllCrops"),!!1));W(M.PurchaseSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseSeed"),!!1));W(M.PurchaseEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseEgg"),!!1));W(M.PurchaseTool,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseTool"),!!1));W(M.PurchaseDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseDecor"),!!1));W(M.PlantEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantEgg"),!!1));W(M.HatchEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] HatchEgg"),!!1));W(M.PlantGardenPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantGardenPlant"),!!1));W(M.PotPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PotPlant"),!!1));W(M.MutationPotion,(e,t)=>(t.debug&&console.log("[MW][Garden] MutationPotion"),!!1));W(M.PickupDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PickupDecor"),!!1));W(M.PlaceDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PlaceDecor"),!!1));W(M.RemoveGardenObject,(e,t)=>(t.debug&&console.log("[MW][Garden] RemoveGardenObject"),!!1));W(M.MoveInventoryItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveInventoryItem"),!!1));W(M.DropObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] DropObject"),!!1));W(M.PickupObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] PickupObject"),!!1));W(M.ToggleFavoriteItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] ToggleFavoriteItem"),!!1));W(M.PutItemInStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] PutItemInStorage"),!!1));W(M.RetrieveItemFromStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] RetrieveItemFromStorage"),!!1));W(M.MoveStorageItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveStorageItem"),!!1));W(M.LogItems,(e,t)=>(t.debug&&console.log("[MW][Inventory] LogItems"),!!1));W(M.PlacePet,(e,t)=>(t.debug&&console.log("[MW][Pets] PlacePet"),!!1));W(M.FeedPet,(e,t)=>(t.debug&&console.log("[MW][Pets] FeedPet"),!!1));W(M.PetPositions,(e,t)=>(t.debug&&console.log("[MW][Pets] PetPositions"),!!1));W(M.SwapPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SwapPet"),!!1));W(M.StorePet,(e,t)=>(t.debug&&console.log("[MW][Pets] StorePet"),!!1));W(M.NamePet,(e,t)=>(t.debug&&console.log("[MW][Pets] NamePet"),!!1));W(M.SellPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SellPet"),!!1));console.log("[WS] TESTTEST");W(M.SetSelectedGame,(e,t)=>(t.debug&&console.log("[MW][Session] SetSelectedGame"),!!1));W(M.VoteForGame,(e,t)=>(t.debug&&console.log("[MW][Session] VoteForGame"),!!1));W(M.RequestGame,(e,t)=>(t.debug&&console.log("[MW][Session] RequestGame"),!!1));W(M.RestartGame,(e,t)=>(t.debug&&console.log("[MW][Session] RestartGame"),!!1));W(M.Ping,(e,t)=>(t.debug&&console.log("[MW][Session] Ping"),!!1));W(M.PlayerPosition,(e,t)=>(t.debug&&console.log("[MW][Session] PlayerPosition"),!!1));W(M.Teleport,(e,t)=>(t.debug&&console.log("[MW][Session] Teleport"),!!1));W(M.CheckWeatherStatus,(e,t)=>(t.debug&&console.log("[MW][Session] CheckWeatherStatus"),!!1));W(M.Chat,(e,t)=>(t.debug&&console.log("[MW][Social] Chat"),!!1));W(M.Dev,(e,t)=>(t.debug&&console.log("[MW][Social] Dev"),!!1));W(M.Emote,(e,t)=>(t.debug&&console.log("[MW][Social] Emote"),!!1));W(M.Wish,(e,t)=>(t.debug&&console.log("[MW][Social] Wish"),!!1));W(M.KickPlayer,(e,t)=>(t.debug&&console.log("[MW][Social] KickPlayer"),!!1));W(M.ReportSpeakingStart,(e,t)=>(t.debug&&console.log("[MW][Voice] ReportSpeakingStart"),!!1));W(M.SetPlayerData,(e,t)=>(t.debug&&console.log("[MW][Social] SetPlayerData"),!!1));W(M.UsurpHost,(e,t)=>(t.debug&&console.log("[MW][Social] UsurpHost"),!!1));function Zp(e={}){let t=e.pageWindow??P,n=e.pollMs??500,r=!!e.debug,o=[];o.push(As(t,{debug:r})),o.push(Ds({pageWindow:t,middlewares:e.middlewares,debug:r}));let a=null,i=s=>{if(a){try{a()}catch{}a=null}s&&(a=Ns(s,e.handlers,{debug:r,pageWindow:t}))};return i(Jt(t).ws),o.push(Qn(s=>i(s.ws),{intervalMs:n,debug:r,pageWindow:t})),{getWs:()=>Jt(t).ws,dispose:()=>{for(let s=o.length-1;s>=0;s--)try{o[s]()}catch{}if(a){try{a()}catch{}a=null}}}}var Zn=null;function _s(e={}){return Zn||(Zn=Zp(e),Zn)}var em=["visibilitychange","blur","focus","focusout","pagehide","freeze","resume"],U={initialized:!1,listeners:[],savedProps:{hidden:void 0,visibilityState:void 0,hasFocus:null},audioCtx:null,oscillator:null,gainNode:null,heartbeatInterval:null,running:!1};function tm(){let e=(t,n)=>{let r=o=>{o.stopImmediatePropagation(),o.preventDefault?.()};t.addEventListener(n,r,{capture:!0}),U.listeners.push({type:n,handler:r,target:t})};for(let t of em)e(document,t),e(window,t)}function nm(){for(let{type:e,handler:t,target:n}of U.listeners)try{n.removeEventListener(e,t,{capture:!0})}catch{}U.listeners.length=0}function om(){let e=Object.getPrototypeOf(document);U.savedProps.hidden=Object.getOwnPropertyDescriptor(e,"hidden"),U.savedProps.visibilityState=Object.getOwnPropertyDescriptor(e,"visibilityState"),U.savedProps.hasFocus=document.hasFocus?document.hasFocus.bind(document):null;try{Object.defineProperty(e,"hidden",{configurable:!0,get:()=>!1})}catch{}try{Object.defineProperty(e,"visibilityState",{configurable:!0,get:()=>"visible"})}catch{}try{document.hasFocus=()=>!0}catch{}}function rm(){let e=Object.getPrototypeOf(document);try{U.savedProps.hidden&&Object.defineProperty(e,"hidden",U.savedProps.hidden)}catch{}try{U.savedProps.visibilityState&&Object.defineProperty(e,"visibilityState",U.savedProps.visibilityState)}catch{}try{U.savedProps.hasFocus&&(document.hasFocus=U.savedProps.hasFocus)}catch{}}function eo(){U.audioCtx&&U.audioCtx.state!=="running"&&U.audioCtx.resume?.().catch(()=>{})}function am(){try{let e=window.AudioContext||window.webkitAudioContext;U.audioCtx=new e({latencyHint:"interactive"}),U.gainNode=U.audioCtx.createGain(),U.gainNode.gain.value=1e-5,U.oscillator=U.audioCtx.createOscillator(),U.oscillator.frequency.value=1,U.oscillator.connect(U.gainNode).connect(U.audioCtx.destination),U.oscillator.start(),document.addEventListener("visibilitychange",eo,{capture:!0}),window.addEventListener("focus",eo,{capture:!0})}catch{Ws()}}function Ws(){try{U.oscillator?.stop()}catch{}try{U.oscillator?.disconnect(),U.gainNode?.disconnect()}catch{}try{U.audioCtx?.close?.()}catch{}document.removeEventListener("visibilitychange",eo,{capture:!0}),window.removeEventListener("focus",eo,{capture:!0}),U.oscillator=null,U.gainNode=null,U.audioCtx=null}function im(){let e=document.querySelector("canvas")||document.body||document.documentElement;U.heartbeatInterval=window.setInterval(()=>{try{e.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:1,clientY:1}))}catch{}},25e3)}function sm(){U.heartbeatInterval!==null&&(clearInterval(U.heartbeatInterval),U.heartbeatInterval=null)}function lm(){U.initialized||(U.initialized=!0,Bs())}function cm(){return U.initialized}function Bs(){U.initialized&&(U.running||(U.running=!0,om(),tm(),am(),im()))}function um(){U.running&&(U.running=!1,sm(),Ws(),nm(),rm())}function dm(){return U.running}var Xt={init:lm,isReady:cm,start:Bs,stop:um,isRunning:dm};var pm=new Map;function mm(){return pm}function Qt(){return P.jotaiAtomCache?.cache}function Ge(e){let t=mm(),n=t.get(e);if(n)return n;let r=Qt();if(!r)return null;for(let o of r.values())if((o?.debugLabel||o?.label||"")===e)return t.set(e,o),o;return null}var gm={baseStore:null,captureInProgress:!1,captureError:null,lastCapturedVia:null,mirror:void 0};function It(){return gm}var fm="__JOTAI_STORE_READY__",js=!1,hr=new Set;function to(){if(!js){js=!0;for(let e of hr)try{e()}catch{}try{let e=P.CustomEvent||CustomEvent;P.dispatchEvent?.(new e(fm))}catch{}}}function bm(e){hr.add(e);let t=vr();if(t.via&&!t.polyfill)try{e()}catch{}return()=>{hr.delete(e)}}async function no(e={}){let{timeoutMs:t=6e3,intervalMs:n=50}=e,r=vr();if(!(r.via&&!r.polyfill))return new Promise((o,a)=>{let i=!1,s=bm(()=>{i||(i=!0,s(),o())}),u=Date.now();(async()=>{for(;!i&&Date.now()-u<t;){let l=vr();if(l.via&&!l.polyfill){if(i)return;i=!0,s(),o();return}await Zt(n)}i||(i=!0,s(),a(new Error("Store not captured within timeout")))})()})}var Zt=e=>new Promise(t=>setTimeout(t,e));function zs(){try{let e=P.Event||Event;P.dispatchEvent?.(new e("visibilitychange"))}catch{}}function yr(e){return e&&typeof e=="object"&&typeof e.get=="function"&&typeof e.set=="function"&&typeof e.sub=="function"}function br(e,t=0,n=new WeakSet){if(t>3||!e||typeof e!="object"||n.has(e))return null;try{n.add(e)}catch{return null}if(yr(e))return e;let r=["store","value","current","state","s","baseStore"];for(let o of r)try{let a=e[o];if(yr(a))return a}catch{}return null}function Fs(){let e=It(),t=P.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t?.renderers?.size)return null;let n=0;for(let[r]of t.renderers){let o=t.getFiberRoots?.(r);o&&(n+=o.size||0)}if(n===0)return null;for(let[r]of t.renderers){let o=t.getFiberRoots?.(r);if(o)for(let a of o){let i=new Set,s=[a.current];for(;s.length;){let u=s.pop();if(!(!u||i.has(u))){i.add(u);try{let d=u?.pendingProps?.value;if(yr(d))return e.lastCapturedVia="fiber",d}catch{}try{let d=u?.memoizedState,l=0;for(;d&&l<15;){l++;let c=br(d);if(c)return e.lastCapturedVia="fiber",c;let p=br(d.memoizedState);if(p)return e.lastCapturedVia="fiber",p;d=d.next}}catch{}try{if(u?.stateNode){let d=br(u.stateNode);if(d)return e.lastCapturedVia="fiber",d}}catch{}u.child&&s.push(u.child),u.sibling&&s.push(u.sibling),u.alternate&&s.push(u.alternate)}}}}return null}function Us(){return{get:()=>{throw new Error("Store not captured: get unavailable")},set:()=>{throw new Error("Store not captured: set unavailable")},sub:()=>()=>{},__polyfill:!0}}async function hm(e=5e3){let t=Date.now(),n=Qt();for(;!n&&Date.now()-t<e;)await Zt(100),n=Qt();if(!n)throw new Error("jotaiAtomCache.cache not found");let r=It(),o=null,a=null,i=[],s=()=>{for(let d of i)try{d.__origWrite&&(d.write=d.__origWrite,delete d.__origWrite)}catch{}};for(let d of n.values()){if(!d||typeof d.write!="function"||d.__origWrite)continue;let l=d.write;d.__origWrite=l,d.write=function(c,p,...m){return a||(o=c,a=p,s()),l.call(this,c,p,...m)},i.push(d)}zs();let u=Date.now();for(;!a&&Date.now()-u<e;)await Zt(50);return a?(r.lastCapturedVia="write",{get:d=>o(d),set:(d,l)=>a(d,l),sub:(d,l)=>{let c;try{c=o(d)}catch{}let p=setInterval(()=>{let m;try{m=o(d)}catch{return}if(m!==c){c=m;try{l()}catch{}}},100);return()=>clearInterval(p)}}):(s(),r.lastCapturedVia="polyfill",Us())}async function ym(e=1e4){let t=It();zs();let n=Date.now();for(;Date.now()-n<e;){let r=Fs();if(r)return r;await Zt(50)}return t.lastCapturedVia="polyfill",Us()}async function oo(){let e=It();if(e.baseStore&&!e.baseStore.__polyfill)return to(),e.baseStore;if(e.captureInProgress){let t=Date.now(),n=2500;for(;!e.baseStore&&Date.now()-t<n;)await Zt(25);if(e.baseStore)return e.baseStore.__polyfill||to(),e.baseStore}e.captureInProgress=!0;try{let t=Fs();if(t)return e.baseStore=t,to(),t;try{let r=await hm(5e3);return e.baseStore=r,r.__polyfill||to(),r}catch(r){e.captureError=r}let n=await ym();return e.baseStore=n,n}catch(t){throw e.captureError=t,t}finally{e.captureInProgress=!1}}function vr(){let e=It();return{via:e.lastCapturedVia,polyfill:!!e.baseStore?.__polyfill,error:e.captureError}}async function vm(){let e=await oo(),t=new WeakMap,n=async o=>{let a=t.get(o);if(a)return a;a={last:void 0,has:!1,subs:new Set},t.set(o,a);try{a.last=e.get(o),a.has=!0}catch{}let i=e.sub(o,()=>{let s;try{s=e.get(o)}catch{return}let u=a.last,d=!Object.is(s,u)||!a.has;if(a.last=s,a.has=!0,d)for(let l of a.subs)try{l(s,u)}catch{}});return a.unsubUpstream=i,a};return{async get(o){let a=await n(o);if(a.has)return a.last;let i=e.get(o);return a.last=i,a.has=!0,i},async set(o,a){await e.set(o,a);let i=await n(o);i.last=a,i.has=!0},async sub(o,a){let i=await n(o);if(i.subs.add(a),i.has)try{a(i.last,i.last)}catch{}return()=>{i.subs.delete(a)}},getShadow(o){return t.get(o)?.last},hasShadow(o){return!!t.get(o)?.has},async ensureWatch(o){await n(o)},async asStore(){return{get:o=>this.get(o),set:(o,a)=>this.set(o,a),sub:(o,a)=>{let i=null;return this.sub(o,()=>a()).then(s=>i=s),()=>i?.()}}}}}async function en(){let e=It();return e.mirror||(e.mirror=await vm()),e.mirror}var Y={async select(e){let t=await en(),n=Ge(e);if(!n)throw new Error(`[Store] Atom not found: "${e}"`);return t.get(n)},async set(e,t){let n=await en(),r=Ge(e);if(!r)throw new Error(`[Store] Atom not found: "${e}"`);await n.set(r,t)},async subscribe(e,t){let n=await en(),r=Ge(e);if(!r)throw new Error(`[Store] Atom not found: "${e}"`);return n.sub(r,o=>{try{t(o)}catch{}})},async subscribeImmediate(e,t){let n=await Y.select(e);try{t(n)}catch{}return Y.subscribe(e,t)}};async function xr(){await en()}function tn(e){return e?Array.isArray(e)?e.slice():e.split(".").map(t=>t.match(/^\d+$/)?Number(t):t):[]}function Ze(e,t){let n=tn(t),r=e;for(let o of n){if(r==null)return;r=r[o]}return r}function Sr(e,t,n){let r=tn(t);if(!r.length)return n;let o=Array.isArray(e)?[...e]:{...e??{}},a=o;for(let i=0;i<r.length-1;i++){let s=r[i],u=a[s],d=typeof u=="object"&&u!==null?Array.isArray(u)?[...u]:{...u}:{};a[s]=d,a=d}return a[r[r.length-1]]=n,o}function Vs(e,t){let n={};for(let r of t)n[r]=r.includes(".")?Ze(e,r):e?.[r];try{return JSON.stringify(n)}catch{return String(n)}}function wr(e,t,n){let r=n.mode??"auto";function o(d){let l=t?Ze(d,t):d,c=new Map;if(l==null)return{signatures:c,keys:[]};let p=Array.isArray(l);if((r==="array"||r==="auto"&&p)&&p)for(let f=0;f<l.length;f++){let g=l[f],b=n.key?n.key(g,f,d):f,h=n.sig?n.sig(g,f,d):n.fields?Vs(g,n.fields):JSON.stringify(g);c.set(b,h)}else for(let[f,g]of Object.entries(l)){let b=n.key?n.key(g,f,d):f,h=n.sig?n.sig(g,f,d):n.fields?Vs(g,n.fields):JSON.stringify(g);c.set(b,h)}return{signatures:c,keys:Array.from(c.keys())}}function a(d,l){if(d===l)return!0;if(!d||!l||d.size!==l.size)return!1;for(let[c,p]of d)if(l.get(c)!==p)return!1;return!0}async function i(d){let l=null;return Y.subscribeImmediate(e,c=>{let p=t?Ze(c,t):c,{signatures:m}=o(p);if(!a(l,m)){let f=new Set([...l?Array.from(l.keys()):[],...Array.from(m.keys())]),g=[];for(let b of f){let h=l?.get(b)??"__NONE__",S=m.get(b)??"__NONE__";h!==S&&g.push(b)}l=m,d({value:p,changedKeys:g})}})}async function s(d,l){return i(({value:c,changedKeys:p})=>{p.includes(d)&&l({value:c})})}async function u(d,l){let c=new Set(d);return i(({value:p,changedKeys:m})=>{let f=m.filter(g=>c.has(g));f.length&&l({value:p,changedKeys:f})})}return{sub:i,subKey:s,subKeys:u}}var Et=new Map;function xm(e,t){let n=Et.get(e);if(n)try{n()}catch{}return Et.set(e,t),()=>{try{t()}catch{}Et.get(e)===t&&Et.delete(e)}}function ie(e,t={}){let{path:n,write:r="replace"}=t,o=n?`${e}:${tn(n).join(".")}`:e;async function a(){let c=await Y.select(e);return n?Ze(c,n):c}async function i(c){if(typeof r=="function"){let f=await Y.select(e),g=r(c,f);return Y.set(e,g)}let p=await Y.select(e),m=n?Sr(p,n,c):c;return r==="merge-shallow"&&!n&&p&&typeof p=="object"&&typeof c=="object"?Y.set(e,{...p,...c}):Y.set(e,m)}async function s(c){let p=await a(),m=c(p);return await i(m),m}async function u(c,p,m){let f,g=h=>{let S=n?Ze(h,n):h;if(typeof f>"u"||!m(f,S)){let v=f;f=S,p(S,v)}},b=c?await Y.subscribeImmediate(e,g):await Y.subscribe(e,g);return xm(o,b)}function d(){let c=Et.get(o);if(c){try{c()}catch{}Et.delete(o)}}function l(c){return wr(e,c?.path??n,c)}return{label:o,get:a,set:i,update:s,onChange:(c,p=Object.is)=>u(!1,c,p),onChangeNow:(c,p=Object.is)=>u(!0,c,p),asSignature:l,stopOnChange:d}}function x(e){return ie(e)}var Sm=x("positionAtom"),wm=x("lastPositionInMyGardenAtom"),Tm=x("playerDirectionAtom"),km=x("stateAtom"),Cm=x("quinoaDataAtom"),Pm=x("currentTimeAtom"),Am=x("actionAtom"),Mm=x("isPressAndHoldActionAtom"),Im=x("mapAtom"),Em=x("tileSizeAtom"),Lm=ie("mapAtom",{path:"cols"}),Rm=ie("mapAtom",{path:"rows"}),Om=ie("mapAtom",{path:"spawnTiles"}),Dm=ie("mapAtom",{path:"locations.seedShop.spawnTileIdx"}),Hm=ie("mapAtom",{path:"locations.eggShop.spawnTileIdx"}),Gm=ie("mapAtom",{path:"locations.toolShop.spawnTileIdx"}),Nm=ie("mapAtom",{path:"locations.decorShop.spawnTileIdx"}),_m=ie("mapAtom",{path:"locations.sellCropsShop.spawnTileIdx"}),Wm=ie("mapAtom",{path:"locations.sellPetShop.spawnTileIdx"}),Bm=ie("mapAtom",{path:"locations.collectorsClub.spawnTileIdx"}),jm=ie("mapAtom",{path:"locations.wishingWell.spawnTileIdx"}),zm=ie("mapAtom",{path:"locations.shopsCenter.spawnTileIdx"}),Fm=x("playerAtom"),Um=x("myDataAtom"),Vm=x("myUserSlotIdxAtom"),$m=x("isSpectatingAtom"),Km=x("myCoinsCountAtom"),qm=x("numPlayersAtom"),Jm=ie("playerAtom",{path:"id"}),Ym=x("userSlotsAtom"),Xm=x("filteredUserSlotsAtom"),Qm=x("myUserSlotAtom"),Zm=x("spectatorsAtom"),eg=ie("stateAtom",{path:"child"}),tg=ie("stateAtom",{path:"child.data"}),ng=ie("stateAtom",{path:"child.data.shops"}),Tr=ie("stateAtom",{path:"child.data.userSlots"}),kr=ie("stateAtom",{path:"data.players"}),Cr=ie("stateAtom",{path:"data.hostPlayerId"}),og=x("myInventoryAtom"),rg=x("myInventoryItemsAtom"),ag=x("isMyInventoryAtMaxLengthAtom"),ig=x("myFavoritedItemIdsAtom"),sg=x("myCropInventoryAtom"),lg=x("mySeedInventoryAtom"),cg=x("myToolInventoryAtom"),ug=x("myEggInventoryAtom"),dg=x("myDecorInventoryAtom"),pg=x("myPetInventoryAtom"),mg=ie("myInventoryAtom",{path:"favoritedItemIds"}),gg=x("itemTypeFiltersAtom"),fg=x("myItemStoragesAtom"),bg=x("myPetHutchStoragesAtom"),hg=x("myPetHutchItemsAtom"),yg=x("myPetHutchPetItemsAtom"),vg=x("myNumPetHutchItemsAtom"),xg=x("myValidatedSelectedItemIndexAtom"),Sg=x("isSelectedItemAtomSuspended"),wg=x("mySelectedItemAtom"),Tg=x("mySelectedItemNameAtom"),kg=x("mySelectedItemRotationsAtom"),Cg=x("mySelectedItemRotationAtom"),Pg=x("setSelectedIndexToEndAtom"),Ag=x("myPossiblyNoLongerValidSelectedItemIndexAtom"),Mg=x("myCurrentGlobalTileIndexAtom"),Ig=x("myCurrentGardenTileAtom"),Eg=x("myCurrentGardenObjectAtom"),Lg=x("myOwnCurrentGardenObjectAtom"),Rg=x("myOwnCurrentDirtTileIndexAtom"),Og=x("myCurrentGardenObjectNameAtom"),Dg=x("isInMyGardenAtom"),Hg=x("myGardenBoardwalkTileObjectsAtom"),Pr=ie("myDataAtom",{path:"garden"}),Gg=ie("myDataAtom",{path:"garden.tileObjects"}),Ng=ie("myOwnCurrentGardenObjectAtom",{path:"objectType"}),_g=x("myCurrentStablePlantObjectInfoAtom"),Wg=x("myCurrentSortedGrowSlotIndicesAtom"),Bg=x("myCurrentGrowSlotIndexAtom"),jg=x("myCurrentGrowSlotsAtom"),zg=x("myCurrentGrowSlotAtom"),Fg=x("secondsUntilCurrentGrowSlotMaturesAtom"),Ug=x("isCurrentGrowSlotMatureAtom"),Vg=x("numGrowSlotsAtom"),$g=x("myCurrentEggAtom"),Kg=x("petInfosAtom"),qg=x("myPetInfosAtom"),Jg=x("myPetSlotInfosAtom"),Yg=x("myPrimitivePetSlotsAtom"),Xg=x("myNonPrimitivePetSlotsAtom"),Qg=x("expandedPetSlotIdAtom"),Zg=x("myPetsProgressAtom"),ef=x("myActiveCropMutationPetsAtom"),tf=x("totalPetSellPriceAtom"),nf=x("selectedPetHasNewVariantsAtom"),Ar=x("shopsAtom"),Mr=x("myShopPurchasesAtom"),of=x("seedShopAtom"),rf=x("seedShopInventoryAtom"),af=x("seedShopRestockSecondsAtom"),sf=x("seedShopCustomRestockInventoryAtom"),lf=x("eggShopAtom"),cf=x("eggShopInventoryAtom"),uf=x("eggShopRestockSecondsAtom"),df=x("eggShopCustomRestockInventoryAtom"),pf=x("toolShopAtom"),mf=x("toolShopInventoryAtom"),gf=x("toolShopRestockSecondsAtom"),ff=x("toolShopCustomRestockInventoryAtom"),bf=x("decorShopAtom"),hf=x("decorShopInventoryAtom"),yf=x("decorShopRestockSecondsAtom"),vf=x("decorShopCustomRestockInventoryAtom"),xf=x("isDecorShopAboutToRestockAtom"),Sf=ie("shopsAtom",{path:"seed"}),wf=ie("shopsAtom",{path:"tool"}),Tf=ie("shopsAtom",{path:"egg"}),kf=ie("shopsAtom",{path:"decor"}),Cf=x("myCropItemsAtom"),Pf=x("myCropItemsToSellAtom"),Af=x("totalCropSellPriceAtom"),Mf=x("friendBonusMultiplierAtom"),If=x("myJournalAtom"),Ef=x("myCropJournalAtom"),Lf=x("myPetJournalAtom"),Rf=x("myStatsAtom"),Of=x("myActivityLogsAtom"),Df=x("newLogsAtom"),Hf=x("hasNewLogsAtom"),Gf=x("newCropLogsFromSellingAtom"),Nf=x("hasNewCropLogsFromSellingAtom"),_f=x("myCompletedTasksAtom"),Wf=x("myActiveTasksAtom"),Bf=x("isWelcomeToastVisibleAtom"),jf=x("shouldCloseWelcomeToastAtom"),zf=x("isInitialMoveToDirtPatchToastVisibleAtom"),Ff=x("isFirstPlantSeedActiveAtom"),Uf=x("isThirdSeedPlantActiveAtom"),Vf=x("isThirdSeedPlantCompletedAtom"),$f=x("isDemoTouchpadVisibleAtom"),Kf=x("areShopAnnouncersEnabledAtom"),qf=x("arePresentablesEnabledAtom"),Jf=x("isEmptyDirtTileHighlightedAtom"),Yf=x("isPlantTileHighlightedAtom"),Xf=x("isItemHiglightedInHotbarAtom"),Qf=x("isItemHighlightedInModalAtom"),Zf=x("isMyGardenButtonHighlightedAtom"),eb=x("isSellButtonHighlightedAtom"),tb=x("isShopButtonHighlightedAtom"),nb=x("isInstaGrowButtonHiddenAtom"),ob=x("isActionButtonHighlightedAtom"),rb=x("isGardenItemInfoCardHiddenAtom"),ab=x("isSeedPurchaseButtonHighlightedAtom"),ib=x("isFirstSeedPurchaseActiveAtom"),sb=x("isFirstCropHarvestActiveAtom"),lb=x("isWeatherStatusHighlightedAtom"),Ir=x("weatherAtom"),ro=x("activeModalAtom"),cb=x("hotkeyBeingPressedAtom"),ub=x("avatarTriggerAnimationAtom"),db=x("avatarDataAtom"),pb=x("emoteDataAtom"),mb=x("otherUserSlotsAtom"),gb=x("otherPlayerPositionsAtom"),fb=x("otherPlayerSelectedItemsAtom"),bb=x("otherPlayerLastActionsAtom"),hb=x("traderBunnyPlayerId"),yb=x("npcPlayersAtom"),vb=x("npcQuinoaUsersAtom"),xb=x("numNpcAvatarsAtom"),Sb=x("traderBunnyEmoteTimeoutAtom"),wb=x("traderBunnyEmoteAtom"),Tb=x("unsortedLeaderboardAtom"),kb=x("currentGardenNameAtom"),Cb=x("quinoaEngineAtom"),Pb=x("quinoaInitializationErrorAtom"),Ab=x("avgPingAtom"),Mb=x("serverClientTimeOffsetAtom"),Ib=x("isEstablishingShotRunningAtom"),Eb=x("isEstablishingShotCompleteAtom");var Z={initialized:!1,activeModal:null,isCustom:!1,shadow:null,patchedAtoms:new Set,originalReads:new Map,unsubscribes:[],listeners:{onOpen:new Set,onClose:new Set}};function nn(){return Z}function $s(){return Z.initialized}function Be(){return Z.isCustom&&Z.activeModal!==null}function je(){return Z.activeModal}function Er(e){return!Z.shadow||Z.shadow.modal!==e?null:Z.shadow.data}function Ks(e){Z.initialized=e}function ao(e){Z.activeModal=e}function io(e){Z.isCustom=e}function Lr(e,t){Z.shadow={modal:e,data:t,timestamp:Date.now()}}function Rr(){Z.shadow=null}function Or(e,t){Z.patchedAtoms.add(e),Z.originalReads.set(e,t)}function qs(e){return Z.originalReads.get(e)}function so(e){return Z.patchedAtoms.has(e)}function Js(e){Z.patchedAtoms.delete(e),Z.originalReads.delete(e)}function Ys(e){Z.unsubscribes.push(e)}function Lb(){for(let e of Z.unsubscribes)try{e()}catch{}Z.unsubscribes.length=0}function Xs(e){return Z.listeners.onOpen.add(e),()=>Z.listeners.onOpen.delete(e)}function lo(e){return Z.listeners.onClose.add(e),()=>Z.listeners.onClose.delete(e)}function Dr(e){for(let t of Z.listeners.onOpen)try{t(e)}catch{}}function co(e){for(let t of Z.listeners.onClose)try{t(e)}catch{}}function Qs(){Lb(),Z.initialized=!1,Z.activeModal=null,Z.isCustom=!1,Z.shadow=null,Z.patchedAtoms.clear(),Z.originalReads.clear(),Z.listeners.onOpen.clear(),Z.listeners.onClose.clear()}var uo={inventory:{atoms:[{atomLabel:"myInventoryAtom",dataKey:"_full",transform:e=>{let t=e;return{items:t.items??[],storages:t.storages??[],favoritedItemIds:t.favoritedItemIds??[]}}}],derivedAtoms:[{atomLabel:"myCropInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Produce"):[]},{atomLabel:"mySeedInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Seed"):[]},{atomLabel:"myToolInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Tool"):[]},{atomLabel:"myEggInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Egg"):[]},{atomLabel:"myDecorInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Decor"):[]},{atomLabel:"myPetInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Pet"):[]}]},journal:{atoms:[{atomLabel:"myJournalAtom",dataKey:"_full"}],derivedAtoms:[{atomLabel:"myCropJournalAtom",sourceKey:"produce",deriveFn:e=>e??{}},{atomLabel:"myPetJournalAtom",sourceKey:"pets",deriveFn:e=>e??{}}]},stats:{atoms:[{atomLabel:"myStatsAtom",dataKey:"_full"}]},activityLog:{atoms:[{atomLabel:"myActivityLogsAtom",dataKey:"logs"}]},seedShop:{atoms:[{atomLabel:"seedShopInventoryAtom",dataKey:"inventory"},{atomLabel:"seedShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},eggShop:{atoms:[{atomLabel:"eggShopInventoryAtom",dataKey:"inventory"},{atomLabel:"eggShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},toolShop:{atoms:[{atomLabel:"toolShopInventoryAtom",dataKey:"inventory"},{atomLabel:"toolShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},decorShop:{atoms:[{atomLabel:"decorShopInventoryAtom",dataKey:"inventory"},{atomLabel:"decorShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},leaderboard:{atoms:[{atomLabel:"unsortedLeaderboardAtom",dataKey:"entries"}]},petHutch:{atoms:[{atomLabel:"myPetHutchItemsAtom",dataKey:"items"},{atomLabel:"myPetHutchPetItemsAtom",dataKey:"petItems"}]}};function Hr(e){return uo[e]}function Zs(e){let t=uo[e],n=[];for(let r of t.atoms)n.push(r.atomLabel);if(t.derivedAtoms)for(let r of t.derivedAtoms)n.push(r.atomLabel);return n}var Rb=new Set(["inventory","journal","stats","activityLog","petHutch"]),Ob=new Set(["seedShop","eggShop","toolShop","decorShop"]),Db=new Set(["leaderboard"]);function Hb(e,t,n,r){return function(a){let i=Be(),s=je();if(i&&s===r){let u=Er(r);if(u!==null){let d;if(n.dataKey==="_full"?d=u:d=u[n.dataKey],d!==void 0)return t(a),n.transform?n.transform(d):d}}return t(a)}}function Gb(e,t,n,r,o){return function(i){if(Be()&&je()===o){let s=Er(o);if(s!==null){let u=s[n];if(u!==void 0)return t(i),r(u)}}return t(i)}}function tl(e){let t=Hr(e);for(let n of t.atoms){let r=Ge(n.atomLabel);if(!r||so(n.atomLabel))continue;let o=r.read;if(typeof o!="function")continue;let a=Hb(n.atomLabel,o,n,e);r.read=a,Or(n.atomLabel,o)}if(t.derivedAtoms)for(let n of t.derivedAtoms){let r=Ge(n.atomLabel);if(!r||so(n.atomLabel))continue;let o=r.read;if(typeof o!="function")continue;let a=Gb(n.atomLabel,o,n.sourceKey,n.deriveFn,e);r.read=a,Or(n.atomLabel,o)}}async function on(e){let t=Hr(e);for(let r of t.atoms)el(r.atomLabel);if(t.derivedAtoms)for(let r of t.derivedAtoms)el(r.atomLabel);let n=await oo();await ol(n,e)}async function nl(e){let t=await oo();await ol(t,e);let n=Zs(e);for(let r of n){let o=Ge(r);if(o)try{t.get(o)}catch{}}}function el(e){if(!so(e))return;let t=Ge(e),n=qs(e);t&&n&&(t.read=n),Js(e)}async function ol(e,t){let n=Rb.has(t),r=Ob.has(t),o=Db.has(t);if(!n&&!r&&!o)return;let a=Ge("stateAtom");if(a)try{let i=e.get(a);if(!i||typeof i!="object")return;let s=null;if(n||r){let u=i.child,d=u?.data;if(u&&d&&typeof d=="object"){let l=null;if(n&&Array.isArray(d.userSlots)){let c=d.userSlots.map(p=>{if(!p||typeof p!="object")return p;let m=p,f=m.data,g=f&&typeof f=="object"?{...f}:f;return{...m,data:g}});l={...l??d,userSlots:c}}if(r&&d.shops&&typeof d.shops=="object"&&(l={...l??d,shops:{...d.shops}}),l){let c={...u,data:l};s={...i,child:c}}}}if(o){let u=i.data;if(u&&Array.isArray(u.players)){let d={...u,players:[...u.players]};s={...s??i,data:d}}}if(!s)return;await e.set(a,s)}catch{}}async function rl(){for(let e of Object.keys(uo))await on(e)}var po=null,rn=null;async function al(){if(nn().initialized)return;rn=await Y.select("activeModalAtom"),po=setInterval(async()=>{try{let n=await Y.select("activeModalAtom"),r=rn;r!==n&&(rn=n,Nb(n,r))}catch{}},50),Ys(()=>{po&&(clearInterval(po),po=null)}),Ks(!0)}function Nb(e,t){let n=Be(),r=je();e===null&&t!==null&&(n&&r===t?_b("native"):n||co({modal:t,wasCustom:!1,closedBy:"native"})),e!==null&&!n&&Dr({modal:e,isCustom:!1})}async function _b(e){let t=je();t&&(Rr(),io(!1),ao(null),await on(t),co({modal:t,wasCustom:!0,closedBy:e}))}async function il(e,t){if(!nn().initialized)throw new Error("[MGCustomModal] Not initialized. Call init() first.");Be()&&await Gr(),Lr(e,t),io(!0),ao(e),tl(e),await nl(e),await ro.set(e),rn=e,Dr({modal:e,isCustom:!0})}function sl(e,t){let n=nn();if(!n.isCustom||n.activeModal!==e||!n.shadow)return;let o={...n.shadow.data,...t};Lr(e,o)}async function Gr(){let e=nn();if(!e.isCustom||!e.activeModal)return;let t=e.activeModal;Rr(),io(!1),ao(null),await ro.set(null),rn=null,await on(t),co({modal:t,wasCustom:!0,closedBy:"api"})}function ll(){return new Promise(e=>{if(!Be()){e();return}let t=lo(()=>{t(),e()})})}async function cl(){if(Be()){let e=je();e&&await on(e)}await rl(),Qs()}var an={async init(){return al()},isReady(){return $s()},async show(e,t){return il(e,t)},update(e,t){return sl(e,t)},async close(){return Gr()},isOpen(){return je()!==null},isCustomOpen(){return Be()},getActiveModal(){return je()},waitForClose(){return ll()},onOpen(e){return Xs(e)},onClose(e){return lo(e)},destroy(){return cl()}};$e();var mo=null,Ne={ready:!1,xform:null,xformAt:0};function Rt(e){try{if(typeof structuredClone=="function")return structuredClone(e)}catch{}try{return JSON.parse(JSON.stringify(e))}catch{}return e}function sn(){return Te.tos()}function Wr(){return Te.engine()}function Wb(){let e=sn()?.map?.cols;return Number.isFinite(e)&&e>0?e:null}function Br(e,t){let n=Wb();return n?t*n+e|0:null}function dt(e,t,n=!0){let r=sn(),o=Br(e,t);if(!r||o==null)return{gidx:null,tv:null};let a=r.tileViews?.get?.(o)||null;if(!a&&n&&typeof r.getOrCreateTileView=="function")try{a=r.getOrCreateTileView(o)}catch{}return{gidx:o,tv:a||null}}function Lt(e,t,n,r={}){let o=r.ensureView!==!1,a=r.forceUpdate!==!1,i=Wr(),{gidx:s,tv:u}=dt(Number(e),Number(t),o);if(s==null)throw new Error("MGTile: cols unavailable (engine/TOS not ready)");if(!u)throw new Error("MGTile: TileView unavailable (not instantiated)");let d=u.tileObject;if(typeof u.onDataChanged!="function")throw new Error("MGTile: tileView.onDataChanged not found (different API?)");if(u.onDataChanged(n),a&&i?.reusableContext&&typeof u.update=="function")try{u.update(i.reusableContext)}catch{}return{ok:!0,tx:Number(e),ty:Number(t),gidx:s,before:d,after:u.tileObject}}function jr(e,t){if(!e)throw new Error("MGTile: no tileObject on this tile");if(e.objectType!==t)throw new Error(`MGTile: expected objectType "${t}", got "${e.objectType}"`)}function Nr(e,t){if("startTime"in t&&(e.startTime=Number(t.startTime)),"endTime"in t&&(e.endTime=Number(t.endTime)),"targetScale"in t&&(e.targetScale=Number(t.targetScale)),"mutations"in t){if(!Array.isArray(t.mutations))throw new Error("MGTile: mutations must be an array of strings");e.mutations=t.mutations.slice()}}function qe(){if(!Ne.ready)throw new Error("MGTile: not ready. Call MGTile.init() first.")}function _r(e){if(!e)return null;let t=o=>o&&(typeof o.getGlobalPosition=="function"||typeof o.toGlobal=="function"),n=["container","root","view","tile","ground","base","floor","bg","background","baseSprite","tileSprite","displayObject","gfx","graphics","sprite"];for(let o of n)if(t(e[o]))return e[o];if(t(e))return e;let r=[e.container,e.root,e.view,e.displayObject,e.tileSprite,e.gfx,e.graphics,e.sprite];for(let o of r)if(t(o))return o;try{for(let o of Object.keys(e))if(t(e[o]))return e[o]}catch{}return null}function go(e){let t=ke(()=>e?.getGlobalPosition?.());if(t&&Number.isFinite(t.x)&&Number.isFinite(t.y))return{x:t.x,y:t.y};let n=ke(()=>e?.toGlobal?.({x:0,y:0}));return n&&Number.isFinite(n.x)&&Number.isFinite(n.y)?{x:n.x,y:n.y}:null}function Bb(e){try{if(!e?.getBounds)return"center";let t=e.getBounds(),n=go(e);if(!n||!t||!Number.isFinite(t.width)||!Number.isFinite(t.height))return"center";let r=t.x+t.width/2,o=t.y+t.height/2;return Math.hypot(n.x-r,n.y-o)<Math.hypot(n.x-t.x,n.y-t.y)?"center":"topleft"}catch{return"center"}}function jb(){let e=sn(),t=e?.map?.cols,n=e?.map?.rows;if(!e||!Number.isFinite(t)||t<=1)return null;let r=Number.isFinite(n)&&n>1?n:null,o=[[0,0],[1,1],[Math.min(2,t-2),0],[0,1]];r&&r>2&&o.push([Math.floor(t/2),Math.floor(r/2)]);for(let[a,i]of o){if(a<0||i<0||a>=t||r&&i>=r)continue;let s=dt(a,i,!0).tv,u=a+1<t?dt(a+1,i,!0).tv:null,d=dt(a,i+1,!0).tv,l=_r(s),c=_r(u),p=_r(d);if(!l||!c||!p)continue;let m=go(l),f=go(c),g=go(p);if(!m||!f||!g)continue;let b={x:f.x-m.x,y:f.y-m.y},h={x:g.x-m.x,y:g.y-m.y},S=b.x*h.y-b.y*h.x;if(!Number.isFinite(S)||Math.abs(S)<1e-6)continue;let v=1/S,y={a:h.y*v,b:-h.x*v,c:-b.y*v,d:b.x*v},k={x:m.x-a*b.x-i*h.x,y:m.y-a*b.y-i*h.y},T=Bb(l),A=T==="center"?k:{x:k.x+.5*(b.x+h.x),y:k.y+.5*(b.y+h.y)};return{ok:!0,cols:t,rows:r,vx:b,vy:h,inv:y,anchorMode:T,originCenter:A}}return null}async function zb(e=15e3){return Ne.ready?!0:mo||(mo=(async()=>{if(await Te.init(e),!sn())throw new Error("MGTile: engine captured but tileObject system not found");return Ne.ready=!0,!0})(),mo)}function Fb(){return Te.hook()}function fo(e,t,n={}){qe();let r=n.ensureView!==!1,o=n.clone!==!1,{gidx:a,tv:i}=dt(Number(e),Number(t),r);if(a==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!i)return{tx:Number(e),ty:Number(t),gidx:a,tileView:null,tileObject:void 0};let s=i.tileObject;return{tx:Number(e),ty:Number(t),gidx:a,tileView:i,tileObject:o?Rt(s):s}}function Ub(e,t,n={}){return qe(),Lt(e,t,null,n)}function Vb(e,t,n,r={}){qe();let a=fo(e,t,{...r,clone:!1}).tileView?.tileObject;jr(a,"plant");let i=Rt(a);if(Array.isArray(i.slots)||(i.slots=[]),"plantedAt"in n&&(i.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(i.maturedAt=Number(n.maturedAt)),"species"in n&&(i.species=String(n.species)),"slotIdx"in n&&"slotPatch"in n){let s=Number(n.slotIdx)|0;if(!i.slots[s])throw new Error(`MGTile: plant slot ${s} doesn't exist`);return Nr(i.slots[s],n.slotPatch),Lt(e,t,i,r)}if("slots"in n){let s=n.slots;if(Array.isArray(s)){for(let u=0;u<s.length;u++)if(s[u]!=null){if(!i.slots[u])throw new Error(`MGTile: plant slot ${u} doesn't exist`);Nr(i.slots[u],s[u])}}else if(s&&typeof s=="object")for(let u of Object.keys(s)){let d=Number(u)|0;if(Number.isFinite(d)){if(!i.slots[d])throw new Error(`MGTile: plant slot ${d} doesn't exist`);Nr(i.slots[d],s[d])}}else throw new Error("MGTile: patch.slots must be array or object map");return Lt(e,t,i,r)}return Lt(e,t,i,r)}function $b(e,t,n,r={}){qe();let a=fo(e,t,{...r,clone:!1}).tileView?.tileObject;jr(a,"decor");let i=Rt(a);return"rotation"in n&&(i.rotation=Number(n.rotation)),Lt(e,t,i,r)}function Kb(e,t,n,r={}){qe();let a=fo(e,t,{...r,clone:!1}).tileView?.tileObject;jr(a,"egg");let i=Rt(a);return"plantedAt"in n&&(i.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(i.maturedAt=Number(n.maturedAt)),Lt(e,t,i,r)}function qb(e,t,n,r={}){qe();let o=r.ensureView!==!1,a=r.forceUpdate!==!1,i=Wr(),{gidx:s,tv:u}=dt(Number(e),Number(t),o);if(s==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!u)throw new Error("MGTile: TileView unavailable");let d=u.tileObject,l=typeof n=="function"?n(Rt(d)):n;if(u.onDataChanged(l),a&&i?.reusableContext&&typeof u.update=="function")try{u.update(i.reusableContext)}catch{}return{ok:!0,tx:Number(e),ty:Number(t),gidx:s,before:d,after:u.tileObject}}function Jb(e,t,n={}){qe();let r=n.ensureView!==!1,{gidx:o,tv:a}=dt(Number(e),Number(t),r);if(o==null)throw new Error("MGTile: cols unavailable");if(!a)return{ok:!0,tx:Number(e),ty:Number(t),gidx:o,tv:null,tileObject:void 0};let i=n.clone!==!1,s=a.tileObject;return{ok:!0,tx:Number(e),ty:Number(t),gidx:o,objectType:s?.objectType??null,tileObject:i?Rt(s):s,tvKeys:Object.keys(a||{}).sort(),tileView:a}}function ul(){return qe(),Ne.xform=jb(),Ne.xformAt=Date.now(),{ok:!!Ne.xform?.ok,xform:Ne.xform}}function Yb(e,t={}){if(qe(),!e||!Number.isFinite(e.x)||!Number.isFinite(e.y))return null;let n=Number.isFinite(t.maxAgeMs)?Number(t.maxAgeMs):1500;(!Ne.xform?.ok||t.forceRebuild||Date.now()-Ne.xformAt>n)&&ul();let r=Ne.xform;if(!r?.ok)return null;let o=e.x-r.originCenter.x,a=e.y-r.originCenter.y,i=r.inv.a*o+r.inv.b*a,s=r.inv.c*o+r.inv.d*a,u=Math.floor(i),d=Math.floor(s),l=[[u,d],[u+1,d],[u,d+1],[u+1,d+1]],c=null,p=1/0;for(let[m,f]of l){if(m<0||f<0||m>=r.cols||Number.isFinite(r.rows)&&r.rows!==null&&f>=r.rows)continue;let g=r.originCenter.x+m*r.vx.x+f*r.vy.x,b=r.originCenter.y+m*r.vx.y+f*r.vy.y,h=(e.x-g)**2+(e.y-b)**2;h<p&&(p=h,c={tx:m,ty:f,fx:i,fy:s,x:e.x,y:e.y,gidx:null})}return c?(c.gidx=Br(c.tx,c.ty),c):null}function Xb(){return["MGTile.init()","MGTile.hook()","MGTile.getTileObject(tx,ty) / inspect(tx,ty)","MGTile.setTileEmpty(tx,ty)","MGTile.setTilePlant(tx,ty,{...}) / setTileDecor / setTileEgg","MGTile.setTileObjectRaw(tx,ty,objOrFn)","MGTile.rebuildTransform() / pointToTile({x,y})"].join(`
`)}var ze={init:zb,ready:()=>Ne.ready,hook:Fb,engine:()=>Wr(),tos:()=>sn(),gidx:(e,t)=>Br(Number(e),Number(t)),getTileObject:fo,inspect:Jb,setTileEmpty:Ub,setTilePlant:Vb,setTileDecor:$b,setTileEgg:Kb,setTileObjectRaw:qb,rebuildTransform:ul,pointToTile:Yb,help:Xb};$e();var B={ready:!1,app:null,renderer:null,stage:null,ticker:null,tileSets:new Map,highlights:new Map,watches:new Map,fades:new Map,fadeWatches:new Map},$r=e=>!!e&&typeof e=="object"&&!Array.isArray(e),zr=e=>!!(e&&typeof e.getBounds=="function"&&("parent"in e||"children"in e)),ho=e=>!!(e&&typeof e.tint=="number"),pt=e=>!!(e&&typeof e.alpha=="number");function bo(e,t,n){return e+(t-e)*n}function Qb(e,t,n){let r=e>>16&255,o=e>>8&255,a=e&255,i=t>>16&255,s=t>>8&255,u=t&255,d=bo(r,i,n)|0,l=bo(o,s,n)|0,c=bo(a,u,n)|0;return d<<16|l<<8|c}function Zb(e,t=900){let n=[],r=[e];for(;r.length&&n.length<t;){let o=r.pop();if(!o)continue;ho(o)&&n.push(o);let a=o.children;if(Array.isArray(a))for(let i=a.length-1;i>=0;i--)r.push(a[i])}return n}function eh(e,t=25e3){let n=[],r=[e],o=0;for(;r.length&&o++<t;){let a=r.pop();if(!a)continue;pt(a)&&n.push(a);let i=a.children;if(Array.isArray(i))for(let s=i.length-1;s>=0;s--)r.push(i[s])}return n}function dl(e){if(!Array.isArray(e))return[];let t=new Set,n=[];for(let r of e){let o,a;if(Array.isArray(r))o=r[0],a=r[1];else if($r(r))o=r.x??r.tx,a=r.y??r.ty;else continue;if(o=Number(o),a=Number(a),!Number.isFinite(o)||!Number.isFinite(a))continue;o|=0,a|=0;let i=`${o},${a}`;t.has(i)||(t.add(i),n.push({x:o,y:a}))}return n}function th(e,t){let n=String(e||"").trim();if(!n)throw new Error("MGPixi.defineTileSet: empty name");let r=dl(t);return B.tileSets.set(n,r),{ok:!0,name:n,count:r.length}}function nh(e){return B.tileSets.delete(String(e||"").trim())}function oh(){return Array.from(B.tileSets.keys()).sort((e,t)=>e.localeCompare(t))}function pl(e){return!!(e&&(e.tileSet!=null||Array.isArray(e.tiles)))}function Kr(e){let n=ze.tos?.()?.tileViews;if(!n?.entries)throw new Error("MGPixi: TOS.tileViews not found");if(!pl(e))return{entries:Array.from(n.entries()),gidxSet:null};let r=[];if(e.tileSet!=null){let a=String(e.tileSet||"").trim(),i=B.tileSets.get(a);if(!i)throw new Error(`MGPixi: tileSet not found "${a}"`);r=i}else r=dl(e.tiles||[]);let o=new Map;for(let a of r){let i=ze.getTileObject(a.x,a.y,{ensureView:!0,clone:!1});i?.tileView&&i.gidx!=null&&o.set(i.gidx,i.tileView)}return{entries:Array.from(o.entries()),gidxSet:new Set(o.keys())}}function qr(e){let t=B.highlights.get(e);if(!t)return!1;ke(()=>B.ticker?.remove(t.tick)),t.root&&t.baseAlpha!=null&&pt(t.root)&&ke(()=>{t.root.alpha=t.baseAlpha});for(let n of t.tint)n.o&&ho(n.o)&&ke(()=>{n.o.tint=n.baseTint});return B.highlights.delete(e),!0}function ml(e=null){for(let t of Array.from(B.highlights.keys()))e&&!String(t).startsWith(e)||qr(t);return!0}function gl(e,t={}){if(mt(),!zr(e))throw new Error("MGPixi.highlightPulse: invalid root");let n=String(t.key||`hl:${Math.random().toString(16).slice(2)}`);if(B.highlights.has(n))return n;let r=pt(e)?Number(e.alpha):null,o=Me(Number(t.minAlpha??.12),0,1),a=Me(Number(t.maxAlpha??1),0,1),i=Number(t.speed??1.25),s=(t.tint??8386303)>>>0,u=Me(Number(t.tintMix??.85),0,1),d=t.deepTint!==!1,l=[];if(d)for(let m of Zb(e))l.push({o:m,baseTint:m.tint});else ho(e)&&l.push({o:e,baseTint:e.tint});let c=performance.now(),p=()=>{let m=(performance.now()-c)/1e3,f=(Math.sin(m*Math.PI*2*i)+1)/2,g=f*f*(3-2*f);r!=null&&pt(e)&&(e.alpha=Me(bo(o,a,g)*r,0,1));let b=g*u;for(let h of l)h.o&&ho(h.o)&&(h.o.tint=Qb(h.baseTint,s,b))};return B.ticker?.add(p),B.highlights.set(n,{root:e,tick:p,baseAlpha:r,tint:l}),n}var rh=["plantVisual","cropVisual","slotVisual","slotView","displayObject","view","container","root","sprite","gfx","graphics"];function Fr(e){if(!e)return null;if(zr(e))return e;if(!$r(e))return null;for(let t of rh){let n=e[t];if(zr(n))return n}return null}function ah(e,t){let n=[{o:e,d:0}],r=new Set,o=6;for(;n.length;){let{o:a,d:i}=n.shift();if(!(!a||i>o)&&!r.has(a)){if(r.add(a),Array.isArray(a)){if(a.length===t){let s=new Array(t),u=!0;for(let d=0;d<t;d++){let l=Fr(a[d]);if(!l){u=!1;break}s[d]=l}if(u)return s}for(let s of a)n.push({o:s,d:i+1});continue}if($r(a)){let s=a;for(let u of Object.keys(s))n.push({o:s[u],d:i+1})}}}return null}function ih(e,t){let n=e?.mutations;if(!Array.isArray(n))return!1;for(let r of n)if(String(r||"").toLowerCase()===t)return!0;return!1}function fl(e,t={}){mt();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.highlightMutation: empty mutation");let{entries:r,gidxSet:o}=Kr(t),a=`hlmut:${n}:`;if(t.clear===!0)if(!o)ml(a);else for(let c of Array.from(B.highlights.keys())){if(!c.startsWith(a))continue;let p=c.split(":"),m=Number(p[2]);o.has(m)&&qr(c)}let i={tint:(t.tint??8386303)>>>0,minAlpha:Number(t.minAlpha??.12),maxAlpha:Number(t.maxAlpha??1),speed:Number(t.speed??1.25),tintMix:Number(t.tintMix??.85),deepTint:t.deepTint!==!1},s=0,u=0,d=0,l=0;for(let[c,p]of r){let m=p?.tileObject;if(!m||m.objectType!=="plant")continue;let f=m.slots;if(!Array.isArray(f)||f.length===0)continue;let g=!1,b=[];for(let v=0;v<f.length;v++)ih(f[v],n)&&(b.push(v),g=!0);if(!g)continue;s++,u+=b.length;let h=p?.childView?.plantVisual||p?.childView||p,S=ah(h,f.length);if(!S){l+=b.length;continue}for(let v of b){let y=S[v];if(!y){l++;continue}let k=`${a}${c}:${v}`;B.highlights.has(k)||(gl(y,{key:k,...i}),d++)}}return{ok:!0,mutation:n,filtered:!!o,plantsMatched:s,matchedSlots:u,newHighlights:d,failedSlots:l}}function sh(e,t={}){mt();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchMutation: empty mutation");let r=`watchmut:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,o=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,a=B.watches.get(r);a&&clearInterval(a);let i=setInterval(()=>{ke(()=>fl(n,{...t,clear:!1}))},o);return B.watches.set(r,i),{ok:!0,key:r,mutation:n,intervalMs:o}}function lh(e){let t=String(e||"").trim();if(!t)return!1;if(!t.startsWith("watchmut:")){let r=t.toLowerCase(),o=0;for(let[a,i]of Array.from(B.watches.entries()))a.startsWith(`watchmut:${r}:`)&&(clearInterval(i),B.watches.delete(a),o++);return o>0}let n=B.watches.get(t);return n?(clearInterval(n),B.watches.delete(t),!0):!1}function ch(e){let t=Array.isArray(e?.slots)?e.slots:[];return{objectType:"plant",species:e?.species??null,plantedAt:e?.plantedAt??null,maturedAt:e?.maturedAt??null,slotCount:t.length,slots:t.map((n,r)=>({idx:r,mutations:Array.isArray(n?.mutations)?n.mutations.slice():[]}))}}function uh(e,t,n={}){mt();let r=Number(e)|0,o=Number(t)|0,a=n.ensureView!==!1,i=ze.getTileObject(r,o,{ensureView:a,clone:!1}),s=i?.tileView||null,u=s?.tileObject,d={ok:!0,tx:r,ty:o,gidx:i?.gidx??ze.gidx?.(r,o)??null,hasTileView:!!s,objectType:u?.objectType??null,tileObject:u??null,summary:u?.objectType==="plant"?ch(u):u?{objectType:u.objectType??null}:null,display:s?s.childView?.plantVisual||s.childView||s.displayObject||s:null};return n.log!==!1&&ke(()=>console.log("[MGPixi.inspectTile]",d)),d}function dh(e){let t=e?.childView?.plantVisual||e?.childView?.cropVisual||e?.childView||e?.displayObject||e;return Fr(t)||Fr(e?.displayObject)||null}function bl(e){let t=B.fades.get(e);if(!t)return!1;for(let n of t.targets)n.o&&pt(n.o)&&Number.isFinite(n.baseAlpha)&&ke(()=>{n.o.alpha=n.baseAlpha});return B.fades.delete(e),!0}function Ur(e=null){for(let t of Array.from(B.fades.keys()))e&&!String(t).startsWith(e)||bl(t);return!0}function hl(e,t={}){mt();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.clearSpeciesFade: empty species");let r=`fade:${n}:`;if(!pl(t))return Ur(r);let{gidxSet:o}=Kr(t);if(!o)return Ur(r);for(let a of Array.from(B.fades.keys())){if(!a.startsWith(r))continue;let i=Number(a.slice(r.length));o.has(i)&&bl(a)}return!0}function yl(e,t={}){mt();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.fadeSpecies: empty species");let r=Me(Number(t.alpha??.2),0,1),o=t.deep===!0,{entries:a,gidxSet:i}=Kr(t),s=`fade:${n}:`;t.clear===!0&&hl(n,t);let u=0,d=0,l=0,c=0;for(let[p,m]of a){let f=m?.tileObject;if(!f||f.objectType!=="plant")continue;u++;let g=String(f.species||"").trim().toLowerCase();if(!g||g!==n)continue;d++;let b=dh(m);if(!b||!pt(b)){c++;continue}let h=`${s}${p}`;if(B.fades.has(h)){ke(()=>{b.alpha=r}),l++;continue}let S=o?eh(b):[b],v=[];for(let y of S)pt(y)&&v.push({o:y,baseAlpha:Number(y.alpha)});for(let y of v)ke(()=>{y.o.alpha=r});B.fades.set(h,{targets:v}),l++}return{ok:!0,species:n,alpha:r,deep:o,filtered:!!i,plantsSeen:u,matchedPlants:d,applied:l,failed:c,totalFades:B.fades.size}}function ph(e,t={}){mt();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchFadeSpecies: empty species");let r=`watchfade:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,o=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,a=B.fadeWatches.get(r);a&&clearInterval(a);let i=setInterval(()=>{ke(()=>yl(n,{...t,clear:!1}))},o);return B.fadeWatches.set(r,i),{ok:!0,key:r,species:n,intervalMs:o}}function mh(e){let t=String(e||"").trim();if(!t)return!1;if(!t.startsWith("watchfade:")){let r=t.toLowerCase(),o=0;for(let[a,i]of Array.from(B.fadeWatches.entries()))a.startsWith(`watchfade:${r}:`)&&(clearInterval(i),B.fadeWatches.delete(a),o++);return o>0}let n=B.fadeWatches.get(t);return n?(clearInterval(n),B.fadeWatches.delete(t),!0):!1}function Vr(){let e=P;return e.$PIXI=e.PIXI||null,e.$app=B.app||null,e.$renderer=B.renderer||null,e.$stage=B.stage||null,e.$ticker=B.ticker||null,e.__MG_PIXI__={PIXI:e.$PIXI,app:e.$app,renderer:e.$renderer,stage:e.$stage,ticker:e.$ticker,ready:B.ready},e.__MG_PIXI__}function mt(){if(!B.ready)throw new Error("MGPixi: call MGPixi.init() first")}async function gh(e=15e3){if(B.ready)return Vr(),!0;if(await Te.init(e),B.app=Te.app(),B.ticker=Te.ticker(),B.renderer=Te.renderer(),B.stage=Te.stage(),!B.app||!B.ticker)throw new Error("MGPixi: PIXI app/ticker not found");return B.ready=!0,Vr(),!0}var ln={init:gh,ready:()=>B.ready,expose:Vr,get app(){return B.app},get renderer(){return B.renderer},get stage(){return B.stage},get ticker(){return B.ticker},get PIXI(){return P.PIXI||null},defineTileSet:th,deleteTileSet:nh,listTileSets:oh,highlightPulse:gl,stopHighlight:qr,clearHighlights:ml,highlightMutation:fl,watchMutation:sh,stopWatchMutation:lh,inspectTile:uh,fadeSpecies:yl,clearSpeciesFade:hl,clearFades:Ur,watchFadeSpecies:ph,stopWatchFadeSpecies:mh};$e();var vl=P??window,fh={sfx:"soundEffectsVolume",music:"musicVolume",ambience:"ambienceVolume"},bh={sfx:"soundEffectsVolumeAtom",music:"musicVolumeAtom",ambience:"ambienceVolumeAtom"},cn=.001,un=.2,yo=null,F={ready:!1,baseUrl:null,urls:{ambience:new Map,music:new Map},sfx:{mp3Url:null,atlasUrl:null,atlas:null,groups:new Map,buffer:null},tracks:{ambience:null,music:null},ctx:null};function pn(){if(!F.ready)throw new Error("MGAudio not ready yet")}function xl(e,t=NaN){try{let n=localStorage.getItem(e);if(n==null)return t;let r;try{r=JSON.parse(n)}catch{r=n}if(typeof r=="number"&&Number.isFinite(r))return r;if(typeof r=="string"){let o=parseFloat(r);if(Number.isFinite(o))return o}}catch{}return t}function dn(e){let t=fh[e],n=bh[e];if(!t)return{atom:un,vol100:vo(un)};let r=xl(t,NaN);if(Number.isFinite(r)){let a=Me(r,0,1);return{atom:a,vol100:vo(a)}}if(n){let a=xl(n,NaN);if(Number.isFinite(a)){let i=Me(a,0,1);return{atom:i,vol100:vo(i)}}}let o=un;return{atom:o,vol100:vo(o)}}function hh(e){let t=Number(e);if(!Number.isFinite(t))return null;if(t<=0)return 0;let r=(Me(t,1,100)-1)/99;return cn+r*(un-cn)}function vo(e){let t=Me(Number(e),0,1);if(t<=cn)return 0;let n=(t-cn)/(un-cn);return Math.round(1+n*99)}function Sl(e,t){if(t==null)return dn(e).atom;let n=hh(t);return n===null?dn(e).atom:No(n)}async function wl(){let e=F.ctx;if(e)return e;let t=vl.AudioContext||vl.webkitAudioContext;if(!t)throw new Error("WebAudio not supported");let n=new t;return F.ctx=n,n}async function Tl(){if(F.ctx&&F.ctx.state==="suspended")try{await F.ctx.resume()}catch{}}function yh(e){let t=new Map,n=(r,o)=>{t.has(r)||t.set(r,[]),t.get(r).push(o)};for(let r of Object.keys(e||{})){let o=/^(.*)_([A-Z])$/.exec(r);o?.[1]?n(o[1],r):n(r,r)}for(let[r,o]of Array.from(t.entries()))o.sort((a,i)=>a.localeCompare(i)),t.set(r,o);F.sfx.groups=t}function vh(e){let t=F.sfx.atlas;if(!t)throw new Error("SFX atlas not loaded");if(t[e])return e;let n=F.sfx.groups.get(e);if(n?.length)return n[Math.random()*n.length|0];throw new Error(`Unknown sfx/group: ${e}`)}async function xh(){if(F.sfx.buffer)return F.sfx.buffer;if(!F.sfx.mp3Url)throw new Error("SFX mp3 url missing");let e=await wl();await Tl();let n=await(await Nn(F.sfx.mp3Url)).arrayBuffer(),r=await new Promise((o,a)=>{let i=e.decodeAudioData(n,o,a);i?.then&&i.then(o,a)});return F.sfx.buffer=r,r}async function Sh(e,t={}){if(!F.ready)throw new Error("MGAudio not ready yet");let n=String(e||"").trim();if(!n)throw new Error("Missing sfx name");let r=vh(n),o=F.sfx.atlas[r];if(!o)throw new Error(`Missing segment for sfx: ${r}`);let a=await wl();await Tl();let i=await xh(),s=Math.max(0,+o.start||0),u=Math.max(s,+o.end||s),d=Math.max(.01,u-s),l=Sl("sfx",t.volume),c=a.createGain();c.gain.value=l,c.connect(a.destination);let p=a.createBufferSource();return p.buffer=i,p.connect(c),p.start(0,s,d),{name:r,source:p,start:s,end:u,duration:d,volume:l}}function kl(e){if(e!=="music"&&e!=="ambience")return!1;let t=F.tracks[e];if(t){try{t.pause()}catch{}try{t.src=""}catch{}}return F.tracks[e]=null,!0}function wh(e,t,n={}){if(!F.ready)throw new Error("MGAudio not ready yet");if(e!=="music"&&e!=="ambience")throw new Error(`Invalid category: ${e}`);let r=F.urls[e].get(t);if(!r)throw new Error(`Unknown ${e}: ${t}`);kl(e);let o=new Audio(r);return o.loop=!!n.loop,o.volume=Sl(e,n.volume),o.preload="auto",o.play().catch(()=>{}),F.tracks[e]=o,o}async function Th(e,t,n={}){let r=String(e||"").trim(),o=String(t||"").trim();if(!r||!o)throw new Error("play(category, asset) missing args");if(r==="sfx")return Sh(o,n);if(r==="music"||r==="ambience")return wh(r,o,n);throw new Error(`Unknown category: ${r}`)}function kh(e,t={}){let n=String(e||"").trim();return n==="music"||n==="ambience"?Array.from(F.urls[n].keys()).sort():n==="sfx"?F.sfx.atlas?t.groups?Array.from(F.sfx.groups.keys()).sort():Object.keys(F.sfx.atlas).sort():[]:[]}function Ch(){return F.tracks.music&&(F.tracks.music.volume=dn("music").atom),F.tracks.ambience&&(F.tracks.ambience.volume=dn("ambience").atom),!0}function Ph(){return pn(),["sfx","music","ambience"]}function Ah(){return pn(),Array.from(F.sfx.groups.keys()).sort((e,t)=>e.localeCompare(t))}function Mh(e,t){pn();let n=String(e||"").trim().toLowerCase(),r=String(t||"").trim();if(!r||n!=="music"&&n!=="ambience")return!1;let o=F.urls[n],a=r.toLowerCase();for(let i of o.keys())if(i.toLowerCase()===a)return!0;return!1}function Ih(e){pn();let t=String(e||"").trim();if(!t)return!1;let n=t.toLowerCase();for(let r of F.sfx.groups.keys())if(r.toLowerCase()===n)return!0;return!1}function Eh(e,t){pn();let n=String(e||"").trim().toLowerCase(),r=String(t||"").trim();if(!r)throw new Error("getTrackUrl(category, name) missing name");if(n!=="music"&&n!=="ambience")throw new Error(`Invalid category: ${e}`);let o=F.urls[n],a=r.toLowerCase();for(let[i,s]of o.entries())if(i.toLowerCase()===a)return s;return null}async function Lh(){return F.ready?!0:yo||(yo=(async()=>{F.baseUrl=await He.base();let e=await Ie.load(F.baseUrl),t=Ie.getBundle(e,"audio");if(!t)throw new Error("No audio bundle in manifest");for(let n of t.assets||[])for(let r of n.src||[]){if(typeof r!="string")continue;let o=/^audio\/(ambience|music)\/(.+)\.mp3$/i.exec(r);if(o){let a=o[1].toLowerCase(),i=o[2];F.urls[a].set(i,Ce(F.baseUrl,r));continue}/^audio\/sfx\/sfx\.mp3$/i.test(r)&&(F.sfx.mp3Url=Ce(F.baseUrl,r)),/^audio\/sfx\/sfx\.json$/i.test(r)&&(F.sfx.atlasUrl=Ce(F.baseUrl,r))}if(!F.sfx.atlasUrl)throw new Error("Missing audio/sfx/sfx.json in manifest");return F.sfx.atlas=await Tt(F.sfx.atlasUrl),yh(F.sfx.atlas),F.ready=!0,!0})(),yo)}var mn={init:Lh,ready:()=>F.ready,play:Th,stop:kl,list:kh,refreshVolumes:Ch,categoryVolume:dn,getCategories:Ph,getGroups:Ah,hasTrack:Mh,hasGroup:Ih,getTrackUrl:Eh};var Jr=P?.document??document,xo=null,ce={ready:!1,baseUrl:null,byCat:new Map,byBase:new Map,overlay:null,live:new Set,defaultParent:null};function Rh(){if(ce.overlay)return ce.overlay;let e=Jr.createElement("div");return e.id="MG_COSMETIC_OVERLAY",e.style.cssText=["position:fixed","left:0","top:0","width:100vw","height:100vh","pointer-events:none","z-index:99999999"].join(";"),Jr.documentElement.appendChild(e),ce.overlay=e,e}function Oh(){let e=ce.defaultParent;if(!e)return null;try{return typeof e=="function"?e():e}catch{return null}}function Yr(e){let t=String(e||"").trim();return t?(t=t.replace(/^cosmetic\//i,""),t=t.replace(/\.png$/i,""),t):""}function Dh(e,t){if(t===void 0){let a=Yr(e),i=a.indexOf("_");return i<0?{cat:"",asset:a,base:a}:{cat:a.slice(0,i),asset:a.slice(i+1),base:a}}let n=String(e||"").trim(),r=Yr(t),o=r.includes("_")?r:`${n}_${r}`;if(r.includes("_")&&!n){let a=r.indexOf("_");return{cat:r.slice(0,a),asset:r.slice(a+1),base:r}}return{cat:n,asset:r.replace(/^.+?_/,""),base:o}}function Hh(){return Array.from(ce.byCat.keys()).sort((e,t)=>e.localeCompare(t))}function Gh(e){let t=ce.byCat.get(String(e||"").trim());return t?Array.from(t.keys()).sort((n,r)=>n.localeCompare(r)):[]}function Xr(e,t){let{cat:n,asset:r,base:o}=Dh(e,t),a=ce.byBase.get(o);if(a)return a;let s=ce.byCat.get(n)?.get(r);if(s)return s;if(!ce.baseUrl)throw new Error("MGCosmetic not initialized");if(!o)throw new Error("Invalid cosmetic name");return Ce(ce.baseUrl,`cosmetic/${o}.png`)}function Qr(e,t,n){if(!ce.ready)throw new Error("MGCosmetic not ready yet");let r,o;typeof t=="object"&&t!==null?(r=t,o=void 0):typeof t=="string"?(o=t,r=n||{}):(o=void 0,r=n||{});let a=o!==void 0?Xr(e,o):Xr(e),i=Jr.createElement("img");if(i.decoding="async",i.loading="eager",i.src=a,i.alt=r.alt!=null?String(r.alt):Yr(o??e),r.className&&(i.className=String(r.className)),r.width!=null&&(i.style.width=String(r.width)),r.height!=null&&(i.style.height=String(r.height)),r.opacity!=null&&(i.style.opacity=String(r.opacity)),r.style&&typeof r.style=="object")for(let[s,u]of Object.entries(r.style))try{i.style[s]=String(u)}catch{}return i}function Nh(e,t,n){let r,o;typeof t=="object"&&t!==null?(r=t,o=void 0):typeof t=="string"?(o=t,r=n||{}):(o=void 0,r=n||{});let a=r.parent||Oh()||Rh(),i=o!==void 0?Qr(e,o,r):Qr(e,r);if(a===ce.overlay||r.center||r.x!=null||r.y!=null||r.absolute){i.style.position="absolute",i.style.pointerEvents="none",i.style.zIndex=String(r.zIndex??999999);let u=r.scale??1,d=r.rotation??0;if(r.center)i.style.left="50%",i.style.top="50%",i.style.transform=`translate(-50%, -50%) scale(${u}) rotate(${d}rad)`;else{let l=r.x??innerWidth/2,c=r.y??innerHeight/2;i.style.left=`${l}px`,i.style.top=`${c}px`,i.style.transform=`scale(${u}) rotate(${d}rad)`,r.anchor==="center"&&(i.style.transform=`translate(-50%, -50%) scale(${u}) rotate(${d}rad)`)}}return a.appendChild(i),ce.live.add(i),i.__mgDestroy=()=>{try{i.remove()}catch{}ce.live.delete(i)},i}function _h(e){return ce.defaultParent=e,!0}function Wh(){for(let e of Array.from(ce.live))e.__mgDestroy?.()}async function Bh(){return ce.ready?!0:xo||(xo=(async()=>{ce.baseUrl=await He.base();let e=await Ie.load(ce.baseUrl),t=Ie.getBundle(e,"cosmetic");if(!t)throw new Error("No 'cosmetic' bundle in manifest");ce.byCat.clear(),ce.byBase.clear();for(let n of t.assets||[])for(let r of n.src||[]){if(typeof r!="string"||!/^cosmetic\/.+\.png$/i.test(r))continue;let a=r.split("/").pop().replace(/\.png$/i,""),i=a.indexOf("_");if(i<0)continue;let s=a.slice(0,i),u=a.slice(i+1),d=Ce(ce.baseUrl,r);ce.byBase.set(a,d),ce.byCat.has(s)||ce.byCat.set(s,new Map),ce.byCat.get(s).set(u,d)}return ce.ready=!0,!0})(),xo)}var gn={init:Bh,ready:()=>ce.ready,categories:Hh,list:Gh,url:Xr,create:Qr,show:Nh,attach:_h,clear:Wh};var wo={};Tn(wo,{AchievementManager:()=>So,destroyAchievementManager:()=>zh,getAchievementManager:()=>jh});var So=class{constructor(){le(this,"achievements",new Map);le(this,"data");le(this,"storageKey","gemini_achievements");le(this,"onUnlockCallbacks",[]);le(this,"onProgressCallbacks",[]);this.data=this.loadData()}loadData(){try{let t=localStorage.getItem(this.storageKey);if(t)return JSON.parse(t)}catch(t){console.warn("[Achievements] Failed to load data:",t)}return{unlocked:{},progress:{}}}saveData(){try{localStorage.setItem(this.storageKey,JSON.stringify(this.data))}catch(t){console.warn("[Achievements] Failed to save data:",t)}}register(t){this.achievements.set(t.id,t),this.data.progress[t.id]||(this.data.progress[t.id]={current:0,target:t.target,percentage:0})}registerMany(t){for(let n of t)this.register(n)}async checkAchievement(t){let n=this.achievements.get(t);if(!n)throw new Error(`Achievement not found: ${t}`);let r=this.isUnlocked(t),o=await n.checkProgress(),a={current:o,target:n.target,percentage:Math.min(100,Math.floor(o/n.target*100))},i=this.data.progress[t];this.data.progress[t]=a;let s=o>=n.target;return!r&&s?this.unlock(t,a):s||this.triggerProgressCallbacks({achievement:n,progress:a,previousProgress:i}),this.saveData(),{id:t,wasUnlocked:r,isUnlocked:s,progress:a}}async checkAllAchievements(){let t=[];for(let n of this.achievements.keys()){let r=await this.checkAchievement(n);t.push(r)}return t}unlock(t,n){let r=this.achievements.get(t);if(!r)return;let o={achievementId:t,unlockedAt:Date.now(),progress:n};this.data.unlocked[t]=o,this.saveData(),this.triggerUnlockCallbacks({achievement:r,unlockedAt:o.unlockedAt,progress:n})}isUnlocked(t){return!!this.data.unlocked[t]}getAchievement(t){return this.achievements.get(t)||null}getAllAchievements(){return Array.from(this.achievements.values())}getAchievementsByCategory(t){return Array.from(this.achievements.values()).filter(n=>n.category===t)}getAchievementsByRarity(t){return Array.from(this.achievements.values()).filter(n=>n.rarity===t)}getUnlockedAchievements(){return Object.values(this.data.unlocked)}getLockedAchievements(){return Array.from(this.achievements.values()).filter(t=>!this.isUnlocked(t.id)&&!t.hidden)}getProgress(t){return this.data.progress[t]||null}getCompletionPercentage(){let t=this.achievements.size,n=Object.keys(this.data.unlocked).length;return t>0?Math.floor(n/t*100):0}getCompletionStats(){let t=this.achievements.size,n=Object.keys(this.data.unlocked).length,r=t-n,o=this.getCompletionPercentage();return{total:t,unlocked:n,locked:r,percentage:o}}onUnlock(t){return this.onUnlockCallbacks.push(t),()=>{let n=this.onUnlockCallbacks.indexOf(t);n!==-1&&this.onUnlockCallbacks.splice(n,1)}}onProgress(t){return this.onProgressCallbacks.push(t),()=>{let n=this.onProgressCallbacks.indexOf(t);n!==-1&&this.onProgressCallbacks.splice(n,1)}}triggerUnlockCallbacks(t){for(let n of this.onUnlockCallbacks)try{n(t)}catch(r){console.warn("[Achievements] Unlock callback error:",r)}}triggerProgressCallbacks(t){for(let n of this.onProgressCallbacks)try{n(t)}catch(r){console.warn("[Achievements] Progress callback error:",r)}}reset(){this.data={unlocked:{},progress:{}};for(let t of this.achievements.values())this.data.progress[t.id]={current:0,target:t.target,percentage:0};this.saveData()}exportData(){return JSON.stringify(this.data,null,2)}importData(t){try{let n=JSON.parse(t);return this.data=n,this.saveData(),!0}catch(n){return console.warn("[Achievements] Failed to import data:",n),!1}}},fn=null;function jh(){return fn||(fn=new So),fn}function zh(){fn&&(fn=null)}var Po={};Tn(Po,{calculateCropProgress:()=>Al,calculateCropSellPrice:()=>ta,calculateCropSize:()=>Pl,calculateCurrentStrength:()=>bt,calculateHoursToMature:()=>Yh,calculateHoursToMaxStrength:()=>oa,calculateMaxStrength:()=>ft,calculateMutationMultiplier:()=>To,calculatePetAge:()=>gt,calculateStrengthPerHour:()=>Co,calculateStrengthProgress:()=>ra,calculateTimeRemaining:()=>Kh,calculateTotalCropValue:()=>qh,getAllMutationNames:()=>Vh,getCropData:()=>ko,getMutationInfo:()=>$h,getMutationValue:()=>Zr,getPetData:()=>yt,isCropReady:()=>Ml,isEnvironmentalMutation:()=>Cl,isGrowthMutation:()=>ea,isPetMature:()=>ht});var Ot={Gold:25,Rainbow:50,Frozen:10,Chilled:5,Wet:2},Fh=new Set(["Gold","Rainbow"]),Uh=new Set(["Frozen","Chilled","Wet"]);function To(e){let t=1,n=0,r=0;for(let o of e)o==="Gold"||o==="Rainbow"?o==="Rainbow"?t=Ot.Rainbow:t===1&&(t=Ot.Gold):o in Ot&&(n+=Ot[o],r++);return t*(1+n-r)}function Zr(e){return Ot[e]??null}function ea(e){return Fh.has(e)}function Cl(e){return Uh.has(e)}function Vh(){return Object.keys(Ot)}function $h(e){let t=Zr(e);return t===null?null:{name:e,value:t,type:ea(e)?"growth":"environmental"}}function Pl(e,t){let n=ko(e);if(!n)return 50;let r=n.maxScale;if(t<=1)return 50;if(t>=r)return 100;let o=(t-1)/(r-1);return Math.floor(50+50*o)}function ta(e,t,n){let r=ko(e);if(!r)return 0;let o=r.baseSellPrice,a=To(n);return Math.round(o*t*a)}function Al(e,t,n){if(n>=t)return 100;if(n<=e)return 0;let r=t-e,o=n-e;return Math.floor(o/r*100)}function Ml(e,t){return t>=e}function Kh(e,t){let n=Math.max(0,e-t);return Math.floor(n/1e3)}function ko(e){let t=ge.get("plants");if(!t)return null;let n=t[e];return n?.crop?{baseSellPrice:n.crop.baseSellPrice??0,maxScale:n.crop.maxScale??1,growTime:n.crop.growTime??0}:null}function qh(e){return e.reduce((t,n)=>t+ta(n.species,n.targetScale,n.mutations),0)}var Il=3600,na=80,Jh=100,bn=30;function gt(e){return e/Il}function ft(e,t){let n=yt(e);if(!n)return na;let r=n.maxScale;if(t<=1)return na;if(t>=r)return Jh;let o=(t-1)/(r-1);return Math.floor(na+20*o)}function bt(e,t,n){let r=yt(e);if(!r)return n-bn;let o=r.hoursToMature,a=t/Il,i=bn/o,s=Math.min(i*a,bn),u=n-bn;return Math.floor(u+s)}function ht(e,t){let n=yt(e);return n?t>=n.hoursToMature:!1}function Co(e){let t=yt(e);return t?bn/t.hoursToMature:0}function oa(e,t,n){let r=t-e;return r<=0||n<=0?0:r/n}function Yh(e,t){let n=yt(e);if(!n)return 0;let r=n.hoursToMature-t;return Math.max(0,r)}function yt(e){let t=ge.get("pets");if(!t)return null;let n=t[e];return n?{hoursToMature:n.hoursToMature??0,maxScale:n.maxScale??1,abilities:n.abilities??[]}:null}function ra(e,t){return t<=0?1:Math.min(1,e/t)}var aa={};Tn(aa,{calculatePetStrength:()=>El,enrichPetWithStrength:()=>Ll,enrichPetsWithStrength:()=>Rl,getPetStrengthStats:()=>Xh});function El(e){let t=gt(e.xp),n=ft(e.petSpecies,e.targetScale),r=bt(e.petSpecies,e.xp,n),o=ht(e.petSpecies,t),a=Co(e.petSpecies),i=oa(r,n,a),s=ra(r,n);return{current:r,max:n,progress:s,age:t,isMature:o,strengthPerHour:a,hoursToMax:i}}function Ll(e){return{...e,strength:El(e)}}function Rl(e){return e.map(Ll)}function Xh(e){if(e.length===0)return{averageCurrent:0,averageMax:0,totalMature:0,totalImmature:0,strongestPet:null,weakestPet:null};let t=Rl(e),n=t.reduce((u,d)=>u+d.strength.current,0),r=t.reduce((u,d)=>u+d.strength.max,0),o=t.filter(u=>u.strength.isMature).length,a=t.length-o,i=t.reduce((u,d)=>d.strength.max>(u?.strength.max||0)?d:u,t[0]),s=t.reduce((u,d)=>d.strength.max<(u?.strength.max||1/0)?d:u,t[0]);return{averageCurrent:Math.round(n/t.length),averageMax:Math.round(r/t.length),totalMature:o,totalImmature:a,strongestPet:i,weakestPet:s}}function xe(e,t){if(e===t)return!0;if(e===null||t===null)return e===t;if(typeof e!=typeof t)return!1;if(typeof e!="object")return e===t;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return!1;for(let i=0;i<e.length;i++)if(!xe(e[i],t[i]))return!1;return!0}if(Array.isArray(e)||Array.isArray(t))return!1;let n=e,r=t,o=Object.keys(n),a=Object.keys(r);if(o.length!==a.length)return!1;for(let i of o)if(!Object.prototype.hasOwnProperty.call(r,i)||!xe(n[i],r[i]))return!1;return!0}var Ol={currentGardenTile:"myCurrentGardenTileAtom",globalTileIndex:"myCurrentGlobalTileIndexAtom",gardenObject:"myCurrentGardenObjectAtom",isMature:"isGardenObjectMatureAtom",isInMyGarden:"isInMyGardenAtom",gardenName:"currentGardenNameAtom",sortedSlotIndices:"myCurrentSortedGrowSlotIndicesAtom",currentGrowSlotIndex:"myCurrentGrowSlotIndexAtom"},Dl={position:{globalIndex:null,localIndex:null},tile:{type:null,isEmpty:!0},garden:{name:null,isOwner:!1,playerSlotIndex:null},object:{type:null,data:null,isMature:!1},plant:null};function Qh(e){let t=e.currentGardenTile;return{globalIndex:e.globalTileIndex,localIndex:t?.localTileIndex??null}}function Zh(e){return{type:e.currentGardenTile?.tileType??null,isEmpty:e.gardenObject===null}}function ey(e){let t=e.currentGardenTile;return{name:e.gardenName,isOwner:e.isInMyGarden??!1,playerSlotIndex:t?.userSlotIdx??null}}function ty(e){let t=e.gardenObject;return t?{type:t.objectType,data:t,isMature:e.isMature??!1}:{type:null,data:null,isMature:!1}}function ny(e){let t=e.gardenObject;if(!t||t.objectType!=="plant")return null;let n=t,r=e.sortedSlotIndices??[];return{species:n.species,slots:n.slots??[],currentSlotIndex:e.currentGrowSlotIndex,sortedSlotIndices:r,nextHarvestSlotIndex:r.length>0?r[0]:null}}function Hl(e){return{position:Qh(e),tile:Zh(e),garden:ey(e),object:ty(e),plant:ny(e)}}function Gl(e){return JSON.stringify({globalIndex:e.position.globalIndex,localIndex:e.position.localIndex,tileType:e.tile.type,isEmpty:e.tile.isEmpty,gardenName:e.garden.name,isOwner:e.garden.isOwner,playerSlotIndex:e.garden.playerSlotIndex,objectType:e.object.type,isMature:e.object.isMature,plantSpecies:e.plant?.species??null,slotCount:e.plant?.slots.length??0})}function oy(e,t){return e.type!==t.type||e.isMature!==t.isMature?!0:e.data===null&&t.data===null?!1:e.data===null||t.data===null?!0:!xe(e.data,t.data)}function ry(e,t){return e===null&&t===null?!1:e===null||t===null||e.species!==t.species||e.currentSlotIndex!==t.currentSlotIndex||e.nextHarvestSlotIndex!==t.nextHarvestSlotIndex||e.slots.length!==t.slots.length?!0:!xe(e.sortedSlotIndices,t.sortedSlotIndices)}function ay(e,t){return e.name!==t.name||e.isOwner!==t.isOwner||e.playerSlotIndex!==t.playerSlotIndex}function iy(){let e=Dl,t=Dl,n=!1,r=[],o={all:new Set,stable:new Set,object:new Set,plantInfo:new Set,garden:new Set},a={},i=Object.keys(Ol),s=new Set;function u(){if(s.size<i.length)return;let l=Hl(a);if(!xe(e,l)&&(t=e,e=l,!!n)){for(let c of o.all)c(e,t);if(Gl(t)!==Gl(e))for(let c of o.stable)c(e,t);if(oy(t.object,e.object)){let c={current:e.object,previous:t.object};for(let p of o.object)p(c)}if(ry(t.plant,e.plant)){let c={current:e.plant,previous:t.plant};for(let p of o.plantInfo)p(c)}if(ay(t.garden,e.garden)){let c={current:e.garden,previous:t.garden};for(let p of o.garden)p(c)}}}async function d(){if(n)return;let l=i.map(async c=>{let p=Ol[c],m=await Y.subscribe(p,f=>{a[c]=f,s.add(c),u()});r.push(m)});await Promise.all(l),n=!0,s.size===i.length&&(e=Hl(a))}return d(),{get(){return e},subscribe(l,c){return o.all.add(l),c?.immediate!==!1&&n&&s.size===i.length&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,c){return o.stable.add(l),c?.immediate!==!1&&n&&s.size===i.length&&l(e,e),()=>o.stable.delete(l)},subscribeObject(l,c){return o.object.add(l),c?.immediate&&n&&s.size===i.length&&l({current:e.object,previous:e.object}),()=>o.object.delete(l)},subscribePlantInfo(l,c){return o.plantInfo.add(l),c?.immediate&&n&&s.size===i.length&&l({current:e.plant,previous:e.plant}),()=>o.plantInfo.delete(l)},subscribeGarden(l,c){return o.garden.add(l),c?.immediate&&n&&s.size===i.length&&l({current:e.garden,previous:e.garden}),()=>o.garden.delete(l)},destroy(){for(let l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.object.clear(),o.plantInfo.clear(),o.garden.clear(),n=!1}}}var ia=null;function sa(){return ia||(ia=iy()),ia}var Nl={inventory:"myPetInventoryAtom",hutch:"myPetHutchPetItemsAtom",active:"myPetInfosAtom",slotInfos:"myPetSlotInfosAtom",expandedPetSlotId:"expandedPetSlotIdAtom"};function _l(e,t){let n=gt(e.xp),r=ft(e.petSpecies,e.targetScale),o=bt(e.petSpecies,e.xp,r),a=ht(e.petSpecies,n);return{id:e.id,petSpecies:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,mutations:[...e.mutations],targetScale:e.targetScale,abilities:[...e.abilities],location:t,position:null,lastAbilityTrigger:null,growthStage:n,currentStrength:o,maxStrength:r,isMature:a}}function sy(e,t){let r=t[e.slot.id]?.lastAbilityTrigger??null,o=gt(e.slot.xp),a=ft(e.slot.petSpecies,e.slot.targetScale),i=bt(e.slot.petSpecies,e.slot.xp,a),s=ht(e.slot.petSpecies,o);return{id:e.slot.id,petSpecies:e.slot.petSpecies,name:e.slot.name,xp:e.slot.xp,hunger:e.slot.hunger,mutations:[...e.slot.mutations],targetScale:e.slot.targetScale,abilities:[...e.slot.abilities],location:"active",position:e.position?{x:e.position.x,y:e.position.y}:null,lastAbilityTrigger:r,growthStage:o,currentStrength:i,maxStrength:a,isMature:s}}function Wl(e){let t=new Set,n=[];for(let u of e.active??[]){let d=sy(u,e.slotInfos??{});n.push(d),t.add(d.id)}let r=[];for(let u of e.inventory??[]){if(t.has(u.id))continue;let d=_l(u,"inventory");r.push(d),t.add(d.id)}let o=[];for(let u of e.hutch??[]){if(t.has(u.id))continue;let d=_l(u,"hutch");o.push(d),t.add(d.id)}let a=[...n,...r,...o],i=e.expandedPetSlotId??null,s=i?a.find(u=>u.id===i)??null:null;return{all:a,byLocation:{inventory:r,hutch:o,active:n},counts:{inventory:r.length,hutch:o.length,active:n.length,total:a.length},expandedPetSlotId:i,expandedPet:s}}var Bl={all:[],byLocation:{inventory:[],hutch:[],active:[]},counts:{inventory:0,hutch:0,active:0,total:0},expandedPetSlotId:null,expandedPet:null};function ly(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}function jl(e){return JSON.stringify({id:e.id,petSpecies:e.petSpecies,name:e.name,mutations:e.mutations,abilities:e.abilities,location:e.location})}function cy(e,t){if(e.all.length!==t.all.length)return!1;let n=e.all.map(jl),r=t.all.map(jl);return ly(n,r)}function uy(e,t){let n=[],r=new Map(e.all.map(o=>[o.id,o]));for(let o of t.all){let a=r.get(o.id);a&&a.location!==o.location&&n.push({pet:o,from:a.location,to:o.location})}return n}function dy(e,t){let n=[],r=new Map(e.all.map(o=>[o.id,o]));for(let o of t.all){if(!o.lastAbilityTrigger)continue;let i=r.get(o.id)?.lastAbilityTrigger;(!i||i.abilityId!==o.lastAbilityTrigger.abilityId||i.performedAt!==o.lastAbilityTrigger.performedAt)&&n.push({pet:o,trigger:o.lastAbilityTrigger})}return n}function py(e,t){let n=new Set(e.all.map(i=>i.id)),r=new Set(t.all.map(i=>i.id)),o=t.all.filter(i=>!n.has(i.id)),a=e.all.filter(i=>!r.has(i.id));return o.length===0&&a.length===0?null:{added:o,removed:a,counts:t.counts}}function my(e,t){let n=[],r=new Map(e.all.map(o=>[o.id,o]));for(let o of t.all){let a=r.get(o.id);a&&o.growthStage>a.growthStage&&n.push({pet:o,previousStage:a.growthStage,newStage:o.growthStage})}return n}function gy(e,t){let n=[],r=new Map(e.all.map(o=>[o.id,o]));for(let o of t.all){let a=r.get(o.id);a&&o.currentStrength>a.currentStrength&&n.push({pet:o,previousStrength:a.currentStrength,newStrength:o.currentStrength})}return n}function fy(e,t){let n=[],r=new Map(e.all.map(o=>[o.id,o]));for(let o of t.all){let a=r.get(o.id);a&&o.currentStrength===o.maxStrength&&a.currentStrength<a.maxStrength&&n.push({pet:o})}return n}function by(){let e=Bl,t=Bl,n=!1,r=[],o={all:new Set,stable:new Set,location:new Set,ability:new Set,count:new Set,expandedPet:new Set,growth:new Set,strengthGain:new Set,maxStrength:new Set},a={},i=Object.keys(Nl),s=new Set;function u(){if(s.size<i.length)return;let l=Wl(a);if(xe(e,l)||(t=e,e=l,!n))return;for(let h of o.all)h(e,t);if(!cy(t,e))for(let h of o.stable)h(e,t);let c=uy(t,e);for(let h of c)for(let S of o.location)S(h);let p=dy(t,e);for(let h of p)for(let S of o.ability)S(h);let m=py(t,e);if(m)for(let h of o.count)h(m);let f=my(t,e);for(let h of f)for(let S of o.growth)S(h);let g=gy(t,e);for(let h of g)for(let S of o.strengthGain)S(h);let b=fy(t,e);for(let h of b)for(let S of o.maxStrength)S(h);if(t.expandedPetSlotId!==e.expandedPetSlotId){let h={current:e.expandedPet,previous:t.expandedPet,currentId:e.expandedPetSlotId,previousId:t.expandedPetSlotId};for(let S of o.expandedPet)S(h)}}async function d(){if(n)return;let l=i.map(async c=>{let p=Nl[c],m=await Y.subscribe(p,f=>{a[c]=f,s.add(c),u()});r.push(m)});await Promise.all(l),n=!0,s.size===i.length&&(e=Wl(a))}return d(),{get(){return e},subscribe(l,c){return o.all.add(l),c?.immediate!==!1&&n&&s.size===i.length&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,c){return o.stable.add(l),c?.immediate!==!1&&n&&s.size===i.length&&l(e,e),()=>o.stable.delete(l)},subscribeLocation(l,c){if(o.location.add(l),c?.immediate&&n&&s.size===i.length)for(let p of e.all)l({pet:p,from:p.location,to:p.location});return()=>o.location.delete(l)},subscribeAbility(l,c){if(o.ability.add(l),c?.immediate&&n&&s.size===i.length)for(let p of e.all)p.lastAbilityTrigger&&l({pet:p,trigger:p.lastAbilityTrigger});return()=>o.ability.delete(l)},subscribeCount(l,c){return o.count.add(l),c?.immediate&&n&&s.size===i.length&&l({added:e.all,removed:[],counts:e.counts}),()=>o.count.delete(l)},subscribeExpandedPet(l,c){return o.expandedPet.add(l),c?.immediate&&n&&s.size===i.length&&l({current:e.expandedPet,previous:e.expandedPet,currentId:e.expandedPetSlotId,previousId:e.expandedPetSlotId}),()=>o.expandedPet.delete(l)},subscribeGrowth(l,c){if(o.growth.add(l),c?.immediate&&n&&s.size===i.length)for(let p of e.all)l({pet:p,previousStage:p.growthStage,newStage:p.growthStage});return()=>o.growth.delete(l)},subscribeStrengthGain(l,c){if(o.strengthGain.add(l),c?.immediate&&n&&s.size===i.length)for(let p of e.all)l({pet:p,previousStrength:p.currentStrength,newStrength:p.currentStrength});return()=>o.strengthGain.delete(l)},subscribeMaxStrength(l,c){if(o.maxStrength.add(l),c?.immediate&&n&&s.size===i.length)for(let p of e.all)p.currentStrength===p.maxStrength&&l({pet:p});return()=>o.maxStrength.delete(l)},destroy(){for(let l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.location.clear(),o.ability.clear(),o.count.clear(),o.expandedPet.clear(),o.growth.clear(),o.strengthGain.clear(),o.maxStrength.clear(),n=!1}}}var la=null;function ca(){return la||(la=by()),la}function hy(){let e=null,t=[],n=new Set,r={},o=new Set,a=2;function i(c,p){return{x:p%c,y:Math.floor(p/c)}}function s(c,p,m){return m*c+p}function u(c,p){let{cols:m,rows:f}=c,g=m*f,b=new Set,h=new Set,S=new Map,v=[],y=c.userSlotIdxAndDirtTileIdxToGlobalTileIdx??[],k=c.userSlotIdxAndBoardwalkTileIdxToGlobalTileIdx??[],T=Math.max(y.length,k.length);for(let E=0;E<T;E++){let R=y[E]??[],L=k[E]??[],$=R.map((K,X)=>(b.add(K),S.set(K,E),{globalIndex:K,localIndex:X,position:i(m,K)})),oe=L.map((K,X)=>(h.add(K),S.set(K,E),{globalIndex:K,localIndex:X,position:i(m,K)}));v.push({userSlotIdx:E,dirtTiles:$,boardwalkTiles:oe,allTiles:[...$,...oe]})}let A=c.spawnTiles.map(E=>i(m,E)),I={};if(c.locations)for(let[E,R]of Object.entries(c.locations)){let L=R.spawnTileIdx??[];I[E]={name:E,spawnTiles:L,spawnPositions:L.map($=>i(m,$))}}return{cols:m,rows:f,totalTiles:g,tileSize:p,spawnTiles:c.spawnTiles,spawnPositions:A,locations:I,userSlots:v,globalToXY(E){return i(m,E)},xyToGlobal(E,R){return s(m,E,R)},getTileOwner(E){return S.get(E)??null},isDirtTile(E){return b.has(E)},isBoardwalkTile(E){return h.has(E)}}}function d(){if(o.size<a||e)return;let c=r.map,p=r.tileSize??0;if(c){e=u(c,p);for(let m of n)m(e);n.clear()}}async function l(){let c=await Y.subscribe("mapAtom",m=>{r.map=m,o.add("map"),d()});t.push(c);let p=await Y.subscribe("tileSizeAtom",m=>{r.tileSize=m,o.add("tileSize"),d()});t.push(p)}return l(),{get(){return e},isReady(){return e!==null},onReady(c,p){return e?(p?.immediate!==!1&&c(e),()=>{}):(n.add(c),()=>n.delete(c))},destroy(){for(let c of t)c();t.length=0,e=null,n.clear()}}}var ua=null;function Dt(){return ua||(ua=hy()),ua}var zl={inventory:"myInventoryAtom",isFull:"isMyInventoryAtMaxLengthAtom",selectedItemIndex:"myPossiblyNoLongerValidSelectedItemIndexAtom"},Fl={items:[],favoritedItemIds:[],count:0,isFull:!1,selectedItem:null};function Ul(e){let t=e.inventory,n=t?.items??[],r=t?.favoritedItemIds??[],o=e.selectedItemIndex,a=null;return o!==null&&o>=0&&o<n.length&&(a={index:o,item:n[o]}),{items:n,favoritedItemIds:r,count:n.length,isFull:e.isFull??!1,selectedItem:a}}function Vl(e){let t=e.items.map(n=>"id"in n?n.id:"species"in n&&n.itemType==="Seed"?`seed:${n.species}:${n.quantity}`:"toolId"in n?`tool:${n.toolId}:${n.quantity}`:"eggId"in n?`egg:${n.eggId}:${n.quantity}`:"decorId"in n?`decor:${n.decorId}:${n.quantity}`:JSON.stringify(n));return JSON.stringify({itemKeys:t,favoritedItemIds:e.favoritedItemIds,isFull:e.isFull,selectedItemIndex:e.selectedItem?.index??null})}function yy(e,t){return Vl(e)===Vl(t)}function vy(e,t){return e===null&&t===null?!1:e===null||t===null?!0:e.index!==t.index}function Ao(e){return"id"in e?e.id:"species"in e&&e.itemType==="Seed"?`seed:${e.species}`:"toolId"in e?`tool:${e.toolId}`:"eggId"in e?`egg:${e.eggId}`:"decorId"in e?`decor:${e.decorId}`:JSON.stringify(e)}function xy(e,t){let n=new Set(e.map(Ao)),r=new Set(t.map(Ao)),o=t.filter(i=>!n.has(Ao(i))),a=e.filter(i=>!r.has(Ao(i)));return o.length===0&&a.length===0?null:{added:o,removed:a,counts:{before:e.length,after:t.length}}}function Sy(e,t){let n=new Set(e),r=new Set(t),o=t.filter(i=>!n.has(i)),a=e.filter(i=>!r.has(i));return o.length===0&&a.length===0?null:{added:o,removed:a,current:t}}function wy(){let e=Fl,t=Fl,n=!1,r=[],o={all:new Set,stable:new Set,selection:new Set,items:new Set,favorites:new Set},a={},i=Object.keys(zl),s=new Set;function u(){if(s.size<i.length)return;let l=Ul(a);if(xe(e,l)||(t=e,e=l,!n))return;for(let m of o.all)m(e,t);if(!yy(t,e))for(let m of o.stable)m(e,t);if(vy(t.selectedItem,e.selectedItem)){let m={current:e.selectedItem,previous:t.selectedItem};for(let f of o.selection)f(m)}let c=xy(t.items,e.items);if(c)for(let m of o.items)m(c);let p=Sy(t.favoritedItemIds,e.favoritedItemIds);if(p)for(let m of o.favorites)m(p)}async function d(){if(n)return;let l=i.map(async c=>{let p=zl[c],m=await Y.subscribe(p,f=>{a[c]=f,s.add(c),u()});r.push(m)});await Promise.all(l),n=!0,s.size===i.length&&(e=Ul(a))}return d(),{get(){return e},subscribe(l,c){return o.all.add(l),c?.immediate!==!1&&n&&s.size===i.length&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,c){return o.stable.add(l),c?.immediate!==!1&&n&&s.size===i.length&&l(e,e),()=>o.stable.delete(l)},subscribeSelection(l,c){return o.selection.add(l),c?.immediate&&n&&s.size===i.length&&l({current:e.selectedItem,previous:e.selectedItem}),()=>o.selection.delete(l)},subscribeItems(l,c){return o.items.add(l),c?.immediate&&n&&s.size===i.length&&l({added:e.items,removed:[],counts:{before:0,after:e.count}}),()=>o.items.delete(l)},subscribeFavorites(l,c){return o.favorites.add(l),c?.immediate&&n&&s.size===i.length&&l({added:e.favoritedItemIds,removed:[],current:e.favoritedItemIds}),()=>o.favorites.delete(l)},destroy(){for(let l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.selection.clear(),o.items.clear(),o.favorites.clear(),n=!1}}}var da=null;function pa(){return da||(da=wy()),da}var ga={all:[],host:null,count:0};function Ty(e,t,n){let r=n.get(e.id),o=r?.slot,a=o?.data,i=o?.lastActionEvent;return{id:e.id,name:e.name,discordId:e.databaseUserId,discordAvatarUrl:e.discordAvatarUrl,guildId:e.guildId,isConnected:e.isConnected,isHost:e.id===t,slotIndex:r?.index??null,position:o?.position??null,cosmetic:{color:e.cosmetic?.color??"",avatar:e.cosmetic?.avatar?[...e.cosmetic.avatar]:[]},emote:{type:e.emoteData?.emoteType??-1},coins:a?.coinsCount??0,inventory:a?.inventory??null,shopPurchases:a?.shopPurchases??null,garden:a?.garden??null,pets:{slots:a?.petSlots??[],slotInfos:o?.petSlotInfos??null},journal:a?.journal??null,stats:a?.stats??null,tasksCompleted:a?.tasksCompleted??[],activityLogs:a?.activityLogs??[],customRestocks:{config:a?.customRestocks??null,inventories:o?.customRestockInventories??null},lastAction:i?{type:i.action,data:i.data,timestamp:i.timestamp}:null,selectedItemIndex:o?.notAuthoritative_selectedItemIndex??null,lastSlotMachineInfo:o?.lastSlotMachineInfo??null}}function $l(e){let t=e.players,n=e.hostPlayerId??"",r=e.userSlots??[];if(!t||!Array.isArray(t)||t.length===0)return ga;let o=new Map;Array.isArray(r)&&r.forEach((s,u)=>{s?.type==="user"&&s?.playerId&&o.set(s.playerId,{slot:s,index:u})});let a=t.map(s=>Ty(s,n,o)),i=a.find(s=>s.isHost)??null;return{all:a,host:i,count:a.length}}function Kl(e){let t=e.all.map(n=>`${n.id}:${n.isConnected}:${n.isHost}`);return JSON.stringify({playerKeys:t,hostId:e.host?.id??null,count:e.count})}function ky(e,t){let n=[],r=new Set(e.map(a=>a.id)),o=new Set(t.map(a=>a.id));for(let a of t)r.has(a.id)||n.push({player:a,type:"join"});for(let a of e)o.has(a.id)||n.push({player:a,type:"leave"});return n}function Cy(e,t){let n=[],r=new Map(e.map(o=>[o.id,o]));for(let o of t){let a=r.get(o.id);a&&a.isConnected!==o.isConnected&&n.push({player:o,isConnected:o.isConnected})}return n}function Py(){let e=ga,t=ga,n=!1,r=[],o={all:new Set,stable:new Set,joinLeave:new Set,connection:new Set,host:new Set},a={},i=new Set,s=3;function u(){if(i.size<s)return;let l=$l(a);if(xe(e,l)||(t=e,e=l,!n))return;for(let g of o.all)g(e,t);if(Kl(t)!==Kl(e))for(let g of o.stable)g(e,t);let c=ky(t.all,e.all);for(let g of c)for(let b of o.joinLeave)b(g);let p=Cy(t.all,e.all);for(let g of p)for(let b of o.connection)b(g);let m=t.host?.id??null,f=e.host?.id??null;if(m!==f){let g={current:e.host,previous:t.host};for(let b of o.host)b(g)}}async function d(){if(n)return;let l=await kr.onChangeNow(m=>{a.players=m,i.add("players"),u()});r.push(l);let c=await Cr.onChangeNow(m=>{a.hostPlayerId=m,i.add("hostPlayerId"),u()});r.push(c);let p=await Tr.onChangeNow(m=>{a.userSlots=m,i.add("userSlots"),u()});r.push(p),n=!0,i.size===s&&(e=$l(a))}return d(),{get(){return e},subscribe(l,c){return o.all.add(l),c?.immediate!==!1&&n&&i.size===s&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,c){return o.stable.add(l),c?.immediate!==!1&&n&&i.size===s&&l(e,e),()=>o.stable.delete(l)},subscribeJoinLeave(l,c){if(o.joinLeave.add(l),c?.immediate&&n&&i.size===s)for(let p of e.all)l({player:p,type:"join"});return()=>o.joinLeave.delete(l)},subscribeConnection(l,c){if(o.connection.add(l),c?.immediate&&n&&i.size===s)for(let p of e.all)l({player:p,isConnected:p.isConnected});return()=>o.connection.delete(l)},subscribeHost(l,c){return o.host.add(l),c?.immediate&&n&&i.size===s&&l({current:e.host,previous:e.host}),()=>o.host.delete(l)},destroy(){for(let l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.joinLeave.clear(),o.connection.clear(),o.host.clear(),n=!1}}}var ma=null;function fa(){return ma||(ma=Py()),ma}var hn=["seed","tool","egg","decor"];function Ay(e,t){switch(t){case"seed":return e.species??e.itemType;case"tool":return e.toolId??e.itemType;case"egg":return e.eggId??e.itemType;case"decor":return e.decorId??e.itemType;default:return e.itemType}}function My(e,t,n){let r=Ay(e,t),o=n[r]??0,a=Math.max(0,e.initialStock-o);return{id:r,itemType:e.itemType,initialStock:e.initialStock,purchased:o,remaining:a,isAvailable:a>0}}function Iy(e,t,n){if(!t)return{type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null};let o=n[e]?.purchases??{},a=(t.inventory??[]).map(d=>My(d,e,o)),i=a.filter(d=>d.isAvailable).length,s=t.secondsUntilRestock??0,u=s>0?Date.now()+s*1e3:null;return{type:e,items:a,availableCount:i,totalCount:a.length,secondsUntilRestock:s,restockAt:u}}function ql(e){let t=e.shops,n=e.purchases??{},r=hn.map(s=>Iy(s,t?.[s],n)),o={seed:r[0],tool:r[1],egg:r[2],decor:r[3]},a=r.filter(s=>s.restockAt!==null),i=null;if(a.length>0){let u=a.sort((d,l)=>(d.restockAt??0)-(l.restockAt??0))[0];i={shop:u.type,seconds:u.secondsUntilRestock,at:u.restockAt}}return{all:r,byType:o,nextRestock:i}}var Jl={all:hn.map(e=>({type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null})),byType:{seed:{type:"seed",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},tool:{type:"tool",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},egg:{type:"egg",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},decor:{type:"decor",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null}},nextRestock:null};function Yl(e){return JSON.stringify({shops:e.all.map(t=>({type:t.type,itemCount:t.items.length,availableCount:t.availableCount}))})}function Ey(e,t){let n=e.secondsUntilRestock,r=t.secondsUntilRestock;return n>0&&n<=5&&r>n||n>0&&r===0&&t.items.some(a=>a.purchased===0)?{shop:t,previousItems:e.items}:null}function Ly(e,t){let n=[];for(let r of hn){let o=e.byType[r],a=t.byType[r],i=new Map(o.items.map(s=>[s.id,s]));for(let s of a.items){let u=i.get(s.id);u&&s.purchased>u.purchased&&n.push({shopType:r,itemId:s.id,quantity:s.purchased-u.purchased,newPurchased:s.purchased,remaining:s.remaining})}}return n}function Ry(e,t){let n=[];for(let r of hn){let o=e.byType[r],a=t.byType[r],i=new Map(o.items.map(s=>[s.id,s]));for(let s of a.items){let u=i.get(s.id);u&&u.isAvailable!==s.isAvailable&&n.push({shopType:r,itemId:s.id,wasAvailable:u.isAvailable,isAvailable:s.isAvailable})}}return n}function Oy(){let e=Jl,t=Jl,n=!1,r=[],o={all:new Set,stable:new Set,seedRestock:new Set,toolRestock:new Set,eggRestock:new Set,decorRestock:new Set,purchase:new Set,availability:new Set},a={},i=new Set,s=2;function u(){if(i.size<s)return;let l=ql(a);if(xe(e,l)||(t=e,e=l,!n))return;for(let f of o.all)f(e,t);if(Yl(t)!==Yl(e))for(let f of o.stable)f(e,t);let c={seed:o.seedRestock,tool:o.toolRestock,egg:o.eggRestock,decor:o.decorRestock};for(let f of hn){let g=Ey(t.byType[f],e.byType[f]);if(g)for(let b of c[f])b(g)}let p=Ly(t,e);for(let f of p)for(let g of o.purchase)g(f);let m=Ry(t,e);for(let f of m)for(let g of o.availability)g(f)}async function d(){if(n)return;let l=await Ar.onChangeNow(p=>{a.shops=p,i.add("shops"),u()});r.push(l);let c=await Mr.onChangeNow(p=>{a.purchases=p,i.add("purchases"),u()});r.push(c),n=!0,i.size===s&&(e=ql(a))}return d(),{get(){return e},getShop(l){return e.byType[l]},getItem(l,c){return e.byType[l].items.find(m=>m.id===c)??null},subscribe(l,c){return o.all.add(l),c?.immediate!==!1&&n&&i.size===s&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,c){return o.stable.add(l),c?.immediate!==!1&&n&&i.size===s&&l(e,e),()=>o.stable.delete(l)},subscribeSeedRestock(l,c){return o.seedRestock.add(l),c?.immediate&&n&&i.size===s&&l({shop:e.byType.seed,previousItems:[]}),()=>o.seedRestock.delete(l)},subscribeToolRestock(l,c){return o.toolRestock.add(l),c?.immediate&&n&&i.size===s&&l({shop:e.byType.tool,previousItems:[]}),()=>o.toolRestock.delete(l)},subscribeEggRestock(l,c){return o.eggRestock.add(l),c?.immediate&&n&&i.size===s&&l({shop:e.byType.egg,previousItems:[]}),()=>o.eggRestock.delete(l)},subscribeDecorRestock(l,c){return o.decorRestock.add(l),c?.immediate&&n&&i.size===s&&l({shop:e.byType.decor,previousItems:[]}),()=>o.decorRestock.delete(l)},subscribePurchase(l,c){if(o.purchase.add(l),c?.immediate&&n&&i.size===s)for(let p of e.all)for(let m of p.items)m.purchased>0&&l({shopType:p.type,itemId:m.id,quantity:m.purchased,newPurchased:m.purchased,remaining:m.remaining});return()=>o.purchase.delete(l)},subscribeAvailability(l,c){if(o.availability.add(l),c?.immediate&&n&&i.size===s)for(let p of e.all)for(let m of p.items)l({shopType:p.type,itemId:m.id,wasAvailable:m.isAvailable,isAvailable:m.isAvailable});return()=>o.availability.delete(l)},destroy(){for(let l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.seedRestock.clear(),o.toolRestock.clear(),o.eggRestock.clear(),o.decorRestock.clear(),o.purchase.clear(),o.availability.clear(),n=!1}}}var ba=null;function ha(){return ba||(ba=Oy()),ba}var Dy=["Sunny","Rain","Frost","Dawn","AmberMoon"];function Hy(e){return Dy.includes(e)}var va={type:"Sunny",isActive:!1,startTime:null,endTime:null,remainingSeconds:0};function Gy(e){if(!e)return va;let t=Date.now(),n=e.endTime??0,r=Math.max(0,n-t),o=Math.floor(r/1e3),a=o>0,i=e.type??"Sunny";return{type:Hy(i)?i:"Sunny",isActive:a,startTime:e.startTime??null,endTime:e.endTime??null,remainingSeconds:o}}function Ny(){let e=va,t=va,n=!1,r=null,o={all:new Set,change:new Set};function a(s){let u=Gy(s);if(e.type===u.type&&e.isActive===u.isActive&&e.startTime===u.startTime&&e.endTime===u.endTime){e=u;return}if(t=e,e=u,!!n){for(let d of o.all)d(e,t);if(t.type!==e.type||t.isActive!==e.isActive){let d={current:e,previous:t};for(let l of o.change)l(d)}}}async function i(){n||(r=await Ir.onChangeNow(s=>{a(s)}),n=!0)}return i(),{get(){return e},subscribe(s,u){return o.all.add(s),u?.immediate!==!1&&n&&s(e,e),()=>o.all.delete(s)},subscribeChange(s,u){return o.change.add(s),u?.immediate&&n&&s({current:e,previous:e}),()=>o.change.delete(s)},destroy(){r?.(),r=null,o.all.clear(),o.change.clear(),n=!1}}}var ya=null;function xa(){return ya||(ya=Ny()),ya}function _y(){let e=ge.get("mutations");return e?Object.keys(e):[]}function ec(){let e={};for(let t of _y())e[t]=[];return e}function wa(){return{garden:null,mySlotIndex:null,plants:{all:[],mature:[],growing:[],bySpecies:{},count:0},crops:{all:[],mature:[],growing:[],mutated:{all:[],byMutation:ec()}},eggs:{all:[],mature:[],growing:[],byType:{},count:0},decors:{tileObjects:[],boardwalk:[],all:[],byType:{},count:0},tiles:{tileObjects:[],boardwalk:[],empty:{tileObjects:[],boardwalk:[]}},counts:{plants:0,maturePlants:0,crops:0,matureCrops:0,eggs:0,matureEggs:0,decors:0,emptyTileObjects:0,emptyBoardwalk:0}}}function Wy(e,t,n,r){let o=t.slots.filter(a=>r>=a.endTime).length;return{tileIndex:e,position:n,species:t.species,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:r>=t.maturedAt,slots:t.slots,slotsCount:t.slots.length,matureSlotsCount:o}}function By(e,t,n,r,o){return{tileIndex:e,position:t,slotIndex:n,species:r.species,startTime:r.startTime,endTime:r.endTime,targetScale:r.targetScale,mutations:[...r.mutations],isMature:o>=r.endTime}}function jy(e,t,n,r){return{tileIndex:e,position:n,eggId:t.eggId,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:r>=t.maturedAt}}function Xl(e,t,n,r){return{tileIndex:e,position:n,decorId:t.decorId,rotation:t.rotation,location:r}}function Ql(e,t){let{garden:n,mySlotIndex:r}=e,o=Date.now();if(!n||r===null)return wa();let a=t().get(),i=a?.userSlots[r],s=i?.dirtTiles??[],u=i?.boardwalkTiles??[],d=[],l=[],c=[],p={},m=[],f=[],g=[],b=[],h=ec(),S=[],v=[],y=[],k={},T=[],A=[],I={},E=new Set,R=new Set;for(let[K,X]of Object.entries(n.tileObjects)){let se=parseInt(K,10);E.add(se);let N=a?a.globalToXY(se):{x:0,y:0};if(X.objectType==="plant"){let G=X,H=Wy(K,G,N,o);d.push(H),H.isMature?l.push(H):c.push(H),p[H.species]||(p[H.species]=[]),p[H.species].push(H);for(let C=0;C<G.slots.length;C++){let O=G.slots[C],D=By(K,N,C,O,o);if(m.push(D),D.isMature?f.push(D):g.push(D),D.mutations.length>0){b.push(D);for(let _ of D.mutations)h[_]||(h[_]=[]),h[_].push(D)}}}else if(X.objectType==="egg"){let H=jy(K,X,N,o);S.push(H),k[H.eggId]||(k[H.eggId]=[]),k[H.eggId].push(H),H.isMature?v.push(H):y.push(H)}else if(X.objectType==="decor"){let H=Xl(K,X,N,"tileObjects");T.push(H),I[H.decorId]||(I[H.decorId]=[]),I[H.decorId].push(H)}}for(let[K,X]of Object.entries(n.boardwalkTileObjects)){let se=parseInt(K,10);R.add(se);let N=a?a.globalToXY(se):{x:0,y:0},H=Xl(K,X,N,"boardwalk");A.push(H),I[H.decorId]||(I[H.decorId]=[]),I[H.decorId].push(H)}let L=[...T,...A],$=s.filter(K=>!E.has(K.localIndex)),oe=u.filter(K=>!R.has(K.localIndex));return{garden:n,mySlotIndex:r,plants:{all:d,mature:l,growing:c,bySpecies:p,count:d.length},crops:{all:m,mature:f,growing:g,mutated:{all:b,byMutation:h}},eggs:{all:S,mature:v,growing:y,byType:k,count:S.length},decors:{tileObjects:T,boardwalk:A,all:L,byType:I,count:L.length},tiles:{tileObjects:s,boardwalk:u,empty:{tileObjects:$,boardwalk:oe}},counts:{plants:d.length,maturePlants:l.length,crops:m.length,matureCrops:f.length,eggs:S.length,matureEggs:v.length,decors:L.length,emptyTileObjects:$.length,emptyBoardwalk:oe.length}}}function Zl(e){return JSON.stringify({plants:e.counts.plants,maturePlants:e.counts.maturePlants,crops:e.counts.crops,matureCrops:e.counts.matureCrops,eggs:e.counts.eggs,matureEggs:e.counts.matureEggs,decors:e.counts.decors,emptyTileObjects:e.counts.emptyTileObjects,emptyBoardwalk:e.counts.emptyBoardwalk})}function zy(e,t){let n=new Set(e.map(i=>i.tileIndex)),r=new Set(t.map(i=>i.tileIndex)),o=t.filter(i=>!n.has(i.tileIndex)),a=e.filter(i=>!r.has(i.tileIndex));return{added:o,removed:a}}function Fy(e,t,n){let r=new Set(e.map(a=>a.tileIndex)),o=new Set(n.map(a=>a.tileIndex));return t.filter(a=>!r.has(a.tileIndex)&&o.has(a.tileIndex))}function Uy(e,t,n){let r=new Set(e.map(a=>`${a.tileIndex}:${a.slotIndex}`)),o=new Set(n.map(a=>`${a.tileIndex}:${a.slotIndex}`));return t.filter(a=>{let i=`${a.tileIndex}:${a.slotIndex}`;return!r.has(i)&&o.has(i)})}function Vy(e,t,n){let r=new Set(e.map(a=>a.tileIndex)),o=new Set(n.map(a=>a.tileIndex));return t.filter(a=>!r.has(a.tileIndex)&&o.has(a.tileIndex))}function $y(e,t){let n=[],r=new Map(e.map(o=>[o.tileIndex,o]));for(let o of t){let a=r.get(o.tileIndex);if(!a)continue;let i=Math.min(a.slots.length,o.slots.length);for(let s=0;s<i;s++){let u=new Set(a.slots[s].mutations),d=new Set(o.slots[s].mutations),l=[...d].filter(p=>!u.has(p)),c=[...u].filter(p=>!d.has(p));if(l.length>0||c.length>0){let p=Date.now(),m=o.slots[s],f={tileIndex:o.tileIndex,position:o.position,slotIndex:s,species:m.species,startTime:m.startTime,endTime:m.endTime,targetScale:m.targetScale,mutations:[...m.mutations],isMature:p>=m.endTime};n.push({crop:f,added:l,removed:c})}}}return n}function Ky(e,t,n){let r=[],o=new Map(t.map(i=>[i.tileIndex,i])),a=new Map;for(let i of n)a.set(`${i.tileIndex}:${i.slotIndex}`,i);for(let i of e){let s=o.get(i.tileIndex);if(!s)continue;let u=Math.min(i.slots.length,s.slots.length);for(let d=0;d<u;d++){let l=i.slots[d],c=s.slots[d];if(l.startTime!==c.startTime){let p=a.get(`${i.tileIndex}:${d}`);if(!p||!p.isMature)continue;let m={tileIndex:i.tileIndex,position:i.position,slotIndex:d,species:l.species,startTime:l.startTime,endTime:l.endTime,targetScale:l.targetScale,mutations:[...l.mutations],isMature:!0};r.push({crop:m,remainingSlots:s.slotsCount})}}if(s.slotsCount<i.slotsCount)for(let d=s.slotsCount;d<i.slotsCount;d++){let l=a.get(`${i.tileIndex}:${d}`);if(!l||!l.isMature)continue;let c=i.slots[d];if(!c)continue;let p={tileIndex:i.tileIndex,position:i.position,slotIndex:d,species:c.species,startTime:c.startTime,endTime:c.endTime,targetScale:c.targetScale,mutations:[...c.mutations],isMature:!0};r.push({crop:p,remainingSlots:s.slotsCount})}}return r}function qy(e,t){let n=new Set(e.map(i=>i.tileIndex)),r=new Set(t.map(i=>i.tileIndex)),o=t.filter(i=>!n.has(i.tileIndex)),a=e.filter(i=>!r.has(i.tileIndex));return{added:o,removed:a}}function Jy(e,t){let n=u=>`${u.tileIndex}:${u.location}`,r=u=>`${u.tileIndex}:${u.location}`,o=new Set(e.map(n)),a=new Set(t.map(r)),i=t.filter(u=>!o.has(r(u))),s=e.filter(u=>!a.has(n(u)));return{added:i,removed:s}}function Yy(){let e=wa(),t=wa(),n=!1,r=[],o={all:new Set,stable:new Set,plantAdded:new Set,plantRemoved:new Set,plantMatured:new Set,cropMutated:new Set,cropMatured:new Set,cropHarvested:new Set,eggPlaced:new Set,eggRemoved:new Set,eggMatured:new Set,decorPlaced:new Set,decorRemoved:new Set},a={},i=new Set,s=2;function u(){if(i.size<s)return;let l=Ql(a,Dt);if(xe(e,l)||(t=e,e=l,!n))return;for(let v of o.all)v(e,t);if(Zl(t)!==Zl(e))for(let v of o.stable)v(e,t);let c=zy(t.plants.all,e.plants.all);for(let v of c.added)for(let y of o.plantAdded)y({plant:v});for(let v of c.removed)for(let y of o.plantRemoved)y({plant:v,tileIndex:v.tileIndex});let p=Fy(t.plants.mature,e.plants.mature,e.plants.all);for(let v of p)for(let y of o.plantMatured)y({plant:v});let m=$y(t.plants.all,e.plants.all);for(let v of m)for(let y of o.cropMutated)y(v);let f=Uy(t.crops.mature,e.crops.mature,e.crops.all);for(let v of f)for(let y of o.cropMatured)y({crop:v});let g=Ky(t.plants.all,e.plants.all,t.crops.all);for(let v of g)for(let y of o.cropHarvested)y(v);let b=qy(t.eggs.all,e.eggs.all);for(let v of b.added)for(let y of o.eggPlaced)y({egg:v});for(let v of b.removed)for(let y of o.eggRemoved)y({egg:v});let h=Vy(t.eggs.mature,e.eggs.mature,e.eggs.all);for(let v of h)for(let y of o.eggMatured)y({egg:v});let S=Jy(t.decors.all,e.decors.all);for(let v of S.added)for(let y of o.decorPlaced)y({decor:v});for(let v of S.removed)for(let y of o.decorRemoved)y({decor:v})}async function d(){if(n)return;let l=await Pr.onChangeNow(p=>{a.garden=p,i.add("garden"),u()});r.push(l);let c=await Y.subscribe("myUserSlotIdxAtom",p=>{a.mySlotIndex=p,i.add("mySlotIndex"),u()});r.push(c),n=!0,i.size===s&&(e=Ql(a,Dt))}return d(),{get(){return e},subscribe(l,c){return o.all.add(l),c?.immediate!==!1&&n&&i.size===s&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,c){return o.stable.add(l),c?.immediate!==!1&&n&&i.size===s&&l(e,e),()=>o.stable.delete(l)},subscribePlantAdded(l,c){if(o.plantAdded.add(l),c?.immediate&&n&&i.size===s)for(let p of e.plants.all)l({plant:p});return()=>o.plantAdded.delete(l)},subscribePlantRemoved(l,c){return o.plantRemoved.add(l),()=>o.plantRemoved.delete(l)},subscribePlantMatured(l,c){if(o.plantMatured.add(l),c?.immediate&&n&&i.size===s)for(let p of e.plants.mature)l({plant:p});return()=>o.plantMatured.delete(l)},subscribeCropMutated(l,c){if(o.cropMutated.add(l),c?.immediate&&n&&i.size===s)for(let p of e.crops.mutated.all)l({crop:p,added:p.mutations,removed:[]});return()=>o.cropMutated.delete(l)},subscribeCropMatured(l,c){if(o.cropMatured.add(l),c?.immediate&&n&&i.size===s)for(let p of e.crops.mature)l({crop:p});return()=>o.cropMatured.delete(l)},subscribeCropHarvested(l,c){return o.cropHarvested.add(l),()=>o.cropHarvested.delete(l)},subscribeEggPlaced(l,c){if(o.eggPlaced.add(l),c?.immediate&&n&&i.size===s)for(let p of e.eggs.all)l({egg:p});return()=>o.eggPlaced.delete(l)},subscribeEggRemoved(l,c){return o.eggRemoved.add(l),()=>o.eggRemoved.delete(l)},subscribeEggMatured(l,c){if(o.eggMatured.add(l),c?.immediate&&n&&i.size===s)for(let p of e.eggs.mature)l({egg:p});return()=>o.eggMatured.delete(l)},subscribeDecorPlaced(l,c){if(o.decorPlaced.add(l),c?.immediate&&n&&i.size===s)for(let p of e.decors.all)l({decor:p});return()=>o.decorPlaced.delete(l)},subscribeDecorRemoved(l,c){return o.decorRemoved.add(l),()=>o.decorRemoved.delete(l)},destroy(){for(let l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.plantAdded.clear(),o.plantRemoved.clear(),o.plantMatured.clear(),o.cropMutated.clear(),o.cropMatured.clear(),o.cropHarvested.clear(),o.eggPlaced.clear(),o.eggRemoved.clear(),o.eggMatured.clear(),o.decorPlaced.clear(),o.decorRemoved.clear(),n=!1}}}var Sa=null;function Ta(){return Sa||(Sa=Yy()),Sa}var Se=null;function Mo(){return Se||(Se={currentTile:sa(),myPets:ca(),gameMap:Dt(),myInventory:pa(),players:fa(),shops:ha(),weather:xa(),myGarden:Ta()},Se)}function Fe(){if(!Se)throw new Error("[Globals] Not initialized. Call initGlobals() first.");return Se}function tc(){Se&&(Se.currentTile.destroy(),Se.myPets.destroy(),Se.gameMap.destroy(),Se.myInventory.destroy(),Se.players.destroy(),Se.shops.destroy(),Se.weather.destroy(),Se.myGarden.destroy(),Se=null)}var Io={get currentTile(){return Fe().currentTile},get myPets(){return Fe().myPets},get gameMap(){return Fe().gameMap},get myInventory(){return Fe().myInventory},get players(){return Fe().players},get shops(){return Fe().shops},get weather(){return Fe().weather},get myGarden(){return Fe().myGarden}};var yn=class{constructor(){le(this,"logs",[]);le(this,"maxLogs",1e3);le(this,"unsubscribe",null);le(this,"isInitialized",!1)}init(){this.isInitialized||(this.unsubscribe=Io.myPets.subscribeAbility(t=>{this.log({abilityId:t.trigger.abilityId||"unknown",petId:t.pet.id,petSpecies:t.pet.petSpecies,petName:t.pet.name,timestamp:t.trigger.performedAt||Date.now()})}),this.isInitialized=!0)}log(t){let n={...t,id:`${t.timestamp}-${Math.random().toString(36).substr(2,9)}`};this.logs.push(n),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs))}getLogs(t){let n=this.logs;t?.abilityId&&(n=n.filter(o=>o.abilityId===t.abilityId)),t?.petId&&(n=n.filter(o=>o.petId===t.petId)),t?.petSpecies&&(n=n.filter(o=>o.petSpecies===t.petSpecies));let{since:r}=t??{};return r!==void 0&&(n=n.filter(o=>o.timestamp>=r)),t?.limit&&(n=n.slice(-t.limit)),n}getStats(t=36e5){let n=Date.now()-t,r=this.logs.filter(a=>a.timestamp>=n),o=new Map;for(let a of r){o.has(a.abilityId)||o.set(a.abilityId,{abilityId:a.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});let i=o.get(a.abilityId);i.count++,(!i.lastProc||a.timestamp>i.lastProc)&&(i.lastProc=a.timestamp)}for(let a of o.values())a.procsPerMinute=a.count/t*6e4,a.procsPerHour=a.count/t*36e5;return o}getAbilityStats(t,n=36e5){return this.getStats(n).get(t)||null}getPetStats(t,n=36e5){let r=Date.now()-n,o=this.logs.filter(i=>i.petId===t&&i.timestamp>=r),a=new Map;for(let i of o){a.has(i.abilityId)||a.set(i.abilityId,{abilityId:i.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});let s=a.get(i.abilityId);s.count++,(!s.lastProc||i.timestamp>s.lastProc)&&(s.lastProc=i.timestamp)}for(let i of a.values())i.procsPerMinute=i.count/n*6e4,i.procsPerHour=i.count/n*36e5;return{totalProcs:o.length,abilities:a}}getTopAbilities(t=10,n=36e5){return Array.from(this.getStats(n).values()).sort((o,a)=>a.count-o.count).slice(0,t)}clear(){this.logs=[]}setMaxLogs(t){this.maxLogs=t,this.logs.length>t&&(this.logs=this.logs.slice(-t))}getLogCount(){return this.logs.length}isActive(){return this.isInitialized}destroy(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null),this.logs=[],this.isInitialized=!1}},vt=null;function nc(){return vt||(vt=new yn,vt.init()),vt}function oc(){vt&&(vt.destroy(),vt=null)}var vn=class{constructor(){le(this,"stats");le(this,"storageKey","gemini_stats");this.stats=this.loadStats(),this.startSession()}loadStats(){try{let t=localStorage.getItem(this.storageKey);if(t)return JSON.parse(t)}catch(t){console.warn("[StatsTracker] Failed to load stats:",t)}return this.getDefaultStats()}saveStats(){try{localStorage.setItem(this.storageKey,JSON.stringify(this.stats))}catch(t){console.warn("[StatsTracker] Failed to save stats:",t)}}getDefaultStats(){return{session:{sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},allTime:{totalSessions:0,totalPlayTime:0,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0,crops:{},pets:{}}}}startSession(){this.stats.session={sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},this.stats.allTime.totalSessions++,this.saveStats()}endSession(){this.stats.session.sessionEnd=Date.now();let t=this.stats.session.sessionEnd-this.stats.session.sessionStart;this.stats.allTime.totalPlayTime+=t,this.saveStats()}recordHarvest(t,n=1,r=[]){this.stats.session.cropsHarvested+=n,this.stats.allTime.cropsHarvested+=n,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].harvested+=n;for(let o of r)this.stats.allTime.crops[t].mutations[o]||(this.stats.allTime.crops[t].mutations[o]=0),this.stats.allTime.crops[t].mutations[o]++;this.saveStats()}recordCropSale(t,n=1,r=0){this.stats.session.cropsSold+=n,this.stats.session.coinsEarned+=r,this.stats.allTime.cropsSold+=n,this.stats.allTime.coinsEarned+=r,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].sold+=n,this.stats.allTime.crops[t].totalValue+=r,this.saveStats()}recordPetHatch(t,n=[],r=[]){this.stats.session.petsHatched++,this.stats.allTime.petsHatched++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].hatched++;for(let o of n)this.stats.allTime.pets[t].mutations[o]||(this.stats.allTime.pets[t].mutations[o]=0),this.stats.allTime.pets[t].mutations[o]++;for(let o of r)this.stats.allTime.pets[t].abilities[o]||(this.stats.allTime.pets[t].abilities[o]=0),this.stats.allTime.pets[t].abilities[o]++;this.saveStats()}recordPetSale(t,n=0){this.stats.session.petsSold++,this.stats.session.coinsEarned+=n,this.stats.allTime.petsSold++,this.stats.allTime.coinsEarned+=n,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].sold++,this.saveStats()}recordPetFeed(t){this.stats.session.petsFed++,this.stats.allTime.petsFed++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].fed++,this.saveStats()}recordSeedPurchase(t,n=1,r=0){this.stats.session.seedsPurchased+=n,this.stats.session.coinsSpent+=r,this.stats.allTime.seedsPurchased+=n,this.stats.allTime.coinsSpent+=r,this.saveStats()}recordEggPurchase(t,n=1,r=0){this.stats.session.eggsPurchased+=n,this.stats.session.coinsSpent+=r,this.stats.allTime.eggsPurchased+=n,this.stats.allTime.coinsSpent+=r,this.saveStats()}recordAbilityProc(t){this.stats.session.abilityProcs++,this.stats.allTime.abilityProcs++,this.saveStats()}recordCoinsEarned(t){this.stats.session.coinsEarned+=t,this.stats.allTime.coinsEarned+=t,this.saveStats()}recordCoinsSpent(t){this.stats.session.coinsSpent+=t,this.stats.allTime.coinsSpent+=t,this.saveStats()}getStats(){return{...this.stats}}getSessionStats(){return{...this.stats.session}}getAllTimeStats(){return{...this.stats.allTime}}getCropStats(t){return this.stats.allTime.crops[t]||null}getPetStats(t){return this.stats.allTime.pets[t]||null}getTopCrops(t=10){return Object.entries(this.stats.allTime.crops).map(([n,r])=>({species:n,stats:r})).sort((n,r)=>r.stats.harvested-n.stats.harvested).slice(0,t)}getTopPets(t=10){return Object.entries(this.stats.allTime.pets).map(([n,r])=>({species:n,stats:r})).sort((n,r)=>r.stats.hatched-n.stats.hatched).slice(0,t)}resetSession(){this.startSession()}resetAll(){this.stats=this.getDefaultStats(),this.saveStats()}exportStats(){return JSON.stringify(this.stats,null,2)}importStats(t){try{let n=JSON.parse(t);return this.stats=n,this.saveStats(),!0}catch(n){return console.warn("[StatsTracker] Failed to import stats:",n),!1}}},Ht=null;function rc(){return Ht||(Ht=new vn),Ht}function ac(){Ht&&(Ht.endSession(),Ht=null)}var ic={AbilityLogger:yn,getAbilityLogger:nc,destroyAbilityLogger:oc,...aa},sc={StatsTracker:vn,getStatsTracker:rc,destroyStatsTracker:ac};async function lc(e){let t=[{name:"Data",init:()=>ge.init()},{name:"AntiAfk",init:()=>Xt.init()},{name:"CustomModal",init:()=>an.init()},{name:"Sprites",init:()=>me.init()},{name:"TileObjectSystem",init:()=>ze.init()},{name:"Pixi",init:()=>ln.init()},{name:"Audio",init:()=>mn.init()},{name:"Cosmetics",init:()=>gn.init()}];await Promise.all(t.map(async n=>{e?.({status:"start",name:n.name});try{await n.init(),e?.({status:"success",name:n.name})}catch(r){console.error(`[${n.name}] failed`,r),e?.({status:"error",name:n.name,error:r})}})),console.log("[Gemini] Modules ready. Access via Gemini.Modules in console.")}function V(e,t={},n=P){return Ms(e,t,n)}function cc(e,t=P){return V(M.Chat,{scopePath:["Room"],message:e},t)}function uc(e,t=P){return V(M.Emote,{scopePath:["Room"],emoteType:e},t)}function dc(e,t=P){return V(M.Wish,{wish:e},t)}function pc(e,t=P){return V(M.KickPlayer,{scopePath:["Room"],playerId:e},t)}function mc(e,t=P){return V(M.SetPlayerData,{scopePath:["Room"],data:e},t)}function gc(e=P){return V(M.UsurpHost,{},e)}function fc(e=P){return V(M.ReportSpeakingStart,{},e)}function bc(e,t=P){return V(M.SetSelectedGame,{scopePath:["Room"],gameId:e},t)}function hc(e,t=P){return V(M.VoteForGame,{scopePath:["Room"],gameId:e},t)}function yc(e,t=P){return V(M.RequestGame,{scopePath:["Room"],gameId:e},t)}function vc(e=P){return V(M.RestartGame,{scopePath:["Room"]},e)}function xc(e,t=P){return V(M.Ping,{id:e},t)}function ka(e,t,n=P){return V(M.PlayerPosition,{x:e,y:t},n)}var Sc=ka;function wc(e,t,n=P){return V(M.Teleport,{x:e,y:t},n)}function Tc(e=P){return V(M.CheckWeatherStatus,{},e)}function kc(e,t,n=P){return V(M.MoveInventoryItem,{fromIndex:e,toIndex:t},n)}function Cc(e,t=P){return V(M.DropObject,{slotIndex:e},t)}function Pc(e,t=P){return V(M.PickupObject,{objectId:e},t)}function Ac(e,t,n=P){return V(M.ToggleFavoriteItem,{itemId:e,favorite:t},n)}function Mc(e,t=P){return V(M.PutItemInStorage,{itemId:e},t)}function Ic(e,t=P){return V(M.RetrieveItemFromStorage,{itemId:e},t)}function Ec(e,t,n=P){return V(M.MoveStorageItem,{fromIndex:e,toIndex:t},n)}function Lc(e=P){return V(M.LogItems,{},e)}function Rc(e,t,n,r=P){return V(M.PlantSeed,{seedId:e,x:t,y:n},r)}function Oc(e,t=P){return V(M.WaterPlant,{plantId:e},t)}function Dc(e,t=P){return V(M.HarvestCrop,{cropId:e},t)}function Hc(e=P){return V(M.SellAllCrops,{},e)}function Gc(e,t=P){return V(M.PurchaseDecor,{decorId:e},t)}function Nc(e,t=P){return V(M.PurchaseEgg,{eggId:e},t)}function _c(e,t=P){return V(M.PurchaseTool,{toolId:e},t)}function Wc(e,t=P){return V(M.PurchaseSeed,{seedId:e},t)}function Bc(e,t,n,r=P){return V(M.PlantEgg,{eggId:e,x:t,y:n},r)}function jc(e,t=P){return V(M.HatchEgg,{eggId:e},t)}function zc(e,t,n,r=P){return V(M.PlantGardenPlant,{plantId:e,x:t,y:n},r)}function Fc(e,t,n=P){return V(M.PotPlant,{plantId:e,potId:t},n)}function Uc(e,t,n=P){return V(M.MutationPotion,{potionId:e,targetId:t},n)}function Vc(e,t=P){return V(M.PickupDecor,{decorInstanceId:e},t)}function $c(e,t,n,r=P){return V(M.PlaceDecor,{decorId:e,x:t,y:n},r)}function Kc(e,t=P){return V(M.RemoveGardenObject,{objectId:e},t)}function qc(e,t,n,r=P){return V(M.PlacePet,{petId:e,x:t,y:n},r)}function Jc(e,t,n=P){return V(M.FeedPet,{petId:e,foodItemId:t},n)}function Yc(e,t=P){return V(M.PetPositions,{positions:e},t)}function Xc(e,t,n=P){return V(M.SwapPet,{petIdA:e,petIdB:t},n)}function Qc(e,t=P){return V(M.StorePet,{petId:e},t)}function Zc(e,t,n=P){return V(M.NamePet,{petId:e,name:t},n)}function eu(e,t=P){return V(M.SellPet,{petId:e},t)}var Qy={Store:{select:Y.select.bind(Y),set:Y.set.bind(Y),subscribe:Y.subscribe.bind(Y),subscribeImmediate:Y.subscribeImmediate.bind(Y)},Globals:Io,Modules:{Version:$t,Assets:He,Manifest:Ie,Data:ge,AntiAfk:Xt,Environment:Ae,CustomModal:an,Sprite:me,Tile:ze,Pixi:ln,Audio:mn,Cosmetic:gn,Achievements:wo,Calculators:Po,Pets:ic,Tracker:sc},WebSocket:{chat:cc,emote:uc,wish:dc,kickPlayer:pc,setPlayerData:mc,usurpHost:gc,reportSpeakingStart:fc,setSelectedGame:bc,voteForGame:hc,requestGame:yc,restartGame:vc,ping:xc,checkWeatherStatus:Tc,move:Sc,playerPosition:ka,teleport:wc,moveInventoryItem:kc,dropObject:Cc,pickupObject:Pc,toggleFavoriteItem:Ac,putItemInStorage:Mc,retrieveItemFromStorage:Ic,moveStorageItem:Ec,logItems:Lc,plantSeed:Rc,waterPlant:Oc,harvestCrop:Dc,sellAllCrops:Hc,purchaseDecor:Gc,purchaseEgg:Nc,purchaseTool:_c,purchaseSeed:Wc,plantEgg:Bc,hatchEgg:jc,plantGardenPlant:zc,potPlant:Fc,mutationPotion:Uc,pickupDecor:Vc,placeDecor:$c,removeGardenObject:Kc,placePet:qc,feedPet:Jc,petPositions:Yc,swapPet:Xc,storePet:Qc,namePet:Zc,sellPet:eu},_internal:{getGlobals:Fe,initGlobals:Mo,destroyGlobals:tc}};function tu(){P.Gemini=Qy}function Pa(e){e.logStep("WebSocket","Capturing WebSocket...");let t=null;return t=Qn(n=>{n.ws&&(e.logStep("WebSocket","WebSocket captured","success"),t?.(),t=null)},{intervalMs:250}),_s({debug:!1}),()=>{t?.(),t=null}}async function Aa(e){e.logStep("Atoms","Prewarming Jotai store...");try{await xr(),await no({timeoutMs:8e3,intervalMs:50}),e.logStep("Atoms","Jotai store ready","success")}catch(t){e.logStep("Atoms","Jotai store not captured yet","error"),console.warn("[Bootstrap] Jotai store wait failed",t)}}function Ma(e){e.logStep("Globals","Initializing global variables...");try{Mo(),e.logStep("Globals","Global variables ready","success")}catch(t){e.logStep("Globals","Failed to initialize global variables","error"),console.warn("[Bootstrap] Global variables init failed",t)}}function Ia(e){e.logStep("API","Exposing Gemini API...");try{tu(),e.logStep("API","Gemini API ready","success")}catch(t){e.logStep("API","Failed to expose API","error"),console.warn("[Bootstrap] API init failed",t)}}function Ca(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0)})}async function Ea(e){e.logStep("HUD","Loading HUD preferences..."),await Ca();let t=mr();await Ca();let n=await pr({hostId:"gemini-hud-root",initialWidth:t.width,initialOpen:t.isOpen,onWidthChange:r=>Mt("width",r),onOpenChange:r=>Mt("isOpen",r),themes:Xe,initialTheme:t.theme,onThemeChange:r=>Mt("theme",r),buildSections:r=>rr({applyTheme:r.applyTheme,initialTheme:r.initialTheme,getCurrentTheme:r.getCurrentTheme}),initialTab:t.activeTab,onTabChange:r=>Mt("activeTab",r)});return await Ca(),e.logStep("HUD","HUD ready","success"),n}async function La(e){e.setSubtitle("Activating Gemini modules..."),await lc(t=>{t.status==="start"?e.logStep(t.name,`Loading ${t.name}...`):t.status==="success"?e.logStep(t.name,`${t.name} ready`,"success"):e.logStep(t.name,`${t.name} encountered an issue.`,"error")})}async function Ra(e){e.logStep("Sprites","Warming up sprite cache...");try{me.ready()||await me.init();let t=[],n=ge.get("plants");if(n)for(let i of Object.values(n))i?.seed?.spriteId&&t.push(i.seed.spriteId),i?.plant?.spriteId&&t.push(i.plant.spriteId),i?.crop?.spriteId&&t.push(i.crop.spriteId);let r=ge.get("pets");if(r)for(let i of Object.values(r))i?.spriteId&&t.push(i.spriteId);let o=[...new Set(t)],a=o.length;if(a===0){e.logStep("Sprites","No sprites to warmup","success");return}await me.warmup(o,(i,s)=>{e.logStep("Sprites",`Loading sprites (${i}/${s})...`)},5),e.logStep("Sprites",`${a} sprites loaded`,"success")}catch(t){e.logStep("Sprites","Sprite warmup failed","error"),console.warn("[Bootstrap] Sprite warmup failed",t)}}async function Oa(e){e.logStep("Sections","Preloading UI sections...");try{await or(),e.logStep("Sections","Sections preloaded","success")}catch(t){e.logStep("Sections","Sections preload failed","error"),console.warn("[Bootstrap] Sections preload failed",t)}}(async function(){"use strict";let e=Lo({title:"Gemini is loading",subtitle:"Connecting and preparing modules..."}),t=null;try{t=Pa(e),await Aa(e),Ma(e),Ia(e),await La(e),await Ra(e),await Oa(e),e.succeed("Gemini is ready!")}catch(r){e.fail("Failed to initialize the mod.",r)}finally{t?.()}let n=await Ea(e);Xn({onClick:()=>n.setOpen(!0)})})();})();
