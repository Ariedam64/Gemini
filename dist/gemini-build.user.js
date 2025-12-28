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
"use strict";(()=>{var xr=Object.defineProperty;var Qs=(e,t,n)=>t in e?xr(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Zs=(e,t)=>()=>(e&&(t=e(e=0)),t);var el=(e,t)=>{for(var n in t)xr(e,n,{get:t[n],enumerable:!0})};var ve=(e,t,n)=>Qs(e,typeof t!="symbol"?t+"":t,n);var pi={};el(pi,{clamp:()=>pe,clamp01:()=>Un,sleep:()=>Pe,tryDo:()=>ue,waitWithTimeout:()=>en});async function en(e,t,n){let o=performance.now();for(;performance.now()-o<t;){let r=await Promise.race([e,Pe(50).then(()=>null)]);if(r!==null)return r}throw new Error(`${n} timeout`)}var Pe,ue,pe,Un,Ce=Zs(()=>{"use strict";Pe=e=>new Promise(t=>setTimeout(t,e)),ue=e=>{try{return e()}catch{return}},pe=(e,t,n)=>Math.max(t,Math.min(n,e)),Un=e=>pe(e,0,1)});function S(e,t=null,...n){let o=document.createElement(e);for(let[r,a]of Object.entries(t||{}))a!=null&&(r==="style"?typeof a=="string"?o.setAttribute("style",a):typeof a=="object"&&Object.assign(o.style,a):r.startsWith("on")&&typeof a=="function"?o[r.toLowerCase()]=a:r in o?o[r]=a:o.setAttribute(r,String(a)));for(let r of n)r==null||r===!1||o.appendChild(typeof r=="string"||typeof r=="number"?document.createTextNode(String(r)):r);return o}var _t="https://i.imgur.com/k5WuC32.png",vr="gemini-loader-style",Ne="gemini-loader",wr=80;function tl(){if(document.getElementById(vr))return;let e=document.createElement("style");e.id=vr,e.textContent=`
    /* ===== Loader Variables ===== */
    #${Ne} {
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
    #${Ne} {
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

    #${Ne}.gemini-loader--error .gemini-loader__actions {
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
    #${Ne}.gemini-loader--closing {
      animation: gemini-loader-fade-out 0.4s ease forwards;
      pointer-events: none;
    }

    #${Ne}.gemini-loader--error .gemini-loader__spinner {
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
      #${Ne} { padding: 16px 10px; }
      .gemini-loader__card { padding: 16px; }
      .gemini-loader__header { gap: 12px; }
      .gemini-loader__spinner { width: 42px; height: 42px; }
      .gemini-loader__spinner-icon { width: 56px; height: 56px; }
      .gemini-loader__title { font-size: 16px; }
    }
  `,document.head.appendChild(e)}function Wt(e,t,n){let o=S("div",{className:`gemini-loader__log ${n}`},S("div",{className:"gemini-loader__dot"}),S("div",{textContent:t}));for(e.appendChild(o);e.childElementCount>wr;)e.firstElementChild?.remove();e.scrollTop=e.scrollHeight}function nl(){return new Promise(e=>{if(typeof GM_xmlhttpRequest>"u"){e(_t);return}GM_xmlhttpRequest({method:"GET",url:_t,responseType:"blob",onload:t=>{let n=t.response,o=new FileReader;o.onloadend=()=>e(o.result),o.onerror=()=>e(_t),o.readAsDataURL(n)},onerror:()=>e(_t)})})}function An(e={}){let t=Number.isFinite(e.blurPx)?Math.max(4,Number(e.blurPx)):14;tl();let n=S("div",{className:"gemini-loader__subtitle",textContent:e.subtitle??"Initializing the mod..."}),o=S("div",{className:"gemini-loader__logs"}),r=S("img",{className:"gemini-loader__spinner-icon",alt:"Gemini"}),a=S("div",{className:"gemini-loader__spinner"},r);nl().then(b=>{r.src=b});let i=S("div",{className:"gemini-loader__card"},S("div",{className:"gemini-loader__header"},a,S("div",{className:"gemini-loader__titles"},S("div",{className:"gemini-loader__title",textContent:e.title??"Gemini is loading"}),n)),o),s=S("div",{id:Ne},i);(document.body||document.documentElement).appendChild(s);let c=S("div",{className:"gemini-loader__actions"},S("button",{className:"gemini-loader__button",textContent:"Close loader",onclick:()=>s.remove()}));i.appendChild(c),s.style.setProperty("--loader-blur",`${t}px`);let d=b=>{n.textContent=b},l=new Map,u=(b,h)=>{b.className=`gemini-loader__log ${h}`};return{log:(b,h="info")=>Wt(o,b,h),logStep:(b,h,w="info")=>{let T=String(b||"").trim();if(!T){Wt(o,h,w);return}let x=l.get(T);if(x){x.el.lastElementChild&&(x.el.lastElementChild.textContent=h),x.tone!==w&&(u(x.el,w),x.tone=w);return}let v=S("div",{className:`gemini-loader__log ${w}`},S("div",{className:"gemini-loader__dot"}),S("div",{textContent:h}));for(l.set(T,{el:v,tone:w}),o.appendChild(v);o.childElementCount>wr;){let k=o.firstElementChild;if(!k)break;let L=Array.from(l.entries()).find(([,E])=>E.el===k)?.[0];L&&l.delete(L),k.remove()}o.scrollTop=o.scrollHeight},setSubtitle:d,succeed:(b,h=600)=>{b&&Wt(o,b,"success"),s.classList.add("gemini-loader--closing"),setTimeout(()=>s.remove(),h)},fail:(b,h)=>{Wt(o,b,"error"),d("Something went wrong. Check the console for details."),s.classList.add("gemini-loader--error"),console.error("[Gemini loader]",b,h)}}}function Sr(e,t,n){let o=S("div",{className:"lg-pill",id:"pill"}),r=e.map(l=>{let u=S("button",{className:"lg-tab"},l.label);return u.setAttribute("data-target",l.id),u}),a=S("div",{className:"lg-tabs",id:"lg-tabs-row"},o,...r),i=a;a.addEventListener("wheel",l=>{Math.abs(l.deltaY)>Math.abs(l.deltaX)&&(l.preventDefault(),a.scrollLeft+=l.deltaY)},{passive:!1});function s(l){let u=a.getBoundingClientRect(),p=r.find(v=>v.dataset.target===l)||r[0];if(!p)return;let m=p.getBoundingClientRect(),f=m.left-u.left,g=m.width;o.style.width=`${g}px`,o.style.transform=`translateX(${f}px)`;let b=a.scrollLeft,h=b,w=b+a.clientWidth,T=f-12,x=f+g+12;T<h?a.scrollTo({left:T,behavior:"smooth"}):x>w&&a.scrollTo({left:x-a.clientWidth,behavior:"smooth"})}let c=t||(e[0]?.id??"");function d(l){c=l,r.forEach(u=>u.classList.toggle("active",u.dataset.target===l)),s(l),n(l)}return r.forEach(l=>l.addEventListener("click",()=>d(l.dataset.target))),queueMicrotask(()=>s(c)),{root:i,activate:d,recalc:()=>s(c),getActive:()=>c}}var _e=class{constructor(t){ve(this,"id");ve(this,"label");ve(this,"container",null);ve(this,"cleanupFunctions",[]);this.id=t.id,this.label=t.label}render(t){for(this.unmount();t.firstChild;)t.removeChild(t.firstChild);this.container=t;let n=this.build(t);n instanceof Promise&&n.catch(r=>{console.error(`[Gemini] Error building section ${this.id}:`,r)});let o=t.firstElementChild;o&&o.classList.contains("gemini-section")&&o.classList.add("active")}unmount(){this.executeCleanup(),this.container=null}createContainer(t,n){let o=n?`gemini-section ${n}`:"gemini-section";return S("section",{id:t,className:o})}addCleanup(t){this.cleanupFunctions.push(t)}createGrid(t="12px"){let n=S("div");return n.style.display="grid",n.style.gap=t,n}executeCleanup(){for(let t of this.cleanupFunctions)try{t()}catch(n){console.error(`[Gemini] Cleanup error in section ${this.id}:`,n)}this.cleanupFunctions=[]}};var st=class{constructor(t,n,o){ve(this,"sections");ve(this,"activeId",null);ve(this,"container");ve(this,"theme");this.sections=new Map(t.map(r=>[r.id,r])),this.container=n,this.theme=o}get ids(){return Array.from(this.sections.keys())}get all(){return Array.from(this.sections.values())}get active(){return this.activeId}activate(t){if(this.activeId!==t){if(!this.sections.has(t))throw new Error(`[Gemini] Unknown section: ${t}`);if(this.activeId&&this.sections.get(this.activeId).unmount(),this.activeId=t,this.sections.get(t).render(this.container),this.theme){let n=this.theme.getCurrentTheme();this.theme.applyTheme(n)}}}};function lt(e,t){try{let n=JSON.stringify(t);GM_setValue(e,n)}catch(n){console.error(`[Gemini] Failed to save key "${e}" to storage:`,n)}}function Ee(e,t){try{let n=GM_getValue(e);return n==null?t:typeof n=="string"?JSON.parse(n):n}catch(n){return console.error(`[Gemini] Failed to load key "${e}" from storage, using default:`,n),t}}var kr="gemini.sections";function Tr(){let e=Ee(kr,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function ol(e){lt(kr,e)}async function Ar(e){return Tr()[e]}function Pr(e,t){let n=Tr();ol({...n,[e]:t})}function jt(e,t){return{...e,...t??{}}}async function Cr(e){let t=await Ar(e.path),n;e.migrate?n=e.migrate(t):n=t??{},n=Object.assign((d=>JSON.parse(JSON.stringify(d)))(e.defaults),n),e.sanitize&&(n=e.sanitize(n));function r(){Pr(e.path,n)}function a(){return n}function i(d){n=e.sanitize?e.sanitize(d):d,r()}function s(d){let u=Object.assign((p=>JSON.parse(JSON.stringify(p)))(n),{});typeof d=="function"?d(u):Object.assign(u,d),n=e.sanitize?e.sanitize(u):u,r()}function c(){r()}return{get:a,set:i,update:s,save:c}}async function ct(e,t){let{path:n=e,...o}=t;return Cr({path:n,...o})}var rl=0,Bt=new Map;function Le(e={},...t){let{id:n,className:o,variant:r="default",padding:a="md",interactive:i=!1,expandable:s=!1,defaultExpanded:c=!0,onExpandChange:d,mediaTop:l,title:u,subtitle:p,badge:m,actions:f,footer:g,divider:b=!1,tone:h="neutral",stateKey:w}=e,T=S("div",{className:"card",id:n,tabIndex:i?0:void 0});T.classList.add(`card--${r}`,`card--p-${a}`),i&&T.classList.add("card--interactive"),h!=="neutral"&&T.classList.add(`card--tone-${h}`),o&&T.classList.add(...o.split(" ").filter(Boolean)),s&&T.classList.add("card--expandable");let x=s?w??n??(typeof u=="string"?`title:${u}`:null):null,v=!s||c;x&&Bt.has(x)&&(v=!!Bt.get(x));let k=null,L=null,E=null,A=null,R=null,M=n?`${n}-collapse`:`card-collapse-${++rl}`,U=()=>{if(A!==null&&(cancelAnimationFrame(A),A=null),R){let D=R;R=null,D()}},J=(D,N)=>{if(!E)return;U();let O=E;if(O.setAttribute("aria-hidden",String(!D)),!N){O.classList.remove("card-collapse--animating"),O.style.display=D?"":"none",O.style.height="",O.style.opacity="";return}if(O.classList.add("card-collapse--animating"),O.style.display="",D){O.style.height="auto";let F=O.scrollHeight;if(!F){O.classList.remove("card-collapse--animating"),O.style.display="",O.style.height="",O.style.opacity="";return}O.style.height="0px",O.style.opacity="0",O.offsetHeight,A=requestAnimationFrame(()=>{A=null,O.style.height=`${F}px`,O.style.opacity="1"})}else{let F=O.scrollHeight;if(!F){O.classList.remove("card-collapse--animating"),O.style.display="none",O.style.height="",O.style.opacity="";return}O.style.height=`${F}px`,O.style.opacity="1",O.offsetHeight,A=requestAnimationFrame(()=>{A=null,O.style.height="0px",O.style.opacity="0"})}let I=()=>{O.classList.remove("card-collapse--animating"),O.style.height="",D||(O.style.display="none"),O.style.opacity=""},G=null,W=F=>{F.target===O&&(G!==null&&(clearTimeout(G),G=null),O.removeEventListener("transitionend",W),O.removeEventListener("transitioncancel",W),R=null,I())};R=()=>{G!==null&&(clearTimeout(G),G=null),O.removeEventListener("transitionend",W),O.removeEventListener("transitioncancel",W),R=null,I()},O.addEventListener("transitionend",W),O.addEventListener("transitioncancel",W),G=window.setTimeout(()=>{R?.()},420)};function K(D){let N=document.createElementNS("http://www.w3.org/2000/svg","svg");return N.setAttribute("viewBox","0 0 24 24"),N.setAttribute("width","16"),N.setAttribute("height","16"),N.innerHTML=D==="up"?'<path d="M7 14l5-5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>':'<path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',N}function _(D,N=!0,O=!0){v=D,T.classList.toggle("card--collapsed",!v),T.classList.toggle("card--expanded",v),k&&(k.dataset.expanded=String(v),k.setAttribute("aria-expanded",String(v))),L&&(L.setAttribute("aria-expanded",String(v)),L.classList.toggle("card-toggle--collapsed",!v),L.setAttribute("aria-label",v?"Replier le contenu":"Deplier le contenu"),L.replaceChildren(K(v?"up":"down"))),s?J(v,O):E&&(E.style.display="",E.style.height="",E.style.opacity="",E.setAttribute("aria-hidden","false")),N&&d&&d(v),x&&Bt.set(x,v)}if(l){let D=S("div",{className:"card-media"});D.append(l),T.appendChild(D)}let j=!!(u||p||m||f&&f.length||s);if(j){k=S("div",{className:"card-header"});let D=S("div",{className:"card-headline",style:"min-width:0;display:flex;flex-direction:column;gap:2px;"});if(u){let I=S("h3",{className:"card-title",style:"margin:0;font-size:15px;font-weight:700;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:8px;"},u);m&&I.append(typeof m=="string"?S("span",{className:"badge"},m):m),D.appendChild(I)}if(p){let I=S("div",{className:"card-subtitle",style:"opacity:.85;font-size:12px;color:color-mix(in oklab, var(--fg) 80%, #9ca3af)"},p);D.appendChild(I)}(D.childNodes.length||s)&&k.appendChild(D);let N=S("div",{className:"card-header-right",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"}),O=S("div",{className:"card-actions",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"});f?.forEach(I=>O.appendChild(I)),O.childNodes.length&&N.appendChild(O),s&&(L=S("button",{className:"card-toggle",type:"button",ariaExpanded:String(v),ariaControls:M,ariaLabel:v?"Replier le contenu":"Deplier le contenu"}),L.textContent=v?"\u25B2":"\u25BC",L.addEventListener("click",I=>{I.preventDefault(),I.stopPropagation(),_(!v)}),N.appendChild(L),k.classList.add("card-header--expandable"),k.addEventListener("click",I=>{let G=I.target;G?.closest(".card-actions")||G?.closest(".card-toggle")||_(!v)})),N.childNodes.length&&k.appendChild(N),T.appendChild(k)}E=S("div",{className:"card-collapse",id:M,ariaHidden:s?String(!v):"false"}),T.appendChild(E),b&&j&&E.appendChild(S("div",{className:"card-divider"}));let H=S("div",{className:"card-body"});if(H.append(...t),E.appendChild(H),g){b&&E.appendChild(S("div",{className:"card-divider"}));let D=S("div",{className:"card-footer"});D.append(g),E.appendChild(D)}return L&&L.setAttribute("aria-controls",M),_(v,!1,!1),x&&Bt.set(x,v),T}function Pn(...e){return S("div",{className:"card-footer"},...e)}var Vt=!1,Ft=new Set,fe=e=>{let t=document.activeElement;for(let n of Ft)if(t&&(t===n||n.contains(t))){e.stopImmediatePropagation(),e.stopPropagation();return}};function al(){Vt||(Vt=!0,window.addEventListener("keydown",fe,!0),window.addEventListener("keypress",fe,!0),window.addEventListener("keyup",fe,!0),document.addEventListener("keydown",fe,!0),document.addEventListener("keypress",fe,!0),document.addEventListener("keyup",fe,!0))}function il(){Vt&&(Ft.size>0||(Vt=!1,window.removeEventListener("keydown",fe,!0),window.removeEventListener("keypress",fe,!0),window.removeEventListener("keyup",fe,!0),document.removeEventListener("keydown",fe,!0),document.removeEventListener("keypress",fe,!0),document.removeEventListener("keyup",fe,!0)))}function qe(e){let{id:t,value:n=null,options:o,placeholder:r="Select...",size:a="md",disabled:i=!1,blockGameKeys:s=!0,onChange:c,onOpenChange:d}=e,l=S("div",{className:"select",id:t}),u=S("button",{className:"select-trigger",type:"button"}),p=S("span",{className:"select-value"},r),m=S("span",{className:"select-caret"},"\u25BE");u.append(p,m);let f=S("div",{className:"select-menu",role:"listbox",tabindex:"-1","aria-hidden":"true"});l.classList.add(`select--${a}`);let g=!1,b=n,h=null,w=!!i;function T(I){return I==null?r:(e.options||o).find(W=>W.value===I)?.label??r}function x(I){p.textContent=T(I),f.querySelectorAll(".select-option").forEach(G=>{let W=G.dataset.value,F=I!=null&&W===I;G.classList.toggle("selected",F),G.setAttribute("aria-selected",String(F))})}function v(I){f.replaceChildren(),I.forEach(G=>{let W=S("button",{className:"select-option"+(G.disabled?" disabled":""),type:"button",role:"option","data-value":G.value,"aria-selected":String(G.value===b),tabindex:"-1"},G.label);G.value===b&&W.classList.add("selected"),G.disabled||W.addEventListener("pointerdown",F=>{F.preventDefault(),F.stopPropagation(),M(G.value,{notify:!0}),A()},{capture:!0}),f.appendChild(W)})}function k(){u.setAttribute("aria-expanded",String(g)),f.setAttribute("aria-hidden",String(!g))}function L(){let I=u.getBoundingClientRect();Object.assign(f.style,{minWidth:`${I.width}px`})}function E(){g||w||(g=!0,l.classList.add("open"),k(),L(),document.addEventListener("mousedown",j,!0),document.addEventListener("scroll",H,!0),window.addEventListener("resize",D),f.focus({preventScroll:!0}),s&&(al(),Ft.add(l),h=()=>{Ft.delete(l),il()}),d?.(!0))}function A(){g&&(g=!1,l.classList.remove("open"),k(),document.removeEventListener("mousedown",j,!0),document.removeEventListener("scroll",H,!0),window.removeEventListener("resize",D),u.focus({preventScroll:!0}),h?.(),h=null,d?.(!1))}function R(){g?A():E()}function M(I,G={}){let W=b;b=I,x(b),G.notify!==!1&&W!==I&&c?.(I)}function U(){return b}function J(I){let G=Array.from(f.querySelectorAll(".select-option:not(.disabled)"));if(!G.length)return;let W=G.findIndex(oe=>oe.classList.contains("active")),F=G[(W+(I===1?1:G.length-1))%G.length];G.forEach(oe=>oe.classList.remove("active")),F.classList.add("active"),F.focus({preventScroll:!0}),F.scrollIntoView({block:"nearest"})}function K(I){(I.key===" "||I.key==="Enter"||I.key==="ArrowDown")&&(I.preventDefault(),E())}function _(I){if(I.key==="Escape"){I.preventDefault(),A();return}if(I.key==="Enter"||I.key===" "){let G=f.querySelector(".select-option.active")||f.querySelector(".select-option.selected");G&&!G.classList.contains("disabled")&&(I.preventDefault(),M(G.dataset.value,{notify:!0}),A());return}if(I.key==="ArrowDown"){I.preventDefault(),J(1);return}if(I.key==="ArrowUp"){I.preventDefault(),J(-1);return}}function j(I){l.contains(I.target)||A()}function H(){g&&L()}function D(){g&&L()}function N(I){w=!!I,u.disabled=w,l.classList.toggle("disabled",w),w&&A()}function O(I){e.options=I,v(I),I.some(G=>G.value===b)||(b=null,x(null))}return l.append(u,f),u.addEventListener("pointerdown",I=>{I.preventDefault(),I.stopPropagation(),R()},{capture:!0}),u.addEventListener("keydown",K),f.addEventListener("keydown",_),v(o),n!=null?(b=n,x(b)):x(null),k(),N(w),{root:l,open:E,close:A,toggle:R,getValue:U,setValue:M,setOptions:O,setDisabled:N,destroy(){document.removeEventListener("mousedown",j,!0),document.removeEventListener("scroll",H,!0),window.removeEventListener("resize",D),h?.(),h=null}}}function Ut(e={}){let{id:t,text:n="",htmlFor:o,tone:r="default",size:a="md",layout:i="inline",variant:s="text",required:c=!1,disabled:d=!1,tooltip:l,hint:u,icon:p,suffix:m,onClick:f}=e,g=S("div",{className:"lg-label-wrap",id:t}),b=S("label",{className:"lg-label",...o?{htmlFor:o}:{},...l?{title:l}:{}});if(p){let M=typeof p=="string"?S("span",{className:"lg-label-ico"},p):p;M.classList?.add?.("lg-label-ico"),b.appendChild(M)}let h=S("span",{className:"lg-label-text"},n);b.appendChild(h);let w=S("span",{className:"lg-label-req",ariaHidden:"true"}," *");c&&b.appendChild(w);let T=null;if(m!=null){T=typeof m=="string"?document.createTextNode(m):m;let M=S("span",{className:"lg-label-suffix"});M.appendChild(T),b.appendChild(M)}let x=u?S("div",{className:"lg-label-hint"},u):null;g.classList.add(`lg-label--${i}`),g.classList.add(`lg-label--${a}`),s==="title"&&g.classList.add("lg-label--title"),v(r),d&&g.classList.add("is-disabled"),g.appendChild(b),x&&g.appendChild(x),f&&b.addEventListener("click",f);function v(M){g.classList.remove("lg-label--default","lg-label--muted","lg-label--info","lg-label--success","lg-label--warning","lg-label--danger"),g.classList.add(`lg-label--${M}`)}function k(M){h.textContent=M}function L(M){v(M)}function E(M){M&&!w.isConnected&&b.appendChild(w),!M&&w.isConnected&&w.remove(),M?b.setAttribute("aria-required","true"):b.removeAttribute("aria-required")}function A(M){g.classList.toggle("is-disabled",!!M)}function R(M){!M&&x&&x.isConnected?x.remove():M&&x?x.textContent=M:M&&!x&&g.appendChild(S("div",{className:"lg-label-hint"},M))}return{root:g,labelEl:b,hintEl:x,setText:k,setTone:L,setRequired:E,setDisabled:A,setHint:R}}function ut(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function zt(e,t){let n=document.createElement("span");n.className=`btn-ico btn-ico--${t}`;let o=ut(e);return o&&n.appendChild(o),n}function sl(){let e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.marginRight="6px",t.style.display="none",t.style.flexShrink="0";let n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");let o=document.createElementNS(e,"animate");o.setAttribute("attributeName","stroke-dasharray"),o.setAttribute("values","1,150;90,150;90,150"),o.setAttribute("dur","1.5s"),o.setAttribute("repeatCount","indefinite");let r=document.createElementNS(e,"animateTransform");return r.setAttribute("attributeName","transform"),r.setAttribute("attributeType","XML"),r.setAttribute("type","rotate"),r.setAttribute("from","0 12 12"),r.setAttribute("to","360 12 12"),r.setAttribute("dur","1s"),r.setAttribute("repeatCount","indefinite"),n.appendChild(o),n.appendChild(r),t.appendChild(n),t}function Re(e={}){let{label:t="",id:n,variant:o="default",size:r="md",iconLeft:a,iconRight:i,loading:s=!1,tooltip:c,type:d="button",onClick:l,disabled:u=!1,fullWidth:p=!1}=e,m=S("button",{className:"btn",id:n});m.type=d,o==="primary"&&m.classList.add("primary"),r==="sm"&&m.classList.add("btn--sm"),c&&(m.title=c),p&&(m.style.width="100%");let f=sl(),g=a?zt(a,"left"):null,b=i?zt(i,"right"):null,h=document.createElement("span");h.className="btn-label";let w=ut(t);w&&h.appendChild(w),!w&&(g||b)&&m.classList.add("btn--icon"),m.appendChild(f),g&&m.appendChild(g),m.appendChild(h),b&&m.appendChild(b);let T=u||s;m.disabled=T,m.setAttribute("aria-busy",String(!!s)),f.style.display=s?"inline-block":"none",l&&m.addEventListener("click",l);let x=m;return x.setLoading=v=>{m.setAttribute("aria-busy",String(!!v)),f.style.display=v?"inline-block":"none",m.disabled=v||u},x.setDisabled=v=>{m.disabled=v||m.getAttribute("aria-busy")==="true"},x.setLabel=v=>{h.replaceChildren();let k=ut(v);k&&h.appendChild(k),!k&&(g||b)?m.classList.add("btn--icon"):m.classList.remove("btn--icon")},x.setIconLeft=v=>{if(v==null){g?.remove();return}g?g.replaceChildren(ut(v)):m.insertBefore(zt(v,"left"),h)},x.setIconRight=v=>{if(v==null){b?.remove();return}b?b.replaceChildren(ut(v)):m.appendChild(zt(v,"right"))},x}function ll(){try{let e=window.visualViewport,t=Math.round((e?.width??window.innerWidth)||0),n=Math.round((e?.height??window.innerHeight)||0);if(t&&n)return t>=n?"landscape":"portrait"}catch{}return"unknown"}function cl(){let e=navigator.userAgent||"",t=navigator.platform||"",n=navigator.userAgentData;if(n&&typeof n.platform=="string"){let r=n.platform.toLowerCase();if(r.includes("windows"))return"windows";if(r.includes("mac"))return"mac";if(r.includes("android"))return"android";if(r.includes("chrome os")||r.includes("cros"))return"chromeos";if(r.includes("linux"))return"linux";if(r.includes("ios"))return"ios"}return/iPhone|iPad|iPod/i.test(e)||t==="MacIntel"&&navigator.maxTouchPoints>1?"ios":/Android/i.test(e)?"android":/CrOS/i.test(e)?"chromeos":/Win/i.test(e)?"windows":/Mac/i.test(e)?"mac":/Linux/i.test(e)?"linux":"unknown"}function ul(){let e=navigator.userAgent||"",t=navigator.userAgentData;if(t&&Array.isArray(t.brands)){let n=t.brands.map(i=>String(i.brand||i.brandName||i.brandVersion||i)),o=n.some(i=>/Edge/i.test(i)||/Microsoft Edge/i.test(i)),r=n.some(i=>/Opera/i.test(i)||/OPR/i.test(i)),a=n.some(i=>/Chrome|Chromium/i.test(i));if(o)return"Edge";if(r)return"Opera";if(a)return"Chrome";if(navigator.brave)return"Brave"}return/FxiOS/i.test(e)?"Firefox":/CriOS/i.test(e)?"Chrome":/EdgiOS/i.test(e)?"Edge":/OPiOS|OPR|Opera Mini|Opera/i.test(e)?"Opera":/Edg\//i.test(e)?"Edge":/OPR\//i.test(e)||/Opera/i.test(e)?"Opera":/Firefox/i.test(e)?"Firefox":/Safari/i.test(e)&&!/Chrome|Chromium|Edg|OPR/i.test(e)?"Safari":/Brave/i.test(e)||window.Brave||navigator.brave?"Brave":/Chrome|Chromium/i.test(e)?"Chrome":"Unknown"}function dl(){let e=navigator.userAgent||"",t=navigator.userAgentData;return t&&typeof t.mobile=="boolean"?t.mobile?"mobile":"desktop":/Android|iPhone|iPad|iPod|Mobile/i.test(e)?"mobile":"desktop"}function he(){let e=(()=>{try{return window.top!==window.self}catch{return!0}})(),t=pl(document.referrer),o=e&&!!t&&/(^|\.)discord(app)?\.com$/i.test(t)?"discord":"web",r=dl(),a=cl(),i=ul(),s=window.screen||{},c=window.visualViewport,d=Math.round(window.innerWidth||document.documentElement.clientWidth||0),l=Math.round(window.innerHeight||document.documentElement.clientHeight||0),u=Math.round(c?.width??d),p=Math.round(c?.height??l),m=Math.round(s.width||0),f=Math.round(s.height||0),g=Math.round(s.availWidth||m),b=Math.round(s.availHeight||f),h=Number.isFinite(window.devicePixelRatio)?window.devicePixelRatio:1;return{surface:o,host:location.hostname,origin:location.origin,isInIframe:e,platform:r,browser:i,os:a,viewportWidth:d,viewportHeight:l,visualViewportWidth:u,visualViewportHeight:p,screenWidth:m,screenHeight:f,availScreenWidth:g,availScreenHeight:b,dpr:h,orientation:ll()}}function Mr(){return he().surface==="discord"}function pl(e){if(!e)return null;try{return new URL(e).hostname}catch{return null}}var $t=!1,dt=new Set;function ml(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}var ge=e=>{let t=ml();if(t){for(let n of dt)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function fl(){$t||($t=!0,window.addEventListener("keydown",ge,!0),window.addEventListener("keypress",ge,!0),window.addEventListener("keyup",ge,!0),document.addEventListener("keydown",ge,!0),document.addEventListener("keypress",ge,!0),document.addEventListener("keyup",ge,!0))}function gl(){$t&&($t=!1,window.removeEventListener("keydown",ge,!0),window.removeEventListener("keypress",ge,!0),window.removeEventListener("keyup",ge,!0),document.removeEventListener("keydown",ge,!0),document.removeEventListener("keypress",ge,!0),document.removeEventListener("keyup",ge,!0))}function bl(e){return dt.size===0&&fl(),dt.add(e),()=>{dt.delete(e),dt.size===0&&gl()}}function hl(e,t,n,o){let r;switch(e){case"digits":r="0-9";break;case"alpha":r="\\p{L}";break;case"alphanumeric":r="\\p{L}0-9";break;default:return null}return t&&(r+=" "),n&&(r+="\\-"),o&&(r+="_"),new RegExp(`[^${r}]`,"gu")}function yl(e,t){return t?e.replace(t,""):e}function xl(e,t=0){if(!t)return e;let n;return((...o)=>{clearTimeout(n),n=setTimeout(()=>e(...o),t)})}function Ir(e={}){let{id:t,placeholder:n="",value:o="",mode:r="any",allowSpaces:a=!1,allowDashes:i=!1,allowUnderscore:s=!1,maxLength:c,blockGameKeys:d=!0,debounceMs:l=0,onChange:u,onEnter:p,label:m}=e,f=S("div",{className:"lg-input-wrap"}),g=S("input",{className:"input",id:t,placeholder:n});if(typeof c=="number"&&c>0&&(g.maxLength=c),o&&(g.value=o),m){let M=S("div",{className:"lg-input-label"},m);f.appendChild(M)}f.appendChild(g);let b=hl(r,a,i,s),h=()=>{let M=g.selectionStart??g.value.length,U=g.value.length,J=yl(g.value,b);if(J!==g.value){g.value=J;let K=U-J.length,_=Math.max(0,M-K);g.setSelectionRange(_,_)}},w=xl(()=>u?.(g.value),l);g.addEventListener("input",()=>{h(),w()}),g.addEventListener("paste",()=>queueMicrotask(()=>{h(),w()})),g.addEventListener("keydown",M=>{M.key==="Enter"&&p?.(g.value)});let T=d?bl(g):()=>{};function x(){return g.value}function v(M){g.value=M??"",h(),w()}function k(){g.focus()}function L(){g.blur()}function E(M){g.disabled=!!M}function A(){return document.activeElement===g}function R(){T()}return{root:f,input:g,getValue:x,setValue:v,focus:k,blur:L,setDisabled:E,isFocused:A,destroy:R}}function ne(e,t,n){return Math.min(n,Math.max(t,e))}function mt({h:e,s:t,v:n,a:o}){let r=(e%360+360)%360/60,a=n*t,i=a*(1-Math.abs(r%2-1)),s=0,c=0,d=0;switch(Math.floor(r)){case 0:s=a,c=i;break;case 1:s=i,c=a;break;case 2:c=a,d=i;break;case 3:c=i,d=a;break;case 4:s=i,d=a;break;default:s=a,d=i;break}let u=n-a,p=Math.round((s+u)*255),m=Math.round((c+u)*255),f=Math.round((d+u)*255);return{r:ne(p,0,255),g:ne(m,0,255),b:ne(f,0,255),a:ne(o,0,1)}}function Er({r:e,g:t,b:n,a:o}){let r=ne(e,0,255)/255,a=ne(t,0,255)/255,i=ne(n,0,255)/255,s=Math.max(r,a,i),c=Math.min(r,a,i),d=s-c,l=0;d!==0&&(s===r?l=60*((a-i)/d%6):s===a?l=60*((i-r)/d+2):l=60*((r-a)/d+4)),l<0&&(l+=360);let u=s===0?0:d/s;return{h:l,s:u,v:s,a:ne(o,0,1)}}function Mn({r:e,g:t,b:n}){let o=r=>ne(Math.round(r),0,255).toString(16).padStart(2,"0");return`#${o(e)}${o(t)}${o(n)}`.toUpperCase()}function vl({r:e,g:t,b:n,a:o}){let r=ne(Math.round(o*255),0,255);return`${Mn({r:e,g:t,b:n,a:o})}${r.toString(16).padStart(2,"0")}`.toUpperCase()}function pt({r:e,g:t,b:n,a:o}){let r=Math.round(o*1e3)/1e3;return`rgba(${e}, ${t}, ${n}, ${r})`}function Je(e){let t=e.trim();if(!t||(t.startsWith("#")&&(t=t.slice(1)),![3,4,6,8].includes(t.length))||!/^[0-9a-fA-F]+$/.test(t))return null;(t.length===3||t.length===4)&&(t=t.split("").map(i=>i+i).join(""));let n=255;t.length===8&&(n=parseInt(t.slice(6,8),16),t=t.slice(0,6));let o=parseInt(t.slice(0,2),16),r=parseInt(t.slice(2,4),16),a=parseInt(t.slice(4,6),16);return{r:o,g:r,b:a,a:n/255}}function Cn(e){if(!e)return null;let t=e.trim();if(t.startsWith("#"))return Je(t);let n=t.match(/^rgba?\(([^)]+)\)$/i);if(n){let o=n[1].split(",").map(c=>c.trim());if(o.length<3)return null;let r=Number(o[0]),a=Number(o[1]),i=Number(o[2]),s=o[3]!=null?Number(o[3]):1;return[r,a,i,s].some(c=>Number.isNaN(c))?null:{r,g:a,b:i,a:s}}return null}function wl(e,t){let n=Cn(e)??Je(e??"")??{r:244,g:67,b:54,a:1};return typeof t=="number"&&(n.a=ne(t,0,1)),Er(n)}function Sl(e){return`#${e.trim().replace(/[^0-9a-fA-F#]/g,"").replace(/#/g,"")}`.slice(0,9).toUpperCase()}function kl(e){let t=e.trim();return t&&(/^rgba?\s*\(/i.test(t)?t=t.replace(/^rgba?/i,"rgba"):(t=t.replace(/^\(?(.*)\)?$/,"$1"),t=`rgba(${t})`),t=t.replace(/\s*\(\s*/,"("),t=t.replace(/\s*\)\s*$/,")"),t=t.replace(/\s*,\s*/g,", "),t)}function We(e){let t=mt(e),n=mt({...e,a:1});return{hsva:{...e},hex:Mn(n),hexa:vl(t),rgba:pt(t),alpha:e.a}}function Lr(e={}){let{id:t,label:n="Color",value:o,alpha:r,defaultExpanded:a=!1,detectMobile:i,onInput:s,onChange:c}=e,l=i?i():he().platform==="mobile",u=wl(o,r),p=Le({id:t,className:"color-picker",title:n,padding:l?"md":"lg",variant:"soft",expandable:!l,defaultExpanded:!l&&a});p.classList.add(l?"color-picker--mobile":"color-picker--desktop");let m=p.querySelector(".card-header");m&&m.classList.add("color-picker__header");let f=m?.querySelector(".card-title"),g=S("button",{className:"color-picker__preview",type:"button",title:`Preview ${n}`,"aria-label":`Change ${n}`});f?f.prepend(g):m?m.prepend(g):p.prepend(g);let b=p.querySelector(".card-toggle");!l&&b&&g.addEventListener("click",()=>{p.classList.contains("card--collapsed")&&b.click()});let h=p.querySelector(".card-collapse"),w=null,T=null,x=null,v=null,k=null,L=null,E=null,A=null,R=null,M="hex";function U(H){let D=We(u);H==="input"?s?.(D):c?.(D)}function J(){let H=We(u);if(g.style.setProperty("--cp-preview-color",H.rgba),g.setAttribute("aria-label",`${n}: ${H.hexa}`),!l&&w&&T&&x&&v&&k&&L&&E){let D=mt({...u,s:1,v:1,a:1}),N=pt(D);w.style.setProperty("--cp-palette-hue",N),T.style.left=`${u.s*100}%`,T.style.top=`${(1-u.v)*100}%`,x.style.setProperty("--cp-alpha-gradient",`linear-gradient(180deg, ${pt({...D,a:1})} 0%, ${pt({...D,a:0})} 100%)`),v.style.top=`${(1-u.a)*100}%`,k.style.setProperty("--cp-hue-color",pt(mt({...u,v:1,s:1,a:1}))),L.style.left=`${u.h/360*100}%`;let O=u.a===1?H.hex:H.hexa,I=H.rgba,G=M==="hex"?O:I;E!==document.activeElement&&(E.value=G),E.setAttribute("aria-label",`${M.toUpperCase()} code for ${n}`),E.placeholder=M==="hex"?"#RRGGBB or #RRGGBBAA":"rgba(0, 0, 0, 1)",M==="hex"?E.maxLength=9:E.removeAttribute("maxLength"),E.dataset.mode=M,A&&(A.textContent=M.toUpperCase(),A.setAttribute("aria-label",M==="hex"?"Passer en saisie RGBA":"Revenir en saisie HEX"),A.setAttribute("aria-pressed",M==="rgba"?"true":"false"),A.classList.toggle("is-alt",M==="rgba"))}R&&R!==document.activeElement&&(R.value=H.hex)}function K(H,D=null){u={h:(H.h%360+360)%360,s:ne(H.s,0,1),v:ne(H.v,0,1),a:ne(H.a,0,1)},J(),D&&U(D)}function _(H,D=null){K(Er(H),D)}function j(H,D,N){H.addEventListener("pointerdown",O=>{O.preventDefault();let I=O.pointerId,G=F=>{F.pointerId===I&&D(F)},W=F=>{F.pointerId===I&&(document.removeEventListener("pointermove",G),document.removeEventListener("pointerup",W),document.removeEventListener("pointercancel",W),N?.(F))};D(O),document.addEventListener("pointermove",G),document.addEventListener("pointerup",W),document.addEventListener("pointercancel",W)})}if(!l&&h){let H=h.querySelector(".card-body");if(H){H.classList.add("color-picker__body"),T=S("div",{className:"color-picker__palette-cursor"}),w=S("div",{className:"color-picker__palette"},T),v=S("div",{className:"color-picker__alpha-thumb"}),x=S("div",{className:"color-picker__alpha"},v),L=S("div",{className:"color-picker__hue-thumb"}),k=S("div",{className:"color-picker__hue"},L);let D=S("div",{className:"color-picker__main"},w,x),N=S("div",{className:"color-picker__hue-row"},k),O=Ir({blockGameKeys:!0});E=O.input,E.classList.add("color-picker__hex-input"),E.value="",E.maxLength=9,E.spellcheck=!1,E.inputMode="text",E.setAttribute("aria-label",`Hex code for ${n}`),A=S("button",{type:"button",className:"color-picker__mode-btn",textContent:"HEX","aria-pressed":"false","aria-label":"Passer en saisie RGBA"}),O.root.classList.add("color-picker__hex-wrap");let I=S("div",{className:"color-picker__hex-row"},A,O.root);H.replaceChildren(D,N,I),j(w,W=>{if(!w||!T)return;let F=w.getBoundingClientRect(),oe=ne((W.clientX-F.left)/F.width,0,1),Tn=ne((W.clientY-F.top)/F.height,0,1);K({...u,s:oe,v:1-Tn},"input")},()=>U("change")),j(x,W=>{if(!x)return;let F=x.getBoundingClientRect(),oe=ne((W.clientY-F.top)/F.height,0,1);K({...u,a:1-oe},"input")},()=>U("change")),j(k,W=>{if(!k)return;let F=k.getBoundingClientRect(),oe=ne((W.clientX-F.left)/F.width,0,1);K({...u,h:oe*360},"input")},()=>U("change")),A.addEventListener("click",()=>{if(M=M==="hex"?"rgba":"hex",E){let W=We(u);E.value=M==="hex"?u.a===1?W.hex:W.hexa:W.rgba}J(),E?.focus(),E?.select()}),E.addEventListener("input",()=>{if(M==="hex"){let W=Sl(E.value);if(W!==E.value){let F=E.selectionStart??W.length;E.value=W,E.setSelectionRange(F,F)}}});let G=()=>{let W=E.value;if(M==="hex"){let F=Je(W);if(!F){E.value=u.a===1?We(u).hex:We(u).hexa;return}let oe=W.startsWith("#")?W.slice(1):W,Tn=oe.length===4||oe.length===8;F.a=Tn?F.a:u.a,_(F,"change")}else{let F=kl(W),oe=Cn(F);if(!oe){E.value=We(u).rgba;return}_(oe,"change")}};E.addEventListener("change",G),E.addEventListener("blur",G),E.addEventListener("keydown",W=>{W.key==="Enter"&&(G(),E.blur())})}}return l&&(h&&h.remove(),R=S("input",{className:"color-picker__native",type:"color",value:Mn(mt({...u,a:1}))}),g.addEventListener("click",()=>R.click()),R.addEventListener("input",()=>{let H=Je(R.value);H&&(H.a=u.a,_(H,"input"),U("change"))}),p.appendChild(R)),J(),{root:p,isMobile:l,getValue:()=>We(u),setValue:(H,D)=>{let N=Cn(H)??Je(H)??Je("#FFFFFF");N&&(typeof D=="number"&&(N.a=D),_(N,null))}}}var Tl=window;function Al(){if(typeof unsafeWindow<"u"&&unsafeWindow)return unsafeWindow;let e=window.wrappedJSObject;return e&&e!==window?e:Tl}var Pl=Al(),P=Pl;function Cl(e){try{return!!e.isSecureContext}catch{return!1}}function In(e){let t=e?.getRootNode?.();return t&&(t instanceof Document||t.host)?t:document}function Rr(){let e=navigator.platform||"",t=navigator.userAgent||"";return/Mac|iPhone|iPad|iPod/i.test(e)||/Mac OS|iOS/i.test(t)}async function Ml(){try{let e=await navigator.permissions?.query?.({name:"clipboard-write"});return e?e.state==="granted"||e.state==="prompt":!0}catch{return!0}}function Il(e,t){let n=document.createElement("textarea");return n.value=e,n.setAttribute("readonly","true"),n.style.position="fixed",n.style.opacity="0",n.style.pointerEvents="none",n.style.top="0",t.appendChild?t.appendChild(n):document.body.appendChild(n),n}function El(e){try{let t=window.getSelection?.();if(!t)return!1;let n=document.createRange();return n.selectNodeContents(e),t.removeAllRanges(),t.addRange(n),!0}catch{return!1}}async function Ll(e){if(!("clipboard"in navigator))return{ok:!1,method:"clipboard-write"};if(!Cl(P))return{ok:!1,method:"clipboard-write"};if(!await Ml())return{ok:!1,method:"clipboard-write"};try{return await navigator.clipboard.writeText(e),{ok:!0,method:"clipboard-write"}}catch{return{ok:!1,method:"clipboard-write"}}}function Rl(e,t){try{let n=t||In(),o=Il(e,n);o.focus(),o.select(),o.setSelectionRange(0,o.value.length);let r=!1;try{r=document.execCommand("copy")}catch{r=!1}return o.remove(),{ok:r,method:"execCommand"}}catch{return{ok:!1,method:"execCommand"}}}function Ol(e,t){if(!t)return{ok:!1,method:"selection"};let n=t.textContent??"",o=!1;if(n!==e)try{t.textContent=e,o=!0}catch{}let r=El(t);o&&setTimeout(()=>{try{t.textContent=n}catch{}},80);let a=Rr()?"\u2318C pour copier":"Ctrl+C pour copier";return{ok:r,method:"selection",hint:a}}async function Dl(e,t={}){let n=(e??"").toString();if(!n.length)return{ok:!1,method:"noop"};let o=await Ll(n);if(o.ok)return o;let r=t.injectionRoot||In(t.valueNode||void 0),a=Rl(n,r);if(a.ok)return a;let i=Ol(n,t.valueNode||null);if(i.ok)return i;if(!t.disablePromptFallback)try{return window.prompt(Mr()?"Copie manuelle (Discord bloque clipboard):":"Copie manuelle:",n),{ok:!0,method:"prompt"}}catch{}return{ok:!1,method:"noop"}}function Or(e,t,n={}){let o=r=>{if(n.showTip){n.showTip(r);return}try{e.setAttribute("aria-label",r);let a=document.createElement("div");a.textContent=r,a.style.position="absolute",a.style.top="-28px",a.style.right="0",a.style.padding="4px 8px",a.style.borderRadius="8px",a.style.fontSize="12px",a.style.background="color-mix(in oklab, var(--bg) 85%, transparent)",a.style.border="1px solid var(--border)",a.style.color="var(--fg)",a.style.pointerEvents="none",a.style.opacity="0",a.style.transition="opacity .12s";let i=In(e);i.appendChild?i.appendChild(a):document.body.appendChild(a);let s=e.getBoundingClientRect();a.style.left=`${s.right-8}px`,a.style.top=`${s.top-28}px`,requestAnimationFrame(()=>a.style.opacity="1"),setTimeout(()=>{a.style.opacity="0",setTimeout(()=>a.remove(),150)},1200)}catch{}};e.addEventListener("click",async r=>{r.stopPropagation();let a=(t()??"").toString(),i=await Dl(a,{valueNode:n.valueNode??null,injectionRoot:n.injectionRoot??null,disablePromptFallback:n.disablePromptFallback??!1});n.onResult?.(i),i.ok?i.method==="clipboard-write"||i.method==="execCommand"||i.method==="prompt"?o("Copi\xE9"):i.method==="selection"&&o(i.hint||(Rr()?"\u2318C pour copier":"Ctrl+C pour copier")):o("Impossible de copier")})}var Oe={light:{"--bg":"rgba(255,255,255,0.7)","--fg":"#0f172a","--muted":"rgba(15,23,42,0.06)","--soft":"rgba(15,23,42,0.04)","--accent":"#2563eb","--border":"rgba(15,23,42,0.12)","--shadow":"rgba(2,6,23,.2)","--tab-bg":"#ffffff","--tab-fg":"#0f172a","--pill-from":"#4f46e5","--pill-to":"#06b6d4"},dark:{"--bg":"rgba(10,12,18,0.6)","--fg":"#e5e7eb","--muted":"rgba(229,231,235,0.08)","--soft":"rgba(229,231,235,0.05)","--accent":"#60a5fa","--border":"rgba(148,163,184,0.2)","--shadow":"rgba(0,0,0,.45)","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#e5e7eb","--pill-from":"#6366f1","--pill-to":"#06b6d4"},sepia:{"--bg":"rgba(247,242,231,0.72)","--fg":"#3b2f2f","--muted":"rgba(59,47,47,0.06)","--soft":"rgba(59,47,47,0.04)","--accent":"#b07d62","--border":"rgba(59,47,47,0.14)","--shadow":"rgba(0,0,0,.18)","--tab-bg":"#fff","--tab-fg":"#3b2f2f","--pill-from":"#b07d62","--pill-to":"#d4a373"},forest:{"--bg":"rgba(14,24,18,0.62)","--fg":"#e7f5e9","--muted":"rgba(231,245,233,0.08)","--soft":"rgba(231,245,233,0.05)","--accent":"#34d399","--border":"rgba(231,245,233,0.16)","--shadow":"rgba(0,0,0,.5)","--tab-bg":"rgba(255,255,255,0.06)","--tab-fg":"#e7f5e9","--pill-from":"#10b981","--pill-to":"#84cc16"},violet:{"--bg":"rgba(23, 16, 42, 0.68)","--fg":"#f5f3ff","--muted":"rgba(245,243,255,0.08)","--soft":"rgba(245,243,255,0.05)","--accent":"#a855f7","--border":"rgba(216,180,254,0.22)","--shadow":"rgba(12,3,30,.55)","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#ede9fe","--pill-from":"#a855f7","--pill-to":"#f472b6"},ocean:{"--bg":"rgba(10, 34, 46, 0.66)","--fg":"#e0f7ff","--muted":"rgba(224,247,255,0.07)","--soft":"rgba(224,247,255,0.05)","--accent":"#38bdf8","--border":"rgba(125, 211, 252, 0.22)","--shadow":"rgba(0, 16, 32, .52)","--tab-bg":"rgba(56,189,248,0.14)","--tab-fg":"#e0f7ff","--pill-from":"#0ea5e9","--pill-to":"#14b8a6"},ember:{"--bg":"rgba(34,18,10,0.64)","--fg":"#fff7ed","--muted":"rgba(255,247,237,0.08)","--soft":"rgba(255,247,237,0.05)","--accent":"#f97316","--border":"rgba(255, 159, 92, 0.24)","--shadow":"rgba(16,6,2,.52)","--tab-bg":"rgba(255,247,237,0.09)","--tab-fg":"#fff7ed","--pill-from":"#fb923c","--pill-to":"#facc15"}};function En(e){let{host:t,themes:n,initialTheme:o,onThemeChange:r}=e,a=o,i=null,s=!1;function c(l){let u=n[l]||n[a]||{};s&&t.classList.add("theme-anim");for(let[p,m]of Object.entries(u))t.style.setProperty(p,m);s?(i!==null&&clearTimeout(i),i=P.setTimeout(()=>{t.classList.remove("theme-anim"),i=null},320)):s=!0,a=l,r?.(l)}function d(){return a}return c(o),{applyTheme:c,getCurrentTheme:d}}var Kt={ui:{expandedCards:{style:!1,system:!1}}};async function Dr(){let e=await ct("tab-settings",{version:1,defaults:Kt,sanitize:r=>({ui:{expandedCards:jt(Kt.ui.expandedCards,r.ui?.expandedCards)}})});function t(r){let a=e.get();e.update({ui:{...a.ui,...r,expandedCards:jt(a.ui.expandedCards,r.expandedCards)}})}function n(r,a){let i=e.get();e.update({ui:{...i.ui,expandedCards:{...i.ui.expandedCards,[r]:!!a}}})}function o(r){let a=e.get();n(r,!a.ui.expandedCards[r])}return{get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:o}}function Hr(e){return e.replace(/[_-]+/g," ").replace(/^\w/,t=>t.toUpperCase())}function Hl(){return Object.keys(Oe).map(e=>({value:e,label:Hr(e)}))}var Gl=["--bg","--fg","--accent","--muted","--soft","--border","--shadow","--tab-bg","--tab-fg","--pill-from","--pill-to"];function Nl(e){return Hr(e.replace(/^--/,""))}function _l(e){return e.alpha<1?e.rgba:e.hex}var qt=class extends _e{constructor(n){super({id:"tab-settings",label:"Settings"});this.deps=n}async build(n){let o=this.createGrid("12px");o.id="settings",n.appendChild(o);let r;try{r=await Dr()}catch{r={get:()=>Kt,set:()=>{},save:()=>{},setUI:()=>{},setCardExpanded:()=>{},toggleCard:()=>{}}}let a=r.get(),i=Object.keys(Oe),s=this.deps.getCurrentTheme?.()??this.deps.initialTheme,c=i.includes(s)?s:i[0]??"dark",d=c,l=Ut({text:"Theme",tone:"muted",size:"lg"}),u=qe({options:Hl(),value:c,onChange:g=>{d=g,this.deps.applyTheme(g),this.renderThemePickers(g,p,d)}}),p=S("div",{className:"settings-theme-grid"}),m=Le({title:"Style",padding:"lg",expandable:!0,defaultExpanded:!!a.ui.expandedCards.style,onExpandChange:g=>r.setCardExpanded("style",g)},S("div",{className:"kv settings-theme-row"},l.root,u.root),p);this.renderThemePickers(c,p,d);let f=this.createEnvCard({defaultExpanded:!!a.ui.expandedCards.system,onExpandChange:g=>r.setCardExpanded("system",g)});o.appendChild(m),o.appendChild(f)}renderThemePickers(n,o,r){let a=Oe[n];if(o.replaceChildren(),!!a)for(let i of Gl){let s=a[i];if(s==null)continue;let c=Lr({label:Nl(i),value:s,defaultExpanded:!1,onInput:d=>this.updateThemeVar(n,i,d,r),onChange:d=>this.updateThemeVar(n,i,d,r)});o.appendChild(c.root)}}updateThemeVar(n,o,r,a){let i=Oe[n];i&&(i[o]=_l(r),a===n&&this.deps.applyTheme(n))}createEnvCard(n){let o=n?.defaultExpanded??!1,r=n?.onExpandChange,a=(h,w)=>{let T=S("div",{className:"kv kv--inline-mobile"}),x=S("label",{},h),v=S("div",{className:"ro"});return typeof w=="string"?v.textContent=w:v.append(w),T.append(x,v),T},i=S("code",{},"\u2014"),s=S("span",{},"\u2014"),c=S("span",{},"\u2014"),d=S("span",{},"\u2014"),l=S("span",{},"\u2014"),u=S("span",{},"\u2014"),p=()=>{let h=he();c.textContent=h.surface,d.textContent=h.platform,l.textContent=h.browser??"Unknown",u.textContent=h.os??"Unknown",i.textContent=h.host,s.textContent=h.isInIframe?"Yes":"No"},m=Re({label:"Copy JSON",variant:"primary",size:"sm"});Or(m,()=>{let h=he();return JSON.stringify(h,null,2)});let f=S("div",{style:"width:100%;display:flex;justify-content:center;"},m),g=Le({title:"System",variant:"soft",padding:"lg",footer:f,expandable:!0,defaultExpanded:o,onExpandChange:r},a("Surface",c),a("Platform",d),a("Browser",l),a("OS",u),a("Host",i),a("Iframe",s)),b=()=>{document.hidden||p()};return document.addEventListener("visibilitychange",b),p(),this.addCleanup(()=>document.removeEventListener("visibilitychange",b)),g}};function ft(e){return e<10?`0${e}`:String(e)}function le(e){let t=/^(\d{1,2}):(\d{2})$/.exec((e||"").trim());if(!t)return 0;let n=Math.max(0,Math.min(23,parseInt(t[1],10)||0)),o=Math.max(0,Math.min(59,parseInt(t[2],10)||0));return n*60+o}function Ln(e){let t=Math.max(0,Math.min(1439,e|0)),n=Math.floor(t/60),o=t%60;return`${ft(n)}:${ft(o)}`}function Ae(e,t){let n=le(e),o=Math.max(0,Math.min(1439,n)),r=Math.floor(o/t)*t;return Ln(r)}function Wl(e){let t=Math.floor(e/60),n=e%60,o=t>=12;return{h12:t%12||12,m:n,pm:o}}function jl(e,t,n){return(e%12+(n?12:0))*60+t}function Bl(e){return e.platform==="mobile"||e.os==="ios"||e.os==="android"}function Gr(e={}){let{id:t,start:n="08:00",end:o="23:00",stepMinutes:r=5,disabled:a=!1,allowOvernight:i=!0,labels:s={from:"From",to:"To"},picker:c="auto",format:d="auto",useNativeOn:l,onChange:u}=e,p={start:Ae(n,r),end:Ae(o,r)},m=S("div",{className:"time-range",id:t});m.classList.add("time-range--stacked");let f=he();if(c==="native"||c==="auto"&&(l?.(f)??Bl(f)))return b();return h();function b(){let x=S("div",{className:"time-range-field",role:"group"}),v=S("span",{className:"time-range-label"},s.from||"From"),k=S("input",{className:"input time-range-input",type:"time",step:String(r*60),value:p.start}),L=S("div",{className:"time-range-field",role:"group"}),E=S("span",{className:"time-range-label"},s.to||"To"),A=S("input",{className:"input time-range-input",type:"time",step:String(r*60),value:p.end});x.append(v,k),L.append(E,A),m.append(x,L);function R(){k.value=p.start,A.value=p.end}function M(){u?.(J())}function U(H){let D=H.target,N=D===k,O=Ae(D.value||(N?p.start:p.end),r);N?(p.start=O,!i&&le(p.end)<le(p.start)&&(p.end=p.start)):(p.end=O,!i&&le(p.end)<le(p.start)&&(p.start=p.end)),R(),M()}k.addEventListener("change",U),k.addEventListener("blur",U),A.addEventListener("change",U),A.addEventListener("blur",U),a&&_(!0);function J(){return{...p}}function K(H){if(H.start&&(p.start=Ae(H.start,r)),H.end&&(p.end=Ae(H.end,r)),!i){let D=le(p.start);le(p.end)<D&&(p.end=p.start)}R(),M()}function _(H){k.disabled=H,A.disabled=H,m.classList.toggle("is-disabled",!!H)}function j(){k.removeEventListener("change",U),k.removeEventListener("blur",U),A.removeEventListener("change",U),A.removeEventListener("blur",U),m.replaceChildren()}return{root:m,getValue:J,setValue:K,setDisabled:_,destroy:j}}function h(){let x=S("label",{className:"time-range-field"}),v=S("span",{className:"time-range-label"},s.from||"From"),k=S("label",{className:"time-range-field"}),L=S("span",{className:"time-range-label"},s.to||"To"),E=d==="12h"||d==="auto"&&T(),A=w(p.start,E),R=w(p.end,E);x.append(v,A.container),k.append(L,R.container),m.append(x,k),a&&K(!0),J(),A.onAnyChange(()=>{p.start=A.to24h(r),!i&&le(p.end)<le(p.start)&&(p.end=p.start,R.setFrom24h(p.end)),u?.(M())}),R.onAnyChange(()=>{p.end=R.to24h(r),!i&&le(p.end)<le(p.start)&&(p.start=p.end,A.setFrom24h(p.start)),u?.(M())});function M(){return{...p}}function U(j){if(j.start&&(p.start=Ae(j.start,r)),j.end&&(p.end=Ae(j.end,r)),!i){let H=le(p.start);le(p.end)<H&&(p.end=p.start)}J(),u?.(M())}function J(){A.setFrom24h(p.start),R.setFrom24h(p.end)}function K(j){A.setDisabled(j),R.setDisabled(j),m.classList.toggle("is-disabled",!!j)}function _(){A.destroy(),R.destroy(),m.replaceChildren()}return{root:m,getValue:M,setValue:U,setDisabled:K,destroy:_}}function w(x,v){let k=S("div",{className:"time-picker"}),L=(I,G=2)=>{I.classList.add("time-picker-compact"),I.style.setProperty("--min-ch",String(G))},E=v?Array.from({length:12},(I,G)=>{let W=G+1;return{value:String(W),label:ft(W)}}):Array.from({length:24},(I,G)=>({value:String(G),label:ft(G)})),A=qe({size:"sm",options:E,placeholder:"HH",onChange:()=>j()});L(A.root,2);let R=Math.max(1,Math.min(30,Math.floor(e.stepMinutes??5))),M=Array.from({length:Math.floor(60/R)},(I,G)=>{let W=G*R;return{value:String(W),label:ft(W)}}),U=qe({size:"sm",options:M,placeholder:"MM",onChange:()=>j()});L(U.root,2);let J=v?qe({size:"sm",options:[{value:"am",label:"AM"},{value:"pm",label:"PM"}],value:"am",onChange:()=>j()}):null;J&&L(J.root,3),k.append(A.root,U.root,...J?[J.root]:[]);let K=null;function _(I){K=I}function j(){K?.()}function H(I){let G=le(I);if(v){let W=Wl(G);A.setValue(String(W.h12),{notify:!1}),U.setValue(String(Math.floor(W.m/R)*R),{notify:!1}),J.setValue(W.pm?"pm":"am",{notify:!1})}else{let W=Math.floor(G/60),F=G%60;A.setValue(String(W),{notify:!1}),U.setValue(String(Math.floor(F/R)*R),{notify:!1})}}function D(I){let G=parseInt(U.getValue()||"0",10)||0;if(v){let W=parseInt(A.getValue()||"12",10)||12,F=(J?.getValue()||"am")==="pm",oe=jl(W,G,F);return Ae(Ln(oe),I)}else{let F=(parseInt(A.getValue()||"0",10)||0)*60+G;return Ae(Ln(F),I)}}function N(I){A.setDisabled(I),U.setDisabled(I),J?.setDisabled(I),k.classList.toggle("is-disabled",!!I)}function O(){k.replaceChildren()}return{container:k,onAnyChange:_,setFrom24h:H,to24h:D,setDisabled:N,destroy:O}}function T(){try{let v=new Intl.DateTimeFormat(void 0,{hour:"numeric"}).format(new Date(2020,1,1,13));return/AM|PM|am|pm/.test(v)}catch{return!1}}}function _r(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Vl(e){let t=_r(e);t=t.replace(/\/\*[\s\S]*?\*\//g,r=>`<span class="tok tok-comm">${r}</span>`),t=t.replace(/(^|\s)(\/\/.*)$/gm,(r,a,i)=>`${a}<span class="tok tok-comm">${i}</span>`),t=t.replace(/`[^`\\]*(?:\\.[^`\\]*)*`/g,r=>`<span class="tok tok-str">${r}</span>`),t=t.replace(/'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/g,r=>`<span class="tok tok-str">${r}</span>`),t=t.replace(/\b(?:0[xX][0-9a-fA-F]+|0[bB][01]+|0[oO][0-7]+|\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?(?:[eE][+-]?\d+)?)\b/g,r=>`<span class="tok tok-num">${r}</span>`);let n=["break","case","catch","class","const","continue","debugger","default","delete","do","else","export","extends","finally","for","function","if","import","in","instanceof","let","new","return","super","switch","this","throw","try","typeof","var","void","while","with","yield","await","enum","implements","interface","package","private","protected","public","static","as","from","of"],o=new RegExp(`\\b(?:${n.join("|")})\\b`,"g");return t=t.replace(o,r=>`<span class="tok tok-kw">${r}</span>`),t=t.replace(/\b(?:true|false|null|undefined|NaN|Infinity)\b/g,r=>`<span class="tok tok-lit">${r}</span>`),t}function Nr(e){if(!e)return new Date().toLocaleTimeString();let t=e instanceof Date?e:new Date(e);if(isNaN(t.getTime()))return String(e);let n=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0"),r=String(t.getSeconds()).padStart(2,"0");return`${n}:${o}:${r}`}function Wr(e={}){let{id:t,className:n,height:o,maxLines:r=500,wrap:a=!1,mode:i="plain",showTimestamps:s=!0,autoScroll:c=!0}=e,d=S("div",{className:"log",id:t});n&&d.classList.add(...n.split(" ").filter(Boolean)),a&&d.classList.add("log--wrap");let l=S("div",{className:"log-viewport"}),u=S("div",{className:"log-lines"});l.appendChild(u),d.appendChild(l),o!=null&&(d.style.blockSize=typeof o=="number"?`${o}px`:String(o));let p=i,m=r,f=new Map;function g(_){return p==="js"?Vl(_):_r(_)}function b(_){return _?f.get(_)?.body??u:u}function h(_){let j=typeof _=="string"?{text:_}:_||{text:""},H=b(j.groupKey);if(j.key){let O=Array.from(H.querySelectorAll(`.log-line[data-key="${j.key}"]`)).pop();if(O){j.level&&(O.classList.remove("log-level--debug","log-level--info","log-level--warn","log-level--error"),O.classList.add(`log-level--${j.level}`));let I=O.querySelector(".log-time");s&&I&&(I.textContent=Nr(j.time));let G=O.querySelector(".log-text");G&&(G.innerHTML=g(j.text)),c&&L();return}}let D=document.createElement("div");if(D.className="log-line",j.level&&D.classList.add(`log-level--${j.level}`),j.key&&(D.dataset.key=j.key),s){let O=document.createElement("span");O.className="log-time",O.textContent=Nr(j.time),D.appendChild(O)}let N=document.createElement("span");N.className="log-text",N.innerHTML=g(j.text),D.appendChild(N),H.appendChild(D),R(),c&&L()}function w(_){for(let j of _)h(j)}function T(){u.replaceChildren(),f.clear()}function x(_){p=_,L()}function v(_){d.classList.toggle("log--wrap",!!_),L()}function k(_){m=Math.max(1,Math.floor(_||1))}function L(){requestAnimationFrame(()=>{l.scrollTop=l.scrollHeight})}function E(){let _=0;for(let j=0;j<u.children.length;j+=1){let H=u.children[j];(H.classList.contains("log-line")||H.classList.contains("log-group"))&&(_+=1)}return _}function A(){let _=u.firstElementChild;if(!_)return!1;if(_.classList.contains("log-group")){let j=_.dataset.groupKey;j&&f.delete(j)}return _.remove(),!0}function R(){let _=E();for(;_>m&&A();)_--}function M(_,j){let H=j?.key||`g-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,6)}`;if(f.has(H))return H;let D=document.createElement("div");D.className="log-group",D.dataset.groupKey=H;let N=document.createElement("div");N.className="log-group-header",N.textContent=_;let O=document.createElement("div");O.className="log-group-body",D.append(N,O),u.appendChild(D),f.set(H,{root:D,header:N,body:O});let I=G=>{D.classList.toggle("is-collapsed",!!G)};return j?.collapsed&&I(!0),N.addEventListener("click",()=>I(!D.classList.contains("is-collapsed"))),c&&L(),H}function U(_){f.get(_)}function J(_,j){let H=f.get(_);H&&(j==null?H.root.classList.toggle("is-collapsed"):H.root.classList.toggle("is-collapsed",!!j))}let K=d;return K.add=h,K.addMany=w,K.clear=T,K.setMode=x,K.setWrap=v,K.setMaxLines=k,K.scrollToEnd=L,K.beginGroup=M,K.endGroup=U,K.toggleGroup=J,K}var ce={nativeCtor:null,captured:[],latestOpen:null},jr=Symbol.for("ariesmod.ws.capture.wrapped"),Br=Symbol.for("ariesmod.ws.capture.native"),Vr=1;function Rn(e){return!!e&&e.readyState===Vr}function Fl(){if(Rn(ce.latestOpen))return ce.latestOpen;for(let e=ce.captured.length-1;e>=0;e--){let t=ce.captured[e];if(Rn(t))return t}return null}function Ul(e,t){ce.captured.push(e),ce.captured.length>25&&ce.captured.splice(0,ce.captured.length-25);let n=()=>{ce.latestOpen=e,t&&console.log("[WS] captured socket opened",e.url)};e.addEventListener("open",n),e.addEventListener("close",()=>{ce.latestOpen===e&&(ce.latestOpen=null),t&&console.log("[WS] captured socket closed",e.url)}),e.readyState===Vr&&n()}function Fr(e=P,t={}){let n=!!t.debug,o=e?.WebSocket;if(typeof o!="function")return()=>{};if(o[jr])return ce.nativeCtor=o[Br]??ce.nativeCtor??null,()=>{};let r=o;ce.nativeCtor=r;function a(i,s){let c=s!==void 0?new r(i,s):new r(i);try{Ul(c,n)}catch{}return c}try{a.prototype=r.prototype}catch{}try{Object.setPrototypeOf(a,r)}catch{}try{a.CONNECTING=r.CONNECTING,a.OPEN=r.OPEN,a.CLOSING=r.CLOSING,a.CLOSED=r.CLOSED}catch{}a[jr]=!0,a[Br]=r;try{e.WebSocket=a,n&&console.log("[WS] WebSocket capture installed")}catch{return()=>{}}return()=>{try{e.WebSocket===a&&(e.WebSocket=r)}catch{}}}function zl(e=P){let t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function gt(e=P){let t=Fl();if(t)return{ws:t,source:"captured"};let n=zl(e);return n?{ws:n,source:"roomConnection"}:{ws:null,source:null}}function Jt(e,t={}){let n=t.pageWindow??P,o=t.intervalMs??500,r=!!t.debug,a=null,i=null,s=()=>{let d=gt(n);(d.ws!==a||d.source!==i)&&(a=d.ws,i=d.source,r&&console.log("[WS] best socket changed:",d.source,d.ws),e(d))};s();let c=setInterval(s,o);return()=>clearInterval(c)}function $l(e){if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return null}}function Kl(e,t=P){let n=t?.MagicCircle_RoomConnection;if(n&&typeof n.sendMessage=="function")try{return Array.isArray(e)?n.sendMessage(...e):n.sendMessage(e),{ok:!0}}catch(a){return{ok:!1,reason:"error",error:a}}let{ws:o}=gt(t);if(!o)return{ok:!1,reason:"no-ws"};if(!Rn(o))return{ok:!1,reason:"not-open"};let r=$l(e);if(r==null)return{ok:!1,reason:"error",error:new Error("Cannot stringify message")};try{return o.send(r),{ok:!0}}catch(a){return{ok:!1,reason:"error",error:a}}}function Ur(e,t={},n=P){return Kl({type:e,...t},n)}var we={Welcome:"Welcome",PartialState:"PartialState",ServerErrorMessage:"ServerErrorMessage",Config:"Config",InappropriateContentRejected:"InappropriateContentRejected",Emote:"Emote",CurrencyTransaction:"CurrencyTransaction",Pong:"Pong"},C={Chat:"Chat",Emote:"Emote",Wish:"Wish",KickPlayer:"KickPlayer",SetPlayerData:"SetPlayerData",UsurpHost:"UsurpHost",Dev:"Dev",SetSelectedGame:"SetSelectedGame",VoteForGame:"VoteForGame",RequestGame:"RequestGame",RestartGame:"RestartGame",Ping:"Ping",PlayerPosition:"PlayerPosition",Teleport:"Teleport",CheckWeatherStatus:"CheckWeatherStatus",MoveInventoryItem:"MoveInventoryItem",DropObject:"DropObject",PickupObject:"PickupObject",ToggleFavoriteItem:"ToggleFavoriteItem",PutItemInStorage:"PutItemInStorage",RetrieveItemFromStorage:"RetrieveItemFromStorage",MoveStorageItem:"MoveStorageItem",LogItems:"LogItems",PlantSeed:"PlantSeed",WaterPlant:"WaterPlant",HarvestCrop:"HarvestCrop",SellAllCrops:"SellAllCrops",PurchaseSeed:"PurchaseSeed",PurchaseEgg:"PurchaseEgg",PurchaseTool:"PurchaseTool",PurchaseDecor:"PurchaseDecor",PlantEgg:"PlantEgg",HatchEgg:"HatchEgg",PlantGardenPlant:"PlantGardenPlant",PotPlant:"PotPlant",MutationPotion:"MutationPotion",PickupDecor:"PickupDecor",PlaceDecor:"PlaceDecor",RemoveGardenObject:"RemoveGardenObject",PlacePet:"PlacePet",FeedPet:"FeedPet",PetPositions:"PetPositions",SwapPet:"SwapPet",StorePet:"StorePet",NamePet:"NamePet",SellPet:"SellPet",ReportSpeakingStart:"ReportSpeakingStart"};var Xb=new Set(Object.values(we)),Qb=new Set(Object.values(C));function $(e,t={},n=P){return Ur(e,t,n)}function Yt(e,t=P){return $(C.Chat,{scopePath:["Room"],message:e},t)}function zr(e,t=P){return $(C.Emote,{scopePath:["Room"],emoteType:e},t)}function $r(e,t=P){return $(C.Wish,{wish:e},t)}function Kr(e,t=P){return $(C.KickPlayer,{scopePath:["Room"],playerId:e},t)}function qr(e,t=P){return $(C.SetPlayerData,{scopePath:["Room"],data:e},t)}function Jr(e=P){return $(C.UsurpHost,{},e)}function Yr(e=P){return $(C.ReportSpeakingStart,{},e)}function Xr(e,t=P){return $(C.SetSelectedGame,{scopePath:["Room"],gameId:e},t)}function Qr(e,t=P){return $(C.VoteForGame,{scopePath:["Room"],gameId:e},t)}function Zr(e,t=P){return $(C.RequestGame,{scopePath:["Room"],gameId:e},t)}function ea(e=P){return $(C.RestartGame,{scopePath:["Room"]},e)}function ta(e,t=P){return $(C.Ping,{id:e},t)}function On(e,t,n=P){return $(C.PlayerPosition,{x:e,y:t},n)}var na=On;function oa(e,t,n=P){return $(C.Teleport,{x:e,y:t},n)}function ra(e=P){return $(C.CheckWeatherStatus,{},e)}function aa(e,t,n=P){return $(C.MoveInventoryItem,{fromIndex:e,toIndex:t},n)}function ia(e,t=P){return $(C.DropObject,{slotIndex:e},t)}function sa(e,t=P){return $(C.PickupObject,{objectId:e},t)}function la(e,t,n=P){return $(C.ToggleFavoriteItem,{itemId:e,favorite:t},n)}function ca(e,t=P){return $(C.PutItemInStorage,{itemId:e},t)}function ua(e,t=P){return $(C.RetrieveItemFromStorage,{itemId:e},t)}function da(e,t,n=P){return $(C.MoveStorageItem,{fromIndex:e,toIndex:t},n)}function pa(e=P){return $(C.LogItems,{},e)}function ma(e,t,n,o=P){return $(C.PlantSeed,{seedId:e,x:t,y:n},o)}function fa(e,t=P){return $(C.WaterPlant,{plantId:e},t)}function ga(e,t=P){return $(C.HarvestCrop,{cropId:e},t)}function ba(e=P){return $(C.SellAllCrops,{},e)}function ha(e,t=P){return $(C.PurchaseDecor,{decorId:e},t)}function ya(e,t=P){return $(C.PurchaseEgg,{eggId:e},t)}function xa(e,t=P){return $(C.PurchaseTool,{toolId:e},t)}function va(e,t=P){return $(C.PurchaseSeed,{seedId:e},t)}function wa(e,t,n,o=P){return $(C.PlantEgg,{eggId:e,x:t,y:n},o)}function Sa(e,t=P){return $(C.HatchEgg,{eggId:e},t)}function ka(e,t,n,o=P){return $(C.PlantGardenPlant,{plantId:e,x:t,y:n},o)}function Ta(e,t,n=P){return $(C.PotPlant,{plantId:e,potId:t},n)}function Aa(e,t,n=P){return $(C.MutationPotion,{potionId:e,targetId:t},n)}function Pa(e,t=P){return $(C.PickupDecor,{decorInstanceId:e},t)}function Ca(e,t,n,o=P){return $(C.PlaceDecor,{decorId:e,x:t,y:n},o)}function Ma(e,t=P){return $(C.RemoveGardenObject,{objectId:e},t)}function Ia(e,t,n,o=P){return $(C.PlacePet,{petId:e,x:t,y:n},o)}function Ea(e,t,n=P){return $(C.FeedPet,{petId:e,foodItemId:t},n)}function La(e,t=P){return $(C.PetPositions,{positions:e},t)}function Ra(e,t,n=P){return $(C.SwapPet,{petIdA:e,petIdB:t},n)}function Oa(e,t=P){return $(C.StorePet,{petId:e},t)}function Da(e,t,n=P){return $(C.NamePet,{petId:e,name:t},n)}function Ha(e,t=P){return $(C.SellPet,{petId:e},t)}var je={timeRange:{start:"09:00",end:"18:00"},logSettings:{mode:"js",wrap:!1}};async function Na(){return ct("tab-test",{version:1,defaults:je,sanitize:e=>({timeRange:{start:e.timeRange?.start||je.timeRange.start,end:e.timeRange?.end||je.timeRange.end},logSettings:{mode:e.logSettings?.mode||je.logSettings.mode,wrap:e.logSettings?.wrap??je.logSettings.wrap}})})}var Xt=class extends _e{constructor(){super({id:"tab-test",label:"Test"})}async build(t){let n=this.createContainer("test-section");t.appendChild(n);let o;try{o=await Na()}catch{o={get:()=>je,set:()=>{},update:()=>{},save:()=>{}}}let r=o.get(),a=Ut({text:"Plage horaire",hint:"Heures actives du mode 'Plage horaire'.",icon:"\u23F0"}),i=Gr({start:r.timeRange.start,end:r.timeRange.end,stepMinutes:5,allowOvernight:!0,picker:"auto",format:"12h",onChange:b=>{o.update({timeRange:{start:b.start,end:b.end}})}}),s=S("div",null,a.root,i.root),c=Wr({height:220,mode:r.logSettings.mode,maxLines:1e3});r.logSettings.wrap&&c.setWrap(!0),c.add({level:"info",text:"Log initialise"}),c.add({level:"debug",text:"const x = 42; // demo"}),c.add({level:"warn",text:"Requete lente: fetch('/api') > 1200ms"}),c.add({level:"error",text:"new Error('Boom')"});let d=Re({label:"Appliquer",variant:"primary",onClick:()=>{let b=i.getValue();c.add({level:"info",text:`[Apply] ${b.start} -> ${b.end}`})}}),l=Le({title:"Parametres - Plage horaire",subtitle:"Choisis la fenetre d'activite",variant:"soft",padding:"lg",footer:Pn(d)},s),u=Re({label:"Clear",onClick:()=>Yt("test")}),p=Re({label:r.logSettings.wrap?"Unwrap":"Wrap",onClick:()=>{let b=!c.classList.contains("log--wrap");c.setWrap(b),p.setLabel(b?"Unwrap":"Wrap"),o.update({logSettings:{...o.get().logSettings,wrap:b}})}}),m=Re({label:`Mode: ${r.logSettings.mode}`,onClick:()=>{let h=o.get().logSettings.mode==="js"?"plain":"js";c.setMode(h),m.setLabel(`Mode: ${h}`),o.update({logSettings:{...o.get().logSettings,mode:h}})}}),f=Re({label:"Add line",onClick:()=>c.add({level:"debug",text:"function tick(){ return Date.now(); } // sample"})}),g=Le({title:"Logs",variant:"default",padding:"lg"},c,Pn(u,p,m,f));n.appendChild(l),n.appendChild(g)}};function Dn(e){return[new qt(e),new Xt]}function Hn(e){let{shadow:t,initialOpen:n}=e,o=S("div",{className:"gemini-panel",id:"panel",ariaHidden:String(!n)}),r=S("div",{className:"gemini-tabbar"}),a=S("div",{className:"gemini-content",id:"content"}),i=S("div",{className:"gemini-resizer",title:"Resize"}),s=S("button",{className:"gemini-close",title:"Fermer",ariaLabel:"Fermer"},"\u2715");o.append(r,a,i);let c=S("div",{className:"gemini-wrapper"},o);return t.append(c),{panel:o,tabbar:r,content:a,resizer:i,closeButton:s,wrapper:c}}function Gn(e){let{resizer:t,host:n,panel:o,shadow:r,onWidthChange:a,initialWidth:i,minWidth:s,maxWidth:c}=e,d=s,l=c;function u(){let v=he(),k=Math.round(P.visualViewport?.width??P.innerWidth??0);if(v.platform==="mobile"||v.os==="ios"||v.os==="android"){let L=getComputedStyle(r.host),E=parseFloat(L.getPropertyValue("--inset-l"))||0,A=parseFloat(L.getPropertyValue("--inset-r"))||0,R=Math.max(280,k-Math.round(E+A)),M=Math.min(420,Math.max(300,Math.floor(k*.66))),U=R;d=Math.min(M,R),l=U}else d=s,l=c;return{min:d,max:l}}function p(v){return Math.max(d,Math.min(l,Number(v)||i))}function m(v){let k=p(v);n.style.setProperty("--w",`${k}px`),a(k)}u();let f=he(),g=!(f.platform==="mobile"||f.os==="ios"||f.os==="android"),b=!1,h=v=>{if(!b)return;v.preventDefault();let k=Math.round(P.innerWidth-v.clientX);m(k)},w=()=>{b&&(b=!1,document.body.style.cursor="",P.removeEventListener("mousemove",h),P.removeEventListener("mouseup",w))},T=v=>{g&&(v.preventDefault(),b=!0,document.body.style.cursor="ew-resize",P.addEventListener("mousemove",h),P.addEventListener("mouseup",w))};t.addEventListener("mousedown",T);function x(){t.removeEventListener("mousedown",T),P.removeEventListener("mousemove",h),P.removeEventListener("mouseup",w)}return{calculateResponsiveBounds:u,constrainWidthToLimits:p,setHudWidth:m,destroy:x}}function Nn(e){let{panel:t,onToggle:n,onClose:o,toggleCombo:r=c=>c.ctrlKey&&c.shiftKey&&c.key.toLowerCase()==="u",closeOnEscape:a=!0}=e;function i(c){let d=t.classList.contains("open");if(a&&c.key==="Escape"&&d){o();return}r(c)&&(c.preventDefault(),c.stopPropagation(),n())}document.addEventListener("keydown",i,{capture:!0});function s(){document.removeEventListener("keydown",i,{capture:!0})}return{destroy:s}}var _a=`
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
`;var Wn=`
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
`;var jn=`
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
`;function ee(e,t,n){if(e.querySelector(`style[data-style-id="${n}"]`))return;let o=document.createElement("style");o.setAttribute("data-style-id",n),o.textContent=t,e.appendChild(o)}var Wa=`
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
  
`;var ja=`
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
`;var Ba=`
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
`;var Va=`
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
`;var Fa=`
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
`;var Ua=`
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
`;var za=`
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
`;var $a=`
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
`;var Ka=`
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
`;var qa=`
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
`;var Ja=`
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
`;var Ya=`
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
`;var Xa=`
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
`;var Qa=`
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
`;var Za=`
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
`;var ei=`
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
`;var ti=`
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
`;var ql={all:"initial",position:"fixed",top:"0",right:"0",zIndex:"2147483647",pointerEvents:"auto",fontFamily:'system-ui, -apple-system, "Segoe UI", Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',fontSize:"13px",lineHeight:"1.35"};function Jl(e="gemini-root"){let t=document.createElement("div");t.id=e,Object.assign(t.style,ql),(document.body||document.documentElement).appendChild(t);let n=t.attachShadow({mode:"open"});return{host:t,shadow:n}}function Bn(e){let{hostId:t="gemini-hud-root",initialWidth:n,initialOpen:o,onWidthChange:r,onOpenChange:a,themes:i,initialTheme:s,onThemeChange:c,buildSections:d,initialTab:l,onTabChange:u,toggleCombo:p=N=>N.ctrlKey&&N.shiftKey&&N.key.toLowerCase()==="u",closeOnEscape:m=!0,minWidth:f=420,maxWidth:g=720}=e,{host:b,shadow:h}=Jl(t);ee(h,_n,"variables"),ee(h,Wn,"primitives"),ee(h,jn,"utilities"),ee(h,_a,"hud"),ee(h,Wa,"card"),ee(h,ja,"badge"),ee(h,Ba,"button"),ee(h,Va,"input"),ee(h,Fa,"label"),ee(h,Ua,"navTabs"),ee(h,za,"searchBar"),ee(h,$a,"select"),ee(h,Ka,"switch"),ee(h,qa,"table"),ee(h,Ja,"timeRangePicker"),ee(h,Ya,"tooltip"),ee(h,Xa,"slider"),ee(h,Qa,"reorderableList"),ee(h,Za,"colorPicker"),ee(h,ei,"log"),ee(h,ti,"settings");let{panel:w,tabbar:T,content:x,resizer:v,closeButton:k,wrapper:L}=Hn({shadow:h,initialOpen:o});function E(N){w.dispatchEvent(new CustomEvent("gemini:hud-open-change",{detail:{isOpen:N},bubbles:!0})),a?.(N)}function A(N){let O=w.classList.contains("open");w.classList.toggle("open",N),w.setAttribute("aria-hidden",N?"false":"true"),N!==O&&E(N)}A(o),k.addEventListener("click",N=>{N.preventDefault(),N.stopPropagation(),A(!1)});let R=En({host:b,themes:i,initialTheme:s,onThemeChange:c}),M=Gn({resizer:v,host:b,panel:w,shadow:h,onWidthChange:r||(()=>{}),initialWidth:n,minWidth:f,maxWidth:g});M.setHudWidth(n);let U=d({applyTheme:R.applyTheme,initialTheme:s,getCurrentTheme:R.getCurrentTheme,setHUDWidth:M.setHudWidth,setHUDOpen:A}),J=new st(U,x,{applyTheme:R.applyTheme,getCurrentTheme:R.getCurrentTheme}),K=U.map(N=>({id:N.id,label:N.label})),_=Sr(K,l||K[0]?.id||"",N=>{J.activate(N),u?.(N)});_.root.style.flex="1 1 auto",_.root.style.minWidth="0",T.append(_.root,k),J.activate(l||K[0]?.id||"");let j=Nn({panel:w,onToggle:()=>A(!w.classList.contains("open")),onClose:()=>A(!1),toggleCombo:p,closeOnEscape:m}),H=()=>{_.recalc();let N=parseInt(getComputedStyle(b).getPropertyValue("--w"))||n;M.calculateResponsiveBounds(),M.setHudWidth(N)};P.addEventListener("resize",H);function D(){j.destroy(),M.destroy(),P.removeEventListener("resize",H)}return{host:b,shadow:h,wrapper:L,panel:w,content:x,setOpen:A,setWidth:M.setHudWidth,sections:U,manager:J,nav:_,destroy:D}}var Ye={isOpen:"gemini.hud.isOpen",width:"gemini.hud.width",theme:"gemini.hud.theme",activeTab:"gemini.hud.activeTab"},bt={isOpen:!1,width:480,theme:"dark",activeTab:"tab-settings"};function Vn(){return{isOpen:Ee(Ye.isOpen,bt.isOpen),width:Ee(Ye.width,bt.width),theme:Ee(Ye.theme,bt.theme),activeTab:Ee(Ye.activeTab,bt.activeTab)}}function Xe(e,t){lt(Ye[e],t)}var Yl="https://i.imgur.com/IMkhMur.png",Xl="Stats";function Qt(e){let t=e.iconUrl||Yl,n=e.ariaLabel||"Open MGH",o=null,r=null,a=null,i=!1,s=null,c=null,d=["Chat","Leaderboard","Stats","Open Activity Log"],l=T=>{try{return typeof CSS<"u"&&CSS&&typeof CSS.escape=="function"?CSS.escape(T):T.replace(/"/g,'\\"')}catch{return T}};function u(){let T=document.querySelector(d.map(v=>`button[aria-label="${l(v)}"]`).join(","));if(!T)return null;let x=T.parentElement;for(;x&&x!==document.body;){if(d.reduce((k,L)=>k+x.querySelectorAll(`button[aria-label="${l(L)}"]`).length,0)>=2)return x;x=x.parentElement}return null}function p(T){return T}function m(T){let x=Array.from(T.querySelectorAll("button[aria-label]"));if(!x.length)return{refBtn:null,refWrapper:null};let v=x.filter(U=>U.dataset.mghBtn!=="true"&&(U.getAttribute("aria-label")||"")!==(e.ariaLabel||"Open MGH")),k=v.length?v:x,L=k.find(U=>(U.getAttribute("aria-label")||"").toLowerCase()===Xl.toLowerCase())||null,E=k.length>=2?k.length-2:k.length-1,A=L||k[E],R=A.parentElement,M=R&&R.parentElement===T&&R.tagName==="DIV"?R:null;return{refBtn:A,refWrapper:M}}function f(T,x,v){let k=T.cloneNode(!1);k.type="button",k.setAttribute("aria-label",x),k.title=x,k.dataset.mghBtn="true",k.style.pointerEvents="auto",k.removeAttribute("id");let L=document.createElement("img");return L.src=v,L.alt="MGH",L.style.pointerEvents="none",L.style.userSelect="none",L.style.width="76%",L.style.height="76%",L.style.objectFit="contain",L.style.display="block",L.style.margin="auto",k.appendChild(L),k.addEventListener("click",E=>{E.preventDefault(),E.stopPropagation();try{e.onClick?.()}catch{}}),k}function g(){if(i)return!1;i=!0;let T=!1;try{let x=u();if(!x)return!1;s!==x&&(s=x);let{refBtn:v,refWrapper:k}=m(x);if(!v)return!1;r=x.querySelector('div[data-mgh-wrapper="true"]'),!r&&k&&(r=k.cloneNode(!1),r.dataset.mghWrapper="true",r.removeAttribute("id"),T=!0);let L=r?.querySelector('button[data-mgh-btn="true"]')||null;o||(o=L),o||(o=f(v,n,t),r?r.appendChild(o):o.parentElement!==x&&x.appendChild(o),T=!0),r&&r.parentElement!==x&&(x.appendChild(r),T=!0);let E=x;if(E&&E!==c){try{w.disconnect()}catch{}c=E,w.observe(c,{childList:!0,subtree:!0})}return T}finally{i=!1}}g();let b=document.getElementById("App")||document.body,h=null,w=new MutationObserver(T=>{let x=T.every(k=>{let L=Array.from(k.addedNodes||[]),E=Array.from(k.removedNodes||[]),A=L.concat(E);if(A.length===0){let R=k.target;return r&&(R===r||r.contains(R))||o&&(R===o||o.contains(R))}return A.every(R=>!!(!(R instanceof HTMLElement)||r&&(R===r||r.contains(R))||o&&(R===o||o.contains(R))))}),v=T.some(k=>Array.from(k.removedNodes||[]).some(L=>L instanceof HTMLElement?!!(r&&(L===r||r.contains(L))||o&&(L===o||o.contains(L))):!1));x&&!v||h===null&&(h=window.setTimeout(()=>{if(h=null,g()&&r){let L=r.parentElement;L&&L.lastElementChild!==r&&L.appendChild(r)}},150))});return w.observe(b,{childList:!0,subtree:!0}),a=()=>w.disconnect(),()=>{try{a?.()}catch{}try{r?.remove()}catch{}}}var tc={},ri=[];function Ql(){return ri.slice()}function Zl(e){ri.push(e)}function ai(e){try{return JSON.parse(e)}catch{return}}function ni(e){if(typeof e=="string"){let t=ai(e);return t!==void 0?t:e}return e}function ii(e){if(e!=null){if(typeof e=="string"){let t=ai(e);return t!==void 0?ii(t):e}if(Array.isArray(e)&&typeof e[0]=="string")return e[0];if(typeof e=="object"){let t=e;return t.type??t.Type??t.kind??t.messageType}}}function ec(e){let t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function B(e,t,n){let o=typeof t=="boolean"?t:!0,r=typeof t=="function"?t:n,a=(i,s)=>{if(ii(i)!==e)return;let d=r(i,s);return d&&typeof d=="object"&&"kind"in d?d:typeof d=="boolean"?d?void 0:{kind:"drop"}:o?void 0:{kind:"drop"}};return Zl(a),a}var ht=new WeakSet,oi=new WeakMap;function si(e){let t=e.pageWindow,n=!!e.debug,o=e.middlewares&&e.middlewares.length?e.middlewares:Ql();if(!o.length)return()=>{};let r=p=>({ws:p,pageWindow:t,debug:n}),a=(p,m)=>{let f=p;for(let g of o){let b=g(f,r(m));if(b){if(b.kind==="drop")return{kind:"drop"};b.kind==="replace"&&(f=b.message)}}return f!==p?{kind:"replace",message:f}:void 0},i=null,s=null,c=null,d=()=>{let p=t?.MagicCircle_RoomConnection,m=p?.sendMessage;if(!p||typeof m!="function")return!1;if(ht.has(m))return!0;let f=m.bind(p);function g(...b){let h=b.length===1?b[0]:b,w=ni(h),T=a(w,ec(t));if(T?.kind==="drop"){n&&console.log("[WS] drop outgoing (RoomConnection.sendMessage)",w);return}if(T?.kind==="replace"){let x=T.message;return b.length>1&&Array.isArray(x)?(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",w,"=>",x),f(...x)):(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",w,"=>",x),f(x))}return f(...b)}ht.add(g),oi.set(g,m);try{p.sendMessage=g,ht.add(p.sendMessage),n&&console.log("[WS] outgoing patched via MagicCircle_RoomConnection.sendMessage")}catch{return!1}return i=()=>{try{p.sendMessage===g&&(p.sendMessage=m)}catch{}},!0};(()=>{let p=t?.WebSocket?.prototype,m=p?.send;if(typeof m!="function"||ht.has(m))return;function f(g){let b=ni(g),h=a(b,this);if(h?.kind==="drop"){n&&console.log("[WS] drop outgoing (ws.send)",b);return}if(h?.kind==="replace"){let w=h.message,T=typeof w=="string"||w instanceof ArrayBuffer||w instanceof Blob?w:JSON.stringify(w);return n&&console.log("[WS] replace outgoing (ws.send)",b,"=>",w),m.call(this,T)}return m.call(this,g)}ht.add(f),oi.set(f,m);try{p.send=f,n&&console.log("[WS] outgoing patched via WebSocket.prototype.send")}catch{return}s=()=>{try{p.send===f&&(p.send=m)}catch{}}})();let u=e.waitForRoomConnectionMs??4e3;if(!d()&&u>0){let p=Date.now();c=setInterval(()=>{if(d()){clearInterval(c),c=null;return}Date.now()-p>u&&(clearInterval(c),c=null,n&&console.log("[WS] RoomConnection not found, only ws.send is patched"))},250)}return()=>{if(c){try{clearInterval(c)}catch{}c=null}if(i){try{i()}catch{}i=null}if(s){try{s()}catch{}s=null}}}(function(){try{let t=tc,n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();var ac={},ci=[];function nc(){return ci.slice()}function li(e){ci.push(e)}function oc(e){if(e!=null){if(typeof e=="object"){let t=e;if(typeof t.type=="string")return t.type;if(typeof t.Type=="string")return t.Type;if(typeof t.kind=="string")return t.kind;if(typeof t.messageType=="string")return t.messageType}if(Array.isArray(e)&&typeof e[0]=="string")return e[0]}}function rc(e){if(typeof e=="string")try{return JSON.parse(e)}catch{return e}return e}var Fn=Symbol.for("ariesmod.ws.handlers.patched");function te(e,t){if(typeof e=="string"){let r=e,a={match:i=>i.kind==="message"&&i.type===r,handle:t};return li(a),a}let n=e,o={match:r=>r.kind==="close"&&r.code===n,handle:t};return li(o),o}function ui(e,t=nc(),n={}){let o=n.pageWindow??window,r=!!n.debug;if(e[Fn])return()=>{};e[Fn]=!0;let a={ws:e,pageWindow:o,debug:r},i=u=>{for(let p of t)try{if(!p.match(u))continue;if(p.handle(u,a)===!0)return}catch(m){r&&console.error("[WS] handler error",m,u)}},s=u=>{let p=rc(u.data),m=oc(p);i({kind:"message",raw:u.data,data:p,type:m})},c=u=>{i({kind:"close",code:u.code,reason:u.reason,wasClean:u.wasClean,event:u})},d=u=>i({kind:"open",event:u}),l=u=>i({kind:"error",event:u});return e.addEventListener("message",s),e.addEventListener("close",c),e.addEventListener("open",d),e.addEventListener("error",l),()=>{try{e.removeEventListener("message",s)}catch{}try{e.removeEventListener("close",c)}catch{}try{e.removeEventListener("open",d)}catch{}try{e.removeEventListener("error",l)}catch{}try{delete e[Fn]}catch{}}}(function(){try{let t=ac,n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();te(4800,(e,t)=>{t.debug&&console.log("[WS][Close] Auth failure",e.code,e.reason)});te(4300,(e,t)=>{t.debug&&console.log("[WS][Close] Superseded",e.code,e.reason)});te(4400,(e,t)=>{t.debug&&console.log("[WS][Close] Heartbeat expired",e.code,e.reason)});te(4500,(e,t)=>{t.debug&&console.log("[WS][Close] Player kicked",e.code,e.reason)});te(4200,(e,t)=>{t.debug&&console.log("[WS][Close] Player left voluntarily",e.code,e.reason)});te(4100,(e,t)=>{t.debug&&console.log("[WS][Close] Reconnect initiated",e.code,e.reason)});te(4310,(e,t)=>{t.debug&&console.log("[WS][Close] Server disposed",e.code,e.reason)});te(4250,(e,t)=>{t.debug&&console.log("[WS][Close] User session superseded",e.code,e.reason)});te(4710,(e,t)=>{t.debug&&console.log("[WS][Close] Version expired",e.code,e.reason)});te(4700,(e,t)=>{t.debug&&console.log("[WS][Close] Version mismatch",e.code,e.reason)});te(we.Config,(e,t)=>{t.debug&&console.log("[WS][STC] Config",e.data)});te(we.CurrencyTransaction,(e,t)=>{t.debug&&console.log("[WS][STC] CurrencyTransaction",e.data)});te(we.Emote,(e,t)=>{t.debug&&console.log("[WS][STC] Emote",e.data)});te(we.InappropriateContentRejected,(e,t)=>{t.debug&&console.log("[WS][STC] InappropriateContentRejected",e.data)});te(we.PartialState,(e,t)=>{t.debug&&console.log("[WS][STC] PartialState",e.data)});te(we.Pong,(e,t)=>{t.debug&&console.log("[WS][STC] Pong",e.data)});te(we.ServerErrorMessage,(e,t)=>{t.debug&&console.log("[WS][STC] ServerErrorMessage",e.data)});te(we.Welcome,(e,t)=>{t.debug&&console.log("[WS][STC] Welcome",e.data)});B(C.PlantSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantSeed"),!!1));B(C.WaterPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] WaterPlant"),!!1));B(C.HarvestCrop,(e,t)=>(t.debug&&console.log("[MW][Garden] HarvestCrop"),!!1));B(C.SellAllCrops,(e,t)=>(t.debug&&console.log("[MW][Garden] SellAllCrops"),!!1));B(C.PurchaseSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseSeed"),!!1));B(C.PurchaseEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseEgg"),!!1));B(C.PurchaseTool,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseTool"),!!1));B(C.PurchaseDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseDecor"),!!1));B(C.PlantEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantEgg"),!!1));B(C.HatchEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] HatchEgg"),!!1));B(C.PlantGardenPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantGardenPlant"),!!1));B(C.PotPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PotPlant"),!!1));B(C.MutationPotion,(e,t)=>(t.debug&&console.log("[MW][Garden] MutationPotion"),!!1));B(C.PickupDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PickupDecor"),!!1));B(C.PlaceDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PlaceDecor"),!!1));B(C.RemoveGardenObject,(e,t)=>(t.debug&&console.log("[MW][Garden] RemoveGardenObject"),!!1));B(C.MoveInventoryItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveInventoryItem"),!!1));B(C.DropObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] DropObject"),!!1));B(C.PickupObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] PickupObject"),!!1));B(C.ToggleFavoriteItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] ToggleFavoriteItem"),!!1));B(C.PutItemInStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] PutItemInStorage"),!!1));B(C.RetrieveItemFromStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] RetrieveItemFromStorage"),!!1));B(C.MoveStorageItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveStorageItem"),!!1));B(C.LogItems,(e,t)=>(t.debug&&console.log("[MW][Inventory] LogItems"),!!1));B(C.PlacePet,(e,t)=>(t.debug&&console.log("[MW][Pets] PlacePet"),!!1));B(C.FeedPet,(e,t)=>(t.debug&&console.log("[MW][Pets] FeedPet"),!!1));B(C.PetPositions,(e,t)=>(t.debug&&console.log("[MW][Pets] PetPositions"),!!1));B(C.SwapPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SwapPet"),!!1));B(C.StorePet,(e,t)=>(t.debug&&console.log("[MW][Pets] StorePet"),!!1));B(C.NamePet,(e,t)=>(t.debug&&console.log("[MW][Pets] NamePet"),!!1));B(C.SellPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SellPet"),!!1));console.log("[WS] TESTTEST");B(C.SetSelectedGame,(e,t)=>(t.debug&&console.log("[MW][Session] SetSelectedGame"),!!1));B(C.VoteForGame,(e,t)=>(t.debug&&console.log("[MW][Session] VoteForGame"),!!1));B(C.RequestGame,(e,t)=>(t.debug&&console.log("[MW][Session] RequestGame"),!!1));B(C.RestartGame,(e,t)=>(t.debug&&console.log("[MW][Session] RestartGame"),!!1));B(C.Ping,(e,t)=>(t.debug&&console.log("[MW][Session] Ping"),!!1));B(C.PlayerPosition,(e,t)=>(t.debug&&console.log("[MW][Session] PlayerPosition"),!!1));B(C.Teleport,(e,t)=>(t.debug&&console.log("[MW][Session] Teleport"),!!1));B(C.CheckWeatherStatus,(e,t)=>(t.debug&&console.log("[MW][Session] CheckWeatherStatus"),!!1));B(C.Chat,(e,t)=>(t.debug&&console.log("[MW][Social] Chat"),!!1));B(C.Dev,(e,t)=>(t.debug&&console.log("[MW][Social] Dev"),!!1));B(C.Emote,(e,t)=>(t.debug&&console.log("[MW][Social] Emote"),!!1));B(C.Wish,(e,t)=>(t.debug&&console.log("[MW][Social] Wish"),!!1));B(C.KickPlayer,(e,t)=>(t.debug&&console.log("[MW][Social] KickPlayer"),!!1));B(C.ReportSpeakingStart,(e,t)=>(t.debug&&console.log("[MW][Voice] ReportSpeakingStart"),!!1));B(C.SetPlayerData,(e,t)=>(t.debug&&console.log("[MW][Social] SetPlayerData"),!!1));B(C.UsurpHost,(e,t)=>(t.debug&&console.log("[MW][Social] UsurpHost"),!!1));function ic(e={}){let t=e.pageWindow??P,n=e.pollMs??500,o=!!e.debug,r=[];r.push(Fr(t,{debug:o})),r.push(si({pageWindow:t,middlewares:e.middlewares,debug:o}));let a=null,i=s=>{if(a){try{a()}catch{}a=null}s&&(a=ui(s,e.handlers,{debug:o,pageWindow:t}))};return i(gt(t).ws),r.push(Jt(s=>i(s.ws),{intervalMs:n,debug:o,pageWindow:t})),{getWs:()=>gt(t).ws,dispose:()=>{for(let s=r.length-1;s>=0;s--)try{r[s]()}catch{}if(a){try{a()}catch{}a=null}}}}var Zt=null;function di(e={}){return Zt||(Zt=ic(e),Zt)}Ce();var yt=null;function sc(){return P?.document??(typeof document<"u"?document:null)}function zn(e){if(yt!==null)return;let t=e??sc();if(!t)return;let n=t.scripts;for(let o=0;o<n.length;o++){let a=n.item(o)?.src;if(!a)continue;let i=a.match(/\/(?:r\/\d+\/)?version\/([^/]+)/);if(i?.[1]){yt=i[1];return}}}function lc(){return zn(),yt}async function cc(e=15e3){let t=performance.now();for(;performance.now()-t<e;){if(zn(),yt)return yt;await Pe(50)}throw new Error("MGVersion timeout (gameVersion not found)")}var xt={init:zn,get:lc,wait:cc};var mi=P?.location?.origin||"https://magicgarden.gg";function fi(){return typeof GM_xmlhttpRequest=="function"}function gi(e,t="text"){return new Promise((n,o)=>{GM_xmlhttpRequest({method:"GET",url:e,responseType:t,onload:r=>r.status>=200&&r.status<300?n(r):o(new Error(`HTTP ${r.status} for ${e}`)),onerror:()=>o(new Error(`Network error for ${e}`)),ontimeout:()=>o(new Error(`Timeout for ${e}`))})})}async function Qe(e){if(fi())return JSON.parse((await gi(e,"text")).responseText);let t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.json()}async function tn(e){if(fi())return(await gi(e,"blob")).response;let t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.blob()}function bi(e){return new Promise((t,n)=>{let o=URL.createObjectURL(e),r=P?.Image||Image,a=new r;a.decoding="async",a.onload=()=>{URL.revokeObjectURL(o),t(a)},a.onerror=()=>{URL.revokeObjectURL(o),n(new Error("Image decode failed"))},a.src=o})}var de=(e,t)=>e.replace(/\/?$/,"/")+String(t||"").replace(/^\//,""),uc=e=>e.lastIndexOf("/")>=0?e.slice(0,e.lastIndexOf("/")+1):"",$n=(e,t)=>String(t||"").startsWith("/")?String(t).slice(1):uc(e)+String(t||"");var nn=null,on=null;async function hi(){return on||nn||(nn=(async()=>{let e=await xt.wait(15e3);return on=`${mi}/version/${e}/assets/`,on})(),nn)}async function dc(e){let t=await hi();return de(t,e)}var ye={base:hi,url:dc};var Kn=new Map;async function pc(e){let t=e||await ye.base();if(Kn.has(t))return Kn.get(t);let n=Qe(de(t,"manifest.json"));return Kn.set(t,n),n}function mc(e,t){return e?.bundles?.find(n=>n?.name===t)||null}function fc(e){let t=new Set;for(let n of e?.assets||[])for(let o of n?.src||[])typeof o=="string"&&o.endsWith(".json")&&o!=="manifest.json"&&t.add(o);return Array.from(t)}var me={load:pc,getBundle:mc,listJsonFromBundle:fc};Ce();Ce();Ce();var yi=Function.prototype.bind,Y={_bindPatched:!1,engine:null,tos:null,app:null,renderer:null,ticker:null,stage:null},xi,vi,wi,gc=new Promise(e=>{xi=e}),bc=new Promise(e=>{vi=e}),hc=new Promise(e=>{wi=e});function yc(e){return!!(e&&typeof e=="object"&&typeof e.start=="function"&&typeof e.destroy=="function"&&e.app&&e.app.stage&&e.app.renderer&&e.systems&&typeof e.systems.values=="function")}function xc(e){try{for(let t of e.systems.values()){let n=t?.system;if(n?.name==="tileObject")return n}}catch{}return null}function vc(e){Y.engine=e,Y.tos=xc(e)||null,Y.app=e.app||null,Y.renderer=e.app?.renderer||null,Y.ticker=e.app?.ticker||null,Y.stage=e.app?.stage||null;try{xi(e)}catch{}try{Y.app&&vi(Y.app)}catch{}try{Y.renderer&&wi(Y.renderer)}catch{}}function qn(){return Y.engine?!0:(Y._bindPatched||(Y._bindPatched=!0,Function.prototype.bind=function(e,...t){let n=yi.call(this,e,...t);try{!Y.engine&&yc(e)&&(Function.prototype.bind=yi,Y._bindPatched=!1,vc(e))}catch{}return n}),!1)}qn();async function wc(e=15e3){let t=performance.now();for(;performance.now()-t<e;){if(Y.engine)return!0;qn(),await Pe(50)}throw new Error("MGPixiHooks: engine capture timeout")}async function Sc(e=15e3){return Y.engine||await wc(e),!0}function kc(){return Y.engine&&Y.app?{ok:!0,engine:Y.engine,tos:Y.tos,app:Y.app}:(qn(),{ok:!1,engine:Y.engine,tos:Y.tos,app:Y.app,note:"Not captured. Wait for room, or reload."})}var ie={engineReady:gc,appReady:bc,rendererReady:hc,engine:()=>Y.engine,tos:()=>Y.tos,app:()=>Y.app,renderer:()=>Y.renderer,ticker:()=>Y.ticker,stage:()=>Y.stage,PIXI:()=>P.PIXI||null,init:Sc,hook:kc,ready:()=>!!Y.engine};function vt(e){let t=String(e||"").trim();return t?t.startsWith("sprite/")||t.startsWith("sprites/")?t:t.includes("/")?`sprite/${t}`:t:""}function Ze(e,t){let n=String(e||"").trim().replace(/^sprites?\//,"").replace(/^\/+|\/+$/g,""),o=String(t||"").trim();return o.includes("/")||!n?vt(o):`sprite/${n}/${o}`}function et(e,t,n,o){let r=Ze(e,t);if(n.has(r)||o.has(r))return r;let a=String(t||"").trim();if(n.has(a)||o.has(a))return a;let i=vt(a);return n.has(i)||o.has(i)?i:r}function Tc(e,t,n=25e3){let o=[e],r=new Set,a=0;for(;o.length&&a++<n;){let i=o.pop();if(!i||r.has(i))continue;if(r.add(i),t(i))return i;let s=i.children;if(Array.isArray(s))for(let c=s.length-1;c>=0;c--)o.push(s[c])}return null}function Ac(e){let t=P.PIXI;if(t?.Texture&&t?.Sprite&&t?.Container&&t?.Rectangle)return{Container:t.Container,Sprite:t.Sprite,Texture:t.Texture,Rectangle:t.Rectangle,AnimatedSprite:t.AnimatedSprite||null};let n=e?.stage,o=Tc(n,r=>r?.texture?.frame&&r?.constructor&&r?.texture?.constructor&&r?.texture?.frame?.constructor);if(!o)throw new Error("No Sprite found yet (constructors).");return{Container:n.constructor,Sprite:o.constructor,Texture:o.texture.constructor,Rectangle:o.texture.frame.constructor,AnimatedSprite:t?.AnimatedSprite||null}}async function Si(e,t=15e3){let{sleep:n}=await Promise.resolve().then(()=>(Ce(),pi)),o=performance.now();for(;performance.now()-o<t;)try{return Ac(e)}catch{await n(50)}throw new Error("Constructors timeout")}var De=(...e)=>{try{console.log("[MGSprite]",...e)}catch{}};function Pc(e){return e&&typeof e=="object"&&e.frames&&e.meta&&typeof e.meta.image=="string"}function Jn(e,t,n,o,r){return new e(t,n,o,r)}function Cc(e,t,n,o,r,a,i){let s;try{s=new e({source:t.source,frame:n,orig:o,trim:r||void 0,rotate:a||0})}catch{s=new e(t.baseTexture||t,n,o,r||void 0,a||0)}if(i)if(s.defaultAnchor?.set)try{s.defaultAnchor.set(i.x,i.y)}catch{}else s.defaultAnchor?(s.defaultAnchor.x=i.x,s.defaultAnchor.y=i.y):s.defaultAnchor={x:i.x,y:i.y};try{s.updateUvs?.()}catch{}return s}function Mc(e,t,n,o){let{Texture:r,Rectangle:a}=o;for(let[i,s]of Object.entries(e.frames)){let c=s.frame,d=!!s.rotated,l=d?2:0,u=d?c.h:c.w,p=d?c.w:c.h,m=Jn(a,c.x,c.y,u,p),f=s.sourceSize||{w:c.w,h:c.h},g=Jn(a,0,0,f.w,f.h),b=null;if(s.trimmed&&s.spriteSourceSize){let h=s.spriteSourceSize;b=Jn(a,h.x,h.y,h.w,h.h)}n.set(i,Cc(r,t,m,g,b,l,s.anchor||null))}}function Ic(e,t,n){if(!(!e.animations||typeof e.animations!="object"))for(let[o,r]of Object.entries(e.animations)){if(!Array.isArray(r))continue;let a=r.map(i=>t.get(i)).filter(Boolean);a.length>=2&&n.set(o,a)}}function Ec(e,t){let n=(o,r)=>{let a=String(o||"").trim(),i=String(r||"").trim();!a||!i||(t.has(a)||t.set(a,new Set),t.get(a).add(i))};for(let o of Object.keys(e.frames||{})){let r=/^sprite\/([^/]+)\/(.+)$/.exec(o);r&&n(r[1],r[2])}}async function ki(e,t){let n=await me.load(e),o=me.getBundle(n,"default");if(!o)throw new Error("No default bundle in manifest");let r=me.listJsonFromBundle(o),a=new Set,i=new Map,s=new Map,c=new Map;async function d(l){if(a.has(l))return;a.add(l);let u=await Qe(de(e,l));if(!Pc(u))return;let p=u.meta?.related_multi_packs;if(Array.isArray(p))for(let b of p)await d($n(l,b));let m=$n(l,u.meta.image),f=await bi(await tn(de(e,m))),g=t.Texture.from(f);Mc(u,g,i,t),Ic(u,i,s),Ec(u,c)}for(let l of r)await d(l);return{textures:i,animations:s,categoryIndex:c}}var Ti={enabled:!0,maxEntries:1200,maxCost:5e3,srcCanvasMax:450};function Ai(){return{lru:new Map,cost:0,srcCanvas:new Map}}function Yn(e,t){return`${t.sig}::${e}`}function Pi(e){return e?e.isAnim?e.frames?.length||0:e.tex?1:0:0}function Lc(e,t,n){e.lru.delete(t),e.lru.set(t,n)}function Rc(e,t){if(t.enabled)for(;e.lru.size>t.maxEntries||e.cost>t.maxCost;){let n=e.lru.keys().next().value;if(n===void 0)break;let o=e.lru.get(n);e.lru.delete(n),e.cost=Math.max(0,e.cost-Pi(o??null))}}function Xn(e,t){let n=e.lru.get(t);return n?(Lc(e,t,n),n):null}function Qn(e,t,n,o){e.lru.set(t,n),e.cost+=Pi(n),Rc(e,o)}function Ci(e){e.lru.clear(),e.cost=0,e.srcCanvas.clear()}function Mi(e,t){return e.srcCanvas.get(t)??null}function Ii(e,t,n,o){if(e.srcCanvas.set(t,n),e.srcCanvas.size>o.srcCanvasMax){let r=e.srcCanvas.keys().next().value;r!==void 0&&e.srcCanvas.delete(r)}}function Oc(){return{ready:!1,app:null,renderer:null,ctors:null,baseUrl:null,textures:new Map,animations:new Map,live:new Set,defaultParent:null,overlay:null,categoryIndex:null}}var rn=null,re=Oc(),Dc=Ai(),Hc={...Ti};function se(){return re}function tt(){return Dc}function wt(){return Hc}function Zn(){return re.ready}async function Ei(){return re.ready?!0:rn||(rn=(async()=>{let e=performance.now();De("init start");let t=await en(ie.appReady,15e3,"PIXI app");De("app ready");let n=await en(ie.rendererReady,15e3,"PIXI renderer");De("renderer ready"),re.app=t,re.renderer=n||t?.renderer||null,re.ctors=await Si(t),De("constructors resolved"),re.baseUrl=await ye.base(),De("base url",re.baseUrl);let{textures:o,animations:r,categoryIndex:a}=await ki(re.baseUrl,re.ctors);return re.textures=o,re.animations=r,re.categoryIndex=a,De("atlases loaded","textures",re.textures.size,"animations",re.animations.size,"categories",re.categoryIndex?.size??0),re.ready=!0,De("ready in",Math.round(performance.now()-e),"ms"),!0})(),rn)}var Be={Gold:{overlayTall:null,tallIconOverride:null},Rainbow:{overlayTall:null,tallIconOverride:null,angle:130,angleTall:0},Wet:{overlayTall:"sprite/mutation-overlay/WetTallPlant",tallIconOverride:"sprite/mutation/Puddle"},Chilled:{overlayTall:"sprite/mutation-overlay/ChilledTallPlant",tallIconOverride:null},Frozen:{overlayTall:"sprite/mutation-overlay/FrozenTallPlant",tallIconOverride:null},Dawnlit:{overlayTall:null,tallIconOverride:null},Ambershine:{overlayTall:null,tallIconOverride:null},Dawncharged:{overlayTall:null,tallIconOverride:null},Ambercharged:{overlayTall:null,tallIconOverride:null}},Ri=Object.keys(Be),Gc=["Gold","Rainbow","Wet","Chilled","Frozen","Ambershine","Dawnlit","Dawncharged","Ambercharged"],Li=new Map(Gc.map((e,t)=>[e,t]));function an(e){return[...new Set(e.filter(Boolean))].sort((n,o)=>(Li.get(n)??1/0)-(Li.get(o)??1/0))}var Nc=["Wet","Chilled","Frozen"];var Oi=new Set(["Dawnlit","Ambershine","Dawncharged","Ambercharged"]),Di={Banana:.6,Carrot:.6,Sunflower:.5,Starweaver:.5,FavaBean:.25,BurrosTail:.2},Hi={Pepper:.5,Banana:.6},Gi=256,Ni=.5,_i=2;function eo(e){if(!e.length)return{muts:[],overlayMuts:[],selectedMuts:[],sig:""};let t=an(e),n=_c(e),o=Wc(e);return{muts:n,overlayMuts:o,selectedMuts:t,sig:`${t.join(",")}|${n.join(",")}|${o.join(",")}`}}function _c(e){let t=e.filter((r,a,i)=>Be[r]&&i.indexOf(r)===a);if(!t.length)return[];if(t.includes("Gold"))return["Gold"];if(t.includes("Rainbow"))return["Rainbow"];let n=["Ambershine","Dawnlit","Dawncharged","Ambercharged"];return t.some(r=>n.includes(r))?an(t.filter(r=>!Nc.includes(r))):an(t)}function Wc(e){let t=e.filter((n,o,r)=>Be[n]?.overlayTall&&r.indexOf(n)===o);return an(t)}function sn(e,t){return e.map(n=>({name:n,meta:Be[n],overlayTall:Be[n]?.overlayTall??null,isTall:t}))}var jc={Gold:{op:"source-atop",colors:["rgb(235,200,0)"],a:.7},Rainbow:{op:"color",colors:["#FF1744","#FF9100","#FFEA00","#00E676","#2979FF","#D500F9"],ang:130,angTall:0,masked:!0},Wet:{op:"source-atop",colors:["rgb(50,180,200)"],a:.25},Chilled:{op:"source-atop",colors:["rgb(100,160,210)"],a:.45},Frozen:{op:"source-atop",colors:["rgb(100,130,220)"],a:.5},Dawnlit:{op:"source-atop",colors:["rgb(209,70,231)"],a:.5},Ambershine:{op:"source-atop",colors:["rgb(190,100,40)"],a:.5},Dawncharged:{op:"source-atop",colors:["rgb(140,80,200)"],a:.5},Ambercharged:{op:"source-atop",colors:["rgb(170,60,25)"],a:.5}};var ln=(()=>{try{let t=document.createElement("canvas").getContext("2d");if(!t)return new Set;let n=["color","hue","saturation","luminosity","overlay","screen","lighter","source-atop"],o=new Set;for(let r of n)t.globalCompositeOperation=r,t.globalCompositeOperation===r&&o.add(r);return o}catch{return new Set}})();function Bc(e){return ln.has(e)?e:ln.has("overlay")?"overlay":ln.has("screen")?"screen":ln.has("lighter")?"lighter":"source-atop"}function Vc(e,t,n,o,r=!1){let a=(o-90)*Math.PI/180,i=t/2,s=n/2;if(!r){let u=Math.min(t,n)/2;return e.createLinearGradient(i-Math.cos(a)*u,s-Math.sin(a)*u,i+Math.cos(a)*u,s+Math.sin(a)*u)}let c=Math.cos(a),d=Math.sin(a),l=Math.abs(c)*t/2+Math.abs(d)*n/2;return e.createLinearGradient(i-c*l,s-d*l,i+c*l,s+d*l)}function Wi(e,t,n,o,r=!1){let a=o.colors?.length?o.colors:["#fff"],i=o.ang!=null?Vc(e,t,n,o.ang,r):e.createLinearGradient(0,0,0,n);a.length===1?(i.addColorStop(0,a[0]),i.addColorStop(1,a[0])):a.forEach((s,c)=>i.addColorStop(c/(a.length-1),s)),e.fillStyle=i,e.fillRect(0,0,t,n)}function ji(e,t,n,o){let r=jc[n];if(!r)return;let a={...r};n==="Rainbow"&&o&&a.angTall!=null&&(a.ang=a.angTall);let i=n==="Rainbow"&&o,s=t.width,c=t.height;e.save();let d=a.masked?Bc(a.op):"source-in";if(e.globalCompositeOperation=d,a.a!=null&&(e.globalAlpha=a.a),a.masked){let l=document.createElement("canvas");l.width=s,l.height=c;let u=l.getContext("2d");u.imageSmoothingEnabled=!1,Wi(u,s,c,a,i),u.globalCompositeOperation="destination-in",u.drawImage(t,0,0),e.drawImage(l,0,0)}else Wi(e,s,c,a,i);e.restore()}function Bi(e){return/tallplant/i.test(e)}function cn(e){let t=String(e||"").split("/");return t[t.length-1]||""}function Vi(e){switch(e){case"Ambershine":return["Ambershine","Amberlit"];case"Dawncharged":return["Dawncharged","Dawnbound"];case"Ambercharged":return["Ambercharged","Amberbound"];default:return[e]}}function Fc(e,t){let n=String(e||"").toLowerCase();for(let o of t.keys()){let r=/sprite\/mutation-overlay\/([A-Za-z0-9]+)TallPlant/i.exec(String(o));if(!r||!r[1])continue;if(r[1].toLowerCase()===n){let i=t.get(o);if(i)return{tex:i,key:o}}}return null}function Fi(e,t,n,o){if(!t)return null;let r=cn(e),a=Vi(t);for(let i of a){let s=[`sprite/mutation/${i}${r}`,`sprite/mutation/${i}-${r}`,`sprite/mutation/${i}_${r}`,`sprite/mutation/${i}/${r}`,`sprite/mutation/${i}`];for(let c of s){let d=n.get(c);if(d)return{tex:d,key:c}}if(o){let c=`sprite/mutation-overlay/${i}TallPlant`,d=n.get(c);if(d)return{tex:d,key:c};let l=`sprite/mutation-overlay/${i}`,u=n.get(l);if(u)return{tex:u,key:l};let p=Fc(t,n);if(p)return p}}return null}function Ui(e,t,n,o){if(!t)return null;let r=Be[t];if(n&&r?.tallIconOverride){let s=o.get(r.tallIconOverride);if(s)return s}let a=cn(e),i=Vi(t);for(let s of i){let c=[`sprite/mutation/${s}Icon`,`sprite/mutation/${s}`,`sprite/mutation/${s}${a}`,`sprite/mutation/${s}-${a}`,`sprite/mutation/${s}_${a}`,`sprite/mutation/${s}/${a}`];for(let d of c){let l=o.get(d);if(l)return l}if(n){let d=`sprite/mutation-overlay/${s}TallPlantIcon`,l=o.get(d);if(l)return l;let u=`sprite/mutation-overlay/${s}TallPlant`,p=o.get(u);if(p)return p}}return null}function zi(e,t,n){let o=e?.orig?.width??e?.frame?.width??e?.width??1,r=e?.orig?.height??e?.frame?.height??e?.height??1,a=e?.defaultAnchor?.x??0,i=e?.defaultAnchor?.y??0,s=Hi[t]??a,c=r>o*1.5,d=Di[t]??(c?i:.4),l={x:(s-a)*o,y:(d-i)*r},u=Math.min(o,r),p=Math.min(1.5,u/Gi),m=Ni*p;return n&&(m*=_i),{width:o,height:r,anchorX:a,anchorY:i,offset:l,iconScale:m}}function to(e,t,n,o,r){let a=Mi(o,e);if(a)return a;let i=null;try{if(t?.extract?.canvas){let s=new n.Sprite(e);i=t.extract.canvas(s),s.destroy?.({children:!0,texture:!1,baseTexture:!1})}}catch{}if(!i){let s=e?.frame||e?._frame,c=e?.orig||e?._orig,d=e?.trim||e?._trim,l=e?.rotate||e?._rotate||0,u=e?.baseTexture?.resource?.source||e?.baseTexture?.resource||e?.source?.resource?.source||e?.source?.resource||e?._source?.resource?.source||null;if(!s||!u)throw new Error("textureToCanvas fail");i=document.createElement("canvas");let p=Math.max(1,(c?.width??s.width)|0),m=Math.max(1,(c?.height??s.height)|0),f=d?.x??0,g=d?.y??0;i.width=p,i.height=m;let b=i.getContext("2d");b.imageSmoothingEnabled=!1,l===!0||l===2||l===8?(b.save(),b.translate(f+s.height/2,g+s.width/2),b.rotate(-Math.PI/2),b.drawImage(u,s.x,s.y,s.width,s.height,-s.width/2,-s.height/2,s.width,s.height),b.restore()):b.drawImage(u,s.x,s.y,s.width,s.height,f,g,s.width,s.height)}return Ii(o,e,i,r),i}function Uc(e,t,n,o,r,a,i,s){let{w:c,h:d,aX:l,aY:u,basePos:p}=t,m=[];for(let f of n){let g=new o.Sprite(e);g.anchor?.set?.(l,u),g.position.set(p.x,p.y),g.zIndex=1;let b=document.createElement("canvas");b.width=c,b.height=d;let h=b.getContext("2d");h.imageSmoothingEnabled=!1,h.save(),h.translate(c*l,d*u),h.drawImage(to(e,r,o,a,i),-c*l,-d*u),h.restore(),ji(h,b,f.name,f.isTall);let w=o.Texture.from(b);s.push(w),g.texture=w,m.push(g)}return m}function zc(e,t,n,o,r,a,i,s,c,d){let{aX:l,basePos:u}=t,p=[];for(let m of n){let f=m.overlayTall&&o.get(m.overlayTall)&&{tex:o.get(m.overlayTall),key:m.overlayTall}||Fi(e,m.name,o,!0);if(!f?.tex)continue;let g=to(f.tex,a,r,i,s);if(!g)continue;let b=g.width,h={x:0,y:0},w={x:u.x-l*b,y:0},T=document.createElement("canvas");T.width=b,T.height=g.height;let x=T.getContext("2d");if(!x)continue;x.imageSmoothingEnabled=!1,x.drawImage(g,0,0),x.globalCompositeOperation="destination-in",x.drawImage(c,-w.x,-w.y);let v=r.Texture.from(T);d.push(v);let k=new r.Sprite(v);k.anchor?.set?.(h.x,h.y),k.position.set(w.x,w.y),k.scale.set(1),k.alpha=1,k.zIndex=3,p.push(k)}return p}function $c(e,t,n,o,r,a){let{basePos:i}=t,s=[];for(let c of n){if(c.name==="Gold"||c.name==="Rainbow")continue;let d=Ui(e,c.name,c.isTall,o);if(!d)continue;let l=new r.Sprite(d),u=d?.defaultAnchor?.x??.5,p=d?.defaultAnchor?.y??.5;l.anchor?.set?.(u,p),l.position.set(i.x+a.offset.x,i.y+a.offset.y),l.scale.set(a.iconScale),c.isTall&&(l.zIndex=-1),Oi.has(c.name)&&(l.zIndex=10),l.zIndex||(l.zIndex=2),s.push(l)}return s}function no(e,t,n,o){try{if(!e||!o.renderer||!o.ctors?.Container||!o.ctors?.Sprite||!o.ctors?.Texture)return null;let{Container:r,Sprite:a,Texture:i}=o.ctors,s=e?.orig?.width??e?.frame?.width??e?.width??1,c=e?.orig?.height??e?.frame?.height??e?.height??1,d=e?.defaultAnchor?.x??.5,l=e?.defaultAnchor?.y??.5,u={x:s*d,y:c*l},p=to(e,o.renderer,o.ctors,o.cacheState,o.cacheConfig),m=new r;m.sortableChildren=!0;let f=new a(e);f.anchor?.set?.(d,l),f.position.set(u.x,u.y),f.zIndex=0,m.addChild(f);let g=Bi(t),b=sn(n.muts,g),h=sn(n.overlayMuts,g),w=sn(n.selectedMuts,g),T=[],x={w:s,h:c,aX:d,aY:l,basePos:u},v=cn(t),k=zi(e,v,g);Uc(e,x,b,o.ctors,o.renderer,o.cacheState,o.cacheConfig,T).forEach(M=>m.addChild(M)),g&&zc(t,x,h,o.textures,o.ctors,o.renderer,o.cacheState,o.cacheConfig,p,T).forEach(U=>m.addChild(U)),$c(t,x,w,o.textures,o.ctors,k).forEach(M=>m.addChild(M));let A=null;if(typeof o.renderer.generateTexture=="function"?A=o.renderer.generateTexture(m,{resolution:1}):o.renderer.textureGenerator?.generateTexture&&(A=o.renderer.textureGenerator.generateTexture({target:m,resolution:1})),!A)throw new Error("no render texture");let R=A instanceof i?A:i.from(o.renderer.extract.canvas(A));A&&A!==R&&A.destroy?.(!0),m.destroy({children:!0,texture:!1,baseTexture:!1});try{R.__mg_gen=!0,R.label=`${t}|${n.sig}`}catch{}return R}catch{return null}}function $i(e,t,n,o){if(!e||e.length<2)return null;let r=[];for(let a of e){let i=no(a,t,n,o);i&&r.push(i)}return r.length>=2?r:null}function Kc(e){if(e.overlay)return e.overlay;let t=new e.ctors.Container;t.sortableChildren=!0,t.zIndex=99999999;try{e.app.stage.sortableChildren=!0}catch{}return e.app.stage.addChild(t),e.overlay=t,t}function qc(e){let t=e.defaultParent;if(!t)return null;try{return typeof t=="function"?t():t}catch{return null}}function Ki(e,t,n,o,r,a){if(!n.length)return t;let i=eo(n);if(!i.sig)return t;let s=Yn(e,i),c=Xn(r,s);if(c?.tex)return c.tex;let d=no(t,e,i,{renderer:o.renderer,ctors:o.ctors,textures:o.textures,cacheState:r,cacheConfig:a});return d?(Qn(r,s,{isAnim:!1,tex:d},a),d):t}function qi(e,t,n,o,r,a){if(!n.length)return t;let i=eo(n);if(!i.sig)return t;let s=Yn(e,i),c=Xn(r,s);if(c?.isAnim&&c.frames?.length)return c.frames;let d=$i(t,e,i,{renderer:o.renderer,ctors:o.ctors,textures:o.textures,cacheState:r,cacheConfig:a});return d?(Qn(r,s,{isAnim:!0,frames:d},a),d):t}function oo(e,t,n,o,r,a={}){if(!e.ready)throw new Error("MGSprite not ready yet");let i=et(o,r,e.textures,e.animations),s=a.mutations||[],c=a.parent||qc(e)||Kc(e),d=e.renderer?.width||e.renderer?.view?.width||innerWidth,l=e.renderer?.height||e.renderer?.view?.height||innerHeight,u=a.center?d/2:a.x??d/2,p=a.center?l/2:a.y??l/2,m,f=e.animations.get(i);if(f&&f.length>=2){let h=qi(i,f,s,e,t,n),w=e.ctors.AnimatedSprite;if(w)m=new w(h),m.animationSpeed=a.fps?a.fps/60:a.speed??.15,m.loop=a.loop??!0,m.play();else{let T=new e.ctors.Sprite(h[0]),v=1e3/Math.max(1,a.fps||8),k=0,L=0,E=A=>{let R=e.app.ticker?.deltaMS??A*16.666666666666668;if(k+=R,k<v)return;let M=k/v|0;k%=v,L=(L+M)%h.length,T.texture=h[L]};T.__mgTick=E,e.app.ticker?.add?.(E),m=T}}else{let h=e.textures.get(i);if(!h)throw new Error(`Unknown sprite/anim key: ${i}`);let w=Ki(i,h,s,e,t,n);m=new e.ctors.Sprite(w)}let g=a.anchorX??m.texture?.defaultAnchor?.x??.5,b=a.anchorY??m.texture?.defaultAnchor?.y??.5;return m.anchor?.set?.(g,b),m.position.set(u,p),m.scale.set(a.scale??1),m.alpha=a.alpha??1,m.rotation=a.rotation??0,m.zIndex=a.zIndex??999999,c.addChild(m),e.live.add(m),m.__mgDestroy=()=>{try{m.__mgTick&&e.app.ticker?.remove?.(m.__mgTick)}catch{}try{m.destroy?.({children:!0,texture:!1,baseTexture:!1})}catch{try{m.destroy?.()}catch{}}e.live.delete(m)},m}function Jc(e,t){let n=e.renderer;if(n?.extract?.canvas)return n.extract.canvas(t);if(n?.plugins?.extract?.canvas)return n.plugins.extract.canvas(t);throw new Error("No extract.canvas available on renderer")}function ro(e,t,n,o,r,a={}){if(!e.ready)throw new Error("MGSprite not ready yet");let i=et(o,r,e.textures,e.animations),s=a.mutations||[],c=e.animations.get(i),d=Math.max(0,(a.frameIndex??0)|0),l;if(c?.length){let w=qi(i,c,s,e,t,n);l=w[d%w.length]}else{let w=e.textures.get(i);if(!w)throw new Error(`Unknown sprite/anim key: ${i}`);l=Ki(i,w,s,e,t,n)}let u=new e.ctors.Sprite(l),p=a.anchorX??u.texture?.defaultAnchor?.x??.5,m=a.anchorY??u.texture?.defaultAnchor?.y??.5;u.anchor?.set?.(p,m),u.scale.set(a.scale??1);let f=a.pad??2,g=new e.ctors.Container;g.addChild(u);try{g.updateTransform?.()}catch{}let b=u.getBounds?.(!0)||{x:0,y:0,width:u.width,height:u.height};u.position.set(-b.x+f,-b.y+f);let h=Jc(e,g);try{g.destroy?.({children:!0})}catch{}return h}function Ji(e){for(let t of Array.from(e.live))t.__mgDestroy?.()}function Yi(e,t){return e.defaultParent=t,!0}function Xi(e,t){return e.defaultParent=t,!0}function nt(){if(!Zn())throw new Error("MGSprite not ready yet")}function Yc(e,t,n){return typeof t=="string"?oo(se(),tt(),wt(),e,t,n||{}):oo(se(),tt(),wt(),null,e,t||{})}function Xc(e,t,n){return typeof t=="string"?ro(se(),tt(),wt(),e,t,n||{}):ro(se(),tt(),wt(),null,e,t||{})}function Qc(){Ji(se())}function Zc(e){return Yi(se(),e)}function eu(e){return Xi(se(),e)}function tu(e,t){let n=se(),o=typeof t=="string"?et(e,t,n.textures,n.animations):et(null,e,n.textures,n.animations);return n.textures.has(o)||n.animations.has(o)}function nu(){nt();let e=se().categoryIndex;return e?Array.from(e.keys()).sort((t,n)=>t.localeCompare(n)):[]}function ou(e){nt();let t=String(e||"").trim();if(!t)return[];let n=se().categoryIndex;return n?Array.from(n.get(t)?.values()||[]).sort((o,r)=>o.localeCompare(r)):[]}function ru(e,t){nt();let n=String(e||"").trim(),o=String(t||"").trim();if(!n||!o)return!1;let r=se().categoryIndex;if(!r)return!1;let a=n.toLowerCase(),i=o.toLowerCase();for(let[s,c]of r.entries())if(s.toLowerCase()===a){for(let d of c.values())if(d.toLowerCase()===i)return!0}return!1}function au(e){nt();let t=se().categoryIndex;if(!t)return[];let n=String(e||"").trim().toLowerCase(),o=[];for(let[r,a]of t.entries())for(let i of a.values()){let s=Ze(r,i);(!n||s.toLowerCase().startsWith(n))&&o.push(s)}return o.sort((r,a)=>r.localeCompare(a))}function iu(e){nt();let t=String(e||"").trim();if(!t)return null;let n=vt(t),o=/^sprite\/([^/]+)\/(.+)$/.exec(n);if(!o)return null;let r=o[1],a=o[2],i=se().categoryIndex,s=r.toLowerCase(),c=a.toLowerCase(),d=r,l=a;if(i){let u=Array.from(i.keys()).find(f=>f.toLowerCase()===s);if(!u)return null;d=u;let p=i.get(u);if(!p)return null;let m=Array.from(p.values()).find(f=>f.toLowerCase()===c);if(!m)return null;l=m}return{category:d,id:l,key:Ze(d,l)}}function su(e,t){nt();let n=String(e||"").trim(),o=String(t||"").trim();if(!n||!o)throw new Error("getIdPath(category, id) requires both category and id");let r=se().categoryIndex;if(!r)throw new Error("Sprite categories not indexed");let a=n.toLowerCase(),i=o.toLowerCase(),s=Array.from(r.keys()).find(l=>l.toLowerCase()===a)||n,c=r.get(s);if(!c)throw new Error(`Unknown sprite category: ${n}`);let d=Array.from(c.values()).find(l=>l.toLowerCase()===i)||o;if(!c.has(d))throw new Error(`Unknown sprite id: ${n}/${o}`);return Ze(s,d)}function lu(){Ci(tt())}function cu(){return[...Ri]}var Se={init:Ei,ready:Zn,show:Yc,toCanvas:Xc,clear:Qc,attach:Zc,attachProvider:eu,has:tu,key:(e,t)=>Ze(e,t),getCategories:nu,getCategoryId:ou,hasId:ru,listIds:au,getIdInfo:iu,getIdPath:su,clearMutationCache:lu,getMutationNames:cu};var io=P,Me=io.Object??Object,so=Me.keys,un=Me.values,dn=Me.entries,Ve={items:["WateringCan","PlanterPot","Shovel"],decor:["SmallRock","MediumRock","LargeRock","WoodBench","StoneBench","MarbleBench"],mutations:["Gold","Rainbow","Wet","Chilled","Frozen"],eggs:["CommonEgg","UncommonEgg","RareEgg"],pets:["Worm","Snail","Bee","Chicken","Bunny"],abilities:["ProduceScaleBoost","DoubleHarvest","SeedFinderI","CoinFinderI"],plants:["Carrot","Strawberry","Aloe","Blueberry","Apple"]},uu=["Rain","Frost","Dawn","AmberMoon"],Qi=/main-[^/]+\.js(\?|$)/,du=3,pu=200,mu=50,Zi=new WeakSet,q={isReady:!1,isHookInstalled:!1,data:{items:null,decor:null,mutations:null,eggs:null,pets:null,abilities:null,plants:null,weather:null},spritesResolved:!1,spritesResolving:null,weatherPollingTimer:null,weatherPollAttempts:0},Fe=(e,t)=>t.every(n=>e.includes(n));function Ue(e,t){q.data[e]==null&&(q.data[e]=t,fu()&&ns())}function fu(){return Object.values(q.data).every(e=>e!=null)}function es(e,t){if(!e||typeof e!="object"||Zi.has(e))return;Zi.add(e);let n;try{n=so(e)}catch{return}if(!n||n.length===0)return;let o=e,r;if(!q.data.items&&Fe(n,Ve.items)&&(r=o.WateringCan,r&&typeof r=="object"&&"coinPrice"in r&&"creditPrice"in r&&Ue("items",o)),!q.data.decor&&Fe(n,Ve.decor)&&(r=o.SmallRock,r&&typeof r=="object"&&"coinPrice"in r&&"creditPrice"in r&&Ue("decor",o)),!q.data.mutations&&Fe(n,Ve.mutations)&&(r=o.Gold,r&&typeof r=="object"&&"baseChance"in r&&"coinMultiplier"in r&&Ue("mutations",o)),!q.data.eggs&&Fe(n,Ve.eggs)&&(r=o.CommonEgg,r&&typeof r=="object"&&"faunaSpawnWeights"in r&&"secondsToHatch"in r&&Ue("eggs",o)),!q.data.pets&&Fe(n,Ve.pets)&&(r=o.Worm,r&&typeof r=="object"&&"coinsToFullyReplenishHunger"in r&&"diet"in r&&Array.isArray(r.diet)&&Ue("pets",o)),!q.data.abilities&&Fe(n,Ve.abilities)&&(r=o.ProduceScaleBoost,r&&typeof r=="object"&&"trigger"in r&&"baseParameters"in r&&Ue("abilities",o)),!q.data.plants&&Fe(n,Ve.plants)&&(r=o.Carrot,r&&typeof r=="object"&&"seed"in r&&"plant"in r&&"crop"in r&&Ue("plants",o)),!(t>=du))for(let a of n){let i;try{i=o[a]}catch{continue}i&&typeof i=="object"&&es(i,t+1)}}function ao(e){try{es(e,0)}catch{}}function ts(){if(!q.isHookInstalled){q.isHookInstalled=!0;try{Me.keys=function(t){return ao(t),so.apply(this,arguments)},un&&(Me.values=function(t){return ao(t),un.apply(this,arguments)}),dn&&(Me.entries=function(t){return ao(t),dn.apply(this,arguments)})}catch{}}}function ns(){if(q.isHookInstalled){try{Me.keys=so,un&&(Me.values=un),dn&&(Me.entries=dn)}catch{}q.isHookInstalled=!1}}function gu(){try{for(let e of io.document?.scripts||[]){let t=e?.src?String(e.src):"";if(Qi.test(t))return t}}catch{}try{for(let e of io.performance?.getEntriesByType?.("resource")||[]){let t=e?.name?String(e.name):"";if(Qi.test(t))return t}}catch{}return null}function bu(e,t){let n=Math.max(e.lastIndexOf("const ",t),e.lastIndexOf("let ",t),e.lastIndexOf("var ",t));if(n<0)return null;let o=e.indexOf("=",n);if(o<0||o>t)return null;let r=e.indexOf("{",o);if(r<0||r>t)return null;let a=0,i="",s=!1;for(let c=r;c<e.length;c++){let d=e[c];if(i){if(s){s=!1;continue}if(d==="\\"){s=!0;continue}d===i&&(i="");continue}if(d==='"'||d==="'"){i=d;continue}if(d==="{")a++;else if(d==="}"&&--a===0)return e.slice(r,c+1)}return null}function hu(e){let t={},n=!1;for(let o of uu){let r=e?.[o];if(!r||typeof r!="object")continue;let a=r.iconSpriteKey||null,{iconSpriteKey:i,...s}=r;t[o]={weatherId:o,spriteId:a,...s},n=!0}return t.Sunny||(t.Sunny={weatherId:"Sunny",name:"Sunny",spriteId:"sprite/ui/SunnyIcon",type:"primary"}),!n||t.Rain&&t.Rain.mutator?.mutation!=="Wet"?null:t}async function yu(){if(q.data.weather)return!0;let e=gu();if(!e)return!1;let t="";try{let s=await fetch(e,{credentials:"include"});if(!s.ok)return!1;t=await s.text()}catch{return!1}let n=t.indexOf("fixedTimeSlots:[0,48,96,144,192,240]");if(n<0&&(n=t.indexOf('name:"Amber Moon"')),n<0)return!1;let o=bu(t,n);if(!o)return!1;let r=o.replace(/\b[A-Za-z_$][\w$]*\.(Rain|Frost|Dawn|AmberMoon)\b/g,'"$1"'),a;try{a=Function('"use strict";return('+r+")")()}catch{return!1}let i=hu(a);return i?(q.data.weather=i,!0):!1}function xu(){if(q.weatherPollingTimer)return;q.weatherPollAttempts=0;let e=setInterval(async()=>{(await yu()||++q.weatherPollAttempts>pu)&&(clearInterval(e),q.weatherPollingTimer=null)},mu);q.weatherPollingTimer=e}function vu(e){return String(e||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^A-Za-z0-9]/g,"").trim()}function wu(e,t=[]){let n=new Set,o=r=>{let a=String(r||"").trim();a&&n.add(a)};o(e);for(let r of t)o(r);for(let r of Array.from(n.values()))r.endsWith("s")?o(r.slice(0,-1)):o(`${r}s`),r.endsWith("es")&&o(r.slice(0,-2));return Array.from(n.values()).filter(Boolean)}function os(e,t,n,o=[],r=[]){let a=wu(e,o);if(!a.length)return null;let i=[t,...r].filter(l=>typeof l=="string"),s=l=>{let u=String(l||"").trim();if(!u)return null;for(let p of a)try{if(Se.has(p,u))return Se.getIdPath(p,u)}catch{}return null};for(let l of i){let u=s(l);if(u)return u}let c=vu(n||""),d=s(c||n||"");if(d)return d;try{for(let l of a){let u=Se.listIds(`sprite/${l}/`),p=i.map(f=>String(f||"").toLowerCase()),m=String(n||c||"").toLowerCase();for(let f of u){let b=(f.split("/").pop()||"").toLowerCase();if(p.some(h=>h&&h===b)||b===m)return f}for(let f of u){let b=(f.split("/").pop()||"").toLowerCase();if(p.some(h=>h&&b.includes(h))||m&&b.includes(m))return f}}}catch{}return null}function be(e,t,n,o,r=[],a=[]){if(!e||typeof e!="object")return;let i=e.tileRef;if(!i||typeof i!="object")return;let s=String(i.spritesheet||t||"").trim(),c=os(s,n,o,r,a);if(c)try{e.spriteId=c}catch{}let d=e.rotationVariants;if(d&&typeof d=="object")for(let l of Object.values(d))be(l,s,n,o);if(e.immatureTileRef){let l={tileRef:e.immatureTileRef};be(l,s,n,o),l.spriteId&&(e.immatureSpriteId=l.spriteId)}if(e.topmostLayerTileRef){let l={tileRef:e.topmostLayerTileRef};be(l,s,n,o),l.spriteId&&(e.topmostLayerSpriteId=l.spriteId)}e.activeState&&typeof e.activeState=="object"&&be(e.activeState,s,n,e.activeState?.name||o)}function Su(e,t,n,o=[]){if(!Array.isArray(t)||t.length===0)return null;let r=t[0],a=t.slice(1);return os(e,r,n??null,o,a)}function ku(e){for(let[t,n]of Object.entries(e.items||{}))be(n,"items",t,n?.name,["item"]);for(let[t,n]of Object.entries(e.decor||{}))be(n,"decor",t,n?.name);for(let[t,n]of Object.entries(e.mutations||{})){be(n,"mutations",t,n?.name,["mutation"]);let o=Su("mutation-overlay",[`${t}TallPlant`,`${t}TallPlantIcon`,t],n?.name,["mutation-overlay"]);if(o)try{n.overlaySpriteId=o}catch{}}for(let[t,n]of Object.entries(e.eggs||{}))be(n,"pets",t,n?.name,["pet"]);for(let[t,n]of Object.entries(e.pets||{}))be(n,"pets",t,n?.name,["pet"]);for(let[t,n]of Object.entries(e.plants||{})){let o=n;o.seed&&be(o.seed,o.seed?.tileRef?.spritesheet||"seeds",`${t}Seed`,o.seed?.name||`${t} Seed`,["seed","plant","plants"],[t]),o.plant&&be(o.plant,o.plant?.tileRef?.spritesheet||"plants",`${t}Plant`,o.plant?.name||`${t} Plant`,["plant","plants","tallplants"],[t]),o.crop&&be(o.crop,o.crop?.tileRef?.spritesheet||"plants",t,o.crop?.name||t,["plant","plants"],[`${t}Crop`])}}async function rs(){if(!q.spritesResolved)return q.spritesResolving||(q.spritesResolving=(async()=>{try{await as(2e4,50),await Se.init(),ku(q.data),q.spritesResolved=!0}catch(e){try{console.warn("[MGData] sprite resolution failed",e)}catch{}}finally{q.spritesResolving=null}})()),q.spritesResolving}async function Tu(){return q.isReady||(ts(),xu(),rs(),q.isReady=!0),!0}function Au(){return q.isReady}function Pu(){return ns(),q.weatherPollingTimer&&(clearInterval(q.weatherPollingTimer),q.weatherPollingTimer=null),q.isReady=!1,!0}function Cu(){return!q.spritesResolved&&!q.spritesResolving&&rs(),{...q.data}}function Mu(e){return q.data[e]??null}function Iu(e){return q.data[e]!=null}async function as(e=1e4,t=50){let n=Date.now();for(;Date.now()-n<e;){if(Object.values(q.data).some(o=>o!=null))return{...q.data};await Pe(t)}throw new Error("MGData.waitForAnyData: timeout")}async function Eu(e,t=1e4,n=50){let o=Date.now();for(;Date.now()-o<t;){let r=q.data[e];if(r!=null)return r;await Pe(n)}throw new Error(`MGData.waitFor: timeout waiting for "${e}"`)}var St={init:Tu,isReady:Au,stop:Pu,getAll:Cu,get:Mu,has:Iu,waitForAnyData:as,waitFor:Eu};ts();Ce();var pn=null,xe={ready:!1,xform:null,xformAt:0};function rt(e){try{if(typeof structuredClone=="function")return structuredClone(e)}catch{}try{return JSON.parse(JSON.stringify(e))}catch{}return e}function kt(){return ie.tos()}function uo(){return ie.engine()}function Lu(){let e=kt()?.map?.cols;return Number.isFinite(e)&&e>0?e:null}function po(e,t){let n=Lu();return n?t*n+e|0:null}function ze(e,t,n=!0){let o=kt(),r=po(e,t);if(!o||r==null)return{gidx:null,tv:null};let a=o.tileViews?.get?.(r)||null;if(!a&&n&&typeof o.getOrCreateTileView=="function")try{a=o.getOrCreateTileView(r)}catch{}return{gidx:r,tv:a||null}}function ot(e,t,n,o={}){let r=o.ensureView!==!1,a=o.forceUpdate!==!1,i=uo(),{gidx:s,tv:c}=ze(Number(e),Number(t),r);if(s==null)throw new Error("MGTile: cols unavailable (engine/TOS not ready)");if(!c)throw new Error("MGTile: TileView unavailable (not instantiated)");let d=c.tileObject;if(typeof c.onDataChanged!="function")throw new Error("MGTile: tileView.onDataChanged not found (different API?)");if(c.onDataChanged(n),a&&i?.reusableContext&&typeof c.update=="function")try{c.update(i.reusableContext)}catch{}return{ok:!0,tx:Number(e),ty:Number(t),gidx:s,before:d,after:c.tileObject}}function mo(e,t){if(!e)throw new Error("MGTile: no tileObject on this tile");if(e.objectType!==t)throw new Error(`MGTile: expected objectType "${t}", got "${e.objectType}"`)}function lo(e,t){if("startTime"in t&&(e.startTime=Number(t.startTime)),"endTime"in t&&(e.endTime=Number(t.endTime)),"targetScale"in t&&(e.targetScale=Number(t.targetScale)),"mutations"in t){if(!Array.isArray(t.mutations))throw new Error("MGTile: mutations must be an array of strings");e.mutations=t.mutations.slice()}}function Ie(){if(!xe.ready)throw new Error("MGTile: not ready. Call MGTile.init() first.")}function co(e){if(!e)return null;let t=r=>r&&(typeof r.getGlobalPosition=="function"||typeof r.toGlobal=="function"),n=["container","root","view","tile","ground","base","floor","bg","background","baseSprite","tileSprite","displayObject","gfx","graphics","sprite"];for(let r of n)if(t(e[r]))return e[r];if(t(e))return e;let o=[e.container,e.root,e.view,e.displayObject,e.tileSprite,e.gfx,e.graphics,e.sprite];for(let r of o)if(t(r))return r;try{for(let r of Object.keys(e))if(t(e[r]))return e[r]}catch{}return null}function mn(e){let t=ue(()=>e?.getGlobalPosition?.());if(t&&Number.isFinite(t.x)&&Number.isFinite(t.y))return{x:t.x,y:t.y};let n=ue(()=>e?.toGlobal?.({x:0,y:0}));return n&&Number.isFinite(n.x)&&Number.isFinite(n.y)?{x:n.x,y:n.y}:null}function Ru(e){try{if(!e?.getBounds)return"center";let t=e.getBounds(),n=mn(e);if(!n||!t||!Number.isFinite(t.width)||!Number.isFinite(t.height))return"center";let o=t.x+t.width/2,r=t.y+t.height/2;return Math.hypot(n.x-o,n.y-r)<Math.hypot(n.x-t.x,n.y-t.y)?"center":"topleft"}catch{return"center"}}function Ou(){let e=kt(),t=e?.map?.cols,n=e?.map?.rows;if(!e||!Number.isFinite(t)||t<=1)return null;let o=Number.isFinite(n)&&n>1?n:null,r=[[0,0],[1,1],[Math.min(2,t-2),0],[0,1]];o&&o>2&&r.push([Math.floor(t/2),Math.floor(o/2)]);for(let[a,i]of r){if(a<0||i<0||a>=t||o&&i>=o)continue;let s=ze(a,i,!0).tv,c=a+1<t?ze(a+1,i,!0).tv:null,d=ze(a,i+1,!0).tv,l=co(s),u=co(c),p=co(d);if(!l||!u||!p)continue;let m=mn(l),f=mn(u),g=mn(p);if(!m||!f||!g)continue;let b={x:f.x-m.x,y:f.y-m.y},h={x:g.x-m.x,y:g.y-m.y},w=b.x*h.y-b.y*h.x;if(!Number.isFinite(w)||Math.abs(w)<1e-6)continue;let T=1/w,x={a:h.y*T,b:-h.x*T,c:-b.y*T,d:b.x*T},v={x:m.x-a*b.x-i*h.x,y:m.y-a*b.y-i*h.y},k=Ru(l),L=k==="center"?v:{x:v.x+.5*(b.x+h.x),y:v.y+.5*(b.y+h.y)};return{ok:!0,cols:t,rows:o,vx:b,vy:h,inv:x,anchorMode:k,originCenter:L}}return null}async function Du(e=15e3){return xe.ready?!0:pn||(pn=(async()=>{if(await ie.init(e),!kt())throw new Error("MGTile: engine captured but tileObject system not found");return xe.ready=!0,!0})(),pn)}function Hu(){return ie.hook()}function fn(e,t,n={}){Ie();let o=n.ensureView!==!1,r=n.clone!==!1,{gidx:a,tv:i}=ze(Number(e),Number(t),o);if(a==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!i)return{tx:Number(e),ty:Number(t),gidx:a,tileView:null,tileObject:void 0};let s=i.tileObject;return{tx:Number(e),ty:Number(t),gidx:a,tileView:i,tileObject:r?rt(s):s}}function Gu(e,t,n={}){return Ie(),ot(e,t,null,n)}function Nu(e,t,n,o={}){Ie();let a=fn(e,t,{...o,clone:!1}).tileView?.tileObject;mo(a,"plant");let i=rt(a);if(Array.isArray(i.slots)||(i.slots=[]),"plantedAt"in n&&(i.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(i.maturedAt=Number(n.maturedAt)),"species"in n&&(i.species=String(n.species)),"slotIdx"in n&&"slotPatch"in n){let s=Number(n.slotIdx)|0;if(!i.slots[s])throw new Error(`MGTile: plant slot ${s} doesn't exist`);return lo(i.slots[s],n.slotPatch),ot(e,t,i,o)}if("slots"in n){let s=n.slots;if(Array.isArray(s)){for(let c=0;c<s.length;c++)if(s[c]!=null){if(!i.slots[c])throw new Error(`MGTile: plant slot ${c} doesn't exist`);lo(i.slots[c],s[c])}}else if(s&&typeof s=="object")for(let c of Object.keys(s)){let d=Number(c)|0;if(Number.isFinite(d)){if(!i.slots[d])throw new Error(`MGTile: plant slot ${d} doesn't exist`);lo(i.slots[d],s[d])}}else throw new Error("MGTile: patch.slots must be array or object map");return ot(e,t,i,o)}return ot(e,t,i,o)}function _u(e,t,n,o={}){Ie();let a=fn(e,t,{...o,clone:!1}).tileView?.tileObject;mo(a,"decor");let i=rt(a);return"rotation"in n&&(i.rotation=Number(n.rotation)),ot(e,t,i,o)}function Wu(e,t,n,o={}){Ie();let a=fn(e,t,{...o,clone:!1}).tileView?.tileObject;mo(a,"egg");let i=rt(a);return"plantedAt"in n&&(i.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(i.maturedAt=Number(n.maturedAt)),ot(e,t,i,o)}function ju(e,t,n,o={}){Ie();let r=o.ensureView!==!1,a=o.forceUpdate!==!1,i=uo(),{gidx:s,tv:c}=ze(Number(e),Number(t),r);if(s==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!c)throw new Error("MGTile: TileView unavailable");let d=c.tileObject,l=typeof n=="function"?n(rt(d)):n;if(c.onDataChanged(l),a&&i?.reusableContext&&typeof c.update=="function")try{c.update(i.reusableContext)}catch{}return{ok:!0,tx:Number(e),ty:Number(t),gidx:s,before:d,after:c.tileObject}}function Bu(e,t,n={}){Ie();let o=n.ensureView!==!1,{gidx:r,tv:a}=ze(Number(e),Number(t),o);if(r==null)throw new Error("MGTile: cols unavailable");if(!a)return{ok:!0,tx:Number(e),ty:Number(t),gidx:r,tv:null,tileObject:void 0};let i=n.clone!==!1,s=a.tileObject;return{ok:!0,tx:Number(e),ty:Number(t),gidx:r,objectType:s?.objectType??null,tileObject:i?rt(s):s,tvKeys:Object.keys(a||{}).sort(),tileView:a}}function is(){return Ie(),xe.xform=Ou(),xe.xformAt=Date.now(),{ok:!!xe.xform?.ok,xform:xe.xform}}function Vu(e,t={}){if(Ie(),!e||!Number.isFinite(e.x)||!Number.isFinite(e.y))return null;let n=Number.isFinite(t.maxAgeMs)?Number(t.maxAgeMs):1500;(!xe.xform?.ok||t.forceRebuild||Date.now()-xe.xformAt>n)&&is();let o=xe.xform;if(!o?.ok)return null;let r=e.x-o.originCenter.x,a=e.y-o.originCenter.y,i=o.inv.a*r+o.inv.b*a,s=o.inv.c*r+o.inv.d*a,c=Math.floor(i),d=Math.floor(s),l=[[c,d],[c+1,d],[c,d+1],[c+1,d+1]],u=null,p=1/0;for(let[m,f]of l){if(m<0||f<0||m>=o.cols||Number.isFinite(o.rows)&&o.rows!==null&&f>=o.rows)continue;let g=o.originCenter.x+m*o.vx.x+f*o.vy.x,b=o.originCenter.y+m*o.vx.y+f*o.vy.y,h=(e.x-g)**2+(e.y-b)**2;h<p&&(p=h,u={tx:m,ty:f,fx:i,fy:s,x:e.x,y:e.y,gidx:null})}return u?(u.gidx=po(u.tx,u.ty),u):null}function Fu(){return["MGTile.init()","MGTile.hook()","MGTile.getTileObject(tx,ty) / inspect(tx,ty)","MGTile.setTileEmpty(tx,ty)","MGTile.setTilePlant(tx,ty,{...}) / setTileDecor / setTileEgg","MGTile.setTileObjectRaw(tx,ty,objOrFn)","MGTile.rebuildTransform() / pointToTile({x,y})"].join(`
`)}var ke={init:Du,ready:()=>xe.ready,hook:Hu,engine:()=>uo(),tos:()=>kt(),gidx:(e,t)=>po(Number(e),Number(t)),getTileObject:fn,inspect:Bu,setTileEmpty:Gu,setTilePlant:Nu,setTileDecor:_u,setTileEgg:Wu,setTileObjectRaw:ju,rebuildTransform:is,pointToTile:Vu,help:Fu};Ce();var V={ready:!1,app:null,renderer:null,stage:null,ticker:null,tileSets:new Map,highlights:new Map,watches:new Map,fades:new Map,fadeWatches:new Map},yo=e=>!!e&&typeof e=="object"&&!Array.isArray(e),fo=e=>!!(e&&typeof e.getBounds=="function"&&("parent"in e||"children"in e)),bn=e=>!!(e&&typeof e.tint=="number"),$e=e=>!!(e&&typeof e.alpha=="number");function gn(e,t,n){return e+(t-e)*n}function Uu(e,t,n){let o=e>>16&255,r=e>>8&255,a=e&255,i=t>>16&255,s=t>>8&255,c=t&255,d=gn(o,i,n)|0,l=gn(r,s,n)|0,u=gn(a,c,n)|0;return d<<16|l<<8|u}function zu(e,t=900){let n=[],o=[e];for(;o.length&&n.length<t;){let r=o.pop();if(!r)continue;bn(r)&&n.push(r);let a=r.children;if(Array.isArray(a))for(let i=a.length-1;i>=0;i--)o.push(a[i])}return n}function $u(e,t=25e3){let n=[],o=[e],r=0;for(;o.length&&r++<t;){let a=o.pop();if(!a)continue;$e(a)&&n.push(a);let i=a.children;if(Array.isArray(i))for(let s=i.length-1;s>=0;s--)o.push(i[s])}return n}function ss(e){if(!Array.isArray(e))return[];let t=new Set,n=[];for(let o of e){let r,a;if(Array.isArray(o))r=o[0],a=o[1];else if(yo(o))r=o.x??o.tx,a=o.y??o.ty;else continue;if(r=Number(r),a=Number(a),!Number.isFinite(r)||!Number.isFinite(a))continue;r|=0,a|=0;let i=`${r},${a}`;t.has(i)||(t.add(i),n.push({x:r,y:a}))}return n}function Ku(e,t){let n=String(e||"").trim();if(!n)throw new Error("MGPixi.defineTileSet: empty name");let o=ss(t);return V.tileSets.set(n,o),{ok:!0,name:n,count:o.length}}function qu(e){return V.tileSets.delete(String(e||"").trim())}function Ju(){return Array.from(V.tileSets.keys()).sort((e,t)=>e.localeCompare(t))}function ls(e){return!!(e&&(e.tileSet!=null||Array.isArray(e.tiles)))}function xo(e){let n=ke.tos?.()?.tileViews;if(!n?.entries)throw new Error("MGPixi: TOS.tileViews not found");if(!ls(e))return{entries:Array.from(n.entries()),gidxSet:null};let o=[];if(e.tileSet!=null){let a=String(e.tileSet||"").trim(),i=V.tileSets.get(a);if(!i)throw new Error(`MGPixi: tileSet not found "${a}"`);o=i}else o=ss(e.tiles||[]);let r=new Map;for(let a of o){let i=ke.getTileObject(a.x,a.y,{ensureView:!0,clone:!1});i?.tileView&&i.gidx!=null&&r.set(i.gidx,i.tileView)}return{entries:Array.from(r.entries()),gidxSet:new Set(r.keys())}}function vo(e){let t=V.highlights.get(e);if(!t)return!1;ue(()=>V.ticker?.remove(t.tick)),t.root&&t.baseAlpha!=null&&$e(t.root)&&ue(()=>{t.root.alpha=t.baseAlpha});for(let n of t.tint)n.o&&bn(n.o)&&ue(()=>{n.o.tint=n.baseTint});return V.highlights.delete(e),!0}function cs(e=null){for(let t of Array.from(V.highlights.keys()))e&&!String(t).startsWith(e)||vo(t);return!0}function us(e,t={}){if(Ke(),!fo(e))throw new Error("MGPixi.highlightPulse: invalid root");let n=String(t.key||`hl:${Math.random().toString(16).slice(2)}`);if(V.highlights.has(n))return n;let o=$e(e)?Number(e.alpha):null,r=pe(Number(t.minAlpha??.12),0,1),a=pe(Number(t.maxAlpha??1),0,1),i=Number(t.speed??1.25),s=(t.tint??8386303)>>>0,c=pe(Number(t.tintMix??.85),0,1),d=t.deepTint!==!1,l=[];if(d)for(let m of zu(e))l.push({o:m,baseTint:m.tint});else bn(e)&&l.push({o:e,baseTint:e.tint});let u=performance.now(),p=()=>{let m=(performance.now()-u)/1e3,f=(Math.sin(m*Math.PI*2*i)+1)/2,g=f*f*(3-2*f);o!=null&&$e(e)&&(e.alpha=pe(gn(r,a,g)*o,0,1));let b=g*c;for(let h of l)h.o&&bn(h.o)&&(h.o.tint=Uu(h.baseTint,s,b))};return V.ticker?.add(p),V.highlights.set(n,{root:e,tick:p,baseAlpha:o,tint:l}),n}var Yu=["plantVisual","cropVisual","slotVisual","slotView","displayObject","view","container","root","sprite","gfx","graphics"];function go(e){if(!e)return null;if(fo(e))return e;if(!yo(e))return null;for(let t of Yu){let n=e[t];if(fo(n))return n}return null}function Xu(e,t){let n=[{o:e,d:0}],o=new Set,r=6;for(;n.length;){let{o:a,d:i}=n.shift();if(!(!a||i>r)&&!o.has(a)){if(o.add(a),Array.isArray(a)){if(a.length===t){let s=new Array(t),c=!0;for(let d=0;d<t;d++){let l=go(a[d]);if(!l){c=!1;break}s[d]=l}if(c)return s}for(let s of a)n.push({o:s,d:i+1});continue}if(yo(a)){let s=a;for(let c of Object.keys(s))n.push({o:s[c],d:i+1})}}}return null}function Qu(e,t){let n=e?.mutations;if(!Array.isArray(n))return!1;for(let o of n)if(String(o||"").toLowerCase()===t)return!0;return!1}function ds(e,t={}){Ke();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.highlightMutation: empty mutation");let{entries:o,gidxSet:r}=xo(t),a=`hlmut:${n}:`;if(t.clear===!0)if(!r)cs(a);else for(let u of Array.from(V.highlights.keys())){if(!u.startsWith(a))continue;let p=u.split(":"),m=Number(p[2]);r.has(m)&&vo(u)}let i={tint:(t.tint??8386303)>>>0,minAlpha:Number(t.minAlpha??.12),maxAlpha:Number(t.maxAlpha??1),speed:Number(t.speed??1.25),tintMix:Number(t.tintMix??.85),deepTint:t.deepTint!==!1},s=0,c=0,d=0,l=0;for(let[u,p]of o){let m=p?.tileObject;if(!m||m.objectType!=="plant")continue;let f=m.slots;if(!Array.isArray(f)||f.length===0)continue;let g=!1,b=[];for(let T=0;T<f.length;T++)Qu(f[T],n)&&(b.push(T),g=!0);if(!g)continue;s++,c+=b.length;let h=p?.childView?.plantVisual||p?.childView||p,w=Xu(h,f.length);if(!w){l+=b.length;continue}for(let T of b){let x=w[T];if(!x){l++;continue}let v=`${a}${u}:${T}`;V.highlights.has(v)||(us(x,{key:v,...i}),d++)}}return{ok:!0,mutation:n,filtered:!!r,plantsMatched:s,matchedSlots:c,newHighlights:d,failedSlots:l}}function Zu(e,t={}){Ke();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchMutation: empty mutation");let o=`watchmut:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,r=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,a=V.watches.get(o);a&&clearInterval(a);let i=setInterval(()=>{ue(()=>ds(n,{...t,clear:!1}))},r);return V.watches.set(o,i),{ok:!0,key:o,mutation:n,intervalMs:r}}function ed(e){let t=String(e||"").trim();if(!t)return!1;if(!t.startsWith("watchmut:")){let o=t.toLowerCase(),r=0;for(let[a,i]of Array.from(V.watches.entries()))a.startsWith(`watchmut:${o}:`)&&(clearInterval(i),V.watches.delete(a),r++);return r>0}let n=V.watches.get(t);return n?(clearInterval(n),V.watches.delete(t),!0):!1}function td(e){let t=Array.isArray(e?.slots)?e.slots:[];return{objectType:"plant",species:e?.species??null,plantedAt:e?.plantedAt??null,maturedAt:e?.maturedAt??null,slotCount:t.length,slots:t.map((n,o)=>({idx:o,mutations:Array.isArray(n?.mutations)?n.mutations.slice():[]}))}}function nd(e,t,n={}){Ke();let o=Number(e)|0,r=Number(t)|0,a=n.ensureView!==!1,i=ke.getTileObject(o,r,{ensureView:a,clone:!1}),s=i?.tileView||null,c=s?.tileObject,d={ok:!0,tx:o,ty:r,gidx:i?.gidx??ke.gidx?.(o,r)??null,hasTileView:!!s,objectType:c?.objectType??null,tileObject:c??null,summary:c?.objectType==="plant"?td(c):c?{objectType:c.objectType??null}:null,display:s?s.childView?.plantVisual||s.childView||s.displayObject||s:null};return n.log!==!1&&ue(()=>console.log("[MGPixi.inspectTile]",d)),d}function od(e){let t=e?.childView?.plantVisual||e?.childView?.cropVisual||e?.childView||e?.displayObject||e;return go(t)||go(e?.displayObject)||null}function ps(e){let t=V.fades.get(e);if(!t)return!1;for(let n of t.targets)n.o&&$e(n.o)&&Number.isFinite(n.baseAlpha)&&ue(()=>{n.o.alpha=n.baseAlpha});return V.fades.delete(e),!0}function bo(e=null){for(let t of Array.from(V.fades.keys()))e&&!String(t).startsWith(e)||ps(t);return!0}function ms(e,t={}){Ke();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.clearSpeciesFade: empty species");let o=`fade:${n}:`;if(!ls(t))return bo(o);let{gidxSet:r}=xo(t);if(!r)return bo(o);for(let a of Array.from(V.fades.keys())){if(!a.startsWith(o))continue;let i=Number(a.slice(o.length));r.has(i)&&ps(a)}return!0}function fs(e,t={}){Ke();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.fadeSpecies: empty species");let o=pe(Number(t.alpha??.2),0,1),r=t.deep===!0,{entries:a,gidxSet:i}=xo(t),s=`fade:${n}:`;t.clear===!0&&ms(n,t);let c=0,d=0,l=0,u=0;for(let[p,m]of a){let f=m?.tileObject;if(!f||f.objectType!=="plant")continue;c++;let g=String(f.species||"").trim().toLowerCase();if(!g||g!==n)continue;d++;let b=od(m);if(!b||!$e(b)){u++;continue}let h=`${s}${p}`;if(V.fades.has(h)){ue(()=>{b.alpha=o}),l++;continue}let w=r?$u(b):[b],T=[];for(let x of w)$e(x)&&T.push({o:x,baseAlpha:Number(x.alpha)});for(let x of T)ue(()=>{x.o.alpha=o});V.fades.set(h,{targets:T}),l++}return{ok:!0,species:n,alpha:o,deep:r,filtered:!!i,plantsSeen:c,matchedPlants:d,applied:l,failed:u,totalFades:V.fades.size}}function rd(e,t={}){Ke();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchFadeSpecies: empty species");let o=`watchfade:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,r=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,a=V.fadeWatches.get(o);a&&clearInterval(a);let i=setInterval(()=>{ue(()=>fs(n,{...t,clear:!1}))},r);return V.fadeWatches.set(o,i),{ok:!0,key:o,species:n,intervalMs:r}}function ad(e){let t=String(e||"").trim();if(!t)return!1;if(!t.startsWith("watchfade:")){let o=t.toLowerCase(),r=0;for(let[a,i]of Array.from(V.fadeWatches.entries()))a.startsWith(`watchfade:${o}:`)&&(clearInterval(i),V.fadeWatches.delete(a),r++);return r>0}let n=V.fadeWatches.get(t);return n?(clearInterval(n),V.fadeWatches.delete(t),!0):!1}function ho(){let e=P;return e.$PIXI=e.PIXI||null,e.$app=V.app||null,e.$renderer=V.renderer||null,e.$stage=V.stage||null,e.$ticker=V.ticker||null,e.__MG_PIXI__={PIXI:e.$PIXI,app:e.$app,renderer:e.$renderer,stage:e.$stage,ticker:e.$ticker,ready:V.ready},e.__MG_PIXI__}function Ke(){if(!V.ready)throw new Error("MGPixi: call MGPixi.init() first")}async function id(e=15e3){if(V.ready)return ho(),!0;if(await ie.init(e),V.app=ie.app(),V.ticker=ie.ticker(),V.renderer=ie.renderer(),V.stage=ie.stage(),!V.app||!V.ticker)throw new Error("MGPixi: PIXI app/ticker not found");return V.ready=!0,ho(),!0}var Tt={init:id,ready:()=>V.ready,expose:ho,get app(){return V.app},get renderer(){return V.renderer},get stage(){return V.stage},get ticker(){return V.ticker},get PIXI(){return P.PIXI||null},defineTileSet:Ku,deleteTileSet:qu,listTileSets:Ju,highlightPulse:us,stopHighlight:vo,clearHighlights:cs,highlightMutation:ds,watchMutation:Zu,stopWatchMutation:ed,inspectTile:nd,fadeSpecies:fs,clearSpeciesFade:ms,clearFades:bo,watchFadeSpecies:rd,stopWatchFadeSpecies:ad};Ce();var gs=P??window,sd={sfx:"soundEffectsVolume",music:"musicVolume",ambience:"ambienceVolume"},ld={sfx:"soundEffectsVolumeAtom",music:"musicVolumeAtom",ambience:"ambienceVolumeAtom"},At=.001,Pt=.2,hn=null,z={ready:!1,baseUrl:null,urls:{ambience:new Map,music:new Map},sfx:{mp3Url:null,atlasUrl:null,atlas:null,groups:new Map,buffer:null},tracks:{ambience:null,music:null},ctx:null};function Mt(){if(!z.ready)throw new Error("MGAudio not ready yet")}function bs(e,t=NaN){try{let n=localStorage.getItem(e);if(n==null)return t;let o;try{o=JSON.parse(n)}catch{o=n}if(typeof o=="number"&&Number.isFinite(o))return o;if(typeof o=="string"){let r=parseFloat(o);if(Number.isFinite(r))return r}}catch{}return t}function Ct(e){let t=sd[e],n=ld[e];if(!t)return{atom:Pt,vol100:yn(Pt)};let o=bs(t,NaN);if(Number.isFinite(o)){let a=pe(o,0,1);return{atom:a,vol100:yn(a)}}if(n){let a=bs(n,NaN);if(Number.isFinite(a)){let i=pe(a,0,1);return{atom:i,vol100:yn(i)}}}let r=Pt;return{atom:r,vol100:yn(r)}}function cd(e){let t=Number(e);if(!Number.isFinite(t))return null;if(t<=0)return 0;let o=(pe(t,1,100)-1)/99;return At+o*(Pt-At)}function yn(e){let t=pe(Number(e),0,1);if(t<=At)return 0;let n=(t-At)/(Pt-At);return Math.round(1+n*99)}function hs(e,t){if(t==null)return Ct(e).atom;let n=cd(t);return n===null?Ct(e).atom:Un(n)}async function ys(){let e=z.ctx;if(e)return e;let t=gs.AudioContext||gs.webkitAudioContext;if(!t)throw new Error("WebAudio not supported");let n=new t;return z.ctx=n,n}async function xs(){if(z.ctx&&z.ctx.state==="suspended")try{await z.ctx.resume()}catch{}}function ud(e){let t=new Map,n=(o,r)=>{t.has(o)||t.set(o,[]),t.get(o).push(r)};for(let o of Object.keys(e||{})){let r=/^(.*)_([A-Z])$/.exec(o);r?.[1]?n(r[1],o):n(o,o)}for(let[o,r]of Array.from(t.entries()))r.sort((a,i)=>a.localeCompare(i)),t.set(o,r);z.sfx.groups=t}function dd(e){let t=z.sfx.atlas;if(!t)throw new Error("SFX atlas not loaded");if(t[e])return e;let n=z.sfx.groups.get(e);if(n?.length)return n[Math.random()*n.length|0];throw new Error(`Unknown sfx/group: ${e}`)}async function pd(){if(z.sfx.buffer)return z.sfx.buffer;if(!z.sfx.mp3Url)throw new Error("SFX mp3 url missing");let e=await ys();await xs();let n=await(await tn(z.sfx.mp3Url)).arrayBuffer(),o=await new Promise((r,a)=>{let i=e.decodeAudioData(n,r,a);i?.then&&i.then(r,a)});return z.sfx.buffer=o,o}async function md(e,t={}){if(!z.ready)throw new Error("MGAudio not ready yet");let n=String(e||"").trim();if(!n)throw new Error("Missing sfx name");let o=dd(n),r=z.sfx.atlas[o];if(!r)throw new Error(`Missing segment for sfx: ${o}`);let a=await ys();await xs();let i=await pd(),s=Math.max(0,+r.start||0),c=Math.max(s,+r.end||s),d=Math.max(.01,c-s),l=hs("sfx",t.volume),u=a.createGain();u.gain.value=l,u.connect(a.destination);let p=a.createBufferSource();return p.buffer=i,p.connect(u),p.start(0,s,d),{name:o,source:p,start:s,end:c,duration:d,volume:l}}function vs(e){if(e!=="music"&&e!=="ambience")return!1;let t=z.tracks[e];if(t){try{t.pause()}catch{}try{t.src=""}catch{}}return z.tracks[e]=null,!0}function fd(e,t,n={}){if(!z.ready)throw new Error("MGAudio not ready yet");if(e!=="music"&&e!=="ambience")throw new Error(`Invalid category: ${e}`);let o=z.urls[e].get(t);if(!o)throw new Error(`Unknown ${e}: ${t}`);vs(e);let r=new Audio(o);return r.loop=!!n.loop,r.volume=hs(e,n.volume),r.preload="auto",r.play().catch(()=>{}),z.tracks[e]=r,r}async function gd(e,t,n={}){let o=String(e||"").trim(),r=String(t||"").trim();if(!o||!r)throw new Error("play(category, asset) missing args");if(o==="sfx")return md(r,n);if(o==="music"||o==="ambience")return fd(o,r,n);throw new Error(`Unknown category: ${o}`)}function bd(e,t={}){let n=String(e||"").trim();return n==="music"||n==="ambience"?Array.from(z.urls[n].keys()).sort():n==="sfx"?z.sfx.atlas?t.groups?Array.from(z.sfx.groups.keys()).sort():Object.keys(z.sfx.atlas).sort():[]:[]}function hd(){return z.tracks.music&&(z.tracks.music.volume=Ct("music").atom),z.tracks.ambience&&(z.tracks.ambience.volume=Ct("ambience").atom),!0}function yd(){return Mt(),["sfx","music","ambience"]}function xd(){return Mt(),Array.from(z.sfx.groups.keys()).sort((e,t)=>e.localeCompare(t))}function vd(e,t){Mt();let n=String(e||"").trim().toLowerCase(),o=String(t||"").trim();if(!o||n!=="music"&&n!=="ambience")return!1;let r=z.urls[n],a=o.toLowerCase();for(let i of r.keys())if(i.toLowerCase()===a)return!0;return!1}function wd(e){Mt();let t=String(e||"").trim();if(!t)return!1;let n=t.toLowerCase();for(let o of z.sfx.groups.keys())if(o.toLowerCase()===n)return!0;return!1}function Sd(e,t){Mt();let n=String(e||"").trim().toLowerCase(),o=String(t||"").trim();if(!o)throw new Error("getTrackUrl(category, name) missing name");if(n!=="music"&&n!=="ambience")throw new Error(`Invalid category: ${e}`);let r=z.urls[n],a=o.toLowerCase();for(let[i,s]of r.entries())if(i.toLowerCase()===a)return s;return null}async function kd(){return z.ready?!0:hn||(hn=(async()=>{z.baseUrl=await ye.base();let e=await me.load(z.baseUrl),t=me.getBundle(e,"audio");if(!t)throw new Error("No audio bundle in manifest");for(let n of t.assets||[])for(let o of n.src||[]){if(typeof o!="string")continue;let r=/^audio\/(ambience|music)\/(.+)\.mp3$/i.exec(o);if(r){let a=r[1].toLowerCase(),i=r[2];z.urls[a].set(i,de(z.baseUrl,o));continue}/^audio\/sfx\/sfx\.mp3$/i.test(o)&&(z.sfx.mp3Url=de(z.baseUrl,o)),/^audio\/sfx\/sfx\.json$/i.test(o)&&(z.sfx.atlasUrl=de(z.baseUrl,o))}if(!z.sfx.atlasUrl)throw new Error("Missing audio/sfx/sfx.json in manifest");return z.sfx.atlas=await Qe(z.sfx.atlasUrl),ud(z.sfx.atlas),z.ready=!0,!0})(),hn)}var It={init:kd,ready:()=>z.ready,play:gd,stop:vs,list:bd,refreshVolumes:hd,categoryVolume:Ct,getCategories:yd,getGroups:xd,hasTrack:vd,hasGroup:wd,getTrackUrl:Sd};var wo=P?.document??document,xn=null,Z={ready:!1,baseUrl:null,byCat:new Map,byBase:new Map,overlay:null,live:new Set,defaultParent:null};function Td(){if(Z.overlay)return Z.overlay;let e=wo.createElement("div");return e.id="MG_COSMETIC_OVERLAY",e.style.cssText=["position:fixed","left:0","top:0","width:100vw","height:100vh","pointer-events:none","z-index:99999999"].join(";"),wo.documentElement.appendChild(e),Z.overlay=e,e}function Ad(){let e=Z.defaultParent;if(!e)return null;try{return typeof e=="function"?e():e}catch{return null}}function So(e){let t=String(e||"").trim();return t?(t=t.replace(/^cosmetic\//i,""),t=t.replace(/\.png$/i,""),t):""}function Pd(e,t){if(t===void 0){let a=So(e),i=a.indexOf("_");return i<0?{cat:"",asset:a,base:a}:{cat:a.slice(0,i),asset:a.slice(i+1),base:a}}let n=String(e||"").trim(),o=So(t),r=o.includes("_")?o:`${n}_${o}`;if(o.includes("_")&&!n){let a=o.indexOf("_");return{cat:o.slice(0,a),asset:o.slice(a+1),base:o}}return{cat:n,asset:o.replace(/^.+?_/,""),base:r}}function Cd(){return Array.from(Z.byCat.keys()).sort((e,t)=>e.localeCompare(t))}function Md(e){let t=Z.byCat.get(String(e||"").trim());return t?Array.from(t.keys()).sort((n,o)=>n.localeCompare(o)):[]}function ko(e,t){let{cat:n,asset:o,base:r}=Pd(e,t),a=Z.byBase.get(r);if(a)return a;let s=Z.byCat.get(n)?.get(o);if(s)return s;if(!Z.baseUrl)throw new Error("MGCosmetic not initialized");if(!r)throw new Error("Invalid cosmetic name");return de(Z.baseUrl,`cosmetic/${r}.png`)}function To(e,t,n){if(!Z.ready)throw new Error("MGCosmetic not ready yet");let o,r;typeof t=="object"&&t!==null?(o=t,r=void 0):typeof t=="string"?(r=t,o=n||{}):(r=void 0,o=n||{});let a=r!==void 0?ko(e,r):ko(e),i=wo.createElement("img");if(i.decoding="async",i.loading="eager",i.src=a,i.alt=o.alt!=null?String(o.alt):So(r??e),o.className&&(i.className=String(o.className)),o.width!=null&&(i.style.width=String(o.width)),o.height!=null&&(i.style.height=String(o.height)),o.opacity!=null&&(i.style.opacity=String(o.opacity)),o.style&&typeof o.style=="object")for(let[s,c]of Object.entries(o.style))try{i.style[s]=String(c)}catch{}return i}function Id(e,t,n){let o,r;typeof t=="object"&&t!==null?(o=t,r=void 0):typeof t=="string"?(r=t,o=n||{}):(r=void 0,o=n||{});let a=o.parent||Ad()||Td(),i=r!==void 0?To(e,r,o):To(e,o);if(a===Z.overlay||o.center||o.x!=null||o.y!=null||o.absolute){i.style.position="absolute",i.style.pointerEvents="none",i.style.zIndex=String(o.zIndex??999999);let c=o.scale??1,d=o.rotation??0;if(o.center)i.style.left="50%",i.style.top="50%",i.style.transform=`translate(-50%, -50%) scale(${c}) rotate(${d}rad)`;else{let l=o.x??innerWidth/2,u=o.y??innerHeight/2;i.style.left=`${l}px`,i.style.top=`${u}px`,i.style.transform=`scale(${c}) rotate(${d}rad)`,o.anchor==="center"&&(i.style.transform=`translate(-50%, -50%) scale(${c}) rotate(${d}rad)`)}}return a.appendChild(i),Z.live.add(i),i.__mgDestroy=()=>{try{i.remove()}catch{}Z.live.delete(i)},i}function Ed(e){return Z.defaultParent=e,!0}function Ld(){for(let e of Array.from(Z.live))e.__mgDestroy?.()}async function Rd(){return Z.ready?!0:xn||(xn=(async()=>{Z.baseUrl=await ye.base();let e=await me.load(Z.baseUrl),t=me.getBundle(e,"cosmetic");if(!t)throw new Error("No 'cosmetic' bundle in manifest");Z.byCat.clear(),Z.byBase.clear();for(let n of t.assets||[])for(let o of n.src||[]){if(typeof o!="string"||!/^cosmetic\/.+\.png$/i.test(o))continue;let a=o.split("/").pop().replace(/\.png$/i,""),i=a.indexOf("_");if(i<0)continue;let s=a.slice(0,i),c=a.slice(i+1),d=de(Z.baseUrl,o);Z.byBase.set(a,d),Z.byCat.has(s)||Z.byCat.set(s,new Map),Z.byCat.get(s).set(c,d)}return Z.ready=!0,!0})(),xn)}var Et={init:Rd,ready:()=>Z.ready,categories:Cd,list:Md,url:ko,create:To,show:Id,attach:Ed,clear:Ld};async function ws(e){let t=[{name:"Data",init:()=>St.init()},{name:"Sprites",init:()=>Se.init()},{name:"TileObjectSystem",init:()=>ke.init()},{name:"Pixi",init:()=>Tt.init()},{name:"Audio",init:()=>It.init()},{name:"Cosmetics",init:()=>Et.init()}];await Promise.all(t.map(async n=>{e?.({status:"start",name:n.name});try{await n.init(),e?.({status:"success",name:n.name})}catch(o){console.error(`[${n.name}] failed`,o),e?.({status:"error",name:n.name,error:o})}})),console.log("[Gemini] Modules ready. Access via Gemini.Modules in console.")}var Od=new Map;function Dd(){return Od}function Lt(){return P.jotaiAtomCache?.cache}function Rt(e){let t=Dd(),n=t.get(e);if(n)return n;let o=Lt();if(!o)return null;for(let r of o.values())if((r?.debugLabel||r?.label||"")===e)return t.set(e,r),r;return null}var Hd={baseStore:null,captureInProgress:!1,captureError:null,lastCapturedVia:null,mirror:void 0};function at(){return Hd}var Gd="__JOTAI_STORE_READY__",Ss=!1,Po=new Set;function vn(){if(!Ss){Ss=!0;for(let e of Po)try{e()}catch{}try{let e=P.CustomEvent||CustomEvent;P.dispatchEvent?.(new e(Gd))}catch{}}}function Nd(e){Po.add(e);let t=Mo();if(t.via&&!t.polyfill)try{e()}catch{}return()=>{Po.delete(e)}}async function wn(e={}){let{timeoutMs:t=6e3,intervalMs:n=50}=e,o=Mo();if(!(o.via&&!o.polyfill))return new Promise((r,a)=>{let i=!1,s=Nd(()=>{i||(i=!0,s(),r())}),c=Date.now();(async()=>{for(;!i&&Date.now()-c<t;){let l=Mo();if(l.via&&!l.polyfill){if(i)return;i=!0,s(),r();return}await Ot(n)}i||(i=!0,s(),a(new Error("Store not captured within timeout")))})()})}var Ot=e=>new Promise(t=>setTimeout(t,e));function ks(){try{let e=P.Event||Event;P.dispatchEvent?.(new e("visibilitychange"))}catch{}}function Co(e){return e&&typeof e=="object"&&typeof e.get=="function"&&typeof e.set=="function"&&typeof e.sub=="function"}function Ao(e,t=0,n=new WeakSet){if(t>3||!e||typeof e!="object"||n.has(e))return null;try{n.add(e)}catch{return null}if(Co(e))return e;let o=["store","value","current","state","s","baseStore"];for(let r of o)try{let a=e[r];if(Co(a))return a}catch{}return null}function Ts(){let e=at(),t=P.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t?.renderers?.size)return null;let n=0;for(let[o]of t.renderers){let r=t.getFiberRoots?.(o);r&&(n+=r.size||0)}if(n===0)return null;for(let[o]of t.renderers){let r=t.getFiberRoots?.(o);if(r)for(let a of r){let i=new Set,s=[a.current];for(;s.length;){let c=s.pop();if(!(!c||i.has(c))){i.add(c);try{let d=c?.pendingProps?.value;if(Co(d))return e.lastCapturedVia="fiber",d}catch{}try{let d=c?.memoizedState,l=0;for(;d&&l<15;){l++;let u=Ao(d);if(u)return e.lastCapturedVia="fiber",u;let p=Ao(d.memoizedState);if(p)return e.lastCapturedVia="fiber",p;d=d.next}}catch{}try{if(c?.stateNode){let d=Ao(c.stateNode);if(d)return e.lastCapturedVia="fiber",d}}catch{}c.child&&s.push(c.child),c.sibling&&s.push(c.sibling),c.alternate&&s.push(c.alternate)}}}}return null}function As(){return{get:()=>{throw new Error("Store not captured: get unavailable")},set:()=>{throw new Error("Store not captured: set unavailable")},sub:()=>()=>{},__polyfill:!0}}async function _d(e=5e3){let t=Date.now(),n=Lt();for(;!n&&Date.now()-t<e;)await Ot(100),n=Lt();if(!n)throw new Error("jotaiAtomCache.cache not found");let o=at(),r=null,a=null,i=[],s=()=>{for(let d of i)try{d.__origWrite&&(d.write=d.__origWrite,delete d.__origWrite)}catch{}};for(let d of n.values()){if(!d||typeof d.write!="function"||d.__origWrite)continue;let l=d.write;d.__origWrite=l,d.write=function(u,p,...m){return a||(r=u,a=p,s()),l.call(this,u,p,...m)},i.push(d)}ks();let c=Date.now();for(;!a&&Date.now()-c<e;)await Ot(50);return a?(o.lastCapturedVia="write",{get:d=>r(d),set:(d,l)=>a(d,l),sub:(d,l)=>{let u;try{u=r(d)}catch{}let p=setInterval(()=>{let m;try{m=r(d)}catch{return}if(m!==u){u=m;try{l()}catch{}}},100);return()=>clearInterval(p)}}):(s(),o.lastCapturedVia="polyfill",As())}async function Wd(e=1e4){let t=at();ks();let n=Date.now();for(;Date.now()-n<e;){let o=Ts();if(o)return o;await Ot(50)}return t.lastCapturedVia="polyfill",As()}async function jd(){let e=at();if(e.baseStore&&!e.baseStore.__polyfill)return vn(),e.baseStore;if(e.captureInProgress){let t=Date.now(),n=2500;for(;!e.baseStore&&Date.now()-t<n;)await Ot(25);if(e.baseStore)return e.baseStore.__polyfill||vn(),e.baseStore}e.captureInProgress=!0;try{let t=Ts();if(t)return e.baseStore=t,vn(),t;try{let o=await _d(5e3);return e.baseStore=o,o.__polyfill||vn(),o}catch(o){e.captureError=o}let n=await Wd();return e.baseStore=n,n}catch(t){throw e.captureError=t,t}finally{e.captureInProgress=!1}}function Mo(){let e=at();return{via:e.lastCapturedVia,polyfill:!!e.baseStore?.__polyfill,error:e.captureError}}async function Bd(){let e=await jd(),t=new WeakMap,n=async r=>{let a=t.get(r);if(a)return a;a={last:void 0,has:!1,subs:new Set},t.set(r,a);try{a.last=e.get(r),a.has=!0}catch{}let i=e.sub(r,()=>{let s;try{s=e.get(r)}catch{return}let c=a.last,d=!Object.is(s,c)||!a.has;if(a.last=s,a.has=!0,d)for(let l of a.subs)try{l(s,c)}catch{}});return a.unsubUpstream=i,a};return{async get(r){let a=await n(r);if(a.has)return a.last;let i=e.get(r);return a.last=i,a.has=!0,i},async set(r,a){await e.set(r,a);let i=await n(r);i.last=a,i.has=!0},async sub(r,a){let i=await n(r);if(i.subs.add(a),i.has)try{a(i.last,i.last)}catch{}return()=>{i.subs.delete(a)}},getShadow(r){return t.get(r)?.last},hasShadow(r){return!!t.get(r)?.has},async ensureWatch(r){await n(r)},async asStore(){return{get:r=>this.get(r),set:(r,a)=>this.set(r,a),sub:(r,a)=>{let i=null;return this.sub(r,()=>a()).then(s=>i=s),()=>i?.()}}}}}async function Dt(){let e=at();return e.mirror||(e.mirror=await Bd()),e.mirror}var X={async select(e){let t=await Dt(),n=Rt(e);if(!n)throw new Error(`[Store] Atom not found: "${e}"`);return t.get(n)},async set(e,t){let n=await Dt(),o=Rt(e);if(!o)throw new Error(`[Store] Atom not found: "${e}"`);await n.set(o,t)},async subscribe(e,t){let n=await Dt(),o=Rt(e);if(!o)throw new Error(`[Store] Atom not found: "${e}"`);return n.sub(o,r=>{try{t(r)}catch{}})},async subscribeImmediate(e,t){let n=await X.select(e);try{t(n)}catch{}return X.subscribe(e,t)}};async function Io(){await Dt()}function Ht(e){return e?Array.isArray(e)?e.slice():e.split(".").map(t=>t.match(/^\d+$/)?Number(t):t):[]}function He(e,t){let n=Ht(t),o=e;for(let r of n){if(o==null)return;o=o[r]}return o}function Eo(e,t,n){let o=Ht(t);if(!o.length)return n;let r=Array.isArray(e)?[...e]:{...e??{}},a=r;for(let i=0;i<o.length-1;i++){let s=o[i],c=a[s],d=typeof c=="object"&&c!==null?Array.isArray(c)?[...c]:{...c}:{};a[s]=d,a=d}return a[o[o.length-1]]=n,r}function Ps(e,t){let n={};for(let o of t)n[o]=o.includes(".")?He(e,o):e?.[o];try{return JSON.stringify(n)}catch{return String(n)}}function Lo(e,t,n){let o=n.mode??"auto";function r(d){let l=t?He(d,t):d,u=new Map;if(l==null)return{signatures:u,keys:[]};let p=Array.isArray(l);if((o==="array"||o==="auto"&&p)&&p)for(let f=0;f<l.length;f++){let g=l[f],b=n.key?n.key(g,f,d):f,h=n.sig?n.sig(g,f,d):n.fields?Ps(g,n.fields):JSON.stringify(g);u.set(b,h)}else for(let[f,g]of Object.entries(l)){let b=n.key?n.key(g,f,d):f,h=n.sig?n.sig(g,f,d):n.fields?Ps(g,n.fields):JSON.stringify(g);u.set(b,h)}return{signatures:u,keys:Array.from(u.keys())}}function a(d,l){if(d===l)return!0;if(!d||!l||d.size!==l.size)return!1;for(let[u,p]of d)if(l.get(u)!==p)return!1;return!0}async function i(d){let l=null;return X.subscribeImmediate(e,u=>{let p=t?He(u,t):u,{signatures:m}=r(p);if(!a(l,m)){let f=new Set([...l?Array.from(l.keys()):[],...Array.from(m.keys())]),g=[];for(let b of f){let h=l?.get(b)??"__NONE__",w=m.get(b)??"__NONE__";h!==w&&g.push(b)}l=m,d({value:p,changedKeys:g})}})}async function s(d,l){return i(({value:u,changedKeys:p})=>{p.includes(d)&&l({value:u})})}async function c(d,l){let u=new Set(d);return i(({value:p,changedKeys:m})=>{let f=m.filter(g=>u.has(g));f.length&&l({value:p,changedKeys:f})})}return{sub:i,subKey:s,subKeys:c}}var it=new Map;function Vd(e,t){let n=it.get(e);if(n)try{n()}catch{}return it.set(e,t),()=>{try{t()}catch{}it.get(e)===t&&it.delete(e)}}function Q(e,t={}){let{path:n,write:o="replace"}=t,r=n?`${e}:${Ht(n).join(".")}`:e;async function a(){let u=await X.select(e);return n?He(u,n):u}async function i(u){if(typeof o=="function"){let f=await X.select(e),g=o(u,f);return X.set(e,g)}let p=await X.select(e),m=n?Eo(p,n,u):u;return o==="merge-shallow"&&!n&&p&&typeof p=="object"&&typeof u=="object"?X.set(e,{...p,...u}):X.set(e,m)}async function s(u){let p=await a(),m=u(p);return await i(m),m}async function c(u,p,m){let f,g=h=>{let w=n?He(h,n):h;if(typeof f>"u"||!m(f,w)){let T=f;f=w,p(w,T)}},b=u?await X.subscribeImmediate(e,g):await X.subscribe(e,g);return Vd(r,b)}function d(){let u=it.get(r);if(u){try{u()}catch{}it.delete(r)}}function l(u){return Lo(e,u?.path??n,u)}return{label:r,get:a,set:i,update:s,onChange:(u,p=Object.is)=>c(!1,u,p),onChangeNow:(u,p=Object.is)=>c(!0,u,p),asSignature:l,stopOnChange:d}}function y(e){return Q(e)}var Fd=y("positionAtom"),Ud=y("lastPositionInMyGardenAtom"),zd=y("playerDirectionAtom"),$d=y("stateAtom"),Kd=y("quinoaDataAtom"),qd=y("currentTimeAtom"),Jd=y("actionAtom"),Yd=y("isPressAndHoldActionAtom"),Xd=y("mapAtom"),Ro=y("tileSizeAtom"),Qd=Q("mapAtom",{path:"cols"}),Zd=Q("mapAtom",{path:"rows"}),ep=Q("mapAtom",{path:"spawnTiles"}),tp=Q("mapAtom",{path:"locations.seedShop.spawnTileIdx"}),np=Q("mapAtom",{path:"locations.eggShop.spawnTileIdx"}),op=Q("mapAtom",{path:"locations.toolShop.spawnTileIdx"}),rp=Q("mapAtom",{path:"locations.decorShop.spawnTileIdx"}),ap=Q("mapAtom",{path:"locations.sellCropsShop.spawnTileIdx"}),ip=Q("mapAtom",{path:"locations.sellPetShop.spawnTileIdx"}),sp=Q("mapAtom",{path:"locations.collectorsClub.spawnTileIdx"}),lp=Q("mapAtom",{path:"locations.wishingWell.spawnTileIdx"}),cp=Q("mapAtom",{path:"locations.shopsCenter.spawnTileIdx"}),up=y("playerAtom"),dp=y("myDataAtom"),pp=y("myUserSlotIdxAtom"),mp=y("isSpectatingAtom"),fp=y("myCoinsCountAtom"),gp=y("numPlayersAtom"),bp=Q("playerAtom",{path:"id"}),hp=y("userSlotsAtom"),yp=y("filteredUserSlotsAtom"),xp=y("myUserSlotAtom"),vp=y("spectatorsAtom"),wp=Q("stateAtom",{path:"child"}),Sp=Q("stateAtom",{path:"child.data"}),kp=Q("stateAtom",{path:"child.data.shops"}),Oo=Q("stateAtom",{path:"child.data.userSlots"}),Do=Q("stateAtom",{path:"data.players"}),Ho=Q("stateAtom",{path:"data.hostPlayerId"}),Tp=y("myInventoryAtom"),Ap=y("myInventoryItemsAtom"),Pp=y("isMyInventoryAtMaxLengthAtom"),Cp=y("myFavoritedItemIdsAtom"),Mp=y("myCropInventoryAtom"),Ip=y("mySeedInventoryAtom"),Ep=y("myToolInventoryAtom"),Lp=y("myEggInventoryAtom"),Rp=y("myDecorInventoryAtom"),Op=y("myPetInventoryAtom"),Dp=Q("myInventoryAtom",{path:"favoritedItemIds"}),Hp=y("itemTypeFiltersAtom"),Gp=y("myItemStoragesAtom"),Np=y("myPetHutchStoragesAtom"),_p=y("myPetHutchItemsAtom"),Wp=y("myPetHutchPetItemsAtom"),jp=y("myNumPetHutchItemsAtom"),Bp=y("myValidatedSelectedItemIndexAtom"),Vp=y("isSelectedItemAtomSuspended"),Fp=y("mySelectedItemAtom"),Up=y("mySelectedItemNameAtom"),zp=y("mySelectedItemRotationsAtom"),$p=y("mySelectedItemRotationAtom"),Kp=y("setSelectedIndexToEndAtom"),qp=y("myPossiblyNoLongerValidSelectedItemIndexAtom"),Jp=y("myCurrentGlobalTileIndexAtom"),Yp=y("myCurrentGardenTileAtom"),Xp=y("myCurrentGardenObjectAtom"),Qp=y("myOwnCurrentGardenObjectAtom"),Zp=y("myOwnCurrentDirtTileIndexAtom"),em=y("myCurrentGardenObjectNameAtom"),tm=y("isInMyGardenAtom"),nm=y("myGardenBoardwalkTileObjectsAtom"),om=Q("myDataAtom",{path:"garden"}),rm=Q("myDataAtom",{path:"garden.tileObjects"}),am=Q("myOwnCurrentGardenObjectAtom",{path:"objectType"}),im=y("myCurrentStablePlantObjectInfoAtom"),sm=y("myCurrentSortedGrowSlotIndicesAtom"),lm=y("myCurrentGrowSlotIndexAtom"),cm=y("myCurrentGrowSlotsAtom"),um=y("myCurrentGrowSlotAtom"),dm=y("secondsUntilCurrentGrowSlotMaturesAtom"),pm=y("isCurrentGrowSlotMatureAtom"),mm=y("numGrowSlotsAtom"),fm=y("myCurrentEggAtom"),gm=y("petInfosAtom"),bm=y("myPetInfosAtom"),hm=y("myPetSlotInfosAtom"),ym=y("myPrimitivePetSlotsAtom"),xm=y("myNonPrimitivePetSlotsAtom"),vm=y("expandedPetSlotIdAtom"),wm=y("myPetsProgressAtom"),Sm=y("myActiveCropMutationPetsAtom"),km=y("totalPetSellPriceAtom"),Tm=y("selectedPetHasNewVariantsAtom"),Go=y("shopsAtom"),No=y("myShopPurchasesAtom"),Am=y("seedShopAtom"),Pm=y("seedShopInventoryAtom"),Cm=y("seedShopRestockSecondsAtom"),Mm=y("seedShopCustomRestockInventoryAtom"),Im=y("eggShopAtom"),Em=y("eggShopInventoryAtom"),Lm=y("eggShopRestockSecondsAtom"),Rm=y("eggShopCustomRestockInventoryAtom"),Om=y("toolShopAtom"),Dm=y("toolShopInventoryAtom"),Hm=y("toolShopRestockSecondsAtom"),Gm=y("toolShopCustomRestockInventoryAtom"),Nm=y("decorShopAtom"),_m=y("decorShopInventoryAtom"),Wm=y("decorShopRestockSecondsAtom"),jm=y("decorShopCustomRestockInventoryAtom"),Bm=y("isDecorShopAboutToRestockAtom"),Vm=Q("shopsAtom",{path:"seed"}),Fm=Q("shopsAtom",{path:"tool"}),Um=Q("shopsAtom",{path:"egg"}),zm=Q("shopsAtom",{path:"decor"}),$m=y("myCropItemsAtom"),Km=y("myCropItemsToSellAtom"),_o=y("totalCropSellPriceAtom"),Wo=y("friendBonusMultiplierAtom"),qm=y("myJournalAtom"),Jm=y("myCropJournalAtom"),Ym=y("myPetJournalAtom"),Xm=y("myStatsAtom"),Qm=y("myActivityLogsAtom"),jo=y("newLogsAtom"),Zm=y("hasNewLogsAtom"),Bo=y("newCropLogsFromSellingAtom"),Vo=y("hasNewCropLogsFromSellingAtom"),ef=y("myCompletedTasksAtom"),tf=y("myActiveTasksAtom"),nf=y("isWelcomeToastVisibleAtom"),of=y("shouldCloseWelcomeToastAtom"),rf=y("isInitialMoveToDirtPatchToastVisibleAtom"),af=y("isFirstPlantSeedActiveAtom"),sf=y("isThirdSeedPlantActiveAtom"),lf=y("isThirdSeedPlantCompletedAtom"),cf=y("isDemoTouchpadVisibleAtom"),uf=y("areShopAnnouncersEnabledAtom"),df=y("arePresentablesEnabledAtom"),pf=y("isEmptyDirtTileHighlightedAtom"),mf=y("isPlantTileHighlightedAtom"),ff=y("isItemHiglightedInHotbarAtom"),gf=y("isItemHighlightedInModalAtom"),bf=y("isMyGardenButtonHighlightedAtom"),hf=y("isSellButtonHighlightedAtom"),yf=y("isShopButtonHighlightedAtom"),xf=y("isInstaGrowButtonHiddenAtom"),vf=y("isActionButtonHighlightedAtom"),wf=y("isGardenItemInfoCardHiddenAtom"),Sf=y("isSeedPurchaseButtonHighlightedAtom"),kf=y("isFirstSeedPurchaseActiveAtom"),Tf=y("isFirstCropHarvestActiveAtom"),Af=y("isWeatherStatusHighlightedAtom"),Fo=y("weatherAtom"),Pf=y("activeModalAtom"),Cf=y("hotkeyBeingPressedAtom"),Mf=y("avatarTriggerAnimationAtom"),If=y("avatarDataAtom"),Ef=y("emoteDataAtom"),Lf=y("otherUserSlotsAtom"),Rf=y("otherPlayerPositionsAtom"),Of=y("otherPlayerSelectedItemsAtom"),Df=y("otherPlayerLastActionsAtom"),Hf=y("traderBunnyPlayerId"),Gf=y("npcPlayersAtom"),Nf=y("npcQuinoaUsersAtom"),_f=y("numNpcAvatarsAtom"),Wf=y("traderBunnyEmoteTimeoutAtom"),jf=y("traderBunnyEmoteAtom"),Bf=y("unsortedLeaderboardAtom"),Vf=y("currentGardenNameAtom"),Ff=y("quinoaEngineAtom"),Uf=y("quinoaInitializationErrorAtom"),zf=y("avgPingAtom"),$f=y("serverClientTimeOffsetAtom"),Kf=y("isEstablishingShotRunningAtom"),qf=y("isEstablishingShotCompleteAtom");var Cs={currentGardenTile:"myCurrentGardenTileAtom",globalTileIndex:"myCurrentGlobalTileIndexAtom",gardenObject:"myCurrentGardenObjectAtom",isMature:"isGardenObjectMatureAtom",isInMyGarden:"isInMyGardenAtom",gardenName:"currentGardenNameAtom",sortedSlotIndices:"myCurrentSortedGrowSlotIndicesAtom",currentGrowSlotIndex:"myCurrentGrowSlotIndexAtom"},Ms={position:{globalIndex:null,localIndex:null},tile:{type:null,isEmpty:!0},garden:{name:null,isOwner:!1,playerSlotIndex:null},object:{type:null,data:null,isMature:!1},plant:null};function Jf(e){let t=e.currentGardenTile;return{globalIndex:e.globalTileIndex,localIndex:t?.localTileIndex??null}}function Yf(e){return{type:e.currentGardenTile?.tileType??null,isEmpty:e.gardenObject===null}}function Xf(e){let t=e.currentGardenTile;return{name:e.gardenName,isOwner:e.isInMyGarden??!1,playerSlotIndex:t?.userSlotIdx??null}}function Qf(e){let t=e.gardenObject;return t?{type:t.objectType,data:t,isMature:e.isMature??!1}:{type:null,data:null,isMature:!1}}function Zf(e){let t=e.gardenObject;if(!t||t.objectType!=="plant")return null;let n=t,o=e.sortedSlotIndices??[];return{species:n.species,slots:n.slots??[],currentSlotIndex:e.currentGrowSlotIndex,sortedSlotIndices:o,nextHarvestSlotIndex:o.length>0?o[0]:null}}function Is(e){return{position:Jf(e),tile:Yf(e),garden:Xf(e),object:Qf(e),plant:Zf(e)}}function Es(e){return JSON.stringify({globalIndex:e.position.globalIndex,localIndex:e.position.localIndex,tileType:e.tile.type,isEmpty:e.tile.isEmpty,gardenName:e.garden.name,isOwner:e.garden.isOwner,playerSlotIndex:e.garden.playerSlotIndex,objectType:e.object.type,isMature:e.object.isMature,plantSpecies:e.plant?.species??null,slotCount:e.plant?.slots.length??0})}function Gt(e,t){if(e===t)return!0;if(e===null||t===null)return e===t;if(typeof e!=typeof t)return!1;if(typeof e!="object")return e===t;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return!1;for(let i=0;i<e.length;i++)if(!Gt(e[i],t[i]))return!1;return!0}if(Array.isArray(e)||Array.isArray(t))return!1;let n=e,o=t,r=Object.keys(n),a=Object.keys(o);if(r.length!==a.length)return!1;for(let i of r)if(!Object.prototype.hasOwnProperty.call(o,i)||!Gt(n[i],o[i]))return!1;return!0}function eg(e,t){return e.type!==t.type||e.isMature!==t.isMature?!0:e.data===null&&t.data===null?!1:e.data===null||t.data===null?!0:!Gt(e.data,t.data)}function tg(e,t){return e===null&&t===null?!1:e===null||t===null||e.species!==t.species||e.currentSlotIndex!==t.currentSlotIndex||e.nextHarvestSlotIndex!==t.nextHarvestSlotIndex||e.slots.length!==t.slots.length?!0:!Gt(e.sortedSlotIndices,t.sortedSlotIndices)}function ng(e,t){return e.name!==t.name||e.isOwner!==t.isOwner||e.playerSlotIndex!==t.playerSlotIndex}function og(){let e=Ms,t=Ms,n=!1,o=[],r={all:new Set,stable:new Set,object:new Set,plantInfo:new Set,garden:new Set},a={},i=Object.keys(Cs),s=new Set;function c(){if(s.size<i.length)return;let l=Is(a);if(!Gt(e,l)&&(t=e,e=l,!!n)){for(let u of r.all)u(e,t);if(Es(t)!==Es(e))for(let u of r.stable)u(e,t);if(eg(t.object,e.object)){let u={current:e.object,previous:t.object};for(let p of r.object)p(u)}if(tg(t.plant,e.plant)){let u={current:e.plant,previous:t.plant};for(let p of r.plantInfo)p(u)}if(ng(t.garden,e.garden)){let u={current:e.garden,previous:t.garden};for(let p of r.garden)p(u)}}}async function d(){if(n)return;let l=i.map(async u=>{let p=Cs[u],m=await X.subscribe(p,f=>{a[u]=f,s.add(u),c()});o.push(m)});await Promise.all(l),n=!0,s.size===i.length&&(e=Is(a))}return d(),{get(){return e},subscribe(l){return r.all.add(l),n&&s.size===i.length&&l(e,e),()=>r.all.delete(l)},subscribeStable(l){return r.stable.add(l),n&&s.size===i.length&&l(e,e),()=>r.stable.delete(l)},subscribeObject(l){return r.object.add(l),()=>r.object.delete(l)},subscribePlantInfo(l){return r.plantInfo.add(l),()=>r.plantInfo.delete(l)},subscribeGarden(l){return r.garden.add(l),()=>r.garden.delete(l)},destroy(){for(let l of o)l();o.length=0,r.all.clear(),r.stable.clear(),r.object.clear(),r.plantInfo.clear(),r.garden.clear(),n=!1}}}var Uo=null;function zo(){return Uo||(Uo=og()),Uo}var Ls={inventory:"myPetInventoryAtom",hutch:"myPetHutchPetItemsAtom",active:"myPetInfosAtom",slotInfos:"myPetSlotInfosAtom"};function Rs(e,t){return{id:e.id,petSpecies:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,mutations:[...e.mutations],targetScale:e.targetScale,abilities:[...e.abilities],location:t,position:null,lastAbilityTrigger:null}}function rg(e,t){let o=t[e.slot.id]?.lastAbilityTrigger??null;return{id:e.slot.id,petSpecies:e.slot.petSpecies,name:e.slot.name,xp:e.slot.xp,hunger:e.slot.hunger,mutations:[...e.slot.mutations],targetScale:e.slot.targetScale,abilities:[...e.slot.abilities],location:"active",position:e.position?{x:e.position.x,y:e.position.y}:null,lastAbilityTrigger:o}}function Os(e){let t=new Set,n=[];for(let i of e.active??[]){let s=rg(i,e.slotInfos??{});n.push(s),t.add(s.id)}let o=[];for(let i of e.inventory??[]){if(t.has(i.id))continue;let s=Rs(i,"inventory");o.push(s),t.add(s.id)}let r=[];for(let i of e.hutch??[]){if(t.has(i.id))continue;let s=Rs(i,"hutch");r.push(s),t.add(s.id)}let a=[...n,...o,...r];return{all:a,byLocation:{inventory:o,hutch:r,active:n},counts:{inventory:o.length,hutch:r.length,active:n.length,total:a.length}}}var Ds={all:[],byLocation:{inventory:[],hutch:[],active:[]},counts:{inventory:0,hutch:0,active:0,total:0}};function ag(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}function Hs(e){return JSON.stringify({id:e.id,petSpecies:e.petSpecies,name:e.name,mutations:e.mutations,abilities:e.abilities,location:e.location})}function ig(e,t){if(e.all.length!==t.all.length)return!1;let n=e.all.map(Hs),o=t.all.map(Hs);return ag(n,o)}function Ko(e,t){if(e===t)return!0;if(e===null||t===null)return e===t;if(typeof e!=typeof t)return!1;if(typeof e!="object")return e===t;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return!1;for(let i=0;i<e.length;i++)if(!Ko(e[i],t[i]))return!1;return!0}if(Array.isArray(e)||Array.isArray(t))return!1;let n=e,o=t,r=Object.keys(n),a=Object.keys(o);if(r.length!==a.length)return!1;for(let i of r)if(!Object.prototype.hasOwnProperty.call(o,i)||!Ko(n[i],o[i]))return!1;return!0}function sg(e,t){let n=[],o=new Map(e.all.map(r=>[r.id,r]));for(let r of t.all){let a=o.get(r.id);a&&a.location!==r.location&&n.push({pet:r,from:a.location,to:r.location})}return n}function lg(e,t){let n=[],o=new Map(e.all.map(r=>[r.id,r]));for(let r of t.all){if(!r.lastAbilityTrigger)continue;let i=o.get(r.id)?.lastAbilityTrigger;(!i||i.abilityId!==r.lastAbilityTrigger.abilityId||i.performedAt!==r.lastAbilityTrigger.performedAt)&&n.push({pet:r,trigger:r.lastAbilityTrigger})}return n}function cg(e,t){let n=new Set(e.all.map(i=>i.id)),o=new Set(t.all.map(i=>i.id)),r=t.all.filter(i=>!n.has(i.id)),a=e.all.filter(i=>!o.has(i.id));return r.length===0&&a.length===0?null:{added:r,removed:a,counts:t.counts}}function ug(){let e=Ds,t=Ds,n=!1,o=[],r={all:new Set,stable:new Set,location:new Set,ability:new Set,count:new Set},a={},i=Object.keys(Ls),s=new Set;function c(){if(s.size<i.length)return;let l=Os(a);if(Ko(e,l)||(t=e,e=l,!n))return;for(let f of r.all)f(e,t);if(!ig(t,e))for(let f of r.stable)f(e,t);let u=sg(t,e);for(let f of u)for(let g of r.location)g(f);let p=lg(t,e);for(let f of p)for(let g of r.ability)g(f);let m=cg(t,e);if(m)for(let f of r.count)f(m)}async function d(){if(n)return;let l=i.map(async u=>{let p=Ls[u],m=await X.subscribe(p,f=>{a[u]=f,s.add(u),c()});o.push(m)});await Promise.all(l),n=!0,s.size===i.length&&(e=Os(a))}return d(),{get(){return e},subscribe(l){return r.all.add(l),n&&s.size===i.length&&l(e,e),()=>r.all.delete(l)},subscribeStable(l){return r.stable.add(l),n&&s.size===i.length&&l(e,e),()=>r.stable.delete(l)},subscribeLocation(l){return r.location.add(l),()=>r.location.delete(l)},subscribeAbility(l){return r.ability.add(l),()=>r.ability.delete(l)},subscribeCount(l){return r.count.add(l),()=>r.count.delete(l)},destroy(){for(let l of o)l();o.length=0,r.all.clear(),r.stable.clear(),r.location.clear(),r.ability.clear(),r.count.clear(),n=!1}}}var $o=null;function qo(){return $o||($o=ug()),$o}function dg(){let e=null,t=[],n=new Set,o={},r=new Set,a=2;function i(u,p){return{x:p%u,y:Math.floor(p/u)}}function s(u,p,m){return m*u+p}function c(u,p){let{cols:m,rows:f}=u,g=m*f,b=new Set,h=new Set,w=new Map,T=[],x=u.userSlotIdxAndDirtTileIdxToGlobalTileIdx??[],v=u.userSlotIdxAndBoardwalkTileIdxToGlobalTileIdx??[],k=Math.max(x.length,v.length);for(let A=0;A<k;A++){let R=x[A]??[],M=v[A]??[],U=R.map((K,_)=>(b.add(K),w.set(K,A),{globalIndex:K,localIndex:_,position:i(m,K)})),J=M.map((K,_)=>(h.add(K),w.set(K,A),{globalIndex:K,localIndex:_,position:i(m,K)}));T.push({userSlotIdx:A,dirtTiles:U,boardwalkTiles:J,allTiles:[...U,...J]})}let L=u.spawnTiles.map(A=>i(m,A)),E={};if(u.locations)for(let[A,R]of Object.entries(u.locations)){let M=R.spawnTileIdx??[];E[A]={name:A,spawnTiles:M,spawnPositions:M.map(U=>i(m,U))}}return{cols:m,rows:f,totalTiles:g,tileSize:p,spawnTiles:u.spawnTiles,spawnPositions:L,locations:E,userSlots:T,globalToXY(A){return i(m,A)},xyToGlobal(A,R){return s(m,A,R)},getTileOwner(A){return w.get(A)??null},isDirtTile(A){return b.has(A)},isBoardwalkTile(A){return h.has(A)}}}function d(){if(r.size<a||e)return;let u=o.map,p=o.tileSize??0;if(u){e=c(u,p);for(let m of n)m(e);n.clear()}}async function l(){let u=await X.subscribe("mapAtom",m=>{o.map=m,r.add("map"),d()});t.push(u);let p=await Ro.onChangeNow(m=>{o.tileSize=m,r.add("tileSize"),d()});t.push(p)}return l(),{get(){return e},isReady(){return e!==null},onReady(u){return e?(u(e),()=>{}):(n.add(u),()=>n.delete(u))},destroy(){for(let u of t)u();t.length=0,e=null,n.clear()}}}var Jo=null;function Yo(){return Jo||(Jo=dg()),Jo}var Gs={inventory:"myInventoryAtom",isFull:"isMyInventoryAtMaxLengthAtom",selectedItemIndex:"myPossiblyNoLongerValidSelectedItemIndexAtom"},Ns={items:[],favoritedItemIds:[],count:0,isFull:!1,selectedItem:null};function _s(e){let t=e.inventory,n=t?.items??[],o=t?.favoritedItemIds??[],r=e.selectedItemIndex,a=null;return r!==null&&r>=0&&r<n.length&&(a={index:r,item:n[r]}),{items:n,favoritedItemIds:o,count:n.length,isFull:e.isFull??!1,selectedItem:a}}function Ws(e){let t=e.items.map(n=>"id"in n?n.id:"species"in n&&n.itemType==="Seed"?`seed:${n.species}:${n.quantity}`:"toolId"in n?`tool:${n.toolId}:${n.quantity}`:"eggId"in n?`egg:${n.eggId}:${n.quantity}`:"decorId"in n?`decor:${n.decorId}:${n.quantity}`:JSON.stringify(n));return JSON.stringify({itemKeys:t,favoritedItemIds:e.favoritedItemIds,isFull:e.isFull,selectedItemIndex:e.selectedItem?.index??null})}function pg(e,t){return Ws(e)===Ws(t)}function Qo(e,t){if(e===t)return!0;if(e===null||t===null)return e===t;if(typeof e!=typeof t)return!1;if(typeof e!="object")return e===t;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return!1;for(let i=0;i<e.length;i++)if(!Qo(e[i],t[i]))return!1;return!0}if(Array.isArray(e)||Array.isArray(t))return!1;let n=e,o=t,r=Object.keys(n),a=Object.keys(o);if(r.length!==a.length)return!1;for(let i of r)if(!Object.prototype.hasOwnProperty.call(o,i)||!Qo(n[i],o[i]))return!1;return!0}function mg(e,t){return e===null&&t===null?!1:e===null||t===null?!0:e.index!==t.index}function Sn(e){return"id"in e?e.id:"species"in e&&e.itemType==="Seed"?`seed:${e.species}`:"toolId"in e?`tool:${e.toolId}`:"eggId"in e?`egg:${e.eggId}`:"decorId"in e?`decor:${e.decorId}`:JSON.stringify(e)}function fg(e,t){let n=new Set(e.map(Sn)),o=new Set(t.map(Sn)),r=t.filter(i=>!n.has(Sn(i))),a=e.filter(i=>!o.has(Sn(i)));return r.length===0&&a.length===0?null:{added:r,removed:a,counts:{before:e.length,after:t.length}}}function gg(e,t){let n=new Set(e),o=new Set(t),r=t.filter(i=>!n.has(i)),a=e.filter(i=>!o.has(i));return r.length===0&&a.length===0?null:{added:r,removed:a,current:t}}function bg(){let e=Ns,t=Ns,n=!1,o=[],r={all:new Set,stable:new Set,selection:new Set,items:new Set,favorites:new Set},a={},i=Object.keys(Gs),s=new Set;function c(){if(s.size<i.length)return;let l=_s(a);if(Qo(e,l)||(t=e,e=l,!n))return;for(let m of r.all)m(e,t);if(!pg(t,e))for(let m of r.stable)m(e,t);if(mg(t.selectedItem,e.selectedItem)){let m={current:e.selectedItem,previous:t.selectedItem};for(let f of r.selection)f(m)}let u=fg(t.items,e.items);if(u)for(let m of r.items)m(u);let p=gg(t.favoritedItemIds,e.favoritedItemIds);if(p)for(let m of r.favorites)m(p)}async function d(){if(n)return;let l=i.map(async u=>{let p=Gs[u],m=await X.subscribe(p,f=>{a[u]=f,s.add(u),c()});o.push(m)});await Promise.all(l),n=!0,s.size===i.length&&(e=_s(a))}return d(),{get(){return e},subscribe(l){return r.all.add(l),n&&s.size===i.length&&l(e,e),()=>r.all.delete(l)},subscribeStable(l){return r.stable.add(l),n&&s.size===i.length&&l(e,e),()=>r.stable.delete(l)},subscribeSelection(l){return r.selection.add(l),()=>r.selection.delete(l)},subscribeItems(l){return r.items.add(l),()=>r.items.delete(l)},subscribeFavorites(l){return r.favorites.add(l),()=>r.favorites.delete(l)},destroy(){for(let l of o)l();o.length=0,r.all.clear(),r.stable.clear(),r.selection.clear(),r.items.clear(),r.favorites.clear(),n=!1}}}var Xo=null;function Zo(){return Xo||(Xo=bg()),Xo}var tr={all:[],host:null,count:0};function hg(e,t,n){let o=n.get(e.id),r=o?.slot,a=r?.data,i=r?.lastActionEvent;return{id:e.id,name:e.name,discordId:e.databaseUserId,discordAvatarUrl:e.discordAvatarUrl,guildId:e.guildId,isConnected:e.isConnected,isHost:e.id===t,slotIndex:o?.index??null,position:r?.position??null,cosmetic:{color:e.cosmetic?.color??"",avatar:e.cosmetic?.avatar?[...e.cosmetic.avatar]:[]},emote:{type:e.emoteData?.emoteType??-1},coins:a?.coinsCount??0,inventory:a?.inventory??null,shopPurchases:a?.shopPurchases??null,garden:a?.garden??null,pets:{slots:a?.petSlots??[],slotInfos:r?.petSlotInfos??null},journal:a?.journal??null,stats:a?.stats??null,tasksCompleted:a?.tasksCompleted??[],activityLogs:a?.activityLogs??[],customRestocks:{config:a?.customRestocks??null,inventories:r?.customRestockInventories??null},lastAction:i?{type:i.action,data:i.data,timestamp:i.timestamp}:null,selectedItemIndex:r?.notAuthoritative_selectedItemIndex??null,lastSlotMachineInfo:r?.lastSlotMachineInfo??null}}function js(e){let t=e.players,n=e.hostPlayerId??"",o=e.userSlots??[];if(!t||!Array.isArray(t)||t.length===0)return tr;let r=new Map;Array.isArray(o)&&o.forEach((s,c)=>{s?.type==="user"&&s?.playerId&&r.set(s.playerId,{slot:s,index:c})});let a=t.map(s=>hg(s,n,r)),i=a.find(s=>s.isHost)??null;return{all:a,host:i,count:a.length}}function Bs(e){let t=e.all.map(n=>`${n.id}:${n.isConnected}:${n.isHost}`);return JSON.stringify({playerKeys:t,hostId:e.host?.id??null,count:e.count})}function nr(e,t){if(e===t)return!0;if(e===null||t===null)return e===t;if(typeof e!=typeof t)return!1;if(typeof e!="object")return e===t;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return!1;for(let i=0;i<e.length;i++)if(!nr(e[i],t[i]))return!1;return!0}if(Array.isArray(e)||Array.isArray(t))return!1;let n=e,o=t,r=Object.keys(n),a=Object.keys(o);if(r.length!==a.length)return!1;for(let i of r)if(!Object.prototype.hasOwnProperty.call(o,i)||!nr(n[i],o[i]))return!1;return!0}function yg(e,t){let n=[],o=new Set(e.map(a=>a.id)),r=new Set(t.map(a=>a.id));for(let a of t)o.has(a.id)||n.push({player:a,type:"join"});for(let a of e)r.has(a.id)||n.push({player:a,type:"leave"});return n}function xg(e,t){let n=[],o=new Map(e.map(r=>[r.id,r]));for(let r of t){let a=o.get(r.id);a&&a.isConnected!==r.isConnected&&n.push({player:r,isConnected:r.isConnected})}return n}function vg(){let e=tr,t=tr,n=!1,o=[],r={all:new Set,stable:new Set,joinLeave:new Set,connection:new Set,host:new Set},a={},i=new Set,s=3;function c(){if(i.size<s)return;let l=js(a);if(nr(e,l)||(t=e,e=l,!n))return;for(let g of r.all)g(e,t);if(Bs(t)!==Bs(e))for(let g of r.stable)g(e,t);let u=yg(t.all,e.all);for(let g of u)for(let b of r.joinLeave)b(g);let p=xg(t.all,e.all);for(let g of p)for(let b of r.connection)b(g);let m=t.host?.id??null,f=e.host?.id??null;if(m!==f){let g={current:e.host,previous:t.host};for(let b of r.host)b(g)}}async function d(){if(n)return;let l=await Do.onChangeNow(m=>{a.players=m,i.add("players"),c()});o.push(l);let u=await Ho.onChangeNow(m=>{a.hostPlayerId=m,i.add("hostPlayerId"),c()});o.push(u);let p=await Oo.onChangeNow(m=>{a.userSlots=m,i.add("userSlots"),c()});o.push(p),n=!0,i.size===s&&(e=js(a))}return d(),{get(){return e},subscribe(l){return r.all.add(l),n&&i.size===s&&l(e,e),()=>r.all.delete(l)},subscribeStable(l){return r.stable.add(l),n&&i.size===s&&l(e,e),()=>r.stable.delete(l)},subscribeJoinLeave(l){return r.joinLeave.add(l),()=>r.joinLeave.delete(l)},subscribeConnection(l){return r.connection.add(l),()=>r.connection.delete(l)},subscribeHost(l){return r.host.add(l),()=>r.host.delete(l)},destroy(){for(let l of o)l();o.length=0,r.all.clear(),r.stable.clear(),r.joinLeave.clear(),r.connection.clear(),r.host.clear(),n=!1}}}var er=null;function or(){return er||(er=vg()),er}var Nt=["seed","tool","egg","decor"];function wg(e,t){switch(t){case"seed":return e.species??e.itemType;case"tool":return e.toolId??e.itemType;case"egg":return e.eggId??e.itemType;case"decor":return e.decorId??e.itemType;default:return e.itemType}}function Sg(e,t,n){let o=wg(e,t),r=n[o]??0,a=Math.max(0,e.initialStock-r);return{id:o,itemType:e.itemType,initialStock:e.initialStock,purchased:r,remaining:a,isAvailable:a>0}}function kg(e,t,n){if(!t)return{type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null};let r=n[e]?.purchases??{},a=(t.inventory??[]).map(d=>Sg(d,e,r)),i=a.filter(d=>d.isAvailable).length,s=t.secondsUntilRestock??0,c=s>0?Date.now()+s*1e3:null;return{type:e,items:a,availableCount:i,totalCount:a.length,secondsUntilRestock:s,restockAt:c}}function Vs(e){let t=e.shops,n=e.purchases??{},o=Nt.map(s=>kg(s,t?.[s],n)),r={seed:o[0],tool:o[1],egg:o[2],decor:o[3]},a=o.filter(s=>s.restockAt!==null),i=null;if(a.length>0){let c=a.sort((d,l)=>(d.restockAt??0)-(l.restockAt??0))[0];i={shop:c.type,seconds:c.secondsUntilRestock,at:c.restockAt}}return{all:o,byType:r,nextRestock:i}}var Fs={all:Nt.map(e=>({type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null})),byType:{seed:{type:"seed",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},tool:{type:"tool",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},egg:{type:"egg",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},decor:{type:"decor",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null}},nextRestock:null};function ar(e,t){if(e===t)return!0;if(e===null||t===null)return e===t;if(typeof e!=typeof t)return!1;if(typeof e!="object")return e===t;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return!1;for(let i=0;i<e.length;i++)if(!ar(e[i],t[i]))return!1;return!0}if(Array.isArray(e)||Array.isArray(t))return!1;let n=e,o=t,r=Object.keys(n),a=Object.keys(o);if(r.length!==a.length)return!1;for(let i of r)if(!Object.prototype.hasOwnProperty.call(o,i)||!ar(n[i],o[i]))return!1;return!0}function Us(e){return JSON.stringify({shops:e.all.map(t=>({type:t.type,itemCount:t.items.length,availableCount:t.availableCount}))})}function Tg(e,t){let n=e.secondsUntilRestock,o=t.secondsUntilRestock;return n>0&&n<=5&&o>n||n>0&&o===0&&t.items.some(a=>a.purchased===0)?{shop:t,previousItems:e.items}:null}function Ag(e,t){let n=[];for(let o of Nt){let r=e.byType[o],a=t.byType[o],i=new Map(r.items.map(s=>[s.id,s]));for(let s of a.items){let c=i.get(s.id);c&&s.purchased>c.purchased&&n.push({shopType:o,itemId:s.id,quantity:s.purchased-c.purchased,newPurchased:s.purchased,remaining:s.remaining})}}return n}function Pg(e,t){let n=[];for(let o of Nt){let r=e.byType[o],a=t.byType[o],i=new Map(r.items.map(s=>[s.id,s]));for(let s of a.items){let c=i.get(s.id);c&&c.isAvailable!==s.isAvailable&&n.push({shopType:o,itemId:s.id,wasAvailable:c.isAvailable,isAvailable:s.isAvailable})}}return n}function Cg(){let e=Fs,t=Fs,n=!1,o=[],r={all:new Set,stable:new Set,seedRestock:new Set,toolRestock:new Set,eggRestock:new Set,decorRestock:new Set,purchase:new Set,availability:new Set},a={},i=new Set,s=2;function c(){if(i.size<s)return;let l=Vs(a);if(ar(e,l)||(t=e,e=l,!n))return;for(let f of r.all)f(e,t);if(Us(t)!==Us(e))for(let f of r.stable)f(e,t);let u={seed:r.seedRestock,tool:r.toolRestock,egg:r.eggRestock,decor:r.decorRestock};for(let f of Nt){let g=Tg(t.byType[f],e.byType[f]);if(g)for(let b of u[f])b(g)}let p=Ag(t,e);for(let f of p)for(let g of r.purchase)g(f);let m=Pg(t,e);for(let f of m)for(let g of r.availability)g(f)}async function d(){if(n)return;let l=await Go.onChangeNow(p=>{a.shops=p,i.add("shops"),c()});o.push(l);let u=await No.onChangeNow(p=>{a.purchases=p,i.add("purchases"),c()});o.push(u),n=!0,i.size===s&&(e=Vs(a))}return d(),{get(){return e},getShop(l){return e.byType[l]},getItem(l,u){return e.byType[l].items.find(m=>m.id===u)??null},subscribe(l){return r.all.add(l),n&&i.size===s&&l(e,e),()=>r.all.delete(l)},subscribeStable(l){return r.stable.add(l),n&&i.size===s&&l(e,e),()=>r.stable.delete(l)},subscribeSeedRestock(l){return r.seedRestock.add(l),()=>r.seedRestock.delete(l)},subscribeToolRestock(l){return r.toolRestock.add(l),()=>r.toolRestock.delete(l)},subscribeEggRestock(l){return r.eggRestock.add(l),()=>r.eggRestock.delete(l)},subscribeDecorRestock(l){return r.decorRestock.add(l),()=>r.decorRestock.delete(l)},subscribePurchase(l){return r.purchase.add(l),()=>r.purchase.delete(l)},subscribeAvailability(l){return r.availability.add(l),()=>r.availability.delete(l)},destroy(){for(let l of o)l();o.length=0,r.all.clear(),r.stable.clear(),r.seedRestock.clear(),r.toolRestock.clear(),r.eggRestock.clear(),r.decorRestock.clear(),r.purchase.clear(),r.availability.clear(),n=!1}}}var rr=null;function ir(){return rr||(rr=Cg()),rr}var Mg=["Sunny","Rain","Frost","Dawn","AmberMoon"];function Ig(e){return Mg.includes(e)}var lr={type:"Sunny",isActive:!1,startTime:null,endTime:null,remainingSeconds:0};function Eg(e){if(!e)return lr;let t=Date.now(),n=e.endTime??0,o=Math.max(0,n-t),r=Math.floor(o/1e3),a=r>0,i=e.type??"Sunny";return{type:Ig(i)?i:"Sunny",isActive:a,startTime:e.startTime??null,endTime:e.endTime??null,remainingSeconds:r}}function Lg(){let e=lr,t=lr,n=!1,o=null,r={all:new Set,change:new Set};function a(s){let c=Eg(s);if(e.type===c.type&&e.isActive===c.isActive&&e.startTime===c.startTime&&e.endTime===c.endTime){e=c;return}if(t=e,e=c,!!n){for(let d of r.all)d(e,t);if(t.type!==e.type||t.isActive!==e.isActive){let d={current:e,previous:t};for(let l of r.change)l(d)}}}async function i(){n||(o=await Fo.onChangeNow(s=>{a(s)}),n=!0)}return i(),{get(){return e},subscribe(s){return r.all.add(s),n&&s(e,e),()=>r.all.delete(s)},subscribeChange(s){return r.change.add(s),()=>r.change.delete(s)},destroy(){o?.(),o=null,r.all.clear(),r.change.clear(),n=!1}}}var sr=null;function cr(){return sr||(sr=Lg()),sr}var Ge={},qs={crops:{all:Ge,fromSelling:Ge},pets:{variants:Ge,abilities:Ge},hasPending:!1,totalCount:0},zs={totalPrice:0,friendBonus:1,hasNewLogs:!1,recentLogs:[],pendingLogs:qs};function Rg(e){if(!e||typeof e!="object")return null;let t=e;return t.species?{species:t.species,quantity:t.quantity??1,price:t.price??0,timestamp:t.timestamp??Date.now()}:null}function ur(e){let t=0;for(let n of Object.keys(e))t+=e[n].length;return t}function Og(e){if(!e)return qs;let t=e.allNewCropVariants??Ge,n=e.newCropVariantsFromSelling??Ge,o=e.newPetVariants??Ge,r=e.newPetAbilities??Ge,a=ur(t)+ur(o)+ur(r);return{crops:{all:t,fromSelling:n},pets:{variants:o,abilities:r},hasPending:a>0,totalCount:a}}function $s(e){let t=[];for(let n of e.rawLogs??[]){let o=Rg(n);o&&t.push(o)}return{totalPrice:e.totalPrice??0,friendBonus:e.friendBonus??1,hasNewLogs:e.hasNewLogs??!1,recentLogs:t,pendingLogs:Og(e.newLogs)}}function Dg(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(e[n].species!==t[n].species||e[n].quantity!==t[n].quantity||e[n].price!==t[n].price||e[n].timestamp!==t[n].timestamp)return!1;return!0}function Ks(e,t){return e.totalCount!==t.totalCount||e.hasPending!==t.hasPending?!1:JSON.stringify(e)===JSON.stringify(t)}function Hg(){let e=zs,t=zs,n=!1,o=[],r={all:new Set,sell:new Set,newLogs:new Set},a={},i=new Set,s=5;function c(){if(i.size<s)return;let l=$s(a);if((e.totalPrice!==l.totalPrice||e.friendBonus!==l.friendBonus||e.hasNewLogs!==l.hasNewLogs||!Dg(e.recentLogs,l.recentLogs)||!Ks(e.pendingLogs,l.pendingLogs))&&(t=e,e=l,!!n)){for(let p of r.all)p(e,t);if(e.hasNewLogs&&e.recentLogs.length>t.recentLogs.length){let p=e.recentLogs.slice(t.recentLogs.length);if(p.length>0){let m={logs:p,totalPrice:e.totalPrice};for(let f of r.sell)f(m)}}if(!Ks(e.pendingLogs,t.pendingLogs)){let p={pendingLogs:e.pendingLogs,previous:t.pendingLogs};for(let m of r.newLogs)m(p)}}}async function d(){if(n)return;let l=await _o.onChangeNow(g=>{a.totalPrice=g,i.add("totalPrice"),c()});o.push(l);let u=await Wo.onChangeNow(g=>{a.friendBonus=g,i.add("friendBonus"),c()});o.push(u);let p=await Vo.onChangeNow(g=>{a.hasNewLogs=g,i.add("hasNewLogs"),c()});o.push(p);let m=await Bo.onChangeNow(g=>{a.rawLogs=g,i.add("rawLogs"),c()});o.push(m);let f=await jo.onChangeNow(g=>{a.newLogs=g,i.add("newLogs"),c()});o.push(f),n=!0,i.size===s&&(e=$s(a))}return d(),{get(){return e},subscribe(l){return r.all.add(l),n&&i.size===s&&l(e,e),()=>r.all.delete(l)},subscribeSell(l){return r.sell.add(l),()=>r.sell.delete(l)},subscribeNewLogs(l){return r.newLogs.add(l),()=>r.newLogs.delete(l)},destroy(){for(let l of o)l();o.length=0,r.all.clear(),r.sell.clear(),r.newLogs.clear(),n=!1}}}var dr=null;function pr(){return dr||(dr=Hg()),dr}var ae=null;function kn(){return ae||(ae={currentTile:zo(),myPets:qo(),gameMap:Yo(),myInventory:Zo(),players:or(),shops:ir(),weather:cr(),sellInfo:pr()},ae)}function Te(){if(!ae)throw new Error("[Globals] Not initialized. Call initGlobals() first.");return ae}function Js(){ae&&(ae.currentTile.destroy(),ae.myPets.destroy(),ae.gameMap.destroy(),ae.myInventory.destroy(),ae.players.destroy(),ae.shops.destroy(),ae.weather.destroy(),ae.sellInfo.destroy(),ae=null)}var Ys={get currentTile(){return Te().currentTile},get myPets(){return Te().myPets},get gameMap(){return Te().gameMap},get myInventory(){return Te().myInventory},get players(){return Te().players},get shops(){return Te().shops},get weather(){return Te().weather},get sellInfo(){return Te().sellInfo}};var Gg={Store:{select:X.select.bind(X),set:X.set.bind(X),subscribe:X.subscribe.bind(X),subscribeImmediate:X.subscribeImmediate.bind(X)},Globals:Ys,Modules:{Version:xt,Assets:ye,Manifest:me,Data:St,Sprite:Se,Tile:ke,Pixi:Tt,Audio:It,Cosmetic:Et},WebSocket:{chat:Yt,emote:zr,wish:$r,kickPlayer:Kr,setPlayerData:qr,usurpHost:Jr,reportSpeakingStart:Yr,setSelectedGame:Xr,voteForGame:Qr,requestGame:Zr,restartGame:ea,ping:ta,checkWeatherStatus:ra,move:na,playerPosition:On,teleport:oa,moveInventoryItem:aa,dropObject:ia,pickupObject:sa,toggleFavoriteItem:la,putItemInStorage:ca,retrieveItemFromStorage:ua,moveStorageItem:da,logItems:pa,plantSeed:ma,waterPlant:fa,harvestCrop:ga,sellAllCrops:ba,purchaseDecor:ha,purchaseEgg:ya,purchaseTool:xa,purchaseSeed:va,plantEgg:wa,hatchEgg:Sa,plantGardenPlant:ka,potPlant:Ta,mutationPotion:Aa,pickupDecor:Pa,placeDecor:Ca,removeGardenObject:Ma,placePet:Ia,feedPet:Ea,petPositions:La,swapPet:Ra,storePet:Oa,namePet:Da,sellPet:Ha},_internal:{getGlobals:Te,initGlobals:kn,destroyGlobals:Js}};function Xs(){P.Gemini=Gg}function mr(e){e.logStep("WebSocket","Capturing WebSocket...");let t=null;return t=Jt(n=>{n.ws&&(e.logStep("WebSocket","WebSocket captured","success"),t?.(),t=null)},{intervalMs:250}),di({debug:!1}),()=>{t?.(),t=null}}async function fr(e){e.logStep("Atoms","Prewarming Jotai store...");try{await Io(),await wn({timeoutMs:8e3,intervalMs:50}),e.logStep("Atoms","Jotai store ready","success")}catch(t){e.logStep("Atoms","Jotai store not captured yet","error"),console.warn("[Bootstrap] Jotai store wait failed",t)}}function gr(e){e.logStep("Globals","Initializing global variables...");try{kn(),e.logStep("Globals","Global variables ready","success")}catch(t){e.logStep("Globals","Failed to initialize global variables","error"),console.warn("[Bootstrap] Global variables init failed",t)}}function br(e){e.logStep("API","Exposing Gemini API...");try{Xs(),e.logStep("API","Gemini API ready","success")}catch(t){e.logStep("API","Failed to expose API","error"),console.warn("[Bootstrap] API init failed",t)}}function hr(e){e.logStep("HUD","Loading HUD preferences...");let t=Vn(),n=Bn({hostId:"gemini-hud-root",initialWidth:t.width,initialOpen:t.isOpen,onWidthChange:o=>Xe("width",o),onOpenChange:o=>Xe("isOpen",o),themes:Oe,initialTheme:t.theme,onThemeChange:o=>Xe("theme",o),buildSections:o=>Dn({applyTheme:o.applyTheme,initialTheme:o.initialTheme,getCurrentTheme:o.getCurrentTheme}),initialTab:t.activeTab,onTabChange:o=>Xe("activeTab",o)});return e.logStep("HUD","HUD ready","success"),n}async function yr(e){e.setSubtitle("Activating Gemini modules..."),await ws(t=>{t.status==="start"?e.logStep(t.name,`Loading ${t.name}...`):t.status==="success"?e.logStep(t.name,`${t.name} ready`,"success"):e.logStep(t.name,`${t.name} encountered an issue.`,"error")})}(async function(){"use strict";let e=An({title:"Gemini is loading",subtitle:"Connecting and preparing modules..."}),t=null,n=null;try{t=mr(e),await fr(e),gr(e),br(e),n=hr(e),await yr(e),e.succeed("Gemini is ready!")}catch(o){e.fail("Failed to initialize the mod.",o)}finally{t?.()}if(n){let o=n;Qt({onClick:()=>o.setOpen(!0)})}})();})();
