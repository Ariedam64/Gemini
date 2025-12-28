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
"use strict";(()=>{var ir=Object.defineProperty;var Ds=(e,t,n)=>t in e?ir(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Hs=(e,t)=>()=>(e&&(t=e(e=0)),t);var Gs=(e,t)=>{for(var n in t)ir(e,n,{get:t[n],enumerable:!0})};var Se=(e,t,n)=>Ds(e,typeof t!="symbol"?t+"":t,n);var Qi={};Gs(Qi,{clamp:()=>me,clamp01:()=>Vn,sleep:()=>Ce,tryDo:()=>ue,waitWithTimeout:()=>Zt});async function Zt(e,t,n){let r=performance.now();for(;performance.now()-r<t;){let o=await Promise.race([e,Ce(50).then(()=>null)]);if(o!==null)return o}throw new Error(`${n} timeout`)}var Ce,ue,me,Vn,Ae=Hs(()=>{"use strict";Ce=e=>new Promise(t=>setTimeout(t,e)),ue=e=>{try{return e()}catch{return}},me=(e,t,n)=>Math.max(t,Math.min(n,e)),Vn=e=>me(e,0,1)});function w(e,t=null,...n){let r=document.createElement(e);for(let[o,i]of Object.entries(t||{}))i!=null&&(o==="style"?typeof i=="string"?r.setAttribute("style",i):typeof i=="object"&&Object.assign(r.style,i):o.startsWith("on")&&typeof i=="function"?r[o.toLowerCase()]=i:o in r?r[o]=i:r.setAttribute(o,String(i)));for(let o of n)o==null||o===!1||r.appendChild(typeof o=="string"||typeof o=="number"?document.createTextNode(String(o)):o);return r}var _t="https://i.imgur.com/k5WuC32.png",ar="gemini-loader-style",_e="gemini-loader",sr=80;function _s(){if(document.getElementById(ar))return;let e=document.createElement("style");e.id=ar,e.textContent=`
    /* ===== Loader Variables ===== */
    #${_e} {
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
    #${_e} {
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

    #${_e}.gemini-loader--error .gemini-loader__actions {
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
    #${_e}.gemini-loader--closing {
      animation: gemini-loader-fade-out 0.4s ease forwards;
      pointer-events: none;
    }

    #${_e}.gemini-loader--error .gemini-loader__spinner {
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
      #${_e} { padding: 16px 10px; }
      .gemini-loader__card { padding: 16px; }
      .gemini-loader__header { gap: 12px; }
      .gemini-loader__spinner { width: 42px; height: 42px; }
      .gemini-loader__spinner-icon { width: 56px; height: 56px; }
      .gemini-loader__title { font-size: 16px; }
    }
  `,document.head.appendChild(e)}function Nt(e,t,n){let r=w("div",{className:`gemini-loader__log ${n}`},w("div",{className:"gemini-loader__dot"}),w("div",{textContent:t}));for(e.appendChild(r);e.childElementCount>sr;)e.firstElementChild?.remove();e.scrollTop=e.scrollHeight}function Ns(){return new Promise(e=>{if(typeof GM_xmlhttpRequest>"u"){e(_t);return}GM_xmlhttpRequest({method:"GET",url:_t,responseType:"blob",onload:t=>{let n=t.response,r=new FileReader;r.onloadend=()=>e(r.result),r.onerror=()=>e(_t),r.readAsDataURL(n)},onerror:()=>e(_t)})})}function Tn(e={}){let t=Number.isFinite(e.blurPx)?Math.max(4,Number(e.blurPx)):14;_s();let n=w("div",{className:"gemini-loader__subtitle",textContent:e.subtitle??"Initializing the mod..."}),r=w("div",{className:"gemini-loader__logs"}),o=w("img",{className:"gemini-loader__spinner-icon",alt:"Gemini"}),i=w("div",{className:"gemini-loader__spinner"},o);Ns().then(b=>{o.src=b});let a=w("div",{className:"gemini-loader__card"},w("div",{className:"gemini-loader__header"},i,w("div",{className:"gemini-loader__titles"},w("div",{className:"gemini-loader__title",textContent:e.title??"Gemini is loading"}),n)),r),s=w("div",{id:_e},a);(document.body||document.documentElement).appendChild(s);let u=w("div",{className:"gemini-loader__actions"},w("button",{className:"gemini-loader__button",textContent:"Close loader",onclick:()=>s.remove()}));a.appendChild(u),s.style.setProperty("--loader-blur",`${t}px`);let d=b=>{n.textContent=b},l=new Map,c=(b,h)=>{b.className=`gemini-loader__log ${h}`};return{log:(b,h="info")=>Nt(r,b,h),logStep:(b,h,S="info")=>{let T=String(b||"").trim();if(!T){Nt(r,h,S);return}let x=l.get(T);if(x){x.el.lastElementChild&&(x.el.lastElementChild.textContent=h),x.tone!==S&&(c(x.el,S),x.tone=S);return}let v=w("div",{className:`gemini-loader__log ${S}`},w("div",{className:"gemini-loader__dot"}),w("div",{textContent:h}));for(l.set(T,{el:v,tone:S}),r.appendChild(v);r.childElementCount>sr;){let k=r.firstElementChild;if(!k)break;let L=Array.from(l.entries()).find(([,E])=>E.el===k)?.[0];L&&l.delete(L),k.remove()}r.scrollTop=r.scrollHeight},setSubtitle:d,succeed:(b,h=600)=>{b&&Nt(r,b,"success"),s.classList.add("gemini-loader--closing"),setTimeout(()=>s.remove(),h)},fail:(b,h)=>{Nt(r,b,"error"),d("Something went wrong. Check the console for details."),s.classList.add("gemini-loader--error"),console.error("[Gemini loader]",b,h)}}}function lr(e,t,n){let r=w("div",{className:"lg-pill",id:"pill"}),o=e.map(l=>{let c=w("button",{className:"lg-tab"},l.label);return c.setAttribute("data-target",l.id),c}),i=w("div",{className:"lg-tabs",id:"lg-tabs-row"},r,...o),a=i;i.addEventListener("wheel",l=>{Math.abs(l.deltaY)>Math.abs(l.deltaX)&&(l.preventDefault(),i.scrollLeft+=l.deltaY)},{passive:!1});function s(l){let c=i.getBoundingClientRect(),p=o.find(v=>v.dataset.target===l)||o[0];if(!p)return;let m=p.getBoundingClientRect(),f=m.left-c.left,g=m.width;r.style.width=`${g}px`,r.style.transform=`translateX(${f}px)`;let b=i.scrollLeft,h=b,S=b+i.clientWidth,T=f-12,x=f+g+12;T<h?i.scrollTo({left:T,behavior:"smooth"}):x>S&&i.scrollTo({left:x-i.clientWidth,behavior:"smooth"})}let u=t||(e[0]?.id??"");function d(l){u=l,o.forEach(c=>c.classList.toggle("active",c.dataset.target===l)),s(l),n(l)}return o.forEach(l=>l.addEventListener("click",()=>d(l.dataset.target))),queueMicrotask(()=>s(u)),{root:a,activate:d,recalc:()=>s(u),getActive:()=>u}}var Ne=class{constructor(t){Se(this,"id");Se(this,"label");Se(this,"container",null);Se(this,"cleanupFunctions",[]);this.id=t.id,this.label=t.label}render(t){for(this.unmount();t.firstChild;)t.removeChild(t.firstChild);this.container=t;let n=this.build(t);n instanceof Promise&&n.catch(o=>{console.error(`[Gemini] Error building section ${this.id}:`,o)});let r=t.firstElementChild;r&&r.classList.contains("gemini-section")&&r.classList.add("active")}unmount(){this.executeCleanup(),this.container=null}createContainer(t,n){let r=n?`gemini-section ${n}`:"gemini-section";return w("section",{id:t,className:r})}addCleanup(t){this.cleanupFunctions.push(t)}createGrid(t="12px"){let n=w("div");return n.style.display="grid",n.style.gap=t,n}executeCleanup(){for(let t of this.cleanupFunctions)try{t()}catch(n){console.error(`[Gemini] Cleanup error in section ${this.id}:`,n)}this.cleanupFunctions=[]}};var st=class{constructor(t,n,r){Se(this,"sections");Se(this,"activeId",null);Se(this,"container");Se(this,"theme");this.sections=new Map(t.map(o=>[o.id,o])),this.container=n,this.theme=r}get ids(){return Array.from(this.sections.keys())}get all(){return Array.from(this.sections.values())}get active(){return this.activeId}activate(t){if(this.activeId!==t){if(!this.sections.has(t))throw new Error(`[Gemini] Unknown section: ${t}`);if(this.activeId&&this.sections.get(this.activeId).unmount(),this.activeId=t,this.sections.get(t).render(this.container),this.theme){let n=this.theme.getCurrentTheme();this.theme.applyTheme(n)}}}};function lt(e,t){try{let n=JSON.stringify(t);GM_setValue(e,n)}catch(n){console.error(`[Gemini] Failed to save key "${e}" to storage:`,n)}}function Le(e,t){try{let n=GM_getValue(e);return n==null?t:typeof n=="string"?JSON.parse(n):n}catch(n){return console.error(`[Gemini] Failed to load key "${e}" from storage, using default:`,n),t}}var cr="gemini.sections";function ur(){let e=Le(cr,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function Ws(e){lt(cr,e)}async function dr(e){return ur()[e]}function pr(e,t){let n=ur();Ws({...n,[e]:t})}function Wt(e,t){return{...e,...t??{}}}async function mr(e){let t=await dr(e.path),n;e.migrate?n=e.migrate(t):n=t??{},n=Object.assign((d=>JSON.parse(JSON.stringify(d)))(e.defaults),n),e.sanitize&&(n=e.sanitize(n));function o(){pr(e.path,n)}function i(){return n}function a(d){n=e.sanitize?e.sanitize(d):d,o()}function s(d){let c=Object.assign((p=>JSON.parse(JSON.stringify(p)))(n),{});typeof d=="function"?d(c):Object.assign(c,d),n=e.sanitize?e.sanitize(c):c,o()}function u(){o()}return{get:i,set:a,update:s,save:u}}async function ct(e,t){let{path:n=e,...r}=t;return mr({path:n,...r})}var js=0,jt=new Map;function Re(e={},...t){let{id:n,className:r,variant:o="default",padding:i="md",interactive:a=!1,expandable:s=!1,defaultExpanded:u=!0,onExpandChange:d,mediaTop:l,title:c,subtitle:p,badge:m,actions:f,footer:g,divider:b=!1,tone:h="neutral",stateKey:S}=e,T=w("div",{className:"card",id:n,tabIndex:a?0:void 0});T.classList.add(`card--${o}`,`card--p-${i}`),a&&T.classList.add("card--interactive"),h!=="neutral"&&T.classList.add(`card--tone-${h}`),r&&T.classList.add(...r.split(" ").filter(Boolean)),s&&T.classList.add("card--expandable");let x=s?S??n??(typeof c=="string"?`title:${c}`:null):null,v=!s||u;x&&jt.has(x)&&(v=!!jt.get(x));let k=null,L=null,E=null,P=null,R=null,M=n?`${n}-collapse`:`card-collapse-${++js}`,U=()=>{if(P!==null&&(cancelAnimationFrame(P),P=null),R){let D=R;R=null,D()}},J=(D,_)=>{if(!E)return;U();let O=E;if(O.setAttribute("aria-hidden",String(!D)),!_){O.classList.remove("card-collapse--animating"),O.style.display=D?"":"none",O.style.height="",O.style.opacity="";return}if(O.classList.add("card-collapse--animating"),O.style.display="",D){O.style.height="auto";let V=O.scrollHeight;if(!V){O.classList.remove("card-collapse--animating"),O.style.display="",O.style.height="",O.style.opacity="";return}O.style.height="0px",O.style.opacity="0",O.offsetHeight,P=requestAnimationFrame(()=>{P=null,O.style.height=`${V}px`,O.style.opacity="1"})}else{let V=O.scrollHeight;if(!V){O.classList.remove("card-collapse--animating"),O.style.display="none",O.style.height="",O.style.opacity="";return}O.style.height=`${V}px`,O.style.opacity="1",O.offsetHeight,P=requestAnimationFrame(()=>{P=null,O.style.height="0px",O.style.opacity="0"})}let I=()=>{O.classList.remove("card-collapse--animating"),O.style.height="",D||(O.style.display="none"),O.style.opacity=""},G=null,W=V=>{V.target===O&&(G!==null&&(clearTimeout(G),G=null),O.removeEventListener("transitionend",W),O.removeEventListener("transitioncancel",W),R=null,I())};R=()=>{G!==null&&(clearTimeout(G),G=null),O.removeEventListener("transitionend",W),O.removeEventListener("transitioncancel",W),R=null,I()},O.addEventListener("transitionend",W),O.addEventListener("transitioncancel",W),G=window.setTimeout(()=>{R?.()},420)};function K(D){let _=document.createElementNS("http://www.w3.org/2000/svg","svg");return _.setAttribute("viewBox","0 0 24 24"),_.setAttribute("width","16"),_.setAttribute("height","16"),_.innerHTML=D==="up"?'<path d="M7 14l5-5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>':'<path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',_}function N(D,_=!0,O=!0){v=D,T.classList.toggle("card--collapsed",!v),T.classList.toggle("card--expanded",v),k&&(k.dataset.expanded=String(v),k.setAttribute("aria-expanded",String(v))),L&&(L.setAttribute("aria-expanded",String(v)),L.classList.toggle("card-toggle--collapsed",!v),L.setAttribute("aria-label",v?"Replier le contenu":"Deplier le contenu"),L.replaceChildren(K(v?"up":"down"))),s?J(v,O):E&&(E.style.display="",E.style.height="",E.style.opacity="",E.setAttribute("aria-hidden","false")),_&&d&&d(v),x&&jt.set(x,v)}if(l){let D=w("div",{className:"card-media"});D.append(l),T.appendChild(D)}let j=!!(c||p||m||f&&f.length||s);if(j){k=w("div",{className:"card-header"});let D=w("div",{className:"card-headline",style:"min-width:0;display:flex;flex-direction:column;gap:2px;"});if(c){let I=w("h3",{className:"card-title",style:"margin:0;font-size:15px;font-weight:700;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:8px;"},c);m&&I.append(typeof m=="string"?w("span",{className:"badge"},m):m),D.appendChild(I)}if(p){let I=w("div",{className:"card-subtitle",style:"opacity:.85;font-size:12px;color:color-mix(in oklab, var(--fg) 80%, #9ca3af)"},p);D.appendChild(I)}(D.childNodes.length||s)&&k.appendChild(D);let _=w("div",{className:"card-header-right",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"}),O=w("div",{className:"card-actions",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"});f?.forEach(I=>O.appendChild(I)),O.childNodes.length&&_.appendChild(O),s&&(L=w("button",{className:"card-toggle",type:"button",ariaExpanded:String(v),ariaControls:M,ariaLabel:v?"Replier le contenu":"Deplier le contenu"}),L.textContent=v?"\u25B2":"\u25BC",L.addEventListener("click",I=>{I.preventDefault(),I.stopPropagation(),N(!v)}),_.appendChild(L),k.classList.add("card-header--expandable"),k.addEventListener("click",I=>{let G=I.target;G?.closest(".card-actions")||G?.closest(".card-toggle")||N(!v)})),_.childNodes.length&&k.appendChild(_),T.appendChild(k)}E=w("div",{className:"card-collapse",id:M,ariaHidden:s?String(!v):"false"}),T.appendChild(E),b&&j&&E.appendChild(w("div",{className:"card-divider"}));let H=w("div",{className:"card-body"});if(H.append(...t),E.appendChild(H),g){b&&E.appendChild(w("div",{className:"card-divider"}));let D=w("div",{className:"card-footer"});D.append(g),E.appendChild(D)}return L&&L.setAttribute("aria-controls",M),N(v,!1,!1),x&&jt.set(x,v),T}function Pn(...e){return w("div",{className:"card-footer"},...e)}var Bt=!1,Ft=new Set,ge=e=>{let t=document.activeElement;for(let n of Ft)if(t&&(t===n||n.contains(t))){e.stopImmediatePropagation(),e.stopPropagation();return}};function Bs(){Bt||(Bt=!0,window.addEventListener("keydown",ge,!0),window.addEventListener("keypress",ge,!0),window.addEventListener("keyup",ge,!0),document.addEventListener("keydown",ge,!0),document.addEventListener("keypress",ge,!0),document.addEventListener("keyup",ge,!0))}function Fs(){Bt&&(Ft.size>0||(Bt=!1,window.removeEventListener("keydown",ge,!0),window.removeEventListener("keypress",ge,!0),window.removeEventListener("keyup",ge,!0),document.removeEventListener("keydown",ge,!0),document.removeEventListener("keypress",ge,!0),document.removeEventListener("keyup",ge,!0)))}function qe(e){let{id:t,value:n=null,options:r,placeholder:o="Select...",size:i="md",disabled:a=!1,blockGameKeys:s=!0,onChange:u,onOpenChange:d}=e,l=w("div",{className:"select",id:t}),c=w("button",{className:"select-trigger",type:"button"}),p=w("span",{className:"select-value"},o),m=w("span",{className:"select-caret"},"\u25BE");c.append(p,m);let f=w("div",{className:"select-menu",role:"listbox",tabindex:"-1","aria-hidden":"true"});l.classList.add(`select--${i}`);let g=!1,b=n,h=null,S=!!a;function T(I){return I==null?o:(e.options||r).find(W=>W.value===I)?.label??o}function x(I){p.textContent=T(I),f.querySelectorAll(".select-option").forEach(G=>{let W=G.dataset.value,V=I!=null&&W===I;G.classList.toggle("selected",V),G.setAttribute("aria-selected",String(V))})}function v(I){f.replaceChildren(),I.forEach(G=>{let W=w("button",{className:"select-option"+(G.disabled?" disabled":""),type:"button",role:"option","data-value":G.value,"aria-selected":String(G.value===b),tabindex:"-1"},G.label);G.value===b&&W.classList.add("selected"),G.disabled||W.addEventListener("pointerdown",V=>{V.preventDefault(),V.stopPropagation(),M(G.value,{notify:!0}),P()},{capture:!0}),f.appendChild(W)})}function k(){c.setAttribute("aria-expanded",String(g)),f.setAttribute("aria-hidden",String(!g))}function L(){let I=c.getBoundingClientRect();Object.assign(f.style,{minWidth:`${I.width}px`})}function E(){g||S||(g=!0,l.classList.add("open"),k(),L(),document.addEventListener("mousedown",j,!0),document.addEventListener("scroll",H,!0),window.addEventListener("resize",D),f.focus({preventScroll:!0}),s&&(Bs(),Ft.add(l),h=()=>{Ft.delete(l),Fs()}),d?.(!0))}function P(){g&&(g=!1,l.classList.remove("open"),k(),document.removeEventListener("mousedown",j,!0),document.removeEventListener("scroll",H,!0),window.removeEventListener("resize",D),c.focus({preventScroll:!0}),h?.(),h=null,d?.(!1))}function R(){g?P():E()}function M(I,G={}){let W=b;b=I,x(b),G.notify!==!1&&W!==I&&u?.(I)}function U(){return b}function J(I){let G=Array.from(f.querySelectorAll(".select-option:not(.disabled)"));if(!G.length)return;let W=G.findIndex(oe=>oe.classList.contains("active")),V=G[(W+(I===1?1:G.length-1))%G.length];G.forEach(oe=>oe.classList.remove("active")),V.classList.add("active"),V.focus({preventScroll:!0}),V.scrollIntoView({block:"nearest"})}function K(I){(I.key===" "||I.key==="Enter"||I.key==="ArrowDown")&&(I.preventDefault(),E())}function N(I){if(I.key==="Escape"){I.preventDefault(),P();return}if(I.key==="Enter"||I.key===" "){let G=f.querySelector(".select-option.active")||f.querySelector(".select-option.selected");G&&!G.classList.contains("disabled")&&(I.preventDefault(),M(G.dataset.value,{notify:!0}),P());return}if(I.key==="ArrowDown"){I.preventDefault(),J(1);return}if(I.key==="ArrowUp"){I.preventDefault(),J(-1);return}}function j(I){l.contains(I.target)||P()}function H(){g&&L()}function D(){g&&L()}function _(I){S=!!I,c.disabled=S,l.classList.toggle("disabled",S),S&&P()}function O(I){e.options=I,v(I),I.some(G=>G.value===b)||(b=null,x(null))}return l.append(c,f),c.addEventListener("pointerdown",I=>{I.preventDefault(),I.stopPropagation(),R()},{capture:!0}),c.addEventListener("keydown",K),f.addEventListener("keydown",N),v(r),n!=null?(b=n,x(b)):x(null),k(),_(S),{root:l,open:E,close:P,toggle:R,getValue:U,setValue:M,setOptions:O,setDisabled:_,destroy(){document.removeEventListener("mousedown",j,!0),document.removeEventListener("scroll",H,!0),window.removeEventListener("resize",D),h?.(),h=null}}}function Vt(e={}){let{id:t,text:n="",htmlFor:r,tone:o="default",size:i="md",layout:a="inline",variant:s="text",required:u=!1,disabled:d=!1,tooltip:l,hint:c,icon:p,suffix:m,onClick:f}=e,g=w("div",{className:"lg-label-wrap",id:t}),b=w("label",{className:"lg-label",...r?{htmlFor:r}:{},...l?{title:l}:{}});if(p){let M=typeof p=="string"?w("span",{className:"lg-label-ico"},p):p;M.classList?.add?.("lg-label-ico"),b.appendChild(M)}let h=w("span",{className:"lg-label-text"},n);b.appendChild(h);let S=w("span",{className:"lg-label-req",ariaHidden:"true"}," *");u&&b.appendChild(S);let T=null;if(m!=null){T=typeof m=="string"?document.createTextNode(m):m;let M=w("span",{className:"lg-label-suffix"});M.appendChild(T),b.appendChild(M)}let x=c?w("div",{className:"lg-label-hint"},c):null;g.classList.add(`lg-label--${a}`),g.classList.add(`lg-label--${i}`),s==="title"&&g.classList.add("lg-label--title"),v(o),d&&g.classList.add("is-disabled"),g.appendChild(b),x&&g.appendChild(x),f&&b.addEventListener("click",f);function v(M){g.classList.remove("lg-label--default","lg-label--muted","lg-label--info","lg-label--success","lg-label--warning","lg-label--danger"),g.classList.add(`lg-label--${M}`)}function k(M){h.textContent=M}function L(M){v(M)}function E(M){M&&!S.isConnected&&b.appendChild(S),!M&&S.isConnected&&S.remove(),M?b.setAttribute("aria-required","true"):b.removeAttribute("aria-required")}function P(M){g.classList.toggle("is-disabled",!!M)}function R(M){!M&&x&&x.isConnected?x.remove():M&&x?x.textContent=M:M&&!x&&g.appendChild(w("div",{className:"lg-label-hint"},M))}return{root:g,labelEl:b,hintEl:x,setText:k,setTone:L,setRequired:E,setDisabled:P,setHint:R}}function ut(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function Ut(e,t){let n=document.createElement("span");n.className=`btn-ico btn-ico--${t}`;let r=ut(e);return r&&n.appendChild(r),n}function Vs(){let e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.marginRight="6px",t.style.display="none",t.style.flexShrink="0";let n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");let r=document.createElementNS(e,"animate");r.setAttribute("attributeName","stroke-dasharray"),r.setAttribute("values","1,150;90,150;90,150"),r.setAttribute("dur","1.5s"),r.setAttribute("repeatCount","indefinite");let o=document.createElementNS(e,"animateTransform");return o.setAttribute("attributeName","transform"),o.setAttribute("attributeType","XML"),o.setAttribute("type","rotate"),o.setAttribute("from","0 12 12"),o.setAttribute("to","360 12 12"),o.setAttribute("dur","1s"),o.setAttribute("repeatCount","indefinite"),n.appendChild(r),n.appendChild(o),t.appendChild(n),t}function Oe(e={}){let{label:t="",id:n,variant:r="default",size:o="md",iconLeft:i,iconRight:a,loading:s=!1,tooltip:u,type:d="button",onClick:l,disabled:c=!1,fullWidth:p=!1}=e,m=w("button",{className:"btn",id:n});m.type=d,r==="primary"&&m.classList.add("primary"),o==="sm"&&m.classList.add("btn--sm"),u&&(m.title=u),p&&(m.style.width="100%");let f=Vs(),g=i?Ut(i,"left"):null,b=a?Ut(a,"right"):null,h=document.createElement("span");h.className="btn-label";let S=ut(t);S&&h.appendChild(S),!S&&(g||b)&&m.classList.add("btn--icon"),m.appendChild(f),g&&m.appendChild(g),m.appendChild(h),b&&m.appendChild(b);let T=c||s;m.disabled=T,m.setAttribute("aria-busy",String(!!s)),f.style.display=s?"inline-block":"none",l&&m.addEventListener("click",l);let x=m;return x.setLoading=v=>{m.setAttribute("aria-busy",String(!!v)),f.style.display=v?"inline-block":"none",m.disabled=v||c},x.setDisabled=v=>{m.disabled=v||m.getAttribute("aria-busy")==="true"},x.setLabel=v=>{h.replaceChildren();let k=ut(v);k&&h.appendChild(k),!k&&(g||b)?m.classList.add("btn--icon"):m.classList.remove("btn--icon")},x.setIconLeft=v=>{if(v==null){g?.remove();return}g?g.replaceChildren(ut(v)):m.insertBefore(Ut(v,"left"),h)},x.setIconRight=v=>{if(v==null){b?.remove();return}b?b.replaceChildren(ut(v)):m.appendChild(Ut(v,"right"))},x}function Us(){try{let e=window.visualViewport,t=Math.round((e?.width??window.innerWidth)||0),n=Math.round((e?.height??window.innerHeight)||0);if(t&&n)return t>=n?"landscape":"portrait"}catch{}return"unknown"}function zs(){let e=navigator.userAgent||"",t=navigator.platform||"",n=navigator.userAgentData;if(n&&typeof n.platform=="string"){let o=n.platform.toLowerCase();if(o.includes("windows"))return"windows";if(o.includes("mac"))return"mac";if(o.includes("android"))return"android";if(o.includes("chrome os")||o.includes("cros"))return"chromeos";if(o.includes("linux"))return"linux";if(o.includes("ios"))return"ios"}return/iPhone|iPad|iPod/i.test(e)||t==="MacIntel"&&navigator.maxTouchPoints>1?"ios":/Android/i.test(e)?"android":/CrOS/i.test(e)?"chromeos":/Win/i.test(e)?"windows":/Mac/i.test(e)?"mac":/Linux/i.test(e)?"linux":"unknown"}function $s(){let e=navigator.userAgent||"",t=navigator.userAgentData;if(t&&Array.isArray(t.brands)){let n=t.brands.map(a=>String(a.brand||a.brandName||a.brandVersion||a)),r=n.some(a=>/Edge/i.test(a)||/Microsoft Edge/i.test(a)),o=n.some(a=>/Opera/i.test(a)||/OPR/i.test(a)),i=n.some(a=>/Chrome|Chromium/i.test(a));if(r)return"Edge";if(o)return"Opera";if(i)return"Chrome";if(navigator.brave)return"Brave"}return/FxiOS/i.test(e)?"Firefox":/CriOS/i.test(e)?"Chrome":/EdgiOS/i.test(e)?"Edge":/OPiOS|OPR|Opera Mini|Opera/i.test(e)?"Opera":/Edg\//i.test(e)?"Edge":/OPR\//i.test(e)||/Opera/i.test(e)?"Opera":/Firefox/i.test(e)?"Firefox":/Safari/i.test(e)&&!/Chrome|Chromium|Edg|OPR/i.test(e)?"Safari":/Brave/i.test(e)||window.Brave||navigator.brave?"Brave":/Chrome|Chromium/i.test(e)?"Chrome":"Unknown"}function Ks(){let e=navigator.userAgent||"",t=navigator.userAgentData;return t&&typeof t.mobile=="boolean"?t.mobile?"mobile":"desktop":/Android|iPhone|iPad|iPod|Mobile/i.test(e)?"mobile":"desktop"}function ye(){let e=(()=>{try{return window.top!==window.self}catch{return!0}})(),t=qs(document.referrer),r=e&&!!t&&/(^|\.)discord(app)?\.com$/i.test(t)?"discord":"web",o=Ks(),i=zs(),a=$s(),s=window.screen||{},u=window.visualViewport,d=Math.round(window.innerWidth||document.documentElement.clientWidth||0),l=Math.round(window.innerHeight||document.documentElement.clientHeight||0),c=Math.round(u?.width??d),p=Math.round(u?.height??l),m=Math.round(s.width||0),f=Math.round(s.height||0),g=Math.round(s.availWidth||m),b=Math.round(s.availHeight||f),h=Number.isFinite(window.devicePixelRatio)?window.devicePixelRatio:1;return{surface:r,host:location.hostname,origin:location.origin,isInIframe:e,platform:o,browser:a,os:i,viewportWidth:d,viewportHeight:l,visualViewportWidth:c,visualViewportHeight:p,screenWidth:m,screenHeight:f,availScreenWidth:g,availScreenHeight:b,dpr:h,orientation:Us()}}function fr(){return ye().surface==="discord"}function qs(e){if(!e)return null;try{return new URL(e).hostname}catch{return null}}var zt=!1,dt=new Set;function Js(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}var be=e=>{let t=Js();if(t){for(let n of dt)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function Ys(){zt||(zt=!0,window.addEventListener("keydown",be,!0),window.addEventListener("keypress",be,!0),window.addEventListener("keyup",be,!0),document.addEventListener("keydown",be,!0),document.addEventListener("keypress",be,!0),document.addEventListener("keyup",be,!0))}function Xs(){zt&&(zt=!1,window.removeEventListener("keydown",be,!0),window.removeEventListener("keypress",be,!0),window.removeEventListener("keyup",be,!0),document.removeEventListener("keydown",be,!0),document.removeEventListener("keypress",be,!0),document.removeEventListener("keyup",be,!0))}function Qs(e){return dt.size===0&&Ys(),dt.add(e),()=>{dt.delete(e),dt.size===0&&Xs()}}function Zs(e,t,n,r){let o;switch(e){case"digits":o="0-9";break;case"alpha":o="\\p{L}";break;case"alphanumeric":o="\\p{L}0-9";break;default:return null}return t&&(o+=" "),n&&(o+="\\-"),r&&(o+="_"),new RegExp(`[^${o}]`,"gu")}function el(e,t){return t?e.replace(t,""):e}function tl(e,t=0){if(!t)return e;let n;return((...r)=>{clearTimeout(n),n=setTimeout(()=>e(...r),t)})}function gr(e={}){let{id:t,placeholder:n="",value:r="",mode:o="any",allowSpaces:i=!1,allowDashes:a=!1,allowUnderscore:s=!1,maxLength:u,blockGameKeys:d=!0,debounceMs:l=0,onChange:c,onEnter:p,label:m}=e,f=w("div",{className:"lg-input-wrap"}),g=w("input",{className:"input",id:t,placeholder:n});if(typeof u=="number"&&u>0&&(g.maxLength=u),r&&(g.value=r),m){let M=w("div",{className:"lg-input-label"},m);f.appendChild(M)}f.appendChild(g);let b=Zs(o,i,a,s),h=()=>{let M=g.selectionStart??g.value.length,U=g.value.length,J=el(g.value,b);if(J!==g.value){g.value=J;let K=U-J.length,N=Math.max(0,M-K);g.setSelectionRange(N,N)}},S=tl(()=>c?.(g.value),l);g.addEventListener("input",()=>{h(),S()}),g.addEventListener("paste",()=>queueMicrotask(()=>{h(),S()})),g.addEventListener("keydown",M=>{M.key==="Enter"&&p?.(g.value)});let T=d?Qs(g):()=>{};function x(){return g.value}function v(M){g.value=M??"",h(),S()}function k(){g.focus()}function L(){g.blur()}function E(M){g.disabled=!!M}function P(){return document.activeElement===g}function R(){T()}return{root:f,input:g,getValue:x,setValue:v,focus:k,blur:L,setDisabled:E,isFocused:P,destroy:R}}function ne(e,t,n){return Math.min(n,Math.max(t,e))}function mt({h:e,s:t,v:n,a:r}){let o=(e%360+360)%360/60,i=n*t,a=i*(1-Math.abs(o%2-1)),s=0,u=0,d=0;switch(Math.floor(o)){case 0:s=i,u=a;break;case 1:s=a,u=i;break;case 2:u=i,d=a;break;case 3:u=a,d=i;break;case 4:s=a,d=i;break;default:s=i,d=a;break}let c=n-i,p=Math.round((s+c)*255),m=Math.round((u+c)*255),f=Math.round((d+c)*255);return{r:ne(p,0,255),g:ne(m,0,255),b:ne(f,0,255),a:ne(r,0,1)}}function br({r:e,g:t,b:n,a:r}){let o=ne(e,0,255)/255,i=ne(t,0,255)/255,a=ne(n,0,255)/255,s=Math.max(o,i,a),u=Math.min(o,i,a),d=s-u,l=0;d!==0&&(s===o?l=60*((i-a)/d%6):s===i?l=60*((a-o)/d+2):l=60*((o-i)/d+4)),l<0&&(l+=360);let c=s===0?0:d/s;return{h:l,s:c,v:s,a:ne(r,0,1)}}function An({r:e,g:t,b:n}){let r=o=>ne(Math.round(o),0,255).toString(16).padStart(2,"0");return`#${r(e)}${r(t)}${r(n)}`.toUpperCase()}function nl({r:e,g:t,b:n,a:r}){let o=ne(Math.round(r*255),0,255);return`${An({r:e,g:t,b:n,a:r})}${o.toString(16).padStart(2,"0")}`.toUpperCase()}function pt({r:e,g:t,b:n,a:r}){let o=Math.round(r*1e3)/1e3;return`rgba(${e}, ${t}, ${n}, ${o})`}function Je(e){let t=e.trim();if(!t||(t.startsWith("#")&&(t=t.slice(1)),![3,4,6,8].includes(t.length))||!/^[0-9a-fA-F]+$/.test(t))return null;(t.length===3||t.length===4)&&(t=t.split("").map(a=>a+a).join(""));let n=255;t.length===8&&(n=parseInt(t.slice(6,8),16),t=t.slice(0,6));let r=parseInt(t.slice(0,2),16),o=parseInt(t.slice(2,4),16),i=parseInt(t.slice(4,6),16);return{r,g:o,b:i,a:n/255}}function Cn(e){if(!e)return null;let t=e.trim();if(t.startsWith("#"))return Je(t);let n=t.match(/^rgba?\(([^)]+)\)$/i);if(n){let r=n[1].split(",").map(u=>u.trim());if(r.length<3)return null;let o=Number(r[0]),i=Number(r[1]),a=Number(r[2]),s=r[3]!=null?Number(r[3]):1;return[o,i,a,s].some(u=>Number.isNaN(u))?null:{r:o,g:i,b:a,a:s}}return null}function ol(e,t){let n=Cn(e)??Je(e??"")??{r:244,g:67,b:54,a:1};return typeof t=="number"&&(n.a=ne(t,0,1)),br(n)}function rl(e){return`#${e.trim().replace(/[^0-9a-fA-F#]/g,"").replace(/#/g,"")}`.slice(0,9).toUpperCase()}function il(e){let t=e.trim();return t&&(/^rgba?\s*\(/i.test(t)?t=t.replace(/^rgba?/i,"rgba"):(t=t.replace(/^\(?(.*)\)?$/,"$1"),t=`rgba(${t})`),t=t.replace(/\s*\(\s*/,"("),t=t.replace(/\s*\)\s*$/,")"),t=t.replace(/\s*,\s*/g,", "),t)}function We(e){let t=mt(e),n=mt({...e,a:1});return{hsva:{...e},hex:An(n),hexa:nl(t),rgba:pt(t),alpha:e.a}}function hr(e={}){let{id:t,label:n="Color",value:r,alpha:o,defaultExpanded:i=!1,detectMobile:a,onInput:s,onChange:u}=e,l=a?a():ye().platform==="mobile",c=ol(r,o),p=Re({id:t,className:"color-picker",title:n,padding:l?"md":"lg",variant:"soft",expandable:!l,defaultExpanded:!l&&i});p.classList.add(l?"color-picker--mobile":"color-picker--desktop");let m=p.querySelector(".card-header");m&&m.classList.add("color-picker__header");let f=m?.querySelector(".card-title"),g=w("button",{className:"color-picker__preview",type:"button",title:`Preview ${n}`,"aria-label":`Change ${n}`});f?f.prepend(g):m?m.prepend(g):p.prepend(g);let b=p.querySelector(".card-toggle");!l&&b&&g.addEventListener("click",()=>{p.classList.contains("card--collapsed")&&b.click()});let h=p.querySelector(".card-collapse"),S=null,T=null,x=null,v=null,k=null,L=null,E=null,P=null,R=null,M="hex";function U(H){let D=We(c);H==="input"?s?.(D):u?.(D)}function J(){let H=We(c);if(g.style.setProperty("--cp-preview-color",H.rgba),g.setAttribute("aria-label",`${n}: ${H.hexa}`),!l&&S&&T&&x&&v&&k&&L&&E){let D=mt({...c,s:1,v:1,a:1}),_=pt(D);S.style.setProperty("--cp-palette-hue",_),T.style.left=`${c.s*100}%`,T.style.top=`${(1-c.v)*100}%`,x.style.setProperty("--cp-alpha-gradient",`linear-gradient(180deg, ${pt({...D,a:1})} 0%, ${pt({...D,a:0})} 100%)`),v.style.top=`${(1-c.a)*100}%`,k.style.setProperty("--cp-hue-color",pt(mt({...c,v:1,s:1,a:1}))),L.style.left=`${c.h/360*100}%`;let O=c.a===1?H.hex:H.hexa,I=H.rgba,G=M==="hex"?O:I;E!==document.activeElement&&(E.value=G),E.setAttribute("aria-label",`${M.toUpperCase()} code for ${n}`),E.placeholder=M==="hex"?"#RRGGBB or #RRGGBBAA":"rgba(0, 0, 0, 1)",M==="hex"?E.maxLength=9:E.removeAttribute("maxLength"),E.dataset.mode=M,P&&(P.textContent=M.toUpperCase(),P.setAttribute("aria-label",M==="hex"?"Passer en saisie RGBA":"Revenir en saisie HEX"),P.setAttribute("aria-pressed",M==="rgba"?"true":"false"),P.classList.toggle("is-alt",M==="rgba"))}R&&R!==document.activeElement&&(R.value=H.hex)}function K(H,D=null){c={h:(H.h%360+360)%360,s:ne(H.s,0,1),v:ne(H.v,0,1),a:ne(H.a,0,1)},J(),D&&U(D)}function N(H,D=null){K(br(H),D)}function j(H,D,_){H.addEventListener("pointerdown",O=>{O.preventDefault();let I=O.pointerId,G=V=>{V.pointerId===I&&D(V)},W=V=>{V.pointerId===I&&(document.removeEventListener("pointermove",G),document.removeEventListener("pointerup",W),document.removeEventListener("pointercancel",W),_?.(V))};D(O),document.addEventListener("pointermove",G),document.addEventListener("pointerup",W),document.addEventListener("pointercancel",W)})}if(!l&&h){let H=h.querySelector(".card-body");if(H){H.classList.add("color-picker__body"),T=w("div",{className:"color-picker__palette-cursor"}),S=w("div",{className:"color-picker__palette"},T),v=w("div",{className:"color-picker__alpha-thumb"}),x=w("div",{className:"color-picker__alpha"},v),L=w("div",{className:"color-picker__hue-thumb"}),k=w("div",{className:"color-picker__hue"},L);let D=w("div",{className:"color-picker__main"},S,x),_=w("div",{className:"color-picker__hue-row"},k),O=gr({blockGameKeys:!0});E=O.input,E.classList.add("color-picker__hex-input"),E.value="",E.maxLength=9,E.spellcheck=!1,E.inputMode="text",E.setAttribute("aria-label",`Hex code for ${n}`),P=w("button",{type:"button",className:"color-picker__mode-btn",textContent:"HEX","aria-pressed":"false","aria-label":"Passer en saisie RGBA"}),O.root.classList.add("color-picker__hex-wrap");let I=w("div",{className:"color-picker__hex-row"},P,O.root);H.replaceChildren(D,_,I),j(S,W=>{if(!S||!T)return;let V=S.getBoundingClientRect(),oe=ne((W.clientX-V.left)/V.width,0,1),kn=ne((W.clientY-V.top)/V.height,0,1);K({...c,s:oe,v:1-kn},"input")},()=>U("change")),j(x,W=>{if(!x)return;let V=x.getBoundingClientRect(),oe=ne((W.clientY-V.top)/V.height,0,1);K({...c,a:1-oe},"input")},()=>U("change")),j(k,W=>{if(!k)return;let V=k.getBoundingClientRect(),oe=ne((W.clientX-V.left)/V.width,0,1);K({...c,h:oe*360},"input")},()=>U("change")),P.addEventListener("click",()=>{if(M=M==="hex"?"rgba":"hex",E){let W=We(c);E.value=M==="hex"?c.a===1?W.hex:W.hexa:W.rgba}J(),E?.focus(),E?.select()}),E.addEventListener("input",()=>{if(M==="hex"){let W=rl(E.value);if(W!==E.value){let V=E.selectionStart??W.length;E.value=W,E.setSelectionRange(V,V)}}});let G=()=>{let W=E.value;if(M==="hex"){let V=Je(W);if(!V){E.value=c.a===1?We(c).hex:We(c).hexa;return}let oe=W.startsWith("#")?W.slice(1):W,kn=oe.length===4||oe.length===8;V.a=kn?V.a:c.a,N(V,"change")}else{let V=il(W),oe=Cn(V);if(!oe){E.value=We(c).rgba;return}N(oe,"change")}};E.addEventListener("change",G),E.addEventListener("blur",G),E.addEventListener("keydown",W=>{W.key==="Enter"&&(G(),E.blur())})}}return l&&(h&&h.remove(),R=w("input",{className:"color-picker__native",type:"color",value:An(mt({...c,a:1}))}),g.addEventListener("click",()=>R.click()),R.addEventListener("input",()=>{let H=Je(R.value);H&&(H.a=c.a,N(H,"input"),U("change"))}),p.appendChild(R)),J(),{root:p,isMobile:l,getValue:()=>We(c),setValue:(H,D)=>{let _=Cn(H)??Je(H)??Je("#FFFFFF");_&&(typeof D=="number"&&(_.a=D),N(_,null))}}}var al=window;function sl(){if(typeof unsafeWindow<"u"&&unsafeWindow)return unsafeWindow;let e=window.wrappedJSObject;return e&&e!==window?e:al}var ll=sl(),C=ll;function cl(e){try{return!!e.isSecureContext}catch{return!1}}function Mn(e){let t=e?.getRootNode?.();return t&&(t instanceof Document||t.host)?t:document}function yr(){let e=navigator.platform||"",t=navigator.userAgent||"";return/Mac|iPhone|iPad|iPod/i.test(e)||/Mac OS|iOS/i.test(t)}async function ul(){try{let e=await navigator.permissions?.query?.({name:"clipboard-write"});return e?e.state==="granted"||e.state==="prompt":!0}catch{return!0}}function dl(e,t){let n=document.createElement("textarea");return n.value=e,n.setAttribute("readonly","true"),n.style.position="fixed",n.style.opacity="0",n.style.pointerEvents="none",n.style.top="0",t.appendChild?t.appendChild(n):document.body.appendChild(n),n}function pl(e){try{let t=window.getSelection?.();if(!t)return!1;let n=document.createRange();return n.selectNodeContents(e),t.removeAllRanges(),t.addRange(n),!0}catch{return!1}}async function ml(e){if(!("clipboard"in navigator))return{ok:!1,method:"clipboard-write"};if(!cl(C))return{ok:!1,method:"clipboard-write"};if(!await ul())return{ok:!1,method:"clipboard-write"};try{return await navigator.clipboard.writeText(e),{ok:!0,method:"clipboard-write"}}catch{return{ok:!1,method:"clipboard-write"}}}function fl(e,t){try{let n=t||Mn(),r=dl(e,n);r.focus(),r.select(),r.setSelectionRange(0,r.value.length);let o=!1;try{o=document.execCommand("copy")}catch{o=!1}return r.remove(),{ok:o,method:"execCommand"}}catch{return{ok:!1,method:"execCommand"}}}function gl(e,t){if(!t)return{ok:!1,method:"selection"};let n=t.textContent??"",r=!1;if(n!==e)try{t.textContent=e,r=!0}catch{}let o=pl(t);r&&setTimeout(()=>{try{t.textContent=n}catch{}},80);let i=yr()?"\u2318C pour copier":"Ctrl+C pour copier";return{ok:o,method:"selection",hint:i}}async function bl(e,t={}){let n=(e??"").toString();if(!n.length)return{ok:!1,method:"noop"};let r=await ml(n);if(r.ok)return r;let o=t.injectionRoot||Mn(t.valueNode||void 0),i=fl(n,o);if(i.ok)return i;let a=gl(n,t.valueNode||null);if(a.ok)return a;if(!t.disablePromptFallback)try{return window.prompt(fr()?"Copie manuelle (Discord bloque clipboard):":"Copie manuelle:",n),{ok:!0,method:"prompt"}}catch{}return{ok:!1,method:"noop"}}function xr(e,t,n={}){let r=o=>{if(n.showTip){n.showTip(o);return}try{e.setAttribute("aria-label",o);let i=document.createElement("div");i.textContent=o,i.style.position="absolute",i.style.top="-28px",i.style.right="0",i.style.padding="4px 8px",i.style.borderRadius="8px",i.style.fontSize="12px",i.style.background="color-mix(in oklab, var(--bg) 85%, transparent)",i.style.border="1px solid var(--border)",i.style.color="var(--fg)",i.style.pointerEvents="none",i.style.opacity="0",i.style.transition="opacity .12s";let a=Mn(e);a.appendChild?a.appendChild(i):document.body.appendChild(i);let s=e.getBoundingClientRect();i.style.left=`${s.right-8}px`,i.style.top=`${s.top-28}px`,requestAnimationFrame(()=>i.style.opacity="1"),setTimeout(()=>{i.style.opacity="0",setTimeout(()=>i.remove(),150)},1200)}catch{}};e.addEventListener("click",async o=>{o.stopPropagation();let i=(t()??"").toString(),a=await bl(i,{valueNode:n.valueNode??null,injectionRoot:n.injectionRoot??null,disablePromptFallback:n.disablePromptFallback??!1});n.onResult?.(a),a.ok?a.method==="clipboard-write"||a.method==="execCommand"||a.method==="prompt"?r("Copi\xE9"):a.method==="selection"&&r(a.hint||(yr()?"\u2318C pour copier":"Ctrl+C pour copier")):r("Impossible de copier")})}var De={light:{"--bg":"rgba(255,255,255,0.7)","--fg":"#0f172a","--muted":"rgba(15,23,42,0.06)","--soft":"rgba(15,23,42,0.04)","--accent":"#2563eb","--border":"rgba(15,23,42,0.12)","--shadow":"rgba(2,6,23,.2)","--tab-bg":"#ffffff","--tab-fg":"#0f172a","--pill-from":"#4f46e5","--pill-to":"#06b6d4"},dark:{"--bg":"rgba(10,12,18,0.6)","--fg":"#e5e7eb","--muted":"rgba(229,231,235,0.08)","--soft":"rgba(229,231,235,0.05)","--accent":"#60a5fa","--border":"rgba(148,163,184,0.2)","--shadow":"rgba(0,0,0,.45)","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#e5e7eb","--pill-from":"#6366f1","--pill-to":"#06b6d4"},sepia:{"--bg":"rgba(247,242,231,0.72)","--fg":"#3b2f2f","--muted":"rgba(59,47,47,0.06)","--soft":"rgba(59,47,47,0.04)","--accent":"#b07d62","--border":"rgba(59,47,47,0.14)","--shadow":"rgba(0,0,0,.18)","--tab-bg":"#fff","--tab-fg":"#3b2f2f","--pill-from":"#b07d62","--pill-to":"#d4a373"},forest:{"--bg":"rgba(14,24,18,0.62)","--fg":"#e7f5e9","--muted":"rgba(231,245,233,0.08)","--soft":"rgba(231,245,233,0.05)","--accent":"#34d399","--border":"rgba(231,245,233,0.16)","--shadow":"rgba(0,0,0,.5)","--tab-bg":"rgba(255,255,255,0.06)","--tab-fg":"#e7f5e9","--pill-from":"#10b981","--pill-to":"#84cc16"},violet:{"--bg":"rgba(23, 16, 42, 0.68)","--fg":"#f5f3ff","--muted":"rgba(245,243,255,0.08)","--soft":"rgba(245,243,255,0.05)","--accent":"#a855f7","--border":"rgba(216,180,254,0.22)","--shadow":"rgba(12,3,30,.55)","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#ede9fe","--pill-from":"#a855f7","--pill-to":"#f472b6"},ocean:{"--bg":"rgba(10, 34, 46, 0.66)","--fg":"#e0f7ff","--muted":"rgba(224,247,255,0.07)","--soft":"rgba(224,247,255,0.05)","--accent":"#38bdf8","--border":"rgba(125, 211, 252, 0.22)","--shadow":"rgba(0, 16, 32, .52)","--tab-bg":"rgba(56,189,248,0.14)","--tab-fg":"#e0f7ff","--pill-from":"#0ea5e9","--pill-to":"#14b8a6"},ember:{"--bg":"rgba(34,18,10,0.64)","--fg":"#fff7ed","--muted":"rgba(255,247,237,0.08)","--soft":"rgba(255,247,237,0.05)","--accent":"#f97316","--border":"rgba(255, 159, 92, 0.24)","--shadow":"rgba(16,6,2,.52)","--tab-bg":"rgba(255,247,237,0.09)","--tab-fg":"#fff7ed","--pill-from":"#fb923c","--pill-to":"#facc15"}};function In(e){let{host:t,themes:n,initialTheme:r,onThemeChange:o}=e,i=r,a=null,s=!1;function u(l){let c=n[l]||n[i]||{};s&&t.classList.add("theme-anim");for(let[p,m]of Object.entries(c))t.style.setProperty(p,m);s?(a!==null&&clearTimeout(a),a=C.setTimeout(()=>{t.classList.remove("theme-anim"),a=null},320)):s=!0,i=l,o?.(l)}function d(){return i}return u(r),{applyTheme:u,getCurrentTheme:d}}var $t={ui:{expandedCards:{style:!1,system:!1}}};async function vr(){let e=await ct("tab-settings",{version:1,defaults:$t,sanitize:o=>({ui:{expandedCards:Wt($t.ui.expandedCards,o.ui?.expandedCards)}})});function t(o){let i=e.get();e.update({ui:{...i.ui,...o,expandedCards:Wt(i.ui.expandedCards,o.expandedCards)}})}function n(o,i){let a=e.get();e.update({ui:{...a.ui,expandedCards:{...a.ui.expandedCards,[o]:!!i}}})}function r(o){let i=e.get();n(o,!i.ui.expandedCards[o])}return{get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:r}}function Sr(e){return e.replace(/[_-]+/g," ").replace(/^\w/,t=>t.toUpperCase())}function hl(){return Object.keys(De).map(e=>({value:e,label:Sr(e)}))}var yl=["--bg","--fg","--accent","--muted","--soft","--border","--shadow","--tab-bg","--tab-fg","--pill-from","--pill-to"];function xl(e){return Sr(e.replace(/^--/,""))}function vl(e){return e.alpha<1?e.rgba:e.hex}var Kt=class extends Ne{constructor(n){super({id:"tab-settings",label:"Settings"});this.deps=n}async build(n){let r=this.createGrid("12px");r.id="settings",n.appendChild(r);let o;try{o=await vr()}catch{o={get:()=>$t,set:()=>{},save:()=>{},setUI:()=>{},setCardExpanded:()=>{},toggleCard:()=>{}}}let i=o.get(),a=Object.keys(De),s=this.deps.getCurrentTheme?.()??this.deps.initialTheme,u=a.includes(s)?s:a[0]??"dark",d=u,l=Vt({text:"Theme",tone:"muted",size:"lg"}),c=qe({options:hl(),value:u,onChange:g=>{d=g,this.deps.applyTheme(g),this.renderThemePickers(g,p,d)}}),p=w("div",{className:"settings-theme-grid"}),m=Re({title:"Style",padding:"lg",expandable:!0,defaultExpanded:!!i.ui.expandedCards.style,onExpandChange:g=>o.setCardExpanded("style",g)},w("div",{className:"kv settings-theme-row"},l.root,c.root),p);this.renderThemePickers(u,p,d);let f=this.createEnvCard({defaultExpanded:!!i.ui.expandedCards.system,onExpandChange:g=>o.setCardExpanded("system",g)});r.appendChild(m),r.appendChild(f)}renderThemePickers(n,r,o){let i=De[n];if(r.replaceChildren(),!!i)for(let a of yl){let s=i[a];if(s==null)continue;let u=hr({label:xl(a),value:s,defaultExpanded:!1,onInput:d=>this.updateThemeVar(n,a,d,o),onChange:d=>this.updateThemeVar(n,a,d,o)});r.appendChild(u.root)}}updateThemeVar(n,r,o,i){let a=De[n];a&&(a[r]=vl(o),i===n&&this.deps.applyTheme(n))}createEnvCard(n){let r=n?.defaultExpanded??!1,o=n?.onExpandChange,i=(h,S)=>{let T=w("div",{className:"kv kv--inline-mobile"}),x=w("label",{},h),v=w("div",{className:"ro"});return typeof S=="string"?v.textContent=S:v.append(S),T.append(x,v),T},a=w("code",{},"\u2014"),s=w("span",{},"\u2014"),u=w("span",{},"\u2014"),d=w("span",{},"\u2014"),l=w("span",{},"\u2014"),c=w("span",{},"\u2014"),p=()=>{let h=ye();u.textContent=h.surface,d.textContent=h.platform,l.textContent=h.browser??"Unknown",c.textContent=h.os??"Unknown",a.textContent=h.host,s.textContent=h.isInIframe?"Yes":"No"},m=Oe({label:"Copy JSON",variant:"primary",size:"sm"});xr(m,()=>{let h=ye();return JSON.stringify(h,null,2)});let f=w("div",{style:"width:100%;display:flex;justify-content:center;"},m),g=Re({title:"System",variant:"soft",padding:"lg",footer:f,expandable:!0,defaultExpanded:r,onExpandChange:o},i("Surface",u),i("Platform",d),i("Browser",l),i("OS",c),i("Host",a),i("Iframe",s)),b=()=>{document.hidden||p()};return document.addEventListener("visibilitychange",b),p(),this.addCleanup(()=>document.removeEventListener("visibilitychange",b)),g}};function ft(e){return e<10?`0${e}`:String(e)}function le(e){let t=/^(\d{1,2}):(\d{2})$/.exec((e||"").trim());if(!t)return 0;let n=Math.max(0,Math.min(23,parseInt(t[1],10)||0)),r=Math.max(0,Math.min(59,parseInt(t[2],10)||0));return n*60+r}function En(e){let t=Math.max(0,Math.min(1439,e|0)),n=Math.floor(t/60),r=t%60;return`${ft(n)}:${ft(r)}`}function Pe(e,t){let n=le(e),r=Math.max(0,Math.min(1439,n)),o=Math.floor(r/t)*t;return En(o)}function Sl(e){let t=Math.floor(e/60),n=e%60,r=t>=12;return{h12:t%12||12,m:n,pm:r}}function wl(e,t,n){return(e%12+(n?12:0))*60+t}function kl(e){return e.platform==="mobile"||e.os==="ios"||e.os==="android"}function wr(e={}){let{id:t,start:n="08:00",end:r="23:00",stepMinutes:o=5,disabled:i=!1,allowOvernight:a=!0,labels:s={from:"From",to:"To"},picker:u="auto",format:d="auto",useNativeOn:l,onChange:c}=e,p={start:Pe(n,o),end:Pe(r,o)},m=w("div",{className:"time-range",id:t});m.classList.add("time-range--stacked");let f=ye();if(u==="native"||u==="auto"&&(l?.(f)??kl(f)))return b();return h();function b(){let x=w("div",{className:"time-range-field",role:"group"}),v=w("span",{className:"time-range-label"},s.from||"From"),k=w("input",{className:"input time-range-input",type:"time",step:String(o*60),value:p.start}),L=w("div",{className:"time-range-field",role:"group"}),E=w("span",{className:"time-range-label"},s.to||"To"),P=w("input",{className:"input time-range-input",type:"time",step:String(o*60),value:p.end});x.append(v,k),L.append(E,P),m.append(x,L);function R(){k.value=p.start,P.value=p.end}function M(){c?.(J())}function U(H){let D=H.target,_=D===k,O=Pe(D.value||(_?p.start:p.end),o);_?(p.start=O,!a&&le(p.end)<le(p.start)&&(p.end=p.start)):(p.end=O,!a&&le(p.end)<le(p.start)&&(p.start=p.end)),R(),M()}k.addEventListener("change",U),k.addEventListener("blur",U),P.addEventListener("change",U),P.addEventListener("blur",U),i&&N(!0);function J(){return{...p}}function K(H){if(H.start&&(p.start=Pe(H.start,o)),H.end&&(p.end=Pe(H.end,o)),!a){let D=le(p.start);le(p.end)<D&&(p.end=p.start)}R(),M()}function N(H){k.disabled=H,P.disabled=H,m.classList.toggle("is-disabled",!!H)}function j(){k.removeEventListener("change",U),k.removeEventListener("blur",U),P.removeEventListener("change",U),P.removeEventListener("blur",U),m.replaceChildren()}return{root:m,getValue:J,setValue:K,setDisabled:N,destroy:j}}function h(){let x=w("label",{className:"time-range-field"}),v=w("span",{className:"time-range-label"},s.from||"From"),k=w("label",{className:"time-range-field"}),L=w("span",{className:"time-range-label"},s.to||"To"),E=d==="12h"||d==="auto"&&T(),P=S(p.start,E),R=S(p.end,E);x.append(v,P.container),k.append(L,R.container),m.append(x,k),i&&K(!0),J(),P.onAnyChange(()=>{p.start=P.to24h(o),!a&&le(p.end)<le(p.start)&&(p.end=p.start,R.setFrom24h(p.end)),c?.(M())}),R.onAnyChange(()=>{p.end=R.to24h(o),!a&&le(p.end)<le(p.start)&&(p.start=p.end,P.setFrom24h(p.start)),c?.(M())});function M(){return{...p}}function U(j){if(j.start&&(p.start=Pe(j.start,o)),j.end&&(p.end=Pe(j.end,o)),!a){let H=le(p.start);le(p.end)<H&&(p.end=p.start)}J(),c?.(M())}function J(){P.setFrom24h(p.start),R.setFrom24h(p.end)}function K(j){P.setDisabled(j),R.setDisabled(j),m.classList.toggle("is-disabled",!!j)}function N(){P.destroy(),R.destroy(),m.replaceChildren()}return{root:m,getValue:M,setValue:U,setDisabled:K,destroy:N}}function S(x,v){let k=w("div",{className:"time-picker"}),L=(I,G=2)=>{I.classList.add("time-picker-compact"),I.style.setProperty("--min-ch",String(G))},E=v?Array.from({length:12},(I,G)=>{let W=G+1;return{value:String(W),label:ft(W)}}):Array.from({length:24},(I,G)=>({value:String(G),label:ft(G)})),P=qe({size:"sm",options:E,placeholder:"HH",onChange:()=>j()});L(P.root,2);let R=Math.max(1,Math.min(30,Math.floor(e.stepMinutes??5))),M=Array.from({length:Math.floor(60/R)},(I,G)=>{let W=G*R;return{value:String(W),label:ft(W)}}),U=qe({size:"sm",options:M,placeholder:"MM",onChange:()=>j()});L(U.root,2);let J=v?qe({size:"sm",options:[{value:"am",label:"AM"},{value:"pm",label:"PM"}],value:"am",onChange:()=>j()}):null;J&&L(J.root,3),k.append(P.root,U.root,...J?[J.root]:[]);let K=null;function N(I){K=I}function j(){K?.()}function H(I){let G=le(I);if(v){let W=Sl(G);P.setValue(String(W.h12),{notify:!1}),U.setValue(String(Math.floor(W.m/R)*R),{notify:!1}),J.setValue(W.pm?"pm":"am",{notify:!1})}else{let W=Math.floor(G/60),V=G%60;P.setValue(String(W),{notify:!1}),U.setValue(String(Math.floor(V/R)*R),{notify:!1})}}function D(I){let G=parseInt(U.getValue()||"0",10)||0;if(v){let W=parseInt(P.getValue()||"12",10)||12,V=(J?.getValue()||"am")==="pm",oe=wl(W,G,V);return Pe(En(oe),I)}else{let V=(parseInt(P.getValue()||"0",10)||0)*60+G;return Pe(En(V),I)}}function _(I){P.setDisabled(I),U.setDisabled(I),J?.setDisabled(I),k.classList.toggle("is-disabled",!!I)}function O(){k.replaceChildren()}return{container:k,onAnyChange:N,setFrom24h:H,to24h:D,setDisabled:_,destroy:O}}function T(){try{let v=new Intl.DateTimeFormat(void 0,{hour:"numeric"}).format(new Date(2020,1,1,13));return/AM|PM|am|pm/.test(v)}catch{return!1}}}function Tr(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Tl(e){let t=Tr(e);t=t.replace(/\/\*[\s\S]*?\*\//g,o=>`<span class="tok tok-comm">${o}</span>`),t=t.replace(/(^|\s)(\/\/.*)$/gm,(o,i,a)=>`${i}<span class="tok tok-comm">${a}</span>`),t=t.replace(/`[^`\\]*(?:\\.[^`\\]*)*`/g,o=>`<span class="tok tok-str">${o}</span>`),t=t.replace(/'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/g,o=>`<span class="tok tok-str">${o}</span>`),t=t.replace(/\b(?:0[xX][0-9a-fA-F]+|0[bB][01]+|0[oO][0-7]+|\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?(?:[eE][+-]?\d+)?)\b/g,o=>`<span class="tok tok-num">${o}</span>`);let n=["break","case","catch","class","const","continue","debugger","default","delete","do","else","export","extends","finally","for","function","if","import","in","instanceof","let","new","return","super","switch","this","throw","try","typeof","var","void","while","with","yield","await","enum","implements","interface","package","private","protected","public","static","as","from","of"],r=new RegExp(`\\b(?:${n.join("|")})\\b`,"g");return t=t.replace(r,o=>`<span class="tok tok-kw">${o}</span>`),t=t.replace(/\b(?:true|false|null|undefined|NaN|Infinity)\b/g,o=>`<span class="tok tok-lit">${o}</span>`),t}function kr(e){if(!e)return new Date().toLocaleTimeString();let t=e instanceof Date?e:new Date(e);if(isNaN(t.getTime()))return String(e);let n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0"),o=String(t.getSeconds()).padStart(2,"0");return`${n}:${r}:${o}`}function Pr(e={}){let{id:t,className:n,height:r,maxLines:o=500,wrap:i=!1,mode:a="plain",showTimestamps:s=!0,autoScroll:u=!0}=e,d=w("div",{className:"log",id:t});n&&d.classList.add(...n.split(" ").filter(Boolean)),i&&d.classList.add("log--wrap");let l=w("div",{className:"log-viewport"}),c=w("div",{className:"log-lines"});l.appendChild(c),d.appendChild(l),r!=null&&(d.style.blockSize=typeof r=="number"?`${r}px`:String(r));let p=a,m=o,f=new Map;function g(N){return p==="js"?Tl(N):Tr(N)}function b(N){return N?f.get(N)?.body??c:c}function h(N){let j=typeof N=="string"?{text:N}:N||{text:""},H=b(j.groupKey);if(j.key){let O=Array.from(H.querySelectorAll(`.log-line[data-key="${j.key}"]`)).pop();if(O){j.level&&(O.classList.remove("log-level--debug","log-level--info","log-level--warn","log-level--error"),O.classList.add(`log-level--${j.level}`));let I=O.querySelector(".log-time");s&&I&&(I.textContent=kr(j.time));let G=O.querySelector(".log-text");G&&(G.innerHTML=g(j.text)),u&&L();return}}let D=document.createElement("div");if(D.className="log-line",j.level&&D.classList.add(`log-level--${j.level}`),j.key&&(D.dataset.key=j.key),s){let O=document.createElement("span");O.className="log-time",O.textContent=kr(j.time),D.appendChild(O)}let _=document.createElement("span");_.className="log-text",_.innerHTML=g(j.text),D.appendChild(_),H.appendChild(D),R(),u&&L()}function S(N){for(let j of N)h(j)}function T(){c.replaceChildren(),f.clear()}function x(N){p=N,L()}function v(N){d.classList.toggle("log--wrap",!!N),L()}function k(N){m=Math.max(1,Math.floor(N||1))}function L(){requestAnimationFrame(()=>{l.scrollTop=l.scrollHeight})}function E(){let N=0;for(let j=0;j<c.children.length;j+=1){let H=c.children[j];(H.classList.contains("log-line")||H.classList.contains("log-group"))&&(N+=1)}return N}function P(){let N=c.firstElementChild;if(!N)return!1;if(N.classList.contains("log-group")){let j=N.dataset.groupKey;j&&f.delete(j)}return N.remove(),!0}function R(){let N=E();for(;N>m&&P();)N--}function M(N,j){let H=j?.key||`g-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,6)}`;if(f.has(H))return H;let D=document.createElement("div");D.className="log-group",D.dataset.groupKey=H;let _=document.createElement("div");_.className="log-group-header",_.textContent=N;let O=document.createElement("div");O.className="log-group-body",D.append(_,O),c.appendChild(D),f.set(H,{root:D,header:_,body:O});let I=G=>{D.classList.toggle("is-collapsed",!!G)};return j?.collapsed&&I(!0),_.addEventListener("click",()=>I(!D.classList.contains("is-collapsed"))),u&&L(),H}function U(N){f.get(N)}function J(N,j){let H=f.get(N);H&&(j==null?H.root.classList.toggle("is-collapsed"):H.root.classList.toggle("is-collapsed",!!j))}let K=d;return K.add=h,K.addMany=S,K.clear=T,K.setMode=x,K.setWrap=v,K.setMaxLines=k,K.scrollToEnd=L,K.beginGroup=M,K.endGroup=U,K.toggleGroup=J,K}var ce={nativeCtor:null,captured:[],latestOpen:null},Cr=Symbol.for("ariesmod.ws.capture.wrapped"),Ar=Symbol.for("ariesmod.ws.capture.native"),Mr=1;function Ln(e){return!!e&&e.readyState===Mr}function Pl(){if(Ln(ce.latestOpen))return ce.latestOpen;for(let e=ce.captured.length-1;e>=0;e--){let t=ce.captured[e];if(Ln(t))return t}return null}function Cl(e,t){ce.captured.push(e),ce.captured.length>25&&ce.captured.splice(0,ce.captured.length-25);let n=()=>{ce.latestOpen=e,t&&console.log("[WS] captured socket opened",e.url)};e.addEventListener("open",n),e.addEventListener("close",()=>{ce.latestOpen===e&&(ce.latestOpen=null),t&&console.log("[WS] captured socket closed",e.url)}),e.readyState===Mr&&n()}function Ir(e=C,t={}){let n=!!t.debug,r=e?.WebSocket;if(typeof r!="function")return()=>{};if(r[Cr])return ce.nativeCtor=r[Ar]??ce.nativeCtor??null,()=>{};let o=r;ce.nativeCtor=o;function i(a,s){let u=s!==void 0?new o(a,s):new o(a);try{Cl(u,n)}catch{}return u}try{i.prototype=o.prototype}catch{}try{Object.setPrototypeOf(i,o)}catch{}try{i.CONNECTING=o.CONNECTING,i.OPEN=o.OPEN,i.CLOSING=o.CLOSING,i.CLOSED=o.CLOSED}catch{}i[Cr]=!0,i[Ar]=o;try{e.WebSocket=i,n&&console.log("[WS] WebSocket capture installed")}catch{return()=>{}}return()=>{try{e.WebSocket===i&&(e.WebSocket=o)}catch{}}}function Al(e=C){let t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function gt(e=C){let t=Pl();if(t)return{ws:t,source:"captured"};let n=Al(e);return n?{ws:n,source:"roomConnection"}:{ws:null,source:null}}function qt(e,t={}){let n=t.pageWindow??C,r=t.intervalMs??500,o=!!t.debug,i=null,a=null,s=()=>{let d=gt(n);(d.ws!==i||d.source!==a)&&(i=d.ws,a=d.source,o&&console.log("[WS] best socket changed:",d.source,d.ws),e(d))};s();let u=setInterval(s,r);return()=>clearInterval(u)}function Ml(e){if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return null}}function Il(e,t=C){let n=t?.MagicCircle_RoomConnection;if(n&&typeof n.sendMessage=="function")try{return Array.isArray(e)?n.sendMessage(...e):n.sendMessage(e),{ok:!0}}catch(i){return{ok:!1,reason:"error",error:i}}let{ws:r}=gt(t);if(!r)return{ok:!1,reason:"no-ws"};if(!Ln(r))return{ok:!1,reason:"not-open"};let o=Ml(e);if(o==null)return{ok:!1,reason:"error",error:new Error("Cannot stringify message")};try{return r.send(o),{ok:!0}}catch(i){return{ok:!1,reason:"error",error:i}}}function Er(e,t={},n=C){return Il({type:e,...t},n)}var we={Welcome:"Welcome",PartialState:"PartialState",ServerErrorMessage:"ServerErrorMessage",Config:"Config",InappropriateContentRejected:"InappropriateContentRejected",Emote:"Emote",CurrencyTransaction:"CurrencyTransaction",Pong:"Pong"},A={Chat:"Chat",Emote:"Emote",Wish:"Wish",KickPlayer:"KickPlayer",SetPlayerData:"SetPlayerData",UsurpHost:"UsurpHost",Dev:"Dev",SetSelectedGame:"SetSelectedGame",VoteForGame:"VoteForGame",RequestGame:"RequestGame",RestartGame:"RestartGame",Ping:"Ping",PlayerPosition:"PlayerPosition",Teleport:"Teleport",CheckWeatherStatus:"CheckWeatherStatus",MoveInventoryItem:"MoveInventoryItem",DropObject:"DropObject",PickupObject:"PickupObject",ToggleFavoriteItem:"ToggleFavoriteItem",PutItemInStorage:"PutItemInStorage",RetrieveItemFromStorage:"RetrieveItemFromStorage",MoveStorageItem:"MoveStorageItem",LogItems:"LogItems",PlantSeed:"PlantSeed",WaterPlant:"WaterPlant",HarvestCrop:"HarvestCrop",SellAllCrops:"SellAllCrops",PurchaseSeed:"PurchaseSeed",PurchaseEgg:"PurchaseEgg",PurchaseTool:"PurchaseTool",PurchaseDecor:"PurchaseDecor",PlantEgg:"PlantEgg",HatchEgg:"HatchEgg",PlantGardenPlant:"PlantGardenPlant",PotPlant:"PotPlant",MutationPotion:"MutationPotion",PickupDecor:"PickupDecor",PlaceDecor:"PlaceDecor",RemoveGardenObject:"RemoveGardenObject",PlacePet:"PlacePet",FeedPet:"FeedPet",PetPositions:"PetPositions",SwapPet:"SwapPet",StorePet:"StorePet",NamePet:"NamePet",SellPet:"SellPet",ReportSpeakingStart:"ReportSpeakingStart"};var Hb=new Set(Object.values(we)),Gb=new Set(Object.values(A));function $(e,t={},n=C){return Er(e,t,n)}function Jt(e,t=C){return $(A.Chat,{scopePath:["Room"],message:e},t)}function Lr(e,t=C){return $(A.Emote,{scopePath:["Room"],emoteType:e},t)}function Rr(e,t=C){return $(A.Wish,{wish:e},t)}function Or(e,t=C){return $(A.KickPlayer,{scopePath:["Room"],playerId:e},t)}function Dr(e,t=C){return $(A.SetPlayerData,{scopePath:["Room"],data:e},t)}function Hr(e=C){return $(A.UsurpHost,{},e)}function Gr(e=C){return $(A.ReportSpeakingStart,{},e)}function _r(e,t=C){return $(A.SetSelectedGame,{scopePath:["Room"],gameId:e},t)}function Nr(e,t=C){return $(A.VoteForGame,{scopePath:["Room"],gameId:e},t)}function Wr(e,t=C){return $(A.RequestGame,{scopePath:["Room"],gameId:e},t)}function jr(e=C){return $(A.RestartGame,{scopePath:["Room"]},e)}function Br(e,t=C){return $(A.Ping,{id:e},t)}function Rn(e,t,n=C){return $(A.PlayerPosition,{x:e,y:t},n)}var Fr=Rn;function Vr(e,t,n=C){return $(A.Teleport,{x:e,y:t},n)}function Ur(e=C){return $(A.CheckWeatherStatus,{},e)}function zr(e,t,n=C){return $(A.MoveInventoryItem,{fromIndex:e,toIndex:t},n)}function $r(e,t=C){return $(A.DropObject,{slotIndex:e},t)}function Kr(e,t=C){return $(A.PickupObject,{objectId:e},t)}function qr(e,t,n=C){return $(A.ToggleFavoriteItem,{itemId:e,favorite:t},n)}function Jr(e,t=C){return $(A.PutItemInStorage,{itemId:e},t)}function Yr(e,t=C){return $(A.RetrieveItemFromStorage,{itemId:e},t)}function Xr(e,t,n=C){return $(A.MoveStorageItem,{fromIndex:e,toIndex:t},n)}function Qr(e=C){return $(A.LogItems,{},e)}function Zr(e,t,n,r=C){return $(A.PlantSeed,{seedId:e,x:t,y:n},r)}function ei(e,t=C){return $(A.WaterPlant,{plantId:e},t)}function ti(e,t=C){return $(A.HarvestCrop,{cropId:e},t)}function ni(e=C){return $(A.SellAllCrops,{},e)}function oi(e,t=C){return $(A.PurchaseDecor,{decorId:e},t)}function ri(e,t=C){return $(A.PurchaseEgg,{eggId:e},t)}function ii(e,t=C){return $(A.PurchaseTool,{toolId:e},t)}function ai(e,t=C){return $(A.PurchaseSeed,{seedId:e},t)}function si(e,t,n,r=C){return $(A.PlantEgg,{eggId:e,x:t,y:n},r)}function li(e,t=C){return $(A.HatchEgg,{eggId:e},t)}function ci(e,t,n,r=C){return $(A.PlantGardenPlant,{plantId:e,x:t,y:n},r)}function ui(e,t,n=C){return $(A.PotPlant,{plantId:e,potId:t},n)}function di(e,t,n=C){return $(A.MutationPotion,{potionId:e,targetId:t},n)}function pi(e,t=C){return $(A.PickupDecor,{decorInstanceId:e},t)}function mi(e,t,n,r=C){return $(A.PlaceDecor,{decorId:e,x:t,y:n},r)}function fi(e,t=C){return $(A.RemoveGardenObject,{objectId:e},t)}function gi(e,t,n,r=C){return $(A.PlacePet,{petId:e,x:t,y:n},r)}function bi(e,t,n=C){return $(A.FeedPet,{petId:e,foodItemId:t},n)}function hi(e,t=C){return $(A.PetPositions,{positions:e},t)}function yi(e,t,n=C){return $(A.SwapPet,{petIdA:e,petIdB:t},n)}function xi(e,t=C){return $(A.StorePet,{petId:e},t)}function vi(e,t,n=C){return $(A.NamePet,{petId:e,name:t},n)}function Si(e,t=C){return $(A.SellPet,{petId:e},t)}var je={timeRange:{start:"09:00",end:"18:00"},logSettings:{mode:"js",wrap:!1}};async function ki(){return ct("tab-test",{version:1,defaults:je,sanitize:e=>({timeRange:{start:e.timeRange?.start||je.timeRange.start,end:e.timeRange?.end||je.timeRange.end},logSettings:{mode:e.logSettings?.mode||je.logSettings.mode,wrap:e.logSettings?.wrap??je.logSettings.wrap}})})}var Yt=class extends Ne{constructor(){super({id:"tab-test",label:"Test"})}async build(t){let n=this.createContainer("test-section");t.appendChild(n);let r;try{r=await ki()}catch{r={get:()=>je,set:()=>{},update:()=>{},save:()=>{}}}let o=r.get(),i=Vt({text:"Plage horaire",hint:"Heures actives du mode 'Plage horaire'.",icon:"\u23F0"}),a=wr({start:o.timeRange.start,end:o.timeRange.end,stepMinutes:5,allowOvernight:!0,picker:"auto",format:"12h",onChange:b=>{r.update({timeRange:{start:b.start,end:b.end}})}}),s=w("div",null,i.root,a.root),u=Pr({height:220,mode:o.logSettings.mode,maxLines:1e3});o.logSettings.wrap&&u.setWrap(!0),u.add({level:"info",text:"Log initialise"}),u.add({level:"debug",text:"const x = 42; // demo"}),u.add({level:"warn",text:"Requete lente: fetch('/api') > 1200ms"}),u.add({level:"error",text:"new Error('Boom')"});let d=Oe({label:"Appliquer",variant:"primary",onClick:()=>{let b=a.getValue();u.add({level:"info",text:`[Apply] ${b.start} -> ${b.end}`})}}),l=Re({title:"Parametres - Plage horaire",subtitle:"Choisis la fenetre d'activite",variant:"soft",padding:"lg",footer:Pn(d)},s),c=Oe({label:"Clear",onClick:()=>Jt("test")}),p=Oe({label:o.logSettings.wrap?"Unwrap":"Wrap",onClick:()=>{let b=!u.classList.contains("log--wrap");u.setWrap(b),p.setLabel(b?"Unwrap":"Wrap"),r.update({logSettings:{...r.get().logSettings,wrap:b}})}}),m=Oe({label:`Mode: ${o.logSettings.mode}`,onClick:()=>{let h=r.get().logSettings.mode==="js"?"plain":"js";u.setMode(h),m.setLabel(`Mode: ${h}`),r.update({logSettings:{...r.get().logSettings,mode:h}})}}),f=Oe({label:"Add line",onClick:()=>u.add({level:"debug",text:"function tick(){ return Date.now(); } // sample"})}),g=Re({title:"Logs",variant:"default",padding:"lg"},u,Pn(c,p,m,f));n.appendChild(l),n.appendChild(g)}};function On(e){return[new Kt(e),new Yt]}function Dn(e){let{shadow:t,initialOpen:n}=e,r=w("div",{className:"gemini-panel",id:"panel",ariaHidden:String(!n)}),o=w("div",{className:"gemini-tabbar"}),i=w("div",{className:"gemini-content",id:"content"}),a=w("div",{className:"gemini-resizer",title:"Resize"}),s=w("button",{className:"gemini-close",title:"Fermer",ariaLabel:"Fermer"},"\u2715");r.append(o,i,a);let u=w("div",{className:"gemini-wrapper"},r);return t.append(u),{panel:r,tabbar:o,content:i,resizer:a,closeButton:s,wrapper:u}}function Hn(e){let{resizer:t,host:n,panel:r,shadow:o,onWidthChange:i,initialWidth:a,minWidth:s,maxWidth:u}=e,d=s,l=u;function c(){let v=ye(),k=Math.round(C.visualViewport?.width??C.innerWidth??0);if(v.platform==="mobile"||v.os==="ios"||v.os==="android"){let L=getComputedStyle(o.host),E=parseFloat(L.getPropertyValue("--inset-l"))||0,P=parseFloat(L.getPropertyValue("--inset-r"))||0,R=Math.max(280,k-Math.round(E+P)),M=Math.min(420,Math.max(300,Math.floor(k*.66))),U=R;d=Math.min(M,R),l=U}else d=s,l=u;return{min:d,max:l}}function p(v){return Math.max(d,Math.min(l,Number(v)||a))}function m(v){let k=p(v);n.style.setProperty("--w",`${k}px`),i(k)}c();let f=ye(),g=!(f.platform==="mobile"||f.os==="ios"||f.os==="android"),b=!1,h=v=>{if(!b)return;v.preventDefault();let k=Math.round(C.innerWidth-v.clientX);m(k)},S=()=>{b&&(b=!1,document.body.style.cursor="",C.removeEventListener("mousemove",h),C.removeEventListener("mouseup",S))},T=v=>{g&&(v.preventDefault(),b=!0,document.body.style.cursor="ew-resize",C.addEventListener("mousemove",h),C.addEventListener("mouseup",S))};t.addEventListener("mousedown",T);function x(){t.removeEventListener("mousedown",T),C.removeEventListener("mousemove",h),C.removeEventListener("mouseup",S)}return{calculateResponsiveBounds:c,constrainWidthToLimits:p,setHudWidth:m,destroy:x}}function Gn(e){let{panel:t,onToggle:n,onClose:r,toggleCombo:o=u=>u.ctrlKey&&u.shiftKey&&u.key.toLowerCase()==="u",closeOnEscape:i=!0}=e;function a(u){let d=t.classList.contains("open");if(i&&u.key==="Escape"&&d){r();return}o(u)&&(u.preventDefault(),u.stopPropagation(),n())}document.addEventListener("keydown",a,{capture:!0});function s(){document.removeEventListener("keydown",a,{capture:!0})}return{destroy:s}}var Ti=`
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
`;var _n=`
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
`;var Nn=`
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
`;var Wn=`
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
`;function ee(e,t,n){if(e.querySelector(`style[data-style-id="${n}"]`))return;let r=document.createElement("style");r.setAttribute("data-style-id",n),r.textContent=t,e.appendChild(r)}var Pi=`
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
  
`;var Ci=`
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
`;var Ai=`
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
`;var Mi=`
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
`;var Ii=`
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
`;var Ei=`
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
`;var Li=`
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
`;var Ri=`
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
`;var Oi=`
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
`;var Di=`
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
`;var Hi=`
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
`;var Gi=`
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
`;var _i=`
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
`;var Ni=`
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
`;var Wi=`
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
`;var ji=`
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
`;var Bi=`
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
`;var El={all:"initial",position:"fixed",top:"0",right:"0",zIndex:"2147483647",pointerEvents:"auto",fontFamily:'system-ui, -apple-system, "Segoe UI", Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',fontSize:"13px",lineHeight:"1.35"};function Ll(e="gemini-root"){let t=document.createElement("div");t.id=e,Object.assign(t.style,El),(document.body||document.documentElement).appendChild(t);let n=t.attachShadow({mode:"open"});return{host:t,shadow:n}}function jn(e){let{hostId:t="gemini-hud-root",initialWidth:n,initialOpen:r,onWidthChange:o,onOpenChange:i,themes:a,initialTheme:s,onThemeChange:u,buildSections:d,initialTab:l,onTabChange:c,toggleCombo:p=_=>_.ctrlKey&&_.shiftKey&&_.key.toLowerCase()==="u",closeOnEscape:m=!0,minWidth:f=420,maxWidth:g=720}=e,{host:b,shadow:h}=Ll(t);ee(h,_n,"variables"),ee(h,Nn,"primitives"),ee(h,Wn,"utilities"),ee(h,Ti,"hud"),ee(h,Pi,"card"),ee(h,Ci,"badge"),ee(h,Ai,"button"),ee(h,Mi,"input"),ee(h,Ii,"label"),ee(h,Ei,"navTabs"),ee(h,Li,"searchBar"),ee(h,Ri,"select"),ee(h,Oi,"switch"),ee(h,Di,"table"),ee(h,Hi,"timeRangePicker"),ee(h,Gi,"tooltip"),ee(h,_i,"slider"),ee(h,Ni,"reorderableList"),ee(h,Wi,"colorPicker"),ee(h,ji,"log"),ee(h,Bi,"settings");let{panel:S,tabbar:T,content:x,resizer:v,closeButton:k,wrapper:L}=Dn({shadow:h,initialOpen:r});function E(_){S.dispatchEvent(new CustomEvent("gemini:hud-open-change",{detail:{isOpen:_},bubbles:!0})),i?.(_)}function P(_){let O=S.classList.contains("open");S.classList.toggle("open",_),S.setAttribute("aria-hidden",_?"false":"true"),_!==O&&E(_)}P(r),k.addEventListener("click",_=>{_.preventDefault(),_.stopPropagation(),P(!1)});let R=In({host:b,themes:a,initialTheme:s,onThemeChange:u}),M=Hn({resizer:v,host:b,panel:S,shadow:h,onWidthChange:o||(()=>{}),initialWidth:n,minWidth:f,maxWidth:g});M.setHudWidth(n);let U=d({applyTheme:R.applyTheme,initialTheme:s,getCurrentTheme:R.getCurrentTheme,setHUDWidth:M.setHudWidth,setHUDOpen:P}),J=new st(U,x,{applyTheme:R.applyTheme,getCurrentTheme:R.getCurrentTheme}),K=U.map(_=>({id:_.id,label:_.label})),N=lr(K,l||K[0]?.id||"",_=>{J.activate(_),c?.(_)});N.root.style.flex="1 1 auto",N.root.style.minWidth="0",T.append(N.root,k),J.activate(l||K[0]?.id||"");let j=Gn({panel:S,onToggle:()=>P(!S.classList.contains("open")),onClose:()=>P(!1),toggleCombo:p,closeOnEscape:m}),H=()=>{N.recalc();let _=parseInt(getComputedStyle(b).getPropertyValue("--w"))||n;M.calculateResponsiveBounds(),M.setHudWidth(_)};C.addEventListener("resize",H);function D(){j.destroy(),M.destroy(),C.removeEventListener("resize",H)}return{host:b,shadow:h,wrapper:L,panel:S,content:x,setOpen:P,setWidth:M.setHudWidth,sections:U,manager:J,nav:N,destroy:D}}var Ye={isOpen:"gemini.hud.isOpen",width:"gemini.hud.width",theme:"gemini.hud.theme",activeTab:"gemini.hud.activeTab"},bt={isOpen:!1,width:480,theme:"dark",activeTab:"tab-settings"};function Bn(){return{isOpen:Le(Ye.isOpen,bt.isOpen),width:Le(Ye.width,bt.width),theme:Le(Ye.theme,bt.theme),activeTab:Le(Ye.activeTab,bt.activeTab)}}function Xe(e,t){lt(Ye[e],t)}var Rl="https://i.imgur.com/IMkhMur.png",Ol="Stats";function Xt(e){let t=e.iconUrl||Rl,n=e.ariaLabel||"Open MGH",r=null,o=null,i=null,a=!1,s=null,u=null,d=["Chat","Leaderboard","Stats","Open Activity Log"],l=T=>{try{return typeof CSS<"u"&&CSS&&typeof CSS.escape=="function"?CSS.escape(T):T.replace(/"/g,'\\"')}catch{return T}};function c(){let T=document.querySelector(d.map(v=>`button[aria-label="${l(v)}"]`).join(","));if(!T)return null;let x=T.parentElement;for(;x&&x!==document.body;){if(d.reduce((k,L)=>k+x.querySelectorAll(`button[aria-label="${l(L)}"]`).length,0)>=2)return x;x=x.parentElement}return null}function p(T){return T}function m(T){let x=Array.from(T.querySelectorAll("button[aria-label]"));if(!x.length)return{refBtn:null,refWrapper:null};let v=x.filter(U=>U.dataset.mghBtn!=="true"&&(U.getAttribute("aria-label")||"")!==(e.ariaLabel||"Open MGH")),k=v.length?v:x,L=k.find(U=>(U.getAttribute("aria-label")||"").toLowerCase()===Ol.toLowerCase())||null,E=k.length>=2?k.length-2:k.length-1,P=L||k[E],R=P.parentElement,M=R&&R.parentElement===T&&R.tagName==="DIV"?R:null;return{refBtn:P,refWrapper:M}}function f(T,x,v){let k=T.cloneNode(!1);k.type="button",k.setAttribute("aria-label",x),k.title=x,k.dataset.mghBtn="true",k.style.pointerEvents="auto",k.removeAttribute("id");let L=document.createElement("img");return L.src=v,L.alt="MGH",L.style.pointerEvents="none",L.style.userSelect="none",L.style.width="76%",L.style.height="76%",L.style.objectFit="contain",L.style.display="block",L.style.margin="auto",k.appendChild(L),k.addEventListener("click",E=>{E.preventDefault(),E.stopPropagation();try{e.onClick?.()}catch{}}),k}function g(){if(a)return!1;a=!0;let T=!1;try{let x=c();if(!x)return!1;s!==x&&(s=x);let{refBtn:v,refWrapper:k}=m(x);if(!v)return!1;o=x.querySelector('div[data-mgh-wrapper="true"]'),!o&&k&&(o=k.cloneNode(!1),o.dataset.mghWrapper="true",o.removeAttribute("id"),T=!0);let L=o?.querySelector('button[data-mgh-btn="true"]')||null;r||(r=L),r||(r=f(v,n,t),o?o.appendChild(r):r.parentElement!==x&&x.appendChild(r),T=!0),o&&o.parentElement!==x&&(x.appendChild(o),T=!0);let E=x;if(E&&E!==u){try{S.disconnect()}catch{}u=E,S.observe(u,{childList:!0,subtree:!0})}return T}finally{a=!1}}g();let b=document.getElementById("App")||document.body,h=null,S=new MutationObserver(T=>{let x=T.every(k=>{let L=Array.from(k.addedNodes||[]),E=Array.from(k.removedNodes||[]),P=L.concat(E);if(P.length===0){let R=k.target;return o&&(R===o||o.contains(R))||r&&(R===r||r.contains(R))}return P.every(R=>!!(!(R instanceof HTMLElement)||o&&(R===o||o.contains(R))||r&&(R===r||r.contains(R))))}),v=T.some(k=>Array.from(k.removedNodes||[]).some(L=>L instanceof HTMLElement?!!(o&&(L===o||o.contains(L))||r&&(L===r||r.contains(L))):!1));x&&!v||h===null&&(h=window.setTimeout(()=>{if(h=null,g()&&o){let L=o.parentElement;L&&L.lastElementChild!==o&&L.appendChild(o)}},150))});return S.observe(b,{childList:!0,subtree:!0}),i=()=>S.disconnect(),()=>{try{i?.()}catch{}try{o?.remove()}catch{}}}var _l={},Ui=[];function Dl(){return Ui.slice()}function Hl(e){Ui.push(e)}function zi(e){try{return JSON.parse(e)}catch{return}}function Fi(e){if(typeof e=="string"){let t=zi(e);return t!==void 0?t:e}return e}function $i(e){if(e!=null){if(typeof e=="string"){let t=zi(e);return t!==void 0?$i(t):e}if(Array.isArray(e)&&typeof e[0]=="string")return e[0];if(typeof e=="object"){let t=e;return t.type??t.Type??t.kind??t.messageType}}}function Gl(e){let t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function B(e,t,n){let r=typeof t=="boolean"?t:!0,o=typeof t=="function"?t:n,i=(a,s)=>{if($i(a)!==e)return;let d=o(a,s);return d&&typeof d=="object"&&"kind"in d?d:typeof d=="boolean"?d?void 0:{kind:"drop"}:r?void 0:{kind:"drop"}};return Hl(i),i}var ht=new WeakSet,Vi=new WeakMap;function Ki(e){let t=e.pageWindow,n=!!e.debug,r=e.middlewares&&e.middlewares.length?e.middlewares:Dl();if(!r.length)return()=>{};let o=p=>({ws:p,pageWindow:t,debug:n}),i=(p,m)=>{let f=p;for(let g of r){let b=g(f,o(m));if(b){if(b.kind==="drop")return{kind:"drop"};b.kind==="replace"&&(f=b.message)}}return f!==p?{kind:"replace",message:f}:void 0},a=null,s=null,u=null,d=()=>{let p=t?.MagicCircle_RoomConnection,m=p?.sendMessage;if(!p||typeof m!="function")return!1;if(ht.has(m))return!0;let f=m.bind(p);function g(...b){let h=b.length===1?b[0]:b,S=Fi(h),T=i(S,Gl(t));if(T?.kind==="drop"){n&&console.log("[WS] drop outgoing (RoomConnection.sendMessage)",S);return}if(T?.kind==="replace"){let x=T.message;return b.length>1&&Array.isArray(x)?(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",S,"=>",x),f(...x)):(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",S,"=>",x),f(x))}return f(...b)}ht.add(g),Vi.set(g,m);try{p.sendMessage=g,ht.add(p.sendMessage),n&&console.log("[WS] outgoing patched via MagicCircle_RoomConnection.sendMessage")}catch{return!1}return a=()=>{try{p.sendMessage===g&&(p.sendMessage=m)}catch{}},!0};(()=>{let p=t?.WebSocket?.prototype,m=p?.send;if(typeof m!="function"||ht.has(m))return;function f(g){let b=Fi(g),h=i(b,this);if(h?.kind==="drop"){n&&console.log("[WS] drop outgoing (ws.send)",b);return}if(h?.kind==="replace"){let S=h.message,T=typeof S=="string"||S instanceof ArrayBuffer||S instanceof Blob?S:JSON.stringify(S);return n&&console.log("[WS] replace outgoing (ws.send)",b,"=>",S),m.call(this,T)}return m.call(this,g)}ht.add(f),Vi.set(f,m);try{p.send=f,n&&console.log("[WS] outgoing patched via WebSocket.prototype.send")}catch{return}s=()=>{try{p.send===f&&(p.send=m)}catch{}}})();let c=e.waitForRoomConnectionMs??4e3;if(!d()&&c>0){let p=Date.now();u=setInterval(()=>{if(d()){clearInterval(u),u=null;return}Date.now()-p>c&&(clearInterval(u),u=null,n&&console.log("[WS] RoomConnection not found, only ws.send is patched"))},250)}return()=>{if(u){try{clearInterval(u)}catch{}u=null}if(a){try{a()}catch{}a=null}if(s){try{s()}catch{}s=null}}}(function(){try{let t=_l,n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();var Bl={},Ji=[];function Nl(){return Ji.slice()}function qi(e){Ji.push(e)}function Wl(e){if(e!=null){if(typeof e=="object"){let t=e;if(typeof t.type=="string")return t.type;if(typeof t.Type=="string")return t.Type;if(typeof t.kind=="string")return t.kind;if(typeof t.messageType=="string")return t.messageType}if(Array.isArray(e)&&typeof e[0]=="string")return e[0]}}function jl(e){if(typeof e=="string")try{return JSON.parse(e)}catch{return e}return e}var Fn=Symbol.for("ariesmod.ws.handlers.patched");function te(e,t){if(typeof e=="string"){let o=e,i={match:a=>a.kind==="message"&&a.type===o,handle:t};return qi(i),i}let n=e,r={match:o=>o.kind==="close"&&o.code===n,handle:t};return qi(r),r}function Yi(e,t=Nl(),n={}){let r=n.pageWindow??window,o=!!n.debug;if(e[Fn])return()=>{};e[Fn]=!0;let i={ws:e,pageWindow:r,debug:o},a=c=>{for(let p of t)try{if(!p.match(c))continue;if(p.handle(c,i)===!0)return}catch(m){o&&console.error("[WS] handler error",m,c)}},s=c=>{let p=jl(c.data),m=Wl(p);a({kind:"message",raw:c.data,data:p,type:m})},u=c=>{a({kind:"close",code:c.code,reason:c.reason,wasClean:c.wasClean,event:c})},d=c=>a({kind:"open",event:c}),l=c=>a({kind:"error",event:c});return e.addEventListener("message",s),e.addEventListener("close",u),e.addEventListener("open",d),e.addEventListener("error",l),()=>{try{e.removeEventListener("message",s)}catch{}try{e.removeEventListener("close",u)}catch{}try{e.removeEventListener("open",d)}catch{}try{e.removeEventListener("error",l)}catch{}try{delete e[Fn]}catch{}}}(function(){try{let t=Bl,n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();te(4800,(e,t)=>{t.debug&&console.log("[WS][Close] Auth failure",e.code,e.reason)});te(4300,(e,t)=>{t.debug&&console.log("[WS][Close] Superseded",e.code,e.reason)});te(4400,(e,t)=>{t.debug&&console.log("[WS][Close] Heartbeat expired",e.code,e.reason)});te(4500,(e,t)=>{t.debug&&console.log("[WS][Close] Player kicked",e.code,e.reason)});te(4200,(e,t)=>{t.debug&&console.log("[WS][Close] Player left voluntarily",e.code,e.reason)});te(4100,(e,t)=>{t.debug&&console.log("[WS][Close] Reconnect initiated",e.code,e.reason)});te(4310,(e,t)=>{t.debug&&console.log("[WS][Close] Server disposed",e.code,e.reason)});te(4250,(e,t)=>{t.debug&&console.log("[WS][Close] User session superseded",e.code,e.reason)});te(4710,(e,t)=>{t.debug&&console.log("[WS][Close] Version expired",e.code,e.reason)});te(4700,(e,t)=>{t.debug&&console.log("[WS][Close] Version mismatch",e.code,e.reason)});te(we.Config,(e,t)=>{t.debug&&console.log("[WS][STC] Config",e.data)});te(we.CurrencyTransaction,(e,t)=>{t.debug&&console.log("[WS][STC] CurrencyTransaction",e.data)});te(we.Emote,(e,t)=>{t.debug&&console.log("[WS][STC] Emote",e.data)});te(we.InappropriateContentRejected,(e,t)=>{t.debug&&console.log("[WS][STC] InappropriateContentRejected",e.data)});te(we.PartialState,(e,t)=>{t.debug&&console.log("[WS][STC] PartialState",e.data)});te(we.Pong,(e,t)=>{t.debug&&console.log("[WS][STC] Pong",e.data)});te(we.ServerErrorMessage,(e,t)=>{t.debug&&console.log("[WS][STC] ServerErrorMessage",e.data)});te(we.Welcome,(e,t)=>{t.debug&&console.log("[WS][STC] Welcome",e.data)});B(A.PlantSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantSeed"),!!1));B(A.WaterPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] WaterPlant"),!!1));B(A.HarvestCrop,(e,t)=>(t.debug&&console.log("[MW][Garden] HarvestCrop"),!!1));B(A.SellAllCrops,(e,t)=>(t.debug&&console.log("[MW][Garden] SellAllCrops"),!!1));B(A.PurchaseSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseSeed"),!!1));B(A.PurchaseEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseEgg"),!!1));B(A.PurchaseTool,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseTool"),!!1));B(A.PurchaseDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseDecor"),!!1));B(A.PlantEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantEgg"),!!1));B(A.HatchEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] HatchEgg"),!!1));B(A.PlantGardenPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantGardenPlant"),!!1));B(A.PotPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PotPlant"),!!1));B(A.MutationPotion,(e,t)=>(t.debug&&console.log("[MW][Garden] MutationPotion"),!!1));B(A.PickupDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PickupDecor"),!!1));B(A.PlaceDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PlaceDecor"),!!1));B(A.RemoveGardenObject,(e,t)=>(t.debug&&console.log("[MW][Garden] RemoveGardenObject"),!!1));B(A.MoveInventoryItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveInventoryItem"),!!1));B(A.DropObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] DropObject"),!!1));B(A.PickupObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] PickupObject"),!!1));B(A.ToggleFavoriteItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] ToggleFavoriteItem"),!!1));B(A.PutItemInStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] PutItemInStorage"),!!1));B(A.RetrieveItemFromStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] RetrieveItemFromStorage"),!!1));B(A.MoveStorageItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveStorageItem"),!!1));B(A.LogItems,(e,t)=>(t.debug&&console.log("[MW][Inventory] LogItems"),!!1));B(A.PlacePet,(e,t)=>(t.debug&&console.log("[MW][Pets] PlacePet"),!!1));B(A.FeedPet,(e,t)=>(t.debug&&console.log("[MW][Pets] FeedPet"),!!1));B(A.PetPositions,(e,t)=>(t.debug&&console.log("[MW][Pets] PetPositions"),!!1));B(A.SwapPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SwapPet"),!!1));B(A.StorePet,(e,t)=>(t.debug&&console.log("[MW][Pets] StorePet"),!!1));B(A.NamePet,(e,t)=>(t.debug&&console.log("[MW][Pets] NamePet"),!!1));B(A.SellPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SellPet"),!!1));console.log("[WS] TESTTEST");B(A.SetSelectedGame,(e,t)=>(t.debug&&console.log("[MW][Session] SetSelectedGame"),!!1));B(A.VoteForGame,(e,t)=>(t.debug&&console.log("[MW][Session] VoteForGame"),!!1));B(A.RequestGame,(e,t)=>(t.debug&&console.log("[MW][Session] RequestGame"),!!1));B(A.RestartGame,(e,t)=>(t.debug&&console.log("[MW][Session] RestartGame"),!!1));B(A.Ping,(e,t)=>(t.debug&&console.log("[MW][Session] Ping"),!!1));B(A.PlayerPosition,(e,t)=>(t.debug&&console.log("[MW][Session] PlayerPosition"),!!1));B(A.Teleport,(e,t)=>(t.debug&&console.log("[MW][Session] Teleport"),!!1));B(A.CheckWeatherStatus,(e,t)=>(t.debug&&console.log("[MW][Session] CheckWeatherStatus"),!!1));B(A.Chat,(e,t)=>(t.debug&&console.log("[MW][Social] Chat"),!!1));B(A.Dev,(e,t)=>(t.debug&&console.log("[MW][Social] Dev"),!!1));B(A.Emote,(e,t)=>(t.debug&&console.log("[MW][Social] Emote"),!!1));B(A.Wish,(e,t)=>(t.debug&&console.log("[MW][Social] Wish"),!!1));B(A.KickPlayer,(e,t)=>(t.debug&&console.log("[MW][Social] KickPlayer"),!!1));B(A.ReportSpeakingStart,(e,t)=>(t.debug&&console.log("[MW][Voice] ReportSpeakingStart"),!!1));B(A.SetPlayerData,(e,t)=>(t.debug&&console.log("[MW][Social] SetPlayerData"),!!1));B(A.UsurpHost,(e,t)=>(t.debug&&console.log("[MW][Social] UsurpHost"),!!1));function Fl(e={}){let t=e.pageWindow??C,n=e.pollMs??500,r=!!e.debug,o=[];o.push(Ir(t,{debug:r})),o.push(Ki({pageWindow:t,middlewares:e.middlewares,debug:r}));let i=null,a=s=>{if(i){try{i()}catch{}i=null}s&&(i=Yi(s,e.handlers,{debug:r,pageWindow:t}))};return a(gt(t).ws),o.push(qt(s=>a(s.ws),{intervalMs:n,debug:r,pageWindow:t})),{getWs:()=>gt(t).ws,dispose:()=>{for(let s=o.length-1;s>=0;s--)try{o[s]()}catch{}if(i){try{i()}catch{}i=null}}}}var Qt=null;function Xi(e={}){return Qt||(Qt=Fl(e),Qt)}Ae();var yt=null;function Vl(){return C?.document??(typeof document<"u"?document:null)}function Un(e){if(yt!==null)return;let t=e??Vl();if(!t)return;let n=t.scripts;for(let r=0;r<n.length;r++){let i=n.item(r)?.src;if(!i)continue;let a=i.match(/\/(?:r\/\d+\/)?version\/([^/]+)/);if(a?.[1]){yt=a[1];return}}}function Ul(){return Un(),yt}async function zl(e=15e3){let t=performance.now();for(;performance.now()-t<e;){if(Un(),yt)return yt;await Ce(50)}throw new Error("MGVersion timeout (gameVersion not found)")}var xt={init:Un,get:Ul,wait:zl};var Zi=C?.location?.origin||"https://magicgarden.gg";function ea(){return typeof GM_xmlhttpRequest=="function"}function ta(e,t="text"){return new Promise((n,r)=>{GM_xmlhttpRequest({method:"GET",url:e,responseType:t,onload:o=>o.status>=200&&o.status<300?n(o):r(new Error(`HTTP ${o.status} for ${e}`)),onerror:()=>r(new Error(`Network error for ${e}`)),ontimeout:()=>r(new Error(`Timeout for ${e}`))})})}async function Qe(e){if(ea())return JSON.parse((await ta(e,"text")).responseText);let t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.json()}async function en(e){if(ea())return(await ta(e,"blob")).response;let t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.blob()}function na(e){return new Promise((t,n)=>{let r=URL.createObjectURL(e),o=C?.Image||Image,i=new o;i.decoding="async",i.onload=()=>{URL.revokeObjectURL(r),t(i)},i.onerror=()=>{URL.revokeObjectURL(r),n(new Error("Image decode failed"))},i.src=r})}var de=(e,t)=>e.replace(/\/?$/,"/")+String(t||"").replace(/^\//,""),$l=e=>e.lastIndexOf("/")>=0?e.slice(0,e.lastIndexOf("/")+1):"",zn=(e,t)=>String(t||"").startsWith("/")?String(t).slice(1):$l(e)+String(t||"");var tn=null,nn=null;async function oa(){return nn||tn||(tn=(async()=>{let e=await xt.wait(15e3);return nn=`${Zi}/version/${e}/assets/`,nn})(),tn)}async function Kl(e){let t=await oa();return de(t,e)}var xe={base:oa,url:Kl};var $n=new Map;async function ql(e){let t=e||await xe.base();if($n.has(t))return $n.get(t);let n=Qe(de(t,"manifest.json"));return $n.set(t,n),n}function Jl(e,t){return e?.bundles?.find(n=>n?.name===t)||null}function Yl(e){let t=new Set;for(let n of e?.assets||[])for(let r of n?.src||[])typeof r=="string"&&r.endsWith(".json")&&r!=="manifest.json"&&t.add(r);return Array.from(t)}var fe={load:ql,getBundle:Jl,listJsonFromBundle:Yl};Ae();Ae();Ae();var ra=Function.prototype.bind,X={_bindPatched:!1,engine:null,tos:null,app:null,renderer:null,ticker:null,stage:null},ia,aa,sa,Xl=new Promise(e=>{ia=e}),Ql=new Promise(e=>{aa=e}),Zl=new Promise(e=>{sa=e});function ec(e){return!!(e&&typeof e=="object"&&typeof e.start=="function"&&typeof e.destroy=="function"&&e.app&&e.app.stage&&e.app.renderer&&e.systems&&typeof e.systems.values=="function")}function tc(e){try{for(let t of e.systems.values()){let n=t?.system;if(n?.name==="tileObject")return n}}catch{}return null}function nc(e){X.engine=e,X.tos=tc(e)||null,X.app=e.app||null,X.renderer=e.app?.renderer||null,X.ticker=e.app?.ticker||null,X.stage=e.app?.stage||null;try{ia(e)}catch{}try{X.app&&aa(X.app)}catch{}try{X.renderer&&sa(X.renderer)}catch{}}function Kn(){return X.engine?!0:(X._bindPatched||(X._bindPatched=!0,Function.prototype.bind=function(e,...t){let n=ra.call(this,e,...t);try{!X.engine&&ec(e)&&(Function.prototype.bind=ra,X._bindPatched=!1,nc(e))}catch{}return n}),!1)}Kn();async function oc(e=15e3){let t=performance.now();for(;performance.now()-t<e;){if(X.engine)return!0;Kn(),await Ce(50)}throw new Error("MGPixiHooks: engine capture timeout")}async function rc(e=15e3){return X.engine||await oc(e),!0}function ic(){return X.engine&&X.app?{ok:!0,engine:X.engine,tos:X.tos,app:X.app}:(Kn(),{ok:!1,engine:X.engine,tos:X.tos,app:X.app,note:"Not captured. Wait for room, or reload."})}var ie={engineReady:Xl,appReady:Ql,rendererReady:Zl,engine:()=>X.engine,tos:()=>X.tos,app:()=>X.app,renderer:()=>X.renderer,ticker:()=>X.ticker,stage:()=>X.stage,PIXI:()=>C.PIXI||null,init:rc,hook:ic,ready:()=>!!X.engine};function vt(e){let t=String(e||"").trim();return t?t.startsWith("sprite/")||t.startsWith("sprites/")?t:t.includes("/")?`sprite/${t}`:t:""}function Ze(e,t){let n=String(e||"").trim().replace(/^sprites?\//,"").replace(/^\/+|\/+$/g,""),r=String(t||"").trim();return r.includes("/")||!n?vt(r):`sprite/${n}/${r}`}function et(e,t,n,r){let o=Ze(e,t);if(n.has(o)||r.has(o))return o;let i=String(t||"").trim();if(n.has(i)||r.has(i))return i;let a=vt(i);return n.has(a)||r.has(a)?a:o}function ac(e,t,n=25e3){let r=[e],o=new Set,i=0;for(;r.length&&i++<n;){let a=r.pop();if(!a||o.has(a))continue;if(o.add(a),t(a))return a;let s=a.children;if(Array.isArray(s))for(let u=s.length-1;u>=0;u--)r.push(s[u])}return null}function sc(e){let t=C.PIXI;if(t?.Texture&&t?.Sprite&&t?.Container&&t?.Rectangle)return{Container:t.Container,Sprite:t.Sprite,Texture:t.Texture,Rectangle:t.Rectangle,AnimatedSprite:t.AnimatedSprite||null};let n=e?.stage,r=ac(n,o=>o?.texture?.frame&&o?.constructor&&o?.texture?.constructor&&o?.texture?.frame?.constructor);if(!r)throw new Error("No Sprite found yet (constructors).");return{Container:n.constructor,Sprite:r.constructor,Texture:r.texture.constructor,Rectangle:r.texture.frame.constructor,AnimatedSprite:t?.AnimatedSprite||null}}async function la(e,t=15e3){let{sleep:n}=await Promise.resolve().then(()=>(Ae(),Qi)),r=performance.now();for(;performance.now()-r<t;)try{return sc(e)}catch{await n(50)}throw new Error("Constructors timeout")}var He=(...e)=>{try{console.log("[MGSprite]",...e)}catch{}};function lc(e){return e&&typeof e=="object"&&e.frames&&e.meta&&typeof e.meta.image=="string"}function qn(e,t,n,r,o){return new e(t,n,r,o)}function cc(e,t,n,r,o,i,a){let s;try{s=new e({source:t.source,frame:n,orig:r,trim:o||void 0,rotate:i||0})}catch{s=new e(t.baseTexture||t,n,r,o||void 0,i||0)}if(a)if(s.defaultAnchor?.set)try{s.defaultAnchor.set(a.x,a.y)}catch{}else s.defaultAnchor?(s.defaultAnchor.x=a.x,s.defaultAnchor.y=a.y):s.defaultAnchor={x:a.x,y:a.y};try{s.updateUvs?.()}catch{}return s}function uc(e,t,n,r){let{Texture:o,Rectangle:i}=r;for(let[a,s]of Object.entries(e.frames)){let u=s.frame,d=!!s.rotated,l=d?2:0,c=d?u.h:u.w,p=d?u.w:u.h,m=qn(i,u.x,u.y,c,p),f=s.sourceSize||{w:u.w,h:u.h},g=qn(i,0,0,f.w,f.h),b=null;if(s.trimmed&&s.spriteSourceSize){let h=s.spriteSourceSize;b=qn(i,h.x,h.y,h.w,h.h)}n.set(a,cc(o,t,m,g,b,l,s.anchor||null))}}function dc(e,t,n){if(!(!e.animations||typeof e.animations!="object"))for(let[r,o]of Object.entries(e.animations)){if(!Array.isArray(o))continue;let i=o.map(a=>t.get(a)).filter(Boolean);i.length>=2&&n.set(r,i)}}function pc(e,t){let n=(r,o)=>{let i=String(r||"").trim(),a=String(o||"").trim();!i||!a||(t.has(i)||t.set(i,new Set),t.get(i).add(a))};for(let r of Object.keys(e.frames||{})){let o=/^sprite\/([^/]+)\/(.+)$/.exec(r);o&&n(o[1],o[2])}}async function ca(e,t){let n=await fe.load(e),r=fe.getBundle(n,"default");if(!r)throw new Error("No default bundle in manifest");let o=fe.listJsonFromBundle(r),i=new Set,a=new Map,s=new Map,u=new Map;async function d(l){if(i.has(l))return;i.add(l);let c=await Qe(de(e,l));if(!lc(c))return;let p=c.meta?.related_multi_packs;if(Array.isArray(p))for(let b of p)await d(zn(l,b));let m=zn(l,c.meta.image),f=await na(await en(de(e,m))),g=t.Texture.from(f);uc(c,g,a,t),dc(c,a,s),pc(c,u)}for(let l of o)await d(l);return{textures:a,animations:s,categoryIndex:u}}var ua={enabled:!0,maxEntries:1200,maxCost:5e3,srcCanvasMax:450};function da(){return{lru:new Map,cost:0,srcCanvas:new Map}}function Jn(e,t){return`${t.sig}::${e}`}function pa(e){return e?e.isAnim?e.frames?.length||0:e.tex?1:0:0}function mc(e,t,n){e.lru.delete(t),e.lru.set(t,n)}function fc(e,t){if(t.enabled)for(;e.lru.size>t.maxEntries||e.cost>t.maxCost;){let n=e.lru.keys().next().value;if(n===void 0)break;let r=e.lru.get(n);e.lru.delete(n),e.cost=Math.max(0,e.cost-pa(r??null))}}function Yn(e,t){let n=e.lru.get(t);return n?(mc(e,t,n),n):null}function Xn(e,t,n,r){e.lru.set(t,n),e.cost+=pa(n),fc(e,r)}function ma(e){e.lru.clear(),e.cost=0,e.srcCanvas.clear()}function fa(e,t){return e.srcCanvas.get(t)??null}function ga(e,t,n,r){if(e.srcCanvas.set(t,n),e.srcCanvas.size>r.srcCanvasMax){let o=e.srcCanvas.keys().next().value;o!==void 0&&e.srcCanvas.delete(o)}}function gc(){return{ready:!1,app:null,renderer:null,ctors:null,baseUrl:null,textures:new Map,animations:new Map,live:new Set,defaultParent:null,overlay:null,categoryIndex:null}}var on=null,re=gc(),bc=da(),hc={...ua};function ae(){return re}function tt(){return bc}function St(){return hc}function Qn(){return re.ready}async function ba(){return re.ready?!0:on||(on=(async()=>{let e=performance.now();He("init start");let t=await Zt(ie.appReady,15e3,"PIXI app");He("app ready");let n=await Zt(ie.rendererReady,15e3,"PIXI renderer");He("renderer ready"),re.app=t,re.renderer=n||t?.renderer||null,re.ctors=await la(t),He("constructors resolved"),re.baseUrl=await xe.base(),He("base url",re.baseUrl);let{textures:r,animations:o,categoryIndex:i}=await ca(re.baseUrl,re.ctors);return re.textures=r,re.animations=o,re.categoryIndex=i,He("atlases loaded","textures",re.textures.size,"animations",re.animations.size,"categories",re.categoryIndex?.size??0),re.ready=!0,He("ready in",Math.round(performance.now()-e),"ms"),!0})(),on)}var Be={Gold:{overlayTall:null,tallIconOverride:null},Rainbow:{overlayTall:null,tallIconOverride:null,angle:130,angleTall:0},Wet:{overlayTall:"sprite/mutation-overlay/WetTallPlant",tallIconOverride:"sprite/mutation/Puddle"},Chilled:{overlayTall:"sprite/mutation-overlay/ChilledTallPlant",tallIconOverride:null},Frozen:{overlayTall:"sprite/mutation-overlay/FrozenTallPlant",tallIconOverride:null},Dawnlit:{overlayTall:null,tallIconOverride:null},Ambershine:{overlayTall:null,tallIconOverride:null},Dawncharged:{overlayTall:null,tallIconOverride:null},Ambercharged:{overlayTall:null,tallIconOverride:null}},ya=Object.keys(Be),yc=["Gold","Rainbow","Wet","Chilled","Frozen","Ambershine","Dawnlit","Dawncharged","Ambercharged"],ha=new Map(yc.map((e,t)=>[e,t]));function rn(e){return[...new Set(e.filter(Boolean))].sort((n,r)=>(ha.get(n)??1/0)-(ha.get(r)??1/0))}var xc=["Wet","Chilled","Frozen"];var xa=new Set(["Dawnlit","Ambershine","Dawncharged","Ambercharged"]),va={Banana:.6,Carrot:.6,Sunflower:.5,Starweaver:.5,FavaBean:.25,BurrosTail:.2},Sa={Pepper:.5,Banana:.6},wa=256,ka=.5,Ta=2;function Zn(e){if(!e.length)return{muts:[],overlayMuts:[],selectedMuts:[],sig:""};let t=rn(e),n=vc(e),r=Sc(e);return{muts:n,overlayMuts:r,selectedMuts:t,sig:`${t.join(",")}|${n.join(",")}|${r.join(",")}`}}function vc(e){let t=e.filter((o,i,a)=>Be[o]&&a.indexOf(o)===i);if(!t.length)return[];if(t.includes("Gold"))return["Gold"];if(t.includes("Rainbow"))return["Rainbow"];let n=["Ambershine","Dawnlit","Dawncharged","Ambercharged"];return t.some(o=>n.includes(o))?rn(t.filter(o=>!xc.includes(o))):rn(t)}function Sc(e){let t=e.filter((n,r,o)=>Be[n]?.overlayTall&&o.indexOf(n)===r);return rn(t)}function an(e,t){return e.map(n=>({name:n,meta:Be[n],overlayTall:Be[n]?.overlayTall??null,isTall:t}))}var wc={Gold:{op:"source-atop",colors:["rgb(235,200,0)"],a:.7},Rainbow:{op:"color",colors:["#FF1744","#FF9100","#FFEA00","#00E676","#2979FF","#D500F9"],ang:130,angTall:0,masked:!0},Wet:{op:"source-atop",colors:["rgb(50,180,200)"],a:.25},Chilled:{op:"source-atop",colors:["rgb(100,160,210)"],a:.45},Frozen:{op:"source-atop",colors:["rgb(100,130,220)"],a:.5},Dawnlit:{op:"source-atop",colors:["rgb(209,70,231)"],a:.5},Ambershine:{op:"source-atop",colors:["rgb(190,100,40)"],a:.5},Dawncharged:{op:"source-atop",colors:["rgb(140,80,200)"],a:.5},Ambercharged:{op:"source-atop",colors:["rgb(170,60,25)"],a:.5}};var sn=(()=>{try{let t=document.createElement("canvas").getContext("2d");if(!t)return new Set;let n=["color","hue","saturation","luminosity","overlay","screen","lighter","source-atop"],r=new Set;for(let o of n)t.globalCompositeOperation=o,t.globalCompositeOperation===o&&r.add(o);return r}catch{return new Set}})();function kc(e){return sn.has(e)?e:sn.has("overlay")?"overlay":sn.has("screen")?"screen":sn.has("lighter")?"lighter":"source-atop"}function Tc(e,t,n,r,o=!1){let i=(r-90)*Math.PI/180,a=t/2,s=n/2;if(!o){let c=Math.min(t,n)/2;return e.createLinearGradient(a-Math.cos(i)*c,s-Math.sin(i)*c,a+Math.cos(i)*c,s+Math.sin(i)*c)}let u=Math.cos(i),d=Math.sin(i),l=Math.abs(u)*t/2+Math.abs(d)*n/2;return e.createLinearGradient(a-u*l,s-d*l,a+u*l,s+d*l)}function Pa(e,t,n,r,o=!1){let i=r.colors?.length?r.colors:["#fff"],a=r.ang!=null?Tc(e,t,n,r.ang,o):e.createLinearGradient(0,0,0,n);i.length===1?(a.addColorStop(0,i[0]),a.addColorStop(1,i[0])):i.forEach((s,u)=>a.addColorStop(u/(i.length-1),s)),e.fillStyle=a,e.fillRect(0,0,t,n)}function Ca(e,t,n,r){let o=wc[n];if(!o)return;let i={...o};n==="Rainbow"&&r&&i.angTall!=null&&(i.ang=i.angTall);let a=n==="Rainbow"&&r,s=t.width,u=t.height;e.save();let d=i.masked?kc(i.op):"source-in";if(e.globalCompositeOperation=d,i.a!=null&&(e.globalAlpha=i.a),i.masked){let l=document.createElement("canvas");l.width=s,l.height=u;let c=l.getContext("2d");c.imageSmoothingEnabled=!1,Pa(c,s,u,i,a),c.globalCompositeOperation="destination-in",c.drawImage(t,0,0),e.drawImage(l,0,0)}else Pa(e,s,u,i,a);e.restore()}function Aa(e){return/tallplant/i.test(e)}function ln(e){let t=String(e||"").split("/");return t[t.length-1]||""}function Ma(e){switch(e){case"Ambershine":return["Ambershine","Amberlit"];case"Dawncharged":return["Dawncharged","Dawnbound"];case"Ambercharged":return["Ambercharged","Amberbound"];default:return[e]}}function Pc(e,t){let n=String(e||"").toLowerCase();for(let r of t.keys()){let o=/sprite\/mutation-overlay\/([A-Za-z0-9]+)TallPlant/i.exec(String(r));if(!o||!o[1])continue;if(o[1].toLowerCase()===n){let a=t.get(r);if(a)return{tex:a,key:r}}}return null}function Ia(e,t,n,r){if(!t)return null;let o=ln(e),i=Ma(t);for(let a of i){let s=[`sprite/mutation/${a}${o}`,`sprite/mutation/${a}-${o}`,`sprite/mutation/${a}_${o}`,`sprite/mutation/${a}/${o}`,`sprite/mutation/${a}`];for(let u of s){let d=n.get(u);if(d)return{tex:d,key:u}}if(r){let u=`sprite/mutation-overlay/${a}TallPlant`,d=n.get(u);if(d)return{tex:d,key:u};let l=`sprite/mutation-overlay/${a}`,c=n.get(l);if(c)return{tex:c,key:l};let p=Pc(t,n);if(p)return p}}return null}function Ea(e,t,n,r){if(!t)return null;let o=Be[t];if(n&&o?.tallIconOverride){let s=r.get(o.tallIconOverride);if(s)return s}let i=ln(e),a=Ma(t);for(let s of a){let u=[`sprite/mutation/${s}Icon`,`sprite/mutation/${s}`,`sprite/mutation/${s}${i}`,`sprite/mutation/${s}-${i}`,`sprite/mutation/${s}_${i}`,`sprite/mutation/${s}/${i}`];for(let d of u){let l=r.get(d);if(l)return l}if(n){let d=`sprite/mutation-overlay/${s}TallPlantIcon`,l=r.get(d);if(l)return l;let c=`sprite/mutation-overlay/${s}TallPlant`,p=r.get(c);if(p)return p}}return null}function La(e,t,n){let r=e?.orig?.width??e?.frame?.width??e?.width??1,o=e?.orig?.height??e?.frame?.height??e?.height??1,i=e?.defaultAnchor?.x??0,a=e?.defaultAnchor?.y??0,s=Sa[t]??i,u=o>r*1.5,d=va[t]??(u?a:.4),l={x:(s-i)*r,y:(d-a)*o},c=Math.min(r,o),p=Math.min(1.5,c/wa),m=ka*p;return n&&(m*=Ta),{width:r,height:o,anchorX:i,anchorY:a,offset:l,iconScale:m}}function eo(e,t,n,r,o){let i=fa(r,e);if(i)return i;let a=null;try{if(t?.extract?.canvas){let s=new n.Sprite(e);a=t.extract.canvas(s),s.destroy?.({children:!0,texture:!1,baseTexture:!1})}}catch{}if(!a){let s=e?.frame||e?._frame,u=e?.orig||e?._orig,d=e?.trim||e?._trim,l=e?.rotate||e?._rotate||0,c=e?.baseTexture?.resource?.source||e?.baseTexture?.resource||e?.source?.resource?.source||e?.source?.resource||e?._source?.resource?.source||null;if(!s||!c)throw new Error("textureToCanvas fail");a=document.createElement("canvas");let p=Math.max(1,(u?.width??s.width)|0),m=Math.max(1,(u?.height??s.height)|0),f=d?.x??0,g=d?.y??0;a.width=p,a.height=m;let b=a.getContext("2d");b.imageSmoothingEnabled=!1,l===!0||l===2||l===8?(b.save(),b.translate(f+s.height/2,g+s.width/2),b.rotate(-Math.PI/2),b.drawImage(c,s.x,s.y,s.width,s.height,-s.width/2,-s.height/2,s.width,s.height),b.restore()):b.drawImage(c,s.x,s.y,s.width,s.height,f,g,s.width,s.height)}return ga(r,e,a,o),a}function Cc(e,t,n,r,o,i,a,s){let{w:u,h:d,aX:l,aY:c,basePos:p}=t,m=[];for(let f of n){let g=new r.Sprite(e);g.anchor?.set?.(l,c),g.position.set(p.x,p.y),g.zIndex=1;let b=document.createElement("canvas");b.width=u,b.height=d;let h=b.getContext("2d");h.imageSmoothingEnabled=!1,h.save(),h.translate(u*l,d*c),h.drawImage(eo(e,o,r,i,a),-u*l,-d*c),h.restore(),Ca(h,b,f.name,f.isTall);let S=r.Texture.from(b);s.push(S),g.texture=S,m.push(g)}return m}function Ac(e,t,n,r,o,i,a,s,u,d){let{aX:l,basePos:c}=t,p=[];for(let m of n){let f=m.overlayTall&&r.get(m.overlayTall)&&{tex:r.get(m.overlayTall),key:m.overlayTall}||Ia(e,m.name,r,!0);if(!f?.tex)continue;let g=eo(f.tex,i,o,a,s);if(!g)continue;let b=g.width,h={x:0,y:0},S={x:c.x-l*b,y:0},T=document.createElement("canvas");T.width=b,T.height=g.height;let x=T.getContext("2d");if(!x)continue;x.imageSmoothingEnabled=!1,x.drawImage(g,0,0),x.globalCompositeOperation="destination-in",x.drawImage(u,-S.x,-S.y);let v=o.Texture.from(T);d.push(v);let k=new o.Sprite(v);k.anchor?.set?.(h.x,h.y),k.position.set(S.x,S.y),k.scale.set(1),k.alpha=1,k.zIndex=3,p.push(k)}return p}function Mc(e,t,n,r,o,i){let{basePos:a}=t,s=[];for(let u of n){if(u.name==="Gold"||u.name==="Rainbow")continue;let d=Ea(e,u.name,u.isTall,r);if(!d)continue;let l=new o.Sprite(d),c=d?.defaultAnchor?.x??.5,p=d?.defaultAnchor?.y??.5;l.anchor?.set?.(c,p),l.position.set(a.x+i.offset.x,a.y+i.offset.y),l.scale.set(i.iconScale),u.isTall&&(l.zIndex=-1),xa.has(u.name)&&(l.zIndex=10),l.zIndex||(l.zIndex=2),s.push(l)}return s}function to(e,t,n,r){try{if(!e||!r.renderer||!r.ctors?.Container||!r.ctors?.Sprite||!r.ctors?.Texture)return null;let{Container:o,Sprite:i,Texture:a}=r.ctors,s=e?.orig?.width??e?.frame?.width??e?.width??1,u=e?.orig?.height??e?.frame?.height??e?.height??1,d=e?.defaultAnchor?.x??.5,l=e?.defaultAnchor?.y??.5,c={x:s*d,y:u*l},p=eo(e,r.renderer,r.ctors,r.cacheState,r.cacheConfig),m=new o;m.sortableChildren=!0;let f=new i(e);f.anchor?.set?.(d,l),f.position.set(c.x,c.y),f.zIndex=0,m.addChild(f);let g=Aa(t),b=an(n.muts,g),h=an(n.overlayMuts,g),S=an(n.selectedMuts,g),T=[],x={w:s,h:u,aX:d,aY:l,basePos:c},v=ln(t),k=La(e,v,g);Cc(e,x,b,r.ctors,r.renderer,r.cacheState,r.cacheConfig,T).forEach(M=>m.addChild(M)),g&&Ac(t,x,h,r.textures,r.ctors,r.renderer,r.cacheState,r.cacheConfig,p,T).forEach(U=>m.addChild(U)),Mc(t,x,S,r.textures,r.ctors,k).forEach(M=>m.addChild(M));let P=null;if(typeof r.renderer.generateTexture=="function"?P=r.renderer.generateTexture(m,{resolution:1}):r.renderer.textureGenerator?.generateTexture&&(P=r.renderer.textureGenerator.generateTexture({target:m,resolution:1})),!P)throw new Error("no render texture");let R=P instanceof a?P:a.from(r.renderer.extract.canvas(P));P&&P!==R&&P.destroy?.(!0),m.destroy({children:!0,texture:!1,baseTexture:!1});try{R.__mg_gen=!0,R.label=`${t}|${n.sig}`}catch{}return R}catch{return null}}function Ra(e,t,n,r){if(!e||e.length<2)return null;let o=[];for(let i of e){let a=to(i,t,n,r);a&&o.push(a)}return o.length>=2?o:null}function Ic(e){if(e.overlay)return e.overlay;let t=new e.ctors.Container;t.sortableChildren=!0,t.zIndex=99999999;try{e.app.stage.sortableChildren=!0}catch{}return e.app.stage.addChild(t),e.overlay=t,t}function Ec(e){let t=e.defaultParent;if(!t)return null;try{return typeof t=="function"?t():t}catch{return null}}function Oa(e,t,n,r,o,i){if(!n.length)return t;let a=Zn(n);if(!a.sig)return t;let s=Jn(e,a),u=Yn(o,s);if(u?.tex)return u.tex;let d=to(t,e,a,{renderer:r.renderer,ctors:r.ctors,textures:r.textures,cacheState:o,cacheConfig:i});return d?(Xn(o,s,{isAnim:!1,tex:d},i),d):t}function Da(e,t,n,r,o,i){if(!n.length)return t;let a=Zn(n);if(!a.sig)return t;let s=Jn(e,a),u=Yn(o,s);if(u?.isAnim&&u.frames?.length)return u.frames;let d=Ra(t,e,a,{renderer:r.renderer,ctors:r.ctors,textures:r.textures,cacheState:o,cacheConfig:i});return d?(Xn(o,s,{isAnim:!0,frames:d},i),d):t}function no(e,t,n,r,o,i={}){if(!e.ready)throw new Error("MGSprite not ready yet");let a=et(r,o,e.textures,e.animations),s=i.mutations||[],u=i.parent||Ec(e)||Ic(e),d=e.renderer?.width||e.renderer?.view?.width||innerWidth,l=e.renderer?.height||e.renderer?.view?.height||innerHeight,c=i.center?d/2:i.x??d/2,p=i.center?l/2:i.y??l/2,m,f=e.animations.get(a);if(f&&f.length>=2){let h=Da(a,f,s,e,t,n),S=e.ctors.AnimatedSprite;if(S)m=new S(h),m.animationSpeed=i.fps?i.fps/60:i.speed??.15,m.loop=i.loop??!0,m.play();else{let T=new e.ctors.Sprite(h[0]),v=1e3/Math.max(1,i.fps||8),k=0,L=0,E=P=>{let R=e.app.ticker?.deltaMS??P*16.666666666666668;if(k+=R,k<v)return;let M=k/v|0;k%=v,L=(L+M)%h.length,T.texture=h[L]};T.__mgTick=E,e.app.ticker?.add?.(E),m=T}}else{let h=e.textures.get(a);if(!h)throw new Error(`Unknown sprite/anim key: ${a}`);let S=Oa(a,h,s,e,t,n);m=new e.ctors.Sprite(S)}let g=i.anchorX??m.texture?.defaultAnchor?.x??.5,b=i.anchorY??m.texture?.defaultAnchor?.y??.5;return m.anchor?.set?.(g,b),m.position.set(c,p),m.scale.set(i.scale??1),m.alpha=i.alpha??1,m.rotation=i.rotation??0,m.zIndex=i.zIndex??999999,u.addChild(m),e.live.add(m),m.__mgDestroy=()=>{try{m.__mgTick&&e.app.ticker?.remove?.(m.__mgTick)}catch{}try{m.destroy?.({children:!0,texture:!1,baseTexture:!1})}catch{try{m.destroy?.()}catch{}}e.live.delete(m)},m}function Lc(e,t){let n=e.renderer;if(n?.extract?.canvas)return n.extract.canvas(t);if(n?.plugins?.extract?.canvas)return n.plugins.extract.canvas(t);throw new Error("No extract.canvas available on renderer")}function oo(e,t,n,r,o,i={}){if(!e.ready)throw new Error("MGSprite not ready yet");let a=et(r,o,e.textures,e.animations),s=i.mutations||[],u=e.animations.get(a),d=Math.max(0,(i.frameIndex??0)|0),l;if(u?.length){let S=Da(a,u,s,e,t,n);l=S[d%S.length]}else{let S=e.textures.get(a);if(!S)throw new Error(`Unknown sprite/anim key: ${a}`);l=Oa(a,S,s,e,t,n)}let c=new e.ctors.Sprite(l),p=i.anchorX??c.texture?.defaultAnchor?.x??.5,m=i.anchorY??c.texture?.defaultAnchor?.y??.5;c.anchor?.set?.(p,m),c.scale.set(i.scale??1);let f=i.pad??2,g=new e.ctors.Container;g.addChild(c);try{g.updateTransform?.()}catch{}let b=c.getBounds?.(!0)||{x:0,y:0,width:c.width,height:c.height};c.position.set(-b.x+f,-b.y+f);let h=Lc(e,g);try{g.destroy?.({children:!0})}catch{}return h}function Ha(e){for(let t of Array.from(e.live))t.__mgDestroy?.()}function Ga(e,t){return e.defaultParent=t,!0}function _a(e,t){return e.defaultParent=t,!0}function nt(){if(!Qn())throw new Error("MGSprite not ready yet")}function Rc(e,t,n){return typeof t=="string"?no(ae(),tt(),St(),e,t,n||{}):no(ae(),tt(),St(),null,e,t||{})}function Oc(e,t,n){return typeof t=="string"?oo(ae(),tt(),St(),e,t,n||{}):oo(ae(),tt(),St(),null,e,t||{})}function Dc(){Ha(ae())}function Hc(e){return Ga(ae(),e)}function Gc(e){return _a(ae(),e)}function _c(e,t){let n=ae(),r=typeof t=="string"?et(e,t,n.textures,n.animations):et(null,e,n.textures,n.animations);return n.textures.has(r)||n.animations.has(r)}function Nc(){nt();let e=ae().categoryIndex;return e?Array.from(e.keys()).sort((t,n)=>t.localeCompare(n)):[]}function Wc(e){nt();let t=String(e||"").trim();if(!t)return[];let n=ae().categoryIndex;return n?Array.from(n.get(t)?.values()||[]).sort((r,o)=>r.localeCompare(o)):[]}function jc(e,t){nt();let n=String(e||"").trim(),r=String(t||"").trim();if(!n||!r)return!1;let o=ae().categoryIndex;if(!o)return!1;let i=n.toLowerCase(),a=r.toLowerCase();for(let[s,u]of o.entries())if(s.toLowerCase()===i){for(let d of u.values())if(d.toLowerCase()===a)return!0}return!1}function Bc(e){nt();let t=ae().categoryIndex;if(!t)return[];let n=String(e||"").trim().toLowerCase(),r=[];for(let[o,i]of t.entries())for(let a of i.values()){let s=Ze(o,a);(!n||s.toLowerCase().startsWith(n))&&r.push(s)}return r.sort((o,i)=>o.localeCompare(i))}function Fc(e){nt();let t=String(e||"").trim();if(!t)return null;let n=vt(t),r=/^sprite\/([^/]+)\/(.+)$/.exec(n);if(!r)return null;let o=r[1],i=r[2],a=ae().categoryIndex,s=o.toLowerCase(),u=i.toLowerCase(),d=o,l=i;if(a){let c=Array.from(a.keys()).find(f=>f.toLowerCase()===s);if(!c)return null;d=c;let p=a.get(c);if(!p)return null;let m=Array.from(p.values()).find(f=>f.toLowerCase()===u);if(!m)return null;l=m}return{category:d,id:l,key:Ze(d,l)}}function Vc(e,t){nt();let n=String(e||"").trim(),r=String(t||"").trim();if(!n||!r)throw new Error("getIdPath(category, id) requires both category and id");let o=ae().categoryIndex;if(!o)throw new Error("Sprite categories not indexed");let i=n.toLowerCase(),a=r.toLowerCase(),s=Array.from(o.keys()).find(l=>l.toLowerCase()===i)||n,u=o.get(s);if(!u)throw new Error(`Unknown sprite category: ${n}`);let d=Array.from(u.values()).find(l=>l.toLowerCase()===a)||r;if(!u.has(d))throw new Error(`Unknown sprite id: ${n}/${r}`);return Ze(s,d)}function Uc(){ma(tt())}function zc(){return[...ya]}var ke={init:ba,ready:Qn,show:Rc,toCanvas:Oc,clear:Dc,attach:Hc,attachProvider:Gc,has:_c,key:(e,t)=>Ze(e,t),getCategories:Nc,getCategoryId:Wc,hasId:jc,listIds:Bc,getIdInfo:Fc,getIdPath:Vc,clearMutationCache:Uc,getMutationNames:zc};var io=C,Me=io.Object??Object,ao=Me.keys,cn=Me.values,un=Me.entries,Fe={items:["WateringCan","PlanterPot","Shovel"],decor:["SmallRock","MediumRock","LargeRock","WoodBench","StoneBench","MarbleBench"],mutations:["Gold","Rainbow","Wet","Chilled","Frozen"],eggs:["CommonEgg","UncommonEgg","RareEgg"],pets:["Worm","Snail","Bee","Chicken","Bunny"],abilities:["ProduceScaleBoost","DoubleHarvest","SeedFinderI","CoinFinderI"],plants:["Carrot","Strawberry","Aloe","Blueberry","Apple"]},$c=["Rain","Frost","Dawn","AmberMoon"],Na=/main-[^/]+\.js(\?|$)/,Kc=3,qc=200,Jc=50,Wa=new WeakSet,q={isReady:!1,isHookInstalled:!1,data:{items:null,decor:null,mutations:null,eggs:null,pets:null,abilities:null,plants:null,weather:null},spritesResolved:!1,spritesResolving:null,weatherPollingTimer:null,weatherPollAttempts:0},Ve=(e,t)=>t.every(n=>e.includes(n));function Ue(e,t){q.data[e]==null&&(q.data[e]=t,Yc()&&Fa())}function Yc(){return Object.values(q.data).every(e=>e!=null)}function ja(e,t){if(!e||typeof e!="object"||Wa.has(e))return;Wa.add(e);let n;try{n=ao(e)}catch{return}if(!n||n.length===0)return;let r=e,o;if(!q.data.items&&Ve(n,Fe.items)&&(o=r.WateringCan,o&&typeof o=="object"&&"coinPrice"in o&&"creditPrice"in o&&Ue("items",r)),!q.data.decor&&Ve(n,Fe.decor)&&(o=r.SmallRock,o&&typeof o=="object"&&"coinPrice"in o&&"creditPrice"in o&&Ue("decor",r)),!q.data.mutations&&Ve(n,Fe.mutations)&&(o=r.Gold,o&&typeof o=="object"&&"baseChance"in o&&"coinMultiplier"in o&&Ue("mutations",r)),!q.data.eggs&&Ve(n,Fe.eggs)&&(o=r.CommonEgg,o&&typeof o=="object"&&"faunaSpawnWeights"in o&&"secondsToHatch"in o&&Ue("eggs",r)),!q.data.pets&&Ve(n,Fe.pets)&&(o=r.Worm,o&&typeof o=="object"&&"coinsToFullyReplenishHunger"in o&&"diet"in o&&Array.isArray(o.diet)&&Ue("pets",r)),!q.data.abilities&&Ve(n,Fe.abilities)&&(o=r.ProduceScaleBoost,o&&typeof o=="object"&&"trigger"in o&&"baseParameters"in o&&Ue("abilities",r)),!q.data.plants&&Ve(n,Fe.plants)&&(o=r.Carrot,o&&typeof o=="object"&&"seed"in o&&"plant"in o&&"crop"in o&&Ue("plants",r)),!(t>=Kc))for(let i of n){let a;try{a=r[i]}catch{continue}a&&typeof a=="object"&&ja(a,t+1)}}function ro(e){try{ja(e,0)}catch{}}function Ba(){if(!q.isHookInstalled){q.isHookInstalled=!0;try{Me.keys=function(t){return ro(t),ao.apply(this,arguments)},cn&&(Me.values=function(t){return ro(t),cn.apply(this,arguments)}),un&&(Me.entries=function(t){return ro(t),un.apply(this,arguments)})}catch{}}}function Fa(){if(q.isHookInstalled){try{Me.keys=ao,cn&&(Me.values=cn),un&&(Me.entries=un)}catch{}q.isHookInstalled=!1}}function Xc(){try{for(let e of io.document?.scripts||[]){let t=e?.src?String(e.src):"";if(Na.test(t))return t}}catch{}try{for(let e of io.performance?.getEntriesByType?.("resource")||[]){let t=e?.name?String(e.name):"";if(Na.test(t))return t}}catch{}return null}function Qc(e,t){let n=Math.max(e.lastIndexOf("const ",t),e.lastIndexOf("let ",t),e.lastIndexOf("var ",t));if(n<0)return null;let r=e.indexOf("=",n);if(r<0||r>t)return null;let o=e.indexOf("{",r);if(o<0||o>t)return null;let i=0,a="",s=!1;for(let u=o;u<e.length;u++){let d=e[u];if(a){if(s){s=!1;continue}if(d==="\\"){s=!0;continue}d===a&&(a="");continue}if(d==='"'||d==="'"){a=d;continue}if(d==="{")i++;else if(d==="}"&&--i===0)return e.slice(o,u+1)}return null}function Zc(e){let t={},n=!1;for(let r of $c){let o=e?.[r];if(!o||typeof o!="object")continue;let i=o.iconSpriteKey||null,{iconSpriteKey:a,...s}=o;t[r]={weatherId:r,spriteId:i,...s},n=!0}return t.Sunny||(t.Sunny={weatherId:"Sunny",name:"Sunny",spriteId:"sprite/ui/SunnyIcon",type:"primary"}),!n||t.Rain&&t.Rain.mutator?.mutation!=="Wet"?null:t}async function eu(){if(q.data.weather)return!0;let e=Xc();if(!e)return!1;let t="";try{let s=await fetch(e,{credentials:"include"});if(!s.ok)return!1;t=await s.text()}catch{return!1}let n=t.indexOf("fixedTimeSlots:[0,48,96,144,192,240]");if(n<0&&(n=t.indexOf('name:"Amber Moon"')),n<0)return!1;let r=Qc(t,n);if(!r)return!1;let o=r.replace(/\b[A-Za-z_$][\w$]*\.(Rain|Frost|Dawn|AmberMoon)\b/g,'"$1"'),i;try{i=Function('"use strict";return('+o+")")()}catch{return!1}let a=Zc(i);return a?(q.data.weather=a,!0):!1}function tu(){if(q.weatherPollingTimer)return;q.weatherPollAttempts=0;let e=setInterval(async()=>{(await eu()||++q.weatherPollAttempts>qc)&&(clearInterval(e),q.weatherPollingTimer=null)},Jc);q.weatherPollingTimer=e}function nu(e){return String(e||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^A-Za-z0-9]/g,"").trim()}function ou(e,t=[]){let n=new Set,r=o=>{let i=String(o||"").trim();i&&n.add(i)};r(e);for(let o of t)r(o);for(let o of Array.from(n.values()))o.endsWith("s")?r(o.slice(0,-1)):r(`${o}s`),o.endsWith("es")&&r(o.slice(0,-2));return Array.from(n.values()).filter(Boolean)}function Va(e,t,n,r=[],o=[]){let i=ou(e,r);if(!i.length)return null;let a=[t,...o].filter(l=>typeof l=="string"),s=l=>{let c=String(l||"").trim();if(!c)return null;for(let p of i)try{if(ke.has(p,c))return ke.getIdPath(p,c)}catch{}return null};for(let l of a){let c=s(l);if(c)return c}let u=nu(n||""),d=s(u||n||"");if(d)return d;try{for(let l of i){let c=ke.listIds(`sprite/${l}/`),p=a.map(f=>String(f||"").toLowerCase()),m=String(n||u||"").toLowerCase();for(let f of c){let b=(f.split("/").pop()||"").toLowerCase();if(p.some(h=>h&&h===b)||b===m)return f}for(let f of c){let b=(f.split("/").pop()||"").toLowerCase();if(p.some(h=>h&&b.includes(h))||m&&b.includes(m))return f}}}catch{}return null}function he(e,t,n,r,o=[],i=[]){if(!e||typeof e!="object")return;let a=e.tileRef;if(!a||typeof a!="object")return;let s=String(a.spritesheet||t||"").trim(),u=Va(s,n,r,o,i);if(u)try{e.spriteId=u}catch{}let d=e.rotationVariants;if(d&&typeof d=="object")for(let l of Object.values(d))he(l,s,n,r);if(e.immatureTileRef){let l={tileRef:e.immatureTileRef};he(l,s,n,r),l.spriteId&&(e.immatureSpriteId=l.spriteId)}if(e.topmostLayerTileRef){let l={tileRef:e.topmostLayerTileRef};he(l,s,n,r),l.spriteId&&(e.topmostLayerSpriteId=l.spriteId)}e.activeState&&typeof e.activeState=="object"&&he(e.activeState,s,n,e.activeState?.name||r)}function ru(e,t,n,r=[]){if(!Array.isArray(t)||t.length===0)return null;let o=t[0],i=t.slice(1);return Va(e,o,n??null,r,i)}function iu(e){for(let[t,n]of Object.entries(e.items||{}))he(n,"items",t,n?.name,["item"]);for(let[t,n]of Object.entries(e.decor||{}))he(n,"decor",t,n?.name);for(let[t,n]of Object.entries(e.mutations||{})){he(n,"mutations",t,n?.name,["mutation"]);let r=ru("mutation-overlay",[`${t}TallPlant`,`${t}TallPlantIcon`,t],n?.name,["mutation-overlay"]);if(r)try{n.overlaySpriteId=r}catch{}}for(let[t,n]of Object.entries(e.eggs||{}))he(n,"pets",t,n?.name,["pet"]);for(let[t,n]of Object.entries(e.pets||{}))he(n,"pets",t,n?.name,["pet"]);for(let[t,n]of Object.entries(e.plants||{})){let r=n;r.seed&&he(r.seed,r.seed?.tileRef?.spritesheet||"seeds",`${t}Seed`,r.seed?.name||`${t} Seed`,["seed","plant","plants"],[t]),r.plant&&he(r.plant,r.plant?.tileRef?.spritesheet||"plants",`${t}Plant`,r.plant?.name||`${t} Plant`,["plant","plants","tallplants"],[t]),r.crop&&he(r.crop,r.crop?.tileRef?.spritesheet||"plants",t,r.crop?.name||t,["plant","plants"],[`${t}Crop`])}}async function Ua(){if(!q.spritesResolved)return q.spritesResolving||(q.spritesResolving=(async()=>{try{await za(2e4,50),await ke.init(),iu(q.data),q.spritesResolved=!0}catch(e){try{console.warn("[MGData] sprite resolution failed",e)}catch{}}finally{q.spritesResolving=null}})()),q.spritesResolving}async function au(){return q.isReady||(Ba(),tu(),Ua(),q.isReady=!0),!0}function su(){return q.isReady}function lu(){return Fa(),q.weatherPollingTimer&&(clearInterval(q.weatherPollingTimer),q.weatherPollingTimer=null),q.isReady=!1,!0}function cu(){return!q.spritesResolved&&!q.spritesResolving&&Ua(),{...q.data}}function uu(e){return q.data[e]??null}function du(e){return q.data[e]!=null}async function za(e=1e4,t=50){let n=Date.now();for(;Date.now()-n<e;){if(Object.values(q.data).some(r=>r!=null))return{...q.data};await Ce(t)}throw new Error("MGData.waitForAnyData: timeout")}async function pu(e,t=1e4,n=50){let r=Date.now();for(;Date.now()-r<t;){let o=q.data[e];if(o!=null)return o;await Ce(n)}throw new Error(`MGData.waitFor: timeout waiting for "${e}"`)}var wt={init:au,isReady:su,stop:lu,getAll:cu,get:uu,has:du,waitForAnyData:za,waitFor:pu};Ba();Ae();var dn=null,ve={ready:!1,xform:null,xformAt:0};function rt(e){try{if(typeof structuredClone=="function")return structuredClone(e)}catch{}try{return JSON.parse(JSON.stringify(e))}catch{}return e}function kt(){return ie.tos()}function co(){return ie.engine()}function mu(){let e=kt()?.map?.cols;return Number.isFinite(e)&&e>0?e:null}function uo(e,t){let n=mu();return n?t*n+e|0:null}function ze(e,t,n=!0){let r=kt(),o=uo(e,t);if(!r||o==null)return{gidx:null,tv:null};let i=r.tileViews?.get?.(o)||null;if(!i&&n&&typeof r.getOrCreateTileView=="function")try{i=r.getOrCreateTileView(o)}catch{}return{gidx:o,tv:i||null}}function ot(e,t,n,r={}){let o=r.ensureView!==!1,i=r.forceUpdate!==!1,a=co(),{gidx:s,tv:u}=ze(Number(e),Number(t),o);if(s==null)throw new Error("MGTile: cols unavailable (engine/TOS not ready)");if(!u)throw new Error("MGTile: TileView unavailable (not instantiated)");let d=u.tileObject;if(typeof u.onDataChanged!="function")throw new Error("MGTile: tileView.onDataChanged not found (different API?)");if(u.onDataChanged(n),i&&a?.reusableContext&&typeof u.update=="function")try{u.update(a.reusableContext)}catch{}return{ok:!0,tx:Number(e),ty:Number(t),gidx:s,before:d,after:u.tileObject}}function po(e,t){if(!e)throw new Error("MGTile: no tileObject on this tile");if(e.objectType!==t)throw new Error(`MGTile: expected objectType "${t}", got "${e.objectType}"`)}function so(e,t){if("startTime"in t&&(e.startTime=Number(t.startTime)),"endTime"in t&&(e.endTime=Number(t.endTime)),"targetScale"in t&&(e.targetScale=Number(t.targetScale)),"mutations"in t){if(!Array.isArray(t.mutations))throw new Error("MGTile: mutations must be an array of strings");e.mutations=t.mutations.slice()}}function Ie(){if(!ve.ready)throw new Error("MGTile: not ready. Call MGTile.init() first.")}function lo(e){if(!e)return null;let t=o=>o&&(typeof o.getGlobalPosition=="function"||typeof o.toGlobal=="function"),n=["container","root","view","tile","ground","base","floor","bg","background","baseSprite","tileSprite","displayObject","gfx","graphics","sprite"];for(let o of n)if(t(e[o]))return e[o];if(t(e))return e;let r=[e.container,e.root,e.view,e.displayObject,e.tileSprite,e.gfx,e.graphics,e.sprite];for(let o of r)if(t(o))return o;try{for(let o of Object.keys(e))if(t(e[o]))return e[o]}catch{}return null}function pn(e){let t=ue(()=>e?.getGlobalPosition?.());if(t&&Number.isFinite(t.x)&&Number.isFinite(t.y))return{x:t.x,y:t.y};let n=ue(()=>e?.toGlobal?.({x:0,y:0}));return n&&Number.isFinite(n.x)&&Number.isFinite(n.y)?{x:n.x,y:n.y}:null}function fu(e){try{if(!e?.getBounds)return"center";let t=e.getBounds(),n=pn(e);if(!n||!t||!Number.isFinite(t.width)||!Number.isFinite(t.height))return"center";let r=t.x+t.width/2,o=t.y+t.height/2;return Math.hypot(n.x-r,n.y-o)<Math.hypot(n.x-t.x,n.y-t.y)?"center":"topleft"}catch{return"center"}}function gu(){let e=kt(),t=e?.map?.cols,n=e?.map?.rows;if(!e||!Number.isFinite(t)||t<=1)return null;let r=Number.isFinite(n)&&n>1?n:null,o=[[0,0],[1,1],[Math.min(2,t-2),0],[0,1]];r&&r>2&&o.push([Math.floor(t/2),Math.floor(r/2)]);for(let[i,a]of o){if(i<0||a<0||i>=t||r&&a>=r)continue;let s=ze(i,a,!0).tv,u=i+1<t?ze(i+1,a,!0).tv:null,d=ze(i,a+1,!0).tv,l=lo(s),c=lo(u),p=lo(d);if(!l||!c||!p)continue;let m=pn(l),f=pn(c),g=pn(p);if(!m||!f||!g)continue;let b={x:f.x-m.x,y:f.y-m.y},h={x:g.x-m.x,y:g.y-m.y},S=b.x*h.y-b.y*h.x;if(!Number.isFinite(S)||Math.abs(S)<1e-6)continue;let T=1/S,x={a:h.y*T,b:-h.x*T,c:-b.y*T,d:b.x*T},v={x:m.x-i*b.x-a*h.x,y:m.y-i*b.y-a*h.y},k=fu(l),L=k==="center"?v:{x:v.x+.5*(b.x+h.x),y:v.y+.5*(b.y+h.y)};return{ok:!0,cols:t,rows:r,vx:b,vy:h,inv:x,anchorMode:k,originCenter:L}}return null}async function bu(e=15e3){return ve.ready?!0:dn||(dn=(async()=>{if(await ie.init(e),!kt())throw new Error("MGTile: engine captured but tileObject system not found");return ve.ready=!0,!0})(),dn)}function hu(){return ie.hook()}function mn(e,t,n={}){Ie();let r=n.ensureView!==!1,o=n.clone!==!1,{gidx:i,tv:a}=ze(Number(e),Number(t),r);if(i==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!a)return{tx:Number(e),ty:Number(t),gidx:i,tileView:null,tileObject:void 0};let s=a.tileObject;return{tx:Number(e),ty:Number(t),gidx:i,tileView:a,tileObject:o?rt(s):s}}function yu(e,t,n={}){return Ie(),ot(e,t,null,n)}function xu(e,t,n,r={}){Ie();let i=mn(e,t,{...r,clone:!1}).tileView?.tileObject;po(i,"plant");let a=rt(i);if(Array.isArray(a.slots)||(a.slots=[]),"plantedAt"in n&&(a.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(a.maturedAt=Number(n.maturedAt)),"species"in n&&(a.species=String(n.species)),"slotIdx"in n&&"slotPatch"in n){let s=Number(n.slotIdx)|0;if(!a.slots[s])throw new Error(`MGTile: plant slot ${s} doesn't exist`);return so(a.slots[s],n.slotPatch),ot(e,t,a,r)}if("slots"in n){let s=n.slots;if(Array.isArray(s)){for(let u=0;u<s.length;u++)if(s[u]!=null){if(!a.slots[u])throw new Error(`MGTile: plant slot ${u} doesn't exist`);so(a.slots[u],s[u])}}else if(s&&typeof s=="object")for(let u of Object.keys(s)){let d=Number(u)|0;if(Number.isFinite(d)){if(!a.slots[d])throw new Error(`MGTile: plant slot ${d} doesn't exist`);so(a.slots[d],s[d])}}else throw new Error("MGTile: patch.slots must be array or object map");return ot(e,t,a,r)}return ot(e,t,a,r)}function vu(e,t,n,r={}){Ie();let i=mn(e,t,{...r,clone:!1}).tileView?.tileObject;po(i,"decor");let a=rt(i);return"rotation"in n&&(a.rotation=Number(n.rotation)),ot(e,t,a,r)}function Su(e,t,n,r={}){Ie();let i=mn(e,t,{...r,clone:!1}).tileView?.tileObject;po(i,"egg");let a=rt(i);return"plantedAt"in n&&(a.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(a.maturedAt=Number(n.maturedAt)),ot(e,t,a,r)}function wu(e,t,n,r={}){Ie();let o=r.ensureView!==!1,i=r.forceUpdate!==!1,a=co(),{gidx:s,tv:u}=ze(Number(e),Number(t),o);if(s==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!u)throw new Error("MGTile: TileView unavailable");let d=u.tileObject,l=typeof n=="function"?n(rt(d)):n;if(u.onDataChanged(l),i&&a?.reusableContext&&typeof u.update=="function")try{u.update(a.reusableContext)}catch{}return{ok:!0,tx:Number(e),ty:Number(t),gidx:s,before:d,after:u.tileObject}}function ku(e,t,n={}){Ie();let r=n.ensureView!==!1,{gidx:o,tv:i}=ze(Number(e),Number(t),r);if(o==null)throw new Error("MGTile: cols unavailable");if(!i)return{ok:!0,tx:Number(e),ty:Number(t),gidx:o,tv:null,tileObject:void 0};let a=n.clone!==!1,s=i.tileObject;return{ok:!0,tx:Number(e),ty:Number(t),gidx:o,objectType:s?.objectType??null,tileObject:a?rt(s):s,tvKeys:Object.keys(i||{}).sort(),tileView:i}}function $a(){return Ie(),ve.xform=gu(),ve.xformAt=Date.now(),{ok:!!ve.xform?.ok,xform:ve.xform}}function Tu(e,t={}){if(Ie(),!e||!Number.isFinite(e.x)||!Number.isFinite(e.y))return null;let n=Number.isFinite(t.maxAgeMs)?Number(t.maxAgeMs):1500;(!ve.xform?.ok||t.forceRebuild||Date.now()-ve.xformAt>n)&&$a();let r=ve.xform;if(!r?.ok)return null;let o=e.x-r.originCenter.x,i=e.y-r.originCenter.y,a=r.inv.a*o+r.inv.b*i,s=r.inv.c*o+r.inv.d*i,u=Math.floor(a),d=Math.floor(s),l=[[u,d],[u+1,d],[u,d+1],[u+1,d+1]],c=null,p=1/0;for(let[m,f]of l){if(m<0||f<0||m>=r.cols||Number.isFinite(r.rows)&&r.rows!==null&&f>=r.rows)continue;let g=r.originCenter.x+m*r.vx.x+f*r.vy.x,b=r.originCenter.y+m*r.vx.y+f*r.vy.y,h=(e.x-g)**2+(e.y-b)**2;h<p&&(p=h,c={tx:m,ty:f,fx:a,fy:s,x:e.x,y:e.y,gidx:null})}return c?(c.gidx=uo(c.tx,c.ty),c):null}function Pu(){return["MGTile.init()","MGTile.hook()","MGTile.getTileObject(tx,ty) / inspect(tx,ty)","MGTile.setTileEmpty(tx,ty)","MGTile.setTilePlant(tx,ty,{...}) / setTileDecor / setTileEgg","MGTile.setTileObjectRaw(tx,ty,objOrFn)","MGTile.rebuildTransform() / pointToTile({x,y})"].join(`
`)}var Te={init:bu,ready:()=>ve.ready,hook:hu,engine:()=>co(),tos:()=>kt(),gidx:(e,t)=>uo(Number(e),Number(t)),getTileObject:mn,inspect:ku,setTileEmpty:yu,setTilePlant:xu,setTileDecor:vu,setTileEgg:Su,setTileObjectRaw:wu,rebuildTransform:$a,pointToTile:Tu,help:Pu};Ae();var F={ready:!1,app:null,renderer:null,stage:null,ticker:null,tileSets:new Map,highlights:new Map,watches:new Map,fades:new Map,fadeWatches:new Map},ho=e=>!!e&&typeof e=="object"&&!Array.isArray(e),mo=e=>!!(e&&typeof e.getBounds=="function"&&("parent"in e||"children"in e)),gn=e=>!!(e&&typeof e.tint=="number"),$e=e=>!!(e&&typeof e.alpha=="number");function fn(e,t,n){return e+(t-e)*n}function Cu(e,t,n){let r=e>>16&255,o=e>>8&255,i=e&255,a=t>>16&255,s=t>>8&255,u=t&255,d=fn(r,a,n)|0,l=fn(o,s,n)|0,c=fn(i,u,n)|0;return d<<16|l<<8|c}function Au(e,t=900){let n=[],r=[e];for(;r.length&&n.length<t;){let o=r.pop();if(!o)continue;gn(o)&&n.push(o);let i=o.children;if(Array.isArray(i))for(let a=i.length-1;a>=0;a--)r.push(i[a])}return n}function Mu(e,t=25e3){let n=[],r=[e],o=0;for(;r.length&&o++<t;){let i=r.pop();if(!i)continue;$e(i)&&n.push(i);let a=i.children;if(Array.isArray(a))for(let s=a.length-1;s>=0;s--)r.push(a[s])}return n}function Ka(e){if(!Array.isArray(e))return[];let t=new Set,n=[];for(let r of e){let o,i;if(Array.isArray(r))o=r[0],i=r[1];else if(ho(r))o=r.x??r.tx,i=r.y??r.ty;else continue;if(o=Number(o),i=Number(i),!Number.isFinite(o)||!Number.isFinite(i))continue;o|=0,i|=0;let a=`${o},${i}`;t.has(a)||(t.add(a),n.push({x:o,y:i}))}return n}function Iu(e,t){let n=String(e||"").trim();if(!n)throw new Error("MGPixi.defineTileSet: empty name");let r=Ka(t);return F.tileSets.set(n,r),{ok:!0,name:n,count:r.length}}function Eu(e){return F.tileSets.delete(String(e||"").trim())}function Lu(){return Array.from(F.tileSets.keys()).sort((e,t)=>e.localeCompare(t))}function qa(e){return!!(e&&(e.tileSet!=null||Array.isArray(e.tiles)))}function yo(e){let n=Te.tos?.()?.tileViews;if(!n?.entries)throw new Error("MGPixi: TOS.tileViews not found");if(!qa(e))return{entries:Array.from(n.entries()),gidxSet:null};let r=[];if(e.tileSet!=null){let i=String(e.tileSet||"").trim(),a=F.tileSets.get(i);if(!a)throw new Error(`MGPixi: tileSet not found "${i}"`);r=a}else r=Ka(e.tiles||[]);let o=new Map;for(let i of r){let a=Te.getTileObject(i.x,i.y,{ensureView:!0,clone:!1});a?.tileView&&a.gidx!=null&&o.set(a.gidx,a.tileView)}return{entries:Array.from(o.entries()),gidxSet:new Set(o.keys())}}function xo(e){let t=F.highlights.get(e);if(!t)return!1;ue(()=>F.ticker?.remove(t.tick)),t.root&&t.baseAlpha!=null&&$e(t.root)&&ue(()=>{t.root.alpha=t.baseAlpha});for(let n of t.tint)n.o&&gn(n.o)&&ue(()=>{n.o.tint=n.baseTint});return F.highlights.delete(e),!0}function Ja(e=null){for(let t of Array.from(F.highlights.keys()))e&&!String(t).startsWith(e)||xo(t);return!0}function Ya(e,t={}){if(Ke(),!mo(e))throw new Error("MGPixi.highlightPulse: invalid root");let n=String(t.key||`hl:${Math.random().toString(16).slice(2)}`);if(F.highlights.has(n))return n;let r=$e(e)?Number(e.alpha):null,o=me(Number(t.minAlpha??.12),0,1),i=me(Number(t.maxAlpha??1),0,1),a=Number(t.speed??1.25),s=(t.tint??8386303)>>>0,u=me(Number(t.tintMix??.85),0,1),d=t.deepTint!==!1,l=[];if(d)for(let m of Au(e))l.push({o:m,baseTint:m.tint});else gn(e)&&l.push({o:e,baseTint:e.tint});let c=performance.now(),p=()=>{let m=(performance.now()-c)/1e3,f=(Math.sin(m*Math.PI*2*a)+1)/2,g=f*f*(3-2*f);r!=null&&$e(e)&&(e.alpha=me(fn(o,i,g)*r,0,1));let b=g*u;for(let h of l)h.o&&gn(h.o)&&(h.o.tint=Cu(h.baseTint,s,b))};return F.ticker?.add(p),F.highlights.set(n,{root:e,tick:p,baseAlpha:r,tint:l}),n}var Ru=["plantVisual","cropVisual","slotVisual","slotView","displayObject","view","container","root","sprite","gfx","graphics"];function fo(e){if(!e)return null;if(mo(e))return e;if(!ho(e))return null;for(let t of Ru){let n=e[t];if(mo(n))return n}return null}function Ou(e,t){let n=[{o:e,d:0}],r=new Set,o=6;for(;n.length;){let{o:i,d:a}=n.shift();if(!(!i||a>o)&&!r.has(i)){if(r.add(i),Array.isArray(i)){if(i.length===t){let s=new Array(t),u=!0;for(let d=0;d<t;d++){let l=fo(i[d]);if(!l){u=!1;break}s[d]=l}if(u)return s}for(let s of i)n.push({o:s,d:a+1});continue}if(ho(i)){let s=i;for(let u of Object.keys(s))n.push({o:s[u],d:a+1})}}}return null}function Du(e,t){let n=e?.mutations;if(!Array.isArray(n))return!1;for(let r of n)if(String(r||"").toLowerCase()===t)return!0;return!1}function Xa(e,t={}){Ke();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.highlightMutation: empty mutation");let{entries:r,gidxSet:o}=yo(t),i=`hlmut:${n}:`;if(t.clear===!0)if(!o)Ja(i);else for(let c of Array.from(F.highlights.keys())){if(!c.startsWith(i))continue;let p=c.split(":"),m=Number(p[2]);o.has(m)&&xo(c)}let a={tint:(t.tint??8386303)>>>0,minAlpha:Number(t.minAlpha??.12),maxAlpha:Number(t.maxAlpha??1),speed:Number(t.speed??1.25),tintMix:Number(t.tintMix??.85),deepTint:t.deepTint!==!1},s=0,u=0,d=0,l=0;for(let[c,p]of r){let m=p?.tileObject;if(!m||m.objectType!=="plant")continue;let f=m.slots;if(!Array.isArray(f)||f.length===0)continue;let g=!1,b=[];for(let T=0;T<f.length;T++)Du(f[T],n)&&(b.push(T),g=!0);if(!g)continue;s++,u+=b.length;let h=p?.childView?.plantVisual||p?.childView||p,S=Ou(h,f.length);if(!S){l+=b.length;continue}for(let T of b){let x=S[T];if(!x){l++;continue}let v=`${i}${c}:${T}`;F.highlights.has(v)||(Ya(x,{key:v,...a}),d++)}}return{ok:!0,mutation:n,filtered:!!o,plantsMatched:s,matchedSlots:u,newHighlights:d,failedSlots:l}}function Hu(e,t={}){Ke();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchMutation: empty mutation");let r=`watchmut:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,o=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,i=F.watches.get(r);i&&clearInterval(i);let a=setInterval(()=>{ue(()=>Xa(n,{...t,clear:!1}))},o);return F.watches.set(r,a),{ok:!0,key:r,mutation:n,intervalMs:o}}function Gu(e){let t=String(e||"").trim();if(!t)return!1;if(!t.startsWith("watchmut:")){let r=t.toLowerCase(),o=0;for(let[i,a]of Array.from(F.watches.entries()))i.startsWith(`watchmut:${r}:`)&&(clearInterval(a),F.watches.delete(i),o++);return o>0}let n=F.watches.get(t);return n?(clearInterval(n),F.watches.delete(t),!0):!1}function _u(e){let t=Array.isArray(e?.slots)?e.slots:[];return{objectType:"plant",species:e?.species??null,plantedAt:e?.plantedAt??null,maturedAt:e?.maturedAt??null,slotCount:t.length,slots:t.map((n,r)=>({idx:r,mutations:Array.isArray(n?.mutations)?n.mutations.slice():[]}))}}function Nu(e,t,n={}){Ke();let r=Number(e)|0,o=Number(t)|0,i=n.ensureView!==!1,a=Te.getTileObject(r,o,{ensureView:i,clone:!1}),s=a?.tileView||null,u=s?.tileObject,d={ok:!0,tx:r,ty:o,gidx:a?.gidx??Te.gidx?.(r,o)??null,hasTileView:!!s,objectType:u?.objectType??null,tileObject:u??null,summary:u?.objectType==="plant"?_u(u):u?{objectType:u.objectType??null}:null,display:s?s.childView?.plantVisual||s.childView||s.displayObject||s:null};return n.log!==!1&&ue(()=>console.log("[MGPixi.inspectTile]",d)),d}function Wu(e){let t=e?.childView?.plantVisual||e?.childView?.cropVisual||e?.childView||e?.displayObject||e;return fo(t)||fo(e?.displayObject)||null}function Qa(e){let t=F.fades.get(e);if(!t)return!1;for(let n of t.targets)n.o&&$e(n.o)&&Number.isFinite(n.baseAlpha)&&ue(()=>{n.o.alpha=n.baseAlpha});return F.fades.delete(e),!0}function go(e=null){for(let t of Array.from(F.fades.keys()))e&&!String(t).startsWith(e)||Qa(t);return!0}function Za(e,t={}){Ke();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.clearSpeciesFade: empty species");let r=`fade:${n}:`;if(!qa(t))return go(r);let{gidxSet:o}=yo(t);if(!o)return go(r);for(let i of Array.from(F.fades.keys())){if(!i.startsWith(r))continue;let a=Number(i.slice(r.length));o.has(a)&&Qa(i)}return!0}function es(e,t={}){Ke();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.fadeSpecies: empty species");let r=me(Number(t.alpha??.2),0,1),o=t.deep===!0,{entries:i,gidxSet:a}=yo(t),s=`fade:${n}:`;t.clear===!0&&Za(n,t);let u=0,d=0,l=0,c=0;for(let[p,m]of i){let f=m?.tileObject;if(!f||f.objectType!=="plant")continue;u++;let g=String(f.species||"").trim().toLowerCase();if(!g||g!==n)continue;d++;let b=Wu(m);if(!b||!$e(b)){c++;continue}let h=`${s}${p}`;if(F.fades.has(h)){ue(()=>{b.alpha=r}),l++;continue}let S=o?Mu(b):[b],T=[];for(let x of S)$e(x)&&T.push({o:x,baseAlpha:Number(x.alpha)});for(let x of T)ue(()=>{x.o.alpha=r});F.fades.set(h,{targets:T}),l++}return{ok:!0,species:n,alpha:r,deep:o,filtered:!!a,plantsSeen:u,matchedPlants:d,applied:l,failed:c,totalFades:F.fades.size}}function ju(e,t={}){Ke();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchFadeSpecies: empty species");let r=`watchfade:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,o=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,i=F.fadeWatches.get(r);i&&clearInterval(i);let a=setInterval(()=>{ue(()=>es(n,{...t,clear:!1}))},o);return F.fadeWatches.set(r,a),{ok:!0,key:r,species:n,intervalMs:o}}function Bu(e){let t=String(e||"").trim();if(!t)return!1;if(!t.startsWith("watchfade:")){let r=t.toLowerCase(),o=0;for(let[i,a]of Array.from(F.fadeWatches.entries()))i.startsWith(`watchfade:${r}:`)&&(clearInterval(a),F.fadeWatches.delete(i),o++);return o>0}let n=F.fadeWatches.get(t);return n?(clearInterval(n),F.fadeWatches.delete(t),!0):!1}function bo(){let e=C;return e.$PIXI=e.PIXI||null,e.$app=F.app||null,e.$renderer=F.renderer||null,e.$stage=F.stage||null,e.$ticker=F.ticker||null,e.__MG_PIXI__={PIXI:e.$PIXI,app:e.$app,renderer:e.$renderer,stage:e.$stage,ticker:e.$ticker,ready:F.ready},e.__MG_PIXI__}function Ke(){if(!F.ready)throw new Error("MGPixi: call MGPixi.init() first")}async function Fu(e=15e3){if(F.ready)return bo(),!0;if(await ie.init(e),F.app=ie.app(),F.ticker=ie.ticker(),F.renderer=ie.renderer(),F.stage=ie.stage(),!F.app||!F.ticker)throw new Error("MGPixi: PIXI app/ticker not found");return F.ready=!0,bo(),!0}var Tt={init:Fu,ready:()=>F.ready,expose:bo,get app(){return F.app},get renderer(){return F.renderer},get stage(){return F.stage},get ticker(){return F.ticker},get PIXI(){return C.PIXI||null},defineTileSet:Iu,deleteTileSet:Eu,listTileSets:Lu,highlightPulse:Ya,stopHighlight:xo,clearHighlights:Ja,highlightMutation:Xa,watchMutation:Hu,stopWatchMutation:Gu,inspectTile:Nu,fadeSpecies:es,clearSpeciesFade:Za,clearFades:go,watchFadeSpecies:ju,stopWatchFadeSpecies:Bu};Ae();var ts=C??window,Vu={sfx:"soundEffectsVolume",music:"musicVolume",ambience:"ambienceVolume"},Uu={sfx:"soundEffectsVolumeAtom",music:"musicVolumeAtom",ambience:"ambienceVolumeAtom"},Pt=.001,Ct=.2,bn=null,z={ready:!1,baseUrl:null,urls:{ambience:new Map,music:new Map},sfx:{mp3Url:null,atlasUrl:null,atlas:null,groups:new Map,buffer:null},tracks:{ambience:null,music:null},ctx:null};function Mt(){if(!z.ready)throw new Error("MGAudio not ready yet")}function ns(e,t=NaN){try{let n=localStorage.getItem(e);if(n==null)return t;let r;try{r=JSON.parse(n)}catch{r=n}if(typeof r=="number"&&Number.isFinite(r))return r;if(typeof r=="string"){let o=parseFloat(r);if(Number.isFinite(o))return o}}catch{}return t}function At(e){let t=Vu[e],n=Uu[e];if(!t)return{atom:Ct,vol100:hn(Ct)};let r=ns(t,NaN);if(Number.isFinite(r)){let i=me(r,0,1);return{atom:i,vol100:hn(i)}}if(n){let i=ns(n,NaN);if(Number.isFinite(i)){let a=me(i,0,1);return{atom:a,vol100:hn(a)}}}let o=Ct;return{atom:o,vol100:hn(o)}}function zu(e){let t=Number(e);if(!Number.isFinite(t))return null;if(t<=0)return 0;let r=(me(t,1,100)-1)/99;return Pt+r*(Ct-Pt)}function hn(e){let t=me(Number(e),0,1);if(t<=Pt)return 0;let n=(t-Pt)/(Ct-Pt);return Math.round(1+n*99)}function os(e,t){if(t==null)return At(e).atom;let n=zu(t);return n===null?At(e).atom:Vn(n)}async function rs(){let e=z.ctx;if(e)return e;let t=ts.AudioContext||ts.webkitAudioContext;if(!t)throw new Error("WebAudio not supported");let n=new t;return z.ctx=n,n}async function is(){if(z.ctx&&z.ctx.state==="suspended")try{await z.ctx.resume()}catch{}}function $u(e){let t=new Map,n=(r,o)=>{t.has(r)||t.set(r,[]),t.get(r).push(o)};for(let r of Object.keys(e||{})){let o=/^(.*)_([A-Z])$/.exec(r);o?.[1]?n(o[1],r):n(r,r)}for(let[r,o]of Array.from(t.entries()))o.sort((i,a)=>i.localeCompare(a)),t.set(r,o);z.sfx.groups=t}function Ku(e){let t=z.sfx.atlas;if(!t)throw new Error("SFX atlas not loaded");if(t[e])return e;let n=z.sfx.groups.get(e);if(n?.length)return n[Math.random()*n.length|0];throw new Error(`Unknown sfx/group: ${e}`)}async function qu(){if(z.sfx.buffer)return z.sfx.buffer;if(!z.sfx.mp3Url)throw new Error("SFX mp3 url missing");let e=await rs();await is();let n=await(await en(z.sfx.mp3Url)).arrayBuffer(),r=await new Promise((o,i)=>{let a=e.decodeAudioData(n,o,i);a?.then&&a.then(o,i)});return z.sfx.buffer=r,r}async function Ju(e,t={}){if(!z.ready)throw new Error("MGAudio not ready yet");let n=String(e||"").trim();if(!n)throw new Error("Missing sfx name");let r=Ku(n),o=z.sfx.atlas[r];if(!o)throw new Error(`Missing segment for sfx: ${r}`);let i=await rs();await is();let a=await qu(),s=Math.max(0,+o.start||0),u=Math.max(s,+o.end||s),d=Math.max(.01,u-s),l=os("sfx",t.volume),c=i.createGain();c.gain.value=l,c.connect(i.destination);let p=i.createBufferSource();return p.buffer=a,p.connect(c),p.start(0,s,d),{name:r,source:p,start:s,end:u,duration:d,volume:l}}function as(e){if(e!=="music"&&e!=="ambience")return!1;let t=z.tracks[e];if(t){try{t.pause()}catch{}try{t.src=""}catch{}}return z.tracks[e]=null,!0}function Yu(e,t,n={}){if(!z.ready)throw new Error("MGAudio not ready yet");if(e!=="music"&&e!=="ambience")throw new Error(`Invalid category: ${e}`);let r=z.urls[e].get(t);if(!r)throw new Error(`Unknown ${e}: ${t}`);as(e);let o=new Audio(r);return o.loop=!!n.loop,o.volume=os(e,n.volume),o.preload="auto",o.play().catch(()=>{}),z.tracks[e]=o,o}async function Xu(e,t,n={}){let r=String(e||"").trim(),o=String(t||"").trim();if(!r||!o)throw new Error("play(category, asset) missing args");if(r==="sfx")return Ju(o,n);if(r==="music"||r==="ambience")return Yu(r,o,n);throw new Error(`Unknown category: ${r}`)}function Qu(e,t={}){let n=String(e||"").trim();return n==="music"||n==="ambience"?Array.from(z.urls[n].keys()).sort():n==="sfx"?z.sfx.atlas?t.groups?Array.from(z.sfx.groups.keys()).sort():Object.keys(z.sfx.atlas).sort():[]:[]}function Zu(){return z.tracks.music&&(z.tracks.music.volume=At("music").atom),z.tracks.ambience&&(z.tracks.ambience.volume=At("ambience").atom),!0}function ed(){return Mt(),["sfx","music","ambience"]}function td(){return Mt(),Array.from(z.sfx.groups.keys()).sort((e,t)=>e.localeCompare(t))}function nd(e,t){Mt();let n=String(e||"").trim().toLowerCase(),r=String(t||"").trim();if(!r||n!=="music"&&n!=="ambience")return!1;let o=z.urls[n],i=r.toLowerCase();for(let a of o.keys())if(a.toLowerCase()===i)return!0;return!1}function od(e){Mt();let t=String(e||"").trim();if(!t)return!1;let n=t.toLowerCase();for(let r of z.sfx.groups.keys())if(r.toLowerCase()===n)return!0;return!1}function rd(e,t){Mt();let n=String(e||"").trim().toLowerCase(),r=String(t||"").trim();if(!r)throw new Error("getTrackUrl(category, name) missing name");if(n!=="music"&&n!=="ambience")throw new Error(`Invalid category: ${e}`);let o=z.urls[n],i=r.toLowerCase();for(let[a,s]of o.entries())if(a.toLowerCase()===i)return s;return null}async function id(){return z.ready?!0:bn||(bn=(async()=>{z.baseUrl=await xe.base();let e=await fe.load(z.baseUrl),t=fe.getBundle(e,"audio");if(!t)throw new Error("No audio bundle in manifest");for(let n of t.assets||[])for(let r of n.src||[]){if(typeof r!="string")continue;let o=/^audio\/(ambience|music)\/(.+)\.mp3$/i.exec(r);if(o){let i=o[1].toLowerCase(),a=o[2];z.urls[i].set(a,de(z.baseUrl,r));continue}/^audio\/sfx\/sfx\.mp3$/i.test(r)&&(z.sfx.mp3Url=de(z.baseUrl,r)),/^audio\/sfx\/sfx\.json$/i.test(r)&&(z.sfx.atlasUrl=de(z.baseUrl,r))}if(!z.sfx.atlasUrl)throw new Error("Missing audio/sfx/sfx.json in manifest");return z.sfx.atlas=await Qe(z.sfx.atlasUrl),$u(z.sfx.atlas),z.ready=!0,!0})(),bn)}var It={init:id,ready:()=>z.ready,play:Xu,stop:as,list:Qu,refreshVolumes:Zu,categoryVolume:At,getCategories:ed,getGroups:td,hasTrack:nd,hasGroup:od,getTrackUrl:rd};var vo=C?.document??document,yn=null,Z={ready:!1,baseUrl:null,byCat:new Map,byBase:new Map,overlay:null,live:new Set,defaultParent:null};function ad(){if(Z.overlay)return Z.overlay;let e=vo.createElement("div");return e.id="MG_COSMETIC_OVERLAY",e.style.cssText=["position:fixed","left:0","top:0","width:100vw","height:100vh","pointer-events:none","z-index:99999999"].join(";"),vo.documentElement.appendChild(e),Z.overlay=e,e}function sd(){let e=Z.defaultParent;if(!e)return null;try{return typeof e=="function"?e():e}catch{return null}}function So(e){let t=String(e||"").trim();return t?(t=t.replace(/^cosmetic\//i,""),t=t.replace(/\.png$/i,""),t):""}function ld(e,t){if(t===void 0){let i=So(e),a=i.indexOf("_");return a<0?{cat:"",asset:i,base:i}:{cat:i.slice(0,a),asset:i.slice(a+1),base:i}}let n=String(e||"").trim(),r=So(t),o=r.includes("_")?r:`${n}_${r}`;if(r.includes("_")&&!n){let i=r.indexOf("_");return{cat:r.slice(0,i),asset:r.slice(i+1),base:r}}return{cat:n,asset:r.replace(/^.+?_/,""),base:o}}function cd(){return Array.from(Z.byCat.keys()).sort((e,t)=>e.localeCompare(t))}function ud(e){let t=Z.byCat.get(String(e||"").trim());return t?Array.from(t.keys()).sort((n,r)=>n.localeCompare(r)):[]}function wo(e,t){let{cat:n,asset:r,base:o}=ld(e,t),i=Z.byBase.get(o);if(i)return i;let s=Z.byCat.get(n)?.get(r);if(s)return s;if(!Z.baseUrl)throw new Error("MGCosmetic not initialized");if(!o)throw new Error("Invalid cosmetic name");return de(Z.baseUrl,`cosmetic/${o}.png`)}function ko(e,t,n){if(!Z.ready)throw new Error("MGCosmetic not ready yet");let r,o;typeof t=="object"&&t!==null?(r=t,o=void 0):typeof t=="string"?(o=t,r=n||{}):(o=void 0,r=n||{});let i=o!==void 0?wo(e,o):wo(e),a=vo.createElement("img");if(a.decoding="async",a.loading="eager",a.src=i,a.alt=r.alt!=null?String(r.alt):So(o??e),r.className&&(a.className=String(r.className)),r.width!=null&&(a.style.width=String(r.width)),r.height!=null&&(a.style.height=String(r.height)),r.opacity!=null&&(a.style.opacity=String(r.opacity)),r.style&&typeof r.style=="object")for(let[s,u]of Object.entries(r.style))try{a.style[s]=String(u)}catch{}return a}function dd(e,t,n){let r,o;typeof t=="object"&&t!==null?(r=t,o=void 0):typeof t=="string"?(o=t,r=n||{}):(o=void 0,r=n||{});let i=r.parent||sd()||ad(),a=o!==void 0?ko(e,o,r):ko(e,r);if(i===Z.overlay||r.center||r.x!=null||r.y!=null||r.absolute){a.style.position="absolute",a.style.pointerEvents="none",a.style.zIndex=String(r.zIndex??999999);let u=r.scale??1,d=r.rotation??0;if(r.center)a.style.left="50%",a.style.top="50%",a.style.transform=`translate(-50%, -50%) scale(${u}) rotate(${d}rad)`;else{let l=r.x??innerWidth/2,c=r.y??innerHeight/2;a.style.left=`${l}px`,a.style.top=`${c}px`,a.style.transform=`scale(${u}) rotate(${d}rad)`,r.anchor==="center"&&(a.style.transform=`translate(-50%, -50%) scale(${u}) rotate(${d}rad)`)}}return i.appendChild(a),Z.live.add(a),a.__mgDestroy=()=>{try{a.remove()}catch{}Z.live.delete(a)},a}function pd(e){return Z.defaultParent=e,!0}function md(){for(let e of Array.from(Z.live))e.__mgDestroy?.()}async function fd(){return Z.ready?!0:yn||(yn=(async()=>{Z.baseUrl=await xe.base();let e=await fe.load(Z.baseUrl),t=fe.getBundle(e,"cosmetic");if(!t)throw new Error("No 'cosmetic' bundle in manifest");Z.byCat.clear(),Z.byBase.clear();for(let n of t.assets||[])for(let r of n.src||[]){if(typeof r!="string"||!/^cosmetic\/.+\.png$/i.test(r))continue;let i=r.split("/").pop().replace(/\.png$/i,""),a=i.indexOf("_");if(a<0)continue;let s=i.slice(0,a),u=i.slice(a+1),d=de(Z.baseUrl,r);Z.byBase.set(i,d),Z.byCat.has(s)||Z.byCat.set(s,new Map),Z.byCat.get(s).set(u,d)}return Z.ready=!0,!0})(),yn)}var Et={init:fd,ready:()=>Z.ready,categories:cd,list:ud,url:wo,create:ko,show:dd,attach:pd,clear:md};async function ss(e){let t=[{name:"Data",init:()=>wt.init()},{name:"Sprites",init:()=>ke.init()},{name:"TileObjectSystem",init:()=>Te.init()},{name:"Pixi",init:()=>Tt.init()},{name:"Audio",init:()=>It.init()},{name:"Cosmetics",init:()=>Et.init()}];await Promise.all(t.map(async n=>{e?.({status:"start",name:n.name});try{await n.init(),e?.({status:"success",name:n.name})}catch(r){console.error(`[${n.name}] failed`,r),e?.({status:"error",name:n.name,error:r})}})),console.log("[Gemini] Modules ready. Access via Gemini.Modules in console.")}var gd=new Map;function bd(){return gd}function Lt(){return C.jotaiAtomCache?.cache}function Rt(e){let t=bd(),n=t.get(e);if(n)return n;let r=Lt();if(!r)return null;for(let o of r.values())if((o?.debugLabel||o?.label||"")===e)return t.set(e,o),o;return null}var hd={baseStore:null,captureInProgress:!1,captureError:null,lastCapturedVia:null,mirror:void 0};function it(){return hd}var yd="__JOTAI_STORE_READY__",ls=!1,Po=new Set;function xn(){if(!ls){ls=!0;for(let e of Po)try{e()}catch{}try{let e=C.CustomEvent||CustomEvent;C.dispatchEvent?.(new e(yd))}catch{}}}function xd(e){Po.add(e);let t=Ao();if(t.via&&!t.polyfill)try{e()}catch{}return()=>{Po.delete(e)}}async function vn(e={}){let{timeoutMs:t=6e3,intervalMs:n=50}=e,r=Ao();if(!(r.via&&!r.polyfill))return new Promise((o,i)=>{let a=!1,s=xd(()=>{a||(a=!0,s(),o())}),u=Date.now();(async()=>{for(;!a&&Date.now()-u<t;){let l=Ao();if(l.via&&!l.polyfill){if(a)return;a=!0,s(),o();return}await Ot(n)}a||(a=!0,s(),i(new Error("Store not captured within timeout")))})()})}var Ot=e=>new Promise(t=>setTimeout(t,e));function cs(){try{let e=C.Event||Event;C.dispatchEvent?.(new e("visibilitychange"))}catch{}}function Co(e){return e&&typeof e=="object"&&typeof e.get=="function"&&typeof e.set=="function"&&typeof e.sub=="function"}function To(e,t=0,n=new WeakSet){if(t>3||!e||typeof e!="object"||n.has(e))return null;try{n.add(e)}catch{return null}if(Co(e))return e;let r=["store","value","current","state","s","baseStore"];for(let o of r)try{let i=e[o];if(Co(i))return i}catch{}return null}function us(){let e=it(),t=C.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t?.renderers?.size)return null;let n=0;for(let[r]of t.renderers){let o=t.getFiberRoots?.(r);o&&(n+=o.size||0)}if(n===0)return null;for(let[r]of t.renderers){let o=t.getFiberRoots?.(r);if(o)for(let i of o){let a=new Set,s=[i.current];for(;s.length;){let u=s.pop();if(!(!u||a.has(u))){a.add(u);try{let d=u?.pendingProps?.value;if(Co(d))return e.lastCapturedVia="fiber",d}catch{}try{let d=u?.memoizedState,l=0;for(;d&&l<15;){l++;let c=To(d);if(c)return e.lastCapturedVia="fiber",c;let p=To(d.memoizedState);if(p)return e.lastCapturedVia="fiber",p;d=d.next}}catch{}try{if(u?.stateNode){let d=To(u.stateNode);if(d)return e.lastCapturedVia="fiber",d}}catch{}u.child&&s.push(u.child),u.sibling&&s.push(u.sibling),u.alternate&&s.push(u.alternate)}}}}return null}function ds(){return{get:()=>{throw new Error("Store not captured: get unavailable")},set:()=>{throw new Error("Store not captured: set unavailable")},sub:()=>()=>{},__polyfill:!0}}async function vd(e=5e3){let t=Date.now(),n=Lt();for(;!n&&Date.now()-t<e;)await Ot(100),n=Lt();if(!n)throw new Error("jotaiAtomCache.cache not found");let r=it(),o=null,i=null,a=[],s=()=>{for(let d of a)try{d.__origWrite&&(d.write=d.__origWrite,delete d.__origWrite)}catch{}};for(let d of n.values()){if(!d||typeof d.write!="function"||d.__origWrite)continue;let l=d.write;d.__origWrite=l,d.write=function(c,p,...m){return i||(o=c,i=p,s()),l.call(this,c,p,...m)},a.push(d)}cs();let u=Date.now();for(;!i&&Date.now()-u<e;)await Ot(50);return i?(r.lastCapturedVia="write",{get:d=>o(d),set:(d,l)=>i(d,l),sub:(d,l)=>{let c;try{c=o(d)}catch{}let p=setInterval(()=>{let m;try{m=o(d)}catch{return}if(m!==c){c=m;try{l()}catch{}}},100);return()=>clearInterval(p)}}):(s(),r.lastCapturedVia="polyfill",ds())}async function Sd(e=1e4){let t=it();cs();let n=Date.now();for(;Date.now()-n<e;){let r=us();if(r)return r;await Ot(50)}return t.lastCapturedVia="polyfill",ds()}async function wd(){let e=it();if(e.baseStore&&!e.baseStore.__polyfill)return xn(),e.baseStore;if(e.captureInProgress){let t=Date.now(),n=2500;for(;!e.baseStore&&Date.now()-t<n;)await Ot(25);if(e.baseStore)return e.baseStore.__polyfill||xn(),e.baseStore}e.captureInProgress=!0;try{let t=us();if(t)return e.baseStore=t,xn(),t;try{let r=await vd(5e3);return e.baseStore=r,r.__polyfill||xn(),r}catch(r){e.captureError=r}let n=await Sd();return e.baseStore=n,n}catch(t){throw e.captureError=t,t}finally{e.captureInProgress=!1}}function Ao(){let e=it();return{via:e.lastCapturedVia,polyfill:!!e.baseStore?.__polyfill,error:e.captureError}}async function kd(){let e=await wd(),t=new WeakMap,n=async o=>{let i=t.get(o);if(i)return i;i={last:void 0,has:!1,subs:new Set},t.set(o,i);try{i.last=e.get(o),i.has=!0}catch{}let a=e.sub(o,()=>{let s;try{s=e.get(o)}catch{return}let u=i.last,d=!Object.is(s,u)||!i.has;if(i.last=s,i.has=!0,d)for(let l of i.subs)try{l(s,u)}catch{}});return i.unsubUpstream=a,i};return{async get(o){let i=await n(o);if(i.has)return i.last;let a=e.get(o);return i.last=a,i.has=!0,a},async set(o,i){await e.set(o,i);let a=await n(o);a.last=i,a.has=!0},async sub(o,i){let a=await n(o);if(a.subs.add(i),a.has)try{i(a.last,a.last)}catch{}return()=>{a.subs.delete(i)}},getShadow(o){return t.get(o)?.last},hasShadow(o){return!!t.get(o)?.has},async ensureWatch(o){await n(o)},async asStore(){return{get:o=>this.get(o),set:(o,i)=>this.set(o,i),sub:(o,i)=>{let a=null;return this.sub(o,()=>i()).then(s=>a=s),()=>a?.()}}}}}async function Dt(){let e=it();return e.mirror||(e.mirror=await kd()),e.mirror}var Y={async select(e){let t=await Dt(),n=Rt(e);if(!n)throw new Error(`[Store] Atom not found: "${e}"`);return t.get(n)},async set(e,t){let n=await Dt(),r=Rt(e);if(!r)throw new Error(`[Store] Atom not found: "${e}"`);await n.set(r,t)},async subscribe(e,t){let n=await Dt(),r=Rt(e);if(!r)throw new Error(`[Store] Atom not found: "${e}"`);return n.sub(r,o=>{try{t(o)}catch{}})},async subscribeImmediate(e,t){let n=await Y.select(e);try{t(n)}catch{}return Y.subscribe(e,t)}};async function Mo(){await Dt()}function Ht(e){return e?Array.isArray(e)?e.slice():e.split(".").map(t=>t.match(/^\d+$/)?Number(t):t):[]}function Ge(e,t){let n=Ht(t),r=e;for(let o of n){if(r==null)return;r=r[o]}return r}function Io(e,t,n){let r=Ht(t);if(!r.length)return n;let o=Array.isArray(e)?[...e]:{...e??{}},i=o;for(let a=0;a<r.length-1;a++){let s=r[a],u=i[s],d=typeof u=="object"&&u!==null?Array.isArray(u)?[...u]:{...u}:{};i[s]=d,i=d}return i[r[r.length-1]]=n,o}function ps(e,t){let n={};for(let r of t)n[r]=r.includes(".")?Ge(e,r):e?.[r];try{return JSON.stringify(n)}catch{return String(n)}}function Eo(e,t,n){let r=n.mode??"auto";function o(d){let l=t?Ge(d,t):d,c=new Map;if(l==null)return{signatures:c,keys:[]};let p=Array.isArray(l);if((r==="array"||r==="auto"&&p)&&p)for(let f=0;f<l.length;f++){let g=l[f],b=n.key?n.key(g,f,d):f,h=n.sig?n.sig(g,f,d):n.fields?ps(g,n.fields):JSON.stringify(g);c.set(b,h)}else for(let[f,g]of Object.entries(l)){let b=n.key?n.key(g,f,d):f,h=n.sig?n.sig(g,f,d):n.fields?ps(g,n.fields):JSON.stringify(g);c.set(b,h)}return{signatures:c,keys:Array.from(c.keys())}}function i(d,l){if(d===l)return!0;if(!d||!l||d.size!==l.size)return!1;for(let[c,p]of d)if(l.get(c)!==p)return!1;return!0}async function a(d){let l=null;return Y.subscribeImmediate(e,c=>{let p=t?Ge(c,t):c,{signatures:m}=o(p);if(!i(l,m)){let f=new Set([...l?Array.from(l.keys()):[],...Array.from(m.keys())]),g=[];for(let b of f){let h=l?.get(b)??"__NONE__",S=m.get(b)??"__NONE__";h!==S&&g.push(b)}l=m,d({value:p,changedKeys:g})}})}async function s(d,l){return a(({value:c,changedKeys:p})=>{p.includes(d)&&l({value:c})})}async function u(d,l){let c=new Set(d);return a(({value:p,changedKeys:m})=>{let f=m.filter(g=>c.has(g));f.length&&l({value:p,changedKeys:f})})}return{sub:a,subKey:s,subKeys:u}}var at=new Map;function Td(e,t){let n=at.get(e);if(n)try{n()}catch{}return at.set(e,t),()=>{try{t()}catch{}at.get(e)===t&&at.delete(e)}}function Q(e,t={}){let{path:n,write:r="replace"}=t,o=n?`${e}:${Ht(n).join(".")}`:e;async function i(){let c=await Y.select(e);return n?Ge(c,n):c}async function a(c){if(typeof r=="function"){let f=await Y.select(e),g=r(c,f);return Y.set(e,g)}let p=await Y.select(e),m=n?Io(p,n,c):c;return r==="merge-shallow"&&!n&&p&&typeof p=="object"&&typeof c=="object"?Y.set(e,{...p,...c}):Y.set(e,m)}async function s(c){let p=await i(),m=c(p);return await a(m),m}async function u(c,p,m){let f,g=h=>{let S=n?Ge(h,n):h;if(typeof f>"u"||!m(f,S)){let T=f;f=S,p(S,T)}},b=c?await Y.subscribeImmediate(e,g):await Y.subscribe(e,g);return Td(o,b)}function d(){let c=at.get(o);if(c){try{c()}catch{}at.delete(o)}}function l(c){return Eo(e,c?.path??n,c)}return{label:o,get:i,set:a,update:s,onChange:(c,p=Object.is)=>u(!1,c,p),onChangeNow:(c,p=Object.is)=>u(!0,c,p),asSignature:l,stopOnChange:d}}function y(e){return Q(e)}var Pd=y("positionAtom"),Cd=y("lastPositionInMyGardenAtom"),Ad=y("playerDirectionAtom"),Md=y("stateAtom"),Id=y("quinoaDataAtom"),Ed=y("currentTimeAtom"),Ld=y("actionAtom"),Rd=y("isPressAndHoldActionAtom"),Od=y("mapAtom"),Dd=y("tileSizeAtom"),Hd=Q("mapAtom",{path:"cols"}),Gd=Q("mapAtom",{path:"rows"}),_d=Q("mapAtom",{path:"spawnTiles"}),Nd=Q("mapAtom",{path:"locations.seedShop.spawnTileIdx"}),Wd=Q("mapAtom",{path:"locations.eggShop.spawnTileIdx"}),jd=Q("mapAtom",{path:"locations.toolShop.spawnTileIdx"}),Bd=Q("mapAtom",{path:"locations.decorShop.spawnTileIdx"}),Fd=Q("mapAtom",{path:"locations.sellCropsShop.spawnTileIdx"}),Vd=Q("mapAtom",{path:"locations.sellPetShop.spawnTileIdx"}),Ud=Q("mapAtom",{path:"locations.collectorsClub.spawnTileIdx"}),zd=Q("mapAtom",{path:"locations.wishingWell.spawnTileIdx"}),$d=Q("mapAtom",{path:"locations.shopsCenter.spawnTileIdx"}),Kd=y("playerAtom"),qd=y("myDataAtom"),Jd=y("myUserSlotIdxAtom"),Yd=y("isSpectatingAtom"),Xd=y("myCoinsCountAtom"),Qd=y("numPlayersAtom"),Zd=Q("playerAtom",{path:"id"}),ep=y("userSlotsAtom"),tp=y("filteredUserSlotsAtom"),np=y("myUserSlotAtom"),op=y("spectatorsAtom"),rp=Q("stateAtom",{path:"child"}),ip=Q("stateAtom",{path:"child.data"}),ap=Q("stateAtom",{path:"child.data.shops"}),Lo=Q("stateAtom",{path:"child.data.userSlots"}),Ro=Q("stateAtom",{path:"data.players"}),Oo=Q("stateAtom",{path:"data.hostPlayerId"}),sp=y("myInventoryAtom"),lp=y("myInventoryItemsAtom"),cp=y("isMyInventoryAtMaxLengthAtom"),up=y("myFavoritedItemIdsAtom"),dp=y("myCropInventoryAtom"),pp=y("mySeedInventoryAtom"),mp=y("myToolInventoryAtom"),fp=y("myEggInventoryAtom"),gp=y("myDecorInventoryAtom"),bp=y("myPetInventoryAtom"),hp=Q("myInventoryAtom",{path:"favoritedItemIds"}),yp=y("itemTypeFiltersAtom"),xp=y("myItemStoragesAtom"),vp=y("myPetHutchStoragesAtom"),Sp=y("myPetHutchItemsAtom"),wp=y("myPetHutchPetItemsAtom"),kp=y("myNumPetHutchItemsAtom"),Tp=y("myValidatedSelectedItemIndexAtom"),Pp=y("isSelectedItemAtomSuspended"),Cp=y("mySelectedItemAtom"),Ap=y("mySelectedItemNameAtom"),Mp=y("mySelectedItemRotationsAtom"),Ip=y("mySelectedItemRotationAtom"),Ep=y("setSelectedIndexToEndAtom"),Lp=y("myPossiblyNoLongerValidSelectedItemIndexAtom"),Rp=y("myCurrentGlobalTileIndexAtom"),Op=y("myCurrentGardenTileAtom"),Dp=y("myCurrentGardenObjectAtom"),Hp=y("myOwnCurrentGardenObjectAtom"),Gp=y("myOwnCurrentDirtTileIndexAtom"),_p=y("myCurrentGardenObjectNameAtom"),Np=y("isInMyGardenAtom"),Wp=y("myGardenBoardwalkTileObjectsAtom"),jp=Q("myDataAtom",{path:"garden"}),Bp=Q("myDataAtom",{path:"garden.tileObjects"}),Fp=Q("myOwnCurrentGardenObjectAtom",{path:"objectType"}),Vp=y("myCurrentStablePlantObjectInfoAtom"),Up=y("myCurrentSortedGrowSlotIndicesAtom"),zp=y("myCurrentGrowSlotIndexAtom"),$p=y("myCurrentGrowSlotsAtom"),Kp=y("myCurrentGrowSlotAtom"),qp=y("secondsUntilCurrentGrowSlotMaturesAtom"),Jp=y("isCurrentGrowSlotMatureAtom"),Yp=y("numGrowSlotsAtom"),Xp=y("myCurrentEggAtom"),Qp=y("petInfosAtom"),Zp=y("myPetInfosAtom"),em=y("myPetSlotInfosAtom"),tm=y("myPrimitivePetSlotsAtom"),nm=y("myNonPrimitivePetSlotsAtom"),om=y("expandedPetSlotIdAtom"),rm=y("myPetsProgressAtom"),im=y("myActiveCropMutationPetsAtom"),am=y("totalPetSellPriceAtom"),sm=y("selectedPetHasNewVariantsAtom"),Do=y("shopsAtom"),Ho=y("myShopPurchasesAtom"),lm=y("seedShopAtom"),cm=y("seedShopInventoryAtom"),um=y("seedShopRestockSecondsAtom"),dm=y("seedShopCustomRestockInventoryAtom"),pm=y("eggShopAtom"),mm=y("eggShopInventoryAtom"),fm=y("eggShopRestockSecondsAtom"),gm=y("eggShopCustomRestockInventoryAtom"),bm=y("toolShopAtom"),hm=y("toolShopInventoryAtom"),ym=y("toolShopRestockSecondsAtom"),xm=y("toolShopCustomRestockInventoryAtom"),vm=y("decorShopAtom"),Sm=y("decorShopInventoryAtom"),wm=y("decorShopRestockSecondsAtom"),km=y("decorShopCustomRestockInventoryAtom"),Tm=y("isDecorShopAboutToRestockAtom"),Pm=Q("shopsAtom",{path:"seed"}),Cm=Q("shopsAtom",{path:"tool"}),Am=Q("shopsAtom",{path:"egg"}),Mm=Q("shopsAtom",{path:"decor"}),Im=y("myCropItemsAtom"),Em=y("myCropItemsToSellAtom"),Lm=y("totalCropSellPriceAtom"),Rm=y("friendBonusMultiplierAtom"),Om=y("myJournalAtom"),Dm=y("myCropJournalAtom"),Hm=y("myPetJournalAtom"),Gm=y("myStatsAtom"),_m=y("myActivityLogsAtom"),Nm=y("newLogsAtom"),Wm=y("hasNewLogsAtom"),jm=y("newCropLogsFromSellingAtom"),Bm=y("hasNewCropLogsFromSellingAtom"),Fm=y("myCompletedTasksAtom"),Vm=y("myActiveTasksAtom"),Um=y("isWelcomeToastVisibleAtom"),zm=y("shouldCloseWelcomeToastAtom"),$m=y("isInitialMoveToDirtPatchToastVisibleAtom"),Km=y("isFirstPlantSeedActiveAtom"),qm=y("isThirdSeedPlantActiveAtom"),Jm=y("isThirdSeedPlantCompletedAtom"),Ym=y("isDemoTouchpadVisibleAtom"),Xm=y("areShopAnnouncersEnabledAtom"),Qm=y("arePresentablesEnabledAtom"),Zm=y("isEmptyDirtTileHighlightedAtom"),ef=y("isPlantTileHighlightedAtom"),tf=y("isItemHiglightedInHotbarAtom"),nf=y("isItemHighlightedInModalAtom"),of=y("isMyGardenButtonHighlightedAtom"),rf=y("isSellButtonHighlightedAtom"),af=y("isShopButtonHighlightedAtom"),sf=y("isInstaGrowButtonHiddenAtom"),lf=y("isActionButtonHighlightedAtom"),cf=y("isGardenItemInfoCardHiddenAtom"),uf=y("isSeedPurchaseButtonHighlightedAtom"),df=y("isFirstSeedPurchaseActiveAtom"),pf=y("isFirstCropHarvestActiveAtom"),mf=y("isWeatherStatusHighlightedAtom"),Go=y("weatherAtom"),ff=y("activeModalAtom"),gf=y("hotkeyBeingPressedAtom"),bf=y("avatarTriggerAnimationAtom"),hf=y("avatarDataAtom"),yf=y("emoteDataAtom"),xf=y("otherUserSlotsAtom"),vf=y("otherPlayerPositionsAtom"),Sf=y("otherPlayerSelectedItemsAtom"),wf=y("otherPlayerLastActionsAtom"),kf=y("traderBunnyPlayerId"),Tf=y("npcPlayersAtom"),Pf=y("npcQuinoaUsersAtom"),Cf=y("numNpcAvatarsAtom"),Af=y("traderBunnyEmoteTimeoutAtom"),Mf=y("traderBunnyEmoteAtom"),If=y("unsortedLeaderboardAtom"),Ef=y("currentGardenNameAtom"),Lf=y("quinoaEngineAtom"),Rf=y("quinoaInitializationErrorAtom"),Of=y("avgPingAtom"),Df=y("serverClientTimeOffsetAtom"),Hf=y("isEstablishingShotRunningAtom"),Gf=y("isEstablishingShotCompleteAtom");function pe(e,t){if(e===t)return!0;if(e===null||t===null)return e===t;if(typeof e!=typeof t)return!1;if(typeof e!="object")return e===t;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return!1;for(let a=0;a<e.length;a++)if(!pe(e[a],t[a]))return!1;return!0}if(Array.isArray(e)||Array.isArray(t))return!1;let n=e,r=t,o=Object.keys(n),i=Object.keys(r);if(o.length!==i.length)return!1;for(let a of o)if(!Object.prototype.hasOwnProperty.call(r,a)||!pe(n[a],r[a]))return!1;return!0}var ms={currentGardenTile:"myCurrentGardenTileAtom",globalTileIndex:"myCurrentGlobalTileIndexAtom",gardenObject:"myCurrentGardenObjectAtom",isMature:"isGardenObjectMatureAtom",isInMyGarden:"isInMyGardenAtom",gardenName:"currentGardenNameAtom",sortedSlotIndices:"myCurrentSortedGrowSlotIndicesAtom",currentGrowSlotIndex:"myCurrentGrowSlotIndexAtom"},fs={position:{globalIndex:null,localIndex:null},tile:{type:null,isEmpty:!0},garden:{name:null,isOwner:!1,playerSlotIndex:null},object:{type:null,data:null,isMature:!1},plant:null};function _f(e){let t=e.currentGardenTile;return{globalIndex:e.globalTileIndex,localIndex:t?.localTileIndex??null}}function Nf(e){return{type:e.currentGardenTile?.tileType??null,isEmpty:e.gardenObject===null}}function Wf(e){let t=e.currentGardenTile;return{name:e.gardenName,isOwner:e.isInMyGarden??!1,playerSlotIndex:t?.userSlotIdx??null}}function jf(e){let t=e.gardenObject;return t?{type:t.objectType,data:t,isMature:e.isMature??!1}:{type:null,data:null,isMature:!1}}function Bf(e){let t=e.gardenObject;if(!t||t.objectType!=="plant")return null;let n=t,r=e.sortedSlotIndices??[];return{species:n.species,slots:n.slots??[],currentSlotIndex:e.currentGrowSlotIndex,sortedSlotIndices:r,nextHarvestSlotIndex:r.length>0?r[0]:null}}function gs(e){return{position:_f(e),tile:Nf(e),garden:Wf(e),object:jf(e),plant:Bf(e)}}function bs(e){return JSON.stringify({globalIndex:e.position.globalIndex,localIndex:e.position.localIndex,tileType:e.tile.type,isEmpty:e.tile.isEmpty,gardenName:e.garden.name,isOwner:e.garden.isOwner,playerSlotIndex:e.garden.playerSlotIndex,objectType:e.object.type,isMature:e.object.isMature,plantSpecies:e.plant?.species??null,slotCount:e.plant?.slots.length??0})}function Ff(e,t){return e.type!==t.type||e.isMature!==t.isMature?!0:e.data===null&&t.data===null?!1:e.data===null||t.data===null?!0:!pe(e.data,t.data)}function Vf(e,t){return e===null&&t===null?!1:e===null||t===null||e.species!==t.species||e.currentSlotIndex!==t.currentSlotIndex||e.nextHarvestSlotIndex!==t.nextHarvestSlotIndex||e.slots.length!==t.slots.length?!0:!pe(e.sortedSlotIndices,t.sortedSlotIndices)}function Uf(e,t){return e.name!==t.name||e.isOwner!==t.isOwner||e.playerSlotIndex!==t.playerSlotIndex}function zf(){let e=fs,t=fs,n=!1,r=[],o={all:new Set,stable:new Set,object:new Set,plantInfo:new Set,garden:new Set},i={},a=Object.keys(ms),s=new Set;function u(){if(s.size<a.length)return;let l=gs(i);if(!pe(e,l)&&(t=e,e=l,!!n)){for(let c of o.all)c(e,t);if(bs(t)!==bs(e))for(let c of o.stable)c(e,t);if(Ff(t.object,e.object)){let c={current:e.object,previous:t.object};for(let p of o.object)p(c)}if(Vf(t.plant,e.plant)){let c={current:e.plant,previous:t.plant};for(let p of o.plantInfo)p(c)}if(Uf(t.garden,e.garden)){let c={current:e.garden,previous:t.garden};for(let p of o.garden)p(c)}}}async function d(){if(n)return;let l=a.map(async c=>{let p=ms[c],m=await Y.subscribe(p,f=>{i[c]=f,s.add(c),u()});r.push(m)});await Promise.all(l),n=!0,s.size===a.length&&(e=gs(i))}return d(),{get(){return e},subscribe(l,c){return o.all.add(l),c?.immediate!==!1&&n&&s.size===a.length&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,c){return o.stable.add(l),c?.immediate!==!1&&n&&s.size===a.length&&l(e,e),()=>o.stable.delete(l)},subscribeObject(l,c){return o.object.add(l),c?.immediate&&n&&s.size===a.length&&l({current:e.object,previous:e.object}),()=>o.object.delete(l)},subscribePlantInfo(l,c){return o.plantInfo.add(l),c?.immediate&&n&&s.size===a.length&&l({current:e.plant,previous:e.plant}),()=>o.plantInfo.delete(l)},subscribeGarden(l,c){return o.garden.add(l),c?.immediate&&n&&s.size===a.length&&l({current:e.garden,previous:e.garden}),()=>o.garden.delete(l)},destroy(){for(let l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.object.clear(),o.plantInfo.clear(),o.garden.clear(),n=!1}}}var _o=null;function No(){return _o||(_o=zf()),_o}var hs={inventory:"myPetInventoryAtom",hutch:"myPetHutchPetItemsAtom",active:"myPetInfosAtom",slotInfos:"myPetSlotInfosAtom",expandedPetSlotId:"expandedPetSlotIdAtom"};function ys(e,t){return{id:e.id,petSpecies:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,mutations:[...e.mutations],targetScale:e.targetScale,abilities:[...e.abilities],location:t,position:null,lastAbilityTrigger:null}}function $f(e,t){let r=t[e.slot.id]?.lastAbilityTrigger??null;return{id:e.slot.id,petSpecies:e.slot.petSpecies,name:e.slot.name,xp:e.slot.xp,hunger:e.slot.hunger,mutations:[...e.slot.mutations],targetScale:e.slot.targetScale,abilities:[...e.slot.abilities],location:"active",position:e.position?{x:e.position.x,y:e.position.y}:null,lastAbilityTrigger:r}}function xs(e){let t=new Set,n=[];for(let u of e.active??[]){let d=$f(u,e.slotInfos??{});n.push(d),t.add(d.id)}let r=[];for(let u of e.inventory??[]){if(t.has(u.id))continue;let d=ys(u,"inventory");r.push(d),t.add(d.id)}let o=[];for(let u of e.hutch??[]){if(t.has(u.id))continue;let d=ys(u,"hutch");o.push(d),t.add(d.id)}let i=[...n,...r,...o],a=e.expandedPetSlotId??null,s=a?i.find(u=>u.id===a)??null:null;return{all:i,byLocation:{inventory:r,hutch:o,active:n},counts:{inventory:r.length,hutch:o.length,active:n.length,total:i.length},expandedPetSlotId:a,expandedPet:s}}var vs={all:[],byLocation:{inventory:[],hutch:[],active:[]},counts:{inventory:0,hutch:0,active:0,total:0},expandedPetSlotId:null,expandedPet:null};function Kf(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}function Ss(e){return JSON.stringify({id:e.id,petSpecies:e.petSpecies,name:e.name,mutations:e.mutations,abilities:e.abilities,location:e.location})}function qf(e,t){if(e.all.length!==t.all.length)return!1;let n=e.all.map(Ss),r=t.all.map(Ss);return Kf(n,r)}function Jf(e,t){let n=[],r=new Map(e.all.map(o=>[o.id,o]));for(let o of t.all){let i=r.get(o.id);i&&i.location!==o.location&&n.push({pet:o,from:i.location,to:o.location})}return n}function Yf(e,t){let n=[],r=new Map(e.all.map(o=>[o.id,o]));for(let o of t.all){if(!o.lastAbilityTrigger)continue;let a=r.get(o.id)?.lastAbilityTrigger;(!a||a.abilityId!==o.lastAbilityTrigger.abilityId||a.performedAt!==o.lastAbilityTrigger.performedAt)&&n.push({pet:o,trigger:o.lastAbilityTrigger})}return n}function Xf(e,t){let n=new Set(e.all.map(a=>a.id)),r=new Set(t.all.map(a=>a.id)),o=t.all.filter(a=>!n.has(a.id)),i=e.all.filter(a=>!r.has(a.id));return o.length===0&&i.length===0?null:{added:o,removed:i,counts:t.counts}}function Qf(){let e=vs,t=vs,n=!1,r=[],o={all:new Set,stable:new Set,location:new Set,ability:new Set,count:new Set,expandedPet:new Set},i={},a=Object.keys(hs),s=new Set;function u(){if(s.size<a.length)return;let l=xs(i);if(pe(e,l)||(t=e,e=l,!n))return;for(let f of o.all)f(e,t);if(!qf(t,e))for(let f of o.stable)f(e,t);let c=Jf(t,e);for(let f of c)for(let g of o.location)g(f);let p=Yf(t,e);for(let f of p)for(let g of o.ability)g(f);let m=Xf(t,e);if(m)for(let f of o.count)f(m);if(t.expandedPetSlotId!==e.expandedPetSlotId){let f={current:e.expandedPet,previous:t.expandedPet,currentId:e.expandedPetSlotId,previousId:t.expandedPetSlotId};for(let g of o.expandedPet)g(f)}}async function d(){if(n)return;let l=a.map(async c=>{let p=hs[c],m=await Y.subscribe(p,f=>{i[c]=f,s.add(c),u()});r.push(m)});await Promise.all(l),n=!0,s.size===a.length&&(e=xs(i))}return d(),{get(){return e},subscribe(l,c){return o.all.add(l),c?.immediate!==!1&&n&&s.size===a.length&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,c){return o.stable.add(l),c?.immediate!==!1&&n&&s.size===a.length&&l(e,e),()=>o.stable.delete(l)},subscribeLocation(l,c){if(o.location.add(l),c?.immediate&&n&&s.size===a.length)for(let p of e.all)l({pet:p,from:p.location,to:p.location});return()=>o.location.delete(l)},subscribeAbility(l,c){if(o.ability.add(l),c?.immediate&&n&&s.size===a.length)for(let p of e.all)p.lastAbilityTrigger&&l({pet:p,trigger:p.lastAbilityTrigger});return()=>o.ability.delete(l)},subscribeCount(l,c){return o.count.add(l),c?.immediate&&n&&s.size===a.length&&l({added:e.all,removed:[],counts:e.counts}),()=>o.count.delete(l)},subscribeExpandedPet(l,c){return o.expandedPet.add(l),c?.immediate&&n&&s.size===a.length&&l({current:e.expandedPet,previous:e.expandedPet,currentId:e.expandedPetSlotId,previousId:e.expandedPetSlotId}),()=>o.expandedPet.delete(l)},destroy(){for(let l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.location.clear(),o.ability.clear(),o.count.clear(),o.expandedPet.clear(),n=!1}}}var Wo=null;function jo(){return Wo||(Wo=Qf()),Wo}function Zf(){let e=null,t=[],n=new Set,r={},o=new Set,i=2;function a(c,p){return{x:p%c,y:Math.floor(p/c)}}function s(c,p,m){return m*c+p}function u(c,p){let{cols:m,rows:f}=c,g=m*f,b=new Set,h=new Set,S=new Map,T=[],x=c.userSlotIdxAndDirtTileIdxToGlobalTileIdx??[],v=c.userSlotIdxAndBoardwalkTileIdxToGlobalTileIdx??[],k=Math.max(x.length,v.length);for(let P=0;P<k;P++){let R=x[P]??[],M=v[P]??[],U=R.map((K,N)=>(b.add(K),S.set(K,P),{globalIndex:K,localIndex:N,position:a(m,K)})),J=M.map((K,N)=>(h.add(K),S.set(K,P),{globalIndex:K,localIndex:N,position:a(m,K)}));T.push({userSlotIdx:P,dirtTiles:U,boardwalkTiles:J,allTiles:[...U,...J]})}let L=c.spawnTiles.map(P=>a(m,P)),E={};if(c.locations)for(let[P,R]of Object.entries(c.locations)){let M=R.spawnTileIdx??[];E[P]={name:P,spawnTiles:M,spawnPositions:M.map(U=>a(m,U))}}return{cols:m,rows:f,totalTiles:g,tileSize:p,spawnTiles:c.spawnTiles,spawnPositions:L,locations:E,userSlots:T,globalToXY(P){return a(m,P)},xyToGlobal(P,R){return s(m,P,R)},getTileOwner(P){return S.get(P)??null},isDirtTile(P){return b.has(P)},isBoardwalkTile(P){return h.has(P)}}}function d(){if(o.size<i||e)return;let c=r.map,p=r.tileSize??0;if(c){e=u(c,p);for(let m of n)m(e);n.clear()}}async function l(){let c=await Y.subscribe("mapAtom",m=>{r.map=m,o.add("map"),d()});t.push(c);let p=await Y.subscribe("tileSizeAtom",m=>{r.tileSize=m,o.add("tileSize"),d()});t.push(p)}return l(),{get(){return e},isReady(){return e!==null},onReady(c,p){return e?(p?.immediate!==!1&&c(e),()=>{}):(n.add(c),()=>n.delete(c))},destroy(){for(let c of t)c();t.length=0,e=null,n.clear()}}}var Bo=null;function Fo(){return Bo||(Bo=Zf()),Bo}var ws={inventory:"myInventoryAtom",isFull:"isMyInventoryAtMaxLengthAtom",selectedItemIndex:"myPossiblyNoLongerValidSelectedItemIndexAtom"},ks={items:[],favoritedItemIds:[],count:0,isFull:!1,selectedItem:null};function Ts(e){let t=e.inventory,n=t?.items??[],r=t?.favoritedItemIds??[],o=e.selectedItemIndex,i=null;return o!==null&&o>=0&&o<n.length&&(i={index:o,item:n[o]}),{items:n,favoritedItemIds:r,count:n.length,isFull:e.isFull??!1,selectedItem:i}}function Ps(e){let t=e.items.map(n=>"id"in n?n.id:"species"in n&&n.itemType==="Seed"?`seed:${n.species}:${n.quantity}`:"toolId"in n?`tool:${n.toolId}:${n.quantity}`:"eggId"in n?`egg:${n.eggId}:${n.quantity}`:"decorId"in n?`decor:${n.decorId}:${n.quantity}`:JSON.stringify(n));return JSON.stringify({itemKeys:t,favoritedItemIds:e.favoritedItemIds,isFull:e.isFull,selectedItemIndex:e.selectedItem?.index??null})}function eg(e,t){return Ps(e)===Ps(t)}function tg(e,t){return e===null&&t===null?!1:e===null||t===null?!0:e.index!==t.index}function Sn(e){return"id"in e?e.id:"species"in e&&e.itemType==="Seed"?`seed:${e.species}`:"toolId"in e?`tool:${e.toolId}`:"eggId"in e?`egg:${e.eggId}`:"decorId"in e?`decor:${e.decorId}`:JSON.stringify(e)}function ng(e,t){let n=new Set(e.map(Sn)),r=new Set(t.map(Sn)),o=t.filter(a=>!n.has(Sn(a))),i=e.filter(a=>!r.has(Sn(a)));return o.length===0&&i.length===0?null:{added:o,removed:i,counts:{before:e.length,after:t.length}}}function og(e,t){let n=new Set(e),r=new Set(t),o=t.filter(a=>!n.has(a)),i=e.filter(a=>!r.has(a));return o.length===0&&i.length===0?null:{added:o,removed:i,current:t}}function rg(){let e=ks,t=ks,n=!1,r=[],o={all:new Set,stable:new Set,selection:new Set,items:new Set,favorites:new Set},i={},a=Object.keys(ws),s=new Set;function u(){if(s.size<a.length)return;let l=Ts(i);if(pe(e,l)||(t=e,e=l,!n))return;for(let m of o.all)m(e,t);if(!eg(t,e))for(let m of o.stable)m(e,t);if(tg(t.selectedItem,e.selectedItem)){let m={current:e.selectedItem,previous:t.selectedItem};for(let f of o.selection)f(m)}let c=ng(t.items,e.items);if(c)for(let m of o.items)m(c);let p=og(t.favoritedItemIds,e.favoritedItemIds);if(p)for(let m of o.favorites)m(p)}async function d(){if(n)return;let l=a.map(async c=>{let p=ws[c],m=await Y.subscribe(p,f=>{i[c]=f,s.add(c),u()});r.push(m)});await Promise.all(l),n=!0,s.size===a.length&&(e=Ts(i))}return d(),{get(){return e},subscribe(l,c){return o.all.add(l),c?.immediate!==!1&&n&&s.size===a.length&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,c){return o.stable.add(l),c?.immediate!==!1&&n&&s.size===a.length&&l(e,e),()=>o.stable.delete(l)},subscribeSelection(l,c){return o.selection.add(l),c?.immediate&&n&&s.size===a.length&&l({current:e.selectedItem,previous:e.selectedItem}),()=>o.selection.delete(l)},subscribeItems(l,c){return o.items.add(l),c?.immediate&&n&&s.size===a.length&&l({added:e.items,removed:[],counts:{before:0,after:e.count}}),()=>o.items.delete(l)},subscribeFavorites(l,c){return o.favorites.add(l),c?.immediate&&n&&s.size===a.length&&l({added:e.favoritedItemIds,removed:[],current:e.favoritedItemIds}),()=>o.favorites.delete(l)},destroy(){for(let l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.selection.clear(),o.items.clear(),o.favorites.clear(),n=!1}}}var Vo=null;function Uo(){return Vo||(Vo=rg()),Vo}var $o={all:[],host:null,count:0};function ig(e,t,n){let r=n.get(e.id),o=r?.slot,i=o?.data,a=o?.lastActionEvent;return{id:e.id,name:e.name,discordId:e.databaseUserId,discordAvatarUrl:e.discordAvatarUrl,guildId:e.guildId,isConnected:e.isConnected,isHost:e.id===t,slotIndex:r?.index??null,position:o?.position??null,cosmetic:{color:e.cosmetic?.color??"",avatar:e.cosmetic?.avatar?[...e.cosmetic.avatar]:[]},emote:{type:e.emoteData?.emoteType??-1},coins:i?.coinsCount??0,inventory:i?.inventory??null,shopPurchases:i?.shopPurchases??null,garden:i?.garden??null,pets:{slots:i?.petSlots??[],slotInfos:o?.petSlotInfos??null},journal:i?.journal??null,stats:i?.stats??null,tasksCompleted:i?.tasksCompleted??[],activityLogs:i?.activityLogs??[],customRestocks:{config:i?.customRestocks??null,inventories:o?.customRestockInventories??null},lastAction:a?{type:a.action,data:a.data,timestamp:a.timestamp}:null,selectedItemIndex:o?.notAuthoritative_selectedItemIndex??null,lastSlotMachineInfo:o?.lastSlotMachineInfo??null}}function Cs(e){let t=e.players,n=e.hostPlayerId??"",r=e.userSlots??[];if(!t||!Array.isArray(t)||t.length===0)return $o;let o=new Map;Array.isArray(r)&&r.forEach((s,u)=>{s?.type==="user"&&s?.playerId&&o.set(s.playerId,{slot:s,index:u})});let i=t.map(s=>ig(s,n,o)),a=i.find(s=>s.isHost)??null;return{all:i,host:a,count:i.length}}function As(e){let t=e.all.map(n=>`${n.id}:${n.isConnected}:${n.isHost}`);return JSON.stringify({playerKeys:t,hostId:e.host?.id??null,count:e.count})}function ag(e,t){let n=[],r=new Set(e.map(i=>i.id)),o=new Set(t.map(i=>i.id));for(let i of t)r.has(i.id)||n.push({player:i,type:"join"});for(let i of e)o.has(i.id)||n.push({player:i,type:"leave"});return n}function sg(e,t){let n=[],r=new Map(e.map(o=>[o.id,o]));for(let o of t){let i=r.get(o.id);i&&i.isConnected!==o.isConnected&&n.push({player:o,isConnected:o.isConnected})}return n}function lg(){let e=$o,t=$o,n=!1,r=[],o={all:new Set,stable:new Set,joinLeave:new Set,connection:new Set,host:new Set},i={},a=new Set,s=3;function u(){if(a.size<s)return;let l=Cs(i);if(pe(e,l)||(t=e,e=l,!n))return;for(let g of o.all)g(e,t);if(As(t)!==As(e))for(let g of o.stable)g(e,t);let c=ag(t.all,e.all);for(let g of c)for(let b of o.joinLeave)b(g);let p=sg(t.all,e.all);for(let g of p)for(let b of o.connection)b(g);let m=t.host?.id??null,f=e.host?.id??null;if(m!==f){let g={current:e.host,previous:t.host};for(let b of o.host)b(g)}}async function d(){if(n)return;let l=await Ro.onChangeNow(m=>{i.players=m,a.add("players"),u()});r.push(l);let c=await Oo.onChangeNow(m=>{i.hostPlayerId=m,a.add("hostPlayerId"),u()});r.push(c);let p=await Lo.onChangeNow(m=>{i.userSlots=m,a.add("userSlots"),u()});r.push(p),n=!0,a.size===s&&(e=Cs(i))}return d(),{get(){return e},subscribe(l,c){return o.all.add(l),c?.immediate!==!1&&n&&a.size===s&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,c){return o.stable.add(l),c?.immediate!==!1&&n&&a.size===s&&l(e,e),()=>o.stable.delete(l)},subscribeJoinLeave(l,c){if(o.joinLeave.add(l),c?.immediate&&n&&a.size===s)for(let p of e.all)l({player:p,type:"join"});return()=>o.joinLeave.delete(l)},subscribeConnection(l,c){if(o.connection.add(l),c?.immediate&&n&&a.size===s)for(let p of e.all)l({player:p,isConnected:p.isConnected});return()=>o.connection.delete(l)},subscribeHost(l,c){return o.host.add(l),c?.immediate&&n&&a.size===s&&l({current:e.host,previous:e.host}),()=>o.host.delete(l)},destroy(){for(let l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.joinLeave.clear(),o.connection.clear(),o.host.clear(),n=!1}}}var zo=null;function Ko(){return zo||(zo=lg()),zo}var Gt=["seed","tool","egg","decor"];function cg(e,t){switch(t){case"seed":return e.species??e.itemType;case"tool":return e.toolId??e.itemType;case"egg":return e.eggId??e.itemType;case"decor":return e.decorId??e.itemType;default:return e.itemType}}function ug(e,t,n){let r=cg(e,t),o=n[r]??0,i=Math.max(0,e.initialStock-o);return{id:r,itemType:e.itemType,initialStock:e.initialStock,purchased:o,remaining:i,isAvailable:i>0}}function dg(e,t,n){if(!t)return{type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null};let o=n[e]?.purchases??{},i=(t.inventory??[]).map(d=>ug(d,e,o)),a=i.filter(d=>d.isAvailable).length,s=t.secondsUntilRestock??0,u=s>0?Date.now()+s*1e3:null;return{type:e,items:i,availableCount:a,totalCount:i.length,secondsUntilRestock:s,restockAt:u}}function Ms(e){let t=e.shops,n=e.purchases??{},r=Gt.map(s=>dg(s,t?.[s],n)),o={seed:r[0],tool:r[1],egg:r[2],decor:r[3]},i=r.filter(s=>s.restockAt!==null),a=null;if(i.length>0){let u=i.sort((d,l)=>(d.restockAt??0)-(l.restockAt??0))[0];a={shop:u.type,seconds:u.secondsUntilRestock,at:u.restockAt}}return{all:r,byType:o,nextRestock:a}}var Is={all:Gt.map(e=>({type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null})),byType:{seed:{type:"seed",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},tool:{type:"tool",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},egg:{type:"egg",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},decor:{type:"decor",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null}},nextRestock:null};function Es(e){return JSON.stringify({shops:e.all.map(t=>({type:t.type,itemCount:t.items.length,availableCount:t.availableCount}))})}function pg(e,t){let n=e.secondsUntilRestock,r=t.secondsUntilRestock;return n>0&&n<=5&&r>n||n>0&&r===0&&t.items.some(i=>i.purchased===0)?{shop:t,previousItems:e.items}:null}function mg(e,t){let n=[];for(let r of Gt){let o=e.byType[r],i=t.byType[r],a=new Map(o.items.map(s=>[s.id,s]));for(let s of i.items){let u=a.get(s.id);u&&s.purchased>u.purchased&&n.push({shopType:r,itemId:s.id,quantity:s.purchased-u.purchased,newPurchased:s.purchased,remaining:s.remaining})}}return n}function fg(e,t){let n=[];for(let r of Gt){let o=e.byType[r],i=t.byType[r],a=new Map(o.items.map(s=>[s.id,s]));for(let s of i.items){let u=a.get(s.id);u&&u.isAvailable!==s.isAvailable&&n.push({shopType:r,itemId:s.id,wasAvailable:u.isAvailable,isAvailable:s.isAvailable})}}return n}function gg(){let e=Is,t=Is,n=!1,r=[],o={all:new Set,stable:new Set,seedRestock:new Set,toolRestock:new Set,eggRestock:new Set,decorRestock:new Set,purchase:new Set,availability:new Set},i={},a=new Set,s=2;function u(){if(a.size<s)return;let l=Ms(i);if(pe(e,l)||(t=e,e=l,!n))return;for(let f of o.all)f(e,t);if(Es(t)!==Es(e))for(let f of o.stable)f(e,t);let c={seed:o.seedRestock,tool:o.toolRestock,egg:o.eggRestock,decor:o.decorRestock};for(let f of Gt){let g=pg(t.byType[f],e.byType[f]);if(g)for(let b of c[f])b(g)}let p=mg(t,e);for(let f of p)for(let g of o.purchase)g(f);let m=fg(t,e);for(let f of m)for(let g of o.availability)g(f)}async function d(){if(n)return;let l=await Do.onChangeNow(p=>{i.shops=p,a.add("shops"),u()});r.push(l);let c=await Ho.onChangeNow(p=>{i.purchases=p,a.add("purchases"),u()});r.push(c),n=!0,a.size===s&&(e=Ms(i))}return d(),{get(){return e},getShop(l){return e.byType[l]},getItem(l,c){return e.byType[l].items.find(m=>m.id===c)??null},subscribe(l,c){return o.all.add(l),c?.immediate!==!1&&n&&a.size===s&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,c){return o.stable.add(l),c?.immediate!==!1&&n&&a.size===s&&l(e,e),()=>o.stable.delete(l)},subscribeSeedRestock(l,c){return o.seedRestock.add(l),c?.immediate&&n&&a.size===s&&l({shop:e.byType.seed,previousItems:[]}),()=>o.seedRestock.delete(l)},subscribeToolRestock(l,c){return o.toolRestock.add(l),c?.immediate&&n&&a.size===s&&l({shop:e.byType.tool,previousItems:[]}),()=>o.toolRestock.delete(l)},subscribeEggRestock(l,c){return o.eggRestock.add(l),c?.immediate&&n&&a.size===s&&l({shop:e.byType.egg,previousItems:[]}),()=>o.eggRestock.delete(l)},subscribeDecorRestock(l,c){return o.decorRestock.add(l),c?.immediate&&n&&a.size===s&&l({shop:e.byType.decor,previousItems:[]}),()=>o.decorRestock.delete(l)},subscribePurchase(l,c){if(o.purchase.add(l),c?.immediate&&n&&a.size===s)for(let p of e.all)for(let m of p.items)m.purchased>0&&l({shopType:p.type,itemId:m.id,quantity:m.purchased,newPurchased:m.purchased,remaining:m.remaining});return()=>o.purchase.delete(l)},subscribeAvailability(l,c){if(o.availability.add(l),c?.immediate&&n&&a.size===s)for(let p of e.all)for(let m of p.items)l({shopType:p.type,itemId:m.id,wasAvailable:m.isAvailable,isAvailable:m.isAvailable});return()=>o.availability.delete(l)},destroy(){for(let l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.seedRestock.clear(),o.toolRestock.clear(),o.eggRestock.clear(),o.decorRestock.clear(),o.purchase.clear(),o.availability.clear(),n=!1}}}var qo=null;function Jo(){return qo||(qo=gg()),qo}var bg=["Sunny","Rain","Frost","Dawn","AmberMoon"];function hg(e){return bg.includes(e)}var Xo={type:"Sunny",isActive:!1,startTime:null,endTime:null,remainingSeconds:0};function yg(e){if(!e)return Xo;let t=Date.now(),n=e.endTime??0,r=Math.max(0,n-t),o=Math.floor(r/1e3),i=o>0,a=e.type??"Sunny";return{type:hg(a)?a:"Sunny",isActive:i,startTime:e.startTime??null,endTime:e.endTime??null,remainingSeconds:o}}function xg(){let e=Xo,t=Xo,n=!1,r=null,o={all:new Set,change:new Set};function i(s){let u=yg(s);if(e.type===u.type&&e.isActive===u.isActive&&e.startTime===u.startTime&&e.endTime===u.endTime){e=u;return}if(t=e,e=u,!!n){for(let d of o.all)d(e,t);if(t.type!==e.type||t.isActive!==e.isActive){let d={current:e,previous:t};for(let l of o.change)l(d)}}}async function a(){n||(r=await Go.onChangeNow(s=>{i(s)}),n=!0)}return a(),{get(){return e},subscribe(s,u){return o.all.add(s),u?.immediate!==!1&&n&&s(e,e),()=>o.all.delete(s)},subscribeChange(s,u){return o.change.add(s),u?.immediate&&n&&s({current:e,previous:e}),()=>o.change.delete(s)},destroy(){r?.(),r=null,o.all.clear(),o.change.clear(),n=!1}}}var Yo=null;function Qo(){return Yo||(Yo=xg()),Yo}var se=null;function wn(){return se||(se={currentTile:No(),myPets:jo(),gameMap:Fo(),myInventory:Uo(),players:Ko(),shops:Jo(),weather:Qo()},se)}function Ee(){if(!se)throw new Error("[Globals] Not initialized. Call initGlobals() first.");return se}function Ls(){se&&(se.currentTile.destroy(),se.myPets.destroy(),se.gameMap.destroy(),se.myInventory.destroy(),se.players.destroy(),se.shops.destroy(),se.weather.destroy(),se=null)}var Rs={get currentTile(){return Ee().currentTile},get myPets(){return Ee().myPets},get gameMap(){return Ee().gameMap},get myInventory(){return Ee().myInventory},get players(){return Ee().players},get shops(){return Ee().shops},get weather(){return Ee().weather}};var vg={Store:{select:Y.select.bind(Y),set:Y.set.bind(Y),subscribe:Y.subscribe.bind(Y),subscribeImmediate:Y.subscribeImmediate.bind(Y)},Globals:Rs,Modules:{Version:xt,Assets:xe,Manifest:fe,Data:wt,Sprite:ke,Tile:Te,Pixi:Tt,Audio:It,Cosmetic:Et},WebSocket:{chat:Jt,emote:Lr,wish:Rr,kickPlayer:Or,setPlayerData:Dr,usurpHost:Hr,reportSpeakingStart:Gr,setSelectedGame:_r,voteForGame:Nr,requestGame:Wr,restartGame:jr,ping:Br,checkWeatherStatus:Ur,move:Fr,playerPosition:Rn,teleport:Vr,moveInventoryItem:zr,dropObject:$r,pickupObject:Kr,toggleFavoriteItem:qr,putItemInStorage:Jr,retrieveItemFromStorage:Yr,moveStorageItem:Xr,logItems:Qr,plantSeed:Zr,waterPlant:ei,harvestCrop:ti,sellAllCrops:ni,purchaseDecor:oi,purchaseEgg:ri,purchaseTool:ii,purchaseSeed:ai,plantEgg:si,hatchEgg:li,plantGardenPlant:ci,potPlant:ui,mutationPotion:di,pickupDecor:pi,placeDecor:mi,removeGardenObject:fi,placePet:gi,feedPet:bi,petPositions:hi,swapPet:yi,storePet:xi,namePet:vi,sellPet:Si},_internal:{getGlobals:Ee,initGlobals:wn,destroyGlobals:Ls}};function Os(){C.Gemini=vg}function Zo(e){e.logStep("WebSocket","Capturing WebSocket...");let t=null;return t=qt(n=>{n.ws&&(e.logStep("WebSocket","WebSocket captured","success"),t?.(),t=null)},{intervalMs:250}),Xi({debug:!1}),()=>{t?.(),t=null}}async function er(e){e.logStep("Atoms","Prewarming Jotai store...");try{await Mo(),await vn({timeoutMs:8e3,intervalMs:50}),e.logStep("Atoms","Jotai store ready","success")}catch(t){e.logStep("Atoms","Jotai store not captured yet","error"),console.warn("[Bootstrap] Jotai store wait failed",t)}}function tr(e){e.logStep("Globals","Initializing global variables...");try{wn(),e.logStep("Globals","Global variables ready","success")}catch(t){e.logStep("Globals","Failed to initialize global variables","error"),console.warn("[Bootstrap] Global variables init failed",t)}}function nr(e){e.logStep("API","Exposing Gemini API...");try{Os(),e.logStep("API","Gemini API ready","success")}catch(t){e.logStep("API","Failed to expose API","error"),console.warn("[Bootstrap] API init failed",t)}}function or(e){e.logStep("HUD","Loading HUD preferences...");let t=Bn(),n=jn({hostId:"gemini-hud-root",initialWidth:t.width,initialOpen:t.isOpen,onWidthChange:r=>Xe("width",r),onOpenChange:r=>Xe("isOpen",r),themes:De,initialTheme:t.theme,onThemeChange:r=>Xe("theme",r),buildSections:r=>On({applyTheme:r.applyTheme,initialTheme:r.initialTheme,getCurrentTheme:r.getCurrentTheme}),initialTab:t.activeTab,onTabChange:r=>Xe("activeTab",r)});return e.logStep("HUD","HUD ready","success"),n}async function rr(e){e.setSubtitle("Activating Gemini modules..."),await ss(t=>{t.status==="start"?e.logStep(t.name,`Loading ${t.name}...`):t.status==="success"?e.logStep(t.name,`${t.name} ready`,"success"):e.logStep(t.name,`${t.name} encountered an issue.`,"error")})}(async function(){"use strict";let e=Tn({title:"Gemini is loading",subtitle:"Connecting and preparing modules..."}),t=null,n=null;try{t=Zo(e),await er(e),tr(e),nr(e),n=or(e),await rr(e),e.succeed("Gemini is ready!")}catch(r){e.fail("Failed to initialize the mod.",r)}finally{t?.()}if(n){let r=n;Xt({onClick:()=>r.setOpen(!0)})}})();})();
