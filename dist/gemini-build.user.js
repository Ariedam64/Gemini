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
"use strict";(()=>{var Ki=Object.defineProperty;var $d=(e,t,n)=>t in e?Ki(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var O=(e,t)=>()=>(e&&(t=e(e=0)),t);var Ot=(e,t)=>{for(var n in t)Ki(e,n,{get:t[n],enumerable:!0})};var ee=(e,t,n)=>$d(e,typeof t!="symbol"?t+"":t,n);function ep(){try{let e=window.visualViewport,t=Math.round((e?.width??window.innerWidth)||0),n=Math.round((e?.height??window.innerHeight)||0);if(t&&n)return t>=n?"landscape":"portrait"}catch{}return"unknown"}function os(){let e=navigator.userAgent||"",t=navigator.platform||"",n=navigator.userAgentData;if(n&&typeof n.platform=="string"){let o=n.platform.toLowerCase();if(o.includes("windows"))return"windows";if(o.includes("mac"))return"mac";if(o.includes("android"))return"android";if(o.includes("chrome os")||o.includes("cros"))return"chromeos";if(o.includes("linux"))return"linux";if(o.includes("ios"))return"ios"}return/iPhone|iPad|iPod/i.test(e)||t==="MacIntel"&&(navigator.maxTouchPoints??0)>1?"ios":/Android/i.test(e)?"android":/CrOS/i.test(e)?"chromeos":/Win/i.test(e)?"windows":/Mac/i.test(e)?"mac":/Linux/i.test(e)?"linux":"unknown"}function rs(){let e=navigator.userAgent||"",t=navigator.userAgentData;if(t&&Array.isArray(t.brands)){let n=t.brands.map(i=>String(i.brand||i.brandName||i.brandVersion||i)),r=n.some(i=>/Edge/i.test(i)||/Microsoft Edge/i.test(i)),o=n.some(i=>/Opera/i.test(i)||/OPR/i.test(i)),a=n.some(i=>/Chrome|Chromium/i.test(i));if(r)return"Edge";if(o)return"Opera";if(a)return"Chrome";if(navigator.brave)return"Brave"}return/FxiOS/i.test(e)?"Firefox":/CriOS/i.test(e)?"Chrome":/EdgiOS/i.test(e)?"Edge":/OPiOS|OPR|Opera Mini|Opera/i.test(e)?"Opera":/Edg\//i.test(e)?"Edge":/OPR\//i.test(e)||/Opera/i.test(e)?"Opera":/Firefox/i.test(e)?"Firefox":/Safari/i.test(e)&&!/Chrome|Chromium|Edg|OPR/i.test(e)?"Safari":/Brave/i.test(e)||window.Brave||navigator.brave?"Brave":/Chrome|Chromium/i.test(e)?"Chrome":"Unknown"}function tp(){let e=navigator.userAgent||"",t=navigator.userAgentData;return t&&typeof t.mobile=="boolean"?t.mobile?"mobile":"desktop":/Android|iPhone|iPad|iPod|Mobile/i.test(e)?"mobile":"desktop"}function np(e){if(!e)return null;try{return new URL(e).hostname}catch{return null}}function Tr(){let e=(()=>{try{return window.top!==window.self}catch{return!0}})(),t=np(document.referrer),r=e&&!!t&&/(^|\.)discord(app)?\.com$/i.test(t)?"discord":"web",o=tp(),a=os(),i=rs(),s=window.screen||{},u=window.visualViewport,d=Math.round(window.innerWidth||document.documentElement.clientWidth||0),l=Math.round(window.innerHeight||document.documentElement.clientHeight||0),c=Math.round(u?.width??d),p=Math.round(u?.height??l),m=Math.round(s.width||0),g=Math.round(s.height||0),f=Math.round(s.availWidth||m),h=Math.round(s.availHeight||g),b=Number.isFinite(window.devicePixelRatio)?window.devicePixelRatio:1;return{surface:r,host:location.hostname,origin:location.origin,isInIframe:e,platform:o,browser:i,os:a,viewportWidth:d,viewportHeight:l,visualViewportWidth:c,visualViewportHeight:p,screenWidth:m,screenHeight:g,availScreenWidth:f,availScreenHeight:h,dpr:b,orientation:ep()}}function op(){return Tr().surface==="discord"}function rp(){return Tr().platform==="mobile"}var Le,Gt=O(()=>{"use strict";Le={detect:Tr,isDiscord:op,isMobile:rp,detectOS:os,detectBrowser:rs}});function hp(){if(typeof unsafeWindow<"u"&&unsafeWindow)return unsafeWindow;let e=window.wrappedJSObject;return e&&e!==window?e:bp}var bp,yp,A,ye=O(()=>{"use strict";bp=window;yp=hp(),A=yp});var gs={};Ot(gs,{clamp:()=>De,clamp01:()=>Ar,sleep:()=>Qe,tryDo:()=>Me,waitWithTimeout:()=>mo});async function mo(e,t,n){let r=performance.now();for(;performance.now()-r<t;){let o=await Promise.race([e,Qe(50).then(()=>null)]);if(o!==null)return o}throw new Error(`${n} timeout`)}var Qe,Me,De,Ar,Ze=O(()=>{"use strict";Qe=e=>new Promise(t=>setTimeout(t,e)),Me=e=>{try{return e()}catch{return}},De=(e,t,n)=>Math.max(t,Math.min(n,e)),Ar=e=>De(e,0,1)});function Bp(e){return!!(e&&typeof e=="object"&&typeof e.start=="function"&&typeof e.destroy=="function"&&e.app&&e.app.stage&&e.app.renderer&&e.systems&&typeof e.systems.values=="function")}function jp(e){try{for(let t of e.systems.values()){let n=t?.system;if(n?.name==="tileObject")return n}}catch{}return null}function Up(e){re.engine=e,re.tos=jp(e)||null,re.app=e.app||null,re.renderer=e.app?.renderer||null,re.ticker=e.app?.ticker||null,re.stage=e.app?.stage||null;try{bs(e)}catch{}try{re.app&&hs(re.app)}catch{}try{re.renderer&&ys(re.renderer)}catch{}}function Ir(){return re.engine?!0:(re._bindPatched||(re._bindPatched=!0,Function.prototype.bind=function(e,...t){let n=fs.call(this,e,...t);try{!re.engine&&Bp(e)&&(Function.prototype.bind=fs,re._bindPatched=!1,Up(e))}catch{}return n}),!1)}async function zp(e=15e3){let t=performance.now();for(;performance.now()-t<e;){if(re.engine)return!0;Ir(),await Qe(50)}throw new Error("MGPixiHooks: engine capture timeout")}async function Vp(e=15e3){return re.engine||await zp(e),!0}function $p(){return re.engine&&re.app?{ok:!0,engine:re.engine,tos:re.tos,app:re.app}:(Ir(),{ok:!1,engine:re.engine,tos:re.tos,app:re.app,note:"Not captured. Wait for room, or reload."})}var fs,re,bs,hs,ys,_p,Wp,Fp,Pe,pn=O(()=>{"use strict";Ze();ye();fs=Function.prototype.bind,re={_bindPatched:!1,engine:null,tos:null,app:null,renderer:null,ticker:null,stage:null},_p=new Promise(e=>{bs=e}),Wp=new Promise(e=>{hs=e}),Fp=new Promise(e=>{ys=e});Ir();Pe={engineReady:_p,appReady:Wp,rendererReady:Fp,engine:()=>re.engine,tos:()=>re.tos,app:()=>re.app,renderer:()=>re.renderer,ticker:()=>re.ticker,stage:()=>re.stage,PIXI:()=>A.PIXI||null,init:Vp,hook:$p,ready:()=>!!re.engine}});function xs(){return typeof GM_xmlhttpRequest=="function"}function Ss(e,t="text"){return new Promise((n,r)=>{GM_xmlhttpRequest({method:"GET",url:e,responseType:t,onload:o=>o.status>=200&&o.status<300?n(o):r(new Error(`HTTP ${o.status} for ${e}`)),onerror:()=>r(new Error(`Network error for ${e}`)),ontimeout:()=>r(new Error(`Timeout for ${e}`))})})}async function Nt(e){if(xs())return JSON.parse((await Ss(e,"text")).responseText);let t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.json()}async function go(e){if(xs())return(await Ss(e,"blob")).response;let t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.blob()}function ws(e){return new Promise((t,n)=>{let r=URL.createObjectURL(e),o=A?.Image||Image,a=new o;a.decoding="async",a.onload=()=>{URL.revokeObjectURL(r),t(a)},a.onerror=()=>{URL.revokeObjectURL(r),n(new Error("Image decode failed"))},a.src=r})}var vs,mn=O(()=>{"use strict";ye();vs=A?.location?.origin||"https://magicgarden.gg"});var Ae,Kp,Er,_t=O(()=>{"use strict";Ae=(e,t)=>e.replace(/\/?$/,"/")+String(t||"").replace(/^\//,""),Kp=e=>e.lastIndexOf("/")>=0?e.slice(0,e.lastIndexOf("/")+1):"",Er=(e,t)=>String(t||"").startsWith("/")?String(t).slice(1):Kp(e)+String(t||"")});function Jp(){return A?.document??(typeof document<"u"?document:null)}function Lr(e){if(gn!==null)return;let t=e??Jp();if(!t)return;let n=t.scripts;for(let r=0;r<n.length;r++){let a=n.item(r)?.src;if(!a)continue;let i=a.match(/\/(?:r\/\d+\/)?version\/([^/]+)/);if(i?.[1]){gn=i[1];return}}}function qp(){return Lr(),gn}async function Yp(e=15e3){let t=performance.now();for(;performance.now()-t<e;){if(Lr(),gn)return gn;await Qe(50)}throw new Error("MGVersion timeout (gameVersion not found)")}var gn,fn,Dr=O(()=>{"use strict";ye();Ze();gn=null;fn={init:Lr,get:qp,wait:Yp}});async function Ts(){return bo||fo||(fo=(async()=>{let e=await fn.wait(15e3);return bo=`${vs}/version/${e}/assets/`,bo})(),fo)}async function Xp(e){let t=await Ts();return Ae(t,e)}var fo,bo,Fe,Wt=O(()=>{"use strict";mn();_t();Dr();fo=null,bo=null;Fe={base:Ts,url:Xp}});function bn(e){let t=String(e||"").trim();return t?t.startsWith("sprite/")||t.startsWith("sprites/")?t:t.includes("/")?`sprite/${t}`:t:""}function Ft(e,t){let n=String(e||"").trim().replace(/^sprites?\//,"").replace(/^\/+|\/+$/g,""),r=String(t||"").trim();return r.includes("/")||!n?bn(r):`sprite/${n}/${r}`}function ft(e,t,n,r){let o=Ft(e,t);if(n.has(o)||r.has(o))return o;let a=String(t||"").trim();if(n.has(a)||r.has(a))return a;let i=bn(a);return n.has(i)||r.has(i)?i:o}function Qp(e,t,n=25e3){let r=[e],o=new Set,a=0;for(;r.length&&a++<n;){let i=r.pop();if(!i||o.has(i))continue;if(o.add(i),t(i))return i;let s=i.children;if(Array.isArray(s))for(let u=s.length-1;u>=0;u--)r.push(s[u])}return null}function Zp(e){let t=A.PIXI;if(t?.Texture&&t?.Sprite&&t?.Container&&t?.Rectangle)return{Container:t.Container,Sprite:t.Sprite,Texture:t.Texture,Rectangle:t.Rectangle,AnimatedSprite:t.AnimatedSprite||null};let n=e?.stage,r=Qp(n,o=>o?.texture?.frame&&o?.constructor&&o?.texture?.constructor&&o?.texture?.frame?.constructor);if(!r)throw new Error("No Sprite found yet (constructors).");return{Container:n.constructor,Sprite:r.constructor,Texture:r.texture.constructor,Rectangle:r.texture.frame.constructor,AnimatedSprite:t?.AnimatedSprite||null}}async function ks(e,t=15e3){let{sleep:n}=await Promise.resolve().then(()=>(Ze(),gs)),r=performance.now();for(;performance.now()-r<t;)try{return Zp(e)}catch{await n(50)}throw new Error("Constructors timeout")}var ct,ho=O(()=>{"use strict";ye();ct=(...e)=>{try{console.log("[MGSprite]",...e)}catch{}}});async function em(e){let t=e||await Fe.base();if(Rr.has(t))return Rr.get(t);let n=Nt(Ae(t,"manifest.json"));return Rr.set(t,n),n}function tm(e,t){return e?.bundles?.find(n=>n?.name===t)||null}function nm(e){let t=new Set;for(let n of e?.assets||[])for(let r of n?.src||[])typeof r=="string"&&r.endsWith(".json")&&r!=="manifest.json"&&t.add(r);return Array.from(t)}var Rr,Re,hn=O(()=>{"use strict";mn();_t();Wt();Rr=new Map;Re={load:em,getBundle:tm,listJsonFromBundle:nm}});function om(e){return e&&typeof e=="object"&&e.frames&&e.meta&&typeof e.meta.image=="string"}function Or(e,t,n,r,o){return new e(t,n,r,o)}function rm(e,t,n,r,o,a,i){let s;try{s=new e({source:t.source,frame:n,orig:r,trim:o||void 0,rotate:a||0})}catch{s=new e(t.baseTexture||t,n,r,o||void 0,a||0)}if(i)if(s.defaultAnchor?.set)try{s.defaultAnchor.set(i.x,i.y)}catch{}else s.defaultAnchor?(s.defaultAnchor.x=i.x,s.defaultAnchor.y=i.y):s.defaultAnchor={x:i.x,y:i.y};try{s.updateUvs?.()}catch{}return s}function am(e,t,n,r){let{Texture:o,Rectangle:a}=r;for(let[i,s]of Object.entries(e.frames)){let u=s.frame,d=!!s.rotated,l=d?2:0,c=d?u.h:u.w,p=d?u.w:u.h,m=Or(a,u.x,u.y,c,p),g=s.sourceSize||{w:u.w,h:u.h},f=Or(a,0,0,g.w,g.h),h=null;if(s.trimmed&&s.spriteSourceSize){let b=s.spriteSourceSize;h=Or(a,b.x,b.y,b.w,b.h)}n.set(i,rm(o,t,m,f,h,l,s.anchor||null))}}function im(e,t,n){if(!(!e.animations||typeof e.animations!="object"))for(let[r,o]of Object.entries(e.animations)){if(!Array.isArray(o))continue;let a=o.map(i=>t.get(i)).filter(Boolean);a.length>=2&&n.set(r,a)}}function sm(e,t){let n=(r,o)=>{let a=String(r||"").trim(),i=String(o||"").trim();!a||!i||(t.has(a)||t.set(a,new Set),t.get(a).add(i))};for(let r of Object.keys(e.frames||{})){let o=/^sprite\/([^/]+)\/(.+)$/.exec(r);o&&n(o[1],o[2])}}async function Cs(e,t){let n=await Re.load(e),r=Re.getBundle(n,"default");if(!r)throw new Error("No default bundle in manifest");let o=Re.listJsonFromBundle(r),a=new Set,i=new Map,s=new Map,u=new Map;async function d(l){if(a.has(l))return;a.add(l);let c=await Nt(Ae(e,l));if(!om(c))return;let p=c.meta?.related_multi_packs;if(Array.isArray(p))for(let h of p)await d(Er(l,h));let m=Er(l,c.meta.image),g=await ws(await go(Ae(e,m))),f=t.Texture.from(g);am(c,f,i,t),im(c,i,s),sm(c,u)}for(let l of o)await d(l);return{textures:i,animations:s,categoryIndex:u}}var Ps=O(()=>{"use strict";mn();_t();hn()});function As(){return{lru:new Map,cost:0,srcCanvas:new Map}}function Gr(e,t){return`${t.sig}::${e}`}function Is(e){return e?e.isAnim?e.frames?.length||0:e.tex?1:0:0}function lm(e,t,n){e.lru.delete(t),e.lru.set(t,n)}function cm(e,t){if(t.enabled)for(;e.lru.size>t.maxEntries||e.cost>t.maxCost;){let n=e.lru.keys().next().value;if(n===void 0)break;let r=e.lru.get(n);e.lru.delete(n),e.cost=Math.max(0,e.cost-Is(r??null))}}function Hr(e,t){let n=e.lru.get(t);return n?(lm(e,t,n),n):null}function Nr(e,t,n,r){e.lru.set(t,n),e.cost+=Is(n),cm(e,r)}function Es(e){e.lru.clear(),e.cost=0,e.srcCanvas.clear()}function Ls(e,t){return e.srcCanvas.get(t)??null}function Ds(e,t,n,r){if(e.srcCanvas.set(t,n),e.srcCanvas.size>r.srcCanvasMax){let o=e.srcCanvas.keys().next().value;o!==void 0&&e.srcCanvas.delete(o)}}var Ms,yn=O(()=>{"use strict";Ms={enabled:!0,maxEntries:1200,maxCost:5e3,srcCanvasMax:450}});function yo(e){return[...new Set(e.filter(Boolean))].sort((n,r)=>(Rs.get(n)??1/0)-(Rs.get(r)??1/0))}function _r(e){if(!e.length)return{muts:[],overlayMuts:[],selectedMuts:[],sig:""};let t=yo(e),n=pm(e),r=mm(e);return{muts:n,overlayMuts:r,selectedMuts:t,sig:`${t.join(",")}|${n.join(",")}|${r.join(",")}`}}function pm(e){let t=e.filter((o,a,i)=>bt[o]&&i.indexOf(o)===a);if(!t.length)return[];if(t.includes("Gold"))return["Gold"];if(t.includes("Rainbow"))return["Rainbow"];let n=["Ambershine","Dawnlit","Dawncharged","Ambercharged"];return t.some(o=>n.includes(o))?yo(t.filter(o=>!dm.includes(o))):yo(t)}function mm(e){let t=e.filter((n,r,o)=>bt[n]?.overlayTall&&o.indexOf(n)===r);return yo(t)}function vo(e,t){return e.map(n=>({name:n,meta:bt[n],overlayTall:bt[n]?.overlayTall??null,isTall:t}))}var bt,Os,um,Rs,dm,Gs,Hs,Ns,_s,Ws,Fs,Bt=O(()=>{"use strict";bt={Gold:{overlayTall:null,tallIconOverride:null},Rainbow:{overlayTall:null,tallIconOverride:null,angle:130,angleTall:0},Wet:{overlayTall:"sprite/mutation-overlay/WetTallPlant",tallIconOverride:"sprite/mutation/Puddle"},Chilled:{overlayTall:"sprite/mutation-overlay/ChilledTallPlant",tallIconOverride:null},Frozen:{overlayTall:"sprite/mutation-overlay/FrozenTallPlant",tallIconOverride:null},Dawnlit:{overlayTall:null,tallIconOverride:null},Ambershine:{overlayTall:null,tallIconOverride:null},Dawncharged:{overlayTall:null,tallIconOverride:null},Ambercharged:{overlayTall:null,tallIconOverride:null}},Os=Object.keys(bt),um=["Gold","Rainbow","Wet","Chilled","Frozen","Ambershine","Dawnlit","Dawncharged","Ambercharged"],Rs=new Map(um.map((e,t)=>[e,t]));dm=["Wet","Chilled","Frozen"],Gs=new Set(["Dawnlit","Ambershine","Dawncharged","Ambercharged"]),Hs={Banana:.6,Carrot:.6,Sunflower:.5,Starweaver:.5,FavaBean:.25,BurrosTail:.2},Ns={Pepper:.5,Banana:.6},_s=256,Ws=.5,Fs=2});function fm(e){return xo.has(e)?e:xo.has("overlay")?"overlay":xo.has("screen")?"screen":xo.has("lighter")?"lighter":"source-atop"}function bm(e,t,n,r,o=!1){let a=(r-90)*Math.PI/180,i=t/2,s=n/2;if(!o){let c=Math.min(t,n)/2;return e.createLinearGradient(i-Math.cos(a)*c,s-Math.sin(a)*c,i+Math.cos(a)*c,s+Math.sin(a)*c)}let u=Math.cos(a),d=Math.sin(a),l=Math.abs(u)*t/2+Math.abs(d)*n/2;return e.createLinearGradient(i-u*l,s-d*l,i+u*l,s+d*l)}function Bs(e,t,n,r,o=!1){let a=r.colors?.length?r.colors:["#fff"],i=r.ang!=null?bm(e,t,n,r.ang,o):e.createLinearGradient(0,0,0,n);a.length===1?(i.addColorStop(0,a[0]),i.addColorStop(1,a[0])):a.forEach((s,u)=>i.addColorStop(u/(a.length-1),s)),e.fillStyle=i,e.fillRect(0,0,t,n)}function js(e,t,n,r){let o=gm[n];if(!o)return;let a={...o};n==="Rainbow"&&r&&a.angTall!=null&&(a.ang=a.angTall);let i=n==="Rainbow"&&r,s=t.width,u=t.height;e.save();let d=a.masked?fm(a.op):"source-in";if(e.globalCompositeOperation=d,a.a!=null&&(e.globalAlpha=a.a),a.masked){let l=document.createElement("canvas");l.width=s,l.height=u;let c=l.getContext("2d");c.imageSmoothingEnabled=!1,Bs(c,s,u,a,i),c.globalCompositeOperation="destination-in",c.drawImage(t,0,0),e.drawImage(l,0,0)}else Bs(e,s,u,a,i);e.restore()}var gm,xo,Us=O(()=>{"use strict";gm={Gold:{op:"source-atop",colors:["rgb(235,200,0)"],a:.7},Rainbow:{op:"color",colors:["#FF1744","#FF9100","#FFEA00","#00E676","#2979FF","#D500F9"],ang:130,angTall:0,masked:!0},Wet:{op:"source-atop",colors:["rgb(50,180,200)"],a:.25},Chilled:{op:"source-atop",colors:["rgb(100,160,210)"],a:.45},Frozen:{op:"source-atop",colors:["rgb(100,130,220)"],a:.5},Dawnlit:{op:"source-atop",colors:["rgb(209,70,231)"],a:.5},Ambershine:{op:"source-atop",colors:["rgb(190,100,40)"],a:.5},Dawncharged:{op:"source-atop",colors:["rgb(140,80,200)"],a:.5},Ambercharged:{op:"source-atop",colors:["rgb(170,60,25)"],a:.5}},xo=(()=>{try{let t=document.createElement("canvas").getContext("2d");if(!t)return new Set;let n=["color","hue","saturation","luminosity","overlay","screen","lighter","source-atop"],r=new Set;for(let o of n)t.globalCompositeOperation=o,t.globalCompositeOperation===o&&r.add(o);return r}catch{return new Set}})()});function zs(e){return/tallplant/i.test(e)}function So(e){let t=String(e||"").split("/");return t[t.length-1]||""}function Vs(e){switch(e){case"Ambershine":return["Ambershine","Amberlit"];case"Dawncharged":return["Dawncharged","Dawnbound"];case"Ambercharged":return["Ambercharged","Amberbound"];default:return[e]}}function hm(e,t){let n=String(e||"").toLowerCase();for(let r of t.keys()){let o=/sprite\/mutation-overlay\/([A-Za-z0-9]+)TallPlant/i.exec(String(r));if(!o||!o[1])continue;if(o[1].toLowerCase()===n){let i=t.get(r);if(i)return{tex:i,key:r}}}return null}function $s(e,t,n,r){if(!t)return null;let o=So(e),a=Vs(t);for(let i of a){let s=[`sprite/mutation/${i}${o}`,`sprite/mutation/${i}-${o}`,`sprite/mutation/${i}_${o}`,`sprite/mutation/${i}/${o}`,`sprite/mutation/${i}`];for(let u of s){let d=n.get(u);if(d)return{tex:d,key:u}}if(r){let u=`sprite/mutation-overlay/${i}TallPlant`,d=n.get(u);if(d)return{tex:d,key:u};let l=`sprite/mutation-overlay/${i}`,c=n.get(l);if(c)return{tex:c,key:l};let p=hm(t,n);if(p)return p}}return null}function Ks(e,t,n,r){if(!t)return null;let o=bt[t];if(n&&o?.tallIconOverride){let s=r.get(o.tallIconOverride);if(s)return s}let a=So(e),i=Vs(t);for(let s of i){let u=[`sprite/mutation/${s}Icon`,`sprite/mutation/${s}`,`sprite/mutation/${s}${a}`,`sprite/mutation/${s}-${a}`,`sprite/mutation/${s}_${a}`,`sprite/mutation/${s}/${a}`];for(let d of u){let l=r.get(d);if(l)return l}if(n){let d=`sprite/mutation-overlay/${s}TallPlantIcon`,l=r.get(d);if(l)return l;let c=`sprite/mutation-overlay/${s}TallPlant`,p=r.get(c);if(p)return p}}return null}function Js(e,t,n){let r=e?.orig?.width??e?.frame?.width??e?.width??1,o=e?.orig?.height??e?.frame?.height??e?.height??1,a=e?.defaultAnchor?.x??0,i=e?.defaultAnchor?.y??0,s=Ns[t]??a,u=o>r*1.5,d=Hs[t]??(u?i:.4),l={x:(s-a)*r,y:(d-i)*o},c=Math.min(r,o),p=Math.min(1.5,c/_s),m=Ws*p;return n&&(m*=Fs),{width:r,height:o,anchorX:a,anchorY:i,offset:l,iconScale:m}}var qs=O(()=>{"use strict";Bt()});function Wr(e,t,n,r,o){let a=Ls(r,e);if(a)return a;let i=null;try{if(t?.extract?.canvas){let s=new n.Sprite(e);i=t.extract.canvas(s),s.destroy?.({children:!0,texture:!1,baseTexture:!1})}}catch{}if(!i){let s=e?.frame||e?._frame,u=e?.orig||e?._orig,d=e?.trim||e?._trim,l=e?.rotate||e?._rotate||0,c=e?.baseTexture?.resource?.source||e?.baseTexture?.resource||e?.source?.resource?.source||e?.source?.resource||e?._source?.resource?.source||null;if(!s||!c)throw new Error("textureToCanvas fail");i=document.createElement("canvas");let p=Math.max(1,(u?.width??s.width)|0),m=Math.max(1,(u?.height??s.height)|0),g=d?.x??0,f=d?.y??0;i.width=p,i.height=m;let h=i.getContext("2d");h.imageSmoothingEnabled=!1,l===!0||l===2||l===8?(h.save(),h.translate(g+s.height/2,f+s.width/2),h.rotate(-Math.PI/2),h.drawImage(c,s.x,s.y,s.width,s.height,-s.width/2,-s.height/2,s.width,s.height),h.restore()):h.drawImage(c,s.x,s.y,s.width,s.height,g,f,s.width,s.height)}return Ds(r,e,i,o),i}function ym(e,t,n,r,o,a,i,s){let{w:u,h:d,aX:l,aY:c,basePos:p}=t,m=[];for(let g of n){let f=new r.Sprite(e);f.anchor?.set?.(l,c),f.position.set(p.x,p.y),f.zIndex=1;let h=document.createElement("canvas");h.width=u,h.height=d;let b=h.getContext("2d");b.imageSmoothingEnabled=!1,b.save(),b.translate(u*l,d*c),b.drawImage(Wr(e,o,r,a,i),-u*l,-d*c),b.restore(),js(b,h,g.name,g.isTall);let w=r.Texture.from(h);s.push(w),f.texture=w,m.push(f)}return m}function vm(e,t,n,r,o,a,i,s,u,d){let{aX:l,basePos:c}=t,p=[];for(let m of n){let g=m.overlayTall&&r.get(m.overlayTall)&&{tex:r.get(m.overlayTall),key:m.overlayTall}||$s(e,m.name,r,!0);if(!g?.tex)continue;let f=Wr(g.tex,a,o,i,s);if(!f)continue;let h=f.width,b={x:0,y:0},w={x:c.x-l*h,y:0},x=document.createElement("canvas");x.width=h,x.height=f.height;let y=x.getContext("2d");if(!y)continue;y.imageSmoothingEnabled=!1,y.drawImage(f,0,0),y.globalCompositeOperation="destination-in",y.drawImage(u,-w.x,-w.y);let k=o.Texture.from(x);d.push(k);let S=new o.Sprite(k);S.anchor?.set?.(b.x,b.y),S.position.set(w.x,w.y),S.scale.set(1),S.alpha=1,S.zIndex=3,p.push(S)}return p}function xm(e,t,n,r,o,a){let{basePos:i}=t,s=[];for(let u of n){if(u.name==="Gold"||u.name==="Rainbow")continue;let d=Ks(e,u.name,u.isTall,r);if(!d)continue;let l=new o.Sprite(d),c=d?.defaultAnchor?.x??.5,p=d?.defaultAnchor?.y??.5;l.anchor?.set?.(c,p),l.position.set(i.x+a.offset.x,i.y+a.offset.y),l.scale.set(a.iconScale),u.isTall&&(l.zIndex=-1),Gs.has(u.name)&&(l.zIndex=10),l.zIndex||(l.zIndex=2),s.push(l)}return s}function Fr(e,t,n,r){try{if(!e||!r.renderer||!r.ctors?.Container||!r.ctors?.Sprite||!r.ctors?.Texture)return null;let{Container:o,Sprite:a,Texture:i}=r.ctors,s=e?.orig?.width??e?.frame?.width??e?.width??1,u=e?.orig?.height??e?.frame?.height??e?.height??1,d=e?.defaultAnchor?.x??.5,l=e?.defaultAnchor?.y??.5,c={x:s*d,y:u*l},p=Wr(e,r.renderer,r.ctors,r.cacheState,r.cacheConfig),m=new o;m.sortableChildren=!0;let g=new a(e);g.anchor?.set?.(d,l),g.position.set(c.x,c.y),g.zIndex=0,m.addChild(g);let f=zs(t),h=vo(n.muts,f),b=vo(n.overlayMuts,f),w=vo(n.selectedMuts,f),x=[],y={w:s,h:u,aX:d,aY:l,basePos:c},k=So(t),S=Js(e,k,f);ym(e,y,h,r.ctors,r.renderer,r.cacheState,r.cacheConfig,x).forEach(D=>m.addChild(D)),f&&vm(t,y,b,r.textures,r.ctors,r.renderer,r.cacheState,r.cacheConfig,p,x).forEach(K=>m.addChild(K)),xm(t,y,w,r.textures,r.ctors,S).forEach(D=>m.addChild(D));let P=null;if(typeof r.renderer.generateTexture=="function"?P=r.renderer.generateTexture(m,{resolution:1}):r.renderer.textureGenerator?.generateTexture&&(P=r.renderer.textureGenerator.generateTexture({target:m,resolution:1})),!P)throw new Error("no render texture");let L=P instanceof i?P:i.from(r.renderer.extract.canvas(P));P&&P!==L&&P.destroy?.(!0),m.destroy({children:!0,texture:!1,baseTexture:!1});try{L.__mg_gen=!0,L.label=`${t}|${n.sig}`}catch{}return L}catch{return null}}function Ys(e,t,n,r){if(!e||e.length<2)return null;let o=[];for(let a of e){let i=Fr(a,t,n,r);i&&o.push(i)}return o.length>=2?o:null}var Xs=O(()=>{"use strict";Bt();Us();qs();Bt();yn()});function Zs(){return{cache:new Map,maxEntries:jr.maxEntries}}function Br(e,t){let n=t.scale??1,r=t.frameIndex??0,o=t.mutations?.slice().sort().join(",")||"",a=t.anchorX??.5,i=t.anchorY??.5,s=t.pad??2;return`${e}|s${n}|f${r}|m${o}|ax${a}|ay${i}|p${s}`}function Sm(e,t){let n=e.cache.get(t);return n?(n.lastAccess=performance.now(),n.canvas):null}function wm(e,t,n,r){if(t.enabled){if(e.cache.size>=t.maxEntries){let o=null,a=1/0;for(let[i,s]of e.cache)s.lastAccess<a&&(a=s.lastAccess,o=i);o&&e.cache.delete(o)}e.cache.set(n,{canvas:r,lastAccess:performance.now()})}}function Qs(e){let t=document.createElement("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");return n&&n.drawImage(e,0,0),t}function el(e){e.cache.clear()}function tl(e){return{size:e.cache.size,maxEntries:e.maxEntries}}function Tm(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0)})}async function nl(e,t,n,r,o,a,i,s=5,u=0){if(!t.ready||!a.enabled)return 0;let d=e.length,l=0;i?.(0,d);for(let c=0;c<d;c+=s){let p=e.slice(c,c+s);for(let m of p)try{let g=ft(null,m,t.textures,t.animations),f=Br(g,{scale:1});o.cache.has(f)||wo(t,n,r,null,m,{scale:1},o,a),l++}catch{l++}i?.(l,d),c+s<d&&await Tm()}return l}function km(e){if(e.overlay)return e.overlay;let t=new e.ctors.Container;t.sortableChildren=!0,t.zIndex=99999999;try{e.app.stage.sortableChildren=!0}catch{}return e.app.stage.addChild(t),e.overlay=t,t}function Cm(e){let t=e.defaultParent;if(!t)return null;try{return typeof t=="function"?t():t}catch{return null}}function ol(e,t,n,r,o,a){if(!n.length)return t;let i=_r(n);if(!i.sig)return t;let s=Gr(e,i),u=Hr(o,s);if(u?.tex)return u.tex;let d=Fr(t,e,i,{renderer:r.renderer,ctors:r.ctors,textures:r.textures,cacheState:o,cacheConfig:a});return d?(Nr(o,s,{isAnim:!1,tex:d},a),d):t}function rl(e,t,n,r,o,a){if(!n.length)return t;let i=_r(n);if(!i.sig)return t;let s=Gr(e,i),u=Hr(o,s);if(u?.isAnim&&u.frames?.length)return u.frames;let d=Ys(t,e,i,{renderer:r.renderer,ctors:r.ctors,textures:r.textures,cacheState:o,cacheConfig:a});return d?(Nr(o,s,{isAnim:!0,frames:d},a),d):t}function Ur(e,t,n,r,o,a={}){if(!e.ready)throw new Error("MGSprite not ready yet");let i=ft(r,o,e.textures,e.animations),s=a.mutations||[],u=a.parent||Cm(e)||km(e),d=e.renderer?.width||e.renderer?.view?.width||innerWidth,l=e.renderer?.height||e.renderer?.view?.height||innerHeight,c=a.center?d/2:a.x??d/2,p=a.center?l/2:a.y??l/2,m,g=e.animations.get(i);if(g&&g.length>=2){let b=rl(i,g,s,e,t,n),w=e.ctors.AnimatedSprite;if(w)m=new w(b),m.animationSpeed=a.fps?a.fps/60:a.speed??.15,m.loop=a.loop??!0,m.play();else{let x=new e.ctors.Sprite(b[0]),k=1e3/Math.max(1,a.fps||8),S=0,C=0,I=P=>{let L=e.app.ticker?.deltaMS??P*16.666666666666668;if(S+=L,S<k)return;let D=S/k|0;S%=k,C=(C+D)%b.length,x.texture=b[C]};x.__mgTick=I,e.app.ticker?.add?.(I),m=x}}else{let b=e.textures.get(i);if(!b)throw new Error(`Unknown sprite/anim key: ${i}`);let w=ol(i,b,s,e,t,n);m=new e.ctors.Sprite(w)}let f=a.anchorX??m.texture?.defaultAnchor?.x??.5,h=a.anchorY??m.texture?.defaultAnchor?.y??.5;return m.anchor?.set?.(f,h),m.position.set(c,p),m.scale.set(a.scale??1),m.alpha=a.alpha??1,m.rotation=a.rotation??0,m.zIndex=a.zIndex??999999,u.addChild(m),e.live.add(m),m.__mgDestroy=()=>{try{m.__mgTick&&e.app.ticker?.remove?.(m.__mgTick)}catch{}try{m.destroy?.({children:!0,texture:!1,baseTexture:!1})}catch{try{m.destroy?.()}catch{}}e.live.delete(m)},m}function Pm(e,t){let n=e.renderer;if(n?.extract?.canvas)return n.extract.canvas(t);if(n?.plugins?.extract?.canvas)return n.plugins.extract.canvas(t);throw new Error("No extract.canvas available on renderer")}function wo(e,t,n,r,o,a={},i,s){if(!e.ready)throw new Error("MGSprite not ready yet");let u=ft(r,o,e.textures,e.animations);if(i&&s?.enabled){let y=Br(u,a),k=Sm(i,y);if(k)return Qs(k)}let d=a.mutations||[],l=e.animations.get(u),c=Math.max(0,(a.frameIndex??0)|0),p;if(l?.length){let y=rl(u,l,d,e,t,n);p=y[c%y.length]}else{let y=e.textures.get(u);if(!y)throw new Error(`Unknown sprite/anim key: ${u}`);p=ol(u,y,d,e,t,n)}let m=new e.ctors.Sprite(p),g=a.anchorX??m.texture?.defaultAnchor?.x??.5,f=a.anchorY??m.texture?.defaultAnchor?.y??.5;m.anchor?.set?.(g,f),m.scale.set(a.scale??1);let h=a.pad??2,b=new e.ctors.Container;b.addChild(m);try{b.updateTransform?.()}catch{}let w=m.getBounds?.(!0)||{x:0,y:0,width:m.width,height:m.height};m.position.set(-w.x+h,-w.y+h);let x=Pm(e,b);try{b.destroy?.({children:!0})}catch{}if(i&&s?.enabled){let y=Br(u,a);return wm(i,s,y,x),Qs(x)}return x}function al(e){for(let t of Array.from(e.live))t.__mgDestroy?.()}function il(e,t){return e.defaultParent=t,!0}function sl(e,t){return e.defaultParent=t,!0}var jr,zr=O(()=>{"use strict";ho();Bt();Xs();yn();jr={enabled:!0,maxEntries:500}});function Mm(){return{ready:!1,app:null,renderer:null,ctors:null,baseUrl:null,textures:new Map,animations:new Map,live:new Set,defaultParent:null,overlay:null,categoryIndex:null}}function we(){return xe}function ht(){return Am}function jt(){return Im}function Ut(){return Em}function ko(){return Lm}function Vr(){return xe.ready}async function ll(){return xe.ready?!0:To||(To=(async()=>{let e=performance.now();ct("init start");let t=await mo(Pe.appReady,15e3,"PIXI app");ct("app ready");let n=await mo(Pe.rendererReady,15e3,"PIXI renderer");ct("renderer ready"),xe.app=t,xe.renderer=n||t?.renderer||null,xe.ctors=await ks(t),ct("constructors resolved"),xe.baseUrl=await Fe.base(),ct("base url",xe.baseUrl);let{textures:r,animations:o,categoryIndex:a}=await Cs(xe.baseUrl,xe.ctors);return xe.textures=r,xe.animations=o,xe.categoryIndex=a,ct("atlases loaded","textures",xe.textures.size,"animations",xe.animations.size,"categories",xe.categoryIndex?.size??0),xe.ready=!0,ct("ready in",Math.round(performance.now()-e),"ms"),!0})(),To)}var To,xe,Am,Im,Em,Lm,cl=O(()=>{"use strict";Ze();pn();Wt();ho();Ps();yn();zr();To=null,xe=Mm(),Am=As(),Im={...Ms},Em=Zs(),Lm={...jr}});function yt(){if(!Vr())throw new Error("MGSprite not ready yet")}function Dm(e,t,n){return typeof t=="string"?Ur(we(),ht(),jt(),e,t,n||{}):Ur(we(),ht(),jt(),null,e,t||{})}function Rm(e,t,n){return typeof t=="string"?wo(we(),ht(),jt(),e,t,n||{},Ut(),ko()):wo(we(),ht(),jt(),null,e,t||{},Ut(),ko())}function Om(){al(we())}function Gm(e){return il(we(),e)}function Hm(e){return sl(we(),e)}function Nm(e,t){let n=we(),r=typeof t=="string"?ft(e,t,n.textures,n.animations):ft(null,e,n.textures,n.animations);return n.textures.has(r)||n.animations.has(r)}function _m(){yt();let e=we().categoryIndex;return e?Array.from(e.keys()).sort((t,n)=>t.localeCompare(n)):[]}function Wm(e){yt();let t=String(e||"").trim();if(!t)return[];let n=we().categoryIndex;return n?Array.from(n.get(t)?.values()||[]):[]}function Fm(e,t){yt();let n=String(e||"").trim(),r=String(t||"").trim();if(!n||!r)return!1;let o=we().categoryIndex;if(!o)return!1;let a=n.toLowerCase(),i=r.toLowerCase();for(let[s,u]of o.entries())if(s.toLowerCase()===a){for(let d of u.values())if(d.toLowerCase()===i)return!0}return!1}function Bm(e){yt();let t=we().categoryIndex;if(!t)return[];let n=String(e||"").trim().toLowerCase(),r=[];for(let[o,a]of t.entries())for(let i of a.values()){let s=Ft(o,i);(!n||s.toLowerCase().startsWith(n))&&r.push(s)}return r.sort((o,a)=>o.localeCompare(a))}function jm(e){yt();let t=String(e||"").trim();if(!t)return null;let n=bn(t),r=/^sprite\/([^/]+)\/(.+)$/.exec(n);if(!r)return null;let o=r[1],a=r[2],i=we().categoryIndex,s=o.toLowerCase(),u=a.toLowerCase(),d=o,l=a;if(i){let c=Array.from(i.keys()).find(g=>g.toLowerCase()===s);if(!c)return null;d=c;let p=i.get(c);if(!p)return null;let m=Array.from(p.values()).find(g=>g.toLowerCase()===u);if(!m)return null;l=m}return{category:d,id:l,key:Ft(d,l)}}function Um(e,t){yt();let n=String(e||"").trim(),r=String(t||"").trim();if(!n||!r)throw new Error("getIdPath(category, id) requires both category and id");let o=we().categoryIndex;if(!o)throw new Error("Sprite categories not indexed");let a=n.toLowerCase(),i=r.toLowerCase(),s=Array.from(o.keys()).find(l=>l.toLowerCase()===a)||n,u=o.get(s);if(!u)throw new Error(`Unknown sprite category: ${n}`);let d=Array.from(u.values()).find(l=>l.toLowerCase()===i)||r;if(!u.has(d))throw new Error(`Unknown sprite id: ${n}/${r}`);return Ft(s,d)}function zm(){Es(ht())}function Vm(){el(Ut())}function $m(){return tl(Ut())}function Km(){return[...Os]}async function Jm(e,t,n=10,r=0){return yt(),nl(e,we(),ht(),jt(),Ut(),ko(),t,n,r)}var se,zt=O(()=>{"use strict";cl();ho();zr();yn();Bt();se={init:ll,ready:Vr,show:Dm,toCanvas:Rm,clear:Om,attach:Gm,attachProvider:Hm,has:Nm,key:(e,t)=>Ft(e,t),getCategories:_m,getCategoryId:Wm,hasId:Fm,listIds:Bm,getIdInfo:jm,getIdPath:Um,clearMutationCache:zm,clearToCanvasCache:Vm,getToCanvasCacheStats:$m,getMutationNames:Km,warmup:Jm}});function St(e,t){q.data[e]==null&&(q.data[e]=t,Zm()&&gl())}function Zm(){return Object.values(q.data).every(e=>e!=null)}function pl(e,t){if(!e||typeof e!="object"||dl.has(e))return;dl.add(e);let n;try{n=Jr(e)}catch{return}if(!n||n.length===0)return;let r=e,o;if(!q.data.items&&xt(n,vt.items)&&(o=r.WateringCan,o&&typeof o=="object"&&"coinPrice"in o&&"creditPrice"in o&&St("items",r)),!q.data.decor&&xt(n,vt.decor)&&(o=r.SmallRock,o&&typeof o=="object"&&"coinPrice"in o&&"creditPrice"in o&&St("decor",r)),!q.data.mutations&&xt(n,vt.mutations)&&(o=r.Gold,o&&typeof o=="object"&&"baseChance"in o&&"coinMultiplier"in o&&St("mutations",r)),!q.data.eggs&&xt(n,vt.eggs)&&(o=r.CommonEgg,o&&typeof o=="object"&&"faunaSpawnWeights"in o&&"secondsToHatch"in o&&St("eggs",r)),!q.data.pets&&xt(n,vt.pets)&&(o=r.Worm,o&&typeof o=="object"&&"coinsToFullyReplenishHunger"in o&&"diet"in o&&Array.isArray(o.diet)&&St("pets",r)),!q.data.abilities&&xt(n,vt.abilities)&&(o=r.ProduceScaleBoost,o&&typeof o=="object"&&"trigger"in o&&"baseParameters"in o&&St("abilities",r)),!q.data.plants&&xt(n,vt.plants)&&(o=r.Carrot,o&&typeof o=="object"&&"seed"in o&&"plant"in o&&"crop"in o&&St("plants",r)),!(t>=Ym))for(let a of n){let i;try{i=r[a]}catch{continue}i&&typeof i=="object"&&pl(i,t+1)}}function $r(e){try{pl(e,0)}catch{}}function ml(){if(!q.isHookInstalled){q.isHookInstalled=!0;try{et.keys=function(t){return $r(t),Jr.apply(this,arguments)},Co&&(et.values=function(t){return $r(t),Co.apply(this,arguments)}),Po&&(et.entries=function(t){return $r(t),Po.apply(this,arguments)})}catch{}}}function gl(){if(q.isHookInstalled){try{et.keys=Jr,Co&&(et.values=Co),Po&&(et.entries=Po)}catch{}q.isHookInstalled=!1}}function eg(){try{for(let e of Kr.document?.scripts||[]){let t=e?.src?String(e.src):"";if(ul.test(t))return t}}catch{}try{for(let e of Kr.performance?.getEntriesByType?.("resource")||[]){let t=e?.name?String(e.name):"";if(ul.test(t))return t}}catch{}return null}function tg(e,t){let n=Math.max(e.lastIndexOf("const ",t),e.lastIndexOf("let ",t),e.lastIndexOf("var ",t));if(n<0)return null;let r=e.indexOf("=",n);if(r<0||r>t)return null;let o=e.indexOf("{",r);if(o<0||o>t)return null;let a=0,i="",s=!1;for(let u=o;u<e.length;u++){let d=e[u];if(i){if(s){s=!1;continue}if(d==="\\"){s=!0;continue}d===i&&(i="");continue}if(d==='"'||d==="'"){i=d;continue}if(d==="{")a++;else if(d==="}"&&--a===0)return e.slice(o,u+1)}return null}function ng(e){let t={},n=!1;for(let r of qm){let o=e?.[r];if(!o||typeof o!="object")continue;let a=o.iconSpriteKey||null,{iconSpriteKey:i,...s}=o;t[r]={weatherId:r,spriteId:a,...s},n=!0}return t.Sunny||(t.Sunny={weatherId:"Sunny",name:"Sunny",spriteId:"sprite/ui/SunnyIcon",type:"primary"}),!n||t.Rain&&t.Rain.mutator?.mutation!=="Wet"?null:t}async function og(){if(q.data.weather)return!0;let e=eg();if(!e)return!1;let t="";try{let s=await fetch(e,{credentials:"include"});if(!s.ok)return!1;t=await s.text()}catch{return!1}let n=t.indexOf("fixedTimeSlots:[0,48,96,144,192,240]");if(n<0&&(n=t.indexOf('name:"Amber Moon"')),n<0)return!1;let r=tg(t,n);if(!r)return!1;let o=r.replace(/\b[A-Za-z_$][\w$]*\.(Rain|Frost|Dawn|AmberMoon)\b/g,'"$1"'),a;try{a=Function('"use strict";return('+o+")")()}catch{return!1}let i=ng(a);return i?(q.data.weather=i,!0):!1}function rg(){if(q.weatherPollingTimer)return;q.weatherPollAttempts=0;let e=setInterval(async()=>{(await og()||++q.weatherPollAttempts>Xm)&&(clearInterval(e),q.weatherPollingTimer=null)},Qm);q.weatherPollingTimer=e}function ag(e){return String(e||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^A-Za-z0-9]/g,"").trim()}function ig(e,t=[]){let n=new Set,r=o=>{let a=String(o||"").trim();a&&n.add(a)};r(e);for(let o of t)r(o);for(let o of Array.from(n.values()))o.endsWith("s")?r(o.slice(0,-1)):r(`${o}s`),o.endsWith("es")&&r(o.slice(0,-2));return Array.from(n.values()).filter(Boolean)}function fl(e,t,n,r=[],o=[]){let a=ig(e,r);if(!a.length)return null;let i=[t,...o].filter(l=>typeof l=="string"),s=l=>{let c=String(l||"").trim();if(!c)return null;for(let p of a)try{if(se.has(p,c))return se.getIdPath(p,c)}catch{}return null};for(let l of i){let c=s(l);if(c)return c}let u=ag(n||""),d=s(u||n||"");if(d)return d;try{for(let l of a){let c=se.listIds(`sprite/${l}/`),p=i.map(g=>String(g||"").toLowerCase()),m=String(n||u||"").toLowerCase();for(let g of c){let h=(g.split("/").pop()||"").toLowerCase();if(p.some(b=>b&&b===h)||h===m)return g}for(let g of c){let h=(g.split("/").pop()||"").toLowerCase();if(p.some(b=>b&&h.includes(b))||m&&h.includes(m))return g}}}catch{}return null}function _e(e,t,n,r,o=[],a=[]){if(!e||typeof e!="object")return;let i=e.tileRef;if(!i||typeof i!="object")return;let s=String(i.spritesheet||t||"").trim(),u=fl(s,n,r,o,a);if(u)try{e.spriteId=u}catch{}let d=e.rotationVariants;if(d&&typeof d=="object")for(let l of Object.values(d))_e(l,s,n,r);if(e.immatureTileRef){let l={tileRef:e.immatureTileRef};_e(l,s,n,r),l.spriteId&&(e.immatureSpriteId=l.spriteId)}if(e.topmostLayerTileRef){let l={tileRef:e.topmostLayerTileRef};_e(l,s,n,r),l.spriteId&&(e.topmostLayerSpriteId=l.spriteId)}e.activeState&&typeof e.activeState=="object"&&_e(e.activeState,s,n,e.activeState?.name||r)}function sg(e,t,n,r=[]){if(!Array.isArray(t)||t.length===0)return null;let o=t[0],a=t.slice(1);return fl(e,o,n??null,r,a)}function lg(e){for(let[t,n]of Object.entries(e.items||{}))_e(n,"items",t,n?.name,["item"]);for(let[t,n]of Object.entries(e.decor||{}))_e(n,"decor",t,n?.name);for(let[t,n]of Object.entries(e.mutations||{})){_e(n,"mutations",t,n?.name,["mutation"]);let r=sg("mutation-overlay",[`${t}TallPlant`,`${t}TallPlantIcon`,t],n?.name,["mutation-overlay"]);if(r)try{n.overlaySpriteId=r}catch{}}for(let[t,n]of Object.entries(e.eggs||{}))_e(n,"pets",t,n?.name,["pet"]);for(let[t,n]of Object.entries(e.pets||{}))_e(n,"pets",t,n?.name,["pet"]);for(let[t,n]of Object.entries(e.plants||{})){let r=n;r.seed&&_e(r.seed,r.seed?.tileRef?.spritesheet||"seeds",`${t}Seed`,r.seed?.name||`${t} Seed`,["seed","plant","plants"],[t]),r.plant&&_e(r.plant,r.plant?.tileRef?.spritesheet||"plants",`${t}Plant`,r.plant?.name||`${t} Plant`,["plant","plants","tallplants"],[t]),r.crop&&_e(r.crop,r.crop?.tileRef?.spritesheet||"plants",t,r.crop?.name||t,["plant","plants"],[`${t}Crop`])}}async function bl(){if(!q.spritesResolved)return q.spritesResolving||(q.spritesResolving=(async()=>{try{await hl(2e4,50),await se.init(),lg(q.data),q.spritesResolved=!0}catch(e){try{console.warn("[MGData] sprite resolution failed",e)}catch{}}finally{q.spritesResolving=null}})()),q.spritesResolving}async function cg(){return q.isReady||(ml(),rg(),bl(),q.isReady=!0),!0}function ug(){return q.isReady}function dg(){return gl(),q.weatherPollingTimer&&(clearInterval(q.weatherPollingTimer),q.weatherPollingTimer=null),q.isReady=!1,!0}function pg(){return!q.spritesResolved&&!q.spritesResolving&&bl(),{...q.data}}function mg(e){return q.data[e]??null}function gg(e){return q.data[e]!=null}async function hl(e=1e4,t=50){let n=Date.now();for(;Date.now()-n<e;){if(Object.values(q.data).some(r=>r!=null))return{...q.data};await Qe(t)}throw new Error("MGData.waitForAnyData: timeout")}async function fg(e,t=1e4,n=50){let r=Date.now();for(;Date.now()-r<t;){let o=q.data[e];if(o!=null)return o;await Qe(n)}throw new Error(`MGData.waitFor: timeout waiting for "${e}"`)}var Kr,et,Jr,Co,Po,vt,qm,ul,Ym,Xm,Qm,dl,q,xt,de,ut=O(()=>{"use strict";ye();Ze();zt();Kr=A,et=Kr.Object??Object,Jr=et.keys,Co=et.values,Po=et.entries,vt={items:["WateringCan","PlanterPot","Shovel"],decor:["SmallRock","MediumRock","LargeRock","WoodBench","StoneBench","MarbleBench"],mutations:["Gold","Rainbow","Wet","Chilled","Frozen"],eggs:["CommonEgg","UncommonEgg","RareEgg"],pets:["Worm","Snail","Bee","Chicken","Bunny"],abilities:["ProduceScaleBoost","DoubleHarvest","SeedFinderI","CoinFinderI"],plants:["Carrot","Strawberry","Aloe","Blueberry","Apple"]},qm=["Rain","Frost","Dawn","AmberMoon"],ul=/main-[^/]+\.js(\?|$)/,Ym=3,Xm=200,Qm=50,dl=new WeakSet,q={isReady:!1,isHookInstalled:!1,data:{items:null,decor:null,mutations:null,eggs:null,pets:null,abilities:null,plants:null,weather:null},spritesResolved:!1,spritesResolving:null,weatherPollingTimer:null,weatherPollAttempts:0},xt=(e,t)=>t.every(n=>e.includes(n));de={init:cg,isReady:ug,stop:dg,getAll:pg,get:mg,has:gg,waitForAnyData:hl,waitFor:fg};ml()});function xg(){let e=(t,n)=>{let r=o=>{o.stopImmediatePropagation(),o.preventDefault?.()};t.addEventListener(n,r,{capture:!0}),V.listeners.push({type:n,handler:r,target:t})};for(let t of vg)e(document,t),e(window,t)}function Sg(){for(let{type:e,handler:t,target:n}of V.listeners)try{n.removeEventListener(e,t,{capture:!0})}catch{}V.listeners.length=0}function wg(){let e=Object.getPrototypeOf(document);V.savedProps.hidden=Object.getOwnPropertyDescriptor(e,"hidden"),V.savedProps.visibilityState=Object.getOwnPropertyDescriptor(e,"visibilityState"),V.savedProps.hasFocus=document.hasFocus?document.hasFocus.bind(document):null;try{Object.defineProperty(e,"hidden",{configurable:!0,get:()=>!1})}catch{}try{Object.defineProperty(e,"visibilityState",{configurable:!0,get:()=>"visible"})}catch{}try{document.hasFocus=()=>!0}catch{}}function Tg(){let e=Object.getPrototypeOf(document);try{V.savedProps.hidden&&Object.defineProperty(e,"hidden",V.savedProps.hidden)}catch{}try{V.savedProps.visibilityState&&Object.defineProperty(e,"visibilityState",V.savedProps.visibilityState)}catch{}try{V.savedProps.hasFocus&&(document.hasFocus=V.savedProps.hasFocus)}catch{}}function Eo(){V.audioCtx&&V.audioCtx.state!=="running"&&V.audioCtx.resume?.().catch(()=>{})}function kg(){try{let e=window.AudioContext||window.webkitAudioContext;V.audioCtx=new e({latencyHint:"interactive"}),V.gainNode=V.audioCtx.createGain(),V.gainNode.gain.value=1e-5,V.oscillator=V.audioCtx.createOscillator(),V.oscillator.frequency.value=1,V.oscillator.connect(V.gainNode).connect(V.audioCtx.destination),V.oscillator.start(),document.addEventListener("visibilitychange",Eo,{capture:!0}),window.addEventListener("focus",Eo,{capture:!0})}catch{vl()}}function vl(){try{V.oscillator?.stop()}catch{}try{V.oscillator?.disconnect(),V.gainNode?.disconnect()}catch{}try{V.audioCtx?.close?.()}catch{}document.removeEventListener("visibilitychange",Eo,{capture:!0}),window.removeEventListener("focus",Eo,{capture:!0}),V.oscillator=null,V.gainNode=null,V.audioCtx=null}function Cg(){let e=document.querySelector("canvas")||document.body||document.documentElement;V.heartbeatInterval=window.setInterval(()=>{try{e.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:1,clientY:1}))}catch{}},25e3)}function Pg(){V.heartbeatInterval!==null&&(clearInterval(V.heartbeatInterval),V.heartbeatInterval=null)}function Mg(){V.initialized||(V.initialized=!0,xl())}function Ag(){return V.initialized}function xl(){V.initialized&&(V.running||(V.running=!0,wg(),xg(),kg(),Cg()))}function Ig(){V.running&&(V.running=!1,Pg(),vl(),Sg(),Tg())}function Eg(){return V.running}var vg,V,vn,qr=O(()=>{"use strict";vg=["visibilitychange","blur","focus","focusout","pagehide","freeze","resume"],V={initialized:!1,listeners:[],savedProps:{hidden:void 0,visibilityState:void 0,hasFocus:null},audioCtx:null,oscillator:null,gainNode:null,heartbeatInterval:null,running:!1};vn={init:Mg,isReady:Ag,start:xl,stop:Ig,isRunning:Eg}});function Dg(){return Lg}function xn(){return A.jotaiAtomCache?.cache}function Be(e){let t=Dg(),n=t.get(e);if(n)return n;let r=xn();if(!r)return null;for(let o of r.values())if((o?.debugLabel||o?.label||"")===e)return t.set(e,o),o;return null}var Lg,Sn=O(()=>{"use strict";ye();Lg=new Map});function Vt(){return Rg}function Lo(){if(!Sl){Sl=!0;for(let e of Xr)try{e()}catch{}try{let e=A.CustomEvent||CustomEvent;A.dispatchEvent?.(new e(Og))}catch{}}}function Gg(e){Xr.add(e);let t=Zr();if(t.via&&!t.polyfill)try{e()}catch{}return()=>{Xr.delete(e)}}async function Do(e={}){let{timeoutMs:t=6e3,intervalMs:n=50}=e,r=Zr();if(!(r.via&&!r.polyfill))return new Promise((o,a)=>{let i=!1,s=Gg(()=>{i||(i=!0,s(),o())}),u=Date.now();(async()=>{for(;!i&&Date.now()-u<t;){let l=Zr();if(l.via&&!l.polyfill){if(i)return;i=!0,s(),o();return}await wn(n)}i||(i=!0,s(),a(new Error("Store not captured within timeout")))})()})}function wl(){try{let e=A.Event||Event;A.dispatchEvent?.(new e("visibilitychange"))}catch{}}function Qr(e){return e&&typeof e=="object"&&typeof e.get=="function"&&typeof e.set=="function"&&typeof e.sub=="function"}function Yr(e,t=0,n=new WeakSet){if(t>3||!e||typeof e!="object"||n.has(e))return null;try{n.add(e)}catch{return null}if(Qr(e))return e;let r=["store","value","current","state","s","baseStore"];for(let o of r)try{let a=e[o];if(Qr(a))return a}catch{}return null}function Tl(){let e=Vt(),t=A.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t?.renderers?.size)return null;let n=0;for(let[r]of t.renderers){let o=t.getFiberRoots?.(r);o&&(n+=o.size||0)}if(n===0)return null;for(let[r]of t.renderers){let o=t.getFiberRoots?.(r);if(o)for(let a of o){let i=new Set,s=[a.current];for(;s.length;){let u=s.pop();if(!(!u||i.has(u))){i.add(u);try{let d=u?.pendingProps?.value;if(Qr(d))return e.lastCapturedVia="fiber",d}catch{}try{let d=u?.memoizedState,l=0;for(;d&&l<15;){l++;let c=Yr(d);if(c)return e.lastCapturedVia="fiber",c;let p=Yr(d.memoizedState);if(p)return e.lastCapturedVia="fiber",p;d=d.next}}catch{}try{if(u?.stateNode){let d=Yr(u.stateNode);if(d)return e.lastCapturedVia="fiber",d}}catch{}u.child&&s.push(u.child),u.sibling&&s.push(u.sibling),u.alternate&&s.push(u.alternate)}}}}return null}function kl(){return{get:()=>{throw new Error("Store not captured: get unavailable")},set:()=>{throw new Error("Store not captured: set unavailable")},sub:()=>()=>{},__polyfill:!0}}async function Hg(e=5e3){let t=Date.now(),n=xn();for(;!n&&Date.now()-t<e;)await wn(100),n=xn();if(!n)throw new Error("jotaiAtomCache.cache not found");let r=Vt(),o=null,a=null,i=[],s=()=>{for(let d of i)try{d.__origWrite&&(d.write=d.__origWrite,delete d.__origWrite)}catch{}};for(let d of n.values()){if(!d||typeof d.write!="function"||d.__origWrite)continue;let l=d.write;d.__origWrite=l,d.write=function(c,p,...m){return a||(o=c,a=p,s()),l.call(this,c,p,...m)},i.push(d)}wl();let u=Date.now();for(;!a&&Date.now()-u<e;)await wn(50);return a?(r.lastCapturedVia="write",{get:d=>o(d),set:(d,l)=>a(d,l),sub:(d,l)=>{let c;try{c=o(d)}catch{}let p=setInterval(()=>{let m;try{m=o(d)}catch{return}if(m!==c){c=m;try{l()}catch{}}},100);return()=>clearInterval(p)}}):(s(),r.lastCapturedVia="polyfill",kl())}async function Ng(e=1e4){let t=Vt();wl();let n=Date.now();for(;Date.now()-n<e;){let r=Tl();if(r)return r;await wn(50)}return t.lastCapturedVia="polyfill",kl()}async function Ro(){let e=Vt();if(e.baseStore&&!e.baseStore.__polyfill)return Lo(),e.baseStore;if(e.captureInProgress){let t=Date.now(),n=2500;for(;!e.baseStore&&Date.now()-t<n;)await wn(25);if(e.baseStore)return e.baseStore.__polyfill||Lo(),e.baseStore}e.captureInProgress=!0;try{let t=Tl();if(t)return e.baseStore=t,Lo(),t;try{let r=await Hg(5e3);return e.baseStore=r,r.__polyfill||Lo(),r}catch(r){e.captureError=r}let n=await Ng();return e.baseStore=n,n}catch(t){throw e.captureError=t,t}finally{e.captureInProgress=!1}}function Zr(){let e=Vt();return{via:e.lastCapturedVia,polyfill:!!e.baseStore?.__polyfill,error:e.captureError}}async function _g(){let e=await Ro(),t=new WeakMap,n=async o=>{let a=t.get(o);if(a)return a;a={last:void 0,has:!1,subs:new Set},t.set(o,a);try{a.last=e.get(o),a.has=!0}catch{}let i=e.sub(o,()=>{let s;try{s=e.get(o)}catch{return}let u=a.last,d=!Object.is(s,u)||!a.has;if(a.last=s,a.has=!0,d)for(let l of a.subs)try{l(s,u)}catch{}});return a.unsubUpstream=i,a};return{async get(o){let a=await n(o);if(a.has)return a.last;let i=e.get(o);return a.last=i,a.has=!0,i},async set(o,a){await e.set(o,a);let i=await n(o);i.last=a,i.has=!0},async sub(o,a){let i=await n(o);if(i.subs.add(a),i.has)try{a(i.last,i.last)}catch{}return()=>{i.subs.delete(a)}},getShadow(o){return t.get(o)?.last},hasShadow(o){return!!t.get(o)?.has},async ensureWatch(o){await n(o)},async asStore(){return{get:o=>this.get(o),set:(o,a)=>this.set(o,a),sub:(o,a)=>{let i=null;return this.sub(o,()=>a()).then(s=>i=s),()=>i?.()}}}}}async function Tn(){let e=Vt();return e.mirror||(e.mirror=await _g()),e.mirror}var Rg,Og,Sl,Xr,wn,kn=O(()=>{"use strict";ye();Sn();Rg={baseStore:null,captureInProgress:!1,captureError:null,lastCapturedVia:null,mirror:void 0};Og="__JOTAI_STORE_READY__",Sl=!1,Xr=new Set;wn=e=>new Promise(t=>setTimeout(t,e))});async function ea(){await Tn()}var X,We=O(()=>{"use strict";kn();Sn();kn();X={async select(e){let t=await Tn(),n=Be(e);if(!n)throw new Error(`[Store] Atom not found: "${e}"`);return t.get(n)},async set(e,t){let n=await Tn(),r=Be(e);if(!r)throw new Error(`[Store] Atom not found: "${e}"`);await n.set(r,t)},async subscribe(e,t){let n=await Tn(),r=Be(e);if(!r)throw new Error(`[Store] Atom not found: "${e}"`);return n.sub(r,o=>{try{t(o)}catch{}})},async subscribeImmediate(e,t){let n=await X.select(e);try{t(n)}catch{}return X.subscribe(e,t)}}});function Cn(e){return e?Array.isArray(e)?e.slice():e.split(".").map(t=>t.match(/^\d+$/)?Number(t):t):[]}function dt(e,t){let n=Cn(t),r=e;for(let o of n){if(r==null)return;r=r[o]}return r}function ta(e,t,n){let r=Cn(t);if(!r.length)return n;let o=Array.isArray(e)?[...e]:{...e??{}},a=o;for(let i=0;i<r.length-1;i++){let s=r[i],u=a[s],d=typeof u=="object"&&u!==null?Array.isArray(u)?[...u]:{...u}:{};a[s]=d,a=d}return a[r[r.length-1]]=n,o}var Oo=O(()=>{"use strict"});function Cl(e,t){let n={};for(let r of t)n[r]=r.includes(".")?dt(e,r):e?.[r];try{return JSON.stringify(n)}catch{return String(n)}}function na(e,t,n){let r=n.mode??"auto";function o(d){let l=t?dt(d,t):d,c=new Map;if(l==null)return{signatures:c,keys:[]};let p=Array.isArray(l);if((r==="array"||r==="auto"&&p)&&p)for(let g=0;g<l.length;g++){let f=l[g],h=n.key?n.key(f,g,d):g,b=n.sig?n.sig(f,g,d):n.fields?Cl(f,n.fields):JSON.stringify(f);c.set(h,b)}else for(let[g,f]of Object.entries(l)){let h=n.key?n.key(f,g,d):g,b=n.sig?n.sig(f,g,d):n.fields?Cl(f,n.fields):JSON.stringify(f);c.set(h,b)}return{signatures:c,keys:Array.from(c.keys())}}function a(d,l){if(d===l)return!0;if(!d||!l||d.size!==l.size)return!1;for(let[c,p]of d)if(l.get(c)!==p)return!1;return!0}async function i(d){let l=null;return X.subscribeImmediate(e,c=>{let p=t?dt(c,t):c,{signatures:m}=o(p);if(!a(l,m)){let g=new Set([...l?Array.from(l.keys()):[],...Array.from(m.keys())]),f=[];for(let h of g){let b=l?.get(h)??"__NONE__",w=m.get(h)??"__NONE__";b!==w&&f.push(h)}l=m,d({value:p,changedKeys:f})}})}async function s(d,l){return i(({value:c,changedKeys:p})=>{p.includes(d)&&l({value:c})})}async function u(d,l){let c=new Set(d);return i(({value:p,changedKeys:m})=>{let g=m.filter(f=>c.has(f));g.length&&l({value:p,changedKeys:g})})}return{sub:i,subKey:s,subKeys:u}}var oa=O(()=>{"use strict";We();Oo()});function Wg(e,t){let n=$t.get(e);if(n)try{n()}catch{}return $t.set(e,t),()=>{try{t()}catch{}$t.get(e)===t&&$t.delete(e)}}function ce(e,t={}){let{path:n,write:r="replace"}=t,o=n?`${e}:${Cn(n).join(".")}`:e;async function a(){let c=await X.select(e);return n?dt(c,n):c}async function i(c){if(typeof r=="function"){let g=await X.select(e),f=r(c,g);return X.set(e,f)}let p=await X.select(e),m=n?ta(p,n,c):c;return r==="merge-shallow"&&!n&&p&&typeof p=="object"&&typeof c=="object"?X.set(e,{...p,...c}):X.set(e,m)}async function s(c){let p=await a(),m=c(p);return await i(m),m}async function u(c,p,m){let g,f=b=>{let w=n?dt(b,n):b;if(typeof g>"u"||!m(g,w)){let x=g;g=w,p(w,x)}},h=c?await X.subscribeImmediate(e,f):await X.subscribe(e,f);return Wg(o,h)}function d(){let c=$t.get(o);if(c){try{c()}catch{}$t.delete(o)}}function l(c){return na(e,c?.path??n,c)}return{label:o,get:a,set:i,update:s,onChange:(c,p=Object.is)=>u(!1,c,p),onChangeNow:(c,p=Object.is)=>u(!0,c,p),asSignature:l,stopOnChange:d}}function T(e){return ce(e)}var $t,ra=O(()=>{"use strict";We();Oo();oa();$t=new Map});var Fg,Bg,jg,Ug,zg,Vg,$g,Kg,Jg,qg,Yg,Xg,Qg,Zg,ef,tf,nf,of,rf,af,sf,lf,cf,uf,df,pf,mf,gf,ff,bf,hf,yf,vf,xf,Sf,wf,aa,ia,sa,Tf,kf,Cf,Pf,Mf,Af,If,Ef,Lf,Df,Rf,Of,Gf,Hf,Nf,_f,Wf,Ff,Bf,jf,Uf,zf,Vf,$f,Kf,Jf,qf,Yf,Xf,Qf,Zf,eb,tb,la,nb,ob,rb,ab,ib,sb,lb,cb,ub,db,pb,mb,gb,fb,bb,hb,yb,vb,xb,Sb,wb,ca,ua,Tb,kb,Cb,Pb,Mb,Ab,Ib,Eb,Lb,Db,Rb,Ob,Gb,Hb,Nb,_b,Wb,Fb,Bb,jb,Ub,zb,Vb,$b,Kb,Jb,qb,Yb,Xb,Qb,Zb,eh,th,nh,oh,rh,ah,ih,sh,lh,ch,uh,dh,ph,mh,gh,fh,bh,hh,yh,vh,xh,Sh,wh,Th,kh,Ch,Ph,Mh,da,Go,Ah,Ih,Eh,Lh,Dh,Rh,Oh,Gh,Hh,Nh,_h,Wh,Fh,Bh,jh,Uh,zh,Vh,$h,Kh,Jh,qh,Pl=O(()=>{"use strict";ra();Fg=T("positionAtom"),Bg=T("lastPositionInMyGardenAtom"),jg=T("playerDirectionAtom"),Ug=T("stateAtom"),zg=T("quinoaDataAtom"),Vg=T("currentTimeAtom"),$g=T("actionAtom"),Kg=T("isPressAndHoldActionAtom"),Jg=T("mapAtom"),qg=T("tileSizeAtom"),Yg=ce("mapAtom",{path:"cols"}),Xg=ce("mapAtom",{path:"rows"}),Qg=ce("mapAtom",{path:"spawnTiles"}),Zg=ce("mapAtom",{path:"locations.seedShop.spawnTileIdx"}),ef=ce("mapAtom",{path:"locations.eggShop.spawnTileIdx"}),tf=ce("mapAtom",{path:"locations.toolShop.spawnTileIdx"}),nf=ce("mapAtom",{path:"locations.decorShop.spawnTileIdx"}),of=ce("mapAtom",{path:"locations.sellCropsShop.spawnTileIdx"}),rf=ce("mapAtom",{path:"locations.sellPetShop.spawnTileIdx"}),af=ce("mapAtom",{path:"locations.collectorsClub.spawnTileIdx"}),sf=ce("mapAtom",{path:"locations.wishingWell.spawnTileIdx"}),lf=ce("mapAtom",{path:"locations.shopsCenter.spawnTileIdx"}),cf=T("playerAtom"),uf=T("myDataAtom"),df=T("myUserSlotIdxAtom"),pf=T("isSpectatingAtom"),mf=T("myCoinsCountAtom"),gf=T("numPlayersAtom"),ff=ce("playerAtom",{path:"id"}),bf=T("userSlotsAtom"),hf=T("filteredUserSlotsAtom"),yf=T("myUserSlotAtom"),vf=T("spectatorsAtom"),xf=ce("stateAtom",{path:"child"}),Sf=ce("stateAtom",{path:"child.data"}),wf=ce("stateAtom",{path:"child.data.shops"}),aa=ce("stateAtom",{path:"child.data.userSlots"}),ia=ce("stateAtom",{path:"data.players"}),sa=ce("stateAtom",{path:"data.hostPlayerId"}),Tf=T("myInventoryAtom"),kf=T("myInventoryItemsAtom"),Cf=T("isMyInventoryAtMaxLengthAtom"),Pf=T("myFavoritedItemIdsAtom"),Mf=T("myCropInventoryAtom"),Af=T("mySeedInventoryAtom"),If=T("myToolInventoryAtom"),Ef=T("myEggInventoryAtom"),Lf=T("myDecorInventoryAtom"),Df=T("myPetInventoryAtom"),Rf=ce("myInventoryAtom",{path:"favoritedItemIds"}),Of=T("itemTypeFiltersAtom"),Gf=T("myItemStoragesAtom"),Hf=T("myPetHutchStoragesAtom"),Nf=T("myPetHutchItemsAtom"),_f=T("myPetHutchPetItemsAtom"),Wf=T("myNumPetHutchItemsAtom"),Ff=T("myValidatedSelectedItemIndexAtom"),Bf=T("isSelectedItemAtomSuspended"),jf=T("mySelectedItemAtom"),Uf=T("mySelectedItemNameAtom"),zf=T("mySelectedItemRotationsAtom"),Vf=T("mySelectedItemRotationAtom"),$f=T("setSelectedIndexToEndAtom"),Kf=T("myPossiblyNoLongerValidSelectedItemIndexAtom"),Jf=T("myCurrentGlobalTileIndexAtom"),qf=T("myCurrentGardenTileAtom"),Yf=T("myCurrentGardenObjectAtom"),Xf=T("myOwnCurrentGardenObjectAtom"),Qf=T("myOwnCurrentDirtTileIndexAtom"),Zf=T("myCurrentGardenObjectNameAtom"),eb=T("isInMyGardenAtom"),tb=T("myGardenBoardwalkTileObjectsAtom"),la=ce("myDataAtom",{path:"garden"}),nb=ce("myDataAtom",{path:"garden.tileObjects"}),ob=ce("myOwnCurrentGardenObjectAtom",{path:"objectType"}),rb=T("myCurrentStablePlantObjectInfoAtom"),ab=T("myCurrentSortedGrowSlotIndicesAtom"),ib=T("myCurrentGrowSlotIndexAtom"),sb=T("myCurrentGrowSlotsAtom"),lb=T("myCurrentGrowSlotAtom"),cb=T("secondsUntilCurrentGrowSlotMaturesAtom"),ub=T("isCurrentGrowSlotMatureAtom"),db=T("numGrowSlotsAtom"),pb=T("myCurrentEggAtom"),mb=T("petInfosAtom"),gb=T("myPetInfosAtom"),fb=T("myPetSlotInfosAtom"),bb=T("myPrimitivePetSlotsAtom"),hb=T("myNonPrimitivePetSlotsAtom"),yb=T("expandedPetSlotIdAtom"),vb=T("myPetsProgressAtom"),xb=T("myActiveCropMutationPetsAtom"),Sb=T("totalPetSellPriceAtom"),wb=T("selectedPetHasNewVariantsAtom"),ca=T("shopsAtom"),ua=T("myShopPurchasesAtom"),Tb=T("seedShopAtom"),kb=T("seedShopInventoryAtom"),Cb=T("seedShopRestockSecondsAtom"),Pb=T("seedShopCustomRestockInventoryAtom"),Mb=T("eggShopAtom"),Ab=T("eggShopInventoryAtom"),Ib=T("eggShopRestockSecondsAtom"),Eb=T("eggShopCustomRestockInventoryAtom"),Lb=T("toolShopAtom"),Db=T("toolShopInventoryAtom"),Rb=T("toolShopRestockSecondsAtom"),Ob=T("toolShopCustomRestockInventoryAtom"),Gb=T("decorShopAtom"),Hb=T("decorShopInventoryAtom"),Nb=T("decorShopRestockSecondsAtom"),_b=T("decorShopCustomRestockInventoryAtom"),Wb=T("isDecorShopAboutToRestockAtom"),Fb=ce("shopsAtom",{path:"seed"}),Bb=ce("shopsAtom",{path:"tool"}),jb=ce("shopsAtom",{path:"egg"}),Ub=ce("shopsAtom",{path:"decor"}),zb=T("myCropItemsAtom"),Vb=T("myCropItemsToSellAtom"),$b=T("totalCropSellPriceAtom"),Kb=T("friendBonusMultiplierAtom"),Jb=T("myJournalAtom"),qb=T("myCropJournalAtom"),Yb=T("myPetJournalAtom"),Xb=T("myStatsAtom"),Qb=T("myActivityLogsAtom"),Zb=T("newLogsAtom"),eh=T("hasNewLogsAtom"),th=T("newCropLogsFromSellingAtom"),nh=T("hasNewCropLogsFromSellingAtom"),oh=T("myCompletedTasksAtom"),rh=T("myActiveTasksAtom"),ah=T("isWelcomeToastVisibleAtom"),ih=T("shouldCloseWelcomeToastAtom"),sh=T("isInitialMoveToDirtPatchToastVisibleAtom"),lh=T("isFirstPlantSeedActiveAtom"),ch=T("isThirdSeedPlantActiveAtom"),uh=T("isThirdSeedPlantCompletedAtom"),dh=T("isDemoTouchpadVisibleAtom"),ph=T("areShopAnnouncersEnabledAtom"),mh=T("arePresentablesEnabledAtom"),gh=T("isEmptyDirtTileHighlightedAtom"),fh=T("isPlantTileHighlightedAtom"),bh=T("isItemHiglightedInHotbarAtom"),hh=T("isItemHighlightedInModalAtom"),yh=T("isMyGardenButtonHighlightedAtom"),vh=T("isSellButtonHighlightedAtom"),xh=T("isShopButtonHighlightedAtom"),Sh=T("isInstaGrowButtonHiddenAtom"),wh=T("isActionButtonHighlightedAtom"),Th=T("isGardenItemInfoCardHiddenAtom"),kh=T("isSeedPurchaseButtonHighlightedAtom"),Ch=T("isFirstSeedPurchaseActiveAtom"),Ph=T("isFirstCropHarvestActiveAtom"),Mh=T("isWeatherStatusHighlightedAtom"),da=T("weatherAtom"),Go=T("activeModalAtom"),Ah=T("hotkeyBeingPressedAtom"),Ih=T("avatarTriggerAnimationAtom"),Eh=T("avatarDataAtom"),Lh=T("emoteDataAtom"),Dh=T("otherUserSlotsAtom"),Rh=T("otherPlayerPositionsAtom"),Oh=T("otherPlayerSelectedItemsAtom"),Gh=T("otherPlayerLastActionsAtom"),Hh=T("traderBunnyPlayerId"),Nh=T("npcPlayersAtom"),_h=T("npcQuinoaUsersAtom"),Wh=T("numNpcAvatarsAtom"),Fh=T("traderBunnyEmoteTimeoutAtom"),Bh=T("traderBunnyEmoteAtom"),jh=T("unsortedLeaderboardAtom"),Uh=T("currentGardenNameAtom"),zh=T("quinoaEngineAtom"),Vh=T("quinoaInitializationErrorAtom"),$h=T("avgPingAtom"),Kh=T("serverClientTimeOffsetAtom"),Jh=T("isEstablishingShotRunningAtom"),qh=T("isEstablishingShotCompleteAtom")});var wt=O(()=>{"use strict";We();kn();ra();oa();Oo();Sn();Pl()});function Pn(){return te}function Ml(){return te.initialized}function Ve(){return te.isCustom&&te.activeModal!==null}function $e(){return te.activeModal}function pa(e){return!te.shadow||te.shadow.modal!==e?null:te.shadow.data}function Al(e){te.initialized=e}function Ho(e){te.activeModal=e}function No(e){te.isCustom=e}function ma(e,t){te.shadow={modal:e,data:t,timestamp:Date.now()}}function ga(){te.shadow=null}function fa(e,t){te.patchedAtoms.add(e),te.originalReads.set(e,t)}function Il(e){return te.originalReads.get(e)}function _o(e){return te.patchedAtoms.has(e)}function El(e){te.patchedAtoms.delete(e),te.originalReads.delete(e)}function Ll(e){te.unsubscribes.push(e)}function Yh(){for(let e of te.unsubscribes)try{e()}catch{}te.unsubscribes.length=0}function Dl(e){return te.listeners.onOpen.add(e),()=>te.listeners.onOpen.delete(e)}function Wo(e){return te.listeners.onClose.add(e),()=>te.listeners.onClose.delete(e)}function ba(e){for(let t of te.listeners.onOpen)try{t(e)}catch{}}function Fo(e){for(let t of te.listeners.onClose)try{t(e)}catch{}}function Rl(){Yh(),te.initialized=!1,te.activeModal=null,te.isCustom=!1,te.shadow=null,te.patchedAtoms.clear(),te.originalReads.clear(),te.listeners.onOpen.clear(),te.listeners.onClose.clear()}var te,Bo=O(()=>{"use strict";te={initialized:!1,activeModal:null,isCustom:!1,shadow:null,patchedAtoms:new Set,originalReads:new Map,unsubscribes:[],listeners:{onOpen:new Set,onClose:new Set}}});function ha(e){return jo[e]}function Ol(e){let t=jo[e],n=[];for(let r of t.atoms)n.push(r.atomLabel);if(t.derivedAtoms)for(let r of t.derivedAtoms)n.push(r.atomLabel);return n}var jo,Gl=O(()=>{"use strict";jo={inventory:{atoms:[{atomLabel:"myInventoryAtom",dataKey:"_full",transform:e=>{let t=e;return{items:t.items??[],storages:t.storages??[],favoritedItemIds:t.favoritedItemIds??[]}}}],derivedAtoms:[{atomLabel:"myCropInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Produce"):[]},{atomLabel:"mySeedInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Seed"):[]},{atomLabel:"myToolInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Tool"):[]},{atomLabel:"myEggInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Egg"):[]},{atomLabel:"myDecorInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Decor"):[]},{atomLabel:"myPetInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Pet"):[]}]},journal:{atoms:[{atomLabel:"myJournalAtom",dataKey:"_full"}],derivedAtoms:[{atomLabel:"myCropJournalAtom",sourceKey:"produce",deriveFn:e=>e??{}},{atomLabel:"myPetJournalAtom",sourceKey:"pets",deriveFn:e=>e??{}}]},stats:{atoms:[{atomLabel:"myStatsAtom",dataKey:"_full"}]},activityLog:{atoms:[{atomLabel:"myActivityLogsAtom",dataKey:"logs"}]},seedShop:{atoms:[{atomLabel:"seedShopInventoryAtom",dataKey:"inventory"},{atomLabel:"seedShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},eggShop:{atoms:[{atomLabel:"eggShopInventoryAtom",dataKey:"inventory"},{atomLabel:"eggShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},toolShop:{atoms:[{atomLabel:"toolShopInventoryAtom",dataKey:"inventory"},{atomLabel:"toolShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},decorShop:{atoms:[{atomLabel:"decorShopInventoryAtom",dataKey:"inventory"},{atomLabel:"decorShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},leaderboard:{atoms:[{atomLabel:"unsortedLeaderboardAtom",dataKey:"entries"}]},petHutch:{atoms:[{atomLabel:"myPetHutchItemsAtom",dataKey:"items"},{atomLabel:"myPetHutchPetItemsAtom",dataKey:"petItems"}]}}});function ey(e,t,n,r){return function(a){let i=Ve(),s=$e();if(i&&s===r){let u=pa(r);if(u!==null){let d;if(n.dataKey==="_full"?d=u:d=u[n.dataKey],d!==void 0)return t(a),n.transform?n.transform(d):d}}return t(a)}}function ty(e,t,n,r,o){return function(i){if(Ve()&&$e()===o){let s=pa(o);if(s!==null){let u=s[n];if(u!==void 0)return t(i),r(u)}}return t(i)}}function Nl(e){let t=ha(e);for(let n of t.atoms){let r=Be(n.atomLabel);if(!r||_o(n.atomLabel))continue;let o=r.read;if(typeof o!="function")continue;let a=ey(n.atomLabel,o,n,e);r.read=a,fa(n.atomLabel,o)}if(t.derivedAtoms)for(let n of t.derivedAtoms){let r=Be(n.atomLabel);if(!r||_o(n.atomLabel))continue;let o=r.read;if(typeof o!="function")continue;let a=ty(n.atomLabel,o,n.sourceKey,n.deriveFn,e);r.read=a,fa(n.atomLabel,o)}}async function Mn(e){let t=ha(e);for(let r of t.atoms)Hl(r.atomLabel);if(t.derivedAtoms)for(let r of t.derivedAtoms)Hl(r.atomLabel);let n=await Ro();await Wl(n,e)}async function _l(e){let t=await Ro();await Wl(t,e);let n=Ol(e);for(let r of n){let o=Be(r);if(o)try{t.get(o)}catch{}}}function Hl(e){if(!_o(e))return;let t=Be(e),n=Il(e);t&&n&&(t.read=n),El(e)}async function Wl(e,t){let n=Xh.has(t),r=Qh.has(t),o=Zh.has(t);if(!n&&!r&&!o)return;let a=Be("stateAtom");if(a)try{let i=e.get(a);if(!i||typeof i!="object")return;let s=null;if(n||r){let u=i.child,d=u?.data;if(u&&d&&typeof d=="object"){let l=null;if(n&&Array.isArray(d.userSlots)){let c=d.userSlots.map(p=>{if(!p||typeof p!="object")return p;let m=p,g=m.data,f=g&&typeof g=="object"?{...g}:g;return{...m,data:f}});l={...l??d,userSlots:c}}if(r&&d.shops&&typeof d.shops=="object"&&(l={...l??d,shops:{...d.shops}}),l){let c={...u,data:l};s={...i,child:c}}}}if(o){let u=i.data;if(u&&Array.isArray(u.players)){let d={...u,players:[...u.players]};s={...s??i,data:d}}}if(!s)return;await e.set(a,s)}catch{}}async function Fl(){for(let e of Object.keys(jo))await Mn(e)}var Xh,Qh,Zh,Bl=O(()=>{"use strict";kn();Sn();Gl();Bo();Xh=new Set(["inventory","journal","stats","activityLog","petHutch"]),Qh=new Set(["seedShop","eggShop","toolShop","decorShop"]),Zh=new Set(["leaderboard"])});async function jl(){if(Pn().initialized)return;An=await X.select("activeModalAtom"),Uo=setInterval(async()=>{try{let n=await X.select("activeModalAtom"),r=An;r!==n&&(An=n,ny(n,r))}catch{}},50),Ll(()=>{Uo&&(clearInterval(Uo),Uo=null)}),Al(!0)}function ny(e,t){let n=Ve(),r=$e();e===null&&t!==null&&(n&&r===t?oy("native"):n||Fo({modal:t,wasCustom:!1,closedBy:"native"})),e!==null&&!n&&ba({modal:e,isCustom:!1})}async function oy(e){let t=$e();t&&(ga(),No(!1),Ho(null),await Mn(t),Fo({modal:t,wasCustom:!0,closedBy:e}))}async function Ul(e,t){if(!Pn().initialized)throw new Error("[MGCustomModal] Not initialized. Call init() first.");Ve()&&await ya(),ma(e,t),No(!0),Ho(e),Nl(e),await _l(e),await Go.set(e),An=e,ba({modal:e,isCustom:!0})}function zl(e,t){let n=Pn();if(!n.isCustom||n.activeModal!==e||!n.shadow)return;let o={...n.shadow.data,...t};ma(e,o)}async function ya(){let e=Pn();if(!e.isCustom||!e.activeModal)return;let t=e.activeModal;ga(),No(!1),Ho(null),await Go.set(null),An=null,await Mn(t),Fo({modal:t,wasCustom:!0,closedBy:"api"})}function Vl(){return new Promise(e=>{if(!Ve()){e();return}let t=Wo(()=>{t(),e()})})}async function $l(){if(Ve()){let e=$e();e&&await Mn(e)}await Fl(),Rl()}var Uo,An,Kl=O(()=>{"use strict";wt();We();Bo();Bl();Uo=null,An=null});var In,va=O(()=>{"use strict";Kl();Bo();In={async init(){return jl()},isReady(){return Ml()},async show(e,t){return Ul(e,t)},update(e,t){return zl(e,t)},async close(){return ya()},isOpen(){return $e()!==null},isCustomOpen(){return Ve()},getActiveModal(){return $e()},waitForClose(){return Vl()},onOpen(e){return Dl(e)},onClose(e){return Wo(e)},destroy(){return $l()}}});function Jt(e){try{if(typeof structuredClone=="function")return structuredClone(e)}catch{}try{return JSON.parse(JSON.stringify(e))}catch{}return e}function En(){return Pe.tos()}function wa(){return Pe.engine()}function ry(){let e=En()?.map?.cols;return Number.isFinite(e)&&e>0?e:null}function Ta(e,t){let n=ry();return n?t*n+e|0:null}function Tt(e,t,n=!0){let r=En(),o=Ta(e,t);if(!r||o==null)return{gidx:null,tv:null};let a=r.tileViews?.get?.(o)||null;if(!a&&n&&typeof r.getOrCreateTileView=="function")try{a=r.getOrCreateTileView(o)}catch{}return{gidx:o,tv:a||null}}function Kt(e,t,n,r={}){let o=r.ensureView!==!1,a=r.forceUpdate!==!1,i=wa(),{gidx:s,tv:u}=Tt(Number(e),Number(t),o);if(s==null)throw new Error("MGTile: cols unavailable (engine/TOS not ready)");if(!u)throw new Error("MGTile: TileView unavailable (not instantiated)");let d=u.tileObject;if(typeof u.onDataChanged!="function")throw new Error("MGTile: tileView.onDataChanged not found (different API?)");if(u.onDataChanged(n),a&&i?.reusableContext&&typeof u.update=="function")try{u.update(i.reusableContext)}catch{}return{ok:!0,tx:Number(e),ty:Number(t),gidx:s,before:d,after:u.tileObject}}function ka(e,t){if(!e)throw new Error("MGTile: no tileObject on this tile");if(e.objectType!==t)throw new Error(`MGTile: expected objectType "${t}", got "${e.objectType}"`)}function xa(e,t){if("startTime"in t&&(e.startTime=Number(t.startTime)),"endTime"in t&&(e.endTime=Number(t.endTime)),"targetScale"in t&&(e.targetScale=Number(t.targetScale)),"mutations"in t){if(!Array.isArray(t.mutations))throw new Error("MGTile: mutations must be an array of strings");e.mutations=t.mutations.slice()}}function tt(){if(!je.ready)throw new Error("MGTile: not ready. Call MGTile.init() first.")}function Sa(e){if(!e)return null;let t=o=>o&&(typeof o.getGlobalPosition=="function"||typeof o.toGlobal=="function"),n=["container","root","view","tile","ground","base","floor","bg","background","baseSprite","tileSprite","displayObject","gfx","graphics","sprite"];for(let o of n)if(t(e[o]))return e[o];if(t(e))return e;let r=[e.container,e.root,e.view,e.displayObject,e.tileSprite,e.gfx,e.graphics,e.sprite];for(let o of r)if(t(o))return o;try{for(let o of Object.keys(e))if(t(e[o]))return e[o]}catch{}return null}function Vo(e){let t=Me(()=>e?.getGlobalPosition?.());if(t&&Number.isFinite(t.x)&&Number.isFinite(t.y))return{x:t.x,y:t.y};let n=Me(()=>e?.toGlobal?.({x:0,y:0}));return n&&Number.isFinite(n.x)&&Number.isFinite(n.y)?{x:n.x,y:n.y}:null}function ay(e){try{if(!e?.getBounds)return"center";let t=e.getBounds(),n=Vo(e);if(!n||!t||!Number.isFinite(t.width)||!Number.isFinite(t.height))return"center";let r=t.x+t.width/2,o=t.y+t.height/2;return Math.hypot(n.x-r,n.y-o)<Math.hypot(n.x-t.x,n.y-t.y)?"center":"topleft"}catch{return"center"}}function iy(){let e=En(),t=e?.map?.cols,n=e?.map?.rows;if(!e||!Number.isFinite(t)||t<=1)return null;let r=Number.isFinite(n)&&n>1?n:null,o=[[0,0],[1,1],[Math.min(2,t-2),0],[0,1]];r&&r>2&&o.push([Math.floor(t/2),Math.floor(r/2)]);for(let[a,i]of o){if(a<0||i<0||a>=t||r&&i>=r)continue;let s=Tt(a,i,!0).tv,u=a+1<t?Tt(a+1,i,!0).tv:null,d=Tt(a,i+1,!0).tv,l=Sa(s),c=Sa(u),p=Sa(d);if(!l||!c||!p)continue;let m=Vo(l),g=Vo(c),f=Vo(p);if(!m||!g||!f)continue;let h={x:g.x-m.x,y:g.y-m.y},b={x:f.x-m.x,y:f.y-m.y},w=h.x*b.y-h.y*b.x;if(!Number.isFinite(w)||Math.abs(w)<1e-6)continue;let x=1/w,y={a:b.y*x,b:-b.x*x,c:-h.y*x,d:h.x*x},k={x:m.x-a*h.x-i*b.x,y:m.y-a*h.y-i*b.y},S=ay(l),C=S==="center"?k:{x:k.x+.5*(h.x+b.x),y:k.y+.5*(h.y+b.y)};return{ok:!0,cols:t,rows:r,vx:h,vy:b,inv:y,anchorMode:S,originCenter:C}}return null}async function sy(e=15e3){return je.ready?!0:zo||(zo=(async()=>{if(await Pe.init(e),!En())throw new Error("MGTile: engine captured but tileObject system not found");return je.ready=!0,!0})(),zo)}function ly(){return Pe.hook()}function $o(e,t,n={}){tt();let r=n.ensureView!==!1,o=n.clone!==!1,{gidx:a,tv:i}=Tt(Number(e),Number(t),r);if(a==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!i)return{tx:Number(e),ty:Number(t),gidx:a,tileView:null,tileObject:void 0};let s=i.tileObject;return{tx:Number(e),ty:Number(t),gidx:a,tileView:i,tileObject:o?Jt(s):s}}function cy(e,t,n={}){return tt(),Kt(e,t,null,n)}function uy(e,t,n,r={}){tt();let a=$o(e,t,{...r,clone:!1}).tileView?.tileObject;ka(a,"plant");let i=Jt(a);if(Array.isArray(i.slots)||(i.slots=[]),"plantedAt"in n&&(i.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(i.maturedAt=Number(n.maturedAt)),"species"in n&&(i.species=String(n.species)),"slotIdx"in n&&"slotPatch"in n){let s=Number(n.slotIdx)|0;if(!i.slots[s])throw new Error(`MGTile: plant slot ${s} doesn't exist`);return xa(i.slots[s],n.slotPatch),Kt(e,t,i,r)}if("slots"in n){let s=n.slots;if(Array.isArray(s)){for(let u=0;u<s.length;u++)if(s[u]!=null){if(!i.slots[u])throw new Error(`MGTile: plant slot ${u} doesn't exist`);xa(i.slots[u],s[u])}}else if(s&&typeof s=="object")for(let u of Object.keys(s)){let d=Number(u)|0;if(Number.isFinite(d)){if(!i.slots[d])throw new Error(`MGTile: plant slot ${d} doesn't exist`);xa(i.slots[d],s[d])}}else throw new Error("MGTile: patch.slots must be array or object map");return Kt(e,t,i,r)}return Kt(e,t,i,r)}function dy(e,t,n,r={}){tt();let a=$o(e,t,{...r,clone:!1}).tileView?.tileObject;ka(a,"decor");let i=Jt(a);return"rotation"in n&&(i.rotation=Number(n.rotation)),Kt(e,t,i,r)}function py(e,t,n,r={}){tt();let a=$o(e,t,{...r,clone:!1}).tileView?.tileObject;ka(a,"egg");let i=Jt(a);return"plantedAt"in n&&(i.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(i.maturedAt=Number(n.maturedAt)),Kt(e,t,i,r)}function my(e,t,n,r={}){tt();let o=r.ensureView!==!1,a=r.forceUpdate!==!1,i=wa(),{gidx:s,tv:u}=Tt(Number(e),Number(t),o);if(s==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!u)throw new Error("MGTile: TileView unavailable");let d=u.tileObject,l=typeof n=="function"?n(Jt(d)):n;if(u.onDataChanged(l),a&&i?.reusableContext&&typeof u.update=="function")try{u.update(i.reusableContext)}catch{}return{ok:!0,tx:Number(e),ty:Number(t),gidx:s,before:d,after:u.tileObject}}function gy(e,t,n={}){tt();let r=n.ensureView!==!1,{gidx:o,tv:a}=Tt(Number(e),Number(t),r);if(o==null)throw new Error("MGTile: cols unavailable");if(!a)return{ok:!0,tx:Number(e),ty:Number(t),gidx:o,tv:null,tileObject:void 0};let i=n.clone!==!1,s=a.tileObject;return{ok:!0,tx:Number(e),ty:Number(t),gidx:o,objectType:s?.objectType??null,tileObject:i?Jt(s):s,tvKeys:Object.keys(a||{}).sort(),tileView:a}}function Jl(){return tt(),je.xform=iy(),je.xformAt=Date.now(),{ok:!!je.xform?.ok,xform:je.xform}}function fy(e,t={}){if(tt(),!e||!Number.isFinite(e.x)||!Number.isFinite(e.y))return null;let n=Number.isFinite(t.maxAgeMs)?Number(t.maxAgeMs):1500;(!je.xform?.ok||t.forceRebuild||Date.now()-je.xformAt>n)&&Jl();let r=je.xform;if(!r?.ok)return null;let o=e.x-r.originCenter.x,a=e.y-r.originCenter.y,i=r.inv.a*o+r.inv.b*a,s=r.inv.c*o+r.inv.d*a,u=Math.floor(i),d=Math.floor(s),l=[[u,d],[u+1,d],[u,d+1],[u+1,d+1]],c=null,p=1/0;for(let[m,g]of l){if(m<0||g<0||m>=r.cols||Number.isFinite(r.rows)&&r.rows!==null&&g>=r.rows)continue;let f=r.originCenter.x+m*r.vx.x+g*r.vy.x,h=r.originCenter.y+m*r.vx.y+g*r.vy.y,b=(e.x-f)**2+(e.y-h)**2;b<p&&(p=b,c={tx:m,ty:g,fx:i,fy:s,x:e.x,y:e.y,gidx:null})}return c?(c.gidx=Ta(c.tx,c.ty),c):null}function by(){return["MGTile.init()","MGTile.hook()","MGTile.getTileObject(tx,ty) / inspect(tx,ty)","MGTile.setTileEmpty(tx,ty)","MGTile.setTilePlant(tx,ty,{...}) / setTileDecor / setTileEgg","MGTile.setTileObjectRaw(tx,ty,objOrFn)","MGTile.rebuildTransform() / pointToTile({x,y})"].join(`
`)}var zo,je,Ke,Ko=O(()=>{"use strict";Ze();pn();zo=null,je={ready:!1,xform:null,xformAt:0};Ke={init:sy,ready:()=>je.ready,hook:ly,engine:()=>wa(),tos:()=>En(),gidx:(e,t)=>Ta(Number(e),Number(t)),getTileObject:$o,inspect:gy,setTileEmpty:cy,setTilePlant:uy,setTileDecor:dy,setTileEgg:py,setTileObjectRaw:my,rebuildTransform:Jl,pointToTile:fy,help:by}});function Jo(e,t,n){return e+(t-e)*n}function hy(e,t,n){let r=e>>16&255,o=e>>8&255,a=e&255,i=t>>16&255,s=t>>8&255,u=t&255,d=Jo(r,i,n)|0,l=Jo(o,s,n)|0,c=Jo(a,u,n)|0;return d<<16|l<<8|c}function yy(e,t=900){let n=[],r=[e];for(;r.length&&n.length<t;){let o=r.pop();if(!o)continue;qo(o)&&n.push(o);let a=o.children;if(Array.isArray(a))for(let i=a.length-1;i>=0;i--)r.push(a[i])}return n}function vy(e,t=25e3){let n=[],r=[e],o=0;for(;r.length&&o++<t;){let a=r.pop();if(!a)continue;kt(a)&&n.push(a);let i=a.children;if(Array.isArray(i))for(let s=i.length-1;s>=0;s--)r.push(i[s])}return n}function ql(e){if(!Array.isArray(e))return[];let t=new Set,n=[];for(let r of e){let o,a;if(Array.isArray(r))o=r[0],a=r[1];else if(Ia(r))o=r.x??r.tx,a=r.y??r.ty;else continue;if(o=Number(o),a=Number(a),!Number.isFinite(o)||!Number.isFinite(a))continue;o|=0,a|=0;let i=`${o},${a}`;t.has(i)||(t.add(i),n.push({x:o,y:a}))}return n}function xy(e,t){let n=String(e||"").trim();if(!n)throw new Error("MGPixi.defineTileSet: empty name");let r=ql(t);return B.tileSets.set(n,r),{ok:!0,name:n,count:r.length}}function Sy(e){return B.tileSets.delete(String(e||"").trim())}function wy(){return Array.from(B.tileSets.keys()).sort((e,t)=>e.localeCompare(t))}function Yl(e){return!!(e&&(e.tileSet!=null||Array.isArray(e.tiles)))}function Ea(e){let n=Ke.tos?.()?.tileViews;if(!n?.entries)throw new Error("MGPixi: TOS.tileViews not found");if(!Yl(e))return{entries:Array.from(n.entries()),gidxSet:null};let r=[];if(e.tileSet!=null){let a=String(e.tileSet||"").trim(),i=B.tileSets.get(a);if(!i)throw new Error(`MGPixi: tileSet not found "${a}"`);r=i}else r=ql(e.tiles||[]);let o=new Map;for(let a of r){let i=Ke.getTileObject(a.x,a.y,{ensureView:!0,clone:!1});i?.tileView&&i.gidx!=null&&o.set(i.gidx,i.tileView)}return{entries:Array.from(o.entries()),gidxSet:new Set(o.keys())}}function La(e){let t=B.highlights.get(e);if(!t)return!1;Me(()=>B.ticker?.remove(t.tick)),t.root&&t.baseAlpha!=null&&kt(t.root)&&Me(()=>{t.root.alpha=t.baseAlpha});for(let n of t.tint)n.o&&qo(n.o)&&Me(()=>{n.o.tint=n.baseTint});return B.highlights.delete(e),!0}function Xl(e=null){for(let t of Array.from(B.highlights.keys()))e&&!String(t).startsWith(e)||La(t);return!0}function Ql(e,t={}){if(Ct(),!Ca(e))throw new Error("MGPixi.highlightPulse: invalid root");let n=String(t.key||`hl:${Math.random().toString(16).slice(2)}`);if(B.highlights.has(n))return n;let r=kt(e)?Number(e.alpha):null,o=De(Number(t.minAlpha??.12),0,1),a=De(Number(t.maxAlpha??1),0,1),i=Number(t.speed??1.25),s=(t.tint??8386303)>>>0,u=De(Number(t.tintMix??.85),0,1),d=t.deepTint!==!1,l=[];if(d)for(let m of yy(e))l.push({o:m,baseTint:m.tint});else qo(e)&&l.push({o:e,baseTint:e.tint});let c=performance.now(),p=()=>{let m=(performance.now()-c)/1e3,g=(Math.sin(m*Math.PI*2*i)+1)/2,f=g*g*(3-2*g);r!=null&&kt(e)&&(e.alpha=De(Jo(o,a,f)*r,0,1));let h=f*u;for(let b of l)b.o&&qo(b.o)&&(b.o.tint=hy(b.baseTint,s,h))};return B.ticker?.add(p),B.highlights.set(n,{root:e,tick:p,baseAlpha:r,tint:l}),n}function Pa(e){if(!e)return null;if(Ca(e))return e;if(!Ia(e))return null;for(let t of Ty){let n=e[t];if(Ca(n))return n}return null}function ky(e,t){let n=[{o:e,d:0}],r=new Set,o=6;for(;n.length;){let{o:a,d:i}=n.shift();if(!(!a||i>o)&&!r.has(a)){if(r.add(a),Array.isArray(a)){if(a.length===t){let s=new Array(t),u=!0;for(let d=0;d<t;d++){let l=Pa(a[d]);if(!l){u=!1;break}s[d]=l}if(u)return s}for(let s of a)n.push({o:s,d:i+1});continue}if(Ia(a)){let s=a;for(let u of Object.keys(s))n.push({o:s[u],d:i+1})}}}return null}function Cy(e,t){let n=e?.mutations;if(!Array.isArray(n))return!1;for(let r of n)if(String(r||"").toLowerCase()===t)return!0;return!1}function Zl(e,t={}){Ct();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.highlightMutation: empty mutation");let{entries:r,gidxSet:o}=Ea(t),a=`hlmut:${n}:`;if(t.clear===!0)if(!o)Xl(a);else for(let c of Array.from(B.highlights.keys())){if(!c.startsWith(a))continue;let p=c.split(":"),m=Number(p[2]);o.has(m)&&La(c)}let i={tint:(t.tint??8386303)>>>0,minAlpha:Number(t.minAlpha??.12),maxAlpha:Number(t.maxAlpha??1),speed:Number(t.speed??1.25),tintMix:Number(t.tintMix??.85),deepTint:t.deepTint!==!1},s=0,u=0,d=0,l=0;for(let[c,p]of r){let m=p?.tileObject;if(!m||m.objectType!=="plant")continue;let g=m.slots;if(!Array.isArray(g)||g.length===0)continue;let f=!1,h=[];for(let x=0;x<g.length;x++)Cy(g[x],n)&&(h.push(x),f=!0);if(!f)continue;s++,u+=h.length;let b=p?.childView?.plantVisual||p?.childView||p,w=ky(b,g.length);if(!w){l+=h.length;continue}for(let x of h){let y=w[x];if(!y){l++;continue}let k=`${a}${c}:${x}`;B.highlights.has(k)||(Ql(y,{key:k,...i}),d++)}}return{ok:!0,mutation:n,filtered:!!o,plantsMatched:s,matchedSlots:u,newHighlights:d,failedSlots:l}}function Py(e,t={}){Ct();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchMutation: empty mutation");let r=`watchmut:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,o=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,a=B.watches.get(r);a&&clearInterval(a);let i=setInterval(()=>{Me(()=>Zl(n,{...t,clear:!1}))},o);return B.watches.set(r,i),{ok:!0,key:r,mutation:n,intervalMs:o}}function My(e){let t=String(e||"").trim();if(!t)return!1;if(!t.startsWith("watchmut:")){let r=t.toLowerCase(),o=0;for(let[a,i]of Array.from(B.watches.entries()))a.startsWith(`watchmut:${r}:`)&&(clearInterval(i),B.watches.delete(a),o++);return o>0}let n=B.watches.get(t);return n?(clearInterval(n),B.watches.delete(t),!0):!1}function Ay(e){let t=Array.isArray(e?.slots)?e.slots:[];return{objectType:"plant",species:e?.species??null,plantedAt:e?.plantedAt??null,maturedAt:e?.maturedAt??null,slotCount:t.length,slots:t.map((n,r)=>({idx:r,mutations:Array.isArray(n?.mutations)?n.mutations.slice():[]}))}}function Iy(e,t,n={}){Ct();let r=Number(e)|0,o=Number(t)|0,a=n.ensureView!==!1,i=Ke.getTileObject(r,o,{ensureView:a,clone:!1}),s=i?.tileView||null,u=s?.tileObject,d={ok:!0,tx:r,ty:o,gidx:i?.gidx??Ke.gidx?.(r,o)??null,hasTileView:!!s,objectType:u?.objectType??null,tileObject:u??null,summary:u?.objectType==="plant"?Ay(u):u?{objectType:u.objectType??null}:null,display:s?s.childView?.plantVisual||s.childView||s.displayObject||s:null};return n.log!==!1&&Me(()=>console.log("[MGPixi.inspectTile]",d)),d}function Ey(e){let t=e?.childView?.plantVisual||e?.childView?.cropVisual||e?.childView||e?.displayObject||e;return Pa(t)||Pa(e?.displayObject)||null}function ec(e){let t=B.fades.get(e);if(!t)return!1;for(let n of t.targets)n.o&&kt(n.o)&&Number.isFinite(n.baseAlpha)&&Me(()=>{n.o.alpha=n.baseAlpha});return B.fades.delete(e),!0}function Ma(e=null){for(let t of Array.from(B.fades.keys()))e&&!String(t).startsWith(e)||ec(t);return!0}function tc(e,t={}){Ct();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.clearSpeciesFade: empty species");let r=`fade:${n}:`;if(!Yl(t))return Ma(r);let{gidxSet:o}=Ea(t);if(!o)return Ma(r);for(let a of Array.from(B.fades.keys())){if(!a.startsWith(r))continue;let i=Number(a.slice(r.length));o.has(i)&&ec(a)}return!0}function nc(e,t={}){Ct();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.fadeSpecies: empty species");let r=De(Number(t.alpha??.2),0,1),o=t.deep===!0,{entries:a,gidxSet:i}=Ea(t),s=`fade:${n}:`;t.clear===!0&&tc(n,t);let u=0,d=0,l=0,c=0;for(let[p,m]of a){let g=m?.tileObject;if(!g||g.objectType!=="plant")continue;u++;let f=String(g.species||"").trim().toLowerCase();if(!f||f!==n)continue;d++;let h=Ey(m);if(!h||!kt(h)){c++;continue}let b=`${s}${p}`;if(B.fades.has(b)){Me(()=>{h.alpha=r}),l++;continue}let w=o?vy(h):[h],x=[];for(let y of w)kt(y)&&x.push({o:y,baseAlpha:Number(y.alpha)});for(let y of x)Me(()=>{y.o.alpha=r});B.fades.set(b,{targets:x}),l++}return{ok:!0,species:n,alpha:r,deep:o,filtered:!!i,plantsSeen:u,matchedPlants:d,applied:l,failed:c,totalFades:B.fades.size}}function Ly(e,t={}){Ct();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchFadeSpecies: empty species");let r=`watchfade:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,o=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,a=B.fadeWatches.get(r);a&&clearInterval(a);let i=setInterval(()=>{Me(()=>nc(n,{...t,clear:!1}))},o);return B.fadeWatches.set(r,i),{ok:!0,key:r,species:n,intervalMs:o}}function Dy(e){let t=String(e||"").trim();if(!t)return!1;if(!t.startsWith("watchfade:")){let r=t.toLowerCase(),o=0;for(let[a,i]of Array.from(B.fadeWatches.entries()))a.startsWith(`watchfade:${r}:`)&&(clearInterval(i),B.fadeWatches.delete(a),o++);return o>0}let n=B.fadeWatches.get(t);return n?(clearInterval(n),B.fadeWatches.delete(t),!0):!1}function Aa(){let e=A;return e.$PIXI=e.PIXI||null,e.$app=B.app||null,e.$renderer=B.renderer||null,e.$stage=B.stage||null,e.$ticker=B.ticker||null,e.__MG_PIXI__={PIXI:e.$PIXI,app:e.$app,renderer:e.$renderer,stage:e.$stage,ticker:e.$ticker,ready:B.ready},e.__MG_PIXI__}function Ct(){if(!B.ready)throw new Error("MGPixi: call MGPixi.init() first")}async function Ry(e=15e3){if(B.ready)return Aa(),!0;if(await Pe.init(e),B.app=Pe.app(),B.ticker=Pe.ticker(),B.renderer=Pe.renderer(),B.stage=Pe.stage(),!B.app||!B.ticker)throw new Error("MGPixi: PIXI app/ticker not found");return B.ready=!0,Aa(),!0}var B,Ia,Ca,qo,kt,Ty,Ln,Da=O(()=>{"use strict";Ze();ye();pn();Ko();B={ready:!1,app:null,renderer:null,stage:null,ticker:null,tileSets:new Map,highlights:new Map,watches:new Map,fades:new Map,fadeWatches:new Map},Ia=e=>!!e&&typeof e=="object"&&!Array.isArray(e),Ca=e=>!!(e&&typeof e.getBounds=="function"&&("parent"in e||"children"in e)),qo=e=>!!(e&&typeof e.tint=="number"),kt=e=>!!(e&&typeof e.alpha=="number");Ty=["plantVisual","cropVisual","slotVisual","slotView","displayObject","view","container","root","sprite","gfx","graphics"];Ln={init:Ry,ready:()=>B.ready,expose:Aa,get app(){return B.app},get renderer(){return B.renderer},get stage(){return B.stage},get ticker(){return B.ticker},get PIXI(){return A.PIXI||null},defineTileSet:xy,deleteTileSet:Sy,listTileSets:wy,highlightPulse:Ql,stopHighlight:La,clearHighlights:Xl,highlightMutation:Zl,watchMutation:Py,stopWatchMutation:My,inspectTile:Iy,fadeSpecies:nc,clearSpeciesFade:tc,clearFades:Ma,watchFadeSpecies:Ly,stopWatchFadeSpecies:Dy}});function Gn(){if(!z.ready)throw new Error("MGAudio not ready yet")}function rc(e,t=NaN){try{let n=localStorage.getItem(e);if(n==null)return t;let r;try{r=JSON.parse(n)}catch{r=n}if(typeof r=="number"&&Number.isFinite(r))return r;if(typeof r=="string"){let o=parseFloat(r);if(Number.isFinite(o))return o}}catch{}return t}function On(e){let t=Oy[e],n=Gy[e];if(!t)return{atom:Rn,vol100:Xo(Rn)};let r=rc(t,NaN);if(Number.isFinite(r)){let a=De(r,0,1);return{atom:a,vol100:Xo(a)}}if(n){let a=rc(n,NaN);if(Number.isFinite(a)){let i=De(a,0,1);return{atom:i,vol100:Xo(i)}}}let o=Rn;return{atom:o,vol100:Xo(o)}}function Hy(e){let t=Number(e);if(!Number.isFinite(t))return null;if(t<=0)return 0;let r=(De(t,1,100)-1)/99;return Dn+r*(Rn-Dn)}function Xo(e){let t=De(Number(e),0,1);if(t<=Dn)return 0;let n=(t-Dn)/(Rn-Dn);return Math.round(1+n*99)}function ac(e,t){if(t==null)return On(e).atom;let n=Hy(t);return n===null?On(e).atom:Ar(n)}async function ic(){let e=z.ctx;if(e)return e;let t=oc.AudioContext||oc.webkitAudioContext;if(!t)throw new Error("WebAudio not supported");let n=new t;return z.ctx=n,n}async function sc(){if(z.ctx&&z.ctx.state==="suspended")try{await z.ctx.resume()}catch{}}function Ny(e){let t=new Map,n=(r,o)=>{t.has(r)||t.set(r,[]),t.get(r).push(o)};for(let r of Object.keys(e||{})){let o=/^(.*)_([A-Z])$/.exec(r);o?.[1]?n(o[1],r):n(r,r)}for(let[r,o]of Array.from(t.entries()))o.sort((a,i)=>a.localeCompare(i)),t.set(r,o);z.sfx.groups=t}function _y(e){let t=z.sfx.atlas;if(!t)throw new Error("SFX atlas not loaded");if(t[e])return e;let n=z.sfx.groups.get(e);if(n?.length)return n[Math.random()*n.length|0];throw new Error(`Unknown sfx/group: ${e}`)}async function Wy(){if(z.sfx.buffer)return z.sfx.buffer;if(!z.sfx.mp3Url)throw new Error("SFX mp3 url missing");let e=await ic();await sc();let n=await(await go(z.sfx.mp3Url)).arrayBuffer(),r=await new Promise((o,a)=>{let i=e.decodeAudioData(n,o,a);i?.then&&i.then(o,a)});return z.sfx.buffer=r,r}async function Fy(e,t={}){if(!z.ready)throw new Error("MGAudio not ready yet");let n=String(e||"").trim();if(!n)throw new Error("Missing sfx name");let r=_y(n),o=z.sfx.atlas[r];if(!o)throw new Error(`Missing segment for sfx: ${r}`);let a=await ic();await sc();let i=await Wy(),s=Math.max(0,+o.start||0),u=Math.max(s,+o.end||s),d=Math.max(.01,u-s),l=ac("sfx",t.volume),c=a.createGain();c.gain.value=l,c.connect(a.destination);let p=a.createBufferSource();return p.buffer=i,p.connect(c),p.start(0,s,d),{name:r,source:p,start:s,end:u,duration:d,volume:l}}function lc(e){if(e!=="music"&&e!=="ambience")return!1;let t=z.tracks[e];if(t){try{t.pause()}catch{}try{t.src=""}catch{}}return z.tracks[e]=null,!0}function By(e,t,n={}){if(!z.ready)throw new Error("MGAudio not ready yet");if(e!=="music"&&e!=="ambience")throw new Error(`Invalid category: ${e}`);let r=z.urls[e].get(t);if(!r)throw new Error(`Unknown ${e}: ${t}`);lc(e);let o=new Audio(r);return o.loop=!!n.loop,o.volume=ac(e,n.volume),o.preload="auto",o.play().catch(()=>{}),z.tracks[e]=o,o}async function jy(e,t,n={}){let r=String(e||"").trim(),o=String(t||"").trim();if(!r||!o)throw new Error("play(category, asset) missing args");if(r==="sfx")return Fy(o,n);if(r==="music"||r==="ambience")return By(r,o,n);throw new Error(`Unknown category: ${r}`)}function Uy(e,t={}){let n=String(e||"").trim();return n==="music"||n==="ambience"?Array.from(z.urls[n].keys()).sort():n==="sfx"?z.sfx.atlas?t.groups?Array.from(z.sfx.groups.keys()).sort():Object.keys(z.sfx.atlas).sort():[]:[]}function zy(){return z.tracks.music&&(z.tracks.music.volume=On("music").atom),z.tracks.ambience&&(z.tracks.ambience.volume=On("ambience").atom),!0}function Vy(){return Gn(),["sfx","music","ambience"]}function $y(){return Gn(),Array.from(z.sfx.groups.keys()).sort((e,t)=>e.localeCompare(t))}function Ky(e,t){Gn();let n=String(e||"").trim().toLowerCase(),r=String(t||"").trim();if(!r||n!=="music"&&n!=="ambience")return!1;let o=z.urls[n],a=r.toLowerCase();for(let i of o.keys())if(i.toLowerCase()===a)return!0;return!1}function Jy(e){Gn();let t=String(e||"").trim();if(!t)return!1;let n=t.toLowerCase();for(let r of z.sfx.groups.keys())if(r.toLowerCase()===n)return!0;return!1}function qy(e,t){Gn();let n=String(e||"").trim().toLowerCase(),r=String(t||"").trim();if(!r)throw new Error("getTrackUrl(category, name) missing name");if(n!=="music"&&n!=="ambience")throw new Error(`Invalid category: ${e}`);let o=z.urls[n],a=r.toLowerCase();for(let[i,s]of o.entries())if(i.toLowerCase()===a)return s;return null}async function Yy(){return z.ready?!0:Yo||(Yo=(async()=>{z.baseUrl=await Fe.base();let e=await Re.load(z.baseUrl),t=Re.getBundle(e,"audio");if(!t)throw new Error("No audio bundle in manifest");for(let n of t.assets||[])for(let r of n.src||[]){if(typeof r!="string")continue;let o=/^audio\/(ambience|music)\/(.+)\.mp3$/i.exec(r);if(o){let a=o[1].toLowerCase(),i=o[2];z.urls[a].set(i,Ae(z.baseUrl,r));continue}/^audio\/sfx\/sfx\.mp3$/i.test(r)&&(z.sfx.mp3Url=Ae(z.baseUrl,r)),/^audio\/sfx\/sfx\.json$/i.test(r)&&(z.sfx.atlasUrl=Ae(z.baseUrl,r))}if(!z.sfx.atlasUrl)throw new Error("Missing audio/sfx/sfx.json in manifest");return z.sfx.atlas=await Nt(z.sfx.atlasUrl),Ny(z.sfx.atlas),z.ready=!0,!0})(),Yo)}var oc,Oy,Gy,Dn,Rn,Yo,z,Hn,Ra=O(()=>{"use strict";ye();Ze();mn();_t();Wt();hn();oc=A??window,Oy={sfx:"soundEffectsVolume",music:"musicVolume",ambience:"ambienceVolume"},Gy={sfx:"soundEffectsVolumeAtom",music:"musicVolumeAtom",ambience:"ambienceVolumeAtom"},Dn=.001,Rn=.2,Yo=null,z={ready:!1,baseUrl:null,urls:{ambience:new Map,music:new Map},sfx:{mp3Url:null,atlasUrl:null,atlas:null,groups:new Map,buffer:null},tracks:{ambience:null,music:null},ctx:null};Hn={init:Yy,ready:()=>z.ready,play:jy,stop:lc,list:Uy,refreshVolumes:zy,categoryVolume:On,getCategories:Vy,getGroups:$y,hasTrack:Ky,hasGroup:Jy,getTrackUrl:qy}});function Xy(){if(pe.overlay)return pe.overlay;let e=Oa.createElement("div");return e.id="MG_COSMETIC_OVERLAY",e.style.cssText=["position:fixed","left:0","top:0","width:100vw","height:100vh","pointer-events:none","z-index:99999999"].join(";"),Oa.documentElement.appendChild(e),pe.overlay=e,e}function Qy(){let e=pe.defaultParent;if(!e)return null;try{return typeof e=="function"?e():e}catch{return null}}function Ga(e){let t=String(e||"").trim();return t?(t=t.replace(/^cosmetic\//i,""),t=t.replace(/\.png$/i,""),t):""}function Zy(e,t){if(t===void 0){let a=Ga(e),i=a.indexOf("_");return i<0?{cat:"",asset:a,base:a}:{cat:a.slice(0,i),asset:a.slice(i+1),base:a}}let n=String(e||"").trim(),r=Ga(t),o=r.includes("_")?r:`${n}_${r}`;if(r.includes("_")&&!n){let a=r.indexOf("_");return{cat:r.slice(0,a),asset:r.slice(a+1),base:r}}return{cat:n,asset:r.replace(/^.+?_/,""),base:o}}function ev(){return Array.from(pe.byCat.keys()).sort((e,t)=>e.localeCompare(t))}function tv(e){let t=pe.byCat.get(String(e||"").trim());return t?Array.from(t.keys()).sort((n,r)=>n.localeCompare(r)):[]}function Ha(e,t){let{cat:n,asset:r,base:o}=Zy(e,t),a=pe.byBase.get(o);if(a)return a;let s=pe.byCat.get(n)?.get(r);if(s)return s;if(!pe.baseUrl)throw new Error("MGCosmetic not initialized");if(!o)throw new Error("Invalid cosmetic name");return Ae(pe.baseUrl,`cosmetic/${o}.png`)}function Na(e,t,n){if(!pe.ready)throw new Error("MGCosmetic not ready yet");let r,o;typeof t=="object"&&t!==null?(r=t,o=void 0):typeof t=="string"?(o=t,r=n||{}):(o=void 0,r=n||{});let a=o!==void 0?Ha(e,o):Ha(e),i=Oa.createElement("img");if(i.decoding="async",i.loading="eager",i.src=a,i.alt=r.alt!=null?String(r.alt):Ga(o??e),r.className&&(i.className=String(r.className)),r.width!=null&&(i.style.width=String(r.width)),r.height!=null&&(i.style.height=String(r.height)),r.opacity!=null&&(i.style.opacity=String(r.opacity)),r.style&&typeof r.style=="object")for(let[s,u]of Object.entries(r.style))try{i.style[s]=String(u)}catch{}return i}function nv(e,t,n){let r,o;typeof t=="object"&&t!==null?(r=t,o=void 0):typeof t=="string"?(o=t,r=n||{}):(o=void 0,r=n||{});let a=r.parent||Qy()||Xy(),i=o!==void 0?Na(e,o,r):Na(e,r);if(a===pe.overlay||r.center||r.x!=null||r.y!=null||r.absolute){i.style.position="absolute",i.style.pointerEvents="none",i.style.zIndex=String(r.zIndex??999999);let u=r.scale??1,d=r.rotation??0;if(r.center)i.style.left="50%",i.style.top="50%",i.style.transform=`translate(-50%, -50%) scale(${u}) rotate(${d}rad)`;else{let l=r.x??innerWidth/2,c=r.y??innerHeight/2;i.style.left=`${l}px`,i.style.top=`${c}px`,i.style.transform=`scale(${u}) rotate(${d}rad)`,r.anchor==="center"&&(i.style.transform=`translate(-50%, -50%) scale(${u}) rotate(${d}rad)`)}}return a.appendChild(i),pe.live.add(i),i.__mgDestroy=()=>{try{i.remove()}catch{}pe.live.delete(i)},i}function ov(e){return pe.defaultParent=e,!0}function rv(){for(let e of Array.from(pe.live))e.__mgDestroy?.()}async function av(){return pe.ready?!0:Qo||(Qo=(async()=>{pe.baseUrl=await Fe.base();let e=await Re.load(pe.baseUrl),t=Re.getBundle(e,"cosmetic");if(!t)throw new Error("No 'cosmetic' bundle in manifest");pe.byCat.clear(),pe.byBase.clear();for(let n of t.assets||[])for(let r of n.src||[]){if(typeof r!="string"||!/^cosmetic\/.+\.png$/i.test(r))continue;let a=r.split("/").pop().replace(/\.png$/i,""),i=a.indexOf("_");if(i<0)continue;let s=a.slice(0,i),u=a.slice(i+1),d=Ae(pe.baseUrl,r);pe.byBase.set(a,d),pe.byCat.has(s)||pe.byCat.set(s,new Map),pe.byCat.get(s).set(u,d)}return pe.ready=!0,!0})(),Qo)}var Oa,Qo,pe,Nn,_a=O(()=>{"use strict";ye();_t();Wt();hn();Oa=A?.document??document,Qo=null,pe={ready:!1,baseUrl:null,byCat:new Map,byBase:new Map,overlay:null,live:new Set,defaultParent:null};Nn={init:av,ready:()=>pe.ready,categories:ev,list:tv,url:Ha,create:Na,show:nv,attach:ov,clear:rv}});var cc=O(()=>{"use strict"});function iv(){return _n||(_n=new Zo),_n}function sv(){_n&&(_n=null)}var Zo,_n,uc=O(()=>{"use strict";Zo=class{constructor(){ee(this,"achievements",new Map);ee(this,"data");ee(this,"storageKey","gemini_achievements");ee(this,"onUnlockCallbacks",[]);ee(this,"onProgressCallbacks",[]);this.data=this.loadData()}loadData(){try{let t=localStorage.getItem(this.storageKey);if(t)return JSON.parse(t)}catch(t){console.warn("[Achievements] Failed to load data:",t)}return{unlocked:{},progress:{}}}saveData(){try{localStorage.setItem(this.storageKey,JSON.stringify(this.data))}catch(t){console.warn("[Achievements] Failed to save data:",t)}}register(t){this.achievements.set(t.id,t),this.data.progress[t.id]||(this.data.progress[t.id]={current:0,target:t.target,percentage:0})}registerMany(t){for(let n of t)this.register(n)}async checkAchievement(t){let n=this.achievements.get(t);if(!n)throw new Error(`Achievement not found: ${t}`);let r=this.isUnlocked(t),o=await n.checkProgress(),a={current:o,target:n.target,percentage:Math.min(100,Math.floor(o/n.target*100))},i=this.data.progress[t];this.data.progress[t]=a;let s=o>=n.target;return!r&&s?this.unlock(t,a):s||this.triggerProgressCallbacks({achievement:n,progress:a,previousProgress:i}),this.saveData(),{id:t,wasUnlocked:r,isUnlocked:s,progress:a}}async checkAllAchievements(){let t=[];for(let n of this.achievements.keys()){let r=await this.checkAchievement(n);t.push(r)}return t}unlock(t,n){let r=this.achievements.get(t);if(!r)return;let o={achievementId:t,unlockedAt:Date.now(),progress:n};this.data.unlocked[t]=o,this.saveData(),this.triggerUnlockCallbacks({achievement:r,unlockedAt:o.unlockedAt,progress:n})}isUnlocked(t){return!!this.data.unlocked[t]}getAchievement(t){return this.achievements.get(t)||null}getAllAchievements(){return Array.from(this.achievements.values())}getAchievementsByCategory(t){return Array.from(this.achievements.values()).filter(n=>n.category===t)}getAchievementsByRarity(t){return Array.from(this.achievements.values()).filter(n=>n.rarity===t)}getUnlockedAchievements(){return Object.values(this.data.unlocked)}getLockedAchievements(){return Array.from(this.achievements.values()).filter(t=>!this.isUnlocked(t.id)&&!t.hidden)}getProgress(t){return this.data.progress[t]||null}getCompletionPercentage(){let t=this.achievements.size,n=Object.keys(this.data.unlocked).length;return t>0?Math.floor(n/t*100):0}getCompletionStats(){let t=this.achievements.size,n=Object.keys(this.data.unlocked).length,r=t-n,o=this.getCompletionPercentage();return{total:t,unlocked:n,locked:r,percentage:o}}onUnlock(t){return this.onUnlockCallbacks.push(t),()=>{let n=this.onUnlockCallbacks.indexOf(t);n!==-1&&this.onUnlockCallbacks.splice(n,1)}}onProgress(t){return this.onProgressCallbacks.push(t),()=>{let n=this.onProgressCallbacks.indexOf(t);n!==-1&&this.onProgressCallbacks.splice(n,1)}}triggerUnlockCallbacks(t){for(let n of this.onUnlockCallbacks)try{n(t)}catch(r){console.warn("[Achievements] Unlock callback error:",r)}}triggerProgressCallbacks(t){for(let n of this.onProgressCallbacks)try{n(t)}catch(r){console.warn("[Achievements] Progress callback error:",r)}}reset(){this.data={unlocked:{},progress:{}};for(let t of this.achievements.values())this.data.progress[t.id]={current:0,target:t.target,percentage:0};this.saveData()}exportData(){return JSON.stringify(this.data,null,2)}importData(t){try{let n=JSON.parse(t);return this.data=n,this.saveData(),!0}catch(n){return console.warn("[Achievements] Failed to import data:",n),!1}}},_n=null});var er={};Ot(er,{AchievementManager:()=>Zo,destroyAchievementManager:()=>sv,getAchievementManager:()=>iv});var dc=O(()=>{"use strict";cc();uc()});function tr(e){let t=1,n=0,r=0;for(let o of e)o==="Gold"||o==="Rainbow"?o==="Rainbow"?t=qt.Rainbow:t===1&&(t=qt.Gold):o in qt&&(n+=qt[o],r++);return t*(1+n-r)}function Wa(e){return qt[e]??null}function Fa(e){return lv.has(e)}function pc(e){return cv.has(e)}function uv(){return Object.keys(qt)}function dv(e){let t=Wa(e);return t===null?null:{name:e,value:t,type:Fa(e)?"growth":"environmental"}}var qt,lv,cv,nr=O(()=>{"use strict";qt={Gold:25,Rainbow:50,Frozen:10,Chilled:5,Wet:2},lv=new Set(["Gold","Rainbow"]),cv=new Set(["Frozen","Chilled","Wet"])});function mc(e,t){let n=or(e);if(!n)return 50;let r=n.maxScale;if(t<=1)return 50;if(t>=r)return 100;let o=(t-1)/(r-1);return Math.floor(50+50*o)}function Ba(e,t,n){let r=or(e);if(!r)return 0;let o=r.baseSellPrice,a=tr(n);return Math.round(o*t*a)}function gc(e,t,n){if(n>=t)return 100;if(n<=e)return 0;let r=t-e,o=n-e;return Math.floor(o/r*100)}function fc(e,t){return t>=e}function pv(e,t){let n=Math.max(0,e-t);return Math.floor(n/1e3)}function or(e){let t=de.get("plants");if(!t)return null;let n=t[e];return n?.crop?{baseSellPrice:n.crop.baseSellPrice??0,maxScale:n.crop.maxScale??1,growTime:n.crop.growTime??0}:null}function mv(e){return e.reduce((t,n)=>t+Ba(n.species,n.targetScale,n.mutations),0)}var ja=O(()=>{"use strict";ut();nr()});function Pt(e){return e/bc}function Mt(e,t){let n=Et(e);if(!n)return Ua;let r=n.maxScale;if(t<=1)return Ua;if(t>=r)return gv;let o=(t-1)/(r-1);return Math.floor(Ua+20*o)}function At(e,t,n){let r=Et(e);if(!r)return n-Wn;let o=r.hoursToMature,a=t/bc,i=Wn/o,s=Math.min(i*a,Wn),u=n-Wn;return Math.floor(u+s)}function It(e,t){let n=Et(e);return n?t>=n.hoursToMature:!1}function rr(e){let t=Et(e);return t?Wn/t.hoursToMature:0}function za(e,t,n){let r=t-e;return r<=0||n<=0?0:r/n}function fv(e,t){let n=Et(e);if(!n)return 0;let r=n.hoursToMature-t;return Math.max(0,r)}function Et(e){let t=de.get("pets");if(!t)return null;let n=t[e];return n?{hoursToMature:n.hoursToMature??0,maxScale:n.maxScale??1,abilities:n.abilities??[]}:null}function Va(e,t){return t<=0?1:Math.min(1,e/t)}var bc,Ua,gv,Wn,$a=O(()=>{"use strict";ut();bc=3600,Ua=80,gv=100,Wn=30});var ar={};Ot(ar,{calculateCropProgress:()=>gc,calculateCropSellPrice:()=>Ba,calculateCropSize:()=>mc,calculateCurrentStrength:()=>At,calculateHoursToMature:()=>fv,calculateHoursToMaxStrength:()=>za,calculateMaxStrength:()=>Mt,calculateMutationMultiplier:()=>tr,calculatePetAge:()=>Pt,calculateStrengthPerHour:()=>rr,calculateStrengthProgress:()=>Va,calculateTimeRemaining:()=>pv,calculateTotalCropValue:()=>mv,getAllMutationNames:()=>uv,getCropData:()=>or,getMutationInfo:()=>dv,getMutationValue:()=>Wa,getPetData:()=>Et,isCropReady:()=>fc,isEnvironmentalMutation:()=>pc,isGrowthMutation:()=>Fa,isPetMature:()=>It});var ir=O(()=>{"use strict";ja();$a();nr();ja();$a();nr()});var Ka={};Ot(Ka,{calculatePetStrength:()=>hc,enrichPetWithStrength:()=>yc,enrichPetsWithStrength:()=>vc,getPetStrengthStats:()=>bv});function hc(e){let t=Pt(e.xp),n=Mt(e.petSpecies,e.targetScale),r=At(e.petSpecies,e.xp,n),o=It(e.petSpecies,t),a=rr(e.petSpecies),i=za(r,n,a),s=Va(r,n);return{current:r,max:n,progress:s,age:t,isMature:o,strengthPerHour:a,hoursToMax:i}}function yc(e){return{...e,strength:hc(e)}}function vc(e){return e.map(yc)}function bv(e){if(e.length===0)return{averageCurrent:0,averageMax:0,totalMature:0,totalImmature:0,strongestPet:null,weakestPet:null};let t=vc(e),n=t.reduce((u,d)=>u+d.strength.current,0),r=t.reduce((u,d)=>u+d.strength.max,0),o=t.filter(u=>u.strength.isMature).length,a=t.length-o,i=t.reduce((u,d)=>d.strength.max>(u?.strength.max||0)?d:u,t[0]),s=t.reduce((u,d)=>d.strength.max<(u?.strength.max||1/0)?d:u,t[0]);return{averageCurrent:Math.round(n/t.length),averageMax:Math.round(r/t.length),totalMature:o,totalImmature:a,strongestPet:i,weakestPet:s}}var xc=O(()=>{"use strict";ir()});var Sc=O(()=>{"use strict"});function Te(e,t){if(e===t)return!0;if(e===null||t===null)return e===t;if(typeof e!=typeof t)return!1;if(typeof e!="object")return e===t;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return!1;for(let i=0;i<e.length;i++)if(!Te(e[i],t[i]))return!1;return!0}if(Array.isArray(e)||Array.isArray(t))return!1;let n=e,r=t,o=Object.keys(n),a=Object.keys(r);if(o.length!==a.length)return!1;for(let i of o)if(!Object.prototype.hasOwnProperty.call(r,i)||!Te(n[i],r[i]))return!1;return!0}var pt=O(()=>{"use strict";We()});function hv(e){let t=e.currentGardenTile;return{globalIndex:e.globalTileIndex,localIndex:t?.localTileIndex??null}}function yv(e){return{type:e.currentGardenTile?.tileType??null,isEmpty:e.gardenObject===null}}function vv(e){let t=e.currentGardenTile;return{name:e.gardenName,isOwner:e.isInMyGarden??!1,playerSlotIndex:t?.userSlotIdx??null}}function xv(e){let t=e.gardenObject;return t?{type:t.objectType,data:t,isMature:e.isMature??!1}:{type:null,data:null,isMature:!1}}function Sv(e){let t=e.gardenObject;if(!t||t.objectType!=="plant")return null;let n=t,r=e.sortedSlotIndices??[];return{species:n.species,slots:n.slots??[],currentSlotIndex:e.currentGrowSlotIndex,sortedSlotIndices:r,nextHarvestSlotIndex:r.length>0?r[0]:null}}function kc(e){return{position:hv(e),tile:yv(e),garden:vv(e),object:xv(e),plant:Sv(e)}}function Cc(e){return JSON.stringify({globalIndex:e.position.globalIndex,localIndex:e.position.localIndex,tileType:e.tile.type,isEmpty:e.tile.isEmpty,gardenName:e.garden.name,isOwner:e.garden.isOwner,playerSlotIndex:e.garden.playerSlotIndex,objectType:e.object.type,isMature:e.object.isMature,plantSpecies:e.plant?.species??null,slotCount:e.plant?.slots.length??0})}function wv(e,t){return e.type!==t.type||e.isMature!==t.isMature?!0:e.data===null&&t.data===null?!1:e.data===null||t.data===null?!0:!Te(e.data,t.data)}function Tv(e,t){return e===null&&t===null?!1:e===null||t===null||e.species!==t.species||e.currentSlotIndex!==t.currentSlotIndex||e.nextHarvestSlotIndex!==t.nextHarvestSlotIndex||e.slots.length!==t.slots.length?!0:!Te(e.sortedSlotIndices,t.sortedSlotIndices)}function kv(e,t){return e.name!==t.name||e.isOwner!==t.isOwner||e.playerSlotIndex!==t.playerSlotIndex}function Cv(){let e=Tc,t=Tc,n=!1,r=[],o={all:new Set,stable:new Set,object:new Set,plantInfo:new Set,garden:new Set},a={},i=Object.keys(wc),s=new Set;function u(){if(s.size<i.length)return;let l=kc(a);if(!Te(e,l)&&(t=e,e=l,!!n)){for(let c of o.all)c(e,t);if(Cc(t)!==Cc(e))for(let c of o.stable)c(e,t);if(wv(t.object,e.object)){let c={current:e.object,previous:t.object};for(let p of o.object)p(c)}if(Tv(t.plant,e.plant)){let c={current:e.plant,previous:t.plant};for(let p of o.plantInfo)p(c)}if(kv(t.garden,e.garden)){let c={current:e.garden,previous:t.garden};for(let p of o.garden)p(c)}}}async function d(){if(n)return;let l=i.map(async c=>{let p=wc[c],m=await X.subscribe(p,g=>{a[c]=g,s.add(c),u()});r.push(m)});await Promise.all(l),n=!0,s.size===i.length&&(e=kc(a))}return d(),{get(){return e},subscribe(l,c){return o.all.add(l),c?.immediate!==!1&&n&&s.size===i.length&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,c){return o.stable.add(l),c?.immediate!==!1&&n&&s.size===i.length&&l(e,e),()=>o.stable.delete(l)},subscribeObject(l,c){return o.object.add(l),c?.immediate&&n&&s.size===i.length&&l({current:e.object,previous:e.object}),()=>o.object.delete(l)},subscribePlantInfo(l,c){return o.plantInfo.add(l),c?.immediate&&n&&s.size===i.length&&l({current:e.plant,previous:e.plant}),()=>o.plantInfo.delete(l)},subscribeGarden(l,c){return o.garden.add(l),c?.immediate&&n&&s.size===i.length&&l({current:e.garden,previous:e.garden}),()=>o.garden.delete(l)},destroy(){for(let l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.object.clear(),o.plantInfo.clear(),o.garden.clear(),n=!1}}}function qa(){return Ja||(Ja=Cv()),Ja}var wc,Tc,Ja,Ya=O(()=>{"use strict";We();pt();wc={currentGardenTile:"myCurrentGardenTileAtom",globalTileIndex:"myCurrentGlobalTileIndexAtom",gardenObject:"myCurrentGardenObjectAtom",isMature:"isGardenObjectMatureAtom",isInMyGarden:"isInMyGardenAtom",gardenName:"currentGardenNameAtom",sortedSlotIndices:"myCurrentSortedGrowSlotIndicesAtom",currentGrowSlotIndex:"myCurrentGrowSlotIndexAtom"},Tc={position:{globalIndex:null,localIndex:null},tile:{type:null,isEmpty:!0},garden:{name:null,isOwner:!1,playerSlotIndex:null},object:{type:null,data:null,isMature:!1},plant:null};Ja=null});function Mc(e,t){let n=Pt(e.xp),r=Mt(e.petSpecies,e.targetScale),o=At(e.petSpecies,e.xp,r),a=It(e.petSpecies,n);return{id:e.id,petSpecies:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,mutations:[...e.mutations],targetScale:e.targetScale,abilities:[...e.abilities],location:t,position:null,lastAbilityTrigger:null,growthStage:n,currentStrength:o,maxStrength:r,isMature:a}}function Pv(e,t){let r=t[e.slot.id]?.lastAbilityTrigger??null,o=Pt(e.slot.xp),a=Mt(e.slot.petSpecies,e.slot.targetScale),i=At(e.slot.petSpecies,e.slot.xp,a),s=It(e.slot.petSpecies,o);return{id:e.slot.id,petSpecies:e.slot.petSpecies,name:e.slot.name,xp:e.slot.xp,hunger:e.slot.hunger,mutations:[...e.slot.mutations],targetScale:e.slot.targetScale,abilities:[...e.slot.abilities],location:"active",position:e.position?{x:e.position.x,y:e.position.y}:null,lastAbilityTrigger:r,growthStage:o,currentStrength:i,maxStrength:a,isMature:s}}function Ac(e){let t=new Set,n=[];for(let u of e.active??[]){let d=Pv(u,e.slotInfos??{});n.push(d),t.add(d.id)}let r=[];for(let u of e.inventory??[]){if(t.has(u.id))continue;let d=Mc(u,"inventory");r.push(d),t.add(d.id)}let o=[];for(let u of e.hutch??[]){if(t.has(u.id))continue;let d=Mc(u,"hutch");o.push(d),t.add(d.id)}let a=[...n,...r,...o],i=e.expandedPetSlotId??null,s=i?a.find(u=>u.id===i)??null:null;return{all:a,byLocation:{inventory:r,hutch:o,active:n},counts:{inventory:r.length,hutch:o.length,active:n.length,total:a.length},expandedPetSlotId:i,expandedPet:s}}function Mv(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}function Ec(e){return JSON.stringify({id:e.id,petSpecies:e.petSpecies,name:e.name,mutations:e.mutations,abilities:e.abilities,location:e.location})}function Av(e,t){if(e.all.length!==t.all.length)return!1;let n=e.all.map(Ec),r=t.all.map(Ec);return Mv(n,r)}function Iv(e,t){let n=[],r=new Map(e.all.map(o=>[o.id,o]));for(let o of t.all){let a=r.get(o.id);a&&a.location!==o.location&&n.push({pet:o,from:a.location,to:o.location})}return n}function Ev(e,t){let n=[],r=new Map(e.all.map(o=>[o.id,o]));for(let o of t.all){if(!o.lastAbilityTrigger)continue;let i=r.get(o.id)?.lastAbilityTrigger;(!i||i.abilityId!==o.lastAbilityTrigger.abilityId||i.performedAt!==o.lastAbilityTrigger.performedAt)&&n.push({pet:o,trigger:o.lastAbilityTrigger})}return n}function Lv(e,t){let n=new Set(e.all.map(i=>i.id)),r=new Set(t.all.map(i=>i.id)),o=t.all.filter(i=>!n.has(i.id)),a=e.all.filter(i=>!r.has(i.id));return o.length===0&&a.length===0?null:{added:o,removed:a,counts:t.counts}}function Dv(e,t){let n=[],r=new Map(e.all.map(o=>[o.id,o]));for(let o of t.all){let a=r.get(o.id);a&&o.growthStage>a.growthStage&&n.push({pet:o,previousStage:a.growthStage,newStage:o.growthStage})}return n}function Rv(e,t){let n=[],r=new Map(e.all.map(o=>[o.id,o]));for(let o of t.all){let a=r.get(o.id);a&&o.currentStrength>a.currentStrength&&n.push({pet:o,previousStrength:a.currentStrength,newStrength:o.currentStrength})}return n}function Ov(e,t){let n=[],r=new Map(e.all.map(o=>[o.id,o]));for(let o of t.all){let a=r.get(o.id);a&&o.currentStrength===o.maxStrength&&a.currentStrength<a.maxStrength&&n.push({pet:o})}return n}function Gv(){let e=Ic,t=Ic,n=!1,r=[],o={all:new Set,stable:new Set,location:new Set,ability:new Set,count:new Set,expandedPet:new Set,growth:new Set,strengthGain:new Set,maxStrength:new Set},a={},i=Object.keys(Pc),s=new Set;function u(){if(s.size<i.length)return;let l=Ac(a);if(Te(e,l)||(t=e,e=l,!n))return;for(let b of o.all)b(e,t);if(!Av(t,e))for(let b of o.stable)b(e,t);let c=Iv(t,e);for(let b of c)for(let w of o.location)w(b);let p=Ev(t,e);for(let b of p)for(let w of o.ability)w(b);let m=Lv(t,e);if(m)for(let b of o.count)b(m);let g=Dv(t,e);for(let b of g)for(let w of o.growth)w(b);let f=Rv(t,e);for(let b of f)for(let w of o.strengthGain)w(b);let h=Ov(t,e);for(let b of h)for(let w of o.maxStrength)w(b);if(t.expandedPetSlotId!==e.expandedPetSlotId){let b={current:e.expandedPet,previous:t.expandedPet,currentId:e.expandedPetSlotId,previousId:t.expandedPetSlotId};for(let w of o.expandedPet)w(b)}}async function d(){if(n)return;let l=i.map(async c=>{let p=Pc[c],m=await X.subscribe(p,g=>{a[c]=g,s.add(c),u()});r.push(m)});await Promise.all(l),n=!0,s.size===i.length&&(e=Ac(a))}return d(),{get(){return e},subscribe(l,c){return o.all.add(l),c?.immediate!==!1&&n&&s.size===i.length&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,c){return o.stable.add(l),c?.immediate!==!1&&n&&s.size===i.length&&l(e,e),()=>o.stable.delete(l)},subscribeLocation(l,c){if(o.location.add(l),c?.immediate&&n&&s.size===i.length)for(let p of e.all)l({pet:p,from:p.location,to:p.location});return()=>o.location.delete(l)},subscribeAbility(l,c){if(o.ability.add(l),c?.immediate&&n&&s.size===i.length)for(let p of e.all)p.lastAbilityTrigger&&l({pet:p,trigger:p.lastAbilityTrigger});return()=>o.ability.delete(l)},subscribeCount(l,c){return o.count.add(l),c?.immediate&&n&&s.size===i.length&&l({added:e.all,removed:[],counts:e.counts}),()=>o.count.delete(l)},subscribeExpandedPet(l,c){return o.expandedPet.add(l),c?.immediate&&n&&s.size===i.length&&l({current:e.expandedPet,previous:e.expandedPet,currentId:e.expandedPetSlotId,previousId:e.expandedPetSlotId}),()=>o.expandedPet.delete(l)},subscribeGrowth(l,c){if(o.growth.add(l),c?.immediate&&n&&s.size===i.length)for(let p of e.all)l({pet:p,previousStage:p.growthStage,newStage:p.growthStage});return()=>o.growth.delete(l)},subscribeStrengthGain(l,c){if(o.strengthGain.add(l),c?.immediate&&n&&s.size===i.length)for(let p of e.all)l({pet:p,previousStrength:p.currentStrength,newStrength:p.currentStrength});return()=>o.strengthGain.delete(l)},subscribeMaxStrength(l,c){if(o.maxStrength.add(l),c?.immediate&&n&&s.size===i.length)for(let p of e.all)p.currentStrength===p.maxStrength&&l({pet:p});return()=>o.maxStrength.delete(l)},destroy(){for(let l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.location.clear(),o.ability.clear(),o.count.clear(),o.expandedPet.clear(),o.growth.clear(),o.strengthGain.clear(),o.maxStrength.clear(),n=!1}}}function Qa(){return Xa||(Xa=Gv()),Xa}var Pc,Ic,Xa,Za=O(()=>{"use strict";We();pt();ir();Pc={inventory:"myPetInventoryAtom",hutch:"myPetHutchPetItemsAtom",active:"myPetInfosAtom",slotInfos:"myPetSlotInfosAtom",expandedPetSlotId:"expandedPetSlotIdAtom"};Ic={all:[],byLocation:{inventory:[],hutch:[],active:[]},counts:{inventory:0,hutch:0,active:0,total:0},expandedPetSlotId:null,expandedPet:null};Xa=null});function Hv(){let e=null,t=[],n=new Set,r={},o=new Set,a=2;function i(c,p){return{x:p%c,y:Math.floor(p/c)}}function s(c,p,m){return m*c+p}function u(c,p){let{cols:m,rows:g}=c,f=m*g,h=new Set,b=new Set,w=new Map,x=[],y=c.userSlotIdxAndDirtTileIdxToGlobalTileIdx??[],k=c.userSlotIdxAndBoardwalkTileIdxToGlobalTileIdx??[],S=Math.max(y.length,k.length);for(let P=0;P<S;P++){let L=y[P]??[],D=k[P]??[],K=L.map((J,Q)=>(h.add(J),w.set(J,P),{globalIndex:J,localIndex:Q,position:i(m,J)})),ae=D.map((J,Q)=>(b.add(J),w.set(J,P),{globalIndex:J,localIndex:Q,position:i(m,J)}));x.push({userSlotIdx:P,dirtTiles:K,boardwalkTiles:ae,allTiles:[...K,...ae]})}let C=c.spawnTiles.map(P=>i(m,P)),I={};if(c.locations)for(let[P,L]of Object.entries(c.locations)){let D=L.spawnTileIdx??[];I[P]={name:P,spawnTiles:D,spawnPositions:D.map(K=>i(m,K))}}return{cols:m,rows:g,totalTiles:f,tileSize:p,spawnTiles:c.spawnTiles,spawnPositions:C,locations:I,userSlots:x,globalToXY(P){return i(m,P)},xyToGlobal(P,L){return s(m,P,L)},getTileOwner(P){return w.get(P)??null},isDirtTile(P){return h.has(P)},isBoardwalkTile(P){return b.has(P)}}}function d(){if(o.size<a||e)return;let c=r.map,p=r.tileSize??0;if(c){e=u(c,p);for(let m of n)m(e);n.clear()}}async function l(){let c=await X.subscribe("mapAtom",m=>{r.map=m,o.add("map"),d()});t.push(c);let p=await X.subscribe("tileSizeAtom",m=>{r.tileSize=m,o.add("tileSize"),d()});t.push(p)}return l(),{get(){return e},isReady(){return e!==null},onReady(c,p){return e?(p?.immediate!==!1&&c(e),()=>{}):(n.add(c),()=>n.delete(c))},destroy(){for(let c of t)c();t.length=0,e=null,n.clear()}}}function Yt(){return ei||(ei=Hv()),ei}var ei,sr=O(()=>{"use strict";We();ei=null});function Rc(e){let t=e.inventory,n=t?.items??[],r=t?.favoritedItemIds??[],o=e.selectedItemIndex,a=null;return o!==null&&o>=0&&o<n.length&&(a={index:o,item:n[o]}),{items:n,favoritedItemIds:r,count:n.length,isFull:e.isFull??!1,selectedItem:a}}function Oc(e){let t=e.items.map(n=>"id"in n?n.id:"species"in n&&n.itemType==="Seed"?`seed:${n.species}:${n.quantity}`:"toolId"in n?`tool:${n.toolId}:${n.quantity}`:"eggId"in n?`egg:${n.eggId}:${n.quantity}`:"decorId"in n?`decor:${n.decorId}:${n.quantity}`:JSON.stringify(n));return JSON.stringify({itemKeys:t,favoritedItemIds:e.favoritedItemIds,isFull:e.isFull,selectedItemIndex:e.selectedItem?.index??null})}function Nv(e,t){return Oc(e)===Oc(t)}function _v(e,t){return e===null&&t===null?!1:e===null||t===null?!0:e.index!==t.index}function lr(e){return"id"in e?e.id:"species"in e&&e.itemType==="Seed"?`seed:${e.species}`:"toolId"in e?`tool:${e.toolId}`:"eggId"in e?`egg:${e.eggId}`:"decorId"in e?`decor:${e.decorId}`:JSON.stringify(e)}function Wv(e,t){let n=new Set(e.map(lr)),r=new Set(t.map(lr)),o=t.filter(i=>!n.has(lr(i))),a=e.filter(i=>!r.has(lr(i)));return o.length===0&&a.length===0?null:{added:o,removed:a,counts:{before:e.length,after:t.length}}}function Fv(e,t){let n=new Set(e),r=new Set(t),o=t.filter(i=>!n.has(i)),a=e.filter(i=>!r.has(i));return o.length===0&&a.length===0?null:{added:o,removed:a,current:t}}function Bv(){let e=Dc,t=Dc,n=!1,r=[],o={all:new Set,stable:new Set,selection:new Set,items:new Set,favorites:new Set},a={},i=Object.keys(Lc),s=new Set;function u(){if(s.size<i.length)return;let l=Rc(a);if(Te(e,l)||(t=e,e=l,!n))return;for(let m of o.all)m(e,t);if(!Nv(t,e))for(let m of o.stable)m(e,t);if(_v(t.selectedItem,e.selectedItem)){let m={current:e.selectedItem,previous:t.selectedItem};for(let g of o.selection)g(m)}let c=Wv(t.items,e.items);if(c)for(let m of o.items)m(c);let p=Fv(t.favoritedItemIds,e.favoritedItemIds);if(p)for(let m of o.favorites)m(p)}async function d(){if(n)return;let l=i.map(async c=>{let p=Lc[c],m=await X.subscribe(p,g=>{a[c]=g,s.add(c),u()});r.push(m)});await Promise.all(l),n=!0,s.size===i.length&&(e=Rc(a))}return d(),{get(){return e},subscribe(l,c){return o.all.add(l),c?.immediate!==!1&&n&&s.size===i.length&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,c){return o.stable.add(l),c?.immediate!==!1&&n&&s.size===i.length&&l(e,e),()=>o.stable.delete(l)},subscribeSelection(l,c){return o.selection.add(l),c?.immediate&&n&&s.size===i.length&&l({current:e.selectedItem,previous:e.selectedItem}),()=>o.selection.delete(l)},subscribeItems(l,c){return o.items.add(l),c?.immediate&&n&&s.size===i.length&&l({added:e.items,removed:[],counts:{before:0,after:e.count}}),()=>o.items.delete(l)},subscribeFavorites(l,c){return o.favorites.add(l),c?.immediate&&n&&s.size===i.length&&l({added:e.favoritedItemIds,removed:[],current:e.favoritedItemIds}),()=>o.favorites.delete(l)},destroy(){for(let l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.selection.clear(),o.items.clear(),o.favorites.clear(),n=!1}}}function ni(){return ti||(ti=Bv()),ti}var Lc,Dc,ti,oi=O(()=>{"use strict";We();pt();Lc={inventory:"myInventoryAtom",isFull:"isMyInventoryAtMaxLengthAtom",selectedItemIndex:"myPossiblyNoLongerValidSelectedItemIndexAtom"},Dc={items:[],favoritedItemIds:[],count:0,isFull:!1,selectedItem:null};ti=null});function jv(e,t,n){let r=n.get(e.id),o=r?.slot,a=o?.data,i=o?.lastActionEvent;return{id:e.id,name:e.name,discordId:e.databaseUserId,discordAvatarUrl:e.discordAvatarUrl,guildId:e.guildId,isConnected:e.isConnected,isHost:e.id===t,slotIndex:r?.index??null,position:o?.position??null,cosmetic:{color:e.cosmetic?.color??"",avatar:e.cosmetic?.avatar?[...e.cosmetic.avatar]:[]},emote:{type:e.emoteData?.emoteType??-1},coins:a?.coinsCount??0,inventory:a?.inventory??null,shopPurchases:a?.shopPurchases??null,garden:a?.garden??null,pets:{slots:a?.petSlots??[],slotInfos:o?.petSlotInfos??null},journal:a?.journal??null,stats:a?.stats??null,tasksCompleted:a?.tasksCompleted??[],activityLogs:a?.activityLogs??[],customRestocks:{config:a?.customRestocks??null,inventories:o?.customRestockInventories??null},lastAction:i?{type:i.action,data:i.data,timestamp:i.timestamp}:null,selectedItemIndex:o?.notAuthoritative_selectedItemIndex??null,lastSlotMachineInfo:o?.lastSlotMachineInfo??null}}function Gc(e){let t=e.players,n=e.hostPlayerId??"",r=e.userSlots??[];if(!t||!Array.isArray(t)||t.length===0)return ai;let o=new Map;Array.isArray(r)&&r.forEach((s,u)=>{s?.type==="user"&&s?.playerId&&o.set(s.playerId,{slot:s,index:u})});let a=t.map(s=>jv(s,n,o)),i=a.find(s=>s.isHost)??null;return{all:a,host:i,count:a.length}}function Hc(e){let t=e.all.map(n=>`${n.id}:${n.isConnected}:${n.isHost}`);return JSON.stringify({playerKeys:t,hostId:e.host?.id??null,count:e.count})}function Uv(e,t){let n=[],r=new Set(e.map(a=>a.id)),o=new Set(t.map(a=>a.id));for(let a of t)r.has(a.id)||n.push({player:a,type:"join"});for(let a of e)o.has(a.id)||n.push({player:a,type:"leave"});return n}function zv(e,t){let n=[],r=new Map(e.map(o=>[o.id,o]));for(let o of t){let a=r.get(o.id);a&&a.isConnected!==o.isConnected&&n.push({player:o,isConnected:o.isConnected})}return n}function Vv(){let e=ai,t=ai,n=!1,r=[],o={all:new Set,stable:new Set,joinLeave:new Set,connection:new Set,host:new Set},a={},i=new Set,s=3;function u(){if(i.size<s)return;let l=Gc(a);if(Te(e,l)||(t=e,e=l,!n))return;for(let f of o.all)f(e,t);if(Hc(t)!==Hc(e))for(let f of o.stable)f(e,t);let c=Uv(t.all,e.all);for(let f of c)for(let h of o.joinLeave)h(f);let p=zv(t.all,e.all);for(let f of p)for(let h of o.connection)h(f);let m=t.host?.id??null,g=e.host?.id??null;if(m!==g){let f={current:e.host,previous:t.host};for(let h of o.host)h(f)}}async function d(){if(n)return;let l=await ia.onChangeNow(m=>{a.players=m,i.add("players"),u()});r.push(l);let c=await sa.onChangeNow(m=>{a.hostPlayerId=m,i.add("hostPlayerId"),u()});r.push(c);let p=await aa.onChangeNow(m=>{a.userSlots=m,i.add("userSlots"),u()});r.push(p),n=!0,i.size===s&&(e=Gc(a))}return d(),{get(){return e},subscribe(l,c){return o.all.add(l),c?.immediate!==!1&&n&&i.size===s&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,c){return o.stable.add(l),c?.immediate!==!1&&n&&i.size===s&&l(e,e),()=>o.stable.delete(l)},subscribeJoinLeave(l,c){if(o.joinLeave.add(l),c?.immediate&&n&&i.size===s)for(let p of e.all)l({player:p,type:"join"});return()=>o.joinLeave.delete(l)},subscribeConnection(l,c){if(o.connection.add(l),c?.immediate&&n&&i.size===s)for(let p of e.all)l({player:p,isConnected:p.isConnected});return()=>o.connection.delete(l)},subscribeHost(l,c){return o.host.add(l),c?.immediate&&n&&i.size===s&&l({current:e.host,previous:e.host}),()=>o.host.delete(l)},destroy(){for(let l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.joinLeave.clear(),o.connection.clear(),o.host.clear(),n=!1}}}function ii(){return ri||(ri=Vv()),ri}var ai,ri,si=O(()=>{"use strict";wt();pt();ai={all:[],host:null,count:0};ri=null});function $v(e,t){switch(t){case"seed":return e.species??e.itemType;case"tool":return e.toolId??e.itemType;case"egg":return e.eggId??e.itemType;case"decor":return e.decorId??e.itemType;default:return e.itemType}}function Kv(e,t,n){let r=$v(e,t),o=n[r]??0,a=Math.max(0,e.initialStock-o);return{id:r,itemType:e.itemType,initialStock:e.initialStock,purchased:o,remaining:a,isAvailable:a>0}}function Jv(e,t,n){if(!t)return{type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null};let o=n[e]?.purchases??{},a=(t.inventory??[]).map(d=>Kv(d,e,o)),i=a.filter(d=>d.isAvailable).length,s=t.secondsUntilRestock??0,u=s>0?Date.now()+s*1e3:null;return{type:e,items:a,availableCount:i,totalCount:a.length,secondsUntilRestock:s,restockAt:u}}function Nc(e){let t=e.shops,n=e.purchases??{},r=Fn.map(s=>Jv(s,t?.[s],n)),o={seed:r[0],tool:r[1],egg:r[2],decor:r[3]},a=r.filter(s=>s.restockAt!==null),i=null;if(a.length>0){let u=a.sort((d,l)=>(d.restockAt??0)-(l.restockAt??0))[0];i={shop:u.type,seconds:u.secondsUntilRestock,at:u.restockAt}}return{all:r,byType:o,nextRestock:i}}function Wc(e){return JSON.stringify({shops:e.all.map(t=>({type:t.type,itemCount:t.items.length,availableCount:t.availableCount}))})}function qv(e,t){let n=e.secondsUntilRestock,r=t.secondsUntilRestock;return n>0&&n<=5&&r>n||n>0&&r===0&&t.items.some(a=>a.purchased===0)?{shop:t,previousItems:e.items}:null}function Yv(e,t){let n=[];for(let r of Fn){let o=e.byType[r],a=t.byType[r],i=new Map(o.items.map(s=>[s.id,s]));for(let s of a.items){let u=i.get(s.id);u&&s.purchased>u.purchased&&n.push({shopType:r,itemId:s.id,quantity:s.purchased-u.purchased,newPurchased:s.purchased,remaining:s.remaining})}}return n}function Xv(e,t){let n=[];for(let r of Fn){let o=e.byType[r],a=t.byType[r],i=new Map(o.items.map(s=>[s.id,s]));for(let s of a.items){let u=i.get(s.id);u&&u.isAvailable!==s.isAvailable&&n.push({shopType:r,itemId:s.id,wasAvailable:u.isAvailable,isAvailable:s.isAvailable})}}return n}function Qv(){let e=_c,t=_c,n=!1,r=[],o={all:new Set,stable:new Set,seedRestock:new Set,toolRestock:new Set,eggRestock:new Set,decorRestock:new Set,purchase:new Set,availability:new Set},a={},i=new Set,s=2;function u(){if(i.size<s)return;let l=Nc(a);if(Te(e,l)||(t=e,e=l,!n))return;for(let g of o.all)g(e,t);if(Wc(t)!==Wc(e))for(let g of o.stable)g(e,t);let c={seed:o.seedRestock,tool:o.toolRestock,egg:o.eggRestock,decor:o.decorRestock};for(let g of Fn){let f=qv(t.byType[g],e.byType[g]);if(f)for(let h of c[g])h(f)}let p=Yv(t,e);for(let g of p)for(let f of o.purchase)f(g);let m=Xv(t,e);for(let g of m)for(let f of o.availability)f(g)}async function d(){if(n)return;let l=await ca.onChangeNow(p=>{a.shops=p,i.add("shops"),u()});r.push(l);let c=await ua.onChangeNow(p=>{a.purchases=p,i.add("purchases"),u()});r.push(c),n=!0,i.size===s&&(e=Nc(a))}return d(),{get(){return e},getShop(l){return e.byType[l]},getItem(l,c){return e.byType[l].items.find(m=>m.id===c)??null},subscribe(l,c){return o.all.add(l),c?.immediate!==!1&&n&&i.size===s&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,c){return o.stable.add(l),c?.immediate!==!1&&n&&i.size===s&&l(e,e),()=>o.stable.delete(l)},subscribeSeedRestock(l,c){return o.seedRestock.add(l),c?.immediate&&n&&i.size===s&&l({shop:e.byType.seed,previousItems:[]}),()=>o.seedRestock.delete(l)},subscribeToolRestock(l,c){return o.toolRestock.add(l),c?.immediate&&n&&i.size===s&&l({shop:e.byType.tool,previousItems:[]}),()=>o.toolRestock.delete(l)},subscribeEggRestock(l,c){return o.eggRestock.add(l),c?.immediate&&n&&i.size===s&&l({shop:e.byType.egg,previousItems:[]}),()=>o.eggRestock.delete(l)},subscribeDecorRestock(l,c){return o.decorRestock.add(l),c?.immediate&&n&&i.size===s&&l({shop:e.byType.decor,previousItems:[]}),()=>o.decorRestock.delete(l)},subscribePurchase(l,c){if(o.purchase.add(l),c?.immediate&&n&&i.size===s)for(let p of e.all)for(let m of p.items)m.purchased>0&&l({shopType:p.type,itemId:m.id,quantity:m.purchased,newPurchased:m.purchased,remaining:m.remaining});return()=>o.purchase.delete(l)},subscribeAvailability(l,c){if(o.availability.add(l),c?.immediate&&n&&i.size===s)for(let p of e.all)for(let m of p.items)l({shopType:p.type,itemId:m.id,wasAvailable:m.isAvailable,isAvailable:m.isAvailable});return()=>o.availability.delete(l)},destroy(){for(let l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.seedRestock.clear(),o.toolRestock.clear(),o.eggRestock.clear(),o.decorRestock.clear(),o.purchase.clear(),o.availability.clear(),n=!1}}}function ci(){return li||(li=Qv()),li}var Fn,_c,li,ui=O(()=>{"use strict";wt();pt();Fn=["seed","tool","egg","decor"];_c={all:Fn.map(e=>({type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null})),byType:{seed:{type:"seed",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},tool:{type:"tool",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},egg:{type:"egg",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},decor:{type:"decor",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null}},nextRestock:null};li=null});function ex(e){return Zv.includes(e)}function tx(e){if(!e)return pi;let t=Date.now(),n=e.endTime??0,r=Math.max(0,n-t),o=Math.floor(r/1e3),a=o>0,i=e.type??"Sunny";return{type:ex(i)?i:"Sunny",isActive:a,startTime:e.startTime??null,endTime:e.endTime??null,remainingSeconds:o}}function nx(){let e=pi,t=pi,n=!1,r=null,o={all:new Set,change:new Set};function a(s){let u=tx(s);if(e.type===u.type&&e.isActive===u.isActive&&e.startTime===u.startTime&&e.endTime===u.endTime){e=u;return}if(t=e,e=u,!!n){for(let d of o.all)d(e,t);if(t.type!==e.type||t.isActive!==e.isActive){let d={current:e,previous:t};for(let l of o.change)l(d)}}}async function i(){n||(r=await da.onChangeNow(s=>{a(s)}),n=!0)}return i(),{get(){return e},subscribe(s,u){return o.all.add(s),u?.immediate!==!1&&n&&s(e,e),()=>o.all.delete(s)},subscribeChange(s,u){return o.change.add(s),u?.immediate&&n&&s({current:e,previous:e}),()=>o.change.delete(s)},destroy(){r?.(),r=null,o.all.clear(),o.change.clear(),n=!1}}}function mi(){return di||(di=nx()),di}var Zv,pi,di,gi=O(()=>{"use strict";wt();Zv=["Sunny","Rain","Frost","Dawn","AmberMoon"];pi={type:"Sunny",isActive:!1,startTime:null,endTime:null,remainingSeconds:0};di=null});function ox(){let e=de.get("mutations");return e?Object.keys(e):[]}function Uc(){let e={};for(let t of ox())e[t]=[];return e}function bi(){return{garden:null,mySlotIndex:null,plants:{all:[],mature:[],growing:[],bySpecies:{},count:0},crops:{all:[],mature:[],growing:[],mutated:{all:[],byMutation:Uc()}},eggs:{all:[],mature:[],growing:[],byType:{},count:0},decors:{tileObjects:[],boardwalk:[],all:[],byType:{},count:0},tiles:{tileObjects:[],boardwalk:[],empty:{tileObjects:[],boardwalk:[]}},counts:{plants:0,maturePlants:0,crops:0,matureCrops:0,eggs:0,matureEggs:0,decors:0,emptyTileObjects:0,emptyBoardwalk:0}}}function rx(e,t,n,r){let o=t.slots.filter(a=>r>=a.endTime).length;return{tileIndex:e,position:n,species:t.species,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:r>=t.maturedAt,slots:t.slots,slotsCount:t.slots.length,matureSlotsCount:o}}function ax(e,t,n,r,o){return{tileIndex:e,position:t,slotIndex:n,species:r.species,startTime:r.startTime,endTime:r.endTime,targetScale:r.targetScale,mutations:[...r.mutations],isMature:o>=r.endTime}}function ix(e,t,n,r){return{tileIndex:e,position:n,eggId:t.eggId,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:r>=t.maturedAt}}function Fc(e,t,n,r){return{tileIndex:e,position:n,decorId:t.decorId,rotation:t.rotation,location:r}}function Bc(e,t){let{garden:n,mySlotIndex:r}=e,o=Date.now();if(!n||r===null)return bi();let a=t().get(),i=a?.userSlots[r],s=i?.dirtTiles??[],u=i?.boardwalkTiles??[],d=[],l=[],c=[],p={},m=[],g=[],f=[],h=[],b=Uc(),w=[],x=[],y=[],k={},S=[],C=[],I={},P=new Set,L=new Set;for(let[J,Q]of Object.entries(n.tileObjects)){let ue=parseInt(J,10);P.add(ue);let _=a?a.globalToXY(ue):{x:0,y:0};if(Q.objectType==="plant"){let N=Q,H=rx(J,N,_,o);d.push(H),H.isMature?l.push(H):c.push(H),p[H.species]||(p[H.species]=[]),p[H.species].push(H);for(let M=0;M<N.slots.length;M++){let R=N.slots[M],G=ax(J,_,M,R,o);if(m.push(G),G.isMature?g.push(G):f.push(G),G.mutations.length>0){h.push(G);for(let W of G.mutations)b[W]||(b[W]=[]),b[W].push(G)}}}else if(Q.objectType==="egg"){let H=ix(J,Q,_,o);w.push(H),k[H.eggId]||(k[H.eggId]=[]),k[H.eggId].push(H),H.isMature?x.push(H):y.push(H)}else if(Q.objectType==="decor"){let H=Fc(J,Q,_,"tileObjects");S.push(H),I[H.decorId]||(I[H.decorId]=[]),I[H.decorId].push(H)}}for(let[J,Q]of Object.entries(n.boardwalkTileObjects)){let ue=parseInt(J,10);L.add(ue);let _=a?a.globalToXY(ue):{x:0,y:0},H=Fc(J,Q,_,"boardwalk");C.push(H),I[H.decorId]||(I[H.decorId]=[]),I[H.decorId].push(H)}let D=[...S,...C],K=s.filter(J=>!P.has(J.localIndex)),ae=u.filter(J=>!L.has(J.localIndex));return{garden:n,mySlotIndex:r,plants:{all:d,mature:l,growing:c,bySpecies:p,count:d.length},crops:{all:m,mature:g,growing:f,mutated:{all:h,byMutation:b}},eggs:{all:w,mature:x,growing:y,byType:k,count:w.length},decors:{tileObjects:S,boardwalk:C,all:D,byType:I,count:D.length},tiles:{tileObjects:s,boardwalk:u,empty:{tileObjects:K,boardwalk:ae}},counts:{plants:d.length,maturePlants:l.length,crops:m.length,matureCrops:g.length,eggs:w.length,matureEggs:x.length,decors:D.length,emptyTileObjects:K.length,emptyBoardwalk:ae.length}}}function jc(e){return JSON.stringify({plants:e.counts.plants,maturePlants:e.counts.maturePlants,crops:e.counts.crops,matureCrops:e.counts.matureCrops,eggs:e.counts.eggs,matureEggs:e.counts.matureEggs,decors:e.counts.decors,emptyTileObjects:e.counts.emptyTileObjects,emptyBoardwalk:e.counts.emptyBoardwalk})}function sx(e,t){let n=new Set(e.map(i=>i.tileIndex)),r=new Set(t.map(i=>i.tileIndex)),o=t.filter(i=>!n.has(i.tileIndex)),a=e.filter(i=>!r.has(i.tileIndex));return{added:o,removed:a}}function lx(e,t,n){let r=new Set(e.map(a=>a.tileIndex)),o=new Set(n.map(a=>a.tileIndex));return t.filter(a=>!r.has(a.tileIndex)&&o.has(a.tileIndex))}function cx(e,t,n){let r=new Set(e.map(a=>`${a.tileIndex}:${a.slotIndex}`)),o=new Set(n.map(a=>`${a.tileIndex}:${a.slotIndex}`));return t.filter(a=>{let i=`${a.tileIndex}:${a.slotIndex}`;return!r.has(i)&&o.has(i)})}function ux(e,t,n){let r=new Set(e.map(a=>a.tileIndex)),o=new Set(n.map(a=>a.tileIndex));return t.filter(a=>!r.has(a.tileIndex)&&o.has(a.tileIndex))}function dx(e,t){let n=[],r=new Map(e.map(o=>[o.tileIndex,o]));for(let o of t){let a=r.get(o.tileIndex);if(!a)continue;let i=Math.min(a.slots.length,o.slots.length);for(let s=0;s<i;s++){let u=new Set(a.slots[s].mutations),d=new Set(o.slots[s].mutations),l=[...d].filter(p=>!u.has(p)),c=[...u].filter(p=>!d.has(p));if(l.length>0||c.length>0){let p=Date.now(),m=o.slots[s],g={tileIndex:o.tileIndex,position:o.position,slotIndex:s,species:m.species,startTime:m.startTime,endTime:m.endTime,targetScale:m.targetScale,mutations:[...m.mutations],isMature:p>=m.endTime};n.push({crop:g,added:l,removed:c})}}}return n}function px(e,t,n){let r=[],o=new Map(t.map(i=>[i.tileIndex,i])),a=new Map;for(let i of n)a.set(`${i.tileIndex}:${i.slotIndex}`,i);for(let i of e){let s=o.get(i.tileIndex);if(!s)continue;let u=Math.min(i.slots.length,s.slots.length);for(let d=0;d<u;d++){let l=i.slots[d],c=s.slots[d];if(l.startTime!==c.startTime){let p=a.get(`${i.tileIndex}:${d}`);if(!p||!p.isMature)continue;let m={tileIndex:i.tileIndex,position:i.position,slotIndex:d,species:l.species,startTime:l.startTime,endTime:l.endTime,targetScale:l.targetScale,mutations:[...l.mutations],isMature:!0};r.push({crop:m,remainingSlots:s.slotsCount})}}if(s.slotsCount<i.slotsCount)for(let d=s.slotsCount;d<i.slotsCount;d++){let l=a.get(`${i.tileIndex}:${d}`);if(!l||!l.isMature)continue;let c=i.slots[d];if(!c)continue;let p={tileIndex:i.tileIndex,position:i.position,slotIndex:d,species:c.species,startTime:c.startTime,endTime:c.endTime,targetScale:c.targetScale,mutations:[...c.mutations],isMature:!0};r.push({crop:p,remainingSlots:s.slotsCount})}}return r}function mx(e,t){let n=new Set(e.map(i=>i.tileIndex)),r=new Set(t.map(i=>i.tileIndex)),o=t.filter(i=>!n.has(i.tileIndex)),a=e.filter(i=>!r.has(i.tileIndex));return{added:o,removed:a}}function gx(e,t){let n=u=>`${u.tileIndex}:${u.location}`,r=u=>`${u.tileIndex}:${u.location}`,o=new Set(e.map(n)),a=new Set(t.map(r)),i=t.filter(u=>!o.has(r(u))),s=e.filter(u=>!a.has(n(u)));return{added:i,removed:s}}function fx(){let e=bi(),t=bi(),n=!1,r=[],o={all:new Set,stable:new Set,plantAdded:new Set,plantRemoved:new Set,plantMatured:new Set,cropMutated:new Set,cropMatured:new Set,cropHarvested:new Set,eggPlaced:new Set,eggRemoved:new Set,eggMatured:new Set,decorPlaced:new Set,decorRemoved:new Set},a={},i=new Set,s=2;function u(){if(i.size<s)return;let l=Bc(a,Yt);if(Te(e,l)||(t=e,e=l,!n))return;for(let x of o.all)x(e,t);if(jc(t)!==jc(e))for(let x of o.stable)x(e,t);let c=sx(t.plants.all,e.plants.all);for(let x of c.added)for(let y of o.plantAdded)y({plant:x});for(let x of c.removed)for(let y of o.plantRemoved)y({plant:x,tileIndex:x.tileIndex});let p=lx(t.plants.mature,e.plants.mature,e.plants.all);for(let x of p)for(let y of o.plantMatured)y({plant:x});let m=dx(t.plants.all,e.plants.all);for(let x of m)for(let y of o.cropMutated)y(x);let g=cx(t.crops.mature,e.crops.mature,e.crops.all);for(let x of g)for(let y of o.cropMatured)y({crop:x});let f=px(t.plants.all,e.plants.all,t.crops.all);for(let x of f)for(let y of o.cropHarvested)y(x);let h=mx(t.eggs.all,e.eggs.all);for(let x of h.added)for(let y of o.eggPlaced)y({egg:x});for(let x of h.removed)for(let y of o.eggRemoved)y({egg:x});let b=ux(t.eggs.mature,e.eggs.mature,e.eggs.all);for(let x of b)for(let y of o.eggMatured)y({egg:x});let w=gx(t.decors.all,e.decors.all);for(let x of w.added)for(let y of o.decorPlaced)y({decor:x});for(let x of w.removed)for(let y of o.decorRemoved)y({decor:x})}async function d(){if(n)return;let l=await la.onChangeNow(p=>{a.garden=p,i.add("garden"),u()});r.push(l);let c=await X.subscribe("myUserSlotIdxAtom",p=>{a.mySlotIndex=p,i.add("mySlotIndex"),u()});r.push(c),n=!0,i.size===s&&(e=Bc(a,Yt))}return d(),{get(){return e},subscribe(l,c){return o.all.add(l),c?.immediate!==!1&&n&&i.size===s&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,c){return o.stable.add(l),c?.immediate!==!1&&n&&i.size===s&&l(e,e),()=>o.stable.delete(l)},subscribePlantAdded(l,c){if(o.plantAdded.add(l),c?.immediate&&n&&i.size===s)for(let p of e.plants.all)l({plant:p});return()=>o.plantAdded.delete(l)},subscribePlantRemoved(l,c){return o.plantRemoved.add(l),()=>o.plantRemoved.delete(l)},subscribePlantMatured(l,c){if(o.plantMatured.add(l),c?.immediate&&n&&i.size===s)for(let p of e.plants.mature)l({plant:p});return()=>o.plantMatured.delete(l)},subscribeCropMutated(l,c){if(o.cropMutated.add(l),c?.immediate&&n&&i.size===s)for(let p of e.crops.mutated.all)l({crop:p,added:p.mutations,removed:[]});return()=>o.cropMutated.delete(l)},subscribeCropMatured(l,c){if(o.cropMatured.add(l),c?.immediate&&n&&i.size===s)for(let p of e.crops.mature)l({crop:p});return()=>o.cropMatured.delete(l)},subscribeCropHarvested(l,c){return o.cropHarvested.add(l),()=>o.cropHarvested.delete(l)},subscribeEggPlaced(l,c){if(o.eggPlaced.add(l),c?.immediate&&n&&i.size===s)for(let p of e.eggs.all)l({egg:p});return()=>o.eggPlaced.delete(l)},subscribeEggRemoved(l,c){return o.eggRemoved.add(l),()=>o.eggRemoved.delete(l)},subscribeEggMatured(l,c){if(o.eggMatured.add(l),c?.immediate&&n&&i.size===s)for(let p of e.eggs.mature)l({egg:p});return()=>o.eggMatured.delete(l)},subscribeDecorPlaced(l,c){if(o.decorPlaced.add(l),c?.immediate&&n&&i.size===s)for(let p of e.decors.all)l({decor:p});return()=>o.decorPlaced.delete(l)},subscribeDecorRemoved(l,c){return o.decorRemoved.add(l),()=>o.decorRemoved.delete(l)},destroy(){for(let l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.plantAdded.clear(),o.plantRemoved.clear(),o.plantMatured.clear(),o.cropMutated.clear(),o.cropMatured.clear(),o.cropHarvested.clear(),o.eggPlaced.clear(),o.eggRemoved.clear(),o.eggMatured.clear(),o.decorPlaced.clear(),o.decorRemoved.clear(),n=!1}}}function hi(){return fi||(fi=fx()),fi}var fi,yi=O(()=>{"use strict";wt();We();sr();pt();ut();fi=null});function cr(){return ke||(ke={currentTile:qa(),myPets:Qa(),gameMap:Yt(),myInventory:ni(),players:ii(),shops:ci(),weather:mi(),myGarden:hi()},ke)}function Je(){if(!ke)throw new Error("[Globals] Not initialized. Call initGlobals() first.");return ke}function zc(){ke&&(ke.currentTile.destroy(),ke.myPets.destroy(),ke.gameMap.destroy(),ke.myInventory.destroy(),ke.players.destroy(),ke.shops.destroy(),ke.weather.destroy(),ke.myGarden.destroy(),ke=null)}var ke,ur,dr=O(()=>{"use strict";Sc();pt();Ya();Za();sr();oi();si();ui();gi();yi();Ya();Za();sr();oi();si();ui();gi();yi();ke=null;ur={get currentTile(){return Je().currentTile},get myPets(){return Je().myPets},get gameMap(){return Je().gameMap},get myInventory(){return Je().myInventory},get players(){return Je().players},get shops(){return Je().shops},get weather(){return Je().weather},get myGarden(){return Je().myGarden}}});function Vc(){return Lt||(Lt=new Bn,Lt.init()),Lt}function $c(){Lt&&(Lt.destroy(),Lt=null)}var Bn,Lt,Kc=O(()=>{"use strict";dr();Bn=class{constructor(){ee(this,"logs",[]);ee(this,"maxLogs",1e3);ee(this,"unsubscribe",null);ee(this,"isInitialized",!1)}init(){this.isInitialized||(this.unsubscribe=ur.myPets.subscribeAbility(t=>{this.log({abilityId:t.trigger.abilityId||"unknown",petId:t.pet.id,petSpecies:t.pet.petSpecies,petName:t.pet.name,timestamp:t.trigger.performedAt||Date.now()})}),this.isInitialized=!0)}log(t){let n={...t,id:`${t.timestamp}-${Math.random().toString(36).substr(2,9)}`};this.logs.push(n),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs))}getLogs(t){let n=this.logs;t?.abilityId&&(n=n.filter(o=>o.abilityId===t.abilityId)),t?.petId&&(n=n.filter(o=>o.petId===t.petId)),t?.petSpecies&&(n=n.filter(o=>o.petSpecies===t.petSpecies));let{since:r}=t??{};return r!==void 0&&(n=n.filter(o=>o.timestamp>=r)),t?.limit&&(n=n.slice(-t.limit)),n}getStats(t=36e5){let n=Date.now()-t,r=this.logs.filter(a=>a.timestamp>=n),o=new Map;for(let a of r){o.has(a.abilityId)||o.set(a.abilityId,{abilityId:a.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});let i=o.get(a.abilityId);i.count++,(!i.lastProc||a.timestamp>i.lastProc)&&(i.lastProc=a.timestamp)}for(let a of o.values())a.procsPerMinute=a.count/t*6e4,a.procsPerHour=a.count/t*36e5;return o}getAbilityStats(t,n=36e5){return this.getStats(n).get(t)||null}getPetStats(t,n=36e5){let r=Date.now()-n,o=this.logs.filter(i=>i.petId===t&&i.timestamp>=r),a=new Map;for(let i of o){a.has(i.abilityId)||a.set(i.abilityId,{abilityId:i.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});let s=a.get(i.abilityId);s.count++,(!s.lastProc||i.timestamp>s.lastProc)&&(s.lastProc=i.timestamp)}for(let i of a.values())i.procsPerMinute=i.count/n*6e4,i.procsPerHour=i.count/n*36e5;return{totalProcs:o.length,abilities:a}}getTopAbilities(t=10,n=36e5){return Array.from(this.getStats(n).values()).sort((o,a)=>a.count-o.count).slice(0,t)}clear(){this.logs=[]}setMaxLogs(t){this.maxLogs=t,this.logs.length>t&&(this.logs=this.logs.slice(-t))}getLogCount(){return this.logs.length}isActive(){return this.isInitialized}destroy(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null),this.logs=[],this.isInitialized=!1}},Lt=null});function Jc(){return Xt||(Xt=new jn),Xt}function qc(){Xt&&(Xt.endSession(),Xt=null)}var jn,Xt,Yc=O(()=>{"use strict";jn=class{constructor(){ee(this,"stats");ee(this,"storageKey","gemini_stats");this.stats=this.loadStats(),this.startSession()}loadStats(){try{let t=localStorage.getItem(this.storageKey);if(t)return JSON.parse(t)}catch(t){console.warn("[StatsTracker] Failed to load stats:",t)}return this.getDefaultStats()}saveStats(){try{localStorage.setItem(this.storageKey,JSON.stringify(this.stats))}catch(t){console.warn("[StatsTracker] Failed to save stats:",t)}}getDefaultStats(){return{session:{sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},allTime:{totalSessions:0,totalPlayTime:0,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0,crops:{},pets:{}}}}startSession(){this.stats.session={sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},this.stats.allTime.totalSessions++,this.saveStats()}endSession(){this.stats.session.sessionEnd=Date.now();let t=this.stats.session.sessionEnd-this.stats.session.sessionStart;this.stats.allTime.totalPlayTime+=t,this.saveStats()}recordHarvest(t,n=1,r=[]){this.stats.session.cropsHarvested+=n,this.stats.allTime.cropsHarvested+=n,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].harvested+=n;for(let o of r)this.stats.allTime.crops[t].mutations[o]||(this.stats.allTime.crops[t].mutations[o]=0),this.stats.allTime.crops[t].mutations[o]++;this.saveStats()}recordCropSale(t,n=1,r=0){this.stats.session.cropsSold+=n,this.stats.session.coinsEarned+=r,this.stats.allTime.cropsSold+=n,this.stats.allTime.coinsEarned+=r,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].sold+=n,this.stats.allTime.crops[t].totalValue+=r,this.saveStats()}recordPetHatch(t,n=[],r=[]){this.stats.session.petsHatched++,this.stats.allTime.petsHatched++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].hatched++;for(let o of n)this.stats.allTime.pets[t].mutations[o]||(this.stats.allTime.pets[t].mutations[o]=0),this.stats.allTime.pets[t].mutations[o]++;for(let o of r)this.stats.allTime.pets[t].abilities[o]||(this.stats.allTime.pets[t].abilities[o]=0),this.stats.allTime.pets[t].abilities[o]++;this.saveStats()}recordPetSale(t,n=0){this.stats.session.petsSold++,this.stats.session.coinsEarned+=n,this.stats.allTime.petsSold++,this.stats.allTime.coinsEarned+=n,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].sold++,this.saveStats()}recordPetFeed(t){this.stats.session.petsFed++,this.stats.allTime.petsFed++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].fed++,this.saveStats()}recordSeedPurchase(t,n=1,r=0){this.stats.session.seedsPurchased+=n,this.stats.session.coinsSpent+=r,this.stats.allTime.seedsPurchased+=n,this.stats.allTime.coinsSpent+=r,this.saveStats()}recordEggPurchase(t,n=1,r=0){this.stats.session.eggsPurchased+=n,this.stats.session.coinsSpent+=r,this.stats.allTime.eggsPurchased+=n,this.stats.allTime.coinsSpent+=r,this.saveStats()}recordAbilityProc(t){this.stats.session.abilityProcs++,this.stats.allTime.abilityProcs++,this.saveStats()}recordCoinsEarned(t){this.stats.session.coinsEarned+=t,this.stats.allTime.coinsEarned+=t,this.saveStats()}recordCoinsSpent(t){this.stats.session.coinsSpent+=t,this.stats.allTime.coinsSpent+=t,this.saveStats()}getStats(){return{...this.stats}}getSessionStats(){return{...this.stats.session}}getAllTimeStats(){return{...this.stats.allTime}}getCropStats(t){return this.stats.allTime.crops[t]||null}getPetStats(t){return this.stats.allTime.pets[t]||null}getTopCrops(t=10){return Object.entries(this.stats.allTime.crops).map(([n,r])=>({species:n,stats:r})).sort((n,r)=>r.stats.harvested-n.stats.harvested).slice(0,t)}getTopPets(t=10){return Object.entries(this.stats.allTime.pets).map(([n,r])=>({species:n,stats:r})).sort((n,r)=>r.stats.hatched-n.stats.hatched).slice(0,t)}resetSession(){this.startSession()}resetAll(){this.stats=this.getDefaultStats(),this.saveStats()}exportStats(){return JSON.stringify(this.stats,null,2)}importStats(t){try{let n=JSON.parse(t);return this.stats=n,this.saveStats(),!0}catch(n){return console.warn("[StatsTracker] Failed to import stats:",n),!1}}},Xt=null});async function Zc(e){let t=[{name:"Data",init:()=>de.init()},{name:"AntiAfk",init:()=>vn.init()},{name:"CustomModal",init:()=>In.init()},{name:"Sprites",init:()=>se.init()},{name:"TileObjectSystem",init:()=>Ke.init()},{name:"Pixi",init:()=>Ln.init()},{name:"Audio",init:()=>Hn.init()},{name:"Cosmetics",init:()=>Nn.init()}];await Promise.all(t.map(async n=>{e?.({status:"start",name:n.name});try{await n.init(),e?.({status:"success",name:n.name})}catch(r){console.error(`[${n.name}] failed`,r),e?.({status:"error",name:n.name,error:r})}})),console.log("[Gemini] Modules ready. Access via Gemini.Modules in console.")}var Xc,Qc,Un=O(()=>{"use strict";Dr();Wt();hn();ut();qr();Gt();va();pn();zt();Ko();Da();Ra();_a();dc();ir();xc();Kc();Yc();ut();qr();va();zt();Ko();Da();Ra();_a();Xc={AbilityLogger:Bn,getAbilityLogger:Vc,destroyAbilityLogger:$c,...Ka},Qc={StatsTracker:jn,getStatsTracker:Jc,destroyStatsTracker:qc}});function Ue(e,t){try{let n=e.startsWith(Qt)?e:Qt+e,r=localStorage.getItem(n);return r===null?t:JSON.parse(r)}catch(n){return console.error(`[Storage] Error reading key "${e}":`,n),t}}function nt(e,t){try{let n=e.startsWith(Qt)?e:Qt+e,r=e.startsWith(Qt)?e.slice(Qt.length):e;localStorage.setItem(n,JSON.stringify(t)),window.dispatchEvent(new CustomEvent("gemini:storage:change",{detail:{key:r,value:t}}))}catch(n){console.error(`[Storage] Error writing key "${e}":`,n)}}var Qt,zn=O(()=>{"use strict";Qt="gemini:"});function vi(e){return!!e&&e.readyState===nu}function bx(){if(vi(Ie.latestOpen))return Ie.latestOpen;for(let e=Ie.captured.length-1;e>=0;e--){let t=Ie.captured[e];if(vi(t))return t}return null}function hx(e,t){Ie.captured.push(e),Ie.captured.length>25&&Ie.captured.splice(0,Ie.captured.length-25);let n=()=>{Ie.latestOpen=e,t&&console.log("[WS] captured socket opened",e.url)};e.addEventListener("open",n),e.addEventListener("close",()=>{Ie.latestOpen===e&&(Ie.latestOpen=null),t&&console.log("[WS] captured socket closed",e.url)}),e.readyState===nu&&n()}function ou(e=A,t={}){let n=!!t.debug,r=e?.WebSocket;if(typeof r!="function")return()=>{};if(r[eu])return Ie.nativeCtor=r[tu]??Ie.nativeCtor??null,()=>{};let o=r;Ie.nativeCtor=o;function a(i,s){let u=s!==void 0?new o(i,s):new o(i);try{hx(u,n)}catch{}return u}try{a.prototype=o.prototype}catch{}try{Object.setPrototypeOf(a,o)}catch{}try{a.CONNECTING=o.CONNECTING,a.OPEN=o.OPEN,a.CLOSING=o.CLOSING,a.CLOSED=o.CLOSED}catch{}a[eu]=!0,a[tu]=o;try{e.WebSocket=a,n&&console.log("[WS] WebSocket capture installed")}catch{return()=>{}}return()=>{try{e.WebSocket===a&&(e.WebSocket=o)}catch{}}}function yx(e=A){let t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function Vn(e=A){let t=bx();if(t)return{ws:t,source:"captured"};let n=yx(e);return n?{ws:n,source:"roomConnection"}:{ws:null,source:null}}function pr(e,t={}){let n=t.pageWindow??A,r=t.intervalMs??500,o=!!t.debug,a=null,i=null,s=()=>{let d=Vn(n);(d.ws!==a||d.source!==i)&&(a=d.ws,i=d.source,o&&console.log("[WS] best socket changed:",d.source,d.ws),e(d))};s();let u=setInterval(s,r);return()=>clearInterval(u)}function vx(e){if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return null}}function xx(e,t=A){let n=t?.MagicCircle_RoomConnection;if(n&&typeof n.sendMessage=="function")try{return Array.isArray(e)?n.sendMessage(...e):n.sendMessage(e),{ok:!0}}catch(a){return{ok:!1,reason:"error",error:a}}let{ws:r}=Vn(t);if(!r)return{ok:!1,reason:"no-ws"};if(!vi(r))return{ok:!1,reason:"not-open"};let o=vx(e);if(o==null)return{ok:!1,reason:"error",error:new Error("Cannot stringify message")};try{return r.send(o),{ok:!0}}catch(a){return{ok:!1,reason:"error",error:a}}}function ru(e,t={},n=A){return xx({type:e,...t},n)}var Ie,eu,tu,nu,mr=O(()=>{"use strict";ye();Ie={nativeCtor:null,captured:[],latestOpen:null},eu=Symbol.for("ariesmod.ws.capture.wrapped"),tu=Symbol.for("ariesmod.ws.capture.native"),nu=1});var qe,E,C0,P0,ot=O(()=>{"use strict";qe={Welcome:"Welcome",PartialState:"PartialState",ServerErrorMessage:"ServerErrorMessage",Config:"Config",InappropriateContentRejected:"InappropriateContentRejected",Emote:"Emote",CurrencyTransaction:"CurrencyTransaction",Pong:"Pong"},E={Chat:"Chat",Emote:"Emote",Wish:"Wish",KickPlayer:"KickPlayer",SetPlayerData:"SetPlayerData",UsurpHost:"UsurpHost",Dev:"Dev",SetSelectedGame:"SetSelectedGame",VoteForGame:"VoteForGame",RequestGame:"RequestGame",RestartGame:"RestartGame",Ping:"Ping",PlayerPosition:"PlayerPosition",Teleport:"Teleport",CheckWeatherStatus:"CheckWeatherStatus",MoveInventoryItem:"MoveInventoryItem",DropObject:"DropObject",PickupObject:"PickupObject",ToggleFavoriteItem:"ToggleFavoriteItem",PutItemInStorage:"PutItemInStorage",RetrieveItemFromStorage:"RetrieveItemFromStorage",MoveStorageItem:"MoveStorageItem",LogItems:"LogItems",PlantSeed:"PlantSeed",WaterPlant:"WaterPlant",HarvestCrop:"HarvestCrop",SellAllCrops:"SellAllCrops",PurchaseSeed:"PurchaseSeed",PurchaseEgg:"PurchaseEgg",PurchaseTool:"PurchaseTool",PurchaseDecor:"PurchaseDecor",PlantEgg:"PlantEgg",HatchEgg:"HatchEgg",PlantGardenPlant:"PlantGardenPlant",PotPlant:"PotPlant",MutationPotion:"MutationPotion",PickupDecor:"PickupDecor",PlaceDecor:"PlaceDecor",RemoveGardenObject:"RemoveGardenObject",PlacePet:"PlacePet",FeedPet:"FeedPet",PetPositions:"PetPositions",SwapPet:"SwapPet",StorePet:"StorePet",NamePet:"NamePet",SellPet:"SellPet",ReportSpeakingStart:"ReportSpeakingStart"},C0=new Set(Object.values(qe)),P0=new Set(Object.values(E))});function $(e,t={},n=A){return ru(e,t,n)}function au(e,t=A){return $(E.Chat,{scopePath:["Room"],message:e},t)}function iu(e,t=A){return $(E.Emote,{scopePath:["Room"],emoteType:e},t)}function su(e,t=A){return $(E.Wish,{wish:e},t)}function lu(e,t=A){return $(E.KickPlayer,{scopePath:["Room"],playerId:e},t)}function cu(e,t=A){return $(E.SetPlayerData,{scopePath:["Room"],data:e},t)}function uu(e=A){return $(E.UsurpHost,{},e)}function du(e=A){return $(E.ReportSpeakingStart,{},e)}function pu(e,t=A){return $(E.SetSelectedGame,{scopePath:["Room"],gameId:e},t)}function mu(e,t=A){return $(E.VoteForGame,{scopePath:["Room"],gameId:e},t)}function gu(e,t=A){return $(E.RequestGame,{scopePath:["Room"],gameId:e},t)}function fu(e=A){return $(E.RestartGame,{scopePath:["Room"]},e)}function bu(e,t=A){return $(E.Ping,{id:e},t)}function xi(e,t,n=A){return $(E.PlayerPosition,{x:e,y:t},n)}function yu(e,t,n=A){return $(E.Teleport,{x:e,y:t},n)}function vu(e=A){return $(E.CheckWeatherStatus,{},e)}function xu(e,t,n=A){return $(E.MoveInventoryItem,{fromIndex:e,toIndex:t},n)}function Su(e,t=A){return $(E.DropObject,{slotIndex:e},t)}function wu(e,t=A){return $(E.PickupObject,{objectId:e},t)}function Tu(e,t,n=A){return $(E.ToggleFavoriteItem,{itemId:e,favorite:t},n)}function ku(e,t=A){return $(E.PutItemInStorage,{itemId:e},t)}function Cu(e,t=A){return $(E.RetrieveItemFromStorage,{itemId:e},t)}function Pu(e,t,n=A){return $(E.MoveStorageItem,{fromIndex:e,toIndex:t},n)}function Mu(e=A){return $(E.LogItems,{},e)}function Au(e,t,n,r=A){return $(E.PlantSeed,{seedId:e,x:t,y:n},r)}function Iu(e,t=A){return $(E.WaterPlant,{plantId:e},t)}function Eu(e,t=A){return $(E.HarvestCrop,{cropId:e},t)}function Lu(e=A){return $(E.SellAllCrops,{},e)}function Du(e,t=A){return $(E.PurchaseDecor,{decorId:e},t)}function Ru(e,t=A){return $(E.PurchaseEgg,{eggId:e},t)}function Ou(e,t=A){return $(E.PurchaseTool,{toolId:e},t)}function Gu(e,t=A){return $(E.PurchaseSeed,{seedId:e},t)}function Hu(e,t,n,r=A){return $(E.PlantEgg,{eggId:e,x:t,y:n},r)}function Nu(e,t=A){return $(E.HatchEgg,{eggId:e},t)}function _u(e,t,n,r=A){return $(E.PlantGardenPlant,{plantId:e,x:t,y:n},r)}function Wu(e,t,n=A){return $(E.PotPlant,{plantId:e,potId:t},n)}function Fu(e,t,n=A){return $(E.MutationPotion,{potionId:e,targetId:t},n)}function Bu(e,t=A){return $(E.PickupDecor,{decorInstanceId:e},t)}function ju(e,t,n,r=A){return $(E.PlaceDecor,{decorId:e,x:t,y:n},r)}function Uu(e,t=A){return $(E.RemoveGardenObject,{objectId:e},t)}function zu(e,t,n,r=A){return $(E.PlacePet,{petId:e,x:t,y:n},r)}function Vu(e,t,n=A){return $(E.FeedPet,{petId:e,foodItemId:t},n)}function $u(e,t=A){return $(E.PetPositions,{positions:e},t)}function Ku(e,t,n=A){return $(E.SwapPet,{petIdA:e,petIdB:t},n)}function Ju(e,t=A){return $(E.StorePet,{petId:e},t)}function qu(e,t,n=A){return $(E.NamePet,{petId:e,name:t},n)}function Yu(e,t=A){return $(E.SellPet,{petId:e},t)}var hu,Xu=O(()=>{"use strict";mr();ot();ye();hu=xi});function Qu(){A.Gemini=Zt}var Zt,gr=O(()=>{"use strict";ye();We();dr();Xu();Un();Zt={Store:{select:X.select.bind(X),set:X.set.bind(X),subscribe:X.subscribe.bind(X),subscribeImmediate:X.subscribeImmediate.bind(X)},Globals:ur,Modules:{Version:fn,Assets:Fe,Manifest:Re,Data:de,AntiAfk:vn,Environment:Le,CustomModal:In,Sprite:se,Tile:Ke,Pixi:Ln,Audio:Hn,Cosmetic:Nn,Achievements:er,Calculators:ar,Pets:Xc,Tracker:Qc},WebSocket:{chat:au,emote:iu,wish:su,kickPlayer:lu,setPlayerData:cu,usurpHost:uu,reportSpeakingStart:du,setSelectedGame:pu,voteForGame:mu,requestGame:gu,restartGame:fu,ping:bu,checkWeatherStatus:vu,move:hu,playerPosition:xi,teleport:yu,moveInventoryItem:xu,dropObject:Su,pickupObject:wu,toggleFavoriteItem:Tu,putItemInStorage:ku,retrieveItemFromStorage:Cu,moveStorageItem:Pu,logItems:Mu,plantSeed:Au,waterPlant:Iu,harvestCrop:Eu,sellAllCrops:Lu,purchaseDecor:Du,purchaseEgg:Ru,purchaseTool:Ou,purchaseSeed:Gu,plantEgg:Hu,hatchEgg:Nu,plantGardenPlant:_u,potPlant:Wu,mutationPotion:Fu,pickupDecor:Bu,placeDecor:ju,removeGardenObject:Uu,placePet:zu,feedPet:Vu,petPositions:$u,swapPet:Ku,storePet:Ju,namePet:qu,sellPet:Yu},_internal:{getGlobals:Je,initGlobals:cr,destroyGlobals:zc}}});var td={};Ot(td,{getGameMutations:()=>Ax,setEnabled:()=>Mx,start:()=>Zu,stop:()=>ed,updateSimpleConfig:()=>Px});function Zu(){let e=Ue("gemini:features:autoFavorite",wi);if(!e.enabled){console.log("[AutoFavorite] Disabled");return}$n.clear(),fr=Zt.Globals.myInventory.subscribeItems(t=>{if(t.added.length>0)for(let n of t.added)wx(n,e)}),console.log(`\u2705 [AutoFavorite] Started - Watching ${e.simple.favoriteSpecies.length} species, ${e.simple.favoriteMutations.length} mutations`)}function ed(){fr&&(fr(),fr=null),$n.clear(),console.log("\u{1F6D1} [AutoFavorite] Stopped")}function wx(e,t){if(e.itemType!=="Produce"&&e.itemType!=="Pet")return;let n=e.id;if(!n){console.warn("[AutoFavorite] Item has no ID:",e);return}if($n.has(n))return;if(e.isFavorited||e.favorited||!1){console.log(`[AutoFavorite] Already favorited: ${e.species||n}`);return}if(Tx(e,t.simple)){$n.add(n);try{let a=Zt.WebSocket.toggleFavoriteItem(n,!0);console.log(`[AutoFavorite] \u2B50 Favorited ${e.itemType}: ${e.species||n}`,{itemId:n,webSocketResult:a})}catch(a){console.error("[AutoFavorite] WebSocket error:",a),$n.delete(n)}}}function Tx(e,t){if(!t.enabled)return!1;let n=e.species||e.itemType||"",r=kx(n);return!!(t.favoriteSpecies.includes(r)||t.favoriteMutations.length>0&&Cx(n).some(a=>t.favoriteMutations.includes(a)))}function kx(e){let t=e;for(let n of Si)t=t.replace(n,"").trim();return t}function Cx(e){let t=[];for(let n of Si)e.includes(n)&&t.push(n);return t}function Px(e){let t=Ue("gemini:features:autoFavorite",wi);t.mode="simple",t.simple={...t.simple,...e},nt("gemini:features:autoFavorite",t)}function Mx(e){let t=Ue("gemini:features:autoFavorite",wi);t.enabled=e,t.simple.enabled=e,nt("gemini:features:autoFavorite",t),e?Zu():ed()}function Ax(){return Si}var Si,wi,fr,$n,nd=O(()=>{"use strict";gr();zn();Si=["Gold","Rainbow","Wet","Chilled","Frozen","Dawnlit","Ambershine","Dawncharged","Ambercharged"],wi={enabled:!1,mode:"simple",simple:{enabled:!1,favoriteSpecies:[],favoriteMutations:[]}},fr=null,$n=new Set});var ud={};Ot(ud,{aggregateJournalProgress:()=>Ti,refresh:()=>Ex,setEnabled:()=>Ix,start:()=>ld,stop:()=>cd});async function Ti(){await de.waitForAnyData();let e=de.get("plants")||{},t=de.get("pets")||{},n=de.get("decor")||{},o=Zt.Globals.players.get()?.host?.journal||{pets:{},produce:{}},a=Object.keys(o.pets||{}),i=Object.keys(o.produce||{}),s=Object.keys(e),u=Object.keys(t),d=Object.keys(n);return{plants:{total:s.length,logged:i.length,percentage:s.length>0?i.length/s.length*100:0,missing:s.filter(l=>!i.includes(l))},pets:{total:u.length,logged:a.length,percentage:u.length>0?a.length/u.length*100:0,missing:u.filter(l=>!a.includes(l))},decor:{total:d.length,logged:0,percentage:0,missing:d}}}function ld(){let e=Ue("gemini:features:journalChecker",sd);e.enabled&&(e.autoRefresh&&!Kn&&(Kn=setInterval(async()=>{let t=await Ti();window.dispatchEvent(new CustomEvent("gemini:journal-updated",{detail:t}))},e.refreshIntervalMs)),console.log("\u2705 [JournalChecker] Started"))}function cd(){Kn&&(clearInterval(Kn),Kn=null)}function Ix(e){let t=Ue("gemini:features:journalChecker",sd);t.enabled=e,nt("gemini:features:journalChecker",t),e?ld():cd()}async function Ex(){let e=await Ti();return window.dispatchEvent(new CustomEvent("gemini:journal-updated",{detail:e})),e}var sd,Kn,dd=O(()=>{"use strict";gr();Un();zn();sd={enabled:!1,autoRefresh:!0,refreshIntervalMs:3e4},Kn=null});function v(e,t=null,...n){let r=document.createElement(e);for(let[o,a]of Object.entries(t||{}))a!=null&&(o==="style"?typeof a=="string"?r.setAttribute("style",a):typeof a=="object"&&Object.assign(r.style,a):o.startsWith("on")&&typeof a=="function"?r[o.toLowerCase()]=a:o in r?r[o]=a:r.setAttribute(o,String(a)));for(let o of n)o==null||o===!1||r.appendChild(typeof o=="string"||typeof o=="number"?document.createTextNode(String(o)):o);return r}var Zn="https://i.imgur.com/k5WuC32.png",Ji="gemini-loader-style",mt="gemini-loader",qi=80;function Kd(){if(document.getElementById(Ji))return;let e=document.createElement("style");e.id=Ji,e.textContent=`
    /* ===== Loader Variables ===== */
    #${mt} {
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
    #${mt} {
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

    #${mt}.gemini-loader--error .gemini-loader__actions {
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
    #${mt}.gemini-loader--closing {
      animation: gemini-loader-fade-out 0.4s ease forwards;
      pointer-events: none;
    }

    #${mt}.gemini-loader--error .gemini-loader__spinner {
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
      #${mt} { padding: 16px 10px; }
      .gemini-loader__card { padding: 16px; }
      .gemini-loader__header { gap: 12px; }
      .gemini-loader__spinner { width: 42px; height: 42px; }
      .gemini-loader__spinner-icon { width: 56px; height: 56px; }
      .gemini-loader__title { font-size: 16px; }
    }
  `,document.head.appendChild(e)}function eo(e,t,n){let r=v("div",{className:`gemini-loader__log ${n}`},v("div",{className:"gemini-loader__dot"}),v("div",{textContent:t}));for(e.appendChild(r);e.childElementCount>qi;)e.firstElementChild?.remove();e.scrollTop=e.scrollHeight}function Jd(){return new Promise(e=>{if(typeof GM_xmlhttpRequest>"u"){e(Zn);return}GM_xmlhttpRequest({method:"GET",url:Zn,responseType:"blob",onload:t=>{let n=t.response,r=new FileReader;r.onloadend=()=>e(r.result),r.onerror=()=>e(Zn),r.readAsDataURL(n)},onerror:()=>e(Zn)})})}function wr(e={}){let t=Number.isFinite(e.blurPx)?Math.max(4,Number(e.blurPx)):14;Kd();let n=v("div",{className:"gemini-loader__subtitle",textContent:e.subtitle??"Initializing the mod..."}),r=v("div",{className:"gemini-loader__logs"}),o=v("img",{className:"gemini-loader__spinner-icon",alt:"Gemini"}),a=v("div",{className:"gemini-loader__spinner"},o);Jd().then(h=>{o.src=h});let i=v("div",{className:"gemini-loader__card"},v("div",{className:"gemini-loader__header"},a,v("div",{className:"gemini-loader__titles"},v("div",{className:"gemini-loader__title",textContent:e.title??"Gemini is loading"}),n)),r),s=v("div",{id:mt},i);(document.body||document.documentElement).appendChild(s);let u=v("div",{className:"gemini-loader__actions"},v("button",{className:"gemini-loader__button",textContent:"Close loader",onclick:()=>s.remove()}));i.appendChild(u),s.style.setProperty("--loader-blur",`${t}px`);let d=h=>{n.textContent=h},l=new Map,c=(h,b)=>{h.className=`gemini-loader__log ${b}`};return{log:(h,b="info")=>eo(r,h,b),logStep:(h,b,w="info")=>{let x=String(h||"").trim();if(!x){eo(r,b,w);return}let y=l.get(x);if(y){y.el.lastElementChild&&(y.el.lastElementChild.textContent=b),y.tone!==w&&(c(y.el,w),y.tone=w);return}let k=v("div",{className:`gemini-loader__log ${w}`},v("div",{className:"gemini-loader__dot"}),v("div",{textContent:b}));for(l.set(x,{el:k,tone:w}),r.appendChild(k);r.childElementCount>qi;){let S=r.firstElementChild;if(!S)break;let C=Array.from(l.entries()).find(([,I])=>I.el===S)?.[0];C&&l.delete(C),S.remove()}r.scrollTop=r.scrollHeight},setSubtitle:d,succeed:(h,b=600)=>{h&&eo(r,h,"success"),s.classList.add("gemini-loader--closing"),setTimeout(()=>s.remove(),b)},fail:(h,b)=>{eo(r,h,"error"),d("Something went wrong. Check the console for details."),s.classList.add("gemini-loader--error"),console.error("[Gemini loader]",h,b)}}}function Yi(e,t,n){let r=v("div",{className:"lg-pill",id:"pill"}),o=e.map(l=>{let c=v("button",{className:"lg-tab"},l.label);return c.setAttribute("data-target",l.id),c}),a=v("div",{className:"lg-tabs",id:"lg-tabs-row"},r,...o),i=a;a.addEventListener("wheel",l=>{Math.abs(l.deltaY)>Math.abs(l.deltaX)&&(l.preventDefault(),a.scrollLeft+=l.deltaY)},{passive:!1});function s(l){let c=a.getBoundingClientRect(),p=o.find(k=>k.dataset.target===l)||o[0];if(!p)return;let m=p.getBoundingClientRect(),g=m.left-c.left,f=m.width;r.style.width=`${f}px`,r.style.transform=`translateX(${g}px)`;let h=a.scrollLeft,b=h,w=h+a.clientWidth,x=g-12,y=g+f+12;x<b?a.scrollTo({left:x,behavior:"smooth"}):y>w&&a.scrollTo({left:y-a.clientWidth,behavior:"smooth"})}let u=t||(e[0]?.id??"");function d(l){u=l,o.forEach(c=>c.classList.toggle("active",c.dataset.target===l)),s(l),n(l)}return o.forEach(l=>l.addEventListener("click",()=>d(l.dataset.target))),queueMicrotask(()=>s(u)),{root:i,activate:d,recalc:()=>s(u),getActive:()=>u}}var Ee=class{constructor(t){ee(this,"id");ee(this,"label");ee(this,"container",null);ee(this,"cleanupFunctions",[]);ee(this,"preloadedContent",null);ee(this,"preloadPromise",null);this.id=t.id,this.label=t.label}async preload(){if(this.preloadedContent||this.preloadPromise)return;let t=v("div");this.preloadPromise=(async()=>{let n=this.build(t);n instanceof Promise&&await n,this.preloadedContent=t,this.preloadPromise=null})(),await this.preloadPromise}isPreloaded(){return this.preloadedContent!==null}render(t){for(this.unmount();t.firstChild;)t.removeChild(t.firstChild);if(this.container=t,this.preloadedContent){for(;this.preloadedContent.firstChild;)t.appendChild(this.preloadedContent.firstChild);this.preloadedContent=null}else{let r=this.build(t);r instanceof Promise&&r.catch(o=>{console.error(`[Gemini] Error building section ${this.id}:`,o)})}let n=t.firstElementChild;n&&n.classList.contains("gemini-section")&&n.classList.add("active")}unmount(){this.executeCleanup(),this.container=null}createContainer(t,n){let r=n?`gemini-section ${n}`:"gemini-section";return v("section",{id:t,className:r})}addCleanup(t){this.cleanupFunctions.push(t)}createGrid(t="12px"){let n=v("div");return n.style.display="grid",n.style.gap=t,n}executeCleanup(){for(let t of this.cleanupFunctions)try{t()}catch(n){console.error(`[Gemini] Cleanup error in section ${this.id}:`,n)}this.cleanupFunctions=[]}};var on=class{constructor(t,n,r){ee(this,"sections");ee(this,"activeId",null);ee(this,"container");ee(this,"theme");this.sections=new Map(t.map(o=>[o.id,o])),this.container=n,this.theme=r}get ids(){return Array.from(this.sections.keys())}get all(){return Array.from(this.sections.values())}get active(){return this.activeId}activate(t){if(this.activeId!==t){if(!this.sections.has(t))throw new Error(`[Gemini] Unknown section: ${t}`);if(this.activeId&&this.sections.get(this.activeId).unmount(),this.activeId=t,this.sections.get(t).render(this.container),this.theme){let n=this.theme.getCurrentTheme();this.theme.applyTheme(n)}}}};function rn(e,t){try{let n=JSON.stringify(t);GM_setValue(e,n)}catch(n){console.error(`[Gemini] Failed to save key "${e}" to storage:`,n)}}function at(e,t){try{let n=GM_getValue(e);return n==null?t:typeof n=="string"?JSON.parse(n):n}catch(n){return console.error(`[Gemini] Failed to load key "${e}" from storage, using default:`,n),t}}var Xi="gemini.sections";function Qi(){let e=at(Xi,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function qd(e){rn(Xi,e)}async function Zi(e){return Qi()[e]}function es(e,t){let n=Qi();qd({...n,[e]:t})}function to(e,t){return{...e,...t??{}}}async function ts(e){let t=await Zi(e.path),n;e.migrate?n=e.migrate(t):n=t??{},n=Object.assign((d=>JSON.parse(JSON.stringify(d)))(e.defaults),n),e.sanitize&&(n=e.sanitize(n));function o(){es(e.path,n)}function a(){return n}function i(d){n=e.sanitize?e.sanitize(d):d,o()}function s(d){let c=Object.assign((p=>JSON.parse(JSON.stringify(p)))(n),{});typeof d=="function"?d(c):Object.assign(c,d),n=e.sanitize?e.sanitize(c):c,o()}function u(){o()}return{get:a,set:i,update:s,save:u}}async function an(e,t){let{path:n=e,...r}=t;return ts({path:n,...r})}var Yd=0,no=new Map;function he(e={},...t){let{id:n,className:r,variant:o="default",padding:a="md",interactive:i=!1,expandable:s=!1,defaultExpanded:u=!0,onExpandChange:d,mediaTop:l,title:c,subtitle:p,badge:m,actions:g,footer:f,divider:h=!1,tone:b="neutral",stateKey:w}=e,x=v("div",{className:"card",id:n,tabIndex:i?0:void 0});x.classList.add(`card--${o}`,`card--p-${a}`),i&&x.classList.add("card--interactive"),b!=="neutral"&&x.classList.add(`card--tone-${b}`),r&&x.classList.add(...r.split(" ").filter(Boolean)),s&&x.classList.add("card--expandable");let y=s?w??n??(typeof c=="string"?`title:${c}`:null):null,k=!s||u;y&&no.has(y)&&(k=!!no.get(y));let S=null,C=null,I=null,P=null,L=null,D=n?`${n}-collapse`:`card-collapse-${++Yd}`,K=()=>{if(P!==null&&(cancelAnimationFrame(P),P=null),L){let N=L;L=null,N()}},ae=(N,H)=>{if(!I)return;K();let M=I;if(M.setAttribute("aria-hidden",String(!N)),!H){M.classList.remove("card-collapse--animating"),M.style.display=N?"":"none",M.style.height="",M.style.opacity="";return}if(M.classList.add("card-collapse--animating"),M.style.display="",N){M.style.height="auto";let j=M.scrollHeight;if(!j){M.classList.remove("card-collapse--animating"),M.style.display="",M.style.height="",M.style.opacity="";return}M.style.height="0px",M.style.opacity="0",M.offsetHeight,P=requestAnimationFrame(()=>{P=null,M.style.height=`${j}px`,M.style.opacity="1"})}else{let j=M.scrollHeight;if(!j){M.classList.remove("card-collapse--animating"),M.style.display="none",M.style.height="",M.style.opacity="";return}M.style.height=`${j}px`,M.style.opacity="1",M.offsetHeight,P=requestAnimationFrame(()=>{P=null,M.style.height="0px",M.style.opacity="0"})}let R=()=>{M.classList.remove("card-collapse--animating"),M.style.height="",N||(M.style.display="none"),M.style.opacity=""},G=null,W=j=>{j.target===M&&(G!==null&&(clearTimeout(G),G=null),M.removeEventListener("transitionend",W),M.removeEventListener("transitioncancel",W),L=null,R())};L=()=>{G!==null&&(clearTimeout(G),G=null),M.removeEventListener("transitionend",W),M.removeEventListener("transitioncancel",W),L=null,R()},M.addEventListener("transitionend",W),M.addEventListener("transitioncancel",W),G=window.setTimeout(()=>{L?.()},420)};function J(N){let H=document.createElementNS("http://www.w3.org/2000/svg","svg");return H.setAttribute("viewBox","0 0 24 24"),H.setAttribute("width","16"),H.setAttribute("height","16"),H.innerHTML=N==="up"?'<path d="M7 14l5-5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>':'<path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',H}function Q(N,H=!0,M=!0){k=N,x.classList.toggle("card--collapsed",!k),x.classList.toggle("card--expanded",k),S&&(S.dataset.expanded=String(k),S.setAttribute("aria-expanded",String(k))),C&&(C.setAttribute("aria-expanded",String(k)),C.classList.toggle("card-toggle--collapsed",!k),C.setAttribute("aria-label",k?"Replier le contenu":"Deplier le contenu"),C.replaceChildren(J(k?"up":"down"))),s?ae(k,M):I&&(I.style.display="",I.style.height="",I.style.opacity="",I.setAttribute("aria-hidden","false")),H&&d&&d(k),y&&no.set(y,k)}if(l){let N=v("div",{className:"card-media"});N.append(l),x.appendChild(N)}let ue=!!(c||p||m||g&&g.length||s);if(ue){S=v("div",{className:"card-header"});let N=v("div",{className:"card-headline",style:"min-width:0;display:flex;flex-direction:column;gap:2px;"});if(c){let R=v("h3",{className:"card-title",style:"margin:0;font-size:15px;font-weight:700;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:8px;color:var(--group-title, var(--fg));"},c);m&&R.append(typeof m=="string"?v("span",{className:"badge"},m):m),N.appendChild(R)}if(p){let R=v("div",{className:"card-subtitle",style:"opacity:.85;font-size:12px;color:color-mix(in oklab, var(--fg) 80%, #9ca3af)"},p);N.appendChild(R)}(N.childNodes.length||s)&&S.appendChild(N);let H=v("div",{className:"card-header-right",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"}),M=v("div",{className:"card-actions",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"});g?.forEach(R=>M.appendChild(R)),M.childNodes.length&&H.appendChild(M),s&&(C=v("button",{className:"card-toggle",type:"button",ariaExpanded:String(k),ariaControls:D,ariaLabel:k?"Replier le contenu":"Deplier le contenu"}),C.textContent=k?"\u25B2":"\u25BC",C.addEventListener("click",R=>{R.preventDefault(),R.stopPropagation(),Q(!k)}),H.appendChild(C),S.classList.add("card-header--expandable"),S.addEventListener("click",R=>{let G=R.target;G?.closest(".card-actions")||G?.closest(".card-toggle")||Q(!k)})),H.childNodes.length&&S.appendChild(H),x.appendChild(S)}I=v("div",{className:"card-collapse",id:D,ariaHidden:s?String(!k):"false"}),x.appendChild(I),h&&ue&&I.appendChild(v("div",{className:"card-divider"}));let _=v("div",{className:"card-body"});if(_.append(...t),I.appendChild(_),f){h&&I.appendChild(v("div",{className:"card-divider"}));let N=v("div",{className:"card-footer"});N.append(f),I.appendChild(N)}return C&&C.setAttribute("aria-controls",D),Q(k,!1,!1),y&&no.set(y,k),x}var oo=!1,ro=new Set,Ge=e=>{let t=document.activeElement;for(let n of ro)if(t&&(t===n||n.contains(t))){e.stopImmediatePropagation(),e.stopPropagation();return}};function Xd(){oo||(oo=!0,window.addEventListener("keydown",Ge,!0),window.addEventListener("keypress",Ge,!0),window.addEventListener("keyup",Ge,!0),document.addEventListener("keydown",Ge,!0),document.addEventListener("keypress",Ge,!0),document.addEventListener("keyup",Ge,!0))}function Qd(){oo&&(ro.size>0||(oo=!1,window.removeEventListener("keydown",Ge,!0),window.removeEventListener("keypress",Ge,!0),window.removeEventListener("keyup",Ge,!0),document.removeEventListener("keydown",Ge,!0),document.removeEventListener("keypress",Ge,!0),document.removeEventListener("keyup",Ge,!0)))}function ns(e){let{id:t,value:n=null,options:r,placeholder:o="Select...",size:a="md",disabled:i=!1,blockGameKeys:s=!0,onChange:u,onOpenChange:d}=e,l=v("div",{className:"select",id:t}),c=v("button",{className:"select-trigger",type:"button"}),p=v("span",{className:"select-value"},o),m=v("span",{className:"select-caret"},"\u25BE");c.append(p,m);let g=v("div",{className:"select-menu",role:"listbox",tabindex:"-1","aria-hidden":"true"});l.classList.add(`select--${a}`);let f=!1,h=n,b=null,w=!!i;function x(R){return R==null?o:(e.options||r).find(W=>W.value===R)?.label??o}function y(R){p.textContent=x(R),g.querySelectorAll(".select-option").forEach(G=>{let W=G.dataset.value,j=R!=null&&W===R;G.classList.toggle("selected",j),G.setAttribute("aria-selected",String(j))})}function k(R){g.replaceChildren(),R.forEach(G=>{let W=v("button",{className:"select-option"+(G.disabled?" disabled":""),type:"button",role:"option","data-value":G.value,"aria-selected":String(G.value===h),tabindex:"-1"},G.label);G.value===h&&W.classList.add("selected"),G.disabled||W.addEventListener("pointerdown",j=>{j.preventDefault(),j.stopPropagation(),D(G.value,{notify:!0}),P()},{capture:!0}),g.appendChild(W)})}function S(){c.setAttribute("aria-expanded",String(f)),g.setAttribute("aria-hidden",String(!f))}function C(){let R=c.getBoundingClientRect();Object.assign(g.style,{minWidth:`${R.width}px`})}function I(){f||w||(f=!0,l.classList.add("open"),S(),C(),document.addEventListener("mousedown",ue,!0),document.addEventListener("scroll",_,!0),window.addEventListener("resize",N),g.focus({preventScroll:!0}),s&&(Xd(),ro.add(l),b=()=>{ro.delete(l),Qd()}),d?.(!0))}function P(){f&&(f=!1,l.classList.remove("open"),S(),document.removeEventListener("mousedown",ue,!0),document.removeEventListener("scroll",_,!0),window.removeEventListener("resize",N),c.focus({preventScroll:!0}),b?.(),b=null,d?.(!1))}function L(){f?P():I()}function D(R,G={}){let W=h;h=R,y(h),G.notify!==!1&&W!==R&&u?.(R)}function K(){return h}function ae(R){let G=Array.from(g.querySelectorAll(".select-option:not(.disabled)"));if(!G.length)return;let W=G.findIndex(ge=>ge.classList.contains("active")),j=G[(W+(R===1?1:G.length-1))%G.length];G.forEach(ge=>ge.classList.remove("active")),j.classList.add("active"),j.focus({preventScroll:!0}),j.scrollIntoView({block:"nearest"})}function J(R){(R.key===" "||R.key==="Enter"||R.key==="ArrowDown")&&(R.preventDefault(),I())}function Q(R){if(R.key==="Escape"){R.preventDefault(),P();return}if(R.key==="Enter"||R.key===" "){let G=g.querySelector(".select-option.active")||g.querySelector(".select-option.selected");G&&!G.classList.contains("disabled")&&(R.preventDefault(),D(G.dataset.value,{notify:!0}),P());return}if(R.key==="ArrowDown"){R.preventDefault(),ae(1);return}if(R.key==="ArrowUp"){R.preventDefault(),ae(-1);return}}function ue(R){l.contains(R.target)||P()}function _(){f&&C()}function N(){f&&C()}function H(R){w=!!R,c.disabled=w,l.classList.toggle("disabled",w),w&&P()}function M(R){e.options=R,k(R),R.some(G=>G.value===h)||(h=null,y(null))}return l.append(c,g),c.addEventListener("pointerdown",R=>{R.preventDefault(),R.stopPropagation(),L()},{capture:!0}),c.addEventListener("keydown",J),g.addEventListener("keydown",Q),k(r),n!=null?(h=n,y(h)):y(null),S(),H(w),{root:l,open:I,close:P,toggle:L,getValue:K,setValue:D,setOptions:M,setDisabled:H,destroy(){document.removeEventListener("mousedown",ue,!0),document.removeEventListener("scroll",_,!0),window.removeEventListener("resize",N),b?.(),b=null}}}function it(e={}){let{id:t,text:n="",htmlFor:r,tone:o="default",size:a="md",layout:i="inline",variant:s="text",required:u=!1,disabled:d=!1,tooltip:l,hint:c,icon:p,suffix:m,onClick:g}=e,f=v("div",{className:"lg-label-wrap",id:t}),h=v("label",{className:"lg-label",...r?{htmlFor:r}:{},...l?{title:l}:{}});if(p){let D=typeof p=="string"?v("span",{className:"lg-label-ico"},p):p;D.classList?.add?.("lg-label-ico"),h.appendChild(D)}let b=v("span",{className:"lg-label-text"},n);h.appendChild(b);let w=v("span",{className:"lg-label-req",ariaHidden:"true"}," *");u&&h.appendChild(w);let x=null;if(m!=null){x=typeof m=="string"?document.createTextNode(m):m;let D=v("span",{className:"lg-label-suffix"});D.appendChild(x),h.appendChild(D)}let y=c?v("div",{className:"lg-label-hint"},c):null;f.classList.add(`lg-label--${i}`),f.classList.add(`lg-label--${a}`),s==="title"&&f.classList.add("lg-label--title"),k(o),d&&f.classList.add("is-disabled"),f.appendChild(h),y&&f.appendChild(y),g&&h.addEventListener("click",g);function k(D){f.classList.remove("lg-label--default","lg-label--muted","lg-label--info","lg-label--success","lg-label--warning","lg-label--danger"),f.classList.add(`lg-label--${D}`)}function S(D){b.textContent=D}function C(D){k(D)}function I(D){D&&!w.isConnected&&h.appendChild(w),!D&&w.isConnected&&w.remove(),D?h.setAttribute("aria-required","true"):h.removeAttribute("aria-required")}function P(D){f.classList.toggle("is-disabled",!!D)}function L(D){!D&&y&&y.isConnected?y.remove():D&&y?y.textContent=D:D&&!y&&f.appendChild(v("div",{className:"lg-label-hint"},D))}return{root:f,labelEl:h,hintEl:y,setText:S,setTone:C,setRequired:I,setDisabled:P,setHint:L}}function sn(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function ao(e,t){let n=document.createElement("span");n.className=`btn-ico btn-ico--${t}`;let r=sn(e);return r&&n.appendChild(r),n}function Zd(){let e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.marginRight="6px",t.style.display="none",t.style.flexShrink="0";let n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");let r=document.createElementNS(e,"animate");r.setAttribute("attributeName","stroke-dasharray"),r.setAttribute("values","1,150;90,150;90,150"),r.setAttribute("dur","1.5s"),r.setAttribute("repeatCount","indefinite");let o=document.createElementNS(e,"animateTransform");return o.setAttribute("attributeName","transform"),o.setAttribute("attributeType","XML"),o.setAttribute("type","rotate"),o.setAttribute("from","0 12 12"),o.setAttribute("to","360 12 12"),o.setAttribute("dur","1s"),o.setAttribute("repeatCount","indefinite"),n.appendChild(r),n.appendChild(o),t.appendChild(n),t}function st(e={}){let{label:t="",id:n,variant:r="default",size:o="md",iconLeft:a,iconRight:i,loading:s=!1,tooltip:u,type:d="button",onClick:l,disabled:c=!1,fullWidth:p=!1}=e,m=v("button",{className:"btn",id:n});m.type=d,r==="primary"&&m.classList.add("primary"),o==="sm"&&m.classList.add("btn--sm"),u&&(m.title=u),p&&(m.style.width="100%");let g=Zd(),f=a?ao(a,"left"):null,h=i?ao(i,"right"):null,b=document.createElement("span");b.className="btn-label";let w=sn(t);w&&b.appendChild(w),!w&&(f||h)&&m.classList.add("btn--icon"),m.appendChild(g),f&&m.appendChild(f),m.appendChild(b),h&&m.appendChild(h);let x=c||s;m.disabled=x,m.setAttribute("aria-busy",String(!!s)),g.style.display=s?"inline-block":"none",l&&m.addEventListener("click",l);let y=m;return y.setLoading=k=>{m.setAttribute("aria-busy",String(!!k)),g.style.display=k?"inline-block":"none",m.disabled=k||c},y.setDisabled=k=>{m.disabled=k||m.getAttribute("aria-busy")==="true"},y.setLabel=k=>{b.replaceChildren();let S=sn(k);S&&b.appendChild(S),!S&&(f||h)?m.classList.add("btn--icon"):m.classList.remove("btn--icon")},y.setIconLeft=k=>{if(k==null){f?.remove();return}f?f.replaceChildren(sn(k)):m.insertBefore(ao(k,"left"),b)},y.setIconRight=k=>{if(k==null){h?.remove();return}h?h.replaceChildren(sn(k)):m.appendChild(ao(k,"right"))},y}Gt();var io=!1,ln=new Set;function ap(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}var He=e=>{let t=ap();if(t){for(let n of ln)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function ip(){io||(io=!0,window.addEventListener("keydown",He,!0),window.addEventListener("keypress",He,!0),window.addEventListener("keyup",He,!0),document.addEventListener("keydown",He,!0),document.addEventListener("keypress",He,!0),document.addEventListener("keyup",He,!0))}function sp(){io&&(io=!1,window.removeEventListener("keydown",He,!0),window.removeEventListener("keypress",He,!0),window.removeEventListener("keyup",He,!0),document.removeEventListener("keydown",He,!0),document.removeEventListener("keypress",He,!0),document.removeEventListener("keyup",He,!0))}function lp(e){return ln.size===0&&ip(),ln.add(e),()=>{ln.delete(e),ln.size===0&&sp()}}function cp(e,t,n,r){let o;switch(e){case"digits":o="0-9";break;case"alpha":o="\\p{L}";break;case"alphanumeric":o="\\p{L}0-9";break;default:return null}return t&&(o+=" "),n&&(o+="\\-"),r&&(o+="_"),new RegExp(`[^${o}]`,"gu")}function up(e,t){return t?e.replace(t,""):e}function dp(e,t=0){if(!t)return e;let n;return((...r)=>{clearTimeout(n),n=setTimeout(()=>e(...r),t)})}function as(e={}){let{id:t,placeholder:n="",value:r="",mode:o="any",allowSpaces:a=!1,allowDashes:i=!1,allowUnderscore:s=!1,maxLength:u,blockGameKeys:d=!0,debounceMs:l=0,onChange:c,onEnter:p,label:m}=e,g=v("div",{className:"lg-input-wrap"}),f=v("input",{className:"input",id:t,placeholder:n});if(typeof u=="number"&&u>0&&(f.maxLength=u),r&&(f.value=r),m){let D=v("div",{className:"lg-input-label"},m);g.appendChild(D)}g.appendChild(f);let h=cp(o,a,i,s),b=()=>{let D=f.selectionStart??f.value.length,K=f.value.length,ae=up(f.value,h);if(ae!==f.value){f.value=ae;let J=K-ae.length,Q=Math.max(0,D-J);f.setSelectionRange(Q,Q)}},w=dp(()=>c?.(f.value),l);f.addEventListener("input",()=>{b(),w()}),f.addEventListener("paste",()=>queueMicrotask(()=>{b(),w()})),f.addEventListener("keydown",D=>{D.key==="Enter"&&p?.(f.value)});let x=d?lp(f):()=>{};function y(){return f.value}function k(D){f.value=D??"",b(),w()}function S(){f.focus()}function C(){f.blur()}function I(D){f.disabled=!!D}function P(){return document.activeElement===f}function L(){x()}return{root:g,input:f,getValue:y,setValue:k,focus:S,blur:C,setDisabled:I,isFocused:P,destroy:L}}function ve(e,t,n){return Math.min(n,Math.max(t,e))}function un({h:e,s:t,v:n,a:r}){let o=(e%360+360)%360/60,a=n*t,i=a*(1-Math.abs(o%2-1)),s=0,u=0,d=0;switch(Math.floor(o)){case 0:s=a,u=i;break;case 1:s=i,u=a;break;case 2:u=a,d=i;break;case 3:u=i,d=a;break;case 4:s=i,d=a;break;default:s=a,d=i;break}let c=n-a,p=Math.round((s+c)*255),m=Math.round((u+c)*255),g=Math.round((d+c)*255);return{r:ve(p,0,255),g:ve(m,0,255),b:ve(g,0,255),a:ve(r,0,1)}}function is({r:e,g:t,b:n,a:r}){let o=ve(e,0,255)/255,a=ve(t,0,255)/255,i=ve(n,0,255)/255,s=Math.max(o,a,i),u=Math.min(o,a,i),d=s-u,l=0;d!==0&&(s===o?l=60*((a-i)/d%6):s===a?l=60*((i-o)/d+2):l=60*((o-a)/d+4)),l<0&&(l+=360);let c=s===0?0:d/s;return{h:l,s:c,v:s,a:ve(r,0,1)}}function Cr({r:e,g:t,b:n}){let r=o=>ve(Math.round(o),0,255).toString(16).padStart(2,"0");return`#${r(e)}${r(t)}${r(n)}`.toUpperCase()}function pp({r:e,g:t,b:n,a:r}){let o=ve(Math.round(r*255),0,255);return`${Cr({r:e,g:t,b:n,a:r})}${o.toString(16).padStart(2,"0")}`.toUpperCase()}function cn({r:e,g:t,b:n,a:r}){let o=Math.round(r*1e3)/1e3;return`rgba(${e}, ${t}, ${n}, ${o})`}function Ht(e){let t=e.trim();if(!t||(t.startsWith("#")&&(t=t.slice(1)),![3,4,6,8].includes(t.length))||!/^[0-9a-fA-F]+$/.test(t))return null;(t.length===3||t.length===4)&&(t=t.split("").map(i=>i+i).join(""));let n=255;t.length===8&&(n=parseInt(t.slice(6,8),16),t=t.slice(0,6));let r=parseInt(t.slice(0,2),16),o=parseInt(t.slice(2,4),16),a=parseInt(t.slice(4,6),16);return{r,g:o,b:a,a:n/255}}function kr(e){if(!e)return null;let t=e.trim();if(t.startsWith("#"))return Ht(t);let n=t.match(/^rgba?\(([^)]+)\)$/i);if(n){let r=n[1].split(",").map(u=>u.trim());if(r.length<3)return null;let o=Number(r[0]),a=Number(r[1]),i=Number(r[2]),s=r[3]!=null?Number(r[3]):1;return[o,a,i,s].some(u=>Number.isNaN(u))?null:{r:o,g:a,b:i,a:s}}return null}function mp(e,t){let n=kr(e)??Ht(e??"")??{r:244,g:67,b:54,a:1};return typeof t=="number"&&(n.a=ve(t,0,1)),is(n)}function gp(e){return`#${e.trim().replace(/[^0-9a-fA-F#]/g,"").replace(/#/g,"")}`.slice(0,9).toUpperCase()}function fp(e){let t=e.trim();return t&&(/^rgba?\s*\(/i.test(t)?t=t.replace(/^rgba?/i,"rgba"):(t=t.replace(/^\(?(.*)\)?$/,"$1"),t=`rgba(${t})`),t=t.replace(/\s*\(\s*/,"("),t=t.replace(/\s*\)\s*$/,")"),t=t.replace(/\s*,\s*/g,", "),t)}function gt(e){let t=un(e),n=un({...e,a:1});return{hsva:{...e},hex:Cr(n),hexa:pp(t),rgba:cn(t),alpha:e.a}}function ss(e={}){let{id:t,label:n="Color",value:r,alpha:o,defaultExpanded:a=!1,detectMobile:i,onInput:s,onChange:u}=e,l=i?i():Le.detect().platform==="mobile",c=mp(r,o),p=he({id:t,className:"color-picker",title:n,padding:l?"md":"lg",variant:"soft",expandable:!l,defaultExpanded:!l&&a});p.classList.add(l?"color-picker--mobile":"color-picker--desktop");let m=p.querySelector(".card-header");m&&m.classList.add("color-picker__header");let g=m?.querySelector(".card-title"),f=v("button",{className:"color-picker__preview",type:"button",title:`Preview ${n}`,"aria-label":`Change ${n}`});g?g.prepend(f):m?m.prepend(f):p.prepend(f);let h=p.querySelector(".card-toggle");!l&&h&&f.addEventListener("click",()=>{p.classList.contains("card--collapsed")&&h.click()});let b=p.querySelector(".card-collapse"),w=null,x=null,y=null,k=null,S=null,C=null,I=null,P=null,L=null,D="hex";function K(_){let N=gt(c);_==="input"?s?.(N):u?.(N)}function ae(){let _=gt(c);if(f.style.setProperty("--cp-preview-color",_.rgba),f.setAttribute("aria-label",`${n}: ${_.hexa}`),!l&&w&&x&&y&&k&&S&&C&&I){let N=un({...c,s:1,v:1,a:1}),H=cn(N);w.style.setProperty("--cp-palette-hue",H),x.style.left=`${c.s*100}%`,x.style.top=`${(1-c.v)*100}%`,y.style.setProperty("--cp-alpha-gradient",`linear-gradient(180deg, ${cn({...N,a:1})} 0%, ${cn({...N,a:0})} 100%)`),k.style.top=`${(1-c.a)*100}%`,S.style.setProperty("--cp-hue-color",cn(un({...c,v:1,s:1,a:1}))),C.style.left=`${c.h/360*100}%`;let M=c.a===1?_.hex:_.hexa,R=_.rgba,G=D==="hex"?M:R;I!==document.activeElement&&(I.value=G),I.setAttribute("aria-label",`${D.toUpperCase()} code for ${n}`),I.placeholder=D==="hex"?"#RRGGBB or #RRGGBBAA":"rgba(0, 0, 0, 1)",D==="hex"?I.maxLength=9:I.removeAttribute("maxLength"),I.dataset.mode=D,P&&(P.textContent=D.toUpperCase(),P.setAttribute("aria-label",D==="hex"?"Passer en saisie RGBA":"Revenir en saisie HEX"),P.setAttribute("aria-pressed",D==="rgba"?"true":"false"),P.classList.toggle("is-alt",D==="rgba"))}L&&L!==document.activeElement&&(L.value=_.hex)}function J(_,N=null){c={h:(_.h%360+360)%360,s:ve(_.s,0,1),v:ve(_.v,0,1),a:ve(_.a,0,1)},ae(),N&&K(N)}function Q(_,N=null){J(is(_),N)}function ue(_,N,H){_.addEventListener("pointerdown",M=>{M.preventDefault();let R=M.pointerId,G=j=>{j.pointerId===R&&N(j)},W=j=>{j.pointerId===R&&(document.removeEventListener("pointermove",G),document.removeEventListener("pointerup",W),document.removeEventListener("pointercancel",W),H?.(j))};N(M),document.addEventListener("pointermove",G),document.addEventListener("pointerup",W),document.addEventListener("pointercancel",W)})}if(!l&&b){let _=b.querySelector(".card-body");if(_){_.classList.add("color-picker__body"),x=v("div",{className:"color-picker__palette-cursor"}),w=v("div",{className:"color-picker__palette"},x),k=v("div",{className:"color-picker__alpha-thumb"}),y=v("div",{className:"color-picker__alpha"},k),C=v("div",{className:"color-picker__hue-thumb"}),S=v("div",{className:"color-picker__hue"},C);let N=v("div",{className:"color-picker__main"},w,y),H=v("div",{className:"color-picker__hue-row"},S),M=as({blockGameKeys:!0});I=M.input,I.classList.add("color-picker__hex-input"),I.value="",I.maxLength=9,I.spellcheck=!1,I.inputMode="text",I.setAttribute("aria-label",`Hex code for ${n}`),P=v("button",{type:"button",className:"color-picker__mode-btn",textContent:"HEX","aria-pressed":"false","aria-label":"Passer en saisie RGBA"}),M.root.classList.add("color-picker__hex-wrap");let R=v("div",{className:"color-picker__hex-row"},P,M.root);_.replaceChildren(N,H,R),ue(w,W=>{if(!w||!x)return;let j=w.getBoundingClientRect(),ge=ve((W.clientX-j.left)/j.width,0,1),Dt=ve((W.clientY-j.top)/j.height,0,1);J({...c,s:ge,v:1-Dt},"input")},()=>K("change")),ue(y,W=>{if(!y)return;let j=y.getBoundingClientRect(),ge=ve((W.clientY-j.top)/j.height,0,1);J({...c,a:1-ge},"input")},()=>K("change")),ue(S,W=>{if(!S)return;let j=S.getBoundingClientRect(),ge=ve((W.clientX-j.left)/j.width,0,1);J({...c,h:ge*360},"input")},()=>K("change")),P.addEventListener("click",()=>{if(D=D==="hex"?"rgba":"hex",I){let W=gt(c);I.value=D==="hex"?c.a===1?W.hex:W.hexa:W.rgba}ae(),I?.focus(),I?.select()}),I.addEventListener("input",()=>{if(D==="hex"){let W=gp(I.value);if(W!==I.value){let j=I.selectionStart??W.length;I.value=W,I.setSelectionRange(j,j)}}});let G=()=>{let W=I.value;if(D==="hex"){let j=Ht(W);if(!j){I.value=c.a===1?gt(c).hex:gt(c).hexa;return}let ge=W.startsWith("#")?W.slice(1):W,Dt=ge.length===4||ge.length===8;j.a=Dt?j.a:c.a,Q(j,"change")}else{let j=fp(W),ge=kr(j);if(!ge){I.value=gt(c).rgba;return}Q(ge,"change")}};I.addEventListener("change",G),I.addEventListener("blur",G),I.addEventListener("keydown",W=>{W.key==="Enter"&&(G(),I.blur())})}}return l&&(b&&b.remove(),L=v("input",{className:"color-picker__native",type:"color",value:Cr(un({...c,a:1}))}),f.addEventListener("click",()=>L.click()),L.addEventListener("input",()=>{let _=Ht(L.value);_&&(_.a=c.a,Q(_,"input"),K("change"))}),p.appendChild(L)),ae(),{root:p,isMobile:l,getValue:()=>gt(c),setValue:(_,N)=>{let H=kr(_)??Ht(_)??Ht("#FFFFFF");H&&(typeof N=="number"&&(H.a=N),Q(H,null))}}}Gt();ye();Gt();function vp(e){try{return!!e.isSecureContext}catch{return!1}}function Pr(e){let t=e?.getRootNode?.();return t&&(t instanceof Document||t.host)?t:document}function ls(){let e=navigator.platform||"",t=navigator.userAgent||"";return/Mac|iPhone|iPad|iPod/i.test(e)||/Mac OS|iOS/i.test(t)}async function xp(){try{let e=await navigator.permissions?.query?.({name:"clipboard-write"});return e?e.state==="granted"||e.state==="prompt":!0}catch{return!0}}function Sp(e,t){let n=document.createElement("textarea");return n.value=e,n.setAttribute("readonly","true"),n.style.position="fixed",n.style.opacity="0",n.style.pointerEvents="none",n.style.top="0",t.appendChild?t.appendChild(n):document.body.appendChild(n),n}function wp(e){try{let t=window.getSelection?.();if(!t)return!1;let n=document.createRange();return n.selectNodeContents(e),t.removeAllRanges(),t.addRange(n),!0}catch{return!1}}async function Tp(e){if(!("clipboard"in navigator))return{ok:!1,method:"clipboard-write"};if(!vp(A))return{ok:!1,method:"clipboard-write"};if(!await xp())return{ok:!1,method:"clipboard-write"};try{return await navigator.clipboard.writeText(e),{ok:!0,method:"clipboard-write"}}catch{return{ok:!1,method:"clipboard-write"}}}function kp(e,t){try{let n=t||Pr(),r=Sp(e,n);r.focus(),r.select(),r.setSelectionRange(0,r.value.length);let o=!1;try{o=document.execCommand("copy")}catch{o=!1}return r.remove(),{ok:o,method:"execCommand"}}catch{return{ok:!1,method:"execCommand"}}}function Cp(e,t){if(!t)return{ok:!1,method:"selection"};let n=t.textContent??"",r=!1;if(n!==e)try{t.textContent=e,r=!0}catch{}let o=wp(t);r&&setTimeout(()=>{try{t.textContent=n}catch{}},80);let a=ls()?"\u2318C pour copier":"Ctrl+C pour copier";return{ok:o,method:"selection",hint:a}}async function Pp(e,t={}){let n=(e??"").toString();if(!n.length)return{ok:!1,method:"noop"};let r=await Tp(n);if(r.ok)return r;let o=t.injectionRoot||Pr(t.valueNode||void 0),a=kp(n,o);if(a.ok)return a;let i=Cp(n,t.valueNode||null);if(i.ok)return i;if(!t.disablePromptFallback)try{return window.prompt(Le.isDiscord()?"Copie manuelle (Discord bloque clipboard):":"Copie manuelle:",n),{ok:!0,method:"prompt"}}catch{}return{ok:!1,method:"noop"}}function cs(e,t,n={}){let r=o=>{if(n.showTip){n.showTip(o);return}try{e.setAttribute("aria-label",o);let a=document.createElement("div");a.textContent=o,a.style.position="absolute",a.style.top="-28px",a.style.right="0",a.style.padding="4px 8px",a.style.borderRadius="8px",a.style.fontSize="12px",a.style.background="color-mix(in oklab, var(--bg) 85%, transparent)",a.style.border="1px solid var(--border)",a.style.color="var(--fg)",a.style.pointerEvents="none",a.style.opacity="0",a.style.transition="opacity .12s";let i=Pr(e);i.appendChild?i.appendChild(a):document.body.appendChild(a);let s=e.getBoundingClientRect();a.style.left=`${s.right-8}px`,a.style.top=`${s.top-28}px`,requestAnimationFrame(()=>a.style.opacity="1"),setTimeout(()=>{a.style.opacity="0",setTimeout(()=>a.remove(),150)},1200)}catch{}};e.addEventListener("click",async o=>{o.stopPropagation();let a=(t()??"").toString(),i=await Pp(a,{valueNode:n.valueNode??null,injectionRoot:n.injectionRoot??null,disablePromptFallback:n.disablePromptFallback??!1});n.onResult?.(i),i.ok?i.method==="clipboard-write"||i.method==="execCommand"||i.method==="prompt"?r("Copi\xE9"):i.method==="selection"&&r(i.hint||(ls()?"\u2318C pour copier":"Ctrl+C pour copier")):r("Impossible de copier")})}var lt={light:{"--bg":"rgba(255,255,255,0.7)","--fg":"#0f172a","--muted":"rgba(15,23,42,0.06)","--soft":"rgba(15,23,42,0.04)","--accent":"#2563eb","--border":"rgba(15,23,42,0.12)","--shadow":"rgba(2,6,23,.2)","--tab-bg":"#ffffff","--tab-fg":"#0f172a","--pill-from":"#4f46e5","--pill-to":"#06b6d4"},dark:{"--bg":"rgba(10,12,18,0.6)","--fg":"#e5e7eb","--muted":"rgba(229,231,235,0.08)","--soft":"rgba(229,231,235,0.05)","--accent":"#60a5fa","--border":"rgba(148,163,184,0.2)","--shadow":"rgba(0,0,0,.45)","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#e5e7eb","--pill-from":"#6366f1","--pill-to":"#06b6d4"},sepia:{"--bg":"rgba(247,242,231,0.72)","--fg":"#3b2f2f","--muted":"rgba(59,47,47,0.06)","--soft":"rgba(59,47,47,0.04)","--accent":"#b07d62","--border":"rgba(59,47,47,0.14)","--shadow":"rgba(0,0,0,.18)","--tab-bg":"#fff","--tab-fg":"#3b2f2f","--pill-from":"#b07d62","--pill-to":"#d4a373"},forest:{"--bg":"rgba(14,24,18,0.62)","--fg":"#e7f5e9","--muted":"rgba(231,245,233,0.08)","--soft":"rgba(231,245,233,0.05)","--accent":"#34d399","--border":"rgba(231,245,233,0.16)","--shadow":"rgba(0,0,0,.5)","--tab-bg":"rgba(255,255,255,0.06)","--tab-fg":"#e7f5e9","--pill-from":"#10b981","--pill-to":"#84cc16"},violet:{"--bg":"rgba(23, 16, 42, 0.68)","--fg":"#f5f3ff","--muted":"rgba(245,243,255,0.08)","--soft":"rgba(245,243,255,0.05)","--accent":"#a855f7","--border":"rgba(216,180,254,0.22)","--shadow":"rgba(12,3,30,.55)","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#ede9fe","--pill-from":"#a855f7","--pill-to":"#f472b6"},ocean:{"--bg":"rgba(10, 34, 46, 0.66)","--fg":"#e0f7ff","--muted":"rgba(224,247,255,0.07)","--soft":"rgba(224,247,255,0.05)","--accent":"#38bdf8","--border":"rgba(125, 211, 252, 0.22)","--shadow":"rgba(0, 16, 32, .52)","--tab-bg":"rgba(56,189,248,0.14)","--tab-fg":"#e0f7ff","--pill-from":"#0ea5e9","--pill-to":"#14b8a6"},ember:{"--bg":"rgba(34,18,10,0.64)","--fg":"#fff7ed","--muted":"rgba(255,247,237,0.08)","--soft":"rgba(255,247,237,0.05)","--accent":"#f97316","--border":"rgba(255, 159, 92, 0.24)","--shadow":"rgba(16,6,2,.52)","--tab-bg":"rgba(255,247,237,0.09)","--tab-fg":"#fff7ed","--pill-from":"#fb923c","--pill-to":"#facc15"},magicGarden:{"--bg":"#201D1D","--fg":"#F5F5F5","--muted":"rgba(255,255,255,0.6)","--soft":"rgba(0,0,0,0.3)","--accent":"#FFF27D","--border":"rgba(255,255,255,0.1)","--border-accent":"#4A3B2E","--shadow":"rgba(0,0,0,0.5)","--card-shadow":"0 4px 10px rgba(0, 0, 0, 0.5)","--tab-bg":"#10725A","--tab-fg":"#F5F5F5","--section-title":"#10725A","--group-title":"#5EB292","--item-label":"#F5F5F5","--item-desc":"rgba(255,255,255,0.6)","--item-value":"#FFF27D","--card-bg":"rgba(0,0,0,0.3)","--card-radius":"12px","--card-border":"#4A3B2E","--pill-from":"#FFF27D","--pill-to":"#5EB292","--scrollbar-thumb":"rgba(255,255,255,0.2)","--scrollbar-thumb-hover":"rgba(255,255,255,0.3)"}};ye();function Mr(e){let{host:t,themes:n,initialTheme:r,onThemeChange:o}=e,a=r,i=null,s=!1;function u(l){let c=n[l]||n[a]||{};s&&t.classList.add("theme-anim");for(let[p,m]of Object.entries(c))t.style.setProperty(p,m);s?(i!==null&&clearTimeout(i),i=A.setTimeout(()=>{t.classList.remove("theme-anim"),i=null},320)):s=!0,a=l,o?.(l)}function d(){return a}return u(r),{applyTheme:u,getCurrentTheme:d}}var so={ui:{expandedCards:{style:!1,system:!1}}};async function us(){let e=await an("tab-settings",{version:1,defaults:so,sanitize:o=>({ui:{expandedCards:to(so.ui.expandedCards,o.ui?.expandedCards)}})});function t(o){let a=e.get();e.update({ui:{...a.ui,...o,expandedCards:to(a.ui.expandedCards,o.expandedCards)}})}function n(o,a){let i=e.get();e.update({ui:{...i.ui,expandedCards:{...i.ui.expandedCards,[o]:!!a}}})}function r(o){let a=e.get();n(o,!a.ui.expandedCards[o])}return{get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:r}}function ds(e){return e.replace(/[_-]+/g," ").replace(/^\w/,t=>t.toUpperCase())}function Mp(){return Object.keys(lt).map(e=>({value:e,label:ds(e)}))}var Ap=["--bg","--fg","--accent","--muted","--soft","--border","--shadow","--tab-bg","--tab-fg","--pill-from","--pill-to"];function Ip(e){return ds(e.replace(/^--/,""))}function Ep(e){return e.alpha<1?e.rgba:e.hex}var lo=class extends Ee{constructor(n){super({id:"tab-settings",label:"Settings"});this.deps=n}async build(n){let r=this.createGrid("12px");r.id="settings",n.appendChild(r);let o;try{o=await us()}catch{o={get:()=>so,set:()=>{},save:()=>{},setUI:()=>{},setCardExpanded:()=>{},toggleCard:()=>{}}}let a=o.get(),i=Object.keys(lt),s=this.deps.getCurrentTheme?.()??this.deps.initialTheme,u=i.includes(s)?s:i[0]??"dark",d=u,l=it({text:"Theme",tone:"muted",size:"lg"}),c=ns({options:Mp(),value:u,onChange:f=>{d=f,this.deps.applyTheme(f),this.renderThemePickers(f,p,d)}}),p=v("div",{className:"settings-theme-grid"}),m=he({title:"Style",padding:"lg",expandable:!0,defaultExpanded:!!a.ui.expandedCards.style,onExpandChange:f=>o.setCardExpanded("style",f)},v("div",{className:"kv settings-theme-row"},l.root,c.root),p);this.renderThemePickers(u,p,d);let g=this.createEnvCard({defaultExpanded:!!a.ui.expandedCards.system,onExpandChange:f=>o.setCardExpanded("system",f)});r.appendChild(m),r.appendChild(g)}renderThemePickers(n,r,o){let a=lt[n];if(r.replaceChildren(),!!a)for(let i of Ap){let s=a[i];if(s==null)continue;let u=ss({label:Ip(i),value:s,defaultExpanded:!1,onInput:d=>this.updateThemeVar(n,i,d,o),onChange:d=>this.updateThemeVar(n,i,d,o)});r.appendChild(u.root)}}updateThemeVar(n,r,o,a){let i=lt[n];i&&(i[r]=Ep(o),a===n&&this.deps.applyTheme(n))}createEnvCard(n){let r=n?.defaultExpanded??!1,o=n?.onExpandChange,a=(b,w)=>{let x=v("div",{className:"kv kv--inline-mobile"}),y=v("label",{},b),k=v("div",{className:"ro"});return typeof w=="string"?k.textContent=w:k.append(w),x.append(y,k),x},i=v("code",{},"\u2014"),s=v("span",{},"\u2014"),u=v("span",{},"\u2014"),d=v("span",{},"\u2014"),l=v("span",{},"\u2014"),c=v("span",{},"\u2014"),p=()=>{let b=Le.detect();u.textContent=b.surface,d.textContent=b.platform,l.textContent=b.browser??"Unknown",c.textContent=b.os??"Unknown",i.textContent=b.host,s.textContent=b.isInIframe?"Yes":"No"},m=st({label:"Copy JSON",variant:"primary",size:"sm"});cs(m,()=>{let b=Le.detect();return JSON.stringify(b,null,2)});let g=v("div",{style:"width:100%;display:flex;justify-content:center;"},m),f=he({title:"System",variant:"soft",padding:"lg",footer:g,expandable:!0,defaultExpanded:r,onExpandChange:o},a("Surface",u),a("Platform",d),a("Browser",l),a("OS",c),a("Host",i),a("Iframe",s)),h=()=>{document.hidden||p()};return document.addEventListener("visibilitychange",h),p(),this.addCleanup(()=>document.removeEventListener("visibilitychange",h)),f}};function co(e){let{id:t,columns:n,data:r,pageSize:o=0,stickyHeader:a=!0,zebra:i=!0,animations:s=!0,respectReducedMotion:u=!0,compact:d=!1,maxHeight:l,selectable:c=!1,getRowId:p=(U,Y)=>String(Y),onSortChange:m,onRowClick:g}=e,f=n.slice(),h=r.slice(),b=r.slice(),w=null,x=null,y=1,k=typeof window<"u"&&typeof window.matchMedia=="function"?window.matchMedia("(prefers-reduced-motion: reduce)").matches:!1,S=!!s&&!(u&&k),C=v("div",{className:"lg-table-wrap",id:t});if(l!=null){let U=typeof l=="number"?`${l}px`:l;C.style.setProperty("--tbl-max-h",U)}let I=v("div",{className:"lg-table"}),P=v("div",{className:"lg-thead"}),L=v("div",{className:"lg-tbody"}),D=v("div",{className:"lg-tfoot"});a&&C.classList.add("sticky"),i&&C.classList.add("zebra"),d&&C.classList.add("compact"),c&&C.classList.add("selectable");let K="36px";C.style.setProperty("--check-w",K);function ae(){let U=f.map(le=>{let oe=(le.width||"1fr").trim();return/\bfr$/.test(oe)?`minmax(0, ${oe})`:oe}),Y=(c?[K,...U]:U).join(" ");C.style.setProperty("--lg-cols",Y)}ae();function J(){return o?Math.max(1,Math.ceil(h.length/o)):1}function Q(){if(!o)return h;let U=(y-1)*o;return h.slice(U,U+o)}function ue(){if(!w||!x)return;let U=f.find(oe=>String(oe.key)===w),Y=x==="asc"?1:-1,le=U?.sortFn?(oe,me)=>Y*U.sortFn(oe,me):(oe,me)=>{let Z=oe[w],ie=me[w];return Z==null&&ie==null?0:Z==null?-1*Y:ie==null?1*Y:typeof Z=="number"&&typeof ie=="number"?Y*(Z-ie):Y*String(Z).localeCompare(String(ie),void 0,{numeric:!0,sensitivity:"base"})};h.sort(le)}let _=new Set;function N(){return Array.from(_)}function H(){_.clear(),R(),L.querySelectorAll(".lg-row-check").forEach(U=>U.checked=!1)}let M=null;function R(){if(!M)return;let U=Q();if(!U.length){M.indeterminate=!1,M.checked=!1;return}let Y=U.map((oe,me)=>p(oe,(y-1)*(o||0)+me)),le=Y.reduce((oe,me)=>oe+(_.has(me)?1:0),0);M.checked=le===Y.length,M.indeterminate=le>0&&le<Y.length}function G(){let U=L.offsetWidth-L.clientWidth;P.style.paddingRight=U>0?`${U}px`:"0px"}function W(){requestAnimationFrame(G)}let j=new ResizeObserver(()=>G()),ge=()=>G();function Dt(){P.replaceChildren();let U=v("div",{className:"lg-tr lg-tr-head"});if(c){let Y=v("div",{className:"lg-th lg-th-check"});M=v("input",{type:"checkbox"}),M.addEventListener("change",()=>{let le=Q(),oe=M.checked;le.forEach((me,Z)=>{let ie=p(me,(y-1)*(o||0)+Z);oe?_.add(ie):_.delete(ie)}),Yn()}),Y.appendChild(M),U.appendChild(Y)}f.forEach(Y=>{let le=v("button",{className:"lg-th",type:"button",title:Y.title||Y.header});le.textContent=Y.header,Y.align&&le.style.setProperty("--col-align",Y.align),Y.sortable&&le.classList.add("sortable"),w===String(Y.key)&&x?le.setAttribute("data-sort",x):le.removeAttribute("data-sort"),Y.sortable&&le.addEventListener("click",()=>{let oe=String(Y.key);w!==oe?(w=oe,x="asc"):(x=x==="asc"?"desc":x==="desc"?null:"asc",x||(w=null,h=b.slice())),m?.(w,x),w&&x&&ue(),Qn()}),U.appendChild(le)}),P.appendChild(U);try{j.disconnect()}catch{}j.observe(L),W()}function ne(U){return Array.from(U.querySelectorAll(":scope > .lg-td, :scope > .lg-td-check"))}function Se(U){return U.querySelector(".lg-td, .lg-td-check")}function Xe(U){let Y=Se(U);return Y?Y.getBoundingClientRect():null}function Yn(){let U=Q(),Y=new Map;Array.from(L.children).forEach(Z=>{let ie=Z,Ce=ie.getAttribute("data-id");if(!Ce)return;let Oe=Xe(ie);Oe&&Y.set(Ce,Oe)});let le=new Map;Array.from(L.children).forEach(Z=>{let ie=Z,Ce=ie.getAttribute("data-id");Ce&&le.set(Ce,ie)});let oe=[];for(let Z=0;Z<U.length;Z++){let ie=U[Z],Ce=(o?(y-1)*o:0)+Z,Oe=p(ie,Ce);oe.push(Oe);let fe=le.get(Oe);fe||(fe=Bd(ie,Ce),S&&ne(fe).forEach(nn=>{nn.style.transform="translateY(6px)",nn.style.opacity="0"})),L.appendChild(fe)}let me=[];if(le.forEach((Z,ie)=>{oe.includes(ie)||me.push(Z)}),!S){me.forEach(Z=>Z.remove()),R(),W();return}oe.forEach(Z=>{let ie=L.querySelector(`.lg-tr-body[data-id="${Z}"]`);if(!ie)return;let Ce=Xe(ie),Oe=Y.get(Z),fe=ne(ie);if(Oe&&Ce){let ze=Oe.left-Ce.left,Rt=Oe.top-Ce.top;fe.forEach(rt=>{rt.style.transition="none",rt.style.transform=`translate(${ze}px, ${Rt}px)`,rt.style.opacity="1"}),Se(ie)?.getBoundingClientRect(),fe.forEach(rt=>{rt.style.willChange="transform, opacity",rt.style.transition="transform .18s ease, opacity .18s ease"}),requestAnimationFrame(()=>{fe.forEach(rt=>{rt.style.transform="translate(0,0)"})})}else fe.forEach(ze=>{ze.style.transition="transform .18s ease, opacity .18s ease"}),requestAnimationFrame(()=>{fe.forEach(ze=>{ze.style.transform="translate(0,0)",ze.style.opacity="1"})});let Sr=ze=>{(ze.propertyName==="transform"||ze.propertyName==="opacity")&&(fe.forEach(Rt=>{Rt.style.willChange="",Rt.style.transition="",Rt.style.transform="",Rt.style.opacity=""}),ze.currentTarget.removeEventListener("transitionend",Sr))},nn=fe[0];nn&&nn.addEventListener("transitionend",Sr)}),me.forEach(Z=>{let ie=ne(Z);ie.forEach(fe=>{fe.style.willChange="transform, opacity",fe.style.transition="transform .18s ease, opacity .18s ease",fe.style.opacity="0",fe.style.transform="translateY(-6px)"});let Ce=fe=>{fe.propertyName==="opacity"&&(fe.currentTarget.removeEventListener("transitionend",Ce),Z.remove())},Oe=ie[0];Oe?Oe.addEventListener("transitionend",Ce):Z.remove()}),R(),W()}function Bd(U,Y){let le=p(U,Y),oe=v("div",{className:"lg-tr lg-tr-body","data-id":le});if(c){let me=v("div",{className:"lg-td lg-td-check"}),Z=v("input",{type:"checkbox",className:"lg-row-check"});Z.checked=_.has(le),Z.addEventListener("change",()=>{Z.checked?_.add(le):_.delete(le),R()}),me.appendChild(Z),oe.appendChild(me)}return f.forEach(me=>{let Z=v("div",{className:"lg-td"});me.align&&Z.style.setProperty("--col-align",me.align);let ie=me.render?me.render(U,Y):String(U[me.key]??"");typeof ie=="string"?Z.textContent=ie:Z.appendChild(ie),oe.appendChild(Z)}),g&&(oe.classList.add("clickable"),oe.addEventListener("click",me=>{me.target.closest(".lg-td-check")||g(U,Y,me)})),oe}function $i(){if(D.replaceChildren(),!o)return;let U=J(),Y=v("div",{className:"lg-pager"}),le=v("button",{className:"btn",type:"button"},"\u2190"),oe=v("button",{className:"btn",type:"button"},"\u2192"),me=v("span",{className:"lg-pager-info"},`${y} / ${U}`);le.disabled=y<=1,oe.disabled=y>=U,le.addEventListener("click",()=>Xn(y-1)),oe.addEventListener("click",()=>Xn(y+1)),Y.append(le,me,oe),D.appendChild(Y)}function Xn(U){let Y=J();y=Math.min(Math.max(1,U),Y),Yn(),$i()}function Qn(){ae(),Dt(),Yn(),$i()}function jd(U){b=U.slice(),h=U.slice(),w&&x&&ue(),Xn(1)}function Ud(U){f=U.slice(),Qn()}function zd(U,Y="asc"){w=U,x=U?Y:null,w&&x?ue():h=b.slice(),Qn()}function Vd(){try{j.disconnect()}catch{}window.removeEventListener("resize",ge)}return I.append(P,L,D),C.appendChild(I),window.addEventListener("resize",ge),Qn(),{root:C,setData:jd,setColumns:Ud,sortBy:zd,getSelection:N,clearSelection:H,setPage:Xn,getState:()=>({page:y,pageCount:J(),sortKey:w,sortDir:x}),destroy:Vd}}var po=!1,dn=new Set;function Lp(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}var Ne=e=>{let t=Lp();if(t){for(let n of dn)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function Dp(){po||(po=!0,window.addEventListener("keydown",Ne,!0),window.addEventListener("keypress",Ne,!0),window.addEventListener("keyup",Ne,!0),document.addEventListener("keydown",Ne,!0),document.addEventListener("keypress",Ne,!0),document.addEventListener("keyup",Ne,!0))}function Rp(){po&&(po=!1,window.removeEventListener("keydown",Ne,!0),window.removeEventListener("keypress",Ne,!0),window.removeEventListener("keyup",Ne,!0),document.removeEventListener("keydown",Ne,!0),document.removeEventListener("keypress",Ne,!0),document.removeEventListener("keyup",Ne,!0))}function Op(e){return dn.size===0&&Dp(),dn.add(e),()=>{dn.delete(e),dn.size===0&&Rp()}}function uo(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function Gp(){let e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.display="none",t.style.flexShrink="0";let n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");let r=document.createElementNS(e,"animate");r.setAttribute("attributeName","stroke-dasharray"),r.setAttribute("values","1,150;90,150;90,150"),r.setAttribute("dur","1.5s"),r.setAttribute("repeatCount","indefinite");let o=document.createElementNS(e,"animateTransform");return o.setAttribute("attributeName","transform"),o.setAttribute("attributeType","XML"),o.setAttribute("type","rotate"),o.setAttribute("from","0 12 12"),o.setAttribute("to","360 12 12"),o.setAttribute("dur","1s"),o.setAttribute("repeatCount","indefinite"),n.append(r,o),t.appendChild(n),t}function ps(e={}){let{id:t,placeholder:n="Rechercher\u2026",value:r="",size:o="md",disabled:a=!1,autoFocus:i=!1,onChange:s,onSearch:u,autoSearch:d=!1,debounceMs:l=0,focusKey:c="/",iconLeft:p,iconRight:m,withClear:g=!0,clearTitle:f="Effacer",ariaLabel:h,submitLabel:b,loading:w=!1,blockGameKeys:x=!0}=e,y=v("div",{className:"search"+(o?` search--${o}`:""),id:t}),k=v("span",{className:"search-ico search-ico--left"});if(p){let ne=uo(p);ne&&k.appendChild(ne)}else k.textContent="\u{1F50E}",k.style.opacity=".9";let S=v("input",{className:"input search-input",type:"text",placeholder:n,value:r,"aria-label":h||n}),C=v("span",{className:"search-ico search-ico--right"});if(m){let ne=uo(m);ne&&C.appendChild(ne)}let I=Gp();I.classList.add("search-spinner");let P=g?v("button",{className:"search-clear",type:"button",title:f},"\xD7"):null,L=b!=null?v("button",{className:"btn search-submit",type:"button"},b):null,D=v("div",{className:"search-field"},k,S,C,I,...P?[P]:[]);y.append(D,...L?[L]:[]);let K=!!a,ae=null;function J(ne){I.style.display=ne?"inline-block":"none",y.classList.toggle("is-loading",ne)}function Q(){ae!=null&&(window.clearTimeout(ae),ae=null)}function ue(ne){Q(),l>0?ae=window.setTimeout(()=>{ae=null,ne()},l):ne()}function _(){s?.(S.value),d&&u&&u(S.value)}S.addEventListener("input",()=>{ue(_)}),S.addEventListener("keydown",ne=>{ne.key==="Enter"?(ne.preventDefault(),Q(),u?.(S.value)):ne.key==="Escape"&&(S.value.length>0?M("",{notify:!0}):S.blur())}),P&&P.addEventListener("click",()=>M("",{notify:!0})),L&&L.addEventListener("click",()=>u?.(S.value));let N=()=>{};if(x&&(N=Op(S)),c){let ne=Se=>{if(Se.key===c&&!Se.ctrlKey&&!Se.metaKey&&!Se.altKey){let Xe=document.activeElement;Xe&&(Xe.tagName==="INPUT"||Xe.tagName==="TEXTAREA"||Xe.isContentEditable)||(Se.preventDefault(),S.focus())}};window.addEventListener("keydown",ne,!0),y.__cleanup=()=>{window.removeEventListener("keydown",ne,!0),N()}}else y.__cleanup=()=>{N()};function H(ne){K=!!ne,S.disabled=K,P&&(P.disabled=K),L&&(L.disabled=K),y.classList.toggle("disabled",K)}function M(ne,Se={}){let Xe=S.value;S.value=ne??"",Se.notify&&Xe!==ne&&ue(_)}function R(){return S.value}function G(){S.focus()}function W(){S.blur()}function j(ne){S.placeholder=ne}function ge(ne){M("",ne)}return H(K),J(w),i&&G(),{root:y,input:S,getValue:R,setValue:M,focus:G,blur:W,setDisabled:H,setPlaceholder:j,clear:ge,setLoading:J,setIconLeft(ne){k.replaceChildren();let Se=uo(ne??"\u{1F50E}");Se&&k.appendChild(Se)},setIconRight(ne){C.replaceChildren();let Se=uo(ne??"");Se&&C.appendChild(Se)}}}function Hp(e){let t=String(e??"").trim().toLowerCase();return t?t==="common"?"Common":t==="uncommon"?"Uncommon":t==="rare"?"Rare":t==="legendary"?"Legendary":t==="mythical"?"Mythical":t==="divine"?"Divine":t==="celestial"?"Celestial":t==="unknown"||t==="unknow"?"Unknown":null:null}function Np(e){return e.toLowerCase()}function ms(e={}){let{id:t,label:n="",type:r="neutral",tone:o="soft",border:a,withBorder:i,pill:s=!0,size:u="md",onClick:d,variant:l="default",rarity:c=null}=e,p=v("span",{className:"badge",id:t});s&&p.classList.add("badge--pill"),u==="sm"?p.classList.add("badge--sm"):u==="lg"?p.classList.add("badge--lg"):p.classList.add("badge--md"),d&&p.addEventListener("click",d);let m=!1,g=i;function f(){m||(g===!1?p.style.border="none":p.style.border="")}function h(S,C=o){p.classList.remove("badge--neutral","badge--info","badge--success","badge--warning","badge--danger","badge--soft","badge--outline","badge--solid"),p.classList.add(`badge--${S}`,`badge--${C}`),f()}function b(S){let C=(S??"").trim();C?(p.style.border=C,m=!0):(m=!1,f())}function w(S){g=S,f()}function x(S){p.textContent=S}function y(S,C=o){h(S,C)}function k(S){p.classList.remove("badge--rarity","badge--rarity-common","badge--rarity-uncommon","badge--rarity-rare","badge--rarity-legendary","badge--rarity-mythical","badge--rarity-divine","badge--rarity-celestial","badge--rarity-unknown"),p.style.background="",p.style.backgroundSize="",p.style.animation="",p.style.color="",p.style.webkitTextStroke="";let C=Hp(S);if(!C){p.textContent=String(S??"\u2014");return}p.textContent=C,p.classList.add("badge--rarity",`badge--rarity-${Np(C)}`)}return l==="rarity"?k(c):(p.textContent=n,h(r,o),typeof i=="boolean"&&w(i),a&&b(a)),{root:p,setLabel:x,setType:y,setBorder:b,setWithBorder:w,setRarity:k}}zt();ut();var bg={expanded:!1,sort:{key:null,dir:null},search:""},hg={categories:{}};async function yl(){let e=await an("tab-test",{version:2,defaults:hg,sanitize:a=>({categories:a.categories&&typeof a.categories=="object"?a.categories:{}})});function t(a){return e.get().categories[a]||{...bg}}function n(a,i){let s=e.get(),u=t(a);e.update({categories:{...s.categories,[a]:{...u,expanded:i}}})}function r(a,i,s){let u=e.get(),d=t(a);e.update({categories:{...u.categories,[a]:{...d,sort:{key:i,dir:s}}}})}function o(a,i){let s=e.get(),u=t(a);e.update({categories:{...s.categories,[a]:{...u,search:i}}})}return{get:e.get,set:e.set,save:e.save,getCategoryState:t,setCategoryExpanded:n,setCategorySort:r,setCategorySearch:o}}var yg={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function Mo(e){return e?yg[e]??0:0}var Ao=class extends Ee{constructor(){super({id:"tab-test",label:"Test"});ee(this,"stateCtrl",null)}async build(n){this.stateCtrl=await yl();let r=this.createContainer("test-section");r.style.display="flex",r.style.flexDirection="column",r.style.gap="12px",n.appendChild(r),await this.buildSpriteTables(r)}renderSprite(n){let r=v("div",{style:"display:flex;align-items:center;justify-content:center;width:32px;height:32px;"});if(n.spriteId){let o=n.spriteId;requestAnimationFrame(()=>{try{let a=se.toCanvas(o,{scale:1});a.style.maxWidth="32px",a.style.maxHeight="32px",a.style.objectFit="contain",r.appendChild(a)}catch{r.textContent="-"}})}else r.textContent="-";return r}renderRarity(n){if(!n.rarity){let o=v("span",{style:"opacity:0.5;"});return o.textContent="\u2014",o}return ms({variant:"rarity",rarity:n.rarity,size:"sm"}).root}createDataCard(n,r,o,a){let i=this.stateCtrl.getCategoryState(n),s=p=>{if(!p)return o;let m=p.toLowerCase();return o.filter(g=>g.name.toLowerCase().includes(m))},u=co({columns:a,data:s(i.search),pageSize:0,compact:!0,maxHeight:"calc(var(--lg-row-h, 40px) * 6)",getRowId:p=>p.spriteId,onSortChange:(p,m)=>{this.stateCtrl.setCategorySort(n,p,m)}});i.sort.key&&i.sort.dir&&u.sortBy(i.sort.key,i.sort.dir);let d=ps({placeholder:"Search...",value:i.search,debounceMs:150,withClear:!0,size:"sm",focusKey:"",onChange:p=>{let m=p.trim();this.stateCtrl.setCategorySearch(n,m),u.setData(s(m))}}),l=v("div",{style:"margin-bottom:8px;"});l.appendChild(d.root);let c=v("div");return c.appendChild(l),c.appendChild(u.root),he({title:r,subtitle:`${o.length} entries`,variant:"soft",padding:"sm",expandable:!0,defaultExpanded:i.expanded,onExpandChange:p=>{this.stateCtrl.setCategoryExpanded(n,p)}},c)}formatCategoryName(n){return n.split("-").map(r=>r.charAt(0).toUpperCase()+r.slice(1)).join(" ")}findPlantBySprite(n,r){let o=de.get("plants");if(!o)return null;for(let i of Object.values(o))if(i?.seed?.spriteId===n||i?.plant?.spriteId===n||i?.crop?.spriteId===n)return i;let a=r.toLowerCase();for(let i of Object.values(o)){let s=(i?.seed?.name||"").toLowerCase();if(s===a||s===`${a} seed`)return i}return null}findPetBySpriteId(n){let r=de.get("pets");if(!r)return null;for(let o of Object.values(r))if(o?.spriteId===n)return o;return null}findItemBySpriteId(n){let r=de.get("items");if(!r)return null;for(let o of Object.values(r))if(o?.spriteId===n)return o;return null}findDecorBySpriteId(n){let r=de.get("decor");if(!r)return null;for(let o of Object.values(r))if(o?.spriteId===n)return o;return null}findEggBySpriteId(n){let r=de.get("eggs");if(!r)return null;for(let o of Object.values(r))if(o?.spriteId===n)return o;return null}getRarityForSprite(n,r,o){let a=n.toLowerCase();if(a==="plant"||a==="seed"||a==="tallplant"){let i=this.findPlantBySprite(r,o);if(i?.seed?.rarity)return i.seed.rarity}if(a==="pet"){let i=this.findPetBySpriteId(r);if(i?.rarity)return i.rarity}if(a==="item"){let i=this.findItemBySpriteId(r);if(i?.rarity)return i.rarity}if(a==="decor"){let i=this.findDecorBySpriteId(r);if(i?.rarity)return i.rarity}if(a==="egg"){let i=this.findEggBySpriteId(r);if(i?.rarity)return i.rarity}return null}yieldToMain(n=0){return new Promise(r=>{n>0?setTimeout(r,n):typeof requestIdleCallback<"u"?requestIdleCallback(()=>r(),{timeout:50}):setTimeout(r,4)})}async buildSpriteTables(n){let r=[{key:"name",header:"Name",sortable:!0,width:"1fr",sortFn:(a,i)=>a.name.localeCompare(i.name,void 0,{numeric:!0,sensitivity:"base"})},{key:"rarity",header:"Rarity",sortable:!0,width:"100px",align:"center",render:a=>this.renderRarity(a),sortFn:(a,i)=>Mo(a.rarity)-Mo(i.rarity)},{key:"sprite",header:"Sprite",width:"60px",align:"center",render:a=>this.renderSprite(a)}];if(!se.ready())try{await se.init()}catch{return}let o=se.getCategories();for(let a=0;a<o.length;a++){await this.yieldToMain(8);let i=o[a],u=se.getCategoryId(i).map(d=>{let l=`sprite/${i}/${d}`;return{name:d,spriteId:l,rarity:this.getRarityForSprite(i,l,d)}});if(u.sort((d,l)=>Mo(d.rarity)-Mo(l.rarity)),u.length>0){let d=this.createDataCard(i,this.formatCategoryName(i),u,r);n.appendChild(d)}}}};function Io(e={}){let{id:t,checked:n=!1,disabled:r=!1,size:o="md",label:a,labelSide:i="right",onChange:s}=e,u=v("div",{className:"lg-switch-wrap"}),d=v("button",{className:`lg-switch lg-switch--${o}`,id:t,type:"button",role:"switch","aria-checked":String(!!n),"aria-disabled":String(!!r),title:a??"Basculer"}),l=v("span",{className:"lg-switch-track"}),c=v("span",{className:"lg-switch-thumb"});d.append(l,c);let p=null;a&&i!=="none"&&(p=v("span",{className:"lg-switch-label"},a)),p&&i==="left"?u.append(p,d):p&&i==="right"?u.append(d,p):u.append(d);let m=!!n,g=!!r;function f(){d.classList.toggle("on",m),d.setAttribute("aria-checked",String(m)),d.disabled=g,d.setAttribute("aria-disabled",String(g))}function h(P=!1){g||(m=!m,f(),P||s?.(m))}function b(P){P.preventDefault(),h()}function w(P){g||((P.key===" "||P.key==="Enter")&&(P.preventDefault(),h()),P.key==="ArrowLeft"&&(P.preventDefault(),y(!1)),P.key==="ArrowRight"&&(P.preventDefault(),y(!0)))}d.addEventListener("click",b),d.addEventListener("keydown",w);function x(){return m}function y(P,L=!1){m=!!P,f(),L||s?.(m)}function k(P){g=!!P,f()}function S(P){if(!P){p&&(p.remove(),p=null);return}p?p.textContent=P:(p=v("span",{className:"lg-switch-label"},P),u.append(p))}function C(){d.focus()}function I(){d.removeEventListener("click",b),d.removeEventListener("keydown",w)}return f(),{root:u,button:d,isChecked:x,setChecked:y,setDisabled:k,setLabel:S,focus:C,destroy:I}}Un();zn();var od={enabled:!1,favoriteProduceList:[],favoritePetsList:[],favoriteMutations:[]},Ye=[{id:"Rainbow",color:"#FF00FF",desc:"All Rainbow items"},{id:"Gold",color:"#EBC800",desc:"All Gold items"},{id:"Wet",color:"#5FFFFF",desc:"All Wet items"},{id:"Chilled",color:"#B4E6FF",desc:"All Chilled items"},{id:"Frozen",color:"#B9C8FF",desc:"All Frozen items"},{id:"Dawnlit",color:"#F59BE1",desc:"Dawn mutations"},{id:"Dawncharged",color:"#C896FF",desc:"Dawn charged"},{id:"Ambershine",color:"#FFB478",desc:"Amber mutations"},{id:"Ambercharged",color:"#FA8C4B",desc:"Amber charged"}],rd=["Carrot","Strawberry","Aloe","FavaBean","Delphinium","Blueberry","Apple","Tulip","OrangeTulip","Tomato","Daffodil","Corn","Watermelon","Pumpkin","Echeveria","Coconut","Banana","Lily","Camellia","Squash","BurrosTail","Mushroom","Cactus","Bamboo","Chrysanthemum","Grape","Pepper","Lemon","PassionFruit","DragonFruit","Cacao","Lychee","Sunflower","Starweaver","DawnCelestial","MoonCelestial"],ad=["Worm","Snail","Bee","Chicken","Bunny","Dragonfly","Pig","Cow","Turkey","Squirrel","Turtle","Goat","Butterfly","Peacock","Capybara"],br=class extends Ee{constructor(){super({id:"tab-auto-favorite",label:"Auto-Favorite"});ee(this,"config",od);ee(this,"allPlants",[]);ee(this,"allPets",[]);ee(this,"sectionElement",null)}async build(n){let r=this.createGrid("12px");r.id="auto-favorite-settings";let o=document.createElement("style");o.textContent=`
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
        content: '\u2713';
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
    `,n.appendChild(o),this.sectionElement=r,n.appendChild(r),this.config=Ue("gemini:features:autoFavorite:ui",od),await this.loadGameData(),await this.waitForSprites(),this.renderContent()}async loadGameData(){try{await de.waitForAnyData();let n=de.get("plants")||{},r=de.get("pets")||{};this.allPlants=Object.keys(n),this.allPets=Object.keys(r)}catch(n){console.error("[AutoFavorite UI] Failed to load game data:",n)}}async waitForSprites(){if(se.ready())return;let n=1e4,r=100,o=0;return new Promise(a=>{let i=()=>{se.ready()||o>=n?a():(o+=r,setTimeout(i,r))};i()})}renderContent(){this.sectionElement&&(this.sectionElement.innerHTML="",this.sectionElement.appendChild(this.createMasterToggle()),this.sectionElement.appendChild(this.createMutationsCard()),this.sectionElement.appendChild(this.createProduceCard()),this.sectionElement.appendChild(this.createPetsCard()))}createMasterToggle(){let n=v("div",{className:"kv"}),r=it({text:"Enable Auto-Favorite",tone:"default",size:"lg"}),o=Io({checked:this.config.enabled,onChange:a=>{this.config.enabled=a,this.saveConfig()}});return n.append(r.root,o.root),he({title:"Auto-Favorite",padding:"lg"},n,v("p",{style:"margin-top: 6px; font-size: 12px; color: var(--muted);"},"Automatically favorite items when added to inventory"))}createMutationsCard(){let n=v("div",{style:"display: grid; gap: 10px;"}),r=v("div",{style:"display: grid; grid-template-columns: 1fr 1fr; gap: 8px;"});r.appendChild(this.createMutationButton(Ye[0],{align:"center"})),r.appendChild(this.createMutationButton(Ye[1],{align:"center"})),n.appendChild(r);let o=v("div",{style:"display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;"});o.appendChild(this.createMutationButton(Ye[2],{align:"center"})),o.appendChild(this.createMutationButton(Ye[3],{align:"center"})),o.appendChild(this.createMutationButton(Ye[4],{align:"center"})),n.appendChild(o);let a=v("div",{style:"display: grid; grid-template-columns: 1fr 1fr; gap: 8px;"});a.appendChild(this.createMutationButton(Ye[5],{align:"center"})),a.appendChild(this.createMutationButton(Ye[6],{align:"center"})),n.appendChild(a);let i=v("div",{style:"display: grid; grid-template-columns: 1fr 1fr; gap: 8px;"});return i.appendChild(this.createMutationButton(Ye[7],{align:"center"})),i.appendChild(this.createMutationButton(Ye[8],{align:"center"})),n.appendChild(i),he({title:"Mutations Priority",variant:"soft",padding:"lg",expandable:!0,defaultExpanded:!0},n,v("p",{style:"margin-top: 8px; font-size: 11px; color: var(--muted);"},`${this.config.favoriteMutations.length} / ${Ye.length} active`))}createMutationButton(n,r={}){let{large:o=!1,align:a="center"}=r,i=this.config.favoriteMutations.includes(n.id),s=n.color,u=parseInt(s.slice(1,3),16),d=parseInt(s.slice(3,5),16),l=parseInt(s.slice(5,7),16),c=`rgba(${u}, ${d}, ${l}, 0.25)`,p=s;n.id==="Rainbow"&&i&&(c="linear-gradient(135deg, rgba(255,0,0,0.3) 0%, rgba(255,165,0,0.3) 20%, rgba(255,255,0,0.3) 40%, rgba(0,128,0,0.3) 60%, rgba(0,0,255,0.3) 80%, rgba(75,0,130,0.3) 100%)",p="#fff9c4");let m=v("div",{style:`padding: ${o?"14px":"8px 16px"}; border-radius: var(--card-radius, 12px); cursor: pointer; transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1); background: ${i?c:"color-mix(in oklab, var(--tab-bg) 5%, transparent)"}; border: 2px solid ${i?p:"color-mix(in oklab, var(--tab-bg) 20%, transparent)"}; display: flex; align-items: center; justify-content: center; gap: 16px; box-shadow: ${i?n.id==="Rainbow"?"0 4px 18px rgba(255,255,255,0.25)":`0 4px 12px rgba(${u}, ${d}, ${l}, 0.3)`:"none"}; opacity: ${i?"1":"0.8"};`}),g=v("div",{style:"width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(se.ready()){let b=se.toCanvas("plant","Sunflower",{mutations:[n.id],scale:.18});b.style.width="32px",b.style.height="32px",b.style.objectFit="contain",g.appendChild(b)}}catch{}let f=n.id.charAt(0).toUpperCase()+n.id.slice(1).toLowerCase(),h=v("div",{style:`font-size: ${o?"15px":"13px"}; font-weight: 600; color: var(--fg); text-shadow: 0 1px 2px rgba(0,0,0,0.5); white-space: nowrap;`},f);if(m.append(g,h),n.id==="Rainbow"||n.id==="Gold"){let b=v("div",{style:"width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(se.ready()){let w=se.toCanvas("pet","Capybara",{mutations:[n.id],scale:.18});w.style.width="32px",w.style.height="32px",w.style.objectFit="contain",b.appendChild(w)}}catch{}m.append(b)}else{let b=v("div",{style:"width: 32px; height: 32px; flex-shrink: 0;"});m.append(b)}return m.addEventListener("click",()=>{i?this.config.favoriteMutations=this.config.favoriteMutations.filter(b=>b!==n.id):this.config.favoriteMutations.push(n.id),this.saveConfig(),this.renderContent()}),m}createProduceCard(){let n=[...this.allPlants].sort((r,o)=>{let a=rd.indexOf(r),i=rd.indexOf(o);return a===-1&&i===-1?r.localeCompare(o):a===-1?1:i===-1?-1:a-i});return this.createItemSelectionCard({title:"Produce",items:n,category:"plant",selected:this.config.favoriteProduceList,onUpdate:r=>{this.config.favoriteProduceList=r,this.saveConfig()}})}createPetsCard(){let n=[...this.allPets].sort((r,o)=>{let a=ad.indexOf(r),i=ad.indexOf(o);return a===-1&&i===-1?r.localeCompare(o):a===-1?1:i===-1?-1:a-i});return this.createItemSelectionCard({title:"Pets",items:n,category:"pet",selected:this.config.favoritePetsList,onUpdate:r=>{this.config.favoritePetsList=r,this.saveConfig()}})}createItemSelectionCard(n){let{title:r,items:o,category:a,selected:i,onUpdate:s}=n,u=new Set(i),d=o,l=v("div",{style:"margin-bottom: 12px;"}),c=v("input",{type:"text",placeholder:`Search ${r.toLowerCase()}...`,style:`
                width: 100%;
                padding: 10px 14px;
                border-radius: 8px;
                border: 1px solid var(--border);
                background: var(--soft);
                color: var(--fg);
                font-size: 14px;
                outline: none;
                transition: border-color 0.2s;
            `.replace(/\s+/g," ").trim()});c.addEventListener("focus",()=>{c.style.borderColor="var(--accent)"}),c.addEventListener("blur",()=>{c.style.borderColor="var(--border)"}),l.appendChild(c);let p=v("div",{style:"display: flex; gap: 8px; margin-bottom: 12px;"}),m=st({label:"Select All",variant:"default",size:"sm",onClick:()=>{d.forEach(S=>u.add(S)),s(Array.from(u)),x.setData(f()),k()}}),g=st({label:"Deselect All",variant:"default",size:"sm",onClick:()=>{d.forEach(S=>u.delete(S)),s(Array.from(u)),x.setData(f()),k()}});p.append(m,g);let f=()=>d.map(S=>({id:S,name:S,selected:u.has(S)})),h=S=>{let C=v("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0; background: rgba(0,0,0,0.05); border-radius: 6px;"});try{if(se.ready()){let I=a,P=S;a==="plant"&&(["Bamboo","Cactus"].includes(S)&&(I="tallplant"),S==="DawnCelestial"&&(P="DawnCelestialCrop"),S==="MoonCelestial"&&(P="MoonCelestialCrop"),S==="OrangeTulip"&&(P="Tulip"));let L=se.toCanvas(I,P,{scale:.5});L.style.width="28px",L.style.height="28px",L.style.objectFit="contain",C.appendChild(L)}}catch{}return C},b=S=>{let C=v("input",{type:"checkbox",className:"game-checkbox"});return C.checked=S.selected,C.addEventListener("change",I=>{I.stopPropagation(),C.checked?u.add(S.id):u.delete(S.id),s(Array.from(u)),k()}),C},x=co({columns:[{key:"selected",header:"\u2713",width:"40px",align:"center",render:S=>b(S)},{key:"sprite",header:"",width:"40px",align:"center",render:S=>h(S.id)},{key:"name",header:"Name",width:"1fr",sortable:!0,render:S=>v("span",{style:"font-weight: 500; color: var(--fg);"},S.name)}],data:f(),maxHeight:280,compact:!0,zebra:!0,animations:!0,getRowId:S=>S.id,onRowClick:S=>{u.has(S.id)?u.delete(S.id):u.add(S.id),s(Array.from(u)),x.setData(f()),k()}});c.addEventListener("input",()=>{let S=c.value.toLowerCase().trim();S?d=o.filter(C=>C.toLowerCase().includes(S)):d=o,x.setData(f())});let y=v("p",{style:"margin-top: 8px; font-size: 11px; color: var(--muted);"}),k=()=>{y.textContent=`${u.size} / ${o.length} selected`};return k(),he({title:`${r} (${u.size}/${o.length})`,variant:"soft",padding:"lg",expandable:!0,defaultExpanded:!1},l,p,x.root,y)}createItemRow(n,r,o,a){let i=v("div",{className:`item-row ${o?"checked":""}`,style:"display: flex; align-items: center; gap: 12px; padding: 10px 14px; border-radius: 10px; cursor: pointer; transition: background 0.2s; margin-bottom: 4px;"}),s=v("input",{type:"checkbox",className:"game-checkbox"});s.checked=o;let u=r,d=n;r==="plant"&&(["Bamboo","Cactus"].includes(n)&&(u="tallplant"),n==="DawnCelestial"&&(d="DawnCelestialCrop"),n==="MoonCelestial"&&(d="MoonCelestialCrop"),n==="Starweaver"&&(d="Starweaver"),n==="OrangeTulip"&&(d="Tulip"));let l=v("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0; background: rgba(0,0,0,0.05); border-radius: 6px;"});try{if(se.ready()){let g=se.toCanvas(u,d,{scale:.5});g.style.width="28px",g.style.height="28px",g.style.objectFit="contain",l.appendChild(g)}}catch{}let c=v("span",{style:"font-size: 13px; font-weight: 600; flex: 1; color: var(--fg);"},n),p=g=>{i.classList.toggle("checked",g)},m=()=>{s.checked=!s.checked,p(s.checked),a(s.checked)};return s.addEventListener("change",g=>{g.stopPropagation(),p(s.checked),a(s.checked)}),i.addEventListener("click",m),i.append(s,l,c),i}async saveConfig(){nt("gemini:features:autoFavorite:ui",this.config);try{let{setEnabled:n,updateSimpleConfig:r}=await Promise.resolve().then(()=>(nd(),td));await r({enabled:this.config.enabled,favoriteSpecies:[...this.config.favoriteProduceList,...this.config.favoritePetsList],favoriteMutations:this.config.favoriteMutations}),await n(this.config.enabled)}catch(n){console.error("[AutoFavorite UI] Failed to apply config:",n)}}};zn();var id={autoFavorite:{enabled:!1},bulkFavorite:{enabled:!1},journalChecker:{enabled:!1},cropSizeIndicator:{enabled:!1,showForGrowing:!0,showForMature:!0,showJournalBadges:!0},eggProbabilityIndicator:{enabled:!1},cropValueIndicator:{enabled:!1},xpTracker:{enabled:!1},abilityTracker:{enabled:!1},mutationTracker:{enabled:!1},cropBoostTracker:{enabled:!1},turtleTimer:{enabled:!1}},hr=class extends Ee{constructor(){super({id:"tab-feature-settings",label:"Features"});ee(this,"config",id)}async build(n){let r=this.createGrid("12px");r.id="feature-settings",n.appendChild(r),this.config=Ue("gemini:features:config",id),r.appendChild(this.createQOLCard()),r.appendChild(this.createVisualIndicatorsCard()),r.appendChild(this.createTrackingCard())}createQOLCard(){return he({title:"Quality of Life",padding:"lg",expandable:!0,defaultExpanded:!0},this.createToggleRow("Auto-Favorite",this.config.autoFavorite.enabled,n=>{this.config.autoFavorite.enabled=n,this.saveConfig()}),this.createToggleRow("Bulk Favorite",this.config.bulkFavorite.enabled,n=>{this.config.bulkFavorite.enabled=n,this.saveConfig()}),this.createToggleRow("Journal Checker",this.config.journalChecker.enabled,n=>{this.config.journalChecker.enabled=n,this.saveConfig()}))}createVisualIndicatorsCard(){return he({title:"Visual Indicators",variant:"soft",padding:"lg",expandable:!0,defaultExpanded:!0},this.createToggleRow("Crop Size",this.config.cropSizeIndicator.enabled,n=>{this.config.cropSizeIndicator.enabled=n,this.saveConfig()},"Shows size % and journal badges"),this.createToggleRow("Egg Probability",this.config.eggProbabilityIndicator.enabled,n=>{this.config.eggProbabilityIndicator.enabled=n,this.saveConfig()},"Shows hatch chances + mutation %"),this.createToggleRow("Crop Value",this.config.cropValueIndicator.enabled,n=>{this.config.cropValueIndicator.enabled=n,this.saveConfig()},"Shows coin value"))}createTrackingCard(){return he({title:"Tracking & Analytics",variant:"soft",padding:"lg",expandable:!0,defaultExpanded:!1},this.createToggleRow("XP Tracker",this.config.xpTracker.enabled,n=>{this.config.xpTracker.enabled=n,this.saveConfig()}),this.createToggleRow("Ability Tracker",this.config.abilityTracker.enabled,n=>{this.config.abilityTracker.enabled=n,this.saveConfig()}),this.createToggleRow("Mutation Tracker",this.config.mutationTracker.enabled,n=>{this.config.mutationTracker.enabled=n,this.saveConfig()}),this.createToggleRow("Crop Boost Tracker",this.config.cropBoostTracker.enabled,n=>{this.config.cropBoostTracker.enabled=n,this.saveConfig()}),this.createToggleRow("Turtle Timer",this.config.turtleTimer.enabled,n=>{this.config.turtleTimer.enabled=n,this.saveConfig()}))}createToggleRow(n,r,o,a){let i=v("div",{className:a?"kv-col":"kv"}),s=v("div",{className:"kv"}),u=it({text:n,tone:"default",size:"md"}),d=Io({checked:r,onChange:o});if(s.append(u.root,d.root),a){i.appendChild(s);let l=v("p",{className:"helper-text",style:"font-size: 12px; color: var(--item-desc, var(--muted)); margin-top: 4px;"},a);return i.appendChild(l),i}return s}saveConfig(){nt("gemini:features:config",this.config),console.log("[FeatureSettings] Config saved:",this.config)}};var yr=class extends Ee{constructor(){super({id:"tab-journal-checker",label:"Journal"});ee(this,"progress",null)}async build(n){this.container=n;let r=this.createGrid("12px");r.id="journal-checker",n.appendChild(r),await this.updateProgress();let o=(a=>{this.progress=a.detail,this.renderContent()});window.addEventListener("gemini:journal-updated",o),this.addCleanup(()=>{window.removeEventListener("gemini:journal-updated",o)})}async updateProgress(){try{let{aggregateJournalProgress:n}=await Promise.resolve().then(()=>(dd(),ud));this.progress=await n(),this.renderContent()}catch(n){console.error("[JournalChecker] Failed to load progress:",n)}}renderContent(){if(!this.container)return;let n=this.container.querySelector("#journal-checker");if(n){if(n.innerHTML="",!this.progress){n.appendChild(this.createLoadingCard());return}n.appendChild(this.createProgressCard()),n.appendChild(this.createActionsCard())}}createLoadingCard(){return he({title:"Loading...",padding:"lg"},v("p",{},"Fetching journal data..."))}createProgressCard(){if(!this.progress)return v("div");let n=this.createProgressRow("\u{1F331} Plants",this.progress.plants.logged,this.progress.plants.total,this.progress.plants.percentage),r=this.createProgressRow("\u{1F43E} Pets",this.progress.pets.logged,this.progress.pets.total,this.progress.pets.percentage),o=this.createProgressRow("\u{1F3A8} Decor",this.progress.decor.logged,this.progress.decor.total,this.progress.decor.percentage);return he({title:"Collection Progress",padding:"lg",expandable:!0,defaultExpanded:!0},n,r,o)}createProgressRow(n,r,o,a){let i=v("div",{className:"kv-col",style:"gap: 6px;"}),s=v("div",{className:"kv"}),u=it({text:n,tone:"default",size:"md"}),d=v("span",{style:"font-size: 13px; color: var(--item-desc, var(--muted));"},`${r}/${o}`);s.append(u.root,d);let l=v("div",{style:`
        width: 100%;
        height: 6px;
        background: var(--card-bg, var(--soft));
        border-radius: 3px;
        overflow: hidden;
      `}),c=v("div",{style:`
        width: ${a}%;
        height: 100%;
        background: linear-gradient(90deg, var(--tab-bg, var(--accent)), var(--group-title, var(--pill-to)));
        transition: width 0.3s ease;
      `});return l.appendChild(c),i.append(s,l),i}createActionsCard(){let n=st({label:"\u{1F504} Refresh",variant:"default",size:"md",onClick:async()=>{await this.updateProgress()}}),r=st({label:"\u{1F4CB} Show Missing",variant:"default",size:"md",onClick:()=>{this.showMissingItems()}}),o=v("div",{style:"display: flex; gap: 8px; flex-wrap: wrap;"});return o.append(n,r),he({title:"Actions",variant:"soft",padding:"lg",expandable:!0,defaultExpanded:!1},o)}showMissingItems(){if(!this.progress)return;let n=[{category:"Plants",items:this.progress.plants.missing},{category:"Pets",items:this.progress.pets.missing},{category:"Decor",items:this.progress.decor.missing}].filter(r=>r.items.length>0);if(n.length===0){console.log("\u{1F389} [JournalChecker] Collection complete!");return}console.group("\u{1F4CB} Missing Items"),n.forEach(r=>{console.group(`${r.category} (${r.items.length})`),r.items.forEach(o=>console.log(`- ${o}`)),console.groupEnd()}),console.groupEnd()}};var ki=null;function pd(){return ki||(ki=new Ao),ki}async function Ci(){await pd().preload()}function Pi(e){return[new lo(e),new hr,new br,new yr,pd()]}ye();function Mi(e){let{shadow:t,initialOpen:n}=e,r=v("div",{className:"gemini-panel",id:"panel",ariaHidden:String(!n)}),o=v("div",{className:"gemini-tabbar"}),a=v("div",{className:"gemini-content",id:"content"}),i=v("div",{className:"gemini-resizer",title:"Resize"}),s=v("button",{className:"gemini-close",title:"Fermer",ariaLabel:"Fermer"},"\u2715");r.append(o,a,i);let u=v("div",{className:"gemini-wrapper"},r);return t.append(u),{panel:r,tabbar:o,content:a,resizer:i,closeButton:s,wrapper:u}}Gt();ye();function Ai(e){let{resizer:t,host:n,panel:r,shadow:o,onWidthChange:a,initialWidth:i,minWidth:s,maxWidth:u}=e,d=s,l=u;function c(){let k=Le.detect(),S=Math.round(A.visualViewport?.width??A.innerWidth??0);if(k.platform==="mobile"||k.os==="ios"||k.os==="android"){let C=getComputedStyle(o.host),I=parseFloat(C.getPropertyValue("--inset-l"))||0,P=parseFloat(C.getPropertyValue("--inset-r"))||0,L=Math.max(280,S-Math.round(I+P)),D=Math.min(420,Math.max(300,Math.floor(S*.66))),K=L;d=Math.min(D,L),l=K}else d=s,l=u;return{min:d,max:l}}function p(k){return Math.max(d,Math.min(l,Number(k)||i))}function m(k){let S=p(k);n.style.setProperty("--w",`${S}px`),a(S)}c();let g=Le.detect(),f=!(g.platform==="mobile"||g.os==="ios"||g.os==="android"),h=!1,b=k=>{if(!h)return;k.preventDefault();let S=Math.round(A.innerWidth-k.clientX);m(S)},w=()=>{h&&(h=!1,document.body.style.cursor="",A.removeEventListener("mousemove",b),A.removeEventListener("mouseup",w))},x=k=>{f&&(k.preventDefault(),h=!0,document.body.style.cursor="ew-resize",A.addEventListener("mousemove",b),A.addEventListener("mouseup",w))};t.addEventListener("mousedown",x);function y(){t.removeEventListener("mousedown",x),A.removeEventListener("mousemove",b),A.removeEventListener("mouseup",w)}return{calculateResponsiveBounds:c,constrainWidthToLimits:p,setHudWidth:m,destroy:y}}function Ii(e){let{panel:t,onToggle:n,onClose:r,toggleCombo:o=u=>u.ctrlKey&&u.shiftKey&&u.key.toLowerCase()==="u",closeOnEscape:a=!0}=e;function i(u){let d=t.classList.contains("open");if(a&&u.key==="Escape"&&d){r();return}o(u)&&(u.preventDefault(),u.stopPropagation(),n())}document.addEventListener("keydown",i,{capture:!0});function s(){document.removeEventListener("keydown",i,{capture:!0})}return{destroy:s}}var md=`
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
`;var Ei=`
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
`;var Li=`
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
`;var Di=`
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
`;function Ri(e,t,n){if(e.querySelector(`style[data-style-id="${n}"]`))return;let r=document.createElement("style");r.setAttribute("data-style-id",n),r.textContent=t,e.appendChild(r)}var gd=`
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
  
`;var fd=`
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
`;var bd=`
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
`;var hd=`
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
`;var yd=`
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
`;var vd=`
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
`;var xd=`
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
`;var Sd=`
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
`;var wd=`
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
`;var Td=`
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
`;var kd=`
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
`;var Cd=`
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
`;var Pd=`
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
`;var Md=`
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
`;var Ad=`
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
`;var Id=`
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
`;var Ed=`
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
`;var Lx={all:"initial",position:"fixed",top:"0",right:"0",zIndex:"2147483647",pointerEvents:"auto",fontFamily:'system-ui, -apple-system, "Segoe UI", Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',fontSize:"13px",lineHeight:"1.35"};function Dx(e="gemini-root"){let t=document.createElement("div");t.id=e,Object.assign(t.style,Lx),(document.body||document.documentElement).appendChild(t);let n=t.attachShadow({mode:"open"});return{host:t,shadow:n}}function Rx(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:16}):setTimeout(e,0)})}async function Oi(e){let{hostId:t="gemini-hud-root",initialWidth:n,initialOpen:r,onWidthChange:o,onOpenChange:a,themes:i,initialTheme:s,onThemeChange:u,buildSections:d,initialTab:l,onTabChange:c,toggleCombo:p=M=>M.ctrlKey&&M.shiftKey&&M.key.toLowerCase()==="u",closeOnEscape:m=!0,minWidth:g=420,maxWidth:f=720}=e,{host:h,shadow:b}=Dx(t),w=[[Ei,"variables"],[Li,"primitives"],[Di,"utilities"],[md,"hud"],[gd,"card"],[fd,"badge"],[bd,"button"],[hd,"input"],[yd,"label"],[vd,"navTabs"],[xd,"searchBar"],[Sd,"select"],[wd,"switch"],[Td,"table"],[kd,"timeRangePicker"],[Cd,"tooltip"],[Pd,"slider"],[Md,"reorderableList"],[Ad,"colorPicker"],[Id,"log"],[Ed,"settings"]];for(let M=0;M<w.length;M++){let[R,G]=w[M];Ri(b,R,G),M%5===4&&await Rx()}let{panel:x,tabbar:y,content:k,resizer:S,closeButton:C,wrapper:I}=Mi({shadow:b,initialOpen:r});function P(M){x.dispatchEvent(new CustomEvent("gemini:hud-open-change",{detail:{isOpen:M},bubbles:!0})),a?.(M)}function L(M){let R=x.classList.contains("open");x.classList.toggle("open",M),x.setAttribute("aria-hidden",M?"false":"true"),M!==R&&P(M)}L(r),C.addEventListener("click",M=>{M.preventDefault(),M.stopPropagation(),L(!1)});let D=Mr({host:h,themes:i,initialTheme:s,onThemeChange:u}),K=Ai({resizer:S,host:h,panel:x,shadow:b,onWidthChange:o||(()=>{}),initialWidth:n,minWidth:g,maxWidth:f});K.setHudWidth(n);let ae=d({applyTheme:D.applyTheme,initialTheme:s,getCurrentTheme:D.getCurrentTheme,setHUDWidth:K.setHudWidth,setHUDOpen:L}),J=new on(ae,k,{applyTheme:D.applyTheme,getCurrentTheme:D.getCurrentTheme}),Q=ae.map(M=>({id:M.id,label:M.label})),ue=Yi(Q,l||Q[0]?.id||"",M=>{J.activate(M),c?.(M)});ue.root.style.flex="1 1 auto",ue.root.style.minWidth="0",y.append(ue.root,C),J.activate(l||Q[0]?.id||"");let _=Ii({panel:x,onToggle:()=>L(!x.classList.contains("open")),onClose:()=>L(!1),toggleCombo:p,closeOnEscape:m}),N=()=>{ue.recalc();let M=parseInt(getComputedStyle(h).getPropertyValue("--w"))||n;K.calculateResponsiveBounds(),K.setHudWidth(M)};A.addEventListener("resize",N);function H(){_.destroy(),K.destroy(),A.removeEventListener("resize",N)}return{host:h,shadow:b,wrapper:I,panel:x,content:k,setOpen:L,setWidth:K.setHudWidth,sections:ae,manager:J,nav:ue,destroy:H}}var en={isOpen:"gemini.hud.isOpen",width:"gemini.hud.width",theme:"gemini.hud.theme",activeTab:"gemini.hud.activeTab"},Jn={isOpen:!1,width:480,theme:"dark",activeTab:"tab-settings"};function Gi(){return{isOpen:at(en.isOpen,Jn.isOpen),width:at(en.width,Jn.width),theme:at(en.theme,Jn.theme),activeTab:at(en.activeTab,Jn.activeTab)}}function tn(e,t){rn(en[e],t)}var Ox="https://i.imgur.com/IMkhMur.png",Gx="Stats";function vr(e){let t=e.iconUrl||Ox,n=e.ariaLabel||"Open MGH",r=null,o=null,a=null,i=!1,s=null,u=null,d=["Chat","Leaderboard","Stats","Open Activity Log"],l=x=>{try{return typeof CSS<"u"&&CSS&&typeof CSS.escape=="function"?CSS.escape(x):x.replace(/"/g,'\\"')}catch{return x}};function c(){let x=document.querySelector(d.map(k=>`button[aria-label="${l(k)}"]`).join(","));if(!x)return null;let y=x.parentElement;for(;y&&y!==document.body;){if(d.reduce((S,C)=>S+y.querySelectorAll(`button[aria-label="${l(C)}"]`).length,0)>=2)return y;y=y.parentElement}return null}function p(x){return x}function m(x){let y=Array.from(x.querySelectorAll("button[aria-label]"));if(!y.length)return{refBtn:null,refWrapper:null};let k=y.filter(K=>K.dataset.mghBtn!=="true"&&(K.getAttribute("aria-label")||"")!==(e.ariaLabel||"Open MGH")),S=k.length?k:y,C=S.find(K=>(K.getAttribute("aria-label")||"").toLowerCase()===Gx.toLowerCase())||null,I=S.length>=2?S.length-2:S.length-1,P=C||S[I],L=P.parentElement,D=L&&L.parentElement===x&&L.tagName==="DIV"?L:null;return{refBtn:P,refWrapper:D}}function g(x,y,k){let S=x.cloneNode(!1);S.type="button",S.setAttribute("aria-label",y),S.title=y,S.dataset.mghBtn="true",S.style.pointerEvents="auto",S.removeAttribute("id");let C=document.createElement("img");return C.src=k,C.alt="MGH",C.style.pointerEvents="none",C.style.userSelect="none",C.style.width="76%",C.style.height="76%",C.style.objectFit="contain",C.style.display="block",C.style.margin="auto",S.appendChild(C),S.addEventListener("click",I=>{I.preventDefault(),I.stopPropagation();try{e.onClick?.()}catch{}}),S}function f(){if(i)return!1;i=!0;let x=!1;try{let y=c();if(!y)return!1;s!==y&&(s=y);let{refBtn:k,refWrapper:S}=m(y);if(!k)return!1;o=y.querySelector('div[data-mgh-wrapper="true"]'),!o&&S&&(o=S.cloneNode(!1),o.dataset.mghWrapper="true",o.removeAttribute("id"),x=!0);let C=o?.querySelector('button[data-mgh-btn="true"]')||null;r||(r=C),r||(r=g(k,n,t),o?o.appendChild(r):r.parentElement!==y&&y.appendChild(r),x=!0),o&&o.parentElement!==y&&(y.appendChild(o),x=!0);let I=y;if(I&&I!==u){try{w.disconnect()}catch{}u=I,w.observe(u,{childList:!0,subtree:!0})}return x}finally{i=!1}}f();let h=document.getElementById("App")||document.body,b=null,w=new MutationObserver(x=>{let y=x.every(S=>{let C=Array.from(S.addedNodes||[]),I=Array.from(S.removedNodes||[]),P=C.concat(I);if(P.length===0){let L=S.target;return o&&(L===o||o.contains(L))||r&&(L===r||r.contains(L))}return P.every(L=>!!(!(L instanceof HTMLElement)||o&&(L===o||o.contains(L))||r&&(L===r||r.contains(L))))}),k=x.some(S=>Array.from(S.removedNodes||[]).some(C=>C instanceof HTMLElement?!!(o&&(C===o||o.contains(C))||r&&(C===r||r.contains(C))):!1));y&&!k||b===null&&(b=window.setTimeout(()=>{if(b=null,f()&&o){let C=o.parentElement;C&&C.lastElementChild!==o&&C.appendChild(o)}},150))});return w.observe(h,{childList:!0,subtree:!0}),a=()=>w.disconnect(),()=>{try{a?.()}catch{}try{o?.remove()}catch{}}}mr();ye();var Wx={},Rd=[];function Hx(){return Rd.slice()}function Nx(e){Rd.push(e)}function Od(e){try{return JSON.parse(e)}catch{return}}function Ld(e){if(typeof e=="string"){let t=Od(e);return t!==void 0?t:e}return e}function Gd(e){if(e!=null){if(typeof e=="string"){let t=Od(e);return t!==void 0?Gd(t):e}if(Array.isArray(e)&&typeof e[0]=="string")return e[0];if(typeof e=="object"){let t=e;return t.type??t.Type??t.kind??t.messageType}}}function _x(e){let t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function F(e,t,n){let r=typeof t=="boolean"?t:!0,o=typeof t=="function"?t:n,a=(i,s)=>{if(Gd(i)!==e)return;let d=o(i,s);return d&&typeof d=="object"&&"kind"in d?d:typeof d=="boolean"?d?void 0:{kind:"drop"}:r?void 0:{kind:"drop"}};return Nx(a),a}var qn=new WeakSet,Dd=new WeakMap;function Hd(e){let t=e.pageWindow,n=!!e.debug,r=e.middlewares&&e.middlewares.length?e.middlewares:Hx();if(!r.length)return()=>{};let o=p=>({ws:p,pageWindow:t,debug:n}),a=(p,m)=>{let g=p;for(let f of r){let h=f(g,o(m));if(h){if(h.kind==="drop")return{kind:"drop"};h.kind==="replace"&&(g=h.message)}}return g!==p?{kind:"replace",message:g}:void 0},i=null,s=null,u=null,d=()=>{let p=t?.MagicCircle_RoomConnection,m=p?.sendMessage;if(!p||typeof m!="function")return!1;if(qn.has(m))return!0;let g=m.bind(p);function f(...h){let b=h.length===1?h[0]:h,w=Ld(b),x=a(w,_x(t));if(x?.kind==="drop"){n&&console.log("[WS] drop outgoing (RoomConnection.sendMessage)",w);return}if(x?.kind==="replace"){let y=x.message;return h.length>1&&Array.isArray(y)?(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",w,"=>",y),g(...y)):(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",w,"=>",y),g(y))}return g(...h)}qn.add(f),Dd.set(f,m);try{p.sendMessage=f,qn.add(p.sendMessage),n&&console.log("[WS] outgoing patched via MagicCircle_RoomConnection.sendMessage")}catch{return!1}return i=()=>{try{p.sendMessage===f&&(p.sendMessage=m)}catch{}},!0};(()=>{let p=t?.WebSocket?.prototype,m=p?.send;if(typeof m!="function"||qn.has(m))return;function g(f){let h=Ld(f),b=a(h,this);if(b?.kind==="drop"){n&&console.log("[WS] drop outgoing (ws.send)",h);return}if(b?.kind==="replace"){let w=b.message,x=typeof w=="string"||w instanceof ArrayBuffer||w instanceof Blob?w:JSON.stringify(w);return n&&console.log("[WS] replace outgoing (ws.send)",h,"=>",w),m.call(this,x)}return m.call(this,f)}qn.add(g),Dd.set(g,m);try{p.send=g,n&&console.log("[WS] outgoing patched via WebSocket.prototype.send")}catch{return}s=()=>{try{p.send===g&&(p.send=m)}catch{}}})();let c=e.waitForRoomConnectionMs??4e3;if(!d()&&c>0){let p=Date.now();u=setInterval(()=>{if(d()){clearInterval(u),u=null;return}Date.now()-p>c&&(clearInterval(u),u=null,n&&console.log("[WS] RoomConnection not found, only ws.send is patched"))},250)}return()=>{if(u){try{clearInterval(u)}catch{}u=null}if(i){try{i()}catch{}i=null}if(s){try{s()}catch{}s=null}}}(function(){try{let t=Wx,n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();var Ux={},_d=[];function Fx(){return _d.slice()}function Nd(e){_d.push(e)}function Bx(e){if(e!=null){if(typeof e=="object"){let t=e;if(typeof t.type=="string")return t.type;if(typeof t.Type=="string")return t.Type;if(typeof t.kind=="string")return t.kind;if(typeof t.messageType=="string")return t.messageType}if(Array.isArray(e)&&typeof e[0]=="string")return e[0]}}function jx(e){if(typeof e=="string")try{return JSON.parse(e)}catch{return e}return e}var Hi=Symbol.for("ariesmod.ws.handlers.patched");function be(e,t){if(typeof e=="string"){let o=e,a={match:i=>i.kind==="message"&&i.type===o,handle:t};return Nd(a),a}let n=e,r={match:o=>o.kind==="close"&&o.code===n,handle:t};return Nd(r),r}function Wd(e,t=Fx(),n={}){let r=n.pageWindow??window,o=!!n.debug;if(e[Hi])return()=>{};e[Hi]=!0;let a={ws:e,pageWindow:r,debug:o},i=c=>{for(let p of t)try{if(!p.match(c))continue;if(p.handle(c,a)===!0)return}catch(m){o&&console.error("[WS] handler error",m,c)}},s=c=>{let p=jx(c.data),m=Bx(p);i({kind:"message",raw:c.data,data:p,type:m})},u=c=>{i({kind:"close",code:c.code,reason:c.reason,wasClean:c.wasClean,event:c})},d=c=>i({kind:"open",event:c}),l=c=>i({kind:"error",event:c});return e.addEventListener("message",s),e.addEventListener("close",u),e.addEventListener("open",d),e.addEventListener("error",l),()=>{try{e.removeEventListener("message",s)}catch{}try{e.removeEventListener("close",u)}catch{}try{e.removeEventListener("open",d)}catch{}try{e.removeEventListener("error",l)}catch{}try{delete e[Hi]}catch{}}}(function(){try{let t=Ux,n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();ot();be(4800,(e,t)=>{t.debug&&console.log("[WS][Close] Auth failure",e.code,e.reason)});be(4300,(e,t)=>{t.debug&&console.log("[WS][Close] Superseded",e.code,e.reason)});be(4400,(e,t)=>{t.debug&&console.log("[WS][Close] Heartbeat expired",e.code,e.reason)});be(4500,(e,t)=>{t.debug&&console.log("[WS][Close] Player kicked",e.code,e.reason)});be(4200,(e,t)=>{t.debug&&console.log("[WS][Close] Player left voluntarily",e.code,e.reason)});be(4100,(e,t)=>{t.debug&&console.log("[WS][Close] Reconnect initiated",e.code,e.reason)});be(4310,(e,t)=>{t.debug&&console.log("[WS][Close] Server disposed",e.code,e.reason)});be(4250,(e,t)=>{t.debug&&console.log("[WS][Close] User session superseded",e.code,e.reason)});be(4710,(e,t)=>{t.debug&&console.log("[WS][Close] Version expired",e.code,e.reason)});be(4700,(e,t)=>{t.debug&&console.log("[WS][Close] Version mismatch",e.code,e.reason)});ot();be(qe.Config,(e,t)=>{t.debug&&console.log("[WS][STC] Config",e.data)});be(qe.CurrencyTransaction,(e,t)=>{t.debug&&console.log("[WS][STC] CurrencyTransaction",e.data)});be(qe.Emote,(e,t)=>{t.debug&&console.log("[WS][STC] Emote",e.data)});be(qe.InappropriateContentRejected,(e,t)=>{t.debug&&console.log("[WS][STC] InappropriateContentRejected",e.data)});be(qe.PartialState,(e,t)=>{t.debug&&console.log("[WS][STC] PartialState",e.data)});be(qe.Pong,(e,t)=>{t.debug&&console.log("[WS][STC] Pong",e.data)});be(qe.ServerErrorMessage,(e,t)=>{t.debug&&console.log("[WS][STC] ServerErrorMessage",e.data)});be(qe.Welcome,(e,t)=>{t.debug&&console.log("[WS][STC] Welcome",e.data)});ot();F(E.PlantSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantSeed"),!!1));F(E.WaterPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] WaterPlant"),!!1));F(E.HarvestCrop,(e,t)=>(t.debug&&console.log("[MW][Garden] HarvestCrop"),!!1));F(E.SellAllCrops,(e,t)=>(t.debug&&console.log("[MW][Garden] SellAllCrops"),!!1));F(E.PurchaseSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseSeed"),!!1));F(E.PurchaseEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseEgg"),!!1));F(E.PurchaseTool,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseTool"),!!1));F(E.PurchaseDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseDecor"),!!1));F(E.PlantEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantEgg"),!!1));F(E.HatchEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] HatchEgg"),!!1));F(E.PlantGardenPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantGardenPlant"),!!1));F(E.PotPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PotPlant"),!!1));F(E.MutationPotion,(e,t)=>(t.debug&&console.log("[MW][Garden] MutationPotion"),!!1));F(E.PickupDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PickupDecor"),!!1));F(E.PlaceDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PlaceDecor"),!!1));F(E.RemoveGardenObject,(e,t)=>(t.debug&&console.log("[MW][Garden] RemoveGardenObject"),!!1));ot();F(E.MoveInventoryItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveInventoryItem"),!!1));F(E.DropObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] DropObject"),!!1));F(E.PickupObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] PickupObject"),!!1));F(E.ToggleFavoriteItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] ToggleFavoriteItem"),!!1));F(E.PutItemInStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] PutItemInStorage"),!!1));F(E.RetrieveItemFromStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] RetrieveItemFromStorage"),!!1));F(E.MoveStorageItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveStorageItem"),!!1));F(E.LogItems,(e,t)=>(t.debug&&console.log("[MW][Inventory] LogItems"),!!1));ot();F(E.PlacePet,(e,t)=>(t.debug&&console.log("[MW][Pets] PlacePet"),!!1));F(E.FeedPet,(e,t)=>(t.debug&&console.log("[MW][Pets] FeedPet"),!!1));F(E.PetPositions,(e,t)=>(t.debug&&console.log("[MW][Pets] PetPositions"),!!1));F(E.SwapPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SwapPet"),!!1));F(E.StorePet,(e,t)=>(t.debug&&console.log("[MW][Pets] StorePet"),!!1));F(E.NamePet,(e,t)=>(t.debug&&console.log("[MW][Pets] NamePet"),!!1));F(E.SellPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SellPet"),!!1));ot();console.log("[WS] TESTTEST");F(E.SetSelectedGame,(e,t)=>(t.debug&&console.log("[MW][Session] SetSelectedGame"),!!1));F(E.VoteForGame,(e,t)=>(t.debug&&console.log("[MW][Session] VoteForGame"),!!1));F(E.RequestGame,(e,t)=>(t.debug&&console.log("[MW][Session] RequestGame"),!!1));F(E.RestartGame,(e,t)=>(t.debug&&console.log("[MW][Session] RestartGame"),!!1));F(E.Ping,(e,t)=>(t.debug&&console.log("[MW][Session] Ping"),!!1));F(E.PlayerPosition,(e,t)=>(t.debug&&console.log("[MW][Session] PlayerPosition"),!!1));F(E.Teleport,(e,t)=>(t.debug&&console.log("[MW][Session] Teleport"),!!1));F(E.CheckWeatherStatus,(e,t)=>(t.debug&&console.log("[MW][Session] CheckWeatherStatus"),!!1));ot();F(E.Chat,(e,t)=>(t.debug&&console.log("[MW][Social] Chat"),!!1));F(E.Dev,(e,t)=>(t.debug&&console.log("[MW][Social] Dev"),!!1));F(E.Emote,(e,t)=>(t.debug&&console.log("[MW][Social] Emote"),!!1));F(E.Wish,(e,t)=>(t.debug&&console.log("[MW][Social] Wish"),!!1));F(E.KickPlayer,(e,t)=>(t.debug&&console.log("[MW][Social] KickPlayer"),!!1));F(E.ReportSpeakingStart,(e,t)=>(t.debug&&console.log("[MW][Voice] ReportSpeakingStart"),!!1));F(E.SetPlayerData,(e,t)=>(t.debug&&console.log("[MW][Social] SetPlayerData"),!!1));F(E.UsurpHost,(e,t)=>(t.debug&&console.log("[MW][Social] UsurpHost"),!!1));function zx(e={}){let t=e.pageWindow??A,n=e.pollMs??500,r=!!e.debug,o=[];o.push(ou(t,{debug:r})),o.push(Hd({pageWindow:t,middlewares:e.middlewares,debug:r}));let a=null,i=s=>{if(a){try{a()}catch{}a=null}s&&(a=Wd(s,e.handlers,{debug:r,pageWindow:t}))};return i(Vn(t).ws),o.push(pr(s=>i(s.ws),{intervalMs:n,debug:r,pageWindow:t})),{getWs:()=>Vn(t).ws,dispose:()=>{for(let s=o.length-1;s>=0;s--)try{o[s]()}catch{}if(a){try{a()}catch{}a=null}}}}var xr=null;function Fd(e={}){return xr||(xr=zx(e),xr)}mr();Un();wt();dr();gr();ut();zt();function _i(e){e.logStep("WebSocket","Capturing WebSocket...");let t=null;return t=pr(n=>{n.ws&&(e.logStep("WebSocket","WebSocket captured","success"),t?.(),t=null)},{intervalMs:250}),Fd({debug:!1}),()=>{t?.(),t=null}}async function Wi(e){e.logStep("Atoms","Prewarming Jotai store...");try{await ea(),await Do({timeoutMs:8e3,intervalMs:50}),e.logStep("Atoms","Jotai store ready","success")}catch(t){e.logStep("Atoms","Jotai store not captured yet","error"),console.warn("[Bootstrap] Jotai store wait failed",t)}}function Fi(e){e.logStep("Globals","Initializing global variables...");try{cr(),e.logStep("Globals","Global variables ready","success")}catch(t){e.logStep("Globals","Failed to initialize global variables","error"),console.warn("[Bootstrap] Global variables init failed",t)}}function Bi(e){e.logStep("API","Exposing Gemini API...");try{Qu(),e.logStep("API","Gemini API ready","success")}catch(t){e.logStep("API","Failed to expose API","error"),console.warn("[Bootstrap] API init failed",t)}}function Ni(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0)})}async function ji(e){e.logStep("HUD","Loading HUD preferences..."),await Ni();let t=Gi();await Ni();let n=await Oi({hostId:"gemini-hud-root",initialWidth:t.width,initialOpen:t.isOpen,onWidthChange:r=>tn("width",r),onOpenChange:r=>tn("isOpen",r),themes:lt,initialTheme:t.theme,onThemeChange:r=>tn("theme",r),buildSections:r=>Pi({applyTheme:r.applyTheme,initialTheme:r.initialTheme,getCurrentTheme:r.getCurrentTheme}),initialTab:t.activeTab,onTabChange:r=>tn("activeTab",r)});return await Ni(),e.logStep("HUD","HUD ready","success"),n}async function Ui(e){e.setSubtitle("Activating Gemini modules..."),await Zc(t=>{t.status==="start"?e.logStep(t.name,`Loading ${t.name}...`):t.status==="success"?e.logStep(t.name,`${t.name} ready`,"success"):e.logStep(t.name,`${t.name} encountered an issue.`,"error")})}async function zi(e){e.logStep("Sprites","Warming up sprite cache...");try{se.ready()||await se.init();let t=[],n=de.get("plants");if(n)for(let i of Object.values(n))i?.seed?.spriteId&&t.push(i.seed.spriteId),i?.plant?.spriteId&&t.push(i.plant.spriteId),i?.crop?.spriteId&&t.push(i.crop.spriteId);let r=de.get("pets");if(r)for(let i of Object.values(r))i?.spriteId&&t.push(i.spriteId);let o=[...new Set(t)],a=o.length;if(a===0){e.logStep("Sprites","No sprites to warmup","success");return}await se.warmup(o,(i,s)=>{e.logStep("Sprites",`Loading sprites (${i}/${s})...`)},5),e.logStep("Sprites",`${a} sprites loaded`,"success")}catch(t){e.logStep("Sprites","Sprite warmup failed","error"),console.warn("[Bootstrap] Sprite warmup failed",t)}}async function Vi(e){e.logStep("Sections","Preloading UI sections...");try{await Ci(),e.logStep("Sections","Sections preloaded","success")}catch(t){e.logStep("Sections","Sections preload failed","error"),console.warn("[Bootstrap] Sections preload failed",t)}}(async function(){"use strict";let e=wr({title:"Gemini is loading",subtitle:"Connecting and preparing modules..."}),t=null;try{t=_i(e),await Wi(e),Fi(e),Bi(e),await Ui(e),await zi(e),await Vi(e),e.succeed("Gemini is ready!")}catch(r){e.fail("Failed to initialize the mod.",r)}finally{t?.()}let n=await ji(e);vr({onClick:()=>n.setOpen(!0)})})();})();
