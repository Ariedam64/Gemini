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
"use strict";(()=>{var Bo=Object.defineProperty;var os=(e,t,n)=>t in e?Bo(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var rs=(e,t)=>()=>(e&&(t=e(e=0)),t);var is=(e,t)=>{for(var n in t)Bo(e,n,{get:t[n],enumerable:!0})};var xe=(e,t,n)=>os(e,typeof t!="symbol"?t+"":t,n);var Ni={};is(Ni,{clamp:()=>de,clamp01:()=>qn,sleep:()=>Ae,tryDo:()=>ce,waitWithTimeout:()=>Qt});async function Qt(e,t,n){let o=performance.now();for(;performance.now()-o<t;){let r=await Promise.race([e,Ae(50).then(()=>null)]);if(r!==null)return r}throw new Error(`${n} timeout`)}var Ae,ce,de,qn,Pe=rs(()=>{"use strict";Ae=e=>new Promise(t=>setTimeout(t,e)),ce=e=>{try{return e()}catch{return}},de=(e,t,n)=>Math.max(t,Math.min(n,e)),qn=e=>de(e,0,1)});var as=window;function ss(){if(typeof unsafeWindow<"u"&&unsafeWindow)return unsafeWindow;let e=window.wrappedJSObject;return e&&e!==window?e:as}var ls=ss(),A=ls;var cs=new Map;function us(){return cs}function it(){return A.jotaiAtomCache?.cache}function at(e){let t=us(),n=t.get(e);if(n)return n;let o=it();if(!o)return null;for(let r of o.values())if((r?.debugLabel||r?.label||"")===e)return t.set(e,r),r;return null}function An(){let e=A;if(e.__REACT_DEVTOOLS_GLOBAL_HOOK__)return;let t=new Map,n=new Map;e.__REACT_DEVTOOLS_GLOBAL_HOOK__={renderers:t,supportsFiber:!0,inject:o=>{let r=t.size+1;return t.set(r,o),n.set(r,new Set),r},onCommitFiberRoot:(o,r)=>{let i=n.get(o);i&&i.add(r)},onCommitFiberUnmount:()=>{},onPostCommitFiberRoot:()=>{},getFiberRoots:o=>n.get(o),checkDCE:()=>{},isDisabled:!1}}var ds={baseStore:null,captureInProgress:!1,captureError:null,lastCapturedVia:null,mirror:void 0};function Ue(){return ds}var ps="__JOTAI_STORE_READY__",jo=!1,Sn=new Set;function Ht(){if(!jo){jo=!0;for(let e of Sn)try{e()}catch{}try{let e=A.CustomEvent||CustomEvent;A.dispatchEvent?.(new e(ps))}catch{}}}function ms(e){Sn.add(e);let t=Tn();if(t.via&&!t.polyfill)try{e()}catch{}return()=>{Sn.delete(e)}}async function _t(e={}){let{timeoutMs:t=6e3,intervalMs:n=50}=e,o=Tn();if(!(o.via&&!o.polyfill))return new Promise((r,i)=>{let a=!1,s=ms(()=>{a||(a=!0,s(),r())}),l=Date.now();(async()=>{for(;!a&&Date.now()-l<t;){let u=Tn();if(u.via&&!u.polyfill){if(a)return;a=!0,s(),r();return}await st(n)}a||(a=!0,s(),i(new Error("Store not captured within timeout")))})()})}var st=e=>new Promise(t=>setTimeout(t,e));function Vo(){try{let e=A.Event||Event;A.dispatchEvent?.(new e("visibilitychange"))}catch{}}function kn(e){return e&&typeof e=="object"&&typeof e.get=="function"&&typeof e.set=="function"&&typeof e.sub=="function"}function wn(e,t=0,n=new WeakSet){if(t>3||!e||typeof e!="object"||n.has(e))return null;try{n.add(e)}catch{return null}if(kn(e))return e;let o=["store","value","current","state","s","baseStore"];for(let r of o)try{let i=e[r];if(kn(i))return i}catch{}return null}function Fo(){let e=Ue(),t=A.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t?.renderers?.size)return null;let n=0;for(let[o]of t.renderers){let r=t.getFiberRoots?.(o);r&&(n+=r.size||0)}if(n===0)return null;for(let[o]of t.renderers){let r=t.getFiberRoots?.(o);if(r)for(let i of r){let a=new Set,s=[i.current];for(;s.length;){let l=s.pop();if(!(!l||a.has(l))){a.add(l);try{let c=l?.pendingProps?.value;if(kn(c))return e.lastCapturedVia="fiber",c}catch{}try{let c=l?.memoizedState,u=0;for(;c&&u<15;){u++;let d=wn(c);if(d)return e.lastCapturedVia="fiber",d;let p=wn(c.memoizedState);if(p)return e.lastCapturedVia="fiber",p;c=c.next}}catch{}try{if(l?.stateNode){let c=wn(l.stateNode);if(c)return e.lastCapturedVia="fiber",c}}catch{}l.child&&s.push(l.child),l.sibling&&s.push(l.sibling),l.alternate&&s.push(l.alternate)}}}}return null}function zo(){return{get:()=>{throw new Error("Store not captured: get unavailable")},set:()=>{throw new Error("Store not captured: set unavailable")},sub:()=>()=>{},__polyfill:!0}}async function gs(e=5e3){let t=Date.now(),n=it();for(;!n&&Date.now()-t<e;)await st(100),n=it();if(!n)throw new Error("jotaiAtomCache.cache not found");let o=Ue(),r=null,i=null,a=[],s=()=>{for(let c of a)try{c.__origWrite&&(c.write=c.__origWrite,delete c.__origWrite)}catch{}};for(let c of n.values()){if(!c||typeof c.write!="function"||c.__origWrite)continue;let u=c.write;c.__origWrite=u,c.write=function(d,p,...m){return i||(r=d,i=p,s()),u.call(this,d,p,...m)},a.push(c)}Vo();let l=Date.now();for(;!i&&Date.now()-l<e;)await st(50);return i?(o.lastCapturedVia="write",{get:c=>r(c),set:(c,u)=>i(c,u),sub:(c,u)=>{let d;try{d=r(c)}catch{}let p=setInterval(()=>{let m;try{m=r(c)}catch{return}if(m!==d){d=m;try{u()}catch{}}},100);return()=>clearInterval(p)}}):(s(),o.lastCapturedVia="polyfill",zo())}async function fs(e=1e4){let t=Ue();Vo();let n=Date.now();for(;Date.now()-n<e;){let o=Fo();if(o)return o;await st(50)}return t.lastCapturedVia="polyfill",zo()}async function bs(){let e=Ue();if(e.baseStore&&!e.baseStore.__polyfill)return Ht(),e.baseStore;if(e.captureInProgress){let t=Date.now(),n=2500;for(;!e.baseStore&&Date.now()-t<n;)await st(25);if(e.baseStore)return e.baseStore.__polyfill||Ht(),e.baseStore}e.captureInProgress=!0;try{let t=Fo();if(t)return e.baseStore=t,Ht(),t;try{let o=await gs(5e3);return e.baseStore=o,o.__polyfill||Ht(),o}catch(o){e.captureError=o}let n=await fs();return e.baseStore=n,n}catch(t){throw e.captureError=t,t}finally{e.captureInProgress=!1}}function Tn(){let e=Ue();return{via:e.lastCapturedVia,polyfill:!!e.baseStore?.__polyfill,error:e.captureError}}async function hs(){let e=await bs(),t=new WeakMap,n=async r=>{let i=t.get(r);if(i)return i;i={last:void 0,has:!1,subs:new Set},t.set(r,i);try{i.last=e.get(r),i.has=!0}catch{}let a=e.sub(r,()=>{let s;try{s=e.get(r)}catch{return}let l=i.last,c=!Object.is(s,l)||!i.has;if(i.last=s,i.has=!0,c)for(let u of i.subs)try{u(s,l)}catch{}});return i.unsubUpstream=a,i};return{async get(r){let i=await n(r);if(i.has)return i.last;let a=e.get(r);return i.last=a,i.has=!0,a},async set(r,i){await e.set(r,i);let a=await n(r);a.last=i,a.has=!0},async sub(r,i){let a=await n(r);if(a.subs.add(i),a.has)try{i(a.last,a.last)}catch{}return()=>{a.subs.delete(i)}},getShadow(r){return t.get(r)?.last},hasShadow(r){return!!t.get(r)?.has},async ensureWatch(r){await n(r)},async asStore(){return{get:r=>this.get(r),set:(r,i)=>this.set(r,i),sub:(r,i)=>{let a=null;return this.sub(r,()=>i()).then(s=>a=s),()=>a?.()}}}}}async function lt(){let e=Ue();return e.mirror||(e.mirror=await hs()),e.mirror}var Z={async select(e){let t=await lt(),n=at(e);if(!n)throw new Error(`[Store] Atom not found: "${e}"`);return t.get(n)},async set(e,t){let n=await lt(),o=at(e);if(!o)throw new Error(`[Store] Atom not found: "${e}"`);await n.set(o,t)},async subscribe(e,t){let n=await lt(),o=at(e);if(!o)throw new Error(`[Store] Atom not found: "${e}"`);return n.sub(o,r=>{try{t(r)}catch{}})},async subscribeImmediate(e,t){let n=await Z.select(e);try{t(n)}catch{}return Z.subscribe(e,t)}};async function Pn(){await lt()}function ct(e){return e?Array.isArray(e)?e.slice():e.split(".").map(t=>t.match(/^\d+$/)?Number(t):t):[]}function Ie(e,t){let n=ct(t),o=e;for(let r of n){if(o==null)return;o=o[r]}return o}function Cn(e,t,n){let o=ct(t);if(!o.length)return n;let r=Array.isArray(e)?[...e]:{...e??{}},i=r;for(let a=0;a<o.length-1;a++){let s=o[a],l=i[s],c=typeof l=="object"&&l!==null?Array.isArray(l)?[...l]:{...l}:{};i[s]=c,i=c}return i[o[o.length-1]]=n,r}function $o(e,t){let n={};for(let o of t)n[o]=o.includes(".")?Ie(e,o):e?.[o];try{return JSON.stringify(n)}catch{return String(n)}}function Mn(e,t,n){let o=n.mode??"auto";function r(c){let u=t?Ie(c,t):c,d=new Map;if(u==null)return{signatures:d,keys:[]};let p=Array.isArray(u);if((o==="array"||o==="auto"&&p)&&p)for(let g=0;g<u.length;g++){let f=u[g],b=n.key?n.key(f,g,c):g,h=n.sig?n.sig(f,g,c):n.fields?$o(f,n.fields):JSON.stringify(f);d.set(b,h)}else for(let[g,f]of Object.entries(u)){let b=n.key?n.key(f,g,c):g,h=n.sig?n.sig(f,g,c):n.fields?$o(f,n.fields):JSON.stringify(f);d.set(b,h)}return{signatures:d,keys:Array.from(d.keys())}}function i(c,u){if(c===u)return!0;if(!c||!u||c.size!==u.size)return!1;for(let[d,p]of c)if(u.get(d)!==p)return!1;return!0}async function a(c){let u=null;return Z.subscribeImmediate(e,d=>{let p=t?Ie(d,t):d,{signatures:m}=r(p);if(!i(u,m)){let g=new Set([...u?Array.from(u.keys()):[],...Array.from(m.keys())]),f=[];for(let b of g){let h=u?.get(b)??"__NONE__",S=m.get(b)??"__NONE__";h!==S&&f.push(b)}u=m,c({value:p,changedKeys:f})}})}async function s(c,u){return a(({value:d,changedKeys:p})=>{p.includes(c)&&u({value:d})})}async function l(c,u){let d=new Set(c);return a(({value:p,changedKeys:m})=>{let g=m.filter(f=>d.has(f));g.length&&u({value:p,changedKeys:g})})}return{sub:a,subKey:s,subKeys:l}}var Ke=new Map;function ys(e,t){let n=Ke.get(e);if(n)try{n()}catch{}return Ke.set(e,t),()=>{try{t()}catch{}Ke.get(e)===t&&Ke.delete(e)}}function Y(e,t={}){let{path:n,write:o="replace"}=t,r=n?`${e}:${ct(n).join(".")}`:e;async function i(){let d=await Z.select(e);return n?Ie(d,n):d}async function a(d){if(typeof o=="function"){let g=await Z.select(e),f=o(d,g);return Z.set(e,f)}let p=await Z.select(e),m=n?Cn(p,n,d):d;return o==="merge-shallow"&&!n&&p&&typeof p=="object"&&typeof d=="object"?Z.set(e,{...p,...d}):Z.set(e,m)}async function s(d){let p=await i(),m=d(p);return await a(m),m}async function l(d,p,m){let g,f=h=>{let S=n?Ie(h,n):h;if(typeof g>"u"||!m(g,S)){let T=g;g=S,p(S,T)}},b=d?await Z.subscribeImmediate(e,f):await Z.subscribe(e,f);return ys(r,b)}function c(){let d=Ke.get(r);if(d){try{d()}catch{}Ke.delete(r)}}function u(d){return Mn(e,d?.path??n,d)}return{label:r,get:i,set:a,update:s,onChange:(d,p=Object.is)=>l(!1,d,p),onChangeNow:(d,p=Object.is)=>l(!0,d,p),asSignature:u,stopOnChange:c}}function y(e){return Y(e)}var xs=y("positionAtom"),vs=y("lastPositionInMyGardenAtom"),ws=y("playerDirectionAtom"),Ss=y("stateAtom"),ks=y("quinoaDataAtom"),Ts=y("currentTimeAtom"),As=y("actionAtom"),Ps=y("isPressAndHoldActionAtom"),Cs=y("mapAtom"),Ms=y("tileSizeAtom"),Is=Y("mapAtom",{path:"cols"}),Es=Y("mapAtom",{path:"rows"}),Ls=Y("mapAtom",{path:"spawnTiles"}),Rs=Y("mapAtom",{path:"locations.seedShop.spawnTileIdx"}),Os=Y("mapAtom",{path:"locations.eggShop.spawnTileIdx"}),Hs=Y("mapAtom",{path:"locations.toolShop.spawnTileIdx"}),_s=Y("mapAtom",{path:"locations.decorShop.spawnTileIdx"}),Ds=Y("mapAtom",{path:"locations.sellCropsShop.spawnTileIdx"}),Gs=Y("mapAtom",{path:"locations.sellPetShop.spawnTileIdx"}),Ns=Y("mapAtom",{path:"locations.collectorsClub.spawnTileIdx"}),Ws=Y("mapAtom",{path:"locations.wishingWell.spawnTileIdx"}),Bs=Y("mapAtom",{path:"locations.shopsCenter.spawnTileIdx"}),js=y("playerAtom"),Vs=y("myDataAtom"),Fs=y("myUserSlotIdxAtom"),zs=y("isSpectatingAtom"),$s=y("myCoinsCountAtom"),Us=y("numPlayersAtom"),Ks=Y("playerAtom",{path:"id"}),qs=y("userSlotsAtom"),Js=y("filteredUserSlotsAtom"),Xs=y("myUserSlotAtom"),Ys=y("spectatorsAtom"),Qs=Y("stateAtom",{path:"child"}),Zs=Y("stateAtom",{path:"child.data"}),el=Y("stateAtom",{path:"child.data.shops"}),tl=Y("stateAtom",{path:"child.data.userSlots"}),nl=Y("stateAtom",{path:"data.players"}),ol=y("myInventoryAtom"),rl=y("myInventoryItemsAtom"),il=y("isMyInventoryAtMaxLengthAtom"),al=y("myFavoritedItemIdsAtom"),sl=y("myCropInventoryAtom"),ll=y("mySeedInventoryAtom"),cl=y("myToolInventoryAtom"),ul=y("myEggInventoryAtom"),dl=y("myDecorInventoryAtom"),pl=y("myPetInventoryAtom"),ml=Y("myInventoryAtom",{path:"favoritedItemIds"}),gl=y("itemTypeFiltersAtom"),fl=y("myItemStoragesAtom"),bl=y("myPetHutchStoragesAtom"),hl=y("myPetHutchItemsAtom"),yl=y("myPetHutchPetItemsAtom"),xl=y("myNumPetHutchItemsAtom"),vl=y("myValidatedSelectedItemIndexAtom"),wl=y("isSelectedItemAtomSuspended"),Sl=y("mySelectedItemAtom"),kl=y("mySelectedItemNameAtom"),Tl=y("mySelectedItemRotationsAtom"),Al=y("mySelectedItemRotationAtom"),Pl=y("setSelectedIndexToEndAtom"),Cl=y("myPossiblyNoLongerValidSelectedItemIndexAtom"),Ml=y("myCurrentGlobalTileIndexAtom"),Il=y("myCurrentGardenTileAtom"),El=y("myCurrentGardenObjectAtom"),Ll=y("myOwnCurrentGardenObjectAtom"),Rl=y("myOwnCurrentDirtTileIndexAtom"),Ol=y("myCurrentGardenObjectNameAtom"),Hl=y("isInMyGardenAtom"),_l=y("myGardenBoardwalkTileObjectsAtom"),Dl=Y("myDataAtom",{path:"garden"}),Gl=Y("myDataAtom",{path:"garden.tileObjects"}),Nl=Y("myOwnCurrentGardenObjectAtom",{path:"objectType"}),Wl=y("myCurrentStablePlantObjectInfoAtom"),Bl=y("myCurrentSortedGrowSlotIndicesAtom"),jl=y("myCurrentGrowSlotIndexAtom"),Vl=y("myCurrentGrowSlotsAtom"),Fl=y("myCurrentGrowSlotAtom"),zl=y("secondsUntilCurrentGrowSlotMaturesAtom"),$l=y("isCurrentGrowSlotMatureAtom"),Ul=y("numGrowSlotsAtom"),Kl=y("myCurrentEggAtom"),ql=y("petInfosAtom"),Jl=y("myPetInfosAtom"),Xl=y("myPetSlotInfosAtom"),Yl=y("myPrimitivePetSlotsAtom"),Ql=y("myNonPrimitivePetSlotsAtom"),Zl=y("expandedPetSlotIdAtom"),ec=y("myPetsProgressAtom"),tc=y("myActiveCropMutationPetsAtom"),nc=y("totalPetSellPriceAtom"),oc=y("selectedPetHasNewVariantsAtom"),rc=y("shopsAtom"),ic=y("myShopPurchasesAtom"),ac=y("seedShopAtom"),sc=y("seedShopInventoryAtom"),lc=y("seedShopRestockSecondsAtom"),cc=y("seedShopCustomRestockInventoryAtom"),uc=y("eggShopAtom"),dc=y("eggShopInventoryAtom"),pc=y("eggShopRestockSecondsAtom"),mc=y("eggShopCustomRestockInventoryAtom"),gc=y("toolShopAtom"),fc=y("toolShopInventoryAtom"),bc=y("toolShopRestockSecondsAtom"),hc=y("toolShopCustomRestockInventoryAtom"),yc=y("decorShopAtom"),xc=y("decorShopInventoryAtom"),vc=y("decorShopRestockSecondsAtom"),wc=y("decorShopCustomRestockInventoryAtom"),Sc=y("isDecorShopAboutToRestockAtom"),kc=Y("shopsAtom",{path:"seed"}),Tc=Y("shopsAtom",{path:"tool"}),Ac=Y("shopsAtom",{path:"egg"}),Pc=Y("shopsAtom",{path:"decor"}),Cc=y("myCropItemsAtom"),Mc=y("myCropItemsToSellAtom"),Ic=y("totalCropSellPriceAtom"),Ec=y("friendBonusMultiplierAtom"),Lc=y("myJournalAtom"),Rc=y("myCropJournalAtom"),Oc=y("myPetJournalAtom"),Hc=y("myStatsAtom"),_c=y("myActivityLogsAtom"),Dc=y("newLogsAtom"),Gc=y("hasNewLogsAtom"),Nc=y("newCropLogsFromSellingAtom"),Wc=y("hasNewCropLogsFromSellingAtom"),Bc=y("myCompletedTasksAtom"),jc=y("myActiveTasksAtom"),Vc=y("isWelcomeToastVisibleAtom"),Fc=y("shouldCloseWelcomeToastAtom"),zc=y("isInitialMoveToDirtPatchToastVisibleAtom"),$c=y("isFirstPlantSeedActiveAtom"),Uc=y("isThirdSeedPlantActiveAtom"),Kc=y("isThirdSeedPlantCompletedAtom"),qc=y("isDemoTouchpadVisibleAtom"),Jc=y("areShopAnnouncersEnabledAtom"),Xc=y("arePresentablesEnabledAtom"),Yc=y("isEmptyDirtTileHighlightedAtom"),Qc=y("isPlantTileHighlightedAtom"),Zc=y("isItemHiglightedInHotbarAtom"),eu=y("isItemHighlightedInModalAtom"),tu=y("isMyGardenButtonHighlightedAtom"),nu=y("isSellButtonHighlightedAtom"),ou=y("isShopButtonHighlightedAtom"),ru=y("isInstaGrowButtonHiddenAtom"),iu=y("isActionButtonHighlightedAtom"),au=y("isGardenItemInfoCardHiddenAtom"),su=y("isSeedPurchaseButtonHighlightedAtom"),lu=y("isFirstSeedPurchaseActiveAtom"),cu=y("isFirstCropHarvestActiveAtom"),uu=y("isWeatherStatusHighlightedAtom"),du=y("weatherAtom"),pu=y("activeModalAtom"),mu=y("hotkeyBeingPressedAtom"),gu=y("avatarTriggerAnimationAtom"),fu=y("avatarDataAtom"),bu=y("emoteDataAtom"),hu=y("otherUserSlotsAtom"),yu=y("otherPlayerPositionsAtom"),xu=y("otherPlayerSelectedItemsAtom"),vu=y("otherPlayerLastActionsAtom"),wu=y("traderBunnyPlayerId"),Su=y("npcPlayersAtom"),ku=y("npcQuinoaUsersAtom"),Tu=y("numNpcAvatarsAtom"),Au=y("traderBunnyEmoteTimeoutAtom"),Pu=y("traderBunnyEmoteAtom"),Cu=y("unsortedLeaderboardAtom"),Mu=y("currentGardenNameAtom"),Iu=y("quinoaEngineAtom"),Eu=y("quinoaInitializationErrorAtom"),Lu=y("avgPingAtom"),Ru=y("serverClientTimeOffsetAtom"),Ou=y("isEstablishingShotRunningAtom"),Hu=y("isEstablishingShotCompleteAtom");function w(e,t=null,...n){let o=document.createElement(e);for(let[r,i]of Object.entries(t||{}))i!=null&&(r==="style"?typeof i=="string"?o.setAttribute("style",i):typeof i=="object"&&Object.assign(o.style,i):r.startsWith("on")&&typeof i=="function"?o[r.toLowerCase()]=i:r in o?o[r]=i:o.setAttribute(r,String(i)));for(let r of n)r==null||r===!1||o.appendChild(typeof r=="string"||typeof r=="number"?document.createTextNode(String(r)):r);return o}var Dt="https://i.imgur.com/k5WuC32.png",Uo="gemini-loader-style",_e="gemini-loader",Ko=80;function _u(){if(document.getElementById(Uo))return;let e=document.createElement("style");e.id=Uo,e.textContent=`
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
  `,document.head.appendChild(e)}function Gt(e,t,n){let o=w("div",{className:`gemini-loader__log ${n}`},w("div",{className:"gemini-loader__dot"}),w("div",{textContent:t}));for(e.appendChild(o);e.childElementCount>Ko;)e.firstElementChild?.remove();e.scrollTop=e.scrollHeight}function Du(){return new Promise(e=>{if(typeof GM_xmlhttpRequest>"u"){e(Dt);return}GM_xmlhttpRequest({method:"GET",url:Dt,responseType:"blob",onload:t=>{let n=t.response,o=new FileReader;o.onloadend=()=>e(o.result),o.onerror=()=>e(Dt),o.readAsDataURL(n)},onerror:()=>e(Dt)})})}function In(e={}){let t=Number.isFinite(e.blurPx)?Math.max(4,Number(e.blurPx)):14;_u();let n=w("div",{className:"gemini-loader__subtitle",textContent:e.subtitle??"Initializing the mod..."}),o=w("div",{className:"gemini-loader__logs"}),r=w("img",{className:"gemini-loader__spinner-icon",alt:"Gemini"}),i=w("div",{className:"gemini-loader__spinner"},r);Du().then(b=>{r.src=b});let a=w("div",{className:"gemini-loader__card"},w("div",{className:"gemini-loader__header"},i,w("div",{className:"gemini-loader__titles"},w("div",{className:"gemini-loader__title",textContent:e.title??"Gemini is loading"}),n)),o),s=w("div",{id:_e},a);(document.body||document.documentElement).appendChild(s);let l=w("div",{className:"gemini-loader__actions"},w("button",{className:"gemini-loader__button",textContent:"Close loader",onclick:()=>s.remove()}));a.appendChild(l),s.style.setProperty("--loader-blur",`${t}px`);let c=b=>{n.textContent=b},u=new Map,d=(b,h)=>{b.className=`gemini-loader__log ${h}`};return{log:(b,h="info")=>Gt(o,b,h),logStep:(b,h,S="info")=>{let T=String(b||"").trim();if(!T){Gt(o,h,S);return}let x=u.get(T);if(x){x.el.lastElementChild&&(x.el.lastElementChild.textContent=h),x.tone!==S&&(d(x.el,S),x.tone=S);return}let v=w("div",{className:`gemini-loader__log ${S}`},w("div",{className:"gemini-loader__dot"}),w("div",{textContent:h}));for(u.set(T,{el:v,tone:S}),o.appendChild(v);o.childElementCount>Ko;){let k=o.firstElementChild;if(!k)break;let I=Array.from(u.entries()).find(([,E])=>E.el===k)?.[0];I&&u.delete(I),k.remove()}o.scrollTop=o.scrollHeight},setSubtitle:c,succeed:(b,h=600)=>{b&&Gt(o,b,"success"),s.classList.add("gemini-loader--closing"),setTimeout(()=>s.remove(),h)},fail:(b,h)=>{Gt(o,b,"error"),c("Something went wrong. Check the console for details."),s.classList.add("gemini-loader--error"),console.error("[Gemini loader]",b,h)}}}function qo(e,t,n){let o=w("div",{className:"lg-pill",id:"pill"}),r=e.map(u=>{let d=w("button",{className:"lg-tab"},u.label);return d.setAttribute("data-target",u.id),d}),i=w("div",{className:"lg-tabs",id:"lg-tabs-row"},o,...r),a=i;i.addEventListener("wheel",u=>{Math.abs(u.deltaY)>Math.abs(u.deltaX)&&(u.preventDefault(),i.scrollLeft+=u.deltaY)},{passive:!1});function s(u){let d=i.getBoundingClientRect(),p=r.find(v=>v.dataset.target===u)||r[0];if(!p)return;let m=p.getBoundingClientRect(),g=m.left-d.left,f=m.width;o.style.width=`${f}px`,o.style.transform=`translateX(${g}px)`;let b=i.scrollLeft,h=b,S=b+i.clientWidth,T=g-12,x=g+f+12;T<h?i.scrollTo({left:T,behavior:"smooth"}):x>S&&i.scrollTo({left:x-i.clientWidth,behavior:"smooth"})}let l=t||(e[0]?.id??"");function c(u){l=u,r.forEach(d=>d.classList.toggle("active",d.dataset.target===u)),s(u),n(u)}return r.forEach(u=>u.addEventListener("click",()=>c(u.dataset.target))),queueMicrotask(()=>s(l)),{root:a,activate:c,recalc:()=>s(l),getActive:()=>l}}var De=class{constructor(t){xe(this,"id");xe(this,"label");xe(this,"container",null);xe(this,"cleanupFunctions",[]);this.id=t.id,this.label=t.label}render(t){for(this.unmount();t.firstChild;)t.removeChild(t.firstChild);this.container=t;let n=this.build(t);n instanceof Promise&&n.catch(r=>{console.error(`[Gemini] Error building section ${this.id}:`,r)});let o=t.firstElementChild;o&&o.classList.contains("gemini-section")&&o.classList.add("active")}unmount(){this.executeCleanup(),this.container=null}createContainer(t,n){let o=n?`gemini-section ${n}`:"gemini-section";return w("section",{id:t,className:o})}addCleanup(t){this.cleanupFunctions.push(t)}createGrid(t="12px"){let n=w("div");return n.style.display="grid",n.style.gap=t,n}executeCleanup(){for(let t of this.cleanupFunctions)try{t()}catch(n){console.error(`[Gemini] Cleanup error in section ${this.id}:`,n)}this.cleanupFunctions=[]}};var ut=class{constructor(t,n,o){xe(this,"sections");xe(this,"activeId",null);xe(this,"container");xe(this,"theme");this.sections=new Map(t.map(r=>[r.id,r])),this.container=n,this.theme=o}get ids(){return Array.from(this.sections.keys())}get all(){return Array.from(this.sections.values())}get active(){return this.activeId}activate(t){if(this.activeId!==t){if(!this.sections.has(t))throw new Error(`[Gemini] Unknown section: ${t}`);if(this.activeId&&this.sections.get(this.activeId).unmount(),this.activeId=t,this.sections.get(t).render(this.container),this.theme){let n=this.theme.getCurrentTheme();this.theme.applyTheme(n)}}}};function dt(e,t){try{let n=JSON.stringify(t);GM_setValue(e,n)}catch(n){console.error(`[Gemini] Failed to save key "${e}" to storage:`,n)}}function Ee(e,t){try{let n=GM_getValue(e);return n==null?t:typeof n=="string"?JSON.parse(n):n}catch(n){return console.error(`[Gemini] Failed to load key "${e}" from storage, using default:`,n),t}}var Jo="gemini.sections";function Xo(){let e=Ee(Jo,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function Gu(e){dt(Jo,e)}async function Yo(e){return Xo()[e]}function Qo(e,t){let n=Xo();Gu({...n,[e]:t})}function Nt(e,t){return{...e,...t??{}}}async function Zo(e){let t=await Yo(e.path),n;e.migrate?n=e.migrate(t):n=t??{},n=Object.assign((c=>JSON.parse(JSON.stringify(c)))(e.defaults),n),e.sanitize&&(n=e.sanitize(n));function r(){Qo(e.path,n)}function i(){return n}function a(c){n=e.sanitize?e.sanitize(c):c,r()}function s(c){let d=Object.assign((p=>JSON.parse(JSON.stringify(p)))(n),{});typeof c=="function"?c(d):Object.assign(d,c),n=e.sanitize?e.sanitize(d):d,r()}function l(){r()}return{get:i,set:a,update:s,save:l}}async function pt(e,t){let{path:n=e,...o}=t;return Zo({path:n,...o})}var Nu=0,Wt=new Map;function Le(e={},...t){let{id:n,className:o,variant:r="default",padding:i="md",interactive:a=!1,expandable:s=!1,defaultExpanded:l=!0,onExpandChange:c,mediaTop:u,title:d,subtitle:p,badge:m,actions:g,footer:f,divider:b=!1,tone:h="neutral",stateKey:S}=e,T=w("div",{className:"card",id:n,tabIndex:a?0:void 0});T.classList.add(`card--${r}`,`card--p-${i}`),a&&T.classList.add("card--interactive"),h!=="neutral"&&T.classList.add(`card--tone-${h}`),o&&T.classList.add(...o.split(" ").filter(Boolean)),s&&T.classList.add("card--expandable");let x=s?S??n??(typeof d=="string"?`title:${d}`:null):null,v=!s||l;x&&Wt.has(x)&&(v=!!Wt.get(x));let k=null,I=null,E=null,L=null,O=null,M=n?`${n}-collapse`:`card-collapse-${++Nu}`,U=()=>{if(L!==null&&(cancelAnimationFrame(L),L=null),O){let H=O;O=null,H()}},J=(H,G)=>{if(!E)return;U();let R=E;if(R.setAttribute("aria-hidden",String(!H)),!G){R.classList.remove("card-collapse--animating"),R.style.display=H?"":"none",R.style.height="",R.style.opacity="";return}if(R.classList.add("card-collapse--animating"),R.style.display="",H){R.style.height="auto";let F=R.scrollHeight;if(!F){R.classList.remove("card-collapse--animating"),R.style.display="",R.style.height="",R.style.opacity="";return}R.style.height="0px",R.style.opacity="0",R.offsetHeight,L=requestAnimationFrame(()=>{L=null,R.style.height=`${F}px`,R.style.opacity="1"})}else{let F=R.scrollHeight;if(!F){R.classList.remove("card-collapse--animating"),R.style.display="none",R.style.height="",R.style.opacity="";return}R.style.height=`${F}px`,R.style.opacity="1",R.offsetHeight,L=requestAnimationFrame(()=>{L=null,R.style.height="0px",R.style.opacity="0"})}let C=()=>{R.classList.remove("card-collapse--animating"),R.style.height="",H||(R.style.display="none"),R.style.opacity=""},D=null,W=F=>{F.target===R&&(D!==null&&(clearTimeout(D),D=null),R.removeEventListener("transitionend",W),R.removeEventListener("transitioncancel",W),O=null,C())};O=()=>{D!==null&&(clearTimeout(D),D=null),R.removeEventListener("transitionend",W),R.removeEventListener("transitioncancel",W),O=null,C()},R.addEventListener("transitionend",W),R.addEventListener("transitioncancel",W),D=window.setTimeout(()=>{O?.()},420)};function q(H){let G=document.createElementNS("http://www.w3.org/2000/svg","svg");return G.setAttribute("viewBox","0 0 24 24"),G.setAttribute("width","16"),G.setAttribute("height","16"),G.innerHTML=H==="up"?'<path d="M7 14l5-5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>':'<path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',G}function N(H,G=!0,R=!0){v=H,T.classList.toggle("card--collapsed",!v),T.classList.toggle("card--expanded",v),k&&(k.dataset.expanded=String(v),k.setAttribute("aria-expanded",String(v))),I&&(I.setAttribute("aria-expanded",String(v)),I.classList.toggle("card-toggle--collapsed",!v),I.setAttribute("aria-label",v?"Replier le contenu":"Deplier le contenu"),I.replaceChildren(q(v?"up":"down"))),s?J(v,R):E&&(E.style.display="",E.style.height="",E.style.opacity="",E.setAttribute("aria-hidden","false")),G&&c&&c(v),x&&Wt.set(x,v)}if(u){let H=w("div",{className:"card-media"});H.append(u),T.appendChild(H)}let B=!!(d||p||m||g&&g.length||s);if(B){k=w("div",{className:"card-header"});let H=w("div",{className:"card-headline",style:"min-width:0;display:flex;flex-direction:column;gap:2px;"});if(d){let C=w("h3",{className:"card-title",style:"margin:0;font-size:15px;font-weight:700;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:8px;"},d);m&&C.append(typeof m=="string"?w("span",{className:"badge"},m):m),H.appendChild(C)}if(p){let C=w("div",{className:"card-subtitle",style:"opacity:.85;font-size:12px;color:color-mix(in oklab, var(--fg) 80%, #9ca3af)"},p);H.appendChild(C)}(H.childNodes.length||s)&&k.appendChild(H);let G=w("div",{className:"card-header-right",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"}),R=w("div",{className:"card-actions",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"});g?.forEach(C=>R.appendChild(C)),R.childNodes.length&&G.appendChild(R),s&&(I=w("button",{className:"card-toggle",type:"button",ariaExpanded:String(v),ariaControls:M,ariaLabel:v?"Replier le contenu":"Deplier le contenu"}),I.textContent=v?"\u25B2":"\u25BC",I.addEventListener("click",C=>{C.preventDefault(),C.stopPropagation(),N(!v)}),G.appendChild(I),k.classList.add("card-header--expandable"),k.addEventListener("click",C=>{let D=C.target;D?.closest(".card-actions")||D?.closest(".card-toggle")||N(!v)})),G.childNodes.length&&k.appendChild(G),T.appendChild(k)}E=w("div",{className:"card-collapse",id:M,ariaHidden:s?String(!v):"false"}),T.appendChild(E),b&&B&&E.appendChild(w("div",{className:"card-divider"}));let _=w("div",{className:"card-body"});if(_.append(...t),E.appendChild(_),f){b&&E.appendChild(w("div",{className:"card-divider"}));let H=w("div",{className:"card-footer"});H.append(f),E.appendChild(H)}return I&&I.setAttribute("aria-controls",M),N(v,!1,!1),x&&Wt.set(x,v),T}function En(...e){return w("div",{className:"card-footer"},...e)}var Bt=!1,jt=new Set,me=e=>{let t=document.activeElement;for(let n of jt)if(t&&(t===n||n.contains(t))){e.stopImmediatePropagation(),e.stopPropagation();return}};function Wu(){Bt||(Bt=!0,window.addEventListener("keydown",me,!0),window.addEventListener("keypress",me,!0),window.addEventListener("keyup",me,!0),document.addEventListener("keydown",me,!0),document.addEventListener("keypress",me,!0),document.addEventListener("keyup",me,!0))}function Bu(){Bt&&(jt.size>0||(Bt=!1,window.removeEventListener("keydown",me,!0),window.removeEventListener("keypress",me,!0),window.removeEventListener("keyup",me,!0),document.removeEventListener("keydown",me,!0),document.removeEventListener("keypress",me,!0),document.removeEventListener("keyup",me,!0)))}function qe(e){let{id:t,value:n=null,options:o,placeholder:r="Select...",size:i="md",disabled:a=!1,blockGameKeys:s=!0,onChange:l,onOpenChange:c}=e,u=w("div",{className:"select",id:t}),d=w("button",{className:"select-trigger",type:"button"}),p=w("span",{className:"select-value"},r),m=w("span",{className:"select-caret"},"\u25BE");d.append(p,m);let g=w("div",{className:"select-menu",role:"listbox",tabindex:"-1","aria-hidden":"true"});u.classList.add(`select--${i}`);let f=!1,b=n,h=null,S=!!a;function T(C){return C==null?r:(e.options||o).find(W=>W.value===C)?.label??r}function x(C){p.textContent=T(C),g.querySelectorAll(".select-option").forEach(D=>{let W=D.dataset.value,F=C!=null&&W===C;D.classList.toggle("selected",F),D.setAttribute("aria-selected",String(F))})}function v(C){g.replaceChildren(),C.forEach(D=>{let W=w("button",{className:"select-option"+(D.disabled?" disabled":""),type:"button",role:"option","data-value":D.value,"aria-selected":String(D.value===b),tabindex:"-1"},D.label);D.value===b&&W.classList.add("selected"),D.disabled||W.addEventListener("pointerdown",F=>{F.preventDefault(),F.stopPropagation(),M(D.value,{notify:!0}),L()},{capture:!0}),g.appendChild(W)})}function k(){d.setAttribute("aria-expanded",String(f)),g.setAttribute("aria-hidden",String(!f))}function I(){let C=d.getBoundingClientRect();Object.assign(g.style,{minWidth:`${C.width}px`})}function E(){f||S||(f=!0,u.classList.add("open"),k(),I(),document.addEventListener("mousedown",B,!0),document.addEventListener("scroll",_,!0),window.addEventListener("resize",H),g.focus({preventScroll:!0}),s&&(Wu(),jt.add(u),h=()=>{jt.delete(u),Bu()}),c?.(!0))}function L(){f&&(f=!1,u.classList.remove("open"),k(),document.removeEventListener("mousedown",B,!0),document.removeEventListener("scroll",_,!0),window.removeEventListener("resize",H),d.focus({preventScroll:!0}),h?.(),h=null,c?.(!1))}function O(){f?L():E()}function M(C,D={}){let W=b;b=C,x(b),D.notify!==!1&&W!==C&&l?.(C)}function U(){return b}function J(C){let D=Array.from(g.querySelectorAll(".select-option:not(.disabled)"));if(!D.length)return;let W=D.findIndex(oe=>oe.classList.contains("active")),F=D[(W+(C===1?1:D.length-1))%D.length];D.forEach(oe=>oe.classList.remove("active")),F.classList.add("active"),F.focus({preventScroll:!0}),F.scrollIntoView({block:"nearest"})}function q(C){(C.key===" "||C.key==="Enter"||C.key==="ArrowDown")&&(C.preventDefault(),E())}function N(C){if(C.key==="Escape"){C.preventDefault(),L();return}if(C.key==="Enter"||C.key===" "){let D=g.querySelector(".select-option.active")||g.querySelector(".select-option.selected");D&&!D.classList.contains("disabled")&&(C.preventDefault(),M(D.dataset.value,{notify:!0}),L());return}if(C.key==="ArrowDown"){C.preventDefault(),J(1);return}if(C.key==="ArrowUp"){C.preventDefault(),J(-1);return}}function B(C){u.contains(C.target)||L()}function _(){f&&I()}function H(){f&&I()}function G(C){S=!!C,d.disabled=S,u.classList.toggle("disabled",S),S&&L()}function R(C){e.options=C,v(C),C.some(D=>D.value===b)||(b=null,x(null))}return u.append(d,g),d.addEventListener("pointerdown",C=>{C.preventDefault(),C.stopPropagation(),O()},{capture:!0}),d.addEventListener("keydown",q),g.addEventListener("keydown",N),v(o),n!=null?(b=n,x(b)):x(null),k(),G(S),{root:u,open:E,close:L,toggle:O,getValue:U,setValue:M,setOptions:R,setDisabled:G,destroy(){document.removeEventListener("mousedown",B,!0),document.removeEventListener("scroll",_,!0),window.removeEventListener("resize",H),h?.(),h=null}}}function Vt(e={}){let{id:t,text:n="",htmlFor:o,tone:r="default",size:i="md",layout:a="inline",variant:s="text",required:l=!1,disabled:c=!1,tooltip:u,hint:d,icon:p,suffix:m,onClick:g}=e,f=w("div",{className:"lg-label-wrap",id:t}),b=w("label",{className:"lg-label",...o?{htmlFor:o}:{},...u?{title:u}:{}});if(p){let M=typeof p=="string"?w("span",{className:"lg-label-ico"},p):p;M.classList?.add?.("lg-label-ico"),b.appendChild(M)}let h=w("span",{className:"lg-label-text"},n);b.appendChild(h);let S=w("span",{className:"lg-label-req",ariaHidden:"true"}," *");l&&b.appendChild(S);let T=null;if(m!=null){T=typeof m=="string"?document.createTextNode(m):m;let M=w("span",{className:"lg-label-suffix"});M.appendChild(T),b.appendChild(M)}let x=d?w("div",{className:"lg-label-hint"},d):null;f.classList.add(`lg-label--${a}`),f.classList.add(`lg-label--${i}`),s==="title"&&f.classList.add("lg-label--title"),v(r),c&&f.classList.add("is-disabled"),f.appendChild(b),x&&f.appendChild(x),g&&b.addEventListener("click",g);function v(M){f.classList.remove("lg-label--default","lg-label--muted","lg-label--info","lg-label--success","lg-label--warning","lg-label--danger"),f.classList.add(`lg-label--${M}`)}function k(M){h.textContent=M}function I(M){v(M)}function E(M){M&&!S.isConnected&&b.appendChild(S),!M&&S.isConnected&&S.remove(),M?b.setAttribute("aria-required","true"):b.removeAttribute("aria-required")}function L(M){f.classList.toggle("is-disabled",!!M)}function O(M){!M&&x&&x.isConnected?x.remove():M&&x?x.textContent=M:M&&!x&&f.appendChild(w("div",{className:"lg-label-hint"},M))}return{root:f,labelEl:b,hintEl:x,setText:k,setTone:I,setRequired:E,setDisabled:L,setHint:O}}function mt(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function Ft(e,t){let n=document.createElement("span");n.className=`btn-ico btn-ico--${t}`;let o=mt(e);return o&&n.appendChild(o),n}function ju(){let e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.marginRight="6px",t.style.display="none",t.style.flexShrink="0";let n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");let o=document.createElementNS(e,"animate");o.setAttribute("attributeName","stroke-dasharray"),o.setAttribute("values","1,150;90,150;90,150"),o.setAttribute("dur","1.5s"),o.setAttribute("repeatCount","indefinite");let r=document.createElementNS(e,"animateTransform");return r.setAttribute("attributeName","transform"),r.setAttribute("attributeType","XML"),r.setAttribute("type","rotate"),r.setAttribute("from","0 12 12"),r.setAttribute("to","360 12 12"),r.setAttribute("dur","1s"),r.setAttribute("repeatCount","indefinite"),n.appendChild(o),n.appendChild(r),t.appendChild(n),t}function Re(e={}){let{label:t="",id:n,variant:o="default",size:r="md",iconLeft:i,iconRight:a,loading:s=!1,tooltip:l,type:c="button",onClick:u,disabled:d=!1,fullWidth:p=!1}=e,m=w("button",{className:"btn",id:n});m.type=c,o==="primary"&&m.classList.add("primary"),r==="sm"&&m.classList.add("btn--sm"),l&&(m.title=l),p&&(m.style.width="100%");let g=ju(),f=i?Ft(i,"left"):null,b=a?Ft(a,"right"):null,h=document.createElement("span");h.className="btn-label";let S=mt(t);S&&h.appendChild(S),!S&&(f||b)&&m.classList.add("btn--icon"),m.appendChild(g),f&&m.appendChild(f),m.appendChild(h),b&&m.appendChild(b);let T=d||s;m.disabled=T,m.setAttribute("aria-busy",String(!!s)),g.style.display=s?"inline-block":"none",u&&m.addEventListener("click",u);let x=m;return x.setLoading=v=>{m.setAttribute("aria-busy",String(!!v)),g.style.display=v?"inline-block":"none",m.disabled=v||d},x.setDisabled=v=>{m.disabled=v||m.getAttribute("aria-busy")==="true"},x.setLabel=v=>{h.replaceChildren();let k=mt(v);k&&h.appendChild(k),!k&&(f||b)?m.classList.add("btn--icon"):m.classList.remove("btn--icon")},x.setIconLeft=v=>{if(v==null){f?.remove();return}f?f.replaceChildren(mt(v)):m.insertBefore(Ft(v,"left"),h)},x.setIconRight=v=>{if(v==null){b?.remove();return}b?b.replaceChildren(mt(v)):m.appendChild(Ft(v,"right"))},x}function Vu(){try{let e=window.visualViewport,t=Math.round((e?.width??window.innerWidth)||0),n=Math.round((e?.height??window.innerHeight)||0);if(t&&n)return t>=n?"landscape":"portrait"}catch{}return"unknown"}function Fu(){let e=navigator.userAgent||"",t=navigator.platform||"",n=navigator.userAgentData;if(n&&typeof n.platform=="string"){let r=n.platform.toLowerCase();if(r.includes("windows"))return"windows";if(r.includes("mac"))return"mac";if(r.includes("android"))return"android";if(r.includes("chrome os")||r.includes("cros"))return"chromeos";if(r.includes("linux"))return"linux";if(r.includes("ios"))return"ios"}return/iPhone|iPad|iPod/i.test(e)||t==="MacIntel"&&navigator.maxTouchPoints>1?"ios":/Android/i.test(e)?"android":/CrOS/i.test(e)?"chromeos":/Win/i.test(e)?"windows":/Mac/i.test(e)?"mac":/Linux/i.test(e)?"linux":"unknown"}function zu(){let e=navigator.userAgent||"",t=navigator.userAgentData;if(t&&Array.isArray(t.brands)){let n=t.brands.map(a=>String(a.brand||a.brandName||a.brandVersion||a)),o=n.some(a=>/Edge/i.test(a)||/Microsoft Edge/i.test(a)),r=n.some(a=>/Opera/i.test(a)||/OPR/i.test(a)),i=n.some(a=>/Chrome|Chromium/i.test(a));if(o)return"Edge";if(r)return"Opera";if(i)return"Chrome";if(navigator.brave)return"Brave"}return/FxiOS/i.test(e)?"Firefox":/CriOS/i.test(e)?"Chrome":/EdgiOS/i.test(e)?"Edge":/OPiOS|OPR|Opera Mini|Opera/i.test(e)?"Opera":/Edg\//i.test(e)?"Edge":/OPR\//i.test(e)||/Opera/i.test(e)?"Opera":/Firefox/i.test(e)?"Firefox":/Safari/i.test(e)&&!/Chrome|Chromium|Edg|OPR/i.test(e)?"Safari":/Brave/i.test(e)||window.Brave||navigator.brave?"Brave":/Chrome|Chromium/i.test(e)?"Chrome":"Unknown"}function $u(){let e=navigator.userAgent||"",t=navigator.userAgentData;return t&&typeof t.mobile=="boolean"?t.mobile?"mobile":"desktop":/Android|iPhone|iPad|iPod|Mobile/i.test(e)?"mobile":"desktop"}function be(){let e=(()=>{try{return window.top!==window.self}catch{return!0}})(),t=Uu(document.referrer),o=e&&!!t&&/(^|\.)discord(app)?\.com$/i.test(t)?"discord":"web",r=$u(),i=Fu(),a=zu(),s=window.screen||{},l=window.visualViewport,c=Math.round(window.innerWidth||document.documentElement.clientWidth||0),u=Math.round(window.innerHeight||document.documentElement.clientHeight||0),d=Math.round(l?.width??c),p=Math.round(l?.height??u),m=Math.round(s.width||0),g=Math.round(s.height||0),f=Math.round(s.availWidth||m),b=Math.round(s.availHeight||g),h=Number.isFinite(window.devicePixelRatio)?window.devicePixelRatio:1;return{surface:o,host:location.hostname,origin:location.origin,isInIframe:e,platform:r,browser:a,os:i,viewportWidth:c,viewportHeight:u,visualViewportWidth:d,visualViewportHeight:p,screenWidth:m,screenHeight:g,availScreenWidth:f,availScreenHeight:b,dpr:h,orientation:Vu()}}function er(){return be().surface==="discord"}function Uu(e){if(!e)return null;try{return new URL(e).hostname}catch{return null}}var zt=!1,gt=new Set;function Ku(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}var ge=e=>{let t=Ku();if(t){for(let n of gt)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function qu(){zt||(zt=!0,window.addEventListener("keydown",ge,!0),window.addEventListener("keypress",ge,!0),window.addEventListener("keyup",ge,!0),document.addEventListener("keydown",ge,!0),document.addEventListener("keypress",ge,!0),document.addEventListener("keyup",ge,!0))}function Ju(){zt&&(zt=!1,window.removeEventListener("keydown",ge,!0),window.removeEventListener("keypress",ge,!0),window.removeEventListener("keyup",ge,!0),document.removeEventListener("keydown",ge,!0),document.removeEventListener("keypress",ge,!0),document.removeEventListener("keyup",ge,!0))}function Xu(e){return gt.size===0&&qu(),gt.add(e),()=>{gt.delete(e),gt.size===0&&Ju()}}function Yu(e,t,n,o){let r;switch(e){case"digits":r="0-9";break;case"alpha":r="\\p{L}";break;case"alphanumeric":r="\\p{L}0-9";break;default:return null}return t&&(r+=" "),n&&(r+="\\-"),o&&(r+="_"),new RegExp(`[^${r}]`,"gu")}function Qu(e,t){return t?e.replace(t,""):e}function Zu(e,t=0){if(!t)return e;let n;return((...o)=>{clearTimeout(n),n=setTimeout(()=>e(...o),t)})}function tr(e={}){let{id:t,placeholder:n="",value:o="",mode:r="any",allowSpaces:i=!1,allowDashes:a=!1,allowUnderscore:s=!1,maxLength:l,blockGameKeys:c=!0,debounceMs:u=0,onChange:d,onEnter:p,label:m}=e,g=w("div",{className:"lg-input-wrap"}),f=w("input",{className:"input",id:t,placeholder:n});if(typeof l=="number"&&l>0&&(f.maxLength=l),o&&(f.value=o),m){let M=w("div",{className:"lg-input-label"},m);g.appendChild(M)}g.appendChild(f);let b=Yu(r,i,a,s),h=()=>{let M=f.selectionStart??f.value.length,U=f.value.length,J=Qu(f.value,b);if(J!==f.value){f.value=J;let q=U-J.length,N=Math.max(0,M-q);f.setSelectionRange(N,N)}},S=Zu(()=>d?.(f.value),u);f.addEventListener("input",()=>{h(),S()}),f.addEventListener("paste",()=>queueMicrotask(()=>{h(),S()})),f.addEventListener("keydown",M=>{M.key==="Enter"&&p?.(f.value)});let T=c?Xu(f):()=>{};function x(){return f.value}function v(M){f.value=M??"",h(),S()}function k(){f.focus()}function I(){f.blur()}function E(M){f.disabled=!!M}function L(){return document.activeElement===f}function O(){T()}return{root:g,input:f,getValue:x,setValue:v,focus:k,blur:I,setDisabled:E,isFocused:L,destroy:O}}function ne(e,t,n){return Math.min(n,Math.max(t,e))}function bt({h:e,s:t,v:n,a:o}){let r=(e%360+360)%360/60,i=n*t,a=i*(1-Math.abs(r%2-1)),s=0,l=0,c=0;switch(Math.floor(r)){case 0:s=i,l=a;break;case 1:s=a,l=i;break;case 2:l=i,c=a;break;case 3:l=a,c=i;break;case 4:s=a,c=i;break;default:s=i,c=a;break}let d=n-i,p=Math.round((s+d)*255),m=Math.round((l+d)*255),g=Math.round((c+d)*255);return{r:ne(p,0,255),g:ne(m,0,255),b:ne(g,0,255),a:ne(o,0,1)}}function nr({r:e,g:t,b:n,a:o}){let r=ne(e,0,255)/255,i=ne(t,0,255)/255,a=ne(n,0,255)/255,s=Math.max(r,i,a),l=Math.min(r,i,a),c=s-l,u=0;c!==0&&(s===r?u=60*((i-a)/c%6):s===i?u=60*((a-r)/c+2):u=60*((r-i)/c+4)),u<0&&(u+=360);let d=s===0?0:c/s;return{h:u,s:d,v:s,a:ne(o,0,1)}}function Rn({r:e,g:t,b:n}){let o=r=>ne(Math.round(r),0,255).toString(16).padStart(2,"0");return`#${o(e)}${o(t)}${o(n)}`.toUpperCase()}function ed({r:e,g:t,b:n,a:o}){let r=ne(Math.round(o*255),0,255);return`${Rn({r:e,g:t,b:n,a:o})}${r.toString(16).padStart(2,"0")}`.toUpperCase()}function ft({r:e,g:t,b:n,a:o}){let r=Math.round(o*1e3)/1e3;return`rgba(${e}, ${t}, ${n}, ${r})`}function Je(e){let t=e.trim();if(!t||(t.startsWith("#")&&(t=t.slice(1)),![3,4,6,8].includes(t.length))||!/^[0-9a-fA-F]+$/.test(t))return null;(t.length===3||t.length===4)&&(t=t.split("").map(a=>a+a).join(""));let n=255;t.length===8&&(n=parseInt(t.slice(6,8),16),t=t.slice(0,6));let o=parseInt(t.slice(0,2),16),r=parseInt(t.slice(2,4),16),i=parseInt(t.slice(4,6),16);return{r:o,g:r,b:i,a:n/255}}function Ln(e){if(!e)return null;let t=e.trim();if(t.startsWith("#"))return Je(t);let n=t.match(/^rgba?\(([^)]+)\)$/i);if(n){let o=n[1].split(",").map(l=>l.trim());if(o.length<3)return null;let r=Number(o[0]),i=Number(o[1]),a=Number(o[2]),s=o[3]!=null?Number(o[3]):1;return[r,i,a,s].some(l=>Number.isNaN(l))?null:{r,g:i,b:a,a:s}}return null}function td(e,t){let n=Ln(e)??Je(e??"")??{r:244,g:67,b:54,a:1};return typeof t=="number"&&(n.a=ne(t,0,1)),nr(n)}function nd(e){return`#${e.trim().replace(/[^0-9a-fA-F#]/g,"").replace(/#/g,"")}`.slice(0,9).toUpperCase()}function od(e){let t=e.trim();return t&&(/^rgba?\s*\(/i.test(t)?t=t.replace(/^rgba?/i,"rgba"):(t=t.replace(/^\(?(.*)\)?$/,"$1"),t=`rgba(${t})`),t=t.replace(/\s*\(\s*/,"("),t=t.replace(/\s*\)\s*$/,")"),t=t.replace(/\s*,\s*/g,", "),t)}function Ge(e){let t=bt(e),n=bt({...e,a:1});return{hsva:{...e},hex:Rn(n),hexa:ed(t),rgba:ft(t),alpha:e.a}}function or(e={}){let{id:t,label:n="Color",value:o,alpha:r,defaultExpanded:i=!1,detectMobile:a,onInput:s,onChange:l}=e,u=a?a():be().platform==="mobile",d=td(o,r),p=Le({id:t,className:"color-picker",title:n,padding:u?"md":"lg",variant:"soft",expandable:!u,defaultExpanded:!u&&i});p.classList.add(u?"color-picker--mobile":"color-picker--desktop");let m=p.querySelector(".card-header");m&&m.classList.add("color-picker__header");let g=m?.querySelector(".card-title"),f=w("button",{className:"color-picker__preview",type:"button",title:`Preview ${n}`,"aria-label":`Change ${n}`});g?g.prepend(f):m?m.prepend(f):p.prepend(f);let b=p.querySelector(".card-toggle");!u&&b&&f.addEventListener("click",()=>{p.classList.contains("card--collapsed")&&b.click()});let h=p.querySelector(".card-collapse"),S=null,T=null,x=null,v=null,k=null,I=null,E=null,L=null,O=null,M="hex";function U(_){let H=Ge(d);_==="input"?s?.(H):l?.(H)}function J(){let _=Ge(d);if(f.style.setProperty("--cp-preview-color",_.rgba),f.setAttribute("aria-label",`${n}: ${_.hexa}`),!u&&S&&T&&x&&v&&k&&I&&E){let H=bt({...d,s:1,v:1,a:1}),G=ft(H);S.style.setProperty("--cp-palette-hue",G),T.style.left=`${d.s*100}%`,T.style.top=`${(1-d.v)*100}%`,x.style.setProperty("--cp-alpha-gradient",`linear-gradient(180deg, ${ft({...H,a:1})} 0%, ${ft({...H,a:0})} 100%)`),v.style.top=`${(1-d.a)*100}%`,k.style.setProperty("--cp-hue-color",ft(bt({...d,v:1,s:1,a:1}))),I.style.left=`${d.h/360*100}%`;let R=d.a===1?_.hex:_.hexa,C=_.rgba,D=M==="hex"?R:C;E!==document.activeElement&&(E.value=D),E.setAttribute("aria-label",`${M.toUpperCase()} code for ${n}`),E.placeholder=M==="hex"?"#RRGGBB or #RRGGBBAA":"rgba(0, 0, 0, 1)",M==="hex"?E.maxLength=9:E.removeAttribute("maxLength"),E.dataset.mode=M,L&&(L.textContent=M.toUpperCase(),L.setAttribute("aria-label",M==="hex"?"Passer en saisie RGBA":"Revenir en saisie HEX"),L.setAttribute("aria-pressed",M==="rgba"?"true":"false"),L.classList.toggle("is-alt",M==="rgba"))}O&&O!==document.activeElement&&(O.value=_.hex)}function q(_,H=null){d={h:(_.h%360+360)%360,s:ne(_.s,0,1),v:ne(_.v,0,1),a:ne(_.a,0,1)},J(),H&&U(H)}function N(_,H=null){q(nr(_),H)}function B(_,H,G){_.addEventListener("pointerdown",R=>{R.preventDefault();let C=R.pointerId,D=F=>{F.pointerId===C&&H(F)},W=F=>{F.pointerId===C&&(document.removeEventListener("pointermove",D),document.removeEventListener("pointerup",W),document.removeEventListener("pointercancel",W),G?.(F))};H(R),document.addEventListener("pointermove",D),document.addEventListener("pointerup",W),document.addEventListener("pointercancel",W)})}if(!u&&h){let _=h.querySelector(".card-body");if(_){_.classList.add("color-picker__body"),T=w("div",{className:"color-picker__palette-cursor"}),S=w("div",{className:"color-picker__palette"},T),v=w("div",{className:"color-picker__alpha-thumb"}),x=w("div",{className:"color-picker__alpha"},v),I=w("div",{className:"color-picker__hue-thumb"}),k=w("div",{className:"color-picker__hue"},I);let H=w("div",{className:"color-picker__main"},S,x),G=w("div",{className:"color-picker__hue-row"},k),R=tr({blockGameKeys:!0});E=R.input,E.classList.add("color-picker__hex-input"),E.value="",E.maxLength=9,E.spellcheck=!1,E.inputMode="text",E.setAttribute("aria-label",`Hex code for ${n}`),L=w("button",{type:"button",className:"color-picker__mode-btn",textContent:"HEX","aria-pressed":"false","aria-label":"Passer en saisie RGBA"}),R.root.classList.add("color-picker__hex-wrap");let C=w("div",{className:"color-picker__hex-row"},L,R.root);_.replaceChildren(H,G,C),B(S,W=>{if(!S||!T)return;let F=S.getBoundingClientRect(),oe=ne((W.clientX-F.left)/F.width,0,1),vn=ne((W.clientY-F.top)/F.height,0,1);q({...d,s:oe,v:1-vn},"input")},()=>U("change")),B(x,W=>{if(!x)return;let F=x.getBoundingClientRect(),oe=ne((W.clientY-F.top)/F.height,0,1);q({...d,a:1-oe},"input")},()=>U("change")),B(k,W=>{if(!k)return;let F=k.getBoundingClientRect(),oe=ne((W.clientX-F.left)/F.width,0,1);q({...d,h:oe*360},"input")},()=>U("change")),L.addEventListener("click",()=>{if(M=M==="hex"?"rgba":"hex",E){let W=Ge(d);E.value=M==="hex"?d.a===1?W.hex:W.hexa:W.rgba}J(),E?.focus(),E?.select()}),E.addEventListener("input",()=>{if(M==="hex"){let W=nd(E.value);if(W!==E.value){let F=E.selectionStart??W.length;E.value=W,E.setSelectionRange(F,F)}}});let D=()=>{let W=E.value;if(M==="hex"){let F=Je(W);if(!F){E.value=d.a===1?Ge(d).hex:Ge(d).hexa;return}let oe=W.startsWith("#")?W.slice(1):W,vn=oe.length===4||oe.length===8;F.a=vn?F.a:d.a,N(F,"change")}else{let F=od(W),oe=Ln(F);if(!oe){E.value=Ge(d).rgba;return}N(oe,"change")}};E.addEventListener("change",D),E.addEventListener("blur",D),E.addEventListener("keydown",W=>{W.key==="Enter"&&(D(),E.blur())})}}return u&&(h&&h.remove(),O=w("input",{className:"color-picker__native",type:"color",value:Rn(bt({...d,a:1}))}),f.addEventListener("click",()=>O.click()),O.addEventListener("input",()=>{let _=Je(O.value);_&&(_.a=d.a,N(_,"input"),U("change"))}),p.appendChild(O)),J(),{root:p,isMobile:u,getValue:()=>Ge(d),setValue:(_,H)=>{let G=Ln(_)??Je(_)??Je("#FFFFFF");G&&(typeof H=="number"&&(G.a=H),N(G,null))}}}function rd(e){try{return!!e.isSecureContext}catch{return!1}}function On(e){let t=e?.getRootNode?.();return t&&(t instanceof Document||t.host)?t:document}function rr(){let e=navigator.platform||"",t=navigator.userAgent||"";return/Mac|iPhone|iPad|iPod/i.test(e)||/Mac OS|iOS/i.test(t)}async function id(){try{let e=await navigator.permissions?.query?.({name:"clipboard-write"});return e?e.state==="granted"||e.state==="prompt":!0}catch{return!0}}function ad(e,t){let n=document.createElement("textarea");return n.value=e,n.setAttribute("readonly","true"),n.style.position="fixed",n.style.opacity="0",n.style.pointerEvents="none",n.style.top="0",t.appendChild?t.appendChild(n):document.body.appendChild(n),n}function sd(e){try{let t=window.getSelection?.();if(!t)return!1;let n=document.createRange();return n.selectNodeContents(e),t.removeAllRanges(),t.addRange(n),!0}catch{return!1}}async function ld(e){if(!("clipboard"in navigator))return{ok:!1,method:"clipboard-write"};if(!rd(A))return{ok:!1,method:"clipboard-write"};if(!await id())return{ok:!1,method:"clipboard-write"};try{return await navigator.clipboard.writeText(e),{ok:!0,method:"clipboard-write"}}catch{return{ok:!1,method:"clipboard-write"}}}function cd(e,t){try{let n=t||On(),o=ad(e,n);o.focus(),o.select(),o.setSelectionRange(0,o.value.length);let r=!1;try{r=document.execCommand("copy")}catch{r=!1}return o.remove(),{ok:r,method:"execCommand"}}catch{return{ok:!1,method:"execCommand"}}}function ud(e,t){if(!t)return{ok:!1,method:"selection"};let n=t.textContent??"",o=!1;if(n!==e)try{t.textContent=e,o=!0}catch{}let r=sd(t);o&&setTimeout(()=>{try{t.textContent=n}catch{}},80);let i=rr()?"\u2318C pour copier":"Ctrl+C pour copier";return{ok:r,method:"selection",hint:i}}async function dd(e,t={}){let n=(e??"").toString();if(!n.length)return{ok:!1,method:"noop"};let o=await ld(n);if(o.ok)return o;let r=t.injectionRoot||On(t.valueNode||void 0),i=cd(n,r);if(i.ok)return i;let a=ud(n,t.valueNode||null);if(a.ok)return a;if(!t.disablePromptFallback)try{return window.prompt(er()?"Copie manuelle (Discord bloque clipboard):":"Copie manuelle:",n),{ok:!0,method:"prompt"}}catch{}return{ok:!1,method:"noop"}}function ir(e,t,n={}){let o=r=>{if(n.showTip){n.showTip(r);return}try{e.setAttribute("aria-label",r);let i=document.createElement("div");i.textContent=r,i.style.position="absolute",i.style.top="-28px",i.style.right="0",i.style.padding="4px 8px",i.style.borderRadius="8px",i.style.fontSize="12px",i.style.background="color-mix(in oklab, var(--bg) 85%, transparent)",i.style.border="1px solid var(--border)",i.style.color="var(--fg)",i.style.pointerEvents="none",i.style.opacity="0",i.style.transition="opacity .12s";let a=On(e);a.appendChild?a.appendChild(i):document.body.appendChild(i);let s=e.getBoundingClientRect();i.style.left=`${s.right-8}px`,i.style.top=`${s.top-28}px`,requestAnimationFrame(()=>i.style.opacity="1"),setTimeout(()=>{i.style.opacity="0",setTimeout(()=>i.remove(),150)},1200)}catch{}};e.addEventListener("click",async r=>{r.stopPropagation();let i=(t()??"").toString(),a=await dd(i,{valueNode:n.valueNode??null,injectionRoot:n.injectionRoot??null,disablePromptFallback:n.disablePromptFallback??!1});n.onResult?.(a),a.ok?a.method==="clipboard-write"||a.method==="execCommand"||a.method==="prompt"?o("Copi\xE9"):a.method==="selection"&&o(a.hint||(rr()?"\u2318C pour copier":"Ctrl+C pour copier")):o("Impossible de copier")})}var Oe={light:{"--bg":"rgba(255,255,255,0.7)","--fg":"#0f172a","--muted":"rgba(15,23,42,0.06)","--soft":"rgba(15,23,42,0.04)","--accent":"#2563eb","--border":"rgba(15,23,42,0.12)","--shadow":"rgba(2,6,23,.2)","--tab-bg":"#ffffff","--tab-fg":"#0f172a","--pill-from":"#4f46e5","--pill-to":"#06b6d4"},dark:{"--bg":"rgba(10,12,18,0.6)","--fg":"#e5e7eb","--muted":"rgba(229,231,235,0.08)","--soft":"rgba(229,231,235,0.05)","--accent":"#60a5fa","--border":"rgba(148,163,184,0.2)","--shadow":"rgba(0,0,0,.45)","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#e5e7eb","--pill-from":"#6366f1","--pill-to":"#06b6d4"},sepia:{"--bg":"rgba(247,242,231,0.72)","--fg":"#3b2f2f","--muted":"rgba(59,47,47,0.06)","--soft":"rgba(59,47,47,0.04)","--accent":"#b07d62","--border":"rgba(59,47,47,0.14)","--shadow":"rgba(0,0,0,.18)","--tab-bg":"#fff","--tab-fg":"#3b2f2f","--pill-from":"#b07d62","--pill-to":"#d4a373"},forest:{"--bg":"rgba(14,24,18,0.62)","--fg":"#e7f5e9","--muted":"rgba(231,245,233,0.08)","--soft":"rgba(231,245,233,0.05)","--accent":"#34d399","--border":"rgba(231,245,233,0.16)","--shadow":"rgba(0,0,0,.5)","--tab-bg":"rgba(255,255,255,0.06)","--tab-fg":"#e7f5e9","--pill-from":"#10b981","--pill-to":"#84cc16"},violet:{"--bg":"rgba(23, 16, 42, 0.68)","--fg":"#f5f3ff","--muted":"rgba(245,243,255,0.08)","--soft":"rgba(245,243,255,0.05)","--accent":"#a855f7","--border":"rgba(216,180,254,0.22)","--shadow":"rgba(12,3,30,.55)","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#ede9fe","--pill-from":"#a855f7","--pill-to":"#f472b6"},ocean:{"--bg":"rgba(10, 34, 46, 0.66)","--fg":"#e0f7ff","--muted":"rgba(224,247,255,0.07)","--soft":"rgba(224,247,255,0.05)","--accent":"#38bdf8","--border":"rgba(125, 211, 252, 0.22)","--shadow":"rgba(0, 16, 32, .52)","--tab-bg":"rgba(56,189,248,0.14)","--tab-fg":"#e0f7ff","--pill-from":"#0ea5e9","--pill-to":"#14b8a6"},ember:{"--bg":"rgba(34,18,10,0.64)","--fg":"#fff7ed","--muted":"rgba(255,247,237,0.08)","--soft":"rgba(255,247,237,0.05)","--accent":"#f97316","--border":"rgba(255, 159, 92, 0.24)","--shadow":"rgba(16,6,2,.52)","--tab-bg":"rgba(255,247,237,0.09)","--tab-fg":"#fff7ed","--pill-from":"#fb923c","--pill-to":"#facc15"}};function Hn(e){let{host:t,themes:n,initialTheme:o,onThemeChange:r}=e,i=o,a=null,s=!1;function l(u){let d=n[u]||n[i]||{};s&&t.classList.add("theme-anim");for(let[p,m]of Object.entries(d))t.style.setProperty(p,m);s?(a!==null&&clearTimeout(a),a=A.setTimeout(()=>{t.classList.remove("theme-anim"),a=null},320)):s=!0,i=u,r?.(u)}function c(){return i}return l(o),{applyTheme:l,getCurrentTheme:c}}var $t={ui:{expandedCards:{style:!1,system:!1}}};async function ar(){let e=await pt("tab-settings",{version:1,defaults:$t,sanitize:r=>({ui:{expandedCards:Nt($t.ui.expandedCards,r.ui?.expandedCards)}})});function t(r){let i=e.get();e.update({ui:{...i.ui,...r,expandedCards:Nt(i.ui.expandedCards,r.expandedCards)}})}function n(r,i){let a=e.get();e.update({ui:{...a.ui,expandedCards:{...a.ui.expandedCards,[r]:!!i}}})}function o(r){let i=e.get();n(r,!i.ui.expandedCards[r])}return{get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:o}}function sr(e){return e.replace(/[_-]+/g," ").replace(/^\w/,t=>t.toUpperCase())}function pd(){return Object.keys(Oe).map(e=>({value:e,label:sr(e)}))}var md=["--bg","--fg","--accent","--muted","--soft","--border","--shadow","--tab-bg","--tab-fg","--pill-from","--pill-to"];function gd(e){return sr(e.replace(/^--/,""))}function fd(e){return e.alpha<1?e.rgba:e.hex}var Ut=class extends De{constructor(n){super({id:"tab-settings",label:"Settings"});this.deps=n}async build(n){let o=this.createGrid("12px");o.id="settings",n.appendChild(o);let r;try{r=await ar()}catch{r={get:()=>$t,set:()=>{},save:()=>{},setUI:()=>{},setCardExpanded:()=>{},toggleCard:()=>{}}}let i=r.get(),a=Object.keys(Oe),s=this.deps.getCurrentTheme?.()??this.deps.initialTheme,l=a.includes(s)?s:a[0]??"dark",c=l,u=Vt({text:"Theme",tone:"muted",size:"lg"}),d=qe({options:pd(),value:l,onChange:f=>{c=f,this.deps.applyTheme(f),this.renderThemePickers(f,p,c)}}),p=w("div",{className:"settings-theme-grid"}),m=Le({title:"Style",padding:"lg",expandable:!0,defaultExpanded:!!i.ui.expandedCards.style,onExpandChange:f=>r.setCardExpanded("style",f)},w("div",{className:"kv settings-theme-row"},u.root,d.root),p);this.renderThemePickers(l,p,c);let g=this.createEnvCard({defaultExpanded:!!i.ui.expandedCards.system,onExpandChange:f=>r.setCardExpanded("system",f)});o.appendChild(m),o.appendChild(g)}renderThemePickers(n,o,r){let i=Oe[n];if(o.replaceChildren(),!!i)for(let a of md){let s=i[a];if(s==null)continue;let l=or({label:gd(a),value:s,defaultExpanded:!1,onInput:c=>this.updateThemeVar(n,a,c,r),onChange:c=>this.updateThemeVar(n,a,c,r)});o.appendChild(l.root)}}updateThemeVar(n,o,r,i){let a=Oe[n];a&&(a[o]=fd(r),i===n&&this.deps.applyTheme(n))}createEnvCard(n){let o=n?.defaultExpanded??!1,r=n?.onExpandChange,i=(h,S)=>{let T=w("div",{className:"kv kv--inline-mobile"}),x=w("label",{},h),v=w("div",{className:"ro"});return typeof S=="string"?v.textContent=S:v.append(S),T.append(x,v),T},a=w("code",{},"\u2014"),s=w("span",{},"\u2014"),l=w("span",{},"\u2014"),c=w("span",{},"\u2014"),u=w("span",{},"\u2014"),d=w("span",{},"\u2014"),p=()=>{let h=be();l.textContent=h.surface,c.textContent=h.platform,u.textContent=h.browser??"Unknown",d.textContent=h.os??"Unknown",a.textContent=h.host,s.textContent=h.isInIframe?"Yes":"No"},m=Re({label:"Copy JSON",variant:"primary",size:"sm"});ir(m,()=>{let h=be();return JSON.stringify(h,null,2)});let g=w("div",{style:"width:100%;display:flex;justify-content:center;"},m),f=Le({title:"System",variant:"soft",padding:"lg",footer:g,expandable:!0,defaultExpanded:o,onExpandChange:r},i("Surface",l),i("Platform",c),i("Browser",u),i("OS",d),i("Host",a),i("Iframe",s)),b=()=>{document.hidden||p()};return document.addEventListener("visibilitychange",b),p(),this.addCleanup(()=>document.removeEventListener("visibilitychange",b)),f}};function ht(e){return e<10?`0${e}`:String(e)}function se(e){let t=/^(\d{1,2}):(\d{2})$/.exec((e||"").trim());if(!t)return 0;let n=Math.max(0,Math.min(23,parseInt(t[1],10)||0)),o=Math.max(0,Math.min(59,parseInt(t[2],10)||0));return n*60+o}function _n(e){let t=Math.max(0,Math.min(1439,e|0)),n=Math.floor(t/60),o=t%60;return`${ht(n)}:${ht(o)}`}function Te(e,t){let n=se(e),o=Math.max(0,Math.min(1439,n)),r=Math.floor(o/t)*t;return _n(r)}function bd(e){let t=Math.floor(e/60),n=e%60,o=t>=12;return{h12:t%12||12,m:n,pm:o}}function hd(e,t,n){return(e%12+(n?12:0))*60+t}function yd(e){return e.platform==="mobile"||e.os==="ios"||e.os==="android"}function lr(e={}){let{id:t,start:n="08:00",end:o="23:00",stepMinutes:r=5,disabled:i=!1,allowOvernight:a=!0,labels:s={from:"From",to:"To"},picker:l="auto",format:c="auto",useNativeOn:u,onChange:d}=e,p={start:Te(n,r),end:Te(o,r)},m=w("div",{className:"time-range",id:t});m.classList.add("time-range--stacked");let g=be();if(l==="native"||l==="auto"&&(u?.(g)??yd(g)))return b();return h();function b(){let x=w("div",{className:"time-range-field",role:"group"}),v=w("span",{className:"time-range-label"},s.from||"From"),k=w("input",{className:"input time-range-input",type:"time",step:String(r*60),value:p.start}),I=w("div",{className:"time-range-field",role:"group"}),E=w("span",{className:"time-range-label"},s.to||"To"),L=w("input",{className:"input time-range-input",type:"time",step:String(r*60),value:p.end});x.append(v,k),I.append(E,L),m.append(x,I);function O(){k.value=p.start,L.value=p.end}function M(){d?.(J())}function U(_){let H=_.target,G=H===k,R=Te(H.value||(G?p.start:p.end),r);G?(p.start=R,!a&&se(p.end)<se(p.start)&&(p.end=p.start)):(p.end=R,!a&&se(p.end)<se(p.start)&&(p.start=p.end)),O(),M()}k.addEventListener("change",U),k.addEventListener("blur",U),L.addEventListener("change",U),L.addEventListener("blur",U),i&&N(!0);function J(){return{...p}}function q(_){if(_.start&&(p.start=Te(_.start,r)),_.end&&(p.end=Te(_.end,r)),!a){let H=se(p.start);se(p.end)<H&&(p.end=p.start)}O(),M()}function N(_){k.disabled=_,L.disabled=_,m.classList.toggle("is-disabled",!!_)}function B(){k.removeEventListener("change",U),k.removeEventListener("blur",U),L.removeEventListener("change",U),L.removeEventListener("blur",U),m.replaceChildren()}return{root:m,getValue:J,setValue:q,setDisabled:N,destroy:B}}function h(){let x=w("label",{className:"time-range-field"}),v=w("span",{className:"time-range-label"},s.from||"From"),k=w("label",{className:"time-range-field"}),I=w("span",{className:"time-range-label"},s.to||"To"),E=c==="12h"||c==="auto"&&T(),L=S(p.start,E),O=S(p.end,E);x.append(v,L.container),k.append(I,O.container),m.append(x,k),i&&q(!0),J(),L.onAnyChange(()=>{p.start=L.to24h(r),!a&&se(p.end)<se(p.start)&&(p.end=p.start,O.setFrom24h(p.end)),d?.(M())}),O.onAnyChange(()=>{p.end=O.to24h(r),!a&&se(p.end)<se(p.start)&&(p.start=p.end,L.setFrom24h(p.start)),d?.(M())});function M(){return{...p}}function U(B){if(B.start&&(p.start=Te(B.start,r)),B.end&&(p.end=Te(B.end,r)),!a){let _=se(p.start);se(p.end)<_&&(p.end=p.start)}J(),d?.(M())}function J(){L.setFrom24h(p.start),O.setFrom24h(p.end)}function q(B){L.setDisabled(B),O.setDisabled(B),m.classList.toggle("is-disabled",!!B)}function N(){L.destroy(),O.destroy(),m.replaceChildren()}return{root:m,getValue:M,setValue:U,setDisabled:q,destroy:N}}function S(x,v){let k=w("div",{className:"time-picker"}),I=(C,D=2)=>{C.classList.add("time-picker-compact"),C.style.setProperty("--min-ch",String(D))},E=v?Array.from({length:12},(C,D)=>{let W=D+1;return{value:String(W),label:ht(W)}}):Array.from({length:24},(C,D)=>({value:String(D),label:ht(D)})),L=qe({size:"sm",options:E,placeholder:"HH",onChange:()=>B()});I(L.root,2);let O=Math.max(1,Math.min(30,Math.floor(e.stepMinutes??5))),M=Array.from({length:Math.floor(60/O)},(C,D)=>{let W=D*O;return{value:String(W),label:ht(W)}}),U=qe({size:"sm",options:M,placeholder:"MM",onChange:()=>B()});I(U.root,2);let J=v?qe({size:"sm",options:[{value:"am",label:"AM"},{value:"pm",label:"PM"}],value:"am",onChange:()=>B()}):null;J&&I(J.root,3),k.append(L.root,U.root,...J?[J.root]:[]);let q=null;function N(C){q=C}function B(){q?.()}function _(C){let D=se(C);if(v){let W=bd(D);L.setValue(String(W.h12),{notify:!1}),U.setValue(String(Math.floor(W.m/O)*O),{notify:!1}),J.setValue(W.pm?"pm":"am",{notify:!1})}else{let W=Math.floor(D/60),F=D%60;L.setValue(String(W),{notify:!1}),U.setValue(String(Math.floor(F/O)*O),{notify:!1})}}function H(C){let D=parseInt(U.getValue()||"0",10)||0;if(v){let W=parseInt(L.getValue()||"12",10)||12,F=(J?.getValue()||"am")==="pm",oe=hd(W,D,F);return Te(_n(oe),C)}else{let F=(parseInt(L.getValue()||"0",10)||0)*60+D;return Te(_n(F),C)}}function G(C){L.setDisabled(C),U.setDisabled(C),J?.setDisabled(C),k.classList.toggle("is-disabled",!!C)}function R(){k.replaceChildren()}return{container:k,onAnyChange:N,setFrom24h:_,to24h:H,setDisabled:G,destroy:R}}function T(){try{let v=new Intl.DateTimeFormat(void 0,{hour:"numeric"}).format(new Date(2020,1,1,13));return/AM|PM|am|pm/.test(v)}catch{return!1}}}function ur(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function xd(e){let t=ur(e);t=t.replace(/\/\*[\s\S]*?\*\//g,r=>`<span class="tok tok-comm">${r}</span>`),t=t.replace(/(^|\s)(\/\/.*)$/gm,(r,i,a)=>`${i}<span class="tok tok-comm">${a}</span>`),t=t.replace(/`[^`\\]*(?:\\.[^`\\]*)*`/g,r=>`<span class="tok tok-str">${r}</span>`),t=t.replace(/'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/g,r=>`<span class="tok tok-str">${r}</span>`),t=t.replace(/\b(?:0[xX][0-9a-fA-F]+|0[bB][01]+|0[oO][0-7]+|\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?(?:[eE][+-]?\d+)?)\b/g,r=>`<span class="tok tok-num">${r}</span>`);let n=["break","case","catch","class","const","continue","debugger","default","delete","do","else","export","extends","finally","for","function","if","import","in","instanceof","let","new","return","super","switch","this","throw","try","typeof","var","void","while","with","yield","await","enum","implements","interface","package","private","protected","public","static","as","from","of"],o=new RegExp(`\\b(?:${n.join("|")})\\b`,"g");return t=t.replace(o,r=>`<span class="tok tok-kw">${r}</span>`),t=t.replace(/\b(?:true|false|null|undefined|NaN|Infinity)\b/g,r=>`<span class="tok tok-lit">${r}</span>`),t}function cr(e){if(!e)return new Date().toLocaleTimeString();let t=e instanceof Date?e:new Date(e);if(isNaN(t.getTime()))return String(e);let n=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0"),r=String(t.getSeconds()).padStart(2,"0");return`${n}:${o}:${r}`}function dr(e={}){let{id:t,className:n,height:o,maxLines:r=500,wrap:i=!1,mode:a="plain",showTimestamps:s=!0,autoScroll:l=!0}=e,c=w("div",{className:"log",id:t});n&&c.classList.add(...n.split(" ").filter(Boolean)),i&&c.classList.add("log--wrap");let u=w("div",{className:"log-viewport"}),d=w("div",{className:"log-lines"});u.appendChild(d),c.appendChild(u),o!=null&&(c.style.blockSize=typeof o=="number"?`${o}px`:String(o));let p=a,m=r,g=new Map;function f(N){return p==="js"?xd(N):ur(N)}function b(N){return N?g.get(N)?.body??d:d}function h(N){let B=typeof N=="string"?{text:N}:N||{text:""},_=b(B.groupKey);if(B.key){let R=Array.from(_.querySelectorAll(`.log-line[data-key="${B.key}"]`)).pop();if(R){B.level&&(R.classList.remove("log-level--debug","log-level--info","log-level--warn","log-level--error"),R.classList.add(`log-level--${B.level}`));let C=R.querySelector(".log-time");s&&C&&(C.textContent=cr(B.time));let D=R.querySelector(".log-text");D&&(D.innerHTML=f(B.text)),l&&I();return}}let H=document.createElement("div");if(H.className="log-line",B.level&&H.classList.add(`log-level--${B.level}`),B.key&&(H.dataset.key=B.key),s){let R=document.createElement("span");R.className="log-time",R.textContent=cr(B.time),H.appendChild(R)}let G=document.createElement("span");G.className="log-text",G.innerHTML=f(B.text),H.appendChild(G),_.appendChild(H),O(),l&&I()}function S(N){for(let B of N)h(B)}function T(){d.replaceChildren(),g.clear()}function x(N){p=N,I()}function v(N){c.classList.toggle("log--wrap",!!N),I()}function k(N){m=Math.max(1,Math.floor(N||1))}function I(){requestAnimationFrame(()=>{u.scrollTop=u.scrollHeight})}function E(){let N=0;for(let B=0;B<d.children.length;B+=1){let _=d.children[B];(_.classList.contains("log-line")||_.classList.contains("log-group"))&&(N+=1)}return N}function L(){let N=d.firstElementChild;if(!N)return!1;if(N.classList.contains("log-group")){let B=N.dataset.groupKey;B&&g.delete(B)}return N.remove(),!0}function O(){let N=E();for(;N>m&&L();)N--}function M(N,B){let _=B?.key||`g-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,6)}`;if(g.has(_))return _;let H=document.createElement("div");H.className="log-group",H.dataset.groupKey=_;let G=document.createElement("div");G.className="log-group-header",G.textContent=N;let R=document.createElement("div");R.className="log-group-body",H.append(G,R),d.appendChild(H),g.set(_,{root:H,header:G,body:R});let C=D=>{H.classList.toggle("is-collapsed",!!D)};return B?.collapsed&&C(!0),G.addEventListener("click",()=>C(!H.classList.contains("is-collapsed"))),l&&I(),_}function U(N){g.get(N)}function J(N,B){let _=g.get(N);_&&(B==null?_.root.classList.toggle("is-collapsed"):_.root.classList.toggle("is-collapsed",!!B))}let q=c;return q.add=h,q.addMany=S,q.clear=T,q.setMode=x,q.setWrap=v,q.setMaxLines=k,q.scrollToEnd=I,q.beginGroup=M,q.endGroup=U,q.toggleGroup=J,q}var le={nativeCtor:null,captured:[],latestOpen:null},pr=Symbol.for("ariesmod.ws.capture.wrapped"),mr=Symbol.for("ariesmod.ws.capture.native"),gr=1;function Dn(e){return!!e&&e.readyState===gr}function vd(){if(Dn(le.latestOpen))return le.latestOpen;for(let e=le.captured.length-1;e>=0;e--){let t=le.captured[e];if(Dn(t))return t}return null}function wd(e,t){le.captured.push(e),le.captured.length>25&&le.captured.splice(0,le.captured.length-25);let n=()=>{le.latestOpen=e,t&&console.log("[WS] captured socket opened",e.url)};e.addEventListener("open",n),e.addEventListener("close",()=>{le.latestOpen===e&&(le.latestOpen=null),t&&console.log("[WS] captured socket closed",e.url)}),e.readyState===gr&&n()}function fr(e=A,t={}){let n=!!t.debug,o=e?.WebSocket;if(typeof o!="function")return()=>{};if(o[pr])return le.nativeCtor=o[mr]??le.nativeCtor??null,()=>{};let r=o;le.nativeCtor=r;function i(a,s){let l=s!==void 0?new r(a,s):new r(a);try{wd(l,n)}catch{}return l}try{i.prototype=r.prototype}catch{}try{Object.setPrototypeOf(i,r)}catch{}try{i.CONNECTING=r.CONNECTING,i.OPEN=r.OPEN,i.CLOSING=r.CLOSING,i.CLOSED=r.CLOSED}catch{}i[pr]=!0,i[mr]=r;try{e.WebSocket=i,n&&console.log("[WS] WebSocket capture installed")}catch{return()=>{}}return()=>{try{e.WebSocket===i&&(e.WebSocket=r)}catch{}}}function Sd(e=A){let t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function yt(e=A){let t=vd();if(t)return{ws:t,source:"captured"};let n=Sd(e);return n?{ws:n,source:"roomConnection"}:{ws:null,source:null}}function Kt(e,t={}){let n=t.pageWindow??A,o=t.intervalMs??500,r=!!t.debug,i=null,a=null,s=()=>{let c=yt(n);(c.ws!==i||c.source!==a)&&(i=c.ws,a=c.source,r&&console.log("[WS] best socket changed:",c.source,c.ws),e(c))};s();let l=setInterval(s,o);return()=>clearInterval(l)}function kd(e){if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return null}}function Td(e,t=A){let n=t?.MagicCircle_RoomConnection;if(n&&typeof n.sendMessage=="function")try{return Array.isArray(e)?n.sendMessage(...e):n.sendMessage(e),{ok:!0}}catch(i){return{ok:!1,reason:"error",error:i}}let{ws:o}=yt(t);if(!o)return{ok:!1,reason:"no-ws"};if(!Dn(o))return{ok:!1,reason:"not-open"};let r=kd(e);if(r==null)return{ok:!1,reason:"error",error:new Error("Cannot stringify message")};try{return o.send(r),{ok:!0}}catch(i){return{ok:!1,reason:"error",error:i}}}function br(e,t={},n=A){return Td({type:e,...t},n)}var ve={Welcome:"Welcome",PartialState:"PartialState",ServerErrorMessage:"ServerErrorMessage",Config:"Config",InappropriateContentRejected:"InappropriateContentRejected",Emote:"Emote",CurrencyTransaction:"CurrencyTransaction",Pong:"Pong"},P={Chat:"Chat",Emote:"Emote",Wish:"Wish",KickPlayer:"KickPlayer",SetPlayerData:"SetPlayerData",UsurpHost:"UsurpHost",Dev:"Dev",SetSelectedGame:"SetSelectedGame",VoteForGame:"VoteForGame",RequestGame:"RequestGame",RestartGame:"RestartGame",Ping:"Ping",PlayerPosition:"PlayerPosition",Teleport:"Teleport",CheckWeatherStatus:"CheckWeatherStatus",MoveInventoryItem:"MoveInventoryItem",DropObject:"DropObject",PickupObject:"PickupObject",ToggleFavoriteItem:"ToggleFavoriteItem",PutItemInStorage:"PutItemInStorage",RetrieveItemFromStorage:"RetrieveItemFromStorage",MoveStorageItem:"MoveStorageItem",LogItems:"LogItems",PlantSeed:"PlantSeed",WaterPlant:"WaterPlant",HarvestCrop:"HarvestCrop",SellAllCrops:"SellAllCrops",PurchaseSeed:"PurchaseSeed",PurchaseEgg:"PurchaseEgg",PurchaseTool:"PurchaseTool",PurchaseDecor:"PurchaseDecor",PlantEgg:"PlantEgg",HatchEgg:"HatchEgg",PlantGardenPlant:"PlantGardenPlant",PotPlant:"PotPlant",MutationPotion:"MutationPotion",PickupDecor:"PickupDecor",PlaceDecor:"PlaceDecor",RemoveGardenObject:"RemoveGardenObject",PlacePet:"PlacePet",FeedPet:"FeedPet",PetPositions:"PetPositions",SwapPet:"SwapPet",StorePet:"StorePet",NamePet:"NamePet",SellPet:"SellPet",ReportSpeakingStart:"ReportSpeakingStart"};var xb=new Set(Object.values(ve)),vb=new Set(Object.values(P));function $(e,t={},n=A){return br(e,t,n)}function qt(e,t=A){return $(P.Chat,{scopePath:["Room"],message:e},t)}function hr(e,t=A){return $(P.Emote,{scopePath:["Room"],emoteType:e},t)}function yr(e,t=A){return $(P.Wish,{wish:e},t)}function xr(e,t=A){return $(P.KickPlayer,{scopePath:["Room"],playerId:e},t)}function vr(e,t=A){return $(P.SetPlayerData,{scopePath:["Room"],data:e},t)}function wr(e=A){return $(P.UsurpHost,{},e)}function Sr(e=A){return $(P.ReportSpeakingStart,{},e)}function kr(e,t=A){return $(P.SetSelectedGame,{scopePath:["Room"],gameId:e},t)}function Tr(e,t=A){return $(P.VoteForGame,{scopePath:["Room"],gameId:e},t)}function Ar(e,t=A){return $(P.RequestGame,{scopePath:["Room"],gameId:e},t)}function Pr(e=A){return $(P.RestartGame,{scopePath:["Room"]},e)}function Cr(e,t=A){return $(P.Ping,{id:e},t)}function Gn(e,t,n=A){return $(P.PlayerPosition,{x:e,y:t},n)}var Mr=Gn;function Ir(e,t,n=A){return $(P.Teleport,{x:e,y:t},n)}function Er(e=A){return $(P.CheckWeatherStatus,{},e)}function Lr(e,t,n=A){return $(P.MoveInventoryItem,{fromIndex:e,toIndex:t},n)}function Rr(e,t=A){return $(P.DropObject,{slotIndex:e},t)}function Or(e,t=A){return $(P.PickupObject,{objectId:e},t)}function Hr(e,t,n=A){return $(P.ToggleFavoriteItem,{itemId:e,favorite:t},n)}function _r(e,t=A){return $(P.PutItemInStorage,{itemId:e},t)}function Dr(e,t=A){return $(P.RetrieveItemFromStorage,{itemId:e},t)}function Gr(e,t,n=A){return $(P.MoveStorageItem,{fromIndex:e,toIndex:t},n)}function Nr(e=A){return $(P.LogItems,{},e)}function Wr(e,t,n,o=A){return $(P.PlantSeed,{seedId:e,x:t,y:n},o)}function Br(e,t=A){return $(P.WaterPlant,{plantId:e},t)}function jr(e,t=A){return $(P.HarvestCrop,{cropId:e},t)}function Vr(e=A){return $(P.SellAllCrops,{},e)}function Fr(e,t=A){return $(P.PurchaseDecor,{decorId:e},t)}function zr(e,t=A){return $(P.PurchaseEgg,{eggId:e},t)}function $r(e,t=A){return $(P.PurchaseTool,{toolId:e},t)}function Ur(e,t=A){return $(P.PurchaseSeed,{seedId:e},t)}function Kr(e,t,n,o=A){return $(P.PlantEgg,{eggId:e,x:t,y:n},o)}function qr(e,t=A){return $(P.HatchEgg,{eggId:e},t)}function Jr(e,t,n,o=A){return $(P.PlantGardenPlant,{plantId:e,x:t,y:n},o)}function Xr(e,t,n=A){return $(P.PotPlant,{plantId:e,potId:t},n)}function Yr(e,t,n=A){return $(P.MutationPotion,{potionId:e,targetId:t},n)}function Qr(e,t=A){return $(P.PickupDecor,{decorInstanceId:e},t)}function Zr(e,t,n,o=A){return $(P.PlaceDecor,{decorId:e,x:t,y:n},o)}function ei(e,t=A){return $(P.RemoveGardenObject,{objectId:e},t)}function ti(e,t,n,o=A){return $(P.PlacePet,{petId:e,x:t,y:n},o)}function ni(e,t,n=A){return $(P.FeedPet,{petId:e,foodItemId:t},n)}function oi(e,t=A){return $(P.PetPositions,{positions:e},t)}function ri(e,t,n=A){return $(P.SwapPet,{petIdA:e,petIdB:t},n)}function ii(e,t=A){return $(P.StorePet,{petId:e},t)}function ai(e,t,n=A){return $(P.NamePet,{petId:e,name:t},n)}function si(e,t=A){return $(P.SellPet,{petId:e},t)}var Ne={timeRange:{start:"09:00",end:"18:00"},logSettings:{mode:"js",wrap:!1}};async function ci(){return pt("tab-test",{version:1,defaults:Ne,sanitize:e=>({timeRange:{start:e.timeRange?.start||Ne.timeRange.start,end:e.timeRange?.end||Ne.timeRange.end},logSettings:{mode:e.logSettings?.mode||Ne.logSettings.mode,wrap:e.logSettings?.wrap??Ne.logSettings.wrap}})})}var Jt=class extends De{constructor(){super({id:"tab-test",label:"Test"})}async build(t){let n=this.createContainer("test-section");t.appendChild(n);let o;try{o=await ci()}catch{o={get:()=>Ne,set:()=>{},update:()=>{},save:()=>{}}}let r=o.get(),i=Vt({text:"Plage horaire",hint:"Heures actives du mode 'Plage horaire'.",icon:"\u23F0"}),a=lr({start:r.timeRange.start,end:r.timeRange.end,stepMinutes:5,allowOvernight:!0,picker:"auto",format:"12h",onChange:b=>{o.update({timeRange:{start:b.start,end:b.end}})}}),s=w("div",null,i.root,a.root),l=dr({height:220,mode:r.logSettings.mode,maxLines:1e3});r.logSettings.wrap&&l.setWrap(!0),l.add({level:"info",text:"Log initialise"}),l.add({level:"debug",text:"const x = 42; // demo"}),l.add({level:"warn",text:"Requete lente: fetch('/api') > 1200ms"}),l.add({level:"error",text:"new Error('Boom')"});let c=Re({label:"Appliquer",variant:"primary",onClick:()=>{let b=a.getValue();l.add({level:"info",text:`[Apply] ${b.start} -> ${b.end}`})}}),u=Le({title:"Parametres - Plage horaire",subtitle:"Choisis la fenetre d'activite",variant:"soft",padding:"lg",footer:En(c)},s),d=Re({label:"Clear",onClick:()=>qt("test")}),p=Re({label:r.logSettings.wrap?"Unwrap":"Wrap",onClick:()=>{let b=!l.classList.contains("log--wrap");l.setWrap(b),p.setLabel(b?"Unwrap":"Wrap"),o.update({logSettings:{...o.get().logSettings,wrap:b}})}}),m=Re({label:`Mode: ${r.logSettings.mode}`,onClick:()=>{let h=o.get().logSettings.mode==="js"?"plain":"js";l.setMode(h),m.setLabel(`Mode: ${h}`),o.update({logSettings:{...o.get().logSettings,mode:h}})}}),g=Re({label:"Add line",onClick:()=>l.add({level:"debug",text:"function tick(){ return Date.now(); } // sample"})}),f=Le({title:"Logs",variant:"default",padding:"lg"},l,En(d,p,m,g));n.appendChild(u),n.appendChild(f)}};function Nn(e){return[new Ut(e),new Jt]}function Wn(e){let{shadow:t,initialOpen:n}=e,o=w("div",{className:"gemini-panel",id:"panel",ariaHidden:String(!n)}),r=w("div",{className:"gemini-tabbar"}),i=w("div",{className:"gemini-content",id:"content"}),a=w("div",{className:"gemini-resizer",title:"Resize"}),s=w("button",{className:"gemini-close",title:"Fermer",ariaLabel:"Fermer"},"\u2715");o.append(r,i,a);let l=w("div",{className:"gemini-wrapper"},o);return t.append(l),{panel:o,tabbar:r,content:i,resizer:a,closeButton:s,wrapper:l}}function Bn(e){let{resizer:t,host:n,panel:o,shadow:r,onWidthChange:i,initialWidth:a,minWidth:s,maxWidth:l}=e,c=s,u=l;function d(){let v=be(),k=Math.round(A.visualViewport?.width??A.innerWidth??0);if(v.platform==="mobile"||v.os==="ios"||v.os==="android"){let I=getComputedStyle(r.host),E=parseFloat(I.getPropertyValue("--inset-l"))||0,L=parseFloat(I.getPropertyValue("--inset-r"))||0,O=Math.max(280,k-Math.round(E+L)),M=Math.min(420,Math.max(300,Math.floor(k*.66))),U=O;c=Math.min(M,O),u=U}else c=s,u=l;return{min:c,max:u}}function p(v){return Math.max(c,Math.min(u,Number(v)||a))}function m(v){let k=p(v);n.style.setProperty("--w",`${k}px`),i(k)}d();let g=be(),f=!(g.platform==="mobile"||g.os==="ios"||g.os==="android"),b=!1,h=v=>{if(!b)return;v.preventDefault();let k=Math.round(A.innerWidth-v.clientX);m(k)},S=()=>{b&&(b=!1,document.body.style.cursor="",A.removeEventListener("mousemove",h),A.removeEventListener("mouseup",S))},T=v=>{f&&(v.preventDefault(),b=!0,document.body.style.cursor="ew-resize",A.addEventListener("mousemove",h),A.addEventListener("mouseup",S))};t.addEventListener("mousedown",T);function x(){t.removeEventListener("mousedown",T),A.removeEventListener("mousemove",h),A.removeEventListener("mouseup",S)}return{calculateResponsiveBounds:d,constrainWidthToLimits:p,setHudWidth:m,destroy:x}}function jn(e){let{panel:t,onToggle:n,onClose:o,toggleCombo:r=l=>l.ctrlKey&&l.shiftKey&&l.key.toLowerCase()==="u",closeOnEscape:i=!0}=e;function a(l){let c=t.classList.contains("open");if(i&&l.key==="Escape"&&c){o();return}r(l)&&(l.preventDefault(),l.stopPropagation(),n())}document.addEventListener("keydown",a,{capture:!0});function s(){document.removeEventListener("keydown",a,{capture:!0})}return{destroy:s}}var ui=`
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
`;var Vn=`
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
`;var Fn=`
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
`;var zn=`
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
`;function ee(e,t,n){if(e.querySelector(`style[data-style-id="${n}"]`))return;let o=document.createElement("style");o.setAttribute("data-style-id",n),o.textContent=t,e.appendChild(o)}var di=`
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
  
`;var pi=`
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
`;var mi=`
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
`;var gi=`
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
`;var fi=`
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
`;var bi=`
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
`;var hi=`
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
`;var yi=`
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
`;var xi=`
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
`;var vi=`
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
`;var wi=`
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
`;var Si=`
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
`;var ki=`
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
`;var Ti=`
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
`;var Ai=`
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
`;var Pi=`
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
`;var Ci=`
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
`;var Ad={all:"initial",position:"fixed",top:"0",right:"0",zIndex:"2147483647",pointerEvents:"auto",fontFamily:'system-ui, -apple-system, "Segoe UI", Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',fontSize:"13px",lineHeight:"1.35"};function Pd(e="gemini-root"){let t=document.createElement("div");t.id=e,Object.assign(t.style,Ad),(document.body||document.documentElement).appendChild(t);let n=t.attachShadow({mode:"open"});return{host:t,shadow:n}}function $n(e){let{hostId:t="gemini-hud-root",initialWidth:n,initialOpen:o,onWidthChange:r,onOpenChange:i,themes:a,initialTheme:s,onThemeChange:l,buildSections:c,initialTab:u,onTabChange:d,toggleCombo:p=G=>G.ctrlKey&&G.shiftKey&&G.key.toLowerCase()==="u",closeOnEscape:m=!0,minWidth:g=420,maxWidth:f=720}=e,{host:b,shadow:h}=Pd(t);ee(h,Vn,"variables"),ee(h,Fn,"primitives"),ee(h,zn,"utilities"),ee(h,ui,"hud"),ee(h,di,"card"),ee(h,pi,"badge"),ee(h,mi,"button"),ee(h,gi,"input"),ee(h,fi,"label"),ee(h,bi,"navTabs"),ee(h,hi,"searchBar"),ee(h,yi,"select"),ee(h,xi,"switch"),ee(h,vi,"table"),ee(h,wi,"timeRangePicker"),ee(h,Si,"tooltip"),ee(h,ki,"slider"),ee(h,Ti,"reorderableList"),ee(h,Ai,"colorPicker"),ee(h,Pi,"log"),ee(h,Ci,"settings");let{panel:S,tabbar:T,content:x,resizer:v,closeButton:k,wrapper:I}=Wn({shadow:h,initialOpen:o});function E(G){S.dispatchEvent(new CustomEvent("gemini:hud-open-change",{detail:{isOpen:G},bubbles:!0})),i?.(G)}function L(G){let R=S.classList.contains("open");S.classList.toggle("open",G),S.setAttribute("aria-hidden",G?"false":"true"),G!==R&&E(G)}L(o),k.addEventListener("click",G=>{G.preventDefault(),G.stopPropagation(),L(!1)});let O=Hn({host:b,themes:a,initialTheme:s,onThemeChange:l}),M=Bn({resizer:v,host:b,panel:S,shadow:h,onWidthChange:r||(()=>{}),initialWidth:n,minWidth:g,maxWidth:f});M.setHudWidth(n);let U=c({applyTheme:O.applyTheme,initialTheme:s,getCurrentTheme:O.getCurrentTheme,setHUDWidth:M.setHudWidth,setHUDOpen:L}),J=new ut(U,x,{applyTheme:O.applyTheme,getCurrentTheme:O.getCurrentTheme}),q=U.map(G=>({id:G.id,label:G.label})),N=qo(q,u||q[0]?.id||"",G=>{J.activate(G),d?.(G)});N.root.style.flex="1 1 auto",N.root.style.minWidth="0",T.append(N.root,k),J.activate(u||q[0]?.id||"");let B=jn({panel:S,onToggle:()=>L(!S.classList.contains("open")),onClose:()=>L(!1),toggleCombo:p,closeOnEscape:m}),_=()=>{N.recalc();let G=parseInt(getComputedStyle(b).getPropertyValue("--w"))||n;M.calculateResponsiveBounds(),M.setHudWidth(G)};A.addEventListener("resize",_);function H(){B.destroy(),M.destroy(),A.removeEventListener("resize",_)}return{host:b,shadow:h,wrapper:I,panel:S,content:x,setOpen:L,setWidth:M.setHudWidth,sections:U,manager:J,nav:N,destroy:H}}var Xe={isOpen:"gemini.hud.isOpen",width:"gemini.hud.width",theme:"gemini.hud.theme",activeTab:"gemini.hud.activeTab"},xt={isOpen:!1,width:480,theme:"dark",activeTab:"tab-settings"};function Un(){return{isOpen:Ee(Xe.isOpen,xt.isOpen),width:Ee(Xe.width,xt.width),theme:Ee(Xe.theme,xt.theme),activeTab:Ee(Xe.activeTab,xt.activeTab)}}function Ye(e,t){dt(Xe[e],t)}var Cd="https://i.imgur.com/IMkhMur.png",Md="Stats";function Xt(e){let t=e.iconUrl||Cd,n=e.ariaLabel||"Open MGH",o=null,r=null,i=null,a=!1,s=null,l=null,c=["Chat","Leaderboard","Stats","Open Activity Log"],u=T=>{try{return typeof CSS<"u"&&CSS&&typeof CSS.escape=="function"?CSS.escape(T):T.replace(/"/g,'\\"')}catch{return T}};function d(){let T=document.querySelector(c.map(v=>`button[aria-label="${u(v)}"]`).join(","));if(!T)return null;let x=T.parentElement;for(;x&&x!==document.body;){if(c.reduce((k,I)=>k+x.querySelectorAll(`button[aria-label="${u(I)}"]`).length,0)>=2)return x;x=x.parentElement}return null}function p(T){return T}function m(T){let x=Array.from(T.querySelectorAll("button[aria-label]"));if(!x.length)return{refBtn:null,refWrapper:null};let v=x.filter(U=>U.dataset.mghBtn!=="true"&&(U.getAttribute("aria-label")||"")!==(e.ariaLabel||"Open MGH")),k=v.length?v:x,I=k.find(U=>(U.getAttribute("aria-label")||"").toLowerCase()===Md.toLowerCase())||null,E=k.length>=2?k.length-2:k.length-1,L=I||k[E],O=L.parentElement,M=O&&O.parentElement===T&&O.tagName==="DIV"?O:null;return{refBtn:L,refWrapper:M}}function g(T,x,v){let k=T.cloneNode(!1);k.type="button",k.setAttribute("aria-label",x),k.title=x,k.dataset.mghBtn="true",k.style.pointerEvents="auto",k.removeAttribute("id");let I=document.createElement("img");return I.src=v,I.alt="MGH",I.style.pointerEvents="none",I.style.userSelect="none",I.style.width="76%",I.style.height="76%",I.style.objectFit="contain",I.style.display="block",I.style.margin="auto",k.appendChild(I),k.addEventListener("click",E=>{E.preventDefault(),E.stopPropagation();try{e.onClick?.()}catch{}}),k}function f(){if(a)return!1;a=!0;let T=!1;try{let x=d();if(!x)return!1;s!==x&&(s=x);let{refBtn:v,refWrapper:k}=m(x);if(!v)return!1;r=x.querySelector('div[data-mgh-wrapper="true"]'),!r&&k&&(r=k.cloneNode(!1),r.dataset.mghWrapper="true",r.removeAttribute("id"),T=!0);let I=r?.querySelector('button[data-mgh-btn="true"]')||null;o||(o=I),o||(o=g(v,n,t),r?r.appendChild(o):o.parentElement!==x&&x.appendChild(o),T=!0),r&&r.parentElement!==x&&(x.appendChild(r),T=!0);let E=x;if(E&&E!==l){try{S.disconnect()}catch{}l=E,S.observe(l,{childList:!0,subtree:!0})}return T}finally{a=!1}}f();let b=document.getElementById("App")||document.body,h=null,S=new MutationObserver(T=>{let x=T.every(k=>{let I=Array.from(k.addedNodes||[]),E=Array.from(k.removedNodes||[]),L=I.concat(E);if(L.length===0){let O=k.target;return r&&(O===r||r.contains(O))||o&&(O===o||o.contains(O))}return L.every(O=>!!(!(O instanceof HTMLElement)||r&&(O===r||r.contains(O))||o&&(O===o||o.contains(O))))}),v=T.some(k=>Array.from(k.removedNodes||[]).some(I=>I instanceof HTMLElement?!!(r&&(I===r||r.contains(I))||o&&(I===o||o.contains(I))):!1));x&&!v||h===null&&(h=window.setTimeout(()=>{if(h=null,f()&&r){let I=r.parentElement;I&&I.lastElementChild!==r&&I.appendChild(r)}},150))});return S.observe(b,{childList:!0,subtree:!0}),i=()=>S.disconnect(),()=>{try{i?.()}catch{}try{r?.remove()}catch{}}}var Rd={},Ei=[];function Id(){return Ei.slice()}function Ed(e){Ei.push(e)}function Li(e){try{return JSON.parse(e)}catch{return}}function Mi(e){if(typeof e=="string"){let t=Li(e);return t!==void 0?t:e}return e}function Ri(e){if(e!=null){if(typeof e=="string"){let t=Li(e);return t!==void 0?Ri(t):e}if(Array.isArray(e)&&typeof e[0]=="string")return e[0];if(typeof e=="object"){let t=e;return t.type??t.Type??t.kind??t.messageType}}}function Ld(e){let t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function j(e,t,n){let o=typeof t=="boolean"?t:!0,r=typeof t=="function"?t:n,i=(a,s)=>{if(Ri(a)!==e)return;let c=r(a,s);return c&&typeof c=="object"&&"kind"in c?c:typeof c=="boolean"?c?void 0:{kind:"drop"}:o?void 0:{kind:"drop"}};return Ed(i),i}var vt=new WeakSet,Ii=new WeakMap;function Oi(e){let t=e.pageWindow,n=!!e.debug,o=e.middlewares&&e.middlewares.length?e.middlewares:Id();if(!o.length)return()=>{};let r=p=>({ws:p,pageWindow:t,debug:n}),i=(p,m)=>{let g=p;for(let f of o){let b=f(g,r(m));if(b){if(b.kind==="drop")return{kind:"drop"};b.kind==="replace"&&(g=b.message)}}return g!==p?{kind:"replace",message:g}:void 0},a=null,s=null,l=null,c=()=>{let p=t?.MagicCircle_RoomConnection,m=p?.sendMessage;if(!p||typeof m!="function")return!1;if(vt.has(m))return!0;let g=m.bind(p);function f(...b){let h=b.length===1?b[0]:b,S=Mi(h),T=i(S,Ld(t));if(T?.kind==="drop"){n&&console.log("[WS] drop outgoing (RoomConnection.sendMessage)",S);return}if(T?.kind==="replace"){let x=T.message;return b.length>1&&Array.isArray(x)?(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",S,"=>",x),g(...x)):(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",S,"=>",x),g(x))}return g(...b)}vt.add(f),Ii.set(f,m);try{p.sendMessage=f,vt.add(p.sendMessage),n&&console.log("[WS] outgoing patched via MagicCircle_RoomConnection.sendMessage")}catch{return!1}return a=()=>{try{p.sendMessage===f&&(p.sendMessage=m)}catch{}},!0};(()=>{let p=t?.WebSocket?.prototype,m=p?.send;if(typeof m!="function"||vt.has(m))return;function g(f){let b=Mi(f),h=i(b,this);if(h?.kind==="drop"){n&&console.log("[WS] drop outgoing (ws.send)",b);return}if(h?.kind==="replace"){let S=h.message,T=typeof S=="string"||S instanceof ArrayBuffer||S instanceof Blob?S:JSON.stringify(S);return n&&console.log("[WS] replace outgoing (ws.send)",b,"=>",S),m.call(this,T)}return m.call(this,f)}vt.add(g),Ii.set(g,m);try{p.send=g,n&&console.log("[WS] outgoing patched via WebSocket.prototype.send")}catch{return}s=()=>{try{p.send===g&&(p.send=m)}catch{}}})();let d=e.waitForRoomConnectionMs??4e3;if(!c()&&d>0){let p=Date.now();l=setInterval(()=>{if(c()){clearInterval(l),l=null;return}Date.now()-p>d&&(clearInterval(l),l=null,n&&console.log("[WS] RoomConnection not found, only ws.send is patched"))},250)}return()=>{if(l){try{clearInterval(l)}catch{}l=null}if(a){try{a()}catch{}a=null}if(s){try{s()}catch{}s=null}}}(function(){try{let t=Rd,n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();var Dd={},_i=[];function Od(){return _i.slice()}function Hi(e){_i.push(e)}function Hd(e){if(e!=null){if(typeof e=="object"){let t=e;if(typeof t.type=="string")return t.type;if(typeof t.Type=="string")return t.Type;if(typeof t.kind=="string")return t.kind;if(typeof t.messageType=="string")return t.messageType}if(Array.isArray(e)&&typeof e[0]=="string")return e[0]}}function _d(e){if(typeof e=="string")try{return JSON.parse(e)}catch{return e}return e}var Kn=Symbol.for("ariesmod.ws.handlers.patched");function te(e,t){if(typeof e=="string"){let r=e,i={match:a=>a.kind==="message"&&a.type===r,handle:t};return Hi(i),i}let n=e,o={match:r=>r.kind==="close"&&r.code===n,handle:t};return Hi(o),o}function Di(e,t=Od(),n={}){let o=n.pageWindow??window,r=!!n.debug;if(e[Kn])return()=>{};e[Kn]=!0;let i={ws:e,pageWindow:o,debug:r},a=d=>{for(let p of t)try{if(!p.match(d))continue;if(p.handle(d,i)===!0)return}catch(m){r&&console.error("[WS] handler error",m,d)}},s=d=>{let p=_d(d.data),m=Hd(p);a({kind:"message",raw:d.data,data:p,type:m})},l=d=>{a({kind:"close",code:d.code,reason:d.reason,wasClean:d.wasClean,event:d})},c=d=>a({kind:"open",event:d}),u=d=>a({kind:"error",event:d});return e.addEventListener("message",s),e.addEventListener("close",l),e.addEventListener("open",c),e.addEventListener("error",u),()=>{try{e.removeEventListener("message",s)}catch{}try{e.removeEventListener("close",l)}catch{}try{e.removeEventListener("open",c)}catch{}try{e.removeEventListener("error",u)}catch{}try{delete e[Kn]}catch{}}}(function(){try{let t=Dd,n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();te(4800,(e,t)=>{t.debug&&console.log("[WS][Close] Auth failure",e.code,e.reason)});te(4300,(e,t)=>{t.debug&&console.log("[WS][Close] Superseded",e.code,e.reason)});te(4400,(e,t)=>{t.debug&&console.log("[WS][Close] Heartbeat expired",e.code,e.reason)});te(4500,(e,t)=>{t.debug&&console.log("[WS][Close] Player kicked",e.code,e.reason)});te(4200,(e,t)=>{t.debug&&console.log("[WS][Close] Player left voluntarily",e.code,e.reason)});te(4100,(e,t)=>{t.debug&&console.log("[WS][Close] Reconnect initiated",e.code,e.reason)});te(4310,(e,t)=>{t.debug&&console.log("[WS][Close] Server disposed",e.code,e.reason)});te(4250,(e,t)=>{t.debug&&console.log("[WS][Close] User session superseded",e.code,e.reason)});te(4710,(e,t)=>{t.debug&&console.log("[WS][Close] Version expired",e.code,e.reason)});te(4700,(e,t)=>{t.debug&&console.log("[WS][Close] Version mismatch",e.code,e.reason)});te(ve.Config,(e,t)=>{t.debug&&console.log("[WS][STC] Config",e.data)});te(ve.CurrencyTransaction,(e,t)=>{t.debug&&console.log("[WS][STC] CurrencyTransaction",e.data)});te(ve.Emote,(e,t)=>{t.debug&&console.log("[WS][STC] Emote",e.data)});te(ve.InappropriateContentRejected,(e,t)=>{t.debug&&console.log("[WS][STC] InappropriateContentRejected",e.data)});te(ve.PartialState,(e,t)=>{t.debug&&console.log("[WS][STC] PartialState",e.data)});te(ve.Pong,(e,t)=>{t.debug&&console.log("[WS][STC] Pong",e.data)});te(ve.ServerErrorMessage,(e,t)=>{t.debug&&console.log("[WS][STC] ServerErrorMessage",e.data)});te(ve.Welcome,(e,t)=>{t.debug&&console.log("[WS][STC] Welcome",e.data)});j(P.PlantSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantSeed"),!!1));j(P.WaterPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] WaterPlant"),!!1));j(P.HarvestCrop,(e,t)=>(t.debug&&console.log("[MW][Garden] HarvestCrop"),!!1));j(P.SellAllCrops,(e,t)=>(t.debug&&console.log("[MW][Garden] SellAllCrops"),!!1));j(P.PurchaseSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseSeed"),!!1));j(P.PurchaseEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseEgg"),!!1));j(P.PurchaseTool,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseTool"),!!1));j(P.PurchaseDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseDecor"),!!1));j(P.PlantEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantEgg"),!!1));j(P.HatchEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] HatchEgg"),!!1));j(P.PlantGardenPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantGardenPlant"),!!1));j(P.PotPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PotPlant"),!!1));j(P.MutationPotion,(e,t)=>(t.debug&&console.log("[MW][Garden] MutationPotion"),!!1));j(P.PickupDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PickupDecor"),!!1));j(P.PlaceDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PlaceDecor"),!!1));j(P.RemoveGardenObject,(e,t)=>(t.debug&&console.log("[MW][Garden] RemoveGardenObject"),!!1));j(P.MoveInventoryItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveInventoryItem"),!!1));j(P.DropObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] DropObject"),!!1));j(P.PickupObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] PickupObject"),!!1));j(P.ToggleFavoriteItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] ToggleFavoriteItem"),!!1));j(P.PutItemInStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] PutItemInStorage"),!!1));j(P.RetrieveItemFromStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] RetrieveItemFromStorage"),!!1));j(P.MoveStorageItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveStorageItem"),!!1));j(P.LogItems,(e,t)=>(t.debug&&console.log("[MW][Inventory] LogItems"),!!1));j(P.PlacePet,(e,t)=>(t.debug&&console.log("[MW][Pets] PlacePet"),!!1));j(P.FeedPet,(e,t)=>(t.debug&&console.log("[MW][Pets] FeedPet"),!!1));j(P.PetPositions,(e,t)=>(t.debug&&console.log("[MW][Pets] PetPositions"),!!1));j(P.SwapPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SwapPet"),!!1));j(P.StorePet,(e,t)=>(t.debug&&console.log("[MW][Pets] StorePet"),!!1));j(P.NamePet,(e,t)=>(t.debug&&console.log("[MW][Pets] NamePet"),!!1));j(P.SellPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SellPet"),!!1));console.log("[WS] TESTTEST");j(P.SetSelectedGame,(e,t)=>(t.debug&&console.log("[MW][Session] SetSelectedGame"),!!1));j(P.VoteForGame,(e,t)=>(t.debug&&console.log("[MW][Session] VoteForGame"),!!1));j(P.RequestGame,(e,t)=>(t.debug&&console.log("[MW][Session] RequestGame"),!!1));j(P.RestartGame,(e,t)=>(t.debug&&console.log("[MW][Session] RestartGame"),!!1));j(P.Ping,(e,t)=>(t.debug&&console.log("[MW][Session] Ping"),!!1));j(P.PlayerPosition,(e,t)=>(t.debug&&console.log("[MW][Session] PlayerPosition"),!!1));j(P.Teleport,(e,t)=>(t.debug&&console.log("[MW][Session] Teleport"),!!1));j(P.CheckWeatherStatus,(e,t)=>(t.debug&&console.log("[MW][Session] CheckWeatherStatus"),!!1));j(P.Chat,(e,t)=>(t.debug&&console.log("[MW][Social] Chat"),!!1));j(P.Dev,(e,t)=>(t.debug&&console.log("[MW][Social] Dev"),!!1));j(P.Emote,(e,t)=>(t.debug&&console.log("[MW][Social] Emote"),!!1));j(P.Wish,(e,t)=>(t.debug&&console.log("[MW][Social] Wish"),!!1));j(P.KickPlayer,(e,t)=>(t.debug&&console.log("[MW][Social] KickPlayer"),!!1));j(P.ReportSpeakingStart,(e,t)=>(t.debug&&console.log("[MW][Voice] ReportSpeakingStart"),!!1));j(P.SetPlayerData,(e,t)=>(t.debug&&console.log("[MW][Social] SetPlayerData"),!!1));j(P.UsurpHost,(e,t)=>(t.debug&&console.log("[MW][Social] UsurpHost"),!!1));function Gd(e={}){let t=e.pageWindow??A,n=e.pollMs??500,o=!!e.debug,r=[];r.push(fr(t,{debug:o})),r.push(Oi({pageWindow:t,middlewares:e.middlewares,debug:o}));let i=null,a=s=>{if(i){try{i()}catch{}i=null}s&&(i=Di(s,e.handlers,{debug:o,pageWindow:t}))};return a(yt(t).ws),r.push(Kt(s=>a(s.ws),{intervalMs:n,debug:o,pageWindow:t})),{getWs:()=>yt(t).ws,dispose:()=>{for(let s=r.length-1;s>=0;s--)try{r[s]()}catch{}if(i){try{i()}catch{}i=null}}}}var Yt=null;function Gi(e={}){return Yt||(Yt=Gd(e),Yt)}Pe();var wt=null;function Nd(){return A?.document??(typeof document<"u"?document:null)}function Jn(e){if(wt!==null)return;let t=e??Nd();if(!t)return;let n=t.scripts;for(let o=0;o<n.length;o++){let i=n.item(o)?.src;if(!i)continue;let a=i.match(/\/(?:r\/\d+\/)?version\/([^/]+)/);if(a?.[1]){wt=a[1];return}}}function Wd(){return Jn(),wt}async function Bd(e=15e3){let t=performance.now();for(;performance.now()-t<e;){if(Jn(),wt)return wt;await Ae(50)}throw new Error("MGVersion timeout (gameVersion not found)")}var St={init:Jn,get:Wd,wait:Bd};var Wi=A?.location?.origin||"https://magicgarden.gg";function Bi(){return typeof GM_xmlhttpRequest=="function"}function ji(e,t="text"){return new Promise((n,o)=>{GM_xmlhttpRequest({method:"GET",url:e,responseType:t,onload:r=>r.status>=200&&r.status<300?n(r):o(new Error(`HTTP ${r.status} for ${e}`)),onerror:()=>o(new Error(`Network error for ${e}`)),ontimeout:()=>o(new Error(`Timeout for ${e}`))})})}async function Qe(e){if(Bi())return JSON.parse((await ji(e,"text")).responseText);let t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.json()}async function Zt(e){if(Bi())return(await ji(e,"blob")).response;let t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.blob()}function Vi(e){return new Promise((t,n)=>{let o=URL.createObjectURL(e),r=A?.Image||Image,i=new r;i.decoding="async",i.onload=()=>{URL.revokeObjectURL(o),t(i)},i.onerror=()=>{URL.revokeObjectURL(o),n(new Error("Image decode failed"))},i.src=o})}var ue=(e,t)=>e.replace(/\/?$/,"/")+String(t||"").replace(/^\//,""),jd=e=>e.lastIndexOf("/")>=0?e.slice(0,e.lastIndexOf("/")+1):"",Xn=(e,t)=>String(t||"").startsWith("/")?String(t).slice(1):jd(e)+String(t||"");var en=null,tn=null;async function Fi(){return tn||en||(en=(async()=>{let e=await St.wait(15e3);return tn=`${Wi}/version/${e}/assets/`,tn})(),en)}async function Vd(e){let t=await Fi();return ue(t,e)}var he={base:Fi,url:Vd};var Yn=new Map;async function Fd(e){let t=e||await he.base();if(Yn.has(t))return Yn.get(t);let n=Qe(ue(t,"manifest.json"));return Yn.set(t,n),n}function zd(e,t){return e?.bundles?.find(n=>n?.name===t)||null}function $d(e){let t=new Set;for(let n of e?.assets||[])for(let o of n?.src||[])typeof o=="string"&&o.endsWith(".json")&&o!=="manifest.json"&&t.add(o);return Array.from(t)}var pe={load:Fd,getBundle:zd,listJsonFromBundle:$d};Pe();Pe();Pe();var zi=Function.prototype.bind,X={_bindPatched:!1,engine:null,tos:null,app:null,renderer:null,ticker:null,stage:null},$i,Ui,Ki,Ud=new Promise(e=>{$i=e}),Kd=new Promise(e=>{Ui=e}),qd=new Promise(e=>{Ki=e});function Jd(e){return!!(e&&typeof e=="object"&&typeof e.start=="function"&&typeof e.destroy=="function"&&e.app&&e.app.stage&&e.app.renderer&&e.systems&&typeof e.systems.values=="function")}function Xd(e){try{for(let t of e.systems.values()){let n=t?.system;if(n?.name==="tileObject")return n}}catch{}return null}function Yd(e){X.engine=e,X.tos=Xd(e)||null,X.app=e.app||null,X.renderer=e.app?.renderer||null,X.ticker=e.app?.ticker||null,X.stage=e.app?.stage||null;try{$i(e)}catch{}try{X.app&&Ui(X.app)}catch{}try{X.renderer&&Ki(X.renderer)}catch{}}function Qn(){return X.engine?!0:(X._bindPatched||(X._bindPatched=!0,Function.prototype.bind=function(e,...t){let n=zi.call(this,e,...t);try{!X.engine&&Jd(e)&&(Function.prototype.bind=zi,X._bindPatched=!1,Yd(e))}catch{}return n}),!1)}Qn();async function Qd(e=15e3){let t=performance.now();for(;performance.now()-t<e;){if(X.engine)return!0;Qn(),await Ae(50)}throw new Error("MGPixiHooks: engine capture timeout")}async function Zd(e=15e3){return X.engine||await Qd(e),!0}function ep(){return X.engine&&X.app?{ok:!0,engine:X.engine,tos:X.tos,app:X.app}:(Qn(),{ok:!1,engine:X.engine,tos:X.tos,app:X.app,note:"Not captured. Wait for room, or reload."})}var ie={engineReady:Ud,appReady:Kd,rendererReady:qd,engine:()=>X.engine,tos:()=>X.tos,app:()=>X.app,renderer:()=>X.renderer,ticker:()=>X.ticker,stage:()=>X.stage,PIXI:()=>A.PIXI||null,init:Zd,hook:ep,ready:()=>!!X.engine};function kt(e){let t=String(e||"").trim();return t?t.startsWith("sprite/")||t.startsWith("sprites/")?t:t.includes("/")?`sprite/${t}`:t:""}function Ze(e,t){let n=String(e||"").trim().replace(/^sprites?\//,"").replace(/^\/+|\/+$/g,""),o=String(t||"").trim();return o.includes("/")||!n?kt(o):`sprite/${n}/${o}`}function et(e,t,n,o){let r=Ze(e,t);if(n.has(r)||o.has(r))return r;let i=String(t||"").trim();if(n.has(i)||o.has(i))return i;let a=kt(i);return n.has(a)||o.has(a)?a:r}function tp(e,t,n=25e3){let o=[e],r=new Set,i=0;for(;o.length&&i++<n;){let a=o.pop();if(!a||r.has(a))continue;if(r.add(a),t(a))return a;let s=a.children;if(Array.isArray(s))for(let l=s.length-1;l>=0;l--)o.push(s[l])}return null}function np(e){let t=A.PIXI;if(t?.Texture&&t?.Sprite&&t?.Container&&t?.Rectangle)return{Container:t.Container,Sprite:t.Sprite,Texture:t.Texture,Rectangle:t.Rectangle,AnimatedSprite:t.AnimatedSprite||null};let n=e?.stage,o=tp(n,r=>r?.texture?.frame&&r?.constructor&&r?.texture?.constructor&&r?.texture?.frame?.constructor);if(!o)throw new Error("No Sprite found yet (constructors).");return{Container:n.constructor,Sprite:o.constructor,Texture:o.texture.constructor,Rectangle:o.texture.frame.constructor,AnimatedSprite:t?.AnimatedSprite||null}}async function qi(e,t=15e3){let{sleep:n}=await Promise.resolve().then(()=>(Pe(),Ni)),o=performance.now();for(;performance.now()-o<t;)try{return np(e)}catch{await n(50)}throw new Error("Constructors timeout")}var He=(...e)=>{try{console.log("[MGSprite]",...e)}catch{}};function op(e){return e&&typeof e=="object"&&e.frames&&e.meta&&typeof e.meta.image=="string"}function Zn(e,t,n,o,r){return new e(t,n,o,r)}function rp(e,t,n,o,r,i,a){let s;try{s=new e({source:t.source,frame:n,orig:o,trim:r||void 0,rotate:i||0})}catch{s=new e(t.baseTexture||t,n,o,r||void 0,i||0)}if(a)if(s.defaultAnchor?.set)try{s.defaultAnchor.set(a.x,a.y)}catch{}else s.defaultAnchor?(s.defaultAnchor.x=a.x,s.defaultAnchor.y=a.y):s.defaultAnchor={x:a.x,y:a.y};try{s.updateUvs?.()}catch{}return s}function ip(e,t,n,o){let{Texture:r,Rectangle:i}=o;for(let[a,s]of Object.entries(e.frames)){let l=s.frame,c=!!s.rotated,u=c?2:0,d=c?l.h:l.w,p=c?l.w:l.h,m=Zn(i,l.x,l.y,d,p),g=s.sourceSize||{w:l.w,h:l.h},f=Zn(i,0,0,g.w,g.h),b=null;if(s.trimmed&&s.spriteSourceSize){let h=s.spriteSourceSize;b=Zn(i,h.x,h.y,h.w,h.h)}n.set(a,rp(r,t,m,f,b,u,s.anchor||null))}}function ap(e,t,n){if(!(!e.animations||typeof e.animations!="object"))for(let[o,r]of Object.entries(e.animations)){if(!Array.isArray(r))continue;let i=r.map(a=>t.get(a)).filter(Boolean);i.length>=2&&n.set(o,i)}}function sp(e,t){let n=(o,r)=>{let i=String(o||"").trim(),a=String(r||"").trim();!i||!a||(t.has(i)||t.set(i,new Set),t.get(i).add(a))};for(let o of Object.keys(e.frames||{})){let r=/^sprite\/([^/]+)\/(.+)$/.exec(o);r&&n(r[1],r[2])}}async function Ji(e,t){let n=await pe.load(e),o=pe.getBundle(n,"default");if(!o)throw new Error("No default bundle in manifest");let r=pe.listJsonFromBundle(o),i=new Set,a=new Map,s=new Map,l=new Map;async function c(u){if(i.has(u))return;i.add(u);let d=await Qe(ue(e,u));if(!op(d))return;let p=d.meta?.related_multi_packs;if(Array.isArray(p))for(let b of p)await c(Xn(u,b));let m=Xn(u,d.meta.image),g=await Vi(await Zt(ue(e,m))),f=t.Texture.from(g);ip(d,f,a,t),ap(d,a,s),sp(d,l)}for(let u of r)await c(u);return{textures:a,animations:s,categoryIndex:l}}var Xi={enabled:!0,maxEntries:1200,maxCost:5e3,srcCanvasMax:450};function Yi(){return{lru:new Map,cost:0,srcCanvas:new Map}}function eo(e,t){return`${t.sig}::${e}`}function Qi(e){return e?e.isAnim?e.frames?.length||0:e.tex?1:0:0}function lp(e,t,n){e.lru.delete(t),e.lru.set(t,n)}function cp(e,t){if(t.enabled)for(;e.lru.size>t.maxEntries||e.cost>t.maxCost;){let n=e.lru.keys().next().value;if(n===void 0)break;let o=e.lru.get(n);e.lru.delete(n),e.cost=Math.max(0,e.cost-Qi(o??null))}}function to(e,t){let n=e.lru.get(t);return n?(lp(e,t,n),n):null}function no(e,t,n,o){e.lru.set(t,n),e.cost+=Qi(n),cp(e,o)}function Zi(e){e.lru.clear(),e.cost=0,e.srcCanvas.clear()}function ea(e,t){return e.srcCanvas.get(t)??null}function ta(e,t,n,o){if(e.srcCanvas.set(t,n),e.srcCanvas.size>o.srcCanvasMax){let r=e.srcCanvas.keys().next().value;r!==void 0&&e.srcCanvas.delete(r)}}function up(){return{ready:!1,app:null,renderer:null,ctors:null,baseUrl:null,textures:new Map,animations:new Map,live:new Set,defaultParent:null,overlay:null,categoryIndex:null}}var nn=null,re=up(),dp=Yi(),pp={...Xi};function ae(){return re}function tt(){return dp}function Tt(){return pp}function oo(){return re.ready}async function na(){return re.ready?!0:nn||(nn=(async()=>{let e=performance.now();He("init start");let t=await Qt(ie.appReady,15e3,"PIXI app");He("app ready");let n=await Qt(ie.rendererReady,15e3,"PIXI renderer");He("renderer ready"),re.app=t,re.renderer=n||t?.renderer||null,re.ctors=await qi(t),He("constructors resolved"),re.baseUrl=await he.base(),He("base url",re.baseUrl);let{textures:o,animations:r,categoryIndex:i}=await Ji(re.baseUrl,re.ctors);return re.textures=o,re.animations=r,re.categoryIndex=i,He("atlases loaded","textures",re.textures.size,"animations",re.animations.size,"categories",re.categoryIndex?.size??0),re.ready=!0,He("ready in",Math.round(performance.now()-e),"ms"),!0})(),nn)}var We={Gold:{overlayTall:null,tallIconOverride:null},Rainbow:{overlayTall:null,tallIconOverride:null,angle:130,angleTall:0},Wet:{overlayTall:"sprite/mutation-overlay/WetTallPlant",tallIconOverride:"sprite/mutation/Puddle"},Chilled:{overlayTall:"sprite/mutation-overlay/ChilledTallPlant",tallIconOverride:null},Frozen:{overlayTall:"sprite/mutation-overlay/FrozenTallPlant",tallIconOverride:null},Dawnlit:{overlayTall:null,tallIconOverride:null},Ambershine:{overlayTall:null,tallIconOverride:null},Dawncharged:{overlayTall:null,tallIconOverride:null},Ambercharged:{overlayTall:null,tallIconOverride:null}},ra=Object.keys(We),mp=["Gold","Rainbow","Wet","Chilled","Frozen","Ambershine","Dawnlit","Dawncharged","Ambercharged"],oa=new Map(mp.map((e,t)=>[e,t]));function on(e){return[...new Set(e.filter(Boolean))].sort((n,o)=>(oa.get(n)??1/0)-(oa.get(o)??1/0))}var gp=["Wet","Chilled","Frozen"];var ia=new Set(["Dawnlit","Ambershine","Dawncharged","Ambercharged"]),aa={Banana:.6,Carrot:.6,Sunflower:.5,Starweaver:.5,FavaBean:.25,BurrosTail:.2},sa={Pepper:.5,Banana:.6},la=256,ca=.5,ua=2;function ro(e){if(!e.length)return{muts:[],overlayMuts:[],selectedMuts:[],sig:""};let t=on(e),n=fp(e),o=bp(e);return{muts:n,overlayMuts:o,selectedMuts:t,sig:`${t.join(",")}|${n.join(",")}|${o.join(",")}`}}function fp(e){let t=e.filter((r,i,a)=>We[r]&&a.indexOf(r)===i);if(!t.length)return[];if(t.includes("Gold"))return["Gold"];if(t.includes("Rainbow"))return["Rainbow"];let n=["Ambershine","Dawnlit","Dawncharged","Ambercharged"];return t.some(r=>n.includes(r))?on(t.filter(r=>!gp.includes(r))):on(t)}function bp(e){let t=e.filter((n,o,r)=>We[n]?.overlayTall&&r.indexOf(n)===o);return on(t)}function rn(e,t){return e.map(n=>({name:n,meta:We[n],overlayTall:We[n]?.overlayTall??null,isTall:t}))}var hp={Gold:{op:"source-atop",colors:["rgb(235,200,0)"],a:.7},Rainbow:{op:"color",colors:["#FF1744","#FF9100","#FFEA00","#00E676","#2979FF","#D500F9"],ang:130,angTall:0,masked:!0},Wet:{op:"source-atop",colors:["rgb(50,180,200)"],a:.25},Chilled:{op:"source-atop",colors:["rgb(100,160,210)"],a:.45},Frozen:{op:"source-atop",colors:["rgb(100,130,220)"],a:.5},Dawnlit:{op:"source-atop",colors:["rgb(209,70,231)"],a:.5},Ambershine:{op:"source-atop",colors:["rgb(190,100,40)"],a:.5},Dawncharged:{op:"source-atop",colors:["rgb(140,80,200)"],a:.5},Ambercharged:{op:"source-atop",colors:["rgb(170,60,25)"],a:.5}};var an=(()=>{try{let t=document.createElement("canvas").getContext("2d");if(!t)return new Set;let n=["color","hue","saturation","luminosity","overlay","screen","lighter","source-atop"],o=new Set;for(let r of n)t.globalCompositeOperation=r,t.globalCompositeOperation===r&&o.add(r);return o}catch{return new Set}})();function yp(e){return an.has(e)?e:an.has("overlay")?"overlay":an.has("screen")?"screen":an.has("lighter")?"lighter":"source-atop"}function xp(e,t,n,o,r=!1){let i=(o-90)*Math.PI/180,a=t/2,s=n/2;if(!r){let d=Math.min(t,n)/2;return e.createLinearGradient(a-Math.cos(i)*d,s-Math.sin(i)*d,a+Math.cos(i)*d,s+Math.sin(i)*d)}let l=Math.cos(i),c=Math.sin(i),u=Math.abs(l)*t/2+Math.abs(c)*n/2;return e.createLinearGradient(a-l*u,s-c*u,a+l*u,s+c*u)}function da(e,t,n,o,r=!1){let i=o.colors?.length?o.colors:["#fff"],a=o.ang!=null?xp(e,t,n,o.ang,r):e.createLinearGradient(0,0,0,n);i.length===1?(a.addColorStop(0,i[0]),a.addColorStop(1,i[0])):i.forEach((s,l)=>a.addColorStop(l/(i.length-1),s)),e.fillStyle=a,e.fillRect(0,0,t,n)}function pa(e,t,n,o){let r=hp[n];if(!r)return;let i={...r};n==="Rainbow"&&o&&i.angTall!=null&&(i.ang=i.angTall);let a=n==="Rainbow"&&o,s=t.width,l=t.height;e.save();let c=i.masked?yp(i.op):"source-in";if(e.globalCompositeOperation=c,i.a!=null&&(e.globalAlpha=i.a),i.masked){let u=document.createElement("canvas");u.width=s,u.height=l;let d=u.getContext("2d");d.imageSmoothingEnabled=!1,da(d,s,l,i,a),d.globalCompositeOperation="destination-in",d.drawImage(t,0,0),e.drawImage(u,0,0)}else da(e,s,l,i,a);e.restore()}function ma(e){return/tallplant/i.test(e)}function sn(e){let t=String(e||"").split("/");return t[t.length-1]||""}function ga(e){switch(e){case"Ambershine":return["Ambershine","Amberlit"];case"Dawncharged":return["Dawncharged","Dawnbound"];case"Ambercharged":return["Ambercharged","Amberbound"];default:return[e]}}function vp(e,t){let n=String(e||"").toLowerCase();for(let o of t.keys()){let r=/sprite\/mutation-overlay\/([A-Za-z0-9]+)TallPlant/i.exec(String(o));if(!r||!r[1])continue;if(r[1].toLowerCase()===n){let a=t.get(o);if(a)return{tex:a,key:o}}}return null}function fa(e,t,n,o){if(!t)return null;let r=sn(e),i=ga(t);for(let a of i){let s=[`sprite/mutation/${a}${r}`,`sprite/mutation/${a}-${r}`,`sprite/mutation/${a}_${r}`,`sprite/mutation/${a}/${r}`,`sprite/mutation/${a}`];for(let l of s){let c=n.get(l);if(c)return{tex:c,key:l}}if(o){let l=`sprite/mutation-overlay/${a}TallPlant`,c=n.get(l);if(c)return{tex:c,key:l};let u=`sprite/mutation-overlay/${a}`,d=n.get(u);if(d)return{tex:d,key:u};let p=vp(t,n);if(p)return p}}return null}function ba(e,t,n,o){if(!t)return null;let r=We[t];if(n&&r?.tallIconOverride){let s=o.get(r.tallIconOverride);if(s)return s}let i=sn(e),a=ga(t);for(let s of a){let l=[`sprite/mutation/${s}Icon`,`sprite/mutation/${s}`,`sprite/mutation/${s}${i}`,`sprite/mutation/${s}-${i}`,`sprite/mutation/${s}_${i}`,`sprite/mutation/${s}/${i}`];for(let c of l){let u=o.get(c);if(u)return u}if(n){let c=`sprite/mutation-overlay/${s}TallPlantIcon`,u=o.get(c);if(u)return u;let d=`sprite/mutation-overlay/${s}TallPlant`,p=o.get(d);if(p)return p}}return null}function ha(e,t,n){let o=e?.orig?.width??e?.frame?.width??e?.width??1,r=e?.orig?.height??e?.frame?.height??e?.height??1,i=e?.defaultAnchor?.x??0,a=e?.defaultAnchor?.y??0,s=sa[t]??i,l=r>o*1.5,c=aa[t]??(l?a:.4),u={x:(s-i)*o,y:(c-a)*r},d=Math.min(o,r),p=Math.min(1.5,d/la),m=ca*p;return n&&(m*=ua),{width:o,height:r,anchorX:i,anchorY:a,offset:u,iconScale:m}}function io(e,t,n,o,r){let i=ea(o,e);if(i)return i;let a=null;try{if(t?.extract?.canvas){let s=new n.Sprite(e);a=t.extract.canvas(s),s.destroy?.({children:!0,texture:!1,baseTexture:!1})}}catch{}if(!a){let s=e?.frame||e?._frame,l=e?.orig||e?._orig,c=e?.trim||e?._trim,u=e?.rotate||e?._rotate||0,d=e?.baseTexture?.resource?.source||e?.baseTexture?.resource||e?.source?.resource?.source||e?.source?.resource||e?._source?.resource?.source||null;if(!s||!d)throw new Error("textureToCanvas fail");a=document.createElement("canvas");let p=Math.max(1,(l?.width??s.width)|0),m=Math.max(1,(l?.height??s.height)|0),g=c?.x??0,f=c?.y??0;a.width=p,a.height=m;let b=a.getContext("2d");b.imageSmoothingEnabled=!1,u===!0||u===2||u===8?(b.save(),b.translate(g+s.height/2,f+s.width/2),b.rotate(-Math.PI/2),b.drawImage(d,s.x,s.y,s.width,s.height,-s.width/2,-s.height/2,s.width,s.height),b.restore()):b.drawImage(d,s.x,s.y,s.width,s.height,g,f,s.width,s.height)}return ta(o,e,a,r),a}function wp(e,t,n,o,r,i,a,s){let{w:l,h:c,aX:u,aY:d,basePos:p}=t,m=[];for(let g of n){let f=new o.Sprite(e);f.anchor?.set?.(u,d),f.position.set(p.x,p.y),f.zIndex=1;let b=document.createElement("canvas");b.width=l,b.height=c;let h=b.getContext("2d");h.imageSmoothingEnabled=!1,h.save(),h.translate(l*u,c*d),h.drawImage(io(e,r,o,i,a),-l*u,-c*d),h.restore(),pa(h,b,g.name,g.isTall);let S=o.Texture.from(b);s.push(S),f.texture=S,m.push(f)}return m}function Sp(e,t,n,o,r,i,a,s,l,c){let{aX:u,basePos:d}=t,p=[];for(let m of n){let g=m.overlayTall&&o.get(m.overlayTall)&&{tex:o.get(m.overlayTall),key:m.overlayTall}||fa(e,m.name,o,!0);if(!g?.tex)continue;let f=io(g.tex,i,r,a,s);if(!f)continue;let b=f.width,h={x:0,y:0},S={x:d.x-u*b,y:0},T=document.createElement("canvas");T.width=b,T.height=f.height;let x=T.getContext("2d");if(!x)continue;x.imageSmoothingEnabled=!1,x.drawImage(f,0,0),x.globalCompositeOperation="destination-in",x.drawImage(l,-S.x,-S.y);let v=r.Texture.from(T);c.push(v);let k=new r.Sprite(v);k.anchor?.set?.(h.x,h.y),k.position.set(S.x,S.y),k.scale.set(1),k.alpha=1,k.zIndex=3,p.push(k)}return p}function kp(e,t,n,o,r,i){let{basePos:a}=t,s=[];for(let l of n){if(l.name==="Gold"||l.name==="Rainbow")continue;let c=ba(e,l.name,l.isTall,o);if(!c)continue;let u=new r.Sprite(c),d=c?.defaultAnchor?.x??.5,p=c?.defaultAnchor?.y??.5;u.anchor?.set?.(d,p),u.position.set(a.x+i.offset.x,a.y+i.offset.y),u.scale.set(i.iconScale),l.isTall&&(u.zIndex=-1),ia.has(l.name)&&(u.zIndex=10),u.zIndex||(u.zIndex=2),s.push(u)}return s}function ao(e,t,n,o){try{if(!e||!o.renderer||!o.ctors?.Container||!o.ctors?.Sprite||!o.ctors?.Texture)return null;let{Container:r,Sprite:i,Texture:a}=o.ctors,s=e?.orig?.width??e?.frame?.width??e?.width??1,l=e?.orig?.height??e?.frame?.height??e?.height??1,c=e?.defaultAnchor?.x??.5,u=e?.defaultAnchor?.y??.5,d={x:s*c,y:l*u},p=io(e,o.renderer,o.ctors,o.cacheState,o.cacheConfig),m=new r;m.sortableChildren=!0;let g=new i(e);g.anchor?.set?.(c,u),g.position.set(d.x,d.y),g.zIndex=0,m.addChild(g);let f=ma(t),b=rn(n.muts,f),h=rn(n.overlayMuts,f),S=rn(n.selectedMuts,f),T=[],x={w:s,h:l,aX:c,aY:u,basePos:d},v=sn(t),k=ha(e,v,f);wp(e,x,b,o.ctors,o.renderer,o.cacheState,o.cacheConfig,T).forEach(M=>m.addChild(M)),f&&Sp(t,x,h,o.textures,o.ctors,o.renderer,o.cacheState,o.cacheConfig,p,T).forEach(U=>m.addChild(U)),kp(t,x,S,o.textures,o.ctors,k).forEach(M=>m.addChild(M));let L=null;if(typeof o.renderer.generateTexture=="function"?L=o.renderer.generateTexture(m,{resolution:1}):o.renderer.textureGenerator?.generateTexture&&(L=o.renderer.textureGenerator.generateTexture({target:m,resolution:1})),!L)throw new Error("no render texture");let O=L instanceof a?L:a.from(o.renderer.extract.canvas(L));L&&L!==O&&L.destroy?.(!0),m.destroy({children:!0,texture:!1,baseTexture:!1});try{O.__mg_gen=!0,O.label=`${t}|${n.sig}`}catch{}return O}catch{return null}}function ya(e,t,n,o){if(!e||e.length<2)return null;let r=[];for(let i of e){let a=ao(i,t,n,o);a&&r.push(a)}return r.length>=2?r:null}function Tp(e){if(e.overlay)return e.overlay;let t=new e.ctors.Container;t.sortableChildren=!0,t.zIndex=99999999;try{e.app.stage.sortableChildren=!0}catch{}return e.app.stage.addChild(t),e.overlay=t,t}function Ap(e){let t=e.defaultParent;if(!t)return null;try{return typeof t=="function"?t():t}catch{return null}}function xa(e,t,n,o,r,i){if(!n.length)return t;let a=ro(n);if(!a.sig)return t;let s=eo(e,a),l=to(r,s);if(l?.tex)return l.tex;let c=ao(t,e,a,{renderer:o.renderer,ctors:o.ctors,textures:o.textures,cacheState:r,cacheConfig:i});return c?(no(r,s,{isAnim:!1,tex:c},i),c):t}function va(e,t,n,o,r,i){if(!n.length)return t;let a=ro(n);if(!a.sig)return t;let s=eo(e,a),l=to(r,s);if(l?.isAnim&&l.frames?.length)return l.frames;let c=ya(t,e,a,{renderer:o.renderer,ctors:o.ctors,textures:o.textures,cacheState:r,cacheConfig:i});return c?(no(r,s,{isAnim:!0,frames:c},i),c):t}function so(e,t,n,o,r,i={}){if(!e.ready)throw new Error("MGSprite not ready yet");let a=et(o,r,e.textures,e.animations),s=i.mutations||[],l=i.parent||Ap(e)||Tp(e),c=e.renderer?.width||e.renderer?.view?.width||innerWidth,u=e.renderer?.height||e.renderer?.view?.height||innerHeight,d=i.center?c/2:i.x??c/2,p=i.center?u/2:i.y??u/2,m,g=e.animations.get(a);if(g&&g.length>=2){let h=va(a,g,s,e,t,n),S=e.ctors.AnimatedSprite;if(S)m=new S(h),m.animationSpeed=i.fps?i.fps/60:i.speed??.15,m.loop=i.loop??!0,m.play();else{let T=new e.ctors.Sprite(h[0]),v=1e3/Math.max(1,i.fps||8),k=0,I=0,E=L=>{let O=e.app.ticker?.deltaMS??L*16.666666666666668;if(k+=O,k<v)return;let M=k/v|0;k%=v,I=(I+M)%h.length,T.texture=h[I]};T.__mgTick=E,e.app.ticker?.add?.(E),m=T}}else{let h=e.textures.get(a);if(!h)throw new Error(`Unknown sprite/anim key: ${a}`);let S=xa(a,h,s,e,t,n);m=new e.ctors.Sprite(S)}let f=i.anchorX??m.texture?.defaultAnchor?.x??.5,b=i.anchorY??m.texture?.defaultAnchor?.y??.5;return m.anchor?.set?.(f,b),m.position.set(d,p),m.scale.set(i.scale??1),m.alpha=i.alpha??1,m.rotation=i.rotation??0,m.zIndex=i.zIndex??999999,l.addChild(m),e.live.add(m),m.__mgDestroy=()=>{try{m.__mgTick&&e.app.ticker?.remove?.(m.__mgTick)}catch{}try{m.destroy?.({children:!0,texture:!1,baseTexture:!1})}catch{try{m.destroy?.()}catch{}}e.live.delete(m)},m}function Pp(e,t){let n=e.renderer;if(n?.extract?.canvas)return n.extract.canvas(t);if(n?.plugins?.extract?.canvas)return n.plugins.extract.canvas(t);throw new Error("No extract.canvas available on renderer")}function lo(e,t,n,o,r,i={}){if(!e.ready)throw new Error("MGSprite not ready yet");let a=et(o,r,e.textures,e.animations),s=i.mutations||[],l=e.animations.get(a),c=Math.max(0,(i.frameIndex??0)|0),u;if(l?.length){let S=va(a,l,s,e,t,n);u=S[c%S.length]}else{let S=e.textures.get(a);if(!S)throw new Error(`Unknown sprite/anim key: ${a}`);u=xa(a,S,s,e,t,n)}let d=new e.ctors.Sprite(u),p=i.anchorX??d.texture?.defaultAnchor?.x??.5,m=i.anchorY??d.texture?.defaultAnchor?.y??.5;d.anchor?.set?.(p,m),d.scale.set(i.scale??1);let g=i.pad??2,f=new e.ctors.Container;f.addChild(d);try{f.updateTransform?.()}catch{}let b=d.getBounds?.(!0)||{x:0,y:0,width:d.width,height:d.height};d.position.set(-b.x+g,-b.y+g);let h=Pp(e,f);try{f.destroy?.({children:!0})}catch{}return h}function wa(e){for(let t of Array.from(e.live))t.__mgDestroy?.()}function Sa(e,t){return e.defaultParent=t,!0}function ka(e,t){return e.defaultParent=t,!0}function nt(){if(!oo())throw new Error("MGSprite not ready yet")}function Cp(e,t,n){return typeof t=="string"?so(ae(),tt(),Tt(),e,t,n||{}):so(ae(),tt(),Tt(),null,e,t||{})}function Mp(e,t,n){return typeof t=="string"?lo(ae(),tt(),Tt(),e,t,n||{}):lo(ae(),tt(),Tt(),null,e,t||{})}function Ip(){wa(ae())}function Ep(e){return Sa(ae(),e)}function Lp(e){return ka(ae(),e)}function Rp(e,t){let n=ae(),o=typeof t=="string"?et(e,t,n.textures,n.animations):et(null,e,n.textures,n.animations);return n.textures.has(o)||n.animations.has(o)}function Op(){nt();let e=ae().categoryIndex;return e?Array.from(e.keys()).sort((t,n)=>t.localeCompare(n)):[]}function Hp(e){nt();let t=String(e||"").trim();if(!t)return[];let n=ae().categoryIndex;return n?Array.from(n.get(t)?.values()||[]).sort((o,r)=>o.localeCompare(r)):[]}function _p(e,t){nt();let n=String(e||"").trim(),o=String(t||"").trim();if(!n||!o)return!1;let r=ae().categoryIndex;if(!r)return!1;let i=n.toLowerCase(),a=o.toLowerCase();for(let[s,l]of r.entries())if(s.toLowerCase()===i){for(let c of l.values())if(c.toLowerCase()===a)return!0}return!1}function Dp(e){nt();let t=ae().categoryIndex;if(!t)return[];let n=String(e||"").trim().toLowerCase(),o=[];for(let[r,i]of t.entries())for(let a of i.values()){let s=Ze(r,a);(!n||s.toLowerCase().startsWith(n))&&o.push(s)}return o.sort((r,i)=>r.localeCompare(i))}function Gp(e){nt();let t=String(e||"").trim();if(!t)return null;let n=kt(t),o=/^sprite\/([^/]+)\/(.+)$/.exec(n);if(!o)return null;let r=o[1],i=o[2],a=ae().categoryIndex,s=r.toLowerCase(),l=i.toLowerCase(),c=r,u=i;if(a){let d=Array.from(a.keys()).find(g=>g.toLowerCase()===s);if(!d)return null;c=d;let p=a.get(d);if(!p)return null;let m=Array.from(p.values()).find(g=>g.toLowerCase()===l);if(!m)return null;u=m}return{category:c,id:u,key:Ze(c,u)}}function Np(e,t){nt();let n=String(e||"").trim(),o=String(t||"").trim();if(!n||!o)throw new Error("getIdPath(category, id) requires both category and id");let r=ae().categoryIndex;if(!r)throw new Error("Sprite categories not indexed");let i=n.toLowerCase(),a=o.toLowerCase(),s=Array.from(r.keys()).find(u=>u.toLowerCase()===i)||n,l=r.get(s);if(!l)throw new Error(`Unknown sprite category: ${n}`);let c=Array.from(l.values()).find(u=>u.toLowerCase()===a)||o;if(!l.has(c))throw new Error(`Unknown sprite id: ${n}/${o}`);return Ze(s,c)}function Wp(){Zi(tt())}function Bp(){return[...ra]}var we={init:na,ready:oo,show:Cp,toCanvas:Mp,clear:Ip,attach:Ep,attachProvider:Lp,has:Rp,key:(e,t)=>Ze(e,t),getCategories:Op,getCategoryId:Hp,hasId:_p,listIds:Dp,getIdInfo:Gp,getIdPath:Np,clearMutationCache:Wp,getMutationNames:Bp};var uo=A,Ce=uo.Object??Object,po=Ce.keys,ln=Ce.values,cn=Ce.entries,Be={items:["WateringCan","PlanterPot","Shovel"],decor:["SmallRock","MediumRock","LargeRock","WoodBench","StoneBench","MarbleBench"],mutations:["Gold","Rainbow","Wet","Chilled","Frozen"],eggs:["CommonEgg","UncommonEgg","RareEgg"],pets:["Worm","Snail","Bee","Chicken","Bunny"],abilities:["ProduceScaleBoost","DoubleHarvest","SeedFinderI","CoinFinderI"],plants:["Carrot","Strawberry","Aloe","Blueberry","Apple"]},jp=["Rain","Frost","Dawn","AmberMoon"],Ta=/main-[^/]+\.js(\?|$)/,Vp=3,Fp=200,zp=50,Aa=new WeakSet,K={isReady:!1,isHookInstalled:!1,data:{items:null,decor:null,mutations:null,eggs:null,pets:null,abilities:null,plants:null,weather:null},spritesResolved:!1,spritesResolving:null,weatherPollingTimer:null,weatherPollAttempts:0},je=(e,t)=>t.every(n=>e.includes(n));function Ve(e,t){K.data[e]==null&&(K.data[e]=t,$p()&&Ma())}function $p(){return Object.values(K.data).every(e=>e!=null)}function Pa(e,t){if(!e||typeof e!="object"||Aa.has(e))return;Aa.add(e);let n;try{n=po(e)}catch{return}if(!n||n.length===0)return;let o=e,r;if(!K.data.items&&je(n,Be.items)&&(r=o.WateringCan,r&&typeof r=="object"&&"coinPrice"in r&&"creditPrice"in r&&Ve("items",o)),!K.data.decor&&je(n,Be.decor)&&(r=o.SmallRock,r&&typeof r=="object"&&"coinPrice"in r&&"creditPrice"in r&&Ve("decor",o)),!K.data.mutations&&je(n,Be.mutations)&&(r=o.Gold,r&&typeof r=="object"&&"baseChance"in r&&"coinMultiplier"in r&&Ve("mutations",o)),!K.data.eggs&&je(n,Be.eggs)&&(r=o.CommonEgg,r&&typeof r=="object"&&"faunaSpawnWeights"in r&&"secondsToHatch"in r&&Ve("eggs",o)),!K.data.pets&&je(n,Be.pets)&&(r=o.Worm,r&&typeof r=="object"&&"coinsToFullyReplenishHunger"in r&&"diet"in r&&Array.isArray(r.diet)&&Ve("pets",o)),!K.data.abilities&&je(n,Be.abilities)&&(r=o.ProduceScaleBoost,r&&typeof r=="object"&&"trigger"in r&&"baseParameters"in r&&Ve("abilities",o)),!K.data.plants&&je(n,Be.plants)&&(r=o.Carrot,r&&typeof r=="object"&&"seed"in r&&"plant"in r&&"crop"in r&&Ve("plants",o)),!(t>=Vp))for(let i of n){let a;try{a=o[i]}catch{continue}a&&typeof a=="object"&&Pa(a,t+1)}}function co(e){try{Pa(e,0)}catch{}}function Ca(){if(!K.isHookInstalled){K.isHookInstalled=!0;try{Ce.keys=function(t){return co(t),po.apply(this,arguments)},ln&&(Ce.values=function(t){return co(t),ln.apply(this,arguments)}),cn&&(Ce.entries=function(t){return co(t),cn.apply(this,arguments)})}catch{}}}function Ma(){if(K.isHookInstalled){try{Ce.keys=po,ln&&(Ce.values=ln),cn&&(Ce.entries=cn)}catch{}K.isHookInstalled=!1}}function Up(){try{for(let e of uo.document?.scripts||[]){let t=e?.src?String(e.src):"";if(Ta.test(t))return t}}catch{}try{for(let e of uo.performance?.getEntriesByType?.("resource")||[]){let t=e?.name?String(e.name):"";if(Ta.test(t))return t}}catch{}return null}function Kp(e,t){let n=Math.max(e.lastIndexOf("const ",t),e.lastIndexOf("let ",t),e.lastIndexOf("var ",t));if(n<0)return null;let o=e.indexOf("=",n);if(o<0||o>t)return null;let r=e.indexOf("{",o);if(r<0||r>t)return null;let i=0,a="",s=!1;for(let l=r;l<e.length;l++){let c=e[l];if(a){if(s){s=!1;continue}if(c==="\\"){s=!0;continue}c===a&&(a="");continue}if(c==='"'||c==="'"){a=c;continue}if(c==="{")i++;else if(c==="}"&&--i===0)return e.slice(r,l+1)}return null}function qp(e){let t={},n=!1;for(let o of jp){let r=e?.[o];if(!r||typeof r!="object")continue;let i=r.iconSpriteKey||null,{iconSpriteKey:a,...s}=r;t[o]={weatherId:o,spriteId:i,...s},n=!0}return t.Sunny||(t.Sunny={weatherId:"Sunny",name:"Sunny",spriteId:"sprite/ui/SunnyIcon",type:"primary"}),!n||t.Rain&&t.Rain.mutator?.mutation!=="Wet"?null:t}async function Jp(){if(K.data.weather)return!0;let e=Up();if(!e)return!1;let t="";try{let s=await fetch(e,{credentials:"include"});if(!s.ok)return!1;t=await s.text()}catch{return!1}let n=t.indexOf("fixedTimeSlots:[0,48,96,144,192,240]");if(n<0&&(n=t.indexOf('name:"Amber Moon"')),n<0)return!1;let o=Kp(t,n);if(!o)return!1;let r=o.replace(/\b[A-Za-z_$][\w$]*\.(Rain|Frost|Dawn|AmberMoon)\b/g,'"$1"'),i;try{i=Function('"use strict";return('+r+")")()}catch{return!1}let a=qp(i);return a?(K.data.weather=a,!0):!1}function Xp(){if(K.weatherPollingTimer)return;K.weatherPollAttempts=0;let e=setInterval(async()=>{(await Jp()||++K.weatherPollAttempts>Fp)&&(clearInterval(e),K.weatherPollingTimer=null)},zp);K.weatherPollingTimer=e}function Yp(e){return String(e||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^A-Za-z0-9]/g,"").trim()}function Qp(e,t=[]){let n=new Set,o=r=>{let i=String(r||"").trim();i&&n.add(i)};o(e);for(let r of t)o(r);for(let r of Array.from(n.values()))r.endsWith("s")?o(r.slice(0,-1)):o(`${r}s`),r.endsWith("es")&&o(r.slice(0,-2));return Array.from(n.values()).filter(Boolean)}function Ia(e,t,n,o=[],r=[]){let i=Qp(e,o);if(!i.length)return null;let a=[t,...r].filter(u=>typeof u=="string"),s=u=>{let d=String(u||"").trim();if(!d)return null;for(let p of i)try{if(we.has(p,d))return we.getIdPath(p,d)}catch{}return null};for(let u of a){let d=s(u);if(d)return d}let l=Yp(n||""),c=s(l||n||"");if(c)return c;try{for(let u of i){let d=we.listIds(`sprite/${u}/`),p=a.map(g=>String(g||"").toLowerCase()),m=String(n||l||"").toLowerCase();for(let g of d){let b=(g.split("/").pop()||"").toLowerCase();if(p.some(h=>h&&h===b)||b===m)return g}for(let g of d){let b=(g.split("/").pop()||"").toLowerCase();if(p.some(h=>h&&b.includes(h))||m&&b.includes(m))return g}}}catch{}return null}function fe(e,t,n,o,r=[],i=[]){if(!e||typeof e!="object")return;let a=e.tileRef;if(!a||typeof a!="object")return;let s=String(a.spritesheet||t||"").trim(),l=Ia(s,n,o,r,i);if(l)try{e.spriteId=l}catch{}let c=e.rotationVariants;if(c&&typeof c=="object")for(let u of Object.values(c))fe(u,s,n,o);if(e.immatureTileRef){let u={tileRef:e.immatureTileRef};fe(u,s,n,o),u.spriteId&&(e.immatureSpriteId=u.spriteId)}if(e.topmostLayerTileRef){let u={tileRef:e.topmostLayerTileRef};fe(u,s,n,o),u.spriteId&&(e.topmostLayerSpriteId=u.spriteId)}e.activeState&&typeof e.activeState=="object"&&fe(e.activeState,s,n,e.activeState?.name||o)}function Zp(e,t,n,o=[]){if(!Array.isArray(t)||t.length===0)return null;let r=t[0],i=t.slice(1);return Ia(e,r,n??null,o,i)}function em(e){for(let[t,n]of Object.entries(e.items||{}))fe(n,"items",t,n?.name,["item"]);for(let[t,n]of Object.entries(e.decor||{}))fe(n,"decor",t,n?.name);for(let[t,n]of Object.entries(e.mutations||{})){fe(n,"mutations",t,n?.name,["mutation"]);let o=Zp("mutation-overlay",[`${t}TallPlant`,`${t}TallPlantIcon`,t],n?.name,["mutation-overlay"]);if(o)try{n.overlaySpriteId=o}catch{}}for(let[t,n]of Object.entries(e.eggs||{}))fe(n,"pets",t,n?.name,["pet"]);for(let[t,n]of Object.entries(e.pets||{}))fe(n,"pets",t,n?.name,["pet"]);for(let[t,n]of Object.entries(e.plants||{})){let o=n;o.seed&&fe(o.seed,o.seed?.tileRef?.spritesheet||"seeds",`${t}Seed`,o.seed?.name||`${t} Seed`,["seed","plant","plants"],[t]),o.plant&&fe(o.plant,o.plant?.tileRef?.spritesheet||"plants",`${t}Plant`,o.plant?.name||`${t} Plant`,["plant","plants","tallplants"],[t]),o.crop&&fe(o.crop,o.crop?.tileRef?.spritesheet||"plants",t,o.crop?.name||t,["plant","plants"],[`${t}Crop`])}}async function Ea(){if(!K.spritesResolved)return K.spritesResolving||(K.spritesResolving=(async()=>{try{await La(2e4,50),await we.init(),em(K.data),K.spritesResolved=!0}catch(e){try{console.warn("[MGData] sprite resolution failed",e)}catch{}}finally{K.spritesResolving=null}})()),K.spritesResolving}async function tm(){return K.isReady||(Ca(),Xp(),Ea(),K.isReady=!0),!0}function nm(){return K.isReady}function om(){return Ma(),K.weatherPollingTimer&&(clearInterval(K.weatherPollingTimer),K.weatherPollingTimer=null),K.isReady=!1,!0}function rm(){return!K.spritesResolved&&!K.spritesResolving&&Ea(),{...K.data}}function im(e){return K.data[e]??null}function am(e){return K.data[e]!=null}async function La(e=1e4,t=50){let n=Date.now();for(;Date.now()-n<e;){if(Object.values(K.data).some(o=>o!=null))return{...K.data};await Ae(t)}throw new Error("MGData.waitForAnyData: timeout")}async function sm(e,t=1e4,n=50){let o=Date.now();for(;Date.now()-o<t;){let r=K.data[e];if(r!=null)return r;await Ae(n)}throw new Error(`MGData.waitFor: timeout waiting for "${e}"`)}var At={init:tm,isReady:nm,stop:om,getAll:rm,get:im,has:am,waitForAnyData:La,waitFor:sm};Ca();Pe();var un=null,ye={ready:!1,xform:null,xformAt:0};function rt(e){try{if(typeof structuredClone=="function")return structuredClone(e)}catch{}try{return JSON.parse(JSON.stringify(e))}catch{}return e}function Pt(){return ie.tos()}function fo(){return ie.engine()}function lm(){let e=Pt()?.map?.cols;return Number.isFinite(e)&&e>0?e:null}function bo(e,t){let n=lm();return n?t*n+e|0:null}function Fe(e,t,n=!0){let o=Pt(),r=bo(e,t);if(!o||r==null)return{gidx:null,tv:null};let i=o.tileViews?.get?.(r)||null;if(!i&&n&&typeof o.getOrCreateTileView=="function")try{i=o.getOrCreateTileView(r)}catch{}return{gidx:r,tv:i||null}}function ot(e,t,n,o={}){let r=o.ensureView!==!1,i=o.forceUpdate!==!1,a=fo(),{gidx:s,tv:l}=Fe(Number(e),Number(t),r);if(s==null)throw new Error("MGTile: cols unavailable (engine/TOS not ready)");if(!l)throw new Error("MGTile: TileView unavailable (not instantiated)");let c=l.tileObject;if(typeof l.onDataChanged!="function")throw new Error("MGTile: tileView.onDataChanged not found (different API?)");if(l.onDataChanged(n),i&&a?.reusableContext&&typeof l.update=="function")try{l.update(a.reusableContext)}catch{}return{ok:!0,tx:Number(e),ty:Number(t),gidx:s,before:c,after:l.tileObject}}function ho(e,t){if(!e)throw new Error("MGTile: no tileObject on this tile");if(e.objectType!==t)throw new Error(`MGTile: expected objectType "${t}", got "${e.objectType}"`)}function mo(e,t){if("startTime"in t&&(e.startTime=Number(t.startTime)),"endTime"in t&&(e.endTime=Number(t.endTime)),"targetScale"in t&&(e.targetScale=Number(t.targetScale)),"mutations"in t){if(!Array.isArray(t.mutations))throw new Error("MGTile: mutations must be an array of strings");e.mutations=t.mutations.slice()}}function Me(){if(!ye.ready)throw new Error("MGTile: not ready. Call MGTile.init() first.")}function go(e){if(!e)return null;let t=r=>r&&(typeof r.getGlobalPosition=="function"||typeof r.toGlobal=="function"),n=["container","root","view","tile","ground","base","floor","bg","background","baseSprite","tileSprite","displayObject","gfx","graphics","sprite"];for(let r of n)if(t(e[r]))return e[r];if(t(e))return e;let o=[e.container,e.root,e.view,e.displayObject,e.tileSprite,e.gfx,e.graphics,e.sprite];for(let r of o)if(t(r))return r;try{for(let r of Object.keys(e))if(t(e[r]))return e[r]}catch{}return null}function dn(e){let t=ce(()=>e?.getGlobalPosition?.());if(t&&Number.isFinite(t.x)&&Number.isFinite(t.y))return{x:t.x,y:t.y};let n=ce(()=>e?.toGlobal?.({x:0,y:0}));return n&&Number.isFinite(n.x)&&Number.isFinite(n.y)?{x:n.x,y:n.y}:null}function cm(e){try{if(!e?.getBounds)return"center";let t=e.getBounds(),n=dn(e);if(!n||!t||!Number.isFinite(t.width)||!Number.isFinite(t.height))return"center";let o=t.x+t.width/2,r=t.y+t.height/2;return Math.hypot(n.x-o,n.y-r)<Math.hypot(n.x-t.x,n.y-t.y)?"center":"topleft"}catch{return"center"}}function um(){let e=Pt(),t=e?.map?.cols,n=e?.map?.rows;if(!e||!Number.isFinite(t)||t<=1)return null;let o=Number.isFinite(n)&&n>1?n:null,r=[[0,0],[1,1],[Math.min(2,t-2),0],[0,1]];o&&o>2&&r.push([Math.floor(t/2),Math.floor(o/2)]);for(let[i,a]of r){if(i<0||a<0||i>=t||o&&a>=o)continue;let s=Fe(i,a,!0).tv,l=i+1<t?Fe(i+1,a,!0).tv:null,c=Fe(i,a+1,!0).tv,u=go(s),d=go(l),p=go(c);if(!u||!d||!p)continue;let m=dn(u),g=dn(d),f=dn(p);if(!m||!g||!f)continue;let b={x:g.x-m.x,y:g.y-m.y},h={x:f.x-m.x,y:f.y-m.y},S=b.x*h.y-b.y*h.x;if(!Number.isFinite(S)||Math.abs(S)<1e-6)continue;let T=1/S,x={a:h.y*T,b:-h.x*T,c:-b.y*T,d:b.x*T},v={x:m.x-i*b.x-a*h.x,y:m.y-i*b.y-a*h.y},k=cm(u),I=k==="center"?v:{x:v.x+.5*(b.x+h.x),y:v.y+.5*(b.y+h.y)};return{ok:!0,cols:t,rows:o,vx:b,vy:h,inv:x,anchorMode:k,originCenter:I}}return null}async function dm(e=15e3){return ye.ready?!0:un||(un=(async()=>{if(await ie.init(e),!Pt())throw new Error("MGTile: engine captured but tileObject system not found");return ye.ready=!0,!0})(),un)}function pm(){return ie.hook()}function pn(e,t,n={}){Me();let o=n.ensureView!==!1,r=n.clone!==!1,{gidx:i,tv:a}=Fe(Number(e),Number(t),o);if(i==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!a)return{tx:Number(e),ty:Number(t),gidx:i,tileView:null,tileObject:void 0};let s=a.tileObject;return{tx:Number(e),ty:Number(t),gidx:i,tileView:a,tileObject:r?rt(s):s}}function mm(e,t,n={}){return Me(),ot(e,t,null,n)}function gm(e,t,n,o={}){Me();let i=pn(e,t,{...o,clone:!1}).tileView?.tileObject;ho(i,"plant");let a=rt(i);if(Array.isArray(a.slots)||(a.slots=[]),"plantedAt"in n&&(a.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(a.maturedAt=Number(n.maturedAt)),"species"in n&&(a.species=String(n.species)),"slotIdx"in n&&"slotPatch"in n){let s=Number(n.slotIdx)|0;if(!a.slots[s])throw new Error(`MGTile: plant slot ${s} doesn't exist`);return mo(a.slots[s],n.slotPatch),ot(e,t,a,o)}if("slots"in n){let s=n.slots;if(Array.isArray(s)){for(let l=0;l<s.length;l++)if(s[l]!=null){if(!a.slots[l])throw new Error(`MGTile: plant slot ${l} doesn't exist`);mo(a.slots[l],s[l])}}else if(s&&typeof s=="object")for(let l of Object.keys(s)){let c=Number(l)|0;if(Number.isFinite(c)){if(!a.slots[c])throw new Error(`MGTile: plant slot ${c} doesn't exist`);mo(a.slots[c],s[c])}}else throw new Error("MGTile: patch.slots must be array or object map");return ot(e,t,a,o)}return ot(e,t,a,o)}function fm(e,t,n,o={}){Me();let i=pn(e,t,{...o,clone:!1}).tileView?.tileObject;ho(i,"decor");let a=rt(i);return"rotation"in n&&(a.rotation=Number(n.rotation)),ot(e,t,a,o)}function bm(e,t,n,o={}){Me();let i=pn(e,t,{...o,clone:!1}).tileView?.tileObject;ho(i,"egg");let a=rt(i);return"plantedAt"in n&&(a.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(a.maturedAt=Number(n.maturedAt)),ot(e,t,a,o)}function hm(e,t,n,o={}){Me();let r=o.ensureView!==!1,i=o.forceUpdate!==!1,a=fo(),{gidx:s,tv:l}=Fe(Number(e),Number(t),r);if(s==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!l)throw new Error("MGTile: TileView unavailable");let c=l.tileObject,u=typeof n=="function"?n(rt(c)):n;if(l.onDataChanged(u),i&&a?.reusableContext&&typeof l.update=="function")try{l.update(a.reusableContext)}catch{}return{ok:!0,tx:Number(e),ty:Number(t),gidx:s,before:c,after:l.tileObject}}function ym(e,t,n={}){Me();let o=n.ensureView!==!1,{gidx:r,tv:i}=Fe(Number(e),Number(t),o);if(r==null)throw new Error("MGTile: cols unavailable");if(!i)return{ok:!0,tx:Number(e),ty:Number(t),gidx:r,tv:null,tileObject:void 0};let a=n.clone!==!1,s=i.tileObject;return{ok:!0,tx:Number(e),ty:Number(t),gidx:r,objectType:s?.objectType??null,tileObject:a?rt(s):s,tvKeys:Object.keys(i||{}).sort(),tileView:i}}function Ra(){return Me(),ye.xform=um(),ye.xformAt=Date.now(),{ok:!!ye.xform?.ok,xform:ye.xform}}function xm(e,t={}){if(Me(),!e||!Number.isFinite(e.x)||!Number.isFinite(e.y))return null;let n=Number.isFinite(t.maxAgeMs)?Number(t.maxAgeMs):1500;(!ye.xform?.ok||t.forceRebuild||Date.now()-ye.xformAt>n)&&Ra();let o=ye.xform;if(!o?.ok)return null;let r=e.x-o.originCenter.x,i=e.y-o.originCenter.y,a=o.inv.a*r+o.inv.b*i,s=o.inv.c*r+o.inv.d*i,l=Math.floor(a),c=Math.floor(s),u=[[l,c],[l+1,c],[l,c+1],[l+1,c+1]],d=null,p=1/0;for(let[m,g]of u){if(m<0||g<0||m>=o.cols||Number.isFinite(o.rows)&&o.rows!==null&&g>=o.rows)continue;let f=o.originCenter.x+m*o.vx.x+g*o.vy.x,b=o.originCenter.y+m*o.vx.y+g*o.vy.y,h=(e.x-f)**2+(e.y-b)**2;h<p&&(p=h,d={tx:m,ty:g,fx:a,fy:s,x:e.x,y:e.y,gidx:null})}return d?(d.gidx=bo(d.tx,d.ty),d):null}function vm(){return["MGTile.init()","MGTile.hook()","MGTile.getTileObject(tx,ty) / inspect(tx,ty)","MGTile.setTileEmpty(tx,ty)","MGTile.setTilePlant(tx,ty,{...}) / setTileDecor / setTileEgg","MGTile.setTileObjectRaw(tx,ty,objOrFn)","MGTile.rebuildTransform() / pointToTile({x,y})"].join(`
`)}var Se={init:dm,ready:()=>ye.ready,hook:pm,engine:()=>fo(),tos:()=>Pt(),gidx:(e,t)=>bo(Number(e),Number(t)),getTileObject:pn,inspect:ym,setTileEmpty:mm,setTilePlant:gm,setTileDecor:fm,setTileEgg:bm,setTileObjectRaw:hm,rebuildTransform:Ra,pointToTile:xm,help:vm};Pe();var V={ready:!1,app:null,renderer:null,stage:null,ticker:null,tileSets:new Map,highlights:new Map,watches:new Map,fades:new Map,fadeWatches:new Map},So=e=>!!e&&typeof e=="object"&&!Array.isArray(e),yo=e=>!!(e&&typeof e.getBounds=="function"&&("parent"in e||"children"in e)),gn=e=>!!(e&&typeof e.tint=="number"),ze=e=>!!(e&&typeof e.alpha=="number");function mn(e,t,n){return e+(t-e)*n}function wm(e,t,n){let o=e>>16&255,r=e>>8&255,i=e&255,a=t>>16&255,s=t>>8&255,l=t&255,c=mn(o,a,n)|0,u=mn(r,s,n)|0,d=mn(i,l,n)|0;return c<<16|u<<8|d}function Sm(e,t=900){let n=[],o=[e];for(;o.length&&n.length<t;){let r=o.pop();if(!r)continue;gn(r)&&n.push(r);let i=r.children;if(Array.isArray(i))for(let a=i.length-1;a>=0;a--)o.push(i[a])}return n}function km(e,t=25e3){let n=[],o=[e],r=0;for(;o.length&&r++<t;){let i=o.pop();if(!i)continue;ze(i)&&n.push(i);let a=i.children;if(Array.isArray(a))for(let s=a.length-1;s>=0;s--)o.push(a[s])}return n}function Oa(e){if(!Array.isArray(e))return[];let t=new Set,n=[];for(let o of e){let r,i;if(Array.isArray(o))r=o[0],i=o[1];else if(So(o))r=o.x??o.tx,i=o.y??o.ty;else continue;if(r=Number(r),i=Number(i),!Number.isFinite(r)||!Number.isFinite(i))continue;r|=0,i|=0;let a=`${r},${i}`;t.has(a)||(t.add(a),n.push({x:r,y:i}))}return n}function Tm(e,t){let n=String(e||"").trim();if(!n)throw new Error("MGPixi.defineTileSet: empty name");let o=Oa(t);return V.tileSets.set(n,o),{ok:!0,name:n,count:o.length}}function Am(e){return V.tileSets.delete(String(e||"").trim())}function Pm(){return Array.from(V.tileSets.keys()).sort((e,t)=>e.localeCompare(t))}function Ha(e){return!!(e&&(e.tileSet!=null||Array.isArray(e.tiles)))}function ko(e){let n=Se.tos?.()?.tileViews;if(!n?.entries)throw new Error("MGPixi: TOS.tileViews not found");if(!Ha(e))return{entries:Array.from(n.entries()),gidxSet:null};let o=[];if(e.tileSet!=null){let i=String(e.tileSet||"").trim(),a=V.tileSets.get(i);if(!a)throw new Error(`MGPixi: tileSet not found "${i}"`);o=a}else o=Oa(e.tiles||[]);let r=new Map;for(let i of o){let a=Se.getTileObject(i.x,i.y,{ensureView:!0,clone:!1});a?.tileView&&a.gidx!=null&&r.set(a.gidx,a.tileView)}return{entries:Array.from(r.entries()),gidxSet:new Set(r.keys())}}function To(e){let t=V.highlights.get(e);if(!t)return!1;ce(()=>V.ticker?.remove(t.tick)),t.root&&t.baseAlpha!=null&&ze(t.root)&&ce(()=>{t.root.alpha=t.baseAlpha});for(let n of t.tint)n.o&&gn(n.o)&&ce(()=>{n.o.tint=n.baseTint});return V.highlights.delete(e),!0}function _a(e=null){for(let t of Array.from(V.highlights.keys()))e&&!String(t).startsWith(e)||To(t);return!0}function Da(e,t={}){if($e(),!yo(e))throw new Error("MGPixi.highlightPulse: invalid root");let n=String(t.key||`hl:${Math.random().toString(16).slice(2)}`);if(V.highlights.has(n))return n;let o=ze(e)?Number(e.alpha):null,r=de(Number(t.minAlpha??.12),0,1),i=de(Number(t.maxAlpha??1),0,1),a=Number(t.speed??1.25),s=(t.tint??8386303)>>>0,l=de(Number(t.tintMix??.85),0,1),c=t.deepTint!==!1,u=[];if(c)for(let m of Sm(e))u.push({o:m,baseTint:m.tint});else gn(e)&&u.push({o:e,baseTint:e.tint});let d=performance.now(),p=()=>{let m=(performance.now()-d)/1e3,g=(Math.sin(m*Math.PI*2*a)+1)/2,f=g*g*(3-2*g);o!=null&&ze(e)&&(e.alpha=de(mn(r,i,f)*o,0,1));let b=f*l;for(let h of u)h.o&&gn(h.o)&&(h.o.tint=wm(h.baseTint,s,b))};return V.ticker?.add(p),V.highlights.set(n,{root:e,tick:p,baseAlpha:o,tint:u}),n}var Cm=["plantVisual","cropVisual","slotVisual","slotView","displayObject","view","container","root","sprite","gfx","graphics"];function xo(e){if(!e)return null;if(yo(e))return e;if(!So(e))return null;for(let t of Cm){let n=e[t];if(yo(n))return n}return null}function Mm(e,t){let n=[{o:e,d:0}],o=new Set,r=6;for(;n.length;){let{o:i,d:a}=n.shift();if(!(!i||a>r)&&!o.has(i)){if(o.add(i),Array.isArray(i)){if(i.length===t){let s=new Array(t),l=!0;for(let c=0;c<t;c++){let u=xo(i[c]);if(!u){l=!1;break}s[c]=u}if(l)return s}for(let s of i)n.push({o:s,d:a+1});continue}if(So(i)){let s=i;for(let l of Object.keys(s))n.push({o:s[l],d:a+1})}}}return null}function Im(e,t){let n=e?.mutations;if(!Array.isArray(n))return!1;for(let o of n)if(String(o||"").toLowerCase()===t)return!0;return!1}function Ga(e,t={}){$e();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.highlightMutation: empty mutation");let{entries:o,gidxSet:r}=ko(t),i=`hlmut:${n}:`;if(t.clear===!0)if(!r)_a(i);else for(let d of Array.from(V.highlights.keys())){if(!d.startsWith(i))continue;let p=d.split(":"),m=Number(p[2]);r.has(m)&&To(d)}let a={tint:(t.tint??8386303)>>>0,minAlpha:Number(t.minAlpha??.12),maxAlpha:Number(t.maxAlpha??1),speed:Number(t.speed??1.25),tintMix:Number(t.tintMix??.85),deepTint:t.deepTint!==!1},s=0,l=0,c=0,u=0;for(let[d,p]of o){let m=p?.tileObject;if(!m||m.objectType!=="plant")continue;let g=m.slots;if(!Array.isArray(g)||g.length===0)continue;let f=!1,b=[];for(let T=0;T<g.length;T++)Im(g[T],n)&&(b.push(T),f=!0);if(!f)continue;s++,l+=b.length;let h=p?.childView?.plantVisual||p?.childView||p,S=Mm(h,g.length);if(!S){u+=b.length;continue}for(let T of b){let x=S[T];if(!x){u++;continue}let v=`${i}${d}:${T}`;V.highlights.has(v)||(Da(x,{key:v,...a}),c++)}}return{ok:!0,mutation:n,filtered:!!r,plantsMatched:s,matchedSlots:l,newHighlights:c,failedSlots:u}}function Em(e,t={}){$e();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchMutation: empty mutation");let o=`watchmut:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,r=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,i=V.watches.get(o);i&&clearInterval(i);let a=setInterval(()=>{ce(()=>Ga(n,{...t,clear:!1}))},r);return V.watches.set(o,a),{ok:!0,key:o,mutation:n,intervalMs:r}}function Lm(e){let t=String(e||"").trim();if(!t)return!1;if(!t.startsWith("watchmut:")){let o=t.toLowerCase(),r=0;for(let[i,a]of Array.from(V.watches.entries()))i.startsWith(`watchmut:${o}:`)&&(clearInterval(a),V.watches.delete(i),r++);return r>0}let n=V.watches.get(t);return n?(clearInterval(n),V.watches.delete(t),!0):!1}function Rm(e){let t=Array.isArray(e?.slots)?e.slots:[];return{objectType:"plant",species:e?.species??null,plantedAt:e?.plantedAt??null,maturedAt:e?.maturedAt??null,slotCount:t.length,slots:t.map((n,o)=>({idx:o,mutations:Array.isArray(n?.mutations)?n.mutations.slice():[]}))}}function Om(e,t,n={}){$e();let o=Number(e)|0,r=Number(t)|0,i=n.ensureView!==!1,a=Se.getTileObject(o,r,{ensureView:i,clone:!1}),s=a?.tileView||null,l=s?.tileObject,c={ok:!0,tx:o,ty:r,gidx:a?.gidx??Se.gidx?.(o,r)??null,hasTileView:!!s,objectType:l?.objectType??null,tileObject:l??null,summary:l?.objectType==="plant"?Rm(l):l?{objectType:l.objectType??null}:null,display:s?s.childView?.plantVisual||s.childView||s.displayObject||s:null};return n.log!==!1&&ce(()=>console.log("[MGPixi.inspectTile]",c)),c}function Hm(e){let t=e?.childView?.plantVisual||e?.childView?.cropVisual||e?.childView||e?.displayObject||e;return xo(t)||xo(e?.displayObject)||null}function Na(e){let t=V.fades.get(e);if(!t)return!1;for(let n of t.targets)n.o&&ze(n.o)&&Number.isFinite(n.baseAlpha)&&ce(()=>{n.o.alpha=n.baseAlpha});return V.fades.delete(e),!0}function vo(e=null){for(let t of Array.from(V.fades.keys()))e&&!String(t).startsWith(e)||Na(t);return!0}function Wa(e,t={}){$e();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.clearSpeciesFade: empty species");let o=`fade:${n}:`;if(!Ha(t))return vo(o);let{gidxSet:r}=ko(t);if(!r)return vo(o);for(let i of Array.from(V.fades.keys())){if(!i.startsWith(o))continue;let a=Number(i.slice(o.length));r.has(a)&&Na(i)}return!0}function Ba(e,t={}){$e();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.fadeSpecies: empty species");let o=de(Number(t.alpha??.2),0,1),r=t.deep===!0,{entries:i,gidxSet:a}=ko(t),s=`fade:${n}:`;t.clear===!0&&Wa(n,t);let l=0,c=0,u=0,d=0;for(let[p,m]of i){let g=m?.tileObject;if(!g||g.objectType!=="plant")continue;l++;let f=String(g.species||"").trim().toLowerCase();if(!f||f!==n)continue;c++;let b=Hm(m);if(!b||!ze(b)){d++;continue}let h=`${s}${p}`;if(V.fades.has(h)){ce(()=>{b.alpha=o}),u++;continue}let S=r?km(b):[b],T=[];for(let x of S)ze(x)&&T.push({o:x,baseAlpha:Number(x.alpha)});for(let x of T)ce(()=>{x.o.alpha=o});V.fades.set(h,{targets:T}),u++}return{ok:!0,species:n,alpha:o,deep:r,filtered:!!a,plantsSeen:l,matchedPlants:c,applied:u,failed:d,totalFades:V.fades.size}}function _m(e,t={}){$e();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchFadeSpecies: empty species");let o=`watchfade:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,r=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,i=V.fadeWatches.get(o);i&&clearInterval(i);let a=setInterval(()=>{ce(()=>Ba(n,{...t,clear:!1}))},r);return V.fadeWatches.set(o,a),{ok:!0,key:o,species:n,intervalMs:r}}function Dm(e){let t=String(e||"").trim();if(!t)return!1;if(!t.startsWith("watchfade:")){let o=t.toLowerCase(),r=0;for(let[i,a]of Array.from(V.fadeWatches.entries()))i.startsWith(`watchfade:${o}:`)&&(clearInterval(a),V.fadeWatches.delete(i),r++);return r>0}let n=V.fadeWatches.get(t);return n?(clearInterval(n),V.fadeWatches.delete(t),!0):!1}function wo(){let e=A;return e.$PIXI=e.PIXI||null,e.$app=V.app||null,e.$renderer=V.renderer||null,e.$stage=V.stage||null,e.$ticker=V.ticker||null,e.__MG_PIXI__={PIXI:e.$PIXI,app:e.$app,renderer:e.$renderer,stage:e.$stage,ticker:e.$ticker,ready:V.ready},e.__MG_PIXI__}function $e(){if(!V.ready)throw new Error("MGPixi: call MGPixi.init() first")}async function Gm(e=15e3){if(V.ready)return wo(),!0;if(await ie.init(e),V.app=ie.app(),V.ticker=ie.ticker(),V.renderer=ie.renderer(),V.stage=ie.stage(),!V.app||!V.ticker)throw new Error("MGPixi: PIXI app/ticker not found");return V.ready=!0,wo(),!0}var Ct={init:Gm,ready:()=>V.ready,expose:wo,get app(){return V.app},get renderer(){return V.renderer},get stage(){return V.stage},get ticker(){return V.ticker},get PIXI(){return A.PIXI||null},defineTileSet:Tm,deleteTileSet:Am,listTileSets:Pm,highlightPulse:Da,stopHighlight:To,clearHighlights:_a,highlightMutation:Ga,watchMutation:Em,stopWatchMutation:Lm,inspectTile:Om,fadeSpecies:Ba,clearSpeciesFade:Wa,clearFades:vo,watchFadeSpecies:_m,stopWatchFadeSpecies:Dm};Pe();var ja=A??window,Nm={sfx:"soundEffectsVolume",music:"musicVolume",ambience:"ambienceVolume"},Wm={sfx:"soundEffectsVolumeAtom",music:"musicVolumeAtom",ambience:"ambienceVolumeAtom"},Mt=.001,It=.2,fn=null,z={ready:!1,baseUrl:null,urls:{ambience:new Map,music:new Map},sfx:{mp3Url:null,atlasUrl:null,atlas:null,groups:new Map,buffer:null},tracks:{ambience:null,music:null},ctx:null};function Lt(){if(!z.ready)throw new Error("MGAudio not ready yet")}function Va(e,t=NaN){try{let n=localStorage.getItem(e);if(n==null)return t;let o;try{o=JSON.parse(n)}catch{o=n}if(typeof o=="number"&&Number.isFinite(o))return o;if(typeof o=="string"){let r=parseFloat(o);if(Number.isFinite(r))return r}}catch{}return t}function Et(e){let t=Nm[e],n=Wm[e];if(!t)return{atom:It,vol100:bn(It)};let o=Va(t,NaN);if(Number.isFinite(o)){let i=de(o,0,1);return{atom:i,vol100:bn(i)}}if(n){let i=Va(n,NaN);if(Number.isFinite(i)){let a=de(i,0,1);return{atom:a,vol100:bn(a)}}}let r=It;return{atom:r,vol100:bn(r)}}function Bm(e){let t=Number(e);if(!Number.isFinite(t))return null;if(t<=0)return 0;let o=(de(t,1,100)-1)/99;return Mt+o*(It-Mt)}function bn(e){let t=de(Number(e),0,1);if(t<=Mt)return 0;let n=(t-Mt)/(It-Mt);return Math.round(1+n*99)}function Fa(e,t){if(t==null)return Et(e).atom;let n=Bm(t);return n===null?Et(e).atom:qn(n)}async function za(){let e=z.ctx;if(e)return e;let t=ja.AudioContext||ja.webkitAudioContext;if(!t)throw new Error("WebAudio not supported");let n=new t;return z.ctx=n,n}async function $a(){if(z.ctx&&z.ctx.state==="suspended")try{await z.ctx.resume()}catch{}}function jm(e){let t=new Map,n=(o,r)=>{t.has(o)||t.set(o,[]),t.get(o).push(r)};for(let o of Object.keys(e||{})){let r=/^(.*)_([A-Z])$/.exec(o);r?.[1]?n(r[1],o):n(o,o)}for(let[o,r]of Array.from(t.entries()))r.sort((i,a)=>i.localeCompare(a)),t.set(o,r);z.sfx.groups=t}function Vm(e){let t=z.sfx.atlas;if(!t)throw new Error("SFX atlas not loaded");if(t[e])return e;let n=z.sfx.groups.get(e);if(n?.length)return n[Math.random()*n.length|0];throw new Error(`Unknown sfx/group: ${e}`)}async function Fm(){if(z.sfx.buffer)return z.sfx.buffer;if(!z.sfx.mp3Url)throw new Error("SFX mp3 url missing");let e=await za();await $a();let n=await(await Zt(z.sfx.mp3Url)).arrayBuffer(),o=await new Promise((r,i)=>{let a=e.decodeAudioData(n,r,i);a?.then&&a.then(r,i)});return z.sfx.buffer=o,o}async function zm(e,t={}){if(!z.ready)throw new Error("MGAudio not ready yet");let n=String(e||"").trim();if(!n)throw new Error("Missing sfx name");let o=Vm(n),r=z.sfx.atlas[o];if(!r)throw new Error(`Missing segment for sfx: ${o}`);let i=await za();await $a();let a=await Fm(),s=Math.max(0,+r.start||0),l=Math.max(s,+r.end||s),c=Math.max(.01,l-s),u=Fa("sfx",t.volume),d=i.createGain();d.gain.value=u,d.connect(i.destination);let p=i.createBufferSource();return p.buffer=a,p.connect(d),p.start(0,s,c),{name:o,source:p,start:s,end:l,duration:c,volume:u}}function Ua(e){if(e!=="music"&&e!=="ambience")return!1;let t=z.tracks[e];if(t){try{t.pause()}catch{}try{t.src=""}catch{}}return z.tracks[e]=null,!0}function $m(e,t,n={}){if(!z.ready)throw new Error("MGAudio not ready yet");if(e!=="music"&&e!=="ambience")throw new Error(`Invalid category: ${e}`);let o=z.urls[e].get(t);if(!o)throw new Error(`Unknown ${e}: ${t}`);Ua(e);let r=new Audio(o);return r.loop=!!n.loop,r.volume=Fa(e,n.volume),r.preload="auto",r.play().catch(()=>{}),z.tracks[e]=r,r}async function Um(e,t,n={}){let o=String(e||"").trim(),r=String(t||"").trim();if(!o||!r)throw new Error("play(category, asset) missing args");if(o==="sfx")return zm(r,n);if(o==="music"||o==="ambience")return $m(o,r,n);throw new Error(`Unknown category: ${o}`)}function Km(e,t={}){let n=String(e||"").trim();return n==="music"||n==="ambience"?Array.from(z.urls[n].keys()).sort():n==="sfx"?z.sfx.atlas?t.groups?Array.from(z.sfx.groups.keys()).sort():Object.keys(z.sfx.atlas).sort():[]:[]}function qm(){return z.tracks.music&&(z.tracks.music.volume=Et("music").atom),z.tracks.ambience&&(z.tracks.ambience.volume=Et("ambience").atom),!0}function Jm(){return Lt(),["sfx","music","ambience"]}function Xm(){return Lt(),Array.from(z.sfx.groups.keys()).sort((e,t)=>e.localeCompare(t))}function Ym(e,t){Lt();let n=String(e||"").trim().toLowerCase(),o=String(t||"").trim();if(!o||n!=="music"&&n!=="ambience")return!1;let r=z.urls[n],i=o.toLowerCase();for(let a of r.keys())if(a.toLowerCase()===i)return!0;return!1}function Qm(e){Lt();let t=String(e||"").trim();if(!t)return!1;let n=t.toLowerCase();for(let o of z.sfx.groups.keys())if(o.toLowerCase()===n)return!0;return!1}function Zm(e,t){Lt();let n=String(e||"").trim().toLowerCase(),o=String(t||"").trim();if(!o)throw new Error("getTrackUrl(category, name) missing name");if(n!=="music"&&n!=="ambience")throw new Error(`Invalid category: ${e}`);let r=z.urls[n],i=o.toLowerCase();for(let[a,s]of r.entries())if(a.toLowerCase()===i)return s;return null}async function eg(){return z.ready?!0:fn||(fn=(async()=>{z.baseUrl=await he.base();let e=await pe.load(z.baseUrl),t=pe.getBundle(e,"audio");if(!t)throw new Error("No audio bundle in manifest");for(let n of t.assets||[])for(let o of n.src||[]){if(typeof o!="string")continue;let r=/^audio\/(ambience|music)\/(.+)\.mp3$/i.exec(o);if(r){let i=r[1].toLowerCase(),a=r[2];z.urls[i].set(a,ue(z.baseUrl,o));continue}/^audio\/sfx\/sfx\.mp3$/i.test(o)&&(z.sfx.mp3Url=ue(z.baseUrl,o)),/^audio\/sfx\/sfx\.json$/i.test(o)&&(z.sfx.atlasUrl=ue(z.baseUrl,o))}if(!z.sfx.atlasUrl)throw new Error("Missing audio/sfx/sfx.json in manifest");return z.sfx.atlas=await Qe(z.sfx.atlasUrl),jm(z.sfx.atlas),z.ready=!0,!0})(),fn)}var Rt={init:eg,ready:()=>z.ready,play:Um,stop:Ua,list:Km,refreshVolumes:qm,categoryVolume:Et,getCategories:Jm,getGroups:Xm,hasTrack:Ym,hasGroup:Qm,getTrackUrl:Zm};var Ao=A?.document??document,hn=null,Q={ready:!1,baseUrl:null,byCat:new Map,byBase:new Map,overlay:null,live:new Set,defaultParent:null};function tg(){if(Q.overlay)return Q.overlay;let e=Ao.createElement("div");return e.id="MG_COSMETIC_OVERLAY",e.style.cssText=["position:fixed","left:0","top:0","width:100vw","height:100vh","pointer-events:none","z-index:99999999"].join(";"),Ao.documentElement.appendChild(e),Q.overlay=e,e}function ng(){let e=Q.defaultParent;if(!e)return null;try{return typeof e=="function"?e():e}catch{return null}}function Po(e){let t=String(e||"").trim();return t?(t=t.replace(/^cosmetic\//i,""),t=t.replace(/\.png$/i,""),t):""}function og(e,t){if(t===void 0){let i=Po(e),a=i.indexOf("_");return a<0?{cat:"",asset:i,base:i}:{cat:i.slice(0,a),asset:i.slice(a+1),base:i}}let n=String(e||"").trim(),o=Po(t),r=o.includes("_")?o:`${n}_${o}`;if(o.includes("_")&&!n){let i=o.indexOf("_");return{cat:o.slice(0,i),asset:o.slice(i+1),base:o}}return{cat:n,asset:o.replace(/^.+?_/,""),base:r}}function rg(){return Array.from(Q.byCat.keys()).sort((e,t)=>e.localeCompare(t))}function ig(e){let t=Q.byCat.get(String(e||"").trim());return t?Array.from(t.keys()).sort((n,o)=>n.localeCompare(o)):[]}function Co(e,t){let{cat:n,asset:o,base:r}=og(e,t),i=Q.byBase.get(r);if(i)return i;let s=Q.byCat.get(n)?.get(o);if(s)return s;if(!Q.baseUrl)throw new Error("MGCosmetic not initialized");if(!r)throw new Error("Invalid cosmetic name");return ue(Q.baseUrl,`cosmetic/${r}.png`)}function Mo(e,t,n){if(!Q.ready)throw new Error("MGCosmetic not ready yet");let o,r;typeof t=="object"&&t!==null?(o=t,r=void 0):typeof t=="string"?(r=t,o=n||{}):(r=void 0,o=n||{});let i=r!==void 0?Co(e,r):Co(e),a=Ao.createElement("img");if(a.decoding="async",a.loading="eager",a.src=i,a.alt=o.alt!=null?String(o.alt):Po(r??e),o.className&&(a.className=String(o.className)),o.width!=null&&(a.style.width=String(o.width)),o.height!=null&&(a.style.height=String(o.height)),o.opacity!=null&&(a.style.opacity=String(o.opacity)),o.style&&typeof o.style=="object")for(let[s,l]of Object.entries(o.style))try{a.style[s]=String(l)}catch{}return a}function ag(e,t,n){let o,r;typeof t=="object"&&t!==null?(o=t,r=void 0):typeof t=="string"?(r=t,o=n||{}):(r=void 0,o=n||{});let i=o.parent||ng()||tg(),a=r!==void 0?Mo(e,r,o):Mo(e,o);if(i===Q.overlay||o.center||o.x!=null||o.y!=null||o.absolute){a.style.position="absolute",a.style.pointerEvents="none",a.style.zIndex=String(o.zIndex??999999);let l=o.scale??1,c=o.rotation??0;if(o.center)a.style.left="50%",a.style.top="50%",a.style.transform=`translate(-50%, -50%) scale(${l}) rotate(${c}rad)`;else{let u=o.x??innerWidth/2,d=o.y??innerHeight/2;a.style.left=`${u}px`,a.style.top=`${d}px`,a.style.transform=`scale(${l}) rotate(${c}rad)`,o.anchor==="center"&&(a.style.transform=`translate(-50%, -50%) scale(${l}) rotate(${c}rad)`)}}return i.appendChild(a),Q.live.add(a),a.__mgDestroy=()=>{try{a.remove()}catch{}Q.live.delete(a)},a}function sg(e){return Q.defaultParent=e,!0}function lg(){for(let e of Array.from(Q.live))e.__mgDestroy?.()}async function cg(){return Q.ready?!0:hn||(hn=(async()=>{Q.baseUrl=await he.base();let e=await pe.load(Q.baseUrl),t=pe.getBundle(e,"cosmetic");if(!t)throw new Error("No 'cosmetic' bundle in manifest");Q.byCat.clear(),Q.byBase.clear();for(let n of t.assets||[])for(let o of n.src||[]){if(typeof o!="string"||!/^cosmetic\/.+\.png$/i.test(o))continue;let i=o.split("/").pop().replace(/\.png$/i,""),a=i.indexOf("_");if(a<0)continue;let s=i.slice(0,a),l=i.slice(a+1),c=ue(Q.baseUrl,o);Q.byBase.set(i,c),Q.byCat.has(s)||Q.byCat.set(s,new Map),Q.byCat.get(s).set(l,c)}return Q.ready=!0,!0})(),hn)}var Ot={init:cg,ready:()=>Q.ready,categories:rg,list:ig,url:Co,create:Mo,show:ag,attach:sg,clear:lg};async function Ka(e){let t=[{name:"Data",init:()=>At.init()},{name:"Sprites",init:()=>we.init()},{name:"TileObjectSystem",init:()=>Se.init()},{name:"Pixi",init:()=>Ct.init()},{name:"Audio",init:()=>Rt.init()},{name:"Cosmetics",init:()=>Ot.init()}];await Promise.all(t.map(async n=>{e?.({status:"start",name:n.name});try{await n.init(),e?.({status:"success",name:n.name})}catch(o){console.error(`[${n.name}] failed`,o),e?.({status:"error",name:n.name,error:o})}})),console.log("[Gemini] Modules ready. Access via Gemini.Modules in console.")}function Io(e,t){if(e===t)return!0;if(e===null||t===null)return e===t;if(typeof e!=typeof t)return!1;if(typeof e!="object")return e===t;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return!1;for(let a=0;a<e.length;a++)if(!Io(e[a],t[a]))return!1;return!0}if(Array.isArray(e)||Array.isArray(t))return!1;let n=e,o=t,r=Object.keys(n),i=Object.keys(o);if(r.length!==i.length)return!1;for(let a of r)if(!Object.prototype.hasOwnProperty.call(o,a)||!Io(n[a],o[a]))return!1;return!0}function ug(e,t,n,o=Io){let r=new Set,i=n,a=n,s=!1,l={values:{},ready:new Set,unsubscribes:[]},c=Object.keys(e),u=c.length;function d(){if(l.ready.size<u)return;let m=t(l.values);if(!o(i,m)&&(a=i,i=m,s))for(let g of r)g(i,a)}async function p(){if(s)return;let m=c.map(async g=>{let f=e[g],b=await Z.subscribe(f,h=>{l.values[g]=h,l.ready.add(g),d()});l.unsubscribes.push(b)});await Promise.all(m),s=!0,l.ready.size===u&&(i=t(l.values))}return p(),{get(){return i},subscribe(m){return r.add(m),s&&l.ready.size===u&&m(i,i),()=>{r.delete(m)}},destroy(){for(let m of l.unsubscribes)m();l.unsubscribes.length=0,r.clear(),s=!1}}}function qa(e,t,n,o){let r=null;return()=>(r||(r=ug(e,t,n,o)),r)}var dg={currentGardenTile:"myCurrentGardenTileAtom",globalTileIndex:"myCurrentGlobalTileIndexAtom",gardenObject:"myCurrentGardenObjectAtom",isMature:"isGardenObjectMatureAtom",isInMyGarden:"isInMyGardenAtom",gardenName:"currentGardenNameAtom",sortedSlotIndices:"myCurrentSortedGrowSlotIndicesAtom",currentGrowSlotIndex:"myCurrentGrowSlotIndexAtom"};function pg(e){let t=e.currentGardenTile;return{globalIndex:e.globalTileIndex,localIndex:t?.localTileIndex??null}}function mg(e){return{type:e.currentGardenTile?.tileType??null,isEmpty:e.gardenObject===null}}function gg(e){let t=e.currentGardenTile;return{name:e.gardenName,isOwner:e.isInMyGarden??!1,playerSlotIndex:t?.userSlotIdx??null}}function fg(e){let t=e.gardenObject;return t?{type:t.objectType,data:t,isMature:e.isMature??!1}:{type:null,data:null,isMature:!1}}function bg(e){let t=e.gardenObject;if(!t||t.objectType!=="plant")return null;let n=t,o=e.sortedSlotIndices??[];return{species:n.species,slots:n.slots??[],currentSlotIndex:e.currentGrowSlotIndex,sortedSlotIndices:o,nextHarvestSlotIndex:o.length>0?o[0]:null}}function hg(e){return{position:pg(e),tile:mg(e),garden:gg(e),object:fg(e),plant:bg(e)}}var yg={position:{globalIndex:null,localIndex:null},tile:{type:null,isEmpty:!0},garden:{name:null,isOwner:!1,playerSlotIndex:null},object:{type:null,data:null,isMature:!1},plant:null},Eo=qa(dg,hg,yg);var Ja={inventory:"myPetInventoryAtom",hutch:"myPetHutchPetItemsAtom",active:"myPetInfosAtom",slotInfos:"myPetSlotInfosAtom"};function Xa(e,t){return{id:e.id,petSpecies:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,mutations:[...e.mutations],targetScale:e.targetScale,abilities:[...e.abilities],location:t,position:null,lastAbilityTrigger:null}}function xg(e,t){let o=t[e.slot.id]?.lastAbilityTrigger??null;return{id:e.slot.id,petSpecies:e.slot.petSpecies,name:e.slot.name,xp:e.slot.xp,hunger:e.slot.hunger,mutations:[...e.slot.mutations],targetScale:e.slot.targetScale,abilities:[...e.slot.abilities],location:"active",position:e.position?{x:e.position.x,y:e.position.y}:null,lastAbilityTrigger:o}}function Ya(e){let t=new Set,n=[];for(let a of e.active??[]){let s=xg(a,e.slotInfos??{});n.push(s),t.add(s.id)}let o=[];for(let a of e.inventory??[]){if(t.has(a.id))continue;let s=Xa(a,"inventory");o.push(s),t.add(s.id)}let r=[];for(let a of e.hutch??[]){if(t.has(a.id))continue;let s=Xa(a,"hutch");r.push(s),t.add(s.id)}let i=[...n,...o,...r];return{all:i,byLocation:{inventory:o,hutch:r,active:n},counts:{inventory:o.length,hutch:r.length,active:n.length,total:i.length}}}var Qa={all:[],byLocation:{inventory:[],hutch:[],active:[]},counts:{inventory:0,hutch:0,active:0,total:0}};function vg(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}function Za(e){return JSON.stringify({id:e.id,petSpecies:e.petSpecies,name:e.name,mutations:e.mutations,abilities:e.abilities,location:e.location})}function wg(e,t){if(e.all.length!==t.all.length)return!1;let n=e.all.map(Za),o=t.all.map(Za);return vg(n,o)}function Ro(e,t){if(e===t)return!0;if(e===null||t===null)return e===t;if(typeof e!=typeof t)return!1;if(typeof e!="object")return e===t;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return!1;for(let a=0;a<e.length;a++)if(!Ro(e[a],t[a]))return!1;return!0}if(Array.isArray(e)||Array.isArray(t))return!1;let n=e,o=t,r=Object.keys(n),i=Object.keys(o);if(r.length!==i.length)return!1;for(let a of r)if(!Object.prototype.hasOwnProperty.call(o,a)||!Ro(n[a],o[a]))return!1;return!0}function Sg(e,t){let n=[],o=new Map(e.all.map(r=>[r.id,r]));for(let r of t.all){let i=o.get(r.id);i&&i.location!==r.location&&n.push({pet:r,from:i.location,to:r.location})}return n}function kg(e,t){let n=[],o=new Map(e.all.map(r=>[r.id,r]));for(let r of t.all){if(!r.lastAbilityTrigger)continue;let a=o.get(r.id)?.lastAbilityTrigger;(!a||a.abilityId!==r.lastAbilityTrigger.abilityId||a.performedAt!==r.lastAbilityTrigger.performedAt)&&n.push({pet:r,trigger:r.lastAbilityTrigger})}return n}function Tg(e,t){let n=new Set(e.all.map(a=>a.id)),o=new Set(t.all.map(a=>a.id)),r=t.all.filter(a=>!n.has(a.id)),i=e.all.filter(a=>!o.has(a.id));return r.length===0&&i.length===0?null:{added:r,removed:i,counts:t.counts}}function Ag(){let e=Qa,t=Qa,n=!1,o=[],r={all:new Set,stable:new Set,location:new Set,ability:new Set,count:new Set},i={},a=Object.keys(Ja),s=new Set;function l(){if(s.size<a.length)return;let u=Ya(i);if(Ro(e,u)||(t=e,e=u,!n))return;for(let g of r.all)g(e,t);if(!wg(t,e))for(let g of r.stable)g(e,t);let d=Sg(t,e);for(let g of d)for(let f of r.location)f(g);let p=kg(t,e);for(let g of p)for(let f of r.ability)f(g);let m=Tg(t,e);if(m)for(let g of r.count)g(m)}async function c(){if(n)return;let u=a.map(async d=>{let p=Ja[d],m=await Z.subscribe(p,g=>{i[d]=g,s.add(d),l()});o.push(m)});await Promise.all(u),n=!0,s.size===a.length&&(e=Ya(i))}return c(),{get(){return e},subscribe(u){return r.all.add(u),n&&s.size===a.length&&u(e,e),()=>r.all.delete(u)},subscribeStable(u){return r.stable.add(u),n&&s.size===a.length&&u(e,e),()=>r.stable.delete(u)},subscribeLocation(u){return r.location.add(u),()=>r.location.delete(u)},subscribeAbility(u){return r.ability.add(u),()=>r.ability.delete(u)},subscribeCount(u){return r.count.add(u),()=>r.count.delete(u)},destroy(){for(let u of o)u();o.length=0,r.all.clear(),r.stable.clear(),r.location.clear(),r.ability.clear(),r.count.clear(),n=!1}}}var Lo=null;function Oo(){return Lo||(Lo=Ag()),Lo}var ke=null;function xn(){return ke||(ke={currentTile:Eo(),myPets:Oo()},ke)}function yn(){if(!ke)throw new Error("[Globals] Not initialized. Call initGlobals() first.");return ke}function es(){ke&&(ke.currentTile.destroy(),ke.myPets.destroy(),ke=null)}var ts={get currentTile(){return yn().currentTile},get myPets(){return yn().myPets}};var Pg={Store:{select:Z.select.bind(Z),set:Z.set.bind(Z),subscribe:Z.subscribe.bind(Z),subscribeImmediate:Z.subscribeImmediate.bind(Z)},Globals:ts,Modules:{Version:St,Assets:he,Manifest:pe,Data:At,Sprite:we,Tile:Se,Pixi:Ct,Audio:Rt,Cosmetic:Ot},WebSocket:{chat:qt,emote:hr,wish:yr,kickPlayer:xr,setPlayerData:vr,usurpHost:wr,reportSpeakingStart:Sr,setSelectedGame:kr,voteForGame:Tr,requestGame:Ar,restartGame:Pr,ping:Cr,checkWeatherStatus:Er,move:Mr,playerPosition:Gn,teleport:Ir,moveInventoryItem:Lr,dropObject:Rr,pickupObject:Or,toggleFavoriteItem:Hr,putItemInStorage:_r,retrieveItemFromStorage:Dr,moveStorageItem:Gr,logItems:Nr,plantSeed:Wr,waterPlant:Br,harvestCrop:jr,sellAllCrops:Vr,purchaseDecor:Fr,purchaseEgg:zr,purchaseTool:$r,purchaseSeed:Ur,plantEgg:Kr,hatchEgg:qr,plantGardenPlant:Jr,potPlant:Xr,mutationPotion:Yr,pickupDecor:Qr,placeDecor:Zr,removeGardenObject:ei,placePet:ti,feedPet:ni,petPositions:oi,swapPet:ri,storePet:ii,namePet:ai,sellPet:si},_internal:{getGlobals:yn,initGlobals:xn,destroyGlobals:es}};function ns(){A.Gemini=Pg}function Ho(e){e.logStep("WebSocket","Capturing WebSocket...");let t=null;return t=Kt(n=>{n.ws&&(e.logStep("WebSocket","WebSocket captured","success"),t?.(),t=null)},{intervalMs:250}),Gi({debug:!1}),()=>{t?.(),t=null}}async function _o(e){e.logStep("Atoms","Prewarming Jotai store...");try{await Pn(),await _t({timeoutMs:8e3,intervalMs:50}),e.logStep("Atoms","Jotai store ready","success")}catch(t){e.logStep("Atoms","Jotai store not captured yet","error"),console.warn("[Bootstrap] Jotai store wait failed",t)}}function Do(e){e.logStep("Globals","Initializing global variables...");try{xn(),e.logStep("Globals","Global variables ready","success")}catch(t){e.logStep("Globals","Failed to initialize global variables","error"),console.warn("[Bootstrap] Global variables init failed",t)}}function Go(e){e.logStep("API","Exposing Gemini API...");try{ns(),e.logStep("API","Gemini API ready","success")}catch(t){e.logStep("API","Failed to expose API","error"),console.warn("[Bootstrap] API init failed",t)}}function No(e){e.logStep("HUD","Loading HUD preferences...");let t=Un(),n=$n({hostId:"gemini-hud-root",initialWidth:t.width,initialOpen:t.isOpen,onWidthChange:o=>Ye("width",o),onOpenChange:o=>Ye("isOpen",o),themes:Oe,initialTheme:t.theme,onThemeChange:o=>Ye("theme",o),buildSections:o=>Nn({applyTheme:o.applyTheme,initialTheme:o.initialTheme,getCurrentTheme:o.getCurrentTheme}),initialTab:t.activeTab,onTabChange:o=>Ye("activeTab",o)});return e.logStep("HUD","HUD ready","success"),n}async function Wo(e){e.setSubtitle("Activating Gemini modules..."),await Ka(t=>{t.status==="start"?e.logStep(t.name,`Loading ${t.name}...`):t.status==="success"?e.logStep(t.name,`${t.name} ready`,"success"):e.logStep(t.name,`${t.name} encountered an issue.`,"error")})}An();(async function(){"use strict";let e=In({title:"Gemini is loading",subtitle:"Connecting and preparing modules..."}),t=null,n=null;try{t=Ho(e),await _o(e),Do(e),Go(e),n=No(e),await Wo(e),e.succeed("Gemini is ready!")}catch(o){e.fail("Failed to initialize the mod.",o)}finally{t?.()}if(n){let o=n;Xt({onClick:()=>o.setOpen(!0)})}})();})();
