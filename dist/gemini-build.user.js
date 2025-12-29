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
"use strict";(()=>{var Hr=Object.defineProperty;var Ml=(e,t,n)=>t in e?Hr(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Il=(e,t)=>()=>(e&&(t=e(e=0)),t);var Xt=(e,t)=>{for(var n in t)Hr(e,n,{get:t[n],enumerable:!0})};var ee=(e,t,n)=>Ml(e,typeof t!="symbol"?t+"":t,n);var Ii={};Xt(Ii,{clamp:()=>ge,clamp01:()=>uo,sleep:()=>Me,tryDo:()=>pe,waitWithTimeout:()=>gn});async function gn(e,t,n){let r=performance.now();for(;performance.now()-r<t;){let o=await Promise.race([e,Me(50).then(()=>null)]);if(o!==null)return o}throw new Error(`${n} timeout`)}var Me,pe,ge,uo,Ie=Il(()=>{"use strict";Me=e=>new Promise(t=>setTimeout(t,e)),pe=e=>{try{return e()}catch{return}},ge=(e,t,n)=>Math.max(t,Math.min(n,e)),uo=e=>ge(e,0,1)});function T(e,t=null,...n){let r=document.createElement(e);for(let[o,a]of Object.entries(t||{}))a!=null&&(o==="style"?typeof a=="string"?r.setAttribute("style",a):typeof a=="object"&&Object.assign(r.style,a):o.startsWith("on")&&typeof a=="function"?r[o.toLowerCase()]=a:o in r?r[o]=a:r.setAttribute(o,String(a)));for(let o of n)o==null||o===!1||r.appendChild(typeof o=="string"||typeof o=="number"?document.createTextNode(String(o)):o);return r}var Yt="https://i.imgur.com/k5WuC32.png",Nr="gemini-loader-style",_e="gemini-loader",_r=80;function El(){if(document.getElementById(Nr))return;let e=document.createElement("style");e.id=Nr,e.textContent=`
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
  `,document.head.appendChild(e)}function Qt(e,t,n){let r=T("div",{className:`gemini-loader__log ${n}`},T("div",{className:"gemini-loader__dot"}),T("div",{textContent:t}));for(e.appendChild(r);e.childElementCount>_r;)e.firstElementChild?.remove();e.scrollTop=e.scrollHeight}function Ll(){return new Promise(e=>{if(typeof GM_xmlhttpRequest>"u"){e(Yt);return}GM_xmlhttpRequest({method:"GET",url:Yt,responseType:"blob",onload:t=>{let n=t.response,r=new FileReader;r.onloadend=()=>e(r.result),r.onerror=()=>e(Yt),r.readAsDataURL(n)},onerror:()=>e(Yt)})})}function zn(e={}){let t=Number.isFinite(e.blurPx)?Math.max(4,Number(e.blurPx)):14;El();let n=T("div",{className:"gemini-loader__subtitle",textContent:e.subtitle??"Initializing the mod..."}),r=T("div",{className:"gemini-loader__logs"}),o=T("img",{className:"gemini-loader__spinner-icon",alt:"Gemini"}),a=T("div",{className:"gemini-loader__spinner"},o);Ll().then(h=>{o.src=h});let i=T("div",{className:"gemini-loader__card"},T("div",{className:"gemini-loader__header"},a,T("div",{className:"gemini-loader__titles"},T("div",{className:"gemini-loader__title",textContent:e.title??"Gemini is loading"}),n)),r),s=T("div",{id:_e},i);(document.body||document.documentElement).appendChild(s);let u=T("div",{className:"gemini-loader__actions"},T("button",{className:"gemini-loader__button",textContent:"Close loader",onclick:()=>s.remove()}));i.appendChild(u),s.style.setProperty("--loader-blur",`${t}px`);let d=h=>{n.textContent=h},l=new Map,c=(h,b)=>{h.className=`gemini-loader__log ${b}`};return{log:(h,b="info")=>Qt(r,h,b),logStep:(h,b,S="info")=>{let v=String(h||"").trim();if(!v){Qt(r,b,S);return}let x=l.get(v);if(x){x.el.lastElementChild&&(x.el.lastElementChild.textContent=b),x.tone!==S&&(c(x.el,S),x.tone=S);return}let w=T("div",{className:`gemini-loader__log ${S}`},T("div",{className:"gemini-loader__dot"}),T("div",{textContent:b}));for(l.set(v,{el:w,tone:S}),r.appendChild(w);r.childElementCount>_r;){let k=r.firstElementChild;if(!k)break;let L=Array.from(l.entries()).find(([,I])=>I.el===k)?.[0];L&&l.delete(L),k.remove()}r.scrollTop=r.scrollHeight},setSubtitle:d,succeed:(h,b=600)=>{h&&Qt(r,h,"success"),s.classList.add("gemini-loader--closing"),setTimeout(()=>s.remove(),b)},fail:(h,b)=>{Qt(r,h,"error"),d("Something went wrong. Check the console for details."),s.classList.add("gemini-loader--error"),console.error("[Gemini loader]",h,b)}}}function Wr(e,t,n){let r=T("div",{className:"lg-pill",id:"pill"}),o=e.map(l=>{let c=T("button",{className:"lg-tab"},l.label);return c.setAttribute("data-target",l.id),c}),a=T("div",{className:"lg-tabs",id:"lg-tabs-row"},r,...o),i=a;a.addEventListener("wheel",l=>{Math.abs(l.deltaY)>Math.abs(l.deltaX)&&(l.preventDefault(),a.scrollLeft+=l.deltaY)},{passive:!1});function s(l){let c=a.getBoundingClientRect(),p=o.find(w=>w.dataset.target===l)||o[0];if(!p)return;let m=p.getBoundingClientRect(),g=m.left-c.left,f=m.width;r.style.width=`${f}px`,r.style.transform=`translateX(${g}px)`;let h=a.scrollLeft,b=h,S=h+a.clientWidth,v=g-12,x=g+f+12;v<b?a.scrollTo({left:v,behavior:"smooth"}):x>S&&a.scrollTo({left:x-a.clientWidth,behavior:"smooth"})}let u=t||(e[0]?.id??"");function d(l){u=l,o.forEach(c=>c.classList.toggle("active",c.dataset.target===l)),s(l),n(l)}return o.forEach(l=>l.addEventListener("click",()=>d(l.dataset.target))),queueMicrotask(()=>s(u)),{root:i,activate:d,recalc:()=>s(u),getActive:()=>u}}var We=class{constructor(t){ee(this,"id");ee(this,"label");ee(this,"container",null);ee(this,"cleanupFunctions",[]);this.id=t.id,this.label=t.label}render(t){for(this.unmount();t.firstChild;)t.removeChild(t.firstChild);this.container=t;let n=this.build(t);n instanceof Promise&&n.catch(o=>{console.error(`[Gemini] Error building section ${this.id}:`,o)});let r=t.firstElementChild;r&&r.classList.contains("gemini-section")&&r.classList.add("active")}unmount(){this.executeCleanup(),this.container=null}createContainer(t,n){let r=n?`gemini-section ${n}`:"gemini-section";return T("section",{id:t,className:r})}addCleanup(t){this.cleanupFunctions.push(t)}createGrid(t="12px"){let n=T("div");return n.style.display="grid",n.style.gap=t,n}executeCleanup(){for(let t of this.cleanupFunctions)try{t()}catch(n){console.error(`[Gemini] Cleanup error in section ${this.id}:`,n)}this.cleanupFunctions=[]}};var ht=class{constructor(t,n,r){ee(this,"sections");ee(this,"activeId",null);ee(this,"container");ee(this,"theme");this.sections=new Map(t.map(o=>[o.id,o])),this.container=n,this.theme=r}get ids(){return Array.from(this.sections.keys())}get all(){return Array.from(this.sections.values())}get active(){return this.activeId}activate(t){if(this.activeId!==t){if(!this.sections.has(t))throw new Error(`[Gemini] Unknown section: ${t}`);if(this.activeId&&this.sections.get(this.activeId).unmount(),this.activeId=t,this.sections.get(t).render(this.container),this.theme){let n=this.theme.getCurrentTheme();this.theme.applyTheme(n)}}}};function yt(e,t){try{let n=JSON.stringify(t);GM_setValue(e,n)}catch(n){console.error(`[Gemini] Failed to save key "${e}" to storage:`,n)}}function Re(e,t){try{let n=GM_getValue(e);return n==null?t:typeof n=="string"?JSON.parse(n):n}catch(n){return console.error(`[Gemini] Failed to load key "${e}" from storage, using default:`,n),t}}var jr="gemini.sections";function Br(){let e=Re(jr,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function Rl(e){yt(jr,e)}async function Ur(e){return Br()[e]}function Fr(e,t){let n=Br();Rl({...n,[e]:t})}function Zt(e,t){return{...e,...t??{}}}async function Vr(e){let t=await Ur(e.path),n;e.migrate?n=e.migrate(t):n=t??{},n=Object.assign((d=>JSON.parse(JSON.stringify(d)))(e.defaults),n),e.sanitize&&(n=e.sanitize(n));function o(){Fr(e.path,n)}function a(){return n}function i(d){n=e.sanitize?e.sanitize(d):d,o()}function s(d){let c=Object.assign((p=>JSON.parse(JSON.stringify(p)))(n),{});typeof d=="function"?d(c):Object.assign(c,d),n=e.sanitize?e.sanitize(c):c,o()}function u(){o()}return{get:a,set:i,update:s,save:u}}async function xt(e,t){let{path:n=e,...r}=t;return Vr({path:n,...r})}var Ol=0,en=new Map;function Oe(e={},...t){let{id:n,className:r,variant:o="default",padding:a="md",interactive:i=!1,expandable:s=!1,defaultExpanded:u=!0,onExpandChange:d,mediaTop:l,title:c,subtitle:p,badge:m,actions:g,footer:f,divider:h=!1,tone:b="neutral",stateKey:S}=e,v=T("div",{className:"card",id:n,tabIndex:i?0:void 0});v.classList.add(`card--${o}`,`card--p-${a}`),i&&v.classList.add("card--interactive"),b!=="neutral"&&v.classList.add(`card--tone-${b}`),r&&v.classList.add(...r.split(" ").filter(Boolean)),s&&v.classList.add("card--expandable");let x=s?S??n??(typeof c=="string"?`title:${c}`:null):null,w=!s||u;x&&en.has(x)&&(w=!!en.get(x));let k=null,L=null,I=null,P=null,O=null,E=n?`${n}-collapse`:`card-collapse-${++Ol}`,U=()=>{if(P!==null&&(cancelAnimationFrame(P),P=null),O){let G=O;O=null,G()}},q=(G,M)=>{if(!I)return;U();let D=I;if(D.setAttribute("aria-hidden",String(!G)),!M){D.classList.remove("card-collapse--animating"),D.style.display=G?"":"none",D.style.height="",D.style.opacity="";return}if(D.classList.add("card-collapse--animating"),D.style.display="",G){D.style.height="auto";let z=D.scrollHeight;if(!z){D.classList.remove("card-collapse--animating"),D.style.display="",D.style.height="",D.style.opacity="";return}D.style.height="0px",D.style.opacity="0",D.offsetHeight,P=requestAnimationFrame(()=>{P=null,D.style.height=`${z}px`,D.style.opacity="1"})}else{let z=D.scrollHeight;if(!z){D.classList.remove("card-collapse--animating"),D.style.display="none",D.style.height="",D.style.opacity="";return}D.style.height=`${z}px`,D.style.opacity="1",D.offsetHeight,P=requestAnimationFrame(()=>{P=null,D.style.height="0px",D.style.opacity="0"})}let R=()=>{D.classList.remove("card-collapse--animating"),D.style.height="",G||(D.style.display="none"),D.style.opacity=""},H=null,W=z=>{z.target===D&&(H!==null&&(clearTimeout(H),H=null),D.removeEventListener("transitionend",W),D.removeEventListener("transitioncancel",W),O=null,R())};O=()=>{H!==null&&(clearTimeout(H),H=null),D.removeEventListener("transitionend",W),D.removeEventListener("transitioncancel",W),O=null,R()},D.addEventListener("transitionend",W),D.addEventListener("transitioncancel",W),H=window.setTimeout(()=>{O?.()},420)};function B(G){let M=document.createElementNS("http://www.w3.org/2000/svg","svg");return M.setAttribute("viewBox","0 0 24 24"),M.setAttribute("width","16"),M.setAttribute("height","16"),M.innerHTML=G==="up"?'<path d="M7 14l5-5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>':'<path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',M}function _(G,M=!0,D=!0){w=G,v.classList.toggle("card--collapsed",!w),v.classList.toggle("card--expanded",w),k&&(k.dataset.expanded=String(w),k.setAttribute("aria-expanded",String(w))),L&&(L.setAttribute("aria-expanded",String(w)),L.classList.toggle("card-toggle--collapsed",!w),L.setAttribute("aria-label",w?"Replier le contenu":"Deplier le contenu"),L.replaceChildren(B(w?"up":"down"))),s?q(w,D):I&&(I.style.display="",I.style.height="",I.style.opacity="",I.setAttribute("aria-hidden","false")),M&&d&&d(w),x&&en.set(x,w)}if(l){let G=T("div",{className:"card-media"});G.append(l),v.appendChild(G)}let j=!!(c||p||m||g&&g.length||s);if(j){k=T("div",{className:"card-header"});let G=T("div",{className:"card-headline",style:"min-width:0;display:flex;flex-direction:column;gap:2px;"});if(c){let R=T("h3",{className:"card-title",style:"margin:0;font-size:15px;font-weight:700;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:8px;"},c);m&&R.append(typeof m=="string"?T("span",{className:"badge"},m):m),G.appendChild(R)}if(p){let R=T("div",{className:"card-subtitle",style:"opacity:.85;font-size:12px;color:color-mix(in oklab, var(--fg) 80%, #9ca3af)"},p);G.appendChild(R)}(G.childNodes.length||s)&&k.appendChild(G);let M=T("div",{className:"card-header-right",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"}),D=T("div",{className:"card-actions",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"});g?.forEach(R=>D.appendChild(R)),D.childNodes.length&&M.appendChild(D),s&&(L=T("button",{className:"card-toggle",type:"button",ariaExpanded:String(w),ariaControls:E,ariaLabel:w?"Replier le contenu":"Deplier le contenu"}),L.textContent=w?"\u25B2":"\u25BC",L.addEventListener("click",R=>{R.preventDefault(),R.stopPropagation(),_(!w)}),M.appendChild(L),k.classList.add("card-header--expandable"),k.addEventListener("click",R=>{let H=R.target;H?.closest(".card-actions")||H?.closest(".card-toggle")||_(!w)})),M.childNodes.length&&k.appendChild(M),v.appendChild(k)}I=T("div",{className:"card-collapse",id:E,ariaHidden:s?String(!w):"false"}),v.appendChild(I),h&&j&&I.appendChild(T("div",{className:"card-divider"}));let N=T("div",{className:"card-body"});if(N.append(...t),I.appendChild(N),f){h&&I.appendChild(T("div",{className:"card-divider"}));let G=T("div",{className:"card-footer"});G.append(f),I.appendChild(G)}return L&&L.setAttribute("aria-controls",E),_(w,!1,!1),x&&en.set(x,w),v}function $n(...e){return T("div",{className:"card-footer"},...e)}var tn=!1,nn=new Set,be=e=>{let t=document.activeElement;for(let n of nn)if(t&&(t===n||n.contains(t))){e.stopImmediatePropagation(),e.stopPropagation();return}};function Dl(){tn||(tn=!0,window.addEventListener("keydown",be,!0),window.addEventListener("keypress",be,!0),window.addEventListener("keyup",be,!0),document.addEventListener("keydown",be,!0),document.addEventListener("keypress",be,!0),document.addEventListener("keyup",be,!0))}function Gl(){tn&&(nn.size>0||(tn=!1,window.removeEventListener("keydown",be,!0),window.removeEventListener("keypress",be,!0),window.removeEventListener("keyup",be,!0),document.removeEventListener("keydown",be,!0),document.removeEventListener("keypress",be,!0),document.removeEventListener("keyup",be,!0)))}function tt(e){let{id:t,value:n=null,options:r,placeholder:o="Select...",size:a="md",disabled:i=!1,blockGameKeys:s=!0,onChange:u,onOpenChange:d}=e,l=T("div",{className:"select",id:t}),c=T("button",{className:"select-trigger",type:"button"}),p=T("span",{className:"select-value"},o),m=T("span",{className:"select-caret"},"\u25BE");c.append(p,m);let g=T("div",{className:"select-menu",role:"listbox",tabindex:"-1","aria-hidden":"true"});l.classList.add(`select--${a}`);let f=!1,h=n,b=null,S=!!i;function v(R){return R==null?o:(e.options||r).find(W=>W.value===R)?.label??o}function x(R){p.textContent=v(R),g.querySelectorAll(".select-option").forEach(H=>{let W=H.dataset.value,z=R!=null&&W===R;H.classList.toggle("selected",z),H.setAttribute("aria-selected",String(z))})}function w(R){g.replaceChildren(),R.forEach(H=>{let W=T("button",{className:"select-option"+(H.disabled?" disabled":""),type:"button",role:"option","data-value":H.value,"aria-selected":String(H.value===h),tabindex:"-1"},H.label);H.value===h&&W.classList.add("selected"),H.disabled||W.addEventListener("pointerdown",z=>{z.preventDefault(),z.stopPropagation(),E(H.value,{notify:!0}),P()},{capture:!0}),g.appendChild(W)})}function k(){c.setAttribute("aria-expanded",String(f)),g.setAttribute("aria-hidden",String(!f))}function L(){let R=c.getBoundingClientRect();Object.assign(g.style,{minWidth:`${R.width}px`})}function I(){f||S||(f=!0,l.classList.add("open"),k(),L(),document.addEventListener("mousedown",j,!0),document.addEventListener("scroll",N,!0),window.addEventListener("resize",G),g.focus({preventScroll:!0}),s&&(Dl(),nn.add(l),b=()=>{nn.delete(l),Gl()}),d?.(!0))}function P(){f&&(f=!1,l.classList.remove("open"),k(),document.removeEventListener("mousedown",j,!0),document.removeEventListener("scroll",N,!0),window.removeEventListener("resize",G),c.focus({preventScroll:!0}),b?.(),b=null,d?.(!1))}function O(){f?P():I()}function E(R,H={}){let W=h;h=R,x(h),H.notify!==!1&&W!==R&&u?.(R)}function U(){return h}function q(R){let H=Array.from(g.querySelectorAll(".select-option:not(.disabled)"));if(!H.length)return;let W=H.findIndex(re=>re.classList.contains("active")),z=H[(W+(R===1?1:H.length-1))%H.length];H.forEach(re=>re.classList.remove("active")),z.classList.add("active"),z.focus({preventScroll:!0}),z.scrollIntoView({block:"nearest"})}function B(R){(R.key===" "||R.key==="Enter"||R.key==="ArrowDown")&&(R.preventDefault(),I())}function _(R){if(R.key==="Escape"){R.preventDefault(),P();return}if(R.key==="Enter"||R.key===" "){let H=g.querySelector(".select-option.active")||g.querySelector(".select-option.selected");H&&!H.classList.contains("disabled")&&(R.preventDefault(),E(H.dataset.value,{notify:!0}),P());return}if(R.key==="ArrowDown"){R.preventDefault(),q(1);return}if(R.key==="ArrowUp"){R.preventDefault(),q(-1);return}}function j(R){l.contains(R.target)||P()}function N(){f&&L()}function G(){f&&L()}function M(R){S=!!R,c.disabled=S,l.classList.toggle("disabled",S),S&&P()}function D(R){e.options=R,w(R),R.some(H=>H.value===h)||(h=null,x(null))}return l.append(c,g),c.addEventListener("pointerdown",R=>{R.preventDefault(),R.stopPropagation(),O()},{capture:!0}),c.addEventListener("keydown",B),g.addEventListener("keydown",_),w(r),n!=null?(h=n,x(h)):x(null),k(),M(S),{root:l,open:I,close:P,toggle:O,getValue:U,setValue:E,setOptions:D,setDisabled:M,destroy(){document.removeEventListener("mousedown",j,!0),document.removeEventListener("scroll",N,!0),window.removeEventListener("resize",G),b?.(),b=null}}}function on(e={}){let{id:t,text:n="",htmlFor:r,tone:o="default",size:a="md",layout:i="inline",variant:s="text",required:u=!1,disabled:d=!1,tooltip:l,hint:c,icon:p,suffix:m,onClick:g}=e,f=T("div",{className:"lg-label-wrap",id:t}),h=T("label",{className:"lg-label",...r?{htmlFor:r}:{},...l?{title:l}:{}});if(p){let E=typeof p=="string"?T("span",{className:"lg-label-ico"},p):p;E.classList?.add?.("lg-label-ico"),h.appendChild(E)}let b=T("span",{className:"lg-label-text"},n);h.appendChild(b);let S=T("span",{className:"lg-label-req",ariaHidden:"true"}," *");u&&h.appendChild(S);let v=null;if(m!=null){v=typeof m=="string"?document.createTextNode(m):m;let E=T("span",{className:"lg-label-suffix"});E.appendChild(v),h.appendChild(E)}let x=c?T("div",{className:"lg-label-hint"},c):null;f.classList.add(`lg-label--${i}`),f.classList.add(`lg-label--${a}`),s==="title"&&f.classList.add("lg-label--title"),w(o),d&&f.classList.add("is-disabled"),f.appendChild(h),x&&f.appendChild(x),g&&h.addEventListener("click",g);function w(E){f.classList.remove("lg-label--default","lg-label--muted","lg-label--info","lg-label--success","lg-label--warning","lg-label--danger"),f.classList.add(`lg-label--${E}`)}function k(E){b.textContent=E}function L(E){w(E)}function I(E){E&&!S.isConnected&&h.appendChild(S),!E&&S.isConnected&&S.remove(),E?h.setAttribute("aria-required","true"):h.removeAttribute("aria-required")}function P(E){f.classList.toggle("is-disabled",!!E)}function O(E){!E&&x&&x.isConnected?x.remove():E&&x?x.textContent=E:E&&!x&&f.appendChild(T("div",{className:"lg-label-hint"},E))}return{root:f,labelEl:h,hintEl:x,setText:k,setTone:L,setRequired:I,setDisabled:P,setHint:O}}function vt(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function rn(e,t){let n=document.createElement("span");n.className=`btn-ico btn-ico--${t}`;let r=vt(e);return r&&n.appendChild(r),n}function Hl(){let e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.marginRight="6px",t.style.display="none",t.style.flexShrink="0";let n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");let r=document.createElementNS(e,"animate");r.setAttribute("attributeName","stroke-dasharray"),r.setAttribute("values","1,150;90,150;90,150"),r.setAttribute("dur","1.5s"),r.setAttribute("repeatCount","indefinite");let o=document.createElementNS(e,"animateTransform");return o.setAttribute("attributeName","transform"),o.setAttribute("attributeType","XML"),o.setAttribute("type","rotate"),o.setAttribute("from","0 12 12"),o.setAttribute("to","360 12 12"),o.setAttribute("dur","1s"),o.setAttribute("repeatCount","indefinite"),n.appendChild(r),n.appendChild(o),t.appendChild(n),t}function De(e={}){let{label:t="",id:n,variant:r="default",size:o="md",iconLeft:a,iconRight:i,loading:s=!1,tooltip:u,type:d="button",onClick:l,disabled:c=!1,fullWidth:p=!1}=e,m=T("button",{className:"btn",id:n});m.type=d,r==="primary"&&m.classList.add("primary"),o==="sm"&&m.classList.add("btn--sm"),u&&(m.title=u),p&&(m.style.width="100%");let g=Hl(),f=a?rn(a,"left"):null,h=i?rn(i,"right"):null,b=document.createElement("span");b.className="btn-label";let S=vt(t);S&&b.appendChild(S),!S&&(f||h)&&m.classList.add("btn--icon"),m.appendChild(g),f&&m.appendChild(f),m.appendChild(b),h&&m.appendChild(h);let v=c||s;m.disabled=v,m.setAttribute("aria-busy",String(!!s)),g.style.display=s?"inline-block":"none",l&&m.addEventListener("click",l);let x=m;return x.setLoading=w=>{m.setAttribute("aria-busy",String(!!w)),g.style.display=w?"inline-block":"none",m.disabled=w||c},x.setDisabled=w=>{m.disabled=w||m.getAttribute("aria-busy")==="true"},x.setLabel=w=>{b.replaceChildren();let k=vt(w);k&&b.appendChild(k),!k&&(f||h)?m.classList.add("btn--icon"):m.classList.remove("btn--icon")},x.setIconLeft=w=>{if(w==null){f?.remove();return}f?f.replaceChildren(vt(w)):m.insertBefore(rn(w,"left"),b)},x.setIconRight=w=>{if(w==null){h?.remove();return}h?h.replaceChildren(vt(w)):m.appendChild(rn(w,"right"))},x}function Nl(){try{let e=window.visualViewport,t=Math.round((e?.width??window.innerWidth)||0),n=Math.round((e?.height??window.innerHeight)||0);if(t&&n)return t>=n?"landscape":"portrait"}catch{}return"unknown"}function _l(){let e=navigator.userAgent||"",t=navigator.platform||"",n=navigator.userAgentData;if(n&&typeof n.platform=="string"){let o=n.platform.toLowerCase();if(o.includes("windows"))return"windows";if(o.includes("mac"))return"mac";if(o.includes("android"))return"android";if(o.includes("chrome os")||o.includes("cros"))return"chromeos";if(o.includes("linux"))return"linux";if(o.includes("ios"))return"ios"}return/iPhone|iPad|iPod/i.test(e)||t==="MacIntel"&&navigator.maxTouchPoints>1?"ios":/Android/i.test(e)?"android":/CrOS/i.test(e)?"chromeos":/Win/i.test(e)?"windows":/Mac/i.test(e)?"mac":/Linux/i.test(e)?"linux":"unknown"}function Wl(){let e=navigator.userAgent||"",t=navigator.userAgentData;if(t&&Array.isArray(t.brands)){let n=t.brands.map(i=>String(i.brand||i.brandName||i.brandVersion||i)),r=n.some(i=>/Edge/i.test(i)||/Microsoft Edge/i.test(i)),o=n.some(i=>/Opera/i.test(i)||/OPR/i.test(i)),a=n.some(i=>/Chrome|Chromium/i.test(i));if(r)return"Edge";if(o)return"Opera";if(a)return"Chrome";if(navigator.brave)return"Brave"}return/FxiOS/i.test(e)?"Firefox":/CriOS/i.test(e)?"Chrome":/EdgiOS/i.test(e)?"Edge":/OPiOS|OPR|Opera Mini|Opera/i.test(e)?"Opera":/Edg\//i.test(e)?"Edge":/OPR\//i.test(e)||/Opera/i.test(e)?"Opera":/Firefox/i.test(e)?"Firefox":/Safari/i.test(e)&&!/Chrome|Chromium|Edg|OPR/i.test(e)?"Safari":/Brave/i.test(e)||window.Brave||navigator.brave?"Brave":/Chrome|Chromium/i.test(e)?"Chrome":"Unknown"}function jl(){let e=navigator.userAgent||"",t=navigator.userAgentData;return t&&typeof t.mobile=="boolean"?t.mobile?"mobile":"desktop":/Android|iPhone|iPad|iPod|Mobile/i.test(e)?"mobile":"desktop"}function xe(){let e=(()=>{try{return window.top!==window.self}catch{return!0}})(),t=Bl(document.referrer),r=e&&!!t&&/(^|\.)discord(app)?\.com$/i.test(t)?"discord":"web",o=jl(),a=_l(),i=Wl(),s=window.screen||{},u=window.visualViewport,d=Math.round(window.innerWidth||document.documentElement.clientWidth||0),l=Math.round(window.innerHeight||document.documentElement.clientHeight||0),c=Math.round(u?.width??d),p=Math.round(u?.height??l),m=Math.round(s.width||0),g=Math.round(s.height||0),f=Math.round(s.availWidth||m),h=Math.round(s.availHeight||g),b=Number.isFinite(window.devicePixelRatio)?window.devicePixelRatio:1;return{surface:r,host:location.hostname,origin:location.origin,isInIframe:e,platform:o,browser:i,os:a,viewportWidth:d,viewportHeight:l,visualViewportWidth:c,visualViewportHeight:p,screenWidth:m,screenHeight:g,availScreenWidth:f,availScreenHeight:h,dpr:b,orientation:Nl()}}function zr(){return xe().surface==="discord"}function Bl(e){if(!e)return null;try{return new URL(e).hostname}catch{return null}}var an=!1,St=new Set;function Ul(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}var he=e=>{let t=Ul();if(t){for(let n of St)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function Fl(){an||(an=!0,window.addEventListener("keydown",he,!0),window.addEventListener("keypress",he,!0),window.addEventListener("keyup",he,!0),document.addEventListener("keydown",he,!0),document.addEventListener("keypress",he,!0),document.addEventListener("keyup",he,!0))}function Vl(){an&&(an=!1,window.removeEventListener("keydown",he,!0),window.removeEventListener("keypress",he,!0),window.removeEventListener("keyup",he,!0),document.removeEventListener("keydown",he,!0),document.removeEventListener("keypress",he,!0),document.removeEventListener("keyup",he,!0))}function zl(e){return St.size===0&&Fl(),St.add(e),()=>{St.delete(e),St.size===0&&Vl()}}function $l(e,t,n,r){let o;switch(e){case"digits":o="0-9";break;case"alpha":o="\\p{L}";break;case"alphanumeric":o="\\p{L}0-9";break;default:return null}return t&&(o+=" "),n&&(o+="\\-"),r&&(o+="_"),new RegExp(`[^${o}]`,"gu")}function Kl(e,t){return t?e.replace(t,""):e}function Jl(e,t=0){if(!t)return e;let n;return((...r)=>{clearTimeout(n),n=setTimeout(()=>e(...r),t)})}function $r(e={}){let{id:t,placeholder:n="",value:r="",mode:o="any",allowSpaces:a=!1,allowDashes:i=!1,allowUnderscore:s=!1,maxLength:u,blockGameKeys:d=!0,debounceMs:l=0,onChange:c,onEnter:p,label:m}=e,g=T("div",{className:"lg-input-wrap"}),f=T("input",{className:"input",id:t,placeholder:n});if(typeof u=="number"&&u>0&&(f.maxLength=u),r&&(f.value=r),m){let E=T("div",{className:"lg-input-label"},m);g.appendChild(E)}g.appendChild(f);let h=$l(o,a,i,s),b=()=>{let E=f.selectionStart??f.value.length,U=f.value.length,q=Kl(f.value,h);if(q!==f.value){f.value=q;let B=U-q.length,_=Math.max(0,E-B);f.setSelectionRange(_,_)}},S=Jl(()=>c?.(f.value),l);f.addEventListener("input",()=>{b(),S()}),f.addEventListener("paste",()=>queueMicrotask(()=>{b(),S()})),f.addEventListener("keydown",E=>{E.key==="Enter"&&p?.(f.value)});let v=d?zl(f):()=>{};function x(){return f.value}function w(E){f.value=E??"",b(),S()}function k(){f.focus()}function L(){f.blur()}function I(E){f.disabled=!!E}function P(){return document.activeElement===f}function O(){v()}return{root:g,input:f,getValue:x,setValue:w,focus:k,blur:L,setDisabled:I,isFocused:P,destroy:O}}function oe(e,t,n){return Math.min(n,Math.max(t,e))}function Tt({h:e,s:t,v:n,a:r}){let o=(e%360+360)%360/60,a=n*t,i=a*(1-Math.abs(o%2-1)),s=0,u=0,d=0;switch(Math.floor(o)){case 0:s=a,u=i;break;case 1:s=i,u=a;break;case 2:u=a,d=i;break;case 3:u=i,d=a;break;case 4:s=i,d=a;break;default:s=a,d=i;break}let c=n-a,p=Math.round((s+c)*255),m=Math.round((u+c)*255),g=Math.round((d+c)*255);return{r:oe(p,0,255),g:oe(m,0,255),b:oe(g,0,255),a:oe(r,0,1)}}function Kr({r:e,g:t,b:n,a:r}){let o=oe(e,0,255)/255,a=oe(t,0,255)/255,i=oe(n,0,255)/255,s=Math.max(o,a,i),u=Math.min(o,a,i),d=s-u,l=0;d!==0&&(s===o?l=60*((a-i)/d%6):s===a?l=60*((i-o)/d+2):l=60*((o-a)/d+4)),l<0&&(l+=360);let c=s===0?0:d/s;return{h:l,s:c,v:s,a:oe(r,0,1)}}function Jn({r:e,g:t,b:n}){let r=o=>oe(Math.round(o),0,255).toString(16).padStart(2,"0");return`#${r(e)}${r(t)}${r(n)}`.toUpperCase()}function ql({r:e,g:t,b:n,a:r}){let o=oe(Math.round(r*255),0,255);return`${Jn({r:e,g:t,b:n,a:r})}${o.toString(16).padStart(2,"0")}`.toUpperCase()}function wt({r:e,g:t,b:n,a:r}){let o=Math.round(r*1e3)/1e3;return`rgba(${e}, ${t}, ${n}, ${o})`}function nt(e){let t=e.trim();if(!t||(t.startsWith("#")&&(t=t.slice(1)),![3,4,6,8].includes(t.length))||!/^[0-9a-fA-F]+$/.test(t))return null;(t.length===3||t.length===4)&&(t=t.split("").map(i=>i+i).join(""));let n=255;t.length===8&&(n=parseInt(t.slice(6,8),16),t=t.slice(0,6));let r=parseInt(t.slice(0,2),16),o=parseInt(t.slice(2,4),16),a=parseInt(t.slice(4,6),16);return{r,g:o,b:a,a:n/255}}function Kn(e){if(!e)return null;let t=e.trim();if(t.startsWith("#"))return nt(t);let n=t.match(/^rgba?\(([^)]+)\)$/i);if(n){let r=n[1].split(",").map(u=>u.trim());if(r.length<3)return null;let o=Number(r[0]),a=Number(r[1]),i=Number(r[2]),s=r[3]!=null?Number(r[3]):1;return[o,a,i,s].some(u=>Number.isNaN(u))?null:{r:o,g:a,b:i,a:s}}return null}function Xl(e,t){let n=Kn(e)??nt(e??"")??{r:244,g:67,b:54,a:1};return typeof t=="number"&&(n.a=oe(t,0,1)),Kr(n)}function Yl(e){return`#${e.trim().replace(/[^0-9a-fA-F#]/g,"").replace(/#/g,"")}`.slice(0,9).toUpperCase()}function Ql(e){let t=e.trim();return t&&(/^rgba?\s*\(/i.test(t)?t=t.replace(/^rgba?/i,"rgba"):(t=t.replace(/^\(?(.*)\)?$/,"$1"),t=`rgba(${t})`),t=t.replace(/\s*\(\s*/,"("),t=t.replace(/\s*\)\s*$/,")"),t=t.replace(/\s*,\s*/g,", "),t)}function je(e){let t=Tt(e),n=Tt({...e,a:1});return{hsva:{...e},hex:Jn(n),hexa:ql(t),rgba:wt(t),alpha:e.a}}function Jr(e={}){let{id:t,label:n="Color",value:r,alpha:o,defaultExpanded:a=!1,detectMobile:i,onInput:s,onChange:u}=e,l=i?i():xe().platform==="mobile",c=Xl(r,o),p=Oe({id:t,className:"color-picker",title:n,padding:l?"md":"lg",variant:"soft",expandable:!l,defaultExpanded:!l&&a});p.classList.add(l?"color-picker--mobile":"color-picker--desktop");let m=p.querySelector(".card-header");m&&m.classList.add("color-picker__header");let g=m?.querySelector(".card-title"),f=T("button",{className:"color-picker__preview",type:"button",title:`Preview ${n}`,"aria-label":`Change ${n}`});g?g.prepend(f):m?m.prepend(f):p.prepend(f);let h=p.querySelector(".card-toggle");!l&&h&&f.addEventListener("click",()=>{p.classList.contains("card--collapsed")&&h.click()});let b=p.querySelector(".card-collapse"),S=null,v=null,x=null,w=null,k=null,L=null,I=null,P=null,O=null,E="hex";function U(N){let G=je(c);N==="input"?s?.(G):u?.(G)}function q(){let N=je(c);if(f.style.setProperty("--cp-preview-color",N.rgba),f.setAttribute("aria-label",`${n}: ${N.hexa}`),!l&&S&&v&&x&&w&&k&&L&&I){let G=Tt({...c,s:1,v:1,a:1}),M=wt(G);S.style.setProperty("--cp-palette-hue",M),v.style.left=`${c.s*100}%`,v.style.top=`${(1-c.v)*100}%`,x.style.setProperty("--cp-alpha-gradient",`linear-gradient(180deg, ${wt({...G,a:1})} 0%, ${wt({...G,a:0})} 100%)`),w.style.top=`${(1-c.a)*100}%`,k.style.setProperty("--cp-hue-color",wt(Tt({...c,v:1,s:1,a:1}))),L.style.left=`${c.h/360*100}%`;let D=c.a===1?N.hex:N.hexa,R=N.rgba,H=E==="hex"?D:R;I!==document.activeElement&&(I.value=H),I.setAttribute("aria-label",`${E.toUpperCase()} code for ${n}`),I.placeholder=E==="hex"?"#RRGGBB or #RRGGBBAA":"rgba(0, 0, 0, 1)",E==="hex"?I.maxLength=9:I.removeAttribute("maxLength"),I.dataset.mode=E,P&&(P.textContent=E.toUpperCase(),P.setAttribute("aria-label",E==="hex"?"Passer en saisie RGBA":"Revenir en saisie HEX"),P.setAttribute("aria-pressed",E==="rgba"?"true":"false"),P.classList.toggle("is-alt",E==="rgba"))}O&&O!==document.activeElement&&(O.value=N.hex)}function B(N,G=null){c={h:(N.h%360+360)%360,s:oe(N.s,0,1),v:oe(N.v,0,1),a:oe(N.a,0,1)},q(),G&&U(G)}function _(N,G=null){B(Kr(N),G)}function j(N,G,M){N.addEventListener("pointerdown",D=>{D.preventDefault();let R=D.pointerId,H=z=>{z.pointerId===R&&G(z)},W=z=>{z.pointerId===R&&(document.removeEventListener("pointermove",H),document.removeEventListener("pointerup",W),document.removeEventListener("pointercancel",W),M?.(z))};G(D),document.addEventListener("pointermove",H),document.addEventListener("pointerup",W),document.addEventListener("pointercancel",W)})}if(!l&&b){let N=b.querySelector(".card-body");if(N){N.classList.add("color-picker__body"),v=T("div",{className:"color-picker__palette-cursor"}),S=T("div",{className:"color-picker__palette"},v),w=T("div",{className:"color-picker__alpha-thumb"}),x=T("div",{className:"color-picker__alpha"},w),L=T("div",{className:"color-picker__hue-thumb"}),k=T("div",{className:"color-picker__hue"},L);let G=T("div",{className:"color-picker__main"},S,x),M=T("div",{className:"color-picker__hue-row"},k),D=$r({blockGameKeys:!0});I=D.input,I.classList.add("color-picker__hex-input"),I.value="",I.maxLength=9,I.spellcheck=!1,I.inputMode="text",I.setAttribute("aria-label",`Hex code for ${n}`),P=T("button",{type:"button",className:"color-picker__mode-btn",textContent:"HEX","aria-pressed":"false","aria-label":"Passer en saisie RGBA"}),D.root.classList.add("color-picker__hex-wrap");let R=T("div",{className:"color-picker__hex-row"},P,D.root);N.replaceChildren(G,M,R),j(S,W=>{if(!S||!v)return;let z=S.getBoundingClientRect(),re=oe((W.clientX-z.left)/z.width,0,1),Vn=oe((W.clientY-z.top)/z.height,0,1);B({...c,s:re,v:1-Vn},"input")},()=>U("change")),j(x,W=>{if(!x)return;let z=x.getBoundingClientRect(),re=oe((W.clientY-z.top)/z.height,0,1);B({...c,a:1-re},"input")},()=>U("change")),j(k,W=>{if(!k)return;let z=k.getBoundingClientRect(),re=oe((W.clientX-z.left)/z.width,0,1);B({...c,h:re*360},"input")},()=>U("change")),P.addEventListener("click",()=>{if(E=E==="hex"?"rgba":"hex",I){let W=je(c);I.value=E==="hex"?c.a===1?W.hex:W.hexa:W.rgba}q(),I?.focus(),I?.select()}),I.addEventListener("input",()=>{if(E==="hex"){let W=Yl(I.value);if(W!==I.value){let z=I.selectionStart??W.length;I.value=W,I.setSelectionRange(z,z)}}});let H=()=>{let W=I.value;if(E==="hex"){let z=nt(W);if(!z){I.value=c.a===1?je(c).hex:je(c).hexa;return}let re=W.startsWith("#")?W.slice(1):W,Vn=re.length===4||re.length===8;z.a=Vn?z.a:c.a,_(z,"change")}else{let z=Ql(W),re=Kn(z);if(!re){I.value=je(c).rgba;return}_(re,"change")}};I.addEventListener("change",H),I.addEventListener("blur",H),I.addEventListener("keydown",W=>{W.key==="Enter"&&(H(),I.blur())})}}return l&&(b&&b.remove(),O=T("input",{className:"color-picker__native",type:"color",value:Jn(Tt({...c,a:1}))}),f.addEventListener("click",()=>O.click()),O.addEventListener("input",()=>{let N=nt(O.value);N&&(N.a=c.a,_(N,"input"),U("change"))}),p.appendChild(O)),q(),{root:p,isMobile:l,getValue:()=>je(c),setValue:(N,G)=>{let M=Kn(N)??nt(N)??nt("#FFFFFF");M&&(typeof G=="number"&&(M.a=G),_(M,null))}}}var Zl=window;function ec(){if(typeof unsafeWindow<"u"&&unsafeWindow)return unsafeWindow;let e=window.wrappedJSObject;return e&&e!==window?e:Zl}var tc=ec(),A=tc;function nc(e){try{return!!e.isSecureContext}catch{return!1}}function qn(e){let t=e?.getRootNode?.();return t&&(t instanceof Document||t.host)?t:document}function qr(){let e=navigator.platform||"",t=navigator.userAgent||"";return/Mac|iPhone|iPad|iPod/i.test(e)||/Mac OS|iOS/i.test(t)}async function oc(){try{let e=await navigator.permissions?.query?.({name:"clipboard-write"});return e?e.state==="granted"||e.state==="prompt":!0}catch{return!0}}function rc(e,t){let n=document.createElement("textarea");return n.value=e,n.setAttribute("readonly","true"),n.style.position="fixed",n.style.opacity="0",n.style.pointerEvents="none",n.style.top="0",t.appendChild?t.appendChild(n):document.body.appendChild(n),n}function ac(e){try{let t=window.getSelection?.();if(!t)return!1;let n=document.createRange();return n.selectNodeContents(e),t.removeAllRanges(),t.addRange(n),!0}catch{return!1}}async function ic(e){if(!("clipboard"in navigator))return{ok:!1,method:"clipboard-write"};if(!nc(A))return{ok:!1,method:"clipboard-write"};if(!await oc())return{ok:!1,method:"clipboard-write"};try{return await navigator.clipboard.writeText(e),{ok:!0,method:"clipboard-write"}}catch{return{ok:!1,method:"clipboard-write"}}}function sc(e,t){try{let n=t||qn(),r=rc(e,n);r.focus(),r.select(),r.setSelectionRange(0,r.value.length);let o=!1;try{o=document.execCommand("copy")}catch{o=!1}return r.remove(),{ok:o,method:"execCommand"}}catch{return{ok:!1,method:"execCommand"}}}function lc(e,t){if(!t)return{ok:!1,method:"selection"};let n=t.textContent??"",r=!1;if(n!==e)try{t.textContent=e,r=!0}catch{}let o=ac(t);r&&setTimeout(()=>{try{t.textContent=n}catch{}},80);let a=qr()?"\u2318C pour copier":"Ctrl+C pour copier";return{ok:o,method:"selection",hint:a}}async function cc(e,t={}){let n=(e??"").toString();if(!n.length)return{ok:!1,method:"noop"};let r=await ic(n);if(r.ok)return r;let o=t.injectionRoot||qn(t.valueNode||void 0),a=sc(n,o);if(a.ok)return a;let i=lc(n,t.valueNode||null);if(i.ok)return i;if(!t.disablePromptFallback)try{return window.prompt(zr()?"Copie manuelle (Discord bloque clipboard):":"Copie manuelle:",n),{ok:!0,method:"prompt"}}catch{}return{ok:!1,method:"noop"}}function Xr(e,t,n={}){let r=o=>{if(n.showTip){n.showTip(o);return}try{e.setAttribute("aria-label",o);let a=document.createElement("div");a.textContent=o,a.style.position="absolute",a.style.top="-28px",a.style.right="0",a.style.padding="4px 8px",a.style.borderRadius="8px",a.style.fontSize="12px",a.style.background="color-mix(in oklab, var(--bg) 85%, transparent)",a.style.border="1px solid var(--border)",a.style.color="var(--fg)",a.style.pointerEvents="none",a.style.opacity="0",a.style.transition="opacity .12s";let i=qn(e);i.appendChild?i.appendChild(a):document.body.appendChild(a);let s=e.getBoundingClientRect();a.style.left=`${s.right-8}px`,a.style.top=`${s.top-28}px`,requestAnimationFrame(()=>a.style.opacity="1"),setTimeout(()=>{a.style.opacity="0",setTimeout(()=>a.remove(),150)},1200)}catch{}};e.addEventListener("click",async o=>{o.stopPropagation();let a=(t()??"").toString(),i=await cc(a,{valueNode:n.valueNode??null,injectionRoot:n.injectionRoot??null,disablePromptFallback:n.disablePromptFallback??!1});n.onResult?.(i),i.ok?i.method==="clipboard-write"||i.method==="execCommand"||i.method==="prompt"?r("Copi\xE9"):i.method==="selection"&&r(i.hint||(qr()?"\u2318C pour copier":"Ctrl+C pour copier")):r("Impossible de copier")})}var Ge={light:{"--bg":"rgba(255,255,255,0.7)","--fg":"#0f172a","--muted":"rgba(15,23,42,0.06)","--soft":"rgba(15,23,42,0.04)","--accent":"#2563eb","--border":"rgba(15,23,42,0.12)","--shadow":"rgba(2,6,23,.2)","--tab-bg":"#ffffff","--tab-fg":"#0f172a","--pill-from":"#4f46e5","--pill-to":"#06b6d4"},dark:{"--bg":"rgba(10,12,18,0.6)","--fg":"#e5e7eb","--muted":"rgba(229,231,235,0.08)","--soft":"rgba(229,231,235,0.05)","--accent":"#60a5fa","--border":"rgba(148,163,184,0.2)","--shadow":"rgba(0,0,0,.45)","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#e5e7eb","--pill-from":"#6366f1","--pill-to":"#06b6d4"},sepia:{"--bg":"rgba(247,242,231,0.72)","--fg":"#3b2f2f","--muted":"rgba(59,47,47,0.06)","--soft":"rgba(59,47,47,0.04)","--accent":"#b07d62","--border":"rgba(59,47,47,0.14)","--shadow":"rgba(0,0,0,.18)","--tab-bg":"#fff","--tab-fg":"#3b2f2f","--pill-from":"#b07d62","--pill-to":"#d4a373"},forest:{"--bg":"rgba(14,24,18,0.62)","--fg":"#e7f5e9","--muted":"rgba(231,245,233,0.08)","--soft":"rgba(231,245,233,0.05)","--accent":"#34d399","--border":"rgba(231,245,233,0.16)","--shadow":"rgba(0,0,0,.5)","--tab-bg":"rgba(255,255,255,0.06)","--tab-fg":"#e7f5e9","--pill-from":"#10b981","--pill-to":"#84cc16"},violet:{"--bg":"rgba(23, 16, 42, 0.68)","--fg":"#f5f3ff","--muted":"rgba(245,243,255,0.08)","--soft":"rgba(245,243,255,0.05)","--accent":"#a855f7","--border":"rgba(216,180,254,0.22)","--shadow":"rgba(12,3,30,.55)","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#ede9fe","--pill-from":"#a855f7","--pill-to":"#f472b6"},ocean:{"--bg":"rgba(10, 34, 46, 0.66)","--fg":"#e0f7ff","--muted":"rgba(224,247,255,0.07)","--soft":"rgba(224,247,255,0.05)","--accent":"#38bdf8","--border":"rgba(125, 211, 252, 0.22)","--shadow":"rgba(0, 16, 32, .52)","--tab-bg":"rgba(56,189,248,0.14)","--tab-fg":"#e0f7ff","--pill-from":"#0ea5e9","--pill-to":"#14b8a6"},ember:{"--bg":"rgba(34,18,10,0.64)","--fg":"#fff7ed","--muted":"rgba(255,247,237,0.08)","--soft":"rgba(255,247,237,0.05)","--accent":"#f97316","--border":"rgba(255, 159, 92, 0.24)","--shadow":"rgba(16,6,2,.52)","--tab-bg":"rgba(255,247,237,0.09)","--tab-fg":"#fff7ed","--pill-from":"#fb923c","--pill-to":"#facc15"}};function Xn(e){let{host:t,themes:n,initialTheme:r,onThemeChange:o}=e,a=r,i=null,s=!1;function u(l){let c=n[l]||n[a]||{};s&&t.classList.add("theme-anim");for(let[p,m]of Object.entries(c))t.style.setProperty(p,m);s?(i!==null&&clearTimeout(i),i=A.setTimeout(()=>{t.classList.remove("theme-anim"),i=null},320)):s=!0,a=l,o?.(l)}function d(){return a}return u(r),{applyTheme:u,getCurrentTheme:d}}var sn={ui:{expandedCards:{style:!1,system:!1}}};async function Yr(){let e=await xt("tab-settings",{version:1,defaults:sn,sanitize:o=>({ui:{expandedCards:Zt(sn.ui.expandedCards,o.ui?.expandedCards)}})});function t(o){let a=e.get();e.update({ui:{...a.ui,...o,expandedCards:Zt(a.ui.expandedCards,o.expandedCards)}})}function n(o,a){let i=e.get();e.update({ui:{...i.ui,expandedCards:{...i.ui.expandedCards,[o]:!!a}}})}function r(o){let a=e.get();n(o,!a.ui.expandedCards[o])}return{get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:r}}function Qr(e){return e.replace(/[_-]+/g," ").replace(/^\w/,t=>t.toUpperCase())}function uc(){return Object.keys(Ge).map(e=>({value:e,label:Qr(e)}))}var dc=["--bg","--fg","--accent","--muted","--soft","--border","--shadow","--tab-bg","--tab-fg","--pill-from","--pill-to"];function pc(e){return Qr(e.replace(/^--/,""))}function mc(e){return e.alpha<1?e.rgba:e.hex}var ln=class extends We{constructor(n){super({id:"tab-settings",label:"Settings"});this.deps=n}async build(n){let r=this.createGrid("12px");r.id="settings",n.appendChild(r);let o;try{o=await Yr()}catch{o={get:()=>sn,set:()=>{},save:()=>{},setUI:()=>{},setCardExpanded:()=>{},toggleCard:()=>{}}}let a=o.get(),i=Object.keys(Ge),s=this.deps.getCurrentTheme?.()??this.deps.initialTheme,u=i.includes(s)?s:i[0]??"dark",d=u,l=on({text:"Theme",tone:"muted",size:"lg"}),c=tt({options:uc(),value:u,onChange:f=>{d=f,this.deps.applyTheme(f),this.renderThemePickers(f,p,d)}}),p=T("div",{className:"settings-theme-grid"}),m=Oe({title:"Style",padding:"lg",expandable:!0,defaultExpanded:!!a.ui.expandedCards.style,onExpandChange:f=>o.setCardExpanded("style",f)},T("div",{className:"kv settings-theme-row"},l.root,c.root),p);this.renderThemePickers(u,p,d);let g=this.createEnvCard({defaultExpanded:!!a.ui.expandedCards.system,onExpandChange:f=>o.setCardExpanded("system",f)});r.appendChild(m),r.appendChild(g)}renderThemePickers(n,r,o){let a=Ge[n];if(r.replaceChildren(),!!a)for(let i of dc){let s=a[i];if(s==null)continue;let u=Jr({label:pc(i),value:s,defaultExpanded:!1,onInput:d=>this.updateThemeVar(n,i,d,o),onChange:d=>this.updateThemeVar(n,i,d,o)});r.appendChild(u.root)}}updateThemeVar(n,r,o,a){let i=Ge[n];i&&(i[r]=mc(o),a===n&&this.deps.applyTheme(n))}createEnvCard(n){let r=n?.defaultExpanded??!1,o=n?.onExpandChange,a=(b,S)=>{let v=T("div",{className:"kv kv--inline-mobile"}),x=T("label",{},b),w=T("div",{className:"ro"});return typeof S=="string"?w.textContent=S:w.append(S),v.append(x,w),v},i=T("code",{},"\u2014"),s=T("span",{},"\u2014"),u=T("span",{},"\u2014"),d=T("span",{},"\u2014"),l=T("span",{},"\u2014"),c=T("span",{},"\u2014"),p=()=>{let b=xe();u.textContent=b.surface,d.textContent=b.platform,l.textContent=b.browser??"Unknown",c.textContent=b.os??"Unknown",i.textContent=b.host,s.textContent=b.isInIframe?"Yes":"No"},m=De({label:"Copy JSON",variant:"primary",size:"sm"});Xr(m,()=>{let b=xe();return JSON.stringify(b,null,2)});let g=T("div",{style:"width:100%;display:flex;justify-content:center;"},m),f=Oe({title:"System",variant:"soft",padding:"lg",footer:g,expandable:!0,defaultExpanded:r,onExpandChange:o},a("Surface",u),a("Platform",d),a("Browser",l),a("OS",c),a("Host",i),a("Iframe",s)),h=()=>{document.hidden||p()};return document.addEventListener("visibilitychange",h),p(),this.addCleanup(()=>document.removeEventListener("visibilitychange",h)),f}};function kt(e){return e<10?`0${e}`:String(e)}function ue(e){let t=/^(\d{1,2}):(\d{2})$/.exec((e||"").trim());if(!t)return 0;let n=Math.max(0,Math.min(23,parseInt(t[1],10)||0)),r=Math.max(0,Math.min(59,parseInt(t[2],10)||0));return n*60+r}function Yn(e){let t=Math.max(0,Math.min(1439,e|0)),n=Math.floor(t/60),r=t%60;return`${kt(n)}:${kt(r)}`}function Ce(e,t){let n=ue(e),r=Math.max(0,Math.min(1439,n)),o=Math.floor(r/t)*t;return Yn(o)}function gc(e){let t=Math.floor(e/60),n=e%60,r=t>=12;return{h12:t%12||12,m:n,pm:r}}function fc(e,t,n){return(e%12+(n?12:0))*60+t}function bc(e){return e.platform==="mobile"||e.os==="ios"||e.os==="android"}function Zr(e={}){let{id:t,start:n="08:00",end:r="23:00",stepMinutes:o=5,disabled:a=!1,allowOvernight:i=!0,labels:s={from:"From",to:"To"},picker:u="auto",format:d="auto",useNativeOn:l,onChange:c}=e,p={start:Ce(n,o),end:Ce(r,o)},m=T("div",{className:"time-range",id:t});m.classList.add("time-range--stacked");let g=xe();if(u==="native"||u==="auto"&&(l?.(g)??bc(g)))return h();return b();function h(){let x=T("div",{className:"time-range-field",role:"group"}),w=T("span",{className:"time-range-label"},s.from||"From"),k=T("input",{className:"input time-range-input",type:"time",step:String(o*60),value:p.start}),L=T("div",{className:"time-range-field",role:"group"}),I=T("span",{className:"time-range-label"},s.to||"To"),P=T("input",{className:"input time-range-input",type:"time",step:String(o*60),value:p.end});x.append(w,k),L.append(I,P),m.append(x,L);function O(){k.value=p.start,P.value=p.end}function E(){c?.(q())}function U(N){let G=N.target,M=G===k,D=Ce(G.value||(M?p.start:p.end),o);M?(p.start=D,!i&&ue(p.end)<ue(p.start)&&(p.end=p.start)):(p.end=D,!i&&ue(p.end)<ue(p.start)&&(p.start=p.end)),O(),E()}k.addEventListener("change",U),k.addEventListener("blur",U),P.addEventListener("change",U),P.addEventListener("blur",U),a&&_(!0);function q(){return{...p}}function B(N){if(N.start&&(p.start=Ce(N.start,o)),N.end&&(p.end=Ce(N.end,o)),!i){let G=ue(p.start);ue(p.end)<G&&(p.end=p.start)}O(),E()}function _(N){k.disabled=N,P.disabled=N,m.classList.toggle("is-disabled",!!N)}function j(){k.removeEventListener("change",U),k.removeEventListener("blur",U),P.removeEventListener("change",U),P.removeEventListener("blur",U),m.replaceChildren()}return{root:m,getValue:q,setValue:B,setDisabled:_,destroy:j}}function b(){let x=T("label",{className:"time-range-field"}),w=T("span",{className:"time-range-label"},s.from||"From"),k=T("label",{className:"time-range-field"}),L=T("span",{className:"time-range-label"},s.to||"To"),I=d==="12h"||d==="auto"&&v(),P=S(p.start,I),O=S(p.end,I);x.append(w,P.container),k.append(L,O.container),m.append(x,k),a&&B(!0),q(),P.onAnyChange(()=>{p.start=P.to24h(o),!i&&ue(p.end)<ue(p.start)&&(p.end=p.start,O.setFrom24h(p.end)),c?.(E())}),O.onAnyChange(()=>{p.end=O.to24h(o),!i&&ue(p.end)<ue(p.start)&&(p.start=p.end,P.setFrom24h(p.start)),c?.(E())});function E(){return{...p}}function U(j){if(j.start&&(p.start=Ce(j.start,o)),j.end&&(p.end=Ce(j.end,o)),!i){let N=ue(p.start);ue(p.end)<N&&(p.end=p.start)}q(),c?.(E())}function q(){P.setFrom24h(p.start),O.setFrom24h(p.end)}function B(j){P.setDisabled(j),O.setDisabled(j),m.classList.toggle("is-disabled",!!j)}function _(){P.destroy(),O.destroy(),m.replaceChildren()}return{root:m,getValue:E,setValue:U,setDisabled:B,destroy:_}}function S(x,w){let k=T("div",{className:"time-picker"}),L=(R,H=2)=>{R.classList.add("time-picker-compact"),R.style.setProperty("--min-ch",String(H))},I=w?Array.from({length:12},(R,H)=>{let W=H+1;return{value:String(W),label:kt(W)}}):Array.from({length:24},(R,H)=>({value:String(H),label:kt(H)})),P=tt({size:"sm",options:I,placeholder:"HH",onChange:()=>j()});L(P.root,2);let O=Math.max(1,Math.min(30,Math.floor(e.stepMinutes??5))),E=Array.from({length:Math.floor(60/O)},(R,H)=>{let W=H*O;return{value:String(W),label:kt(W)}}),U=tt({size:"sm",options:E,placeholder:"MM",onChange:()=>j()});L(U.root,2);let q=w?tt({size:"sm",options:[{value:"am",label:"AM"},{value:"pm",label:"PM"}],value:"am",onChange:()=>j()}):null;q&&L(q.root,3),k.append(P.root,U.root,...q?[q.root]:[]);let B=null;function _(R){B=R}function j(){B?.()}function N(R){let H=ue(R);if(w){let W=gc(H);P.setValue(String(W.h12),{notify:!1}),U.setValue(String(Math.floor(W.m/O)*O),{notify:!1}),q.setValue(W.pm?"pm":"am",{notify:!1})}else{let W=Math.floor(H/60),z=H%60;P.setValue(String(W),{notify:!1}),U.setValue(String(Math.floor(z/O)*O),{notify:!1})}}function G(R){let H=parseInt(U.getValue()||"0",10)||0;if(w){let W=parseInt(P.getValue()||"12",10)||12,z=(q?.getValue()||"am")==="pm",re=fc(W,H,z);return Ce(Yn(re),R)}else{let z=(parseInt(P.getValue()||"0",10)||0)*60+H;return Ce(Yn(z),R)}}function M(R){P.setDisabled(R),U.setDisabled(R),q?.setDisabled(R),k.classList.toggle("is-disabled",!!R)}function D(){k.replaceChildren()}return{container:k,onAnyChange:_,setFrom24h:N,to24h:G,setDisabled:M,destroy:D}}function v(){try{let w=new Intl.DateTimeFormat(void 0,{hour:"numeric"}).format(new Date(2020,1,1,13));return/AM|PM|am|pm/.test(w)}catch{return!1}}}function ta(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function hc(e){let t=ta(e);t=t.replace(/\/\*[\s\S]*?\*\//g,o=>`<span class="tok tok-comm">${o}</span>`),t=t.replace(/(^|\s)(\/\/.*)$/gm,(o,a,i)=>`${a}<span class="tok tok-comm">${i}</span>`),t=t.replace(/`[^`\\]*(?:\\.[^`\\]*)*`/g,o=>`<span class="tok tok-str">${o}</span>`),t=t.replace(/'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/g,o=>`<span class="tok tok-str">${o}</span>`),t=t.replace(/\b(?:0[xX][0-9a-fA-F]+|0[bB][01]+|0[oO][0-7]+|\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?(?:[eE][+-]?\d+)?)\b/g,o=>`<span class="tok tok-num">${o}</span>`);let n=["break","case","catch","class","const","continue","debugger","default","delete","do","else","export","extends","finally","for","function","if","import","in","instanceof","let","new","return","super","switch","this","throw","try","typeof","var","void","while","with","yield","await","enum","implements","interface","package","private","protected","public","static","as","from","of"],r=new RegExp(`\\b(?:${n.join("|")})\\b`,"g");return t=t.replace(r,o=>`<span class="tok tok-kw">${o}</span>`),t=t.replace(/\b(?:true|false|null|undefined|NaN|Infinity)\b/g,o=>`<span class="tok tok-lit">${o}</span>`),t}function ea(e){if(!e)return new Date().toLocaleTimeString();let t=e instanceof Date?e:new Date(e);if(isNaN(t.getTime()))return String(e);let n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0"),o=String(t.getSeconds()).padStart(2,"0");return`${n}:${r}:${o}`}function na(e={}){let{id:t,className:n,height:r,maxLines:o=500,wrap:a=!1,mode:i="plain",showTimestamps:s=!0,autoScroll:u=!0}=e,d=T("div",{className:"log",id:t});n&&d.classList.add(...n.split(" ").filter(Boolean)),a&&d.classList.add("log--wrap");let l=T("div",{className:"log-viewport"}),c=T("div",{className:"log-lines"});l.appendChild(c),d.appendChild(l),r!=null&&(d.style.blockSize=typeof r=="number"?`${r}px`:String(r));let p=i,m=o,g=new Map;function f(_){return p==="js"?hc(_):ta(_)}function h(_){return _?g.get(_)?.body??c:c}function b(_){let j=typeof _=="string"?{text:_}:_||{text:""},N=h(j.groupKey);if(j.key){let D=Array.from(N.querySelectorAll(`.log-line[data-key="${j.key}"]`)).pop();if(D){j.level&&(D.classList.remove("log-level--debug","log-level--info","log-level--warn","log-level--error"),D.classList.add(`log-level--${j.level}`));let R=D.querySelector(".log-time");s&&R&&(R.textContent=ea(j.time));let H=D.querySelector(".log-text");H&&(H.innerHTML=f(j.text)),u&&L();return}}let G=document.createElement("div");if(G.className="log-line",j.level&&G.classList.add(`log-level--${j.level}`),j.key&&(G.dataset.key=j.key),s){let D=document.createElement("span");D.className="log-time",D.textContent=ea(j.time),G.appendChild(D)}let M=document.createElement("span");M.className="log-text",M.innerHTML=f(j.text),G.appendChild(M),N.appendChild(G),O(),u&&L()}function S(_){for(let j of _)b(j)}function v(){c.replaceChildren(),g.clear()}function x(_){p=_,L()}function w(_){d.classList.toggle("log--wrap",!!_),L()}function k(_){m=Math.max(1,Math.floor(_||1))}function L(){requestAnimationFrame(()=>{l.scrollTop=l.scrollHeight})}function I(){let _=0;for(let j=0;j<c.children.length;j+=1){let N=c.children[j];(N.classList.contains("log-line")||N.classList.contains("log-group"))&&(_+=1)}return _}function P(){let _=c.firstElementChild;if(!_)return!1;if(_.classList.contains("log-group")){let j=_.dataset.groupKey;j&&g.delete(j)}return _.remove(),!0}function O(){let _=I();for(;_>m&&P();)_--}function E(_,j){let N=j?.key||`g-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,6)}`;if(g.has(N))return N;let G=document.createElement("div");G.className="log-group",G.dataset.groupKey=N;let M=document.createElement("div");M.className="log-group-header",M.textContent=_;let D=document.createElement("div");D.className="log-group-body",G.append(M,D),c.appendChild(G),g.set(N,{root:G,header:M,body:D});let R=H=>{G.classList.toggle("is-collapsed",!!H)};return j?.collapsed&&R(!0),M.addEventListener("click",()=>R(!G.classList.contains("is-collapsed"))),u&&L(),N}function U(_){g.get(_)}function q(_,j){let N=g.get(_);N&&(j==null?N.root.classList.toggle("is-collapsed"):N.root.classList.toggle("is-collapsed",!!j))}let B=d;return B.add=b,B.addMany=S,B.clear=v,B.setMode=x,B.setWrap=w,B.setMaxLines=k,B.scrollToEnd=L,B.beginGroup=E,B.endGroup=U,B.toggleGroup=q,B}var de={nativeCtor:null,captured:[],latestOpen:null},oa=Symbol.for("ariesmod.ws.capture.wrapped"),ra=Symbol.for("ariesmod.ws.capture.native"),aa=1;function Qn(e){return!!e&&e.readyState===aa}function yc(){if(Qn(de.latestOpen))return de.latestOpen;for(let e=de.captured.length-1;e>=0;e--){let t=de.captured[e];if(Qn(t))return t}return null}function xc(e,t){de.captured.push(e),de.captured.length>25&&de.captured.splice(0,de.captured.length-25);let n=()=>{de.latestOpen=e,t&&console.log("[WS] captured socket opened",e.url)};e.addEventListener("open",n),e.addEventListener("close",()=>{de.latestOpen===e&&(de.latestOpen=null),t&&console.log("[WS] captured socket closed",e.url)}),e.readyState===aa&&n()}function ia(e=A,t={}){let n=!!t.debug,r=e?.WebSocket;if(typeof r!="function")return()=>{};if(r[oa])return de.nativeCtor=r[ra]??de.nativeCtor??null,()=>{};let o=r;de.nativeCtor=o;function a(i,s){let u=s!==void 0?new o(i,s):new o(i);try{xc(u,n)}catch{}return u}try{a.prototype=o.prototype}catch{}try{Object.setPrototypeOf(a,o)}catch{}try{a.CONNECTING=o.CONNECTING,a.OPEN=o.OPEN,a.CLOSING=o.CLOSING,a.CLOSED=o.CLOSED}catch{}a[oa]=!0,a[ra]=o;try{e.WebSocket=a,n&&console.log("[WS] WebSocket capture installed")}catch{return()=>{}}return()=>{try{e.WebSocket===a&&(e.WebSocket=o)}catch{}}}function vc(e=A){let t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function Pt(e=A){let t=yc();if(t)return{ws:t,source:"captured"};let n=vc(e);return n?{ws:n,source:"roomConnection"}:{ws:null,source:null}}function cn(e,t={}){let n=t.pageWindow??A,r=t.intervalMs??500,o=!!t.debug,a=null,i=null,s=()=>{let d=Pt(n);(d.ws!==a||d.source!==i)&&(a=d.ws,i=d.source,o&&console.log("[WS] best socket changed:",d.source,d.ws),e(d))};s();let u=setInterval(s,r);return()=>clearInterval(u)}function Sc(e){if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return null}}function wc(e,t=A){let n=t?.MagicCircle_RoomConnection;if(n&&typeof n.sendMessage=="function")try{return Array.isArray(e)?n.sendMessage(...e):n.sendMessage(e),{ok:!0}}catch(a){return{ok:!1,reason:"error",error:a}}let{ws:r}=Pt(t);if(!r)return{ok:!1,reason:"no-ws"};if(!Qn(r))return{ok:!1,reason:"not-open"};let o=Sc(e);if(o==null)return{ok:!1,reason:"error",error:new Error("Cannot stringify message")};try{return r.send(o),{ok:!0}}catch(a){return{ok:!1,reason:"error",error:a}}}function sa(e,t={},n=A){return wc({type:e,...t},n)}var Te={Welcome:"Welcome",PartialState:"PartialState",ServerErrorMessage:"ServerErrorMessage",Config:"Config",InappropriateContentRejected:"InappropriateContentRejected",Emote:"Emote",CurrencyTransaction:"CurrencyTransaction",Pong:"Pong"},C={Chat:"Chat",Emote:"Emote",Wish:"Wish",KickPlayer:"KickPlayer",SetPlayerData:"SetPlayerData",UsurpHost:"UsurpHost",Dev:"Dev",SetSelectedGame:"SetSelectedGame",VoteForGame:"VoteForGame",RequestGame:"RequestGame",RestartGame:"RestartGame",Ping:"Ping",PlayerPosition:"PlayerPosition",Teleport:"Teleport",CheckWeatherStatus:"CheckWeatherStatus",MoveInventoryItem:"MoveInventoryItem",DropObject:"DropObject",PickupObject:"PickupObject",ToggleFavoriteItem:"ToggleFavoriteItem",PutItemInStorage:"PutItemInStorage",RetrieveItemFromStorage:"RetrieveItemFromStorage",MoveStorageItem:"MoveStorageItem",LogItems:"LogItems",PlantSeed:"PlantSeed",WaterPlant:"WaterPlant",HarvestCrop:"HarvestCrop",SellAllCrops:"SellAllCrops",PurchaseSeed:"PurchaseSeed",PurchaseEgg:"PurchaseEgg",PurchaseTool:"PurchaseTool",PurchaseDecor:"PurchaseDecor",PlantEgg:"PlantEgg",HatchEgg:"HatchEgg",PlantGardenPlant:"PlantGardenPlant",PotPlant:"PotPlant",MutationPotion:"MutationPotion",PickupDecor:"PickupDecor",PlaceDecor:"PlaceDecor",RemoveGardenObject:"RemoveGardenObject",PlacePet:"PlacePet",FeedPet:"FeedPet",PetPositions:"PetPositions",SwapPet:"SwapPet",StorePet:"StorePet",NamePet:"NamePet",SellPet:"SellPet",ReportSpeakingStart:"ReportSpeakingStart"};var ey=new Set(Object.values(Te)),ty=new Set(Object.values(C));function K(e,t={},n=A){return sa(e,t,n)}function un(e,t=A){return K(C.Chat,{scopePath:["Room"],message:e},t)}function la(e,t=A){return K(C.Emote,{scopePath:["Room"],emoteType:e},t)}function ca(e,t=A){return K(C.Wish,{wish:e},t)}function ua(e,t=A){return K(C.KickPlayer,{scopePath:["Room"],playerId:e},t)}function da(e,t=A){return K(C.SetPlayerData,{scopePath:["Room"],data:e},t)}function pa(e=A){return K(C.UsurpHost,{},e)}function ma(e=A){return K(C.ReportSpeakingStart,{},e)}function ga(e,t=A){return K(C.SetSelectedGame,{scopePath:["Room"],gameId:e},t)}function fa(e,t=A){return K(C.VoteForGame,{scopePath:["Room"],gameId:e},t)}function ba(e,t=A){return K(C.RequestGame,{scopePath:["Room"],gameId:e},t)}function ha(e=A){return K(C.RestartGame,{scopePath:["Room"]},e)}function ya(e,t=A){return K(C.Ping,{id:e},t)}function Zn(e,t,n=A){return K(C.PlayerPosition,{x:e,y:t},n)}var xa=Zn;function va(e,t,n=A){return K(C.Teleport,{x:e,y:t},n)}function Sa(e=A){return K(C.CheckWeatherStatus,{},e)}function wa(e,t,n=A){return K(C.MoveInventoryItem,{fromIndex:e,toIndex:t},n)}function Ta(e,t=A){return K(C.DropObject,{slotIndex:e},t)}function ka(e,t=A){return K(C.PickupObject,{objectId:e},t)}function Pa(e,t,n=A){return K(C.ToggleFavoriteItem,{itemId:e,favorite:t},n)}function Aa(e,t=A){return K(C.PutItemInStorage,{itemId:e},t)}function Ca(e,t=A){return K(C.RetrieveItemFromStorage,{itemId:e},t)}function Ma(e,t,n=A){return K(C.MoveStorageItem,{fromIndex:e,toIndex:t},n)}function Ia(e=A){return K(C.LogItems,{},e)}function Ea(e,t,n,r=A){return K(C.PlantSeed,{seedId:e,x:t,y:n},r)}function La(e,t=A){return K(C.WaterPlant,{plantId:e},t)}function Ra(e,t=A){return K(C.HarvestCrop,{cropId:e},t)}function Oa(e=A){return K(C.SellAllCrops,{},e)}function Da(e,t=A){return K(C.PurchaseDecor,{decorId:e},t)}function Ga(e,t=A){return K(C.PurchaseEgg,{eggId:e},t)}function Ha(e,t=A){return K(C.PurchaseTool,{toolId:e},t)}function Na(e,t=A){return K(C.PurchaseSeed,{seedId:e},t)}function _a(e,t,n,r=A){return K(C.PlantEgg,{eggId:e,x:t,y:n},r)}function Wa(e,t=A){return K(C.HatchEgg,{eggId:e},t)}function ja(e,t,n,r=A){return K(C.PlantGardenPlant,{plantId:e,x:t,y:n},r)}function Ba(e,t,n=A){return K(C.PotPlant,{plantId:e,potId:t},n)}function Ua(e,t,n=A){return K(C.MutationPotion,{potionId:e,targetId:t},n)}function Fa(e,t=A){return K(C.PickupDecor,{decorInstanceId:e},t)}function Va(e,t,n,r=A){return K(C.PlaceDecor,{decorId:e,x:t,y:n},r)}function za(e,t=A){return K(C.RemoveGardenObject,{objectId:e},t)}function $a(e,t,n,r=A){return K(C.PlacePet,{petId:e,x:t,y:n},r)}function Ka(e,t,n=A){return K(C.FeedPet,{petId:e,foodItemId:t},n)}function Ja(e,t=A){return K(C.PetPositions,{positions:e},t)}function qa(e,t,n=A){return K(C.SwapPet,{petIdA:e,petIdB:t},n)}function Xa(e,t=A){return K(C.StorePet,{petId:e},t)}function Ya(e,t,n=A){return K(C.NamePet,{petId:e,name:t},n)}function Qa(e,t=A){return K(C.SellPet,{petId:e},t)}var Be={timeRange:{start:"09:00",end:"18:00"},logSettings:{mode:"js",wrap:!1}};async function ei(){return xt("tab-test",{version:1,defaults:Be,sanitize:e=>({timeRange:{start:e.timeRange?.start||Be.timeRange.start,end:e.timeRange?.end||Be.timeRange.end},logSettings:{mode:e.logSettings?.mode||Be.logSettings.mode,wrap:e.logSettings?.wrap??Be.logSettings.wrap}})})}var dn=class extends We{constructor(){super({id:"tab-test",label:"Test"})}async build(t){let n=this.createContainer("test-section");t.appendChild(n);let r;try{r=await ei()}catch{r={get:()=>Be,set:()=>{},update:()=>{},save:()=>{}}}let o=r.get(),a=on({text:"Plage horaire",hint:"Heures actives du mode 'Plage horaire'.",icon:"\u23F0"}),i=Zr({start:o.timeRange.start,end:o.timeRange.end,stepMinutes:5,allowOvernight:!0,picker:"auto",format:"12h",onChange:h=>{r.update({timeRange:{start:h.start,end:h.end}})}}),s=T("div",null,a.root,i.root),u=na({height:220,mode:o.logSettings.mode,maxLines:1e3});o.logSettings.wrap&&u.setWrap(!0),u.add({level:"info",text:"Log initialise"}),u.add({level:"debug",text:"const x = 42; // demo"}),u.add({level:"warn",text:"Requete lente: fetch('/api') > 1200ms"}),u.add({level:"error",text:"new Error('Boom')"});let d=De({label:"Appliquer",variant:"primary",onClick:()=>{let h=i.getValue();u.add({level:"info",text:`[Apply] ${h.start} -> ${h.end}`})}}),l=Oe({title:"Parametres - Plage horaire",subtitle:"Choisis la fenetre d'activite",variant:"soft",padding:"lg",footer:$n(d)},s),c=De({label:"Clear",onClick:()=>un("test")}),p=De({label:o.logSettings.wrap?"Unwrap":"Wrap",onClick:()=>{let h=!u.classList.contains("log--wrap");u.setWrap(h),p.setLabel(h?"Unwrap":"Wrap"),r.update({logSettings:{...r.get().logSettings,wrap:h}})}}),m=De({label:`Mode: ${o.logSettings.mode}`,onClick:()=>{let b=r.get().logSettings.mode==="js"?"plain":"js";u.setMode(b),m.setLabel(`Mode: ${b}`),r.update({logSettings:{...r.get().logSettings,mode:b}})}}),g=De({label:"Add line",onClick:()=>u.add({level:"debug",text:"function tick(){ return Date.now(); } // sample"})}),f=Oe({title:"Logs",variant:"default",padding:"lg"},u,$n(c,p,m,g));n.appendChild(l),n.appendChild(f)}};function eo(e){return[new ln(e),new dn]}function to(e){let{shadow:t,initialOpen:n}=e,r=T("div",{className:"gemini-panel",id:"panel",ariaHidden:String(!n)}),o=T("div",{className:"gemini-tabbar"}),a=T("div",{className:"gemini-content",id:"content"}),i=T("div",{className:"gemini-resizer",title:"Resize"}),s=T("button",{className:"gemini-close",title:"Fermer",ariaLabel:"Fermer"},"\u2715");r.append(o,a,i);let u=T("div",{className:"gemini-wrapper"},r);return t.append(u),{panel:r,tabbar:o,content:a,resizer:i,closeButton:s,wrapper:u}}function no(e){let{resizer:t,host:n,panel:r,shadow:o,onWidthChange:a,initialWidth:i,minWidth:s,maxWidth:u}=e,d=s,l=u;function c(){let w=xe(),k=Math.round(A.visualViewport?.width??A.innerWidth??0);if(w.platform==="mobile"||w.os==="ios"||w.os==="android"){let L=getComputedStyle(o.host),I=parseFloat(L.getPropertyValue("--inset-l"))||0,P=parseFloat(L.getPropertyValue("--inset-r"))||0,O=Math.max(280,k-Math.round(I+P)),E=Math.min(420,Math.max(300,Math.floor(k*.66))),U=O;d=Math.min(E,O),l=U}else d=s,l=u;return{min:d,max:l}}function p(w){return Math.max(d,Math.min(l,Number(w)||i))}function m(w){let k=p(w);n.style.setProperty("--w",`${k}px`),a(k)}c();let g=xe(),f=!(g.platform==="mobile"||g.os==="ios"||g.os==="android"),h=!1,b=w=>{if(!h)return;w.preventDefault();let k=Math.round(A.innerWidth-w.clientX);m(k)},S=()=>{h&&(h=!1,document.body.style.cursor="",A.removeEventListener("mousemove",b),A.removeEventListener("mouseup",S))},v=w=>{f&&(w.preventDefault(),h=!0,document.body.style.cursor="ew-resize",A.addEventListener("mousemove",b),A.addEventListener("mouseup",S))};t.addEventListener("mousedown",v);function x(){t.removeEventListener("mousedown",v),A.removeEventListener("mousemove",b),A.removeEventListener("mouseup",S)}return{calculateResponsiveBounds:c,constrainWidthToLimits:p,setHudWidth:m,destroy:x}}function oo(e){let{panel:t,onToggle:n,onClose:r,toggleCombo:o=u=>u.ctrlKey&&u.shiftKey&&u.key.toLowerCase()==="u",closeOnEscape:a=!0}=e;function i(u){let d=t.classList.contains("open");if(a&&u.key==="Escape"&&d){r();return}o(u)&&(u.preventDefault(),u.stopPropagation(),n())}document.addEventListener("keydown",i,{capture:!0});function s(){document.removeEventListener("keydown",i,{capture:!0})}return{destroy:s}}var ti=`
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
`;var ro=`
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
`;var ao=`
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
`;var io=`
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
`;function te(e,t,n){if(e.querySelector(`style[data-style-id="${n}"]`))return;let r=document.createElement("style");r.setAttribute("data-style-id",n),r.textContent=t,e.appendChild(r)}var ni=`
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
  
`;var oi=`
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
`;var ri=`
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
`;var ai=`
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
`;var ii=`
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
`;var si=`
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
`;var li=`
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
`;var ci=`
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
`;var ui=`
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
`;var di=`
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
`;var pi=`
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
`;var mi=`
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
`;var gi=`
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
`;var fi=`
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
`;var bi=`
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
`;var hi=`
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
`;var yi=`
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
`;var Tc={all:"initial",position:"fixed",top:"0",right:"0",zIndex:"2147483647",pointerEvents:"auto",fontFamily:'system-ui, -apple-system, "Segoe UI", Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',fontSize:"13px",lineHeight:"1.35"};function kc(e="gemini-root"){let t=document.createElement("div");t.id=e,Object.assign(t.style,Tc),(document.body||document.documentElement).appendChild(t);let n=t.attachShadow({mode:"open"});return{host:t,shadow:n}}function so(e){let{hostId:t="gemini-hud-root",initialWidth:n,initialOpen:r,onWidthChange:o,onOpenChange:a,themes:i,initialTheme:s,onThemeChange:u,buildSections:d,initialTab:l,onTabChange:c,toggleCombo:p=M=>M.ctrlKey&&M.shiftKey&&M.key.toLowerCase()==="u",closeOnEscape:m=!0,minWidth:g=420,maxWidth:f=720}=e,{host:h,shadow:b}=kc(t);te(b,ro,"variables"),te(b,ao,"primitives"),te(b,io,"utilities"),te(b,ti,"hud"),te(b,ni,"card"),te(b,oi,"badge"),te(b,ri,"button"),te(b,ai,"input"),te(b,ii,"label"),te(b,si,"navTabs"),te(b,li,"searchBar"),te(b,ci,"select"),te(b,ui,"switch"),te(b,di,"table"),te(b,pi,"timeRangePicker"),te(b,mi,"tooltip"),te(b,gi,"slider"),te(b,fi,"reorderableList"),te(b,bi,"colorPicker"),te(b,hi,"log"),te(b,yi,"settings");let{panel:S,tabbar:v,content:x,resizer:w,closeButton:k,wrapper:L}=to({shadow:b,initialOpen:r});function I(M){S.dispatchEvent(new CustomEvent("gemini:hud-open-change",{detail:{isOpen:M},bubbles:!0})),a?.(M)}function P(M){let D=S.classList.contains("open");S.classList.toggle("open",M),S.setAttribute("aria-hidden",M?"false":"true"),M!==D&&I(M)}P(r),k.addEventListener("click",M=>{M.preventDefault(),M.stopPropagation(),P(!1)});let O=Xn({host:h,themes:i,initialTheme:s,onThemeChange:u}),E=no({resizer:w,host:h,panel:S,shadow:b,onWidthChange:o||(()=>{}),initialWidth:n,minWidth:g,maxWidth:f});E.setHudWidth(n);let U=d({applyTheme:O.applyTheme,initialTheme:s,getCurrentTheme:O.getCurrentTheme,setHUDWidth:E.setHudWidth,setHUDOpen:P}),q=new ht(U,x,{applyTheme:O.applyTheme,getCurrentTheme:O.getCurrentTheme}),B=U.map(M=>({id:M.id,label:M.label})),_=Wr(B,l||B[0]?.id||"",M=>{q.activate(M),c?.(M)});_.root.style.flex="1 1 auto",_.root.style.minWidth="0",v.append(_.root,k),q.activate(l||B[0]?.id||"");let j=oo({panel:S,onToggle:()=>P(!S.classList.contains("open")),onClose:()=>P(!1),toggleCombo:p,closeOnEscape:m}),N=()=>{_.recalc();let M=parseInt(getComputedStyle(h).getPropertyValue("--w"))||n;E.calculateResponsiveBounds(),E.setHudWidth(M)};A.addEventListener("resize",N);function G(){j.destroy(),E.destroy(),A.removeEventListener("resize",N)}return{host:h,shadow:b,wrapper:L,panel:S,content:x,setOpen:P,setWidth:E.setHudWidth,sections:U,manager:q,nav:_,destroy:G}}var ot={isOpen:"gemini.hud.isOpen",width:"gemini.hud.width",theme:"gemini.hud.theme",activeTab:"gemini.hud.activeTab"},At={isOpen:!1,width:480,theme:"dark",activeTab:"tab-settings"};function lo(){return{isOpen:Re(ot.isOpen,At.isOpen),width:Re(ot.width,At.width),theme:Re(ot.theme,At.theme),activeTab:Re(ot.activeTab,At.activeTab)}}function rt(e,t){yt(ot[e],t)}var Pc="https://i.imgur.com/IMkhMur.png",Ac="Stats";function pn(e){let t=e.iconUrl||Pc,n=e.ariaLabel||"Open MGH",r=null,o=null,a=null,i=!1,s=null,u=null,d=["Chat","Leaderboard","Stats","Open Activity Log"],l=v=>{try{return typeof CSS<"u"&&CSS&&typeof CSS.escape=="function"?CSS.escape(v):v.replace(/"/g,'\\"')}catch{return v}};function c(){let v=document.querySelector(d.map(w=>`button[aria-label="${l(w)}"]`).join(","));if(!v)return null;let x=v.parentElement;for(;x&&x!==document.body;){if(d.reduce((k,L)=>k+x.querySelectorAll(`button[aria-label="${l(L)}"]`).length,0)>=2)return x;x=x.parentElement}return null}function p(v){return v}function m(v){let x=Array.from(v.querySelectorAll("button[aria-label]"));if(!x.length)return{refBtn:null,refWrapper:null};let w=x.filter(U=>U.dataset.mghBtn!=="true"&&(U.getAttribute("aria-label")||"")!==(e.ariaLabel||"Open MGH")),k=w.length?w:x,L=k.find(U=>(U.getAttribute("aria-label")||"").toLowerCase()===Ac.toLowerCase())||null,I=k.length>=2?k.length-2:k.length-1,P=L||k[I],O=P.parentElement,E=O&&O.parentElement===v&&O.tagName==="DIV"?O:null;return{refBtn:P,refWrapper:E}}function g(v,x,w){let k=v.cloneNode(!1);k.type="button",k.setAttribute("aria-label",x),k.title=x,k.dataset.mghBtn="true",k.style.pointerEvents="auto",k.removeAttribute("id");let L=document.createElement("img");return L.src=w,L.alt="MGH",L.style.pointerEvents="none",L.style.userSelect="none",L.style.width="76%",L.style.height="76%",L.style.objectFit="contain",L.style.display="block",L.style.margin="auto",k.appendChild(L),k.addEventListener("click",I=>{I.preventDefault(),I.stopPropagation();try{e.onClick?.()}catch{}}),k}function f(){if(i)return!1;i=!0;let v=!1;try{let x=c();if(!x)return!1;s!==x&&(s=x);let{refBtn:w,refWrapper:k}=m(x);if(!w)return!1;o=x.querySelector('div[data-mgh-wrapper="true"]'),!o&&k&&(o=k.cloneNode(!1),o.dataset.mghWrapper="true",o.removeAttribute("id"),v=!0);let L=o?.querySelector('button[data-mgh-btn="true"]')||null;r||(r=L),r||(r=g(w,n,t),o?o.appendChild(r):r.parentElement!==x&&x.appendChild(r),v=!0),o&&o.parentElement!==x&&(x.appendChild(o),v=!0);let I=x;if(I&&I!==u){try{S.disconnect()}catch{}u=I,S.observe(u,{childList:!0,subtree:!0})}return v}finally{i=!1}}f();let h=document.getElementById("App")||document.body,b=null,S=new MutationObserver(v=>{let x=v.every(k=>{let L=Array.from(k.addedNodes||[]),I=Array.from(k.removedNodes||[]),P=L.concat(I);if(P.length===0){let O=k.target;return o&&(O===o||o.contains(O))||r&&(O===r||r.contains(O))}return P.every(O=>!!(!(O instanceof HTMLElement)||o&&(O===o||o.contains(O))||r&&(O===r||r.contains(O))))}),w=v.some(k=>Array.from(k.removedNodes||[]).some(L=>L instanceof HTMLElement?!!(o&&(L===o||o.contains(L))||r&&(L===r||r.contains(L))):!1));x&&!w||b===null&&(b=window.setTimeout(()=>{if(b=null,f()&&o){let L=o.parentElement;L&&L.lastElementChild!==o&&L.appendChild(o)}},150))});return S.observe(h,{childList:!0,subtree:!0}),a=()=>S.disconnect(),()=>{try{a?.()}catch{}try{o?.remove()}catch{}}}var Ec={},Si=[];function Cc(){return Si.slice()}function Mc(e){Si.push(e)}function wi(e){try{return JSON.parse(e)}catch{return}}function xi(e){if(typeof e=="string"){let t=wi(e);return t!==void 0?t:e}return e}function Ti(e){if(e!=null){if(typeof e=="string"){let t=wi(e);return t!==void 0?Ti(t):e}if(Array.isArray(e)&&typeof e[0]=="string")return e[0];if(typeof e=="object"){let t=e;return t.type??t.Type??t.kind??t.messageType}}}function Ic(e){let t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function F(e,t,n){let r=typeof t=="boolean"?t:!0,o=typeof t=="function"?t:n,a=(i,s)=>{if(Ti(i)!==e)return;let d=o(i,s);return d&&typeof d=="object"&&"kind"in d?d:typeof d=="boolean"?d?void 0:{kind:"drop"}:r?void 0:{kind:"drop"}};return Mc(a),a}var Ct=new WeakSet,vi=new WeakMap;function ki(e){let t=e.pageWindow,n=!!e.debug,r=e.middlewares&&e.middlewares.length?e.middlewares:Cc();if(!r.length)return()=>{};let o=p=>({ws:p,pageWindow:t,debug:n}),a=(p,m)=>{let g=p;for(let f of r){let h=f(g,o(m));if(h){if(h.kind==="drop")return{kind:"drop"};h.kind==="replace"&&(g=h.message)}}return g!==p?{kind:"replace",message:g}:void 0},i=null,s=null,u=null,d=()=>{let p=t?.MagicCircle_RoomConnection,m=p?.sendMessage;if(!p||typeof m!="function")return!1;if(Ct.has(m))return!0;let g=m.bind(p);function f(...h){let b=h.length===1?h[0]:h,S=xi(b),v=a(S,Ic(t));if(v?.kind==="drop"){n&&console.log("[WS] drop outgoing (RoomConnection.sendMessage)",S);return}if(v?.kind==="replace"){let x=v.message;return h.length>1&&Array.isArray(x)?(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",S,"=>",x),g(...x)):(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",S,"=>",x),g(x))}return g(...h)}Ct.add(f),vi.set(f,m);try{p.sendMessage=f,Ct.add(p.sendMessage),n&&console.log("[WS] outgoing patched via MagicCircle_RoomConnection.sendMessage")}catch{return!1}return i=()=>{try{p.sendMessage===f&&(p.sendMessage=m)}catch{}},!0};(()=>{let p=t?.WebSocket?.prototype,m=p?.send;if(typeof m!="function"||Ct.has(m))return;function g(f){let h=xi(f),b=a(h,this);if(b?.kind==="drop"){n&&console.log("[WS] drop outgoing (ws.send)",h);return}if(b?.kind==="replace"){let S=b.message,v=typeof S=="string"||S instanceof ArrayBuffer||S instanceof Blob?S:JSON.stringify(S);return n&&console.log("[WS] replace outgoing (ws.send)",h,"=>",S),m.call(this,v)}return m.call(this,f)}Ct.add(g),vi.set(g,m);try{p.send=g,n&&console.log("[WS] outgoing patched via WebSocket.prototype.send")}catch{return}s=()=>{try{p.send===g&&(p.send=m)}catch{}}})();let c=e.waitForRoomConnectionMs??4e3;if(!d()&&c>0){let p=Date.now();u=setInterval(()=>{if(d()){clearInterval(u),u=null;return}Date.now()-p>c&&(clearInterval(u),u=null,n&&console.log("[WS] RoomConnection not found, only ws.send is patched"))},250)}return()=>{if(u){try{clearInterval(u)}catch{}u=null}if(i){try{i()}catch{}i=null}if(s){try{s()}catch{}s=null}}}(function(){try{let t=Ec,n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();var Dc={},Ai=[];function Lc(){return Ai.slice()}function Pi(e){Ai.push(e)}function Rc(e){if(e!=null){if(typeof e=="object"){let t=e;if(typeof t.type=="string")return t.type;if(typeof t.Type=="string")return t.Type;if(typeof t.kind=="string")return t.kind;if(typeof t.messageType=="string")return t.messageType}if(Array.isArray(e)&&typeof e[0]=="string")return e[0]}}function Oc(e){if(typeof e=="string")try{return JSON.parse(e)}catch{return e}return e}var co=Symbol.for("ariesmod.ws.handlers.patched");function ne(e,t){if(typeof e=="string"){let o=e,a={match:i=>i.kind==="message"&&i.type===o,handle:t};return Pi(a),a}let n=e,r={match:o=>o.kind==="close"&&o.code===n,handle:t};return Pi(r),r}function Ci(e,t=Lc(),n={}){let r=n.pageWindow??window,o=!!n.debug;if(e[co])return()=>{};e[co]=!0;let a={ws:e,pageWindow:r,debug:o},i=c=>{for(let p of t)try{if(!p.match(c))continue;if(p.handle(c,a)===!0)return}catch(m){o&&console.error("[WS] handler error",m,c)}},s=c=>{let p=Oc(c.data),m=Rc(p);i({kind:"message",raw:c.data,data:p,type:m})},u=c=>{i({kind:"close",code:c.code,reason:c.reason,wasClean:c.wasClean,event:c})},d=c=>i({kind:"open",event:c}),l=c=>i({kind:"error",event:c});return e.addEventListener("message",s),e.addEventListener("close",u),e.addEventListener("open",d),e.addEventListener("error",l),()=>{try{e.removeEventListener("message",s)}catch{}try{e.removeEventListener("close",u)}catch{}try{e.removeEventListener("open",d)}catch{}try{e.removeEventListener("error",l)}catch{}try{delete e[co]}catch{}}}(function(){try{let t=Dc,n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();ne(4800,(e,t)=>{t.debug&&console.log("[WS][Close] Auth failure",e.code,e.reason)});ne(4300,(e,t)=>{t.debug&&console.log("[WS][Close] Superseded",e.code,e.reason)});ne(4400,(e,t)=>{t.debug&&console.log("[WS][Close] Heartbeat expired",e.code,e.reason)});ne(4500,(e,t)=>{t.debug&&console.log("[WS][Close] Player kicked",e.code,e.reason)});ne(4200,(e,t)=>{t.debug&&console.log("[WS][Close] Player left voluntarily",e.code,e.reason)});ne(4100,(e,t)=>{t.debug&&console.log("[WS][Close] Reconnect initiated",e.code,e.reason)});ne(4310,(e,t)=>{t.debug&&console.log("[WS][Close] Server disposed",e.code,e.reason)});ne(4250,(e,t)=>{t.debug&&console.log("[WS][Close] User session superseded",e.code,e.reason)});ne(4710,(e,t)=>{t.debug&&console.log("[WS][Close] Version expired",e.code,e.reason)});ne(4700,(e,t)=>{t.debug&&console.log("[WS][Close] Version mismatch",e.code,e.reason)});ne(Te.Config,(e,t)=>{t.debug&&console.log("[WS][STC] Config",e.data)});ne(Te.CurrencyTransaction,(e,t)=>{t.debug&&console.log("[WS][STC] CurrencyTransaction",e.data)});ne(Te.Emote,(e,t)=>{t.debug&&console.log("[WS][STC] Emote",e.data)});ne(Te.InappropriateContentRejected,(e,t)=>{t.debug&&console.log("[WS][STC] InappropriateContentRejected",e.data)});ne(Te.PartialState,(e,t)=>{t.debug&&console.log("[WS][STC] PartialState",e.data)});ne(Te.Pong,(e,t)=>{t.debug&&console.log("[WS][STC] Pong",e.data)});ne(Te.ServerErrorMessage,(e,t)=>{t.debug&&console.log("[WS][STC] ServerErrorMessage",e.data)});ne(Te.Welcome,(e,t)=>{t.debug&&console.log("[WS][STC] Welcome",e.data)});F(C.PlantSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantSeed"),!!1));F(C.WaterPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] WaterPlant"),!!1));F(C.HarvestCrop,(e,t)=>(t.debug&&console.log("[MW][Garden] HarvestCrop"),!!1));F(C.SellAllCrops,(e,t)=>(t.debug&&console.log("[MW][Garden] SellAllCrops"),!!1));F(C.PurchaseSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseSeed"),!!1));F(C.PurchaseEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseEgg"),!!1));F(C.PurchaseTool,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseTool"),!!1));F(C.PurchaseDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseDecor"),!!1));F(C.PlantEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantEgg"),!!1));F(C.HatchEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] HatchEgg"),!!1));F(C.PlantGardenPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantGardenPlant"),!!1));F(C.PotPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PotPlant"),!!1));F(C.MutationPotion,(e,t)=>(t.debug&&console.log("[MW][Garden] MutationPotion"),!!1));F(C.PickupDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PickupDecor"),!!1));F(C.PlaceDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PlaceDecor"),!!1));F(C.RemoveGardenObject,(e,t)=>(t.debug&&console.log("[MW][Garden] RemoveGardenObject"),!!1));F(C.MoveInventoryItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveInventoryItem"),!!1));F(C.DropObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] DropObject"),!!1));F(C.PickupObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] PickupObject"),!!1));F(C.ToggleFavoriteItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] ToggleFavoriteItem"),!!1));F(C.PutItemInStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] PutItemInStorage"),!!1));F(C.RetrieveItemFromStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] RetrieveItemFromStorage"),!!1));F(C.MoveStorageItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveStorageItem"),!!1));F(C.LogItems,(e,t)=>(t.debug&&console.log("[MW][Inventory] LogItems"),!!1));F(C.PlacePet,(e,t)=>(t.debug&&console.log("[MW][Pets] PlacePet"),!!1));F(C.FeedPet,(e,t)=>(t.debug&&console.log("[MW][Pets] FeedPet"),!!1));F(C.PetPositions,(e,t)=>(t.debug&&console.log("[MW][Pets] PetPositions"),!!1));F(C.SwapPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SwapPet"),!!1));F(C.StorePet,(e,t)=>(t.debug&&console.log("[MW][Pets] StorePet"),!!1));F(C.NamePet,(e,t)=>(t.debug&&console.log("[MW][Pets] NamePet"),!!1));F(C.SellPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SellPet"),!!1));console.log("[WS] TESTTEST");F(C.SetSelectedGame,(e,t)=>(t.debug&&console.log("[MW][Session] SetSelectedGame"),!!1));F(C.VoteForGame,(e,t)=>(t.debug&&console.log("[MW][Session] VoteForGame"),!!1));F(C.RequestGame,(e,t)=>(t.debug&&console.log("[MW][Session] RequestGame"),!!1));F(C.RestartGame,(e,t)=>(t.debug&&console.log("[MW][Session] RestartGame"),!!1));F(C.Ping,(e,t)=>(t.debug&&console.log("[MW][Session] Ping"),!!1));F(C.PlayerPosition,(e,t)=>(t.debug&&console.log("[MW][Session] PlayerPosition"),!!1));F(C.Teleport,(e,t)=>(t.debug&&console.log("[MW][Session] Teleport"),!!1));F(C.CheckWeatherStatus,(e,t)=>(t.debug&&console.log("[MW][Session] CheckWeatherStatus"),!!1));F(C.Chat,(e,t)=>(t.debug&&console.log("[MW][Social] Chat"),!!1));F(C.Dev,(e,t)=>(t.debug&&console.log("[MW][Social] Dev"),!!1));F(C.Emote,(e,t)=>(t.debug&&console.log("[MW][Social] Emote"),!!1));F(C.Wish,(e,t)=>(t.debug&&console.log("[MW][Social] Wish"),!!1));F(C.KickPlayer,(e,t)=>(t.debug&&console.log("[MW][Social] KickPlayer"),!!1));F(C.ReportSpeakingStart,(e,t)=>(t.debug&&console.log("[MW][Voice] ReportSpeakingStart"),!!1));F(C.SetPlayerData,(e,t)=>(t.debug&&console.log("[MW][Social] SetPlayerData"),!!1));F(C.UsurpHost,(e,t)=>(t.debug&&console.log("[MW][Social] UsurpHost"),!!1));function Gc(e={}){let t=e.pageWindow??A,n=e.pollMs??500,r=!!e.debug,o=[];o.push(ia(t,{debug:r})),o.push(ki({pageWindow:t,middlewares:e.middlewares,debug:r}));let a=null,i=s=>{if(a){try{a()}catch{}a=null}s&&(a=Ci(s,e.handlers,{debug:r,pageWindow:t}))};return i(Pt(t).ws),o.push(cn(s=>i(s.ws),{intervalMs:n,debug:r,pageWindow:t})),{getWs:()=>Pt(t).ws,dispose:()=>{for(let s=o.length-1;s>=0;s--)try{o[s]()}catch{}if(a){try{a()}catch{}a=null}}}}var mn=null;function Mi(e={}){return mn||(mn=Gc(e),mn)}Ie();var Mt=null;function Hc(){return A?.document??(typeof document<"u"?document:null)}function po(e){if(Mt!==null)return;let t=e??Hc();if(!t)return;let n=t.scripts;for(let r=0;r<n.length;r++){let a=n.item(r)?.src;if(!a)continue;let i=a.match(/\/(?:r\/\d+\/)?version\/([^/]+)/);if(i?.[1]){Mt=i[1];return}}}function Nc(){return po(),Mt}async function _c(e=15e3){let t=performance.now();for(;performance.now()-t<e;){if(po(),Mt)return Mt;await Me(50)}throw new Error("MGVersion timeout (gameVersion not found)")}var It={init:po,get:Nc,wait:_c};var Ei=A?.location?.origin||"https://magicgarden.gg";function Li(){return typeof GM_xmlhttpRequest=="function"}function Ri(e,t="text"){return new Promise((n,r)=>{GM_xmlhttpRequest({method:"GET",url:e,responseType:t,onload:o=>o.status>=200&&o.status<300?n(o):r(new Error(`HTTP ${o.status} for ${e}`)),onerror:()=>r(new Error(`Network error for ${e}`)),ontimeout:()=>r(new Error(`Timeout for ${e}`))})})}async function at(e){if(Li())return JSON.parse((await Ri(e,"text")).responseText);let t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.json()}async function fn(e){if(Li())return(await Ri(e,"blob")).response;let t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.blob()}function Oi(e){return new Promise((t,n)=>{let r=URL.createObjectURL(e),o=A?.Image||Image,a=new o;a.decoding="async",a.onload=()=>{URL.revokeObjectURL(r),t(a)},a.onerror=()=>{URL.revokeObjectURL(r),n(new Error("Image decode failed"))},a.src=r})}var me=(e,t)=>e.replace(/\/?$/,"/")+String(t||"").replace(/^\//,""),Wc=e=>e.lastIndexOf("/")>=0?e.slice(0,e.lastIndexOf("/")+1):"",mo=(e,t)=>String(t||"").startsWith("/")?String(t).slice(1):Wc(e)+String(t||"");var bn=null,hn=null;async function Di(){return hn||bn||(bn=(async()=>{let e=await It.wait(15e3);return hn=`${Ei}/version/${e}/assets/`,hn})(),bn)}async function jc(e){let t=await Di();return me(t,e)}var ve={base:Di,url:jc};var go=new Map;async function Bc(e){let t=e||await ve.base();if(go.has(t))return go.get(t);let n=at(me(t,"manifest.json"));return go.set(t,n),n}function Uc(e,t){return e?.bundles?.find(n=>n?.name===t)||null}function Fc(e){let t=new Set;for(let n of e?.assets||[])for(let r of n?.src||[])typeof r=="string"&&r.endsWith(".json")&&r!=="manifest.json"&&t.add(r);return Array.from(t)}var fe={load:Bc,getBundle:Uc,listJsonFromBundle:Fc};Ie();Ie();Ie();var Gi=Function.prototype.bind,Y={_bindPatched:!1,engine:null,tos:null,app:null,renderer:null,ticker:null,stage:null},Hi,Ni,_i,Vc=new Promise(e=>{Hi=e}),zc=new Promise(e=>{Ni=e}),$c=new Promise(e=>{_i=e});function Kc(e){return!!(e&&typeof e=="object"&&typeof e.start=="function"&&typeof e.destroy=="function"&&e.app&&e.app.stage&&e.app.renderer&&e.systems&&typeof e.systems.values=="function")}function Jc(e){try{for(let t of e.systems.values()){let n=t?.system;if(n?.name==="tileObject")return n}}catch{}return null}function qc(e){Y.engine=e,Y.tos=Jc(e)||null,Y.app=e.app||null,Y.renderer=e.app?.renderer||null,Y.ticker=e.app?.ticker||null,Y.stage=e.app?.stage||null;try{Hi(e)}catch{}try{Y.app&&Ni(Y.app)}catch{}try{Y.renderer&&_i(Y.renderer)}catch{}}function fo(){return Y.engine?!0:(Y._bindPatched||(Y._bindPatched=!0,Function.prototype.bind=function(e,...t){let n=Gi.call(this,e,...t);try{!Y.engine&&Kc(e)&&(Function.prototype.bind=Gi,Y._bindPatched=!1,qc(e))}catch{}return n}),!1)}fo();async function Xc(e=15e3){let t=performance.now();for(;performance.now()-t<e;){if(Y.engine)return!0;fo(),await Me(50)}throw new Error("MGPixiHooks: engine capture timeout")}async function Yc(e=15e3){return Y.engine||await Xc(e),!0}function Qc(){return Y.engine&&Y.app?{ok:!0,engine:Y.engine,tos:Y.tos,app:Y.app}:(fo(),{ok:!1,engine:Y.engine,tos:Y.tos,app:Y.app,note:"Not captured. Wait for room, or reload."})}var le={engineReady:Vc,appReady:zc,rendererReady:$c,engine:()=>Y.engine,tos:()=>Y.tos,app:()=>Y.app,renderer:()=>Y.renderer,ticker:()=>Y.ticker,stage:()=>Y.stage,PIXI:()=>A.PIXI||null,init:Yc,hook:Qc,ready:()=>!!Y.engine};function Et(e){let t=String(e||"").trim();return t?t.startsWith("sprite/")||t.startsWith("sprites/")?t:t.includes("/")?`sprite/${t}`:t:""}function it(e,t){let n=String(e||"").trim().replace(/^sprites?\//,"").replace(/^\/+|\/+$/g,""),r=String(t||"").trim();return r.includes("/")||!n?Et(r):`sprite/${n}/${r}`}function st(e,t,n,r){let o=it(e,t);if(n.has(o)||r.has(o))return o;let a=String(t||"").trim();if(n.has(a)||r.has(a))return a;let i=Et(a);return n.has(i)||r.has(i)?i:o}function Zc(e,t,n=25e3){let r=[e],o=new Set,a=0;for(;r.length&&a++<n;){let i=r.pop();if(!i||o.has(i))continue;if(o.add(i),t(i))return i;let s=i.children;if(Array.isArray(s))for(let u=s.length-1;u>=0;u--)r.push(s[u])}return null}function eu(e){let t=A.PIXI;if(t?.Texture&&t?.Sprite&&t?.Container&&t?.Rectangle)return{Container:t.Container,Sprite:t.Sprite,Texture:t.Texture,Rectangle:t.Rectangle,AnimatedSprite:t.AnimatedSprite||null};let n=e?.stage,r=Zc(n,o=>o?.texture?.frame&&o?.constructor&&o?.texture?.constructor&&o?.texture?.frame?.constructor);if(!r)throw new Error("No Sprite found yet (constructors).");return{Container:n.constructor,Sprite:r.constructor,Texture:r.texture.constructor,Rectangle:r.texture.frame.constructor,AnimatedSprite:t?.AnimatedSprite||null}}async function Wi(e,t=15e3){let{sleep:n}=await Promise.resolve().then(()=>(Ie(),Ii)),r=performance.now();for(;performance.now()-r<t;)try{return eu(e)}catch{await n(50)}throw new Error("Constructors timeout")}var He=(...e)=>{try{console.log("[MGSprite]",...e)}catch{}};function tu(e){return e&&typeof e=="object"&&e.frames&&e.meta&&typeof e.meta.image=="string"}function bo(e,t,n,r,o){return new e(t,n,r,o)}function nu(e,t,n,r,o,a,i){let s;try{s=new e({source:t.source,frame:n,orig:r,trim:o||void 0,rotate:a||0})}catch{s=new e(t.baseTexture||t,n,r,o||void 0,a||0)}if(i)if(s.defaultAnchor?.set)try{s.defaultAnchor.set(i.x,i.y)}catch{}else s.defaultAnchor?(s.defaultAnchor.x=i.x,s.defaultAnchor.y=i.y):s.defaultAnchor={x:i.x,y:i.y};try{s.updateUvs?.()}catch{}return s}function ou(e,t,n,r){let{Texture:o,Rectangle:a}=r;for(let[i,s]of Object.entries(e.frames)){let u=s.frame,d=!!s.rotated,l=d?2:0,c=d?u.h:u.w,p=d?u.w:u.h,m=bo(a,u.x,u.y,c,p),g=s.sourceSize||{w:u.w,h:u.h},f=bo(a,0,0,g.w,g.h),h=null;if(s.trimmed&&s.spriteSourceSize){let b=s.spriteSourceSize;h=bo(a,b.x,b.y,b.w,b.h)}n.set(i,nu(o,t,m,f,h,l,s.anchor||null))}}function ru(e,t,n){if(!(!e.animations||typeof e.animations!="object"))for(let[r,o]of Object.entries(e.animations)){if(!Array.isArray(o))continue;let a=o.map(i=>t.get(i)).filter(Boolean);a.length>=2&&n.set(r,a)}}function au(e,t){let n=(r,o)=>{let a=String(r||"").trim(),i=String(o||"").trim();!a||!i||(t.has(a)||t.set(a,new Set),t.get(a).add(i))};for(let r of Object.keys(e.frames||{})){let o=/^sprite\/([^/]+)\/(.+)$/.exec(r);o&&n(o[1],o[2])}}async function ji(e,t){let n=await fe.load(e),r=fe.getBundle(n,"default");if(!r)throw new Error("No default bundle in manifest");let o=fe.listJsonFromBundle(r),a=new Set,i=new Map,s=new Map,u=new Map;async function d(l){if(a.has(l))return;a.add(l);let c=await at(me(e,l));if(!tu(c))return;let p=c.meta?.related_multi_packs;if(Array.isArray(p))for(let h of p)await d(mo(l,h));let m=mo(l,c.meta.image),g=await Oi(await fn(me(e,m))),f=t.Texture.from(g);ou(c,f,i,t),ru(c,i,s),au(c,u)}for(let l of o)await d(l);return{textures:i,animations:s,categoryIndex:u}}var Bi={enabled:!0,maxEntries:1200,maxCost:5e3,srcCanvasMax:450};function Ui(){return{lru:new Map,cost:0,srcCanvas:new Map}}function ho(e,t){return`${t.sig}::${e}`}function Fi(e){return e?e.isAnim?e.frames?.length||0:e.tex?1:0:0}function iu(e,t,n){e.lru.delete(t),e.lru.set(t,n)}function su(e,t){if(t.enabled)for(;e.lru.size>t.maxEntries||e.cost>t.maxCost;){let n=e.lru.keys().next().value;if(n===void 0)break;let r=e.lru.get(n);e.lru.delete(n),e.cost=Math.max(0,e.cost-Fi(r??null))}}function yo(e,t){let n=e.lru.get(t);return n?(iu(e,t,n),n):null}function xo(e,t,n,r){e.lru.set(t,n),e.cost+=Fi(n),su(e,r)}function Vi(e){e.lru.clear(),e.cost=0,e.srcCanvas.clear()}function zi(e,t){return e.srcCanvas.get(t)??null}function $i(e,t,n,r){if(e.srcCanvas.set(t,n),e.srcCanvas.size>r.srcCanvasMax){let o=e.srcCanvas.keys().next().value;o!==void 0&&e.srcCanvas.delete(o)}}function lu(){return{ready:!1,app:null,renderer:null,ctors:null,baseUrl:null,textures:new Map,animations:new Map,live:new Set,defaultParent:null,overlay:null,categoryIndex:null}}var yn=null,ae=lu(),cu=Ui(),uu={...Bi};function ce(){return ae}function lt(){return cu}function Lt(){return uu}function vo(){return ae.ready}async function Ki(){return ae.ready?!0:yn||(yn=(async()=>{let e=performance.now();He("init start");let t=await gn(le.appReady,15e3,"PIXI app");He("app ready");let n=await gn(le.rendererReady,15e3,"PIXI renderer");He("renderer ready"),ae.app=t,ae.renderer=n||t?.renderer||null,ae.ctors=await Wi(t),He("constructors resolved"),ae.baseUrl=await ve.base(),He("base url",ae.baseUrl);let{textures:r,animations:o,categoryIndex:a}=await ji(ae.baseUrl,ae.ctors);return ae.textures=r,ae.animations=o,ae.categoryIndex=a,He("atlases loaded","textures",ae.textures.size,"animations",ae.animations.size,"categories",ae.categoryIndex?.size??0),ae.ready=!0,He("ready in",Math.round(performance.now()-e),"ms"),!0})(),yn)}var Ue={Gold:{overlayTall:null,tallIconOverride:null},Rainbow:{overlayTall:null,tallIconOverride:null,angle:130,angleTall:0},Wet:{overlayTall:"sprite/mutation-overlay/WetTallPlant",tallIconOverride:"sprite/mutation/Puddle"},Chilled:{overlayTall:"sprite/mutation-overlay/ChilledTallPlant",tallIconOverride:null},Frozen:{overlayTall:"sprite/mutation-overlay/FrozenTallPlant",tallIconOverride:null},Dawnlit:{overlayTall:null,tallIconOverride:null},Ambershine:{overlayTall:null,tallIconOverride:null},Dawncharged:{overlayTall:null,tallIconOverride:null},Ambercharged:{overlayTall:null,tallIconOverride:null}},qi=Object.keys(Ue),du=["Gold","Rainbow","Wet","Chilled","Frozen","Ambershine","Dawnlit","Dawncharged","Ambercharged"],Ji=new Map(du.map((e,t)=>[e,t]));function xn(e){return[...new Set(e.filter(Boolean))].sort((n,r)=>(Ji.get(n)??1/0)-(Ji.get(r)??1/0))}var pu=["Wet","Chilled","Frozen"];var Xi=new Set(["Dawnlit","Ambershine","Dawncharged","Ambercharged"]),Yi={Banana:.6,Carrot:.6,Sunflower:.5,Starweaver:.5,FavaBean:.25,BurrosTail:.2},Qi={Pepper:.5,Banana:.6},Zi=256,es=.5,ts=2;function So(e){if(!e.length)return{muts:[],overlayMuts:[],selectedMuts:[],sig:""};let t=xn(e),n=mu(e),r=gu(e);return{muts:n,overlayMuts:r,selectedMuts:t,sig:`${t.join(",")}|${n.join(",")}|${r.join(",")}`}}function mu(e){let t=e.filter((o,a,i)=>Ue[o]&&i.indexOf(o)===a);if(!t.length)return[];if(t.includes("Gold"))return["Gold"];if(t.includes("Rainbow"))return["Rainbow"];let n=["Ambershine","Dawnlit","Dawncharged","Ambercharged"];return t.some(o=>n.includes(o))?xn(t.filter(o=>!pu.includes(o))):xn(t)}function gu(e){let t=e.filter((n,r,o)=>Ue[n]?.overlayTall&&o.indexOf(n)===r);return xn(t)}function vn(e,t){return e.map(n=>({name:n,meta:Ue[n],overlayTall:Ue[n]?.overlayTall??null,isTall:t}))}var fu={Gold:{op:"source-atop",colors:["rgb(235,200,0)"],a:.7},Rainbow:{op:"color",colors:["#FF1744","#FF9100","#FFEA00","#00E676","#2979FF","#D500F9"],ang:130,angTall:0,masked:!0},Wet:{op:"source-atop",colors:["rgb(50,180,200)"],a:.25},Chilled:{op:"source-atop",colors:["rgb(100,160,210)"],a:.45},Frozen:{op:"source-atop",colors:["rgb(100,130,220)"],a:.5},Dawnlit:{op:"source-atop",colors:["rgb(209,70,231)"],a:.5},Ambershine:{op:"source-atop",colors:["rgb(190,100,40)"],a:.5},Dawncharged:{op:"source-atop",colors:["rgb(140,80,200)"],a:.5},Ambercharged:{op:"source-atop",colors:["rgb(170,60,25)"],a:.5}};var Sn=(()=>{try{let t=document.createElement("canvas").getContext("2d");if(!t)return new Set;let n=["color","hue","saturation","luminosity","overlay","screen","lighter","source-atop"],r=new Set;for(let o of n)t.globalCompositeOperation=o,t.globalCompositeOperation===o&&r.add(o);return r}catch{return new Set}})();function bu(e){return Sn.has(e)?e:Sn.has("overlay")?"overlay":Sn.has("screen")?"screen":Sn.has("lighter")?"lighter":"source-atop"}function hu(e,t,n,r,o=!1){let a=(r-90)*Math.PI/180,i=t/2,s=n/2;if(!o){let c=Math.min(t,n)/2;return e.createLinearGradient(i-Math.cos(a)*c,s-Math.sin(a)*c,i+Math.cos(a)*c,s+Math.sin(a)*c)}let u=Math.cos(a),d=Math.sin(a),l=Math.abs(u)*t/2+Math.abs(d)*n/2;return e.createLinearGradient(i-u*l,s-d*l,i+u*l,s+d*l)}function ns(e,t,n,r,o=!1){let a=r.colors?.length?r.colors:["#fff"],i=r.ang!=null?hu(e,t,n,r.ang,o):e.createLinearGradient(0,0,0,n);a.length===1?(i.addColorStop(0,a[0]),i.addColorStop(1,a[0])):a.forEach((s,u)=>i.addColorStop(u/(a.length-1),s)),e.fillStyle=i,e.fillRect(0,0,t,n)}function os(e,t,n,r){let o=fu[n];if(!o)return;let a={...o};n==="Rainbow"&&r&&a.angTall!=null&&(a.ang=a.angTall);let i=n==="Rainbow"&&r,s=t.width,u=t.height;e.save();let d=a.masked?bu(a.op):"source-in";if(e.globalCompositeOperation=d,a.a!=null&&(e.globalAlpha=a.a),a.masked){let l=document.createElement("canvas");l.width=s,l.height=u;let c=l.getContext("2d");c.imageSmoothingEnabled=!1,ns(c,s,u,a,i),c.globalCompositeOperation="destination-in",c.drawImage(t,0,0),e.drawImage(l,0,0)}else ns(e,s,u,a,i);e.restore()}function rs(e){return/tallplant/i.test(e)}function wn(e){let t=String(e||"").split("/");return t[t.length-1]||""}function as(e){switch(e){case"Ambershine":return["Ambershine","Amberlit"];case"Dawncharged":return["Dawncharged","Dawnbound"];case"Ambercharged":return["Ambercharged","Amberbound"];default:return[e]}}function yu(e,t){let n=String(e||"").toLowerCase();for(let r of t.keys()){let o=/sprite\/mutation-overlay\/([A-Za-z0-9]+)TallPlant/i.exec(String(r));if(!o||!o[1])continue;if(o[1].toLowerCase()===n){let i=t.get(r);if(i)return{tex:i,key:r}}}return null}function is(e,t,n,r){if(!t)return null;let o=wn(e),a=as(t);for(let i of a){let s=[`sprite/mutation/${i}${o}`,`sprite/mutation/${i}-${o}`,`sprite/mutation/${i}_${o}`,`sprite/mutation/${i}/${o}`,`sprite/mutation/${i}`];for(let u of s){let d=n.get(u);if(d)return{tex:d,key:u}}if(r){let u=`sprite/mutation-overlay/${i}TallPlant`,d=n.get(u);if(d)return{tex:d,key:u};let l=`sprite/mutation-overlay/${i}`,c=n.get(l);if(c)return{tex:c,key:l};let p=yu(t,n);if(p)return p}}return null}function ss(e,t,n,r){if(!t)return null;let o=Ue[t];if(n&&o?.tallIconOverride){let s=r.get(o.tallIconOverride);if(s)return s}let a=wn(e),i=as(t);for(let s of i){let u=[`sprite/mutation/${s}Icon`,`sprite/mutation/${s}`,`sprite/mutation/${s}${a}`,`sprite/mutation/${s}-${a}`,`sprite/mutation/${s}_${a}`,`sprite/mutation/${s}/${a}`];for(let d of u){let l=r.get(d);if(l)return l}if(n){let d=`sprite/mutation-overlay/${s}TallPlantIcon`,l=r.get(d);if(l)return l;let c=`sprite/mutation-overlay/${s}TallPlant`,p=r.get(c);if(p)return p}}return null}function ls(e,t,n){let r=e?.orig?.width??e?.frame?.width??e?.width??1,o=e?.orig?.height??e?.frame?.height??e?.height??1,a=e?.defaultAnchor?.x??0,i=e?.defaultAnchor?.y??0,s=Qi[t]??a,u=o>r*1.5,d=Yi[t]??(u?i:.4),l={x:(s-a)*r,y:(d-i)*o},c=Math.min(r,o),p=Math.min(1.5,c/Zi),m=es*p;return n&&(m*=ts),{width:r,height:o,anchorX:a,anchorY:i,offset:l,iconScale:m}}function wo(e,t,n,r,o){let a=zi(r,e);if(a)return a;let i=null;try{if(t?.extract?.canvas){let s=new n.Sprite(e);i=t.extract.canvas(s),s.destroy?.({children:!0,texture:!1,baseTexture:!1})}}catch{}if(!i){let s=e?.frame||e?._frame,u=e?.orig||e?._orig,d=e?.trim||e?._trim,l=e?.rotate||e?._rotate||0,c=e?.baseTexture?.resource?.source||e?.baseTexture?.resource||e?.source?.resource?.source||e?.source?.resource||e?._source?.resource?.source||null;if(!s||!c)throw new Error("textureToCanvas fail");i=document.createElement("canvas");let p=Math.max(1,(u?.width??s.width)|0),m=Math.max(1,(u?.height??s.height)|0),g=d?.x??0,f=d?.y??0;i.width=p,i.height=m;let h=i.getContext("2d");h.imageSmoothingEnabled=!1,l===!0||l===2||l===8?(h.save(),h.translate(g+s.height/2,f+s.width/2),h.rotate(-Math.PI/2),h.drawImage(c,s.x,s.y,s.width,s.height,-s.width/2,-s.height/2,s.width,s.height),h.restore()):h.drawImage(c,s.x,s.y,s.width,s.height,g,f,s.width,s.height)}return $i(r,e,i,o),i}function xu(e,t,n,r,o,a,i,s){let{w:u,h:d,aX:l,aY:c,basePos:p}=t,m=[];for(let g of n){let f=new r.Sprite(e);f.anchor?.set?.(l,c),f.position.set(p.x,p.y),f.zIndex=1;let h=document.createElement("canvas");h.width=u,h.height=d;let b=h.getContext("2d");b.imageSmoothingEnabled=!1,b.save(),b.translate(u*l,d*c),b.drawImage(wo(e,o,r,a,i),-u*l,-d*c),b.restore(),os(b,h,g.name,g.isTall);let S=r.Texture.from(h);s.push(S),f.texture=S,m.push(f)}return m}function vu(e,t,n,r,o,a,i,s,u,d){let{aX:l,basePos:c}=t,p=[];for(let m of n){let g=m.overlayTall&&r.get(m.overlayTall)&&{tex:r.get(m.overlayTall),key:m.overlayTall}||is(e,m.name,r,!0);if(!g?.tex)continue;let f=wo(g.tex,a,o,i,s);if(!f)continue;let h=f.width,b={x:0,y:0},S={x:c.x-l*h,y:0},v=document.createElement("canvas");v.width=h,v.height=f.height;let x=v.getContext("2d");if(!x)continue;x.imageSmoothingEnabled=!1,x.drawImage(f,0,0),x.globalCompositeOperation="destination-in",x.drawImage(u,-S.x,-S.y);let w=o.Texture.from(v);d.push(w);let k=new o.Sprite(w);k.anchor?.set?.(b.x,b.y),k.position.set(S.x,S.y),k.scale.set(1),k.alpha=1,k.zIndex=3,p.push(k)}return p}function Su(e,t,n,r,o,a){let{basePos:i}=t,s=[];for(let u of n){if(u.name==="Gold"||u.name==="Rainbow")continue;let d=ss(e,u.name,u.isTall,r);if(!d)continue;let l=new o.Sprite(d),c=d?.defaultAnchor?.x??.5,p=d?.defaultAnchor?.y??.5;l.anchor?.set?.(c,p),l.position.set(i.x+a.offset.x,i.y+a.offset.y),l.scale.set(a.iconScale),u.isTall&&(l.zIndex=-1),Xi.has(u.name)&&(l.zIndex=10),l.zIndex||(l.zIndex=2),s.push(l)}return s}function To(e,t,n,r){try{if(!e||!r.renderer||!r.ctors?.Container||!r.ctors?.Sprite||!r.ctors?.Texture)return null;let{Container:o,Sprite:a,Texture:i}=r.ctors,s=e?.orig?.width??e?.frame?.width??e?.width??1,u=e?.orig?.height??e?.frame?.height??e?.height??1,d=e?.defaultAnchor?.x??.5,l=e?.defaultAnchor?.y??.5,c={x:s*d,y:u*l},p=wo(e,r.renderer,r.ctors,r.cacheState,r.cacheConfig),m=new o;m.sortableChildren=!0;let g=new a(e);g.anchor?.set?.(d,l),g.position.set(c.x,c.y),g.zIndex=0,m.addChild(g);let f=rs(t),h=vn(n.muts,f),b=vn(n.overlayMuts,f),S=vn(n.selectedMuts,f),v=[],x={w:s,h:u,aX:d,aY:l,basePos:c},w=wn(t),k=ls(e,w,f);xu(e,x,h,r.ctors,r.renderer,r.cacheState,r.cacheConfig,v).forEach(E=>m.addChild(E)),f&&vu(t,x,b,r.textures,r.ctors,r.renderer,r.cacheState,r.cacheConfig,p,v).forEach(U=>m.addChild(U)),Su(t,x,S,r.textures,r.ctors,k).forEach(E=>m.addChild(E));let P=null;if(typeof r.renderer.generateTexture=="function"?P=r.renderer.generateTexture(m,{resolution:1}):r.renderer.textureGenerator?.generateTexture&&(P=r.renderer.textureGenerator.generateTexture({target:m,resolution:1})),!P)throw new Error("no render texture");let O=P instanceof i?P:i.from(r.renderer.extract.canvas(P));P&&P!==O&&P.destroy?.(!0),m.destroy({children:!0,texture:!1,baseTexture:!1});try{O.__mg_gen=!0,O.label=`${t}|${n.sig}`}catch{}return O}catch{return null}}function cs(e,t,n,r){if(!e||e.length<2)return null;let o=[];for(let a of e){let i=To(a,t,n,r);i&&o.push(i)}return o.length>=2?o:null}function wu(e){if(e.overlay)return e.overlay;let t=new e.ctors.Container;t.sortableChildren=!0,t.zIndex=99999999;try{e.app.stage.sortableChildren=!0}catch{}return e.app.stage.addChild(t),e.overlay=t,t}function Tu(e){let t=e.defaultParent;if(!t)return null;try{return typeof t=="function"?t():t}catch{return null}}function us(e,t,n,r,o,a){if(!n.length)return t;let i=So(n);if(!i.sig)return t;let s=ho(e,i),u=yo(o,s);if(u?.tex)return u.tex;let d=To(t,e,i,{renderer:r.renderer,ctors:r.ctors,textures:r.textures,cacheState:o,cacheConfig:a});return d?(xo(o,s,{isAnim:!1,tex:d},a),d):t}function ds(e,t,n,r,o,a){if(!n.length)return t;let i=So(n);if(!i.sig)return t;let s=ho(e,i),u=yo(o,s);if(u?.isAnim&&u.frames?.length)return u.frames;let d=cs(t,e,i,{renderer:r.renderer,ctors:r.ctors,textures:r.textures,cacheState:o,cacheConfig:a});return d?(xo(o,s,{isAnim:!0,frames:d},a),d):t}function ko(e,t,n,r,o,a={}){if(!e.ready)throw new Error("MGSprite not ready yet");let i=st(r,o,e.textures,e.animations),s=a.mutations||[],u=a.parent||Tu(e)||wu(e),d=e.renderer?.width||e.renderer?.view?.width||innerWidth,l=e.renderer?.height||e.renderer?.view?.height||innerHeight,c=a.center?d/2:a.x??d/2,p=a.center?l/2:a.y??l/2,m,g=e.animations.get(i);if(g&&g.length>=2){let b=ds(i,g,s,e,t,n),S=e.ctors.AnimatedSprite;if(S)m=new S(b),m.animationSpeed=a.fps?a.fps/60:a.speed??.15,m.loop=a.loop??!0,m.play();else{let v=new e.ctors.Sprite(b[0]),w=1e3/Math.max(1,a.fps||8),k=0,L=0,I=P=>{let O=e.app.ticker?.deltaMS??P*16.666666666666668;if(k+=O,k<w)return;let E=k/w|0;k%=w,L=(L+E)%b.length,v.texture=b[L]};v.__mgTick=I,e.app.ticker?.add?.(I),m=v}}else{let b=e.textures.get(i);if(!b)throw new Error(`Unknown sprite/anim key: ${i}`);let S=us(i,b,s,e,t,n);m=new e.ctors.Sprite(S)}let f=a.anchorX??m.texture?.defaultAnchor?.x??.5,h=a.anchorY??m.texture?.defaultAnchor?.y??.5;return m.anchor?.set?.(f,h),m.position.set(c,p),m.scale.set(a.scale??1),m.alpha=a.alpha??1,m.rotation=a.rotation??0,m.zIndex=a.zIndex??999999,u.addChild(m),e.live.add(m),m.__mgDestroy=()=>{try{m.__mgTick&&e.app.ticker?.remove?.(m.__mgTick)}catch{}try{m.destroy?.({children:!0,texture:!1,baseTexture:!1})}catch{try{m.destroy?.()}catch{}}e.live.delete(m)},m}function ku(e,t){let n=e.renderer;if(n?.extract?.canvas)return n.extract.canvas(t);if(n?.plugins?.extract?.canvas)return n.plugins.extract.canvas(t);throw new Error("No extract.canvas available on renderer")}function Po(e,t,n,r,o,a={}){if(!e.ready)throw new Error("MGSprite not ready yet");let i=st(r,o,e.textures,e.animations),s=a.mutations||[],u=e.animations.get(i),d=Math.max(0,(a.frameIndex??0)|0),l;if(u?.length){let S=ds(i,u,s,e,t,n);l=S[d%S.length]}else{let S=e.textures.get(i);if(!S)throw new Error(`Unknown sprite/anim key: ${i}`);l=us(i,S,s,e,t,n)}let c=new e.ctors.Sprite(l),p=a.anchorX??c.texture?.defaultAnchor?.x??.5,m=a.anchorY??c.texture?.defaultAnchor?.y??.5;c.anchor?.set?.(p,m),c.scale.set(a.scale??1);let g=a.pad??2,f=new e.ctors.Container;f.addChild(c);try{f.updateTransform?.()}catch{}let h=c.getBounds?.(!0)||{x:0,y:0,width:c.width,height:c.height};c.position.set(-h.x+g,-h.y+g);let b=ku(e,f);try{f.destroy?.({children:!0})}catch{}return b}function ps(e){for(let t of Array.from(e.live))t.__mgDestroy?.()}function ms(e,t){return e.defaultParent=t,!0}function gs(e,t){return e.defaultParent=t,!0}function ct(){if(!vo())throw new Error("MGSprite not ready yet")}function Pu(e,t,n){return typeof t=="string"?ko(ce(),lt(),Lt(),e,t,n||{}):ko(ce(),lt(),Lt(),null,e,t||{})}function Au(e,t,n){return typeof t=="string"?Po(ce(),lt(),Lt(),e,t,n||{}):Po(ce(),lt(),Lt(),null,e,t||{})}function Cu(){ps(ce())}function Mu(e){return ms(ce(),e)}function Iu(e){return gs(ce(),e)}function Eu(e,t){let n=ce(),r=typeof t=="string"?st(e,t,n.textures,n.animations):st(null,e,n.textures,n.animations);return n.textures.has(r)||n.animations.has(r)}function Lu(){ct();let e=ce().categoryIndex;return e?Array.from(e.keys()).sort((t,n)=>t.localeCompare(n)):[]}function Ru(e){ct();let t=String(e||"").trim();if(!t)return[];let n=ce().categoryIndex;return n?Array.from(n.get(t)?.values()||[]).sort((r,o)=>r.localeCompare(o)):[]}function Ou(e,t){ct();let n=String(e||"").trim(),r=String(t||"").trim();if(!n||!r)return!1;let o=ce().categoryIndex;if(!o)return!1;let a=n.toLowerCase(),i=r.toLowerCase();for(let[s,u]of o.entries())if(s.toLowerCase()===a){for(let d of u.values())if(d.toLowerCase()===i)return!0}return!1}function Du(e){ct();let t=ce().categoryIndex;if(!t)return[];let n=String(e||"").trim().toLowerCase(),r=[];for(let[o,a]of t.entries())for(let i of a.values()){let s=it(o,i);(!n||s.toLowerCase().startsWith(n))&&r.push(s)}return r.sort((o,a)=>o.localeCompare(a))}function Gu(e){ct();let t=String(e||"").trim();if(!t)return null;let n=Et(t),r=/^sprite\/([^/]+)\/(.+)$/.exec(n);if(!r)return null;let o=r[1],a=r[2],i=ce().categoryIndex,s=o.toLowerCase(),u=a.toLowerCase(),d=o,l=a;if(i){let c=Array.from(i.keys()).find(g=>g.toLowerCase()===s);if(!c)return null;d=c;let p=i.get(c);if(!p)return null;let m=Array.from(p.values()).find(g=>g.toLowerCase()===u);if(!m)return null;l=m}return{category:d,id:l,key:it(d,l)}}function Hu(e,t){ct();let n=String(e||"").trim(),r=String(t||"").trim();if(!n||!r)throw new Error("getIdPath(category, id) requires both category and id");let o=ce().categoryIndex;if(!o)throw new Error("Sprite categories not indexed");let a=n.toLowerCase(),i=r.toLowerCase(),s=Array.from(o.keys()).find(l=>l.toLowerCase()===a)||n,u=o.get(s);if(!u)throw new Error(`Unknown sprite category: ${n}`);let d=Array.from(u.values()).find(l=>l.toLowerCase()===i)||r;if(!u.has(d))throw new Error(`Unknown sprite id: ${n}/${r}`);return it(s,d)}function Nu(){Vi(lt())}function _u(){return[...qi]}var ke={init:Ki,ready:vo,show:Pu,toCanvas:Au,clear:Cu,attach:Mu,attachProvider:Iu,has:Eu,key:(e,t)=>it(e,t),getCategories:Lu,getCategoryId:Ru,hasId:Ou,listIds:Du,getIdInfo:Gu,getIdPath:Hu,clearMutationCache:Nu,getMutationNames:_u};var Co=A,Ee=Co.Object??Object,Mo=Ee.keys,Tn=Ee.values,kn=Ee.entries,Fe={items:["WateringCan","PlanterPot","Shovel"],decor:["SmallRock","MediumRock","LargeRock","WoodBench","StoneBench","MarbleBench"],mutations:["Gold","Rainbow","Wet","Chilled","Frozen"],eggs:["CommonEgg","UncommonEgg","RareEgg"],pets:["Worm","Snail","Bee","Chicken","Bunny"],abilities:["ProduceScaleBoost","DoubleHarvest","SeedFinderI","CoinFinderI"],plants:["Carrot","Strawberry","Aloe","Blueberry","Apple"]},Wu=["Rain","Frost","Dawn","AmberMoon"],fs=/main-[^/]+\.js(\?|$)/,ju=3,Bu=200,Uu=50,bs=new WeakSet,J={isReady:!1,isHookInstalled:!1,data:{items:null,decor:null,mutations:null,eggs:null,pets:null,abilities:null,plants:null,weather:null},spritesResolved:!1,spritesResolving:null,weatherPollingTimer:null,weatherPollAttempts:0},Ve=(e,t)=>t.every(n=>e.includes(n));function ze(e,t){J.data[e]==null&&(J.data[e]=t,Fu()&&xs())}function Fu(){return Object.values(J.data).every(e=>e!=null)}function hs(e,t){if(!e||typeof e!="object"||bs.has(e))return;bs.add(e);let n;try{n=Mo(e)}catch{return}if(!n||n.length===0)return;let r=e,o;if(!J.data.items&&Ve(n,Fe.items)&&(o=r.WateringCan,o&&typeof o=="object"&&"coinPrice"in o&&"creditPrice"in o&&ze("items",r)),!J.data.decor&&Ve(n,Fe.decor)&&(o=r.SmallRock,o&&typeof o=="object"&&"coinPrice"in o&&"creditPrice"in o&&ze("decor",r)),!J.data.mutations&&Ve(n,Fe.mutations)&&(o=r.Gold,o&&typeof o=="object"&&"baseChance"in o&&"coinMultiplier"in o&&ze("mutations",r)),!J.data.eggs&&Ve(n,Fe.eggs)&&(o=r.CommonEgg,o&&typeof o=="object"&&"faunaSpawnWeights"in o&&"secondsToHatch"in o&&ze("eggs",r)),!J.data.pets&&Ve(n,Fe.pets)&&(o=r.Worm,o&&typeof o=="object"&&"coinsToFullyReplenishHunger"in o&&"diet"in o&&Array.isArray(o.diet)&&ze("pets",r)),!J.data.abilities&&Ve(n,Fe.abilities)&&(o=r.ProduceScaleBoost,o&&typeof o=="object"&&"trigger"in o&&"baseParameters"in o&&ze("abilities",r)),!J.data.plants&&Ve(n,Fe.plants)&&(o=r.Carrot,o&&typeof o=="object"&&"seed"in o&&"plant"in o&&"crop"in o&&ze("plants",r)),!(t>=ju))for(let a of n){let i;try{i=r[a]}catch{continue}i&&typeof i=="object"&&hs(i,t+1)}}function Ao(e){try{hs(e,0)}catch{}}function ys(){if(!J.isHookInstalled){J.isHookInstalled=!0;try{Ee.keys=function(t){return Ao(t),Mo.apply(this,arguments)},Tn&&(Ee.values=function(t){return Ao(t),Tn.apply(this,arguments)}),kn&&(Ee.entries=function(t){return Ao(t),kn.apply(this,arguments)})}catch{}}}function xs(){if(J.isHookInstalled){try{Ee.keys=Mo,Tn&&(Ee.values=Tn),kn&&(Ee.entries=kn)}catch{}J.isHookInstalled=!1}}function Vu(){try{for(let e of Co.document?.scripts||[]){let t=e?.src?String(e.src):"";if(fs.test(t))return t}}catch{}try{for(let e of Co.performance?.getEntriesByType?.("resource")||[]){let t=e?.name?String(e.name):"";if(fs.test(t))return t}}catch{}return null}function zu(e,t){let n=Math.max(e.lastIndexOf("const ",t),e.lastIndexOf("let ",t),e.lastIndexOf("var ",t));if(n<0)return null;let r=e.indexOf("=",n);if(r<0||r>t)return null;let o=e.indexOf("{",r);if(o<0||o>t)return null;let a=0,i="",s=!1;for(let u=o;u<e.length;u++){let d=e[u];if(i){if(s){s=!1;continue}if(d==="\\"){s=!0;continue}d===i&&(i="");continue}if(d==='"'||d==="'"){i=d;continue}if(d==="{")a++;else if(d==="}"&&--a===0)return e.slice(o,u+1)}return null}function $u(e){let t={},n=!1;for(let r of Wu){let o=e?.[r];if(!o||typeof o!="object")continue;let a=o.iconSpriteKey||null,{iconSpriteKey:i,...s}=o;t[r]={weatherId:r,spriteId:a,...s},n=!0}return t.Sunny||(t.Sunny={weatherId:"Sunny",name:"Sunny",spriteId:"sprite/ui/SunnyIcon",type:"primary"}),!n||t.Rain&&t.Rain.mutator?.mutation!=="Wet"?null:t}async function Ku(){if(J.data.weather)return!0;let e=Vu();if(!e)return!1;let t="";try{let s=await fetch(e,{credentials:"include"});if(!s.ok)return!1;t=await s.text()}catch{return!1}let n=t.indexOf("fixedTimeSlots:[0,48,96,144,192,240]");if(n<0&&(n=t.indexOf('name:"Amber Moon"')),n<0)return!1;let r=zu(t,n);if(!r)return!1;let o=r.replace(/\b[A-Za-z_$][\w$]*\.(Rain|Frost|Dawn|AmberMoon)\b/g,'"$1"'),a;try{a=Function('"use strict";return('+o+")")()}catch{return!1}let i=$u(a);return i?(J.data.weather=i,!0):!1}function Ju(){if(J.weatherPollingTimer)return;J.weatherPollAttempts=0;let e=setInterval(async()=>{(await Ku()||++J.weatherPollAttempts>Bu)&&(clearInterval(e),J.weatherPollingTimer=null)},Uu);J.weatherPollingTimer=e}function qu(e){return String(e||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^A-Za-z0-9]/g,"").trim()}function Xu(e,t=[]){let n=new Set,r=o=>{let a=String(o||"").trim();a&&n.add(a)};r(e);for(let o of t)r(o);for(let o of Array.from(n.values()))o.endsWith("s")?r(o.slice(0,-1)):r(`${o}s`),o.endsWith("es")&&r(o.slice(0,-2));return Array.from(n.values()).filter(Boolean)}function vs(e,t,n,r=[],o=[]){let a=Xu(e,r);if(!a.length)return null;let i=[t,...o].filter(l=>typeof l=="string"),s=l=>{let c=String(l||"").trim();if(!c)return null;for(let p of a)try{if(ke.has(p,c))return ke.getIdPath(p,c)}catch{}return null};for(let l of i){let c=s(l);if(c)return c}let u=qu(n||""),d=s(u||n||"");if(d)return d;try{for(let l of a){let c=ke.listIds(`sprite/${l}/`),p=i.map(g=>String(g||"").toLowerCase()),m=String(n||u||"").toLowerCase();for(let g of c){let h=(g.split("/").pop()||"").toLowerCase();if(p.some(b=>b&&b===h)||h===m)return g}for(let g of c){let h=(g.split("/").pop()||"").toLowerCase();if(p.some(b=>b&&h.includes(b))||m&&h.includes(m))return g}}}catch{}return null}function ye(e,t,n,r,o=[],a=[]){if(!e||typeof e!="object")return;let i=e.tileRef;if(!i||typeof i!="object")return;let s=String(i.spritesheet||t||"").trim(),u=vs(s,n,r,o,a);if(u)try{e.spriteId=u}catch{}let d=e.rotationVariants;if(d&&typeof d=="object")for(let l of Object.values(d))ye(l,s,n,r);if(e.immatureTileRef){let l={tileRef:e.immatureTileRef};ye(l,s,n,r),l.spriteId&&(e.immatureSpriteId=l.spriteId)}if(e.topmostLayerTileRef){let l={tileRef:e.topmostLayerTileRef};ye(l,s,n,r),l.spriteId&&(e.topmostLayerSpriteId=l.spriteId)}e.activeState&&typeof e.activeState=="object"&&ye(e.activeState,s,n,e.activeState?.name||r)}function Yu(e,t,n,r=[]){if(!Array.isArray(t)||t.length===0)return null;let o=t[0],a=t.slice(1);return vs(e,o,n??null,r,a)}function Qu(e){for(let[t,n]of Object.entries(e.items||{}))ye(n,"items",t,n?.name,["item"]);for(let[t,n]of Object.entries(e.decor||{}))ye(n,"decor",t,n?.name);for(let[t,n]of Object.entries(e.mutations||{})){ye(n,"mutations",t,n?.name,["mutation"]);let r=Yu("mutation-overlay",[`${t}TallPlant`,`${t}TallPlantIcon`,t],n?.name,["mutation-overlay"]);if(r)try{n.overlaySpriteId=r}catch{}}for(let[t,n]of Object.entries(e.eggs||{}))ye(n,"pets",t,n?.name,["pet"]);for(let[t,n]of Object.entries(e.pets||{}))ye(n,"pets",t,n?.name,["pet"]);for(let[t,n]of Object.entries(e.plants||{})){let r=n;r.seed&&ye(r.seed,r.seed?.tileRef?.spritesheet||"seeds",`${t}Seed`,r.seed?.name||`${t} Seed`,["seed","plant","plants"],[t]),r.plant&&ye(r.plant,r.plant?.tileRef?.spritesheet||"plants",`${t}Plant`,r.plant?.name||`${t} Plant`,["plant","plants","tallplants"],[t]),r.crop&&ye(r.crop,r.crop?.tileRef?.spritesheet||"plants",t,r.crop?.name||t,["plant","plants"],[`${t}Crop`])}}async function Ss(){if(!J.spritesResolved)return J.spritesResolving||(J.spritesResolving=(async()=>{try{await ws(2e4,50),await ke.init(),Qu(J.data),J.spritesResolved=!0}catch(e){try{console.warn("[MGData] sprite resolution failed",e)}catch{}}finally{J.spritesResolving=null}})()),J.spritesResolving}async function Zu(){return J.isReady||(ys(),Ju(),Ss(),J.isReady=!0),!0}function ed(){return J.isReady}function td(){return xs(),J.weatherPollingTimer&&(clearInterval(J.weatherPollingTimer),J.weatherPollingTimer=null),J.isReady=!1,!0}function nd(){return!J.spritesResolved&&!J.spritesResolving&&Ss(),{...J.data}}function od(e){return J.data[e]??null}function rd(e){return J.data[e]!=null}async function ws(e=1e4,t=50){let n=Date.now();for(;Date.now()-n<e;){if(Object.values(J.data).some(r=>r!=null))return{...J.data};await Me(t)}throw new Error("MGData.waitForAnyData: timeout")}async function ad(e,t=1e4,n=50){let r=Date.now();for(;Date.now()-r<t;){let o=J.data[e];if(o!=null)return o;await Me(n)}throw new Error(`MGData.waitFor: timeout waiting for "${e}"`)}var Se={init:Zu,isReady:ed,stop:td,getAll:nd,get:od,has:rd,waitForAnyData:ws,waitFor:ad};ys();Ie();var Pn=null,we={ready:!1,xform:null,xformAt:0};function dt(e){try{if(typeof structuredClone=="function")return structuredClone(e)}catch{}try{return JSON.parse(JSON.stringify(e))}catch{}return e}function Rt(){return le.tos()}function Lo(){return le.engine()}function id(){let e=Rt()?.map?.cols;return Number.isFinite(e)&&e>0?e:null}function Ro(e,t){let n=id();return n?t*n+e|0:null}function $e(e,t,n=!0){let r=Rt(),o=Ro(e,t);if(!r||o==null)return{gidx:null,tv:null};let a=r.tileViews?.get?.(o)||null;if(!a&&n&&typeof r.getOrCreateTileView=="function")try{a=r.getOrCreateTileView(o)}catch{}return{gidx:o,tv:a||null}}function ut(e,t,n,r={}){let o=r.ensureView!==!1,a=r.forceUpdate!==!1,i=Lo(),{gidx:s,tv:u}=$e(Number(e),Number(t),o);if(s==null)throw new Error("MGTile: cols unavailable (engine/TOS not ready)");if(!u)throw new Error("MGTile: TileView unavailable (not instantiated)");let d=u.tileObject;if(typeof u.onDataChanged!="function")throw new Error("MGTile: tileView.onDataChanged not found (different API?)");if(u.onDataChanged(n),a&&i?.reusableContext&&typeof u.update=="function")try{u.update(i.reusableContext)}catch{}return{ok:!0,tx:Number(e),ty:Number(t),gidx:s,before:d,after:u.tileObject}}function Oo(e,t){if(!e)throw new Error("MGTile: no tileObject on this tile");if(e.objectType!==t)throw new Error(`MGTile: expected objectType "${t}", got "${e.objectType}"`)}function Io(e,t){if("startTime"in t&&(e.startTime=Number(t.startTime)),"endTime"in t&&(e.endTime=Number(t.endTime)),"targetScale"in t&&(e.targetScale=Number(t.targetScale)),"mutations"in t){if(!Array.isArray(t.mutations))throw new Error("MGTile: mutations must be an array of strings");e.mutations=t.mutations.slice()}}function Le(){if(!we.ready)throw new Error("MGTile: not ready. Call MGTile.init() first.")}function Eo(e){if(!e)return null;let t=o=>o&&(typeof o.getGlobalPosition=="function"||typeof o.toGlobal=="function"),n=["container","root","view","tile","ground","base","floor","bg","background","baseSprite","tileSprite","displayObject","gfx","graphics","sprite"];for(let o of n)if(t(e[o]))return e[o];if(t(e))return e;let r=[e.container,e.root,e.view,e.displayObject,e.tileSprite,e.gfx,e.graphics,e.sprite];for(let o of r)if(t(o))return o;try{for(let o of Object.keys(e))if(t(e[o]))return e[o]}catch{}return null}function An(e){let t=pe(()=>e?.getGlobalPosition?.());if(t&&Number.isFinite(t.x)&&Number.isFinite(t.y))return{x:t.x,y:t.y};let n=pe(()=>e?.toGlobal?.({x:0,y:0}));return n&&Number.isFinite(n.x)&&Number.isFinite(n.y)?{x:n.x,y:n.y}:null}function sd(e){try{if(!e?.getBounds)return"center";let t=e.getBounds(),n=An(e);if(!n||!t||!Number.isFinite(t.width)||!Number.isFinite(t.height))return"center";let r=t.x+t.width/2,o=t.y+t.height/2;return Math.hypot(n.x-r,n.y-o)<Math.hypot(n.x-t.x,n.y-t.y)?"center":"topleft"}catch{return"center"}}function ld(){let e=Rt(),t=e?.map?.cols,n=e?.map?.rows;if(!e||!Number.isFinite(t)||t<=1)return null;let r=Number.isFinite(n)&&n>1?n:null,o=[[0,0],[1,1],[Math.min(2,t-2),0],[0,1]];r&&r>2&&o.push([Math.floor(t/2),Math.floor(r/2)]);for(let[a,i]of o){if(a<0||i<0||a>=t||r&&i>=r)continue;let s=$e(a,i,!0).tv,u=a+1<t?$e(a+1,i,!0).tv:null,d=$e(a,i+1,!0).tv,l=Eo(s),c=Eo(u),p=Eo(d);if(!l||!c||!p)continue;let m=An(l),g=An(c),f=An(p);if(!m||!g||!f)continue;let h={x:g.x-m.x,y:g.y-m.y},b={x:f.x-m.x,y:f.y-m.y},S=h.x*b.y-h.y*b.x;if(!Number.isFinite(S)||Math.abs(S)<1e-6)continue;let v=1/S,x={a:b.y*v,b:-b.x*v,c:-h.y*v,d:h.x*v},w={x:m.x-a*h.x-i*b.x,y:m.y-a*h.y-i*b.y},k=sd(l),L=k==="center"?w:{x:w.x+.5*(h.x+b.x),y:w.y+.5*(h.y+b.y)};return{ok:!0,cols:t,rows:r,vx:h,vy:b,inv:x,anchorMode:k,originCenter:L}}return null}async function cd(e=15e3){return we.ready?!0:Pn||(Pn=(async()=>{if(await le.init(e),!Rt())throw new Error("MGTile: engine captured but tileObject system not found");return we.ready=!0,!0})(),Pn)}function ud(){return le.hook()}function Cn(e,t,n={}){Le();let r=n.ensureView!==!1,o=n.clone!==!1,{gidx:a,tv:i}=$e(Number(e),Number(t),r);if(a==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!i)return{tx:Number(e),ty:Number(t),gidx:a,tileView:null,tileObject:void 0};let s=i.tileObject;return{tx:Number(e),ty:Number(t),gidx:a,tileView:i,tileObject:o?dt(s):s}}function dd(e,t,n={}){return Le(),ut(e,t,null,n)}function pd(e,t,n,r={}){Le();let a=Cn(e,t,{...r,clone:!1}).tileView?.tileObject;Oo(a,"plant");let i=dt(a);if(Array.isArray(i.slots)||(i.slots=[]),"plantedAt"in n&&(i.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(i.maturedAt=Number(n.maturedAt)),"species"in n&&(i.species=String(n.species)),"slotIdx"in n&&"slotPatch"in n){let s=Number(n.slotIdx)|0;if(!i.slots[s])throw new Error(`MGTile: plant slot ${s} doesn't exist`);return Io(i.slots[s],n.slotPatch),ut(e,t,i,r)}if("slots"in n){let s=n.slots;if(Array.isArray(s)){for(let u=0;u<s.length;u++)if(s[u]!=null){if(!i.slots[u])throw new Error(`MGTile: plant slot ${u} doesn't exist`);Io(i.slots[u],s[u])}}else if(s&&typeof s=="object")for(let u of Object.keys(s)){let d=Number(u)|0;if(Number.isFinite(d)){if(!i.slots[d])throw new Error(`MGTile: plant slot ${d} doesn't exist`);Io(i.slots[d],s[d])}}else throw new Error("MGTile: patch.slots must be array or object map");return ut(e,t,i,r)}return ut(e,t,i,r)}function md(e,t,n,r={}){Le();let a=Cn(e,t,{...r,clone:!1}).tileView?.tileObject;Oo(a,"decor");let i=dt(a);return"rotation"in n&&(i.rotation=Number(n.rotation)),ut(e,t,i,r)}function gd(e,t,n,r={}){Le();let a=Cn(e,t,{...r,clone:!1}).tileView?.tileObject;Oo(a,"egg");let i=dt(a);return"plantedAt"in n&&(i.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(i.maturedAt=Number(n.maturedAt)),ut(e,t,i,r)}function fd(e,t,n,r={}){Le();let o=r.ensureView!==!1,a=r.forceUpdate!==!1,i=Lo(),{gidx:s,tv:u}=$e(Number(e),Number(t),o);if(s==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!u)throw new Error("MGTile: TileView unavailable");let d=u.tileObject,l=typeof n=="function"?n(dt(d)):n;if(u.onDataChanged(l),a&&i?.reusableContext&&typeof u.update=="function")try{u.update(i.reusableContext)}catch{}return{ok:!0,tx:Number(e),ty:Number(t),gidx:s,before:d,after:u.tileObject}}function bd(e,t,n={}){Le();let r=n.ensureView!==!1,{gidx:o,tv:a}=$e(Number(e),Number(t),r);if(o==null)throw new Error("MGTile: cols unavailable");if(!a)return{ok:!0,tx:Number(e),ty:Number(t),gidx:o,tv:null,tileObject:void 0};let i=n.clone!==!1,s=a.tileObject;return{ok:!0,tx:Number(e),ty:Number(t),gidx:o,objectType:s?.objectType??null,tileObject:i?dt(s):s,tvKeys:Object.keys(a||{}).sort(),tileView:a}}function Ts(){return Le(),we.xform=ld(),we.xformAt=Date.now(),{ok:!!we.xform?.ok,xform:we.xform}}function hd(e,t={}){if(Le(),!e||!Number.isFinite(e.x)||!Number.isFinite(e.y))return null;let n=Number.isFinite(t.maxAgeMs)?Number(t.maxAgeMs):1500;(!we.xform?.ok||t.forceRebuild||Date.now()-we.xformAt>n)&&Ts();let r=we.xform;if(!r?.ok)return null;let o=e.x-r.originCenter.x,a=e.y-r.originCenter.y,i=r.inv.a*o+r.inv.b*a,s=r.inv.c*o+r.inv.d*a,u=Math.floor(i),d=Math.floor(s),l=[[u,d],[u+1,d],[u,d+1],[u+1,d+1]],c=null,p=1/0;for(let[m,g]of l){if(m<0||g<0||m>=r.cols||Number.isFinite(r.rows)&&r.rows!==null&&g>=r.rows)continue;let f=r.originCenter.x+m*r.vx.x+g*r.vy.x,h=r.originCenter.y+m*r.vx.y+g*r.vy.y,b=(e.x-f)**2+(e.y-h)**2;b<p&&(p=b,c={tx:m,ty:g,fx:i,fy:s,x:e.x,y:e.y,gidx:null})}return c?(c.gidx=Ro(c.tx,c.ty),c):null}function yd(){return["MGTile.init()","MGTile.hook()","MGTile.getTileObject(tx,ty) / inspect(tx,ty)","MGTile.setTileEmpty(tx,ty)","MGTile.setTilePlant(tx,ty,{...}) / setTileDecor / setTileEgg","MGTile.setTileObjectRaw(tx,ty,objOrFn)","MGTile.rebuildTransform() / pointToTile({x,y})"].join(`
`)}var Pe={init:cd,ready:()=>we.ready,hook:ud,engine:()=>Lo(),tos:()=>Rt(),gidx:(e,t)=>Ro(Number(e),Number(t)),getTileObject:Cn,inspect:bd,setTileEmpty:dd,setTilePlant:pd,setTileDecor:md,setTileEgg:gd,setTileObjectRaw:fd,rebuildTransform:Ts,pointToTile:hd,help:yd};Ie();var V={ready:!1,app:null,renderer:null,stage:null,ticker:null,tileSets:new Map,highlights:new Map,watches:new Map,fades:new Map,fadeWatches:new Map},_o=e=>!!e&&typeof e=="object"&&!Array.isArray(e),Do=e=>!!(e&&typeof e.getBounds=="function"&&("parent"in e||"children"in e)),In=e=>!!(e&&typeof e.tint=="number"),Ke=e=>!!(e&&typeof e.alpha=="number");function Mn(e,t,n){return e+(t-e)*n}function xd(e,t,n){let r=e>>16&255,o=e>>8&255,a=e&255,i=t>>16&255,s=t>>8&255,u=t&255,d=Mn(r,i,n)|0,l=Mn(o,s,n)|0,c=Mn(a,u,n)|0;return d<<16|l<<8|c}function vd(e,t=900){let n=[],r=[e];for(;r.length&&n.length<t;){let o=r.pop();if(!o)continue;In(o)&&n.push(o);let a=o.children;if(Array.isArray(a))for(let i=a.length-1;i>=0;i--)r.push(a[i])}return n}function Sd(e,t=25e3){let n=[],r=[e],o=0;for(;r.length&&o++<t;){let a=r.pop();if(!a)continue;Ke(a)&&n.push(a);let i=a.children;if(Array.isArray(i))for(let s=i.length-1;s>=0;s--)r.push(i[s])}return n}function ks(e){if(!Array.isArray(e))return[];let t=new Set,n=[];for(let r of e){let o,a;if(Array.isArray(r))o=r[0],a=r[1];else if(_o(r))o=r.x??r.tx,a=r.y??r.ty;else continue;if(o=Number(o),a=Number(a),!Number.isFinite(o)||!Number.isFinite(a))continue;o|=0,a|=0;let i=`${o},${a}`;t.has(i)||(t.add(i),n.push({x:o,y:a}))}return n}function wd(e,t){let n=String(e||"").trim();if(!n)throw new Error("MGPixi.defineTileSet: empty name");let r=ks(t);return V.tileSets.set(n,r),{ok:!0,name:n,count:r.length}}function Td(e){return V.tileSets.delete(String(e||"").trim())}function kd(){return Array.from(V.tileSets.keys()).sort((e,t)=>e.localeCompare(t))}function Ps(e){return!!(e&&(e.tileSet!=null||Array.isArray(e.tiles)))}function Wo(e){let n=Pe.tos?.()?.tileViews;if(!n?.entries)throw new Error("MGPixi: TOS.tileViews not found");if(!Ps(e))return{entries:Array.from(n.entries()),gidxSet:null};let r=[];if(e.tileSet!=null){let a=String(e.tileSet||"").trim(),i=V.tileSets.get(a);if(!i)throw new Error(`MGPixi: tileSet not found "${a}"`);r=i}else r=ks(e.tiles||[]);let o=new Map;for(let a of r){let i=Pe.getTileObject(a.x,a.y,{ensureView:!0,clone:!1});i?.tileView&&i.gidx!=null&&o.set(i.gidx,i.tileView)}return{entries:Array.from(o.entries()),gidxSet:new Set(o.keys())}}function jo(e){let t=V.highlights.get(e);if(!t)return!1;pe(()=>V.ticker?.remove(t.tick)),t.root&&t.baseAlpha!=null&&Ke(t.root)&&pe(()=>{t.root.alpha=t.baseAlpha});for(let n of t.tint)n.o&&In(n.o)&&pe(()=>{n.o.tint=n.baseTint});return V.highlights.delete(e),!0}function As(e=null){for(let t of Array.from(V.highlights.keys()))e&&!String(t).startsWith(e)||jo(t);return!0}function Cs(e,t={}){if(Je(),!Do(e))throw new Error("MGPixi.highlightPulse: invalid root");let n=String(t.key||`hl:${Math.random().toString(16).slice(2)}`);if(V.highlights.has(n))return n;let r=Ke(e)?Number(e.alpha):null,o=ge(Number(t.minAlpha??.12),0,1),a=ge(Number(t.maxAlpha??1),0,1),i=Number(t.speed??1.25),s=(t.tint??8386303)>>>0,u=ge(Number(t.tintMix??.85),0,1),d=t.deepTint!==!1,l=[];if(d)for(let m of vd(e))l.push({o:m,baseTint:m.tint});else In(e)&&l.push({o:e,baseTint:e.tint});let c=performance.now(),p=()=>{let m=(performance.now()-c)/1e3,g=(Math.sin(m*Math.PI*2*i)+1)/2,f=g*g*(3-2*g);r!=null&&Ke(e)&&(e.alpha=ge(Mn(o,a,f)*r,0,1));let h=f*u;for(let b of l)b.o&&In(b.o)&&(b.o.tint=xd(b.baseTint,s,h))};return V.ticker?.add(p),V.highlights.set(n,{root:e,tick:p,baseAlpha:r,tint:l}),n}var Pd=["plantVisual","cropVisual","slotVisual","slotView","displayObject","view","container","root","sprite","gfx","graphics"];function Go(e){if(!e)return null;if(Do(e))return e;if(!_o(e))return null;for(let t of Pd){let n=e[t];if(Do(n))return n}return null}function Ad(e,t){let n=[{o:e,d:0}],r=new Set,o=6;for(;n.length;){let{o:a,d:i}=n.shift();if(!(!a||i>o)&&!r.has(a)){if(r.add(a),Array.isArray(a)){if(a.length===t){let s=new Array(t),u=!0;for(let d=0;d<t;d++){let l=Go(a[d]);if(!l){u=!1;break}s[d]=l}if(u)return s}for(let s of a)n.push({o:s,d:i+1});continue}if(_o(a)){let s=a;for(let u of Object.keys(s))n.push({o:s[u],d:i+1})}}}return null}function Cd(e,t){let n=e?.mutations;if(!Array.isArray(n))return!1;for(let r of n)if(String(r||"").toLowerCase()===t)return!0;return!1}function Ms(e,t={}){Je();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.highlightMutation: empty mutation");let{entries:r,gidxSet:o}=Wo(t),a=`hlmut:${n}:`;if(t.clear===!0)if(!o)As(a);else for(let c of Array.from(V.highlights.keys())){if(!c.startsWith(a))continue;let p=c.split(":"),m=Number(p[2]);o.has(m)&&jo(c)}let i={tint:(t.tint??8386303)>>>0,minAlpha:Number(t.minAlpha??.12),maxAlpha:Number(t.maxAlpha??1),speed:Number(t.speed??1.25),tintMix:Number(t.tintMix??.85),deepTint:t.deepTint!==!1},s=0,u=0,d=0,l=0;for(let[c,p]of r){let m=p?.tileObject;if(!m||m.objectType!=="plant")continue;let g=m.slots;if(!Array.isArray(g)||g.length===0)continue;let f=!1,h=[];for(let v=0;v<g.length;v++)Cd(g[v],n)&&(h.push(v),f=!0);if(!f)continue;s++,u+=h.length;let b=p?.childView?.plantVisual||p?.childView||p,S=Ad(b,g.length);if(!S){l+=h.length;continue}for(let v of h){let x=S[v];if(!x){l++;continue}let w=`${a}${c}:${v}`;V.highlights.has(w)||(Cs(x,{key:w,...i}),d++)}}return{ok:!0,mutation:n,filtered:!!o,plantsMatched:s,matchedSlots:u,newHighlights:d,failedSlots:l}}function Md(e,t={}){Je();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchMutation: empty mutation");let r=`watchmut:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,o=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,a=V.watches.get(r);a&&clearInterval(a);let i=setInterval(()=>{pe(()=>Ms(n,{...t,clear:!1}))},o);return V.watches.set(r,i),{ok:!0,key:r,mutation:n,intervalMs:o}}function Id(e){let t=String(e||"").trim();if(!t)return!1;if(!t.startsWith("watchmut:")){let r=t.toLowerCase(),o=0;for(let[a,i]of Array.from(V.watches.entries()))a.startsWith(`watchmut:${r}:`)&&(clearInterval(i),V.watches.delete(a),o++);return o>0}let n=V.watches.get(t);return n?(clearInterval(n),V.watches.delete(t),!0):!1}function Ed(e){let t=Array.isArray(e?.slots)?e.slots:[];return{objectType:"plant",species:e?.species??null,plantedAt:e?.plantedAt??null,maturedAt:e?.maturedAt??null,slotCount:t.length,slots:t.map((n,r)=>({idx:r,mutations:Array.isArray(n?.mutations)?n.mutations.slice():[]}))}}function Ld(e,t,n={}){Je();let r=Number(e)|0,o=Number(t)|0,a=n.ensureView!==!1,i=Pe.getTileObject(r,o,{ensureView:a,clone:!1}),s=i?.tileView||null,u=s?.tileObject,d={ok:!0,tx:r,ty:o,gidx:i?.gidx??Pe.gidx?.(r,o)??null,hasTileView:!!s,objectType:u?.objectType??null,tileObject:u??null,summary:u?.objectType==="plant"?Ed(u):u?{objectType:u.objectType??null}:null,display:s?s.childView?.plantVisual||s.childView||s.displayObject||s:null};return n.log!==!1&&pe(()=>console.log("[MGPixi.inspectTile]",d)),d}function Rd(e){let t=e?.childView?.plantVisual||e?.childView?.cropVisual||e?.childView||e?.displayObject||e;return Go(t)||Go(e?.displayObject)||null}function Is(e){let t=V.fades.get(e);if(!t)return!1;for(let n of t.targets)n.o&&Ke(n.o)&&Number.isFinite(n.baseAlpha)&&pe(()=>{n.o.alpha=n.baseAlpha});return V.fades.delete(e),!0}function Ho(e=null){for(let t of Array.from(V.fades.keys()))e&&!String(t).startsWith(e)||Is(t);return!0}function Es(e,t={}){Je();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.clearSpeciesFade: empty species");let r=`fade:${n}:`;if(!Ps(t))return Ho(r);let{gidxSet:o}=Wo(t);if(!o)return Ho(r);for(let a of Array.from(V.fades.keys())){if(!a.startsWith(r))continue;let i=Number(a.slice(r.length));o.has(i)&&Is(a)}return!0}function Ls(e,t={}){Je();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.fadeSpecies: empty species");let r=ge(Number(t.alpha??.2),0,1),o=t.deep===!0,{entries:a,gidxSet:i}=Wo(t),s=`fade:${n}:`;t.clear===!0&&Es(n,t);let u=0,d=0,l=0,c=0;for(let[p,m]of a){let g=m?.tileObject;if(!g||g.objectType!=="plant")continue;u++;let f=String(g.species||"").trim().toLowerCase();if(!f||f!==n)continue;d++;let h=Rd(m);if(!h||!Ke(h)){c++;continue}let b=`${s}${p}`;if(V.fades.has(b)){pe(()=>{h.alpha=r}),l++;continue}let S=o?Sd(h):[h],v=[];for(let x of S)Ke(x)&&v.push({o:x,baseAlpha:Number(x.alpha)});for(let x of v)pe(()=>{x.o.alpha=r});V.fades.set(b,{targets:v}),l++}return{ok:!0,species:n,alpha:r,deep:o,filtered:!!i,plantsSeen:u,matchedPlants:d,applied:l,failed:c,totalFades:V.fades.size}}function Od(e,t={}){Je();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchFadeSpecies: empty species");let r=`watchfade:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,o=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,a=V.fadeWatches.get(r);a&&clearInterval(a);let i=setInterval(()=>{pe(()=>Ls(n,{...t,clear:!1}))},o);return V.fadeWatches.set(r,i),{ok:!0,key:r,species:n,intervalMs:o}}function Dd(e){let t=String(e||"").trim();if(!t)return!1;if(!t.startsWith("watchfade:")){let r=t.toLowerCase(),o=0;for(let[a,i]of Array.from(V.fadeWatches.entries()))a.startsWith(`watchfade:${r}:`)&&(clearInterval(i),V.fadeWatches.delete(a),o++);return o>0}let n=V.fadeWatches.get(t);return n?(clearInterval(n),V.fadeWatches.delete(t),!0):!1}function No(){let e=A;return e.$PIXI=e.PIXI||null,e.$app=V.app||null,e.$renderer=V.renderer||null,e.$stage=V.stage||null,e.$ticker=V.ticker||null,e.__MG_PIXI__={PIXI:e.$PIXI,app:e.$app,renderer:e.$renderer,stage:e.$stage,ticker:e.$ticker,ready:V.ready},e.__MG_PIXI__}function Je(){if(!V.ready)throw new Error("MGPixi: call MGPixi.init() first")}async function Gd(e=15e3){if(V.ready)return No(),!0;if(await le.init(e),V.app=le.app(),V.ticker=le.ticker(),V.renderer=le.renderer(),V.stage=le.stage(),!V.app||!V.ticker)throw new Error("MGPixi: PIXI app/ticker not found");return V.ready=!0,No(),!0}var Ot={init:Gd,ready:()=>V.ready,expose:No,get app(){return V.app},get renderer(){return V.renderer},get stage(){return V.stage},get ticker(){return V.ticker},get PIXI(){return A.PIXI||null},defineTileSet:wd,deleteTileSet:Td,listTileSets:kd,highlightPulse:Cs,stopHighlight:jo,clearHighlights:As,highlightMutation:Ms,watchMutation:Md,stopWatchMutation:Id,inspectTile:Ld,fadeSpecies:Ls,clearSpeciesFade:Es,clearFades:Ho,watchFadeSpecies:Od,stopWatchFadeSpecies:Dd};Ie();var Rs=A??window,Hd={sfx:"soundEffectsVolume",music:"musicVolume",ambience:"ambienceVolume"},Nd={sfx:"soundEffectsVolumeAtom",music:"musicVolumeAtom",ambience:"ambienceVolumeAtom"},Dt=.001,Gt=.2,En=null,$={ready:!1,baseUrl:null,urls:{ambience:new Map,music:new Map},sfx:{mp3Url:null,atlasUrl:null,atlas:null,groups:new Map,buffer:null},tracks:{ambience:null,music:null},ctx:null};function Nt(){if(!$.ready)throw new Error("MGAudio not ready yet")}function Os(e,t=NaN){try{let n=localStorage.getItem(e);if(n==null)return t;let r;try{r=JSON.parse(n)}catch{r=n}if(typeof r=="number"&&Number.isFinite(r))return r;if(typeof r=="string"){let o=parseFloat(r);if(Number.isFinite(o))return o}}catch{}return t}function Ht(e){let t=Hd[e],n=Nd[e];if(!t)return{atom:Gt,vol100:Ln(Gt)};let r=Os(t,NaN);if(Number.isFinite(r)){let a=ge(r,0,1);return{atom:a,vol100:Ln(a)}}if(n){let a=Os(n,NaN);if(Number.isFinite(a)){let i=ge(a,0,1);return{atom:i,vol100:Ln(i)}}}let o=Gt;return{atom:o,vol100:Ln(o)}}function _d(e){let t=Number(e);if(!Number.isFinite(t))return null;if(t<=0)return 0;let r=(ge(t,1,100)-1)/99;return Dt+r*(Gt-Dt)}function Ln(e){let t=ge(Number(e),0,1);if(t<=Dt)return 0;let n=(t-Dt)/(Gt-Dt);return Math.round(1+n*99)}function Ds(e,t){if(t==null)return Ht(e).atom;let n=_d(t);return n===null?Ht(e).atom:uo(n)}async function Gs(){let e=$.ctx;if(e)return e;let t=Rs.AudioContext||Rs.webkitAudioContext;if(!t)throw new Error("WebAudio not supported");let n=new t;return $.ctx=n,n}async function Hs(){if($.ctx&&$.ctx.state==="suspended")try{await $.ctx.resume()}catch{}}function Wd(e){let t=new Map,n=(r,o)=>{t.has(r)||t.set(r,[]),t.get(r).push(o)};for(let r of Object.keys(e||{})){let o=/^(.*)_([A-Z])$/.exec(r);o?.[1]?n(o[1],r):n(r,r)}for(let[r,o]of Array.from(t.entries()))o.sort((a,i)=>a.localeCompare(i)),t.set(r,o);$.sfx.groups=t}function jd(e){let t=$.sfx.atlas;if(!t)throw new Error("SFX atlas not loaded");if(t[e])return e;let n=$.sfx.groups.get(e);if(n?.length)return n[Math.random()*n.length|0];throw new Error(`Unknown sfx/group: ${e}`)}async function Bd(){if($.sfx.buffer)return $.sfx.buffer;if(!$.sfx.mp3Url)throw new Error("SFX mp3 url missing");let e=await Gs();await Hs();let n=await(await fn($.sfx.mp3Url)).arrayBuffer(),r=await new Promise((o,a)=>{let i=e.decodeAudioData(n,o,a);i?.then&&i.then(o,a)});return $.sfx.buffer=r,r}async function Ud(e,t={}){if(!$.ready)throw new Error("MGAudio not ready yet");let n=String(e||"").trim();if(!n)throw new Error("Missing sfx name");let r=jd(n),o=$.sfx.atlas[r];if(!o)throw new Error(`Missing segment for sfx: ${r}`);let a=await Gs();await Hs();let i=await Bd(),s=Math.max(0,+o.start||0),u=Math.max(s,+o.end||s),d=Math.max(.01,u-s),l=Ds("sfx",t.volume),c=a.createGain();c.gain.value=l,c.connect(a.destination);let p=a.createBufferSource();return p.buffer=i,p.connect(c),p.start(0,s,d),{name:r,source:p,start:s,end:u,duration:d,volume:l}}function Ns(e){if(e!=="music"&&e!=="ambience")return!1;let t=$.tracks[e];if(t){try{t.pause()}catch{}try{t.src=""}catch{}}return $.tracks[e]=null,!0}function Fd(e,t,n={}){if(!$.ready)throw new Error("MGAudio not ready yet");if(e!=="music"&&e!=="ambience")throw new Error(`Invalid category: ${e}`);let r=$.urls[e].get(t);if(!r)throw new Error(`Unknown ${e}: ${t}`);Ns(e);let o=new Audio(r);return o.loop=!!n.loop,o.volume=Ds(e,n.volume),o.preload="auto",o.play().catch(()=>{}),$.tracks[e]=o,o}async function Vd(e,t,n={}){let r=String(e||"").trim(),o=String(t||"").trim();if(!r||!o)throw new Error("play(category, asset) missing args");if(r==="sfx")return Ud(o,n);if(r==="music"||r==="ambience")return Fd(r,o,n);throw new Error(`Unknown category: ${r}`)}function zd(e,t={}){let n=String(e||"").trim();return n==="music"||n==="ambience"?Array.from($.urls[n].keys()).sort():n==="sfx"?$.sfx.atlas?t.groups?Array.from($.sfx.groups.keys()).sort():Object.keys($.sfx.atlas).sort():[]:[]}function $d(){return $.tracks.music&&($.tracks.music.volume=Ht("music").atom),$.tracks.ambience&&($.tracks.ambience.volume=Ht("ambience").atom),!0}function Kd(){return Nt(),["sfx","music","ambience"]}function Jd(){return Nt(),Array.from($.sfx.groups.keys()).sort((e,t)=>e.localeCompare(t))}function qd(e,t){Nt();let n=String(e||"").trim().toLowerCase(),r=String(t||"").trim();if(!r||n!=="music"&&n!=="ambience")return!1;let o=$.urls[n],a=r.toLowerCase();for(let i of o.keys())if(i.toLowerCase()===a)return!0;return!1}function Xd(e){Nt();let t=String(e||"").trim();if(!t)return!1;let n=t.toLowerCase();for(let r of $.sfx.groups.keys())if(r.toLowerCase()===n)return!0;return!1}function Yd(e,t){Nt();let n=String(e||"").trim().toLowerCase(),r=String(t||"").trim();if(!r)throw new Error("getTrackUrl(category, name) missing name");if(n!=="music"&&n!=="ambience")throw new Error(`Invalid category: ${e}`);let o=$.urls[n],a=r.toLowerCase();for(let[i,s]of o.entries())if(i.toLowerCase()===a)return s;return null}async function Qd(){return $.ready?!0:En||(En=(async()=>{$.baseUrl=await ve.base();let e=await fe.load($.baseUrl),t=fe.getBundle(e,"audio");if(!t)throw new Error("No audio bundle in manifest");for(let n of t.assets||[])for(let r of n.src||[]){if(typeof r!="string")continue;let o=/^audio\/(ambience|music)\/(.+)\.mp3$/i.exec(r);if(o){let a=o[1].toLowerCase(),i=o[2];$.urls[a].set(i,me($.baseUrl,r));continue}/^audio\/sfx\/sfx\.mp3$/i.test(r)&&($.sfx.mp3Url=me($.baseUrl,r)),/^audio\/sfx\/sfx\.json$/i.test(r)&&($.sfx.atlasUrl=me($.baseUrl,r))}if(!$.sfx.atlasUrl)throw new Error("Missing audio/sfx/sfx.json in manifest");return $.sfx.atlas=await at($.sfx.atlasUrl),Wd($.sfx.atlas),$.ready=!0,!0})(),En)}var _t={init:Qd,ready:()=>$.ready,play:Vd,stop:Ns,list:zd,refreshVolumes:$d,categoryVolume:Ht,getCategories:Kd,getGroups:Jd,hasTrack:qd,hasGroup:Xd,getTrackUrl:Yd};var Bo=A?.document??document,Rn=null,Z={ready:!1,baseUrl:null,byCat:new Map,byBase:new Map,overlay:null,live:new Set,defaultParent:null};function Zd(){if(Z.overlay)return Z.overlay;let e=Bo.createElement("div");return e.id="MG_COSMETIC_OVERLAY",e.style.cssText=["position:fixed","left:0","top:0","width:100vw","height:100vh","pointer-events:none","z-index:99999999"].join(";"),Bo.documentElement.appendChild(e),Z.overlay=e,e}function ep(){let e=Z.defaultParent;if(!e)return null;try{return typeof e=="function"?e():e}catch{return null}}function Uo(e){let t=String(e||"").trim();return t?(t=t.replace(/^cosmetic\//i,""),t=t.replace(/\.png$/i,""),t):""}function tp(e,t){if(t===void 0){let a=Uo(e),i=a.indexOf("_");return i<0?{cat:"",asset:a,base:a}:{cat:a.slice(0,i),asset:a.slice(i+1),base:a}}let n=String(e||"").trim(),r=Uo(t),o=r.includes("_")?r:`${n}_${r}`;if(r.includes("_")&&!n){let a=r.indexOf("_");return{cat:r.slice(0,a),asset:r.slice(a+1),base:r}}return{cat:n,asset:r.replace(/^.+?_/,""),base:o}}function np(){return Array.from(Z.byCat.keys()).sort((e,t)=>e.localeCompare(t))}function op(e){let t=Z.byCat.get(String(e||"").trim());return t?Array.from(t.keys()).sort((n,r)=>n.localeCompare(r)):[]}function Fo(e,t){let{cat:n,asset:r,base:o}=tp(e,t),a=Z.byBase.get(o);if(a)return a;let s=Z.byCat.get(n)?.get(r);if(s)return s;if(!Z.baseUrl)throw new Error("MGCosmetic not initialized");if(!o)throw new Error("Invalid cosmetic name");return me(Z.baseUrl,`cosmetic/${o}.png`)}function Vo(e,t,n){if(!Z.ready)throw new Error("MGCosmetic not ready yet");let r,o;typeof t=="object"&&t!==null?(r=t,o=void 0):typeof t=="string"?(o=t,r=n||{}):(o=void 0,r=n||{});let a=o!==void 0?Fo(e,o):Fo(e),i=Bo.createElement("img");if(i.decoding="async",i.loading="eager",i.src=a,i.alt=r.alt!=null?String(r.alt):Uo(o??e),r.className&&(i.className=String(r.className)),r.width!=null&&(i.style.width=String(r.width)),r.height!=null&&(i.style.height=String(r.height)),r.opacity!=null&&(i.style.opacity=String(r.opacity)),r.style&&typeof r.style=="object")for(let[s,u]of Object.entries(r.style))try{i.style[s]=String(u)}catch{}return i}function rp(e,t,n){let r,o;typeof t=="object"&&t!==null?(r=t,o=void 0):typeof t=="string"?(o=t,r=n||{}):(o=void 0,r=n||{});let a=r.parent||ep()||Zd(),i=o!==void 0?Vo(e,o,r):Vo(e,r);if(a===Z.overlay||r.center||r.x!=null||r.y!=null||r.absolute){i.style.position="absolute",i.style.pointerEvents="none",i.style.zIndex=String(r.zIndex??999999);let u=r.scale??1,d=r.rotation??0;if(r.center)i.style.left="50%",i.style.top="50%",i.style.transform=`translate(-50%, -50%) scale(${u}) rotate(${d}rad)`;else{let l=r.x??innerWidth/2,c=r.y??innerHeight/2;i.style.left=`${l}px`,i.style.top=`${c}px`,i.style.transform=`scale(${u}) rotate(${d}rad)`,r.anchor==="center"&&(i.style.transform=`translate(-50%, -50%) scale(${u}) rotate(${d}rad)`)}}return a.appendChild(i),Z.live.add(i),i.__mgDestroy=()=>{try{i.remove()}catch{}Z.live.delete(i)},i}function ap(e){return Z.defaultParent=e,!0}function ip(){for(let e of Array.from(Z.live))e.__mgDestroy?.()}async function sp(){return Z.ready?!0:Rn||(Rn=(async()=>{Z.baseUrl=await ve.base();let e=await fe.load(Z.baseUrl),t=fe.getBundle(e,"cosmetic");if(!t)throw new Error("No 'cosmetic' bundle in manifest");Z.byCat.clear(),Z.byBase.clear();for(let n of t.assets||[])for(let r of n.src||[]){if(typeof r!="string"||!/^cosmetic\/.+\.png$/i.test(r))continue;let a=r.split("/").pop().replace(/\.png$/i,""),i=a.indexOf("_");if(i<0)continue;let s=a.slice(0,i),u=a.slice(i+1),d=me(Z.baseUrl,r);Z.byBase.set(a,d),Z.byCat.has(s)||Z.byCat.set(s,new Map),Z.byCat.get(s).set(u,d)}return Z.ready=!0,!0})(),Rn)}var Wt={init:sp,ready:()=>Z.ready,categories:np,list:op,url:Fo,create:Vo,show:rp,attach:ap,clear:ip};var Dn={};Xt(Dn,{AchievementManager:()=>On,destroyAchievementManager:()=>cp,getAchievementManager:()=>lp});var On=class{constructor(){ee(this,"achievements",new Map);ee(this,"data");ee(this,"storageKey","gemini_achievements");ee(this,"onUnlockCallbacks",[]);ee(this,"onProgressCallbacks",[]);this.data=this.loadData()}loadData(){try{let t=localStorage.getItem(this.storageKey);if(t)return JSON.parse(t)}catch(t){console.warn("[Achievements] Failed to load data:",t)}return{unlocked:{},progress:{}}}saveData(){try{localStorage.setItem(this.storageKey,JSON.stringify(this.data))}catch(t){console.warn("[Achievements] Failed to save data:",t)}}register(t){this.achievements.set(t.id,t),this.data.progress[t.id]||(this.data.progress[t.id]={current:0,target:t.target,percentage:0})}registerMany(t){for(let n of t)this.register(n)}async checkAchievement(t){let n=this.achievements.get(t);if(!n)throw new Error(`Achievement not found: ${t}`);let r=this.isUnlocked(t),o=await n.checkProgress(),a={current:o,target:n.target,percentage:Math.min(100,Math.floor(o/n.target*100))},i=this.data.progress[t];this.data.progress[t]=a;let s=o>=n.target;return!r&&s?this.unlock(t,a):s||this.triggerProgressCallbacks({achievement:n,progress:a,previousProgress:i}),this.saveData(),{id:t,wasUnlocked:r,isUnlocked:s,progress:a}}async checkAllAchievements(){let t=[];for(let n of this.achievements.keys()){let r=await this.checkAchievement(n);t.push(r)}return t}unlock(t,n){let r=this.achievements.get(t);if(!r)return;let o={achievementId:t,unlockedAt:Date.now(),progress:n};this.data.unlocked[t]=o,this.saveData(),this.triggerUnlockCallbacks({achievement:r,unlockedAt:o.unlockedAt,progress:n})}isUnlocked(t){return!!this.data.unlocked[t]}getAchievement(t){return this.achievements.get(t)||null}getAllAchievements(){return Array.from(this.achievements.values())}getAchievementsByCategory(t){return Array.from(this.achievements.values()).filter(n=>n.category===t)}getAchievementsByRarity(t){return Array.from(this.achievements.values()).filter(n=>n.rarity===t)}getUnlockedAchievements(){return Object.values(this.data.unlocked)}getLockedAchievements(){return Array.from(this.achievements.values()).filter(t=>!this.isUnlocked(t.id)&&!t.hidden)}getProgress(t){return this.data.progress[t]||null}getCompletionPercentage(){let t=this.achievements.size,n=Object.keys(this.data.unlocked).length;return t>0?Math.floor(n/t*100):0}getCompletionStats(){let t=this.achievements.size,n=Object.keys(this.data.unlocked).length,r=t-n,o=this.getCompletionPercentage();return{total:t,unlocked:n,locked:r,percentage:o}}onUnlock(t){return this.onUnlockCallbacks.push(t),()=>{let n=this.onUnlockCallbacks.indexOf(t);n!==-1&&this.onUnlockCallbacks.splice(n,1)}}onProgress(t){return this.onProgressCallbacks.push(t),()=>{let n=this.onProgressCallbacks.indexOf(t);n!==-1&&this.onProgressCallbacks.splice(n,1)}}triggerUnlockCallbacks(t){for(let n of this.onUnlockCallbacks)try{n(t)}catch(r){console.warn("[Achievements] Unlock callback error:",r)}}triggerProgressCallbacks(t){for(let n of this.onProgressCallbacks)try{n(t)}catch(r){console.warn("[Achievements] Progress callback error:",r)}}reset(){this.data={unlocked:{},progress:{}};for(let t of this.achievements.values())this.data.progress[t.id]={current:0,target:t.target,percentage:0};this.saveData()}exportData(){return JSON.stringify(this.data,null,2)}importData(t){try{let n=JSON.parse(t);return this.data=n,this.saveData(),!0}catch(n){return console.warn("[Achievements] Failed to import data:",n),!1}}},jt=null;function lp(){return jt||(jt=new On),jt}function cp(){jt&&(jt=null)}var _n={};Xt(_n,{calculateCropProgress:()=>js,calculateCropSellPrice:()=>Ko,calculateCropSize:()=>Ws,calculateCurrentStrength:()=>Ye,calculateHoursToMature:()=>hp,calculateHoursToMaxStrength:()=>qo,calculateMaxStrength:()=>Xe,calculateMutationMultiplier:()=>Gn,calculatePetAge:()=>qe,calculateStrengthPerHour:()=>Nn,calculateStrengthProgress:()=>Xo,calculateTimeRemaining:()=>gp,calculateTotalCropValue:()=>fp,getAllMutationNames:()=>pp,getCropData:()=>Hn,getMutationInfo:()=>mp,getMutationValue:()=>zo,getPetData:()=>Ze,isCropReady:()=>Bs,isEnvironmentalMutation:()=>_s,isGrowthMutation:()=>$o,isPetMature:()=>Qe});var pt={Gold:25,Rainbow:50,Frozen:10,Chilled:5,Wet:2},up=new Set(["Gold","Rainbow"]),dp=new Set(["Frozen","Chilled","Wet"]);function Gn(e){let t=1,n=0,r=0;for(let o of e)o==="Gold"||o==="Rainbow"?o==="Rainbow"?t=pt.Rainbow:t===1&&(t=pt.Gold):o in pt&&(n+=pt[o],r++);return t*(1+n-r)}function zo(e){return pt[e]??null}function $o(e){return up.has(e)}function _s(e){return dp.has(e)}function pp(){return Object.keys(pt)}function mp(e){let t=zo(e);return t===null?null:{name:e,value:t,type:$o(e)?"growth":"environmental"}}function Ws(e,t){let n=Hn(e);if(!n)return 50;let r=n.maxScale;if(t<=1)return 50;if(t>=r)return 100;let o=(t-1)/(r-1);return Math.floor(50+50*o)}function Ko(e,t,n){let r=Hn(e);if(!r)return 0;let o=r.baseSellPrice,a=Gn(n);return Math.round(o*t*a)}function js(e,t,n){if(n>=t)return 100;if(n<=e)return 0;let r=t-e,o=n-e;return Math.floor(o/r*100)}function Bs(e,t){return t>=e}function gp(e,t){let n=Math.max(0,e-t);return Math.floor(n/1e3)}function Hn(e){let t=Se.get("plants");if(!t)return null;let n=t[e];return n?.crop?{baseSellPrice:n.crop.baseSellPrice??0,maxScale:n.crop.maxScale??1,growTime:n.crop.growTime??0}:null}function fp(e){return e.reduce((t,n)=>t+Ko(n.species,n.targetScale,n.mutations),0)}var Us=3600,Jo=80,bp=100,Bt=30;function qe(e){return e/Us}function Xe(e,t){let n=Ze(e);if(!n)return Jo;let r=n.maxScale;if(t<=1)return Jo;if(t>=r)return bp;let o=(t-1)/(r-1);return Math.floor(Jo+20*o)}function Ye(e,t,n){let r=Ze(e);if(!r)return n-Bt;let o=r.hoursToMature,a=t/Us,i=Bt/o,s=Math.min(i*a,Bt),u=n-Bt;return Math.floor(u+s)}function Qe(e,t){let n=Ze(e);return n?t>=n.hoursToMature:!1}function Nn(e){let t=Ze(e);return t?Bt/t.hoursToMature:0}function qo(e,t,n){let r=t-e;return r<=0||n<=0?0:r/n}function hp(e,t){let n=Ze(e);if(!n)return 0;let r=n.hoursToMature-t;return Math.max(0,r)}function Ze(e){let t=Se.get("pets");if(!t)return null;let n=t[e];return n?{hoursToMature:n.hoursToMature??0,maxScale:n.maxScale??1,abilities:n.abilities??[]}:null}function Xo(e,t){return t<=0?1:Math.min(1,e/t)}var Yo={};Xt(Yo,{calculatePetStrength:()=>Fs,enrichPetWithStrength:()=>Vs,enrichPetsWithStrength:()=>zs,getPetStrengthStats:()=>yp});function Fs(e){let t=qe(e.xp),n=Xe(e.petSpecies,e.targetScale),r=Ye(e.petSpecies,e.xp,n),o=Qe(e.petSpecies,t),a=Nn(e.petSpecies),i=qo(r,n,a),s=Xo(r,n);return{current:r,max:n,progress:s,age:t,isMature:o,strengthPerHour:a,hoursToMax:i}}function Vs(e){return{...e,strength:Fs(e)}}function zs(e){return e.map(Vs)}function yp(e){if(e.length===0)return{averageCurrent:0,averageMax:0,totalMature:0,totalImmature:0,strongestPet:null,weakestPet:null};let t=zs(e),n=t.reduce((u,d)=>u+d.strength.current,0),r=t.reduce((u,d)=>u+d.strength.max,0),o=t.filter(u=>u.strength.isMature).length,a=t.length-o,i=t.reduce((u,d)=>d.strength.max>(u?.strength.max||0)?d:u,t[0]),s=t.reduce((u,d)=>d.strength.max<(u?.strength.max||1/0)?d:u,t[0]);return{averageCurrent:Math.round(n/t.length),averageMax:Math.round(r/t.length),totalMature:o,totalImmature:a,strongestPet:i,weakestPet:s}}var xp=new Map;function vp(){return xp}function Ut(){return A.jotaiAtomCache?.cache}function Ft(e){let t=vp(),n=t.get(e);if(n)return n;let r=Ut();if(!r)return null;for(let o of r.values())if((o?.debugLabel||o?.label||"")===e)return t.set(e,o),o;return null}var Sp={baseStore:null,captureInProgress:!1,captureError:null,lastCapturedVia:null,mirror:void 0};function mt(){return Sp}var wp="__JOTAI_STORE_READY__",$s=!1,Zo=new Set;function Wn(){if(!$s){$s=!0;for(let e of Zo)try{e()}catch{}try{let e=A.CustomEvent||CustomEvent;A.dispatchEvent?.(new e(wp))}catch{}}}function Tp(e){Zo.add(e);let t=tr();if(t.via&&!t.polyfill)try{e()}catch{}return()=>{Zo.delete(e)}}async function jn(e={}){let{timeoutMs:t=6e3,intervalMs:n=50}=e,r=tr();if(!(r.via&&!r.polyfill))return new Promise((o,a)=>{let i=!1,s=Tp(()=>{i||(i=!0,s(),o())}),u=Date.now();(async()=>{for(;!i&&Date.now()-u<t;){let l=tr();if(l.via&&!l.polyfill){if(i)return;i=!0,s(),o();return}await Vt(n)}i||(i=!0,s(),a(new Error("Store not captured within timeout")))})()})}var Vt=e=>new Promise(t=>setTimeout(t,e));function Ks(){try{let e=A.Event||Event;A.dispatchEvent?.(new e("visibilitychange"))}catch{}}function er(e){return e&&typeof e=="object"&&typeof e.get=="function"&&typeof e.set=="function"&&typeof e.sub=="function"}function Qo(e,t=0,n=new WeakSet){if(t>3||!e||typeof e!="object"||n.has(e))return null;try{n.add(e)}catch{return null}if(er(e))return e;let r=["store","value","current","state","s","baseStore"];for(let o of r)try{let a=e[o];if(er(a))return a}catch{}return null}function Js(){let e=mt(),t=A.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t?.renderers?.size)return null;let n=0;for(let[r]of t.renderers){let o=t.getFiberRoots?.(r);o&&(n+=o.size||0)}if(n===0)return null;for(let[r]of t.renderers){let o=t.getFiberRoots?.(r);if(o)for(let a of o){let i=new Set,s=[a.current];for(;s.length;){let u=s.pop();if(!(!u||i.has(u))){i.add(u);try{let d=u?.pendingProps?.value;if(er(d))return e.lastCapturedVia="fiber",d}catch{}try{let d=u?.memoizedState,l=0;for(;d&&l<15;){l++;let c=Qo(d);if(c)return e.lastCapturedVia="fiber",c;let p=Qo(d.memoizedState);if(p)return e.lastCapturedVia="fiber",p;d=d.next}}catch{}try{if(u?.stateNode){let d=Qo(u.stateNode);if(d)return e.lastCapturedVia="fiber",d}}catch{}u.child&&s.push(u.child),u.sibling&&s.push(u.sibling),u.alternate&&s.push(u.alternate)}}}}return null}function qs(){return{get:()=>{throw new Error("Store not captured: get unavailable")},set:()=>{throw new Error("Store not captured: set unavailable")},sub:()=>()=>{},__polyfill:!0}}async function kp(e=5e3){let t=Date.now(),n=Ut();for(;!n&&Date.now()-t<e;)await Vt(100),n=Ut();if(!n)throw new Error("jotaiAtomCache.cache not found");let r=mt(),o=null,a=null,i=[],s=()=>{for(let d of i)try{d.__origWrite&&(d.write=d.__origWrite,delete d.__origWrite)}catch{}};for(let d of n.values()){if(!d||typeof d.write!="function"||d.__origWrite)continue;let l=d.write;d.__origWrite=l,d.write=function(c,p,...m){return a||(o=c,a=p,s()),l.call(this,c,p,...m)},i.push(d)}Ks();let u=Date.now();for(;!a&&Date.now()-u<e;)await Vt(50);return a?(r.lastCapturedVia="write",{get:d=>o(d),set:(d,l)=>a(d,l),sub:(d,l)=>{let c;try{c=o(d)}catch{}let p=setInterval(()=>{let m;try{m=o(d)}catch{return}if(m!==c){c=m;try{l()}catch{}}},100);return()=>clearInterval(p)}}):(s(),r.lastCapturedVia="polyfill",qs())}async function Pp(e=1e4){let t=mt();Ks();let n=Date.now();for(;Date.now()-n<e;){let r=Js();if(r)return r;await Vt(50)}return t.lastCapturedVia="polyfill",qs()}async function Ap(){let e=mt();if(e.baseStore&&!e.baseStore.__polyfill)return Wn(),e.baseStore;if(e.captureInProgress){let t=Date.now(),n=2500;for(;!e.baseStore&&Date.now()-t<n;)await Vt(25);if(e.baseStore)return e.baseStore.__polyfill||Wn(),e.baseStore}e.captureInProgress=!0;try{let t=Js();if(t)return e.baseStore=t,Wn(),t;try{let r=await kp(5e3);return e.baseStore=r,r.__polyfill||Wn(),r}catch(r){e.captureError=r}let n=await Pp();return e.baseStore=n,n}catch(t){throw e.captureError=t,t}finally{e.captureInProgress=!1}}function tr(){let e=mt();return{via:e.lastCapturedVia,polyfill:!!e.baseStore?.__polyfill,error:e.captureError}}async function Cp(){let e=await Ap(),t=new WeakMap,n=async o=>{let a=t.get(o);if(a)return a;a={last:void 0,has:!1,subs:new Set},t.set(o,a);try{a.last=e.get(o),a.has=!0}catch{}let i=e.sub(o,()=>{let s;try{s=e.get(o)}catch{return}let u=a.last,d=!Object.is(s,u)||!a.has;if(a.last=s,a.has=!0,d)for(let l of a.subs)try{l(s,u)}catch{}});return a.unsubUpstream=i,a};return{async get(o){let a=await n(o);if(a.has)return a.last;let i=e.get(o);return a.last=i,a.has=!0,i},async set(o,a){await e.set(o,a);let i=await n(o);i.last=a,i.has=!0},async sub(o,a){let i=await n(o);if(i.subs.add(a),i.has)try{a(i.last,i.last)}catch{}return()=>{i.subs.delete(a)}},getShadow(o){return t.get(o)?.last},hasShadow(o){return!!t.get(o)?.has},async ensureWatch(o){await n(o)},async asStore(){return{get:o=>this.get(o),set:(o,a)=>this.set(o,a),sub:(o,a)=>{let i=null;return this.sub(o,()=>a()).then(s=>i=s),()=>i?.()}}}}}async function zt(){let e=mt();return e.mirror||(e.mirror=await Cp()),e.mirror}var X={async select(e){let t=await zt(),n=Ft(e);if(!n)throw new Error(`[Store] Atom not found: "${e}"`);return t.get(n)},async set(e,t){let n=await zt(),r=Ft(e);if(!r)throw new Error(`[Store] Atom not found: "${e}"`);await n.set(r,t)},async subscribe(e,t){let n=await zt(),r=Ft(e);if(!r)throw new Error(`[Store] Atom not found: "${e}"`);return n.sub(r,o=>{try{t(o)}catch{}})},async subscribeImmediate(e,t){let n=await X.select(e);try{t(n)}catch{}return X.subscribe(e,t)}};async function nr(){await zt()}function ie(e,t){if(e===t)return!0;if(e===null||t===null)return e===t;if(typeof e!=typeof t)return!1;if(typeof e!="object")return e===t;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return!1;for(let i=0;i<e.length;i++)if(!ie(e[i],t[i]))return!1;return!0}if(Array.isArray(e)||Array.isArray(t))return!1;let n=e,r=t,o=Object.keys(n),a=Object.keys(r);if(o.length!==a.length)return!1;for(let i of o)if(!Object.prototype.hasOwnProperty.call(r,i)||!ie(n[i],r[i]))return!1;return!0}var Xs={currentGardenTile:"myCurrentGardenTileAtom",globalTileIndex:"myCurrentGlobalTileIndexAtom",gardenObject:"myCurrentGardenObjectAtom",isMature:"isGardenObjectMatureAtom",isInMyGarden:"isInMyGardenAtom",gardenName:"currentGardenNameAtom",sortedSlotIndices:"myCurrentSortedGrowSlotIndicesAtom",currentGrowSlotIndex:"myCurrentGrowSlotIndexAtom"},Ys={position:{globalIndex:null,localIndex:null},tile:{type:null,isEmpty:!0},garden:{name:null,isOwner:!1,playerSlotIndex:null},object:{type:null,data:null,isMature:!1},plant:null};function Mp(e){let t=e.currentGardenTile;return{globalIndex:e.globalTileIndex,localIndex:t?.localTileIndex??null}}function Ip(e){return{type:e.currentGardenTile?.tileType??null,isEmpty:e.gardenObject===null}}function Ep(e){let t=e.currentGardenTile;return{name:e.gardenName,isOwner:e.isInMyGarden??!1,playerSlotIndex:t?.userSlotIdx??null}}function Lp(e){let t=e.gardenObject;return t?{type:t.objectType,data:t,isMature:e.isMature??!1}:{type:null,data:null,isMature:!1}}function Rp(e){let t=e.gardenObject;if(!t||t.objectType!=="plant")return null;let n=t,r=e.sortedSlotIndices??[];return{species:n.species,slots:n.slots??[],currentSlotIndex:e.currentGrowSlotIndex,sortedSlotIndices:r,nextHarvestSlotIndex:r.length>0?r[0]:null}}function Qs(e){return{position:Mp(e),tile:Ip(e),garden:Ep(e),object:Lp(e),plant:Rp(e)}}function Zs(e){return JSON.stringify({globalIndex:e.position.globalIndex,localIndex:e.position.localIndex,tileType:e.tile.type,isEmpty:e.tile.isEmpty,gardenName:e.garden.name,isOwner:e.garden.isOwner,playerSlotIndex:e.garden.playerSlotIndex,objectType:e.object.type,isMature:e.object.isMature,plantSpecies:e.plant?.species??null,slotCount:e.plant?.slots.length??0})}function Op(e,t){return e.type!==t.type||e.isMature!==t.isMature?!0:e.data===null&&t.data===null?!1:e.data===null||t.data===null?!0:!ie(e.data,t.data)}function Dp(e,t){return e===null&&t===null?!1:e===null||t===null||e.species!==t.species||e.currentSlotIndex!==t.currentSlotIndex||e.nextHarvestSlotIndex!==t.nextHarvestSlotIndex||e.slots.length!==t.slots.length?!0:!ie(e.sortedSlotIndices,t.sortedSlotIndices)}function Gp(e,t){return e.name!==t.name||e.isOwner!==t.isOwner||e.playerSlotIndex!==t.playerSlotIndex}function Hp(){let e=Ys,t=Ys,n=!1,r=[],o={all:new Set,stable:new Set,object:new Set,plantInfo:new Set,garden:new Set},a={},i=Object.keys(Xs),s=new Set;function u(){if(s.size<i.length)return;let l=Qs(a);if(!ie(e,l)&&(t=e,e=l,!!n)){for(let c of o.all)c(e,t);if(Zs(t)!==Zs(e))for(let c of o.stable)c(e,t);if(Op(t.object,e.object)){let c={current:e.object,previous:t.object};for(let p of o.object)p(c)}if(Dp(t.plant,e.plant)){let c={current:e.plant,previous:t.plant};for(let p of o.plantInfo)p(c)}if(Gp(t.garden,e.garden)){let c={current:e.garden,previous:t.garden};for(let p of o.garden)p(c)}}}async function d(){if(n)return;let l=i.map(async c=>{let p=Xs[c],m=await X.subscribe(p,g=>{a[c]=g,s.add(c),u()});r.push(m)});await Promise.all(l),n=!0,s.size===i.length&&(e=Qs(a))}return d(),{get(){return e},subscribe(l,c){return o.all.add(l),c?.immediate!==!1&&n&&s.size===i.length&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,c){return o.stable.add(l),c?.immediate!==!1&&n&&s.size===i.length&&l(e,e),()=>o.stable.delete(l)},subscribeObject(l,c){return o.object.add(l),c?.immediate&&n&&s.size===i.length&&l({current:e.object,previous:e.object}),()=>o.object.delete(l)},subscribePlantInfo(l,c){return o.plantInfo.add(l),c?.immediate&&n&&s.size===i.length&&l({current:e.plant,previous:e.plant}),()=>o.plantInfo.delete(l)},subscribeGarden(l,c){return o.garden.add(l),c?.immediate&&n&&s.size===i.length&&l({current:e.garden,previous:e.garden}),()=>o.garden.delete(l)},destroy(){for(let l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.object.clear(),o.plantInfo.clear(),o.garden.clear(),n=!1}}}var or=null;function rr(){return or||(or=Hp()),or}var el={inventory:"myPetInventoryAtom",hutch:"myPetHutchPetItemsAtom",active:"myPetInfosAtom",slotInfos:"myPetSlotInfosAtom",expandedPetSlotId:"expandedPetSlotIdAtom"};function tl(e,t){let n=qe(e.xp),r=Xe(e.petSpecies,e.targetScale),o=Ye(e.petSpecies,e.xp,r),a=Qe(e.petSpecies,n);return{id:e.id,petSpecies:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,mutations:[...e.mutations],targetScale:e.targetScale,abilities:[...e.abilities],location:t,position:null,lastAbilityTrigger:null,growthStage:n,currentStrength:o,maxStrength:r,isMature:a}}function Np(e,t){let r=t[e.slot.id]?.lastAbilityTrigger??null,o=qe(e.slot.xp),a=Xe(e.slot.petSpecies,e.slot.targetScale),i=Ye(e.slot.petSpecies,e.slot.xp,a),s=Qe(e.slot.petSpecies,o);return{id:e.slot.id,petSpecies:e.slot.petSpecies,name:e.slot.name,xp:e.slot.xp,hunger:e.slot.hunger,mutations:[...e.slot.mutations],targetScale:e.slot.targetScale,abilities:[...e.slot.abilities],location:"active",position:e.position?{x:e.position.x,y:e.position.y}:null,lastAbilityTrigger:r,growthStage:o,currentStrength:i,maxStrength:a,isMature:s}}function nl(e){let t=new Set,n=[];for(let u of e.active??[]){let d=Np(u,e.slotInfos??{});n.push(d),t.add(d.id)}let r=[];for(let u of e.inventory??[]){if(t.has(u.id))continue;let d=tl(u,"inventory");r.push(d),t.add(d.id)}let o=[];for(let u of e.hutch??[]){if(t.has(u.id))continue;let d=tl(u,"hutch");o.push(d),t.add(d.id)}let a=[...n,...r,...o],i=e.expandedPetSlotId??null,s=i?a.find(u=>u.id===i)??null:null;return{all:a,byLocation:{inventory:r,hutch:o,active:n},counts:{inventory:r.length,hutch:o.length,active:n.length,total:a.length},expandedPetSlotId:i,expandedPet:s}}var ol={all:[],byLocation:{inventory:[],hutch:[],active:[]},counts:{inventory:0,hutch:0,active:0,total:0},expandedPetSlotId:null,expandedPet:null};function _p(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}function rl(e){return JSON.stringify({id:e.id,petSpecies:e.petSpecies,name:e.name,mutations:e.mutations,abilities:e.abilities,location:e.location})}function Wp(e,t){if(e.all.length!==t.all.length)return!1;let n=e.all.map(rl),r=t.all.map(rl);return _p(n,r)}function jp(e,t){let n=[],r=new Map(e.all.map(o=>[o.id,o]));for(let o of t.all){let a=r.get(o.id);a&&a.location!==o.location&&n.push({pet:o,from:a.location,to:o.location})}return n}function Bp(e,t){let n=[],r=new Map(e.all.map(o=>[o.id,o]));for(let o of t.all){if(!o.lastAbilityTrigger)continue;let i=r.get(o.id)?.lastAbilityTrigger;(!i||i.abilityId!==o.lastAbilityTrigger.abilityId||i.performedAt!==o.lastAbilityTrigger.performedAt)&&n.push({pet:o,trigger:o.lastAbilityTrigger})}return n}function Up(e,t){let n=new Set(e.all.map(i=>i.id)),r=new Set(t.all.map(i=>i.id)),o=t.all.filter(i=>!n.has(i.id)),a=e.all.filter(i=>!r.has(i.id));return o.length===0&&a.length===0?null:{added:o,removed:a,counts:t.counts}}function Fp(e,t){let n=[],r=new Map(e.all.map(o=>[o.id,o]));for(let o of t.all){let a=r.get(o.id);a&&o.growthStage>a.growthStage&&n.push({pet:o,previousStage:a.growthStage,newStage:o.growthStage})}return n}function Vp(e,t){let n=[],r=new Map(e.all.map(o=>[o.id,o]));for(let o of t.all){let a=r.get(o.id);a&&o.currentStrength>a.currentStrength&&n.push({pet:o,previousStrength:a.currentStrength,newStrength:o.currentStrength})}return n}function zp(e,t){let n=[],r=new Map(e.all.map(o=>[o.id,o]));for(let o of t.all){let a=r.get(o.id);a&&o.currentStrength===o.maxStrength&&a.currentStrength<a.maxStrength&&n.push({pet:o})}return n}function $p(){let e=ol,t=ol,n=!1,r=[],o={all:new Set,stable:new Set,location:new Set,ability:new Set,count:new Set,expandedPet:new Set,growth:new Set,strengthGain:new Set,maxStrength:new Set},a={},i=Object.keys(el),s=new Set;function u(){if(s.size<i.length)return;let l=nl(a);if(ie(e,l)||(t=e,e=l,!n))return;for(let b of o.all)b(e,t);if(!Wp(t,e))for(let b of o.stable)b(e,t);let c=jp(t,e);for(let b of c)for(let S of o.location)S(b);let p=Bp(t,e);for(let b of p)for(let S of o.ability)S(b);let m=Up(t,e);if(m)for(let b of o.count)b(m);let g=Fp(t,e);for(let b of g)for(let S of o.growth)S(b);let f=Vp(t,e);for(let b of f)for(let S of o.strengthGain)S(b);let h=zp(t,e);for(let b of h)for(let S of o.maxStrength)S(b);if(t.expandedPetSlotId!==e.expandedPetSlotId){let b={current:e.expandedPet,previous:t.expandedPet,currentId:e.expandedPetSlotId,previousId:t.expandedPetSlotId};for(let S of o.expandedPet)S(b)}}async function d(){if(n)return;let l=i.map(async c=>{let p=el[c],m=await X.subscribe(p,g=>{a[c]=g,s.add(c),u()});r.push(m)});await Promise.all(l),n=!0,s.size===i.length&&(e=nl(a))}return d(),{get(){return e},subscribe(l,c){return o.all.add(l),c?.immediate!==!1&&n&&s.size===i.length&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,c){return o.stable.add(l),c?.immediate!==!1&&n&&s.size===i.length&&l(e,e),()=>o.stable.delete(l)},subscribeLocation(l,c){if(o.location.add(l),c?.immediate&&n&&s.size===i.length)for(let p of e.all)l({pet:p,from:p.location,to:p.location});return()=>o.location.delete(l)},subscribeAbility(l,c){if(o.ability.add(l),c?.immediate&&n&&s.size===i.length)for(let p of e.all)p.lastAbilityTrigger&&l({pet:p,trigger:p.lastAbilityTrigger});return()=>o.ability.delete(l)},subscribeCount(l,c){return o.count.add(l),c?.immediate&&n&&s.size===i.length&&l({added:e.all,removed:[],counts:e.counts}),()=>o.count.delete(l)},subscribeExpandedPet(l,c){return o.expandedPet.add(l),c?.immediate&&n&&s.size===i.length&&l({current:e.expandedPet,previous:e.expandedPet,currentId:e.expandedPetSlotId,previousId:e.expandedPetSlotId}),()=>o.expandedPet.delete(l)},subscribeGrowth(l,c){if(o.growth.add(l),c?.immediate&&n&&s.size===i.length)for(let p of e.all)l({pet:p,previousStage:p.growthStage,newStage:p.growthStage});return()=>o.growth.delete(l)},subscribeStrengthGain(l,c){if(o.strengthGain.add(l),c?.immediate&&n&&s.size===i.length)for(let p of e.all)l({pet:p,previousStrength:p.currentStrength,newStrength:p.currentStrength});return()=>o.strengthGain.delete(l)},subscribeMaxStrength(l,c){if(o.maxStrength.add(l),c?.immediate&&n&&s.size===i.length)for(let p of e.all)p.currentStrength===p.maxStrength&&l({pet:p});return()=>o.maxStrength.delete(l)},destroy(){for(let l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.location.clear(),o.ability.clear(),o.count.clear(),o.expandedPet.clear(),o.growth.clear(),o.strengthGain.clear(),o.maxStrength.clear(),n=!1}}}var ar=null;function ir(){return ar||(ar=$p()),ar}function Kp(){let e=null,t=[],n=new Set,r={},o=new Set,a=2;function i(c,p){return{x:p%c,y:Math.floor(p/c)}}function s(c,p,m){return m*c+p}function u(c,p){let{cols:m,rows:g}=c,f=m*g,h=new Set,b=new Set,S=new Map,v=[],x=c.userSlotIdxAndDirtTileIdxToGlobalTileIdx??[],w=c.userSlotIdxAndBoardwalkTileIdxToGlobalTileIdx??[],k=Math.max(x.length,w.length);for(let P=0;P<k;P++){let O=x[P]??[],E=w[P]??[],U=O.map((B,_)=>(h.add(B),S.set(B,P),{globalIndex:B,localIndex:_,position:i(m,B)})),q=E.map((B,_)=>(b.add(B),S.set(B,P),{globalIndex:B,localIndex:_,position:i(m,B)}));v.push({userSlotIdx:P,dirtTiles:U,boardwalkTiles:q,allTiles:[...U,...q]})}let L=c.spawnTiles.map(P=>i(m,P)),I={};if(c.locations)for(let[P,O]of Object.entries(c.locations)){let E=O.spawnTileIdx??[];I[P]={name:P,spawnTiles:E,spawnPositions:E.map(U=>i(m,U))}}return{cols:m,rows:g,totalTiles:f,tileSize:p,spawnTiles:c.spawnTiles,spawnPositions:L,locations:I,userSlots:v,globalToXY(P){return i(m,P)},xyToGlobal(P,O){return s(m,P,O)},getTileOwner(P){return S.get(P)??null},isDirtTile(P){return h.has(P)},isBoardwalkTile(P){return b.has(P)}}}function d(){if(o.size<a||e)return;let c=r.map,p=r.tileSize??0;if(c){e=u(c,p);for(let m of n)m(e);n.clear()}}async function l(){let c=await X.subscribe("mapAtom",m=>{r.map=m,o.add("map"),d()});t.push(c);let p=await X.subscribe("tileSizeAtom",m=>{r.tileSize=m,o.add("tileSize"),d()});t.push(p)}return l(),{get(){return e},isReady(){return e!==null},onReady(c,p){return e?(p?.immediate!==!1&&c(e),()=>{}):(n.add(c),()=>n.delete(c))},destroy(){for(let c of t)c();t.length=0,e=null,n.clear()}}}var sr=null;function gt(){return sr||(sr=Kp()),sr}var al={inventory:"myInventoryAtom",isFull:"isMyInventoryAtMaxLengthAtom",selectedItemIndex:"myPossiblyNoLongerValidSelectedItemIndexAtom"},il={items:[],favoritedItemIds:[],count:0,isFull:!1,selectedItem:null};function sl(e){let t=e.inventory,n=t?.items??[],r=t?.favoritedItemIds??[],o=e.selectedItemIndex,a=null;return o!==null&&o>=0&&o<n.length&&(a={index:o,item:n[o]}),{items:n,favoritedItemIds:r,count:n.length,isFull:e.isFull??!1,selectedItem:a}}function ll(e){let t=e.items.map(n=>"id"in n?n.id:"species"in n&&n.itemType==="Seed"?`seed:${n.species}:${n.quantity}`:"toolId"in n?`tool:${n.toolId}:${n.quantity}`:"eggId"in n?`egg:${n.eggId}:${n.quantity}`:"decorId"in n?`decor:${n.decorId}:${n.quantity}`:JSON.stringify(n));return JSON.stringify({itemKeys:t,favoritedItemIds:e.favoritedItemIds,isFull:e.isFull,selectedItemIndex:e.selectedItem?.index??null})}function Jp(e,t){return ll(e)===ll(t)}function qp(e,t){return e===null&&t===null?!1:e===null||t===null?!0:e.index!==t.index}function Bn(e){return"id"in e?e.id:"species"in e&&e.itemType==="Seed"?`seed:${e.species}`:"toolId"in e?`tool:${e.toolId}`:"eggId"in e?`egg:${e.eggId}`:"decorId"in e?`decor:${e.decorId}`:JSON.stringify(e)}function Xp(e,t){let n=new Set(e.map(Bn)),r=new Set(t.map(Bn)),o=t.filter(i=>!n.has(Bn(i))),a=e.filter(i=>!r.has(Bn(i)));return o.length===0&&a.length===0?null:{added:o,removed:a,counts:{before:e.length,after:t.length}}}function Yp(e,t){let n=new Set(e),r=new Set(t),o=t.filter(i=>!n.has(i)),a=e.filter(i=>!r.has(i));return o.length===0&&a.length===0?null:{added:o,removed:a,current:t}}function Qp(){let e=il,t=il,n=!1,r=[],o={all:new Set,stable:new Set,selection:new Set,items:new Set,favorites:new Set},a={},i=Object.keys(al),s=new Set;function u(){if(s.size<i.length)return;let l=sl(a);if(ie(e,l)||(t=e,e=l,!n))return;for(let m of o.all)m(e,t);if(!Jp(t,e))for(let m of o.stable)m(e,t);if(qp(t.selectedItem,e.selectedItem)){let m={current:e.selectedItem,previous:t.selectedItem};for(let g of o.selection)g(m)}let c=Xp(t.items,e.items);if(c)for(let m of o.items)m(c);let p=Yp(t.favoritedItemIds,e.favoritedItemIds);if(p)for(let m of o.favorites)m(p)}async function d(){if(n)return;let l=i.map(async c=>{let p=al[c],m=await X.subscribe(p,g=>{a[c]=g,s.add(c),u()});r.push(m)});await Promise.all(l),n=!0,s.size===i.length&&(e=sl(a))}return d(),{get(){return e},subscribe(l,c){return o.all.add(l),c?.immediate!==!1&&n&&s.size===i.length&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,c){return o.stable.add(l),c?.immediate!==!1&&n&&s.size===i.length&&l(e,e),()=>o.stable.delete(l)},subscribeSelection(l,c){return o.selection.add(l),c?.immediate&&n&&s.size===i.length&&l({current:e.selectedItem,previous:e.selectedItem}),()=>o.selection.delete(l)},subscribeItems(l,c){return o.items.add(l),c?.immediate&&n&&s.size===i.length&&l({added:e.items,removed:[],counts:{before:0,after:e.count}}),()=>o.items.delete(l)},subscribeFavorites(l,c){return o.favorites.add(l),c?.immediate&&n&&s.size===i.length&&l({added:e.favoritedItemIds,removed:[],current:e.favoritedItemIds}),()=>o.favorites.delete(l)},destroy(){for(let l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.selection.clear(),o.items.clear(),o.favorites.clear(),n=!1}}}var lr=null;function cr(){return lr||(lr=Qp()),lr}function $t(e){return e?Array.isArray(e)?e.slice():e.split(".").map(t=>t.match(/^\d+$/)?Number(t):t):[]}function Ne(e,t){let n=$t(t),r=e;for(let o of n){if(r==null)return;r=r[o]}return r}function ur(e,t,n){let r=$t(t);if(!r.length)return n;let o=Array.isArray(e)?[...e]:{...e??{}},a=o;for(let i=0;i<r.length-1;i++){let s=r[i],u=a[s],d=typeof u=="object"&&u!==null?Array.isArray(u)?[...u]:{...u}:{};a[s]=d,a=d}return a[r[r.length-1]]=n,o}function cl(e,t){let n={};for(let r of t)n[r]=r.includes(".")?Ne(e,r):e?.[r];try{return JSON.stringify(n)}catch{return String(n)}}function dr(e,t,n){let r=n.mode??"auto";function o(d){let l=t?Ne(d,t):d,c=new Map;if(l==null)return{signatures:c,keys:[]};let p=Array.isArray(l);if((r==="array"||r==="auto"&&p)&&p)for(let g=0;g<l.length;g++){let f=l[g],h=n.key?n.key(f,g,d):g,b=n.sig?n.sig(f,g,d):n.fields?cl(f,n.fields):JSON.stringify(f);c.set(h,b)}else for(let[g,f]of Object.entries(l)){let h=n.key?n.key(f,g,d):g,b=n.sig?n.sig(f,g,d):n.fields?cl(f,n.fields):JSON.stringify(f);c.set(h,b)}return{signatures:c,keys:Array.from(c.keys())}}function a(d,l){if(d===l)return!0;if(!d||!l||d.size!==l.size)return!1;for(let[c,p]of d)if(l.get(c)!==p)return!1;return!0}async function i(d){let l=null;return X.subscribeImmediate(e,c=>{let p=t?Ne(c,t):c,{signatures:m}=o(p);if(!a(l,m)){let g=new Set([...l?Array.from(l.keys()):[],...Array.from(m.keys())]),f=[];for(let h of g){let b=l?.get(h)??"__NONE__",S=m.get(h)??"__NONE__";b!==S&&f.push(h)}l=m,d({value:p,changedKeys:f})}})}async function s(d,l){return i(({value:c,changedKeys:p})=>{p.includes(d)&&l({value:c})})}async function u(d,l){let c=new Set(d);return i(({value:p,changedKeys:m})=>{let g=m.filter(f=>c.has(f));g.length&&l({value:p,changedKeys:g})})}return{sub:i,subKey:s,subKeys:u}}var ft=new Map;function Zp(e,t){let n=ft.get(e);if(n)try{n()}catch{}return ft.set(e,t),()=>{try{t()}catch{}ft.get(e)===t&&ft.delete(e)}}function Q(e,t={}){let{path:n,write:r="replace"}=t,o=n?`${e}:${$t(n).join(".")}`:e;async function a(){let c=await X.select(e);return n?Ne(c,n):c}async function i(c){if(typeof r=="function"){let g=await X.select(e),f=r(c,g);return X.set(e,f)}let p=await X.select(e),m=n?ur(p,n,c):c;return r==="merge-shallow"&&!n&&p&&typeof p=="object"&&typeof c=="object"?X.set(e,{...p,...c}):X.set(e,m)}async function s(c){let p=await a(),m=c(p);return await i(m),m}async function u(c,p,m){let g,f=b=>{let S=n?Ne(b,n):b;if(typeof g>"u"||!m(g,S)){let v=g;g=S,p(S,v)}},h=c?await X.subscribeImmediate(e,f):await X.subscribe(e,f);return Zp(o,h)}function d(){let c=ft.get(o);if(c){try{c()}catch{}ft.delete(o)}}function l(c){return dr(e,c?.path??n,c)}return{label:o,get:a,set:i,update:s,onChange:(c,p=Object.is)=>u(!1,c,p),onChangeNow:(c,p=Object.is)=>u(!0,c,p),asSignature:l,stopOnChange:d}}function y(e){return Q(e)}var em=y("positionAtom"),tm=y("lastPositionInMyGardenAtom"),nm=y("playerDirectionAtom"),om=y("stateAtom"),rm=y("quinoaDataAtom"),am=y("currentTimeAtom"),im=y("actionAtom"),sm=y("isPressAndHoldActionAtom"),lm=y("mapAtom"),cm=y("tileSizeAtom"),um=Q("mapAtom",{path:"cols"}),dm=Q("mapAtom",{path:"rows"}),pm=Q("mapAtom",{path:"spawnTiles"}),mm=Q("mapAtom",{path:"locations.seedShop.spawnTileIdx"}),gm=Q("mapAtom",{path:"locations.eggShop.spawnTileIdx"}),fm=Q("mapAtom",{path:"locations.toolShop.spawnTileIdx"}),bm=Q("mapAtom",{path:"locations.decorShop.spawnTileIdx"}),hm=Q("mapAtom",{path:"locations.sellCropsShop.spawnTileIdx"}),ym=Q("mapAtom",{path:"locations.sellPetShop.spawnTileIdx"}),xm=Q("mapAtom",{path:"locations.collectorsClub.spawnTileIdx"}),vm=Q("mapAtom",{path:"locations.wishingWell.spawnTileIdx"}),Sm=Q("mapAtom",{path:"locations.shopsCenter.spawnTileIdx"}),wm=y("playerAtom"),Tm=y("myDataAtom"),km=y("myUserSlotIdxAtom"),Pm=y("isSpectatingAtom"),Am=y("myCoinsCountAtom"),Cm=y("numPlayersAtom"),Mm=Q("playerAtom",{path:"id"}),Im=y("userSlotsAtom"),Em=y("filteredUserSlotsAtom"),Lm=y("myUserSlotAtom"),Rm=y("spectatorsAtom"),Om=Q("stateAtom",{path:"child"}),Dm=Q("stateAtom",{path:"child.data"}),Gm=Q("stateAtom",{path:"child.data.shops"}),pr=Q("stateAtom",{path:"child.data.userSlots"}),mr=Q("stateAtom",{path:"data.players"}),gr=Q("stateAtom",{path:"data.hostPlayerId"}),Hm=y("myInventoryAtom"),Nm=y("myInventoryItemsAtom"),_m=y("isMyInventoryAtMaxLengthAtom"),Wm=y("myFavoritedItemIdsAtom"),jm=y("myCropInventoryAtom"),Bm=y("mySeedInventoryAtom"),Um=y("myToolInventoryAtom"),Fm=y("myEggInventoryAtom"),Vm=y("myDecorInventoryAtom"),zm=y("myPetInventoryAtom"),$m=Q("myInventoryAtom",{path:"favoritedItemIds"}),Km=y("itemTypeFiltersAtom"),Jm=y("myItemStoragesAtom"),qm=y("myPetHutchStoragesAtom"),Xm=y("myPetHutchItemsAtom"),Ym=y("myPetHutchPetItemsAtom"),Qm=y("myNumPetHutchItemsAtom"),Zm=y("myValidatedSelectedItemIndexAtom"),eg=y("isSelectedItemAtomSuspended"),tg=y("mySelectedItemAtom"),ng=y("mySelectedItemNameAtom"),og=y("mySelectedItemRotationsAtom"),rg=y("mySelectedItemRotationAtom"),ag=y("setSelectedIndexToEndAtom"),ig=y("myPossiblyNoLongerValidSelectedItemIndexAtom"),sg=y("myCurrentGlobalTileIndexAtom"),lg=y("myCurrentGardenTileAtom"),cg=y("myCurrentGardenObjectAtom"),ug=y("myOwnCurrentGardenObjectAtom"),dg=y("myOwnCurrentDirtTileIndexAtom"),pg=y("myCurrentGardenObjectNameAtom"),mg=y("isInMyGardenAtom"),gg=y("myGardenBoardwalkTileObjectsAtom"),fr=Q("myDataAtom",{path:"garden"}),fg=Q("myDataAtom",{path:"garden.tileObjects"}),bg=Q("myOwnCurrentGardenObjectAtom",{path:"objectType"}),hg=y("myCurrentStablePlantObjectInfoAtom"),yg=y("myCurrentSortedGrowSlotIndicesAtom"),xg=y("myCurrentGrowSlotIndexAtom"),vg=y("myCurrentGrowSlotsAtom"),Sg=y("myCurrentGrowSlotAtom"),wg=y("secondsUntilCurrentGrowSlotMaturesAtom"),Tg=y("isCurrentGrowSlotMatureAtom"),kg=y("numGrowSlotsAtom"),Pg=y("myCurrentEggAtom"),Ag=y("petInfosAtom"),Cg=y("myPetInfosAtom"),Mg=y("myPetSlotInfosAtom"),Ig=y("myPrimitivePetSlotsAtom"),Eg=y("myNonPrimitivePetSlotsAtom"),Lg=y("expandedPetSlotIdAtom"),Rg=y("myPetsProgressAtom"),Og=y("myActiveCropMutationPetsAtom"),Dg=y("totalPetSellPriceAtom"),Gg=y("selectedPetHasNewVariantsAtom"),br=y("shopsAtom"),hr=y("myShopPurchasesAtom"),Hg=y("seedShopAtom"),Ng=y("seedShopInventoryAtom"),_g=y("seedShopRestockSecondsAtom"),Wg=y("seedShopCustomRestockInventoryAtom"),jg=y("eggShopAtom"),Bg=y("eggShopInventoryAtom"),Ug=y("eggShopRestockSecondsAtom"),Fg=y("eggShopCustomRestockInventoryAtom"),Vg=y("toolShopAtom"),zg=y("toolShopInventoryAtom"),$g=y("toolShopRestockSecondsAtom"),Kg=y("toolShopCustomRestockInventoryAtom"),Jg=y("decorShopAtom"),qg=y("decorShopInventoryAtom"),Xg=y("decorShopRestockSecondsAtom"),Yg=y("decorShopCustomRestockInventoryAtom"),Qg=y("isDecorShopAboutToRestockAtom"),Zg=Q("shopsAtom",{path:"seed"}),ef=Q("shopsAtom",{path:"tool"}),tf=Q("shopsAtom",{path:"egg"}),nf=Q("shopsAtom",{path:"decor"}),of=y("myCropItemsAtom"),rf=y("myCropItemsToSellAtom"),af=y("totalCropSellPriceAtom"),sf=y("friendBonusMultiplierAtom"),lf=y("myJournalAtom"),cf=y("myCropJournalAtom"),uf=y("myPetJournalAtom"),df=y("myStatsAtom"),pf=y("myActivityLogsAtom"),mf=y("newLogsAtom"),gf=y("hasNewLogsAtom"),ff=y("newCropLogsFromSellingAtom"),bf=y("hasNewCropLogsFromSellingAtom"),hf=y("myCompletedTasksAtom"),yf=y("myActiveTasksAtom"),xf=y("isWelcomeToastVisibleAtom"),vf=y("shouldCloseWelcomeToastAtom"),Sf=y("isInitialMoveToDirtPatchToastVisibleAtom"),wf=y("isFirstPlantSeedActiveAtom"),Tf=y("isThirdSeedPlantActiveAtom"),kf=y("isThirdSeedPlantCompletedAtom"),Pf=y("isDemoTouchpadVisibleAtom"),Af=y("areShopAnnouncersEnabledAtom"),Cf=y("arePresentablesEnabledAtom"),Mf=y("isEmptyDirtTileHighlightedAtom"),If=y("isPlantTileHighlightedAtom"),Ef=y("isItemHiglightedInHotbarAtom"),Lf=y("isItemHighlightedInModalAtom"),Rf=y("isMyGardenButtonHighlightedAtom"),Of=y("isSellButtonHighlightedAtom"),Df=y("isShopButtonHighlightedAtom"),Gf=y("isInstaGrowButtonHiddenAtom"),Hf=y("isActionButtonHighlightedAtom"),Nf=y("isGardenItemInfoCardHiddenAtom"),_f=y("isSeedPurchaseButtonHighlightedAtom"),Wf=y("isFirstSeedPurchaseActiveAtom"),jf=y("isFirstCropHarvestActiveAtom"),Bf=y("isWeatherStatusHighlightedAtom"),yr=y("weatherAtom"),Uf=y("activeModalAtom"),Ff=y("hotkeyBeingPressedAtom"),Vf=y("avatarTriggerAnimationAtom"),zf=y("avatarDataAtom"),$f=y("emoteDataAtom"),Kf=y("otherUserSlotsAtom"),Jf=y("otherPlayerPositionsAtom"),qf=y("otherPlayerSelectedItemsAtom"),Xf=y("otherPlayerLastActionsAtom"),Yf=y("traderBunnyPlayerId"),Qf=y("npcPlayersAtom"),Zf=y("npcQuinoaUsersAtom"),eb=y("numNpcAvatarsAtom"),tb=y("traderBunnyEmoteTimeoutAtom"),nb=y("traderBunnyEmoteAtom"),ob=y("unsortedLeaderboardAtom"),rb=y("currentGardenNameAtom"),ab=y("quinoaEngineAtom"),ib=y("quinoaInitializationErrorAtom"),sb=y("avgPingAtom"),lb=y("serverClientTimeOffsetAtom"),cb=y("isEstablishingShotRunningAtom"),ub=y("isEstablishingShotCompleteAtom");var vr={all:[],host:null,count:0};function db(e,t,n){let r=n.get(e.id),o=r?.slot,a=o?.data,i=o?.lastActionEvent;return{id:e.id,name:e.name,discordId:e.databaseUserId,discordAvatarUrl:e.discordAvatarUrl,guildId:e.guildId,isConnected:e.isConnected,isHost:e.id===t,slotIndex:r?.index??null,position:o?.position??null,cosmetic:{color:e.cosmetic?.color??"",avatar:e.cosmetic?.avatar?[...e.cosmetic.avatar]:[]},emote:{type:e.emoteData?.emoteType??-1},coins:a?.coinsCount??0,inventory:a?.inventory??null,shopPurchases:a?.shopPurchases??null,garden:a?.garden??null,pets:{slots:a?.petSlots??[],slotInfos:o?.petSlotInfos??null},journal:a?.journal??null,stats:a?.stats??null,tasksCompleted:a?.tasksCompleted??[],activityLogs:a?.activityLogs??[],customRestocks:{config:a?.customRestocks??null,inventories:o?.customRestockInventories??null},lastAction:i?{type:i.action,data:i.data,timestamp:i.timestamp}:null,selectedItemIndex:o?.notAuthoritative_selectedItemIndex??null,lastSlotMachineInfo:o?.lastSlotMachineInfo??null}}function ul(e){let t=e.players,n=e.hostPlayerId??"",r=e.userSlots??[];if(!t||!Array.isArray(t)||t.length===0)return vr;let o=new Map;Array.isArray(r)&&r.forEach((s,u)=>{s?.type==="user"&&s?.playerId&&o.set(s.playerId,{slot:s,index:u})});let a=t.map(s=>db(s,n,o)),i=a.find(s=>s.isHost)??null;return{all:a,host:i,count:a.length}}function dl(e){let t=e.all.map(n=>`${n.id}:${n.isConnected}:${n.isHost}`);return JSON.stringify({playerKeys:t,hostId:e.host?.id??null,count:e.count})}function pb(e,t){let n=[],r=new Set(e.map(a=>a.id)),o=new Set(t.map(a=>a.id));for(let a of t)r.has(a.id)||n.push({player:a,type:"join"});for(let a of e)o.has(a.id)||n.push({player:a,type:"leave"});return n}function mb(e,t){let n=[],r=new Map(e.map(o=>[o.id,o]));for(let o of t){let a=r.get(o.id);a&&a.isConnected!==o.isConnected&&n.push({player:o,isConnected:o.isConnected})}return n}function gb(){let e=vr,t=vr,n=!1,r=[],o={all:new Set,stable:new Set,joinLeave:new Set,connection:new Set,host:new Set},a={},i=new Set,s=3;function u(){if(i.size<s)return;let l=ul(a);if(ie(e,l)||(t=e,e=l,!n))return;for(let f of o.all)f(e,t);if(dl(t)!==dl(e))for(let f of o.stable)f(e,t);let c=pb(t.all,e.all);for(let f of c)for(let h of o.joinLeave)h(f);let p=mb(t.all,e.all);for(let f of p)for(let h of o.connection)h(f);let m=t.host?.id??null,g=e.host?.id??null;if(m!==g){let f={current:e.host,previous:t.host};for(let h of o.host)h(f)}}async function d(){if(n)return;let l=await mr.onChangeNow(m=>{a.players=m,i.add("players"),u()});r.push(l);let c=await gr.onChangeNow(m=>{a.hostPlayerId=m,i.add("hostPlayerId"),u()});r.push(c);let p=await pr.onChangeNow(m=>{a.userSlots=m,i.add("userSlots"),u()});r.push(p),n=!0,i.size===s&&(e=ul(a))}return d(),{get(){return e},subscribe(l,c){return o.all.add(l),c?.immediate!==!1&&n&&i.size===s&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,c){return o.stable.add(l),c?.immediate!==!1&&n&&i.size===s&&l(e,e),()=>o.stable.delete(l)},subscribeJoinLeave(l,c){if(o.joinLeave.add(l),c?.immediate&&n&&i.size===s)for(let p of e.all)l({player:p,type:"join"});return()=>o.joinLeave.delete(l)},subscribeConnection(l,c){if(o.connection.add(l),c?.immediate&&n&&i.size===s)for(let p of e.all)l({player:p,isConnected:p.isConnected});return()=>o.connection.delete(l)},subscribeHost(l,c){return o.host.add(l),c?.immediate&&n&&i.size===s&&l({current:e.host,previous:e.host}),()=>o.host.delete(l)},destroy(){for(let l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.joinLeave.clear(),o.connection.clear(),o.host.clear(),n=!1}}}var xr=null;function Sr(){return xr||(xr=gb()),xr}var Kt=["seed","tool","egg","decor"];function fb(e,t){switch(t){case"seed":return e.species??e.itemType;case"tool":return e.toolId??e.itemType;case"egg":return e.eggId??e.itemType;case"decor":return e.decorId??e.itemType;default:return e.itemType}}function bb(e,t,n){let r=fb(e,t),o=n[r]??0,a=Math.max(0,e.initialStock-o);return{id:r,itemType:e.itemType,initialStock:e.initialStock,purchased:o,remaining:a,isAvailable:a>0}}function hb(e,t,n){if(!t)return{type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null};let o=n[e]?.purchases??{},a=(t.inventory??[]).map(d=>bb(d,e,o)),i=a.filter(d=>d.isAvailable).length,s=t.secondsUntilRestock??0,u=s>0?Date.now()+s*1e3:null;return{type:e,items:a,availableCount:i,totalCount:a.length,secondsUntilRestock:s,restockAt:u}}function pl(e){let t=e.shops,n=e.purchases??{},r=Kt.map(s=>hb(s,t?.[s],n)),o={seed:r[0],tool:r[1],egg:r[2],decor:r[3]},a=r.filter(s=>s.restockAt!==null),i=null;if(a.length>0){let u=a.sort((d,l)=>(d.restockAt??0)-(l.restockAt??0))[0];i={shop:u.type,seconds:u.secondsUntilRestock,at:u.restockAt}}return{all:r,byType:o,nextRestock:i}}var ml={all:Kt.map(e=>({type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null})),byType:{seed:{type:"seed",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},tool:{type:"tool",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},egg:{type:"egg",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},decor:{type:"decor",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null}},nextRestock:null};function gl(e){return JSON.stringify({shops:e.all.map(t=>({type:t.type,itemCount:t.items.length,availableCount:t.availableCount}))})}function yb(e,t){let n=e.secondsUntilRestock,r=t.secondsUntilRestock;return n>0&&n<=5&&r>n||n>0&&r===0&&t.items.some(a=>a.purchased===0)?{shop:t,previousItems:e.items}:null}function xb(e,t){let n=[];for(let r of Kt){let o=e.byType[r],a=t.byType[r],i=new Map(o.items.map(s=>[s.id,s]));for(let s of a.items){let u=i.get(s.id);u&&s.purchased>u.purchased&&n.push({shopType:r,itemId:s.id,quantity:s.purchased-u.purchased,newPurchased:s.purchased,remaining:s.remaining})}}return n}function vb(e,t){let n=[];for(let r of Kt){let o=e.byType[r],a=t.byType[r],i=new Map(o.items.map(s=>[s.id,s]));for(let s of a.items){let u=i.get(s.id);u&&u.isAvailable!==s.isAvailable&&n.push({shopType:r,itemId:s.id,wasAvailable:u.isAvailable,isAvailable:s.isAvailable})}}return n}function Sb(){let e=ml,t=ml,n=!1,r=[],o={all:new Set,stable:new Set,seedRestock:new Set,toolRestock:new Set,eggRestock:new Set,decorRestock:new Set,purchase:new Set,availability:new Set},a={},i=new Set,s=2;function u(){if(i.size<s)return;let l=pl(a);if(ie(e,l)||(t=e,e=l,!n))return;for(let g of o.all)g(e,t);if(gl(t)!==gl(e))for(let g of o.stable)g(e,t);let c={seed:o.seedRestock,tool:o.toolRestock,egg:o.eggRestock,decor:o.decorRestock};for(let g of Kt){let f=yb(t.byType[g],e.byType[g]);if(f)for(let h of c[g])h(f)}let p=xb(t,e);for(let g of p)for(let f of o.purchase)f(g);let m=vb(t,e);for(let g of m)for(let f of o.availability)f(g)}async function d(){if(n)return;let l=await br.onChangeNow(p=>{a.shops=p,i.add("shops"),u()});r.push(l);let c=await hr.onChangeNow(p=>{a.purchases=p,i.add("purchases"),u()});r.push(c),n=!0,i.size===s&&(e=pl(a))}return d(),{get(){return e},getShop(l){return e.byType[l]},getItem(l,c){return e.byType[l].items.find(m=>m.id===c)??null},subscribe(l,c){return o.all.add(l),c?.immediate!==!1&&n&&i.size===s&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,c){return o.stable.add(l),c?.immediate!==!1&&n&&i.size===s&&l(e,e),()=>o.stable.delete(l)},subscribeSeedRestock(l,c){return o.seedRestock.add(l),c?.immediate&&n&&i.size===s&&l({shop:e.byType.seed,previousItems:[]}),()=>o.seedRestock.delete(l)},subscribeToolRestock(l,c){return o.toolRestock.add(l),c?.immediate&&n&&i.size===s&&l({shop:e.byType.tool,previousItems:[]}),()=>o.toolRestock.delete(l)},subscribeEggRestock(l,c){return o.eggRestock.add(l),c?.immediate&&n&&i.size===s&&l({shop:e.byType.egg,previousItems:[]}),()=>o.eggRestock.delete(l)},subscribeDecorRestock(l,c){return o.decorRestock.add(l),c?.immediate&&n&&i.size===s&&l({shop:e.byType.decor,previousItems:[]}),()=>o.decorRestock.delete(l)},subscribePurchase(l,c){if(o.purchase.add(l),c?.immediate&&n&&i.size===s)for(let p of e.all)for(let m of p.items)m.purchased>0&&l({shopType:p.type,itemId:m.id,quantity:m.purchased,newPurchased:m.purchased,remaining:m.remaining});return()=>o.purchase.delete(l)},subscribeAvailability(l,c){if(o.availability.add(l),c?.immediate&&n&&i.size===s)for(let p of e.all)for(let m of p.items)l({shopType:p.type,itemId:m.id,wasAvailable:m.isAvailable,isAvailable:m.isAvailable});return()=>o.availability.delete(l)},destroy(){for(let l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.seedRestock.clear(),o.toolRestock.clear(),o.eggRestock.clear(),o.decorRestock.clear(),o.purchase.clear(),o.availability.clear(),n=!1}}}var wr=null;function Tr(){return wr||(wr=Sb()),wr}var wb=["Sunny","Rain","Frost","Dawn","AmberMoon"];function Tb(e){return wb.includes(e)}var Pr={type:"Sunny",isActive:!1,startTime:null,endTime:null,remainingSeconds:0};function kb(e){if(!e)return Pr;let t=Date.now(),n=e.endTime??0,r=Math.max(0,n-t),o=Math.floor(r/1e3),a=o>0,i=e.type??"Sunny";return{type:Tb(i)?i:"Sunny",isActive:a,startTime:e.startTime??null,endTime:e.endTime??null,remainingSeconds:o}}function Pb(){let e=Pr,t=Pr,n=!1,r=null,o={all:new Set,change:new Set};function a(s){let u=kb(s);if(e.type===u.type&&e.isActive===u.isActive&&e.startTime===u.startTime&&e.endTime===u.endTime){e=u;return}if(t=e,e=u,!!n){for(let d of o.all)d(e,t);if(t.type!==e.type||t.isActive!==e.isActive){let d={current:e,previous:t};for(let l of o.change)l(d)}}}async function i(){n||(r=await yr.onChangeNow(s=>{a(s)}),n=!0)}return i(),{get(){return e},subscribe(s,u){return o.all.add(s),u?.immediate!==!1&&n&&s(e,e),()=>o.all.delete(s)},subscribeChange(s,u){return o.change.add(s),u?.immediate&&n&&s({current:e,previous:e}),()=>o.change.delete(s)},destroy(){r?.(),r=null,o.all.clear(),o.change.clear(),n=!1}}}var kr=null;function Ar(){return kr||(kr=Pb()),kr}function Ab(){let e=Se.get("mutations");return e?Object.keys(e):[]}function yl(){let e={};for(let t of Ab())e[t]=[];return e}function Mr(){return{garden:null,mySlotIndex:null,plants:{all:[],mature:[],growing:[],bySpecies:{},count:0},crops:{all:[],mature:[],growing:[],mutated:{all:[],byMutation:yl()}},eggs:{all:[],mature:[],growing:[],byType:{},count:0},decors:{tileObjects:[],boardwalk:[],all:[],byType:{},count:0},tiles:{tileObjects:[],boardwalk:[],empty:{tileObjects:[],boardwalk:[]}},counts:{plants:0,maturePlants:0,crops:0,matureCrops:0,eggs:0,matureEggs:0,decors:0,emptyTileObjects:0,emptyBoardwalk:0}}}function Cb(e,t,n,r){let o=t.slots.filter(a=>r>=a.endTime).length;return{tileIndex:e,position:n,species:t.species,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:r>=t.maturedAt,slots:t.slots,slotsCount:t.slots.length,matureSlotsCount:o}}function Mb(e,t,n,r,o){return{tileIndex:e,position:t,slotIndex:n,species:r.species,startTime:r.startTime,endTime:r.endTime,targetScale:r.targetScale,mutations:[...r.mutations],isMature:o>=r.endTime}}function Ib(e,t,n,r){return{tileIndex:e,position:n,eggId:t.eggId,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:r>=t.maturedAt}}function fl(e,t,n,r){return{tileIndex:e,position:n,decorId:t.decorId,rotation:t.rotation,location:r}}function bl(e,t){let{garden:n,mySlotIndex:r}=e,o=Date.now();if(!n||r===null)return Mr();let a=t().get(),i=a?.userSlots[r],s=i?.dirtTiles??[],u=i?.boardwalkTiles??[],d=[],l=[],c=[],p={},m=[],g=[],f=[],h=[],b=yl(),S=[],v=[],x=[],w={},k=[],L=[],I={},P=new Set,O=new Set;for(let[B,_]of Object.entries(n.tileObjects)){let j=parseInt(B,10);P.add(j);let N=a?a.globalToXY(j):{x:0,y:0};if(_.objectType==="plant"){let G=_,M=Cb(B,G,N,o);d.push(M),M.isMature?l.push(M):c.push(M),p[M.species]||(p[M.species]=[]),p[M.species].push(M);for(let D=0;D<G.slots.length;D++){let R=G.slots[D],H=Mb(B,N,D,R,o);if(m.push(H),H.isMature?g.push(H):f.push(H),H.mutations.length>0){h.push(H);for(let W of H.mutations)b[W]||(b[W]=[]),b[W].push(H)}}}else if(_.objectType==="egg"){let M=Ib(B,_,N,o);S.push(M),w[M.eggId]||(w[M.eggId]=[]),w[M.eggId].push(M),M.isMature?v.push(M):x.push(M)}else if(_.objectType==="decor"){let M=fl(B,_,N,"tileObjects");k.push(M),I[M.decorId]||(I[M.decorId]=[]),I[M.decorId].push(M)}}for(let[B,_]of Object.entries(n.boardwalkTileObjects)){let j=parseInt(B,10);O.add(j);let N=a?a.globalToXY(j):{x:0,y:0},M=fl(B,_,N,"boardwalk");L.push(M),I[M.decorId]||(I[M.decorId]=[]),I[M.decorId].push(M)}let E=[...k,...L],U=s.filter(B=>!P.has(B.localIndex)),q=u.filter(B=>!O.has(B.localIndex));return{garden:n,mySlotIndex:r,plants:{all:d,mature:l,growing:c,bySpecies:p,count:d.length},crops:{all:m,mature:g,growing:f,mutated:{all:h,byMutation:b}},eggs:{all:S,mature:v,growing:x,byType:w,count:S.length},decors:{tileObjects:k,boardwalk:L,all:E,byType:I,count:E.length},tiles:{tileObjects:s,boardwalk:u,empty:{tileObjects:U,boardwalk:q}},counts:{plants:d.length,maturePlants:l.length,crops:m.length,matureCrops:g.length,eggs:S.length,matureEggs:v.length,decors:E.length,emptyTileObjects:U.length,emptyBoardwalk:q.length}}}function hl(e){return JSON.stringify({plants:e.counts.plants,maturePlants:e.counts.maturePlants,crops:e.counts.crops,matureCrops:e.counts.matureCrops,eggs:e.counts.eggs,matureEggs:e.counts.matureEggs,decors:e.counts.decors,emptyTileObjects:e.counts.emptyTileObjects,emptyBoardwalk:e.counts.emptyBoardwalk})}function Eb(e,t){let n=new Set(e.map(i=>i.tileIndex)),r=new Set(t.map(i=>i.tileIndex)),o=t.filter(i=>!n.has(i.tileIndex)),a=e.filter(i=>!r.has(i.tileIndex));return{added:o,removed:a}}function Lb(e,t,n){let r=new Set(e.map(a=>a.tileIndex)),o=new Set(n.map(a=>a.tileIndex));return t.filter(a=>!r.has(a.tileIndex)&&o.has(a.tileIndex))}function Rb(e,t,n){let r=new Set(e.map(a=>`${a.tileIndex}:${a.slotIndex}`)),o=new Set(n.map(a=>`${a.tileIndex}:${a.slotIndex}`));return t.filter(a=>{let i=`${a.tileIndex}:${a.slotIndex}`;return!r.has(i)&&o.has(i)})}function Ob(e,t,n){let r=new Set(e.map(a=>a.tileIndex)),o=new Set(n.map(a=>a.tileIndex));return t.filter(a=>!r.has(a.tileIndex)&&o.has(a.tileIndex))}function Db(e,t){let n=[],r=new Map(e.map(o=>[o.tileIndex,o]));for(let o of t){let a=r.get(o.tileIndex);if(!a)continue;let i=Math.min(a.slots.length,o.slots.length);for(let s=0;s<i;s++){let u=new Set(a.slots[s].mutations),d=new Set(o.slots[s].mutations),l=[...d].filter(p=>!u.has(p)),c=[...u].filter(p=>!d.has(p));if(l.length>0||c.length>0){let p=Date.now(),m=o.slots[s],g={tileIndex:o.tileIndex,position:o.position,slotIndex:s,species:m.species,startTime:m.startTime,endTime:m.endTime,targetScale:m.targetScale,mutations:[...m.mutations],isMature:p>=m.endTime};n.push({crop:g,added:l,removed:c})}}}return n}function Gb(e,t,n){let r=[],o=new Map(t.map(i=>[i.tileIndex,i])),a=new Map;for(let i of n)a.set(`${i.tileIndex}:${i.slotIndex}`,i);for(let i of e){let s=o.get(i.tileIndex);if(!s)continue;let u=Math.min(i.slots.length,s.slots.length);for(let d=0;d<u;d++){let l=i.slots[d],c=s.slots[d];if(l.startTime!==c.startTime){let p=a.get(`${i.tileIndex}:${d}`);if(!p||!p.isMature)continue;let m={tileIndex:i.tileIndex,position:i.position,slotIndex:d,species:l.species,startTime:l.startTime,endTime:l.endTime,targetScale:l.targetScale,mutations:[...l.mutations],isMature:!0};r.push({crop:m,remainingSlots:s.slotsCount})}}if(s.slotsCount<i.slotsCount)for(let d=s.slotsCount;d<i.slotsCount;d++){let l=a.get(`${i.tileIndex}:${d}`);if(!l||!l.isMature)continue;let c=i.slots[d];if(!c)continue;let p={tileIndex:i.tileIndex,position:i.position,slotIndex:d,species:c.species,startTime:c.startTime,endTime:c.endTime,targetScale:c.targetScale,mutations:[...c.mutations],isMature:!0};r.push({crop:p,remainingSlots:s.slotsCount})}}return r}function Hb(e,t){let n=new Set(e.map(i=>i.tileIndex)),r=new Set(t.map(i=>i.tileIndex)),o=t.filter(i=>!n.has(i.tileIndex)),a=e.filter(i=>!r.has(i.tileIndex));return{added:o,removed:a}}function Nb(e,t){let n=u=>`${u.tileIndex}:${u.location}`,r=u=>`${u.tileIndex}:${u.location}`,o=new Set(e.map(n)),a=new Set(t.map(r)),i=t.filter(u=>!o.has(r(u))),s=e.filter(u=>!a.has(n(u)));return{added:i,removed:s}}function _b(){let e=Mr(),t=Mr(),n=!1,r=[],o={all:new Set,stable:new Set,plantAdded:new Set,plantRemoved:new Set,plantMatured:new Set,cropMutated:new Set,cropMatured:new Set,cropHarvested:new Set,eggPlaced:new Set,eggRemoved:new Set,eggMatured:new Set,decorPlaced:new Set,decorRemoved:new Set},a={},i=new Set,s=2;function u(){if(i.size<s)return;let l=bl(a,gt);if(ie(e,l)||(t=e,e=l,!n))return;for(let v of o.all)v(e,t);if(hl(t)!==hl(e))for(let v of o.stable)v(e,t);let c=Eb(t.plants.all,e.plants.all);for(let v of c.added)for(let x of o.plantAdded)x({plant:v});for(let v of c.removed)for(let x of o.plantRemoved)x({plant:v,tileIndex:v.tileIndex});let p=Lb(t.plants.mature,e.plants.mature,e.plants.all);for(let v of p)for(let x of o.plantMatured)x({plant:v});let m=Db(t.plants.all,e.plants.all);for(let v of m)for(let x of o.cropMutated)x(v);let g=Rb(t.crops.mature,e.crops.mature,e.crops.all);for(let v of g)for(let x of o.cropMatured)x({crop:v});let f=Gb(t.plants.all,e.plants.all,t.crops.all);for(let v of f)for(let x of o.cropHarvested)x(v);let h=Hb(t.eggs.all,e.eggs.all);for(let v of h.added)for(let x of o.eggPlaced)x({egg:v});for(let v of h.removed)for(let x of o.eggRemoved)x({egg:v});let b=Ob(t.eggs.mature,e.eggs.mature,e.eggs.all);for(let v of b)for(let x of o.eggMatured)x({egg:v});let S=Nb(t.decors.all,e.decors.all);for(let v of S.added)for(let x of o.decorPlaced)x({decor:v});for(let v of S.removed)for(let x of o.decorRemoved)x({decor:v})}async function d(){if(n)return;let l=await fr.onChangeNow(p=>{a.garden=p,i.add("garden"),u()});r.push(l);let c=await X.subscribe("myUserSlotIdxAtom",p=>{a.mySlotIndex=p,i.add("mySlotIndex"),u()});r.push(c),n=!0,i.size===s&&(e=bl(a,gt))}return d(),{get(){return e},subscribe(l,c){return o.all.add(l),c?.immediate!==!1&&n&&i.size===s&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,c){return o.stable.add(l),c?.immediate!==!1&&n&&i.size===s&&l(e,e),()=>o.stable.delete(l)},subscribePlantAdded(l,c){if(o.plantAdded.add(l),c?.immediate&&n&&i.size===s)for(let p of e.plants.all)l({plant:p});return()=>o.plantAdded.delete(l)},subscribePlantRemoved(l,c){return o.plantRemoved.add(l),()=>o.plantRemoved.delete(l)},subscribePlantMatured(l,c){if(o.plantMatured.add(l),c?.immediate&&n&&i.size===s)for(let p of e.plants.mature)l({plant:p});return()=>o.plantMatured.delete(l)},subscribeCropMutated(l,c){if(o.cropMutated.add(l),c?.immediate&&n&&i.size===s)for(let p of e.crops.mutated.all)l({crop:p,added:p.mutations,removed:[]});return()=>o.cropMutated.delete(l)},subscribeCropMatured(l,c){if(o.cropMatured.add(l),c?.immediate&&n&&i.size===s)for(let p of e.crops.mature)l({crop:p});return()=>o.cropMatured.delete(l)},subscribeCropHarvested(l,c){return o.cropHarvested.add(l),()=>o.cropHarvested.delete(l)},subscribeEggPlaced(l,c){if(o.eggPlaced.add(l),c?.immediate&&n&&i.size===s)for(let p of e.eggs.all)l({egg:p});return()=>o.eggPlaced.delete(l)},subscribeEggRemoved(l,c){return o.eggRemoved.add(l),()=>o.eggRemoved.delete(l)},subscribeEggMatured(l,c){if(o.eggMatured.add(l),c?.immediate&&n&&i.size===s)for(let p of e.eggs.mature)l({egg:p});return()=>o.eggMatured.delete(l)},subscribeDecorPlaced(l,c){if(o.decorPlaced.add(l),c?.immediate&&n&&i.size===s)for(let p of e.decors.all)l({decor:p});return()=>o.decorPlaced.delete(l)},subscribeDecorRemoved(l,c){return o.decorRemoved.add(l),()=>o.decorRemoved.delete(l)},destroy(){for(let l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.plantAdded.clear(),o.plantRemoved.clear(),o.plantMatured.clear(),o.cropMutated.clear(),o.cropMatured.clear(),o.cropHarvested.clear(),o.eggPlaced.clear(),o.eggRemoved.clear(),o.eggMatured.clear(),o.decorPlaced.clear(),o.decorRemoved.clear(),n=!1}}}var Cr=null;function Ir(){return Cr||(Cr=_b()),Cr}var se=null;function Un(){return se||(se={currentTile:rr(),myPets:ir(),gameMap:gt(),myInventory:cr(),players:Sr(),shops:Tr(),weather:Ar(),myGarden:Ir()},se)}function Ae(){if(!se)throw new Error("[Globals] Not initialized. Call initGlobals() first.");return se}function xl(){se&&(se.currentTile.destroy(),se.myPets.destroy(),se.gameMap.destroy(),se.myInventory.destroy(),se.players.destroy(),se.shops.destroy(),se.weather.destroy(),se.myGarden.destroy(),se=null)}var Fn={get currentTile(){return Ae().currentTile},get myPets(){return Ae().myPets},get gameMap(){return Ae().gameMap},get myInventory(){return Ae().myInventory},get players(){return Ae().players},get shops(){return Ae().shops},get weather(){return Ae().weather},get myGarden(){return Ae().myGarden}};var Jt=class{constructor(){ee(this,"logs",[]);ee(this,"maxLogs",1e3);ee(this,"unsubscribe",null);ee(this,"isInitialized",!1)}init(){this.isInitialized||(this.unsubscribe=Fn.myPets.subscribeAbility(t=>{this.log({abilityId:t.trigger.abilityId||"unknown",petId:t.pet.id,petSpecies:t.pet.petSpecies,petName:t.pet.name,timestamp:t.trigger.performedAt||Date.now()})}),this.isInitialized=!0)}log(t){let n={...t,id:`${t.timestamp}-${Math.random().toString(36).substr(2,9)}`};this.logs.push(n),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs))}getLogs(t){let n=this.logs;t?.abilityId&&(n=n.filter(o=>o.abilityId===t.abilityId)),t?.petId&&(n=n.filter(o=>o.petId===t.petId)),t?.petSpecies&&(n=n.filter(o=>o.petSpecies===t.petSpecies));let{since:r}=t??{};return r!==void 0&&(n=n.filter(o=>o.timestamp>=r)),t?.limit&&(n=n.slice(-t.limit)),n}getStats(t=36e5){let n=Date.now()-t,r=this.logs.filter(a=>a.timestamp>=n),o=new Map;for(let a of r){o.has(a.abilityId)||o.set(a.abilityId,{abilityId:a.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});let i=o.get(a.abilityId);i.count++,(!i.lastProc||a.timestamp>i.lastProc)&&(i.lastProc=a.timestamp)}for(let a of o.values())a.procsPerMinute=a.count/t*6e4,a.procsPerHour=a.count/t*36e5;return o}getAbilityStats(t,n=36e5){return this.getStats(n).get(t)||null}getPetStats(t,n=36e5){let r=Date.now()-n,o=this.logs.filter(i=>i.petId===t&&i.timestamp>=r),a=new Map;for(let i of o){a.has(i.abilityId)||a.set(i.abilityId,{abilityId:i.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});let s=a.get(i.abilityId);s.count++,(!s.lastProc||i.timestamp>s.lastProc)&&(s.lastProc=i.timestamp)}for(let i of a.values())i.procsPerMinute=i.count/n*6e4,i.procsPerHour=i.count/n*36e5;return{totalProcs:o.length,abilities:a}}getTopAbilities(t=10,n=36e5){return Array.from(this.getStats(n).values()).sort((o,a)=>a.count-o.count).slice(0,t)}clear(){this.logs=[]}setMaxLogs(t){this.maxLogs=t,this.logs.length>t&&(this.logs=this.logs.slice(-t))}getLogCount(){return this.logs.length}isActive(){return this.isInitialized}destroy(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null),this.logs=[],this.isInitialized=!1}},et=null;function vl(){return et||(et=new Jt,et.init()),et}function Sl(){et&&(et.destroy(),et=null)}var qt=class{constructor(){ee(this,"stats");ee(this,"storageKey","gemini_stats");this.stats=this.loadStats(),this.startSession()}loadStats(){try{let t=localStorage.getItem(this.storageKey);if(t)return JSON.parse(t)}catch(t){console.warn("[StatsTracker] Failed to load stats:",t)}return this.getDefaultStats()}saveStats(){try{localStorage.setItem(this.storageKey,JSON.stringify(this.stats))}catch(t){console.warn("[StatsTracker] Failed to save stats:",t)}}getDefaultStats(){return{session:{sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},allTime:{totalSessions:0,totalPlayTime:0,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0,crops:{},pets:{}}}}startSession(){this.stats.session={sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},this.stats.allTime.totalSessions++,this.saveStats()}endSession(){this.stats.session.sessionEnd=Date.now();let t=this.stats.session.sessionEnd-this.stats.session.sessionStart;this.stats.allTime.totalPlayTime+=t,this.saveStats()}recordHarvest(t,n=1,r=[]){this.stats.session.cropsHarvested+=n,this.stats.allTime.cropsHarvested+=n,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].harvested+=n;for(let o of r)this.stats.allTime.crops[t].mutations[o]||(this.stats.allTime.crops[t].mutations[o]=0),this.stats.allTime.crops[t].mutations[o]++;this.saveStats()}recordCropSale(t,n=1,r=0){this.stats.session.cropsSold+=n,this.stats.session.coinsEarned+=r,this.stats.allTime.cropsSold+=n,this.stats.allTime.coinsEarned+=r,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].sold+=n,this.stats.allTime.crops[t].totalValue+=r,this.saveStats()}recordPetHatch(t,n=[],r=[]){this.stats.session.petsHatched++,this.stats.allTime.petsHatched++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].hatched++;for(let o of n)this.stats.allTime.pets[t].mutations[o]||(this.stats.allTime.pets[t].mutations[o]=0),this.stats.allTime.pets[t].mutations[o]++;for(let o of r)this.stats.allTime.pets[t].abilities[o]||(this.stats.allTime.pets[t].abilities[o]=0),this.stats.allTime.pets[t].abilities[o]++;this.saveStats()}recordPetSale(t,n=0){this.stats.session.petsSold++,this.stats.session.coinsEarned+=n,this.stats.allTime.petsSold++,this.stats.allTime.coinsEarned+=n,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].sold++,this.saveStats()}recordPetFeed(t){this.stats.session.petsFed++,this.stats.allTime.petsFed++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].fed++,this.saveStats()}recordSeedPurchase(t,n=1,r=0){this.stats.session.seedsPurchased+=n,this.stats.session.coinsSpent+=r,this.stats.allTime.seedsPurchased+=n,this.stats.allTime.coinsSpent+=r,this.saveStats()}recordEggPurchase(t,n=1,r=0){this.stats.session.eggsPurchased+=n,this.stats.session.coinsSpent+=r,this.stats.allTime.eggsPurchased+=n,this.stats.allTime.coinsSpent+=r,this.saveStats()}recordAbilityProc(t){this.stats.session.abilityProcs++,this.stats.allTime.abilityProcs++,this.saveStats()}recordCoinsEarned(t){this.stats.session.coinsEarned+=t,this.stats.allTime.coinsEarned+=t,this.saveStats()}recordCoinsSpent(t){this.stats.session.coinsSpent+=t,this.stats.allTime.coinsSpent+=t,this.saveStats()}getStats(){return{...this.stats}}getSessionStats(){return{...this.stats.session}}getAllTimeStats(){return{...this.stats.allTime}}getCropStats(t){return this.stats.allTime.crops[t]||null}getPetStats(t){return this.stats.allTime.pets[t]||null}getTopCrops(t=10){return Object.entries(this.stats.allTime.crops).map(([n,r])=>({species:n,stats:r})).sort((n,r)=>r.stats.harvested-n.stats.harvested).slice(0,t)}getTopPets(t=10){return Object.entries(this.stats.allTime.pets).map(([n,r])=>({species:n,stats:r})).sort((n,r)=>r.stats.hatched-n.stats.hatched).slice(0,t)}resetSession(){this.startSession()}resetAll(){this.stats=this.getDefaultStats(),this.saveStats()}exportStats(){return JSON.stringify(this.stats,null,2)}importStats(t){try{let n=JSON.parse(t);return this.stats=n,this.saveStats(),!0}catch(n){return console.warn("[StatsTracker] Failed to import stats:",n),!1}}},bt=null;function wl(){return bt||(bt=new qt),bt}function Tl(){bt&&(bt.endSession(),bt=null)}var kl={AbilityLogger:Jt,getAbilityLogger:vl,destroyAbilityLogger:Sl,...Yo},Pl={StatsTracker:qt,getStatsTracker:wl,destroyStatsTracker:Tl};async function Al(e){let t=[{name:"Data",init:()=>Se.init()},{name:"Sprites",init:()=>ke.init()},{name:"TileObjectSystem",init:()=>Pe.init()},{name:"Pixi",init:()=>Ot.init()},{name:"Audio",init:()=>_t.init()},{name:"Cosmetics",init:()=>Wt.init()}];await Promise.all(t.map(async n=>{e?.({status:"start",name:n.name});try{await n.init(),e?.({status:"success",name:n.name})}catch(r){console.error(`[${n.name}] failed`,r),e?.({status:"error",name:n.name,error:r})}})),console.log("[Gemini] Modules ready. Access via Gemini.Modules in console.")}var Wb={Store:{select:X.select.bind(X),set:X.set.bind(X),subscribe:X.subscribe.bind(X),subscribeImmediate:X.subscribeImmediate.bind(X)},Globals:Fn,Modules:{Version:It,Assets:ve,Manifest:fe,Data:Se,Sprite:ke,Tile:Pe,Pixi:Ot,Audio:_t,Cosmetic:Wt,Achievements:Dn,Calculators:_n,Pets:kl,Tracker:Pl},WebSocket:{chat:un,emote:la,wish:ca,kickPlayer:ua,setPlayerData:da,usurpHost:pa,reportSpeakingStart:ma,setSelectedGame:ga,voteForGame:fa,requestGame:ba,restartGame:ha,ping:ya,checkWeatherStatus:Sa,move:xa,playerPosition:Zn,teleport:va,moveInventoryItem:wa,dropObject:Ta,pickupObject:ka,toggleFavoriteItem:Pa,putItemInStorage:Aa,retrieveItemFromStorage:Ca,moveStorageItem:Ma,logItems:Ia,plantSeed:Ea,waterPlant:La,harvestCrop:Ra,sellAllCrops:Oa,purchaseDecor:Da,purchaseEgg:Ga,purchaseTool:Ha,purchaseSeed:Na,plantEgg:_a,hatchEgg:Wa,plantGardenPlant:ja,potPlant:Ba,mutationPotion:Ua,pickupDecor:Fa,placeDecor:Va,removeGardenObject:za,placePet:$a,feedPet:Ka,petPositions:Ja,swapPet:qa,storePet:Xa,namePet:Ya,sellPet:Qa},_internal:{getGlobals:Ae,initGlobals:Un,destroyGlobals:xl}};function Cl(){A.Gemini=Wb}function Er(e){e.logStep("WebSocket","Capturing WebSocket...");let t=null;return t=cn(n=>{n.ws&&(e.logStep("WebSocket","WebSocket captured","success"),t?.(),t=null)},{intervalMs:250}),Mi({debug:!1}),()=>{t?.(),t=null}}async function Lr(e){e.logStep("Atoms","Prewarming Jotai store...");try{await nr(),await jn({timeoutMs:8e3,intervalMs:50}),e.logStep("Atoms","Jotai store ready","success")}catch(t){e.logStep("Atoms","Jotai store not captured yet","error"),console.warn("[Bootstrap] Jotai store wait failed",t)}}function Rr(e){e.logStep("Globals","Initializing global variables...");try{Un(),e.logStep("Globals","Global variables ready","success")}catch(t){e.logStep("Globals","Failed to initialize global variables","error"),console.warn("[Bootstrap] Global variables init failed",t)}}function Or(e){e.logStep("API","Exposing Gemini API...");try{Cl(),e.logStep("API","Gemini API ready","success")}catch(t){e.logStep("API","Failed to expose API","error"),console.warn("[Bootstrap] API init failed",t)}}function Dr(e){e.logStep("HUD","Loading HUD preferences...");let t=lo(),n=so({hostId:"gemini-hud-root",initialWidth:t.width,initialOpen:t.isOpen,onWidthChange:r=>rt("width",r),onOpenChange:r=>rt("isOpen",r),themes:Ge,initialTheme:t.theme,onThemeChange:r=>rt("theme",r),buildSections:r=>eo({applyTheme:r.applyTheme,initialTheme:r.initialTheme,getCurrentTheme:r.getCurrentTheme}),initialTab:t.activeTab,onTabChange:r=>rt("activeTab",r)});return e.logStep("HUD","HUD ready","success"),n}async function Gr(e){e.setSubtitle("Activating Gemini modules..."),await Al(t=>{t.status==="start"?e.logStep(t.name,`Loading ${t.name}...`):t.status==="success"?e.logStep(t.name,`${t.name} ready`,"success"):e.logStep(t.name,`${t.name} encountered an issue.`,"error")})}(async function(){"use strict";let e=zn({title:"Gemini is loading",subtitle:"Connecting and preparing modules..."}),t=null,n=null;try{t=Er(e),await Lr(e),Rr(e),Or(e),n=Dr(e),await Gr(e),e.succeed("Gemini is ready!")}catch(r){e.fail("Failed to initialize the mod.",r)}finally{t?.()}if(n){let r=n;pn({onClick:()=>r.setOpen(!0)})}})();})();
