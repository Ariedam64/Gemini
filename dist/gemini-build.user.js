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
"use strict";(()=>{var pi=Object.defineProperty;var xc=(e,t,n)=>t in e?pi(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Sc=(e,t)=>()=>(e&&(t=e(e=0)),t);var bn=(e,t)=>{for(var n in t)pi(e,n,{get:t[n],enumerable:!0})};var se=(e,t,n)=>xc(e,typeof t!="symbol"?t+"":t,n);var Gi={};bn(Gi,{clamp:()=>Ae,clamp01:()=>xr,sleep:()=>je,tryDo:()=>Te,waitWithTimeout:()=>In});async function In(e,t,n){let o=performance.now();for(;performance.now()-o<t;){let r=await Promise.race([e,je(50).then(()=>null)]);if(r!==null)return r}throw new Error(`${n} timeout`)}var je,Te,Ae,xr,Fe=Sc(()=>{"use strict";je=e=>new Promise(t=>setTimeout(t,e)),Te=e=>{try{return e()}catch{return}},Ae=(e,t,n)=>Math.max(t,Math.min(n,e)),xr=e=>Ae(e,0,1)});function w(e,t=null,...n){let o=document.createElement(e);for(let[r,i]of Object.entries(t||{}))i!=null&&(r==="style"?typeof i=="string"?o.setAttribute("style",i):typeof i=="object"&&Object.assign(o.style,i):r.startsWith("on")&&typeof i=="function"?o[r.toLowerCase()]=i:r in o?o[r]=i:o.setAttribute(r,String(i)));for(let r of n)r==null||r===!1||o.appendChild(typeof r=="string"||typeof r=="number"?document.createTextNode(String(r)):r);return o}var hn="https://i.imgur.com/k5WuC32.png",mi="gemini-loader-style",Ye="gemini-loader",gi=80;function wc(){if(document.getElementById(mi))return;let e=document.createElement("style");e.id=mi,e.textContent=`
    /* ===== Loader Variables ===== */
    #${Ye} {
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
    #${Ye} {
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

    #${Ye}.gemini-loader--error .gemini-loader__actions {
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
    #${Ye}.gemini-loader--closing {
      animation: gemini-loader-fade-out 0.4s ease forwards;
      pointer-events: none;
    }

    #${Ye}.gemini-loader--error .gemini-loader__spinner {
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
      #${Ye} { padding: 16px 10px; }
      .gemini-loader__card { padding: 16px; }
      .gemini-loader__header { gap: 12px; }
      .gemini-loader__spinner { width: 42px; height: 42px; }
      .gemini-loader__spinner-icon { width: 56px; height: 56px; }
      .gemini-loader__title { font-size: 16px; }
    }
  `,document.head.appendChild(e)}function yn(e,t,n){let o=w("div",{className:`gemini-loader__log ${n}`},w("div",{className:"gemini-loader__dot"}),w("div",{textContent:t}));for(e.appendChild(o);e.childElementCount>gi;)e.firstElementChild?.remove();e.scrollTop=e.scrollHeight}function Tc(){return new Promise(e=>{if(typeof GM_xmlhttpRequest>"u"){e(hn);return}GM_xmlhttpRequest({method:"GET",url:hn,responseType:"blob",onload:t=>{let n=t.response,o=new FileReader;o.onloadend=()=>e(o.result),o.onerror=()=>e(hn),o.readAsDataURL(n)},onerror:()=>e(hn)})})}function gr(e={}){let t=Number.isFinite(e.blurPx)?Math.max(4,Number(e.blurPx)):14;wc();let n=w("div",{className:"gemini-loader__subtitle",textContent:e.subtitle??"Initializing the mod..."}),o=w("div",{className:"gemini-loader__logs"}),r=w("img",{className:"gemini-loader__spinner-icon",alt:"Gemini"}),i=w("div",{className:"gemini-loader__spinner"},r);Tc().then(b=>{r.src=b});let a=w("div",{className:"gemini-loader__card"},w("div",{className:"gemini-loader__header"},i,w("div",{className:"gemini-loader__titles"},w("div",{className:"gemini-loader__title",textContent:e.title??"Gemini is loading"}),n)),o),s=w("div",{id:Ye},a);(document.body||document.documentElement).appendChild(s);let u=w("div",{className:"gemini-loader__actions"},w("button",{className:"gemini-loader__button",textContent:"Close loader",onclick:()=>s.remove()}));a.appendChild(u),s.style.setProperty("--loader-blur",`${t}px`);let d=b=>{n.textContent=b},l=new Map,c=(b,h)=>{b.className=`gemini-loader__log ${h}`};return{log:(b,h="info")=>yn(o,b,h),logStep:(b,h,S="info")=>{let v=String(b||"").trim();if(!v){yn(o,h,S);return}let y=l.get(v);if(y){y.el.lastElementChild&&(y.el.lastElementChild.textContent=h),y.tone!==S&&(c(y.el,S),y.tone=S);return}let k=w("div",{className:`gemini-loader__log ${S}`},w("div",{className:"gemini-loader__dot"}),w("div",{textContent:h}));for(l.set(v,{el:k,tone:S}),o.appendChild(k);o.childElementCount>gi;){let T=o.firstElementChild;if(!T)break;let A=Array.from(l.entries()).find(([,I])=>I.el===T)?.[0];A&&l.delete(A),T.remove()}o.scrollTop=o.scrollHeight},setSubtitle:d,succeed:(b,h=600)=>{b&&yn(o,b,"success"),s.classList.add("gemini-loader--closing"),setTimeout(()=>s.remove(),h)},fail:(b,h)=>{yn(o,b,"error"),d("Something went wrong. Check the console for details."),s.classList.add("gemini-loader--error"),console.error("[Gemini loader]",b,h)}}}function fi(e,t,n){let o=w("div",{className:"lg-pill",id:"pill"}),r=e.map(l=>{let c=w("button",{className:"lg-tab"},l.label);return c.setAttribute("data-target",l.id),c}),i=w("div",{className:"lg-tabs",id:"lg-tabs-row"},o,...r),a=i;i.addEventListener("wheel",l=>{Math.abs(l.deltaY)>Math.abs(l.deltaX)&&(l.preventDefault(),i.scrollLeft+=l.deltaY)},{passive:!1});function s(l){let c=i.getBoundingClientRect(),p=r.find(k=>k.dataset.target===l)||r[0];if(!p)return;let m=p.getBoundingClientRect(),f=m.left-c.left,g=m.width;o.style.width=`${g}px`,o.style.transform=`translateX(${f}px)`;let b=i.scrollLeft,h=b,S=b+i.clientWidth,v=f-12,y=f+g+12;v<h?i.scrollTo({left:v,behavior:"smooth"}):y>S&&i.scrollTo({left:y-i.clientWidth,behavior:"smooth"})}let u=t||(e[0]?.id??"");function d(l){u=l,r.forEach(c=>c.classList.toggle("active",c.dataset.target===l)),s(l),n(l)}return r.forEach(l=>l.addEventListener("click",()=>d(l.dataset.target))),queueMicrotask(()=>s(u)),{root:a,activate:d,recalc:()=>s(u),getActive:()=>u}}var Xe=class{constructor(t){se(this,"id");se(this,"label");se(this,"container",null);se(this,"cleanupFunctions",[]);se(this,"preloadedContent",null);se(this,"preloadPromise",null);this.id=t.id,this.label=t.label}async preload(){if(this.preloadedContent||this.preloadPromise)return;let t=w("div");this.preloadPromise=(async()=>{let n=this.build(t);n instanceof Promise&&await n,this.preloadedContent=t,this.preloadPromise=null})(),await this.preloadPromise}isPreloaded(){return this.preloadedContent!==null}render(t){for(this.unmount();t.firstChild;)t.removeChild(t.firstChild);if(this.container=t,this.preloadedContent){for(;this.preloadedContent.firstChild;)t.appendChild(this.preloadedContent.firstChild);this.preloadedContent=null}else{let o=this.build(t);o instanceof Promise&&o.catch(r=>{console.error(`[Gemini] Error building section ${this.id}:`,r)})}let n=t.firstElementChild;n&&n.classList.contains("gemini-section")&&n.classList.add("active")}unmount(){this.executeCleanup(),this.container=null}createContainer(t,n){let o=n?`gemini-section ${n}`:"gemini-section";return w("section",{id:t,className:o})}addCleanup(t){this.cleanupFunctions.push(t)}createGrid(t="12px"){let n=w("div");return n.style.display="grid",n.style.gap=t,n}executeCleanup(){for(let t of this.cleanupFunctions)try{t()}catch(n){console.error(`[Gemini] Cleanup error in section ${this.id}:`,n)}this.cleanupFunctions=[]}};var Ot=class{constructor(t,n,o){se(this,"sections");se(this,"activeId",null);se(this,"container");se(this,"theme");this.sections=new Map(t.map(r=>[r.id,r])),this.container=n,this.theme=o}get ids(){return Array.from(this.sections.keys())}get all(){return Array.from(this.sections.values())}get active(){return this.activeId}activate(t){if(this.activeId!==t){if(!this.sections.has(t))throw new Error(`[Gemini] Unknown section: ${t}`);if(this.activeId&&this.sections.get(this.activeId).unmount(),this.activeId=t,this.sections.get(t).render(this.container),this.theme){let n=this.theme.getCurrentTheme();this.theme.applyTheme(n)}}}};function Dt(e,t){try{let n=JSON.stringify(t);GM_setValue(e,n)}catch(n){console.error(`[Gemini] Failed to save key "${e}" to storage:`,n)}}function $e(e,t){try{let n=GM_getValue(e);return n==null?t:typeof n=="string"?JSON.parse(n):n}catch(n){return console.error(`[Gemini] Failed to load key "${e}" from storage, using default:`,n),t}}var bi="gemini.sections";function hi(){let e=$e(bi,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function kc(e){Dt(bi,e)}async function yi(e){return hi()[e]}function vi(e,t){let n=hi();kc({...n,[e]:t})}function vn(e,t){return{...e,...t??{}}}async function xi(e){let t=await yi(e.path),n;e.migrate?n=e.migrate(t):n=t??{},n=Object.assign((d=>JSON.parse(JSON.stringify(d)))(e.defaults),n),e.sanitize&&(n=e.sanitize(n));function r(){vi(e.path,n)}function i(){return n}function a(d){n=e.sanitize?e.sanitize(d):d,r()}function s(d){let c=Object.assign((p=>JSON.parse(JSON.stringify(p)))(n),{});typeof d=="function"?d(c):Object.assign(c,d),n=e.sanitize?e.sanitize(c):c,r()}function u(){r()}return{get:i,set:a,update:s,save:u}}async function Ht(e,t){let{path:n=e,...o}=t;return xi({path:n,...o})}var Cc=0,xn=new Map;function Qe(e={},...t){let{id:n,className:o,variant:r="default",padding:i="md",interactive:a=!1,expandable:s=!1,defaultExpanded:u=!0,onExpandChange:d,mediaTop:l,title:c,subtitle:p,badge:m,actions:f,footer:g,divider:b=!1,tone:h="neutral",stateKey:S}=e,v=w("div",{className:"card",id:n,tabIndex:a?0:void 0});v.classList.add(`card--${r}`,`card--p-${i}`),a&&v.classList.add("card--interactive"),h!=="neutral"&&v.classList.add(`card--tone-${h}`),o&&v.classList.add(...o.split(" ").filter(Boolean)),s&&v.classList.add("card--expandable");let y=s?S??n??(typeof c=="string"?`title:${c}`:null):null,k=!s||u;y&&xn.has(y)&&(k=!!xn.get(y));let T=null,A=null,I=null,E=null,R=null,L=n?`${n}-collapse`:`card-collapse-${++Cc}`,$=()=>{if(E!==null&&(cancelAnimationFrame(E),E=null),R){let G=R;R=null,G()}},ne=(G,H)=>{if(!I)return;$();let C=I;if(C.setAttribute("aria-hidden",String(!G)),!H){C.classList.remove("card-collapse--animating"),C.style.display=G?"":"none",C.style.height="",C.style.opacity="";return}if(C.classList.add("card-collapse--animating"),C.style.display="",G){C.style.height="auto";let j=C.scrollHeight;if(!j){C.classList.remove("card-collapse--animating"),C.style.display="",C.style.height="",C.style.opacity="";return}C.style.height="0px",C.style.opacity="0",C.offsetHeight,E=requestAnimationFrame(()=>{E=null,C.style.height=`${j}px`,C.style.opacity="1"})}else{let j=C.scrollHeight;if(!j){C.classList.remove("card-collapse--animating"),C.style.display="none",C.style.height="",C.style.opacity="";return}C.style.height=`${j}px`,C.style.opacity="1",C.offsetHeight,E=requestAnimationFrame(()=>{E=null,C.style.height="0px",C.style.opacity="0"})}let O=()=>{C.classList.remove("card-collapse--animating"),C.style.height="",G||(C.style.display="none"),C.style.opacity=""},D=null,_=j=>{j.target===C&&(D!==null&&(clearTimeout(D),D=null),C.removeEventListener("transitionend",_),C.removeEventListener("transitioncancel",_),R=null,O())};R=()=>{D!==null&&(clearTimeout(D),D=null),C.removeEventListener("transitionend",_),C.removeEventListener("transitioncancel",_),R=null,O()},C.addEventListener("transitionend",_),C.addEventListener("transitioncancel",_),D=window.setTimeout(()=>{R?.()},420)};function K(G){let H=document.createElementNS("http://www.w3.org/2000/svg","svg");return H.setAttribute("viewBox","0 0 24 24"),H.setAttribute("width","16"),H.setAttribute("height","16"),H.innerHTML=G==="up"?'<path d="M7 14l5-5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>':'<path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',H}function Y(G,H=!0,C=!0){k=G,v.classList.toggle("card--collapsed",!k),v.classList.toggle("card--expanded",k),T&&(T.dataset.expanded=String(k),T.setAttribute("aria-expanded",String(k))),A&&(A.setAttribute("aria-expanded",String(k)),A.classList.toggle("card-toggle--collapsed",!k),A.setAttribute("aria-label",k?"Replier le contenu":"Deplier le contenu"),A.replaceChildren(K(k?"up":"down"))),s?ne(k,C):I&&(I.style.display="",I.style.height="",I.style.opacity="",I.setAttribute("aria-hidden","false")),H&&d&&d(k),y&&xn.set(y,k)}if(l){let G=w("div",{className:"card-media"});G.append(l),v.appendChild(G)}let ae=!!(c||p||m||f&&f.length||s);if(ae){T=w("div",{className:"card-header"});let G=w("div",{className:"card-headline",style:"min-width:0;display:flex;flex-direction:column;gap:2px;"});if(c){let O=w("h3",{className:"card-title",style:"margin:0;font-size:15px;font-weight:700;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:8px;"},c);m&&O.append(typeof m=="string"?w("span",{className:"badge"},m):m),G.appendChild(O)}if(p){let O=w("div",{className:"card-subtitle",style:"opacity:.85;font-size:12px;color:color-mix(in oklab, var(--fg) 80%, #9ca3af)"},p);G.appendChild(O)}(G.childNodes.length||s)&&T.appendChild(G);let H=w("div",{className:"card-header-right",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"}),C=w("div",{className:"card-actions",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"});f?.forEach(O=>C.appendChild(O)),C.childNodes.length&&H.appendChild(C),s&&(A=w("button",{className:"card-toggle",type:"button",ariaExpanded:String(k),ariaControls:L,ariaLabel:k?"Replier le contenu":"Deplier le contenu"}),A.textContent=k?"\u25B2":"\u25BC",A.addEventListener("click",O=>{O.preventDefault(),O.stopPropagation(),Y(!k)}),H.appendChild(A),T.classList.add("card-header--expandable"),T.addEventListener("click",O=>{let D=O.target;D?.closest(".card-actions")||D?.closest(".card-toggle")||Y(!k)})),H.childNodes.length&&T.appendChild(H),v.appendChild(T)}I=w("div",{className:"card-collapse",id:L,ariaHidden:s?String(!k):"false"}),v.appendChild(I),b&&ae&&I.appendChild(w("div",{className:"card-divider"}));let N=w("div",{className:"card-body"});if(N.append(...t),I.appendChild(N),g){b&&I.appendChild(w("div",{className:"card-divider"}));let G=w("div",{className:"card-footer"});G.append(g),I.appendChild(G)}return A&&A.setAttribute("aria-controls",L),Y(k,!1,!1),y&&xn.set(y,k),v}var Sn=!1,wn=new Set,Ee=e=>{let t=document.activeElement;for(let n of wn)if(t&&(t===n||n.contains(t))){e.stopImmediatePropagation(),e.stopPropagation();return}};function Pc(){Sn||(Sn=!0,window.addEventListener("keydown",Ee,!0),window.addEventListener("keypress",Ee,!0),window.addEventListener("keyup",Ee,!0),document.addEventListener("keydown",Ee,!0),document.addEventListener("keypress",Ee,!0),document.addEventListener("keyup",Ee,!0))}function Ac(){Sn&&(wn.size>0||(Sn=!1,window.removeEventListener("keydown",Ee,!0),window.removeEventListener("keypress",Ee,!0),window.removeEventListener("keyup",Ee,!0),document.removeEventListener("keydown",Ee,!0),document.removeEventListener("keypress",Ee,!0),document.removeEventListener("keyup",Ee,!0)))}function Si(e){let{id:t,value:n=null,options:o,placeholder:r="Select...",size:i="md",disabled:a=!1,blockGameKeys:s=!0,onChange:u,onOpenChange:d}=e,l=w("div",{className:"select",id:t}),c=w("button",{className:"select-trigger",type:"button"}),p=w("span",{className:"select-value"},r),m=w("span",{className:"select-caret"},"\u25BE");c.append(p,m);let f=w("div",{className:"select-menu",role:"listbox",tabindex:"-1","aria-hidden":"true"});l.classList.add(`select--${i}`);let g=!1,b=n,h=null,S=!!a;function v(O){return O==null?r:(e.options||o).find(_=>_.value===O)?.label??r}function y(O){p.textContent=v(O),f.querySelectorAll(".select-option").forEach(D=>{let _=D.dataset.value,j=O!=null&&_===O;D.classList.toggle("selected",j),D.setAttribute("aria-selected",String(j))})}function k(O){f.replaceChildren(),O.forEach(D=>{let _=w("button",{className:"select-option"+(D.disabled?" disabled":""),type:"button",role:"option","data-value":D.value,"aria-selected":String(D.value===b),tabindex:"-1"},D.label);D.value===b&&_.classList.add("selected"),D.disabled||_.addEventListener("pointerdown",j=>{j.preventDefault(),j.stopPropagation(),L(D.value,{notify:!0}),E()},{capture:!0}),f.appendChild(_)})}function T(){c.setAttribute("aria-expanded",String(g)),f.setAttribute("aria-hidden",String(!g))}function A(){let O=c.getBoundingClientRect();Object.assign(f.style,{minWidth:`${O.width}px`})}function I(){g||S||(g=!0,l.classList.add("open"),T(),A(),document.addEventListener("mousedown",ae,!0),document.addEventListener("scroll",N,!0),window.addEventListener("resize",G),f.focus({preventScroll:!0}),s&&(Pc(),wn.add(l),h=()=>{wn.delete(l),Ac()}),d?.(!0))}function E(){g&&(g=!1,l.classList.remove("open"),T(),document.removeEventListener("mousedown",ae,!0),document.removeEventListener("scroll",N,!0),window.removeEventListener("resize",G),c.focus({preventScroll:!0}),h?.(),h=null,d?.(!1))}function R(){g?E():I()}function L(O,D={}){let _=b;b=O,y(b),D.notify!==!1&&_!==O&&u?.(O)}function $(){return b}function ne(O){let D=Array.from(f.querySelectorAll(".select-option:not(.disabled)"));if(!D.length)return;let _=D.findIndex(ue=>ue.classList.contains("active")),j=D[(_+(O===1?1:D.length-1))%D.length];D.forEach(ue=>ue.classList.remove("active")),j.classList.add("active"),j.focus({preventScroll:!0}),j.scrollIntoView({block:"nearest"})}function K(O){(O.key===" "||O.key==="Enter"||O.key==="ArrowDown")&&(O.preventDefault(),I())}function Y(O){if(O.key==="Escape"){O.preventDefault(),E();return}if(O.key==="Enter"||O.key===" "){let D=f.querySelector(".select-option.active")||f.querySelector(".select-option.selected");D&&!D.classList.contains("disabled")&&(O.preventDefault(),L(D.dataset.value,{notify:!0}),E());return}if(O.key==="ArrowDown"){O.preventDefault(),ne(1);return}if(O.key==="ArrowUp"){O.preventDefault(),ne(-1);return}}function ae(O){l.contains(O.target)||E()}function N(){g&&A()}function G(){g&&A()}function H(O){S=!!O,c.disabled=S,l.classList.toggle("disabled",S),S&&E()}function C(O){e.options=O,k(O),O.some(D=>D.value===b)||(b=null,y(null))}return l.append(c,f),c.addEventListener("pointerdown",O=>{O.preventDefault(),O.stopPropagation(),R()},{capture:!0}),c.addEventListener("keydown",K),f.addEventListener("keydown",Y),k(o),n!=null?(b=n,y(b)):y(null),T(),H(S),{root:l,open:I,close:E,toggle:R,getValue:$,setValue:L,setOptions:C,setDisabled:H,destroy(){document.removeEventListener("mousedown",ae,!0),document.removeEventListener("scroll",N,!0),window.removeEventListener("resize",G),h?.(),h=null}}}function wi(e={}){let{id:t,text:n="",htmlFor:o,tone:r="default",size:i="md",layout:a="inline",variant:s="text",required:u=!1,disabled:d=!1,tooltip:l,hint:c,icon:p,suffix:m,onClick:f}=e,g=w("div",{className:"lg-label-wrap",id:t}),b=w("label",{className:"lg-label",...o?{htmlFor:o}:{},...l?{title:l}:{}});if(p){let L=typeof p=="string"?w("span",{className:"lg-label-ico"},p):p;L.classList?.add?.("lg-label-ico"),b.appendChild(L)}let h=w("span",{className:"lg-label-text"},n);b.appendChild(h);let S=w("span",{className:"lg-label-req",ariaHidden:"true"}," *");u&&b.appendChild(S);let v=null;if(m!=null){v=typeof m=="string"?document.createTextNode(m):m;let L=w("span",{className:"lg-label-suffix"});L.appendChild(v),b.appendChild(L)}let y=c?w("div",{className:"lg-label-hint"},c):null;g.classList.add(`lg-label--${a}`),g.classList.add(`lg-label--${i}`),s==="title"&&g.classList.add("lg-label--title"),k(r),d&&g.classList.add("is-disabled"),g.appendChild(b),y&&g.appendChild(y),f&&b.addEventListener("click",f);function k(L){g.classList.remove("lg-label--default","lg-label--muted","lg-label--info","lg-label--success","lg-label--warning","lg-label--danger"),g.classList.add(`lg-label--${L}`)}function T(L){h.textContent=L}function A(L){k(L)}function I(L){L&&!S.isConnected&&b.appendChild(S),!L&&S.isConnected&&S.remove(),L?b.setAttribute("aria-required","true"):b.removeAttribute("aria-required")}function E(L){g.classList.toggle("is-disabled",!!L)}function R(L){!L&&y&&y.isConnected?y.remove():L&&y?y.textContent=L:L&&!y&&g.appendChild(w("div",{className:"lg-label-hint"},L))}return{root:g,labelEl:b,hintEl:y,setText:T,setTone:A,setRequired:I,setDisabled:E,setHint:R}}function Gt(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function Tn(e,t){let n=document.createElement("span");n.className=`btn-ico btn-ico--${t}`;let o=Gt(e);return o&&n.appendChild(o),n}function Mc(){let e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.marginRight="6px",t.style.display="none",t.style.flexShrink="0";let n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");let o=document.createElementNS(e,"animate");o.setAttribute("attributeName","stroke-dasharray"),o.setAttribute("values","1,150;90,150;90,150"),o.setAttribute("dur","1.5s"),o.setAttribute("repeatCount","indefinite");let r=document.createElementNS(e,"animateTransform");return r.setAttribute("attributeName","transform"),r.setAttribute("attributeType","XML"),r.setAttribute("type","rotate"),r.setAttribute("from","0 12 12"),r.setAttribute("to","360 12 12"),r.setAttribute("dur","1s"),r.setAttribute("repeatCount","indefinite"),n.appendChild(o),n.appendChild(r),t.appendChild(n),t}function Ti(e={}){let{label:t="",id:n,variant:o="default",size:r="md",iconLeft:i,iconRight:a,loading:s=!1,tooltip:u,type:d="button",onClick:l,disabled:c=!1,fullWidth:p=!1}=e,m=w("button",{className:"btn",id:n});m.type=d,o==="primary"&&m.classList.add("primary"),r==="sm"&&m.classList.add("btn--sm"),u&&(m.title=u),p&&(m.style.width="100%");let f=Mc(),g=i?Tn(i,"left"):null,b=a?Tn(a,"right"):null,h=document.createElement("span");h.className="btn-label";let S=Gt(t);S&&h.appendChild(S),!S&&(g||b)&&m.classList.add("btn--icon"),m.appendChild(f),g&&m.appendChild(g),m.appendChild(h),b&&m.appendChild(b);let v=c||s;m.disabled=v,m.setAttribute("aria-busy",String(!!s)),f.style.display=s?"inline-block":"none",l&&m.addEventListener("click",l);let y=m;return y.setLoading=k=>{m.setAttribute("aria-busy",String(!!k)),f.style.display=k?"inline-block":"none",m.disabled=k||c},y.setDisabled=k=>{m.disabled=k||m.getAttribute("aria-busy")==="true"},y.setLabel=k=>{h.replaceChildren();let T=Gt(k);T&&h.appendChild(T),!T&&(g||b)?m.classList.add("btn--icon"):m.classList.remove("btn--icon")},y.setIconLeft=k=>{if(k==null){g?.remove();return}g?g.replaceChildren(Gt(k)):m.insertBefore(Tn(k,"left"),h)},y.setIconRight=k=>{if(k==null){b?.remove();return}b?b.replaceChildren(Gt(k)):m.appendChild(Tn(k,"right"))},y}function Ic(){try{let e=window.visualViewport,t=Math.round((e?.width??window.innerWidth)||0),n=Math.round((e?.height??window.innerHeight)||0);if(t&&n)return t>=n?"landscape":"portrait"}catch{}return"unknown"}function ki(){let e=navigator.userAgent||"",t=navigator.platform||"",n=navigator.userAgentData;if(n&&typeof n.platform=="string"){let r=n.platform.toLowerCase();if(r.includes("windows"))return"windows";if(r.includes("mac"))return"mac";if(r.includes("android"))return"android";if(r.includes("chrome os")||r.includes("cros"))return"chromeos";if(r.includes("linux"))return"linux";if(r.includes("ios"))return"ios"}return/iPhone|iPad|iPod/i.test(e)||t==="MacIntel"&&(navigator.maxTouchPoints??0)>1?"ios":/Android/i.test(e)?"android":/CrOS/i.test(e)?"chromeos":/Win/i.test(e)?"windows":/Mac/i.test(e)?"mac":/Linux/i.test(e)?"linux":"unknown"}function Ci(){let e=navigator.userAgent||"",t=navigator.userAgentData;if(t&&Array.isArray(t.brands)){let n=t.brands.map(a=>String(a.brand||a.brandName||a.brandVersion||a)),o=n.some(a=>/Edge/i.test(a)||/Microsoft Edge/i.test(a)),r=n.some(a=>/Opera/i.test(a)||/OPR/i.test(a)),i=n.some(a=>/Chrome|Chromium/i.test(a));if(o)return"Edge";if(r)return"Opera";if(i)return"Chrome";if(navigator.brave)return"Brave"}return/FxiOS/i.test(e)?"Firefox":/CriOS/i.test(e)?"Chrome":/EdgiOS/i.test(e)?"Edge":/OPiOS|OPR|Opera Mini|Opera/i.test(e)?"Opera":/Edg\//i.test(e)?"Edge":/OPR\//i.test(e)||/Opera/i.test(e)?"Opera":/Firefox/i.test(e)?"Firefox":/Safari/i.test(e)&&!/Chrome|Chromium|Edg|OPR/i.test(e)?"Safari":/Brave/i.test(e)||window.Brave||navigator.brave?"Brave":/Chrome|Chromium/i.test(e)?"Chrome":"Unknown"}function Ec(){let e=navigator.userAgent||"",t=navigator.userAgentData;return t&&typeof t.mobile=="boolean"?t.mobile?"mobile":"desktop":/Android|iPhone|iPad|iPod|Mobile/i.test(e)?"mobile":"desktop"}function Lc(e){if(!e)return null;try{return new URL(e).hostname}catch{return null}}function fr(){let e=(()=>{try{return window.top!==window.self}catch{return!0}})(),t=Lc(document.referrer),o=e&&!!t&&/(^|\.)discord(app)?\.com$/i.test(t)?"discord":"web",r=Ec(),i=ki(),a=Ci(),s=window.screen||{},u=window.visualViewport,d=Math.round(window.innerWidth||document.documentElement.clientWidth||0),l=Math.round(window.innerHeight||document.documentElement.clientHeight||0),c=Math.round(u?.width??d),p=Math.round(u?.height??l),m=Math.round(s.width||0),f=Math.round(s.height||0),g=Math.round(s.availWidth||m),b=Math.round(s.availHeight||f),h=Number.isFinite(window.devicePixelRatio)?window.devicePixelRatio:1;return{surface:o,host:location.hostname,origin:location.origin,isInIframe:e,platform:r,browser:a,os:i,viewportWidth:d,viewportHeight:l,visualViewportWidth:c,visualViewportHeight:p,screenWidth:m,screenHeight:f,availScreenWidth:g,availScreenHeight:b,dpr:h,orientation:Ic()}}function Rc(){return fr().surface==="discord"}function Oc(){return fr().platform==="mobile"}var Pe={detect:fr,isDiscord:Rc,isMobile:Oc,detectOS:ki,detectBrowser:Ci};var kn=!1,Nt=new Set;function Dc(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}var Le=e=>{let t=Dc();if(t){for(let n of Nt)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function Hc(){kn||(kn=!0,window.addEventListener("keydown",Le,!0),window.addEventListener("keypress",Le,!0),window.addEventListener("keyup",Le,!0),document.addEventListener("keydown",Le,!0),document.addEventListener("keypress",Le,!0),document.addEventListener("keyup",Le,!0))}function Gc(){kn&&(kn=!1,window.removeEventListener("keydown",Le,!0),window.removeEventListener("keypress",Le,!0),window.removeEventListener("keyup",Le,!0),document.removeEventListener("keydown",Le,!0),document.removeEventListener("keypress",Le,!0),document.removeEventListener("keyup",Le,!0))}function Nc(e){return Nt.size===0&&Hc(),Nt.add(e),()=>{Nt.delete(e),Nt.size===0&&Gc()}}function _c(e,t,n,o){let r;switch(e){case"digits":r="0-9";break;case"alpha":r="\\p{L}";break;case"alphanumeric":r="\\p{L}0-9";break;default:return null}return t&&(r+=" "),n&&(r+="\\-"),o&&(r+="_"),new RegExp(`[^${r}]`,"gu")}function Wc(e,t){return t?e.replace(t,""):e}function Bc(e,t=0){if(!t)return e;let n;return((...o)=>{clearTimeout(n),n=setTimeout(()=>e(...o),t)})}function Pi(e={}){let{id:t,placeholder:n="",value:o="",mode:r="any",allowSpaces:i=!1,allowDashes:a=!1,allowUnderscore:s=!1,maxLength:u,blockGameKeys:d=!0,debounceMs:l=0,onChange:c,onEnter:p,label:m}=e,f=w("div",{className:"lg-input-wrap"}),g=w("input",{className:"input",id:t,placeholder:n});if(typeof u=="number"&&u>0&&(g.maxLength=u),o&&(g.value=o),m){let L=w("div",{className:"lg-input-label"},m);f.appendChild(L)}f.appendChild(g);let b=_c(r,i,a,s),h=()=>{let L=g.selectionStart??g.value.length,$=g.value.length,ne=Wc(g.value,b);if(ne!==g.value){g.value=ne;let K=$-ne.length,Y=Math.max(0,L-K);g.setSelectionRange(Y,Y)}},S=Bc(()=>c?.(g.value),l);g.addEventListener("input",()=>{h(),S()}),g.addEventListener("paste",()=>queueMicrotask(()=>{h(),S()})),g.addEventListener("keydown",L=>{L.key==="Enter"&&p?.(g.value)});let v=d?Nc(g):()=>{};function y(){return g.value}function k(L){g.value=L??"",h(),S()}function T(){g.focus()}function A(){g.blur()}function I(L){g.disabled=!!L}function E(){return document.activeElement===g}function R(){v()}return{root:f,input:g,getValue:y,setValue:k,focus:T,blur:A,setDisabled:I,isFocused:E,destroy:R}}function fe(e,t,n){return Math.min(n,Math.max(t,e))}function Wt({h:e,s:t,v:n,a:o}){let r=(e%360+360)%360/60,i=n*t,a=i*(1-Math.abs(r%2-1)),s=0,u=0,d=0;switch(Math.floor(r)){case 0:s=i,u=a;break;case 1:s=a,u=i;break;case 2:u=i,d=a;break;case 3:u=a,d=i;break;case 4:s=a,d=i;break;default:s=i,d=a;break}let c=n-i,p=Math.round((s+c)*255),m=Math.round((u+c)*255),f=Math.round((d+c)*255);return{r:fe(p,0,255),g:fe(m,0,255),b:fe(f,0,255),a:fe(o,0,1)}}function Ai({r:e,g:t,b:n,a:o}){let r=fe(e,0,255)/255,i=fe(t,0,255)/255,a=fe(n,0,255)/255,s=Math.max(r,i,a),u=Math.min(r,i,a),d=s-u,l=0;d!==0&&(s===r?l=60*((i-a)/d%6):s===i?l=60*((a-r)/d+2):l=60*((r-i)/d+4)),l<0&&(l+=360);let c=s===0?0:d/s;return{h:l,s:c,v:s,a:fe(o,0,1)}}function hr({r:e,g:t,b:n}){let o=r=>fe(Math.round(r),0,255).toString(16).padStart(2,"0");return`#${o(e)}${o(t)}${o(n)}`.toUpperCase()}function jc({r:e,g:t,b:n,a:o}){let r=fe(Math.round(o*255),0,255);return`${hr({r:e,g:t,b:n,a:o})}${r.toString(16).padStart(2,"0")}`.toUpperCase()}function _t({r:e,g:t,b:n,a:o}){let r=Math.round(o*1e3)/1e3;return`rgba(${e}, ${t}, ${n}, ${r})`}function yt(e){let t=e.trim();if(!t||(t.startsWith("#")&&(t=t.slice(1)),![3,4,6,8].includes(t.length))||!/^[0-9a-fA-F]+$/.test(t))return null;(t.length===3||t.length===4)&&(t=t.split("").map(a=>a+a).join(""));let n=255;t.length===8&&(n=parseInt(t.slice(6,8),16),t=t.slice(0,6));let o=parseInt(t.slice(0,2),16),r=parseInt(t.slice(2,4),16),i=parseInt(t.slice(4,6),16);return{r:o,g:r,b:i,a:n/255}}function br(e){if(!e)return null;let t=e.trim();if(t.startsWith("#"))return yt(t);let n=t.match(/^rgba?\(([^)]+)\)$/i);if(n){let o=n[1].split(",").map(u=>u.trim());if(o.length<3)return null;let r=Number(o[0]),i=Number(o[1]),a=Number(o[2]),s=o[3]!=null?Number(o[3]):1;return[r,i,a,s].some(u=>Number.isNaN(u))?null:{r,g:i,b:a,a:s}}return null}function Fc(e,t){let n=br(e)??yt(e??"")??{r:244,g:67,b:54,a:1};return typeof t=="number"&&(n.a=fe(t,0,1)),Ai(n)}function zc(e){return`#${e.trim().replace(/[^0-9a-fA-F#]/g,"").replace(/#/g,"")}`.slice(0,9).toUpperCase()}function Uc(e){let t=e.trim();return t&&(/^rgba?\s*\(/i.test(t)?t=t.replace(/^rgba?/i,"rgba"):(t=t.replace(/^\(?(.*)\)?$/,"$1"),t=`rgba(${t})`),t=t.replace(/\s*\(\s*/,"("),t=t.replace(/\s*\)\s*$/,")"),t=t.replace(/\s*,\s*/g,", "),t)}function Ze(e){let t=Wt(e),n=Wt({...e,a:1});return{hsva:{...e},hex:hr(n),hexa:jc(t),rgba:_t(t),alpha:e.a}}function Mi(e={}){let{id:t,label:n="Color",value:o,alpha:r,defaultExpanded:i=!1,detectMobile:a,onInput:s,onChange:u}=e,l=a?a():Pe.detect().platform==="mobile",c=Fc(o,r),p=Qe({id:t,className:"color-picker",title:n,padding:l?"md":"lg",variant:"soft",expandable:!l,defaultExpanded:!l&&i});p.classList.add(l?"color-picker--mobile":"color-picker--desktop");let m=p.querySelector(".card-header");m&&m.classList.add("color-picker__header");let f=m?.querySelector(".card-title"),g=w("button",{className:"color-picker__preview",type:"button",title:`Preview ${n}`,"aria-label":`Change ${n}`});f?f.prepend(g):m?m.prepend(g):p.prepend(g);let b=p.querySelector(".card-toggle");!l&&b&&g.addEventListener("click",()=>{p.classList.contains("card--collapsed")&&b.click()});let h=p.querySelector(".card-collapse"),S=null,v=null,y=null,k=null,T=null,A=null,I=null,E=null,R=null,L="hex";function $(N){let G=Ze(c);N==="input"?s?.(G):u?.(G)}function ne(){let N=Ze(c);if(g.style.setProperty("--cp-preview-color",N.rgba),g.setAttribute("aria-label",`${n}: ${N.hexa}`),!l&&S&&v&&y&&k&&T&&A&&I){let G=Wt({...c,s:1,v:1,a:1}),H=_t(G);S.style.setProperty("--cp-palette-hue",H),v.style.left=`${c.s*100}%`,v.style.top=`${(1-c.v)*100}%`,y.style.setProperty("--cp-alpha-gradient",`linear-gradient(180deg, ${_t({...G,a:1})} 0%, ${_t({...G,a:0})} 100%)`),k.style.top=`${(1-c.a)*100}%`,T.style.setProperty("--cp-hue-color",_t(Wt({...c,v:1,s:1,a:1}))),A.style.left=`${c.h/360*100}%`;let C=c.a===1?N.hex:N.hexa,O=N.rgba,D=L==="hex"?C:O;I!==document.activeElement&&(I.value=D),I.setAttribute("aria-label",`${L.toUpperCase()} code for ${n}`),I.placeholder=L==="hex"?"#RRGGBB or #RRGGBBAA":"rgba(0, 0, 0, 1)",L==="hex"?I.maxLength=9:I.removeAttribute("maxLength"),I.dataset.mode=L,E&&(E.textContent=L.toUpperCase(),E.setAttribute("aria-label",L==="hex"?"Passer en saisie RGBA":"Revenir en saisie HEX"),E.setAttribute("aria-pressed",L==="rgba"?"true":"false"),E.classList.toggle("is-alt",L==="rgba"))}R&&R!==document.activeElement&&(R.value=N.hex)}function K(N,G=null){c={h:(N.h%360+360)%360,s:fe(N.s,0,1),v:fe(N.v,0,1),a:fe(N.a,0,1)},ne(),G&&$(G)}function Y(N,G=null){K(Ai(N),G)}function ae(N,G,H){N.addEventListener("pointerdown",C=>{C.preventDefault();let O=C.pointerId,D=j=>{j.pointerId===O&&G(j)},_=j=>{j.pointerId===O&&(document.removeEventListener("pointermove",D),document.removeEventListener("pointerup",_),document.removeEventListener("pointercancel",_),H?.(j))};G(C),document.addEventListener("pointermove",D),document.addEventListener("pointerup",_),document.addEventListener("pointercancel",_)})}if(!l&&h){let N=h.querySelector(".card-body");if(N){N.classList.add("color-picker__body"),v=w("div",{className:"color-picker__palette-cursor"}),S=w("div",{className:"color-picker__palette"},v),k=w("div",{className:"color-picker__alpha-thumb"}),y=w("div",{className:"color-picker__alpha"},k),A=w("div",{className:"color-picker__hue-thumb"}),T=w("div",{className:"color-picker__hue"},A);let G=w("div",{className:"color-picker__main"},S,y),H=w("div",{className:"color-picker__hue-row"},T),C=Pi({blockGameKeys:!0});I=C.input,I.classList.add("color-picker__hex-input"),I.value="",I.maxLength=9,I.spellcheck=!1,I.inputMode="text",I.setAttribute("aria-label",`Hex code for ${n}`),E=w("button",{type:"button",className:"color-picker__mode-btn",textContent:"HEX","aria-pressed":"false","aria-label":"Passer en saisie RGBA"}),C.root.classList.add("color-picker__hex-wrap");let O=w("div",{className:"color-picker__hex-row"},E,C.root);N.replaceChildren(G,H,O),ae(S,_=>{if(!S||!v)return;let j=S.getBoundingClientRect(),ue=fe((_.clientX-j.left)/j.width,0,1),bt=fe((_.clientY-j.top)/j.height,0,1);K({...c,s:ue,v:1-bt},"input")},()=>$("change")),ae(y,_=>{if(!y)return;let j=y.getBoundingClientRect(),ue=fe((_.clientY-j.top)/j.height,0,1);K({...c,a:1-ue},"input")},()=>$("change")),ae(T,_=>{if(!T)return;let j=T.getBoundingClientRect(),ue=fe((_.clientX-j.left)/j.width,0,1);K({...c,h:ue*360},"input")},()=>$("change")),E.addEventListener("click",()=>{if(L=L==="hex"?"rgba":"hex",I){let _=Ze(c);I.value=L==="hex"?c.a===1?_.hex:_.hexa:_.rgba}ne(),I?.focus(),I?.select()}),I.addEventListener("input",()=>{if(L==="hex"){let _=zc(I.value);if(_!==I.value){let j=I.selectionStart??_.length;I.value=_,I.setSelectionRange(j,j)}}});let D=()=>{let _=I.value;if(L==="hex"){let j=yt(_);if(!j){I.value=c.a===1?Ze(c).hex:Ze(c).hexa;return}let ue=_.startsWith("#")?_.slice(1):_,bt=ue.length===4||ue.length===8;j.a=bt?j.a:c.a,Y(j,"change")}else{let j=Uc(_),ue=br(j);if(!ue){I.value=Ze(c).rgba;return}Y(ue,"change")}};I.addEventListener("change",D),I.addEventListener("blur",D),I.addEventListener("keydown",_=>{_.key==="Enter"&&(D(),I.blur())})}}return l&&(h&&h.remove(),R=w("input",{className:"color-picker__native",type:"color",value:hr(Wt({...c,a:1}))}),g.addEventListener("click",()=>R.click()),R.addEventListener("input",()=>{let N=yt(R.value);N&&(N.a=c.a,Y(N,"input"),$("change"))}),p.appendChild(R)),ne(),{root:p,isMobile:l,getValue:()=>Ze(c),setValue:(N,G)=>{let H=br(N)??yt(N)??yt("#FFFFFF");H&&(typeof G=="number"&&(H.a=G),Y(H,null))}}}var Vc=window;function $c(){if(typeof unsafeWindow<"u"&&unsafeWindow)return unsafeWindow;let e=window.wrappedJSObject;return e&&e!==window?e:Vc}var Kc=$c(),P=Kc;function qc(e){try{return!!e.isSecureContext}catch{return!1}}function yr(e){let t=e?.getRootNode?.();return t&&(t instanceof Document||t.host)?t:document}function Ii(){let e=navigator.platform||"",t=navigator.userAgent||"";return/Mac|iPhone|iPad|iPod/i.test(e)||/Mac OS|iOS/i.test(t)}async function Jc(){try{let e=await navigator.permissions?.query?.({name:"clipboard-write"});return e?e.state==="granted"||e.state==="prompt":!0}catch{return!0}}function Yc(e,t){let n=document.createElement("textarea");return n.value=e,n.setAttribute("readonly","true"),n.style.position="fixed",n.style.opacity="0",n.style.pointerEvents="none",n.style.top="0",t.appendChild?t.appendChild(n):document.body.appendChild(n),n}function Xc(e){try{let t=window.getSelection?.();if(!t)return!1;let n=document.createRange();return n.selectNodeContents(e),t.removeAllRanges(),t.addRange(n),!0}catch{return!1}}async function Qc(e){if(!("clipboard"in navigator))return{ok:!1,method:"clipboard-write"};if(!qc(P))return{ok:!1,method:"clipboard-write"};if(!await Jc())return{ok:!1,method:"clipboard-write"};try{return await navigator.clipboard.writeText(e),{ok:!0,method:"clipboard-write"}}catch{return{ok:!1,method:"clipboard-write"}}}function Zc(e,t){try{let n=t||yr(),o=Yc(e,n);o.focus(),o.select(),o.setSelectionRange(0,o.value.length);let r=!1;try{r=document.execCommand("copy")}catch{r=!1}return o.remove(),{ok:r,method:"execCommand"}}catch{return{ok:!1,method:"execCommand"}}}function eu(e,t){if(!t)return{ok:!1,method:"selection"};let n=t.textContent??"",o=!1;if(n!==e)try{t.textContent=e,o=!0}catch{}let r=Xc(t);o&&setTimeout(()=>{try{t.textContent=n}catch{}},80);let i=Ii()?"\u2318C pour copier":"Ctrl+C pour copier";return{ok:r,method:"selection",hint:i}}async function tu(e,t={}){let n=(e??"").toString();if(!n.length)return{ok:!1,method:"noop"};let o=await Qc(n);if(o.ok)return o;let r=t.injectionRoot||yr(t.valueNode||void 0),i=Zc(n,r);if(i.ok)return i;let a=eu(n,t.valueNode||null);if(a.ok)return a;if(!t.disablePromptFallback)try{return window.prompt(Pe.isDiscord()?"Copie manuelle (Discord bloque clipboard):":"Copie manuelle:",n),{ok:!0,method:"prompt"}}catch{}return{ok:!1,method:"noop"}}function Ei(e,t,n={}){let o=r=>{if(n.showTip){n.showTip(r);return}try{e.setAttribute("aria-label",r);let i=document.createElement("div");i.textContent=r,i.style.position="absolute",i.style.top="-28px",i.style.right="0",i.style.padding="4px 8px",i.style.borderRadius="8px",i.style.fontSize="12px",i.style.background="color-mix(in oklab, var(--bg) 85%, transparent)",i.style.border="1px solid var(--border)",i.style.color="var(--fg)",i.style.pointerEvents="none",i.style.opacity="0",i.style.transition="opacity .12s";let a=yr(e);a.appendChild?a.appendChild(i):document.body.appendChild(i);let s=e.getBoundingClientRect();i.style.left=`${s.right-8}px`,i.style.top=`${s.top-28}px`,requestAnimationFrame(()=>i.style.opacity="1"),setTimeout(()=>{i.style.opacity="0",setTimeout(()=>i.remove(),150)},1200)}catch{}};e.addEventListener("click",async r=>{r.stopPropagation();let i=(t()??"").toString(),a=await tu(i,{valueNode:n.valueNode??null,injectionRoot:n.injectionRoot??null,disablePromptFallback:n.disablePromptFallback??!1});n.onResult?.(a),a.ok?a.method==="clipboard-write"||a.method==="execCommand"||a.method==="prompt"?o("Copi\xE9"):a.method==="selection"&&o(a.hint||(Ii()?"\u2318C pour copier":"Ctrl+C pour copier")):o("Impossible de copier")})}var Ke={light:{"--bg":"rgba(255,255,255,0.7)","--fg":"#0f172a","--muted":"rgba(15,23,42,0.06)","--soft":"rgba(15,23,42,0.04)","--accent":"#2563eb","--border":"rgba(15,23,42,0.12)","--shadow":"rgba(2,6,23,.2)","--tab-bg":"#ffffff","--tab-fg":"#0f172a","--pill-from":"#4f46e5","--pill-to":"#06b6d4"},dark:{"--bg":"rgba(10,12,18,0.6)","--fg":"#e5e7eb","--muted":"rgba(229,231,235,0.08)","--soft":"rgba(229,231,235,0.05)","--accent":"#60a5fa","--border":"rgba(148,163,184,0.2)","--shadow":"rgba(0,0,0,.45)","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#e5e7eb","--pill-from":"#6366f1","--pill-to":"#06b6d4"},sepia:{"--bg":"rgba(247,242,231,0.72)","--fg":"#3b2f2f","--muted":"rgba(59,47,47,0.06)","--soft":"rgba(59,47,47,0.04)","--accent":"#b07d62","--border":"rgba(59,47,47,0.14)","--shadow":"rgba(0,0,0,.18)","--tab-bg":"#fff","--tab-fg":"#3b2f2f","--pill-from":"#b07d62","--pill-to":"#d4a373"},forest:{"--bg":"rgba(14,24,18,0.62)","--fg":"#e7f5e9","--muted":"rgba(231,245,233,0.08)","--soft":"rgba(231,245,233,0.05)","--accent":"#34d399","--border":"rgba(231,245,233,0.16)","--shadow":"rgba(0,0,0,.5)","--tab-bg":"rgba(255,255,255,0.06)","--tab-fg":"#e7f5e9","--pill-from":"#10b981","--pill-to":"#84cc16"},violet:{"--bg":"rgba(23, 16, 42, 0.68)","--fg":"#f5f3ff","--muted":"rgba(245,243,255,0.08)","--soft":"rgba(245,243,255,0.05)","--accent":"#a855f7","--border":"rgba(216,180,254,0.22)","--shadow":"rgba(12,3,30,.55)","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#ede9fe","--pill-from":"#a855f7","--pill-to":"#f472b6"},ocean:{"--bg":"rgba(10, 34, 46, 0.66)","--fg":"#e0f7ff","--muted":"rgba(224,247,255,0.07)","--soft":"rgba(224,247,255,0.05)","--accent":"#38bdf8","--border":"rgba(125, 211, 252, 0.22)","--shadow":"rgba(0, 16, 32, .52)","--tab-bg":"rgba(56,189,248,0.14)","--tab-fg":"#e0f7ff","--pill-from":"#0ea5e9","--pill-to":"#14b8a6"},ember:{"--bg":"rgba(34,18,10,0.64)","--fg":"#fff7ed","--muted":"rgba(255,247,237,0.08)","--soft":"rgba(255,247,237,0.05)","--accent":"#f97316","--border":"rgba(255, 159, 92, 0.24)","--shadow":"rgba(16,6,2,.52)","--tab-bg":"rgba(255,247,237,0.09)","--tab-fg":"#fff7ed","--pill-from":"#fb923c","--pill-to":"#facc15"}};function vr(e){let{host:t,themes:n,initialTheme:o,onThemeChange:r}=e,i=o,a=null,s=!1;function u(l){let c=n[l]||n[i]||{};s&&t.classList.add("theme-anim");for(let[p,m]of Object.entries(c))t.style.setProperty(p,m);s?(a!==null&&clearTimeout(a),a=P.setTimeout(()=>{t.classList.remove("theme-anim"),a=null},320)):s=!0,i=l,r?.(l)}function d(){return i}return u(o),{applyTheme:u,getCurrentTheme:d}}var Cn={ui:{expandedCards:{style:!1,system:!1}}};async function Li(){let e=await Ht("tab-settings",{version:1,defaults:Cn,sanitize:r=>({ui:{expandedCards:vn(Cn.ui.expandedCards,r.ui?.expandedCards)}})});function t(r){let i=e.get();e.update({ui:{...i.ui,...r,expandedCards:vn(i.ui.expandedCards,r.expandedCards)}})}function n(r,i){let a=e.get();e.update({ui:{...a.ui,expandedCards:{...a.ui.expandedCards,[r]:!!i}}})}function o(r){let i=e.get();n(r,!i.ui.expandedCards[r])}return{get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:o}}function Ri(e){return e.replace(/[_-]+/g," ").replace(/^\w/,t=>t.toUpperCase())}function nu(){return Object.keys(Ke).map(e=>({value:e,label:Ri(e)}))}var ru=["--bg","--fg","--accent","--muted","--soft","--border","--shadow","--tab-bg","--tab-fg","--pill-from","--pill-to"];function ou(e){return Ri(e.replace(/^--/,""))}function iu(e){return e.alpha<1?e.rgba:e.hex}var Pn=class extends Xe{constructor(n){super({id:"tab-settings",label:"Settings"});this.deps=n}async build(n){let o=this.createGrid("12px");o.id="settings",n.appendChild(o);let r;try{r=await Li()}catch{r={get:()=>Cn,set:()=>{},save:()=>{},setUI:()=>{},setCardExpanded:()=>{},toggleCard:()=>{}}}let i=r.get(),a=Object.keys(Ke),s=this.deps.getCurrentTheme?.()??this.deps.initialTheme,u=a.includes(s)?s:a[0]??"dark",d=u,l=wi({text:"Theme",tone:"muted",size:"lg"}),c=Si({options:nu(),value:u,onChange:g=>{d=g,this.deps.applyTheme(g),this.renderThemePickers(g,p,d)}}),p=w("div",{className:"settings-theme-grid"}),m=Qe({title:"Style",padding:"lg",expandable:!0,defaultExpanded:!!i.ui.expandedCards.style,onExpandChange:g=>r.setCardExpanded("style",g)},w("div",{className:"kv settings-theme-row"},l.root,c.root),p);this.renderThemePickers(u,p,d);let f=this.createEnvCard({defaultExpanded:!!i.ui.expandedCards.system,onExpandChange:g=>r.setCardExpanded("system",g)});o.appendChild(m),o.appendChild(f)}renderThemePickers(n,o,r){let i=Ke[n];if(o.replaceChildren(),!!i)for(let a of ru){let s=i[a];if(s==null)continue;let u=Mi({label:ou(a),value:s,defaultExpanded:!1,onInput:d=>this.updateThemeVar(n,a,d,r),onChange:d=>this.updateThemeVar(n,a,d,r)});o.appendChild(u.root)}}updateThemeVar(n,o,r,i){let a=Ke[n];a&&(a[o]=iu(r),i===n&&this.deps.applyTheme(n))}createEnvCard(n){let o=n?.defaultExpanded??!1,r=n?.onExpandChange,i=(h,S)=>{let v=w("div",{className:"kv kv--inline-mobile"}),y=w("label",{},h),k=w("div",{className:"ro"});return typeof S=="string"?k.textContent=S:k.append(S),v.append(y,k),v},a=w("code",{},"\u2014"),s=w("span",{},"\u2014"),u=w("span",{},"\u2014"),d=w("span",{},"\u2014"),l=w("span",{},"\u2014"),c=w("span",{},"\u2014"),p=()=>{let h=Pe.detect();u.textContent=h.surface,d.textContent=h.platform,l.textContent=h.browser??"Unknown",c.textContent=h.os??"Unknown",a.textContent=h.host,s.textContent=h.isInIframe?"Yes":"No"},m=Ti({label:"Copy JSON",variant:"primary",size:"sm"});Ei(m,()=>{let h=Pe.detect();return JSON.stringify(h,null,2)});let f=w("div",{style:"width:100%;display:flex;justify-content:center;"},m),g=Qe({title:"System",variant:"soft",padding:"lg",footer:f,expandable:!0,defaultExpanded:o,onExpandChange:r},i("Surface",u),i("Platform",d),i("Browser",l),i("OS",c),i("Host",a),i("Iframe",s)),b=()=>{document.hidden||p()};return document.addEventListener("visibilitychange",b),p(),this.addCleanup(()=>document.removeEventListener("visibilitychange",b)),g}};function Oi(e){let{id:t,columns:n,data:o,pageSize:r=0,stickyHeader:i=!0,zebra:a=!0,animations:s=!0,respectReducedMotion:u=!0,compact:d=!1,maxHeight:l,selectable:c=!1,getRowId:p=(F,J)=>String(J),onSortChange:m,onRowClick:f}=e,g=n.slice(),b=o.slice(),h=o.slice(),S=null,v=null,y=1,k=typeof window<"u"&&typeof window.matchMedia=="function"?window.matchMedia("(prefers-reduced-motion: reduce)").matches:!1,T=!!s&&!(u&&k),A=w("div",{className:"lg-table-wrap",id:t});if(l!=null){let F=typeof l=="number"?`${l}px`:l;A.style.setProperty("--tbl-max-h",F)}let I=w("div",{className:"lg-table"}),E=w("div",{className:"lg-thead"}),R=w("div",{className:"lg-tbody"}),L=w("div",{className:"lg-tfoot"});i&&A.classList.add("sticky"),a&&A.classList.add("zebra"),d&&A.classList.add("compact"),c&&A.classList.add("selectable");let $="36px";A.style.setProperty("--check-w",$);function ne(){let F=g.map(oe=>{let ee=(oe.width||"1fr").trim();return/\bfr$/.test(ee)?`minmax(0, ${ee})`:ee}),J=(c?[$,...F]:F).join(" ");A.style.setProperty("--lg-cols",J)}ne();function K(){return r?Math.max(1,Math.ceil(b.length/r)):1}function Y(){if(!r)return b;let F=(y-1)*r;return b.slice(F,F+r)}function ae(){if(!S||!v)return;let F=g.find(ee=>String(ee.key)===S),J=v==="asc"?1:-1,oe=F?.sortFn?(ee,ce)=>J*F.sortFn(ee,ce):(ee,ce)=>{let X=ee[S],re=ce[S];return X==null&&re==null?0:X==null?-1*J:re==null?1*J:typeof X=="number"&&typeof re=="number"?J*(X-re):J*String(X).localeCompare(String(re),void 0,{numeric:!0,sensitivity:"base"})};b.sort(oe)}let N=new Set;function G(){return Array.from(N)}function H(){N.clear(),O(),R.querySelectorAll(".lg-row-check").forEach(F=>F.checked=!1)}let C=null;function O(){if(!C)return;let F=Y();if(!F.length){C.indeterminate=!1,C.checked=!1;return}let J=F.map((ee,ce)=>p(ee,(y-1)*(r||0)+ce)),oe=J.reduce((ee,ce)=>ee+(N.has(ce)?1:0),0);C.checked=oe===J.length,C.indeterminate=oe>0&&oe<J.length}function D(){let F=R.offsetWidth-R.clientWidth;E.style.paddingRight=F>0?`${F}px`:"0px"}function _(){requestAnimationFrame(D)}let j=new ResizeObserver(()=>D()),ue=()=>D();function bt(){E.replaceChildren();let F=w("div",{className:"lg-tr lg-tr-head"});if(c){let J=w("div",{className:"lg-th lg-th-check"});C=w("input",{type:"checkbox"}),C.addEventListener("change",()=>{let oe=Y(),ee=C.checked;oe.forEach((ce,X)=>{let re=p(ce,(y-1)*(r||0)+X);ee?N.add(re):N.delete(re)}),mn()}),J.appendChild(C),F.appendChild(J)}g.forEach(J=>{let oe=w("button",{className:"lg-th",type:"button",title:J.title||J.header});oe.textContent=J.header,J.align&&oe.style.setProperty("--col-align",J.align),J.sortable&&oe.classList.add("sortable"),S===String(J.key)&&v?oe.setAttribute("data-sort",v):oe.removeAttribute("data-sort"),J.sortable&&oe.addEventListener("click",()=>{let ee=String(J.key);S!==ee?(S=ee,v="asc"):(v=v==="asc"?"desc":v==="desc"?null:"asc",v||(S=null,b=h.slice())),m?.(S,v),S&&v&&ae(),fn()}),F.appendChild(oe)}),E.appendChild(F);try{j.disconnect()}catch{}j.observe(R),_()}function Q(F){return Array.from(F.querySelectorAll(":scope > .lg-td, :scope > .lg-td-check"))}function he(F){return F.querySelector(".lg-td, .lg-td-check")}function Be(F){let J=he(F);return J?J.getBoundingClientRect():null}function mn(){let F=Y(),J=new Map;Array.from(R.children).forEach(X=>{let re=X,Se=re.getAttribute("data-id");if(!Se)return;let Ie=Be(re);Ie&&J.set(Se,Ie)});let oe=new Map;Array.from(R.children).forEach(X=>{let re=X,Se=re.getAttribute("data-id");Se&&oe.set(Se,re)});let ee=[];for(let X=0;X<F.length;X++){let re=F[X],Se=(r?(y-1)*r:0)+X,Ie=p(re,Se);ee.push(Ie);let de=oe.get(Ie);de||(de=fc(re,Se),T&&Q(de).forEach(Rt=>{Rt.style.transform="translateY(6px)",Rt.style.opacity="0"})),R.appendChild(de)}let ce=[];if(oe.forEach((X,re)=>{ee.includes(re)||ce.push(X)}),!T){ce.forEach(X=>X.remove()),O(),_();return}ee.forEach(X=>{let re=R.querySelector(`.lg-tr-body[data-id="${X}"]`);if(!re)return;let Se=Be(re),Ie=J.get(X),de=Q(re);if(Ie&&Se){let Ge=Ie.left-Se.left,ht=Ie.top-Se.top;de.forEach(Ve=>{Ve.style.transition="none",Ve.style.transform=`translate(${Ge}px, ${ht}px)`,Ve.style.opacity="1"}),he(re)?.getBoundingClientRect(),de.forEach(Ve=>{Ve.style.willChange="transform, opacity",Ve.style.transition="transform .18s ease, opacity .18s ease"}),requestAnimationFrame(()=>{de.forEach(Ve=>{Ve.style.transform="translate(0,0)"})})}else de.forEach(Ge=>{Ge.style.transition="transform .18s ease, opacity .18s ease"}),requestAnimationFrame(()=>{de.forEach(Ge=>{Ge.style.transform="translate(0,0)",Ge.style.opacity="1"})});let mr=Ge=>{(Ge.propertyName==="transform"||Ge.propertyName==="opacity")&&(de.forEach(ht=>{ht.style.willChange="",ht.style.transition="",ht.style.transform="",ht.style.opacity=""}),Ge.currentTarget.removeEventListener("transitionend",mr))},Rt=de[0];Rt&&Rt.addEventListener("transitionend",mr)}),ce.forEach(X=>{let re=Q(X);re.forEach(de=>{de.style.willChange="transform, opacity",de.style.transition="transform .18s ease, opacity .18s ease",de.style.opacity="0",de.style.transform="translateY(-6px)"});let Se=de=>{de.propertyName==="opacity"&&(de.currentTarget.removeEventListener("transitionend",Se),X.remove())},Ie=re[0];Ie?Ie.addEventListener("transitionend",Se):X.remove()}),O(),_()}function fc(F,J){let oe=p(F,J),ee=w("div",{className:"lg-tr lg-tr-body","data-id":oe});if(c){let ce=w("div",{className:"lg-td lg-td-check"}),X=w("input",{type:"checkbox",className:"lg-row-check"});X.checked=N.has(oe),X.addEventListener("change",()=>{X.checked?N.add(oe):N.delete(oe),O()}),ce.appendChild(X),ee.appendChild(ce)}return g.forEach(ce=>{let X=w("div",{className:"lg-td"});ce.align&&X.style.setProperty("--col-align",ce.align);let re=ce.render?ce.render(F,J):String(F[ce.key]??"");typeof re=="string"?X.textContent=re:X.appendChild(re),ee.appendChild(X)}),f&&(ee.classList.add("clickable"),ee.addEventListener("click",ce=>{ce.target.closest(".lg-td-check")||f(F,J,ce)})),ee}function di(){if(L.replaceChildren(),!r)return;let F=K(),J=w("div",{className:"lg-pager"}),oe=w("button",{className:"btn",type:"button"},"\u2190"),ee=w("button",{className:"btn",type:"button"},"\u2192"),ce=w("span",{className:"lg-pager-info"},`${y} / ${F}`);oe.disabled=y<=1,ee.disabled=y>=F,oe.addEventListener("click",()=>gn(y-1)),ee.addEventListener("click",()=>gn(y+1)),J.append(oe,ce,ee),L.appendChild(J)}function gn(F){let J=K();y=Math.min(Math.max(1,F),J),mn(),di()}function fn(){ne(),bt(),mn(),di()}function bc(F){h=F.slice(),b=F.slice(),S&&v&&ae(),gn(1)}function hc(F){g=F.slice(),fn()}function yc(F,J="asc"){S=F,v=F?J:null,S&&v?ae():b=h.slice(),fn()}function vc(){try{j.disconnect()}catch{}window.removeEventListener("resize",ue)}return I.append(E,R,L),A.appendChild(I),window.addEventListener("resize",ue),fn(),{root:A,setData:bc,setColumns:hc,sortBy:yc,getSelection:G,clearSelection:H,setPage:gn,getState:()=>({page:y,pageCount:K(),sortKey:S,sortDir:v}),destroy:vc}}var Mn=!1,Bt=new Set;function au(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}var Re=e=>{let t=au();if(t){for(let n of Bt)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function su(){Mn||(Mn=!0,window.addEventListener("keydown",Re,!0),window.addEventListener("keypress",Re,!0),window.addEventListener("keyup",Re,!0),document.addEventListener("keydown",Re,!0),document.addEventListener("keypress",Re,!0),document.addEventListener("keyup",Re,!0))}function lu(){Mn&&(Mn=!1,window.removeEventListener("keydown",Re,!0),window.removeEventListener("keypress",Re,!0),window.removeEventListener("keyup",Re,!0),document.removeEventListener("keydown",Re,!0),document.removeEventListener("keypress",Re,!0),document.removeEventListener("keyup",Re,!0))}function cu(e){return Bt.size===0&&su(),Bt.add(e),()=>{Bt.delete(e),Bt.size===0&&lu()}}function An(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function uu(){let e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.display="none",t.style.flexShrink="0";let n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");let o=document.createElementNS(e,"animate");o.setAttribute("attributeName","stroke-dasharray"),o.setAttribute("values","1,150;90,150;90,150"),o.setAttribute("dur","1.5s"),o.setAttribute("repeatCount","indefinite");let r=document.createElementNS(e,"animateTransform");return r.setAttribute("attributeName","transform"),r.setAttribute("attributeType","XML"),r.setAttribute("type","rotate"),r.setAttribute("from","0 12 12"),r.setAttribute("to","360 12 12"),r.setAttribute("dur","1s"),r.setAttribute("repeatCount","indefinite"),n.append(o,r),t.appendChild(n),t}function Di(e={}){let{id:t,placeholder:n="Rechercher\u2026",value:o="",size:r="md",disabled:i=!1,autoFocus:a=!1,onChange:s,onSearch:u,autoSearch:d=!1,debounceMs:l=0,focusKey:c="/",iconLeft:p,iconRight:m,withClear:f=!0,clearTitle:g="Effacer",ariaLabel:b,submitLabel:h,loading:S=!1,blockGameKeys:v=!0}=e,y=w("div",{className:"search"+(r?` search--${r}`:""),id:t}),k=w("span",{className:"search-ico search-ico--left"});if(p){let Q=An(p);Q&&k.appendChild(Q)}else k.textContent="\u{1F50E}",k.style.opacity=".9";let T=w("input",{className:"input search-input",type:"text",placeholder:n,value:o,"aria-label":b||n}),A=w("span",{className:"search-ico search-ico--right"});if(m){let Q=An(m);Q&&A.appendChild(Q)}let I=uu();I.classList.add("search-spinner");let E=f?w("button",{className:"search-clear",type:"button",title:g},"\xD7"):null,R=h!=null?w("button",{className:"btn search-submit",type:"button"},h):null,L=w("div",{className:"search-field"},k,T,A,I,...E?[E]:[]);y.append(L,...R?[R]:[]);let $=!!i,ne=null;function K(Q){I.style.display=Q?"inline-block":"none",y.classList.toggle("is-loading",Q)}function Y(){ne!=null&&(window.clearTimeout(ne),ne=null)}function ae(Q){Y(),l>0?ne=window.setTimeout(()=>{ne=null,Q()},l):Q()}function N(){s?.(T.value),d&&u&&u(T.value)}T.addEventListener("input",()=>{ae(N)}),T.addEventListener("keydown",Q=>{Q.key==="Enter"?(Q.preventDefault(),Y(),u?.(T.value)):Q.key==="Escape"&&(T.value.length>0?C("",{notify:!0}):T.blur())}),E&&E.addEventListener("click",()=>C("",{notify:!0})),R&&R.addEventListener("click",()=>u?.(T.value));let G=()=>{};if(v&&(G=cu(T)),c){let Q=he=>{if(he.key===c&&!he.ctrlKey&&!he.metaKey&&!he.altKey){let Be=document.activeElement;Be&&(Be.tagName==="INPUT"||Be.tagName==="TEXTAREA"||Be.isContentEditable)||(he.preventDefault(),T.focus())}};window.addEventListener("keydown",Q,!0),y.__cleanup=()=>{window.removeEventListener("keydown",Q,!0),G()}}else y.__cleanup=()=>{G()};function H(Q){$=!!Q,T.disabled=$,E&&(E.disabled=$),R&&(R.disabled=$),y.classList.toggle("disabled",$)}function C(Q,he={}){let Be=T.value;T.value=Q??"",he.notify&&Be!==Q&&ae(N)}function O(){return T.value}function D(){T.focus()}function _(){T.blur()}function j(Q){T.placeholder=Q}function ue(Q){C("",Q)}return H($),K(S),a&&D(),{root:y,input:T,getValue:O,setValue:C,focus:D,blur:_,setDisabled:H,setPlaceholder:j,clear:ue,setLoading:K,setIconLeft(Q){k.replaceChildren();let he=An(Q??"\u{1F50E}");he&&k.appendChild(he)},setIconRight(Q){A.replaceChildren();let he=An(Q??"");he&&A.appendChild(he)}}}function du(e){let t=String(e??"").trim().toLowerCase();return t?t==="common"?"Common":t==="uncommon"?"Uncommon":t==="rare"?"Rare":t==="legendary"?"Legendary":t==="mythical"?"Mythical":t==="divine"?"Divine":t==="celestial"?"Celestial":t==="unknown"||t==="unknow"?"Unknown":null:null}function pu(e){return e.toLowerCase()}function Hi(e={}){let{id:t,label:n="",type:o="neutral",tone:r="soft",border:i,withBorder:a,pill:s=!0,size:u="md",onClick:d,variant:l="default",rarity:c=null}=e,p=w("span",{className:"badge",id:t});s&&p.classList.add("badge--pill"),u==="sm"?p.classList.add("badge--sm"):u==="lg"?p.classList.add("badge--lg"):p.classList.add("badge--md"),d&&p.addEventListener("click",d);let m=!1,f=a;function g(){m||(f===!1?p.style.border="none":p.style.border="")}function b(T,A=r){p.classList.remove("badge--neutral","badge--info","badge--success","badge--warning","badge--danger","badge--soft","badge--outline","badge--solid"),p.classList.add(`badge--${T}`,`badge--${A}`),g()}function h(T){let A=(T??"").trim();A?(p.style.border=A,m=!0):(m=!1,g())}function S(T){f=T,g()}function v(T){p.textContent=T}function y(T,A=r){b(T,A)}function k(T){p.classList.remove("badge--rarity","badge--rarity-common","badge--rarity-uncommon","badge--rarity-rare","badge--rarity-legendary","badge--rarity-mythical","badge--rarity-divine","badge--rarity-celestial","badge--rarity-unknown"),p.style.background="",p.style.backgroundSize="",p.style.animation="",p.style.color="",p.style.webkitTextStroke="";let A=du(T);if(!A){p.textContent=String(T??"\u2014");return}p.textContent=A,p.classList.add("badge--rarity",`badge--rarity-${pu(A)}`)}return l==="rarity"?k(c):(p.textContent=n,b(o,r),typeof a=="boolean"&&S(a),i&&h(i)),{root:p,setLabel:v,setType:y,setBorder:h,setWithBorder:S,setRarity:k}}Fe();Fe();var Ni=Function.prototype.bind,te={_bindPatched:!1,engine:null,tos:null,app:null,renderer:null,ticker:null,stage:null},_i,Wi,Bi,mu=new Promise(e=>{_i=e}),gu=new Promise(e=>{Wi=e}),fu=new Promise(e=>{Bi=e});function bu(e){return!!(e&&typeof e=="object"&&typeof e.start=="function"&&typeof e.destroy=="function"&&e.app&&e.app.stage&&e.app.renderer&&e.systems&&typeof e.systems.values=="function")}function hu(e){try{for(let t of e.systems.values()){let n=t?.system;if(n?.name==="tileObject")return n}}catch{}return null}function yu(e){te.engine=e,te.tos=hu(e)||null,te.app=e.app||null,te.renderer=e.app?.renderer||null,te.ticker=e.app?.ticker||null,te.stage=e.app?.stage||null;try{_i(e)}catch{}try{te.app&&Wi(te.app)}catch{}try{te.renderer&&Bi(te.renderer)}catch{}}function Sr(){return te.engine?!0:(te._bindPatched||(te._bindPatched=!0,Function.prototype.bind=function(e,...t){let n=Ni.call(this,e,...t);try{!te.engine&&bu(e)&&(Function.prototype.bind=Ni,te._bindPatched=!1,yu(e))}catch{}return n}),!1)}Sr();async function vu(e=15e3){let t=performance.now();for(;performance.now()-t<e;){if(te.engine)return!0;Sr(),await je(50)}throw new Error("MGPixiHooks: engine capture timeout")}async function xu(e=15e3){return te.engine||await vu(e),!0}function Su(){return te.engine&&te.app?{ok:!0,engine:te.engine,tos:te.tos,app:te.app}:(Sr(),{ok:!1,engine:te.engine,tos:te.tos,app:te.app,note:"Not captured. Wait for room, or reload."})}var we={engineReady:mu,appReady:gu,rendererReady:fu,engine:()=>te.engine,tos:()=>te.tos,app:()=>te.app,renderer:()=>te.renderer,ticker:()=>te.ticker,stage:()=>te.stage,PIXI:()=>P.PIXI||null,init:xu,hook:Su,ready:()=>!!te.engine};var ji=P?.location?.origin||"https://magicgarden.gg";function Fi(){return typeof GM_xmlhttpRequest=="function"}function zi(e,t="text"){return new Promise((n,o)=>{GM_xmlhttpRequest({method:"GET",url:e,responseType:t,onload:r=>r.status>=200&&r.status<300?n(r):o(new Error(`HTTP ${r.status} for ${e}`)),onerror:()=>o(new Error(`Network error for ${e}`)),ontimeout:()=>o(new Error(`Timeout for ${e}`))})})}async function vt(e){if(Fi())return JSON.parse((await zi(e,"text")).responseText);let t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.json()}async function En(e){if(Fi())return(await zi(e,"blob")).response;let t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.blob()}function Ui(e){return new Promise((t,n)=>{let o=URL.createObjectURL(e),r=P?.Image||Image,i=new r;i.decoding="async",i.onload=()=>{URL.revokeObjectURL(o),t(i)},i.onerror=()=>{URL.revokeObjectURL(o),n(new Error("Image decode failed"))},i.src=o})}var ke=(e,t)=>e.replace(/\/?$/,"/")+String(t||"").replace(/^\//,""),wu=e=>e.lastIndexOf("/")>=0?e.slice(0,e.lastIndexOf("/")+1):"",wr=(e,t)=>String(t||"").startsWith("/")?String(t).slice(1):wu(e)+String(t||"");Fe();var jt=null;function Tu(){return P?.document??(typeof document<"u"?document:null)}function Tr(e){if(jt!==null)return;let t=e??Tu();if(!t)return;let n=t.scripts;for(let o=0;o<n.length;o++){let i=n.item(o)?.src;if(!i)continue;let a=i.match(/\/(?:r\/\d+\/)?version\/([^/]+)/);if(a?.[1]){jt=a[1];return}}}function ku(){return Tr(),jt}async function Cu(e=15e3){let t=performance.now();for(;performance.now()-t<e;){if(Tr(),jt)return jt;await je(50)}throw new Error("MGVersion timeout (gameVersion not found)")}var Ft={init:Tr,get:ku,wait:Cu};var Ln=null,Rn=null;async function Vi(){return Rn||Ln||(Ln=(async()=>{let e=await Ft.wait(15e3);return Rn=`${ji}/version/${e}/assets/`,Rn})(),Ln)}async function Pu(e){let t=await Vi();return ke(t,e)}var De={base:Vi,url:Pu};function zt(e){let t=String(e||"").trim();return t?t.startsWith("sprite/")||t.startsWith("sprites/")?t:t.includes("/")?`sprite/${t}`:t:""}function xt(e,t){let n=String(e||"").trim().replace(/^sprites?\//,"").replace(/^\/+|\/+$/g,""),o=String(t||"").trim();return o.includes("/")||!n?zt(o):`sprite/${n}/${o}`}function et(e,t,n,o){let r=xt(e,t);if(n.has(r)||o.has(r))return r;let i=String(t||"").trim();if(n.has(i)||o.has(i))return i;let a=zt(i);return n.has(a)||o.has(a)?a:r}function Au(e,t,n=25e3){let o=[e],r=new Set,i=0;for(;o.length&&i++<n;){let a=o.pop();if(!a||r.has(a))continue;if(r.add(a),t(a))return a;let s=a.children;if(Array.isArray(s))for(let u=s.length-1;u>=0;u--)o.push(s[u])}return null}function Mu(e){let t=P.PIXI;if(t?.Texture&&t?.Sprite&&t?.Container&&t?.Rectangle)return{Container:t.Container,Sprite:t.Sprite,Texture:t.Texture,Rectangle:t.Rectangle,AnimatedSprite:t.AnimatedSprite||null};let n=e?.stage,o=Au(n,r=>r?.texture?.frame&&r?.constructor&&r?.texture?.constructor&&r?.texture?.frame?.constructor);if(!o)throw new Error("No Sprite found yet (constructors).");return{Container:n.constructor,Sprite:o.constructor,Texture:o.texture.constructor,Rectangle:o.texture.frame.constructor,AnimatedSprite:t?.AnimatedSprite||null}}async function $i(e,t=15e3){let{sleep:n}=await Promise.resolve().then(()=>(Fe(),Gi)),o=performance.now();for(;performance.now()-o<t;)try{return Mu(e)}catch{await n(50)}throw new Error("Constructors timeout")}var qe=(...e)=>{try{console.log("[MGSprite]",...e)}catch{}};var kr=new Map;async function Iu(e){let t=e||await De.base();if(kr.has(t))return kr.get(t);let n=vt(ke(t,"manifest.json"));return kr.set(t,n),n}function Eu(e,t){return e?.bundles?.find(n=>n?.name===t)||null}function Lu(e){let t=new Set;for(let n of e?.assets||[])for(let o of n?.src||[])typeof o=="string"&&o.endsWith(".json")&&o!=="manifest.json"&&t.add(o);return Array.from(t)}var Me={load:Iu,getBundle:Eu,listJsonFromBundle:Lu};function Ru(e){return e&&typeof e=="object"&&e.frames&&e.meta&&typeof e.meta.image=="string"}function Cr(e,t,n,o,r){return new e(t,n,o,r)}function Ou(e,t,n,o,r,i,a){let s;try{s=new e({source:t.source,frame:n,orig:o,trim:r||void 0,rotate:i||0})}catch{s=new e(t.baseTexture||t,n,o,r||void 0,i||0)}if(a)if(s.defaultAnchor?.set)try{s.defaultAnchor.set(a.x,a.y)}catch{}else s.defaultAnchor?(s.defaultAnchor.x=a.x,s.defaultAnchor.y=a.y):s.defaultAnchor={x:a.x,y:a.y};try{s.updateUvs?.()}catch{}return s}function Du(e,t,n,o){let{Texture:r,Rectangle:i}=o;for(let[a,s]of Object.entries(e.frames)){let u=s.frame,d=!!s.rotated,l=d?2:0,c=d?u.h:u.w,p=d?u.w:u.h,m=Cr(i,u.x,u.y,c,p),f=s.sourceSize||{w:u.w,h:u.h},g=Cr(i,0,0,f.w,f.h),b=null;if(s.trimmed&&s.spriteSourceSize){let h=s.spriteSourceSize;b=Cr(i,h.x,h.y,h.w,h.h)}n.set(a,Ou(r,t,m,g,b,l,s.anchor||null))}}function Hu(e,t,n){if(!(!e.animations||typeof e.animations!="object"))for(let[o,r]of Object.entries(e.animations)){if(!Array.isArray(r))continue;let i=r.map(a=>t.get(a)).filter(Boolean);i.length>=2&&n.set(o,i)}}function Gu(e,t){let n=(o,r)=>{let i=String(o||"").trim(),a=String(r||"").trim();!i||!a||(t.has(i)||t.set(i,new Set),t.get(i).add(a))};for(let o of Object.keys(e.frames||{})){let r=/^sprite\/([^/]+)\/(.+)$/.exec(o);r&&n(r[1],r[2])}}async function Ki(e,t){let n=await Me.load(e),o=Me.getBundle(n,"default");if(!o)throw new Error("No default bundle in manifest");let r=Me.listJsonFromBundle(o),i=new Set,a=new Map,s=new Map,u=new Map;async function d(l){if(i.has(l))return;i.add(l);let c=await vt(ke(e,l));if(!Ru(c))return;let p=c.meta?.related_multi_packs;if(Array.isArray(p))for(let b of p)await d(wr(l,b));let m=wr(l,c.meta.image),f=await Ui(await En(ke(e,m))),g=t.Texture.from(f);Du(c,g,a,t),Hu(c,a,s),Gu(c,u)}for(let l of r)await d(l);return{textures:a,animations:s,categoryIndex:u}}var qi={enabled:!0,maxEntries:1200,maxCost:5e3,srcCanvasMax:450};function Ji(){return{lru:new Map,cost:0,srcCanvas:new Map}}function Pr(e,t){return`${t.sig}::${e}`}function Yi(e){return e?e.isAnim?e.frames?.length||0:e.tex?1:0:0}function Nu(e,t,n){e.lru.delete(t),e.lru.set(t,n)}function _u(e,t){if(t.enabled)for(;e.lru.size>t.maxEntries||e.cost>t.maxCost;){let n=e.lru.keys().next().value;if(n===void 0)break;let o=e.lru.get(n);e.lru.delete(n),e.cost=Math.max(0,e.cost-Yi(o??null))}}function Ar(e,t){let n=e.lru.get(t);return n?(Nu(e,t,n),n):null}function Mr(e,t,n,o){e.lru.set(t,n),e.cost+=Yi(n),_u(e,o)}function Xi(e){e.lru.clear(),e.cost=0,e.srcCanvas.clear()}function Qi(e,t){return e.srcCanvas.get(t)??null}function Zi(e,t,n,o){if(e.srcCanvas.set(t,n),e.srcCanvas.size>o.srcCanvasMax){let r=e.srcCanvas.keys().next().value;r!==void 0&&e.srcCanvas.delete(r)}}var tt={Gold:{overlayTall:null,tallIconOverride:null},Rainbow:{overlayTall:null,tallIconOverride:null,angle:130,angleTall:0},Wet:{overlayTall:"sprite/mutation-overlay/WetTallPlant",tallIconOverride:"sprite/mutation/Puddle"},Chilled:{overlayTall:"sprite/mutation-overlay/ChilledTallPlant",tallIconOverride:null},Frozen:{overlayTall:"sprite/mutation-overlay/FrozenTallPlant",tallIconOverride:null},Dawnlit:{overlayTall:null,tallIconOverride:null},Ambershine:{overlayTall:null,tallIconOverride:null},Dawncharged:{overlayTall:null,tallIconOverride:null},Ambercharged:{overlayTall:null,tallIconOverride:null}},ta=Object.keys(tt),Wu=["Gold","Rainbow","Wet","Chilled","Frozen","Ambershine","Dawnlit","Dawncharged","Ambercharged"],ea=new Map(Wu.map((e,t)=>[e,t]));function On(e){return[...new Set(e.filter(Boolean))].sort((n,o)=>(ea.get(n)??1/0)-(ea.get(o)??1/0))}var Bu=["Wet","Chilled","Frozen"];var na=new Set(["Dawnlit","Ambershine","Dawncharged","Ambercharged"]),ra={Banana:.6,Carrot:.6,Sunflower:.5,Starweaver:.5,FavaBean:.25,BurrosTail:.2},oa={Pepper:.5,Banana:.6},ia=256,aa=.5,sa=2;function Ir(e){if(!e.length)return{muts:[],overlayMuts:[],selectedMuts:[],sig:""};let t=On(e),n=ju(e),o=Fu(e);return{muts:n,overlayMuts:o,selectedMuts:t,sig:`${t.join(",")}|${n.join(",")}|${o.join(",")}`}}function ju(e){let t=e.filter((r,i,a)=>tt[r]&&a.indexOf(r)===i);if(!t.length)return[];if(t.includes("Gold"))return["Gold"];if(t.includes("Rainbow"))return["Rainbow"];let n=["Ambershine","Dawnlit","Dawncharged","Ambercharged"];return t.some(r=>n.includes(r))?On(t.filter(r=>!Bu.includes(r))):On(t)}function Fu(e){let t=e.filter((n,o,r)=>tt[n]?.overlayTall&&r.indexOf(n)===o);return On(t)}function Dn(e,t){return e.map(n=>({name:n,meta:tt[n],overlayTall:tt[n]?.overlayTall??null,isTall:t}))}var zu={Gold:{op:"source-atop",colors:["rgb(235,200,0)"],a:.7},Rainbow:{op:"color",colors:["#FF1744","#FF9100","#FFEA00","#00E676","#2979FF","#D500F9"],ang:130,angTall:0,masked:!0},Wet:{op:"source-atop",colors:["rgb(50,180,200)"],a:.25},Chilled:{op:"source-atop",colors:["rgb(100,160,210)"],a:.45},Frozen:{op:"source-atop",colors:["rgb(100,130,220)"],a:.5},Dawnlit:{op:"source-atop",colors:["rgb(209,70,231)"],a:.5},Ambershine:{op:"source-atop",colors:["rgb(190,100,40)"],a:.5},Dawncharged:{op:"source-atop",colors:["rgb(140,80,200)"],a:.5},Ambercharged:{op:"source-atop",colors:["rgb(170,60,25)"],a:.5}};var Hn=(()=>{try{let t=document.createElement("canvas").getContext("2d");if(!t)return new Set;let n=["color","hue","saturation","luminosity","overlay","screen","lighter","source-atop"],o=new Set;for(let r of n)t.globalCompositeOperation=r,t.globalCompositeOperation===r&&o.add(r);return o}catch{return new Set}})();function Uu(e){return Hn.has(e)?e:Hn.has("overlay")?"overlay":Hn.has("screen")?"screen":Hn.has("lighter")?"lighter":"source-atop"}function Vu(e,t,n,o,r=!1){let i=(o-90)*Math.PI/180,a=t/2,s=n/2;if(!r){let c=Math.min(t,n)/2;return e.createLinearGradient(a-Math.cos(i)*c,s-Math.sin(i)*c,a+Math.cos(i)*c,s+Math.sin(i)*c)}let u=Math.cos(i),d=Math.sin(i),l=Math.abs(u)*t/2+Math.abs(d)*n/2;return e.createLinearGradient(a-u*l,s-d*l,a+u*l,s+d*l)}function la(e,t,n,o,r=!1){let i=o.colors?.length?o.colors:["#fff"],a=o.ang!=null?Vu(e,t,n,o.ang,r):e.createLinearGradient(0,0,0,n);i.length===1?(a.addColorStop(0,i[0]),a.addColorStop(1,i[0])):i.forEach((s,u)=>a.addColorStop(u/(i.length-1),s)),e.fillStyle=a,e.fillRect(0,0,t,n)}function ca(e,t,n,o){let r=zu[n];if(!r)return;let i={...r};n==="Rainbow"&&o&&i.angTall!=null&&(i.ang=i.angTall);let a=n==="Rainbow"&&o,s=t.width,u=t.height;e.save();let d=i.masked?Uu(i.op):"source-in";if(e.globalCompositeOperation=d,i.a!=null&&(e.globalAlpha=i.a),i.masked){let l=document.createElement("canvas");l.width=s,l.height=u;let c=l.getContext("2d");c.imageSmoothingEnabled=!1,la(c,s,u,i,a),c.globalCompositeOperation="destination-in",c.drawImage(t,0,0),e.drawImage(l,0,0)}else la(e,s,u,i,a);e.restore()}function ua(e){return/tallplant/i.test(e)}function Gn(e){let t=String(e||"").split("/");return t[t.length-1]||""}function da(e){switch(e){case"Ambershine":return["Ambershine","Amberlit"];case"Dawncharged":return["Dawncharged","Dawnbound"];case"Ambercharged":return["Ambercharged","Amberbound"];default:return[e]}}function $u(e,t){let n=String(e||"").toLowerCase();for(let o of t.keys()){let r=/sprite\/mutation-overlay\/([A-Za-z0-9]+)TallPlant/i.exec(String(o));if(!r||!r[1])continue;if(r[1].toLowerCase()===n){let a=t.get(o);if(a)return{tex:a,key:o}}}return null}function pa(e,t,n,o){if(!t)return null;let r=Gn(e),i=da(t);for(let a of i){let s=[`sprite/mutation/${a}${r}`,`sprite/mutation/${a}-${r}`,`sprite/mutation/${a}_${r}`,`sprite/mutation/${a}/${r}`,`sprite/mutation/${a}`];for(let u of s){let d=n.get(u);if(d)return{tex:d,key:u}}if(o){let u=`sprite/mutation-overlay/${a}TallPlant`,d=n.get(u);if(d)return{tex:d,key:u};let l=`sprite/mutation-overlay/${a}`,c=n.get(l);if(c)return{tex:c,key:l};let p=$u(t,n);if(p)return p}}return null}function ma(e,t,n,o){if(!t)return null;let r=tt[t];if(n&&r?.tallIconOverride){let s=o.get(r.tallIconOverride);if(s)return s}let i=Gn(e),a=da(t);for(let s of a){let u=[`sprite/mutation/${s}Icon`,`sprite/mutation/${s}`,`sprite/mutation/${s}${i}`,`sprite/mutation/${s}-${i}`,`sprite/mutation/${s}_${i}`,`sprite/mutation/${s}/${i}`];for(let d of u){let l=o.get(d);if(l)return l}if(n){let d=`sprite/mutation-overlay/${s}TallPlantIcon`,l=o.get(d);if(l)return l;let c=`sprite/mutation-overlay/${s}TallPlant`,p=o.get(c);if(p)return p}}return null}function ga(e,t,n){let o=e?.orig?.width??e?.frame?.width??e?.width??1,r=e?.orig?.height??e?.frame?.height??e?.height??1,i=e?.defaultAnchor?.x??0,a=e?.defaultAnchor?.y??0,s=oa[t]??i,u=r>o*1.5,d=ra[t]??(u?a:.4),l={x:(s-i)*o,y:(d-a)*r},c=Math.min(o,r),p=Math.min(1.5,c/ia),m=aa*p;return n&&(m*=sa),{width:o,height:r,anchorX:i,anchorY:a,offset:l,iconScale:m}}function Er(e,t,n,o,r){let i=Qi(o,e);if(i)return i;let a=null;try{if(t?.extract?.canvas){let s=new n.Sprite(e);a=t.extract.canvas(s),s.destroy?.({children:!0,texture:!1,baseTexture:!1})}}catch{}if(!a){let s=e?.frame||e?._frame,u=e?.orig||e?._orig,d=e?.trim||e?._trim,l=e?.rotate||e?._rotate||0,c=e?.baseTexture?.resource?.source||e?.baseTexture?.resource||e?.source?.resource?.source||e?.source?.resource||e?._source?.resource?.source||null;if(!s||!c)throw new Error("textureToCanvas fail");a=document.createElement("canvas");let p=Math.max(1,(u?.width??s.width)|0),m=Math.max(1,(u?.height??s.height)|0),f=d?.x??0,g=d?.y??0;a.width=p,a.height=m;let b=a.getContext("2d");b.imageSmoothingEnabled=!1,l===!0||l===2||l===8?(b.save(),b.translate(f+s.height/2,g+s.width/2),b.rotate(-Math.PI/2),b.drawImage(c,s.x,s.y,s.width,s.height,-s.width/2,-s.height/2,s.width,s.height),b.restore()):b.drawImage(c,s.x,s.y,s.width,s.height,f,g,s.width,s.height)}return Zi(o,e,a,r),a}function Ku(e,t,n,o,r,i,a,s){let{w:u,h:d,aX:l,aY:c,basePos:p}=t,m=[];for(let f of n){let g=new o.Sprite(e);g.anchor?.set?.(l,c),g.position.set(p.x,p.y),g.zIndex=1;let b=document.createElement("canvas");b.width=u,b.height=d;let h=b.getContext("2d");h.imageSmoothingEnabled=!1,h.save(),h.translate(u*l,d*c),h.drawImage(Er(e,r,o,i,a),-u*l,-d*c),h.restore(),ca(h,b,f.name,f.isTall);let S=o.Texture.from(b);s.push(S),g.texture=S,m.push(g)}return m}function qu(e,t,n,o,r,i,a,s,u,d){let{aX:l,basePos:c}=t,p=[];for(let m of n){let f=m.overlayTall&&o.get(m.overlayTall)&&{tex:o.get(m.overlayTall),key:m.overlayTall}||pa(e,m.name,o,!0);if(!f?.tex)continue;let g=Er(f.tex,i,r,a,s);if(!g)continue;let b=g.width,h={x:0,y:0},S={x:c.x-l*b,y:0},v=document.createElement("canvas");v.width=b,v.height=g.height;let y=v.getContext("2d");if(!y)continue;y.imageSmoothingEnabled=!1,y.drawImage(g,0,0),y.globalCompositeOperation="destination-in",y.drawImage(u,-S.x,-S.y);let k=r.Texture.from(v);d.push(k);let T=new r.Sprite(k);T.anchor?.set?.(h.x,h.y),T.position.set(S.x,S.y),T.scale.set(1),T.alpha=1,T.zIndex=3,p.push(T)}return p}function Ju(e,t,n,o,r,i){let{basePos:a}=t,s=[];for(let u of n){if(u.name==="Gold"||u.name==="Rainbow")continue;let d=ma(e,u.name,u.isTall,o);if(!d)continue;let l=new r.Sprite(d),c=d?.defaultAnchor?.x??.5,p=d?.defaultAnchor?.y??.5;l.anchor?.set?.(c,p),l.position.set(a.x+i.offset.x,a.y+i.offset.y),l.scale.set(i.iconScale),u.isTall&&(l.zIndex=-1),na.has(u.name)&&(l.zIndex=10),l.zIndex||(l.zIndex=2),s.push(l)}return s}function Lr(e,t,n,o){try{if(!e||!o.renderer||!o.ctors?.Container||!o.ctors?.Sprite||!o.ctors?.Texture)return null;let{Container:r,Sprite:i,Texture:a}=o.ctors,s=e?.orig?.width??e?.frame?.width??e?.width??1,u=e?.orig?.height??e?.frame?.height??e?.height??1,d=e?.defaultAnchor?.x??.5,l=e?.defaultAnchor?.y??.5,c={x:s*d,y:u*l},p=Er(e,o.renderer,o.ctors,o.cacheState,o.cacheConfig),m=new r;m.sortableChildren=!0;let f=new i(e);f.anchor?.set?.(d,l),f.position.set(c.x,c.y),f.zIndex=0,m.addChild(f);let g=ua(t),b=Dn(n.muts,g),h=Dn(n.overlayMuts,g),S=Dn(n.selectedMuts,g),v=[],y={w:s,h:u,aX:d,aY:l,basePos:c},k=Gn(t),T=ga(e,k,g);Ku(e,y,b,o.ctors,o.renderer,o.cacheState,o.cacheConfig,v).forEach(L=>m.addChild(L)),g&&qu(t,y,h,o.textures,o.ctors,o.renderer,o.cacheState,o.cacheConfig,p,v).forEach($=>m.addChild($)),Ju(t,y,S,o.textures,o.ctors,T).forEach(L=>m.addChild(L));let E=null;if(typeof o.renderer.generateTexture=="function"?E=o.renderer.generateTexture(m,{resolution:1}):o.renderer.textureGenerator?.generateTexture&&(E=o.renderer.textureGenerator.generateTexture({target:m,resolution:1})),!E)throw new Error("no render texture");let R=E instanceof a?E:a.from(o.renderer.extract.canvas(E));E&&E!==R&&E.destroy?.(!0),m.destroy({children:!0,texture:!1,baseTexture:!1});try{R.__mg_gen=!0,R.label=`${t}|${n.sig}`}catch{}return R}catch{return null}}function fa(e,t,n,o){if(!e||e.length<2)return null;let r=[];for(let i of e){let a=Lr(i,t,n,o);a&&r.push(a)}return r.length>=2?r:null}var Or={enabled:!0,maxEntries:500};function ha(){return{cache:new Map,maxEntries:Or.maxEntries}}function Rr(e,t){let n=t.scale??1,o=t.frameIndex??0,r=t.mutations?.slice().sort().join(",")||"",i=t.anchorX??.5,a=t.anchorY??.5,s=t.pad??2;return`${e}|s${n}|f${o}|m${r}|ax${i}|ay${a}|p${s}`}function Yu(e,t){let n=e.cache.get(t);return n?(n.lastAccess=performance.now(),n.canvas):null}function Xu(e,t,n,o){if(t.enabled){if(e.cache.size>=t.maxEntries){let r=null,i=1/0;for(let[a,s]of e.cache)s.lastAccess<i&&(i=s.lastAccess,r=a);r&&e.cache.delete(r)}e.cache.set(n,{canvas:o,lastAccess:performance.now()})}}function ba(e){let t=document.createElement("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");return n&&n.drawImage(e,0,0),t}function ya(e){e.cache.clear()}function va(e){return{size:e.cache.size,maxEntries:e.maxEntries}}function Qu(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0)})}async function xa(e,t,n,o,r,i,a,s=5,u=0){if(!t.ready||!i.enabled)return 0;let d=e.length,l=0;a?.(0,d);for(let c=0;c<d;c+=s){let p=e.slice(c,c+s);for(let m of p)try{let f=et(null,m,t.textures,t.animations),g=Rr(f,{scale:1});r.cache.has(g)||Nn(t,n,o,null,m,{scale:1},r,i),l++}catch{l++}a?.(l,d),c+s<d&&await Qu()}return l}function Zu(e){if(e.overlay)return e.overlay;let t=new e.ctors.Container;t.sortableChildren=!0,t.zIndex=99999999;try{e.app.stage.sortableChildren=!0}catch{}return e.app.stage.addChild(t),e.overlay=t,t}function ed(e){let t=e.defaultParent;if(!t)return null;try{return typeof t=="function"?t():t}catch{return null}}function Sa(e,t,n,o,r,i){if(!n.length)return t;let a=Ir(n);if(!a.sig)return t;let s=Pr(e,a),u=Ar(r,s);if(u?.tex)return u.tex;let d=Lr(t,e,a,{renderer:o.renderer,ctors:o.ctors,textures:o.textures,cacheState:r,cacheConfig:i});return d?(Mr(r,s,{isAnim:!1,tex:d},i),d):t}function wa(e,t,n,o,r,i){if(!n.length)return t;let a=Ir(n);if(!a.sig)return t;let s=Pr(e,a),u=Ar(r,s);if(u?.isAnim&&u.frames?.length)return u.frames;let d=fa(t,e,a,{renderer:o.renderer,ctors:o.ctors,textures:o.textures,cacheState:r,cacheConfig:i});return d?(Mr(r,s,{isAnim:!0,frames:d},i),d):t}function Dr(e,t,n,o,r,i={}){if(!e.ready)throw new Error("MGSprite not ready yet");let a=et(o,r,e.textures,e.animations),s=i.mutations||[],u=i.parent||ed(e)||Zu(e),d=e.renderer?.width||e.renderer?.view?.width||innerWidth,l=e.renderer?.height||e.renderer?.view?.height||innerHeight,c=i.center?d/2:i.x??d/2,p=i.center?l/2:i.y??l/2,m,f=e.animations.get(a);if(f&&f.length>=2){let h=wa(a,f,s,e,t,n),S=e.ctors.AnimatedSprite;if(S)m=new S(h),m.animationSpeed=i.fps?i.fps/60:i.speed??.15,m.loop=i.loop??!0,m.play();else{let v=new e.ctors.Sprite(h[0]),k=1e3/Math.max(1,i.fps||8),T=0,A=0,I=E=>{let R=e.app.ticker?.deltaMS??E*16.666666666666668;if(T+=R,T<k)return;let L=T/k|0;T%=k,A=(A+L)%h.length,v.texture=h[A]};v.__mgTick=I,e.app.ticker?.add?.(I),m=v}}else{let h=e.textures.get(a);if(!h)throw new Error(`Unknown sprite/anim key: ${a}`);let S=Sa(a,h,s,e,t,n);m=new e.ctors.Sprite(S)}let g=i.anchorX??m.texture?.defaultAnchor?.x??.5,b=i.anchorY??m.texture?.defaultAnchor?.y??.5;return m.anchor?.set?.(g,b),m.position.set(c,p),m.scale.set(i.scale??1),m.alpha=i.alpha??1,m.rotation=i.rotation??0,m.zIndex=i.zIndex??999999,u.addChild(m),e.live.add(m),m.__mgDestroy=()=>{try{m.__mgTick&&e.app.ticker?.remove?.(m.__mgTick)}catch{}try{m.destroy?.({children:!0,texture:!1,baseTexture:!1})}catch{try{m.destroy?.()}catch{}}e.live.delete(m)},m}function td(e,t){let n=e.renderer;if(n?.extract?.canvas)return n.extract.canvas(t);if(n?.plugins?.extract?.canvas)return n.plugins.extract.canvas(t);throw new Error("No extract.canvas available on renderer")}function Nn(e,t,n,o,r,i={},a,s){if(!e.ready)throw new Error("MGSprite not ready yet");let u=et(o,r,e.textures,e.animations);if(a&&s?.enabled){let y=Rr(u,i),k=Yu(a,y);if(k)return ba(k)}let d=i.mutations||[],l=e.animations.get(u),c=Math.max(0,(i.frameIndex??0)|0),p;if(l?.length){let y=wa(u,l,d,e,t,n);p=y[c%y.length]}else{let y=e.textures.get(u);if(!y)throw new Error(`Unknown sprite/anim key: ${u}`);p=Sa(u,y,d,e,t,n)}let m=new e.ctors.Sprite(p),f=i.anchorX??m.texture?.defaultAnchor?.x??.5,g=i.anchorY??m.texture?.defaultAnchor?.y??.5;m.anchor?.set?.(f,g),m.scale.set(i.scale??1);let b=i.pad??2,h=new e.ctors.Container;h.addChild(m);try{h.updateTransform?.()}catch{}let S=m.getBounds?.(!0)||{x:0,y:0,width:m.width,height:m.height};m.position.set(-S.x+b,-S.y+b);let v=td(e,h);try{h.destroy?.({children:!0})}catch{}if(a&&s?.enabled){let y=Rr(u,i);return Xu(a,s,y,v),ba(v)}return v}function Ta(e){for(let t of Array.from(e.live))t.__mgDestroy?.()}function ka(e,t){return e.defaultParent=t,!0}function Ca(e,t){return e.defaultParent=t,!0}function nd(){return{ready:!1,app:null,renderer:null,ctors:null,baseUrl:null,textures:new Map,animations:new Map,live:new Set,defaultParent:null,overlay:null,categoryIndex:null}}var _n=null,be=nd(),rd=Ji(),od={...qi},id=ha(),ad={...Or};function ye(){return be}function nt(){return rd}function St(){return od}function wt(){return id}function Wn(){return ad}function Hr(){return be.ready}async function Pa(){return be.ready?!0:_n||(_n=(async()=>{let e=performance.now();qe("init start");let t=await In(we.appReady,15e3,"PIXI app");qe("app ready");let n=await In(we.rendererReady,15e3,"PIXI renderer");qe("renderer ready"),be.app=t,be.renderer=n||t?.renderer||null,be.ctors=await $i(t),qe("constructors resolved"),be.baseUrl=await De.base(),qe("base url",be.baseUrl);let{textures:o,animations:r,categoryIndex:i}=await Ki(be.baseUrl,be.ctors);return be.textures=o,be.animations=r,be.categoryIndex=i,qe("atlases loaded","textures",be.textures.size,"animations",be.animations.size,"categories",be.categoryIndex?.size??0),be.ready=!0,qe("ready in",Math.round(performance.now()-e),"ms"),!0})(),_n)}function rt(){if(!Hr())throw new Error("MGSprite not ready yet")}function sd(e,t,n){return typeof t=="string"?Dr(ye(),nt(),St(),e,t,n||{}):Dr(ye(),nt(),St(),null,e,t||{})}function ld(e,t,n){return typeof t=="string"?Nn(ye(),nt(),St(),e,t,n||{},wt(),Wn()):Nn(ye(),nt(),St(),null,e,t||{},wt(),Wn())}function cd(){Ta(ye())}function ud(e){return ka(ye(),e)}function dd(e){return Ca(ye(),e)}function pd(e,t){let n=ye(),o=typeof t=="string"?et(e,t,n.textures,n.animations):et(null,e,n.textures,n.animations);return n.textures.has(o)||n.animations.has(o)}function md(){rt();let e=ye().categoryIndex;return e?Array.from(e.keys()).sort((t,n)=>t.localeCompare(n)):[]}function gd(e){rt();let t=String(e||"").trim();if(!t)return[];let n=ye().categoryIndex;return n?Array.from(n.get(t)?.values()||[]):[]}function fd(e,t){rt();let n=String(e||"").trim(),o=String(t||"").trim();if(!n||!o)return!1;let r=ye().categoryIndex;if(!r)return!1;let i=n.toLowerCase(),a=o.toLowerCase();for(let[s,u]of r.entries())if(s.toLowerCase()===i){for(let d of u.values())if(d.toLowerCase()===a)return!0}return!1}function bd(e){rt();let t=ye().categoryIndex;if(!t)return[];let n=String(e||"").trim().toLowerCase(),o=[];for(let[r,i]of t.entries())for(let a of i.values()){let s=xt(r,a);(!n||s.toLowerCase().startsWith(n))&&o.push(s)}return o.sort((r,i)=>r.localeCompare(i))}function hd(e){rt();let t=String(e||"").trim();if(!t)return null;let n=zt(t),o=/^sprite\/([^/]+)\/(.+)$/.exec(n);if(!o)return null;let r=o[1],i=o[2],a=ye().categoryIndex,s=r.toLowerCase(),u=i.toLowerCase(),d=r,l=i;if(a){let c=Array.from(a.keys()).find(f=>f.toLowerCase()===s);if(!c)return null;d=c;let p=a.get(c);if(!p)return null;let m=Array.from(p.values()).find(f=>f.toLowerCase()===u);if(!m)return null;l=m}return{category:d,id:l,key:xt(d,l)}}function yd(e,t){rt();let n=String(e||"").trim(),o=String(t||"").trim();if(!n||!o)throw new Error("getIdPath(category, id) requires both category and id");let r=ye().categoryIndex;if(!r)throw new Error("Sprite categories not indexed");let i=n.toLowerCase(),a=o.toLowerCase(),s=Array.from(r.keys()).find(l=>l.toLowerCase()===i)||n,u=r.get(s);if(!u)throw new Error(`Unknown sprite category: ${n}`);let d=Array.from(u.values()).find(l=>l.toLowerCase()===a)||o;if(!u.has(d))throw new Error(`Unknown sprite id: ${n}/${o}`);return xt(s,d)}function vd(){Xi(nt())}function xd(){ya(wt())}function Sd(){return va(wt())}function wd(){return[...ta]}async function Td(e,t,n=10,o=0){return rt(),xa(e,ye(),nt(),St(),wt(),Wn(),t,n,o)}var pe={init:Pa,ready:Hr,show:sd,toCanvas:ld,clear:cd,attach:ud,attachProvider:dd,has:pd,key:(e,t)=>xt(e,t),getCategories:md,getCategoryId:gd,hasId:fd,listIds:bd,getIdInfo:hd,getIdPath:yd,clearMutationCache:vd,clearToCanvasCache:xd,getToCanvasCacheStats:Sd,getMutationNames:wd,warmup:Td};Fe();var Nr=P,ze=Nr.Object??Object,_r=ze.keys,Bn=ze.values,jn=ze.entries,ot={items:["WateringCan","PlanterPot","Shovel"],decor:["SmallRock","MediumRock","LargeRock","WoodBench","StoneBench","MarbleBench"],mutations:["Gold","Rainbow","Wet","Chilled","Frozen"],eggs:["CommonEgg","UncommonEgg","RareEgg"],pets:["Worm","Snail","Bee","Chicken","Bunny"],abilities:["ProduceScaleBoost","DoubleHarvest","SeedFinderI","CoinFinderI"],plants:["Carrot","Strawberry","Aloe","Blueberry","Apple"]},kd=["Rain","Frost","Dawn","AmberMoon"],Aa=/main-[^/]+\.js(\?|$)/,Cd=3,Pd=200,Ad=50,Ma=new WeakSet,q={isReady:!1,isHookInstalled:!1,data:{items:null,decor:null,mutations:null,eggs:null,pets:null,abilities:null,plants:null,weather:null},spritesResolved:!1,spritesResolving:null,weatherPollingTimer:null,weatherPollAttempts:0},it=(e,t)=>t.every(n=>e.includes(n));function at(e,t){q.data[e]==null&&(q.data[e]=t,Md()&&La())}function Md(){return Object.values(q.data).every(e=>e!=null)}function Ia(e,t){if(!e||typeof e!="object"||Ma.has(e))return;Ma.add(e);let n;try{n=_r(e)}catch{return}if(!n||n.length===0)return;let o=e,r;if(!q.data.items&&it(n,ot.items)&&(r=o.WateringCan,r&&typeof r=="object"&&"coinPrice"in r&&"creditPrice"in r&&at("items",o)),!q.data.decor&&it(n,ot.decor)&&(r=o.SmallRock,r&&typeof r=="object"&&"coinPrice"in r&&"creditPrice"in r&&at("decor",o)),!q.data.mutations&&it(n,ot.mutations)&&(r=o.Gold,r&&typeof r=="object"&&"baseChance"in r&&"coinMultiplier"in r&&at("mutations",o)),!q.data.eggs&&it(n,ot.eggs)&&(r=o.CommonEgg,r&&typeof r=="object"&&"faunaSpawnWeights"in r&&"secondsToHatch"in r&&at("eggs",o)),!q.data.pets&&it(n,ot.pets)&&(r=o.Worm,r&&typeof r=="object"&&"coinsToFullyReplenishHunger"in r&&"diet"in r&&Array.isArray(r.diet)&&at("pets",o)),!q.data.abilities&&it(n,ot.abilities)&&(r=o.ProduceScaleBoost,r&&typeof r=="object"&&"trigger"in r&&"baseParameters"in r&&at("abilities",o)),!q.data.plants&&it(n,ot.plants)&&(r=o.Carrot,r&&typeof r=="object"&&"seed"in r&&"plant"in r&&"crop"in r&&at("plants",o)),!(t>=Cd))for(let i of n){let a;try{a=o[i]}catch{continue}a&&typeof a=="object"&&Ia(a,t+1)}}function Gr(e){try{Ia(e,0)}catch{}}function Ea(){if(!q.isHookInstalled){q.isHookInstalled=!0;try{ze.keys=function(t){return Gr(t),_r.apply(this,arguments)},Bn&&(ze.values=function(t){return Gr(t),Bn.apply(this,arguments)}),jn&&(ze.entries=function(t){return Gr(t),jn.apply(this,arguments)})}catch{}}}function La(){if(q.isHookInstalled){try{ze.keys=_r,Bn&&(ze.values=Bn),jn&&(ze.entries=jn)}catch{}q.isHookInstalled=!1}}function Id(){try{for(let e of Nr.document?.scripts||[]){let t=e?.src?String(e.src):"";if(Aa.test(t))return t}}catch{}try{for(let e of Nr.performance?.getEntriesByType?.("resource")||[]){let t=e?.name?String(e.name):"";if(Aa.test(t))return t}}catch{}return null}function Ed(e,t){let n=Math.max(e.lastIndexOf("const ",t),e.lastIndexOf("let ",t),e.lastIndexOf("var ",t));if(n<0)return null;let o=e.indexOf("=",n);if(o<0||o>t)return null;let r=e.indexOf("{",o);if(r<0||r>t)return null;let i=0,a="",s=!1;for(let u=r;u<e.length;u++){let d=e[u];if(a){if(s){s=!1;continue}if(d==="\\"){s=!0;continue}d===a&&(a="");continue}if(d==='"'||d==="'"){a=d;continue}if(d==="{")i++;else if(d==="}"&&--i===0)return e.slice(r,u+1)}return null}function Ld(e){let t={},n=!1;for(let o of kd){let r=e?.[o];if(!r||typeof r!="object")continue;let i=r.iconSpriteKey||null,{iconSpriteKey:a,...s}=r;t[o]={weatherId:o,spriteId:i,...s},n=!0}return t.Sunny||(t.Sunny={weatherId:"Sunny",name:"Sunny",spriteId:"sprite/ui/SunnyIcon",type:"primary"}),!n||t.Rain&&t.Rain.mutator?.mutation!=="Wet"?null:t}async function Rd(){if(q.data.weather)return!0;let e=Id();if(!e)return!1;let t="";try{let s=await fetch(e,{credentials:"include"});if(!s.ok)return!1;t=await s.text()}catch{return!1}let n=t.indexOf("fixedTimeSlots:[0,48,96,144,192,240]");if(n<0&&(n=t.indexOf('name:"Amber Moon"')),n<0)return!1;let o=Ed(t,n);if(!o)return!1;let r=o.replace(/\b[A-Za-z_$][\w$]*\.(Rain|Frost|Dawn|AmberMoon)\b/g,'"$1"'),i;try{i=Function('"use strict";return('+r+")")()}catch{return!1}let a=Ld(i);return a?(q.data.weather=a,!0):!1}function Od(){if(q.weatherPollingTimer)return;q.weatherPollAttempts=0;let e=setInterval(async()=>{(await Rd()||++q.weatherPollAttempts>Pd)&&(clearInterval(e),q.weatherPollingTimer=null)},Ad);q.weatherPollingTimer=e}function Dd(e){return String(e||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^A-Za-z0-9]/g,"").trim()}function Hd(e,t=[]){let n=new Set,o=r=>{let i=String(r||"").trim();i&&n.add(i)};o(e);for(let r of t)o(r);for(let r of Array.from(n.values()))r.endsWith("s")?o(r.slice(0,-1)):o(`${r}s`),r.endsWith("es")&&o(r.slice(0,-2));return Array.from(n.values()).filter(Boolean)}function Ra(e,t,n,o=[],r=[]){let i=Hd(e,o);if(!i.length)return null;let a=[t,...r].filter(l=>typeof l=="string"),s=l=>{let c=String(l||"").trim();if(!c)return null;for(let p of i)try{if(pe.has(p,c))return pe.getIdPath(p,c)}catch{}return null};for(let l of a){let c=s(l);if(c)return c}let u=Dd(n||""),d=s(u||n||"");if(d)return d;try{for(let l of i){let c=pe.listIds(`sprite/${l}/`),p=a.map(f=>String(f||"").toLowerCase()),m=String(n||u||"").toLowerCase();for(let f of c){let b=(f.split("/").pop()||"").toLowerCase();if(p.some(h=>h&&h===b)||b===m)return f}for(let f of c){let b=(f.split("/").pop()||"").toLowerCase();if(p.some(h=>h&&b.includes(h))||m&&b.includes(m))return f}}}catch{}return null}function Oe(e,t,n,o,r=[],i=[]){if(!e||typeof e!="object")return;let a=e.tileRef;if(!a||typeof a!="object")return;let s=String(a.spritesheet||t||"").trim(),u=Ra(s,n,o,r,i);if(u)try{e.spriteId=u}catch{}let d=e.rotationVariants;if(d&&typeof d=="object")for(let l of Object.values(d))Oe(l,s,n,o);if(e.immatureTileRef){let l={tileRef:e.immatureTileRef};Oe(l,s,n,o),l.spriteId&&(e.immatureSpriteId=l.spriteId)}if(e.topmostLayerTileRef){let l={tileRef:e.topmostLayerTileRef};Oe(l,s,n,o),l.spriteId&&(e.topmostLayerSpriteId=l.spriteId)}e.activeState&&typeof e.activeState=="object"&&Oe(e.activeState,s,n,e.activeState?.name||o)}function Gd(e,t,n,o=[]){if(!Array.isArray(t)||t.length===0)return null;let r=t[0],i=t.slice(1);return Ra(e,r,n??null,o,i)}function Nd(e){for(let[t,n]of Object.entries(e.items||{}))Oe(n,"items",t,n?.name,["item"]);for(let[t,n]of Object.entries(e.decor||{}))Oe(n,"decor",t,n?.name);for(let[t,n]of Object.entries(e.mutations||{})){Oe(n,"mutations",t,n?.name,["mutation"]);let o=Gd("mutation-overlay",[`${t}TallPlant`,`${t}TallPlantIcon`,t],n?.name,["mutation-overlay"]);if(o)try{n.overlaySpriteId=o}catch{}}for(let[t,n]of Object.entries(e.eggs||{}))Oe(n,"pets",t,n?.name,["pet"]);for(let[t,n]of Object.entries(e.pets||{}))Oe(n,"pets",t,n?.name,["pet"]);for(let[t,n]of Object.entries(e.plants||{})){let o=n;o.seed&&Oe(o.seed,o.seed?.tileRef?.spritesheet||"seeds",`${t}Seed`,o.seed?.name||`${t} Seed`,["seed","plant","plants"],[t]),o.plant&&Oe(o.plant,o.plant?.tileRef?.spritesheet||"plants",`${t}Plant`,o.plant?.name||`${t} Plant`,["plant","plants","tallplants"],[t]),o.crop&&Oe(o.crop,o.crop?.tileRef?.spritesheet||"plants",t,o.crop?.name||t,["plant","plants"],[`${t}Crop`])}}async function Oa(){if(!q.spritesResolved)return q.spritesResolving||(q.spritesResolving=(async()=>{try{await Da(2e4,50),await pe.init(),Nd(q.data),q.spritesResolved=!0}catch(e){try{console.warn("[MGData] sprite resolution failed",e)}catch{}}finally{q.spritesResolving=null}})()),q.spritesResolving}async function _d(){return q.isReady||(Ea(),Od(),Oa(),q.isReady=!0),!0}function Wd(){return q.isReady}function Bd(){return La(),q.weatherPollingTimer&&(clearInterval(q.weatherPollingTimer),q.weatherPollingTimer=null),q.isReady=!1,!0}function jd(){return!q.spritesResolved&&!q.spritesResolving&&Oa(),{...q.data}}function Fd(e){return q.data[e]??null}function zd(e){return q.data[e]!=null}async function Da(e=1e4,t=50){let n=Date.now();for(;Date.now()-n<e;){if(Object.values(q.data).some(o=>o!=null))return{...q.data};await je(t)}throw new Error("MGData.waitForAnyData: timeout")}async function Ud(e,t=1e4,n=50){let o=Date.now();for(;Date.now()-o<t;){let r=q.data[e];if(r!=null)return r;await je(n)}throw new Error(`MGData.waitFor: timeout waiting for "${e}"`)}var me={init:_d,isReady:Wd,stop:Bd,getAll:jd,get:Fd,has:zd,waitForAnyData:Da,waitFor:Ud};Ea();var Vd={expanded:!1,sort:{key:null,dir:null},search:""},$d={categories:{}};async function Ha(){let e=await Ht("tab-test",{version:2,defaults:$d,sanitize:i=>({categories:i.categories&&typeof i.categories=="object"?i.categories:{}})});function t(i){return e.get().categories[i]||{...Vd}}function n(i,a){let s=e.get(),u=t(i);e.update({categories:{...s.categories,[i]:{...u,expanded:a}}})}function o(i,a,s){let u=e.get(),d=t(i);e.update({categories:{...u.categories,[i]:{...d,sort:{key:a,dir:s}}}})}function r(i,a){let s=e.get(),u=t(i);e.update({categories:{...s.categories,[i]:{...u,search:a}}})}return{get:e.get,set:e.set,save:e.save,getCategoryState:t,setCategoryExpanded:n,setCategorySort:o,setCategorySearch:r}}var Kd={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function Fn(e){return e?Kd[e]??0:0}var zn=class extends Xe{constructor(){super({id:"tab-test",label:"Test"});se(this,"stateCtrl",null)}async build(n){this.stateCtrl=await Ha();let o=this.createContainer("test-section");o.style.display="flex",o.style.flexDirection="column",o.style.gap="12px",n.appendChild(o),await this.buildSpriteTables(o)}renderSprite(n){let o=w("div",{style:"display:flex;align-items:center;justify-content:center;width:32px;height:32px;"});if(n.spriteId){let r=n.spriteId;requestAnimationFrame(()=>{try{let i=pe.toCanvas(r,{scale:1});i.style.maxWidth="32px",i.style.maxHeight="32px",i.style.objectFit="contain",o.appendChild(i)}catch{o.textContent="-"}})}else o.textContent="-";return o}renderRarity(n){if(!n.rarity){let r=w("span",{style:"opacity:0.5;"});return r.textContent="\u2014",r}return Hi({variant:"rarity",rarity:n.rarity,size:"sm"}).root}createDataCard(n,o,r,i){let a=this.stateCtrl.getCategoryState(n),s=p=>{if(!p)return r;let m=p.toLowerCase();return r.filter(f=>f.name.toLowerCase().includes(m))},u=Oi({columns:i,data:s(a.search),pageSize:0,compact:!0,maxHeight:"calc(var(--lg-row-h, 40px) * 6)",getRowId:p=>p.spriteId,onSortChange:(p,m)=>{this.stateCtrl.setCategorySort(n,p,m)}});a.sort.key&&a.sort.dir&&u.sortBy(a.sort.key,a.sort.dir);let d=Di({placeholder:"Search...",value:a.search,debounceMs:150,withClear:!0,size:"sm",focusKey:"",onChange:p=>{let m=p.trim();this.stateCtrl.setCategorySearch(n,m),u.setData(s(m))}}),l=w("div",{style:"margin-bottom:8px;"});l.appendChild(d.root);let c=w("div");return c.appendChild(l),c.appendChild(u.root),Qe({title:o,subtitle:`${r.length} entries`,variant:"soft",padding:"sm",expandable:!0,defaultExpanded:a.expanded,onExpandChange:p=>{this.stateCtrl.setCategoryExpanded(n,p)}},c)}formatCategoryName(n){return n.split("-").map(o=>o.charAt(0).toUpperCase()+o.slice(1)).join(" ")}findPlantBySprite(n,o){let r=me.get("plants");if(!r)return null;for(let a of Object.values(r))if(a?.seed?.spriteId===n||a?.plant?.spriteId===n||a?.crop?.spriteId===n)return a;let i=o.toLowerCase();for(let a of Object.values(r)){let s=(a?.seed?.name||"").toLowerCase();if(s===i||s===`${i} seed`)return a}return null}findPetBySpriteId(n){let o=me.get("pets");if(!o)return null;for(let r of Object.values(o))if(r?.spriteId===n)return r;return null}findItemBySpriteId(n){let o=me.get("items");if(!o)return null;for(let r of Object.values(o))if(r?.spriteId===n)return r;return null}findDecorBySpriteId(n){let o=me.get("decor");if(!o)return null;for(let r of Object.values(o))if(r?.spriteId===n)return r;return null}findEggBySpriteId(n){let o=me.get("eggs");if(!o)return null;for(let r of Object.values(o))if(r?.spriteId===n)return r;return null}getRarityForSprite(n,o,r){let i=n.toLowerCase();if(i==="plant"||i==="seed"||i==="tallplant"){let a=this.findPlantBySprite(o,r);if(a?.seed?.rarity)return a.seed.rarity}if(i==="pet"){let a=this.findPetBySpriteId(o);if(a?.rarity)return a.rarity}if(i==="item"){let a=this.findItemBySpriteId(o);if(a?.rarity)return a.rarity}if(i==="decor"){let a=this.findDecorBySpriteId(o);if(a?.rarity)return a.rarity}if(i==="egg"){let a=this.findEggBySpriteId(o);if(a?.rarity)return a.rarity}return null}yieldToMain(n=0){return new Promise(o=>{n>0?setTimeout(o,n):typeof requestIdleCallback<"u"?requestIdleCallback(()=>o(),{timeout:50}):setTimeout(o,4)})}async buildSpriteTables(n){let o=[{key:"name",header:"Name",sortable:!0,width:"1fr",sortFn:(i,a)=>i.name.localeCompare(a.name,void 0,{numeric:!0,sensitivity:"base"})},{key:"rarity",header:"Rarity",sortable:!0,width:"100px",align:"center",render:i=>this.renderRarity(i),sortFn:(i,a)=>Fn(i.rarity)-Fn(a.rarity)},{key:"sprite",header:"Sprite",width:"60px",align:"center",render:i=>this.renderSprite(i)}];if(!pe.ready())try{await pe.init()}catch{return}let r=pe.getCategories();for(let i=0;i<r.length;i++){await this.yieldToMain(8);let a=r[i],u=pe.getCategoryId(a).map(d=>{let l=`sprite/${a}/${d}`;return{name:d,spriteId:l,rarity:this.getRarityForSprite(a,l,d)}});if(u.sort((d,l)=>Fn(d.rarity)-Fn(l.rarity)),u.length>0){let d=this.createDataCard(a,this.formatCategoryName(a),u,o);n.appendChild(d)}}}};var Wr=null;function Ga(){return Wr||(Wr=new zn),Wr}async function Br(){await Ga().preload()}function jr(e){return[new Pn(e),Ga()]}function Fr(e){let{shadow:t,initialOpen:n}=e,o=w("div",{className:"gemini-panel",id:"panel",ariaHidden:String(!n)}),r=w("div",{className:"gemini-tabbar"}),i=w("div",{className:"gemini-content",id:"content"}),a=w("div",{className:"gemini-resizer",title:"Resize"}),s=w("button",{className:"gemini-close",title:"Fermer",ariaLabel:"Fermer"},"\u2715");o.append(r,i,a);let u=w("div",{className:"gemini-wrapper"},o);return t.append(u),{panel:o,tabbar:r,content:i,resizer:a,closeButton:s,wrapper:u}}function zr(e){let{resizer:t,host:n,panel:o,shadow:r,onWidthChange:i,initialWidth:a,minWidth:s,maxWidth:u}=e,d=s,l=u;function c(){let k=Pe.detect(),T=Math.round(P.visualViewport?.width??P.innerWidth??0);if(k.platform==="mobile"||k.os==="ios"||k.os==="android"){let A=getComputedStyle(r.host),I=parseFloat(A.getPropertyValue("--inset-l"))||0,E=parseFloat(A.getPropertyValue("--inset-r"))||0,R=Math.max(280,T-Math.round(I+E)),L=Math.min(420,Math.max(300,Math.floor(T*.66))),$=R;d=Math.min(L,R),l=$}else d=s,l=u;return{min:d,max:l}}function p(k){return Math.max(d,Math.min(l,Number(k)||a))}function m(k){let T=p(k);n.style.setProperty("--w",`${T}px`),i(T)}c();let f=Pe.detect(),g=!(f.platform==="mobile"||f.os==="ios"||f.os==="android"),b=!1,h=k=>{if(!b)return;k.preventDefault();let T=Math.round(P.innerWidth-k.clientX);m(T)},S=()=>{b&&(b=!1,document.body.style.cursor="",P.removeEventListener("mousemove",h),P.removeEventListener("mouseup",S))},v=k=>{g&&(k.preventDefault(),b=!0,document.body.style.cursor="ew-resize",P.addEventListener("mousemove",h),P.addEventListener("mouseup",S))};t.addEventListener("mousedown",v);function y(){t.removeEventListener("mousedown",v),P.removeEventListener("mousemove",h),P.removeEventListener("mouseup",S)}return{calculateResponsiveBounds:c,constrainWidthToLimits:p,setHudWidth:m,destroy:y}}function Ur(e){let{panel:t,onToggle:n,onClose:o,toggleCombo:r=u=>u.ctrlKey&&u.shiftKey&&u.key.toLowerCase()==="u",closeOnEscape:i=!0}=e;function a(u){let d=t.classList.contains("open");if(i&&u.key==="Escape"&&d){o();return}r(u)&&(u.preventDefault(),u.stopPropagation(),n())}document.addEventListener("keydown",a,{capture:!0});function s(){document.removeEventListener("keydown",a,{capture:!0})}return{destroy:s}}var Na=`
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
`;var Vr=`
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
`;var $r=`
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
`;var Kr=`
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
`;function qr(e,t,n){if(e.querySelector(`style[data-style-id="${n}"]`))return;let o=document.createElement("style");o.setAttribute("data-style-id",n),o.textContent=t,e.appendChild(o)}var _a=`
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
  
`;var Wa=`
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
`;var ja=`
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
`;var za=`
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
`;var Ua=`
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
`;var Va=`
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
`;var $a=`
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
`;var Ka=`
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
`;var qa=`
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
`;var Ja=`
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
`;var Ya=`
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
`;var Xa=`
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
`;var Qa=`
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
`;var Za=`
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
`;var es=`
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
`;var qd={all:"initial",position:"fixed",top:"0",right:"0",zIndex:"2147483647",pointerEvents:"auto",fontFamily:'system-ui, -apple-system, "Segoe UI", Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',fontSize:"13px",lineHeight:"1.35"};function Jd(e="gemini-root"){let t=document.createElement("div");t.id=e,Object.assign(t.style,qd),(document.body||document.documentElement).appendChild(t);let n=t.attachShadow({mode:"open"});return{host:t,shadow:n}}function Yd(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:16}):setTimeout(e,0)})}async function Jr(e){let{hostId:t="gemini-hud-root",initialWidth:n,initialOpen:o,onWidthChange:r,onOpenChange:i,themes:a,initialTheme:s,onThemeChange:u,buildSections:d,initialTab:l,onTabChange:c,toggleCombo:p=C=>C.ctrlKey&&C.shiftKey&&C.key.toLowerCase()==="u",closeOnEscape:m=!0,minWidth:f=420,maxWidth:g=720}=e,{host:b,shadow:h}=Jd(t),S=[[Vr,"variables"],[$r,"primitives"],[Kr,"utilities"],[Na,"hud"],[_a,"card"],[Wa,"badge"],[Ba,"button"],[ja,"input"],[Fa,"label"],[za,"navTabs"],[Ua,"searchBar"],[Va,"select"],[$a,"switch"],[Ka,"table"],[qa,"timeRangePicker"],[Ja,"tooltip"],[Ya,"slider"],[Xa,"reorderableList"],[Qa,"colorPicker"],[Za,"log"],[es,"settings"]];for(let C=0;C<S.length;C++){let[O,D]=S[C];qr(h,O,D),C%5===4&&await Yd()}let{panel:v,tabbar:y,content:k,resizer:T,closeButton:A,wrapper:I}=Fr({shadow:h,initialOpen:o});function E(C){v.dispatchEvent(new CustomEvent("gemini:hud-open-change",{detail:{isOpen:C},bubbles:!0})),i?.(C)}function R(C){let O=v.classList.contains("open");v.classList.toggle("open",C),v.setAttribute("aria-hidden",C?"false":"true"),C!==O&&E(C)}R(o),A.addEventListener("click",C=>{C.preventDefault(),C.stopPropagation(),R(!1)});let L=vr({host:b,themes:a,initialTheme:s,onThemeChange:u}),$=zr({resizer:T,host:b,panel:v,shadow:h,onWidthChange:r||(()=>{}),initialWidth:n,minWidth:f,maxWidth:g});$.setHudWidth(n);let ne=d({applyTheme:L.applyTheme,initialTheme:s,getCurrentTheme:L.getCurrentTheme,setHUDWidth:$.setHudWidth,setHUDOpen:R}),K=new Ot(ne,k,{applyTheme:L.applyTheme,getCurrentTheme:L.getCurrentTheme}),Y=ne.map(C=>({id:C.id,label:C.label})),ae=fi(Y,l||Y[0]?.id||"",C=>{K.activate(C),c?.(C)});ae.root.style.flex="1 1 auto",ae.root.style.minWidth="0",y.append(ae.root,A),K.activate(l||Y[0]?.id||"");let N=Ur({panel:v,onToggle:()=>R(!v.classList.contains("open")),onClose:()=>R(!1),toggleCombo:p,closeOnEscape:m}),G=()=>{ae.recalc();let C=parseInt(getComputedStyle(b).getPropertyValue("--w"))||n;$.calculateResponsiveBounds(),$.setHudWidth(C)};P.addEventListener("resize",G);function H(){N.destroy(),$.destroy(),P.removeEventListener("resize",G)}return{host:b,shadow:h,wrapper:I,panel:v,content:k,setOpen:R,setWidth:$.setHudWidth,sections:ne,manager:K,nav:ae,destroy:H}}var Tt={isOpen:"gemini.hud.isOpen",width:"gemini.hud.width",theme:"gemini.hud.theme",activeTab:"gemini.hud.activeTab"},Ut={isOpen:!1,width:480,theme:"dark",activeTab:"tab-settings"};function Yr(){return{isOpen:$e(Tt.isOpen,Ut.isOpen),width:$e(Tt.width,Ut.width),theme:$e(Tt.theme,Ut.theme),activeTab:$e(Tt.activeTab,Ut.activeTab)}}function kt(e,t){Dt(Tt[e],t)}var Xd="https://i.imgur.com/IMkhMur.png",Qd="Stats";function Un(e){let t=e.iconUrl||Xd,n=e.ariaLabel||"Open MGH",o=null,r=null,i=null,a=!1,s=null,u=null,d=["Chat","Leaderboard","Stats","Open Activity Log"],l=v=>{try{return typeof CSS<"u"&&CSS&&typeof CSS.escape=="function"?CSS.escape(v):v.replace(/"/g,'\\"')}catch{return v}};function c(){let v=document.querySelector(d.map(k=>`button[aria-label="${l(k)}"]`).join(","));if(!v)return null;let y=v.parentElement;for(;y&&y!==document.body;){if(d.reduce((T,A)=>T+y.querySelectorAll(`button[aria-label="${l(A)}"]`).length,0)>=2)return y;y=y.parentElement}return null}function p(v){return v}function m(v){let y=Array.from(v.querySelectorAll("button[aria-label]"));if(!y.length)return{refBtn:null,refWrapper:null};let k=y.filter($=>$.dataset.mghBtn!=="true"&&($.getAttribute("aria-label")||"")!==(e.ariaLabel||"Open MGH")),T=k.length?k:y,A=T.find($=>($.getAttribute("aria-label")||"").toLowerCase()===Qd.toLowerCase())||null,I=T.length>=2?T.length-2:T.length-1,E=A||T[I],R=E.parentElement,L=R&&R.parentElement===v&&R.tagName==="DIV"?R:null;return{refBtn:E,refWrapper:L}}function f(v,y,k){let T=v.cloneNode(!1);T.type="button",T.setAttribute("aria-label",y),T.title=y,T.dataset.mghBtn="true",T.style.pointerEvents="auto",T.removeAttribute("id");let A=document.createElement("img");return A.src=k,A.alt="MGH",A.style.pointerEvents="none",A.style.userSelect="none",A.style.width="76%",A.style.height="76%",A.style.objectFit="contain",A.style.display="block",A.style.margin="auto",T.appendChild(A),T.addEventListener("click",I=>{I.preventDefault(),I.stopPropagation();try{e.onClick?.()}catch{}}),T}function g(){if(a)return!1;a=!0;let v=!1;try{let y=c();if(!y)return!1;s!==y&&(s=y);let{refBtn:k,refWrapper:T}=m(y);if(!k)return!1;r=y.querySelector('div[data-mgh-wrapper="true"]'),!r&&T&&(r=T.cloneNode(!1),r.dataset.mghWrapper="true",r.removeAttribute("id"),v=!0);let A=r?.querySelector('button[data-mgh-btn="true"]')||null;o||(o=A),o||(o=f(k,n,t),r?r.appendChild(o):o.parentElement!==y&&y.appendChild(o),v=!0),r&&r.parentElement!==y&&(y.appendChild(r),v=!0);let I=y;if(I&&I!==u){try{S.disconnect()}catch{}u=I,S.observe(u,{childList:!0,subtree:!0})}return v}finally{a=!1}}g();let b=document.getElementById("App")||document.body,h=null,S=new MutationObserver(v=>{let y=v.every(T=>{let A=Array.from(T.addedNodes||[]),I=Array.from(T.removedNodes||[]),E=A.concat(I);if(E.length===0){let R=T.target;return r&&(R===r||r.contains(R))||o&&(R===o||o.contains(R))}return E.every(R=>!!(!(R instanceof HTMLElement)||r&&(R===r||r.contains(R))||o&&(R===o||o.contains(R))))}),k=v.some(T=>Array.from(T.removedNodes||[]).some(A=>A instanceof HTMLElement?!!(r&&(A===r||r.contains(A))||o&&(A===o||o.contains(A))):!1));y&&!k||h===null&&(h=window.setTimeout(()=>{if(h=null,g()&&r){let A=r.parentElement;A&&A.lastElementChild!==r&&A.appendChild(r)}},150))});return S.observe(b,{childList:!0,subtree:!0}),i=()=>S.disconnect(),()=>{try{i?.()}catch{}try{r?.remove()}catch{}}}var Ce={nativeCtor:null,captured:[],latestOpen:null},ts=Symbol.for("ariesmod.ws.capture.wrapped"),ns=Symbol.for("ariesmod.ws.capture.native"),rs=1;function Xr(e){return!!e&&e.readyState===rs}function Zd(){if(Xr(Ce.latestOpen))return Ce.latestOpen;for(let e=Ce.captured.length-1;e>=0;e--){let t=Ce.captured[e];if(Xr(t))return t}return null}function ep(e,t){Ce.captured.push(e),Ce.captured.length>25&&Ce.captured.splice(0,Ce.captured.length-25);let n=()=>{Ce.latestOpen=e,t&&console.log("[WS] captured socket opened",e.url)};e.addEventListener("open",n),e.addEventListener("close",()=>{Ce.latestOpen===e&&(Ce.latestOpen=null),t&&console.log("[WS] captured socket closed",e.url)}),e.readyState===rs&&n()}function os(e=P,t={}){let n=!!t.debug,o=e?.WebSocket;if(typeof o!="function")return()=>{};if(o[ts])return Ce.nativeCtor=o[ns]??Ce.nativeCtor??null,()=>{};let r=o;Ce.nativeCtor=r;function i(a,s){let u=s!==void 0?new r(a,s):new r(a);try{ep(u,n)}catch{}return u}try{i.prototype=r.prototype}catch{}try{Object.setPrototypeOf(i,r)}catch{}try{i.CONNECTING=r.CONNECTING,i.OPEN=r.OPEN,i.CLOSING=r.CLOSING,i.CLOSED=r.CLOSED}catch{}i[ts]=!0,i[ns]=r;try{e.WebSocket=i,n&&console.log("[WS] WebSocket capture installed")}catch{return()=>{}}return()=>{try{e.WebSocket===i&&(e.WebSocket=r)}catch{}}}function tp(e=P){let t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function Vt(e=P){let t=Zd();if(t)return{ws:t,source:"captured"};let n=tp(e);return n?{ws:n,source:"roomConnection"}:{ws:null,source:null}}function Vn(e,t={}){let n=t.pageWindow??P,o=t.intervalMs??500,r=!!t.debug,i=null,a=null,s=()=>{let d=Vt(n);(d.ws!==i||d.source!==a)&&(i=d.ws,a=d.source,r&&console.log("[WS] best socket changed:",d.source,d.ws),e(d))};s();let u=setInterval(s,o);return()=>clearInterval(u)}function np(e){if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return null}}function rp(e,t=P){let n=t?.MagicCircle_RoomConnection;if(n&&typeof n.sendMessage=="function")try{return Array.isArray(e)?n.sendMessage(...e):n.sendMessage(e),{ok:!0}}catch(i){return{ok:!1,reason:"error",error:i}}let{ws:o}=Vt(t);if(!o)return{ok:!1,reason:"no-ws"};if(!Xr(o))return{ok:!1,reason:"not-open"};let r=np(e);if(r==null)return{ok:!1,reason:"error",error:new Error("Cannot stringify message")};try{return o.send(r),{ok:!0}}catch(i){return{ok:!1,reason:"error",error:i}}}function is(e,t={},n=P){return rp({type:e,...t},n)}var sp={},ls=[];function op(){return ls.slice()}function ip(e){ls.push(e)}function cs(e){try{return JSON.parse(e)}catch{return}}function as(e){if(typeof e=="string"){let t=cs(e);return t!==void 0?t:e}return e}function us(e){if(e!=null){if(typeof e=="string"){let t=cs(e);return t!==void 0?us(t):e}if(Array.isArray(e)&&typeof e[0]=="string")return e[0];if(typeof e=="object"){let t=e;return t.type??t.Type??t.kind??t.messageType}}}function ap(e){let t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function W(e,t,n){let o=typeof t=="boolean"?t:!0,r=typeof t=="function"?t:n,i=(a,s)=>{if(us(a)!==e)return;let d=r(a,s);return d&&typeof d=="object"&&"kind"in d?d:typeof d=="boolean"?d?void 0:{kind:"drop"}:o?void 0:{kind:"drop"}};return ip(i),i}var $t=new WeakSet,ss=new WeakMap;function ds(e){let t=e.pageWindow,n=!!e.debug,o=e.middlewares&&e.middlewares.length?e.middlewares:op();if(!o.length)return()=>{};let r=p=>({ws:p,pageWindow:t,debug:n}),i=(p,m)=>{let f=p;for(let g of o){let b=g(f,r(m));if(b){if(b.kind==="drop")return{kind:"drop"};b.kind==="replace"&&(f=b.message)}}return f!==p?{kind:"replace",message:f}:void 0},a=null,s=null,u=null,d=()=>{let p=t?.MagicCircle_RoomConnection,m=p?.sendMessage;if(!p||typeof m!="function")return!1;if($t.has(m))return!0;let f=m.bind(p);function g(...b){let h=b.length===1?b[0]:b,S=as(h),v=i(S,ap(t));if(v?.kind==="drop"){n&&console.log("[WS] drop outgoing (RoomConnection.sendMessage)",S);return}if(v?.kind==="replace"){let y=v.message;return b.length>1&&Array.isArray(y)?(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",S,"=>",y),f(...y)):(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",S,"=>",y),f(y))}return f(...b)}$t.add(g),ss.set(g,m);try{p.sendMessage=g,$t.add(p.sendMessage),n&&console.log("[WS] outgoing patched via MagicCircle_RoomConnection.sendMessage")}catch{return!1}return a=()=>{try{p.sendMessage===g&&(p.sendMessage=m)}catch{}},!0};(()=>{let p=t?.WebSocket?.prototype,m=p?.send;if(typeof m!="function"||$t.has(m))return;function f(g){let b=as(g),h=i(b,this);if(h?.kind==="drop"){n&&console.log("[WS] drop outgoing (ws.send)",b);return}if(h?.kind==="replace"){let S=h.message,v=typeof S=="string"||S instanceof ArrayBuffer||S instanceof Blob?S:JSON.stringify(S);return n&&console.log("[WS] replace outgoing (ws.send)",b,"=>",S),m.call(this,v)}return m.call(this,g)}$t.add(f),ss.set(f,m);try{p.send=f,n&&console.log("[WS] outgoing patched via WebSocket.prototype.send")}catch{return}s=()=>{try{p.send===f&&(p.send=m)}catch{}}})();let c=e.waitForRoomConnectionMs??4e3;if(!d()&&c>0){let p=Date.now();u=setInterval(()=>{if(d()){clearInterval(u),u=null;return}Date.now()-p>c&&(clearInterval(u),u=null,n&&console.log("[WS] RoomConnection not found, only ws.send is patched"))},250)}return()=>{if(u){try{clearInterval(u)}catch{}u=null}if(a){try{a()}catch{}a=null}if(s){try{s()}catch{}s=null}}}(function(){try{let t=sp,n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();var dp={},ms=[];function lp(){return ms.slice()}function ps(e){ms.push(e)}function cp(e){if(e!=null){if(typeof e=="object"){let t=e;if(typeof t.type=="string")return t.type;if(typeof t.Type=="string")return t.Type;if(typeof t.kind=="string")return t.kind;if(typeof t.messageType=="string")return t.messageType}if(Array.isArray(e)&&typeof e[0]=="string")return e[0]}}function up(e){if(typeof e=="string")try{return JSON.parse(e)}catch{return e}return e}var Qr=Symbol.for("ariesmod.ws.handlers.patched");function ge(e,t){if(typeof e=="string"){let r=e,i={match:a=>a.kind==="message"&&a.type===r,handle:t};return ps(i),i}let n=e,o={match:r=>r.kind==="close"&&r.code===n,handle:t};return ps(o),o}function gs(e,t=lp(),n={}){let o=n.pageWindow??window,r=!!n.debug;if(e[Qr])return()=>{};e[Qr]=!0;let i={ws:e,pageWindow:o,debug:r},a=c=>{for(let p of t)try{if(!p.match(c))continue;if(p.handle(c,i)===!0)return}catch(m){r&&console.error("[WS] handler error",m,c)}},s=c=>{let p=up(c.data),m=cp(p);a({kind:"message",raw:c.data,data:p,type:m})},u=c=>{a({kind:"close",code:c.code,reason:c.reason,wasClean:c.wasClean,event:c})},d=c=>a({kind:"open",event:c}),l=c=>a({kind:"error",event:c});return e.addEventListener("message",s),e.addEventListener("close",u),e.addEventListener("open",d),e.addEventListener("error",l),()=>{try{e.removeEventListener("message",s)}catch{}try{e.removeEventListener("close",u)}catch{}try{e.removeEventListener("open",d)}catch{}try{e.removeEventListener("error",l)}catch{}try{delete e[Qr]}catch{}}}(function(){try{let t=dp,n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();var Ne={Welcome:"Welcome",PartialState:"PartialState",ServerErrorMessage:"ServerErrorMessage",Config:"Config",InappropriateContentRejected:"InappropriateContentRejected",Emote:"Emote",CurrencyTransaction:"CurrencyTransaction",Pong:"Pong"},M={Chat:"Chat",Emote:"Emote",Wish:"Wish",KickPlayer:"KickPlayer",SetPlayerData:"SetPlayerData",UsurpHost:"UsurpHost",Dev:"Dev",SetSelectedGame:"SetSelectedGame",VoteForGame:"VoteForGame",RequestGame:"RequestGame",RestartGame:"RestartGame",Ping:"Ping",PlayerPosition:"PlayerPosition",Teleport:"Teleport",CheckWeatherStatus:"CheckWeatherStatus",MoveInventoryItem:"MoveInventoryItem",DropObject:"DropObject",PickupObject:"PickupObject",ToggleFavoriteItem:"ToggleFavoriteItem",PutItemInStorage:"PutItemInStorage",RetrieveItemFromStorage:"RetrieveItemFromStorage",MoveStorageItem:"MoveStorageItem",LogItems:"LogItems",PlantSeed:"PlantSeed",WaterPlant:"WaterPlant",HarvestCrop:"HarvestCrop",SellAllCrops:"SellAllCrops",PurchaseSeed:"PurchaseSeed",PurchaseEgg:"PurchaseEgg",PurchaseTool:"PurchaseTool",PurchaseDecor:"PurchaseDecor",PlantEgg:"PlantEgg",HatchEgg:"HatchEgg",PlantGardenPlant:"PlantGardenPlant",PotPlant:"PotPlant",MutationPotion:"MutationPotion",PickupDecor:"PickupDecor",PlaceDecor:"PlaceDecor",RemoveGardenObject:"RemoveGardenObject",PlacePet:"PlacePet",FeedPet:"FeedPet",PetPositions:"PetPositions",SwapPet:"SwapPet",StorePet:"StorePet",NamePet:"NamePet",SellPet:"SellPet",ReportSpeakingStart:"ReportSpeakingStart"};var ww=new Set(Object.values(Ne)),Tw=new Set(Object.values(M));ge(4800,(e,t)=>{t.debug&&console.log("[WS][Close] Auth failure",e.code,e.reason)});ge(4300,(e,t)=>{t.debug&&console.log("[WS][Close] Superseded",e.code,e.reason)});ge(4400,(e,t)=>{t.debug&&console.log("[WS][Close] Heartbeat expired",e.code,e.reason)});ge(4500,(e,t)=>{t.debug&&console.log("[WS][Close] Player kicked",e.code,e.reason)});ge(4200,(e,t)=>{t.debug&&console.log("[WS][Close] Player left voluntarily",e.code,e.reason)});ge(4100,(e,t)=>{t.debug&&console.log("[WS][Close] Reconnect initiated",e.code,e.reason)});ge(4310,(e,t)=>{t.debug&&console.log("[WS][Close] Server disposed",e.code,e.reason)});ge(4250,(e,t)=>{t.debug&&console.log("[WS][Close] User session superseded",e.code,e.reason)});ge(4710,(e,t)=>{t.debug&&console.log("[WS][Close] Version expired",e.code,e.reason)});ge(4700,(e,t)=>{t.debug&&console.log("[WS][Close] Version mismatch",e.code,e.reason)});ge(Ne.Config,(e,t)=>{t.debug&&console.log("[WS][STC] Config",e.data)});ge(Ne.CurrencyTransaction,(e,t)=>{t.debug&&console.log("[WS][STC] CurrencyTransaction",e.data)});ge(Ne.Emote,(e,t)=>{t.debug&&console.log("[WS][STC] Emote",e.data)});ge(Ne.InappropriateContentRejected,(e,t)=>{t.debug&&console.log("[WS][STC] InappropriateContentRejected",e.data)});ge(Ne.PartialState,(e,t)=>{t.debug&&console.log("[WS][STC] PartialState",e.data)});ge(Ne.Pong,(e,t)=>{t.debug&&console.log("[WS][STC] Pong",e.data)});ge(Ne.ServerErrorMessage,(e,t)=>{t.debug&&console.log("[WS][STC] ServerErrorMessage",e.data)});ge(Ne.Welcome,(e,t)=>{t.debug&&console.log("[WS][STC] Welcome",e.data)});W(M.PlantSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantSeed"),!!1));W(M.WaterPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] WaterPlant"),!!1));W(M.HarvestCrop,(e,t)=>(t.debug&&console.log("[MW][Garden] HarvestCrop"),!!1));W(M.SellAllCrops,(e,t)=>(t.debug&&console.log("[MW][Garden] SellAllCrops"),!!1));W(M.PurchaseSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseSeed"),!!1));W(M.PurchaseEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseEgg"),!!1));W(M.PurchaseTool,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseTool"),!!1));W(M.PurchaseDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseDecor"),!!1));W(M.PlantEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantEgg"),!!1));W(M.HatchEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] HatchEgg"),!!1));W(M.PlantGardenPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantGardenPlant"),!!1));W(M.PotPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PotPlant"),!!1));W(M.MutationPotion,(e,t)=>(t.debug&&console.log("[MW][Garden] MutationPotion"),!!1));W(M.PickupDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PickupDecor"),!!1));W(M.PlaceDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PlaceDecor"),!!1));W(M.RemoveGardenObject,(e,t)=>(t.debug&&console.log("[MW][Garden] RemoveGardenObject"),!!1));W(M.MoveInventoryItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveInventoryItem"),!!1));W(M.DropObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] DropObject"),!!1));W(M.PickupObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] PickupObject"),!!1));W(M.ToggleFavoriteItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] ToggleFavoriteItem"),!!1));W(M.PutItemInStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] PutItemInStorage"),!!1));W(M.RetrieveItemFromStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] RetrieveItemFromStorage"),!!1));W(M.MoveStorageItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveStorageItem"),!!1));W(M.LogItems,(e,t)=>(t.debug&&console.log("[MW][Inventory] LogItems"),!!1));W(M.PlacePet,(e,t)=>(t.debug&&console.log("[MW][Pets] PlacePet"),!!1));W(M.FeedPet,(e,t)=>(t.debug&&console.log("[MW][Pets] FeedPet"),!!1));W(M.PetPositions,(e,t)=>(t.debug&&console.log("[MW][Pets] PetPositions"),!!1));W(M.SwapPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SwapPet"),!!1));W(M.StorePet,(e,t)=>(t.debug&&console.log("[MW][Pets] StorePet"),!!1));W(M.NamePet,(e,t)=>(t.debug&&console.log("[MW][Pets] NamePet"),!!1));W(M.SellPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SellPet"),!!1));console.log("[WS] TESTTEST");W(M.SetSelectedGame,(e,t)=>(t.debug&&console.log("[MW][Session] SetSelectedGame"),!!1));W(M.VoteForGame,(e,t)=>(t.debug&&console.log("[MW][Session] VoteForGame"),!!1));W(M.RequestGame,(e,t)=>(t.debug&&console.log("[MW][Session] RequestGame"),!!1));W(M.RestartGame,(e,t)=>(t.debug&&console.log("[MW][Session] RestartGame"),!!1));W(M.Ping,(e,t)=>(t.debug&&console.log("[MW][Session] Ping"),!!1));W(M.PlayerPosition,(e,t)=>(t.debug&&console.log("[MW][Session] PlayerPosition"),!!1));W(M.Teleport,(e,t)=>(t.debug&&console.log("[MW][Session] Teleport"),!!1));W(M.CheckWeatherStatus,(e,t)=>(t.debug&&console.log("[MW][Session] CheckWeatherStatus"),!!1));W(M.Chat,(e,t)=>(t.debug&&console.log("[MW][Social] Chat"),!!1));W(M.Dev,(e,t)=>(t.debug&&console.log("[MW][Social] Dev"),!!1));W(M.Emote,(e,t)=>(t.debug&&console.log("[MW][Social] Emote"),!!1));W(M.Wish,(e,t)=>(t.debug&&console.log("[MW][Social] Wish"),!!1));W(M.KickPlayer,(e,t)=>(t.debug&&console.log("[MW][Social] KickPlayer"),!!1));W(M.ReportSpeakingStart,(e,t)=>(t.debug&&console.log("[MW][Voice] ReportSpeakingStart"),!!1));W(M.SetPlayerData,(e,t)=>(t.debug&&console.log("[MW][Social] SetPlayerData"),!!1));W(M.UsurpHost,(e,t)=>(t.debug&&console.log("[MW][Social] UsurpHost"),!!1));function pp(e={}){let t=e.pageWindow??P,n=e.pollMs??500,o=!!e.debug,r=[];r.push(os(t,{debug:o})),r.push(ds({pageWindow:t,middlewares:e.middlewares,debug:o}));let i=null,a=s=>{if(i){try{i()}catch{}i=null}s&&(i=gs(s,e.handlers,{debug:o,pageWindow:t}))};return a(Vt(t).ws),r.push(Vn(s=>a(s.ws),{intervalMs:n,debug:o,pageWindow:t})),{getWs:()=>Vt(t).ws,dispose:()=>{for(let s=r.length-1;s>=0;s--)try{r[s]()}catch{}if(i){try{i()}catch{}i=null}}}}var $n=null;function fs(e={}){return $n||($n=pp(e),$n)}var mp=["visibilitychange","blur","focus","focusout","pagehide","freeze","resume"],U={initialized:!1,listeners:[],savedProps:{hidden:void 0,visibilityState:void 0,hasFocus:null},audioCtx:null,oscillator:null,gainNode:null,heartbeatInterval:null,running:!1};function gp(){let e=(t,n)=>{let o=r=>{r.stopImmediatePropagation(),r.preventDefault?.()};t.addEventListener(n,o,{capture:!0}),U.listeners.push({type:n,handler:o,target:t})};for(let t of mp)e(document,t),e(window,t)}function fp(){for(let{type:e,handler:t,target:n}of U.listeners)try{n.removeEventListener(e,t,{capture:!0})}catch{}U.listeners.length=0}function bp(){let e=Object.getPrototypeOf(document);U.savedProps.hidden=Object.getOwnPropertyDescriptor(e,"hidden"),U.savedProps.visibilityState=Object.getOwnPropertyDescriptor(e,"visibilityState"),U.savedProps.hasFocus=document.hasFocus?document.hasFocus.bind(document):null;try{Object.defineProperty(e,"hidden",{configurable:!0,get:()=>!1})}catch{}try{Object.defineProperty(e,"visibilityState",{configurable:!0,get:()=>"visible"})}catch{}try{document.hasFocus=()=>!0}catch{}}function hp(){let e=Object.getPrototypeOf(document);try{U.savedProps.hidden&&Object.defineProperty(e,"hidden",U.savedProps.hidden)}catch{}try{U.savedProps.visibilityState&&Object.defineProperty(e,"visibilityState",U.savedProps.visibilityState)}catch{}try{U.savedProps.hasFocus&&(document.hasFocus=U.savedProps.hasFocus)}catch{}}function Kn(){U.audioCtx&&U.audioCtx.state!=="running"&&U.audioCtx.resume?.().catch(()=>{})}function yp(){try{let e=window.AudioContext||window.webkitAudioContext;U.audioCtx=new e({latencyHint:"interactive"}),U.gainNode=U.audioCtx.createGain(),U.gainNode.gain.value=1e-5,U.oscillator=U.audioCtx.createOscillator(),U.oscillator.frequency.value=1,U.oscillator.connect(U.gainNode).connect(U.audioCtx.destination),U.oscillator.start(),document.addEventListener("visibilitychange",Kn,{capture:!0}),window.addEventListener("focus",Kn,{capture:!0})}catch{bs()}}function bs(){try{U.oscillator?.stop()}catch{}try{U.oscillator?.disconnect(),U.gainNode?.disconnect()}catch{}try{U.audioCtx?.close?.()}catch{}document.removeEventListener("visibilitychange",Kn,{capture:!0}),window.removeEventListener("focus",Kn,{capture:!0}),U.oscillator=null,U.gainNode=null,U.audioCtx=null}function vp(){let e=document.querySelector("canvas")||document.body||document.documentElement;U.heartbeatInterval=window.setInterval(()=>{try{e.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:1,clientY:1}))}catch{}},25e3)}function xp(){U.heartbeatInterval!==null&&(clearInterval(U.heartbeatInterval),U.heartbeatInterval=null)}function Sp(){U.initialized||(U.initialized=!0,hs())}function wp(){return U.initialized}function hs(){U.initialized&&(U.running||(U.running=!0,bp(),gp(),yp(),vp()))}function Tp(){U.running&&(U.running=!1,xp(),bs(),fp(),hp())}function kp(){return U.running}var Kt={init:Sp,isReady:wp,start:hs,stop:Tp,isRunning:kp};Fe();var qn=null,He={ready:!1,xform:null,xformAt:0};function Pt(e){try{if(typeof structuredClone=="function")return structuredClone(e)}catch{}try{return JSON.parse(JSON.stringify(e))}catch{}return e}function qt(){return we.tos()}function to(){return we.engine()}function Cp(){let e=qt()?.map?.cols;return Number.isFinite(e)&&e>0?e:null}function no(e,t){let n=Cp();return n?t*n+e|0:null}function st(e,t,n=!0){let o=qt(),r=no(e,t);if(!o||r==null)return{gidx:null,tv:null};let i=o.tileViews?.get?.(r)||null;if(!i&&n&&typeof o.getOrCreateTileView=="function")try{i=o.getOrCreateTileView(r)}catch{}return{gidx:r,tv:i||null}}function Ct(e,t,n,o={}){let r=o.ensureView!==!1,i=o.forceUpdate!==!1,a=to(),{gidx:s,tv:u}=st(Number(e),Number(t),r);if(s==null)throw new Error("MGTile: cols unavailable (engine/TOS not ready)");if(!u)throw new Error("MGTile: TileView unavailable (not instantiated)");let d=u.tileObject;if(typeof u.onDataChanged!="function")throw new Error("MGTile: tileView.onDataChanged not found (different API?)");if(u.onDataChanged(n),i&&a?.reusableContext&&typeof u.update=="function")try{u.update(a.reusableContext)}catch{}return{ok:!0,tx:Number(e),ty:Number(t),gidx:s,before:d,after:u.tileObject}}function ro(e,t){if(!e)throw new Error("MGTile: no tileObject on this tile");if(e.objectType!==t)throw new Error(`MGTile: expected objectType "${t}", got "${e.objectType}"`)}function Zr(e,t){if("startTime"in t&&(e.startTime=Number(t.startTime)),"endTime"in t&&(e.endTime=Number(t.endTime)),"targetScale"in t&&(e.targetScale=Number(t.targetScale)),"mutations"in t){if(!Array.isArray(t.mutations))throw new Error("MGTile: mutations must be an array of strings");e.mutations=t.mutations.slice()}}function Ue(){if(!He.ready)throw new Error("MGTile: not ready. Call MGTile.init() first.")}function eo(e){if(!e)return null;let t=r=>r&&(typeof r.getGlobalPosition=="function"||typeof r.toGlobal=="function"),n=["container","root","view","tile","ground","base","floor","bg","background","baseSprite","tileSprite","displayObject","gfx","graphics","sprite"];for(let r of n)if(t(e[r]))return e[r];if(t(e))return e;let o=[e.container,e.root,e.view,e.displayObject,e.tileSprite,e.gfx,e.graphics,e.sprite];for(let r of o)if(t(r))return r;try{for(let r of Object.keys(e))if(t(e[r]))return e[r]}catch{}return null}function Jn(e){let t=Te(()=>e?.getGlobalPosition?.());if(t&&Number.isFinite(t.x)&&Number.isFinite(t.y))return{x:t.x,y:t.y};let n=Te(()=>e?.toGlobal?.({x:0,y:0}));return n&&Number.isFinite(n.x)&&Number.isFinite(n.y)?{x:n.x,y:n.y}:null}function Pp(e){try{if(!e?.getBounds)return"center";let t=e.getBounds(),n=Jn(e);if(!n||!t||!Number.isFinite(t.width)||!Number.isFinite(t.height))return"center";let o=t.x+t.width/2,r=t.y+t.height/2;return Math.hypot(n.x-o,n.y-r)<Math.hypot(n.x-t.x,n.y-t.y)?"center":"topleft"}catch{return"center"}}function Ap(){let e=qt(),t=e?.map?.cols,n=e?.map?.rows;if(!e||!Number.isFinite(t)||t<=1)return null;let o=Number.isFinite(n)&&n>1?n:null,r=[[0,0],[1,1],[Math.min(2,t-2),0],[0,1]];o&&o>2&&r.push([Math.floor(t/2),Math.floor(o/2)]);for(let[i,a]of r){if(i<0||a<0||i>=t||o&&a>=o)continue;let s=st(i,a,!0).tv,u=i+1<t?st(i+1,a,!0).tv:null,d=st(i,a+1,!0).tv,l=eo(s),c=eo(u),p=eo(d);if(!l||!c||!p)continue;let m=Jn(l),f=Jn(c),g=Jn(p);if(!m||!f||!g)continue;let b={x:f.x-m.x,y:f.y-m.y},h={x:g.x-m.x,y:g.y-m.y},S=b.x*h.y-b.y*h.x;if(!Number.isFinite(S)||Math.abs(S)<1e-6)continue;let v=1/S,y={a:h.y*v,b:-h.x*v,c:-b.y*v,d:b.x*v},k={x:m.x-i*b.x-a*h.x,y:m.y-i*b.y-a*h.y},T=Pp(l),A=T==="center"?k:{x:k.x+.5*(b.x+h.x),y:k.y+.5*(b.y+h.y)};return{ok:!0,cols:t,rows:o,vx:b,vy:h,inv:y,anchorMode:T,originCenter:A}}return null}async function Mp(e=15e3){return He.ready?!0:qn||(qn=(async()=>{if(await we.init(e),!qt())throw new Error("MGTile: engine captured but tileObject system not found");return He.ready=!0,!0})(),qn)}function Ip(){return we.hook()}function Yn(e,t,n={}){Ue();let o=n.ensureView!==!1,r=n.clone!==!1,{gidx:i,tv:a}=st(Number(e),Number(t),o);if(i==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!a)return{tx:Number(e),ty:Number(t),gidx:i,tileView:null,tileObject:void 0};let s=a.tileObject;return{tx:Number(e),ty:Number(t),gidx:i,tileView:a,tileObject:r?Pt(s):s}}function Ep(e,t,n={}){return Ue(),Ct(e,t,null,n)}function Lp(e,t,n,o={}){Ue();let i=Yn(e,t,{...o,clone:!1}).tileView?.tileObject;ro(i,"plant");let a=Pt(i);if(Array.isArray(a.slots)||(a.slots=[]),"plantedAt"in n&&(a.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(a.maturedAt=Number(n.maturedAt)),"species"in n&&(a.species=String(n.species)),"slotIdx"in n&&"slotPatch"in n){let s=Number(n.slotIdx)|0;if(!a.slots[s])throw new Error(`MGTile: plant slot ${s} doesn't exist`);return Zr(a.slots[s],n.slotPatch),Ct(e,t,a,o)}if("slots"in n){let s=n.slots;if(Array.isArray(s)){for(let u=0;u<s.length;u++)if(s[u]!=null){if(!a.slots[u])throw new Error(`MGTile: plant slot ${u} doesn't exist`);Zr(a.slots[u],s[u])}}else if(s&&typeof s=="object")for(let u of Object.keys(s)){let d=Number(u)|0;if(Number.isFinite(d)){if(!a.slots[d])throw new Error(`MGTile: plant slot ${d} doesn't exist`);Zr(a.slots[d],s[d])}}else throw new Error("MGTile: patch.slots must be array or object map");return Ct(e,t,a,o)}return Ct(e,t,a,o)}function Rp(e,t,n,o={}){Ue();let i=Yn(e,t,{...o,clone:!1}).tileView?.tileObject;ro(i,"decor");let a=Pt(i);return"rotation"in n&&(a.rotation=Number(n.rotation)),Ct(e,t,a,o)}function Op(e,t,n,o={}){Ue();let i=Yn(e,t,{...o,clone:!1}).tileView?.tileObject;ro(i,"egg");let a=Pt(i);return"plantedAt"in n&&(a.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(a.maturedAt=Number(n.maturedAt)),Ct(e,t,a,o)}function Dp(e,t,n,o={}){Ue();let r=o.ensureView!==!1,i=o.forceUpdate!==!1,a=to(),{gidx:s,tv:u}=st(Number(e),Number(t),r);if(s==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!u)throw new Error("MGTile: TileView unavailable");let d=u.tileObject,l=typeof n=="function"?n(Pt(d)):n;if(u.onDataChanged(l),i&&a?.reusableContext&&typeof u.update=="function")try{u.update(a.reusableContext)}catch{}return{ok:!0,tx:Number(e),ty:Number(t),gidx:s,before:d,after:u.tileObject}}function Hp(e,t,n={}){Ue();let o=n.ensureView!==!1,{gidx:r,tv:i}=st(Number(e),Number(t),o);if(r==null)throw new Error("MGTile: cols unavailable");if(!i)return{ok:!0,tx:Number(e),ty:Number(t),gidx:r,tv:null,tileObject:void 0};let a=n.clone!==!1,s=i.tileObject;return{ok:!0,tx:Number(e),ty:Number(t),gidx:r,objectType:s?.objectType??null,tileObject:a?Pt(s):s,tvKeys:Object.keys(i||{}).sort(),tileView:i}}function ys(){return Ue(),He.xform=Ap(),He.xformAt=Date.now(),{ok:!!He.xform?.ok,xform:He.xform}}function Gp(e,t={}){if(Ue(),!e||!Number.isFinite(e.x)||!Number.isFinite(e.y))return null;let n=Number.isFinite(t.maxAgeMs)?Number(t.maxAgeMs):1500;(!He.xform?.ok||t.forceRebuild||Date.now()-He.xformAt>n)&&ys();let o=He.xform;if(!o?.ok)return null;let r=e.x-o.originCenter.x,i=e.y-o.originCenter.y,a=o.inv.a*r+o.inv.b*i,s=o.inv.c*r+o.inv.d*i,u=Math.floor(a),d=Math.floor(s),l=[[u,d],[u+1,d],[u,d+1],[u+1,d+1]],c=null,p=1/0;for(let[m,f]of l){if(m<0||f<0||m>=o.cols||Number.isFinite(o.rows)&&o.rows!==null&&f>=o.rows)continue;let g=o.originCenter.x+m*o.vx.x+f*o.vy.x,b=o.originCenter.y+m*o.vx.y+f*o.vy.y,h=(e.x-g)**2+(e.y-b)**2;h<p&&(p=h,c={tx:m,ty:f,fx:a,fy:s,x:e.x,y:e.y,gidx:null})}return c?(c.gidx=no(c.tx,c.ty),c):null}function Np(){return["MGTile.init()","MGTile.hook()","MGTile.getTileObject(tx,ty) / inspect(tx,ty)","MGTile.setTileEmpty(tx,ty)","MGTile.setTilePlant(tx,ty,{...}) / setTileDecor / setTileEgg","MGTile.setTileObjectRaw(tx,ty,objOrFn)","MGTile.rebuildTransform() / pointToTile({x,y})"].join(`
`)}var _e={init:Mp,ready:()=>He.ready,hook:Ip,engine:()=>to(),tos:()=>qt(),gidx:(e,t)=>no(Number(e),Number(t)),getTileObject:Yn,inspect:Hp,setTileEmpty:Ep,setTilePlant:Lp,setTileDecor:Rp,setTileEgg:Op,setTileObjectRaw:Dp,rebuildTransform:ys,pointToTile:Gp,help:Np};Fe();var B={ready:!1,app:null,renderer:null,stage:null,ticker:null,tileSets:new Map,highlights:new Map,watches:new Map,fades:new Map,fadeWatches:new Map},lo=e=>!!e&&typeof e=="object"&&!Array.isArray(e),oo=e=>!!(e&&typeof e.getBounds=="function"&&("parent"in e||"children"in e)),Qn=e=>!!(e&&typeof e.tint=="number"),lt=e=>!!(e&&typeof e.alpha=="number");function Xn(e,t,n){return e+(t-e)*n}function _p(e,t,n){let o=e>>16&255,r=e>>8&255,i=e&255,a=t>>16&255,s=t>>8&255,u=t&255,d=Xn(o,a,n)|0,l=Xn(r,s,n)|0,c=Xn(i,u,n)|0;return d<<16|l<<8|c}function Wp(e,t=900){let n=[],o=[e];for(;o.length&&n.length<t;){let r=o.pop();if(!r)continue;Qn(r)&&n.push(r);let i=r.children;if(Array.isArray(i))for(let a=i.length-1;a>=0;a--)o.push(i[a])}return n}function Bp(e,t=25e3){let n=[],o=[e],r=0;for(;o.length&&r++<t;){let i=o.pop();if(!i)continue;lt(i)&&n.push(i);let a=i.children;if(Array.isArray(a))for(let s=a.length-1;s>=0;s--)o.push(a[s])}return n}function vs(e){if(!Array.isArray(e))return[];let t=new Set,n=[];for(let o of e){let r,i;if(Array.isArray(o))r=o[0],i=o[1];else if(lo(o))r=o.x??o.tx,i=o.y??o.ty;else continue;if(r=Number(r),i=Number(i),!Number.isFinite(r)||!Number.isFinite(i))continue;r|=0,i|=0;let a=`${r},${i}`;t.has(a)||(t.add(a),n.push({x:r,y:i}))}return n}function jp(e,t){let n=String(e||"").trim();if(!n)throw new Error("MGPixi.defineTileSet: empty name");let o=vs(t);return B.tileSets.set(n,o),{ok:!0,name:n,count:o.length}}function Fp(e){return B.tileSets.delete(String(e||"").trim())}function zp(){return Array.from(B.tileSets.keys()).sort((e,t)=>e.localeCompare(t))}function xs(e){return!!(e&&(e.tileSet!=null||Array.isArray(e.tiles)))}function co(e){let n=_e.tos?.()?.tileViews;if(!n?.entries)throw new Error("MGPixi: TOS.tileViews not found");if(!xs(e))return{entries:Array.from(n.entries()),gidxSet:null};let o=[];if(e.tileSet!=null){let i=String(e.tileSet||"").trim(),a=B.tileSets.get(i);if(!a)throw new Error(`MGPixi: tileSet not found "${i}"`);o=a}else o=vs(e.tiles||[]);let r=new Map;for(let i of o){let a=_e.getTileObject(i.x,i.y,{ensureView:!0,clone:!1});a?.tileView&&a.gidx!=null&&r.set(a.gidx,a.tileView)}return{entries:Array.from(r.entries()),gidxSet:new Set(r.keys())}}function uo(e){let t=B.highlights.get(e);if(!t)return!1;Te(()=>B.ticker?.remove(t.tick)),t.root&&t.baseAlpha!=null&&lt(t.root)&&Te(()=>{t.root.alpha=t.baseAlpha});for(let n of t.tint)n.o&&Qn(n.o)&&Te(()=>{n.o.tint=n.baseTint});return B.highlights.delete(e),!0}function Ss(e=null){for(let t of Array.from(B.highlights.keys()))e&&!String(t).startsWith(e)||uo(t);return!0}function ws(e,t={}){if(ct(),!oo(e))throw new Error("MGPixi.highlightPulse: invalid root");let n=String(t.key||`hl:${Math.random().toString(16).slice(2)}`);if(B.highlights.has(n))return n;let o=lt(e)?Number(e.alpha):null,r=Ae(Number(t.minAlpha??.12),0,1),i=Ae(Number(t.maxAlpha??1),0,1),a=Number(t.speed??1.25),s=(t.tint??8386303)>>>0,u=Ae(Number(t.tintMix??.85),0,1),d=t.deepTint!==!1,l=[];if(d)for(let m of Wp(e))l.push({o:m,baseTint:m.tint});else Qn(e)&&l.push({o:e,baseTint:e.tint});let c=performance.now(),p=()=>{let m=(performance.now()-c)/1e3,f=(Math.sin(m*Math.PI*2*a)+1)/2,g=f*f*(3-2*f);o!=null&&lt(e)&&(e.alpha=Ae(Xn(r,i,g)*o,0,1));let b=g*u;for(let h of l)h.o&&Qn(h.o)&&(h.o.tint=_p(h.baseTint,s,b))};return B.ticker?.add(p),B.highlights.set(n,{root:e,tick:p,baseAlpha:o,tint:l}),n}var Up=["plantVisual","cropVisual","slotVisual","slotView","displayObject","view","container","root","sprite","gfx","graphics"];function io(e){if(!e)return null;if(oo(e))return e;if(!lo(e))return null;for(let t of Up){let n=e[t];if(oo(n))return n}return null}function Vp(e,t){let n=[{o:e,d:0}],o=new Set,r=6;for(;n.length;){let{o:i,d:a}=n.shift();if(!(!i||a>r)&&!o.has(i)){if(o.add(i),Array.isArray(i)){if(i.length===t){let s=new Array(t),u=!0;for(let d=0;d<t;d++){let l=io(i[d]);if(!l){u=!1;break}s[d]=l}if(u)return s}for(let s of i)n.push({o:s,d:a+1});continue}if(lo(i)){let s=i;for(let u of Object.keys(s))n.push({o:s[u],d:a+1})}}}return null}function $p(e,t){let n=e?.mutations;if(!Array.isArray(n))return!1;for(let o of n)if(String(o||"").toLowerCase()===t)return!0;return!1}function Ts(e,t={}){ct();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.highlightMutation: empty mutation");let{entries:o,gidxSet:r}=co(t),i=`hlmut:${n}:`;if(t.clear===!0)if(!r)Ss(i);else for(let c of Array.from(B.highlights.keys())){if(!c.startsWith(i))continue;let p=c.split(":"),m=Number(p[2]);r.has(m)&&uo(c)}let a={tint:(t.tint??8386303)>>>0,minAlpha:Number(t.minAlpha??.12),maxAlpha:Number(t.maxAlpha??1),speed:Number(t.speed??1.25),tintMix:Number(t.tintMix??.85),deepTint:t.deepTint!==!1},s=0,u=0,d=0,l=0;for(let[c,p]of o){let m=p?.tileObject;if(!m||m.objectType!=="plant")continue;let f=m.slots;if(!Array.isArray(f)||f.length===0)continue;let g=!1,b=[];for(let v=0;v<f.length;v++)$p(f[v],n)&&(b.push(v),g=!0);if(!g)continue;s++,u+=b.length;let h=p?.childView?.plantVisual||p?.childView||p,S=Vp(h,f.length);if(!S){l+=b.length;continue}for(let v of b){let y=S[v];if(!y){l++;continue}let k=`${i}${c}:${v}`;B.highlights.has(k)||(ws(y,{key:k,...a}),d++)}}return{ok:!0,mutation:n,filtered:!!r,plantsMatched:s,matchedSlots:u,newHighlights:d,failedSlots:l}}function Kp(e,t={}){ct();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchMutation: empty mutation");let o=`watchmut:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,r=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,i=B.watches.get(o);i&&clearInterval(i);let a=setInterval(()=>{Te(()=>Ts(n,{...t,clear:!1}))},r);return B.watches.set(o,a),{ok:!0,key:o,mutation:n,intervalMs:r}}function qp(e){let t=String(e||"").trim();if(!t)return!1;if(!t.startsWith("watchmut:")){let o=t.toLowerCase(),r=0;for(let[i,a]of Array.from(B.watches.entries()))i.startsWith(`watchmut:${o}:`)&&(clearInterval(a),B.watches.delete(i),r++);return r>0}let n=B.watches.get(t);return n?(clearInterval(n),B.watches.delete(t),!0):!1}function Jp(e){let t=Array.isArray(e?.slots)?e.slots:[];return{objectType:"plant",species:e?.species??null,plantedAt:e?.plantedAt??null,maturedAt:e?.maturedAt??null,slotCount:t.length,slots:t.map((n,o)=>({idx:o,mutations:Array.isArray(n?.mutations)?n.mutations.slice():[]}))}}function Yp(e,t,n={}){ct();let o=Number(e)|0,r=Number(t)|0,i=n.ensureView!==!1,a=_e.getTileObject(o,r,{ensureView:i,clone:!1}),s=a?.tileView||null,u=s?.tileObject,d={ok:!0,tx:o,ty:r,gidx:a?.gidx??_e.gidx?.(o,r)??null,hasTileView:!!s,objectType:u?.objectType??null,tileObject:u??null,summary:u?.objectType==="plant"?Jp(u):u?{objectType:u.objectType??null}:null,display:s?s.childView?.plantVisual||s.childView||s.displayObject||s:null};return n.log!==!1&&Te(()=>console.log("[MGPixi.inspectTile]",d)),d}function Xp(e){let t=e?.childView?.plantVisual||e?.childView?.cropVisual||e?.childView||e?.displayObject||e;return io(t)||io(e?.displayObject)||null}function ks(e){let t=B.fades.get(e);if(!t)return!1;for(let n of t.targets)n.o&&lt(n.o)&&Number.isFinite(n.baseAlpha)&&Te(()=>{n.o.alpha=n.baseAlpha});return B.fades.delete(e),!0}function ao(e=null){for(let t of Array.from(B.fades.keys()))e&&!String(t).startsWith(e)||ks(t);return!0}function Cs(e,t={}){ct();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.clearSpeciesFade: empty species");let o=`fade:${n}:`;if(!xs(t))return ao(o);let{gidxSet:r}=co(t);if(!r)return ao(o);for(let i of Array.from(B.fades.keys())){if(!i.startsWith(o))continue;let a=Number(i.slice(o.length));r.has(a)&&ks(i)}return!0}function Ps(e,t={}){ct();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.fadeSpecies: empty species");let o=Ae(Number(t.alpha??.2),0,1),r=t.deep===!0,{entries:i,gidxSet:a}=co(t),s=`fade:${n}:`;t.clear===!0&&Cs(n,t);let u=0,d=0,l=0,c=0;for(let[p,m]of i){let f=m?.tileObject;if(!f||f.objectType!=="plant")continue;u++;let g=String(f.species||"").trim().toLowerCase();if(!g||g!==n)continue;d++;let b=Xp(m);if(!b||!lt(b)){c++;continue}let h=`${s}${p}`;if(B.fades.has(h)){Te(()=>{b.alpha=o}),l++;continue}let S=r?Bp(b):[b],v=[];for(let y of S)lt(y)&&v.push({o:y,baseAlpha:Number(y.alpha)});for(let y of v)Te(()=>{y.o.alpha=o});B.fades.set(h,{targets:v}),l++}return{ok:!0,species:n,alpha:o,deep:r,filtered:!!a,plantsSeen:u,matchedPlants:d,applied:l,failed:c,totalFades:B.fades.size}}function Qp(e,t={}){ct();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchFadeSpecies: empty species");let o=`watchfade:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,r=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,i=B.fadeWatches.get(o);i&&clearInterval(i);let a=setInterval(()=>{Te(()=>Ps(n,{...t,clear:!1}))},r);return B.fadeWatches.set(o,a),{ok:!0,key:o,species:n,intervalMs:r}}function Zp(e){let t=String(e||"").trim();if(!t)return!1;if(!t.startsWith("watchfade:")){let o=t.toLowerCase(),r=0;for(let[i,a]of Array.from(B.fadeWatches.entries()))i.startsWith(`watchfade:${o}:`)&&(clearInterval(a),B.fadeWatches.delete(i),r++);return r>0}let n=B.fadeWatches.get(t);return n?(clearInterval(n),B.fadeWatches.delete(t),!0):!1}function so(){let e=P;return e.$PIXI=e.PIXI||null,e.$app=B.app||null,e.$renderer=B.renderer||null,e.$stage=B.stage||null,e.$ticker=B.ticker||null,e.__MG_PIXI__={PIXI:e.$PIXI,app:e.$app,renderer:e.$renderer,stage:e.$stage,ticker:e.$ticker,ready:B.ready},e.__MG_PIXI__}function ct(){if(!B.ready)throw new Error("MGPixi: call MGPixi.init() first")}async function em(e=15e3){if(B.ready)return so(),!0;if(await we.init(e),B.app=we.app(),B.ticker=we.ticker(),B.renderer=we.renderer(),B.stage=we.stage(),!B.app||!B.ticker)throw new Error("MGPixi: PIXI app/ticker not found");return B.ready=!0,so(),!0}var Jt={init:em,ready:()=>B.ready,expose:so,get app(){return B.app},get renderer(){return B.renderer},get stage(){return B.stage},get ticker(){return B.ticker},get PIXI(){return P.PIXI||null},defineTileSet:jp,deleteTileSet:Fp,listTileSets:zp,highlightPulse:ws,stopHighlight:uo,clearHighlights:Ss,highlightMutation:Ts,watchMutation:Kp,stopWatchMutation:qp,inspectTile:Yp,fadeSpecies:Ps,clearSpeciesFade:Cs,clearFades:ao,watchFadeSpecies:Qp,stopWatchFadeSpecies:Zp};Fe();var As=P??window,tm={sfx:"soundEffectsVolume",music:"musicVolume",ambience:"ambienceVolume"},nm={sfx:"soundEffectsVolumeAtom",music:"musicVolumeAtom",ambience:"ambienceVolumeAtom"},Yt=.001,Xt=.2,Zn=null,z={ready:!1,baseUrl:null,urls:{ambience:new Map,music:new Map},sfx:{mp3Url:null,atlasUrl:null,atlas:null,groups:new Map,buffer:null},tracks:{ambience:null,music:null},ctx:null};function Zt(){if(!z.ready)throw new Error("MGAudio not ready yet")}function Ms(e,t=NaN){try{let n=localStorage.getItem(e);if(n==null)return t;let o;try{o=JSON.parse(n)}catch{o=n}if(typeof o=="number"&&Number.isFinite(o))return o;if(typeof o=="string"){let r=parseFloat(o);if(Number.isFinite(r))return r}}catch{}return t}function Qt(e){let t=tm[e],n=nm[e];if(!t)return{atom:Xt,vol100:er(Xt)};let o=Ms(t,NaN);if(Number.isFinite(o)){let i=Ae(o,0,1);return{atom:i,vol100:er(i)}}if(n){let i=Ms(n,NaN);if(Number.isFinite(i)){let a=Ae(i,0,1);return{atom:a,vol100:er(a)}}}let r=Xt;return{atom:r,vol100:er(r)}}function rm(e){let t=Number(e);if(!Number.isFinite(t))return null;if(t<=0)return 0;let o=(Ae(t,1,100)-1)/99;return Yt+o*(Xt-Yt)}function er(e){let t=Ae(Number(e),0,1);if(t<=Yt)return 0;let n=(t-Yt)/(Xt-Yt);return Math.round(1+n*99)}function Is(e,t){if(t==null)return Qt(e).atom;let n=rm(t);return n===null?Qt(e).atom:xr(n)}async function Es(){let e=z.ctx;if(e)return e;let t=As.AudioContext||As.webkitAudioContext;if(!t)throw new Error("WebAudio not supported");let n=new t;return z.ctx=n,n}async function Ls(){if(z.ctx&&z.ctx.state==="suspended")try{await z.ctx.resume()}catch{}}function om(e){let t=new Map,n=(o,r)=>{t.has(o)||t.set(o,[]),t.get(o).push(r)};for(let o of Object.keys(e||{})){let r=/^(.*)_([A-Z])$/.exec(o);r?.[1]?n(r[1],o):n(o,o)}for(let[o,r]of Array.from(t.entries()))r.sort((i,a)=>i.localeCompare(a)),t.set(o,r);z.sfx.groups=t}function im(e){let t=z.sfx.atlas;if(!t)throw new Error("SFX atlas not loaded");if(t[e])return e;let n=z.sfx.groups.get(e);if(n?.length)return n[Math.random()*n.length|0];throw new Error(`Unknown sfx/group: ${e}`)}async function am(){if(z.sfx.buffer)return z.sfx.buffer;if(!z.sfx.mp3Url)throw new Error("SFX mp3 url missing");let e=await Es();await Ls();let n=await(await En(z.sfx.mp3Url)).arrayBuffer(),o=await new Promise((r,i)=>{let a=e.decodeAudioData(n,r,i);a?.then&&a.then(r,i)});return z.sfx.buffer=o,o}async function sm(e,t={}){if(!z.ready)throw new Error("MGAudio not ready yet");let n=String(e||"").trim();if(!n)throw new Error("Missing sfx name");let o=im(n),r=z.sfx.atlas[o];if(!r)throw new Error(`Missing segment for sfx: ${o}`);let i=await Es();await Ls();let a=await am(),s=Math.max(0,+r.start||0),u=Math.max(s,+r.end||s),d=Math.max(.01,u-s),l=Is("sfx",t.volume),c=i.createGain();c.gain.value=l,c.connect(i.destination);let p=i.createBufferSource();return p.buffer=a,p.connect(c),p.start(0,s,d),{name:o,source:p,start:s,end:u,duration:d,volume:l}}function Rs(e){if(e!=="music"&&e!=="ambience")return!1;let t=z.tracks[e];if(t){try{t.pause()}catch{}try{t.src=""}catch{}}return z.tracks[e]=null,!0}function lm(e,t,n={}){if(!z.ready)throw new Error("MGAudio not ready yet");if(e!=="music"&&e!=="ambience")throw new Error(`Invalid category: ${e}`);let o=z.urls[e].get(t);if(!o)throw new Error(`Unknown ${e}: ${t}`);Rs(e);let r=new Audio(o);return r.loop=!!n.loop,r.volume=Is(e,n.volume),r.preload="auto",r.play().catch(()=>{}),z.tracks[e]=r,r}async function cm(e,t,n={}){let o=String(e||"").trim(),r=String(t||"").trim();if(!o||!r)throw new Error("play(category, asset) missing args");if(o==="sfx")return sm(r,n);if(o==="music"||o==="ambience")return lm(o,r,n);throw new Error(`Unknown category: ${o}`)}function um(e,t={}){let n=String(e||"").trim();return n==="music"||n==="ambience"?Array.from(z.urls[n].keys()).sort():n==="sfx"?z.sfx.atlas?t.groups?Array.from(z.sfx.groups.keys()).sort():Object.keys(z.sfx.atlas).sort():[]:[]}function dm(){return z.tracks.music&&(z.tracks.music.volume=Qt("music").atom),z.tracks.ambience&&(z.tracks.ambience.volume=Qt("ambience").atom),!0}function pm(){return Zt(),["sfx","music","ambience"]}function mm(){return Zt(),Array.from(z.sfx.groups.keys()).sort((e,t)=>e.localeCompare(t))}function gm(e,t){Zt();let n=String(e||"").trim().toLowerCase(),o=String(t||"").trim();if(!o||n!=="music"&&n!=="ambience")return!1;let r=z.urls[n],i=o.toLowerCase();for(let a of r.keys())if(a.toLowerCase()===i)return!0;return!1}function fm(e){Zt();let t=String(e||"").trim();if(!t)return!1;let n=t.toLowerCase();for(let o of z.sfx.groups.keys())if(o.toLowerCase()===n)return!0;return!1}function bm(e,t){Zt();let n=String(e||"").trim().toLowerCase(),o=String(t||"").trim();if(!o)throw new Error("getTrackUrl(category, name) missing name");if(n!=="music"&&n!=="ambience")throw new Error(`Invalid category: ${e}`);let r=z.urls[n],i=o.toLowerCase();for(let[a,s]of r.entries())if(a.toLowerCase()===i)return s;return null}async function hm(){return z.ready?!0:Zn||(Zn=(async()=>{z.baseUrl=await De.base();let e=await Me.load(z.baseUrl),t=Me.getBundle(e,"audio");if(!t)throw new Error("No audio bundle in manifest");for(let n of t.assets||[])for(let o of n.src||[]){if(typeof o!="string")continue;let r=/^audio\/(ambience|music)\/(.+)\.mp3$/i.exec(o);if(r){let i=r[1].toLowerCase(),a=r[2];z.urls[i].set(a,ke(z.baseUrl,o));continue}/^audio\/sfx\/sfx\.mp3$/i.test(o)&&(z.sfx.mp3Url=ke(z.baseUrl,o)),/^audio\/sfx\/sfx\.json$/i.test(o)&&(z.sfx.atlasUrl=ke(z.baseUrl,o))}if(!z.sfx.atlasUrl)throw new Error("Missing audio/sfx/sfx.json in manifest");return z.sfx.atlas=await vt(z.sfx.atlasUrl),om(z.sfx.atlas),z.ready=!0,!0})(),Zn)}var en={init:hm,ready:()=>z.ready,play:cm,stop:Rs,list:um,refreshVolumes:dm,categoryVolume:Qt,getCategories:pm,getGroups:mm,hasTrack:gm,hasGroup:fm,getTrackUrl:bm};var po=P?.document??document,tr=null,le={ready:!1,baseUrl:null,byCat:new Map,byBase:new Map,overlay:null,live:new Set,defaultParent:null};function ym(){if(le.overlay)return le.overlay;let e=po.createElement("div");return e.id="MG_COSMETIC_OVERLAY",e.style.cssText=["position:fixed","left:0","top:0","width:100vw","height:100vh","pointer-events:none","z-index:99999999"].join(";"),po.documentElement.appendChild(e),le.overlay=e,e}function vm(){let e=le.defaultParent;if(!e)return null;try{return typeof e=="function"?e():e}catch{return null}}function mo(e){let t=String(e||"").trim();return t?(t=t.replace(/^cosmetic\//i,""),t=t.replace(/\.png$/i,""),t):""}function xm(e,t){if(t===void 0){let i=mo(e),a=i.indexOf("_");return a<0?{cat:"",asset:i,base:i}:{cat:i.slice(0,a),asset:i.slice(a+1),base:i}}let n=String(e||"").trim(),o=mo(t),r=o.includes("_")?o:`${n}_${o}`;if(o.includes("_")&&!n){let i=o.indexOf("_");return{cat:o.slice(0,i),asset:o.slice(i+1),base:o}}return{cat:n,asset:o.replace(/^.+?_/,""),base:r}}function Sm(){return Array.from(le.byCat.keys()).sort((e,t)=>e.localeCompare(t))}function wm(e){let t=le.byCat.get(String(e||"").trim());return t?Array.from(t.keys()).sort((n,o)=>n.localeCompare(o)):[]}function go(e,t){let{cat:n,asset:o,base:r}=xm(e,t),i=le.byBase.get(r);if(i)return i;let s=le.byCat.get(n)?.get(o);if(s)return s;if(!le.baseUrl)throw new Error("MGCosmetic not initialized");if(!r)throw new Error("Invalid cosmetic name");return ke(le.baseUrl,`cosmetic/${r}.png`)}function fo(e,t,n){if(!le.ready)throw new Error("MGCosmetic not ready yet");let o,r;typeof t=="object"&&t!==null?(o=t,r=void 0):typeof t=="string"?(r=t,o=n||{}):(r=void 0,o=n||{});let i=r!==void 0?go(e,r):go(e),a=po.createElement("img");if(a.decoding="async",a.loading="eager",a.src=i,a.alt=o.alt!=null?String(o.alt):mo(r??e),o.className&&(a.className=String(o.className)),o.width!=null&&(a.style.width=String(o.width)),o.height!=null&&(a.style.height=String(o.height)),o.opacity!=null&&(a.style.opacity=String(o.opacity)),o.style&&typeof o.style=="object")for(let[s,u]of Object.entries(o.style))try{a.style[s]=String(u)}catch{}return a}function Tm(e,t,n){let o,r;typeof t=="object"&&t!==null?(o=t,r=void 0):typeof t=="string"?(r=t,o=n||{}):(r=void 0,o=n||{});let i=o.parent||vm()||ym(),a=r!==void 0?fo(e,r,o):fo(e,o);if(i===le.overlay||o.center||o.x!=null||o.y!=null||o.absolute){a.style.position="absolute",a.style.pointerEvents="none",a.style.zIndex=String(o.zIndex??999999);let u=o.scale??1,d=o.rotation??0;if(o.center)a.style.left="50%",a.style.top="50%",a.style.transform=`translate(-50%, -50%) scale(${u}) rotate(${d}rad)`;else{let l=o.x??innerWidth/2,c=o.y??innerHeight/2;a.style.left=`${l}px`,a.style.top=`${c}px`,a.style.transform=`scale(${u}) rotate(${d}rad)`,o.anchor==="center"&&(a.style.transform=`translate(-50%, -50%) scale(${u}) rotate(${d}rad)`)}}return i.appendChild(a),le.live.add(a),a.__mgDestroy=()=>{try{a.remove()}catch{}le.live.delete(a)},a}function km(e){return le.defaultParent=e,!0}function Cm(){for(let e of Array.from(le.live))e.__mgDestroy?.()}async function Pm(){return le.ready?!0:tr||(tr=(async()=>{le.baseUrl=await De.base();let e=await Me.load(le.baseUrl),t=Me.getBundle(e,"cosmetic");if(!t)throw new Error("No 'cosmetic' bundle in manifest");le.byCat.clear(),le.byBase.clear();for(let n of t.assets||[])for(let o of n.src||[]){if(typeof o!="string"||!/^cosmetic\/.+\.png$/i.test(o))continue;let i=o.split("/").pop().replace(/\.png$/i,""),a=i.indexOf("_");if(a<0)continue;let s=i.slice(0,a),u=i.slice(a+1),d=ke(le.baseUrl,o);le.byBase.set(i,d),le.byCat.has(s)||le.byCat.set(s,new Map),le.byCat.get(s).set(u,d)}return le.ready=!0,!0})(),tr)}var tn={init:Pm,ready:()=>le.ready,categories:Sm,list:wm,url:go,create:fo,show:Tm,attach:km,clear:Cm};var rr={};bn(rr,{AchievementManager:()=>nr,destroyAchievementManager:()=>Mm,getAchievementManager:()=>Am});var nr=class{constructor(){se(this,"achievements",new Map);se(this,"data");se(this,"storageKey","gemini_achievements");se(this,"onUnlockCallbacks",[]);se(this,"onProgressCallbacks",[]);this.data=this.loadData()}loadData(){try{let t=localStorage.getItem(this.storageKey);if(t)return JSON.parse(t)}catch(t){console.warn("[Achievements] Failed to load data:",t)}return{unlocked:{},progress:{}}}saveData(){try{localStorage.setItem(this.storageKey,JSON.stringify(this.data))}catch(t){console.warn("[Achievements] Failed to save data:",t)}}register(t){this.achievements.set(t.id,t),this.data.progress[t.id]||(this.data.progress[t.id]={current:0,target:t.target,percentage:0})}registerMany(t){for(let n of t)this.register(n)}async checkAchievement(t){let n=this.achievements.get(t);if(!n)throw new Error(`Achievement not found: ${t}`);let o=this.isUnlocked(t),r=await n.checkProgress(),i={current:r,target:n.target,percentage:Math.min(100,Math.floor(r/n.target*100))},a=this.data.progress[t];this.data.progress[t]=i;let s=r>=n.target;return!o&&s?this.unlock(t,i):s||this.triggerProgressCallbacks({achievement:n,progress:i,previousProgress:a}),this.saveData(),{id:t,wasUnlocked:o,isUnlocked:s,progress:i}}async checkAllAchievements(){let t=[];for(let n of this.achievements.keys()){let o=await this.checkAchievement(n);t.push(o)}return t}unlock(t,n){let o=this.achievements.get(t);if(!o)return;let r={achievementId:t,unlockedAt:Date.now(),progress:n};this.data.unlocked[t]=r,this.saveData(),this.triggerUnlockCallbacks({achievement:o,unlockedAt:r.unlockedAt,progress:n})}isUnlocked(t){return!!this.data.unlocked[t]}getAchievement(t){return this.achievements.get(t)||null}getAllAchievements(){return Array.from(this.achievements.values())}getAchievementsByCategory(t){return Array.from(this.achievements.values()).filter(n=>n.category===t)}getAchievementsByRarity(t){return Array.from(this.achievements.values()).filter(n=>n.rarity===t)}getUnlockedAchievements(){return Object.values(this.data.unlocked)}getLockedAchievements(){return Array.from(this.achievements.values()).filter(t=>!this.isUnlocked(t.id)&&!t.hidden)}getProgress(t){return this.data.progress[t]||null}getCompletionPercentage(){let t=this.achievements.size,n=Object.keys(this.data.unlocked).length;return t>0?Math.floor(n/t*100):0}getCompletionStats(){let t=this.achievements.size,n=Object.keys(this.data.unlocked).length,o=t-n,r=this.getCompletionPercentage();return{total:t,unlocked:n,locked:o,percentage:r}}onUnlock(t){return this.onUnlockCallbacks.push(t),()=>{let n=this.onUnlockCallbacks.indexOf(t);n!==-1&&this.onUnlockCallbacks.splice(n,1)}}onProgress(t){return this.onProgressCallbacks.push(t),()=>{let n=this.onProgressCallbacks.indexOf(t);n!==-1&&this.onProgressCallbacks.splice(n,1)}}triggerUnlockCallbacks(t){for(let n of this.onUnlockCallbacks)try{n(t)}catch(o){console.warn("[Achievements] Unlock callback error:",o)}}triggerProgressCallbacks(t){for(let n of this.onProgressCallbacks)try{n(t)}catch(o){console.warn("[Achievements] Progress callback error:",o)}}reset(){this.data={unlocked:{},progress:{}};for(let t of this.achievements.values())this.data.progress[t.id]={current:0,target:t.target,percentage:0};this.saveData()}exportData(){return JSON.stringify(this.data,null,2)}importData(t){try{let n=JSON.parse(t);return this.data=n,this.saveData(),!0}catch(n){return console.warn("[Achievements] Failed to import data:",n),!1}}},nn=null;function Am(){return nn||(nn=new nr),nn}function Mm(){nn&&(nn=null)}var sr={};bn(sr,{calculateCropProgress:()=>Hs,calculateCropSellPrice:()=>yo,calculateCropSize:()=>Ds,calculateCurrentStrength:()=>pt,calculateHoursToMature:()=>Gm,calculateHoursToMaxStrength:()=>xo,calculateMaxStrength:()=>dt,calculateMutationMultiplier:()=>or,calculatePetAge:()=>ut,calculateStrengthPerHour:()=>ar,calculateStrengthProgress:()=>So,calculateTimeRemaining:()=>Om,calculateTotalCropValue:()=>Dm,getAllMutationNames:()=>Lm,getCropData:()=>ir,getMutationInfo:()=>Rm,getMutationValue:()=>bo,getPetData:()=>gt,isCropReady:()=>Gs,isEnvironmentalMutation:()=>Os,isGrowthMutation:()=>ho,isPetMature:()=>mt});var At={Gold:25,Rainbow:50,Frozen:10,Chilled:5,Wet:2},Im=new Set(["Gold","Rainbow"]),Em=new Set(["Frozen","Chilled","Wet"]);function or(e){let t=1,n=0,o=0;for(let r of e)r==="Gold"||r==="Rainbow"?r==="Rainbow"?t=At.Rainbow:t===1&&(t=At.Gold):r in At&&(n+=At[r],o++);return t*(1+n-o)}function bo(e){return At[e]??null}function ho(e){return Im.has(e)}function Os(e){return Em.has(e)}function Lm(){return Object.keys(At)}function Rm(e){let t=bo(e);return t===null?null:{name:e,value:t,type:ho(e)?"growth":"environmental"}}function Ds(e,t){let n=ir(e);if(!n)return 50;let o=n.maxScale;if(t<=1)return 50;if(t>=o)return 100;let r=(t-1)/(o-1);return Math.floor(50+50*r)}function yo(e,t,n){let o=ir(e);if(!o)return 0;let r=o.baseSellPrice,i=or(n);return Math.round(r*t*i)}function Hs(e,t,n){if(n>=t)return 100;if(n<=e)return 0;let o=t-e,r=n-e;return Math.floor(r/o*100)}function Gs(e,t){return t>=e}function Om(e,t){let n=Math.max(0,e-t);return Math.floor(n/1e3)}function ir(e){let t=me.get("plants");if(!t)return null;let n=t[e];return n?.crop?{baseSellPrice:n.crop.baseSellPrice??0,maxScale:n.crop.maxScale??1,growTime:n.crop.growTime??0}:null}function Dm(e){return e.reduce((t,n)=>t+yo(n.species,n.targetScale,n.mutations),0)}var Ns=3600,vo=80,Hm=100,rn=30;function ut(e){return e/Ns}function dt(e,t){let n=gt(e);if(!n)return vo;let o=n.maxScale;if(t<=1)return vo;if(t>=o)return Hm;let r=(t-1)/(o-1);return Math.floor(vo+20*r)}function pt(e,t,n){let o=gt(e);if(!o)return n-rn;let r=o.hoursToMature,i=t/Ns,a=rn/r,s=Math.min(a*i,rn),u=n-rn;return Math.floor(u+s)}function mt(e,t){let n=gt(e);return n?t>=n.hoursToMature:!1}function ar(e){let t=gt(e);return t?rn/t.hoursToMature:0}function xo(e,t,n){let o=t-e;return o<=0||n<=0?0:o/n}function Gm(e,t){let n=gt(e);if(!n)return 0;let o=n.hoursToMature-t;return Math.max(0,o)}function gt(e){let t=me.get("pets");if(!t)return null;let n=t[e];return n?{hoursToMature:n.hoursToMature??0,maxScale:n.maxScale??1,abilities:n.abilities??[]}:null}function So(e,t){return t<=0?1:Math.min(1,e/t)}var wo={};bn(wo,{calculatePetStrength:()=>_s,enrichPetWithStrength:()=>Ws,enrichPetsWithStrength:()=>Bs,getPetStrengthStats:()=>Nm});function _s(e){let t=ut(e.xp),n=dt(e.petSpecies,e.targetScale),o=pt(e.petSpecies,e.xp,n),r=mt(e.petSpecies,t),i=ar(e.petSpecies),a=xo(o,n,i),s=So(o,n);return{current:o,max:n,progress:s,age:t,isMature:r,strengthPerHour:i,hoursToMax:a}}function Ws(e){return{...e,strength:_s(e)}}function Bs(e){return e.map(Ws)}function Nm(e){if(e.length===0)return{averageCurrent:0,averageMax:0,totalMature:0,totalImmature:0,strongestPet:null,weakestPet:null};let t=Bs(e),n=t.reduce((u,d)=>u+d.strength.current,0),o=t.reduce((u,d)=>u+d.strength.max,0),r=t.filter(u=>u.strength.isMature).length,i=t.length-r,a=t.reduce((u,d)=>d.strength.max>(u?.strength.max||0)?d:u,t[0]),s=t.reduce((u,d)=>d.strength.max<(u?.strength.max||1/0)?d:u,t[0]);return{averageCurrent:Math.round(n/t.length),averageMax:Math.round(o/t.length),totalMature:r,totalImmature:i,strongestPet:a,weakestPet:s}}var _m=new Map;function Wm(){return _m}function on(){return P.jotaiAtomCache?.cache}function an(e){let t=Wm(),n=t.get(e);if(n)return n;let o=on();if(!o)return null;for(let r of o.values())if((r?.debugLabel||r?.label||"")===e)return t.set(e,r),r;return null}var Bm={baseStore:null,captureInProgress:!1,captureError:null,lastCapturedVia:null,mirror:void 0};function Mt(){return Bm}var jm="__JOTAI_STORE_READY__",js=!1,ko=new Set;function lr(){if(!js){js=!0;for(let e of ko)try{e()}catch{}try{let e=P.CustomEvent||CustomEvent;P.dispatchEvent?.(new e(jm))}catch{}}}function Fm(e){ko.add(e);let t=Po();if(t.via&&!t.polyfill)try{e()}catch{}return()=>{ko.delete(e)}}async function cr(e={}){let{timeoutMs:t=6e3,intervalMs:n=50}=e,o=Po();if(!(o.via&&!o.polyfill))return new Promise((r,i)=>{let a=!1,s=Fm(()=>{a||(a=!0,s(),r())}),u=Date.now();(async()=>{for(;!a&&Date.now()-u<t;){let l=Po();if(l.via&&!l.polyfill){if(a)return;a=!0,s(),r();return}await sn(n)}a||(a=!0,s(),i(new Error("Store not captured within timeout")))})()})}var sn=e=>new Promise(t=>setTimeout(t,e));function Fs(){try{let e=P.Event||Event;P.dispatchEvent?.(new e("visibilitychange"))}catch{}}function Co(e){return e&&typeof e=="object"&&typeof e.get=="function"&&typeof e.set=="function"&&typeof e.sub=="function"}function To(e,t=0,n=new WeakSet){if(t>3||!e||typeof e!="object"||n.has(e))return null;try{n.add(e)}catch{return null}if(Co(e))return e;let o=["store","value","current","state","s","baseStore"];for(let r of o)try{let i=e[r];if(Co(i))return i}catch{}return null}function zs(){let e=Mt(),t=P.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t?.renderers?.size)return null;let n=0;for(let[o]of t.renderers){let r=t.getFiberRoots?.(o);r&&(n+=r.size||0)}if(n===0)return null;for(let[o]of t.renderers){let r=t.getFiberRoots?.(o);if(r)for(let i of r){let a=new Set,s=[i.current];for(;s.length;){let u=s.pop();if(!(!u||a.has(u))){a.add(u);try{let d=u?.pendingProps?.value;if(Co(d))return e.lastCapturedVia="fiber",d}catch{}try{let d=u?.memoizedState,l=0;for(;d&&l<15;){l++;let c=To(d);if(c)return e.lastCapturedVia="fiber",c;let p=To(d.memoizedState);if(p)return e.lastCapturedVia="fiber",p;d=d.next}}catch{}try{if(u?.stateNode){let d=To(u.stateNode);if(d)return e.lastCapturedVia="fiber",d}}catch{}u.child&&s.push(u.child),u.sibling&&s.push(u.sibling),u.alternate&&s.push(u.alternate)}}}}return null}function Us(){return{get:()=>{throw new Error("Store not captured: get unavailable")},set:()=>{throw new Error("Store not captured: set unavailable")},sub:()=>()=>{},__polyfill:!0}}async function zm(e=5e3){let t=Date.now(),n=on();for(;!n&&Date.now()-t<e;)await sn(100),n=on();if(!n)throw new Error("jotaiAtomCache.cache not found");let o=Mt(),r=null,i=null,a=[],s=()=>{for(let d of a)try{d.__origWrite&&(d.write=d.__origWrite,delete d.__origWrite)}catch{}};for(let d of n.values()){if(!d||typeof d.write!="function"||d.__origWrite)continue;let l=d.write;d.__origWrite=l,d.write=function(c,p,...m){return i||(r=c,i=p,s()),l.call(this,c,p,...m)},a.push(d)}Fs();let u=Date.now();for(;!i&&Date.now()-u<e;)await sn(50);return i?(o.lastCapturedVia="write",{get:d=>r(d),set:(d,l)=>i(d,l),sub:(d,l)=>{let c;try{c=r(d)}catch{}let p=setInterval(()=>{let m;try{m=r(d)}catch{return}if(m!==c){c=m;try{l()}catch{}}},100);return()=>clearInterval(p)}}):(s(),o.lastCapturedVia="polyfill",Us())}async function Um(e=1e4){let t=Mt();Fs();let n=Date.now();for(;Date.now()-n<e;){let o=zs();if(o)return o;await sn(50)}return t.lastCapturedVia="polyfill",Us()}async function Vm(){let e=Mt();if(e.baseStore&&!e.baseStore.__polyfill)return lr(),e.baseStore;if(e.captureInProgress){let t=Date.now(),n=2500;for(;!e.baseStore&&Date.now()-t<n;)await sn(25);if(e.baseStore)return e.baseStore.__polyfill||lr(),e.baseStore}e.captureInProgress=!0;try{let t=zs();if(t)return e.baseStore=t,lr(),t;try{let o=await zm(5e3);return e.baseStore=o,o.__polyfill||lr(),o}catch(o){e.captureError=o}let n=await Um();return e.baseStore=n,n}catch(t){throw e.captureError=t,t}finally{e.captureInProgress=!1}}function Po(){let e=Mt();return{via:e.lastCapturedVia,polyfill:!!e.baseStore?.__polyfill,error:e.captureError}}async function $m(){let e=await Vm(),t=new WeakMap,n=async r=>{let i=t.get(r);if(i)return i;i={last:void 0,has:!1,subs:new Set},t.set(r,i);try{i.last=e.get(r),i.has=!0}catch{}let a=e.sub(r,()=>{let s;try{s=e.get(r)}catch{return}let u=i.last,d=!Object.is(s,u)||!i.has;if(i.last=s,i.has=!0,d)for(let l of i.subs)try{l(s,u)}catch{}});return i.unsubUpstream=a,i};return{async get(r){let i=await n(r);if(i.has)return i.last;let a=e.get(r);return i.last=a,i.has=!0,a},async set(r,i){await e.set(r,i);let a=await n(r);a.last=i,a.has=!0},async sub(r,i){let a=await n(r);if(a.subs.add(i),a.has)try{i(a.last,a.last)}catch{}return()=>{a.subs.delete(i)}},getShadow(r){return t.get(r)?.last},hasShadow(r){return!!t.get(r)?.has},async ensureWatch(r){await n(r)},async asStore(){return{get:r=>this.get(r),set:(r,i)=>this.set(r,i),sub:(r,i)=>{let a=null;return this.sub(r,()=>i()).then(s=>a=s),()=>a?.()}}}}}async function ln(){let e=Mt();return e.mirror||(e.mirror=await $m()),e.mirror}var Z={async select(e){let t=await ln(),n=an(e);if(!n)throw new Error(`[Store] Atom not found: "${e}"`);return t.get(n)},async set(e,t){let n=await ln(),o=an(e);if(!o)throw new Error(`[Store] Atom not found: "${e}"`);await n.set(o,t)},async subscribe(e,t){let n=await ln(),o=an(e);if(!o)throw new Error(`[Store] Atom not found: "${e}"`);return n.sub(o,r=>{try{t(r)}catch{}})},async subscribeImmediate(e,t){let n=await Z.select(e);try{t(n)}catch{}return Z.subscribe(e,t)}};async function Ao(){await ln()}function ve(e,t){if(e===t)return!0;if(e===null||t===null)return e===t;if(typeof e!=typeof t)return!1;if(typeof e!="object")return e===t;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return!1;for(let a=0;a<e.length;a++)if(!ve(e[a],t[a]))return!1;return!0}if(Array.isArray(e)||Array.isArray(t))return!1;let n=e,o=t,r=Object.keys(n),i=Object.keys(o);if(r.length!==i.length)return!1;for(let a of r)if(!Object.prototype.hasOwnProperty.call(o,a)||!ve(n[a],o[a]))return!1;return!0}var Vs={currentGardenTile:"myCurrentGardenTileAtom",globalTileIndex:"myCurrentGlobalTileIndexAtom",gardenObject:"myCurrentGardenObjectAtom",isMature:"isGardenObjectMatureAtom",isInMyGarden:"isInMyGardenAtom",gardenName:"currentGardenNameAtom",sortedSlotIndices:"myCurrentSortedGrowSlotIndicesAtom",currentGrowSlotIndex:"myCurrentGrowSlotIndexAtom"},$s={position:{globalIndex:null,localIndex:null},tile:{type:null,isEmpty:!0},garden:{name:null,isOwner:!1,playerSlotIndex:null},object:{type:null,data:null,isMature:!1},plant:null};function Km(e){let t=e.currentGardenTile;return{globalIndex:e.globalTileIndex,localIndex:t?.localTileIndex??null}}function qm(e){return{type:e.currentGardenTile?.tileType??null,isEmpty:e.gardenObject===null}}function Jm(e){let t=e.currentGardenTile;return{name:e.gardenName,isOwner:e.isInMyGarden??!1,playerSlotIndex:t?.userSlotIdx??null}}function Ym(e){let t=e.gardenObject;return t?{type:t.objectType,data:t,isMature:e.isMature??!1}:{type:null,data:null,isMature:!1}}function Xm(e){let t=e.gardenObject;if(!t||t.objectType!=="plant")return null;let n=t,o=e.sortedSlotIndices??[];return{species:n.species,slots:n.slots??[],currentSlotIndex:e.currentGrowSlotIndex,sortedSlotIndices:o,nextHarvestSlotIndex:o.length>0?o[0]:null}}function Ks(e){return{position:Km(e),tile:qm(e),garden:Jm(e),object:Ym(e),plant:Xm(e)}}function qs(e){return JSON.stringify({globalIndex:e.position.globalIndex,localIndex:e.position.localIndex,tileType:e.tile.type,isEmpty:e.tile.isEmpty,gardenName:e.garden.name,isOwner:e.garden.isOwner,playerSlotIndex:e.garden.playerSlotIndex,objectType:e.object.type,isMature:e.object.isMature,plantSpecies:e.plant?.species??null,slotCount:e.plant?.slots.length??0})}function Qm(e,t){return e.type!==t.type||e.isMature!==t.isMature?!0:e.data===null&&t.data===null?!1:e.data===null||t.data===null?!0:!ve(e.data,t.data)}function Zm(e,t){return e===null&&t===null?!1:e===null||t===null||e.species!==t.species||e.currentSlotIndex!==t.currentSlotIndex||e.nextHarvestSlotIndex!==t.nextHarvestSlotIndex||e.slots.length!==t.slots.length?!0:!ve(e.sortedSlotIndices,t.sortedSlotIndices)}function eg(e,t){return e.name!==t.name||e.isOwner!==t.isOwner||e.playerSlotIndex!==t.playerSlotIndex}function tg(){let e=$s,t=$s,n=!1,o=[],r={all:new Set,stable:new Set,object:new Set,plantInfo:new Set,garden:new Set},i={},a=Object.keys(Vs),s=new Set;function u(){if(s.size<a.length)return;let l=Ks(i);if(!ve(e,l)&&(t=e,e=l,!!n)){for(let c of r.all)c(e,t);if(qs(t)!==qs(e))for(let c of r.stable)c(e,t);if(Qm(t.object,e.object)){let c={current:e.object,previous:t.object};for(let p of r.object)p(c)}if(Zm(t.plant,e.plant)){let c={current:e.plant,previous:t.plant};for(let p of r.plantInfo)p(c)}if(eg(t.garden,e.garden)){let c={current:e.garden,previous:t.garden};for(let p of r.garden)p(c)}}}async function d(){if(n)return;let l=a.map(async c=>{let p=Vs[c],m=await Z.subscribe(p,f=>{i[c]=f,s.add(c),u()});o.push(m)});await Promise.all(l),n=!0,s.size===a.length&&(e=Ks(i))}return d(),{get(){return e},subscribe(l,c){return r.all.add(l),c?.immediate!==!1&&n&&s.size===a.length&&l(e,e),()=>r.all.delete(l)},subscribeStable(l,c){return r.stable.add(l),c?.immediate!==!1&&n&&s.size===a.length&&l(e,e),()=>r.stable.delete(l)},subscribeObject(l,c){return r.object.add(l),c?.immediate&&n&&s.size===a.length&&l({current:e.object,previous:e.object}),()=>r.object.delete(l)},subscribePlantInfo(l,c){return r.plantInfo.add(l),c?.immediate&&n&&s.size===a.length&&l({current:e.plant,previous:e.plant}),()=>r.plantInfo.delete(l)},subscribeGarden(l,c){return r.garden.add(l),c?.immediate&&n&&s.size===a.length&&l({current:e.garden,previous:e.garden}),()=>r.garden.delete(l)},destroy(){for(let l of o)l();o.length=0,r.all.clear(),r.stable.clear(),r.object.clear(),r.plantInfo.clear(),r.garden.clear(),n=!1}}}var Mo=null;function Io(){return Mo||(Mo=tg()),Mo}var Js={inventory:"myPetInventoryAtom",hutch:"myPetHutchPetItemsAtom",active:"myPetInfosAtom",slotInfos:"myPetSlotInfosAtom",expandedPetSlotId:"expandedPetSlotIdAtom"};function Ys(e,t){let n=ut(e.xp),o=dt(e.petSpecies,e.targetScale),r=pt(e.petSpecies,e.xp,o),i=mt(e.petSpecies,n);return{id:e.id,petSpecies:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,mutations:[...e.mutations],targetScale:e.targetScale,abilities:[...e.abilities],location:t,position:null,lastAbilityTrigger:null,growthStage:n,currentStrength:r,maxStrength:o,isMature:i}}function ng(e,t){let o=t[e.slot.id]?.lastAbilityTrigger??null,r=ut(e.slot.xp),i=dt(e.slot.petSpecies,e.slot.targetScale),a=pt(e.slot.petSpecies,e.slot.xp,i),s=mt(e.slot.petSpecies,r);return{id:e.slot.id,petSpecies:e.slot.petSpecies,name:e.slot.name,xp:e.slot.xp,hunger:e.slot.hunger,mutations:[...e.slot.mutations],targetScale:e.slot.targetScale,abilities:[...e.slot.abilities],location:"active",position:e.position?{x:e.position.x,y:e.position.y}:null,lastAbilityTrigger:o,growthStage:r,currentStrength:a,maxStrength:i,isMature:s}}function Xs(e){let t=new Set,n=[];for(let u of e.active??[]){let d=ng(u,e.slotInfos??{});n.push(d),t.add(d.id)}let o=[];for(let u of e.inventory??[]){if(t.has(u.id))continue;let d=Ys(u,"inventory");o.push(d),t.add(d.id)}let r=[];for(let u of e.hutch??[]){if(t.has(u.id))continue;let d=Ys(u,"hutch");r.push(d),t.add(d.id)}let i=[...n,...o,...r],a=e.expandedPetSlotId??null,s=a?i.find(u=>u.id===a)??null:null;return{all:i,byLocation:{inventory:o,hutch:r,active:n},counts:{inventory:o.length,hutch:r.length,active:n.length,total:i.length},expandedPetSlotId:a,expandedPet:s}}var Qs={all:[],byLocation:{inventory:[],hutch:[],active:[]},counts:{inventory:0,hutch:0,active:0,total:0},expandedPetSlotId:null,expandedPet:null};function rg(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}function Zs(e){return JSON.stringify({id:e.id,petSpecies:e.petSpecies,name:e.name,mutations:e.mutations,abilities:e.abilities,location:e.location})}function og(e,t){if(e.all.length!==t.all.length)return!1;let n=e.all.map(Zs),o=t.all.map(Zs);return rg(n,o)}function ig(e,t){let n=[],o=new Map(e.all.map(r=>[r.id,r]));for(let r of t.all){let i=o.get(r.id);i&&i.location!==r.location&&n.push({pet:r,from:i.location,to:r.location})}return n}function ag(e,t){let n=[],o=new Map(e.all.map(r=>[r.id,r]));for(let r of t.all){if(!r.lastAbilityTrigger)continue;let a=o.get(r.id)?.lastAbilityTrigger;(!a||a.abilityId!==r.lastAbilityTrigger.abilityId||a.performedAt!==r.lastAbilityTrigger.performedAt)&&n.push({pet:r,trigger:r.lastAbilityTrigger})}return n}function sg(e,t){let n=new Set(e.all.map(a=>a.id)),o=new Set(t.all.map(a=>a.id)),r=t.all.filter(a=>!n.has(a.id)),i=e.all.filter(a=>!o.has(a.id));return r.length===0&&i.length===0?null:{added:r,removed:i,counts:t.counts}}function lg(e,t){let n=[],o=new Map(e.all.map(r=>[r.id,r]));for(let r of t.all){let i=o.get(r.id);i&&r.growthStage>i.growthStage&&n.push({pet:r,previousStage:i.growthStage,newStage:r.growthStage})}return n}function cg(e,t){let n=[],o=new Map(e.all.map(r=>[r.id,r]));for(let r of t.all){let i=o.get(r.id);i&&r.currentStrength>i.currentStrength&&n.push({pet:r,previousStrength:i.currentStrength,newStrength:r.currentStrength})}return n}function ug(e,t){let n=[],o=new Map(e.all.map(r=>[r.id,r]));for(let r of t.all){let i=o.get(r.id);i&&r.currentStrength===r.maxStrength&&i.currentStrength<i.maxStrength&&n.push({pet:r})}return n}function dg(){let e=Qs,t=Qs,n=!1,o=[],r={all:new Set,stable:new Set,location:new Set,ability:new Set,count:new Set,expandedPet:new Set,growth:new Set,strengthGain:new Set,maxStrength:new Set},i={},a=Object.keys(Js),s=new Set;function u(){if(s.size<a.length)return;let l=Xs(i);if(ve(e,l)||(t=e,e=l,!n))return;for(let h of r.all)h(e,t);if(!og(t,e))for(let h of r.stable)h(e,t);let c=ig(t,e);for(let h of c)for(let S of r.location)S(h);let p=ag(t,e);for(let h of p)for(let S of r.ability)S(h);let m=sg(t,e);if(m)for(let h of r.count)h(m);let f=lg(t,e);for(let h of f)for(let S of r.growth)S(h);let g=cg(t,e);for(let h of g)for(let S of r.strengthGain)S(h);let b=ug(t,e);for(let h of b)for(let S of r.maxStrength)S(h);if(t.expandedPetSlotId!==e.expandedPetSlotId){let h={current:e.expandedPet,previous:t.expandedPet,currentId:e.expandedPetSlotId,previousId:t.expandedPetSlotId};for(let S of r.expandedPet)S(h)}}async function d(){if(n)return;let l=a.map(async c=>{let p=Js[c],m=await Z.subscribe(p,f=>{i[c]=f,s.add(c),u()});o.push(m)});await Promise.all(l),n=!0,s.size===a.length&&(e=Xs(i))}return d(),{get(){return e},subscribe(l,c){return r.all.add(l),c?.immediate!==!1&&n&&s.size===a.length&&l(e,e),()=>r.all.delete(l)},subscribeStable(l,c){return r.stable.add(l),c?.immediate!==!1&&n&&s.size===a.length&&l(e,e),()=>r.stable.delete(l)},subscribeLocation(l,c){if(r.location.add(l),c?.immediate&&n&&s.size===a.length)for(let p of e.all)l({pet:p,from:p.location,to:p.location});return()=>r.location.delete(l)},subscribeAbility(l,c){if(r.ability.add(l),c?.immediate&&n&&s.size===a.length)for(let p of e.all)p.lastAbilityTrigger&&l({pet:p,trigger:p.lastAbilityTrigger});return()=>r.ability.delete(l)},subscribeCount(l,c){return r.count.add(l),c?.immediate&&n&&s.size===a.length&&l({added:e.all,removed:[],counts:e.counts}),()=>r.count.delete(l)},subscribeExpandedPet(l,c){return r.expandedPet.add(l),c?.immediate&&n&&s.size===a.length&&l({current:e.expandedPet,previous:e.expandedPet,currentId:e.expandedPetSlotId,previousId:e.expandedPetSlotId}),()=>r.expandedPet.delete(l)},subscribeGrowth(l,c){if(r.growth.add(l),c?.immediate&&n&&s.size===a.length)for(let p of e.all)l({pet:p,previousStage:p.growthStage,newStage:p.growthStage});return()=>r.growth.delete(l)},subscribeStrengthGain(l,c){if(r.strengthGain.add(l),c?.immediate&&n&&s.size===a.length)for(let p of e.all)l({pet:p,previousStrength:p.currentStrength,newStrength:p.currentStrength});return()=>r.strengthGain.delete(l)},subscribeMaxStrength(l,c){if(r.maxStrength.add(l),c?.immediate&&n&&s.size===a.length)for(let p of e.all)p.currentStrength===p.maxStrength&&l({pet:p});return()=>r.maxStrength.delete(l)},destroy(){for(let l of o)l();o.length=0,r.all.clear(),r.stable.clear(),r.location.clear(),r.ability.clear(),r.count.clear(),r.expandedPet.clear(),r.growth.clear(),r.strengthGain.clear(),r.maxStrength.clear(),n=!1}}}var Eo=null;function Lo(){return Eo||(Eo=dg()),Eo}function pg(){let e=null,t=[],n=new Set,o={},r=new Set,i=2;function a(c,p){return{x:p%c,y:Math.floor(p/c)}}function s(c,p,m){return m*c+p}function u(c,p){let{cols:m,rows:f}=c,g=m*f,b=new Set,h=new Set,S=new Map,v=[],y=c.userSlotIdxAndDirtTileIdxToGlobalTileIdx??[],k=c.userSlotIdxAndBoardwalkTileIdxToGlobalTileIdx??[],T=Math.max(y.length,k.length);for(let E=0;E<T;E++){let R=y[E]??[],L=k[E]??[],$=R.map((K,Y)=>(b.add(K),S.set(K,E),{globalIndex:K,localIndex:Y,position:a(m,K)})),ne=L.map((K,Y)=>(h.add(K),S.set(K,E),{globalIndex:K,localIndex:Y,position:a(m,K)}));v.push({userSlotIdx:E,dirtTiles:$,boardwalkTiles:ne,allTiles:[...$,...ne]})}let A=c.spawnTiles.map(E=>a(m,E)),I={};if(c.locations)for(let[E,R]of Object.entries(c.locations)){let L=R.spawnTileIdx??[];I[E]={name:E,spawnTiles:L,spawnPositions:L.map($=>a(m,$))}}return{cols:m,rows:f,totalTiles:g,tileSize:p,spawnTiles:c.spawnTiles,spawnPositions:A,locations:I,userSlots:v,globalToXY(E){return a(m,E)},xyToGlobal(E,R){return s(m,E,R)},getTileOwner(E){return S.get(E)??null},isDirtTile(E){return b.has(E)},isBoardwalkTile(E){return h.has(E)}}}function d(){if(r.size<i||e)return;let c=o.map,p=o.tileSize??0;if(c){e=u(c,p);for(let m of n)m(e);n.clear()}}async function l(){let c=await Z.subscribe("mapAtom",m=>{o.map=m,r.add("map"),d()});t.push(c);let p=await Z.subscribe("tileSizeAtom",m=>{o.tileSize=m,r.add("tileSize"),d()});t.push(p)}return l(),{get(){return e},isReady(){return e!==null},onReady(c,p){return e?(p?.immediate!==!1&&c(e),()=>{}):(n.add(c),()=>n.delete(c))},destroy(){for(let c of t)c();t.length=0,e=null,n.clear()}}}var Ro=null;function It(){return Ro||(Ro=pg()),Ro}var el={inventory:"myInventoryAtom",isFull:"isMyInventoryAtMaxLengthAtom",selectedItemIndex:"myPossiblyNoLongerValidSelectedItemIndexAtom"},tl={items:[],favoritedItemIds:[],count:0,isFull:!1,selectedItem:null};function nl(e){let t=e.inventory,n=t?.items??[],o=t?.favoritedItemIds??[],r=e.selectedItemIndex,i=null;return r!==null&&r>=0&&r<n.length&&(i={index:r,item:n[r]}),{items:n,favoritedItemIds:o,count:n.length,isFull:e.isFull??!1,selectedItem:i}}function rl(e){let t=e.items.map(n=>"id"in n?n.id:"species"in n&&n.itemType==="Seed"?`seed:${n.species}:${n.quantity}`:"toolId"in n?`tool:${n.toolId}:${n.quantity}`:"eggId"in n?`egg:${n.eggId}:${n.quantity}`:"decorId"in n?`decor:${n.decorId}:${n.quantity}`:JSON.stringify(n));return JSON.stringify({itemKeys:t,favoritedItemIds:e.favoritedItemIds,isFull:e.isFull,selectedItemIndex:e.selectedItem?.index??null})}function mg(e,t){return rl(e)===rl(t)}function gg(e,t){return e===null&&t===null?!1:e===null||t===null?!0:e.index!==t.index}function ur(e){return"id"in e?e.id:"species"in e&&e.itemType==="Seed"?`seed:${e.species}`:"toolId"in e?`tool:${e.toolId}`:"eggId"in e?`egg:${e.eggId}`:"decorId"in e?`decor:${e.decorId}`:JSON.stringify(e)}function fg(e,t){let n=new Set(e.map(ur)),o=new Set(t.map(ur)),r=t.filter(a=>!n.has(ur(a))),i=e.filter(a=>!o.has(ur(a)));return r.length===0&&i.length===0?null:{added:r,removed:i,counts:{before:e.length,after:t.length}}}function bg(e,t){let n=new Set(e),o=new Set(t),r=t.filter(a=>!n.has(a)),i=e.filter(a=>!o.has(a));return r.length===0&&i.length===0?null:{added:r,removed:i,current:t}}function hg(){let e=tl,t=tl,n=!1,o=[],r={all:new Set,stable:new Set,selection:new Set,items:new Set,favorites:new Set},i={},a=Object.keys(el),s=new Set;function u(){if(s.size<a.length)return;let l=nl(i);if(ve(e,l)||(t=e,e=l,!n))return;for(let m of r.all)m(e,t);if(!mg(t,e))for(let m of r.stable)m(e,t);if(gg(t.selectedItem,e.selectedItem)){let m={current:e.selectedItem,previous:t.selectedItem};for(let f of r.selection)f(m)}let c=fg(t.items,e.items);if(c)for(let m of r.items)m(c);let p=bg(t.favoritedItemIds,e.favoritedItemIds);if(p)for(let m of r.favorites)m(p)}async function d(){if(n)return;let l=a.map(async c=>{let p=el[c],m=await Z.subscribe(p,f=>{i[c]=f,s.add(c),u()});o.push(m)});await Promise.all(l),n=!0,s.size===a.length&&(e=nl(i))}return d(),{get(){return e},subscribe(l,c){return r.all.add(l),c?.immediate!==!1&&n&&s.size===a.length&&l(e,e),()=>r.all.delete(l)},subscribeStable(l,c){return r.stable.add(l),c?.immediate!==!1&&n&&s.size===a.length&&l(e,e),()=>r.stable.delete(l)},subscribeSelection(l,c){return r.selection.add(l),c?.immediate&&n&&s.size===a.length&&l({current:e.selectedItem,previous:e.selectedItem}),()=>r.selection.delete(l)},subscribeItems(l,c){return r.items.add(l),c?.immediate&&n&&s.size===a.length&&l({added:e.items,removed:[],counts:{before:0,after:e.count}}),()=>r.items.delete(l)},subscribeFavorites(l,c){return r.favorites.add(l),c?.immediate&&n&&s.size===a.length&&l({added:e.favoritedItemIds,removed:[],current:e.favoritedItemIds}),()=>r.favorites.delete(l)},destroy(){for(let l of o)l();o.length=0,r.all.clear(),r.stable.clear(),r.selection.clear(),r.items.clear(),r.favorites.clear(),n=!1}}}var Oo=null;function Do(){return Oo||(Oo=hg()),Oo}function cn(e){return e?Array.isArray(e)?e.slice():e.split(".").map(t=>t.match(/^\d+$/)?Number(t):t):[]}function Je(e,t){let n=cn(t),o=e;for(let r of n){if(o==null)return;o=o[r]}return o}function Ho(e,t,n){let o=cn(t);if(!o.length)return n;let r=Array.isArray(e)?[...e]:{...e??{}},i=r;for(let a=0;a<o.length-1;a++){let s=o[a],u=i[s],d=typeof u=="object"&&u!==null?Array.isArray(u)?[...u]:{...u}:{};i[s]=d,i=d}return i[o[o.length-1]]=n,r}function ol(e,t){let n={};for(let o of t)n[o]=o.includes(".")?Je(e,o):e?.[o];try{return JSON.stringify(n)}catch{return String(n)}}function Go(e,t,n){let o=n.mode??"auto";function r(d){let l=t?Je(d,t):d,c=new Map;if(l==null)return{signatures:c,keys:[]};let p=Array.isArray(l);if((o==="array"||o==="auto"&&p)&&p)for(let f=0;f<l.length;f++){let g=l[f],b=n.key?n.key(g,f,d):f,h=n.sig?n.sig(g,f,d):n.fields?ol(g,n.fields):JSON.stringify(g);c.set(b,h)}else for(let[f,g]of Object.entries(l)){let b=n.key?n.key(g,f,d):f,h=n.sig?n.sig(g,f,d):n.fields?ol(g,n.fields):JSON.stringify(g);c.set(b,h)}return{signatures:c,keys:Array.from(c.keys())}}function i(d,l){if(d===l)return!0;if(!d||!l||d.size!==l.size)return!1;for(let[c,p]of d)if(l.get(c)!==p)return!1;return!0}async function a(d){let l=null;return Z.subscribeImmediate(e,c=>{let p=t?Je(c,t):c,{signatures:m}=r(p);if(!i(l,m)){let f=new Set([...l?Array.from(l.keys()):[],...Array.from(m.keys())]),g=[];for(let b of f){let h=l?.get(b)??"__NONE__",S=m.get(b)??"__NONE__";h!==S&&g.push(b)}l=m,d({value:p,changedKeys:g})}})}async function s(d,l){return a(({value:c,changedKeys:p})=>{p.includes(d)&&l({value:c})})}async function u(d,l){let c=new Set(d);return a(({value:p,changedKeys:m})=>{let f=m.filter(g=>c.has(g));f.length&&l({value:p,changedKeys:f})})}return{sub:a,subKey:s,subKeys:u}}var Et=new Map;function yg(e,t){let n=Et.get(e);if(n)try{n()}catch{}return Et.set(e,t),()=>{try{t()}catch{}Et.get(e)===t&&Et.delete(e)}}function ie(e,t={}){let{path:n,write:o="replace"}=t,r=n?`${e}:${cn(n).join(".")}`:e;async function i(){let c=await Z.select(e);return n?Je(c,n):c}async function a(c){if(typeof o=="function"){let f=await Z.select(e),g=o(c,f);return Z.set(e,g)}let p=await Z.select(e),m=n?Ho(p,n,c):c;return o==="merge-shallow"&&!n&&p&&typeof p=="object"&&typeof c=="object"?Z.set(e,{...p,...c}):Z.set(e,m)}async function s(c){let p=await i(),m=c(p);return await a(m),m}async function u(c,p,m){let f,g=h=>{let S=n?Je(h,n):h;if(typeof f>"u"||!m(f,S)){let v=f;f=S,p(S,v)}},b=c?await Z.subscribeImmediate(e,g):await Z.subscribe(e,g);return yg(r,b)}function d(){let c=Et.get(r);if(c){try{c()}catch{}Et.delete(r)}}function l(c){return Go(e,c?.path??n,c)}return{label:r,get:i,set:a,update:s,onChange:(c,p=Object.is)=>u(!1,c,p),onChangeNow:(c,p=Object.is)=>u(!0,c,p),asSignature:l,stopOnChange:d}}function x(e){return ie(e)}var vg=x("positionAtom"),xg=x("lastPositionInMyGardenAtom"),Sg=x("playerDirectionAtom"),wg=x("stateAtom"),Tg=x("quinoaDataAtom"),kg=x("currentTimeAtom"),Cg=x("actionAtom"),Pg=x("isPressAndHoldActionAtom"),Ag=x("mapAtom"),Mg=x("tileSizeAtom"),Ig=ie("mapAtom",{path:"cols"}),Eg=ie("mapAtom",{path:"rows"}),Lg=ie("mapAtom",{path:"spawnTiles"}),Rg=ie("mapAtom",{path:"locations.seedShop.spawnTileIdx"}),Og=ie("mapAtom",{path:"locations.eggShop.spawnTileIdx"}),Dg=ie("mapAtom",{path:"locations.toolShop.spawnTileIdx"}),Hg=ie("mapAtom",{path:"locations.decorShop.spawnTileIdx"}),Gg=ie("mapAtom",{path:"locations.sellCropsShop.spawnTileIdx"}),Ng=ie("mapAtom",{path:"locations.sellPetShop.spawnTileIdx"}),_g=ie("mapAtom",{path:"locations.collectorsClub.spawnTileIdx"}),Wg=ie("mapAtom",{path:"locations.wishingWell.spawnTileIdx"}),Bg=ie("mapAtom",{path:"locations.shopsCenter.spawnTileIdx"}),jg=x("playerAtom"),Fg=x("myDataAtom"),zg=x("myUserSlotIdxAtom"),Ug=x("isSpectatingAtom"),Vg=x("myCoinsCountAtom"),$g=x("numPlayersAtom"),Kg=ie("playerAtom",{path:"id"}),qg=x("userSlotsAtom"),Jg=x("filteredUserSlotsAtom"),Yg=x("myUserSlotAtom"),Xg=x("spectatorsAtom"),Qg=ie("stateAtom",{path:"child"}),Zg=ie("stateAtom",{path:"child.data"}),ef=ie("stateAtom",{path:"child.data.shops"}),No=ie("stateAtom",{path:"child.data.userSlots"}),_o=ie("stateAtom",{path:"data.players"}),Wo=ie("stateAtom",{path:"data.hostPlayerId"}),tf=x("myInventoryAtom"),nf=x("myInventoryItemsAtom"),rf=x("isMyInventoryAtMaxLengthAtom"),of=x("myFavoritedItemIdsAtom"),af=x("myCropInventoryAtom"),sf=x("mySeedInventoryAtom"),lf=x("myToolInventoryAtom"),cf=x("myEggInventoryAtom"),uf=x("myDecorInventoryAtom"),df=x("myPetInventoryAtom"),pf=ie("myInventoryAtom",{path:"favoritedItemIds"}),mf=x("itemTypeFiltersAtom"),gf=x("myItemStoragesAtom"),ff=x("myPetHutchStoragesAtom"),bf=x("myPetHutchItemsAtom"),hf=x("myPetHutchPetItemsAtom"),yf=x("myNumPetHutchItemsAtom"),vf=x("myValidatedSelectedItemIndexAtom"),xf=x("isSelectedItemAtomSuspended"),Sf=x("mySelectedItemAtom"),wf=x("mySelectedItemNameAtom"),Tf=x("mySelectedItemRotationsAtom"),kf=x("mySelectedItemRotationAtom"),Cf=x("setSelectedIndexToEndAtom"),Pf=x("myPossiblyNoLongerValidSelectedItemIndexAtom"),Af=x("myCurrentGlobalTileIndexAtom"),Mf=x("myCurrentGardenTileAtom"),If=x("myCurrentGardenObjectAtom"),Ef=x("myOwnCurrentGardenObjectAtom"),Lf=x("myOwnCurrentDirtTileIndexAtom"),Rf=x("myCurrentGardenObjectNameAtom"),Of=x("isInMyGardenAtom"),Df=x("myGardenBoardwalkTileObjectsAtom"),Bo=ie("myDataAtom",{path:"garden"}),Hf=ie("myDataAtom",{path:"garden.tileObjects"}),Gf=ie("myOwnCurrentGardenObjectAtom",{path:"objectType"}),Nf=x("myCurrentStablePlantObjectInfoAtom"),_f=x("myCurrentSortedGrowSlotIndicesAtom"),Wf=x("myCurrentGrowSlotIndexAtom"),Bf=x("myCurrentGrowSlotsAtom"),jf=x("myCurrentGrowSlotAtom"),Ff=x("secondsUntilCurrentGrowSlotMaturesAtom"),zf=x("isCurrentGrowSlotMatureAtom"),Uf=x("numGrowSlotsAtom"),Vf=x("myCurrentEggAtom"),$f=x("petInfosAtom"),Kf=x("myPetInfosAtom"),qf=x("myPetSlotInfosAtom"),Jf=x("myPrimitivePetSlotsAtom"),Yf=x("myNonPrimitivePetSlotsAtom"),Xf=x("expandedPetSlotIdAtom"),Qf=x("myPetsProgressAtom"),Zf=x("myActiveCropMutationPetsAtom"),eb=x("totalPetSellPriceAtom"),tb=x("selectedPetHasNewVariantsAtom"),jo=x("shopsAtom"),Fo=x("myShopPurchasesAtom"),nb=x("seedShopAtom"),rb=x("seedShopInventoryAtom"),ob=x("seedShopRestockSecondsAtom"),ib=x("seedShopCustomRestockInventoryAtom"),ab=x("eggShopAtom"),sb=x("eggShopInventoryAtom"),lb=x("eggShopRestockSecondsAtom"),cb=x("eggShopCustomRestockInventoryAtom"),ub=x("toolShopAtom"),db=x("toolShopInventoryAtom"),pb=x("toolShopRestockSecondsAtom"),mb=x("toolShopCustomRestockInventoryAtom"),gb=x("decorShopAtom"),fb=x("decorShopInventoryAtom"),bb=x("decorShopRestockSecondsAtom"),hb=x("decorShopCustomRestockInventoryAtom"),yb=x("isDecorShopAboutToRestockAtom"),vb=ie("shopsAtom",{path:"seed"}),xb=ie("shopsAtom",{path:"tool"}),Sb=ie("shopsAtom",{path:"egg"}),wb=ie("shopsAtom",{path:"decor"}),Tb=x("myCropItemsAtom"),kb=x("myCropItemsToSellAtom"),Cb=x("totalCropSellPriceAtom"),Pb=x("friendBonusMultiplierAtom"),Ab=x("myJournalAtom"),Mb=x("myCropJournalAtom"),Ib=x("myPetJournalAtom"),Eb=x("myStatsAtom"),Lb=x("myActivityLogsAtom"),Rb=x("newLogsAtom"),Ob=x("hasNewLogsAtom"),Db=x("newCropLogsFromSellingAtom"),Hb=x("hasNewCropLogsFromSellingAtom"),Gb=x("myCompletedTasksAtom"),Nb=x("myActiveTasksAtom"),_b=x("isWelcomeToastVisibleAtom"),Wb=x("shouldCloseWelcomeToastAtom"),Bb=x("isInitialMoveToDirtPatchToastVisibleAtom"),jb=x("isFirstPlantSeedActiveAtom"),Fb=x("isThirdSeedPlantActiveAtom"),zb=x("isThirdSeedPlantCompletedAtom"),Ub=x("isDemoTouchpadVisibleAtom"),Vb=x("areShopAnnouncersEnabledAtom"),$b=x("arePresentablesEnabledAtom"),Kb=x("isEmptyDirtTileHighlightedAtom"),qb=x("isPlantTileHighlightedAtom"),Jb=x("isItemHiglightedInHotbarAtom"),Yb=x("isItemHighlightedInModalAtom"),Xb=x("isMyGardenButtonHighlightedAtom"),Qb=x("isSellButtonHighlightedAtom"),Zb=x("isShopButtonHighlightedAtom"),eh=x("isInstaGrowButtonHiddenAtom"),th=x("isActionButtonHighlightedAtom"),nh=x("isGardenItemInfoCardHiddenAtom"),rh=x("isSeedPurchaseButtonHighlightedAtom"),oh=x("isFirstSeedPurchaseActiveAtom"),ih=x("isFirstCropHarvestActiveAtom"),ah=x("isWeatherStatusHighlightedAtom"),zo=x("weatherAtom"),sh=x("activeModalAtom"),lh=x("hotkeyBeingPressedAtom"),ch=x("avatarTriggerAnimationAtom"),uh=x("avatarDataAtom"),dh=x("emoteDataAtom"),ph=x("otherUserSlotsAtom"),mh=x("otherPlayerPositionsAtom"),gh=x("otherPlayerSelectedItemsAtom"),fh=x("otherPlayerLastActionsAtom"),bh=x("traderBunnyPlayerId"),hh=x("npcPlayersAtom"),yh=x("npcQuinoaUsersAtom"),vh=x("numNpcAvatarsAtom"),xh=x("traderBunnyEmoteTimeoutAtom"),Sh=x("traderBunnyEmoteAtom"),wh=x("unsortedLeaderboardAtom"),Th=x("currentGardenNameAtom"),kh=x("quinoaEngineAtom"),Ch=x("quinoaInitializationErrorAtom"),Ph=x("avgPingAtom"),Ah=x("serverClientTimeOffsetAtom"),Mh=x("isEstablishingShotRunningAtom"),Ih=x("isEstablishingShotCompleteAtom");var Vo={all:[],host:null,count:0};function Eh(e,t,n){let o=n.get(e.id),r=o?.slot,i=r?.data,a=r?.lastActionEvent;return{id:e.id,name:e.name,discordId:e.databaseUserId,discordAvatarUrl:e.discordAvatarUrl,guildId:e.guildId,isConnected:e.isConnected,isHost:e.id===t,slotIndex:o?.index??null,position:r?.position??null,cosmetic:{color:e.cosmetic?.color??"",avatar:e.cosmetic?.avatar?[...e.cosmetic.avatar]:[]},emote:{type:e.emoteData?.emoteType??-1},coins:i?.coinsCount??0,inventory:i?.inventory??null,shopPurchases:i?.shopPurchases??null,garden:i?.garden??null,pets:{slots:i?.petSlots??[],slotInfos:r?.petSlotInfos??null},journal:i?.journal??null,stats:i?.stats??null,tasksCompleted:i?.tasksCompleted??[],activityLogs:i?.activityLogs??[],customRestocks:{config:i?.customRestocks??null,inventories:r?.customRestockInventories??null},lastAction:a?{type:a.action,data:a.data,timestamp:a.timestamp}:null,selectedItemIndex:r?.notAuthoritative_selectedItemIndex??null,lastSlotMachineInfo:r?.lastSlotMachineInfo??null}}function il(e){let t=e.players,n=e.hostPlayerId??"",o=e.userSlots??[];if(!t||!Array.isArray(t)||t.length===0)return Vo;let r=new Map;Array.isArray(o)&&o.forEach((s,u)=>{s?.type==="user"&&s?.playerId&&r.set(s.playerId,{slot:s,index:u})});let i=t.map(s=>Eh(s,n,r)),a=i.find(s=>s.isHost)??null;return{all:i,host:a,count:i.length}}function al(e){let t=e.all.map(n=>`${n.id}:${n.isConnected}:${n.isHost}`);return JSON.stringify({playerKeys:t,hostId:e.host?.id??null,count:e.count})}function Lh(e,t){let n=[],o=new Set(e.map(i=>i.id)),r=new Set(t.map(i=>i.id));for(let i of t)o.has(i.id)||n.push({player:i,type:"join"});for(let i of e)r.has(i.id)||n.push({player:i,type:"leave"});return n}function Rh(e,t){let n=[],o=new Map(e.map(r=>[r.id,r]));for(let r of t){let i=o.get(r.id);i&&i.isConnected!==r.isConnected&&n.push({player:r,isConnected:r.isConnected})}return n}function Oh(){let e=Vo,t=Vo,n=!1,o=[],r={all:new Set,stable:new Set,joinLeave:new Set,connection:new Set,host:new Set},i={},a=new Set,s=3;function u(){if(a.size<s)return;let l=il(i);if(ve(e,l)||(t=e,e=l,!n))return;for(let g of r.all)g(e,t);if(al(t)!==al(e))for(let g of r.stable)g(e,t);let c=Lh(t.all,e.all);for(let g of c)for(let b of r.joinLeave)b(g);let p=Rh(t.all,e.all);for(let g of p)for(let b of r.connection)b(g);let m=t.host?.id??null,f=e.host?.id??null;if(m!==f){let g={current:e.host,previous:t.host};for(let b of r.host)b(g)}}async function d(){if(n)return;let l=await _o.onChangeNow(m=>{i.players=m,a.add("players"),u()});o.push(l);let c=await Wo.onChangeNow(m=>{i.hostPlayerId=m,a.add("hostPlayerId"),u()});o.push(c);let p=await No.onChangeNow(m=>{i.userSlots=m,a.add("userSlots"),u()});o.push(p),n=!0,a.size===s&&(e=il(i))}return d(),{get(){return e},subscribe(l,c){return r.all.add(l),c?.immediate!==!1&&n&&a.size===s&&l(e,e),()=>r.all.delete(l)},subscribeStable(l,c){return r.stable.add(l),c?.immediate!==!1&&n&&a.size===s&&l(e,e),()=>r.stable.delete(l)},subscribeJoinLeave(l,c){if(r.joinLeave.add(l),c?.immediate&&n&&a.size===s)for(let p of e.all)l({player:p,type:"join"});return()=>r.joinLeave.delete(l)},subscribeConnection(l,c){if(r.connection.add(l),c?.immediate&&n&&a.size===s)for(let p of e.all)l({player:p,isConnected:p.isConnected});return()=>r.connection.delete(l)},subscribeHost(l,c){return r.host.add(l),c?.immediate&&n&&a.size===s&&l({current:e.host,previous:e.host}),()=>r.host.delete(l)},destroy(){for(let l of o)l();o.length=0,r.all.clear(),r.stable.clear(),r.joinLeave.clear(),r.connection.clear(),r.host.clear(),n=!1}}}var Uo=null;function $o(){return Uo||(Uo=Oh()),Uo}var un=["seed","tool","egg","decor"];function Dh(e,t){switch(t){case"seed":return e.species??e.itemType;case"tool":return e.toolId??e.itemType;case"egg":return e.eggId??e.itemType;case"decor":return e.decorId??e.itemType;default:return e.itemType}}function Hh(e,t,n){let o=Dh(e,t),r=n[o]??0,i=Math.max(0,e.initialStock-r);return{id:o,itemType:e.itemType,initialStock:e.initialStock,purchased:r,remaining:i,isAvailable:i>0}}function Gh(e,t,n){if(!t)return{type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null};let r=n[e]?.purchases??{},i=(t.inventory??[]).map(d=>Hh(d,e,r)),a=i.filter(d=>d.isAvailable).length,s=t.secondsUntilRestock??0,u=s>0?Date.now()+s*1e3:null;return{type:e,items:i,availableCount:a,totalCount:i.length,secondsUntilRestock:s,restockAt:u}}function sl(e){let t=e.shops,n=e.purchases??{},o=un.map(s=>Gh(s,t?.[s],n)),r={seed:o[0],tool:o[1],egg:o[2],decor:o[3]},i=o.filter(s=>s.restockAt!==null),a=null;if(i.length>0){let u=i.sort((d,l)=>(d.restockAt??0)-(l.restockAt??0))[0];a={shop:u.type,seconds:u.secondsUntilRestock,at:u.restockAt}}return{all:o,byType:r,nextRestock:a}}var ll={all:un.map(e=>({type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null})),byType:{seed:{type:"seed",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},tool:{type:"tool",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},egg:{type:"egg",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},decor:{type:"decor",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null}},nextRestock:null};function cl(e){return JSON.stringify({shops:e.all.map(t=>({type:t.type,itemCount:t.items.length,availableCount:t.availableCount}))})}function Nh(e,t){let n=e.secondsUntilRestock,o=t.secondsUntilRestock;return n>0&&n<=5&&o>n||n>0&&o===0&&t.items.some(i=>i.purchased===0)?{shop:t,previousItems:e.items}:null}function _h(e,t){let n=[];for(let o of un){let r=e.byType[o],i=t.byType[o],a=new Map(r.items.map(s=>[s.id,s]));for(let s of i.items){let u=a.get(s.id);u&&s.purchased>u.purchased&&n.push({shopType:o,itemId:s.id,quantity:s.purchased-u.purchased,newPurchased:s.purchased,remaining:s.remaining})}}return n}function Wh(e,t){let n=[];for(let o of un){let r=e.byType[o],i=t.byType[o],a=new Map(r.items.map(s=>[s.id,s]));for(let s of i.items){let u=a.get(s.id);u&&u.isAvailable!==s.isAvailable&&n.push({shopType:o,itemId:s.id,wasAvailable:u.isAvailable,isAvailable:s.isAvailable})}}return n}function Bh(){let e=ll,t=ll,n=!1,o=[],r={all:new Set,stable:new Set,seedRestock:new Set,toolRestock:new Set,eggRestock:new Set,decorRestock:new Set,purchase:new Set,availability:new Set},i={},a=new Set,s=2;function u(){if(a.size<s)return;let l=sl(i);if(ve(e,l)||(t=e,e=l,!n))return;for(let f of r.all)f(e,t);if(cl(t)!==cl(e))for(let f of r.stable)f(e,t);let c={seed:r.seedRestock,tool:r.toolRestock,egg:r.eggRestock,decor:r.decorRestock};for(let f of un){let g=Nh(t.byType[f],e.byType[f]);if(g)for(let b of c[f])b(g)}let p=_h(t,e);for(let f of p)for(let g of r.purchase)g(f);let m=Wh(t,e);for(let f of m)for(let g of r.availability)g(f)}async function d(){if(n)return;let l=await jo.onChangeNow(p=>{i.shops=p,a.add("shops"),u()});o.push(l);let c=await Fo.onChangeNow(p=>{i.purchases=p,a.add("purchases"),u()});o.push(c),n=!0,a.size===s&&(e=sl(i))}return d(),{get(){return e},getShop(l){return e.byType[l]},getItem(l,c){return e.byType[l].items.find(m=>m.id===c)??null},subscribe(l,c){return r.all.add(l),c?.immediate!==!1&&n&&a.size===s&&l(e,e),()=>r.all.delete(l)},subscribeStable(l,c){return r.stable.add(l),c?.immediate!==!1&&n&&a.size===s&&l(e,e),()=>r.stable.delete(l)},subscribeSeedRestock(l,c){return r.seedRestock.add(l),c?.immediate&&n&&a.size===s&&l({shop:e.byType.seed,previousItems:[]}),()=>r.seedRestock.delete(l)},subscribeToolRestock(l,c){return r.toolRestock.add(l),c?.immediate&&n&&a.size===s&&l({shop:e.byType.tool,previousItems:[]}),()=>r.toolRestock.delete(l)},subscribeEggRestock(l,c){return r.eggRestock.add(l),c?.immediate&&n&&a.size===s&&l({shop:e.byType.egg,previousItems:[]}),()=>r.eggRestock.delete(l)},subscribeDecorRestock(l,c){return r.decorRestock.add(l),c?.immediate&&n&&a.size===s&&l({shop:e.byType.decor,previousItems:[]}),()=>r.decorRestock.delete(l)},subscribePurchase(l,c){if(r.purchase.add(l),c?.immediate&&n&&a.size===s)for(let p of e.all)for(let m of p.items)m.purchased>0&&l({shopType:p.type,itemId:m.id,quantity:m.purchased,newPurchased:m.purchased,remaining:m.remaining});return()=>r.purchase.delete(l)},subscribeAvailability(l,c){if(r.availability.add(l),c?.immediate&&n&&a.size===s)for(let p of e.all)for(let m of p.items)l({shopType:p.type,itemId:m.id,wasAvailable:m.isAvailable,isAvailable:m.isAvailable});return()=>r.availability.delete(l)},destroy(){for(let l of o)l();o.length=0,r.all.clear(),r.stable.clear(),r.seedRestock.clear(),r.toolRestock.clear(),r.eggRestock.clear(),r.decorRestock.clear(),r.purchase.clear(),r.availability.clear(),n=!1}}}var Ko=null;function qo(){return Ko||(Ko=Bh()),Ko}var jh=["Sunny","Rain","Frost","Dawn","AmberMoon"];function Fh(e){return jh.includes(e)}var Yo={type:"Sunny",isActive:!1,startTime:null,endTime:null,remainingSeconds:0};function zh(e){if(!e)return Yo;let t=Date.now(),n=e.endTime??0,o=Math.max(0,n-t),r=Math.floor(o/1e3),i=r>0,a=e.type??"Sunny";return{type:Fh(a)?a:"Sunny",isActive:i,startTime:e.startTime??null,endTime:e.endTime??null,remainingSeconds:r}}function Uh(){let e=Yo,t=Yo,n=!1,o=null,r={all:new Set,change:new Set};function i(s){let u=zh(s);if(e.type===u.type&&e.isActive===u.isActive&&e.startTime===u.startTime&&e.endTime===u.endTime){e=u;return}if(t=e,e=u,!!n){for(let d of r.all)d(e,t);if(t.type!==e.type||t.isActive!==e.isActive){let d={current:e,previous:t};for(let l of r.change)l(d)}}}async function a(){n||(o=await zo.onChangeNow(s=>{i(s)}),n=!0)}return a(),{get(){return e},subscribe(s,u){return r.all.add(s),u?.immediate!==!1&&n&&s(e,e),()=>r.all.delete(s)},subscribeChange(s,u){return r.change.add(s),u?.immediate&&n&&s({current:e,previous:e}),()=>r.change.delete(s)},destroy(){o?.(),o=null,r.all.clear(),r.change.clear(),n=!1}}}var Jo=null;function Xo(){return Jo||(Jo=Uh()),Jo}function Vh(){let e=me.get("mutations");return e?Object.keys(e):[]}function ml(){let e={};for(let t of Vh())e[t]=[];return e}function Zo(){return{garden:null,mySlotIndex:null,plants:{all:[],mature:[],growing:[],bySpecies:{},count:0},crops:{all:[],mature:[],growing:[],mutated:{all:[],byMutation:ml()}},eggs:{all:[],mature:[],growing:[],byType:{},count:0},decors:{tileObjects:[],boardwalk:[],all:[],byType:{},count:0},tiles:{tileObjects:[],boardwalk:[],empty:{tileObjects:[],boardwalk:[]}},counts:{plants:0,maturePlants:0,crops:0,matureCrops:0,eggs:0,matureEggs:0,decors:0,emptyTileObjects:0,emptyBoardwalk:0}}}function $h(e,t,n,o){let r=t.slots.filter(i=>o>=i.endTime).length;return{tileIndex:e,position:n,species:t.species,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:o>=t.maturedAt,slots:t.slots,slotsCount:t.slots.length,matureSlotsCount:r}}function Kh(e,t,n,o,r){return{tileIndex:e,position:t,slotIndex:n,species:o.species,startTime:o.startTime,endTime:o.endTime,targetScale:o.targetScale,mutations:[...o.mutations],isMature:r>=o.endTime}}function qh(e,t,n,o){return{tileIndex:e,position:n,eggId:t.eggId,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:o>=t.maturedAt}}function ul(e,t,n,o){return{tileIndex:e,position:n,decorId:t.decorId,rotation:t.rotation,location:o}}function dl(e,t){let{garden:n,mySlotIndex:o}=e,r=Date.now();if(!n||o===null)return Zo();let i=t().get(),a=i?.userSlots[o],s=a?.dirtTiles??[],u=a?.boardwalkTiles??[],d=[],l=[],c=[],p={},m=[],f=[],g=[],b=[],h=ml(),S=[],v=[],y=[],k={},T=[],A=[],I={},E=new Set,R=new Set;for(let[K,Y]of Object.entries(n.tileObjects)){let ae=parseInt(K,10);E.add(ae);let N=i?i.globalToXY(ae):{x:0,y:0};if(Y.objectType==="plant"){let G=Y,H=$h(K,G,N,r);d.push(H),H.isMature?l.push(H):c.push(H),p[H.species]||(p[H.species]=[]),p[H.species].push(H);for(let C=0;C<G.slots.length;C++){let O=G.slots[C],D=Kh(K,N,C,O,r);if(m.push(D),D.isMature?f.push(D):g.push(D),D.mutations.length>0){b.push(D);for(let _ of D.mutations)h[_]||(h[_]=[]),h[_].push(D)}}}else if(Y.objectType==="egg"){let H=qh(K,Y,N,r);S.push(H),k[H.eggId]||(k[H.eggId]=[]),k[H.eggId].push(H),H.isMature?v.push(H):y.push(H)}else if(Y.objectType==="decor"){let H=ul(K,Y,N,"tileObjects");T.push(H),I[H.decorId]||(I[H.decorId]=[]),I[H.decorId].push(H)}}for(let[K,Y]of Object.entries(n.boardwalkTileObjects)){let ae=parseInt(K,10);R.add(ae);let N=i?i.globalToXY(ae):{x:0,y:0},H=ul(K,Y,N,"boardwalk");A.push(H),I[H.decorId]||(I[H.decorId]=[]),I[H.decorId].push(H)}let L=[...T,...A],$=s.filter(K=>!E.has(K.localIndex)),ne=u.filter(K=>!R.has(K.localIndex));return{garden:n,mySlotIndex:o,plants:{all:d,mature:l,growing:c,bySpecies:p,count:d.length},crops:{all:m,mature:f,growing:g,mutated:{all:b,byMutation:h}},eggs:{all:S,mature:v,growing:y,byType:k,count:S.length},decors:{tileObjects:T,boardwalk:A,all:L,byType:I,count:L.length},tiles:{tileObjects:s,boardwalk:u,empty:{tileObjects:$,boardwalk:ne}},counts:{plants:d.length,maturePlants:l.length,crops:m.length,matureCrops:f.length,eggs:S.length,matureEggs:v.length,decors:L.length,emptyTileObjects:$.length,emptyBoardwalk:ne.length}}}function pl(e){return JSON.stringify({plants:e.counts.plants,maturePlants:e.counts.maturePlants,crops:e.counts.crops,matureCrops:e.counts.matureCrops,eggs:e.counts.eggs,matureEggs:e.counts.matureEggs,decors:e.counts.decors,emptyTileObjects:e.counts.emptyTileObjects,emptyBoardwalk:e.counts.emptyBoardwalk})}function Jh(e,t){let n=new Set(e.map(a=>a.tileIndex)),o=new Set(t.map(a=>a.tileIndex)),r=t.filter(a=>!n.has(a.tileIndex)),i=e.filter(a=>!o.has(a.tileIndex));return{added:r,removed:i}}function Yh(e,t,n){let o=new Set(e.map(i=>i.tileIndex)),r=new Set(n.map(i=>i.tileIndex));return t.filter(i=>!o.has(i.tileIndex)&&r.has(i.tileIndex))}function Xh(e,t,n){let o=new Set(e.map(i=>`${i.tileIndex}:${i.slotIndex}`)),r=new Set(n.map(i=>`${i.tileIndex}:${i.slotIndex}`));return t.filter(i=>{let a=`${i.tileIndex}:${i.slotIndex}`;return!o.has(a)&&r.has(a)})}function Qh(e,t,n){let o=new Set(e.map(i=>i.tileIndex)),r=new Set(n.map(i=>i.tileIndex));return t.filter(i=>!o.has(i.tileIndex)&&r.has(i.tileIndex))}function Zh(e,t){let n=[],o=new Map(e.map(r=>[r.tileIndex,r]));for(let r of t){let i=o.get(r.tileIndex);if(!i)continue;let a=Math.min(i.slots.length,r.slots.length);for(let s=0;s<a;s++){let u=new Set(i.slots[s].mutations),d=new Set(r.slots[s].mutations),l=[...d].filter(p=>!u.has(p)),c=[...u].filter(p=>!d.has(p));if(l.length>0||c.length>0){let p=Date.now(),m=r.slots[s],f={tileIndex:r.tileIndex,position:r.position,slotIndex:s,species:m.species,startTime:m.startTime,endTime:m.endTime,targetScale:m.targetScale,mutations:[...m.mutations],isMature:p>=m.endTime};n.push({crop:f,added:l,removed:c})}}}return n}function ey(e,t,n){let o=[],r=new Map(t.map(a=>[a.tileIndex,a])),i=new Map;for(let a of n)i.set(`${a.tileIndex}:${a.slotIndex}`,a);for(let a of e){let s=r.get(a.tileIndex);if(!s)continue;let u=Math.min(a.slots.length,s.slots.length);for(let d=0;d<u;d++){let l=a.slots[d],c=s.slots[d];if(l.startTime!==c.startTime){let p=i.get(`${a.tileIndex}:${d}`);if(!p||!p.isMature)continue;let m={tileIndex:a.tileIndex,position:a.position,slotIndex:d,species:l.species,startTime:l.startTime,endTime:l.endTime,targetScale:l.targetScale,mutations:[...l.mutations],isMature:!0};o.push({crop:m,remainingSlots:s.slotsCount})}}if(s.slotsCount<a.slotsCount)for(let d=s.slotsCount;d<a.slotsCount;d++){let l=i.get(`${a.tileIndex}:${d}`);if(!l||!l.isMature)continue;let c=a.slots[d];if(!c)continue;let p={tileIndex:a.tileIndex,position:a.position,slotIndex:d,species:c.species,startTime:c.startTime,endTime:c.endTime,targetScale:c.targetScale,mutations:[...c.mutations],isMature:!0};o.push({crop:p,remainingSlots:s.slotsCount})}}return o}function ty(e,t){let n=new Set(e.map(a=>a.tileIndex)),o=new Set(t.map(a=>a.tileIndex)),r=t.filter(a=>!n.has(a.tileIndex)),i=e.filter(a=>!o.has(a.tileIndex));return{added:r,removed:i}}function ny(e,t){let n=u=>`${u.tileIndex}:${u.location}`,o=u=>`${u.tileIndex}:${u.location}`,r=new Set(e.map(n)),i=new Set(t.map(o)),a=t.filter(u=>!r.has(o(u))),s=e.filter(u=>!i.has(n(u)));return{added:a,removed:s}}function ry(){let e=Zo(),t=Zo(),n=!1,o=[],r={all:new Set,stable:new Set,plantAdded:new Set,plantRemoved:new Set,plantMatured:new Set,cropMutated:new Set,cropMatured:new Set,cropHarvested:new Set,eggPlaced:new Set,eggRemoved:new Set,eggMatured:new Set,decorPlaced:new Set,decorRemoved:new Set},i={},a=new Set,s=2;function u(){if(a.size<s)return;let l=dl(i,It);if(ve(e,l)||(t=e,e=l,!n))return;for(let v of r.all)v(e,t);if(pl(t)!==pl(e))for(let v of r.stable)v(e,t);let c=Jh(t.plants.all,e.plants.all);for(let v of c.added)for(let y of r.plantAdded)y({plant:v});for(let v of c.removed)for(let y of r.plantRemoved)y({plant:v,tileIndex:v.tileIndex});let p=Yh(t.plants.mature,e.plants.mature,e.plants.all);for(let v of p)for(let y of r.plantMatured)y({plant:v});let m=Zh(t.plants.all,e.plants.all);for(let v of m)for(let y of r.cropMutated)y(v);let f=Xh(t.crops.mature,e.crops.mature,e.crops.all);for(let v of f)for(let y of r.cropMatured)y({crop:v});let g=ey(t.plants.all,e.plants.all,t.crops.all);for(let v of g)for(let y of r.cropHarvested)y(v);let b=ty(t.eggs.all,e.eggs.all);for(let v of b.added)for(let y of r.eggPlaced)y({egg:v});for(let v of b.removed)for(let y of r.eggRemoved)y({egg:v});let h=Qh(t.eggs.mature,e.eggs.mature,e.eggs.all);for(let v of h)for(let y of r.eggMatured)y({egg:v});let S=ny(t.decors.all,e.decors.all);for(let v of S.added)for(let y of r.decorPlaced)y({decor:v});for(let v of S.removed)for(let y of r.decorRemoved)y({decor:v})}async function d(){if(n)return;let l=await Bo.onChangeNow(p=>{i.garden=p,a.add("garden"),u()});o.push(l);let c=await Z.subscribe("myUserSlotIdxAtom",p=>{i.mySlotIndex=p,a.add("mySlotIndex"),u()});o.push(c),n=!0,a.size===s&&(e=dl(i,It))}return d(),{get(){return e},subscribe(l,c){return r.all.add(l),c?.immediate!==!1&&n&&a.size===s&&l(e,e),()=>r.all.delete(l)},subscribeStable(l,c){return r.stable.add(l),c?.immediate!==!1&&n&&a.size===s&&l(e,e),()=>r.stable.delete(l)},subscribePlantAdded(l,c){if(r.plantAdded.add(l),c?.immediate&&n&&a.size===s)for(let p of e.plants.all)l({plant:p});return()=>r.plantAdded.delete(l)},subscribePlantRemoved(l,c){return r.plantRemoved.add(l),()=>r.plantRemoved.delete(l)},subscribePlantMatured(l,c){if(r.plantMatured.add(l),c?.immediate&&n&&a.size===s)for(let p of e.plants.mature)l({plant:p});return()=>r.plantMatured.delete(l)},subscribeCropMutated(l,c){if(r.cropMutated.add(l),c?.immediate&&n&&a.size===s)for(let p of e.crops.mutated.all)l({crop:p,added:p.mutations,removed:[]});return()=>r.cropMutated.delete(l)},subscribeCropMatured(l,c){if(r.cropMatured.add(l),c?.immediate&&n&&a.size===s)for(let p of e.crops.mature)l({crop:p});return()=>r.cropMatured.delete(l)},subscribeCropHarvested(l,c){return r.cropHarvested.add(l),()=>r.cropHarvested.delete(l)},subscribeEggPlaced(l,c){if(r.eggPlaced.add(l),c?.immediate&&n&&a.size===s)for(let p of e.eggs.all)l({egg:p});return()=>r.eggPlaced.delete(l)},subscribeEggRemoved(l,c){return r.eggRemoved.add(l),()=>r.eggRemoved.delete(l)},subscribeEggMatured(l,c){if(r.eggMatured.add(l),c?.immediate&&n&&a.size===s)for(let p of e.eggs.mature)l({egg:p});return()=>r.eggMatured.delete(l)},subscribeDecorPlaced(l,c){if(r.decorPlaced.add(l),c?.immediate&&n&&a.size===s)for(let p of e.decors.all)l({decor:p});return()=>r.decorPlaced.delete(l)},subscribeDecorRemoved(l,c){return r.decorRemoved.add(l),()=>r.decorRemoved.delete(l)},destroy(){for(let l of o)l();o.length=0,r.all.clear(),r.stable.clear(),r.plantAdded.clear(),r.plantRemoved.clear(),r.plantMatured.clear(),r.cropMutated.clear(),r.cropMatured.clear(),r.cropHarvested.clear(),r.eggPlaced.clear(),r.eggRemoved.clear(),r.eggMatured.clear(),r.decorPlaced.clear(),r.decorRemoved.clear(),n=!1}}}var Qo=null;function ei(){return Qo||(Qo=ry()),Qo}var xe=null;function dr(){return xe||(xe={currentTile:Io(),myPets:Lo(),gameMap:It(),myInventory:Do(),players:$o(),shops:qo(),weather:Xo(),myGarden:ei()},xe)}function We(){if(!xe)throw new Error("[Globals] Not initialized. Call initGlobals() first.");return xe}function gl(){xe&&(xe.currentTile.destroy(),xe.myPets.destroy(),xe.gameMap.destroy(),xe.myInventory.destroy(),xe.players.destroy(),xe.shops.destroy(),xe.weather.destroy(),xe.myGarden.destroy(),xe=null)}var pr={get currentTile(){return We().currentTile},get myPets(){return We().myPets},get gameMap(){return We().gameMap},get myInventory(){return We().myInventory},get players(){return We().players},get shops(){return We().shops},get weather(){return We().weather},get myGarden(){return We().myGarden}};var dn=class{constructor(){se(this,"logs",[]);se(this,"maxLogs",1e3);se(this,"unsubscribe",null);se(this,"isInitialized",!1)}init(){this.isInitialized||(this.unsubscribe=pr.myPets.subscribeAbility(t=>{this.log({abilityId:t.trigger.abilityId||"unknown",petId:t.pet.id,petSpecies:t.pet.petSpecies,petName:t.pet.name,timestamp:t.trigger.performedAt||Date.now()})}),this.isInitialized=!0)}log(t){let n={...t,id:`${t.timestamp}-${Math.random().toString(36).substr(2,9)}`};this.logs.push(n),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs))}getLogs(t){let n=this.logs;t?.abilityId&&(n=n.filter(r=>r.abilityId===t.abilityId)),t?.petId&&(n=n.filter(r=>r.petId===t.petId)),t?.petSpecies&&(n=n.filter(r=>r.petSpecies===t.petSpecies));let{since:o}=t??{};return o!==void 0&&(n=n.filter(r=>r.timestamp>=o)),t?.limit&&(n=n.slice(-t.limit)),n}getStats(t=36e5){let n=Date.now()-t,o=this.logs.filter(i=>i.timestamp>=n),r=new Map;for(let i of o){r.has(i.abilityId)||r.set(i.abilityId,{abilityId:i.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});let a=r.get(i.abilityId);a.count++,(!a.lastProc||i.timestamp>a.lastProc)&&(a.lastProc=i.timestamp)}for(let i of r.values())i.procsPerMinute=i.count/t*6e4,i.procsPerHour=i.count/t*36e5;return r}getAbilityStats(t,n=36e5){return this.getStats(n).get(t)||null}getPetStats(t,n=36e5){let o=Date.now()-n,r=this.logs.filter(a=>a.petId===t&&a.timestamp>=o),i=new Map;for(let a of r){i.has(a.abilityId)||i.set(a.abilityId,{abilityId:a.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});let s=i.get(a.abilityId);s.count++,(!s.lastProc||a.timestamp>s.lastProc)&&(s.lastProc=a.timestamp)}for(let a of i.values())a.procsPerMinute=a.count/n*6e4,a.procsPerHour=a.count/n*36e5;return{totalProcs:r.length,abilities:i}}getTopAbilities(t=10,n=36e5){return Array.from(this.getStats(n).values()).sort((r,i)=>i.count-r.count).slice(0,t)}clear(){this.logs=[]}setMaxLogs(t){this.maxLogs=t,this.logs.length>t&&(this.logs=this.logs.slice(-t))}getLogCount(){return this.logs.length}isActive(){return this.isInitialized}destroy(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null),this.logs=[],this.isInitialized=!1}},ft=null;function fl(){return ft||(ft=new dn,ft.init()),ft}function bl(){ft&&(ft.destroy(),ft=null)}var pn=class{constructor(){se(this,"stats");se(this,"storageKey","gemini_stats");this.stats=this.loadStats(),this.startSession()}loadStats(){try{let t=localStorage.getItem(this.storageKey);if(t)return JSON.parse(t)}catch(t){console.warn("[StatsTracker] Failed to load stats:",t)}return this.getDefaultStats()}saveStats(){try{localStorage.setItem(this.storageKey,JSON.stringify(this.stats))}catch(t){console.warn("[StatsTracker] Failed to save stats:",t)}}getDefaultStats(){return{session:{sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},allTime:{totalSessions:0,totalPlayTime:0,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0,crops:{},pets:{}}}}startSession(){this.stats.session={sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},this.stats.allTime.totalSessions++,this.saveStats()}endSession(){this.stats.session.sessionEnd=Date.now();let t=this.stats.session.sessionEnd-this.stats.session.sessionStart;this.stats.allTime.totalPlayTime+=t,this.saveStats()}recordHarvest(t,n=1,o=[]){this.stats.session.cropsHarvested+=n,this.stats.allTime.cropsHarvested+=n,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].harvested+=n;for(let r of o)this.stats.allTime.crops[t].mutations[r]||(this.stats.allTime.crops[t].mutations[r]=0),this.stats.allTime.crops[t].mutations[r]++;this.saveStats()}recordCropSale(t,n=1,o=0){this.stats.session.cropsSold+=n,this.stats.session.coinsEarned+=o,this.stats.allTime.cropsSold+=n,this.stats.allTime.coinsEarned+=o,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].sold+=n,this.stats.allTime.crops[t].totalValue+=o,this.saveStats()}recordPetHatch(t,n=[],o=[]){this.stats.session.petsHatched++,this.stats.allTime.petsHatched++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].hatched++;for(let r of n)this.stats.allTime.pets[t].mutations[r]||(this.stats.allTime.pets[t].mutations[r]=0),this.stats.allTime.pets[t].mutations[r]++;for(let r of o)this.stats.allTime.pets[t].abilities[r]||(this.stats.allTime.pets[t].abilities[r]=0),this.stats.allTime.pets[t].abilities[r]++;this.saveStats()}recordPetSale(t,n=0){this.stats.session.petsSold++,this.stats.session.coinsEarned+=n,this.stats.allTime.petsSold++,this.stats.allTime.coinsEarned+=n,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].sold++,this.saveStats()}recordPetFeed(t){this.stats.session.petsFed++,this.stats.allTime.petsFed++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].fed++,this.saveStats()}recordSeedPurchase(t,n=1,o=0){this.stats.session.seedsPurchased+=n,this.stats.session.coinsSpent+=o,this.stats.allTime.seedsPurchased+=n,this.stats.allTime.coinsSpent+=o,this.saveStats()}recordEggPurchase(t,n=1,o=0){this.stats.session.eggsPurchased+=n,this.stats.session.coinsSpent+=o,this.stats.allTime.eggsPurchased+=n,this.stats.allTime.coinsSpent+=o,this.saveStats()}recordAbilityProc(t){this.stats.session.abilityProcs++,this.stats.allTime.abilityProcs++,this.saveStats()}recordCoinsEarned(t){this.stats.session.coinsEarned+=t,this.stats.allTime.coinsEarned+=t,this.saveStats()}recordCoinsSpent(t){this.stats.session.coinsSpent+=t,this.stats.allTime.coinsSpent+=t,this.saveStats()}getStats(){return{...this.stats}}getSessionStats(){return{...this.stats.session}}getAllTimeStats(){return{...this.stats.allTime}}getCropStats(t){return this.stats.allTime.crops[t]||null}getPetStats(t){return this.stats.allTime.pets[t]||null}getTopCrops(t=10){return Object.entries(this.stats.allTime.crops).map(([n,o])=>({species:n,stats:o})).sort((n,o)=>o.stats.harvested-n.stats.harvested).slice(0,t)}getTopPets(t=10){return Object.entries(this.stats.allTime.pets).map(([n,o])=>({species:n,stats:o})).sort((n,o)=>o.stats.hatched-n.stats.hatched).slice(0,t)}resetSession(){this.startSession()}resetAll(){this.stats=this.getDefaultStats(),this.saveStats()}exportStats(){return JSON.stringify(this.stats,null,2)}importStats(t){try{let n=JSON.parse(t);return this.stats=n,this.saveStats(),!0}catch(n){return console.warn("[StatsTracker] Failed to import stats:",n),!1}}},Lt=null;function hl(){return Lt||(Lt=new pn),Lt}function yl(){Lt&&(Lt.endSession(),Lt=null)}var vl={AbilityLogger:dn,getAbilityLogger:fl,destroyAbilityLogger:bl,...wo},xl={StatsTracker:pn,getStatsTracker:hl,destroyStatsTracker:yl};async function Sl(e){let t=[{name:"Data",init:()=>me.init()},{name:"AntiAfk",init:()=>Kt.init()},{name:"Sprites",init:()=>pe.init()},{name:"TileObjectSystem",init:()=>_e.init()},{name:"Pixi",init:()=>Jt.init()},{name:"Audio",init:()=>en.init()},{name:"Cosmetics",init:()=>tn.init()}];await Promise.all(t.map(async n=>{e?.({status:"start",name:n.name});try{await n.init(),e?.({status:"success",name:n.name})}catch(o){console.error(`[${n.name}] failed`,o),e?.({status:"error",name:n.name,error:o})}})),console.log("[Gemini] Modules ready. Access via Gemini.Modules in console.")}function V(e,t={},n=P){return is(e,t,n)}function wl(e,t=P){return V(M.Chat,{scopePath:["Room"],message:e},t)}function Tl(e,t=P){return V(M.Emote,{scopePath:["Room"],emoteType:e},t)}function kl(e,t=P){return V(M.Wish,{wish:e},t)}function Cl(e,t=P){return V(M.KickPlayer,{scopePath:["Room"],playerId:e},t)}function Pl(e,t=P){return V(M.SetPlayerData,{scopePath:["Room"],data:e},t)}function Al(e=P){return V(M.UsurpHost,{},e)}function Ml(e=P){return V(M.ReportSpeakingStart,{},e)}function Il(e,t=P){return V(M.SetSelectedGame,{scopePath:["Room"],gameId:e},t)}function El(e,t=P){return V(M.VoteForGame,{scopePath:["Room"],gameId:e},t)}function Ll(e,t=P){return V(M.RequestGame,{scopePath:["Room"],gameId:e},t)}function Rl(e=P){return V(M.RestartGame,{scopePath:["Room"]},e)}function Ol(e,t=P){return V(M.Ping,{id:e},t)}function ti(e,t,n=P){return V(M.PlayerPosition,{x:e,y:t},n)}var Dl=ti;function Hl(e,t,n=P){return V(M.Teleport,{x:e,y:t},n)}function Gl(e=P){return V(M.CheckWeatherStatus,{},e)}function Nl(e,t,n=P){return V(M.MoveInventoryItem,{fromIndex:e,toIndex:t},n)}function _l(e,t=P){return V(M.DropObject,{slotIndex:e},t)}function Wl(e,t=P){return V(M.PickupObject,{objectId:e},t)}function Bl(e,t,n=P){return V(M.ToggleFavoriteItem,{itemId:e,favorite:t},n)}function jl(e,t=P){return V(M.PutItemInStorage,{itemId:e},t)}function Fl(e,t=P){return V(M.RetrieveItemFromStorage,{itemId:e},t)}function zl(e,t,n=P){return V(M.MoveStorageItem,{fromIndex:e,toIndex:t},n)}function Ul(e=P){return V(M.LogItems,{},e)}function Vl(e,t,n,o=P){return V(M.PlantSeed,{seedId:e,x:t,y:n},o)}function $l(e,t=P){return V(M.WaterPlant,{plantId:e},t)}function Kl(e,t=P){return V(M.HarvestCrop,{cropId:e},t)}function ql(e=P){return V(M.SellAllCrops,{},e)}function Jl(e,t=P){return V(M.PurchaseDecor,{decorId:e},t)}function Yl(e,t=P){return V(M.PurchaseEgg,{eggId:e},t)}function Xl(e,t=P){return V(M.PurchaseTool,{toolId:e},t)}function Ql(e,t=P){return V(M.PurchaseSeed,{seedId:e},t)}function Zl(e,t,n,o=P){return V(M.PlantEgg,{eggId:e,x:t,y:n},o)}function ec(e,t=P){return V(M.HatchEgg,{eggId:e},t)}function tc(e,t,n,o=P){return V(M.PlantGardenPlant,{plantId:e,x:t,y:n},o)}function nc(e,t,n=P){return V(M.PotPlant,{plantId:e,potId:t},n)}function rc(e,t,n=P){return V(M.MutationPotion,{potionId:e,targetId:t},n)}function oc(e,t=P){return V(M.PickupDecor,{decorInstanceId:e},t)}function ic(e,t,n,o=P){return V(M.PlaceDecor,{decorId:e,x:t,y:n},o)}function ac(e,t=P){return V(M.RemoveGardenObject,{objectId:e},t)}function sc(e,t,n,o=P){return V(M.PlacePet,{petId:e,x:t,y:n},o)}function lc(e,t,n=P){return V(M.FeedPet,{petId:e,foodItemId:t},n)}function cc(e,t=P){return V(M.PetPositions,{positions:e},t)}function uc(e,t,n=P){return V(M.SwapPet,{petIdA:e,petIdB:t},n)}function dc(e,t=P){return V(M.StorePet,{petId:e},t)}function pc(e,t,n=P){return V(M.NamePet,{petId:e,name:t},n)}function mc(e,t=P){return V(M.SellPet,{petId:e},t)}var iy={Store:{select:Z.select.bind(Z),set:Z.set.bind(Z),subscribe:Z.subscribe.bind(Z),subscribeImmediate:Z.subscribeImmediate.bind(Z)},Globals:pr,Modules:{Version:Ft,Assets:De,Manifest:Me,Data:me,AntiAfk:Kt,Environment:Pe,Sprite:pe,Tile:_e,Pixi:Jt,Audio:en,Cosmetic:tn,Achievements:rr,Calculators:sr,Pets:vl,Tracker:xl},WebSocket:{chat:wl,emote:Tl,wish:kl,kickPlayer:Cl,setPlayerData:Pl,usurpHost:Al,reportSpeakingStart:Ml,setSelectedGame:Il,voteForGame:El,requestGame:Ll,restartGame:Rl,ping:Ol,checkWeatherStatus:Gl,move:Dl,playerPosition:ti,teleport:Hl,moveInventoryItem:Nl,dropObject:_l,pickupObject:Wl,toggleFavoriteItem:Bl,putItemInStorage:jl,retrieveItemFromStorage:Fl,moveStorageItem:zl,logItems:Ul,plantSeed:Vl,waterPlant:$l,harvestCrop:Kl,sellAllCrops:ql,purchaseDecor:Jl,purchaseEgg:Yl,purchaseTool:Xl,purchaseSeed:Ql,plantEgg:Zl,hatchEgg:ec,plantGardenPlant:tc,potPlant:nc,mutationPotion:rc,pickupDecor:oc,placeDecor:ic,removeGardenObject:ac,placePet:sc,feedPet:lc,petPositions:cc,swapPet:uc,storePet:dc,namePet:pc,sellPet:mc},_internal:{getGlobals:We,initGlobals:dr,destroyGlobals:gl}};function gc(){P.Gemini=iy}function ri(e){e.logStep("WebSocket","Capturing WebSocket...");let t=null;return t=Vn(n=>{n.ws&&(e.logStep("WebSocket","WebSocket captured","success"),t?.(),t=null)},{intervalMs:250}),fs({debug:!1}),()=>{t?.(),t=null}}async function oi(e){e.logStep("Atoms","Prewarming Jotai store...");try{await Ao(),await cr({timeoutMs:8e3,intervalMs:50}),e.logStep("Atoms","Jotai store ready","success")}catch(t){e.logStep("Atoms","Jotai store not captured yet","error"),console.warn("[Bootstrap] Jotai store wait failed",t)}}function ii(e){e.logStep("Globals","Initializing global variables...");try{dr(),e.logStep("Globals","Global variables ready","success")}catch(t){e.logStep("Globals","Failed to initialize global variables","error"),console.warn("[Bootstrap] Global variables init failed",t)}}function ai(e){e.logStep("API","Exposing Gemini API...");try{gc(),e.logStep("API","Gemini API ready","success")}catch(t){e.logStep("API","Failed to expose API","error"),console.warn("[Bootstrap] API init failed",t)}}function ni(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0)})}async function si(e){e.logStep("HUD","Loading HUD preferences..."),await ni();let t=Yr();await ni();let n=await Jr({hostId:"gemini-hud-root",initialWidth:t.width,initialOpen:t.isOpen,onWidthChange:o=>kt("width",o),onOpenChange:o=>kt("isOpen",o),themes:Ke,initialTheme:t.theme,onThemeChange:o=>kt("theme",o),buildSections:o=>jr({applyTheme:o.applyTheme,initialTheme:o.initialTheme,getCurrentTheme:o.getCurrentTheme}),initialTab:t.activeTab,onTabChange:o=>kt("activeTab",o)});return await ni(),e.logStep("HUD","HUD ready","success"),n}async function li(e){e.setSubtitle("Activating Gemini modules..."),await Sl(t=>{t.status==="start"?e.logStep(t.name,`Loading ${t.name}...`):t.status==="success"?e.logStep(t.name,`${t.name} ready`,"success"):e.logStep(t.name,`${t.name} encountered an issue.`,"error")})}async function ci(e){e.logStep("Sprites","Warming up sprite cache...");try{pe.ready()||await pe.init();let t=[],n=me.get("plants");if(n)for(let a of Object.values(n))a?.seed?.spriteId&&t.push(a.seed.spriteId),a?.plant?.spriteId&&t.push(a.plant.spriteId),a?.crop?.spriteId&&t.push(a.crop.spriteId);let o=me.get("pets");if(o)for(let a of Object.values(o))a?.spriteId&&t.push(a.spriteId);let r=[...new Set(t)],i=r.length;if(i===0){e.logStep("Sprites","No sprites to warmup","success");return}await pe.warmup(r,(a,s)=>{e.logStep("Sprites",`Loading sprites (${a}/${s})...`)},5),e.logStep("Sprites",`${i} sprites loaded`,"success")}catch(t){e.logStep("Sprites","Sprite warmup failed","error"),console.warn("[Bootstrap] Sprite warmup failed",t)}}async function ui(e){e.logStep("Sections","Preloading UI sections...");try{await Br(),e.logStep("Sections","Sections preloaded","success")}catch(t){e.logStep("Sections","Sections preload failed","error"),console.warn("[Bootstrap] Sections preload failed",t)}}(async function(){"use strict";let e=gr({title:"Gemini is loading",subtitle:"Connecting and preparing modules..."}),t=null;try{t=ri(e),await oi(e),ii(e),ai(e),await li(e),await ci(e),await ui(e),e.succeed("Gemini is ready!")}catch(o){e.fail("Failed to initialize the mod.",o)}finally{t?.()}let n=await si(e);Un({onClick:()=>n.setOpen(!0)})})();})();
