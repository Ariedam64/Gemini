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
"use strict";(()=>{var Io=Object.defineProperty;var Ji=(e,t,n)=>t in e?Io(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Xi=(e,t)=>()=>(e&&(t=e(e=0)),t);var Yi=(e,t)=>{for(var n in t)Io(e,n,{get:t[n],enumerable:!0})};var xe=(e,t,n)=>Ji(e,typeof t!="symbol"?t+"":t,n);var Ea={};Yi(Ea,{clamp:()=>de,clamp01:()=>Un,sleep:()=>Te,tryDo:()=>ce,waitWithTimeout:()=>Yt});async function Yt(e,t,n){let o=performance.now();for(;performance.now()-o<t;){let r=await Promise.race([e,Te(50).then(()=>null)]);if(r!==null)return r}throw new Error(`${n} timeout`)}var Te,ce,de,Un,Ae=Xi(()=>{"use strict";Te=e=>new Promise(t=>setTimeout(t,e)),ce=e=>{try{return e()}catch{return}},de=(e,t,n)=>Math.max(t,Math.min(n,e)),Un=e=>de(e,0,1)});var Qi=window;function Zi(){if(typeof unsafeWindow<"u"&&unsafeWindow)return unsafeWindow;let e=window.wrappedJSObject;return e&&e!==window?e:Qi}var es=Zi(),A=es;var ts=new Map;function ns(){return ts}function at(){return A.jotaiAtomCache?.cache}function it(e){let t=ns(),n=t.get(e);if(n)return n;let o=at();if(!o)return null;for(let r of o.values())if((r?.debugLabel||r?.label||"")===e)return t.set(e,r),r;return null}function kn(){let e=A;if(e.__REACT_DEVTOOLS_GLOBAL_HOOK__)return;let t=new Map,n=new Map;e.__REACT_DEVTOOLS_GLOBAL_HOOK__={renderers:t,supportsFiber:!0,inject:o=>{let r=t.size+1;return t.set(r,o),n.set(r,new Set),r},onCommitFiberRoot:(o,r)=>{let a=n.get(o);a&&a.add(r)},onCommitFiberUnmount:()=>{},onPostCommitFiberRoot:()=>{},getFiberRoots:o=>n.get(o),checkDCE:()=>{},isDisabled:!1}}var os={baseStore:null,captureInProgress:!1,captureError:null,lastCapturedVia:null,mirror:void 0};function Ue(){return os}var rs="__JOTAI_STORE_READY__",Lo=!1,vn=new Set;function Ht(){if(!Lo){Lo=!0;for(let e of vn)try{e()}catch{}try{let e=A.CustomEvent||CustomEvent;A.dispatchEvent?.(new e(rs))}catch{}}}function as(e){vn.add(e);let t=Sn();if(t.via&&!t.polyfill)try{e()}catch{}return()=>{vn.delete(e)}}async function _t(e={}){let{timeoutMs:t=6e3,intervalMs:n=50}=e,o=Sn();if(!(o.via&&!o.polyfill))return new Promise((r,a)=>{let i=!1,s=as(()=>{i||(i=!0,s(),r())}),l=Date.now();(async()=>{for(;!i&&Date.now()-l<t;){let d=Sn();if(d.via&&!d.polyfill){if(i)return;i=!0,s(),r();return}await st(n)}i||(i=!0,s(),a(new Error("Store not captured within timeout")))})()})}var st=e=>new Promise(t=>setTimeout(t,e));function Ro(){try{let e=A.Event||Event;A.dispatchEvent?.(new e("visibilitychange"))}catch{}}function wn(e){return e&&typeof e=="object"&&typeof e.get=="function"&&typeof e.set=="function"&&typeof e.sub=="function"}function xn(e,t=0,n=new WeakSet){if(t>3||!e||typeof e!="object"||n.has(e))return null;try{n.add(e)}catch{return null}if(wn(e))return e;let o=["store","value","current","state","s","baseStore"];for(let r of o)try{let a=e[r];if(wn(a))return a}catch{}return null}function Oo(){let e=Ue(),t=A.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t?.renderers?.size)return null;let n=0;for(let[o]of t.renderers){let r=t.getFiberRoots?.(o);r&&(n+=r.size||0)}if(n===0)return null;for(let[o]of t.renderers){let r=t.getFiberRoots?.(o);if(r)for(let a of r){let i=new Set,s=[a.current];for(;s.length;){let l=s.pop();if(!(!l||i.has(l))){i.add(l);try{let c=l?.pendingProps?.value;if(wn(c))return e.lastCapturedVia="fiber",c}catch{}try{let c=l?.memoizedState,d=0;for(;c&&d<15;){d++;let u=xn(c);if(u)return e.lastCapturedVia="fiber",u;let p=xn(c.memoizedState);if(p)return e.lastCapturedVia="fiber",p;c=c.next}}catch{}try{if(l?.stateNode){let c=xn(l.stateNode);if(c)return e.lastCapturedVia="fiber",c}}catch{}l.child&&s.push(l.child),l.sibling&&s.push(l.sibling),l.alternate&&s.push(l.alternate)}}}}return null}function Ho(){return{get:()=>{throw new Error("Store not captured: get unavailable")},set:()=>{throw new Error("Store not captured: set unavailable")},sub:()=>()=>{},__polyfill:!0}}async function is(e=5e3){let t=Date.now(),n=at();for(;!n&&Date.now()-t<e;)await st(100),n=at();if(!n)throw new Error("jotaiAtomCache.cache not found");let o=Ue(),r=null,a=null,i=[],s=()=>{for(let c of i)try{c.__origWrite&&(c.write=c.__origWrite,delete c.__origWrite)}catch{}};for(let c of n.values()){if(!c||typeof c.write!="function"||c.__origWrite)continue;let d=c.write;c.__origWrite=d,c.write=function(u,p,...m){return a||(r=u,a=p,s()),d.call(this,u,p,...m)},i.push(c)}Ro();let l=Date.now();for(;!a&&Date.now()-l<e;)await st(50);return a?(o.lastCapturedVia="write",{get:c=>r(c),set:(c,d)=>a(c,d),sub:(c,d)=>{let u;try{u=r(c)}catch{}let p=setInterval(()=>{let m;try{m=r(c)}catch{return}if(m!==u){u=m;try{d()}catch{}}},100);return()=>clearInterval(p)}}):(s(),o.lastCapturedVia="polyfill",Ho())}async function ss(e=1e4){let t=Ue();Ro();let n=Date.now();for(;Date.now()-n<e;){let o=Oo();if(o)return o;await st(50)}return t.lastCapturedVia="polyfill",Ho()}async function ls(){let e=Ue();if(e.baseStore&&!e.baseStore.__polyfill)return Ht(),e.baseStore;if(e.captureInProgress){let t=Date.now(),n=2500;for(;!e.baseStore&&Date.now()-t<n;)await st(25);if(e.baseStore)return e.baseStore.__polyfill||Ht(),e.baseStore}e.captureInProgress=!0;try{let t=Oo();if(t)return e.baseStore=t,Ht(),t;try{let o=await is(5e3);return e.baseStore=o,o.__polyfill||Ht(),o}catch(o){e.captureError=o}let n=await ss();return e.baseStore=n,n}catch(t){throw e.captureError=t,t}finally{e.captureInProgress=!1}}function Sn(){let e=Ue();return{via:e.lastCapturedVia,polyfill:!!e.baseStore?.__polyfill,error:e.captureError}}async function cs(){let e=await ls(),t=new WeakMap,n=async r=>{let a=t.get(r);if(a)return a;a={last:void 0,has:!1,subs:new Set},t.set(r,a);try{a.last=e.get(r),a.has=!0}catch{}let i=e.sub(r,()=>{let s;try{s=e.get(r)}catch{return}let l=a.last,c=!Object.is(s,l)||!a.has;if(a.last=s,a.has=!0,c)for(let d of a.subs)try{d(s,l)}catch{}});return a.unsubUpstream=i,a};return{async get(r){let a=await n(r);if(a.has)return a.last;let i=e.get(r);return a.last=i,a.has=!0,i},async set(r,a){await e.set(r,a);let i=await n(r);i.last=a,i.has=!0},async sub(r,a){let i=await n(r);if(i.subs.add(a),i.has)try{a(i.last,i.last)}catch{}return()=>{i.subs.delete(a)}},getShadow(r){return t.get(r)?.last},hasShadow(r){return!!t.get(r)?.has},async ensureWatch(r){await n(r)},async asStore(){return{get:r=>this.get(r),set:(r,a)=>this.set(r,a),sub:(r,a)=>{let i=null;return this.sub(r,()=>a()).then(s=>i=s),()=>i?.()}}}}}async function lt(){let e=Ue();return e.mirror||(e.mirror=await cs()),e.mirror}var Z={async select(e){let t=await lt(),n=it(e);if(!n)throw new Error(`[Store] Atom not found: "${e}"`);return t.get(n)},async set(e,t){let n=await lt(),o=it(e);if(!o)throw new Error(`[Store] Atom not found: "${e}"`);await n.set(o,t)},async subscribe(e,t){let n=await lt(),o=it(e);if(!o)throw new Error(`[Store] Atom not found: "${e}"`);return n.sub(o,r=>{try{t(r)}catch{}})},async subscribeImmediate(e,t){let n=await Z.select(e);try{t(n)}catch{}return Z.subscribe(e,t)}};async function Tn(){await lt()}function ct(e){return e?Array.isArray(e)?e.slice():e.split(".").map(t=>t.match(/^\d+$/)?Number(t):t):[]}function Ee(e,t){let n=ct(t),o=e;for(let r of n){if(o==null)return;o=o[r]}return o}function An(e,t,n){let o=ct(t);if(!o.length)return n;let r=Array.isArray(e)?[...e]:{...e??{}},a=r;for(let i=0;i<o.length-1;i++){let s=o[i],l=a[s],c=typeof l=="object"&&l!==null?Array.isArray(l)?[...l]:{...l}:{};a[s]=c,a=c}return a[o[o.length-1]]=n,r}function _o(e,t){let n={};for(let o of t)n[o]=o.includes(".")?Ee(e,o):e?.[o];try{return JSON.stringify(n)}catch{return String(n)}}function Cn(e,t,n){let o=n.mode??"auto";function r(c){let d=t?Ee(c,t):c,u=new Map;if(d==null)return{signatures:u,keys:[]};let p=Array.isArray(d);if((o==="array"||o==="auto"&&p)&&p)for(let b=0;b<d.length;b++){let f=d[b],g=n.key?n.key(f,b,c):b,h=n.sig?n.sig(f,b,c):n.fields?_o(f,n.fields):JSON.stringify(f);u.set(g,h)}else for(let[b,f]of Object.entries(d)){let g=n.key?n.key(f,b,c):b,h=n.sig?n.sig(f,b,c):n.fields?_o(f,n.fields):JSON.stringify(f);u.set(g,h)}return{signatures:u,keys:Array.from(u.keys())}}function a(c,d){if(c===d)return!0;if(!c||!d||c.size!==d.size)return!1;for(let[u,p]of c)if(d.get(u)!==p)return!1;return!0}async function i(c){let d=null;return Z.subscribeImmediate(e,u=>{let p=t?Ee(u,t):u,{signatures:m}=r(p);if(!a(d,m)){let b=new Set([...d?Array.from(d.keys()):[],...Array.from(m.keys())]),f=[];for(let g of b){let h=d?.get(g)??"__NONE__",S=m.get(g)??"__NONE__";h!==S&&f.push(g)}d=m,c({value:p,changedKeys:f})}})}async function s(c,d){return i(({value:u,changedKeys:p})=>{p.includes(c)&&d({value:u})})}async function l(c,d){let u=new Set(c);return i(({value:p,changedKeys:m})=>{let b=m.filter(f=>u.has(f));b.length&&d({value:p,changedKeys:b})})}return{sub:i,subKey:s,subKeys:l}}var Ke=new Map;function us(e,t){let n=Ke.get(e);if(n)try{n()}catch{}return Ke.set(e,t),()=>{try{t()}catch{}Ke.get(e)===t&&Ke.delete(e)}}function Y(e,t={}){let{path:n,write:o="replace"}=t,r=n?`${e}:${ct(n).join(".")}`:e;async function a(){let u=await Z.select(e);return n?Ee(u,n):u}async function i(u){if(typeof o=="function"){let b=await Z.select(e),f=o(u,b);return Z.set(e,f)}let p=await Z.select(e),m=n?An(p,n,u):u;return o==="merge-shallow"&&!n&&p&&typeof p=="object"&&typeof u=="object"?Z.set(e,{...p,...u}):Z.set(e,m)}async function s(u){let p=await a(),m=u(p);return await i(m),m}async function l(u,p,m){let b,f=h=>{let S=n?Ee(h,n):h;if(typeof b>"u"||!m(b,S)){let T=b;b=S,p(S,T)}},g=u?await Z.subscribeImmediate(e,f):await Z.subscribe(e,f);return us(r,g)}function c(){let u=Ke.get(r);if(u){try{u()}catch{}Ke.delete(r)}}function d(u){return Cn(e,u?.path??n,u)}return{label:r,get:a,set:i,update:s,onChange:(u,p=Object.is)=>l(!1,u,p),onChangeNow:(u,p=Object.is)=>l(!0,u,p),asSignature:d,stopOnChange:c}}function y(e){return Y(e)}var ds=y("positionAtom"),ps=y("lastPositionInMyGardenAtom"),ms=y("playerDirectionAtom"),gs=y("stateAtom"),fs=y("quinoaDataAtom"),bs=y("currentTimeAtom"),hs=y("actionAtom"),ys=y("isPressAndHoldActionAtom"),xs=y("mapAtom"),vs=y("tileSizeAtom"),ws=Y("mapAtom",{path:"cols"}),Ss=Y("mapAtom",{path:"rows"}),ks=Y("mapAtom",{path:"spawnTiles"}),Ts=Y("mapAtom",{path:"locations.seedShop.spawnTileIdx"}),As=Y("mapAtom",{path:"locations.eggShop.spawnTileIdx"}),Cs=Y("mapAtom",{path:"locations.toolShop.spawnTileIdx"}),Ps=Y("mapAtom",{path:"locations.decorShop.spawnTileIdx"}),Ms=Y("mapAtom",{path:"locations.sellCropsShop.spawnTileIdx"}),Es=Y("mapAtom",{path:"locations.sellPetShop.spawnTileIdx"}),Is=Y("mapAtom",{path:"locations.collectorsClub.spawnTileIdx"}),Ls=Y("mapAtom",{path:"locations.wishingWell.spawnTileIdx"}),Rs=Y("mapAtom",{path:"locations.shopsCenter.spawnTileIdx"}),Os=y("playerAtom"),Hs=y("myDataAtom"),_s=y("myUserSlotIdxAtom"),Ns=y("isSpectatingAtom"),Gs=y("myCoinsCountAtom"),Ds=y("numPlayersAtom"),Ws=Y("playerAtom",{path:"id"}),Bs=y("userSlotsAtom"),Vs=y("filteredUserSlotsAtom"),js=y("myUserSlotAtom"),Fs=y("spectatorsAtom"),zs=Y("stateAtom",{path:"child"}),$s=Y("stateAtom",{path:"child.data"}),Us=Y("stateAtom",{path:"child.data.shops"}),Ks=Y("stateAtom",{path:"child.data.userSlots"}),qs=Y("stateAtom",{path:"data.players"}),Js=y("myInventoryAtom"),Xs=y("myInventoryItemsAtom"),Ys=y("isMyInventoryAtMaxLengthAtom"),Qs=y("myFavoritedItemIdsAtom"),Zs=y("myCropInventoryAtom"),el=y("mySeedInventoryAtom"),tl=y("myToolInventoryAtom"),nl=y("myEggInventoryAtom"),ol=y("myDecorInventoryAtom"),rl=y("myPetInventoryAtom"),al=Y("myInventoryAtom",{path:"favoritedItemIds"}),il=y("itemTypeFiltersAtom"),sl=y("myItemStoragesAtom"),ll=y("myPetHutchStoragesAtom"),cl=y("myPetHutchItemsAtom"),ul=y("myPetHutchPetItemsAtom"),dl=y("myNumPetHutchItemsAtom"),pl=y("myValidatedSelectedItemIndexAtom"),ml=y("isSelectedItemAtomSuspended"),gl=y("mySelectedItemAtom"),fl=y("mySelectedItemNameAtom"),bl=y("mySelectedItemRotationsAtom"),hl=y("mySelectedItemRotationAtom"),yl=y("setSelectedIndexToEndAtom"),xl=y("myPossiblyNoLongerValidSelectedItemIndexAtom"),vl=y("myCurrentGlobalTileIndexAtom"),wl=y("myCurrentGardenTileAtom"),Sl=y("myCurrentGardenObjectAtom"),kl=y("myOwnCurrentGardenObjectAtom"),Tl=y("myOwnCurrentDirtTileIndexAtom"),Al=y("myCurrentGardenObjectNameAtom"),Cl=y("isInMyGardenAtom"),Pl=y("myGardenBoardwalkTileObjectsAtom"),Ml=Y("myDataAtom",{path:"garden"}),El=Y("myDataAtom",{path:"garden.tileObjects"}),Il=Y("myOwnCurrentGardenObjectAtom",{path:"objectType"}),Ll=y("myCurrentStablePlantObjectInfoAtom"),Rl=y("myCurrentSortedGrowSlotIndicesAtom"),Ol=y("myCurrentGrowSlotIndexAtom"),Hl=y("myCurrentGrowSlotsAtom"),_l=y("myCurrentGrowSlotAtom"),Nl=y("secondsUntilCurrentGrowSlotMaturesAtom"),Gl=y("isCurrentGrowSlotMatureAtom"),Dl=y("numGrowSlotsAtom"),Wl=y("myCurrentEggAtom"),Bl=y("petInfosAtom"),Vl=y("myPetInfosAtom"),jl=y("myPetSlotInfosAtom"),Fl=y("myPrimitivePetSlotsAtom"),zl=y("myNonPrimitivePetSlotsAtom"),$l=y("expandedPetSlotIdAtom"),Ul=y("myPetsProgressAtom"),Kl=y("myActiveCropMutationPetsAtom"),ql=y("totalPetSellPriceAtom"),Jl=y("selectedPetHasNewVariantsAtom"),Xl=y("shopsAtom"),Yl=y("myShopPurchasesAtom"),Ql=y("seedShopAtom"),Zl=y("seedShopInventoryAtom"),ec=y("seedShopRestockSecondsAtom"),tc=y("seedShopCustomRestockInventoryAtom"),nc=y("eggShopAtom"),oc=y("eggShopInventoryAtom"),rc=y("eggShopRestockSecondsAtom"),ac=y("eggShopCustomRestockInventoryAtom"),ic=y("toolShopAtom"),sc=y("toolShopInventoryAtom"),lc=y("toolShopRestockSecondsAtom"),cc=y("toolShopCustomRestockInventoryAtom"),uc=y("decorShopAtom"),dc=y("decorShopInventoryAtom"),pc=y("decorShopRestockSecondsAtom"),mc=y("decorShopCustomRestockInventoryAtom"),gc=y("isDecorShopAboutToRestockAtom"),fc=Y("shopsAtom",{path:"seed"}),bc=Y("shopsAtom",{path:"tool"}),hc=Y("shopsAtom",{path:"egg"}),yc=Y("shopsAtom",{path:"decor"}),xc=y("myCropItemsAtom"),vc=y("myCropItemsToSellAtom"),wc=y("totalCropSellPriceAtom"),Sc=y("friendBonusMultiplierAtom"),kc=y("myJournalAtom"),Tc=y("myCropJournalAtom"),Ac=y("myPetJournalAtom"),Cc=y("myStatsAtom"),Pc=y("myActivityLogsAtom"),Mc=y("newLogsAtom"),Ec=y("hasNewLogsAtom"),Ic=y("newCropLogsFromSellingAtom"),Lc=y("hasNewCropLogsFromSellingAtom"),Rc=y("myCompletedTasksAtom"),Oc=y("myActiveTasksAtom"),Hc=y("isWelcomeToastVisibleAtom"),_c=y("shouldCloseWelcomeToastAtom"),Nc=y("isInitialMoveToDirtPatchToastVisibleAtom"),Gc=y("isFirstPlantSeedActiveAtom"),Dc=y("isThirdSeedPlantActiveAtom"),Wc=y("isThirdSeedPlantCompletedAtom"),Bc=y("isDemoTouchpadVisibleAtom"),Vc=y("areShopAnnouncersEnabledAtom"),jc=y("arePresentablesEnabledAtom"),Fc=y("isEmptyDirtTileHighlightedAtom"),zc=y("isPlantTileHighlightedAtom"),$c=y("isItemHiglightedInHotbarAtom"),Uc=y("isItemHighlightedInModalAtom"),Kc=y("isMyGardenButtonHighlightedAtom"),qc=y("isSellButtonHighlightedAtom"),Jc=y("isShopButtonHighlightedAtom"),Xc=y("isInstaGrowButtonHiddenAtom"),Yc=y("isActionButtonHighlightedAtom"),Qc=y("isGardenItemInfoCardHiddenAtom"),Zc=y("isSeedPurchaseButtonHighlightedAtom"),eu=y("isFirstSeedPurchaseActiveAtom"),tu=y("isFirstCropHarvestActiveAtom"),nu=y("isWeatherStatusHighlightedAtom"),ou=y("weatherAtom"),ru=y("activeModalAtom"),au=y("hotkeyBeingPressedAtom"),iu=y("avatarTriggerAnimationAtom"),su=y("avatarDataAtom"),lu=y("emoteDataAtom"),cu=y("otherUserSlotsAtom"),uu=y("otherPlayerPositionsAtom"),du=y("otherPlayerSelectedItemsAtom"),pu=y("otherPlayerLastActionsAtom"),mu=y("traderBunnyPlayerId"),gu=y("npcPlayersAtom"),fu=y("npcQuinoaUsersAtom"),bu=y("numNpcAvatarsAtom"),hu=y("traderBunnyEmoteTimeoutAtom"),yu=y("traderBunnyEmoteAtom"),xu=y("unsortedLeaderboardAtom"),vu=y("currentGardenNameAtom"),wu=y("quinoaEngineAtom"),Su=y("quinoaInitializationErrorAtom"),ku=y("avgPingAtom"),Tu=y("serverClientTimeOffsetAtom"),Au=y("isEstablishingShotRunningAtom"),Cu=y("isEstablishingShotCompleteAtom");function w(e,t=null,...n){let o=document.createElement(e);for(let[r,a]of Object.entries(t||{}))a!=null&&(r==="style"?typeof a=="string"?o.setAttribute("style",a):typeof a=="object"&&Object.assign(o.style,a):r.startsWith("on")&&typeof a=="function"?o[r.toLowerCase()]=a:r in o?o[r]=a:o.setAttribute(r,String(a)));for(let r of n)r==null||r===!1||o.appendChild(typeof r=="string"||typeof r=="number"?document.createTextNode(String(r)):r);return o}var Nt="https://i.imgur.com/k5WuC32.png",No="gemini-loader-style",_e="gemini-loader",Go=80;function Pu(){if(document.getElementById(No))return;let e=document.createElement("style");e.id=No,e.textContent=`
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
      .gemini-loader__spinner-icon { width: 32px; height: 32px; }
      .gemini-loader__title { font-size: 16px; }
    }
  `,document.head.appendChild(e)}function Gt(e,t,n){let o=w("div",{className:`gemini-loader__log ${n}`},w("div",{className:"gemini-loader__dot"}),w("div",{textContent:t}));for(e.appendChild(o);e.childElementCount>Go;)e.firstElementChild?.remove();e.scrollTop=e.scrollHeight}function Mu(){return new Promise(e=>{if(typeof GM_xmlhttpRequest>"u"){e(Nt);return}GM_xmlhttpRequest({method:"GET",url:Nt,responseType:"blob",onload:t=>{let n=t.response,o=new FileReader;o.onloadend=()=>e(o.result),o.onerror=()=>e(Nt),o.readAsDataURL(n)},onerror:()=>e(Nt)})})}function Do(e={}){let t=Number.isFinite(e.blurPx)?Math.max(4,Number(e.blurPx)):14;Pu();let n=w("div",{className:"gemini-loader__subtitle",textContent:e.subtitle??"Initializing the mod..."}),o=w("div",{className:"gemini-loader__logs"}),r=w("img",{className:"gemini-loader__spinner-icon",alt:"Gemini"}),a=w("div",{className:"gemini-loader__spinner"},r);Mu().then(g=>{r.src=g});let i=w("div",{className:"gemini-loader__card"},w("div",{className:"gemini-loader__header"},a,w("div",{className:"gemini-loader__titles"},w("div",{className:"gemini-loader__title",textContent:e.title??"Gemini is loading"}),n)),o),s=w("div",{id:_e},i);(document.body||document.documentElement).appendChild(s);let l=w("div",{className:"gemini-loader__actions"},w("button",{className:"gemini-loader__button",textContent:"Close loader",onclick:()=>s.remove()}));i.appendChild(l),s.style.setProperty("--loader-blur",`${t}px`);let c=g=>{n.textContent=g},d=new Map,u=(g,h)=>{g.className=`gemini-loader__log ${h}`};return{log:(g,h="info")=>Gt(o,g,h),logStep:(g,h,S="info")=>{let T=String(g||"").trim();if(!T){Gt(o,h,S);return}let x=d.get(T);if(x){x.el.lastElementChild&&(x.el.lastElementChild.textContent=h),x.tone!==S&&(u(x.el,S),x.tone=S);return}let v=w("div",{className:`gemini-loader__log ${S}`},w("div",{className:"gemini-loader__dot"}),w("div",{textContent:h}));for(d.set(T,{el:v,tone:S}),o.appendChild(v);o.childElementCount>Go;){let k=o.firstElementChild;if(!k)break;let E=Array.from(d.entries()).find(([,I])=>I.el===k)?.[0];E&&d.delete(E),k.remove()}o.scrollTop=o.scrollHeight},setSubtitle:c,succeed:(g,h=600)=>{g&&Gt(o,g,"success"),s.classList.add("gemini-loader--closing"),setTimeout(()=>s.remove(),h)},fail:(g,h)=>{Gt(o,g,"error"),c("Something went wrong. Check the console for details."),s.classList.add("gemini-loader--error"),console.error("[Gemini loader]",g,h)}}}function Wo(e,t,n){let o=w("div",{className:"lg-pill",id:"pill"}),r=e.map(d=>{let u=w("button",{className:"lg-tab"},d.label);return u.setAttribute("data-target",d.id),u}),a=w("div",{className:"lg-tabs",id:"lg-tabs-row"},o,...r),i=a;a.addEventListener("wheel",d=>{Math.abs(d.deltaY)>Math.abs(d.deltaX)&&(d.preventDefault(),a.scrollLeft+=d.deltaY)},{passive:!1});function s(d){let u=a.getBoundingClientRect(),p=r.find(v=>v.dataset.target===d)||r[0];if(!p)return;let m=p.getBoundingClientRect(),b=m.left-u.left,f=m.width;o.style.width=`${f}px`,o.style.transform=`translateX(${b}px)`;let g=a.scrollLeft,h=g,S=g+a.clientWidth,T=b-12,x=b+f+12;T<h?a.scrollTo({left:T,behavior:"smooth"}):x>S&&a.scrollTo({left:x-a.clientWidth,behavior:"smooth"})}let l=t||(e[0]?.id??"");function c(d){l=d,r.forEach(u=>u.classList.toggle("active",u.dataset.target===d)),s(d),n(d)}return r.forEach(d=>d.addEventListener("click",()=>c(d.dataset.target))),queueMicrotask(()=>s(l)),{root:i,activate:c,recalc:()=>s(l),getActive:()=>l}}var Ne=class{constructor(t){xe(this,"id");xe(this,"label");xe(this,"container",null);xe(this,"cleanupFunctions",[]);this.id=t.id,this.label=t.label}render(t){for(this.unmount();t.firstChild;)t.removeChild(t.firstChild);this.container=t;let n=this.build(t);n instanceof Promise&&n.catch(r=>{console.error(`[Gemini] Error building section ${this.id}:`,r)});let o=t.firstElementChild;o&&o.classList.contains("gemini-section")&&o.classList.add("active")}unmount(){this.executeCleanup(),this.container=null}createContainer(t,n){let o=n?`gemini-section ${n}`:"gemini-section";return w("section",{id:t,className:o})}addCleanup(t){this.cleanupFunctions.push(t)}createGrid(t="12px"){let n=w("div");return n.style.display="grid",n.style.gap=t,n}executeCleanup(){for(let t of this.cleanupFunctions)try{t()}catch(n){console.error(`[Gemini] Cleanup error in section ${this.id}:`,n)}this.cleanupFunctions=[]}};var ut=class{constructor(t,n,o){xe(this,"sections");xe(this,"activeId",null);xe(this,"container");xe(this,"theme");this.sections=new Map(t.map(r=>[r.id,r])),this.container=n,this.theme=o}get ids(){return Array.from(this.sections.keys())}get all(){return Array.from(this.sections.values())}get active(){return this.activeId}activate(t){if(this.activeId!==t){if(!this.sections.has(t))throw new Error(`[Gemini] Unknown section: ${t}`);if(this.activeId&&this.sections.get(this.activeId).unmount(),this.activeId=t,this.sections.get(t).render(this.container),this.theme){let n=this.theme.getCurrentTheme();this.theme.applyTheme(n)}}}};function dt(e,t){try{let n=JSON.stringify(t);GM_setValue(e,n)}catch(n){console.error(`[Gemini] Failed to save key "${e}" to storage:`,n)}}function Ie(e,t){try{let n=GM_getValue(e);return n==null?t:typeof n=="string"?JSON.parse(n):n}catch(n){return console.error(`[Gemini] Failed to load key "${e}" from storage, using default:`,n),t}}var Bo="gemini.sections";function Vo(){let e=Ie(Bo,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function Eu(e){dt(Bo,e)}async function jo(e){return Vo()[e]}function Fo(e,t){let n=Vo();Eu({...n,[e]:t})}function Dt(e,t){return{...e,...t??{}}}async function zo(e){let t=await jo(e.path),n;e.migrate?n=e.migrate(t):n=t??{},n=Object.assign((c=>JSON.parse(JSON.stringify(c)))(e.defaults),n),e.sanitize&&(n=e.sanitize(n));function r(){Fo(e.path,n)}function a(){return n}function i(c){n=e.sanitize?e.sanitize(c):c,r()}function s(c){let u=Object.assign((p=>JSON.parse(JSON.stringify(p)))(n),{});typeof c=="function"?c(u):Object.assign(u,c),n=e.sanitize?e.sanitize(u):u,r()}function l(){r()}return{get:a,set:i,update:s,save:l}}async function pt(e,t){let{path:n=e,...o}=t;return zo({path:n,...o})}var Iu=0,Wt=new Map;function Le(e={},...t){let{id:n,className:o,variant:r="default",padding:a="md",interactive:i=!1,expandable:s=!1,defaultExpanded:l=!0,onExpandChange:c,mediaTop:d,title:u,subtitle:p,badge:m,actions:b,footer:f,divider:g=!1,tone:h="neutral",stateKey:S}=e,T=w("div",{className:"card",id:n,tabIndex:i?0:void 0});T.classList.add(`card--${r}`,`card--p-${a}`),i&&T.classList.add("card--interactive"),h!=="neutral"&&T.classList.add(`card--tone-${h}`),o&&T.classList.add(...o.split(" ").filter(Boolean)),s&&T.classList.add("card--expandable");let x=s?S??n??(typeof u=="string"?`title:${u}`:null):null,v=!s||l;x&&Wt.has(x)&&(v=!!Wt.get(x));let k=null,E=null,I=null,L=null,O=null,M=n?`${n}-collapse`:`card-collapse-${++Iu}`,U=()=>{if(L!==null&&(cancelAnimationFrame(L),L=null),O){let H=O;O=null,H()}},J=(H,G)=>{if(!I)return;U();let R=I;if(R.setAttribute("aria-hidden",String(!H)),!G){R.classList.remove("card-collapse--animating"),R.style.display=H?"":"none",R.style.height="",R.style.opacity="";return}if(R.classList.add("card-collapse--animating"),R.style.display="",H){R.style.height="auto";let F=R.scrollHeight;if(!F){R.classList.remove("card-collapse--animating"),R.style.display="",R.style.height="",R.style.opacity="";return}R.style.height="0px",R.style.opacity="0",R.offsetHeight,L=requestAnimationFrame(()=>{L=null,R.style.height=`${F}px`,R.style.opacity="1"})}else{let F=R.scrollHeight;if(!F){R.classList.remove("card-collapse--animating"),R.style.display="none",R.style.height="",R.style.opacity="";return}R.style.height=`${F}px`,R.style.opacity="1",R.offsetHeight,L=requestAnimationFrame(()=>{L=null,R.style.height="0px",R.style.opacity="0"})}let P=()=>{R.classList.remove("card-collapse--animating"),R.style.height="",H||(R.style.display="none"),R.style.opacity=""},N=null,W=F=>{F.target===R&&(N!==null&&(clearTimeout(N),N=null),R.removeEventListener("transitionend",W),R.removeEventListener("transitioncancel",W),O=null,P())};O=()=>{N!==null&&(clearTimeout(N),N=null),R.removeEventListener("transitionend",W),R.removeEventListener("transitioncancel",W),O=null,P()},R.addEventListener("transitionend",W),R.addEventListener("transitioncancel",W),N=window.setTimeout(()=>{O?.()},420)};function q(H){let G=document.createElementNS("http://www.w3.org/2000/svg","svg");return G.setAttribute("viewBox","0 0 24 24"),G.setAttribute("width","16"),G.setAttribute("height","16"),G.innerHTML=H==="up"?'<path d="M7 14l5-5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>':'<path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',G}function D(H,G=!0,R=!0){v=H,T.classList.toggle("card--collapsed",!v),T.classList.toggle("card--expanded",v),k&&(k.dataset.expanded=String(v),k.setAttribute("aria-expanded",String(v))),E&&(E.setAttribute("aria-expanded",String(v)),E.classList.toggle("card-toggle--collapsed",!v),E.setAttribute("aria-label",v?"Replier le contenu":"Deplier le contenu"),E.replaceChildren(q(v?"up":"down"))),s?J(v,R):I&&(I.style.display="",I.style.height="",I.style.opacity="",I.setAttribute("aria-hidden","false")),G&&c&&c(v),x&&Wt.set(x,v)}if(d){let H=w("div",{className:"card-media"});H.append(d),T.appendChild(H)}let B=!!(u||p||m||b&&b.length||s);if(B){k=w("div",{className:"card-header"});let H=w("div",{className:"card-headline",style:"min-width:0;display:flex;flex-direction:column;gap:2px;"});if(u){let P=w("h3",{className:"card-title",style:"margin:0;font-size:15px;font-weight:700;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:8px;"},u);m&&P.append(typeof m=="string"?w("span",{className:"badge"},m):m),H.appendChild(P)}if(p){let P=w("div",{className:"card-subtitle",style:"opacity:.85;font-size:12px;color:color-mix(in oklab, var(--fg) 80%, #9ca3af)"},p);H.appendChild(P)}(H.childNodes.length||s)&&k.appendChild(H);let G=w("div",{className:"card-header-right",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"}),R=w("div",{className:"card-actions",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"});b?.forEach(P=>R.appendChild(P)),R.childNodes.length&&G.appendChild(R),s&&(E=w("button",{className:"card-toggle",type:"button",ariaExpanded:String(v),ariaControls:M,ariaLabel:v?"Replier le contenu":"Deplier le contenu"}),E.textContent=v?"\u25B2":"\u25BC",E.addEventListener("click",P=>{P.preventDefault(),P.stopPropagation(),D(!v)}),G.appendChild(E),k.classList.add("card-header--expandable"),k.addEventListener("click",P=>{let N=P.target;N?.closest(".card-actions")||N?.closest(".card-toggle")||D(!v)})),G.childNodes.length&&k.appendChild(G),T.appendChild(k)}I=w("div",{className:"card-collapse",id:M,ariaHidden:s?String(!v):"false"}),T.appendChild(I),g&&B&&I.appendChild(w("div",{className:"card-divider"}));let _=w("div",{className:"card-body"});if(_.append(...t),I.appendChild(_),f){g&&I.appendChild(w("div",{className:"card-divider"}));let H=w("div",{className:"card-footer"});H.append(f),I.appendChild(H)}return E&&E.setAttribute("aria-controls",M),D(v,!1,!1),x&&Wt.set(x,v),T}function Pn(...e){return w("div",{className:"card-footer"},...e)}var Bt=!1,Vt=new Set,me=e=>{let t=document.activeElement;for(let n of Vt)if(t&&(t===n||n.contains(t))){e.stopImmediatePropagation(),e.stopPropagation();return}};function Lu(){Bt||(Bt=!0,window.addEventListener("keydown",me,!0),window.addEventListener("keypress",me,!0),window.addEventListener("keyup",me,!0),document.addEventListener("keydown",me,!0),document.addEventListener("keypress",me,!0),document.addEventListener("keyup",me,!0))}function Ru(){Bt&&(Vt.size>0||(Bt=!1,window.removeEventListener("keydown",me,!0),window.removeEventListener("keypress",me,!0),window.removeEventListener("keyup",me,!0),document.removeEventListener("keydown",me,!0),document.removeEventListener("keypress",me,!0),document.removeEventListener("keyup",me,!0)))}function qe(e){let{id:t,value:n=null,options:o,placeholder:r="Select...",size:a="md",disabled:i=!1,blockGameKeys:s=!0,onChange:l,onOpenChange:c}=e,d=w("div",{className:"select",id:t}),u=w("button",{className:"select-trigger",type:"button"}),p=w("span",{className:"select-value"},r),m=w("span",{className:"select-caret"},"\u25BE");u.append(p,m);let b=w("div",{className:"select-menu",role:"listbox",tabindex:"-1","aria-hidden":"true"});d.classList.add(`select--${a}`);let f=!1,g=n,h=null,S=!!i;function T(P){return P==null?r:(e.options||o).find(W=>W.value===P)?.label??r}function x(P){p.textContent=T(P),b.querySelectorAll(".select-option").forEach(N=>{let W=N.dataset.value,F=P!=null&&W===P;N.classList.toggle("selected",F),N.setAttribute("aria-selected",String(F))})}function v(P){b.replaceChildren(),P.forEach(N=>{let W=w("button",{className:"select-option"+(N.disabled?" disabled":""),type:"button",role:"option","data-value":N.value,"aria-selected":String(N.value===g),tabindex:"-1"},N.label);N.value===g&&W.classList.add("selected"),N.disabled||W.addEventListener("pointerdown",F=>{F.preventDefault(),F.stopPropagation(),M(N.value,{notify:!0}),L()},{capture:!0}),b.appendChild(W)})}function k(){u.setAttribute("aria-expanded",String(f)),b.setAttribute("aria-hidden",String(!f))}function E(){let P=u.getBoundingClientRect();Object.assign(b.style,{minWidth:`${P.width}px`})}function I(){f||S||(f=!0,d.classList.add("open"),k(),E(),document.addEventListener("mousedown",B,!0),document.addEventListener("scroll",_,!0),window.addEventListener("resize",H),b.focus({preventScroll:!0}),s&&(Lu(),Vt.add(d),h=()=>{Vt.delete(d),Ru()}),c?.(!0))}function L(){f&&(f=!1,d.classList.remove("open"),k(),document.removeEventListener("mousedown",B,!0),document.removeEventListener("scroll",_,!0),window.removeEventListener("resize",H),u.focus({preventScroll:!0}),h?.(),h=null,c?.(!1))}function O(){f?L():I()}function M(P,N={}){let W=g;g=P,x(g),N.notify!==!1&&W!==P&&l?.(P)}function U(){return g}function J(P){let N=Array.from(b.querySelectorAll(".select-option:not(.disabled)"));if(!N.length)return;let W=N.findIndex(oe=>oe.classList.contains("active")),F=N[(W+(P===1?1:N.length-1))%N.length];N.forEach(oe=>oe.classList.remove("active")),F.classList.add("active"),F.focus({preventScroll:!0}),F.scrollIntoView({block:"nearest"})}function q(P){(P.key===" "||P.key==="Enter"||P.key==="ArrowDown")&&(P.preventDefault(),I())}function D(P){if(P.key==="Escape"){P.preventDefault(),L();return}if(P.key==="Enter"||P.key===" "){let N=b.querySelector(".select-option.active")||b.querySelector(".select-option.selected");N&&!N.classList.contains("disabled")&&(P.preventDefault(),M(N.dataset.value,{notify:!0}),L());return}if(P.key==="ArrowDown"){P.preventDefault(),J(1);return}if(P.key==="ArrowUp"){P.preventDefault(),J(-1);return}}function B(P){d.contains(P.target)||L()}function _(){f&&E()}function H(){f&&E()}function G(P){S=!!P,u.disabled=S,d.classList.toggle("disabled",S),S&&L()}function R(P){e.options=P,v(P),P.some(N=>N.value===g)||(g=null,x(null))}return d.append(u,b),u.addEventListener("pointerdown",P=>{P.preventDefault(),P.stopPropagation(),O()},{capture:!0}),u.addEventListener("keydown",q),b.addEventListener("keydown",D),v(o),n!=null?(g=n,x(g)):x(null),k(),G(S),{root:d,open:I,close:L,toggle:O,getValue:U,setValue:M,setOptions:R,setDisabled:G,destroy(){document.removeEventListener("mousedown",B,!0),document.removeEventListener("scroll",_,!0),window.removeEventListener("resize",H),h?.(),h=null}}}function jt(e={}){let{id:t,text:n="",htmlFor:o,tone:r="default",size:a="md",layout:i="inline",variant:s="text",required:l=!1,disabled:c=!1,tooltip:d,hint:u,icon:p,suffix:m,onClick:b}=e,f=w("div",{className:"lg-label-wrap",id:t}),g=w("label",{className:"lg-label",...o?{htmlFor:o}:{},...d?{title:d}:{}});if(p){let M=typeof p=="string"?w("span",{className:"lg-label-ico"},p):p;M.classList?.add?.("lg-label-ico"),g.appendChild(M)}let h=w("span",{className:"lg-label-text"},n);g.appendChild(h);let S=w("span",{className:"lg-label-req",ariaHidden:"true"}," *");l&&g.appendChild(S);let T=null;if(m!=null){T=typeof m=="string"?document.createTextNode(m):m;let M=w("span",{className:"lg-label-suffix"});M.appendChild(T),g.appendChild(M)}let x=u?w("div",{className:"lg-label-hint"},u):null;f.classList.add(`lg-label--${i}`),f.classList.add(`lg-label--${a}`),s==="title"&&f.classList.add("lg-label--title"),v(r),c&&f.classList.add("is-disabled"),f.appendChild(g),x&&f.appendChild(x),b&&g.addEventListener("click",b);function v(M){f.classList.remove("lg-label--default","lg-label--muted","lg-label--info","lg-label--success","lg-label--warning","lg-label--danger"),f.classList.add(`lg-label--${M}`)}function k(M){h.textContent=M}function E(M){v(M)}function I(M){M&&!S.isConnected&&g.appendChild(S),!M&&S.isConnected&&S.remove(),M?g.setAttribute("aria-required","true"):g.removeAttribute("aria-required")}function L(M){f.classList.toggle("is-disabled",!!M)}function O(M){!M&&x&&x.isConnected?x.remove():M&&x?x.textContent=M:M&&!x&&f.appendChild(w("div",{className:"lg-label-hint"},M))}return{root:f,labelEl:g,hintEl:x,setText:k,setTone:E,setRequired:I,setDisabled:L,setHint:O}}function mt(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function Ft(e,t){let n=document.createElement("span");n.className=`btn-ico btn-ico--${t}`;let o=mt(e);return o&&n.appendChild(o),n}function Ou(){let e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.marginRight="6px",t.style.display="none",t.style.flexShrink="0";let n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");let o=document.createElementNS(e,"animate");o.setAttribute("attributeName","stroke-dasharray"),o.setAttribute("values","1,150;90,150;90,150"),o.setAttribute("dur","1.5s"),o.setAttribute("repeatCount","indefinite");let r=document.createElementNS(e,"animateTransform");return r.setAttribute("attributeName","transform"),r.setAttribute("attributeType","XML"),r.setAttribute("type","rotate"),r.setAttribute("from","0 12 12"),r.setAttribute("to","360 12 12"),r.setAttribute("dur","1s"),r.setAttribute("repeatCount","indefinite"),n.appendChild(o),n.appendChild(r),t.appendChild(n),t}function Re(e={}){let{label:t="",id:n,variant:o="default",size:r="md",iconLeft:a,iconRight:i,loading:s=!1,tooltip:l,type:c="button",onClick:d,disabled:u=!1,fullWidth:p=!1}=e,m=w("button",{className:"btn",id:n});m.type=c,o==="primary"&&m.classList.add("primary"),r==="sm"&&m.classList.add("btn--sm"),l&&(m.title=l),p&&(m.style.width="100%");let b=Ou(),f=a?Ft(a,"left"):null,g=i?Ft(i,"right"):null,h=document.createElement("span");h.className="btn-label";let S=mt(t);S&&h.appendChild(S),!S&&(f||g)&&m.classList.add("btn--icon"),m.appendChild(b),f&&m.appendChild(f),m.appendChild(h),g&&m.appendChild(g);let T=u||s;m.disabled=T,m.setAttribute("aria-busy",String(!!s)),b.style.display=s?"inline-block":"none",d&&m.addEventListener("click",d);let x=m;return x.setLoading=v=>{m.setAttribute("aria-busy",String(!!v)),b.style.display=v?"inline-block":"none",m.disabled=v||u},x.setDisabled=v=>{m.disabled=v||m.getAttribute("aria-busy")==="true"},x.setLabel=v=>{h.replaceChildren();let k=mt(v);k&&h.appendChild(k),!k&&(f||g)?m.classList.add("btn--icon"):m.classList.remove("btn--icon")},x.setIconLeft=v=>{if(v==null){f?.remove();return}f?f.replaceChildren(mt(v)):m.insertBefore(Ft(v,"left"),h)},x.setIconRight=v=>{if(v==null){g?.remove();return}g?g.replaceChildren(mt(v)):m.appendChild(Ft(v,"right"))},x}function Hu(){try{let e=window.visualViewport,t=Math.round((e?.width??window.innerWidth)||0),n=Math.round((e?.height??window.innerHeight)||0);if(t&&n)return t>=n?"landscape":"portrait"}catch{}return"unknown"}function _u(){let e=navigator.userAgent||"",t=navigator.platform||"",n=navigator.userAgentData;if(n&&typeof n.platform=="string"){let r=n.platform.toLowerCase();if(r.includes("windows"))return"windows";if(r.includes("mac"))return"mac";if(r.includes("android"))return"android";if(r.includes("chrome os")||r.includes("cros"))return"chromeos";if(r.includes("linux"))return"linux";if(r.includes("ios"))return"ios"}return/iPhone|iPad|iPod/i.test(e)||t==="MacIntel"&&navigator.maxTouchPoints>1?"ios":/Android/i.test(e)?"android":/CrOS/i.test(e)?"chromeos":/Win/i.test(e)?"windows":/Mac/i.test(e)?"mac":/Linux/i.test(e)?"linux":"unknown"}function Nu(){let e=navigator.userAgent||"",t=navigator.userAgentData;if(t&&Array.isArray(t.brands)){let n=t.brands.map(i=>String(i.brand||i.brandName||i.brandVersion||i)),o=n.some(i=>/Edge/i.test(i)||/Microsoft Edge/i.test(i)),r=n.some(i=>/Opera/i.test(i)||/OPR/i.test(i)),a=n.some(i=>/Chrome|Chromium/i.test(i));if(o)return"Edge";if(r)return"Opera";if(a)return"Chrome";if(navigator.brave)return"Brave"}return/FxiOS/i.test(e)?"Firefox":/CriOS/i.test(e)?"Chrome":/EdgiOS/i.test(e)?"Edge":/OPiOS|OPR|Opera Mini|Opera/i.test(e)?"Opera":/Edg\//i.test(e)?"Edge":/OPR\//i.test(e)||/Opera/i.test(e)?"Opera":/Firefox/i.test(e)?"Firefox":/Safari/i.test(e)&&!/Chrome|Chromium|Edg|OPR/i.test(e)?"Safari":/Brave/i.test(e)||window.Brave||navigator.brave?"Brave":/Chrome|Chromium/i.test(e)?"Chrome":"Unknown"}function Gu(){let e=navigator.userAgent||"",t=navigator.userAgentData;return t&&typeof t.mobile=="boolean"?t.mobile?"mobile":"desktop":/Android|iPhone|iPad|iPod|Mobile/i.test(e)?"mobile":"desktop"}function be(){let e=(()=>{try{return window.top!==window.self}catch{return!0}})(),t=Du(document.referrer),o=e&&!!t&&/(^|\.)discord(app)?\.com$/i.test(t)?"discord":"web",r=Gu(),a=_u(),i=Nu(),s=window.screen||{},l=window.visualViewport,c=Math.round(window.innerWidth||document.documentElement.clientWidth||0),d=Math.round(window.innerHeight||document.documentElement.clientHeight||0),u=Math.round(l?.width??c),p=Math.round(l?.height??d),m=Math.round(s.width||0),b=Math.round(s.height||0),f=Math.round(s.availWidth||m),g=Math.round(s.availHeight||b),h=Number.isFinite(window.devicePixelRatio)?window.devicePixelRatio:1;return{surface:o,host:location.hostname,origin:location.origin,isInIframe:e,platform:r,browser:i,os:a,viewportWidth:c,viewportHeight:d,visualViewportWidth:u,visualViewportHeight:p,screenWidth:m,screenHeight:b,availScreenWidth:f,availScreenHeight:g,dpr:h,orientation:Hu()}}function $o(){return be().surface==="discord"}function Du(e){if(!e)return null;try{return new URL(e).hostname}catch{return null}}var zt=!1,gt=new Set;function Wu(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}var ge=e=>{let t=Wu();if(t){for(let n of gt)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function Bu(){zt||(zt=!0,window.addEventListener("keydown",ge,!0),window.addEventListener("keypress",ge,!0),window.addEventListener("keyup",ge,!0),document.addEventListener("keydown",ge,!0),document.addEventListener("keypress",ge,!0),document.addEventListener("keyup",ge,!0))}function Vu(){zt&&(zt=!1,window.removeEventListener("keydown",ge,!0),window.removeEventListener("keypress",ge,!0),window.removeEventListener("keyup",ge,!0),document.removeEventListener("keydown",ge,!0),document.removeEventListener("keypress",ge,!0),document.removeEventListener("keyup",ge,!0))}function ju(e){return gt.size===0&&Bu(),gt.add(e),()=>{gt.delete(e),gt.size===0&&Vu()}}function Fu(e,t,n,o){let r;switch(e){case"digits":r="0-9";break;case"alpha":r="\\p{L}";break;case"alphanumeric":r="\\p{L}0-9";break;default:return null}return t&&(r+=" "),n&&(r+="\\-"),o&&(r+="_"),new RegExp(`[^${r}]`,"gu")}function zu(e,t){return t?e.replace(t,""):e}function $u(e,t=0){if(!t)return e;let n;return((...o)=>{clearTimeout(n),n=setTimeout(()=>e(...o),t)})}function Uo(e={}){let{id:t,placeholder:n="",value:o="",mode:r="any",allowSpaces:a=!1,allowDashes:i=!1,allowUnderscore:s=!1,maxLength:l,blockGameKeys:c=!0,debounceMs:d=0,onChange:u,onEnter:p,label:m}=e,b=w("div",{className:"lg-input-wrap"}),f=w("input",{className:"input",id:t,placeholder:n});if(typeof l=="number"&&l>0&&(f.maxLength=l),o&&(f.value=o),m){let M=w("div",{className:"lg-input-label"},m);b.appendChild(M)}b.appendChild(f);let g=Fu(r,a,i,s),h=()=>{let M=f.selectionStart??f.value.length,U=f.value.length,J=zu(f.value,g);if(J!==f.value){f.value=J;let q=U-J.length,D=Math.max(0,M-q);f.setSelectionRange(D,D)}},S=$u(()=>u?.(f.value),d);f.addEventListener("input",()=>{h(),S()}),f.addEventListener("paste",()=>queueMicrotask(()=>{h(),S()})),f.addEventListener("keydown",M=>{M.key==="Enter"&&p?.(f.value)});let T=c?ju(f):()=>{};function x(){return f.value}function v(M){f.value=M??"",h(),S()}function k(){f.focus()}function E(){f.blur()}function I(M){f.disabled=!!M}function L(){return document.activeElement===f}function O(){T()}return{root:b,input:f,getValue:x,setValue:v,focus:k,blur:E,setDisabled:I,isFocused:L,destroy:O}}function ne(e,t,n){return Math.min(n,Math.max(t,e))}function bt({h:e,s:t,v:n,a:o}){let r=(e%360+360)%360/60,a=n*t,i=a*(1-Math.abs(r%2-1)),s=0,l=0,c=0;switch(Math.floor(r)){case 0:s=a,l=i;break;case 1:s=i,l=a;break;case 2:l=a,c=i;break;case 3:l=i,c=a;break;case 4:s=i,c=a;break;default:s=a,c=i;break}let u=n-a,p=Math.round((s+u)*255),m=Math.round((l+u)*255),b=Math.round((c+u)*255);return{r:ne(p,0,255),g:ne(m,0,255),b:ne(b,0,255),a:ne(o,0,1)}}function Ko({r:e,g:t,b:n,a:o}){let r=ne(e,0,255)/255,a=ne(t,0,255)/255,i=ne(n,0,255)/255,s=Math.max(r,a,i),l=Math.min(r,a,i),c=s-l,d=0;c!==0&&(s===r?d=60*((a-i)/c%6):s===a?d=60*((i-r)/c+2):d=60*((r-a)/c+4)),d<0&&(d+=360);let u=s===0?0:c/s;return{h:d,s:u,v:s,a:ne(o,0,1)}}function En({r:e,g:t,b:n}){let o=r=>ne(Math.round(r),0,255).toString(16).padStart(2,"0");return`#${o(e)}${o(t)}${o(n)}`.toUpperCase()}function Uu({r:e,g:t,b:n,a:o}){let r=ne(Math.round(o*255),0,255);return`${En({r:e,g:t,b:n,a:o})}${r.toString(16).padStart(2,"0")}`.toUpperCase()}function ft({r:e,g:t,b:n,a:o}){let r=Math.round(o*1e3)/1e3;return`rgba(${e}, ${t}, ${n}, ${r})`}function Je(e){let t=e.trim();if(!t||(t.startsWith("#")&&(t=t.slice(1)),![3,4,6,8].includes(t.length))||!/^[0-9a-fA-F]+$/.test(t))return null;(t.length===3||t.length===4)&&(t=t.split("").map(i=>i+i).join(""));let n=255;t.length===8&&(n=parseInt(t.slice(6,8),16),t=t.slice(0,6));let o=parseInt(t.slice(0,2),16),r=parseInt(t.slice(2,4),16),a=parseInt(t.slice(4,6),16);return{r:o,g:r,b:a,a:n/255}}function Mn(e){if(!e)return null;let t=e.trim();if(t.startsWith("#"))return Je(t);let n=t.match(/^rgba?\(([^)]+)\)$/i);if(n){let o=n[1].split(",").map(l=>l.trim());if(o.length<3)return null;let r=Number(o[0]),a=Number(o[1]),i=Number(o[2]),s=o[3]!=null?Number(o[3]):1;return[r,a,i,s].some(l=>Number.isNaN(l))?null:{r,g:a,b:i,a:s}}return null}function Ku(e,t){let n=Mn(e)??Je(e??"")??{r:244,g:67,b:54,a:1};return typeof t=="number"&&(n.a=ne(t,0,1)),Ko(n)}function qu(e){return`#${e.trim().replace(/[^0-9a-fA-F#]/g,"").replace(/#/g,"")}`.slice(0,9).toUpperCase()}function Ju(e){let t=e.trim();return t&&(/^rgba?\s*\(/i.test(t)?t=t.replace(/^rgba?/i,"rgba"):(t=t.replace(/^\(?(.*)\)?$/,"$1"),t=`rgba(${t})`),t=t.replace(/\s*\(\s*/,"("),t=t.replace(/\s*\)\s*$/,")"),t=t.replace(/\s*,\s*/g,", "),t)}function Ge(e){let t=bt(e),n=bt({...e,a:1});return{hsva:{...e},hex:En(n),hexa:Uu(t),rgba:ft(t),alpha:e.a}}function qo(e={}){let{id:t,label:n="Color",value:o,alpha:r,defaultExpanded:a=!1,detectMobile:i,onInput:s,onChange:l}=e,d=i?i():be().platform==="mobile",u=Ku(o,r),p=Le({id:t,className:"color-picker",title:n,padding:d?"md":"lg",variant:"soft",expandable:!d,defaultExpanded:!d&&a});p.classList.add(d?"color-picker--mobile":"color-picker--desktop");let m=p.querySelector(".card-header");m&&m.classList.add("color-picker__header");let b=m?.querySelector(".card-title"),f=w("button",{className:"color-picker__preview",type:"button",title:`Preview ${n}`,"aria-label":`Change ${n}`});b?b.prepend(f):m?m.prepend(f):p.prepend(f);let g=p.querySelector(".card-toggle");!d&&g&&f.addEventListener("click",()=>{p.classList.contains("card--collapsed")&&g.click()});let h=p.querySelector(".card-collapse"),S=null,T=null,x=null,v=null,k=null,E=null,I=null,L=null,O=null,M="hex";function U(_){let H=Ge(u);_==="input"?s?.(H):l?.(H)}function J(){let _=Ge(u);if(f.style.setProperty("--cp-preview-color",_.rgba),f.setAttribute("aria-label",`${n}: ${_.hexa}`),!d&&S&&T&&x&&v&&k&&E&&I){let H=bt({...u,s:1,v:1,a:1}),G=ft(H);S.style.setProperty("--cp-palette-hue",G),T.style.left=`${u.s*100}%`,T.style.top=`${(1-u.v)*100}%`,x.style.setProperty("--cp-alpha-gradient",`linear-gradient(180deg, ${ft({...H,a:1})} 0%, ${ft({...H,a:0})} 100%)`),v.style.top=`${(1-u.a)*100}%`,k.style.setProperty("--cp-hue-color",ft(bt({...u,v:1,s:1,a:1}))),E.style.left=`${u.h/360*100}%`;let R=u.a===1?_.hex:_.hexa,P=_.rgba,N=M==="hex"?R:P;I!==document.activeElement&&(I.value=N),I.setAttribute("aria-label",`${M.toUpperCase()} code for ${n}`),I.placeholder=M==="hex"?"#RRGGBB or #RRGGBBAA":"rgba(0, 0, 0, 1)",M==="hex"?I.maxLength=9:I.removeAttribute("maxLength"),I.dataset.mode=M,L&&(L.textContent=M.toUpperCase(),L.setAttribute("aria-label",M==="hex"?"Passer en saisie RGBA":"Revenir en saisie HEX"),L.setAttribute("aria-pressed",M==="rgba"?"true":"false"),L.classList.toggle("is-alt",M==="rgba"))}O&&O!==document.activeElement&&(O.value=_.hex)}function q(_,H=null){u={h:(_.h%360+360)%360,s:ne(_.s,0,1),v:ne(_.v,0,1),a:ne(_.a,0,1)},J(),H&&U(H)}function D(_,H=null){q(Ko(_),H)}function B(_,H,G){_.addEventListener("pointerdown",R=>{R.preventDefault();let P=R.pointerId,N=F=>{F.pointerId===P&&H(F)},W=F=>{F.pointerId===P&&(document.removeEventListener("pointermove",N),document.removeEventListener("pointerup",W),document.removeEventListener("pointercancel",W),G?.(F))};H(R),document.addEventListener("pointermove",N),document.addEventListener("pointerup",W),document.addEventListener("pointercancel",W)})}if(!d&&h){let _=h.querySelector(".card-body");if(_){_.classList.add("color-picker__body"),T=w("div",{className:"color-picker__palette-cursor"}),S=w("div",{className:"color-picker__palette"},T),v=w("div",{className:"color-picker__alpha-thumb"}),x=w("div",{className:"color-picker__alpha"},v),E=w("div",{className:"color-picker__hue-thumb"}),k=w("div",{className:"color-picker__hue"},E);let H=w("div",{className:"color-picker__main"},S,x),G=w("div",{className:"color-picker__hue-row"},k),R=Uo({blockGameKeys:!0});I=R.input,I.classList.add("color-picker__hex-input"),I.value="",I.maxLength=9,I.spellcheck=!1,I.inputMode="text",I.setAttribute("aria-label",`Hex code for ${n}`),L=w("button",{type:"button",className:"color-picker__mode-btn",textContent:"HEX","aria-pressed":"false","aria-label":"Passer en saisie RGBA"}),R.root.classList.add("color-picker__hex-wrap");let P=w("div",{className:"color-picker__hex-row"},L,R.root);_.replaceChildren(H,G,P),B(S,W=>{if(!S||!T)return;let F=S.getBoundingClientRect(),oe=ne((W.clientX-F.left)/F.width,0,1),yn=ne((W.clientY-F.top)/F.height,0,1);q({...u,s:oe,v:1-yn},"input")},()=>U("change")),B(x,W=>{if(!x)return;let F=x.getBoundingClientRect(),oe=ne((W.clientY-F.top)/F.height,0,1);q({...u,a:1-oe},"input")},()=>U("change")),B(k,W=>{if(!k)return;let F=k.getBoundingClientRect(),oe=ne((W.clientX-F.left)/F.width,0,1);q({...u,h:oe*360},"input")},()=>U("change")),L.addEventListener("click",()=>{if(M=M==="hex"?"rgba":"hex",I){let W=Ge(u);I.value=M==="hex"?u.a===1?W.hex:W.hexa:W.rgba}J(),I?.focus(),I?.select()}),I.addEventListener("input",()=>{if(M==="hex"){let W=qu(I.value);if(W!==I.value){let F=I.selectionStart??W.length;I.value=W,I.setSelectionRange(F,F)}}});let N=()=>{let W=I.value;if(M==="hex"){let F=Je(W);if(!F){I.value=u.a===1?Ge(u).hex:Ge(u).hexa;return}let oe=W.startsWith("#")?W.slice(1):W,yn=oe.length===4||oe.length===8;F.a=yn?F.a:u.a,D(F,"change")}else{let F=Ju(W),oe=Mn(F);if(!oe){I.value=Ge(u).rgba;return}D(oe,"change")}};I.addEventListener("change",N),I.addEventListener("blur",N),I.addEventListener("keydown",W=>{W.key==="Enter"&&(N(),I.blur())})}}return d&&(h&&h.remove(),O=w("input",{className:"color-picker__native",type:"color",value:En(bt({...u,a:1}))}),f.addEventListener("click",()=>O.click()),O.addEventListener("input",()=>{let _=Je(O.value);_&&(_.a=u.a,D(_,"input"),U("change"))}),p.appendChild(O)),J(),{root:p,isMobile:d,getValue:()=>Ge(u),setValue:(_,H)=>{let G=Mn(_)??Je(_)??Je("#FFFFFF");G&&(typeof H=="number"&&(G.a=H),D(G,null))}}}function Xu(e){try{return!!e.isSecureContext}catch{return!1}}function In(e){let t=e?.getRootNode?.();return t&&(t instanceof Document||t.host)?t:document}function Jo(){let e=navigator.platform||"",t=navigator.userAgent||"";return/Mac|iPhone|iPad|iPod/i.test(e)||/Mac OS|iOS/i.test(t)}async function Yu(){try{let e=await navigator.permissions?.query?.({name:"clipboard-write"});return e?e.state==="granted"||e.state==="prompt":!0}catch{return!0}}function Qu(e,t){let n=document.createElement("textarea");return n.value=e,n.setAttribute("readonly","true"),n.style.position="fixed",n.style.opacity="0",n.style.pointerEvents="none",n.style.top="0",t.appendChild?t.appendChild(n):document.body.appendChild(n),n}function Zu(e){try{let t=window.getSelection?.();if(!t)return!1;let n=document.createRange();return n.selectNodeContents(e),t.removeAllRanges(),t.addRange(n),!0}catch{return!1}}async function ed(e){if(!("clipboard"in navigator))return{ok:!1,method:"clipboard-write"};if(!Xu(A))return{ok:!1,method:"clipboard-write"};if(!await Yu())return{ok:!1,method:"clipboard-write"};try{return await navigator.clipboard.writeText(e),{ok:!0,method:"clipboard-write"}}catch{return{ok:!1,method:"clipboard-write"}}}function td(e,t){try{let n=t||In(),o=Qu(e,n);o.focus(),o.select(),o.setSelectionRange(0,o.value.length);let r=!1;try{r=document.execCommand("copy")}catch{r=!1}return o.remove(),{ok:r,method:"execCommand"}}catch{return{ok:!1,method:"execCommand"}}}function nd(e,t){if(!t)return{ok:!1,method:"selection"};let n=t.textContent??"",o=!1;if(n!==e)try{t.textContent=e,o=!0}catch{}let r=Zu(t);o&&setTimeout(()=>{try{t.textContent=n}catch{}},80);let a=Jo()?"\u2318C pour copier":"Ctrl+C pour copier";return{ok:r,method:"selection",hint:a}}async function od(e,t={}){let n=(e??"").toString();if(!n.length)return{ok:!1,method:"noop"};let o=await ed(n);if(o.ok)return o;let r=t.injectionRoot||In(t.valueNode||void 0),a=td(n,r);if(a.ok)return a;let i=nd(n,t.valueNode||null);if(i.ok)return i;if(!t.disablePromptFallback)try{return window.prompt($o()?"Copie manuelle (Discord bloque clipboard):":"Copie manuelle:",n),{ok:!0,method:"prompt"}}catch{}return{ok:!1,method:"noop"}}function Xo(e,t,n={}){let o=r=>{if(n.showTip){n.showTip(r);return}try{e.setAttribute("aria-label",r);let a=document.createElement("div");a.textContent=r,a.style.position="absolute",a.style.top="-28px",a.style.right="0",a.style.padding="4px 8px",a.style.borderRadius="8px",a.style.fontSize="12px",a.style.background="color-mix(in oklab, var(--bg) 85%, transparent)",a.style.border="1px solid var(--border)",a.style.color="var(--fg)",a.style.pointerEvents="none",a.style.opacity="0",a.style.transition="opacity .12s";let i=In(e);i.appendChild?i.appendChild(a):document.body.appendChild(a);let s=e.getBoundingClientRect();a.style.left=`${s.right-8}px`,a.style.top=`${s.top-28}px`,requestAnimationFrame(()=>a.style.opacity="1"),setTimeout(()=>{a.style.opacity="0",setTimeout(()=>a.remove(),150)},1200)}catch{}};e.addEventListener("click",async r=>{r.stopPropagation();let a=(t()??"").toString(),i=await od(a,{valueNode:n.valueNode??null,injectionRoot:n.injectionRoot??null,disablePromptFallback:n.disablePromptFallback??!1});n.onResult?.(i),i.ok?i.method==="clipboard-write"||i.method==="execCommand"||i.method==="prompt"?o("Copi\xE9"):i.method==="selection"&&o(i.hint||(Jo()?"\u2318C pour copier":"Ctrl+C pour copier")):o("Impossible de copier")})}var Oe={light:{"--bg":"rgba(255,255,255,0.7)","--fg":"#0f172a","--muted":"rgba(15,23,42,0.06)","--soft":"rgba(15,23,42,0.04)","--accent":"#2563eb","--border":"rgba(15,23,42,0.12)","--shadow":"rgba(2,6,23,.2)","--tab-bg":"#ffffff","--tab-fg":"#0f172a","--pill-from":"#4f46e5","--pill-to":"#06b6d4"},dark:{"--bg":"rgba(10,12,18,0.6)","--fg":"#e5e7eb","--muted":"rgba(229,231,235,0.08)","--soft":"rgba(229,231,235,0.05)","--accent":"#60a5fa","--border":"rgba(148,163,184,0.2)","--shadow":"rgba(0,0,0,.45)","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#e5e7eb","--pill-from":"#6366f1","--pill-to":"#06b6d4"},sepia:{"--bg":"rgba(247,242,231,0.72)","--fg":"#3b2f2f","--muted":"rgba(59,47,47,0.06)","--soft":"rgba(59,47,47,0.04)","--accent":"#b07d62","--border":"rgba(59,47,47,0.14)","--shadow":"rgba(0,0,0,.18)","--tab-bg":"#fff","--tab-fg":"#3b2f2f","--pill-from":"#b07d62","--pill-to":"#d4a373"},forest:{"--bg":"rgba(14,24,18,0.62)","--fg":"#e7f5e9","--muted":"rgba(231,245,233,0.08)","--soft":"rgba(231,245,233,0.05)","--accent":"#34d399","--border":"rgba(231,245,233,0.16)","--shadow":"rgba(0,0,0,.5)","--tab-bg":"rgba(255,255,255,0.06)","--tab-fg":"#e7f5e9","--pill-from":"#10b981","--pill-to":"#84cc16"},violet:{"--bg":"rgba(23, 16, 42, 0.68)","--fg":"#f5f3ff","--muted":"rgba(245,243,255,0.08)","--soft":"rgba(245,243,255,0.05)","--accent":"#a855f7","--border":"rgba(216,180,254,0.22)","--shadow":"rgba(12,3,30,.55)","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#ede9fe","--pill-from":"#a855f7","--pill-to":"#f472b6"},ocean:{"--bg":"rgba(10, 34, 46, 0.66)","--fg":"#e0f7ff","--muted":"rgba(224,247,255,0.07)","--soft":"rgba(224,247,255,0.05)","--accent":"#38bdf8","--border":"rgba(125, 211, 252, 0.22)","--shadow":"rgba(0, 16, 32, .52)","--tab-bg":"rgba(56,189,248,0.14)","--tab-fg":"#e0f7ff","--pill-from":"#0ea5e9","--pill-to":"#14b8a6"},ember:{"--bg":"rgba(34,18,10,0.64)","--fg":"#fff7ed","--muted":"rgba(255,247,237,0.08)","--soft":"rgba(255,247,237,0.05)","--accent":"#f97316","--border":"rgba(255, 159, 92, 0.24)","--shadow":"rgba(16,6,2,.52)","--tab-bg":"rgba(255,247,237,0.09)","--tab-fg":"#fff7ed","--pill-from":"#fb923c","--pill-to":"#facc15"}};function Ln(e){let{host:t,themes:n,initialTheme:o,onThemeChange:r}=e,a=o,i=null,s=!1;function l(d){let u=n[d]||n[a]||{};s&&t.classList.add("theme-anim");for(let[p,m]of Object.entries(u))t.style.setProperty(p,m);s?(i!==null&&clearTimeout(i),i=A.setTimeout(()=>{t.classList.remove("theme-anim"),i=null},320)):s=!0,a=d,r?.(d)}function c(){return a}return l(o),{applyTheme:l,getCurrentTheme:c}}var $t={ui:{expandedCards:{style:!1,system:!1}}};async function Yo(){let e=await pt("tab-settings",{version:1,defaults:$t,sanitize:r=>({ui:{expandedCards:Dt($t.ui.expandedCards,r.ui?.expandedCards)}})});function t(r){let a=e.get();e.update({ui:{...a.ui,...r,expandedCards:Dt(a.ui.expandedCards,r.expandedCards)}})}function n(r,a){let i=e.get();e.update({ui:{...i.ui,expandedCards:{...i.ui.expandedCards,[r]:!!a}}})}function o(r){let a=e.get();n(r,!a.ui.expandedCards[r])}return{get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:o}}function Qo(e){return e.replace(/[_-]+/g," ").replace(/^\w/,t=>t.toUpperCase())}function rd(){return Object.keys(Oe).map(e=>({value:e,label:Qo(e)}))}var ad=["--bg","--fg","--accent","--muted","--soft","--border","--shadow","--tab-bg","--tab-fg","--pill-from","--pill-to"];function id(e){return Qo(e.replace(/^--/,""))}function sd(e){return e.alpha<1?e.rgba:e.hex}var Ut=class extends Ne{constructor(n){super({id:"tab-settings",label:"Settings"});this.deps=n}async build(n){let o=this.createGrid("12px");o.id="settings",n.appendChild(o);let r;try{r=await Yo()}catch{r={get:()=>$t,set:()=>{},save:()=>{},setUI:()=>{},setCardExpanded:()=>{},toggleCard:()=>{}}}let a=r.get(),i=Object.keys(Oe),s=this.deps.getCurrentTheme?.()??this.deps.initialTheme,l=i.includes(s)?s:i[0]??"dark",c=l,d=jt({text:"Theme",tone:"muted",size:"lg"}),u=qe({options:rd(),value:l,onChange:f=>{c=f,this.deps.applyTheme(f),this.renderThemePickers(f,p,c)}}),p=w("div",{className:"settings-theme-grid"}),m=Le({title:"Style",padding:"lg",expandable:!0,defaultExpanded:!!a.ui.expandedCards.style,onExpandChange:f=>r.setCardExpanded("style",f)},w("div",{className:"kv settings-theme-row"},d.root,u.root),p);this.renderThemePickers(l,p,c);let b=this.createEnvCard({defaultExpanded:!!a.ui.expandedCards.system,onExpandChange:f=>r.setCardExpanded("system",f)});o.appendChild(m),o.appendChild(b)}renderThemePickers(n,o,r){let a=Oe[n];if(o.replaceChildren(),!!a)for(let i of ad){let s=a[i];if(s==null)continue;let l=qo({label:id(i),value:s,defaultExpanded:!1,onInput:c=>this.updateThemeVar(n,i,c,r),onChange:c=>this.updateThemeVar(n,i,c,r)});o.appendChild(l.root)}}updateThemeVar(n,o,r,a){let i=Oe[n];i&&(i[o]=sd(r),a===n&&this.deps.applyTheme(n))}createEnvCard(n){let o=n?.defaultExpanded??!1,r=n?.onExpandChange,a=(h,S)=>{let T=w("div",{className:"kv kv--inline-mobile"}),x=w("label",{},h),v=w("div",{className:"ro"});return typeof S=="string"?v.textContent=S:v.append(S),T.append(x,v),T},i=w("code",{},"\u2014"),s=w("span",{},"\u2014"),l=w("span",{},"\u2014"),c=w("span",{},"\u2014"),d=w("span",{},"\u2014"),u=w("span",{},"\u2014"),p=()=>{let h=be();l.textContent=h.surface,c.textContent=h.platform,d.textContent=h.browser??"Unknown",u.textContent=h.os??"Unknown",i.textContent=h.host,s.textContent=h.isInIframe?"Yes":"No"},m=Re({label:"Copy JSON",variant:"primary",size:"sm"});Xo(m,()=>{let h=be();return JSON.stringify(h,null,2)});let b=w("div",{style:"width:100%;display:flex;justify-content:center;"},m),f=Le({title:"System",variant:"soft",padding:"lg",footer:b,expandable:!0,defaultExpanded:o,onExpandChange:r},a("Surface",l),a("Platform",c),a("Browser",d),a("OS",u),a("Host",i),a("Iframe",s)),g=()=>{document.hidden||p()};return document.addEventListener("visibilitychange",g),p(),this.addCleanup(()=>document.removeEventListener("visibilitychange",g)),f}};function ht(e){return e<10?`0${e}`:String(e)}function se(e){let t=/^(\d{1,2}):(\d{2})$/.exec((e||"").trim());if(!t)return 0;let n=Math.max(0,Math.min(23,parseInt(t[1],10)||0)),o=Math.max(0,Math.min(59,parseInt(t[2],10)||0));return n*60+o}function Rn(e){let t=Math.max(0,Math.min(1439,e|0)),n=Math.floor(t/60),o=t%60;return`${ht(n)}:${ht(o)}`}function ke(e,t){let n=se(e),o=Math.max(0,Math.min(1439,n)),r=Math.floor(o/t)*t;return Rn(r)}function ld(e){let t=Math.floor(e/60),n=e%60,o=t>=12;return{h12:t%12||12,m:n,pm:o}}function cd(e,t,n){return(e%12+(n?12:0))*60+t}function ud(e){return e.platform==="mobile"||e.os==="ios"||e.os==="android"}function Zo(e={}){let{id:t,start:n="08:00",end:o="23:00",stepMinutes:r=5,disabled:a=!1,allowOvernight:i=!0,labels:s={from:"From",to:"To"},picker:l="auto",format:c="auto",useNativeOn:d,onChange:u}=e,p={start:ke(n,r),end:ke(o,r)},m=w("div",{className:"time-range",id:t});m.classList.add("time-range--stacked");let b=be();if(l==="native"||l==="auto"&&(d?.(b)??ud(b)))return g();return h();function g(){let x=w("div",{className:"time-range-field",role:"group"}),v=w("span",{className:"time-range-label"},s.from||"From"),k=w("input",{className:"input time-range-input",type:"time",step:String(r*60),value:p.start}),E=w("div",{className:"time-range-field",role:"group"}),I=w("span",{className:"time-range-label"},s.to||"To"),L=w("input",{className:"input time-range-input",type:"time",step:String(r*60),value:p.end});x.append(v,k),E.append(I,L),m.append(x,E);function O(){k.value=p.start,L.value=p.end}function M(){u?.(J())}function U(_){let H=_.target,G=H===k,R=ke(H.value||(G?p.start:p.end),r);G?(p.start=R,!i&&se(p.end)<se(p.start)&&(p.end=p.start)):(p.end=R,!i&&se(p.end)<se(p.start)&&(p.start=p.end)),O(),M()}k.addEventListener("change",U),k.addEventListener("blur",U),L.addEventListener("change",U),L.addEventListener("blur",U),a&&D(!0);function J(){return{...p}}function q(_){if(_.start&&(p.start=ke(_.start,r)),_.end&&(p.end=ke(_.end,r)),!i){let H=se(p.start);se(p.end)<H&&(p.end=p.start)}O(),M()}function D(_){k.disabled=_,L.disabled=_,m.classList.toggle("is-disabled",!!_)}function B(){k.removeEventListener("change",U),k.removeEventListener("blur",U),L.removeEventListener("change",U),L.removeEventListener("blur",U),m.replaceChildren()}return{root:m,getValue:J,setValue:q,setDisabled:D,destroy:B}}function h(){let x=w("label",{className:"time-range-field"}),v=w("span",{className:"time-range-label"},s.from||"From"),k=w("label",{className:"time-range-field"}),E=w("span",{className:"time-range-label"},s.to||"To"),I=c==="12h"||c==="auto"&&T(),L=S(p.start,I),O=S(p.end,I);x.append(v,L.container),k.append(E,O.container),m.append(x,k),a&&q(!0),J(),L.onAnyChange(()=>{p.start=L.to24h(r),!i&&se(p.end)<se(p.start)&&(p.end=p.start,O.setFrom24h(p.end)),u?.(M())}),O.onAnyChange(()=>{p.end=O.to24h(r),!i&&se(p.end)<se(p.start)&&(p.start=p.end,L.setFrom24h(p.start)),u?.(M())});function M(){return{...p}}function U(B){if(B.start&&(p.start=ke(B.start,r)),B.end&&(p.end=ke(B.end,r)),!i){let _=se(p.start);se(p.end)<_&&(p.end=p.start)}J(),u?.(M())}function J(){L.setFrom24h(p.start),O.setFrom24h(p.end)}function q(B){L.setDisabled(B),O.setDisabled(B),m.classList.toggle("is-disabled",!!B)}function D(){L.destroy(),O.destroy(),m.replaceChildren()}return{root:m,getValue:M,setValue:U,setDisabled:q,destroy:D}}function S(x,v){let k=w("div",{className:"time-picker"}),E=(P,N=2)=>{P.classList.add("time-picker-compact"),P.style.setProperty("--min-ch",String(N))},I=v?Array.from({length:12},(P,N)=>{let W=N+1;return{value:String(W),label:ht(W)}}):Array.from({length:24},(P,N)=>({value:String(N),label:ht(N)})),L=qe({size:"sm",options:I,placeholder:"HH",onChange:()=>B()});E(L.root,2);let O=Math.max(1,Math.min(30,Math.floor(e.stepMinutes??5))),M=Array.from({length:Math.floor(60/O)},(P,N)=>{let W=N*O;return{value:String(W),label:ht(W)}}),U=qe({size:"sm",options:M,placeholder:"MM",onChange:()=>B()});E(U.root,2);let J=v?qe({size:"sm",options:[{value:"am",label:"AM"},{value:"pm",label:"PM"}],value:"am",onChange:()=>B()}):null;J&&E(J.root,3),k.append(L.root,U.root,...J?[J.root]:[]);let q=null;function D(P){q=P}function B(){q?.()}function _(P){let N=se(P);if(v){let W=ld(N);L.setValue(String(W.h12),{notify:!1}),U.setValue(String(Math.floor(W.m/O)*O),{notify:!1}),J.setValue(W.pm?"pm":"am",{notify:!1})}else{let W=Math.floor(N/60),F=N%60;L.setValue(String(W),{notify:!1}),U.setValue(String(Math.floor(F/O)*O),{notify:!1})}}function H(P){let N=parseInt(U.getValue()||"0",10)||0;if(v){let W=parseInt(L.getValue()||"12",10)||12,F=(J?.getValue()||"am")==="pm",oe=cd(W,N,F);return ke(Rn(oe),P)}else{let F=(parseInt(L.getValue()||"0",10)||0)*60+N;return ke(Rn(F),P)}}function G(P){L.setDisabled(P),U.setDisabled(P),J?.setDisabled(P),k.classList.toggle("is-disabled",!!P)}function R(){k.replaceChildren()}return{container:k,onAnyChange:D,setFrom24h:_,to24h:H,setDisabled:G,destroy:R}}function T(){try{let v=new Intl.DateTimeFormat(void 0,{hour:"numeric"}).format(new Date(2020,1,1,13));return/AM|PM|am|pm/.test(v)}catch{return!1}}}function tr(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function dd(e){let t=tr(e);t=t.replace(/\/\*[\s\S]*?\*\//g,r=>`<span class="tok tok-comm">${r}</span>`),t=t.replace(/(^|\s)(\/\/.*)$/gm,(r,a,i)=>`${a}<span class="tok tok-comm">${i}</span>`),t=t.replace(/`[^`\\]*(?:\\.[^`\\]*)*`/g,r=>`<span class="tok tok-str">${r}</span>`),t=t.replace(/'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/g,r=>`<span class="tok tok-str">${r}</span>`),t=t.replace(/\b(?:0[xX][0-9a-fA-F]+|0[bB][01]+|0[oO][0-7]+|\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?(?:[eE][+-]?\d+)?)\b/g,r=>`<span class="tok tok-num">${r}</span>`);let n=["break","case","catch","class","const","continue","debugger","default","delete","do","else","export","extends","finally","for","function","if","import","in","instanceof","let","new","return","super","switch","this","throw","try","typeof","var","void","while","with","yield","await","enum","implements","interface","package","private","protected","public","static","as","from","of"],o=new RegExp(`\\b(?:${n.join("|")})\\b`,"g");return t=t.replace(o,r=>`<span class="tok tok-kw">${r}</span>`),t=t.replace(/\b(?:true|false|null|undefined|NaN|Infinity)\b/g,r=>`<span class="tok tok-lit">${r}</span>`),t}function er(e){if(!e)return new Date().toLocaleTimeString();let t=e instanceof Date?e:new Date(e);if(isNaN(t.getTime()))return String(e);let n=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0"),r=String(t.getSeconds()).padStart(2,"0");return`${n}:${o}:${r}`}function nr(e={}){let{id:t,className:n,height:o,maxLines:r=500,wrap:a=!1,mode:i="plain",showTimestamps:s=!0,autoScroll:l=!0}=e,c=w("div",{className:"log",id:t});n&&c.classList.add(...n.split(" ").filter(Boolean)),a&&c.classList.add("log--wrap");let d=w("div",{className:"log-viewport"}),u=w("div",{className:"log-lines"});d.appendChild(u),c.appendChild(d),o!=null&&(c.style.blockSize=typeof o=="number"?`${o}px`:String(o));let p=i,m=r,b=new Map;function f(D){return p==="js"?dd(D):tr(D)}function g(D){return D?b.get(D)?.body??u:u}function h(D){let B=typeof D=="string"?{text:D}:D||{text:""},_=g(B.groupKey);if(B.key){let R=Array.from(_.querySelectorAll(`.log-line[data-key="${B.key}"]`)).pop();if(R){B.level&&(R.classList.remove("log-level--debug","log-level--info","log-level--warn","log-level--error"),R.classList.add(`log-level--${B.level}`));let P=R.querySelector(".log-time");s&&P&&(P.textContent=er(B.time));let N=R.querySelector(".log-text");N&&(N.innerHTML=f(B.text)),l&&E();return}}let H=document.createElement("div");if(H.className="log-line",B.level&&H.classList.add(`log-level--${B.level}`),B.key&&(H.dataset.key=B.key),s){let R=document.createElement("span");R.className="log-time",R.textContent=er(B.time),H.appendChild(R)}let G=document.createElement("span");G.className="log-text",G.innerHTML=f(B.text),H.appendChild(G),_.appendChild(H),O(),l&&E()}function S(D){for(let B of D)h(B)}function T(){u.replaceChildren(),b.clear()}function x(D){p=D,E()}function v(D){c.classList.toggle("log--wrap",!!D),E()}function k(D){m=Math.max(1,Math.floor(D||1))}function E(){requestAnimationFrame(()=>{d.scrollTop=d.scrollHeight})}function I(){let D=0;for(let B=0;B<u.children.length;B+=1){let _=u.children[B];(_.classList.contains("log-line")||_.classList.contains("log-group"))&&(D+=1)}return D}function L(){let D=u.firstElementChild;if(!D)return!1;if(D.classList.contains("log-group")){let B=D.dataset.groupKey;B&&b.delete(B)}return D.remove(),!0}function O(){let D=I();for(;D>m&&L();)D--}function M(D,B){let _=B?.key||`g-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,6)}`;if(b.has(_))return _;let H=document.createElement("div");H.className="log-group",H.dataset.groupKey=_;let G=document.createElement("div");G.className="log-group-header",G.textContent=D;let R=document.createElement("div");R.className="log-group-body",H.append(G,R),u.appendChild(H),b.set(_,{root:H,header:G,body:R});let P=N=>{H.classList.toggle("is-collapsed",!!N)};return B?.collapsed&&P(!0),G.addEventListener("click",()=>P(!H.classList.contains("is-collapsed"))),l&&E(),_}function U(D){b.get(D)}function J(D,B){let _=b.get(D);_&&(B==null?_.root.classList.toggle("is-collapsed"):_.root.classList.toggle("is-collapsed",!!B))}let q=c;return q.add=h,q.addMany=S,q.clear=T,q.setMode=x,q.setWrap=v,q.setMaxLines=k,q.scrollToEnd=E,q.beginGroup=M,q.endGroup=U,q.toggleGroup=J,q}var le={nativeCtor:null,captured:[],latestOpen:null},or=Symbol.for("ariesmod.ws.capture.wrapped"),rr=Symbol.for("ariesmod.ws.capture.native"),ar=1;function On(e){return!!e&&e.readyState===ar}function pd(){if(On(le.latestOpen))return le.latestOpen;for(let e=le.captured.length-1;e>=0;e--){let t=le.captured[e];if(On(t))return t}return null}function md(e,t){le.captured.push(e),le.captured.length>25&&le.captured.splice(0,le.captured.length-25);let n=()=>{le.latestOpen=e,t&&console.log("[WS] captured socket opened",e.url)};e.addEventListener("open",n),e.addEventListener("close",()=>{le.latestOpen===e&&(le.latestOpen=null),t&&console.log("[WS] captured socket closed",e.url)}),e.readyState===ar&&n()}function ir(e=A,t={}){let n=!!t.debug,o=e?.WebSocket;if(typeof o!="function")return()=>{};if(o[or])return le.nativeCtor=o[rr]??le.nativeCtor??null,()=>{};let r=o;le.nativeCtor=r;function a(i,s){let l=s!==void 0?new r(i,s):new r(i);try{md(l,n)}catch{}return l}try{a.prototype=r.prototype}catch{}try{Object.setPrototypeOf(a,r)}catch{}try{a.CONNECTING=r.CONNECTING,a.OPEN=r.OPEN,a.CLOSING=r.CLOSING,a.CLOSED=r.CLOSED}catch{}a[or]=!0,a[rr]=r;try{e.WebSocket=a,n&&console.log("[WS] WebSocket capture installed")}catch{return()=>{}}return()=>{try{e.WebSocket===a&&(e.WebSocket=r)}catch{}}}function gd(e=A){let t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function yt(e=A){let t=pd();if(t)return{ws:t,source:"captured"};let n=gd(e);return n?{ws:n,source:"roomConnection"}:{ws:null,source:null}}function Kt(e,t={}){let n=t.pageWindow??A,o=t.intervalMs??500,r=!!t.debug,a=null,i=null,s=()=>{let c=yt(n);(c.ws!==a||c.source!==i)&&(a=c.ws,i=c.source,r&&console.log("[WS] best socket changed:",c.source,c.ws),e(c))};s();let l=setInterval(s,o);return()=>clearInterval(l)}function fd(e){if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return null}}function bd(e,t=A){let n=t?.MagicCircle_RoomConnection;if(n&&typeof n.sendMessage=="function")try{return Array.isArray(e)?n.sendMessage(...e):n.sendMessage(e),{ok:!0}}catch(a){return{ok:!1,reason:"error",error:a}}let{ws:o}=yt(t);if(!o)return{ok:!1,reason:"no-ws"};if(!On(o))return{ok:!1,reason:"not-open"};let r=fd(e);if(r==null)return{ok:!1,reason:"error",error:new Error("Cannot stringify message")};try{return o.send(r),{ok:!0}}catch(a){return{ok:!1,reason:"error",error:a}}}function sr(e,t={},n=A){return bd({type:e,...t},n)}var ve={Welcome:"Welcome",PartialState:"PartialState",ServerErrorMessage:"ServerErrorMessage",Config:"Config",InappropriateContentRejected:"InappropriateContentRejected",Emote:"Emote",CurrencyTransaction:"CurrencyTransaction",Pong:"Pong"},C={Chat:"Chat",Emote:"Emote",Wish:"Wish",KickPlayer:"KickPlayer",SetPlayerData:"SetPlayerData",UsurpHost:"UsurpHost",Dev:"Dev",SetSelectedGame:"SetSelectedGame",VoteForGame:"VoteForGame",RequestGame:"RequestGame",RestartGame:"RestartGame",Ping:"Ping",PlayerPosition:"PlayerPosition",Teleport:"Teleport",CheckWeatherStatus:"CheckWeatherStatus",MoveInventoryItem:"MoveInventoryItem",DropObject:"DropObject",PickupObject:"PickupObject",ToggleFavoriteItem:"ToggleFavoriteItem",PutItemInStorage:"PutItemInStorage",RetrieveItemFromStorage:"RetrieveItemFromStorage",MoveStorageItem:"MoveStorageItem",LogItems:"LogItems",PlantSeed:"PlantSeed",WaterPlant:"WaterPlant",HarvestCrop:"HarvestCrop",SellAllCrops:"SellAllCrops",PurchaseSeed:"PurchaseSeed",PurchaseEgg:"PurchaseEgg",PurchaseTool:"PurchaseTool",PurchaseDecor:"PurchaseDecor",PlantEgg:"PlantEgg",HatchEgg:"HatchEgg",PlantGardenPlant:"PlantGardenPlant",PotPlant:"PotPlant",MutationPotion:"MutationPotion",PickupDecor:"PickupDecor",PlaceDecor:"PlaceDecor",RemoveGardenObject:"RemoveGardenObject",PlacePet:"PlacePet",FeedPet:"FeedPet",PetPositions:"PetPositions",SwapPet:"SwapPet",StorePet:"StorePet",NamePet:"NamePet",SellPet:"SellPet",ReportSpeakingStart:"ReportSpeakingStart"};var rb=new Set(Object.values(ve)),ab=new Set(Object.values(C));function $(e,t={},n=A){return sr(e,t,n)}function qt(e,t=A){return $(C.Chat,{scopePath:["Room"],message:e},t)}function lr(e,t=A){return $(C.Emote,{scopePath:["Room"],emoteType:e},t)}function cr(e,t=A){return $(C.Wish,{wish:e},t)}function ur(e,t=A){return $(C.KickPlayer,{scopePath:["Room"],playerId:e},t)}function dr(e,t=A){return $(C.SetPlayerData,{scopePath:["Room"],data:e},t)}function pr(e=A){return $(C.UsurpHost,{},e)}function mr(e=A){return $(C.ReportSpeakingStart,{},e)}function gr(e,t=A){return $(C.SetSelectedGame,{scopePath:["Room"],gameId:e},t)}function fr(e,t=A){return $(C.VoteForGame,{scopePath:["Room"],gameId:e},t)}function br(e,t=A){return $(C.RequestGame,{scopePath:["Room"],gameId:e},t)}function hr(e=A){return $(C.RestartGame,{scopePath:["Room"]},e)}function yr(e,t=A){return $(C.Ping,{id:e},t)}function Hn(e,t,n=A){return $(C.PlayerPosition,{x:e,y:t},n)}var xr=Hn;function vr(e,t,n=A){return $(C.Teleport,{x:e,y:t},n)}function wr(e=A){return $(C.CheckWeatherStatus,{},e)}function Sr(e,t,n=A){return $(C.MoveInventoryItem,{fromIndex:e,toIndex:t},n)}function kr(e,t=A){return $(C.DropObject,{slotIndex:e},t)}function Tr(e,t=A){return $(C.PickupObject,{objectId:e},t)}function Ar(e,t,n=A){return $(C.ToggleFavoriteItem,{itemId:e,favorite:t},n)}function Cr(e,t=A){return $(C.PutItemInStorage,{itemId:e},t)}function Pr(e,t=A){return $(C.RetrieveItemFromStorage,{itemId:e},t)}function Mr(e,t,n=A){return $(C.MoveStorageItem,{fromIndex:e,toIndex:t},n)}function Er(e=A){return $(C.LogItems,{},e)}function Ir(e,t,n,o=A){return $(C.PlantSeed,{seedId:e,x:t,y:n},o)}function Lr(e,t=A){return $(C.WaterPlant,{plantId:e},t)}function Rr(e,t=A){return $(C.HarvestCrop,{cropId:e},t)}function Or(e=A){return $(C.SellAllCrops,{},e)}function Hr(e,t=A){return $(C.PurchaseDecor,{decorId:e},t)}function _r(e,t=A){return $(C.PurchaseEgg,{eggId:e},t)}function Nr(e,t=A){return $(C.PurchaseTool,{toolId:e},t)}function Gr(e,t=A){return $(C.PurchaseSeed,{seedId:e},t)}function Dr(e,t,n,o=A){return $(C.PlantEgg,{eggId:e,x:t,y:n},o)}function Wr(e,t=A){return $(C.HatchEgg,{eggId:e},t)}function Br(e,t,n,o=A){return $(C.PlantGardenPlant,{plantId:e,x:t,y:n},o)}function Vr(e,t,n=A){return $(C.PotPlant,{plantId:e,potId:t},n)}function jr(e,t,n=A){return $(C.MutationPotion,{potionId:e,targetId:t},n)}function Fr(e,t=A){return $(C.PickupDecor,{decorInstanceId:e},t)}function zr(e,t,n,o=A){return $(C.PlaceDecor,{decorId:e,x:t,y:n},o)}function $r(e,t=A){return $(C.RemoveGardenObject,{objectId:e},t)}function Ur(e,t,n,o=A){return $(C.PlacePet,{petId:e,x:t,y:n},o)}function Kr(e,t,n=A){return $(C.FeedPet,{petId:e,foodItemId:t},n)}function qr(e,t=A){return $(C.PetPositions,{positions:e},t)}function Jr(e,t,n=A){return $(C.SwapPet,{petIdA:e,petIdB:t},n)}function Xr(e,t=A){return $(C.StorePet,{petId:e},t)}function Yr(e,t,n=A){return $(C.NamePet,{petId:e,name:t},n)}function Qr(e,t=A){return $(C.SellPet,{petId:e},t)}var De={timeRange:{start:"09:00",end:"18:00"},logSettings:{mode:"js",wrap:!1}};async function ea(){return pt("tab-test",{version:1,defaults:De,sanitize:e=>({timeRange:{start:e.timeRange?.start||De.timeRange.start,end:e.timeRange?.end||De.timeRange.end},logSettings:{mode:e.logSettings?.mode||De.logSettings.mode,wrap:e.logSettings?.wrap??De.logSettings.wrap}})})}var Jt=class extends Ne{constructor(){super({id:"tab-test",label:"Test"})}async build(t){let n=this.createContainer("test-section");t.appendChild(n);let o;try{o=await ea()}catch{o={get:()=>De,set:()=>{},update:()=>{},save:()=>{}}}let r=o.get(),a=jt({text:"Plage horaire",hint:"Heures actives du mode 'Plage horaire'.",icon:"\u23F0"}),i=Zo({start:r.timeRange.start,end:r.timeRange.end,stepMinutes:5,allowOvernight:!0,picker:"auto",format:"12h",onChange:g=>{o.update({timeRange:{start:g.start,end:g.end}})}}),s=w("div",null,a.root,i.root),l=nr({height:220,mode:r.logSettings.mode,maxLines:1e3});r.logSettings.wrap&&l.setWrap(!0),l.add({level:"info",text:"Log initialise"}),l.add({level:"debug",text:"const x = 42; // demo"}),l.add({level:"warn",text:"Requete lente: fetch('/api') > 1200ms"}),l.add({level:"error",text:"new Error('Boom')"});let c=Re({label:"Appliquer",variant:"primary",onClick:()=>{let g=i.getValue();l.add({level:"info",text:`[Apply] ${g.start} -> ${g.end}`})}}),d=Le({title:"Parametres - Plage horaire",subtitle:"Choisis la fenetre d'activite",variant:"soft",padding:"lg",footer:Pn(c)},s),u=Re({label:"Clear",onClick:()=>qt("test")}),p=Re({label:r.logSettings.wrap?"Unwrap":"Wrap",onClick:()=>{let g=!l.classList.contains("log--wrap");l.setWrap(g),p.setLabel(g?"Unwrap":"Wrap"),o.update({logSettings:{...o.get().logSettings,wrap:g}})}}),m=Re({label:`Mode: ${r.logSettings.mode}`,onClick:()=>{let h=o.get().logSettings.mode==="js"?"plain":"js";l.setMode(h),m.setLabel(`Mode: ${h}`),o.update({logSettings:{...o.get().logSettings,mode:h}})}}),b=Re({label:"Add line",onClick:()=>l.add({level:"debug",text:"function tick(){ return Date.now(); } // sample"})}),f=Le({title:"Logs",variant:"default",padding:"lg"},l,Pn(u,p,m,b));n.appendChild(d),n.appendChild(f)}};function _n(e){return[new Ut(e),new Jt]}function Nn(e){let{shadow:t,initialOpen:n}=e,o=w("div",{className:"gemini-panel",id:"panel",ariaHidden:String(!n)}),r=w("div",{className:"gemini-tabbar"}),a=w("div",{className:"gemini-content",id:"content"}),i=w("div",{className:"gemini-resizer",title:"Resize"}),s=w("button",{className:"gemini-close",title:"Fermer",ariaLabel:"Fermer"},"\u2715");o.append(r,a,i);let l=w("div",{className:"gemini-wrapper"},o);return t.append(l),{panel:o,tabbar:r,content:a,resizer:i,closeButton:s,wrapper:l}}function Gn(e){let{resizer:t,host:n,panel:o,shadow:r,onWidthChange:a,initialWidth:i,minWidth:s,maxWidth:l}=e,c=s,d=l;function u(){let v=be(),k=Math.round(A.visualViewport?.width??A.innerWidth??0);if(v.platform==="mobile"||v.os==="ios"||v.os==="android"){let E=getComputedStyle(r.host),I=parseFloat(E.getPropertyValue("--inset-l"))||0,L=parseFloat(E.getPropertyValue("--inset-r"))||0,O=Math.max(280,k-Math.round(I+L)),M=Math.min(420,Math.max(300,Math.floor(k*.66))),U=O;c=Math.min(M,O),d=U}else c=s,d=l;return{min:c,max:d}}function p(v){return Math.max(c,Math.min(d,Number(v)||i))}function m(v){let k=p(v);n.style.setProperty("--w",`${k}px`),a(k)}u();let b=be(),f=!(b.platform==="mobile"||b.os==="ios"||b.os==="android"),g=!1,h=v=>{if(!g)return;v.preventDefault();let k=Math.round(A.innerWidth-v.clientX);m(k)},S=()=>{g&&(g=!1,document.body.style.cursor="",A.removeEventListener("mousemove",h),A.removeEventListener("mouseup",S))},T=v=>{f&&(v.preventDefault(),g=!0,document.body.style.cursor="ew-resize",A.addEventListener("mousemove",h),A.addEventListener("mouseup",S))};t.addEventListener("mousedown",T);function x(){t.removeEventListener("mousedown",T),A.removeEventListener("mousemove",h),A.removeEventListener("mouseup",S)}return{calculateResponsiveBounds:u,constrainWidthToLimits:p,setHudWidth:m,destroy:x}}function Dn(e){let{panel:t,onToggle:n,onClose:o,toggleCombo:r=l=>l.ctrlKey&&l.shiftKey&&l.key.toLowerCase()==="u",closeOnEscape:a=!0}=e;function i(l){let c=t.classList.contains("open");if(a&&l.key==="Escape"&&c){o();return}r(l)&&(l.preventDefault(),l.stopPropagation(),n())}document.addEventListener("keydown",i,{capture:!0});function s(){document.removeEventListener("keydown",i,{capture:!0})}return{destroy:s}}var ta=`
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
`;var Wn=`
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
`;var Bn=`
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
`;var Vn=`
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
`;function ee(e,t,n){if(e.querySelector(`style[data-style-id="${n}"]`))return;let o=document.createElement("style");o.setAttribute("data-style-id",n),o.textContent=t,e.appendChild(o)}var na=`
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
  
`;var oa=`
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
`;var ra=`
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
`;var aa=`
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
`;var ia=`
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
`;var sa=`
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
`;var la=`
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
`;var ca=`
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
`;var ua=`
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
`;var da=`
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
`;var pa=`
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
`;var ma=`
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
`;var ga=`
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
`;var fa=`
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
`;var ba=`
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
`;var ha=`
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
`;var ya=`
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
`;var hd={all:"initial",position:"fixed",top:"0",right:"0",zIndex:"2147483647",pointerEvents:"auto",fontFamily:'system-ui, -apple-system, "Segoe UI", Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',fontSize:"13px",lineHeight:"1.35"};function yd(e="gemini-root"){let t=document.createElement("div");t.id=e,Object.assign(t.style,hd),(document.body||document.documentElement).appendChild(t);let n=t.attachShadow({mode:"open"});return{host:t,shadow:n}}function jn(e){let{hostId:t="gemini-hud-root",initialWidth:n,initialOpen:o,onWidthChange:r,onOpenChange:a,themes:i,initialTheme:s,onThemeChange:l,buildSections:c,initialTab:d,onTabChange:u,toggleCombo:p=G=>G.ctrlKey&&G.shiftKey&&G.key.toLowerCase()==="u",closeOnEscape:m=!0,minWidth:b=420,maxWidth:f=720}=e,{host:g,shadow:h}=yd(t);ee(h,Wn,"variables"),ee(h,Bn,"primitives"),ee(h,Vn,"utilities"),ee(h,ta,"hud"),ee(h,na,"card"),ee(h,oa,"badge"),ee(h,ra,"button"),ee(h,aa,"input"),ee(h,ia,"label"),ee(h,sa,"navTabs"),ee(h,la,"searchBar"),ee(h,ca,"select"),ee(h,ua,"switch"),ee(h,da,"table"),ee(h,pa,"timeRangePicker"),ee(h,ma,"tooltip"),ee(h,ga,"slider"),ee(h,fa,"reorderableList"),ee(h,ba,"colorPicker"),ee(h,ha,"log"),ee(h,ya,"settings");let{panel:S,tabbar:T,content:x,resizer:v,closeButton:k,wrapper:E}=Nn({shadow:h,initialOpen:o});function I(G){S.dispatchEvent(new CustomEvent("gemini:hud-open-change",{detail:{isOpen:G},bubbles:!0})),a?.(G)}function L(G){let R=S.classList.contains("open");S.classList.toggle("open",G),S.setAttribute("aria-hidden",G?"false":"true"),G!==R&&I(G)}L(o),k.addEventListener("click",G=>{G.preventDefault(),G.stopPropagation(),L(!1)});let O=Ln({host:g,themes:i,initialTheme:s,onThemeChange:l}),M=Gn({resizer:v,host:g,panel:S,shadow:h,onWidthChange:r||(()=>{}),initialWidth:n,minWidth:b,maxWidth:f});M.setHudWidth(n);let U=c({applyTheme:O.applyTheme,initialTheme:s,getCurrentTheme:O.getCurrentTheme,setHUDWidth:M.setHudWidth,setHUDOpen:L}),J=new ut(U,x,{applyTheme:O.applyTheme,getCurrentTheme:O.getCurrentTheme}),q=U.map(G=>({id:G.id,label:G.label})),D=Wo(q,d||q[0]?.id||"",G=>{J.activate(G),u?.(G)});D.root.style.flex="1 1 auto",D.root.style.minWidth="0",T.append(D.root,k),J.activate(d||q[0]?.id||"");let B=Dn({panel:S,onToggle:()=>L(!S.classList.contains("open")),onClose:()=>L(!1),toggleCombo:p,closeOnEscape:m}),_=()=>{D.recalc();let G=parseInt(getComputedStyle(g).getPropertyValue("--w"))||n;M.calculateResponsiveBounds(),M.setHudWidth(G)};A.addEventListener("resize",_);function H(){B.destroy(),M.destroy(),A.removeEventListener("resize",_)}return{host:g,shadow:h,wrapper:E,panel:S,content:x,setOpen:L,setWidth:M.setHudWidth,sections:U,manager:J,nav:D,destroy:H}}var Xe={isOpen:"gemini.hud.isOpen",width:"gemini.hud.width",theme:"gemini.hud.theme",activeTab:"gemini.hud.activeTab"},xt={isOpen:!1,width:480,theme:"dark",activeTab:"tab-settings"};function Fn(){return{isOpen:Ie(Xe.isOpen,xt.isOpen),width:Ie(Xe.width,xt.width),theme:Ie(Xe.theme,xt.theme),activeTab:Ie(Xe.activeTab,xt.activeTab)}}function Ye(e,t){dt(Xe[e],t)}var xd="https://i.imgur.com/IMkhMur.png",vd="Stats";function zn(e){let t=e.iconUrl||xd,n=e.ariaLabel||"Open MGH",o=null,r=null,a=null,i=!1,s=null,l=null,c=["Chat","Leaderboard","Stats","Open Activity Log"],d=T=>{try{return typeof CSS<"u"&&CSS&&typeof CSS.escape=="function"?CSS.escape(T):T.replace(/"/g,'\\"')}catch{return T}};function u(){let T=document.querySelector(c.map(v=>`button[aria-label="${d(v)}"]`).join(","));if(!T)return null;let x=T.parentElement;for(;x&&x!==document.body;){if(c.reduce((k,E)=>k+x.querySelectorAll(`button[aria-label="${d(E)}"]`).length,0)>=2)return x;x=x.parentElement}return null}function p(T){return T}function m(T){let x=Array.from(T.querySelectorAll("button[aria-label]"));if(!x.length)return{refBtn:null,refWrapper:null};let v=x.filter(U=>U.dataset.mghBtn!=="true"&&(U.getAttribute("aria-label")||"")!==(e.ariaLabel||"Open MGH")),k=v.length?v:x,E=k.find(U=>(U.getAttribute("aria-label")||"").toLowerCase()===vd.toLowerCase())||null,I=k.length>=2?k.length-2:k.length-1,L=E||k[I],O=L.parentElement,M=O&&O.parentElement===T&&O.tagName==="DIV"?O:null;return{refBtn:L,refWrapper:M}}function b(T,x,v){let k=T.cloneNode(!1);k.type="button",k.setAttribute("aria-label",x),k.title=x,k.dataset.mghBtn="true",k.style.pointerEvents="auto",k.removeAttribute("id");let E=document.createElement("img");return E.src=v,E.alt="MGH",E.style.pointerEvents="none",E.style.userSelect="none",E.style.width="76%",E.style.height="76%",E.style.objectFit="contain",E.style.display="block",E.style.margin="auto",k.appendChild(E),k.addEventListener("click",I=>{I.preventDefault(),I.stopPropagation();try{e.onClick?.()}catch{}}),k}function f(){if(i)return!1;i=!0;let T=!1;try{let x=u();if(!x)return!1;s!==x&&(s=x);let{refBtn:v,refWrapper:k}=m(x);if(!v)return!1;r=x.querySelector('div[data-mgh-wrapper="true"]'),!r&&k&&(r=k.cloneNode(!1),r.dataset.mghWrapper="true",r.removeAttribute("id"),T=!0);let E=r?.querySelector('button[data-mgh-btn="true"]')||null;o||(o=E),o||(o=b(v,n,t),r?r.appendChild(o):o.parentElement!==x&&x.appendChild(o),T=!0),r&&r.parentElement!==x&&(x.appendChild(r),T=!0);let I=x;if(I&&I!==l){try{S.disconnect()}catch{}l=I,S.observe(l,{childList:!0,subtree:!0})}return T}finally{i=!1}}f();let g=document.getElementById("App")||document.body,h=null,S=new MutationObserver(T=>{let x=T.every(k=>{let E=Array.from(k.addedNodes||[]),I=Array.from(k.removedNodes||[]),L=E.concat(I);if(L.length===0){let O=k.target;return r&&(O===r||r.contains(O))||o&&(O===o||o.contains(O))}return L.every(O=>!!(!(O instanceof HTMLElement)||r&&(O===r||r.contains(O))||o&&(O===o||o.contains(O))))}),v=T.some(k=>Array.from(k.removedNodes||[]).some(E=>E instanceof HTMLElement?!!(r&&(E===r||r.contains(E))||o&&(E===o||o.contains(E))):!1));x&&!v||h===null&&(h=window.setTimeout(()=>{if(h=null,f()&&r){let E=r.parentElement;E&&E.lastElementChild!==r&&E.appendChild(r)}},150))});return S.observe(g,{childList:!0,subtree:!0}),a=()=>S.disconnect(),()=>{try{a?.()}catch{}try{r?.remove()}catch{}}}var Td={},wa=[];function wd(){return wa.slice()}function Sd(e){wa.push(e)}function Sa(e){try{return JSON.parse(e)}catch{return}}function xa(e){if(typeof e=="string"){let t=Sa(e);return t!==void 0?t:e}return e}function ka(e){if(e!=null){if(typeof e=="string"){let t=Sa(e);return t!==void 0?ka(t):e}if(Array.isArray(e)&&typeof e[0]=="string")return e[0];if(typeof e=="object"){let t=e;return t.type??t.Type??t.kind??t.messageType}}}function kd(e){let t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function V(e,t,n){let o=typeof t=="boolean"?t:!0,r=typeof t=="function"?t:n,a=(i,s)=>{if(ka(i)!==e)return;let c=r(i,s);return c&&typeof c=="object"&&"kind"in c?c:typeof c=="boolean"?c?void 0:{kind:"drop"}:o?void 0:{kind:"drop"}};return Sd(a),a}var vt=new WeakSet,va=new WeakMap;function Ta(e){let t=e.pageWindow,n=!!e.debug,o=e.middlewares&&e.middlewares.length?e.middlewares:wd();if(!o.length)return()=>{};let r=p=>({ws:p,pageWindow:t,debug:n}),a=(p,m)=>{let b=p;for(let f of o){let g=f(b,r(m));if(g){if(g.kind==="drop")return{kind:"drop"};g.kind==="replace"&&(b=g.message)}}return b!==p?{kind:"replace",message:b}:void 0},i=null,s=null,l=null,c=()=>{let p=t?.MagicCircle_RoomConnection,m=p?.sendMessage;if(!p||typeof m!="function")return!1;if(vt.has(m))return!0;let b=m.bind(p);function f(...g){let h=g.length===1?g[0]:g,S=xa(h),T=a(S,kd(t));if(T?.kind==="drop"){n&&console.log("[WS] drop outgoing (RoomConnection.sendMessage)",S);return}if(T?.kind==="replace"){let x=T.message;return g.length>1&&Array.isArray(x)?(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",S,"=>",x),b(...x)):(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",S,"=>",x),b(x))}return b(...g)}vt.add(f),va.set(f,m);try{p.sendMessage=f,vt.add(p.sendMessage),n&&console.log("[WS] outgoing patched via MagicCircle_RoomConnection.sendMessage")}catch{return!1}return i=()=>{try{p.sendMessage===f&&(p.sendMessage=m)}catch{}},!0};(()=>{let p=t?.WebSocket?.prototype,m=p?.send;if(typeof m!="function"||vt.has(m))return;function b(f){let g=xa(f),h=a(g,this);if(h?.kind==="drop"){n&&console.log("[WS] drop outgoing (ws.send)",g);return}if(h?.kind==="replace"){let S=h.message,T=typeof S=="string"||S instanceof ArrayBuffer||S instanceof Blob?S:JSON.stringify(S);return n&&console.log("[WS] replace outgoing (ws.send)",g,"=>",S),m.call(this,T)}return m.call(this,f)}vt.add(b),va.set(b,m);try{p.send=b,n&&console.log("[WS] outgoing patched via WebSocket.prototype.send")}catch{return}s=()=>{try{p.send===b&&(p.send=m)}catch{}}})();let u=e.waitForRoomConnectionMs??4e3;if(!c()&&u>0){let p=Date.now();l=setInterval(()=>{if(c()){clearInterval(l),l=null;return}Date.now()-p>u&&(clearInterval(l),l=null,n&&console.log("[WS] RoomConnection not found, only ws.send is patched"))},250)}return()=>{if(l){try{clearInterval(l)}catch{}l=null}if(i){try{i()}catch{}i=null}if(s){try{s()}catch{}s=null}}}(function(){try{let t=Td,n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();var Md={},Ca=[];function Ad(){return Ca.slice()}function Aa(e){Ca.push(e)}function Cd(e){if(e!=null){if(typeof e=="object"){let t=e;if(typeof t.type=="string")return t.type;if(typeof t.Type=="string")return t.Type;if(typeof t.kind=="string")return t.kind;if(typeof t.messageType=="string")return t.messageType}if(Array.isArray(e)&&typeof e[0]=="string")return e[0]}}function Pd(e){if(typeof e=="string")try{return JSON.parse(e)}catch{return e}return e}var $n=Symbol.for("ariesmod.ws.handlers.patched");function te(e,t){if(typeof e=="string"){let r=e,a={match:i=>i.kind==="message"&&i.type===r,handle:t};return Aa(a),a}let n=e,o={match:r=>r.kind==="close"&&r.code===n,handle:t};return Aa(o),o}function Pa(e,t=Ad(),n={}){let o=n.pageWindow??window,r=!!n.debug;if(e[$n])return()=>{};e[$n]=!0;let a={ws:e,pageWindow:o,debug:r},i=u=>{for(let p of t)try{if(!p.match(u))continue;if(p.handle(u,a)===!0)return}catch(m){r&&console.error("[WS] handler error",m,u)}},s=u=>{let p=Pd(u.data),m=Cd(p);i({kind:"message",raw:u.data,data:p,type:m})},l=u=>{i({kind:"close",code:u.code,reason:u.reason,wasClean:u.wasClean,event:u})},c=u=>i({kind:"open",event:u}),d=u=>i({kind:"error",event:u});return e.addEventListener("message",s),e.addEventListener("close",l),e.addEventListener("open",c),e.addEventListener("error",d),()=>{try{e.removeEventListener("message",s)}catch{}try{e.removeEventListener("close",l)}catch{}try{e.removeEventListener("open",c)}catch{}try{e.removeEventListener("error",d)}catch{}try{delete e[$n]}catch{}}}(function(){try{let t=Md,n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();te(4800,(e,t)=>{t.debug&&console.log("[WS][Close] Auth failure",e.code,e.reason)});te(4300,(e,t)=>{t.debug&&console.log("[WS][Close] Superseded",e.code,e.reason)});te(4400,(e,t)=>{t.debug&&console.log("[WS][Close] Heartbeat expired",e.code,e.reason)});te(4500,(e,t)=>{t.debug&&console.log("[WS][Close] Player kicked",e.code,e.reason)});te(4200,(e,t)=>{t.debug&&console.log("[WS][Close] Player left voluntarily",e.code,e.reason)});te(4100,(e,t)=>{t.debug&&console.log("[WS][Close] Reconnect initiated",e.code,e.reason)});te(4310,(e,t)=>{t.debug&&console.log("[WS][Close] Server disposed",e.code,e.reason)});te(4250,(e,t)=>{t.debug&&console.log("[WS][Close] User session superseded",e.code,e.reason)});te(4710,(e,t)=>{t.debug&&console.log("[WS][Close] Version expired",e.code,e.reason)});te(4700,(e,t)=>{t.debug&&console.log("[WS][Close] Version mismatch",e.code,e.reason)});te(ve.Config,(e,t)=>{t.debug&&console.log("[WS][STC] Config",e.data)});te(ve.CurrencyTransaction,(e,t)=>{t.debug&&console.log("[WS][STC] CurrencyTransaction",e.data)});te(ve.Emote,(e,t)=>{t.debug&&console.log("[WS][STC] Emote",e.data)});te(ve.InappropriateContentRejected,(e,t)=>{t.debug&&console.log("[WS][STC] InappropriateContentRejected",e.data)});te(ve.PartialState,(e,t)=>{t.debug&&console.log("[WS][STC] PartialState",e.data)});te(ve.Pong,(e,t)=>{t.debug&&console.log("[WS][STC] Pong",e.data)});te(ve.ServerErrorMessage,(e,t)=>{t.debug&&console.log("[WS][STC] ServerErrorMessage",e.data)});te(ve.Welcome,(e,t)=>{t.debug&&console.log("[WS][STC] Welcome",e.data)});V(C.PlantSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantSeed"),!!1));V(C.WaterPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] WaterPlant"),!!1));V(C.HarvestCrop,(e,t)=>(t.debug&&console.log("[MW][Garden] HarvestCrop"),!!1));V(C.SellAllCrops,(e,t)=>(t.debug&&console.log("[MW][Garden] SellAllCrops"),!!1));V(C.PurchaseSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseSeed"),!!1));V(C.PurchaseEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseEgg"),!!1));V(C.PurchaseTool,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseTool"),!!1));V(C.PurchaseDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseDecor"),!!1));V(C.PlantEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantEgg"),!!1));V(C.HatchEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] HatchEgg"),!!1));V(C.PlantGardenPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantGardenPlant"),!!1));V(C.PotPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PotPlant"),!!1));V(C.MutationPotion,(e,t)=>(t.debug&&console.log("[MW][Garden] MutationPotion"),!!1));V(C.PickupDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PickupDecor"),!!1));V(C.PlaceDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PlaceDecor"),!!1));V(C.RemoveGardenObject,(e,t)=>(t.debug&&console.log("[MW][Garden] RemoveGardenObject"),!!1));V(C.MoveInventoryItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveInventoryItem"),!!1));V(C.DropObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] DropObject"),!!1));V(C.PickupObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] PickupObject"),!!1));V(C.ToggleFavoriteItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] ToggleFavoriteItem"),!!1));V(C.PutItemInStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] PutItemInStorage"),!!1));V(C.RetrieveItemFromStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] RetrieveItemFromStorage"),!!1));V(C.MoveStorageItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveStorageItem"),!!1));V(C.LogItems,(e,t)=>(t.debug&&console.log("[MW][Inventory] LogItems"),!!1));V(C.PlacePet,(e,t)=>(t.debug&&console.log("[MW][Pets] PlacePet"),!!1));V(C.FeedPet,(e,t)=>(t.debug&&console.log("[MW][Pets] FeedPet"),!!1));V(C.PetPositions,(e,t)=>(t.debug&&console.log("[MW][Pets] PetPositions"),!!1));V(C.SwapPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SwapPet"),!!1));V(C.StorePet,(e,t)=>(t.debug&&console.log("[MW][Pets] StorePet"),!!1));V(C.NamePet,(e,t)=>(t.debug&&console.log("[MW][Pets] NamePet"),!!1));V(C.SellPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SellPet"),!!1));console.log("[WS] TESTTEST");V(C.SetSelectedGame,(e,t)=>(t.debug&&console.log("[MW][Session] SetSelectedGame"),!!1));V(C.VoteForGame,(e,t)=>(t.debug&&console.log("[MW][Session] VoteForGame"),!!1));V(C.RequestGame,(e,t)=>(t.debug&&console.log("[MW][Session] RequestGame"),!!1));V(C.RestartGame,(e,t)=>(t.debug&&console.log("[MW][Session] RestartGame"),!!1));V(C.Ping,(e,t)=>(t.debug&&console.log("[MW][Session] Ping"),!!1));V(C.PlayerPosition,(e,t)=>(t.debug&&console.log("[MW][Session] PlayerPosition"),!!1));V(C.Teleport,(e,t)=>(t.debug&&console.log("[MW][Session] Teleport"),!!1));V(C.CheckWeatherStatus,(e,t)=>(t.debug&&console.log("[MW][Session] CheckWeatherStatus"),!!1));V(C.Chat,(e,t)=>(t.debug&&console.log("[MW][Social] Chat"),!!1));V(C.Dev,(e,t)=>(t.debug&&console.log("[MW][Social] Dev"),!!1));V(C.Emote,(e,t)=>(t.debug&&console.log("[MW][Social] Emote"),!!1));V(C.Wish,(e,t)=>(t.debug&&console.log("[MW][Social] Wish"),!!1));V(C.KickPlayer,(e,t)=>(t.debug&&console.log("[MW][Social] KickPlayer"),!!1));V(C.ReportSpeakingStart,(e,t)=>(t.debug&&console.log("[MW][Voice] ReportSpeakingStart"),!!1));V(C.SetPlayerData,(e,t)=>(t.debug&&console.log("[MW][Social] SetPlayerData"),!!1));V(C.UsurpHost,(e,t)=>(t.debug&&console.log("[MW][Social] UsurpHost"),!!1));function Ed(e={}){let t=e.pageWindow??A,n=e.pollMs??500,o=!!e.debug,r=[];r.push(ir(t,{debug:o})),r.push(Ta({pageWindow:t,middlewares:e.middlewares,debug:o}));let a=null,i=s=>{if(a){try{a()}catch{}a=null}s&&(a=Pa(s,e.handlers,{debug:o,pageWindow:t}))};return i(yt(t).ws),r.push(Kt(s=>i(s.ws),{intervalMs:n,debug:o,pageWindow:t})),{getWs:()=>yt(t).ws,dispose:()=>{for(let s=r.length-1;s>=0;s--)try{r[s]()}catch{}if(a){try{a()}catch{}a=null}}}}var Xt=null;function Ma(e={}){return Xt||(Xt=Ed(e),Xt)}Ae();var wt=null;function Id(){return A?.document??(typeof document<"u"?document:null)}function Kn(e){if(wt!==null)return;let t=e??Id();if(!t)return;let n=t.scripts;for(let o=0;o<n.length;o++){let a=n.item(o)?.src;if(!a)continue;let i=a.match(/\/(?:r\/\d+\/)?version\/([^/]+)/);if(i?.[1]){wt=i[1];return}}}function Ld(){return Kn(),wt}async function Rd(e=15e3){let t=performance.now();for(;performance.now()-t<e;){if(Kn(),wt)return wt;await Te(50)}throw new Error("MGVersion timeout (gameVersion not found)")}var St={init:Kn,get:Ld,wait:Rd};var Ia=A?.location?.origin||"https://magicgarden.gg";function La(){return typeof GM_xmlhttpRequest=="function"}function Ra(e,t="text"){return new Promise((n,o)=>{GM_xmlhttpRequest({method:"GET",url:e,responseType:t,onload:r=>r.status>=200&&r.status<300?n(r):o(new Error(`HTTP ${r.status} for ${e}`)),onerror:()=>o(new Error(`Network error for ${e}`)),ontimeout:()=>o(new Error(`Timeout for ${e}`))})})}async function Qe(e){if(La())return JSON.parse((await Ra(e,"text")).responseText);let t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.json()}async function Qt(e){if(La())return(await Ra(e,"blob")).response;let t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.blob()}function Oa(e){return new Promise((t,n)=>{let o=URL.createObjectURL(e),r=A?.Image||Image,a=new r;a.decoding="async",a.onload=()=>{URL.revokeObjectURL(o),t(a)},a.onerror=()=>{URL.revokeObjectURL(o),n(new Error("Image decode failed"))},a.src=o})}var ue=(e,t)=>e.replace(/\/?$/,"/")+String(t||"").replace(/^\//,""),Od=e=>e.lastIndexOf("/")>=0?e.slice(0,e.lastIndexOf("/")+1):"",qn=(e,t)=>String(t||"").startsWith("/")?String(t).slice(1):Od(e)+String(t||"");var Zt=null,en=null;async function Ha(){return en||Zt||(Zt=(async()=>{let e=await St.wait(15e3);return en=`${Ia}/version/${e}/assets/`,en})(),Zt)}async function Hd(e){let t=await Ha();return ue(t,e)}var he={base:Ha,url:Hd};var Jn=new Map;async function _d(e){let t=e||await he.base();if(Jn.has(t))return Jn.get(t);let n=Qe(ue(t,"manifest.json"));return Jn.set(t,n),n}function Nd(e,t){return e?.bundles?.find(n=>n?.name===t)||null}function Gd(e){let t=new Set;for(let n of e?.assets||[])for(let o of n?.src||[])typeof o=="string"&&o.endsWith(".json")&&o!=="manifest.json"&&t.add(o);return Array.from(t)}var pe={load:_d,getBundle:Nd,listJsonFromBundle:Gd};Ae();Ae();Ae();var _a=Function.prototype.bind,X={_bindPatched:!1,engine:null,tos:null,app:null,renderer:null,ticker:null,stage:null},Na,Ga,Da,Dd=new Promise(e=>{Na=e}),Wd=new Promise(e=>{Ga=e}),Bd=new Promise(e=>{Da=e});function Vd(e){return!!(e&&typeof e=="object"&&typeof e.start=="function"&&typeof e.destroy=="function"&&e.app&&e.app.stage&&e.app.renderer&&e.systems&&typeof e.systems.values=="function")}function jd(e){try{for(let t of e.systems.values()){let n=t?.system;if(n?.name==="tileObject")return n}}catch{}return null}function Fd(e){X.engine=e,X.tos=jd(e)||null,X.app=e.app||null,X.renderer=e.app?.renderer||null,X.ticker=e.app?.ticker||null,X.stage=e.app?.stage||null;try{Na(e)}catch{}try{X.app&&Ga(X.app)}catch{}try{X.renderer&&Da(X.renderer)}catch{}}function Xn(){return X.engine?!0:(X._bindPatched||(X._bindPatched=!0,Function.prototype.bind=function(e,...t){let n=_a.call(this,e,...t);try{!X.engine&&Vd(e)&&(Function.prototype.bind=_a,X._bindPatched=!1,Fd(e))}catch{}return n}),!1)}Xn();async function zd(e=15e3){let t=performance.now();for(;performance.now()-t<e;){if(X.engine)return!0;Xn(),await Te(50)}throw new Error("MGPixiHooks: engine capture timeout")}async function $d(e=15e3){return X.engine||await zd(e),!0}function Ud(){return X.engine&&X.app?{ok:!0,engine:X.engine,tos:X.tos,app:X.app}:(Xn(),{ok:!1,engine:X.engine,tos:X.tos,app:X.app,note:"Not captured. Wait for room, or reload."})}var ae={engineReady:Dd,appReady:Wd,rendererReady:Bd,engine:()=>X.engine,tos:()=>X.tos,app:()=>X.app,renderer:()=>X.renderer,ticker:()=>X.ticker,stage:()=>X.stage,PIXI:()=>A.PIXI||null,init:$d,hook:Ud,ready:()=>!!X.engine};function kt(e){let t=String(e||"").trim();return t?t.startsWith("sprite/")||t.startsWith("sprites/")?t:t.includes("/")?`sprite/${t}`:t:""}function Ze(e,t){let n=String(e||"").trim().replace(/^sprites?\//,"").replace(/^\/+|\/+$/g,""),o=String(t||"").trim();return o.includes("/")||!n?kt(o):`sprite/${n}/${o}`}function et(e,t,n,o){let r=Ze(e,t);if(n.has(r)||o.has(r))return r;let a=String(t||"").trim();if(n.has(a)||o.has(a))return a;let i=kt(a);return n.has(i)||o.has(i)?i:r}function Kd(e,t,n=25e3){let o=[e],r=new Set,a=0;for(;o.length&&a++<n;){let i=o.pop();if(!i||r.has(i))continue;if(r.add(i),t(i))return i;let s=i.children;if(Array.isArray(s))for(let l=s.length-1;l>=0;l--)o.push(s[l])}return null}function qd(e){let t=A.PIXI;if(t?.Texture&&t?.Sprite&&t?.Container&&t?.Rectangle)return{Container:t.Container,Sprite:t.Sprite,Texture:t.Texture,Rectangle:t.Rectangle,AnimatedSprite:t.AnimatedSprite||null};let n=e?.stage,o=Kd(n,r=>r?.texture?.frame&&r?.constructor&&r?.texture?.constructor&&r?.texture?.frame?.constructor);if(!o)throw new Error("No Sprite found yet (constructors).");return{Container:n.constructor,Sprite:o.constructor,Texture:o.texture.constructor,Rectangle:o.texture.frame.constructor,AnimatedSprite:t?.AnimatedSprite||null}}async function Wa(e,t=15e3){let{sleep:n}=await Promise.resolve().then(()=>(Ae(),Ea)),o=performance.now();for(;performance.now()-o<t;)try{return qd(e)}catch{await n(50)}throw new Error("Constructors timeout")}var He=(...e)=>{try{console.log("[MGSprite]",...e)}catch{}};function Jd(e){return e&&typeof e=="object"&&e.frames&&e.meta&&typeof e.meta.image=="string"}function Yn(e,t,n,o,r){return new e(t,n,o,r)}function Xd(e,t,n,o,r,a,i){let s;try{s=new e({source:t.source,frame:n,orig:o,trim:r||void 0,rotate:a||0})}catch{s=new e(t.baseTexture||t,n,o,r||void 0,a||0)}if(i)if(s.defaultAnchor?.set)try{s.defaultAnchor.set(i.x,i.y)}catch{}else s.defaultAnchor?(s.defaultAnchor.x=i.x,s.defaultAnchor.y=i.y):s.defaultAnchor={x:i.x,y:i.y};try{s.updateUvs?.()}catch{}return s}function Yd(e,t,n,o){let{Texture:r,Rectangle:a}=o;for(let[i,s]of Object.entries(e.frames)){let l=s.frame,c=!!s.rotated,d=c?2:0,u=c?l.h:l.w,p=c?l.w:l.h,m=Yn(a,l.x,l.y,u,p),b=s.sourceSize||{w:l.w,h:l.h},f=Yn(a,0,0,b.w,b.h),g=null;if(s.trimmed&&s.spriteSourceSize){let h=s.spriteSourceSize;g=Yn(a,h.x,h.y,h.w,h.h)}n.set(i,Xd(r,t,m,f,g,d,s.anchor||null))}}function Qd(e,t,n){if(!(!e.animations||typeof e.animations!="object"))for(let[o,r]of Object.entries(e.animations)){if(!Array.isArray(r))continue;let a=r.map(i=>t.get(i)).filter(Boolean);a.length>=2&&n.set(o,a)}}function Zd(e,t){let n=(o,r)=>{let a=String(o||"").trim(),i=String(r||"").trim();!a||!i||(t.has(a)||t.set(a,new Set),t.get(a).add(i))};for(let o of Object.keys(e.frames||{})){let r=/^sprite\/([^/]+)\/(.+)$/.exec(o);r&&n(r[1],r[2])}}async function Ba(e,t){let n=await pe.load(e),o=pe.getBundle(n,"default");if(!o)throw new Error("No default bundle in manifest");let r=pe.listJsonFromBundle(o),a=new Set,i=new Map,s=new Map,l=new Map;async function c(d){if(a.has(d))return;a.add(d);let u=await Qe(ue(e,d));if(!Jd(u))return;let p=u.meta?.related_multi_packs;if(Array.isArray(p))for(let g of p)await c(qn(d,g));let m=qn(d,u.meta.image),b=await Oa(await Qt(ue(e,m))),f=t.Texture.from(b);Yd(u,f,i,t),Qd(u,i,s),Zd(u,l)}for(let d of r)await c(d);return{textures:i,animations:s,categoryIndex:l}}var Va={enabled:!0,maxEntries:1200,maxCost:5e3,srcCanvasMax:450};function ja(){return{lru:new Map,cost:0,srcCanvas:new Map}}function Qn(e,t){return`${t.sig}::${e}`}function Fa(e){return e?e.isAnim?e.frames?.length||0:e.tex?1:0:0}function ep(e,t,n){e.lru.delete(t),e.lru.set(t,n)}function tp(e,t){if(t.enabled)for(;e.lru.size>t.maxEntries||e.cost>t.maxCost;){let n=e.lru.keys().next().value;if(n===void 0)break;let o=e.lru.get(n);e.lru.delete(n),e.cost=Math.max(0,e.cost-Fa(o??null))}}function Zn(e,t){let n=e.lru.get(t);return n?(ep(e,t,n),n):null}function eo(e,t,n,o){e.lru.set(t,n),e.cost+=Fa(n),tp(e,o)}function za(e){e.lru.clear(),e.cost=0,e.srcCanvas.clear()}function $a(e,t){return e.srcCanvas.get(t)??null}function Ua(e,t,n,o){if(e.srcCanvas.set(t,n),e.srcCanvas.size>o.srcCanvasMax){let r=e.srcCanvas.keys().next().value;r!==void 0&&e.srcCanvas.delete(r)}}function np(){return{ready:!1,app:null,renderer:null,ctors:null,baseUrl:null,textures:new Map,animations:new Map,live:new Set,defaultParent:null,overlay:null,categoryIndex:null}}var tn=null,re=np(),op=ja(),rp={...Va};function ie(){return re}function tt(){return op}function Tt(){return rp}function to(){return re.ready}async function Ka(){return re.ready?!0:tn||(tn=(async()=>{let e=performance.now();He("init start");let t=await Yt(ae.appReady,15e3,"PIXI app");He("app ready");let n=await Yt(ae.rendererReady,15e3,"PIXI renderer");He("renderer ready"),re.app=t,re.renderer=n||t?.renderer||null,re.ctors=await Wa(t),He("constructors resolved"),re.baseUrl=await he.base(),He("base url",re.baseUrl);let{textures:o,animations:r,categoryIndex:a}=await Ba(re.baseUrl,re.ctors);return re.textures=o,re.animations=r,re.categoryIndex=a,He("atlases loaded","textures",re.textures.size,"animations",re.animations.size,"categories",re.categoryIndex?.size??0),re.ready=!0,He("ready in",Math.round(performance.now()-e),"ms"),!0})(),tn)}var We={Gold:{overlayTall:null,tallIconOverride:null},Rainbow:{overlayTall:null,tallIconOverride:null,angle:130,angleTall:0},Wet:{overlayTall:"sprite/mutation-overlay/WetTallPlant",tallIconOverride:"sprite/mutation/Puddle"},Chilled:{overlayTall:"sprite/mutation-overlay/ChilledTallPlant",tallIconOverride:null},Frozen:{overlayTall:"sprite/mutation-overlay/FrozenTallPlant",tallIconOverride:null},Dawnlit:{overlayTall:null,tallIconOverride:null},Ambershine:{overlayTall:null,tallIconOverride:null},Dawncharged:{overlayTall:null,tallIconOverride:null},Ambercharged:{overlayTall:null,tallIconOverride:null}},Ja=Object.keys(We),ap=["Gold","Rainbow","Wet","Chilled","Frozen","Ambershine","Dawnlit","Dawncharged","Ambercharged"],qa=new Map(ap.map((e,t)=>[e,t]));function nn(e){return[...new Set(e.filter(Boolean))].sort((n,o)=>(qa.get(n)??1/0)-(qa.get(o)??1/0))}var ip=["Wet","Chilled","Frozen"];var Xa=new Set(["Dawnlit","Ambershine","Dawncharged","Ambercharged"]),Ya={Banana:.6,Carrot:.6,Sunflower:.5,Starweaver:.5,FavaBean:.25,BurrosTail:.2},Qa={Pepper:.5,Banana:.6},Za=256,ei=.5,ti=2;function no(e){if(!e.length)return{muts:[],overlayMuts:[],selectedMuts:[],sig:""};let t=nn(e),n=sp(e),o=lp(e);return{muts:n,overlayMuts:o,selectedMuts:t,sig:`${t.join(",")}|${n.join(",")}|${o.join(",")}`}}function sp(e){let t=e.filter((r,a,i)=>We[r]&&i.indexOf(r)===a);if(!t.length)return[];if(t.includes("Gold"))return["Gold"];if(t.includes("Rainbow"))return["Rainbow"];let n=["Ambershine","Dawnlit","Dawncharged","Ambercharged"];return t.some(r=>n.includes(r))?nn(t.filter(r=>!ip.includes(r))):nn(t)}function lp(e){let t=e.filter((n,o,r)=>We[n]?.overlayTall&&r.indexOf(n)===o);return nn(t)}function on(e,t){return e.map(n=>({name:n,meta:We[n],overlayTall:We[n]?.overlayTall??null,isTall:t}))}var cp={Gold:{op:"source-atop",colors:["rgb(235,200,0)"],a:.7},Rainbow:{op:"color",colors:["#FF1744","#FF9100","#FFEA00","#00E676","#2979FF","#D500F9"],ang:130,angTall:0,masked:!0},Wet:{op:"source-atop",colors:["rgb(50,180,200)"],a:.25},Chilled:{op:"source-atop",colors:["rgb(100,160,210)"],a:.45},Frozen:{op:"source-atop",colors:["rgb(100,130,220)"],a:.5},Dawnlit:{op:"source-atop",colors:["rgb(209,70,231)"],a:.5},Ambershine:{op:"source-atop",colors:["rgb(190,100,40)"],a:.5},Dawncharged:{op:"source-atop",colors:["rgb(140,80,200)"],a:.5},Ambercharged:{op:"source-atop",colors:["rgb(170,60,25)"],a:.5}};var rn=(()=>{try{let t=document.createElement("canvas").getContext("2d");if(!t)return new Set;let n=["color","hue","saturation","luminosity","overlay","screen","lighter","source-atop"],o=new Set;for(let r of n)t.globalCompositeOperation=r,t.globalCompositeOperation===r&&o.add(r);return o}catch{return new Set}})();function up(e){return rn.has(e)?e:rn.has("overlay")?"overlay":rn.has("screen")?"screen":rn.has("lighter")?"lighter":"source-atop"}function dp(e,t,n,o,r=!1){let a=(o-90)*Math.PI/180,i=t/2,s=n/2;if(!r){let u=Math.min(t,n)/2;return e.createLinearGradient(i-Math.cos(a)*u,s-Math.sin(a)*u,i+Math.cos(a)*u,s+Math.sin(a)*u)}let l=Math.cos(a),c=Math.sin(a),d=Math.abs(l)*t/2+Math.abs(c)*n/2;return e.createLinearGradient(i-l*d,s-c*d,i+l*d,s+c*d)}function ni(e,t,n,o,r=!1){let a=o.colors?.length?o.colors:["#fff"],i=o.ang!=null?dp(e,t,n,o.ang,r):e.createLinearGradient(0,0,0,n);a.length===1?(i.addColorStop(0,a[0]),i.addColorStop(1,a[0])):a.forEach((s,l)=>i.addColorStop(l/(a.length-1),s)),e.fillStyle=i,e.fillRect(0,0,t,n)}function oi(e,t,n,o){let r=cp[n];if(!r)return;let a={...r};n==="Rainbow"&&o&&a.angTall!=null&&(a.ang=a.angTall);let i=n==="Rainbow"&&o,s=t.width,l=t.height;e.save();let c=a.masked?up(a.op):"source-in";if(e.globalCompositeOperation=c,a.a!=null&&(e.globalAlpha=a.a),a.masked){let d=document.createElement("canvas");d.width=s,d.height=l;let u=d.getContext("2d");u.imageSmoothingEnabled=!1,ni(u,s,l,a,i),u.globalCompositeOperation="destination-in",u.drawImage(t,0,0),e.drawImage(d,0,0)}else ni(e,s,l,a,i);e.restore()}function ri(e){return/tallplant/i.test(e)}function an(e){let t=String(e||"").split("/");return t[t.length-1]||""}function ai(e){switch(e){case"Ambershine":return["Ambershine","Amberlit"];case"Dawncharged":return["Dawncharged","Dawnbound"];case"Ambercharged":return["Ambercharged","Amberbound"];default:return[e]}}function pp(e,t){let n=String(e||"").toLowerCase();for(let o of t.keys()){let r=/sprite\/mutation-overlay\/([A-Za-z0-9]+)TallPlant/i.exec(String(o));if(!r||!r[1])continue;if(r[1].toLowerCase()===n){let i=t.get(o);if(i)return{tex:i,key:o}}}return null}function ii(e,t,n,o){if(!t)return null;let r=an(e),a=ai(t);for(let i of a){let s=[`sprite/mutation/${i}${r}`,`sprite/mutation/${i}-${r}`,`sprite/mutation/${i}_${r}`,`sprite/mutation/${i}/${r}`,`sprite/mutation/${i}`];for(let l of s){let c=n.get(l);if(c)return{tex:c,key:l}}if(o){let l=`sprite/mutation-overlay/${i}TallPlant`,c=n.get(l);if(c)return{tex:c,key:l};let d=`sprite/mutation-overlay/${i}`,u=n.get(d);if(u)return{tex:u,key:d};let p=pp(t,n);if(p)return p}}return null}function si(e,t,n,o){if(!t)return null;let r=We[t];if(n&&r?.tallIconOverride){let s=o.get(r.tallIconOverride);if(s)return s}let a=an(e),i=ai(t);for(let s of i){let l=[`sprite/mutation/${s}Icon`,`sprite/mutation/${s}`,`sprite/mutation/${s}${a}`,`sprite/mutation/${s}-${a}`,`sprite/mutation/${s}_${a}`,`sprite/mutation/${s}/${a}`];for(let c of l){let d=o.get(c);if(d)return d}if(n){let c=`sprite/mutation-overlay/${s}TallPlantIcon`,d=o.get(c);if(d)return d;let u=`sprite/mutation-overlay/${s}TallPlant`,p=o.get(u);if(p)return p}}return null}function li(e,t,n){let o=e?.orig?.width??e?.frame?.width??e?.width??1,r=e?.orig?.height??e?.frame?.height??e?.height??1,a=e?.defaultAnchor?.x??0,i=e?.defaultAnchor?.y??0,s=Qa[t]??a,l=r>o*1.5,c=Ya[t]??(l?i:.4),d={x:(s-a)*o,y:(c-i)*r},u=Math.min(o,r),p=Math.min(1.5,u/Za),m=ei*p;return n&&(m*=ti),{width:o,height:r,anchorX:a,anchorY:i,offset:d,iconScale:m}}function oo(e,t,n,o,r){let a=$a(o,e);if(a)return a;let i=null;try{if(t?.extract?.canvas){let s=new n.Sprite(e);i=t.extract.canvas(s),s.destroy?.({children:!0,texture:!1,baseTexture:!1})}}catch{}if(!i){let s=e?.frame||e?._frame,l=e?.orig||e?._orig,c=e?.trim||e?._trim,d=e?.rotate||e?._rotate||0,u=e?.baseTexture?.resource?.source||e?.baseTexture?.resource||e?.source?.resource?.source||e?.source?.resource||e?._source?.resource?.source||null;if(!s||!u)throw new Error("textureToCanvas fail");i=document.createElement("canvas");let p=Math.max(1,(l?.width??s.width)|0),m=Math.max(1,(l?.height??s.height)|0),b=c?.x??0,f=c?.y??0;i.width=p,i.height=m;let g=i.getContext("2d");g.imageSmoothingEnabled=!1,d===!0||d===2||d===8?(g.save(),g.translate(b+s.height/2,f+s.width/2),g.rotate(-Math.PI/2),g.drawImage(u,s.x,s.y,s.width,s.height,-s.width/2,-s.height/2,s.width,s.height),g.restore()):g.drawImage(u,s.x,s.y,s.width,s.height,b,f,s.width,s.height)}return Ua(o,e,i,r),i}function mp(e,t,n,o,r,a,i,s){let{w:l,h:c,aX:d,aY:u,basePos:p}=t,m=[];for(let b of n){let f=new o.Sprite(e);f.anchor?.set?.(d,u),f.position.set(p.x,p.y),f.zIndex=1;let g=document.createElement("canvas");g.width=l,g.height=c;let h=g.getContext("2d");h.imageSmoothingEnabled=!1,h.save(),h.translate(l*d,c*u),h.drawImage(oo(e,r,o,a,i),-l*d,-c*u),h.restore(),oi(h,g,b.name,b.isTall);let S=o.Texture.from(g);s.push(S),f.texture=S,m.push(f)}return m}function gp(e,t,n,o,r,a,i,s,l,c){let{aX:d,basePos:u}=t,p=[];for(let m of n){let b=m.overlayTall&&o.get(m.overlayTall)&&{tex:o.get(m.overlayTall),key:m.overlayTall}||ii(e,m.name,o,!0);if(!b?.tex)continue;let f=oo(b.tex,a,r,i,s);if(!f)continue;let g=f.width,h={x:0,y:0},S={x:u.x-d*g,y:0},T=document.createElement("canvas");T.width=g,T.height=f.height;let x=T.getContext("2d");if(!x)continue;x.imageSmoothingEnabled=!1,x.drawImage(f,0,0),x.globalCompositeOperation="destination-in",x.drawImage(l,-S.x,-S.y);let v=r.Texture.from(T);c.push(v);let k=new r.Sprite(v);k.anchor?.set?.(h.x,h.y),k.position.set(S.x,S.y),k.scale.set(1),k.alpha=1,k.zIndex=3,p.push(k)}return p}function fp(e,t,n,o,r,a){let{basePos:i}=t,s=[];for(let l of n){if(l.name==="Gold"||l.name==="Rainbow")continue;let c=si(e,l.name,l.isTall,o);if(!c)continue;let d=new r.Sprite(c),u=c?.defaultAnchor?.x??.5,p=c?.defaultAnchor?.y??.5;d.anchor?.set?.(u,p),d.position.set(i.x+a.offset.x,i.y+a.offset.y),d.scale.set(a.iconScale),l.isTall&&(d.zIndex=-1),Xa.has(l.name)&&(d.zIndex=10),d.zIndex||(d.zIndex=2),s.push(d)}return s}function ro(e,t,n,o){try{if(!e||!o.renderer||!o.ctors?.Container||!o.ctors?.Sprite||!o.ctors?.Texture)return null;let{Container:r,Sprite:a,Texture:i}=o.ctors,s=e?.orig?.width??e?.frame?.width??e?.width??1,l=e?.orig?.height??e?.frame?.height??e?.height??1,c=e?.defaultAnchor?.x??.5,d=e?.defaultAnchor?.y??.5,u={x:s*c,y:l*d},p=oo(e,o.renderer,o.ctors,o.cacheState,o.cacheConfig),m=new r;m.sortableChildren=!0;let b=new a(e);b.anchor?.set?.(c,d),b.position.set(u.x,u.y),b.zIndex=0,m.addChild(b);let f=ri(t),g=on(n.muts,f),h=on(n.overlayMuts,f),S=on(n.selectedMuts,f),T=[],x={w:s,h:l,aX:c,aY:d,basePos:u},v=an(t),k=li(e,v,f);mp(e,x,g,o.ctors,o.renderer,o.cacheState,o.cacheConfig,T).forEach(M=>m.addChild(M)),f&&gp(t,x,h,o.textures,o.ctors,o.renderer,o.cacheState,o.cacheConfig,p,T).forEach(U=>m.addChild(U)),fp(t,x,S,o.textures,o.ctors,k).forEach(M=>m.addChild(M));let L=null;if(typeof o.renderer.generateTexture=="function"?L=o.renderer.generateTexture(m,{resolution:1}):o.renderer.textureGenerator?.generateTexture&&(L=o.renderer.textureGenerator.generateTexture({target:m,resolution:1})),!L)throw new Error("no render texture");let O=L instanceof i?L:i.from(o.renderer.extract.canvas(L));L&&L!==O&&L.destroy?.(!0),m.destroy({children:!0,texture:!1,baseTexture:!1});try{O.__mg_gen=!0,O.label=`${t}|${n.sig}`}catch{}return O}catch{return null}}function ci(e,t,n,o){if(!e||e.length<2)return null;let r=[];for(let a of e){let i=ro(a,t,n,o);i&&r.push(i)}return r.length>=2?r:null}function bp(e){if(e.overlay)return e.overlay;let t=new e.ctors.Container;t.sortableChildren=!0,t.zIndex=99999999;try{e.app.stage.sortableChildren=!0}catch{}return e.app.stage.addChild(t),e.overlay=t,t}function hp(e){let t=e.defaultParent;if(!t)return null;try{return typeof t=="function"?t():t}catch{return null}}function ui(e,t,n,o,r,a){if(!n.length)return t;let i=no(n);if(!i.sig)return t;let s=Qn(e,i),l=Zn(r,s);if(l?.tex)return l.tex;let c=ro(t,e,i,{renderer:o.renderer,ctors:o.ctors,textures:o.textures,cacheState:r,cacheConfig:a});return c?(eo(r,s,{isAnim:!1,tex:c},a),c):t}function di(e,t,n,o,r,a){if(!n.length)return t;let i=no(n);if(!i.sig)return t;let s=Qn(e,i),l=Zn(r,s);if(l?.isAnim&&l.frames?.length)return l.frames;let c=ci(t,e,i,{renderer:o.renderer,ctors:o.ctors,textures:o.textures,cacheState:r,cacheConfig:a});return c?(eo(r,s,{isAnim:!0,frames:c},a),c):t}function ao(e,t,n,o,r,a={}){if(!e.ready)throw new Error("MGSprite not ready yet");let i=et(o,r,e.textures,e.animations),s=a.mutations||[],l=a.parent||hp(e)||bp(e),c=e.renderer?.width||e.renderer?.view?.width||innerWidth,d=e.renderer?.height||e.renderer?.view?.height||innerHeight,u=a.center?c/2:a.x??c/2,p=a.center?d/2:a.y??d/2,m,b=e.animations.get(i);if(b&&b.length>=2){let h=di(i,b,s,e,t,n),S=e.ctors.AnimatedSprite;if(S)m=new S(h),m.animationSpeed=a.fps?a.fps/60:a.speed??.15,m.loop=a.loop??!0,m.play();else{let T=new e.ctors.Sprite(h[0]),v=1e3/Math.max(1,a.fps||8),k=0,E=0,I=L=>{let O=e.app.ticker?.deltaMS??L*16.666666666666668;if(k+=O,k<v)return;let M=k/v|0;k%=v,E=(E+M)%h.length,T.texture=h[E]};T.__mgTick=I,e.app.ticker?.add?.(I),m=T}}else{let h=e.textures.get(i);if(!h)throw new Error(`Unknown sprite/anim key: ${i}`);let S=ui(i,h,s,e,t,n);m=new e.ctors.Sprite(S)}let f=a.anchorX??m.texture?.defaultAnchor?.x??.5,g=a.anchorY??m.texture?.defaultAnchor?.y??.5;return m.anchor?.set?.(f,g),m.position.set(u,p),m.scale.set(a.scale??1),m.alpha=a.alpha??1,m.rotation=a.rotation??0,m.zIndex=a.zIndex??999999,l.addChild(m),e.live.add(m),m.__mgDestroy=()=>{try{m.__mgTick&&e.app.ticker?.remove?.(m.__mgTick)}catch{}try{m.destroy?.({children:!0,texture:!1,baseTexture:!1})}catch{try{m.destroy?.()}catch{}}e.live.delete(m)},m}function yp(e,t){let n=e.renderer;if(n?.extract?.canvas)return n.extract.canvas(t);if(n?.plugins?.extract?.canvas)return n.plugins.extract.canvas(t);throw new Error("No extract.canvas available on renderer")}function io(e,t,n,o,r,a={}){if(!e.ready)throw new Error("MGSprite not ready yet");let i=et(o,r,e.textures,e.animations),s=a.mutations||[],l=e.animations.get(i),c=Math.max(0,(a.frameIndex??0)|0),d;if(l?.length){let S=di(i,l,s,e,t,n);d=S[c%S.length]}else{let S=e.textures.get(i);if(!S)throw new Error(`Unknown sprite/anim key: ${i}`);d=ui(i,S,s,e,t,n)}let u=new e.ctors.Sprite(d),p=a.anchorX??u.texture?.defaultAnchor?.x??.5,m=a.anchorY??u.texture?.defaultAnchor?.y??.5;u.anchor?.set?.(p,m),u.scale.set(a.scale??1);let b=a.pad??2,f=new e.ctors.Container;f.addChild(u);try{f.updateTransform?.()}catch{}let g=u.getBounds?.(!0)||{x:0,y:0,width:u.width,height:u.height};u.position.set(-g.x+b,-g.y+b);let h=yp(e,f);try{f.destroy?.({children:!0})}catch{}return h}function pi(e){for(let t of Array.from(e.live))t.__mgDestroy?.()}function mi(e,t){return e.defaultParent=t,!0}function gi(e,t){return e.defaultParent=t,!0}function nt(){if(!to())throw new Error("MGSprite not ready yet")}function xp(e,t,n){return typeof t=="string"?ao(ie(),tt(),Tt(),e,t,n||{}):ao(ie(),tt(),Tt(),null,e,t||{})}function vp(e,t,n){return typeof t=="string"?io(ie(),tt(),Tt(),e,t,n||{}):io(ie(),tt(),Tt(),null,e,t||{})}function wp(){pi(ie())}function Sp(e){return mi(ie(),e)}function kp(e){return gi(ie(),e)}function Tp(e,t){let n=ie(),o=typeof t=="string"?et(e,t,n.textures,n.animations):et(null,e,n.textures,n.animations);return n.textures.has(o)||n.animations.has(o)}function Ap(){nt();let e=ie().categoryIndex;return e?Array.from(e.keys()).sort((t,n)=>t.localeCompare(n)):[]}function Cp(e){nt();let t=String(e||"").trim();if(!t)return[];let n=ie().categoryIndex;return n?Array.from(n.get(t)?.values()||[]).sort((o,r)=>o.localeCompare(r)):[]}function Pp(e,t){nt();let n=String(e||"").trim(),o=String(t||"").trim();if(!n||!o)return!1;let r=ie().categoryIndex;if(!r)return!1;let a=n.toLowerCase(),i=o.toLowerCase();for(let[s,l]of r.entries())if(s.toLowerCase()===a){for(let c of l.values())if(c.toLowerCase()===i)return!0}return!1}function Mp(e){nt();let t=ie().categoryIndex;if(!t)return[];let n=String(e||"").trim().toLowerCase(),o=[];for(let[r,a]of t.entries())for(let i of a.values()){let s=Ze(r,i);(!n||s.toLowerCase().startsWith(n))&&o.push(s)}return o.sort((r,a)=>r.localeCompare(a))}function Ep(e){nt();let t=String(e||"").trim();if(!t)return null;let n=kt(t),o=/^sprite\/([^/]+)\/(.+)$/.exec(n);if(!o)return null;let r=o[1],a=o[2],i=ie().categoryIndex,s=r.toLowerCase(),l=a.toLowerCase(),c=r,d=a;if(i){let u=Array.from(i.keys()).find(b=>b.toLowerCase()===s);if(!u)return null;c=u;let p=i.get(u);if(!p)return null;let m=Array.from(p.values()).find(b=>b.toLowerCase()===l);if(!m)return null;d=m}return{category:c,id:d,key:Ze(c,d)}}function Ip(e,t){nt();let n=String(e||"").trim(),o=String(t||"").trim();if(!n||!o)throw new Error("getIdPath(category, id) requires both category and id");let r=ie().categoryIndex;if(!r)throw new Error("Sprite categories not indexed");let a=n.toLowerCase(),i=o.toLowerCase(),s=Array.from(r.keys()).find(d=>d.toLowerCase()===a)||n,l=r.get(s);if(!l)throw new Error(`Unknown sprite category: ${n}`);let c=Array.from(l.values()).find(d=>d.toLowerCase()===i)||o;if(!l.has(c))throw new Error(`Unknown sprite id: ${n}/${o}`);return Ze(s,c)}function Lp(){za(tt())}function Rp(){return[...Ja]}var we={init:Ka,ready:to,show:xp,toCanvas:vp,clear:wp,attach:Sp,attachProvider:kp,has:Tp,key:(e,t)=>Ze(e,t),getCategories:Ap,getCategoryId:Cp,hasId:Pp,listIds:Mp,getIdInfo:Ep,getIdPath:Ip,clearMutationCache:Lp,getMutationNames:Rp};var lo=A,Ce=lo.Object??Object,co=Ce.keys,sn=Ce.values,ln=Ce.entries,Be={items:["WateringCan","PlanterPot","Shovel"],decor:["SmallRock","MediumRock","LargeRock","WoodBench","StoneBench","MarbleBench"],mutations:["Gold","Rainbow","Wet","Chilled","Frozen"],eggs:["CommonEgg","UncommonEgg","RareEgg"],pets:["Worm","Snail","Bee","Chicken","Bunny"],abilities:["ProduceScaleBoost","DoubleHarvest","SeedFinderI","CoinFinderI"],plants:["Carrot","Strawberry","Aloe","Blueberry","Apple"]},Op=["Rain","Frost","Dawn","AmberMoon"],fi=/main-[^/]+\.js(\?|$)/,Hp=3,_p=200,Np=50,bi=new WeakSet,K={isReady:!1,isHookInstalled:!1,data:{items:null,decor:null,mutations:null,eggs:null,pets:null,abilities:null,plants:null,weather:null},spritesResolved:!1,spritesResolving:null,weatherPollingTimer:null,weatherPollAttempts:0},Ve=(e,t)=>t.every(n=>e.includes(n));function je(e,t){K.data[e]==null&&(K.data[e]=t,Gp()&&xi())}function Gp(){return Object.values(K.data).every(e=>e!=null)}function hi(e,t){if(!e||typeof e!="object"||bi.has(e))return;bi.add(e);let n;try{n=co(e)}catch{return}if(!n||n.length===0)return;let o=e,r;if(!K.data.items&&Ve(n,Be.items)&&(r=o.WateringCan,r&&typeof r=="object"&&"coinPrice"in r&&"creditPrice"in r&&je("items",o)),!K.data.decor&&Ve(n,Be.decor)&&(r=o.SmallRock,r&&typeof r=="object"&&"coinPrice"in r&&"creditPrice"in r&&je("decor",o)),!K.data.mutations&&Ve(n,Be.mutations)&&(r=o.Gold,r&&typeof r=="object"&&"baseChance"in r&&"coinMultiplier"in r&&je("mutations",o)),!K.data.eggs&&Ve(n,Be.eggs)&&(r=o.CommonEgg,r&&typeof r=="object"&&"faunaSpawnWeights"in r&&"secondsToHatch"in r&&je("eggs",o)),!K.data.pets&&Ve(n,Be.pets)&&(r=o.Worm,r&&typeof r=="object"&&"coinsToFullyReplenishHunger"in r&&"diet"in r&&Array.isArray(r.diet)&&je("pets",o)),!K.data.abilities&&Ve(n,Be.abilities)&&(r=o.ProduceScaleBoost,r&&typeof r=="object"&&"trigger"in r&&"baseParameters"in r&&je("abilities",o)),!K.data.plants&&Ve(n,Be.plants)&&(r=o.Carrot,r&&typeof r=="object"&&"seed"in r&&"plant"in r&&"crop"in r&&je("plants",o)),!(t>=Hp))for(let a of n){let i;try{i=o[a]}catch{continue}i&&typeof i=="object"&&hi(i,t+1)}}function so(e){try{hi(e,0)}catch{}}function yi(){if(!K.isHookInstalled){K.isHookInstalled=!0;try{Ce.keys=function(t){return so(t),co.apply(this,arguments)},sn&&(Ce.values=function(t){return so(t),sn.apply(this,arguments)}),ln&&(Ce.entries=function(t){return so(t),ln.apply(this,arguments)})}catch{}}}function xi(){if(K.isHookInstalled){try{Ce.keys=co,sn&&(Ce.values=sn),ln&&(Ce.entries=ln)}catch{}K.isHookInstalled=!1}}function Dp(){try{for(let e of lo.document?.scripts||[]){let t=e?.src?String(e.src):"";if(fi.test(t))return t}}catch{}try{for(let e of lo.performance?.getEntriesByType?.("resource")||[]){let t=e?.name?String(e.name):"";if(fi.test(t))return t}}catch{}return null}function Wp(e,t){let n=Math.max(e.lastIndexOf("const ",t),e.lastIndexOf("let ",t),e.lastIndexOf("var ",t));if(n<0)return null;let o=e.indexOf("=",n);if(o<0||o>t)return null;let r=e.indexOf("{",o);if(r<0||r>t)return null;let a=0,i="",s=!1;for(let l=r;l<e.length;l++){let c=e[l];if(i){if(s){s=!1;continue}if(c==="\\"){s=!0;continue}c===i&&(i="");continue}if(c==='"'||c==="'"){i=c;continue}if(c==="{")a++;else if(c==="}"&&--a===0)return e.slice(r,l+1)}return null}function Bp(e){let t={},n=!1;for(let o of Op){let r=e?.[o];if(!r||typeof r!="object")continue;let a=r.iconSpriteKey||null,{iconSpriteKey:i,...s}=r;t[o]={weatherId:o,spriteId:a,...s},n=!0}return t.Sunny||(t.Sunny={weatherId:"Sunny",name:"Sunny",spriteId:"sprite/ui/SunnyIcon",type:"primary"}),!n||t.Rain&&t.Rain.mutator?.mutation!=="Wet"?null:t}async function Vp(){if(K.data.weather)return!0;let e=Dp();if(!e)return!1;let t="";try{let s=await fetch(e,{credentials:"include"});if(!s.ok)return!1;t=await s.text()}catch{return!1}let n=t.indexOf("fixedTimeSlots:[0,48,96,144,192,240]");if(n<0&&(n=t.indexOf('name:"Amber Moon"')),n<0)return!1;let o=Wp(t,n);if(!o)return!1;let r=o.replace(/\b[A-Za-z_$][\w$]*\.(Rain|Frost|Dawn|AmberMoon)\b/g,'"$1"'),a;try{a=Function('"use strict";return('+r+")")()}catch{return!1}let i=Bp(a);return i?(K.data.weather=i,!0):!1}function jp(){if(K.weatherPollingTimer)return;K.weatherPollAttempts=0;let e=setInterval(async()=>{(await Vp()||++K.weatherPollAttempts>_p)&&(clearInterval(e),K.weatherPollingTimer=null)},Np);K.weatherPollingTimer=e}function Fp(e){return String(e||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^A-Za-z0-9]/g,"").trim()}function zp(e,t=[]){let n=new Set,o=r=>{let a=String(r||"").trim();a&&n.add(a)};o(e);for(let r of t)o(r);for(let r of Array.from(n.values()))r.endsWith("s")?o(r.slice(0,-1)):o(`${r}s`),r.endsWith("es")&&o(r.slice(0,-2));return Array.from(n.values()).filter(Boolean)}function vi(e,t,n,o=[],r=[]){let a=zp(e,o);if(!a.length)return null;let i=[t,...r].filter(d=>typeof d=="string"),s=d=>{let u=String(d||"").trim();if(!u)return null;for(let p of a)try{if(we.has(p,u))return we.getIdPath(p,u)}catch{}return null};for(let d of i){let u=s(d);if(u)return u}let l=Fp(n||""),c=s(l||n||"");if(c)return c;try{for(let d of a){let u=we.listIds(`sprite/${d}/`),p=i.map(b=>String(b||"").toLowerCase()),m=String(n||l||"").toLowerCase();for(let b of u){let g=(b.split("/").pop()||"").toLowerCase();if(p.some(h=>h&&h===g)||g===m)return b}for(let b of u){let g=(b.split("/").pop()||"").toLowerCase();if(p.some(h=>h&&g.includes(h))||m&&g.includes(m))return b}}}catch{}return null}function fe(e,t,n,o,r=[],a=[]){if(!e||typeof e!="object")return;let i=e.tileRef;if(!i||typeof i!="object")return;let s=String(i.spritesheet||t||"").trim(),l=vi(s,n,o,r,a);if(l)try{e.spriteId=l}catch{}let c=e.rotationVariants;if(c&&typeof c=="object")for(let d of Object.values(c))fe(d,s,n,o);if(e.immatureTileRef){let d={tileRef:e.immatureTileRef};fe(d,s,n,o),d.spriteId&&(e.immatureSpriteId=d.spriteId)}if(e.topmostLayerTileRef){let d={tileRef:e.topmostLayerTileRef};fe(d,s,n,o),d.spriteId&&(e.topmostLayerSpriteId=d.spriteId)}e.activeState&&typeof e.activeState=="object"&&fe(e.activeState,s,n,e.activeState?.name||o)}function $p(e,t,n,o=[]){if(!Array.isArray(t)||t.length===0)return null;let r=t[0],a=t.slice(1);return vi(e,r,n??null,o,a)}function Up(e){for(let[t,n]of Object.entries(e.items||{}))fe(n,"items",t,n?.name,["item"]);for(let[t,n]of Object.entries(e.decor||{}))fe(n,"decor",t,n?.name);for(let[t,n]of Object.entries(e.mutations||{})){fe(n,"mutations",t,n?.name,["mutation"]);let o=$p("mutation-overlay",[`${t}TallPlant`,`${t}TallPlantIcon`,t],n?.name,["mutation-overlay"]);if(o)try{n.overlaySpriteId=o}catch{}}for(let[t,n]of Object.entries(e.eggs||{}))fe(n,"pets",t,n?.name,["pet"]);for(let[t,n]of Object.entries(e.pets||{}))fe(n,"pets",t,n?.name,["pet"]);for(let[t,n]of Object.entries(e.plants||{})){let o=n;o.seed&&fe(o.seed,o.seed?.tileRef?.spritesheet||"seeds",`${t}Seed`,o.seed?.name||`${t} Seed`,["seed","plant","plants"],[t]),o.plant&&fe(o.plant,o.plant?.tileRef?.spritesheet||"plants",`${t}Plant`,o.plant?.name||`${t} Plant`,["plant","plants","tallplants"],[t]),o.crop&&fe(o.crop,o.crop?.tileRef?.spritesheet||"plants",t,o.crop?.name||t,["plant","plants"],[`${t}Crop`])}}async function wi(){if(!K.spritesResolved)return K.spritesResolving||(K.spritesResolving=(async()=>{try{await Si(2e4,50),await we.init(),Up(K.data),K.spritesResolved=!0}catch(e){try{console.warn("[MGData] sprite resolution failed",e)}catch{}}finally{K.spritesResolving=null}})()),K.spritesResolving}async function Kp(){return K.isReady||(yi(),jp(),wi(),K.isReady=!0),!0}function qp(){return K.isReady}function Jp(){return xi(),K.weatherPollingTimer&&(clearInterval(K.weatherPollingTimer),K.weatherPollingTimer=null),K.isReady=!1,!0}function Xp(){return!K.spritesResolved&&!K.spritesResolving&&wi(),{...K.data}}function Yp(e){return K.data[e]??null}function Qp(e){return K.data[e]!=null}async function Si(e=1e4,t=50){let n=Date.now();for(;Date.now()-n<e;){if(Object.values(K.data).some(o=>o!=null))return{...K.data};await Te(t)}throw new Error("MGData.waitForAnyData: timeout")}async function Zp(e,t=1e4,n=50){let o=Date.now();for(;Date.now()-o<t;){let r=K.data[e];if(r!=null)return r;await Te(n)}throw new Error(`MGData.waitFor: timeout waiting for "${e}"`)}var At={init:Kp,isReady:qp,stop:Jp,getAll:Xp,get:Yp,has:Qp,waitForAnyData:Si,waitFor:Zp};yi();Ae();var cn=null,ye={ready:!1,xform:null,xformAt:0};function rt(e){try{if(typeof structuredClone=="function")return structuredClone(e)}catch{}try{return JSON.parse(JSON.stringify(e))}catch{}return e}function Ct(){return ae.tos()}function mo(){return ae.engine()}function em(){let e=Ct()?.map?.cols;return Number.isFinite(e)&&e>0?e:null}function go(e,t){let n=em();return n?t*n+e|0:null}function Fe(e,t,n=!0){let o=Ct(),r=go(e,t);if(!o||r==null)return{gidx:null,tv:null};let a=o.tileViews?.get?.(r)||null;if(!a&&n&&typeof o.getOrCreateTileView=="function")try{a=o.getOrCreateTileView(r)}catch{}return{gidx:r,tv:a||null}}function ot(e,t,n,o={}){let r=o.ensureView!==!1,a=o.forceUpdate!==!1,i=mo(),{gidx:s,tv:l}=Fe(Number(e),Number(t),r);if(s==null)throw new Error("MGTile: cols unavailable (engine/TOS not ready)");if(!l)throw new Error("MGTile: TileView unavailable (not instantiated)");let c=l.tileObject;if(typeof l.onDataChanged!="function")throw new Error("MGTile: tileView.onDataChanged not found (different API?)");if(l.onDataChanged(n),a&&i?.reusableContext&&typeof l.update=="function")try{l.update(i.reusableContext)}catch{}return{ok:!0,tx:Number(e),ty:Number(t),gidx:s,before:c,after:l.tileObject}}function fo(e,t){if(!e)throw new Error("MGTile: no tileObject on this tile");if(e.objectType!==t)throw new Error(`MGTile: expected objectType "${t}", got "${e.objectType}"`)}function uo(e,t){if("startTime"in t&&(e.startTime=Number(t.startTime)),"endTime"in t&&(e.endTime=Number(t.endTime)),"targetScale"in t&&(e.targetScale=Number(t.targetScale)),"mutations"in t){if(!Array.isArray(t.mutations))throw new Error("MGTile: mutations must be an array of strings");e.mutations=t.mutations.slice()}}function Pe(){if(!ye.ready)throw new Error("MGTile: not ready. Call MGTile.init() first.")}function po(e){if(!e)return null;let t=r=>r&&(typeof r.getGlobalPosition=="function"||typeof r.toGlobal=="function"),n=["container","root","view","tile","ground","base","floor","bg","background","baseSprite","tileSprite","displayObject","gfx","graphics","sprite"];for(let r of n)if(t(e[r]))return e[r];if(t(e))return e;let o=[e.container,e.root,e.view,e.displayObject,e.tileSprite,e.gfx,e.graphics,e.sprite];for(let r of o)if(t(r))return r;try{for(let r of Object.keys(e))if(t(e[r]))return e[r]}catch{}return null}function un(e){let t=ce(()=>e?.getGlobalPosition?.());if(t&&Number.isFinite(t.x)&&Number.isFinite(t.y))return{x:t.x,y:t.y};let n=ce(()=>e?.toGlobal?.({x:0,y:0}));return n&&Number.isFinite(n.x)&&Number.isFinite(n.y)?{x:n.x,y:n.y}:null}function tm(e){try{if(!e?.getBounds)return"center";let t=e.getBounds(),n=un(e);if(!n||!t||!Number.isFinite(t.width)||!Number.isFinite(t.height))return"center";let o=t.x+t.width/2,r=t.y+t.height/2;return Math.hypot(n.x-o,n.y-r)<Math.hypot(n.x-t.x,n.y-t.y)?"center":"topleft"}catch{return"center"}}function nm(){let e=Ct(),t=e?.map?.cols,n=e?.map?.rows;if(!e||!Number.isFinite(t)||t<=1)return null;let o=Number.isFinite(n)&&n>1?n:null,r=[[0,0],[1,1],[Math.min(2,t-2),0],[0,1]];o&&o>2&&r.push([Math.floor(t/2),Math.floor(o/2)]);for(let[a,i]of r){if(a<0||i<0||a>=t||o&&i>=o)continue;let s=Fe(a,i,!0).tv,l=a+1<t?Fe(a+1,i,!0).tv:null,c=Fe(a,i+1,!0).tv,d=po(s),u=po(l),p=po(c);if(!d||!u||!p)continue;let m=un(d),b=un(u),f=un(p);if(!m||!b||!f)continue;let g={x:b.x-m.x,y:b.y-m.y},h={x:f.x-m.x,y:f.y-m.y},S=g.x*h.y-g.y*h.x;if(!Number.isFinite(S)||Math.abs(S)<1e-6)continue;let T=1/S,x={a:h.y*T,b:-h.x*T,c:-g.y*T,d:g.x*T},v={x:m.x-a*g.x-i*h.x,y:m.y-a*g.y-i*h.y},k=tm(d),E=k==="center"?v:{x:v.x+.5*(g.x+h.x),y:v.y+.5*(g.y+h.y)};return{ok:!0,cols:t,rows:o,vx:g,vy:h,inv:x,anchorMode:k,originCenter:E}}return null}async function om(e=15e3){return ye.ready?!0:cn||(cn=(async()=>{if(await ae.init(e),!Ct())throw new Error("MGTile: engine captured but tileObject system not found");return ye.ready=!0,!0})(),cn)}function rm(){return ae.hook()}function dn(e,t,n={}){Pe();let o=n.ensureView!==!1,r=n.clone!==!1,{gidx:a,tv:i}=Fe(Number(e),Number(t),o);if(a==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!i)return{tx:Number(e),ty:Number(t),gidx:a,tileView:null,tileObject:void 0};let s=i.tileObject;return{tx:Number(e),ty:Number(t),gidx:a,tileView:i,tileObject:r?rt(s):s}}function am(e,t,n={}){return Pe(),ot(e,t,null,n)}function im(e,t,n,o={}){Pe();let a=dn(e,t,{...o,clone:!1}).tileView?.tileObject;fo(a,"plant");let i=rt(a);if(Array.isArray(i.slots)||(i.slots=[]),"plantedAt"in n&&(i.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(i.maturedAt=Number(n.maturedAt)),"species"in n&&(i.species=String(n.species)),"slotIdx"in n&&"slotPatch"in n){let s=Number(n.slotIdx)|0;if(!i.slots[s])throw new Error(`MGTile: plant slot ${s} doesn't exist`);return uo(i.slots[s],n.slotPatch),ot(e,t,i,o)}if("slots"in n){let s=n.slots;if(Array.isArray(s)){for(let l=0;l<s.length;l++)if(s[l]!=null){if(!i.slots[l])throw new Error(`MGTile: plant slot ${l} doesn't exist`);uo(i.slots[l],s[l])}}else if(s&&typeof s=="object")for(let l of Object.keys(s)){let c=Number(l)|0;if(Number.isFinite(c)){if(!i.slots[c])throw new Error(`MGTile: plant slot ${c} doesn't exist`);uo(i.slots[c],s[c])}}else throw new Error("MGTile: patch.slots must be array or object map");return ot(e,t,i,o)}return ot(e,t,i,o)}function sm(e,t,n,o={}){Pe();let a=dn(e,t,{...o,clone:!1}).tileView?.tileObject;fo(a,"decor");let i=rt(a);return"rotation"in n&&(i.rotation=Number(n.rotation)),ot(e,t,i,o)}function lm(e,t,n,o={}){Pe();let a=dn(e,t,{...o,clone:!1}).tileView?.tileObject;fo(a,"egg");let i=rt(a);return"plantedAt"in n&&(i.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(i.maturedAt=Number(n.maturedAt)),ot(e,t,i,o)}function cm(e,t,n,o={}){Pe();let r=o.ensureView!==!1,a=o.forceUpdate!==!1,i=mo(),{gidx:s,tv:l}=Fe(Number(e),Number(t),r);if(s==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!l)throw new Error("MGTile: TileView unavailable");let c=l.tileObject,d=typeof n=="function"?n(rt(c)):n;if(l.onDataChanged(d),a&&i?.reusableContext&&typeof l.update=="function")try{l.update(i.reusableContext)}catch{}return{ok:!0,tx:Number(e),ty:Number(t),gidx:s,before:c,after:l.tileObject}}function um(e,t,n={}){Pe();let o=n.ensureView!==!1,{gidx:r,tv:a}=Fe(Number(e),Number(t),o);if(r==null)throw new Error("MGTile: cols unavailable");if(!a)return{ok:!0,tx:Number(e),ty:Number(t),gidx:r,tv:null,tileObject:void 0};let i=n.clone!==!1,s=a.tileObject;return{ok:!0,tx:Number(e),ty:Number(t),gidx:r,objectType:s?.objectType??null,tileObject:i?rt(s):s,tvKeys:Object.keys(a||{}).sort(),tileView:a}}function ki(){return Pe(),ye.xform=nm(),ye.xformAt=Date.now(),{ok:!!ye.xform?.ok,xform:ye.xform}}function dm(e,t={}){if(Pe(),!e||!Number.isFinite(e.x)||!Number.isFinite(e.y))return null;let n=Number.isFinite(t.maxAgeMs)?Number(t.maxAgeMs):1500;(!ye.xform?.ok||t.forceRebuild||Date.now()-ye.xformAt>n)&&ki();let o=ye.xform;if(!o?.ok)return null;let r=e.x-o.originCenter.x,a=e.y-o.originCenter.y,i=o.inv.a*r+o.inv.b*a,s=o.inv.c*r+o.inv.d*a,l=Math.floor(i),c=Math.floor(s),d=[[l,c],[l+1,c],[l,c+1],[l+1,c+1]],u=null,p=1/0;for(let[m,b]of d){if(m<0||b<0||m>=o.cols||Number.isFinite(o.rows)&&o.rows!==null&&b>=o.rows)continue;let f=o.originCenter.x+m*o.vx.x+b*o.vy.x,g=o.originCenter.y+m*o.vx.y+b*o.vy.y,h=(e.x-f)**2+(e.y-g)**2;h<p&&(p=h,u={tx:m,ty:b,fx:i,fy:s,x:e.x,y:e.y,gidx:null})}return u?(u.gidx=go(u.tx,u.ty),u):null}function pm(){return["MGTile.init()","MGTile.hook()","MGTile.getTileObject(tx,ty) / inspect(tx,ty)","MGTile.setTileEmpty(tx,ty)","MGTile.setTilePlant(tx,ty,{...}) / setTileDecor / setTileEgg","MGTile.setTileObjectRaw(tx,ty,objOrFn)","MGTile.rebuildTransform() / pointToTile({x,y})"].join(`
`)}var Se={init:om,ready:()=>ye.ready,hook:rm,engine:()=>mo(),tos:()=>Ct(),gidx:(e,t)=>go(Number(e),Number(t)),getTileObject:dn,inspect:um,setTileEmpty:am,setTilePlant:im,setTileDecor:sm,setTileEgg:lm,setTileObjectRaw:cm,rebuildTransform:ki,pointToTile:dm,help:pm};Ae();var j={ready:!1,app:null,renderer:null,stage:null,ticker:null,tileSets:new Map,highlights:new Map,watches:new Map,fades:new Map,fadeWatches:new Map},vo=e=>!!e&&typeof e=="object"&&!Array.isArray(e),bo=e=>!!(e&&typeof e.getBounds=="function"&&("parent"in e||"children"in e)),mn=e=>!!(e&&typeof e.tint=="number"),ze=e=>!!(e&&typeof e.alpha=="number");function pn(e,t,n){return e+(t-e)*n}function mm(e,t,n){let o=e>>16&255,r=e>>8&255,a=e&255,i=t>>16&255,s=t>>8&255,l=t&255,c=pn(o,i,n)|0,d=pn(r,s,n)|0,u=pn(a,l,n)|0;return c<<16|d<<8|u}function gm(e,t=900){let n=[],o=[e];for(;o.length&&n.length<t;){let r=o.pop();if(!r)continue;mn(r)&&n.push(r);let a=r.children;if(Array.isArray(a))for(let i=a.length-1;i>=0;i--)o.push(a[i])}return n}function fm(e,t=25e3){let n=[],o=[e],r=0;for(;o.length&&r++<t;){let a=o.pop();if(!a)continue;ze(a)&&n.push(a);let i=a.children;if(Array.isArray(i))for(let s=i.length-1;s>=0;s--)o.push(i[s])}return n}function Ti(e){if(!Array.isArray(e))return[];let t=new Set,n=[];for(let o of e){let r,a;if(Array.isArray(o))r=o[0],a=o[1];else if(vo(o))r=o.x??o.tx,a=o.y??o.ty;else continue;if(r=Number(r),a=Number(a),!Number.isFinite(r)||!Number.isFinite(a))continue;r|=0,a|=0;let i=`${r},${a}`;t.has(i)||(t.add(i),n.push({x:r,y:a}))}return n}function bm(e,t){let n=String(e||"").trim();if(!n)throw new Error("MGPixi.defineTileSet: empty name");let o=Ti(t);return j.tileSets.set(n,o),{ok:!0,name:n,count:o.length}}function hm(e){return j.tileSets.delete(String(e||"").trim())}function ym(){return Array.from(j.tileSets.keys()).sort((e,t)=>e.localeCompare(t))}function Ai(e){return!!(e&&(e.tileSet!=null||Array.isArray(e.tiles)))}function wo(e){let n=Se.tos?.()?.tileViews;if(!n?.entries)throw new Error("MGPixi: TOS.tileViews not found");if(!Ai(e))return{entries:Array.from(n.entries()),gidxSet:null};let o=[];if(e.tileSet!=null){let a=String(e.tileSet||"").trim(),i=j.tileSets.get(a);if(!i)throw new Error(`MGPixi: tileSet not found "${a}"`);o=i}else o=Ti(e.tiles||[]);let r=new Map;for(let a of o){let i=Se.getTileObject(a.x,a.y,{ensureView:!0,clone:!1});i?.tileView&&i.gidx!=null&&r.set(i.gidx,i.tileView)}return{entries:Array.from(r.entries()),gidxSet:new Set(r.keys())}}function So(e){let t=j.highlights.get(e);if(!t)return!1;ce(()=>j.ticker?.remove(t.tick)),t.root&&t.baseAlpha!=null&&ze(t.root)&&ce(()=>{t.root.alpha=t.baseAlpha});for(let n of t.tint)n.o&&mn(n.o)&&ce(()=>{n.o.tint=n.baseTint});return j.highlights.delete(e),!0}function Ci(e=null){for(let t of Array.from(j.highlights.keys()))e&&!String(t).startsWith(e)||So(t);return!0}function Pi(e,t={}){if($e(),!bo(e))throw new Error("MGPixi.highlightPulse: invalid root");let n=String(t.key||`hl:${Math.random().toString(16).slice(2)}`);if(j.highlights.has(n))return n;let o=ze(e)?Number(e.alpha):null,r=de(Number(t.minAlpha??.12),0,1),a=de(Number(t.maxAlpha??1),0,1),i=Number(t.speed??1.25),s=(t.tint??8386303)>>>0,l=de(Number(t.tintMix??.85),0,1),c=t.deepTint!==!1,d=[];if(c)for(let m of gm(e))d.push({o:m,baseTint:m.tint});else mn(e)&&d.push({o:e,baseTint:e.tint});let u=performance.now(),p=()=>{let m=(performance.now()-u)/1e3,b=(Math.sin(m*Math.PI*2*i)+1)/2,f=b*b*(3-2*b);o!=null&&ze(e)&&(e.alpha=de(pn(r,a,f)*o,0,1));let g=f*l;for(let h of d)h.o&&mn(h.o)&&(h.o.tint=mm(h.baseTint,s,g))};return j.ticker?.add(p),j.highlights.set(n,{root:e,tick:p,baseAlpha:o,tint:d}),n}var xm=["plantVisual","cropVisual","slotVisual","slotView","displayObject","view","container","root","sprite","gfx","graphics"];function ho(e){if(!e)return null;if(bo(e))return e;if(!vo(e))return null;for(let t of xm){let n=e[t];if(bo(n))return n}return null}function vm(e,t){let n=[{o:e,d:0}],o=new Set,r=6;for(;n.length;){let{o:a,d:i}=n.shift();if(!(!a||i>r)&&!o.has(a)){if(o.add(a),Array.isArray(a)){if(a.length===t){let s=new Array(t),l=!0;for(let c=0;c<t;c++){let d=ho(a[c]);if(!d){l=!1;break}s[c]=d}if(l)return s}for(let s of a)n.push({o:s,d:i+1});continue}if(vo(a)){let s=a;for(let l of Object.keys(s))n.push({o:s[l],d:i+1})}}}return null}function wm(e,t){let n=e?.mutations;if(!Array.isArray(n))return!1;for(let o of n)if(String(o||"").toLowerCase()===t)return!0;return!1}function Mi(e,t={}){$e();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.highlightMutation: empty mutation");let{entries:o,gidxSet:r}=wo(t),a=`hlmut:${n}:`;if(t.clear===!0)if(!r)Ci(a);else for(let u of Array.from(j.highlights.keys())){if(!u.startsWith(a))continue;let p=u.split(":"),m=Number(p[2]);r.has(m)&&So(u)}let i={tint:(t.tint??8386303)>>>0,minAlpha:Number(t.minAlpha??.12),maxAlpha:Number(t.maxAlpha??1),speed:Number(t.speed??1.25),tintMix:Number(t.tintMix??.85),deepTint:t.deepTint!==!1},s=0,l=0,c=0,d=0;for(let[u,p]of o){let m=p?.tileObject;if(!m||m.objectType!=="plant")continue;let b=m.slots;if(!Array.isArray(b)||b.length===0)continue;let f=!1,g=[];for(let T=0;T<b.length;T++)wm(b[T],n)&&(g.push(T),f=!0);if(!f)continue;s++,l+=g.length;let h=p?.childView?.plantVisual||p?.childView||p,S=vm(h,b.length);if(!S){d+=g.length;continue}for(let T of g){let x=S[T];if(!x){d++;continue}let v=`${a}${u}:${T}`;j.highlights.has(v)||(Pi(x,{key:v,...i}),c++)}}return{ok:!0,mutation:n,filtered:!!r,plantsMatched:s,matchedSlots:l,newHighlights:c,failedSlots:d}}function Sm(e,t={}){$e();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchMutation: empty mutation");let o=`watchmut:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,r=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,a=j.watches.get(o);a&&clearInterval(a);let i=setInterval(()=>{ce(()=>Mi(n,{...t,clear:!1}))},r);return j.watches.set(o,i),{ok:!0,key:o,mutation:n,intervalMs:r}}function km(e){let t=String(e||"").trim();if(!t)return!1;if(!t.startsWith("watchmut:")){let o=t.toLowerCase(),r=0;for(let[a,i]of Array.from(j.watches.entries()))a.startsWith(`watchmut:${o}:`)&&(clearInterval(i),j.watches.delete(a),r++);return r>0}let n=j.watches.get(t);return n?(clearInterval(n),j.watches.delete(t),!0):!1}function Tm(e){let t=Array.isArray(e?.slots)?e.slots:[];return{objectType:"plant",species:e?.species??null,plantedAt:e?.plantedAt??null,maturedAt:e?.maturedAt??null,slotCount:t.length,slots:t.map((n,o)=>({idx:o,mutations:Array.isArray(n?.mutations)?n.mutations.slice():[]}))}}function Am(e,t,n={}){$e();let o=Number(e)|0,r=Number(t)|0,a=n.ensureView!==!1,i=Se.getTileObject(o,r,{ensureView:a,clone:!1}),s=i?.tileView||null,l=s?.tileObject,c={ok:!0,tx:o,ty:r,gidx:i?.gidx??Se.gidx?.(o,r)??null,hasTileView:!!s,objectType:l?.objectType??null,tileObject:l??null,summary:l?.objectType==="plant"?Tm(l):l?{objectType:l.objectType??null}:null,display:s?s.childView?.plantVisual||s.childView||s.displayObject||s:null};return n.log!==!1&&ce(()=>console.log("[MGPixi.inspectTile]",c)),c}function Cm(e){let t=e?.childView?.plantVisual||e?.childView?.cropVisual||e?.childView||e?.displayObject||e;return ho(t)||ho(e?.displayObject)||null}function Ei(e){let t=j.fades.get(e);if(!t)return!1;for(let n of t.targets)n.o&&ze(n.o)&&Number.isFinite(n.baseAlpha)&&ce(()=>{n.o.alpha=n.baseAlpha});return j.fades.delete(e),!0}function yo(e=null){for(let t of Array.from(j.fades.keys()))e&&!String(t).startsWith(e)||Ei(t);return!0}function Ii(e,t={}){$e();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.clearSpeciesFade: empty species");let o=`fade:${n}:`;if(!Ai(t))return yo(o);let{gidxSet:r}=wo(t);if(!r)return yo(o);for(let a of Array.from(j.fades.keys())){if(!a.startsWith(o))continue;let i=Number(a.slice(o.length));r.has(i)&&Ei(a)}return!0}function Li(e,t={}){$e();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.fadeSpecies: empty species");let o=de(Number(t.alpha??.2),0,1),r=t.deep===!0,{entries:a,gidxSet:i}=wo(t),s=`fade:${n}:`;t.clear===!0&&Ii(n,t);let l=0,c=0,d=0,u=0;for(let[p,m]of a){let b=m?.tileObject;if(!b||b.objectType!=="plant")continue;l++;let f=String(b.species||"").trim().toLowerCase();if(!f||f!==n)continue;c++;let g=Cm(m);if(!g||!ze(g)){u++;continue}let h=`${s}${p}`;if(j.fades.has(h)){ce(()=>{g.alpha=o}),d++;continue}let S=r?fm(g):[g],T=[];for(let x of S)ze(x)&&T.push({o:x,baseAlpha:Number(x.alpha)});for(let x of T)ce(()=>{x.o.alpha=o});j.fades.set(h,{targets:T}),d++}return{ok:!0,species:n,alpha:o,deep:r,filtered:!!i,plantsSeen:l,matchedPlants:c,applied:d,failed:u,totalFades:j.fades.size}}function Pm(e,t={}){$e();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchFadeSpecies: empty species");let o=`watchfade:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,r=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,a=j.fadeWatches.get(o);a&&clearInterval(a);let i=setInterval(()=>{ce(()=>Li(n,{...t,clear:!1}))},r);return j.fadeWatches.set(o,i),{ok:!0,key:o,species:n,intervalMs:r}}function Mm(e){let t=String(e||"").trim();if(!t)return!1;if(!t.startsWith("watchfade:")){let o=t.toLowerCase(),r=0;for(let[a,i]of Array.from(j.fadeWatches.entries()))a.startsWith(`watchfade:${o}:`)&&(clearInterval(i),j.fadeWatches.delete(a),r++);return r>0}let n=j.fadeWatches.get(t);return n?(clearInterval(n),j.fadeWatches.delete(t),!0):!1}function xo(){let e=A;return e.$PIXI=e.PIXI||null,e.$app=j.app||null,e.$renderer=j.renderer||null,e.$stage=j.stage||null,e.$ticker=j.ticker||null,e.__MG_PIXI__={PIXI:e.$PIXI,app:e.$app,renderer:e.$renderer,stage:e.$stage,ticker:e.$ticker,ready:j.ready},e.__MG_PIXI__}function $e(){if(!j.ready)throw new Error("MGPixi: call MGPixi.init() first")}async function Em(e=15e3){if(j.ready)return xo(),!0;if(await ae.init(e),j.app=ae.app(),j.ticker=ae.ticker(),j.renderer=ae.renderer(),j.stage=ae.stage(),!j.app||!j.ticker)throw new Error("MGPixi: PIXI app/ticker not found");return j.ready=!0,xo(),!0}var Pt={init:Em,ready:()=>j.ready,expose:xo,get app(){return j.app},get renderer(){return j.renderer},get stage(){return j.stage},get ticker(){return j.ticker},get PIXI(){return A.PIXI||null},defineTileSet:bm,deleteTileSet:hm,listTileSets:ym,highlightPulse:Pi,stopHighlight:So,clearHighlights:Ci,highlightMutation:Mi,watchMutation:Sm,stopWatchMutation:km,inspectTile:Am,fadeSpecies:Li,clearSpeciesFade:Ii,clearFades:yo,watchFadeSpecies:Pm,stopWatchFadeSpecies:Mm};Ae();var Ri=A??window,Im={sfx:"soundEffectsVolume",music:"musicVolume",ambience:"ambienceVolume"},Lm={sfx:"soundEffectsVolumeAtom",music:"musicVolumeAtom",ambience:"ambienceVolumeAtom"},Mt=.001,Et=.2,gn=null,z={ready:!1,baseUrl:null,urls:{ambience:new Map,music:new Map},sfx:{mp3Url:null,atlasUrl:null,atlas:null,groups:new Map,buffer:null},tracks:{ambience:null,music:null},ctx:null};function Lt(){if(!z.ready)throw new Error("MGAudio not ready yet")}function Oi(e,t=NaN){try{let n=localStorage.getItem(e);if(n==null)return t;let o;try{o=JSON.parse(n)}catch{o=n}if(typeof o=="number"&&Number.isFinite(o))return o;if(typeof o=="string"){let r=parseFloat(o);if(Number.isFinite(r))return r}}catch{}return t}function It(e){let t=Im[e],n=Lm[e];if(!t)return{atom:Et,vol100:fn(Et)};let o=Oi(t,NaN);if(Number.isFinite(o)){let a=de(o,0,1);return{atom:a,vol100:fn(a)}}if(n){let a=Oi(n,NaN);if(Number.isFinite(a)){let i=de(a,0,1);return{atom:i,vol100:fn(i)}}}let r=Et;return{atom:r,vol100:fn(r)}}function Rm(e){let t=Number(e);if(!Number.isFinite(t))return null;if(t<=0)return 0;let o=(de(t,1,100)-1)/99;return Mt+o*(Et-Mt)}function fn(e){let t=de(Number(e),0,1);if(t<=Mt)return 0;let n=(t-Mt)/(Et-Mt);return Math.round(1+n*99)}function Hi(e,t){if(t==null)return It(e).atom;let n=Rm(t);return n===null?It(e).atom:Un(n)}async function _i(){let e=z.ctx;if(e)return e;let t=Ri.AudioContext||Ri.webkitAudioContext;if(!t)throw new Error("WebAudio not supported");let n=new t;return z.ctx=n,n}async function Ni(){if(z.ctx&&z.ctx.state==="suspended")try{await z.ctx.resume()}catch{}}function Om(e){let t=new Map,n=(o,r)=>{t.has(o)||t.set(o,[]),t.get(o).push(r)};for(let o of Object.keys(e||{})){let r=/^(.*)_([A-Z])$/.exec(o);r?.[1]?n(r[1],o):n(o,o)}for(let[o,r]of Array.from(t.entries()))r.sort((a,i)=>a.localeCompare(i)),t.set(o,r);z.sfx.groups=t}function Hm(e){let t=z.sfx.atlas;if(!t)throw new Error("SFX atlas not loaded");if(t[e])return e;let n=z.sfx.groups.get(e);if(n?.length)return n[Math.random()*n.length|0];throw new Error(`Unknown sfx/group: ${e}`)}async function _m(){if(z.sfx.buffer)return z.sfx.buffer;if(!z.sfx.mp3Url)throw new Error("SFX mp3 url missing");let e=await _i();await Ni();let n=await(await Qt(z.sfx.mp3Url)).arrayBuffer(),o=await new Promise((r,a)=>{let i=e.decodeAudioData(n,r,a);i?.then&&i.then(r,a)});return z.sfx.buffer=o,o}async function Nm(e,t={}){if(!z.ready)throw new Error("MGAudio not ready yet");let n=String(e||"").trim();if(!n)throw new Error("Missing sfx name");let o=Hm(n),r=z.sfx.atlas[o];if(!r)throw new Error(`Missing segment for sfx: ${o}`);let a=await _i();await Ni();let i=await _m(),s=Math.max(0,+r.start||0),l=Math.max(s,+r.end||s),c=Math.max(.01,l-s),d=Hi("sfx",t.volume),u=a.createGain();u.gain.value=d,u.connect(a.destination);let p=a.createBufferSource();return p.buffer=i,p.connect(u),p.start(0,s,c),{name:o,source:p,start:s,end:l,duration:c,volume:d}}function Gi(e){if(e!=="music"&&e!=="ambience")return!1;let t=z.tracks[e];if(t){try{t.pause()}catch{}try{t.src=""}catch{}}return z.tracks[e]=null,!0}function Gm(e,t,n={}){if(!z.ready)throw new Error("MGAudio not ready yet");if(e!=="music"&&e!=="ambience")throw new Error(`Invalid category: ${e}`);let o=z.urls[e].get(t);if(!o)throw new Error(`Unknown ${e}: ${t}`);Gi(e);let r=new Audio(o);return r.loop=!!n.loop,r.volume=Hi(e,n.volume),r.preload="auto",r.play().catch(()=>{}),z.tracks[e]=r,r}async function Dm(e,t,n={}){let o=String(e||"").trim(),r=String(t||"").trim();if(!o||!r)throw new Error("play(category, asset) missing args");if(o==="sfx")return Nm(r,n);if(o==="music"||o==="ambience")return Gm(o,r,n);throw new Error(`Unknown category: ${o}`)}function Wm(e,t={}){let n=String(e||"").trim();return n==="music"||n==="ambience"?Array.from(z.urls[n].keys()).sort():n==="sfx"?z.sfx.atlas?t.groups?Array.from(z.sfx.groups.keys()).sort():Object.keys(z.sfx.atlas).sort():[]:[]}function Bm(){return z.tracks.music&&(z.tracks.music.volume=It("music").atom),z.tracks.ambience&&(z.tracks.ambience.volume=It("ambience").atom),!0}function Vm(){return Lt(),["sfx","music","ambience"]}function jm(){return Lt(),Array.from(z.sfx.groups.keys()).sort((e,t)=>e.localeCompare(t))}function Fm(e,t){Lt();let n=String(e||"").trim().toLowerCase(),o=String(t||"").trim();if(!o||n!=="music"&&n!=="ambience")return!1;let r=z.urls[n],a=o.toLowerCase();for(let i of r.keys())if(i.toLowerCase()===a)return!0;return!1}function zm(e){Lt();let t=String(e||"").trim();if(!t)return!1;let n=t.toLowerCase();for(let o of z.sfx.groups.keys())if(o.toLowerCase()===n)return!0;return!1}function $m(e,t){Lt();let n=String(e||"").trim().toLowerCase(),o=String(t||"").trim();if(!o)throw new Error("getTrackUrl(category, name) missing name");if(n!=="music"&&n!=="ambience")throw new Error(`Invalid category: ${e}`);let r=z.urls[n],a=o.toLowerCase();for(let[i,s]of r.entries())if(i.toLowerCase()===a)return s;return null}async function Um(){return z.ready?!0:gn||(gn=(async()=>{z.baseUrl=await he.base();let e=await pe.load(z.baseUrl),t=pe.getBundle(e,"audio");if(!t)throw new Error("No audio bundle in manifest");for(let n of t.assets||[])for(let o of n.src||[]){if(typeof o!="string")continue;let r=/^audio\/(ambience|music)\/(.+)\.mp3$/i.exec(o);if(r){let a=r[1].toLowerCase(),i=r[2];z.urls[a].set(i,ue(z.baseUrl,o));continue}/^audio\/sfx\/sfx\.mp3$/i.test(o)&&(z.sfx.mp3Url=ue(z.baseUrl,o)),/^audio\/sfx\/sfx\.json$/i.test(o)&&(z.sfx.atlasUrl=ue(z.baseUrl,o))}if(!z.sfx.atlasUrl)throw new Error("Missing audio/sfx/sfx.json in manifest");return z.sfx.atlas=await Qe(z.sfx.atlasUrl),Om(z.sfx.atlas),z.ready=!0,!0})(),gn)}var Rt={init:Um,ready:()=>z.ready,play:Dm,stop:Gi,list:Wm,refreshVolumes:Bm,categoryVolume:It,getCategories:Vm,getGroups:jm,hasTrack:Fm,hasGroup:zm,getTrackUrl:$m};var ko=A?.document??document,bn=null,Q={ready:!1,baseUrl:null,byCat:new Map,byBase:new Map,overlay:null,live:new Set,defaultParent:null};function Km(){if(Q.overlay)return Q.overlay;let e=ko.createElement("div");return e.id="MG_COSMETIC_OVERLAY",e.style.cssText=["position:fixed","left:0","top:0","width:100vw","height:100vh","pointer-events:none","z-index:99999999"].join(";"),ko.documentElement.appendChild(e),Q.overlay=e,e}function qm(){let e=Q.defaultParent;if(!e)return null;try{return typeof e=="function"?e():e}catch{return null}}function To(e){let t=String(e||"").trim();return t?(t=t.replace(/^cosmetic\//i,""),t=t.replace(/\.png$/i,""),t):""}function Jm(e,t){if(t===void 0){let a=To(e),i=a.indexOf("_");return i<0?{cat:"",asset:a,base:a}:{cat:a.slice(0,i),asset:a.slice(i+1),base:a}}let n=String(e||"").trim(),o=To(t),r=o.includes("_")?o:`${n}_${o}`;if(o.includes("_")&&!n){let a=o.indexOf("_");return{cat:o.slice(0,a),asset:o.slice(a+1),base:o}}return{cat:n,asset:o.replace(/^.+?_/,""),base:r}}function Xm(){return Array.from(Q.byCat.keys()).sort((e,t)=>e.localeCompare(t))}function Ym(e){let t=Q.byCat.get(String(e||"").trim());return t?Array.from(t.keys()).sort((n,o)=>n.localeCompare(o)):[]}function Ao(e,t){let{cat:n,asset:o,base:r}=Jm(e,t),a=Q.byBase.get(r);if(a)return a;let s=Q.byCat.get(n)?.get(o);if(s)return s;if(!Q.baseUrl)throw new Error("MGCosmetic not initialized");if(!r)throw new Error("Invalid cosmetic name");return ue(Q.baseUrl,`cosmetic/${r}.png`)}function Co(e,t,n){if(!Q.ready)throw new Error("MGCosmetic not ready yet");let o,r;typeof t=="object"&&t!==null?(o=t,r=void 0):typeof t=="string"?(r=t,o=n||{}):(r=void 0,o=n||{});let a=r!==void 0?Ao(e,r):Ao(e),i=ko.createElement("img");if(i.decoding="async",i.loading="eager",i.src=a,i.alt=o.alt!=null?String(o.alt):To(r??e),o.className&&(i.className=String(o.className)),o.width!=null&&(i.style.width=String(o.width)),o.height!=null&&(i.style.height=String(o.height)),o.opacity!=null&&(i.style.opacity=String(o.opacity)),o.style&&typeof o.style=="object")for(let[s,l]of Object.entries(o.style))try{i.style[s]=String(l)}catch{}return i}function Qm(e,t,n){let o,r;typeof t=="object"&&t!==null?(o=t,r=void 0):typeof t=="string"?(r=t,o=n||{}):(r=void 0,o=n||{});let a=o.parent||qm()||Km(),i=r!==void 0?Co(e,r,o):Co(e,o);if(a===Q.overlay||o.center||o.x!=null||o.y!=null||o.absolute){i.style.position="absolute",i.style.pointerEvents="none",i.style.zIndex=String(o.zIndex??999999);let l=o.scale??1,c=o.rotation??0;if(o.center)i.style.left="50%",i.style.top="50%",i.style.transform=`translate(-50%, -50%) scale(${l}) rotate(${c}rad)`;else{let d=o.x??innerWidth/2,u=o.y??innerHeight/2;i.style.left=`${d}px`,i.style.top=`${u}px`,i.style.transform=`scale(${l}) rotate(${c}rad)`,o.anchor==="center"&&(i.style.transform=`translate(-50%, -50%) scale(${l}) rotate(${c}rad)`)}}return a.appendChild(i),Q.live.add(i),i.__mgDestroy=()=>{try{i.remove()}catch{}Q.live.delete(i)},i}function Zm(e){return Q.defaultParent=e,!0}function eg(){for(let e of Array.from(Q.live))e.__mgDestroy?.()}async function tg(){return Q.ready?!0:bn||(bn=(async()=>{Q.baseUrl=await he.base();let e=await pe.load(Q.baseUrl),t=pe.getBundle(e,"cosmetic");if(!t)throw new Error("No 'cosmetic' bundle in manifest");Q.byCat.clear(),Q.byBase.clear();for(let n of t.assets||[])for(let o of n.src||[]){if(typeof o!="string"||!/^cosmetic\/.+\.png$/i.test(o))continue;let a=o.split("/").pop().replace(/\.png$/i,""),i=a.indexOf("_");if(i<0)continue;let s=a.slice(0,i),l=a.slice(i+1),c=ue(Q.baseUrl,o);Q.byBase.set(a,c),Q.byCat.has(s)||Q.byCat.set(s,new Map),Q.byCat.get(s).set(l,c)}return Q.ready=!0,!0})(),bn)}var Ot={init:tg,ready:()=>Q.ready,categories:Xm,list:Ym,url:Ao,create:Co,show:Qm,attach:Zm,clear:eg};async function Di(e){let t=[{name:"Data",init:()=>At.init()},{name:"Sprites",init:()=>we.init()},{name:"TileObjectSystem",init:()=>Se.init()},{name:"Pixi",init:()=>Pt.init()},{name:"Audio",init:()=>Rt.init()},{name:"Cosmetics",init:()=>Ot.init()}];await Promise.all(t.map(async n=>{e?.({status:"start",name:n.name});try{await n.init(),e?.({status:"success",name:n.name})}catch(o){console.error(`[${n.name}] failed`,o),e?.({status:"error",name:n.name,error:o})}})),console.log("[Gemini] Modules ready. Access via Gemini.Modules in console.")}function Po(e,t){if(e===t)return!0;if(e===null||t===null)return e===t;if(typeof e!=typeof t)return!1;if(typeof e!="object")return e===t;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return!1;for(let i=0;i<e.length;i++)if(!Po(e[i],t[i]))return!1;return!0}if(Array.isArray(e)||Array.isArray(t))return!1;let n=e,o=t,r=Object.keys(n),a=Object.keys(o);if(r.length!==a.length)return!1;for(let i of r)if(!Object.prototype.hasOwnProperty.call(o,i)||!Po(n[i],o[i]))return!1;return!0}function ng(e,t,n,o=Po){let r=new Set,a=n,i=n,s=!1,l={values:{},ready:new Set,unsubscribes:[]},c=Object.keys(e),d=c.length;function u(){if(l.ready.size<d)return;let m=t(l.values);if(!o(a,m)&&(i=a,a=m,s))for(let b of r)b(a,i)}async function p(){if(s)return;let m=c.map(async b=>{let f=e[b],g=await Z.subscribe(f,h=>{l.values[b]=h,l.ready.add(b),u()});l.unsubscribes.push(g)});await Promise.all(m),s=!0,l.ready.size===d&&(a=t(l.values))}return p(),{get(){return a},subscribe(m){return r.add(m),s&&l.ready.size===d&&m(a,a),()=>{r.delete(m)}},destroy(){for(let m of l.unsubscribes)m();l.unsubscribes.length=0,r.clear(),s=!1}}}function Wi(e,t,n,o){let r=null;return()=>(r||(r=ng(e,t,n,o)),r)}var og={currentGardenTile:"myCurrentGardenTileAtom",globalTileIndex:"myCurrentGlobalTileIndexAtom",gardenObject:"myCurrentGardenObjectAtom",isMature:"isGardenObjectMatureAtom",isInMyGarden:"isInMyGardenAtom",gardenName:"currentGardenNameAtom",sortedSlotIndices:"myCurrentSortedGrowSlotIndicesAtom",currentGrowSlotIndex:"myCurrentGrowSlotIndexAtom"};function rg(e){let t=e.currentGardenTile;return{globalIndex:e.globalTileIndex,localIndex:t?.localTileIndex??null}}function ag(e){return{type:e.currentGardenTile?.tileType??null,isEmpty:e.gardenObject===null}}function ig(e){let t=e.currentGardenTile;return{name:e.gardenName,isOwner:e.isInMyGarden??!1,playerSlotIndex:t?.userSlotIdx??null}}function sg(e){let t=e.gardenObject;return t?{type:t.objectType,data:t,isMature:e.isMature??!1}:{type:null,data:null,isMature:!1}}function lg(e){let t=e.gardenObject;if(!t||t.objectType!=="plant")return null;let n=t,o=e.sortedSlotIndices??[];return{species:n.species,slots:n.slots??[],currentSlotIndex:e.currentGrowSlotIndex,sortedSlotIndices:o,nextHarvestSlotIndex:o.length>0?o[0]:null}}function cg(e){return{position:rg(e),tile:ag(e),garden:ig(e),object:sg(e),plant:lg(e)}}var ug={position:{globalIndex:null,localIndex:null},tile:{type:null,isEmpty:!0},garden:{name:null,isOwner:!1,playerSlotIndex:null},object:{type:null,data:null,isMature:!1},plant:null},Mo=Wi(og,cg,ug);var Me=null;function hn(){return Me||(Me={currentTile:Mo()},Me)}function Eo(){if(!Me)throw new Error("[Globals] Not initialized. Call initGlobals() first.");return Me}function Bi(){Me&&(Me.currentTile.destroy(),Me=null)}var Vi={get currentTile(){return Eo().currentTile}};var dg={Store:{select:Z.select.bind(Z),set:Z.set.bind(Z),subscribe:Z.subscribe.bind(Z),subscribeImmediate:Z.subscribeImmediate.bind(Z)},Globals:Vi,Modules:{Version:St,Assets:he,Manifest:pe,Data:At,Sprite:we,Tile:Se,Pixi:Pt,Audio:Rt,Cosmetic:Ot},WebSocket:{chat:qt,emote:lr,wish:cr,kickPlayer:ur,setPlayerData:dr,usurpHost:pr,reportSpeakingStart:mr,setSelectedGame:gr,voteForGame:fr,requestGame:br,restartGame:hr,ping:yr,checkWeatherStatus:wr,move:xr,playerPosition:Hn,teleport:vr,moveInventoryItem:Sr,dropObject:kr,pickupObject:Tr,toggleFavoriteItem:Ar,putItemInStorage:Cr,retrieveItemFromStorage:Pr,moveStorageItem:Mr,logItems:Er,plantSeed:Ir,waterPlant:Lr,harvestCrop:Rr,sellAllCrops:Or,purchaseDecor:Hr,purchaseEgg:_r,purchaseTool:Nr,purchaseSeed:Gr,plantEgg:Dr,hatchEgg:Wr,plantGardenPlant:Br,potPlant:Vr,mutationPotion:jr,pickupDecor:Fr,placeDecor:zr,removeGardenObject:$r,placePet:Ur,feedPet:Kr,petPositions:qr,swapPet:Jr,storePet:Xr,namePet:Yr,sellPet:Qr},_internal:{getGlobals:Eo,initGlobals:hn,destroyGlobals:Bi}};function ji(){A.Gemini=dg}function Fi(e){e.logStep("WebSocket","Capturing WebSocket...");let t=null;return t=Kt(n=>{n.ws&&(e.logStep("WebSocket","WebSocket captured","success"),t?.(),t=null)},{intervalMs:250}),Ma({debug:!1}),()=>{t?.(),t=null}}async function zi(e){e.logStep("Atoms","Prewarming Jotai store...");try{await Tn(),await _t({timeoutMs:8e3,intervalMs:50}),e.logStep("Atoms","Jotai store ready","success")}catch(t){e.logStep("Atoms","Jotai store not captured yet","error"),console.warn("[Bootstrap] Jotai store wait failed",t)}}function $i(e){e.logStep("Globals","Initializing reactive globals...");try{hn(),e.logStep("Globals","Reactive globals ready","success")}catch(t){e.logStep("Globals","Failed to initialize globals","error"),console.warn("[Bootstrap] Globals init failed",t)}}function Ui(e){e.logStep("API","Exposing Gemini API...");try{ji(),e.logStep("API","Gemini API ready (window.Gemini)","success")}catch(t){e.logStep("API","Failed to expose API","error"),console.warn("[Bootstrap] API init failed",t)}}function Ki(e){e.logStep("HUD","Loading HUD preferences...");let t=Fn(),n=jn({hostId:"gemini-hud-root",initialWidth:t.width,initialOpen:t.isOpen,onWidthChange:o=>Ye("width",o),onOpenChange:o=>Ye("isOpen",o),themes:Oe,initialTheme:t.theme,onThemeChange:o=>Ye("theme",o),buildSections:o=>_n({applyTheme:o.applyTheme,initialTheme:o.initialTheme,getCurrentTheme:o.getCurrentTheme}),initialTab:t.activeTab,onTabChange:o=>Ye("activeTab",o)});return e.logStep("HUD","HUD ready","success"),n}async function qi(e){e.log("HUD ready. Loading modules in the background...","success"),e.setSubtitle("Activating Gemini modules..."),await Di(t=>{t.status==="start"?e.logStep(t.name,`Loading ${t.name}...`):t.status==="success"?e.logStep(t.name,`${t.name} ready`,"success"):e.logStep(t.name,`${t.name} encountered an issue.`,"error")})}kn();(async function(){"use strict";let e=Do({title:"Gemini is loading",subtitle:"Connecting and preparing modules..."}),t=null,n=null;try{t=Fi(e),await zi(e),$i(e),Ui(e),n=Ki(e),await qi(e),e.succeed("Gemini is ready!")}catch(o){e.fail("Failed to initialize the mod.",o)}finally{t?.()}if(n){let o=n;zn({onClick:()=>o.setOpen(!0)})}})();})();
