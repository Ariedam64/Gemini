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
// @connect      magicgarden.gg
// ==/UserScript==
"use strict";(()=>{var Lr=Object.defineProperty;var Hr=(e,t,n)=>t in e?Lr(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var fe=(e,t,n)=>Hr(e,typeof t!="symbol"?t+"":t,n);function x(e,t=null,...n){let o=document.createElement(e);for(let[r,i]of Object.entries(t||{}))i!=null&&(r==="style"?typeof i=="string"?o.setAttribute("style",i):typeof i=="object"&&Object.assign(o.style,i):r.startsWith("on")&&typeof i=="function"?o[r.toLowerCase()]=i:r in o?o[r]=i:o.setAttribute(r,String(i)));for(let r of n)r==null||r===!1||o.appendChild(typeof r=="string"||typeof r=="number"?document.createTextNode(String(r)):r);return o}var gt="https://i.imgur.com/k5WuC32.png",Un="gemini-loader-style",Ce="gemini-loader",Kn=80;function Rr(){if(document.getElementById(Un))return;let e=document.createElement("style");e.id=Un,e.textContent=`
    /* ===== Loader Variables ===== */
    #${Ce} {
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
    #${Ce} {
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
      width: 36px;
      height: 36px;
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

    #${Ce}.gemini-loader--error .gemini-loader__actions {
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
    #${Ce}.gemini-loader--closing {
      animation: gemini-loader-fade-out 0.4s ease forwards;
      pointer-events: none;
    }

    #${Ce}.gemini-loader--error .gemini-loader__spinner {
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
      #${Ce} { padding: 16px 10px; }
      .gemini-loader__card { padding: 16px; }
      .gemini-loader__header { gap: 12px; }
      .gemini-loader__spinner { width: 42px; height: 42px; }
      .gemini-loader__spinner-icon { width: 32px; height: 32px; }
      .gemini-loader__title { font-size: 16px; }
    }
  `,document.head.appendChild(e)}function ft(e,t,n){let o=x("div",{className:`gemini-loader__log ${n}`},x("div",{className:"gemini-loader__dot"}),x("div",{textContent:t}));for(e.appendChild(o);e.childElementCount>Kn;)e.firstElementChild?.remove();e.scrollTop=e.scrollHeight}function Or(){return new Promise(e=>{if(typeof GM_xmlhttpRequest>"u"){e(gt);return}GM_xmlhttpRequest({method:"GET",url:gt,responseType:"blob",onload:t=>{let n=t.response,o=new FileReader;o.onloadend=()=>e(o.result),o.onerror=()=>e(gt),o.readAsDataURL(n)},onerror:()=>e(gt)})})}function qn(e={}){let t=Number.isFinite(e.blurPx)?Math.max(4,Number(e.blurPx)):14;Rr();let n=x("div",{className:"gemini-loader__subtitle",textContent:e.subtitle??"Initializing the mod..."}),o=x("div",{className:"gemini-loader__logs"}),r=x("img",{className:"gemini-loader__spinner-icon",alt:"Gemini"}),i=x("div",{className:"gemini-loader__spinner"},r);Or().then(h=>{r.src=h});let a=x("div",{className:"gemini-loader__card"},x("div",{className:"gemini-loader__header"},i,x("div",{className:"gemini-loader__titles"},x("div",{className:"gemini-loader__title",textContent:e.title??"Gemini is loading"}),n)),o),s=x("div",{id:Ce},a);(document.body||document.documentElement).appendChild(s);let l=x("div",{className:"gemini-loader__actions"},x("button",{className:"gemini-loader__button",textContent:"Close loader",onclick:()=>s.remove()}));a.appendChild(l),s.style.setProperty("--loader-blur",`${t}px`);let u=h=>{n.textContent=h},d=new Map,c=(h,y)=>{h.className=`gemini-loader__log ${y}`};return{log:(h,y="info")=>ft(o,h,y),logStep:(h,y,k="info")=>{let S=String(h||"").trim();if(!S){ft(o,y,k);return}let v=d.get(S);if(v){v.el.lastElementChild&&(v.el.lastElementChild.textContent=y),v.tone!==k&&(c(v.el,k),v.tone=k);return}let w=x("div",{className:`gemini-loader__log ${k}`},x("div",{className:"gemini-loader__dot"}),x("div",{textContent:y}));for(d.set(S,{el:w,tone:k}),o.appendChild(w);o.childElementCount>Kn;){let T=o.firstElementChild;if(!T)break;let C=Array.from(d.entries()).find(([,M])=>M.el===T)?.[0];C&&d.delete(C),T.remove()}o.scrollTop=o.scrollHeight},setSubtitle:u,succeed:(h,y=600)=>{h&&ft(o,h,"success"),s.classList.add("gemini-loader--closing"),setTimeout(()=>s.remove(),y)},fail:(h,y)=>{ft(o,h,"error"),u("Something went wrong. Check the console for details."),s.classList.add("gemini-loader--error"),console.error("[Gemini loader]",h,y)}}}function Jn(e,t,n){let o=x("div",{className:"lg-pill",id:"pill"}),r=e.map(d=>{let c=x("button",{className:"lg-tab"},d.label);return c.setAttribute("data-target",d.id),c}),i=x("div",{className:"lg-tabs",id:"lg-tabs-row"},o,...r),a=i;i.addEventListener("wheel",d=>{Math.abs(d.deltaY)>Math.abs(d.deltaX)&&(d.preventDefault(),i.scrollLeft+=d.deltaY)},{passive:!1});function s(d){let c=i.getBoundingClientRect(),p=r.find(w=>w.dataset.target===d)||r[0];if(!p)return;let m=p.getBoundingClientRect(),f=m.left-c.left,b=m.width;o.style.width=`${b}px`,o.style.transform=`translateX(${f}px)`;let h=i.scrollLeft,y=h,k=h+i.clientWidth,S=f-12,v=f+b+12;S<y?i.scrollTo({left:S,behavior:"smooth"}):v>k&&i.scrollTo({left:v-i.clientWidth,behavior:"smooth"})}let l=t||(e[0]?.id??"");function u(d){l=d,r.forEach(c=>c.classList.toggle("active",c.dataset.target===d)),s(d),n(d)}return r.forEach(d=>d.addEventListener("click",()=>u(d.dataset.target))),queueMicrotask(()=>s(l)),{root:a,activate:u,recalc:()=>s(l),getActive:()=>l}}var Me=class{constructor(t){fe(this,"id");fe(this,"label");fe(this,"container",null);fe(this,"cleanupFunctions",[]);this.id=t.id,this.label=t.label}render(t){for(this.unmount();t.firstChild;)t.removeChild(t.firstChild);this.container=t;let n=this.build(t);n instanceof Promise&&n.catch(r=>{console.error(`[Gemini] Error building section ${this.id}:`,r)});let o=t.firstElementChild;o&&o.classList.contains("gemini-section")&&o.classList.add("active")}unmount(){this.executeCleanup(),this.container=null}createContainer(t,n){let o=n?`gemini-section ${n}`:"gemini-section";return x("section",{id:t,className:o})}addCleanup(t){this.cleanupFunctions.push(t)}createGrid(t="12px"){let n=x("div");return n.style.display="grid",n.style.gap=t,n}executeCleanup(){for(let t of this.cleanupFunctions)try{t()}catch(n){console.error(`[Gemini] Cleanup error in section ${this.id}:`,n)}this.cleanupFunctions=[]}};var Ue=class{constructor(t,n,o){fe(this,"sections");fe(this,"activeId",null);fe(this,"container");fe(this,"theme");this.sections=new Map(t.map(r=>[r.id,r])),this.container=n,this.theme=o}get ids(){return Array.from(this.sections.keys())}get all(){return Array.from(this.sections.values())}get active(){return this.activeId}activate(t){if(this.activeId!==t){if(!this.sections.has(t))throw new Error(`[Gemini] Unknown section: ${t}`);if(this.activeId&&this.sections.get(this.activeId).unmount(),this.activeId=t,this.sections.get(t).render(this.container),this.theme){let n=this.theme.getCurrentTheme();this.theme.applyTheme(n)}}}};function Ke(e,t){try{let n=JSON.stringify(t);GM_setValue(e,n)}catch(n){console.error(`[Gemini] Failed to save key "${e}" to storage:`,n)}}function we(e,t){try{let n=GM_getValue(e);return n==null?t:typeof n=="string"?JSON.parse(n):n}catch(n){return console.error(`[Gemini] Failed to load key "${e}" from storage, using default:`,n),t}}var Yn="gemini.sections";function Xn(){let e=we(Yn,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function _r(e){Ke(Yn,e)}async function Qn(e){return Xn()[e]}function Zn(e,t){let n=Xn();_r({...n,[e]:t})}function bt(e,t){return{...e,...t??{}}}async function eo(e){let t=await Qn(e.path),n;e.migrate?n=e.migrate(t):n=t??{},n=Object.assign((u=>JSON.parse(JSON.stringify(u)))(e.defaults),n),e.sanitize&&(n=e.sanitize(n));function r(){Zn(e.path,n)}function i(){return n}function a(u){n=e.sanitize?e.sanitize(u):u,r()}function s(u){let c=Object.assign((p=>JSON.parse(JSON.stringify(p)))(n),{});typeof u=="function"?u(c):Object.assign(c,u),n=e.sanitize?e.sanitize(c):c,r()}function l(){r()}return{get:i,set:a,update:s,save:l}}async function qe(e,t){let{path:n=e,...o}=t;return eo({path:n,...o})}var Nr=0,ht=new Map;function ke(e={},...t){let{id:n,className:o,variant:r="default",padding:i="md",interactive:a=!1,expandable:s=!1,defaultExpanded:l=!0,onExpandChange:u,mediaTop:d,title:c,subtitle:p,badge:m,actions:f,footer:b,divider:h=!1,tone:y="neutral",stateKey:k}=e,S=x("div",{className:"card",id:n,tabIndex:a?0:void 0});S.classList.add(`card--${r}`,`card--p-${i}`),a&&S.classList.add("card--interactive"),y!=="neutral"&&S.classList.add(`card--tone-${y}`),o&&S.classList.add(...o.split(" ").filter(Boolean)),s&&S.classList.add("card--expandable");let v=s?k??n??(typeof c=="string"?`title:${c}`:null):null,w=!s||l;v&&ht.has(v)&&(w=!!ht.get(v));let T=null,C=null,M=null,L=null,O=null,P=n?`${n}-collapse`:`card-collapse-${++Nr}`,U=()=>{if(L!==null&&(cancelAnimationFrame(L),L=null),O){let I=O;O=null,I()}},q=(I,_)=>{if(!M)return;U();let E=M;if(E.setAttribute("aria-hidden",String(!I)),!_){E.classList.remove("card-collapse--animating"),E.style.display=I?"":"none",E.style.height="",E.style.opacity="";return}if(E.classList.add("card-collapse--animating"),E.style.display="",I){E.style.height="auto";let z=E.scrollHeight;if(!z){E.classList.remove("card-collapse--animating"),E.style.display="",E.style.height="",E.style.opacity="";return}E.style.height="0px",E.style.opacity="0",E.offsetHeight,L=requestAnimationFrame(()=>{L=null,E.style.height=`${z}px`,E.style.opacity="1"})}else{let z=E.scrollHeight;if(!z){E.classList.remove("card-collapse--animating"),E.style.display="none",E.style.height="",E.style.opacity="";return}E.style.height=`${z}px`,E.style.opacity="1",E.offsetHeight,L=requestAnimationFrame(()=>{L=null,E.style.height="0px",E.style.opacity="0"})}let A=()=>{E.classList.remove("card-collapse--animating"),E.style.height="",I||(E.style.display="none"),E.style.opacity=""},R=null,G=z=>{z.target===E&&(R!==null&&(clearTimeout(R),R=null),E.removeEventListener("transitionend",G),E.removeEventListener("transitioncancel",G),O=null,A())};O=()=>{R!==null&&(clearTimeout(R),R=null),E.removeEventListener("transitionend",G),E.removeEventListener("transitioncancel",G),O=null,A()},E.addEventListener("transitionend",G),E.addEventListener("transitioncancel",G),R=window.setTimeout(()=>{O?.()},420)};function K(I){let _=document.createElementNS("http://www.w3.org/2000/svg","svg");return _.setAttribute("viewBox","0 0 24 24"),_.setAttribute("width","16"),_.setAttribute("height","16"),_.innerHTML=I==="up"?'<path d="M7 14l5-5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>':'<path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',_}function D(I,_=!0,E=!0){w=I,S.classList.toggle("card--collapsed",!w),S.classList.toggle("card--expanded",w),T&&(T.dataset.expanded=String(w),T.setAttribute("aria-expanded",String(w))),C&&(C.setAttribute("aria-expanded",String(w)),C.classList.toggle("card-toggle--collapsed",!w),C.setAttribute("aria-label",w?"Replier le contenu":"Deplier le contenu"),C.replaceChildren(K(w?"up":"down"))),s?q(w,E):M&&(M.style.display="",M.style.height="",M.style.opacity="",M.setAttribute("aria-hidden","false")),_&&u&&u(w),v&&ht.set(v,w)}if(d){let I=x("div",{className:"card-media"});I.append(d),S.appendChild(I)}let W=!!(c||p||m||f&&f.length||s);if(W){T=x("div",{className:"card-header"});let I=x("div",{className:"card-headline",style:"min-width:0;display:flex;flex-direction:column;gap:2px;"});if(c){let A=x("h3",{className:"card-title",style:"margin:0;font-size:15px;font-weight:700;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:8px;"},c);m&&A.append(typeof m=="string"?x("span",{className:"badge"},m):m),I.appendChild(A)}if(p){let A=x("div",{className:"card-subtitle",style:"opacity:.85;font-size:12px;color:color-mix(in oklab, var(--fg) 80%, #9ca3af)"},p);I.appendChild(A)}(I.childNodes.length||s)&&T.appendChild(I);let _=x("div",{className:"card-header-right",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"}),E=x("div",{className:"card-actions",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"});f?.forEach(A=>E.appendChild(A)),E.childNodes.length&&_.appendChild(E),s&&(C=x("button",{className:"card-toggle",type:"button",ariaExpanded:String(w),ariaControls:P,ariaLabel:w?"Replier le contenu":"Deplier le contenu"}),C.textContent=w?"\u25B2":"\u25BC",C.addEventListener("click",A=>{A.preventDefault(),A.stopPropagation(),D(!w)}),_.appendChild(C),T.classList.add("card-header--expandable"),T.addEventListener("click",A=>{let R=A.target;R?.closest(".card-actions")||R?.closest(".card-toggle")||D(!w)})),_.childNodes.length&&T.appendChild(_),S.appendChild(T)}M=x("div",{className:"card-collapse",id:P,ariaHidden:s?String(!w):"false"}),S.appendChild(M),h&&W&&M.appendChild(x("div",{className:"card-divider"}));let H=x("div",{className:"card-body"});if(H.append(...t),M.appendChild(H),b){h&&M.appendChild(x("div",{className:"card-divider"}));let I=x("div",{className:"card-footer"});I.append(b),M.appendChild(I)}return C&&C.setAttribute("aria-controls",P),D(w,!1,!1),v&&ht.set(v,w),S}function Yt(...e){return x("div",{className:"card-footer"},...e)}var yt=!1,xt=new Set,ce=e=>{let t=document.activeElement;for(let n of xt)if(t&&(t===n||n.contains(t))){e.stopImmediatePropagation(),e.stopPropagation();return}};function Dr(){yt||(yt=!0,window.addEventListener("keydown",ce,!0),window.addEventListener("keypress",ce,!0),window.addEventListener("keyup",ce,!0),document.addEventListener("keydown",ce,!0),document.addEventListener("keypress",ce,!0),document.addEventListener("keyup",ce,!0))}function Gr(){yt&&(xt.size>0||(yt=!1,window.removeEventListener("keydown",ce,!0),window.removeEventListener("keypress",ce,!0),window.removeEventListener("keyup",ce,!0),document.removeEventListener("keydown",ce,!0),document.removeEventListener("keypress",ce,!0),document.removeEventListener("keyup",ce,!0)))}function _e(e){let{id:t,value:n=null,options:o,placeholder:r="Select...",size:i="md",disabled:a=!1,blockGameKeys:s=!0,onChange:l,onOpenChange:u}=e,d=x("div",{className:"select",id:t}),c=x("button",{className:"select-trigger",type:"button"}),p=x("span",{className:"select-value"},r),m=x("span",{className:"select-caret"},"\u25BE");c.append(p,m);let f=x("div",{className:"select-menu",role:"listbox",tabindex:"-1","aria-hidden":"true"});d.classList.add(`select--${i}`);let b=!1,h=n,y=null,k=!!a;function S(A){return A==null?r:(e.options||o).find(G=>G.value===A)?.label??r}function v(A){p.textContent=S(A),f.querySelectorAll(".select-option").forEach(R=>{let G=R.dataset.value,z=A!=null&&G===A;R.classList.toggle("selected",z),R.setAttribute("aria-selected",String(z))})}function w(A){f.replaceChildren(),A.forEach(R=>{let G=x("button",{className:"select-option"+(R.disabled?" disabled":""),type:"button",role:"option","data-value":R.value,"aria-selected":String(R.value===h),tabindex:"-1"},R.label);R.value===h&&G.classList.add("selected"),R.disabled||G.addEventListener("pointerdown",z=>{z.preventDefault(),z.stopPropagation(),P(R.value,{notify:!0}),L()},{capture:!0}),f.appendChild(G)})}function T(){c.setAttribute("aria-expanded",String(b)),f.setAttribute("aria-hidden",String(!b))}function C(){let A=c.getBoundingClientRect();Object.assign(f.style,{minWidth:`${A.width}px`})}function M(){b||k||(b=!0,d.classList.add("open"),T(),C(),document.addEventListener("mousedown",W,!0),document.addEventListener("scroll",H,!0),window.addEventListener("resize",I),f.focus({preventScroll:!0}),s&&(Dr(),xt.add(d),y=()=>{xt.delete(d),Gr()}),u?.(!0))}function L(){b&&(b=!1,d.classList.remove("open"),T(),document.removeEventListener("mousedown",W,!0),document.removeEventListener("scroll",H,!0),window.removeEventListener("resize",I),c.focus({preventScroll:!0}),y?.(),y=null,u?.(!1))}function O(){b?L():M()}function P(A,R={}){let G=h;h=A,v(h),R.notify!==!1&&G!==A&&l?.(A)}function U(){return h}function q(A){let R=Array.from(f.querySelectorAll(".select-option:not(.disabled)"));if(!R.length)return;let G=R.findIndex(te=>te.classList.contains("active")),z=R[(G+(A===1?1:R.length-1))%R.length];R.forEach(te=>te.classList.remove("active")),z.classList.add("active"),z.focus({preventScroll:!0}),z.scrollIntoView({block:"nearest"})}function K(A){(A.key===" "||A.key==="Enter"||A.key==="ArrowDown")&&(A.preventDefault(),M())}function D(A){if(A.key==="Escape"){A.preventDefault(),L();return}if(A.key==="Enter"||A.key===" "){let R=f.querySelector(".select-option.active")||f.querySelector(".select-option.selected");R&&!R.classList.contains("disabled")&&(A.preventDefault(),P(R.dataset.value,{notify:!0}),L());return}if(A.key==="ArrowDown"){A.preventDefault(),q(1);return}if(A.key==="ArrowUp"){A.preventDefault(),q(-1);return}}function W(A){d.contains(A.target)||L()}function H(){b&&C()}function I(){b&&C()}function _(A){k=!!A,c.disabled=k,d.classList.toggle("disabled",k),k&&L()}function E(A){e.options=A,w(A),A.some(R=>R.value===h)||(h=null,v(null))}return d.append(c,f),c.addEventListener("pointerdown",A=>{A.preventDefault(),A.stopPropagation(),O()},{capture:!0}),c.addEventListener("keydown",K),f.addEventListener("keydown",D),w(o),n!=null?(h=n,v(h)):v(null),T(),_(k),{root:d,open:M,close:L,toggle:O,getValue:U,setValue:P,setOptions:E,setDisabled:_,destroy(){document.removeEventListener("mousedown",W,!0),document.removeEventListener("scroll",H,!0),window.removeEventListener("resize",I),y?.(),y=null}}}function vt(e={}){let{id:t,text:n="",htmlFor:o,tone:r="default",size:i="md",layout:a="inline",variant:s="text",required:l=!1,disabled:u=!1,tooltip:d,hint:c,icon:p,suffix:m,onClick:f}=e,b=x("div",{className:"lg-label-wrap",id:t}),h=x("label",{className:"lg-label",...o?{htmlFor:o}:{},...d?{title:d}:{}});if(p){let P=typeof p=="string"?x("span",{className:"lg-label-ico"},p):p;P.classList?.add?.("lg-label-ico"),h.appendChild(P)}let y=x("span",{className:"lg-label-text"},n);h.appendChild(y);let k=x("span",{className:"lg-label-req",ariaHidden:"true"}," *");l&&h.appendChild(k);let S=null;if(m!=null){S=typeof m=="string"?document.createTextNode(m):m;let P=x("span",{className:"lg-label-suffix"});P.appendChild(S),h.appendChild(P)}let v=c?x("div",{className:"lg-label-hint"},c):null;b.classList.add(`lg-label--${a}`),b.classList.add(`lg-label--${i}`),s==="title"&&b.classList.add("lg-label--title"),w(r),u&&b.classList.add("is-disabled"),b.appendChild(h),v&&b.appendChild(v),f&&h.addEventListener("click",f);function w(P){b.classList.remove("lg-label--default","lg-label--muted","lg-label--info","lg-label--success","lg-label--warning","lg-label--danger"),b.classList.add(`lg-label--${P}`)}function T(P){y.textContent=P}function C(P){w(P)}function M(P){P&&!k.isConnected&&h.appendChild(k),!P&&k.isConnected&&k.remove(),P?h.setAttribute("aria-required","true"):h.removeAttribute("aria-required")}function L(P){b.classList.toggle("is-disabled",!!P)}function O(P){!P&&v&&v.isConnected?v.remove():P&&v?v.textContent=P:P&&!v&&b.appendChild(x("div",{className:"lg-label-hint"},P))}return{root:b,labelEl:h,hintEl:v,setText:T,setTone:C,setRequired:M,setDisabled:L,setHint:O}}function Je(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function wt(e,t){let n=document.createElement("span");n.className=`btn-ico btn-ico--${t}`;let o=Je(e);return o&&n.appendChild(o),n}function Wr(){let e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.marginRight="6px",t.style.display="none",t.style.flexShrink="0";let n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");let o=document.createElementNS(e,"animate");o.setAttribute("attributeName","stroke-dasharray"),o.setAttribute("values","1,150;90,150;90,150"),o.setAttribute("dur","1.5s"),o.setAttribute("repeatCount","indefinite");let r=document.createElementNS(e,"animateTransform");return r.setAttribute("attributeName","transform"),r.setAttribute("attributeType","XML"),r.setAttribute("type","rotate"),r.setAttribute("from","0 12 12"),r.setAttribute("to","360 12 12"),r.setAttribute("dur","1s"),r.setAttribute("repeatCount","indefinite"),n.appendChild(o),n.appendChild(r),t.appendChild(n),t}function Se(e={}){let{label:t="",id:n,variant:o="default",size:r="md",iconLeft:i,iconRight:a,loading:s=!1,tooltip:l,type:u="button",onClick:d,disabled:c=!1,fullWidth:p=!1}=e,m=x("button",{className:"btn",id:n});m.type=u,o==="primary"&&m.classList.add("primary"),r==="sm"&&m.classList.add("btn--sm"),l&&(m.title=l),p&&(m.style.width="100%");let f=Wr(),b=i?wt(i,"left"):null,h=a?wt(a,"right"):null,y=document.createElement("span");y.className="btn-label";let k=Je(t);k&&y.appendChild(k),!k&&(b||h)&&m.classList.add("btn--icon"),m.appendChild(f),b&&m.appendChild(b),m.appendChild(y),h&&m.appendChild(h);let S=c||s;m.disabled=S,m.setAttribute("aria-busy",String(!!s)),f.style.display=s?"inline-block":"none",d&&m.addEventListener("click",d);let v=m;return v.setLoading=w=>{m.setAttribute("aria-busy",String(!!w)),f.style.display=w?"inline-block":"none",m.disabled=w||c},v.setDisabled=w=>{m.disabled=w||m.getAttribute("aria-busy")==="true"},v.setLabel=w=>{y.replaceChildren();let T=Je(w);T&&y.appendChild(T),!T&&(b||h)?m.classList.add("btn--icon"):m.classList.remove("btn--icon")},v.setIconLeft=w=>{if(w==null){b?.remove();return}b?b.replaceChildren(Je(w)):m.insertBefore(wt(w,"left"),y)},v.setIconRight=w=>{if(w==null){h?.remove();return}h?h.replaceChildren(Je(w)):m.appendChild(wt(w,"right"))},v}function Br(){try{let e=window.visualViewport,t=Math.round((e?.width??window.innerWidth)||0),n=Math.round((e?.height??window.innerHeight)||0);if(t&&n)return t>=n?"landscape":"portrait"}catch{}return"unknown"}function Vr(){let e=navigator.userAgent||"",t=navigator.platform||"",n=navigator.userAgentData;if(n&&typeof n.platform=="string"){let r=n.platform.toLowerCase();if(r.includes("windows"))return"windows";if(r.includes("mac"))return"mac";if(r.includes("android"))return"android";if(r.includes("chrome os")||r.includes("cros"))return"chromeos";if(r.includes("linux"))return"linux";if(r.includes("ios"))return"ios"}return/iPhone|iPad|iPod/i.test(e)||t==="MacIntel"&&navigator.maxTouchPoints>1?"ios":/Android/i.test(e)?"android":/CrOS/i.test(e)?"chromeos":/Win/i.test(e)?"windows":/Mac/i.test(e)?"mac":/Linux/i.test(e)?"linux":"unknown"}function jr(){let e=navigator.userAgent||"",t=navigator.userAgentData;if(t&&Array.isArray(t.brands)){let n=t.brands.map(a=>String(a.brand||a.brandName||a.brandVersion||a)),o=n.some(a=>/Edge/i.test(a)||/Microsoft Edge/i.test(a)),r=n.some(a=>/Opera/i.test(a)||/OPR/i.test(a)),i=n.some(a=>/Chrome|Chromium/i.test(a));if(o)return"Edge";if(r)return"Opera";if(i)return"Chrome";if(navigator.brave)return"Brave"}return/FxiOS/i.test(e)?"Firefox":/CriOS/i.test(e)?"Chrome":/EdgiOS/i.test(e)?"Edge":/OPiOS|OPR|Opera Mini|Opera/i.test(e)?"Opera":/Edg\//i.test(e)?"Edge":/OPR\//i.test(e)||/Opera/i.test(e)?"Opera":/Firefox/i.test(e)?"Firefox":/Safari/i.test(e)&&!/Chrome|Chromium|Edg|OPR/i.test(e)?"Safari":/Brave/i.test(e)||window.Brave||navigator.brave?"Brave":/Chrome|Chromium/i.test(e)?"Chrome":"Unknown"}function Fr(){let e=navigator.userAgent||"",t=navigator.userAgentData;return t&&typeof t.mobile=="boolean"?t.mobile?"mobile":"desktop":/Android|iPhone|iPad|iPod|Mobile/i.test(e)?"mobile":"desktop"}function pe(){let e=(()=>{try{return window.top!==window.self}catch{return!0}})(),t=zr(document.referrer),o=e&&!!t&&/(^|\.)discord(app)?\.com$/i.test(t)?"discord":"web",r=Fr(),i=Vr(),a=jr(),s=window.screen||{},l=window.visualViewport,u=Math.round(window.innerWidth||document.documentElement.clientWidth||0),d=Math.round(window.innerHeight||document.documentElement.clientHeight||0),c=Math.round(l?.width??u),p=Math.round(l?.height??d),m=Math.round(s.width||0),f=Math.round(s.height||0),b=Math.round(s.availWidth||m),h=Math.round(s.availHeight||f),y=Number.isFinite(window.devicePixelRatio)?window.devicePixelRatio:1;return{surface:o,host:location.hostname,origin:location.origin,isInIframe:e,platform:r,browser:a,os:i,viewportWidth:u,viewportHeight:d,visualViewportWidth:c,visualViewportHeight:p,screenWidth:m,screenHeight:f,availScreenWidth:b,availScreenHeight:h,dpr:y,orientation:Br()}}function to(){return pe().surface==="discord"}function zr(e){if(!e)return null;try{return new URL(e).hostname}catch{return null}}var kt=!1,Ye=new Set;function $r(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}var de=e=>{let t=$r();if(t){for(let n of Ye)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function Ur(){kt||(kt=!0,window.addEventListener("keydown",de,!0),window.addEventListener("keypress",de,!0),window.addEventListener("keyup",de,!0),document.addEventListener("keydown",de,!0),document.addEventListener("keypress",de,!0),document.addEventListener("keyup",de,!0))}function Kr(){kt&&(kt=!1,window.removeEventListener("keydown",de,!0),window.removeEventListener("keypress",de,!0),window.removeEventListener("keyup",de,!0),document.removeEventListener("keydown",de,!0),document.removeEventListener("keypress",de,!0),document.removeEventListener("keyup",de,!0))}function qr(e){return Ye.size===0&&Ur(),Ye.add(e),()=>{Ye.delete(e),Ye.size===0&&Kr()}}function Jr(e,t,n,o){let r;switch(e){case"digits":r="0-9";break;case"alpha":r="\\p{L}";break;case"alphanumeric":r="\\p{L}0-9";break;default:return null}return t&&(r+=" "),n&&(r+="\\-"),o&&(r+="_"),new RegExp(`[^${r}]`,"gu")}function Yr(e,t){return t?e.replace(t,""):e}function Xr(e,t=0){if(!t)return e;let n;return((...o)=>{clearTimeout(n),n=setTimeout(()=>e(...o),t)})}function no(e={}){let{id:t,placeholder:n="",value:o="",mode:r="any",allowSpaces:i=!1,allowDashes:a=!1,allowUnderscore:s=!1,maxLength:l,blockGameKeys:u=!0,debounceMs:d=0,onChange:c,onEnter:p,label:m}=e,f=x("div",{className:"lg-input-wrap"}),b=x("input",{className:"input",id:t,placeholder:n});if(typeof l=="number"&&l>0&&(b.maxLength=l),o&&(b.value=o),m){let P=x("div",{className:"lg-input-label"},m);f.appendChild(P)}f.appendChild(b);let h=Jr(r,i,a,s),y=()=>{let P=b.selectionStart??b.value.length,U=b.value.length,q=Yr(b.value,h);if(q!==b.value){b.value=q;let K=U-q.length,D=Math.max(0,P-K);b.setSelectionRange(D,D)}},k=Xr(()=>c?.(b.value),d);b.addEventListener("input",()=>{y(),k()}),b.addEventListener("paste",()=>queueMicrotask(()=>{y(),k()})),b.addEventListener("keydown",P=>{P.key==="Enter"&&p?.(b.value)});let S=u?qr(b):()=>{};function v(){return b.value}function w(P){b.value=P??"",y(),k()}function T(){b.focus()}function C(){b.blur()}function M(P){b.disabled=!!P}function L(){return document.activeElement===b}function O(){S()}return{root:f,input:b,getValue:v,setValue:w,focus:T,blur:C,setDisabled:M,isFocused:L,destroy:O}}function ee(e,t,n){return Math.min(n,Math.max(t,e))}function Qe({h:e,s:t,v:n,a:o}){let r=(e%360+360)%360/60,i=n*t,a=i*(1-Math.abs(r%2-1)),s=0,l=0,u=0;switch(Math.floor(r)){case 0:s=i,l=a;break;case 1:s=a,l=i;break;case 2:l=i,u=a;break;case 3:l=a,u=i;break;case 4:s=a,u=i;break;default:s=i,u=a;break}let c=n-i,p=Math.round((s+c)*255),m=Math.round((l+c)*255),f=Math.round((u+c)*255);return{r:ee(p,0,255),g:ee(m,0,255),b:ee(f,0,255),a:ee(o,0,1)}}function oo({r:e,g:t,b:n,a:o}){let r=ee(e,0,255)/255,i=ee(t,0,255)/255,a=ee(n,0,255)/255,s=Math.max(r,i,a),l=Math.min(r,i,a),u=s-l,d=0;u!==0&&(s===r?d=60*((i-a)/u%6):s===i?d=60*((a-r)/u+2):d=60*((r-i)/u+4)),d<0&&(d+=360);let c=s===0?0:u/s;return{h:d,s:c,v:s,a:ee(o,0,1)}}function Qt({r:e,g:t,b:n}){let o=r=>ee(Math.round(r),0,255).toString(16).padStart(2,"0");return`#${o(e)}${o(t)}${o(n)}`.toUpperCase()}function Qr({r:e,g:t,b:n,a:o}){let r=ee(Math.round(o*255),0,255);return`${Qt({r:e,g:t,b:n,a:o})}${r.toString(16).padStart(2,"0")}`.toUpperCase()}function Xe({r:e,g:t,b:n,a:o}){let r=Math.round(o*1e3)/1e3;return`rgba(${e}, ${t}, ${n}, ${r})`}function Ne(e){let t=e.trim();if(!t||(t.startsWith("#")&&(t=t.slice(1)),![3,4,6,8].includes(t.length))||!/^[0-9a-fA-F]+$/.test(t))return null;(t.length===3||t.length===4)&&(t=t.split("").map(a=>a+a).join(""));let n=255;t.length===8&&(n=parseInt(t.slice(6,8),16),t=t.slice(0,6));let o=parseInt(t.slice(0,2),16),r=parseInt(t.slice(2,4),16),i=parseInt(t.slice(4,6),16);return{r:o,g:r,b:i,a:n/255}}function Xt(e){if(!e)return null;let t=e.trim();if(t.startsWith("#"))return Ne(t);let n=t.match(/^rgba?\(([^)]+)\)$/i);if(n){let o=n[1].split(",").map(l=>l.trim());if(o.length<3)return null;let r=Number(o[0]),i=Number(o[1]),a=Number(o[2]),s=o[3]!=null?Number(o[3]):1;return[r,i,a,s].some(l=>Number.isNaN(l))?null:{r,g:i,b:a,a:s}}return null}function Zr(e,t){let n=Xt(e)??Ne(e??"")??{r:244,g:67,b:54,a:1};return typeof t=="number"&&(n.a=ee(t,0,1)),oo(n)}function ei(e){return`#${e.trim().replace(/[^0-9a-fA-F#]/g,"").replace(/#/g,"")}`.slice(0,9).toUpperCase()}function ti(e){let t=e.trim();return t&&(/^rgba?\s*\(/i.test(t)?t=t.replace(/^rgba?/i,"rgba"):(t=t.replace(/^\(?(.*)\)?$/,"$1"),t=`rgba(${t})`),t=t.replace(/\s*\(\s*/,"("),t=t.replace(/\s*\)\s*$/,")"),t=t.replace(/\s*,\s*/g,", "),t)}function Pe(e){let t=Qe(e),n=Qe({...e,a:1});return{hsva:{...e},hex:Qt(n),hexa:Qr(t),rgba:Xe(t),alpha:e.a}}function ro(e={}){let{id:t,label:n="Color",value:o,alpha:r,defaultExpanded:i=!1,detectMobile:a,onInput:s,onChange:l}=e,d=a?a():pe().platform==="mobile",c=Zr(o,r),p=ke({id:t,className:"color-picker",title:n,padding:d?"md":"lg",variant:"soft",expandable:!d,defaultExpanded:!d&&i});p.classList.add(d?"color-picker--mobile":"color-picker--desktop");let m=p.querySelector(".card-header");m&&m.classList.add("color-picker__header");let f=m?.querySelector(".card-title"),b=x("button",{className:"color-picker__preview",type:"button",title:`Preview ${n}`,"aria-label":`Change ${n}`});f?f.prepend(b):m?m.prepend(b):p.prepend(b);let h=p.querySelector(".card-toggle");!d&&h&&b.addEventListener("click",()=>{p.classList.contains("card--collapsed")&&h.click()});let y=p.querySelector(".card-collapse"),k=null,S=null,v=null,w=null,T=null,C=null,M=null,L=null,O=null,P="hex";function U(H){let I=Pe(c);H==="input"?s?.(I):l?.(I)}function q(){let H=Pe(c);if(b.style.setProperty("--cp-preview-color",H.rgba),b.setAttribute("aria-label",`${n}: ${H.hexa}`),!d&&k&&S&&v&&w&&T&&C&&M){let I=Qe({...c,s:1,v:1,a:1}),_=Xe(I);k.style.setProperty("--cp-palette-hue",_),S.style.left=`${c.s*100}%`,S.style.top=`${(1-c.v)*100}%`,v.style.setProperty("--cp-alpha-gradient",`linear-gradient(180deg, ${Xe({...I,a:1})} 0%, ${Xe({...I,a:0})} 100%)`),w.style.top=`${(1-c.a)*100}%`,T.style.setProperty("--cp-hue-color",Xe(Qe({...c,v:1,s:1,a:1}))),C.style.left=`${c.h/360*100}%`;let E=c.a===1?H.hex:H.hexa,A=H.rgba,R=P==="hex"?E:A;M!==document.activeElement&&(M.value=R),M.setAttribute("aria-label",`${P.toUpperCase()} code for ${n}`),M.placeholder=P==="hex"?"#RRGGBB or #RRGGBBAA":"rgba(0, 0, 0, 1)",P==="hex"?M.maxLength=9:M.removeAttribute("maxLength"),M.dataset.mode=P,L&&(L.textContent=P.toUpperCase(),L.setAttribute("aria-label",P==="hex"?"Passer en saisie RGBA":"Revenir en saisie HEX"),L.setAttribute("aria-pressed",P==="rgba"?"true":"false"),L.classList.toggle("is-alt",P==="rgba"))}O&&O!==document.activeElement&&(O.value=H.hex)}function K(H,I=null){c={h:(H.h%360+360)%360,s:ee(H.s,0,1),v:ee(H.v,0,1),a:ee(H.a,0,1)},q(),I&&U(I)}function D(H,I=null){K(oo(H),I)}function W(H,I,_){H.addEventListener("pointerdown",E=>{E.preventDefault();let A=E.pointerId,R=z=>{z.pointerId===A&&I(z)},G=z=>{z.pointerId===A&&(document.removeEventListener("pointermove",R),document.removeEventListener("pointerup",G),document.removeEventListener("pointercancel",G),_?.(z))};I(E),document.addEventListener("pointermove",R),document.addEventListener("pointerup",G),document.addEventListener("pointercancel",G)})}if(!d&&y){let H=y.querySelector(".card-body");if(H){H.classList.add("color-picker__body"),S=x("div",{className:"color-picker__palette-cursor"}),k=x("div",{className:"color-picker__palette"},S),w=x("div",{className:"color-picker__alpha-thumb"}),v=x("div",{className:"color-picker__alpha"},w),C=x("div",{className:"color-picker__hue-thumb"}),T=x("div",{className:"color-picker__hue"},C);let I=x("div",{className:"color-picker__main"},k,v),_=x("div",{className:"color-picker__hue-row"},T),E=no({blockGameKeys:!0});M=E.input,M.classList.add("color-picker__hex-input"),M.value="",M.maxLength=9,M.spellcheck=!1,M.inputMode="text",M.setAttribute("aria-label",`Hex code for ${n}`),L=x("button",{type:"button",className:"color-picker__mode-btn",textContent:"HEX","aria-pressed":"false","aria-label":"Passer en saisie RGBA"}),E.root.classList.add("color-picker__hex-wrap");let A=x("div",{className:"color-picker__hex-row"},L,E.root);H.replaceChildren(I,_,A),W(k,G=>{if(!k||!S)return;let z=k.getBoundingClientRect(),te=ee((G.clientX-z.left)/z.width,0,1),Jt=ee((G.clientY-z.top)/z.height,0,1);K({...c,s:te,v:1-Jt},"input")},()=>U("change")),W(v,G=>{if(!v)return;let z=v.getBoundingClientRect(),te=ee((G.clientY-z.top)/z.height,0,1);K({...c,a:1-te},"input")},()=>U("change")),W(T,G=>{if(!T)return;let z=T.getBoundingClientRect(),te=ee((G.clientX-z.left)/z.width,0,1);K({...c,h:te*360},"input")},()=>U("change")),L.addEventListener("click",()=>{if(P=P==="hex"?"rgba":"hex",M){let G=Pe(c);M.value=P==="hex"?c.a===1?G.hex:G.hexa:G.rgba}q(),M?.focus(),M?.select()}),M.addEventListener("input",()=>{if(P==="hex"){let G=ei(M.value);if(G!==M.value){let z=M.selectionStart??G.length;M.value=G,M.setSelectionRange(z,z)}}});let R=()=>{let G=M.value;if(P==="hex"){let z=Ne(G);if(!z){M.value=c.a===1?Pe(c).hex:Pe(c).hexa;return}let te=G.startsWith("#")?G.slice(1):G,Jt=te.length===4||te.length===8;z.a=Jt?z.a:c.a,D(z,"change")}else{let z=ti(G),te=Xt(z);if(!te){M.value=Pe(c).rgba;return}D(te,"change")}};M.addEventListener("change",R),M.addEventListener("blur",R),M.addEventListener("keydown",G=>{G.key==="Enter"&&(R(),M.blur())})}}return d&&(y&&y.remove(),O=x("input",{className:"color-picker__native",type:"color",value:Qt(Qe({...c,a:1}))}),b.addEventListener("click",()=>O.click()),O.addEventListener("input",()=>{let H=Ne(O.value);H&&(H.a=c.a,D(H,"input"),U("change"))}),p.appendChild(O)),q(),{root:p,isMobile:d,getValue:()=>Pe(c),setValue:(H,I)=>{let _=Xt(H)??Ne(H)??Ne("#FFFFFF");_&&(typeof I=="number"&&(_.a=I),D(_,null))}}}var Zt=window,en=typeof unsafeWindow<"u"&&unsafeWindow?unsafeWindow:Zt,B=en,ni=en!==Zt;function he(e,t){try{en[e]=t}catch{}if(ni)try{Zt[e]=t}catch{}}function oi(e){try{return!!e.isSecureContext}catch{return!1}}function tn(e){let t=e?.getRootNode?.();return t&&(t instanceof Document||t.host)?t:document}function io(){let e=navigator.platform||"",t=navigator.userAgent||"";return/Mac|iPhone|iPad|iPod/i.test(e)||/Mac OS|iOS/i.test(t)}async function ri(){try{let e=await navigator.permissions?.query?.({name:"clipboard-write"});return e?e.state==="granted"||e.state==="prompt":!0}catch{return!0}}function ii(e,t){let n=document.createElement("textarea");return n.value=e,n.setAttribute("readonly","true"),n.style.position="fixed",n.style.opacity="0",n.style.pointerEvents="none",n.style.top="0",t.appendChild?t.appendChild(n):document.body.appendChild(n),n}function ai(e){try{let t=window.getSelection?.();if(!t)return!1;let n=document.createRange();return n.selectNodeContents(e),t.removeAllRanges(),t.addRange(n),!0}catch{return!1}}async function si(e){if(!("clipboard"in navigator))return{ok:!1,method:"clipboard-write"};if(!oi(B))return{ok:!1,method:"clipboard-write"};if(!await ri())return{ok:!1,method:"clipboard-write"};try{return await navigator.clipboard.writeText(e),{ok:!0,method:"clipboard-write"}}catch{return{ok:!1,method:"clipboard-write"}}}function li(e,t){try{let n=t||tn(),o=ii(e,n);o.focus(),o.select(),o.setSelectionRange(0,o.value.length);let r=!1;try{r=document.execCommand("copy")}catch{r=!1}return o.remove(),{ok:r,method:"execCommand"}}catch{return{ok:!1,method:"execCommand"}}}function ci(e,t){if(!t)return{ok:!1,method:"selection"};let n=t.textContent??"",o=!1;if(n!==e)try{t.textContent=e,o=!0}catch{}let r=ai(t);o&&setTimeout(()=>{try{t.textContent=n}catch{}},80);let i=io()?"\u2318C pour copier":"Ctrl+C pour copier";return{ok:r,method:"selection",hint:i}}async function di(e,t={}){let n=(e??"").toString();if(!n.length)return{ok:!1,method:"noop"};let o=await si(n);if(o.ok)return o;let r=t.injectionRoot||tn(t.valueNode||void 0),i=li(n,r);if(i.ok)return i;let a=ci(n,t.valueNode||null);if(a.ok)return a;if(!t.disablePromptFallback)try{return window.prompt(to()?"Copie manuelle (Discord bloque clipboard):":"Copie manuelle:",n),{ok:!0,method:"prompt"}}catch{}return{ok:!1,method:"noop"}}function ao(e,t,n={}){let o=r=>{if(n.showTip){n.showTip(r);return}try{e.setAttribute("aria-label",r);let i=document.createElement("div");i.textContent=r,i.style.position="absolute",i.style.top="-28px",i.style.right="0",i.style.padding="4px 8px",i.style.borderRadius="8px",i.style.fontSize="12px",i.style.background="color-mix(in oklab, var(--bg) 85%, transparent)",i.style.border="1px solid var(--border)",i.style.color="var(--fg)",i.style.pointerEvents="none",i.style.opacity="0",i.style.transition="opacity .12s";let a=tn(e);a.appendChild?a.appendChild(i):document.body.appendChild(i);let s=e.getBoundingClientRect();i.style.left=`${s.right-8}px`,i.style.top=`${s.top-28}px`,requestAnimationFrame(()=>i.style.opacity="1"),setTimeout(()=>{i.style.opacity="0",setTimeout(()=>i.remove(),150)},1200)}catch{}};e.addEventListener("click",async r=>{r.stopPropagation();let i=(t()??"").toString(),a=await di(i,{valueNode:n.valueNode??null,injectionRoot:n.injectionRoot??null,disablePromptFallback:n.disablePromptFallback??!1});n.onResult?.(a),a.ok?a.method==="clipboard-write"||a.method==="execCommand"||a.method==="prompt"?o("Copi\xE9"):a.method==="selection"&&o(a.hint||(io()?"\u2318C pour copier":"Ctrl+C pour copier")):o("Impossible de copier")})}var Te={light:{"--bg":"rgba(255,255,255,0.7)","--fg":"#0f172a","--muted":"rgba(15,23,42,0.06)","--soft":"rgba(15,23,42,0.04)","--accent":"#2563eb","--border":"rgba(15,23,42,0.12)","--shadow":"rgba(2,6,23,.2)","--tab-bg":"#ffffff","--tab-fg":"#0f172a","--pill-from":"#4f46e5","--pill-to":"#06b6d4"},dark:{"--bg":"rgba(10,12,18,0.6)","--fg":"#e5e7eb","--muted":"rgba(229,231,235,0.08)","--soft":"rgba(229,231,235,0.05)","--accent":"#60a5fa","--border":"rgba(148,163,184,0.2)","--shadow":"rgba(0,0,0,.45)","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#e5e7eb","--pill-from":"#6366f1","--pill-to":"#06b6d4"},sepia:{"--bg":"rgba(247,242,231,0.72)","--fg":"#3b2f2f","--muted":"rgba(59,47,47,0.06)","--soft":"rgba(59,47,47,0.04)","--accent":"#b07d62","--border":"rgba(59,47,47,0.14)","--shadow":"rgba(0,0,0,.18)","--tab-bg":"#fff","--tab-fg":"#3b2f2f","--pill-from":"#b07d62","--pill-to":"#d4a373"},forest:{"--bg":"rgba(14,24,18,0.62)","--fg":"#e7f5e9","--muted":"rgba(231,245,233,0.08)","--soft":"rgba(231,245,233,0.05)","--accent":"#34d399","--border":"rgba(231,245,233,0.16)","--shadow":"rgba(0,0,0,.5)","--tab-bg":"rgba(255,255,255,0.06)","--tab-fg":"#e7f5e9","--pill-from":"#10b981","--pill-to":"#84cc16"},violet:{"--bg":"rgba(23, 16, 42, 0.68)","--fg":"#f5f3ff","--muted":"rgba(245,243,255,0.08)","--soft":"rgba(245,243,255,0.05)","--accent":"#a855f7","--border":"rgba(216,180,254,0.22)","--shadow":"rgba(12,3,30,.55)","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#ede9fe","--pill-from":"#a855f7","--pill-to":"#f472b6"},ocean:{"--bg":"rgba(10, 34, 46, 0.66)","--fg":"#e0f7ff","--muted":"rgba(224,247,255,0.07)","--soft":"rgba(224,247,255,0.05)","--accent":"#38bdf8","--border":"rgba(125, 211, 252, 0.22)","--shadow":"rgba(0, 16, 32, .52)","--tab-bg":"rgba(56,189,248,0.14)","--tab-fg":"#e0f7ff","--pill-from":"#0ea5e9","--pill-to":"#14b8a6"},ember:{"--bg":"rgba(34,18,10,0.64)","--fg":"#fff7ed","--muted":"rgba(255,247,237,0.08)","--soft":"rgba(255,247,237,0.05)","--accent":"#f97316","--border":"rgba(255, 159, 92, 0.24)","--shadow":"rgba(16,6,2,.52)","--tab-bg":"rgba(255,247,237,0.09)","--tab-fg":"#fff7ed","--pill-from":"#fb923c","--pill-to":"#facc15"}};function nn(e){let{host:t,themes:n,initialTheme:o,onThemeChange:r}=e,i=o,a=null,s=!1;function l(d){let c=n[d]||n[i]||{};s&&t.classList.add("theme-anim");for(let[p,m]of Object.entries(c))t.style.setProperty(p,m);s?(a!==null&&clearTimeout(a),a=B.setTimeout(()=>{t.classList.remove("theme-anim"),a=null},320)):s=!0,i=d,r?.(d)}function u(){return i}return l(o),{applyTheme:l,getCurrentTheme:u}}var St={ui:{expandedCards:{style:!1,system:!1}}};async function so(){let e=await qe("tab-settings",{version:1,defaults:St,sanitize:r=>({ui:{expandedCards:bt(St.ui.expandedCards,r.ui?.expandedCards)}})});function t(r){let i=e.get();e.update({ui:{...i.ui,...r,expandedCards:bt(i.ui.expandedCards,r.expandedCards)}})}function n(r,i){let a=e.get();e.update({ui:{...a.ui,expandedCards:{...a.ui.expandedCards,[r]:!!i}}})}function o(r){let i=e.get();n(r,!i.ui.expandedCards[r])}return{get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:o}}function lo(e){return e.replace(/[_-]+/g," ").replace(/^\w/,t=>t.toUpperCase())}function ui(){return Object.keys(Te).map(e=>({value:e,label:lo(e)}))}var pi=["--bg","--fg","--accent","--muted","--soft","--border","--shadow","--tab-bg","--tab-fg","--pill-from","--pill-to"];function mi(e){return lo(e.replace(/^--/,""))}function gi(e){return e.alpha<1?e.rgba:e.hex}var Tt=class extends Me{constructor(n){super({id:"tab-settings",label:"Settings"});this.deps=n}async build(n){let o=this.createGrid("12px");o.id="settings",n.appendChild(o);let r;try{r=await so()}catch{r={get:()=>St,set:()=>{},save:()=>{},setUI:()=>{},setCardExpanded:()=>{},toggleCard:()=>{}}}let i=r.get(),a=Object.keys(Te),s=this.deps.getCurrentTheme?.()??this.deps.initialTheme,l=a.includes(s)?s:a[0]??"dark",u=l,d=vt({text:"Theme",tone:"muted",size:"lg"}),c=_e({options:ui(),value:l,onChange:b=>{u=b,this.deps.applyTheme(b),this.renderThemePickers(b,p,u)}}),p=x("div",{className:"settings-theme-grid"}),m=ke({title:"Style",padding:"lg",expandable:!0,defaultExpanded:!!i.ui.expandedCards.style,onExpandChange:b=>r.setCardExpanded("style",b)},x("div",{className:"kv settings-theme-row"},d.root,c.root),p);this.renderThemePickers(l,p,u);let f=this.createEnvCard({defaultExpanded:!!i.ui.expandedCards.system,onExpandChange:b=>r.setCardExpanded("system",b)});o.appendChild(m),o.appendChild(f)}renderThemePickers(n,o,r){let i=Te[n];if(o.replaceChildren(),!!i)for(let a of pi){let s=i[a];if(s==null)continue;let l=ro({label:mi(a),value:s,defaultExpanded:!1,onInput:u=>this.updateThemeVar(n,a,u,r),onChange:u=>this.updateThemeVar(n,a,u,r)});o.appendChild(l.root)}}updateThemeVar(n,o,r,i){let a=Te[n];a&&(a[o]=gi(r),i===n&&this.deps.applyTheme(n))}createEnvCard(n){let o=n?.defaultExpanded??!1,r=n?.onExpandChange,i=(y,k)=>{let S=x("div",{className:"kv kv--inline-mobile"}),v=x("label",{},y),w=x("div",{className:"ro"});return typeof k=="string"?w.textContent=k:w.append(k),S.append(v,w),S},a=x("code",{},"\u2014"),s=x("span",{},"\u2014"),l=x("span",{},"\u2014"),u=x("span",{},"\u2014"),d=x("span",{},"\u2014"),c=x("span",{},"\u2014"),p=()=>{let y=pe();l.textContent=y.surface,u.textContent=y.platform,d.textContent=y.browser??"Unknown",c.textContent=y.os??"Unknown",a.textContent=y.host,s.textContent=y.isInIframe?"Yes":"No"},m=Se({label:"Copy JSON",variant:"primary",size:"sm"});ao(m,()=>{let y=pe();return JSON.stringify(y,null,2)});let f=x("div",{style:"width:100%;display:flex;justify-content:center;"},m),b=ke({title:"System",variant:"soft",padding:"lg",footer:f,expandable:!0,defaultExpanded:o,onExpandChange:r},i("Surface",l),i("Platform",u),i("Browser",d),i("OS",c),i("Host",a),i("Iframe",s)),h=()=>{document.hidden||p()};return document.addEventListener("visibilitychange",h),p(),this.addCleanup(()=>document.removeEventListener("visibilitychange",h)),b}};function Ze(e){return e<10?`0${e}`:String(e)}function oe(e){let t=/^(\d{1,2}):(\d{2})$/.exec((e||"").trim());if(!t)return 0;let n=Math.max(0,Math.min(23,parseInt(t[1],10)||0)),o=Math.max(0,Math.min(59,parseInt(t[2],10)||0));return n*60+o}function on(e){let t=Math.max(0,Math.min(1439,e|0)),n=Math.floor(t/60),o=t%60;return`${Ze(n)}:${Ze(o)}`}function ye(e,t){let n=oe(e),o=Math.max(0,Math.min(1439,n)),r=Math.floor(o/t)*t;return on(r)}function fi(e){let t=Math.floor(e/60),n=e%60,o=t>=12;return{h12:t%12||12,m:n,pm:o}}function bi(e,t,n){return(e%12+(n?12:0))*60+t}function hi(e){return e.platform==="mobile"||e.os==="ios"||e.os==="android"}function co(e={}){let{id:t,start:n="08:00",end:o="23:00",stepMinutes:r=5,disabled:i=!1,allowOvernight:a=!0,labels:s={from:"From",to:"To"},picker:l="auto",format:u="auto",useNativeOn:d,onChange:c}=e,p={start:ye(n,r),end:ye(o,r)},m=x("div",{className:"time-range",id:t});m.classList.add("time-range--stacked");let f=pe();if(l==="native"||l==="auto"&&(d?.(f)??hi(f)))return h();return y();function h(){let v=x("div",{className:"time-range-field",role:"group"}),w=x("span",{className:"time-range-label"},s.from||"From"),T=x("input",{className:"input time-range-input",type:"time",step:String(r*60),value:p.start}),C=x("div",{className:"time-range-field",role:"group"}),M=x("span",{className:"time-range-label"},s.to||"To"),L=x("input",{className:"input time-range-input",type:"time",step:String(r*60),value:p.end});v.append(w,T),C.append(M,L),m.append(v,C);function O(){T.value=p.start,L.value=p.end}function P(){c?.(q())}function U(H){let I=H.target,_=I===T,E=ye(I.value||(_?p.start:p.end),r);_?(p.start=E,!a&&oe(p.end)<oe(p.start)&&(p.end=p.start)):(p.end=E,!a&&oe(p.end)<oe(p.start)&&(p.start=p.end)),O(),P()}T.addEventListener("change",U),T.addEventListener("blur",U),L.addEventListener("change",U),L.addEventListener("blur",U),i&&D(!0);function q(){return{...p}}function K(H){if(H.start&&(p.start=ye(H.start,r)),H.end&&(p.end=ye(H.end,r)),!a){let I=oe(p.start);oe(p.end)<I&&(p.end=p.start)}O(),P()}function D(H){T.disabled=H,L.disabled=H,m.classList.toggle("is-disabled",!!H)}function W(){T.removeEventListener("change",U),T.removeEventListener("blur",U),L.removeEventListener("change",U),L.removeEventListener("blur",U),m.replaceChildren()}return{root:m,getValue:q,setValue:K,setDisabled:D,destroy:W}}function y(){let v=x("label",{className:"time-range-field"}),w=x("span",{className:"time-range-label"},s.from||"From"),T=x("label",{className:"time-range-field"}),C=x("span",{className:"time-range-label"},s.to||"To"),M=u==="12h"||u==="auto"&&S(),L=k(p.start,M),O=k(p.end,M);v.append(w,L.container),T.append(C,O.container),m.append(v,T),i&&K(!0),q(),L.onAnyChange(()=>{p.start=L.to24h(r),!a&&oe(p.end)<oe(p.start)&&(p.end=p.start,O.setFrom24h(p.end)),c?.(P())}),O.onAnyChange(()=>{p.end=O.to24h(r),!a&&oe(p.end)<oe(p.start)&&(p.start=p.end,L.setFrom24h(p.start)),c?.(P())});function P(){return{...p}}function U(W){if(W.start&&(p.start=ye(W.start,r)),W.end&&(p.end=ye(W.end,r)),!a){let H=oe(p.start);oe(p.end)<H&&(p.end=p.start)}q(),c?.(P())}function q(){L.setFrom24h(p.start),O.setFrom24h(p.end)}function K(W){L.setDisabled(W),O.setDisabled(W),m.classList.toggle("is-disabled",!!W)}function D(){L.destroy(),O.destroy(),m.replaceChildren()}return{root:m,getValue:P,setValue:U,setDisabled:K,destroy:D}}function k(v,w){let T=x("div",{className:"time-picker"}),C=(A,R=2)=>{A.classList.add("time-picker-compact"),A.style.setProperty("--min-ch",String(R))},M=w?Array.from({length:12},(A,R)=>{let G=R+1;return{value:String(G),label:Ze(G)}}):Array.from({length:24},(A,R)=>({value:String(R),label:Ze(R)})),L=_e({size:"sm",options:M,placeholder:"HH",onChange:()=>W()});C(L.root,2);let O=Math.max(1,Math.min(30,Math.floor(e.stepMinutes??5))),P=Array.from({length:Math.floor(60/O)},(A,R)=>{let G=R*O;return{value:String(G),label:Ze(G)}}),U=_e({size:"sm",options:P,placeholder:"MM",onChange:()=>W()});C(U.root,2);let q=w?_e({size:"sm",options:[{value:"am",label:"AM"},{value:"pm",label:"PM"}],value:"am",onChange:()=>W()}):null;q&&C(q.root,3),T.append(L.root,U.root,...q?[q.root]:[]);let K=null;function D(A){K=A}function W(){K?.()}function H(A){let R=oe(A);if(w){let G=fi(R);L.setValue(String(G.h12),{notify:!1}),U.setValue(String(Math.floor(G.m/O)*O),{notify:!1}),q.setValue(G.pm?"pm":"am",{notify:!1})}else{let G=Math.floor(R/60),z=R%60;L.setValue(String(G),{notify:!1}),U.setValue(String(Math.floor(z/O)*O),{notify:!1})}}function I(A){let R=parseInt(U.getValue()||"0",10)||0;if(w){let G=parseInt(L.getValue()||"12",10)||12,z=(q?.getValue()||"am")==="pm",te=bi(G,R,z);return ye(on(te),A)}else{let z=(parseInt(L.getValue()||"0",10)||0)*60+R;return ye(on(z),A)}}function _(A){L.setDisabled(A),U.setDisabled(A),q?.setDisabled(A),T.classList.toggle("is-disabled",!!A)}function E(){T.replaceChildren()}return{container:T,onAnyChange:D,setFrom24h:H,to24h:I,setDisabled:_,destroy:E}}function S(){try{let w=new Intl.DateTimeFormat(void 0,{hour:"numeric"}).format(new Date(2020,1,1,13));return/AM|PM|am|pm/.test(w)}catch{return!1}}}function po(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function yi(e){let t=po(e);t=t.replace(/\/\*[\s\S]*?\*\//g,r=>`<span class="tok tok-comm">${r}</span>`),t=t.replace(/(^|\s)(\/\/.*)$/gm,(r,i,a)=>`${i}<span class="tok tok-comm">${a}</span>`),t=t.replace(/`[^`\\]*(?:\\.[^`\\]*)*`/g,r=>`<span class="tok tok-str">${r}</span>`),t=t.replace(/'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/g,r=>`<span class="tok tok-str">${r}</span>`),t=t.replace(/\b(?:0[xX][0-9a-fA-F]+|0[bB][01]+|0[oO][0-7]+|\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?(?:[eE][+-]?\d+)?)\b/g,r=>`<span class="tok tok-num">${r}</span>`);let n=["break","case","catch","class","const","continue","debugger","default","delete","do","else","export","extends","finally","for","function","if","import","in","instanceof","let","new","return","super","switch","this","throw","try","typeof","var","void","while","with","yield","await","enum","implements","interface","package","private","protected","public","static","as","from","of"],o=new RegExp(`\\b(?:${n.join("|")})\\b`,"g");return t=t.replace(o,r=>`<span class="tok tok-kw">${r}</span>`),t=t.replace(/\b(?:true|false|null|undefined|NaN|Infinity)\b/g,r=>`<span class="tok tok-lit">${r}</span>`),t}function uo(e){if(!e)return new Date().toLocaleTimeString();let t=e instanceof Date?e:new Date(e);if(isNaN(t.getTime()))return String(e);let n=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0"),r=String(t.getSeconds()).padStart(2,"0");return`${n}:${o}:${r}`}function mo(e={}){let{id:t,className:n,height:o,maxLines:r=500,wrap:i=!1,mode:a="plain",showTimestamps:s=!0,autoScroll:l=!0}=e,u=x("div",{className:"log",id:t});n&&u.classList.add(...n.split(" ").filter(Boolean)),i&&u.classList.add("log--wrap");let d=x("div",{className:"log-viewport"}),c=x("div",{className:"log-lines"});d.appendChild(c),u.appendChild(d),o!=null&&(u.style.blockSize=typeof o=="number"?`${o}px`:String(o));let p=a,m=r,f=new Map;function b(D){return p==="js"?yi(D):po(D)}function h(D){return D?f.get(D)?.body??c:c}function y(D){let W=typeof D=="string"?{text:D}:D||{text:""},H=h(W.groupKey);if(W.key){let E=Array.from(H.querySelectorAll(`.log-line[data-key="${W.key}"]`)).pop();if(E){W.level&&(E.classList.remove("log-level--debug","log-level--info","log-level--warn","log-level--error"),E.classList.add(`log-level--${W.level}`));let A=E.querySelector(".log-time");s&&A&&(A.textContent=uo(W.time));let R=E.querySelector(".log-text");R&&(R.innerHTML=b(W.text)),l&&C();return}}let I=document.createElement("div");if(I.className="log-line",W.level&&I.classList.add(`log-level--${W.level}`),W.key&&(I.dataset.key=W.key),s){let E=document.createElement("span");E.className="log-time",E.textContent=uo(W.time),I.appendChild(E)}let _=document.createElement("span");_.className="log-text",_.innerHTML=b(W.text),I.appendChild(_),H.appendChild(I),O(),l&&C()}function k(D){for(let W of D)y(W)}function S(){c.replaceChildren(),f.clear()}function v(D){p=D,C()}function w(D){u.classList.toggle("log--wrap",!!D),C()}function T(D){m=Math.max(1,Math.floor(D||1))}function C(){requestAnimationFrame(()=>{d.scrollTop=d.scrollHeight})}function M(){let D=0;for(let W=0;W<c.children.length;W+=1){let H=c.children[W];(H.classList.contains("log-line")||H.classList.contains("log-group"))&&(D+=1)}return D}function L(){let D=c.firstElementChild;if(!D)return!1;if(D.classList.contains("log-group")){let W=D.dataset.groupKey;W&&f.delete(W)}return D.remove(),!0}function O(){let D=M();for(;D>m&&L();)D--}function P(D,W){let H=W?.key||`g-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,6)}`;if(f.has(H))return H;let I=document.createElement("div");I.className="log-group",I.dataset.groupKey=H;let _=document.createElement("div");_.className="log-group-header",_.textContent=D;let E=document.createElement("div");E.className="log-group-body",I.append(_,E),c.appendChild(I),f.set(H,{root:I,header:_,body:E});let A=R=>{I.classList.toggle("is-collapsed",!!R)};return W?.collapsed&&A(!0),_.addEventListener("click",()=>A(!I.classList.contains("is-collapsed"))),l&&C(),H}function U(D){f.get(D)}function q(D,W){let H=f.get(D);H&&(W==null?H.root.classList.toggle("is-collapsed"):H.root.classList.toggle("is-collapsed",!!W))}let K=u;return K.add=y,K.addMany=k,K.clear=S,K.setMode=v,K.setWrap=w,K.setMaxLines=T,K.scrollToEnd=C,K.beginGroup=P,K.endGroup=U,K.toggleGroup=q,K}var re={nativeCtor:null,captured:[],latestOpen:null},go=Symbol.for("ariesmod.ws.capture.wrapped"),fo=Symbol.for("ariesmod.ws.capture.native"),bo=1;function rn(e){return!!e&&e.readyState===bo}function xi(){if(rn(re.latestOpen))return re.latestOpen;for(let e=re.captured.length-1;e>=0;e--){let t=re.captured[e];if(rn(t))return t}return null}function vi(e,t){re.captured.push(e),re.captured.length>25&&re.captured.splice(0,re.captured.length-25);let n=()=>{re.latestOpen=e,t&&console.log("[WS] captured socket opened",e.url)};e.addEventListener("open",n),e.addEventListener("close",()=>{re.latestOpen===e&&(re.latestOpen=null),t&&console.log("[WS] captured socket closed",e.url)}),e.readyState===bo&&n()}function ho(e=B,t={}){let n=!!t.debug,o=e?.WebSocket;if(typeof o!="function")return()=>{};if(o[go])return re.nativeCtor=o[fo]??re.nativeCtor??null,()=>{};let r=o;re.nativeCtor=r;function i(a,s){let l=s!==void 0?new r(a,s):new r(a);try{vi(l,n)}catch{}return l}try{i.prototype=r.prototype}catch{}try{Object.setPrototypeOf(i,r)}catch{}try{i.CONNECTING=r.CONNECTING,i.OPEN=r.OPEN,i.CLOSING=r.CLOSING,i.CLOSED=r.CLOSED}catch{}i[go]=!0,i[fo]=r;try{e.WebSocket=i,n&&console.log("[WS] WebSocket capture installed")}catch{return()=>{}}return()=>{try{e.WebSocket===i&&(e.WebSocket=r)}catch{}}}function wi(e=B){let t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function et(e=B){let t=xi();if(t)return{ws:t,source:"captured"};let n=wi(e);return n?{ws:n,source:"roomConnection"}:{ws:null,source:null}}function At(e,t={}){let n=t.pageWindow??B,o=t.intervalMs??500,r=!!t.debug,i=null,a=null,s=()=>{let u=et(n);(u.ws!==i||u.source!==a)&&(i=u.ws,a=u.source,r&&console.log("[WS] best socket changed:",u.source,u.ws),e(u))};s();let l=setInterval(s,o);return()=>clearInterval(l)}function ki(e){if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return null}}function Si(e,t=B){let n=t?.MagicCircle_RoomConnection;if(n&&typeof n.sendMessage=="function")try{return Array.isArray(e)?n.sendMessage(...e):n.sendMessage(e),{ok:!0}}catch(i){return{ok:!1,reason:"error",error:i}}let{ws:o}=et(t);if(!o)return{ok:!1,reason:"no-ws"};if(!rn(o))return{ok:!1,reason:"not-open"};let r=ki(e);if(r==null)return{ok:!1,reason:"error",error:new Error("Cannot stringify message")};try{return o.send(r),{ok:!0}}catch(i){return{ok:!1,reason:"error",error:i}}}function yo(e,t={},n=B){return Si({type:e,...t},n)}var be={Welcome:"Welcome",PartialState:"PartialState",ServerErrorMessage:"ServerErrorMessage",Config:"Config",InappropriateContentRejected:"InappropriateContentRejected",Emote:"Emote",CurrencyTransaction:"CurrencyTransaction",Pong:"Pong"},V={Chat:"Chat",Emote:"Emote",Wish:"Wish",KickPlayer:"KickPlayer",SetPlayerData:"SetPlayerData",UsurpHost:"UsurpHost",Dev:"Dev",SetSelectedGame:"SetSelectedGame",VoteForGame:"VoteForGame",RequestGame:"RequestGame",RestartGame:"RestartGame",Ping:"Ping",PlayerPosition:"PlayerPosition",Teleport:"Teleport",CheckWeatherStatus:"CheckWeatherStatus",MoveInventoryItem:"MoveInventoryItem",DropObject:"DropObject",PickupObject:"PickupObject",ToggleFavoriteItem:"ToggleFavoriteItem",PutItemInStorage:"PutItemInStorage",RetrieveItemFromStorage:"RetrieveItemFromStorage",MoveStorageItem:"MoveStorageItem",LogItems:"LogItems",PlantSeed:"PlantSeed",WaterPlant:"WaterPlant",HarvestCrop:"HarvestCrop",SellAllCrops:"SellAllCrops",PurchaseSeed:"PurchaseSeed",PurchaseEgg:"PurchaseEgg",PurchaseTool:"PurchaseTool",PurchaseDecor:"PurchaseDecor",PlantEgg:"PlantEgg",HatchEgg:"HatchEgg",PlantGardenPlant:"PlantGardenPlant",PotPlant:"PotPlant",MutationPotion:"MutationPotion",PickupDecor:"PickupDecor",PlaceDecor:"PlaceDecor",RemoveGardenObject:"RemoveGardenObject",PlacePet:"PlacePet",FeedPet:"FeedPet",PetPositions:"PetPositions",SwapPet:"SwapPet",StorePet:"StorePet",NamePet:"NamePet",SellPet:"SellPet",ReportSpeakingStart:"ReportSpeakingStart"};var up=new Set(Object.values(be)),pp=new Set(Object.values(V));function Ti(e,t={},n=B){return yo(e,t,n)}function xo(e,t=B){return Ti(V.Chat,{scopePath:["Room"],message:e},t)}var Ee={timeRange:{start:"09:00",end:"18:00"},logSettings:{mode:"js",wrap:!1}};async function vo(){return qe("tab-test",{version:1,defaults:Ee,sanitize:e=>({timeRange:{start:e.timeRange?.start||Ee.timeRange.start,end:e.timeRange?.end||Ee.timeRange.end},logSettings:{mode:e.logSettings?.mode||Ee.logSettings.mode,wrap:e.logSettings?.wrap??Ee.logSettings.wrap}})})}var Ct=class extends Me{constructor(){super({id:"tab-test",label:"Test"})}async build(t){let n=this.createContainer("test-section");t.appendChild(n);let o;try{o=await vo()}catch{o={get:()=>Ee,set:()=>{},update:()=>{},save:()=>{}}}let r=o.get(),i=vt({text:"Plage horaire",hint:"Heures actives du mode 'Plage horaire'.",icon:"\u23F0"}),a=co({start:r.timeRange.start,end:r.timeRange.end,stepMinutes:5,allowOvernight:!0,picker:"auto",format:"12h",onChange:h=>{o.update({timeRange:{start:h.start,end:h.end}})}}),s=x("div",i.root,a.root),l=mo({height:220,mode:r.logSettings.mode,maxLines:1e3});r.logSettings.wrap&&l.setWrap(!0),l.add({level:"info",text:"Log initialise"}),l.add({level:"debug",text:"const x = 42; // demo"}),l.add({level:"warn",text:"Requete lente: fetch('/api') > 1200ms"}),l.add({level:"error",text:"new Error('Boom')"});let u=Se({label:"Appliquer",variant:"primary",onClick:()=>{let h=a.getValue();l.add({level:"info",text:`[Apply] ${h.start} -> ${h.end}`})}}),d=ke({title:"Parametres - Plage horaire",subtitle:"Choisis la fenetre d'activite",variant:"soft",padding:"lg",footer:Yt(u)},s),c=Se({label:"Clear",onClick:()=>xo("test")}),p=Se({label:r.logSettings.wrap?"Unwrap":"Wrap",onClick:()=>{let h=!l.classList.contains("log--wrap");l.setWrap(h),p.setLabel(h?"Unwrap":"Wrap"),o.update({logSettings:{...o.get().logSettings,wrap:h}})}}),m=Se({label:`Mode: ${r.logSettings.mode}`,onClick:()=>{let y=o.get().logSettings.mode==="js"?"plain":"js";l.setMode(y),m.setLabel(`Mode: ${y}`),o.update({logSettings:{...o.get().logSettings,mode:y}})}}),f=Se({label:"Add line",onClick:()=>l.add({level:"debug",text:"function tick(){ return Date.now(); } // sample"})}),b=ke({title:"Logs",variant:"default",padding:"lg"},l,Yt(c,p,m,f));n.appendChild(d),n.appendChild(b)}};function an(e){return[new Tt(e),new Ct]}function sn(e){let{shadow:t,initialOpen:n}=e,o=x("div",{className:"gemini-panel",id:"panel",ariaHidden:String(!n)}),r=x("div",{className:"gemini-tabbar"}),i=x("div",{className:"gemini-content",id:"content"}),a=x("div",{className:"gemini-resizer",title:"Resize"}),s=x("button",{className:"gemini-close",title:"Fermer",ariaLabel:"Fermer"},"\u2715");o.append(r,i,a);let l=x("div",{className:"gemini-wrapper"},o);return t.append(l),{panel:o,tabbar:r,content:i,resizer:a,closeButton:s,wrapper:l}}function ln(e){let{resizer:t,host:n,panel:o,shadow:r,onWidthChange:i,initialWidth:a,minWidth:s,maxWidth:l}=e,u=s,d=l;function c(){let w=pe(),T=Math.round(B.visualViewport?.width??B.innerWidth??0);if(w.platform==="mobile"||w.os==="ios"||w.os==="android"){let C=getComputedStyle(r.host),M=parseFloat(C.getPropertyValue("--inset-l"))||0,L=parseFloat(C.getPropertyValue("--inset-r"))||0,O=Math.max(280,T-Math.round(M+L)),P=Math.min(420,Math.max(300,Math.floor(T*.66))),U=O;u=Math.min(P,O),d=U}else u=s,d=l;return{min:u,max:d}}function p(w){return Math.max(u,Math.min(d,Number(w)||a))}function m(w){let T=p(w);n.style.setProperty("--w",`${T}px`),i(T)}c();let f=pe(),b=!(f.platform==="mobile"||f.os==="ios"||f.os==="android"),h=!1,y=w=>{if(!h)return;w.preventDefault();let T=Math.round(B.innerWidth-w.clientX);m(T)},k=()=>{h&&(h=!1,document.body.style.cursor="",B.removeEventListener("mousemove",y),B.removeEventListener("mouseup",k))},S=w=>{b&&(w.preventDefault(),h=!0,document.body.style.cursor="ew-resize",B.addEventListener("mousemove",y),B.addEventListener("mouseup",k))};t.addEventListener("mousedown",S);function v(){t.removeEventListener("mousedown",S),B.removeEventListener("mousemove",y),B.removeEventListener("mouseup",k)}return{calculateResponsiveBounds:c,constrainWidthToLimits:p,setHudWidth:m,destroy:v}}function cn(e){let{panel:t,onToggle:n,onClose:o,toggleCombo:r=l=>l.ctrlKey&&l.shiftKey&&l.key.toLowerCase()==="u",closeOnEscape:i=!0}=e;function a(l){let u=t.classList.contains("open");if(i&&l.key==="Escape"&&u){o();return}r(l)&&(l.preventDefault(),l.stopPropagation(),n())}document.addEventListener("keydown",a,{capture:!0});function s(){document.removeEventListener("keydown",a,{capture:!0})}return{destroy:s}}var wo=`
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
`;var dn=`
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
`;var un=`
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
`;var pn=`
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
`;function Q(e,t,n){if(e.querySelector(`style[data-style-id="${n}"]`))return;let o=document.createElement("style");o.setAttribute("data-style-id",n),o.textContent=t,e.appendChild(o)}var ko=`
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
  
`;var So=`
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
`;var To=`
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
`;var Ao=`
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
`;var Co=`
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
`;var Mo=`
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
`;var Po=`
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
`;var Eo=`
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
`;var Io=`
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
`;var Lo=`
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
`;var Ho=`
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
`;var Ro=`
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
`;var Oo=`
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
`;var _o=`
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
`;var No=`
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
`;var Do=`
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
`;var Go=`
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
`;var Ci={all:"initial",position:"fixed",top:"0",right:"0",zIndex:"2147483647",pointerEvents:"auto",fontFamily:'system-ui, -apple-system, "Segoe UI", Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',fontSize:"13px",lineHeight:"1.35"};function Mi(e="gemini-root"){let t=document.createElement("div");t.id=e,Object.assign(t.style,Ci),(document.body||document.documentElement).appendChild(t);let n=t.attachShadow({mode:"open"});return{host:t,shadow:n}}function mn(e){let{hostId:t="gemini-hud-root",initialWidth:n,initialOpen:o,onWidthChange:r,onOpenChange:i,themes:a,initialTheme:s,onThemeChange:l,buildSections:u,initialTab:d,onTabChange:c,toggleCombo:p=_=>_.ctrlKey&&_.shiftKey&&_.key.toLowerCase()==="u",closeOnEscape:m=!0,minWidth:f=420,maxWidth:b=720}=e,{host:h,shadow:y}=Mi(t);Q(y,dn,"variables"),Q(y,un,"primitives"),Q(y,pn,"utilities"),Q(y,wo,"hud"),Q(y,ko,"card"),Q(y,So,"badge"),Q(y,To,"button"),Q(y,Ao,"input"),Q(y,Co,"label"),Q(y,Mo,"navTabs"),Q(y,Po,"searchBar"),Q(y,Eo,"select"),Q(y,Io,"switch"),Q(y,Lo,"table"),Q(y,Ho,"timeRangePicker"),Q(y,Ro,"tooltip"),Q(y,Oo,"slider"),Q(y,_o,"reorderableList"),Q(y,No,"colorPicker"),Q(y,Do,"log"),Q(y,Go,"settings");let{panel:k,tabbar:S,content:v,resizer:w,closeButton:T,wrapper:C}=sn({shadow:y,initialOpen:o});function M(_){k.dispatchEvent(new CustomEvent("gemini:hud-open-change",{detail:{isOpen:_},bubbles:!0})),i?.(_)}function L(_){let E=k.classList.contains("open");k.classList.toggle("open",_),k.setAttribute("aria-hidden",_?"false":"true"),_!==E&&M(_)}L(o),T.addEventListener("click",_=>{_.preventDefault(),_.stopPropagation(),L(!1)});let O=nn({host:h,themes:a,initialTheme:s,onThemeChange:l}),P=ln({resizer:w,host:h,panel:k,shadow:y,onWidthChange:r||(()=>{}),initialWidth:n,minWidth:f,maxWidth:b});P.setHudWidth(n);let U=u({applyTheme:O.applyTheme,initialTheme:s,getCurrentTheme:O.getCurrentTheme,setHUDWidth:P.setHudWidth,setHUDOpen:L}),q=new Ue(U,v,{applyTheme:O.applyTheme,getCurrentTheme:O.getCurrentTheme}),K=U.map(_=>({id:_.id,label:_.label})),D=Jn(K,d||K[0]?.id||"",_=>{q.activate(_),c?.(_)});D.root.style.flex="1 1 auto",D.root.style.minWidth="0",S.append(D.root,T),q.activate(d||K[0]?.id||"");let W=cn({panel:k,onToggle:()=>L(!k.classList.contains("open")),onClose:()=>L(!1),toggleCombo:p,closeOnEscape:m}),H=()=>{D.recalc();let _=parseInt(getComputedStyle(h).getPropertyValue("--w"))||n;P.calculateResponsiveBounds(),P.setHudWidth(_)};B.addEventListener("resize",H);function I(){W.destroy(),P.destroy(),B.removeEventListener("resize",H)}return{host:h,shadow:y,wrapper:C,panel:k,content:v,setOpen:L,setWidth:P.setHudWidth,sections:U,manager:q,nav:D,destroy:I}}var De={isOpen:"gemini.hud.isOpen",width:"gemini.hud.width",theme:"gemini.hud.theme",activeTab:"gemini.hud.activeTab"},tt={isOpen:!1,width:480,theme:"dark",activeTab:"tab-settings"};function gn(){return{isOpen:we(De.isOpen,tt.isOpen),width:we(De.width,tt.width),theme:we(De.theme,tt.theme),activeTab:we(De.activeTab,tt.activeTab)}}function Ge(e,t){Ke(De[e],t)}var Pi="https://i.imgur.com/IMkhMur.png",Ei="Stats";function fn(e){let t=e.iconUrl||Pi,n=e.ariaLabel||"Open MGH",o=null,r=null,i=null,a=!1,s=null,l=null,u=["Chat","Leaderboard","Stats","Open Activity Log"],d=S=>{try{return typeof CSS<"u"&&CSS&&typeof CSS.escape=="function"?CSS.escape(S):S.replace(/"/g,'\\"')}catch{return S}};function c(){let S=document.querySelector(u.map(w=>`button[aria-label="${d(w)}"]`).join(","));if(!S)return null;let v=S.parentElement;for(;v&&v!==document.body;){if(u.reduce((T,C)=>T+v.querySelectorAll(`button[aria-label="${d(C)}"]`).length,0)>=2)return v;v=v.parentElement}return null}function p(S){return S}function m(S){let v=Array.from(S.querySelectorAll("button[aria-label]"));if(!v.length)return{refBtn:null,refWrapper:null};let w=v.filter(U=>U.dataset.mghBtn!=="true"&&(U.getAttribute("aria-label")||"")!==(e.ariaLabel||"Open MGH")),T=w.length?w:v,C=T.find(U=>(U.getAttribute("aria-label")||"").toLowerCase()===Ei.toLowerCase())||null,M=T.length>=2?T.length-2:T.length-1,L=C||T[M],O=L.parentElement,P=O&&O.parentElement===S&&O.tagName==="DIV"?O:null;return{refBtn:L,refWrapper:P}}function f(S,v,w){let T=S.cloneNode(!1);T.type="button",T.setAttribute("aria-label",v),T.title=v,T.dataset.mghBtn="true",T.style.pointerEvents="auto",T.removeAttribute("id");let C=document.createElement("img");return C.src=w,C.alt="MGH",C.style.pointerEvents="none",C.style.userSelect="none",C.style.width="76%",C.style.height="76%",C.style.objectFit="contain",C.style.display="block",C.style.margin="auto",T.appendChild(C),T.addEventListener("click",M=>{M.preventDefault(),M.stopPropagation();try{e.onClick?.()}catch{}}),T}function b(){if(a)return!1;a=!0;let S=!1;try{let v=c();if(!v)return!1;s!==v&&(s=v);let{refBtn:w,refWrapper:T}=m(v);if(!w)return!1;r=v.querySelector('div[data-mgh-wrapper="true"]'),!r&&T&&(r=T.cloneNode(!1),r.dataset.mghWrapper="true",r.removeAttribute("id"),S=!0);let C=r?.querySelector('button[data-mgh-btn="true"]')||null;o||(o=C),o||(o=f(w,n,t),r?r.appendChild(o):o.parentElement!==v&&v.appendChild(o),S=!0),r&&r.parentElement!==v&&(v.appendChild(r),S=!0);let M=v;if(M&&M!==l){try{k.disconnect()}catch{}l=M,k.observe(l,{childList:!0,subtree:!0})}return S}finally{a=!1}}b();let h=document.getElementById("App")||document.body,y=null,k=new MutationObserver(S=>{let v=S.every(T=>{let C=Array.from(T.addedNodes||[]),M=Array.from(T.removedNodes||[]),L=C.concat(M);if(L.length===0){let O=T.target;return r&&(O===r||r.contains(O))||o&&(O===o||o.contains(O))}return L.every(O=>!!(!(O instanceof HTMLElement)||r&&(O===r||r.contains(O))||o&&(O===o||o.contains(O))))}),w=S.some(T=>Array.from(T.removedNodes||[]).some(C=>C instanceof HTMLElement?!!(r&&(C===r||r.contains(C))||o&&(C===o||o.contains(C))):!1));v&&!w||y===null&&(y=window.setTimeout(()=>{if(y=null,b()&&r){let C=r.parentElement;C&&C.lastElementChild!==r&&C.appendChild(r)}},150))});return k.observe(h,{childList:!0,subtree:!0}),i=()=>k.disconnect(),()=>{try{i?.()}catch{}try{r?.remove()}catch{}}}var Ri={},Vo=[];function Ii(){return Vo.slice()}function Li(e){Vo.push(e)}function jo(e){try{return JSON.parse(e)}catch{return}}function Wo(e){if(typeof e=="string"){let t=jo(e);return t!==void 0?t:e}return e}function Fo(e){if(e!=null){if(typeof e=="string"){let t=jo(e);return t!==void 0?Fo(t):e}if(Array.isArray(e)&&typeof e[0]=="string")return e[0];if(typeof e=="object"){let t=e;return t.type??t.Type??t.kind??t.messageType}}}function Hi(e){let t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function j(e,t,n){let o=typeof t=="boolean"?t:!0,r=typeof t=="function"?t:n,i=(a,s)=>{if(Fo(a)!==e)return;let u=r(a,s);return u&&typeof u=="object"&&"kind"in u?u:typeof u=="boolean"?u?void 0:{kind:"drop"}:o?void 0:{kind:"drop"}};return Li(i),i}var nt=new WeakSet,Bo=new WeakMap;function zo(e){let t=e.pageWindow,n=!!e.debug,o=e.middlewares&&e.middlewares.length?e.middlewares:Ii();if(!o.length)return()=>{};let r=p=>({ws:p,pageWindow:t,debug:n}),i=(p,m)=>{let f=p;for(let b of o){let h=b(f,r(m));if(h){if(h.kind==="drop")return{kind:"drop"};h.kind==="replace"&&(f=h.message)}}return f!==p?{kind:"replace",message:f}:void 0},a=null,s=null,l=null,u=()=>{let p=t?.MagicCircle_RoomConnection,m=p?.sendMessage;if(!p||typeof m!="function")return!1;if(nt.has(m))return!0;let f=m.bind(p);function b(...h){let y=h.length===1?h[0]:h,k=Wo(y),S=i(k,Hi(t));if(S?.kind==="drop"){n&&console.log("[WS] drop outgoing (RoomConnection.sendMessage)",k);return}if(S?.kind==="replace"){let v=S.message;return h.length>1&&Array.isArray(v)?(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",k,"=>",v),f(...v)):(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",k,"=>",v),f(v))}return f(...h)}nt.add(b),Bo.set(b,m);try{p.sendMessage=b,nt.add(p.sendMessage),n&&console.log("[WS] outgoing patched via MagicCircle_RoomConnection.sendMessage")}catch{return!1}return a=()=>{try{p.sendMessage===b&&(p.sendMessage=m)}catch{}},!0};(()=>{let p=t?.WebSocket?.prototype,m=p?.send;if(typeof m!="function"||nt.has(m))return;function f(b){let h=Wo(b),y=i(h,this);if(y?.kind==="drop"){n&&console.log("[WS] drop outgoing (ws.send)",h);return}if(y?.kind==="replace"){let k=y.message,S=typeof k=="string"||k instanceof ArrayBuffer||k instanceof Blob?k:JSON.stringify(k);return n&&console.log("[WS] replace outgoing (ws.send)",h,"=>",k),m.call(this,S)}return m.call(this,b)}nt.add(f),Bo.set(f,m);try{p.send=f,n&&console.log("[WS] outgoing patched via WebSocket.prototype.send")}catch{return}s=()=>{try{p.send===f&&(p.send=m)}catch{}}})();let c=e.waitForRoomConnectionMs??4e3;if(!u()&&c>0){let p=Date.now();l=setInterval(()=>{if(u()){clearInterval(l),l=null;return}Date.now()-p>c&&(clearInterval(l),l=null,n&&console.log("[WS] RoomConnection not found, only ws.send is patched"))},250)}return()=>{if(l){try{clearInterval(l)}catch{}l=null}if(a){try{a()}catch{}a=null}if(s){try{s()}catch{}s=null}}}(function(){try{let t=Ri,n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();var Di={},Uo=[];function Oi(){return Uo.slice()}function $o(e){Uo.push(e)}function _i(e){if(e!=null){if(typeof e=="object"){let t=e;if(typeof t.type=="string")return t.type;if(typeof t.Type=="string")return t.Type;if(typeof t.kind=="string")return t.kind;if(typeof t.messageType=="string")return t.messageType}if(Array.isArray(e)&&typeof e[0]=="string")return e[0]}}function Ni(e){if(typeof e=="string")try{return JSON.parse(e)}catch{return e}return e}var bn=Symbol.for("ariesmod.ws.handlers.patched");function Z(e,t){if(typeof e=="string"){let r=e,i={match:a=>a.kind==="message"&&a.type===r,handle:t};return $o(i),i}let n=e,o={match:r=>r.kind==="close"&&r.code===n,handle:t};return $o(o),o}function Ko(e,t=Oi(),n={}){let o=n.pageWindow??window,r=!!n.debug;if(e[bn])return()=>{};e[bn]=!0;let i={ws:e,pageWindow:o,debug:r},a=c=>{for(let p of t)try{if(!p.match(c))continue;if(p.handle(c,i)===!0)return}catch(m){r&&console.error("[WS] handler error",m,c)}},s=c=>{let p=Ni(c.data),m=_i(p);a({kind:"message",raw:c.data,data:p,type:m})},l=c=>{a({kind:"close",code:c.code,reason:c.reason,wasClean:c.wasClean,event:c})},u=c=>a({kind:"open",event:c}),d=c=>a({kind:"error",event:c});return e.addEventListener("message",s),e.addEventListener("close",l),e.addEventListener("open",u),e.addEventListener("error",d),()=>{try{e.removeEventListener("message",s)}catch{}try{e.removeEventListener("close",l)}catch{}try{e.removeEventListener("open",u)}catch{}try{e.removeEventListener("error",d)}catch{}try{delete e[bn]}catch{}}}(function(){try{let t=Di,n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();Z(4800,(e,t)=>{t.debug&&console.log("[WS][Close] Auth failure",e.code,e.reason)});Z(4300,(e,t)=>{t.debug&&console.log("[WS][Close] Superseded",e.code,e.reason)});Z(4400,(e,t)=>{t.debug&&console.log("[WS][Close] Heartbeat expired",e.code,e.reason)});Z(4500,(e,t)=>{t.debug&&console.log("[WS][Close] Player kicked",e.code,e.reason)});Z(4200,(e,t)=>{t.debug&&console.log("[WS][Close] Player left voluntarily",e.code,e.reason)});Z(4100,(e,t)=>{t.debug&&console.log("[WS][Close] Reconnect initiated",e.code,e.reason)});Z(4310,(e,t)=>{t.debug&&console.log("[WS][Close] Server disposed",e.code,e.reason)});Z(4250,(e,t)=>{t.debug&&console.log("[WS][Close] User session superseded",e.code,e.reason)});Z(4710,(e,t)=>{t.debug&&console.log("[WS][Close] Version expired",e.code,e.reason)});Z(4700,(e,t)=>{t.debug&&console.log("[WS][Close] Version mismatch",e.code,e.reason)});Z(be.Config,(e,t)=>{t.debug&&console.log("[WS][STC] Config",e.data)});Z(be.CurrencyTransaction,(e,t)=>{t.debug&&console.log("[WS][STC] CurrencyTransaction",e.data)});Z(be.Emote,(e,t)=>{t.debug&&console.log("[WS][STC] Emote",e.data)});Z(be.InappropriateContentRejected,(e,t)=>{t.debug&&console.log("[WS][STC] InappropriateContentRejected",e.data)});Z(be.PartialState,(e,t)=>{t.debug&&console.log("[WS][STC] PartialState",e.data)});Z(be.Pong,(e,t)=>{t.debug&&console.log("[WS][STC] Pong",e.data)});Z(be.ServerErrorMessage,(e,t)=>{t.debug&&console.log("[WS][STC] ServerErrorMessage",e.data)});Z(be.Welcome,(e,t)=>{t.debug&&console.log("[WS][STC] Welcome",e.data)});j(V.PlantSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantSeed"),!!1));j(V.WaterPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] WaterPlant"),!!1));j(V.HarvestCrop,(e,t)=>(t.debug&&console.log("[MW][Garden] HarvestCrop"),!!1));j(V.SellAllCrops,(e,t)=>(t.debug&&console.log("[MW][Garden] SellAllCrops"),!!1));j(V.PurchaseSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseSeed"),!!1));j(V.PurchaseEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseEgg"),!!1));j(V.PurchaseTool,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseTool"),!!1));j(V.PurchaseDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseDecor"),!!1));j(V.PlantEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantEgg"),!!1));j(V.HatchEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] HatchEgg"),!!1));j(V.PlantGardenPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantGardenPlant"),!!1));j(V.PotPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PotPlant"),!!1));j(V.MutationPotion,(e,t)=>(t.debug&&console.log("[MW][Garden] MutationPotion"),!!1));j(V.PickupDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PickupDecor"),!!1));j(V.PlaceDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PlaceDecor"),!!1));j(V.RemoveGardenObject,(e,t)=>(t.debug&&console.log("[MW][Garden] RemoveGardenObject"),!!1));j(V.MoveInventoryItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveInventoryItem"),!!1));j(V.DropObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] DropObject"),!!1));j(V.PickupObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] PickupObject"),!!1));j(V.ToggleFavoriteItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] ToggleFavoriteItem"),!!1));j(V.PutItemInStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] PutItemInStorage"),!!1));j(V.RetrieveItemFromStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] RetrieveItemFromStorage"),!!1));j(V.MoveStorageItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveStorageItem"),!!1));j(V.LogItems,(e,t)=>(t.debug&&console.log("[MW][Inventory] LogItems"),!!1));j(V.PlacePet,(e,t)=>(t.debug&&console.log("[MW][Pets] PlacePet"),!!1));j(V.FeedPet,(e,t)=>(t.debug&&console.log("[MW][Pets] FeedPet"),!!1));j(V.PetPositions,(e,t)=>(t.debug&&console.log("[MW][Pets] PetPositions"),!!1));j(V.SwapPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SwapPet"),!!1));j(V.StorePet,(e,t)=>(t.debug&&console.log("[MW][Pets] StorePet"),!!1));j(V.NamePet,(e,t)=>(t.debug&&console.log("[MW][Pets] NamePet"),!!1));j(V.SellPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SellPet"),!!1));console.log("[WS] TESTTEST");j(V.SetSelectedGame,(e,t)=>(t.debug&&console.log("[MW][Session] SetSelectedGame"),!!1));j(V.VoteForGame,(e,t)=>(t.debug&&console.log("[MW][Session] VoteForGame"),!!1));j(V.RequestGame,(e,t)=>(t.debug&&console.log("[MW][Session] RequestGame"),!!1));j(V.RestartGame,(e,t)=>(t.debug&&console.log("[MW][Session] RestartGame"),!!1));j(V.Ping,(e,t)=>(t.debug&&console.log("[MW][Session] Ping"),!!1));j(V.PlayerPosition,(e,t)=>(t.debug&&console.log("[MW][Session] PlayerPosition"),!!1));j(V.Teleport,(e,t)=>(t.debug&&console.log("[MW][Session] Teleport"),!!1));j(V.CheckWeatherStatus,(e,t)=>(t.debug&&console.log("[MW][Session] CheckWeatherStatus"),!!1));j(V.Chat,(e,t)=>(t.debug&&console.log("[MW][Social] Chat"),!!1));j(V.Dev,(e,t)=>(t.debug&&console.log("[MW][Social] Dev"),!!1));j(V.Emote,(e,t)=>(t.debug&&console.log("[MW][Social] Emote"),!!1));j(V.Wish,(e,t)=>(t.debug&&console.log("[MW][Social] Wish"),!!1));j(V.KickPlayer,(e,t)=>(t.debug&&console.log("[MW][Social] KickPlayer"),!!1));j(V.ReportSpeakingStart,(e,t)=>(t.debug&&console.log("[MW][Voice] ReportSpeakingStart"),!!1));j(V.SetPlayerData,(e,t)=>(t.debug&&console.log("[MW][Social] SetPlayerData"),!!1));j(V.UsurpHost,(e,t)=>(t.debug&&console.log("[MW][Social] UsurpHost"),!!1));function Gi(e={}){let t=e.pageWindow??B,n=e.pollMs??500,o=!!e.debug,r=[];r.push(ho(t,{debug:o})),r.push(zo({pageWindow:t,middlewares:e.middlewares,debug:o}));let i=null,a=s=>{if(i){try{i()}catch{}i=null}s&&(i=Ko(s,e.handlers,{debug:o,pageWindow:t}))};return a(et(t).ws),r.push(At(s=>a(s.ws),{intervalMs:n,debug:o,pageWindow:t})),{getWs:()=>et(t).ws,dispose:()=>{for(let s=r.length-1;s>=0;s--)try{r[s]()}catch{}if(i){try{i()}catch{}i=null}}}}var Mt=null;function qo(e={}){return Mt||(Mt=Gi(e),Mt)}var Ie=e=>new Promise(t=>setTimeout(t,e)),se=e=>{try{return e()}catch{return}},ue=(e,t,n)=>Math.max(t,Math.min(n,e)),Jo=e=>ue(e,0,1);async function hn(e,t,n){let o=performance.now();for(;performance.now()-o<t;){let r=await Promise.race([e,Ie(50).then(()=>null)]);if(r!==null)return r}throw new Error(`${n} timeout`)}var ot=null;function Wi(){return B?.document??(typeof document<"u"?document:null)}function yn(e){if(ot!==null)return;let t=e??Wi();if(!t)return;let n=t.scripts;for(let o=0;o<n.length;o++){let i=n.item(o)?.src;if(!i)continue;let a=i.match(/\/(?:r\/\d+\/)?version\/([^/]+)/);if(a?.[1]){ot=a[1];return}}}function Bi(){return yn(),ot}async function Vi(e=15e3){let t=performance.now();for(;performance.now()-t<e;){if(yn(),ot)return ot;await Ie(50)}throw new Error("MGVersion timeout (gameVersion not found)")}var rt={init:yn,get:Bi,wait:Vi};var Yo=B?.location?.origin||"https://magicgarden.gg";function Xo(){return typeof GM_xmlhttpRequest=="function"}function Qo(e,t="text"){return new Promise((n,o)=>{GM_xmlhttpRequest({method:"GET",url:e,responseType:t,onload:r=>r.status>=200&&r.status<300?n(r):o(new Error(`HTTP ${r.status} for ${e}`)),onerror:()=>o(new Error(`Network error for ${e}`)),ontimeout:()=>o(new Error(`Timeout for ${e}`))})})}async function We(e){if(Xo())return JSON.parse((await Qo(e,"text")).responseText);let t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.json()}async function Pt(e){if(Xo())return(await Qo(e,"blob")).response;let t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.blob()}function Zo(e){return new Promise((t,n)=>{let o=URL.createObjectURL(e),r=B?.Image||Image,i=new r;i.decoding="async",i.onload=()=>{URL.revokeObjectURL(o),t(i)},i.onerror=()=>{URL.revokeObjectURL(o),n(new Error("Image decode failed"))},i.src=o})}var ie=(e,t)=>e.replace(/\/?$/,"/")+String(t||"").replace(/^\//,""),ji=e=>e.lastIndexOf("/")>=0?e.slice(0,e.lastIndexOf("/")+1):"",xn=(e,t)=>String(t||"").startsWith("/")?String(t).slice(1):ji(e)+String(t||"");var Et=null,It=null;async function er(){return It||Et||(Et=(async()=>{let e=await rt.wait(15e3);return It=`${Yo}/version/${e}/assets/`,It})(),Et)}async function Fi(e){let t=await er();return ie(t,e)}var me={base:er,url:Fi};var vn=new Map;async function zi(e){let t=e||await me.base();if(vn.has(t))return vn.get(t);let n=We(ie(t,"manifest.json"));return vn.set(t,n),n}function $i(e,t){return e?.bundles?.find(n=>n?.name===t)||null}function Ui(e){let t=new Set;for(let n of e?.assets||[])for(let o of n?.src||[])typeof o=="string"&&o.endsWith(".json")&&o!=="manifest.json"&&t.add(o);return Array.from(t)}var le={load:zi,getBundle:$i,listJsonFromBundle:Ui};var tr=Function.prototype.bind,J={_bindPatched:!1,engine:null,tos:null,app:null,renderer:null,ticker:null,stage:null},nr,or,rr,Ki=new Promise(e=>{nr=e}),qi=new Promise(e=>{or=e}),Ji=new Promise(e=>{rr=e});function Yi(e){return!!(e&&typeof e=="object"&&typeof e.start=="function"&&typeof e.destroy=="function"&&e.app&&e.app.stage&&e.app.renderer&&e.systems&&typeof e.systems.values=="function")}function Xi(e){try{for(let t of e.systems.values()){let n=t?.system;if(n?.name==="tileObject")return n}}catch{}return null}function Qi(e){J.engine=e,J.tos=Xi(e)||null,J.app=e.app||null,J.renderer=e.app?.renderer||null,J.ticker=e.app?.ticker||null,J.stage=e.app?.stage||null;try{nr(e)}catch{}try{J.app&&or(J.app)}catch{}try{J.renderer&&rr(J.renderer)}catch{}}function wn(){return J.engine?!0:(J._bindPatched||(J._bindPatched=!0,Function.prototype.bind=function(e,...t){let n=tr.call(this,e,...t);try{!J.engine&&Yi(e)&&(Function.prototype.bind=tr,J._bindPatched=!1,Qi(e))}catch{}return n}),!1)}wn();async function Zi(e=15e3){let t=performance.now();for(;performance.now()-t<e;){if(J.engine)return!0;wn(),await Ie(50)}throw new Error("MGPixiHooks: engine capture timeout")}async function ea(e=15e3){return J.engine||await Zi(e),!0}function ta(){return J.engine&&J.app?{ok:!0,engine:J.engine,tos:J.tos,app:J.app}:(wn(),{ok:!1,engine:J.engine,tos:J.tos,app:J.app,note:"Not captured. Wait for room, or reload."})}var ne={engineReady:Ki,appReady:qi,rendererReady:Ji,engine:()=>J.engine,tos:()=>J.tos,app:()=>J.app,renderer:()=>J.renderer,ticker:()=>J.ticker,stage:()=>J.stage,PIXI:()=>B.PIXI||null,init:ea,hook:ta,ready:()=>!!J.engine};var Lt=null,N={ready:!1,app:null,renderer:null,ctors:null,baseUrl:null,textures:new Map,animations:new Map,live:new Set,defaultParent:null,overlay:null,categoryIndex:null},Le=(...e)=>{try{console.log("[MGSprite]",...e)}catch{}};function na(e,t,n=25e3){let o=[e],r=new Set,i=0;for(;o.length&&i++<n;){let a=o.pop();if(!a||r.has(a))continue;if(r.add(a),t(a))return a;let s=a.children;if(Array.isArray(s))for(let l=s.length-1;l>=0;l--)o.push(s[l])}return null}function oa(e){let t=B.PIXI;if(t?.Texture&&t?.Sprite&&t?.Container&&t?.Rectangle)return{Container:t.Container,Sprite:t.Sprite,Texture:t.Texture,Rectangle:t.Rectangle,AnimatedSprite:t.AnimatedSprite||null};let n=e?.stage,o=na(n,r=>r?.texture?.frame&&r?.constructor&&r?.texture?.constructor&&r?.texture?.frame?.constructor);if(!o)throw new Error("No Sprite found yet (constructors).");return{Container:n.constructor,Sprite:o.constructor,Texture:o.texture.constructor,Rectangle:o.texture.frame.constructor,AnimatedSprite:t?.AnimatedSprite||null}}async function ra(e,t=15e3){let n=performance.now();for(;performance.now()-n<t;)try{return oa(e)}catch{await Ie(50)}throw new Error("Constructors timeout")}var ia=e=>e&&typeof e=="object"&&e.frames&&e.meta&&typeof e.meta.image=="string";function kn(e,t,n,o,r){return new e(t,n,o,r)}function aa(e,t,n,o,r,i,a){let s;try{s=new e({source:t.source,frame:n,orig:o,trim:r||void 0,rotate:i||0})}catch{s=new e(t.baseTexture||t,n,o,r||void 0,i||0)}if(a)if(s.defaultAnchor?.set)try{s.defaultAnchor.set(a.x,a.y)}catch{}else s.defaultAnchor?(s.defaultAnchor.x=a.x,s.defaultAnchor.y=a.y):s.defaultAnchor={x:a.x,y:a.y};try{s.updateUvs?.()}catch{}return s}function sa(e,t,n,o){let{Texture:r,Rectangle:i}=o;for(let[a,s]of Object.entries(e.frames)){let l=s.frame,u=!!s.rotated,d=u?2:0,c=u?l.h:l.w,p=u?l.w:l.h,m=kn(i,l.x,l.y,c,p),f=s.sourceSize||{w:l.w,h:l.h},b=kn(i,0,0,f.w,f.h),h=null;if(s.trimmed&&s.spriteSourceSize){let y=s.spriteSourceSize;h=kn(i,y.x,y.y,y.w,y.h)}n.set(a,aa(r,t,m,b,h,d,s.anchor||null))}}function Ht(e){let t=String(e||"").trim();return t?t.startsWith("sprite/")||t.startsWith("sprites/")?t:t.includes("/")?`sprite/${t}`:t:""}function it(e,t){let n=String(e||"").trim().replace(/^sprites?\//,"").replace(/^\/+|\/+$/g,""),o=String(t||"").trim();return o.includes("/")||!n?Ht(o):`sprite/${n}/${o}`}function Be(e,t){let n=it(e,t);if(N.textures.has(n)||N.animations.has(n))return n;let o=String(t||"").trim();if(N.textures.has(o)||N.animations.has(o))return o;let r=Ht(o);return N.textures.has(r)||N.animations.has(r)?r:n}function la(){if(N.overlay)return N.overlay;let e=new N.ctors.Container;e.sortableChildren=!0,e.zIndex=99999999;try{N.app.stage.sortableChildren=!0}catch{}return N.app.stage.addChild(e),N.overlay=e,e}function ca(){let e=N.defaultParent;if(!e)return null;try{return typeof e=="function"?e():e}catch{return null}}async function da(){let e=await le.load(N.baseUrl),t=le.getBundle(e,"default");if(!t)throw new Error("No default bundle in manifest");let n=le.listJsonFromBundle(t),o=new Set,r=new Map,i=(s,l)=>{let u=String(s||"").trim(),d=String(l||"").trim();!u||!d||(r.has(u)||r.set(u,new Set),r.get(u).add(d))};async function a(s){if(o.has(s))return;o.add(s);let l=await We(ie(N.baseUrl,s));if(!ia(l))return;let u=l.meta?.related_multi_packs;if(Array.isArray(u))for(let m of u)await a(xn(s,m));let d=xn(s,l.meta.image),c=await Zo(await Pt(ie(N.baseUrl,d))),p=N.ctors.Texture.from(c);sa(l,p,N.textures,N.ctors);for(let m of Object.keys(l.frames||{})){let f=/^sprite\/([^/]+)\/(.+)$/.exec(m);f&&i(f[1],f[2])}if(l.animations&&typeof l.animations=="object")for(let[m,f]of Object.entries(l.animations)){if(!Array.isArray(f))continue;let b=f.map(h=>N.textures.get(h)).filter(Boolean);b.length>=2&&N.animations.set(m,b)}}for(let s of n)await a(s);N.categoryIndex=r}function ua(e,t,n){if(!N.ready)throw new Error("MGSprite not ready yet");let o,r;typeof t=="string"?(o=Be(e,t),r=n||{}):(o=Be(null,e),r=t||{});let i=r.parent||ca()||la(),a=N.renderer?.width||N.renderer?.view?.width||innerWidth,s=N.renderer?.height||N.renderer?.view?.height||innerHeight,l=r.center?a/2:r.x??a/2,u=r.center?s/2:r.y??s/2,d,c=N.animations.get(o);if(c&&c.length>=2){let f=N.ctors.AnimatedSprite;if(f)d=new f(c),d.animationSpeed=r.fps?r.fps/60:r.speed??.15,d.loop=r.loop??!0,d.play();else{let b=new N.ctors.Sprite(c[0]),y=1e3/Math.max(1,r.fps||8),k=0,S=0,v=w=>{let T=N.app.ticker?.deltaMS??w*16.666666666666668;if(k+=T,k<y)return;let C=k/y|0;k%=y,S=(S+C)%c.length,b.texture=c[S]};b.__mgTick=v,N.app.ticker?.add?.(v),d=b}}else{let f=N.textures.get(o);if(!f)throw new Error(`Unknown sprite/anim key: ${o}`);d=new N.ctors.Sprite(f)}let p=r.anchorX??d.texture?.defaultAnchor?.x??.5,m=r.anchorY??d.texture?.defaultAnchor?.y??.5;return d.anchor?.set?.(p,m),d.position.set(l,u),d.scale.set(r.scale??1),d.alpha=r.alpha??1,d.rotation=r.rotation??0,d.zIndex=r.zIndex??999999,i.addChild(d),N.live.add(d),d.__mgDestroy=()=>{try{d.__mgTick&&N.app.ticker?.remove?.(d.__mgTick)}catch{}try{d.destroy?.({children:!0,texture:!1,baseTexture:!1})}catch{try{d.destroy?.()}catch{}}N.live.delete(d)},d}function pa(e){let t=N.renderer;if(t?.extract?.canvas)return t.extract.canvas(e);if(t?.plugins?.extract?.canvas)return t.plugins.extract.canvas(e);throw new Error("No extract.canvas available on renderer")}function ma(e,t,n){if(!N.ready)throw new Error("MGSprite not ready yet");let o,r;typeof t=="string"?(o=Be(e,t),r=n||{}):(o=Be(null,e),r=t||{});let i=N.animations.get(o),a=Math.max(0,(r.frameIndex??0)|0),s=i?.length?i[a%i.length]:N.textures.get(o);if(!s)throw new Error(`Unknown sprite/anim key: ${o}`);let l=new N.ctors.Sprite(s),u=r.anchorX??l.texture?.defaultAnchor?.x??.5,d=r.anchorY??l.texture?.defaultAnchor?.y??.5;l.anchor?.set?.(u,d),l.scale.set(r.scale??1);let c=r.pad??2,p=new N.ctors.Container;p.addChild(l);try{p.updateTransform?.()}catch{}let m=l.getBounds?.(!0)||{x:0,y:0,width:l.width,height:l.height};l.position.set(-m.x+c,-m.y+c);let f=pa(p);try{p.destroy?.({children:!0})}catch{}return f}function ga(){for(let e of Array.from(N.live))e.__mgDestroy?.()}function fa(e){return N.defaultParent=e,!0}function ba(e){return N.defaultParent=e,!0}function ha(e,t){let n=typeof t=="string"?Be(e,t):Be(null,e);return N.textures.has(n)||N.animations.has(n)}function Ve(){if(!N.ready)throw new Error("MGSprite not ready yet")}function ya(){Ve();let e=N.categoryIndex;return e?Array.from(e.keys()).sort((t,n)=>t.localeCompare(n)):[]}function xa(e){Ve();let t=String(e||"").trim();if(!t)return[];let n=N.categoryIndex;return n?Array.from(n.get(t)?.values()||[]).sort((o,r)=>o.localeCompare(r)):[]}function va(e,t){Ve();let n=String(e||"").trim(),o=String(t||"").trim();if(!n||!o)return!1;let r=N.categoryIndex;if(!r)return!1;let i=n.toLowerCase(),a=o.toLowerCase();for(let[s,l]of r.entries())if(s.toLowerCase()===i){for(let u of l.values())if(u.toLowerCase()===a)return!0}return!1}function wa(e){Ve();let t=N.categoryIndex;if(!t)return[];let n=String(e||"").trim().toLowerCase(),o=[];for(let[r,i]of t.entries())for(let a of i.values()){let s=it(r,a);(!n||s.toLowerCase().startsWith(n))&&o.push(s)}return o.sort((r,i)=>r.localeCompare(i))}function ka(e){Ve();let t=String(e||"").trim();if(!t)return null;let n=Ht(t),o=/^sprite\/([^/]+)\/(.+)$/.exec(n);if(!o)return null;let r=o[1],i=o[2],a=N.categoryIndex,s=r.toLowerCase(),l=i.toLowerCase(),u=r,d=i;if(a){let c=Array.from(a.keys()).find(f=>f.toLowerCase()===s);if(!c)return null;u=c;let p=a.get(c);if(!p)return null;let m=Array.from(p.values()).find(f=>f.toLowerCase()===l);if(!m)return null;d=m}return{category:u,id:d,key:it(u,d)}}function Sa(e,t){Ve();let n=String(e||"").trim(),o=String(t||"").trim();if(!n||!o)throw new Error("getIdPath(category, id) requires both category and id");let r=N.categoryIndex;if(!r)throw new Error("Sprite categories not indexed");let i=n.toLowerCase(),a=o.toLowerCase(),s=Array.from(r.keys()).find(d=>d.toLowerCase()===i)||n,l=r.get(s);if(!l)throw new Error(`Unknown sprite category: ${n}`);let u=Array.from(l.values()).find(d=>d.toLowerCase()===a)||o;if(!l.has(u))throw new Error(`Unknown sprite id: ${n}/${o}`);return it(s,u)}async function Ta(){return N.ready?!0:Lt||(Lt=(async()=>{let e=performance.now();Le("init start");let t=await hn(ne.appReady,15e3,"PIXI app");Le("app ready");let n=await hn(ne.rendererReady,15e3,"PIXI renderer");return Le("renderer ready"),N.app=t,N.renderer=n||t?.renderer||null,N.ctors=await ra(t),Le("constructors resolved"),N.baseUrl=await me.base(),Le("base url",N.baseUrl),await da(),Le("atlases loaded","textures",N.textures.size,"animations",N.animations.size,"categories",N.categoryIndex?.size??0),N.ready=!0,Le("ready in",Math.round(performance.now()-e),"ms"),!0})(),Lt)}var Rt={init:Ta,ready:()=>N.ready,show:ua,toCanvas:ma,clear:ga,attach:fa,attachProvider:ba,has:ha,key:(e,t)=>it(e,t),getCategories:ya,getCategoryId:xa,hasId:va,listIds:wa,getIdInfo:ka,getIdPath:Sa};var Ot=null,ge={ready:!1,xform:null,xformAt:0};function Fe(e){try{if(typeof structuredClone=="function")return structuredClone(e)}catch{}try{return JSON.parse(JSON.stringify(e))}catch{}return e}function at(){return ne.tos()}function An(){return ne.engine()}function Aa(){let e=at()?.map?.cols;return Number.isFinite(e)&&e>0?e:null}function Cn(e,t){let n=Aa();return n?t*n+e|0:null}function He(e,t,n=!0){let o=at(),r=Cn(e,t);if(!o||r==null)return{gidx:null,tv:null};let i=o.tileViews?.get?.(r)||null;if(!i&&n&&typeof o.getOrCreateTileView=="function")try{i=o.getOrCreateTileView(r)}catch{}return{gidx:r,tv:i||null}}function je(e,t,n,o={}){let r=o.ensureView!==!1,i=o.forceUpdate!==!1,a=An(),{gidx:s,tv:l}=He(Number(e),Number(t),r);if(s==null)throw new Error("MGTile: cols unavailable (engine/TOS not ready)");if(!l)throw new Error("MGTile: TileView unavailable (not instantiated)");let u=l.tileObject;if(typeof l.onDataChanged!="function")throw new Error("MGTile: tileView.onDataChanged not found (different API?)");if(l.onDataChanged(n),i&&a?.reusableContext&&typeof l.update=="function")try{l.update(a.reusableContext)}catch{}return{ok:!0,tx:Number(e),ty:Number(t),gidx:s,before:u,after:l.tileObject}}function Mn(e,t){if(!e)throw new Error("MGTile: no tileObject on this tile");if(e.objectType!==t)throw new Error(`MGTile: expected objectType "${t}", got "${e.objectType}"`)}function Sn(e,t){if("startTime"in t&&(e.startTime=Number(t.startTime)),"endTime"in t&&(e.endTime=Number(t.endTime)),"targetScale"in t&&(e.targetScale=Number(t.targetScale)),"mutations"in t){if(!Array.isArray(t.mutations))throw new Error("MGTile: mutations must be an array of strings");e.mutations=t.mutations.slice()}}function xe(){if(!ge.ready)throw new Error("MGTile: not ready. Call MGTile.init() first.")}function Tn(e){if(!e)return null;let t=r=>r&&(typeof r.getGlobalPosition=="function"||typeof r.toGlobal=="function"),n=["container","root","view","tile","ground","base","floor","bg","background","baseSprite","tileSprite","displayObject","gfx","graphics","sprite"];for(let r of n)if(t(e[r]))return e[r];if(t(e))return e;let o=[e.container,e.root,e.view,e.displayObject,e.tileSprite,e.gfx,e.graphics,e.sprite];for(let r of o)if(t(r))return r;try{for(let r of Object.keys(e))if(t(e[r]))return e[r]}catch{}return null}function _t(e){let t=se(()=>e?.getGlobalPosition?.());if(t&&Number.isFinite(t.x)&&Number.isFinite(t.y))return{x:t.x,y:t.y};let n=se(()=>e?.toGlobal?.({x:0,y:0}));return n&&Number.isFinite(n.x)&&Number.isFinite(n.y)?{x:n.x,y:n.y}:null}function Ca(e){try{if(!e?.getBounds)return"center";let t=e.getBounds(),n=_t(e);if(!n||!t||!Number.isFinite(t.width)||!Number.isFinite(t.height))return"center";let o=t.x+t.width/2,r=t.y+t.height/2;return Math.hypot(n.x-o,n.y-r)<Math.hypot(n.x-t.x,n.y-t.y)?"center":"topleft"}catch{return"center"}}function Ma(){let e=at(),t=e?.map?.cols,n=e?.map?.rows;if(!e||!Number.isFinite(t)||t<=1)return null;let o=Number.isFinite(n)&&n>1?n:null,r=[[0,0],[1,1],[Math.min(2,t-2),0],[0,1]];o&&o>2&&r.push([Math.floor(t/2),Math.floor(o/2)]);for(let[i,a]of r){if(i<0||a<0||i>=t||o&&a>=o)continue;let s=He(i,a,!0).tv,l=i+1<t?He(i+1,a,!0).tv:null,u=He(i,a+1,!0).tv,d=Tn(s),c=Tn(l),p=Tn(u);if(!d||!c||!p)continue;let m=_t(d),f=_t(c),b=_t(p);if(!m||!f||!b)continue;let h={x:f.x-m.x,y:f.y-m.y},y={x:b.x-m.x,y:b.y-m.y},k=h.x*y.y-h.y*y.x;if(!Number.isFinite(k)||Math.abs(k)<1e-6)continue;let S=1/k,v={a:y.y*S,b:-y.x*S,c:-h.y*S,d:h.x*S},w={x:m.x-i*h.x-a*y.x,y:m.y-i*h.y-a*y.y},T=Ca(d),C=T==="center"?w:{x:w.x+.5*(h.x+y.x),y:w.y+.5*(h.y+y.y)};return{ok:!0,cols:t,rows:o,vx:h,vy:y,inv:v,anchorMode:T,originCenter:C}}return null}async function Pa(e=15e3){return ge.ready?!0:Ot||(Ot=(async()=>{if(await ne.init(e),!at())throw new Error("MGTile: engine captured but tileObject system not found");return ge.ready=!0,!0})(),Ot)}function Ea(){return ne.hook()}function Nt(e,t,n={}){xe();let o=n.ensureView!==!1,r=n.clone!==!1,{gidx:i,tv:a}=He(Number(e),Number(t),o);if(i==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!a)return{tx:Number(e),ty:Number(t),gidx:i,tileView:null,tileObject:void 0};let s=a.tileObject;return{tx:Number(e),ty:Number(t),gidx:i,tileView:a,tileObject:r?Fe(s):s}}function Ia(e,t,n={}){return xe(),je(e,t,null,n)}function La(e,t,n,o={}){xe();let i=Nt(e,t,{...o,clone:!1}).tileView?.tileObject;Mn(i,"plant");let a=Fe(i);if(Array.isArray(a.slots)||(a.slots=[]),"plantedAt"in n&&(a.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(a.maturedAt=Number(n.maturedAt)),"species"in n&&(a.species=String(n.species)),"slotIdx"in n&&"slotPatch"in n){let s=Number(n.slotIdx)|0;if(!a.slots[s])throw new Error(`MGTile: plant slot ${s} doesn't exist`);return Sn(a.slots[s],n.slotPatch),je(e,t,a,o)}if("slots"in n){let s=n.slots;if(Array.isArray(s)){for(let l=0;l<s.length;l++)if(s[l]!=null){if(!a.slots[l])throw new Error(`MGTile: plant slot ${l} doesn't exist`);Sn(a.slots[l],s[l])}}else if(s&&typeof s=="object")for(let l of Object.keys(s)){let u=Number(l)|0;if(Number.isFinite(u)){if(!a.slots[u])throw new Error(`MGTile: plant slot ${u} doesn't exist`);Sn(a.slots[u],s[u])}}else throw new Error("MGTile: patch.slots must be array or object map");return je(e,t,a,o)}return je(e,t,a,o)}function Ha(e,t,n,o={}){xe();let i=Nt(e,t,{...o,clone:!1}).tileView?.tileObject;Mn(i,"decor");let a=Fe(i);return"rotation"in n&&(a.rotation=Number(n.rotation)),je(e,t,a,o)}function Ra(e,t,n,o={}){xe();let i=Nt(e,t,{...o,clone:!1}).tileView?.tileObject;Mn(i,"egg");let a=Fe(i);return"plantedAt"in n&&(a.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(a.maturedAt=Number(n.maturedAt)),je(e,t,a,o)}function Oa(e,t,n,o={}){xe();let r=o.ensureView!==!1,i=o.forceUpdate!==!1,a=An(),{gidx:s,tv:l}=He(Number(e),Number(t),r);if(s==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!l)throw new Error("MGTile: TileView unavailable");let u=l.tileObject,d=typeof n=="function"?n(Fe(u)):n;if(l.onDataChanged(d),i&&a?.reusableContext&&typeof l.update=="function")try{l.update(a.reusableContext)}catch{}return{ok:!0,tx:Number(e),ty:Number(t),gidx:s,before:u,after:l.tileObject}}function _a(e,t,n={}){xe();let o=n.ensureView!==!1,{gidx:r,tv:i}=He(Number(e),Number(t),o);if(r==null)throw new Error("MGTile: cols unavailable");if(!i)return{ok:!0,tx:Number(e),ty:Number(t),gidx:r,tv:null,tileObject:void 0};let a=n.clone!==!1,s=i.tileObject;return{ok:!0,tx:Number(e),ty:Number(t),gidx:r,objectType:s?.objectType??null,tileObject:a?Fe(s):s,tvKeys:Object.keys(i||{}).sort(),tileView:i}}function ir(){return xe(),ge.xform=Ma(),ge.xformAt=Date.now(),{ok:!!ge.xform?.ok,xform:ge.xform}}function Na(e,t={}){if(xe(),!e||!Number.isFinite(e.x)||!Number.isFinite(e.y))return null;let n=Number.isFinite(t.maxAgeMs)?Number(t.maxAgeMs):1500;(!ge.xform?.ok||t.forceRebuild||Date.now()-ge.xformAt>n)&&ir();let o=ge.xform;if(!o?.ok)return null;let r=e.x-o.originCenter.x,i=e.y-o.originCenter.y,a=o.inv.a*r+o.inv.b*i,s=o.inv.c*r+o.inv.d*i,l=Math.floor(a),u=Math.floor(s),d=[[l,u],[l+1,u],[l,u+1],[l+1,u+1]],c=null,p=1/0;for(let[m,f]of d){if(m<0||f<0||m>=o.cols||Number.isFinite(o.rows)&&o.rows!==null&&f>=o.rows)continue;let b=o.originCenter.x+m*o.vx.x+f*o.vy.x,h=o.originCenter.y+m*o.vx.y+f*o.vy.y,y=(e.x-b)**2+(e.y-h)**2;y<p&&(p=y,c={tx:m,ty:f,fx:a,fy:s,x:e.x,y:e.y,gidx:null})}return c?(c.gidx=Cn(c.tx,c.ty),c):null}function Da(){return["MGTile.init()","MGTile.hook()","MGTile.getTileObject(tx,ty) / inspect(tx,ty)","MGTile.setTileEmpty(tx,ty)","MGTile.setTilePlant(tx,ty,{...}) / setTileDecor / setTileEgg","MGTile.setTileObjectRaw(tx,ty,objOrFn)","MGTile.rebuildTransform() / pointToTile({x,y})"].join(`
`)}var ve={init:Pa,ready:()=>ge.ready,hook:Ea,engine:()=>An(),tos:()=>at(),gidx:(e,t)=>Cn(Number(e),Number(t)),getTileObject:Nt,inspect:_a,setTileEmpty:Ia,setTilePlant:La,setTileDecor:Ha,setTileEgg:Ra,setTileObjectRaw:Oa,rebuildTransform:ir,pointToTile:Na,help:Da};var F={ready:!1,app:null,renderer:null,stage:null,ticker:null,tileSets:new Map,highlights:new Map,watches:new Map,fades:new Map,fadeWatches:new Map},Hn=e=>!!e&&typeof e=="object"&&!Array.isArray(e),Pn=e=>!!(e&&typeof e.getBounds=="function"&&("parent"in e||"children"in e)),Gt=e=>!!(e&&typeof e.tint=="number"),Re=e=>!!(e&&typeof e.alpha=="number");function Dt(e,t,n){return e+(t-e)*n}function Ga(e,t,n){let o=e>>16&255,r=e>>8&255,i=e&255,a=t>>16&255,s=t>>8&255,l=t&255,u=Dt(o,a,n)|0,d=Dt(r,s,n)|0,c=Dt(i,l,n)|0;return u<<16|d<<8|c}function Wa(e,t=900){let n=[],o=[e];for(;o.length&&n.length<t;){let r=o.pop();if(!r)continue;Gt(r)&&n.push(r);let i=r.children;if(Array.isArray(i))for(let a=i.length-1;a>=0;a--)o.push(i[a])}return n}function Ba(e,t=25e3){let n=[],o=[e],r=0;for(;o.length&&r++<t;){let i=o.pop();if(!i)continue;Re(i)&&n.push(i);let a=i.children;if(Array.isArray(a))for(let s=a.length-1;s>=0;s--)o.push(a[s])}return n}function ar(e){if(!Array.isArray(e))return[];let t=new Set,n=[];for(let o of e){let r,i;if(Array.isArray(o))r=o[0],i=o[1];else if(Hn(o))r=o.x??o.tx,i=o.y??o.ty;else continue;if(r=Number(r),i=Number(i),!Number.isFinite(r)||!Number.isFinite(i))continue;r|=0,i|=0;let a=`${r},${i}`;t.has(a)||(t.add(a),n.push({x:r,y:i}))}return n}function Va(e,t){let n=String(e||"").trim();if(!n)throw new Error("MGPixi.defineTileSet: empty name");let o=ar(t);return F.tileSets.set(n,o),{ok:!0,name:n,count:o.length}}function ja(e){return F.tileSets.delete(String(e||"").trim())}function Fa(){return Array.from(F.tileSets.keys()).sort((e,t)=>e.localeCompare(t))}function sr(e){return!!(e&&(e.tileSet!=null||Array.isArray(e.tiles)))}function Rn(e){let n=ve.tos?.()?.tileViews;if(!n?.entries)throw new Error("MGPixi: TOS.tileViews not found");if(!sr(e))return{entries:Array.from(n.entries()),gidxSet:null};let o=[];if(e.tileSet!=null){let i=String(e.tileSet||"").trim(),a=F.tileSets.get(i);if(!a)throw new Error(`MGPixi: tileSet not found "${i}"`);o=a}else o=ar(e.tiles||[]);let r=new Map;for(let i of o){let a=ve.getTileObject(i.x,i.y,{ensureView:!0,clone:!1});a?.tileView&&a.gidx!=null&&r.set(a.gidx,a.tileView)}return{entries:Array.from(r.entries()),gidxSet:new Set(r.keys())}}function On(e){let t=F.highlights.get(e);if(!t)return!1;se(()=>F.ticker?.remove(t.tick)),t.root&&t.baseAlpha!=null&&Re(t.root)&&se(()=>{t.root.alpha=t.baseAlpha});for(let n of t.tint)n.o&&Gt(n.o)&&se(()=>{n.o.tint=n.baseTint});return F.highlights.delete(e),!0}function lr(e=null){for(let t of Array.from(F.highlights.keys()))e&&!String(t).startsWith(e)||On(t);return!0}function cr(e,t={}){if(Oe(),!Pn(e))throw new Error("MGPixi.highlightPulse: invalid root");let n=String(t.key||`hl:${Math.random().toString(16).slice(2)}`);if(F.highlights.has(n))return n;let o=Re(e)?Number(e.alpha):null,r=ue(Number(t.minAlpha??.12),0,1),i=ue(Number(t.maxAlpha??1),0,1),a=Number(t.speed??1.25),s=(t.tint??8386303)>>>0,l=ue(Number(t.tintMix??.85),0,1),u=t.deepTint!==!1,d=[];if(u)for(let m of Wa(e))d.push({o:m,baseTint:m.tint});else Gt(e)&&d.push({o:e,baseTint:e.tint});let c=performance.now(),p=()=>{let m=(performance.now()-c)/1e3,f=(Math.sin(m*Math.PI*2*a)+1)/2,b=f*f*(3-2*f);o!=null&&Re(e)&&(e.alpha=ue(Dt(r,i,b)*o,0,1));let h=b*l;for(let y of d)y.o&&Gt(y.o)&&(y.o.tint=Ga(y.baseTint,s,h))};return F.ticker?.add(p),F.highlights.set(n,{root:e,tick:p,baseAlpha:o,tint:d}),n}var za=["plantVisual","cropVisual","slotVisual","slotView","displayObject","view","container","root","sprite","gfx","graphics"];function En(e){if(!e)return null;if(Pn(e))return e;if(!Hn(e))return null;for(let t of za){let n=e[t];if(Pn(n))return n}return null}function $a(e,t){let n=[{o:e,d:0}],o=new Set,r=6;for(;n.length;){let{o:i,d:a}=n.shift();if(!(!i||a>r)&&!o.has(i)){if(o.add(i),Array.isArray(i)){if(i.length===t){let s=new Array(t),l=!0;for(let u=0;u<t;u++){let d=En(i[u]);if(!d){l=!1;break}s[u]=d}if(l)return s}for(let s of i)n.push({o:s,d:a+1});continue}if(Hn(i)){let s=i;for(let l of Object.keys(s))n.push({o:s[l],d:a+1})}}}return null}function Ua(e,t){let n=e?.mutations;if(!Array.isArray(n))return!1;for(let o of n)if(String(o||"").toLowerCase()===t)return!0;return!1}function dr(e,t={}){Oe();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.highlightMutation: empty mutation");let{entries:o,gidxSet:r}=Rn(t),i=`hlmut:${n}:`;if(t.clear===!0)if(!r)lr(i);else for(let c of Array.from(F.highlights.keys())){if(!c.startsWith(i))continue;let p=c.split(":"),m=Number(p[2]);r.has(m)&&On(c)}let a={tint:(t.tint??8386303)>>>0,minAlpha:Number(t.minAlpha??.12),maxAlpha:Number(t.maxAlpha??1),speed:Number(t.speed??1.25),tintMix:Number(t.tintMix??.85),deepTint:t.deepTint!==!1},s=0,l=0,u=0,d=0;for(let[c,p]of o){let m=p?.tileObject;if(!m||m.objectType!=="plant")continue;let f=m.slots;if(!Array.isArray(f)||f.length===0)continue;let b=!1,h=[];for(let S=0;S<f.length;S++)Ua(f[S],n)&&(h.push(S),b=!0);if(!b)continue;s++,l+=h.length;let y=p?.childView?.plantVisual||p?.childView||p,k=$a(y,f.length);if(!k){d+=h.length;continue}for(let S of h){let v=k[S];if(!v){d++;continue}let w=`${i}${c}:${S}`;F.highlights.has(w)||(cr(v,{key:w,...a}),u++)}}return{ok:!0,mutation:n,filtered:!!r,plantsMatched:s,matchedSlots:l,newHighlights:u,failedSlots:d}}function Ka(e,t={}){Oe();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchMutation: empty mutation");let o=`watchmut:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,r=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,i=F.watches.get(o);i&&clearInterval(i);let a=setInterval(()=>{se(()=>dr(n,{...t,clear:!1}))},r);return F.watches.set(o,a),{ok:!0,key:o,mutation:n,intervalMs:r}}function qa(e){let t=String(e||"").trim();if(!t)return!1;if(!t.startsWith("watchmut:")){let o=t.toLowerCase(),r=0;for(let[i,a]of Array.from(F.watches.entries()))i.startsWith(`watchmut:${o}:`)&&(clearInterval(a),F.watches.delete(i),r++);return r>0}let n=F.watches.get(t);return n?(clearInterval(n),F.watches.delete(t),!0):!1}function Ja(e){let t=Array.isArray(e?.slots)?e.slots:[];return{objectType:"plant",species:e?.species??null,plantedAt:e?.plantedAt??null,maturedAt:e?.maturedAt??null,slotCount:t.length,slots:t.map((n,o)=>({idx:o,mutations:Array.isArray(n?.mutations)?n.mutations.slice():[]}))}}function Ya(e,t,n={}){Oe();let o=Number(e)|0,r=Number(t)|0,i=n.ensureView!==!1,a=ve.getTileObject(o,r,{ensureView:i,clone:!1}),s=a?.tileView||null,l=s?.tileObject,u={ok:!0,tx:o,ty:r,gidx:a?.gidx??ve.gidx?.(o,r)??null,hasTileView:!!s,objectType:l?.objectType??null,tileObject:l??null,summary:l?.objectType==="plant"?Ja(l):l?{objectType:l.objectType??null}:null,display:s?s.childView?.plantVisual||s.childView||s.displayObject||s:null};return n.log!==!1&&se(()=>console.log("[MGPixi.inspectTile]",u)),u}function Xa(e){let t=e?.childView?.plantVisual||e?.childView?.cropVisual||e?.childView||e?.displayObject||e;return En(t)||En(e?.displayObject)||null}function ur(e){let t=F.fades.get(e);if(!t)return!1;for(let n of t.targets)n.o&&Re(n.o)&&Number.isFinite(n.baseAlpha)&&se(()=>{n.o.alpha=n.baseAlpha});return F.fades.delete(e),!0}function In(e=null){for(let t of Array.from(F.fades.keys()))e&&!String(t).startsWith(e)||ur(t);return!0}function pr(e,t={}){Oe();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.clearSpeciesFade: empty species");let o=`fade:${n}:`;if(!sr(t))return In(o);let{gidxSet:r}=Rn(t);if(!r)return In(o);for(let i of Array.from(F.fades.keys())){if(!i.startsWith(o))continue;let a=Number(i.slice(o.length));r.has(a)&&ur(i)}return!0}function mr(e,t={}){Oe();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.fadeSpecies: empty species");let o=ue(Number(t.alpha??.2),0,1),r=t.deep===!0,{entries:i,gidxSet:a}=Rn(t),s=`fade:${n}:`;t.clear===!0&&pr(n,t);let l=0,u=0,d=0,c=0;for(let[p,m]of i){let f=m?.tileObject;if(!f||f.objectType!=="plant")continue;l++;let b=String(f.species||"").trim().toLowerCase();if(!b||b!==n)continue;u++;let h=Xa(m);if(!h||!Re(h)){c++;continue}let y=`${s}${p}`;if(F.fades.has(y)){se(()=>{h.alpha=o}),d++;continue}let k=r?Ba(h):[h],S=[];for(let v of k)Re(v)&&S.push({o:v,baseAlpha:Number(v.alpha)});for(let v of S)se(()=>{v.o.alpha=o});F.fades.set(y,{targets:S}),d++}return{ok:!0,species:n,alpha:o,deep:r,filtered:!!a,plantsSeen:l,matchedPlants:u,applied:d,failed:c,totalFades:F.fades.size}}function Qa(e,t={}){Oe();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchFadeSpecies: empty species");let o=`watchfade:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,r=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,i=F.fadeWatches.get(o);i&&clearInterval(i);let a=setInterval(()=>{se(()=>mr(n,{...t,clear:!1}))},r);return F.fadeWatches.set(o,a),{ok:!0,key:o,species:n,intervalMs:r}}function Za(e){let t=String(e||"").trim();if(!t)return!1;if(!t.startsWith("watchfade:")){let o=t.toLowerCase(),r=0;for(let[i,a]of Array.from(F.fadeWatches.entries()))i.startsWith(`watchfade:${o}:`)&&(clearInterval(a),F.fadeWatches.delete(i),r++);return r>0}let n=F.fadeWatches.get(t);return n?(clearInterval(n),F.fadeWatches.delete(t),!0):!1}function Ln(){let e=B;return e.$PIXI=e.PIXI||null,e.$app=F.app||null,e.$renderer=F.renderer||null,e.$stage=F.stage||null,e.$ticker=F.ticker||null,e.__MG_PIXI__={PIXI:e.$PIXI,app:e.$app,renderer:e.$renderer,stage:e.$stage,ticker:e.$ticker,ready:F.ready},e.__MG_PIXI__}function Oe(){if(!F.ready)throw new Error("MGPixi: call MGPixi.init() first")}async function es(e=15e3){if(F.ready)return Ln(),!0;if(await ne.init(e),F.app=ne.app(),F.ticker=ne.ticker(),F.renderer=ne.renderer(),F.stage=ne.stage(),!F.app||!F.ticker)throw new Error("MGPixi: PIXI app/ticker not found");return F.ready=!0,Ln(),!0}var Wt={init:es,ready:()=>F.ready,expose:Ln,get app(){return F.app},get renderer(){return F.renderer},get stage(){return F.stage},get ticker(){return F.ticker},get PIXI(){return B.PIXI||null},defineTileSet:Va,deleteTileSet:ja,listTileSets:Fa,highlightPulse:cr,stopHighlight:On,clearHighlights:lr,highlightMutation:dr,watchMutation:Ka,stopWatchMutation:qa,inspectTile:Ya,fadeSpecies:mr,clearSpeciesFade:pr,clearFades:In,watchFadeSpecies:Qa,stopWatchFadeSpecies:Za};var gr=B??window,ts={sfx:"soundEffectsVolume",music:"musicVolume",ambience:"ambienceVolume"},ns={sfx:"soundEffectsVolumeAtom",music:"musicVolumeAtom",ambience:"ambienceVolumeAtom"},st=.001,lt=.2,Bt=null,$={ready:!1,baseUrl:null,urls:{ambience:new Map,music:new Map},sfx:{mp3Url:null,atlasUrl:null,atlas:null,groups:new Map,buffer:null},tracks:{ambience:null,music:null},ctx:null};function dt(){if(!$.ready)throw new Error("MGAudio not ready yet")}function fr(e,t=NaN){try{let n=localStorage.getItem(e);if(n==null)return t;let o;try{o=JSON.parse(n)}catch{o=n}if(typeof o=="number"&&Number.isFinite(o))return o;if(typeof o=="string"){let r=parseFloat(o);if(Number.isFinite(r))return r}}catch{}return t}function ct(e){let t=ts[e],n=ns[e];if(!t)return{atom:lt,vol100:Vt(lt)};let o=fr(t,NaN);if(Number.isFinite(o)){let i=ue(o,0,1);return{atom:i,vol100:Vt(i)}}if(n){let i=fr(n,NaN);if(Number.isFinite(i)){let a=ue(i,0,1);return{atom:a,vol100:Vt(a)}}}let r=lt;return{atom:r,vol100:Vt(r)}}function os(e){let t=Number(e);if(!Number.isFinite(t))return null;if(t<=0)return 0;let o=(ue(t,1,100)-1)/99;return st+o*(lt-st)}function Vt(e){let t=ue(Number(e),0,1);if(t<=st)return 0;let n=(t-st)/(lt-st);return Math.round(1+n*99)}function br(e,t){if(t==null)return ct(e).atom;let n=os(t);return n===null?ct(e).atom:Jo(n)}async function hr(){let e=$.ctx;if(e)return e;let t=gr.AudioContext||gr.webkitAudioContext;if(!t)throw new Error("WebAudio not supported");let n=new t;return $.ctx=n,n}async function yr(){if($.ctx&&$.ctx.state==="suspended")try{await $.ctx.resume()}catch{}}function rs(e){let t=new Map,n=(o,r)=>{t.has(o)||t.set(o,[]),t.get(o).push(r)};for(let o of Object.keys(e||{})){let r=/^(.*)_([A-Z])$/.exec(o);r?.[1]?n(r[1],o):n(o,o)}for(let[o,r]of Array.from(t.entries()))r.sort((i,a)=>i.localeCompare(a)),t.set(o,r);$.sfx.groups=t}function is(e){let t=$.sfx.atlas;if(!t)throw new Error("SFX atlas not loaded");if(t[e])return e;let n=$.sfx.groups.get(e);if(n?.length)return n[Math.random()*n.length|0];throw new Error(`Unknown sfx/group: ${e}`)}async function as(){if($.sfx.buffer)return $.sfx.buffer;if(!$.sfx.mp3Url)throw new Error("SFX mp3 url missing");let e=await hr();await yr();let n=await(await Pt($.sfx.mp3Url)).arrayBuffer(),o=await new Promise((r,i)=>{let a=e.decodeAudioData(n,r,i);a?.then&&a.then(r,i)});return $.sfx.buffer=o,o}async function ss(e,t={}){if(!$.ready)throw new Error("MGAudio not ready yet");let n=String(e||"").trim();if(!n)throw new Error("Missing sfx name");let o=is(n),r=$.sfx.atlas[o];if(!r)throw new Error(`Missing segment for sfx: ${o}`);let i=await hr();await yr();let a=await as(),s=Math.max(0,+r.start||0),l=Math.max(s,+r.end||s),u=Math.max(.01,l-s),d=br("sfx",t.volume),c=i.createGain();c.gain.value=d,c.connect(i.destination);let p=i.createBufferSource();return p.buffer=a,p.connect(c),p.start(0,s,u),{name:o,source:p,start:s,end:l,duration:u,volume:d}}function xr(e){if(e!=="music"&&e!=="ambience")return!1;let t=$.tracks[e];if(t){try{t.pause()}catch{}try{t.src=""}catch{}}return $.tracks[e]=null,!0}function ls(e,t,n={}){if(!$.ready)throw new Error("MGAudio not ready yet");if(e!=="music"&&e!=="ambience")throw new Error(`Invalid category: ${e}`);let o=$.urls[e].get(t);if(!o)throw new Error(`Unknown ${e}: ${t}`);xr(e);let r=new Audio(o);return r.loop=!!n.loop,r.volume=br(e,n.volume),r.preload="auto",r.play().catch(()=>{}),$.tracks[e]=r,r}async function cs(e,t,n={}){let o=String(e||"").trim(),r=String(t||"").trim();if(!o||!r)throw new Error("play(category, asset) missing args");if(o==="sfx")return ss(r,n);if(o==="music"||o==="ambience")return ls(o,r,n);throw new Error(`Unknown category: ${o}`)}function ds(e,t={}){let n=String(e||"").trim();return n==="music"||n==="ambience"?Array.from($.urls[n].keys()).sort():n==="sfx"?$.sfx.atlas?t.groups?Array.from($.sfx.groups.keys()).sort():Object.keys($.sfx.atlas).sort():[]:[]}function us(){return $.tracks.music&&($.tracks.music.volume=ct("music").atom),$.tracks.ambience&&($.tracks.ambience.volume=ct("ambience").atom),!0}function ps(){return dt(),["sfx","music","ambience"]}function ms(){return dt(),Array.from($.sfx.groups.keys()).sort((e,t)=>e.localeCompare(t))}function gs(e,t){dt();let n=String(e||"").trim().toLowerCase(),o=String(t||"").trim();if(!o||n!=="music"&&n!=="ambience")return!1;let r=$.urls[n],i=o.toLowerCase();for(let a of r.keys())if(a.toLowerCase()===i)return!0;return!1}function fs(e){dt();let t=String(e||"").trim();if(!t)return!1;let n=t.toLowerCase();for(let o of $.sfx.groups.keys())if(o.toLowerCase()===n)return!0;return!1}function bs(e,t){dt();let n=String(e||"").trim().toLowerCase(),o=String(t||"").trim();if(!o)throw new Error("getTrackUrl(category, name) missing name");if(n!=="music"&&n!=="ambience")throw new Error(`Invalid category: ${e}`);let r=$.urls[n],i=o.toLowerCase();for(let[a,s]of r.entries())if(a.toLowerCase()===i)return s;return null}async function hs(){return $.ready?!0:Bt||(Bt=(async()=>{$.baseUrl=await me.base();let e=await le.load($.baseUrl),t=le.getBundle(e,"audio");if(!t)throw new Error("No audio bundle in manifest");for(let n of t.assets||[])for(let o of n.src||[]){if(typeof o!="string")continue;let r=/^audio\/(ambience|music)\/(.+)\.mp3$/i.exec(o);if(r){let i=r[1].toLowerCase(),a=r[2];$.urls[i].set(a,ie($.baseUrl,o));continue}/^audio\/sfx\/sfx\.mp3$/i.test(o)&&($.sfx.mp3Url=ie($.baseUrl,o)),/^audio\/sfx\/sfx\.json$/i.test(o)&&($.sfx.atlasUrl=ie($.baseUrl,o))}if(!$.sfx.atlasUrl)throw new Error("Missing audio/sfx/sfx.json in manifest");return $.sfx.atlas=await We($.sfx.atlasUrl),rs($.sfx.atlas),$.ready=!0,!0})(),Bt)}var jt={init:hs,ready:()=>$.ready,play:cs,stop:xr,list:ds,refreshVolumes:us,categoryVolume:ct,getCategories:ps,getGroups:ms,hasTrack:gs,hasGroup:fs,getTrackUrl:bs};var _n=B?.document??document,Ft=null,X={ready:!1,baseUrl:null,byCat:new Map,byBase:new Map,overlay:null,live:new Set,defaultParent:null};function ys(){if(X.overlay)return X.overlay;let e=_n.createElement("div");return e.id="MG_COSMETIC_OVERLAY",e.style.cssText=["position:fixed","left:0","top:0","width:100vw","height:100vh","pointer-events:none","z-index:99999999"].join(";"),_n.documentElement.appendChild(e),X.overlay=e,e}function xs(){let e=X.defaultParent;if(!e)return null;try{return typeof e=="function"?e():e}catch{return null}}function Nn(e){let t=String(e||"").trim();return t?(t=t.replace(/^cosmetic\//i,""),t=t.replace(/\.png$/i,""),t):""}function vs(e,t){if(t===void 0){let i=Nn(e),a=i.indexOf("_");return a<0?{cat:"",asset:i,base:i}:{cat:i.slice(0,a),asset:i.slice(a+1),base:i}}let n=String(e||"").trim(),o=Nn(t),r=o.includes("_")?o:`${n}_${o}`;if(o.includes("_")&&!n){let i=o.indexOf("_");return{cat:o.slice(0,i),asset:o.slice(i+1),base:o}}return{cat:n,asset:o.replace(/^.+?_/,""),base:r}}function ws(){return Array.from(X.byCat.keys()).sort((e,t)=>e.localeCompare(t))}function ks(e){let t=X.byCat.get(String(e||"").trim());return t?Array.from(t.keys()).sort((n,o)=>n.localeCompare(o)):[]}function Dn(e,t){let{cat:n,asset:o,base:r}=vs(e,t),i=X.byBase.get(r);if(i)return i;let s=X.byCat.get(n)?.get(o);if(s)return s;if(!X.baseUrl)throw new Error("MGCosmetic not initialized");if(!r)throw new Error("Invalid cosmetic name");return ie(X.baseUrl,`cosmetic/${r}.png`)}function Gn(e,t,n){if(!X.ready)throw new Error("MGCosmetic not ready yet");let o,r;typeof t=="object"&&t!==null?(o=t,r=void 0):typeof t=="string"?(r=t,o=n||{}):(r=void 0,o=n||{});let i=r!==void 0?Dn(e,r):Dn(e),a=_n.createElement("img");if(a.decoding="async",a.loading="eager",a.src=i,a.alt=o.alt!=null?String(o.alt):Nn(r??e),o.className&&(a.className=String(o.className)),o.width!=null&&(a.style.width=String(o.width)),o.height!=null&&(a.style.height=String(o.height)),o.opacity!=null&&(a.style.opacity=String(o.opacity)),o.style&&typeof o.style=="object")for(let[s,l]of Object.entries(o.style))try{a.style[s]=String(l)}catch{}return a}function Ss(e,t,n){let o,r;typeof t=="object"&&t!==null?(o=t,r=void 0):typeof t=="string"?(r=t,o=n||{}):(r=void 0,o=n||{});let i=o.parent||xs()||ys(),a=r!==void 0?Gn(e,r,o):Gn(e,o);if(i===X.overlay||o.center||o.x!=null||o.y!=null||o.absolute){a.style.position="absolute",a.style.pointerEvents="none",a.style.zIndex=String(o.zIndex??999999);let l=o.scale??1,u=o.rotation??0;if(o.center)a.style.left="50%",a.style.top="50%",a.style.transform=`translate(-50%, -50%) scale(${l}) rotate(${u}rad)`;else{let d=o.x??innerWidth/2,c=o.y??innerHeight/2;a.style.left=`${d}px`,a.style.top=`${c}px`,a.style.transform=`scale(${l}) rotate(${u}rad)`,o.anchor==="center"&&(a.style.transform=`translate(-50%, -50%) scale(${l}) rotate(${u}rad)`)}}return i.appendChild(a),X.live.add(a),a.__mgDestroy=()=>{try{a.remove()}catch{}X.live.delete(a)},a}function Ts(e){return X.defaultParent=e,!0}function As(){for(let e of Array.from(X.live))e.__mgDestroy?.()}async function Cs(){return X.ready?!0:Ft||(Ft=(async()=>{X.baseUrl=await me.base();let e=await le.load(X.baseUrl),t=le.getBundle(e,"cosmetic");if(!t)throw new Error("No 'cosmetic' bundle in manifest");X.byCat.clear(),X.byBase.clear();for(let n of t.assets||[])for(let o of n.src||[]){if(typeof o!="string"||!/^cosmetic\/.+\.png$/i.test(o))continue;let i=o.split("/").pop().replace(/\.png$/i,""),a=i.indexOf("_");if(a<0)continue;let s=i.slice(0,a),l=i.slice(a+1),u=ie(X.baseUrl,o);X.byBase.set(i,u),X.byCat.has(s)||X.byCat.set(s,new Map),X.byCat.get(s).set(l,u)}return X.ready=!0,!0})(),Ft)}var zt={init:Cs,ready:()=>X.ready,categories:ws,list:ks,url:Dn,create:Gn,show:Ss,attach:Ts,clear:As};function vr(){he("MGVersion",rt),he("MGAssets",me),he("MGManifest",le),he("MGSprite",Rt),he("MGTile",ve),he("MGPixi",Wt),he("MGAudio",jt),he("MGCosmetic",zt)}async function wr(e){vr();let t=[{name:"Sprites",init:()=>Rt.init()},{name:"TileObjectSystem",init:()=>ve.init()},{name:"Pixi",init:()=>Wt.init()},{name:"Audio",init:()=>jt.init()},{name:"Cosmetics",init:()=>zt.init()}];await Promise.all(t.map(async n=>{e?.({status:"start",name:n.name});try{await n.init(),e?.({status:"success",name:n.name})}catch(o){console.error(`[${n.name}] failed`,o),e?.({status:"error",name:n.name,error:o})}})),console.log("[MG] Ready: MGSprite / MGAudio / MGCosmetic / MGTile / MGPixi / MGSkins"),console.log("MGPixi.inspectTile(tx, ty)"),console.log("MGTile.help()")}vr();var Wn="__ATOM_LABEL_CACHE__";function Ms(){let e=B;return e[Wn]||(e[Wn]=new Map),e[Wn]}function $t(){return B.jotaiAtomCache?.cache}function ut(e){let t=Ms(),n=t.get(e);if(n)return n;let o=$t();if(!o)return null;for(let r of o.values())if((r?.debugLabel||r?.label||"")===e)return t.set(e,r),r;return null}var Bn="__JOTAI_MIRROR_SINGLETON__";function ze(){let e=B;return e[Bn]||(e[Bn]={baseStore:null,captureInProgress:!1,captureError:null,lastCapturedVia:null,mirror:void 0,atomByLabelCache:new Map}),e[Bn]}var Ps="__JOTAI_STORE_READY__",kr=!1,Vn=new Set;function Ut(){if(!kr){kr=!0;for(let e of Vn)try{e()}catch{}try{B.dispatchEvent?.(new B.CustomEvent(Ps))}catch{}}}function Es(e){Vn.add(e);let t=jn();if(t.via&&!t.polyfill)try{e()}catch{}return()=>{Vn.delete(e)}}async function Kt(e={}){let{timeoutMs:t=6e3,intervalMs:n=50}=e,o=jn();if(!(o.via&&!o.polyfill))return new Promise((r,i)=>{let a=!1,s=Es(()=>{a||(a=!0,s(),r())}),l=Date.now();(async()=>{for(;!a&&Date.now()-l<t;){let d=jn();if(d.via&&!d.polyfill){if(a)return;a=!0,s(),r();return}await qt(n)}a||(a=!0,s(),i(new Error("Store not captured within timeout")))})()})}var qt=e=>new Promise(t=>setTimeout(t,e));function Sr(){try{B.dispatchEvent?.(new B.Event("visibilitychange"))}catch{}}function Tr(){let e=ze(),t=B.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t?.renderers?.size)return null;for(let[n]of t.renderers){let o=t.getFiberRoots?.(n);if(o)for(let r of o){let i=new Set,a=[r.current];for(;a.length;){let s=a.pop();if(!s||i.has(s))continue;i.add(s);let l=s?.pendingProps?.value;if(l&&typeof l.get=="function"&&typeof l.set=="function"&&typeof l.sub=="function")return e.lastCapturedVia="fiber",l;s.child&&a.push(s.child),s.sibling&&a.push(s.sibling),s.alternate&&a.push(s.alternate)}}}return null}function Ar(){return{get:()=>{throw new Error("Store not captured: get unavailable")},set:()=>{throw new Error("Store not captured: set unavailable")},sub:()=>()=>{},__polyfill:!0}}async function Is(e=5e3){let t=$t();if(!t)throw console.warn("[jotai-bridge] jotaiAtomCache.cache not found"),new Error("jotaiAtomCache.cache not found");let n=ze(),o=null,r=null,i=[],a=()=>{for(let l of i)try{l.__origWrite&&(l.write=l.__origWrite,delete l.__origWrite)}catch{}};for(let l of t.values()){if(!l||typeof l.write!="function"||l.__origWrite)continue;let u=l.write;l.__origWrite=u,l.write=function(d,c,...p){return r||(o=d,r=c,a()),u.call(this,d,c,...p)},i.push(l)}Sr();let s=Date.now();for(;!r&&Date.now()-s<e;)await qt(50);return r?(n.lastCapturedVia="write",{get:l=>o(l),set:(l,u)=>r(l,u),sub:(l,u)=>{let d;try{d=o(l)}catch{}let c=setInterval(()=>{let p;try{p=o(l)}catch{return}if(p!==d){d=p;try{u()}catch{}}},100);return()=>clearInterval(c)}}):(a(),n.lastCapturedVia="polyfill",console.warn("[jotai-bridge] write-patch: timeout \u2192 polyfill"),Ar())}async function Ls(e=2e3){let t=ze();Sr();let n=Date.now();for(;Date.now()-n<e;){let o=Tr();if(o)return o;await qt(50)}return t.lastCapturedVia="polyfill",Ar()}async function Hs(){let e=ze();if(e.baseStore&&!e.baseStore.__polyfill)return Ut(),e.baseStore;if(e.captureInProgress){let t=Date.now(),n=2500;for(;!e.baseStore&&Date.now()-t<n;)await qt(25);if(e.baseStore)return e.baseStore.__polyfill||Ut(),e.baseStore}e.captureInProgress=!0;try{let t=Tr();if(t)return e.baseStore=t,Ut(),t;try{let o=await Is(5e3);return e.baseStore=o,o.__polyfill||Ut(),o}catch(o){e.captureError=o}let n=await Ls();return e.baseStore=n,n}catch(t){throw e.captureError=t,t}finally{e.captureInProgress=!1}}function jn(){let e=ze();return{via:e.lastCapturedVia,polyfill:!!e.baseStore?.__polyfill,error:e.captureError}}async function Rs(){let e=await Hs(),t=new WeakMap,n=async r=>{let i=t.get(r);if(i)return i;i={last:void 0,has:!1,subs:new Set},t.set(r,i);try{i.last=e.get(r),i.has=!0}catch{}let a=e.sub(r,()=>{let s;try{s=e.get(r)}catch{return}let l=i.last,u=!Object.is(s,l)||!i.has;if(i.last=s,i.has=!0,u)for(let d of i.subs)try{d(s,l)}catch{}});return i.unsubUpstream=a,i};return{async get(r){let i=await n(r);if(i.has)return i.last;let a=e.get(r);return i.last=a,i.has=!0,a},async set(r,i){await e.set(r,i);let a=await n(r);a.last=i,a.has=!0},async sub(r,i){let a=await n(r);if(a.subs.add(i),a.has)try{i(a.last,a.last)}catch{}return()=>{a.subs.delete(i)}},getShadow(r){return t.get(r)?.last},hasShadow(r){return!!t.get(r)?.has},async ensureWatch(r){await n(r)},async asStore(){return{get:r=>this.get(r),set:(r,i)=>this.set(r,i),sub:(r,i)=>{let a=null;return this.sub(r,()=>i()).then(s=>a=s),()=>a?.()}}}}}async function pt(){let e=ze();return e.mirror||(e.mirror=await Rs()),e.mirror}var ae={async select(e){let t=await pt(),n=ut(e);if(!n)throw new Error(`[Store] Atom not found: "${e}"`);return t.get(n)},async set(e,t){let n=await pt(),o=ut(e);if(!o)throw new Error(`[Store] Atom not found: "${e}"`);await n.set(o,t)},async subscribe(e,t){let n=await pt(),o=ut(e);if(!o)throw new Error(`[Store] Atom not found: "${e}"`);return n.sub(o,r=>{try{t(r)}catch{}})},async subscribeImmediate(e,t){let n=await ae.select(e);try{t(n)}catch{}return ae.subscribe(e,t)}};async function Fn(){await pt()}function mt(e){return e?Array.isArray(e)?e.slice():e.split(".").map(t=>t.match(/^\d+$/)?Number(t):t):[]}function Ae(e,t){let n=mt(t),o=e;for(let r of n){if(o==null)return;o=o[r]}return o}function zn(e,t,n){let o=mt(t);if(!o.length)return n;let r=Array.isArray(e)?[...e]:{...e??{}},i=r;for(let a=0;a<o.length-1;a++){let s=o[a],l=i[s],u=typeof l=="object"&&l!==null?Array.isArray(l)?[...l]:{...l}:{};i[s]=u,i=u}return i[o[o.length-1]]=n,r}function Cr(e,t){let n={};for(let o of t)n[o]=o.includes(".")?Ae(e,o):e?.[o];try{return JSON.stringify(n)}catch{return String(n)}}function $n(e,t,n){let o=n.mode??"auto";function r(u){let d=t?Ae(u,t):u,c=new Map;if(d==null)return{signatures:c,keys:[]};let p=Array.isArray(d);if((o==="array"||o==="auto"&&p)&&p)for(let f=0;f<d.length;f++){let b=d[f],h=n.key?n.key(b,f,u):f,y=n.sig?n.sig(b,f,u):n.fields?Cr(b,n.fields):JSON.stringify(b);c.set(h,y)}else for(let[f,b]of Object.entries(d)){let h=n.key?n.key(b,f,u):f,y=n.sig?n.sig(b,f,u):n.fields?Cr(b,n.fields):JSON.stringify(b);c.set(h,y)}return{signatures:c,keys:Array.from(c.keys())}}function i(u,d){if(u===d)return!0;if(!u||!d||u.size!==d.size)return!1;for(let[c,p]of u)if(d.get(c)!==p)return!1;return!0}async function a(u){let d=null;return ae.subscribeImmediate(e,c=>{let p=t?Ae(c,t):c,{signatures:m}=r(p);if(!i(d,m)){let f=new Set([...d?Array.from(d.keys()):[],...Array.from(m.keys())]),b=[];for(let h of f){let y=d?.get(h)??"__NONE__",k=m.get(h)??"__NONE__";y!==k&&b.push(h)}d=m,u({value:p,changedKeys:b})}})}async function s(u,d){return a(({value:c,changedKeys:p})=>{p.includes(u)&&d({value:c})})}async function l(u,d){let c=new Set(u);return a(({value:p,changedKeys:m})=>{let f=m.filter(b=>c.has(b));f.length&&d({value:p,changedKeys:f})})}return{sub:a,subKey:s,subKeys:l}}var $e=new Map;function Os(e,t){let n=$e.get(e);if(n)try{n()}catch{}return $e.set(e,t),()=>{try{t()}catch{}$e.get(e)===t&&$e.delete(e)}}function Y(e,t={}){let{path:n,write:o="replace"}=t,r=n?`${e}:${mt(n).join(".")}`:e;async function i(){let c=await ae.select(e);return n?Ae(c,n):c}async function a(c){if(typeof o=="function"){let f=await ae.select(e),b=o(c,f);return ae.set(e,b)}let p=await ae.select(e),m=n?zn(p,n,c):c;return o==="merge-shallow"&&!n&&p&&typeof p=="object"&&typeof c=="object"?ae.set(e,{...p,...c}):ae.set(e,m)}async function s(c){let p=await i(),m=c(p);return await a(m),m}async function l(c,p,m){let f,b=y=>{let k=n?Ae(y,n):y;if(typeof f>"u"||!m(f,k)){let S=f;f=k,p(k,S)}},h=c?await ae.subscribeImmediate(e,b):await ae.subscribe(e,b);return Os(r,h)}function u(){let c=$e.get(r);if(c){try{c()}catch{}$e.delete(r)}}function d(c){return $n(e,c?.path??n,c)}return{label:r,get:i,set:a,update:s,onChange:(c,p=Object.is)=>l(!1,c,p),onChangeNow:(c,p=Object.is)=>l(!0,c,p),asSignature:d,stopOnChange:u}}function g(e){return Y(e)}var _s=g("positionAtom"),Ns=g("lastPositionInMyGardenAtom"),Ds=g("playerDirectionAtom"),Gs=g("stateAtom"),Ws=g("quinoaDataAtom"),Bs=g("currentTimeAtom"),Vs=g("actionAtom"),js=g("isPressAndHoldActionAtom"),Fs=g("mapAtom"),zs=g("tileSizeAtom"),$s=Y("mapAtom",{path:"cols"}),Us=Y("mapAtom",{path:"rows"}),Ks=Y("mapAtom",{path:"spawnTiles"}),qs=Y("mapAtom",{path:"locations.seedShop.spawnTileIdx"}),Js=Y("mapAtom",{path:"locations.eggShop.spawnTileIdx"}),Ys=Y("mapAtom",{path:"locations.toolShop.spawnTileIdx"}),Xs=Y("mapAtom",{path:"locations.decorShop.spawnTileIdx"}),Qs=Y("mapAtom",{path:"locations.sellCropsShop.spawnTileIdx"}),Zs=Y("mapAtom",{path:"locations.sellPetShop.spawnTileIdx"}),el=Y("mapAtom",{path:"locations.collectorsClub.spawnTileIdx"}),tl=Y("mapAtom",{path:"locations.wishingWell.spawnTileIdx"}),nl=Y("mapAtom",{path:"locations.shopsCenter.spawnTileIdx"}),ol=g("playerAtom"),rl=g("myDataAtom"),il=g("myUserSlotIdxAtom"),al=g("isSpectatingAtom"),sl=g("myCoinsCountAtom"),ll=g("numPlayersAtom"),cl=Y("playerAtom",{path:"id"}),dl=g("userSlotsAtom"),ul=g("filteredUserSlotsAtom"),pl=g("myUserSlotAtom"),ml=g("spectatorsAtom"),gl=Y("stateAtom",{path:"child"}),fl=Y("stateAtom",{path:"child.data"}),bl=Y("stateAtom",{path:"child.data.shops"}),hl=Y("stateAtom",{path:"child.data.userSlots"}),yl=Y("stateAtom",{path:"data.players"}),xl=g("myInventoryAtom"),vl=g("myInventoryItemsAtom"),wl=g("isMyInventoryAtMaxLengthAtom"),kl=g("myFavoritedItemIdsAtom"),Sl=g("myCropInventoryAtom"),Tl=g("mySeedInventoryAtom"),Al=g("myToolInventoryAtom"),Cl=g("myEggInventoryAtom"),Ml=g("myDecorInventoryAtom"),Pl=g("myPetInventoryAtom"),El=Y("myInventoryAtom",{path:"favoritedItemIds"}),Il=g("itemTypeFiltersAtom"),Ll=g("myItemStoragesAtom"),Hl=g("myPetHutchStoragesAtom"),Rl=g("myPetHutchItemsAtom"),Ol=g("myPetHutchPetItemsAtom"),_l=g("myNumPetHutchItemsAtom"),Nl=g("myValidatedSelectedItemIndexAtom"),Dl=g("isSelectedItemAtomSuspended"),Gl=g("mySelectedItemAtom"),Wl=g("mySelectedItemNameAtom"),Bl=g("mySelectedItemRotationsAtom"),Vl=g("mySelectedItemRotationAtom"),jl=g("setSelectedIndexToEndAtom"),Fl=g("myPossiblyNoLongerValidSelectedItemIndexAtom"),zl=g("myCurrentGlobalTileIndexAtom"),$l=g("myCurrentGardenTileAtom"),Ul=g("myCurrentGardenObjectAtom"),Kl=g("myOwnCurrentGardenObjectAtom"),ql=g("myOwnCurrentDirtTileIndexAtom"),Jl=g("myCurrentGardenObjectNameAtom"),Yl=g("isInMyGardenAtom"),Xl=g("myGardenBoardwalkTileObjectsAtom"),Ql=Y("myDataAtom",{path:"garden"}),Zl=Y("myDataAtom",{path:"garden.tileObjects"}),ec=Y("myOwnCurrentGardenObjectAtom",{path:"objectType"}),tc=g("myCurrentStablePlantObjectInfoAtom"),nc=g("myCurrentSortedGrowSlotIndicesAtom"),oc=g("myCurrentGrowSlotIndexAtom"),rc=g("myCurrentGrowSlotsAtom"),ic=g("myCurrentGrowSlotAtom"),ac=g("secondsUntilCurrentGrowSlotMaturesAtom"),sc=g("isCurrentGrowSlotMatureAtom"),lc=g("numGrowSlotsAtom"),cc=g("myCurrentEggAtom"),dc=g("petInfosAtom"),uc=g("myPetInfosAtom"),pc=g("myPetSlotInfosAtom"),mc=g("myPrimitivePetSlotsAtom"),gc=g("myNonPrimitivePetSlotsAtom"),fc=g("expandedPetSlotIdAtom"),bc=g("myPetsProgressAtom"),hc=g("myActiveCropMutationPetsAtom"),yc=g("totalPetSellPriceAtom"),xc=g("selectedPetHasNewVariantsAtom"),vc=g("shopsAtom"),wc=g("myShopPurchasesAtom"),kc=g("seedShopAtom"),Sc=g("seedShopInventoryAtom"),Tc=g("seedShopRestockSecondsAtom"),Ac=g("seedShopCustomRestockInventoryAtom"),Cc=g("eggShopAtom"),Mc=g("eggShopInventoryAtom"),Pc=g("eggShopRestockSecondsAtom"),Ec=g("eggShopCustomRestockInventoryAtom"),Ic=g("toolShopAtom"),Lc=g("toolShopInventoryAtom"),Hc=g("toolShopRestockSecondsAtom"),Rc=g("toolShopCustomRestockInventoryAtom"),Oc=g("decorShopAtom"),_c=g("decorShopInventoryAtom"),Nc=g("decorShopRestockSecondsAtom"),Dc=g("decorShopCustomRestockInventoryAtom"),Gc=g("isDecorShopAboutToRestockAtom"),Wc=Y("shopsAtom",{path:"seed"}),Bc=Y("shopsAtom",{path:"tool"}),Vc=Y("shopsAtom",{path:"egg"}),jc=Y("shopsAtom",{path:"decor"}),Fc=g("myCropItemsAtom"),zc=g("myCropItemsToSellAtom"),$c=g("totalCropSellPriceAtom"),Uc=g("friendBonusMultiplierAtom"),Kc=g("myJournalAtom"),qc=g("myCropJournalAtom"),Jc=g("myPetJournalAtom"),Yc=g("myStatsAtom"),Xc=g("myActivityLogsAtom"),Qc=g("newLogsAtom"),Zc=g("hasNewLogsAtom"),ed=g("newCropLogsFromSellingAtom"),td=g("hasNewCropLogsFromSellingAtom"),nd=g("myCompletedTasksAtom"),od=g("myActiveTasksAtom"),rd=g("isWelcomeToastVisibleAtom"),id=g("shouldCloseWelcomeToastAtom"),ad=g("isInitialMoveToDirtPatchToastVisibleAtom"),sd=g("isFirstPlantSeedActiveAtom"),ld=g("isThirdSeedPlantActiveAtom"),cd=g("isThirdSeedPlantCompletedAtom"),dd=g("isDemoTouchpadVisibleAtom"),ud=g("areShopAnnouncersEnabledAtom"),pd=g("arePresentablesEnabledAtom"),md=g("isEmptyDirtTileHighlightedAtom"),gd=g("isPlantTileHighlightedAtom"),fd=g("isItemHiglightedInHotbarAtom"),bd=g("isItemHighlightedInModalAtom"),hd=g("isMyGardenButtonHighlightedAtom"),yd=g("isSellButtonHighlightedAtom"),xd=g("isShopButtonHighlightedAtom"),vd=g("isInstaGrowButtonHiddenAtom"),wd=g("isActionButtonHighlightedAtom"),kd=g("isGardenItemInfoCardHiddenAtom"),Sd=g("isSeedPurchaseButtonHighlightedAtom"),Td=g("isFirstSeedPurchaseActiveAtom"),Ad=g("isFirstCropHarvestActiveAtom"),Cd=g("isWeatherStatusHighlightedAtom"),Md=g("weatherAtom"),Pd=g("activeModalAtom"),Ed=g("hotkeyBeingPressedAtom"),Id=g("avatarTriggerAnimationAtom"),Ld=g("avatarDataAtom"),Hd=g("emoteDataAtom"),Rd=g("otherUserSlotsAtom"),Od=g("otherPlayerPositionsAtom"),_d=g("otherPlayerSelectedItemsAtom"),Nd=g("otherPlayerLastActionsAtom"),Dd=g("traderBunnyPlayerId"),Gd=g("npcPlayersAtom"),Wd=g("npcQuinoaUsersAtom"),Bd=g("numNpcAvatarsAtom"),Vd=g("traderBunnyEmoteTimeoutAtom"),jd=g("traderBunnyEmoteAtom"),Fd=g("unsortedLeaderboardAtom"),zd=g("currentGardenNameAtom"),$d=g("quinoaEngineAtom"),Ud=g("quinoaInitializationErrorAtom"),Kd=g("avgPingAtom"),qd=g("serverClientTimeOffsetAtom"),Jd=g("isEstablishingShotRunningAtom"),Yd=g("isEstablishingShotCompleteAtom");function Mr(e){e.logStep("WebSocket","Capturing WebSocket...");let t=null;return t=At(n=>{n.ws&&(e.logStep("WebSocket","WebSocket captured","success"),t?.(),t=null)},{intervalMs:250}),qo({debug:!1}),()=>{t?.(),t=null}}async function Pr(e){e.logStep("Atoms","Prewarming Jotai store...");try{await Fn(),await Kt({timeoutMs:8e3,intervalMs:50}),e.logStep("Atoms","Jotai store ready","success")}catch(t){e.logStep("Atoms","Jotai store not captured yet","error"),console.warn("[Bootstrap] Jotai store wait failed",t)}}function Er(e){e.logStep("HUD","Loading HUD preferences...");let t=gn(),n=mn({hostId:"gemini-hud-root",initialWidth:t.width,initialOpen:t.isOpen,onWidthChange:o=>Ge("width",o),onOpenChange:o=>Ge("isOpen",o),themes:Te,initialTheme:t.theme,onThemeChange:o=>Ge("theme",o),buildSections:o=>an({applyTheme:o.applyTheme,initialTheme:o.initialTheme,getCurrentTheme:o.getCurrentTheme}),initialTab:t.activeTab,onTabChange:o=>Ge("activeTab",o)});return e.logStep("HUD","HUD ready","success"),n}async function Ir(e){e.log("HUD ready. Loading modules in the background...","success"),e.setSubtitle("Activating Gemini modules..."),await wr(t=>{t.status==="start"?e.logStep(t.name,`Loading ${t.name}...`):t.status==="success"?e.logStep(t.name,`${t.name} ready`,"success"):e.logStep(t.name,`${t.name} encountered an issue.`,"error")})}(async function(){"use strict";let e=qn({title:"Gemini is loading",subtitle:"Connecting and preparing modules..."}),t=null,n=null;try{t=Mr(e),await Pr(e),n=Er(e),await Ir(e),e.succeed("Gemini is ready!")}catch(o){e.fail("Failed to initialize the mod.",o)}finally{t?.()}if(n){let o=n;fn({onClick:()=>o.setOpen(!0)})}})();})();
