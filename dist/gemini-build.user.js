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
"use strict";(()=>{var Ao=Object.defineProperty;var qa=(e,t,n)=>t in e?Ao(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Ja=(e,t)=>()=>(e&&(t=e(e=0)),t);var Xa=(e,t)=>{for(var n in t)Ao(e,n,{get:t[n],enumerable:!0})};var ye=(e,t,n)=>qa(e,typeof t!="symbol"?t+"":t,n);var Or={};Xa(Or,{clamp:()=>ue,clamp01:()=>$n,sleep:()=>Se,tryDo:()=>le,waitWithTimeout:()=>zt});async function zt(e,t,n){let o=performance.now();for(;performance.now()-o<t;){let r=await Promise.race([e,Se(50).then(()=>null)]);if(r!==null)return r}throw new Error(`${n} timeout`)}var Se,le,ue,$n,ke=Ja(()=>{"use strict";Se=e=>new Promise(t=>setTimeout(t,e)),le=e=>{try{return e()}catch{return}},ue=(e,t,n)=>Math.max(t,Math.min(n,e)),$n=e=>ue(e,0,1)});var bn=window;function Ya(){if(typeof unsafeWindow<"u"&&unsafeWindow)return unsafeWindow;let e=window.wrappedJSObject;return e&&e!==window?e:bn}var hn=Ya(),W=hn,Qa=hn!==bn;function xe(e,t){try{hn[e]=t}catch{}if(Qa)try{bn[e]=t}catch{}}var Za=new Map;function ei(){return Za}function rt(){return W.jotaiAtomCache?.cache}function at(e){let t=ei(),n=t.get(e);if(n)return n;let o=rt();if(!o)return null;for(let r of o.values())if((r?.debugLabel||r?.label||"")===e)return t.set(e,r),r;return null}function Sn(){let e=W;if(e.__REACT_DEVTOOLS_GLOBAL_HOOK__)return;let t=new Map,n=new Map;e.__REACT_DEVTOOLS_GLOBAL_HOOK__={renderers:t,supportsFiber:!0,inject:o=>{let r=t.size+1;return t.set(r,o),n.set(r,new Set),r},onCommitFiberRoot:(o,r)=>{let a=n.get(o);a&&a.add(r)},onCommitFiberUnmount:()=>{},onPostCommitFiberRoot:()=>{},getFiberRoots:o=>n.get(o),checkDCE:()=>{},isDisabled:!1}}var ti={baseStore:null,captureInProgress:!1,captureError:null,lastCapturedVia:null,mirror:void 0};function ze(){return ti}var ni="__JOTAI_STORE_READY__",Co=!1,xn=new Set;function Et(){if(!Co){Co=!0;for(let e of xn)try{e()}catch{}try{let e=W.CustomEvent||CustomEvent;W.dispatchEvent?.(new e(ni))}catch{}}}function oi(e){xn.add(e);let t=wn();if(t.via&&!t.polyfill)try{e()}catch{}return()=>{xn.delete(e)}}async function It(e={}){let{timeoutMs:t=6e3,intervalMs:n=50}=e,o=wn();if(!(o.via&&!o.polyfill))return new Promise((r,a)=>{let i=!1,s=oi(()=>{i||(i=!0,s(),r())}),l=Date.now();(async()=>{for(;!i&&Date.now()-l<t;){let d=wn();if(d.via&&!d.polyfill){if(i)return;i=!0,s(),r();return}await it(n)}i||(i=!0,s(),a(new Error("Store not captured within timeout")))})()})}var it=e=>new Promise(t=>setTimeout(t,e));function Mo(){try{let e=W.Event||Event;W.dispatchEvent?.(new e("visibilitychange"))}catch{}}function vn(e){return e&&typeof e=="object"&&typeof e.get=="function"&&typeof e.set=="function"&&typeof e.sub=="function"}function yn(e,t=0,n=new WeakSet){if(t>3||!e||typeof e!="object"||n.has(e))return null;try{n.add(e)}catch{return null}if(vn(e))return e;let o=["store","value","current","state","s","baseStore"];for(let r of o)try{let a=e[r];if(vn(a))return a}catch{}return null}function Po(){let e=ze(),t=W.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t?.renderers?.size)return null;let n=0;for(let[o]of t.renderers){let r=t.getFiberRoots?.(o);r&&(n+=r.size||0)}if(n===0)return null;for(let[o]of t.renderers){let r=t.getFiberRoots?.(o);if(r)for(let a of r){let i=new Set,s=[a.current];for(;s.length;){let l=s.pop();if(!(!l||i.has(l))){i.add(l);try{let c=l?.pendingProps?.value;if(vn(c))return e.lastCapturedVia="fiber",c}catch{}try{let c=l?.memoizedState,d=0;for(;c&&d<15;){d++;let u=yn(c);if(u)return e.lastCapturedVia="fiber",u;let p=yn(c.memoizedState);if(p)return e.lastCapturedVia="fiber",p;c=c.next}}catch{}try{if(l?.stateNode){let c=yn(l.stateNode);if(c)return e.lastCapturedVia="fiber",c}}catch{}l.child&&s.push(l.child),l.sibling&&s.push(l.sibling),l.alternate&&s.push(l.alternate)}}}}return null}function Eo(){return{get:()=>{throw new Error("Store not captured: get unavailable")},set:()=>{throw new Error("Store not captured: set unavailable")},sub:()=>()=>{},__polyfill:!0}}async function ri(e=5e3){let t=Date.now(),n=rt();for(;!n&&Date.now()-t<e;)await it(100),n=rt();if(!n)throw new Error("jotaiAtomCache.cache not found");let o=ze(),r=null,a=null,i=[],s=()=>{for(let c of i)try{c.__origWrite&&(c.write=c.__origWrite,delete c.__origWrite)}catch{}};for(let c of n.values()){if(!c||typeof c.write!="function"||c.__origWrite)continue;let d=c.write;c.__origWrite=d,c.write=function(u,p,...m){return a||(r=u,a=p,s()),d.call(this,u,p,...m)},i.push(c)}Mo();let l=Date.now();for(;!a&&Date.now()-l<e;)await it(50);return a?(o.lastCapturedVia="write",{get:c=>r(c),set:(c,d)=>a(c,d),sub:(c,d)=>{let u;try{u=r(c)}catch{}let p=setInterval(()=>{let m;try{m=r(c)}catch{return}if(m!==u){u=m;try{d()}catch{}}},100);return()=>clearInterval(p)}}):(s(),o.lastCapturedVia="polyfill",Eo())}async function ai(e=1e4){let t=ze();Mo();let n=Date.now();for(;Date.now()-n<e;){let o=Po();if(o)return o;await it(50)}return t.lastCapturedVia="polyfill",Eo()}async function ii(){let e=ze();if(e.baseStore&&!e.baseStore.__polyfill)return Et(),e.baseStore;if(e.captureInProgress){let t=Date.now(),n=2500;for(;!e.baseStore&&Date.now()-t<n;)await it(25);if(e.baseStore)return e.baseStore.__polyfill||Et(),e.baseStore}e.captureInProgress=!0;try{let t=Po();if(t)return e.baseStore=t,Et(),t;try{let o=await ri(5e3);return e.baseStore=o,o.__polyfill||Et(),o}catch(o){e.captureError=o}let n=await ai();return e.baseStore=n,n}catch(t){throw e.captureError=t,t}finally{e.captureInProgress=!1}}function wn(){let e=ze();return{via:e.lastCapturedVia,polyfill:!!e.baseStore?.__polyfill,error:e.captureError}}async function si(){let e=await ii(),t=new WeakMap,n=async r=>{let a=t.get(r);if(a)return a;a={last:void 0,has:!1,subs:new Set},t.set(r,a);try{a.last=e.get(r),a.has=!0}catch{}let i=e.sub(r,()=>{let s;try{s=e.get(r)}catch{return}let l=a.last,c=!Object.is(s,l)||!a.has;if(a.last=s,a.has=!0,c)for(let d of a.subs)try{d(s,l)}catch{}});return a.unsubUpstream=i,a};return{async get(r){let a=await n(r);if(a.has)return a.last;let i=e.get(r);return a.last=i,a.has=!0,i},async set(r,a){await e.set(r,a);let i=await n(r);i.last=a,i.has=!0},async sub(r,a){let i=await n(r);if(i.subs.add(a),i.has)try{a(i.last,i.last)}catch{}return()=>{i.subs.delete(a)}},getShadow(r){return t.get(r)?.last},hasShadow(r){return!!t.get(r)?.has},async ensureWatch(r){await n(r)},async asStore(){return{get:r=>this.get(r),set:(r,a)=>this.set(r,a),sub:(r,a)=>{let i=null;return this.sub(r,()=>a()).then(s=>i=s),()=>i?.()}}}}}async function st(){let e=ze();return e.mirror||(e.mirror=await si()),e.mirror}var ae={async select(e){let t=await st(),n=at(e);if(!n)throw new Error(`[Store] Atom not found: "${e}"`);return t.get(n)},async set(e,t){let n=await st(),o=at(e);if(!o)throw new Error(`[Store] Atom not found: "${e}"`);await n.set(o,t)},async subscribe(e,t){let n=await st(),o=at(e);if(!o)throw new Error(`[Store] Atom not found: "${e}"`);return n.sub(o,r=>{try{t(r)}catch{}})},async subscribeImmediate(e,t){let n=await ae.select(e);try{t(n)}catch{}return ae.subscribe(e,t)}};async function kn(){await st()}function lt(e){return e?Array.isArray(e)?e.slice():e.split(".").map(t=>t.match(/^\d+$/)?Number(t):t):[]}function Pe(e,t){let n=lt(t),o=e;for(let r of n){if(o==null)return;o=o[r]}return o}function Tn(e,t,n){let o=lt(t);if(!o.length)return n;let r=Array.isArray(e)?[...e]:{...e??{}},a=r;for(let i=0;i<o.length-1;i++){let s=o[i],l=a[s],c=typeof l=="object"&&l!==null?Array.isArray(l)?[...l]:{...l}:{};a[s]=c,a=c}return a[o[o.length-1]]=n,r}function Io(e,t){let n={};for(let o of t)n[o]=o.includes(".")?Pe(e,o):e?.[o];try{return JSON.stringify(n)}catch{return String(n)}}function An(e,t,n){let o=n.mode??"auto";function r(c){let d=t?Pe(c,t):c,u=new Map;if(d==null)return{signatures:u,keys:[]};let p=Array.isArray(d);if((o==="array"||o==="auto"&&p)&&p)for(let h=0;h<d.length;h++){let f=d[h],g=n.key?n.key(f,h,c):h,b=n.sig?n.sig(f,h,c):n.fields?Io(f,n.fields):JSON.stringify(f);u.set(g,b)}else for(let[h,f]of Object.entries(d)){let g=n.key?n.key(f,h,c):h,b=n.sig?n.sig(f,h,c):n.fields?Io(f,n.fields):JSON.stringify(f);u.set(g,b)}return{signatures:u,keys:Array.from(u.keys())}}function a(c,d){if(c===d)return!0;if(!c||!d||c.size!==d.size)return!1;for(let[u,p]of c)if(d.get(u)!==p)return!1;return!0}async function i(c){let d=null;return ae.subscribeImmediate(e,u=>{let p=t?Pe(u,t):u,{signatures:m}=r(p);if(!a(d,m)){let h=new Set([...d?Array.from(d.keys()):[],...Array.from(m.keys())]),f=[];for(let g of h){let b=d?.get(g)??"__NONE__",S=m.get(g)??"__NONE__";b!==S&&f.push(g)}d=m,c({value:p,changedKeys:f})}})}async function s(c,d){return i(({value:u,changedKeys:p})=>{p.includes(c)&&d({value:u})})}async function l(c,d){let u=new Set(c);return i(({value:p,changedKeys:m})=>{let h=m.filter(f=>u.has(f));h.length&&d({value:p,changedKeys:h})})}return{sub:i,subKey:s,subKeys:l}}var Ue=new Map;function li(e,t){let n=Ue.get(e);if(n)try{n()}catch{}return Ue.set(e,t),()=>{try{t()}catch{}Ue.get(e)===t&&Ue.delete(e)}}function X(e,t={}){let{path:n,write:o="replace"}=t,r=n?`${e}:${lt(n).join(".")}`:e;async function a(){let u=await ae.select(e);return n?Pe(u,n):u}async function i(u){if(typeof o=="function"){let h=await ae.select(e),f=o(u,h);return ae.set(e,f)}let p=await ae.select(e),m=n?Tn(p,n,u):u;return o==="merge-shallow"&&!n&&p&&typeof p=="object"&&typeof u=="object"?ae.set(e,{...p,...u}):ae.set(e,m)}async function s(u){let p=await a(),m=u(p);return await i(m),m}async function l(u,p,m){let h,f=b=>{let S=n?Pe(b,n):b;if(typeof h>"u"||!m(h,S)){let T=h;h=S,p(S,T)}},g=u?await ae.subscribeImmediate(e,f):await ae.subscribe(e,f);return li(r,g)}function c(){let u=Ue.get(r);if(u){try{u()}catch{}Ue.delete(r)}}function d(u){return An(e,u?.path??n,u)}return{label:r,get:a,set:i,update:s,onChange:(u,p=Object.is)=>l(!1,u,p),onChangeNow:(u,p=Object.is)=>l(!0,u,p),asSignature:d,stopOnChange:c}}function y(e){return X(e)}var ci=y("positionAtom"),ui=y("lastPositionInMyGardenAtom"),di=y("playerDirectionAtom"),pi=y("stateAtom"),mi=y("quinoaDataAtom"),gi=y("currentTimeAtom"),fi=y("actionAtom"),bi=y("isPressAndHoldActionAtom"),hi=y("mapAtom"),yi=y("tileSizeAtom"),xi=X("mapAtom",{path:"cols"}),vi=X("mapAtom",{path:"rows"}),wi=X("mapAtom",{path:"spawnTiles"}),Si=X("mapAtom",{path:"locations.seedShop.spawnTileIdx"}),ki=X("mapAtom",{path:"locations.eggShop.spawnTileIdx"}),Ti=X("mapAtom",{path:"locations.toolShop.spawnTileIdx"}),Ai=X("mapAtom",{path:"locations.decorShop.spawnTileIdx"}),Ci=X("mapAtom",{path:"locations.sellCropsShop.spawnTileIdx"}),Mi=X("mapAtom",{path:"locations.sellPetShop.spawnTileIdx"}),Pi=X("mapAtom",{path:"locations.collectorsClub.spawnTileIdx"}),Ei=X("mapAtom",{path:"locations.wishingWell.spawnTileIdx"}),Ii=X("mapAtom",{path:"locations.shopsCenter.spawnTileIdx"}),Li=y("playerAtom"),Ri=y("myDataAtom"),Oi=y("myUserSlotIdxAtom"),Hi=y("isSpectatingAtom"),_i=y("myCoinsCountAtom"),Ni=y("numPlayersAtom"),Di=X("playerAtom",{path:"id"}),Gi=y("userSlotsAtom"),Wi=y("filteredUserSlotsAtom"),Bi=y("myUserSlotAtom"),Vi=y("spectatorsAtom"),Fi=X("stateAtom",{path:"child"}),ji=X("stateAtom",{path:"child.data"}),$i=X("stateAtom",{path:"child.data.shops"}),zi=X("stateAtom",{path:"child.data.userSlots"}),Ui=X("stateAtom",{path:"data.players"}),Ki=y("myInventoryAtom"),qi=y("myInventoryItemsAtom"),Ji=y("isMyInventoryAtMaxLengthAtom"),Xi=y("myFavoritedItemIdsAtom"),Yi=y("myCropInventoryAtom"),Qi=y("mySeedInventoryAtom"),Zi=y("myToolInventoryAtom"),es=y("myEggInventoryAtom"),ts=y("myDecorInventoryAtom"),ns=y("myPetInventoryAtom"),os=X("myInventoryAtom",{path:"favoritedItemIds"}),rs=y("itemTypeFiltersAtom"),as=y("myItemStoragesAtom"),is=y("myPetHutchStoragesAtom"),ss=y("myPetHutchItemsAtom"),ls=y("myPetHutchPetItemsAtom"),cs=y("myNumPetHutchItemsAtom"),us=y("myValidatedSelectedItemIndexAtom"),ds=y("isSelectedItemAtomSuspended"),ps=y("mySelectedItemAtom"),ms=y("mySelectedItemNameAtom"),gs=y("mySelectedItemRotationsAtom"),fs=y("mySelectedItemRotationAtom"),bs=y("setSelectedIndexToEndAtom"),hs=y("myPossiblyNoLongerValidSelectedItemIndexAtom"),ys=y("myCurrentGlobalTileIndexAtom"),xs=y("myCurrentGardenTileAtom"),vs=y("myCurrentGardenObjectAtom"),ws=y("myOwnCurrentGardenObjectAtom"),Ss=y("myOwnCurrentDirtTileIndexAtom"),ks=y("myCurrentGardenObjectNameAtom"),Ts=y("isInMyGardenAtom"),As=y("myGardenBoardwalkTileObjectsAtom"),Cs=X("myDataAtom",{path:"garden"}),Ms=X("myDataAtom",{path:"garden.tileObjects"}),Ps=X("myOwnCurrentGardenObjectAtom",{path:"objectType"}),Es=y("myCurrentStablePlantObjectInfoAtom"),Is=y("myCurrentSortedGrowSlotIndicesAtom"),Ls=y("myCurrentGrowSlotIndexAtom"),Rs=y("myCurrentGrowSlotsAtom"),Os=y("myCurrentGrowSlotAtom"),Hs=y("secondsUntilCurrentGrowSlotMaturesAtom"),_s=y("isCurrentGrowSlotMatureAtom"),Ns=y("numGrowSlotsAtom"),Ds=y("myCurrentEggAtom"),Gs=y("petInfosAtom"),Ws=y("myPetInfosAtom"),Bs=y("myPetSlotInfosAtom"),Vs=y("myPrimitivePetSlotsAtom"),Fs=y("myNonPrimitivePetSlotsAtom"),js=y("expandedPetSlotIdAtom"),$s=y("myPetsProgressAtom"),zs=y("myActiveCropMutationPetsAtom"),Us=y("totalPetSellPriceAtom"),Ks=y("selectedPetHasNewVariantsAtom"),qs=y("shopsAtom"),Js=y("myShopPurchasesAtom"),Xs=y("seedShopAtom"),Ys=y("seedShopInventoryAtom"),Qs=y("seedShopRestockSecondsAtom"),Zs=y("seedShopCustomRestockInventoryAtom"),el=y("eggShopAtom"),tl=y("eggShopInventoryAtom"),nl=y("eggShopRestockSecondsAtom"),ol=y("eggShopCustomRestockInventoryAtom"),rl=y("toolShopAtom"),al=y("toolShopInventoryAtom"),il=y("toolShopRestockSecondsAtom"),sl=y("toolShopCustomRestockInventoryAtom"),ll=y("decorShopAtom"),cl=y("decorShopInventoryAtom"),ul=y("decorShopRestockSecondsAtom"),dl=y("decorShopCustomRestockInventoryAtom"),pl=y("isDecorShopAboutToRestockAtom"),ml=X("shopsAtom",{path:"seed"}),gl=X("shopsAtom",{path:"tool"}),fl=X("shopsAtom",{path:"egg"}),bl=X("shopsAtom",{path:"decor"}),hl=y("myCropItemsAtom"),yl=y("myCropItemsToSellAtom"),xl=y("totalCropSellPriceAtom"),vl=y("friendBonusMultiplierAtom"),wl=y("myJournalAtom"),Sl=y("myCropJournalAtom"),kl=y("myPetJournalAtom"),Tl=y("myStatsAtom"),Al=y("myActivityLogsAtom"),Cl=y("newLogsAtom"),Ml=y("hasNewLogsAtom"),Pl=y("newCropLogsFromSellingAtom"),El=y("hasNewCropLogsFromSellingAtom"),Il=y("myCompletedTasksAtom"),Ll=y("myActiveTasksAtom"),Rl=y("isWelcomeToastVisibleAtom"),Ol=y("shouldCloseWelcomeToastAtom"),Hl=y("isInitialMoveToDirtPatchToastVisibleAtom"),_l=y("isFirstPlantSeedActiveAtom"),Nl=y("isThirdSeedPlantActiveAtom"),Dl=y("isThirdSeedPlantCompletedAtom"),Gl=y("isDemoTouchpadVisibleAtom"),Wl=y("areShopAnnouncersEnabledAtom"),Bl=y("arePresentablesEnabledAtom"),Vl=y("isEmptyDirtTileHighlightedAtom"),Fl=y("isPlantTileHighlightedAtom"),jl=y("isItemHiglightedInHotbarAtom"),$l=y("isItemHighlightedInModalAtom"),zl=y("isMyGardenButtonHighlightedAtom"),Ul=y("isSellButtonHighlightedAtom"),Kl=y("isShopButtonHighlightedAtom"),ql=y("isInstaGrowButtonHiddenAtom"),Jl=y("isActionButtonHighlightedAtom"),Xl=y("isGardenItemInfoCardHiddenAtom"),Yl=y("isSeedPurchaseButtonHighlightedAtom"),Ql=y("isFirstSeedPurchaseActiveAtom"),Zl=y("isFirstCropHarvestActiveAtom"),ec=y("isWeatherStatusHighlightedAtom"),tc=y("weatherAtom"),nc=y("activeModalAtom"),oc=y("hotkeyBeingPressedAtom"),rc=y("avatarTriggerAnimationAtom"),ac=y("avatarDataAtom"),ic=y("emoteDataAtom"),sc=y("otherUserSlotsAtom"),lc=y("otherPlayerPositionsAtom"),cc=y("otherPlayerSelectedItemsAtom"),uc=y("otherPlayerLastActionsAtom"),dc=y("traderBunnyPlayerId"),pc=y("npcPlayersAtom"),mc=y("npcQuinoaUsersAtom"),gc=y("numNpcAvatarsAtom"),fc=y("traderBunnyEmoteTimeoutAtom"),bc=y("traderBunnyEmoteAtom"),hc=y("unsortedLeaderboardAtom"),yc=y("currentGardenNameAtom"),xc=y("quinoaEngineAtom"),vc=y("quinoaInitializationErrorAtom"),wc=y("avgPingAtom"),Sc=y("serverClientTimeOffsetAtom"),kc=y("isEstablishingShotRunningAtom"),Tc=y("isEstablishingShotCompleteAtom");function w(e,t=null,...n){let o=document.createElement(e);for(let[r,a]of Object.entries(t||{}))a!=null&&(r==="style"?typeof a=="string"?o.setAttribute("style",a):typeof a=="object"&&Object.assign(o.style,a):r.startsWith("on")&&typeof a=="function"?o[r.toLowerCase()]=a:r in o?o[r]=a:o.setAttribute(r,String(a)));for(let r of n)r==null||r===!1||o.appendChild(typeof r=="string"||typeof r=="number"?document.createTextNode(String(r)):r);return o}var Lt="https://i.imgur.com/k5WuC32.png",Lo="gemini-loader-style",He="gemini-loader",Ro=80;function Ac(){if(document.getElementById(Lo))return;let e=document.createElement("style");e.id=Lo,e.textContent=`
    /* ===== Loader Variables ===== */
    #${He} {
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
    #${He} {
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

    #${He}.gemini-loader--error .gemini-loader__actions {
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
    #${He}.gemini-loader--closing {
      animation: gemini-loader-fade-out 0.4s ease forwards;
      pointer-events: none;
    }

    #${He}.gemini-loader--error .gemini-loader__spinner {
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
      #${He} { padding: 16px 10px; }
      .gemini-loader__card { padding: 16px; }
      .gemini-loader__header { gap: 12px; }
      .gemini-loader__spinner { width: 42px; height: 42px; }
      .gemini-loader__spinner-icon { width: 32px; height: 32px; }
      .gemini-loader__title { font-size: 16px; }
    }
  `,document.head.appendChild(e)}function Rt(e,t,n){let o=w("div",{className:`gemini-loader__log ${n}`},w("div",{className:"gemini-loader__dot"}),w("div",{textContent:t}));for(e.appendChild(o);e.childElementCount>Ro;)e.firstElementChild?.remove();e.scrollTop=e.scrollHeight}function Cc(){return new Promise(e=>{if(typeof GM_xmlhttpRequest>"u"){e(Lt);return}GM_xmlhttpRequest({method:"GET",url:Lt,responseType:"blob",onload:t=>{let n=t.response,o=new FileReader;o.onloadend=()=>e(o.result),o.onerror=()=>e(Lt),o.readAsDataURL(n)},onerror:()=>e(Lt)})})}function Oo(e={}){let t=Number.isFinite(e.blurPx)?Math.max(4,Number(e.blurPx)):14;Ac();let n=w("div",{className:"gemini-loader__subtitle",textContent:e.subtitle??"Initializing the mod..."}),o=w("div",{className:"gemini-loader__logs"}),r=w("img",{className:"gemini-loader__spinner-icon",alt:"Gemini"}),a=w("div",{className:"gemini-loader__spinner"},r);Cc().then(g=>{r.src=g});let i=w("div",{className:"gemini-loader__card"},w("div",{className:"gemini-loader__header"},a,w("div",{className:"gemini-loader__titles"},w("div",{className:"gemini-loader__title",textContent:e.title??"Gemini is loading"}),n)),o),s=w("div",{id:He},i);(document.body||document.documentElement).appendChild(s);let l=w("div",{className:"gemini-loader__actions"},w("button",{className:"gemini-loader__button",textContent:"Close loader",onclick:()=>s.remove()}));i.appendChild(l),s.style.setProperty("--loader-blur",`${t}px`);let c=g=>{n.textContent=g},d=new Map,u=(g,b)=>{g.className=`gemini-loader__log ${b}`};return{log:(g,b="info")=>Rt(o,g,b),logStep:(g,b,S="info")=>{let T=String(g||"").trim();if(!T){Rt(o,b,S);return}let x=d.get(T);if(x){x.el.lastElementChild&&(x.el.lastElementChild.textContent=b),x.tone!==S&&(u(x.el,S),x.tone=S);return}let v=w("div",{className:`gemini-loader__log ${S}`},w("div",{className:"gemini-loader__dot"}),w("div",{textContent:b}));for(d.set(T,{el:v,tone:S}),o.appendChild(v);o.childElementCount>Ro;){let k=o.firstElementChild;if(!k)break;let M=Array.from(d.entries()).find(([,P])=>P.el===k)?.[0];M&&d.delete(M),k.remove()}o.scrollTop=o.scrollHeight},setSubtitle:c,succeed:(g,b=600)=>{g&&Rt(o,g,"success"),s.classList.add("gemini-loader--closing"),setTimeout(()=>s.remove(),b)},fail:(g,b)=>{Rt(o,g,"error"),c("Something went wrong. Check the console for details."),s.classList.add("gemini-loader--error"),console.error("[Gemini loader]",g,b)}}}function Ho(e,t,n){let o=w("div",{className:"lg-pill",id:"pill"}),r=e.map(d=>{let u=w("button",{className:"lg-tab"},d.label);return u.setAttribute("data-target",d.id),u}),a=w("div",{className:"lg-tabs",id:"lg-tabs-row"},o,...r),i=a;a.addEventListener("wheel",d=>{Math.abs(d.deltaY)>Math.abs(d.deltaX)&&(d.preventDefault(),a.scrollLeft+=d.deltaY)},{passive:!1});function s(d){let u=a.getBoundingClientRect(),p=r.find(v=>v.dataset.target===d)||r[0];if(!p)return;let m=p.getBoundingClientRect(),h=m.left-u.left,f=m.width;o.style.width=`${f}px`,o.style.transform=`translateX(${h}px)`;let g=a.scrollLeft,b=g,S=g+a.clientWidth,T=h-12,x=h+f+12;T<b?a.scrollTo({left:T,behavior:"smooth"}):x>S&&a.scrollTo({left:x-a.clientWidth,behavior:"smooth"})}let l=t||(e[0]?.id??"");function c(d){l=d,r.forEach(u=>u.classList.toggle("active",u.dataset.target===d)),s(d),n(d)}return r.forEach(d=>d.addEventListener("click",()=>c(d.dataset.target))),queueMicrotask(()=>s(l)),{root:i,activate:c,recalc:()=>s(l),getActive:()=>l}}var _e=class{constructor(t){ye(this,"id");ye(this,"label");ye(this,"container",null);ye(this,"cleanupFunctions",[]);this.id=t.id,this.label=t.label}render(t){for(this.unmount();t.firstChild;)t.removeChild(t.firstChild);this.container=t;let n=this.build(t);n instanceof Promise&&n.catch(r=>{console.error(`[Gemini] Error building section ${this.id}:`,r)});let o=t.firstElementChild;o&&o.classList.contains("gemini-section")&&o.classList.add("active")}unmount(){this.executeCleanup(),this.container=null}createContainer(t,n){let o=n?`gemini-section ${n}`:"gemini-section";return w("section",{id:t,className:o})}addCleanup(t){this.cleanupFunctions.push(t)}createGrid(t="12px"){let n=w("div");return n.style.display="grid",n.style.gap=t,n}executeCleanup(){for(let t of this.cleanupFunctions)try{t()}catch(n){console.error(`[Gemini] Cleanup error in section ${this.id}:`,n)}this.cleanupFunctions=[]}};var ct=class{constructor(t,n,o){ye(this,"sections");ye(this,"activeId",null);ye(this,"container");ye(this,"theme");this.sections=new Map(t.map(r=>[r.id,r])),this.container=n,this.theme=o}get ids(){return Array.from(this.sections.keys())}get all(){return Array.from(this.sections.values())}get active(){return this.activeId}activate(t){if(this.activeId!==t){if(!this.sections.has(t))throw new Error(`[Gemini] Unknown section: ${t}`);if(this.activeId&&this.sections.get(this.activeId).unmount(),this.activeId=t,this.sections.get(t).render(this.container),this.theme){let n=this.theme.getCurrentTheme();this.theme.applyTheme(n)}}}};function ut(e,t){try{let n=JSON.stringify(t);GM_setValue(e,n)}catch(n){console.error(`[Gemini] Failed to save key "${e}" to storage:`,n)}}function Ee(e,t){try{let n=GM_getValue(e);return n==null?t:typeof n=="string"?JSON.parse(n):n}catch(n){return console.error(`[Gemini] Failed to load key "${e}" from storage, using default:`,n),t}}var _o="gemini.sections";function No(){let e=Ee(_o,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function Mc(e){ut(_o,e)}async function Do(e){return No()[e]}function Go(e,t){let n=No();Mc({...n,[e]:t})}function Ot(e,t){return{...e,...t??{}}}async function Wo(e){let t=await Do(e.path),n;e.migrate?n=e.migrate(t):n=t??{},n=Object.assign((c=>JSON.parse(JSON.stringify(c)))(e.defaults),n),e.sanitize&&(n=e.sanitize(n));function r(){Go(e.path,n)}function a(){return n}function i(c){n=e.sanitize?e.sanitize(c):c,r()}function s(c){let u=Object.assign((p=>JSON.parse(JSON.stringify(p)))(n),{});typeof c=="function"?c(u):Object.assign(u,c),n=e.sanitize?e.sanitize(u):u,r()}function l(){r()}return{get:a,set:i,update:s,save:l}}async function dt(e,t){let{path:n=e,...o}=t;return Wo({path:n,...o})}var Pc=0,Ht=new Map;function Ie(e={},...t){let{id:n,className:o,variant:r="default",padding:a="md",interactive:i=!1,expandable:s=!1,defaultExpanded:l=!0,onExpandChange:c,mediaTop:d,title:u,subtitle:p,badge:m,actions:h,footer:f,divider:g=!1,tone:b="neutral",stateKey:S}=e,T=w("div",{className:"card",id:n,tabIndex:i?0:void 0});T.classList.add(`card--${r}`,`card--p-${a}`),i&&T.classList.add("card--interactive"),b!=="neutral"&&T.classList.add(`card--tone-${b}`),o&&T.classList.add(...o.split(" ").filter(Boolean)),s&&T.classList.add("card--expandable");let x=s?S??n??(typeof u=="string"?`title:${u}`:null):null,v=!s||l;x&&Ht.has(x)&&(v=!!Ht.get(x));let k=null,M=null,P=null,E=null,L=null,C=n?`${n}-collapse`:`card-collapse-${++Pc}`,z=()=>{if(E!==null&&(cancelAnimationFrame(E),E=null),L){let R=L;L=null,R()}},q=(R,_)=>{if(!P)return;z();let I=P;if(I.setAttribute("aria-hidden",String(!R)),!_){I.classList.remove("card-collapse--animating"),I.style.display=R?"":"none",I.style.height="",I.style.opacity="";return}if(I.classList.add("card-collapse--animating"),I.style.display="",R){I.style.height="auto";let j=I.scrollHeight;if(!j){I.classList.remove("card-collapse--animating"),I.style.display="",I.style.height="",I.style.opacity="";return}I.style.height="0px",I.style.opacity="0",I.offsetHeight,E=requestAnimationFrame(()=>{E=null,I.style.height=`${j}px`,I.style.opacity="1"})}else{let j=I.scrollHeight;if(!j){I.classList.remove("card-collapse--animating"),I.style.display="none",I.style.height="",I.style.opacity="";return}I.style.height=`${j}px`,I.style.opacity="1",I.offsetHeight,E=requestAnimationFrame(()=>{E=null,I.style.height="0px",I.style.opacity="0"})}let A=()=>{I.classList.remove("card-collapse--animating"),I.style.height="",R||(I.style.display="none"),I.style.opacity=""},H=null,D=j=>{j.target===I&&(H!==null&&(clearTimeout(H),H=null),I.removeEventListener("transitionend",D),I.removeEventListener("transitioncancel",D),L=null,A())};L=()=>{H!==null&&(clearTimeout(H),H=null),I.removeEventListener("transitionend",D),I.removeEventListener("transitioncancel",D),L=null,A()},I.addEventListener("transitionend",D),I.addEventListener("transitioncancel",D),H=window.setTimeout(()=>{L?.()},420)};function K(R){let _=document.createElementNS("http://www.w3.org/2000/svg","svg");return _.setAttribute("viewBox","0 0 24 24"),_.setAttribute("width","16"),_.setAttribute("height","16"),_.innerHTML=R==="up"?'<path d="M7 14l5-5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>':'<path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',_}function N(R,_=!0,I=!0){v=R,T.classList.toggle("card--collapsed",!v),T.classList.toggle("card--expanded",v),k&&(k.dataset.expanded=String(v),k.setAttribute("aria-expanded",String(v))),M&&(M.setAttribute("aria-expanded",String(v)),M.classList.toggle("card-toggle--collapsed",!v),M.setAttribute("aria-label",v?"Replier le contenu":"Deplier le contenu"),M.replaceChildren(K(v?"up":"down"))),s?q(v,I):P&&(P.style.display="",P.style.height="",P.style.opacity="",P.setAttribute("aria-hidden","false")),_&&c&&c(v),x&&Ht.set(x,v)}if(d){let R=w("div",{className:"card-media"});R.append(d),T.appendChild(R)}let G=!!(u||p||m||h&&h.length||s);if(G){k=w("div",{className:"card-header"});let R=w("div",{className:"card-headline",style:"min-width:0;display:flex;flex-direction:column;gap:2px;"});if(u){let A=w("h3",{className:"card-title",style:"margin:0;font-size:15px;font-weight:700;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:8px;"},u);m&&A.append(typeof m=="string"?w("span",{className:"badge"},m):m),R.appendChild(A)}if(p){let A=w("div",{className:"card-subtitle",style:"opacity:.85;font-size:12px;color:color-mix(in oklab, var(--fg) 80%, #9ca3af)"},p);R.appendChild(A)}(R.childNodes.length||s)&&k.appendChild(R);let _=w("div",{className:"card-header-right",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"}),I=w("div",{className:"card-actions",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"});h?.forEach(A=>I.appendChild(A)),I.childNodes.length&&_.appendChild(I),s&&(M=w("button",{className:"card-toggle",type:"button",ariaExpanded:String(v),ariaControls:C,ariaLabel:v?"Replier le contenu":"Deplier le contenu"}),M.textContent=v?"\u25B2":"\u25BC",M.addEventListener("click",A=>{A.preventDefault(),A.stopPropagation(),N(!v)}),_.appendChild(M),k.classList.add("card-header--expandable"),k.addEventListener("click",A=>{let H=A.target;H?.closest(".card-actions")||H?.closest(".card-toggle")||N(!v)})),_.childNodes.length&&k.appendChild(_),T.appendChild(k)}P=w("div",{className:"card-collapse",id:C,ariaHidden:s?String(!v):"false"}),T.appendChild(P),g&&G&&P.appendChild(w("div",{className:"card-divider"}));let O=w("div",{className:"card-body"});if(O.append(...t),P.appendChild(O),f){g&&P.appendChild(w("div",{className:"card-divider"}));let R=w("div",{className:"card-footer"});R.append(f),P.appendChild(R)}return M&&M.setAttribute("aria-controls",C),N(v,!1,!1),x&&Ht.set(x,v),T}function Cn(...e){return w("div",{className:"card-footer"},...e)}var _t=!1,Nt=new Set,pe=e=>{let t=document.activeElement;for(let n of Nt)if(t&&(t===n||n.contains(t))){e.stopImmediatePropagation(),e.stopPropagation();return}};function Ec(){_t||(_t=!0,window.addEventListener("keydown",pe,!0),window.addEventListener("keypress",pe,!0),window.addEventListener("keyup",pe,!0),document.addEventListener("keydown",pe,!0),document.addEventListener("keypress",pe,!0),document.addEventListener("keyup",pe,!0))}function Ic(){_t&&(Nt.size>0||(_t=!1,window.removeEventListener("keydown",pe,!0),window.removeEventListener("keypress",pe,!0),window.removeEventListener("keyup",pe,!0),document.removeEventListener("keydown",pe,!0),document.removeEventListener("keypress",pe,!0),document.removeEventListener("keyup",pe,!0)))}function Ke(e){let{id:t,value:n=null,options:o,placeholder:r="Select...",size:a="md",disabled:i=!1,blockGameKeys:s=!0,onChange:l,onOpenChange:c}=e,d=w("div",{className:"select",id:t}),u=w("button",{className:"select-trigger",type:"button"}),p=w("span",{className:"select-value"},r),m=w("span",{className:"select-caret"},"\u25BE");u.append(p,m);let h=w("div",{className:"select-menu",role:"listbox",tabindex:"-1","aria-hidden":"true"});d.classList.add(`select--${a}`);let f=!1,g=n,b=null,S=!!i;function T(A){return A==null?r:(e.options||o).find(D=>D.value===A)?.label??r}function x(A){p.textContent=T(A),h.querySelectorAll(".select-option").forEach(H=>{let D=H.dataset.value,j=A!=null&&D===A;H.classList.toggle("selected",j),H.setAttribute("aria-selected",String(j))})}function v(A){h.replaceChildren(),A.forEach(H=>{let D=w("button",{className:"select-option"+(H.disabled?" disabled":""),type:"button",role:"option","data-value":H.value,"aria-selected":String(H.value===g),tabindex:"-1"},H.label);H.value===g&&D.classList.add("selected"),H.disabled||D.addEventListener("pointerdown",j=>{j.preventDefault(),j.stopPropagation(),C(H.value,{notify:!0}),E()},{capture:!0}),h.appendChild(D)})}function k(){u.setAttribute("aria-expanded",String(f)),h.setAttribute("aria-hidden",String(!f))}function M(){let A=u.getBoundingClientRect();Object.assign(h.style,{minWidth:`${A.width}px`})}function P(){f||S||(f=!0,d.classList.add("open"),k(),M(),document.addEventListener("mousedown",G,!0),document.addEventListener("scroll",O,!0),window.addEventListener("resize",R),h.focus({preventScroll:!0}),s&&(Ec(),Nt.add(d),b=()=>{Nt.delete(d),Ic()}),c?.(!0))}function E(){f&&(f=!1,d.classList.remove("open"),k(),document.removeEventListener("mousedown",G,!0),document.removeEventListener("scroll",O,!0),window.removeEventListener("resize",R),u.focus({preventScroll:!0}),b?.(),b=null,c?.(!1))}function L(){f?E():P()}function C(A,H={}){let D=g;g=A,x(g),H.notify!==!1&&D!==A&&l?.(A)}function z(){return g}function q(A){let H=Array.from(h.querySelectorAll(".select-option:not(.disabled)"));if(!H.length)return;let D=H.findIndex(te=>te.classList.contains("active")),j=H[(D+(A===1?1:H.length-1))%H.length];H.forEach(te=>te.classList.remove("active")),j.classList.add("active"),j.focus({preventScroll:!0}),j.scrollIntoView({block:"nearest"})}function K(A){(A.key===" "||A.key==="Enter"||A.key==="ArrowDown")&&(A.preventDefault(),P())}function N(A){if(A.key==="Escape"){A.preventDefault(),E();return}if(A.key==="Enter"||A.key===" "){let H=h.querySelector(".select-option.active")||h.querySelector(".select-option.selected");H&&!H.classList.contains("disabled")&&(A.preventDefault(),C(H.dataset.value,{notify:!0}),E());return}if(A.key==="ArrowDown"){A.preventDefault(),q(1);return}if(A.key==="ArrowUp"){A.preventDefault(),q(-1);return}}function G(A){d.contains(A.target)||E()}function O(){f&&M()}function R(){f&&M()}function _(A){S=!!A,u.disabled=S,d.classList.toggle("disabled",S),S&&E()}function I(A){e.options=A,v(A),A.some(H=>H.value===g)||(g=null,x(null))}return d.append(u,h),u.addEventListener("pointerdown",A=>{A.preventDefault(),A.stopPropagation(),L()},{capture:!0}),u.addEventListener("keydown",K),h.addEventListener("keydown",N),v(o),n!=null?(g=n,x(g)):x(null),k(),_(S),{root:d,open:P,close:E,toggle:L,getValue:z,setValue:C,setOptions:I,setDisabled:_,destroy(){document.removeEventListener("mousedown",G,!0),document.removeEventListener("scroll",O,!0),window.removeEventListener("resize",R),b?.(),b=null}}}function Dt(e={}){let{id:t,text:n="",htmlFor:o,tone:r="default",size:a="md",layout:i="inline",variant:s="text",required:l=!1,disabled:c=!1,tooltip:d,hint:u,icon:p,suffix:m,onClick:h}=e,f=w("div",{className:"lg-label-wrap",id:t}),g=w("label",{className:"lg-label",...o?{htmlFor:o}:{},...d?{title:d}:{}});if(p){let C=typeof p=="string"?w("span",{className:"lg-label-ico"},p):p;C.classList?.add?.("lg-label-ico"),g.appendChild(C)}let b=w("span",{className:"lg-label-text"},n);g.appendChild(b);let S=w("span",{className:"lg-label-req",ariaHidden:"true"}," *");l&&g.appendChild(S);let T=null;if(m!=null){T=typeof m=="string"?document.createTextNode(m):m;let C=w("span",{className:"lg-label-suffix"});C.appendChild(T),g.appendChild(C)}let x=u?w("div",{className:"lg-label-hint"},u):null;f.classList.add(`lg-label--${i}`),f.classList.add(`lg-label--${a}`),s==="title"&&f.classList.add("lg-label--title"),v(r),c&&f.classList.add("is-disabled"),f.appendChild(g),x&&f.appendChild(x),h&&g.addEventListener("click",h);function v(C){f.classList.remove("lg-label--default","lg-label--muted","lg-label--info","lg-label--success","lg-label--warning","lg-label--danger"),f.classList.add(`lg-label--${C}`)}function k(C){b.textContent=C}function M(C){v(C)}function P(C){C&&!S.isConnected&&g.appendChild(S),!C&&S.isConnected&&S.remove(),C?g.setAttribute("aria-required","true"):g.removeAttribute("aria-required")}function E(C){f.classList.toggle("is-disabled",!!C)}function L(C){!C&&x&&x.isConnected?x.remove():C&&x?x.textContent=C:C&&!x&&f.appendChild(w("div",{className:"lg-label-hint"},C))}return{root:f,labelEl:g,hintEl:x,setText:k,setTone:M,setRequired:P,setDisabled:E,setHint:L}}function pt(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function Gt(e,t){let n=document.createElement("span");n.className=`btn-ico btn-ico--${t}`;let o=pt(e);return o&&n.appendChild(o),n}function Lc(){let e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.marginRight="6px",t.style.display="none",t.style.flexShrink="0";let n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");let o=document.createElementNS(e,"animate");o.setAttribute("attributeName","stroke-dasharray"),o.setAttribute("values","1,150;90,150;90,150"),o.setAttribute("dur","1.5s"),o.setAttribute("repeatCount","indefinite");let r=document.createElementNS(e,"animateTransform");return r.setAttribute("attributeName","transform"),r.setAttribute("attributeType","XML"),r.setAttribute("type","rotate"),r.setAttribute("from","0 12 12"),r.setAttribute("to","360 12 12"),r.setAttribute("dur","1s"),r.setAttribute("repeatCount","indefinite"),n.appendChild(o),n.appendChild(r),t.appendChild(n),t}function Le(e={}){let{label:t="",id:n,variant:o="default",size:r="md",iconLeft:a,iconRight:i,loading:s=!1,tooltip:l,type:c="button",onClick:d,disabled:u=!1,fullWidth:p=!1}=e,m=w("button",{className:"btn",id:n});m.type=c,o==="primary"&&m.classList.add("primary"),r==="sm"&&m.classList.add("btn--sm"),l&&(m.title=l),p&&(m.style.width="100%");let h=Lc(),f=a?Gt(a,"left"):null,g=i?Gt(i,"right"):null,b=document.createElement("span");b.className="btn-label";let S=pt(t);S&&b.appendChild(S),!S&&(f||g)&&m.classList.add("btn--icon"),m.appendChild(h),f&&m.appendChild(f),m.appendChild(b),g&&m.appendChild(g);let T=u||s;m.disabled=T,m.setAttribute("aria-busy",String(!!s)),h.style.display=s?"inline-block":"none",d&&m.addEventListener("click",d);let x=m;return x.setLoading=v=>{m.setAttribute("aria-busy",String(!!v)),h.style.display=v?"inline-block":"none",m.disabled=v||u},x.setDisabled=v=>{m.disabled=v||m.getAttribute("aria-busy")==="true"},x.setLabel=v=>{b.replaceChildren();let k=pt(v);k&&b.appendChild(k),!k&&(f||g)?m.classList.add("btn--icon"):m.classList.remove("btn--icon")},x.setIconLeft=v=>{if(v==null){f?.remove();return}f?f.replaceChildren(pt(v)):m.insertBefore(Gt(v,"left"),b)},x.setIconRight=v=>{if(v==null){g?.remove();return}g?g.replaceChildren(pt(v)):m.appendChild(Gt(v,"right"))},x}function Rc(){try{let e=window.visualViewport,t=Math.round((e?.width??window.innerWidth)||0),n=Math.round((e?.height??window.innerHeight)||0);if(t&&n)return t>=n?"landscape":"portrait"}catch{}return"unknown"}function Oc(){let e=navigator.userAgent||"",t=navigator.platform||"",n=navigator.userAgentData;if(n&&typeof n.platform=="string"){let r=n.platform.toLowerCase();if(r.includes("windows"))return"windows";if(r.includes("mac"))return"mac";if(r.includes("android"))return"android";if(r.includes("chrome os")||r.includes("cros"))return"chromeos";if(r.includes("linux"))return"linux";if(r.includes("ios"))return"ios"}return/iPhone|iPad|iPod/i.test(e)||t==="MacIntel"&&navigator.maxTouchPoints>1?"ios":/Android/i.test(e)?"android":/CrOS/i.test(e)?"chromeos":/Win/i.test(e)?"windows":/Mac/i.test(e)?"mac":/Linux/i.test(e)?"linux":"unknown"}function Hc(){let e=navigator.userAgent||"",t=navigator.userAgentData;if(t&&Array.isArray(t.brands)){let n=t.brands.map(i=>String(i.brand||i.brandName||i.brandVersion||i)),o=n.some(i=>/Edge/i.test(i)||/Microsoft Edge/i.test(i)),r=n.some(i=>/Opera/i.test(i)||/OPR/i.test(i)),a=n.some(i=>/Chrome|Chromium/i.test(i));if(o)return"Edge";if(r)return"Opera";if(a)return"Chrome";if(navigator.brave)return"Brave"}return/FxiOS/i.test(e)?"Firefox":/CriOS/i.test(e)?"Chrome":/EdgiOS/i.test(e)?"Edge":/OPiOS|OPR|Opera Mini|Opera/i.test(e)?"Opera":/Edg\//i.test(e)?"Edge":/OPR\//i.test(e)||/Opera/i.test(e)?"Opera":/Firefox/i.test(e)?"Firefox":/Safari/i.test(e)&&!/Chrome|Chromium|Edg|OPR/i.test(e)?"Safari":/Brave/i.test(e)||window.Brave||navigator.brave?"Brave":/Chrome|Chromium/i.test(e)?"Chrome":"Unknown"}function _c(){let e=navigator.userAgent||"",t=navigator.userAgentData;return t&&typeof t.mobile=="boolean"?t.mobile?"mobile":"desktop":/Android|iPhone|iPad|iPod|Mobile/i.test(e)?"mobile":"desktop"}function fe(){let e=(()=>{try{return window.top!==window.self}catch{return!0}})(),t=Nc(document.referrer),o=e&&!!t&&/(^|\.)discord(app)?\.com$/i.test(t)?"discord":"web",r=_c(),a=Oc(),i=Hc(),s=window.screen||{},l=window.visualViewport,c=Math.round(window.innerWidth||document.documentElement.clientWidth||0),d=Math.round(window.innerHeight||document.documentElement.clientHeight||0),u=Math.round(l?.width??c),p=Math.round(l?.height??d),m=Math.round(s.width||0),h=Math.round(s.height||0),f=Math.round(s.availWidth||m),g=Math.round(s.availHeight||h),b=Number.isFinite(window.devicePixelRatio)?window.devicePixelRatio:1;return{surface:o,host:location.hostname,origin:location.origin,isInIframe:e,platform:r,browser:i,os:a,viewportWidth:c,viewportHeight:d,visualViewportWidth:u,visualViewportHeight:p,screenWidth:m,screenHeight:h,availScreenWidth:f,availScreenHeight:g,dpr:b,orientation:Rc()}}function Bo(){return fe().surface==="discord"}function Nc(e){if(!e)return null;try{return new URL(e).hostname}catch{return null}}var Wt=!1,mt=new Set;function Dc(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}var me=e=>{let t=Dc();if(t){for(let n of mt)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function Gc(){Wt||(Wt=!0,window.addEventListener("keydown",me,!0),window.addEventListener("keypress",me,!0),window.addEventListener("keyup",me,!0),document.addEventListener("keydown",me,!0),document.addEventListener("keypress",me,!0),document.addEventListener("keyup",me,!0))}function Wc(){Wt&&(Wt=!1,window.removeEventListener("keydown",me,!0),window.removeEventListener("keypress",me,!0),window.removeEventListener("keyup",me,!0),document.removeEventListener("keydown",me,!0),document.removeEventListener("keypress",me,!0),document.removeEventListener("keyup",me,!0))}function Bc(e){return mt.size===0&&Gc(),mt.add(e),()=>{mt.delete(e),mt.size===0&&Wc()}}function Vc(e,t,n,o){let r;switch(e){case"digits":r="0-9";break;case"alpha":r="\\p{L}";break;case"alphanumeric":r="\\p{L}0-9";break;default:return null}return t&&(r+=" "),n&&(r+="\\-"),o&&(r+="_"),new RegExp(`[^${r}]`,"gu")}function Fc(e,t){return t?e.replace(t,""):e}function jc(e,t=0){if(!t)return e;let n;return((...o)=>{clearTimeout(n),n=setTimeout(()=>e(...o),t)})}function Vo(e={}){let{id:t,placeholder:n="",value:o="",mode:r="any",allowSpaces:a=!1,allowDashes:i=!1,allowUnderscore:s=!1,maxLength:l,blockGameKeys:c=!0,debounceMs:d=0,onChange:u,onEnter:p,label:m}=e,h=w("div",{className:"lg-input-wrap"}),f=w("input",{className:"input",id:t,placeholder:n});if(typeof l=="number"&&l>0&&(f.maxLength=l),o&&(f.value=o),m){let C=w("div",{className:"lg-input-label"},m);h.appendChild(C)}h.appendChild(f);let g=Vc(r,a,i,s),b=()=>{let C=f.selectionStart??f.value.length,z=f.value.length,q=Fc(f.value,g);if(q!==f.value){f.value=q;let K=z-q.length,N=Math.max(0,C-K);f.setSelectionRange(N,N)}},S=jc(()=>u?.(f.value),d);f.addEventListener("input",()=>{b(),S()}),f.addEventListener("paste",()=>queueMicrotask(()=>{b(),S()})),f.addEventListener("keydown",C=>{C.key==="Enter"&&p?.(f.value)});let T=c?Bc(f):()=>{};function x(){return f.value}function v(C){f.value=C??"",b(),S()}function k(){f.focus()}function M(){f.blur()}function P(C){f.disabled=!!C}function E(){return document.activeElement===f}function L(){T()}return{root:h,input:f,getValue:x,setValue:v,focus:k,blur:M,setDisabled:P,isFocused:E,destroy:L}}function ee(e,t,n){return Math.min(n,Math.max(t,e))}function ft({h:e,s:t,v:n,a:o}){let r=(e%360+360)%360/60,a=n*t,i=a*(1-Math.abs(r%2-1)),s=0,l=0,c=0;switch(Math.floor(r)){case 0:s=a,l=i;break;case 1:s=i,l=a;break;case 2:l=a,c=i;break;case 3:l=i,c=a;break;case 4:s=i,c=a;break;default:s=a,c=i;break}let u=n-a,p=Math.round((s+u)*255),m=Math.round((l+u)*255),h=Math.round((c+u)*255);return{r:ee(p,0,255),g:ee(m,0,255),b:ee(h,0,255),a:ee(o,0,1)}}function Fo({r:e,g:t,b:n,a:o}){let r=ee(e,0,255)/255,a=ee(t,0,255)/255,i=ee(n,0,255)/255,s=Math.max(r,a,i),l=Math.min(r,a,i),c=s-l,d=0;c!==0&&(s===r?d=60*((a-i)/c%6):s===a?d=60*((i-r)/c+2):d=60*((r-a)/c+4)),d<0&&(d+=360);let u=s===0?0:c/s;return{h:d,s:u,v:s,a:ee(o,0,1)}}function Pn({r:e,g:t,b:n}){let o=r=>ee(Math.round(r),0,255).toString(16).padStart(2,"0");return`#${o(e)}${o(t)}${o(n)}`.toUpperCase()}function $c({r:e,g:t,b:n,a:o}){let r=ee(Math.round(o*255),0,255);return`${Pn({r:e,g:t,b:n,a:o})}${r.toString(16).padStart(2,"0")}`.toUpperCase()}function gt({r:e,g:t,b:n,a:o}){let r=Math.round(o*1e3)/1e3;return`rgba(${e}, ${t}, ${n}, ${r})`}function qe(e){let t=e.trim();if(!t||(t.startsWith("#")&&(t=t.slice(1)),![3,4,6,8].includes(t.length))||!/^[0-9a-fA-F]+$/.test(t))return null;(t.length===3||t.length===4)&&(t=t.split("").map(i=>i+i).join(""));let n=255;t.length===8&&(n=parseInt(t.slice(6,8),16),t=t.slice(0,6));let o=parseInt(t.slice(0,2),16),r=parseInt(t.slice(2,4),16),a=parseInt(t.slice(4,6),16);return{r:o,g:r,b:a,a:n/255}}function Mn(e){if(!e)return null;let t=e.trim();if(t.startsWith("#"))return qe(t);let n=t.match(/^rgba?\(([^)]+)\)$/i);if(n){let o=n[1].split(",").map(l=>l.trim());if(o.length<3)return null;let r=Number(o[0]),a=Number(o[1]),i=Number(o[2]),s=o[3]!=null?Number(o[3]):1;return[r,a,i,s].some(l=>Number.isNaN(l))?null:{r,g:a,b:i,a:s}}return null}function zc(e,t){let n=Mn(e)??qe(e??"")??{r:244,g:67,b:54,a:1};return typeof t=="number"&&(n.a=ee(t,0,1)),Fo(n)}function Uc(e){return`#${e.trim().replace(/[^0-9a-fA-F#]/g,"").replace(/#/g,"")}`.slice(0,9).toUpperCase()}function Kc(e){let t=e.trim();return t&&(/^rgba?\s*\(/i.test(t)?t=t.replace(/^rgba?/i,"rgba"):(t=t.replace(/^\(?(.*)\)?$/,"$1"),t=`rgba(${t})`),t=t.replace(/\s*\(\s*/,"("),t=t.replace(/\s*\)\s*$/,")"),t=t.replace(/\s*,\s*/g,", "),t)}function Ne(e){let t=ft(e),n=ft({...e,a:1});return{hsva:{...e},hex:Pn(n),hexa:$c(t),rgba:gt(t),alpha:e.a}}function jo(e={}){let{id:t,label:n="Color",value:o,alpha:r,defaultExpanded:a=!1,detectMobile:i,onInput:s,onChange:l}=e,d=i?i():fe().platform==="mobile",u=zc(o,r),p=Ie({id:t,className:"color-picker",title:n,padding:d?"md":"lg",variant:"soft",expandable:!d,defaultExpanded:!d&&a});p.classList.add(d?"color-picker--mobile":"color-picker--desktop");let m=p.querySelector(".card-header");m&&m.classList.add("color-picker__header");let h=m?.querySelector(".card-title"),f=w("button",{className:"color-picker__preview",type:"button",title:`Preview ${n}`,"aria-label":`Change ${n}`});h?h.prepend(f):m?m.prepend(f):p.prepend(f);let g=p.querySelector(".card-toggle");!d&&g&&f.addEventListener("click",()=>{p.classList.contains("card--collapsed")&&g.click()});let b=p.querySelector(".card-collapse"),S=null,T=null,x=null,v=null,k=null,M=null,P=null,E=null,L=null,C="hex";function z(O){let R=Ne(u);O==="input"?s?.(R):l?.(R)}function q(){let O=Ne(u);if(f.style.setProperty("--cp-preview-color",O.rgba),f.setAttribute("aria-label",`${n}: ${O.hexa}`),!d&&S&&T&&x&&v&&k&&M&&P){let R=ft({...u,s:1,v:1,a:1}),_=gt(R);S.style.setProperty("--cp-palette-hue",_),T.style.left=`${u.s*100}%`,T.style.top=`${(1-u.v)*100}%`,x.style.setProperty("--cp-alpha-gradient",`linear-gradient(180deg, ${gt({...R,a:1})} 0%, ${gt({...R,a:0})} 100%)`),v.style.top=`${(1-u.a)*100}%`,k.style.setProperty("--cp-hue-color",gt(ft({...u,v:1,s:1,a:1}))),M.style.left=`${u.h/360*100}%`;let I=u.a===1?O.hex:O.hexa,A=O.rgba,H=C==="hex"?I:A;P!==document.activeElement&&(P.value=H),P.setAttribute("aria-label",`${C.toUpperCase()} code for ${n}`),P.placeholder=C==="hex"?"#RRGGBB or #RRGGBBAA":"rgba(0, 0, 0, 1)",C==="hex"?P.maxLength=9:P.removeAttribute("maxLength"),P.dataset.mode=C,E&&(E.textContent=C.toUpperCase(),E.setAttribute("aria-label",C==="hex"?"Passer en saisie RGBA":"Revenir en saisie HEX"),E.setAttribute("aria-pressed",C==="rgba"?"true":"false"),E.classList.toggle("is-alt",C==="rgba"))}L&&L!==document.activeElement&&(L.value=O.hex)}function K(O,R=null){u={h:(O.h%360+360)%360,s:ee(O.s,0,1),v:ee(O.v,0,1),a:ee(O.a,0,1)},q(),R&&z(R)}function N(O,R=null){K(Fo(O),R)}function G(O,R,_){O.addEventListener("pointerdown",I=>{I.preventDefault();let A=I.pointerId,H=j=>{j.pointerId===A&&R(j)},D=j=>{j.pointerId===A&&(document.removeEventListener("pointermove",H),document.removeEventListener("pointerup",D),document.removeEventListener("pointercancel",D),_?.(j))};R(I),document.addEventListener("pointermove",H),document.addEventListener("pointerup",D),document.addEventListener("pointercancel",D)})}if(!d&&b){let O=b.querySelector(".card-body");if(O){O.classList.add("color-picker__body"),T=w("div",{className:"color-picker__palette-cursor"}),S=w("div",{className:"color-picker__palette"},T),v=w("div",{className:"color-picker__alpha-thumb"}),x=w("div",{className:"color-picker__alpha"},v),M=w("div",{className:"color-picker__hue-thumb"}),k=w("div",{className:"color-picker__hue"},M);let R=w("div",{className:"color-picker__main"},S,x),_=w("div",{className:"color-picker__hue-row"},k),I=Vo({blockGameKeys:!0});P=I.input,P.classList.add("color-picker__hex-input"),P.value="",P.maxLength=9,P.spellcheck=!1,P.inputMode="text",P.setAttribute("aria-label",`Hex code for ${n}`),E=w("button",{type:"button",className:"color-picker__mode-btn",textContent:"HEX","aria-pressed":"false","aria-label":"Passer en saisie RGBA"}),I.root.classList.add("color-picker__hex-wrap");let A=w("div",{className:"color-picker__hex-row"},E,I.root);O.replaceChildren(R,_,A),G(S,D=>{if(!S||!T)return;let j=S.getBoundingClientRect(),te=ee((D.clientX-j.left)/j.width,0,1),fn=ee((D.clientY-j.top)/j.height,0,1);K({...u,s:te,v:1-fn},"input")},()=>z("change")),G(x,D=>{if(!x)return;let j=x.getBoundingClientRect(),te=ee((D.clientY-j.top)/j.height,0,1);K({...u,a:1-te},"input")},()=>z("change")),G(k,D=>{if(!k)return;let j=k.getBoundingClientRect(),te=ee((D.clientX-j.left)/j.width,0,1);K({...u,h:te*360},"input")},()=>z("change")),E.addEventListener("click",()=>{if(C=C==="hex"?"rgba":"hex",P){let D=Ne(u);P.value=C==="hex"?u.a===1?D.hex:D.hexa:D.rgba}q(),P?.focus(),P?.select()}),P.addEventListener("input",()=>{if(C==="hex"){let D=Uc(P.value);if(D!==P.value){let j=P.selectionStart??D.length;P.value=D,P.setSelectionRange(j,j)}}});let H=()=>{let D=P.value;if(C==="hex"){let j=qe(D);if(!j){P.value=u.a===1?Ne(u).hex:Ne(u).hexa;return}let te=D.startsWith("#")?D.slice(1):D,fn=te.length===4||te.length===8;j.a=fn?j.a:u.a,N(j,"change")}else{let j=Kc(D),te=Mn(j);if(!te){P.value=Ne(u).rgba;return}N(te,"change")}};P.addEventListener("change",H),P.addEventListener("blur",H),P.addEventListener("keydown",D=>{D.key==="Enter"&&(H(),P.blur())})}}return d&&(b&&b.remove(),L=w("input",{className:"color-picker__native",type:"color",value:Pn(ft({...u,a:1}))}),f.addEventListener("click",()=>L.click()),L.addEventListener("input",()=>{let O=qe(L.value);O&&(O.a=u.a,N(O,"input"),z("change"))}),p.appendChild(L)),q(),{root:p,isMobile:d,getValue:()=>Ne(u),setValue:(O,R)=>{let _=Mn(O)??qe(O)??qe("#FFFFFF");_&&(typeof R=="number"&&(_.a=R),N(_,null))}}}function qc(e){try{return!!e.isSecureContext}catch{return!1}}function En(e){let t=e?.getRootNode?.();return t&&(t instanceof Document||t.host)?t:document}function $o(){let e=navigator.platform||"",t=navigator.userAgent||"";return/Mac|iPhone|iPad|iPod/i.test(e)||/Mac OS|iOS/i.test(t)}async function Jc(){try{let e=await navigator.permissions?.query?.({name:"clipboard-write"});return e?e.state==="granted"||e.state==="prompt":!0}catch{return!0}}function Xc(e,t){let n=document.createElement("textarea");return n.value=e,n.setAttribute("readonly","true"),n.style.position="fixed",n.style.opacity="0",n.style.pointerEvents="none",n.style.top="0",t.appendChild?t.appendChild(n):document.body.appendChild(n),n}function Yc(e){try{let t=window.getSelection?.();if(!t)return!1;let n=document.createRange();return n.selectNodeContents(e),t.removeAllRanges(),t.addRange(n),!0}catch{return!1}}async function Qc(e){if(!("clipboard"in navigator))return{ok:!1,method:"clipboard-write"};if(!qc(W))return{ok:!1,method:"clipboard-write"};if(!await Jc())return{ok:!1,method:"clipboard-write"};try{return await navigator.clipboard.writeText(e),{ok:!0,method:"clipboard-write"}}catch{return{ok:!1,method:"clipboard-write"}}}function Zc(e,t){try{let n=t||En(),o=Xc(e,n);o.focus(),o.select(),o.setSelectionRange(0,o.value.length);let r=!1;try{r=document.execCommand("copy")}catch{r=!1}return o.remove(),{ok:r,method:"execCommand"}}catch{return{ok:!1,method:"execCommand"}}}function eu(e,t){if(!t)return{ok:!1,method:"selection"};let n=t.textContent??"",o=!1;if(n!==e)try{t.textContent=e,o=!0}catch{}let r=Yc(t);o&&setTimeout(()=>{try{t.textContent=n}catch{}},80);let a=$o()?"\u2318C pour copier":"Ctrl+C pour copier";return{ok:r,method:"selection",hint:a}}async function tu(e,t={}){let n=(e??"").toString();if(!n.length)return{ok:!1,method:"noop"};let o=await Qc(n);if(o.ok)return o;let r=t.injectionRoot||En(t.valueNode||void 0),a=Zc(n,r);if(a.ok)return a;let i=eu(n,t.valueNode||null);if(i.ok)return i;if(!t.disablePromptFallback)try{return window.prompt(Bo()?"Copie manuelle (Discord bloque clipboard):":"Copie manuelle:",n),{ok:!0,method:"prompt"}}catch{}return{ok:!1,method:"noop"}}function zo(e,t,n={}){let o=r=>{if(n.showTip){n.showTip(r);return}try{e.setAttribute("aria-label",r);let a=document.createElement("div");a.textContent=r,a.style.position="absolute",a.style.top="-28px",a.style.right="0",a.style.padding="4px 8px",a.style.borderRadius="8px",a.style.fontSize="12px",a.style.background="color-mix(in oklab, var(--bg) 85%, transparent)",a.style.border="1px solid var(--border)",a.style.color="var(--fg)",a.style.pointerEvents="none",a.style.opacity="0",a.style.transition="opacity .12s";let i=En(e);i.appendChild?i.appendChild(a):document.body.appendChild(a);let s=e.getBoundingClientRect();a.style.left=`${s.right-8}px`,a.style.top=`${s.top-28}px`,requestAnimationFrame(()=>a.style.opacity="1"),setTimeout(()=>{a.style.opacity="0",setTimeout(()=>a.remove(),150)},1200)}catch{}};e.addEventListener("click",async r=>{r.stopPropagation();let a=(t()??"").toString(),i=await tu(a,{valueNode:n.valueNode??null,injectionRoot:n.injectionRoot??null,disablePromptFallback:n.disablePromptFallback??!1});n.onResult?.(i),i.ok?i.method==="clipboard-write"||i.method==="execCommand"||i.method==="prompt"?o("Copi\xE9"):i.method==="selection"&&o(i.hint||($o()?"\u2318C pour copier":"Ctrl+C pour copier")):o("Impossible de copier")})}var Re={light:{"--bg":"rgba(255,255,255,0.7)","--fg":"#0f172a","--muted":"rgba(15,23,42,0.06)","--soft":"rgba(15,23,42,0.04)","--accent":"#2563eb","--border":"rgba(15,23,42,0.12)","--shadow":"rgba(2,6,23,.2)","--tab-bg":"#ffffff","--tab-fg":"#0f172a","--pill-from":"#4f46e5","--pill-to":"#06b6d4"},dark:{"--bg":"rgba(10,12,18,0.6)","--fg":"#e5e7eb","--muted":"rgba(229,231,235,0.08)","--soft":"rgba(229,231,235,0.05)","--accent":"#60a5fa","--border":"rgba(148,163,184,0.2)","--shadow":"rgba(0,0,0,.45)","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#e5e7eb","--pill-from":"#6366f1","--pill-to":"#06b6d4"},sepia:{"--bg":"rgba(247,242,231,0.72)","--fg":"#3b2f2f","--muted":"rgba(59,47,47,0.06)","--soft":"rgba(59,47,47,0.04)","--accent":"#b07d62","--border":"rgba(59,47,47,0.14)","--shadow":"rgba(0,0,0,.18)","--tab-bg":"#fff","--tab-fg":"#3b2f2f","--pill-from":"#b07d62","--pill-to":"#d4a373"},forest:{"--bg":"rgba(14,24,18,0.62)","--fg":"#e7f5e9","--muted":"rgba(231,245,233,0.08)","--soft":"rgba(231,245,233,0.05)","--accent":"#34d399","--border":"rgba(231,245,233,0.16)","--shadow":"rgba(0,0,0,.5)","--tab-bg":"rgba(255,255,255,0.06)","--tab-fg":"#e7f5e9","--pill-from":"#10b981","--pill-to":"#84cc16"},violet:{"--bg":"rgba(23, 16, 42, 0.68)","--fg":"#f5f3ff","--muted":"rgba(245,243,255,0.08)","--soft":"rgba(245,243,255,0.05)","--accent":"#a855f7","--border":"rgba(216,180,254,0.22)","--shadow":"rgba(12,3,30,.55)","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#ede9fe","--pill-from":"#a855f7","--pill-to":"#f472b6"},ocean:{"--bg":"rgba(10, 34, 46, 0.66)","--fg":"#e0f7ff","--muted":"rgba(224,247,255,0.07)","--soft":"rgba(224,247,255,0.05)","--accent":"#38bdf8","--border":"rgba(125, 211, 252, 0.22)","--shadow":"rgba(0, 16, 32, .52)","--tab-bg":"rgba(56,189,248,0.14)","--tab-fg":"#e0f7ff","--pill-from":"#0ea5e9","--pill-to":"#14b8a6"},ember:{"--bg":"rgba(34,18,10,0.64)","--fg":"#fff7ed","--muted":"rgba(255,247,237,0.08)","--soft":"rgba(255,247,237,0.05)","--accent":"#f97316","--border":"rgba(255, 159, 92, 0.24)","--shadow":"rgba(16,6,2,.52)","--tab-bg":"rgba(255,247,237,0.09)","--tab-fg":"#fff7ed","--pill-from":"#fb923c","--pill-to":"#facc15"}};function In(e){let{host:t,themes:n,initialTheme:o,onThemeChange:r}=e,a=o,i=null,s=!1;function l(d){let u=n[d]||n[a]||{};s&&t.classList.add("theme-anim");for(let[p,m]of Object.entries(u))t.style.setProperty(p,m);s?(i!==null&&clearTimeout(i),i=W.setTimeout(()=>{t.classList.remove("theme-anim"),i=null},320)):s=!0,a=d,r?.(d)}function c(){return a}return l(o),{applyTheme:l,getCurrentTheme:c}}var Bt={ui:{expandedCards:{style:!1,system:!1}}};async function Uo(){let e=await dt("tab-settings",{version:1,defaults:Bt,sanitize:r=>({ui:{expandedCards:Ot(Bt.ui.expandedCards,r.ui?.expandedCards)}})});function t(r){let a=e.get();e.update({ui:{...a.ui,...r,expandedCards:Ot(a.ui.expandedCards,r.expandedCards)}})}function n(r,a){let i=e.get();e.update({ui:{...i.ui,expandedCards:{...i.ui.expandedCards,[r]:!!a}}})}function o(r){let a=e.get();n(r,!a.ui.expandedCards[r])}return{get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:o}}function Ko(e){return e.replace(/[_-]+/g," ").replace(/^\w/,t=>t.toUpperCase())}function nu(){return Object.keys(Re).map(e=>({value:e,label:Ko(e)}))}var ou=["--bg","--fg","--accent","--muted","--soft","--border","--shadow","--tab-bg","--tab-fg","--pill-from","--pill-to"];function ru(e){return Ko(e.replace(/^--/,""))}function au(e){return e.alpha<1?e.rgba:e.hex}var Vt=class extends _e{constructor(n){super({id:"tab-settings",label:"Settings"});this.deps=n}async build(n){let o=this.createGrid("12px");o.id="settings",n.appendChild(o);let r;try{r=await Uo()}catch{r={get:()=>Bt,set:()=>{},save:()=>{},setUI:()=>{},setCardExpanded:()=>{},toggleCard:()=>{}}}let a=r.get(),i=Object.keys(Re),s=this.deps.getCurrentTheme?.()??this.deps.initialTheme,l=i.includes(s)?s:i[0]??"dark",c=l,d=Dt({text:"Theme",tone:"muted",size:"lg"}),u=Ke({options:nu(),value:l,onChange:f=>{c=f,this.deps.applyTheme(f),this.renderThemePickers(f,p,c)}}),p=w("div",{className:"settings-theme-grid"}),m=Ie({title:"Style",padding:"lg",expandable:!0,defaultExpanded:!!a.ui.expandedCards.style,onExpandChange:f=>r.setCardExpanded("style",f)},w("div",{className:"kv settings-theme-row"},d.root,u.root),p);this.renderThemePickers(l,p,c);let h=this.createEnvCard({defaultExpanded:!!a.ui.expandedCards.system,onExpandChange:f=>r.setCardExpanded("system",f)});o.appendChild(m),o.appendChild(h)}renderThemePickers(n,o,r){let a=Re[n];if(o.replaceChildren(),!!a)for(let i of ou){let s=a[i];if(s==null)continue;let l=jo({label:ru(i),value:s,defaultExpanded:!1,onInput:c=>this.updateThemeVar(n,i,c,r),onChange:c=>this.updateThemeVar(n,i,c,r)});o.appendChild(l.root)}}updateThemeVar(n,o,r,a){let i=Re[n];i&&(i[o]=au(r),a===n&&this.deps.applyTheme(n))}createEnvCard(n){let o=n?.defaultExpanded??!1,r=n?.onExpandChange,a=(b,S)=>{let T=w("div",{className:"kv kv--inline-mobile"}),x=w("label",{},b),v=w("div",{className:"ro"});return typeof S=="string"?v.textContent=S:v.append(S),T.append(x,v),T},i=w("code",{},"\u2014"),s=w("span",{},"\u2014"),l=w("span",{},"\u2014"),c=w("span",{},"\u2014"),d=w("span",{},"\u2014"),u=w("span",{},"\u2014"),p=()=>{let b=fe();l.textContent=b.surface,c.textContent=b.platform,d.textContent=b.browser??"Unknown",u.textContent=b.os??"Unknown",i.textContent=b.host,s.textContent=b.isInIframe?"Yes":"No"},m=Le({label:"Copy JSON",variant:"primary",size:"sm"});zo(m,()=>{let b=fe();return JSON.stringify(b,null,2)});let h=w("div",{style:"width:100%;display:flex;justify-content:center;"},m),f=Ie({title:"System",variant:"soft",padding:"lg",footer:h,expandable:!0,defaultExpanded:o,onExpandChange:r},a("Surface",l),a("Platform",c),a("Browser",d),a("OS",u),a("Host",i),a("Iframe",s)),g=()=>{document.hidden||p()};return document.addEventListener("visibilitychange",g),p(),this.addCleanup(()=>document.removeEventListener("visibilitychange",g)),f}};function bt(e){return e<10?`0${e}`:String(e)}function ie(e){let t=/^(\d{1,2}):(\d{2})$/.exec((e||"").trim());if(!t)return 0;let n=Math.max(0,Math.min(23,parseInt(t[1],10)||0)),o=Math.max(0,Math.min(59,parseInt(t[2],10)||0));return n*60+o}function Ln(e){let t=Math.max(0,Math.min(1439,e|0)),n=Math.floor(t/60),o=t%60;return`${bt(n)}:${bt(o)}`}function we(e,t){let n=ie(e),o=Math.max(0,Math.min(1439,n)),r=Math.floor(o/t)*t;return Ln(r)}function iu(e){let t=Math.floor(e/60),n=e%60,o=t>=12;return{h12:t%12||12,m:n,pm:o}}function su(e,t,n){return(e%12+(n?12:0))*60+t}function lu(e){return e.platform==="mobile"||e.os==="ios"||e.os==="android"}function qo(e={}){let{id:t,start:n="08:00",end:o="23:00",stepMinutes:r=5,disabled:a=!1,allowOvernight:i=!0,labels:s={from:"From",to:"To"},picker:l="auto",format:c="auto",useNativeOn:d,onChange:u}=e,p={start:we(n,r),end:we(o,r)},m=w("div",{className:"time-range",id:t});m.classList.add("time-range--stacked");let h=fe();if(l==="native"||l==="auto"&&(d?.(h)??lu(h)))return g();return b();function g(){let x=w("div",{className:"time-range-field",role:"group"}),v=w("span",{className:"time-range-label"},s.from||"From"),k=w("input",{className:"input time-range-input",type:"time",step:String(r*60),value:p.start}),M=w("div",{className:"time-range-field",role:"group"}),P=w("span",{className:"time-range-label"},s.to||"To"),E=w("input",{className:"input time-range-input",type:"time",step:String(r*60),value:p.end});x.append(v,k),M.append(P,E),m.append(x,M);function L(){k.value=p.start,E.value=p.end}function C(){u?.(q())}function z(O){let R=O.target,_=R===k,I=we(R.value||(_?p.start:p.end),r);_?(p.start=I,!i&&ie(p.end)<ie(p.start)&&(p.end=p.start)):(p.end=I,!i&&ie(p.end)<ie(p.start)&&(p.start=p.end)),L(),C()}k.addEventListener("change",z),k.addEventListener("blur",z),E.addEventListener("change",z),E.addEventListener("blur",z),a&&N(!0);function q(){return{...p}}function K(O){if(O.start&&(p.start=we(O.start,r)),O.end&&(p.end=we(O.end,r)),!i){let R=ie(p.start);ie(p.end)<R&&(p.end=p.start)}L(),C()}function N(O){k.disabled=O,E.disabled=O,m.classList.toggle("is-disabled",!!O)}function G(){k.removeEventListener("change",z),k.removeEventListener("blur",z),E.removeEventListener("change",z),E.removeEventListener("blur",z),m.replaceChildren()}return{root:m,getValue:q,setValue:K,setDisabled:N,destroy:G}}function b(){let x=w("label",{className:"time-range-field"}),v=w("span",{className:"time-range-label"},s.from||"From"),k=w("label",{className:"time-range-field"}),M=w("span",{className:"time-range-label"},s.to||"To"),P=c==="12h"||c==="auto"&&T(),E=S(p.start,P),L=S(p.end,P);x.append(v,E.container),k.append(M,L.container),m.append(x,k),a&&K(!0),q(),E.onAnyChange(()=>{p.start=E.to24h(r),!i&&ie(p.end)<ie(p.start)&&(p.end=p.start,L.setFrom24h(p.end)),u?.(C())}),L.onAnyChange(()=>{p.end=L.to24h(r),!i&&ie(p.end)<ie(p.start)&&(p.start=p.end,E.setFrom24h(p.start)),u?.(C())});function C(){return{...p}}function z(G){if(G.start&&(p.start=we(G.start,r)),G.end&&(p.end=we(G.end,r)),!i){let O=ie(p.start);ie(p.end)<O&&(p.end=p.start)}q(),u?.(C())}function q(){E.setFrom24h(p.start),L.setFrom24h(p.end)}function K(G){E.setDisabled(G),L.setDisabled(G),m.classList.toggle("is-disabled",!!G)}function N(){E.destroy(),L.destroy(),m.replaceChildren()}return{root:m,getValue:C,setValue:z,setDisabled:K,destroy:N}}function S(x,v){let k=w("div",{className:"time-picker"}),M=(A,H=2)=>{A.classList.add("time-picker-compact"),A.style.setProperty("--min-ch",String(H))},P=v?Array.from({length:12},(A,H)=>{let D=H+1;return{value:String(D),label:bt(D)}}):Array.from({length:24},(A,H)=>({value:String(H),label:bt(H)})),E=Ke({size:"sm",options:P,placeholder:"HH",onChange:()=>G()});M(E.root,2);let L=Math.max(1,Math.min(30,Math.floor(e.stepMinutes??5))),C=Array.from({length:Math.floor(60/L)},(A,H)=>{let D=H*L;return{value:String(D),label:bt(D)}}),z=Ke({size:"sm",options:C,placeholder:"MM",onChange:()=>G()});M(z.root,2);let q=v?Ke({size:"sm",options:[{value:"am",label:"AM"},{value:"pm",label:"PM"}],value:"am",onChange:()=>G()}):null;q&&M(q.root,3),k.append(E.root,z.root,...q?[q.root]:[]);let K=null;function N(A){K=A}function G(){K?.()}function O(A){let H=ie(A);if(v){let D=iu(H);E.setValue(String(D.h12),{notify:!1}),z.setValue(String(Math.floor(D.m/L)*L),{notify:!1}),q.setValue(D.pm?"pm":"am",{notify:!1})}else{let D=Math.floor(H/60),j=H%60;E.setValue(String(D),{notify:!1}),z.setValue(String(Math.floor(j/L)*L),{notify:!1})}}function R(A){let H=parseInt(z.getValue()||"0",10)||0;if(v){let D=parseInt(E.getValue()||"12",10)||12,j=(q?.getValue()||"am")==="pm",te=su(D,H,j);return we(Ln(te),A)}else{let j=(parseInt(E.getValue()||"0",10)||0)*60+H;return we(Ln(j),A)}}function _(A){E.setDisabled(A),z.setDisabled(A),q?.setDisabled(A),k.classList.toggle("is-disabled",!!A)}function I(){k.replaceChildren()}return{container:k,onAnyChange:N,setFrom24h:O,to24h:R,setDisabled:_,destroy:I}}function T(){try{let v=new Intl.DateTimeFormat(void 0,{hour:"numeric"}).format(new Date(2020,1,1,13));return/AM|PM|am|pm/.test(v)}catch{return!1}}}function Xo(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function cu(e){let t=Xo(e);t=t.replace(/\/\*[\s\S]*?\*\//g,r=>`<span class="tok tok-comm">${r}</span>`),t=t.replace(/(^|\s)(\/\/.*)$/gm,(r,a,i)=>`${a}<span class="tok tok-comm">${i}</span>`),t=t.replace(/`[^`\\]*(?:\\.[^`\\]*)*`/g,r=>`<span class="tok tok-str">${r}</span>`),t=t.replace(/'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/g,r=>`<span class="tok tok-str">${r}</span>`),t=t.replace(/\b(?:0[xX][0-9a-fA-F]+|0[bB][01]+|0[oO][0-7]+|\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?(?:[eE][+-]?\d+)?)\b/g,r=>`<span class="tok tok-num">${r}</span>`);let n=["break","case","catch","class","const","continue","debugger","default","delete","do","else","export","extends","finally","for","function","if","import","in","instanceof","let","new","return","super","switch","this","throw","try","typeof","var","void","while","with","yield","await","enum","implements","interface","package","private","protected","public","static","as","from","of"],o=new RegExp(`\\b(?:${n.join("|")})\\b`,"g");return t=t.replace(o,r=>`<span class="tok tok-kw">${r}</span>`),t=t.replace(/\b(?:true|false|null|undefined|NaN|Infinity)\b/g,r=>`<span class="tok tok-lit">${r}</span>`),t}function Jo(e){if(!e)return new Date().toLocaleTimeString();let t=e instanceof Date?e:new Date(e);if(isNaN(t.getTime()))return String(e);let n=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0"),r=String(t.getSeconds()).padStart(2,"0");return`${n}:${o}:${r}`}function Yo(e={}){let{id:t,className:n,height:o,maxLines:r=500,wrap:a=!1,mode:i="plain",showTimestamps:s=!0,autoScroll:l=!0}=e,c=w("div",{className:"log",id:t});n&&c.classList.add(...n.split(" ").filter(Boolean)),a&&c.classList.add("log--wrap");let d=w("div",{className:"log-viewport"}),u=w("div",{className:"log-lines"});d.appendChild(u),c.appendChild(d),o!=null&&(c.style.blockSize=typeof o=="number"?`${o}px`:String(o));let p=i,m=r,h=new Map;function f(N){return p==="js"?cu(N):Xo(N)}function g(N){return N?h.get(N)?.body??u:u}function b(N){let G=typeof N=="string"?{text:N}:N||{text:""},O=g(G.groupKey);if(G.key){let I=Array.from(O.querySelectorAll(`.log-line[data-key="${G.key}"]`)).pop();if(I){G.level&&(I.classList.remove("log-level--debug","log-level--info","log-level--warn","log-level--error"),I.classList.add(`log-level--${G.level}`));let A=I.querySelector(".log-time");s&&A&&(A.textContent=Jo(G.time));let H=I.querySelector(".log-text");H&&(H.innerHTML=f(G.text)),l&&M();return}}let R=document.createElement("div");if(R.className="log-line",G.level&&R.classList.add(`log-level--${G.level}`),G.key&&(R.dataset.key=G.key),s){let I=document.createElement("span");I.className="log-time",I.textContent=Jo(G.time),R.appendChild(I)}let _=document.createElement("span");_.className="log-text",_.innerHTML=f(G.text),R.appendChild(_),O.appendChild(R),L(),l&&M()}function S(N){for(let G of N)b(G)}function T(){u.replaceChildren(),h.clear()}function x(N){p=N,M()}function v(N){c.classList.toggle("log--wrap",!!N),M()}function k(N){m=Math.max(1,Math.floor(N||1))}function M(){requestAnimationFrame(()=>{d.scrollTop=d.scrollHeight})}function P(){let N=0;for(let G=0;G<u.children.length;G+=1){let O=u.children[G];(O.classList.contains("log-line")||O.classList.contains("log-group"))&&(N+=1)}return N}function E(){let N=u.firstElementChild;if(!N)return!1;if(N.classList.contains("log-group")){let G=N.dataset.groupKey;G&&h.delete(G)}return N.remove(),!0}function L(){let N=P();for(;N>m&&E();)N--}function C(N,G){let O=G?.key||`g-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,6)}`;if(h.has(O))return O;let R=document.createElement("div");R.className="log-group",R.dataset.groupKey=O;let _=document.createElement("div");_.className="log-group-header",_.textContent=N;let I=document.createElement("div");I.className="log-group-body",R.append(_,I),u.appendChild(R),h.set(O,{root:R,header:_,body:I});let A=H=>{R.classList.toggle("is-collapsed",!!H)};return G?.collapsed&&A(!0),_.addEventListener("click",()=>A(!R.classList.contains("is-collapsed"))),l&&M(),O}function z(N){h.get(N)}function q(N,G){let O=h.get(N);O&&(G==null?O.root.classList.toggle("is-collapsed"):O.root.classList.toggle("is-collapsed",!!G))}let K=c;return K.add=b,K.addMany=S,K.clear=T,K.setMode=x,K.setWrap=v,K.setMaxLines=k,K.scrollToEnd=M,K.beginGroup=C,K.endGroup=z,K.toggleGroup=q,K}var se={nativeCtor:null,captured:[],latestOpen:null},Qo=Symbol.for("ariesmod.ws.capture.wrapped"),Zo=Symbol.for("ariesmod.ws.capture.native"),er=1;function Rn(e){return!!e&&e.readyState===er}function uu(){if(Rn(se.latestOpen))return se.latestOpen;for(let e=se.captured.length-1;e>=0;e--){let t=se.captured[e];if(Rn(t))return t}return null}function du(e,t){se.captured.push(e),se.captured.length>25&&se.captured.splice(0,se.captured.length-25);let n=()=>{se.latestOpen=e,t&&console.log("[WS] captured socket opened",e.url)};e.addEventListener("open",n),e.addEventListener("close",()=>{se.latestOpen===e&&(se.latestOpen=null),t&&console.log("[WS] captured socket closed",e.url)}),e.readyState===er&&n()}function tr(e=W,t={}){let n=!!t.debug,o=e?.WebSocket;if(typeof o!="function")return()=>{};if(o[Qo])return se.nativeCtor=o[Zo]??se.nativeCtor??null,()=>{};let r=o;se.nativeCtor=r;function a(i,s){let l=s!==void 0?new r(i,s):new r(i);try{du(l,n)}catch{}return l}try{a.prototype=r.prototype}catch{}try{Object.setPrototypeOf(a,r)}catch{}try{a.CONNECTING=r.CONNECTING,a.OPEN=r.OPEN,a.CLOSING=r.CLOSING,a.CLOSED=r.CLOSED}catch{}a[Qo]=!0,a[Zo]=r;try{e.WebSocket=a,n&&console.log("[WS] WebSocket capture installed")}catch{return()=>{}}return()=>{try{e.WebSocket===a&&(e.WebSocket=r)}catch{}}}function pu(e=W){let t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function ht(e=W){let t=uu();if(t)return{ws:t,source:"captured"};let n=pu(e);return n?{ws:n,source:"roomConnection"}:{ws:null,source:null}}function Ft(e,t={}){let n=t.pageWindow??W,o=t.intervalMs??500,r=!!t.debug,a=null,i=null,s=()=>{let c=ht(n);(c.ws!==a||c.source!==i)&&(a=c.ws,i=c.source,r&&console.log("[WS] best socket changed:",c.source,c.ws),e(c))};s();let l=setInterval(s,o);return()=>clearInterval(l)}function mu(e){if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return null}}function gu(e,t=W){let n=t?.MagicCircle_RoomConnection;if(n&&typeof n.sendMessage=="function")try{return Array.isArray(e)?n.sendMessage(...e):n.sendMessage(e),{ok:!0}}catch(a){return{ok:!1,reason:"error",error:a}}let{ws:o}=ht(t);if(!o)return{ok:!1,reason:"no-ws"};if(!Rn(o))return{ok:!1,reason:"not-open"};let r=mu(e);if(r==null)return{ok:!1,reason:"error",error:new Error("Cannot stringify message")};try{return o.send(r),{ok:!0}}catch(a){return{ok:!1,reason:"error",error:a}}}function nr(e,t={},n=W){return gu({type:e,...t},n)}var ve={Welcome:"Welcome",PartialState:"PartialState",ServerErrorMessage:"ServerErrorMessage",Config:"Config",InappropriateContentRejected:"InappropriateContentRejected",Emote:"Emote",CurrencyTransaction:"CurrencyTransaction",Pong:"Pong"},B={Chat:"Chat",Emote:"Emote",Wish:"Wish",KickPlayer:"KickPlayer",SetPlayerData:"SetPlayerData",UsurpHost:"UsurpHost",Dev:"Dev",SetSelectedGame:"SetSelectedGame",VoteForGame:"VoteForGame",RequestGame:"RequestGame",RestartGame:"RestartGame",Ping:"Ping",PlayerPosition:"PlayerPosition",Teleport:"Teleport",CheckWeatherStatus:"CheckWeatherStatus",MoveInventoryItem:"MoveInventoryItem",DropObject:"DropObject",PickupObject:"PickupObject",ToggleFavoriteItem:"ToggleFavoriteItem",PutItemInStorage:"PutItemInStorage",RetrieveItemFromStorage:"RetrieveItemFromStorage",MoveStorageItem:"MoveStorageItem",LogItems:"LogItems",PlantSeed:"PlantSeed",WaterPlant:"WaterPlant",HarvestCrop:"HarvestCrop",SellAllCrops:"SellAllCrops",PurchaseSeed:"PurchaseSeed",PurchaseEgg:"PurchaseEgg",PurchaseTool:"PurchaseTool",PurchaseDecor:"PurchaseDecor",PlantEgg:"PlantEgg",HatchEgg:"HatchEgg",PlantGardenPlant:"PlantGardenPlant",PotPlant:"PotPlant",MutationPotion:"MutationPotion",PickupDecor:"PickupDecor",PlaceDecor:"PlaceDecor",RemoveGardenObject:"RemoveGardenObject",PlacePet:"PlacePet",FeedPet:"FeedPet",PetPositions:"PetPositions",SwapPet:"SwapPet",StorePet:"StorePet",NamePet:"NamePet",SellPet:"SellPet",ReportSpeakingStart:"ReportSpeakingStart"};var Kg=new Set(Object.values(ve)),qg=new Set(Object.values(B));function fu(e,t={},n=W){return nr(e,t,n)}function or(e,t=W){return fu(B.Chat,{scopePath:["Room"],message:e},t)}var De={timeRange:{start:"09:00",end:"18:00"},logSettings:{mode:"js",wrap:!1}};async function rr(){return dt("tab-test",{version:1,defaults:De,sanitize:e=>({timeRange:{start:e.timeRange?.start||De.timeRange.start,end:e.timeRange?.end||De.timeRange.end},logSettings:{mode:e.logSettings?.mode||De.logSettings.mode,wrap:e.logSettings?.wrap??De.logSettings.wrap}})})}var jt=class extends _e{constructor(){super({id:"tab-test",label:"Test"})}async build(t){let n=this.createContainer("test-section");t.appendChild(n);let o;try{o=await rr()}catch{o={get:()=>De,set:()=>{},update:()=>{},save:()=>{}}}let r=o.get(),a=Dt({text:"Plage horaire",hint:"Heures actives du mode 'Plage horaire'.",icon:"\u23F0"}),i=qo({start:r.timeRange.start,end:r.timeRange.end,stepMinutes:5,allowOvernight:!0,picker:"auto",format:"12h",onChange:g=>{o.update({timeRange:{start:g.start,end:g.end}})}}),s=w("div",a.root,i.root),l=Yo({height:220,mode:r.logSettings.mode,maxLines:1e3});r.logSettings.wrap&&l.setWrap(!0),l.add({level:"info",text:"Log initialise"}),l.add({level:"debug",text:"const x = 42; // demo"}),l.add({level:"warn",text:"Requete lente: fetch('/api') > 1200ms"}),l.add({level:"error",text:"new Error('Boom')"});let c=Le({label:"Appliquer",variant:"primary",onClick:()=>{let g=i.getValue();l.add({level:"info",text:`[Apply] ${g.start} -> ${g.end}`})}}),d=Ie({title:"Parametres - Plage horaire",subtitle:"Choisis la fenetre d'activite",variant:"soft",padding:"lg",footer:Cn(c)},s),u=Le({label:"Clear",onClick:()=>or("test")}),p=Le({label:r.logSettings.wrap?"Unwrap":"Wrap",onClick:()=>{let g=!l.classList.contains("log--wrap");l.setWrap(g),p.setLabel(g?"Unwrap":"Wrap"),o.update({logSettings:{...o.get().logSettings,wrap:g}})}}),m=Le({label:`Mode: ${r.logSettings.mode}`,onClick:()=>{let b=o.get().logSettings.mode==="js"?"plain":"js";l.setMode(b),m.setLabel(`Mode: ${b}`),o.update({logSettings:{...o.get().logSettings,mode:b}})}}),h=Le({label:"Add line",onClick:()=>l.add({level:"debug",text:"function tick(){ return Date.now(); } // sample"})}),f=Ie({title:"Logs",variant:"default",padding:"lg"},l,Cn(u,p,m,h));n.appendChild(d),n.appendChild(f)}};function On(e){return[new Vt(e),new jt]}function Hn(e){let{shadow:t,initialOpen:n}=e,o=w("div",{className:"gemini-panel",id:"panel",ariaHidden:String(!n)}),r=w("div",{className:"gemini-tabbar"}),a=w("div",{className:"gemini-content",id:"content"}),i=w("div",{className:"gemini-resizer",title:"Resize"}),s=w("button",{className:"gemini-close",title:"Fermer",ariaLabel:"Fermer"},"\u2715");o.append(r,a,i);let l=w("div",{className:"gemini-wrapper"},o);return t.append(l),{panel:o,tabbar:r,content:a,resizer:i,closeButton:s,wrapper:l}}function _n(e){let{resizer:t,host:n,panel:o,shadow:r,onWidthChange:a,initialWidth:i,minWidth:s,maxWidth:l}=e,c=s,d=l;function u(){let v=fe(),k=Math.round(W.visualViewport?.width??W.innerWidth??0);if(v.platform==="mobile"||v.os==="ios"||v.os==="android"){let M=getComputedStyle(r.host),P=parseFloat(M.getPropertyValue("--inset-l"))||0,E=parseFloat(M.getPropertyValue("--inset-r"))||0,L=Math.max(280,k-Math.round(P+E)),C=Math.min(420,Math.max(300,Math.floor(k*.66))),z=L;c=Math.min(C,L),d=z}else c=s,d=l;return{min:c,max:d}}function p(v){return Math.max(c,Math.min(d,Number(v)||i))}function m(v){let k=p(v);n.style.setProperty("--w",`${k}px`),a(k)}u();let h=fe(),f=!(h.platform==="mobile"||h.os==="ios"||h.os==="android"),g=!1,b=v=>{if(!g)return;v.preventDefault();let k=Math.round(W.innerWidth-v.clientX);m(k)},S=()=>{g&&(g=!1,document.body.style.cursor="",W.removeEventListener("mousemove",b),W.removeEventListener("mouseup",S))},T=v=>{f&&(v.preventDefault(),g=!0,document.body.style.cursor="ew-resize",W.addEventListener("mousemove",b),W.addEventListener("mouseup",S))};t.addEventListener("mousedown",T);function x(){t.removeEventListener("mousedown",T),W.removeEventListener("mousemove",b),W.removeEventListener("mouseup",S)}return{calculateResponsiveBounds:u,constrainWidthToLimits:p,setHudWidth:m,destroy:x}}function Nn(e){let{panel:t,onToggle:n,onClose:o,toggleCombo:r=l=>l.ctrlKey&&l.shiftKey&&l.key.toLowerCase()==="u",closeOnEscape:a=!0}=e;function i(l){let c=t.classList.contains("open");if(a&&l.key==="Escape"&&c){o();return}r(l)&&(l.preventDefault(),l.stopPropagation(),n())}document.addEventListener("keydown",i,{capture:!0});function s(){document.removeEventListener("keydown",i,{capture:!0})}return{destroy:s}}var ar=`
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
`;var Dn=`
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
`;var Gn=`
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
`;function Q(e,t,n){if(e.querySelector(`style[data-style-id="${n}"]`))return;let o=document.createElement("style");o.setAttribute("data-style-id",n),o.textContent=t,e.appendChild(o)}var ir=`
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
  
`;var sr=`
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
`;var lr=`
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
`;var cr=`
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
`;var ur=`
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
`;var dr=`
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
`;var pr=`
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
`;var mr=`
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
`;var gr=`
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
`;var fr=`
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
`;var br=`
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
`;var hr=`
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
`;var yr=`
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
`;var xr=`
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
`;var vr=`
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
`;var wr=`
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
`;var Sr=`
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
`;var hu={all:"initial",position:"fixed",top:"0",right:"0",zIndex:"2147483647",pointerEvents:"auto",fontFamily:'system-ui, -apple-system, "Segoe UI", Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',fontSize:"13px",lineHeight:"1.35"};function yu(e="gemini-root"){let t=document.createElement("div");t.id=e,Object.assign(t.style,hu),(document.body||document.documentElement).appendChild(t);let n=t.attachShadow({mode:"open"});return{host:t,shadow:n}}function Bn(e){let{hostId:t="gemini-hud-root",initialWidth:n,initialOpen:o,onWidthChange:r,onOpenChange:a,themes:i,initialTheme:s,onThemeChange:l,buildSections:c,initialTab:d,onTabChange:u,toggleCombo:p=_=>_.ctrlKey&&_.shiftKey&&_.key.toLowerCase()==="u",closeOnEscape:m=!0,minWidth:h=420,maxWidth:f=720}=e,{host:g,shadow:b}=yu(t);Q(b,Dn,"variables"),Q(b,Gn,"primitives"),Q(b,Wn,"utilities"),Q(b,ar,"hud"),Q(b,ir,"card"),Q(b,sr,"badge"),Q(b,lr,"button"),Q(b,cr,"input"),Q(b,ur,"label"),Q(b,dr,"navTabs"),Q(b,pr,"searchBar"),Q(b,mr,"select"),Q(b,gr,"switch"),Q(b,fr,"table"),Q(b,br,"timeRangePicker"),Q(b,hr,"tooltip"),Q(b,yr,"slider"),Q(b,xr,"reorderableList"),Q(b,vr,"colorPicker"),Q(b,wr,"log"),Q(b,Sr,"settings");let{panel:S,tabbar:T,content:x,resizer:v,closeButton:k,wrapper:M}=Hn({shadow:b,initialOpen:o});function P(_){S.dispatchEvent(new CustomEvent("gemini:hud-open-change",{detail:{isOpen:_},bubbles:!0})),a?.(_)}function E(_){let I=S.classList.contains("open");S.classList.toggle("open",_),S.setAttribute("aria-hidden",_?"false":"true"),_!==I&&P(_)}E(o),k.addEventListener("click",_=>{_.preventDefault(),_.stopPropagation(),E(!1)});let L=In({host:g,themes:i,initialTheme:s,onThemeChange:l}),C=_n({resizer:v,host:g,panel:S,shadow:b,onWidthChange:r||(()=>{}),initialWidth:n,minWidth:h,maxWidth:f});C.setHudWidth(n);let z=c({applyTheme:L.applyTheme,initialTheme:s,getCurrentTheme:L.getCurrentTheme,setHUDWidth:C.setHudWidth,setHUDOpen:E}),q=new ct(z,x,{applyTheme:L.applyTheme,getCurrentTheme:L.getCurrentTheme}),K=z.map(_=>({id:_.id,label:_.label})),N=Ho(K,d||K[0]?.id||"",_=>{q.activate(_),u?.(_)});N.root.style.flex="1 1 auto",N.root.style.minWidth="0",T.append(N.root,k),q.activate(d||K[0]?.id||"");let G=Nn({panel:S,onToggle:()=>E(!S.classList.contains("open")),onClose:()=>E(!1),toggleCombo:p,closeOnEscape:m}),O=()=>{N.recalc();let _=parseInt(getComputedStyle(g).getPropertyValue("--w"))||n;C.calculateResponsiveBounds(),C.setHudWidth(_)};W.addEventListener("resize",O);function R(){G.destroy(),C.destroy(),W.removeEventListener("resize",O)}return{host:g,shadow:b,wrapper:M,panel:S,content:x,setOpen:E,setWidth:C.setHudWidth,sections:z,manager:q,nav:N,destroy:R}}var Je={isOpen:"gemini.hud.isOpen",width:"gemini.hud.width",theme:"gemini.hud.theme",activeTab:"gemini.hud.activeTab"},yt={isOpen:!1,width:480,theme:"dark",activeTab:"tab-settings"};function Vn(){return{isOpen:Ee(Je.isOpen,yt.isOpen),width:Ee(Je.width,yt.width),theme:Ee(Je.theme,yt.theme),activeTab:Ee(Je.activeTab,yt.activeTab)}}function Xe(e,t){ut(Je[e],t)}var xu="https://i.imgur.com/IMkhMur.png",vu="Stats";function Fn(e){let t=e.iconUrl||xu,n=e.ariaLabel||"Open MGH",o=null,r=null,a=null,i=!1,s=null,l=null,c=["Chat","Leaderboard","Stats","Open Activity Log"],d=T=>{try{return typeof CSS<"u"&&CSS&&typeof CSS.escape=="function"?CSS.escape(T):T.replace(/"/g,'\\"')}catch{return T}};function u(){let T=document.querySelector(c.map(v=>`button[aria-label="${d(v)}"]`).join(","));if(!T)return null;let x=T.parentElement;for(;x&&x!==document.body;){if(c.reduce((k,M)=>k+x.querySelectorAll(`button[aria-label="${d(M)}"]`).length,0)>=2)return x;x=x.parentElement}return null}function p(T){return T}function m(T){let x=Array.from(T.querySelectorAll("button[aria-label]"));if(!x.length)return{refBtn:null,refWrapper:null};let v=x.filter(z=>z.dataset.mghBtn!=="true"&&(z.getAttribute("aria-label")||"")!==(e.ariaLabel||"Open MGH")),k=v.length?v:x,M=k.find(z=>(z.getAttribute("aria-label")||"").toLowerCase()===vu.toLowerCase())||null,P=k.length>=2?k.length-2:k.length-1,E=M||k[P],L=E.parentElement,C=L&&L.parentElement===T&&L.tagName==="DIV"?L:null;return{refBtn:E,refWrapper:C}}function h(T,x,v){let k=T.cloneNode(!1);k.type="button",k.setAttribute("aria-label",x),k.title=x,k.dataset.mghBtn="true",k.style.pointerEvents="auto",k.removeAttribute("id");let M=document.createElement("img");return M.src=v,M.alt="MGH",M.style.pointerEvents="none",M.style.userSelect="none",M.style.width="76%",M.style.height="76%",M.style.objectFit="contain",M.style.display="block",M.style.margin="auto",k.appendChild(M),k.addEventListener("click",P=>{P.preventDefault(),P.stopPropagation();try{e.onClick?.()}catch{}}),k}function f(){if(i)return!1;i=!0;let T=!1;try{let x=u();if(!x)return!1;s!==x&&(s=x);let{refBtn:v,refWrapper:k}=m(x);if(!v)return!1;r=x.querySelector('div[data-mgh-wrapper="true"]'),!r&&k&&(r=k.cloneNode(!1),r.dataset.mghWrapper="true",r.removeAttribute("id"),T=!0);let M=r?.querySelector('button[data-mgh-btn="true"]')||null;o||(o=M),o||(o=h(v,n,t),r?r.appendChild(o):o.parentElement!==x&&x.appendChild(o),T=!0),r&&r.parentElement!==x&&(x.appendChild(r),T=!0);let P=x;if(P&&P!==l){try{S.disconnect()}catch{}l=P,S.observe(l,{childList:!0,subtree:!0})}return T}finally{i=!1}}f();let g=document.getElementById("App")||document.body,b=null,S=new MutationObserver(T=>{let x=T.every(k=>{let M=Array.from(k.addedNodes||[]),P=Array.from(k.removedNodes||[]),E=M.concat(P);if(E.length===0){let L=k.target;return r&&(L===r||r.contains(L))||o&&(L===o||o.contains(L))}return E.every(L=>!!(!(L instanceof HTMLElement)||r&&(L===r||r.contains(L))||o&&(L===o||o.contains(L))))}),v=T.some(k=>Array.from(k.removedNodes||[]).some(M=>M instanceof HTMLElement?!!(r&&(M===r||r.contains(M))||o&&(M===o||o.contains(M))):!1));x&&!v||b===null&&(b=window.setTimeout(()=>{if(b=null,f()&&r){let M=r.parentElement;M&&M.lastElementChild!==r&&M.appendChild(r)}},150))});return S.observe(g,{childList:!0,subtree:!0}),a=()=>S.disconnect(),()=>{try{a?.()}catch{}try{r?.remove()}catch{}}}var Tu={},Ar=[];function wu(){return Ar.slice()}function Su(e){Ar.push(e)}function Cr(e){try{return JSON.parse(e)}catch{return}}function kr(e){if(typeof e=="string"){let t=Cr(e);return t!==void 0?t:e}return e}function Mr(e){if(e!=null){if(typeof e=="string"){let t=Cr(e);return t!==void 0?Mr(t):e}if(Array.isArray(e)&&typeof e[0]=="string")return e[0];if(typeof e=="object"){let t=e;return t.type??t.Type??t.kind??t.messageType}}}function ku(e){let t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function V(e,t,n){let o=typeof t=="boolean"?t:!0,r=typeof t=="function"?t:n,a=(i,s)=>{if(Mr(i)!==e)return;let c=r(i,s);return c&&typeof c=="object"&&"kind"in c?c:typeof c=="boolean"?c?void 0:{kind:"drop"}:o?void 0:{kind:"drop"}};return Su(a),a}var xt=new WeakSet,Tr=new WeakMap;function Pr(e){let t=e.pageWindow,n=!!e.debug,o=e.middlewares&&e.middlewares.length?e.middlewares:wu();if(!o.length)return()=>{};let r=p=>({ws:p,pageWindow:t,debug:n}),a=(p,m)=>{let h=p;for(let f of o){let g=f(h,r(m));if(g){if(g.kind==="drop")return{kind:"drop"};g.kind==="replace"&&(h=g.message)}}return h!==p?{kind:"replace",message:h}:void 0},i=null,s=null,l=null,c=()=>{let p=t?.MagicCircle_RoomConnection,m=p?.sendMessage;if(!p||typeof m!="function")return!1;if(xt.has(m))return!0;let h=m.bind(p);function f(...g){let b=g.length===1?g[0]:g,S=kr(b),T=a(S,ku(t));if(T?.kind==="drop"){n&&console.log("[WS] drop outgoing (RoomConnection.sendMessage)",S);return}if(T?.kind==="replace"){let x=T.message;return g.length>1&&Array.isArray(x)?(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",S,"=>",x),h(...x)):(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",S,"=>",x),h(x))}return h(...g)}xt.add(f),Tr.set(f,m);try{p.sendMessage=f,xt.add(p.sendMessage),n&&console.log("[WS] outgoing patched via MagicCircle_RoomConnection.sendMessage")}catch{return!1}return i=()=>{try{p.sendMessage===f&&(p.sendMessage=m)}catch{}},!0};(()=>{let p=t?.WebSocket?.prototype,m=p?.send;if(typeof m!="function"||xt.has(m))return;function h(f){let g=kr(f),b=a(g,this);if(b?.kind==="drop"){n&&console.log("[WS] drop outgoing (ws.send)",g);return}if(b?.kind==="replace"){let S=b.message,T=typeof S=="string"||S instanceof ArrayBuffer||S instanceof Blob?S:JSON.stringify(S);return n&&console.log("[WS] replace outgoing (ws.send)",g,"=>",S),m.call(this,T)}return m.call(this,f)}xt.add(h),Tr.set(h,m);try{p.send=h,n&&console.log("[WS] outgoing patched via WebSocket.prototype.send")}catch{return}s=()=>{try{p.send===h&&(p.send=m)}catch{}}})();let u=e.waitForRoomConnectionMs??4e3;if(!c()&&u>0){let p=Date.now();l=setInterval(()=>{if(c()){clearInterval(l),l=null;return}Date.now()-p>u&&(clearInterval(l),l=null,n&&console.log("[WS] RoomConnection not found, only ws.send is patched"))},250)}return()=>{if(l){try{clearInterval(l)}catch{}l=null}if(i){try{i()}catch{}i=null}if(s){try{s()}catch{}s=null}}}(function(){try{let t=Tu,n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();var Pu={},Ir=[];function Au(){return Ir.slice()}function Er(e){Ir.push(e)}function Cu(e){if(e!=null){if(typeof e=="object"){let t=e;if(typeof t.type=="string")return t.type;if(typeof t.Type=="string")return t.Type;if(typeof t.kind=="string")return t.kind;if(typeof t.messageType=="string")return t.messageType}if(Array.isArray(e)&&typeof e[0]=="string")return e[0]}}function Mu(e){if(typeof e=="string")try{return JSON.parse(e)}catch{return e}return e}var jn=Symbol.for("ariesmod.ws.handlers.patched");function Z(e,t){if(typeof e=="string"){let r=e,a={match:i=>i.kind==="message"&&i.type===r,handle:t};return Er(a),a}let n=e,o={match:r=>r.kind==="close"&&r.code===n,handle:t};return Er(o),o}function Lr(e,t=Au(),n={}){let o=n.pageWindow??window,r=!!n.debug;if(e[jn])return()=>{};e[jn]=!0;let a={ws:e,pageWindow:o,debug:r},i=u=>{for(let p of t)try{if(!p.match(u))continue;if(p.handle(u,a)===!0)return}catch(m){r&&console.error("[WS] handler error",m,u)}},s=u=>{let p=Mu(u.data),m=Cu(p);i({kind:"message",raw:u.data,data:p,type:m})},l=u=>{i({kind:"close",code:u.code,reason:u.reason,wasClean:u.wasClean,event:u})},c=u=>i({kind:"open",event:u}),d=u=>i({kind:"error",event:u});return e.addEventListener("message",s),e.addEventListener("close",l),e.addEventListener("open",c),e.addEventListener("error",d),()=>{try{e.removeEventListener("message",s)}catch{}try{e.removeEventListener("close",l)}catch{}try{e.removeEventListener("open",c)}catch{}try{e.removeEventListener("error",d)}catch{}try{delete e[jn]}catch{}}}(function(){try{let t=Pu,n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();Z(4800,(e,t)=>{t.debug&&console.log("[WS][Close] Auth failure",e.code,e.reason)});Z(4300,(e,t)=>{t.debug&&console.log("[WS][Close] Superseded",e.code,e.reason)});Z(4400,(e,t)=>{t.debug&&console.log("[WS][Close] Heartbeat expired",e.code,e.reason)});Z(4500,(e,t)=>{t.debug&&console.log("[WS][Close] Player kicked",e.code,e.reason)});Z(4200,(e,t)=>{t.debug&&console.log("[WS][Close] Player left voluntarily",e.code,e.reason)});Z(4100,(e,t)=>{t.debug&&console.log("[WS][Close] Reconnect initiated",e.code,e.reason)});Z(4310,(e,t)=>{t.debug&&console.log("[WS][Close] Server disposed",e.code,e.reason)});Z(4250,(e,t)=>{t.debug&&console.log("[WS][Close] User session superseded",e.code,e.reason)});Z(4710,(e,t)=>{t.debug&&console.log("[WS][Close] Version expired",e.code,e.reason)});Z(4700,(e,t)=>{t.debug&&console.log("[WS][Close] Version mismatch",e.code,e.reason)});Z(ve.Config,(e,t)=>{t.debug&&console.log("[WS][STC] Config",e.data)});Z(ve.CurrencyTransaction,(e,t)=>{t.debug&&console.log("[WS][STC] CurrencyTransaction",e.data)});Z(ve.Emote,(e,t)=>{t.debug&&console.log("[WS][STC] Emote",e.data)});Z(ve.InappropriateContentRejected,(e,t)=>{t.debug&&console.log("[WS][STC] InappropriateContentRejected",e.data)});Z(ve.PartialState,(e,t)=>{t.debug&&console.log("[WS][STC] PartialState",e.data)});Z(ve.Pong,(e,t)=>{t.debug&&console.log("[WS][STC] Pong",e.data)});Z(ve.ServerErrorMessage,(e,t)=>{t.debug&&console.log("[WS][STC] ServerErrorMessage",e.data)});Z(ve.Welcome,(e,t)=>{t.debug&&console.log("[WS][STC] Welcome",e.data)});V(B.PlantSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantSeed"),!!1));V(B.WaterPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] WaterPlant"),!!1));V(B.HarvestCrop,(e,t)=>(t.debug&&console.log("[MW][Garden] HarvestCrop"),!!1));V(B.SellAllCrops,(e,t)=>(t.debug&&console.log("[MW][Garden] SellAllCrops"),!!1));V(B.PurchaseSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseSeed"),!!1));V(B.PurchaseEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseEgg"),!!1));V(B.PurchaseTool,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseTool"),!!1));V(B.PurchaseDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseDecor"),!!1));V(B.PlantEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantEgg"),!!1));V(B.HatchEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] HatchEgg"),!!1));V(B.PlantGardenPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantGardenPlant"),!!1));V(B.PotPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PotPlant"),!!1));V(B.MutationPotion,(e,t)=>(t.debug&&console.log("[MW][Garden] MutationPotion"),!!1));V(B.PickupDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PickupDecor"),!!1));V(B.PlaceDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PlaceDecor"),!!1));V(B.RemoveGardenObject,(e,t)=>(t.debug&&console.log("[MW][Garden] RemoveGardenObject"),!!1));V(B.MoveInventoryItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveInventoryItem"),!!1));V(B.DropObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] DropObject"),!!1));V(B.PickupObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] PickupObject"),!!1));V(B.ToggleFavoriteItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] ToggleFavoriteItem"),!!1));V(B.PutItemInStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] PutItemInStorage"),!!1));V(B.RetrieveItemFromStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] RetrieveItemFromStorage"),!!1));V(B.MoveStorageItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveStorageItem"),!!1));V(B.LogItems,(e,t)=>(t.debug&&console.log("[MW][Inventory] LogItems"),!!1));V(B.PlacePet,(e,t)=>(t.debug&&console.log("[MW][Pets] PlacePet"),!!1));V(B.FeedPet,(e,t)=>(t.debug&&console.log("[MW][Pets] FeedPet"),!!1));V(B.PetPositions,(e,t)=>(t.debug&&console.log("[MW][Pets] PetPositions"),!!1));V(B.SwapPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SwapPet"),!!1));V(B.StorePet,(e,t)=>(t.debug&&console.log("[MW][Pets] StorePet"),!!1));V(B.NamePet,(e,t)=>(t.debug&&console.log("[MW][Pets] NamePet"),!!1));V(B.SellPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SellPet"),!!1));console.log("[WS] TESTTEST");V(B.SetSelectedGame,(e,t)=>(t.debug&&console.log("[MW][Session] SetSelectedGame"),!!1));V(B.VoteForGame,(e,t)=>(t.debug&&console.log("[MW][Session] VoteForGame"),!!1));V(B.RequestGame,(e,t)=>(t.debug&&console.log("[MW][Session] RequestGame"),!!1));V(B.RestartGame,(e,t)=>(t.debug&&console.log("[MW][Session] RestartGame"),!!1));V(B.Ping,(e,t)=>(t.debug&&console.log("[MW][Session] Ping"),!!1));V(B.PlayerPosition,(e,t)=>(t.debug&&console.log("[MW][Session] PlayerPosition"),!!1));V(B.Teleport,(e,t)=>(t.debug&&console.log("[MW][Session] Teleport"),!!1));V(B.CheckWeatherStatus,(e,t)=>(t.debug&&console.log("[MW][Session] CheckWeatherStatus"),!!1));V(B.Chat,(e,t)=>(t.debug&&console.log("[MW][Social] Chat"),!!1));V(B.Dev,(e,t)=>(t.debug&&console.log("[MW][Social] Dev"),!!1));V(B.Emote,(e,t)=>(t.debug&&console.log("[MW][Social] Emote"),!!1));V(B.Wish,(e,t)=>(t.debug&&console.log("[MW][Social] Wish"),!!1));V(B.KickPlayer,(e,t)=>(t.debug&&console.log("[MW][Social] KickPlayer"),!!1));V(B.ReportSpeakingStart,(e,t)=>(t.debug&&console.log("[MW][Voice] ReportSpeakingStart"),!!1));V(B.SetPlayerData,(e,t)=>(t.debug&&console.log("[MW][Social] SetPlayerData"),!!1));V(B.UsurpHost,(e,t)=>(t.debug&&console.log("[MW][Social] UsurpHost"),!!1));function Eu(e={}){let t=e.pageWindow??W,n=e.pollMs??500,o=!!e.debug,r=[];r.push(tr(t,{debug:o})),r.push(Pr({pageWindow:t,middlewares:e.middlewares,debug:o}));let a=null,i=s=>{if(a){try{a()}catch{}a=null}s&&(a=Lr(s,e.handlers,{debug:o,pageWindow:t}))};return i(ht(t).ws),r.push(Ft(s=>i(s.ws),{intervalMs:n,debug:o,pageWindow:t})),{getWs:()=>ht(t).ws,dispose:()=>{for(let s=r.length-1;s>=0;s--)try{r[s]()}catch{}if(a){try{a()}catch{}a=null}}}}var $t=null;function Rr(e={}){return $t||($t=Eu(e),$t)}ke();var vt=null;function Iu(){return W?.document??(typeof document<"u"?document:null)}function zn(e){if(vt!==null)return;let t=e??Iu();if(!t)return;let n=t.scripts;for(let o=0;o<n.length;o++){let a=n.item(o)?.src;if(!a)continue;let i=a.match(/\/(?:r\/\d+\/)?version\/([^/]+)/);if(i?.[1]){vt=i[1];return}}}function Lu(){return zn(),vt}async function Ru(e=15e3){let t=performance.now();for(;performance.now()-t<e;){if(zn(),vt)return vt;await Se(50)}throw new Error("MGVersion timeout (gameVersion not found)")}var wt={init:zn,get:Lu,wait:Ru};var Hr=W?.location?.origin||"https://magicgarden.gg";function _r(){return typeof GM_xmlhttpRequest=="function"}function Nr(e,t="text"){return new Promise((n,o)=>{GM_xmlhttpRequest({method:"GET",url:e,responseType:t,onload:r=>r.status>=200&&r.status<300?n(r):o(new Error(`HTTP ${r.status} for ${e}`)),onerror:()=>o(new Error(`Network error for ${e}`)),ontimeout:()=>o(new Error(`Timeout for ${e}`))})})}async function Ye(e){if(_r())return JSON.parse((await Nr(e,"text")).responseText);let t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.json()}async function Ut(e){if(_r())return(await Nr(e,"blob")).response;let t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.blob()}function Dr(e){return new Promise((t,n)=>{let o=URL.createObjectURL(e),r=W?.Image||Image,a=new r;a.decoding="async",a.onload=()=>{URL.revokeObjectURL(o),t(a)},a.onerror=()=>{URL.revokeObjectURL(o),n(new Error("Image decode failed"))},a.src=o})}var ce=(e,t)=>e.replace(/\/?$/,"/")+String(t||"").replace(/^\//,""),Ou=e=>e.lastIndexOf("/")>=0?e.slice(0,e.lastIndexOf("/")+1):"",Un=(e,t)=>String(t||"").startsWith("/")?String(t).slice(1):Ou(e)+String(t||"");var Kt=null,qt=null;async function Gr(){return qt||Kt||(Kt=(async()=>{let e=await wt.wait(15e3);return qt=`${Hr}/version/${e}/assets/`,qt})(),Kt)}async function Hu(e){let t=await Gr();return ce(t,e)}var be={base:Gr,url:Hu};var Kn=new Map;async function _u(e){let t=e||await be.base();if(Kn.has(t))return Kn.get(t);let n=Ye(ce(t,"manifest.json"));return Kn.set(t,n),n}function Nu(e,t){return e?.bundles?.find(n=>n?.name===t)||null}function Du(e){let t=new Set;for(let n of e?.assets||[])for(let o of n?.src||[])typeof o=="string"&&o.endsWith(".json")&&o!=="manifest.json"&&t.add(o);return Array.from(t)}var de={load:_u,getBundle:Nu,listJsonFromBundle:Du};ke();ke();ke();var Wr=Function.prototype.bind,J={_bindPatched:!1,engine:null,tos:null,app:null,renderer:null,ticker:null,stage:null},Br,Vr,Fr,Gu=new Promise(e=>{Br=e}),Wu=new Promise(e=>{Vr=e}),Bu=new Promise(e=>{Fr=e});function Vu(e){return!!(e&&typeof e=="object"&&typeof e.start=="function"&&typeof e.destroy=="function"&&e.app&&e.app.stage&&e.app.renderer&&e.systems&&typeof e.systems.values=="function")}function Fu(e){try{for(let t of e.systems.values()){let n=t?.system;if(n?.name==="tileObject")return n}}catch{}return null}function ju(e){J.engine=e,J.tos=Fu(e)||null,J.app=e.app||null,J.renderer=e.app?.renderer||null,J.ticker=e.app?.ticker||null,J.stage=e.app?.stage||null;try{Br(e)}catch{}try{J.app&&Vr(J.app)}catch{}try{J.renderer&&Fr(J.renderer)}catch{}}function qn(){return J.engine?!0:(J._bindPatched||(J._bindPatched=!0,Function.prototype.bind=function(e,...t){let n=Wr.call(this,e,...t);try{!J.engine&&Vu(e)&&(Function.prototype.bind=Wr,J._bindPatched=!1,ju(e))}catch{}return n}),!1)}qn();async function $u(e=15e3){let t=performance.now();for(;performance.now()-t<e;){if(J.engine)return!0;qn(),await Se(50)}throw new Error("MGPixiHooks: engine capture timeout")}async function zu(e=15e3){return J.engine||await $u(e),!0}function Uu(){return J.engine&&J.app?{ok:!0,engine:J.engine,tos:J.tos,app:J.app}:(qn(),{ok:!1,engine:J.engine,tos:J.tos,app:J.app,note:"Not captured. Wait for room, or reload."})}var oe={engineReady:Gu,appReady:Wu,rendererReady:Bu,engine:()=>J.engine,tos:()=>J.tos,app:()=>J.app,renderer:()=>J.renderer,ticker:()=>J.ticker,stage:()=>J.stage,PIXI:()=>W.PIXI||null,init:zu,hook:Uu,ready:()=>!!J.engine};function St(e){let t=String(e||"").trim();return t?t.startsWith("sprite/")||t.startsWith("sprites/")?t:t.includes("/")?`sprite/${t}`:t:""}function Qe(e,t){let n=String(e||"").trim().replace(/^sprites?\//,"").replace(/^\/+|\/+$/g,""),o=String(t||"").trim();return o.includes("/")||!n?St(o):`sprite/${n}/${o}`}function Ze(e,t,n,o){let r=Qe(e,t);if(n.has(r)||o.has(r))return r;let a=String(t||"").trim();if(n.has(a)||o.has(a))return a;let i=St(a);return n.has(i)||o.has(i)?i:r}function Ku(e,t,n=25e3){let o=[e],r=new Set,a=0;for(;o.length&&a++<n;){let i=o.pop();if(!i||r.has(i))continue;if(r.add(i),t(i))return i;let s=i.children;if(Array.isArray(s))for(let l=s.length-1;l>=0;l--)o.push(s[l])}return null}function qu(e){let t=W.PIXI;if(t?.Texture&&t?.Sprite&&t?.Container&&t?.Rectangle)return{Container:t.Container,Sprite:t.Sprite,Texture:t.Texture,Rectangle:t.Rectangle,AnimatedSprite:t.AnimatedSprite||null};let n=e?.stage,o=Ku(n,r=>r?.texture?.frame&&r?.constructor&&r?.texture?.constructor&&r?.texture?.frame?.constructor);if(!o)throw new Error("No Sprite found yet (constructors).");return{Container:n.constructor,Sprite:o.constructor,Texture:o.texture.constructor,Rectangle:o.texture.frame.constructor,AnimatedSprite:t?.AnimatedSprite||null}}async function jr(e,t=15e3){let{sleep:n}=await Promise.resolve().then(()=>(ke(),Or)),o=performance.now();for(;performance.now()-o<t;)try{return qu(e)}catch{await n(50)}throw new Error("Constructors timeout")}var Oe=(...e)=>{try{console.log("[MGSprite]",...e)}catch{}};function Ju(e){return e&&typeof e=="object"&&e.frames&&e.meta&&typeof e.meta.image=="string"}function Jn(e,t,n,o,r){return new e(t,n,o,r)}function Xu(e,t,n,o,r,a,i){let s;try{s=new e({source:t.source,frame:n,orig:o,trim:r||void 0,rotate:a||0})}catch{s=new e(t.baseTexture||t,n,o,r||void 0,a||0)}if(i)if(s.defaultAnchor?.set)try{s.defaultAnchor.set(i.x,i.y)}catch{}else s.defaultAnchor?(s.defaultAnchor.x=i.x,s.defaultAnchor.y=i.y):s.defaultAnchor={x:i.x,y:i.y};try{s.updateUvs?.()}catch{}return s}function Yu(e,t,n,o){let{Texture:r,Rectangle:a}=o;for(let[i,s]of Object.entries(e.frames)){let l=s.frame,c=!!s.rotated,d=c?2:0,u=c?l.h:l.w,p=c?l.w:l.h,m=Jn(a,l.x,l.y,u,p),h=s.sourceSize||{w:l.w,h:l.h},f=Jn(a,0,0,h.w,h.h),g=null;if(s.trimmed&&s.spriteSourceSize){let b=s.spriteSourceSize;g=Jn(a,b.x,b.y,b.w,b.h)}n.set(i,Xu(r,t,m,f,g,d,s.anchor||null))}}function Qu(e,t,n){if(!(!e.animations||typeof e.animations!="object"))for(let[o,r]of Object.entries(e.animations)){if(!Array.isArray(r))continue;let a=r.map(i=>t.get(i)).filter(Boolean);a.length>=2&&n.set(o,a)}}function Zu(e,t){let n=(o,r)=>{let a=String(o||"").trim(),i=String(r||"").trim();!a||!i||(t.has(a)||t.set(a,new Set),t.get(a).add(i))};for(let o of Object.keys(e.frames||{})){let r=/^sprite\/([^/]+)\/(.+)$/.exec(o);r&&n(r[1],r[2])}}async function $r(e,t){let n=await de.load(e),o=de.getBundle(n,"default");if(!o)throw new Error("No default bundle in manifest");let r=de.listJsonFromBundle(o),a=new Set,i=new Map,s=new Map,l=new Map;async function c(d){if(a.has(d))return;a.add(d);let u=await Ye(ce(e,d));if(!Ju(u))return;let p=u.meta?.related_multi_packs;if(Array.isArray(p))for(let g of p)await c(Un(d,g));let m=Un(d,u.meta.image),h=await Dr(await Ut(ce(e,m))),f=t.Texture.from(h);Yu(u,f,i,t),Qu(u,i,s),Zu(u,l)}for(let d of r)await c(d);return{textures:i,animations:s,categoryIndex:l}}var zr={enabled:!0,maxEntries:1200,maxCost:5e3,srcCanvasMax:450};function Ur(){return{lru:new Map,cost:0,srcCanvas:new Map}}function Xn(e,t){return`${t.sig}::${e}`}function Kr(e){return e?e.isAnim?e.frames?.length||0:e.tex?1:0:0}function ed(e,t,n){e.lru.delete(t),e.lru.set(t,n)}function td(e,t){if(t.enabled)for(;e.lru.size>t.maxEntries||e.cost>t.maxCost;){let n=e.lru.keys().next().value;if(n===void 0)break;let o=e.lru.get(n);e.lru.delete(n),e.cost=Math.max(0,e.cost-Kr(o??null))}}function Yn(e,t){let n=e.lru.get(t);return n?(ed(e,t,n),n):null}function Qn(e,t,n,o){e.lru.set(t,n),e.cost+=Kr(n),td(e,o)}function qr(e){e.lru.clear(),e.cost=0,e.srcCanvas.clear()}function Jr(e,t){return e.srcCanvas.get(t)??null}function Xr(e,t,n,o){if(e.srcCanvas.set(t,n),e.srcCanvas.size>o.srcCanvasMax){let r=e.srcCanvas.keys().next().value;r!==void 0&&e.srcCanvas.delete(r)}}function nd(){return{ready:!1,app:null,renderer:null,ctors:null,baseUrl:null,textures:new Map,animations:new Map,live:new Set,defaultParent:null,overlay:null,categoryIndex:null}}var Jt=null,ne=nd(),od=Ur(),rd={...zr};function re(){return ne}function et(){return od}function kt(){return rd}function Zn(){return ne.ready}async function Yr(){return ne.ready?!0:Jt||(Jt=(async()=>{let e=performance.now();Oe("init start");let t=await zt(oe.appReady,15e3,"PIXI app");Oe("app ready");let n=await zt(oe.rendererReady,15e3,"PIXI renderer");Oe("renderer ready"),ne.app=t,ne.renderer=n||t?.renderer||null,ne.ctors=await jr(t),Oe("constructors resolved"),ne.baseUrl=await be.base(),Oe("base url",ne.baseUrl);let{textures:o,animations:r,categoryIndex:a}=await $r(ne.baseUrl,ne.ctors);return ne.textures=o,ne.animations=r,ne.categoryIndex=a,Oe("atlases loaded","textures",ne.textures.size,"animations",ne.animations.size,"categories",ne.categoryIndex?.size??0),ne.ready=!0,Oe("ready in",Math.round(performance.now()-e),"ms"),!0})(),Jt)}var Ge={Gold:{overlayTall:null,tallIconOverride:null},Rainbow:{overlayTall:null,tallIconOverride:null,angle:130,angleTall:0},Wet:{overlayTall:"sprite/mutation-overlay/WetTallPlant",tallIconOverride:"sprite/mutation/Puddle"},Chilled:{overlayTall:"sprite/mutation-overlay/ChilledTallPlant",tallIconOverride:null},Frozen:{overlayTall:"sprite/mutation-overlay/FrozenTallPlant",tallIconOverride:null},Dawnlit:{overlayTall:null,tallIconOverride:null},Ambershine:{overlayTall:null,tallIconOverride:null},Dawncharged:{overlayTall:null,tallIconOverride:null},Ambercharged:{overlayTall:null,tallIconOverride:null}},Zr=Object.keys(Ge),ad=["Gold","Rainbow","Wet","Chilled","Frozen","Ambershine","Dawnlit","Dawncharged","Ambercharged"],Qr=new Map(ad.map((e,t)=>[e,t]));function Xt(e){return[...new Set(e.filter(Boolean))].sort((n,o)=>(Qr.get(n)??1/0)-(Qr.get(o)??1/0))}var id=["Wet","Chilled","Frozen"];var ea=new Set(["Dawnlit","Ambershine","Dawncharged","Ambercharged"]),ta={Banana:.6,Carrot:.6,Sunflower:.5,Starweaver:.5,FavaBean:.25,BurrosTail:.2},na={Pepper:.5,Banana:.6},oa=256,ra=.5,aa=2;function eo(e){if(!e.length)return{muts:[],overlayMuts:[],selectedMuts:[],sig:""};let t=Xt(e),n=sd(e),o=ld(e);return{muts:n,overlayMuts:o,selectedMuts:t,sig:`${t.join(",")}|${n.join(",")}|${o.join(",")}`}}function sd(e){let t=e.filter((r,a,i)=>Ge[r]&&i.indexOf(r)===a);if(!t.length)return[];if(t.includes("Gold"))return["Gold"];if(t.includes("Rainbow"))return["Rainbow"];let n=["Ambershine","Dawnlit","Dawncharged","Ambercharged"];return t.some(r=>n.includes(r))?Xt(t.filter(r=>!id.includes(r))):Xt(t)}function ld(e){let t=e.filter((n,o,r)=>Ge[n]?.overlayTall&&r.indexOf(n)===o);return Xt(t)}function Yt(e,t){return e.map(n=>({name:n,meta:Ge[n],overlayTall:Ge[n]?.overlayTall??null,isTall:t}))}var cd={Gold:{op:"source-atop",colors:["rgb(235,200,0)"],a:.7},Rainbow:{op:"color",colors:["#FF1744","#FF9100","#FFEA00","#00E676","#2979FF","#D500F9"],ang:130,angTall:0,masked:!0},Wet:{op:"source-atop",colors:["rgb(50,180,200)"],a:.25},Chilled:{op:"source-atop",colors:["rgb(100,160,210)"],a:.45},Frozen:{op:"source-atop",colors:["rgb(100,130,220)"],a:.5},Dawnlit:{op:"source-atop",colors:["rgb(209,70,231)"],a:.5},Ambershine:{op:"source-atop",colors:["rgb(190,100,40)"],a:.5},Dawncharged:{op:"source-atop",colors:["rgb(140,80,200)"],a:.5},Ambercharged:{op:"source-atop",colors:["rgb(170,60,25)"],a:.5}};var Qt=(()=>{try{let t=document.createElement("canvas").getContext("2d");if(!t)return new Set;let n=["color","hue","saturation","luminosity","overlay","screen","lighter","source-atop"],o=new Set;for(let r of n)t.globalCompositeOperation=r,t.globalCompositeOperation===r&&o.add(r);return o}catch{return new Set}})();function ud(e){return Qt.has(e)?e:Qt.has("overlay")?"overlay":Qt.has("screen")?"screen":Qt.has("lighter")?"lighter":"source-atop"}function dd(e,t,n,o,r=!1){let a=(o-90)*Math.PI/180,i=t/2,s=n/2;if(!r){let u=Math.min(t,n)/2;return e.createLinearGradient(i-Math.cos(a)*u,s-Math.sin(a)*u,i+Math.cos(a)*u,s+Math.sin(a)*u)}let l=Math.cos(a),c=Math.sin(a),d=Math.abs(l)*t/2+Math.abs(c)*n/2;return e.createLinearGradient(i-l*d,s-c*d,i+l*d,s+c*d)}function ia(e,t,n,o,r=!1){let a=o.colors?.length?o.colors:["#fff"],i=o.ang!=null?dd(e,t,n,o.ang,r):e.createLinearGradient(0,0,0,n);a.length===1?(i.addColorStop(0,a[0]),i.addColorStop(1,a[0])):a.forEach((s,l)=>i.addColorStop(l/(a.length-1),s)),e.fillStyle=i,e.fillRect(0,0,t,n)}function sa(e,t,n,o){let r=cd[n];if(!r)return;let a={...r};n==="Rainbow"&&o&&a.angTall!=null&&(a.ang=a.angTall);let i=n==="Rainbow"&&o,s=t.width,l=t.height;e.save();let c=a.masked?ud(a.op):"source-in";if(e.globalCompositeOperation=c,a.a!=null&&(e.globalAlpha=a.a),a.masked){let d=document.createElement("canvas");d.width=s,d.height=l;let u=d.getContext("2d");u.imageSmoothingEnabled=!1,ia(u,s,l,a,i),u.globalCompositeOperation="destination-in",u.drawImage(t,0,0),e.drawImage(d,0,0)}else ia(e,s,l,a,i);e.restore()}function la(e){return/tallplant/i.test(e)}function Zt(e){let t=String(e||"").split("/");return t[t.length-1]||""}function ca(e){switch(e){case"Ambershine":return["Ambershine","Amberlit"];case"Dawncharged":return["Dawncharged","Dawnbound"];case"Ambercharged":return["Ambercharged","Amberbound"];default:return[e]}}function pd(e,t){let n=String(e||"").toLowerCase();for(let o of t.keys()){let r=/sprite\/mutation-overlay\/([A-Za-z0-9]+)TallPlant/i.exec(String(o));if(!r||!r[1])continue;if(r[1].toLowerCase()===n){let i=t.get(o);if(i)return{tex:i,key:o}}}return null}function ua(e,t,n,o){if(!t)return null;let r=Zt(e),a=ca(t);for(let i of a){let s=[`sprite/mutation/${i}${r}`,`sprite/mutation/${i}-${r}`,`sprite/mutation/${i}_${r}`,`sprite/mutation/${i}/${r}`,`sprite/mutation/${i}`];for(let l of s){let c=n.get(l);if(c)return{tex:c,key:l}}if(o){let l=`sprite/mutation-overlay/${i}TallPlant`,c=n.get(l);if(c)return{tex:c,key:l};let d=`sprite/mutation-overlay/${i}`,u=n.get(d);if(u)return{tex:u,key:d};let p=pd(t,n);if(p)return p}}return null}function da(e,t,n,o){if(!t)return null;let r=Ge[t];if(n&&r?.tallIconOverride){let s=o.get(r.tallIconOverride);if(s)return s}let a=Zt(e),i=ca(t);for(let s of i){let l=[`sprite/mutation/${s}Icon`,`sprite/mutation/${s}`,`sprite/mutation/${s}${a}`,`sprite/mutation/${s}-${a}`,`sprite/mutation/${s}_${a}`,`sprite/mutation/${s}/${a}`];for(let c of l){let d=o.get(c);if(d)return d}if(n){let c=`sprite/mutation-overlay/${s}TallPlantIcon`,d=o.get(c);if(d)return d;let u=`sprite/mutation-overlay/${s}TallPlant`,p=o.get(u);if(p)return p}}return null}function pa(e,t,n){let o=e?.orig?.width??e?.frame?.width??e?.width??1,r=e?.orig?.height??e?.frame?.height??e?.height??1,a=e?.defaultAnchor?.x??0,i=e?.defaultAnchor?.y??0,s=na[t]??a,l=r>o*1.5,c=ta[t]??(l?i:.4),d={x:(s-a)*o,y:(c-i)*r},u=Math.min(o,r),p=Math.min(1.5,u/oa),m=ra*p;return n&&(m*=aa),{width:o,height:r,anchorX:a,anchorY:i,offset:d,iconScale:m}}function to(e,t,n,o,r){let a=Jr(o,e);if(a)return a;let i=null;try{if(t?.extract?.canvas){let s=new n.Sprite(e);i=t.extract.canvas(s),s.destroy?.({children:!0,texture:!1,baseTexture:!1})}}catch{}if(!i){let s=e?.frame||e?._frame,l=e?.orig||e?._orig,c=e?.trim||e?._trim,d=e?.rotate||e?._rotate||0,u=e?.baseTexture?.resource?.source||e?.baseTexture?.resource||e?.source?.resource?.source||e?.source?.resource||e?._source?.resource?.source||null;if(!s||!u)throw new Error("textureToCanvas fail");i=document.createElement("canvas");let p=Math.max(1,(l?.width??s.width)|0),m=Math.max(1,(l?.height??s.height)|0),h=c?.x??0,f=c?.y??0;i.width=p,i.height=m;let g=i.getContext("2d");g.imageSmoothingEnabled=!1,d===!0||d===2||d===8?(g.save(),g.translate(h+s.height/2,f+s.width/2),g.rotate(-Math.PI/2),g.drawImage(u,s.x,s.y,s.width,s.height,-s.width/2,-s.height/2,s.width,s.height),g.restore()):g.drawImage(u,s.x,s.y,s.width,s.height,h,f,s.width,s.height)}return Xr(o,e,i,r),i}function md(e,t,n,o,r,a,i,s){let{w:l,h:c,aX:d,aY:u,basePos:p}=t,m=[];for(let h of n){let f=new o.Sprite(e);f.anchor?.set?.(d,u),f.position.set(p.x,p.y),f.zIndex=1;let g=document.createElement("canvas");g.width=l,g.height=c;let b=g.getContext("2d");b.imageSmoothingEnabled=!1,b.save(),b.translate(l*d,c*u),b.drawImage(to(e,r,o,a,i),-l*d,-c*u),b.restore(),sa(b,g,h.name,h.isTall);let S=o.Texture.from(g);s.push(S),f.texture=S,m.push(f)}return m}function gd(e,t,n,o,r,a,i,s,l,c){let{aX:d,basePos:u}=t,p=[];for(let m of n){let h=m.overlayTall&&o.get(m.overlayTall)&&{tex:o.get(m.overlayTall),key:m.overlayTall}||ua(e,m.name,o,!0);if(!h?.tex)continue;let f=to(h.tex,a,r,i,s);if(!f)continue;let g=f.width,b={x:0,y:0},S={x:u.x-d*g,y:0},T=document.createElement("canvas");T.width=g,T.height=f.height;let x=T.getContext("2d");if(!x)continue;x.imageSmoothingEnabled=!1,x.drawImage(f,0,0),x.globalCompositeOperation="destination-in",x.drawImage(l,-S.x,-S.y);let v=r.Texture.from(T);c.push(v);let k=new r.Sprite(v);k.anchor?.set?.(b.x,b.y),k.position.set(S.x,S.y),k.scale.set(1),k.alpha=1,k.zIndex=3,p.push(k)}return p}function fd(e,t,n,o,r,a){let{basePos:i}=t,s=[];for(let l of n){if(l.name==="Gold"||l.name==="Rainbow")continue;let c=da(e,l.name,l.isTall,o);if(!c)continue;let d=new r.Sprite(c),u=c?.defaultAnchor?.x??.5,p=c?.defaultAnchor?.y??.5;d.anchor?.set?.(u,p),d.position.set(i.x+a.offset.x,i.y+a.offset.y),d.scale.set(a.iconScale),l.isTall&&(d.zIndex=-1),ea.has(l.name)&&(d.zIndex=10),d.zIndex||(d.zIndex=2),s.push(d)}return s}function no(e,t,n,o){try{if(!e||!o.renderer||!o.ctors?.Container||!o.ctors?.Sprite||!o.ctors?.Texture)return null;let{Container:r,Sprite:a,Texture:i}=o.ctors,s=e?.orig?.width??e?.frame?.width??e?.width??1,l=e?.orig?.height??e?.frame?.height??e?.height??1,c=e?.defaultAnchor?.x??.5,d=e?.defaultAnchor?.y??.5,u={x:s*c,y:l*d},p=to(e,o.renderer,o.ctors,o.cacheState,o.cacheConfig),m=new r;m.sortableChildren=!0;let h=new a(e);h.anchor?.set?.(c,d),h.position.set(u.x,u.y),h.zIndex=0,m.addChild(h);let f=la(t),g=Yt(n.muts,f),b=Yt(n.overlayMuts,f),S=Yt(n.selectedMuts,f),T=[],x={w:s,h:l,aX:c,aY:d,basePos:u},v=Zt(t),k=pa(e,v,f);md(e,x,g,o.ctors,o.renderer,o.cacheState,o.cacheConfig,T).forEach(C=>m.addChild(C)),f&&gd(t,x,b,o.textures,o.ctors,o.renderer,o.cacheState,o.cacheConfig,p,T).forEach(z=>m.addChild(z)),fd(t,x,S,o.textures,o.ctors,k).forEach(C=>m.addChild(C));let E=null;if(typeof o.renderer.generateTexture=="function"?E=o.renderer.generateTexture(m,{resolution:1}):o.renderer.textureGenerator?.generateTexture&&(E=o.renderer.textureGenerator.generateTexture({target:m,resolution:1})),!E)throw new Error("no render texture");let L=E instanceof i?E:i.from(o.renderer.extract.canvas(E));E&&E!==L&&E.destroy?.(!0),m.destroy({children:!0,texture:!1,baseTexture:!1});try{L.__mg_gen=!0,L.label=`${t}|${n.sig}`}catch{}return L}catch{return null}}function ma(e,t,n,o){if(!e||e.length<2)return null;let r=[];for(let a of e){let i=no(a,t,n,o);i&&r.push(i)}return r.length>=2?r:null}function bd(e){if(e.overlay)return e.overlay;let t=new e.ctors.Container;t.sortableChildren=!0,t.zIndex=99999999;try{e.app.stage.sortableChildren=!0}catch{}return e.app.stage.addChild(t),e.overlay=t,t}function hd(e){let t=e.defaultParent;if(!t)return null;try{return typeof t=="function"?t():t}catch{return null}}function ga(e,t,n,o,r,a){if(!n.length)return t;let i=eo(n);if(!i.sig)return t;let s=Xn(e,i),l=Yn(r,s);if(l?.tex)return l.tex;let c=no(t,e,i,{renderer:o.renderer,ctors:o.ctors,textures:o.textures,cacheState:r,cacheConfig:a});return c?(Qn(r,s,{isAnim:!1,tex:c},a),c):t}function fa(e,t,n,o,r,a){if(!n.length)return t;let i=eo(n);if(!i.sig)return t;let s=Xn(e,i),l=Yn(r,s);if(l?.isAnim&&l.frames?.length)return l.frames;let c=ma(t,e,i,{renderer:o.renderer,ctors:o.ctors,textures:o.textures,cacheState:r,cacheConfig:a});return c?(Qn(r,s,{isAnim:!0,frames:c},a),c):t}function oo(e,t,n,o,r,a={}){if(!e.ready)throw new Error("MGSprite not ready yet");let i=Ze(o,r,e.textures,e.animations),s=a.mutations||[],l=a.parent||hd(e)||bd(e),c=e.renderer?.width||e.renderer?.view?.width||innerWidth,d=e.renderer?.height||e.renderer?.view?.height||innerHeight,u=a.center?c/2:a.x??c/2,p=a.center?d/2:a.y??d/2,m,h=e.animations.get(i);if(h&&h.length>=2){let b=fa(i,h,s,e,t,n),S=e.ctors.AnimatedSprite;if(S)m=new S(b),m.animationSpeed=a.fps?a.fps/60:a.speed??.15,m.loop=a.loop??!0,m.play();else{let T=new e.ctors.Sprite(b[0]),v=1e3/Math.max(1,a.fps||8),k=0,M=0,P=E=>{let L=e.app.ticker?.deltaMS??E*16.666666666666668;if(k+=L,k<v)return;let C=k/v|0;k%=v,M=(M+C)%b.length,T.texture=b[M]};T.__mgTick=P,e.app.ticker?.add?.(P),m=T}}else{let b=e.textures.get(i);if(!b)throw new Error(`Unknown sprite/anim key: ${i}`);let S=ga(i,b,s,e,t,n);m=new e.ctors.Sprite(S)}let f=a.anchorX??m.texture?.defaultAnchor?.x??.5,g=a.anchorY??m.texture?.defaultAnchor?.y??.5;return m.anchor?.set?.(f,g),m.position.set(u,p),m.scale.set(a.scale??1),m.alpha=a.alpha??1,m.rotation=a.rotation??0,m.zIndex=a.zIndex??999999,l.addChild(m),e.live.add(m),m.__mgDestroy=()=>{try{m.__mgTick&&e.app.ticker?.remove?.(m.__mgTick)}catch{}try{m.destroy?.({children:!0,texture:!1,baseTexture:!1})}catch{try{m.destroy?.()}catch{}}e.live.delete(m)},m}function yd(e,t){let n=e.renderer;if(n?.extract?.canvas)return n.extract.canvas(t);if(n?.plugins?.extract?.canvas)return n.plugins.extract.canvas(t);throw new Error("No extract.canvas available on renderer")}function ro(e,t,n,o,r,a={}){if(!e.ready)throw new Error("MGSprite not ready yet");let i=Ze(o,r,e.textures,e.animations),s=a.mutations||[],l=e.animations.get(i),c=Math.max(0,(a.frameIndex??0)|0),d;if(l?.length){let S=fa(i,l,s,e,t,n);d=S[c%S.length]}else{let S=e.textures.get(i);if(!S)throw new Error(`Unknown sprite/anim key: ${i}`);d=ga(i,S,s,e,t,n)}let u=new e.ctors.Sprite(d),p=a.anchorX??u.texture?.defaultAnchor?.x??.5,m=a.anchorY??u.texture?.defaultAnchor?.y??.5;u.anchor?.set?.(p,m),u.scale.set(a.scale??1);let h=a.pad??2,f=new e.ctors.Container;f.addChild(u);try{f.updateTransform?.()}catch{}let g=u.getBounds?.(!0)||{x:0,y:0,width:u.width,height:u.height};u.position.set(-g.x+h,-g.y+h);let b=yd(e,f);try{f.destroy?.({children:!0})}catch{}return b}function ba(e){for(let t of Array.from(e.live))t.__mgDestroy?.()}function ha(e,t){return e.defaultParent=t,!0}function ya(e,t){return e.defaultParent=t,!0}function tt(){if(!Zn())throw new Error("MGSprite not ready yet")}function xd(e,t,n){return typeof t=="string"?oo(re(),et(),kt(),e,t,n||{}):oo(re(),et(),kt(),null,e,t||{})}function vd(e,t,n){return typeof t=="string"?ro(re(),et(),kt(),e,t,n||{}):ro(re(),et(),kt(),null,e,t||{})}function wd(){ba(re())}function Sd(e){return ha(re(),e)}function kd(e){return ya(re(),e)}function Td(e,t){let n=re(),o=typeof t=="string"?Ze(e,t,n.textures,n.animations):Ze(null,e,n.textures,n.animations);return n.textures.has(o)||n.animations.has(o)}function Ad(){tt();let e=re().categoryIndex;return e?Array.from(e.keys()).sort((t,n)=>t.localeCompare(n)):[]}function Cd(e){tt();let t=String(e||"").trim();if(!t)return[];let n=re().categoryIndex;return n?Array.from(n.get(t)?.values()||[]).sort((o,r)=>o.localeCompare(r)):[]}function Md(e,t){tt();let n=String(e||"").trim(),o=String(t||"").trim();if(!n||!o)return!1;let r=re().categoryIndex;if(!r)return!1;let a=n.toLowerCase(),i=o.toLowerCase();for(let[s,l]of r.entries())if(s.toLowerCase()===a){for(let c of l.values())if(c.toLowerCase()===i)return!0}return!1}function Pd(e){tt();let t=re().categoryIndex;if(!t)return[];let n=String(e||"").trim().toLowerCase(),o=[];for(let[r,a]of t.entries())for(let i of a.values()){let s=Qe(r,i);(!n||s.toLowerCase().startsWith(n))&&o.push(s)}return o.sort((r,a)=>r.localeCompare(a))}function Ed(e){tt();let t=String(e||"").trim();if(!t)return null;let n=St(t),o=/^sprite\/([^/]+)\/(.+)$/.exec(n);if(!o)return null;let r=o[1],a=o[2],i=re().categoryIndex,s=r.toLowerCase(),l=a.toLowerCase(),c=r,d=a;if(i){let u=Array.from(i.keys()).find(h=>h.toLowerCase()===s);if(!u)return null;c=u;let p=i.get(u);if(!p)return null;let m=Array.from(p.values()).find(h=>h.toLowerCase()===l);if(!m)return null;d=m}return{category:c,id:d,key:Qe(c,d)}}function Id(e,t){tt();let n=String(e||"").trim(),o=String(t||"").trim();if(!n||!o)throw new Error("getIdPath(category, id) requires both category and id");let r=re().categoryIndex;if(!r)throw new Error("Sprite categories not indexed");let a=n.toLowerCase(),i=o.toLowerCase(),s=Array.from(r.keys()).find(d=>d.toLowerCase()===a)||n,l=r.get(s);if(!l)throw new Error(`Unknown sprite category: ${n}`);let c=Array.from(l.values()).find(d=>d.toLowerCase()===i)||o;if(!l.has(c))throw new Error(`Unknown sprite id: ${n}/${o}`);return Qe(s,c)}function Ld(){qr(et())}function Rd(){return[...Zr]}var Te={init:Yr,ready:Zn,show:xd,toCanvas:vd,clear:wd,attach:Sd,attachProvider:kd,has:Td,key:(e,t)=>Qe(e,t),getCategories:Ad,getCategoryId:Cd,hasId:Md,listIds:Pd,getIdInfo:Ed,getIdPath:Id,clearMutationCache:Ld,getMutationNames:Rd};var io=W,Ae=io.Object??Object,so=Ae.keys,en=Ae.values,tn=Ae.entries,We={items:["WateringCan","PlanterPot","Shovel"],decor:["SmallRock","MediumRock","LargeRock","WoodBench","StoneBench","MarbleBench"],mutations:["Gold","Rainbow","Wet","Chilled","Frozen"],eggs:["CommonEgg","UncommonEgg","RareEgg"],pets:["Worm","Snail","Bee","Chicken","Bunny"],abilities:["ProduceScaleBoost","DoubleHarvest","SeedFinderI","CoinFinderI"],plants:["Carrot","Strawberry","Aloe","Blueberry","Apple"]},Od=["Rain","Frost","Dawn","AmberMoon"],xa=/main-[^/]+\.js(\?|$)/,Hd=3,_d=200,Nd=50,va=new WeakSet,U={isReady:!1,isHookInstalled:!1,data:{items:null,decor:null,mutations:null,eggs:null,pets:null,abilities:null,plants:null,weather:null},spritesResolved:!1,spritesResolving:null,weatherPollingTimer:null,weatherPollAttempts:0},Be=(e,t)=>t.every(n=>e.includes(n));function Ve(e,t){U.data[e]==null&&(U.data[e]=t,Dd()&&ka())}function Dd(){return Object.values(U.data).every(e=>e!=null)}function wa(e,t){if(!e||typeof e!="object"||va.has(e))return;va.add(e);let n;try{n=so(e)}catch{return}if(!n||n.length===0)return;let o=e,r;if(!U.data.items&&Be(n,We.items)&&(r=o.WateringCan,r&&typeof r=="object"&&"coinPrice"in r&&"creditPrice"in r&&Ve("items",o)),!U.data.decor&&Be(n,We.decor)&&(r=o.SmallRock,r&&typeof r=="object"&&"coinPrice"in r&&"creditPrice"in r&&Ve("decor",o)),!U.data.mutations&&Be(n,We.mutations)&&(r=o.Gold,r&&typeof r=="object"&&"baseChance"in r&&"coinMultiplier"in r&&Ve("mutations",o)),!U.data.eggs&&Be(n,We.eggs)&&(r=o.CommonEgg,r&&typeof r=="object"&&"faunaSpawnWeights"in r&&"secondsToHatch"in r&&Ve("eggs",o)),!U.data.pets&&Be(n,We.pets)&&(r=o.Worm,r&&typeof r=="object"&&"coinsToFullyReplenishHunger"in r&&"diet"in r&&Array.isArray(r.diet)&&Ve("pets",o)),!U.data.abilities&&Be(n,We.abilities)&&(r=o.ProduceScaleBoost,r&&typeof r=="object"&&"trigger"in r&&"baseParameters"in r&&Ve("abilities",o)),!U.data.plants&&Be(n,We.plants)&&(r=o.Carrot,r&&typeof r=="object"&&"seed"in r&&"plant"in r&&"crop"in r&&Ve("plants",o)),!(t>=Hd))for(let a of n){let i;try{i=o[a]}catch{continue}i&&typeof i=="object"&&wa(i,t+1)}}function ao(e){try{wa(e,0)}catch{}}function Sa(){if(!U.isHookInstalled){U.isHookInstalled=!0;try{Ae.keys=function(t){return ao(t),so.apply(this,arguments)},en&&(Ae.values=function(t){return ao(t),en.apply(this,arguments)}),tn&&(Ae.entries=function(t){return ao(t),tn.apply(this,arguments)})}catch{}}}function ka(){if(U.isHookInstalled){try{Ae.keys=so,en&&(Ae.values=en),tn&&(Ae.entries=tn)}catch{}U.isHookInstalled=!1}}function Gd(){try{for(let e of io.document?.scripts||[]){let t=e?.src?String(e.src):"";if(xa.test(t))return t}}catch{}try{for(let e of io.performance?.getEntriesByType?.("resource")||[]){let t=e?.name?String(e.name):"";if(xa.test(t))return t}}catch{}return null}function Wd(e,t){let n=Math.max(e.lastIndexOf("const ",t),e.lastIndexOf("let ",t),e.lastIndexOf("var ",t));if(n<0)return null;let o=e.indexOf("=",n);if(o<0||o>t)return null;let r=e.indexOf("{",o);if(r<0||r>t)return null;let a=0,i="",s=!1;for(let l=r;l<e.length;l++){let c=e[l];if(i){if(s){s=!1;continue}if(c==="\\"){s=!0;continue}c===i&&(i="");continue}if(c==='"'||c==="'"){i=c;continue}if(c==="{")a++;else if(c==="}"&&--a===0)return e.slice(r,l+1)}return null}function Bd(e){let t={},n=!1;for(let o of Od){let r=e?.[o];if(!r||typeof r!="object")continue;let a=r.iconSpriteKey||null,{iconSpriteKey:i,...s}=r;t[o]={weatherId:o,spriteId:a,...s},n=!0}return t.Sunny||(t.Sunny={weatherId:"Sunny",name:"Sunny",spriteId:"sprite/ui/SunnyIcon",type:"primary"}),!n||t.Rain&&t.Rain.mutator?.mutation!=="Wet"?null:t}async function Vd(){if(U.data.weather)return!0;let e=Gd();if(!e)return!1;let t="";try{let s=await fetch(e,{credentials:"include"});if(!s.ok)return!1;t=await s.text()}catch{return!1}let n=t.indexOf("fixedTimeSlots:[0,48,96,144,192,240]");if(n<0&&(n=t.indexOf('name:"Amber Moon"')),n<0)return!1;let o=Wd(t,n);if(!o)return!1;let r=o.replace(/\b[A-Za-z_$][\w$]*\.(Rain|Frost|Dawn|AmberMoon)\b/g,'"$1"'),a;try{a=Function('"use strict";return('+r+")")()}catch{return!1}let i=Bd(a);return i?(U.data.weather=i,!0):!1}function Fd(){if(U.weatherPollingTimer)return;U.weatherPollAttempts=0;let e=setInterval(async()=>{(await Vd()||++U.weatherPollAttempts>_d)&&(clearInterval(e),U.weatherPollingTimer=null)},Nd);U.weatherPollingTimer=e}function jd(e){return String(e||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^A-Za-z0-9]/g,"").trim()}function $d(e,t=[]){let n=new Set,o=r=>{let a=String(r||"").trim();a&&n.add(a)};o(e);for(let r of t)o(r);for(let r of Array.from(n.values()))r.endsWith("s")?o(r.slice(0,-1)):o(`${r}s`),r.endsWith("es")&&o(r.slice(0,-2));return Array.from(n.values()).filter(Boolean)}function Ta(e,t,n,o=[],r=[]){let a=$d(e,o);if(!a.length)return null;let i=[t,...r].filter(d=>typeof d=="string"),s=d=>{let u=String(d||"").trim();if(!u)return null;for(let p of a)try{if(Te.has(p,u))return Te.getIdPath(p,u)}catch{}return null};for(let d of i){let u=s(d);if(u)return u}let l=jd(n||""),c=s(l||n||"");if(c)return c;try{for(let d of a){let u=Te.listIds(`sprite/${d}/`),p=i.map(h=>String(h||"").toLowerCase()),m=String(n||l||"").toLowerCase();for(let h of u){let g=(h.split("/").pop()||"").toLowerCase();if(p.some(b=>b&&b===g)||g===m)return h}for(let h of u){let g=(h.split("/").pop()||"").toLowerCase();if(p.some(b=>b&&g.includes(b))||m&&g.includes(m))return h}}}catch{}return null}function ge(e,t,n,o,r=[],a=[]){if(!e||typeof e!="object")return;let i=e.tileRef;if(!i||typeof i!="object")return;let s=String(i.spritesheet||t||"").trim(),l=Ta(s,n,o,r,a);if(l)try{e.spriteId=l}catch{}let c=e.rotationVariants;if(c&&typeof c=="object")for(let d of Object.values(c))ge(d,s,n,o);if(e.immatureTileRef){let d={tileRef:e.immatureTileRef};ge(d,s,n,o),d.spriteId&&(e.immatureSpriteId=d.spriteId)}if(e.topmostLayerTileRef){let d={tileRef:e.topmostLayerTileRef};ge(d,s,n,o),d.spriteId&&(e.topmostLayerSpriteId=d.spriteId)}e.activeState&&typeof e.activeState=="object"&&ge(e.activeState,s,n,e.activeState?.name||o)}function zd(e,t,n,o=[]){if(!Array.isArray(t)||t.length===0)return null;let r=t[0],a=t.slice(1);return Ta(e,r,n??null,o,a)}function Ud(e){for(let[t,n]of Object.entries(e.items||{}))ge(n,"items",t,n?.name,["item"]);for(let[t,n]of Object.entries(e.decor||{}))ge(n,"decor",t,n?.name);for(let[t,n]of Object.entries(e.mutations||{})){ge(n,"mutations",t,n?.name,["mutation"]);let o=zd("mutation-overlay",[`${t}TallPlant`,`${t}TallPlantIcon`,t],n?.name,["mutation-overlay"]);if(o)try{n.overlaySpriteId=o}catch{}}for(let[t,n]of Object.entries(e.eggs||{}))ge(n,"pets",t,n?.name,["pet"]);for(let[t,n]of Object.entries(e.pets||{}))ge(n,"pets",t,n?.name,["pet"]);for(let[t,n]of Object.entries(e.plants||{})){let o=n;o.seed&&ge(o.seed,o.seed?.tileRef?.spritesheet||"seeds",`${t}Seed`,o.seed?.name||`${t} Seed`,["seed","plant","plants"],[t]),o.plant&&ge(o.plant,o.plant?.tileRef?.spritesheet||"plants",`${t}Plant`,o.plant?.name||`${t} Plant`,["plant","plants","tallplants"],[t]),o.crop&&ge(o.crop,o.crop?.tileRef?.spritesheet||"plants",t,o.crop?.name||t,["plant","plants"],[`${t}Crop`])}}async function Aa(){if(!U.spritesResolved)return U.spritesResolving||(U.spritesResolving=(async()=>{try{await Ca(2e4,50),await Te.init(),Ud(U.data),U.spritesResolved=!0}catch(e){try{console.warn("[MGData] sprite resolution failed",e)}catch{}}finally{U.spritesResolving=null}})()),U.spritesResolving}async function Kd(){return U.isReady||(Sa(),Fd(),Aa(),U.isReady=!0),!0}function qd(){return U.isReady}function Jd(){return ka(),U.weatherPollingTimer&&(clearInterval(U.weatherPollingTimer),U.weatherPollingTimer=null),U.isReady=!1,!0}function Xd(){return!U.spritesResolved&&!U.spritesResolving&&Aa(),{...U.data}}function Yd(e){return U.data[e]??null}function Qd(e){return U.data[e]!=null}async function Ca(e=1e4,t=50){let n=Date.now();for(;Date.now()-n<e;){if(Object.values(U.data).some(o=>o!=null))return{...U.data};await Se(t)}throw new Error("MGData.waitForAnyData: timeout")}async function Zd(e,t=1e4,n=50){let o=Date.now();for(;Date.now()-o<t;){let r=U.data[e];if(r!=null)return r;await Se(n)}throw new Error(`MGData.waitFor: timeout waiting for "${e}"`)}var nn={init:Kd,isReady:qd,stop:Jd,getAll:Xd,get:Yd,has:Qd,waitForAnyData:Ca,waitFor:Zd};Sa();ke();var on=null,he={ready:!1,xform:null,xformAt:0};function ot(e){try{if(typeof structuredClone=="function")return structuredClone(e)}catch{}try{return JSON.parse(JSON.stringify(e))}catch{}return e}function Tt(){return oe.tos()}function uo(){return oe.engine()}function ep(){let e=Tt()?.map?.cols;return Number.isFinite(e)&&e>0?e:null}function po(e,t){let n=ep();return n?t*n+e|0:null}function Fe(e,t,n=!0){let o=Tt(),r=po(e,t);if(!o||r==null)return{gidx:null,tv:null};let a=o.tileViews?.get?.(r)||null;if(!a&&n&&typeof o.getOrCreateTileView=="function")try{a=o.getOrCreateTileView(r)}catch{}return{gidx:r,tv:a||null}}function nt(e,t,n,o={}){let r=o.ensureView!==!1,a=o.forceUpdate!==!1,i=uo(),{gidx:s,tv:l}=Fe(Number(e),Number(t),r);if(s==null)throw new Error("MGTile: cols unavailable (engine/TOS not ready)");if(!l)throw new Error("MGTile: TileView unavailable (not instantiated)");let c=l.tileObject;if(typeof l.onDataChanged!="function")throw new Error("MGTile: tileView.onDataChanged not found (different API?)");if(l.onDataChanged(n),a&&i?.reusableContext&&typeof l.update=="function")try{l.update(i.reusableContext)}catch{}return{ok:!0,tx:Number(e),ty:Number(t),gidx:s,before:c,after:l.tileObject}}function mo(e,t){if(!e)throw new Error("MGTile: no tileObject on this tile");if(e.objectType!==t)throw new Error(`MGTile: expected objectType "${t}", got "${e.objectType}"`)}function lo(e,t){if("startTime"in t&&(e.startTime=Number(t.startTime)),"endTime"in t&&(e.endTime=Number(t.endTime)),"targetScale"in t&&(e.targetScale=Number(t.targetScale)),"mutations"in t){if(!Array.isArray(t.mutations))throw new Error("MGTile: mutations must be an array of strings");e.mutations=t.mutations.slice()}}function Ce(){if(!he.ready)throw new Error("MGTile: not ready. Call MGTile.init() first.")}function co(e){if(!e)return null;let t=r=>r&&(typeof r.getGlobalPosition=="function"||typeof r.toGlobal=="function"),n=["container","root","view","tile","ground","base","floor","bg","background","baseSprite","tileSprite","displayObject","gfx","graphics","sprite"];for(let r of n)if(t(e[r]))return e[r];if(t(e))return e;let o=[e.container,e.root,e.view,e.displayObject,e.tileSprite,e.gfx,e.graphics,e.sprite];for(let r of o)if(t(r))return r;try{for(let r of Object.keys(e))if(t(e[r]))return e[r]}catch{}return null}function rn(e){let t=le(()=>e?.getGlobalPosition?.());if(t&&Number.isFinite(t.x)&&Number.isFinite(t.y))return{x:t.x,y:t.y};let n=le(()=>e?.toGlobal?.({x:0,y:0}));return n&&Number.isFinite(n.x)&&Number.isFinite(n.y)?{x:n.x,y:n.y}:null}function tp(e){try{if(!e?.getBounds)return"center";let t=e.getBounds(),n=rn(e);if(!n||!t||!Number.isFinite(t.width)||!Number.isFinite(t.height))return"center";let o=t.x+t.width/2,r=t.y+t.height/2;return Math.hypot(n.x-o,n.y-r)<Math.hypot(n.x-t.x,n.y-t.y)?"center":"topleft"}catch{return"center"}}function np(){let e=Tt(),t=e?.map?.cols,n=e?.map?.rows;if(!e||!Number.isFinite(t)||t<=1)return null;let o=Number.isFinite(n)&&n>1?n:null,r=[[0,0],[1,1],[Math.min(2,t-2),0],[0,1]];o&&o>2&&r.push([Math.floor(t/2),Math.floor(o/2)]);for(let[a,i]of r){if(a<0||i<0||a>=t||o&&i>=o)continue;let s=Fe(a,i,!0).tv,l=a+1<t?Fe(a+1,i,!0).tv:null,c=Fe(a,i+1,!0).tv,d=co(s),u=co(l),p=co(c);if(!d||!u||!p)continue;let m=rn(d),h=rn(u),f=rn(p);if(!m||!h||!f)continue;let g={x:h.x-m.x,y:h.y-m.y},b={x:f.x-m.x,y:f.y-m.y},S=g.x*b.y-g.y*b.x;if(!Number.isFinite(S)||Math.abs(S)<1e-6)continue;let T=1/S,x={a:b.y*T,b:-b.x*T,c:-g.y*T,d:g.x*T},v={x:m.x-a*g.x-i*b.x,y:m.y-a*g.y-i*b.y},k=tp(d),M=k==="center"?v:{x:v.x+.5*(g.x+b.x),y:v.y+.5*(g.y+b.y)};return{ok:!0,cols:t,rows:o,vx:g,vy:b,inv:x,anchorMode:k,originCenter:M}}return null}async function op(e=15e3){return he.ready?!0:on||(on=(async()=>{if(await oe.init(e),!Tt())throw new Error("MGTile: engine captured but tileObject system not found");return he.ready=!0,!0})(),on)}function rp(){return oe.hook()}function an(e,t,n={}){Ce();let o=n.ensureView!==!1,r=n.clone!==!1,{gidx:a,tv:i}=Fe(Number(e),Number(t),o);if(a==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!i)return{tx:Number(e),ty:Number(t),gidx:a,tileView:null,tileObject:void 0};let s=i.tileObject;return{tx:Number(e),ty:Number(t),gidx:a,tileView:i,tileObject:r?ot(s):s}}function ap(e,t,n={}){return Ce(),nt(e,t,null,n)}function ip(e,t,n,o={}){Ce();let a=an(e,t,{...o,clone:!1}).tileView?.tileObject;mo(a,"plant");let i=ot(a);if(Array.isArray(i.slots)||(i.slots=[]),"plantedAt"in n&&(i.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(i.maturedAt=Number(n.maturedAt)),"species"in n&&(i.species=String(n.species)),"slotIdx"in n&&"slotPatch"in n){let s=Number(n.slotIdx)|0;if(!i.slots[s])throw new Error(`MGTile: plant slot ${s} doesn't exist`);return lo(i.slots[s],n.slotPatch),nt(e,t,i,o)}if("slots"in n){let s=n.slots;if(Array.isArray(s)){for(let l=0;l<s.length;l++)if(s[l]!=null){if(!i.slots[l])throw new Error(`MGTile: plant slot ${l} doesn't exist`);lo(i.slots[l],s[l])}}else if(s&&typeof s=="object")for(let l of Object.keys(s)){let c=Number(l)|0;if(Number.isFinite(c)){if(!i.slots[c])throw new Error(`MGTile: plant slot ${c} doesn't exist`);lo(i.slots[c],s[c])}}else throw new Error("MGTile: patch.slots must be array or object map");return nt(e,t,i,o)}return nt(e,t,i,o)}function sp(e,t,n,o={}){Ce();let a=an(e,t,{...o,clone:!1}).tileView?.tileObject;mo(a,"decor");let i=ot(a);return"rotation"in n&&(i.rotation=Number(n.rotation)),nt(e,t,i,o)}function lp(e,t,n,o={}){Ce();let a=an(e,t,{...o,clone:!1}).tileView?.tileObject;mo(a,"egg");let i=ot(a);return"plantedAt"in n&&(i.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(i.maturedAt=Number(n.maturedAt)),nt(e,t,i,o)}function cp(e,t,n,o={}){Ce();let r=o.ensureView!==!1,a=o.forceUpdate!==!1,i=uo(),{gidx:s,tv:l}=Fe(Number(e),Number(t),r);if(s==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!l)throw new Error("MGTile: TileView unavailable");let c=l.tileObject,d=typeof n=="function"?n(ot(c)):n;if(l.onDataChanged(d),a&&i?.reusableContext&&typeof l.update=="function")try{l.update(i.reusableContext)}catch{}return{ok:!0,tx:Number(e),ty:Number(t),gidx:s,before:c,after:l.tileObject}}function up(e,t,n={}){Ce();let o=n.ensureView!==!1,{gidx:r,tv:a}=Fe(Number(e),Number(t),o);if(r==null)throw new Error("MGTile: cols unavailable");if(!a)return{ok:!0,tx:Number(e),ty:Number(t),gidx:r,tv:null,tileObject:void 0};let i=n.clone!==!1,s=a.tileObject;return{ok:!0,tx:Number(e),ty:Number(t),gidx:r,objectType:s?.objectType??null,tileObject:i?ot(s):s,tvKeys:Object.keys(a||{}).sort(),tileView:a}}function Ma(){return Ce(),he.xform=np(),he.xformAt=Date.now(),{ok:!!he.xform?.ok,xform:he.xform}}function dp(e,t={}){if(Ce(),!e||!Number.isFinite(e.x)||!Number.isFinite(e.y))return null;let n=Number.isFinite(t.maxAgeMs)?Number(t.maxAgeMs):1500;(!he.xform?.ok||t.forceRebuild||Date.now()-he.xformAt>n)&&Ma();let o=he.xform;if(!o?.ok)return null;let r=e.x-o.originCenter.x,a=e.y-o.originCenter.y,i=o.inv.a*r+o.inv.b*a,s=o.inv.c*r+o.inv.d*a,l=Math.floor(i),c=Math.floor(s),d=[[l,c],[l+1,c],[l,c+1],[l+1,c+1]],u=null,p=1/0;for(let[m,h]of d){if(m<0||h<0||m>=o.cols||Number.isFinite(o.rows)&&o.rows!==null&&h>=o.rows)continue;let f=o.originCenter.x+m*o.vx.x+h*o.vy.x,g=o.originCenter.y+m*o.vx.y+h*o.vy.y,b=(e.x-f)**2+(e.y-g)**2;b<p&&(p=b,u={tx:m,ty:h,fx:i,fy:s,x:e.x,y:e.y,gidx:null})}return u?(u.gidx=po(u.tx,u.ty),u):null}function pp(){return["MGTile.init()","MGTile.hook()","MGTile.getTileObject(tx,ty) / inspect(tx,ty)","MGTile.setTileEmpty(tx,ty)","MGTile.setTilePlant(tx,ty,{...}) / setTileDecor / setTileEgg","MGTile.setTileObjectRaw(tx,ty,objOrFn)","MGTile.rebuildTransform() / pointToTile({x,y})"].join(`
`)}var Me={init:op,ready:()=>he.ready,hook:rp,engine:()=>uo(),tos:()=>Tt(),gidx:(e,t)=>po(Number(e),Number(t)),getTileObject:an,inspect:up,setTileEmpty:ap,setTilePlant:ip,setTileDecor:sp,setTileEgg:lp,setTileObjectRaw:cp,rebuildTransform:Ma,pointToTile:dp,help:pp};ke();var F={ready:!1,app:null,renderer:null,stage:null,ticker:null,tileSets:new Map,highlights:new Map,watches:new Map,fades:new Map,fadeWatches:new Map},yo=e=>!!e&&typeof e=="object"&&!Array.isArray(e),go=e=>!!(e&&typeof e.getBounds=="function"&&("parent"in e||"children"in e)),ln=e=>!!(e&&typeof e.tint=="number"),je=e=>!!(e&&typeof e.alpha=="number");function sn(e,t,n){return e+(t-e)*n}function mp(e,t,n){let o=e>>16&255,r=e>>8&255,a=e&255,i=t>>16&255,s=t>>8&255,l=t&255,c=sn(o,i,n)|0,d=sn(r,s,n)|0,u=sn(a,l,n)|0;return c<<16|d<<8|u}function gp(e,t=900){let n=[],o=[e];for(;o.length&&n.length<t;){let r=o.pop();if(!r)continue;ln(r)&&n.push(r);let a=r.children;if(Array.isArray(a))for(let i=a.length-1;i>=0;i--)o.push(a[i])}return n}function fp(e,t=25e3){let n=[],o=[e],r=0;for(;o.length&&r++<t;){let a=o.pop();if(!a)continue;je(a)&&n.push(a);let i=a.children;if(Array.isArray(i))for(let s=i.length-1;s>=0;s--)o.push(i[s])}return n}function Pa(e){if(!Array.isArray(e))return[];let t=new Set,n=[];for(let o of e){let r,a;if(Array.isArray(o))r=o[0],a=o[1];else if(yo(o))r=o.x??o.tx,a=o.y??o.ty;else continue;if(r=Number(r),a=Number(a),!Number.isFinite(r)||!Number.isFinite(a))continue;r|=0,a|=0;let i=`${r},${a}`;t.has(i)||(t.add(i),n.push({x:r,y:a}))}return n}function bp(e,t){let n=String(e||"").trim();if(!n)throw new Error("MGPixi.defineTileSet: empty name");let o=Pa(t);return F.tileSets.set(n,o),{ok:!0,name:n,count:o.length}}function hp(e){return F.tileSets.delete(String(e||"").trim())}function yp(){return Array.from(F.tileSets.keys()).sort((e,t)=>e.localeCompare(t))}function Ea(e){return!!(e&&(e.tileSet!=null||Array.isArray(e.tiles)))}function xo(e){let n=Me.tos?.()?.tileViews;if(!n?.entries)throw new Error("MGPixi: TOS.tileViews not found");if(!Ea(e))return{entries:Array.from(n.entries()),gidxSet:null};let o=[];if(e.tileSet!=null){let a=String(e.tileSet||"").trim(),i=F.tileSets.get(a);if(!i)throw new Error(`MGPixi: tileSet not found "${a}"`);o=i}else o=Pa(e.tiles||[]);let r=new Map;for(let a of o){let i=Me.getTileObject(a.x,a.y,{ensureView:!0,clone:!1});i?.tileView&&i.gidx!=null&&r.set(i.gidx,i.tileView)}return{entries:Array.from(r.entries()),gidxSet:new Set(r.keys())}}function vo(e){let t=F.highlights.get(e);if(!t)return!1;le(()=>F.ticker?.remove(t.tick)),t.root&&t.baseAlpha!=null&&je(t.root)&&le(()=>{t.root.alpha=t.baseAlpha});for(let n of t.tint)n.o&&ln(n.o)&&le(()=>{n.o.tint=n.baseTint});return F.highlights.delete(e),!0}function Ia(e=null){for(let t of Array.from(F.highlights.keys()))e&&!String(t).startsWith(e)||vo(t);return!0}function La(e,t={}){if($e(),!go(e))throw new Error("MGPixi.highlightPulse: invalid root");let n=String(t.key||`hl:${Math.random().toString(16).slice(2)}`);if(F.highlights.has(n))return n;let o=je(e)?Number(e.alpha):null,r=ue(Number(t.minAlpha??.12),0,1),a=ue(Number(t.maxAlpha??1),0,1),i=Number(t.speed??1.25),s=(t.tint??8386303)>>>0,l=ue(Number(t.tintMix??.85),0,1),c=t.deepTint!==!1,d=[];if(c)for(let m of gp(e))d.push({o:m,baseTint:m.tint});else ln(e)&&d.push({o:e,baseTint:e.tint});let u=performance.now(),p=()=>{let m=(performance.now()-u)/1e3,h=(Math.sin(m*Math.PI*2*i)+1)/2,f=h*h*(3-2*h);o!=null&&je(e)&&(e.alpha=ue(sn(r,a,f)*o,0,1));let g=f*l;for(let b of d)b.o&&ln(b.o)&&(b.o.tint=mp(b.baseTint,s,g))};return F.ticker?.add(p),F.highlights.set(n,{root:e,tick:p,baseAlpha:o,tint:d}),n}var xp=["plantVisual","cropVisual","slotVisual","slotView","displayObject","view","container","root","sprite","gfx","graphics"];function fo(e){if(!e)return null;if(go(e))return e;if(!yo(e))return null;for(let t of xp){let n=e[t];if(go(n))return n}return null}function vp(e,t){let n=[{o:e,d:0}],o=new Set,r=6;for(;n.length;){let{o:a,d:i}=n.shift();if(!(!a||i>r)&&!o.has(a)){if(o.add(a),Array.isArray(a)){if(a.length===t){let s=new Array(t),l=!0;for(let c=0;c<t;c++){let d=fo(a[c]);if(!d){l=!1;break}s[c]=d}if(l)return s}for(let s of a)n.push({o:s,d:i+1});continue}if(yo(a)){let s=a;for(let l of Object.keys(s))n.push({o:s[l],d:i+1})}}}return null}function wp(e,t){let n=e?.mutations;if(!Array.isArray(n))return!1;for(let o of n)if(String(o||"").toLowerCase()===t)return!0;return!1}function Ra(e,t={}){$e();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.highlightMutation: empty mutation");let{entries:o,gidxSet:r}=xo(t),a=`hlmut:${n}:`;if(t.clear===!0)if(!r)Ia(a);else for(let u of Array.from(F.highlights.keys())){if(!u.startsWith(a))continue;let p=u.split(":"),m=Number(p[2]);r.has(m)&&vo(u)}let i={tint:(t.tint??8386303)>>>0,minAlpha:Number(t.minAlpha??.12),maxAlpha:Number(t.maxAlpha??1),speed:Number(t.speed??1.25),tintMix:Number(t.tintMix??.85),deepTint:t.deepTint!==!1},s=0,l=0,c=0,d=0;for(let[u,p]of o){let m=p?.tileObject;if(!m||m.objectType!=="plant")continue;let h=m.slots;if(!Array.isArray(h)||h.length===0)continue;let f=!1,g=[];for(let T=0;T<h.length;T++)wp(h[T],n)&&(g.push(T),f=!0);if(!f)continue;s++,l+=g.length;let b=p?.childView?.plantVisual||p?.childView||p,S=vp(b,h.length);if(!S){d+=g.length;continue}for(let T of g){let x=S[T];if(!x){d++;continue}let v=`${a}${u}:${T}`;F.highlights.has(v)||(La(x,{key:v,...i}),c++)}}return{ok:!0,mutation:n,filtered:!!r,plantsMatched:s,matchedSlots:l,newHighlights:c,failedSlots:d}}function Sp(e,t={}){$e();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchMutation: empty mutation");let o=`watchmut:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,r=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,a=F.watches.get(o);a&&clearInterval(a);let i=setInterval(()=>{le(()=>Ra(n,{...t,clear:!1}))},r);return F.watches.set(o,i),{ok:!0,key:o,mutation:n,intervalMs:r}}function kp(e){let t=String(e||"").trim();if(!t)return!1;if(!t.startsWith("watchmut:")){let o=t.toLowerCase(),r=0;for(let[a,i]of Array.from(F.watches.entries()))a.startsWith(`watchmut:${o}:`)&&(clearInterval(i),F.watches.delete(a),r++);return r>0}let n=F.watches.get(t);return n?(clearInterval(n),F.watches.delete(t),!0):!1}function Tp(e){let t=Array.isArray(e?.slots)?e.slots:[];return{objectType:"plant",species:e?.species??null,plantedAt:e?.plantedAt??null,maturedAt:e?.maturedAt??null,slotCount:t.length,slots:t.map((n,o)=>({idx:o,mutations:Array.isArray(n?.mutations)?n.mutations.slice():[]}))}}function Ap(e,t,n={}){$e();let o=Number(e)|0,r=Number(t)|0,a=n.ensureView!==!1,i=Me.getTileObject(o,r,{ensureView:a,clone:!1}),s=i?.tileView||null,l=s?.tileObject,c={ok:!0,tx:o,ty:r,gidx:i?.gidx??Me.gidx?.(o,r)??null,hasTileView:!!s,objectType:l?.objectType??null,tileObject:l??null,summary:l?.objectType==="plant"?Tp(l):l?{objectType:l.objectType??null}:null,display:s?s.childView?.plantVisual||s.childView||s.displayObject||s:null};return n.log!==!1&&le(()=>console.log("[MGPixi.inspectTile]",c)),c}function Cp(e){let t=e?.childView?.plantVisual||e?.childView?.cropVisual||e?.childView||e?.displayObject||e;return fo(t)||fo(e?.displayObject)||null}function Oa(e){let t=F.fades.get(e);if(!t)return!1;for(let n of t.targets)n.o&&je(n.o)&&Number.isFinite(n.baseAlpha)&&le(()=>{n.o.alpha=n.baseAlpha});return F.fades.delete(e),!0}function bo(e=null){for(let t of Array.from(F.fades.keys()))e&&!String(t).startsWith(e)||Oa(t);return!0}function Ha(e,t={}){$e();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.clearSpeciesFade: empty species");let o=`fade:${n}:`;if(!Ea(t))return bo(o);let{gidxSet:r}=xo(t);if(!r)return bo(o);for(let a of Array.from(F.fades.keys())){if(!a.startsWith(o))continue;let i=Number(a.slice(o.length));r.has(i)&&Oa(a)}return!0}function _a(e,t={}){$e();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.fadeSpecies: empty species");let o=ue(Number(t.alpha??.2),0,1),r=t.deep===!0,{entries:a,gidxSet:i}=xo(t),s=`fade:${n}:`;t.clear===!0&&Ha(n,t);let l=0,c=0,d=0,u=0;for(let[p,m]of a){let h=m?.tileObject;if(!h||h.objectType!=="plant")continue;l++;let f=String(h.species||"").trim().toLowerCase();if(!f||f!==n)continue;c++;let g=Cp(m);if(!g||!je(g)){u++;continue}let b=`${s}${p}`;if(F.fades.has(b)){le(()=>{g.alpha=o}),d++;continue}let S=r?fp(g):[g],T=[];for(let x of S)je(x)&&T.push({o:x,baseAlpha:Number(x.alpha)});for(let x of T)le(()=>{x.o.alpha=o});F.fades.set(b,{targets:T}),d++}return{ok:!0,species:n,alpha:o,deep:r,filtered:!!i,plantsSeen:l,matchedPlants:c,applied:d,failed:u,totalFades:F.fades.size}}function Mp(e,t={}){$e();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchFadeSpecies: empty species");let o=`watchfade:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,r=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,a=F.fadeWatches.get(o);a&&clearInterval(a);let i=setInterval(()=>{le(()=>_a(n,{...t,clear:!1}))},r);return F.fadeWatches.set(o,i),{ok:!0,key:o,species:n,intervalMs:r}}function Pp(e){let t=String(e||"").trim();if(!t)return!1;if(!t.startsWith("watchfade:")){let o=t.toLowerCase(),r=0;for(let[a,i]of Array.from(F.fadeWatches.entries()))a.startsWith(`watchfade:${o}:`)&&(clearInterval(i),F.fadeWatches.delete(a),r++);return r>0}let n=F.fadeWatches.get(t);return n?(clearInterval(n),F.fadeWatches.delete(t),!0):!1}function ho(){let e=W;return e.$PIXI=e.PIXI||null,e.$app=F.app||null,e.$renderer=F.renderer||null,e.$stage=F.stage||null,e.$ticker=F.ticker||null,e.__MG_PIXI__={PIXI:e.$PIXI,app:e.$app,renderer:e.$renderer,stage:e.$stage,ticker:e.$ticker,ready:F.ready},e.__MG_PIXI__}function $e(){if(!F.ready)throw new Error("MGPixi: call MGPixi.init() first")}async function Ep(e=15e3){if(F.ready)return ho(),!0;if(await oe.init(e),F.app=oe.app(),F.ticker=oe.ticker(),F.renderer=oe.renderer(),F.stage=oe.stage(),!F.app||!F.ticker)throw new Error("MGPixi: PIXI app/ticker not found");return F.ready=!0,ho(),!0}var cn={init:Ep,ready:()=>F.ready,expose:ho,get app(){return F.app},get renderer(){return F.renderer},get stage(){return F.stage},get ticker(){return F.ticker},get PIXI(){return W.PIXI||null},defineTileSet:bp,deleteTileSet:hp,listTileSets:yp,highlightPulse:La,stopHighlight:vo,clearHighlights:Ia,highlightMutation:Ra,watchMutation:Sp,stopWatchMutation:kp,inspectTile:Ap,fadeSpecies:_a,clearSpeciesFade:Ha,clearFades:bo,watchFadeSpecies:Mp,stopWatchFadeSpecies:Pp};ke();var Na=W??window,Ip={sfx:"soundEffectsVolume",music:"musicVolume",ambience:"ambienceVolume"},Lp={sfx:"soundEffectsVolumeAtom",music:"musicVolumeAtom",ambience:"ambienceVolumeAtom"},At=.001,Ct=.2,un=null,$={ready:!1,baseUrl:null,urls:{ambience:new Map,music:new Map},sfx:{mp3Url:null,atlasUrl:null,atlas:null,groups:new Map,buffer:null},tracks:{ambience:null,music:null},ctx:null};function Pt(){if(!$.ready)throw new Error("MGAudio not ready yet")}function Da(e,t=NaN){try{let n=localStorage.getItem(e);if(n==null)return t;let o;try{o=JSON.parse(n)}catch{o=n}if(typeof o=="number"&&Number.isFinite(o))return o;if(typeof o=="string"){let r=parseFloat(o);if(Number.isFinite(r))return r}}catch{}return t}function Mt(e){let t=Ip[e],n=Lp[e];if(!t)return{atom:Ct,vol100:dn(Ct)};let o=Da(t,NaN);if(Number.isFinite(o)){let a=ue(o,0,1);return{atom:a,vol100:dn(a)}}if(n){let a=Da(n,NaN);if(Number.isFinite(a)){let i=ue(a,0,1);return{atom:i,vol100:dn(i)}}}let r=Ct;return{atom:r,vol100:dn(r)}}function Rp(e){let t=Number(e);if(!Number.isFinite(t))return null;if(t<=0)return 0;let o=(ue(t,1,100)-1)/99;return At+o*(Ct-At)}function dn(e){let t=ue(Number(e),0,1);if(t<=At)return 0;let n=(t-At)/(Ct-At);return Math.round(1+n*99)}function Ga(e,t){if(t==null)return Mt(e).atom;let n=Rp(t);return n===null?Mt(e).atom:$n(n)}async function Wa(){let e=$.ctx;if(e)return e;let t=Na.AudioContext||Na.webkitAudioContext;if(!t)throw new Error("WebAudio not supported");let n=new t;return $.ctx=n,n}async function Ba(){if($.ctx&&$.ctx.state==="suspended")try{await $.ctx.resume()}catch{}}function Op(e){let t=new Map,n=(o,r)=>{t.has(o)||t.set(o,[]),t.get(o).push(r)};for(let o of Object.keys(e||{})){let r=/^(.*)_([A-Z])$/.exec(o);r?.[1]?n(r[1],o):n(o,o)}for(let[o,r]of Array.from(t.entries()))r.sort((a,i)=>a.localeCompare(i)),t.set(o,r);$.sfx.groups=t}function Hp(e){let t=$.sfx.atlas;if(!t)throw new Error("SFX atlas not loaded");if(t[e])return e;let n=$.sfx.groups.get(e);if(n?.length)return n[Math.random()*n.length|0];throw new Error(`Unknown sfx/group: ${e}`)}async function _p(){if($.sfx.buffer)return $.sfx.buffer;if(!$.sfx.mp3Url)throw new Error("SFX mp3 url missing");let e=await Wa();await Ba();let n=await(await Ut($.sfx.mp3Url)).arrayBuffer(),o=await new Promise((r,a)=>{let i=e.decodeAudioData(n,r,a);i?.then&&i.then(r,a)});return $.sfx.buffer=o,o}async function Np(e,t={}){if(!$.ready)throw new Error("MGAudio not ready yet");let n=String(e||"").trim();if(!n)throw new Error("Missing sfx name");let o=Hp(n),r=$.sfx.atlas[o];if(!r)throw new Error(`Missing segment for sfx: ${o}`);let a=await Wa();await Ba();let i=await _p(),s=Math.max(0,+r.start||0),l=Math.max(s,+r.end||s),c=Math.max(.01,l-s),d=Ga("sfx",t.volume),u=a.createGain();u.gain.value=d,u.connect(a.destination);let p=a.createBufferSource();return p.buffer=i,p.connect(u),p.start(0,s,c),{name:o,source:p,start:s,end:l,duration:c,volume:d}}function Va(e){if(e!=="music"&&e!=="ambience")return!1;let t=$.tracks[e];if(t){try{t.pause()}catch{}try{t.src=""}catch{}}return $.tracks[e]=null,!0}function Dp(e,t,n={}){if(!$.ready)throw new Error("MGAudio not ready yet");if(e!=="music"&&e!=="ambience")throw new Error(`Invalid category: ${e}`);let o=$.urls[e].get(t);if(!o)throw new Error(`Unknown ${e}: ${t}`);Va(e);let r=new Audio(o);return r.loop=!!n.loop,r.volume=Ga(e,n.volume),r.preload="auto",r.play().catch(()=>{}),$.tracks[e]=r,r}async function Gp(e,t,n={}){let o=String(e||"").trim(),r=String(t||"").trim();if(!o||!r)throw new Error("play(category, asset) missing args");if(o==="sfx")return Np(r,n);if(o==="music"||o==="ambience")return Dp(o,r,n);throw new Error(`Unknown category: ${o}`)}function Wp(e,t={}){let n=String(e||"").trim();return n==="music"||n==="ambience"?Array.from($.urls[n].keys()).sort():n==="sfx"?$.sfx.atlas?t.groups?Array.from($.sfx.groups.keys()).sort():Object.keys($.sfx.atlas).sort():[]:[]}function Bp(){return $.tracks.music&&($.tracks.music.volume=Mt("music").atom),$.tracks.ambience&&($.tracks.ambience.volume=Mt("ambience").atom),!0}function Vp(){return Pt(),["sfx","music","ambience"]}function Fp(){return Pt(),Array.from($.sfx.groups.keys()).sort((e,t)=>e.localeCompare(t))}function jp(e,t){Pt();let n=String(e||"").trim().toLowerCase(),o=String(t||"").trim();if(!o||n!=="music"&&n!=="ambience")return!1;let r=$.urls[n],a=o.toLowerCase();for(let i of r.keys())if(i.toLowerCase()===a)return!0;return!1}function $p(e){Pt();let t=String(e||"").trim();if(!t)return!1;let n=t.toLowerCase();for(let o of $.sfx.groups.keys())if(o.toLowerCase()===n)return!0;return!1}function zp(e,t){Pt();let n=String(e||"").trim().toLowerCase(),o=String(t||"").trim();if(!o)throw new Error("getTrackUrl(category, name) missing name");if(n!=="music"&&n!=="ambience")throw new Error(`Invalid category: ${e}`);let r=$.urls[n],a=o.toLowerCase();for(let[i,s]of r.entries())if(i.toLowerCase()===a)return s;return null}async function Up(){return $.ready?!0:un||(un=(async()=>{$.baseUrl=await be.base();let e=await de.load($.baseUrl),t=de.getBundle(e,"audio");if(!t)throw new Error("No audio bundle in manifest");for(let n of t.assets||[])for(let o of n.src||[]){if(typeof o!="string")continue;let r=/^audio\/(ambience|music)\/(.+)\.mp3$/i.exec(o);if(r){let a=r[1].toLowerCase(),i=r[2];$.urls[a].set(i,ce($.baseUrl,o));continue}/^audio\/sfx\/sfx\.mp3$/i.test(o)&&($.sfx.mp3Url=ce($.baseUrl,o)),/^audio\/sfx\/sfx\.json$/i.test(o)&&($.sfx.atlasUrl=ce($.baseUrl,o))}if(!$.sfx.atlasUrl)throw new Error("Missing audio/sfx/sfx.json in manifest");return $.sfx.atlas=await Ye($.sfx.atlasUrl),Op($.sfx.atlas),$.ready=!0,!0})(),un)}var pn={init:Up,ready:()=>$.ready,play:Gp,stop:Va,list:Wp,refreshVolumes:Bp,categoryVolume:Mt,getCategories:Vp,getGroups:Fp,hasTrack:jp,hasGroup:$p,getTrackUrl:zp};var wo=W?.document??document,mn=null,Y={ready:!1,baseUrl:null,byCat:new Map,byBase:new Map,overlay:null,live:new Set,defaultParent:null};function Kp(){if(Y.overlay)return Y.overlay;let e=wo.createElement("div");return e.id="MG_COSMETIC_OVERLAY",e.style.cssText=["position:fixed","left:0","top:0","width:100vw","height:100vh","pointer-events:none","z-index:99999999"].join(";"),wo.documentElement.appendChild(e),Y.overlay=e,e}function qp(){let e=Y.defaultParent;if(!e)return null;try{return typeof e=="function"?e():e}catch{return null}}function So(e){let t=String(e||"").trim();return t?(t=t.replace(/^cosmetic\//i,""),t=t.replace(/\.png$/i,""),t):""}function Jp(e,t){if(t===void 0){let a=So(e),i=a.indexOf("_");return i<0?{cat:"",asset:a,base:a}:{cat:a.slice(0,i),asset:a.slice(i+1),base:a}}let n=String(e||"").trim(),o=So(t),r=o.includes("_")?o:`${n}_${o}`;if(o.includes("_")&&!n){let a=o.indexOf("_");return{cat:o.slice(0,a),asset:o.slice(a+1),base:o}}return{cat:n,asset:o.replace(/^.+?_/,""),base:r}}function Xp(){return Array.from(Y.byCat.keys()).sort((e,t)=>e.localeCompare(t))}function Yp(e){let t=Y.byCat.get(String(e||"").trim());return t?Array.from(t.keys()).sort((n,o)=>n.localeCompare(o)):[]}function ko(e,t){let{cat:n,asset:o,base:r}=Jp(e,t),a=Y.byBase.get(r);if(a)return a;let s=Y.byCat.get(n)?.get(o);if(s)return s;if(!Y.baseUrl)throw new Error("MGCosmetic not initialized");if(!r)throw new Error("Invalid cosmetic name");return ce(Y.baseUrl,`cosmetic/${r}.png`)}function To(e,t,n){if(!Y.ready)throw new Error("MGCosmetic not ready yet");let o,r;typeof t=="object"&&t!==null?(o=t,r=void 0):typeof t=="string"?(r=t,o=n||{}):(r=void 0,o=n||{});let a=r!==void 0?ko(e,r):ko(e),i=wo.createElement("img");if(i.decoding="async",i.loading="eager",i.src=a,i.alt=o.alt!=null?String(o.alt):So(r??e),o.className&&(i.className=String(o.className)),o.width!=null&&(i.style.width=String(o.width)),o.height!=null&&(i.style.height=String(o.height)),o.opacity!=null&&(i.style.opacity=String(o.opacity)),o.style&&typeof o.style=="object")for(let[s,l]of Object.entries(o.style))try{i.style[s]=String(l)}catch{}return i}function Qp(e,t,n){let o,r;typeof t=="object"&&t!==null?(o=t,r=void 0):typeof t=="string"?(r=t,o=n||{}):(r=void 0,o=n||{});let a=o.parent||qp()||Kp(),i=r!==void 0?To(e,r,o):To(e,o);if(a===Y.overlay||o.center||o.x!=null||o.y!=null||o.absolute){i.style.position="absolute",i.style.pointerEvents="none",i.style.zIndex=String(o.zIndex??999999);let l=o.scale??1,c=o.rotation??0;if(o.center)i.style.left="50%",i.style.top="50%",i.style.transform=`translate(-50%, -50%) scale(${l}) rotate(${c}rad)`;else{let d=o.x??innerWidth/2,u=o.y??innerHeight/2;i.style.left=`${d}px`,i.style.top=`${u}px`,i.style.transform=`scale(${l}) rotate(${c}rad)`,o.anchor==="center"&&(i.style.transform=`translate(-50%, -50%) scale(${l}) rotate(${c}rad)`)}}return a.appendChild(i),Y.live.add(i),i.__mgDestroy=()=>{try{i.remove()}catch{}Y.live.delete(i)},i}function Zp(e){return Y.defaultParent=e,!0}function em(){for(let e of Array.from(Y.live))e.__mgDestroy?.()}async function tm(){return Y.ready?!0:mn||(mn=(async()=>{Y.baseUrl=await be.base();let e=await de.load(Y.baseUrl),t=de.getBundle(e,"cosmetic");if(!t)throw new Error("No 'cosmetic' bundle in manifest");Y.byCat.clear(),Y.byBase.clear();for(let n of t.assets||[])for(let o of n.src||[]){if(typeof o!="string"||!/^cosmetic\/.+\.png$/i.test(o))continue;let a=o.split("/").pop().replace(/\.png$/i,""),i=a.indexOf("_");if(i<0)continue;let s=a.slice(0,i),l=a.slice(i+1),c=ce(Y.baseUrl,o);Y.byBase.set(a,c),Y.byCat.has(s)||Y.byCat.set(s,new Map),Y.byCat.get(s).set(l,c)}return Y.ready=!0,!0})(),mn)}var gn={init:tm,ready:()=>Y.ready,categories:Xp,list:Yp,url:ko,create:To,show:Qp,attach:Zp,clear:em};function Fa(){xe("MGVersion",wt),xe("MGAssets",be),xe("MGManifest",de),xe("MGData",nn),xe("MGSprite",Te),xe("MGTile",Me),xe("MGPixi",cn),xe("MGAudio",pn),xe("MGCosmetic",gn)}async function ja(e){Fa();let t=[{name:"Data",init:()=>nn.init()},{name:"Sprites",init:()=>Te.init()},{name:"TileObjectSystem",init:()=>Me.init()},{name:"Pixi",init:()=>cn.init()},{name:"Audio",init:()=>pn.init()},{name:"Cosmetics",init:()=>gn.init()}];await Promise.all(t.map(async n=>{e?.({status:"start",name:n.name});try{await n.init(),e?.({status:"success",name:n.name})}catch(o){console.error(`[${n.name}] failed`,o),e?.({status:"error",name:n.name,error:o})}})),console.log("[MG] Ready: MGData / MGSprite / MGAudio / MGCosmetic / MGTile / MGPixi / MGSkins"),console.log("MGPixi.inspectTile(tx, ty)"),console.log("MGTile.help()")}Fa();function $a(e){e.logStep("WebSocket","Capturing WebSocket...");let t=null;return t=Ft(n=>{n.ws&&(e.logStep("WebSocket","WebSocket captured","success"),t?.(),t=null)},{intervalMs:250}),Rr({debug:!1}),()=>{t?.(),t=null}}async function za(e){e.logStep("Atoms","Prewarming Jotai store...");try{await kn(),await It({timeoutMs:8e3,intervalMs:50}),e.logStep("Atoms","Jotai store ready","success")}catch(t){e.logStep("Atoms","Jotai store not captured yet","error"),console.warn("[Bootstrap] Jotai store wait failed",t)}}function Ua(e){e.logStep("HUD","Loading HUD preferences...");let t=Vn(),n=Bn({hostId:"gemini-hud-root",initialWidth:t.width,initialOpen:t.isOpen,onWidthChange:o=>Xe("width",o),onOpenChange:o=>Xe("isOpen",o),themes:Re,initialTheme:t.theme,onThemeChange:o=>Xe("theme",o),buildSections:o=>On({applyTheme:o.applyTheme,initialTheme:o.initialTheme,getCurrentTheme:o.getCurrentTheme}),initialTab:t.activeTab,onTabChange:o=>Xe("activeTab",o)});return e.logStep("HUD","HUD ready","success"),n}async function Ka(e){e.log("HUD ready. Loading modules in the background...","success"),e.setSubtitle("Activating Gemini modules..."),await ja(t=>{t.status==="start"?e.logStep(t.name,`Loading ${t.name}...`):t.status==="success"?e.logStep(t.name,`${t.name} ready`,"success"):e.logStep(t.name,`${t.name} encountered an issue.`,"error")})}Sn();(async function(){"use strict";let e=Oo({title:"Gemini is loading",subtitle:"Connecting and preparing modules..."}),t=null,n=null;try{t=$a(e),await za(e),n=Ua(e),await Ka(e),e.succeed("Gemini is ready!")}catch(o){e.fail("Failed to initialize the mod.",o)}finally{t?.()}if(n){let o=n;Fn({onClick:()=>o.setOpen(!0)})}})();})();
