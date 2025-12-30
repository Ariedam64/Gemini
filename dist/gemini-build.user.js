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
"use strict";(()=>{var ts=Object.defineProperty;var Xd=(e,t,n)=>t in e?ts(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var G=(e,t)=>()=>(e&&(t=e(e=0)),t);var Ot=(e,t)=>{for(var n in t)ts(e,n,{get:t[n],enumerable:!0})};var oe=(e,t,n)=>Xd(e,typeof t!="symbol"?t+"":t,n);function ap(){try{let e=window.visualViewport,t=Math.round((e?.width??window.innerWidth)||0),n=Math.round((e?.height??window.innerHeight)||0);if(t&&n)return t>=n?"landscape":"portrait"}catch{}return"unknown"}function ds(){let e=navigator.userAgent||"",t=navigator.platform||"",n=navigator.userAgentData;if(n&&typeof n.platform=="string"){let o=n.platform.toLowerCase();if(o.includes("windows"))return"windows";if(o.includes("mac"))return"mac";if(o.includes("android"))return"android";if(o.includes("chrome os")||o.includes("cros"))return"chromeos";if(o.includes("linux"))return"linux";if(o.includes("ios"))return"ios"}return/iPhone|iPad|iPod/i.test(e)||t==="MacIntel"&&(navigator.maxTouchPoints??0)>1?"ios":/Android/i.test(e)?"android":/CrOS/i.test(e)?"chromeos":/Win/i.test(e)?"windows":/Mac/i.test(e)?"mac":/Linux/i.test(e)?"linux":"unknown"}function ps(){let e=navigator.userAgent||"",t=navigator.userAgentData;if(t&&Array.isArray(t.brands)){let n=t.brands.map(i=>String(i.brand||i.brandName||i.brandVersion||i)),r=n.some(i=>/Edge/i.test(i)||/Microsoft Edge/i.test(i)),o=n.some(i=>/Opera/i.test(i)||/OPR/i.test(i)),a=n.some(i=>/Chrome|Chromium/i.test(i));if(r)return"Edge";if(o)return"Opera";if(a)return"Chrome";if(navigator.brave)return"Brave"}return/FxiOS/i.test(e)?"Firefox":/CriOS/i.test(e)?"Chrome":/EdgiOS/i.test(e)?"Edge":/OPiOS|OPR|Opera Mini|Opera/i.test(e)?"Opera":/Edg\//i.test(e)?"Edge":/OPR\//i.test(e)||/Opera/i.test(e)?"Opera":/Firefox/i.test(e)?"Firefox":/Safari/i.test(e)&&!/Chrome|Chromium|Edg|OPR/i.test(e)?"Safari":/Brave/i.test(e)||window.Brave||navigator.brave?"Brave":/Chrome|Chromium/i.test(e)?"Chrome":"Unknown"}function ip(){let e=navigator.userAgent||"",t=navigator.userAgentData;return t&&typeof t.mobile=="boolean"?t.mobile?"mobile":"desktop":/Android|iPhone|iPad|iPod|Mobile/i.test(e)?"mobile":"desktop"}function sp(e){if(!e)return null;try{return new URL(e).hostname}catch{return null}}function Ar(){let e=(()=>{try{return window.top!==window.self}catch{return!0}})(),t=sp(document.referrer),r=e&&!!t&&/(^|\.)discord(app)?\.com$/i.test(t)?"discord":"web",o=ip(),a=ds(),i=ps(),s=window.screen||{},u=window.visualViewport,d=Math.round(window.innerWidth||document.documentElement.clientWidth||0),l=Math.round(window.innerHeight||document.documentElement.clientHeight||0),c=Math.round(u?.width??d),p=Math.round(u?.height??l),m=Math.round(s.width||0),f=Math.round(s.height||0),g=Math.round(s.availWidth||m),h=Math.round(s.availHeight||f),b=Number.isFinite(window.devicePixelRatio)?window.devicePixelRatio:1;return{surface:r,host:location.hostname,origin:location.origin,isInIframe:e,platform:o,browser:i,os:a,viewportWidth:d,viewportHeight:l,visualViewportWidth:c,visualViewportHeight:p,screenWidth:m,screenHeight:f,availScreenWidth:g,availScreenHeight:h,dpr:b,orientation:ap()}}function lp(){return Ar().surface==="discord"}function cp(){return Ar().platform==="mobile"}var De,Gt=G(()=>{"use strict";De={detect:Ar,isDiscord:lp,isMobile:cp,detectOS:ds,detectBrowser:ps}});function wp(){if(typeof unsafeWindow<"u"&&unsafeWindow)return unsafeWindow;let e=window.wrappedJSObject;return e&&e!==window?e:Sp}var Sp,Tp,A,ye=G(()=>{"use strict";Sp=window;Tp=wp(),A=Tp});var xs={};Ot(xs,{clamp:()=>Re,clamp01:()=>Rr,sleep:()=>Ze,tryDo:()=>Ae,waitWithTimeout:()=>ho});async function ho(e,t,n){let r=performance.now();for(;performance.now()-r<t;){let o=await Promise.race([e,Ze(50).then(()=>null)]);if(o!==null)return o}throw new Error(`${n} timeout`)}var Ze,Ae,Re,Rr,et=G(()=>{"use strict";Ze=e=>new Promise(t=>setTimeout(t,e)),Ae=e=>{try{return e()}catch{return}},Re=(e,t,n)=>Math.max(t,Math.min(n,e)),Rr=e=>Re(e,0,1)});function $p(e){return!!(e&&typeof e=="object"&&typeof e.start=="function"&&typeof e.destroy=="function"&&e.app&&e.app.stage&&e.app.renderer&&e.systems&&typeof e.systems.values=="function")}function Kp(e){try{for(let t of e.systems.values()){let n=t?.system;if(n?.name==="tileObject")return n}}catch{}return null}function Jp(e){se.engine=e,se.tos=Kp(e)||null,se.app=e.app||null,se.renderer=e.app?.renderer||null,se.ticker=e.app?.ticker||null,se.stage=e.app?.stage||null;try{ws(e)}catch{}try{se.app&&Ts(se.app)}catch{}try{se.renderer&&ks(se.renderer)}catch{}}function Or(){return se.engine?!0:(se._bindPatched||(se._bindPatched=!0,Function.prototype.bind=function(e,...t){let n=Ss.call(this,e,...t);try{!se.engine&&$p(e)&&(Function.prototype.bind=Ss,se._bindPatched=!1,Jp(e))}catch{}return n}),!1)}async function qp(e=15e3){let t=performance.now();for(;performance.now()-t<e;){if(se.engine)return!0;Or(),await Ze(50)}throw new Error("MGPixiHooks: engine capture timeout")}async function Yp(e=15e3){return se.engine||await qp(e),!0}function Xp(){return se.engine&&se.app?{ok:!0,engine:se.engine,tos:se.tos,app:se.app}:(Or(),{ok:!1,engine:se.engine,tos:se.tos,app:se.app,note:"Not captured. Wait for room, or reload."})}var Ss,se,ws,Ts,ks,Up,zp,Vp,Pe,gn=G(()=>{"use strict";et();ye();Ss=Function.prototype.bind,se={_bindPatched:!1,engine:null,tos:null,app:null,renderer:null,ticker:null,stage:null},Up=new Promise(e=>{ws=e}),zp=new Promise(e=>{Ts=e}),Vp=new Promise(e=>{ks=e});Or();Pe={engineReady:Up,appReady:zp,rendererReady:Vp,engine:()=>se.engine,tos:()=>se.tos,app:()=>se.app,renderer:()=>se.renderer,ticker:()=>se.ticker,stage:()=>se.stage,PIXI:()=>A.PIXI||null,init:Yp,hook:Xp,ready:()=>!!se.engine}});function Ps(){return typeof GM_xmlhttpRequest=="function"}function Ms(e,t="text"){return new Promise((n,r)=>{GM_xmlhttpRequest({method:"GET",url:e,responseType:t,onload:o=>o.status>=200&&o.status<300?n(o):r(new Error(`HTTP ${o.status} for ${e}`)),onerror:()=>r(new Error(`Network error for ${e}`)),ontimeout:()=>r(new Error(`Timeout for ${e}`))})})}async function Nt(e){if(Ps())return JSON.parse((await Ms(e,"text")).responseText);let t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.json()}async function yo(e){if(Ps())return(await Ms(e,"blob")).response;let t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.blob()}function As(e){return new Promise((t,n)=>{let r=URL.createObjectURL(e),o=A?.Image||Image,a=new o;a.decoding="async",a.onload=()=>{URL.revokeObjectURL(r),t(a)},a.onerror=()=>{URL.revokeObjectURL(r),n(new Error("Image decode failed"))},a.src=r})}var Cs,fn=G(()=>{"use strict";ye();Cs=A?.location?.origin||"https://magicgarden.gg"});var Ie,Qp,Gr,_t=G(()=>{"use strict";Ie=(e,t)=>e.replace(/\/?$/,"/")+String(t||"").replace(/^\//,""),Qp=e=>e.lastIndexOf("/")>=0?e.slice(0,e.lastIndexOf("/")+1):"",Gr=(e,t)=>String(t||"").startsWith("/")?String(t).slice(1):Qp(e)+String(t||"")});function Zp(){return A?.document??(typeof document<"u"?document:null)}function Hr(e){if(bn!==null)return;let t=e??Zp();if(!t)return;let n=t.scripts;for(let r=0;r<n.length;r++){let a=n.item(r)?.src;if(!a)continue;let i=a.match(/\/(?:r\/\d+\/)?version\/([^/]+)/);if(i?.[1]){bn=i[1];return}}}function em(){return Hr(),bn}async function tm(e=15e3){let t=performance.now();for(;performance.now()-t<e;){if(Hr(),bn)return bn;await Ze(50)}throw new Error("MGVersion timeout (gameVersion not found)")}var bn,hn,Nr=G(()=>{"use strict";ye();et();bn=null;hn={init:Hr,get:em,wait:tm}});async function Is(){return xo||vo||(vo=(async()=>{let e=await hn.wait(15e3);return xo=`${Cs}/version/${e}/assets/`,xo})(),vo)}async function nm(e){let t=await Is();return Ie(t,e)}var vo,xo,Be,Wt=G(()=>{"use strict";fn();_t();Nr();vo=null,xo=null;Be={base:Is,url:nm}});function yn(e){let t=String(e||"").trim();return t?t.startsWith("sprite/")||t.startsWith("sprites/")?t:t.includes("/")?`sprite/${t}`:t:""}function Ft(e,t){let n=String(e||"").trim().replace(/^sprites?\//,"").replace(/^\/+|\/+$/g,""),r=String(t||"").trim();return r.includes("/")||!n?yn(r):`sprite/${n}/${r}`}function bt(e,t,n,r){let o=Ft(e,t);if(n.has(o)||r.has(o))return o;let a=String(t||"").trim();if(n.has(a)||r.has(a))return a;let i=yn(a);return n.has(i)||r.has(i)?i:o}function om(e,t,n=25e3){let r=[e],o=new Set,a=0;for(;r.length&&a++<n;){let i=r.pop();if(!i||o.has(i))continue;if(o.add(i),t(i))return i;let s=i.children;if(Array.isArray(s))for(let u=s.length-1;u>=0;u--)r.push(s[u])}return null}function rm(e){let t=A.PIXI;if(t?.Texture&&t?.Sprite&&t?.Container&&t?.Rectangle)return{Container:t.Container,Sprite:t.Sprite,Texture:t.Texture,Rectangle:t.Rectangle,AnimatedSprite:t.AnimatedSprite||null};let n=e?.stage,r=om(n,o=>o?.texture?.frame&&o?.constructor&&o?.texture?.constructor&&o?.texture?.frame?.constructor);if(!r)throw new Error("No Sprite found yet (constructors).");return{Container:n.constructor,Sprite:r.constructor,Texture:r.texture.constructor,Rectangle:r.texture.frame.constructor,AnimatedSprite:t?.AnimatedSprite||null}}async function Es(e,t=15e3){let{sleep:n}=await Promise.resolve().then(()=>(et(),xs)),r=performance.now();for(;performance.now()-r<t;)try{return rm(e)}catch{await n(50)}throw new Error("Constructors timeout")}var ut,So=G(()=>{"use strict";ye();ut=(...e)=>{try{console.log("[MGSprite]",...e)}catch{}}});async function am(e){let t=e||await Be.base();if(_r.has(t))return _r.get(t);let n=Nt(Ie(t,"manifest.json"));return _r.set(t,n),n}function im(e,t){return e?.bundles?.find(n=>n?.name===t)||null}function sm(e){let t=new Set;for(let n of e?.assets||[])for(let r of n?.src||[])typeof r=="string"&&r.endsWith(".json")&&r!=="manifest.json"&&t.add(r);return Array.from(t)}var _r,Oe,vn=G(()=>{"use strict";fn();_t();Wt();_r=new Map;Oe={load:am,getBundle:im,listJsonFromBundle:sm}});function lm(e){return e&&typeof e=="object"&&e.frames&&e.meta&&typeof e.meta.image=="string"}function Wr(e,t,n,r,o){return new e(t,n,r,o)}function cm(e,t,n,r,o,a,i){let s;try{s=new e({source:t.source,frame:n,orig:r,trim:o||void 0,rotate:a||0})}catch{s=new e(t.baseTexture||t,n,r,o||void 0,a||0)}if(i)if(s.defaultAnchor?.set)try{s.defaultAnchor.set(i.x,i.y)}catch{}else s.defaultAnchor?(s.defaultAnchor.x=i.x,s.defaultAnchor.y=i.y):s.defaultAnchor={x:i.x,y:i.y};try{s.updateUvs?.()}catch{}return s}function um(e,t,n,r){let{Texture:o,Rectangle:a}=r;for(let[i,s]of Object.entries(e.frames)){let u=s.frame,d=!!s.rotated,l=d?2:0,c=d?u.h:u.w,p=d?u.w:u.h,m=Wr(a,u.x,u.y,c,p),f=s.sourceSize||{w:u.w,h:u.h},g=Wr(a,0,0,f.w,f.h),h=null;if(s.trimmed&&s.spriteSourceSize){let b=s.spriteSourceSize;h=Wr(a,b.x,b.y,b.w,b.h)}n.set(i,cm(o,t,m,g,h,l,s.anchor||null))}}function dm(e,t,n){if(!(!e.animations||typeof e.animations!="object"))for(let[r,o]of Object.entries(e.animations)){if(!Array.isArray(o))continue;let a=o.map(i=>t.get(i)).filter(Boolean);a.length>=2&&n.set(r,a)}}function pm(e,t){let n=(r,o)=>{let a=String(r||"").trim(),i=String(o||"").trim();!a||!i||(t.has(a)||t.set(a,new Set),t.get(a).add(i))};for(let r of Object.keys(e.frames||{})){let o=/^sprite\/([^/]+)\/(.+)$/.exec(r);o&&n(o[1],o[2])}}async function Ls(e,t){let n=await Oe.load(e),r=Oe.getBundle(n,"default");if(!r)throw new Error("No default bundle in manifest");let o=Oe.listJsonFromBundle(r),a=new Set,i=new Map,s=new Map,u=new Map;async function d(l){if(a.has(l))return;a.add(l);let c=await Nt(Ie(e,l));if(!lm(c))return;let p=c.meta?.related_multi_packs;if(Array.isArray(p))for(let h of p)await d(Gr(l,h));let m=Gr(l,c.meta.image),f=await As(await yo(Ie(e,m))),g=t.Texture.from(f);um(c,g,i,t),dm(c,i,s),pm(c,u)}for(let l of o)await d(l);return{textures:i,animations:s,categoryIndex:u}}var Ds=G(()=>{"use strict";fn();_t();vn()});function Os(){return{lru:new Map,cost:0,srcCanvas:new Map}}function Fr(e,t){return`${t.sig}::${e}`}function Gs(e){return e?e.isAnim?e.frames?.length||0:e.tex?1:0:0}function mm(e,t,n){e.lru.delete(t),e.lru.set(t,n)}function gm(e,t){if(t.enabled)for(;e.lru.size>t.maxEntries||e.cost>t.maxCost;){let n=e.lru.keys().next().value;if(n===void 0)break;let r=e.lru.get(n);e.lru.delete(n),e.cost=Math.max(0,e.cost-Gs(r??null))}}function Br(e,t){let n=e.lru.get(t);return n?(mm(e,t,n),n):null}function jr(e,t,n,r){e.lru.set(t,n),e.cost+=Gs(n),gm(e,r)}function Hs(e){e.lru.clear(),e.cost=0,e.srcCanvas.clear()}function Ns(e,t){return e.srcCanvas.get(t)??null}function _s(e,t,n,r){if(e.srcCanvas.set(t,n),e.srcCanvas.size>r.srcCanvasMax){let o=e.srcCanvas.keys().next().value;o!==void 0&&e.srcCanvas.delete(o)}}var Rs,xn=G(()=>{"use strict";Rs={enabled:!0,maxEntries:1200,maxCost:5e3,srcCanvasMax:450}});function wo(e){return[...new Set(e.filter(Boolean))].sort((n,r)=>(Ws.get(n)??1/0)-(Ws.get(r)??1/0))}function Ur(e){if(!e.length)return{muts:[],overlayMuts:[],selectedMuts:[],sig:""};let t=wo(e),n=hm(e),r=ym(e);return{muts:n,overlayMuts:r,selectedMuts:t,sig:`${t.join(",")}|${n.join(",")}|${r.join(",")}`}}function hm(e){let t=e.filter((o,a,i)=>ht[o]&&i.indexOf(o)===a);if(!t.length)return[];if(t.includes("Gold"))return["Gold"];if(t.includes("Rainbow"))return["Rainbow"];let n=["Ambershine","Dawnlit","Dawncharged","Ambercharged"];return t.some(o=>n.includes(o))?wo(t.filter(o=>!bm.includes(o))):wo(t)}function ym(e){let t=e.filter((n,r,o)=>ht[n]?.overlayTall&&o.indexOf(n)===r);return wo(t)}function To(e,t){return e.map(n=>({name:n,meta:ht[n],overlayTall:ht[n]?.overlayTall??null,isTall:t}))}var ht,Fs,fm,Ws,bm,Bs,js,Us,zs,Vs,$s,Bt=G(()=>{"use strict";ht={Gold:{overlayTall:null,tallIconOverride:null},Rainbow:{overlayTall:null,tallIconOverride:null,angle:130,angleTall:0},Wet:{overlayTall:"sprite/mutation-overlay/WetTallPlant",tallIconOverride:"sprite/mutation/Puddle"},Chilled:{overlayTall:"sprite/mutation-overlay/ChilledTallPlant",tallIconOverride:null},Frozen:{overlayTall:"sprite/mutation-overlay/FrozenTallPlant",tallIconOverride:null},Dawnlit:{overlayTall:null,tallIconOverride:null},Ambershine:{overlayTall:null,tallIconOverride:null},Dawncharged:{overlayTall:null,tallIconOverride:null},Ambercharged:{overlayTall:null,tallIconOverride:null}},Fs=Object.keys(ht),fm=["Gold","Rainbow","Wet","Chilled","Frozen","Ambershine","Dawnlit","Dawncharged","Ambercharged"],Ws=new Map(fm.map((e,t)=>[e,t]));bm=["Wet","Chilled","Frozen"],Bs=new Set(["Dawnlit","Ambershine","Dawncharged","Ambercharged"]),js={Banana:.6,Carrot:.6,Sunflower:.5,Starweaver:.5,FavaBean:.25,BurrosTail:.2},Us={Pepper:.5,Banana:.6},zs=256,Vs=.5,$s=2});function xm(e){return ko.has(e)?e:ko.has("overlay")?"overlay":ko.has("screen")?"screen":ko.has("lighter")?"lighter":"source-atop"}function Sm(e,t,n,r,o=!1){let a=(r-90)*Math.PI/180,i=t/2,s=n/2;if(!o){let c=Math.min(t,n)/2;return e.createLinearGradient(i-Math.cos(a)*c,s-Math.sin(a)*c,i+Math.cos(a)*c,s+Math.sin(a)*c)}let u=Math.cos(a),d=Math.sin(a),l=Math.abs(u)*t/2+Math.abs(d)*n/2;return e.createLinearGradient(i-u*l,s-d*l,i+u*l,s+d*l)}function Ks(e,t,n,r,o=!1){let a=r.colors?.length?r.colors:["#fff"],i=r.ang!=null?Sm(e,t,n,r.ang,o):e.createLinearGradient(0,0,0,n);a.length===1?(i.addColorStop(0,a[0]),i.addColorStop(1,a[0])):a.forEach((s,u)=>i.addColorStop(u/(a.length-1),s)),e.fillStyle=i,e.fillRect(0,0,t,n)}function Js(e,t,n,r){let o=vm[n];if(!o)return;let a={...o};n==="Rainbow"&&r&&a.angTall!=null&&(a.ang=a.angTall);let i=n==="Rainbow"&&r,s=t.width,u=t.height;e.save();let d=a.masked?xm(a.op):"source-in";if(e.globalCompositeOperation=d,a.a!=null&&(e.globalAlpha=a.a),a.masked){let l=document.createElement("canvas");l.width=s,l.height=u;let c=l.getContext("2d");c.imageSmoothingEnabled=!1,Ks(c,s,u,a,i),c.globalCompositeOperation="destination-in",c.drawImage(t,0,0),e.drawImage(l,0,0)}else Ks(e,s,u,a,i);e.restore()}var vm,ko,qs=G(()=>{"use strict";vm={Gold:{op:"source-atop",colors:["rgb(235,200,0)"],a:.7},Rainbow:{op:"color",colors:["#FF1744","#FF9100","#FFEA00","#00E676","#2979FF","#D500F9"],ang:130,angTall:0,masked:!0},Wet:{op:"source-atop",colors:["rgb(50,180,200)"],a:.25},Chilled:{op:"source-atop",colors:["rgb(100,160,210)"],a:.45},Frozen:{op:"source-atop",colors:["rgb(100,130,220)"],a:.5},Dawnlit:{op:"source-atop",colors:["rgb(209,70,231)"],a:.5},Ambershine:{op:"source-atop",colors:["rgb(190,100,40)"],a:.5},Dawncharged:{op:"source-atop",colors:["rgb(140,80,200)"],a:.5},Ambercharged:{op:"source-atop",colors:["rgb(170,60,25)"],a:.5}},ko=(()=>{try{let t=document.createElement("canvas").getContext("2d");if(!t)return new Set;let n=["color","hue","saturation","luminosity","overlay","screen","lighter","source-atop"],r=new Set;for(let o of n)t.globalCompositeOperation=o,t.globalCompositeOperation===o&&r.add(o);return r}catch{return new Set}})()});function Ys(e){return/tallplant/i.test(e)}function Co(e){let t=String(e||"").split("/");return t[t.length-1]||""}function Xs(e){switch(e){case"Ambershine":return["Ambershine","Amberlit"];case"Dawncharged":return["Dawncharged","Dawnbound"];case"Ambercharged":return["Ambercharged","Amberbound"];default:return[e]}}function wm(e,t){let n=String(e||"").toLowerCase();for(let r of t.keys()){let o=/sprite\/mutation-overlay\/([A-Za-z0-9]+)TallPlant/i.exec(String(r));if(!o||!o[1])continue;if(o[1].toLowerCase()===n){let i=t.get(r);if(i)return{tex:i,key:r}}}return null}function Qs(e,t,n,r){if(!t)return null;let o=Co(e),a=Xs(t);for(let i of a){let s=[`sprite/mutation/${i}${o}`,`sprite/mutation/${i}-${o}`,`sprite/mutation/${i}_${o}`,`sprite/mutation/${i}/${o}`,`sprite/mutation/${i}`];for(let u of s){let d=n.get(u);if(d)return{tex:d,key:u}}if(r){let u=`sprite/mutation-overlay/${i}TallPlant`,d=n.get(u);if(d)return{tex:d,key:u};let l=`sprite/mutation-overlay/${i}`,c=n.get(l);if(c)return{tex:c,key:l};let p=wm(t,n);if(p)return p}}return null}function Zs(e,t,n,r){if(!t)return null;let o=ht[t];if(n&&o?.tallIconOverride){let s=r.get(o.tallIconOverride);if(s)return s}let a=Co(e),i=Xs(t);for(let s of i){let u=[`sprite/mutation/${s}Icon`,`sprite/mutation/${s}`,`sprite/mutation/${s}${a}`,`sprite/mutation/${s}-${a}`,`sprite/mutation/${s}_${a}`,`sprite/mutation/${s}/${a}`];for(let d of u){let l=r.get(d);if(l)return l}if(n){let d=`sprite/mutation-overlay/${s}TallPlantIcon`,l=r.get(d);if(l)return l;let c=`sprite/mutation-overlay/${s}TallPlant`,p=r.get(c);if(p)return p}}return null}function el(e,t,n){let r=e?.orig?.width??e?.frame?.width??e?.width??1,o=e?.orig?.height??e?.frame?.height??e?.height??1,a=e?.defaultAnchor?.x??0,i=e?.defaultAnchor?.y??0,s=Us[t]??a,u=o>r*1.5,d=js[t]??(u?i:.4),l={x:(s-a)*r,y:(d-i)*o},c=Math.min(r,o),p=Math.min(1.5,c/zs),m=Vs*p;return n&&(m*=$s),{width:r,height:o,anchorX:a,anchorY:i,offset:l,iconScale:m}}var tl=G(()=>{"use strict";Bt()});function zr(e,t,n,r,o){let a=Ns(r,e);if(a)return a;let i=null;try{if(t?.extract?.canvas){let s=new n.Sprite(e);i=t.extract.canvas(s),s.destroy?.({children:!0,texture:!1,baseTexture:!1})}}catch{}if(!i){let s=e?.frame||e?._frame,u=e?.orig||e?._orig,d=e?.trim||e?._trim,l=e?.rotate||e?._rotate||0,c=e?.baseTexture?.resource?.source||e?.baseTexture?.resource||e?.source?.resource?.source||e?.source?.resource||e?._source?.resource?.source||null;if(!s||!c)throw new Error("textureToCanvas fail");i=document.createElement("canvas");let p=Math.max(1,(u?.width??s.width)|0),m=Math.max(1,(u?.height??s.height)|0),f=d?.x??0,g=d?.y??0;i.width=p,i.height=m;let h=i.getContext("2d");h.imageSmoothingEnabled=!1,l===!0||l===2||l===8?(h.save(),h.translate(f+s.height/2,g+s.width/2),h.rotate(-Math.PI/2),h.drawImage(c,s.x,s.y,s.width,s.height,-s.width/2,-s.height/2,s.width,s.height),h.restore()):h.drawImage(c,s.x,s.y,s.width,s.height,f,g,s.width,s.height)}return _s(r,e,i,o),i}function Tm(e,t,n,r,o,a,i,s){let{w:u,h:d,aX:l,aY:c,basePos:p}=t,m=[];for(let f of n){let g=new r.Sprite(e);g.anchor?.set?.(l,c),g.position.set(p.x,p.y),g.zIndex=1;let h=document.createElement("canvas");h.width=u,h.height=d;let b=h.getContext("2d");b.imageSmoothingEnabled=!1,b.save(),b.translate(u*l,d*c),b.drawImage(zr(e,o,r,a,i),-u*l,-d*c),b.restore(),Js(b,h,f.name,f.isTall);let T=r.Texture.from(h);s.push(T),g.texture=T,m.push(g)}return m}function km(e,t,n,r,o,a,i,s,u,d){let{aX:l,basePos:c}=t,p=[];for(let m of n){let f=m.overlayTall&&r.get(m.overlayTall)&&{tex:r.get(m.overlayTall),key:m.overlayTall}||Qs(e,m.name,r,!0);if(!f?.tex)continue;let g=zr(f.tex,a,o,i,s);if(!g)continue;let h=g.width,b={x:0,y:0},T={x:c.x-l*h,y:0},S=document.createElement("canvas");S.width=h,S.height=g.height;let v=S.getContext("2d");if(!v)continue;v.imageSmoothingEnabled=!1,v.drawImage(g,0,0),v.globalCompositeOperation="destination-in",v.drawImage(u,-T.x,-T.y);let k=o.Texture.from(S);d.push(k);let y=new o.Sprite(k);y.anchor?.set?.(b.x,b.y),y.position.set(T.x,T.y),y.scale.set(1),y.alpha=1,y.zIndex=3,p.push(y)}return p}function Cm(e,t,n,r,o,a){let{basePos:i}=t,s=[];for(let u of n){if(u.name==="Gold"||u.name==="Rainbow")continue;let d=Zs(e,u.name,u.isTall,r);if(!d)continue;let l=new o.Sprite(d),c=d?.defaultAnchor?.x??.5,p=d?.defaultAnchor?.y??.5;l.anchor?.set?.(c,p),l.position.set(i.x+a.offset.x,i.y+a.offset.y),l.scale.set(a.iconScale),u.isTall&&(l.zIndex=-1),Bs.has(u.name)&&(l.zIndex=10),l.zIndex||(l.zIndex=2),s.push(l)}return s}function Vr(e,t,n,r){try{if(!e||!r.renderer||!r.ctors?.Container||!r.ctors?.Sprite||!r.ctors?.Texture)return null;let{Container:o,Sprite:a,Texture:i}=r.ctors,s=e?.orig?.width??e?.frame?.width??e?.width??1,u=e?.orig?.height??e?.frame?.height??e?.height??1,d=e?.defaultAnchor?.x??.5,l=e?.defaultAnchor?.y??.5,c={x:s*d,y:u*l},p=zr(e,r.renderer,r.ctors,r.cacheState,r.cacheConfig),m=new o;m.sortableChildren=!0;let f=new a(e);f.anchor?.set?.(d,l),f.position.set(c.x,c.y),f.zIndex=0,m.addChild(f);let g=Ys(t),h=To(n.muts,g),b=To(n.overlayMuts,g),T=To(n.selectedMuts,g),S=[],v={w:s,h:u,aX:d,aY:l,basePos:c},k=Co(t),y=el(e,k,g);Tm(e,v,h,r.ctors,r.renderer,r.cacheState,r.cacheConfig,S).forEach(W=>m.addChild(W)),g&&km(t,v,b,r.textures,r.ctors,r.renderer,r.cacheState,r.cacheConfig,p,S).forEach(Q=>m.addChild(Q)),Cm(t,v,T,r.textures,r.ctors,y).forEach(W=>m.addChild(W));let M=r.renderer.resolution??window.devicePixelRatio??1,{Rectangle:D}=r.ctors,L=D?new D(0,0,s,u):void 0,F=null;if(typeof r.renderer.generateTexture=="function"?F=r.renderer.generateTexture(m,{resolution:M,region:L}):r.renderer.textureGenerator?.generateTexture&&(F=r.renderer.textureGenerator.generateTexture({target:m,resolution:M,region:L})),!F)throw new Error("no render texture");let Z=F instanceof i?F:i.from(r.renderer.extract.canvas(F));F&&F!==Z&&F.destroy?.(!0),m.destroy({children:!0,texture:!1,baseTexture:!1});try{Z.__mg_gen=!0,Z.label=`${t}|${n.sig}`}catch{}return Z}catch{return null}}function nl(e,t,n,r){if(!e||e.length<2)return null;let o=[];for(let a of e){let i=Vr(a,t,n,r);i&&o.push(i)}return o.length>=2?o:null}var ol=G(()=>{"use strict";Bt();qs();tl();Bt();xn()});function al(){return{cache:new Map,maxEntries:Kr.maxEntries}}function $r(e,t){let n=t.scale??1,r=t.frameIndex??0,o=t.mutations?.slice().sort().join(",")||"",a=t.anchorX??.5,i=t.anchorY??.5,s=t.pad??2;return`${e}|s${n}|f${r}|m${o}|ax${a}|ay${i}|p${s}`}function Pm(e,t){let n=e.cache.get(t);return n?(n.lastAccess=performance.now(),n.canvas):null}function Mm(e,t,n,r){if(t.enabled){if(e.cache.size>=t.maxEntries){let o=null,a=1/0;for(let[i,s]of e.cache)s.lastAccess<a&&(a=s.lastAccess,o=i);o&&e.cache.delete(o)}e.cache.set(n,{canvas:r,lastAccess:performance.now()})}}function rl(e){let t=document.createElement("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");return n&&n.drawImage(e,0,0),t}function il(e){e.cache.clear()}function sl(e){return{size:e.cache.size,maxEntries:e.maxEntries}}function Am(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0)})}async function ll(e,t,n,r,o,a,i,s=5,u=0){if(!t.ready||!a.enabled)return 0;let d=e.length,l=0;i?.(0,d);for(let c=0;c<d;c+=s){let p=e.slice(c,c+s);for(let m of p)try{let f=bt(null,m,t.textures,t.animations),g=$r(f,{scale:1});o.cache.has(g)||Po(t,n,r,null,m,{scale:1},o,a),l++}catch{l++}i?.(l,d),c+s<d&&await Am()}return l}function Im(e){if(e.overlay)return e.overlay;let t=new e.ctors.Container;t.sortableChildren=!0,t.zIndex=99999999;try{e.app.stage.sortableChildren=!0}catch{}return e.app.stage.addChild(t),e.overlay=t,t}function Em(e){let t=e.defaultParent;if(!t)return null;try{return typeof t=="function"?t():t}catch{return null}}function cl(e,t,n,r,o,a){if(!n.length)return t;let i=Ur(n);if(!i.sig)return t;let s=Fr(e,i),u=Br(o,s);if(u?.tex)return u.tex;let d=Vr(t,e,i,{renderer:r.renderer,ctors:r.ctors,textures:r.textures,cacheState:o,cacheConfig:a});return d?(jr(o,s,{isAnim:!1,tex:d},a),d):t}function ul(e,t,n,r,o,a){if(!n.length)return t;let i=Ur(n);if(!i.sig)return t;let s=Fr(e,i),u=Br(o,s);if(u?.isAnim&&u.frames?.length)return u.frames;let d=nl(t,e,i,{renderer:r.renderer,ctors:r.ctors,textures:r.textures,cacheState:o,cacheConfig:a});return d?(jr(o,s,{isAnim:!0,frames:d},a),d):t}function Jr(e,t,n,r,o,a={}){if(!e.ready)throw new Error("MGSprite not ready yet");let i=bt(r,o,e.textures,e.animations),s=a.mutations||[],u=a.parent||Em(e)||Im(e),d=e.renderer?.width||e.renderer?.view?.width||innerWidth,l=e.renderer?.height||e.renderer?.view?.height||innerHeight,c=a.center?d/2:a.x??d/2,p=a.center?l/2:a.y??l/2,m,f=e.animations.get(i);if(f&&f.length>=2){let b=ul(i,f,s,e,t,n),T=e.ctors.AnimatedSprite;if(T)m=new T(b),m.animationSpeed=a.fps?a.fps/60:a.speed??.15,m.loop=a.loop??!0,m.play();else{let S=new e.ctors.Sprite(b[0]),k=1e3/Math.max(1,a.fps||8),y=0,C=0,P=M=>{let D=e.app.ticker?.deltaMS??M*16.666666666666668;if(y+=D,y<k)return;let L=y/k|0;y%=k,C=(C+L)%b.length,S.texture=b[C]};S.__mgTick=P,e.app.ticker?.add?.(P),m=S}}else{let b=e.textures.get(i);if(!b)throw new Error(`Unknown sprite/anim key: ${i}`);let T=cl(i,b,s,e,t,n);m=new e.ctors.Sprite(T)}let g=a.anchorX??m.texture?.defaultAnchor?.x??.5,h=a.anchorY??m.texture?.defaultAnchor?.y??.5;return m.anchor?.set?.(g,h),m.position.set(c,p),m.scale.set(a.scale??1),m.alpha=a.alpha??1,m.rotation=a.rotation??0,m.zIndex=a.zIndex??999999,u.addChild(m),e.live.add(m),m.__mgDestroy=()=>{try{m.__mgTick&&e.app.ticker?.remove?.(m.__mgTick)}catch{}try{m.destroy?.({children:!0,texture:!1,baseTexture:!1})}catch{try{m.destroy?.()}catch{}}e.live.delete(m)},m}function Lm(e,t){let n=e.renderer;if(n?.extract?.canvas)return n.extract.canvas(t);if(n?.plugins?.extract?.canvas)return n.plugins.extract.canvas(t);throw new Error("No extract.canvas available on renderer")}function Po(e,t,n,r,o,a={},i,s){if(!e.ready)throw new Error("MGSprite not ready yet");let u=bt(r,o,e.textures,e.animations);if(i&&s?.enabled){let v=$r(u,a),k=Pm(i,v);if(k)return rl(k)}let d=a.mutations||[],l=e.animations.get(u),c=Math.max(0,(a.frameIndex??0)|0),p;if(l?.length){let v=ul(u,l,d,e,t,n);p=v[c%v.length]}else{let v=e.textures.get(u);if(!v)throw new Error(`Unknown sprite/anim key: ${u}`);p=cl(u,v,d,e,t,n)}let m=new e.ctors.Sprite(p),f=a.anchorX??m.texture?.defaultAnchor?.x??.5,g=a.anchorY??m.texture?.defaultAnchor?.y??.5;m.anchor?.set?.(f,g),m.scale.set(a.scale??1);let h=a.pad??2,b=new e.ctors.Container;b.addChild(m);try{b.updateTransform?.()}catch{}let T=m.getBounds?.(!0)||{x:0,y:0,width:m.width,height:m.height};m.position.set(-T.x+h,-T.y+h);let S=Lm(e,b);try{b.destroy?.({children:!0})}catch{}if(i&&s?.enabled){let v=$r(u,a);return Mm(i,s,v,S),rl(S)}return S}function dl(e){for(let t of Array.from(e.live))t.__mgDestroy?.()}function pl(e,t){return e.defaultParent=t,!0}function ml(e,t){return e.defaultParent=t,!0}var Kr,qr=G(()=>{"use strict";So();Bt();ol();xn();Kr={enabled:!0,maxEntries:500}});function Dm(){return{ready:!1,app:null,renderer:null,ctors:null,baseUrl:null,textures:new Map,animations:new Map,live:new Set,defaultParent:null,overlay:null,categoryIndex:null}}function we(){return Se}function yt(){return Rm}function jt(){return Om}function Ut(){return Gm}function Ao(){return Hm}function Yr(){return Se.ready}async function gl(){return Se.ready?!0:Mo||(Mo=(async()=>{let e=performance.now();ut("init start");let t=await ho(Pe.appReady,15e3,"PIXI app");ut("app ready");let n=await ho(Pe.rendererReady,15e3,"PIXI renderer");ut("renderer ready"),Se.app=t,Se.renderer=n||t?.renderer||null,Se.ctors=await Es(t),ut("constructors resolved"),Se.baseUrl=await Be.base(),ut("base url",Se.baseUrl);let{textures:r,animations:o,categoryIndex:a}=await Ls(Se.baseUrl,Se.ctors);return Se.textures=r,Se.animations=o,Se.categoryIndex=a,ut("atlases loaded","textures",Se.textures.size,"animations",Se.animations.size,"categories",Se.categoryIndex?.size??0),Se.ready=!0,ut("ready in",Math.round(performance.now()-e),"ms"),!0})(),Mo)}var Mo,Se,Rm,Om,Gm,Hm,fl=G(()=>{"use strict";et();gn();Wt();So();Ds();xn();qr();Mo=null,Se=Dm(),Rm=Os(),Om={...Rs},Gm=al(),Hm={...Kr}});function vt(){if(!Yr())throw new Error("MGSprite not ready yet")}function Nm(e,t,n){return typeof t=="string"?Jr(we(),yt(),jt(),e,t,n||{}):Jr(we(),yt(),jt(),null,e,t||{})}function _m(e,t,n){return typeof t=="string"?Po(we(),yt(),jt(),e,t,n||{},Ut(),Ao()):Po(we(),yt(),jt(),null,e,t||{},Ut(),Ao())}function Wm(){dl(we())}function Fm(e){return pl(we(),e)}function Bm(e){return ml(we(),e)}function jm(e,t){let n=we(),r=typeof t=="string"?bt(e,t,n.textures,n.animations):bt(null,e,n.textures,n.animations);return n.textures.has(r)||n.animations.has(r)}function Um(){vt();let e=we().categoryIndex;return e?Array.from(e.keys()).sort((t,n)=>t.localeCompare(n)):[]}function zm(e){vt();let t=String(e||"").trim();if(!t)return[];let n=we().categoryIndex;return n?Array.from(n.get(t)?.values()||[]):[]}function Vm(e,t){vt();let n=String(e||"").trim(),r=String(t||"").trim();if(!n||!r)return!1;let o=we().categoryIndex;if(!o)return!1;let a=n.toLowerCase(),i=r.toLowerCase();for(let[s,u]of o.entries())if(s.toLowerCase()===a){for(let d of u.values())if(d.toLowerCase()===i)return!0}return!1}function $m(e){vt();let t=we().categoryIndex;if(!t)return[];let n=String(e||"").trim().toLowerCase(),r=[];for(let[o,a]of t.entries())for(let i of a.values()){let s=Ft(o,i);(!n||s.toLowerCase().startsWith(n))&&r.push(s)}return r.sort((o,a)=>o.localeCompare(a))}function Km(e){vt();let t=String(e||"").trim();if(!t)return null;let n=yn(t),r=/^sprite\/([^/]+)\/(.+)$/.exec(n);if(!r)return null;let o=r[1],a=r[2],i=we().categoryIndex,s=o.toLowerCase(),u=a.toLowerCase(),d=o,l=a;if(i){let c=Array.from(i.keys()).find(f=>f.toLowerCase()===s);if(!c)return null;d=c;let p=i.get(c);if(!p)return null;let m=Array.from(p.values()).find(f=>f.toLowerCase()===u);if(!m)return null;l=m}return{category:d,id:l,key:Ft(d,l)}}function Jm(e,t){vt();let n=String(e||"").trim(),r=String(t||"").trim();if(!n||!r)throw new Error("getIdPath(category, id) requires both category and id");let o=we().categoryIndex;if(!o)throw new Error("Sprite categories not indexed");let a=n.toLowerCase(),i=r.toLowerCase(),s=Array.from(o.keys()).find(l=>l.toLowerCase()===a)||n,u=o.get(s);if(!u)throw new Error(`Unknown sprite category: ${n}`);let d=Array.from(u.values()).find(l=>l.toLowerCase()===i)||r;if(!u.has(d))throw new Error(`Unknown sprite id: ${n}/${r}`);return Ft(s,d)}function qm(){Hs(yt())}function Ym(){il(Ut())}function Xm(){return sl(Ut())}function Qm(){return[...Fs]}async function Zm(e,t,n=10,r=0){return vt(),ll(e,we(),yt(),jt(),Ut(),Ao(),t,n,r)}var ue,zt=G(()=>{"use strict";fl();So();qr();xn();Bt();ue={init:gl,ready:Yr,show:Nm,toCanvas:_m,clear:Wm,attach:Fm,attachProvider:Bm,has:jm,key:(e,t)=>Ft(e,t),getCategories:Um,getCategoryId:zm,hasId:Vm,listIds:$m,getIdInfo:Km,getIdPath:Jm,clearMutationCache:qm,clearToCanvasCache:Ym,getToCanvasCacheStats:Xm,getMutationNames:Qm,warmup:Zm}});function wt(e,t){Y.data[e]==null&&(Y.data[e]=t,rg()&&xl())}function rg(){return Object.values(Y.data).every(e=>e!=null)}function yl(e,t){if(!e||typeof e!="object"||hl.has(e))return;hl.add(e);let n;try{n=Zr(e)}catch{return}if(!n||n.length===0)return;let r=e,o;if(!Y.data.items&&St(n,xt.items)&&(o=r.WateringCan,o&&typeof o=="object"&&"coinPrice"in o&&"creditPrice"in o&&wt("items",r)),!Y.data.decor&&St(n,xt.decor)&&(o=r.SmallRock,o&&typeof o=="object"&&"coinPrice"in o&&"creditPrice"in o&&wt("decor",r)),!Y.data.mutations&&St(n,xt.mutations)&&(o=r.Gold,o&&typeof o=="object"&&"baseChance"in o&&"coinMultiplier"in o&&wt("mutations",r)),!Y.data.eggs&&St(n,xt.eggs)&&(o=r.CommonEgg,o&&typeof o=="object"&&"faunaSpawnWeights"in o&&"secondsToHatch"in o&&wt("eggs",r)),!Y.data.pets&&St(n,xt.pets)&&(o=r.Worm,o&&typeof o=="object"&&"coinsToFullyReplenishHunger"in o&&"diet"in o&&Array.isArray(o.diet)&&wt("pets",r)),!Y.data.abilities&&St(n,xt.abilities)&&(o=r.ProduceScaleBoost,o&&typeof o=="object"&&"trigger"in o&&"baseParameters"in o&&wt("abilities",r)),!Y.data.plants&&St(n,xt.plants)&&(o=r.Carrot,o&&typeof o=="object"&&"seed"in o&&"plant"in o&&"crop"in o&&wt("plants",r)),!(t>=tg))for(let a of n){let i;try{i=r[a]}catch{continue}i&&typeof i=="object"&&yl(i,t+1)}}function Xr(e){try{yl(e,0)}catch{}}function vl(){if(!Y.isHookInstalled){Y.isHookInstalled=!0;try{tt.keys=function(t){return Xr(t),Zr.apply(this,arguments)},Io&&(tt.values=function(t){return Xr(t),Io.apply(this,arguments)}),Eo&&(tt.entries=function(t){return Xr(t),Eo.apply(this,arguments)})}catch{}}}function xl(){if(Y.isHookInstalled){try{tt.keys=Zr,Io&&(tt.values=Io),Eo&&(tt.entries=Eo)}catch{}Y.isHookInstalled=!1}}function ag(){try{for(let e of Qr.document?.scripts||[]){let t=e?.src?String(e.src):"";if(bl.test(t))return t}}catch{}try{for(let e of Qr.performance?.getEntriesByType?.("resource")||[]){let t=e?.name?String(e.name):"";if(bl.test(t))return t}}catch{}return null}function ig(e,t){let n=Math.max(e.lastIndexOf("const ",t),e.lastIndexOf("let ",t),e.lastIndexOf("var ",t));if(n<0)return null;let r=e.indexOf("=",n);if(r<0||r>t)return null;let o=e.indexOf("{",r);if(o<0||o>t)return null;let a=0,i="",s=!1;for(let u=o;u<e.length;u++){let d=e[u];if(i){if(s){s=!1;continue}if(d==="\\"){s=!0;continue}d===i&&(i="");continue}if(d==='"'||d==="'"){i=d;continue}if(d==="{")a++;else if(d==="}"&&--a===0)return e.slice(o,u+1)}return null}function sg(e){let t={},n=!1;for(let r of eg){let o=e?.[r];if(!o||typeof o!="object")continue;let a=o.iconSpriteKey||null,{iconSpriteKey:i,...s}=o;t[r]={weatherId:r,spriteId:a,...s},n=!0}return t.Sunny||(t.Sunny={weatherId:"Sunny",name:"Sunny",spriteId:"sprite/ui/SunnyIcon",type:"primary"}),!n||t.Rain&&t.Rain.mutator?.mutation!=="Wet"?null:t}async function lg(){if(Y.data.weather)return!0;let e=ag();if(!e)return!1;let t="";try{let s=await fetch(e,{credentials:"include"});if(!s.ok)return!1;t=await s.text()}catch{return!1}let n=t.indexOf("fixedTimeSlots:[0,48,96,144,192,240]");if(n<0&&(n=t.indexOf('name:"Amber Moon"')),n<0)return!1;let r=ig(t,n);if(!r)return!1;let o=r.replace(/\b[A-Za-z_$][\w$]*\.(Rain|Frost|Dawn|AmberMoon)\b/g,'"$1"'),a;try{a=Function('"use strict";return('+o+")")()}catch{return!1}let i=sg(a);return i?(Y.data.weather=i,!0):!1}function cg(){if(Y.weatherPollingTimer)return;Y.weatherPollAttempts=0;let e=setInterval(async()=>{(await lg()||++Y.weatherPollAttempts>ng)&&(clearInterval(e),Y.weatherPollingTimer=null)},og);Y.weatherPollingTimer=e}function ug(e){return String(e||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^A-Za-z0-9]/g,"").trim()}function dg(e,t=[]){let n=new Set,r=o=>{let a=String(o||"").trim();a&&n.add(a)};r(e);for(let o of t)r(o);for(let o of Array.from(n.values()))o.endsWith("s")?r(o.slice(0,-1)):r(`${o}s`),o.endsWith("es")&&r(o.slice(0,-2));return Array.from(n.values()).filter(Boolean)}function Sl(e,t,n,r=[],o=[]){let a=dg(e,r);if(!a.length)return null;let i=[t,...o].filter(l=>typeof l=="string"),s=l=>{let c=String(l||"").trim();if(!c)return null;for(let p of a)try{if(ue.has(p,c))return ue.getIdPath(p,c)}catch{}return null};for(let l of i){let c=s(l);if(c)return c}let u=ug(n||""),d=s(u||n||"");if(d)return d;try{for(let l of a){let c=ue.listIds(`sprite/${l}/`),p=i.map(f=>String(f||"").toLowerCase()),m=String(n||u||"").toLowerCase();for(let f of c){let h=(f.split("/").pop()||"").toLowerCase();if(p.some(b=>b&&b===h)||h===m)return f}for(let f of c){let h=(f.split("/").pop()||"").toLowerCase();if(p.some(b=>b&&h.includes(b))||m&&h.includes(m))return f}}}catch{}return null}function We(e,t,n,r,o=[],a=[]){if(!e||typeof e!="object")return;let i=e.tileRef;if(!i||typeof i!="object")return;let s=String(i.spritesheet||t||"").trim(),u=Sl(s,n,r,o,a);if(u)try{e.spriteId=u}catch{}let d=e.rotationVariants;if(d&&typeof d=="object")for(let l of Object.values(d))We(l,s,n,r);if(e.immatureTileRef){let l={tileRef:e.immatureTileRef};We(l,s,n,r),l.spriteId&&(e.immatureSpriteId=l.spriteId)}if(e.topmostLayerTileRef){let l={tileRef:e.topmostLayerTileRef};We(l,s,n,r),l.spriteId&&(e.topmostLayerSpriteId=l.spriteId)}e.activeState&&typeof e.activeState=="object"&&We(e.activeState,s,n,e.activeState?.name||r)}function pg(e,t,n,r=[]){if(!Array.isArray(t)||t.length===0)return null;let o=t[0],a=t.slice(1);return Sl(e,o,n??null,r,a)}function mg(e){for(let[t,n]of Object.entries(e.items||{}))We(n,"items",t,n?.name,["item"]);for(let[t,n]of Object.entries(e.decor||{}))We(n,"decor",t,n?.name);for(let[t,n]of Object.entries(e.mutations||{})){We(n,"mutations",t,n?.name,["mutation"]);let r=pg("mutation-overlay",[`${t}TallPlant`,`${t}TallPlantIcon`,t],n?.name,["mutation-overlay"]);if(r)try{n.overlaySpriteId=r}catch{}}for(let[t,n]of Object.entries(e.eggs||{}))We(n,"pets",t,n?.name,["pet"]);for(let[t,n]of Object.entries(e.pets||{}))We(n,"pets",t,n?.name,["pet"]);for(let[t,n]of Object.entries(e.plants||{})){let r=n;r.seed&&We(r.seed,r.seed?.tileRef?.spritesheet||"seeds",`${t}Seed`,r.seed?.name||`${t} Seed`,["seed","plant","plants"],[t]),r.plant&&We(r.plant,r.plant?.tileRef?.spritesheet||"plants",`${t}Plant`,r.plant?.name||`${t} Plant`,["plant","plants","tallplants"],[t]),r.crop&&We(r.crop,r.crop?.tileRef?.spritesheet||"plants",t,r.crop?.name||t,["plant","plants"],[`${t}Crop`])}}async function wl(){if(!Y.spritesResolved)return Y.spritesResolving||(Y.spritesResolving=(async()=>{try{await Tl(2e4,50),await ue.init(),mg(Y.data),Y.spritesResolved=!0}catch(e){try{console.warn("[MGData] sprite resolution failed",e)}catch{}}finally{Y.spritesResolving=null}})()),Y.spritesResolving}async function gg(){return Y.isReady||(vl(),cg(),wl(),Y.isReady=!0),!0}function fg(){return Y.isReady}function bg(){return xl(),Y.weatherPollingTimer&&(clearInterval(Y.weatherPollingTimer),Y.weatherPollingTimer=null),Y.isReady=!1,!0}function hg(){return!Y.spritesResolved&&!Y.spritesResolving&&wl(),{...Y.data}}function yg(e){return Y.data[e]??null}function vg(e){return Y.data[e]!=null}async function Tl(e=1e4,t=50){let n=Date.now();for(;Date.now()-n<e;){if(Object.values(Y.data).some(r=>r!=null))return{...Y.data};await Ze(t)}throw new Error("MGData.waitForAnyData: timeout")}async function xg(e,t=1e4,n=50){let r=Date.now();for(;Date.now()-r<t;){let o=Y.data[e];if(o!=null)return o;await Ze(n)}throw new Error(`MGData.waitFor: timeout waiting for "${e}"`)}var Qr,tt,Zr,Io,Eo,xt,eg,bl,tg,ng,og,hl,Y,St,le,dt=G(()=>{"use strict";ye();et();zt();Qr=A,tt=Qr.Object??Object,Zr=tt.keys,Io=tt.values,Eo=tt.entries,xt={items:["WateringCan","PlanterPot","Shovel"],decor:["SmallRock","MediumRock","LargeRock","WoodBench","StoneBench","MarbleBench"],mutations:["Gold","Rainbow","Wet","Chilled","Frozen"],eggs:["CommonEgg","UncommonEgg","RareEgg"],pets:["Worm","Snail","Bee","Chicken","Bunny"],abilities:["ProduceScaleBoost","DoubleHarvest","SeedFinderI","CoinFinderI"],plants:["Carrot","Strawberry","Aloe","Blueberry","Apple"]},eg=["Rain","Frost","Dawn","AmberMoon"],bl=/main-[^/]+\.js(\?|$)/,tg=3,ng=200,og=50,hl=new WeakSet,Y={isReady:!1,isHookInstalled:!1,data:{items:null,decor:null,mutations:null,eggs:null,pets:null,abilities:null,plants:null,weather:null},spritesResolved:!1,spritesResolving:null,weatherPollingTimer:null,weatherPollAttempts:0},St=(e,t)=>t.every(n=>e.includes(n));le={init:gg,isReady:fg,stop:bg,getAll:hg,get:yg,has:vg,waitForAnyData:Tl,waitFor:xg};vl()});function Cg(){let e=(t,n)=>{let r=o=>{o.stopImmediatePropagation(),o.preventDefault?.()};t.addEventListener(n,r,{capture:!0}),K.listeners.push({type:n,handler:r,target:t})};for(let t of kg)e(document,t),e(window,t)}function Pg(){for(let{type:e,handler:t,target:n}of K.listeners)try{n.removeEventListener(e,t,{capture:!0})}catch{}K.listeners.length=0}function Mg(){let e=Object.getPrototypeOf(document);K.savedProps.hidden=Object.getOwnPropertyDescriptor(e,"hidden"),K.savedProps.visibilityState=Object.getOwnPropertyDescriptor(e,"visibilityState"),K.savedProps.hasFocus=document.hasFocus?document.hasFocus.bind(document):null;try{Object.defineProperty(e,"hidden",{configurable:!0,get:()=>!1})}catch{}try{Object.defineProperty(e,"visibilityState",{configurable:!0,get:()=>"visible"})}catch{}try{document.hasFocus=()=>!0}catch{}}function Ag(){let e=Object.getPrototypeOf(document);try{K.savedProps.hidden&&Object.defineProperty(e,"hidden",K.savedProps.hidden)}catch{}try{K.savedProps.visibilityState&&Object.defineProperty(e,"visibilityState",K.savedProps.visibilityState)}catch{}try{K.savedProps.hasFocus&&(document.hasFocus=K.savedProps.hasFocus)}catch{}}function Oo(){K.audioCtx&&K.audioCtx.state!=="running"&&K.audioCtx.resume?.().catch(()=>{})}function Ig(){try{let e=window.AudioContext||window.webkitAudioContext;K.audioCtx=new e({latencyHint:"interactive"}),K.gainNode=K.audioCtx.createGain(),K.gainNode.gain.value=1e-5,K.oscillator=K.audioCtx.createOscillator(),K.oscillator.frequency.value=1,K.oscillator.connect(K.gainNode).connect(K.audioCtx.destination),K.oscillator.start(),document.addEventListener("visibilitychange",Oo,{capture:!0}),window.addEventListener("focus",Oo,{capture:!0})}catch{Cl()}}function Cl(){try{K.oscillator?.stop()}catch{}try{K.oscillator?.disconnect(),K.gainNode?.disconnect()}catch{}try{K.audioCtx?.close?.()}catch{}document.removeEventListener("visibilitychange",Oo,{capture:!0}),window.removeEventListener("focus",Oo,{capture:!0}),K.oscillator=null,K.gainNode=null,K.audioCtx=null}function Eg(){let e=document.querySelector("canvas")||document.body||document.documentElement;K.heartbeatInterval=window.setInterval(()=>{try{e.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:1,clientY:1}))}catch{}},25e3)}function Lg(){K.heartbeatInterval!==null&&(clearInterval(K.heartbeatInterval),K.heartbeatInterval=null)}function Dg(){K.initialized||(K.initialized=!0,Pl())}function Rg(){return K.initialized}function Pl(){K.initialized&&(K.running||(K.running=!0,Mg(),Cg(),Ig(),Eg()))}function Og(){K.running&&(K.running=!1,Lg(),Cl(),Pg(),Ag())}function Gg(){return K.running}var kg,K,Sn,ea=G(()=>{"use strict";kg=["visibilitychange","blur","focus","focusout","pagehide","freeze","resume"],K={initialized:!1,listeners:[],savedProps:{hidden:void 0,visibilityState:void 0,hasFocus:null},audioCtx:null,oscillator:null,gainNode:null,heartbeatInterval:null,running:!1};Sn={init:Dg,isReady:Rg,start:Pl,stop:Og,isRunning:Gg}});function Ng(){return Hg}function wn(){return A.jotaiAtomCache?.cache}function je(e){let t=Ng(),n=t.get(e);if(n)return n;let r=wn();if(!r)return null;for(let o of r.values())if((o?.debugLabel||o?.label||"")===e)return t.set(e,o),o;return null}var Hg,Tn=G(()=>{"use strict";ye();Hg=new Map});function Vt(){return _g}function Go(){if(!Ml){Ml=!0;for(let e of na)try{e()}catch{}try{let e=A.CustomEvent||CustomEvent;A.dispatchEvent?.(new e(Wg))}catch{}}}function Fg(e){na.add(e);let t=ra();if(t.via&&!t.polyfill)try{e()}catch{}return()=>{na.delete(e)}}async function Ho(e={}){let{timeoutMs:t=6e3,intervalMs:n=50}=e,r=ra();if(!(r.via&&!r.polyfill))return new Promise((o,a)=>{let i=!1,s=Fg(()=>{i||(i=!0,s(),o())}),u=Date.now();(async()=>{for(;!i&&Date.now()-u<t;){let l=ra();if(l.via&&!l.polyfill){if(i)return;i=!0,s(),o();return}await kn(n)}i||(i=!0,s(),a(new Error("Store not captured within timeout")))})()})}function Al(){try{let e=A.Event||Event;A.dispatchEvent?.(new e("visibilitychange"))}catch{}}function oa(e){return e&&typeof e=="object"&&typeof e.get=="function"&&typeof e.set=="function"&&typeof e.sub=="function"}function ta(e,t=0,n=new WeakSet){if(t>3||!e||typeof e!="object"||n.has(e))return null;try{n.add(e)}catch{return null}if(oa(e))return e;let r=["store","value","current","state","s","baseStore"];for(let o of r)try{let a=e[o];if(oa(a))return a}catch{}return null}function Il(){let e=Vt(),t=A.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t?.renderers?.size)return null;let n=0;for(let[r]of t.renderers){let o=t.getFiberRoots?.(r);o&&(n+=o.size||0)}if(n===0)return null;for(let[r]of t.renderers){let o=t.getFiberRoots?.(r);if(o)for(let a of o){let i=new Set,s=[a.current];for(;s.length;){let u=s.pop();if(!(!u||i.has(u))){i.add(u);try{let d=u?.pendingProps?.value;if(oa(d))return e.lastCapturedVia="fiber",d}catch{}try{let d=u?.memoizedState,l=0;for(;d&&l<15;){l++;let c=ta(d);if(c)return e.lastCapturedVia="fiber",c;let p=ta(d.memoizedState);if(p)return e.lastCapturedVia="fiber",p;d=d.next}}catch{}try{if(u?.stateNode){let d=ta(u.stateNode);if(d)return e.lastCapturedVia="fiber",d}}catch{}u.child&&s.push(u.child),u.sibling&&s.push(u.sibling),u.alternate&&s.push(u.alternate)}}}}return null}function El(){return{get:()=>{throw new Error("Store not captured: get unavailable")},set:()=>{throw new Error("Store not captured: set unavailable")},sub:()=>()=>{},__polyfill:!0}}async function Bg(e=5e3){let t=Date.now(),n=wn();for(;!n&&Date.now()-t<e;)await kn(100),n=wn();if(!n)throw new Error("jotaiAtomCache.cache not found");let r=Vt(),o=null,a=null,i=[],s=()=>{for(let d of i)try{d.__origWrite&&(d.write=d.__origWrite,delete d.__origWrite)}catch{}};for(let d of n.values()){if(!d||typeof d.write!="function"||d.__origWrite)continue;let l=d.write;d.__origWrite=l,d.write=function(c,p,...m){return a||(o=c,a=p,s()),l.call(this,c,p,...m)},i.push(d)}Al();let u=Date.now();for(;!a&&Date.now()-u<e;)await kn(50);return a?(r.lastCapturedVia="write",{get:d=>o(d),set:(d,l)=>a(d,l),sub:(d,l)=>{let c;try{c=o(d)}catch{}let p=setInterval(()=>{let m;try{m=o(d)}catch{return}if(m!==c){c=m;try{l()}catch{}}},100);return()=>clearInterval(p)}}):(s(),r.lastCapturedVia="polyfill",El())}async function jg(e=1e4){let t=Vt();Al();let n=Date.now();for(;Date.now()-n<e;){let r=Il();if(r)return r;await kn(50)}return t.lastCapturedVia="polyfill",El()}async function No(){let e=Vt();if(e.baseStore&&!e.baseStore.__polyfill)return Go(),e.baseStore;if(e.captureInProgress){let t=Date.now(),n=2500;for(;!e.baseStore&&Date.now()-t<n;)await kn(25);if(e.baseStore)return e.baseStore.__polyfill||Go(),e.baseStore}e.captureInProgress=!0;try{let t=Il();if(t)return e.baseStore=t,Go(),t;try{let r=await Bg(5e3);return e.baseStore=r,r.__polyfill||Go(),r}catch(r){e.captureError=r}let n=await jg();return e.baseStore=n,n}catch(t){throw e.captureError=t,t}finally{e.captureInProgress=!1}}function ra(){let e=Vt();return{via:e.lastCapturedVia,polyfill:!!e.baseStore?.__polyfill,error:e.captureError}}async function Ug(){let e=await No(),t=new WeakMap,n=async o=>{let a=t.get(o);if(a)return a;a={last:void 0,has:!1,subs:new Set},t.set(o,a);try{a.last=e.get(o),a.has=!0}catch{}let i=e.sub(o,()=>{let s;try{s=e.get(o)}catch{return}let u=a.last,d=!Object.is(s,u)||!a.has;if(a.last=s,a.has=!0,d)for(let l of a.subs)try{l(s,u)}catch{}});return a.unsubUpstream=i,a};return{async get(o){let a=await n(o);if(a.has)return a.last;let i=e.get(o);return a.last=i,a.has=!0,i},async set(o,a){await e.set(o,a);let i=await n(o);i.last=a,i.has=!0},async sub(o,a){let i=await n(o);if(i.subs.add(a),i.has)try{a(i.last,i.last)}catch{}return()=>{i.subs.delete(a)}},getShadow(o){return t.get(o)?.last},hasShadow(o){return!!t.get(o)?.has},async ensureWatch(o){await n(o)},async asStore(){return{get:o=>this.get(o),set:(o,a)=>this.set(o,a),sub:(o,a)=>{let i=null;return this.sub(o,()=>a()).then(s=>i=s),()=>i?.()}}}}}async function Cn(){let e=Vt();return e.mirror||(e.mirror=await Ug()),e.mirror}var _g,Wg,Ml,na,kn,Pn=G(()=>{"use strict";ye();Tn();_g={baseStore:null,captureInProgress:!1,captureError:null,lastCapturedVia:null,mirror:void 0};Wg="__JOTAI_STORE_READY__",Ml=!1,na=new Set;kn=e=>new Promise(t=>setTimeout(t,e))});async function aa(){await Cn()}var ne,Fe=G(()=>{"use strict";Pn();Tn();Pn();ne={async select(e){let t=await Cn(),n=je(e);if(!n)throw new Error(`[Store] Atom not found: "${e}"`);return t.get(n)},async set(e,t){let n=await Cn(),r=je(e);if(!r)throw new Error(`[Store] Atom not found: "${e}"`);await n.set(r,t)},async subscribe(e,t){let n=await Cn(),r=je(e);if(!r)throw new Error(`[Store] Atom not found: "${e}"`);return n.sub(r,o=>{try{t(o)}catch{}})},async subscribeImmediate(e,t){let n=await ne.select(e);try{t(n)}catch{}return ne.subscribe(e,t)}}});function Mn(e){return e?Array.isArray(e)?e.slice():e.split(".").map(t=>t.match(/^\d+$/)?Number(t):t):[]}function pt(e,t){let n=Mn(t),r=e;for(let o of n){if(r==null)return;r=r[o]}return r}function ia(e,t,n){let r=Mn(t);if(!r.length)return n;let o=Array.isArray(e)?[...e]:{...e??{}},a=o;for(let i=0;i<r.length-1;i++){let s=r[i],u=a[s],d=typeof u=="object"&&u!==null?Array.isArray(u)?[...u]:{...u}:{};a[s]=d,a=d}return a[r[r.length-1]]=n,o}var _o=G(()=>{"use strict"});function Ll(e,t){let n={};for(let r of t)n[r]=r.includes(".")?pt(e,r):e?.[r];try{return JSON.stringify(n)}catch{return String(n)}}function sa(e,t,n){let r=n.mode??"auto";function o(d){let l=t?pt(d,t):d,c=new Map;if(l==null)return{signatures:c,keys:[]};let p=Array.isArray(l);if((r==="array"||r==="auto"&&p)&&p)for(let f=0;f<l.length;f++){let g=l[f],h=n.key?n.key(g,f,d):f,b=n.sig?n.sig(g,f,d):n.fields?Ll(g,n.fields):JSON.stringify(g);c.set(h,b)}else for(let[f,g]of Object.entries(l)){let h=n.key?n.key(g,f,d):f,b=n.sig?n.sig(g,f,d):n.fields?Ll(g,n.fields):JSON.stringify(g);c.set(h,b)}return{signatures:c,keys:Array.from(c.keys())}}function a(d,l){if(d===l)return!0;if(!d||!l||d.size!==l.size)return!1;for(let[c,p]of d)if(l.get(c)!==p)return!1;return!0}async function i(d){let l=null;return ne.subscribeImmediate(e,c=>{let p=t?pt(c,t):c,{signatures:m}=o(p);if(!a(l,m)){let f=new Set([...l?Array.from(l.keys()):[],...Array.from(m.keys())]),g=[];for(let h of f){let b=l?.get(h)??"__NONE__",T=m.get(h)??"__NONE__";b!==T&&g.push(h)}l=m,d({value:p,changedKeys:g})}})}async function s(d,l){return i(({value:c,changedKeys:p})=>{p.includes(d)&&l({value:c})})}async function u(d,l){let c=new Set(d);return i(({value:p,changedKeys:m})=>{let f=m.filter(g=>c.has(g));f.length&&l({value:p,changedKeys:f})})}return{sub:i,subKey:s,subKeys:u}}var la=G(()=>{"use strict";Fe();_o()});function zg(e,t){let n=$t.get(e);if(n)try{n()}catch{}return $t.set(e,t),()=>{try{t()}catch{}$t.get(e)===t&&$t.delete(e)}}function ce(e,t={}){let{path:n,write:r="replace"}=t,o=n?`${e}:${Mn(n).join(".")}`:e;async function a(){let c=await ne.select(e);return n?pt(c,n):c}async function i(c){if(typeof r=="function"){let f=await ne.select(e),g=r(c,f);return ne.set(e,g)}let p=await ne.select(e),m=n?ia(p,n,c):c;return r==="merge-shallow"&&!n&&p&&typeof p=="object"&&typeof c=="object"?ne.set(e,{...p,...c}):ne.set(e,m)}async function s(c){let p=await a(),m=c(p);return await i(m),m}async function u(c,p,m){let f,g=b=>{let T=n?pt(b,n):b;if(typeof f>"u"||!m(f,T)){let S=f;f=T,p(T,S)}},h=c?await ne.subscribeImmediate(e,g):await ne.subscribe(e,g);return zg(o,h)}function d(){let c=$t.get(o);if(c){try{c()}catch{}$t.delete(o)}}function l(c){return sa(e,c?.path??n,c)}return{label:o,get:a,set:i,update:s,onChange:(c,p=Object.is)=>u(!1,c,p),onChangeNow:(c,p=Object.is)=>u(!0,c,p),asSignature:l,stopOnChange:d}}function w(e){return ce(e)}var $t,ca=G(()=>{"use strict";Fe();_o();la();$t=new Map});var Vg,$g,Kg,Jg,qg,Yg,Xg,Qg,Zg,ef,tf,nf,of,rf,af,sf,lf,cf,uf,df,pf,mf,gf,ff,bf,hf,yf,vf,xf,Sf,wf,Tf,kf,Cf,Pf,Mf,ua,da,pa,Af,If,Ef,Lf,Df,Rf,Of,Gf,Hf,Nf,_f,Wf,Ff,Bf,jf,Uf,zf,Vf,$f,Kf,Jf,qf,Yf,Xf,Qf,Zf,eb,tb,nb,ob,rb,ab,ib,ma,sb,lb,cb,ub,db,pb,mb,gb,fb,bb,hb,yb,vb,xb,Sb,wb,Tb,kb,Cb,Pb,Mb,ga,fa,Ab,Ib,Eb,Lb,Db,Rb,Ob,Gb,Hb,Nb,_b,Wb,Fb,Bb,jb,Ub,zb,Vb,$b,Kb,Jb,qb,Yb,Xb,Qb,Zb,eh,th,nh,oh,rh,ah,ih,sh,lh,ch,uh,dh,ph,mh,gh,fh,bh,hh,yh,vh,xh,Sh,wh,Th,kh,Ch,Ph,Mh,Ah,Ih,Eh,Lh,Dh,ba,Wo,Rh,Oh,Gh,Hh,Nh,_h,Wh,Fh,Bh,jh,Uh,zh,Vh,$h,Kh,Jh,qh,Yh,Xh,Qh,Zh,ey,Dl=G(()=>{"use strict";ca();Vg=w("positionAtom"),$g=w("lastPositionInMyGardenAtom"),Kg=w("playerDirectionAtom"),Jg=w("stateAtom"),qg=w("quinoaDataAtom"),Yg=w("currentTimeAtom"),Xg=w("actionAtom"),Qg=w("isPressAndHoldActionAtom"),Zg=w("mapAtom"),ef=w("tileSizeAtom"),tf=ce("mapAtom",{path:"cols"}),nf=ce("mapAtom",{path:"rows"}),of=ce("mapAtom",{path:"spawnTiles"}),rf=ce("mapAtom",{path:"locations.seedShop.spawnTileIdx"}),af=ce("mapAtom",{path:"locations.eggShop.spawnTileIdx"}),sf=ce("mapAtom",{path:"locations.toolShop.spawnTileIdx"}),lf=ce("mapAtom",{path:"locations.decorShop.spawnTileIdx"}),cf=ce("mapAtom",{path:"locations.sellCropsShop.spawnTileIdx"}),uf=ce("mapAtom",{path:"locations.sellPetShop.spawnTileIdx"}),df=ce("mapAtom",{path:"locations.collectorsClub.spawnTileIdx"}),pf=ce("mapAtom",{path:"locations.wishingWell.spawnTileIdx"}),mf=ce("mapAtom",{path:"locations.shopsCenter.spawnTileIdx"}),gf=w("playerAtom"),ff=w("myDataAtom"),bf=w("myUserSlotIdxAtom"),hf=w("isSpectatingAtom"),yf=w("myCoinsCountAtom"),vf=w("numPlayersAtom"),xf=ce("playerAtom",{path:"id"}),Sf=w("userSlotsAtom"),wf=w("filteredUserSlotsAtom"),Tf=w("myUserSlotAtom"),kf=w("spectatorsAtom"),Cf=ce("stateAtom",{path:"child"}),Pf=ce("stateAtom",{path:"child.data"}),Mf=ce("stateAtom",{path:"child.data.shops"}),ua=ce("stateAtom",{path:"child.data.userSlots"}),da=ce("stateAtom",{path:"data.players"}),pa=ce("stateAtom",{path:"data.hostPlayerId"}),Af=w("myInventoryAtom"),If=w("myInventoryItemsAtom"),Ef=w("isMyInventoryAtMaxLengthAtom"),Lf=w("myFavoritedItemIdsAtom"),Df=w("myCropInventoryAtom"),Rf=w("mySeedInventoryAtom"),Of=w("myToolInventoryAtom"),Gf=w("myEggInventoryAtom"),Hf=w("myDecorInventoryAtom"),Nf=w("myPetInventoryAtom"),_f=ce("myInventoryAtom",{path:"favoritedItemIds"}),Wf=w("itemTypeFiltersAtom"),Ff=w("myItemStoragesAtom"),Bf=w("myPetHutchStoragesAtom"),jf=w("myPetHutchItemsAtom"),Uf=w("myPetHutchPetItemsAtom"),zf=w("myNumPetHutchItemsAtom"),Vf=w("myValidatedSelectedItemIndexAtom"),$f=w("isSelectedItemAtomSuspended"),Kf=w("mySelectedItemAtom"),Jf=w("mySelectedItemNameAtom"),qf=w("mySelectedItemRotationsAtom"),Yf=w("mySelectedItemRotationAtom"),Xf=w("setSelectedIndexToEndAtom"),Qf=w("myPossiblyNoLongerValidSelectedItemIndexAtom"),Zf=w("myCurrentGlobalTileIndexAtom"),eb=w("myCurrentGardenTileAtom"),tb=w("myCurrentGardenObjectAtom"),nb=w("myOwnCurrentGardenObjectAtom"),ob=w("myOwnCurrentDirtTileIndexAtom"),rb=w("myCurrentGardenObjectNameAtom"),ab=w("isInMyGardenAtom"),ib=w("myGardenBoardwalkTileObjectsAtom"),ma=ce("myDataAtom",{path:"garden"}),sb=ce("myDataAtom",{path:"garden.tileObjects"}),lb=ce("myOwnCurrentGardenObjectAtom",{path:"objectType"}),cb=w("myCurrentStablePlantObjectInfoAtom"),ub=w("myCurrentSortedGrowSlotIndicesAtom"),db=w("myCurrentGrowSlotIndexAtom"),pb=w("myCurrentGrowSlotsAtom"),mb=w("myCurrentGrowSlotAtom"),gb=w("secondsUntilCurrentGrowSlotMaturesAtom"),fb=w("isCurrentGrowSlotMatureAtom"),bb=w("numGrowSlotsAtom"),hb=w("myCurrentEggAtom"),yb=w("petInfosAtom"),vb=w("myPetInfosAtom"),xb=w("myPetSlotInfosAtom"),Sb=w("myPrimitivePetSlotsAtom"),wb=w("myNonPrimitivePetSlotsAtom"),Tb=w("expandedPetSlotIdAtom"),kb=w("myPetsProgressAtom"),Cb=w("myActiveCropMutationPetsAtom"),Pb=w("totalPetSellPriceAtom"),Mb=w("selectedPetHasNewVariantsAtom"),ga=w("shopsAtom"),fa=w("myShopPurchasesAtom"),Ab=w("seedShopAtom"),Ib=w("seedShopInventoryAtom"),Eb=w("seedShopRestockSecondsAtom"),Lb=w("seedShopCustomRestockInventoryAtom"),Db=w("eggShopAtom"),Rb=w("eggShopInventoryAtom"),Ob=w("eggShopRestockSecondsAtom"),Gb=w("eggShopCustomRestockInventoryAtom"),Hb=w("toolShopAtom"),Nb=w("toolShopInventoryAtom"),_b=w("toolShopRestockSecondsAtom"),Wb=w("toolShopCustomRestockInventoryAtom"),Fb=w("decorShopAtom"),Bb=w("decorShopInventoryAtom"),jb=w("decorShopRestockSecondsAtom"),Ub=w("decorShopCustomRestockInventoryAtom"),zb=w("isDecorShopAboutToRestockAtom"),Vb=ce("shopsAtom",{path:"seed"}),$b=ce("shopsAtom",{path:"tool"}),Kb=ce("shopsAtom",{path:"egg"}),Jb=ce("shopsAtom",{path:"decor"}),qb=w("myCropItemsAtom"),Yb=w("myCropItemsToSellAtom"),Xb=w("totalCropSellPriceAtom"),Qb=w("friendBonusMultiplierAtom"),Zb=w("myJournalAtom"),eh=w("myCropJournalAtom"),th=w("myPetJournalAtom"),nh=w("myStatsAtom"),oh=w("myActivityLogsAtom"),rh=w("newLogsAtom"),ah=w("hasNewLogsAtom"),ih=w("newCropLogsFromSellingAtom"),sh=w("hasNewCropLogsFromSellingAtom"),lh=w("myCompletedTasksAtom"),ch=w("myActiveTasksAtom"),uh=w("isWelcomeToastVisibleAtom"),dh=w("shouldCloseWelcomeToastAtom"),ph=w("isInitialMoveToDirtPatchToastVisibleAtom"),mh=w("isFirstPlantSeedActiveAtom"),gh=w("isThirdSeedPlantActiveAtom"),fh=w("isThirdSeedPlantCompletedAtom"),bh=w("isDemoTouchpadVisibleAtom"),hh=w("areShopAnnouncersEnabledAtom"),yh=w("arePresentablesEnabledAtom"),vh=w("isEmptyDirtTileHighlightedAtom"),xh=w("isPlantTileHighlightedAtom"),Sh=w("isItemHiglightedInHotbarAtom"),wh=w("isItemHighlightedInModalAtom"),Th=w("isMyGardenButtonHighlightedAtom"),kh=w("isSellButtonHighlightedAtom"),Ch=w("isShopButtonHighlightedAtom"),Ph=w("isInstaGrowButtonHiddenAtom"),Mh=w("isActionButtonHighlightedAtom"),Ah=w("isGardenItemInfoCardHiddenAtom"),Ih=w("isSeedPurchaseButtonHighlightedAtom"),Eh=w("isFirstSeedPurchaseActiveAtom"),Lh=w("isFirstCropHarvestActiveAtom"),Dh=w("isWeatherStatusHighlightedAtom"),ba=w("weatherAtom"),Wo=w("activeModalAtom"),Rh=w("hotkeyBeingPressedAtom"),Oh=w("avatarTriggerAnimationAtom"),Gh=w("avatarDataAtom"),Hh=w("emoteDataAtom"),Nh=w("otherUserSlotsAtom"),_h=w("otherPlayerPositionsAtom"),Wh=w("otherPlayerSelectedItemsAtom"),Fh=w("otherPlayerLastActionsAtom"),Bh=w("traderBunnyPlayerId"),jh=w("npcPlayersAtom"),Uh=w("npcQuinoaUsersAtom"),zh=w("numNpcAvatarsAtom"),Vh=w("traderBunnyEmoteTimeoutAtom"),$h=w("traderBunnyEmoteAtom"),Kh=w("unsortedLeaderboardAtom"),Jh=w("currentGardenNameAtom"),qh=w("quinoaEngineAtom"),Yh=w("quinoaInitializationErrorAtom"),Xh=w("avgPingAtom"),Qh=w("serverClientTimeOffsetAtom"),Zh=w("isEstablishingShotRunningAtom"),ey=w("isEstablishingShotCompleteAtom")});var Tt=G(()=>{"use strict";Fe();Pn();ca();la();_o();Tn();Dl()});function An(){return re}function Rl(){return re.initialized}function Ke(){return re.isCustom&&re.activeModal!==null}function Je(){return re.activeModal}function ha(e){return!re.shadow||re.shadow.modal!==e?null:re.shadow.data}function Ol(e){re.initialized=e}function Fo(e){re.activeModal=e}function Bo(e){re.isCustom=e}function ya(e,t){re.shadow={modal:e,data:t,timestamp:Date.now()}}function va(){re.shadow=null}function xa(e,t){re.patchedAtoms.add(e),re.originalReads.set(e,t)}function Gl(e){return re.originalReads.get(e)}function jo(e){return re.patchedAtoms.has(e)}function Hl(e){re.patchedAtoms.delete(e),re.originalReads.delete(e)}function Nl(e){re.unsubscribes.push(e)}function ty(){for(let e of re.unsubscribes)try{e()}catch{}re.unsubscribes.length=0}function _l(e){return re.listeners.onOpen.add(e),()=>re.listeners.onOpen.delete(e)}function Uo(e){return re.listeners.onClose.add(e),()=>re.listeners.onClose.delete(e)}function Sa(e){for(let t of re.listeners.onOpen)try{t(e)}catch{}}function zo(e){for(let t of re.listeners.onClose)try{t(e)}catch{}}function Wl(){ty(),re.initialized=!1,re.activeModal=null,re.isCustom=!1,re.shadow=null,re.patchedAtoms.clear(),re.originalReads.clear(),re.listeners.onOpen.clear(),re.listeners.onClose.clear()}var re,Vo=G(()=>{"use strict";re={initialized:!1,activeModal:null,isCustom:!1,shadow:null,patchedAtoms:new Set,originalReads:new Map,unsubscribes:[],listeners:{onOpen:new Set,onClose:new Set}}});function wa(e){return $o[e]}function Fl(e){let t=$o[e],n=[];for(let r of t.atoms)n.push(r.atomLabel);if(t.derivedAtoms)for(let r of t.derivedAtoms)n.push(r.atomLabel);return n}var $o,Bl=G(()=>{"use strict";$o={inventory:{atoms:[{atomLabel:"myInventoryAtom",dataKey:"_full",transform:e=>{let t=e;return{items:t.items??[],storages:t.storages??[],favoritedItemIds:t.favoritedItemIds??[]}}}],derivedAtoms:[{atomLabel:"myCropInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Produce"):[]},{atomLabel:"mySeedInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Seed"):[]},{atomLabel:"myToolInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Tool"):[]},{atomLabel:"myEggInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Egg"):[]},{atomLabel:"myDecorInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Decor"):[]},{atomLabel:"myPetInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Pet"):[]}]},journal:{atoms:[{atomLabel:"myJournalAtom",dataKey:"_full"}],derivedAtoms:[{atomLabel:"myCropJournalAtom",sourceKey:"produce",deriveFn:e=>e??{}},{atomLabel:"myPetJournalAtom",sourceKey:"pets",deriveFn:e=>e??{}}]},stats:{atoms:[{atomLabel:"myStatsAtom",dataKey:"_full"}]},activityLog:{atoms:[{atomLabel:"myActivityLogsAtom",dataKey:"logs"}]},seedShop:{atoms:[{atomLabel:"seedShopInventoryAtom",dataKey:"inventory"},{atomLabel:"seedShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},eggShop:{atoms:[{atomLabel:"eggShopInventoryAtom",dataKey:"inventory"},{atomLabel:"eggShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},toolShop:{atoms:[{atomLabel:"toolShopInventoryAtom",dataKey:"inventory"},{atomLabel:"toolShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},decorShop:{atoms:[{atomLabel:"decorShopInventoryAtom",dataKey:"inventory"},{atomLabel:"decorShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},leaderboard:{atoms:[{atomLabel:"unsortedLeaderboardAtom",dataKey:"entries"}]},petHutch:{atoms:[{atomLabel:"myPetHutchItemsAtom",dataKey:"items"},{atomLabel:"myPetHutchPetItemsAtom",dataKey:"petItems"}]}}});function ay(e,t,n,r){return function(a){let i=Ke(),s=Je();if(i&&s===r){let u=ha(r);if(u!==null){let d;if(n.dataKey==="_full"?d=u:d=u[n.dataKey],d!==void 0)return t(a),n.transform?n.transform(d):d}}return t(a)}}function iy(e,t,n,r,o){return function(i){if(Ke()&&Je()===o){let s=ha(o);if(s!==null){let u=s[n];if(u!==void 0)return t(i),r(u)}}return t(i)}}function Ul(e){let t=wa(e);for(let n of t.atoms){let r=je(n.atomLabel);if(!r||jo(n.atomLabel))continue;let o=r.read;if(typeof o!="function")continue;let a=ay(n.atomLabel,o,n,e);r.read=a,xa(n.atomLabel,o)}if(t.derivedAtoms)for(let n of t.derivedAtoms){let r=je(n.atomLabel);if(!r||jo(n.atomLabel))continue;let o=r.read;if(typeof o!="function")continue;let a=iy(n.atomLabel,o,n.sourceKey,n.deriveFn,e);r.read=a,xa(n.atomLabel,o)}}async function In(e){let t=wa(e);for(let r of t.atoms)jl(r.atomLabel);if(t.derivedAtoms)for(let r of t.derivedAtoms)jl(r.atomLabel);let n=await No();await Vl(n,e)}async function zl(e){let t=await No();await Vl(t,e);let n=Fl(e);for(let r of n){let o=je(r);if(o)try{t.get(o)}catch{}}}function jl(e){if(!jo(e))return;let t=je(e),n=Gl(e);t&&n&&(t.read=n),Hl(e)}async function Vl(e,t){let n=ny.has(t),r=oy.has(t),o=ry.has(t);if(!n&&!r&&!o)return;let a=je("stateAtom");if(a)try{let i=e.get(a);if(!i||typeof i!="object")return;let s=null;if(n||r){let u=i.child,d=u?.data;if(u&&d&&typeof d=="object"){let l=null;if(n&&Array.isArray(d.userSlots)){let c=d.userSlots.map(p=>{if(!p||typeof p!="object")return p;let m=p,f=m.data,g=f&&typeof f=="object"?{...f}:f;return{...m,data:g}});l={...l??d,userSlots:c}}if(r&&d.shops&&typeof d.shops=="object"&&(l={...l??d,shops:{...d.shops}}),l){let c={...u,data:l};s={...i,child:c}}}}if(o){let u=i.data;if(u&&Array.isArray(u.players)){let d={...u,players:[...u.players]};s={...s??i,data:d}}}if(!s)return;await e.set(a,s)}catch{}}async function $l(){for(let e of Object.keys($o))await In(e)}var ny,oy,ry,Kl=G(()=>{"use strict";Pn();Tn();Bl();Vo();ny=new Set(["inventory","journal","stats","activityLog","petHutch"]),oy=new Set(["seedShop","eggShop","toolShop","decorShop"]),ry=new Set(["leaderboard"])});async function Jl(){if(An().initialized)return;En=await ne.select("activeModalAtom"),Ko=setInterval(async()=>{try{let n=await ne.select("activeModalAtom"),r=En;r!==n&&(En=n,sy(n,r))}catch{}},50),Nl(()=>{Ko&&(clearInterval(Ko),Ko=null)}),Ol(!0)}function sy(e,t){let n=Ke(),r=Je();e===null&&t!==null&&(n&&r===t?ly("native"):n||zo({modal:t,wasCustom:!1,closedBy:"native"})),e!==null&&!n&&Sa({modal:e,isCustom:!1})}async function ly(e){let t=Je();t&&(va(),Bo(!1),Fo(null),await In(t),zo({modal:t,wasCustom:!0,closedBy:e}))}async function ql(e,t){if(!An().initialized)throw new Error("[MGCustomModal] Not initialized. Call init() first.");Ke()&&await Ta(),ya(e,t),Bo(!0),Fo(e),Ul(e),await zl(e),await Wo.set(e),En=e,Sa({modal:e,isCustom:!0})}function Yl(e,t){let n=An();if(!n.isCustom||n.activeModal!==e||!n.shadow)return;let o={...n.shadow.data,...t};ya(e,o)}async function Ta(){let e=An();if(!e.isCustom||!e.activeModal)return;let t=e.activeModal;va(),Bo(!1),Fo(null),await Wo.set(null),En=null,await In(t),zo({modal:t,wasCustom:!0,closedBy:"api"})}function Xl(){return new Promise(e=>{if(!Ke()){e();return}let t=Uo(()=>{t(),e()})})}async function Ql(){if(Ke()){let e=Je();e&&await In(e)}await $l(),Wl()}var Ko,En,Zl=G(()=>{"use strict";Tt();Fe();Vo();Kl();Ko=null,En=null});var Ln,ka=G(()=>{"use strict";Zl();Vo();Ln={async init(){return Jl()},isReady(){return Rl()},async show(e,t){return ql(e,t)},update(e,t){return Yl(e,t)},async close(){return Ta()},isOpen(){return Je()!==null},isCustomOpen(){return Ke()},getActiveModal(){return Je()},waitForClose(){return Xl()},onOpen(e){return _l(e)},onClose(e){return Uo(e)},destroy(){return Ql()}}});function Jt(e){try{if(typeof structuredClone=="function")return structuredClone(e)}catch{}try{return JSON.parse(JSON.stringify(e))}catch{}return e}function Dn(){return Pe.tos()}function Ma(){return Pe.engine()}function cy(){let e=Dn()?.map?.cols;return Number.isFinite(e)&&e>0?e:null}function Aa(e,t){let n=cy();return n?t*n+e|0:null}function kt(e,t,n=!0){let r=Dn(),o=Aa(e,t);if(!r||o==null)return{gidx:null,tv:null};let a=r.tileViews?.get?.(o)||null;if(!a&&n&&typeof r.getOrCreateTileView=="function")try{a=r.getOrCreateTileView(o)}catch{}return{gidx:o,tv:a||null}}function Kt(e,t,n,r={}){let o=r.ensureView!==!1,a=r.forceUpdate!==!1,i=Ma(),{gidx:s,tv:u}=kt(Number(e),Number(t),o);if(s==null)throw new Error("MGTile: cols unavailable (engine/TOS not ready)");if(!u)throw new Error("MGTile: TileView unavailable (not instantiated)");let d=u.tileObject;if(typeof u.onDataChanged!="function")throw new Error("MGTile: tileView.onDataChanged not found (different API?)");if(u.onDataChanged(n),a&&i?.reusableContext&&typeof u.update=="function")try{u.update(i.reusableContext)}catch{}return{ok:!0,tx:Number(e),ty:Number(t),gidx:s,before:d,after:u.tileObject}}function Ia(e,t){if(!e)throw new Error("MGTile: no tileObject on this tile");if(e.objectType!==t)throw new Error(`MGTile: expected objectType "${t}", got "${e.objectType}"`)}function Ca(e,t){if("startTime"in t&&(e.startTime=Number(t.startTime)),"endTime"in t&&(e.endTime=Number(t.endTime)),"targetScale"in t&&(e.targetScale=Number(t.targetScale)),"mutations"in t){if(!Array.isArray(t.mutations))throw new Error("MGTile: mutations must be an array of strings");e.mutations=t.mutations.slice()}}function nt(){if(!Ue.ready)throw new Error("MGTile: not ready. Call MGTile.init() first.")}function Pa(e){if(!e)return null;let t=o=>o&&(typeof o.getGlobalPosition=="function"||typeof o.toGlobal=="function"),n=["container","root","view","tile","ground","base","floor","bg","background","baseSprite","tileSprite","displayObject","gfx","graphics","sprite"];for(let o of n)if(t(e[o]))return e[o];if(t(e))return e;let r=[e.container,e.root,e.view,e.displayObject,e.tileSprite,e.gfx,e.graphics,e.sprite];for(let o of r)if(t(o))return o;try{for(let o of Object.keys(e))if(t(e[o]))return e[o]}catch{}return null}function qo(e){let t=Ae(()=>e?.getGlobalPosition?.());if(t&&Number.isFinite(t.x)&&Number.isFinite(t.y))return{x:t.x,y:t.y};let n=Ae(()=>e?.toGlobal?.({x:0,y:0}));return n&&Number.isFinite(n.x)&&Number.isFinite(n.y)?{x:n.x,y:n.y}:null}function uy(e){try{if(!e?.getBounds)return"center";let t=e.getBounds(),n=qo(e);if(!n||!t||!Number.isFinite(t.width)||!Number.isFinite(t.height))return"center";let r=t.x+t.width/2,o=t.y+t.height/2;return Math.hypot(n.x-r,n.y-o)<Math.hypot(n.x-t.x,n.y-t.y)?"center":"topleft"}catch{return"center"}}function dy(){let e=Dn(),t=e?.map?.cols,n=e?.map?.rows;if(!e||!Number.isFinite(t)||t<=1)return null;let r=Number.isFinite(n)&&n>1?n:null,o=[[0,0],[1,1],[Math.min(2,t-2),0],[0,1]];r&&r>2&&o.push([Math.floor(t/2),Math.floor(r/2)]);for(let[a,i]of o){if(a<0||i<0||a>=t||r&&i>=r)continue;let s=kt(a,i,!0).tv,u=a+1<t?kt(a+1,i,!0).tv:null,d=kt(a,i+1,!0).tv,l=Pa(s),c=Pa(u),p=Pa(d);if(!l||!c||!p)continue;let m=qo(l),f=qo(c),g=qo(p);if(!m||!f||!g)continue;let h={x:f.x-m.x,y:f.y-m.y},b={x:g.x-m.x,y:g.y-m.y},T=h.x*b.y-h.y*b.x;if(!Number.isFinite(T)||Math.abs(T)<1e-6)continue;let S=1/T,v={a:b.y*S,b:-b.x*S,c:-h.y*S,d:h.x*S},k={x:m.x-a*h.x-i*b.x,y:m.y-a*h.y-i*b.y},y=uy(l),C=y==="center"?k:{x:k.x+.5*(h.x+b.x),y:k.y+.5*(h.y+b.y)};return{ok:!0,cols:t,rows:r,vx:h,vy:b,inv:v,anchorMode:y,originCenter:C}}return null}async function py(e=15e3){return Ue.ready?!0:Jo||(Jo=(async()=>{if(await Pe.init(e),!Dn())throw new Error("MGTile: engine captured but tileObject system not found");return Ue.ready=!0,!0})(),Jo)}function my(){return Pe.hook()}function Yo(e,t,n={}){nt();let r=n.ensureView!==!1,o=n.clone!==!1,{gidx:a,tv:i}=kt(Number(e),Number(t),r);if(a==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!i)return{tx:Number(e),ty:Number(t),gidx:a,tileView:null,tileObject:void 0};let s=i.tileObject;return{tx:Number(e),ty:Number(t),gidx:a,tileView:i,tileObject:o?Jt(s):s}}function gy(e,t,n={}){return nt(),Kt(e,t,null,n)}function fy(e,t,n,r={}){nt();let a=Yo(e,t,{...r,clone:!1}).tileView?.tileObject;Ia(a,"plant");let i=Jt(a);if(Array.isArray(i.slots)||(i.slots=[]),"plantedAt"in n&&(i.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(i.maturedAt=Number(n.maturedAt)),"species"in n&&(i.species=String(n.species)),"slotIdx"in n&&"slotPatch"in n){let s=Number(n.slotIdx)|0;if(!i.slots[s])throw new Error(`MGTile: plant slot ${s} doesn't exist`);return Ca(i.slots[s],n.slotPatch),Kt(e,t,i,r)}if("slots"in n){let s=n.slots;if(Array.isArray(s)){for(let u=0;u<s.length;u++)if(s[u]!=null){if(!i.slots[u])throw new Error(`MGTile: plant slot ${u} doesn't exist`);Ca(i.slots[u],s[u])}}else if(s&&typeof s=="object")for(let u of Object.keys(s)){let d=Number(u)|0;if(Number.isFinite(d)){if(!i.slots[d])throw new Error(`MGTile: plant slot ${d} doesn't exist`);Ca(i.slots[d],s[d])}}else throw new Error("MGTile: patch.slots must be array or object map");return Kt(e,t,i,r)}return Kt(e,t,i,r)}function by(e,t,n,r={}){nt();let a=Yo(e,t,{...r,clone:!1}).tileView?.tileObject;Ia(a,"decor");let i=Jt(a);return"rotation"in n&&(i.rotation=Number(n.rotation)),Kt(e,t,i,r)}function hy(e,t,n,r={}){nt();let a=Yo(e,t,{...r,clone:!1}).tileView?.tileObject;Ia(a,"egg");let i=Jt(a);return"plantedAt"in n&&(i.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(i.maturedAt=Number(n.maturedAt)),Kt(e,t,i,r)}function yy(e,t,n,r={}){nt();let o=r.ensureView!==!1,a=r.forceUpdate!==!1,i=Ma(),{gidx:s,tv:u}=kt(Number(e),Number(t),o);if(s==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!u)throw new Error("MGTile: TileView unavailable");let d=u.tileObject,l=typeof n=="function"?n(Jt(d)):n;if(u.onDataChanged(l),a&&i?.reusableContext&&typeof u.update=="function")try{u.update(i.reusableContext)}catch{}return{ok:!0,tx:Number(e),ty:Number(t),gidx:s,before:d,after:u.tileObject}}function vy(e,t,n={}){nt();let r=n.ensureView!==!1,{gidx:o,tv:a}=kt(Number(e),Number(t),r);if(o==null)throw new Error("MGTile: cols unavailable");if(!a)return{ok:!0,tx:Number(e),ty:Number(t),gidx:o,tv:null,tileObject:void 0};let i=n.clone!==!1,s=a.tileObject;return{ok:!0,tx:Number(e),ty:Number(t),gidx:o,objectType:s?.objectType??null,tileObject:i?Jt(s):s,tvKeys:Object.keys(a||{}).sort(),tileView:a}}function ec(){return nt(),Ue.xform=dy(),Ue.xformAt=Date.now(),{ok:!!Ue.xform?.ok,xform:Ue.xform}}function xy(e,t={}){if(nt(),!e||!Number.isFinite(e.x)||!Number.isFinite(e.y))return null;let n=Number.isFinite(t.maxAgeMs)?Number(t.maxAgeMs):1500;(!Ue.xform?.ok||t.forceRebuild||Date.now()-Ue.xformAt>n)&&ec();let r=Ue.xform;if(!r?.ok)return null;let o=e.x-r.originCenter.x,a=e.y-r.originCenter.y,i=r.inv.a*o+r.inv.b*a,s=r.inv.c*o+r.inv.d*a,u=Math.floor(i),d=Math.floor(s),l=[[u,d],[u+1,d],[u,d+1],[u+1,d+1]],c=null,p=1/0;for(let[m,f]of l){if(m<0||f<0||m>=r.cols||Number.isFinite(r.rows)&&r.rows!==null&&f>=r.rows)continue;let g=r.originCenter.x+m*r.vx.x+f*r.vy.x,h=r.originCenter.y+m*r.vx.y+f*r.vy.y,b=(e.x-g)**2+(e.y-h)**2;b<p&&(p=b,c={tx:m,ty:f,fx:i,fy:s,x:e.x,y:e.y,gidx:null})}return c?(c.gidx=Aa(c.tx,c.ty),c):null}function Sy(){return["MGTile.init()","MGTile.hook()","MGTile.getTileObject(tx,ty) / inspect(tx,ty)","MGTile.setTileEmpty(tx,ty)","MGTile.setTilePlant(tx,ty,{...}) / setTileDecor / setTileEgg","MGTile.setTileObjectRaw(tx,ty,objOrFn)","MGTile.rebuildTransform() / pointToTile({x,y})"].join(`
`)}var Jo,Ue,qe,Xo=G(()=>{"use strict";et();gn();Jo=null,Ue={ready:!1,xform:null,xformAt:0};qe={init:py,ready:()=>Ue.ready,hook:my,engine:()=>Ma(),tos:()=>Dn(),gidx:(e,t)=>Aa(Number(e),Number(t)),getTileObject:Yo,inspect:vy,setTileEmpty:gy,setTilePlant:fy,setTileDecor:by,setTileEgg:hy,setTileObjectRaw:yy,rebuildTransform:ec,pointToTile:xy,help:Sy}});function Qo(e,t,n){return e+(t-e)*n}function wy(e,t,n){let r=e>>16&255,o=e>>8&255,a=e&255,i=t>>16&255,s=t>>8&255,u=t&255,d=Qo(r,i,n)|0,l=Qo(o,s,n)|0,c=Qo(a,u,n)|0;return d<<16|l<<8|c}function Ty(e,t=900){let n=[],r=[e];for(;r.length&&n.length<t;){let o=r.pop();if(!o)continue;Zo(o)&&n.push(o);let a=o.children;if(Array.isArray(a))for(let i=a.length-1;i>=0;i--)r.push(a[i])}return n}function ky(e,t=25e3){let n=[],r=[e],o=0;for(;r.length&&o++<t;){let a=r.pop();if(!a)continue;Ct(a)&&n.push(a);let i=a.children;if(Array.isArray(i))for(let s=i.length-1;s>=0;s--)r.push(i[s])}return n}function tc(e){if(!Array.isArray(e))return[];let t=new Set,n=[];for(let r of e){let o,a;if(Array.isArray(r))o=r[0],a=r[1];else if(Oa(r))o=r.x??r.tx,a=r.y??r.ty;else continue;if(o=Number(o),a=Number(a),!Number.isFinite(o)||!Number.isFinite(a))continue;o|=0,a|=0;let i=`${o},${a}`;t.has(i)||(t.add(i),n.push({x:o,y:a}))}return n}function Cy(e,t){let n=String(e||"").trim();if(!n)throw new Error("MGPixi.defineTileSet: empty name");let r=tc(t);return U.tileSets.set(n,r),{ok:!0,name:n,count:r.length}}function Py(e){return U.tileSets.delete(String(e||"").trim())}function My(){return Array.from(U.tileSets.keys()).sort((e,t)=>e.localeCompare(t))}function nc(e){return!!(e&&(e.tileSet!=null||Array.isArray(e.tiles)))}function Ga(e){let n=qe.tos?.()?.tileViews;if(!n?.entries)throw new Error("MGPixi: TOS.tileViews not found");if(!nc(e))return{entries:Array.from(n.entries()),gidxSet:null};let r=[];if(e.tileSet!=null){let a=String(e.tileSet||"").trim(),i=U.tileSets.get(a);if(!i)throw new Error(`MGPixi: tileSet not found "${a}"`);r=i}else r=tc(e.tiles||[]);let o=new Map;for(let a of r){let i=qe.getTileObject(a.x,a.y,{ensureView:!0,clone:!1});i?.tileView&&i.gidx!=null&&o.set(i.gidx,i.tileView)}return{entries:Array.from(o.entries()),gidxSet:new Set(o.keys())}}function Ha(e){let t=U.highlights.get(e);if(!t)return!1;Ae(()=>U.ticker?.remove(t.tick)),t.root&&t.baseAlpha!=null&&Ct(t.root)&&Ae(()=>{t.root.alpha=t.baseAlpha});for(let n of t.tint)n.o&&Zo(n.o)&&Ae(()=>{n.o.tint=n.baseTint});return U.highlights.delete(e),!0}function oc(e=null){for(let t of Array.from(U.highlights.keys()))e&&!String(t).startsWith(e)||Ha(t);return!0}function rc(e,t={}){if(Pt(),!Ea(e))throw new Error("MGPixi.highlightPulse: invalid root");let n=String(t.key||`hl:${Math.random().toString(16).slice(2)}`);if(U.highlights.has(n))return n;let r=Ct(e)?Number(e.alpha):null,o=Re(Number(t.minAlpha??.12),0,1),a=Re(Number(t.maxAlpha??1),0,1),i=Number(t.speed??1.25),s=(t.tint??8386303)>>>0,u=Re(Number(t.tintMix??.85),0,1),d=t.deepTint!==!1,l=[];if(d)for(let m of Ty(e))l.push({o:m,baseTint:m.tint});else Zo(e)&&l.push({o:e,baseTint:e.tint});let c=performance.now(),p=()=>{let m=(performance.now()-c)/1e3,f=(Math.sin(m*Math.PI*2*i)+1)/2,g=f*f*(3-2*f);r!=null&&Ct(e)&&(e.alpha=Re(Qo(o,a,g)*r,0,1));let h=g*u;for(let b of l)b.o&&Zo(b.o)&&(b.o.tint=wy(b.baseTint,s,h))};return U.ticker?.add(p),U.highlights.set(n,{root:e,tick:p,baseAlpha:r,tint:l}),n}function La(e){if(!e)return null;if(Ea(e))return e;if(!Oa(e))return null;for(let t of Ay){let n=e[t];if(Ea(n))return n}return null}function Iy(e,t){let n=[{o:e,d:0}],r=new Set,o=6;for(;n.length;){let{o:a,d:i}=n.shift();if(!(!a||i>o)&&!r.has(a)){if(r.add(a),Array.isArray(a)){if(a.length===t){let s=new Array(t),u=!0;for(let d=0;d<t;d++){let l=La(a[d]);if(!l){u=!1;break}s[d]=l}if(u)return s}for(let s of a)n.push({o:s,d:i+1});continue}if(Oa(a)){let s=a;for(let u of Object.keys(s))n.push({o:s[u],d:i+1})}}}return null}function Ey(e,t){let n=e?.mutations;if(!Array.isArray(n))return!1;for(let r of n)if(String(r||"").toLowerCase()===t)return!0;return!1}function ac(e,t={}){Pt();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.highlightMutation: empty mutation");let{entries:r,gidxSet:o}=Ga(t),a=`hlmut:${n}:`;if(t.clear===!0)if(!o)oc(a);else for(let c of Array.from(U.highlights.keys())){if(!c.startsWith(a))continue;let p=c.split(":"),m=Number(p[2]);o.has(m)&&Ha(c)}let i={tint:(t.tint??8386303)>>>0,minAlpha:Number(t.minAlpha??.12),maxAlpha:Number(t.maxAlpha??1),speed:Number(t.speed??1.25),tintMix:Number(t.tintMix??.85),deepTint:t.deepTint!==!1},s=0,u=0,d=0,l=0;for(let[c,p]of r){let m=p?.tileObject;if(!m||m.objectType!=="plant")continue;let f=m.slots;if(!Array.isArray(f)||f.length===0)continue;let g=!1,h=[];for(let S=0;S<f.length;S++)Ey(f[S],n)&&(h.push(S),g=!0);if(!g)continue;s++,u+=h.length;let b=p?.childView?.plantVisual||p?.childView||p,T=Iy(b,f.length);if(!T){l+=h.length;continue}for(let S of h){let v=T[S];if(!v){l++;continue}let k=`${a}${c}:${S}`;U.highlights.has(k)||(rc(v,{key:k,...i}),d++)}}return{ok:!0,mutation:n,filtered:!!o,plantsMatched:s,matchedSlots:u,newHighlights:d,failedSlots:l}}function Ly(e,t={}){Pt();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchMutation: empty mutation");let r=`watchmut:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,o=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,a=U.watches.get(r);a&&clearInterval(a);let i=setInterval(()=>{Ae(()=>ac(n,{...t,clear:!1}))},o);return U.watches.set(r,i),{ok:!0,key:r,mutation:n,intervalMs:o}}function Dy(e){let t=String(e||"").trim();if(!t)return!1;if(!t.startsWith("watchmut:")){let r=t.toLowerCase(),o=0;for(let[a,i]of Array.from(U.watches.entries()))a.startsWith(`watchmut:${r}:`)&&(clearInterval(i),U.watches.delete(a),o++);return o>0}let n=U.watches.get(t);return n?(clearInterval(n),U.watches.delete(t),!0):!1}function Ry(e){let t=Array.isArray(e?.slots)?e.slots:[];return{objectType:"plant",species:e?.species??null,plantedAt:e?.plantedAt??null,maturedAt:e?.maturedAt??null,slotCount:t.length,slots:t.map((n,r)=>({idx:r,mutations:Array.isArray(n?.mutations)?n.mutations.slice():[]}))}}function Oy(e,t,n={}){Pt();let r=Number(e)|0,o=Number(t)|0,a=n.ensureView!==!1,i=qe.getTileObject(r,o,{ensureView:a,clone:!1}),s=i?.tileView||null,u=s?.tileObject,d={ok:!0,tx:r,ty:o,gidx:i?.gidx??qe.gidx?.(r,o)??null,hasTileView:!!s,objectType:u?.objectType??null,tileObject:u??null,summary:u?.objectType==="plant"?Ry(u):u?{objectType:u.objectType??null}:null,display:s?s.childView?.plantVisual||s.childView||s.displayObject||s:null};return n.log!==!1&&Ae(()=>console.log("[MGPixi.inspectTile]",d)),d}function Gy(e){let t=e?.childView?.plantVisual||e?.childView?.cropVisual||e?.childView||e?.displayObject||e;return La(t)||La(e?.displayObject)||null}function ic(e){let t=U.fades.get(e);if(!t)return!1;for(let n of t.targets)n.o&&Ct(n.o)&&Number.isFinite(n.baseAlpha)&&Ae(()=>{n.o.alpha=n.baseAlpha});return U.fades.delete(e),!0}function Da(e=null){for(let t of Array.from(U.fades.keys()))e&&!String(t).startsWith(e)||ic(t);return!0}function sc(e,t={}){Pt();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.clearSpeciesFade: empty species");let r=`fade:${n}:`;if(!nc(t))return Da(r);let{gidxSet:o}=Ga(t);if(!o)return Da(r);for(let a of Array.from(U.fades.keys())){if(!a.startsWith(r))continue;let i=Number(a.slice(r.length));o.has(i)&&ic(a)}return!0}function lc(e,t={}){Pt();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.fadeSpecies: empty species");let r=Re(Number(t.alpha??.2),0,1),o=t.deep===!0,{entries:a,gidxSet:i}=Ga(t),s=`fade:${n}:`;t.clear===!0&&sc(n,t);let u=0,d=0,l=0,c=0;for(let[p,m]of a){let f=m?.tileObject;if(!f||f.objectType!=="plant")continue;u++;let g=String(f.species||"").trim().toLowerCase();if(!g||g!==n)continue;d++;let h=Gy(m);if(!h||!Ct(h)){c++;continue}let b=`${s}${p}`;if(U.fades.has(b)){Ae(()=>{h.alpha=r}),l++;continue}let T=o?ky(h):[h],S=[];for(let v of T)Ct(v)&&S.push({o:v,baseAlpha:Number(v.alpha)});for(let v of S)Ae(()=>{v.o.alpha=r});U.fades.set(b,{targets:S}),l++}return{ok:!0,species:n,alpha:r,deep:o,filtered:!!i,plantsSeen:u,matchedPlants:d,applied:l,failed:c,totalFades:U.fades.size}}function Hy(e,t={}){Pt();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchFadeSpecies: empty species");let r=`watchfade:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,o=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,a=U.fadeWatches.get(r);a&&clearInterval(a);let i=setInterval(()=>{Ae(()=>lc(n,{...t,clear:!1}))},o);return U.fadeWatches.set(r,i),{ok:!0,key:r,species:n,intervalMs:o}}function Ny(e){let t=String(e||"").trim();if(!t)return!1;if(!t.startsWith("watchfade:")){let r=t.toLowerCase(),o=0;for(let[a,i]of Array.from(U.fadeWatches.entries()))a.startsWith(`watchfade:${r}:`)&&(clearInterval(i),U.fadeWatches.delete(a),o++);return o>0}let n=U.fadeWatches.get(t);return n?(clearInterval(n),U.fadeWatches.delete(t),!0):!1}function Ra(){let e=A;return e.$PIXI=e.PIXI||null,e.$app=U.app||null,e.$renderer=U.renderer||null,e.$stage=U.stage||null,e.$ticker=U.ticker||null,e.__MG_PIXI__={PIXI:e.$PIXI,app:e.$app,renderer:e.$renderer,stage:e.$stage,ticker:e.$ticker,ready:U.ready},e.__MG_PIXI__}function Pt(){if(!U.ready)throw new Error("MGPixi: call MGPixi.init() first")}async function _y(e=15e3){if(U.ready)return Ra(),!0;if(await Pe.init(e),U.app=Pe.app(),U.ticker=Pe.ticker(),U.renderer=Pe.renderer(),U.stage=Pe.stage(),!U.app||!U.ticker)throw new Error("MGPixi: PIXI app/ticker not found");return U.ready=!0,Ra(),!0}var U,Oa,Ea,Zo,Ct,Ay,Rn,Na=G(()=>{"use strict";et();ye();gn();Xo();U={ready:!1,app:null,renderer:null,stage:null,ticker:null,tileSets:new Map,highlights:new Map,watches:new Map,fades:new Map,fadeWatches:new Map},Oa=e=>!!e&&typeof e=="object"&&!Array.isArray(e),Ea=e=>!!(e&&typeof e.getBounds=="function"&&("parent"in e||"children"in e)),Zo=e=>!!(e&&typeof e.tint=="number"),Ct=e=>!!(e&&typeof e.alpha=="number");Ay=["plantVisual","cropVisual","slotVisual","slotView","displayObject","view","container","root","sprite","gfx","graphics"];Rn={init:_y,ready:()=>U.ready,expose:Ra,get app(){return U.app},get renderer(){return U.renderer},get stage(){return U.stage},get ticker(){return U.ticker},get PIXI(){return A.PIXI||null},defineTileSet:Cy,deleteTileSet:Py,listTileSets:My,highlightPulse:rc,stopHighlight:Ha,clearHighlights:oc,highlightMutation:ac,watchMutation:Ly,stopWatchMutation:Dy,inspectTile:Oy,fadeSpecies:lc,clearSpeciesFade:sc,clearFades:Da,watchFadeSpecies:Hy,stopWatchFadeSpecies:Ny}});function Nn(){if(!$.ready)throw new Error("MGAudio not ready yet")}function uc(e,t=NaN){try{let n=localStorage.getItem(e);if(n==null)return t;let r;try{r=JSON.parse(n)}catch{r=n}if(typeof r=="number"&&Number.isFinite(r))return r;if(typeof r=="string"){let o=parseFloat(r);if(Number.isFinite(o))return o}}catch{}return t}function Hn(e){let t=Wy[e],n=Fy[e];if(!t)return{atom:Gn,vol100:tr(Gn)};let r=uc(t,NaN);if(Number.isFinite(r)){let a=Re(r,0,1);return{atom:a,vol100:tr(a)}}if(n){let a=uc(n,NaN);if(Number.isFinite(a)){let i=Re(a,0,1);return{atom:i,vol100:tr(i)}}}let o=Gn;return{atom:o,vol100:tr(o)}}function By(e){let t=Number(e);if(!Number.isFinite(t))return null;if(t<=0)return 0;let r=(Re(t,1,100)-1)/99;return On+r*(Gn-On)}function tr(e){let t=Re(Number(e),0,1);if(t<=On)return 0;let n=(t-On)/(Gn-On);return Math.round(1+n*99)}function dc(e,t){if(t==null)return Hn(e).atom;let n=By(t);return n===null?Hn(e).atom:Rr(n)}async function pc(){let e=$.ctx;if(e)return e;let t=cc.AudioContext||cc.webkitAudioContext;if(!t)throw new Error("WebAudio not supported");let n=new t;return $.ctx=n,n}async function mc(){if($.ctx&&$.ctx.state==="suspended")try{await $.ctx.resume()}catch{}}function jy(e){let t=new Map,n=(r,o)=>{t.has(r)||t.set(r,[]),t.get(r).push(o)};for(let r of Object.keys(e||{})){let o=/^(.*)_([A-Z])$/.exec(r);o?.[1]?n(o[1],r):n(r,r)}for(let[r,o]of Array.from(t.entries()))o.sort((a,i)=>a.localeCompare(i)),t.set(r,o);$.sfx.groups=t}function Uy(e){let t=$.sfx.atlas;if(!t)throw new Error("SFX atlas not loaded");if(t[e])return e;let n=$.sfx.groups.get(e);if(n?.length)return n[Math.random()*n.length|0];throw new Error(`Unknown sfx/group: ${e}`)}async function zy(){if($.sfx.buffer)return $.sfx.buffer;if(!$.sfx.mp3Url)throw new Error("SFX mp3 url missing");let e=await pc();await mc();let n=await(await yo($.sfx.mp3Url)).arrayBuffer(),r=await new Promise((o,a)=>{let i=e.decodeAudioData(n,o,a);i?.then&&i.then(o,a)});return $.sfx.buffer=r,r}async function Vy(e,t={}){if(!$.ready)throw new Error("MGAudio not ready yet");let n=String(e||"").trim();if(!n)throw new Error("Missing sfx name");let r=Uy(n),o=$.sfx.atlas[r];if(!o)throw new Error(`Missing segment for sfx: ${r}`);let a=await pc();await mc();let i=await zy(),s=Math.max(0,+o.start||0),u=Math.max(s,+o.end||s),d=Math.max(.01,u-s),l=dc("sfx",t.volume),c=a.createGain();c.gain.value=l,c.connect(a.destination);let p=a.createBufferSource();return p.buffer=i,p.connect(c),p.start(0,s,d),{name:r,source:p,start:s,end:u,duration:d,volume:l}}function gc(e){if(e!=="music"&&e!=="ambience")return!1;let t=$.tracks[e];if(t){try{t.pause()}catch{}try{t.src=""}catch{}}return $.tracks[e]=null,!0}function $y(e,t,n={}){if(!$.ready)throw new Error("MGAudio not ready yet");if(e!=="music"&&e!=="ambience")throw new Error(`Invalid category: ${e}`);let r=$.urls[e].get(t);if(!r)throw new Error(`Unknown ${e}: ${t}`);gc(e);let o=new Audio(r);return o.loop=!!n.loop,o.volume=dc(e,n.volume),o.preload="auto",o.play().catch(()=>{}),$.tracks[e]=o,o}async function Ky(e,t,n={}){let r=String(e||"").trim(),o=String(t||"").trim();if(!r||!o)throw new Error("play(category, asset) missing args");if(r==="sfx")return Vy(o,n);if(r==="music"||r==="ambience")return $y(r,o,n);throw new Error(`Unknown category: ${r}`)}function Jy(e,t={}){let n=String(e||"").trim();return n==="music"||n==="ambience"?Array.from($.urls[n].keys()).sort():n==="sfx"?$.sfx.atlas?t.groups?Array.from($.sfx.groups.keys()).sort():Object.keys($.sfx.atlas).sort():[]:[]}function qy(){return $.tracks.music&&($.tracks.music.volume=Hn("music").atom),$.tracks.ambience&&($.tracks.ambience.volume=Hn("ambience").atom),!0}function Yy(){return Nn(),["sfx","music","ambience"]}function Xy(){return Nn(),Array.from($.sfx.groups.keys()).sort((e,t)=>e.localeCompare(t))}function Qy(e,t){Nn();let n=String(e||"").trim().toLowerCase(),r=String(t||"").trim();if(!r||n!=="music"&&n!=="ambience")return!1;let o=$.urls[n],a=r.toLowerCase();for(let i of o.keys())if(i.toLowerCase()===a)return!0;return!1}function Zy(e){Nn();let t=String(e||"").trim();if(!t)return!1;let n=t.toLowerCase();for(let r of $.sfx.groups.keys())if(r.toLowerCase()===n)return!0;return!1}function ev(e,t){Nn();let n=String(e||"").trim().toLowerCase(),r=String(t||"").trim();if(!r)throw new Error("getTrackUrl(category, name) missing name");if(n!=="music"&&n!=="ambience")throw new Error(`Invalid category: ${e}`);let o=$.urls[n],a=r.toLowerCase();for(let[i,s]of o.entries())if(i.toLowerCase()===a)return s;return null}async function tv(){return $.ready?!0:er||(er=(async()=>{$.baseUrl=await Be.base();let e=await Oe.load($.baseUrl),t=Oe.getBundle(e,"audio");if(!t)throw new Error("No audio bundle in manifest");for(let n of t.assets||[])for(let r of n.src||[]){if(typeof r!="string")continue;let o=/^audio\/(ambience|music)\/(.+)\.mp3$/i.exec(r);if(o){let a=o[1].toLowerCase(),i=o[2];$.urls[a].set(i,Ie($.baseUrl,r));continue}/^audio\/sfx\/sfx\.mp3$/i.test(r)&&($.sfx.mp3Url=Ie($.baseUrl,r)),/^audio\/sfx\/sfx\.json$/i.test(r)&&($.sfx.atlasUrl=Ie($.baseUrl,r))}if(!$.sfx.atlasUrl)throw new Error("Missing audio/sfx/sfx.json in manifest");return $.sfx.atlas=await Nt($.sfx.atlasUrl),jy($.sfx.atlas),$.ready=!0,!0})(),er)}var cc,Wy,Fy,On,Gn,er,$,_n,_a=G(()=>{"use strict";ye();et();fn();_t();Wt();vn();cc=A??window,Wy={sfx:"soundEffectsVolume",music:"musicVolume",ambience:"ambienceVolume"},Fy={sfx:"soundEffectsVolumeAtom",music:"musicVolumeAtom",ambience:"ambienceVolumeAtom"},On=.001,Gn=.2,er=null,$={ready:!1,baseUrl:null,urls:{ambience:new Map,music:new Map},sfx:{mp3Url:null,atlasUrl:null,atlas:null,groups:new Map,buffer:null},tracks:{ambience:null,music:null},ctx:null};_n={init:tv,ready:()=>$.ready,play:Ky,stop:gc,list:Jy,refreshVolumes:qy,categoryVolume:Hn,getCategories:Yy,getGroups:Xy,hasTrack:Qy,hasGroup:Zy,getTrackUrl:ev}});function nv(){if(pe.overlay)return pe.overlay;let e=Wa.createElement("div");return e.id="MG_COSMETIC_OVERLAY",e.style.cssText=["position:fixed","left:0","top:0","width:100vw","height:100vh","pointer-events:none","z-index:99999999"].join(";"),Wa.documentElement.appendChild(e),pe.overlay=e,e}function ov(){let e=pe.defaultParent;if(!e)return null;try{return typeof e=="function"?e():e}catch{return null}}function Fa(e){let t=String(e||"").trim();return t?(t=t.replace(/^cosmetic\//i,""),t=t.replace(/\.png$/i,""),t):""}function rv(e,t){if(t===void 0){let a=Fa(e),i=a.indexOf("_");return i<0?{cat:"",asset:a,base:a}:{cat:a.slice(0,i),asset:a.slice(i+1),base:a}}let n=String(e||"").trim(),r=Fa(t),o=r.includes("_")?r:`${n}_${r}`;if(r.includes("_")&&!n){let a=r.indexOf("_");return{cat:r.slice(0,a),asset:r.slice(a+1),base:r}}return{cat:n,asset:r.replace(/^.+?_/,""),base:o}}function av(){return Array.from(pe.byCat.keys()).sort((e,t)=>e.localeCompare(t))}function iv(e){let t=pe.byCat.get(String(e||"").trim());return t?Array.from(t.keys()).sort((n,r)=>n.localeCompare(r)):[]}function Ba(e,t){let{cat:n,asset:r,base:o}=rv(e,t),a=pe.byBase.get(o);if(a)return a;let s=pe.byCat.get(n)?.get(r);if(s)return s;if(!pe.baseUrl)throw new Error("MGCosmetic not initialized");if(!o)throw new Error("Invalid cosmetic name");return Ie(pe.baseUrl,`cosmetic/${o}.png`)}function ja(e,t,n){if(!pe.ready)throw new Error("MGCosmetic not ready yet");let r,o;typeof t=="object"&&t!==null?(r=t,o=void 0):typeof t=="string"?(o=t,r=n||{}):(o=void 0,r=n||{});let a=o!==void 0?Ba(e,o):Ba(e),i=Wa.createElement("img");if(i.decoding="async",i.loading="eager",i.src=a,i.alt=r.alt!=null?String(r.alt):Fa(o??e),r.className&&(i.className=String(r.className)),r.width!=null&&(i.style.width=String(r.width)),r.height!=null&&(i.style.height=String(r.height)),r.opacity!=null&&(i.style.opacity=String(r.opacity)),r.style&&typeof r.style=="object")for(let[s,u]of Object.entries(r.style))try{i.style[s]=String(u)}catch{}return i}function sv(e,t,n){let r,o;typeof t=="object"&&t!==null?(r=t,o=void 0):typeof t=="string"?(o=t,r=n||{}):(o=void 0,r=n||{});let a=r.parent||ov()||nv(),i=o!==void 0?ja(e,o,r):ja(e,r);if(a===pe.overlay||r.center||r.x!=null||r.y!=null||r.absolute){i.style.position="absolute",i.style.pointerEvents="none",i.style.zIndex=String(r.zIndex??999999);let u=r.scale??1,d=r.rotation??0;if(r.center)i.style.left="50%",i.style.top="50%",i.style.transform=`translate(-50%, -50%) scale(${u}) rotate(${d}rad)`;else{let l=r.x??innerWidth/2,c=r.y??innerHeight/2;i.style.left=`${l}px`,i.style.top=`${c}px`,i.style.transform=`scale(${u}) rotate(${d}rad)`,r.anchor==="center"&&(i.style.transform=`translate(-50%, -50%) scale(${u}) rotate(${d}rad)`)}}return a.appendChild(i),pe.live.add(i),i.__mgDestroy=()=>{try{i.remove()}catch{}pe.live.delete(i)},i}function lv(e){return pe.defaultParent=e,!0}function cv(){for(let e of Array.from(pe.live))e.__mgDestroy?.()}async function uv(){return pe.ready?!0:nr||(nr=(async()=>{pe.baseUrl=await Be.base();let e=await Oe.load(pe.baseUrl),t=Oe.getBundle(e,"cosmetic");if(!t)throw new Error("No 'cosmetic' bundle in manifest");pe.byCat.clear(),pe.byBase.clear();for(let n of t.assets||[])for(let r of n.src||[]){if(typeof r!="string"||!/^cosmetic\/.+\.png$/i.test(r))continue;let a=r.split("/").pop().replace(/\.png$/i,""),i=a.indexOf("_");if(i<0)continue;let s=a.slice(0,i),u=a.slice(i+1),d=Ie(pe.baseUrl,r);pe.byBase.set(a,d),pe.byCat.has(s)||pe.byCat.set(s,new Map),pe.byCat.get(s).set(u,d)}return pe.ready=!0,!0})(),nr)}var Wa,nr,pe,Wn,Ua=G(()=>{"use strict";ye();_t();Wt();vn();Wa=A?.document??document,nr=null,pe={ready:!1,baseUrl:null,byCat:new Map,byBase:new Map,overlay:null,live:new Set,defaultParent:null};Wn={init:uv,ready:()=>pe.ready,categories:av,list:iv,url:Ba,create:ja,show:sv,attach:lv,clear:cv}});var fc=G(()=>{"use strict"});function dv(){return Fn||(Fn=new or),Fn}function pv(){Fn&&(Fn=null)}var or,Fn,bc=G(()=>{"use strict";or=class{constructor(){oe(this,"achievements",new Map);oe(this,"data");oe(this,"storageKey","gemini_achievements");oe(this,"onUnlockCallbacks",[]);oe(this,"onProgressCallbacks",[]);this.data=this.loadData()}loadData(){try{let t=localStorage.getItem(this.storageKey);if(t)return JSON.parse(t)}catch(t){console.warn("[Achievements] Failed to load data:",t)}return{unlocked:{},progress:{}}}saveData(){try{localStorage.setItem(this.storageKey,JSON.stringify(this.data))}catch(t){console.warn("[Achievements] Failed to save data:",t)}}register(t){this.achievements.set(t.id,t),this.data.progress[t.id]||(this.data.progress[t.id]={current:0,target:t.target,percentage:0})}registerMany(t){for(let n of t)this.register(n)}async checkAchievement(t){let n=this.achievements.get(t);if(!n)throw new Error(`Achievement not found: ${t}`);let r=this.isUnlocked(t),o=await n.checkProgress(),a={current:o,target:n.target,percentage:Math.min(100,Math.floor(o/n.target*100))},i=this.data.progress[t];this.data.progress[t]=a;let s=o>=n.target;return!r&&s?this.unlock(t,a):s||this.triggerProgressCallbacks({achievement:n,progress:a,previousProgress:i}),this.saveData(),{id:t,wasUnlocked:r,isUnlocked:s,progress:a}}async checkAllAchievements(){let t=[];for(let n of this.achievements.keys()){let r=await this.checkAchievement(n);t.push(r)}return t}unlock(t,n){let r=this.achievements.get(t);if(!r)return;let o={achievementId:t,unlockedAt:Date.now(),progress:n};this.data.unlocked[t]=o,this.saveData(),this.triggerUnlockCallbacks({achievement:r,unlockedAt:o.unlockedAt,progress:n})}isUnlocked(t){return!!this.data.unlocked[t]}getAchievement(t){return this.achievements.get(t)||null}getAllAchievements(){return Array.from(this.achievements.values())}getAchievementsByCategory(t){return Array.from(this.achievements.values()).filter(n=>n.category===t)}getAchievementsByRarity(t){return Array.from(this.achievements.values()).filter(n=>n.rarity===t)}getUnlockedAchievements(){return Object.values(this.data.unlocked)}getLockedAchievements(){return Array.from(this.achievements.values()).filter(t=>!this.isUnlocked(t.id)&&!t.hidden)}getProgress(t){return this.data.progress[t]||null}getCompletionPercentage(){let t=this.achievements.size,n=Object.keys(this.data.unlocked).length;return t>0?Math.floor(n/t*100):0}getCompletionStats(){let t=this.achievements.size,n=Object.keys(this.data.unlocked).length,r=t-n,o=this.getCompletionPercentage();return{total:t,unlocked:n,locked:r,percentage:o}}onUnlock(t){return this.onUnlockCallbacks.push(t),()=>{let n=this.onUnlockCallbacks.indexOf(t);n!==-1&&this.onUnlockCallbacks.splice(n,1)}}onProgress(t){return this.onProgressCallbacks.push(t),()=>{let n=this.onProgressCallbacks.indexOf(t);n!==-1&&this.onProgressCallbacks.splice(n,1)}}triggerUnlockCallbacks(t){for(let n of this.onUnlockCallbacks)try{n(t)}catch(r){console.warn("[Achievements] Unlock callback error:",r)}}triggerProgressCallbacks(t){for(let n of this.onProgressCallbacks)try{n(t)}catch(r){console.warn("[Achievements] Progress callback error:",r)}}reset(){this.data={unlocked:{},progress:{}};for(let t of this.achievements.values())this.data.progress[t.id]={current:0,target:t.target,percentage:0};this.saveData()}exportData(){return JSON.stringify(this.data,null,2)}importData(t){try{let n=JSON.parse(t);return this.data=n,this.saveData(),!0}catch(n){return console.warn("[Achievements] Failed to import data:",n),!1}}},Fn=null});var rr={};Ot(rr,{AchievementManager:()=>or,destroyAchievementManager:()=>pv,getAchievementManager:()=>dv});var hc=G(()=>{"use strict";fc();bc()});function ar(e){let t=1,n=0,r=0;for(let o of e)o==="Gold"||o==="Rainbow"?o==="Rainbow"?t=qt.Rainbow:t===1&&(t=qt.Gold):o in qt&&(n+=qt[o],r++);return t*(1+n-r)}function za(e){return qt[e]??null}function Va(e){return mv.has(e)}function yc(e){return gv.has(e)}function fv(){return Object.keys(qt)}function bv(e){let t=za(e);return t===null?null:{name:e,value:t,type:Va(e)?"growth":"environmental"}}var qt,mv,gv,ir=G(()=>{"use strict";qt={Gold:25,Rainbow:50,Frozen:10,Chilled:5,Wet:2},mv=new Set(["Gold","Rainbow"]),gv=new Set(["Frozen","Chilled","Wet"])});function vc(e,t){let n=sr(e);if(!n)return 50;let r=n.maxScale;if(t<=1)return 50;if(t>=r)return 100;let o=(t-1)/(r-1);return Math.floor(50+50*o)}function $a(e,t,n){let r=sr(e);if(!r)return 0;let o=r.baseSellPrice,a=ar(n);return Math.round(o*t*a)}function xc(e,t,n){if(n>=t)return 100;if(n<=e)return 0;let r=t-e,o=n-e;return Math.floor(o/r*100)}function Sc(e,t){return t>=e}function hv(e,t){let n=Math.max(0,e-t);return Math.floor(n/1e3)}function sr(e){let t=le.get("plants");if(!t)return null;let n=t[e];return n?.crop?{baseSellPrice:n.crop.baseSellPrice??0,maxScale:n.crop.maxScale??1,growTime:n.crop.growTime??0}:null}function yv(e){return e.reduce((t,n)=>t+$a(n.species,n.targetScale,n.mutations),0)}var Ka=G(()=>{"use strict";dt();ir()});function Mt(e){return e/wc}function At(e,t){let n=Lt(e);if(!n)return Ja;let r=n.maxScale;if(t<=1)return Ja;if(t>=r)return vv;let o=(t-1)/(r-1);return Math.floor(Ja+20*o)}function It(e,t,n){let r=Lt(e);if(!r)return n-Bn;let o=r.hoursToMature,a=t/wc,i=Bn/o,s=Math.min(i*a,Bn),u=n-Bn;return Math.floor(u+s)}function Et(e,t){let n=Lt(e);return n?t>=n.hoursToMature:!1}function lr(e){let t=Lt(e);return t?Bn/t.hoursToMature:0}function qa(e,t,n){let r=t-e;return r<=0||n<=0?0:r/n}function xv(e,t){let n=Lt(e);if(!n)return 0;let r=n.hoursToMature-t;return Math.max(0,r)}function Lt(e){let t=le.get("pets");if(!t)return null;let n=t[e];return n?{hoursToMature:n.hoursToMature??0,maxScale:n.maxScale??1,abilities:n.abilities??[]}:null}function Ya(e,t){return t<=0?1:Math.min(1,e/t)}var wc,Ja,vv,Bn,Xa=G(()=>{"use strict";dt();wc=3600,Ja=80,vv=100,Bn=30});var cr={};Ot(cr,{calculateCropProgress:()=>xc,calculateCropSellPrice:()=>$a,calculateCropSize:()=>vc,calculateCurrentStrength:()=>It,calculateHoursToMature:()=>xv,calculateHoursToMaxStrength:()=>qa,calculateMaxStrength:()=>At,calculateMutationMultiplier:()=>ar,calculatePetAge:()=>Mt,calculateStrengthPerHour:()=>lr,calculateStrengthProgress:()=>Ya,calculateTimeRemaining:()=>hv,calculateTotalCropValue:()=>yv,getAllMutationNames:()=>fv,getCropData:()=>sr,getMutationInfo:()=>bv,getMutationValue:()=>za,getPetData:()=>Lt,isCropReady:()=>Sc,isEnvironmentalMutation:()=>yc,isGrowthMutation:()=>Va,isPetMature:()=>Et});var ur=G(()=>{"use strict";Ka();Xa();ir();Ka();Xa();ir()});var Qa={};Ot(Qa,{calculatePetStrength:()=>Tc,enrichPetWithStrength:()=>kc,enrichPetsWithStrength:()=>Cc,getPetStrengthStats:()=>Sv});function Tc(e){let t=Mt(e.xp),n=At(e.petSpecies,e.targetScale),r=It(e.petSpecies,e.xp,n),o=Et(e.petSpecies,t),a=lr(e.petSpecies),i=qa(r,n,a),s=Ya(r,n);return{current:r,max:n,progress:s,age:t,isMature:o,strengthPerHour:a,hoursToMax:i}}function kc(e){return{...e,strength:Tc(e)}}function Cc(e){return e.map(kc)}function Sv(e){if(e.length===0)return{averageCurrent:0,averageMax:0,totalMature:0,totalImmature:0,strongestPet:null,weakestPet:null};let t=Cc(e),n=t.reduce((u,d)=>u+d.strength.current,0),r=t.reduce((u,d)=>u+d.strength.max,0),o=t.filter(u=>u.strength.isMature).length,a=t.length-o,i=t.reduce((u,d)=>d.strength.max>(u?.strength.max||0)?d:u,t[0]),s=t.reduce((u,d)=>d.strength.max<(u?.strength.max||1/0)?d:u,t[0]);return{averageCurrent:Math.round(n/t.length),averageMax:Math.round(r/t.length),totalMature:o,totalImmature:a,strongestPet:i,weakestPet:s}}var Pc=G(()=>{"use strict";ur()});var Mc=G(()=>{"use strict"});function Te(e,t){if(e===t)return!0;if(e===null||t===null)return e===t;if(typeof e!=typeof t)return!1;if(typeof e!="object")return e===t;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return!1;for(let i=0;i<e.length;i++)if(!Te(e[i],t[i]))return!1;return!0}if(Array.isArray(e)||Array.isArray(t))return!1;let n=e,r=t,o=Object.keys(n),a=Object.keys(r);if(o.length!==a.length)return!1;for(let i of o)if(!Object.prototype.hasOwnProperty.call(r,i)||!Te(n[i],r[i]))return!1;return!0}var mt=G(()=>{"use strict";Fe()});function wv(e){let t=e.currentGardenTile;return{globalIndex:e.globalTileIndex,localIndex:t?.localTileIndex??null}}function Tv(e){return{type:e.currentGardenTile?.tileType??null,isEmpty:e.gardenObject===null}}function kv(e){let t=e.currentGardenTile;return{name:e.gardenName,isOwner:e.isInMyGarden??!1,playerSlotIndex:t?.userSlotIdx??null}}function Cv(e){let t=e.gardenObject;return t?{type:t.objectType,data:t,isMature:e.isMature??!1}:{type:null,data:null,isMature:!1}}function Pv(e){let t=e.gardenObject;if(!t||t.objectType!=="plant")return null;let n=t,r=e.sortedSlotIndices??[];return{species:n.species,slots:n.slots??[],currentSlotIndex:e.currentGrowSlotIndex,sortedSlotIndices:r,nextHarvestSlotIndex:r.length>0?r[0]:null}}function Ec(e){return{position:wv(e),tile:Tv(e),garden:kv(e),object:Cv(e),plant:Pv(e)}}function Lc(e){return JSON.stringify({globalIndex:e.position.globalIndex,localIndex:e.position.localIndex,tileType:e.tile.type,isEmpty:e.tile.isEmpty,gardenName:e.garden.name,isOwner:e.garden.isOwner,playerSlotIndex:e.garden.playerSlotIndex,objectType:e.object.type,isMature:e.object.isMature,plantSpecies:e.plant?.species??null,slotCount:e.plant?.slots.length??0})}function Mv(e,t){return e.type!==t.type||e.isMature!==t.isMature?!0:e.data===null&&t.data===null?!1:e.data===null||t.data===null?!0:!Te(e.data,t.data)}function Av(e,t){return e===null&&t===null?!1:e===null||t===null||e.species!==t.species||e.currentSlotIndex!==t.currentSlotIndex||e.nextHarvestSlotIndex!==t.nextHarvestSlotIndex||e.slots.length!==t.slots.length?!0:!Te(e.sortedSlotIndices,t.sortedSlotIndices)}function Iv(e,t){return e.name!==t.name||e.isOwner!==t.isOwner||e.playerSlotIndex!==t.playerSlotIndex}function Ev(){let e=Ic,t=Ic,n=!1,r=[],o={all:new Set,stable:new Set,object:new Set,plantInfo:new Set,garden:new Set},a={},i=Object.keys(Ac),s=new Set;function u(){if(s.size<i.length)return;let l=Ec(a);if(!Te(e,l)&&(t=e,e=l,!!n)){for(let c of o.all)c(e,t);if(Lc(t)!==Lc(e))for(let c of o.stable)c(e,t);if(Mv(t.object,e.object)){let c={current:e.object,previous:t.object};for(let p of o.object)p(c)}if(Av(t.plant,e.plant)){let c={current:e.plant,previous:t.plant};for(let p of o.plantInfo)p(c)}if(Iv(t.garden,e.garden)){let c={current:e.garden,previous:t.garden};for(let p of o.garden)p(c)}}}async function d(){if(n)return;let l=i.map(async c=>{let p=Ac[c],m=await ne.subscribe(p,f=>{a[c]=f,s.add(c),u()});r.push(m)});await Promise.all(l),n=!0,s.size===i.length&&(e=Ec(a))}return d(),{get(){return e},subscribe(l,c){return o.all.add(l),c?.immediate!==!1&&n&&s.size===i.length&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,c){return o.stable.add(l),c?.immediate!==!1&&n&&s.size===i.length&&l(e,e),()=>o.stable.delete(l)},subscribeObject(l,c){return o.object.add(l),c?.immediate&&n&&s.size===i.length&&l({current:e.object,previous:e.object}),()=>o.object.delete(l)},subscribePlantInfo(l,c){return o.plantInfo.add(l),c?.immediate&&n&&s.size===i.length&&l({current:e.plant,previous:e.plant}),()=>o.plantInfo.delete(l)},subscribeGarden(l,c){return o.garden.add(l),c?.immediate&&n&&s.size===i.length&&l({current:e.garden,previous:e.garden}),()=>o.garden.delete(l)},destroy(){for(let l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.object.clear(),o.plantInfo.clear(),o.garden.clear(),n=!1}}}function ei(){return Za||(Za=Ev()),Za}var Ac,Ic,Za,ti=G(()=>{"use strict";Fe();mt();Ac={currentGardenTile:"myCurrentGardenTileAtom",globalTileIndex:"myCurrentGlobalTileIndexAtom",gardenObject:"myCurrentGardenObjectAtom",isMature:"isGardenObjectMatureAtom",isInMyGarden:"isInMyGardenAtom",gardenName:"currentGardenNameAtom",sortedSlotIndices:"myCurrentSortedGrowSlotIndicesAtom",currentGrowSlotIndex:"myCurrentGrowSlotIndexAtom"},Ic={position:{globalIndex:null,localIndex:null},tile:{type:null,isEmpty:!0},garden:{name:null,isOwner:!1,playerSlotIndex:null},object:{type:null,data:null,isMature:!1},plant:null};Za=null});function Rc(e,t){let n=Mt(e.xp),r=At(e.petSpecies,e.targetScale),o=It(e.petSpecies,e.xp,r),a=Et(e.petSpecies,n);return{id:e.id,petSpecies:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,mutations:[...e.mutations],targetScale:e.targetScale,abilities:[...e.abilities],location:t,position:null,lastAbilityTrigger:null,growthStage:n,currentStrength:o,maxStrength:r,isMature:a}}function Lv(e,t){let r=t[e.slot.id]?.lastAbilityTrigger??null,o=Mt(e.slot.xp),a=At(e.slot.petSpecies,e.slot.targetScale),i=It(e.slot.petSpecies,e.slot.xp,a),s=Et(e.slot.petSpecies,o);return{id:e.slot.id,petSpecies:e.slot.petSpecies,name:e.slot.name,xp:e.slot.xp,hunger:e.slot.hunger,mutations:[...e.slot.mutations],targetScale:e.slot.targetScale,abilities:[...e.slot.abilities],location:"active",position:e.position?{x:e.position.x,y:e.position.y}:null,lastAbilityTrigger:r,growthStage:o,currentStrength:i,maxStrength:a,isMature:s}}function Oc(e){let t=new Set,n=[];for(let u of e.active??[]){let d=Lv(u,e.slotInfos??{});n.push(d),t.add(d.id)}let r=[];for(let u of e.inventory??[]){if(t.has(u.id))continue;let d=Rc(u,"inventory");r.push(d),t.add(d.id)}let o=[];for(let u of e.hutch??[]){if(t.has(u.id))continue;let d=Rc(u,"hutch");o.push(d),t.add(d.id)}let a=[...n,...r,...o],i=e.expandedPetSlotId??null,s=i?a.find(u=>u.id===i)??null:null;return{all:a,byLocation:{inventory:r,hutch:o,active:n},counts:{inventory:r.length,hutch:o.length,active:n.length,total:a.length},expandedPetSlotId:i,expandedPet:s}}function Dv(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}function Hc(e){return JSON.stringify({id:e.id,petSpecies:e.petSpecies,name:e.name,mutations:e.mutations,abilities:e.abilities,location:e.location})}function Rv(e,t){if(e.all.length!==t.all.length)return!1;let n=e.all.map(Hc),r=t.all.map(Hc);return Dv(n,r)}function Ov(e,t){let n=[],r=new Map(e.all.map(o=>[o.id,o]));for(let o of t.all){let a=r.get(o.id);a&&a.location!==o.location&&n.push({pet:o,from:a.location,to:o.location})}return n}function Gv(e,t){let n=[],r=new Map(e.all.map(o=>[o.id,o]));for(let o of t.all){if(!o.lastAbilityTrigger)continue;let i=r.get(o.id)?.lastAbilityTrigger;(!i||i.abilityId!==o.lastAbilityTrigger.abilityId||i.performedAt!==o.lastAbilityTrigger.performedAt)&&n.push({pet:o,trigger:o.lastAbilityTrigger})}return n}function Hv(e,t){let n=new Set(e.all.map(i=>i.id)),r=new Set(t.all.map(i=>i.id)),o=t.all.filter(i=>!n.has(i.id)),a=e.all.filter(i=>!r.has(i.id));return o.length===0&&a.length===0?null:{added:o,removed:a,counts:t.counts}}function Nv(e,t){let n=[],r=new Map(e.all.map(o=>[o.id,o]));for(let o of t.all){let a=r.get(o.id);a&&o.growthStage>a.growthStage&&n.push({pet:o,previousStage:a.growthStage,newStage:o.growthStage})}return n}function _v(e,t){let n=[],r=new Map(e.all.map(o=>[o.id,o]));for(let o of t.all){let a=r.get(o.id);a&&o.currentStrength>a.currentStrength&&n.push({pet:o,previousStrength:a.currentStrength,newStrength:o.currentStrength})}return n}function Wv(e,t){let n=[],r=new Map(e.all.map(o=>[o.id,o]));for(let o of t.all){let a=r.get(o.id);a&&o.currentStrength===o.maxStrength&&a.currentStrength<a.maxStrength&&n.push({pet:o})}return n}function Fv(){let e=Gc,t=Gc,n=!1,r=[],o={all:new Set,stable:new Set,location:new Set,ability:new Set,count:new Set,expandedPet:new Set,growth:new Set,strengthGain:new Set,maxStrength:new Set},a={},i=Object.keys(Dc),s=new Set;function u(){if(s.size<i.length)return;let l=Oc(a);if(Te(e,l)||(t=e,e=l,!n))return;for(let b of o.all)b(e,t);if(!Rv(t,e))for(let b of o.stable)b(e,t);let c=Ov(t,e);for(let b of c)for(let T of o.location)T(b);let p=Gv(t,e);for(let b of p)for(let T of o.ability)T(b);let m=Hv(t,e);if(m)for(let b of o.count)b(m);let f=Nv(t,e);for(let b of f)for(let T of o.growth)T(b);let g=_v(t,e);for(let b of g)for(let T of o.strengthGain)T(b);let h=Wv(t,e);for(let b of h)for(let T of o.maxStrength)T(b);if(t.expandedPetSlotId!==e.expandedPetSlotId){let b={current:e.expandedPet,previous:t.expandedPet,currentId:e.expandedPetSlotId,previousId:t.expandedPetSlotId};for(let T of o.expandedPet)T(b)}}async function d(){if(n)return;let l=i.map(async c=>{let p=Dc[c],m=await ne.subscribe(p,f=>{a[c]=f,s.add(c),u()});r.push(m)});await Promise.all(l),n=!0,s.size===i.length&&(e=Oc(a))}return d(),{get(){return e},subscribe(l,c){return o.all.add(l),c?.immediate!==!1&&n&&s.size===i.length&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,c){return o.stable.add(l),c?.immediate!==!1&&n&&s.size===i.length&&l(e,e),()=>o.stable.delete(l)},subscribeLocation(l,c){if(o.location.add(l),c?.immediate&&n&&s.size===i.length)for(let p of e.all)l({pet:p,from:p.location,to:p.location});return()=>o.location.delete(l)},subscribeAbility(l,c){if(o.ability.add(l),c?.immediate&&n&&s.size===i.length)for(let p of e.all)p.lastAbilityTrigger&&l({pet:p,trigger:p.lastAbilityTrigger});return()=>o.ability.delete(l)},subscribeCount(l,c){return o.count.add(l),c?.immediate&&n&&s.size===i.length&&l({added:e.all,removed:[],counts:e.counts}),()=>o.count.delete(l)},subscribeExpandedPet(l,c){return o.expandedPet.add(l),c?.immediate&&n&&s.size===i.length&&l({current:e.expandedPet,previous:e.expandedPet,currentId:e.expandedPetSlotId,previousId:e.expandedPetSlotId}),()=>o.expandedPet.delete(l)},subscribeGrowth(l,c){if(o.growth.add(l),c?.immediate&&n&&s.size===i.length)for(let p of e.all)l({pet:p,previousStage:p.growthStage,newStage:p.growthStage});return()=>o.growth.delete(l)},subscribeStrengthGain(l,c){if(o.strengthGain.add(l),c?.immediate&&n&&s.size===i.length)for(let p of e.all)l({pet:p,previousStrength:p.currentStrength,newStrength:p.currentStrength});return()=>o.strengthGain.delete(l)},subscribeMaxStrength(l,c){if(o.maxStrength.add(l),c?.immediate&&n&&s.size===i.length)for(let p of e.all)p.currentStrength===p.maxStrength&&l({pet:p});return()=>o.maxStrength.delete(l)},destroy(){for(let l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.location.clear(),o.ability.clear(),o.count.clear(),o.expandedPet.clear(),o.growth.clear(),o.strengthGain.clear(),o.maxStrength.clear(),n=!1}}}function oi(){return ni||(ni=Fv()),ni}var Dc,Gc,ni,ri=G(()=>{"use strict";Fe();mt();ur();Dc={inventory:"myPetInventoryAtom",hutch:"myPetHutchPetItemsAtom",active:"myPetInfosAtom",slotInfos:"myPetSlotInfosAtom",expandedPetSlotId:"expandedPetSlotIdAtom"};Gc={all:[],byLocation:{inventory:[],hutch:[],active:[]},counts:{inventory:0,hutch:0,active:0,total:0},expandedPetSlotId:null,expandedPet:null};ni=null});function Bv(){let e=null,t=[],n=new Set,r={},o=new Set,a=2;function i(c,p){return{x:p%c,y:Math.floor(p/c)}}function s(c,p,m){return m*c+p}function u(c,p){let{cols:m,rows:f}=c,g=m*f,h=new Set,b=new Set,T=new Map,S=[],v=c.userSlotIdxAndDirtTileIdxToGlobalTileIdx??[],k=c.userSlotIdxAndBoardwalkTileIdxToGlobalTileIdx??[],y=Math.max(v.length,k.length);for(let M=0;M<y;M++){let D=v[M]??[],L=k[M]??[],F=D.map((W,Q)=>(h.add(W),T.set(W,M),{globalIndex:W,localIndex:Q,position:i(m,W)})),Z=L.map((W,Q)=>(b.add(W),T.set(W,M),{globalIndex:W,localIndex:Q,position:i(m,W)}));S.push({userSlotIdx:M,dirtTiles:F,boardwalkTiles:Z,allTiles:[...F,...Z]})}let C=c.spawnTiles.map(M=>i(m,M)),P={};if(c.locations)for(let[M,D]of Object.entries(c.locations)){let L=D.spawnTileIdx??[];P[M]={name:M,spawnTiles:L,spawnPositions:L.map(F=>i(m,F))}}return{cols:m,rows:f,totalTiles:g,tileSize:p,spawnTiles:c.spawnTiles,spawnPositions:C,locations:P,userSlots:S,globalToXY(M){return i(m,M)},xyToGlobal(M,D){return s(m,M,D)},getTileOwner(M){return T.get(M)??null},isDirtTile(M){return h.has(M)},isBoardwalkTile(M){return b.has(M)}}}function d(){if(o.size<a||e)return;let c=r.map,p=r.tileSize??0;if(c){e=u(c,p);for(let m of n)m(e);n.clear()}}async function l(){let c=await ne.subscribe("mapAtom",m=>{r.map=m,o.add("map"),d()});t.push(c);let p=await ne.subscribe("tileSizeAtom",m=>{r.tileSize=m,o.add("tileSize"),d()});t.push(p)}return l(),{get(){return e},isReady(){return e!==null},onReady(c,p){return e?(p?.immediate!==!1&&c(e),()=>{}):(n.add(c),()=>n.delete(c))},destroy(){for(let c of t)c();t.length=0,e=null,n.clear()}}}function Yt(){return ai||(ai=Bv()),ai}var ai,dr=G(()=>{"use strict";Fe();ai=null});function Wc(e){let t=e.inventory,n=t?.items??[],r=t?.favoritedItemIds??[],o=e.selectedItemIndex,a=null;return o!==null&&o>=0&&o<n.length&&(a={index:o,item:n[o]}),{items:n,favoritedItemIds:r,count:n.length,isFull:e.isFull??!1,selectedItem:a}}function Fc(e){let t=e.items.map(n=>"id"in n?n.id:"species"in n&&n.itemType==="Seed"?`seed:${n.species}:${n.quantity}`:"toolId"in n?`tool:${n.toolId}:${n.quantity}`:"eggId"in n?`egg:${n.eggId}:${n.quantity}`:"decorId"in n?`decor:${n.decorId}:${n.quantity}`:JSON.stringify(n));return JSON.stringify({itemKeys:t,favoritedItemIds:e.favoritedItemIds,isFull:e.isFull,selectedItemIndex:e.selectedItem?.index??null})}function jv(e,t){return Fc(e)===Fc(t)}function Uv(e,t){return e===null&&t===null?!1:e===null||t===null?!0:e.index!==t.index}function pr(e){return"id"in e?e.id:"species"in e&&e.itemType==="Seed"?`seed:${e.species}`:"toolId"in e?`tool:${e.toolId}`:"eggId"in e?`egg:${e.eggId}`:"decorId"in e?`decor:${e.decorId}`:JSON.stringify(e)}function zv(e,t){let n=new Set(e.map(pr)),r=new Set(t.map(pr)),o=t.filter(i=>!n.has(pr(i))),a=e.filter(i=>!r.has(pr(i)));return o.length===0&&a.length===0?null:{added:o,removed:a,counts:{before:e.length,after:t.length}}}function Vv(e,t){let n=new Set(e),r=new Set(t),o=t.filter(i=>!n.has(i)),a=e.filter(i=>!r.has(i));return o.length===0&&a.length===0?null:{added:o,removed:a,current:t}}function $v(){let e=_c,t=_c,n=!1,r=[],o={all:new Set,stable:new Set,selection:new Set,items:new Set,favorites:new Set},a={},i=Object.keys(Nc),s=new Set;function u(){if(s.size<i.length)return;let l=Wc(a);if(Te(e,l)||(t=e,e=l,!n))return;for(let m of o.all)m(e,t);if(!jv(t,e))for(let m of o.stable)m(e,t);if(Uv(t.selectedItem,e.selectedItem)){let m={current:e.selectedItem,previous:t.selectedItem};for(let f of o.selection)f(m)}let c=zv(t.items,e.items);if(c)for(let m of o.items)m(c);let p=Vv(t.favoritedItemIds,e.favoritedItemIds);if(p)for(let m of o.favorites)m(p)}async function d(){if(n)return;let l=i.map(async c=>{let p=Nc[c],m=await ne.subscribe(p,f=>{a[c]=f,s.add(c),u()});r.push(m)});await Promise.all(l),n=!0,s.size===i.length&&(e=Wc(a))}return d(),{get(){return e},subscribe(l,c){return o.all.add(l),c?.immediate!==!1&&n&&s.size===i.length&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,c){return o.stable.add(l),c?.immediate!==!1&&n&&s.size===i.length&&l(e,e),()=>o.stable.delete(l)},subscribeSelection(l,c){return o.selection.add(l),c?.immediate&&n&&s.size===i.length&&l({current:e.selectedItem,previous:e.selectedItem}),()=>o.selection.delete(l)},subscribeItems(l,c){return o.items.add(l),c?.immediate&&n&&s.size===i.length&&l({added:e.items,removed:[],counts:{before:0,after:e.count}}),()=>o.items.delete(l)},subscribeFavorites(l,c){return o.favorites.add(l),c?.immediate&&n&&s.size===i.length&&l({added:e.favoritedItemIds,removed:[],current:e.favoritedItemIds}),()=>o.favorites.delete(l)},destroy(){for(let l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.selection.clear(),o.items.clear(),o.favorites.clear(),n=!1}}}function si(){return ii||(ii=$v()),ii}var Nc,_c,ii,li=G(()=>{"use strict";Fe();mt();Nc={inventory:"myInventoryAtom",isFull:"isMyInventoryAtMaxLengthAtom",selectedItemIndex:"myPossiblyNoLongerValidSelectedItemIndexAtom"},_c={items:[],favoritedItemIds:[],count:0,isFull:!1,selectedItem:null};ii=null});function Kv(e,t,n){let r=n.get(e.id),o=r?.slot,a=o?.data,i=o?.lastActionEvent;return{id:e.id,name:e.name,discordId:e.databaseUserId,discordAvatarUrl:e.discordAvatarUrl,guildId:e.guildId,isConnected:e.isConnected,isHost:e.id===t,slotIndex:r?.index??null,position:o?.position??null,cosmetic:{color:e.cosmetic?.color??"",avatar:e.cosmetic?.avatar?[...e.cosmetic.avatar]:[]},emote:{type:e.emoteData?.emoteType??-1},coins:a?.coinsCount??0,inventory:a?.inventory??null,shopPurchases:a?.shopPurchases??null,garden:a?.garden??null,pets:{slots:a?.petSlots??[],slotInfos:o?.petSlotInfos??null},journal:a?.journal??null,stats:a?.stats??null,tasksCompleted:a?.tasksCompleted??[],activityLogs:a?.activityLogs??[],customRestocks:{config:a?.customRestocks??null,inventories:o?.customRestockInventories??null},lastAction:i?{type:i.action,data:i.data,timestamp:i.timestamp}:null,selectedItemIndex:o?.notAuthoritative_selectedItemIndex??null,lastSlotMachineInfo:o?.lastSlotMachineInfo??null}}function Bc(e){let t=e.players,n=e.hostPlayerId??"",r=e.userSlots??[];if(!t||!Array.isArray(t)||t.length===0)return ui;let o=new Map;Array.isArray(r)&&r.forEach((s,u)=>{s?.type==="user"&&s?.playerId&&o.set(s.playerId,{slot:s,index:u})});let a=t.map(s=>Kv(s,n,o)),i=a.find(s=>s.isHost)??null;return{all:a,host:i,count:a.length}}function jc(e){let t=e.all.map(n=>`${n.id}:${n.isConnected}:${n.isHost}`);return JSON.stringify({playerKeys:t,hostId:e.host?.id??null,count:e.count})}function Jv(e,t){let n=[],r=new Set(e.map(a=>a.id)),o=new Set(t.map(a=>a.id));for(let a of t)r.has(a.id)||n.push({player:a,type:"join"});for(let a of e)o.has(a.id)||n.push({player:a,type:"leave"});return n}function qv(e,t){let n=[],r=new Map(e.map(o=>[o.id,o]));for(let o of t){let a=r.get(o.id);a&&a.isConnected!==o.isConnected&&n.push({player:o,isConnected:o.isConnected})}return n}function Yv(){let e=ui,t=ui,n=!1,r=[],o={all:new Set,stable:new Set,joinLeave:new Set,connection:new Set,host:new Set},a={},i=new Set,s=3;function u(){if(i.size<s)return;let l=Bc(a);if(Te(e,l)||(t=e,e=l,!n))return;for(let g of o.all)g(e,t);if(jc(t)!==jc(e))for(let g of o.stable)g(e,t);let c=Jv(t.all,e.all);for(let g of c)for(let h of o.joinLeave)h(g);let p=qv(t.all,e.all);for(let g of p)for(let h of o.connection)h(g);let m=t.host?.id??null,f=e.host?.id??null;if(m!==f){let g={current:e.host,previous:t.host};for(let h of o.host)h(g)}}async function d(){if(n)return;let l=await da.onChangeNow(m=>{a.players=m,i.add("players"),u()});r.push(l);let c=await pa.onChangeNow(m=>{a.hostPlayerId=m,i.add("hostPlayerId"),u()});r.push(c);let p=await ua.onChangeNow(m=>{a.userSlots=m,i.add("userSlots"),u()});r.push(p),n=!0,i.size===s&&(e=Bc(a))}return d(),{get(){return e},subscribe(l,c){return o.all.add(l),c?.immediate!==!1&&n&&i.size===s&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,c){return o.stable.add(l),c?.immediate!==!1&&n&&i.size===s&&l(e,e),()=>o.stable.delete(l)},subscribeJoinLeave(l,c){if(o.joinLeave.add(l),c?.immediate&&n&&i.size===s)for(let p of e.all)l({player:p,type:"join"});return()=>o.joinLeave.delete(l)},subscribeConnection(l,c){if(o.connection.add(l),c?.immediate&&n&&i.size===s)for(let p of e.all)l({player:p,isConnected:p.isConnected});return()=>o.connection.delete(l)},subscribeHost(l,c){return o.host.add(l),c?.immediate&&n&&i.size===s&&l({current:e.host,previous:e.host}),()=>o.host.delete(l)},destroy(){for(let l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.joinLeave.clear(),o.connection.clear(),o.host.clear(),n=!1}}}function di(){return ci||(ci=Yv()),ci}var ui,ci,pi=G(()=>{"use strict";Tt();mt();ui={all:[],host:null,count:0};ci=null});function Xv(e,t){switch(t){case"seed":return e.species??e.itemType;case"tool":return e.toolId??e.itemType;case"egg":return e.eggId??e.itemType;case"decor":return e.decorId??e.itemType;default:return e.itemType}}function Qv(e,t,n){let r=Xv(e,t),o=n[r]??0,a=Math.max(0,e.initialStock-o);return{id:r,itemType:e.itemType,initialStock:e.initialStock,purchased:o,remaining:a,isAvailable:a>0}}function Zv(e,t,n){if(!t)return{type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null};let o=n[e]?.purchases??{},a=(t.inventory??[]).map(d=>Qv(d,e,o)),i=a.filter(d=>d.isAvailable).length,s=t.secondsUntilRestock??0,u=s>0?Date.now()+s*1e3:null;return{type:e,items:a,availableCount:i,totalCount:a.length,secondsUntilRestock:s,restockAt:u}}function Uc(e){let t=e.shops,n=e.purchases??{},r=jn.map(s=>Zv(s,t?.[s],n)),o={seed:r[0],tool:r[1],egg:r[2],decor:r[3]},a=r.filter(s=>s.restockAt!==null),i=null;if(a.length>0){let u=a.sort((d,l)=>(d.restockAt??0)-(l.restockAt??0))[0];i={shop:u.type,seconds:u.secondsUntilRestock,at:u.restockAt}}return{all:r,byType:o,nextRestock:i}}function Vc(e){return JSON.stringify({shops:e.all.map(t=>({type:t.type,itemCount:t.items.length,availableCount:t.availableCount}))})}function ex(e,t){let n=e.secondsUntilRestock,r=t.secondsUntilRestock;return n>0&&n<=5&&r>n||n>0&&r===0&&t.items.some(a=>a.purchased===0)?{shop:t,previousItems:e.items}:null}function tx(e,t){let n=[];for(let r of jn){let o=e.byType[r],a=t.byType[r],i=new Map(o.items.map(s=>[s.id,s]));for(let s of a.items){let u=i.get(s.id);u&&s.purchased>u.purchased&&n.push({shopType:r,itemId:s.id,quantity:s.purchased-u.purchased,newPurchased:s.purchased,remaining:s.remaining})}}return n}function nx(e,t){let n=[];for(let r of jn){let o=e.byType[r],a=t.byType[r],i=new Map(o.items.map(s=>[s.id,s]));for(let s of a.items){let u=i.get(s.id);u&&u.isAvailable!==s.isAvailable&&n.push({shopType:r,itemId:s.id,wasAvailable:u.isAvailable,isAvailable:s.isAvailable})}}return n}function ox(){let e=zc,t=zc,n=!1,r=[],o={all:new Set,stable:new Set,seedRestock:new Set,toolRestock:new Set,eggRestock:new Set,decorRestock:new Set,purchase:new Set,availability:new Set},a={},i=new Set,s=2;function u(){if(i.size<s)return;let l=Uc(a);if(Te(e,l)||(t=e,e=l,!n))return;for(let f of o.all)f(e,t);if(Vc(t)!==Vc(e))for(let f of o.stable)f(e,t);let c={seed:o.seedRestock,tool:o.toolRestock,egg:o.eggRestock,decor:o.decorRestock};for(let f of jn){let g=ex(t.byType[f],e.byType[f]);if(g)for(let h of c[f])h(g)}let p=tx(t,e);for(let f of p)for(let g of o.purchase)g(f);let m=nx(t,e);for(let f of m)for(let g of o.availability)g(f)}async function d(){if(n)return;let l=await ga.onChangeNow(p=>{a.shops=p,i.add("shops"),u()});r.push(l);let c=await fa.onChangeNow(p=>{a.purchases=p,i.add("purchases"),u()});r.push(c),n=!0,i.size===s&&(e=Uc(a))}return d(),{get(){return e},getShop(l){return e.byType[l]},getItem(l,c){return e.byType[l].items.find(m=>m.id===c)??null},subscribe(l,c){return o.all.add(l),c?.immediate!==!1&&n&&i.size===s&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,c){return o.stable.add(l),c?.immediate!==!1&&n&&i.size===s&&l(e,e),()=>o.stable.delete(l)},subscribeSeedRestock(l,c){return o.seedRestock.add(l),c?.immediate&&n&&i.size===s&&l({shop:e.byType.seed,previousItems:[]}),()=>o.seedRestock.delete(l)},subscribeToolRestock(l,c){return o.toolRestock.add(l),c?.immediate&&n&&i.size===s&&l({shop:e.byType.tool,previousItems:[]}),()=>o.toolRestock.delete(l)},subscribeEggRestock(l,c){return o.eggRestock.add(l),c?.immediate&&n&&i.size===s&&l({shop:e.byType.egg,previousItems:[]}),()=>o.eggRestock.delete(l)},subscribeDecorRestock(l,c){return o.decorRestock.add(l),c?.immediate&&n&&i.size===s&&l({shop:e.byType.decor,previousItems:[]}),()=>o.decorRestock.delete(l)},subscribePurchase(l,c){if(o.purchase.add(l),c?.immediate&&n&&i.size===s)for(let p of e.all)for(let m of p.items)m.purchased>0&&l({shopType:p.type,itemId:m.id,quantity:m.purchased,newPurchased:m.purchased,remaining:m.remaining});return()=>o.purchase.delete(l)},subscribeAvailability(l,c){if(o.availability.add(l),c?.immediate&&n&&i.size===s)for(let p of e.all)for(let m of p.items)l({shopType:p.type,itemId:m.id,wasAvailable:m.isAvailable,isAvailable:m.isAvailable});return()=>o.availability.delete(l)},destroy(){for(let l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.seedRestock.clear(),o.toolRestock.clear(),o.eggRestock.clear(),o.decorRestock.clear(),o.purchase.clear(),o.availability.clear(),n=!1}}}function gi(){return mi||(mi=ox()),mi}var jn,zc,mi,fi=G(()=>{"use strict";Tt();mt();jn=["seed","tool","egg","decor"];zc={all:jn.map(e=>({type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null})),byType:{seed:{type:"seed",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},tool:{type:"tool",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},egg:{type:"egg",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},decor:{type:"decor",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null}},nextRestock:null};mi=null});function ax(e){return rx.includes(e)}function ix(e){if(!e)return hi;let t=Date.now(),n=e.endTime??0,r=Math.max(0,n-t),o=Math.floor(r/1e3),a=o>0,i=e.type??"Sunny";return{type:ax(i)?i:"Sunny",isActive:a,startTime:e.startTime??null,endTime:e.endTime??null,remainingSeconds:o}}function sx(){let e=hi,t=hi,n=!1,r=null,o={all:new Set,change:new Set};function a(s){let u=ix(s);if(e.type===u.type&&e.isActive===u.isActive&&e.startTime===u.startTime&&e.endTime===u.endTime){e=u;return}if(t=e,e=u,!!n){for(let d of o.all)d(e,t);if(t.type!==e.type||t.isActive!==e.isActive){let d={current:e,previous:t};for(let l of o.change)l(d)}}}async function i(){n||(r=await ba.onChangeNow(s=>{a(s)}),n=!0)}return i(),{get(){return e},subscribe(s,u){return o.all.add(s),u?.immediate!==!1&&n&&s(e,e),()=>o.all.delete(s)},subscribeChange(s,u){return o.change.add(s),u?.immediate&&n&&s({current:e,previous:e}),()=>o.change.delete(s)},destroy(){r?.(),r=null,o.all.clear(),o.change.clear(),n=!1}}}function yi(){return bi||(bi=sx()),bi}var rx,hi,bi,vi=G(()=>{"use strict";Tt();rx=["Sunny","Rain","Frost","Dawn","AmberMoon"];hi={type:"Sunny",isActive:!1,startTime:null,endTime:null,remainingSeconds:0};bi=null});function lx(){let e=le.get("mutations");return e?Object.keys(e):[]}function qc(){let e={};for(let t of lx())e[t]=[];return e}function Si(){return{garden:null,mySlotIndex:null,plants:{all:[],mature:[],growing:[],bySpecies:{},count:0},crops:{all:[],mature:[],growing:[],mutated:{all:[],byMutation:qc()}},eggs:{all:[],mature:[],growing:[],byType:{},count:0},decors:{tileObjects:[],boardwalk:[],all:[],byType:{},count:0},tiles:{tileObjects:[],boardwalk:[],empty:{tileObjects:[],boardwalk:[]}},counts:{plants:0,maturePlants:0,crops:0,matureCrops:0,eggs:0,matureEggs:0,decors:0,emptyTileObjects:0,emptyBoardwalk:0}}}function cx(e,t,n,r){let o=t.slots.filter(a=>r>=a.endTime).length;return{tileIndex:e,position:n,species:t.species,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:r>=t.maturedAt,slots:t.slots,slotsCount:t.slots.length,matureSlotsCount:o}}function ux(e,t,n,r,o){return{tileIndex:e,position:t,slotIndex:n,species:r.species,startTime:r.startTime,endTime:r.endTime,targetScale:r.targetScale,mutations:[...r.mutations],isMature:o>=r.endTime}}function dx(e,t,n,r){return{tileIndex:e,position:n,eggId:t.eggId,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:r>=t.maturedAt}}function $c(e,t,n,r){return{tileIndex:e,position:n,decorId:t.decorId,rotation:t.rotation,location:r}}function Kc(e,t){let{garden:n,mySlotIndex:r}=e,o=Date.now();if(!n||r===null)return Si();let a=t().get(),i=a?.userSlots[r],s=i?.dirtTiles??[],u=i?.boardwalkTiles??[],d=[],l=[],c=[],p={},m=[],f=[],g=[],h=[],b=qc(),T=[],S=[],v=[],k={},y=[],C=[],P={},M=new Set,D=new Set;for(let[W,Q]of Object.entries(n.tileObjects)){let de=parseInt(W,10);M.add(de);let z=a?a.globalToXY(de):{x:0,y:0};if(Q.objectType==="plant"){let N=Q,H=cx(W,N,z,o);d.push(H),H.isMature?l.push(H):c.push(H),p[H.species]||(p[H.species]=[]),p[H.species].push(H);for(let E=0;E<N.slots.length;E++){let R=N.slots[E],O=ux(W,z,E,R,o);if(m.push(O),O.isMature?f.push(O):g.push(O),O.mutations.length>0){h.push(O);for(let _ of O.mutations)b[_]||(b[_]=[]),b[_].push(O)}}}else if(Q.objectType==="egg"){let H=dx(W,Q,z,o);T.push(H),k[H.eggId]||(k[H.eggId]=[]),k[H.eggId].push(H),H.isMature?S.push(H):v.push(H)}else if(Q.objectType==="decor"){let H=$c(W,Q,z,"tileObjects");y.push(H),P[H.decorId]||(P[H.decorId]=[]),P[H.decorId].push(H)}}for(let[W,Q]of Object.entries(n.boardwalkTileObjects)){let de=parseInt(W,10);D.add(de);let z=a?a.globalToXY(de):{x:0,y:0},H=$c(W,Q,z,"boardwalk");C.push(H),P[H.decorId]||(P[H.decorId]=[]),P[H.decorId].push(H)}let L=[...y,...C],F=s.filter(W=>!M.has(W.localIndex)),Z=u.filter(W=>!D.has(W.localIndex));return{garden:n,mySlotIndex:r,plants:{all:d,mature:l,growing:c,bySpecies:p,count:d.length},crops:{all:m,mature:f,growing:g,mutated:{all:h,byMutation:b}},eggs:{all:T,mature:S,growing:v,byType:k,count:T.length},decors:{tileObjects:y,boardwalk:C,all:L,byType:P,count:L.length},tiles:{tileObjects:s,boardwalk:u,empty:{tileObjects:F,boardwalk:Z}},counts:{plants:d.length,maturePlants:l.length,crops:m.length,matureCrops:f.length,eggs:T.length,matureEggs:S.length,decors:L.length,emptyTileObjects:F.length,emptyBoardwalk:Z.length}}}function Jc(e){return JSON.stringify({plants:e.counts.plants,maturePlants:e.counts.maturePlants,crops:e.counts.crops,matureCrops:e.counts.matureCrops,eggs:e.counts.eggs,matureEggs:e.counts.matureEggs,decors:e.counts.decors,emptyTileObjects:e.counts.emptyTileObjects,emptyBoardwalk:e.counts.emptyBoardwalk})}function px(e,t){let n=new Set(e.map(i=>i.tileIndex)),r=new Set(t.map(i=>i.tileIndex)),o=t.filter(i=>!n.has(i.tileIndex)),a=e.filter(i=>!r.has(i.tileIndex));return{added:o,removed:a}}function mx(e,t,n){let r=new Set(e.map(a=>a.tileIndex)),o=new Set(n.map(a=>a.tileIndex));return t.filter(a=>!r.has(a.tileIndex)&&o.has(a.tileIndex))}function gx(e,t,n){let r=new Set(e.map(a=>`${a.tileIndex}:${a.slotIndex}`)),o=new Set(n.map(a=>`${a.tileIndex}:${a.slotIndex}`));return t.filter(a=>{let i=`${a.tileIndex}:${a.slotIndex}`;return!r.has(i)&&o.has(i)})}function fx(e,t,n){let r=new Set(e.map(a=>a.tileIndex)),o=new Set(n.map(a=>a.tileIndex));return t.filter(a=>!r.has(a.tileIndex)&&o.has(a.tileIndex))}function bx(e,t){let n=[],r=new Map(e.map(o=>[o.tileIndex,o]));for(let o of t){let a=r.get(o.tileIndex);if(!a)continue;let i=Math.min(a.slots.length,o.slots.length);for(let s=0;s<i;s++){let u=new Set(a.slots[s].mutations),d=new Set(o.slots[s].mutations),l=[...d].filter(p=>!u.has(p)),c=[...u].filter(p=>!d.has(p));if(l.length>0||c.length>0){let p=Date.now(),m=o.slots[s],f={tileIndex:o.tileIndex,position:o.position,slotIndex:s,species:m.species,startTime:m.startTime,endTime:m.endTime,targetScale:m.targetScale,mutations:[...m.mutations],isMature:p>=m.endTime};n.push({crop:f,added:l,removed:c})}}}return n}function hx(e,t,n){let r=[],o=new Map(t.map(i=>[i.tileIndex,i])),a=new Map;for(let i of n)a.set(`${i.tileIndex}:${i.slotIndex}`,i);for(let i of e){let s=o.get(i.tileIndex);if(!s)continue;let u=Math.min(i.slots.length,s.slots.length);for(let d=0;d<u;d++){let l=i.slots[d],c=s.slots[d];if(l.startTime!==c.startTime){let p=a.get(`${i.tileIndex}:${d}`);if(!p||!p.isMature)continue;let m={tileIndex:i.tileIndex,position:i.position,slotIndex:d,species:l.species,startTime:l.startTime,endTime:l.endTime,targetScale:l.targetScale,mutations:[...l.mutations],isMature:!0};r.push({crop:m,remainingSlots:s.slotsCount})}}if(s.slotsCount<i.slotsCount)for(let d=s.slotsCount;d<i.slotsCount;d++){let l=a.get(`${i.tileIndex}:${d}`);if(!l||!l.isMature)continue;let c=i.slots[d];if(!c)continue;let p={tileIndex:i.tileIndex,position:i.position,slotIndex:d,species:c.species,startTime:c.startTime,endTime:c.endTime,targetScale:c.targetScale,mutations:[...c.mutations],isMature:!0};r.push({crop:p,remainingSlots:s.slotsCount})}}return r}function yx(e,t){let n=new Set(e.map(i=>i.tileIndex)),r=new Set(t.map(i=>i.tileIndex)),o=t.filter(i=>!n.has(i.tileIndex)),a=e.filter(i=>!r.has(i.tileIndex));return{added:o,removed:a}}function vx(e,t){let n=u=>`${u.tileIndex}:${u.location}`,r=u=>`${u.tileIndex}:${u.location}`,o=new Set(e.map(n)),a=new Set(t.map(r)),i=t.filter(u=>!o.has(r(u))),s=e.filter(u=>!a.has(n(u)));return{added:i,removed:s}}function xx(){let e=Si(),t=Si(),n=!1,r=[],o={all:new Set,stable:new Set,plantAdded:new Set,plantRemoved:new Set,plantMatured:new Set,cropMutated:new Set,cropMatured:new Set,cropHarvested:new Set,eggPlaced:new Set,eggRemoved:new Set,eggMatured:new Set,decorPlaced:new Set,decorRemoved:new Set},a={},i=new Set,s=2;function u(){if(i.size<s)return;let l=Kc(a,Yt);if(Te(e,l)||(t=e,e=l,!n))return;for(let S of o.all)S(e,t);if(Jc(t)!==Jc(e))for(let S of o.stable)S(e,t);let c=px(t.plants.all,e.plants.all);for(let S of c.added)for(let v of o.plantAdded)v({plant:S});for(let S of c.removed)for(let v of o.plantRemoved)v({plant:S,tileIndex:S.tileIndex});let p=mx(t.plants.mature,e.plants.mature,e.plants.all);for(let S of p)for(let v of o.plantMatured)v({plant:S});let m=bx(t.plants.all,e.plants.all);for(let S of m)for(let v of o.cropMutated)v(S);let f=gx(t.crops.mature,e.crops.mature,e.crops.all);for(let S of f)for(let v of o.cropMatured)v({crop:S});let g=hx(t.plants.all,e.plants.all,t.crops.all);for(let S of g)for(let v of o.cropHarvested)v(S);let h=yx(t.eggs.all,e.eggs.all);for(let S of h.added)for(let v of o.eggPlaced)v({egg:S});for(let S of h.removed)for(let v of o.eggRemoved)v({egg:S});let b=fx(t.eggs.mature,e.eggs.mature,e.eggs.all);for(let S of b)for(let v of o.eggMatured)v({egg:S});let T=vx(t.decors.all,e.decors.all);for(let S of T.added)for(let v of o.decorPlaced)v({decor:S});for(let S of T.removed)for(let v of o.decorRemoved)v({decor:S})}async function d(){if(n)return;let l=await ma.onChangeNow(p=>{a.garden=p,i.add("garden"),u()});r.push(l);let c=await ne.subscribe("myUserSlotIdxAtom",p=>{a.mySlotIndex=p,i.add("mySlotIndex"),u()});r.push(c),n=!0,i.size===s&&(e=Kc(a,Yt))}return d(),{get(){return e},subscribe(l,c){return o.all.add(l),c?.immediate!==!1&&n&&i.size===s&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,c){return o.stable.add(l),c?.immediate!==!1&&n&&i.size===s&&l(e,e),()=>o.stable.delete(l)},subscribePlantAdded(l,c){if(o.plantAdded.add(l),c?.immediate&&n&&i.size===s)for(let p of e.plants.all)l({plant:p});return()=>o.plantAdded.delete(l)},subscribePlantRemoved(l,c){return o.plantRemoved.add(l),()=>o.plantRemoved.delete(l)},subscribePlantMatured(l,c){if(o.plantMatured.add(l),c?.immediate&&n&&i.size===s)for(let p of e.plants.mature)l({plant:p});return()=>o.plantMatured.delete(l)},subscribeCropMutated(l,c){if(o.cropMutated.add(l),c?.immediate&&n&&i.size===s)for(let p of e.crops.mutated.all)l({crop:p,added:p.mutations,removed:[]});return()=>o.cropMutated.delete(l)},subscribeCropMatured(l,c){if(o.cropMatured.add(l),c?.immediate&&n&&i.size===s)for(let p of e.crops.mature)l({crop:p});return()=>o.cropMatured.delete(l)},subscribeCropHarvested(l,c){return o.cropHarvested.add(l),()=>o.cropHarvested.delete(l)},subscribeEggPlaced(l,c){if(o.eggPlaced.add(l),c?.immediate&&n&&i.size===s)for(let p of e.eggs.all)l({egg:p});return()=>o.eggPlaced.delete(l)},subscribeEggRemoved(l,c){return o.eggRemoved.add(l),()=>o.eggRemoved.delete(l)},subscribeEggMatured(l,c){if(o.eggMatured.add(l),c?.immediate&&n&&i.size===s)for(let p of e.eggs.mature)l({egg:p});return()=>o.eggMatured.delete(l)},subscribeDecorPlaced(l,c){if(o.decorPlaced.add(l),c?.immediate&&n&&i.size===s)for(let p of e.decors.all)l({decor:p});return()=>o.decorPlaced.delete(l)},subscribeDecorRemoved(l,c){return o.decorRemoved.add(l),()=>o.decorRemoved.delete(l)},destroy(){for(let l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.plantAdded.clear(),o.plantRemoved.clear(),o.plantMatured.clear(),o.cropMutated.clear(),o.cropMatured.clear(),o.cropHarvested.clear(),o.eggPlaced.clear(),o.eggRemoved.clear(),o.eggMatured.clear(),o.decorPlaced.clear(),o.decorRemoved.clear(),n=!1}}}function wi(){return xi||(xi=xx()),xi}var xi,Ti=G(()=>{"use strict";Tt();Fe();dr();mt();dt();xi=null});function mr(){return ke||(ke={currentTile:ei(),myPets:oi(),gameMap:Yt(),myInventory:si(),players:di(),shops:gi(),weather:yi(),myGarden:wi()},ke)}function Ye(){if(!ke)throw new Error("[Globals] Not initialized. Call initGlobals() first.");return ke}function Yc(){ke&&(ke.currentTile.destroy(),ke.myPets.destroy(),ke.gameMap.destroy(),ke.myInventory.destroy(),ke.players.destroy(),ke.shops.destroy(),ke.weather.destroy(),ke.myGarden.destroy(),ke=null)}var ke,gr,fr=G(()=>{"use strict";Mc();mt();ti();ri();dr();li();pi();fi();vi();Ti();ti();ri();dr();li();pi();fi();vi();Ti();ke=null;gr={get currentTile(){return Ye().currentTile},get myPets(){return Ye().myPets},get gameMap(){return Ye().gameMap},get myInventory(){return Ye().myInventory},get players(){return Ye().players},get shops(){return Ye().shops},get weather(){return Ye().weather},get myGarden(){return Ye().myGarden}}});function Xc(){return Dt||(Dt=new Un,Dt.init()),Dt}function Qc(){Dt&&(Dt.destroy(),Dt=null)}var Un,Dt,Zc=G(()=>{"use strict";fr();Un=class{constructor(){oe(this,"logs",[]);oe(this,"maxLogs",1e3);oe(this,"unsubscribe",null);oe(this,"isInitialized",!1)}init(){this.isInitialized||(this.unsubscribe=gr.myPets.subscribeAbility(t=>{this.log({abilityId:t.trigger.abilityId||"unknown",petId:t.pet.id,petSpecies:t.pet.petSpecies,petName:t.pet.name,timestamp:t.trigger.performedAt||Date.now()})}),this.isInitialized=!0)}log(t){let n={...t,id:`${t.timestamp}-${Math.random().toString(36).substr(2,9)}`};this.logs.push(n),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs))}getLogs(t){let n=this.logs;t?.abilityId&&(n=n.filter(o=>o.abilityId===t.abilityId)),t?.petId&&(n=n.filter(o=>o.petId===t.petId)),t?.petSpecies&&(n=n.filter(o=>o.petSpecies===t.petSpecies));let{since:r}=t??{};return r!==void 0&&(n=n.filter(o=>o.timestamp>=r)),t?.limit&&(n=n.slice(-t.limit)),n}getStats(t=36e5){let n=Date.now()-t,r=this.logs.filter(a=>a.timestamp>=n),o=new Map;for(let a of r){o.has(a.abilityId)||o.set(a.abilityId,{abilityId:a.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});let i=o.get(a.abilityId);i.count++,(!i.lastProc||a.timestamp>i.lastProc)&&(i.lastProc=a.timestamp)}for(let a of o.values())a.procsPerMinute=a.count/t*6e4,a.procsPerHour=a.count/t*36e5;return o}getAbilityStats(t,n=36e5){return this.getStats(n).get(t)||null}getPetStats(t,n=36e5){let r=Date.now()-n,o=this.logs.filter(i=>i.petId===t&&i.timestamp>=r),a=new Map;for(let i of o){a.has(i.abilityId)||a.set(i.abilityId,{abilityId:i.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});let s=a.get(i.abilityId);s.count++,(!s.lastProc||i.timestamp>s.lastProc)&&(s.lastProc=i.timestamp)}for(let i of a.values())i.procsPerMinute=i.count/n*6e4,i.procsPerHour=i.count/n*36e5;return{totalProcs:o.length,abilities:a}}getTopAbilities(t=10,n=36e5){return Array.from(this.getStats(n).values()).sort((o,a)=>a.count-o.count).slice(0,t)}clear(){this.logs=[]}setMaxLogs(t){this.maxLogs=t,this.logs.length>t&&(this.logs=this.logs.slice(-t))}getLogCount(){return this.logs.length}isActive(){return this.isInitialized}destroy(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null),this.logs=[],this.isInitialized=!1}},Dt=null});function eu(){return Xt||(Xt=new zn),Xt}function tu(){Xt&&(Xt.endSession(),Xt=null)}var zn,Xt,nu=G(()=>{"use strict";zn=class{constructor(){oe(this,"stats");oe(this,"storageKey","gemini_stats");this.stats=this.loadStats(),this.startSession()}loadStats(){try{let t=localStorage.getItem(this.storageKey);if(t)return JSON.parse(t)}catch(t){console.warn("[StatsTracker] Failed to load stats:",t)}return this.getDefaultStats()}saveStats(){try{localStorage.setItem(this.storageKey,JSON.stringify(this.stats))}catch(t){console.warn("[StatsTracker] Failed to save stats:",t)}}getDefaultStats(){return{session:{sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},allTime:{totalSessions:0,totalPlayTime:0,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0,crops:{},pets:{}}}}startSession(){this.stats.session={sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},this.stats.allTime.totalSessions++,this.saveStats()}endSession(){this.stats.session.sessionEnd=Date.now();let t=this.stats.session.sessionEnd-this.stats.session.sessionStart;this.stats.allTime.totalPlayTime+=t,this.saveStats()}recordHarvest(t,n=1,r=[]){this.stats.session.cropsHarvested+=n,this.stats.allTime.cropsHarvested+=n,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].harvested+=n;for(let o of r)this.stats.allTime.crops[t].mutations[o]||(this.stats.allTime.crops[t].mutations[o]=0),this.stats.allTime.crops[t].mutations[o]++;this.saveStats()}recordCropSale(t,n=1,r=0){this.stats.session.cropsSold+=n,this.stats.session.coinsEarned+=r,this.stats.allTime.cropsSold+=n,this.stats.allTime.coinsEarned+=r,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].sold+=n,this.stats.allTime.crops[t].totalValue+=r,this.saveStats()}recordPetHatch(t,n=[],r=[]){this.stats.session.petsHatched++,this.stats.allTime.petsHatched++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].hatched++;for(let o of n)this.stats.allTime.pets[t].mutations[o]||(this.stats.allTime.pets[t].mutations[o]=0),this.stats.allTime.pets[t].mutations[o]++;for(let o of r)this.stats.allTime.pets[t].abilities[o]||(this.stats.allTime.pets[t].abilities[o]=0),this.stats.allTime.pets[t].abilities[o]++;this.saveStats()}recordPetSale(t,n=0){this.stats.session.petsSold++,this.stats.session.coinsEarned+=n,this.stats.allTime.petsSold++,this.stats.allTime.coinsEarned+=n,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].sold++,this.saveStats()}recordPetFeed(t){this.stats.session.petsFed++,this.stats.allTime.petsFed++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].fed++,this.saveStats()}recordSeedPurchase(t,n=1,r=0){this.stats.session.seedsPurchased+=n,this.stats.session.coinsSpent+=r,this.stats.allTime.seedsPurchased+=n,this.stats.allTime.coinsSpent+=r,this.saveStats()}recordEggPurchase(t,n=1,r=0){this.stats.session.eggsPurchased+=n,this.stats.session.coinsSpent+=r,this.stats.allTime.eggsPurchased+=n,this.stats.allTime.coinsSpent+=r,this.saveStats()}recordAbilityProc(t){this.stats.session.abilityProcs++,this.stats.allTime.abilityProcs++,this.saveStats()}recordCoinsEarned(t){this.stats.session.coinsEarned+=t,this.stats.allTime.coinsEarned+=t,this.saveStats()}recordCoinsSpent(t){this.stats.session.coinsSpent+=t,this.stats.allTime.coinsSpent+=t,this.saveStats()}getStats(){return{...this.stats}}getSessionStats(){return{...this.stats.session}}getAllTimeStats(){return{...this.stats.allTime}}getCropStats(t){return this.stats.allTime.crops[t]||null}getPetStats(t){return this.stats.allTime.pets[t]||null}getTopCrops(t=10){return Object.entries(this.stats.allTime.crops).map(([n,r])=>({species:n,stats:r})).sort((n,r)=>r.stats.harvested-n.stats.harvested).slice(0,t)}getTopPets(t=10){return Object.entries(this.stats.allTime.pets).map(([n,r])=>({species:n,stats:r})).sort((n,r)=>r.stats.hatched-n.stats.hatched).slice(0,t)}resetSession(){this.startSession()}resetAll(){this.stats=this.getDefaultStats(),this.saveStats()}exportStats(){return JSON.stringify(this.stats,null,2)}importStats(t){try{let n=JSON.parse(t);return this.stats=n,this.saveStats(),!0}catch(n){return console.warn("[StatsTracker] Failed to import stats:",n),!1}}},Xt=null});async function au(e){let t=[{name:"Data",init:()=>le.init()},{name:"AntiAfk",init:()=>Sn.init()},{name:"CustomModal",init:()=>Ln.init()},{name:"Sprites",init:()=>ue.init()},{name:"TileObjectSystem",init:()=>qe.init()},{name:"Pixi",init:()=>Rn.init()},{name:"Audio",init:()=>_n.init()},{name:"Cosmetics",init:()=>Wn.init()}];await Promise.all(t.map(async n=>{e?.({status:"start",name:n.name});try{await n.init(),e?.({status:"success",name:n.name})}catch(r){console.error(`[${n.name}] failed`,r),e?.({status:"error",name:n.name,error:r})}})),console.log("[Gemini] Modules ready. Access via Gemini.Modules in console.")}var ou,ru,Vn=G(()=>{"use strict";Nr();Wt();vn();dt();ea();Gt();ka();gn();zt();Xo();Na();_a();Ua();hc();ur();Pc();Zc();nu();dt();ea();ka();zt();Xo();Na();_a();Ua();ou={AbilityLogger:Un,getAbilityLogger:Xc,destroyAbilityLogger:Qc,...Qa},ru={StatsTracker:zn,getStatsTracker:eu,destroyStatsTracker:tu}});function ze(e,t){try{let n=e.startsWith(Qt)?e:Qt+e,r=localStorage.getItem(n);return r===null?t:JSON.parse(r)}catch(n){return console.error(`[Storage] Error reading key "${e}":`,n),t}}function ot(e,t){try{let n=e.startsWith(Qt)?e:Qt+e,r=e.startsWith(Qt)?e.slice(Qt.length):e;localStorage.setItem(n,JSON.stringify(t)),window.dispatchEvent(new CustomEvent("gemini:storage:change",{detail:{key:r,value:t}}))}catch(n){console.error(`[Storage] Error writing key "${e}":`,n)}}var Qt,$n=G(()=>{"use strict";Qt="gemini:"});function ki(e){return!!e&&e.readyState===lu}function Sx(){if(ki(Ee.latestOpen))return Ee.latestOpen;for(let e=Ee.captured.length-1;e>=0;e--){let t=Ee.captured[e];if(ki(t))return t}return null}function wx(e,t){Ee.captured.push(e),Ee.captured.length>25&&Ee.captured.splice(0,Ee.captured.length-25);let n=()=>{Ee.latestOpen=e,t&&console.log("[WS] captured socket opened",e.url)};e.addEventListener("open",n),e.addEventListener("close",()=>{Ee.latestOpen===e&&(Ee.latestOpen=null),t&&console.log("[WS] captured socket closed",e.url)}),e.readyState===lu&&n()}function cu(e=A,t={}){let n=!!t.debug,r=e?.WebSocket;if(typeof r!="function")return()=>{};if(r[iu])return Ee.nativeCtor=r[su]??Ee.nativeCtor??null,()=>{};let o=r;Ee.nativeCtor=o;function a(i,s){let u=s!==void 0?new o(i,s):new o(i);try{wx(u,n)}catch{}return u}try{a.prototype=o.prototype}catch{}try{Object.setPrototypeOf(a,o)}catch{}try{a.CONNECTING=o.CONNECTING,a.OPEN=o.OPEN,a.CLOSING=o.CLOSING,a.CLOSED=o.CLOSED}catch{}a[iu]=!0,a[su]=o;try{e.WebSocket=a,n&&console.log("[WS] WebSocket capture installed")}catch{return()=>{}}return()=>{try{e.WebSocket===a&&(e.WebSocket=o)}catch{}}}function Tx(e=A){let t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function Kn(e=A){let t=Sx();if(t)return{ws:t,source:"captured"};let n=Tx(e);return n?{ws:n,source:"roomConnection"}:{ws:null,source:null}}function br(e,t={}){let n=t.pageWindow??A,r=t.intervalMs??500,o=!!t.debug,a=null,i=null,s=()=>{let d=Kn(n);(d.ws!==a||d.source!==i)&&(a=d.ws,i=d.source,o&&console.log("[WS] best socket changed:",d.source,d.ws),e(d))};s();let u=setInterval(s,r);return()=>clearInterval(u)}function kx(e){if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return null}}function Cx(e,t=A){let n=t?.MagicCircle_RoomConnection;if(n&&typeof n.sendMessage=="function")try{return Array.isArray(e)?n.sendMessage(...e):n.sendMessage(e),{ok:!0}}catch(a){return{ok:!1,reason:"error",error:a}}let{ws:r}=Kn(t);if(!r)return{ok:!1,reason:"no-ws"};if(!ki(r))return{ok:!1,reason:"not-open"};let o=kx(e);if(o==null)return{ok:!1,reason:"error",error:new Error("Cannot stringify message")};try{return r.send(o),{ok:!0}}catch(a){return{ok:!1,reason:"error",error:a}}}function uu(e,t={},n=A){return Cx({type:e,...t},n)}var Ee,iu,su,lu,hr=G(()=>{"use strict";ye();Ee={nativeCtor:null,captured:[],latestOpen:null},iu=Symbol.for("ariesmod.ws.capture.wrapped"),su=Symbol.for("ariesmod.ws.capture.native"),lu=1});var Xe,I,L0,D0,rt=G(()=>{"use strict";Xe={Welcome:"Welcome",PartialState:"PartialState",ServerErrorMessage:"ServerErrorMessage",Config:"Config",InappropriateContentRejected:"InappropriateContentRejected",Emote:"Emote",CurrencyTransaction:"CurrencyTransaction",Pong:"Pong"},I={Chat:"Chat",Emote:"Emote",Wish:"Wish",KickPlayer:"KickPlayer",SetPlayerData:"SetPlayerData",UsurpHost:"UsurpHost",Dev:"Dev",SetSelectedGame:"SetSelectedGame",VoteForGame:"VoteForGame",RequestGame:"RequestGame",RestartGame:"RestartGame",Ping:"Ping",PlayerPosition:"PlayerPosition",Teleport:"Teleport",CheckWeatherStatus:"CheckWeatherStatus",MoveInventoryItem:"MoveInventoryItem",DropObject:"DropObject",PickupObject:"PickupObject",ToggleFavoriteItem:"ToggleFavoriteItem",PutItemInStorage:"PutItemInStorage",RetrieveItemFromStorage:"RetrieveItemFromStorage",MoveStorageItem:"MoveStorageItem",LogItems:"LogItems",PlantSeed:"PlantSeed",WaterPlant:"WaterPlant",HarvestCrop:"HarvestCrop",SellAllCrops:"SellAllCrops",PurchaseSeed:"PurchaseSeed",PurchaseEgg:"PurchaseEgg",PurchaseTool:"PurchaseTool",PurchaseDecor:"PurchaseDecor",PlantEgg:"PlantEgg",HatchEgg:"HatchEgg",PlantGardenPlant:"PlantGardenPlant",PotPlant:"PotPlant",MutationPotion:"MutationPotion",PickupDecor:"PickupDecor",PlaceDecor:"PlaceDecor",RemoveGardenObject:"RemoveGardenObject",PlacePet:"PlacePet",FeedPet:"FeedPet",PetPositions:"PetPositions",SwapPet:"SwapPet",StorePet:"StorePet",NamePet:"NamePet",SellPet:"SellPet",ReportSpeakingStart:"ReportSpeakingStart"},L0=new Set(Object.values(Xe)),D0=new Set(Object.values(I))});function J(e,t={},n=A){return uu(e,t,n)}function du(e,t=A){return J(I.Chat,{scopePath:["Room"],message:e},t)}function pu(e,t=A){return J(I.Emote,{scopePath:["Room"],emoteType:e},t)}function mu(e,t=A){return J(I.Wish,{wish:e},t)}function gu(e,t=A){return J(I.KickPlayer,{scopePath:["Room"],playerId:e},t)}function fu(e,t=A){return J(I.SetPlayerData,{scopePath:["Room"],data:e},t)}function bu(e=A){return J(I.UsurpHost,{},e)}function hu(e=A){return J(I.ReportSpeakingStart,{},e)}function yu(e,t=A){return J(I.SetSelectedGame,{scopePath:["Room"],gameId:e},t)}function vu(e,t=A){return J(I.VoteForGame,{scopePath:["Room"],gameId:e},t)}function xu(e,t=A){return J(I.RequestGame,{scopePath:["Room"],gameId:e},t)}function Su(e=A){return J(I.RestartGame,{scopePath:["Room"]},e)}function wu(e,t=A){return J(I.Ping,{id:e},t)}function Ci(e,t,n=A){return J(I.PlayerPosition,{x:e,y:t},n)}function ku(e,t,n=A){return J(I.Teleport,{x:e,y:t},n)}function Cu(e=A){return J(I.CheckWeatherStatus,{},e)}function Pu(e,t,n=A){return J(I.MoveInventoryItem,{fromIndex:e,toIndex:t},n)}function Mu(e,t=A){return J(I.DropObject,{slotIndex:e},t)}function Au(e,t=A){return J(I.PickupObject,{objectId:e},t)}function Iu(e,t,n=A){return J(I.ToggleFavoriteItem,{itemId:e,favorite:t},n)}function Eu(e,t=A){return J(I.PutItemInStorage,{itemId:e},t)}function Lu(e,t=A){return J(I.RetrieveItemFromStorage,{itemId:e},t)}function Du(e,t,n=A){return J(I.MoveStorageItem,{fromIndex:e,toIndex:t},n)}function Ru(e=A){return J(I.LogItems,{},e)}function Ou(e,t,n,r=A){return J(I.PlantSeed,{seedId:e,x:t,y:n},r)}function Gu(e,t=A){return J(I.WaterPlant,{plantId:e},t)}function Hu(e,t=A){return J(I.HarvestCrop,{cropId:e},t)}function Nu(e=A){return J(I.SellAllCrops,{},e)}function _u(e,t=A){return J(I.PurchaseDecor,{decorId:e},t)}function Wu(e,t=A){return J(I.PurchaseEgg,{eggId:e},t)}function Fu(e,t=A){return J(I.PurchaseTool,{toolId:e},t)}function Bu(e,t=A){return J(I.PurchaseSeed,{seedId:e},t)}function ju(e,t,n,r=A){return J(I.PlantEgg,{eggId:e,x:t,y:n},r)}function Uu(e,t=A){return J(I.HatchEgg,{eggId:e},t)}function zu(e,t,n,r=A){return J(I.PlantGardenPlant,{plantId:e,x:t,y:n},r)}function Vu(e,t,n=A){return J(I.PotPlant,{plantId:e,potId:t},n)}function $u(e,t,n=A){return J(I.MutationPotion,{potionId:e,targetId:t},n)}function Ku(e,t=A){return J(I.PickupDecor,{decorInstanceId:e},t)}function Ju(e,t,n,r=A){return J(I.PlaceDecor,{decorId:e,x:t,y:n},r)}function qu(e,t=A){return J(I.RemoveGardenObject,{objectId:e},t)}function Yu(e,t,n,r=A){return J(I.PlacePet,{petId:e,x:t,y:n},r)}function Xu(e,t,n=A){return J(I.FeedPet,{petId:e,foodItemId:t},n)}function Qu(e,t=A){return J(I.PetPositions,{positions:e},t)}function Zu(e,t,n=A){return J(I.SwapPet,{petIdA:e,petIdB:t},n)}function ed(e,t=A){return J(I.StorePet,{petId:e},t)}function td(e,t,n=A){return J(I.NamePet,{petId:e,name:t},n)}function nd(e,t=A){return J(I.SellPet,{petId:e},t)}var Tu,od=G(()=>{"use strict";hr();rt();ye();Tu=Ci});function rd(){A.Gemini=Zt}var Zt,yr=G(()=>{"use strict";ye();Fe();fr();od();Vn();Zt={Store:{select:ne.select.bind(ne),set:ne.set.bind(ne),subscribe:ne.subscribe.bind(ne),subscribeImmediate:ne.subscribeImmediate.bind(ne)},Globals:gr,Modules:{Version:hn,Assets:Be,Manifest:Oe,Data:le,AntiAfk:Sn,Environment:De,CustomModal:Ln,Sprite:ue,Tile:qe,Pixi:Rn,Audio:_n,Cosmetic:Wn,Achievements:rr,Calculators:cr,Pets:ou,Tracker:ru},WebSocket:{chat:du,emote:pu,wish:mu,kickPlayer:gu,setPlayerData:fu,usurpHost:bu,reportSpeakingStart:hu,setSelectedGame:yu,voteForGame:vu,requestGame:xu,restartGame:Su,ping:wu,checkWeatherStatus:Cu,move:Tu,playerPosition:Ci,teleport:ku,moveInventoryItem:Pu,dropObject:Mu,pickupObject:Au,toggleFavoriteItem:Iu,putItemInStorage:Eu,retrieveItemFromStorage:Lu,moveStorageItem:Du,logItems:Ru,plantSeed:Ou,waterPlant:Gu,harvestCrop:Hu,sellAllCrops:Nu,purchaseDecor:_u,purchaseEgg:Wu,purchaseTool:Fu,purchaseSeed:Bu,plantEgg:ju,hatchEgg:Uu,plantGardenPlant:zu,potPlant:Vu,mutationPotion:$u,pickupDecor:Ku,placeDecor:Ju,removeGardenObject:qu,placePet:Yu,feedPet:Xu,petPositions:Qu,swapPet:Zu,storePet:ed,namePet:td,sellPet:nd},_internal:{getGlobals:Ye,initGlobals:mr,destroyGlobals:Yc}}});var sd={};Ot(sd,{getGameMutations:()=>Rx,setEnabled:()=>Dx,start:()=>ad,stop:()=>id,updateSimpleConfig:()=>Lx});function ad(){let e=ze("gemini:features:autoFavorite",Mi);if(!e.enabled){console.log("[AutoFavorite] Disabled");return}Jn.clear(),vr=Zt.Globals.myInventory.subscribeItems(t=>{if(t.added.length>0)for(let n of t.added)Mx(n,e)}),console.log(`\u2705 [AutoFavorite] Started - Watching ${e.simple.favoriteSpecies.length} species, ${e.simple.favoriteMutations.length} mutations`)}function id(){vr&&(vr(),vr=null),Jn.clear(),console.log("\u{1F6D1} [AutoFavorite] Stopped")}function Mx(e,t){if(e.itemType!=="Produce"&&e.itemType!=="Pet")return;let n=e.id;if(!n){console.warn("[AutoFavorite] Item has no ID:",e);return}if(Jn.has(n))return;if(e.isFavorited||e.favorited||!1){console.log(`[AutoFavorite] Already favorited: ${e.species||n}`);return}if(Ax(e,t.simple)){Jn.add(n);try{let a=Zt.WebSocket.toggleFavoriteItem(n,!0);console.log(`[AutoFavorite] \u2B50 Favorited ${e.itemType}: ${e.species||n}`,{itemId:n,webSocketResult:a})}catch(a){console.error("[AutoFavorite] WebSocket error:",a),Jn.delete(n)}}}function Ax(e,t){if(!t.enabled)return!1;let n=e.species||e.itemType||"",r=Ix(n);return!!(t.favoriteSpecies.includes(r)||t.favoriteMutations.length>0&&Ex(n).some(a=>t.favoriteMutations.includes(a)))}function Ix(e){let t=e;for(let n of Pi)t=t.replace(n,"").trim();return t}function Ex(e){let t=[];for(let n of Pi)e.includes(n)&&t.push(n);return t}function Lx(e){let t=ze("gemini:features:autoFavorite",Mi);t.mode="simple",t.simple={...t.simple,...e},ot("gemini:features:autoFavorite",t)}function Dx(e){let t=ze("gemini:features:autoFavorite",Mi);t.enabled=e,t.simple.enabled=e,ot("gemini:features:autoFavorite",t),e?ad():id()}function Rx(){return Pi}var Pi,Mi,vr,Jn,ld=G(()=>{"use strict";yr();$n();Pi=["Gold","Rainbow","Wet","Chilled","Frozen","Dawnlit","Ambershine","Dawncharged","Ambercharged"],Mi={enabled:!1,mode:"simple",simple:{enabled:!1,favoriteSpecies:[],favoriteMutations:[]}},vr=null,Jn=new Set});var gd={};Ot(gd,{aggregateJournalProgress:()=>Ai,refresh:()=>Hx,setEnabled:()=>Gx,start:()=>pd,stop:()=>md});async function Ai(){await le.waitForAnyData();let e=le.get("plants")||{},t=le.get("pets")||{},n=le.get("decor")||{},o=Zt.Globals.players.get()?.host?.journal||{pets:{},produce:{}},a=Object.keys(o.pets||{}),i=Object.keys(o.produce||{}),s=Object.keys(e),u=Object.keys(t),d=Object.keys(n);return{plants:{total:s.length,logged:i.length,percentage:s.length>0?i.length/s.length*100:0,missing:s.filter(l=>!i.includes(l))},pets:{total:u.length,logged:a.length,percentage:u.length>0?a.length/u.length*100:0,missing:u.filter(l=>!a.includes(l))},decor:{total:d.length,logged:0,percentage:0,missing:d}}}function pd(){let e=ze("gemini:features:journalChecker",dd);e.enabled&&(e.autoRefresh&&!qn&&(qn=setInterval(async()=>{let t=await Ai();window.dispatchEvent(new CustomEvent("gemini:journal-updated",{detail:t}))},e.refreshIntervalMs)),console.log("\u2705 [JournalChecker] Started"))}function md(){qn&&(clearInterval(qn),qn=null)}function Gx(e){let t=ze("gemini:features:journalChecker",dd);t.enabled=e,ot("gemini:features:journalChecker",t),e?pd():md()}async function Hx(){let e=await Ai();return window.dispatchEvent(new CustomEvent("gemini:journal-updated",{detail:e})),e}var dd,qn,fd=G(()=>{"use strict";yr();Vn();$n();dd={enabled:!1,autoRefresh:!0,refreshIntervalMs:3e4},qn=null});function x(e,t=null,...n){let r=document.createElement(e);for(let[o,a]of Object.entries(t||{}))a!=null&&(o==="style"?typeof a=="string"?r.setAttribute("style",a):typeof a=="object"&&Object.assign(r.style,a):o.startsWith("on")&&typeof a=="function"?r[o.toLowerCase()]=a:o in r?r[o]=a:r.setAttribute(o,String(a)));for(let o of n)o==null||o===!1||r.appendChild(typeof o=="string"||typeof o=="number"?document.createTextNode(String(o)):o);return r}var to="https://i.imgur.com/k5WuC32.png",ns="gemini-loader-style",gt="gemini-loader",os=80;function Qd(){if(document.getElementById(ns))return;let e=document.createElement("style");e.id=ns,e.textContent=`
    /* ===== Loader Variables ===== */
    #${gt} {
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
    #${gt} {
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

    #${gt}.gemini-loader--error .gemini-loader__actions {
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
    #${gt}.gemini-loader--closing {
      animation: gemini-loader-fade-out 0.4s ease forwards;
      pointer-events: none;
    }

    #${gt}.gemini-loader--error .gemini-loader__spinner {
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
      #${gt} { padding: 16px 10px; }
      .gemini-loader__card { padding: 16px; }
      .gemini-loader__header { gap: 12px; }
      .gemini-loader__spinner { width: 42px; height: 42px; }
      .gemini-loader__spinner-icon { width: 56px; height: 56px; }
      .gemini-loader__title { font-size: 16px; }
    }
  `,document.head.appendChild(e)}function no(e,t,n){let r=x("div",{className:`gemini-loader__log ${n}`},x("div",{className:"gemini-loader__dot"}),x("div",{textContent:t}));for(e.appendChild(r);e.childElementCount>os;)e.firstElementChild?.remove();e.scrollTop=e.scrollHeight}function Zd(){return new Promise(e=>{if(typeof GM_xmlhttpRequest>"u"){e(to);return}GM_xmlhttpRequest({method:"GET",url:to,responseType:"blob",onload:t=>{let n=t.response,r=new FileReader;r.onloadend=()=>e(r.result),r.onerror=()=>e(to),r.readAsDataURL(n)},onerror:()=>e(to)})})}function Mr(e={}){let t=Number.isFinite(e.blurPx)?Math.max(4,Number(e.blurPx)):14;Qd();let n=x("div",{className:"gemini-loader__subtitle",textContent:e.subtitle??"Initializing the mod..."}),r=x("div",{className:"gemini-loader__logs"}),o=x("img",{className:"gemini-loader__spinner-icon",alt:"Gemini"}),a=x("div",{className:"gemini-loader__spinner"},o);Zd().then(h=>{o.src=h});let i=x("div",{className:"gemini-loader__card"},x("div",{className:"gemini-loader__header"},a,x("div",{className:"gemini-loader__titles"},x("div",{className:"gemini-loader__title",textContent:e.title??"Gemini is loading"}),n)),r),s=x("div",{id:gt},i);(document.body||document.documentElement).appendChild(s);let u=x("div",{className:"gemini-loader__actions"},x("button",{className:"gemini-loader__button",textContent:"Close loader",onclick:()=>s.remove()}));i.appendChild(u),s.style.setProperty("--loader-blur",`${t}px`);let d=h=>{n.textContent=h},l=new Map,c=(h,b)=>{h.className=`gemini-loader__log ${b}`};return{log:(h,b="info")=>no(r,h,b),logStep:(h,b,T="info")=>{let S=String(h||"").trim();if(!S){no(r,b,T);return}let v=l.get(S);if(v){v.el.lastElementChild&&(v.el.lastElementChild.textContent=b),v.tone!==T&&(c(v.el,T),v.tone=T);return}let k=x("div",{className:`gemini-loader__log ${T}`},x("div",{className:"gemini-loader__dot"}),x("div",{textContent:b}));for(l.set(S,{el:k,tone:T}),r.appendChild(k);r.childElementCount>os;){let y=r.firstElementChild;if(!y)break;let C=Array.from(l.entries()).find(([,P])=>P.el===y)?.[0];C&&l.delete(C),y.remove()}r.scrollTop=r.scrollHeight},setSubtitle:d,succeed:(h,b=600)=>{h&&no(r,h,"success"),s.classList.add("gemini-loader--closing"),setTimeout(()=>s.remove(),b)},fail:(h,b)=>{no(r,h,"error"),d("Something went wrong. Check the console for details."),s.classList.add("gemini-loader--error"),console.error("[Gemini loader]",h,b)}}}function rs(e,t,n){let r=x("div",{className:"lg-pill",id:"pill"}),o=e.map(l=>{let c=x("button",{className:"lg-tab"},l.label);return c.setAttribute("data-target",l.id),c}),a=x("div",{className:"lg-tabs",id:"lg-tabs-row"},r,...o),i=a;a.addEventListener("wheel",l=>{Math.abs(l.deltaY)>Math.abs(l.deltaX)&&(l.preventDefault(),a.scrollLeft+=l.deltaY)},{passive:!1});function s(l){let c=a.getBoundingClientRect(),p=o.find(k=>k.dataset.target===l)||o[0];if(!p)return;let m=p.getBoundingClientRect(),f=m.left-c.left,g=m.width;r.style.width=`${g}px`,r.style.transform=`translateX(${f}px)`;let h=a.scrollLeft,b=h,T=h+a.clientWidth,S=f-12,v=f+g+12;S<b?a.scrollTo({left:S,behavior:"smooth"}):v>T&&a.scrollTo({left:v-a.clientWidth,behavior:"smooth"})}let u=t||(e[0]?.id??"");function d(l){u=l,o.forEach(c=>c.classList.toggle("active",c.dataset.target===l)),s(l),n(l)}return o.forEach(l=>l.addEventListener("click",()=>d(l.dataset.target))),queueMicrotask(()=>s(u)),{root:i,activate:d,recalc:()=>s(u),getActive:()=>u}}var Le=class{constructor(t){oe(this,"id");oe(this,"label");oe(this,"container",null);oe(this,"cleanupFunctions",[]);oe(this,"preloadedContent",null);oe(this,"preloadPromise",null);this.id=t.id,this.label=t.label}async preload(){if(this.preloadedContent||this.preloadPromise)return;let t=x("div");this.preloadPromise=(async()=>{let n=this.build(t);n instanceof Promise&&await n,this.preloadedContent=t,this.preloadPromise=null})(),await this.preloadPromise}isPreloaded(){return this.preloadedContent!==null}render(t){for(this.unmount();t.firstChild;)t.removeChild(t.firstChild);if(this.container=t,this.preloadedContent){for(;this.preloadedContent.firstChild;)t.appendChild(this.preloadedContent.firstChild);this.preloadedContent=null}else{let r=this.build(t);r instanceof Promise&&r.catch(o=>{console.error(`[Gemini] Error building section ${this.id}:`,o)})}let n=t.firstElementChild;n&&n.classList.contains("gemini-section")&&n.classList.add("active")}unmount(){this.executeCleanup(),this.container=null}createContainer(t,n){let r=n?`gemini-section ${n}`:"gemini-section";return x("section",{id:t,className:r})}addCleanup(t){this.cleanupFunctions.push(t)}createGrid(t="12px"){let n=x("div");return n.style.display="grid",n.style.gap=t,n}executeCleanup(){for(let t of this.cleanupFunctions)try{t()}catch(n){console.error(`[Gemini] Cleanup error in section ${this.id}:`,n)}this.cleanupFunctions=[]}};var an=class{constructor(t,n,r){oe(this,"sections");oe(this,"activeId",null);oe(this,"container");oe(this,"theme");this.sections=new Map(t.map(o=>[o.id,o])),this.container=n,this.theme=r}get ids(){return Array.from(this.sections.keys())}get all(){return Array.from(this.sections.values())}get active(){return this.activeId}activate(t){if(this.activeId!==t){if(!this.sections.has(t))throw new Error(`[Gemini] Unknown section: ${t}`);if(this.activeId&&this.sections.get(this.activeId).unmount(),this.activeId=t,this.sections.get(t).render(this.container),this.theme){let n=this.theme.getCurrentTheme();this.theme.applyTheme(n)}}}};function sn(e,t){try{let n=JSON.stringify(t);GM_setValue(e,n)}catch(n){console.error(`[Gemini] Failed to save key "${e}" to storage:`,n)}}function it(e,t){try{let n=GM_getValue(e);return n==null?t:typeof n=="string"?JSON.parse(n):n}catch(n){return console.error(`[Gemini] Failed to load key "${e}" from storage, using default:`,n),t}}var as="gemini.sections";function is(){let e=it(as,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function ep(e){sn(as,e)}async function ss(e){return is()[e]}function ls(e,t){let n=is();ep({...n,[e]:t})}function oo(e,t){return{...e,...t??{}}}async function cs(e){let t=await ss(e.path),n;e.migrate?n=e.migrate(t):n=t??{},n=Object.assign((d=>JSON.parse(JSON.stringify(d)))(e.defaults),n),e.sanitize&&(n=e.sanitize(n));function o(){ls(e.path,n)}function a(){return n}function i(d){n=e.sanitize?e.sanitize(d):d,o()}function s(d){let c=Object.assign((p=>JSON.parse(JSON.stringify(p)))(n),{});typeof d=="function"?d(c):Object.assign(c,d),n=e.sanitize?e.sanitize(c):c,o()}function u(){o()}return{get:a,set:i,update:s,save:u}}async function ln(e,t){let{path:n=e,...r}=t;return cs({path:n,...r})}var tp=0,ro=new Map;function he(e={},...t){let{id:n,className:r,variant:o="default",padding:a="md",interactive:i=!1,expandable:s=!1,defaultExpanded:u=!0,onExpandChange:d,mediaTop:l,title:c,subtitle:p,badge:m,actions:f,footer:g,divider:h=!1,tone:b="neutral",stateKey:T}=e,S=x("div",{className:"card",id:n,tabIndex:i?0:void 0});S.classList.add(`card--${o}`,`card--p-${a}`),i&&S.classList.add("card--interactive"),b!=="neutral"&&S.classList.add(`card--tone-${b}`),r&&S.classList.add(...r.split(" ").filter(Boolean)),s&&S.classList.add("card--expandable");let v=s?T??n??(typeof c=="string"?`title:${c}`:null):null,k=!s||u;v&&ro.has(v)&&(k=!!ro.get(v));let y=null,C=null,P=null,M=null,D=null,L=n?`${n}-collapse`:`card-collapse-${++tp}`,F=()=>{if(M!==null&&(cancelAnimationFrame(M),M=null),D){let N=D;D=null,N()}},Z=(N,H)=>{if(!P)return;F();let E=P;if(E.setAttribute("aria-hidden",String(!N)),!H){E.classList.remove("card-collapse--animating"),E.style.display=N?"":"none",E.style.height="",E.style.opacity="";return}if(E.classList.add("card-collapse--animating"),E.style.display="",N){E.style.height="auto";let V=E.scrollHeight;if(!V){E.classList.remove("card-collapse--animating"),E.style.display="",E.style.height="",E.style.opacity="";return}E.style.height="0px",E.style.opacity="0",E.offsetHeight,M=requestAnimationFrame(()=>{M=null,E.style.height=`${V}px`,E.style.opacity="1"})}else{let V=E.scrollHeight;if(!V){E.classList.remove("card-collapse--animating"),E.style.display="none",E.style.height="",E.style.opacity="";return}E.style.height=`${V}px`,E.style.opacity="1",E.offsetHeight,M=requestAnimationFrame(()=>{M=null,E.style.height="0px",E.style.opacity="0"})}let R=()=>{E.classList.remove("card-collapse--animating"),E.style.height="",N||(E.style.display="none"),E.style.opacity=""},O=null,_=V=>{V.target===E&&(O!==null&&(clearTimeout(O),O=null),E.removeEventListener("transitionend",_),E.removeEventListener("transitioncancel",_),D=null,R())};D=()=>{O!==null&&(clearTimeout(O),O=null),E.removeEventListener("transitionend",_),E.removeEventListener("transitioncancel",_),D=null,R()},E.addEventListener("transitionend",_),E.addEventListener("transitioncancel",_),O=window.setTimeout(()=>{D?.()},420)};function W(N){let H=document.createElementNS("http://www.w3.org/2000/svg","svg");return H.setAttribute("viewBox","0 0 24 24"),H.setAttribute("width","16"),H.setAttribute("height","16"),H.innerHTML=N==="up"?'<path d="M7 14l5-5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>':'<path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',H}function Q(N,H=!0,E=!0){k=N,S.classList.toggle("card--collapsed",!k),S.classList.toggle("card--expanded",k),y&&(y.dataset.expanded=String(k),y.setAttribute("aria-expanded",String(k))),C&&(C.setAttribute("aria-expanded",String(k)),C.classList.toggle("card-toggle--collapsed",!k),C.setAttribute("aria-label",k?"Replier le contenu":"Deplier le contenu"),C.replaceChildren(W(k?"up":"down"))),s?Z(k,E):P&&(P.style.display="",P.style.height="",P.style.opacity="",P.setAttribute("aria-hidden","false")),H&&d&&d(k),v&&ro.set(v,k)}if(l){let N=x("div",{className:"card-media"});N.append(l),S.appendChild(N)}let de=!!(c||p||m||f&&f.length||s);if(de){y=x("div",{className:"card-header"});let N=x("div",{className:"card-headline",style:"min-width:0;display:flex;flex-direction:column;gap:2px;"});if(c){let R=x("h3",{className:"card-title",style:"margin:0;font-size:15px;font-weight:700;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:8px;color:var(--group-title, var(--fg));"},c);m&&R.append(typeof m=="string"?x("span",{className:"badge"},m):m),N.appendChild(R)}if(p){let R=x("div",{className:"card-subtitle",style:"opacity:.85;font-size:12px;color:color-mix(in oklab, var(--fg) 80%, #9ca3af)"},p);N.appendChild(R)}(N.childNodes.length||s)&&y.appendChild(N);let H=x("div",{className:"card-header-right",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"}),E=x("div",{className:"card-actions",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"});f?.forEach(R=>E.appendChild(R)),E.childNodes.length&&H.appendChild(E),s&&(C=x("button",{className:"card-toggle",type:"button",ariaExpanded:String(k),ariaControls:L,ariaLabel:k?"Replier le contenu":"Deplier le contenu"}),C.textContent=k?"\u25B2":"\u25BC",C.addEventListener("click",R=>{R.preventDefault(),R.stopPropagation(),Q(!k)}),H.appendChild(C),y.classList.add("card-header--expandable"),y.addEventListener("click",R=>{let O=R.target;O?.closest(".card-actions")||O?.closest(".card-toggle")||Q(!k)})),H.childNodes.length&&y.appendChild(H),S.appendChild(y)}P=x("div",{className:"card-collapse",id:L,ariaHidden:s?String(!k):"false"}),S.appendChild(P),h&&de&&P.appendChild(x("div",{className:"card-divider"}));let z=x("div",{className:"card-body"});if(z.append(...t),P.appendChild(z),g){h&&P.appendChild(x("div",{className:"card-divider"}));let N=x("div",{className:"card-footer"});N.append(g),P.appendChild(N)}return C&&C.setAttribute("aria-controls",L),Q(k,!1,!1),v&&ro.set(v,k),S}var ao=!1,io=new Set,He=e=>{let t=document.activeElement;for(let n of io)if(t&&(t===n||n.contains(t))){e.stopImmediatePropagation(),e.stopPropagation();return}};function np(){ao||(ao=!0,window.addEventListener("keydown",He,!0),window.addEventListener("keypress",He,!0),window.addEventListener("keyup",He,!0),document.addEventListener("keydown",He,!0),document.addEventListener("keypress",He,!0),document.addEventListener("keyup",He,!0))}function op(){ao&&(io.size>0||(ao=!1,window.removeEventListener("keydown",He,!0),window.removeEventListener("keypress",He,!0),window.removeEventListener("keyup",He,!0),document.removeEventListener("keydown",He,!0),document.removeEventListener("keypress",He,!0),document.removeEventListener("keyup",He,!0)))}function us(e){let{id:t,value:n=null,options:r,placeholder:o="Select...",size:a="md",disabled:i=!1,blockGameKeys:s=!0,onChange:u,onOpenChange:d}=e,l=x("div",{className:"select",id:t}),c=x("button",{className:"select-trigger",type:"button"}),p=x("span",{className:"select-value"},o),m=x("span",{className:"select-caret"},"\u25BE");c.append(p,m);let f=x("div",{className:"select-menu",role:"listbox",tabindex:"-1","aria-hidden":"true"});l.classList.add(`select--${a}`);let g=!1,h=n,b=null,T=!!i;function S(R){return R==null?o:(e.options||r).find(_=>_.value===R)?.label??o}function v(R){p.textContent=S(R),f.querySelectorAll(".select-option").forEach(O=>{let _=O.dataset.value,V=R!=null&&_===R;O.classList.toggle("selected",V),O.setAttribute("aria-selected",String(V))})}function k(R){f.replaceChildren(),R.forEach(O=>{let _=x("button",{className:"select-option"+(O.disabled?" disabled":""),type:"button",role:"option","data-value":O.value,"aria-selected":String(O.value===h),tabindex:"-1"},O.label);O.value===h&&_.classList.add("selected"),O.disabled||_.addEventListener("pointerdown",V=>{V.preventDefault(),V.stopPropagation(),L(O.value,{notify:!0}),M()},{capture:!0}),f.appendChild(_)})}function y(){c.setAttribute("aria-expanded",String(g)),f.setAttribute("aria-hidden",String(!g))}function C(){let R=c.getBoundingClientRect();Object.assign(f.style,{minWidth:`${R.width}px`})}function P(){g||T||(g=!0,l.classList.add("open"),y(),C(),document.addEventListener("mousedown",de,!0),document.addEventListener("scroll",z,!0),window.addEventListener("resize",N),f.focus({preventScroll:!0}),s&&(np(),io.add(l),b=()=>{io.delete(l),op()}),d?.(!0))}function M(){g&&(g=!1,l.classList.remove("open"),y(),document.removeEventListener("mousedown",de,!0),document.removeEventListener("scroll",z,!0),window.removeEventListener("resize",N),c.focus({preventScroll:!0}),b?.(),b=null,d?.(!1))}function D(){g?M():P()}function L(R,O={}){let _=h;h=R,v(h),O.notify!==!1&&_!==R&&u?.(R)}function F(){return h}function Z(R){let O=Array.from(f.querySelectorAll(".select-option:not(.disabled)"));if(!O.length)return;let _=O.findIndex(be=>be.classList.contains("active")),V=O[(_+(R===1?1:O.length-1))%O.length];O.forEach(be=>be.classList.remove("active")),V.classList.add("active"),V.focus({preventScroll:!0}),V.scrollIntoView({block:"nearest"})}function W(R){(R.key===" "||R.key==="Enter"||R.key==="ArrowDown")&&(R.preventDefault(),P())}function Q(R){if(R.key==="Escape"){R.preventDefault(),M();return}if(R.key==="Enter"||R.key===" "){let O=f.querySelector(".select-option.active")||f.querySelector(".select-option.selected");O&&!O.classList.contains("disabled")&&(R.preventDefault(),L(O.dataset.value,{notify:!0}),M());return}if(R.key==="ArrowDown"){R.preventDefault(),Z(1);return}if(R.key==="ArrowUp"){R.preventDefault(),Z(-1);return}}function de(R){l.contains(R.target)||M()}function z(){g&&C()}function N(){g&&C()}function H(R){T=!!R,c.disabled=T,l.classList.toggle("disabled",T),T&&M()}function E(R){e.options=R,k(R),R.some(O=>O.value===h)||(h=null,v(null))}return l.append(c,f),c.addEventListener("pointerdown",R=>{R.preventDefault(),R.stopPropagation(),D()},{capture:!0}),c.addEventListener("keydown",W),f.addEventListener("keydown",Q),k(r),n!=null?(h=n,v(h)):v(null),y(),H(T),{root:l,open:P,close:M,toggle:D,getValue:F,setValue:L,setOptions:E,setDisabled:H,destroy(){document.removeEventListener("mousedown",de,!0),document.removeEventListener("scroll",z,!0),window.removeEventListener("resize",N),b?.(),b=null}}}function st(e={}){let{id:t,text:n="",htmlFor:r,tone:o="default",size:a="md",layout:i="inline",variant:s="text",required:u=!1,disabled:d=!1,tooltip:l,hint:c,icon:p,suffix:m,onClick:f}=e,g=x("div",{className:"lg-label-wrap",id:t}),h=x("label",{className:"lg-label",...r?{htmlFor:r}:{},...l?{title:l}:{}});if(p){let L=typeof p=="string"?x("span",{className:"lg-label-ico"},p):p;L.classList?.add?.("lg-label-ico"),h.appendChild(L)}let b=x("span",{className:"lg-label-text"},n);h.appendChild(b);let T=x("span",{className:"lg-label-req",ariaHidden:"true"}," *");u&&h.appendChild(T);let S=null;if(m!=null){S=typeof m=="string"?document.createTextNode(m):m;let L=x("span",{className:"lg-label-suffix"});L.appendChild(S),h.appendChild(L)}let v=c?x("div",{className:"lg-label-hint"},c):null;g.classList.add(`lg-label--${i}`),g.classList.add(`lg-label--${a}`),s==="title"&&g.classList.add("lg-label--title"),k(o),d&&g.classList.add("is-disabled"),g.appendChild(h),v&&g.appendChild(v),f&&h.addEventListener("click",f);function k(L){g.classList.remove("lg-label--default","lg-label--muted","lg-label--info","lg-label--success","lg-label--warning","lg-label--danger"),g.classList.add(`lg-label--${L}`)}function y(L){b.textContent=L}function C(L){k(L)}function P(L){L&&!T.isConnected&&h.appendChild(T),!L&&T.isConnected&&T.remove(),L?h.setAttribute("aria-required","true"):h.removeAttribute("aria-required")}function M(L){g.classList.toggle("is-disabled",!!L)}function D(L){!L&&v&&v.isConnected?v.remove():L&&v?v.textContent=L:L&&!v&&g.appendChild(x("div",{className:"lg-label-hint"},L))}return{root:g,labelEl:h,hintEl:v,setText:y,setTone:C,setRequired:P,setDisabled:M,setHint:D}}function cn(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function so(e,t){let n=document.createElement("span");n.className=`btn-ico btn-ico--${t}`;let r=cn(e);return r&&n.appendChild(r),n}function rp(){let e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.marginRight="6px",t.style.display="none",t.style.flexShrink="0";let n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");let r=document.createElementNS(e,"animate");r.setAttribute("attributeName","stroke-dasharray"),r.setAttribute("values","1,150;90,150;90,150"),r.setAttribute("dur","1.5s"),r.setAttribute("repeatCount","indefinite");let o=document.createElementNS(e,"animateTransform");return o.setAttribute("attributeName","transform"),o.setAttribute("attributeType","XML"),o.setAttribute("type","rotate"),o.setAttribute("from","0 12 12"),o.setAttribute("to","360 12 12"),o.setAttribute("dur","1s"),o.setAttribute("repeatCount","indefinite"),n.appendChild(r),n.appendChild(o),t.appendChild(n),t}function lt(e={}){let{label:t="",id:n,variant:r="default",size:o="md",iconLeft:a,iconRight:i,loading:s=!1,tooltip:u,type:d="button",onClick:l,disabled:c=!1,fullWidth:p=!1}=e,m=x("button",{className:"btn",id:n});m.type=d,r==="primary"&&m.classList.add("primary"),o==="sm"&&m.classList.add("btn--sm"),u&&(m.title=u),p&&(m.style.width="100%");let f=rp(),g=a?so(a,"left"):null,h=i?so(i,"right"):null,b=document.createElement("span");b.className="btn-label";let T=cn(t);T&&b.appendChild(T),!T&&(g||h)&&m.classList.add("btn--icon"),m.appendChild(f),g&&m.appendChild(g),m.appendChild(b),h&&m.appendChild(h);let S=c||s;m.disabled=S,m.setAttribute("aria-busy",String(!!s)),f.style.display=s?"inline-block":"none",l&&m.addEventListener("click",l);let v=m;return v.setLoading=k=>{m.setAttribute("aria-busy",String(!!k)),f.style.display=k?"inline-block":"none",m.disabled=k||c},v.setDisabled=k=>{m.disabled=k||m.getAttribute("aria-busy")==="true"},v.setLabel=k=>{b.replaceChildren();let y=cn(k);y&&b.appendChild(y),!y&&(g||h)?m.classList.add("btn--icon"):m.classList.remove("btn--icon")},v.setIconLeft=k=>{if(k==null){g?.remove();return}g?g.replaceChildren(cn(k)):m.insertBefore(so(k,"left"),b)},v.setIconRight=k=>{if(k==null){h?.remove();return}h?h.replaceChildren(cn(k)):m.appendChild(so(k,"right"))},v}Gt();var lo=!1,un=new Set;function up(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}var Ne=e=>{let t=up();if(t){for(let n of un)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function dp(){lo||(lo=!0,window.addEventListener("keydown",Ne,!0),window.addEventListener("keypress",Ne,!0),window.addEventListener("keyup",Ne,!0),document.addEventListener("keydown",Ne,!0),document.addEventListener("keypress",Ne,!0),document.addEventListener("keyup",Ne,!0))}function pp(){lo&&(lo=!1,window.removeEventListener("keydown",Ne,!0),window.removeEventListener("keypress",Ne,!0),window.removeEventListener("keyup",Ne,!0),document.removeEventListener("keydown",Ne,!0),document.removeEventListener("keypress",Ne,!0),document.removeEventListener("keyup",Ne,!0))}function mp(e){return un.size===0&&dp(),un.add(e),()=>{un.delete(e),un.size===0&&pp()}}function gp(e,t,n,r){let o;switch(e){case"digits":o="0-9";break;case"alpha":o="\\p{L}";break;case"alphanumeric":o="\\p{L}0-9";break;default:return null}return t&&(o+=" "),n&&(o+="\\-"),r&&(o+="_"),new RegExp(`[^${o}]`,"gu")}function fp(e,t){return t?e.replace(t,""):e}function bp(e,t=0){if(!t)return e;let n;return((...r)=>{clearTimeout(n),n=setTimeout(()=>e(...r),t)})}function ms(e={}){let{id:t,placeholder:n="",value:r="",mode:o="any",allowSpaces:a=!1,allowDashes:i=!1,allowUnderscore:s=!1,maxLength:u,blockGameKeys:d=!0,debounceMs:l=0,onChange:c,onEnter:p,label:m}=e,f=x("div",{className:"lg-input-wrap"}),g=x("input",{className:"input",id:t,placeholder:n});if(typeof u=="number"&&u>0&&(g.maxLength=u),r&&(g.value=r),m){let L=x("div",{className:"lg-input-label"},m);f.appendChild(L)}f.appendChild(g);let h=gp(o,a,i,s),b=()=>{let L=g.selectionStart??g.value.length,F=g.value.length,Z=fp(g.value,h);if(Z!==g.value){g.value=Z;let W=F-Z.length,Q=Math.max(0,L-W);g.setSelectionRange(Q,Q)}},T=bp(()=>c?.(g.value),l);g.addEventListener("input",()=>{b(),T()}),g.addEventListener("paste",()=>queueMicrotask(()=>{b(),T()})),g.addEventListener("keydown",L=>{L.key==="Enter"&&p?.(g.value)});let S=d?mp(g):()=>{};function v(){return g.value}function k(L){g.value=L??"",b(),T()}function y(){g.focus()}function C(){g.blur()}function P(L){g.disabled=!!L}function M(){return document.activeElement===g}function D(){S()}return{root:f,input:g,getValue:v,setValue:k,focus:y,blur:C,setDisabled:P,isFocused:M,destroy:D}}function ve(e,t,n){return Math.min(n,Math.max(t,e))}function pn({h:e,s:t,v:n,a:r}){let o=(e%360+360)%360/60,a=n*t,i=a*(1-Math.abs(o%2-1)),s=0,u=0,d=0;switch(Math.floor(o)){case 0:s=a,u=i;break;case 1:s=i,u=a;break;case 2:u=a,d=i;break;case 3:u=i,d=a;break;case 4:s=i,d=a;break;default:s=a,d=i;break}let c=n-a,p=Math.round((s+c)*255),m=Math.round((u+c)*255),f=Math.round((d+c)*255);return{r:ve(p,0,255),g:ve(m,0,255),b:ve(f,0,255),a:ve(r,0,1)}}function gs({r:e,g:t,b:n,a:r}){let o=ve(e,0,255)/255,a=ve(t,0,255)/255,i=ve(n,0,255)/255,s=Math.max(o,a,i),u=Math.min(o,a,i),d=s-u,l=0;d!==0&&(s===o?l=60*((a-i)/d%6):s===a?l=60*((i-o)/d+2):l=60*((o-a)/d+4)),l<0&&(l+=360);let c=s===0?0:d/s;return{h:l,s:c,v:s,a:ve(r,0,1)}}function Er({r:e,g:t,b:n}){let r=o=>ve(Math.round(o),0,255).toString(16).padStart(2,"0");return`#${r(e)}${r(t)}${r(n)}`.toUpperCase()}function hp({r:e,g:t,b:n,a:r}){let o=ve(Math.round(r*255),0,255);return`${Er({r:e,g:t,b:n,a:r})}${o.toString(16).padStart(2,"0")}`.toUpperCase()}function dn({r:e,g:t,b:n,a:r}){let o=Math.round(r*1e3)/1e3;return`rgba(${e}, ${t}, ${n}, ${o})`}function Ht(e){let t=e.trim();if(!t||(t.startsWith("#")&&(t=t.slice(1)),![3,4,6,8].includes(t.length))||!/^[0-9a-fA-F]+$/.test(t))return null;(t.length===3||t.length===4)&&(t=t.split("").map(i=>i+i).join(""));let n=255;t.length===8&&(n=parseInt(t.slice(6,8),16),t=t.slice(0,6));let r=parseInt(t.slice(0,2),16),o=parseInt(t.slice(2,4),16),a=parseInt(t.slice(4,6),16);return{r,g:o,b:a,a:n/255}}function Ir(e){if(!e)return null;let t=e.trim();if(t.startsWith("#"))return Ht(t);let n=t.match(/^rgba?\(([^)]+)\)$/i);if(n){let r=n[1].split(",").map(u=>u.trim());if(r.length<3)return null;let o=Number(r[0]),a=Number(r[1]),i=Number(r[2]),s=r[3]!=null?Number(r[3]):1;return[o,a,i,s].some(u=>Number.isNaN(u))?null:{r:o,g:a,b:i,a:s}}return null}function yp(e,t){let n=Ir(e)??Ht(e??"")??{r:244,g:67,b:54,a:1};return typeof t=="number"&&(n.a=ve(t,0,1)),gs(n)}function vp(e){return`#${e.trim().replace(/[^0-9a-fA-F#]/g,"").replace(/#/g,"")}`.slice(0,9).toUpperCase()}function xp(e){let t=e.trim();return t&&(/^rgba?\s*\(/i.test(t)?t=t.replace(/^rgba?/i,"rgba"):(t=t.replace(/^\(?(.*)\)?$/,"$1"),t=`rgba(${t})`),t=t.replace(/\s*\(\s*/,"("),t=t.replace(/\s*\)\s*$/,")"),t=t.replace(/\s*,\s*/g,", "),t)}function ft(e){let t=pn(e),n=pn({...e,a:1});return{hsva:{...e},hex:Er(n),hexa:hp(t),rgba:dn(t),alpha:e.a}}function fs(e={}){let{id:t,label:n="Color",value:r,alpha:o,defaultExpanded:a=!1,detectMobile:i,onInput:s,onChange:u}=e,l=i?i():De.detect().platform==="mobile",c=yp(r,o),p=he({id:t,className:"color-picker",title:n,padding:l?"md":"lg",variant:"soft",expandable:!l,defaultExpanded:!l&&a});p.classList.add(l?"color-picker--mobile":"color-picker--desktop");let m=p.querySelector(".card-header");m&&m.classList.add("color-picker__header");let f=m?.querySelector(".card-title"),g=x("button",{className:"color-picker__preview",type:"button",title:`Preview ${n}`,"aria-label":`Change ${n}`});f?f.prepend(g):m?m.prepend(g):p.prepend(g);let h=p.querySelector(".card-toggle");!l&&h&&g.addEventListener("click",()=>{p.classList.contains("card--collapsed")&&h.click()});let b=p.querySelector(".card-collapse"),T=null,S=null,v=null,k=null,y=null,C=null,P=null,M=null,D=null,L="hex";function F(z){let N=ft(c);z==="input"?s?.(N):u?.(N)}function Z(){let z=ft(c);if(g.style.setProperty("--cp-preview-color",z.rgba),g.setAttribute("aria-label",`${n}: ${z.hexa}`),!l&&T&&S&&v&&k&&y&&C&&P){let N=pn({...c,s:1,v:1,a:1}),H=dn(N);T.style.setProperty("--cp-palette-hue",H),S.style.left=`${c.s*100}%`,S.style.top=`${(1-c.v)*100}%`,v.style.setProperty("--cp-alpha-gradient",`linear-gradient(180deg, ${dn({...N,a:1})} 0%, ${dn({...N,a:0})} 100%)`),k.style.top=`${(1-c.a)*100}%`,y.style.setProperty("--cp-hue-color",dn(pn({...c,v:1,s:1,a:1}))),C.style.left=`${c.h/360*100}%`;let E=c.a===1?z.hex:z.hexa,R=z.rgba,O=L==="hex"?E:R;P!==document.activeElement&&(P.value=O),P.setAttribute("aria-label",`${L.toUpperCase()} code for ${n}`),P.placeholder=L==="hex"?"#RRGGBB or #RRGGBBAA":"rgba(0, 0, 0, 1)",L==="hex"?P.maxLength=9:P.removeAttribute("maxLength"),P.dataset.mode=L,M&&(M.textContent=L.toUpperCase(),M.setAttribute("aria-label",L==="hex"?"Passer en saisie RGBA":"Revenir en saisie HEX"),M.setAttribute("aria-pressed",L==="rgba"?"true":"false"),M.classList.toggle("is-alt",L==="rgba"))}D&&D!==document.activeElement&&(D.value=z.hex)}function W(z,N=null){c={h:(z.h%360+360)%360,s:ve(z.s,0,1),v:ve(z.v,0,1),a:ve(z.a,0,1)},Z(),N&&F(N)}function Q(z,N=null){W(gs(z),N)}function de(z,N,H){z.addEventListener("pointerdown",E=>{E.preventDefault();let R=E.pointerId,O=V=>{V.pointerId===R&&N(V)},_=V=>{V.pointerId===R&&(document.removeEventListener("pointermove",O),document.removeEventListener("pointerup",_),document.removeEventListener("pointercancel",_),H?.(V))};N(E),document.addEventListener("pointermove",O),document.addEventListener("pointerup",_),document.addEventListener("pointercancel",_)})}if(!l&&b){let z=b.querySelector(".card-body");if(z){z.classList.add("color-picker__body"),S=x("div",{className:"color-picker__palette-cursor"}),T=x("div",{className:"color-picker__palette"},S),k=x("div",{className:"color-picker__alpha-thumb"}),v=x("div",{className:"color-picker__alpha"},k),C=x("div",{className:"color-picker__hue-thumb"}),y=x("div",{className:"color-picker__hue"},C);let N=x("div",{className:"color-picker__main"},T,v),H=x("div",{className:"color-picker__hue-row"},y),E=ms({blockGameKeys:!0});P=E.input,P.classList.add("color-picker__hex-input"),P.value="",P.maxLength=9,P.spellcheck=!1,P.inputMode="text",P.setAttribute("aria-label",`Hex code for ${n}`),M=x("button",{type:"button",className:"color-picker__mode-btn",textContent:"HEX","aria-pressed":"false","aria-label":"Passer en saisie RGBA"}),E.root.classList.add("color-picker__hex-wrap");let R=x("div",{className:"color-picker__hex-row"},M,E.root);z.replaceChildren(N,H,R),de(T,_=>{if(!T||!S)return;let V=T.getBoundingClientRect(),be=ve((_.clientX-V.left)/V.width,0,1),Me=ve((_.clientY-V.top)/V.height,0,1);W({...c,s:be,v:1-Me},"input")},()=>F("change")),de(v,_=>{if(!v)return;let V=v.getBoundingClientRect(),be=ve((_.clientY-V.top)/V.height,0,1);W({...c,a:1-be},"input")},()=>F("change")),de(y,_=>{if(!y)return;let V=y.getBoundingClientRect(),be=ve((_.clientX-V.left)/V.width,0,1);W({...c,h:be*360},"input")},()=>F("change")),M.addEventListener("click",()=>{if(L=L==="hex"?"rgba":"hex",P){let _=ft(c);P.value=L==="hex"?c.a===1?_.hex:_.hexa:_.rgba}Z(),P?.focus(),P?.select()}),P.addEventListener("input",()=>{if(L==="hex"){let _=vp(P.value);if(_!==P.value){let V=P.selectionStart??_.length;P.value=_,P.setSelectionRange(V,V)}}});let O=()=>{let _=P.value;if(L==="hex"){let V=Ht(_);if(!V){P.value=c.a===1?ft(c).hex:ft(c).hexa;return}let be=_.startsWith("#")?_.slice(1):_,Me=be.length===4||be.length===8;V.a=Me?V.a:c.a,Q(V,"change")}else{let V=xp(_),be=Ir(V);if(!be){P.value=ft(c).rgba;return}Q(be,"change")}};P.addEventListener("change",O),P.addEventListener("blur",O),P.addEventListener("keydown",_=>{_.key==="Enter"&&(O(),P.blur())})}}return l&&(b&&b.remove(),D=x("input",{className:"color-picker__native",type:"color",value:Er(pn({...c,a:1}))}),g.addEventListener("click",()=>D.click()),D.addEventListener("input",()=>{let z=Ht(D.value);z&&(z.a=c.a,Q(z,"input"),F("change"))}),p.appendChild(D)),Z(),{root:p,isMobile:l,getValue:()=>ft(c),setValue:(z,N)=>{let H=Ir(z)??Ht(z)??Ht("#FFFFFF");H&&(typeof N=="number"&&(H.a=N),Q(H,null))}}}Gt();ye();Gt();function kp(e){try{return!!e.isSecureContext}catch{return!1}}function Lr(e){let t=e?.getRootNode?.();return t&&(t instanceof Document||t.host)?t:document}function bs(){let e=navigator.platform||"",t=navigator.userAgent||"";return/Mac|iPhone|iPad|iPod/i.test(e)||/Mac OS|iOS/i.test(t)}async function Cp(){try{let e=await navigator.permissions?.query?.({name:"clipboard-write"});return e?e.state==="granted"||e.state==="prompt":!0}catch{return!0}}function Pp(e,t){let n=document.createElement("textarea");return n.value=e,n.setAttribute("readonly","true"),n.style.position="fixed",n.style.opacity="0",n.style.pointerEvents="none",n.style.top="0",t.appendChild?t.appendChild(n):document.body.appendChild(n),n}function Mp(e){try{let t=window.getSelection?.();if(!t)return!1;let n=document.createRange();return n.selectNodeContents(e),t.removeAllRanges(),t.addRange(n),!0}catch{return!1}}async function Ap(e){if(!("clipboard"in navigator))return{ok:!1,method:"clipboard-write"};if(!kp(A))return{ok:!1,method:"clipboard-write"};if(!await Cp())return{ok:!1,method:"clipboard-write"};try{return await navigator.clipboard.writeText(e),{ok:!0,method:"clipboard-write"}}catch{return{ok:!1,method:"clipboard-write"}}}function Ip(e,t){try{let n=t||Lr(),r=Pp(e,n);r.focus(),r.select(),r.setSelectionRange(0,r.value.length);let o=!1;try{o=document.execCommand("copy")}catch{o=!1}return r.remove(),{ok:o,method:"execCommand"}}catch{return{ok:!1,method:"execCommand"}}}function Ep(e,t){if(!t)return{ok:!1,method:"selection"};let n=t.textContent??"",r=!1;if(n!==e)try{t.textContent=e,r=!0}catch{}let o=Mp(t);r&&setTimeout(()=>{try{t.textContent=n}catch{}},80);let a=bs()?"\u2318C pour copier":"Ctrl+C pour copier";return{ok:o,method:"selection",hint:a}}async function Lp(e,t={}){let n=(e??"").toString();if(!n.length)return{ok:!1,method:"noop"};let r=await Ap(n);if(r.ok)return r;let o=t.injectionRoot||Lr(t.valueNode||void 0),a=Ip(n,o);if(a.ok)return a;let i=Ep(n,t.valueNode||null);if(i.ok)return i;if(!t.disablePromptFallback)try{return window.prompt(De.isDiscord()?"Copie manuelle (Discord bloque clipboard):":"Copie manuelle:",n),{ok:!0,method:"prompt"}}catch{}return{ok:!1,method:"noop"}}function hs(e,t,n={}){let r=o=>{if(n.showTip){n.showTip(o);return}try{e.setAttribute("aria-label",o);let a=document.createElement("div");a.textContent=o,a.style.position="absolute",a.style.top="-28px",a.style.right="0",a.style.padding="4px 8px",a.style.borderRadius="8px",a.style.fontSize="12px",a.style.background="color-mix(in oklab, var(--bg) 85%, transparent)",a.style.border="1px solid var(--border)",a.style.color="var(--fg)",a.style.pointerEvents="none",a.style.opacity="0",a.style.transition="opacity .12s";let i=Lr(e);i.appendChild?i.appendChild(a):document.body.appendChild(a);let s=e.getBoundingClientRect();a.style.left=`${s.right-8}px`,a.style.top=`${s.top-28}px`,requestAnimationFrame(()=>a.style.opacity="1"),setTimeout(()=>{a.style.opacity="0",setTimeout(()=>a.remove(),150)},1200)}catch{}};e.addEventListener("click",async o=>{o.stopPropagation();let a=(t()??"").toString(),i=await Lp(a,{valueNode:n.valueNode??null,injectionRoot:n.injectionRoot??null,disablePromptFallback:n.disablePromptFallback??!1});n.onResult?.(i),i.ok?i.method==="clipboard-write"||i.method==="execCommand"||i.method==="prompt"?r("Copi\xE9"):i.method==="selection"&&r(i.hint||(bs()?"\u2318C pour copier":"Ctrl+C pour copier")):r("Impossible de copier")})}var ct={light:{"--bg":"rgba(255,255,255,0.7)","--fg":"#0f172a","--muted":"rgba(15,23,42,0.06)","--soft":"rgba(15,23,42,0.04)","--accent":"#2563eb","--border":"rgba(15,23,42,0.12)","--shadow":"rgba(2,6,23,.2)","--tab-bg":"#ffffff","--tab-fg":"#0f172a","--pill-from":"#4f46e5","--pill-to":"#06b6d4"},dark:{"--bg":"rgba(10,12,18,0.6)","--fg":"#e5e7eb","--muted":"rgba(229,231,235,0.08)","--soft":"rgba(229,231,235,0.05)","--accent":"#60a5fa","--border":"rgba(148,163,184,0.2)","--shadow":"rgba(0,0,0,.45)","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#e5e7eb","--pill-from":"#6366f1","--pill-to":"#06b6d4"},sepia:{"--bg":"rgba(247,242,231,0.72)","--fg":"#3b2f2f","--muted":"rgba(59,47,47,0.06)","--soft":"rgba(59,47,47,0.04)","--accent":"#b07d62","--border":"rgba(59,47,47,0.14)","--shadow":"rgba(0,0,0,.18)","--tab-bg":"#fff","--tab-fg":"#3b2f2f","--pill-from":"#b07d62","--pill-to":"#d4a373"},forest:{"--bg":"rgba(14,24,18,0.62)","--fg":"#e7f5e9","--muted":"rgba(231,245,233,0.08)","--soft":"rgba(231,245,233,0.05)","--accent":"#34d399","--border":"rgba(231,245,233,0.16)","--shadow":"rgba(0,0,0,.5)","--tab-bg":"rgba(255,255,255,0.06)","--tab-fg":"#e7f5e9","--pill-from":"#10b981","--pill-to":"#84cc16"},violet:{"--bg":"rgba(23, 16, 42, 0.68)","--fg":"#f5f3ff","--muted":"rgba(245,243,255,0.08)","--soft":"rgba(245,243,255,0.05)","--accent":"#a855f7","--border":"rgba(216,180,254,0.22)","--shadow":"rgba(12,3,30,.55)","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#ede9fe","--pill-from":"#a855f7","--pill-to":"#f472b6"},ocean:{"--bg":"rgba(10, 34, 46, 0.66)","--fg":"#e0f7ff","--muted":"rgba(224,247,255,0.07)","--soft":"rgba(224,247,255,0.05)","--accent":"#38bdf8","--border":"rgba(125, 211, 252, 0.22)","--shadow":"rgba(0, 16, 32, .52)","--tab-bg":"rgba(56,189,248,0.14)","--tab-fg":"#e0f7ff","--pill-from":"#0ea5e9","--pill-to":"#14b8a6"},ember:{"--bg":"rgba(34,18,10,0.64)","--fg":"#fff7ed","--muted":"rgba(255,247,237,0.08)","--soft":"rgba(255,247,237,0.05)","--accent":"#f97316","--border":"rgba(255, 159, 92, 0.24)","--shadow":"rgba(16,6,2,.52)","--tab-bg":"rgba(255,247,237,0.09)","--tab-fg":"#fff7ed","--pill-from":"#fb923c","--pill-to":"#facc15"},magicGarden:{"--bg":"#201D1D","--fg":"#F5F5F5","--muted":"rgba(255,255,255,0.6)","--soft":"rgba(0,0,0,0.3)","--accent":"#FFF27D","--border":"rgba(255,255,255,0.1)","--border-accent":"#4A3B2E","--shadow":"rgba(0,0,0,0.5)","--card-shadow":"0 4px 10px rgba(0, 0, 0, 0.5)","--tab-bg":"#10725A","--tab-fg":"#F5F5F5","--section-title":"#10725A","--group-title":"#5EB292","--item-label":"#F5F5F5","--item-desc":"rgba(255,255,255,0.6)","--item-value":"#FFF27D","--card-bg":"rgba(0,0,0,0.3)","--card-radius":"12px","--card-border":"#4A3B2E","--pill-from":"#FFF27D","--pill-to":"#5EB292","--scrollbar-thumb":"rgba(255,255,255,0.2)","--scrollbar-thumb-hover":"rgba(255,255,255,0.3)"}};ye();function Dr(e){let{host:t,themes:n,initialTheme:r,onThemeChange:o}=e,a=r,i=null,s=!1;function u(l){let c=n[l]||n[a]||{};s&&t.classList.add("theme-anim");for(let[p,m]of Object.entries(c))t.style.setProperty(p,m);s?(i!==null&&clearTimeout(i),i=A.setTimeout(()=>{t.classList.remove("theme-anim"),i=null},320)):s=!0,a=l,o?.(l)}function d(){return a}return u(r),{applyTheme:u,getCurrentTheme:d}}var co={ui:{expandedCards:{style:!1,system:!1}}};async function ys(){let e=await ln("tab-settings",{version:1,defaults:co,sanitize:o=>({ui:{expandedCards:oo(co.ui.expandedCards,o.ui?.expandedCards)}})});function t(o){let a=e.get();e.update({ui:{...a.ui,...o,expandedCards:oo(a.ui.expandedCards,o.expandedCards)}})}function n(o,a){let i=e.get();e.update({ui:{...i.ui,expandedCards:{...i.ui.expandedCards,[o]:!!a}}})}function r(o){let a=e.get();n(o,!a.ui.expandedCards[o])}return{get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:r}}function vs(e){return e.replace(/[_-]+/g," ").replace(/^\w/,t=>t.toUpperCase())}function Dp(){return Object.keys(ct).map(e=>({value:e,label:vs(e)}))}var Rp=["--bg","--fg","--accent","--muted","--soft","--border","--shadow","--tab-bg","--tab-fg","--pill-from","--pill-to"];function Op(e){return vs(e.replace(/^--/,""))}function Gp(e){return e.alpha<1?e.rgba:e.hex}var uo=class extends Le{constructor(n){super({id:"tab-settings",label:"Settings"});this.deps=n}async build(n){let r=this.createGrid("12px");r.id="settings",n.appendChild(r);let o;try{o=await ys()}catch{o={get:()=>co,set:()=>{},save:()=>{},setUI:()=>{},setCardExpanded:()=>{},toggleCard:()=>{}}}let a=o.get(),i=Object.keys(ct),s=this.deps.getCurrentTheme?.()??this.deps.initialTheme,u=i.includes(s)?s:i[0]??"dark",d=u,l=st({text:"Theme",tone:"muted",size:"lg"}),c=us({options:Dp(),value:u,onChange:g=>{d=g,this.deps.applyTheme(g),this.renderThemePickers(g,p,d)}}),p=x("div",{className:"settings-theme-grid"}),m=he({title:"Style",padding:"lg",expandable:!0,defaultExpanded:!!a.ui.expandedCards.style,onExpandChange:g=>o.setCardExpanded("style",g)},x("div",{className:"kv settings-theme-row"},l.root,c.root),p);this.renderThemePickers(u,p,d);let f=this.createEnvCard({defaultExpanded:!!a.ui.expandedCards.system,onExpandChange:g=>o.setCardExpanded("system",g)});r.appendChild(m),r.appendChild(f)}renderThemePickers(n,r,o){let a=ct[n];if(r.replaceChildren(),!!a)for(let i of Rp){let s=a[i];if(s==null)continue;let u=fs({label:Op(i),value:s,defaultExpanded:!1,onInput:d=>this.updateThemeVar(n,i,d,o),onChange:d=>this.updateThemeVar(n,i,d,o)});r.appendChild(u.root)}}updateThemeVar(n,r,o,a){let i=ct[n];i&&(i[r]=Gp(o),a===n&&this.deps.applyTheme(n))}createEnvCard(n){let r=n?.defaultExpanded??!1,o=n?.onExpandChange,a=(b,T)=>{let S=x("div",{className:"kv kv--inline-mobile"}),v=x("label",{},b),k=x("div",{className:"ro"});return typeof T=="string"?k.textContent=T:k.append(T),S.append(v,k),S},i=x("code",{},"\u2014"),s=x("span",{},"\u2014"),u=x("span",{},"\u2014"),d=x("span",{},"\u2014"),l=x("span",{},"\u2014"),c=x("span",{},"\u2014"),p=()=>{let b=De.detect();u.textContent=b.surface,d.textContent=b.platform,l.textContent=b.browser??"Unknown",c.textContent=b.os??"Unknown",i.textContent=b.host,s.textContent=b.isInIframe?"Yes":"No"},m=lt({label:"Copy JSON",variant:"primary",size:"sm"});hs(m,()=>{let b=De.detect();return JSON.stringify(b,null,2)});let f=x("div",{style:"width:100%;display:flex;justify-content:center;"},m),g=he({title:"System",variant:"soft",padding:"lg",footer:f,expandable:!0,defaultExpanded:r,onExpandChange:o},a("Surface",u),a("Platform",d),a("Browser",l),a("OS",c),a("Host",i),a("Iframe",s)),h=()=>{document.hidden||p()};return document.addEventListener("visibilitychange",h),p(),this.addCleanup(()=>document.removeEventListener("visibilitychange",h)),g}};function po(e){let{id:t,columns:n,data:r,pageSize:o=0,stickyHeader:a=!0,zebra:i=!0,animations:s=!0,respectReducedMotion:u=!0,compact:d=!1,maxHeight:l,selectable:c=!1,selectOnRowClick:p=!1,initialSelection:m=[],hideHeaderCheckbox:f=!1,getRowId:g=(B,q)=>String(q),onSortChange:h,onSelectionChange:b,onRowClick:T}=e,S=n.slice(),v=r.slice(),k=r.slice(),y=null,C=null,P=1,M=typeof window<"u"&&typeof window.matchMedia=="function"?window.matchMedia("(prefers-reduced-motion: reduce)").matches:!1,D=!!s&&!(u&&M),L=x("div",{className:"lg-table-wrap",id:t});if(l!=null){let B=typeof l=="number"?`${l}px`:l;L.style.setProperty("--tbl-max-h",B)}let F=x("div",{className:"lg-table"}),Z=x("div",{className:"lg-thead"}),W=x("div",{className:"lg-tbody"}),Q=x("div",{className:"lg-tfoot"});a&&L.classList.add("sticky"),i&&L.classList.add("zebra"),d&&L.classList.add("compact"),c&&L.classList.add("selectable");let de="36px";L.style.setProperty("--check-w",de);function z(B){return B==="center"?"center":B==="right"?"flex-end":"flex-start"}function N(){let B=S.map(ae=>{let ie=(ae.width||"1fr").trim();return/\bfr$/.test(ie)?`minmax(0, ${ie})`:ie}),q=(c?[de,...B]:B).join(" ");L.style.setProperty("--lg-cols",q)}N();function H(){return o?Math.max(1,Math.ceil(v.length/o)):1}function E(){if(!o)return v;let B=(P-1)*o;return v.slice(B,B+o)}function R(){if(!y||!C)return;let B=S.find(ie=>String(ie.key)===y),q=C==="asc"?1:-1,ae=B?.sortFn?(ie,me)=>q*B.sortFn(ie,me):(ie,me)=>{let X=ie[y],te=me[y];return X==null&&te==null?0:X==null?-1*q:te==null?1*q:typeof X=="number"&&typeof te=="number"?q*(X-te):q*String(X).localeCompare(String(te),void 0,{numeric:!0,sensitivity:"base"})};v.sort(ae)}let O=new Set(m);function _(){return Array.from(O)}function V(B){O.clear(),B.forEach(q=>O.add(q)),ee(),on(),b?.(_())}function be(){O.clear(),ee(),on(),b?.(_())}let Me=null;function ee(){if(!Me)return;let B=E();if(!B.length){Me.indeterminate=!1,Me.checked=!1;return}let q=B.map((ie,me)=>g(ie,(P-1)*(o||0)+me)),ae=q.reduce((ie,me)=>ie+(O.has(me)?1:0),0);Me.checked=ae===q.length,Me.indeterminate=ae>0&&ae<q.length}function xe(){let B=W.offsetWidth-W.clientWidth;Z.style.paddingRight=B>0?`${B}px`:"0px"}function Ve(){requestAnimationFrame(xe)}let Qn=new ResizeObserver(()=>xe()),Xi=()=>xe();function Vd(){Z.replaceChildren();let B=x("div",{className:"lg-tr lg-tr-head"});if(c){let q=x("div",{className:"lg-th lg-th-check"});f||(Me=x("input",{type:"checkbox"}),Me.addEventListener("change",()=>{let ae=E(),ie=Me.checked;ae.forEach((me,X)=>{let te=g(me,(P-1)*(o||0)+X);ie?O.add(te):O.delete(te)}),b?.(_()),on()}),q.appendChild(Me)),B.appendChild(q)}S.forEach(q=>{let ae=x("button",{className:"lg-th",type:"button",title:q.title||q.header});ae.textContent=q.header,q.align&&ae.style.setProperty("--col-justify",z(q.align)),q.sortable&&ae.classList.add("sortable"),y===String(q.key)&&C?ae.setAttribute("data-sort",C):ae.removeAttribute("data-sort"),q.sortable&&ae.addEventListener("click",()=>{let ie=String(q.key);y!==ie?(y=ie,C="asc"):(C=C==="asc"?"desc":C==="desc"?null:"asc",C||(y=null,v=k.slice())),h?.(y,C),y&&C&&R(),eo()}),B.appendChild(ae)}),Z.appendChild(B);try{Qn.disconnect()}catch{}Qn.observe(W),Ve()}function Cr(B){return Array.from(B.querySelectorAll(":scope > .lg-td, :scope > .lg-td-check"))}function Qi(B){return B.querySelector(".lg-td, .lg-td-check")}function Zi(B){let q=Qi(B);return q?q.getBoundingClientRect():null}function on(){let B=E(),q=new Map;Array.from(W.children).forEach(X=>{let te=X,Ce=te.getAttribute("data-id");if(!Ce)return;let Ge=Zi(te);Ge&&q.set(Ce,Ge)});let ae=new Map;Array.from(W.children).forEach(X=>{let te=X,Ce=te.getAttribute("data-id");Ce&&ae.set(Ce,te)});let ie=[];for(let X=0;X<B.length;X++){let te=B[X],Ce=(o?(P-1)*o:0)+X,Ge=g(te,Ce);ie.push(Ge);let ge=ae.get(Ge);ge||(ge=$d(te,Ce),D&&Cr(ge).forEach(rn=>{rn.style.transform="translateY(6px)",rn.style.opacity="0"})),W.appendChild(ge)}let me=[];if(ae.forEach((X,te)=>{ie.includes(te)||me.push(X)}),!D){me.forEach(X=>X.remove()),ee(),Ve();return}ie.forEach(X=>{let te=W.querySelector(`.lg-tr-body[data-id="${X}"]`);if(!te)return;let Ce=Zi(te),Ge=q.get(X),ge=Cr(te);if(Ge&&Ce){let $e=Ge.left-Ce.left,Rt=Ge.top-Ce.top;ge.forEach(at=>{at.style.transition="none",at.style.transform=`translate(${$e}px, ${Rt}px)`,at.style.opacity="1"}),Qi(te)?.getBoundingClientRect(),ge.forEach(at=>{at.style.willChange="transform, opacity",at.style.transition="transform .18s ease, opacity .18s ease"}),requestAnimationFrame(()=>{ge.forEach(at=>{at.style.transform="translate(0,0)"})})}else ge.forEach($e=>{$e.style.transition="transform .18s ease, opacity .18s ease"}),requestAnimationFrame(()=>{ge.forEach($e=>{$e.style.transform="translate(0,0)",$e.style.opacity="1"})});let Pr=$e=>{($e.propertyName==="transform"||$e.propertyName==="opacity")&&(ge.forEach(Rt=>{Rt.style.willChange="",Rt.style.transition="",Rt.style.transform="",Rt.style.opacity=""}),$e.currentTarget.removeEventListener("transitionend",Pr))},rn=ge[0];rn&&rn.addEventListener("transitionend",Pr)}),me.forEach(X=>{let te=Cr(X);te.forEach(ge=>{ge.style.willChange="transform, opacity",ge.style.transition="transform .18s ease, opacity .18s ease",ge.style.opacity="0",ge.style.transform="translateY(-6px)"});let Ce=ge=>{ge.propertyName==="opacity"&&(ge.currentTarget.removeEventListener("transitionend",Ce),X.remove())},Ge=te[0];Ge?Ge.addEventListener("transitionend",Ce):X.remove()}),ee(),Ve()}function $d(B,q){let ae=g(B,q),ie=x("div",{className:"lg-tr lg-tr-body","data-id":ae});if(c){let me=x("div",{className:"lg-td lg-td-check"}),X=x("input",{type:"checkbox",className:"lg-row-check"});X.checked=O.has(ae),X.addEventListener("change",te=>{te.stopPropagation(),X.checked?O.add(ae):O.delete(ae),ee(),b?.(_())}),X.addEventListener("click",te=>te.stopPropagation()),me.appendChild(X),ie.appendChild(me)}return S.forEach(me=>{let X=x("div",{className:"lg-td"});me.align&&X.style.setProperty("--col-justify",z(me.align));let te=me.render?me.render(B,q):String(B[me.key]??"");typeof te=="string"?X.textContent=te:X.appendChild(te),ie.appendChild(X)}),(T||c&&p)&&(ie.classList.add("clickable"),ie.addEventListener("click",me=>{if(!me.target.closest(".lg-td-check")){if(c&&p){let X=!O.has(ae);X?O.add(ae):O.delete(ae),ee();let te=ie.querySelector(".lg-row-check");te&&(te.checked=X),b?.(_())}T?.(B,q,me)}})),ie}function es(){if(Q.replaceChildren(),!o)return;let B=H(),q=x("div",{className:"lg-pager"}),ae=x("button",{className:"btn",type:"button"},"\u2190"),ie=x("button",{className:"btn",type:"button"},"\u2192"),me=x("span",{className:"lg-pager-info"},`${P} / ${B}`);ae.disabled=P<=1,ie.disabled=P>=B,ae.addEventListener("click",()=>Zn(P-1)),ie.addEventListener("click",()=>Zn(P+1)),q.append(ae,me,ie),Q.appendChild(q)}function Zn(B){let q=H();P=Math.min(Math.max(1,B),q),on(),es()}function eo(){N(),Vd(),on(),es()}function Kd(B){k=B.slice(),v=B.slice(),y&&C&&R(),Zn(1)}function Jd(B){S=B.slice(),eo()}function qd(B,q="asc"){y=B,C=B?q:null,y&&C?R():v=k.slice(),eo()}function Yd(){try{Qn.disconnect()}catch{}window.removeEventListener("resize",Xi)}return F.append(Z,W,Q),L.appendChild(F),window.addEventListener("resize",Xi),eo(),{root:L,setData:Kd,setColumns:Jd,sortBy:qd,getSelection:_,setSelection:V,clearSelection:be,setPage:Zn,getState:()=>({page:P,pageCount:H(),sortKey:y,sortDir:C}),destroy:Yd}}var go=!1,mn=new Set;function Hp(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}var _e=e=>{let t=Hp();if(t){for(let n of mn)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function Np(){go||(go=!0,window.addEventListener("keydown",_e,!0),window.addEventListener("keypress",_e,!0),window.addEventListener("keyup",_e,!0),document.addEventListener("keydown",_e,!0),document.addEventListener("keypress",_e,!0),document.addEventListener("keyup",_e,!0))}function _p(){go&&(go=!1,window.removeEventListener("keydown",_e,!0),window.removeEventListener("keypress",_e,!0),window.removeEventListener("keyup",_e,!0),document.removeEventListener("keydown",_e,!0),document.removeEventListener("keypress",_e,!0),document.removeEventListener("keyup",_e,!0))}function Wp(e){return mn.size===0&&Np(),mn.add(e),()=>{mn.delete(e),mn.size===0&&_p()}}function mo(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function Fp(){let e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.display="none",t.style.flexShrink="0";let n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");let r=document.createElementNS(e,"animate");r.setAttribute("attributeName","stroke-dasharray"),r.setAttribute("values","1,150;90,150;90,150"),r.setAttribute("dur","1.5s"),r.setAttribute("repeatCount","indefinite");let o=document.createElementNS(e,"animateTransform");return o.setAttribute("attributeName","transform"),o.setAttribute("attributeType","XML"),o.setAttribute("type","rotate"),o.setAttribute("from","0 12 12"),o.setAttribute("to","360 12 12"),o.setAttribute("dur","1s"),o.setAttribute("repeatCount","indefinite"),n.append(r,o),t.appendChild(n),t}function fo(e={}){let{id:t,placeholder:n="Rechercher\u2026",value:r="",size:o="md",disabled:a=!1,autoFocus:i=!1,onChange:s,onSearch:u,autoSearch:d=!1,debounceMs:l=0,focusKey:c="/",iconLeft:p,iconRight:m,withClear:f=!0,clearTitle:g="Effacer",ariaLabel:h,submitLabel:b,loading:T=!1,blockGameKeys:S=!0}=e,v=x("div",{className:"search"+(o?` search--${o}`:""),id:t}),k=x("span",{className:"search-ico search-ico--left"});if(p){let ee=mo(p);ee&&k.appendChild(ee)}else k.textContent="\u{1F50E}",k.style.opacity=".9";let y=x("input",{className:"input search-input",type:"text",placeholder:n,value:r,"aria-label":h||n}),C=x("span",{className:"search-ico search-ico--right"});if(m){let ee=mo(m);ee&&C.appendChild(ee)}let P=Fp();P.classList.add("search-spinner");let M=f?x("button",{className:"search-clear",type:"button",title:g},"\xD7"):null,D=b!=null?x("button",{className:"btn search-submit",type:"button"},b):null,L=x("div",{className:"search-field"},k,y,C,P,...M?[M]:[]);v.append(L,...D?[D]:[]);let F=!!a,Z=null;function W(ee){P.style.display=ee?"inline-block":"none",v.classList.toggle("is-loading",ee)}function Q(){Z!=null&&(window.clearTimeout(Z),Z=null)}function de(ee){Q(),l>0?Z=window.setTimeout(()=>{Z=null,ee()},l):ee()}function z(){s?.(y.value),d&&u&&u(y.value)}y.addEventListener("input",()=>{de(z)}),y.addEventListener("keydown",ee=>{ee.key==="Enter"?(ee.preventDefault(),Q(),u?.(y.value)):ee.key==="Escape"&&(y.value.length>0?E("",{notify:!0}):y.blur())}),M&&M.addEventListener("click",()=>E("",{notify:!0})),D&&D.addEventListener("click",()=>u?.(y.value));let N=()=>{};if(S&&(N=Wp(y)),c){let ee=xe=>{if(xe.key===c&&!xe.ctrlKey&&!xe.metaKey&&!xe.altKey){let Ve=document.activeElement;Ve&&(Ve.tagName==="INPUT"||Ve.tagName==="TEXTAREA"||Ve.isContentEditable)||(xe.preventDefault(),y.focus())}};window.addEventListener("keydown",ee,!0),v.__cleanup=()=>{window.removeEventListener("keydown",ee,!0),N()}}else v.__cleanup=()=>{N()};function H(ee){F=!!ee,y.disabled=F,M&&(M.disabled=F),D&&(D.disabled=F),v.classList.toggle("disabled",F)}function E(ee,xe={}){let Ve=y.value;y.value=ee??"",xe.notify&&Ve!==ee&&de(z)}function R(){return y.value}function O(){y.focus()}function _(){y.blur()}function V(ee){y.placeholder=ee}function be(ee){E("",ee)}return H(F),W(T),i&&O(),{root:v,input:y,getValue:R,setValue:E,focus:O,blur:_,setDisabled:H,setPlaceholder:V,clear:be,setLoading:W,setIconLeft(ee){k.replaceChildren();let xe=mo(ee??"\u{1F50E}");xe&&k.appendChild(xe)},setIconRight(ee){C.replaceChildren();let xe=mo(ee??"");xe&&C.appendChild(xe)}}}function Bp(e){let t=String(e??"").trim().toLowerCase();return t?t==="common"?"Common":t==="uncommon"?"Uncommon":t==="rare"?"Rare":t==="legendary"?"Legendary":t==="mythical"?"Mythical":t==="divine"?"Divine":t==="celestial"?"Celestial":t==="unknown"||t==="unknow"?"Unknown":null:null}function jp(e){return e.toLowerCase()}function bo(e={}){let{id:t,label:n="",type:r="neutral",tone:o="soft",border:a,withBorder:i,pill:s=!0,size:u="md",onClick:d,variant:l="default",rarity:c=null}=e,p=x("span",{className:"badge",id:t});s&&p.classList.add("badge--pill"),u==="sm"?p.classList.add("badge--sm"):u==="lg"?p.classList.add("badge--lg"):p.classList.add("badge--md"),d&&p.addEventListener("click",d);let m=!1,f=i;function g(){m||(f===!1?p.style.border="none":p.style.border="")}function h(y,C=o){p.classList.remove("badge--neutral","badge--info","badge--success","badge--warning","badge--danger","badge--soft","badge--outline","badge--solid"),p.classList.add(`badge--${y}`,`badge--${C}`),g()}function b(y){let C=(y??"").trim();C?(p.style.border=C,m=!0):(m=!1,g())}function T(y){f=y,g()}function S(y){p.textContent=y}function v(y,C=o){h(y,C)}function k(y){p.classList.remove("badge--rarity","badge--rarity-common","badge--rarity-uncommon","badge--rarity-rare","badge--rarity-legendary","badge--rarity-mythical","badge--rarity-divine","badge--rarity-celestial","badge--rarity-unknown"),p.style.background="",p.style.backgroundSize="",p.style.animation="",p.style.color="",p.style.webkitTextStroke="";let C=Bp(y);if(!C){p.textContent=String(y??"\u2014");return}p.textContent=C,p.classList.add("badge--rarity",`badge--rarity-${jp(C)}`)}return l==="rarity"?k(c):(p.textContent=n,h(r,o),typeof i=="boolean"&&T(i),a&&b(a)),{root:p,setLabel:S,setType:v,setBorder:b,setWithBorder:T,setRarity:k}}zt();dt();var Sg={expanded:!1,sort:{key:null,dir:null},search:""},wg={categories:{}};async function kl(){let e=await ln("tab-test",{version:2,defaults:wg,sanitize:a=>({categories:a.categories&&typeof a.categories=="object"?a.categories:{}})});function t(a){return e.get().categories[a]||{...Sg}}function n(a,i){let s=e.get(),u=t(a);e.update({categories:{...s.categories,[a]:{...u,expanded:i}}})}function r(a,i,s){let u=e.get(),d=t(a);e.update({categories:{...u.categories,[a]:{...d,sort:{key:i,dir:s}}}})}function o(a,i){let s=e.get(),u=t(a);e.update({categories:{...s.categories,[a]:{...u,search:i}}})}return{get:e.get,set:e.set,save:e.save,getCategoryState:t,setCategoryExpanded:n,setCategorySort:r,setCategorySearch:o}}var Tg={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function Lo(e){return e?Tg[e]??0:0}var Do=class extends Le{constructor(){super({id:"tab-test",label:"Test"});oe(this,"stateCtrl",null)}async build(n){this.stateCtrl=await kl();let r=this.createContainer("test-section");r.style.display="flex",r.style.flexDirection="column",r.style.gap="12px",n.appendChild(r),await this.buildSpriteTables(r)}renderSprite(n){let r=x("div",{style:"display:flex;align-items:center;justify-content:center;width:32px;height:32px;"});if(n.spriteId){let o=n.spriteId;requestAnimationFrame(()=>{try{let a=ue.toCanvas(o,{scale:1});a.style.maxWidth="32px",a.style.maxHeight="32px",a.style.objectFit="contain",r.appendChild(a)}catch{r.textContent="-"}})}else r.textContent="-";return r}renderRarity(n){if(!n.rarity){let o=x("span",{style:"opacity:0.5;"});return o.textContent="\u2014",o}return bo({variant:"rarity",rarity:n.rarity,size:"sm"}).root}createDataCard(n,r,o,a){let i=this.stateCtrl.getCategoryState(n),s=p=>{if(!p)return o;let m=p.toLowerCase();return o.filter(f=>f.name.toLowerCase().includes(m))},u=po({columns:a,data:s(i.search),pageSize:0,compact:!0,maxHeight:"calc(var(--lg-row-h, 40px) * 6)",getRowId:p=>p.spriteId,onSortChange:(p,m)=>{this.stateCtrl.setCategorySort(n,p,m)}});i.sort.key&&i.sort.dir&&u.sortBy(i.sort.key,i.sort.dir);let d=fo({placeholder:"Search...",value:i.search,debounceMs:150,withClear:!0,size:"sm",focusKey:"",onChange:p=>{let m=p.trim();this.stateCtrl.setCategorySearch(n,m),u.setData(s(m))}}),l=x("div",{style:"margin-bottom:8px;"});l.appendChild(d.root);let c=x("div");return c.appendChild(l),c.appendChild(u.root),he({title:r,subtitle:`${o.length} entries`,variant:"soft",padding:"sm",expandable:!0,defaultExpanded:i.expanded,onExpandChange:p=>{this.stateCtrl.setCategoryExpanded(n,p)}},c)}formatCategoryName(n){return n.split("-").map(r=>r.charAt(0).toUpperCase()+r.slice(1)).join(" ")}findPlantBySprite(n,r){let o=le.get("plants");if(!o)return null;for(let i of Object.values(o))if(i?.seed?.spriteId===n||i?.plant?.spriteId===n||i?.crop?.spriteId===n)return i;let a=r.toLowerCase();for(let i of Object.values(o)){let s=(i?.seed?.name||"").toLowerCase();if(s===a||s===`${a} seed`)return i}return null}findPetBySpriteId(n){let r=le.get("pets");if(!r)return null;for(let o of Object.values(r))if(o?.spriteId===n)return o;return null}findItemBySpriteId(n){let r=le.get("items");if(!r)return null;for(let o of Object.values(r))if(o?.spriteId===n)return o;return null}findDecorBySpriteId(n){let r=le.get("decor");if(!r)return null;for(let o of Object.values(r))if(o?.spriteId===n)return o;return null}findEggBySpriteId(n){let r=le.get("eggs");if(!r)return null;for(let o of Object.values(r))if(o?.spriteId===n)return o;return null}getRarityForSprite(n,r,o){let a=n.toLowerCase();if(a==="plant"||a==="seed"||a==="tallplant"){let i=this.findPlantBySprite(r,o);if(i?.seed?.rarity)return i.seed.rarity}if(a==="pet"){let i=this.findPetBySpriteId(r);if(i?.rarity)return i.rarity}if(a==="item"){let i=this.findItemBySpriteId(r);if(i?.rarity)return i.rarity}if(a==="decor"){let i=this.findDecorBySpriteId(r);if(i?.rarity)return i.rarity}if(a==="egg"){let i=this.findEggBySpriteId(r);if(i?.rarity)return i.rarity}return null}yieldToMain(n=0){return new Promise(r=>{n>0?setTimeout(r,n):typeof requestIdleCallback<"u"?requestIdleCallback(()=>r(),{timeout:50}):setTimeout(r,4)})}async buildSpriteTables(n){let r=[{key:"name",header:"Name",sortable:!0,width:"1fr",sortFn:(a,i)=>a.name.localeCompare(i.name,void 0,{numeric:!0,sensitivity:"base"})},{key:"rarity",header:"Rarity",sortable:!0,width:"100px",align:"center",render:a=>this.renderRarity(a),sortFn:(a,i)=>Lo(a.rarity)-Lo(i.rarity)},{key:"sprite",header:"Sprite",width:"60px",align:"center",render:a=>this.renderSprite(a)}];if(!ue.ready())try{await ue.init()}catch{return}let o=ue.getCategories();for(let a=0;a<o.length;a++){await this.yieldToMain(8);let i=o[a],u=ue.getCategoryId(i).map(d=>{let l=`sprite/${i}/${d}`;return{name:d,spriteId:l,rarity:this.getRarityForSprite(i,l,d)}});if(u.sort((d,l)=>Lo(d.rarity)-Lo(l.rarity)),u.length>0){let d=this.createDataCard(i,this.formatCategoryName(i),u,r);n.appendChild(d)}}}};function Ro(e={}){let{id:t,checked:n=!1,disabled:r=!1,size:o="md",label:a,labelSide:i="right",onChange:s}=e,u=x("div",{className:"lg-switch-wrap"}),d=x("button",{className:`lg-switch lg-switch--${o}`,id:t,type:"button",role:"switch","aria-checked":String(!!n),"aria-disabled":String(!!r),title:a??"Basculer"}),l=x("span",{className:"lg-switch-track"}),c=x("span",{className:"lg-switch-thumb"});d.append(l,c);let p=null;a&&i!=="none"&&(p=x("span",{className:"lg-switch-label"},a)),p&&i==="left"?u.append(p,d):p&&i==="right"?u.append(d,p):u.append(d);let m=!!n,f=!!r;function g(){d.classList.toggle("on",m),d.setAttribute("aria-checked",String(m)),d.disabled=f,d.setAttribute("aria-disabled",String(f))}function h(M=!1){f||(m=!m,g(),M||s?.(m))}function b(M){M.preventDefault(),h()}function T(M){f||((M.key===" "||M.key==="Enter")&&(M.preventDefault(),h()),M.key==="ArrowLeft"&&(M.preventDefault(),v(!1)),M.key==="ArrowRight"&&(M.preventDefault(),v(!0)))}d.addEventListener("click",b),d.addEventListener("keydown",T);function S(){return m}function v(M,D=!1){m=!!M,g(),D||s?.(m)}function k(M){f=!!M,g()}function y(M){if(!M){p&&(p.remove(),p=null);return}p?p.textContent=M:(p=x("span",{className:"lg-switch-label"},M),u.append(p))}function C(){d.focus()}function P(){d.removeEventListener("click",b),d.removeEventListener("keydown",T)}return g(),{root:u,button:d,isChecked:S,setChecked:v,setDisabled:k,setLabel:y,focus:C,destroy:P}}Vn();$n();var cd={enabled:!1,favoriteProduceList:[],favoritePetsList:[],favoriteMutations:[]},Qe=[{id:"Rainbow",color:"#FF00FF",desc:"All Rainbow items"},{id:"Gold",color:"#EBC800",desc:"All Gold items"},{id:"Wet",color:"#5FFFFF",desc:"All Wet items"},{id:"Chilled",color:"#B4E6FF",desc:"All Chilled items"},{id:"Frozen",color:"#B9C8FF",desc:"All Frozen items"},{id:"Dawnlit",color:"#F59BE1",desc:"Dawn mutations"},{id:"Dawncharged",color:"#C896FF",desc:"Dawn charged"},{id:"Ambershine",color:"#FFB478",desc:"Amber mutations"},{id:"Ambercharged",color:"#FA8C4B",desc:"Amber charged"}],Ox={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function en(e){return e?Ox[e]??0:0}var xr=class extends Le{constructor(){super({id:"tab-auto-favorite",label:"Auto-Favorite"});oe(this,"config",cd);oe(this,"allPlants",[]);oe(this,"allPets",[]);oe(this,"sectionElement",null)}async build(n){let r=this.createGrid("12px");r.id="auto-favorite-settings";let o=document.createElement("style");o.textContent=`
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
    `,n.appendChild(o),this.sectionElement=r,n.appendChild(r),this.config=ze("gemini:features:autoFavorite:ui",cd),await this.loadGameData(),await this.waitForSprites(),this.renderContent()}async loadGameData(){try{await le.waitForAnyData();let n=le.get("plants")||{},r=le.get("pets")||{};this.allPlants=Object.keys(n).sort((o,a)=>{let i=n[o]?.seed?.rarity||null,s=n[a]?.seed?.rarity||null,u=en(i)-en(s);return u!==0?u:o.localeCompare(a,void 0,{numeric:!0,sensitivity:"base"})}),this.allPets=Object.keys(r).sort((o,a)=>{let i=r[o]?.rarity||null,s=r[a]?.rarity||null,u=en(i)-en(s);return u!==0?u:o.localeCompare(a,void 0,{numeric:!0,sensitivity:"base"})})}catch(n){console.error("[AutoFavorite UI] Failed to load game data:",n)}}async waitForSprites(){if(ue.ready())return;let n=1e4,r=100,o=0;return new Promise(a=>{let i=()=>{ue.ready()||o>=n?a():(o+=r,setTimeout(i,r))};i()})}renderContent(){this.sectionElement&&(this.sectionElement.innerHTML="",this.sectionElement.appendChild(this.createMasterToggle()),this.sectionElement.appendChild(this.createMutationsCard()),this.sectionElement.appendChild(this.createProduceCard()),this.sectionElement.appendChild(this.createPetsCard()))}createMasterToggle(){let n=x("div",{className:"kv"}),r=st({text:"Enable Auto-Favorite",tone:"default",size:"lg"}),o=Ro({checked:this.config.enabled,onChange:a=>{this.config.enabled=a,this.saveConfig()}});return n.append(r.root,o.root),he({title:"Auto-Favorite",padding:"lg"},n,x("p",{style:"margin-top: 6px; font-size: 12px; color: var(--muted);"},"Automatically favorite items when added to inventory"))}createMutationsCard(){let n=x("div",{style:"display: grid; gap: 10px;"}),r=x("div",{style:"display: grid; grid-template-columns: 1fr 1fr; gap: 8px;"});r.appendChild(this.createMutationButton(Qe[0],{align:"center"})),r.appendChild(this.createMutationButton(Qe[1],{align:"center"})),n.appendChild(r);let o=x("div",{style:"display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;"});o.appendChild(this.createMutationButton(Qe[2],{align:"center"})),o.appendChild(this.createMutationButton(Qe[3],{align:"center"})),o.appendChild(this.createMutationButton(Qe[4],{align:"center"})),n.appendChild(o);let a=x("div",{style:"display: grid; grid-template-columns: 1fr 1fr; gap: 8px;"});a.appendChild(this.createMutationButton(Qe[5],{align:"center"})),a.appendChild(this.createMutationButton(Qe[6],{align:"center"})),n.appendChild(a);let i=x("div",{style:"display: grid; grid-template-columns: 1fr 1fr; gap: 8px;"});return i.appendChild(this.createMutationButton(Qe[7],{align:"center"})),i.appendChild(this.createMutationButton(Qe[8],{align:"center"})),n.appendChild(i),he({title:"Mutations Priority",variant:"soft",padding:"lg",expandable:!0,defaultExpanded:!0},n,x("p",{style:"margin-top: 8px; font-size: 11px; color: var(--muted);"},`${this.config.favoriteMutations.length} / ${Qe.length} active`))}createMutationButton(n,r={}){let{large:o=!1,align:a="center"}=r,i=this.config.favoriteMutations.includes(n.id),s=n.color,u=parseInt(s.slice(1,3),16),d=parseInt(s.slice(3,5),16),l=parseInt(s.slice(5,7),16),c=`rgba(${u}, ${d}, ${l}, 0.25)`,p=s;n.id==="Rainbow"&&i&&(c="linear-gradient(135deg, rgba(255,0,0,0.3) 0%, rgba(255,165,0,0.3) 20%, rgba(255,255,0,0.3) 40%, rgba(0,128,0,0.3) 60%, rgba(0,0,255,0.3) 80%, rgba(75,0,130,0.3) 100%)",p="#fff9c4");let m=x("div",{style:`padding: ${o?"14px":"8px 16px"}; min-height: 52px; border-radius: var(--card-radius, 12px); cursor: pointer; transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1); background: ${i?c:"color-mix(in oklab, var(--tab-bg) 5%, transparent)"}; border: 2px solid ${i?p:"color-mix(in oklab, var(--tab-bg) 20%, transparent)"}; display: flex; align-items: center; justify-content: center; gap: 16px; box-shadow: ${i?n.id==="Rainbow"?"0 4px 18px rgba(255,255,255,0.25)":`0 4px 12px rgba(${u}, ${d}, ${l}, 0.3)`:"none"}; opacity: ${i?"1":"0.8"};`}),f=x("div",{style:"width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(ue.ready()){let b=ue.toCanvas("plant","Sunflower",{mutations:[n.id],scale:.18});b.style.width="32px",b.style.height="32px",b.style.objectFit="contain",f.appendChild(b)}}catch{}let g=n.id.charAt(0).toUpperCase()+n.id.slice(1).toLowerCase(),h=x("div",{style:`font-size: ${o?"15px":"13px"}; font-weight: 600; color: var(--fg); text-shadow: 0 1px 2px rgba(0,0,0,0.5); white-space: nowrap;`},g);if(m.append(f,h),n.id==="Rainbow"||n.id==="Gold"){let b=x("div",{style:"width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(ue.ready()){let T=ue.toCanvas("pet","Capybara",{mutations:[n.id],scale:.18});T.style.width="32px",T.style.height="32px",T.style.objectFit="contain",b.appendChild(T)}}catch{}m.append(b)}else{let b=x("div",{style:"width: 32px; height: 32px; flex-shrink: 0;"});m.append(b)}return m.addEventListener("click",()=>{i?this.config.favoriteMutations=this.config.favoriteMutations.filter(b=>b!==n.id):this.config.favoriteMutations.push(n.id),this.saveConfig(),this.renderContent()}),m}createProduceCard(){return this.createItemSelectionCard({title:"Produce",items:this.allPlants,category:"plant",selected:this.config.favoriteProduceList,onUpdate:n=>{this.config.favoriteProduceList=n,this.saveConfig()}})}createPetsCard(){return this.createItemSelectionCard({title:"Pets",items:this.allPets,category:"pet",selected:this.config.favoritePetsList,onUpdate:n=>{this.config.favoritePetsList=n,this.saveConfig()}})}createItemSelectionCard(n){let{title:r,items:o,category:a,selected:i,onUpdate:s}=n,u=new Set(i),d=o,l=x("div",{style:"margin-bottom: 8px;"}),c=fo({placeholder:`Search ${r.toLowerCase()}...`,value:"",debounceMs:150,withClear:!0,size:"sm",focusKey:"",onChange:y=>{let C=y.trim().toLowerCase();C?d=o.filter(P=>P.toLowerCase().includes(C)):d=o,S.setData(g())}});l.appendChild(c.root);let p=x("div",{style:"display: flex; gap: 8px; margin-bottom: 12px;"}),m=lt({label:"Select All",variant:"default",size:"sm",onClick:()=>{let y=g().map(C=>C.id);S.setSelection(y)}}),f=lt({label:"Deselect All",variant:"default",size:"sm",onClick:()=>{S.clearSelection()}});p.append(m,f);let g=()=>d.map(y=>({id:y,name:y,rarity:this.getItemRarity(y,a),selected:u.has(y)})),h=y=>{if(!y){let P=x("span",{style:"opacity:0.5;"});return P.textContent="\u2014",P}return bo({variant:"rarity",rarity:y,size:"sm"}).root},b=y=>{let C=x("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0; background: rgba(0,0,0,0.05); border-radius: 6px;"});try{if(ue.ready()){let P=a,M=y;a==="plant"&&(["Bamboo","Cactus"].includes(y)&&(P="tallplant"),y==="DawnCelestial"&&(M="DawnCelestialCrop"),y==="MoonCelestial"&&(M="MoonCelestialCrop"),y==="OrangeTulip"&&(M="Tulip"));let D=ue.toCanvas(P,M,{scale:.5});D.style.width="28px",D.style.height="28px",D.style.objectFit="contain",C.appendChild(D)}}catch{}return C},S=po({columns:[{key:"name",header:"Name",width:"1fr",align:"center",sortable:!0,sortFn:(y,C)=>y.name.localeCompare(C.name,void 0,{numeric:!0,sensitivity:"base"}),render:y=>{let C=x("div",{style:"display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%;"}),P=b(y.id),M=x("span",{style:"font-weight: 500; color: var(--fg); white-space: nowrap;"},y.name);return C.append(P,M),C}},{key:"rarity",header:"Rarity",width:"100px",align:"center",sortable:!0,sortFn:(y,C)=>en(y.rarity)-en(C.rarity),render:y=>h(y.rarity)}],data:g(),maxHeight:280,compact:!0,zebra:!0,animations:!0,selectable:!0,selectOnRowClick:!0,hideHeaderCheckbox:!0,initialSelection:Array.from(u),getRowId:y=>y.id,onSelectionChange:y=>{u.clear(),y.forEach(C=>u.add(C)),s(Array.from(u)),k()}}),v=x("p",{style:"margin-top: 8px; font-size: 11px; color: var(--muted);"}),k=()=>{v.textContent=`${u.size} / ${o.length} selected`};return k(),he({title:`${r} (${u.size}/${o.length})`,variant:"soft",padding:"lg",expandable:!0,defaultExpanded:!1},l,p,S.root,v)}getItemRarity(n,r){try{if(r==="pet")return(le.get("pets")||{})[n]?.rarity||null;if(r==="plant"){let o=le.get("plants")||{},a=o[n];if(a?.seed?.rarity)return a.seed.rarity;let i=n.toLowerCase();for(let s of Object.values(o))if(s?.seed?.name?.toLowerCase()===i||s?.plant?.name?.toLowerCase()===i)return s.seed.rarity}}catch{}return null}async saveConfig(){ot("gemini:features:autoFavorite:ui",this.config);try{let{setEnabled:n,updateSimpleConfig:r}=await Promise.resolve().then(()=>(ld(),sd));await r({enabled:this.config.enabled,favoriteSpecies:[...this.config.favoriteProduceList,...this.config.favoritePetsList],favoriteMutations:this.config.favoriteMutations}),await n(this.config.enabled)}catch(n){console.error("[AutoFavorite UI] Failed to apply config:",n)}}};$n();var ud={autoFavorite:{enabled:!1},bulkFavorite:{enabled:!1},journalChecker:{enabled:!1},cropSizeIndicator:{enabled:!1,showForGrowing:!0,showForMature:!0,showJournalBadges:!0},eggProbabilityIndicator:{enabled:!1},cropValueIndicator:{enabled:!1},xpTracker:{enabled:!1},abilityTracker:{enabled:!1},mutationTracker:{enabled:!1},cropBoostTracker:{enabled:!1},turtleTimer:{enabled:!1}},Sr=class extends Le{constructor(){super({id:"tab-feature-settings",label:"Features"});oe(this,"config",ud)}async build(n){let r=this.createGrid("12px");r.id="feature-settings",n.appendChild(r),this.config=ze("gemini:features:config",ud),r.appendChild(this.createQOLCard()),r.appendChild(this.createVisualIndicatorsCard()),r.appendChild(this.createTrackingCard())}createQOLCard(){return he({title:"Quality of Life",padding:"lg",expandable:!0,defaultExpanded:!0},this.createToggleRow("Auto-Favorite",this.config.autoFavorite.enabled,n=>{this.config.autoFavorite.enabled=n,this.saveConfig()}),this.createToggleRow("Bulk Favorite",this.config.bulkFavorite.enabled,n=>{this.config.bulkFavorite.enabled=n,this.saveConfig()}),this.createToggleRow("Journal Checker",this.config.journalChecker.enabled,n=>{this.config.journalChecker.enabled=n,this.saveConfig()}))}createVisualIndicatorsCard(){return he({title:"Visual Indicators",variant:"soft",padding:"lg",expandable:!0,defaultExpanded:!0},this.createToggleRow("Crop Size",this.config.cropSizeIndicator.enabled,n=>{this.config.cropSizeIndicator.enabled=n,this.saveConfig()},"Shows size % and journal badges"),this.createToggleRow("Egg Probability",this.config.eggProbabilityIndicator.enabled,n=>{this.config.eggProbabilityIndicator.enabled=n,this.saveConfig()},"Shows hatch chances + mutation %"),this.createToggleRow("Crop Value",this.config.cropValueIndicator.enabled,n=>{this.config.cropValueIndicator.enabled=n,this.saveConfig()},"Shows coin value"))}createTrackingCard(){return he({title:"Tracking & Analytics",variant:"soft",padding:"lg",expandable:!0,defaultExpanded:!1},this.createToggleRow("XP Tracker",this.config.xpTracker.enabled,n=>{this.config.xpTracker.enabled=n,this.saveConfig()}),this.createToggleRow("Ability Tracker",this.config.abilityTracker.enabled,n=>{this.config.abilityTracker.enabled=n,this.saveConfig()}),this.createToggleRow("Mutation Tracker",this.config.mutationTracker.enabled,n=>{this.config.mutationTracker.enabled=n,this.saveConfig()}),this.createToggleRow("Crop Boost Tracker",this.config.cropBoostTracker.enabled,n=>{this.config.cropBoostTracker.enabled=n,this.saveConfig()}),this.createToggleRow("Turtle Timer",this.config.turtleTimer.enabled,n=>{this.config.turtleTimer.enabled=n,this.saveConfig()}))}createToggleRow(n,r,o,a){let i=x("div",{className:a?"kv-col":"kv"}),s=x("div",{className:"kv"}),u=st({text:n,tone:"default",size:"md"}),d=Ro({checked:r,onChange:o});if(s.append(u.root,d.root),a){i.appendChild(s);let l=x("p",{className:"helper-text",style:"font-size: 12px; color: var(--item-desc, var(--muted)); margin-top: 4px;"},a);return i.appendChild(l),i}return s}saveConfig(){ot("gemini:features:config",this.config),console.log("[FeatureSettings] Config saved:",this.config)}};var wr=class extends Le{constructor(){super({id:"tab-journal-checker",label:"Journal"});oe(this,"progress",null)}async build(n){this.container=n;let r=this.createGrid("12px");r.id="journal-checker",n.appendChild(r),await this.updateProgress();let o=(a=>{this.progress=a.detail,this.renderContent()});window.addEventListener("gemini:journal-updated",o),this.addCleanup(()=>{window.removeEventListener("gemini:journal-updated",o)})}async updateProgress(){try{let{aggregateJournalProgress:n}=await Promise.resolve().then(()=>(fd(),gd));this.progress=await n(),this.renderContent()}catch(n){console.error("[JournalChecker] Failed to load progress:",n)}}renderContent(){if(!this.container)return;let n=this.container.querySelector("#journal-checker");if(n){if(n.innerHTML="",!this.progress){n.appendChild(this.createLoadingCard());return}n.appendChild(this.createProgressCard()),n.appendChild(this.createActionsCard())}}createLoadingCard(){return he({title:"Loading...",padding:"lg"},x("p",{},"Fetching journal data..."))}createProgressCard(){if(!this.progress)return x("div");let n=this.createProgressRow("\u{1F331} Plants",this.progress.plants.logged,this.progress.plants.total,this.progress.plants.percentage),r=this.createProgressRow("\u{1F43E} Pets",this.progress.pets.logged,this.progress.pets.total,this.progress.pets.percentage),o=this.createProgressRow("\u{1F3A8} Decor",this.progress.decor.logged,this.progress.decor.total,this.progress.decor.percentage);return he({title:"Collection Progress",padding:"lg",expandable:!0,defaultExpanded:!0},n,r,o)}createProgressRow(n,r,o,a){let i=x("div",{className:"kv-col",style:"gap: 6px;"}),s=x("div",{className:"kv"}),u=st({text:n,tone:"default",size:"md"}),d=x("span",{style:"font-size: 13px; color: var(--item-desc, var(--muted));"},`${r}/${o}`);s.append(u.root,d);let l=x("div",{style:`
        width: 100%;
        height: 6px;
        background: var(--card-bg, var(--soft));
        border-radius: 3px;
        overflow: hidden;
      `}),c=x("div",{style:`
        width: ${a}%;
        height: 100%;
        background: linear-gradient(90deg, var(--tab-bg, var(--accent)), var(--group-title, var(--pill-to)));
        transition: width 0.3s ease;
      `});return l.appendChild(c),i.append(s,l),i}createActionsCard(){let n=lt({label:"\u{1F504} Refresh",variant:"default",size:"md",onClick:async()=>{await this.updateProgress()}}),r=lt({label:"\u{1F4CB} Show Missing",variant:"default",size:"md",onClick:()=>{this.showMissingItems()}}),o=x("div",{style:"display: flex; gap: 8px; flex-wrap: wrap;"});return o.append(n,r),he({title:"Actions",variant:"soft",padding:"lg",expandable:!0,defaultExpanded:!1},o)}showMissingItems(){if(!this.progress)return;let n=[{category:"Plants",items:this.progress.plants.missing},{category:"Pets",items:this.progress.pets.missing},{category:"Decor",items:this.progress.decor.missing}].filter(r=>r.items.length>0);if(n.length===0){console.log("\u{1F389} [JournalChecker] Collection complete!");return}console.group("\u{1F4CB} Missing Items"),n.forEach(r=>{console.group(`${r.category} (${r.items.length})`),r.items.forEach(o=>console.log(`- ${o}`)),console.groupEnd()}),console.groupEnd()}};var Ii=null;function bd(){return Ii||(Ii=new Do),Ii}async function Ei(){await bd().preload()}function Li(e){return[new uo(e),new Sr,new xr,new wr,bd()]}ye();function Di(e){let{shadow:t,initialOpen:n}=e,r=x("div",{className:"gemini-panel",id:"panel",ariaHidden:String(!n)}),o=x("div",{className:"gemini-tabbar"}),a=x("div",{className:"gemini-content",id:"content"}),i=x("div",{className:"gemini-resizer",title:"Resize"}),s=x("button",{className:"gemini-close",title:"Fermer",ariaLabel:"Fermer"},"\u2715");r.append(o,a,i);let u=x("div",{className:"gemini-wrapper"},r);return t.append(u),{panel:r,tabbar:o,content:a,resizer:i,closeButton:s,wrapper:u}}Gt();ye();function Ri(e){let{resizer:t,host:n,panel:r,shadow:o,onWidthChange:a,initialWidth:i,minWidth:s,maxWidth:u}=e,d=s,l=u;function c(){let k=De.detect(),y=Math.round(A.visualViewport?.width??A.innerWidth??0);if(k.platform==="mobile"||k.os==="ios"||k.os==="android"){let C=getComputedStyle(o.host),P=parseFloat(C.getPropertyValue("--inset-l"))||0,M=parseFloat(C.getPropertyValue("--inset-r"))||0,D=Math.max(280,y-Math.round(P+M)),L=Math.min(420,Math.max(300,Math.floor(y*.66))),F=D;d=Math.min(L,D),l=F}else d=s,l=u;return{min:d,max:l}}function p(k){return Math.max(d,Math.min(l,Number(k)||i))}function m(k){let y=p(k);n.style.setProperty("--w",`${y}px`),a(y)}c();let f=De.detect(),g=!(f.platform==="mobile"||f.os==="ios"||f.os==="android"),h=!1,b=k=>{if(!h)return;k.preventDefault();let y=Math.round(A.innerWidth-k.clientX);m(y)},T=()=>{h&&(h=!1,document.body.style.cursor="",A.removeEventListener("mousemove",b),A.removeEventListener("mouseup",T))},S=k=>{g&&(k.preventDefault(),h=!0,document.body.style.cursor="ew-resize",A.addEventListener("mousemove",b),A.addEventListener("mouseup",T))};t.addEventListener("mousedown",S);function v(){t.removeEventListener("mousedown",S),A.removeEventListener("mousemove",b),A.removeEventListener("mouseup",T)}return{calculateResponsiveBounds:c,constrainWidthToLimits:p,setHudWidth:m,destroy:v}}function Oi(e){let{panel:t,onToggle:n,onClose:r,toggleCombo:o=u=>u.ctrlKey&&u.shiftKey&&u.key.toLowerCase()==="u",closeOnEscape:a=!0}=e;function i(u){let d=t.classList.contains("open");if(a&&u.key==="Escape"&&d){r();return}o(u)&&(u.preventDefault(),u.stopPropagation(),n())}document.addEventListener("keydown",i,{capture:!0});function s(){document.removeEventListener("keydown",i,{capture:!0})}return{destroy:s}}var hd=`
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
`;var Gi=`
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
`;var Hi=`
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
`;var Ni=`
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
`;function _i(e,t,n){if(e.querySelector(`style[data-style-id="${n}"]`))return;let r=document.createElement("style");r.setAttribute("data-style-id",n),r.textContent=t,e.appendChild(r)}var yd=`
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
  
`;var vd=`
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
`;var xd=`
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
`;var Sd=`
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
`;var wd=`
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
`;var Td=`
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
`;var kd=`
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
`;var Cd=`
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
`;var Pd=`
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
`;var Md=`
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
`;var Ad=`
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
`;var Id=`
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
`;var Ed=`
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
`;var Ld=`
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
`;var Dd=`
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
`;var Rd=`
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
`;var Od=`
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
`;var Nx={all:"initial",position:"fixed",top:"0",right:"0",zIndex:"2147483647",pointerEvents:"auto",fontFamily:'system-ui, -apple-system, "Segoe UI", Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',fontSize:"13px",lineHeight:"1.35"};function _x(e="gemini-root"){let t=document.createElement("div");t.id=e,Object.assign(t.style,Nx),(document.body||document.documentElement).appendChild(t);let n=t.attachShadow({mode:"open"});return{host:t,shadow:n}}function Wx(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:16}):setTimeout(e,0)})}async function Wi(e){let{hostId:t="gemini-hud-root",initialWidth:n,initialOpen:r,onWidthChange:o,onOpenChange:a,themes:i,initialTheme:s,onThemeChange:u,buildSections:d,initialTab:l,onTabChange:c,toggleCombo:p=E=>E.ctrlKey&&E.shiftKey&&E.key.toLowerCase()==="u",closeOnEscape:m=!0,minWidth:f=420,maxWidth:g=720}=e,{host:h,shadow:b}=_x(t),T=[[Gi,"variables"],[Hi,"primitives"],[Ni,"utilities"],[hd,"hud"],[yd,"card"],[vd,"badge"],[xd,"button"],[Sd,"input"],[wd,"label"],[Td,"navTabs"],[kd,"searchBar"],[Cd,"select"],[Pd,"switch"],[Md,"table"],[Ad,"timeRangePicker"],[Id,"tooltip"],[Ed,"slider"],[Ld,"reorderableList"],[Dd,"colorPicker"],[Rd,"log"],[Od,"settings"]];for(let E=0;E<T.length;E++){let[R,O]=T[E];_i(b,R,O),E%5===4&&await Wx()}let{panel:S,tabbar:v,content:k,resizer:y,closeButton:C,wrapper:P}=Di({shadow:b,initialOpen:r});function M(E){S.dispatchEvent(new CustomEvent("gemini:hud-open-change",{detail:{isOpen:E},bubbles:!0})),a?.(E)}function D(E){let R=S.classList.contains("open");S.classList.toggle("open",E),S.setAttribute("aria-hidden",E?"false":"true"),E!==R&&M(E)}D(r),C.addEventListener("click",E=>{E.preventDefault(),E.stopPropagation(),D(!1)});let L=Dr({host:h,themes:i,initialTheme:s,onThemeChange:u}),F=Ri({resizer:y,host:h,panel:S,shadow:b,onWidthChange:o||(()=>{}),initialWidth:n,minWidth:f,maxWidth:g});F.setHudWidth(n);let Z=d({applyTheme:L.applyTheme,initialTheme:s,getCurrentTheme:L.getCurrentTheme,setHUDWidth:F.setHudWidth,setHUDOpen:D}),W=new an(Z,k,{applyTheme:L.applyTheme,getCurrentTheme:L.getCurrentTheme}),Q=Z.map(E=>({id:E.id,label:E.label})),de=rs(Q,l||Q[0]?.id||"",E=>{W.activate(E),c?.(E)});de.root.style.flex="1 1 auto",de.root.style.minWidth="0",v.append(de.root,C),W.activate(l||Q[0]?.id||"");let z=Oi({panel:S,onToggle:()=>D(!S.classList.contains("open")),onClose:()=>D(!1),toggleCombo:p,closeOnEscape:m}),N=()=>{de.recalc();let E=parseInt(getComputedStyle(h).getPropertyValue("--w"))||n;F.calculateResponsiveBounds(),F.setHudWidth(E)};A.addEventListener("resize",N);function H(){z.destroy(),F.destroy(),A.removeEventListener("resize",N)}return{host:h,shadow:b,wrapper:P,panel:S,content:k,setOpen:D,setWidth:F.setHudWidth,sections:Z,manager:W,nav:de,destroy:H}}var tn={isOpen:"gemini.hud.isOpen",width:"gemini.hud.width",theme:"gemini.hud.theme",activeTab:"gemini.hud.activeTab"},Yn={isOpen:!1,width:480,theme:"dark",activeTab:"tab-settings"};function Fi(){return{isOpen:it(tn.isOpen,Yn.isOpen),width:it(tn.width,Yn.width),theme:it(tn.theme,Yn.theme),activeTab:it(tn.activeTab,Yn.activeTab)}}function nn(e,t){sn(tn[e],t)}var Fx="https://i.imgur.com/IMkhMur.png",Bx="Stats";function Tr(e){let t=e.iconUrl||Fx,n=e.ariaLabel||"Open MGH",r=null,o=null,a=null,i=!1,s=null,u=null,d=["Chat","Leaderboard","Stats","Open Activity Log"],l=S=>{try{return typeof CSS<"u"&&CSS&&typeof CSS.escape=="function"?CSS.escape(S):S.replace(/"/g,'\\"')}catch{return S}};function c(){let S=document.querySelector(d.map(k=>`button[aria-label="${l(k)}"]`).join(","));if(!S)return null;let v=S.parentElement;for(;v&&v!==document.body;){if(d.reduce((y,C)=>y+v.querySelectorAll(`button[aria-label="${l(C)}"]`).length,0)>=2)return v;v=v.parentElement}return null}function p(S){return S}function m(S){let v=Array.from(S.querySelectorAll("button[aria-label]"));if(!v.length)return{refBtn:null,refWrapper:null};let k=v.filter(F=>F.dataset.mghBtn!=="true"&&(F.getAttribute("aria-label")||"")!==(e.ariaLabel||"Open MGH")),y=k.length?k:v,C=y.find(F=>(F.getAttribute("aria-label")||"").toLowerCase()===Bx.toLowerCase())||null,P=y.length>=2?y.length-2:y.length-1,M=C||y[P],D=M.parentElement,L=D&&D.parentElement===S&&D.tagName==="DIV"?D:null;return{refBtn:M,refWrapper:L}}function f(S,v,k){let y=S.cloneNode(!1);y.type="button",y.setAttribute("aria-label",v),y.title=v,y.dataset.mghBtn="true",y.style.pointerEvents="auto",y.removeAttribute("id");let C=document.createElement("img");return C.src=k,C.alt="MGH",C.style.pointerEvents="none",C.style.userSelect="none",C.style.width="76%",C.style.height="76%",C.style.objectFit="contain",C.style.display="block",C.style.margin="auto",y.appendChild(C),y.addEventListener("click",P=>{P.preventDefault(),P.stopPropagation();try{e.onClick?.()}catch{}}),y}function g(){if(i)return!1;i=!0;let S=!1;try{let v=c();if(!v)return!1;s!==v&&(s=v);let{refBtn:k,refWrapper:y}=m(v);if(!k)return!1;o=v.querySelector('div[data-mgh-wrapper="true"]'),!o&&y&&(o=y.cloneNode(!1),o.dataset.mghWrapper="true",o.removeAttribute("id"),S=!0);let C=o?.querySelector('button[data-mgh-btn="true"]')||null;r||(r=C),r||(r=f(k,n,t),o?o.appendChild(r):r.parentElement!==v&&v.appendChild(r),S=!0),o&&o.parentElement!==v&&(v.appendChild(o),S=!0);let P=v;if(P&&P!==u){try{T.disconnect()}catch{}u=P,T.observe(u,{childList:!0,subtree:!0})}return S}finally{i=!1}}g();let h=document.getElementById("App")||document.body,b=null,T=new MutationObserver(S=>{let v=S.every(y=>{let C=Array.from(y.addedNodes||[]),P=Array.from(y.removedNodes||[]),M=C.concat(P);if(M.length===0){let D=y.target;return o&&(D===o||o.contains(D))||r&&(D===r||r.contains(D))}return M.every(D=>!!(!(D instanceof HTMLElement)||o&&(D===o||o.contains(D))||r&&(D===r||r.contains(D))))}),k=S.some(y=>Array.from(y.removedNodes||[]).some(C=>C instanceof HTMLElement?!!(o&&(C===o||o.contains(C))||r&&(C===r||r.contains(C))):!1));v&&!k||b===null&&(b=window.setTimeout(()=>{if(b=null,g()&&o){let C=o.parentElement;C&&C.lastElementChild!==o&&C.appendChild(o)}},150))});return T.observe(h,{childList:!0,subtree:!0}),a=()=>T.disconnect(),()=>{try{a?.()}catch{}try{o?.remove()}catch{}}}hr();ye();var Vx={},Nd=[];function jx(){return Nd.slice()}function Ux(e){Nd.push(e)}function _d(e){try{return JSON.parse(e)}catch{return}}function Gd(e){if(typeof e=="string"){let t=_d(e);return t!==void 0?t:e}return e}function Wd(e){if(e!=null){if(typeof e=="string"){let t=_d(e);return t!==void 0?Wd(t):e}if(Array.isArray(e)&&typeof e[0]=="string")return e[0];if(typeof e=="object"){let t=e;return t.type??t.Type??t.kind??t.messageType}}}function zx(e){let t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function j(e,t,n){let r=typeof t=="boolean"?t:!0,o=typeof t=="function"?t:n,a=(i,s)=>{if(Wd(i)!==e)return;let d=o(i,s);return d&&typeof d=="object"&&"kind"in d?d:typeof d=="boolean"?d?void 0:{kind:"drop"}:r?void 0:{kind:"drop"}};return Ux(a),a}var Xn=new WeakSet,Hd=new WeakMap;function Fd(e){let t=e.pageWindow,n=!!e.debug,r=e.middlewares&&e.middlewares.length?e.middlewares:jx();if(!r.length)return()=>{};let o=p=>({ws:p,pageWindow:t,debug:n}),a=(p,m)=>{let f=p;for(let g of r){let h=g(f,o(m));if(h){if(h.kind==="drop")return{kind:"drop"};h.kind==="replace"&&(f=h.message)}}return f!==p?{kind:"replace",message:f}:void 0},i=null,s=null,u=null,d=()=>{let p=t?.MagicCircle_RoomConnection,m=p?.sendMessage;if(!p||typeof m!="function")return!1;if(Xn.has(m))return!0;let f=m.bind(p);function g(...h){let b=h.length===1?h[0]:h,T=Gd(b),S=a(T,zx(t));if(S?.kind==="drop"){n&&console.log("[WS] drop outgoing (RoomConnection.sendMessage)",T);return}if(S?.kind==="replace"){let v=S.message;return h.length>1&&Array.isArray(v)?(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",T,"=>",v),f(...v)):(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",T,"=>",v),f(v))}return f(...h)}Xn.add(g),Hd.set(g,m);try{p.sendMessage=g,Xn.add(p.sendMessage),n&&console.log("[WS] outgoing patched via MagicCircle_RoomConnection.sendMessage")}catch{return!1}return i=()=>{try{p.sendMessage===g&&(p.sendMessage=m)}catch{}},!0};(()=>{let p=t?.WebSocket?.prototype,m=p?.send;if(typeof m!="function"||Xn.has(m))return;function f(g){let h=Gd(g),b=a(h,this);if(b?.kind==="drop"){n&&console.log("[WS] drop outgoing (ws.send)",h);return}if(b?.kind==="replace"){let T=b.message,S=typeof T=="string"||T instanceof ArrayBuffer||T instanceof Blob?T:JSON.stringify(T);return n&&console.log("[WS] replace outgoing (ws.send)",h,"=>",T),m.call(this,S)}return m.call(this,g)}Xn.add(f),Hd.set(f,m);try{p.send=f,n&&console.log("[WS] outgoing patched via WebSocket.prototype.send")}catch{return}s=()=>{try{p.send===f&&(p.send=m)}catch{}}})();let c=e.waitForRoomConnectionMs??4e3;if(!d()&&c>0){let p=Date.now();u=setInterval(()=>{if(d()){clearInterval(u),u=null;return}Date.now()-p>c&&(clearInterval(u),u=null,n&&console.log("[WS] RoomConnection not found, only ws.send is patched"))},250)}return()=>{if(u){try{clearInterval(u)}catch{}u=null}if(i){try{i()}catch{}i=null}if(s){try{s()}catch{}s=null}}}(function(){try{let t=Vx,n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();var qx={},jd=[];function $x(){return jd.slice()}function Bd(e){jd.push(e)}function Kx(e){if(e!=null){if(typeof e=="object"){let t=e;if(typeof t.type=="string")return t.type;if(typeof t.Type=="string")return t.Type;if(typeof t.kind=="string")return t.kind;if(typeof t.messageType=="string")return t.messageType}if(Array.isArray(e)&&typeof e[0]=="string")return e[0]}}function Jx(e){if(typeof e=="string")try{return JSON.parse(e)}catch{return e}return e}var Bi=Symbol.for("ariesmod.ws.handlers.patched");function fe(e,t){if(typeof e=="string"){let o=e,a={match:i=>i.kind==="message"&&i.type===o,handle:t};return Bd(a),a}let n=e,r={match:o=>o.kind==="close"&&o.code===n,handle:t};return Bd(r),r}function Ud(e,t=$x(),n={}){let r=n.pageWindow??window,o=!!n.debug;if(e[Bi])return()=>{};e[Bi]=!0;let a={ws:e,pageWindow:r,debug:o},i=c=>{for(let p of t)try{if(!p.match(c))continue;if(p.handle(c,a)===!0)return}catch(m){o&&console.error("[WS] handler error",m,c)}},s=c=>{let p=Jx(c.data),m=Kx(p);i({kind:"message",raw:c.data,data:p,type:m})},u=c=>{i({kind:"close",code:c.code,reason:c.reason,wasClean:c.wasClean,event:c})},d=c=>i({kind:"open",event:c}),l=c=>i({kind:"error",event:c});return e.addEventListener("message",s),e.addEventListener("close",u),e.addEventListener("open",d),e.addEventListener("error",l),()=>{try{e.removeEventListener("message",s)}catch{}try{e.removeEventListener("close",u)}catch{}try{e.removeEventListener("open",d)}catch{}try{e.removeEventListener("error",l)}catch{}try{delete e[Bi]}catch{}}}(function(){try{let t=qx,n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();rt();fe(4800,(e,t)=>{t.debug&&console.log("[WS][Close] Auth failure",e.code,e.reason)});fe(4300,(e,t)=>{t.debug&&console.log("[WS][Close] Superseded",e.code,e.reason)});fe(4400,(e,t)=>{t.debug&&console.log("[WS][Close] Heartbeat expired",e.code,e.reason)});fe(4500,(e,t)=>{t.debug&&console.log("[WS][Close] Player kicked",e.code,e.reason)});fe(4200,(e,t)=>{t.debug&&console.log("[WS][Close] Player left voluntarily",e.code,e.reason)});fe(4100,(e,t)=>{t.debug&&console.log("[WS][Close] Reconnect initiated",e.code,e.reason)});fe(4310,(e,t)=>{t.debug&&console.log("[WS][Close] Server disposed",e.code,e.reason)});fe(4250,(e,t)=>{t.debug&&console.log("[WS][Close] User session superseded",e.code,e.reason)});fe(4710,(e,t)=>{t.debug&&console.log("[WS][Close] Version expired",e.code,e.reason)});fe(4700,(e,t)=>{t.debug&&console.log("[WS][Close] Version mismatch",e.code,e.reason)});rt();fe(Xe.Config,(e,t)=>{t.debug&&console.log("[WS][STC] Config",e.data)});fe(Xe.CurrencyTransaction,(e,t)=>{t.debug&&console.log("[WS][STC] CurrencyTransaction",e.data)});fe(Xe.Emote,(e,t)=>{t.debug&&console.log("[WS][STC] Emote",e.data)});fe(Xe.InappropriateContentRejected,(e,t)=>{t.debug&&console.log("[WS][STC] InappropriateContentRejected",e.data)});fe(Xe.PartialState,(e,t)=>{t.debug&&console.log("[WS][STC] PartialState",e.data)});fe(Xe.Pong,(e,t)=>{t.debug&&console.log("[WS][STC] Pong",e.data)});fe(Xe.ServerErrorMessage,(e,t)=>{t.debug&&console.log("[WS][STC] ServerErrorMessage",e.data)});fe(Xe.Welcome,(e,t)=>{t.debug&&console.log("[WS][STC] Welcome",e.data)});rt();j(I.PlantSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantSeed"),!!1));j(I.WaterPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] WaterPlant"),!!1));j(I.HarvestCrop,(e,t)=>(t.debug&&console.log("[MW][Garden] HarvestCrop"),!!1));j(I.SellAllCrops,(e,t)=>(t.debug&&console.log("[MW][Garden] SellAllCrops"),!!1));j(I.PurchaseSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseSeed"),!!1));j(I.PurchaseEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseEgg"),!!1));j(I.PurchaseTool,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseTool"),!!1));j(I.PurchaseDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseDecor"),!!1));j(I.PlantEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantEgg"),!!1));j(I.HatchEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] HatchEgg"),!!1));j(I.PlantGardenPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantGardenPlant"),!!1));j(I.PotPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PotPlant"),!!1));j(I.MutationPotion,(e,t)=>(t.debug&&console.log("[MW][Garden] MutationPotion"),!!1));j(I.PickupDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PickupDecor"),!!1));j(I.PlaceDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PlaceDecor"),!!1));j(I.RemoveGardenObject,(e,t)=>(t.debug&&console.log("[MW][Garden] RemoveGardenObject"),!!1));rt();j(I.MoveInventoryItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveInventoryItem"),!!1));j(I.DropObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] DropObject"),!!1));j(I.PickupObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] PickupObject"),!!1));j(I.ToggleFavoriteItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] ToggleFavoriteItem"),!!1));j(I.PutItemInStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] PutItemInStorage"),!!1));j(I.RetrieveItemFromStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] RetrieveItemFromStorage"),!!1));j(I.MoveStorageItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveStorageItem"),!!1));j(I.LogItems,(e,t)=>(t.debug&&console.log("[MW][Inventory] LogItems"),!!1));rt();j(I.PlacePet,(e,t)=>(t.debug&&console.log("[MW][Pets] PlacePet"),!!1));j(I.FeedPet,(e,t)=>(t.debug&&console.log("[MW][Pets] FeedPet"),!!1));j(I.PetPositions,(e,t)=>(t.debug&&console.log("[MW][Pets] PetPositions"),!!1));j(I.SwapPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SwapPet"),!!1));j(I.StorePet,(e,t)=>(t.debug&&console.log("[MW][Pets] StorePet"),!!1));j(I.NamePet,(e,t)=>(t.debug&&console.log("[MW][Pets] NamePet"),!!1));j(I.SellPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SellPet"),!!1));rt();console.log("[WS] TESTTEST");j(I.SetSelectedGame,(e,t)=>(t.debug&&console.log("[MW][Session] SetSelectedGame"),!!1));j(I.VoteForGame,(e,t)=>(t.debug&&console.log("[MW][Session] VoteForGame"),!!1));j(I.RequestGame,(e,t)=>(t.debug&&console.log("[MW][Session] RequestGame"),!!1));j(I.RestartGame,(e,t)=>(t.debug&&console.log("[MW][Session] RestartGame"),!!1));j(I.Ping,(e,t)=>(t.debug&&console.log("[MW][Session] Ping"),!!1));j(I.PlayerPosition,(e,t)=>(t.debug&&console.log("[MW][Session] PlayerPosition"),!!1));j(I.Teleport,(e,t)=>(t.debug&&console.log("[MW][Session] Teleport"),!!1));j(I.CheckWeatherStatus,(e,t)=>(t.debug&&console.log("[MW][Session] CheckWeatherStatus"),!!1));rt();j(I.Chat,(e,t)=>(t.debug&&console.log("[MW][Social] Chat"),!!1));j(I.Dev,(e,t)=>(t.debug&&console.log("[MW][Social] Dev"),!!1));j(I.Emote,(e,t)=>(t.debug&&console.log("[MW][Social] Emote"),!!1));j(I.Wish,(e,t)=>(t.debug&&console.log("[MW][Social] Wish"),!!1));j(I.KickPlayer,(e,t)=>(t.debug&&console.log("[MW][Social] KickPlayer"),!!1));j(I.ReportSpeakingStart,(e,t)=>(t.debug&&console.log("[MW][Voice] ReportSpeakingStart"),!!1));j(I.SetPlayerData,(e,t)=>(t.debug&&console.log("[MW][Social] SetPlayerData"),!!1));j(I.UsurpHost,(e,t)=>(t.debug&&console.log("[MW][Social] UsurpHost"),!!1));function Yx(e={}){let t=e.pageWindow??A,n=e.pollMs??500,r=!!e.debug,o=[];o.push(cu(t,{debug:r})),o.push(Fd({pageWindow:t,middlewares:e.middlewares,debug:r}));let a=null,i=s=>{if(a){try{a()}catch{}a=null}s&&(a=Ud(s,e.handlers,{debug:r,pageWindow:t}))};return i(Kn(t).ws),o.push(br(s=>i(s.ws),{intervalMs:n,debug:r,pageWindow:t})),{getWs:()=>Kn(t).ws,dispose:()=>{for(let s=o.length-1;s>=0;s--)try{o[s]()}catch{}if(a){try{a()}catch{}a=null}}}}var kr=null;function zd(e={}){return kr||(kr=Yx(e),kr)}hr();Vn();Tt();fr();yr();dt();zt();function Ui(e){e.logStep("WebSocket","Capturing WebSocket...");let t=null;return t=br(n=>{n.ws&&(e.logStep("WebSocket","WebSocket captured","success"),t?.(),t=null)},{intervalMs:250}),zd({debug:!1}),()=>{t?.(),t=null}}async function zi(e){e.logStep("Atoms","Prewarming Jotai store...");try{await aa(),await Ho({timeoutMs:8e3,intervalMs:50}),e.logStep("Atoms","Jotai store ready","success")}catch(t){e.logStep("Atoms","Jotai store not captured yet","error"),console.warn("[Bootstrap] Jotai store wait failed",t)}}function Vi(e){e.logStep("Globals","Initializing global variables...");try{mr(),e.logStep("Globals","Global variables ready","success")}catch(t){e.logStep("Globals","Failed to initialize global variables","error"),console.warn("[Bootstrap] Global variables init failed",t)}}function $i(e){e.logStep("API","Exposing Gemini API...");try{rd(),e.logStep("API","Gemini API ready","success")}catch(t){e.logStep("API","Failed to expose API","error"),console.warn("[Bootstrap] API init failed",t)}}function ji(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0)})}async function Ki(e){e.logStep("HUD","Loading HUD preferences..."),await ji();let t=Fi();await ji();let n=await Wi({hostId:"gemini-hud-root",initialWidth:t.width,initialOpen:t.isOpen,onWidthChange:r=>nn("width",r),onOpenChange:r=>nn("isOpen",r),themes:ct,initialTheme:t.theme,onThemeChange:r=>nn("theme",r),buildSections:r=>Li({applyTheme:r.applyTheme,initialTheme:r.initialTheme,getCurrentTheme:r.getCurrentTheme}),initialTab:t.activeTab,onTabChange:r=>nn("activeTab",r)});return await ji(),e.logStep("HUD","HUD ready","success"),n}async function Ji(e){e.setSubtitle("Activating Gemini modules..."),await au(t=>{t.status==="start"?e.logStep(t.name,`Loading ${t.name}...`):t.status==="success"?e.logStep(t.name,`${t.name} ready`,"success"):e.logStep(t.name,`${t.name} encountered an issue.`,"error")})}async function qi(e){e.logStep("Sprites","Warming up sprite cache...");try{ue.ready()||await ue.init();let t=[],n=le.get("plants");if(n)for(let i of Object.values(n))i?.seed?.spriteId&&t.push(i.seed.spriteId),i?.plant?.spriteId&&t.push(i.plant.spriteId),i?.crop?.spriteId&&t.push(i.crop.spriteId);let r=le.get("pets");if(r)for(let i of Object.values(r))i?.spriteId&&t.push(i.spriteId);let o=[...new Set(t)],a=o.length;if(a===0){e.logStep("Sprites","No sprites to warmup","success");return}await ue.warmup(o,(i,s)=>{e.logStep("Sprites",`Loading sprites (${i}/${s})...`)},5),e.logStep("Sprites",`${a} sprites loaded`,"success")}catch(t){e.logStep("Sprites","Sprite warmup failed","error"),console.warn("[Bootstrap] Sprite warmup failed",t)}}async function Yi(e){e.logStep("Sections","Preloading UI sections...");try{await Ei(),e.logStep("Sections","Sections preloaded","success")}catch(t){e.logStep("Sections","Sections preload failed","error"),console.warn("[Bootstrap] Sections preload failed",t)}}(async function(){"use strict";let e=Mr({title:"Gemini is loading",subtitle:"Connecting and preparing modules..."}),t=null;try{t=Ui(e),await zi(e),Vi(e),$i(e),await Ji(e),await qi(e),await Yi(e),e.succeed("Gemini is ready!")}catch(r){e.fail("Failed to initialize the mod.",r)}finally{t?.()}let n=await Ki(e);Tr({onClick:()=>n.setOpen(!0)})})();})();
