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
"use strict";(()=>{var es=Object.defineProperty;var Yd=(e,t,n)=>t in e?es(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var G=(e,t)=>()=>(e&&(t=e(e=0)),t);var Ot=(e,t)=>{for(var n in t)es(e,n,{get:t[n],enumerable:!0})};var ne=(e,t,n)=>Yd(e,typeof t!="symbol"?t+"":t,n);function rp(){try{let e=window.visualViewport,t=Math.round((e?.width??window.innerWidth)||0),n=Math.round((e?.height??window.innerHeight)||0);if(t&&n)return t>=n?"landscape":"portrait"}catch{}return"unknown"}function us(){let e=navigator.userAgent||"",t=navigator.platform||"",n=navigator.userAgentData;if(n&&typeof n.platform=="string"){let o=n.platform.toLowerCase();if(o.includes("windows"))return"windows";if(o.includes("mac"))return"mac";if(o.includes("android"))return"android";if(o.includes("chrome os")||o.includes("cros"))return"chromeos";if(o.includes("linux"))return"linux";if(o.includes("ios"))return"ios"}return/iPhone|iPad|iPod/i.test(e)||t==="MacIntel"&&(navigator.maxTouchPoints??0)>1?"ios":/Android/i.test(e)?"android":/CrOS/i.test(e)?"chromeos":/Win/i.test(e)?"windows":/Mac/i.test(e)?"mac":/Linux/i.test(e)?"linux":"unknown"}function ds(){let e=navigator.userAgent||"",t=navigator.userAgentData;if(t&&Array.isArray(t.brands)){let n=t.brands.map(i=>String(i.brand||i.brandName||i.brandVersion||i)),r=n.some(i=>/Edge/i.test(i)||/Microsoft Edge/i.test(i)),o=n.some(i=>/Opera/i.test(i)||/OPR/i.test(i)),a=n.some(i=>/Chrome|Chromium/i.test(i));if(r)return"Edge";if(o)return"Opera";if(a)return"Chrome";if(navigator.brave)return"Brave"}return/FxiOS/i.test(e)?"Firefox":/CriOS/i.test(e)?"Chrome":/EdgiOS/i.test(e)?"Edge":/OPiOS|OPR|Opera Mini|Opera/i.test(e)?"Opera":/Edg\//i.test(e)?"Edge":/OPR\//i.test(e)||/Opera/i.test(e)?"Opera":/Firefox/i.test(e)?"Firefox":/Safari/i.test(e)&&!/Chrome|Chromium|Edg|OPR/i.test(e)?"Safari":/Brave/i.test(e)||window.Brave||navigator.brave?"Brave":/Chrome|Chromium/i.test(e)?"Chrome":"Unknown"}function ap(){let e=navigator.userAgent||"",t=navigator.userAgentData;return t&&typeof t.mobile=="boolean"?t.mobile?"mobile":"desktop":/Android|iPhone|iPad|iPod|Mobile/i.test(e)?"mobile":"desktop"}function ip(e){if(!e)return null;try{return new URL(e).hostname}catch{return null}}function Ar(){let e=(()=>{try{return window.top!==window.self}catch{return!0}})(),t=ip(document.referrer),r=e&&!!t&&/(^|\.)discord(app)?\.com$/i.test(t)?"discord":"web",o=ap(),a=us(),i=ds(),s=window.screen||{},c=window.visualViewport,d=Math.round(window.innerWidth||document.documentElement.clientWidth||0),l=Math.round(window.innerHeight||document.documentElement.clientHeight||0),u=Math.round(c?.width??d),p=Math.round(c?.height??l),m=Math.round(s.width||0),g=Math.round(s.height||0),f=Math.round(s.availWidth||m),h=Math.round(s.availHeight||g),b=Number.isFinite(window.devicePixelRatio)?window.devicePixelRatio:1;return{surface:r,host:location.hostname,origin:location.origin,isInIframe:e,platform:o,browser:i,os:a,viewportWidth:d,viewportHeight:l,visualViewportWidth:u,visualViewportHeight:p,screenWidth:m,screenHeight:g,availScreenWidth:f,availScreenHeight:h,dpr:b,orientation:rp()}}function sp(){return Ar().surface==="discord"}function lp(){return Ar().platform==="mobile"}var Le,Gt=G(()=>{"use strict";Le={detect:Ar,isDiscord:sp,isMobile:lp,detectOS:us,detectBrowser:ds}});function Sp(){if(typeof unsafeWindow<"u"&&unsafeWindow)return unsafeWindow;let e=window.wrappedJSObject;return e&&e!==window?e:xp}var xp,wp,A,ye=G(()=>{"use strict";xp=window;wp=Sp(),A=wp});var vs={};Ot(vs,{clamp:()=>De,clamp01:()=>Rr,sleep:()=>Ze,tryDo:()=>Me,waitWithTimeout:()=>bo});async function bo(e,t,n){let r=performance.now();for(;performance.now()-r<t;){let o=await Promise.race([e,Ze(50).then(()=>null)]);if(o!==null)return o}throw new Error(`${n} timeout`)}var Ze,Me,De,Rr,et=G(()=>{"use strict";Ze=e=>new Promise(t=>setTimeout(t,e)),Me=e=>{try{return e()}catch{return}},De=(e,t,n)=>Math.max(t,Math.min(n,e)),Rr=e=>De(e,0,1)});function Vp(e){return!!(e&&typeof e=="object"&&typeof e.start=="function"&&typeof e.destroy=="function"&&e.app&&e.app.stage&&e.app.renderer&&e.systems&&typeof e.systems.values=="function")}function $p(e){try{for(let t of e.systems.values()){let n=t?.system;if(n?.name==="tileObject")return n}}catch{}return null}function Kp(e){se.engine=e,se.tos=$p(e)||null,se.app=e.app||null,se.renderer=e.app?.renderer||null,se.ticker=e.app?.ticker||null,se.stage=e.app?.stage||null;try{Ss(e)}catch{}try{se.app&&ws(se.app)}catch{}try{se.renderer&&Ts(se.renderer)}catch{}}function Or(){return se.engine?!0:(se._bindPatched||(se._bindPatched=!0,Function.prototype.bind=function(e,...t){let n=xs.call(this,e,...t);try{!se.engine&&Vp(e)&&(Function.prototype.bind=xs,se._bindPatched=!1,Kp(e))}catch{}return n}),!1)}async function Jp(e=15e3){let t=performance.now();for(;performance.now()-t<e;){if(se.engine)return!0;Or(),await Ze(50)}throw new Error("MGPixiHooks: engine capture timeout")}async function qp(e=15e3){return se.engine||await Jp(e),!0}function Yp(){return se.engine&&se.app?{ok:!0,engine:se.engine,tos:se.tos,app:se.app}:(Or(),{ok:!1,engine:se.engine,tos:se.tos,app:se.app,note:"Not captured. Wait for room, or reload."})}var xs,se,Ss,ws,Ts,jp,Up,zp,Pe,gn=G(()=>{"use strict";et();ye();xs=Function.prototype.bind,se={_bindPatched:!1,engine:null,tos:null,app:null,renderer:null,ticker:null,stage:null},jp=new Promise(e=>{Ss=e}),Up=new Promise(e=>{ws=e}),zp=new Promise(e=>{Ts=e});Or();Pe={engineReady:jp,appReady:Up,rendererReady:zp,engine:()=>se.engine,tos:()=>se.tos,app:()=>se.app,renderer:()=>se.renderer,ticker:()=>se.ticker,stage:()=>se.stage,PIXI:()=>A.PIXI||null,init:qp,hook:Yp,ready:()=>!!se.engine}});function Cs(){return typeof GM_xmlhttpRequest=="function"}function Ps(e,t="text"){return new Promise((n,r)=>{GM_xmlhttpRequest({method:"GET",url:e,responseType:t,onload:o=>o.status>=200&&o.status<300?n(o):r(new Error(`HTTP ${o.status} for ${e}`)),onerror:()=>r(new Error(`Network error for ${e}`)),ontimeout:()=>r(new Error(`Timeout for ${e}`))})})}async function Nt(e){if(Cs())return JSON.parse((await Ps(e,"text")).responseText);let t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.json()}async function ho(e){if(Cs())return(await Ps(e,"blob")).response;let t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.blob()}function Ms(e){return new Promise((t,n)=>{let r=URL.createObjectURL(e),o=A?.Image||Image,a=new o;a.decoding="async",a.onload=()=>{URL.revokeObjectURL(r),t(a)},a.onerror=()=>{URL.revokeObjectURL(r),n(new Error("Image decode failed"))},a.src=r})}var ks,fn=G(()=>{"use strict";ye();ks=A?.location?.origin||"https://magicgarden.gg"});var Ae,Xp,Gr,_t=G(()=>{"use strict";Ae=(e,t)=>e.replace(/\/?$/,"/")+String(t||"").replace(/^\//,""),Xp=e=>e.lastIndexOf("/")>=0?e.slice(0,e.lastIndexOf("/")+1):"",Gr=(e,t)=>String(t||"").startsWith("/")?String(t).slice(1):Xp(e)+String(t||"")});function Qp(){return A?.document??(typeof document<"u"?document:null)}function Hr(e){if(bn!==null)return;let t=e??Qp();if(!t)return;let n=t.scripts;for(let r=0;r<n.length;r++){let a=n.item(r)?.src;if(!a)continue;let i=a.match(/\/(?:r\/\d+\/)?version\/([^/]+)/);if(i?.[1]){bn=i[1];return}}}function Zp(){return Hr(),bn}async function em(e=15e3){let t=performance.now();for(;performance.now()-t<e;){if(Hr(),bn)return bn;await Ze(50)}throw new Error("MGVersion timeout (gameVersion not found)")}var bn,hn,Nr=G(()=>{"use strict";ye();et();bn=null;hn={init:Hr,get:Zp,wait:em}});async function As(){return vo||yo||(yo=(async()=>{let e=await hn.wait(15e3);return vo=`${ks}/version/${e}/assets/`,vo})(),yo)}async function tm(e){let t=await As();return Ae(t,e)}var yo,vo,Be,Wt=G(()=>{"use strict";fn();_t();Nr();yo=null,vo=null;Be={base:As,url:tm}});function yn(e){let t=String(e||"").trim();return t?t.startsWith("sprite/")||t.startsWith("sprites/")?t:t.includes("/")?`sprite/${t}`:t:""}function Ft(e,t){let n=String(e||"").trim().replace(/^sprites?\//,"").replace(/^\/+|\/+$/g,""),r=String(t||"").trim();return r.includes("/")||!n?yn(r):`sprite/${n}/${r}`}function bt(e,t,n,r){let o=Ft(e,t);if(n.has(o)||r.has(o))return o;let a=String(t||"").trim();if(n.has(a)||r.has(a))return a;let i=yn(a);return n.has(i)||r.has(i)?i:o}function nm(e,t,n=25e3){let r=[e],o=new Set,a=0;for(;r.length&&a++<n;){let i=r.pop();if(!i||o.has(i))continue;if(o.add(i),t(i))return i;let s=i.children;if(Array.isArray(s))for(let c=s.length-1;c>=0;c--)r.push(s[c])}return null}function om(e){let t=A.PIXI;if(t?.Texture&&t?.Sprite&&t?.Container&&t?.Rectangle)return{Container:t.Container,Sprite:t.Sprite,Texture:t.Texture,Rectangle:t.Rectangle,AnimatedSprite:t.AnimatedSprite||null};let n=e?.stage,r=nm(n,o=>o?.texture?.frame&&o?.constructor&&o?.texture?.constructor&&o?.texture?.frame?.constructor);if(!r)throw new Error("No Sprite found yet (constructors).");return{Container:n.constructor,Sprite:r.constructor,Texture:r.texture.constructor,Rectangle:r.texture.frame.constructor,AnimatedSprite:t?.AnimatedSprite||null}}async function Is(e,t=15e3){let{sleep:n}=await Promise.resolve().then(()=>(et(),vs)),r=performance.now();for(;performance.now()-r<t;)try{return om(e)}catch{await n(50)}throw new Error("Constructors timeout")}var ut,xo=G(()=>{"use strict";ye();ut=(...e)=>{try{console.log("[MGSprite]",...e)}catch{}}});async function rm(e){let t=e||await Be.base();if(_r.has(t))return _r.get(t);let n=Nt(Ae(t,"manifest.json"));return _r.set(t,n),n}function am(e,t){return e?.bundles?.find(n=>n?.name===t)||null}function im(e){let t=new Set;for(let n of e?.assets||[])for(let r of n?.src||[])typeof r=="string"&&r.endsWith(".json")&&r!=="manifest.json"&&t.add(r);return Array.from(t)}var _r,Re,vn=G(()=>{"use strict";fn();_t();Wt();_r=new Map;Re={load:rm,getBundle:am,listJsonFromBundle:im}});function sm(e){return e&&typeof e=="object"&&e.frames&&e.meta&&typeof e.meta.image=="string"}function Wr(e,t,n,r,o){return new e(t,n,r,o)}function lm(e,t,n,r,o,a,i){let s;try{s=new e({source:t.source,frame:n,orig:r,trim:o||void 0,rotate:a||0})}catch{s=new e(t.baseTexture||t,n,r,o||void 0,a||0)}if(i)if(s.defaultAnchor?.set)try{s.defaultAnchor.set(i.x,i.y)}catch{}else s.defaultAnchor?(s.defaultAnchor.x=i.x,s.defaultAnchor.y=i.y):s.defaultAnchor={x:i.x,y:i.y};try{s.updateUvs?.()}catch{}return s}function cm(e,t,n,r){let{Texture:o,Rectangle:a}=r;for(let[i,s]of Object.entries(e.frames)){let c=s.frame,d=!!s.rotated,l=d?2:0,u=d?c.h:c.w,p=d?c.w:c.h,m=Wr(a,c.x,c.y,u,p),g=s.sourceSize||{w:c.w,h:c.h},f=Wr(a,0,0,g.w,g.h),h=null;if(s.trimmed&&s.spriteSourceSize){let b=s.spriteSourceSize;h=Wr(a,b.x,b.y,b.w,b.h)}n.set(i,lm(o,t,m,f,h,l,s.anchor||null))}}function um(e,t,n){if(!(!e.animations||typeof e.animations!="object"))for(let[r,o]of Object.entries(e.animations)){if(!Array.isArray(o))continue;let a=o.map(i=>t.get(i)).filter(Boolean);a.length>=2&&n.set(r,a)}}function dm(e,t){let n=(r,o)=>{let a=String(r||"").trim(),i=String(o||"").trim();!a||!i||(t.has(a)||t.set(a,new Set),t.get(a).add(i))};for(let r of Object.keys(e.frames||{})){let o=/^sprite\/([^/]+)\/(.+)$/.exec(r);o&&n(o[1],o[2])}}async function Es(e,t){let n=await Re.load(e),r=Re.getBundle(n,"default");if(!r)throw new Error("No default bundle in manifest");let o=Re.listJsonFromBundle(r),a=new Set,i=new Map,s=new Map,c=new Map;async function d(l){if(a.has(l))return;a.add(l);let u=await Nt(Ae(e,l));if(!sm(u))return;let p=u.meta?.related_multi_packs;if(Array.isArray(p))for(let h of p)await d(Gr(l,h));let m=Gr(l,u.meta.image),g=await Ms(await ho(Ae(e,m))),f=t.Texture.from(g);cm(u,f,i,t),um(u,i,s),dm(u,c)}for(let l of o)await d(l);return{textures:i,animations:s,categoryIndex:c}}var Ls=G(()=>{"use strict";fn();_t();vn()});function Rs(){return{lru:new Map,cost:0,srcCanvas:new Map}}function Fr(e,t){return`${t.sig}::${e}`}function Os(e){return e?e.isAnim?e.frames?.length||0:e.tex?1:0:0}function pm(e,t,n){e.lru.delete(t),e.lru.set(t,n)}function mm(e,t){if(t.enabled)for(;e.lru.size>t.maxEntries||e.cost>t.maxCost;){let n=e.lru.keys().next().value;if(n===void 0)break;let r=e.lru.get(n);e.lru.delete(n),e.cost=Math.max(0,e.cost-Os(r??null))}}function Br(e,t){let n=e.lru.get(t);return n?(pm(e,t,n),n):null}function jr(e,t,n,r){e.lru.set(t,n),e.cost+=Os(n),mm(e,r)}function Gs(e){e.lru.clear(),e.cost=0,e.srcCanvas.clear()}function Hs(e,t){return e.srcCanvas.get(t)??null}function Ns(e,t,n,r){if(e.srcCanvas.set(t,n),e.srcCanvas.size>r.srcCanvasMax){let o=e.srcCanvas.keys().next().value;o!==void 0&&e.srcCanvas.delete(o)}}var Ds,xn=G(()=>{"use strict";Ds={enabled:!0,maxEntries:1200,maxCost:5e3,srcCanvasMax:450}});function So(e){return[...new Set(e.filter(Boolean))].sort((n,r)=>(_s.get(n)??1/0)-(_s.get(r)??1/0))}function Ur(e){if(!e.length)return{muts:[],overlayMuts:[],selectedMuts:[],sig:""};let t=So(e),n=bm(e),r=hm(e);return{muts:n,overlayMuts:r,selectedMuts:t,sig:`${t.join(",")}|${n.join(",")}|${r.join(",")}`}}function bm(e){let t=e.filter((o,a,i)=>ht[o]&&i.indexOf(o)===a);if(!t.length)return[];if(t.includes("Gold"))return["Gold"];if(t.includes("Rainbow"))return["Rainbow"];let n=["Ambershine","Dawnlit","Dawncharged","Ambercharged"];return t.some(o=>n.includes(o))?So(t.filter(o=>!fm.includes(o))):So(t)}function hm(e){let t=e.filter((n,r,o)=>ht[n]?.overlayTall&&o.indexOf(n)===r);return So(t)}function wo(e,t){return e.map(n=>({name:n,meta:ht[n],overlayTall:ht[n]?.overlayTall??null,isTall:t}))}var ht,Ws,gm,_s,fm,Fs,Bs,js,Us,zs,Vs,Bt=G(()=>{"use strict";ht={Gold:{overlayTall:null,tallIconOverride:null},Rainbow:{overlayTall:null,tallIconOverride:null,angle:130,angleTall:0},Wet:{overlayTall:"sprite/mutation-overlay/WetTallPlant",tallIconOverride:"sprite/mutation/Puddle"},Chilled:{overlayTall:"sprite/mutation-overlay/ChilledTallPlant",tallIconOverride:null},Frozen:{overlayTall:"sprite/mutation-overlay/FrozenTallPlant",tallIconOverride:null},Dawnlit:{overlayTall:null,tallIconOverride:null},Ambershine:{overlayTall:null,tallIconOverride:null},Dawncharged:{overlayTall:null,tallIconOverride:null},Ambercharged:{overlayTall:null,tallIconOverride:null}},Ws=Object.keys(ht),gm=["Gold","Rainbow","Wet","Chilled","Frozen","Ambershine","Dawnlit","Dawncharged","Ambercharged"],_s=new Map(gm.map((e,t)=>[e,t]));fm=["Wet","Chilled","Frozen"],Fs=new Set(["Dawnlit","Ambershine","Dawncharged","Ambercharged"]),Bs={Banana:.6,Carrot:.6,Sunflower:.5,Starweaver:.5,FavaBean:.25,BurrosTail:.2},js={Pepper:.5,Banana:.6},Us=256,zs=.5,Vs=2});function vm(e){return To.has(e)?e:To.has("overlay")?"overlay":To.has("screen")?"screen":To.has("lighter")?"lighter":"source-atop"}function xm(e,t,n,r,o=!1){let a=(r-90)*Math.PI/180,i=t/2,s=n/2;if(!o){let u=Math.min(t,n)/2;return e.createLinearGradient(i-Math.cos(a)*u,s-Math.sin(a)*u,i+Math.cos(a)*u,s+Math.sin(a)*u)}let c=Math.cos(a),d=Math.sin(a),l=Math.abs(c)*t/2+Math.abs(d)*n/2;return e.createLinearGradient(i-c*l,s-d*l,i+c*l,s+d*l)}function $s(e,t,n,r,o=!1){let a=r.colors?.length?r.colors:["#fff"],i=r.ang!=null?xm(e,t,n,r.ang,o):e.createLinearGradient(0,0,0,n);a.length===1?(i.addColorStop(0,a[0]),i.addColorStop(1,a[0])):a.forEach((s,c)=>i.addColorStop(c/(a.length-1),s)),e.fillStyle=i,e.fillRect(0,0,t,n)}function Ks(e,t,n,r){let o=ym[n];if(!o)return;let a={...o};n==="Rainbow"&&r&&a.angTall!=null&&(a.ang=a.angTall);let i=n==="Rainbow"&&r,s=t.width,c=t.height;e.save();let d=a.masked?vm(a.op):"source-in";if(e.globalCompositeOperation=d,a.a!=null&&(e.globalAlpha=a.a),a.masked){let l=document.createElement("canvas");l.width=s,l.height=c;let u=l.getContext("2d");u.imageSmoothingEnabled=!1,$s(u,s,c,a,i),u.globalCompositeOperation="destination-in",u.drawImage(t,0,0),e.drawImage(l,0,0)}else $s(e,s,c,a,i);e.restore()}var ym,To,Js=G(()=>{"use strict";ym={Gold:{op:"source-atop",colors:["rgb(235,200,0)"],a:.7},Rainbow:{op:"color",colors:["#FF1744","#FF9100","#FFEA00","#00E676","#2979FF","#D500F9"],ang:130,angTall:0,masked:!0},Wet:{op:"source-atop",colors:["rgb(50,180,200)"],a:.25},Chilled:{op:"source-atop",colors:["rgb(100,160,210)"],a:.45},Frozen:{op:"source-atop",colors:["rgb(100,130,220)"],a:.5},Dawnlit:{op:"source-atop",colors:["rgb(209,70,231)"],a:.5},Ambershine:{op:"source-atop",colors:["rgb(190,100,40)"],a:.5},Dawncharged:{op:"source-atop",colors:["rgb(140,80,200)"],a:.5},Ambercharged:{op:"source-atop",colors:["rgb(170,60,25)"],a:.5}},To=(()=>{try{let t=document.createElement("canvas").getContext("2d");if(!t)return new Set;let n=["color","hue","saturation","luminosity","overlay","screen","lighter","source-atop"],r=new Set;for(let o of n)t.globalCompositeOperation=o,t.globalCompositeOperation===o&&r.add(o);return r}catch{return new Set}})()});function qs(e){return/tallplant/i.test(e)}function ko(e){let t=String(e||"").split("/");return t[t.length-1]||""}function Ys(e){switch(e){case"Ambershine":return["Ambershine","Amberlit"];case"Dawncharged":return["Dawncharged","Dawnbound"];case"Ambercharged":return["Ambercharged","Amberbound"];default:return[e]}}function Sm(e,t){let n=String(e||"").toLowerCase();for(let r of t.keys()){let o=/sprite\/mutation-overlay\/([A-Za-z0-9]+)TallPlant/i.exec(String(r));if(!o||!o[1])continue;if(o[1].toLowerCase()===n){let i=t.get(r);if(i)return{tex:i,key:r}}}return null}function Xs(e,t,n,r){if(!t)return null;let o=ko(e),a=Ys(t);for(let i of a){let s=[`sprite/mutation/${i}${o}`,`sprite/mutation/${i}-${o}`,`sprite/mutation/${i}_${o}`,`sprite/mutation/${i}/${o}`,`sprite/mutation/${i}`];for(let c of s){let d=n.get(c);if(d)return{tex:d,key:c}}if(r){let c=`sprite/mutation-overlay/${i}TallPlant`,d=n.get(c);if(d)return{tex:d,key:c};let l=`sprite/mutation-overlay/${i}`,u=n.get(l);if(u)return{tex:u,key:l};let p=Sm(t,n);if(p)return p}}return null}function Qs(e,t,n,r){if(!t)return null;let o=ht[t];if(n&&o?.tallIconOverride){let s=r.get(o.tallIconOverride);if(s)return s}let a=ko(e),i=Ys(t);for(let s of i){let c=[`sprite/mutation/${s}Icon`,`sprite/mutation/${s}`,`sprite/mutation/${s}${a}`,`sprite/mutation/${s}-${a}`,`sprite/mutation/${s}_${a}`,`sprite/mutation/${s}/${a}`];for(let d of c){let l=r.get(d);if(l)return l}if(n){let d=`sprite/mutation-overlay/${s}TallPlantIcon`,l=r.get(d);if(l)return l;let u=`sprite/mutation-overlay/${s}TallPlant`,p=r.get(u);if(p)return p}}return null}function Zs(e,t,n){let r=e?.orig?.width??e?.frame?.width??e?.width??1,o=e?.orig?.height??e?.frame?.height??e?.height??1,a=e?.defaultAnchor?.x??0,i=e?.defaultAnchor?.y??0,s=js[t]??a,c=o>r*1.5,d=Bs[t]??(c?i:.4),l={x:(s-a)*r,y:(d-i)*o},u=Math.min(r,o),p=Math.min(1.5,u/Us),m=zs*p;return n&&(m*=Vs),{width:r,height:o,anchorX:a,anchorY:i,offset:l,iconScale:m}}var el=G(()=>{"use strict";Bt()});function zr(e,t,n,r,o){let a=Hs(r,e);if(a)return a;let i=null;try{if(t?.extract?.canvas){let s=new n.Sprite(e);i=t.extract.canvas(s),s.destroy?.({children:!0,texture:!1,baseTexture:!1})}}catch{}if(!i){let s=e?.frame||e?._frame,c=e?.orig||e?._orig,d=e?.trim||e?._trim,l=e?.rotate||e?._rotate||0,u=e?.baseTexture?.resource?.source||e?.baseTexture?.resource||e?.source?.resource?.source||e?.source?.resource||e?._source?.resource?.source||null;if(!s||!u)throw new Error("textureToCanvas fail");i=document.createElement("canvas");let p=Math.max(1,(c?.width??s.width)|0),m=Math.max(1,(c?.height??s.height)|0),g=d?.x??0,f=d?.y??0;i.width=p,i.height=m;let h=i.getContext("2d");h.imageSmoothingEnabled=!1,l===!0||l===2||l===8?(h.save(),h.translate(g+s.height/2,f+s.width/2),h.rotate(-Math.PI/2),h.drawImage(u,s.x,s.y,s.width,s.height,-s.width/2,-s.height/2,s.width,s.height),h.restore()):h.drawImage(u,s.x,s.y,s.width,s.height,g,f,s.width,s.height)}return Ns(r,e,i,o),i}function wm(e,t,n,r,o,a,i,s){let{w:c,h:d,aX:l,aY:u,basePos:p}=t,m=[];for(let g of n){let f=new r.Sprite(e);f.anchor?.set?.(l,u),f.position.set(p.x,p.y),f.zIndex=1;let h=document.createElement("canvas");h.width=c,h.height=d;let b=h.getContext("2d");b.imageSmoothingEnabled=!1,b.save(),b.translate(c*l,d*u),b.drawImage(zr(e,o,r,a,i),-c*l,-d*u),b.restore(),Ks(b,h,g.name,g.isTall);let k=r.Texture.from(h);s.push(k),f.texture=k,m.push(f)}return m}function Tm(e,t,n,r,o,a,i,s,c,d){let{aX:l,basePos:u}=t,p=[];for(let m of n){let g=m.overlayTall&&r.get(m.overlayTall)&&{tex:r.get(m.overlayTall),key:m.overlayTall}||Xs(e,m.name,r,!0);if(!g?.tex)continue;let f=zr(g.tex,a,o,i,s);if(!f)continue;let h=f.width,b={x:0,y:0},k={x:u.x-l*h,y:0},S=document.createElement("canvas");S.width=h,S.height=f.height;let x=S.getContext("2d");if(!x)continue;x.imageSmoothingEnabled=!1,x.drawImage(f,0,0),x.globalCompositeOperation="destination-in",x.drawImage(c,-k.x,-k.y);let T=o.Texture.from(S);d.push(T);let y=new o.Sprite(T);y.anchor?.set?.(b.x,b.y),y.position.set(k.x,k.y),y.scale.set(1),y.alpha=1,y.zIndex=3,p.push(y)}return p}function km(e,t,n,r,o,a){let{basePos:i}=t,s=[];for(let c of n){if(c.name==="Gold"||c.name==="Rainbow")continue;let d=Qs(e,c.name,c.isTall,r);if(!d)continue;let l=new o.Sprite(d),u=d?.defaultAnchor?.x??.5,p=d?.defaultAnchor?.y??.5;l.anchor?.set?.(u,p),l.position.set(i.x+a.offset.x,i.y+a.offset.y),l.scale.set(a.iconScale),c.isTall&&(l.zIndex=-1),Fs.has(c.name)&&(l.zIndex=10),l.zIndex||(l.zIndex=2),s.push(l)}return s}function Vr(e,t,n,r){try{if(!e||!r.renderer||!r.ctors?.Container||!r.ctors?.Sprite||!r.ctors?.Texture)return null;let{Container:o,Sprite:a,Texture:i}=r.ctors,s=e?.orig?.width??e?.frame?.width??e?.width??1,c=e?.orig?.height??e?.frame?.height??e?.height??1,d=e?.defaultAnchor?.x??.5,l=e?.defaultAnchor?.y??.5,u={x:s*d,y:c*l},p=zr(e,r.renderer,r.ctors,r.cacheState,r.cacheConfig),m=new o;m.sortableChildren=!0;let g=new a(e);g.anchor?.set?.(d,l),g.position.set(u.x,u.y),g.zIndex=0,m.addChild(g);let f=qs(t),h=wo(n.muts,f),b=wo(n.overlayMuts,f),k=wo(n.selectedMuts,f),S=[],x={w:s,h:c,aX:d,aY:l,basePos:u},T=ko(t),y=Zs(e,T,f);wm(e,x,h,r.ctors,r.renderer,r.cacheState,r.cacheConfig,S).forEach(z=>m.addChild(z)),f&&Tm(t,x,b,r.textures,r.ctors,r.renderer,r.cacheState,r.cacheConfig,p,S).forEach(Z=>m.addChild(Z)),km(t,x,k,r.textures,r.ctors,y).forEach(z=>m.addChild(z));let P=r.renderer.resolution??window.devicePixelRatio??1,{Rectangle:L}=r.ctors,R=L?new L(0,0,s,c):void 0,_=null;if(typeof r.renderer.generateTexture=="function"?_=r.renderer.generateTexture(m,{resolution:P,region:R}):r.renderer.textureGenerator?.generateTexture&&(_=r.renderer.textureGenerator.generateTexture({target:m,resolution:P,region:R})),!_)throw new Error("no render texture");let X=_ instanceof i?_:i.from(r.renderer.extract.canvas(_));_&&_!==X&&_.destroy?.(!0),m.destroy({children:!0,texture:!1,baseTexture:!1});try{X.__mg_gen=!0,X.label=`${t}|${n.sig}`}catch{}return X}catch{return null}}function tl(e,t,n,r){if(!e||e.length<2)return null;let o=[];for(let a of e){let i=Vr(a,t,n,r);i&&o.push(i)}return o.length>=2?o:null}var nl=G(()=>{"use strict";Bt();Js();el();Bt();xn()});function rl(){return{cache:new Map,maxEntries:Kr.maxEntries}}function $r(e,t){let n=t.scale??1,r=t.frameIndex??0,o=t.mutations?.slice().sort().join(",")||"",a=t.anchorX??.5,i=t.anchorY??.5,s=t.pad??2;return`${e}|s${n}|f${r}|m${o}|ax${a}|ay${i}|p${s}`}function Cm(e,t){let n=e.cache.get(t);return n?(n.lastAccess=performance.now(),n.canvas):null}function Pm(e,t,n,r){if(t.enabled){if(e.cache.size>=t.maxEntries){let o=null,a=1/0;for(let[i,s]of e.cache)s.lastAccess<a&&(a=s.lastAccess,o=i);o&&e.cache.delete(o)}e.cache.set(n,{canvas:r,lastAccess:performance.now()})}}function ol(e){let t=document.createElement("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");return n&&n.drawImage(e,0,0),t}function al(e){e.cache.clear()}function il(e){return{size:e.cache.size,maxEntries:e.maxEntries}}function Mm(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0)})}async function sl(e,t,n,r,o,a,i,s=5,c=0){if(!t.ready||!a.enabled)return 0;let d=e.length,l=0;i?.(0,d);for(let u=0;u<d;u+=s){let p=e.slice(u,u+s);for(let m of p)try{let g=bt(null,m,t.textures,t.animations),f=$r(g,{scale:1});o.cache.has(f)||Co(t,n,r,null,m,{scale:1},o,a),l++}catch{l++}i?.(l,d),u+s<d&&await Mm()}return l}function Am(e){if(e.overlay)return e.overlay;let t=new e.ctors.Container;t.sortableChildren=!0,t.zIndex=99999999;try{e.app.stage.sortableChildren=!0}catch{}return e.app.stage.addChild(t),e.overlay=t,t}function Im(e){let t=e.defaultParent;if(!t)return null;try{return typeof t=="function"?t():t}catch{return null}}function ll(e,t,n,r,o,a){if(!n.length)return t;let i=Ur(n);if(!i.sig)return t;let s=Fr(e,i),c=Br(o,s);if(c?.tex)return c.tex;let d=Vr(t,e,i,{renderer:r.renderer,ctors:r.ctors,textures:r.textures,cacheState:o,cacheConfig:a});return d?(jr(o,s,{isAnim:!1,tex:d},a),d):t}function cl(e,t,n,r,o,a){if(!n.length)return t;let i=Ur(n);if(!i.sig)return t;let s=Fr(e,i),c=Br(o,s);if(c?.isAnim&&c.frames?.length)return c.frames;let d=tl(t,e,i,{renderer:r.renderer,ctors:r.ctors,textures:r.textures,cacheState:o,cacheConfig:a});return d?(jr(o,s,{isAnim:!0,frames:d},a),d):t}function Jr(e,t,n,r,o,a={}){if(!e.ready)throw new Error("MGSprite not ready yet");let i=bt(r,o,e.textures,e.animations),s=a.mutations||[],c=a.parent||Im(e)||Am(e),d=e.renderer?.width||e.renderer?.view?.width||innerWidth,l=e.renderer?.height||e.renderer?.view?.height||innerHeight,u=a.center?d/2:a.x??d/2,p=a.center?l/2:a.y??l/2,m,g=e.animations.get(i);if(g&&g.length>=2){let b=cl(i,g,s,e,t,n),k=e.ctors.AnimatedSprite;if(k)m=new k(b),m.animationSpeed=a.fps?a.fps/60:a.speed??.15,m.loop=a.loop??!0,m.play();else{let S=new e.ctors.Sprite(b[0]),T=1e3/Math.max(1,a.fps||8),y=0,C=0,M=P=>{let L=e.app.ticker?.deltaMS??P*16.666666666666668;if(y+=L,y<T)return;let R=y/T|0;y%=T,C=(C+R)%b.length,S.texture=b[C]};S.__mgTick=M,e.app.ticker?.add?.(M),m=S}}else{let b=e.textures.get(i);if(!b)throw new Error(`Unknown sprite/anim key: ${i}`);let k=ll(i,b,s,e,t,n);m=new e.ctors.Sprite(k)}let f=a.anchorX??m.texture?.defaultAnchor?.x??.5,h=a.anchorY??m.texture?.defaultAnchor?.y??.5;return m.anchor?.set?.(f,h),m.position.set(u,p),m.scale.set(a.scale??1),m.alpha=a.alpha??1,m.rotation=a.rotation??0,m.zIndex=a.zIndex??999999,c.addChild(m),e.live.add(m),m.__mgDestroy=()=>{try{m.__mgTick&&e.app.ticker?.remove?.(m.__mgTick)}catch{}try{m.destroy?.({children:!0,texture:!1,baseTexture:!1})}catch{try{m.destroy?.()}catch{}}e.live.delete(m)},m}function Em(e,t){let n=e.renderer;if(n?.extract?.canvas)return n.extract.canvas(t);if(n?.plugins?.extract?.canvas)return n.plugins.extract.canvas(t);throw new Error("No extract.canvas available on renderer")}function Co(e,t,n,r,o,a={},i,s){if(!e.ready)throw new Error("MGSprite not ready yet");let c=bt(r,o,e.textures,e.animations);if(i&&s?.enabled){let x=$r(c,a),T=Cm(i,x);if(T)return ol(T)}let d=a.mutations||[],l=e.animations.get(c),u=Math.max(0,(a.frameIndex??0)|0),p;if(l?.length){let x=cl(c,l,d,e,t,n);p=x[u%x.length]}else{let x=e.textures.get(c);if(!x)throw new Error(`Unknown sprite/anim key: ${c}`);p=ll(c,x,d,e,t,n)}let m=new e.ctors.Sprite(p),g=a.anchorX??m.texture?.defaultAnchor?.x??.5,f=a.anchorY??m.texture?.defaultAnchor?.y??.5;m.anchor?.set?.(g,f),m.scale.set(a.scale??1);let h=a.pad??2,b=new e.ctors.Container;b.addChild(m);try{b.updateTransform?.()}catch{}let k=m.getBounds?.(!0)||{x:0,y:0,width:m.width,height:m.height};m.position.set(-k.x+h,-k.y+h);let S=Em(e,b);try{b.destroy?.({children:!0})}catch{}if(i&&s?.enabled){let x=$r(c,a);return Pm(i,s,x,S),ol(S)}return S}function ul(e){for(let t of Array.from(e.live))t.__mgDestroy?.()}function dl(e,t){return e.defaultParent=t,!0}function pl(e,t){return e.defaultParent=t,!0}var Kr,qr=G(()=>{"use strict";xo();Bt();nl();xn();Kr={enabled:!0,maxEntries:500}});function Lm(){return{ready:!1,app:null,renderer:null,ctors:null,baseUrl:null,textures:new Map,animations:new Map,live:new Set,defaultParent:null,overlay:null,categoryIndex:null}}function we(){return Se}function yt(){return Dm}function jt(){return Rm}function Ut(){return Om}function Mo(){return Gm}function Yr(){return Se.ready}async function ml(){return Se.ready?!0:Po||(Po=(async()=>{let e=performance.now();ut("init start");let t=await bo(Pe.appReady,15e3,"PIXI app");ut("app ready");let n=await bo(Pe.rendererReady,15e3,"PIXI renderer");ut("renderer ready"),Se.app=t,Se.renderer=n||t?.renderer||null,Se.ctors=await Is(t),ut("constructors resolved"),Se.baseUrl=await Be.base(),ut("base url",Se.baseUrl);let{textures:r,animations:o,categoryIndex:a}=await Es(Se.baseUrl,Se.ctors);return Se.textures=r,Se.animations=o,Se.categoryIndex=a,ut("atlases loaded","textures",Se.textures.size,"animations",Se.animations.size,"categories",Se.categoryIndex?.size??0),Se.ready=!0,ut("ready in",Math.round(performance.now()-e),"ms"),!0})(),Po)}var Po,Se,Dm,Rm,Om,Gm,gl=G(()=>{"use strict";et();gn();Wt();xo();Ls();xn();qr();Po=null,Se=Lm(),Dm=Rs(),Rm={...Ds},Om=rl(),Gm={...Kr}});function vt(){if(!Yr())throw new Error("MGSprite not ready yet")}function Hm(e,t,n){return typeof t=="string"?Jr(we(),yt(),jt(),e,t,n||{}):Jr(we(),yt(),jt(),null,e,t||{})}function Nm(e,t,n){return typeof t=="string"?Co(we(),yt(),jt(),e,t,n||{},Ut(),Mo()):Co(we(),yt(),jt(),null,e,t||{},Ut(),Mo())}function _m(){ul(we())}function Wm(e){return dl(we(),e)}function Fm(e){return pl(we(),e)}function Bm(e,t){let n=we(),r=typeof t=="string"?bt(e,t,n.textures,n.animations):bt(null,e,n.textures,n.animations);return n.textures.has(r)||n.animations.has(r)}function jm(){vt();let e=we().categoryIndex;return e?Array.from(e.keys()).sort((t,n)=>t.localeCompare(n)):[]}function Um(e){vt();let t=String(e||"").trim();if(!t)return[];let n=we().categoryIndex;return n?Array.from(n.get(t)?.values()||[]):[]}function zm(e,t){vt();let n=String(e||"").trim(),r=String(t||"").trim();if(!n||!r)return!1;let o=we().categoryIndex;if(!o)return!1;let a=n.toLowerCase(),i=r.toLowerCase();for(let[s,c]of o.entries())if(s.toLowerCase()===a){for(let d of c.values())if(d.toLowerCase()===i)return!0}return!1}function Vm(e){vt();let t=we().categoryIndex;if(!t)return[];let n=String(e||"").trim().toLowerCase(),r=[];for(let[o,a]of t.entries())for(let i of a.values()){let s=Ft(o,i);(!n||s.toLowerCase().startsWith(n))&&r.push(s)}return r.sort((o,a)=>o.localeCompare(a))}function $m(e){vt();let t=String(e||"").trim();if(!t)return null;let n=yn(t),r=/^sprite\/([^/]+)\/(.+)$/.exec(n);if(!r)return null;let o=r[1],a=r[2],i=we().categoryIndex,s=o.toLowerCase(),c=a.toLowerCase(),d=o,l=a;if(i){let u=Array.from(i.keys()).find(g=>g.toLowerCase()===s);if(!u)return null;d=u;let p=i.get(u);if(!p)return null;let m=Array.from(p.values()).find(g=>g.toLowerCase()===c);if(!m)return null;l=m}return{category:d,id:l,key:Ft(d,l)}}function Km(e,t){vt();let n=String(e||"").trim(),r=String(t||"").trim();if(!n||!r)throw new Error("getIdPath(category, id) requires both category and id");let o=we().categoryIndex;if(!o)throw new Error("Sprite categories not indexed");let a=n.toLowerCase(),i=r.toLowerCase(),s=Array.from(o.keys()).find(l=>l.toLowerCase()===a)||n,c=o.get(s);if(!c)throw new Error(`Unknown sprite category: ${n}`);let d=Array.from(c.values()).find(l=>l.toLowerCase()===i)||r;if(!c.has(d))throw new Error(`Unknown sprite id: ${n}/${r}`);return Ft(s,d)}function Jm(){Gs(yt())}function qm(){al(Ut())}function Ym(){return il(Ut())}function Xm(){return[...Ws]}async function Qm(e,t,n=10,r=0){return vt(),sl(e,we(),yt(),jt(),Ut(),Mo(),t,n,r)}var ue,zt=G(()=>{"use strict";gl();xo();qr();xn();Bt();ue={init:ml,ready:Yr,show:Hm,toCanvas:Nm,clear:_m,attach:Wm,attachProvider:Fm,has:Bm,key:(e,t)=>Ft(e,t),getCategories:jm,getCategoryId:Um,hasId:zm,listIds:Vm,getIdInfo:$m,getIdPath:Km,clearMutationCache:Jm,clearToCanvasCache:qm,getToCanvasCacheStats:Ym,getMutationNames:Xm,warmup:Qm}});function wt(e,t){Y.data[e]==null&&(Y.data[e]=t,og()&&vl())}function og(){return Object.values(Y.data).every(e=>e!=null)}function hl(e,t){if(!e||typeof e!="object"||bl.has(e))return;bl.add(e);let n;try{n=Zr(e)}catch{return}if(!n||n.length===0)return;let r=e,o;if(!Y.data.items&&St(n,xt.items)&&(o=r.WateringCan,o&&typeof o=="object"&&"coinPrice"in o&&"creditPrice"in o&&wt("items",r)),!Y.data.decor&&St(n,xt.decor)&&(o=r.SmallRock,o&&typeof o=="object"&&"coinPrice"in o&&"creditPrice"in o&&wt("decor",r)),!Y.data.mutations&&St(n,xt.mutations)&&(o=r.Gold,o&&typeof o=="object"&&"baseChance"in o&&"coinMultiplier"in o&&wt("mutations",r)),!Y.data.eggs&&St(n,xt.eggs)&&(o=r.CommonEgg,o&&typeof o=="object"&&"faunaSpawnWeights"in o&&"secondsToHatch"in o&&wt("eggs",r)),!Y.data.pets&&St(n,xt.pets)&&(o=r.Worm,o&&typeof o=="object"&&"coinsToFullyReplenishHunger"in o&&"diet"in o&&Array.isArray(o.diet)&&wt("pets",r)),!Y.data.abilities&&St(n,xt.abilities)&&(o=r.ProduceScaleBoost,o&&typeof o=="object"&&"trigger"in o&&"baseParameters"in o&&wt("abilities",r)),!Y.data.plants&&St(n,xt.plants)&&(o=r.Carrot,o&&typeof o=="object"&&"seed"in o&&"plant"in o&&"crop"in o&&wt("plants",r)),!(t>=eg))for(let a of n){let i;try{i=r[a]}catch{continue}i&&typeof i=="object"&&hl(i,t+1)}}function Xr(e){try{hl(e,0)}catch{}}function yl(){if(!Y.isHookInstalled){Y.isHookInstalled=!0;try{tt.keys=function(t){return Xr(t),Zr.apply(this,arguments)},Ao&&(tt.values=function(t){return Xr(t),Ao.apply(this,arguments)}),Io&&(tt.entries=function(t){return Xr(t),Io.apply(this,arguments)})}catch{}}}function vl(){if(Y.isHookInstalled){try{tt.keys=Zr,Ao&&(tt.values=Ao),Io&&(tt.entries=Io)}catch{}Y.isHookInstalled=!1}}function rg(){try{for(let e of Qr.document?.scripts||[]){let t=e?.src?String(e.src):"";if(fl.test(t))return t}}catch{}try{for(let e of Qr.performance?.getEntriesByType?.("resource")||[]){let t=e?.name?String(e.name):"";if(fl.test(t))return t}}catch{}return null}function ag(e,t){let n=Math.max(e.lastIndexOf("const ",t),e.lastIndexOf("let ",t),e.lastIndexOf("var ",t));if(n<0)return null;let r=e.indexOf("=",n);if(r<0||r>t)return null;let o=e.indexOf("{",r);if(o<0||o>t)return null;let a=0,i="",s=!1;for(let c=o;c<e.length;c++){let d=e[c];if(i){if(s){s=!1;continue}if(d==="\\"){s=!0;continue}d===i&&(i="");continue}if(d==='"'||d==="'"){i=d;continue}if(d==="{")a++;else if(d==="}"&&--a===0)return e.slice(o,c+1)}return null}function ig(e){let t={},n=!1;for(let r of Zm){let o=e?.[r];if(!o||typeof o!="object")continue;let a=o.iconSpriteKey||null,{iconSpriteKey:i,...s}=o;t[r]={weatherId:r,spriteId:a,...s},n=!0}return t.Sunny||(t.Sunny={weatherId:"Sunny",name:"Sunny",spriteId:"sprite/ui/SunnyIcon",type:"primary"}),!n||t.Rain&&t.Rain.mutator?.mutation!=="Wet"?null:t}async function sg(){if(Y.data.weather)return!0;let e=rg();if(!e)return!1;let t="";try{let s=await fetch(e,{credentials:"include"});if(!s.ok)return!1;t=await s.text()}catch{return!1}let n=t.indexOf("fixedTimeSlots:[0,48,96,144,192,240]");if(n<0&&(n=t.indexOf('name:"Amber Moon"')),n<0)return!1;let r=ag(t,n);if(!r)return!1;let o=r.replace(/\b[A-Za-z_$][\w$]*\.(Rain|Frost|Dawn|AmberMoon)\b/g,'"$1"'),a;try{a=Function('"use strict";return('+o+")")()}catch{return!1}let i=ig(a);return i?(Y.data.weather=i,!0):!1}function lg(){if(Y.weatherPollingTimer)return;Y.weatherPollAttempts=0;let e=setInterval(async()=>{(await sg()||++Y.weatherPollAttempts>tg)&&(clearInterval(e),Y.weatherPollingTimer=null)},ng);Y.weatherPollingTimer=e}function cg(e){return String(e||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^A-Za-z0-9]/g,"").trim()}function ug(e,t=[]){let n=new Set,r=o=>{let a=String(o||"").trim();a&&n.add(a)};r(e);for(let o of t)r(o);for(let o of Array.from(n.values()))o.endsWith("s")?r(o.slice(0,-1)):r(`${o}s`),o.endsWith("es")&&r(o.slice(0,-2));return Array.from(n.values()).filter(Boolean)}function xl(e,t,n,r=[],o=[]){let a=ug(e,r);if(!a.length)return null;let i=[t,...o].filter(l=>typeof l=="string"),s=l=>{let u=String(l||"").trim();if(!u)return null;for(let p of a)try{if(ue.has(p,u))return ue.getIdPath(p,u)}catch{}return null};for(let l of i){let u=s(l);if(u)return u}let c=cg(n||""),d=s(c||n||"");if(d)return d;try{for(let l of a){let u=ue.listIds(`sprite/${l}/`),p=i.map(g=>String(g||"").toLowerCase()),m=String(n||c||"").toLowerCase();for(let g of u){let h=(g.split("/").pop()||"").toLowerCase();if(p.some(b=>b&&b===h)||h===m)return g}for(let g of u){let h=(g.split("/").pop()||"").toLowerCase();if(p.some(b=>b&&h.includes(b))||m&&h.includes(m))return g}}}catch{}return null}function _e(e,t,n,r,o=[],a=[]){if(!e||typeof e!="object")return;let i=e.tileRef;if(!i||typeof i!="object")return;let s=String(i.spritesheet||t||"").trim(),c=xl(s,n,r,o,a);if(c)try{e.spriteId=c}catch{}let d=e.rotationVariants;if(d&&typeof d=="object")for(let l of Object.values(d))_e(l,s,n,r);if(e.immatureTileRef){let l={tileRef:e.immatureTileRef};_e(l,s,n,r),l.spriteId&&(e.immatureSpriteId=l.spriteId)}if(e.topmostLayerTileRef){let l={tileRef:e.topmostLayerTileRef};_e(l,s,n,r),l.spriteId&&(e.topmostLayerSpriteId=l.spriteId)}e.activeState&&typeof e.activeState=="object"&&_e(e.activeState,s,n,e.activeState?.name||r)}function dg(e,t,n,r=[]){if(!Array.isArray(t)||t.length===0)return null;let o=t[0],a=t.slice(1);return xl(e,o,n??null,r,a)}function pg(e){for(let[t,n]of Object.entries(e.items||{}))_e(n,"items",t,n?.name,["item"]);for(let[t,n]of Object.entries(e.decor||{}))_e(n,"decor",t,n?.name);for(let[t,n]of Object.entries(e.mutations||{})){_e(n,"mutations",t,n?.name,["mutation"]);let r=dg("mutation-overlay",[`${t}TallPlant`,`${t}TallPlantIcon`,t],n?.name,["mutation-overlay"]);if(r)try{n.overlaySpriteId=r}catch{}}for(let[t,n]of Object.entries(e.eggs||{}))_e(n,"pets",t,n?.name,["pet"]);for(let[t,n]of Object.entries(e.pets||{}))_e(n,"pets",t,n?.name,["pet"]);for(let[t,n]of Object.entries(e.plants||{})){let r=n;r.seed&&_e(r.seed,r.seed?.tileRef?.spritesheet||"seeds",`${t}Seed`,r.seed?.name||`${t} Seed`,["seed","plant","plants"],[t]),r.plant&&_e(r.plant,r.plant?.tileRef?.spritesheet||"plants",`${t}Plant`,r.plant?.name||`${t} Plant`,["plant","plants","tallplants"],[t]),r.crop&&_e(r.crop,r.crop?.tileRef?.spritesheet||"plants",t,r.crop?.name||t,["plant","plants"],[`${t}Crop`])}}async function Sl(){if(!Y.spritesResolved)return Y.spritesResolving||(Y.spritesResolving=(async()=>{try{await wl(2e4,50),await ue.init(),pg(Y.data),Y.spritesResolved=!0}catch(e){try{console.warn("[MGData] sprite resolution failed",e)}catch{}}finally{Y.spritesResolving=null}})()),Y.spritesResolving}async function mg(){return Y.isReady||(yl(),lg(),Sl(),Y.isReady=!0),!0}function gg(){return Y.isReady}function fg(){return vl(),Y.weatherPollingTimer&&(clearInterval(Y.weatherPollingTimer),Y.weatherPollingTimer=null),Y.isReady=!1,!0}function bg(){return!Y.spritesResolved&&!Y.spritesResolving&&Sl(),{...Y.data}}function hg(e){return Y.data[e]??null}function yg(e){return Y.data[e]!=null}async function wl(e=1e4,t=50){let n=Date.now();for(;Date.now()-n<e;){if(Object.values(Y.data).some(r=>r!=null))return{...Y.data};await Ze(t)}throw new Error("MGData.waitForAnyData: timeout")}async function vg(e,t=1e4,n=50){let r=Date.now();for(;Date.now()-r<t;){let o=Y.data[e];if(o!=null)return o;await Ze(n)}throw new Error(`MGData.waitFor: timeout waiting for "${e}"`)}var Qr,tt,Zr,Ao,Io,xt,Zm,fl,eg,tg,ng,bl,Y,St,le,dt=G(()=>{"use strict";ye();et();zt();Qr=A,tt=Qr.Object??Object,Zr=tt.keys,Ao=tt.values,Io=tt.entries,xt={items:["WateringCan","PlanterPot","Shovel"],decor:["SmallRock","MediumRock","LargeRock","WoodBench","StoneBench","MarbleBench"],mutations:["Gold","Rainbow","Wet","Chilled","Frozen"],eggs:["CommonEgg","UncommonEgg","RareEgg"],pets:["Worm","Snail","Bee","Chicken","Bunny"],abilities:["ProduceScaleBoost","DoubleHarvest","SeedFinderI","CoinFinderI"],plants:["Carrot","Strawberry","Aloe","Blueberry","Apple"]},Zm=["Rain","Frost","Dawn","AmberMoon"],fl=/main-[^/]+\.js(\?|$)/,eg=3,tg=200,ng=50,bl=new WeakSet,Y={isReady:!1,isHookInstalled:!1,data:{items:null,decor:null,mutations:null,eggs:null,pets:null,abilities:null,plants:null,weather:null},spritesResolved:!1,spritesResolving:null,weatherPollingTimer:null,weatherPollAttempts:0},St=(e,t)=>t.every(n=>e.includes(n));le={init:mg,isReady:gg,stop:fg,getAll:bg,get:hg,has:yg,waitForAnyData:wl,waitFor:vg};yl()});function kg(){let e=(t,n)=>{let r=o=>{o.stopImmediatePropagation(),o.preventDefault?.()};t.addEventListener(n,r,{capture:!0}),K.listeners.push({type:n,handler:r,target:t})};for(let t of Tg)e(document,t),e(window,t)}function Cg(){for(let{type:e,handler:t,target:n}of K.listeners)try{n.removeEventListener(e,t,{capture:!0})}catch{}K.listeners.length=0}function Pg(){let e=Object.getPrototypeOf(document);K.savedProps.hidden=Object.getOwnPropertyDescriptor(e,"hidden"),K.savedProps.visibilityState=Object.getOwnPropertyDescriptor(e,"visibilityState"),K.savedProps.hasFocus=document.hasFocus?document.hasFocus.bind(document):null;try{Object.defineProperty(e,"hidden",{configurable:!0,get:()=>!1})}catch{}try{Object.defineProperty(e,"visibilityState",{configurable:!0,get:()=>"visible"})}catch{}try{document.hasFocus=()=>!0}catch{}}function Mg(){let e=Object.getPrototypeOf(document);try{K.savedProps.hidden&&Object.defineProperty(e,"hidden",K.savedProps.hidden)}catch{}try{K.savedProps.visibilityState&&Object.defineProperty(e,"visibilityState",K.savedProps.visibilityState)}catch{}try{K.savedProps.hasFocus&&(document.hasFocus=K.savedProps.hasFocus)}catch{}}function Ro(){K.audioCtx&&K.audioCtx.state!=="running"&&K.audioCtx.resume?.().catch(()=>{})}function Ag(){try{let e=window.AudioContext||window.webkitAudioContext;K.audioCtx=new e({latencyHint:"interactive"}),K.gainNode=K.audioCtx.createGain(),K.gainNode.gain.value=1e-5,K.oscillator=K.audioCtx.createOscillator(),K.oscillator.frequency.value=1,K.oscillator.connect(K.gainNode).connect(K.audioCtx.destination),K.oscillator.start(),document.addEventListener("visibilitychange",Ro,{capture:!0}),window.addEventListener("focus",Ro,{capture:!0})}catch{kl()}}function kl(){try{K.oscillator?.stop()}catch{}try{K.oscillator?.disconnect(),K.gainNode?.disconnect()}catch{}try{K.audioCtx?.close?.()}catch{}document.removeEventListener("visibilitychange",Ro,{capture:!0}),window.removeEventListener("focus",Ro,{capture:!0}),K.oscillator=null,K.gainNode=null,K.audioCtx=null}function Ig(){let e=document.querySelector("canvas")||document.body||document.documentElement;K.heartbeatInterval=window.setInterval(()=>{try{e.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:1,clientY:1}))}catch{}},25e3)}function Eg(){K.heartbeatInterval!==null&&(clearInterval(K.heartbeatInterval),K.heartbeatInterval=null)}function Lg(){K.initialized||(K.initialized=!0,Cl())}function Dg(){return K.initialized}function Cl(){K.initialized&&(K.running||(K.running=!0,Pg(),kg(),Ag(),Ig()))}function Rg(){K.running&&(K.running=!1,Eg(),kl(),Cg(),Mg())}function Og(){return K.running}var Tg,K,Sn,ea=G(()=>{"use strict";Tg=["visibilitychange","blur","focus","focusout","pagehide","freeze","resume"],K={initialized:!1,listeners:[],savedProps:{hidden:void 0,visibilityState:void 0,hasFocus:null},audioCtx:null,oscillator:null,gainNode:null,heartbeatInterval:null,running:!1};Sn={init:Lg,isReady:Dg,start:Cl,stop:Rg,isRunning:Og}});function Hg(){return Gg}function wn(){return A.jotaiAtomCache?.cache}function je(e){let t=Hg(),n=t.get(e);if(n)return n;let r=wn();if(!r)return null;for(let o of r.values())if((o?.debugLabel||o?.label||"")===e)return t.set(e,o),o;return null}var Gg,Tn=G(()=>{"use strict";ye();Gg=new Map});function Vt(){return Ng}function Oo(){if(!Pl){Pl=!0;for(let e of na)try{e()}catch{}try{let e=A.CustomEvent||CustomEvent;A.dispatchEvent?.(new e(_g))}catch{}}}function Wg(e){na.add(e);let t=ra();if(t.via&&!t.polyfill)try{e()}catch{}return()=>{na.delete(e)}}async function Go(e={}){let{timeoutMs:t=6e3,intervalMs:n=50}=e,r=ra();if(!(r.via&&!r.polyfill))return new Promise((o,a)=>{let i=!1,s=Wg(()=>{i||(i=!0,s(),o())}),c=Date.now();(async()=>{for(;!i&&Date.now()-c<t;){let l=ra();if(l.via&&!l.polyfill){if(i)return;i=!0,s(),o();return}await kn(n)}i||(i=!0,s(),a(new Error("Store not captured within timeout")))})()})}function Ml(){try{let e=A.Event||Event;A.dispatchEvent?.(new e("visibilitychange"))}catch{}}function oa(e){return e&&typeof e=="object"&&typeof e.get=="function"&&typeof e.set=="function"&&typeof e.sub=="function"}function ta(e,t=0,n=new WeakSet){if(t>3||!e||typeof e!="object"||n.has(e))return null;try{n.add(e)}catch{return null}if(oa(e))return e;let r=["store","value","current","state","s","baseStore"];for(let o of r)try{let a=e[o];if(oa(a))return a}catch{}return null}function Al(){let e=Vt(),t=A.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t?.renderers?.size)return null;let n=0;for(let[r]of t.renderers){let o=t.getFiberRoots?.(r);o&&(n+=o.size||0)}if(n===0)return null;for(let[r]of t.renderers){let o=t.getFiberRoots?.(r);if(o)for(let a of o){let i=new Set,s=[a.current];for(;s.length;){let c=s.pop();if(!(!c||i.has(c))){i.add(c);try{let d=c?.pendingProps?.value;if(oa(d))return e.lastCapturedVia="fiber",d}catch{}try{let d=c?.memoizedState,l=0;for(;d&&l<15;){l++;let u=ta(d);if(u)return e.lastCapturedVia="fiber",u;let p=ta(d.memoizedState);if(p)return e.lastCapturedVia="fiber",p;d=d.next}}catch{}try{if(c?.stateNode){let d=ta(c.stateNode);if(d)return e.lastCapturedVia="fiber",d}}catch{}c.child&&s.push(c.child),c.sibling&&s.push(c.sibling),c.alternate&&s.push(c.alternate)}}}}return null}function Il(){return{get:()=>{throw new Error("Store not captured: get unavailable")},set:()=>{throw new Error("Store not captured: set unavailable")},sub:()=>()=>{},__polyfill:!0}}async function Fg(e=5e3){let t=Date.now(),n=wn();for(;!n&&Date.now()-t<e;)await kn(100),n=wn();if(!n)throw new Error("jotaiAtomCache.cache not found");let r=Vt(),o=null,a=null,i=[],s=()=>{for(let d of i)try{d.__origWrite&&(d.write=d.__origWrite,delete d.__origWrite)}catch{}};for(let d of n.values()){if(!d||typeof d.write!="function"||d.__origWrite)continue;let l=d.write;d.__origWrite=l,d.write=function(u,p,...m){return a||(o=u,a=p,s()),l.call(this,u,p,...m)},i.push(d)}Ml();let c=Date.now();for(;!a&&Date.now()-c<e;)await kn(50);return a?(r.lastCapturedVia="write",{get:d=>o(d),set:(d,l)=>a(d,l),sub:(d,l)=>{let u;try{u=o(d)}catch{}let p=setInterval(()=>{let m;try{m=o(d)}catch{return}if(m!==u){u=m;try{l()}catch{}}},100);return()=>clearInterval(p)}}):(s(),r.lastCapturedVia="polyfill",Il())}async function Bg(e=1e4){let t=Vt();Ml();let n=Date.now();for(;Date.now()-n<e;){let r=Al();if(r)return r;await kn(50)}return t.lastCapturedVia="polyfill",Il()}async function Ho(){let e=Vt();if(e.baseStore&&!e.baseStore.__polyfill)return Oo(),e.baseStore;if(e.captureInProgress){let t=Date.now(),n=2500;for(;!e.baseStore&&Date.now()-t<n;)await kn(25);if(e.baseStore)return e.baseStore.__polyfill||Oo(),e.baseStore}e.captureInProgress=!0;try{let t=Al();if(t)return e.baseStore=t,Oo(),t;try{let r=await Fg(5e3);return e.baseStore=r,r.__polyfill||Oo(),r}catch(r){e.captureError=r}let n=await Bg();return e.baseStore=n,n}catch(t){throw e.captureError=t,t}finally{e.captureInProgress=!1}}function ra(){let e=Vt();return{via:e.lastCapturedVia,polyfill:!!e.baseStore?.__polyfill,error:e.captureError}}async function jg(){let e=await Ho(),t=new WeakMap,n=async o=>{let a=t.get(o);if(a)return a;a={last:void 0,has:!1,subs:new Set},t.set(o,a);try{a.last=e.get(o),a.has=!0}catch{}let i=e.sub(o,()=>{let s;try{s=e.get(o)}catch{return}let c=a.last,d=!Object.is(s,c)||!a.has;if(a.last=s,a.has=!0,d)for(let l of a.subs)try{l(s,c)}catch{}});return a.unsubUpstream=i,a};return{async get(o){let a=await n(o);if(a.has)return a.last;let i=e.get(o);return a.last=i,a.has=!0,i},async set(o,a){await e.set(o,a);let i=await n(o);i.last=a,i.has=!0},async sub(o,a){let i=await n(o);if(i.subs.add(a),i.has)try{a(i.last,i.last)}catch{}return()=>{i.subs.delete(a)}},getShadow(o){return t.get(o)?.last},hasShadow(o){return!!t.get(o)?.has},async ensureWatch(o){await n(o)},async asStore(){return{get:o=>this.get(o),set:(o,a)=>this.set(o,a),sub:(o,a)=>{let i=null;return this.sub(o,()=>a()).then(s=>i=s),()=>i?.()}}}}}async function Cn(){let e=Vt();return e.mirror||(e.mirror=await jg()),e.mirror}var Ng,_g,Pl,na,kn,Pn=G(()=>{"use strict";ye();Tn();Ng={baseStore:null,captureInProgress:!1,captureError:null,lastCapturedVia:null,mirror:void 0};_g="__JOTAI_STORE_READY__",Pl=!1,na=new Set;kn=e=>new Promise(t=>setTimeout(t,e))});async function aa(){await Cn()}var te,We=G(()=>{"use strict";Pn();Tn();Pn();te={async select(e){let t=await Cn(),n=je(e);if(!n)throw new Error(`[Store] Atom not found: "${e}"`);return t.get(n)},async set(e,t){let n=await Cn(),r=je(e);if(!r)throw new Error(`[Store] Atom not found: "${e}"`);await n.set(r,t)},async subscribe(e,t){let n=await Cn(),r=je(e);if(!r)throw new Error(`[Store] Atom not found: "${e}"`);return n.sub(r,o=>{try{t(o)}catch{}})},async subscribeImmediate(e,t){let n=await te.select(e);try{t(n)}catch{}return te.subscribe(e,t)}}});function Mn(e){return e?Array.isArray(e)?e.slice():e.split(".").map(t=>t.match(/^\d+$/)?Number(t):t):[]}function pt(e,t){let n=Mn(t),r=e;for(let o of n){if(r==null)return;r=r[o]}return r}function ia(e,t,n){let r=Mn(t);if(!r.length)return n;let o=Array.isArray(e)?[...e]:{...e??{}},a=o;for(let i=0;i<r.length-1;i++){let s=r[i],c=a[s],d=typeof c=="object"&&c!==null?Array.isArray(c)?[...c]:{...c}:{};a[s]=d,a=d}return a[r[r.length-1]]=n,o}var No=G(()=>{"use strict"});function El(e,t){let n={};for(let r of t)n[r]=r.includes(".")?pt(e,r):e?.[r];try{return JSON.stringify(n)}catch{return String(n)}}function sa(e,t,n){let r=n.mode??"auto";function o(d){let l=t?pt(d,t):d,u=new Map;if(l==null)return{signatures:u,keys:[]};let p=Array.isArray(l);if((r==="array"||r==="auto"&&p)&&p)for(let g=0;g<l.length;g++){let f=l[g],h=n.key?n.key(f,g,d):g,b=n.sig?n.sig(f,g,d):n.fields?El(f,n.fields):JSON.stringify(f);u.set(h,b)}else for(let[g,f]of Object.entries(l)){let h=n.key?n.key(f,g,d):g,b=n.sig?n.sig(f,g,d):n.fields?El(f,n.fields):JSON.stringify(f);u.set(h,b)}return{signatures:u,keys:Array.from(u.keys())}}function a(d,l){if(d===l)return!0;if(!d||!l||d.size!==l.size)return!1;for(let[u,p]of d)if(l.get(u)!==p)return!1;return!0}async function i(d){let l=null;return te.subscribeImmediate(e,u=>{let p=t?pt(u,t):u,{signatures:m}=o(p);if(!a(l,m)){let g=new Set([...l?Array.from(l.keys()):[],...Array.from(m.keys())]),f=[];for(let h of g){let b=l?.get(h)??"__NONE__",k=m.get(h)??"__NONE__";b!==k&&f.push(h)}l=m,d({value:p,changedKeys:f})}})}async function s(d,l){return i(({value:u,changedKeys:p})=>{p.includes(d)&&l({value:u})})}async function c(d,l){let u=new Set(d);return i(({value:p,changedKeys:m})=>{let g=m.filter(f=>u.has(f));g.length&&l({value:p,changedKeys:g})})}return{sub:i,subKey:s,subKeys:c}}var la=G(()=>{"use strict";We();No()});function Ug(e,t){let n=$t.get(e);if(n)try{n()}catch{}return $t.set(e,t),()=>{try{t()}catch{}$t.get(e)===t&&$t.delete(e)}}function ce(e,t={}){let{path:n,write:r="replace"}=t,o=n?`${e}:${Mn(n).join(".")}`:e;async function a(){let u=await te.select(e);return n?pt(u,n):u}async function i(u){if(typeof r=="function"){let g=await te.select(e),f=r(u,g);return te.set(e,f)}let p=await te.select(e),m=n?ia(p,n,u):u;return r==="merge-shallow"&&!n&&p&&typeof p=="object"&&typeof u=="object"?te.set(e,{...p,...u}):te.set(e,m)}async function s(u){let p=await a(),m=u(p);return await i(m),m}async function c(u,p,m){let g,f=b=>{let k=n?pt(b,n):b;if(typeof g>"u"||!m(g,k)){let S=g;g=k,p(k,S)}},h=u?await te.subscribeImmediate(e,f):await te.subscribe(e,f);return Ug(o,h)}function d(){let u=$t.get(o);if(u){try{u()}catch{}$t.delete(o)}}function l(u){return sa(e,u?.path??n,u)}return{label:o,get:a,set:i,update:s,onChange:(u,p=Object.is)=>c(!1,u,p),onChangeNow:(u,p=Object.is)=>c(!0,u,p),asSignature:l,stopOnChange:d}}function w(e){return ce(e)}var $t,ca=G(()=>{"use strict";We();No();la();$t=new Map});var zg,Vg,$g,Kg,Jg,qg,Yg,Xg,Qg,Zg,ef,tf,nf,of,rf,af,sf,lf,cf,uf,df,pf,mf,gf,ff,bf,hf,yf,vf,xf,Sf,wf,Tf,kf,Cf,Pf,ua,da,pa,Mf,Af,If,Ef,Lf,Df,Rf,Of,Gf,Hf,Nf,_f,Wf,Ff,Bf,jf,Uf,zf,Vf,$f,Kf,Jf,qf,Yf,Xf,Qf,Zf,eb,tb,nb,ob,rb,ab,ma,ib,sb,lb,cb,ub,db,pb,mb,gb,fb,bb,hb,yb,vb,xb,Sb,wb,Tb,kb,Cb,Pb,ga,fa,Mb,Ab,Ib,Eb,Lb,Db,Rb,Ob,Gb,Hb,Nb,_b,Wb,Fb,Bb,jb,Ub,zb,Vb,$b,Kb,Jb,qb,Yb,Xb,Qb,Zb,eh,th,nh,oh,rh,ah,ih,sh,lh,ch,uh,dh,ph,mh,gh,fh,bh,hh,yh,vh,xh,Sh,wh,Th,kh,Ch,Ph,Mh,Ah,Ih,Eh,Lh,ba,_o,Dh,Rh,Oh,Gh,Hh,Nh,_h,Wh,Fh,Bh,jh,Uh,zh,Vh,$h,Kh,Jh,qh,Yh,Xh,Qh,Zh,Ll=G(()=>{"use strict";ca();zg=w("positionAtom"),Vg=w("lastPositionInMyGardenAtom"),$g=w("playerDirectionAtom"),Kg=w("stateAtom"),Jg=w("quinoaDataAtom"),qg=w("currentTimeAtom"),Yg=w("actionAtom"),Xg=w("isPressAndHoldActionAtom"),Qg=w("mapAtom"),Zg=w("tileSizeAtom"),ef=ce("mapAtom",{path:"cols"}),tf=ce("mapAtom",{path:"rows"}),nf=ce("mapAtom",{path:"spawnTiles"}),of=ce("mapAtom",{path:"locations.seedShop.spawnTileIdx"}),rf=ce("mapAtom",{path:"locations.eggShop.spawnTileIdx"}),af=ce("mapAtom",{path:"locations.toolShop.spawnTileIdx"}),sf=ce("mapAtom",{path:"locations.decorShop.spawnTileIdx"}),lf=ce("mapAtom",{path:"locations.sellCropsShop.spawnTileIdx"}),cf=ce("mapAtom",{path:"locations.sellPetShop.spawnTileIdx"}),uf=ce("mapAtom",{path:"locations.collectorsClub.spawnTileIdx"}),df=ce("mapAtom",{path:"locations.wishingWell.spawnTileIdx"}),pf=ce("mapAtom",{path:"locations.shopsCenter.spawnTileIdx"}),mf=w("playerAtom"),gf=w("myDataAtom"),ff=w("myUserSlotIdxAtom"),bf=w("isSpectatingAtom"),hf=w("myCoinsCountAtom"),yf=w("numPlayersAtom"),vf=ce("playerAtom",{path:"id"}),xf=w("userSlotsAtom"),Sf=w("filteredUserSlotsAtom"),wf=w("myUserSlotAtom"),Tf=w("spectatorsAtom"),kf=ce("stateAtom",{path:"child"}),Cf=ce("stateAtom",{path:"child.data"}),Pf=ce("stateAtom",{path:"child.data.shops"}),ua=ce("stateAtom",{path:"child.data.userSlots"}),da=ce("stateAtom",{path:"data.players"}),pa=ce("stateAtom",{path:"data.hostPlayerId"}),Mf=w("myInventoryAtom"),Af=w("myInventoryItemsAtom"),If=w("isMyInventoryAtMaxLengthAtom"),Ef=w("myFavoritedItemIdsAtom"),Lf=w("myCropInventoryAtom"),Df=w("mySeedInventoryAtom"),Rf=w("myToolInventoryAtom"),Of=w("myEggInventoryAtom"),Gf=w("myDecorInventoryAtom"),Hf=w("myPetInventoryAtom"),Nf=ce("myInventoryAtom",{path:"favoritedItemIds"}),_f=w("itemTypeFiltersAtom"),Wf=w("myItemStoragesAtom"),Ff=w("myPetHutchStoragesAtom"),Bf=w("myPetHutchItemsAtom"),jf=w("myPetHutchPetItemsAtom"),Uf=w("myNumPetHutchItemsAtom"),zf=w("myValidatedSelectedItemIndexAtom"),Vf=w("isSelectedItemAtomSuspended"),$f=w("mySelectedItemAtom"),Kf=w("mySelectedItemNameAtom"),Jf=w("mySelectedItemRotationsAtom"),qf=w("mySelectedItemRotationAtom"),Yf=w("setSelectedIndexToEndAtom"),Xf=w("myPossiblyNoLongerValidSelectedItemIndexAtom"),Qf=w("myCurrentGlobalTileIndexAtom"),Zf=w("myCurrentGardenTileAtom"),eb=w("myCurrentGardenObjectAtom"),tb=w("myOwnCurrentGardenObjectAtom"),nb=w("myOwnCurrentDirtTileIndexAtom"),ob=w("myCurrentGardenObjectNameAtom"),rb=w("isInMyGardenAtom"),ab=w("myGardenBoardwalkTileObjectsAtom"),ma=ce("myDataAtom",{path:"garden"}),ib=ce("myDataAtom",{path:"garden.tileObjects"}),sb=ce("myOwnCurrentGardenObjectAtom",{path:"objectType"}),lb=w("myCurrentStablePlantObjectInfoAtom"),cb=w("myCurrentSortedGrowSlotIndicesAtom"),ub=w("myCurrentGrowSlotIndexAtom"),db=w("myCurrentGrowSlotsAtom"),pb=w("myCurrentGrowSlotAtom"),mb=w("secondsUntilCurrentGrowSlotMaturesAtom"),gb=w("isCurrentGrowSlotMatureAtom"),fb=w("numGrowSlotsAtom"),bb=w("myCurrentEggAtom"),hb=w("petInfosAtom"),yb=w("myPetInfosAtom"),vb=w("myPetSlotInfosAtom"),xb=w("myPrimitivePetSlotsAtom"),Sb=w("myNonPrimitivePetSlotsAtom"),wb=w("expandedPetSlotIdAtom"),Tb=w("myPetsProgressAtom"),kb=w("myActiveCropMutationPetsAtom"),Cb=w("totalPetSellPriceAtom"),Pb=w("selectedPetHasNewVariantsAtom"),ga=w("shopsAtom"),fa=w("myShopPurchasesAtom"),Mb=w("seedShopAtom"),Ab=w("seedShopInventoryAtom"),Ib=w("seedShopRestockSecondsAtom"),Eb=w("seedShopCustomRestockInventoryAtom"),Lb=w("eggShopAtom"),Db=w("eggShopInventoryAtom"),Rb=w("eggShopRestockSecondsAtom"),Ob=w("eggShopCustomRestockInventoryAtom"),Gb=w("toolShopAtom"),Hb=w("toolShopInventoryAtom"),Nb=w("toolShopRestockSecondsAtom"),_b=w("toolShopCustomRestockInventoryAtom"),Wb=w("decorShopAtom"),Fb=w("decorShopInventoryAtom"),Bb=w("decorShopRestockSecondsAtom"),jb=w("decorShopCustomRestockInventoryAtom"),Ub=w("isDecorShopAboutToRestockAtom"),zb=ce("shopsAtom",{path:"seed"}),Vb=ce("shopsAtom",{path:"tool"}),$b=ce("shopsAtom",{path:"egg"}),Kb=ce("shopsAtom",{path:"decor"}),Jb=w("myCropItemsAtom"),qb=w("myCropItemsToSellAtom"),Yb=w("totalCropSellPriceAtom"),Xb=w("friendBonusMultiplierAtom"),Qb=w("myJournalAtom"),Zb=w("myCropJournalAtom"),eh=w("myPetJournalAtom"),th=w("myStatsAtom"),nh=w("myActivityLogsAtom"),oh=w("newLogsAtom"),rh=w("hasNewLogsAtom"),ah=w("newCropLogsFromSellingAtom"),ih=w("hasNewCropLogsFromSellingAtom"),sh=w("myCompletedTasksAtom"),lh=w("myActiveTasksAtom"),ch=w("isWelcomeToastVisibleAtom"),uh=w("shouldCloseWelcomeToastAtom"),dh=w("isInitialMoveToDirtPatchToastVisibleAtom"),ph=w("isFirstPlantSeedActiveAtom"),mh=w("isThirdSeedPlantActiveAtom"),gh=w("isThirdSeedPlantCompletedAtom"),fh=w("isDemoTouchpadVisibleAtom"),bh=w("areShopAnnouncersEnabledAtom"),hh=w("arePresentablesEnabledAtom"),yh=w("isEmptyDirtTileHighlightedAtom"),vh=w("isPlantTileHighlightedAtom"),xh=w("isItemHiglightedInHotbarAtom"),Sh=w("isItemHighlightedInModalAtom"),wh=w("isMyGardenButtonHighlightedAtom"),Th=w("isSellButtonHighlightedAtom"),kh=w("isShopButtonHighlightedAtom"),Ch=w("isInstaGrowButtonHiddenAtom"),Ph=w("isActionButtonHighlightedAtom"),Mh=w("isGardenItemInfoCardHiddenAtom"),Ah=w("isSeedPurchaseButtonHighlightedAtom"),Ih=w("isFirstSeedPurchaseActiveAtom"),Eh=w("isFirstCropHarvestActiveAtom"),Lh=w("isWeatherStatusHighlightedAtom"),ba=w("weatherAtom"),_o=w("activeModalAtom"),Dh=w("hotkeyBeingPressedAtom"),Rh=w("avatarTriggerAnimationAtom"),Oh=w("avatarDataAtom"),Gh=w("emoteDataAtom"),Hh=w("otherUserSlotsAtom"),Nh=w("otherPlayerPositionsAtom"),_h=w("otherPlayerSelectedItemsAtom"),Wh=w("otherPlayerLastActionsAtom"),Fh=w("traderBunnyPlayerId"),Bh=w("npcPlayersAtom"),jh=w("npcQuinoaUsersAtom"),Uh=w("numNpcAvatarsAtom"),zh=w("traderBunnyEmoteTimeoutAtom"),Vh=w("traderBunnyEmoteAtom"),$h=w("unsortedLeaderboardAtom"),Kh=w("currentGardenNameAtom"),Jh=w("quinoaEngineAtom"),qh=w("quinoaInitializationErrorAtom"),Yh=w("avgPingAtom"),Xh=w("serverClientTimeOffsetAtom"),Qh=w("isEstablishingShotRunningAtom"),Zh=w("isEstablishingShotCompleteAtom")});var Tt=G(()=>{"use strict";We();Pn();ca();la();No();Tn();Ll()});function An(){return oe}function Dl(){return oe.initialized}function Ke(){return oe.isCustom&&oe.activeModal!==null}function Je(){return oe.activeModal}function ha(e){return!oe.shadow||oe.shadow.modal!==e?null:oe.shadow.data}function Rl(e){oe.initialized=e}function Wo(e){oe.activeModal=e}function Fo(e){oe.isCustom=e}function ya(e,t){oe.shadow={modal:e,data:t,timestamp:Date.now()}}function va(){oe.shadow=null}function xa(e,t){oe.patchedAtoms.add(e),oe.originalReads.set(e,t)}function Ol(e){return oe.originalReads.get(e)}function Bo(e){return oe.patchedAtoms.has(e)}function Gl(e){oe.patchedAtoms.delete(e),oe.originalReads.delete(e)}function Hl(e){oe.unsubscribes.push(e)}function ey(){for(let e of oe.unsubscribes)try{e()}catch{}oe.unsubscribes.length=0}function Nl(e){return oe.listeners.onOpen.add(e),()=>oe.listeners.onOpen.delete(e)}function jo(e){return oe.listeners.onClose.add(e),()=>oe.listeners.onClose.delete(e)}function Sa(e){for(let t of oe.listeners.onOpen)try{t(e)}catch{}}function Uo(e){for(let t of oe.listeners.onClose)try{t(e)}catch{}}function _l(){ey(),oe.initialized=!1,oe.activeModal=null,oe.isCustom=!1,oe.shadow=null,oe.patchedAtoms.clear(),oe.originalReads.clear(),oe.listeners.onOpen.clear(),oe.listeners.onClose.clear()}var oe,zo=G(()=>{"use strict";oe={initialized:!1,activeModal:null,isCustom:!1,shadow:null,patchedAtoms:new Set,originalReads:new Map,unsubscribes:[],listeners:{onOpen:new Set,onClose:new Set}}});function wa(e){return Vo[e]}function Wl(e){let t=Vo[e],n=[];for(let r of t.atoms)n.push(r.atomLabel);if(t.derivedAtoms)for(let r of t.derivedAtoms)n.push(r.atomLabel);return n}var Vo,Fl=G(()=>{"use strict";Vo={inventory:{atoms:[{atomLabel:"myInventoryAtom",dataKey:"_full",transform:e=>{let t=e;return{items:t.items??[],storages:t.storages??[],favoritedItemIds:t.favoritedItemIds??[]}}}],derivedAtoms:[{atomLabel:"myCropInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Produce"):[]},{atomLabel:"mySeedInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Seed"):[]},{atomLabel:"myToolInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Tool"):[]},{atomLabel:"myEggInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Egg"):[]},{atomLabel:"myDecorInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Decor"):[]},{atomLabel:"myPetInventoryAtom",sourceKey:"items",deriveFn:e=>Array.isArray(e)?e.filter(t=>t.itemType==="Pet"):[]}]},journal:{atoms:[{atomLabel:"myJournalAtom",dataKey:"_full"}],derivedAtoms:[{atomLabel:"myCropJournalAtom",sourceKey:"produce",deriveFn:e=>e??{}},{atomLabel:"myPetJournalAtom",sourceKey:"pets",deriveFn:e=>e??{}}]},stats:{atoms:[{atomLabel:"myStatsAtom",dataKey:"_full"}]},activityLog:{atoms:[{atomLabel:"myActivityLogsAtom",dataKey:"logs"}]},seedShop:{atoms:[{atomLabel:"seedShopInventoryAtom",dataKey:"inventory"},{atomLabel:"seedShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},eggShop:{atoms:[{atomLabel:"eggShopInventoryAtom",dataKey:"inventory"},{atomLabel:"eggShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},toolShop:{atoms:[{atomLabel:"toolShopInventoryAtom",dataKey:"inventory"},{atomLabel:"toolShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},decorShop:{atoms:[{atomLabel:"decorShopInventoryAtom",dataKey:"inventory"},{atomLabel:"decorShopRestockSecondsAtom",dataKey:"secondsUntilRestock",transform:e=>e??0}]},leaderboard:{atoms:[{atomLabel:"unsortedLeaderboardAtom",dataKey:"entries"}]},petHutch:{atoms:[{atomLabel:"myPetHutchItemsAtom",dataKey:"items"},{atomLabel:"myPetHutchPetItemsAtom",dataKey:"petItems"}]}}});function ry(e,t,n,r){return function(a){let i=Ke(),s=Je();if(i&&s===r){let c=ha(r);if(c!==null){let d;if(n.dataKey==="_full"?d=c:d=c[n.dataKey],d!==void 0)return t(a),n.transform?n.transform(d):d}}return t(a)}}function ay(e,t,n,r,o){return function(i){if(Ke()&&Je()===o){let s=ha(o);if(s!==null){let c=s[n];if(c!==void 0)return t(i),r(c)}}return t(i)}}function jl(e){let t=wa(e);for(let n of t.atoms){let r=je(n.atomLabel);if(!r||Bo(n.atomLabel))continue;let o=r.read;if(typeof o!="function")continue;let a=ry(n.atomLabel,o,n,e);r.read=a,xa(n.atomLabel,o)}if(t.derivedAtoms)for(let n of t.derivedAtoms){let r=je(n.atomLabel);if(!r||Bo(n.atomLabel))continue;let o=r.read;if(typeof o!="function")continue;let a=ay(n.atomLabel,o,n.sourceKey,n.deriveFn,e);r.read=a,xa(n.atomLabel,o)}}async function In(e){let t=wa(e);for(let r of t.atoms)Bl(r.atomLabel);if(t.derivedAtoms)for(let r of t.derivedAtoms)Bl(r.atomLabel);let n=await Ho();await zl(n,e)}async function Ul(e){let t=await Ho();await zl(t,e);let n=Wl(e);for(let r of n){let o=je(r);if(o)try{t.get(o)}catch{}}}function Bl(e){if(!Bo(e))return;let t=je(e),n=Ol(e);t&&n&&(t.read=n),Gl(e)}async function zl(e,t){let n=ty.has(t),r=ny.has(t),o=oy.has(t);if(!n&&!r&&!o)return;let a=je("stateAtom");if(a)try{let i=e.get(a);if(!i||typeof i!="object")return;let s=null;if(n||r){let c=i.child,d=c?.data;if(c&&d&&typeof d=="object"){let l=null;if(n&&Array.isArray(d.userSlots)){let u=d.userSlots.map(p=>{if(!p||typeof p!="object")return p;let m=p,g=m.data,f=g&&typeof g=="object"?{...g}:g;return{...m,data:f}});l={...l??d,userSlots:u}}if(r&&d.shops&&typeof d.shops=="object"&&(l={...l??d,shops:{...d.shops}}),l){let u={...c,data:l};s={...i,child:u}}}}if(o){let c=i.data;if(c&&Array.isArray(c.players)){let d={...c,players:[...c.players]};s={...s??i,data:d}}}if(!s)return;await e.set(a,s)}catch{}}async function Vl(){for(let e of Object.keys(Vo))await In(e)}var ty,ny,oy,$l=G(()=>{"use strict";Pn();Tn();Fl();zo();ty=new Set(["inventory","journal","stats","activityLog","petHutch"]),ny=new Set(["seedShop","eggShop","toolShop","decorShop"]),oy=new Set(["leaderboard"])});async function Kl(){if(An().initialized)return;En=await te.select("activeModalAtom"),$o=setInterval(async()=>{try{let n=await te.select("activeModalAtom"),r=En;r!==n&&(En=n,iy(n,r))}catch{}},50),Hl(()=>{$o&&(clearInterval($o),$o=null)}),Rl(!0)}function iy(e,t){let n=Ke(),r=Je();e===null&&t!==null&&(n&&r===t?sy("native"):n||Uo({modal:t,wasCustom:!1,closedBy:"native"})),e!==null&&!n&&Sa({modal:e,isCustom:!1})}async function sy(e){let t=Je();t&&(va(),Fo(!1),Wo(null),await In(t),Uo({modal:t,wasCustom:!0,closedBy:e}))}async function Jl(e,t){if(!An().initialized)throw new Error("[MGCustomModal] Not initialized. Call init() first.");Ke()&&await Ta(),ya(e,t),Fo(!0),Wo(e),jl(e),await Ul(e),await _o.set(e),En=e,Sa({modal:e,isCustom:!0})}function ql(e,t){let n=An();if(!n.isCustom||n.activeModal!==e||!n.shadow)return;let o={...n.shadow.data,...t};ya(e,o)}async function Ta(){let e=An();if(!e.isCustom||!e.activeModal)return;let t=e.activeModal;va(),Fo(!1),Wo(null),await _o.set(null),En=null,await In(t),Uo({modal:t,wasCustom:!0,closedBy:"api"})}function Yl(){return new Promise(e=>{if(!Ke()){e();return}let t=jo(()=>{t(),e()})})}async function Xl(){if(Ke()){let e=Je();e&&await In(e)}await Vl(),_l()}var $o,En,Ql=G(()=>{"use strict";Tt();We();zo();$l();$o=null,En=null});var Ln,ka=G(()=>{"use strict";Ql();zo();Ln={async init(){return Kl()},isReady(){return Dl()},async show(e,t){return Jl(e,t)},update(e,t){return ql(e,t)},async close(){return Ta()},isOpen(){return Je()!==null},isCustomOpen(){return Ke()},getActiveModal(){return Je()},waitForClose(){return Yl()},onOpen(e){return Nl(e)},onClose(e){return jo(e)},destroy(){return Xl()}}});function Jt(e){try{if(typeof structuredClone=="function")return structuredClone(e)}catch{}try{return JSON.parse(JSON.stringify(e))}catch{}return e}function Dn(){return Pe.tos()}function Ma(){return Pe.engine()}function ly(){let e=Dn()?.map?.cols;return Number.isFinite(e)&&e>0?e:null}function Aa(e,t){let n=ly();return n?t*n+e|0:null}function kt(e,t,n=!0){let r=Dn(),o=Aa(e,t);if(!r||o==null)return{gidx:null,tv:null};let a=r.tileViews?.get?.(o)||null;if(!a&&n&&typeof r.getOrCreateTileView=="function")try{a=r.getOrCreateTileView(o)}catch{}return{gidx:o,tv:a||null}}function Kt(e,t,n,r={}){let o=r.ensureView!==!1,a=r.forceUpdate!==!1,i=Ma(),{gidx:s,tv:c}=kt(Number(e),Number(t),o);if(s==null)throw new Error("MGTile: cols unavailable (engine/TOS not ready)");if(!c)throw new Error("MGTile: TileView unavailable (not instantiated)");let d=c.tileObject;if(typeof c.onDataChanged!="function")throw new Error("MGTile: tileView.onDataChanged not found (different API?)");if(c.onDataChanged(n),a&&i?.reusableContext&&typeof c.update=="function")try{c.update(i.reusableContext)}catch{}return{ok:!0,tx:Number(e),ty:Number(t),gidx:s,before:d,after:c.tileObject}}function Ia(e,t){if(!e)throw new Error("MGTile: no tileObject on this tile");if(e.objectType!==t)throw new Error(`MGTile: expected objectType "${t}", got "${e.objectType}"`)}function Ca(e,t){if("startTime"in t&&(e.startTime=Number(t.startTime)),"endTime"in t&&(e.endTime=Number(t.endTime)),"targetScale"in t&&(e.targetScale=Number(t.targetScale)),"mutations"in t){if(!Array.isArray(t.mutations))throw new Error("MGTile: mutations must be an array of strings");e.mutations=t.mutations.slice()}}function nt(){if(!Ue.ready)throw new Error("MGTile: not ready. Call MGTile.init() first.")}function Pa(e){if(!e)return null;let t=o=>o&&(typeof o.getGlobalPosition=="function"||typeof o.toGlobal=="function"),n=["container","root","view","tile","ground","base","floor","bg","background","baseSprite","tileSprite","displayObject","gfx","graphics","sprite"];for(let o of n)if(t(e[o]))return e[o];if(t(e))return e;let r=[e.container,e.root,e.view,e.displayObject,e.tileSprite,e.gfx,e.graphics,e.sprite];for(let o of r)if(t(o))return o;try{for(let o of Object.keys(e))if(t(e[o]))return e[o]}catch{}return null}function Jo(e){let t=Me(()=>e?.getGlobalPosition?.());if(t&&Number.isFinite(t.x)&&Number.isFinite(t.y))return{x:t.x,y:t.y};let n=Me(()=>e?.toGlobal?.({x:0,y:0}));return n&&Number.isFinite(n.x)&&Number.isFinite(n.y)?{x:n.x,y:n.y}:null}function cy(e){try{if(!e?.getBounds)return"center";let t=e.getBounds(),n=Jo(e);if(!n||!t||!Number.isFinite(t.width)||!Number.isFinite(t.height))return"center";let r=t.x+t.width/2,o=t.y+t.height/2;return Math.hypot(n.x-r,n.y-o)<Math.hypot(n.x-t.x,n.y-t.y)?"center":"topleft"}catch{return"center"}}function uy(){let e=Dn(),t=e?.map?.cols,n=e?.map?.rows;if(!e||!Number.isFinite(t)||t<=1)return null;let r=Number.isFinite(n)&&n>1?n:null,o=[[0,0],[1,1],[Math.min(2,t-2),0],[0,1]];r&&r>2&&o.push([Math.floor(t/2),Math.floor(r/2)]);for(let[a,i]of o){if(a<0||i<0||a>=t||r&&i>=r)continue;let s=kt(a,i,!0).tv,c=a+1<t?kt(a+1,i,!0).tv:null,d=kt(a,i+1,!0).tv,l=Pa(s),u=Pa(c),p=Pa(d);if(!l||!u||!p)continue;let m=Jo(l),g=Jo(u),f=Jo(p);if(!m||!g||!f)continue;let h={x:g.x-m.x,y:g.y-m.y},b={x:f.x-m.x,y:f.y-m.y},k=h.x*b.y-h.y*b.x;if(!Number.isFinite(k)||Math.abs(k)<1e-6)continue;let S=1/k,x={a:b.y*S,b:-b.x*S,c:-h.y*S,d:h.x*S},T={x:m.x-a*h.x-i*b.x,y:m.y-a*h.y-i*b.y},y=cy(l),C=y==="center"?T:{x:T.x+.5*(h.x+b.x),y:T.y+.5*(h.y+b.y)};return{ok:!0,cols:t,rows:r,vx:h,vy:b,inv:x,anchorMode:y,originCenter:C}}return null}async function dy(e=15e3){return Ue.ready?!0:Ko||(Ko=(async()=>{if(await Pe.init(e),!Dn())throw new Error("MGTile: engine captured but tileObject system not found");return Ue.ready=!0,!0})(),Ko)}function py(){return Pe.hook()}function qo(e,t,n={}){nt();let r=n.ensureView!==!1,o=n.clone!==!1,{gidx:a,tv:i}=kt(Number(e),Number(t),r);if(a==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!i)return{tx:Number(e),ty:Number(t),gidx:a,tileView:null,tileObject:void 0};let s=i.tileObject;return{tx:Number(e),ty:Number(t),gidx:a,tileView:i,tileObject:o?Jt(s):s}}function my(e,t,n={}){return nt(),Kt(e,t,null,n)}function gy(e,t,n,r={}){nt();let a=qo(e,t,{...r,clone:!1}).tileView?.tileObject;Ia(a,"plant");let i=Jt(a);if(Array.isArray(i.slots)||(i.slots=[]),"plantedAt"in n&&(i.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(i.maturedAt=Number(n.maturedAt)),"species"in n&&(i.species=String(n.species)),"slotIdx"in n&&"slotPatch"in n){let s=Number(n.slotIdx)|0;if(!i.slots[s])throw new Error(`MGTile: plant slot ${s} doesn't exist`);return Ca(i.slots[s],n.slotPatch),Kt(e,t,i,r)}if("slots"in n){let s=n.slots;if(Array.isArray(s)){for(let c=0;c<s.length;c++)if(s[c]!=null){if(!i.slots[c])throw new Error(`MGTile: plant slot ${c} doesn't exist`);Ca(i.slots[c],s[c])}}else if(s&&typeof s=="object")for(let c of Object.keys(s)){let d=Number(c)|0;if(Number.isFinite(d)){if(!i.slots[d])throw new Error(`MGTile: plant slot ${d} doesn't exist`);Ca(i.slots[d],s[d])}}else throw new Error("MGTile: patch.slots must be array or object map");return Kt(e,t,i,r)}return Kt(e,t,i,r)}function fy(e,t,n,r={}){nt();let a=qo(e,t,{...r,clone:!1}).tileView?.tileObject;Ia(a,"decor");let i=Jt(a);return"rotation"in n&&(i.rotation=Number(n.rotation)),Kt(e,t,i,r)}function by(e,t,n,r={}){nt();let a=qo(e,t,{...r,clone:!1}).tileView?.tileObject;Ia(a,"egg");let i=Jt(a);return"plantedAt"in n&&(i.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(i.maturedAt=Number(n.maturedAt)),Kt(e,t,i,r)}function hy(e,t,n,r={}){nt();let o=r.ensureView!==!1,a=r.forceUpdate!==!1,i=Ma(),{gidx:s,tv:c}=kt(Number(e),Number(t),o);if(s==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!c)throw new Error("MGTile: TileView unavailable");let d=c.tileObject,l=typeof n=="function"?n(Jt(d)):n;if(c.onDataChanged(l),a&&i?.reusableContext&&typeof c.update=="function")try{c.update(i.reusableContext)}catch{}return{ok:!0,tx:Number(e),ty:Number(t),gidx:s,before:d,after:c.tileObject}}function yy(e,t,n={}){nt();let r=n.ensureView!==!1,{gidx:o,tv:a}=kt(Number(e),Number(t),r);if(o==null)throw new Error("MGTile: cols unavailable");if(!a)return{ok:!0,tx:Number(e),ty:Number(t),gidx:o,tv:null,tileObject:void 0};let i=n.clone!==!1,s=a.tileObject;return{ok:!0,tx:Number(e),ty:Number(t),gidx:o,objectType:s?.objectType??null,tileObject:i?Jt(s):s,tvKeys:Object.keys(a||{}).sort(),tileView:a}}function Zl(){return nt(),Ue.xform=uy(),Ue.xformAt=Date.now(),{ok:!!Ue.xform?.ok,xform:Ue.xform}}function vy(e,t={}){if(nt(),!e||!Number.isFinite(e.x)||!Number.isFinite(e.y))return null;let n=Number.isFinite(t.maxAgeMs)?Number(t.maxAgeMs):1500;(!Ue.xform?.ok||t.forceRebuild||Date.now()-Ue.xformAt>n)&&Zl();let r=Ue.xform;if(!r?.ok)return null;let o=e.x-r.originCenter.x,a=e.y-r.originCenter.y,i=r.inv.a*o+r.inv.b*a,s=r.inv.c*o+r.inv.d*a,c=Math.floor(i),d=Math.floor(s),l=[[c,d],[c+1,d],[c,d+1],[c+1,d+1]],u=null,p=1/0;for(let[m,g]of l){if(m<0||g<0||m>=r.cols||Number.isFinite(r.rows)&&r.rows!==null&&g>=r.rows)continue;let f=r.originCenter.x+m*r.vx.x+g*r.vy.x,h=r.originCenter.y+m*r.vx.y+g*r.vy.y,b=(e.x-f)**2+(e.y-h)**2;b<p&&(p=b,u={tx:m,ty:g,fx:i,fy:s,x:e.x,y:e.y,gidx:null})}return u?(u.gidx=Aa(u.tx,u.ty),u):null}function xy(){return["MGTile.init()","MGTile.hook()","MGTile.getTileObject(tx,ty) / inspect(tx,ty)","MGTile.setTileEmpty(tx,ty)","MGTile.setTilePlant(tx,ty,{...}) / setTileDecor / setTileEgg","MGTile.setTileObjectRaw(tx,ty,objOrFn)","MGTile.rebuildTransform() / pointToTile({x,y})"].join(`
`)}var Ko,Ue,qe,Yo=G(()=>{"use strict";et();gn();Ko=null,Ue={ready:!1,xform:null,xformAt:0};qe={init:dy,ready:()=>Ue.ready,hook:py,engine:()=>Ma(),tos:()=>Dn(),gidx:(e,t)=>Aa(Number(e),Number(t)),getTileObject:qo,inspect:yy,setTileEmpty:my,setTilePlant:gy,setTileDecor:fy,setTileEgg:by,setTileObjectRaw:hy,rebuildTransform:Zl,pointToTile:vy,help:xy}});function Xo(e,t,n){return e+(t-e)*n}function Sy(e,t,n){let r=e>>16&255,o=e>>8&255,a=e&255,i=t>>16&255,s=t>>8&255,c=t&255,d=Xo(r,i,n)|0,l=Xo(o,s,n)|0,u=Xo(a,c,n)|0;return d<<16|l<<8|u}function wy(e,t=900){let n=[],r=[e];for(;r.length&&n.length<t;){let o=r.pop();if(!o)continue;Qo(o)&&n.push(o);let a=o.children;if(Array.isArray(a))for(let i=a.length-1;i>=0;i--)r.push(a[i])}return n}function Ty(e,t=25e3){let n=[],r=[e],o=0;for(;r.length&&o++<t;){let a=r.pop();if(!a)continue;Ct(a)&&n.push(a);let i=a.children;if(Array.isArray(i))for(let s=i.length-1;s>=0;s--)r.push(i[s])}return n}function ec(e){if(!Array.isArray(e))return[];let t=new Set,n=[];for(let r of e){let o,a;if(Array.isArray(r))o=r[0],a=r[1];else if(Oa(r))o=r.x??r.tx,a=r.y??r.ty;else continue;if(o=Number(o),a=Number(a),!Number.isFinite(o)||!Number.isFinite(a))continue;o|=0,a|=0;let i=`${o},${a}`;t.has(i)||(t.add(i),n.push({x:o,y:a}))}return n}function ky(e,t){let n=String(e||"").trim();if(!n)throw new Error("MGPixi.defineTileSet: empty name");let r=ec(t);return j.tileSets.set(n,r),{ok:!0,name:n,count:r.length}}function Cy(e){return j.tileSets.delete(String(e||"").trim())}function Py(){return Array.from(j.tileSets.keys()).sort((e,t)=>e.localeCompare(t))}function tc(e){return!!(e&&(e.tileSet!=null||Array.isArray(e.tiles)))}function Ga(e){let n=qe.tos?.()?.tileViews;if(!n?.entries)throw new Error("MGPixi: TOS.tileViews not found");if(!tc(e))return{entries:Array.from(n.entries()),gidxSet:null};let r=[];if(e.tileSet!=null){let a=String(e.tileSet||"").trim(),i=j.tileSets.get(a);if(!i)throw new Error(`MGPixi: tileSet not found "${a}"`);r=i}else r=ec(e.tiles||[]);let o=new Map;for(let a of r){let i=qe.getTileObject(a.x,a.y,{ensureView:!0,clone:!1});i?.tileView&&i.gidx!=null&&o.set(i.gidx,i.tileView)}return{entries:Array.from(o.entries()),gidxSet:new Set(o.keys())}}function Ha(e){let t=j.highlights.get(e);if(!t)return!1;Me(()=>j.ticker?.remove(t.tick)),t.root&&t.baseAlpha!=null&&Ct(t.root)&&Me(()=>{t.root.alpha=t.baseAlpha});for(let n of t.tint)n.o&&Qo(n.o)&&Me(()=>{n.o.tint=n.baseTint});return j.highlights.delete(e),!0}function nc(e=null){for(let t of Array.from(j.highlights.keys()))e&&!String(t).startsWith(e)||Ha(t);return!0}function oc(e,t={}){if(Pt(),!Ea(e))throw new Error("MGPixi.highlightPulse: invalid root");let n=String(t.key||`hl:${Math.random().toString(16).slice(2)}`);if(j.highlights.has(n))return n;let r=Ct(e)?Number(e.alpha):null,o=De(Number(t.minAlpha??.12),0,1),a=De(Number(t.maxAlpha??1),0,1),i=Number(t.speed??1.25),s=(t.tint??8386303)>>>0,c=De(Number(t.tintMix??.85),0,1),d=t.deepTint!==!1,l=[];if(d)for(let m of wy(e))l.push({o:m,baseTint:m.tint});else Qo(e)&&l.push({o:e,baseTint:e.tint});let u=performance.now(),p=()=>{let m=(performance.now()-u)/1e3,g=(Math.sin(m*Math.PI*2*i)+1)/2,f=g*g*(3-2*g);r!=null&&Ct(e)&&(e.alpha=De(Xo(o,a,f)*r,0,1));let h=f*c;for(let b of l)b.o&&Qo(b.o)&&(b.o.tint=Sy(b.baseTint,s,h))};return j.ticker?.add(p),j.highlights.set(n,{root:e,tick:p,baseAlpha:r,tint:l}),n}function La(e){if(!e)return null;if(Ea(e))return e;if(!Oa(e))return null;for(let t of My){let n=e[t];if(Ea(n))return n}return null}function Ay(e,t){let n=[{o:e,d:0}],r=new Set,o=6;for(;n.length;){let{o:a,d:i}=n.shift();if(!(!a||i>o)&&!r.has(a)){if(r.add(a),Array.isArray(a)){if(a.length===t){let s=new Array(t),c=!0;for(let d=0;d<t;d++){let l=La(a[d]);if(!l){c=!1;break}s[d]=l}if(c)return s}for(let s of a)n.push({o:s,d:i+1});continue}if(Oa(a)){let s=a;for(let c of Object.keys(s))n.push({o:s[c],d:i+1})}}}return null}function Iy(e,t){let n=e?.mutations;if(!Array.isArray(n))return!1;for(let r of n)if(String(r||"").toLowerCase()===t)return!0;return!1}function rc(e,t={}){Pt();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.highlightMutation: empty mutation");let{entries:r,gidxSet:o}=Ga(t),a=`hlmut:${n}:`;if(t.clear===!0)if(!o)nc(a);else for(let u of Array.from(j.highlights.keys())){if(!u.startsWith(a))continue;let p=u.split(":"),m=Number(p[2]);o.has(m)&&Ha(u)}let i={tint:(t.tint??8386303)>>>0,minAlpha:Number(t.minAlpha??.12),maxAlpha:Number(t.maxAlpha??1),speed:Number(t.speed??1.25),tintMix:Number(t.tintMix??.85),deepTint:t.deepTint!==!1},s=0,c=0,d=0,l=0;for(let[u,p]of r){let m=p?.tileObject;if(!m||m.objectType!=="plant")continue;let g=m.slots;if(!Array.isArray(g)||g.length===0)continue;let f=!1,h=[];for(let S=0;S<g.length;S++)Iy(g[S],n)&&(h.push(S),f=!0);if(!f)continue;s++,c+=h.length;let b=p?.childView?.plantVisual||p?.childView||p,k=Ay(b,g.length);if(!k){l+=h.length;continue}for(let S of h){let x=k[S];if(!x){l++;continue}let T=`${a}${u}:${S}`;j.highlights.has(T)||(oc(x,{key:T,...i}),d++)}}return{ok:!0,mutation:n,filtered:!!o,plantsMatched:s,matchedSlots:c,newHighlights:d,failedSlots:l}}function Ey(e,t={}){Pt();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchMutation: empty mutation");let r=`watchmut:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,o=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,a=j.watches.get(r);a&&clearInterval(a);let i=setInterval(()=>{Me(()=>rc(n,{...t,clear:!1}))},o);return j.watches.set(r,i),{ok:!0,key:r,mutation:n,intervalMs:o}}function Ly(e){let t=String(e||"").trim();if(!t)return!1;if(!t.startsWith("watchmut:")){let r=t.toLowerCase(),o=0;for(let[a,i]of Array.from(j.watches.entries()))a.startsWith(`watchmut:${r}:`)&&(clearInterval(i),j.watches.delete(a),o++);return o>0}let n=j.watches.get(t);return n?(clearInterval(n),j.watches.delete(t),!0):!1}function Dy(e){let t=Array.isArray(e?.slots)?e.slots:[];return{objectType:"plant",species:e?.species??null,plantedAt:e?.plantedAt??null,maturedAt:e?.maturedAt??null,slotCount:t.length,slots:t.map((n,r)=>({idx:r,mutations:Array.isArray(n?.mutations)?n.mutations.slice():[]}))}}function Ry(e,t,n={}){Pt();let r=Number(e)|0,o=Number(t)|0,a=n.ensureView!==!1,i=qe.getTileObject(r,o,{ensureView:a,clone:!1}),s=i?.tileView||null,c=s?.tileObject,d={ok:!0,tx:r,ty:o,gidx:i?.gidx??qe.gidx?.(r,o)??null,hasTileView:!!s,objectType:c?.objectType??null,tileObject:c??null,summary:c?.objectType==="plant"?Dy(c):c?{objectType:c.objectType??null}:null,display:s?s.childView?.plantVisual||s.childView||s.displayObject||s:null};return n.log!==!1&&Me(()=>console.log("[MGPixi.inspectTile]",d)),d}function Oy(e){let t=e?.childView?.plantVisual||e?.childView?.cropVisual||e?.childView||e?.displayObject||e;return La(t)||La(e?.displayObject)||null}function ac(e){let t=j.fades.get(e);if(!t)return!1;for(let n of t.targets)n.o&&Ct(n.o)&&Number.isFinite(n.baseAlpha)&&Me(()=>{n.o.alpha=n.baseAlpha});return j.fades.delete(e),!0}function Da(e=null){for(let t of Array.from(j.fades.keys()))e&&!String(t).startsWith(e)||ac(t);return!0}function ic(e,t={}){Pt();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.clearSpeciesFade: empty species");let r=`fade:${n}:`;if(!tc(t))return Da(r);let{gidxSet:o}=Ga(t);if(!o)return Da(r);for(let a of Array.from(j.fades.keys())){if(!a.startsWith(r))continue;let i=Number(a.slice(r.length));o.has(i)&&ac(a)}return!0}function sc(e,t={}){Pt();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.fadeSpecies: empty species");let r=De(Number(t.alpha??.2),0,1),o=t.deep===!0,{entries:a,gidxSet:i}=Ga(t),s=`fade:${n}:`;t.clear===!0&&ic(n,t);let c=0,d=0,l=0,u=0;for(let[p,m]of a){let g=m?.tileObject;if(!g||g.objectType!=="plant")continue;c++;let f=String(g.species||"").trim().toLowerCase();if(!f||f!==n)continue;d++;let h=Oy(m);if(!h||!Ct(h)){u++;continue}let b=`${s}${p}`;if(j.fades.has(b)){Me(()=>{h.alpha=r}),l++;continue}let k=o?Ty(h):[h],S=[];for(let x of k)Ct(x)&&S.push({o:x,baseAlpha:Number(x.alpha)});for(let x of S)Me(()=>{x.o.alpha=r});j.fades.set(b,{targets:S}),l++}return{ok:!0,species:n,alpha:r,deep:o,filtered:!!i,plantsSeen:c,matchedPlants:d,applied:l,failed:u,totalFades:j.fades.size}}function Gy(e,t={}){Pt();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchFadeSpecies: empty species");let r=`watchfade:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,o=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,a=j.fadeWatches.get(r);a&&clearInterval(a);let i=setInterval(()=>{Me(()=>sc(n,{...t,clear:!1}))},o);return j.fadeWatches.set(r,i),{ok:!0,key:r,species:n,intervalMs:o}}function Hy(e){let t=String(e||"").trim();if(!t)return!1;if(!t.startsWith("watchfade:")){let r=t.toLowerCase(),o=0;for(let[a,i]of Array.from(j.fadeWatches.entries()))a.startsWith(`watchfade:${r}:`)&&(clearInterval(i),j.fadeWatches.delete(a),o++);return o>0}let n=j.fadeWatches.get(t);return n?(clearInterval(n),j.fadeWatches.delete(t),!0):!1}function Ra(){let e=A;return e.$PIXI=e.PIXI||null,e.$app=j.app||null,e.$renderer=j.renderer||null,e.$stage=j.stage||null,e.$ticker=j.ticker||null,e.__MG_PIXI__={PIXI:e.$PIXI,app:e.$app,renderer:e.$renderer,stage:e.$stage,ticker:e.$ticker,ready:j.ready},e.__MG_PIXI__}function Pt(){if(!j.ready)throw new Error("MGPixi: call MGPixi.init() first")}async function Ny(e=15e3){if(j.ready)return Ra(),!0;if(await Pe.init(e),j.app=Pe.app(),j.ticker=Pe.ticker(),j.renderer=Pe.renderer(),j.stage=Pe.stage(),!j.app||!j.ticker)throw new Error("MGPixi: PIXI app/ticker not found");return j.ready=!0,Ra(),!0}var j,Oa,Ea,Qo,Ct,My,Rn,Na=G(()=>{"use strict";et();ye();gn();Yo();j={ready:!1,app:null,renderer:null,stage:null,ticker:null,tileSets:new Map,highlights:new Map,watches:new Map,fades:new Map,fadeWatches:new Map},Oa=e=>!!e&&typeof e=="object"&&!Array.isArray(e),Ea=e=>!!(e&&typeof e.getBounds=="function"&&("parent"in e||"children"in e)),Qo=e=>!!(e&&typeof e.tint=="number"),Ct=e=>!!(e&&typeof e.alpha=="number");My=["plantVisual","cropVisual","slotVisual","slotView","displayObject","view","container","root","sprite","gfx","graphics"];Rn={init:Ny,ready:()=>j.ready,expose:Ra,get app(){return j.app},get renderer(){return j.renderer},get stage(){return j.stage},get ticker(){return j.ticker},get PIXI(){return A.PIXI||null},defineTileSet:ky,deleteTileSet:Cy,listTileSets:Py,highlightPulse:oc,stopHighlight:Ha,clearHighlights:nc,highlightMutation:rc,watchMutation:Ey,stopWatchMutation:Ly,inspectTile:Ry,fadeSpecies:sc,clearSpeciesFade:ic,clearFades:Da,watchFadeSpecies:Gy,stopWatchFadeSpecies:Hy}});function Nn(){if(!$.ready)throw new Error("MGAudio not ready yet")}function cc(e,t=NaN){try{let n=localStorage.getItem(e);if(n==null)return t;let r;try{r=JSON.parse(n)}catch{r=n}if(typeof r=="number"&&Number.isFinite(r))return r;if(typeof r=="string"){let o=parseFloat(r);if(Number.isFinite(o))return o}}catch{}return t}function Hn(e){let t=_y[e],n=Wy[e];if(!t)return{atom:Gn,vol100:er(Gn)};let r=cc(t,NaN);if(Number.isFinite(r)){let a=De(r,0,1);return{atom:a,vol100:er(a)}}if(n){let a=cc(n,NaN);if(Number.isFinite(a)){let i=De(a,0,1);return{atom:i,vol100:er(i)}}}let o=Gn;return{atom:o,vol100:er(o)}}function Fy(e){let t=Number(e);if(!Number.isFinite(t))return null;if(t<=0)return 0;let r=(De(t,1,100)-1)/99;return On+r*(Gn-On)}function er(e){let t=De(Number(e),0,1);if(t<=On)return 0;let n=(t-On)/(Gn-On);return Math.round(1+n*99)}function uc(e,t){if(t==null)return Hn(e).atom;let n=Fy(t);return n===null?Hn(e).atom:Rr(n)}async function dc(){let e=$.ctx;if(e)return e;let t=lc.AudioContext||lc.webkitAudioContext;if(!t)throw new Error("WebAudio not supported");let n=new t;return $.ctx=n,n}async function pc(){if($.ctx&&$.ctx.state==="suspended")try{await $.ctx.resume()}catch{}}function By(e){let t=new Map,n=(r,o)=>{t.has(r)||t.set(r,[]),t.get(r).push(o)};for(let r of Object.keys(e||{})){let o=/^(.*)_([A-Z])$/.exec(r);o?.[1]?n(o[1],r):n(r,r)}for(let[r,o]of Array.from(t.entries()))o.sort((a,i)=>a.localeCompare(i)),t.set(r,o);$.sfx.groups=t}function jy(e){let t=$.sfx.atlas;if(!t)throw new Error("SFX atlas not loaded");if(t[e])return e;let n=$.sfx.groups.get(e);if(n?.length)return n[Math.random()*n.length|0];throw new Error(`Unknown sfx/group: ${e}`)}async function Uy(){if($.sfx.buffer)return $.sfx.buffer;if(!$.sfx.mp3Url)throw new Error("SFX mp3 url missing");let e=await dc();await pc();let n=await(await ho($.sfx.mp3Url)).arrayBuffer(),r=await new Promise((o,a)=>{let i=e.decodeAudioData(n,o,a);i?.then&&i.then(o,a)});return $.sfx.buffer=r,r}async function zy(e,t={}){if(!$.ready)throw new Error("MGAudio not ready yet");let n=String(e||"").trim();if(!n)throw new Error("Missing sfx name");let r=jy(n),o=$.sfx.atlas[r];if(!o)throw new Error(`Missing segment for sfx: ${r}`);let a=await dc();await pc();let i=await Uy(),s=Math.max(0,+o.start||0),c=Math.max(s,+o.end||s),d=Math.max(.01,c-s),l=uc("sfx",t.volume),u=a.createGain();u.gain.value=l,u.connect(a.destination);let p=a.createBufferSource();return p.buffer=i,p.connect(u),p.start(0,s,d),{name:r,source:p,start:s,end:c,duration:d,volume:l}}function mc(e){if(e!=="music"&&e!=="ambience")return!1;let t=$.tracks[e];if(t){try{t.pause()}catch{}try{t.src=""}catch{}}return $.tracks[e]=null,!0}function Vy(e,t,n={}){if(!$.ready)throw new Error("MGAudio not ready yet");if(e!=="music"&&e!=="ambience")throw new Error(`Invalid category: ${e}`);let r=$.urls[e].get(t);if(!r)throw new Error(`Unknown ${e}: ${t}`);mc(e);let o=new Audio(r);return o.loop=!!n.loop,o.volume=uc(e,n.volume),o.preload="auto",o.play().catch(()=>{}),$.tracks[e]=o,o}async function $y(e,t,n={}){let r=String(e||"").trim(),o=String(t||"").trim();if(!r||!o)throw new Error("play(category, asset) missing args");if(r==="sfx")return zy(o,n);if(r==="music"||r==="ambience")return Vy(r,o,n);throw new Error(`Unknown category: ${r}`)}function Ky(e,t={}){let n=String(e||"").trim();return n==="music"||n==="ambience"?Array.from($.urls[n].keys()).sort():n==="sfx"?$.sfx.atlas?t.groups?Array.from($.sfx.groups.keys()).sort():Object.keys($.sfx.atlas).sort():[]:[]}function Jy(){return $.tracks.music&&($.tracks.music.volume=Hn("music").atom),$.tracks.ambience&&($.tracks.ambience.volume=Hn("ambience").atom),!0}function qy(){return Nn(),["sfx","music","ambience"]}function Yy(){return Nn(),Array.from($.sfx.groups.keys()).sort((e,t)=>e.localeCompare(t))}function Xy(e,t){Nn();let n=String(e||"").trim().toLowerCase(),r=String(t||"").trim();if(!r||n!=="music"&&n!=="ambience")return!1;let o=$.urls[n],a=r.toLowerCase();for(let i of o.keys())if(i.toLowerCase()===a)return!0;return!1}function Qy(e){Nn();let t=String(e||"").trim();if(!t)return!1;let n=t.toLowerCase();for(let r of $.sfx.groups.keys())if(r.toLowerCase()===n)return!0;return!1}function Zy(e,t){Nn();let n=String(e||"").trim().toLowerCase(),r=String(t||"").trim();if(!r)throw new Error("getTrackUrl(category, name) missing name");if(n!=="music"&&n!=="ambience")throw new Error(`Invalid category: ${e}`);let o=$.urls[n],a=r.toLowerCase();for(let[i,s]of o.entries())if(i.toLowerCase()===a)return s;return null}async function ev(){return $.ready?!0:Zo||(Zo=(async()=>{$.baseUrl=await Be.base();let e=await Re.load($.baseUrl),t=Re.getBundle(e,"audio");if(!t)throw new Error("No audio bundle in manifest");for(let n of t.assets||[])for(let r of n.src||[]){if(typeof r!="string")continue;let o=/^audio\/(ambience|music)\/(.+)\.mp3$/i.exec(r);if(o){let a=o[1].toLowerCase(),i=o[2];$.urls[a].set(i,Ae($.baseUrl,r));continue}/^audio\/sfx\/sfx\.mp3$/i.test(r)&&($.sfx.mp3Url=Ae($.baseUrl,r)),/^audio\/sfx\/sfx\.json$/i.test(r)&&($.sfx.atlasUrl=Ae($.baseUrl,r))}if(!$.sfx.atlasUrl)throw new Error("Missing audio/sfx/sfx.json in manifest");return $.sfx.atlas=await Nt($.sfx.atlasUrl),By($.sfx.atlas),$.ready=!0,!0})(),Zo)}var lc,_y,Wy,On,Gn,Zo,$,_n,_a=G(()=>{"use strict";ye();et();fn();_t();Wt();vn();lc=A??window,_y={sfx:"soundEffectsVolume",music:"musicVolume",ambience:"ambienceVolume"},Wy={sfx:"soundEffectsVolumeAtom",music:"musicVolumeAtom",ambience:"ambienceVolumeAtom"},On=.001,Gn=.2,Zo=null,$={ready:!1,baseUrl:null,urls:{ambience:new Map,music:new Map},sfx:{mp3Url:null,atlasUrl:null,atlas:null,groups:new Map,buffer:null},tracks:{ambience:null,music:null},ctx:null};_n={init:ev,ready:()=>$.ready,play:$y,stop:mc,list:Ky,refreshVolumes:Jy,categoryVolume:Hn,getCategories:qy,getGroups:Yy,hasTrack:Xy,hasGroup:Qy,getTrackUrl:Zy}});function tv(){if(pe.overlay)return pe.overlay;let e=Wa.createElement("div");return e.id="MG_COSMETIC_OVERLAY",e.style.cssText=["position:fixed","left:0","top:0","width:100vw","height:100vh","pointer-events:none","z-index:99999999"].join(";"),Wa.documentElement.appendChild(e),pe.overlay=e,e}function nv(){let e=pe.defaultParent;if(!e)return null;try{return typeof e=="function"?e():e}catch{return null}}function Fa(e){let t=String(e||"").trim();return t?(t=t.replace(/^cosmetic\//i,""),t=t.replace(/\.png$/i,""),t):""}function ov(e,t){if(t===void 0){let a=Fa(e),i=a.indexOf("_");return i<0?{cat:"",asset:a,base:a}:{cat:a.slice(0,i),asset:a.slice(i+1),base:a}}let n=String(e||"").trim(),r=Fa(t),o=r.includes("_")?r:`${n}_${r}`;if(r.includes("_")&&!n){let a=r.indexOf("_");return{cat:r.slice(0,a),asset:r.slice(a+1),base:r}}return{cat:n,asset:r.replace(/^.+?_/,""),base:o}}function rv(){return Array.from(pe.byCat.keys()).sort((e,t)=>e.localeCompare(t))}function av(e){let t=pe.byCat.get(String(e||"").trim());return t?Array.from(t.keys()).sort((n,r)=>n.localeCompare(r)):[]}function Ba(e,t){let{cat:n,asset:r,base:o}=ov(e,t),a=pe.byBase.get(o);if(a)return a;let s=pe.byCat.get(n)?.get(r);if(s)return s;if(!pe.baseUrl)throw new Error("MGCosmetic not initialized");if(!o)throw new Error("Invalid cosmetic name");return Ae(pe.baseUrl,`cosmetic/${o}.png`)}function ja(e,t,n){if(!pe.ready)throw new Error("MGCosmetic not ready yet");let r,o;typeof t=="object"&&t!==null?(r=t,o=void 0):typeof t=="string"?(o=t,r=n||{}):(o=void 0,r=n||{});let a=o!==void 0?Ba(e,o):Ba(e),i=Wa.createElement("img");if(i.decoding="async",i.loading="eager",i.src=a,i.alt=r.alt!=null?String(r.alt):Fa(o??e),r.className&&(i.className=String(r.className)),r.width!=null&&(i.style.width=String(r.width)),r.height!=null&&(i.style.height=String(r.height)),r.opacity!=null&&(i.style.opacity=String(r.opacity)),r.style&&typeof r.style=="object")for(let[s,c]of Object.entries(r.style))try{i.style[s]=String(c)}catch{}return i}function iv(e,t,n){let r,o;typeof t=="object"&&t!==null?(r=t,o=void 0):typeof t=="string"?(o=t,r=n||{}):(o=void 0,r=n||{});let a=r.parent||nv()||tv(),i=o!==void 0?ja(e,o,r):ja(e,r);if(a===pe.overlay||r.center||r.x!=null||r.y!=null||r.absolute){i.style.position="absolute",i.style.pointerEvents="none",i.style.zIndex=String(r.zIndex??999999);let c=r.scale??1,d=r.rotation??0;if(r.center)i.style.left="50%",i.style.top="50%",i.style.transform=`translate(-50%, -50%) scale(${c}) rotate(${d}rad)`;else{let l=r.x??innerWidth/2,u=r.y??innerHeight/2;i.style.left=`${l}px`,i.style.top=`${u}px`,i.style.transform=`scale(${c}) rotate(${d}rad)`,r.anchor==="center"&&(i.style.transform=`translate(-50%, -50%) scale(${c}) rotate(${d}rad)`)}}return a.appendChild(i),pe.live.add(i),i.__mgDestroy=()=>{try{i.remove()}catch{}pe.live.delete(i)},i}function sv(e){return pe.defaultParent=e,!0}function lv(){for(let e of Array.from(pe.live))e.__mgDestroy?.()}async function cv(){return pe.ready?!0:tr||(tr=(async()=>{pe.baseUrl=await Be.base();let e=await Re.load(pe.baseUrl),t=Re.getBundle(e,"cosmetic");if(!t)throw new Error("No 'cosmetic' bundle in manifest");pe.byCat.clear(),pe.byBase.clear();for(let n of t.assets||[])for(let r of n.src||[]){if(typeof r!="string"||!/^cosmetic\/.+\.png$/i.test(r))continue;let a=r.split("/").pop().replace(/\.png$/i,""),i=a.indexOf("_");if(i<0)continue;let s=a.slice(0,i),c=a.slice(i+1),d=Ae(pe.baseUrl,r);pe.byBase.set(a,d),pe.byCat.has(s)||pe.byCat.set(s,new Map),pe.byCat.get(s).set(c,d)}return pe.ready=!0,!0})(),tr)}var Wa,tr,pe,Wn,Ua=G(()=>{"use strict";ye();_t();Wt();vn();Wa=A?.document??document,tr=null,pe={ready:!1,baseUrl:null,byCat:new Map,byBase:new Map,overlay:null,live:new Set,defaultParent:null};Wn={init:cv,ready:()=>pe.ready,categories:rv,list:av,url:Ba,create:ja,show:iv,attach:sv,clear:lv}});var gc=G(()=>{"use strict"});function uv(){return Fn||(Fn=new nr),Fn}function dv(){Fn&&(Fn=null)}var nr,Fn,fc=G(()=>{"use strict";nr=class{constructor(){ne(this,"achievements",new Map);ne(this,"data");ne(this,"storageKey","gemini_achievements");ne(this,"onUnlockCallbacks",[]);ne(this,"onProgressCallbacks",[]);this.data=this.loadData()}loadData(){try{let t=localStorage.getItem(this.storageKey);if(t)return JSON.parse(t)}catch(t){console.warn("[Achievements] Failed to load data:",t)}return{unlocked:{},progress:{}}}saveData(){try{localStorage.setItem(this.storageKey,JSON.stringify(this.data))}catch(t){console.warn("[Achievements] Failed to save data:",t)}}register(t){this.achievements.set(t.id,t),this.data.progress[t.id]||(this.data.progress[t.id]={current:0,target:t.target,percentage:0})}registerMany(t){for(let n of t)this.register(n)}async checkAchievement(t){let n=this.achievements.get(t);if(!n)throw new Error(`Achievement not found: ${t}`);let r=this.isUnlocked(t),o=await n.checkProgress(),a={current:o,target:n.target,percentage:Math.min(100,Math.floor(o/n.target*100))},i=this.data.progress[t];this.data.progress[t]=a;let s=o>=n.target;return!r&&s?this.unlock(t,a):s||this.triggerProgressCallbacks({achievement:n,progress:a,previousProgress:i}),this.saveData(),{id:t,wasUnlocked:r,isUnlocked:s,progress:a}}async checkAllAchievements(){let t=[];for(let n of this.achievements.keys()){let r=await this.checkAchievement(n);t.push(r)}return t}unlock(t,n){let r=this.achievements.get(t);if(!r)return;let o={achievementId:t,unlockedAt:Date.now(),progress:n};this.data.unlocked[t]=o,this.saveData(),this.triggerUnlockCallbacks({achievement:r,unlockedAt:o.unlockedAt,progress:n})}isUnlocked(t){return!!this.data.unlocked[t]}getAchievement(t){return this.achievements.get(t)||null}getAllAchievements(){return Array.from(this.achievements.values())}getAchievementsByCategory(t){return Array.from(this.achievements.values()).filter(n=>n.category===t)}getAchievementsByRarity(t){return Array.from(this.achievements.values()).filter(n=>n.rarity===t)}getUnlockedAchievements(){return Object.values(this.data.unlocked)}getLockedAchievements(){return Array.from(this.achievements.values()).filter(t=>!this.isUnlocked(t.id)&&!t.hidden)}getProgress(t){return this.data.progress[t]||null}getCompletionPercentage(){let t=this.achievements.size,n=Object.keys(this.data.unlocked).length;return t>0?Math.floor(n/t*100):0}getCompletionStats(){let t=this.achievements.size,n=Object.keys(this.data.unlocked).length,r=t-n,o=this.getCompletionPercentage();return{total:t,unlocked:n,locked:r,percentage:o}}onUnlock(t){return this.onUnlockCallbacks.push(t),()=>{let n=this.onUnlockCallbacks.indexOf(t);n!==-1&&this.onUnlockCallbacks.splice(n,1)}}onProgress(t){return this.onProgressCallbacks.push(t),()=>{let n=this.onProgressCallbacks.indexOf(t);n!==-1&&this.onProgressCallbacks.splice(n,1)}}triggerUnlockCallbacks(t){for(let n of this.onUnlockCallbacks)try{n(t)}catch(r){console.warn("[Achievements] Unlock callback error:",r)}}triggerProgressCallbacks(t){for(let n of this.onProgressCallbacks)try{n(t)}catch(r){console.warn("[Achievements] Progress callback error:",r)}}reset(){this.data={unlocked:{},progress:{}};for(let t of this.achievements.values())this.data.progress[t.id]={current:0,target:t.target,percentage:0};this.saveData()}exportData(){return JSON.stringify(this.data,null,2)}importData(t){try{let n=JSON.parse(t);return this.data=n,this.saveData(),!0}catch(n){return console.warn("[Achievements] Failed to import data:",n),!1}}},Fn=null});var or={};Ot(or,{AchievementManager:()=>nr,destroyAchievementManager:()=>dv,getAchievementManager:()=>uv});var bc=G(()=>{"use strict";gc();fc()});function rr(e){let t=1,n=0,r=0;for(let o of e)o==="Gold"||o==="Rainbow"?o==="Rainbow"?t=qt.Rainbow:t===1&&(t=qt.Gold):o in qt&&(n+=qt[o],r++);return t*(1+n-r)}function za(e){return qt[e]??null}function Va(e){return pv.has(e)}function hc(e){return mv.has(e)}function gv(){return Object.keys(qt)}function fv(e){let t=za(e);return t===null?null:{name:e,value:t,type:Va(e)?"growth":"environmental"}}var qt,pv,mv,ar=G(()=>{"use strict";qt={Gold:25,Rainbow:50,Frozen:10,Chilled:5,Wet:2},pv=new Set(["Gold","Rainbow"]),mv=new Set(["Frozen","Chilled","Wet"])});function yc(e,t){let n=ir(e);if(!n)return 50;let r=n.maxScale;if(t<=1)return 50;if(t>=r)return 100;let o=(t-1)/(r-1);return Math.floor(50+50*o)}function $a(e,t,n){let r=ir(e);if(!r)return 0;let o=r.baseSellPrice,a=rr(n);return Math.round(o*t*a)}function vc(e,t,n){if(n>=t)return 100;if(n<=e)return 0;let r=t-e,o=n-e;return Math.floor(o/r*100)}function xc(e,t){return t>=e}function bv(e,t){let n=Math.max(0,e-t);return Math.floor(n/1e3)}function ir(e){let t=le.get("plants");if(!t)return null;let n=t[e];return n?.crop?{baseSellPrice:n.crop.baseSellPrice??0,maxScale:n.crop.maxScale??1,growTime:n.crop.growTime??0}:null}function hv(e){return e.reduce((t,n)=>t+$a(n.species,n.targetScale,n.mutations),0)}var Ka=G(()=>{"use strict";dt();ar()});function Mt(e){return e/Sc}function At(e,t){let n=Lt(e);if(!n)return Ja;let r=n.maxScale;if(t<=1)return Ja;if(t>=r)return yv;let o=(t-1)/(r-1);return Math.floor(Ja+20*o)}function It(e,t,n){let r=Lt(e);if(!r)return n-Bn;let o=r.hoursToMature,a=t/Sc,i=Bn/o,s=Math.min(i*a,Bn),c=n-Bn;return Math.floor(c+s)}function Et(e,t){let n=Lt(e);return n?t>=n.hoursToMature:!1}function sr(e){let t=Lt(e);return t?Bn/t.hoursToMature:0}function qa(e,t,n){let r=t-e;return r<=0||n<=0?0:r/n}function vv(e,t){let n=Lt(e);if(!n)return 0;let r=n.hoursToMature-t;return Math.max(0,r)}function Lt(e){let t=le.get("pets");if(!t)return null;let n=t[e];return n?{hoursToMature:n.hoursToMature??0,maxScale:n.maxScale??1,abilities:n.abilities??[]}:null}function Ya(e,t){return t<=0?1:Math.min(1,e/t)}var Sc,Ja,yv,Bn,Xa=G(()=>{"use strict";dt();Sc=3600,Ja=80,yv=100,Bn=30});var lr={};Ot(lr,{calculateCropProgress:()=>vc,calculateCropSellPrice:()=>$a,calculateCropSize:()=>yc,calculateCurrentStrength:()=>It,calculateHoursToMature:()=>vv,calculateHoursToMaxStrength:()=>qa,calculateMaxStrength:()=>At,calculateMutationMultiplier:()=>rr,calculatePetAge:()=>Mt,calculateStrengthPerHour:()=>sr,calculateStrengthProgress:()=>Ya,calculateTimeRemaining:()=>bv,calculateTotalCropValue:()=>hv,getAllMutationNames:()=>gv,getCropData:()=>ir,getMutationInfo:()=>fv,getMutationValue:()=>za,getPetData:()=>Lt,isCropReady:()=>xc,isEnvironmentalMutation:()=>hc,isGrowthMutation:()=>Va,isPetMature:()=>Et});var cr=G(()=>{"use strict";Ka();Xa();ar();Ka();Xa();ar()});var Qa={};Ot(Qa,{calculatePetStrength:()=>wc,enrichPetWithStrength:()=>Tc,enrichPetsWithStrength:()=>kc,getPetStrengthStats:()=>xv});function wc(e){let t=Mt(e.xp),n=At(e.petSpecies,e.targetScale),r=It(e.petSpecies,e.xp,n),o=Et(e.petSpecies,t),a=sr(e.petSpecies),i=qa(r,n,a),s=Ya(r,n);return{current:r,max:n,progress:s,age:t,isMature:o,strengthPerHour:a,hoursToMax:i}}function Tc(e){return{...e,strength:wc(e)}}function kc(e){return e.map(Tc)}function xv(e){if(e.length===0)return{averageCurrent:0,averageMax:0,totalMature:0,totalImmature:0,strongestPet:null,weakestPet:null};let t=kc(e),n=t.reduce((c,d)=>c+d.strength.current,0),r=t.reduce((c,d)=>c+d.strength.max,0),o=t.filter(c=>c.strength.isMature).length,a=t.length-o,i=t.reduce((c,d)=>d.strength.max>(c?.strength.max||0)?d:c,t[0]),s=t.reduce((c,d)=>d.strength.max<(c?.strength.max||1/0)?d:c,t[0]);return{averageCurrent:Math.round(n/t.length),averageMax:Math.round(r/t.length),totalMature:o,totalImmature:a,strongestPet:i,weakestPet:s}}var Cc=G(()=>{"use strict";cr()});var Pc=G(()=>{"use strict"});function Te(e,t){if(e===t)return!0;if(e===null||t===null)return e===t;if(typeof e!=typeof t)return!1;if(typeof e!="object")return e===t;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return!1;for(let i=0;i<e.length;i++)if(!Te(e[i],t[i]))return!1;return!0}if(Array.isArray(e)||Array.isArray(t))return!1;let n=e,r=t,o=Object.keys(n),a=Object.keys(r);if(o.length!==a.length)return!1;for(let i of o)if(!Object.prototype.hasOwnProperty.call(r,i)||!Te(n[i],r[i]))return!1;return!0}var mt=G(()=>{"use strict";We()});function Sv(e){let t=e.currentGardenTile;return{globalIndex:e.globalTileIndex,localIndex:t?.localTileIndex??null}}function wv(e){return{type:e.currentGardenTile?.tileType??null,isEmpty:e.gardenObject===null}}function Tv(e){let t=e.currentGardenTile;return{name:e.gardenName,isOwner:e.isInMyGarden??!1,playerSlotIndex:t?.userSlotIdx??null}}function kv(e){let t=e.gardenObject;return t?{type:t.objectType,data:t,isMature:e.isMature??!1}:{type:null,data:null,isMature:!1}}function Cv(e){let t=e.gardenObject;if(!t||t.objectType!=="plant")return null;let n=t,r=e.sortedSlotIndices??[];return{species:n.species,slots:n.slots??[],currentSlotIndex:e.currentGrowSlotIndex,sortedSlotIndices:r,nextHarvestSlotIndex:r.length>0?r[0]:null}}function Ic(e){return{position:Sv(e),tile:wv(e),garden:Tv(e),object:kv(e),plant:Cv(e)}}function Ec(e){return JSON.stringify({globalIndex:e.position.globalIndex,localIndex:e.position.localIndex,tileType:e.tile.type,isEmpty:e.tile.isEmpty,gardenName:e.garden.name,isOwner:e.garden.isOwner,playerSlotIndex:e.garden.playerSlotIndex,objectType:e.object.type,isMature:e.object.isMature,plantSpecies:e.plant?.species??null,slotCount:e.plant?.slots.length??0})}function Pv(e,t){return e.type!==t.type||e.isMature!==t.isMature?!0:e.data===null&&t.data===null?!1:e.data===null||t.data===null?!0:!Te(e.data,t.data)}function Mv(e,t){return e===null&&t===null?!1:e===null||t===null||e.species!==t.species||e.currentSlotIndex!==t.currentSlotIndex||e.nextHarvestSlotIndex!==t.nextHarvestSlotIndex||e.slots.length!==t.slots.length?!0:!Te(e.sortedSlotIndices,t.sortedSlotIndices)}function Av(e,t){return e.name!==t.name||e.isOwner!==t.isOwner||e.playerSlotIndex!==t.playerSlotIndex}function Iv(){let e=Ac,t=Ac,n=!1,r=[],o={all:new Set,stable:new Set,object:new Set,plantInfo:new Set,garden:new Set},a={},i=Object.keys(Mc),s=new Set;function c(){if(s.size<i.length)return;let l=Ic(a);if(!Te(e,l)&&(t=e,e=l,!!n)){for(let u of o.all)u(e,t);if(Ec(t)!==Ec(e))for(let u of o.stable)u(e,t);if(Pv(t.object,e.object)){let u={current:e.object,previous:t.object};for(let p of o.object)p(u)}if(Mv(t.plant,e.plant)){let u={current:e.plant,previous:t.plant};for(let p of o.plantInfo)p(u)}if(Av(t.garden,e.garden)){let u={current:e.garden,previous:t.garden};for(let p of o.garden)p(u)}}}async function d(){if(n)return;let l=i.map(async u=>{let p=Mc[u],m=await te.subscribe(p,g=>{a[u]=g,s.add(u),c()});r.push(m)});await Promise.all(l),n=!0,s.size===i.length&&(e=Ic(a))}return d(),{get(){return e},subscribe(l,u){return o.all.add(l),u?.immediate!==!1&&n&&s.size===i.length&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,u){return o.stable.add(l),u?.immediate!==!1&&n&&s.size===i.length&&l(e,e),()=>o.stable.delete(l)},subscribeObject(l,u){return o.object.add(l),u?.immediate&&n&&s.size===i.length&&l({current:e.object,previous:e.object}),()=>o.object.delete(l)},subscribePlantInfo(l,u){return o.plantInfo.add(l),u?.immediate&&n&&s.size===i.length&&l({current:e.plant,previous:e.plant}),()=>o.plantInfo.delete(l)},subscribeGarden(l,u){return o.garden.add(l),u?.immediate&&n&&s.size===i.length&&l({current:e.garden,previous:e.garden}),()=>o.garden.delete(l)},destroy(){for(let l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.object.clear(),o.plantInfo.clear(),o.garden.clear(),n=!1}}}function ei(){return Za||(Za=Iv()),Za}var Mc,Ac,Za,ti=G(()=>{"use strict";We();mt();Mc={currentGardenTile:"myCurrentGardenTileAtom",globalTileIndex:"myCurrentGlobalTileIndexAtom",gardenObject:"myCurrentGardenObjectAtom",isMature:"isGardenObjectMatureAtom",isInMyGarden:"isInMyGardenAtom",gardenName:"currentGardenNameAtom",sortedSlotIndices:"myCurrentSortedGrowSlotIndicesAtom",currentGrowSlotIndex:"myCurrentGrowSlotIndexAtom"},Ac={position:{globalIndex:null,localIndex:null},tile:{type:null,isEmpty:!0},garden:{name:null,isOwner:!1,playerSlotIndex:null},object:{type:null,data:null,isMature:!1},plant:null};Za=null});function Dc(e,t){let n=Mt(e.xp),r=At(e.petSpecies,e.targetScale),o=It(e.petSpecies,e.xp,r),a=Et(e.petSpecies,n);return{id:e.id,petSpecies:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,mutations:[...e.mutations],targetScale:e.targetScale,abilities:[...e.abilities],location:t,position:null,lastAbilityTrigger:null,growthStage:n,currentStrength:o,maxStrength:r,isMature:a}}function Ev(e,t){let r=t[e.slot.id]?.lastAbilityTrigger??null,o=Mt(e.slot.xp),a=At(e.slot.petSpecies,e.slot.targetScale),i=It(e.slot.petSpecies,e.slot.xp,a),s=Et(e.slot.petSpecies,o);return{id:e.slot.id,petSpecies:e.slot.petSpecies,name:e.slot.name,xp:e.slot.xp,hunger:e.slot.hunger,mutations:[...e.slot.mutations],targetScale:e.slot.targetScale,abilities:[...e.slot.abilities],location:"active",position:e.position?{x:e.position.x,y:e.position.y}:null,lastAbilityTrigger:r,growthStage:o,currentStrength:i,maxStrength:a,isMature:s}}function Rc(e){let t=new Set,n=[];for(let c of e.active??[]){let d=Ev(c,e.slotInfos??{});n.push(d),t.add(d.id)}let r=[];for(let c of e.inventory??[]){if(t.has(c.id))continue;let d=Dc(c,"inventory");r.push(d),t.add(d.id)}let o=[];for(let c of e.hutch??[]){if(t.has(c.id))continue;let d=Dc(c,"hutch");o.push(d),t.add(d.id)}let a=[...n,...r,...o],i=e.expandedPetSlotId??null,s=i?a.find(c=>c.id===i)??null:null;return{all:a,byLocation:{inventory:r,hutch:o,active:n},counts:{inventory:r.length,hutch:o.length,active:n.length,total:a.length},expandedPetSlotId:i,expandedPet:s}}function Lv(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}function Gc(e){return JSON.stringify({id:e.id,petSpecies:e.petSpecies,name:e.name,mutations:e.mutations,abilities:e.abilities,location:e.location})}function Dv(e,t){if(e.all.length!==t.all.length)return!1;let n=e.all.map(Gc),r=t.all.map(Gc);return Lv(n,r)}function Rv(e,t){let n=[],r=new Map(e.all.map(o=>[o.id,o]));for(let o of t.all){let a=r.get(o.id);a&&a.location!==o.location&&n.push({pet:o,from:a.location,to:o.location})}return n}function Ov(e,t){let n=[],r=new Map(e.all.map(o=>[o.id,o]));for(let o of t.all){if(!o.lastAbilityTrigger)continue;let i=r.get(o.id)?.lastAbilityTrigger;(!i||i.abilityId!==o.lastAbilityTrigger.abilityId||i.performedAt!==o.lastAbilityTrigger.performedAt)&&n.push({pet:o,trigger:o.lastAbilityTrigger})}return n}function Gv(e,t){let n=new Set(e.all.map(i=>i.id)),r=new Set(t.all.map(i=>i.id)),o=t.all.filter(i=>!n.has(i.id)),a=e.all.filter(i=>!r.has(i.id));return o.length===0&&a.length===0?null:{added:o,removed:a,counts:t.counts}}function Hv(e,t){let n=[],r=new Map(e.all.map(o=>[o.id,o]));for(let o of t.all){let a=r.get(o.id);a&&o.growthStage>a.growthStage&&n.push({pet:o,previousStage:a.growthStage,newStage:o.growthStage})}return n}function Nv(e,t){let n=[],r=new Map(e.all.map(o=>[o.id,o]));for(let o of t.all){let a=r.get(o.id);a&&o.currentStrength>a.currentStrength&&n.push({pet:o,previousStrength:a.currentStrength,newStrength:o.currentStrength})}return n}function _v(e,t){let n=[],r=new Map(e.all.map(o=>[o.id,o]));for(let o of t.all){let a=r.get(o.id);a&&o.currentStrength===o.maxStrength&&a.currentStrength<a.maxStrength&&n.push({pet:o})}return n}function Wv(){let e=Oc,t=Oc,n=!1,r=[],o={all:new Set,stable:new Set,location:new Set,ability:new Set,count:new Set,expandedPet:new Set,growth:new Set,strengthGain:new Set,maxStrength:new Set},a={},i=Object.keys(Lc),s=new Set;function c(){if(s.size<i.length)return;let l=Rc(a);if(Te(e,l)||(t=e,e=l,!n))return;for(let b of o.all)b(e,t);if(!Dv(t,e))for(let b of o.stable)b(e,t);let u=Rv(t,e);for(let b of u)for(let k of o.location)k(b);let p=Ov(t,e);for(let b of p)for(let k of o.ability)k(b);let m=Gv(t,e);if(m)for(let b of o.count)b(m);let g=Hv(t,e);for(let b of g)for(let k of o.growth)k(b);let f=Nv(t,e);for(let b of f)for(let k of o.strengthGain)k(b);let h=_v(t,e);for(let b of h)for(let k of o.maxStrength)k(b);if(t.expandedPetSlotId!==e.expandedPetSlotId){let b={current:e.expandedPet,previous:t.expandedPet,currentId:e.expandedPetSlotId,previousId:t.expandedPetSlotId};for(let k of o.expandedPet)k(b)}}async function d(){if(n)return;let l=i.map(async u=>{let p=Lc[u],m=await te.subscribe(p,g=>{a[u]=g,s.add(u),c()});r.push(m)});await Promise.all(l),n=!0,s.size===i.length&&(e=Rc(a))}return d(),{get(){return e},subscribe(l,u){return o.all.add(l),u?.immediate!==!1&&n&&s.size===i.length&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,u){return o.stable.add(l),u?.immediate!==!1&&n&&s.size===i.length&&l(e,e),()=>o.stable.delete(l)},subscribeLocation(l,u){if(o.location.add(l),u?.immediate&&n&&s.size===i.length)for(let p of e.all)l({pet:p,from:p.location,to:p.location});return()=>o.location.delete(l)},subscribeAbility(l,u){if(o.ability.add(l),u?.immediate&&n&&s.size===i.length)for(let p of e.all)p.lastAbilityTrigger&&l({pet:p,trigger:p.lastAbilityTrigger});return()=>o.ability.delete(l)},subscribeCount(l,u){return o.count.add(l),u?.immediate&&n&&s.size===i.length&&l({added:e.all,removed:[],counts:e.counts}),()=>o.count.delete(l)},subscribeExpandedPet(l,u){return o.expandedPet.add(l),u?.immediate&&n&&s.size===i.length&&l({current:e.expandedPet,previous:e.expandedPet,currentId:e.expandedPetSlotId,previousId:e.expandedPetSlotId}),()=>o.expandedPet.delete(l)},subscribeGrowth(l,u){if(o.growth.add(l),u?.immediate&&n&&s.size===i.length)for(let p of e.all)l({pet:p,previousStage:p.growthStage,newStage:p.growthStage});return()=>o.growth.delete(l)},subscribeStrengthGain(l,u){if(o.strengthGain.add(l),u?.immediate&&n&&s.size===i.length)for(let p of e.all)l({pet:p,previousStrength:p.currentStrength,newStrength:p.currentStrength});return()=>o.strengthGain.delete(l)},subscribeMaxStrength(l,u){if(o.maxStrength.add(l),u?.immediate&&n&&s.size===i.length)for(let p of e.all)p.currentStrength===p.maxStrength&&l({pet:p});return()=>o.maxStrength.delete(l)},destroy(){for(let l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.location.clear(),o.ability.clear(),o.count.clear(),o.expandedPet.clear(),o.growth.clear(),o.strengthGain.clear(),o.maxStrength.clear(),n=!1}}}function oi(){return ni||(ni=Wv()),ni}var Lc,Oc,ni,ri=G(()=>{"use strict";We();mt();cr();Lc={inventory:"myPetInventoryAtom",hutch:"myPetHutchPetItemsAtom",active:"myPetInfosAtom",slotInfos:"myPetSlotInfosAtom",expandedPetSlotId:"expandedPetSlotIdAtom"};Oc={all:[],byLocation:{inventory:[],hutch:[],active:[]},counts:{inventory:0,hutch:0,active:0,total:0},expandedPetSlotId:null,expandedPet:null};ni=null});function Fv(){let e=null,t=[],n=new Set,r={},o=new Set,a=2;function i(u,p){return{x:p%u,y:Math.floor(p/u)}}function s(u,p,m){return m*u+p}function c(u,p){let{cols:m,rows:g}=u,f=m*g,h=new Set,b=new Set,k=new Map,S=[],x=u.userSlotIdxAndDirtTileIdxToGlobalTileIdx??[],T=u.userSlotIdxAndBoardwalkTileIdxToGlobalTileIdx??[],y=Math.max(x.length,T.length);for(let P=0;P<y;P++){let L=x[P]??[],R=T[P]??[],_=L.map((z,Z)=>(h.add(z),k.set(z,P),{globalIndex:z,localIndex:Z,position:i(m,z)})),X=R.map((z,Z)=>(b.add(z),k.set(z,P),{globalIndex:z,localIndex:Z,position:i(m,z)}));S.push({userSlotIdx:P,dirtTiles:_,boardwalkTiles:X,allTiles:[..._,...X]})}let C=u.spawnTiles.map(P=>i(m,P)),M={};if(u.locations)for(let[P,L]of Object.entries(u.locations)){let R=L.spawnTileIdx??[];M[P]={name:P,spawnTiles:R,spawnPositions:R.map(_=>i(m,_))}}return{cols:m,rows:g,totalTiles:f,tileSize:p,spawnTiles:u.spawnTiles,spawnPositions:C,locations:M,userSlots:S,globalToXY(P){return i(m,P)},xyToGlobal(P,L){return s(m,P,L)},getTileOwner(P){return k.get(P)??null},isDirtTile(P){return h.has(P)},isBoardwalkTile(P){return b.has(P)}}}function d(){if(o.size<a||e)return;let u=r.map,p=r.tileSize??0;if(u){e=c(u,p);for(let m of n)m(e);n.clear()}}async function l(){let u=await te.subscribe("mapAtom",m=>{r.map=m,o.add("map"),d()});t.push(u);let p=await te.subscribe("tileSizeAtom",m=>{r.tileSize=m,o.add("tileSize"),d()});t.push(p)}return l(),{get(){return e},isReady(){return e!==null},onReady(u,p){return e?(p?.immediate!==!1&&u(e),()=>{}):(n.add(u),()=>n.delete(u))},destroy(){for(let u of t)u();t.length=0,e=null,n.clear()}}}function Yt(){return ai||(ai=Fv()),ai}var ai,ur=G(()=>{"use strict";We();ai=null});function _c(e){let t=e.inventory,n=t?.items??[],r=t?.favoritedItemIds??[],o=e.selectedItemIndex,a=null;return o!==null&&o>=0&&o<n.length&&(a={index:o,item:n[o]}),{items:n,favoritedItemIds:r,count:n.length,isFull:e.isFull??!1,selectedItem:a}}function Wc(e){let t=e.items.map(n=>"id"in n?n.id:"species"in n&&n.itemType==="Seed"?`seed:${n.species}:${n.quantity}`:"toolId"in n?`tool:${n.toolId}:${n.quantity}`:"eggId"in n?`egg:${n.eggId}:${n.quantity}`:"decorId"in n?`decor:${n.decorId}:${n.quantity}`:JSON.stringify(n));return JSON.stringify({itemKeys:t,favoritedItemIds:e.favoritedItemIds,isFull:e.isFull,selectedItemIndex:e.selectedItem?.index??null})}function Bv(e,t){return Wc(e)===Wc(t)}function jv(e,t){return e===null&&t===null?!1:e===null||t===null?!0:e.index!==t.index}function dr(e){return"id"in e?e.id:"species"in e&&e.itemType==="Seed"?`seed:${e.species}`:"toolId"in e?`tool:${e.toolId}`:"eggId"in e?`egg:${e.eggId}`:"decorId"in e?`decor:${e.decorId}`:JSON.stringify(e)}function Uv(e,t){let n=new Set(e.map(dr)),r=new Set(t.map(dr)),o=t.filter(i=>!n.has(dr(i))),a=e.filter(i=>!r.has(dr(i)));return o.length===0&&a.length===0?null:{added:o,removed:a,counts:{before:e.length,after:t.length}}}function zv(e,t){let n=new Set(e),r=new Set(t),o=t.filter(i=>!n.has(i)),a=e.filter(i=>!r.has(i));return o.length===0&&a.length===0?null:{added:o,removed:a,current:t}}function Vv(){let e=Nc,t=Nc,n=!1,r=[],o={all:new Set,stable:new Set,selection:new Set,items:new Set,favorites:new Set},a={},i=Object.keys(Hc),s=new Set;function c(){if(s.size<i.length)return;let l=_c(a);if(Te(e,l)||(t=e,e=l,!n))return;for(let m of o.all)m(e,t);if(!Bv(t,e))for(let m of o.stable)m(e,t);if(jv(t.selectedItem,e.selectedItem)){let m={current:e.selectedItem,previous:t.selectedItem};for(let g of o.selection)g(m)}let u=Uv(t.items,e.items);if(u)for(let m of o.items)m(u);let p=zv(t.favoritedItemIds,e.favoritedItemIds);if(p)for(let m of o.favorites)m(p)}async function d(){if(n)return;let l=i.map(async u=>{let p=Hc[u],m=await te.subscribe(p,g=>{a[u]=g,s.add(u),c()});r.push(m)});await Promise.all(l),n=!0,s.size===i.length&&(e=_c(a))}return d(),{get(){return e},subscribe(l,u){return o.all.add(l),u?.immediate!==!1&&n&&s.size===i.length&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,u){return o.stable.add(l),u?.immediate!==!1&&n&&s.size===i.length&&l(e,e),()=>o.stable.delete(l)},subscribeSelection(l,u){return o.selection.add(l),u?.immediate&&n&&s.size===i.length&&l({current:e.selectedItem,previous:e.selectedItem}),()=>o.selection.delete(l)},subscribeItems(l,u){return o.items.add(l),u?.immediate&&n&&s.size===i.length&&l({added:e.items,removed:[],counts:{before:0,after:e.count}}),()=>o.items.delete(l)},subscribeFavorites(l,u){return o.favorites.add(l),u?.immediate&&n&&s.size===i.length&&l({added:e.favoritedItemIds,removed:[],current:e.favoritedItemIds}),()=>o.favorites.delete(l)},destroy(){for(let l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.selection.clear(),o.items.clear(),o.favorites.clear(),n=!1}}}function si(){return ii||(ii=Vv()),ii}var Hc,Nc,ii,li=G(()=>{"use strict";We();mt();Hc={inventory:"myInventoryAtom",isFull:"isMyInventoryAtMaxLengthAtom",selectedItemIndex:"myPossiblyNoLongerValidSelectedItemIndexAtom"},Nc={items:[],favoritedItemIds:[],count:0,isFull:!1,selectedItem:null};ii=null});function $v(e,t,n){let r=n.get(e.id),o=r?.slot,a=o?.data,i=o?.lastActionEvent;return{id:e.id,name:e.name,discordId:e.databaseUserId,discordAvatarUrl:e.discordAvatarUrl,guildId:e.guildId,isConnected:e.isConnected,isHost:e.id===t,slotIndex:r?.index??null,position:o?.position??null,cosmetic:{color:e.cosmetic?.color??"",avatar:e.cosmetic?.avatar?[...e.cosmetic.avatar]:[]},emote:{type:e.emoteData?.emoteType??-1},coins:a?.coinsCount??0,inventory:a?.inventory??null,shopPurchases:a?.shopPurchases??null,garden:a?.garden??null,pets:{slots:a?.petSlots??[],slotInfos:o?.petSlotInfos??null},journal:a?.journal??null,stats:a?.stats??null,tasksCompleted:a?.tasksCompleted??[],activityLogs:a?.activityLogs??[],customRestocks:{config:a?.customRestocks??null,inventories:o?.customRestockInventories??null},lastAction:i?{type:i.action,data:i.data,timestamp:i.timestamp}:null,selectedItemIndex:o?.notAuthoritative_selectedItemIndex??null,lastSlotMachineInfo:o?.lastSlotMachineInfo??null}}function Fc(e){let t=e.players,n=e.hostPlayerId??"",r=e.userSlots??[];if(!t||!Array.isArray(t)||t.length===0)return ui;let o=new Map;Array.isArray(r)&&r.forEach((s,c)=>{s?.type==="user"&&s?.playerId&&o.set(s.playerId,{slot:s,index:c})});let a=t.map(s=>$v(s,n,o)),i=a.find(s=>s.isHost)??null;return{all:a,host:i,count:a.length}}function Bc(e){let t=e.all.map(n=>`${n.id}:${n.isConnected}:${n.isHost}`);return JSON.stringify({playerKeys:t,hostId:e.host?.id??null,count:e.count})}function Kv(e,t){let n=[],r=new Set(e.map(a=>a.id)),o=new Set(t.map(a=>a.id));for(let a of t)r.has(a.id)||n.push({player:a,type:"join"});for(let a of e)o.has(a.id)||n.push({player:a,type:"leave"});return n}function Jv(e,t){let n=[],r=new Map(e.map(o=>[o.id,o]));for(let o of t){let a=r.get(o.id);a&&a.isConnected!==o.isConnected&&n.push({player:o,isConnected:o.isConnected})}return n}function qv(){let e=ui,t=ui,n=!1,r=[],o={all:new Set,stable:new Set,joinLeave:new Set,connection:new Set,host:new Set},a={},i=new Set,s=3;function c(){if(i.size<s)return;let l=Fc(a);if(Te(e,l)||(t=e,e=l,!n))return;for(let f of o.all)f(e,t);if(Bc(t)!==Bc(e))for(let f of o.stable)f(e,t);let u=Kv(t.all,e.all);for(let f of u)for(let h of o.joinLeave)h(f);let p=Jv(t.all,e.all);for(let f of p)for(let h of o.connection)h(f);let m=t.host?.id??null,g=e.host?.id??null;if(m!==g){let f={current:e.host,previous:t.host};for(let h of o.host)h(f)}}async function d(){if(n)return;let l=await da.onChangeNow(m=>{a.players=m,i.add("players"),c()});r.push(l);let u=await pa.onChangeNow(m=>{a.hostPlayerId=m,i.add("hostPlayerId"),c()});r.push(u);let p=await ua.onChangeNow(m=>{a.userSlots=m,i.add("userSlots"),c()});r.push(p),n=!0,i.size===s&&(e=Fc(a))}return d(),{get(){return e},subscribe(l,u){return o.all.add(l),u?.immediate!==!1&&n&&i.size===s&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,u){return o.stable.add(l),u?.immediate!==!1&&n&&i.size===s&&l(e,e),()=>o.stable.delete(l)},subscribeJoinLeave(l,u){if(o.joinLeave.add(l),u?.immediate&&n&&i.size===s)for(let p of e.all)l({player:p,type:"join"});return()=>o.joinLeave.delete(l)},subscribeConnection(l,u){if(o.connection.add(l),u?.immediate&&n&&i.size===s)for(let p of e.all)l({player:p,isConnected:p.isConnected});return()=>o.connection.delete(l)},subscribeHost(l,u){return o.host.add(l),u?.immediate&&n&&i.size===s&&l({current:e.host,previous:e.host}),()=>o.host.delete(l)},destroy(){for(let l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.joinLeave.clear(),o.connection.clear(),o.host.clear(),n=!1}}}function di(){return ci||(ci=qv()),ci}var ui,ci,pi=G(()=>{"use strict";Tt();mt();ui={all:[],host:null,count:0};ci=null});function Yv(e,t){switch(t){case"seed":return e.species??e.itemType;case"tool":return e.toolId??e.itemType;case"egg":return e.eggId??e.itemType;case"decor":return e.decorId??e.itemType;default:return e.itemType}}function Xv(e,t,n){let r=Yv(e,t),o=n[r]??0,a=Math.max(0,e.initialStock-o);return{id:r,itemType:e.itemType,initialStock:e.initialStock,purchased:o,remaining:a,isAvailable:a>0}}function Qv(e,t,n){if(!t)return{type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null};let o=n[e]?.purchases??{},a=(t.inventory??[]).map(d=>Xv(d,e,o)),i=a.filter(d=>d.isAvailable).length,s=t.secondsUntilRestock??0,c=s>0?Date.now()+s*1e3:null;return{type:e,items:a,availableCount:i,totalCount:a.length,secondsUntilRestock:s,restockAt:c}}function jc(e){let t=e.shops,n=e.purchases??{},r=jn.map(s=>Qv(s,t?.[s],n)),o={seed:r[0],tool:r[1],egg:r[2],decor:r[3]},a=r.filter(s=>s.restockAt!==null),i=null;if(a.length>0){let c=a.sort((d,l)=>(d.restockAt??0)-(l.restockAt??0))[0];i={shop:c.type,seconds:c.secondsUntilRestock,at:c.restockAt}}return{all:r,byType:o,nextRestock:i}}function zc(e){return JSON.stringify({shops:e.all.map(t=>({type:t.type,itemCount:t.items.length,availableCount:t.availableCount}))})}function Zv(e,t){let n=e.secondsUntilRestock,r=t.secondsUntilRestock;return n>0&&n<=5&&r>n||n>0&&r===0&&t.items.some(a=>a.purchased===0)?{shop:t,previousItems:e.items}:null}function ex(e,t){let n=[];for(let r of jn){let o=e.byType[r],a=t.byType[r],i=new Map(o.items.map(s=>[s.id,s]));for(let s of a.items){let c=i.get(s.id);c&&s.purchased>c.purchased&&n.push({shopType:r,itemId:s.id,quantity:s.purchased-c.purchased,newPurchased:s.purchased,remaining:s.remaining})}}return n}function tx(e,t){let n=[];for(let r of jn){let o=e.byType[r],a=t.byType[r],i=new Map(o.items.map(s=>[s.id,s]));for(let s of a.items){let c=i.get(s.id);c&&c.isAvailable!==s.isAvailable&&n.push({shopType:r,itemId:s.id,wasAvailable:c.isAvailable,isAvailable:s.isAvailable})}}return n}function nx(){let e=Uc,t=Uc,n=!1,r=[],o={all:new Set,stable:new Set,seedRestock:new Set,toolRestock:new Set,eggRestock:new Set,decorRestock:new Set,purchase:new Set,availability:new Set},a={},i=new Set,s=2;function c(){if(i.size<s)return;let l=jc(a);if(Te(e,l)||(t=e,e=l,!n))return;for(let g of o.all)g(e,t);if(zc(t)!==zc(e))for(let g of o.stable)g(e,t);let u={seed:o.seedRestock,tool:o.toolRestock,egg:o.eggRestock,decor:o.decorRestock};for(let g of jn){let f=Zv(t.byType[g],e.byType[g]);if(f)for(let h of u[g])h(f)}let p=ex(t,e);for(let g of p)for(let f of o.purchase)f(g);let m=tx(t,e);for(let g of m)for(let f of o.availability)f(g)}async function d(){if(n)return;let l=await ga.onChangeNow(p=>{a.shops=p,i.add("shops"),c()});r.push(l);let u=await fa.onChangeNow(p=>{a.purchases=p,i.add("purchases"),c()});r.push(u),n=!0,i.size===s&&(e=jc(a))}return d(),{get(){return e},getShop(l){return e.byType[l]},getItem(l,u){return e.byType[l].items.find(m=>m.id===u)??null},subscribe(l,u){return o.all.add(l),u?.immediate!==!1&&n&&i.size===s&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,u){return o.stable.add(l),u?.immediate!==!1&&n&&i.size===s&&l(e,e),()=>o.stable.delete(l)},subscribeSeedRestock(l,u){return o.seedRestock.add(l),u?.immediate&&n&&i.size===s&&l({shop:e.byType.seed,previousItems:[]}),()=>o.seedRestock.delete(l)},subscribeToolRestock(l,u){return o.toolRestock.add(l),u?.immediate&&n&&i.size===s&&l({shop:e.byType.tool,previousItems:[]}),()=>o.toolRestock.delete(l)},subscribeEggRestock(l,u){return o.eggRestock.add(l),u?.immediate&&n&&i.size===s&&l({shop:e.byType.egg,previousItems:[]}),()=>o.eggRestock.delete(l)},subscribeDecorRestock(l,u){return o.decorRestock.add(l),u?.immediate&&n&&i.size===s&&l({shop:e.byType.decor,previousItems:[]}),()=>o.decorRestock.delete(l)},subscribePurchase(l,u){if(o.purchase.add(l),u?.immediate&&n&&i.size===s)for(let p of e.all)for(let m of p.items)m.purchased>0&&l({shopType:p.type,itemId:m.id,quantity:m.purchased,newPurchased:m.purchased,remaining:m.remaining});return()=>o.purchase.delete(l)},subscribeAvailability(l,u){if(o.availability.add(l),u?.immediate&&n&&i.size===s)for(let p of e.all)for(let m of p.items)l({shopType:p.type,itemId:m.id,wasAvailable:m.isAvailable,isAvailable:m.isAvailable});return()=>o.availability.delete(l)},destroy(){for(let l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.seedRestock.clear(),o.toolRestock.clear(),o.eggRestock.clear(),o.decorRestock.clear(),o.purchase.clear(),o.availability.clear(),n=!1}}}function gi(){return mi||(mi=nx()),mi}var jn,Uc,mi,fi=G(()=>{"use strict";Tt();mt();jn=["seed","tool","egg","decor"];Uc={all:jn.map(e=>({type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null})),byType:{seed:{type:"seed",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},tool:{type:"tool",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},egg:{type:"egg",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},decor:{type:"decor",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null}},nextRestock:null};mi=null});function rx(e){return ox.includes(e)}function ax(e){if(!e)return hi;let t=Date.now(),n=e.endTime??0,r=Math.max(0,n-t),o=Math.floor(r/1e3),a=o>0,i=e.type??"Sunny";return{type:rx(i)?i:"Sunny",isActive:a,startTime:e.startTime??null,endTime:e.endTime??null,remainingSeconds:o}}function ix(){let e=hi,t=hi,n=!1,r=null,o={all:new Set,change:new Set};function a(s){let c=ax(s);if(e.type===c.type&&e.isActive===c.isActive&&e.startTime===c.startTime&&e.endTime===c.endTime){e=c;return}if(t=e,e=c,!!n){for(let d of o.all)d(e,t);if(t.type!==e.type||t.isActive!==e.isActive){let d={current:e,previous:t};for(let l of o.change)l(d)}}}async function i(){n||(r=await ba.onChangeNow(s=>{a(s)}),n=!0)}return i(),{get(){return e},subscribe(s,c){return o.all.add(s),c?.immediate!==!1&&n&&s(e,e),()=>o.all.delete(s)},subscribeChange(s,c){return o.change.add(s),c?.immediate&&n&&s({current:e,previous:e}),()=>o.change.delete(s)},destroy(){r?.(),r=null,o.all.clear(),o.change.clear(),n=!1}}}function yi(){return bi||(bi=ix()),bi}var ox,hi,bi,vi=G(()=>{"use strict";Tt();ox=["Sunny","Rain","Frost","Dawn","AmberMoon"];hi={type:"Sunny",isActive:!1,startTime:null,endTime:null,remainingSeconds:0};bi=null});function sx(){let e=le.get("mutations");return e?Object.keys(e):[]}function Jc(){let e={};for(let t of sx())e[t]=[];return e}function Si(){return{garden:null,mySlotIndex:null,plants:{all:[],mature:[],growing:[],bySpecies:{},count:0},crops:{all:[],mature:[],growing:[],mutated:{all:[],byMutation:Jc()}},eggs:{all:[],mature:[],growing:[],byType:{},count:0},decors:{tileObjects:[],boardwalk:[],all:[],byType:{},count:0},tiles:{tileObjects:[],boardwalk:[],empty:{tileObjects:[],boardwalk:[]}},counts:{plants:0,maturePlants:0,crops:0,matureCrops:0,eggs:0,matureEggs:0,decors:0,emptyTileObjects:0,emptyBoardwalk:0}}}function lx(e,t,n,r){let o=t.slots.filter(a=>r>=a.endTime).length;return{tileIndex:e,position:n,species:t.species,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:r>=t.maturedAt,slots:t.slots,slotsCount:t.slots.length,matureSlotsCount:o}}function cx(e,t,n,r,o){return{tileIndex:e,position:t,slotIndex:n,species:r.species,startTime:r.startTime,endTime:r.endTime,targetScale:r.targetScale,mutations:[...r.mutations],isMature:o>=r.endTime}}function ux(e,t,n,r){return{tileIndex:e,position:n,eggId:t.eggId,plantedAt:t.plantedAt,maturedAt:t.maturedAt,isMature:r>=t.maturedAt}}function Vc(e,t,n,r){return{tileIndex:e,position:n,decorId:t.decorId,rotation:t.rotation,location:r}}function $c(e,t){let{garden:n,mySlotIndex:r}=e,o=Date.now();if(!n||r===null)return Si();let a=t().get(),i=a?.userSlots[r],s=i?.dirtTiles??[],c=i?.boardwalkTiles??[],d=[],l=[],u=[],p={},m=[],g=[],f=[],h=[],b=Jc(),k=[],S=[],x=[],T={},y=[],C=[],M={},P=new Set,L=new Set;for(let[z,Z]of Object.entries(n.tileObjects)){let de=parseInt(z,10);P.add(de);let U=a?a.globalToXY(de):{x:0,y:0};if(Z.objectType==="plant"){let N=Z,H=lx(z,N,U,o);d.push(H),H.isMature?l.push(H):u.push(H),p[H.species]||(p[H.species]=[]),p[H.species].push(H);for(let E=0;E<N.slots.length;E++){let D=N.slots[E],O=cx(z,U,E,D,o);if(m.push(O),O.isMature?g.push(O):f.push(O),O.mutations.length>0){h.push(O);for(let W of O.mutations)b[W]||(b[W]=[]),b[W].push(O)}}}else if(Z.objectType==="egg"){let H=ux(z,Z,U,o);k.push(H),T[H.eggId]||(T[H.eggId]=[]),T[H.eggId].push(H),H.isMature?S.push(H):x.push(H)}else if(Z.objectType==="decor"){let H=Vc(z,Z,U,"tileObjects");y.push(H),M[H.decorId]||(M[H.decorId]=[]),M[H.decorId].push(H)}}for(let[z,Z]of Object.entries(n.boardwalkTileObjects)){let de=parseInt(z,10);L.add(de);let U=a?a.globalToXY(de):{x:0,y:0},H=Vc(z,Z,U,"boardwalk");C.push(H),M[H.decorId]||(M[H.decorId]=[]),M[H.decorId].push(H)}let R=[...y,...C],_=s.filter(z=>!P.has(z.localIndex)),X=c.filter(z=>!L.has(z.localIndex));return{garden:n,mySlotIndex:r,plants:{all:d,mature:l,growing:u,bySpecies:p,count:d.length},crops:{all:m,mature:g,growing:f,mutated:{all:h,byMutation:b}},eggs:{all:k,mature:S,growing:x,byType:T,count:k.length},decors:{tileObjects:y,boardwalk:C,all:R,byType:M,count:R.length},tiles:{tileObjects:s,boardwalk:c,empty:{tileObjects:_,boardwalk:X}},counts:{plants:d.length,maturePlants:l.length,crops:m.length,matureCrops:g.length,eggs:k.length,matureEggs:S.length,decors:R.length,emptyTileObjects:_.length,emptyBoardwalk:X.length}}}function Kc(e){return JSON.stringify({plants:e.counts.plants,maturePlants:e.counts.maturePlants,crops:e.counts.crops,matureCrops:e.counts.matureCrops,eggs:e.counts.eggs,matureEggs:e.counts.matureEggs,decors:e.counts.decors,emptyTileObjects:e.counts.emptyTileObjects,emptyBoardwalk:e.counts.emptyBoardwalk})}function dx(e,t){let n=new Set(e.map(i=>i.tileIndex)),r=new Set(t.map(i=>i.tileIndex)),o=t.filter(i=>!n.has(i.tileIndex)),a=e.filter(i=>!r.has(i.tileIndex));return{added:o,removed:a}}function px(e,t,n){let r=new Set(e.map(a=>a.tileIndex)),o=new Set(n.map(a=>a.tileIndex));return t.filter(a=>!r.has(a.tileIndex)&&o.has(a.tileIndex))}function mx(e,t,n){let r=new Set(e.map(a=>`${a.tileIndex}:${a.slotIndex}`)),o=new Set(n.map(a=>`${a.tileIndex}:${a.slotIndex}`));return t.filter(a=>{let i=`${a.tileIndex}:${a.slotIndex}`;return!r.has(i)&&o.has(i)})}function gx(e,t,n){let r=new Set(e.map(a=>a.tileIndex)),o=new Set(n.map(a=>a.tileIndex));return t.filter(a=>!r.has(a.tileIndex)&&o.has(a.tileIndex))}function fx(e,t){let n=[],r=new Map(e.map(o=>[o.tileIndex,o]));for(let o of t){let a=r.get(o.tileIndex);if(!a)continue;let i=Math.min(a.slots.length,o.slots.length);for(let s=0;s<i;s++){let c=new Set(a.slots[s].mutations),d=new Set(o.slots[s].mutations),l=[...d].filter(p=>!c.has(p)),u=[...c].filter(p=>!d.has(p));if(l.length>0||u.length>0){let p=Date.now(),m=o.slots[s],g={tileIndex:o.tileIndex,position:o.position,slotIndex:s,species:m.species,startTime:m.startTime,endTime:m.endTime,targetScale:m.targetScale,mutations:[...m.mutations],isMature:p>=m.endTime};n.push({crop:g,added:l,removed:u})}}}return n}function bx(e,t,n){let r=[],o=new Map(t.map(i=>[i.tileIndex,i])),a=new Map;for(let i of n)a.set(`${i.tileIndex}:${i.slotIndex}`,i);for(let i of e){let s=o.get(i.tileIndex);if(!s)continue;let c=Math.min(i.slots.length,s.slots.length);for(let d=0;d<c;d++){let l=i.slots[d],u=s.slots[d];if(l.startTime!==u.startTime){let p=a.get(`${i.tileIndex}:${d}`);if(!p||!p.isMature)continue;let m={tileIndex:i.tileIndex,position:i.position,slotIndex:d,species:l.species,startTime:l.startTime,endTime:l.endTime,targetScale:l.targetScale,mutations:[...l.mutations],isMature:!0};r.push({crop:m,remainingSlots:s.slotsCount})}}if(s.slotsCount<i.slotsCount)for(let d=s.slotsCount;d<i.slotsCount;d++){let l=a.get(`${i.tileIndex}:${d}`);if(!l||!l.isMature)continue;let u=i.slots[d];if(!u)continue;let p={tileIndex:i.tileIndex,position:i.position,slotIndex:d,species:u.species,startTime:u.startTime,endTime:u.endTime,targetScale:u.targetScale,mutations:[...u.mutations],isMature:!0};r.push({crop:p,remainingSlots:s.slotsCount})}}return r}function hx(e,t){let n=new Set(e.map(i=>i.tileIndex)),r=new Set(t.map(i=>i.tileIndex)),o=t.filter(i=>!n.has(i.tileIndex)),a=e.filter(i=>!r.has(i.tileIndex));return{added:o,removed:a}}function yx(e,t){let n=c=>`${c.tileIndex}:${c.location}`,r=c=>`${c.tileIndex}:${c.location}`,o=new Set(e.map(n)),a=new Set(t.map(r)),i=t.filter(c=>!o.has(r(c))),s=e.filter(c=>!a.has(n(c)));return{added:i,removed:s}}function vx(){let e=Si(),t=Si(),n=!1,r=[],o={all:new Set,stable:new Set,plantAdded:new Set,plantRemoved:new Set,plantMatured:new Set,cropMutated:new Set,cropMatured:new Set,cropHarvested:new Set,eggPlaced:new Set,eggRemoved:new Set,eggMatured:new Set,decorPlaced:new Set,decorRemoved:new Set},a={},i=new Set,s=2;function c(){if(i.size<s)return;let l=$c(a,Yt);if(Te(e,l)||(t=e,e=l,!n))return;for(let S of o.all)S(e,t);if(Kc(t)!==Kc(e))for(let S of o.stable)S(e,t);let u=dx(t.plants.all,e.plants.all);for(let S of u.added)for(let x of o.plantAdded)x({plant:S});for(let S of u.removed)for(let x of o.plantRemoved)x({plant:S,tileIndex:S.tileIndex});let p=px(t.plants.mature,e.plants.mature,e.plants.all);for(let S of p)for(let x of o.plantMatured)x({plant:S});let m=fx(t.plants.all,e.plants.all);for(let S of m)for(let x of o.cropMutated)x(S);let g=mx(t.crops.mature,e.crops.mature,e.crops.all);for(let S of g)for(let x of o.cropMatured)x({crop:S});let f=bx(t.plants.all,e.plants.all,t.crops.all);for(let S of f)for(let x of o.cropHarvested)x(S);let h=hx(t.eggs.all,e.eggs.all);for(let S of h.added)for(let x of o.eggPlaced)x({egg:S});for(let S of h.removed)for(let x of o.eggRemoved)x({egg:S});let b=gx(t.eggs.mature,e.eggs.mature,e.eggs.all);for(let S of b)for(let x of o.eggMatured)x({egg:S});let k=yx(t.decors.all,e.decors.all);for(let S of k.added)for(let x of o.decorPlaced)x({decor:S});for(let S of k.removed)for(let x of o.decorRemoved)x({decor:S})}async function d(){if(n)return;let l=await ma.onChangeNow(p=>{a.garden=p,i.add("garden"),c()});r.push(l);let u=await te.subscribe("myUserSlotIdxAtom",p=>{a.mySlotIndex=p,i.add("mySlotIndex"),c()});r.push(u),n=!0,i.size===s&&(e=$c(a,Yt))}return d(),{get(){return e},subscribe(l,u){return o.all.add(l),u?.immediate!==!1&&n&&i.size===s&&l(e,e),()=>o.all.delete(l)},subscribeStable(l,u){return o.stable.add(l),u?.immediate!==!1&&n&&i.size===s&&l(e,e),()=>o.stable.delete(l)},subscribePlantAdded(l,u){if(o.plantAdded.add(l),u?.immediate&&n&&i.size===s)for(let p of e.plants.all)l({plant:p});return()=>o.plantAdded.delete(l)},subscribePlantRemoved(l,u){return o.plantRemoved.add(l),()=>o.plantRemoved.delete(l)},subscribePlantMatured(l,u){if(o.plantMatured.add(l),u?.immediate&&n&&i.size===s)for(let p of e.plants.mature)l({plant:p});return()=>o.plantMatured.delete(l)},subscribeCropMutated(l,u){if(o.cropMutated.add(l),u?.immediate&&n&&i.size===s)for(let p of e.crops.mutated.all)l({crop:p,added:p.mutations,removed:[]});return()=>o.cropMutated.delete(l)},subscribeCropMatured(l,u){if(o.cropMatured.add(l),u?.immediate&&n&&i.size===s)for(let p of e.crops.mature)l({crop:p});return()=>o.cropMatured.delete(l)},subscribeCropHarvested(l,u){return o.cropHarvested.add(l),()=>o.cropHarvested.delete(l)},subscribeEggPlaced(l,u){if(o.eggPlaced.add(l),u?.immediate&&n&&i.size===s)for(let p of e.eggs.all)l({egg:p});return()=>o.eggPlaced.delete(l)},subscribeEggRemoved(l,u){return o.eggRemoved.add(l),()=>o.eggRemoved.delete(l)},subscribeEggMatured(l,u){if(o.eggMatured.add(l),u?.immediate&&n&&i.size===s)for(let p of e.eggs.mature)l({egg:p});return()=>o.eggMatured.delete(l)},subscribeDecorPlaced(l,u){if(o.decorPlaced.add(l),u?.immediate&&n&&i.size===s)for(let p of e.decors.all)l({decor:p});return()=>o.decorPlaced.delete(l)},subscribeDecorRemoved(l,u){return o.decorRemoved.add(l),()=>o.decorRemoved.delete(l)},destroy(){for(let l of r)l();r.length=0,o.all.clear(),o.stable.clear(),o.plantAdded.clear(),o.plantRemoved.clear(),o.plantMatured.clear(),o.cropMutated.clear(),o.cropMatured.clear(),o.cropHarvested.clear(),o.eggPlaced.clear(),o.eggRemoved.clear(),o.eggMatured.clear(),o.decorPlaced.clear(),o.decorRemoved.clear(),n=!1}}}function wi(){return xi||(xi=vx()),xi}var xi,Ti=G(()=>{"use strict";Tt();We();ur();mt();dt();xi=null});function pr(){return ke||(ke={currentTile:ei(),myPets:oi(),gameMap:Yt(),myInventory:si(),players:di(),shops:gi(),weather:yi(),myGarden:wi()},ke)}function Ye(){if(!ke)throw new Error("[Globals] Not initialized. Call initGlobals() first.");return ke}function qc(){ke&&(ke.currentTile.destroy(),ke.myPets.destroy(),ke.gameMap.destroy(),ke.myInventory.destroy(),ke.players.destroy(),ke.shops.destroy(),ke.weather.destroy(),ke.myGarden.destroy(),ke=null)}var ke,mr,gr=G(()=>{"use strict";Pc();mt();ti();ri();ur();li();pi();fi();vi();Ti();ti();ri();ur();li();pi();fi();vi();Ti();ke=null;mr={get currentTile(){return Ye().currentTile},get myPets(){return Ye().myPets},get gameMap(){return Ye().gameMap},get myInventory(){return Ye().myInventory},get players(){return Ye().players},get shops(){return Ye().shops},get weather(){return Ye().weather},get myGarden(){return Ye().myGarden}}});function Yc(){return Dt||(Dt=new Un,Dt.init()),Dt}function Xc(){Dt&&(Dt.destroy(),Dt=null)}var Un,Dt,Qc=G(()=>{"use strict";gr();Un=class{constructor(){ne(this,"logs",[]);ne(this,"maxLogs",1e3);ne(this,"unsubscribe",null);ne(this,"isInitialized",!1)}init(){this.isInitialized||(this.unsubscribe=mr.myPets.subscribeAbility(t=>{this.log({abilityId:t.trigger.abilityId||"unknown",petId:t.pet.id,petSpecies:t.pet.petSpecies,petName:t.pet.name,timestamp:t.trigger.performedAt||Date.now()})}),this.isInitialized=!0)}log(t){let n={...t,id:`${t.timestamp}-${Math.random().toString(36).substr(2,9)}`};this.logs.push(n),this.logs.length>this.maxLogs&&(this.logs=this.logs.slice(-this.maxLogs))}getLogs(t){let n=this.logs;t?.abilityId&&(n=n.filter(o=>o.abilityId===t.abilityId)),t?.petId&&(n=n.filter(o=>o.petId===t.petId)),t?.petSpecies&&(n=n.filter(o=>o.petSpecies===t.petSpecies));let{since:r}=t??{};return r!==void 0&&(n=n.filter(o=>o.timestamp>=r)),t?.limit&&(n=n.slice(-t.limit)),n}getStats(t=36e5){let n=Date.now()-t,r=this.logs.filter(a=>a.timestamp>=n),o=new Map;for(let a of r){o.has(a.abilityId)||o.set(a.abilityId,{abilityId:a.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});let i=o.get(a.abilityId);i.count++,(!i.lastProc||a.timestamp>i.lastProc)&&(i.lastProc=a.timestamp)}for(let a of o.values())a.procsPerMinute=a.count/t*6e4,a.procsPerHour=a.count/t*36e5;return o}getAbilityStats(t,n=36e5){return this.getStats(n).get(t)||null}getPetStats(t,n=36e5){let r=Date.now()-n,o=this.logs.filter(i=>i.petId===t&&i.timestamp>=r),a=new Map;for(let i of o){a.has(i.abilityId)||a.set(i.abilityId,{abilityId:i.abilityId,count:0,procsPerMinute:0,procsPerHour:0,lastProc:null});let s=a.get(i.abilityId);s.count++,(!s.lastProc||i.timestamp>s.lastProc)&&(s.lastProc=i.timestamp)}for(let i of a.values())i.procsPerMinute=i.count/n*6e4,i.procsPerHour=i.count/n*36e5;return{totalProcs:o.length,abilities:a}}getTopAbilities(t=10,n=36e5){return Array.from(this.getStats(n).values()).sort((o,a)=>a.count-o.count).slice(0,t)}clear(){this.logs=[]}setMaxLogs(t){this.maxLogs=t,this.logs.length>t&&(this.logs=this.logs.slice(-t))}getLogCount(){return this.logs.length}isActive(){return this.isInitialized}destroy(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null),this.logs=[],this.isInitialized=!1}},Dt=null});function Zc(){return Xt||(Xt=new zn),Xt}function eu(){Xt&&(Xt.endSession(),Xt=null)}var zn,Xt,tu=G(()=>{"use strict";zn=class{constructor(){ne(this,"stats");ne(this,"storageKey","gemini_stats");this.stats=this.loadStats(),this.startSession()}loadStats(){try{let t=localStorage.getItem(this.storageKey);if(t)return JSON.parse(t)}catch(t){console.warn("[StatsTracker] Failed to load stats:",t)}return this.getDefaultStats()}saveStats(){try{localStorage.setItem(this.storageKey,JSON.stringify(this.stats))}catch(t){console.warn("[StatsTracker] Failed to save stats:",t)}}getDefaultStats(){return{session:{sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},allTime:{totalSessions:0,totalPlayTime:0,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0,crops:{},pets:{}}}}startSession(){this.stats.session={sessionStart:Date.now(),sessionEnd:null,coinsEarned:0,coinsSpent:0,cropsHarvested:0,cropsSold:0,petsHatched:0,petsSold:0,petsFed:0,seedsPurchased:0,eggsPurchased:0,abilityProcs:0},this.stats.allTime.totalSessions++,this.saveStats()}endSession(){this.stats.session.sessionEnd=Date.now();let t=this.stats.session.sessionEnd-this.stats.session.sessionStart;this.stats.allTime.totalPlayTime+=t,this.saveStats()}recordHarvest(t,n=1,r=[]){this.stats.session.cropsHarvested+=n,this.stats.allTime.cropsHarvested+=n,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].harvested+=n;for(let o of r)this.stats.allTime.crops[t].mutations[o]||(this.stats.allTime.crops[t].mutations[o]=0),this.stats.allTime.crops[t].mutations[o]++;this.saveStats()}recordCropSale(t,n=1,r=0){this.stats.session.cropsSold+=n,this.stats.session.coinsEarned+=r,this.stats.allTime.cropsSold+=n,this.stats.allTime.coinsEarned+=r,this.stats.allTime.crops[t]||(this.stats.allTime.crops[t]={harvested:0,sold:0,totalValue:0,mutations:{}}),this.stats.allTime.crops[t].sold+=n,this.stats.allTime.crops[t].totalValue+=r,this.saveStats()}recordPetHatch(t,n=[],r=[]){this.stats.session.petsHatched++,this.stats.allTime.petsHatched++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].hatched++;for(let o of n)this.stats.allTime.pets[t].mutations[o]||(this.stats.allTime.pets[t].mutations[o]=0),this.stats.allTime.pets[t].mutations[o]++;for(let o of r)this.stats.allTime.pets[t].abilities[o]||(this.stats.allTime.pets[t].abilities[o]=0),this.stats.allTime.pets[t].abilities[o]++;this.saveStats()}recordPetSale(t,n=0){this.stats.session.petsSold++,this.stats.session.coinsEarned+=n,this.stats.allTime.petsSold++,this.stats.allTime.coinsEarned+=n,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].sold++,this.saveStats()}recordPetFeed(t){this.stats.session.petsFed++,this.stats.allTime.petsFed++,this.stats.allTime.pets[t]||(this.stats.allTime.pets[t]={hatched:0,sold:0,fed:0,mutations:{},abilities:{}}),this.stats.allTime.pets[t].fed++,this.saveStats()}recordSeedPurchase(t,n=1,r=0){this.stats.session.seedsPurchased+=n,this.stats.session.coinsSpent+=r,this.stats.allTime.seedsPurchased+=n,this.stats.allTime.coinsSpent+=r,this.saveStats()}recordEggPurchase(t,n=1,r=0){this.stats.session.eggsPurchased+=n,this.stats.session.coinsSpent+=r,this.stats.allTime.eggsPurchased+=n,this.stats.allTime.coinsSpent+=r,this.saveStats()}recordAbilityProc(t){this.stats.session.abilityProcs++,this.stats.allTime.abilityProcs++,this.saveStats()}recordCoinsEarned(t){this.stats.session.coinsEarned+=t,this.stats.allTime.coinsEarned+=t,this.saveStats()}recordCoinsSpent(t){this.stats.session.coinsSpent+=t,this.stats.allTime.coinsSpent+=t,this.saveStats()}getStats(){return{...this.stats}}getSessionStats(){return{...this.stats.session}}getAllTimeStats(){return{...this.stats.allTime}}getCropStats(t){return this.stats.allTime.crops[t]||null}getPetStats(t){return this.stats.allTime.pets[t]||null}getTopCrops(t=10){return Object.entries(this.stats.allTime.crops).map(([n,r])=>({species:n,stats:r})).sort((n,r)=>r.stats.harvested-n.stats.harvested).slice(0,t)}getTopPets(t=10){return Object.entries(this.stats.allTime.pets).map(([n,r])=>({species:n,stats:r})).sort((n,r)=>r.stats.hatched-n.stats.hatched).slice(0,t)}resetSession(){this.startSession()}resetAll(){this.stats=this.getDefaultStats(),this.saveStats()}exportStats(){return JSON.stringify(this.stats,null,2)}importStats(t){try{let n=JSON.parse(t);return this.stats=n,this.saveStats(),!0}catch(n){return console.warn("[StatsTracker] Failed to import stats:",n),!1}}},Xt=null});async function ru(e){let t=[{name:"Data",init:()=>le.init()},{name:"AntiAfk",init:()=>Sn.init()},{name:"CustomModal",init:()=>Ln.init()},{name:"Sprites",init:()=>ue.init()},{name:"TileObjectSystem",init:()=>qe.init()},{name:"Pixi",init:()=>Rn.init()},{name:"Audio",init:()=>_n.init()},{name:"Cosmetics",init:()=>Wn.init()}];await Promise.all(t.map(async n=>{e?.({status:"start",name:n.name});try{await n.init(),e?.({status:"success",name:n.name})}catch(r){console.error(`[${n.name}] failed`,r),e?.({status:"error",name:n.name,error:r})}})),console.log("[Gemini] Modules ready. Access via Gemini.Modules in console.")}var nu,ou,Vn=G(()=>{"use strict";Nr();Wt();vn();dt();ea();Gt();ka();gn();zt();Yo();Na();_a();Ua();bc();cr();Cc();Qc();tu();dt();ea();ka();zt();Yo();Na();_a();Ua();nu={AbilityLogger:Un,getAbilityLogger:Yc,destroyAbilityLogger:Xc,...Qa},ou={StatsTracker:zn,getStatsTracker:Zc,destroyStatsTracker:eu}});function ze(e,t){try{let n=e.startsWith(Qt)?e:Qt+e,r=localStorage.getItem(n);return r===null?t:JSON.parse(r)}catch(n){return console.error(`[Storage] Error reading key "${e}":`,n),t}}function ot(e,t){try{let n=e.startsWith(Qt)?e:Qt+e,r=e.startsWith(Qt)?e.slice(Qt.length):e;localStorage.setItem(n,JSON.stringify(t)),window.dispatchEvent(new CustomEvent("gemini:storage:change",{detail:{key:r,value:t}}))}catch(n){console.error(`[Storage] Error writing key "${e}":`,n)}}var Qt,$n=G(()=>{"use strict";Qt="gemini:"});function ki(e){return!!e&&e.readyState===su}function xx(){if(ki(Ie.latestOpen))return Ie.latestOpen;for(let e=Ie.captured.length-1;e>=0;e--){let t=Ie.captured[e];if(ki(t))return t}return null}function Sx(e,t){Ie.captured.push(e),Ie.captured.length>25&&Ie.captured.splice(0,Ie.captured.length-25);let n=()=>{Ie.latestOpen=e,t&&console.log("[WS] captured socket opened",e.url)};e.addEventListener("open",n),e.addEventListener("close",()=>{Ie.latestOpen===e&&(Ie.latestOpen=null),t&&console.log("[WS] captured socket closed",e.url)}),e.readyState===su&&n()}function lu(e=A,t={}){let n=!!t.debug,r=e?.WebSocket;if(typeof r!="function")return()=>{};if(r[au])return Ie.nativeCtor=r[iu]??Ie.nativeCtor??null,()=>{};let o=r;Ie.nativeCtor=o;function a(i,s){let c=s!==void 0?new o(i,s):new o(i);try{Sx(c,n)}catch{}return c}try{a.prototype=o.prototype}catch{}try{Object.setPrototypeOf(a,o)}catch{}try{a.CONNECTING=o.CONNECTING,a.OPEN=o.OPEN,a.CLOSING=o.CLOSING,a.CLOSED=o.CLOSED}catch{}a[au]=!0,a[iu]=o;try{e.WebSocket=a,n&&console.log("[WS] WebSocket capture installed")}catch{return()=>{}}return()=>{try{e.WebSocket===a&&(e.WebSocket=o)}catch{}}}function wx(e=A){let t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function Kn(e=A){let t=xx();if(t)return{ws:t,source:"captured"};let n=wx(e);return n?{ws:n,source:"roomConnection"}:{ws:null,source:null}}function fr(e,t={}){let n=t.pageWindow??A,r=t.intervalMs??500,o=!!t.debug,a=null,i=null,s=()=>{let d=Kn(n);(d.ws!==a||d.source!==i)&&(a=d.ws,i=d.source,o&&console.log("[WS] best socket changed:",d.source,d.ws),e(d))};s();let c=setInterval(s,r);return()=>clearInterval(c)}function Tx(e){if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return null}}function kx(e,t=A){let n=t?.MagicCircle_RoomConnection;if(n&&typeof n.sendMessage=="function")try{return Array.isArray(e)?n.sendMessage(...e):n.sendMessage(e),{ok:!0}}catch(a){return{ok:!1,reason:"error",error:a}}let{ws:r}=Kn(t);if(!r)return{ok:!1,reason:"no-ws"};if(!ki(r))return{ok:!1,reason:"not-open"};let o=Tx(e);if(o==null)return{ok:!1,reason:"error",error:new Error("Cannot stringify message")};try{return r.send(o),{ok:!0}}catch(a){return{ok:!1,reason:"error",error:a}}}function cu(e,t={},n=A){return kx({type:e,...t},n)}var Ie,au,iu,su,br=G(()=>{"use strict";ye();Ie={nativeCtor:null,captured:[],latestOpen:null},au=Symbol.for("ariesmod.ws.capture.wrapped"),iu=Symbol.for("ariesmod.ws.capture.native"),su=1});var Xe,I,E0,L0,rt=G(()=>{"use strict";Xe={Welcome:"Welcome",PartialState:"PartialState",ServerErrorMessage:"ServerErrorMessage",Config:"Config",InappropriateContentRejected:"InappropriateContentRejected",Emote:"Emote",CurrencyTransaction:"CurrencyTransaction",Pong:"Pong"},I={Chat:"Chat",Emote:"Emote",Wish:"Wish",KickPlayer:"KickPlayer",SetPlayerData:"SetPlayerData",UsurpHost:"UsurpHost",Dev:"Dev",SetSelectedGame:"SetSelectedGame",VoteForGame:"VoteForGame",RequestGame:"RequestGame",RestartGame:"RestartGame",Ping:"Ping",PlayerPosition:"PlayerPosition",Teleport:"Teleport",CheckWeatherStatus:"CheckWeatherStatus",MoveInventoryItem:"MoveInventoryItem",DropObject:"DropObject",PickupObject:"PickupObject",ToggleFavoriteItem:"ToggleFavoriteItem",PutItemInStorage:"PutItemInStorage",RetrieveItemFromStorage:"RetrieveItemFromStorage",MoveStorageItem:"MoveStorageItem",LogItems:"LogItems",PlantSeed:"PlantSeed",WaterPlant:"WaterPlant",HarvestCrop:"HarvestCrop",SellAllCrops:"SellAllCrops",PurchaseSeed:"PurchaseSeed",PurchaseEgg:"PurchaseEgg",PurchaseTool:"PurchaseTool",PurchaseDecor:"PurchaseDecor",PlantEgg:"PlantEgg",HatchEgg:"HatchEgg",PlantGardenPlant:"PlantGardenPlant",PotPlant:"PotPlant",MutationPotion:"MutationPotion",PickupDecor:"PickupDecor",PlaceDecor:"PlaceDecor",RemoveGardenObject:"RemoveGardenObject",PlacePet:"PlacePet",FeedPet:"FeedPet",PetPositions:"PetPositions",SwapPet:"SwapPet",StorePet:"StorePet",NamePet:"NamePet",SellPet:"SellPet",ReportSpeakingStart:"ReportSpeakingStart"},E0=new Set(Object.values(Xe)),L0=new Set(Object.values(I))});function J(e,t={},n=A){return cu(e,t,n)}function uu(e,t=A){return J(I.Chat,{scopePath:["Room"],message:e},t)}function du(e,t=A){return J(I.Emote,{scopePath:["Room"],emoteType:e},t)}function pu(e,t=A){return J(I.Wish,{wish:e},t)}function mu(e,t=A){return J(I.KickPlayer,{scopePath:["Room"],playerId:e},t)}function gu(e,t=A){return J(I.SetPlayerData,{scopePath:["Room"],data:e},t)}function fu(e=A){return J(I.UsurpHost,{},e)}function bu(e=A){return J(I.ReportSpeakingStart,{},e)}function hu(e,t=A){return J(I.SetSelectedGame,{scopePath:["Room"],gameId:e},t)}function yu(e,t=A){return J(I.VoteForGame,{scopePath:["Room"],gameId:e},t)}function vu(e,t=A){return J(I.RequestGame,{scopePath:["Room"],gameId:e},t)}function xu(e=A){return J(I.RestartGame,{scopePath:["Room"]},e)}function Su(e,t=A){return J(I.Ping,{id:e},t)}function Ci(e,t,n=A){return J(I.PlayerPosition,{x:e,y:t},n)}function Tu(e,t,n=A){return J(I.Teleport,{x:e,y:t},n)}function ku(e=A){return J(I.CheckWeatherStatus,{},e)}function Cu(e,t,n=A){return J(I.MoveInventoryItem,{fromIndex:e,toIndex:t},n)}function Pu(e,t=A){return J(I.DropObject,{slotIndex:e},t)}function Mu(e,t=A){return J(I.PickupObject,{objectId:e},t)}function Au(e,t,n=A){return J(I.ToggleFavoriteItem,{itemId:e,favorite:t},n)}function Iu(e,t=A){return J(I.PutItemInStorage,{itemId:e},t)}function Eu(e,t=A){return J(I.RetrieveItemFromStorage,{itemId:e},t)}function Lu(e,t,n=A){return J(I.MoveStorageItem,{fromIndex:e,toIndex:t},n)}function Du(e=A){return J(I.LogItems,{},e)}function Ru(e,t,n,r=A){return J(I.PlantSeed,{seedId:e,x:t,y:n},r)}function Ou(e,t=A){return J(I.WaterPlant,{plantId:e},t)}function Gu(e,t=A){return J(I.HarvestCrop,{cropId:e},t)}function Hu(e=A){return J(I.SellAllCrops,{},e)}function Nu(e,t=A){return J(I.PurchaseDecor,{decorId:e},t)}function _u(e,t=A){return J(I.PurchaseEgg,{eggId:e},t)}function Wu(e,t=A){return J(I.PurchaseTool,{toolId:e},t)}function Fu(e,t=A){return J(I.PurchaseSeed,{seedId:e},t)}function Bu(e,t,n,r=A){return J(I.PlantEgg,{eggId:e,x:t,y:n},r)}function ju(e,t=A){return J(I.HatchEgg,{eggId:e},t)}function Uu(e,t,n,r=A){return J(I.PlantGardenPlant,{plantId:e,x:t,y:n},r)}function zu(e,t,n=A){return J(I.PotPlant,{plantId:e,potId:t},n)}function Vu(e,t,n=A){return J(I.MutationPotion,{potionId:e,targetId:t},n)}function $u(e,t=A){return J(I.PickupDecor,{decorInstanceId:e},t)}function Ku(e,t,n,r=A){return J(I.PlaceDecor,{decorId:e,x:t,y:n},r)}function Ju(e,t=A){return J(I.RemoveGardenObject,{objectId:e},t)}function qu(e,t,n,r=A){return J(I.PlacePet,{petId:e,x:t,y:n},r)}function Yu(e,t,n=A){return J(I.FeedPet,{petId:e,foodItemId:t},n)}function Xu(e,t=A){return J(I.PetPositions,{positions:e},t)}function Qu(e,t,n=A){return J(I.SwapPet,{petIdA:e,petIdB:t},n)}function Zu(e,t=A){return J(I.StorePet,{petId:e},t)}function ed(e,t,n=A){return J(I.NamePet,{petId:e,name:t},n)}function td(e,t=A){return J(I.SellPet,{petId:e},t)}var wu,nd=G(()=>{"use strict";br();rt();ye();wu=Ci});function od(){A.Gemini=Zt}var Zt,hr=G(()=>{"use strict";ye();We();gr();nd();Vn();Zt={Store:{select:te.select.bind(te),set:te.set.bind(te),subscribe:te.subscribe.bind(te),subscribeImmediate:te.subscribeImmediate.bind(te)},Globals:mr,Modules:{Version:hn,Assets:Be,Manifest:Re,Data:le,AntiAfk:Sn,Environment:Le,CustomModal:Ln,Sprite:ue,Tile:qe,Pixi:Rn,Audio:_n,Cosmetic:Wn,Achievements:or,Calculators:lr,Pets:nu,Tracker:ou},WebSocket:{chat:uu,emote:du,wish:pu,kickPlayer:mu,setPlayerData:gu,usurpHost:fu,reportSpeakingStart:bu,setSelectedGame:hu,voteForGame:yu,requestGame:vu,restartGame:xu,ping:Su,checkWeatherStatus:ku,move:wu,playerPosition:Ci,teleport:Tu,moveInventoryItem:Cu,dropObject:Pu,pickupObject:Mu,toggleFavoriteItem:Au,putItemInStorage:Iu,retrieveItemFromStorage:Eu,moveStorageItem:Lu,logItems:Du,plantSeed:Ru,waterPlant:Ou,harvestCrop:Gu,sellAllCrops:Hu,purchaseDecor:Nu,purchaseEgg:_u,purchaseTool:Wu,purchaseSeed:Fu,plantEgg:Bu,hatchEgg:ju,plantGardenPlant:Uu,potPlant:zu,mutationPotion:Vu,pickupDecor:$u,placeDecor:Ku,removeGardenObject:Ju,placePet:qu,feedPet:Yu,petPositions:Xu,swapPet:Qu,storePet:Zu,namePet:ed,sellPet:td},_internal:{getGlobals:Ye,initGlobals:pr,destroyGlobals:qc}}});var id={};Ot(id,{getGameMutations:()=>Dx,setEnabled:()=>Lx,start:()=>rd,stop:()=>ad,updateSimpleConfig:()=>Ex});function rd(){let e=ze("gemini:features:autoFavorite",Mi);if(!e.enabled){console.log("[AutoFavorite] Disabled");return}Jn.clear(),yr=Zt.Globals.myInventory.subscribeItems(t=>{if(t.added.length>0)for(let n of t.added)Px(n,e)}),console.log(`\u2705 [AutoFavorite] Started - Watching ${e.simple.favoriteSpecies.length} species, ${e.simple.favoriteMutations.length} mutations`)}function ad(){yr&&(yr(),yr=null),Jn.clear(),console.log("\u{1F6D1} [AutoFavorite] Stopped")}function Px(e,t){if(e.itemType!=="Produce"&&e.itemType!=="Pet")return;let n=e.id;if(!n){console.warn("[AutoFavorite] Item has no ID:",e);return}if(Jn.has(n))return;if(e.isFavorited||e.favorited||!1){console.log(`[AutoFavorite] Already favorited: ${e.species||n}`);return}if(Mx(e,t.simple)){Jn.add(n);try{let a=Zt.WebSocket.toggleFavoriteItem(n,!0);console.log(`[AutoFavorite] \u2B50 Favorited ${e.itemType}: ${e.species||n}`,{itemId:n,webSocketResult:a})}catch(a){console.error("[AutoFavorite] WebSocket error:",a),Jn.delete(n)}}}function Mx(e,t){if(!t.enabled)return!1;let n=e.species||e.itemType||"",r=Ax(n);return!!(t.favoriteSpecies.includes(r)||t.favoriteMutations.length>0&&Ix(n).some(a=>t.favoriteMutations.includes(a)))}function Ax(e){let t=e;for(let n of Pi)t=t.replace(n,"").trim();return t}function Ix(e){let t=[];for(let n of Pi)e.includes(n)&&t.push(n);return t}function Ex(e){let t=ze("gemini:features:autoFavorite",Mi);t.mode="simple",t.simple={...t.simple,...e},ot("gemini:features:autoFavorite",t)}function Lx(e){let t=ze("gemini:features:autoFavorite",Mi);t.enabled=e,t.simple.enabled=e,ot("gemini:features:autoFavorite",t),e?rd():ad()}function Dx(){return Pi}var Pi,Mi,yr,Jn,sd=G(()=>{"use strict";hr();$n();Pi=["Gold","Rainbow","Wet","Chilled","Frozen","Dawnlit","Ambershine","Dawncharged","Ambercharged"],Mi={enabled:!1,mode:"simple",simple:{enabled:!1,favoriteSpecies:[],favoriteMutations:[]}},yr=null,Jn=new Set});var md={};Ot(md,{aggregateJournalProgress:()=>Ai,refresh:()=>Gx,setEnabled:()=>Ox,start:()=>dd,stop:()=>pd});async function Ai(){await le.waitForAnyData();let e=le.get("plants")||{},t=le.get("pets")||{},n=le.get("decor")||{},o=Zt.Globals.players.get()?.host?.journal||{pets:{},produce:{}},a=Object.keys(o.pets||{}),i=Object.keys(o.produce||{}),s=Object.keys(e),c=Object.keys(t),d=Object.keys(n);return{plants:{total:s.length,logged:i.length,percentage:s.length>0?i.length/s.length*100:0,missing:s.filter(l=>!i.includes(l))},pets:{total:c.length,logged:a.length,percentage:c.length>0?a.length/c.length*100:0,missing:c.filter(l=>!a.includes(l))},decor:{total:d.length,logged:0,percentage:0,missing:d}}}function dd(){let e=ze("gemini:features:journalChecker",ud);e.enabled&&(e.autoRefresh&&!qn&&(qn=setInterval(async()=>{let t=await Ai();window.dispatchEvent(new CustomEvent("gemini:journal-updated",{detail:t}))},e.refreshIntervalMs)),console.log("\u2705 [JournalChecker] Started"))}function pd(){qn&&(clearInterval(qn),qn=null)}function Ox(e){let t=ze("gemini:features:journalChecker",ud);t.enabled=e,ot("gemini:features:journalChecker",t),e?dd():pd()}async function Gx(){let e=await Ai();return window.dispatchEvent(new CustomEvent("gemini:journal-updated",{detail:e})),e}var ud,qn,gd=G(()=>{"use strict";hr();Vn();$n();ud={enabled:!1,autoRefresh:!0,refreshIntervalMs:3e4},qn=null});function v(e,t=null,...n){let r=document.createElement(e);for(let[o,a]of Object.entries(t||{}))a!=null&&(o==="style"?typeof a=="string"?r.setAttribute("style",a):typeof a=="object"&&Object.assign(r.style,a):o.startsWith("on")&&typeof a=="function"?r[o.toLowerCase()]=a:o in r?r[o]=a:r.setAttribute(o,String(a)));for(let o of n)o==null||o===!1||r.appendChild(typeof o=="string"||typeof o=="number"?document.createTextNode(String(o)):o);return r}var eo="https://i.imgur.com/k5WuC32.png",ts="gemini-loader-style",gt="gemini-loader",ns=80;function Xd(){if(document.getElementById(ts))return;let e=document.createElement("style");e.id=ts,e.textContent=`
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
  `,document.head.appendChild(e)}function to(e,t,n){let r=v("div",{className:`gemini-loader__log ${n}`},v("div",{className:"gemini-loader__dot"}),v("div",{textContent:t}));for(e.appendChild(r);e.childElementCount>ns;)e.firstElementChild?.remove();e.scrollTop=e.scrollHeight}function Qd(){return new Promise(e=>{if(typeof GM_xmlhttpRequest>"u"){e(eo);return}GM_xmlhttpRequest({method:"GET",url:eo,responseType:"blob",onload:t=>{let n=t.response,r=new FileReader;r.onloadend=()=>e(r.result),r.onerror=()=>e(eo),r.readAsDataURL(n)},onerror:()=>e(eo)})})}function Mr(e={}){let t=Number.isFinite(e.blurPx)?Math.max(4,Number(e.blurPx)):14;Xd();let n=v("div",{className:"gemini-loader__subtitle",textContent:e.subtitle??"Initializing the mod..."}),r=v("div",{className:"gemini-loader__logs"}),o=v("img",{className:"gemini-loader__spinner-icon",alt:"Gemini"}),a=v("div",{className:"gemini-loader__spinner"},o);Qd().then(h=>{o.src=h});let i=v("div",{className:"gemini-loader__card"},v("div",{className:"gemini-loader__header"},a,v("div",{className:"gemini-loader__titles"},v("div",{className:"gemini-loader__title",textContent:e.title??"Gemini is loading"}),n)),r),s=v("div",{id:gt},i);(document.body||document.documentElement).appendChild(s);let c=v("div",{className:"gemini-loader__actions"},v("button",{className:"gemini-loader__button",textContent:"Close loader",onclick:()=>s.remove()}));i.appendChild(c),s.style.setProperty("--loader-blur",`${t}px`);let d=h=>{n.textContent=h},l=new Map,u=(h,b)=>{h.className=`gemini-loader__log ${b}`};return{log:(h,b="info")=>to(r,h,b),logStep:(h,b,k="info")=>{let S=String(h||"").trim();if(!S){to(r,b,k);return}let x=l.get(S);if(x){x.el.lastElementChild&&(x.el.lastElementChild.textContent=b),x.tone!==k&&(u(x.el,k),x.tone=k);return}let T=v("div",{className:`gemini-loader__log ${k}`},v("div",{className:"gemini-loader__dot"}),v("div",{textContent:b}));for(l.set(S,{el:T,tone:k}),r.appendChild(T);r.childElementCount>ns;){let y=r.firstElementChild;if(!y)break;let C=Array.from(l.entries()).find(([,M])=>M.el===y)?.[0];C&&l.delete(C),y.remove()}r.scrollTop=r.scrollHeight},setSubtitle:d,succeed:(h,b=600)=>{h&&to(r,h,"success"),s.classList.add("gemini-loader--closing"),setTimeout(()=>s.remove(),b)},fail:(h,b)=>{to(r,h,"error"),d("Something went wrong. Check the console for details."),s.classList.add("gemini-loader--error"),console.error("[Gemini loader]",h,b)}}}function os(e,t,n){let r=v("div",{className:"lg-pill",id:"pill"}),o=e.map(l=>{let u=v("button",{className:"lg-tab"},l.label);return u.setAttribute("data-target",l.id),u}),a=v("div",{className:"lg-tabs",id:"lg-tabs-row"},r,...o),i=a;a.addEventListener("wheel",l=>{Math.abs(l.deltaY)>Math.abs(l.deltaX)&&(l.preventDefault(),a.scrollLeft+=l.deltaY)},{passive:!1});function s(l){let u=a.getBoundingClientRect(),p=o.find(T=>T.dataset.target===l)||o[0];if(!p)return;let m=p.getBoundingClientRect(),g=m.left-u.left,f=m.width;r.style.width=`${f}px`,r.style.transform=`translateX(${g}px)`;let h=a.scrollLeft,b=h,k=h+a.clientWidth,S=g-12,x=g+f+12;S<b?a.scrollTo({left:S,behavior:"smooth"}):x>k&&a.scrollTo({left:x-a.clientWidth,behavior:"smooth"})}let c=t||(e[0]?.id??"");function d(l){c=l,o.forEach(u=>u.classList.toggle("active",u.dataset.target===l)),s(l),n(l)}return o.forEach(l=>l.addEventListener("click",()=>d(l.dataset.target))),queueMicrotask(()=>s(c)),{root:i,activate:d,recalc:()=>s(c),getActive:()=>c}}var Ee=class{constructor(t){ne(this,"id");ne(this,"label");ne(this,"container",null);ne(this,"cleanupFunctions",[]);ne(this,"preloadedContent",null);ne(this,"preloadPromise",null);this.id=t.id,this.label=t.label}async preload(){if(this.preloadedContent||this.preloadPromise)return;let t=v("div");this.preloadPromise=(async()=>{let n=this.build(t);n instanceof Promise&&await n,this.preloadedContent=t,this.preloadPromise=null})(),await this.preloadPromise}isPreloaded(){return this.preloadedContent!==null}render(t){for(this.unmount();t.firstChild;)t.removeChild(t.firstChild);if(this.container=t,this.preloadedContent){for(;this.preloadedContent.firstChild;)t.appendChild(this.preloadedContent.firstChild);this.preloadedContent=null}else{let r=this.build(t);r instanceof Promise&&r.catch(o=>{console.error(`[Gemini] Error building section ${this.id}:`,o)})}let n=t.firstElementChild;n&&n.classList.contains("gemini-section")&&n.classList.add("active")}unmount(){this.executeCleanup(),this.container=null}createContainer(t,n){let r=n?`gemini-section ${n}`:"gemini-section";return v("section",{id:t,className:r})}addCleanup(t){this.cleanupFunctions.push(t)}createGrid(t="12px"){let n=v("div");return n.style.display="grid",n.style.gap=t,n}executeCleanup(){for(let t of this.cleanupFunctions)try{t()}catch(n){console.error(`[Gemini] Cleanup error in section ${this.id}:`,n)}this.cleanupFunctions=[]}};var an=class{constructor(t,n,r){ne(this,"sections");ne(this,"activeId",null);ne(this,"container");ne(this,"theme");this.sections=new Map(t.map(o=>[o.id,o])),this.container=n,this.theme=r}get ids(){return Array.from(this.sections.keys())}get all(){return Array.from(this.sections.values())}get active(){return this.activeId}activate(t){if(this.activeId!==t){if(!this.sections.has(t))throw new Error(`[Gemini] Unknown section: ${t}`);if(this.activeId&&this.sections.get(this.activeId).unmount(),this.activeId=t,this.sections.get(t).render(this.container),this.theme){let n=this.theme.getCurrentTheme();this.theme.applyTheme(n)}}}};function sn(e,t){try{let n=JSON.stringify(t);GM_setValue(e,n)}catch(n){console.error(`[Gemini] Failed to save key "${e}" to storage:`,n)}}function it(e,t){try{let n=GM_getValue(e);return n==null?t:typeof n=="string"?JSON.parse(n):n}catch(n){return console.error(`[Gemini] Failed to load key "${e}" from storage, using default:`,n),t}}var rs="gemini.sections";function as(){let e=it(rs,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function Zd(e){sn(rs,e)}async function is(e){return as()[e]}function ss(e,t){let n=as();Zd({...n,[e]:t})}function no(e,t){return{...e,...t??{}}}async function ls(e){let t=await is(e.path),n;e.migrate?n=e.migrate(t):n=t??{},n=Object.assign((d=>JSON.parse(JSON.stringify(d)))(e.defaults),n),e.sanitize&&(n=e.sanitize(n));function o(){ss(e.path,n)}function a(){return n}function i(d){n=e.sanitize?e.sanitize(d):d,o()}function s(d){let u=Object.assign((p=>JSON.parse(JSON.stringify(p)))(n),{});typeof d=="function"?d(u):Object.assign(u,d),n=e.sanitize?e.sanitize(u):u,o()}function c(){o()}return{get:a,set:i,update:s,save:c}}async function ln(e,t){let{path:n=e,...r}=t;return ls({path:n,...r})}var ep=0,oo=new Map;function he(e={},...t){let{id:n,className:r,variant:o="default",padding:a="md",interactive:i=!1,expandable:s=!1,defaultExpanded:c=!0,onExpandChange:d,mediaTop:l,title:u,subtitle:p,badge:m,actions:g,footer:f,divider:h=!1,tone:b="neutral",stateKey:k}=e,S=v("div",{className:"card",id:n,tabIndex:i?0:void 0});S.classList.add(`card--${o}`,`card--p-${a}`),i&&S.classList.add("card--interactive"),b!=="neutral"&&S.classList.add(`card--tone-${b}`),r&&S.classList.add(...r.split(" ").filter(Boolean)),s&&S.classList.add("card--expandable");let x=s?k??n??(typeof u=="string"?`title:${u}`:null):null,T=!s||c;x&&oo.has(x)&&(T=!!oo.get(x));let y=null,C=null,M=null,P=null,L=null,R=n?`${n}-collapse`:`card-collapse-${++ep}`,_=()=>{if(P!==null&&(cancelAnimationFrame(P),P=null),L){let N=L;L=null,N()}},X=(N,H)=>{if(!M)return;_();let E=M;if(E.setAttribute("aria-hidden",String(!N)),!H){E.classList.remove("card-collapse--animating"),E.style.display=N?"":"none",E.style.height="",E.style.opacity="";return}if(E.classList.add("card-collapse--animating"),E.style.display="",N){E.style.height="auto";let V=E.scrollHeight;if(!V){E.classList.remove("card-collapse--animating"),E.style.display="",E.style.height="",E.style.opacity="";return}E.style.height="0px",E.style.opacity="0",E.offsetHeight,P=requestAnimationFrame(()=>{P=null,E.style.height=`${V}px`,E.style.opacity="1"})}else{let V=E.scrollHeight;if(!V){E.classList.remove("card-collapse--animating"),E.style.display="none",E.style.height="",E.style.opacity="";return}E.style.height=`${V}px`,E.style.opacity="1",E.offsetHeight,P=requestAnimationFrame(()=>{P=null,E.style.height="0px",E.style.opacity="0"})}let D=()=>{E.classList.remove("card-collapse--animating"),E.style.height="",N||(E.style.display="none"),E.style.opacity=""},O=null,W=V=>{V.target===E&&(O!==null&&(clearTimeout(O),O=null),E.removeEventListener("transitionend",W),E.removeEventListener("transitioncancel",W),L=null,D())};L=()=>{O!==null&&(clearTimeout(O),O=null),E.removeEventListener("transitionend",W),E.removeEventListener("transitioncancel",W),L=null,D()},E.addEventListener("transitionend",W),E.addEventListener("transitioncancel",W),O=window.setTimeout(()=>{L?.()},420)};function z(N){let H=document.createElementNS("http://www.w3.org/2000/svg","svg");return H.setAttribute("viewBox","0 0 24 24"),H.setAttribute("width","16"),H.setAttribute("height","16"),H.innerHTML=N==="up"?'<path d="M7 14l5-5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>':'<path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',H}function Z(N,H=!0,E=!0){T=N,S.classList.toggle("card--collapsed",!T),S.classList.toggle("card--expanded",T),y&&(y.dataset.expanded=String(T),y.setAttribute("aria-expanded",String(T))),C&&(C.setAttribute("aria-expanded",String(T)),C.classList.toggle("card-toggle--collapsed",!T),C.setAttribute("aria-label",T?"Replier le contenu":"Deplier le contenu"),C.replaceChildren(z(T?"up":"down"))),s?X(T,E):M&&(M.style.display="",M.style.height="",M.style.opacity="",M.setAttribute("aria-hidden","false")),H&&d&&d(T),x&&oo.set(x,T)}if(l){let N=v("div",{className:"card-media"});N.append(l),S.appendChild(N)}let de=!!(u||p||m||g&&g.length||s);if(de){y=v("div",{className:"card-header"});let N=v("div",{className:"card-headline",style:"min-width:0;display:flex;flex-direction:column;gap:2px;"});if(u){let D=v("h3",{className:"card-title",style:"margin:0;font-size:15px;font-weight:700;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:8px;color:var(--group-title, var(--fg));"},u);m&&D.append(typeof m=="string"?v("span",{className:"badge"},m):m),N.appendChild(D)}if(p){let D=v("div",{className:"card-subtitle",style:"opacity:.85;font-size:12px;color:color-mix(in oklab, var(--fg) 80%, #9ca3af)"},p);N.appendChild(D)}(N.childNodes.length||s)&&y.appendChild(N);let H=v("div",{className:"card-header-right",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"}),E=v("div",{className:"card-actions",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"});g?.forEach(D=>E.appendChild(D)),E.childNodes.length&&H.appendChild(E),s&&(C=v("button",{className:"card-toggle",type:"button",ariaExpanded:String(T),ariaControls:R,ariaLabel:T?"Replier le contenu":"Deplier le contenu"}),C.textContent=T?"\u25B2":"\u25BC",C.addEventListener("click",D=>{D.preventDefault(),D.stopPropagation(),Z(!T)}),H.appendChild(C),y.classList.add("card-header--expandable"),y.addEventListener("click",D=>{let O=D.target;O?.closest(".card-actions")||O?.closest(".card-toggle")||Z(!T)})),H.childNodes.length&&y.appendChild(H),S.appendChild(y)}M=v("div",{className:"card-collapse",id:R,ariaHidden:s?String(!T):"false"}),S.appendChild(M),h&&de&&M.appendChild(v("div",{className:"card-divider"}));let U=v("div",{className:"card-body"});if(U.append(...t),M.appendChild(U),f){h&&M.appendChild(v("div",{className:"card-divider"}));let N=v("div",{className:"card-footer"});N.append(f),M.appendChild(N)}return C&&C.setAttribute("aria-controls",R),Z(T,!1,!1),x&&oo.set(x,T),S}var ro=!1,ao=new Set,Ge=e=>{let t=document.activeElement;for(let n of ao)if(t&&(t===n||n.contains(t))){e.stopImmediatePropagation(),e.stopPropagation();return}};function tp(){ro||(ro=!0,window.addEventListener("keydown",Ge,!0),window.addEventListener("keypress",Ge,!0),window.addEventListener("keyup",Ge,!0),document.addEventListener("keydown",Ge,!0),document.addEventListener("keypress",Ge,!0),document.addEventListener("keyup",Ge,!0))}function np(){ro&&(ao.size>0||(ro=!1,window.removeEventListener("keydown",Ge,!0),window.removeEventListener("keypress",Ge,!0),window.removeEventListener("keyup",Ge,!0),document.removeEventListener("keydown",Ge,!0),document.removeEventListener("keypress",Ge,!0),document.removeEventListener("keyup",Ge,!0)))}function cs(e){let{id:t,value:n=null,options:r,placeholder:o="Select...",size:a="md",disabled:i=!1,blockGameKeys:s=!0,onChange:c,onOpenChange:d}=e,l=v("div",{className:"select",id:t}),u=v("button",{className:"select-trigger",type:"button"}),p=v("span",{className:"select-value"},o),m=v("span",{className:"select-caret"},"\u25BE");u.append(p,m);let g=v("div",{className:"select-menu",role:"listbox",tabindex:"-1","aria-hidden":"true"});l.classList.add(`select--${a}`);let f=!1,h=n,b=null,k=!!i;function S(D){return D==null?o:(e.options||r).find(W=>W.value===D)?.label??o}function x(D){p.textContent=S(D),g.querySelectorAll(".select-option").forEach(O=>{let W=O.dataset.value,V=D!=null&&W===D;O.classList.toggle("selected",V),O.setAttribute("aria-selected",String(V))})}function T(D){g.replaceChildren(),D.forEach(O=>{let W=v("button",{className:"select-option"+(O.disabled?" disabled":""),type:"button",role:"option","data-value":O.value,"aria-selected":String(O.value===h),tabindex:"-1"},O.label);O.value===h&&W.classList.add("selected"),O.disabled||W.addEventListener("pointerdown",V=>{V.preventDefault(),V.stopPropagation(),R(O.value,{notify:!0}),P()},{capture:!0}),g.appendChild(W)})}function y(){u.setAttribute("aria-expanded",String(f)),g.setAttribute("aria-hidden",String(!f))}function C(){let D=u.getBoundingClientRect();Object.assign(g.style,{minWidth:`${D.width}px`})}function M(){f||k||(f=!0,l.classList.add("open"),y(),C(),document.addEventListener("mousedown",de,!0),document.addEventListener("scroll",U,!0),window.addEventListener("resize",N),g.focus({preventScroll:!0}),s&&(tp(),ao.add(l),b=()=>{ao.delete(l),np()}),d?.(!0))}function P(){f&&(f=!1,l.classList.remove("open"),y(),document.removeEventListener("mousedown",de,!0),document.removeEventListener("scroll",U,!0),window.removeEventListener("resize",N),u.focus({preventScroll:!0}),b?.(),b=null,d?.(!1))}function L(){f?P():M()}function R(D,O={}){let W=h;h=D,x(h),O.notify!==!1&&W!==D&&c?.(D)}function _(){return h}function X(D){let O=Array.from(g.querySelectorAll(".select-option:not(.disabled)"));if(!O.length)return;let W=O.findIndex(me=>me.classList.contains("active")),V=O[(W+(D===1?1:O.length-1))%O.length];O.forEach(me=>me.classList.remove("active")),V.classList.add("active"),V.focus({preventScroll:!0}),V.scrollIntoView({block:"nearest"})}function z(D){(D.key===" "||D.key==="Enter"||D.key==="ArrowDown")&&(D.preventDefault(),M())}function Z(D){if(D.key==="Escape"){D.preventDefault(),P();return}if(D.key==="Enter"||D.key===" "){let O=g.querySelector(".select-option.active")||g.querySelector(".select-option.selected");O&&!O.classList.contains("disabled")&&(D.preventDefault(),R(O.dataset.value,{notify:!0}),P());return}if(D.key==="ArrowDown"){D.preventDefault(),X(1);return}if(D.key==="ArrowUp"){D.preventDefault(),X(-1);return}}function de(D){l.contains(D.target)||P()}function U(){f&&C()}function N(){f&&C()}function H(D){k=!!D,u.disabled=k,l.classList.toggle("disabled",k),k&&P()}function E(D){e.options=D,T(D),D.some(O=>O.value===h)||(h=null,x(null))}return l.append(u,g),u.addEventListener("pointerdown",D=>{D.preventDefault(),D.stopPropagation(),L()},{capture:!0}),u.addEventListener("keydown",z),g.addEventListener("keydown",Z),T(r),n!=null?(h=n,x(h)):x(null),y(),H(k),{root:l,open:M,close:P,toggle:L,getValue:_,setValue:R,setOptions:E,setDisabled:H,destroy(){document.removeEventListener("mousedown",de,!0),document.removeEventListener("scroll",U,!0),window.removeEventListener("resize",N),b?.(),b=null}}}function st(e={}){let{id:t,text:n="",htmlFor:r,tone:o="default",size:a="md",layout:i="inline",variant:s="text",required:c=!1,disabled:d=!1,tooltip:l,hint:u,icon:p,suffix:m,onClick:g}=e,f=v("div",{className:"lg-label-wrap",id:t}),h=v("label",{className:"lg-label",...r?{htmlFor:r}:{},...l?{title:l}:{}});if(p){let R=typeof p=="string"?v("span",{className:"lg-label-ico"},p):p;R.classList?.add?.("lg-label-ico"),h.appendChild(R)}let b=v("span",{className:"lg-label-text"},n);h.appendChild(b);let k=v("span",{className:"lg-label-req",ariaHidden:"true"}," *");c&&h.appendChild(k);let S=null;if(m!=null){S=typeof m=="string"?document.createTextNode(m):m;let R=v("span",{className:"lg-label-suffix"});R.appendChild(S),h.appendChild(R)}let x=u?v("div",{className:"lg-label-hint"},u):null;f.classList.add(`lg-label--${i}`),f.classList.add(`lg-label--${a}`),s==="title"&&f.classList.add("lg-label--title"),T(o),d&&f.classList.add("is-disabled"),f.appendChild(h),x&&f.appendChild(x),g&&h.addEventListener("click",g);function T(R){f.classList.remove("lg-label--default","lg-label--muted","lg-label--info","lg-label--success","lg-label--warning","lg-label--danger"),f.classList.add(`lg-label--${R}`)}function y(R){b.textContent=R}function C(R){T(R)}function M(R){R&&!k.isConnected&&h.appendChild(k),!R&&k.isConnected&&k.remove(),R?h.setAttribute("aria-required","true"):h.removeAttribute("aria-required")}function P(R){f.classList.toggle("is-disabled",!!R)}function L(R){!R&&x&&x.isConnected?x.remove():R&&x?x.textContent=R:R&&!x&&f.appendChild(v("div",{className:"lg-label-hint"},R))}return{root:f,labelEl:h,hintEl:x,setText:y,setTone:C,setRequired:M,setDisabled:P,setHint:L}}function cn(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function io(e,t){let n=document.createElement("span");n.className=`btn-ico btn-ico--${t}`;let r=cn(e);return r&&n.appendChild(r),n}function op(){let e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.marginRight="6px",t.style.display="none",t.style.flexShrink="0";let n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");let r=document.createElementNS(e,"animate");r.setAttribute("attributeName","stroke-dasharray"),r.setAttribute("values","1,150;90,150;90,150"),r.setAttribute("dur","1.5s"),r.setAttribute("repeatCount","indefinite");let o=document.createElementNS(e,"animateTransform");return o.setAttribute("attributeName","transform"),o.setAttribute("attributeType","XML"),o.setAttribute("type","rotate"),o.setAttribute("from","0 12 12"),o.setAttribute("to","360 12 12"),o.setAttribute("dur","1s"),o.setAttribute("repeatCount","indefinite"),n.appendChild(r),n.appendChild(o),t.appendChild(n),t}function lt(e={}){let{label:t="",id:n,variant:r="default",size:o="md",iconLeft:a,iconRight:i,loading:s=!1,tooltip:c,type:d="button",onClick:l,disabled:u=!1,fullWidth:p=!1}=e,m=v("button",{className:"btn",id:n});m.type=d,r==="primary"&&m.classList.add("primary"),o==="sm"&&m.classList.add("btn--sm"),c&&(m.title=c),p&&(m.style.width="100%");let g=op(),f=a?io(a,"left"):null,h=i?io(i,"right"):null,b=document.createElement("span");b.className="btn-label";let k=cn(t);k&&b.appendChild(k),!k&&(f||h)&&m.classList.add("btn--icon"),m.appendChild(g),f&&m.appendChild(f),m.appendChild(b),h&&m.appendChild(h);let S=u||s;m.disabled=S,m.setAttribute("aria-busy",String(!!s)),g.style.display=s?"inline-block":"none",l&&m.addEventListener("click",l);let x=m;return x.setLoading=T=>{m.setAttribute("aria-busy",String(!!T)),g.style.display=T?"inline-block":"none",m.disabled=T||u},x.setDisabled=T=>{m.disabled=T||m.getAttribute("aria-busy")==="true"},x.setLabel=T=>{b.replaceChildren();let y=cn(T);y&&b.appendChild(y),!y&&(f||h)?m.classList.add("btn--icon"):m.classList.remove("btn--icon")},x.setIconLeft=T=>{if(T==null){f?.remove();return}f?f.replaceChildren(cn(T)):m.insertBefore(io(T,"left"),b)},x.setIconRight=T=>{if(T==null){h?.remove();return}h?h.replaceChildren(cn(T)):m.appendChild(io(T,"right"))},x}Gt();var so=!1,un=new Set;function cp(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}var He=e=>{let t=cp();if(t){for(let n of un)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function up(){so||(so=!0,window.addEventListener("keydown",He,!0),window.addEventListener("keypress",He,!0),window.addEventListener("keyup",He,!0),document.addEventListener("keydown",He,!0),document.addEventListener("keypress",He,!0),document.addEventListener("keyup",He,!0))}function dp(){so&&(so=!1,window.removeEventListener("keydown",He,!0),window.removeEventListener("keypress",He,!0),window.removeEventListener("keyup",He,!0),document.removeEventListener("keydown",He,!0),document.removeEventListener("keypress",He,!0),document.removeEventListener("keyup",He,!0))}function pp(e){return un.size===0&&up(),un.add(e),()=>{un.delete(e),un.size===0&&dp()}}function mp(e,t,n,r){let o;switch(e){case"digits":o="0-9";break;case"alpha":o="\\p{L}";break;case"alphanumeric":o="\\p{L}0-9";break;default:return null}return t&&(o+=" "),n&&(o+="\\-"),r&&(o+="_"),new RegExp(`[^${o}]`,"gu")}function gp(e,t){return t?e.replace(t,""):e}function fp(e,t=0){if(!t)return e;let n;return((...r)=>{clearTimeout(n),n=setTimeout(()=>e(...r),t)})}function ps(e={}){let{id:t,placeholder:n="",value:r="",mode:o="any",allowSpaces:a=!1,allowDashes:i=!1,allowUnderscore:s=!1,maxLength:c,blockGameKeys:d=!0,debounceMs:l=0,onChange:u,onEnter:p,label:m}=e,g=v("div",{className:"lg-input-wrap"}),f=v("input",{className:"input",id:t,placeholder:n});if(typeof c=="number"&&c>0&&(f.maxLength=c),r&&(f.value=r),m){let R=v("div",{className:"lg-input-label"},m);g.appendChild(R)}g.appendChild(f);let h=mp(o,a,i,s),b=()=>{let R=f.selectionStart??f.value.length,_=f.value.length,X=gp(f.value,h);if(X!==f.value){f.value=X;let z=_-X.length,Z=Math.max(0,R-z);f.setSelectionRange(Z,Z)}},k=fp(()=>u?.(f.value),l);f.addEventListener("input",()=>{b(),k()}),f.addEventListener("paste",()=>queueMicrotask(()=>{b(),k()})),f.addEventListener("keydown",R=>{R.key==="Enter"&&p?.(f.value)});let S=d?pp(f):()=>{};function x(){return f.value}function T(R){f.value=R??"",b(),k()}function y(){f.focus()}function C(){f.blur()}function M(R){f.disabled=!!R}function P(){return document.activeElement===f}function L(){S()}return{root:g,input:f,getValue:x,setValue:T,focus:y,blur:C,setDisabled:M,isFocused:P,destroy:L}}function ve(e,t,n){return Math.min(n,Math.max(t,e))}function pn({h:e,s:t,v:n,a:r}){let o=(e%360+360)%360/60,a=n*t,i=a*(1-Math.abs(o%2-1)),s=0,c=0,d=0;switch(Math.floor(o)){case 0:s=a,c=i;break;case 1:s=i,c=a;break;case 2:c=a,d=i;break;case 3:c=i,d=a;break;case 4:s=i,d=a;break;default:s=a,d=i;break}let u=n-a,p=Math.round((s+u)*255),m=Math.round((c+u)*255),g=Math.round((d+u)*255);return{r:ve(p,0,255),g:ve(m,0,255),b:ve(g,0,255),a:ve(r,0,1)}}function ms({r:e,g:t,b:n,a:r}){let o=ve(e,0,255)/255,a=ve(t,0,255)/255,i=ve(n,0,255)/255,s=Math.max(o,a,i),c=Math.min(o,a,i),d=s-c,l=0;d!==0&&(s===o?l=60*((a-i)/d%6):s===a?l=60*((i-o)/d+2):l=60*((o-a)/d+4)),l<0&&(l+=360);let u=s===0?0:d/s;return{h:l,s:u,v:s,a:ve(r,0,1)}}function Er({r:e,g:t,b:n}){let r=o=>ve(Math.round(o),0,255).toString(16).padStart(2,"0");return`#${r(e)}${r(t)}${r(n)}`.toUpperCase()}function bp({r:e,g:t,b:n,a:r}){let o=ve(Math.round(r*255),0,255);return`${Er({r:e,g:t,b:n,a:r})}${o.toString(16).padStart(2,"0")}`.toUpperCase()}function dn({r:e,g:t,b:n,a:r}){let o=Math.round(r*1e3)/1e3;return`rgba(${e}, ${t}, ${n}, ${o})`}function Ht(e){let t=e.trim();if(!t||(t.startsWith("#")&&(t=t.slice(1)),![3,4,6,8].includes(t.length))||!/^[0-9a-fA-F]+$/.test(t))return null;(t.length===3||t.length===4)&&(t=t.split("").map(i=>i+i).join(""));let n=255;t.length===8&&(n=parseInt(t.slice(6,8),16),t=t.slice(0,6));let r=parseInt(t.slice(0,2),16),o=parseInt(t.slice(2,4),16),a=parseInt(t.slice(4,6),16);return{r,g:o,b:a,a:n/255}}function Ir(e){if(!e)return null;let t=e.trim();if(t.startsWith("#"))return Ht(t);let n=t.match(/^rgba?\(([^)]+)\)$/i);if(n){let r=n[1].split(",").map(c=>c.trim());if(r.length<3)return null;let o=Number(r[0]),a=Number(r[1]),i=Number(r[2]),s=r[3]!=null?Number(r[3]):1;return[o,a,i,s].some(c=>Number.isNaN(c))?null:{r:o,g:a,b:i,a:s}}return null}function hp(e,t){let n=Ir(e)??Ht(e??"")??{r:244,g:67,b:54,a:1};return typeof t=="number"&&(n.a=ve(t,0,1)),ms(n)}function yp(e){return`#${e.trim().replace(/[^0-9a-fA-F#]/g,"").replace(/#/g,"")}`.slice(0,9).toUpperCase()}function vp(e){let t=e.trim();return t&&(/^rgba?\s*\(/i.test(t)?t=t.replace(/^rgba?/i,"rgba"):(t=t.replace(/^\(?(.*)\)?$/,"$1"),t=`rgba(${t})`),t=t.replace(/\s*\(\s*/,"("),t=t.replace(/\s*\)\s*$/,")"),t=t.replace(/\s*,\s*/g,", "),t)}function ft(e){let t=pn(e),n=pn({...e,a:1});return{hsva:{...e},hex:Er(n),hexa:bp(t),rgba:dn(t),alpha:e.a}}function gs(e={}){let{id:t,label:n="Color",value:r,alpha:o,defaultExpanded:a=!1,detectMobile:i,onInput:s,onChange:c}=e,l=i?i():Le.detect().platform==="mobile",u=hp(r,o),p=he({id:t,className:"color-picker",title:n,padding:l?"md":"lg",variant:"soft",expandable:!l,defaultExpanded:!l&&a});p.classList.add(l?"color-picker--mobile":"color-picker--desktop");let m=p.querySelector(".card-header");m&&m.classList.add("color-picker__header");let g=m?.querySelector(".card-title"),f=v("button",{className:"color-picker__preview",type:"button",title:`Preview ${n}`,"aria-label":`Change ${n}`});g?g.prepend(f):m?m.prepend(f):p.prepend(f);let h=p.querySelector(".card-toggle");!l&&h&&f.addEventListener("click",()=>{p.classList.contains("card--collapsed")&&h.click()});let b=p.querySelector(".card-collapse"),k=null,S=null,x=null,T=null,y=null,C=null,M=null,P=null,L=null,R="hex";function _(U){let N=ft(u);U==="input"?s?.(N):c?.(N)}function X(){let U=ft(u);if(f.style.setProperty("--cp-preview-color",U.rgba),f.setAttribute("aria-label",`${n}: ${U.hexa}`),!l&&k&&S&&x&&T&&y&&C&&M){let N=pn({...u,s:1,v:1,a:1}),H=dn(N);k.style.setProperty("--cp-palette-hue",H),S.style.left=`${u.s*100}%`,S.style.top=`${(1-u.v)*100}%`,x.style.setProperty("--cp-alpha-gradient",`linear-gradient(180deg, ${dn({...N,a:1})} 0%, ${dn({...N,a:0})} 100%)`),T.style.top=`${(1-u.a)*100}%`,y.style.setProperty("--cp-hue-color",dn(pn({...u,v:1,s:1,a:1}))),C.style.left=`${u.h/360*100}%`;let E=u.a===1?U.hex:U.hexa,D=U.rgba,O=R==="hex"?E:D;M!==document.activeElement&&(M.value=O),M.setAttribute("aria-label",`${R.toUpperCase()} code for ${n}`),M.placeholder=R==="hex"?"#RRGGBB or #RRGGBBAA":"rgba(0, 0, 0, 1)",R==="hex"?M.maxLength=9:M.removeAttribute("maxLength"),M.dataset.mode=R,P&&(P.textContent=R.toUpperCase(),P.setAttribute("aria-label",R==="hex"?"Passer en saisie RGBA":"Revenir en saisie HEX"),P.setAttribute("aria-pressed",R==="rgba"?"true":"false"),P.classList.toggle("is-alt",R==="rgba"))}L&&L!==document.activeElement&&(L.value=U.hex)}function z(U,N=null){u={h:(U.h%360+360)%360,s:ve(U.s,0,1),v:ve(U.v,0,1),a:ve(U.a,0,1)},X(),N&&_(N)}function Z(U,N=null){z(ms(U),N)}function de(U,N,H){U.addEventListener("pointerdown",E=>{E.preventDefault();let D=E.pointerId,O=V=>{V.pointerId===D&&N(V)},W=V=>{V.pointerId===D&&(document.removeEventListener("pointermove",O),document.removeEventListener("pointerup",W),document.removeEventListener("pointercancel",W),H?.(V))};N(E),document.addEventListener("pointermove",O),document.addEventListener("pointerup",W),document.addEventListener("pointercancel",W)})}if(!l&&b){let U=b.querySelector(".card-body");if(U){U.classList.add("color-picker__body"),S=v("div",{className:"color-picker__palette-cursor"}),k=v("div",{className:"color-picker__palette"},S),T=v("div",{className:"color-picker__alpha-thumb"}),x=v("div",{className:"color-picker__alpha"},T),C=v("div",{className:"color-picker__hue-thumb"}),y=v("div",{className:"color-picker__hue"},C);let N=v("div",{className:"color-picker__main"},k,x),H=v("div",{className:"color-picker__hue-row"},y),E=ps({blockGameKeys:!0});M=E.input,M.classList.add("color-picker__hex-input"),M.value="",M.maxLength=9,M.spellcheck=!1,M.inputMode="text",M.setAttribute("aria-label",`Hex code for ${n}`),P=v("button",{type:"button",className:"color-picker__mode-btn",textContent:"HEX","aria-pressed":"false","aria-label":"Passer en saisie RGBA"}),E.root.classList.add("color-picker__hex-wrap");let D=v("div",{className:"color-picker__hex-row"},P,E.root);U.replaceChildren(N,H,D),de(k,W=>{if(!k||!S)return;let V=k.getBoundingClientRect(),me=ve((W.clientX-V.left)/V.width,0,1),Fe=ve((W.clientY-V.top)/V.height,0,1);z({...u,s:me,v:1-Fe},"input")},()=>_("change")),de(x,W=>{if(!x)return;let V=x.getBoundingClientRect(),me=ve((W.clientY-V.top)/V.height,0,1);z({...u,a:1-me},"input")},()=>_("change")),de(y,W=>{if(!y)return;let V=y.getBoundingClientRect(),me=ve((W.clientX-V.left)/V.width,0,1);z({...u,h:me*360},"input")},()=>_("change")),P.addEventListener("click",()=>{if(R=R==="hex"?"rgba":"hex",M){let W=ft(u);M.value=R==="hex"?u.a===1?W.hex:W.hexa:W.rgba}X(),M?.focus(),M?.select()}),M.addEventListener("input",()=>{if(R==="hex"){let W=yp(M.value);if(W!==M.value){let V=M.selectionStart??W.length;M.value=W,M.setSelectionRange(V,V)}}});let O=()=>{let W=M.value;if(R==="hex"){let V=Ht(W);if(!V){M.value=u.a===1?ft(u).hex:ft(u).hexa;return}let me=W.startsWith("#")?W.slice(1):W,Fe=me.length===4||me.length===8;V.a=Fe?V.a:u.a,Z(V,"change")}else{let V=vp(W),me=Ir(V);if(!me){M.value=ft(u).rgba;return}Z(me,"change")}};M.addEventListener("change",O),M.addEventListener("blur",O),M.addEventListener("keydown",W=>{W.key==="Enter"&&(O(),M.blur())})}}return l&&(b&&b.remove(),L=v("input",{className:"color-picker__native",type:"color",value:Er(pn({...u,a:1}))}),f.addEventListener("click",()=>L.click()),L.addEventListener("input",()=>{let U=Ht(L.value);U&&(U.a=u.a,Z(U,"input"),_("change"))}),p.appendChild(L)),X(),{root:p,isMobile:l,getValue:()=>ft(u),setValue:(U,N)=>{let H=Ir(U)??Ht(U)??Ht("#FFFFFF");H&&(typeof N=="number"&&(H.a=N),Z(H,null))}}}Gt();ye();Gt();function Tp(e){try{return!!e.isSecureContext}catch{return!1}}function Lr(e){let t=e?.getRootNode?.();return t&&(t instanceof Document||t.host)?t:document}function fs(){let e=navigator.platform||"",t=navigator.userAgent||"";return/Mac|iPhone|iPad|iPod/i.test(e)||/Mac OS|iOS/i.test(t)}async function kp(){try{let e=await navigator.permissions?.query?.({name:"clipboard-write"});return e?e.state==="granted"||e.state==="prompt":!0}catch{return!0}}function Cp(e,t){let n=document.createElement("textarea");return n.value=e,n.setAttribute("readonly","true"),n.style.position="fixed",n.style.opacity="0",n.style.pointerEvents="none",n.style.top="0",t.appendChild?t.appendChild(n):document.body.appendChild(n),n}function Pp(e){try{let t=window.getSelection?.();if(!t)return!1;let n=document.createRange();return n.selectNodeContents(e),t.removeAllRanges(),t.addRange(n),!0}catch{return!1}}async function Mp(e){if(!("clipboard"in navigator))return{ok:!1,method:"clipboard-write"};if(!Tp(A))return{ok:!1,method:"clipboard-write"};if(!await kp())return{ok:!1,method:"clipboard-write"};try{return await navigator.clipboard.writeText(e),{ok:!0,method:"clipboard-write"}}catch{return{ok:!1,method:"clipboard-write"}}}function Ap(e,t){try{let n=t||Lr(),r=Cp(e,n);r.focus(),r.select(),r.setSelectionRange(0,r.value.length);let o=!1;try{o=document.execCommand("copy")}catch{o=!1}return r.remove(),{ok:o,method:"execCommand"}}catch{return{ok:!1,method:"execCommand"}}}function Ip(e,t){if(!t)return{ok:!1,method:"selection"};let n=t.textContent??"",r=!1;if(n!==e)try{t.textContent=e,r=!0}catch{}let o=Pp(t);r&&setTimeout(()=>{try{t.textContent=n}catch{}},80);let a=fs()?"\u2318C pour copier":"Ctrl+C pour copier";return{ok:o,method:"selection",hint:a}}async function Ep(e,t={}){let n=(e??"").toString();if(!n.length)return{ok:!1,method:"noop"};let r=await Mp(n);if(r.ok)return r;let o=t.injectionRoot||Lr(t.valueNode||void 0),a=Ap(n,o);if(a.ok)return a;let i=Ip(n,t.valueNode||null);if(i.ok)return i;if(!t.disablePromptFallback)try{return window.prompt(Le.isDiscord()?"Copie manuelle (Discord bloque clipboard):":"Copie manuelle:",n),{ok:!0,method:"prompt"}}catch{}return{ok:!1,method:"noop"}}function bs(e,t,n={}){let r=o=>{if(n.showTip){n.showTip(o);return}try{e.setAttribute("aria-label",o);let a=document.createElement("div");a.textContent=o,a.style.position="absolute",a.style.top="-28px",a.style.right="0",a.style.padding="4px 8px",a.style.borderRadius="8px",a.style.fontSize="12px",a.style.background="color-mix(in oklab, var(--bg) 85%, transparent)",a.style.border="1px solid var(--border)",a.style.color="var(--fg)",a.style.pointerEvents="none",a.style.opacity="0",a.style.transition="opacity .12s";let i=Lr(e);i.appendChild?i.appendChild(a):document.body.appendChild(a);let s=e.getBoundingClientRect();a.style.left=`${s.right-8}px`,a.style.top=`${s.top-28}px`,requestAnimationFrame(()=>a.style.opacity="1"),setTimeout(()=>{a.style.opacity="0",setTimeout(()=>a.remove(),150)},1200)}catch{}};e.addEventListener("click",async o=>{o.stopPropagation();let a=(t()??"").toString(),i=await Ep(a,{valueNode:n.valueNode??null,injectionRoot:n.injectionRoot??null,disablePromptFallback:n.disablePromptFallback??!1});n.onResult?.(i),i.ok?i.method==="clipboard-write"||i.method==="execCommand"||i.method==="prompt"?r("Copi\xE9"):i.method==="selection"&&r(i.hint||(fs()?"\u2318C pour copier":"Ctrl+C pour copier")):r("Impossible de copier")})}var ct={light:{"--bg":"rgba(255,255,255,0.7)","--fg":"#0f172a","--muted":"rgba(15,23,42,0.06)","--soft":"rgba(15,23,42,0.04)","--accent":"#2563eb","--border":"rgba(15,23,42,0.12)","--shadow":"rgba(2,6,23,.2)","--tab-bg":"#ffffff","--tab-fg":"#0f172a","--pill-from":"#4f46e5","--pill-to":"#06b6d4"},dark:{"--bg":"rgba(10,12,18,0.6)","--fg":"#e5e7eb","--muted":"rgba(229,231,235,0.08)","--soft":"rgba(229,231,235,0.05)","--accent":"#60a5fa","--border":"rgba(148,163,184,0.2)","--shadow":"rgba(0,0,0,.45)","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#e5e7eb","--pill-from":"#6366f1","--pill-to":"#06b6d4"},sepia:{"--bg":"rgba(247,242,231,0.72)","--fg":"#3b2f2f","--muted":"rgba(59,47,47,0.06)","--soft":"rgba(59,47,47,0.04)","--accent":"#b07d62","--border":"rgba(59,47,47,0.14)","--shadow":"rgba(0,0,0,.18)","--tab-bg":"#fff","--tab-fg":"#3b2f2f","--pill-from":"#b07d62","--pill-to":"#d4a373"},forest:{"--bg":"rgba(14,24,18,0.62)","--fg":"#e7f5e9","--muted":"rgba(231,245,233,0.08)","--soft":"rgba(231,245,233,0.05)","--accent":"#34d399","--border":"rgba(231,245,233,0.16)","--shadow":"rgba(0,0,0,.5)","--tab-bg":"rgba(255,255,255,0.06)","--tab-fg":"#e7f5e9","--pill-from":"#10b981","--pill-to":"#84cc16"},violet:{"--bg":"rgba(23, 16, 42, 0.68)","--fg":"#f5f3ff","--muted":"rgba(245,243,255,0.08)","--soft":"rgba(245,243,255,0.05)","--accent":"#a855f7","--border":"rgba(216,180,254,0.22)","--shadow":"rgba(12,3,30,.55)","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#ede9fe","--pill-from":"#a855f7","--pill-to":"#f472b6"},ocean:{"--bg":"rgba(10, 34, 46, 0.66)","--fg":"#e0f7ff","--muted":"rgba(224,247,255,0.07)","--soft":"rgba(224,247,255,0.05)","--accent":"#38bdf8","--border":"rgba(125, 211, 252, 0.22)","--shadow":"rgba(0, 16, 32, .52)","--tab-bg":"rgba(56,189,248,0.14)","--tab-fg":"#e0f7ff","--pill-from":"#0ea5e9","--pill-to":"#14b8a6"},ember:{"--bg":"rgba(34,18,10,0.64)","--fg":"#fff7ed","--muted":"rgba(255,247,237,0.08)","--soft":"rgba(255,247,237,0.05)","--accent":"#f97316","--border":"rgba(255, 159, 92, 0.24)","--shadow":"rgba(16,6,2,.52)","--tab-bg":"rgba(255,247,237,0.09)","--tab-fg":"#fff7ed","--pill-from":"#fb923c","--pill-to":"#facc15"},magicGarden:{"--bg":"#201D1D","--fg":"#F5F5F5","--muted":"rgba(255,255,255,0.6)","--soft":"rgba(0,0,0,0.3)","--accent":"#FFF27D","--border":"rgba(255,255,255,0.1)","--border-accent":"#4A3B2E","--shadow":"rgba(0,0,0,0.5)","--card-shadow":"0 4px 10px rgba(0, 0, 0, 0.5)","--tab-bg":"#10725A","--tab-fg":"#F5F5F5","--section-title":"#10725A","--group-title":"#5EB292","--item-label":"#F5F5F5","--item-desc":"rgba(255,255,255,0.6)","--item-value":"#FFF27D","--card-bg":"rgba(0,0,0,0.3)","--card-radius":"12px","--card-border":"#4A3B2E","--pill-from":"#FFF27D","--pill-to":"#5EB292","--scrollbar-thumb":"rgba(255,255,255,0.2)","--scrollbar-thumb-hover":"rgba(255,255,255,0.3)"}};ye();function Dr(e){let{host:t,themes:n,initialTheme:r,onThemeChange:o}=e,a=r,i=null,s=!1;function c(l){let u=n[l]||n[a]||{};s&&t.classList.add("theme-anim");for(let[p,m]of Object.entries(u))t.style.setProperty(p,m);s?(i!==null&&clearTimeout(i),i=A.setTimeout(()=>{t.classList.remove("theme-anim"),i=null},320)):s=!0,a=l,o?.(l)}function d(){return a}return c(r),{applyTheme:c,getCurrentTheme:d}}var lo={ui:{expandedCards:{style:!1,system:!1}}};async function hs(){let e=await ln("tab-settings",{version:1,defaults:lo,sanitize:o=>({ui:{expandedCards:no(lo.ui.expandedCards,o.ui?.expandedCards)}})});function t(o){let a=e.get();e.update({ui:{...a.ui,...o,expandedCards:no(a.ui.expandedCards,o.expandedCards)}})}function n(o,a){let i=e.get();e.update({ui:{...i.ui,expandedCards:{...i.ui.expandedCards,[o]:!!a}}})}function r(o){let a=e.get();n(o,!a.ui.expandedCards[o])}return{get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:r}}function ys(e){return e.replace(/[_-]+/g," ").replace(/^\w/,t=>t.toUpperCase())}function Lp(){return Object.keys(ct).map(e=>({value:e,label:ys(e)}))}var Dp=["--bg","--fg","--accent","--muted","--soft","--border","--shadow","--tab-bg","--tab-fg","--pill-from","--pill-to"];function Rp(e){return ys(e.replace(/^--/,""))}function Op(e){return e.alpha<1?e.rgba:e.hex}var co=class extends Ee{constructor(n){super({id:"tab-settings",label:"Settings"});this.deps=n}async build(n){let r=this.createGrid("12px");r.id="settings",n.appendChild(r);let o;try{o=await hs()}catch{o={get:()=>lo,set:()=>{},save:()=>{},setUI:()=>{},setCardExpanded:()=>{},toggleCard:()=>{}}}let a=o.get(),i=Object.keys(ct),s=this.deps.getCurrentTheme?.()??this.deps.initialTheme,c=i.includes(s)?s:i[0]??"dark",d=c,l=st({text:"Theme",tone:"muted",size:"lg"}),u=cs({options:Lp(),value:c,onChange:f=>{d=f,this.deps.applyTheme(f),this.renderThemePickers(f,p,d)}}),p=v("div",{className:"settings-theme-grid"}),m=he({title:"Style",padding:"lg",expandable:!0,defaultExpanded:!!a.ui.expandedCards.style,onExpandChange:f=>o.setCardExpanded("style",f)},v("div",{className:"kv settings-theme-row"},l.root,u.root),p);this.renderThemePickers(c,p,d);let g=this.createEnvCard({defaultExpanded:!!a.ui.expandedCards.system,onExpandChange:f=>o.setCardExpanded("system",f)});r.appendChild(m),r.appendChild(g)}renderThemePickers(n,r,o){let a=ct[n];if(r.replaceChildren(),!!a)for(let i of Dp){let s=a[i];if(s==null)continue;let c=gs({label:Rp(i),value:s,defaultExpanded:!1,onInput:d=>this.updateThemeVar(n,i,d,o),onChange:d=>this.updateThemeVar(n,i,d,o)});r.appendChild(c.root)}}updateThemeVar(n,r,o,a){let i=ct[n];i&&(i[r]=Op(o),a===n&&this.deps.applyTheme(n))}createEnvCard(n){let r=n?.defaultExpanded??!1,o=n?.onExpandChange,a=(b,k)=>{let S=v("div",{className:"kv kv--inline-mobile"}),x=v("label",{},b),T=v("div",{className:"ro"});return typeof k=="string"?T.textContent=k:T.append(k),S.append(x,T),S},i=v("code",{},"\u2014"),s=v("span",{},"\u2014"),c=v("span",{},"\u2014"),d=v("span",{},"\u2014"),l=v("span",{},"\u2014"),u=v("span",{},"\u2014"),p=()=>{let b=Le.detect();c.textContent=b.surface,d.textContent=b.platform,l.textContent=b.browser??"Unknown",u.textContent=b.os??"Unknown",i.textContent=b.host,s.textContent=b.isInIframe?"Yes":"No"},m=lt({label:"Copy JSON",variant:"primary",size:"sm"});bs(m,()=>{let b=Le.detect();return JSON.stringify(b,null,2)});let g=v("div",{style:"width:100%;display:flex;justify-content:center;"},m),f=he({title:"System",variant:"soft",padding:"lg",footer:g,expandable:!0,defaultExpanded:r,onExpandChange:o},a("Surface",c),a("Platform",d),a("Browser",l),a("OS",u),a("Host",i),a("Iframe",s)),h=()=>{document.hidden||p()};return document.addEventListener("visibilitychange",h),p(),this.addCleanup(()=>document.removeEventListener("visibilitychange",h)),f}};function uo(e){let{id:t,columns:n,data:r,pageSize:o=0,stickyHeader:a=!0,zebra:i=!0,animations:s=!0,respectReducedMotion:c=!0,compact:d=!1,maxHeight:l,selectable:u=!1,selectOnRowClick:p=!1,initialSelection:m=[],getRowId:g=(F,q)=>String(q),onSortChange:f,onSelectionChange:h,onRowClick:b}=e,k=n.slice(),S=r.slice(),x=r.slice(),T=null,y=null,C=1,M=typeof window<"u"&&typeof window.matchMedia=="function"?window.matchMedia("(prefers-reduced-motion: reduce)").matches:!1,P=!!s&&!(c&&M),L=v("div",{className:"lg-table-wrap",id:t});if(l!=null){let F=typeof l=="number"?`${l}px`:l;L.style.setProperty("--tbl-max-h",F)}let R=v("div",{className:"lg-table"}),_=v("div",{className:"lg-thead"}),X=v("div",{className:"lg-tbody"}),z=v("div",{className:"lg-tfoot"});a&&L.classList.add("sticky"),i&&L.classList.add("zebra"),d&&L.classList.add("compact"),u&&L.classList.add("selectable");let Z="36px";L.style.setProperty("--check-w",Z);function de(F){return F==="center"?"center":F==="right"?"flex-end":"flex-start"}function U(){let F=k.map(ae=>{let ie=(ae.width||"1fr").trim();return/\bfr$/.test(ie)?`minmax(0, ${ie})`:ie}),q=(u?[Z,...F]:F).join(" ");L.style.setProperty("--lg-cols",q)}U();function N(){return o?Math.max(1,Math.ceil(S.length/o)):1}function H(){if(!o)return S;let F=(C-1)*o;return S.slice(F,F+o)}function E(){if(!T||!y)return;let F=k.find(ie=>String(ie.key)===T),q=y==="asc"?1:-1,ae=F?.sortFn?(ie,ge)=>q*F.sortFn(ie,ge):(ie,ge)=>{let Q=ie[T],ee=ge[T];return Q==null&&ee==null?0:Q==null?-1*q:ee==null?1*q:typeof Q=="number"&&typeof ee=="number"?q*(Q-ee):q*String(Q).localeCompare(String(ee),void 0,{numeric:!0,sensitivity:"base"})};S.sort(ae)}let D=new Set(m);function O(){return Array.from(D)}function W(F){D.clear(),F.forEach(q=>D.add(q)),Fe(),on(),h?.(O())}function V(){D.clear(),Fe(),on(),h?.(O())}let me=null;function Fe(){if(!me)return;let F=H();if(!F.length){me.indeterminate=!1,me.checked=!1;return}let q=F.map((ie,ge)=>g(ie,(C-1)*(o||0)+ge)),ae=q.reduce((ie,ge)=>ie+(D.has(ge)?1:0),0);me.checked=ae===q.length,me.indeterminate=ae>0&&ae<q.length}function re(){let F=X.offsetWidth-X.clientWidth;_.style.paddingRight=F>0?`${F}px`:"0px"}function xe(){requestAnimationFrame(re)}let Ve=new ResizeObserver(()=>re()),kr=()=>re();function zd(){_.replaceChildren();let F=v("div",{className:"lg-tr lg-tr-head"});if(u){let q=v("div",{className:"lg-th lg-th-check"});me=v("input",{type:"checkbox"}),me.addEventListener("change",()=>{let ae=H(),ie=me.checked;ae.forEach((ge,Q)=>{let ee=g(ge,(C-1)*(o||0)+Q);ie?D.add(ee):D.delete(ee)}),h?.(O()),on()}),q.appendChild(me),F.appendChild(q)}k.forEach(q=>{let ae=v("button",{className:"lg-th",type:"button",title:q.title||q.header});ae.textContent=q.header,q.align&&ae.style.setProperty("--col-justify",de(q.align)),q.sortable&&ae.classList.add("sortable"),T===String(q.key)&&y?ae.setAttribute("data-sort",y):ae.removeAttribute("data-sort"),q.sortable&&ae.addEventListener("click",()=>{let ie=String(q.key);T!==ie?(T=ie,y="asc"):(y=y==="asc"?"desc":y==="desc"?null:"asc",y||(T=null,S=x.slice())),f?.(T,y),T&&y&&E(),Zn()}),F.appendChild(ae)}),_.appendChild(F);try{Ve.disconnect()}catch{}Ve.observe(X),xe()}function Cr(F){return Array.from(F.querySelectorAll(":scope > .lg-td, :scope > .lg-td-check"))}function Xi(F){return F.querySelector(".lg-td, .lg-td-check")}function Qi(F){let q=Xi(F);return q?q.getBoundingClientRect():null}function on(){let F=H(),q=new Map;Array.from(X.children).forEach(Q=>{let ee=Q,Ce=ee.getAttribute("data-id");if(!Ce)return;let Oe=Qi(ee);Oe&&q.set(Ce,Oe)});let ae=new Map;Array.from(X.children).forEach(Q=>{let ee=Q,Ce=ee.getAttribute("data-id");Ce&&ae.set(Ce,ee)});let ie=[];for(let Q=0;Q<F.length;Q++){let ee=F[Q],Ce=(o?(C-1)*o:0)+Q,Oe=g(ee,Ce);ie.push(Oe);let fe=ae.get(Oe);fe||(fe=Vd(ee,Ce),P&&Cr(fe).forEach(rn=>{rn.style.transform="translateY(6px)",rn.style.opacity="0"})),X.appendChild(fe)}let ge=[];if(ae.forEach((Q,ee)=>{ie.includes(ee)||ge.push(Q)}),!P){ge.forEach(Q=>Q.remove()),Fe(),xe();return}ie.forEach(Q=>{let ee=X.querySelector(`.lg-tr-body[data-id="${Q}"]`);if(!ee)return;let Ce=Qi(ee),Oe=q.get(Q),fe=Cr(ee);if(Oe&&Ce){let $e=Oe.left-Ce.left,Rt=Oe.top-Ce.top;fe.forEach(at=>{at.style.transition="none",at.style.transform=`translate(${$e}px, ${Rt}px)`,at.style.opacity="1"}),Xi(ee)?.getBoundingClientRect(),fe.forEach(at=>{at.style.willChange="transform, opacity",at.style.transition="transform .18s ease, opacity .18s ease"}),requestAnimationFrame(()=>{fe.forEach(at=>{at.style.transform="translate(0,0)"})})}else fe.forEach($e=>{$e.style.transition="transform .18s ease, opacity .18s ease"}),requestAnimationFrame(()=>{fe.forEach($e=>{$e.style.transform="translate(0,0)",$e.style.opacity="1"})});let Pr=$e=>{($e.propertyName==="transform"||$e.propertyName==="opacity")&&(fe.forEach(Rt=>{Rt.style.willChange="",Rt.style.transition="",Rt.style.transform="",Rt.style.opacity=""}),$e.currentTarget.removeEventListener("transitionend",Pr))},rn=fe[0];rn&&rn.addEventListener("transitionend",Pr)}),ge.forEach(Q=>{let ee=Cr(Q);ee.forEach(fe=>{fe.style.willChange="transform, opacity",fe.style.transition="transform .18s ease, opacity .18s ease",fe.style.opacity="0",fe.style.transform="translateY(-6px)"});let Ce=fe=>{fe.propertyName==="opacity"&&(fe.currentTarget.removeEventListener("transitionend",Ce),Q.remove())},Oe=ee[0];Oe?Oe.addEventListener("transitionend",Ce):Q.remove()}),Fe(),xe()}function Vd(F,q){let ae=g(F,q),ie=v("div",{className:"lg-tr lg-tr-body","data-id":ae});if(u){let ge=v("div",{className:"lg-td lg-td-check"}),Q=v("input",{type:"checkbox",className:"lg-row-check"});Q.checked=D.has(ae),Q.addEventListener("change",ee=>{ee.stopPropagation(),Q.checked?D.add(ae):D.delete(ae),Fe(),h?.(O())}),Q.addEventListener("click",ee=>ee.stopPropagation()),ge.appendChild(Q),ie.appendChild(ge)}return k.forEach(ge=>{let Q=v("div",{className:"lg-td"});ge.align&&Q.style.setProperty("--col-justify",de(ge.align));let ee=ge.render?ge.render(F,q):String(F[ge.key]??"");typeof ee=="string"?Q.textContent=ee:Q.appendChild(ee),ie.appendChild(Q)}),(b||u&&p)&&(ie.classList.add("clickable"),ie.addEventListener("click",ge=>{if(!ge.target.closest(".lg-td-check")){if(u&&p){let Q=!D.has(ae);Q?D.add(ae):D.delete(ae),Fe();let ee=ie.querySelector(".lg-row-check");ee&&(ee.checked=Q),h?.(O())}b?.(F,q,ge)}})),ie}function Zi(){if(z.replaceChildren(),!o)return;let F=N(),q=v("div",{className:"lg-pager"}),ae=v("button",{className:"btn",type:"button"},"\u2190"),ie=v("button",{className:"btn",type:"button"},"\u2192"),ge=v("span",{className:"lg-pager-info"},`${C} / ${F}`);ae.disabled=C<=1,ie.disabled=C>=F,ae.addEventListener("click",()=>Qn(C-1)),ie.addEventListener("click",()=>Qn(C+1)),q.append(ae,ge,ie),z.appendChild(q)}function Qn(F){let q=N();C=Math.min(Math.max(1,F),q),on(),Zi()}function Zn(){U(),zd(),on(),Zi()}function $d(F){x=F.slice(),S=F.slice(),T&&y&&E(),Qn(1)}function Kd(F){k=F.slice(),Zn()}function Jd(F,q="asc"){T=F,y=F?q:null,T&&y?E():S=x.slice(),Zn()}function qd(){try{Ve.disconnect()}catch{}window.removeEventListener("resize",kr)}return R.append(_,X,z),L.appendChild(R),window.addEventListener("resize",kr),Zn(),{root:L,setData:$d,setColumns:Kd,sortBy:Jd,getSelection:O,setSelection:W,clearSelection:V,setPage:Qn,getState:()=>({page:C,pageCount:N(),sortKey:T,sortDir:y}),destroy:qd}}var mo=!1,mn=new Set;function Gp(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}var Ne=e=>{let t=Gp();if(t){for(let n of mn)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function Hp(){mo||(mo=!0,window.addEventListener("keydown",Ne,!0),window.addEventListener("keypress",Ne,!0),window.addEventListener("keyup",Ne,!0),document.addEventListener("keydown",Ne,!0),document.addEventListener("keypress",Ne,!0),document.addEventListener("keyup",Ne,!0))}function Np(){mo&&(mo=!1,window.removeEventListener("keydown",Ne,!0),window.removeEventListener("keypress",Ne,!0),window.removeEventListener("keyup",Ne,!0),document.removeEventListener("keydown",Ne,!0),document.removeEventListener("keypress",Ne,!0),document.removeEventListener("keyup",Ne,!0))}function _p(e){return mn.size===0&&Hp(),mn.add(e),()=>{mn.delete(e),mn.size===0&&Np()}}function po(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function Wp(){let e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.display="none",t.style.flexShrink="0";let n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");let r=document.createElementNS(e,"animate");r.setAttribute("attributeName","stroke-dasharray"),r.setAttribute("values","1,150;90,150;90,150"),r.setAttribute("dur","1.5s"),r.setAttribute("repeatCount","indefinite");let o=document.createElementNS(e,"animateTransform");return o.setAttribute("attributeName","transform"),o.setAttribute("attributeType","XML"),o.setAttribute("type","rotate"),o.setAttribute("from","0 12 12"),o.setAttribute("to","360 12 12"),o.setAttribute("dur","1s"),o.setAttribute("repeatCount","indefinite"),n.append(r,o),t.appendChild(n),t}function go(e={}){let{id:t,placeholder:n="Rechercher\u2026",value:r="",size:o="md",disabled:a=!1,autoFocus:i=!1,onChange:s,onSearch:c,autoSearch:d=!1,debounceMs:l=0,focusKey:u="/",iconLeft:p,iconRight:m,withClear:g=!0,clearTitle:f="Effacer",ariaLabel:h,submitLabel:b,loading:k=!1,blockGameKeys:S=!0}=e,x=v("div",{className:"search"+(o?` search--${o}`:""),id:t}),T=v("span",{className:"search-ico search-ico--left"});if(p){let re=po(p);re&&T.appendChild(re)}else T.textContent="\u{1F50E}",T.style.opacity=".9";let y=v("input",{className:"input search-input",type:"text",placeholder:n,value:r,"aria-label":h||n}),C=v("span",{className:"search-ico search-ico--right"});if(m){let re=po(m);re&&C.appendChild(re)}let M=Wp();M.classList.add("search-spinner");let P=g?v("button",{className:"search-clear",type:"button",title:f},"\xD7"):null,L=b!=null?v("button",{className:"btn search-submit",type:"button"},b):null,R=v("div",{className:"search-field"},T,y,C,M,...P?[P]:[]);x.append(R,...L?[L]:[]);let _=!!a,X=null;function z(re){M.style.display=re?"inline-block":"none",x.classList.toggle("is-loading",re)}function Z(){X!=null&&(window.clearTimeout(X),X=null)}function de(re){Z(),l>0?X=window.setTimeout(()=>{X=null,re()},l):re()}function U(){s?.(y.value),d&&c&&c(y.value)}y.addEventListener("input",()=>{de(U)}),y.addEventListener("keydown",re=>{re.key==="Enter"?(re.preventDefault(),Z(),c?.(y.value)):re.key==="Escape"&&(y.value.length>0?E("",{notify:!0}):y.blur())}),P&&P.addEventListener("click",()=>E("",{notify:!0})),L&&L.addEventListener("click",()=>c?.(y.value));let N=()=>{};if(S&&(N=_p(y)),u){let re=xe=>{if(xe.key===u&&!xe.ctrlKey&&!xe.metaKey&&!xe.altKey){let Ve=document.activeElement;Ve&&(Ve.tagName==="INPUT"||Ve.tagName==="TEXTAREA"||Ve.isContentEditable)||(xe.preventDefault(),y.focus())}};window.addEventListener("keydown",re,!0),x.__cleanup=()=>{window.removeEventListener("keydown",re,!0),N()}}else x.__cleanup=()=>{N()};function H(re){_=!!re,y.disabled=_,P&&(P.disabled=_),L&&(L.disabled=_),x.classList.toggle("disabled",_)}function E(re,xe={}){let Ve=y.value;y.value=re??"",xe.notify&&Ve!==re&&de(U)}function D(){return y.value}function O(){y.focus()}function W(){y.blur()}function V(re){y.placeholder=re}function me(re){E("",re)}return H(_),z(k),i&&O(),{root:x,input:y,getValue:D,setValue:E,focus:O,blur:W,setDisabled:H,setPlaceholder:V,clear:me,setLoading:z,setIconLeft(re){T.replaceChildren();let xe=po(re??"\u{1F50E}");xe&&T.appendChild(xe)},setIconRight(re){C.replaceChildren();let xe=po(re??"");xe&&C.appendChild(xe)}}}function Fp(e){let t=String(e??"").trim().toLowerCase();return t?t==="common"?"Common":t==="uncommon"?"Uncommon":t==="rare"?"Rare":t==="legendary"?"Legendary":t==="mythical"?"Mythical":t==="divine"?"Divine":t==="celestial"?"Celestial":t==="unknown"||t==="unknow"?"Unknown":null:null}function Bp(e){return e.toLowerCase()}function fo(e={}){let{id:t,label:n="",type:r="neutral",tone:o="soft",border:a,withBorder:i,pill:s=!0,size:c="md",onClick:d,variant:l="default",rarity:u=null}=e,p=v("span",{className:"badge",id:t});s&&p.classList.add("badge--pill"),c==="sm"?p.classList.add("badge--sm"):c==="lg"?p.classList.add("badge--lg"):p.classList.add("badge--md"),d&&p.addEventListener("click",d);let m=!1,g=i;function f(){m||(g===!1?p.style.border="none":p.style.border="")}function h(y,C=o){p.classList.remove("badge--neutral","badge--info","badge--success","badge--warning","badge--danger","badge--soft","badge--outline","badge--solid"),p.classList.add(`badge--${y}`,`badge--${C}`),f()}function b(y){let C=(y??"").trim();C?(p.style.border=C,m=!0):(m=!1,f())}function k(y){g=y,f()}function S(y){p.textContent=y}function x(y,C=o){h(y,C)}function T(y){p.classList.remove("badge--rarity","badge--rarity-common","badge--rarity-uncommon","badge--rarity-rare","badge--rarity-legendary","badge--rarity-mythical","badge--rarity-divine","badge--rarity-celestial","badge--rarity-unknown"),p.style.background="",p.style.backgroundSize="",p.style.animation="",p.style.color="",p.style.webkitTextStroke="";let C=Fp(y);if(!C){p.textContent=String(y??"\u2014");return}p.textContent=C,p.classList.add("badge--rarity",`badge--rarity-${Bp(C)}`)}return l==="rarity"?T(u):(p.textContent=n,h(r,o),typeof i=="boolean"&&k(i),a&&b(a)),{root:p,setLabel:S,setType:x,setBorder:b,setWithBorder:k,setRarity:T}}zt();dt();var xg={expanded:!1,sort:{key:null,dir:null},search:""},Sg={categories:{}};async function Tl(){let e=await ln("tab-test",{version:2,defaults:Sg,sanitize:a=>({categories:a.categories&&typeof a.categories=="object"?a.categories:{}})});function t(a){return e.get().categories[a]||{...xg}}function n(a,i){let s=e.get(),c=t(a);e.update({categories:{...s.categories,[a]:{...c,expanded:i}}})}function r(a,i,s){let c=e.get(),d=t(a);e.update({categories:{...c.categories,[a]:{...d,sort:{key:i,dir:s}}}})}function o(a,i){let s=e.get(),c=t(a);e.update({categories:{...s.categories,[a]:{...c,search:i}}})}return{get:e.get,set:e.set,save:e.save,getCategoryState:t,setCategoryExpanded:n,setCategorySort:r,setCategorySearch:o}}var wg={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function Eo(e){return e?wg[e]??0:0}var Lo=class extends Ee{constructor(){super({id:"tab-test",label:"Test"});ne(this,"stateCtrl",null)}async build(n){this.stateCtrl=await Tl();let r=this.createContainer("test-section");r.style.display="flex",r.style.flexDirection="column",r.style.gap="12px",n.appendChild(r),await this.buildSpriteTables(r)}renderSprite(n){let r=v("div",{style:"display:flex;align-items:center;justify-content:center;width:32px;height:32px;"});if(n.spriteId){let o=n.spriteId;requestAnimationFrame(()=>{try{let a=ue.toCanvas(o,{scale:1});a.style.maxWidth="32px",a.style.maxHeight="32px",a.style.objectFit="contain",r.appendChild(a)}catch{r.textContent="-"}})}else r.textContent="-";return r}renderRarity(n){if(!n.rarity){let o=v("span",{style:"opacity:0.5;"});return o.textContent="\u2014",o}return fo({variant:"rarity",rarity:n.rarity,size:"sm"}).root}createDataCard(n,r,o,a){let i=this.stateCtrl.getCategoryState(n),s=p=>{if(!p)return o;let m=p.toLowerCase();return o.filter(g=>g.name.toLowerCase().includes(m))},c=uo({columns:a,data:s(i.search),pageSize:0,compact:!0,maxHeight:"calc(var(--lg-row-h, 40px) * 6)",getRowId:p=>p.spriteId,onSortChange:(p,m)=>{this.stateCtrl.setCategorySort(n,p,m)}});i.sort.key&&i.sort.dir&&c.sortBy(i.sort.key,i.sort.dir);let d=go({placeholder:"Search...",value:i.search,debounceMs:150,withClear:!0,size:"sm",focusKey:"",onChange:p=>{let m=p.trim();this.stateCtrl.setCategorySearch(n,m),c.setData(s(m))}}),l=v("div",{style:"margin-bottom:8px;"});l.appendChild(d.root);let u=v("div");return u.appendChild(l),u.appendChild(c.root),he({title:r,subtitle:`${o.length} entries`,variant:"soft",padding:"sm",expandable:!0,defaultExpanded:i.expanded,onExpandChange:p=>{this.stateCtrl.setCategoryExpanded(n,p)}},u)}formatCategoryName(n){return n.split("-").map(r=>r.charAt(0).toUpperCase()+r.slice(1)).join(" ")}findPlantBySprite(n,r){let o=le.get("plants");if(!o)return null;for(let i of Object.values(o))if(i?.seed?.spriteId===n||i?.plant?.spriteId===n||i?.crop?.spriteId===n)return i;let a=r.toLowerCase();for(let i of Object.values(o)){let s=(i?.seed?.name||"").toLowerCase();if(s===a||s===`${a} seed`)return i}return null}findPetBySpriteId(n){let r=le.get("pets");if(!r)return null;for(let o of Object.values(r))if(o?.spriteId===n)return o;return null}findItemBySpriteId(n){let r=le.get("items");if(!r)return null;for(let o of Object.values(r))if(o?.spriteId===n)return o;return null}findDecorBySpriteId(n){let r=le.get("decor");if(!r)return null;for(let o of Object.values(r))if(o?.spriteId===n)return o;return null}findEggBySpriteId(n){let r=le.get("eggs");if(!r)return null;for(let o of Object.values(r))if(o?.spriteId===n)return o;return null}getRarityForSprite(n,r,o){let a=n.toLowerCase();if(a==="plant"||a==="seed"||a==="tallplant"){let i=this.findPlantBySprite(r,o);if(i?.seed?.rarity)return i.seed.rarity}if(a==="pet"){let i=this.findPetBySpriteId(r);if(i?.rarity)return i.rarity}if(a==="item"){let i=this.findItemBySpriteId(r);if(i?.rarity)return i.rarity}if(a==="decor"){let i=this.findDecorBySpriteId(r);if(i?.rarity)return i.rarity}if(a==="egg"){let i=this.findEggBySpriteId(r);if(i?.rarity)return i.rarity}return null}yieldToMain(n=0){return new Promise(r=>{n>0?setTimeout(r,n):typeof requestIdleCallback<"u"?requestIdleCallback(()=>r(),{timeout:50}):setTimeout(r,4)})}async buildSpriteTables(n){let r=[{key:"name",header:"Name",sortable:!0,width:"1fr",sortFn:(a,i)=>a.name.localeCompare(i.name,void 0,{numeric:!0,sensitivity:"base"})},{key:"rarity",header:"Rarity",sortable:!0,width:"100px",align:"center",render:a=>this.renderRarity(a),sortFn:(a,i)=>Eo(a.rarity)-Eo(i.rarity)},{key:"sprite",header:"Sprite",width:"60px",align:"center",render:a=>this.renderSprite(a)}];if(!ue.ready())try{await ue.init()}catch{return}let o=ue.getCategories();for(let a=0;a<o.length;a++){await this.yieldToMain(8);let i=o[a],c=ue.getCategoryId(i).map(d=>{let l=`sprite/${i}/${d}`;return{name:d,spriteId:l,rarity:this.getRarityForSprite(i,l,d)}});if(c.sort((d,l)=>Eo(d.rarity)-Eo(l.rarity)),c.length>0){let d=this.createDataCard(i,this.formatCategoryName(i),c,r);n.appendChild(d)}}}};function Do(e={}){let{id:t,checked:n=!1,disabled:r=!1,size:o="md",label:a,labelSide:i="right",onChange:s}=e,c=v("div",{className:"lg-switch-wrap"}),d=v("button",{className:`lg-switch lg-switch--${o}`,id:t,type:"button",role:"switch","aria-checked":String(!!n),"aria-disabled":String(!!r),title:a??"Basculer"}),l=v("span",{className:"lg-switch-track"}),u=v("span",{className:"lg-switch-thumb"});d.append(l,u);let p=null;a&&i!=="none"&&(p=v("span",{className:"lg-switch-label"},a)),p&&i==="left"?c.append(p,d):p&&i==="right"?c.append(d,p):c.append(d);let m=!!n,g=!!r;function f(){d.classList.toggle("on",m),d.setAttribute("aria-checked",String(m)),d.disabled=g,d.setAttribute("aria-disabled",String(g))}function h(P=!1){g||(m=!m,f(),P||s?.(m))}function b(P){P.preventDefault(),h()}function k(P){g||((P.key===" "||P.key==="Enter")&&(P.preventDefault(),h()),P.key==="ArrowLeft"&&(P.preventDefault(),x(!1)),P.key==="ArrowRight"&&(P.preventDefault(),x(!0)))}d.addEventListener("click",b),d.addEventListener("keydown",k);function S(){return m}function x(P,L=!1){m=!!P,f(),L||s?.(m)}function T(P){g=!!P,f()}function y(P){if(!P){p&&(p.remove(),p=null);return}p?p.textContent=P:(p=v("span",{className:"lg-switch-label"},P),c.append(p))}function C(){d.focus()}function M(){d.removeEventListener("click",b),d.removeEventListener("keydown",k)}return f(),{root:c,button:d,isChecked:S,setChecked:x,setDisabled:T,setLabel:y,focus:C,destroy:M}}Vn();$n();var ld={enabled:!1,favoriteProduceList:[],favoritePetsList:[],favoriteMutations:[]},Qe=[{id:"Rainbow",color:"#FF00FF",desc:"All Rainbow items"},{id:"Gold",color:"#EBC800",desc:"All Gold items"},{id:"Wet",color:"#5FFFFF",desc:"All Wet items"},{id:"Chilled",color:"#B4E6FF",desc:"All Chilled items"},{id:"Frozen",color:"#B9C8FF",desc:"All Frozen items"},{id:"Dawnlit",color:"#F59BE1",desc:"Dawn mutations"},{id:"Dawncharged",color:"#C896FF",desc:"Dawn charged"},{id:"Ambershine",color:"#FFB478",desc:"Amber mutations"},{id:"Ambercharged",color:"#FA8C4B",desc:"Amber charged"}],Rx={Common:1,Uncommon:2,Rare:3,Legendary:4,Mythical:5,Divine:6,Celestial:7};function en(e){return e?Rx[e]??0:0}var vr=class extends Ee{constructor(){super({id:"tab-auto-favorite",label:"Auto-Favorite"});ne(this,"config",ld);ne(this,"allPlants",[]);ne(this,"allPets",[]);ne(this,"sectionElement",null)}async build(n){let r=this.createGrid("12px");r.id="auto-favorite-settings";let o=document.createElement("style");o.textContent=`
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
    `,n.appendChild(o),this.sectionElement=r,n.appendChild(r),this.config=ze("gemini:features:autoFavorite:ui",ld),await this.loadGameData(),await this.waitForSprites(),this.renderContent()}async loadGameData(){try{await le.waitForAnyData();let n=le.get("plants")||{},r=le.get("pets")||{};this.allPlants=Object.keys(n).sort((o,a)=>{let i=n[o]?.seed?.rarity||null,s=n[a]?.seed?.rarity||null,c=en(i)-en(s);return c!==0?c:o.localeCompare(a,void 0,{numeric:!0,sensitivity:"base"})}),this.allPets=Object.keys(r).sort((o,a)=>{let i=r[o]?.rarity||null,s=r[a]?.rarity||null,c=en(i)-en(s);return c!==0?c:o.localeCompare(a,void 0,{numeric:!0,sensitivity:"base"})})}catch(n){console.error("[AutoFavorite UI] Failed to load game data:",n)}}async waitForSprites(){if(ue.ready())return;let n=1e4,r=100,o=0;return new Promise(a=>{let i=()=>{ue.ready()||o>=n?a():(o+=r,setTimeout(i,r))};i()})}renderContent(){this.sectionElement&&(this.sectionElement.innerHTML="",this.sectionElement.appendChild(this.createMasterToggle()),this.sectionElement.appendChild(this.createMutationsCard()),this.sectionElement.appendChild(this.createProduceCard()),this.sectionElement.appendChild(this.createPetsCard()))}createMasterToggle(){let n=v("div",{className:"kv"}),r=st({text:"Enable Auto-Favorite",tone:"default",size:"lg"}),o=Do({checked:this.config.enabled,onChange:a=>{this.config.enabled=a,this.saveConfig()}});return n.append(r.root,o.root),he({title:"Auto-Favorite",padding:"lg"},n,v("p",{style:"margin-top: 6px; font-size: 12px; color: var(--muted);"},"Automatically favorite items when added to inventory"))}createMutationsCard(){let n=v("div",{style:"display: grid; gap: 10px;"}),r=v("div",{style:"display: grid; grid-template-columns: 1fr 1fr; gap: 8px;"});r.appendChild(this.createMutationButton(Qe[0],{align:"center"})),r.appendChild(this.createMutationButton(Qe[1],{align:"center"})),n.appendChild(r);let o=v("div",{style:"display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;"});o.appendChild(this.createMutationButton(Qe[2],{align:"center"})),o.appendChild(this.createMutationButton(Qe[3],{align:"center"})),o.appendChild(this.createMutationButton(Qe[4],{align:"center"})),n.appendChild(o);let a=v("div",{style:"display: grid; grid-template-columns: 1fr 1fr; gap: 8px;"});a.appendChild(this.createMutationButton(Qe[5],{align:"center"})),a.appendChild(this.createMutationButton(Qe[6],{align:"center"})),n.appendChild(a);let i=v("div",{style:"display: grid; grid-template-columns: 1fr 1fr; gap: 8px;"});return i.appendChild(this.createMutationButton(Qe[7],{align:"center"})),i.appendChild(this.createMutationButton(Qe[8],{align:"center"})),n.appendChild(i),he({title:"Mutations Priority",variant:"soft",padding:"lg",expandable:!0,defaultExpanded:!0},n,v("p",{style:"margin-top: 8px; font-size: 11px; color: var(--muted);"},`${this.config.favoriteMutations.length} / ${Qe.length} active`))}createMutationButton(n,r={}){let{large:o=!1,align:a="center"}=r,i=this.config.favoriteMutations.includes(n.id),s=n.color,c=parseInt(s.slice(1,3),16),d=parseInt(s.slice(3,5),16),l=parseInt(s.slice(5,7),16),u=`rgba(${c}, ${d}, ${l}, 0.25)`,p=s;n.id==="Rainbow"&&i&&(u="linear-gradient(135deg, rgba(255,0,0,0.3) 0%, rgba(255,165,0,0.3) 20%, rgba(255,255,0,0.3) 40%, rgba(0,128,0,0.3) 60%, rgba(0,0,255,0.3) 80%, rgba(75,0,130,0.3) 100%)",p="#fff9c4");let m=v("div",{style:`padding: ${o?"14px":"8px 16px"}; min-height: 52px; border-radius: var(--card-radius, 12px); cursor: pointer; transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1); background: ${i?u:"color-mix(in oklab, var(--tab-bg) 5%, transparent)"}; border: 2px solid ${i?p:"color-mix(in oklab, var(--tab-bg) 20%, transparent)"}; display: flex; align-items: center; justify-content: center; gap: 16px; box-shadow: ${i?n.id==="Rainbow"?"0 4px 18px rgba(255,255,255,0.25)":`0 4px 12px rgba(${c}, ${d}, ${l}, 0.3)`:"none"}; opacity: ${i?"1":"0.8"};`}),g=v("div",{style:"width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(ue.ready()){let b=ue.toCanvas("plant","Sunflower",{mutations:[n.id],scale:.18});b.style.width="32px",b.style.height="32px",b.style.objectFit="contain",g.appendChild(b)}}catch{}let f=n.id.charAt(0).toUpperCase()+n.id.slice(1).toLowerCase(),h=v("div",{style:`font-size: ${o?"15px":"13px"}; font-weight: 600; color: var(--fg); text-shadow: 0 1px 2px rgba(0,0,0,0.5); white-space: nowrap;`},f);if(m.append(g,h),n.id==="Rainbow"||n.id==="Gold"){let b=v("div",{style:"width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;"});try{if(ue.ready()){let k=ue.toCanvas("pet","Capybara",{mutations:[n.id],scale:.18});k.style.width="32px",k.style.height="32px",k.style.objectFit="contain",b.appendChild(k)}}catch{}m.append(b)}else{let b=v("div",{style:"width: 32px; height: 32px; flex-shrink: 0;"});m.append(b)}return m.addEventListener("click",()=>{i?this.config.favoriteMutations=this.config.favoriteMutations.filter(b=>b!==n.id):this.config.favoriteMutations.push(n.id),this.saveConfig(),this.renderContent()}),m}createProduceCard(){return this.createItemSelectionCard({title:"Produce",items:this.allPlants,category:"plant",selected:this.config.favoriteProduceList,onUpdate:n=>{this.config.favoriteProduceList=n,this.saveConfig()}})}createPetsCard(){return this.createItemSelectionCard({title:"Pets",items:this.allPets,category:"pet",selected:this.config.favoritePetsList,onUpdate:n=>{this.config.favoritePetsList=n,this.saveConfig()}})}createItemSelectionCard(n){let{title:r,items:o,category:a,selected:i,onUpdate:s}=n,c=new Set(i),d=o,l=v("div",{style:"margin-bottom: 8px;"}),u=go({placeholder:`Search ${r.toLowerCase()}...`,value:"",debounceMs:150,withClear:!0,size:"sm",focusKey:"",onChange:y=>{let C=y.trim().toLowerCase();C?d=o.filter(M=>M.toLowerCase().includes(C)):d=o,S.setData(f())}});l.appendChild(u.root);let p=v("div",{style:"display: flex; gap: 8px; margin-bottom: 12px;"}),m=lt({label:"Select All",variant:"default",size:"sm",onClick:()=>{d.forEach(y=>c.add(y)),s(Array.from(c)),S.setData(f()),T()}}),g=lt({label:"Deselect All",variant:"default",size:"sm",onClick:()=>{d.forEach(y=>c.delete(y)),s(Array.from(c)),S.setData(f()),T()}});p.append(m,g);let f=()=>d.map(y=>({id:y,name:y,rarity:this.getItemRarity(y,a),selected:c.has(y)})),h=y=>{if(!y){let M=v("span",{style:"opacity:0.5;"});return M.textContent="\u2014",M}return fo({variant:"rarity",rarity:y,size:"sm"}).root},b=y=>{let C=v("div",{style:"width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0; background: rgba(0,0,0,0.05); border-radius: 6px;"});try{if(ue.ready()){let M=a,P=y;a==="plant"&&(["Bamboo","Cactus"].includes(y)&&(M="tallplant"),y==="DawnCelestial"&&(P="DawnCelestialCrop"),y==="MoonCelestial"&&(P="MoonCelestialCrop"),y==="OrangeTulip"&&(P="Tulip"));let L=ue.toCanvas(M,P,{scale:.5});L.style.width="28px",L.style.height="28px",L.style.objectFit="contain",C.appendChild(L)}}catch{}return C},S=uo({columns:[{key:"name",header:"Name",width:"1fr",align:"center",sortable:!0,sortFn:(y,C)=>y.name.localeCompare(C.name,void 0,{numeric:!0,sensitivity:"base"}),render:y=>{let C=v("div",{style:"display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%;"}),M=b(y.id),P=v("span",{style:"font-weight: 500; color: var(--fg); white-space: nowrap;"},y.name);return C.append(M,P),C}},{key:"rarity",header:"Rarity",width:"100px",align:"center",sortable:!0,sortFn:(y,C)=>en(y.rarity)-en(C.rarity),render:y=>h(y.rarity)}],data:f(),maxHeight:280,compact:!0,zebra:!0,animations:!0,selectable:!0,selectOnRowClick:!0,initialSelection:Array.from(c),getRowId:y=>y.id,onSelectionChange:y=>{c.clear(),y.forEach(C=>c.add(C)),s(Array.from(c)),T()}}),x=v("p",{style:"margin-top: 8px; font-size: 11px; color: var(--muted);"}),T=()=>{x.textContent=`${c.size} / ${o.length} selected`};return T(),he({title:`${r} (${c.size}/${o.length})`,variant:"soft",padding:"lg",expandable:!0,defaultExpanded:!1},l,p,S.root,x)}getItemRarity(n,r){try{if(r==="pet")return(le.get("pets")||{})[n]?.rarity||null;if(r==="plant"){let o=le.get("plants")||{},a=o[n];if(a?.seed?.rarity)return a.seed.rarity;let i=n.toLowerCase();for(let s of Object.values(o))if(s?.seed?.name?.toLowerCase()===i||s?.plant?.name?.toLowerCase()===i)return s.seed.rarity}}catch{}return null}async saveConfig(){ot("gemini:features:autoFavorite:ui",this.config);try{let{setEnabled:n,updateSimpleConfig:r}=await Promise.resolve().then(()=>(sd(),id));await r({enabled:this.config.enabled,favoriteSpecies:[...this.config.favoriteProduceList,...this.config.favoritePetsList],favoriteMutations:this.config.favoriteMutations}),await n(this.config.enabled)}catch(n){console.error("[AutoFavorite UI] Failed to apply config:",n)}}};$n();var cd={autoFavorite:{enabled:!1},bulkFavorite:{enabled:!1},journalChecker:{enabled:!1},cropSizeIndicator:{enabled:!1,showForGrowing:!0,showForMature:!0,showJournalBadges:!0},eggProbabilityIndicator:{enabled:!1},cropValueIndicator:{enabled:!1},xpTracker:{enabled:!1},abilityTracker:{enabled:!1},mutationTracker:{enabled:!1},cropBoostTracker:{enabled:!1},turtleTimer:{enabled:!1}},xr=class extends Ee{constructor(){super({id:"tab-feature-settings",label:"Features"});ne(this,"config",cd)}async build(n){let r=this.createGrid("12px");r.id="feature-settings",n.appendChild(r),this.config=ze("gemini:features:config",cd),r.appendChild(this.createQOLCard()),r.appendChild(this.createVisualIndicatorsCard()),r.appendChild(this.createTrackingCard())}createQOLCard(){return he({title:"Quality of Life",padding:"lg",expandable:!0,defaultExpanded:!0},this.createToggleRow("Auto-Favorite",this.config.autoFavorite.enabled,n=>{this.config.autoFavorite.enabled=n,this.saveConfig()}),this.createToggleRow("Bulk Favorite",this.config.bulkFavorite.enabled,n=>{this.config.bulkFavorite.enabled=n,this.saveConfig()}),this.createToggleRow("Journal Checker",this.config.journalChecker.enabled,n=>{this.config.journalChecker.enabled=n,this.saveConfig()}))}createVisualIndicatorsCard(){return he({title:"Visual Indicators",variant:"soft",padding:"lg",expandable:!0,defaultExpanded:!0},this.createToggleRow("Crop Size",this.config.cropSizeIndicator.enabled,n=>{this.config.cropSizeIndicator.enabled=n,this.saveConfig()},"Shows size % and journal badges"),this.createToggleRow("Egg Probability",this.config.eggProbabilityIndicator.enabled,n=>{this.config.eggProbabilityIndicator.enabled=n,this.saveConfig()},"Shows hatch chances + mutation %"),this.createToggleRow("Crop Value",this.config.cropValueIndicator.enabled,n=>{this.config.cropValueIndicator.enabled=n,this.saveConfig()},"Shows coin value"))}createTrackingCard(){return he({title:"Tracking & Analytics",variant:"soft",padding:"lg",expandable:!0,defaultExpanded:!1},this.createToggleRow("XP Tracker",this.config.xpTracker.enabled,n=>{this.config.xpTracker.enabled=n,this.saveConfig()}),this.createToggleRow("Ability Tracker",this.config.abilityTracker.enabled,n=>{this.config.abilityTracker.enabled=n,this.saveConfig()}),this.createToggleRow("Mutation Tracker",this.config.mutationTracker.enabled,n=>{this.config.mutationTracker.enabled=n,this.saveConfig()}),this.createToggleRow("Crop Boost Tracker",this.config.cropBoostTracker.enabled,n=>{this.config.cropBoostTracker.enabled=n,this.saveConfig()}),this.createToggleRow("Turtle Timer",this.config.turtleTimer.enabled,n=>{this.config.turtleTimer.enabled=n,this.saveConfig()}))}createToggleRow(n,r,o,a){let i=v("div",{className:a?"kv-col":"kv"}),s=v("div",{className:"kv"}),c=st({text:n,tone:"default",size:"md"}),d=Do({checked:r,onChange:o});if(s.append(c.root,d.root),a){i.appendChild(s);let l=v("p",{className:"helper-text",style:"font-size: 12px; color: var(--item-desc, var(--muted)); margin-top: 4px;"},a);return i.appendChild(l),i}return s}saveConfig(){ot("gemini:features:config",this.config),console.log("[FeatureSettings] Config saved:",this.config)}};var Sr=class extends Ee{constructor(){super({id:"tab-journal-checker",label:"Journal"});ne(this,"progress",null)}async build(n){this.container=n;let r=this.createGrid("12px");r.id="journal-checker",n.appendChild(r),await this.updateProgress();let o=(a=>{this.progress=a.detail,this.renderContent()});window.addEventListener("gemini:journal-updated",o),this.addCleanup(()=>{window.removeEventListener("gemini:journal-updated",o)})}async updateProgress(){try{let{aggregateJournalProgress:n}=await Promise.resolve().then(()=>(gd(),md));this.progress=await n(),this.renderContent()}catch(n){console.error("[JournalChecker] Failed to load progress:",n)}}renderContent(){if(!this.container)return;let n=this.container.querySelector("#journal-checker");if(n){if(n.innerHTML="",!this.progress){n.appendChild(this.createLoadingCard());return}n.appendChild(this.createProgressCard()),n.appendChild(this.createActionsCard())}}createLoadingCard(){return he({title:"Loading...",padding:"lg"},v("p",{},"Fetching journal data..."))}createProgressCard(){if(!this.progress)return v("div");let n=this.createProgressRow("\u{1F331} Plants",this.progress.plants.logged,this.progress.plants.total,this.progress.plants.percentage),r=this.createProgressRow("\u{1F43E} Pets",this.progress.pets.logged,this.progress.pets.total,this.progress.pets.percentage),o=this.createProgressRow("\u{1F3A8} Decor",this.progress.decor.logged,this.progress.decor.total,this.progress.decor.percentage);return he({title:"Collection Progress",padding:"lg",expandable:!0,defaultExpanded:!0},n,r,o)}createProgressRow(n,r,o,a){let i=v("div",{className:"kv-col",style:"gap: 6px;"}),s=v("div",{className:"kv"}),c=st({text:n,tone:"default",size:"md"}),d=v("span",{style:"font-size: 13px; color: var(--item-desc, var(--muted));"},`${r}/${o}`);s.append(c.root,d);let l=v("div",{style:`
        width: 100%;
        height: 6px;
        background: var(--card-bg, var(--soft));
        border-radius: 3px;
        overflow: hidden;
      `}),u=v("div",{style:`
        width: ${a}%;
        height: 100%;
        background: linear-gradient(90deg, var(--tab-bg, var(--accent)), var(--group-title, var(--pill-to)));
        transition: width 0.3s ease;
      `});return l.appendChild(u),i.append(s,l),i}createActionsCard(){let n=lt({label:"\u{1F504} Refresh",variant:"default",size:"md",onClick:async()=>{await this.updateProgress()}}),r=lt({label:"\u{1F4CB} Show Missing",variant:"default",size:"md",onClick:()=>{this.showMissingItems()}}),o=v("div",{style:"display: flex; gap: 8px; flex-wrap: wrap;"});return o.append(n,r),he({title:"Actions",variant:"soft",padding:"lg",expandable:!0,defaultExpanded:!1},o)}showMissingItems(){if(!this.progress)return;let n=[{category:"Plants",items:this.progress.plants.missing},{category:"Pets",items:this.progress.pets.missing},{category:"Decor",items:this.progress.decor.missing}].filter(r=>r.items.length>0);if(n.length===0){console.log("\u{1F389} [JournalChecker] Collection complete!");return}console.group("\u{1F4CB} Missing Items"),n.forEach(r=>{console.group(`${r.category} (${r.items.length})`),r.items.forEach(o=>console.log(`- ${o}`)),console.groupEnd()}),console.groupEnd()}};var Ii=null;function fd(){return Ii||(Ii=new Lo),Ii}async function Ei(){await fd().preload()}function Li(e){return[new co(e),new xr,new vr,new Sr,fd()]}ye();function Di(e){let{shadow:t,initialOpen:n}=e,r=v("div",{className:"gemini-panel",id:"panel",ariaHidden:String(!n)}),o=v("div",{className:"gemini-tabbar"}),a=v("div",{className:"gemini-content",id:"content"}),i=v("div",{className:"gemini-resizer",title:"Resize"}),s=v("button",{className:"gemini-close",title:"Fermer",ariaLabel:"Fermer"},"\u2715");r.append(o,a,i);let c=v("div",{className:"gemini-wrapper"},r);return t.append(c),{panel:r,tabbar:o,content:a,resizer:i,closeButton:s,wrapper:c}}Gt();ye();function Ri(e){let{resizer:t,host:n,panel:r,shadow:o,onWidthChange:a,initialWidth:i,minWidth:s,maxWidth:c}=e,d=s,l=c;function u(){let T=Le.detect(),y=Math.round(A.visualViewport?.width??A.innerWidth??0);if(T.platform==="mobile"||T.os==="ios"||T.os==="android"){let C=getComputedStyle(o.host),M=parseFloat(C.getPropertyValue("--inset-l"))||0,P=parseFloat(C.getPropertyValue("--inset-r"))||0,L=Math.max(280,y-Math.round(M+P)),R=Math.min(420,Math.max(300,Math.floor(y*.66))),_=L;d=Math.min(R,L),l=_}else d=s,l=c;return{min:d,max:l}}function p(T){return Math.max(d,Math.min(l,Number(T)||i))}function m(T){let y=p(T);n.style.setProperty("--w",`${y}px`),a(y)}u();let g=Le.detect(),f=!(g.platform==="mobile"||g.os==="ios"||g.os==="android"),h=!1,b=T=>{if(!h)return;T.preventDefault();let y=Math.round(A.innerWidth-T.clientX);m(y)},k=()=>{h&&(h=!1,document.body.style.cursor="",A.removeEventListener("mousemove",b),A.removeEventListener("mouseup",k))},S=T=>{f&&(T.preventDefault(),h=!0,document.body.style.cursor="ew-resize",A.addEventListener("mousemove",b),A.addEventListener("mouseup",k))};t.addEventListener("mousedown",S);function x(){t.removeEventListener("mousedown",S),A.removeEventListener("mousemove",b),A.removeEventListener("mouseup",k)}return{calculateResponsiveBounds:u,constrainWidthToLimits:p,setHudWidth:m,destroy:x}}function Oi(e){let{panel:t,onToggle:n,onClose:r,toggleCombo:o=c=>c.ctrlKey&&c.shiftKey&&c.key.toLowerCase()==="u",closeOnEscape:a=!0}=e;function i(c){let d=t.classList.contains("open");if(a&&c.key==="Escape"&&d){r();return}o(c)&&(c.preventDefault(),c.stopPropagation(),n())}document.addEventListener("keydown",i,{capture:!0});function s(){document.removeEventListener("keydown",i,{capture:!0})}return{destroy:s}}var bd=`
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
`;function _i(e,t,n){if(e.querySelector(`style[data-style-id="${n}"]`))return;let r=document.createElement("style");r.setAttribute("data-style-id",n),r.textContent=t,e.appendChild(r)}var hd=`
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
  
`;var yd=`
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
`;var vd=`
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
`;var xd=`
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
`;var Sd=`
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
`;var wd=`
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
`;var Td=`
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
`;var kd=`
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
`;var Cd=`
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
`;var Pd=`
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
`;var Md=`
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
`;var Ad=`
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
`;var Id=`
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
`;var Ed=`
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
`;var Ld=`
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
`;var Dd=`
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
`;var Rd=`
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
`;var Hx={all:"initial",position:"fixed",top:"0",right:"0",zIndex:"2147483647",pointerEvents:"auto",fontFamily:'system-ui, -apple-system, "Segoe UI", Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',fontSize:"13px",lineHeight:"1.35"};function Nx(e="gemini-root"){let t=document.createElement("div");t.id=e,Object.assign(t.style,Hx),(document.body||document.documentElement).appendChild(t);let n=t.attachShadow({mode:"open"});return{host:t,shadow:n}}function _x(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:16}):setTimeout(e,0)})}async function Wi(e){let{hostId:t="gemini-hud-root",initialWidth:n,initialOpen:r,onWidthChange:o,onOpenChange:a,themes:i,initialTheme:s,onThemeChange:c,buildSections:d,initialTab:l,onTabChange:u,toggleCombo:p=E=>E.ctrlKey&&E.shiftKey&&E.key.toLowerCase()==="u",closeOnEscape:m=!0,minWidth:g=420,maxWidth:f=720}=e,{host:h,shadow:b}=Nx(t),k=[[Gi,"variables"],[Hi,"primitives"],[Ni,"utilities"],[bd,"hud"],[hd,"card"],[yd,"badge"],[vd,"button"],[xd,"input"],[Sd,"label"],[wd,"navTabs"],[Td,"searchBar"],[kd,"select"],[Cd,"switch"],[Pd,"table"],[Md,"timeRangePicker"],[Ad,"tooltip"],[Id,"slider"],[Ed,"reorderableList"],[Ld,"colorPicker"],[Dd,"log"],[Rd,"settings"]];for(let E=0;E<k.length;E++){let[D,O]=k[E];_i(b,D,O),E%5===4&&await _x()}let{panel:S,tabbar:x,content:T,resizer:y,closeButton:C,wrapper:M}=Di({shadow:b,initialOpen:r});function P(E){S.dispatchEvent(new CustomEvent("gemini:hud-open-change",{detail:{isOpen:E},bubbles:!0})),a?.(E)}function L(E){let D=S.classList.contains("open");S.classList.toggle("open",E),S.setAttribute("aria-hidden",E?"false":"true"),E!==D&&P(E)}L(r),C.addEventListener("click",E=>{E.preventDefault(),E.stopPropagation(),L(!1)});let R=Dr({host:h,themes:i,initialTheme:s,onThemeChange:c}),_=Ri({resizer:y,host:h,panel:S,shadow:b,onWidthChange:o||(()=>{}),initialWidth:n,minWidth:g,maxWidth:f});_.setHudWidth(n);let X=d({applyTheme:R.applyTheme,initialTheme:s,getCurrentTheme:R.getCurrentTheme,setHUDWidth:_.setHudWidth,setHUDOpen:L}),z=new an(X,T,{applyTheme:R.applyTheme,getCurrentTheme:R.getCurrentTheme}),Z=X.map(E=>({id:E.id,label:E.label})),de=os(Z,l||Z[0]?.id||"",E=>{z.activate(E),u?.(E)});de.root.style.flex="1 1 auto",de.root.style.minWidth="0",x.append(de.root,C),z.activate(l||Z[0]?.id||"");let U=Oi({panel:S,onToggle:()=>L(!S.classList.contains("open")),onClose:()=>L(!1),toggleCombo:p,closeOnEscape:m}),N=()=>{de.recalc();let E=parseInt(getComputedStyle(h).getPropertyValue("--w"))||n;_.calculateResponsiveBounds(),_.setHudWidth(E)};A.addEventListener("resize",N);function H(){U.destroy(),_.destroy(),A.removeEventListener("resize",N)}return{host:h,shadow:b,wrapper:M,panel:S,content:T,setOpen:L,setWidth:_.setHudWidth,sections:X,manager:z,nav:de,destroy:H}}var tn={isOpen:"gemini.hud.isOpen",width:"gemini.hud.width",theme:"gemini.hud.theme",activeTab:"gemini.hud.activeTab"},Yn={isOpen:!1,width:480,theme:"dark",activeTab:"tab-settings"};function Fi(){return{isOpen:it(tn.isOpen,Yn.isOpen),width:it(tn.width,Yn.width),theme:it(tn.theme,Yn.theme),activeTab:it(tn.activeTab,Yn.activeTab)}}function nn(e,t){sn(tn[e],t)}var Wx="https://i.imgur.com/IMkhMur.png",Fx="Stats";function wr(e){let t=e.iconUrl||Wx,n=e.ariaLabel||"Open MGH",r=null,o=null,a=null,i=!1,s=null,c=null,d=["Chat","Leaderboard","Stats","Open Activity Log"],l=S=>{try{return typeof CSS<"u"&&CSS&&typeof CSS.escape=="function"?CSS.escape(S):S.replace(/"/g,'\\"')}catch{return S}};function u(){let S=document.querySelector(d.map(T=>`button[aria-label="${l(T)}"]`).join(","));if(!S)return null;let x=S.parentElement;for(;x&&x!==document.body;){if(d.reduce((y,C)=>y+x.querySelectorAll(`button[aria-label="${l(C)}"]`).length,0)>=2)return x;x=x.parentElement}return null}function p(S){return S}function m(S){let x=Array.from(S.querySelectorAll("button[aria-label]"));if(!x.length)return{refBtn:null,refWrapper:null};let T=x.filter(_=>_.dataset.mghBtn!=="true"&&(_.getAttribute("aria-label")||"")!==(e.ariaLabel||"Open MGH")),y=T.length?T:x,C=y.find(_=>(_.getAttribute("aria-label")||"").toLowerCase()===Fx.toLowerCase())||null,M=y.length>=2?y.length-2:y.length-1,P=C||y[M],L=P.parentElement,R=L&&L.parentElement===S&&L.tagName==="DIV"?L:null;return{refBtn:P,refWrapper:R}}function g(S,x,T){let y=S.cloneNode(!1);y.type="button",y.setAttribute("aria-label",x),y.title=x,y.dataset.mghBtn="true",y.style.pointerEvents="auto",y.removeAttribute("id");let C=document.createElement("img");return C.src=T,C.alt="MGH",C.style.pointerEvents="none",C.style.userSelect="none",C.style.width="76%",C.style.height="76%",C.style.objectFit="contain",C.style.display="block",C.style.margin="auto",y.appendChild(C),y.addEventListener("click",M=>{M.preventDefault(),M.stopPropagation();try{e.onClick?.()}catch{}}),y}function f(){if(i)return!1;i=!0;let S=!1;try{let x=u();if(!x)return!1;s!==x&&(s=x);let{refBtn:T,refWrapper:y}=m(x);if(!T)return!1;o=x.querySelector('div[data-mgh-wrapper="true"]'),!o&&y&&(o=y.cloneNode(!1),o.dataset.mghWrapper="true",o.removeAttribute("id"),S=!0);let C=o?.querySelector('button[data-mgh-btn="true"]')||null;r||(r=C),r||(r=g(T,n,t),o?o.appendChild(r):r.parentElement!==x&&x.appendChild(r),S=!0),o&&o.parentElement!==x&&(x.appendChild(o),S=!0);let M=x;if(M&&M!==c){try{k.disconnect()}catch{}c=M,k.observe(c,{childList:!0,subtree:!0})}return S}finally{i=!1}}f();let h=document.getElementById("App")||document.body,b=null,k=new MutationObserver(S=>{let x=S.every(y=>{let C=Array.from(y.addedNodes||[]),M=Array.from(y.removedNodes||[]),P=C.concat(M);if(P.length===0){let L=y.target;return o&&(L===o||o.contains(L))||r&&(L===r||r.contains(L))}return P.every(L=>!!(!(L instanceof HTMLElement)||o&&(L===o||o.contains(L))||r&&(L===r||r.contains(L))))}),T=S.some(y=>Array.from(y.removedNodes||[]).some(C=>C instanceof HTMLElement?!!(o&&(C===o||o.contains(C))||r&&(C===r||r.contains(C))):!1));x&&!T||b===null&&(b=window.setTimeout(()=>{if(b=null,f()&&o){let C=o.parentElement;C&&C.lastElementChild!==o&&C.appendChild(o)}},150))});return k.observe(h,{childList:!0,subtree:!0}),a=()=>k.disconnect(),()=>{try{a?.()}catch{}try{o?.remove()}catch{}}}br();ye();var zx={},Hd=[];function Bx(){return Hd.slice()}function jx(e){Hd.push(e)}function Nd(e){try{return JSON.parse(e)}catch{return}}function Od(e){if(typeof e=="string"){let t=Nd(e);return t!==void 0?t:e}return e}function _d(e){if(e!=null){if(typeof e=="string"){let t=Nd(e);return t!==void 0?_d(t):e}if(Array.isArray(e)&&typeof e[0]=="string")return e[0];if(typeof e=="object"){let t=e;return t.type??t.Type??t.kind??t.messageType}}}function Ux(e){let t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function B(e,t,n){let r=typeof t=="boolean"?t:!0,o=typeof t=="function"?t:n,a=(i,s)=>{if(_d(i)!==e)return;let d=o(i,s);return d&&typeof d=="object"&&"kind"in d?d:typeof d=="boolean"?d?void 0:{kind:"drop"}:r?void 0:{kind:"drop"}};return jx(a),a}var Xn=new WeakSet,Gd=new WeakMap;function Wd(e){let t=e.pageWindow,n=!!e.debug,r=e.middlewares&&e.middlewares.length?e.middlewares:Bx();if(!r.length)return()=>{};let o=p=>({ws:p,pageWindow:t,debug:n}),a=(p,m)=>{let g=p;for(let f of r){let h=f(g,o(m));if(h){if(h.kind==="drop")return{kind:"drop"};h.kind==="replace"&&(g=h.message)}}return g!==p?{kind:"replace",message:g}:void 0},i=null,s=null,c=null,d=()=>{let p=t?.MagicCircle_RoomConnection,m=p?.sendMessage;if(!p||typeof m!="function")return!1;if(Xn.has(m))return!0;let g=m.bind(p);function f(...h){let b=h.length===1?h[0]:h,k=Od(b),S=a(k,Ux(t));if(S?.kind==="drop"){n&&console.log("[WS] drop outgoing (RoomConnection.sendMessage)",k);return}if(S?.kind==="replace"){let x=S.message;return h.length>1&&Array.isArray(x)?(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",k,"=>",x),g(...x)):(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",k,"=>",x),g(x))}return g(...h)}Xn.add(f),Gd.set(f,m);try{p.sendMessage=f,Xn.add(p.sendMessage),n&&console.log("[WS] outgoing patched via MagicCircle_RoomConnection.sendMessage")}catch{return!1}return i=()=>{try{p.sendMessage===f&&(p.sendMessage=m)}catch{}},!0};(()=>{let p=t?.WebSocket?.prototype,m=p?.send;if(typeof m!="function"||Xn.has(m))return;function g(f){let h=Od(f),b=a(h,this);if(b?.kind==="drop"){n&&console.log("[WS] drop outgoing (ws.send)",h);return}if(b?.kind==="replace"){let k=b.message,S=typeof k=="string"||k instanceof ArrayBuffer||k instanceof Blob?k:JSON.stringify(k);return n&&console.log("[WS] replace outgoing (ws.send)",h,"=>",k),m.call(this,S)}return m.call(this,f)}Xn.add(g),Gd.set(g,m);try{p.send=g,n&&console.log("[WS] outgoing patched via WebSocket.prototype.send")}catch{return}s=()=>{try{p.send===g&&(p.send=m)}catch{}}})();let u=e.waitForRoomConnectionMs??4e3;if(!d()&&u>0){let p=Date.now();c=setInterval(()=>{if(d()){clearInterval(c),c=null;return}Date.now()-p>u&&(clearInterval(c),c=null,n&&console.log("[WS] RoomConnection not found, only ws.send is patched"))},250)}return()=>{if(c){try{clearInterval(c)}catch{}c=null}if(i){try{i()}catch{}i=null}if(s){try{s()}catch{}s=null}}}(function(){try{let t=zx,n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();var Jx={},Bd=[];function Vx(){return Bd.slice()}function Fd(e){Bd.push(e)}function $x(e){if(e!=null){if(typeof e=="object"){let t=e;if(typeof t.type=="string")return t.type;if(typeof t.Type=="string")return t.Type;if(typeof t.kind=="string")return t.kind;if(typeof t.messageType=="string")return t.messageType}if(Array.isArray(e)&&typeof e[0]=="string")return e[0]}}function Kx(e){if(typeof e=="string")try{return JSON.parse(e)}catch{return e}return e}var Bi=Symbol.for("ariesmod.ws.handlers.patched");function be(e,t){if(typeof e=="string"){let o=e,a={match:i=>i.kind==="message"&&i.type===o,handle:t};return Fd(a),a}let n=e,r={match:o=>o.kind==="close"&&o.code===n,handle:t};return Fd(r),r}function jd(e,t=Vx(),n={}){let r=n.pageWindow??window,o=!!n.debug;if(e[Bi])return()=>{};e[Bi]=!0;let a={ws:e,pageWindow:r,debug:o},i=u=>{for(let p of t)try{if(!p.match(u))continue;if(p.handle(u,a)===!0)return}catch(m){o&&console.error("[WS] handler error",m,u)}},s=u=>{let p=Kx(u.data),m=$x(p);i({kind:"message",raw:u.data,data:p,type:m})},c=u=>{i({kind:"close",code:u.code,reason:u.reason,wasClean:u.wasClean,event:u})},d=u=>i({kind:"open",event:u}),l=u=>i({kind:"error",event:u});return e.addEventListener("message",s),e.addEventListener("close",c),e.addEventListener("open",d),e.addEventListener("error",l),()=>{try{e.removeEventListener("message",s)}catch{}try{e.removeEventListener("close",c)}catch{}try{e.removeEventListener("open",d)}catch{}try{e.removeEventListener("error",l)}catch{}try{delete e[Bi]}catch{}}}(function(){try{let t=Jx,n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();rt();be(4800,(e,t)=>{t.debug&&console.log("[WS][Close] Auth failure",e.code,e.reason)});be(4300,(e,t)=>{t.debug&&console.log("[WS][Close] Superseded",e.code,e.reason)});be(4400,(e,t)=>{t.debug&&console.log("[WS][Close] Heartbeat expired",e.code,e.reason)});be(4500,(e,t)=>{t.debug&&console.log("[WS][Close] Player kicked",e.code,e.reason)});be(4200,(e,t)=>{t.debug&&console.log("[WS][Close] Player left voluntarily",e.code,e.reason)});be(4100,(e,t)=>{t.debug&&console.log("[WS][Close] Reconnect initiated",e.code,e.reason)});be(4310,(e,t)=>{t.debug&&console.log("[WS][Close] Server disposed",e.code,e.reason)});be(4250,(e,t)=>{t.debug&&console.log("[WS][Close] User session superseded",e.code,e.reason)});be(4710,(e,t)=>{t.debug&&console.log("[WS][Close] Version expired",e.code,e.reason)});be(4700,(e,t)=>{t.debug&&console.log("[WS][Close] Version mismatch",e.code,e.reason)});rt();be(Xe.Config,(e,t)=>{t.debug&&console.log("[WS][STC] Config",e.data)});be(Xe.CurrencyTransaction,(e,t)=>{t.debug&&console.log("[WS][STC] CurrencyTransaction",e.data)});be(Xe.Emote,(e,t)=>{t.debug&&console.log("[WS][STC] Emote",e.data)});be(Xe.InappropriateContentRejected,(e,t)=>{t.debug&&console.log("[WS][STC] InappropriateContentRejected",e.data)});be(Xe.PartialState,(e,t)=>{t.debug&&console.log("[WS][STC] PartialState",e.data)});be(Xe.Pong,(e,t)=>{t.debug&&console.log("[WS][STC] Pong",e.data)});be(Xe.ServerErrorMessage,(e,t)=>{t.debug&&console.log("[WS][STC] ServerErrorMessage",e.data)});be(Xe.Welcome,(e,t)=>{t.debug&&console.log("[WS][STC] Welcome",e.data)});rt();B(I.PlantSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantSeed"),!!1));B(I.WaterPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] WaterPlant"),!!1));B(I.HarvestCrop,(e,t)=>(t.debug&&console.log("[MW][Garden] HarvestCrop"),!!1));B(I.SellAllCrops,(e,t)=>(t.debug&&console.log("[MW][Garden] SellAllCrops"),!!1));B(I.PurchaseSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseSeed"),!!1));B(I.PurchaseEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseEgg"),!!1));B(I.PurchaseTool,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseTool"),!!1));B(I.PurchaseDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseDecor"),!!1));B(I.PlantEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantEgg"),!!1));B(I.HatchEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] HatchEgg"),!!1));B(I.PlantGardenPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantGardenPlant"),!!1));B(I.PotPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PotPlant"),!!1));B(I.MutationPotion,(e,t)=>(t.debug&&console.log("[MW][Garden] MutationPotion"),!!1));B(I.PickupDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PickupDecor"),!!1));B(I.PlaceDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PlaceDecor"),!!1));B(I.RemoveGardenObject,(e,t)=>(t.debug&&console.log("[MW][Garden] RemoveGardenObject"),!!1));rt();B(I.MoveInventoryItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveInventoryItem"),!!1));B(I.DropObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] DropObject"),!!1));B(I.PickupObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] PickupObject"),!!1));B(I.ToggleFavoriteItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] ToggleFavoriteItem"),!!1));B(I.PutItemInStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] PutItemInStorage"),!!1));B(I.RetrieveItemFromStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] RetrieveItemFromStorage"),!!1));B(I.MoveStorageItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveStorageItem"),!!1));B(I.LogItems,(e,t)=>(t.debug&&console.log("[MW][Inventory] LogItems"),!!1));rt();B(I.PlacePet,(e,t)=>(t.debug&&console.log("[MW][Pets] PlacePet"),!!1));B(I.FeedPet,(e,t)=>(t.debug&&console.log("[MW][Pets] FeedPet"),!!1));B(I.PetPositions,(e,t)=>(t.debug&&console.log("[MW][Pets] PetPositions"),!!1));B(I.SwapPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SwapPet"),!!1));B(I.StorePet,(e,t)=>(t.debug&&console.log("[MW][Pets] StorePet"),!!1));B(I.NamePet,(e,t)=>(t.debug&&console.log("[MW][Pets] NamePet"),!!1));B(I.SellPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SellPet"),!!1));rt();console.log("[WS] TESTTEST");B(I.SetSelectedGame,(e,t)=>(t.debug&&console.log("[MW][Session] SetSelectedGame"),!!1));B(I.VoteForGame,(e,t)=>(t.debug&&console.log("[MW][Session] VoteForGame"),!!1));B(I.RequestGame,(e,t)=>(t.debug&&console.log("[MW][Session] RequestGame"),!!1));B(I.RestartGame,(e,t)=>(t.debug&&console.log("[MW][Session] RestartGame"),!!1));B(I.Ping,(e,t)=>(t.debug&&console.log("[MW][Session] Ping"),!!1));B(I.PlayerPosition,(e,t)=>(t.debug&&console.log("[MW][Session] PlayerPosition"),!!1));B(I.Teleport,(e,t)=>(t.debug&&console.log("[MW][Session] Teleport"),!!1));B(I.CheckWeatherStatus,(e,t)=>(t.debug&&console.log("[MW][Session] CheckWeatherStatus"),!!1));rt();B(I.Chat,(e,t)=>(t.debug&&console.log("[MW][Social] Chat"),!!1));B(I.Dev,(e,t)=>(t.debug&&console.log("[MW][Social] Dev"),!!1));B(I.Emote,(e,t)=>(t.debug&&console.log("[MW][Social] Emote"),!!1));B(I.Wish,(e,t)=>(t.debug&&console.log("[MW][Social] Wish"),!!1));B(I.KickPlayer,(e,t)=>(t.debug&&console.log("[MW][Social] KickPlayer"),!!1));B(I.ReportSpeakingStart,(e,t)=>(t.debug&&console.log("[MW][Voice] ReportSpeakingStart"),!!1));B(I.SetPlayerData,(e,t)=>(t.debug&&console.log("[MW][Social] SetPlayerData"),!!1));B(I.UsurpHost,(e,t)=>(t.debug&&console.log("[MW][Social] UsurpHost"),!!1));function qx(e={}){let t=e.pageWindow??A,n=e.pollMs??500,r=!!e.debug,o=[];o.push(lu(t,{debug:r})),o.push(Wd({pageWindow:t,middlewares:e.middlewares,debug:r}));let a=null,i=s=>{if(a){try{a()}catch{}a=null}s&&(a=jd(s,e.handlers,{debug:r,pageWindow:t}))};return i(Kn(t).ws),o.push(fr(s=>i(s.ws),{intervalMs:n,debug:r,pageWindow:t})),{getWs:()=>Kn(t).ws,dispose:()=>{for(let s=o.length-1;s>=0;s--)try{o[s]()}catch{}if(a){try{a()}catch{}a=null}}}}var Tr=null;function Ud(e={}){return Tr||(Tr=qx(e),Tr)}br();Vn();Tt();gr();hr();dt();zt();function Ui(e){e.logStep("WebSocket","Capturing WebSocket...");let t=null;return t=fr(n=>{n.ws&&(e.logStep("WebSocket","WebSocket captured","success"),t?.(),t=null)},{intervalMs:250}),Ud({debug:!1}),()=>{t?.(),t=null}}async function zi(e){e.logStep("Atoms","Prewarming Jotai store...");try{await aa(),await Go({timeoutMs:8e3,intervalMs:50}),e.logStep("Atoms","Jotai store ready","success")}catch(t){e.logStep("Atoms","Jotai store not captured yet","error"),console.warn("[Bootstrap] Jotai store wait failed",t)}}function Vi(e){e.logStep("Globals","Initializing global variables...");try{pr(),e.logStep("Globals","Global variables ready","success")}catch(t){e.logStep("Globals","Failed to initialize global variables","error"),console.warn("[Bootstrap] Global variables init failed",t)}}function $i(e){e.logStep("API","Exposing Gemini API...");try{od(),e.logStep("API","Gemini API ready","success")}catch(t){e.logStep("API","Failed to expose API","error"),console.warn("[Bootstrap] API init failed",t)}}function ji(){return new Promise(e=>{typeof requestIdleCallback<"u"?requestIdleCallback(()=>e(),{timeout:50}):setTimeout(e,0)})}async function Ki(e){e.logStep("HUD","Loading HUD preferences..."),await ji();let t=Fi();await ji();let n=await Wi({hostId:"gemini-hud-root",initialWidth:t.width,initialOpen:t.isOpen,onWidthChange:r=>nn("width",r),onOpenChange:r=>nn("isOpen",r),themes:ct,initialTheme:t.theme,onThemeChange:r=>nn("theme",r),buildSections:r=>Li({applyTheme:r.applyTheme,initialTheme:r.initialTheme,getCurrentTheme:r.getCurrentTheme}),initialTab:t.activeTab,onTabChange:r=>nn("activeTab",r)});return await ji(),e.logStep("HUD","HUD ready","success"),n}async function Ji(e){e.setSubtitle("Activating Gemini modules..."),await ru(t=>{t.status==="start"?e.logStep(t.name,`Loading ${t.name}...`):t.status==="success"?e.logStep(t.name,`${t.name} ready`,"success"):e.logStep(t.name,`${t.name} encountered an issue.`,"error")})}async function qi(e){e.logStep("Sprites","Warming up sprite cache...");try{ue.ready()||await ue.init();let t=[],n=le.get("plants");if(n)for(let i of Object.values(n))i?.seed?.spriteId&&t.push(i.seed.spriteId),i?.plant?.spriteId&&t.push(i.plant.spriteId),i?.crop?.spriteId&&t.push(i.crop.spriteId);let r=le.get("pets");if(r)for(let i of Object.values(r))i?.spriteId&&t.push(i.spriteId);let o=[...new Set(t)],a=o.length;if(a===0){e.logStep("Sprites","No sprites to warmup","success");return}await ue.warmup(o,(i,s)=>{e.logStep("Sprites",`Loading sprites (${i}/${s})...`)},5),e.logStep("Sprites",`${a} sprites loaded`,"success")}catch(t){e.logStep("Sprites","Sprite warmup failed","error"),console.warn("[Bootstrap] Sprite warmup failed",t)}}async function Yi(e){e.logStep("Sections","Preloading UI sections...");try{await Ei(),e.logStep("Sections","Sections preloaded","success")}catch(t){e.logStep("Sections","Sections preload failed","error"),console.warn("[Bootstrap] Sections preload failed",t)}}(async function(){"use strict";let e=Mr({title:"Gemini is loading",subtitle:"Connecting and preparing modules..."}),t=null;try{t=Ui(e),await zi(e),Vi(e),$i(e),await Ji(e),await qi(e),await Yi(e),e.succeed("Gemini is ready!")}catch(r){e.fail("Failed to initialize the mod.",r)}finally{t?.()}let n=await Ki(e);wr({onClick:()=>n.setOpen(!0)})})();})();
