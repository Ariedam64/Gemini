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
"use strict";(()=>{var br=Object.defineProperty;var Xs=(e,t,n)=>t in e?br(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Ys=(e,t)=>()=>(e&&(t=e(e=0)),t);var Qs=(e,t)=>{for(var n in t)br(e,n,{get:t[n],enumerable:!0})};var Se=(e,t,n)=>Xs(e,typeof t!="symbol"?t+"":t,n);var ci={};Qs(ci,{clamp:()=>me,clamp01:()=>Xn,sleep:()=>Ae,tryDo:()=>de,waitWithTimeout:()=>en});async function en(e,t,n){let r=performance.now();for(;performance.now()-r<t;){let o=await Promise.race([e,Ae(50).then(()=>null)]);if(o!==null)return o}throw new Error(`${n} timeout`)}var Ae,de,me,Xn,Ie=Ys(()=>{"use strict";Ae=e=>new Promise(t=>setTimeout(t,e)),de=e=>{try{return e()}catch{return}},me=(e,t,n)=>Math.max(t,Math.min(n,e)),Xn=e=>me(e,0,1)});function T(e,t=null,...n){let r=document.createElement(e);for(let[o,a]of Object.entries(t||{}))a!=null&&(o==="style"?typeof a=="string"?r.setAttribute("style",a):typeof a=="object"&&Object.assign(r.style,a):o.startsWith("on")&&typeof a=="function"?r[o.toLowerCase()]=a:o in r?r[o]=a:r.setAttribute(o,String(a)));for(let o of n)o==null||o===!1||r.appendChild(typeof o=="string"||typeof o=="number"?document.createTextNode(String(o)):o);return r}var _t="https://i.imgur.com/k5WuC32.png",hr="gemini-loader-style",_e="gemini-loader",yr=80;function Zs(){if(document.getElementById(hr))return;let e=document.createElement("style");e.id=hr,e.textContent=`
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
  `,document.head.appendChild(e)}function Wt(e,t,n){let r=T("div",{className:`gemini-loader__log ${n}`},T("div",{className:"gemini-loader__dot"}),T("div",{textContent:t}));for(e.appendChild(r);e.childElementCount>yr;)e.firstElementChild?.remove();e.scrollTop=e.scrollHeight}function el(){return new Promise(e=>{if(typeof GM_xmlhttpRequest>"u"){e(_t);return}GM_xmlhttpRequest({method:"GET",url:_t,responseType:"blob",onload:t=>{let n=t.response,r=new FileReader;r.onloadend=()=>e(r.result),r.onerror=()=>e(_t),r.readAsDataURL(n)},onerror:()=>e(_t)})})}function Ln(e={}){let t=Number.isFinite(e.blurPx)?Math.max(4,Number(e.blurPx)):14;Zs();let n=T("div",{className:"gemini-loader__subtitle",textContent:e.subtitle??"Initializing the mod..."}),r=T("div",{className:"gemini-loader__logs"}),o=T("img",{className:"gemini-loader__spinner-icon",alt:"Gemini"}),a=T("div",{className:"gemini-loader__spinner"},o);el().then(b=>{o.src=b});let i=T("div",{className:"gemini-loader__card"},T("div",{className:"gemini-loader__header"},a,T("div",{className:"gemini-loader__titles"},T("div",{className:"gemini-loader__title",textContent:e.title??"Gemini is loading"}),n)),r),s=T("div",{id:_e},i);(document.body||document.documentElement).appendChild(s);let u=T("div",{className:"gemini-loader__actions"},T("button",{className:"gemini-loader__button",textContent:"Close loader",onclick:()=>s.remove()}));i.appendChild(u),s.style.setProperty("--loader-blur",`${t}px`);let d=b=>{n.textContent=b},l=new Map,c=(b,h)=>{b.className=`gemini-loader__log ${h}`};return{log:(b,h="info")=>Wt(r,b,h),logStep:(b,h,S="info")=>{let v=String(b||"").trim();if(!v){Wt(r,h,S);return}let x=l.get(v);if(x){x.el.lastElementChild&&(x.el.lastElementChild.textContent=h),x.tone!==S&&(c(x.el,S),x.tone=S);return}let w=T("div",{className:`gemini-loader__log ${S}`},T("div",{className:"gemini-loader__dot"}),T("div",{textContent:h}));for(l.set(v,{el:w,tone:S}),r.appendChild(w);r.childElementCount>yr;){let k=r.firstElementChild;if(!k)break;let L=Array.from(l.entries()).find(([,I])=>I.el===k)?.[0];L&&l.delete(L),k.remove()}r.scrollTop=r.scrollHeight},setSubtitle:d,succeed:(b,h=600)=>{b&&Wt(r,b,"success"),s.classList.add("gemini-loader--closing"),setTimeout(()=>s.remove(),h)},fail:(b,h)=>{Wt(r,b,"error"),d("Something went wrong. Check the console for details."),s.classList.add("gemini-loader--error"),console.error("[Gemini loader]",b,h)}}}function xr(e,t,n){let r=T("div",{className:"lg-pill",id:"pill"}),o=e.map(l=>{let c=T("button",{className:"lg-tab"},l.label);return c.setAttribute("data-target",l.id),c}),a=T("div",{className:"lg-tabs",id:"lg-tabs-row"},r,...o),i=a;a.addEventListener("wheel",l=>{Math.abs(l.deltaY)>Math.abs(l.deltaX)&&(l.preventDefault(),a.scrollLeft+=l.deltaY)},{passive:!1});function s(l){let c=a.getBoundingClientRect(),p=o.find(w=>w.dataset.target===l)||o[0];if(!p)return;let m=p.getBoundingClientRect(),g=m.left-c.left,f=m.width;r.style.width=`${f}px`,r.style.transform=`translateX(${g}px)`;let b=a.scrollLeft,h=b,S=b+a.clientWidth,v=g-12,x=g+f+12;v<h?a.scrollTo({left:v,behavior:"smooth"}):x>S&&a.scrollTo({left:x-a.clientWidth,behavior:"smooth"})}let u=t||(e[0]?.id??"");function d(l){u=l,o.forEach(c=>c.classList.toggle("active",c.dataset.target===l)),s(l),n(l)}return o.forEach(l=>l.addEventListener("click",()=>d(l.dataset.target))),queueMicrotask(()=>s(u)),{root:i,activate:d,recalc:()=>s(u),getActive:()=>u}}var We=class{constructor(t){Se(this,"id");Se(this,"label");Se(this,"container",null);Se(this,"cleanupFunctions",[]);this.id=t.id,this.label=t.label}render(t){for(this.unmount();t.firstChild;)t.removeChild(t.firstChild);this.container=t;let n=this.build(t);n instanceof Promise&&n.catch(o=>{console.error(`[Gemini] Error building section ${this.id}:`,o)});let r=t.firstElementChild;r&&r.classList.contains("gemini-section")&&r.classList.add("active")}unmount(){this.executeCleanup(),this.container=null}createContainer(t,n){let r=n?`gemini-section ${n}`:"gemini-section";return T("section",{id:t,className:r})}addCleanup(t){this.cleanupFunctions.push(t)}createGrid(t="12px"){let n=T("div");return n.style.display="grid",n.style.gap=t,n}executeCleanup(){for(let t of this.cleanupFunctions)try{t()}catch(n){console.error(`[Gemini] Cleanup error in section ${this.id}:`,n)}this.cleanupFunctions=[]}};var ct=class{constructor(t,n,r){Se(this,"sections");Se(this,"activeId",null);Se(this,"container");Se(this,"theme");this.sections=new Map(t.map(o=>[o.id,o])),this.container=n,this.theme=r}get ids(){return Array.from(this.sections.keys())}get all(){return Array.from(this.sections.values())}get active(){return this.activeId}activate(t){if(this.activeId!==t){if(!this.sections.has(t))throw new Error(`[Gemini] Unknown section: ${t}`);if(this.activeId&&this.sections.get(this.activeId).unmount(),this.activeId=t,this.sections.get(t).render(this.container),this.theme){let n=this.theme.getCurrentTheme();this.theme.applyTheme(n)}}}};function ut(e,t){try{let n=JSON.stringify(t);GM_setValue(e,n)}catch(n){console.error(`[Gemini] Failed to save key "${e}" to storage:`,n)}}function Re(e,t){try{let n=GM_getValue(e);return n==null?t:typeof n=="string"?JSON.parse(n):n}catch(n){return console.error(`[Gemini] Failed to load key "${e}" from storage, using default:`,n),t}}var vr="gemini.sections";function Sr(){let e=Re(vr,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function tl(e){ut(vr,e)}async function wr(e){return Sr()[e]}function Tr(e,t){let n=Sr();tl({...n,[e]:t})}function jt(e,t){return{...e,...t??{}}}async function kr(e){let t=await wr(e.path),n;e.migrate?n=e.migrate(t):n=t??{},n=Object.assign((d=>JSON.parse(JSON.stringify(d)))(e.defaults),n),e.sanitize&&(n=e.sanitize(n));function o(){Tr(e.path,n)}function a(){return n}function i(d){n=e.sanitize?e.sanitize(d):d,o()}function s(d){let c=Object.assign((p=>JSON.parse(JSON.stringify(p)))(n),{});typeof d=="function"?d(c):Object.assign(c,d),n=e.sanitize?e.sanitize(c):c,o()}function u(){o()}return{get:a,set:i,update:s,save:u}}async function dt(e,t){let{path:n=e,...r}=t;return kr({path:n,...r})}var nl=0,Bt=new Map;function Oe(e={},...t){let{id:n,className:r,variant:o="default",padding:a="md",interactive:i=!1,expandable:s=!1,defaultExpanded:u=!0,onExpandChange:d,mediaTop:l,title:c,subtitle:p,badge:m,actions:g,footer:f,divider:b=!1,tone:h="neutral",stateKey:S}=e,v=T("div",{className:"card",id:n,tabIndex:i?0:void 0});v.classList.add(`card--${o}`,`card--p-${a}`),i&&v.classList.add("card--interactive"),h!=="neutral"&&v.classList.add(`card--tone-${h}`),r&&v.classList.add(...r.split(" ").filter(Boolean)),s&&v.classList.add("card--expandable");let x=s?S??n??(typeof c=="string"?`title:${c}`:null):null,w=!s||u;x&&Bt.has(x)&&(w=!!Bt.get(x));let k=null,L=null,I=null,P=null,O=null,E=n?`${n}-collapse`:`card-collapse-${++nl}`,V=()=>{if(P!==null&&(cancelAnimationFrame(P),P=null),O){let G=O;O=null,G()}},J=(G,A)=>{if(!I)return;V();let D=I;if(D.setAttribute("aria-hidden",String(!G)),!A){D.classList.remove("card-collapse--animating"),D.style.display=G?"":"none",D.style.height="",D.style.opacity="";return}if(D.classList.add("card-collapse--animating"),D.style.display="",G){D.style.height="auto";let z=D.scrollHeight;if(!z){D.classList.remove("card-collapse--animating"),D.style.display="",D.style.height="",D.style.opacity="";return}D.style.height="0px",D.style.opacity="0",D.offsetHeight,P=requestAnimationFrame(()=>{P=null,D.style.height=`${z}px`,D.style.opacity="1"})}else{let z=D.scrollHeight;if(!z){D.classList.remove("card-collapse--animating"),D.style.display="none",D.style.height="",D.style.opacity="";return}D.style.height=`${z}px`,D.style.opacity="1",D.offsetHeight,P=requestAnimationFrame(()=>{P=null,D.style.height="0px",D.style.opacity="0"})}let R=()=>{D.classList.remove("card-collapse--animating"),D.style.height="",G||(D.style.display="none"),D.style.opacity=""},H=null,W=z=>{z.target===D&&(H!==null&&(clearTimeout(H),H=null),D.removeEventListener("transitionend",W),D.removeEventListener("transitioncancel",W),O=null,R())};O=()=>{H!==null&&(clearTimeout(H),H=null),D.removeEventListener("transitionend",W),D.removeEventListener("transitioncancel",W),O=null,R()},D.addEventListener("transitionend",W),D.addEventListener("transitioncancel",W),H=window.setTimeout(()=>{O?.()},420)};function B(G){let A=document.createElementNS("http://www.w3.org/2000/svg","svg");return A.setAttribute("viewBox","0 0 24 24"),A.setAttribute("width","16"),A.setAttribute("height","16"),A.innerHTML=G==="up"?'<path d="M7 14l5-5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>':'<path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',A}function _(G,A=!0,D=!0){w=G,v.classList.toggle("card--collapsed",!w),v.classList.toggle("card--expanded",w),k&&(k.dataset.expanded=String(w),k.setAttribute("aria-expanded",String(w))),L&&(L.setAttribute("aria-expanded",String(w)),L.classList.toggle("card-toggle--collapsed",!w),L.setAttribute("aria-label",w?"Replier le contenu":"Deplier le contenu"),L.replaceChildren(B(w?"up":"down"))),s?J(w,D):I&&(I.style.display="",I.style.height="",I.style.opacity="",I.setAttribute("aria-hidden","false")),A&&d&&d(w),x&&Bt.set(x,w)}if(l){let G=T("div",{className:"card-media"});G.append(l),v.appendChild(G)}let j=!!(c||p||m||g&&g.length||s);if(j){k=T("div",{className:"card-header"});let G=T("div",{className:"card-headline",style:"min-width:0;display:flex;flex-direction:column;gap:2px;"});if(c){let R=T("h3",{className:"card-title",style:"margin:0;font-size:15px;font-weight:700;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:8px;"},c);m&&R.append(typeof m=="string"?T("span",{className:"badge"},m):m),G.appendChild(R)}if(p){let R=T("div",{className:"card-subtitle",style:"opacity:.85;font-size:12px;color:color-mix(in oklab, var(--fg) 80%, #9ca3af)"},p);G.appendChild(R)}(G.childNodes.length||s)&&k.appendChild(G);let A=T("div",{className:"card-header-right",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"}),D=T("div",{className:"card-actions",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"});g?.forEach(R=>D.appendChild(R)),D.childNodes.length&&A.appendChild(D),s&&(L=T("button",{className:"card-toggle",type:"button",ariaExpanded:String(w),ariaControls:E,ariaLabel:w?"Replier le contenu":"Deplier le contenu"}),L.textContent=w?"\u25B2":"\u25BC",L.addEventListener("click",R=>{R.preventDefault(),R.stopPropagation(),_(!w)}),A.appendChild(L),k.classList.add("card-header--expandable"),k.addEventListener("click",R=>{let H=R.target;H?.closest(".card-actions")||H?.closest(".card-toggle")||_(!w)})),A.childNodes.length&&k.appendChild(A),v.appendChild(k)}I=T("div",{className:"card-collapse",id:E,ariaHidden:s?String(!w):"false"}),v.appendChild(I),b&&j&&I.appendChild(T("div",{className:"card-divider"}));let N=T("div",{className:"card-body"});if(N.append(...t),I.appendChild(N),f){b&&I.appendChild(T("div",{className:"card-divider"}));let G=T("div",{className:"card-footer"});G.append(f),I.appendChild(G)}return L&&L.setAttribute("aria-controls",E),_(w,!1,!1),x&&Bt.set(x,w),v}function Rn(...e){return T("div",{className:"card-footer"},...e)}var Vt=!1,Ft=new Set,fe=e=>{let t=document.activeElement;for(let n of Ft)if(t&&(t===n||n.contains(t))){e.stopImmediatePropagation(),e.stopPropagation();return}};function ol(){Vt||(Vt=!0,window.addEventListener("keydown",fe,!0),window.addEventListener("keypress",fe,!0),window.addEventListener("keyup",fe,!0),document.addEventListener("keydown",fe,!0),document.addEventListener("keypress",fe,!0),document.addEventListener("keyup",fe,!0))}function rl(){Vt&&(Ft.size>0||(Vt=!1,window.removeEventListener("keydown",fe,!0),window.removeEventListener("keypress",fe,!0),window.removeEventListener("keyup",fe,!0),document.removeEventListener("keydown",fe,!0),document.removeEventListener("keypress",fe,!0),document.removeEventListener("keyup",fe,!0)))}function Je(e){let{id:t,value:n=null,options:r,placeholder:o="Select...",size:a="md",disabled:i=!1,blockGameKeys:s=!0,onChange:u,onOpenChange:d}=e,l=T("div",{className:"select",id:t}),c=T("button",{className:"select-trigger",type:"button"}),p=T("span",{className:"select-value"},o),m=T("span",{className:"select-caret"},"\u25BE");c.append(p,m);let g=T("div",{className:"select-menu",role:"listbox",tabindex:"-1","aria-hidden":"true"});l.classList.add(`select--${a}`);let f=!1,b=n,h=null,S=!!i;function v(R){return R==null?o:(e.options||r).find(W=>W.value===R)?.label??o}function x(R){p.textContent=v(R),g.querySelectorAll(".select-option").forEach(H=>{let W=H.dataset.value,z=R!=null&&W===R;H.classList.toggle("selected",z),H.setAttribute("aria-selected",String(z))})}function w(R){g.replaceChildren(),R.forEach(H=>{let W=T("button",{className:"select-option"+(H.disabled?" disabled":""),type:"button",role:"option","data-value":H.value,"aria-selected":String(H.value===b),tabindex:"-1"},H.label);H.value===b&&W.classList.add("selected"),H.disabled||W.addEventListener("pointerdown",z=>{z.preventDefault(),z.stopPropagation(),E(H.value,{notify:!0}),P()},{capture:!0}),g.appendChild(W)})}function k(){c.setAttribute("aria-expanded",String(f)),g.setAttribute("aria-hidden",String(!f))}function L(){let R=c.getBoundingClientRect();Object.assign(g.style,{minWidth:`${R.width}px`})}function I(){f||S||(f=!0,l.classList.add("open"),k(),L(),document.addEventListener("mousedown",j,!0),document.addEventListener("scroll",N,!0),window.addEventListener("resize",G),g.focus({preventScroll:!0}),s&&(ol(),Ft.add(l),h=()=>{Ft.delete(l),rl()}),d?.(!0))}function P(){f&&(f=!1,l.classList.remove("open"),k(),document.removeEventListener("mousedown",j,!0),document.removeEventListener("scroll",N,!0),window.removeEventListener("resize",G),c.focus({preventScroll:!0}),h?.(),h=null,d?.(!1))}function O(){f?P():I()}function E(R,H={}){let W=b;b=R,x(b),H.notify!==!1&&W!==R&&u?.(R)}function V(){return b}function J(R){let H=Array.from(g.querySelectorAll(".select-option:not(.disabled)"));if(!H.length)return;let W=H.findIndex(oe=>oe.classList.contains("active")),z=H[(W+(R===1?1:H.length-1))%H.length];H.forEach(oe=>oe.classList.remove("active")),z.classList.add("active"),z.focus({preventScroll:!0}),z.scrollIntoView({block:"nearest"})}function B(R){(R.key===" "||R.key==="Enter"||R.key==="ArrowDown")&&(R.preventDefault(),I())}function _(R){if(R.key==="Escape"){R.preventDefault(),P();return}if(R.key==="Enter"||R.key===" "){let H=g.querySelector(".select-option.active")||g.querySelector(".select-option.selected");H&&!H.classList.contains("disabled")&&(R.preventDefault(),E(H.dataset.value,{notify:!0}),P());return}if(R.key==="ArrowDown"){R.preventDefault(),J(1);return}if(R.key==="ArrowUp"){R.preventDefault(),J(-1);return}}function j(R){l.contains(R.target)||P()}function N(){f&&L()}function G(){f&&L()}function A(R){S=!!R,c.disabled=S,l.classList.toggle("disabled",S),S&&P()}function D(R){e.options=R,w(R),R.some(H=>H.value===b)||(b=null,x(null))}return l.append(c,g),c.addEventListener("pointerdown",R=>{R.preventDefault(),R.stopPropagation(),O()},{capture:!0}),c.addEventListener("keydown",B),g.addEventListener("keydown",_),w(r),n!=null?(b=n,x(b)):x(null),k(),A(S),{root:l,open:I,close:P,toggle:O,getValue:V,setValue:E,setOptions:D,setDisabled:A,destroy(){document.removeEventListener("mousedown",j,!0),document.removeEventListener("scroll",N,!0),window.removeEventListener("resize",G),h?.(),h=null}}}function Ut(e={}){let{id:t,text:n="",htmlFor:r,tone:o="default",size:a="md",layout:i="inline",variant:s="text",required:u=!1,disabled:d=!1,tooltip:l,hint:c,icon:p,suffix:m,onClick:g}=e,f=T("div",{className:"lg-label-wrap",id:t}),b=T("label",{className:"lg-label",...r?{htmlFor:r}:{},...l?{title:l}:{}});if(p){let E=typeof p=="string"?T("span",{className:"lg-label-ico"},p):p;E.classList?.add?.("lg-label-ico"),b.appendChild(E)}let h=T("span",{className:"lg-label-text"},n);b.appendChild(h);let S=T("span",{className:"lg-label-req",ariaHidden:"true"}," *");u&&b.appendChild(S);let v=null;if(m!=null){v=typeof m=="string"?document.createTextNode(m):m;let E=T("span",{className:"lg-label-suffix"});E.appendChild(v),b.appendChild(E)}let x=c?T("div",{className:"lg-label-hint"},c):null;f.classList.add(`lg-label--${i}`),f.classList.add(`lg-label--${a}`),s==="title"&&f.classList.add("lg-label--title"),w(o),d&&f.classList.add("is-disabled"),f.appendChild(b),x&&f.appendChild(x),g&&b.addEventListener("click",g);function w(E){f.classList.remove("lg-label--default","lg-label--muted","lg-label--info","lg-label--success","lg-label--warning","lg-label--danger"),f.classList.add(`lg-label--${E}`)}function k(E){h.textContent=E}function L(E){w(E)}function I(E){E&&!S.isConnected&&b.appendChild(S),!E&&S.isConnected&&S.remove(),E?b.setAttribute("aria-required","true"):b.removeAttribute("aria-required")}function P(E){f.classList.toggle("is-disabled",!!E)}function O(E){!E&&x&&x.isConnected?x.remove():E&&x?x.textContent=E:E&&!x&&f.appendChild(T("div",{className:"lg-label-hint"},E))}return{root:f,labelEl:b,hintEl:x,setText:k,setTone:L,setRequired:I,setDisabled:P,setHint:O}}function pt(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function zt(e,t){let n=document.createElement("span");n.className=`btn-ico btn-ico--${t}`;let r=pt(e);return r&&n.appendChild(r),n}function al(){let e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.marginRight="6px",t.style.display="none",t.style.flexShrink="0";let n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");let r=document.createElementNS(e,"animate");r.setAttribute("attributeName","stroke-dasharray"),r.setAttribute("values","1,150;90,150;90,150"),r.setAttribute("dur","1.5s"),r.setAttribute("repeatCount","indefinite");let o=document.createElementNS(e,"animateTransform");return o.setAttribute("attributeName","transform"),o.setAttribute("attributeType","XML"),o.setAttribute("type","rotate"),o.setAttribute("from","0 12 12"),o.setAttribute("to","360 12 12"),o.setAttribute("dur","1s"),o.setAttribute("repeatCount","indefinite"),n.appendChild(r),n.appendChild(o),t.appendChild(n),t}function De(e={}){let{label:t="",id:n,variant:r="default",size:o="md",iconLeft:a,iconRight:i,loading:s=!1,tooltip:u,type:d="button",onClick:l,disabled:c=!1,fullWidth:p=!1}=e,m=T("button",{className:"btn",id:n});m.type=d,r==="primary"&&m.classList.add("primary"),o==="sm"&&m.classList.add("btn--sm"),u&&(m.title=u),p&&(m.style.width="100%");let g=al(),f=a?zt(a,"left"):null,b=i?zt(i,"right"):null,h=document.createElement("span");h.className="btn-label";let S=pt(t);S&&h.appendChild(S),!S&&(f||b)&&m.classList.add("btn--icon"),m.appendChild(g),f&&m.appendChild(f),m.appendChild(h),b&&m.appendChild(b);let v=c||s;m.disabled=v,m.setAttribute("aria-busy",String(!!s)),g.style.display=s?"inline-block":"none",l&&m.addEventListener("click",l);let x=m;return x.setLoading=w=>{m.setAttribute("aria-busy",String(!!w)),g.style.display=w?"inline-block":"none",m.disabled=w||c},x.setDisabled=w=>{m.disabled=w||m.getAttribute("aria-busy")==="true"},x.setLabel=w=>{h.replaceChildren();let k=pt(w);k&&h.appendChild(k),!k&&(f||b)?m.classList.add("btn--icon"):m.classList.remove("btn--icon")},x.setIconLeft=w=>{if(w==null){f?.remove();return}f?f.replaceChildren(pt(w)):m.insertBefore(zt(w,"left"),h)},x.setIconRight=w=>{if(w==null){b?.remove();return}b?b.replaceChildren(pt(w)):m.appendChild(zt(w,"right"))},x}function il(){try{let e=window.visualViewport,t=Math.round((e?.width??window.innerWidth)||0),n=Math.round((e?.height??window.innerHeight)||0);if(t&&n)return t>=n?"landscape":"portrait"}catch{}return"unknown"}function sl(){let e=navigator.userAgent||"",t=navigator.platform||"",n=navigator.userAgentData;if(n&&typeof n.platform=="string"){let o=n.platform.toLowerCase();if(o.includes("windows"))return"windows";if(o.includes("mac"))return"mac";if(o.includes("android"))return"android";if(o.includes("chrome os")||o.includes("cros"))return"chromeos";if(o.includes("linux"))return"linux";if(o.includes("ios"))return"ios"}return/iPhone|iPad|iPod/i.test(e)||t==="MacIntel"&&navigator.maxTouchPoints>1?"ios":/Android/i.test(e)?"android":/CrOS/i.test(e)?"chromeos":/Win/i.test(e)?"windows":/Mac/i.test(e)?"mac":/Linux/i.test(e)?"linux":"unknown"}function ll(){let e=navigator.userAgent||"",t=navigator.userAgentData;if(t&&Array.isArray(t.brands)){let n=t.brands.map(i=>String(i.brand||i.brandName||i.brandVersion||i)),r=n.some(i=>/Edge/i.test(i)||/Microsoft Edge/i.test(i)),o=n.some(i=>/Opera/i.test(i)||/OPR/i.test(i)),a=n.some(i=>/Chrome|Chromium/i.test(i));if(r)return"Edge";if(o)return"Opera";if(a)return"Chrome";if(navigator.brave)return"Brave"}return/FxiOS/i.test(e)?"Firefox":/CriOS/i.test(e)?"Chrome":/EdgiOS/i.test(e)?"Edge":/OPiOS|OPR|Opera Mini|Opera/i.test(e)?"Opera":/Edg\//i.test(e)?"Edge":/OPR\//i.test(e)||/Opera/i.test(e)?"Opera":/Firefox/i.test(e)?"Firefox":/Safari/i.test(e)&&!/Chrome|Chromium|Edg|OPR/i.test(e)?"Safari":/Brave/i.test(e)||window.Brave||navigator.brave?"Brave":/Chrome|Chromium/i.test(e)?"Chrome":"Unknown"}function cl(){let e=navigator.userAgent||"",t=navigator.userAgentData;return t&&typeof t.mobile=="boolean"?t.mobile?"mobile":"desktop":/Android|iPhone|iPad|iPod|Mobile/i.test(e)?"mobile":"desktop"}function ye(){let e=(()=>{try{return window.top!==window.self}catch{return!0}})(),t=ul(document.referrer),r=e&&!!t&&/(^|\.)discord(app)?\.com$/i.test(t)?"discord":"web",o=cl(),a=sl(),i=ll(),s=window.screen||{},u=window.visualViewport,d=Math.round(window.innerWidth||document.documentElement.clientWidth||0),l=Math.round(window.innerHeight||document.documentElement.clientHeight||0),c=Math.round(u?.width??d),p=Math.round(u?.height??l),m=Math.round(s.width||0),g=Math.round(s.height||0),f=Math.round(s.availWidth||m),b=Math.round(s.availHeight||g),h=Number.isFinite(window.devicePixelRatio)?window.devicePixelRatio:1;return{surface:r,host:location.hostname,origin:location.origin,isInIframe:e,platform:o,browser:i,os:a,viewportWidth:d,viewportHeight:l,visualViewportWidth:c,visualViewportHeight:p,screenWidth:m,screenHeight:g,availScreenWidth:f,availScreenHeight:b,dpr:h,orientation:il()}}function Pr(){return ye().surface==="discord"}function ul(e){if(!e)return null;try{return new URL(e).hostname}catch{return null}}var $t=!1,mt=new Set;function dl(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}var be=e=>{let t=dl();if(t){for(let n of mt)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function pl(){$t||($t=!0,window.addEventListener("keydown",be,!0),window.addEventListener("keypress",be,!0),window.addEventListener("keyup",be,!0),document.addEventListener("keydown",be,!0),document.addEventListener("keypress",be,!0),document.addEventListener("keyup",be,!0))}function ml(){$t&&($t=!1,window.removeEventListener("keydown",be,!0),window.removeEventListener("keypress",be,!0),window.removeEventListener("keyup",be,!0),document.removeEventListener("keydown",be,!0),document.removeEventListener("keypress",be,!0),document.removeEventListener("keyup",be,!0))}function gl(e){return mt.size===0&&pl(),mt.add(e),()=>{mt.delete(e),mt.size===0&&ml()}}function fl(e,t,n,r){let o;switch(e){case"digits":o="0-9";break;case"alpha":o="\\p{L}";break;case"alphanumeric":o="\\p{L}0-9";break;default:return null}return t&&(o+=" "),n&&(o+="\\-"),r&&(o+="_"),new RegExp(`[^${o}]`,"gu")}function bl(e,t){return t?e.replace(t,""):e}function hl(e,t=0){if(!t)return e;let n;return((...r)=>{clearTimeout(n),n=setTimeout(()=>e(...r),t)})}function Cr(e={}){let{id:t,placeholder:n="",value:r="",mode:o="any",allowSpaces:a=!1,allowDashes:i=!1,allowUnderscore:s=!1,maxLength:u,blockGameKeys:d=!0,debounceMs:l=0,onChange:c,onEnter:p,label:m}=e,g=T("div",{className:"lg-input-wrap"}),f=T("input",{className:"input",id:t,placeholder:n});if(typeof u=="number"&&u>0&&(f.maxLength=u),r&&(f.value=r),m){let E=T("div",{className:"lg-input-label"},m);g.appendChild(E)}g.appendChild(f);let b=fl(o,a,i,s),h=()=>{let E=f.selectionStart??f.value.length,V=f.value.length,J=bl(f.value,b);if(J!==f.value){f.value=J;let B=V-J.length,_=Math.max(0,E-B);f.setSelectionRange(_,_)}},S=hl(()=>c?.(f.value),l);f.addEventListener("input",()=>{h(),S()}),f.addEventListener("paste",()=>queueMicrotask(()=>{h(),S()})),f.addEventListener("keydown",E=>{E.key==="Enter"&&p?.(f.value)});let v=d?gl(f):()=>{};function x(){return f.value}function w(E){f.value=E??"",h(),S()}function k(){f.focus()}function L(){f.blur()}function I(E){f.disabled=!!E}function P(){return document.activeElement===f}function O(){v()}return{root:g,input:f,getValue:x,setValue:w,focus:k,blur:L,setDisabled:I,isFocused:P,destroy:O}}function ne(e,t,n){return Math.min(n,Math.max(t,e))}function ft({h:e,s:t,v:n,a:r}){let o=(e%360+360)%360/60,a=n*t,i=a*(1-Math.abs(o%2-1)),s=0,u=0,d=0;switch(Math.floor(o)){case 0:s=a,u=i;break;case 1:s=i,u=a;break;case 2:u=a,d=i;break;case 3:u=i,d=a;break;case 4:s=i,d=a;break;default:s=a,d=i;break}let c=n-a,p=Math.round((s+c)*255),m=Math.round((u+c)*255),g=Math.round((d+c)*255);return{r:ne(p,0,255),g:ne(m,0,255),b:ne(g,0,255),a:ne(r,0,1)}}function Mr({r:e,g:t,b:n,a:r}){let o=ne(e,0,255)/255,a=ne(t,0,255)/255,i=ne(n,0,255)/255,s=Math.max(o,a,i),u=Math.min(o,a,i),d=s-u,l=0;d!==0&&(s===o?l=60*((a-i)/d%6):s===a?l=60*((i-o)/d+2):l=60*((o-a)/d+4)),l<0&&(l+=360);let c=s===0?0:d/s;return{h:l,s:c,v:s,a:ne(r,0,1)}}function Dn({r:e,g:t,b:n}){let r=o=>ne(Math.round(o),0,255).toString(16).padStart(2,"0");return`#${r(e)}${r(t)}${r(n)}`.toUpperCase()}function yl({r:e,g:t,b:n,a:r}){let o=ne(Math.round(r*255),0,255);return`${Dn({r:e,g:t,b:n,a:r})}${o.toString(16).padStart(2,"0")}`.toUpperCase()}function gt({r:e,g:t,b:n,a:r}){let o=Math.round(r*1e3)/1e3;return`rgba(${e}, ${t}, ${n}, ${o})`}function Xe(e){let t=e.trim();if(!t||(t.startsWith("#")&&(t=t.slice(1)),![3,4,6,8].includes(t.length))||!/^[0-9a-fA-F]+$/.test(t))return null;(t.length===3||t.length===4)&&(t=t.split("").map(i=>i+i).join(""));let n=255;t.length===8&&(n=parseInt(t.slice(6,8),16),t=t.slice(0,6));let r=parseInt(t.slice(0,2),16),o=parseInt(t.slice(2,4),16),a=parseInt(t.slice(4,6),16);return{r,g:o,b:a,a:n/255}}function On(e){if(!e)return null;let t=e.trim();if(t.startsWith("#"))return Xe(t);let n=t.match(/^rgba?\(([^)]+)\)$/i);if(n){let r=n[1].split(",").map(u=>u.trim());if(r.length<3)return null;let o=Number(r[0]),a=Number(r[1]),i=Number(r[2]),s=r[3]!=null?Number(r[3]):1;return[o,a,i,s].some(u=>Number.isNaN(u))?null:{r:o,g:a,b:i,a:s}}return null}function xl(e,t){let n=On(e)??Xe(e??"")??{r:244,g:67,b:54,a:1};return typeof t=="number"&&(n.a=ne(t,0,1)),Mr(n)}function vl(e){return`#${e.trim().replace(/[^0-9a-fA-F#]/g,"").replace(/#/g,"")}`.slice(0,9).toUpperCase()}function Sl(e){let t=e.trim();return t&&(/^rgba?\s*\(/i.test(t)?t=t.replace(/^rgba?/i,"rgba"):(t=t.replace(/^\(?(.*)\)?$/,"$1"),t=`rgba(${t})`),t=t.replace(/\s*\(\s*/,"("),t=t.replace(/\s*\)\s*$/,")"),t=t.replace(/\s*,\s*/g,", "),t)}function je(e){let t=ft(e),n=ft({...e,a:1});return{hsva:{...e},hex:Dn(n),hexa:yl(t),rgba:gt(t),alpha:e.a}}function Ar(e={}){let{id:t,label:n="Color",value:r,alpha:o,defaultExpanded:a=!1,detectMobile:i,onInput:s,onChange:u}=e,l=i?i():ye().platform==="mobile",c=xl(r,o),p=Oe({id:t,className:"color-picker",title:n,padding:l?"md":"lg",variant:"soft",expandable:!l,defaultExpanded:!l&&a});p.classList.add(l?"color-picker--mobile":"color-picker--desktop");let m=p.querySelector(".card-header");m&&m.classList.add("color-picker__header");let g=m?.querySelector(".card-title"),f=T("button",{className:"color-picker__preview",type:"button",title:`Preview ${n}`,"aria-label":`Change ${n}`});g?g.prepend(f):m?m.prepend(f):p.prepend(f);let b=p.querySelector(".card-toggle");!l&&b&&f.addEventListener("click",()=>{p.classList.contains("card--collapsed")&&b.click()});let h=p.querySelector(".card-collapse"),S=null,v=null,x=null,w=null,k=null,L=null,I=null,P=null,O=null,E="hex";function V(N){let G=je(c);N==="input"?s?.(G):u?.(G)}function J(){let N=je(c);if(f.style.setProperty("--cp-preview-color",N.rgba),f.setAttribute("aria-label",`${n}: ${N.hexa}`),!l&&S&&v&&x&&w&&k&&L&&I){let G=ft({...c,s:1,v:1,a:1}),A=gt(G);S.style.setProperty("--cp-palette-hue",A),v.style.left=`${c.s*100}%`,v.style.top=`${(1-c.v)*100}%`,x.style.setProperty("--cp-alpha-gradient",`linear-gradient(180deg, ${gt({...G,a:1})} 0%, ${gt({...G,a:0})} 100%)`),w.style.top=`${(1-c.a)*100}%`,k.style.setProperty("--cp-hue-color",gt(ft({...c,v:1,s:1,a:1}))),L.style.left=`${c.h/360*100}%`;let D=c.a===1?N.hex:N.hexa,R=N.rgba,H=E==="hex"?D:R;I!==document.activeElement&&(I.value=H),I.setAttribute("aria-label",`${E.toUpperCase()} code for ${n}`),I.placeholder=E==="hex"?"#RRGGBB or #RRGGBBAA":"rgba(0, 0, 0, 1)",E==="hex"?I.maxLength=9:I.removeAttribute("maxLength"),I.dataset.mode=E,P&&(P.textContent=E.toUpperCase(),P.setAttribute("aria-label",E==="hex"?"Passer en saisie RGBA":"Revenir en saisie HEX"),P.setAttribute("aria-pressed",E==="rgba"?"true":"false"),P.classList.toggle("is-alt",E==="rgba"))}O&&O!==document.activeElement&&(O.value=N.hex)}function B(N,G=null){c={h:(N.h%360+360)%360,s:ne(N.s,0,1),v:ne(N.v,0,1),a:ne(N.a,0,1)},J(),G&&V(G)}function _(N,G=null){B(Mr(N),G)}function j(N,G,A){N.addEventListener("pointerdown",D=>{D.preventDefault();let R=D.pointerId,H=z=>{z.pointerId===R&&G(z)},W=z=>{z.pointerId===R&&(document.removeEventListener("pointermove",H),document.removeEventListener("pointerup",W),document.removeEventListener("pointercancel",W),A?.(z))};G(D),document.addEventListener("pointermove",H),document.addEventListener("pointerup",W),document.addEventListener("pointercancel",W)})}if(!l&&h){let N=h.querySelector(".card-body");if(N){N.classList.add("color-picker__body"),v=T("div",{className:"color-picker__palette-cursor"}),S=T("div",{className:"color-picker__palette"},v),w=T("div",{className:"color-picker__alpha-thumb"}),x=T("div",{className:"color-picker__alpha"},w),L=T("div",{className:"color-picker__hue-thumb"}),k=T("div",{className:"color-picker__hue"},L);let G=T("div",{className:"color-picker__main"},S,x),A=T("div",{className:"color-picker__hue-row"},k),D=Cr({blockGameKeys:!0});I=D.input,I.classList.add("color-picker__hex-input"),I.value="",I.maxLength=9,I.spellcheck=!1,I.inputMode="text",I.setAttribute("aria-label",`Hex code for ${n}`),P=T("button",{type:"button",className:"color-picker__mode-btn",textContent:"HEX","aria-pressed":"false","aria-label":"Passer en saisie RGBA"}),D.root.classList.add("color-picker__hex-wrap");let R=T("div",{className:"color-picker__hex-row"},P,D.root);N.replaceChildren(G,A,R),j(S,W=>{if(!S||!v)return;let z=S.getBoundingClientRect(),oe=ne((W.clientX-z.left)/z.width,0,1),En=ne((W.clientY-z.top)/z.height,0,1);B({...c,s:oe,v:1-En},"input")},()=>V("change")),j(x,W=>{if(!x)return;let z=x.getBoundingClientRect(),oe=ne((W.clientY-z.top)/z.height,0,1);B({...c,a:1-oe},"input")},()=>V("change")),j(k,W=>{if(!k)return;let z=k.getBoundingClientRect(),oe=ne((W.clientX-z.left)/z.width,0,1);B({...c,h:oe*360},"input")},()=>V("change")),P.addEventListener("click",()=>{if(E=E==="hex"?"rgba":"hex",I){let W=je(c);I.value=E==="hex"?c.a===1?W.hex:W.hexa:W.rgba}J(),I?.focus(),I?.select()}),I.addEventListener("input",()=>{if(E==="hex"){let W=vl(I.value);if(W!==I.value){let z=I.selectionStart??W.length;I.value=W,I.setSelectionRange(z,z)}}});let H=()=>{let W=I.value;if(E==="hex"){let z=Xe(W);if(!z){I.value=c.a===1?je(c).hex:je(c).hexa;return}let oe=W.startsWith("#")?W.slice(1):W,En=oe.length===4||oe.length===8;z.a=En?z.a:c.a,_(z,"change")}else{let z=Sl(W),oe=On(z);if(!oe){I.value=je(c).rgba;return}_(oe,"change")}};I.addEventListener("change",H),I.addEventListener("blur",H),I.addEventListener("keydown",W=>{W.key==="Enter"&&(H(),I.blur())})}}return l&&(h&&h.remove(),O=T("input",{className:"color-picker__native",type:"color",value:Dn(ft({...c,a:1}))}),f.addEventListener("click",()=>O.click()),O.addEventListener("input",()=>{let N=Xe(O.value);N&&(N.a=c.a,_(N,"input"),V("change"))}),p.appendChild(O)),J(),{root:p,isMobile:l,getValue:()=>je(c),setValue:(N,G)=>{let A=On(N)??Xe(N)??Xe("#FFFFFF");A&&(typeof G=="number"&&(A.a=G),_(A,null))}}}var wl=window;function Tl(){if(typeof unsafeWindow<"u"&&unsafeWindow)return unsafeWindow;let e=window.wrappedJSObject;return e&&e!==window?e:wl}var kl=Tl(),C=kl;function Pl(e){try{return!!e.isSecureContext}catch{return!1}}function Gn(e){let t=e?.getRootNode?.();return t&&(t instanceof Document||t.host)?t:document}function Ir(){let e=navigator.platform||"",t=navigator.userAgent||"";return/Mac|iPhone|iPad|iPod/i.test(e)||/Mac OS|iOS/i.test(t)}async function Cl(){try{let e=await navigator.permissions?.query?.({name:"clipboard-write"});return e?e.state==="granted"||e.state==="prompt":!0}catch{return!0}}function Ml(e,t){let n=document.createElement("textarea");return n.value=e,n.setAttribute("readonly","true"),n.style.position="fixed",n.style.opacity="0",n.style.pointerEvents="none",n.style.top="0",t.appendChild?t.appendChild(n):document.body.appendChild(n),n}function Al(e){try{let t=window.getSelection?.();if(!t)return!1;let n=document.createRange();return n.selectNodeContents(e),t.removeAllRanges(),t.addRange(n),!0}catch{return!1}}async function Il(e){if(!("clipboard"in navigator))return{ok:!1,method:"clipboard-write"};if(!Pl(C))return{ok:!1,method:"clipboard-write"};if(!await Cl())return{ok:!1,method:"clipboard-write"};try{return await navigator.clipboard.writeText(e),{ok:!0,method:"clipboard-write"}}catch{return{ok:!1,method:"clipboard-write"}}}function El(e,t){try{let n=t||Gn(),r=Ml(e,n);r.focus(),r.select(),r.setSelectionRange(0,r.value.length);let o=!1;try{o=document.execCommand("copy")}catch{o=!1}return r.remove(),{ok:o,method:"execCommand"}}catch{return{ok:!1,method:"execCommand"}}}function Ll(e,t){if(!t)return{ok:!1,method:"selection"};let n=t.textContent??"",r=!1;if(n!==e)try{t.textContent=e,r=!0}catch{}let o=Al(t);r&&setTimeout(()=>{try{t.textContent=n}catch{}},80);let a=Ir()?"\u2318C pour copier":"Ctrl+C pour copier";return{ok:o,method:"selection",hint:a}}async function Rl(e,t={}){let n=(e??"").toString();if(!n.length)return{ok:!1,method:"noop"};let r=await Il(n);if(r.ok)return r;let o=t.injectionRoot||Gn(t.valueNode||void 0),a=El(n,o);if(a.ok)return a;let i=Ll(n,t.valueNode||null);if(i.ok)return i;if(!t.disablePromptFallback)try{return window.prompt(Pr()?"Copie manuelle (Discord bloque clipboard):":"Copie manuelle:",n),{ok:!0,method:"prompt"}}catch{}return{ok:!1,method:"noop"}}function Er(e,t,n={}){let r=o=>{if(n.showTip){n.showTip(o);return}try{e.setAttribute("aria-label",o);let a=document.createElement("div");a.textContent=o,a.style.position="absolute",a.style.top="-28px",a.style.right="0",a.style.padding="4px 8px",a.style.borderRadius="8px",a.style.fontSize="12px",a.style.background="color-mix(in oklab, var(--bg) 85%, transparent)",a.style.border="1px solid var(--border)",a.style.color="var(--fg)",a.style.pointerEvents="none",a.style.opacity="0",a.style.transition="opacity .12s";let i=Gn(e);i.appendChild?i.appendChild(a):document.body.appendChild(a);let s=e.getBoundingClientRect();a.style.left=`${s.right-8}px`,a.style.top=`${s.top-28}px`,requestAnimationFrame(()=>a.style.opacity="1"),setTimeout(()=>{a.style.opacity="0",setTimeout(()=>a.remove(),150)},1200)}catch{}};e.addEventListener("click",async o=>{o.stopPropagation();let a=(t()??"").toString(),i=await Rl(a,{valueNode:n.valueNode??null,injectionRoot:n.injectionRoot??null,disablePromptFallback:n.disablePromptFallback??!1});n.onResult?.(i),i.ok?i.method==="clipboard-write"||i.method==="execCommand"||i.method==="prompt"?r("Copi\xE9"):i.method==="selection"&&r(i.hint||(Ir()?"\u2318C pour copier":"Ctrl+C pour copier")):r("Impossible de copier")})}var Ge={light:{"--bg":"rgba(255,255,255,0.7)","--fg":"#0f172a","--muted":"rgba(15,23,42,0.06)","--soft":"rgba(15,23,42,0.04)","--accent":"#2563eb","--border":"rgba(15,23,42,0.12)","--shadow":"rgba(2,6,23,.2)","--tab-bg":"#ffffff","--tab-fg":"#0f172a","--pill-from":"#4f46e5","--pill-to":"#06b6d4"},dark:{"--bg":"rgba(10,12,18,0.6)","--fg":"#e5e7eb","--muted":"rgba(229,231,235,0.08)","--soft":"rgba(229,231,235,0.05)","--accent":"#60a5fa","--border":"rgba(148,163,184,0.2)","--shadow":"rgba(0,0,0,.45)","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#e5e7eb","--pill-from":"#6366f1","--pill-to":"#06b6d4"},sepia:{"--bg":"rgba(247,242,231,0.72)","--fg":"#3b2f2f","--muted":"rgba(59,47,47,0.06)","--soft":"rgba(59,47,47,0.04)","--accent":"#b07d62","--border":"rgba(59,47,47,0.14)","--shadow":"rgba(0,0,0,.18)","--tab-bg":"#fff","--tab-fg":"#3b2f2f","--pill-from":"#b07d62","--pill-to":"#d4a373"},forest:{"--bg":"rgba(14,24,18,0.62)","--fg":"#e7f5e9","--muted":"rgba(231,245,233,0.08)","--soft":"rgba(231,245,233,0.05)","--accent":"#34d399","--border":"rgba(231,245,233,0.16)","--shadow":"rgba(0,0,0,.5)","--tab-bg":"rgba(255,255,255,0.06)","--tab-fg":"#e7f5e9","--pill-from":"#10b981","--pill-to":"#84cc16"},violet:{"--bg":"rgba(23, 16, 42, 0.68)","--fg":"#f5f3ff","--muted":"rgba(245,243,255,0.08)","--soft":"rgba(245,243,255,0.05)","--accent":"#a855f7","--border":"rgba(216,180,254,0.22)","--shadow":"rgba(12,3,30,.55)","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#ede9fe","--pill-from":"#a855f7","--pill-to":"#f472b6"},ocean:{"--bg":"rgba(10, 34, 46, 0.66)","--fg":"#e0f7ff","--muted":"rgba(224,247,255,0.07)","--soft":"rgba(224,247,255,0.05)","--accent":"#38bdf8","--border":"rgba(125, 211, 252, 0.22)","--shadow":"rgba(0, 16, 32, .52)","--tab-bg":"rgba(56,189,248,0.14)","--tab-fg":"#e0f7ff","--pill-from":"#0ea5e9","--pill-to":"#14b8a6"},ember:{"--bg":"rgba(34,18,10,0.64)","--fg":"#fff7ed","--muted":"rgba(255,247,237,0.08)","--soft":"rgba(255,247,237,0.05)","--accent":"#f97316","--border":"rgba(255, 159, 92, 0.24)","--shadow":"rgba(16,6,2,.52)","--tab-bg":"rgba(255,247,237,0.09)","--tab-fg":"#fff7ed","--pill-from":"#fb923c","--pill-to":"#facc15"}};function Hn(e){let{host:t,themes:n,initialTheme:r,onThemeChange:o}=e,a=r,i=null,s=!1;function u(l){let c=n[l]||n[a]||{};s&&t.classList.add("theme-anim");for(let[p,m]of Object.entries(c))t.style.setProperty(p,m);s?(i!==null&&clearTimeout(i),i=C.setTimeout(()=>{t.classList.remove("theme-anim"),i=null},320)):s=!0,a=l,o?.(l)}function d(){return a}return u(r),{applyTheme:u,getCurrentTheme:d}}var Kt={ui:{expandedCards:{style:!1,system:!1}}};async function Lr(){let e=await dt("tab-settings",{version:1,defaults:Kt,sanitize:o=>({ui:{expandedCards:jt(Kt.ui.expandedCards,o.ui?.expandedCards)}})});function t(o){let a=e.get();e.update({ui:{...a.ui,...o,expandedCards:jt(a.ui.expandedCards,o.expandedCards)}})}function n(o,a){let i=e.get();e.update({ui:{...i.ui,expandedCards:{...i.ui.expandedCards,[o]:!!a}}})}function r(o){let a=e.get();n(o,!a.ui.expandedCards[o])}return{get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:r}}function Rr(e){return e.replace(/[_-]+/g," ").replace(/^\w/,t=>t.toUpperCase())}function Ol(){return Object.keys(Ge).map(e=>({value:e,label:Rr(e)}))}var Dl=["--bg","--fg","--accent","--muted","--soft","--border","--shadow","--tab-bg","--tab-fg","--pill-from","--pill-to"];function Gl(e){return Rr(e.replace(/^--/,""))}function Hl(e){return e.alpha<1?e.rgba:e.hex}var qt=class extends We{constructor(n){super({id:"tab-settings",label:"Settings"});this.deps=n}async build(n){let r=this.createGrid("12px");r.id="settings",n.appendChild(r);let o;try{o=await Lr()}catch{o={get:()=>Kt,set:()=>{},save:()=>{},setUI:()=>{},setCardExpanded:()=>{},toggleCard:()=>{}}}let a=o.get(),i=Object.keys(Ge),s=this.deps.getCurrentTheme?.()??this.deps.initialTheme,u=i.includes(s)?s:i[0]??"dark",d=u,l=Ut({text:"Theme",tone:"muted",size:"lg"}),c=Je({options:Ol(),value:u,onChange:f=>{d=f,this.deps.applyTheme(f),this.renderThemePickers(f,p,d)}}),p=T("div",{className:"settings-theme-grid"}),m=Oe({title:"Style",padding:"lg",expandable:!0,defaultExpanded:!!a.ui.expandedCards.style,onExpandChange:f=>o.setCardExpanded("style",f)},T("div",{className:"kv settings-theme-row"},l.root,c.root),p);this.renderThemePickers(u,p,d);let g=this.createEnvCard({defaultExpanded:!!a.ui.expandedCards.system,onExpandChange:f=>o.setCardExpanded("system",f)});r.appendChild(m),r.appendChild(g)}renderThemePickers(n,r,o){let a=Ge[n];if(r.replaceChildren(),!!a)for(let i of Dl){let s=a[i];if(s==null)continue;let u=Ar({label:Gl(i),value:s,defaultExpanded:!1,onInput:d=>this.updateThemeVar(n,i,d,o),onChange:d=>this.updateThemeVar(n,i,d,o)});r.appendChild(u.root)}}updateThemeVar(n,r,o,a){let i=Ge[n];i&&(i[r]=Hl(o),a===n&&this.deps.applyTheme(n))}createEnvCard(n){let r=n?.defaultExpanded??!1,o=n?.onExpandChange,a=(h,S)=>{let v=T("div",{className:"kv kv--inline-mobile"}),x=T("label",{},h),w=T("div",{className:"ro"});return typeof S=="string"?w.textContent=S:w.append(S),v.append(x,w),v},i=T("code",{},"\u2014"),s=T("span",{},"\u2014"),u=T("span",{},"\u2014"),d=T("span",{},"\u2014"),l=T("span",{},"\u2014"),c=T("span",{},"\u2014"),p=()=>{let h=ye();u.textContent=h.surface,d.textContent=h.platform,l.textContent=h.browser??"Unknown",c.textContent=h.os??"Unknown",i.textContent=h.host,s.textContent=h.isInIframe?"Yes":"No"},m=De({label:"Copy JSON",variant:"primary",size:"sm"});Er(m,()=>{let h=ye();return JSON.stringify(h,null,2)});let g=T("div",{style:"width:100%;display:flex;justify-content:center;"},m),f=Oe({title:"System",variant:"soft",padding:"lg",footer:g,expandable:!0,defaultExpanded:r,onExpandChange:o},a("Surface",u),a("Platform",d),a("Browser",l),a("OS",c),a("Host",i),a("Iframe",s)),b=()=>{document.hidden||p()};return document.addEventListener("visibilitychange",b),p(),this.addCleanup(()=>document.removeEventListener("visibilitychange",b)),f}};function bt(e){return e<10?`0${e}`:String(e)}function ce(e){let t=/^(\d{1,2}):(\d{2})$/.exec((e||"").trim());if(!t)return 0;let n=Math.max(0,Math.min(23,parseInt(t[1],10)||0)),r=Math.max(0,Math.min(59,parseInt(t[2],10)||0));return n*60+r}function Nn(e){let t=Math.max(0,Math.min(1439,e|0)),n=Math.floor(t/60),r=t%60;return`${bt(n)}:${bt(r)}`}function Me(e,t){let n=ce(e),r=Math.max(0,Math.min(1439,n)),o=Math.floor(r/t)*t;return Nn(o)}function Nl(e){let t=Math.floor(e/60),n=e%60,r=t>=12;return{h12:t%12||12,m:n,pm:r}}function _l(e,t,n){return(e%12+(n?12:0))*60+t}function Wl(e){return e.platform==="mobile"||e.os==="ios"||e.os==="android"}function Or(e={}){let{id:t,start:n="08:00",end:r="23:00",stepMinutes:o=5,disabled:a=!1,allowOvernight:i=!0,labels:s={from:"From",to:"To"},picker:u="auto",format:d="auto",useNativeOn:l,onChange:c}=e,p={start:Me(n,o),end:Me(r,o)},m=T("div",{className:"time-range",id:t});m.classList.add("time-range--stacked");let g=ye();if(u==="native"||u==="auto"&&(l?.(g)??Wl(g)))return b();return h();function b(){let x=T("div",{className:"time-range-field",role:"group"}),w=T("span",{className:"time-range-label"},s.from||"From"),k=T("input",{className:"input time-range-input",type:"time",step:String(o*60),value:p.start}),L=T("div",{className:"time-range-field",role:"group"}),I=T("span",{className:"time-range-label"},s.to||"To"),P=T("input",{className:"input time-range-input",type:"time",step:String(o*60),value:p.end});x.append(w,k),L.append(I,P),m.append(x,L);function O(){k.value=p.start,P.value=p.end}function E(){c?.(J())}function V(N){let G=N.target,A=G===k,D=Me(G.value||(A?p.start:p.end),o);A?(p.start=D,!i&&ce(p.end)<ce(p.start)&&(p.end=p.start)):(p.end=D,!i&&ce(p.end)<ce(p.start)&&(p.start=p.end)),O(),E()}k.addEventListener("change",V),k.addEventListener("blur",V),P.addEventListener("change",V),P.addEventListener("blur",V),a&&_(!0);function J(){return{...p}}function B(N){if(N.start&&(p.start=Me(N.start,o)),N.end&&(p.end=Me(N.end,o)),!i){let G=ce(p.start);ce(p.end)<G&&(p.end=p.start)}O(),E()}function _(N){k.disabled=N,P.disabled=N,m.classList.toggle("is-disabled",!!N)}function j(){k.removeEventListener("change",V),k.removeEventListener("blur",V),P.removeEventListener("change",V),P.removeEventListener("blur",V),m.replaceChildren()}return{root:m,getValue:J,setValue:B,setDisabled:_,destroy:j}}function h(){let x=T("label",{className:"time-range-field"}),w=T("span",{className:"time-range-label"},s.from||"From"),k=T("label",{className:"time-range-field"}),L=T("span",{className:"time-range-label"},s.to||"To"),I=d==="12h"||d==="auto"&&v(),P=S(p.start,I),O=S(p.end,I);x.append(w,P.container),k.append(L,O.container),m.append(x,k),a&&B(!0),J(),P.onAnyChange(()=>{p.start=P.to24h(o),!i&&ce(p.end)<ce(p.start)&&(p.end=p.start,O.setFrom24h(p.end)),c?.(E())}),O.onAnyChange(()=>{p.end=O.to24h(o),!i&&ce(p.end)<ce(p.start)&&(p.start=p.end,P.setFrom24h(p.start)),c?.(E())});function E(){return{...p}}function V(j){if(j.start&&(p.start=Me(j.start,o)),j.end&&(p.end=Me(j.end,o)),!i){let N=ce(p.start);ce(p.end)<N&&(p.end=p.start)}J(),c?.(E())}function J(){P.setFrom24h(p.start),O.setFrom24h(p.end)}function B(j){P.setDisabled(j),O.setDisabled(j),m.classList.toggle("is-disabled",!!j)}function _(){P.destroy(),O.destroy(),m.replaceChildren()}return{root:m,getValue:E,setValue:V,setDisabled:B,destroy:_}}function S(x,w){let k=T("div",{className:"time-picker"}),L=(R,H=2)=>{R.classList.add("time-picker-compact"),R.style.setProperty("--min-ch",String(H))},I=w?Array.from({length:12},(R,H)=>{let W=H+1;return{value:String(W),label:bt(W)}}):Array.from({length:24},(R,H)=>({value:String(H),label:bt(H)})),P=Je({size:"sm",options:I,placeholder:"HH",onChange:()=>j()});L(P.root,2);let O=Math.max(1,Math.min(30,Math.floor(e.stepMinutes??5))),E=Array.from({length:Math.floor(60/O)},(R,H)=>{let W=H*O;return{value:String(W),label:bt(W)}}),V=Je({size:"sm",options:E,placeholder:"MM",onChange:()=>j()});L(V.root,2);let J=w?Je({size:"sm",options:[{value:"am",label:"AM"},{value:"pm",label:"PM"}],value:"am",onChange:()=>j()}):null;J&&L(J.root,3),k.append(P.root,V.root,...J?[J.root]:[]);let B=null;function _(R){B=R}function j(){B?.()}function N(R){let H=ce(R);if(w){let W=Nl(H);P.setValue(String(W.h12),{notify:!1}),V.setValue(String(Math.floor(W.m/O)*O),{notify:!1}),J.setValue(W.pm?"pm":"am",{notify:!1})}else{let W=Math.floor(H/60),z=H%60;P.setValue(String(W),{notify:!1}),V.setValue(String(Math.floor(z/O)*O),{notify:!1})}}function G(R){let H=parseInt(V.getValue()||"0",10)||0;if(w){let W=parseInt(P.getValue()||"12",10)||12,z=(J?.getValue()||"am")==="pm",oe=_l(W,H,z);return Me(Nn(oe),R)}else{let z=(parseInt(P.getValue()||"0",10)||0)*60+H;return Me(Nn(z),R)}}function A(R){P.setDisabled(R),V.setDisabled(R),J?.setDisabled(R),k.classList.toggle("is-disabled",!!R)}function D(){k.replaceChildren()}return{container:k,onAnyChange:_,setFrom24h:N,to24h:G,setDisabled:A,destroy:D}}function v(){try{let w=new Intl.DateTimeFormat(void 0,{hour:"numeric"}).format(new Date(2020,1,1,13));return/AM|PM|am|pm/.test(w)}catch{return!1}}}function Gr(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function jl(e){let t=Gr(e);t=t.replace(/\/\*[\s\S]*?\*\//g,o=>`<span class="tok tok-comm">${o}</span>`),t=t.replace(/(^|\s)(\/\/.*)$/gm,(o,a,i)=>`${a}<span class="tok tok-comm">${i}</span>`),t=t.replace(/`[^`\\]*(?:\\.[^`\\]*)*`/g,o=>`<span class="tok tok-str">${o}</span>`),t=t.replace(/'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/g,o=>`<span class="tok tok-str">${o}</span>`),t=t.replace(/\b(?:0[xX][0-9a-fA-F]+|0[bB][01]+|0[oO][0-7]+|\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?(?:[eE][+-]?\d+)?)\b/g,o=>`<span class="tok tok-num">${o}</span>`);let n=["break","case","catch","class","const","continue","debugger","default","delete","do","else","export","extends","finally","for","function","if","import","in","instanceof","let","new","return","super","switch","this","throw","try","typeof","var","void","while","with","yield","await","enum","implements","interface","package","private","protected","public","static","as","from","of"],r=new RegExp(`\\b(?:${n.join("|")})\\b`,"g");return t=t.replace(r,o=>`<span class="tok tok-kw">${o}</span>`),t=t.replace(/\b(?:true|false|null|undefined|NaN|Infinity)\b/g,o=>`<span class="tok tok-lit">${o}</span>`),t}function Dr(e){if(!e)return new Date().toLocaleTimeString();let t=e instanceof Date?e:new Date(e);if(isNaN(t.getTime()))return String(e);let n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0"),o=String(t.getSeconds()).padStart(2,"0");return`${n}:${r}:${o}`}function Hr(e={}){let{id:t,className:n,height:r,maxLines:o=500,wrap:a=!1,mode:i="plain",showTimestamps:s=!0,autoScroll:u=!0}=e,d=T("div",{className:"log",id:t});n&&d.classList.add(...n.split(" ").filter(Boolean)),a&&d.classList.add("log--wrap");let l=T("div",{className:"log-viewport"}),c=T("div",{className:"log-lines"});l.appendChild(c),d.appendChild(l),r!=null&&(d.style.blockSize=typeof r=="number"?`${r}px`:String(r));let p=i,m=o,g=new Map;function f(_){return p==="js"?jl(_):Gr(_)}function b(_){return _?g.get(_)?.body??c:c}function h(_){let j=typeof _=="string"?{text:_}:_||{text:""},N=b(j.groupKey);if(j.key){let D=Array.from(N.querySelectorAll(`.log-line[data-key="${j.key}"]`)).pop();if(D){j.level&&(D.classList.remove("log-level--debug","log-level--info","log-level--warn","log-level--error"),D.classList.add(`log-level--${j.level}`));let R=D.querySelector(".log-time");s&&R&&(R.textContent=Dr(j.time));let H=D.querySelector(".log-text");H&&(H.innerHTML=f(j.text)),u&&L();return}}let G=document.createElement("div");if(G.className="log-line",j.level&&G.classList.add(`log-level--${j.level}`),j.key&&(G.dataset.key=j.key),s){let D=document.createElement("span");D.className="log-time",D.textContent=Dr(j.time),G.appendChild(D)}let A=document.createElement("span");A.className="log-text",A.innerHTML=f(j.text),G.appendChild(A),N.appendChild(G),O(),u&&L()}function S(_){for(let j of _)h(j)}function v(){c.replaceChildren(),g.clear()}function x(_){p=_,L()}function w(_){d.classList.toggle("log--wrap",!!_),L()}function k(_){m=Math.max(1,Math.floor(_||1))}function L(){requestAnimationFrame(()=>{l.scrollTop=l.scrollHeight})}function I(){let _=0;for(let j=0;j<c.children.length;j+=1){let N=c.children[j];(N.classList.contains("log-line")||N.classList.contains("log-group"))&&(_+=1)}return _}function P(){let _=c.firstElementChild;if(!_)return!1;if(_.classList.contains("log-group")){let j=_.dataset.groupKey;j&&g.delete(j)}return _.remove(),!0}function O(){let _=I();for(;_>m&&P();)_--}function E(_,j){let N=j?.key||`g-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,6)}`;if(g.has(N))return N;let G=document.createElement("div");G.className="log-group",G.dataset.groupKey=N;let A=document.createElement("div");A.className="log-group-header",A.textContent=_;let D=document.createElement("div");D.className="log-group-body",G.append(A,D),c.appendChild(G),g.set(N,{root:G,header:A,body:D});let R=H=>{G.classList.toggle("is-collapsed",!!H)};return j?.collapsed&&R(!0),A.addEventListener("click",()=>R(!G.classList.contains("is-collapsed"))),u&&L(),N}function V(_){g.get(_)}function J(_,j){let N=g.get(_);N&&(j==null?N.root.classList.toggle("is-collapsed"):N.root.classList.toggle("is-collapsed",!!j))}let B=d;return B.add=h,B.addMany=S,B.clear=v,B.setMode=x,B.setWrap=w,B.setMaxLines=k,B.scrollToEnd=L,B.beginGroup=E,B.endGroup=V,B.toggleGroup=J,B}var ue={nativeCtor:null,captured:[],latestOpen:null},Nr=Symbol.for("ariesmod.ws.capture.wrapped"),_r=Symbol.for("ariesmod.ws.capture.native"),Wr=1;function _n(e){return!!e&&e.readyState===Wr}function Bl(){if(_n(ue.latestOpen))return ue.latestOpen;for(let e=ue.captured.length-1;e>=0;e--){let t=ue.captured[e];if(_n(t))return t}return null}function Vl(e,t){ue.captured.push(e),ue.captured.length>25&&ue.captured.splice(0,ue.captured.length-25);let n=()=>{ue.latestOpen=e,t&&console.log("[WS] captured socket opened",e.url)};e.addEventListener("open",n),e.addEventListener("close",()=>{ue.latestOpen===e&&(ue.latestOpen=null),t&&console.log("[WS] captured socket closed",e.url)}),e.readyState===Wr&&n()}function jr(e=C,t={}){let n=!!t.debug,r=e?.WebSocket;if(typeof r!="function")return()=>{};if(r[Nr])return ue.nativeCtor=r[_r]??ue.nativeCtor??null,()=>{};let o=r;ue.nativeCtor=o;function a(i,s){let u=s!==void 0?new o(i,s):new o(i);try{Vl(u,n)}catch{}return u}try{a.prototype=o.prototype}catch{}try{Object.setPrototypeOf(a,o)}catch{}try{a.CONNECTING=o.CONNECTING,a.OPEN=o.OPEN,a.CLOSING=o.CLOSING,a.CLOSED=o.CLOSED}catch{}a[Nr]=!0,a[_r]=o;try{e.WebSocket=a,n&&console.log("[WS] WebSocket capture installed")}catch{return()=>{}}return()=>{try{e.WebSocket===a&&(e.WebSocket=o)}catch{}}}function Fl(e=C){let t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function ht(e=C){let t=Bl();if(t)return{ws:t,source:"captured"};let n=Fl(e);return n?{ws:n,source:"roomConnection"}:{ws:null,source:null}}function Jt(e,t={}){let n=t.pageWindow??C,r=t.intervalMs??500,o=!!t.debug,a=null,i=null,s=()=>{let d=ht(n);(d.ws!==a||d.source!==i)&&(a=d.ws,i=d.source,o&&console.log("[WS] best socket changed:",d.source,d.ws),e(d))};s();let u=setInterval(s,r);return()=>clearInterval(u)}function Ul(e){if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return null}}function zl(e,t=C){let n=t?.MagicCircle_RoomConnection;if(n&&typeof n.sendMessage=="function")try{return Array.isArray(e)?n.sendMessage(...e):n.sendMessage(e),{ok:!0}}catch(a){return{ok:!1,reason:"error",error:a}}let{ws:r}=ht(t);if(!r)return{ok:!1,reason:"no-ws"};if(!_n(r))return{ok:!1,reason:"not-open"};let o=Ul(e);if(o==null)return{ok:!1,reason:"error",error:new Error("Cannot stringify message")};try{return r.send(o),{ok:!0}}catch(a){return{ok:!1,reason:"error",error:a}}}function Br(e,t={},n=C){return zl({type:e,...t},n)}var we={Welcome:"Welcome",PartialState:"PartialState",ServerErrorMessage:"ServerErrorMessage",Config:"Config",InappropriateContentRejected:"InappropriateContentRejected",Emote:"Emote",CurrencyTransaction:"CurrencyTransaction",Pong:"Pong"},M={Chat:"Chat",Emote:"Emote",Wish:"Wish",KickPlayer:"KickPlayer",SetPlayerData:"SetPlayerData",UsurpHost:"UsurpHost",Dev:"Dev",SetSelectedGame:"SetSelectedGame",VoteForGame:"VoteForGame",RequestGame:"RequestGame",RestartGame:"RestartGame",Ping:"Ping",PlayerPosition:"PlayerPosition",Teleport:"Teleport",CheckWeatherStatus:"CheckWeatherStatus",MoveInventoryItem:"MoveInventoryItem",DropObject:"DropObject",PickupObject:"PickupObject",ToggleFavoriteItem:"ToggleFavoriteItem",PutItemInStorage:"PutItemInStorage",RetrieveItemFromStorage:"RetrieveItemFromStorage",MoveStorageItem:"MoveStorageItem",LogItems:"LogItems",PlantSeed:"PlantSeed",WaterPlant:"WaterPlant",HarvestCrop:"HarvestCrop",SellAllCrops:"SellAllCrops",PurchaseSeed:"PurchaseSeed",PurchaseEgg:"PurchaseEgg",PurchaseTool:"PurchaseTool",PurchaseDecor:"PurchaseDecor",PlantEgg:"PlantEgg",HatchEgg:"HatchEgg",PlantGardenPlant:"PlantGardenPlant",PotPlant:"PotPlant",MutationPotion:"MutationPotion",PickupDecor:"PickupDecor",PlaceDecor:"PlaceDecor",RemoveGardenObject:"RemoveGardenObject",PlacePet:"PlacePet",FeedPet:"FeedPet",PetPositions:"PetPositions",SwapPet:"SwapPet",StorePet:"StorePet",NamePet:"NamePet",SellPet:"SellPet",ReportSpeakingStart:"ReportSpeakingStart"};var dh=new Set(Object.values(we)),ph=new Set(Object.values(M));function K(e,t={},n=C){return Br(e,t,n)}function Xt(e,t=C){return K(M.Chat,{scopePath:["Room"],message:e},t)}function Vr(e,t=C){return K(M.Emote,{scopePath:["Room"],emoteType:e},t)}function Fr(e,t=C){return K(M.Wish,{wish:e},t)}function Ur(e,t=C){return K(M.KickPlayer,{scopePath:["Room"],playerId:e},t)}function zr(e,t=C){return K(M.SetPlayerData,{scopePath:["Room"],data:e},t)}function $r(e=C){return K(M.UsurpHost,{},e)}function Kr(e=C){return K(M.ReportSpeakingStart,{},e)}function qr(e,t=C){return K(M.SetSelectedGame,{scopePath:["Room"],gameId:e},t)}function Jr(e,t=C){return K(M.VoteForGame,{scopePath:["Room"],gameId:e},t)}function Xr(e,t=C){return K(M.RequestGame,{scopePath:["Room"],gameId:e},t)}function Yr(e=C){return K(M.RestartGame,{scopePath:["Room"]},e)}function Qr(e,t=C){return K(M.Ping,{id:e},t)}function Wn(e,t,n=C){return K(M.PlayerPosition,{x:e,y:t},n)}var Zr=Wn;function ea(e,t,n=C){return K(M.Teleport,{x:e,y:t},n)}function ta(e=C){return K(M.CheckWeatherStatus,{},e)}function na(e,t,n=C){return K(M.MoveInventoryItem,{fromIndex:e,toIndex:t},n)}function oa(e,t=C){return K(M.DropObject,{slotIndex:e},t)}function ra(e,t=C){return K(M.PickupObject,{objectId:e},t)}function aa(e,t,n=C){return K(M.ToggleFavoriteItem,{itemId:e,favorite:t},n)}function ia(e,t=C){return K(M.PutItemInStorage,{itemId:e},t)}function sa(e,t=C){return K(M.RetrieveItemFromStorage,{itemId:e},t)}function la(e,t,n=C){return K(M.MoveStorageItem,{fromIndex:e,toIndex:t},n)}function ca(e=C){return K(M.LogItems,{},e)}function ua(e,t,n,r=C){return K(M.PlantSeed,{seedId:e,x:t,y:n},r)}function da(e,t=C){return K(M.WaterPlant,{plantId:e},t)}function pa(e,t=C){return K(M.HarvestCrop,{cropId:e},t)}function ma(e=C){return K(M.SellAllCrops,{},e)}function ga(e,t=C){return K(M.PurchaseDecor,{decorId:e},t)}function fa(e,t=C){return K(M.PurchaseEgg,{eggId:e},t)}function ba(e,t=C){return K(M.PurchaseTool,{toolId:e},t)}function ha(e,t=C){return K(M.PurchaseSeed,{seedId:e},t)}function ya(e,t,n,r=C){return K(M.PlantEgg,{eggId:e,x:t,y:n},r)}function xa(e,t=C){return K(M.HatchEgg,{eggId:e},t)}function va(e,t,n,r=C){return K(M.PlantGardenPlant,{plantId:e,x:t,y:n},r)}function Sa(e,t,n=C){return K(M.PotPlant,{plantId:e,potId:t},n)}function wa(e,t,n=C){return K(M.MutationPotion,{potionId:e,targetId:t},n)}function Ta(e,t=C){return K(M.PickupDecor,{decorInstanceId:e},t)}function ka(e,t,n,r=C){return K(M.PlaceDecor,{decorId:e,x:t,y:n},r)}function Pa(e,t=C){return K(M.RemoveGardenObject,{objectId:e},t)}function Ca(e,t,n,r=C){return K(M.PlacePet,{petId:e,x:t,y:n},r)}function Ma(e,t,n=C){return K(M.FeedPet,{petId:e,foodItemId:t},n)}function Aa(e,t=C){return K(M.PetPositions,{positions:e},t)}function Ia(e,t,n=C){return K(M.SwapPet,{petIdA:e,petIdB:t},n)}function Ea(e,t=C){return K(M.StorePet,{petId:e},t)}function La(e,t,n=C){return K(M.NamePet,{petId:e,name:t},n)}function Ra(e,t=C){return K(M.SellPet,{petId:e},t)}var Be={timeRange:{start:"09:00",end:"18:00"},logSettings:{mode:"js",wrap:!1}};async function Da(){return dt("tab-test",{version:1,defaults:Be,sanitize:e=>({timeRange:{start:e.timeRange?.start||Be.timeRange.start,end:e.timeRange?.end||Be.timeRange.end},logSettings:{mode:e.logSettings?.mode||Be.logSettings.mode,wrap:e.logSettings?.wrap??Be.logSettings.wrap}})})}var Yt=class extends We{constructor(){super({id:"tab-test",label:"Test"})}async build(t){let n=this.createContainer("test-section");t.appendChild(n);let r;try{r=await Da()}catch{r={get:()=>Be,set:()=>{},update:()=>{},save:()=>{}}}let o=r.get(),a=Ut({text:"Plage horaire",hint:"Heures actives du mode 'Plage horaire'.",icon:"\u23F0"}),i=Or({start:o.timeRange.start,end:o.timeRange.end,stepMinutes:5,allowOvernight:!0,picker:"auto",format:"12h",onChange:b=>{r.update({timeRange:{start:b.start,end:b.end}})}}),s=T("div",null,a.root,i.root),u=Hr({height:220,mode:o.logSettings.mode,maxLines:1e3});o.logSettings.wrap&&u.setWrap(!0),u.add({level:"info",text:"Log initialise"}),u.add({level:"debug",text:"const x = 42; // demo"}),u.add({level:"warn",text:"Requete lente: fetch('/api') > 1200ms"}),u.add({level:"error",text:"new Error('Boom')"});let d=De({label:"Appliquer",variant:"primary",onClick:()=>{let b=i.getValue();u.add({level:"info",text:`[Apply] ${b.start} -> ${b.end}`})}}),l=Oe({title:"Parametres - Plage horaire",subtitle:"Choisis la fenetre d'activite",variant:"soft",padding:"lg",footer:Rn(d)},s),c=De({label:"Clear",onClick:()=>Xt("test")}),p=De({label:o.logSettings.wrap?"Unwrap":"Wrap",onClick:()=>{let b=!u.classList.contains("log--wrap");u.setWrap(b),p.setLabel(b?"Unwrap":"Wrap"),r.update({logSettings:{...r.get().logSettings,wrap:b}})}}),m=De({label:`Mode: ${o.logSettings.mode}`,onClick:()=>{let h=r.get().logSettings.mode==="js"?"plain":"js";u.setMode(h),m.setLabel(`Mode: ${h}`),r.update({logSettings:{...r.get().logSettings,mode:h}})}}),g=De({label:"Add line",onClick:()=>u.add({level:"debug",text:"function tick(){ return Date.now(); } // sample"})}),f=Oe({title:"Logs",variant:"default",padding:"lg"},u,Rn(c,p,m,g));n.appendChild(l),n.appendChild(f)}};function jn(e){return[new qt(e),new Yt]}function Bn(e){let{shadow:t,initialOpen:n}=e,r=T("div",{className:"gemini-panel",id:"panel",ariaHidden:String(!n)}),o=T("div",{className:"gemini-tabbar"}),a=T("div",{className:"gemini-content",id:"content"}),i=T("div",{className:"gemini-resizer",title:"Resize"}),s=T("button",{className:"gemini-close",title:"Fermer",ariaLabel:"Fermer"},"\u2715");r.append(o,a,i);let u=T("div",{className:"gemini-wrapper"},r);return t.append(u),{panel:r,tabbar:o,content:a,resizer:i,closeButton:s,wrapper:u}}function Vn(e){let{resizer:t,host:n,panel:r,shadow:o,onWidthChange:a,initialWidth:i,minWidth:s,maxWidth:u}=e,d=s,l=u;function c(){let w=ye(),k=Math.round(C.visualViewport?.width??C.innerWidth??0);if(w.platform==="mobile"||w.os==="ios"||w.os==="android"){let L=getComputedStyle(o.host),I=parseFloat(L.getPropertyValue("--inset-l"))||0,P=parseFloat(L.getPropertyValue("--inset-r"))||0,O=Math.max(280,k-Math.round(I+P)),E=Math.min(420,Math.max(300,Math.floor(k*.66))),V=O;d=Math.min(E,O),l=V}else d=s,l=u;return{min:d,max:l}}function p(w){return Math.max(d,Math.min(l,Number(w)||i))}function m(w){let k=p(w);n.style.setProperty("--w",`${k}px`),a(k)}c();let g=ye(),f=!(g.platform==="mobile"||g.os==="ios"||g.os==="android"),b=!1,h=w=>{if(!b)return;w.preventDefault();let k=Math.round(C.innerWidth-w.clientX);m(k)},S=()=>{b&&(b=!1,document.body.style.cursor="",C.removeEventListener("mousemove",h),C.removeEventListener("mouseup",S))},v=w=>{f&&(w.preventDefault(),b=!0,document.body.style.cursor="ew-resize",C.addEventListener("mousemove",h),C.addEventListener("mouseup",S))};t.addEventListener("mousedown",v);function x(){t.removeEventListener("mousedown",v),C.removeEventListener("mousemove",h),C.removeEventListener("mouseup",S)}return{calculateResponsiveBounds:c,constrainWidthToLimits:p,setHudWidth:m,destroy:x}}function Fn(e){let{panel:t,onToggle:n,onClose:r,toggleCombo:o=u=>u.ctrlKey&&u.shiftKey&&u.key.toLowerCase()==="u",closeOnEscape:a=!0}=e;function i(u){let d=t.classList.contains("open");if(a&&u.key==="Escape"&&d){r();return}o(u)&&(u.preventDefault(),u.stopPropagation(),n())}document.addEventListener("keydown",i,{capture:!0});function s(){document.removeEventListener("keydown",i,{capture:!0})}return{destroy:s}}var Ga=`
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
`;var Un=`
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
`;var zn=`
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
`;var $n=`
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
`;function ee(e,t,n){if(e.querySelector(`style[data-style-id="${n}"]`))return;let r=document.createElement("style");r.setAttribute("data-style-id",n),r.textContent=t,e.appendChild(r)}var Ha=`
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
  
`;var Na=`
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
`;var _a=`
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
`;var Wa=`
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
`;var ja=`
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
`;var Ba=`
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
`;var Va=`
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
`;var Fa=`
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
`;var Ua=`
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
`;var za=`
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
`;var $a=`
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
`;var Ka=`
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
`;var qa=`
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
`;var Ja=`
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
`;var Xa=`
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
`;var Ya=`
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
`;var Qa=`
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
`;var $l={all:"initial",position:"fixed",top:"0",right:"0",zIndex:"2147483647",pointerEvents:"auto",fontFamily:'system-ui, -apple-system, "Segoe UI", Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',fontSize:"13px",lineHeight:"1.35"};function Kl(e="gemini-root"){let t=document.createElement("div");t.id=e,Object.assign(t.style,$l),(document.body||document.documentElement).appendChild(t);let n=t.attachShadow({mode:"open"});return{host:t,shadow:n}}function Kn(e){let{hostId:t="gemini-hud-root",initialWidth:n,initialOpen:r,onWidthChange:o,onOpenChange:a,themes:i,initialTheme:s,onThemeChange:u,buildSections:d,initialTab:l,onTabChange:c,toggleCombo:p=A=>A.ctrlKey&&A.shiftKey&&A.key.toLowerCase()==="u",closeOnEscape:m=!0,minWidth:g=420,maxWidth:f=720}=e,{host:b,shadow:h}=Kl(t);ee(h,Un,"variables"),ee(h,zn,"primitives"),ee(h,$n,"utilities"),ee(h,Ga,"hud"),ee(h,Ha,"card"),ee(h,Na,"badge"),ee(h,_a,"button"),ee(h,Wa,"input"),ee(h,ja,"label"),ee(h,Ba,"navTabs"),ee(h,Va,"searchBar"),ee(h,Fa,"select"),ee(h,Ua,"switch"),ee(h,za,"table"),ee(h,$a,"timeRangePicker"),ee(h,Ka,"tooltip"),ee(h,qa,"slider"),ee(h,Ja,"reorderableList"),ee(h,Xa,"colorPicker"),ee(h,Ya,"log"),ee(h,Qa,"settings");let{panel:S,tabbar:v,content:x,resizer:w,closeButton:k,wrapper:L}=Bn({shadow:h,initialOpen:r});function I(A){S.dispatchEvent(new CustomEvent("gemini:hud-open-change",{detail:{isOpen:A},bubbles:!0})),a?.(A)}function P(A){let D=S.classList.contains("open");S.classList.toggle("open",A),S.setAttribute("aria-hidden",A?"false":"true"),A!==D&&I(A)}P(r),k.addEventListener("click",A=>{A.preventDefault(),A.stopPropagation(),P(!1)});let O=Hn({host:b,themes:i,initialTheme:s,onThemeChange:u}),E=Vn({resizer:w,host:b,panel:S,shadow:h,onWidthChange:o||(()=>{}),initialWidth:n,minWidth:g,maxWidth:f});E.setHudWidth(n);let V=d({applyTheme:O.applyTheme,initialTheme:s,getCurrentTheme:O.getCurrentTheme,setHUDWidth:E.setHudWidth,setHUDOpen:P}),J=new ct(V,x,{applyTheme:O.applyTheme,getCurrentTheme:O.getCurrentTheme}),B=V.map(A=>({id:A.id,label:A.label})),_=xr(B,l||B[0]?.id||"",A=>{J.activate(A),c?.(A)});_.root.style.flex="1 1 auto",_.root.style.minWidth="0",v.append(_.root,k),J.activate(l||B[0]?.id||"");let j=Fn({panel:S,onToggle:()=>P(!S.classList.contains("open")),onClose:()=>P(!1),toggleCombo:p,closeOnEscape:m}),N=()=>{_.recalc();let A=parseInt(getComputedStyle(b).getPropertyValue("--w"))||n;E.calculateResponsiveBounds(),E.setHudWidth(A)};C.addEventListener("resize",N);function G(){j.destroy(),E.destroy(),C.removeEventListener("resize",N)}return{host:b,shadow:h,wrapper:L,panel:S,content:x,setOpen:P,setWidth:E.setHudWidth,sections:V,manager:J,nav:_,destroy:G}}var Ye={isOpen:"gemini.hud.isOpen",width:"gemini.hud.width",theme:"gemini.hud.theme",activeTab:"gemini.hud.activeTab"},yt={isOpen:!1,width:480,theme:"dark",activeTab:"tab-settings"};function qn(){return{isOpen:Re(Ye.isOpen,yt.isOpen),width:Re(Ye.width,yt.width),theme:Re(Ye.theme,yt.theme),activeTab:Re(Ye.activeTab,yt.activeTab)}}function Qe(e,t){ut(Ye[e],t)}var ql="https://i.imgur.com/IMkhMur.png",Jl="Stats";function Qt(e){let t=e.iconUrl||ql,n=e.ariaLabel||"Open MGH",r=null,o=null,a=null,i=!1,s=null,u=null,d=["Chat","Leaderboard","Stats","Open Activity Log"],l=v=>{try{return typeof CSS<"u"&&CSS&&typeof CSS.escape=="function"?CSS.escape(v):v.replace(/"/g,'\\"')}catch{return v}};function c(){let v=document.querySelector(d.map(w=>`button[aria-label="${l(w)}"]`).join(","));if(!v)return null;let x=v.parentElement;for(;x&&x!==document.body;){if(d.reduce((k,L)=>k+x.querySelectorAll(`button[aria-label="${l(L)}"]`).length,0)>=2)return x;x=x.parentElement}return null}function p(v){return v}function m(v){let x=Array.from(v.querySelectorAll("button[aria-label]"));if(!x.length)return{refBtn:null,refWrapper:null};let w=x.filter(V=>V.dataset.mghBtn!=="true"&&(V.getAttribute("aria-label")||"")!==(e.ariaLabel||"Open MGH")),k=w.length?w:x,L=k.find(V=>(V.getAttribute("aria-label")||"").toLowerCase()===Jl.toLowerCase())||null,I=k.length>=2?k.length-2:k.length-1,P=L||k[I],O=P.parentElement,E=O&&O.parentElement===v&&O.tagName==="DIV"?O:null;return{refBtn:P,refWrapper:E}}function g(v,x,w){let k=v.cloneNode(!1);k.type="button",k.setAttribute("aria-label",x),k.title=x,k.dataset.mghBtn="true",k.style.pointerEvents="auto",k.removeAttribute("id");let L=document.createElement("img");return L.src=w,L.alt="MGH",L.style.pointerEvents="none",L.style.userSelect="none",L.style.width="76%",L.style.height="76%",L.style.objectFit="contain",L.style.display="block",L.style.margin="auto",k.appendChild(L),k.addEventListener("click",I=>{I.preventDefault(),I.stopPropagation();try{e.onClick?.()}catch{}}),k}function f(){if(i)return!1;i=!0;let v=!1;try{let x=c();if(!x)return!1;s!==x&&(s=x);let{refBtn:w,refWrapper:k}=m(x);if(!w)return!1;o=x.querySelector('div[data-mgh-wrapper="true"]'),!o&&k&&(o=k.cloneNode(!1),o.dataset.mghWrapper="true",o.removeAttribute("id"),v=!0);let L=o?.querySelector('button[data-mgh-btn="true"]')||null;r||(r=L),r||(r=g(w,n,t),o?o.appendChild(r):r.parentElement!==x&&x.appendChild(r),v=!0),o&&o.parentElement!==x&&(x.appendChild(o),v=!0);let I=x;if(I&&I!==u){try{S.disconnect()}catch{}u=I,S.observe(u,{childList:!0,subtree:!0})}return v}finally{i=!1}}f();let b=document.getElementById("App")||document.body,h=null,S=new MutationObserver(v=>{let x=v.every(k=>{let L=Array.from(k.addedNodes||[]),I=Array.from(k.removedNodes||[]),P=L.concat(I);if(P.length===0){let O=k.target;return o&&(O===o||o.contains(O))||r&&(O===r||r.contains(O))}return P.every(O=>!!(!(O instanceof HTMLElement)||o&&(O===o||o.contains(O))||r&&(O===r||r.contains(O))))}),w=v.some(k=>Array.from(k.removedNodes||[]).some(L=>L instanceof HTMLElement?!!(o&&(L===o||o.contains(L))||r&&(L===r||r.contains(L))):!1));x&&!w||h===null&&(h=window.setTimeout(()=>{if(h=null,f()&&o){let L=o.parentElement;L&&L.lastElementChild!==o&&L.appendChild(o)}},150))});return S.observe(b,{childList:!0,subtree:!0}),a=()=>S.disconnect(),()=>{try{a?.()}catch{}try{o?.remove()}catch{}}}var Zl={},ti=[];function Xl(){return ti.slice()}function Yl(e){ti.push(e)}function ni(e){try{return JSON.parse(e)}catch{return}}function Za(e){if(typeof e=="string"){let t=ni(e);return t!==void 0?t:e}return e}function oi(e){if(e!=null){if(typeof e=="string"){let t=ni(e);return t!==void 0?oi(t):e}if(Array.isArray(e)&&typeof e[0]=="string")return e[0];if(typeof e=="object"){let t=e;return t.type??t.Type??t.kind??t.messageType}}}function Ql(e){let t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function F(e,t,n){let r=typeof t=="boolean"?t:!0,o=typeof t=="function"?t:n,a=(i,s)=>{if(oi(i)!==e)return;let d=o(i,s);return d&&typeof d=="object"&&"kind"in d?d:typeof d=="boolean"?d?void 0:{kind:"drop"}:r?void 0:{kind:"drop"}};return Yl(a),a}var xt=new WeakSet,ei=new WeakMap;function ri(e){let t=e.pageWindow,n=!!e.debug,r=e.middlewares&&e.middlewares.length?e.middlewares:Xl();if(!r.length)return()=>{};let o=p=>({ws:p,pageWindow:t,debug:n}),a=(p,m)=>{let g=p;for(let f of r){let b=f(g,o(m));if(b){if(b.kind==="drop")return{kind:"drop"};b.kind==="replace"&&(g=b.message)}}return g!==p?{kind:"replace",message:g}:void 0},i=null,s=null,u=null,d=()=>{let p=t?.MagicCircle_RoomConnection,m=p?.sendMessage;if(!p||typeof m!="function")return!1;if(xt.has(m))return!0;let g=m.bind(p);function f(...b){let h=b.length===1?b[0]:b,S=Za(h),v=a(S,Ql(t));if(v?.kind==="drop"){n&&console.log("[WS] drop outgoing (RoomConnection.sendMessage)",S);return}if(v?.kind==="replace"){let x=v.message;return b.length>1&&Array.isArray(x)?(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",S,"=>",x),g(...x)):(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",S,"=>",x),g(x))}return g(...b)}xt.add(f),ei.set(f,m);try{p.sendMessage=f,xt.add(p.sendMessage),n&&console.log("[WS] outgoing patched via MagicCircle_RoomConnection.sendMessage")}catch{return!1}return i=()=>{try{p.sendMessage===f&&(p.sendMessage=m)}catch{}},!0};(()=>{let p=t?.WebSocket?.prototype,m=p?.send;if(typeof m!="function"||xt.has(m))return;function g(f){let b=Za(f),h=a(b,this);if(h?.kind==="drop"){n&&console.log("[WS] drop outgoing (ws.send)",b);return}if(h?.kind==="replace"){let S=h.message,v=typeof S=="string"||S instanceof ArrayBuffer||S instanceof Blob?S:JSON.stringify(S);return n&&console.log("[WS] replace outgoing (ws.send)",b,"=>",S),m.call(this,v)}return m.call(this,f)}xt.add(g),ei.set(g,m);try{p.send=g,n&&console.log("[WS] outgoing patched via WebSocket.prototype.send")}catch{return}s=()=>{try{p.send===g&&(p.send=m)}catch{}}})();let c=e.waitForRoomConnectionMs??4e3;if(!d()&&c>0){let p=Date.now();u=setInterval(()=>{if(d()){clearInterval(u),u=null;return}Date.now()-p>c&&(clearInterval(u),u=null,n&&console.log("[WS] RoomConnection not found, only ws.send is patched"))},250)}return()=>{if(u){try{clearInterval(u)}catch{}u=null}if(i){try{i()}catch{}i=null}if(s){try{s()}catch{}s=null}}}(function(){try{let t=Zl,n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();var oc={},ii=[];function ec(){return ii.slice()}function ai(e){ii.push(e)}function tc(e){if(e!=null){if(typeof e=="object"){let t=e;if(typeof t.type=="string")return t.type;if(typeof t.Type=="string")return t.Type;if(typeof t.kind=="string")return t.kind;if(typeof t.messageType=="string")return t.messageType}if(Array.isArray(e)&&typeof e[0]=="string")return e[0]}}function nc(e){if(typeof e=="string")try{return JSON.parse(e)}catch{return e}return e}var Jn=Symbol.for("ariesmod.ws.handlers.patched");function te(e,t){if(typeof e=="string"){let o=e,a={match:i=>i.kind==="message"&&i.type===o,handle:t};return ai(a),a}let n=e,r={match:o=>o.kind==="close"&&o.code===n,handle:t};return ai(r),r}function si(e,t=ec(),n={}){let r=n.pageWindow??window,o=!!n.debug;if(e[Jn])return()=>{};e[Jn]=!0;let a={ws:e,pageWindow:r,debug:o},i=c=>{for(let p of t)try{if(!p.match(c))continue;if(p.handle(c,a)===!0)return}catch(m){o&&console.error("[WS] handler error",m,c)}},s=c=>{let p=nc(c.data),m=tc(p);i({kind:"message",raw:c.data,data:p,type:m})},u=c=>{i({kind:"close",code:c.code,reason:c.reason,wasClean:c.wasClean,event:c})},d=c=>i({kind:"open",event:c}),l=c=>i({kind:"error",event:c});return e.addEventListener("message",s),e.addEventListener("close",u),e.addEventListener("open",d),e.addEventListener("error",l),()=>{try{e.removeEventListener("message",s)}catch{}try{e.removeEventListener("close",u)}catch{}try{e.removeEventListener("open",d)}catch{}try{e.removeEventListener("error",l)}catch{}try{delete e[Jn]}catch{}}}(function(){try{let t=oc,n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();te(4800,(e,t)=>{t.debug&&console.log("[WS][Close] Auth failure",e.code,e.reason)});te(4300,(e,t)=>{t.debug&&console.log("[WS][Close] Superseded",e.code,e.reason)});te(4400,(e,t)=>{t.debug&&console.log("[WS][Close] Heartbeat expired",e.code,e.reason)});te(4500,(e,t)=>{t.debug&&console.log("[WS][Close] Player kicked",e.code,e.reason)});te(4200,(e,t)=>{t.debug&&console.log("[WS][Close] Player left voluntarily",e.code,e.reason)});te(4100,(e,t)=>{t.debug&&console.log("[WS][Close] Reconnect initiated",e.code,e.reason)});te(4310,(e,t)=>{t.debug&&console.log("[WS][Close] Server disposed",e.code,e.reason)});te(4250,(e,t)=>{t.debug&&console.log("[WS][Close] User session superseded",e.code,e.reason)});te(4710,(e,t)=>{t.debug&&console.log("[WS][Close] Version expired",e.code,e.reason)});te(4700,(e,t)=>{t.debug&&console.log("[WS][Close] Version mismatch",e.code,e.reason)});te(we.Config,(e,t)=>{t.debug&&console.log("[WS][STC] Config",e.data)});te(we.CurrencyTransaction,(e,t)=>{t.debug&&console.log("[WS][STC] CurrencyTransaction",e.data)});te(we.Emote,(e,t)=>{t.debug&&console.log("[WS][STC] Emote",e.data)});te(we.InappropriateContentRejected,(e,t)=>{t.debug&&console.log("[WS][STC] InappropriateContentRejected",e.data)});te(we.PartialState,(e,t)=>{t.debug&&console.log("[WS][STC] PartialState",e.data)});te(we.Pong,(e,t)=>{t.debug&&console.log("[WS][STC] Pong",e.data)});te(we.ServerErrorMessage,(e,t)=>{t.debug&&console.log("[WS][STC] ServerErrorMessage",e.data)});te(we.Welcome,(e,t)=>{t.debug&&console.log("[WS][STC] Welcome",e.data)});F(M.PlantSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantSeed"),!!1));F(M.WaterPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] WaterPlant"),!!1));F(M.HarvestCrop,(e,t)=>(t.debug&&console.log("[MW][Garden] HarvestCrop"),!!1));F(M.SellAllCrops,(e,t)=>(t.debug&&console.log("[MW][Garden] SellAllCrops"),!!1));F(M.PurchaseSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseSeed"),!!1));F(M.PurchaseEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseEgg"),!!1));F(M.PurchaseTool,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseTool"),!!1));F(M.PurchaseDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseDecor"),!!1));F(M.PlantEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantEgg"),!!1));F(M.HatchEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] HatchEgg"),!!1));F(M.PlantGardenPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantGardenPlant"),!!1));F(M.PotPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PotPlant"),!!1));F(M.MutationPotion,(e,t)=>(t.debug&&console.log("[MW][Garden] MutationPotion"),!!1));F(M.PickupDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PickupDecor"),!!1));F(M.PlaceDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PlaceDecor"),!!1));F(M.RemoveGardenObject,(e,t)=>(t.debug&&console.log("[MW][Garden] RemoveGardenObject"),!!1));F(M.MoveInventoryItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveInventoryItem"),!!1));F(M.DropObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] DropObject"),!!1));F(M.PickupObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] PickupObject"),!!1));F(M.ToggleFavoriteItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] ToggleFavoriteItem"),!!1));F(M.PutItemInStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] PutItemInStorage"),!!1));F(M.RetrieveItemFromStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] RetrieveItemFromStorage"),!!1));F(M.MoveStorageItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveStorageItem"),!!1));F(M.LogItems,(e,t)=>(t.debug&&console.log("[MW][Inventory] LogItems"),!!1));F(M.PlacePet,(e,t)=>(t.debug&&console.log("[MW][Pets] PlacePet"),!!1));F(M.FeedPet,(e,t)=>(t.debug&&console.log("[MW][Pets] FeedPet"),!!1));F(M.PetPositions,(e,t)=>(t.debug&&console.log("[MW][Pets] PetPositions"),!!1));F(M.SwapPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SwapPet"),!!1));F(M.StorePet,(e,t)=>(t.debug&&console.log("[MW][Pets] StorePet"),!!1));F(M.NamePet,(e,t)=>(t.debug&&console.log("[MW][Pets] NamePet"),!!1));F(M.SellPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SellPet"),!!1));console.log("[WS] TESTTEST");F(M.SetSelectedGame,(e,t)=>(t.debug&&console.log("[MW][Session] SetSelectedGame"),!!1));F(M.VoteForGame,(e,t)=>(t.debug&&console.log("[MW][Session] VoteForGame"),!!1));F(M.RequestGame,(e,t)=>(t.debug&&console.log("[MW][Session] RequestGame"),!!1));F(M.RestartGame,(e,t)=>(t.debug&&console.log("[MW][Session] RestartGame"),!!1));F(M.Ping,(e,t)=>(t.debug&&console.log("[MW][Session] Ping"),!!1));F(M.PlayerPosition,(e,t)=>(t.debug&&console.log("[MW][Session] PlayerPosition"),!!1));F(M.Teleport,(e,t)=>(t.debug&&console.log("[MW][Session] Teleport"),!!1));F(M.CheckWeatherStatus,(e,t)=>(t.debug&&console.log("[MW][Session] CheckWeatherStatus"),!!1));F(M.Chat,(e,t)=>(t.debug&&console.log("[MW][Social] Chat"),!!1));F(M.Dev,(e,t)=>(t.debug&&console.log("[MW][Social] Dev"),!!1));F(M.Emote,(e,t)=>(t.debug&&console.log("[MW][Social] Emote"),!!1));F(M.Wish,(e,t)=>(t.debug&&console.log("[MW][Social] Wish"),!!1));F(M.KickPlayer,(e,t)=>(t.debug&&console.log("[MW][Social] KickPlayer"),!!1));F(M.ReportSpeakingStart,(e,t)=>(t.debug&&console.log("[MW][Voice] ReportSpeakingStart"),!!1));F(M.SetPlayerData,(e,t)=>(t.debug&&console.log("[MW][Social] SetPlayerData"),!!1));F(M.UsurpHost,(e,t)=>(t.debug&&console.log("[MW][Social] UsurpHost"),!!1));function rc(e={}){let t=e.pageWindow??C,n=e.pollMs??500,r=!!e.debug,o=[];o.push(jr(t,{debug:r})),o.push(ri({pageWindow:t,middlewares:e.middlewares,debug:r}));let a=null,i=s=>{if(a){try{a()}catch{}a=null}s&&(a=si(s,e.handlers,{debug:r,pageWindow:t}))};return i(ht(t).ws),o.push(Jt(s=>i(s.ws),{intervalMs:n,debug:r,pageWindow:t})),{getWs:()=>ht(t).ws,dispose:()=>{for(let s=o.length-1;s>=0;s--)try{o[s]()}catch{}if(a){try{a()}catch{}a=null}}}}var Zt=null;function li(e={}){return Zt||(Zt=rc(e),Zt)}Ie();var vt=null;function ac(){return C?.document??(typeof document<"u"?document:null)}function Yn(e){if(vt!==null)return;let t=e??ac();if(!t)return;let n=t.scripts;for(let r=0;r<n.length;r++){let a=n.item(r)?.src;if(!a)continue;let i=a.match(/\/(?:r\/\d+\/)?version\/([^/]+)/);if(i?.[1]){vt=i[1];return}}}function ic(){return Yn(),vt}async function sc(e=15e3){let t=performance.now();for(;performance.now()-t<e;){if(Yn(),vt)return vt;await Ae(50)}throw new Error("MGVersion timeout (gameVersion not found)")}var St={init:Yn,get:ic,wait:sc};var ui=C?.location?.origin||"https://magicgarden.gg";function di(){return typeof GM_xmlhttpRequest=="function"}function pi(e,t="text"){return new Promise((n,r)=>{GM_xmlhttpRequest({method:"GET",url:e,responseType:t,onload:o=>o.status>=200&&o.status<300?n(o):r(new Error(`HTTP ${o.status} for ${e}`)),onerror:()=>r(new Error(`Network error for ${e}`)),ontimeout:()=>r(new Error(`Timeout for ${e}`))})})}async function Ze(e){if(di())return JSON.parse((await pi(e,"text")).responseText);let t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.json()}async function tn(e){if(di())return(await pi(e,"blob")).response;let t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.blob()}function mi(e){return new Promise((t,n)=>{let r=URL.createObjectURL(e),o=C?.Image||Image,a=new o;a.decoding="async",a.onload=()=>{URL.revokeObjectURL(r),t(a)},a.onerror=()=>{URL.revokeObjectURL(r),n(new Error("Image decode failed"))},a.src=r})}var pe=(e,t)=>e.replace(/\/?$/,"/")+String(t||"").replace(/^\//,""),lc=e=>e.lastIndexOf("/")>=0?e.slice(0,e.lastIndexOf("/")+1):"",Qn=(e,t)=>String(t||"").startsWith("/")?String(t).slice(1):lc(e)+String(t||"");var nn=null,on=null;async function gi(){return on||nn||(nn=(async()=>{let e=await St.wait(15e3);return on=`${ui}/version/${e}/assets/`,on})(),nn)}async function cc(e){let t=await gi();return pe(t,e)}var xe={base:gi,url:cc};var Zn=new Map;async function uc(e){let t=e||await xe.base();if(Zn.has(t))return Zn.get(t);let n=Ze(pe(t,"manifest.json"));return Zn.set(t,n),n}function dc(e,t){return e?.bundles?.find(n=>n?.name===t)||null}function pc(e){let t=new Set;for(let n of e?.assets||[])for(let r of n?.src||[])typeof r=="string"&&r.endsWith(".json")&&r!=="manifest.json"&&t.add(r);return Array.from(t)}var ge={load:uc,getBundle:dc,listJsonFromBundle:pc};Ie();Ie();Ie();var fi=Function.prototype.bind,Y={_bindPatched:!1,engine:null,tos:null,app:null,renderer:null,ticker:null,stage:null},bi,hi,yi,mc=new Promise(e=>{bi=e}),gc=new Promise(e=>{hi=e}),fc=new Promise(e=>{yi=e});function bc(e){return!!(e&&typeof e=="object"&&typeof e.start=="function"&&typeof e.destroy=="function"&&e.app&&e.app.stage&&e.app.renderer&&e.systems&&typeof e.systems.values=="function")}function hc(e){try{for(let t of e.systems.values()){let n=t?.system;if(n?.name==="tileObject")return n}}catch{}return null}function yc(e){Y.engine=e,Y.tos=hc(e)||null,Y.app=e.app||null,Y.renderer=e.app?.renderer||null,Y.ticker=e.app?.ticker||null,Y.stage=e.app?.stage||null;try{bi(e)}catch{}try{Y.app&&hi(Y.app)}catch{}try{Y.renderer&&yi(Y.renderer)}catch{}}function eo(){return Y.engine?!0:(Y._bindPatched||(Y._bindPatched=!0,Function.prototype.bind=function(e,...t){let n=fi.call(this,e,...t);try{!Y.engine&&bc(e)&&(Function.prototype.bind=fi,Y._bindPatched=!1,yc(e))}catch{}return n}),!1)}eo();async function xc(e=15e3){let t=performance.now();for(;performance.now()-t<e;){if(Y.engine)return!0;eo(),await Ae(50)}throw new Error("MGPixiHooks: engine capture timeout")}async function vc(e=15e3){return Y.engine||await xc(e),!0}function Sc(){return Y.engine&&Y.app?{ok:!0,engine:Y.engine,tos:Y.tos,app:Y.app}:(eo(),{ok:!1,engine:Y.engine,tos:Y.tos,app:Y.app,note:"Not captured. Wait for room, or reload."})}var se={engineReady:mc,appReady:gc,rendererReady:fc,engine:()=>Y.engine,tos:()=>Y.tos,app:()=>Y.app,renderer:()=>Y.renderer,ticker:()=>Y.ticker,stage:()=>Y.stage,PIXI:()=>C.PIXI||null,init:vc,hook:Sc,ready:()=>!!Y.engine};function wt(e){let t=String(e||"").trim();return t?t.startsWith("sprite/")||t.startsWith("sprites/")?t:t.includes("/")?`sprite/${t}`:t:""}function et(e,t){let n=String(e||"").trim().replace(/^sprites?\//,"").replace(/^\/+|\/+$/g,""),r=String(t||"").trim();return r.includes("/")||!n?wt(r):`sprite/${n}/${r}`}function tt(e,t,n,r){let o=et(e,t);if(n.has(o)||r.has(o))return o;let a=String(t||"").trim();if(n.has(a)||r.has(a))return a;let i=wt(a);return n.has(i)||r.has(i)?i:o}function wc(e,t,n=25e3){let r=[e],o=new Set,a=0;for(;r.length&&a++<n;){let i=r.pop();if(!i||o.has(i))continue;if(o.add(i),t(i))return i;let s=i.children;if(Array.isArray(s))for(let u=s.length-1;u>=0;u--)r.push(s[u])}return null}function Tc(e){let t=C.PIXI;if(t?.Texture&&t?.Sprite&&t?.Container&&t?.Rectangle)return{Container:t.Container,Sprite:t.Sprite,Texture:t.Texture,Rectangle:t.Rectangle,AnimatedSprite:t.AnimatedSprite||null};let n=e?.stage,r=wc(n,o=>o?.texture?.frame&&o?.constructor&&o?.texture?.constructor&&o?.texture?.frame?.constructor);if(!r)throw new Error("No Sprite found yet (constructors).");return{Container:n.constructor,Sprite:r.constructor,Texture:r.texture.constructor,Rectangle:r.texture.frame.constructor,AnimatedSprite:t?.AnimatedSprite||null}}async function xi(e,t=15e3){let{sleep:n}=await Promise.resolve().then(()=>(Ie(),ci)),r=performance.now();for(;performance.now()-r<t;)try{return Tc(e)}catch{await n(50)}throw new Error("Constructors timeout")}var He=(...e)=>{try{console.log("[MGSprite]",...e)}catch{}};function kc(e){return e&&typeof e=="object"&&e.frames&&e.meta&&typeof e.meta.image=="string"}function to(e,t,n,r,o){return new e(t,n,r,o)}function Pc(e,t,n,r,o,a,i){let s;try{s=new e({source:t.source,frame:n,orig:r,trim:o||void 0,rotate:a||0})}catch{s=new e(t.baseTexture||t,n,r,o||void 0,a||0)}if(i)if(s.defaultAnchor?.set)try{s.defaultAnchor.set(i.x,i.y)}catch{}else s.defaultAnchor?(s.defaultAnchor.x=i.x,s.defaultAnchor.y=i.y):s.defaultAnchor={x:i.x,y:i.y};try{s.updateUvs?.()}catch{}return s}function Cc(e,t,n,r){let{Texture:o,Rectangle:a}=r;for(let[i,s]of Object.entries(e.frames)){let u=s.frame,d=!!s.rotated,l=d?2:0,c=d?u.h:u.w,p=d?u.w:u.h,m=to(a,u.x,u.y,c,p),g=s.sourceSize||{w:u.w,h:u.h},f=to(a,0,0,g.w,g.h),b=null;if(s.trimmed&&s.spriteSourceSize){let h=s.spriteSourceSize;b=to(a,h.x,h.y,h.w,h.h)}n.set(i,Pc(o,t,m,f,b,l,s.anchor||null))}}function Mc(e,t,n){if(!(!e.animations||typeof e.animations!="object"))for(let[r,o]of Object.entries(e.animations)){if(!Array.isArray(o))continue;let a=o.map(i=>t.get(i)).filter(Boolean);a.length>=2&&n.set(r,a)}}function Ac(e,t){let n=(r,o)=>{let a=String(r||"").trim(),i=String(o||"").trim();!a||!i||(t.has(a)||t.set(a,new Set),t.get(a).add(i))};for(let r of Object.keys(e.frames||{})){let o=/^sprite\/([^/]+)\/(.+)$/.exec(r);o&&n(o[1],o[2])}}async function vi(e,t){let n=await ge.load(e),r=ge.getBundle(n,"default");if(!r)throw new Error("No default bundle in manifest");let o=ge.listJsonFromBundle(r),a=new Set,i=new Map,s=new Map,u=new Map;async function d(l){if(a.has(l))return;a.add(l);let c=await Ze(pe(e,l));if(!kc(c))return;let p=c.meta?.related_multi_packs;if(Array.isArray(p))for(let b of p)await d(Qn(l,b));let m=Qn(l,c.meta.image),g=await mi(await tn(pe(e,m))),f=t.Texture.from(g);Cc(c,f,i,t),Mc(c,i,s),Ac(c,u)}for(let l of o)await d(l);return{textures:i,animations:s,categoryIndex:u}}var Si={enabled:!0,maxEntries:1200,maxCost:5e3,srcCanvasMax:450};function wi(){return{lru:new Map,cost:0,srcCanvas:new Map}}function no(e,t){return`${t.sig}::${e}`}function Ti(e){return e?e.isAnim?e.frames?.length||0:e.tex?1:0:0}function Ic(e,t,n){e.lru.delete(t),e.lru.set(t,n)}function Ec(e,t){if(t.enabled)for(;e.lru.size>t.maxEntries||e.cost>t.maxCost;){let n=e.lru.keys().next().value;if(n===void 0)break;let r=e.lru.get(n);e.lru.delete(n),e.cost=Math.max(0,e.cost-Ti(r??null))}}function oo(e,t){let n=e.lru.get(t);return n?(Ic(e,t,n),n):null}function ro(e,t,n,r){e.lru.set(t,n),e.cost+=Ti(n),Ec(e,r)}function ki(e){e.lru.clear(),e.cost=0,e.srcCanvas.clear()}function Pi(e,t){return e.srcCanvas.get(t)??null}function Ci(e,t,n,r){if(e.srcCanvas.set(t,n),e.srcCanvas.size>r.srcCanvasMax){let o=e.srcCanvas.keys().next().value;o!==void 0&&e.srcCanvas.delete(o)}}function Lc(){return{ready:!1,app:null,renderer:null,ctors:null,baseUrl:null,textures:new Map,animations:new Map,live:new Set,defaultParent:null,overlay:null,categoryIndex:null}}var rn=null,re=Lc(),Rc=wi(),Oc={...Si};function le(){return re}function nt(){return Rc}function Tt(){return Oc}function ao(){return re.ready}async function Mi(){return re.ready?!0:rn||(rn=(async()=>{let e=performance.now();He("init start");let t=await en(se.appReady,15e3,"PIXI app");He("app ready");let n=await en(se.rendererReady,15e3,"PIXI renderer");He("renderer ready"),re.app=t,re.renderer=n||t?.renderer||null,re.ctors=await xi(t),He("constructors resolved"),re.baseUrl=await xe.base(),He("base url",re.baseUrl);let{textures:r,animations:o,categoryIndex:a}=await vi(re.baseUrl,re.ctors);return re.textures=r,re.animations=o,re.categoryIndex=a,He("atlases loaded","textures",re.textures.size,"animations",re.animations.size,"categories",re.categoryIndex?.size??0),re.ready=!0,He("ready in",Math.round(performance.now()-e),"ms"),!0})(),rn)}var Ve={Gold:{overlayTall:null,tallIconOverride:null},Rainbow:{overlayTall:null,tallIconOverride:null,angle:130,angleTall:0},Wet:{overlayTall:"sprite/mutation-overlay/WetTallPlant",tallIconOverride:"sprite/mutation/Puddle"},Chilled:{overlayTall:"sprite/mutation-overlay/ChilledTallPlant",tallIconOverride:null},Frozen:{overlayTall:"sprite/mutation-overlay/FrozenTallPlant",tallIconOverride:null},Dawnlit:{overlayTall:null,tallIconOverride:null},Ambershine:{overlayTall:null,tallIconOverride:null},Dawncharged:{overlayTall:null,tallIconOverride:null},Ambercharged:{overlayTall:null,tallIconOverride:null}},Ii=Object.keys(Ve),Dc=["Gold","Rainbow","Wet","Chilled","Frozen","Ambershine","Dawnlit","Dawncharged","Ambercharged"],Ai=new Map(Dc.map((e,t)=>[e,t]));function an(e){return[...new Set(e.filter(Boolean))].sort((n,r)=>(Ai.get(n)??1/0)-(Ai.get(r)??1/0))}var Gc=["Wet","Chilled","Frozen"];var Ei=new Set(["Dawnlit","Ambershine","Dawncharged","Ambercharged"]),Li={Banana:.6,Carrot:.6,Sunflower:.5,Starweaver:.5,FavaBean:.25,BurrosTail:.2},Ri={Pepper:.5,Banana:.6},Oi=256,Di=.5,Gi=2;function io(e){if(!e.length)return{muts:[],overlayMuts:[],selectedMuts:[],sig:""};let t=an(e),n=Hc(e),r=Nc(e);return{muts:n,overlayMuts:r,selectedMuts:t,sig:`${t.join(",")}|${n.join(",")}|${r.join(",")}`}}function Hc(e){let t=e.filter((o,a,i)=>Ve[o]&&i.indexOf(o)===a);if(!t.length)return[];if(t.includes("Gold"))return["Gold"];if(t.includes("Rainbow"))return["Rainbow"];let n=["Ambershine","Dawnlit","Dawncharged","Ambercharged"];return t.some(o=>n.includes(o))?an(t.filter(o=>!Gc.includes(o))):an(t)}function Nc(e){let t=e.filter((n,r,o)=>Ve[n]?.overlayTall&&o.indexOf(n)===r);return an(t)}function sn(e,t){return e.map(n=>({name:n,meta:Ve[n],overlayTall:Ve[n]?.overlayTall??null,isTall:t}))}var _c={Gold:{op:"source-atop",colors:["rgb(235,200,0)"],a:.7},Rainbow:{op:"color",colors:["#FF1744","#FF9100","#FFEA00","#00E676","#2979FF","#D500F9"],ang:130,angTall:0,masked:!0},Wet:{op:"source-atop",colors:["rgb(50,180,200)"],a:.25},Chilled:{op:"source-atop",colors:["rgb(100,160,210)"],a:.45},Frozen:{op:"source-atop",colors:["rgb(100,130,220)"],a:.5},Dawnlit:{op:"source-atop",colors:["rgb(209,70,231)"],a:.5},Ambershine:{op:"source-atop",colors:["rgb(190,100,40)"],a:.5},Dawncharged:{op:"source-atop",colors:["rgb(140,80,200)"],a:.5},Ambercharged:{op:"source-atop",colors:["rgb(170,60,25)"],a:.5}};var ln=(()=>{try{let t=document.createElement("canvas").getContext("2d");if(!t)return new Set;let n=["color","hue","saturation","luminosity","overlay","screen","lighter","source-atop"],r=new Set;for(let o of n)t.globalCompositeOperation=o,t.globalCompositeOperation===o&&r.add(o);return r}catch{return new Set}})();function Wc(e){return ln.has(e)?e:ln.has("overlay")?"overlay":ln.has("screen")?"screen":ln.has("lighter")?"lighter":"source-atop"}function jc(e,t,n,r,o=!1){let a=(r-90)*Math.PI/180,i=t/2,s=n/2;if(!o){let c=Math.min(t,n)/2;return e.createLinearGradient(i-Math.cos(a)*c,s-Math.sin(a)*c,i+Math.cos(a)*c,s+Math.sin(a)*c)}let u=Math.cos(a),d=Math.sin(a),l=Math.abs(u)*t/2+Math.abs(d)*n/2;return e.createLinearGradient(i-u*l,s-d*l,i+u*l,s+d*l)}function Hi(e,t,n,r,o=!1){let a=r.colors?.length?r.colors:["#fff"],i=r.ang!=null?jc(e,t,n,r.ang,o):e.createLinearGradient(0,0,0,n);a.length===1?(i.addColorStop(0,a[0]),i.addColorStop(1,a[0])):a.forEach((s,u)=>i.addColorStop(u/(a.length-1),s)),e.fillStyle=i,e.fillRect(0,0,t,n)}function Ni(e,t,n,r){let o=_c[n];if(!o)return;let a={...o};n==="Rainbow"&&r&&a.angTall!=null&&(a.ang=a.angTall);let i=n==="Rainbow"&&r,s=t.width,u=t.height;e.save();let d=a.masked?Wc(a.op):"source-in";if(e.globalCompositeOperation=d,a.a!=null&&(e.globalAlpha=a.a),a.masked){let l=document.createElement("canvas");l.width=s,l.height=u;let c=l.getContext("2d");c.imageSmoothingEnabled=!1,Hi(c,s,u,a,i),c.globalCompositeOperation="destination-in",c.drawImage(t,0,0),e.drawImage(l,0,0)}else Hi(e,s,u,a,i);e.restore()}function _i(e){return/tallplant/i.test(e)}function cn(e){let t=String(e||"").split("/");return t[t.length-1]||""}function Wi(e){switch(e){case"Ambershine":return["Ambershine","Amberlit"];case"Dawncharged":return["Dawncharged","Dawnbound"];case"Ambercharged":return["Ambercharged","Amberbound"];default:return[e]}}function Bc(e,t){let n=String(e||"").toLowerCase();for(let r of t.keys()){let o=/sprite\/mutation-overlay\/([A-Za-z0-9]+)TallPlant/i.exec(String(r));if(!o||!o[1])continue;if(o[1].toLowerCase()===n){let i=t.get(r);if(i)return{tex:i,key:r}}}return null}function ji(e,t,n,r){if(!t)return null;let o=cn(e),a=Wi(t);for(let i of a){let s=[`sprite/mutation/${i}${o}`,`sprite/mutation/${i}-${o}`,`sprite/mutation/${i}_${o}`,`sprite/mutation/${i}/${o}`,`sprite/mutation/${i}`];for(let u of s){let d=n.get(u);if(d)return{tex:d,key:u}}if(r){let u=`sprite/mutation-overlay/${i}TallPlant`,d=n.get(u);if(d)return{tex:d,key:u};let l=`sprite/mutation-overlay/${i}`,c=n.get(l);if(c)return{tex:c,key:l};let p=Bc(t,n);if(p)return p}}return null}function Bi(e,t,n,r){if(!t)return null;let o=Ve[t];if(n&&o?.tallIconOverride){let s=r.get(o.tallIconOverride);if(s)return s}let a=cn(e),i=Wi(t);for(let s of i){let u=[`sprite/mutation/${s}Icon`,`sprite/mutation/${s}`,`sprite/mutation/${s}${a}`,`sprite/mutation/${s}-${a}`,`sprite/mutation/${s}_${a}`,`sprite/mutation/${s}/${a}`];for(let d of u){let l=r.get(d);if(l)return l}if(n){let d=`sprite/mutation-overlay/${s}TallPlantIcon`,l=r.get(d);if(l)return l;let c=`sprite/mutation-overlay/${s}TallPlant`,p=r.get(c);if(p)return p}}return null}function Vi(e,t,n){let r=e?.orig?.width??e?.frame?.width??e?.width??1,o=e?.orig?.height??e?.frame?.height??e?.height??1,a=e?.defaultAnchor?.x??0,i=e?.defaultAnchor?.y??0,s=Ri[t]??a,u=o>r*1.5,d=Li[t]??(u?i:.4),l={x:(s-a)*r,y:(d-i)*o},c=Math.min(r,o),p=Math.min(1.5,c/Oi),m=Di*p;return n&&(m*=Gi),{width:r,height:o,anchorX:a,anchorY:i,offset:l,iconScale:m}}function so(e,t,n,r,o){let a=Pi(r,e);if(a)return a;let i=null;try{if(t?.extract?.canvas){let s=new n.Sprite(e);i=t.extract.canvas(s),s.destroy?.({children:!0,texture:!1,baseTexture:!1})}}catch{}if(!i){let s=e?.frame||e?._frame,u=e?.orig||e?._orig,d=e?.trim||e?._trim,l=e?.rotate||e?._rotate||0,c=e?.baseTexture?.resource?.source||e?.baseTexture?.resource||e?.source?.resource?.source||e?.source?.resource||e?._source?.resource?.source||null;if(!s||!c)throw new Error("textureToCanvas fail");i=document.createElement("canvas");let p=Math.max(1,(u?.width??s.width)|0),m=Math.max(1,(u?.height??s.height)|0),g=d?.x??0,f=d?.y??0;i.width=p,i.height=m;let b=i.getContext("2d");b.imageSmoothingEnabled=!1,l===!0||l===2||l===8?(b.save(),b.translate(g+s.height/2,f+s.width/2),b.rotate(-Math.PI/2),b.drawImage(c,s.x,s.y,s.width,s.height,-s.width/2,-s.height/2,s.width,s.height),b.restore()):b.drawImage(c,s.x,s.y,s.width,s.height,g,f,s.width,s.height)}return Ci(r,e,i,o),i}function Vc(e,t,n,r,o,a,i,s){let{w:u,h:d,aX:l,aY:c,basePos:p}=t,m=[];for(let g of n){let f=new r.Sprite(e);f.anchor?.set?.(l,c),f.position.set(p.x,p.y),f.zIndex=1;let b=document.createElement("canvas");b.width=u,b.height=d;let h=b.getContext("2d");h.imageSmoothingEnabled=!1,h.save(),h.translate(u*l,d*c),h.drawImage(so(e,o,r,a,i),-u*l,-d*c),h.restore(),Ni(h,b,g.name,g.isTall);let S=r.Texture.from(b);s.push(S),f.texture=S,m.push(f)}return m}function Fc(e,t,n,r,o,a,i,s,u,d){let{aX:l,basePos:c}=t,p=[];for(let m of n){let g=m.overlayTall&&r.get(m.overlayTall)&&{tex:r.get(m.overlayTall),key:m.overlayTall}||ji(e,m.name,r,!0);if(!g?.tex)continue;let f=so(g.tex,a,o,i,s);if(!f)continue;let b=f.width,h={x:0,y:0},S={x:c.x-l*b,y:0},v=document.createElement("canvas");v.width=b,v.height=f.height;let x=v.getContext("2d");if(!x)continue;x.imageSmoothingEnabled=!1,x.drawImage(f,0,0),x.globalCompositeOperation="destination-in",x.drawImage(u,-S.x,-S.y);let w=o.Texture.from(v);d.push(w);let k=new o.Sprite(w);k.anchor?.set?.(h.x,h.y),k.position.set(S.x,S.y),k.scale.set(1),k.alpha=1,k.zIndex=3,p.push(k)}return p}function Uc(e,t,n,r,o,a){let{basePos:i}=t,s=[];for(let u of n){if(u.name==="Gold"||u.name==="Rainbow")continue;let d=Bi(e,u.name,u.isTall,r);if(!d)continue;let l=new o.Sprite(d),c=d?.defaultAnchor?.x??.5,p=d?.defaultAnchor?.y??.5;l.anchor?.set?.(c,p),l.position.set(i.x+a.offset.x,i.y+a.offset.y),l.scale.set(a.iconScale),u.isTall&&(l.zIndex=-1),Ei.has(u.name)&&(l.zIndex=10),l.zIndex||(l.zIndex=2),s.push(l)}return s}function lo(e,t,n,r){try{if(!e||!r.renderer||!r.ctors?.Container||!r.ctors?.Sprite||!r.ctors?.Texture)return null;let{Container:o,Sprite:a,Texture:i}=r.ctors,s=e?.orig?.width??e?.frame?.width??e?.width??1,u=e?.orig?.height??e?.frame?.height??e?.height??1,d=e?.defaultAnchor?.x??.5,l=e?.defaultAnchor?.y??.5,c={x:s*d,y:u*l},p=so(e,r.renderer,r.ctors,r.cacheState,r.cacheConfig),m=new o;m.sortableChildren=!0;let g=new a(e);g.anchor?.set?.(d,l),g.position.set(c.x,c.y),g.zIndex=0,m.addChild(g);let f=_i(t),b=sn(n.muts,f),h=sn(n.overlayMuts,f),S=sn(n.selectedMuts,f),v=[],x={w:s,h:u,aX:d,aY:l,basePos:c},w=cn(t),k=Vi(e,w,f);Vc(e,x,b,r.ctors,r.renderer,r.cacheState,r.cacheConfig,v).forEach(E=>m.addChild(E)),f&&Fc(t,x,h,r.textures,r.ctors,r.renderer,r.cacheState,r.cacheConfig,p,v).forEach(V=>m.addChild(V)),Uc(t,x,S,r.textures,r.ctors,k).forEach(E=>m.addChild(E));let P=null;if(typeof r.renderer.generateTexture=="function"?P=r.renderer.generateTexture(m,{resolution:1}):r.renderer.textureGenerator?.generateTexture&&(P=r.renderer.textureGenerator.generateTexture({target:m,resolution:1})),!P)throw new Error("no render texture");let O=P instanceof i?P:i.from(r.renderer.extract.canvas(P));P&&P!==O&&P.destroy?.(!0),m.destroy({children:!0,texture:!1,baseTexture:!1});try{O.__mg_gen=!0,O.label=`${t}|${n.sig}`}catch{}return O}catch{return null}}function Fi(e,t,n,r){if(!e||e.length<2)return null;let o=[];for(let a of e){let i=lo(a,t,n,r);i&&o.push(i)}return o.length>=2?o:null}function zc(e){if(e.overlay)return e.overlay;let t=new e.ctors.Container;t.sortableChildren=!0,t.zIndex=99999999;try{e.app.stage.sortableChildren=!0}catch{}return e.app.stage.addChild(t),e.overlay=t,t}function $c(e){let t=e.defaultParent;if(!t)return null;try{return typeof t=="function"?t():t}catch{return null}}function Ui(e,t,n,r,o,a){if(!n.length)return t;let i=io(n);if(!i.sig)return t;let s=no(e,i),u=oo(o,s);if(u?.tex)return u.tex;let d=lo(t,e,i,{renderer:r.renderer,ctors:r.ctors,textures:r.textures,cacheState:o,cacheConfig:a});return d?(ro(o,s,{isAnim:!1,tex:d},a),d):t}function zi(e,t,n,r,o,a){if(!n.length)return t;let i=io(n);if(!i.sig)return t;let s=no(e,i),u=oo(o,s);if(u?.isAnim&&u.frames?.length)return u.frames;let d=Fi(t,e,i,{renderer:r.renderer,ctors:r.ctors,textures:r.textures,cacheState:o,cacheConfig:a});return d?(ro(o,s,{isAnim:!0,frames:d},a),d):t}function co(e,t,n,r,o,a={}){if(!e.ready)throw new Error("MGSprite not ready yet");let i=tt(r,o,e.textures,e.animations),s=a.mutations||[],u=a.parent||$c(e)||zc(e),d=e.renderer?.width||e.renderer?.view?.width||innerWidth,l=e.renderer?.height||e.renderer?.view?.height||innerHeight,c=a.center?d/2:a.x??d/2,p=a.center?l/2:a.y??l/2,m,g=e.animations.get(i);if(g&&g.length>=2){let h=zi(i,g,s,e,t,n),S=e.ctors.AnimatedSprite;if(S)m=new S(h),m.animationSpeed=a.fps?a.fps/60:a.speed??.15,m.loop=a.loop??!0,m.play();else{let v=new e.ctors.Sprite(h[0]),w=1e3/Math.max(1,a.fps||8),k=0,L=0,I=P=>{let O=e.app.ticker?.deltaMS??P*16.666666666666668;if(k+=O,k<w)return;let E=k/w|0;k%=w,L=(L+E)%h.length,v.texture=h[L]};v.__mgTick=I,e.app.ticker?.add?.(I),m=v}}else{let h=e.textures.get(i);if(!h)throw new Error(`Unknown sprite/anim key: ${i}`);let S=Ui(i,h,s,e,t,n);m=new e.ctors.Sprite(S)}let f=a.anchorX??m.texture?.defaultAnchor?.x??.5,b=a.anchorY??m.texture?.defaultAnchor?.y??.5;return m.anchor?.set?.(f,b),m.position.set(c,p),m.scale.set(a.scale??1),m.alpha=a.alpha??1,m.rotation=a.rotation??0,m.zIndex=a.zIndex??999999,u.addChild(m),e.live.add(m),m.__mgDestroy=()=>{try{m.__mgTick&&e.app.ticker?.remove?.(m.__mgTick)}catch{}try{m.destroy?.({children:!0,texture:!1,baseTexture:!1})}catch{try{m.destroy?.()}catch{}}e.live.delete(m)},m}function Kc(e,t){let n=e.renderer;if(n?.extract?.canvas)return n.extract.canvas(t);if(n?.plugins?.extract?.canvas)return n.plugins.extract.canvas(t);throw new Error("No extract.canvas available on renderer")}function uo(e,t,n,r,o,a={}){if(!e.ready)throw new Error("MGSprite not ready yet");let i=tt(r,o,e.textures,e.animations),s=a.mutations||[],u=e.animations.get(i),d=Math.max(0,(a.frameIndex??0)|0),l;if(u?.length){let S=zi(i,u,s,e,t,n);l=S[d%S.length]}else{let S=e.textures.get(i);if(!S)throw new Error(`Unknown sprite/anim key: ${i}`);l=Ui(i,S,s,e,t,n)}let c=new e.ctors.Sprite(l),p=a.anchorX??c.texture?.defaultAnchor?.x??.5,m=a.anchorY??c.texture?.defaultAnchor?.y??.5;c.anchor?.set?.(p,m),c.scale.set(a.scale??1);let g=a.pad??2,f=new e.ctors.Container;f.addChild(c);try{f.updateTransform?.()}catch{}let b=c.getBounds?.(!0)||{x:0,y:0,width:c.width,height:c.height};c.position.set(-b.x+g,-b.y+g);let h=Kc(e,f);try{f.destroy?.({children:!0})}catch{}return h}function $i(e){for(let t of Array.from(e.live))t.__mgDestroy?.()}function Ki(e,t){return e.defaultParent=t,!0}function qi(e,t){return e.defaultParent=t,!0}function ot(){if(!ao())throw new Error("MGSprite not ready yet")}function qc(e,t,n){return typeof t=="string"?co(le(),nt(),Tt(),e,t,n||{}):co(le(),nt(),Tt(),null,e,t||{})}function Jc(e,t,n){return typeof t=="string"?uo(le(),nt(),Tt(),e,t,n||{}):uo(le(),nt(),Tt(),null,e,t||{})}function Xc(){$i(le())}function Yc(e){return Ki(le(),e)}function Qc(e){return qi(le(),e)}function Zc(e,t){let n=le(),r=typeof t=="string"?tt(e,t,n.textures,n.animations):tt(null,e,n.textures,n.animations);return n.textures.has(r)||n.animations.has(r)}function eu(){ot();let e=le().categoryIndex;return e?Array.from(e.keys()).sort((t,n)=>t.localeCompare(n)):[]}function tu(e){ot();let t=String(e||"").trim();if(!t)return[];let n=le().categoryIndex;return n?Array.from(n.get(t)?.values()||[]).sort((r,o)=>r.localeCompare(o)):[]}function nu(e,t){ot();let n=String(e||"").trim(),r=String(t||"").trim();if(!n||!r)return!1;let o=le().categoryIndex;if(!o)return!1;let a=n.toLowerCase(),i=r.toLowerCase();for(let[s,u]of o.entries())if(s.toLowerCase()===a){for(let d of u.values())if(d.toLowerCase()===i)return!0}return!1}function ou(e){ot();let t=le().categoryIndex;if(!t)return[];let n=String(e||"").trim().toLowerCase(),r=[];for(let[o,a]of t.entries())for(let i of a.values()){let s=et(o,i);(!n||s.toLowerCase().startsWith(n))&&r.push(s)}return r.sort((o,a)=>o.localeCompare(a))}function ru(e){ot();let t=String(e||"").trim();if(!t)return null;let n=wt(t),r=/^sprite\/([^/]+)\/(.+)$/.exec(n);if(!r)return null;let o=r[1],a=r[2],i=le().categoryIndex,s=o.toLowerCase(),u=a.toLowerCase(),d=o,l=a;if(i){let c=Array.from(i.keys()).find(g=>g.toLowerCase()===s);if(!c)return null;d=c;let p=i.get(c);if(!p)return null;let m=Array.from(p.values()).find(g=>g.toLowerCase()===u);if(!m)return null;l=m}return{category:d,id:l,key:et(d,l)}}function au(e,t){ot();let n=String(e||"").trim(),r=String(t||"").trim();if(!n||!r)throw new Error("getIdPath(category, id) requires both category and id");let o=le().categoryIndex;if(!o)throw new Error("Sprite categories not indexed");let a=n.toLowerCase(),i=r.toLowerCase(),s=Array.from(o.keys()).find(l=>l.toLowerCase()===a)||n,u=o.get(s);if(!u)throw new Error(`Unknown sprite category: ${n}`);let d=Array.from(u.values()).find(l=>l.toLowerCase()===i)||r;if(!u.has(d))throw new Error(`Unknown sprite id: ${n}/${r}`);return et(s,d)}function iu(){ki(nt())}function su(){return[...Ii]}var Te={init:Mi,ready:ao,show:qc,toCanvas:Jc,clear:Xc,attach:Yc,attachProvider:Qc,has:Zc,key:(e,t)=>et(e,t),getCategories:eu,getCategoryId:tu,hasId:nu,listIds:ou,getIdInfo:ru,getIdPath:au,clearMutationCache:iu,getMutationNames:su};var mo=C,Ee=mo.Object??Object,go=Ee.keys,un=Ee.values,dn=Ee.entries,Fe={items:["WateringCan","PlanterPot","Shovel"],decor:["SmallRock","MediumRock","LargeRock","WoodBench","StoneBench","MarbleBench"],mutations:["Gold","Rainbow","Wet","Chilled","Frozen"],eggs:["CommonEgg","UncommonEgg","RareEgg"],pets:["Worm","Snail","Bee","Chicken","Bunny"],abilities:["ProduceScaleBoost","DoubleHarvest","SeedFinderI","CoinFinderI"],plants:["Carrot","Strawberry","Aloe","Blueberry","Apple"]},lu=["Rain","Frost","Dawn","AmberMoon"],Ji=/main-[^/]+\.js(\?|$)/,cu=3,uu=200,du=50,Xi=new WeakSet,q={isReady:!1,isHookInstalled:!1,data:{items:null,decor:null,mutations:null,eggs:null,pets:null,abilities:null,plants:null,weather:null},spritesResolved:!1,spritesResolving:null,weatherPollingTimer:null,weatherPollAttempts:0},Ue=(e,t)=>t.every(n=>e.includes(n));function ze(e,t){q.data[e]==null&&(q.data[e]=t,pu()&&Zi())}function pu(){return Object.values(q.data).every(e=>e!=null)}function Yi(e,t){if(!e||typeof e!="object"||Xi.has(e))return;Xi.add(e);let n;try{n=go(e)}catch{return}if(!n||n.length===0)return;let r=e,o;if(!q.data.items&&Ue(n,Fe.items)&&(o=r.WateringCan,o&&typeof o=="object"&&"coinPrice"in o&&"creditPrice"in o&&ze("items",r)),!q.data.decor&&Ue(n,Fe.decor)&&(o=r.SmallRock,o&&typeof o=="object"&&"coinPrice"in o&&"creditPrice"in o&&ze("decor",r)),!q.data.mutations&&Ue(n,Fe.mutations)&&(o=r.Gold,o&&typeof o=="object"&&"baseChance"in o&&"coinMultiplier"in o&&ze("mutations",r)),!q.data.eggs&&Ue(n,Fe.eggs)&&(o=r.CommonEgg,o&&typeof o=="object"&&"faunaSpawnWeights"in o&&"secondsToHatch"in o&&ze("eggs",r)),!q.data.pets&&Ue(n,Fe.pets)&&(o=r.Worm,o&&typeof o=="object"&&"coinsToFullyReplenishHunger"in o&&"diet"in o&&Array.isArray(o.diet)&&ze("pets",r)),!q.data.abilities&&Ue(n,Fe.abilities)&&(o=r.ProduceScaleBoost,o&&typeof o=="object"&&"trigger"in o&&"baseParameters"in o&&ze("abilities",r)),!q.data.plants&&Ue(n,Fe.plants)&&(o=r.Carrot,o&&typeof o=="object"&&"seed"in o&&"plant"in o&&"crop"in o&&ze("plants",r)),!(t>=cu))for(let a of n){let i;try{i=r[a]}catch{continue}i&&typeof i=="object"&&Yi(i,t+1)}}function po(e){try{Yi(e,0)}catch{}}function Qi(){if(!q.isHookInstalled){q.isHookInstalled=!0;try{Ee.keys=function(t){return po(t),go.apply(this,arguments)},un&&(Ee.values=function(t){return po(t),un.apply(this,arguments)}),dn&&(Ee.entries=function(t){return po(t),dn.apply(this,arguments)})}catch{}}}function Zi(){if(q.isHookInstalled){try{Ee.keys=go,un&&(Ee.values=un),dn&&(Ee.entries=dn)}catch{}q.isHookInstalled=!1}}function mu(){try{for(let e of mo.document?.scripts||[]){let t=e?.src?String(e.src):"";if(Ji.test(t))return t}}catch{}try{for(let e of mo.performance?.getEntriesByType?.("resource")||[]){let t=e?.name?String(e.name):"";if(Ji.test(t))return t}}catch{}return null}function gu(e,t){let n=Math.max(e.lastIndexOf("const ",t),e.lastIndexOf("let ",t),e.lastIndexOf("var ",t));if(n<0)return null;let r=e.indexOf("=",n);if(r<0||r>t)return null;let o=e.indexOf("{",r);if(o<0||o>t)return null;let a=0,i="",s=!1;for(let u=o;u<e.length;u++){let d=e[u];if(i){if(s){s=!1;continue}if(d==="\\"){s=!0;continue}d===i&&(i="");continue}if(d==='"'||d==="'"){i=d;continue}if(d==="{")a++;else if(d==="}"&&--a===0)return e.slice(o,u+1)}return null}function fu(e){let t={},n=!1;for(let r of lu){let o=e?.[r];if(!o||typeof o!="object")continue;let a=o.iconSpriteKey||null,{iconSpriteKey:i,...s}=o;t[r]={weatherId:r,spriteId:a,...s},n=!0}return t.Sunny||(t.Sunny={weatherId:"Sunny",name:"Sunny",spriteId:"sprite/ui/SunnyIcon",type:"primary"}),!n||t.Rain&&t.Rain.mutator?.mutation!=="Wet"?null:t}async function bu(){if(q.data.weather)return!0;let e=mu();if(!e)return!1;let t="";try{let s=await fetch(e,{credentials:"include"});if(!s.ok)return!1;t=await s.text()}catch{return!1}let n=t.indexOf("fixedTimeSlots:[0,48,96,144,192,240]");if(n<0&&(n=t.indexOf('name:"Amber Moon"')),n<0)return!1;let r=gu(t,n);if(!r)return!1;let o=r.replace(/\b[A-Za-z_$][\w$]*\.(Rain|Frost|Dawn|AmberMoon)\b/g,'"$1"'),a;try{a=Function('"use strict";return('+o+")")()}catch{return!1}let i=fu(a);return i?(q.data.weather=i,!0):!1}function hu(){if(q.weatherPollingTimer)return;q.weatherPollAttempts=0;let e=setInterval(async()=>{(await bu()||++q.weatherPollAttempts>uu)&&(clearInterval(e),q.weatherPollingTimer=null)},du);q.weatherPollingTimer=e}function yu(e){return String(e||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^A-Za-z0-9]/g,"").trim()}function xu(e,t=[]){let n=new Set,r=o=>{let a=String(o||"").trim();a&&n.add(a)};r(e);for(let o of t)r(o);for(let o of Array.from(n.values()))o.endsWith("s")?r(o.slice(0,-1)):r(`${o}s`),o.endsWith("es")&&r(o.slice(0,-2));return Array.from(n.values()).filter(Boolean)}function es(e,t,n,r=[],o=[]){let a=xu(e,r);if(!a.length)return null;let i=[t,...o].filter(l=>typeof l=="string"),s=l=>{let c=String(l||"").trim();if(!c)return null;for(let p of a)try{if(Te.has(p,c))return Te.getIdPath(p,c)}catch{}return null};for(let l of i){let c=s(l);if(c)return c}let u=yu(n||""),d=s(u||n||"");if(d)return d;try{for(let l of a){let c=Te.listIds(`sprite/${l}/`),p=i.map(g=>String(g||"").toLowerCase()),m=String(n||u||"").toLowerCase();for(let g of c){let b=(g.split("/").pop()||"").toLowerCase();if(p.some(h=>h&&h===b)||b===m)return g}for(let g of c){let b=(g.split("/").pop()||"").toLowerCase();if(p.some(h=>h&&b.includes(h))||m&&b.includes(m))return g}}}catch{}return null}function he(e,t,n,r,o=[],a=[]){if(!e||typeof e!="object")return;let i=e.tileRef;if(!i||typeof i!="object")return;let s=String(i.spritesheet||t||"").trim(),u=es(s,n,r,o,a);if(u)try{e.spriteId=u}catch{}let d=e.rotationVariants;if(d&&typeof d=="object")for(let l of Object.values(d))he(l,s,n,r);if(e.immatureTileRef){let l={tileRef:e.immatureTileRef};he(l,s,n,r),l.spriteId&&(e.immatureSpriteId=l.spriteId)}if(e.topmostLayerTileRef){let l={tileRef:e.topmostLayerTileRef};he(l,s,n,r),l.spriteId&&(e.topmostLayerSpriteId=l.spriteId)}e.activeState&&typeof e.activeState=="object"&&he(e.activeState,s,n,e.activeState?.name||r)}function vu(e,t,n,r=[]){if(!Array.isArray(t)||t.length===0)return null;let o=t[0],a=t.slice(1);return es(e,o,n??null,r,a)}function Su(e){for(let[t,n]of Object.entries(e.items||{}))he(n,"items",t,n?.name,["item"]);for(let[t,n]of Object.entries(e.decor||{}))he(n,"decor",t,n?.name);for(let[t,n]of Object.entries(e.mutations||{})){he(n,"mutations",t,n?.name,["mutation"]);let r=vu("mutation-overlay",[`${t}TallPlant`,`${t}TallPlantIcon`,t],n?.name,["mutation-overlay"]);if(r)try{n.overlaySpriteId=r}catch{}}for(let[t,n]of Object.entries(e.eggs||{}))he(n,"pets",t,n?.name,["pet"]);for(let[t,n]of Object.entries(e.pets||{}))he(n,"pets",t,n?.name,["pet"]);for(let[t,n]of Object.entries(e.plants||{})){let r=n;r.seed&&he(r.seed,r.seed?.tileRef?.spritesheet||"seeds",`${t}Seed`,r.seed?.name||`${t} Seed`,["seed","plant","plants"],[t]),r.plant&&he(r.plant,r.plant?.tileRef?.spritesheet||"plants",`${t}Plant`,r.plant?.name||`${t} Plant`,["plant","plants","tallplants"],[t]),r.crop&&he(r.crop,r.crop?.tileRef?.spritesheet||"plants",t,r.crop?.name||t,["plant","plants"],[`${t}Crop`])}}async function ts(){if(!q.spritesResolved)return q.spritesResolving||(q.spritesResolving=(async()=>{try{await ns(2e4,50),await Te.init(),Su(q.data),q.spritesResolved=!0}catch(e){try{console.warn("[MGData] sprite resolution failed",e)}catch{}}finally{q.spritesResolving=null}})()),q.spritesResolving}async function wu(){return q.isReady||(Qi(),hu(),ts(),q.isReady=!0),!0}function Tu(){return q.isReady}function ku(){return Zi(),q.weatherPollingTimer&&(clearInterval(q.weatherPollingTimer),q.weatherPollingTimer=null),q.isReady=!1,!0}function Pu(){return!q.spritesResolved&&!q.spritesResolving&&ts(),{...q.data}}function Cu(e){return q.data[e]??null}function Mu(e){return q.data[e]!=null}async function ns(e=1e4,t=50){let n=Date.now();for(;Date.now()-n<e;){if(Object.values(q.data).some(r=>r!=null))return{...q.data};await Ae(t)}throw new Error("MGData.waitForAnyData: timeout")}async function Au(e,t=1e4,n=50){let r=Date.now();for(;Date.now()-r<t;){let o=q.data[e];if(o!=null)return o;await Ae(n)}throw new Error(`MGData.waitFor: timeout waiting for "${e}"`)}var ke={init:wu,isReady:Tu,stop:ku,getAll:Pu,get:Cu,has:Mu,waitForAnyData:ns,waitFor:Au};Qi();Ie();var pn=null,ve={ready:!1,xform:null,xformAt:0};function at(e){try{if(typeof structuredClone=="function")return structuredClone(e)}catch{}try{return JSON.parse(JSON.stringify(e))}catch{}return e}function kt(){return se.tos()}function ho(){return se.engine()}function Iu(){let e=kt()?.map?.cols;return Number.isFinite(e)&&e>0?e:null}function yo(e,t){let n=Iu();return n?t*n+e|0:null}function $e(e,t,n=!0){let r=kt(),o=yo(e,t);if(!r||o==null)return{gidx:null,tv:null};let a=r.tileViews?.get?.(o)||null;if(!a&&n&&typeof r.getOrCreateTileView=="function")try{a=r.getOrCreateTileView(o)}catch{}return{gidx:o,tv:a||null}}function rt(e,t,n,r={}){let o=r.ensureView!==!1,a=r.forceUpdate!==!1,i=ho(),{gidx:s,tv:u}=$e(Number(e),Number(t),o);if(s==null)throw new Error("MGTile: cols unavailable (engine/TOS not ready)");if(!u)throw new Error("MGTile: TileView unavailable (not instantiated)");let d=u.tileObject;if(typeof u.onDataChanged!="function")throw new Error("MGTile: tileView.onDataChanged not found (different API?)");if(u.onDataChanged(n),a&&i?.reusableContext&&typeof u.update=="function")try{u.update(i.reusableContext)}catch{}return{ok:!0,tx:Number(e),ty:Number(t),gidx:s,before:d,after:u.tileObject}}function xo(e,t){if(!e)throw new Error("MGTile: no tileObject on this tile");if(e.objectType!==t)throw new Error(`MGTile: expected objectType "${t}", got "${e.objectType}"`)}function fo(e,t){if("startTime"in t&&(e.startTime=Number(t.startTime)),"endTime"in t&&(e.endTime=Number(t.endTime)),"targetScale"in t&&(e.targetScale=Number(t.targetScale)),"mutations"in t){if(!Array.isArray(t.mutations))throw new Error("MGTile: mutations must be an array of strings");e.mutations=t.mutations.slice()}}function Le(){if(!ve.ready)throw new Error("MGTile: not ready. Call MGTile.init() first.")}function bo(e){if(!e)return null;let t=o=>o&&(typeof o.getGlobalPosition=="function"||typeof o.toGlobal=="function"),n=["container","root","view","tile","ground","base","floor","bg","background","baseSprite","tileSprite","displayObject","gfx","graphics","sprite"];for(let o of n)if(t(e[o]))return e[o];if(t(e))return e;let r=[e.container,e.root,e.view,e.displayObject,e.tileSprite,e.gfx,e.graphics,e.sprite];for(let o of r)if(t(o))return o;try{for(let o of Object.keys(e))if(t(e[o]))return e[o]}catch{}return null}function mn(e){let t=de(()=>e?.getGlobalPosition?.());if(t&&Number.isFinite(t.x)&&Number.isFinite(t.y))return{x:t.x,y:t.y};let n=de(()=>e?.toGlobal?.({x:0,y:0}));return n&&Number.isFinite(n.x)&&Number.isFinite(n.y)?{x:n.x,y:n.y}:null}function Eu(e){try{if(!e?.getBounds)return"center";let t=e.getBounds(),n=mn(e);if(!n||!t||!Number.isFinite(t.width)||!Number.isFinite(t.height))return"center";let r=t.x+t.width/2,o=t.y+t.height/2;return Math.hypot(n.x-r,n.y-o)<Math.hypot(n.x-t.x,n.y-t.y)?"center":"topleft"}catch{return"center"}}function Lu(){let e=kt(),t=e?.map?.cols,n=e?.map?.rows;if(!e||!Number.isFinite(t)||t<=1)return null;let r=Number.isFinite(n)&&n>1?n:null,o=[[0,0],[1,1],[Math.min(2,t-2),0],[0,1]];r&&r>2&&o.push([Math.floor(t/2),Math.floor(r/2)]);for(let[a,i]of o){if(a<0||i<0||a>=t||r&&i>=r)continue;let s=$e(a,i,!0).tv,u=a+1<t?$e(a+1,i,!0).tv:null,d=$e(a,i+1,!0).tv,l=bo(s),c=bo(u),p=bo(d);if(!l||!c||!p)continue;let m=mn(l),g=mn(c),f=mn(p);if(!m||!g||!f)continue;let b={x:g.x-m.x,y:g.y-m.y},h={x:f.x-m.x,y:f.y-m.y},S=b.x*h.y-b.y*h.x;if(!Number.isFinite(S)||Math.abs(S)<1e-6)continue;let v=1/S,x={a:h.y*v,b:-h.x*v,c:-b.y*v,d:b.x*v},w={x:m.x-a*b.x-i*h.x,y:m.y-a*b.y-i*h.y},k=Eu(l),L=k==="center"?w:{x:w.x+.5*(b.x+h.x),y:w.y+.5*(b.y+h.y)};return{ok:!0,cols:t,rows:r,vx:b,vy:h,inv:x,anchorMode:k,originCenter:L}}return null}async function Ru(e=15e3){return ve.ready?!0:pn||(pn=(async()=>{if(await se.init(e),!kt())throw new Error("MGTile: engine captured but tileObject system not found");return ve.ready=!0,!0})(),pn)}function Ou(){return se.hook()}function gn(e,t,n={}){Le();let r=n.ensureView!==!1,o=n.clone!==!1,{gidx:a,tv:i}=$e(Number(e),Number(t),r);if(a==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!i)return{tx:Number(e),ty:Number(t),gidx:a,tileView:null,tileObject:void 0};let s=i.tileObject;return{tx:Number(e),ty:Number(t),gidx:a,tileView:i,tileObject:o?at(s):s}}function Du(e,t,n={}){return Le(),rt(e,t,null,n)}function Gu(e,t,n,r={}){Le();let a=gn(e,t,{...r,clone:!1}).tileView?.tileObject;xo(a,"plant");let i=at(a);if(Array.isArray(i.slots)||(i.slots=[]),"plantedAt"in n&&(i.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(i.maturedAt=Number(n.maturedAt)),"species"in n&&(i.species=String(n.species)),"slotIdx"in n&&"slotPatch"in n){let s=Number(n.slotIdx)|0;if(!i.slots[s])throw new Error(`MGTile: plant slot ${s} doesn't exist`);return fo(i.slots[s],n.slotPatch),rt(e,t,i,r)}if("slots"in n){let s=n.slots;if(Array.isArray(s)){for(let u=0;u<s.length;u++)if(s[u]!=null){if(!i.slots[u])throw new Error(`MGTile: plant slot ${u} doesn't exist`);fo(i.slots[u],s[u])}}else if(s&&typeof s=="object")for(let u of Object.keys(s)){let d=Number(u)|0;if(Number.isFinite(d)){if(!i.slots[d])throw new Error(`MGTile: plant slot ${d} doesn't exist`);fo(i.slots[d],s[d])}}else throw new Error("MGTile: patch.slots must be array or object map");return rt(e,t,i,r)}return rt(e,t,i,r)}function Hu(e,t,n,r={}){Le();let a=gn(e,t,{...r,clone:!1}).tileView?.tileObject;xo(a,"decor");let i=at(a);return"rotation"in n&&(i.rotation=Number(n.rotation)),rt(e,t,i,r)}function Nu(e,t,n,r={}){Le();let a=gn(e,t,{...r,clone:!1}).tileView?.tileObject;xo(a,"egg");let i=at(a);return"plantedAt"in n&&(i.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(i.maturedAt=Number(n.maturedAt)),rt(e,t,i,r)}function _u(e,t,n,r={}){Le();let o=r.ensureView!==!1,a=r.forceUpdate!==!1,i=ho(),{gidx:s,tv:u}=$e(Number(e),Number(t),o);if(s==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!u)throw new Error("MGTile: TileView unavailable");let d=u.tileObject,l=typeof n=="function"?n(at(d)):n;if(u.onDataChanged(l),a&&i?.reusableContext&&typeof u.update=="function")try{u.update(i.reusableContext)}catch{}return{ok:!0,tx:Number(e),ty:Number(t),gidx:s,before:d,after:u.tileObject}}function Wu(e,t,n={}){Le();let r=n.ensureView!==!1,{gidx:o,tv:a}=$e(Number(e),Number(t),r);if(o==null)throw new Error("MGTile: cols unavailable");if(!a)return{ok:!0,tx:Number(e),ty:Number(t),gidx:o,tv:null,tileObject:void 0};let i=n.clone!==!1,s=a.tileObject;return{ok:!0,tx:Number(e),ty:Number(t),gidx:o,objectType:s?.objectType??null,tileObject:i?at(s):s,tvKeys:Object.keys(a||{}).sort(),tileView:a}}function os(){return Le(),ve.xform=Lu(),ve.xformAt=Date.now(),{ok:!!ve.xform?.ok,xform:ve.xform}}function ju(e,t={}){if(Le(),!e||!Number.isFinite(e.x)||!Number.isFinite(e.y))return null;let n=Number.isFinite(t.maxAgeMs)?Number(t.maxAgeMs):1500;(!ve.xform?.ok||t.forceRebuild||Date.now()-ve.xformAt>n)&&os();let r=ve.xform;if(!r?.ok)return null;let o=e.x-r.originCenter.x,a=e.y-r.originCenter.y,i=r.inv.a*o+r.inv.b*a,s=r.inv.c*o+r.inv.d*a,u=Math.floor(i),d=Math.floor(s),l=[[u,d],[u+1,d],[u,d+1],[u+1,d+1]],c=null,p=1/0;for(let[m,g]of l){if(m<0||g<0||m>=r.cols||Number.isFinite(r.rows)&&r.rows!==null&&g>=r.rows)continue;let f=r.originCenter.x+m*r.vx.x+g*r.vy.x,b=r.originCenter.y+m*r.vx.y+g*r.vy.y,h=(e.x-f)**2+(e.y-b)**2;h<p&&(p=h,c={tx:m,ty:g,fx:i,fy:s,x:e.x,y:e.y,gidx:null})}return c?(c.gidx=yo(c.tx,c.ty),c):null}function Bu(){return["MGTile.init()","MGTile.hook()","MGTile.getTileObject(tx,ty) / inspect(tx,ty)","MGTile.setTileEmpty(tx,ty)","MGTile.setTilePlant(tx,ty,{...}) / setTileDecor / setTileEgg","MGTile.setTileObjectRaw(tx,ty,objOrFn)","MGTile.rebuildTransform() / pointToTile({x,y})"].join(`
`)}var Pe={init:Ru,ready:()=>ve.ready,hook:Ou,engine:()=>ho(),tos:()=>kt(),gidx:(e,t)=>yo(Number(e),Number(t)),getTileObject:gn,inspect:Wu,setTileEmpty:Du,setTilePlant:Gu,setTileDecor:Hu,setTileEgg:Nu,setTileObjectRaw:_u,rebuildTransform:os,pointToTile:ju,help:Bu};Ie();var U={ready:!1,app:null,renderer:null,stage:null,ticker:null,tileSets:new Map,highlights:new Map,watches:new Map,fades:new Map,fadeWatches:new Map},ko=e=>!!e&&typeof e=="object"&&!Array.isArray(e),vo=e=>!!(e&&typeof e.getBounds=="function"&&("parent"in e||"children"in e)),bn=e=>!!(e&&typeof e.tint=="number"),Ke=e=>!!(e&&typeof e.alpha=="number");function fn(e,t,n){return e+(t-e)*n}function Vu(e,t,n){let r=e>>16&255,o=e>>8&255,a=e&255,i=t>>16&255,s=t>>8&255,u=t&255,d=fn(r,i,n)|0,l=fn(o,s,n)|0,c=fn(a,u,n)|0;return d<<16|l<<8|c}function Fu(e,t=900){let n=[],r=[e];for(;r.length&&n.length<t;){let o=r.pop();if(!o)continue;bn(o)&&n.push(o);let a=o.children;if(Array.isArray(a))for(let i=a.length-1;i>=0;i--)r.push(a[i])}return n}function Uu(e,t=25e3){let n=[],r=[e],o=0;for(;r.length&&o++<t;){let a=r.pop();if(!a)continue;Ke(a)&&n.push(a);let i=a.children;if(Array.isArray(i))for(let s=i.length-1;s>=0;s--)r.push(i[s])}return n}function rs(e){if(!Array.isArray(e))return[];let t=new Set,n=[];for(let r of e){let o,a;if(Array.isArray(r))o=r[0],a=r[1];else if(ko(r))o=r.x??r.tx,a=r.y??r.ty;else continue;if(o=Number(o),a=Number(a),!Number.isFinite(o)||!Number.isFinite(a))continue;o|=0,a|=0;let i=`${o},${a}`;t.has(i)||(t.add(i),n.push({x:o,y:a}))}return n}function zu(e,t){let n=String(e||"").trim();if(!n)throw new Error("MGPixi.defineTileSet: empty name");let r=rs(t);return U.tileSets.set(n,r),{ok:!0,name:n,count:r.length}}function $u(e){return U.tileSets.delete(String(e||"").trim())}function Ku(){return Array.from(U.tileSets.keys()).sort((e,t)=>e.localeCompare(t))}function as(e){return!!(e&&(e.tileSet!=null||Array.isArray(e.tiles)))}function Po(e){let n=Pe.tos?.()?.tileViews;if(!n?.entries)throw new Error("MGPixi: TOS.tileViews not found");if(!as(e))return{entries:Array.from(n.entries()),gidxSet:null};let r=[];if(e.tileSet!=null){let a=String(e.tileSet||"").trim(),i=U.tileSets.get(a);if(!i)throw new Error(`MGPixi: tileSet not found "${a}"`);r=i}else r=rs(e.tiles||[]);let o=new Map;for(let a of r){let i=Pe.getTileObject(a.x,a.y,{ensureView:!0,clone:!1});i?.tileView&&i.gidx!=null&&o.set(i.gidx,i.tileView)}return{entries:Array.from(o.entries()),gidxSet:new Set(o.keys())}}function Co(e){let t=U.highlights.get(e);if(!t)return!1;de(()=>U.ticker?.remove(t.tick)),t.root&&t.baseAlpha!=null&&Ke(t.root)&&de(()=>{t.root.alpha=t.baseAlpha});for(let n of t.tint)n.o&&bn(n.o)&&de(()=>{n.o.tint=n.baseTint});return U.highlights.delete(e),!0}function is(e=null){for(let t of Array.from(U.highlights.keys()))e&&!String(t).startsWith(e)||Co(t);return!0}function ss(e,t={}){if(qe(),!vo(e))throw new Error("MGPixi.highlightPulse: invalid root");let n=String(t.key||`hl:${Math.random().toString(16).slice(2)}`);if(U.highlights.has(n))return n;let r=Ke(e)?Number(e.alpha):null,o=me(Number(t.minAlpha??.12),0,1),a=me(Number(t.maxAlpha??1),0,1),i=Number(t.speed??1.25),s=(t.tint??8386303)>>>0,u=me(Number(t.tintMix??.85),0,1),d=t.deepTint!==!1,l=[];if(d)for(let m of Fu(e))l.push({o:m,baseTint:m.tint});else bn(e)&&l.push({o:e,baseTint:e.tint});let c=performance.now(),p=()=>{let m=(performance.now()-c)/1e3,g=(Math.sin(m*Math.PI*2*i)+1)/2,f=g*g*(3-2*g);r!=null&&Ke(e)&&(e.alpha=me(fn(o,a,f)*r,0,1));let b=f*u;for(let h of l)h.o&&bn(h.o)&&(h.o.tint=Vu(h.baseTint,s,b))};return U.ticker?.add(p),U.highlights.set(n,{root:e,tick:p,baseAlpha:r,tint:l}),n}var qu=["plantVisual","cropVisual","slotVisual","slotView","displayObject","view","container","root","sprite","gfx","graphics"];function So(e){if(!e)return null;if(vo(e))return e;if(!ko(e))return null;for(let t of qu){let n=e[t];if(vo(n))return n}return null}function Ju(e,t){let n=[{o:e,d:0}],r=new Set,o=6;for(;n.length;){let{o:a,d:i}=n.shift();if(!(!a||i>o)&&!r.has(a)){if(r.add(a),Array.isArray(a)){if(a.length===t){let s=new Array(t),u=!0;for(let d=0;d<t;d++){let l=So(a[d]);if(!l){u=!1;break}s[d]=l}if(u)return s}for(let s of a)n.push({o:s,d:i+1});continue}if(ko(a)){let s=a;for(let u of Object.keys(s))n.push({o:s[u],d:i+1})}}}return null}function Xu(e,t){let n=e?.mutations;if(!Array.isArray(n))return!1;for(let r of n)if(String(r||"").toLowerCase()===t)return!0;return!1}function ls(e,t={}){qe();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.highlightMutation: empty mutation");let{entries:r,gidxSet:o}=Po(t),a=`hlmut:${n}:`;if(t.clear===!0)if(!o)is(a);else for(let c of Array.from(U.highlights.keys())){if(!c.startsWith(a))continue;let p=c.split(":"),m=Number(p[2]);o.has(m)&&Co(c)}let i={tint:(t.tint??8386303)>>>0,minAlpha:Number(t.minAlpha??.12),maxAlpha:Number(t.maxAlpha??1),speed:Number(t.speed??1.25),tintMix:Number(t.tintMix??.85),deepTint:t.deepTint!==!1},s=0,u=0,d=0,l=0;for(let[c,p]of r){let m=p?.tileObject;if(!m||m.objectType!=="plant")continue;let g=m.slots;if(!Array.isArray(g)||g.length===0)continue;let f=!1,b=[];for(let v=0;v<g.length;v++)Xu(g[v],n)&&(b.push(v),f=!0);if(!f)continue;s++,u+=b.length;let h=p?.childView?.plantVisual||p?.childView||p,S=Ju(h,g.length);if(!S){l+=b.length;continue}for(let v of b){let x=S[v];if(!x){l++;continue}let w=`${a}${c}:${v}`;U.highlights.has(w)||(ss(x,{key:w,...i}),d++)}}return{ok:!0,mutation:n,filtered:!!o,plantsMatched:s,matchedSlots:u,newHighlights:d,failedSlots:l}}function Yu(e,t={}){qe();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchMutation: empty mutation");let r=`watchmut:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,o=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,a=U.watches.get(r);a&&clearInterval(a);let i=setInterval(()=>{de(()=>ls(n,{...t,clear:!1}))},o);return U.watches.set(r,i),{ok:!0,key:r,mutation:n,intervalMs:o}}function Qu(e){let t=String(e||"").trim();if(!t)return!1;if(!t.startsWith("watchmut:")){let r=t.toLowerCase(),o=0;for(let[a,i]of Array.from(U.watches.entries()))a.startsWith(`watchmut:${r}:`)&&(clearInterval(i),U.watches.delete(a),o++);return o>0}let n=U.watches.get(t);return n?(clearInterval(n),U.watches.delete(t),!0):!1}function Zu(e){let t=Array.isArray(e?.slots)?e.slots:[];return{objectType:"plant",species:e?.species??null,plantedAt:e?.plantedAt??null,maturedAt:e?.maturedAt??null,slotCount:t.length,slots:t.map((n,r)=>({idx:r,mutations:Array.isArray(n?.mutations)?n.mutations.slice():[]}))}}function ed(e,t,n={}){qe();let r=Number(e)|0,o=Number(t)|0,a=n.ensureView!==!1,i=Pe.getTileObject(r,o,{ensureView:a,clone:!1}),s=i?.tileView||null,u=s?.tileObject,d={ok:!0,tx:r,ty:o,gidx:i?.gidx??Pe.gidx?.(r,o)??null,hasTileView:!!s,objectType:u?.objectType??null,tileObject:u??null,summary:u?.objectType==="plant"?Zu(u):u?{objectType:u.objectType??null}:null,display:s?s.childView?.plantVisual||s.childView||s.displayObject||s:null};return n.log!==!1&&de(()=>console.log("[MGPixi.inspectTile]",d)),d}function td(e){let t=e?.childView?.plantVisual||e?.childView?.cropVisual||e?.childView||e?.displayObject||e;return So(t)||So(e?.displayObject)||null}function cs(e){let t=U.fades.get(e);if(!t)return!1;for(let n of t.targets)n.o&&Ke(n.o)&&Number.isFinite(n.baseAlpha)&&de(()=>{n.o.alpha=n.baseAlpha});return U.fades.delete(e),!0}function wo(e=null){for(let t of Array.from(U.fades.keys()))e&&!String(t).startsWith(e)||cs(t);return!0}function us(e,t={}){qe();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.clearSpeciesFade: empty species");let r=`fade:${n}:`;if(!as(t))return wo(r);let{gidxSet:o}=Po(t);if(!o)return wo(r);for(let a of Array.from(U.fades.keys())){if(!a.startsWith(r))continue;let i=Number(a.slice(r.length));o.has(i)&&cs(a)}return!0}function ds(e,t={}){qe();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.fadeSpecies: empty species");let r=me(Number(t.alpha??.2),0,1),o=t.deep===!0,{entries:a,gidxSet:i}=Po(t),s=`fade:${n}:`;t.clear===!0&&us(n,t);let u=0,d=0,l=0,c=0;for(let[p,m]of a){let g=m?.tileObject;if(!g||g.objectType!=="plant")continue;u++;let f=String(g.species||"").trim().toLowerCase();if(!f||f!==n)continue;d++;let b=td(m);if(!b||!Ke(b)){c++;continue}let h=`${s}${p}`;if(U.fades.has(h)){de(()=>{b.alpha=r}),l++;continue}let S=o?Uu(b):[b],v=[];for(let x of S)Ke(x)&&v.push({o:x,baseAlpha:Number(x.alpha)});for(let x of v)de(()=>{x.o.alpha=r});U.fades.set(h,{targets:v}),l++}return{ok:!0,species:n,alpha:r,deep:o,filtered:!!i,plantsSeen:u,matchedPlants:d,applied:l,failed:c,totalFades:U.fades.size}}function nd(e,t={}){qe();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchFadeSpecies: empty species");let r=`watchfade:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,o=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,a=U.fadeWatches.get(r);a&&clearInterval(a);let i=setInterval(()=>{de(()=>ds(n,{...t,clear:!1}))},o);return U.fadeWatches.set(r,i),{ok:!0,key:r,species:n,intervalMs:o}}function od(e){let t=String(e||"").trim();if(!t)return!1;if(!t.startsWith("watchfade:")){let r=t.toLowerCase(),o=0;for(let[a,i]of Array.from(U.fadeWatches.entries()))a.startsWith(`watchfade:${r}:`)&&(clearInterval(i),U.fadeWatches.delete(a),o++);return o>0}let n=U.fadeWatches.get(t);return n?(clearInterval(n),U.fadeWatches.delete(t),!0):!1}function To(){let e=C;return e.$PIXI=e.PIXI||null,e.$app=U.app||null,e.$renderer=U.renderer||null,e.$stage=U.stage||null,e.$ticker=U.ticker||null,e.__MG_PIXI__={PIXI:e.$PIXI,app:e.$app,renderer:e.$renderer,stage:e.$stage,ticker:e.$ticker,ready:U.ready},e.__MG_PIXI__}function qe(){if(!U.ready)throw new Error("MGPixi: call MGPixi.init() first")}async function rd(e=15e3){if(U.ready)return To(),!0;if(await se.init(e),U.app=se.app(),U.ticker=se.ticker(),U.renderer=se.renderer(),U.stage=se.stage(),!U.app||!U.ticker)throw new Error("MGPixi: PIXI app/ticker not found");return U.ready=!0,To(),!0}var Pt={init:rd,ready:()=>U.ready,expose:To,get app(){return U.app},get renderer(){return U.renderer},get stage(){return U.stage},get ticker(){return U.ticker},get PIXI(){return C.PIXI||null},defineTileSet:zu,deleteTileSet:$u,listTileSets:Ku,highlightPulse:ss,stopHighlight:Co,clearHighlights:is,highlightMutation:ls,watchMutation:Yu,stopWatchMutation:Qu,inspectTile:ed,fadeSpecies:ds,clearSpeciesFade:us,clearFades:wo,watchFadeSpecies:nd,stopWatchFadeSpecies:od};Ie();var ps=C??window,ad={sfx:"soundEffectsVolume",music:"musicVolume",ambience:"ambienceVolume"},id={sfx:"soundEffectsVolumeAtom",music:"musicVolumeAtom",ambience:"ambienceVolumeAtom"},Ct=.001,Mt=.2,hn=null,$={ready:!1,baseUrl:null,urls:{ambience:new Map,music:new Map},sfx:{mp3Url:null,atlasUrl:null,atlas:null,groups:new Map,buffer:null},tracks:{ambience:null,music:null},ctx:null};function It(){if(!$.ready)throw new Error("MGAudio not ready yet")}function ms(e,t=NaN){try{let n=localStorage.getItem(e);if(n==null)return t;let r;try{r=JSON.parse(n)}catch{r=n}if(typeof r=="number"&&Number.isFinite(r))return r;if(typeof r=="string"){let o=parseFloat(r);if(Number.isFinite(o))return o}}catch{}return t}function At(e){let t=ad[e],n=id[e];if(!t)return{atom:Mt,vol100:yn(Mt)};let r=ms(t,NaN);if(Number.isFinite(r)){let a=me(r,0,1);return{atom:a,vol100:yn(a)}}if(n){let a=ms(n,NaN);if(Number.isFinite(a)){let i=me(a,0,1);return{atom:i,vol100:yn(i)}}}let o=Mt;return{atom:o,vol100:yn(o)}}function sd(e){let t=Number(e);if(!Number.isFinite(t))return null;if(t<=0)return 0;let r=(me(t,1,100)-1)/99;return Ct+r*(Mt-Ct)}function yn(e){let t=me(Number(e),0,1);if(t<=Ct)return 0;let n=(t-Ct)/(Mt-Ct);return Math.round(1+n*99)}function gs(e,t){if(t==null)return At(e).atom;let n=sd(t);return n===null?At(e).atom:Xn(n)}async function fs(){let e=$.ctx;if(e)return e;let t=ps.AudioContext||ps.webkitAudioContext;if(!t)throw new Error("WebAudio not supported");let n=new t;return $.ctx=n,n}async function bs(){if($.ctx&&$.ctx.state==="suspended")try{await $.ctx.resume()}catch{}}function ld(e){let t=new Map,n=(r,o)=>{t.has(r)||t.set(r,[]),t.get(r).push(o)};for(let r of Object.keys(e||{})){let o=/^(.*)_([A-Z])$/.exec(r);o?.[1]?n(o[1],r):n(r,r)}for(let[r,o]of Array.from(t.entries()))o.sort((a,i)=>a.localeCompare(i)),t.set(r,o);$.sfx.groups=t}function cd(e){let t=$.sfx.atlas;if(!t)throw new Error("SFX atlas not loaded");if(t[e])return e;let n=$.sfx.groups.get(e);if(n?.length)return n[Math.random()*n.length|0];throw new Error(`Unknown sfx/group: ${e}`)}async function ud(){if($.sfx.buffer)return $.sfx.buffer;if(!$.sfx.mp3Url)throw new Error("SFX mp3 url missing");let e=await fs();await bs();let n=await(await tn($.sfx.mp3Url)).arrayBuffer(),r=await new Promise((o,a)=>{let i=e.decodeAudioData(n,o,a);i?.then&&i.then(o,a)});return $.sfx.buffer=r,r}async function dd(e,t={}){if(!$.ready)throw new Error("MGAudio not ready yet");let n=String(e||"").trim();if(!n)throw new Error("Missing sfx name");let r=cd(n),o=$.sfx.atlas[r];if(!o)throw new Error(`Missing segment for sfx: ${r}`);let a=await fs();await bs();let i=await ud(),s=Math.max(0,+o.start||0),u=Math.max(s,+o.end||s),d=Math.max(.01,u-s),l=gs("sfx",t.volume),c=a.createGain();c.gain.value=l,c.connect(a.destination);let p=a.createBufferSource();return p.buffer=i,p.connect(c),p.start(0,s,d),{name:r,source:p,start:s,end:u,duration:d,volume:l}}function hs(e){if(e!=="music"&&e!=="ambience")return!1;let t=$.tracks[e];if(t){try{t.pause()}catch{}try{t.src=""}catch{}}return $.tracks[e]=null,!0}function pd(e,t,n={}){if(!$.ready)throw new Error("MGAudio not ready yet");if(e!=="music"&&e!=="ambience")throw new Error(`Invalid category: ${e}`);let r=$.urls[e].get(t);if(!r)throw new Error(`Unknown ${e}: ${t}`);hs(e);let o=new Audio(r);return o.loop=!!n.loop,o.volume=gs(e,n.volume),o.preload="auto",o.play().catch(()=>{}),$.tracks[e]=o,o}async function md(e,t,n={}){let r=String(e||"").trim(),o=String(t||"").trim();if(!r||!o)throw new Error("play(category, asset) missing args");if(r==="sfx")return dd(o,n);if(r==="music"||r==="ambience")return pd(r,o,n);throw new Error(`Unknown category: ${r}`)}function gd(e,t={}){let n=String(e||"").trim();return n==="music"||n==="ambience"?Array.from($.urls[n].keys()).sort():n==="sfx"?$.sfx.atlas?t.groups?Array.from($.sfx.groups.keys()).sort():Object.keys($.sfx.atlas).sort():[]:[]}function fd(){return $.tracks.music&&($.tracks.music.volume=At("music").atom),$.tracks.ambience&&($.tracks.ambience.volume=At("ambience").atom),!0}function bd(){return It(),["sfx","music","ambience"]}function hd(){return It(),Array.from($.sfx.groups.keys()).sort((e,t)=>e.localeCompare(t))}function yd(e,t){It();let n=String(e||"").trim().toLowerCase(),r=String(t||"").trim();if(!r||n!=="music"&&n!=="ambience")return!1;let o=$.urls[n],a=r.toLowerCase();for(let i of o.keys())if(i.toLowerCase()===a)return!0;return!1}function xd(e){It();let t=String(e||"").trim();if(!t)return!1;let n=t.toLowerCase();for(let r of $.sfx.groups.keys())if(r.toLowerCase()===n)return!0;return!1}function vd(e,t){It();let n=String(e||"").trim().toLowerCase(),r=String(t||"").trim();if(!r)throw new Error("getTrackUrl(category, name) missing name");if(n!=="music"&&n!=="ambience")throw new Error(`Invalid category: ${e}`);let o=$.urls[n],a=r.toLowerCase();for(let[i,s]of o.entries())if(i.toLowerCase()===a)return s;return null}async function Sd(){return $.ready?!0:hn||(hn=(async()=>{$.baseUrl=await xe.base();let e=await ge.load($.baseUrl),t=ge.getBundle(e,"audio");if(!t)throw new Error("No audio bundle in manifest");for(let n of t.assets||[])for(let r of n.src||[]){if(typeof r!="string")continue;let o=/^audio\/(ambience|music)\/(.+)\.mp3$/i.exec(r);if(o){let a=o[1].toLowerCase(),i=o[2];$.urls[a].set(i,pe($.baseUrl,r));continue}/^audio\/sfx\/sfx\.mp3$/i.test(r)&&($.sfx.mp3Url=pe($.baseUrl,r)),/^audio\/sfx\/sfx\.json$/i.test(r)&&($.sfx.atlasUrl=pe($.baseUrl,r))}if(!$.sfx.atlasUrl)throw new Error("Missing audio/sfx/sfx.json in manifest");return $.sfx.atlas=await Ze($.sfx.atlasUrl),ld($.sfx.atlas),$.ready=!0,!0})(),hn)}var Et={init:Sd,ready:()=>$.ready,play:md,stop:hs,list:gd,refreshVolumes:fd,categoryVolume:At,getCategories:bd,getGroups:hd,hasTrack:yd,hasGroup:xd,getTrackUrl:vd};var Mo=C?.document??document,xn=null,Z={ready:!1,baseUrl:null,byCat:new Map,byBase:new Map,overlay:null,live:new Set,defaultParent:null};function wd(){if(Z.overlay)return Z.overlay;let e=Mo.createElement("div");return e.id="MG_COSMETIC_OVERLAY",e.style.cssText=["position:fixed","left:0","top:0","width:100vw","height:100vh","pointer-events:none","z-index:99999999"].join(";"),Mo.documentElement.appendChild(e),Z.overlay=e,e}function Td(){let e=Z.defaultParent;if(!e)return null;try{return typeof e=="function"?e():e}catch{return null}}function Ao(e){let t=String(e||"").trim();return t?(t=t.replace(/^cosmetic\//i,""),t=t.replace(/\.png$/i,""),t):""}function kd(e,t){if(t===void 0){let a=Ao(e),i=a.indexOf("_");return i<0?{cat:"",asset:a,base:a}:{cat:a.slice(0,i),asset:a.slice(i+1),base:a}}let n=String(e||"").trim(),r=Ao(t),o=r.includes("_")?r:`${n}_${r}`;if(r.includes("_")&&!n){let a=r.indexOf("_");return{cat:r.slice(0,a),asset:r.slice(a+1),base:r}}return{cat:n,asset:r.replace(/^.+?_/,""),base:o}}function Pd(){return Array.from(Z.byCat.keys()).sort((e,t)=>e.localeCompare(t))}function Cd(e){let t=Z.byCat.get(String(e||"").trim());return t?Array.from(t.keys()).sort((n,r)=>n.localeCompare(r)):[]}function Io(e,t){let{cat:n,asset:r,base:o}=kd(e,t),a=Z.byBase.get(o);if(a)return a;let s=Z.byCat.get(n)?.get(r);if(s)return s;if(!Z.baseUrl)throw new Error("MGCosmetic not initialized");if(!o)throw new Error("Invalid cosmetic name");return pe(Z.baseUrl,`cosmetic/${o}.png`)}function Eo(e,t,n){if(!Z.ready)throw new Error("MGCosmetic not ready yet");let r,o;typeof t=="object"&&t!==null?(r=t,o=void 0):typeof t=="string"?(o=t,r=n||{}):(o=void 0,r=n||{});let a=o!==void 0?Io(e,o):Io(e),i=Mo.createElement("img");if(i.decoding="async",i.loading="eager",i.src=a,i.alt=r.alt!=null?String(r.alt):Ao(o??e),r.className&&(i.className=String(r.className)),r.width!=null&&(i.style.width=String(r.width)),r.height!=null&&(i.style.height=String(r.height)),r.opacity!=null&&(i.style.opacity=String(r.opacity)),r.style&&typeof r.style=="object")for(let[s,u]of Object.entries(r.style))try{i.style[s]=String(u)}catch{}return i}function Md(e,t,n){let r,o;typeof t=="object"&&t!==null?(r=t,o=void 0):typeof t=="string"?(o=t,r=n||{}):(o=void 0,r=n||{});let a=r.parent||Td()||wd(),i=o!==void 0?Eo(e,o,r):Eo(e,r);if(a===Z.overlay||r.center||r.x!=null||r.y!=null||r.absolute){i.style.position="absolute",i.style.pointerEvents="none",i.style.zIndex=String(r.zIndex??999999);let u=r.scale??1,d=r.rotation??0;if(r.center)i.style.left="50%",i.style.top="50%",i.style.transform=`translate(-50%, -50%) scale(${u}) rotate(${d}rad)`;else{let l=r.x??innerWidth/2,c=r.y??innerHeight/2;i.style.left=`${l}px`,i.style.top=`${c}px`,i.style.transform=`scale(${u}) rotate(${d}rad)`,r.anchor==="center"&&(i.style.transform=`translate(-50%, -50%) scale(${u}) rotate(${d}rad)`)}}return a.appendChild(i),Z.live.add(i),i.__mgDestroy=()=>{try{i.remove()}catch{}Z.live.delete(i)},i}function Ad(e){return Z.defaultParent=e,!0}function Id(){for(let e of Array.from(Z.live))e.__mgDestroy?.()}async function Ed(){return Z.ready?!0:xn||(xn=(async()=>{Z.baseUrl=await xe.base();let e=await ge.load(Z.baseUrl),t=ge.getBundle(e,"cosmetic");if(!t)throw new Error("No 'cosmetic' bundle in manifest");Z.byCat.clear(),Z.byBase.clear();for(let n of t.assets||[])for(let r of n.src||[]){if(typeof r!="string"||!/^cosmetic\/.+\.png$/i.test(r))continue;let a=r.split("/").pop().replace(/\.png$/i,""),i=a.indexOf("_");if(i<0)continue;let s=a.slice(0,i),u=a.slice(i+1),d=pe(Z.baseUrl,r);Z.byBase.set(a,d),Z.byCat.has(s)||Z.byCat.set(s,new Map),Z.byCat.get(s).set(u,d)}return Z.ready=!0,!0})(),xn)}var Lt={init:Ed,ready:()=>Z.ready,categories:Pd,list:Cd,url:Io,create:Eo,show:Md,attach:Ad,clear:Id};async function ys(e){let t=[{name:"Data",init:()=>ke.init()},{name:"Sprites",init:()=>Te.init()},{name:"TileObjectSystem",init:()=>Pe.init()},{name:"Pixi",init:()=>Pt.init()},{name:"Audio",init:()=>Et.init()},{name:"Cosmetics",init:()=>Lt.init()}];await Promise.all(t.map(async n=>{e?.({status:"start",name:n.name});try{await n.init(),e?.({status:"success",name:n.name})}catch(r){console.error(`[${n.name}] failed`,r),e?.({status:"error",name:n.name,error:r})}})),console.log("[Gemini] Modules ready. Access via Gemini.Modules in console.")}var Ld=new Map;function Rd(){return Ld}function Rt(){return C.jotaiAtomCache?.cache}function Ot(e){let t=Rd(),n=t.get(e);if(n)return n;let r=Rt();if(!r)return null;for(let o of r.values())if((o?.debugLabel||o?.label||"")===e)return t.set(e,o),o;return null}var Od={baseStore:null,captureInProgress:!1,captureError:null,lastCapturedVia:null,mirror:void 0};function it(){return Od}var Dd="__JOTAI_STORE_READY__",xs=!1,Ro=new Set;function vn(){if(!xs){xs=!0;for(let e of Ro)try{e()}catch{}try{let e=C.CustomEvent||CustomEvent;C.dispatchEvent?.(new e(Dd))}catch{}}}function Gd(e){Ro.add(e);let t=Do();if(t.via&&!t.polyfill)try{e()}catch{}return()=>{Ro.delete(e)}}async function Sn(e={}){let{timeoutMs:t=6e3,intervalMs:n=50}=e,r=Do();if(!(r.via&&!r.polyfill))return new Promise((o,a)=>{let i=!1,s=Gd(()=>{i||(i=!0,s(),o())}),u=Date.now();(async()=>{for(;!i&&Date.now()-u<t;){let l=Do();if(l.via&&!l.polyfill){if(i)return;i=!0,s(),o();return}await Dt(n)}i||(i=!0,s(),a(new Error("Store not captured within timeout")))})()})}var Dt=e=>new Promise(t=>setTimeout(t,e));function vs(){try{let e=C.Event||Event;C.dispatchEvent?.(new e("visibilitychange"))}catch{}}function Oo(e){return e&&typeof e=="object"&&typeof e.get=="function"&&typeof e.set=="function"&&typeof e.sub=="function"}function Lo(e,t=0,n=new WeakSet){if(t>3||!e||typeof e!="object"||n.has(e))return null;try{n.add(e)}catch{return null}if(Oo(e))return e;let r=["store","value","current","state","s","baseStore"];for(let o of r)try{let a=e[o];if(Oo(a))return a}catch{}return null}function Ss(){let e=it(),t=C.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t?.renderers?.size)return null;let n=0;for(let[r]of t.renderers){let o=t.getFiberRoots?.(r);o&&(n+=o.size||0)}if(n===0)return null;for(let[r]of t.renderers){let o=t.getFiberRoots?.(r);if(o)for(let a of o){let i=new Set,s=[a.current];for(;s.length;){let u=s.pop();if(!(!u||i.has(u))){i.add(u);try{let d=u?.pendingProps?.value;if(Oo(d))return e.lastCapturedVia="fiber",d}catch{}try{let d=u?.memoizedState,l=0;for(;d&&l<15;){l++;let c=Lo(d);if(c)return e.lastCapturedVia="fiber",c;let p=Lo(d.memoizedState);if(p)return e.lastCapturedVia="fiber",p;d=d.next}}catch{}try{if(u?.stateNode){let d=Lo(u.stateNode);if(d)return e.lastCapturedVia="fiber",d}}catch{}u.child&&s.push(u.child),u.sibling&&s.push(u.sibling),u.alternate&&s.push(u.alternate)}}}}return null}function ws(){return{get:()=>{throw new Error("Store not captured: get unavailable")},set:()=>{throw new Error("Store not captured: set unavailable")},sub:()=>()=>{},__polyfill:!0}}async function Hd(e=5e3){let t=Date.now(),n=Rt();for(;!n&&Date.now()-t<e;)await Dt(100),n=Rt();if(!n)throw new Error("jotaiAtomCache.cache not found");let r=it(),o=null,a=null,i=[],s=()=>{for(let d of i)try{d.__origWrite&&(d.write=d.__origWrite,delete d.__origWrite)}catch{}};for(let d of n.values()){if(!d||typeof d.write!="function"||d.__origWrite)continue;let l=d.write;d.__origWrite=l,d.write=function(c,p,...m){return a||(o=c,a=p,s()),l.call(this,c,p,...m)},i.push(d)}vs();let u=Date.now();for(;!a&&Date.now()-u<e;)await Dt(50);return a?(r.lastCapturedVia="write",{get:d=>o(d),set:(d,l)=>a(d,l),sub:(d,l)=>{let c;try{c=o(d)}catch{}let p=setInterval(()=>{let m;try{m=o(d)}catch{return}if(m!==c){c=m;try{l()}catch{}}},100);return()=>clearInterval(p)}}):(s(),r.lastCapturedVia="polyfill",ws())}async function Nd(e=1e4){let t=it();vs();let n=Date.now();for(;Date.now()-n<e;){let r=Ss();if(r)return r;await Dt(50)}return t.lastCapturedVia="polyfill",ws()}async function _d(){let e=it();if(e.baseStore&&!e.baseStore.__polyfill)return vn(),e.baseStore;if(e.captureInProgress){let t=Date.now(),n=2500;for(;!e.baseStore&&Date.now()-t<n;)await Dt(25);if(e.baseStore)return e.baseStore.__polyfill||vn(),e.baseStore}e.captureInProgress=!0;try{let t=Ss();if(t)return e.baseStore=t,vn(),t;try{let r=await Hd(5e3);return e.baseStore=r,r.__polyfill||vn(),r}catch(r){e.captureError=r}let n=await Nd();return e.baseStore=n,n}catch(t){throw e.captureError=t,t}finally{e.captureInProgress=!1}}function Do(){let e=it();return{via:e.lastCapturedVia,polyfill:!!e.baseStore?.__polyfill,error:e.captureError}}async function Wd(){let e=await _d(),t=new WeakMap,n=async o=>{let a=t.get(o);if(a)return a;a={last:void 0,has:!1,subs:new Set},t.set(o,a);try{a.last=e.get(o),a.has=!0}catch{}let i=e.sub(o,()=>{let s;try{s=e.get(o)}catch{return}let u=a.last,d=!Object.is(s,u)||!a.has;if(a.last=s,a.has=!0,d)for(let l of a.subs)try{l(s,u)}catch{}});return a.unsubUpstream=i,a};return{async get(o){let a=await n(o);if(a.has)return a.last;let i=e.get(o);return a.last=i,a.has=!0,i},async set(o,a){await e.set(o,a);let i=await n(o);i.last=a,i.has=!0},async sub(o,a){let i=await n(o);if(i.subs.add(a),i.has)try{a(i.last,i.last)}catch{}return()=>{i.subs.delete(a)}},getShadow(o){return t.get(o)?.last},hasShadow(o){return!!t.get(o)?.has},async ensureWatch(o){await n(o)},async asStore(){return{get:o=>this.get(o),set:(o,a)=>this.set(o,a),sub:(o,a)=>{let i=null;return this.sub(o,()=>a()).then(s=>i=s),()=>i?.()}}}}}async function Gt(){let e=it();return e.mirror||(e.mirror=await Wd()),e.mirror}var X={async select(e){let t=await Gt(),n=Ot(e);if(!n)throw new Error(`[Store] Atom not found: "${e}"`);return t.get(n)},async set(e,t){let n=await Gt(),r=Ot(e);if(!r)throw new Error(`[Store] Atom not found: "${e}"`);await n.set(r,t)},async subscribe(e,t){let n=await Gt(),r=Ot(e);if(!r)throw new Error(`[Store] Atom not found: "${e}"`);return n.sub(r,o=>{try{t(o)}catch{}})},async subscribeImmediate(e,t){let n=await X.select(e);try{t(n)}catch{}return X.subscribe(e,t)}};async function Go(){await Gt()}function Ht(e){return e?Array.isArray(e)?e.slice():e.split(".").map(t=>t.match(/^\d+$/)?Number(t):t):[]}function Ne(e,t){let n=Ht(t),r=e;for(let o of n){if(r==null)return;r=r[o]}return r}function Ho(e,t,n){let r=Ht(t);if(!r.length)return n;let o=Array.isArray(e)?[...e]:{...e??{}},a=o;for(let i=0;i<r.length-1;i++){let s=r[i],u=a[s],d=typeof u=="object"&&u!==null?Array.isArray(u)?[...u]:{...u}:{};a[s]=d,a=d}return a[r[r.length-1]]=n,o}function Ts(e,t){let n={};for(let r of t)n[r]=r.includes(".")?Ne(e,r):e?.[r];try{return JSON.stringify(n)}catch{return String(n)}}function No(e,t,n){let r=n.mode??"auto";function o(d){let l=t?Ne(d,t):d,c=new Map;if(l==null)return{signatures:c,keys:[]};let p=Array.isArray(l);if((r==="array"||r==="auto"&&p)&&p)for(let g=0;g<l.length;g++){let f=l[g],b=n.key?n.key(f,g,d):g,h=n.sig?n.sig(f,g,d):n.fields?Ts(f,n.fields):JSON.stringify(f);c.set(b,h)}else for(let[g,f]of Object.entries(l)){let b=n.key?n.key(f,g,d):g,h=n.sig?n.sig(f,g,d):n.fields?Ts(f,n.fields):JSON.stringify(f);c.set(b,h)}return{signatures:c,keys:Array.from(c.keys())}}function a(d,l){if(d===l)return!0;if(!d||!l||d.size!==l.size)return!1;for(let[c,p]of d)if(l.get(c)!==p)return!1;return!0}async function i(d){let l=null;return X.subscribeImmediate(e,c=>{let p=t?Ne(c,t):c,{signatures:m}=o(p);if(!a(l,m)){let g=new Set([...l?Array.from(l.keys()):[],...Array.from(m.keys())]),f=[];for(let b of g){let h=l?.get(b)??"__NONE__",S=m.get(b)??"__NONE__";h!==S&&f.push(b)}l=m,d({value:p,changedKeys:f})}})}async function s(d,l){return i(({value:c,changedKeys:p})=>{p.includes(d)&&l({value:c})})}async function u(d,l){let c=new Set(d);return i(({value:p,changedKeys:m})=>{let g=m.filter(f=>c.has(f));g.length&&l({value:p,changedKeys:g})})}return{sub:i,subKey:s,subKeys:u}}var st=new Map;function jd(e,t){let n=st.get(e);if(n)try{n()}catch{}return st.set(e,t),()=>{try{t()}catch{}st.get(e)===t&&st.delete(e)}}function Q(e,t={}){let{path:n,write:r="replace"}=t,o=n?`${e}:${Ht(n).join(".")}`:e;async function a(){let c=await X.select(e);return n?Ne(c,n):c}async function i(c){if(typeof r=="function"){let g=await X.select(e),f=r(c,g);return X.set(e,f)}let p=await X.select(e),m=n?Ho(p,n,c):c;return r==="merge-shallow"&&!n&&p&&typeof p=="object"&&typeof c=="object"?X.set(e,{...p,...c}):X.set(e,m)}async function s(c){let p=await a(),m=c(p);return await i(m),m}async function u(c,p,m){let g,f=h=>{let S=n?Ne(h,n):h;if(typeof g>"u"||!m(g,S)){let v=g;g=S,p(S,v)}},b=c?await X.subscribeImmediate(e,f):await X.subscribe(e,f);return jd(o,b)}function d(){let c=st.get(o);if(c){try{c()}catch{}st.delete(o)}}function l(c){return No(e,c?.path??n,c)}return{label:o,get:a,set:i,update:s,onChange:(c,p=Object.is)=>u(!1,c,p),onChangeNow:(c,p=Object.is)=>u(!0,c,p),asSignature:l,stopOnChange:d}}function y(e){return Q(e)}var Bd=y("positionAtom"),Vd=y("lastPositionInMyGardenAtom"),Fd=y("playerDirectionAtom"),Ud=y("stateAtom"),zd=y("quinoaDataAtom"),$d=y("currentTimeAtom"),Kd=y("actionAtom"),qd=y("isPressAndHoldActionAtom"),Jd=y("mapAtom"),Xd=y("tileSizeAtom"),Yd=Q("mapAtom",{path:"cols"}),Qd=Q("mapAtom",{path:"rows"}),Zd=Q("mapAtom",{path:"spawnTiles"}),ep=Q("mapAtom",{path:"locations.seedShop.spawnTileIdx"}),tp=Q("mapAtom",{path:"locations.eggShop.spawnTileIdx"}),np=Q("mapAtom",{path:"locations.toolShop.spawnTileIdx"}),op=Q("mapAtom",{path:"locations.decorShop.spawnTileIdx"}),rp=Q("mapAtom",{path:"locations.sellCropsShop.spawnTileIdx"}),ap=Q("mapAtom",{path:"locations.sellPetShop.spawnTileIdx"}),ip=Q("mapAtom",{path:"locations.collectorsClub.spawnTileIdx"}),sp=Q("mapAtom",{path:"locations.wishingWell.spawnTileIdx"}),lp=Q("mapAtom",{path:"locations.shopsCenter.spawnTileIdx"}),cp=y("playerAtom"),up=y("myDataAtom"),dp=y("myUserSlotIdxAtom"),pp=y("isSpectatingAtom"),mp=y("myCoinsCountAtom"),gp=y("numPlayersAtom"),fp=Q("playerAtom",{path:"id"}),bp=y("userSlotsAtom"),hp=y("filteredUserSlotsAtom"),yp=y("myUserSlotAtom"),xp=y("spectatorsAtom"),vp=Q("stateAtom",{path:"child"}),Sp=Q("stateAtom",{path:"child.data"}),wp=Q("stateAtom",{path:"child.data.shops"}),_o=Q("stateAtom",{path:"child.data.userSlots"}),Wo=Q("stateAtom",{path:"data.players"}),jo=Q("stateAtom",{path:"data.hostPlayerId"}),Tp=y("myInventoryAtom"),kp=y("myInventoryItemsAtom"),Pp=y("isMyInventoryAtMaxLengthAtom"),Cp=y("myFavoritedItemIdsAtom"),Mp=y("myCropInventoryAtom"),Ap=y("mySeedInventoryAtom"),Ip=y("myToolInventoryAtom"),Ep=y("myEggInventoryAtom"),Lp=y("myDecorInventoryAtom"),Rp=y("myPetInventoryAtom"),Op=Q("myInventoryAtom",{path:"favoritedItemIds"}),Dp=y("itemTypeFiltersAtom"),Gp=y("myItemStoragesAtom"),Hp=y("myPetHutchStoragesAtom"),Np=y("myPetHutchItemsAtom"),_p=y("myPetHutchPetItemsAtom"),Wp=y("myNumPetHutchItemsAtom"),jp=y("myValidatedSelectedItemIndexAtom"),Bp=y("isSelectedItemAtomSuspended"),Vp=y("mySelectedItemAtom"),Fp=y("mySelectedItemNameAtom"),Up=y("mySelectedItemRotationsAtom"),zp=y("mySelectedItemRotationAtom"),$p=y("setSelectedIndexToEndAtom"),Kp=y("myPossiblyNoLongerValidSelectedItemIndexAtom"),qp=y("myCurrentGlobalTileIndexAtom"),Jp=y("myCurrentGardenTileAtom"),Xp=y("myCurrentGardenObjectAtom"),Yp=y("myOwnCurrentGardenObjectAtom"),Qp=y("myOwnCurrentDirtTileIndexAtom"),Zp=y("myCurrentGardenObjectNameAtom"),em=y("isInMyGardenAtom"),tm=y("myGardenBoardwalkTileObjectsAtom"),Bo=Q("myDataAtom",{path:"garden"}),nm=Q("myDataAtom",{path:"garden.tileObjects"}),om=Q("myOwnCurrentGardenObjectAtom",{path:"objectType"}),rm=y("myCurrentStablePlantObjectInfoAtom"),am=y("myCurrentSortedGrowSlotIndicesAtom"),im=y("myCurrentGrowSlotIndexAtom"),sm=y("myCurrentGrowSlotsAtom"),lm=y("myCurrentGrowSlotAtom"),cm=y("secondsUntilCurrentGrowSlotMaturesAtom"),um=y("isCurrentGrowSlotMatureAtom"),dm=y("numGrowSlotsAtom"),pm=y("myCurrentEggAtom"),mm=y("petInfosAtom"),gm=y("myPetInfosAtom"),fm=y("myPetSlotInfosAtom"),bm=y("myPrimitivePetSlotsAtom"),hm=y("myNonPrimitivePetSlotsAtom"),ym=y("expandedPetSlotIdAtom"),xm=y("myPetsProgressAtom"),vm=y("myActiveCropMutationPetsAtom"),Sm=y("totalPetSellPriceAtom"),wm=y("selectedPetHasNewVariantsAtom"),Vo=y("shopsAtom"),Fo=y("myShopPurchasesAtom"),Tm=y("seedShopAtom"),km=y("seedShopInventoryAtom"),Pm=y("seedShopRestockSecondsAtom"),Cm=y("seedShopCustomRestockInventoryAtom"),Mm=y("eggShopAtom"),Am=y("eggShopInventoryAtom"),Im=y("eggShopRestockSecondsAtom"),Em=y("eggShopCustomRestockInventoryAtom"),Lm=y("toolShopAtom"),Rm=y("toolShopInventoryAtom"),Om=y("toolShopRestockSecondsAtom"),Dm=y("toolShopCustomRestockInventoryAtom"),Gm=y("decorShopAtom"),Hm=y("decorShopInventoryAtom"),Nm=y("decorShopRestockSecondsAtom"),_m=y("decorShopCustomRestockInventoryAtom"),Wm=y("isDecorShopAboutToRestockAtom"),jm=Q("shopsAtom",{path:"seed"}),Bm=Q("shopsAtom",{path:"tool"}),Vm=Q("shopsAtom",{path:"egg"}),Fm=Q("shopsAtom",{path:"decor"}),Um=y("myCropItemsAtom"),zm=y("myCropItemsToSellAtom"),$m=y("totalCropSellPriceAtom"),Km=y("friendBonusMultiplierAtom"),qm=y("myJournalAtom"),Jm=y("myCropJournalAtom"),Xm=y("myPetJournalAtom"),Ym=y("myStatsAtom"),Qm=y("myActivityLogsAtom"),Zm=y("newLogsAtom"),eg=y("hasNewLogsAtom"),tg=y("newCropLogsFromSellingAtom"),ng=y("hasNewCropLogsFromSellingAtom"),og=y("myCompletedTasksAtom"),rg=y("myActiveTasksAtom"),ag=y("isWelcomeToastVisibleAtom"),ig=y("shouldCloseWelcomeToastAtom"),sg=y("isInitialMoveToDirtPatchToastVisibleAtom"),lg=y("isFirstPlantSeedActiveAtom"),cg=y("isThirdSeedPlantActiveAtom"),ug=y("isThirdSeedPlantCompletedAtom"),dg=y("isDemoTouchpadVisibleAtom"),pg=y("areShopAnnouncersEnabledAtom"),mg=y("arePresentablesEnabledAtom"),gg=y("isEmptyDirtTileHighlightedAtom"),fg=y("isPlantTileHighlightedAtom"),bg=y("isItemHiglightedInHotbarAtom"),hg=y("isItemHighlightedInModalAtom"),yg=y("isMyGardenButtonHighlightedAtom"),xg=y("isSellButtonHighlightedAtom"),vg=y("isShopButtonHighlightedAtom"),Sg=y("isInstaGrowButtonHiddenAtom"),wg=y("isActionButtonHighlightedAtom"),Tg=y("isGardenItemInfoCardHiddenAtom"),kg=y("isSeedPurchaseButtonHighlightedAtom"),Pg=y("isFirstSeedPurchaseActiveAtom"),Cg=y("isFirstCropHarvestActiveAtom"),Mg=y("isWeatherStatusHighlightedAtom"),Uo=y("weatherAtom"),Ag=y("activeModalAtom"),Ig=y("hotkeyBeingPressedAtom"),Eg=y("avatarTriggerAnimationAtom"),Lg=y("avatarDataAtom"),Rg=y("emoteDataAtom"),Og=y("otherUserSlotsAtom"),Dg=y("otherPlayerPositionsAtom"),Gg=y("otherPlayerSelectedItemsAtom"),Hg=y("otherPlayerLastActionsAtom"),Ng=y("traderBunnyPlayerId"),_g=y("npcPlayersAtom"),Wg=y("npcQuinoaUsersAtom"),jg=y("numNpcAvatarsAtom"),Bg=y("traderBunnyEmoteTimeoutAtom"),Vg=y("traderBunnyEmoteAtom"),Fg=y("unsortedLeaderboardAtom"),Ug=y("currentGardenNameAtom"),zg=y("quinoaEngineAtom"),$g=y("quinoaInitializationErrorAtom"),Kg=y("avgPingAtom"),qg=y("serverClientTimeOffsetAtom"),Jg=y("isEstablishingShotRunningAtom"),Xg=y("isEstablishingShotCompleteAtom");function ae(e,t){if(e===t)return!0;if(e===null||t===null)return e===t;if(typeof e!=typeof t)return!1;if(typeof e!="object")return e===t;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return!1;for(let i=0;i<e.length;i++)if(!ae(e[i],t[i]))return!1;return!0}if(Array.isArray(e)||Array.isArray(t))return!1;let n=e,r=t,o=Object.keys(n),a=Object.keys(r);if(o.length!==a.length)return!1;for(let i of o)if(!Object.prototype.hasOwnProperty.call(r,i)||!ae(n[i],r[i]))return!1;return!0}var ks={currentGardenTile:"myCurrentGardenTileAtom",globalTileIndex:"myCurrentGlobalTileIndexAtom",gardenObject:"myCurrentGardenObjectAtom",isMature:"isGardenObjectMatureAtom",isInMyGarden:"isInMyGardenAtom",gardenName:"currentGardenNameAtom",sortedSlotIndices:"myCurrentSortedGrowSlotIndicesAtom",currentGrowSlotIndex:"myCurrentGrowSlotIndexAtom"},Ps={position:{globalIndex:null,localIndex:null},tile:{type:null,isEmpty:!0},garden:{name:null,isOwner:!1,playerSlotIndex:null},object:{type:null,data:null,isMature:!1},plant:null};function Yg(e){let t=e.currentGardenTile;return{globalIndex:e.globalTileIndex,localIndex:t?.localTileIndex??null}}function Qg(e){return{type:e.currentGardenTile?.tileType??null,isEmpty:e.gardenObject===null}}function Zg(e){let t=e.currentGardenTile;return{name:e.gardenName,isOwner:e.isInMyGarden??!1,playerSlotIndex:t?.userSlotIdx??null}}function ef(e){let t=e.gardenObject;return t?{type:t.objectType,data:t,isMature:e.isMature??!1}:{type:null,data:null,isMature:!1}}function tf(e){let t=e.gardenObject;if(!t||t.objectType!=="plant")return null;let n=t,r=e.sortedSlotIndices??[];return{species:n.species,slots:n.slots??[],currentSlotIndex:e.currentGrowSlotIndex,sortedSlotIndices:r,nextHarvestSlotIndex:r.length>0?r[0]:null}}function Cs(e){return{position:Yg(e),tile:Qg(e),garden:Zg(e),object:ef(e),plant:tf(e)}}function Ms(e){return JSON.stringify({globalIndex:e.position.globalIndex,localIndex:e.position.localIndex,tileType:e.tile.type,isEmpty:e.tile.isEmpty,gardenName:e.garden.name,isOwner:e.garden.isOwner,playerSlotIndex:e.garden.playerSlotIndex,objectType:e.object.type,isMature:e.object.isMature,plantSpecies:e.plant?.species??null,slotCount:e.plant?.slots.length??0})}function nf(e,t){return e.type!==t.type||e.isMature!==t.isMature?!0:e.data===null&&t.data===null?!1:e.data===null||t.data===null?!0:!ae(e.data,t.data)}function of(e,t){return e===null&&t===null?!1:e===null||t===null||e.species!==t.species||e.currentSlotIndex!==t.currentSlotIndex||e.nextHarvestSlotIndex!==t.nextHarvestSlotIndex||e.slots.length!==t.slots.length?!0:!ae(e.sortedSlotIndices,t.sortedSlotIndices)}function rf(e,t){return e.name!==t.name||e.isOwner!==t.isOwner||e.playerSlotIndex!==t.playerSlotIndex}function af(){let e=Ps,t=Ps,n=!1,r=[],o={all:new Set,stable:new Set,object:new Set,plantInfo:new Set,garden:new Set},a={},i=Object.keys(ks),s=new Set;function u(){if(s.size<i.length)return;let l=Cs(a);if(!ae(e,l)&&(t=e,e=l,!!n)){for(let c of o.all)c(e,t);if(Ms(t)!==Ms(e))for(let c of o.stable)c(e,t);if(nf(t.object,e.object)){let c={current:e.object,previous:t.object};for(let p of o.object)p(c)}if(of(t.plant,e.plant)){let c={current:e.plant,previous:t.plant};for(let p of o.plantInfo)p(c)}if(rf(t.garden,e.garden)){let c={current:e.garden,previous:t.garden};for(let p of o.garden)p(c)}}}async function d(){if(n)return;let l=i.map(async c=>{let p=ks[c],m=await X.subscribe(p,g=>{a[c]=g,s.add(c),u()});r.push(m)});await Promise.all(l),n=!0,s.size===i.length&&(e=Cs(a))}return d(),{get(){return e},subscribe(l,c){return o.all.add(l),c?.immediate!==!1&&n&&s.size===i.length&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,c){return o.stable.add(l),c?.immediate!==!1&&n&&s.size===i.length&&l(e,e),()=>o.stable.delete(l)},subscribeObject(l,c){return o.object.add(l),c?.immediate&&n&&s.size===i.length&&l({current:e.object,previous:e.object}),()=>o.object.delete(l)},subscribePlantInfo(l,c){return o.plantInfo.add(l),c?.immediate&&n&&s.size===i.length&&l({current:e.plant,previous:e.plant}),()=>o.plantInfo.delete(l)},subscribeGarden(l,c){return o.garden.add(l),c?.immediate&&n&&s.size===i.length&&l({current:e.garden,previous:e.garden}),()=>o.garden.delete(l)},destroy(){for(let l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.object.clear(),o.plantInfo.clear(),o.garden.clear(),n=!1}}}var zo=null;function $o(){return zo||(zo=af()),zo}var As=3600,Ko=80,lf=100,wn=30;function Tn(e){return e/As}function kn(e,t){let n=Mn(e);if(!n)return Ko;let r=n.maxScale;if(t<=1)return Ko;if(t>=r)return lf;let o=(t-1)/(r-1);return Math.floor(Ko+20*o)}function Pn(e,t,n){let r=Mn(e);if(!r)return n-wn;let o=r.hoursToMature,a=t/As,i=wn/o,s=Math.min(i*a,wn),u=n-wn;return Math.floor(u+s)}function Cn(e,t){let n=Mn(e);return n?t>=n.hoursToMature:!1}function Mn(e){let t=ke.get("pets");if(!t)return null;let n=t[e];return n?{hoursToMature:n.hoursToMature??0,maxScale:n.maxScale??1,abilities:n.abilities??[]}:null}var Is={inventory:"myPetInventoryAtom",hutch:"myPetHutchPetItemsAtom",active:"myPetInfosAtom",slotInfos:"myPetSlotInfosAtom",expandedPetSlotId:"expandedPetSlotIdAtom"};function Es(e,t){let n=Tn(e.xp),r=kn(e.petSpecies,e.targetScale),o=Pn(e.petSpecies,e.xp,r),a=Cn(e.petSpecies,n);return{id:e.id,petSpecies:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,mutations:[...e.mutations],targetScale:e.targetScale,abilities:[...e.abilities],location:t,position:null,lastAbilityTrigger:null,age:n,currentStrength:o,maxStrength:r,isMature:a}}function cf(e,t){let r=t[e.slot.id]?.lastAbilityTrigger??null,o=Tn(e.slot.xp),a=kn(e.slot.petSpecies,e.slot.targetScale),i=Pn(e.slot.petSpecies,e.slot.xp,a),s=Cn(e.slot.petSpecies,o);return{id:e.slot.id,petSpecies:e.slot.petSpecies,name:e.slot.name,xp:e.slot.xp,hunger:e.slot.hunger,mutations:[...e.slot.mutations],targetScale:e.slot.targetScale,abilities:[...e.slot.abilities],location:"active",position:e.position?{x:e.position.x,y:e.position.y}:null,lastAbilityTrigger:r,age:o,currentStrength:i,maxStrength:a,isMature:s}}function Ls(e){let t=new Set,n=[];for(let u of e.active??[]){let d=cf(u,e.slotInfos??{});n.push(d),t.add(d.id)}let r=[];for(let u of e.inventory??[]){if(t.has(u.id))continue;let d=Es(u,"inventory");r.push(d),t.add(d.id)}let o=[];for(let u of e.hutch??[]){if(t.has(u.id))continue;let d=Es(u,"hutch");o.push(d),t.add(d.id)}let a=[...n,...r,...o],i=e.expandedPetSlotId??null,s=i?a.find(u=>u.id===i)??null:null;return{all:a,byLocation:{inventory:r,hutch:o,active:n},counts:{inventory:r.length,hutch:o.length,active:n.length,total:a.length},expandedPetSlotId:i,expandedPet:s}}var Rs={all:[],byLocation:{inventory:[],hutch:[],active:[]},counts:{inventory:0,hutch:0,active:0,total:0},expandedPetSlotId:null,expandedPet:null};function uf(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}function Os(e){return JSON.stringify({id:e.id,petSpecies:e.petSpecies,name:e.name,mutations:e.mutations,abilities:e.abilities,location:e.location})}function df(e,t){if(e.all.length!==t.all.length)return!1;let n=e.all.map(Os),r=t.all.map(Os);return uf(n,r)}function pf(e,t){let n=[],r=new Map(e.all.map(o=>[o.id,o]));for(let o of t.all){let a=r.get(o.id);a&&a.location!==o.location&&n.push({pet:o,from:a.location,to:o.location})}return n}function mf(e,t){let n=[],r=new Map(e.all.map(o=>[o.id,o]));for(let o of t.all){if(!o.lastAbilityTrigger)continue;let i=r.get(o.id)?.lastAbilityTrigger;(!i||i.abilityId!==o.lastAbilityTrigger.abilityId||i.performedAt!==o.lastAbilityTrigger.performedAt)&&n.push({pet:o,trigger:o.lastAbilityTrigger})}return n}function gf(e,t){let n=new Set(e.all.map(i=>i.id)),r=new Set(t.all.map(i=>i.id)),o=t.all.filter(i=>!n.has(i.id)),a=e.all.filter(i=>!r.has(i.id));return o.length===0&&a.length===0?null:{added:o,removed:a,counts:t.counts}}function ff(){let e=Rs,t=Rs,n=!1,r=[],o={all:new Set,stable:new Set,location:new Set,ability:new Set,count:new Set,expandedPet:new Set},a={},i=Object.keys(Is),s=new Set;function u(){if(s.size<i.length)return;let l=Ls(a);if(ae(e,l)||(t=e,e=l,!n))return;for(let g of o.all)g(e,t);if(!df(t,e))for(let g of o.stable)g(e,t);let c=pf(t,e);for(let g of c)for(let f of o.location)f(g);let p=mf(t,e);for(let g of p)for(let f of o.ability)f(g);let m=gf(t,e);if(m)for(let g of o.count)g(m);if(t.expandedPetSlotId!==e.expandedPetSlotId){let g={current:e.expandedPet,previous:t.expandedPet,currentId:e.expandedPetSlotId,previousId:t.expandedPetSlotId};for(let f of o.expandedPet)f(g)}}async function d(){if(n)return;let l=i.map(async c=>{let p=Is[c],m=await X.subscribe(p,g=>{a[c]=g,s.add(c),u()});r.push(m)});await Promise.all(l),n=!0,s.size===i.length&&(e=Ls(a))}return d(),{get(){return e},subscribe(l,c){return o.all.add(l),c?.immediate!==!1&&n&&s.size===i.length&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,c){return o.stable.add(l),c?.immediate!==!1&&n&&s.size===i.length&&l(e,e),()=>o.stable.delete(l)},subscribeLocation(l,c){if(o.location.add(l),c?.immediate&&n&&s.size===i.length)for(let p of e.all)l({pet:p,from:p.location,to:p.location});return()=>o.location.delete(l)},subscribeAbility(l,c){if(o.ability.add(l),c?.immediate&&n&&s.size===i.length)for(let p of e.all)p.lastAbilityTrigger&&l({pet:p,trigger:p.lastAbilityTrigger});return()=>o.ability.delete(l)},subscribeCount(l,c){return o.count.add(l),c?.immediate&&n&&s.size===i.length&&l({added:e.all,removed:[],counts:e.counts}),()=>o.count.delete(l)},subscribeExpandedPet(l,c){return o.expandedPet.add(l),c?.immediate&&n&&s.size===i.length&&l({current:e.expandedPet,previous:e.expandedPet,currentId:e.expandedPetSlotId,previousId:e.expandedPetSlotId}),()=>o.expandedPet.delete(l)},destroy(){for(let l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.location.clear(),o.ability.clear(),o.count.clear(),o.expandedPet.clear(),n=!1}}}var qo=null;function Jo(){return qo||(qo=ff()),qo}function bf(){let e=null,t=[],n=new Set,r={},o=new Set,a=2;function i(c,p){return{x:p%c,y:Math.floor(p/c)}}function s(c,p,m){return m*c+p}function u(c,p){let{cols:m,rows:g}=c,f=m*g,b=new Set,h=new Set,S=new Map,v=[],x=c.userSlotIdxAndDirtTileIdxToGlobalTileIdx??[],w=c.userSlotIdxAndBoardwalkTileIdxToGlobalTileIdx??[],k=Math.max(x.length,w.length);for(let P=0;P<k;P++){let O=x[P]??[],E=w[P]??[],V=O.map((B,_)=>(b.add(B),S.set(B,P),{globalIndex:B,localIndex:_,position:i(m,B)})),J=E.map((B,_)=>(h.add(B),S.set(B,P),{globalIndex:B,localIndex:_,position:i(m,B)}));v.push({userSlotIdx:P,dirtTiles:V,boardwalkTiles:J,allTiles:[...V,...J]})}let L=c.spawnTiles.map(P=>i(m,P)),I={};if(c.locations)for(let[P,O]of Object.entries(c.locations)){let E=O.spawnTileIdx??[];I[P]={name:P,spawnTiles:E,spawnPositions:E.map(V=>i(m,V))}}return{cols:m,rows:g,totalTiles:f,tileSize:p,spawnTiles:c.spawnTiles,spawnPositions:L,locations:I,userSlots:v,globalToXY(P){return i(m,P)},xyToGlobal(P,O){return s(m,P,O)},getTileOwner(P){return S.get(P)??null},isDirtTile(P){return b.has(P)},isBoardwalkTile(P){return h.has(P)}}}function d(){if(o.size<a||e)return;let c=r.map,p=r.tileSize??0;if(c){e=u(c,p);for(let m of n)m(e);n.clear()}}async function l(){let c=await X.subscribe("mapAtom",m=>{r.map=m,o.add("map"),d()});t.push(c);let p=await X.subscribe("tileSizeAtom",m=>{r.tileSize=m,o.add("tileSize"),d()});t.push(p)}return l(),{get(){return e},isReady(){return e!==null},onReady(c,p){return e?(p?.immediate!==!1&&c(e),()=>{}):(n.add(c),()=>n.delete(c))},destroy(){for(let c of t)c();t.length=0,e=null,n.clear()}}}var Xo=null;function lt(){return Xo||(Xo=bf()),Xo}var Ds={inventory:"myInventoryAtom",isFull:"isMyInventoryAtMaxLengthAtom",selectedItemIndex:"myPossiblyNoLongerValidSelectedItemIndexAtom"},Gs={items:[],favoritedItemIds:[],count:0,isFull:!1,selectedItem:null};function Hs(e){let t=e.inventory,n=t?.items??[],r=t?.favoritedItemIds??[],o=e.selectedItemIndex,a=null;return o!==null&&o>=0&&o<n.length&&(a={index:o,item:n[o]}),{items:n,favoritedItemIds:r,count:n.length,isFull:e.isFull??!1,selectedItem:a}}function Ns(e){let t=e.items.map(n=>"id"in n?n.id:"species"in n&&n.itemType==="Seed"?`seed:${n.species}:${n.quantity}`:"toolId"in n?`tool:${n.toolId}:${n.quantity}`:"eggId"in n?`egg:${n.eggId}:${n.quantity}`:"decorId"in n?`decor:${n.decorId}:${n.quantity}`:JSON.stringify(n));return JSON.stringify({itemKeys:t,favoritedItemIds:e.favoritedItemIds,isFull:e.isFull,selectedItemIndex:e.selectedItem?.index??null})}function hf(e,t){return Ns(e)===Ns(t)}function yf(e,t){return e===null&&t===null?!1:e===null||t===null?!0:e.index!==t.index}function An(e){return"id"in e?e.id:"species"in e&&e.itemType==="Seed"?`seed:${e.species}`:"toolId"in e?`tool:${e.toolId}`:"eggId"in e?`egg:${e.eggId}`:"decorId"in e?`decor:${e.decorId}`:JSON.stringify(e)}function xf(e,t){let n=new Set(e.map(An)),r=new Set(t.map(An)),o=t.filter(i=>!n.has(An(i))),a=e.filter(i=>!r.has(An(i)));return o.length===0&&a.length===0?null:{added:o,removed:a,counts:{before:e.length,after:t.length}}}function vf(e,t){let n=new Set(e),r=new Set(t),o=t.filter(i=>!n.has(i)),a=e.filter(i=>!r.has(i));return o.length===0&&a.length===0?null:{added:o,removed:a,current:t}}function Sf(){let e=Gs,t=Gs,n=!1,r=[],o={all:new Set,stable:new Set,selection:new Set,items:new Set,favorites:new Set},a={},i=Object.keys(Ds),s=new Set;function u(){if(s.size<i.length)return;let l=Hs(a);if(ae(e,l)||(t=e,e=l,!n))return;for(let m of o.all)m(e,t);if(!hf(t,e))for(let m of o.stable)m(e,t);if(yf(t.selectedItem,e.selectedItem)){let m={current:e.selectedItem,previous:t.selectedItem};for(let g of o.selection)g(m)}let c=xf(t.items,e.items);if(c)for(let m of o.items)m(c);let p=vf(t.favoritedItemIds,e.favoritedItemIds);if(p)for(let m of o.favorites)m(p)}async function d(){if(n)return;let l=i.map(async c=>{let p=Ds[c],m=await X.subscribe(p,g=>{a[c]=g,s.add(c),u()});r.push(m)});await Promise.all(l),n=!0,s.size===i.length&&(e=Hs(a))}return d(),{get(){return e},subscribe(l,c){return o.all.add(l),c?.immediate!==!1&&n&&s.size===i.length&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,c){return o.stable.add(l),c?.immediate!==!1&&n&&s.size===i.length&&l(e,e),()=>o.stable.delete(l)},subscribeSelection(l,c){return o.selection.add(l),c?.immediate&&n&&s.size===i.length&&l({current:e.selectedItem,previous:e.selectedItem}),()=>o.selection.delete(l)},subscribeItems(l,c){return o.items.add(l),c?.immediate&&n&&s.size===i.length&&l({added:e.items,removed:[],counts:{before:0,after:e.count}}),()=>o.items.delete(l)},subscribeFavorites(l,c){return o.favorites.add(l),c?.immediate&&n&&s.size===i.length&&l({added:e.favoritedItemIds,removed:[],current:e.favoritedItemIds}),()=>o.favorites.delete(l)},destroy(){for(let l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.selection.clear(),o.items.clear(),o.favorites.clear(),n=!1}}}var Yo=null;function Qo(){return Yo||(Yo=Sf()),Yo}var er={all:[],host:null,count:0};function wf(e,t,n){let r=n.get(e.id),o=r?.slot,a=o?.data,i=o?.lastActionEvent;return{id:e.id,name:e.name,discordId:e.databaseUserId,discordAvatarUrl:e.discordAvatarUrl,guildId:e.guildId,isConnected:e.isConnected,isHost:e.id===t,slotIndex:r?.index??null,position:o?.position??null,cosmetic:{color:e.cosmetic?.color??"",avatar:e.cosmetic?.avatar?[...e.cosmetic.avatar]:[]},emote:{type:e.emoteData?.emoteType??-1},coins:a?.coinsCount??0,inventory:a?.inventory??null,shopPurchases:a?.shopPurchases??null,garden:a?.garden??null,pets:{slots:a?.petSlots??[],slotInfos:o?.petSlotInfos??null},journal:a?.journal??null,stats:a?.stats??null,tasksCompleted:a?.tasksCompleted??[],activityLogs:a?.activityLogs??[],customRestocks:{config:a?.customRestocks??null,inventories:o?.customRestockInventories??null},lastAction:i?{type:i.action,data:i.data,timestamp:i.timestamp}:null,selectedItemIndex:o?.notAuthoritative_selectedItemIndex??null,lastSlotMachineInfo:o?.lastSlotMachineInfo??null}}function _s(e){let t=e.players,n=e.hostPlayerId??"",r=e.userSlots??[];if(!t||!Array.isArray(t)||t.length===0)return er;let o=new Map;Array.isArray(r)&&r.forEach((s,u)=>{s?.type==="user"&&s?.playerId&&o.set(s.playerId,{slot:s,index:u})});let a=t.map(s=>wf(s,n,o)),i=a.find(s=>s.isHost)??null;return{all:a,host:i,count:a.length}}function Ws(e){let t=e.all.map(n=>`${n.id}:${n.isConnected}:${n.isHost}`);return JSON.stringify({playerKeys:t,hostId:e.host?.id??null,count:e.count})}function Tf(e,t){let n=[],r=new Set(e.map(a=>a.id)),o=new Set(t.map(a=>a.id));for(let a of t)r.has(a.id)||n.push({player:a,type:"join"});for(let a of e)o.has(a.id)||n.push({player:a,type:"leave"});return n}function kf(e,t){let n=[],r=new Map(e.map(o=>[o.id,o]));for(let o of t){let a=r.get(o.id);a&&a.isConnected!==o.isConnected&&n.push({player:o,isConnected:o.isConnected})}return n}function Pf(){let e=er,t=er,n=!1,r=[],o={all:new Set,stable:new Set,joinLeave:new Set,connection:new Set,host:new Set},a={},i=new Set,s=3;function u(){if(i.size<s)return;let l=_s(a);if(ae(e,l)||(t=e,e=l,!n))return;for(let f of o.all)f(e,t);if(Ws(t)!==Ws(e))for(let f of o.stable)f(e,t);let c=Tf(t.all,e.all);for(let f of c)for(let b of o.joinLeave)b(f);let p=kf(t.all,e.all);for(let f of p)for(let b of o.connection)b(f);let m=t.host?.id??null,g=e.host?.id??null;if(m!==g){let f={current:e.host,previous:t.host};for(let b of o.host)b(f)}}async function d(){if(n)return;let l=await Wo.onChangeNow(m=>{a.players=m,i.add("players"),u()});r.push(l);let c=await jo.onChangeNow(m=>{a.hostPlayerId=m,i.add("hostPlayerId"),u()});r.push(c);let p=await _o.onChangeNow(m=>{a.userSlots=m,i.add("userSlots"),u()});r.push(p),n=!0,i.size===s&&(e=_s(a))}return d(),{get(){return e},subscribe(l,c){return o.all.add(l),c?.immediate!==!1&&n&&i.size===s&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,c){return o.stable.add(l),c?.immediate!==!1&&n&&i.size===s&&l(e,e),()=>o.stable.delete(l)},subscribeJoinLeave(l,c){if(o.joinLeave.add(l),c?.immediate&&n&&i.size===s)for(let p of e.all)l({player:p,type:"join"});return()=>o.joinLeave.delete(l)},subscribeConnection(l,c){if(o.connection.add(l),c?.immediate&&n&&i.size===s)for(let p of e.all)l({player:p,isConnected:p.isConnected});return()=>o.connection.delete(l)},subscribeHost(l,c){return o.host.add(l),c?.immediate&&n&&i.size===s&&l({current:e.host,previous:e.host}),()=>o.host.delete(l)},destroy(){for(let l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.joinLeave.clear(),o.connection.clear(),o.host.clear(),n=!1}}}var Zo=null;function tr(){return Zo||(Zo=Pf()),Zo}var Nt=["seed","tool","egg","decor"];function Cf(e,t){switch(t){case"seed":return e.species??e.itemType;case"tool":return e.toolId??e.itemType;case"egg":return e.eggId??e.itemType;case"decor":return e.decorId??e.itemType;default:return e.itemType}}function Mf(e,t,n){let r=Cf(e,t),o=n[r]??0,a=Math.max(0,e.initialStock-o);return{id:r,itemType:e.itemType,initialStock:e.initialStock,purchased:o,remaining:a,isAvailable:a>0}}function Af(e,t,n){if(!t)return{type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null};let o=n[e]?.purchases??{},a=(t.inventory??[]).map(d=>Mf(d,e,o)),i=a.filter(d=>d.isAvailable).length,s=t.secondsUntilRestock??0,u=s>0?Date.now()+s*1e3:null;return{type:e,items:a,availableCount:i,totalCount:a.length,secondsUntilRestock:s,restockAt:u}}function js(e){let t=e.shops,n=e.purchases??{},r=Nt.map(s=>Af(s,t?.[s],n)),o={seed:r[0],tool:r[1],egg:r[2],decor:r[3]},a=r.filter(s=>s.restockAt!==null),i=null;if(a.length>0){let u=a.sort((d,l)=>(d.restockAt??0)-(l.restockAt??0))[0];i={shop:u.type,seconds:u.secondsUntilRestock,at:u.restockAt}}return{all:r,byType:o,nextRestock:i}}var Bs={all:Nt.map(e=>({type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null})),byType:{seed:{type:"seed",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},tool:{type:"tool",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},egg:{type:"egg",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},decor:{type:"decor",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null}},nextRestock:null};function Vs(e){return JSON.stringify({shops:e.all.map(t=>({type:t.type,itemCount:t.items.length,availableCount:t.availableCount}))})}function If(e,t){let n=e.secondsUntilRestock,r=t.secondsUntilRestock;return n>0&&n<=5&&r>n||n>0&&r===0&&t.items.some(a=>a.purchased===0)?{shop:t,previousItems:e.items}:null}function Ef(e,t){let n=[];for(let r of Nt){let o=e.byType[r],a=t.byType[r],i=new Map(o.items.map(s=>[s.id,s]));for(let s of a.items){let u=i.get(s.id);u&&s.purchased>u.purchased&&n.push({shopType:r,itemId:s.id,quantity:s.purchased-u.purchased,newPurchased:s.purchased,remaining:s.remaining})}}return n}function Lf(e,t){let n=[];for(let r of Nt){let o=e.byType[r],a=t.byType[r],i=new Map(o.items.map(s=>[s.id,s]));for(let s of a.items){let u=i.get(s.id);u&&u.isAvailable!==s.isAvailable&&n.push({shopType:r,itemId:s.id,wasAvailable:u.isAvailable,isAvailable:s.isAvailable})}}return n}function Rf(){let e=Bs,t=Bs,n=!1,r=[],o={all:new Set,stable:new Set,seedRestock:new Set,toolRestock:new Set,eggRestock:new Set,decorRestock:new Set,purchase:new Set,availability:new Set},a={},i=new Set,s=2;function u(){if(i.size<s)return;let l=js(a);if(ae(e,l)||(t=e,e=l,!n))return;for(let g of o.all)g(e,t);if(Vs(t)!==Vs(e))for(let g of o.stable)g(e,t);let c={seed:o.seedRestock,tool:o.toolRestock,egg:o.eggRestock,decor:o.decorRestock};for(let g of Nt){let f=If(t.byType[g],e.byType[g]);if(f)for(let b of c[g])b(f)}let p=Ef(t,e);for(let g of p)for(let f of o.purchase)f(g);let m=Lf(t,e);for(let g of m)for(let f of o.availability)f(g)}async function d(){if(n)return;let l=await Vo.onChangeNow(p=>{a.shops=p,i.add("shops"),u()});r.push(l);let c=await Fo.onChangeNow(p=>{a.purchases=p,i.add("purchases"),u()});r.push(c),n=!0,i.size===s&&(e=js(a))}return d(),{get(){return e},getShop(l){return e.byType[l]},getItem(l,c){return e.byType[l].items.find(m=>m.id===c)??null},subscribe(l,c){return o.all.add(l),c?.immediate!==!1&&n&&i.size===s&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,c){return o.stable.add(l),c?.immediate!==!1&&n&&i.size===s&&l(e,e),()=>o.stable.delete(l)},subscribeSeedRestock(l,c){return o.seedRestock.add(l),c?.immediate&&n&&i.size===s&&l({shop:e.byType.seed,previousItems:[]}),()=>o.seedRestock.delete(l)},subscribeToolRestock(l,c){return o.toolRestock.add(l),c?.immediate&&n&&i.size===s&&l({shop:e.byType.tool,previousItems:[]}),()=>o.toolRestock.delete(l)},subscribeEggRestock(l,c){return o.eggRestock.add(l),c?.immediate&&n&&i.size===s&&l({shop:e.byType.egg,previousItems:[]}),()=>o.eggRestock.delete(l)},subscribeDecorRestock(l,c){return o.decorRestock.add(l),c?.immediate&&n&&i.size===s&&l({shop:e.byType.decor,previousItems:[]}),()=>o.decorRestock.delete(l)},subscribePurchase(l,c){if(o.purchase.add(l),c?.immediate&&n&&i.size===s)for(let p of e.all)for(let m of p.items)m.purchased>0&&l({shopType:p.type,itemId:m.id,quantity:m.purchased,newPurchased:m.purchased,remaining:m.remaining});return()=>o.purchase.delete(l)},subscribeAvailability(l,c){if(o.availability.add(l),c?.immediate&&n&&i.size===s)for(let p of e.all)for(let m of p.items)l({shopType:p.type,itemId:m.id,wasAvailable:m.isAvailable,isAvailable:m.isAvailable});return()=>o.availability.delete(l)},destroy(){for(let l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.seedRestock.clear(),o.toolRestock.clear(),o.eggRestock.clear(),o.decorRestock.clear(),o.purchase.clear(),o.availability.clear(),n=!1}}}var nr=null;function or(){return nr||(nr=Rf()),nr}var Of=["Sunny","Rain","Frost","Dawn","AmberMoon"];function Df(e){return Of.includes(e)}var ar={type:"Sunny",isActive:!1,startTime:null,endTime:null,remainingSeconds:0};function Gf(e){if(!e)return ar;let t=Date.now(),n=e.endTime??0,r=Math.max(0,n-t),o=Math.floor(r/1e3),a=o>0,i=e.type??"Sunny";return{type:Df(i)?i:"Sunny",isActive:a,startTime:e.startTime??null,endTime:e.endTime??null,remainingSeconds:o}}function Hf(){let e=ar,t=ar,n=!1,r=null,o={all:new Set,change:new Set};function a(s){let u=Gf(s);if(e.type===u.type&&e.isActive===u.isActive&&e.startTime===u.startTime&&e.endTime===u.endTime){e=u;return}if(t=e,e=u,!!n){for(let d of o.all)d(e,t);if(t.type!==e.type||t.isActive!==e.isActive){let d={current:e,previous:t};for(let l of o.change)l(d)}}}async function i(){n||(r=await Uo.onChangeNow(s=>{a(s)}),n=!0)}return i(),{get(){return e},subscribe(s,u){return o.all.add(s),u?.immediate!==!1&&n&&s(e,e),()=>o.all.delete(s)},subscribeChange(s,u){return o.change.add(s),u?.immediate&&n&&s({current:e,previous:e}),()=>o.change.delete(s)},destroy(){r?.(),r=null,o.all.clear(),o.change.clear(),n=!1}}}var rr=null;function ir(){return rr||(rr=Hf()),rr}function Nf(){let e=ke.get("mutations");return e?Object.keys(e):[]}function $s(){let e={};for(let t of Nf())e[t]=[];return e}function lr(){return{garden:null,mySlotIndex:null,plants:{all:[],mature:[],growing:[],bySpecies:{},count:0},crops:{all:[],mature:[],growing:[],mutated:{all:[],byMutation:$s()}},eggs:{all:[],mature:[],growing:[],byType:{},count:0},decors:{tileObjects:[],boardwalk:[],all:[],byType:{},count:0},tiles:{tileObjects:[],boardwalk:[],empty:{tileObjects:[],boardwalk:[]}},counts:{plants:0,maturePlants:0,crops:0,matureCrops:0,eggs:0,matureEggs:0,decors:0,emptyTileObjects:0,emptyBoardwalk:0}}}function _f(e,t,n,r){let o=t.slots.filter(a=>r>=a.endTime).length;return{tileIndex:e,position:n,species:t.species,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:r>=t.maturedAt,slots:t.slots,slotsCount:t.slots.length,matureSlotsCount:o}}function Wf(e,t,n,r,o){return{tileIndex:e,position:t,slotIndex:n,species:r.species,startTime:r.startTime,endTime:r.endTime,targetScale:r.targetScale,mutations:[...r.mutations],isMature:o>=r.endTime}}function jf(e,t,n,r){return{tileIndex:e,position:n,eggId:t.eggId,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:r>=t.maturedAt}}function Fs(e,t,n,r){return{tileIndex:e,position:n,decorId:t.decorId,rotation:t.rotation,location:r}}function Us(e,t){let{garden:n,mySlotIndex:r}=e,o=Date.now();if(!n||r===null)return lr();let a=t().get(),i=a?.userSlots[r],s=i?.dirtTiles??[],u=i?.boardwalkTiles??[],d=[],l=[],c=[],p={},m=[],g=[],f=[],b=[],h=$s(),S=[],v=[],x=[],w={},k=[],L=[],I={},P=new Set,O=new Set;for(let[B,_]of Object.entries(n.tileObjects)){let j=parseInt(B,10);P.add(j);let N=a?a.globalToXY(j):{x:0,y:0};if(_.objectType==="plant"){let G=_,A=_f(B,G,N,o);d.push(A),A.isMature?l.push(A):c.push(A),p[A.species]||(p[A.species]=[]),p[A.species].push(A);for(let D=0;D<G.slots.length;D++){let R=G.slots[D],H=Wf(B,N,D,R,o);if(m.push(H),H.isMature?g.push(H):f.push(H),H.mutations.length>0){b.push(H);for(let W of H.mutations)h[W]||(h[W]=[]),h[W].push(H)}}}else if(_.objectType==="egg"){let A=jf(B,_,N,o);S.push(A),w[A.eggId]||(w[A.eggId]=[]),w[A.eggId].push(A),A.isMature?v.push(A):x.push(A)}else if(_.objectType==="decor"){let A=Fs(B,_,N,"tileObjects");k.push(A),I[A.decorId]||(I[A.decorId]=[]),I[A.decorId].push(A)}}for(let[B,_]of Object.entries(n.boardwalkTileObjects)){let j=parseInt(B,10);O.add(j);let N=a?a.globalToXY(j):{x:0,y:0},A=Fs(B,_,N,"boardwalk");L.push(A),I[A.decorId]||(I[A.decorId]=[]),I[A.decorId].push(A)}let E=[...k,...L],V=s.filter(B=>!P.has(B.localIndex)),J=u.filter(B=>!O.has(B.localIndex));return{garden:n,mySlotIndex:r,plants:{all:d,mature:l,growing:c,bySpecies:p,count:d.length},crops:{all:m,mature:g,growing:f,mutated:{all:b,byMutation:h}},eggs:{all:S,mature:v,growing:x,byType:w,count:S.length},decors:{tileObjects:k,boardwalk:L,all:E,byType:I,count:E.length},tiles:{tileObjects:s,boardwalk:u,empty:{tileObjects:V,boardwalk:J}},counts:{plants:d.length,maturePlants:l.length,crops:m.length,matureCrops:g.length,eggs:S.length,matureEggs:v.length,decors:E.length,emptyTileObjects:V.length,emptyBoardwalk:J.length}}}function zs(e){return JSON.stringify({plants:e.counts.plants,maturePlants:e.counts.maturePlants,crops:e.counts.crops,matureCrops:e.counts.matureCrops,eggs:e.counts.eggs,matureEggs:e.counts.matureEggs,decors:e.counts.decors,emptyTileObjects:e.counts.emptyTileObjects,emptyBoardwalk:e.counts.emptyBoardwalk})}function Bf(e,t){let n=new Set(e.map(i=>i.tileIndex)),r=new Set(t.map(i=>i.tileIndex)),o=t.filter(i=>!n.has(i.tileIndex)),a=e.filter(i=>!r.has(i.tileIndex));return{added:o,removed:a}}function Vf(e,t,n){let r=new Set(e.map(a=>a.tileIndex)),o=new Set(n.map(a=>a.tileIndex));return t.filter(a=>!r.has(a.tileIndex)&&o.has(a.tileIndex))}function Ff(e,t,n){let r=new Set(e.map(a=>`${a.tileIndex}:${a.slotIndex}`)),o=new Set(n.map(a=>`${a.tileIndex}:${a.slotIndex}`));return t.filter(a=>{let i=`${a.tileIndex}:${a.slotIndex}`;return!r.has(i)&&o.has(i)})}function Uf(e,t,n){let r=new Set(e.map(a=>a.tileIndex)),o=new Set(n.map(a=>a.tileIndex));return t.filter(a=>!r.has(a.tileIndex)&&o.has(a.tileIndex))}function zf(e,t){let n=[],r=new Map(e.map(o=>[o.tileIndex,o]));for(let o of t){let a=r.get(o.tileIndex);if(!a)continue;let i=Math.min(a.slots.length,o.slots.length);for(let s=0;s<i;s++){let u=new Set(a.slots[s].mutations),d=new Set(o.slots[s].mutations),l=[...d].filter(p=>!u.has(p)),c=[...u].filter(p=>!d.has(p));if(l.length>0||c.length>0){let p=Date.now(),m=o.slots[s],g={tileIndex:o.tileIndex,position:o.position,slotIndex:s,species:m.species,startTime:m.startTime,endTime:m.endTime,targetScale:m.targetScale,mutations:[...m.mutations],isMature:p>=m.endTime};n.push({crop:g,added:l,removed:c})}}}return n}function $f(e,t,n){let r=[],o=new Map(t.map(i=>[i.tileIndex,i])),a=new Map;for(let i of n)a.set(`${i.tileIndex}:${i.slotIndex}`,i);for(let i of e){let s=o.get(i.tileIndex);if(!s)continue;let u=Math.min(i.slots.length,s.slots.length);for(let d=0;d<u;d++){let l=i.slots[d],c=s.slots[d];if(l.startTime!==c.startTime){let p=a.get(`${i.tileIndex}:${d}`);if(!p||!p.isMature)continue;let m={tileIndex:i.tileIndex,position:i.position,slotIndex:d,species:l.species,startTime:l.startTime,endTime:l.endTime,targetScale:l.targetScale,mutations:[...l.mutations],isMature:!0};r.push({crop:m,remainingSlots:s.slotsCount})}}if(s.slotsCount<i.slotsCount)for(let d=s.slotsCount;d<i.slotsCount;d++){let l=a.get(`${i.tileIndex}:${d}`);if(!l||!l.isMature)continue;let c=i.slots[d];if(!c)continue;let p={tileIndex:i.tileIndex,position:i.position,slotIndex:d,species:c.species,startTime:c.startTime,endTime:c.endTime,targetScale:c.targetScale,mutations:[...c.mutations],isMature:!0};r.push({crop:p,remainingSlots:s.slotsCount})}}return r}function Kf(e,t){let n=new Set(e.map(i=>i.tileIndex)),r=new Set(t.map(i=>i.tileIndex)),o=t.filter(i=>!n.has(i.tileIndex)),a=e.filter(i=>!r.has(i.tileIndex));return{added:o,removed:a}}function qf(e,t){let n=u=>`${u.tileIndex}:${u.location}`,r=u=>`${u.tileIndex}:${u.location}`,o=new Set(e.map(n)),a=new Set(t.map(r)),i=t.filter(u=>!o.has(r(u))),s=e.filter(u=>!a.has(n(u)));return{added:i,removed:s}}function Jf(){let e=lr(),t=lr(),n=!1,r=[],o={all:new Set,stable:new Set,plantAdded:new Set,plantRemoved:new Set,plantMatured:new Set,cropMutated:new Set,cropMatured:new Set,cropHarvested:new Set,eggPlaced:new Set,eggRemoved:new Set,eggMatured:new Set,decorPlaced:new Set,decorRemoved:new Set},a={},i=new Set,s=2;function u(){if(i.size<s)return;let l=Us(a,lt);if(ae(e,l)||(t=e,e=l,!n))return;for(let v of o.all)v(e,t);if(zs(t)!==zs(e))for(let v of o.stable)v(e,t);let c=Bf(t.plants.all,e.plants.all);for(let v of c.added)for(let x of o.plantAdded)x({plant:v});for(let v of c.removed)for(let x of o.plantRemoved)x({plant:v,tileIndex:v.tileIndex});let p=Vf(t.plants.mature,e.plants.mature,e.plants.all);for(let v of p)for(let x of o.plantMatured)x({plant:v});let m=zf(t.plants.all,e.plants.all);for(let v of m)for(let x of o.cropMutated)x(v);let g=Ff(t.crops.mature,e.crops.mature,e.crops.all);for(let v of g)for(let x of o.cropMatured)x({crop:v});let f=$f(t.plants.all,e.plants.all,t.crops.all);for(let v of f)for(let x of o.cropHarvested)x(v);let b=Kf(t.eggs.all,e.eggs.all);for(let v of b.added)for(let x of o.eggPlaced)x({egg:v});for(let v of b.removed)for(let x of o.eggRemoved)x({egg:v});let h=Uf(t.eggs.mature,e.eggs.mature,e.eggs.all);for(let v of h)for(let x of o.eggMatured)x({egg:v});let S=qf(t.decors.all,e.decors.all);for(let v of S.added)for(let x of o.decorPlaced)x({decor:v});for(let v of S.removed)for(let x of o.decorRemoved)x({decor:v})}async function d(){if(n)return;let l=await Bo.onChangeNow(p=>{a.garden=p,i.add("garden"),u()});r.push(l);let c=await X.subscribe("myUserSlotIdxAtom",p=>{a.mySlotIndex=p,i.add("mySlotIndex"),u()});r.push(c),n=!0,i.size===s&&(e=Us(a,lt))}return d(),{get(){return e},subscribe(l,c){return o.all.add(l),c?.immediate!==!1&&n&&i.size===s&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,c){return o.stable.add(l),c?.immediate!==!1&&n&&i.size===s&&l(e,e),()=>o.stable.delete(l)},subscribePlantAdded(l,c){if(o.plantAdded.add(l),c?.immediate&&n&&i.size===s)for(let p of e.plants.all)l({plant:p});return()=>o.plantAdded.delete(l)},subscribePlantRemoved(l,c){return o.plantRemoved.add(l),()=>o.plantRemoved.delete(l)},subscribePlantMatured(l,c){if(o.plantMatured.add(l),c?.immediate&&n&&i.size===s)for(let p of e.plants.mature)l({plant:p});return()=>o.plantMatured.delete(l)},subscribeCropMutated(l,c){if(o.cropMutated.add(l),c?.immediate&&n&&i.size===s)for(let p of e.crops.mutated.all)l({crop:p,added:p.mutations,removed:[]});return()=>o.cropMutated.delete(l)},subscribeCropMatured(l,c){if(o.cropMatured.add(l),c?.immediate&&n&&i.size===s)for(let p of e.crops.mature)l({crop:p});return()=>o.cropMatured.delete(l)},subscribeCropHarvested(l,c){return o.cropHarvested.add(l),()=>o.cropHarvested.delete(l)},subscribeEggPlaced(l,c){if(o.eggPlaced.add(l),c?.immediate&&n&&i.size===s)for(let p of e.eggs.all)l({egg:p});return()=>o.eggPlaced.delete(l)},subscribeEggRemoved(l,c){return o.eggRemoved.add(l),()=>o.eggRemoved.delete(l)},subscribeEggMatured(l,c){if(o.eggMatured.add(l),c?.immediate&&n&&i.size===s)for(let p of e.eggs.mature)l({egg:p});return()=>o.eggMatured.delete(l)},subscribeDecorPlaced(l,c){if(o.decorPlaced.add(l),c?.immediate&&n&&i.size===s)for(let p of e.decors.all)l({decor:p});return()=>o.decorPlaced.delete(l)},subscribeDecorRemoved(l,c){return o.decorRemoved.add(l),()=>o.decorRemoved.delete(l)},destroy(){for(let l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.plantAdded.clear(),o.plantRemoved.clear(),o.plantMatured.clear(),o.cropMutated.clear(),o.cropMatured.clear(),o.cropHarvested.clear(),o.eggPlaced.clear(),o.eggRemoved.clear(),o.eggMatured.clear(),o.decorPlaced.clear(),o.decorRemoved.clear(),n=!1}}}var sr=null;function cr(){return sr||(sr=Jf()),sr}var ie=null;function In(){return ie||(ie={currentTile:$o(),myPets:Jo(),gameMap:lt(),myInventory:Qo(),players:tr(),shops:or(),weather:ir(),myGarden:cr()},ie)}function Ce(){if(!ie)throw new Error("[Globals] Not initialized. Call initGlobals() first.");return ie}function Ks(){ie&&(ie.currentTile.destroy(),ie.myPets.destroy(),ie.gameMap.destroy(),ie.myInventory.destroy(),ie.players.destroy(),ie.shops.destroy(),ie.weather.destroy(),ie.myGarden.destroy(),ie=null)}var qs={get currentTile(){return Ce().currentTile},get myPets(){return Ce().myPets},get gameMap(){return Ce().gameMap},get myInventory(){return Ce().myInventory},get players(){return Ce().players},get shops(){return Ce().shops},get weather(){return Ce().weather},get myGarden(){return Ce().myGarden}};var Xf={Store:{select:X.select.bind(X),set:X.set.bind(X),subscribe:X.subscribe.bind(X),subscribeImmediate:X.subscribeImmediate.bind(X)},Globals:qs,Modules:{Version:St,Assets:xe,Manifest:ge,Data:ke,Sprite:Te,Tile:Pe,Pixi:Pt,Audio:Et,Cosmetic:Lt},WebSocket:{chat:Xt,emote:Vr,wish:Fr,kickPlayer:Ur,setPlayerData:zr,usurpHost:$r,reportSpeakingStart:Kr,setSelectedGame:qr,voteForGame:Jr,requestGame:Xr,restartGame:Yr,ping:Qr,checkWeatherStatus:ta,move:Zr,playerPosition:Wn,teleport:ea,moveInventoryItem:na,dropObject:oa,pickupObject:ra,toggleFavoriteItem:aa,putItemInStorage:ia,retrieveItemFromStorage:sa,moveStorageItem:la,logItems:ca,plantSeed:ua,waterPlant:da,harvestCrop:pa,sellAllCrops:ma,purchaseDecor:ga,purchaseEgg:fa,purchaseTool:ba,purchaseSeed:ha,plantEgg:ya,hatchEgg:xa,plantGardenPlant:va,potPlant:Sa,mutationPotion:wa,pickupDecor:Ta,placeDecor:ka,removeGardenObject:Pa,placePet:Ca,feedPet:Ma,petPositions:Aa,swapPet:Ia,storePet:Ea,namePet:La,sellPet:Ra},_internal:{getGlobals:Ce,initGlobals:In,destroyGlobals:Ks}};function Js(){C.Gemini=Xf}function ur(e){e.logStep("WebSocket","Capturing WebSocket...");let t=null;return t=Jt(n=>{n.ws&&(e.logStep("WebSocket","WebSocket captured","success"),t?.(),t=null)},{intervalMs:250}),li({debug:!1}),()=>{t?.(),t=null}}async function dr(e){e.logStep("Atoms","Prewarming Jotai store...");try{await Go(),await Sn({timeoutMs:8e3,intervalMs:50}),e.logStep("Atoms","Jotai store ready","success")}catch(t){e.logStep("Atoms","Jotai store not captured yet","error"),console.warn("[Bootstrap] Jotai store wait failed",t)}}function pr(e){e.logStep("Globals","Initializing global variables...");try{In(),e.logStep("Globals","Global variables ready","success")}catch(t){e.logStep("Globals","Failed to initialize global variables","error"),console.warn("[Bootstrap] Global variables init failed",t)}}function mr(e){e.logStep("API","Exposing Gemini API...");try{Js(),e.logStep("API","Gemini API ready","success")}catch(t){e.logStep("API","Failed to expose API","error"),console.warn("[Bootstrap] API init failed",t)}}function gr(e){e.logStep("HUD","Loading HUD preferences...");let t=qn(),n=Kn({hostId:"gemini-hud-root",initialWidth:t.width,initialOpen:t.isOpen,onWidthChange:r=>Qe("width",r),onOpenChange:r=>Qe("isOpen",r),themes:Ge,initialTheme:t.theme,onThemeChange:r=>Qe("theme",r),buildSections:r=>jn({applyTheme:r.applyTheme,initialTheme:r.initialTheme,getCurrentTheme:r.getCurrentTheme}),initialTab:t.activeTab,onTabChange:r=>Qe("activeTab",r)});return e.logStep("HUD","HUD ready","success"),n}async function fr(e){e.setSubtitle("Activating Gemini modules..."),await ys(t=>{t.status==="start"?e.logStep(t.name,`Loading ${t.name}...`):t.status==="success"?e.logStep(t.name,`${t.name} ready`,"success"):e.logStep(t.name,`${t.name} encountered an issue.`,"error")})}(async function(){"use strict";let e=Ln({title:"Gemini is loading",subtitle:"Connecting and preparing modules..."}),t=null,n=null;try{t=ur(e),await dr(e),pr(e),mr(e),n=gr(e),await fr(e),e.succeed("Gemini is ready!")}catch(r){e.fail("Failed to initialize the mod.",r)}finally{t?.()}if(n){let r=n;Qt({onClick:()=>r.setOpen(!0)})}})();})();
