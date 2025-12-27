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
"use strict";(()=>{var Qr=Object.defineProperty;var Zr=(e,t,n)=>t in e?Qr(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var he=(e,t,n)=>Zr(e,typeof t!="symbol"?t+"":t,n);var an=window;function ea(){if(typeof unsafeWindow<"u"&&unsafeWindow)return unsafeWindow;let e=window.wrappedJSObject;return e&&e!==window?e:an}var sn=ea(),B=sn,ta=sn!==an;function ye(e,t){try{sn[e]=t}catch{}if(ta)try{an[e]=t}catch{}}var na=new Map;function oa(){return na}function Ze(){return B.jotaiAtomCache?.cache}function et(e){let t=oa(),n=t.get(e);if(n)return n;let o=Ze();if(!o)return null;for(let r of o.values())if((r?.debugLabel||r?.label||"")===e)return t.set(e,r),r;return null}function pn(){let e=B;if(e.__REACT_DEVTOOLS_GLOBAL_HOOK__)return;let t=new Map,n=new Map;e.__REACT_DEVTOOLS_GLOBAL_HOOK__={renderers:t,supportsFiber:!0,inject:o=>{let r=t.size+1;return t.set(r,o),n.set(r,new Set),r},onCommitFiberRoot:(o,r)=>{let a=n.get(o);a&&a.add(r)},onCommitFiberUnmount:()=>{},onPostCommitFiberRoot:()=>{},getFiberRoots:o=>n.get(o),checkDCE:()=>{},isDisabled:!1}}var ra={baseStore:null,captureInProgress:!1,captureError:null,lastCapturedVia:null,mirror:void 0};function je(){return ra}var aa="__JOTAI_STORE_READY__",ao=!1,cn=new Set;function St(){if(!ao){ao=!0;for(let e of cn)try{e()}catch{}try{let e=B.CustomEvent||CustomEvent;B.dispatchEvent?.(new e(aa))}catch{}}}function ia(e){cn.add(e);let t=un();if(t.via&&!t.polyfill)try{e()}catch{}return()=>{cn.delete(e)}}async function Tt(e={}){let{timeoutMs:t=6e3,intervalMs:n=50}=e,o=un();if(!(o.via&&!o.polyfill))return new Promise((r,a)=>{let i=!1,s=ia(()=>{i||(i=!0,s(),r())}),l=Date.now();(async()=>{for(;!i&&Date.now()-l<t;){let d=un();if(d.via&&!d.polyfill){if(i)return;i=!0,s(),r();return}await tt(n)}i||(i=!0,s(),a(new Error("Store not captured within timeout")))})()})}var tt=e=>new Promise(t=>setTimeout(t,e));function io(){try{let e=B.Event||Event;B.dispatchEvent?.(new e("visibilitychange"))}catch{}}function dn(e){return e&&typeof e=="object"&&typeof e.get=="function"&&typeof e.set=="function"&&typeof e.sub=="function"}function ln(e,t=0,n=new WeakSet){if(t>3||!e||typeof e!="object"||n.has(e))return null;try{n.add(e)}catch{return null}if(dn(e))return e;let o=["store","value","current","state","s","baseStore"];for(let r of o)try{let a=e[r];if(dn(a))return a}catch{}return null}function so(){let e=je(),t=B.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t?.renderers?.size)return null;let n=0;for(let[o]of t.renderers){let r=t.getFiberRoots?.(o);r&&(n+=r.size||0)}if(n===0)return null;for(let[o]of t.renderers){let r=t.getFiberRoots?.(o);if(r)for(let a of r){let i=new Set,s=[a.current];for(;s.length;){let l=s.pop();if(!(!l||i.has(l))){i.add(l);try{let c=l?.pendingProps?.value;if(dn(c))return e.lastCapturedVia="fiber",c}catch{}try{let c=l?.memoizedState,d=0;for(;c&&d<15;){d++;let u=ln(c);if(u)return e.lastCapturedVia="fiber",u;let p=ln(c.memoizedState);if(p)return e.lastCapturedVia="fiber",p;c=c.next}}catch{}try{if(l?.stateNode){let c=ln(l.stateNode);if(c)return e.lastCapturedVia="fiber",c}}catch{}l.child&&s.push(l.child),l.sibling&&s.push(l.sibling),l.alternate&&s.push(l.alternate)}}}}return null}function lo(){return{get:()=>{throw new Error("Store not captured: get unavailable")},set:()=>{throw new Error("Store not captured: set unavailable")},sub:()=>()=>{},__polyfill:!0}}async function sa(e=5e3){let t=Date.now(),n=Ze();for(;!n&&Date.now()-t<e;)await tt(100),n=Ze();if(!n)throw new Error("jotaiAtomCache.cache not found");let o=je(),r=null,a=null,i=[],s=()=>{for(let c of i)try{c.__origWrite&&(c.write=c.__origWrite,delete c.__origWrite)}catch{}};for(let c of n.values()){if(!c||typeof c.write!="function"||c.__origWrite)continue;let d=c.write;c.__origWrite=d,c.write=function(u,p,...m){return a||(r=u,a=p,s()),d.call(this,u,p,...m)},i.push(c)}io();let l=Date.now();for(;!a&&Date.now()-l<e;)await tt(50);return a?(o.lastCapturedVia="write",{get:c=>r(c),set:(c,d)=>a(c,d),sub:(c,d)=>{let u;try{u=r(c)}catch{}let p=setInterval(()=>{let m;try{m=r(c)}catch{return}if(m!==u){u=m;try{d()}catch{}}},100);return()=>clearInterval(p)}}):(s(),o.lastCapturedVia="polyfill",lo())}async function la(e=1e4){let t=je();io();let n=Date.now();for(;Date.now()-n<e;){let o=so();if(o)return o;await tt(50)}return t.lastCapturedVia="polyfill",lo()}async function ca(){let e=je();if(e.baseStore&&!e.baseStore.__polyfill)return St(),e.baseStore;if(e.captureInProgress){let t=Date.now(),n=2500;for(;!e.baseStore&&Date.now()-t<n;)await tt(25);if(e.baseStore)return e.baseStore.__polyfill||St(),e.baseStore}e.captureInProgress=!0;try{let t=so();if(t)return e.baseStore=t,St(),t;try{let o=await sa(5e3);return e.baseStore=o,o.__polyfill||St(),o}catch(o){e.captureError=o}let n=await la();return e.baseStore=n,n}catch(t){throw e.captureError=t,t}finally{e.captureInProgress=!1}}function un(){let e=je();return{via:e.lastCapturedVia,polyfill:!!e.baseStore?.__polyfill,error:e.captureError}}async function da(){let e=await ca(),t=new WeakMap,n=async r=>{let a=t.get(r);if(a)return a;a={last:void 0,has:!1,subs:new Set},t.set(r,a);try{a.last=e.get(r),a.has=!0}catch{}let i=e.sub(r,()=>{let s;try{s=e.get(r)}catch{return}let l=a.last,c=!Object.is(s,l)||!a.has;if(a.last=s,a.has=!0,c)for(let d of a.subs)try{d(s,l)}catch{}});return a.unsubUpstream=i,a};return{async get(r){let a=await n(r);if(a.has)return a.last;let i=e.get(r);return a.last=i,a.has=!0,i},async set(r,a){await e.set(r,a);let i=await n(r);i.last=a,i.has=!0},async sub(r,a){let i=await n(r);if(i.subs.add(a),i.has)try{a(i.last,i.last)}catch{}return()=>{i.subs.delete(a)}},getShadow(r){return t.get(r)?.last},hasShadow(r){return!!t.get(r)?.has},async ensureWatch(r){await n(r)},async asStore(){return{get:r=>this.get(r),set:(r,a)=>this.set(r,a),sub:(r,a)=>{let i=null;return this.sub(r,()=>a()).then(s=>i=s),()=>i?.()}}}}}async function nt(){let e=je();return e.mirror||(e.mirror=await da()),e.mirror}var re={async select(e){let t=await nt(),n=et(e);if(!n)throw new Error(`[Store] Atom not found: "${e}"`);return t.get(n)},async set(e,t){let n=await nt(),o=et(e);if(!o)throw new Error(`[Store] Atom not found: "${e}"`);await n.set(o,t)},async subscribe(e,t){let n=await nt(),o=et(e);if(!o)throw new Error(`[Store] Atom not found: "${e}"`);return n.sub(o,r=>{try{t(r)}catch{}})},async subscribeImmediate(e,t){let n=await re.select(e);try{t(n)}catch{}return re.subscribe(e,t)}};async function mn(){await nt()}function ot(e){return e?Array.isArray(e)?e.slice():e.split(".").map(t=>t.match(/^\d+$/)?Number(t):t):[]}function Ce(e,t){let n=ot(t),o=e;for(let r of n){if(o==null)return;o=o[r]}return o}function gn(e,t,n){let o=ot(t);if(!o.length)return n;let r=Array.isArray(e)?[...e]:{...e??{}},a=r;for(let i=0;i<o.length-1;i++){let s=o[i],l=a[s],c=typeof l=="object"&&l!==null?Array.isArray(l)?[...l]:{...l}:{};a[s]=c,a=c}return a[o[o.length-1]]=n,r}function co(e,t){let n={};for(let o of t)n[o]=o.includes(".")?Ce(e,o):e?.[o];try{return JSON.stringify(n)}catch{return String(n)}}function fn(e,t,n){let o=n.mode??"auto";function r(c){let d=t?Ce(c,t):c,u=new Map;if(d==null)return{signatures:u,keys:[]};let p=Array.isArray(d);if((o==="array"||o==="auto"&&p)&&p)for(let g=0;g<d.length;g++){let h=d[g],b=n.key?n.key(h,g,c):g,y=n.sig?n.sig(h,g,c):n.fields?co(h,n.fields):JSON.stringify(h);u.set(b,y)}else for(let[g,h]of Object.entries(d)){let b=n.key?n.key(h,g,c):g,y=n.sig?n.sig(h,g,c):n.fields?co(h,n.fields):JSON.stringify(h);u.set(b,y)}return{signatures:u,keys:Array.from(u.keys())}}function a(c,d){if(c===d)return!0;if(!c||!d||c.size!==d.size)return!1;for(let[u,p]of c)if(d.get(u)!==p)return!1;return!0}async function i(c){let d=null;return re.subscribeImmediate(e,u=>{let p=t?Ce(u,t):u,{signatures:m}=r(p);if(!a(d,m)){let g=new Set([...d?Array.from(d.keys()):[],...Array.from(m.keys())]),h=[];for(let b of g){let y=d?.get(b)??"__NONE__",k=m.get(b)??"__NONE__";y!==k&&h.push(b)}d=m,c({value:p,changedKeys:h})}})}async function s(c,d){return i(({value:u,changedKeys:p})=>{p.includes(c)&&d({value:u})})}async function l(c,d){let u=new Set(c);return i(({value:p,changedKeys:m})=>{let g=m.filter(h=>u.has(h));g.length&&d({value:p,changedKeys:g})})}return{sub:i,subKey:s,subKeys:l}}var Fe=new Map;function ua(e,t){let n=Fe.get(e);if(n)try{n()}catch{}return Fe.set(e,t),()=>{try{t()}catch{}Fe.get(e)===t&&Fe.delete(e)}}function X(e,t={}){let{path:n,write:o="replace"}=t,r=n?`${e}:${ot(n).join(".")}`:e;async function a(){let u=await re.select(e);return n?Ce(u,n):u}async function i(u){if(typeof o=="function"){let g=await re.select(e),h=o(u,g);return re.set(e,h)}let p=await re.select(e),m=n?gn(p,n,u):u;return o==="merge-shallow"&&!n&&p&&typeof p=="object"&&typeof u=="object"?re.set(e,{...p,...u}):re.set(e,m)}async function s(u){let p=await a(),m=u(p);return await i(m),m}async function l(u,p,m){let g,h=y=>{let k=n?Ce(y,n):y;if(typeof g>"u"||!m(g,k)){let S=g;g=k,p(k,S)}},b=u?await re.subscribeImmediate(e,h):await re.subscribe(e,h);return ua(r,b)}function c(){let u=Fe.get(r);if(u){try{u()}catch{}Fe.delete(r)}}function d(u){return fn(e,u?.path??n,u)}return{label:r,get:a,set:i,update:s,onChange:(u,p=Object.is)=>l(!1,u,p),onChangeNow:(u,p=Object.is)=>l(!0,u,p),asSignature:d,stopOnChange:c}}function f(e){return X(e)}var pa=f("positionAtom"),ma=f("lastPositionInMyGardenAtom"),ga=f("playerDirectionAtom"),fa=f("stateAtom"),ba=f("quinoaDataAtom"),ha=f("currentTimeAtom"),ya=f("actionAtom"),xa=f("isPressAndHoldActionAtom"),va=f("mapAtom"),wa=f("tileSizeAtom"),ka=X("mapAtom",{path:"cols"}),Sa=X("mapAtom",{path:"rows"}),Ta=X("mapAtom",{path:"spawnTiles"}),Aa=X("mapAtom",{path:"locations.seedShop.spawnTileIdx"}),Ca=X("mapAtom",{path:"locations.eggShop.spawnTileIdx"}),Ma=X("mapAtom",{path:"locations.toolShop.spawnTileIdx"}),Pa=X("mapAtom",{path:"locations.decorShop.spawnTileIdx"}),Ea=X("mapAtom",{path:"locations.sellCropsShop.spawnTileIdx"}),Ia=X("mapAtom",{path:"locations.sellPetShop.spawnTileIdx"}),La=X("mapAtom",{path:"locations.collectorsClub.spawnTileIdx"}),Ra=X("mapAtom",{path:"locations.wishingWell.spawnTileIdx"}),Ha=X("mapAtom",{path:"locations.shopsCenter.spawnTileIdx"}),Oa=f("playerAtom"),_a=f("myDataAtom"),Da=f("myUserSlotIdxAtom"),Na=f("isSpectatingAtom"),Ga=f("myCoinsCountAtom"),Wa=f("numPlayersAtom"),Ba=X("playerAtom",{path:"id"}),Va=f("userSlotsAtom"),ja=f("filteredUserSlotsAtom"),Fa=f("myUserSlotAtom"),za=f("spectatorsAtom"),$a=X("stateAtom",{path:"child"}),Ua=X("stateAtom",{path:"child.data"}),Ka=X("stateAtom",{path:"child.data.shops"}),qa=X("stateAtom",{path:"child.data.userSlots"}),Ja=X("stateAtom",{path:"data.players"}),Ya=f("myInventoryAtom"),Xa=f("myInventoryItemsAtom"),Qa=f("isMyInventoryAtMaxLengthAtom"),Za=f("myFavoritedItemIdsAtom"),ei=f("myCropInventoryAtom"),ti=f("mySeedInventoryAtom"),ni=f("myToolInventoryAtom"),oi=f("myEggInventoryAtom"),ri=f("myDecorInventoryAtom"),ai=f("myPetInventoryAtom"),ii=X("myInventoryAtom",{path:"favoritedItemIds"}),si=f("itemTypeFiltersAtom"),li=f("myItemStoragesAtom"),ci=f("myPetHutchStoragesAtom"),di=f("myPetHutchItemsAtom"),ui=f("myPetHutchPetItemsAtom"),pi=f("myNumPetHutchItemsAtom"),mi=f("myValidatedSelectedItemIndexAtom"),gi=f("isSelectedItemAtomSuspended"),fi=f("mySelectedItemAtom"),bi=f("mySelectedItemNameAtom"),hi=f("mySelectedItemRotationsAtom"),yi=f("mySelectedItemRotationAtom"),xi=f("setSelectedIndexToEndAtom"),vi=f("myPossiblyNoLongerValidSelectedItemIndexAtom"),wi=f("myCurrentGlobalTileIndexAtom"),ki=f("myCurrentGardenTileAtom"),Si=f("myCurrentGardenObjectAtom"),Ti=f("myOwnCurrentGardenObjectAtom"),Ai=f("myOwnCurrentDirtTileIndexAtom"),Ci=f("myCurrentGardenObjectNameAtom"),Mi=f("isInMyGardenAtom"),Pi=f("myGardenBoardwalkTileObjectsAtom"),Ei=X("myDataAtom",{path:"garden"}),Ii=X("myDataAtom",{path:"garden.tileObjects"}),Li=X("myOwnCurrentGardenObjectAtom",{path:"objectType"}),Ri=f("myCurrentStablePlantObjectInfoAtom"),Hi=f("myCurrentSortedGrowSlotIndicesAtom"),Oi=f("myCurrentGrowSlotIndexAtom"),_i=f("myCurrentGrowSlotsAtom"),Di=f("myCurrentGrowSlotAtom"),Ni=f("secondsUntilCurrentGrowSlotMaturesAtom"),Gi=f("isCurrentGrowSlotMatureAtom"),Wi=f("numGrowSlotsAtom"),Bi=f("myCurrentEggAtom"),Vi=f("petInfosAtom"),ji=f("myPetInfosAtom"),Fi=f("myPetSlotInfosAtom"),zi=f("myPrimitivePetSlotsAtom"),$i=f("myNonPrimitivePetSlotsAtom"),Ui=f("expandedPetSlotIdAtom"),Ki=f("myPetsProgressAtom"),qi=f("myActiveCropMutationPetsAtom"),Ji=f("totalPetSellPriceAtom"),Yi=f("selectedPetHasNewVariantsAtom"),Xi=f("shopsAtom"),Qi=f("myShopPurchasesAtom"),Zi=f("seedShopAtom"),es=f("seedShopInventoryAtom"),ts=f("seedShopRestockSecondsAtom"),ns=f("seedShopCustomRestockInventoryAtom"),os=f("eggShopAtom"),rs=f("eggShopInventoryAtom"),as=f("eggShopRestockSecondsAtom"),is=f("eggShopCustomRestockInventoryAtom"),ss=f("toolShopAtom"),ls=f("toolShopInventoryAtom"),cs=f("toolShopRestockSecondsAtom"),ds=f("toolShopCustomRestockInventoryAtom"),us=f("decorShopAtom"),ps=f("decorShopInventoryAtom"),ms=f("decorShopRestockSecondsAtom"),gs=f("decorShopCustomRestockInventoryAtom"),fs=f("isDecorShopAboutToRestockAtom"),bs=X("shopsAtom",{path:"seed"}),hs=X("shopsAtom",{path:"tool"}),ys=X("shopsAtom",{path:"egg"}),xs=X("shopsAtom",{path:"decor"}),vs=f("myCropItemsAtom"),ws=f("myCropItemsToSellAtom"),ks=f("totalCropSellPriceAtom"),Ss=f("friendBonusMultiplierAtom"),Ts=f("myJournalAtom"),As=f("myCropJournalAtom"),Cs=f("myPetJournalAtom"),Ms=f("myStatsAtom"),Ps=f("myActivityLogsAtom"),Es=f("newLogsAtom"),Is=f("hasNewLogsAtom"),Ls=f("newCropLogsFromSellingAtom"),Rs=f("hasNewCropLogsFromSellingAtom"),Hs=f("myCompletedTasksAtom"),Os=f("myActiveTasksAtom"),_s=f("isWelcomeToastVisibleAtom"),Ds=f("shouldCloseWelcomeToastAtom"),Ns=f("isInitialMoveToDirtPatchToastVisibleAtom"),Gs=f("isFirstPlantSeedActiveAtom"),Ws=f("isThirdSeedPlantActiveAtom"),Bs=f("isThirdSeedPlantCompletedAtom"),Vs=f("isDemoTouchpadVisibleAtom"),js=f("areShopAnnouncersEnabledAtom"),Fs=f("arePresentablesEnabledAtom"),zs=f("isEmptyDirtTileHighlightedAtom"),$s=f("isPlantTileHighlightedAtom"),Us=f("isItemHiglightedInHotbarAtom"),Ks=f("isItemHighlightedInModalAtom"),qs=f("isMyGardenButtonHighlightedAtom"),Js=f("isSellButtonHighlightedAtom"),Ys=f("isShopButtonHighlightedAtom"),Xs=f("isInstaGrowButtonHiddenAtom"),Qs=f("isActionButtonHighlightedAtom"),Zs=f("isGardenItemInfoCardHiddenAtom"),el=f("isSeedPurchaseButtonHighlightedAtom"),tl=f("isFirstSeedPurchaseActiveAtom"),nl=f("isFirstCropHarvestActiveAtom"),ol=f("isWeatherStatusHighlightedAtom"),rl=f("weatherAtom"),al=f("activeModalAtom"),il=f("hotkeyBeingPressedAtom"),sl=f("avatarTriggerAnimationAtom"),ll=f("avatarDataAtom"),cl=f("emoteDataAtom"),dl=f("otherUserSlotsAtom"),ul=f("otherPlayerPositionsAtom"),pl=f("otherPlayerSelectedItemsAtom"),ml=f("otherPlayerLastActionsAtom"),gl=f("traderBunnyPlayerId"),fl=f("npcPlayersAtom"),bl=f("npcQuinoaUsersAtom"),hl=f("numNpcAvatarsAtom"),yl=f("traderBunnyEmoteTimeoutAtom"),xl=f("traderBunnyEmoteAtom"),vl=f("unsortedLeaderboardAtom"),wl=f("currentGardenNameAtom"),kl=f("quinoaEngineAtom"),Sl=f("quinoaInitializationErrorAtom"),Tl=f("avgPingAtom"),Al=f("serverClientTimeOffsetAtom"),Cl=f("isEstablishingShotRunningAtom"),Ml=f("isEstablishingShotCompleteAtom");function x(e,t=null,...n){let o=document.createElement(e);for(let[r,a]of Object.entries(t||{}))a!=null&&(r==="style"?typeof a=="string"?o.setAttribute("style",a):typeof a=="object"&&Object.assign(o.style,a):r.startsWith("on")&&typeof a=="function"?o[r.toLowerCase()]=a:r in o?o[r]=a:o.setAttribute(r,String(a)));for(let r of n)r==null||r===!1||o.appendChild(typeof r=="string"||typeof r=="number"?document.createTextNode(String(r)):r);return o}var At="https://i.imgur.com/k5WuC32.png",uo="gemini-loader-style",Le="gemini-loader",po=80;function Pl(){if(document.getElementById(uo))return;let e=document.createElement("style");e.id=uo,e.textContent=`
    /* ===== Loader Variables ===== */
    #${Le} {
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
    #${Le} {
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

    #${Le}.gemini-loader--error .gemini-loader__actions {
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
    #${Le}.gemini-loader--closing {
      animation: gemini-loader-fade-out 0.4s ease forwards;
      pointer-events: none;
    }

    #${Le}.gemini-loader--error .gemini-loader__spinner {
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
      #${Le} { padding: 16px 10px; }
      .gemini-loader__card { padding: 16px; }
      .gemini-loader__header { gap: 12px; }
      .gemini-loader__spinner { width: 42px; height: 42px; }
      .gemini-loader__spinner-icon { width: 32px; height: 32px; }
      .gemini-loader__title { font-size: 16px; }
    }
  `,document.head.appendChild(e)}function Ct(e,t,n){let o=x("div",{className:`gemini-loader__log ${n}`},x("div",{className:"gemini-loader__dot"}),x("div",{textContent:t}));for(e.appendChild(o);e.childElementCount>po;)e.firstElementChild?.remove();e.scrollTop=e.scrollHeight}function El(){return new Promise(e=>{if(typeof GM_xmlhttpRequest>"u"){e(At);return}GM_xmlhttpRequest({method:"GET",url:At,responseType:"blob",onload:t=>{let n=t.response,o=new FileReader;o.onloadend=()=>e(o.result),o.onerror=()=>e(At),o.readAsDataURL(n)},onerror:()=>e(At)})})}function mo(e={}){let t=Number.isFinite(e.blurPx)?Math.max(4,Number(e.blurPx)):14;Pl();let n=x("div",{className:"gemini-loader__subtitle",textContent:e.subtitle??"Initializing the mod..."}),o=x("div",{className:"gemini-loader__logs"}),r=x("img",{className:"gemini-loader__spinner-icon",alt:"Gemini"}),a=x("div",{className:"gemini-loader__spinner"},r);El().then(b=>{r.src=b});let i=x("div",{className:"gemini-loader__card"},x("div",{className:"gemini-loader__header"},a,x("div",{className:"gemini-loader__titles"},x("div",{className:"gemini-loader__title",textContent:e.title??"Gemini is loading"}),n)),o),s=x("div",{id:Le},i);(document.body||document.documentElement).appendChild(s);let l=x("div",{className:"gemini-loader__actions"},x("button",{className:"gemini-loader__button",textContent:"Close loader",onclick:()=>s.remove()}));i.appendChild(l),s.style.setProperty("--loader-blur",`${t}px`);let c=b=>{n.textContent=b},d=new Map,u=(b,y)=>{b.className=`gemini-loader__log ${y}`};return{log:(b,y="info")=>Ct(o,b,y),logStep:(b,y,k="info")=>{let S=String(b||"").trim();if(!S){Ct(o,y,k);return}let v=d.get(S);if(v){v.el.lastElementChild&&(v.el.lastElementChild.textContent=y),v.tone!==k&&(u(v.el,k),v.tone=k);return}let w=x("div",{className:`gemini-loader__log ${k}`},x("div",{className:"gemini-loader__dot"}),x("div",{textContent:y}));for(d.set(S,{el:w,tone:k}),o.appendChild(w);o.childElementCount>po;){let T=o.firstElementChild;if(!T)break;let C=Array.from(d.entries()).find(([,M])=>M.el===T)?.[0];C&&d.delete(C),T.remove()}o.scrollTop=o.scrollHeight},setSubtitle:c,succeed:(b,y=600)=>{b&&Ct(o,b,"success"),s.classList.add("gemini-loader--closing"),setTimeout(()=>s.remove(),y)},fail:(b,y)=>{Ct(o,b,"error"),c("Something went wrong. Check the console for details."),s.classList.add("gemini-loader--error"),console.error("[Gemini loader]",b,y)}}}function go(e,t,n){let o=x("div",{className:"lg-pill",id:"pill"}),r=e.map(d=>{let u=x("button",{className:"lg-tab"},d.label);return u.setAttribute("data-target",d.id),u}),a=x("div",{className:"lg-tabs",id:"lg-tabs-row"},o,...r),i=a;a.addEventListener("wheel",d=>{Math.abs(d.deltaY)>Math.abs(d.deltaX)&&(d.preventDefault(),a.scrollLeft+=d.deltaY)},{passive:!1});function s(d){let u=a.getBoundingClientRect(),p=r.find(w=>w.dataset.target===d)||r[0];if(!p)return;let m=p.getBoundingClientRect(),g=m.left-u.left,h=m.width;o.style.width=`${h}px`,o.style.transform=`translateX(${g}px)`;let b=a.scrollLeft,y=b,k=b+a.clientWidth,S=g-12,v=g+h+12;S<y?a.scrollTo({left:S,behavior:"smooth"}):v>k&&a.scrollTo({left:v-a.clientWidth,behavior:"smooth"})}let l=t||(e[0]?.id??"");function c(d){l=d,r.forEach(u=>u.classList.toggle("active",u.dataset.target===d)),s(d),n(d)}return r.forEach(d=>d.addEventListener("click",()=>c(d.dataset.target))),queueMicrotask(()=>s(l)),{root:i,activate:c,recalc:()=>s(l),getActive:()=>l}}var Re=class{constructor(t){he(this,"id");he(this,"label");he(this,"container",null);he(this,"cleanupFunctions",[]);this.id=t.id,this.label=t.label}render(t){for(this.unmount();t.firstChild;)t.removeChild(t.firstChild);this.container=t;let n=this.build(t);n instanceof Promise&&n.catch(r=>{console.error(`[Gemini] Error building section ${this.id}:`,r)});let o=t.firstElementChild;o&&o.classList.contains("gemini-section")&&o.classList.add("active")}unmount(){this.executeCleanup(),this.container=null}createContainer(t,n){let o=n?`gemini-section ${n}`:"gemini-section";return x("section",{id:t,className:o})}addCleanup(t){this.cleanupFunctions.push(t)}createGrid(t="12px"){let n=x("div");return n.style.display="grid",n.style.gap=t,n}executeCleanup(){for(let t of this.cleanupFunctions)try{t()}catch(n){console.error(`[Gemini] Cleanup error in section ${this.id}:`,n)}this.cleanupFunctions=[]}};var rt=class{constructor(t,n,o){he(this,"sections");he(this,"activeId",null);he(this,"container");he(this,"theme");this.sections=new Map(t.map(r=>[r.id,r])),this.container=n,this.theme=o}get ids(){return Array.from(this.sections.keys())}get all(){return Array.from(this.sections.values())}get active(){return this.activeId}activate(t){if(this.activeId!==t){if(!this.sections.has(t))throw new Error(`[Gemini] Unknown section: ${t}`);if(this.activeId&&this.sections.get(this.activeId).unmount(),this.activeId=t,this.sections.get(t).render(this.container),this.theme){let n=this.theme.getCurrentTheme();this.theme.applyTheme(n)}}}};function at(e,t){try{let n=JSON.stringify(t);GM_setValue(e,n)}catch(n){console.error(`[Gemini] Failed to save key "${e}" to storage:`,n)}}function Me(e,t){try{let n=GM_getValue(e);return n==null?t:typeof n=="string"?JSON.parse(n):n}catch(n){return console.error(`[Gemini] Failed to load key "${e}" from storage, using default:`,n),t}}var fo="gemini.sections";function bo(){let e=Me(fo,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function Il(e){at(fo,e)}async function ho(e){return bo()[e]}function yo(e,t){let n=bo();Il({...n,[e]:t})}function Mt(e,t){return{...e,...t??{}}}async function xo(e){let t=await ho(e.path),n;e.migrate?n=e.migrate(t):n=t??{},n=Object.assign((c=>JSON.parse(JSON.stringify(c)))(e.defaults),n),e.sanitize&&(n=e.sanitize(n));function r(){yo(e.path,n)}function a(){return n}function i(c){n=e.sanitize?e.sanitize(c):c,r()}function s(c){let u=Object.assign((p=>JSON.parse(JSON.stringify(p)))(n),{});typeof c=="function"?c(u):Object.assign(u,c),n=e.sanitize?e.sanitize(u):u,r()}function l(){r()}return{get:a,set:i,update:s,save:l}}async function it(e,t){let{path:n=e,...o}=t;return xo({path:n,...o})}var Ll=0,Pt=new Map;function Pe(e={},...t){let{id:n,className:o,variant:r="default",padding:a="md",interactive:i=!1,expandable:s=!1,defaultExpanded:l=!0,onExpandChange:c,mediaTop:d,title:u,subtitle:p,badge:m,actions:g,footer:h,divider:b=!1,tone:y="neutral",stateKey:k}=e,S=x("div",{className:"card",id:n,tabIndex:i?0:void 0});S.classList.add(`card--${r}`,`card--p-${a}`),i&&S.classList.add("card--interactive"),y!=="neutral"&&S.classList.add(`card--tone-${y}`),o&&S.classList.add(...o.split(" ").filter(Boolean)),s&&S.classList.add("card--expandable");let v=s?k??n??(typeof u=="string"?`title:${u}`:null):null,w=!s||l;v&&Pt.has(v)&&(w=!!Pt.get(v));let T=null,C=null,M=null,L=null,O=null,P=n?`${n}-collapse`:`card-collapse-${++Ll}`,K=()=>{if(L!==null&&(cancelAnimationFrame(L),L=null),O){let I=O;O=null,I()}},J=(I,_)=>{if(!M)return;K();let E=M;if(E.setAttribute("aria-hidden",String(!I)),!_){E.classList.remove("card-collapse--animating"),E.style.display=I?"":"none",E.style.height="",E.style.opacity="";return}if(E.classList.add("card-collapse--animating"),E.style.display="",I){E.style.height="auto";let z=E.scrollHeight;if(!z){E.classList.remove("card-collapse--animating"),E.style.display="",E.style.height="",E.style.opacity="";return}E.style.height="0px",E.style.opacity="0",E.offsetHeight,L=requestAnimationFrame(()=>{L=null,E.style.height=`${z}px`,E.style.opacity="1"})}else{let z=E.scrollHeight;if(!z){E.classList.remove("card-collapse--animating"),E.style.display="none",E.style.height="",E.style.opacity="";return}E.style.height=`${z}px`,E.style.opacity="1",E.offsetHeight,L=requestAnimationFrame(()=>{L=null,E.style.height="0px",E.style.opacity="0"})}let A=()=>{E.classList.remove("card-collapse--animating"),E.style.height="",I||(E.style.display="none"),E.style.opacity=""},H=null,G=z=>{z.target===E&&(H!==null&&(clearTimeout(H),H=null),E.removeEventListener("transitionend",G),E.removeEventListener("transitioncancel",G),O=null,A())};O=()=>{H!==null&&(clearTimeout(H),H=null),E.removeEventListener("transitionend",G),E.removeEventListener("transitioncancel",G),O=null,A()},E.addEventListener("transitionend",G),E.addEventListener("transitioncancel",G),H=window.setTimeout(()=>{O?.()},420)};function q(I){let _=document.createElementNS("http://www.w3.org/2000/svg","svg");return _.setAttribute("viewBox","0 0 24 24"),_.setAttribute("width","16"),_.setAttribute("height","16"),_.innerHTML=I==="up"?'<path d="M7 14l5-5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>':'<path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',_}function N(I,_=!0,E=!0){w=I,S.classList.toggle("card--collapsed",!w),S.classList.toggle("card--expanded",w),T&&(T.dataset.expanded=String(w),T.setAttribute("aria-expanded",String(w))),C&&(C.setAttribute("aria-expanded",String(w)),C.classList.toggle("card-toggle--collapsed",!w),C.setAttribute("aria-label",w?"Replier le contenu":"Deplier le contenu"),C.replaceChildren(q(w?"up":"down"))),s?J(w,E):M&&(M.style.display="",M.style.height="",M.style.opacity="",M.setAttribute("aria-hidden","false")),_&&c&&c(w),v&&Pt.set(v,w)}if(d){let I=x("div",{className:"card-media"});I.append(d),S.appendChild(I)}let W=!!(u||p||m||g&&g.length||s);if(W){T=x("div",{className:"card-header"});let I=x("div",{className:"card-headline",style:"min-width:0;display:flex;flex-direction:column;gap:2px;"});if(u){let A=x("h3",{className:"card-title",style:"margin:0;font-size:15px;font-weight:700;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:8px;"},u);m&&A.append(typeof m=="string"?x("span",{className:"badge"},m):m),I.appendChild(A)}if(p){let A=x("div",{className:"card-subtitle",style:"opacity:.85;font-size:12px;color:color-mix(in oklab, var(--fg) 80%, #9ca3af)"},p);I.appendChild(A)}(I.childNodes.length||s)&&T.appendChild(I);let _=x("div",{className:"card-header-right",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"}),E=x("div",{className:"card-actions",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"});g?.forEach(A=>E.appendChild(A)),E.childNodes.length&&_.appendChild(E),s&&(C=x("button",{className:"card-toggle",type:"button",ariaExpanded:String(w),ariaControls:P,ariaLabel:w?"Replier le contenu":"Deplier le contenu"}),C.textContent=w?"\u25B2":"\u25BC",C.addEventListener("click",A=>{A.preventDefault(),A.stopPropagation(),N(!w)}),_.appendChild(C),T.classList.add("card-header--expandable"),T.addEventListener("click",A=>{let H=A.target;H?.closest(".card-actions")||H?.closest(".card-toggle")||N(!w)})),_.childNodes.length&&T.appendChild(_),S.appendChild(T)}M=x("div",{className:"card-collapse",id:P,ariaHidden:s?String(!w):"false"}),S.appendChild(M),b&&W&&M.appendChild(x("div",{className:"card-divider"}));let R=x("div",{className:"card-body"});if(R.append(...t),M.appendChild(R),h){b&&M.appendChild(x("div",{className:"card-divider"}));let I=x("div",{className:"card-footer"});I.append(h),M.appendChild(I)}return C&&C.setAttribute("aria-controls",P),N(w,!1,!1),v&&Pt.set(v,w),S}function bn(...e){return x("div",{className:"card-footer"},...e)}var Et=!1,It=new Set,de=e=>{let t=document.activeElement;for(let n of It)if(t&&(t===n||n.contains(t))){e.stopImmediatePropagation(),e.stopPropagation();return}};function Rl(){Et||(Et=!0,window.addEventListener("keydown",de,!0),window.addEventListener("keypress",de,!0),window.addEventListener("keyup",de,!0),document.addEventListener("keydown",de,!0),document.addEventListener("keypress",de,!0),document.addEventListener("keyup",de,!0))}function Hl(){Et&&(It.size>0||(Et=!1,window.removeEventListener("keydown",de,!0),window.removeEventListener("keypress",de,!0),window.removeEventListener("keyup",de,!0),document.removeEventListener("keydown",de,!0),document.removeEventListener("keypress",de,!0),document.removeEventListener("keyup",de,!0)))}function ze(e){let{id:t,value:n=null,options:o,placeholder:r="Select...",size:a="md",disabled:i=!1,blockGameKeys:s=!0,onChange:l,onOpenChange:c}=e,d=x("div",{className:"select",id:t}),u=x("button",{className:"select-trigger",type:"button"}),p=x("span",{className:"select-value"},r),m=x("span",{className:"select-caret"},"\u25BE");u.append(p,m);let g=x("div",{className:"select-menu",role:"listbox",tabindex:"-1","aria-hidden":"true"});d.classList.add(`select--${a}`);let h=!1,b=n,y=null,k=!!i;function S(A){return A==null?r:(e.options||o).find(G=>G.value===A)?.label??r}function v(A){p.textContent=S(A),g.querySelectorAll(".select-option").forEach(H=>{let G=H.dataset.value,z=A!=null&&G===A;H.classList.toggle("selected",z),H.setAttribute("aria-selected",String(z))})}function w(A){g.replaceChildren(),A.forEach(H=>{let G=x("button",{className:"select-option"+(H.disabled?" disabled":""),type:"button",role:"option","data-value":H.value,"aria-selected":String(H.value===b),tabindex:"-1"},H.label);H.value===b&&G.classList.add("selected"),H.disabled||G.addEventListener("pointerdown",z=>{z.preventDefault(),z.stopPropagation(),P(H.value,{notify:!0}),L()},{capture:!0}),g.appendChild(G)})}function T(){u.setAttribute("aria-expanded",String(h)),g.setAttribute("aria-hidden",String(!h))}function C(){let A=u.getBoundingClientRect();Object.assign(g.style,{minWidth:`${A.width}px`})}function M(){h||k||(h=!0,d.classList.add("open"),T(),C(),document.addEventListener("mousedown",W,!0),document.addEventListener("scroll",R,!0),window.addEventListener("resize",I),g.focus({preventScroll:!0}),s&&(Rl(),It.add(d),y=()=>{It.delete(d),Hl()}),c?.(!0))}function L(){h&&(h=!1,d.classList.remove("open"),T(),document.removeEventListener("mousedown",W,!0),document.removeEventListener("scroll",R,!0),window.removeEventListener("resize",I),u.focus({preventScroll:!0}),y?.(),y=null,c?.(!1))}function O(){h?L():M()}function P(A,H={}){let G=b;b=A,v(b),H.notify!==!1&&G!==A&&l?.(A)}function K(){return b}function J(A){let H=Array.from(g.querySelectorAll(".select-option:not(.disabled)"));if(!H.length)return;let G=H.findIndex(ne=>ne.classList.contains("active")),z=H[(G+(A===1?1:H.length-1))%H.length];H.forEach(ne=>ne.classList.remove("active")),z.classList.add("active"),z.focus({preventScroll:!0}),z.scrollIntoView({block:"nearest"})}function q(A){(A.key===" "||A.key==="Enter"||A.key==="ArrowDown")&&(A.preventDefault(),M())}function N(A){if(A.key==="Escape"){A.preventDefault(),L();return}if(A.key==="Enter"||A.key===" "){let H=g.querySelector(".select-option.active")||g.querySelector(".select-option.selected");H&&!H.classList.contains("disabled")&&(A.preventDefault(),P(H.dataset.value,{notify:!0}),L());return}if(A.key==="ArrowDown"){A.preventDefault(),J(1);return}if(A.key==="ArrowUp"){A.preventDefault(),J(-1);return}}function W(A){d.contains(A.target)||L()}function R(){h&&C()}function I(){h&&C()}function _(A){k=!!A,u.disabled=k,d.classList.toggle("disabled",k),k&&L()}function E(A){e.options=A,w(A),A.some(H=>H.value===b)||(b=null,v(null))}return d.append(u,g),u.addEventListener("pointerdown",A=>{A.preventDefault(),A.stopPropagation(),O()},{capture:!0}),u.addEventListener("keydown",q),g.addEventListener("keydown",N),w(o),n!=null?(b=n,v(b)):v(null),T(),_(k),{root:d,open:M,close:L,toggle:O,getValue:K,setValue:P,setOptions:E,setDisabled:_,destroy(){document.removeEventListener("mousedown",W,!0),document.removeEventListener("scroll",R,!0),window.removeEventListener("resize",I),y?.(),y=null}}}function Lt(e={}){let{id:t,text:n="",htmlFor:o,tone:r="default",size:a="md",layout:i="inline",variant:s="text",required:l=!1,disabled:c=!1,tooltip:d,hint:u,icon:p,suffix:m,onClick:g}=e,h=x("div",{className:"lg-label-wrap",id:t}),b=x("label",{className:"lg-label",...o?{htmlFor:o}:{},...d?{title:d}:{}});if(p){let P=typeof p=="string"?x("span",{className:"lg-label-ico"},p):p;P.classList?.add?.("lg-label-ico"),b.appendChild(P)}let y=x("span",{className:"lg-label-text"},n);b.appendChild(y);let k=x("span",{className:"lg-label-req",ariaHidden:"true"}," *");l&&b.appendChild(k);let S=null;if(m!=null){S=typeof m=="string"?document.createTextNode(m):m;let P=x("span",{className:"lg-label-suffix"});P.appendChild(S),b.appendChild(P)}let v=u?x("div",{className:"lg-label-hint"},u):null;h.classList.add(`lg-label--${i}`),h.classList.add(`lg-label--${a}`),s==="title"&&h.classList.add("lg-label--title"),w(r),c&&h.classList.add("is-disabled"),h.appendChild(b),v&&h.appendChild(v),g&&b.addEventListener("click",g);function w(P){h.classList.remove("lg-label--default","lg-label--muted","lg-label--info","lg-label--success","lg-label--warning","lg-label--danger"),h.classList.add(`lg-label--${P}`)}function T(P){y.textContent=P}function C(P){w(P)}function M(P){P&&!k.isConnected&&b.appendChild(k),!P&&k.isConnected&&k.remove(),P?b.setAttribute("aria-required","true"):b.removeAttribute("aria-required")}function L(P){h.classList.toggle("is-disabled",!!P)}function O(P){!P&&v&&v.isConnected?v.remove():P&&v?v.textContent=P:P&&!v&&h.appendChild(x("div",{className:"lg-label-hint"},P))}return{root:h,labelEl:b,hintEl:v,setText:T,setTone:C,setRequired:M,setDisabled:L,setHint:O}}function st(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function Rt(e,t){let n=document.createElement("span");n.className=`btn-ico btn-ico--${t}`;let o=st(e);return o&&n.appendChild(o),n}function Ol(){let e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.marginRight="6px",t.style.display="none",t.style.flexShrink="0";let n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");let o=document.createElementNS(e,"animate");o.setAttribute("attributeName","stroke-dasharray"),o.setAttribute("values","1,150;90,150;90,150"),o.setAttribute("dur","1.5s"),o.setAttribute("repeatCount","indefinite");let r=document.createElementNS(e,"animateTransform");return r.setAttribute("attributeName","transform"),r.setAttribute("attributeType","XML"),r.setAttribute("type","rotate"),r.setAttribute("from","0 12 12"),r.setAttribute("to","360 12 12"),r.setAttribute("dur","1s"),r.setAttribute("repeatCount","indefinite"),n.appendChild(o),n.appendChild(r),t.appendChild(n),t}function Ee(e={}){let{label:t="",id:n,variant:o="default",size:r="md",iconLeft:a,iconRight:i,loading:s=!1,tooltip:l,type:c="button",onClick:d,disabled:u=!1,fullWidth:p=!1}=e,m=x("button",{className:"btn",id:n});m.type=c,o==="primary"&&m.classList.add("primary"),r==="sm"&&m.classList.add("btn--sm"),l&&(m.title=l),p&&(m.style.width="100%");let g=Ol(),h=a?Rt(a,"left"):null,b=i?Rt(i,"right"):null,y=document.createElement("span");y.className="btn-label";let k=st(t);k&&y.appendChild(k),!k&&(h||b)&&m.classList.add("btn--icon"),m.appendChild(g),h&&m.appendChild(h),m.appendChild(y),b&&m.appendChild(b);let S=u||s;m.disabled=S,m.setAttribute("aria-busy",String(!!s)),g.style.display=s?"inline-block":"none",d&&m.addEventListener("click",d);let v=m;return v.setLoading=w=>{m.setAttribute("aria-busy",String(!!w)),g.style.display=w?"inline-block":"none",m.disabled=w||u},v.setDisabled=w=>{m.disabled=w||m.getAttribute("aria-busy")==="true"},v.setLabel=w=>{y.replaceChildren();let T=st(w);T&&y.appendChild(T),!T&&(h||b)?m.classList.add("btn--icon"):m.classList.remove("btn--icon")},v.setIconLeft=w=>{if(w==null){h?.remove();return}h?h.replaceChildren(st(w)):m.insertBefore(Rt(w,"left"),y)},v.setIconRight=w=>{if(w==null){b?.remove();return}b?b.replaceChildren(st(w)):m.appendChild(Rt(w,"right"))},v}function _l(){try{let e=window.visualViewport,t=Math.round((e?.width??window.innerWidth)||0),n=Math.round((e?.height??window.innerHeight)||0);if(t&&n)return t>=n?"landscape":"portrait"}catch{}return"unknown"}function Dl(){let e=navigator.userAgent||"",t=navigator.platform||"",n=navigator.userAgentData;if(n&&typeof n.platform=="string"){let r=n.platform.toLowerCase();if(r.includes("windows"))return"windows";if(r.includes("mac"))return"mac";if(r.includes("android"))return"android";if(r.includes("chrome os")||r.includes("cros"))return"chromeos";if(r.includes("linux"))return"linux";if(r.includes("ios"))return"ios"}return/iPhone|iPad|iPod/i.test(e)||t==="MacIntel"&&navigator.maxTouchPoints>1?"ios":/Android/i.test(e)?"android":/CrOS/i.test(e)?"chromeos":/Win/i.test(e)?"windows":/Mac/i.test(e)?"mac":/Linux/i.test(e)?"linux":"unknown"}function Nl(){let e=navigator.userAgent||"",t=navigator.userAgentData;if(t&&Array.isArray(t.brands)){let n=t.brands.map(i=>String(i.brand||i.brandName||i.brandVersion||i)),o=n.some(i=>/Edge/i.test(i)||/Microsoft Edge/i.test(i)),r=n.some(i=>/Opera/i.test(i)||/OPR/i.test(i)),a=n.some(i=>/Chrome|Chromium/i.test(i));if(o)return"Edge";if(r)return"Opera";if(a)return"Chrome";if(navigator.brave)return"Brave"}return/FxiOS/i.test(e)?"Firefox":/CriOS/i.test(e)?"Chrome":/EdgiOS/i.test(e)?"Edge":/OPiOS|OPR|Opera Mini|Opera/i.test(e)?"Opera":/Edg\//i.test(e)?"Edge":/OPR\//i.test(e)||/Opera/i.test(e)?"Opera":/Firefox/i.test(e)?"Firefox":/Safari/i.test(e)&&!/Chrome|Chromium|Edg|OPR/i.test(e)?"Safari":/Brave/i.test(e)||window.Brave||navigator.brave?"Brave":/Chrome|Chromium/i.test(e)?"Chrome":"Unknown"}function Gl(){let e=navigator.userAgent||"",t=navigator.userAgentData;return t&&typeof t.mobile=="boolean"?t.mobile?"mobile":"desktop":/Android|iPhone|iPad|iPod|Mobile/i.test(e)?"mobile":"desktop"}function ge(){let e=(()=>{try{return window.top!==window.self}catch{return!0}})(),t=Wl(document.referrer),o=e&&!!t&&/(^|\.)discord(app)?\.com$/i.test(t)?"discord":"web",r=Gl(),a=Dl(),i=Nl(),s=window.screen||{},l=window.visualViewport,c=Math.round(window.innerWidth||document.documentElement.clientWidth||0),d=Math.round(window.innerHeight||document.documentElement.clientHeight||0),u=Math.round(l?.width??c),p=Math.round(l?.height??d),m=Math.round(s.width||0),g=Math.round(s.height||0),h=Math.round(s.availWidth||m),b=Math.round(s.availHeight||g),y=Number.isFinite(window.devicePixelRatio)?window.devicePixelRatio:1;return{surface:o,host:location.hostname,origin:location.origin,isInIframe:e,platform:r,browser:i,os:a,viewportWidth:c,viewportHeight:d,visualViewportWidth:u,visualViewportHeight:p,screenWidth:m,screenHeight:g,availScreenWidth:h,availScreenHeight:b,dpr:y,orientation:_l()}}function vo(){return ge().surface==="discord"}function Wl(e){if(!e)return null;try{return new URL(e).hostname}catch{return null}}var Ht=!1,lt=new Set;function Bl(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}var ue=e=>{let t=Bl();if(t){for(let n of lt)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function Vl(){Ht||(Ht=!0,window.addEventListener("keydown",ue,!0),window.addEventListener("keypress",ue,!0),window.addEventListener("keyup",ue,!0),document.addEventListener("keydown",ue,!0),document.addEventListener("keypress",ue,!0),document.addEventListener("keyup",ue,!0))}function jl(){Ht&&(Ht=!1,window.removeEventListener("keydown",ue,!0),window.removeEventListener("keypress",ue,!0),window.removeEventListener("keyup",ue,!0),document.removeEventListener("keydown",ue,!0),document.removeEventListener("keypress",ue,!0),document.removeEventListener("keyup",ue,!0))}function Fl(e){return lt.size===0&&Vl(),lt.add(e),()=>{lt.delete(e),lt.size===0&&jl()}}function zl(e,t,n,o){let r;switch(e){case"digits":r="0-9";break;case"alpha":r="\\p{L}";break;case"alphanumeric":r="\\p{L}0-9";break;default:return null}return t&&(r+=" "),n&&(r+="\\-"),o&&(r+="_"),new RegExp(`[^${r}]`,"gu")}function $l(e,t){return t?e.replace(t,""):e}function Ul(e,t=0){if(!t)return e;let n;return((...o)=>{clearTimeout(n),n=setTimeout(()=>e(...o),t)})}function wo(e={}){let{id:t,placeholder:n="",value:o="",mode:r="any",allowSpaces:a=!1,allowDashes:i=!1,allowUnderscore:s=!1,maxLength:l,blockGameKeys:c=!0,debounceMs:d=0,onChange:u,onEnter:p,label:m}=e,g=x("div",{className:"lg-input-wrap"}),h=x("input",{className:"input",id:t,placeholder:n});if(typeof l=="number"&&l>0&&(h.maxLength=l),o&&(h.value=o),m){let P=x("div",{className:"lg-input-label"},m);g.appendChild(P)}g.appendChild(h);let b=zl(r,a,i,s),y=()=>{let P=h.selectionStart??h.value.length,K=h.value.length,J=$l(h.value,b);if(J!==h.value){h.value=J;let q=K-J.length,N=Math.max(0,P-q);h.setSelectionRange(N,N)}},k=Ul(()=>u?.(h.value),d);h.addEventListener("input",()=>{y(),k()}),h.addEventListener("paste",()=>queueMicrotask(()=>{y(),k()})),h.addEventListener("keydown",P=>{P.key==="Enter"&&p?.(h.value)});let S=c?Fl(h):()=>{};function v(){return h.value}function w(P){h.value=P??"",y(),k()}function T(){h.focus()}function C(){h.blur()}function M(P){h.disabled=!!P}function L(){return document.activeElement===h}function O(){S()}return{root:g,input:h,getValue:v,setValue:w,focus:T,blur:C,setDisabled:M,isFocused:L,destroy:O}}function te(e,t,n){return Math.min(n,Math.max(t,e))}function dt({h:e,s:t,v:n,a:o}){let r=(e%360+360)%360/60,a=n*t,i=a*(1-Math.abs(r%2-1)),s=0,l=0,c=0;switch(Math.floor(r)){case 0:s=a,l=i;break;case 1:s=i,l=a;break;case 2:l=a,c=i;break;case 3:l=i,c=a;break;case 4:s=i,c=a;break;default:s=a,c=i;break}let u=n-a,p=Math.round((s+u)*255),m=Math.round((l+u)*255),g=Math.round((c+u)*255);return{r:te(p,0,255),g:te(m,0,255),b:te(g,0,255),a:te(o,0,1)}}function ko({r:e,g:t,b:n,a:o}){let r=te(e,0,255)/255,a=te(t,0,255)/255,i=te(n,0,255)/255,s=Math.max(r,a,i),l=Math.min(r,a,i),c=s-l,d=0;c!==0&&(s===r?d=60*((a-i)/c%6):s===a?d=60*((i-r)/c+2):d=60*((r-a)/c+4)),d<0&&(d+=360);let u=s===0?0:c/s;return{h:d,s:u,v:s,a:te(o,0,1)}}function yn({r:e,g:t,b:n}){let o=r=>te(Math.round(r),0,255).toString(16).padStart(2,"0");return`#${o(e)}${o(t)}${o(n)}`.toUpperCase()}function Kl({r:e,g:t,b:n,a:o}){let r=te(Math.round(o*255),0,255);return`${yn({r:e,g:t,b:n,a:o})}${r.toString(16).padStart(2,"0")}`.toUpperCase()}function ct({r:e,g:t,b:n,a:o}){let r=Math.round(o*1e3)/1e3;return`rgba(${e}, ${t}, ${n}, ${r})`}function $e(e){let t=e.trim();if(!t||(t.startsWith("#")&&(t=t.slice(1)),![3,4,6,8].includes(t.length))||!/^[0-9a-fA-F]+$/.test(t))return null;(t.length===3||t.length===4)&&(t=t.split("").map(i=>i+i).join(""));let n=255;t.length===8&&(n=parseInt(t.slice(6,8),16),t=t.slice(0,6));let o=parseInt(t.slice(0,2),16),r=parseInt(t.slice(2,4),16),a=parseInt(t.slice(4,6),16);return{r:o,g:r,b:a,a:n/255}}function hn(e){if(!e)return null;let t=e.trim();if(t.startsWith("#"))return $e(t);let n=t.match(/^rgba?\(([^)]+)\)$/i);if(n){let o=n[1].split(",").map(l=>l.trim());if(o.length<3)return null;let r=Number(o[0]),a=Number(o[1]),i=Number(o[2]),s=o[3]!=null?Number(o[3]):1;return[r,a,i,s].some(l=>Number.isNaN(l))?null:{r,g:a,b:i,a:s}}return null}function ql(e,t){let n=hn(e)??$e(e??"")??{r:244,g:67,b:54,a:1};return typeof t=="number"&&(n.a=te(t,0,1)),ko(n)}function Jl(e){return`#${e.trim().replace(/[^0-9a-fA-F#]/g,"").replace(/#/g,"")}`.slice(0,9).toUpperCase()}function Yl(e){let t=e.trim();return t&&(/^rgba?\s*\(/i.test(t)?t=t.replace(/^rgba?/i,"rgba"):(t=t.replace(/^\(?(.*)\)?$/,"$1"),t=`rgba(${t})`),t=t.replace(/\s*\(\s*/,"("),t=t.replace(/\s*\)\s*$/,")"),t=t.replace(/\s*,\s*/g,", "),t)}function He(e){let t=dt(e),n=dt({...e,a:1});return{hsva:{...e},hex:yn(n),hexa:Kl(t),rgba:ct(t),alpha:e.a}}function So(e={}){let{id:t,label:n="Color",value:o,alpha:r,defaultExpanded:a=!1,detectMobile:i,onInput:s,onChange:l}=e,d=i?i():ge().platform==="mobile",u=ql(o,r),p=Pe({id:t,className:"color-picker",title:n,padding:d?"md":"lg",variant:"soft",expandable:!d,defaultExpanded:!d&&a});p.classList.add(d?"color-picker--mobile":"color-picker--desktop");let m=p.querySelector(".card-header");m&&m.classList.add("color-picker__header");let g=m?.querySelector(".card-title"),h=x("button",{className:"color-picker__preview",type:"button",title:`Preview ${n}`,"aria-label":`Change ${n}`});g?g.prepend(h):m?m.prepend(h):p.prepend(h);let b=p.querySelector(".card-toggle");!d&&b&&h.addEventListener("click",()=>{p.classList.contains("card--collapsed")&&b.click()});let y=p.querySelector(".card-collapse"),k=null,S=null,v=null,w=null,T=null,C=null,M=null,L=null,O=null,P="hex";function K(R){let I=He(u);R==="input"?s?.(I):l?.(I)}function J(){let R=He(u);if(h.style.setProperty("--cp-preview-color",R.rgba),h.setAttribute("aria-label",`${n}: ${R.hexa}`),!d&&k&&S&&v&&w&&T&&C&&M){let I=dt({...u,s:1,v:1,a:1}),_=ct(I);k.style.setProperty("--cp-palette-hue",_),S.style.left=`${u.s*100}%`,S.style.top=`${(1-u.v)*100}%`,v.style.setProperty("--cp-alpha-gradient",`linear-gradient(180deg, ${ct({...I,a:1})} 0%, ${ct({...I,a:0})} 100%)`),w.style.top=`${(1-u.a)*100}%`,T.style.setProperty("--cp-hue-color",ct(dt({...u,v:1,s:1,a:1}))),C.style.left=`${u.h/360*100}%`;let E=u.a===1?R.hex:R.hexa,A=R.rgba,H=P==="hex"?E:A;M!==document.activeElement&&(M.value=H),M.setAttribute("aria-label",`${P.toUpperCase()} code for ${n}`),M.placeholder=P==="hex"?"#RRGGBB or #RRGGBBAA":"rgba(0, 0, 0, 1)",P==="hex"?M.maxLength=9:M.removeAttribute("maxLength"),M.dataset.mode=P,L&&(L.textContent=P.toUpperCase(),L.setAttribute("aria-label",P==="hex"?"Passer en saisie RGBA":"Revenir en saisie HEX"),L.setAttribute("aria-pressed",P==="rgba"?"true":"false"),L.classList.toggle("is-alt",P==="rgba"))}O&&O!==document.activeElement&&(O.value=R.hex)}function q(R,I=null){u={h:(R.h%360+360)%360,s:te(R.s,0,1),v:te(R.v,0,1),a:te(R.a,0,1)},J(),I&&K(I)}function N(R,I=null){q(ko(R),I)}function W(R,I,_){R.addEventListener("pointerdown",E=>{E.preventDefault();let A=E.pointerId,H=z=>{z.pointerId===A&&I(z)},G=z=>{z.pointerId===A&&(document.removeEventListener("pointermove",H),document.removeEventListener("pointerup",G),document.removeEventListener("pointercancel",G),_?.(z))};I(E),document.addEventListener("pointermove",H),document.addEventListener("pointerup",G),document.addEventListener("pointercancel",G)})}if(!d&&y){let R=y.querySelector(".card-body");if(R){R.classList.add("color-picker__body"),S=x("div",{className:"color-picker__palette-cursor"}),k=x("div",{className:"color-picker__palette"},S),w=x("div",{className:"color-picker__alpha-thumb"}),v=x("div",{className:"color-picker__alpha"},w),C=x("div",{className:"color-picker__hue-thumb"}),T=x("div",{className:"color-picker__hue"},C);let I=x("div",{className:"color-picker__main"},k,v),_=x("div",{className:"color-picker__hue-row"},T),E=wo({blockGameKeys:!0});M=E.input,M.classList.add("color-picker__hex-input"),M.value="",M.maxLength=9,M.spellcheck=!1,M.inputMode="text",M.setAttribute("aria-label",`Hex code for ${n}`),L=x("button",{type:"button",className:"color-picker__mode-btn",textContent:"HEX","aria-pressed":"false","aria-label":"Passer en saisie RGBA"}),E.root.classList.add("color-picker__hex-wrap");let A=x("div",{className:"color-picker__hex-row"},L,E.root);R.replaceChildren(I,_,A),W(k,G=>{if(!k||!S)return;let z=k.getBoundingClientRect(),ne=te((G.clientX-z.left)/z.width,0,1),rn=te((G.clientY-z.top)/z.height,0,1);q({...u,s:ne,v:1-rn},"input")},()=>K("change")),W(v,G=>{if(!v)return;let z=v.getBoundingClientRect(),ne=te((G.clientY-z.top)/z.height,0,1);q({...u,a:1-ne},"input")},()=>K("change")),W(T,G=>{if(!T)return;let z=T.getBoundingClientRect(),ne=te((G.clientX-z.left)/z.width,0,1);q({...u,h:ne*360},"input")},()=>K("change")),L.addEventListener("click",()=>{if(P=P==="hex"?"rgba":"hex",M){let G=He(u);M.value=P==="hex"?u.a===1?G.hex:G.hexa:G.rgba}J(),M?.focus(),M?.select()}),M.addEventListener("input",()=>{if(P==="hex"){let G=Jl(M.value);if(G!==M.value){let z=M.selectionStart??G.length;M.value=G,M.setSelectionRange(z,z)}}});let H=()=>{let G=M.value;if(P==="hex"){let z=$e(G);if(!z){M.value=u.a===1?He(u).hex:He(u).hexa;return}let ne=G.startsWith("#")?G.slice(1):G,rn=ne.length===4||ne.length===8;z.a=rn?z.a:u.a,N(z,"change")}else{let z=Yl(G),ne=hn(z);if(!ne){M.value=He(u).rgba;return}N(ne,"change")}};M.addEventListener("change",H),M.addEventListener("blur",H),M.addEventListener("keydown",G=>{G.key==="Enter"&&(H(),M.blur())})}}return d&&(y&&y.remove(),O=x("input",{className:"color-picker__native",type:"color",value:yn(dt({...u,a:1}))}),h.addEventListener("click",()=>O.click()),O.addEventListener("input",()=>{let R=$e(O.value);R&&(R.a=u.a,N(R,"input"),K("change"))}),p.appendChild(O)),J(),{root:p,isMobile:d,getValue:()=>He(u),setValue:(R,I)=>{let _=hn(R)??$e(R)??$e("#FFFFFF");_&&(typeof I=="number"&&(_.a=I),N(_,null))}}}function Xl(e){try{return!!e.isSecureContext}catch{return!1}}function xn(e){let t=e?.getRootNode?.();return t&&(t instanceof Document||t.host)?t:document}function To(){let e=navigator.platform||"",t=navigator.userAgent||"";return/Mac|iPhone|iPad|iPod/i.test(e)||/Mac OS|iOS/i.test(t)}async function Ql(){try{let e=await navigator.permissions?.query?.({name:"clipboard-write"});return e?e.state==="granted"||e.state==="prompt":!0}catch{return!0}}function Zl(e,t){let n=document.createElement("textarea");return n.value=e,n.setAttribute("readonly","true"),n.style.position="fixed",n.style.opacity="0",n.style.pointerEvents="none",n.style.top="0",t.appendChild?t.appendChild(n):document.body.appendChild(n),n}function ec(e){try{let t=window.getSelection?.();if(!t)return!1;let n=document.createRange();return n.selectNodeContents(e),t.removeAllRanges(),t.addRange(n),!0}catch{return!1}}async function tc(e){if(!("clipboard"in navigator))return{ok:!1,method:"clipboard-write"};if(!Xl(B))return{ok:!1,method:"clipboard-write"};if(!await Ql())return{ok:!1,method:"clipboard-write"};try{return await navigator.clipboard.writeText(e),{ok:!0,method:"clipboard-write"}}catch{return{ok:!1,method:"clipboard-write"}}}function nc(e,t){try{let n=t||xn(),o=Zl(e,n);o.focus(),o.select(),o.setSelectionRange(0,o.value.length);let r=!1;try{r=document.execCommand("copy")}catch{r=!1}return o.remove(),{ok:r,method:"execCommand"}}catch{return{ok:!1,method:"execCommand"}}}function oc(e,t){if(!t)return{ok:!1,method:"selection"};let n=t.textContent??"",o=!1;if(n!==e)try{t.textContent=e,o=!0}catch{}let r=ec(t);o&&setTimeout(()=>{try{t.textContent=n}catch{}},80);let a=To()?"\u2318C pour copier":"Ctrl+C pour copier";return{ok:r,method:"selection",hint:a}}async function rc(e,t={}){let n=(e??"").toString();if(!n.length)return{ok:!1,method:"noop"};let o=await tc(n);if(o.ok)return o;let r=t.injectionRoot||xn(t.valueNode||void 0),a=nc(n,r);if(a.ok)return a;let i=oc(n,t.valueNode||null);if(i.ok)return i;if(!t.disablePromptFallback)try{return window.prompt(vo()?"Copie manuelle (Discord bloque clipboard):":"Copie manuelle:",n),{ok:!0,method:"prompt"}}catch{}return{ok:!1,method:"noop"}}function Ao(e,t,n={}){let o=r=>{if(n.showTip){n.showTip(r);return}try{e.setAttribute("aria-label",r);let a=document.createElement("div");a.textContent=r,a.style.position="absolute",a.style.top="-28px",a.style.right="0",a.style.padding="4px 8px",a.style.borderRadius="8px",a.style.fontSize="12px",a.style.background="color-mix(in oklab, var(--bg) 85%, transparent)",a.style.border="1px solid var(--border)",a.style.color="var(--fg)",a.style.pointerEvents="none",a.style.opacity="0",a.style.transition="opacity .12s";let i=xn(e);i.appendChild?i.appendChild(a):document.body.appendChild(a);let s=e.getBoundingClientRect();a.style.left=`${s.right-8}px`,a.style.top=`${s.top-28}px`,requestAnimationFrame(()=>a.style.opacity="1"),setTimeout(()=>{a.style.opacity="0",setTimeout(()=>a.remove(),150)},1200)}catch{}};e.addEventListener("click",async r=>{r.stopPropagation();let a=(t()??"").toString(),i=await rc(a,{valueNode:n.valueNode??null,injectionRoot:n.injectionRoot??null,disablePromptFallback:n.disablePromptFallback??!1});n.onResult?.(i),i.ok?i.method==="clipboard-write"||i.method==="execCommand"||i.method==="prompt"?o("Copi\xE9"):i.method==="selection"&&o(i.hint||(To()?"\u2318C pour copier":"Ctrl+C pour copier")):o("Impossible de copier")})}var Ie={light:{"--bg":"rgba(255,255,255,0.7)","--fg":"#0f172a","--muted":"rgba(15,23,42,0.06)","--soft":"rgba(15,23,42,0.04)","--accent":"#2563eb","--border":"rgba(15,23,42,0.12)","--shadow":"rgba(2,6,23,.2)","--tab-bg":"#ffffff","--tab-fg":"#0f172a","--pill-from":"#4f46e5","--pill-to":"#06b6d4"},dark:{"--bg":"rgba(10,12,18,0.6)","--fg":"#e5e7eb","--muted":"rgba(229,231,235,0.08)","--soft":"rgba(229,231,235,0.05)","--accent":"#60a5fa","--border":"rgba(148,163,184,0.2)","--shadow":"rgba(0,0,0,.45)","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#e5e7eb","--pill-from":"#6366f1","--pill-to":"#06b6d4"},sepia:{"--bg":"rgba(247,242,231,0.72)","--fg":"#3b2f2f","--muted":"rgba(59,47,47,0.06)","--soft":"rgba(59,47,47,0.04)","--accent":"#b07d62","--border":"rgba(59,47,47,0.14)","--shadow":"rgba(0,0,0,.18)","--tab-bg":"#fff","--tab-fg":"#3b2f2f","--pill-from":"#b07d62","--pill-to":"#d4a373"},forest:{"--bg":"rgba(14,24,18,0.62)","--fg":"#e7f5e9","--muted":"rgba(231,245,233,0.08)","--soft":"rgba(231,245,233,0.05)","--accent":"#34d399","--border":"rgba(231,245,233,0.16)","--shadow":"rgba(0,0,0,.5)","--tab-bg":"rgba(255,255,255,0.06)","--tab-fg":"#e7f5e9","--pill-from":"#10b981","--pill-to":"#84cc16"},violet:{"--bg":"rgba(23, 16, 42, 0.68)","--fg":"#f5f3ff","--muted":"rgba(245,243,255,0.08)","--soft":"rgba(245,243,255,0.05)","--accent":"#a855f7","--border":"rgba(216,180,254,0.22)","--shadow":"rgba(12,3,30,.55)","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#ede9fe","--pill-from":"#a855f7","--pill-to":"#f472b6"},ocean:{"--bg":"rgba(10, 34, 46, 0.66)","--fg":"#e0f7ff","--muted":"rgba(224,247,255,0.07)","--soft":"rgba(224,247,255,0.05)","--accent":"#38bdf8","--border":"rgba(125, 211, 252, 0.22)","--shadow":"rgba(0, 16, 32, .52)","--tab-bg":"rgba(56,189,248,0.14)","--tab-fg":"#e0f7ff","--pill-from":"#0ea5e9","--pill-to":"#14b8a6"},ember:{"--bg":"rgba(34,18,10,0.64)","--fg":"#fff7ed","--muted":"rgba(255,247,237,0.08)","--soft":"rgba(255,247,237,0.05)","--accent":"#f97316","--border":"rgba(255, 159, 92, 0.24)","--shadow":"rgba(16,6,2,.52)","--tab-bg":"rgba(255,247,237,0.09)","--tab-fg":"#fff7ed","--pill-from":"#fb923c","--pill-to":"#facc15"}};function vn(e){let{host:t,themes:n,initialTheme:o,onThemeChange:r}=e,a=o,i=null,s=!1;function l(d){let u=n[d]||n[a]||{};s&&t.classList.add("theme-anim");for(let[p,m]of Object.entries(u))t.style.setProperty(p,m);s?(i!==null&&clearTimeout(i),i=B.setTimeout(()=>{t.classList.remove("theme-anim"),i=null},320)):s=!0,a=d,r?.(d)}function c(){return a}return l(o),{applyTheme:l,getCurrentTheme:c}}var Ot={ui:{expandedCards:{style:!1,system:!1}}};async function Co(){let e=await it("tab-settings",{version:1,defaults:Ot,sanitize:r=>({ui:{expandedCards:Mt(Ot.ui.expandedCards,r.ui?.expandedCards)}})});function t(r){let a=e.get();e.update({ui:{...a.ui,...r,expandedCards:Mt(a.ui.expandedCards,r.expandedCards)}})}function n(r,a){let i=e.get();e.update({ui:{...i.ui,expandedCards:{...i.ui.expandedCards,[r]:!!a}}})}function o(r){let a=e.get();n(r,!a.ui.expandedCards[r])}return{get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:o}}function Mo(e){return e.replace(/[_-]+/g," ").replace(/^\w/,t=>t.toUpperCase())}function ac(){return Object.keys(Ie).map(e=>({value:e,label:Mo(e)}))}var ic=["--bg","--fg","--accent","--muted","--soft","--border","--shadow","--tab-bg","--tab-fg","--pill-from","--pill-to"];function sc(e){return Mo(e.replace(/^--/,""))}function lc(e){return e.alpha<1?e.rgba:e.hex}var _t=class extends Re{constructor(n){super({id:"tab-settings",label:"Settings"});this.deps=n}async build(n){let o=this.createGrid("12px");o.id="settings",n.appendChild(o);let r;try{r=await Co()}catch{r={get:()=>Ot,set:()=>{},save:()=>{},setUI:()=>{},setCardExpanded:()=>{},toggleCard:()=>{}}}let a=r.get(),i=Object.keys(Ie),s=this.deps.getCurrentTheme?.()??this.deps.initialTheme,l=i.includes(s)?s:i[0]??"dark",c=l,d=Lt({text:"Theme",tone:"muted",size:"lg"}),u=ze({options:ac(),value:l,onChange:h=>{c=h,this.deps.applyTheme(h),this.renderThemePickers(h,p,c)}}),p=x("div",{className:"settings-theme-grid"}),m=Pe({title:"Style",padding:"lg",expandable:!0,defaultExpanded:!!a.ui.expandedCards.style,onExpandChange:h=>r.setCardExpanded("style",h)},x("div",{className:"kv settings-theme-row"},d.root,u.root),p);this.renderThemePickers(l,p,c);let g=this.createEnvCard({defaultExpanded:!!a.ui.expandedCards.system,onExpandChange:h=>r.setCardExpanded("system",h)});o.appendChild(m),o.appendChild(g)}renderThemePickers(n,o,r){let a=Ie[n];if(o.replaceChildren(),!!a)for(let i of ic){let s=a[i];if(s==null)continue;let l=So({label:sc(i),value:s,defaultExpanded:!1,onInput:c=>this.updateThemeVar(n,i,c,r),onChange:c=>this.updateThemeVar(n,i,c,r)});o.appendChild(l.root)}}updateThemeVar(n,o,r,a){let i=Ie[n];i&&(i[o]=lc(r),a===n&&this.deps.applyTheme(n))}createEnvCard(n){let o=n?.defaultExpanded??!1,r=n?.onExpandChange,a=(y,k)=>{let S=x("div",{className:"kv kv--inline-mobile"}),v=x("label",{},y),w=x("div",{className:"ro"});return typeof k=="string"?w.textContent=k:w.append(k),S.append(v,w),S},i=x("code",{},"\u2014"),s=x("span",{},"\u2014"),l=x("span",{},"\u2014"),c=x("span",{},"\u2014"),d=x("span",{},"\u2014"),u=x("span",{},"\u2014"),p=()=>{let y=ge();l.textContent=y.surface,c.textContent=y.platform,d.textContent=y.browser??"Unknown",u.textContent=y.os??"Unknown",i.textContent=y.host,s.textContent=y.isInIframe?"Yes":"No"},m=Ee({label:"Copy JSON",variant:"primary",size:"sm"});Ao(m,()=>{let y=ge();return JSON.stringify(y,null,2)});let g=x("div",{style:"width:100%;display:flex;justify-content:center;"},m),h=Pe({title:"System",variant:"soft",padding:"lg",footer:g,expandable:!0,defaultExpanded:o,onExpandChange:r},a("Surface",l),a("Platform",c),a("Browser",d),a("OS",u),a("Host",i),a("Iframe",s)),b=()=>{document.hidden||p()};return document.addEventListener("visibilitychange",b),p(),this.addCleanup(()=>document.removeEventListener("visibilitychange",b)),h}};function ut(e){return e<10?`0${e}`:String(e)}function ae(e){let t=/^(\d{1,2}):(\d{2})$/.exec((e||"").trim());if(!t)return 0;let n=Math.max(0,Math.min(23,parseInt(t[1],10)||0)),o=Math.max(0,Math.min(59,parseInt(t[2],10)||0));return n*60+o}function wn(e){let t=Math.max(0,Math.min(1439,e|0)),n=Math.floor(t/60),o=t%60;return`${ut(n)}:${ut(o)}`}function we(e,t){let n=ae(e),o=Math.max(0,Math.min(1439,n)),r=Math.floor(o/t)*t;return wn(r)}function cc(e){let t=Math.floor(e/60),n=e%60,o=t>=12;return{h12:t%12||12,m:n,pm:o}}function dc(e,t,n){return(e%12+(n?12:0))*60+t}function uc(e){return e.platform==="mobile"||e.os==="ios"||e.os==="android"}function Po(e={}){let{id:t,start:n="08:00",end:o="23:00",stepMinutes:r=5,disabled:a=!1,allowOvernight:i=!0,labels:s={from:"From",to:"To"},picker:l="auto",format:c="auto",useNativeOn:d,onChange:u}=e,p={start:we(n,r),end:we(o,r)},m=x("div",{className:"time-range",id:t});m.classList.add("time-range--stacked");let g=ge();if(l==="native"||l==="auto"&&(d?.(g)??uc(g)))return b();return y();function b(){let v=x("div",{className:"time-range-field",role:"group"}),w=x("span",{className:"time-range-label"},s.from||"From"),T=x("input",{className:"input time-range-input",type:"time",step:String(r*60),value:p.start}),C=x("div",{className:"time-range-field",role:"group"}),M=x("span",{className:"time-range-label"},s.to||"To"),L=x("input",{className:"input time-range-input",type:"time",step:String(r*60),value:p.end});v.append(w,T),C.append(M,L),m.append(v,C);function O(){T.value=p.start,L.value=p.end}function P(){u?.(J())}function K(R){let I=R.target,_=I===T,E=we(I.value||(_?p.start:p.end),r);_?(p.start=E,!i&&ae(p.end)<ae(p.start)&&(p.end=p.start)):(p.end=E,!i&&ae(p.end)<ae(p.start)&&(p.start=p.end)),O(),P()}T.addEventListener("change",K),T.addEventListener("blur",K),L.addEventListener("change",K),L.addEventListener("blur",K),a&&N(!0);function J(){return{...p}}function q(R){if(R.start&&(p.start=we(R.start,r)),R.end&&(p.end=we(R.end,r)),!i){let I=ae(p.start);ae(p.end)<I&&(p.end=p.start)}O(),P()}function N(R){T.disabled=R,L.disabled=R,m.classList.toggle("is-disabled",!!R)}function W(){T.removeEventListener("change",K),T.removeEventListener("blur",K),L.removeEventListener("change",K),L.removeEventListener("blur",K),m.replaceChildren()}return{root:m,getValue:J,setValue:q,setDisabled:N,destroy:W}}function y(){let v=x("label",{className:"time-range-field"}),w=x("span",{className:"time-range-label"},s.from||"From"),T=x("label",{className:"time-range-field"}),C=x("span",{className:"time-range-label"},s.to||"To"),M=c==="12h"||c==="auto"&&S(),L=k(p.start,M),O=k(p.end,M);v.append(w,L.container),T.append(C,O.container),m.append(v,T),a&&q(!0),J(),L.onAnyChange(()=>{p.start=L.to24h(r),!i&&ae(p.end)<ae(p.start)&&(p.end=p.start,O.setFrom24h(p.end)),u?.(P())}),O.onAnyChange(()=>{p.end=O.to24h(r),!i&&ae(p.end)<ae(p.start)&&(p.start=p.end,L.setFrom24h(p.start)),u?.(P())});function P(){return{...p}}function K(W){if(W.start&&(p.start=we(W.start,r)),W.end&&(p.end=we(W.end,r)),!i){let R=ae(p.start);ae(p.end)<R&&(p.end=p.start)}J(),u?.(P())}function J(){L.setFrom24h(p.start),O.setFrom24h(p.end)}function q(W){L.setDisabled(W),O.setDisabled(W),m.classList.toggle("is-disabled",!!W)}function N(){L.destroy(),O.destroy(),m.replaceChildren()}return{root:m,getValue:P,setValue:K,setDisabled:q,destroy:N}}function k(v,w){let T=x("div",{className:"time-picker"}),C=(A,H=2)=>{A.classList.add("time-picker-compact"),A.style.setProperty("--min-ch",String(H))},M=w?Array.from({length:12},(A,H)=>{let G=H+1;return{value:String(G),label:ut(G)}}):Array.from({length:24},(A,H)=>({value:String(H),label:ut(H)})),L=ze({size:"sm",options:M,placeholder:"HH",onChange:()=>W()});C(L.root,2);let O=Math.max(1,Math.min(30,Math.floor(e.stepMinutes??5))),P=Array.from({length:Math.floor(60/O)},(A,H)=>{let G=H*O;return{value:String(G),label:ut(G)}}),K=ze({size:"sm",options:P,placeholder:"MM",onChange:()=>W()});C(K.root,2);let J=w?ze({size:"sm",options:[{value:"am",label:"AM"},{value:"pm",label:"PM"}],value:"am",onChange:()=>W()}):null;J&&C(J.root,3),T.append(L.root,K.root,...J?[J.root]:[]);let q=null;function N(A){q=A}function W(){q?.()}function R(A){let H=ae(A);if(w){let G=cc(H);L.setValue(String(G.h12),{notify:!1}),K.setValue(String(Math.floor(G.m/O)*O),{notify:!1}),J.setValue(G.pm?"pm":"am",{notify:!1})}else{let G=Math.floor(H/60),z=H%60;L.setValue(String(G),{notify:!1}),K.setValue(String(Math.floor(z/O)*O),{notify:!1})}}function I(A){let H=parseInt(K.getValue()||"0",10)||0;if(w){let G=parseInt(L.getValue()||"12",10)||12,z=(J?.getValue()||"am")==="pm",ne=dc(G,H,z);return we(wn(ne),A)}else{let z=(parseInt(L.getValue()||"0",10)||0)*60+H;return we(wn(z),A)}}function _(A){L.setDisabled(A),K.setDisabled(A),J?.setDisabled(A),T.classList.toggle("is-disabled",!!A)}function E(){T.replaceChildren()}return{container:T,onAnyChange:N,setFrom24h:R,to24h:I,setDisabled:_,destroy:E}}function S(){try{let w=new Intl.DateTimeFormat(void 0,{hour:"numeric"}).format(new Date(2020,1,1,13));return/AM|PM|am|pm/.test(w)}catch{return!1}}}function Io(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function pc(e){let t=Io(e);t=t.replace(/\/\*[\s\S]*?\*\//g,r=>`<span class="tok tok-comm">${r}</span>`),t=t.replace(/(^|\s)(\/\/.*)$/gm,(r,a,i)=>`${a}<span class="tok tok-comm">${i}</span>`),t=t.replace(/`[^`\\]*(?:\\.[^`\\]*)*`/g,r=>`<span class="tok tok-str">${r}</span>`),t=t.replace(/'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/g,r=>`<span class="tok tok-str">${r}</span>`),t=t.replace(/\b(?:0[xX][0-9a-fA-F]+|0[bB][01]+|0[oO][0-7]+|\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?(?:[eE][+-]?\d+)?)\b/g,r=>`<span class="tok tok-num">${r}</span>`);let n=["break","case","catch","class","const","continue","debugger","default","delete","do","else","export","extends","finally","for","function","if","import","in","instanceof","let","new","return","super","switch","this","throw","try","typeof","var","void","while","with","yield","await","enum","implements","interface","package","private","protected","public","static","as","from","of"],o=new RegExp(`\\b(?:${n.join("|")})\\b`,"g");return t=t.replace(o,r=>`<span class="tok tok-kw">${r}</span>`),t=t.replace(/\b(?:true|false|null|undefined|NaN|Infinity)\b/g,r=>`<span class="tok tok-lit">${r}</span>`),t}function Eo(e){if(!e)return new Date().toLocaleTimeString();let t=e instanceof Date?e:new Date(e);if(isNaN(t.getTime()))return String(e);let n=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0"),r=String(t.getSeconds()).padStart(2,"0");return`${n}:${o}:${r}`}function Lo(e={}){let{id:t,className:n,height:o,maxLines:r=500,wrap:a=!1,mode:i="plain",showTimestamps:s=!0,autoScroll:l=!0}=e,c=x("div",{className:"log",id:t});n&&c.classList.add(...n.split(" ").filter(Boolean)),a&&c.classList.add("log--wrap");let d=x("div",{className:"log-viewport"}),u=x("div",{className:"log-lines"});d.appendChild(u),c.appendChild(d),o!=null&&(c.style.blockSize=typeof o=="number"?`${o}px`:String(o));let p=i,m=r,g=new Map;function h(N){return p==="js"?pc(N):Io(N)}function b(N){return N?g.get(N)?.body??u:u}function y(N){let W=typeof N=="string"?{text:N}:N||{text:""},R=b(W.groupKey);if(W.key){let E=Array.from(R.querySelectorAll(`.log-line[data-key="${W.key}"]`)).pop();if(E){W.level&&(E.classList.remove("log-level--debug","log-level--info","log-level--warn","log-level--error"),E.classList.add(`log-level--${W.level}`));let A=E.querySelector(".log-time");s&&A&&(A.textContent=Eo(W.time));let H=E.querySelector(".log-text");H&&(H.innerHTML=h(W.text)),l&&C();return}}let I=document.createElement("div");if(I.className="log-line",W.level&&I.classList.add(`log-level--${W.level}`),W.key&&(I.dataset.key=W.key),s){let E=document.createElement("span");E.className="log-time",E.textContent=Eo(W.time),I.appendChild(E)}let _=document.createElement("span");_.className="log-text",_.innerHTML=h(W.text),I.appendChild(_),R.appendChild(I),O(),l&&C()}function k(N){for(let W of N)y(W)}function S(){u.replaceChildren(),g.clear()}function v(N){p=N,C()}function w(N){c.classList.toggle("log--wrap",!!N),C()}function T(N){m=Math.max(1,Math.floor(N||1))}function C(){requestAnimationFrame(()=>{d.scrollTop=d.scrollHeight})}function M(){let N=0;for(let W=0;W<u.children.length;W+=1){let R=u.children[W];(R.classList.contains("log-line")||R.classList.contains("log-group"))&&(N+=1)}return N}function L(){let N=u.firstElementChild;if(!N)return!1;if(N.classList.contains("log-group")){let W=N.dataset.groupKey;W&&g.delete(W)}return N.remove(),!0}function O(){let N=M();for(;N>m&&L();)N--}function P(N,W){let R=W?.key||`g-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,6)}`;if(g.has(R))return R;let I=document.createElement("div");I.className="log-group",I.dataset.groupKey=R;let _=document.createElement("div");_.className="log-group-header",_.textContent=N;let E=document.createElement("div");E.className="log-group-body",I.append(_,E),u.appendChild(I),g.set(R,{root:I,header:_,body:E});let A=H=>{I.classList.toggle("is-collapsed",!!H)};return W?.collapsed&&A(!0),_.addEventListener("click",()=>A(!I.classList.contains("is-collapsed"))),l&&C(),R}function K(N){g.get(N)}function J(N,W){let R=g.get(N);R&&(W==null?R.root.classList.toggle("is-collapsed"):R.root.classList.toggle("is-collapsed",!!W))}let q=c;return q.add=y,q.addMany=k,q.clear=S,q.setMode=v,q.setWrap=w,q.setMaxLines=T,q.scrollToEnd=C,q.beginGroup=P,q.endGroup=K,q.toggleGroup=J,q}var ie={nativeCtor:null,captured:[],latestOpen:null},Ro=Symbol.for("ariesmod.ws.capture.wrapped"),Ho=Symbol.for("ariesmod.ws.capture.native"),Oo=1;function kn(e){return!!e&&e.readyState===Oo}function mc(){if(kn(ie.latestOpen))return ie.latestOpen;for(let e=ie.captured.length-1;e>=0;e--){let t=ie.captured[e];if(kn(t))return t}return null}function gc(e,t){ie.captured.push(e),ie.captured.length>25&&ie.captured.splice(0,ie.captured.length-25);let n=()=>{ie.latestOpen=e,t&&console.log("[WS] captured socket opened",e.url)};e.addEventListener("open",n),e.addEventListener("close",()=>{ie.latestOpen===e&&(ie.latestOpen=null),t&&console.log("[WS] captured socket closed",e.url)}),e.readyState===Oo&&n()}function _o(e=B,t={}){let n=!!t.debug,o=e?.WebSocket;if(typeof o!="function")return()=>{};if(o[Ro])return ie.nativeCtor=o[Ho]??ie.nativeCtor??null,()=>{};let r=o;ie.nativeCtor=r;function a(i,s){let l=s!==void 0?new r(i,s):new r(i);try{gc(l,n)}catch{}return l}try{a.prototype=r.prototype}catch{}try{Object.setPrototypeOf(a,r)}catch{}try{a.CONNECTING=r.CONNECTING,a.OPEN=r.OPEN,a.CLOSING=r.CLOSING,a.CLOSED=r.CLOSED}catch{}a[Ro]=!0,a[Ho]=r;try{e.WebSocket=a,n&&console.log("[WS] WebSocket capture installed")}catch{return()=>{}}return()=>{try{e.WebSocket===a&&(e.WebSocket=r)}catch{}}}function fc(e=B){let t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function pt(e=B){let t=mc();if(t)return{ws:t,source:"captured"};let n=fc(e);return n?{ws:n,source:"roomConnection"}:{ws:null,source:null}}function Dt(e,t={}){let n=t.pageWindow??B,o=t.intervalMs??500,r=!!t.debug,a=null,i=null,s=()=>{let c=pt(n);(c.ws!==a||c.source!==i)&&(a=c.ws,i=c.source,r&&console.log("[WS] best socket changed:",c.source,c.ws),e(c))};s();let l=setInterval(s,o);return()=>clearInterval(l)}function bc(e){if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return null}}function hc(e,t=B){let n=t?.MagicCircle_RoomConnection;if(n&&typeof n.sendMessage=="function")try{return Array.isArray(e)?n.sendMessage(...e):n.sendMessage(e),{ok:!0}}catch(a){return{ok:!1,reason:"error",error:a}}let{ws:o}=pt(t);if(!o)return{ok:!1,reason:"no-ws"};if(!kn(o))return{ok:!1,reason:"not-open"};let r=bc(e);if(r==null)return{ok:!1,reason:"error",error:new Error("Cannot stringify message")};try{return o.send(r),{ok:!0}}catch(a){return{ok:!1,reason:"error",error:a}}}function Do(e,t={},n=B){return hc({type:e,...t},n)}var xe={Welcome:"Welcome",PartialState:"PartialState",ServerErrorMessage:"ServerErrorMessage",Config:"Config",InappropriateContentRejected:"InappropriateContentRejected",Emote:"Emote",CurrencyTransaction:"CurrencyTransaction",Pong:"Pong"},V={Chat:"Chat",Emote:"Emote",Wish:"Wish",KickPlayer:"KickPlayer",SetPlayerData:"SetPlayerData",UsurpHost:"UsurpHost",Dev:"Dev",SetSelectedGame:"SetSelectedGame",VoteForGame:"VoteForGame",RequestGame:"RequestGame",RestartGame:"RestartGame",Ping:"Ping",PlayerPosition:"PlayerPosition",Teleport:"Teleport",CheckWeatherStatus:"CheckWeatherStatus",MoveInventoryItem:"MoveInventoryItem",DropObject:"DropObject",PickupObject:"PickupObject",ToggleFavoriteItem:"ToggleFavoriteItem",PutItemInStorage:"PutItemInStorage",RetrieveItemFromStorage:"RetrieveItemFromStorage",MoveStorageItem:"MoveStorageItem",LogItems:"LogItems",PlantSeed:"PlantSeed",WaterPlant:"WaterPlant",HarvestCrop:"HarvestCrop",SellAllCrops:"SellAllCrops",PurchaseSeed:"PurchaseSeed",PurchaseEgg:"PurchaseEgg",PurchaseTool:"PurchaseTool",PurchaseDecor:"PurchaseDecor",PlantEgg:"PlantEgg",HatchEgg:"HatchEgg",PlantGardenPlant:"PlantGardenPlant",PotPlant:"PotPlant",MutationPotion:"MutationPotion",PickupDecor:"PickupDecor",PlaceDecor:"PlaceDecor",RemoveGardenObject:"RemoveGardenObject",PlacePet:"PlacePet",FeedPet:"FeedPet",PetPositions:"PetPositions",SwapPet:"SwapPet",StorePet:"StorePet",NamePet:"NamePet",SellPet:"SellPet",ReportSpeakingStart:"ReportSpeakingStart"};var Im=new Set(Object.values(xe)),Lm=new Set(Object.values(V));function yc(e,t={},n=B){return Do(e,t,n)}function No(e,t=B){return yc(V.Chat,{scopePath:["Room"],message:e},t)}var Oe={timeRange:{start:"09:00",end:"18:00"},logSettings:{mode:"js",wrap:!1}};async function Go(){return it("tab-test",{version:1,defaults:Oe,sanitize:e=>({timeRange:{start:e.timeRange?.start||Oe.timeRange.start,end:e.timeRange?.end||Oe.timeRange.end},logSettings:{mode:e.logSettings?.mode||Oe.logSettings.mode,wrap:e.logSettings?.wrap??Oe.logSettings.wrap}})})}var Nt=class extends Re{constructor(){super({id:"tab-test",label:"Test"})}async build(t){let n=this.createContainer("test-section");t.appendChild(n);let o;try{o=await Go()}catch{o={get:()=>Oe,set:()=>{},update:()=>{},save:()=>{}}}let r=o.get(),a=Lt({text:"Plage horaire",hint:"Heures actives du mode 'Plage horaire'.",icon:"\u23F0"}),i=Po({start:r.timeRange.start,end:r.timeRange.end,stepMinutes:5,allowOvernight:!0,picker:"auto",format:"12h",onChange:b=>{o.update({timeRange:{start:b.start,end:b.end}})}}),s=x("div",a.root,i.root),l=Lo({height:220,mode:r.logSettings.mode,maxLines:1e3});r.logSettings.wrap&&l.setWrap(!0),l.add({level:"info",text:"Log initialise"}),l.add({level:"debug",text:"const x = 42; // demo"}),l.add({level:"warn",text:"Requete lente: fetch('/api') > 1200ms"}),l.add({level:"error",text:"new Error('Boom')"});let c=Ee({label:"Appliquer",variant:"primary",onClick:()=>{let b=i.getValue();l.add({level:"info",text:`[Apply] ${b.start} -> ${b.end}`})}}),d=Pe({title:"Parametres - Plage horaire",subtitle:"Choisis la fenetre d'activite",variant:"soft",padding:"lg",footer:bn(c)},s),u=Ee({label:"Clear",onClick:()=>No("test")}),p=Ee({label:r.logSettings.wrap?"Unwrap":"Wrap",onClick:()=>{let b=!l.classList.contains("log--wrap");l.setWrap(b),p.setLabel(b?"Unwrap":"Wrap"),o.update({logSettings:{...o.get().logSettings,wrap:b}})}}),m=Ee({label:`Mode: ${r.logSettings.mode}`,onClick:()=>{let y=o.get().logSettings.mode==="js"?"plain":"js";l.setMode(y),m.setLabel(`Mode: ${y}`),o.update({logSettings:{...o.get().logSettings,mode:y}})}}),g=Ee({label:"Add line",onClick:()=>l.add({level:"debug",text:"function tick(){ return Date.now(); } // sample"})}),h=Pe({title:"Logs",variant:"default",padding:"lg"},l,bn(u,p,m,g));n.appendChild(d),n.appendChild(h)}};function Sn(e){return[new _t(e),new Nt]}function Tn(e){let{shadow:t,initialOpen:n}=e,o=x("div",{className:"gemini-panel",id:"panel",ariaHidden:String(!n)}),r=x("div",{className:"gemini-tabbar"}),a=x("div",{className:"gemini-content",id:"content"}),i=x("div",{className:"gemini-resizer",title:"Resize"}),s=x("button",{className:"gemini-close",title:"Fermer",ariaLabel:"Fermer"},"\u2715");o.append(r,a,i);let l=x("div",{className:"gemini-wrapper"},o);return t.append(l),{panel:o,tabbar:r,content:a,resizer:i,closeButton:s,wrapper:l}}function An(e){let{resizer:t,host:n,panel:o,shadow:r,onWidthChange:a,initialWidth:i,minWidth:s,maxWidth:l}=e,c=s,d=l;function u(){let w=ge(),T=Math.round(B.visualViewport?.width??B.innerWidth??0);if(w.platform==="mobile"||w.os==="ios"||w.os==="android"){let C=getComputedStyle(r.host),M=parseFloat(C.getPropertyValue("--inset-l"))||0,L=parseFloat(C.getPropertyValue("--inset-r"))||0,O=Math.max(280,T-Math.round(M+L)),P=Math.min(420,Math.max(300,Math.floor(T*.66))),K=O;c=Math.min(P,O),d=K}else c=s,d=l;return{min:c,max:d}}function p(w){return Math.max(c,Math.min(d,Number(w)||i))}function m(w){let T=p(w);n.style.setProperty("--w",`${T}px`),a(T)}u();let g=ge(),h=!(g.platform==="mobile"||g.os==="ios"||g.os==="android"),b=!1,y=w=>{if(!b)return;w.preventDefault();let T=Math.round(B.innerWidth-w.clientX);m(T)},k=()=>{b&&(b=!1,document.body.style.cursor="",B.removeEventListener("mousemove",y),B.removeEventListener("mouseup",k))},S=w=>{h&&(w.preventDefault(),b=!0,document.body.style.cursor="ew-resize",B.addEventListener("mousemove",y),B.addEventListener("mouseup",k))};t.addEventListener("mousedown",S);function v(){t.removeEventListener("mousedown",S),B.removeEventListener("mousemove",y),B.removeEventListener("mouseup",k)}return{calculateResponsiveBounds:u,constrainWidthToLimits:p,setHudWidth:m,destroy:v}}function Cn(e){let{panel:t,onToggle:n,onClose:o,toggleCombo:r=l=>l.ctrlKey&&l.shiftKey&&l.key.toLowerCase()==="u",closeOnEscape:a=!0}=e;function i(l){let c=t.classList.contains("open");if(a&&l.key==="Escape"&&c){o();return}r(l)&&(l.preventDefault(),l.stopPropagation(),n())}document.addEventListener("keydown",i,{capture:!0});function s(){document.removeEventListener("keydown",i,{capture:!0})}return{destroy:s}}var Wo=`
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
`;var Mn=`
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
`;var Pn=`
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
`;var En=`
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
`;function Z(e,t,n){if(e.querySelector(`style[data-style-id="${n}"]`))return;let o=document.createElement("style");o.setAttribute("data-style-id",n),o.textContent=t,e.appendChild(o)}var Bo=`
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
  
`;var Vo=`
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
`;var jo=`
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
`;var Fo=`
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
`;var zo=`
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
`;var $o=`
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
`;var Uo=`
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
`;var Ko=`
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
`;var qo=`
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
`;var Jo=`
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
`;var Yo=`
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
`;var Xo=`
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
`;var Qo=`
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
`;var Zo=`
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
`;var er=`
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
`;var tr=`
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
`;var nr=`
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
`;var vc={all:"initial",position:"fixed",top:"0",right:"0",zIndex:"2147483647",pointerEvents:"auto",fontFamily:'system-ui, -apple-system, "Segoe UI", Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',fontSize:"13px",lineHeight:"1.35"};function wc(e="gemini-root"){let t=document.createElement("div");t.id=e,Object.assign(t.style,vc),(document.body||document.documentElement).appendChild(t);let n=t.attachShadow({mode:"open"});return{host:t,shadow:n}}function In(e){let{hostId:t="gemini-hud-root",initialWidth:n,initialOpen:o,onWidthChange:r,onOpenChange:a,themes:i,initialTheme:s,onThemeChange:l,buildSections:c,initialTab:d,onTabChange:u,toggleCombo:p=_=>_.ctrlKey&&_.shiftKey&&_.key.toLowerCase()==="u",closeOnEscape:m=!0,minWidth:g=420,maxWidth:h=720}=e,{host:b,shadow:y}=wc(t);Z(y,Mn,"variables"),Z(y,Pn,"primitives"),Z(y,En,"utilities"),Z(y,Wo,"hud"),Z(y,Bo,"card"),Z(y,Vo,"badge"),Z(y,jo,"button"),Z(y,Fo,"input"),Z(y,zo,"label"),Z(y,$o,"navTabs"),Z(y,Uo,"searchBar"),Z(y,Ko,"select"),Z(y,qo,"switch"),Z(y,Jo,"table"),Z(y,Yo,"timeRangePicker"),Z(y,Xo,"tooltip"),Z(y,Qo,"slider"),Z(y,Zo,"reorderableList"),Z(y,er,"colorPicker"),Z(y,tr,"log"),Z(y,nr,"settings");let{panel:k,tabbar:S,content:v,resizer:w,closeButton:T,wrapper:C}=Tn({shadow:y,initialOpen:o});function M(_){k.dispatchEvent(new CustomEvent("gemini:hud-open-change",{detail:{isOpen:_},bubbles:!0})),a?.(_)}function L(_){let E=k.classList.contains("open");k.classList.toggle("open",_),k.setAttribute("aria-hidden",_?"false":"true"),_!==E&&M(_)}L(o),T.addEventListener("click",_=>{_.preventDefault(),_.stopPropagation(),L(!1)});let O=vn({host:b,themes:i,initialTheme:s,onThemeChange:l}),P=An({resizer:w,host:b,panel:k,shadow:y,onWidthChange:r||(()=>{}),initialWidth:n,minWidth:g,maxWidth:h});P.setHudWidth(n);let K=c({applyTheme:O.applyTheme,initialTheme:s,getCurrentTheme:O.getCurrentTheme,setHUDWidth:P.setHudWidth,setHUDOpen:L}),J=new rt(K,v,{applyTheme:O.applyTheme,getCurrentTheme:O.getCurrentTheme}),q=K.map(_=>({id:_.id,label:_.label})),N=go(q,d||q[0]?.id||"",_=>{J.activate(_),u?.(_)});N.root.style.flex="1 1 auto",N.root.style.minWidth="0",S.append(N.root,T),J.activate(d||q[0]?.id||"");let W=Cn({panel:k,onToggle:()=>L(!k.classList.contains("open")),onClose:()=>L(!1),toggleCombo:p,closeOnEscape:m}),R=()=>{N.recalc();let _=parseInt(getComputedStyle(b).getPropertyValue("--w"))||n;P.calculateResponsiveBounds(),P.setHudWidth(_)};B.addEventListener("resize",R);function I(){W.destroy(),P.destroy(),B.removeEventListener("resize",R)}return{host:b,shadow:y,wrapper:C,panel:k,content:v,setOpen:L,setWidth:P.setHudWidth,sections:K,manager:J,nav:N,destroy:I}}var Ue={isOpen:"gemini.hud.isOpen",width:"gemini.hud.width",theme:"gemini.hud.theme",activeTab:"gemini.hud.activeTab"},mt={isOpen:!1,width:480,theme:"dark",activeTab:"tab-settings"};function Ln(){return{isOpen:Me(Ue.isOpen,mt.isOpen),width:Me(Ue.width,mt.width),theme:Me(Ue.theme,mt.theme),activeTab:Me(Ue.activeTab,mt.activeTab)}}function Ke(e,t){at(Ue[e],t)}var kc="https://i.imgur.com/IMkhMur.png",Sc="Stats";function Rn(e){let t=e.iconUrl||kc,n=e.ariaLabel||"Open MGH",o=null,r=null,a=null,i=!1,s=null,l=null,c=["Chat","Leaderboard","Stats","Open Activity Log"],d=S=>{try{return typeof CSS<"u"&&CSS&&typeof CSS.escape=="function"?CSS.escape(S):S.replace(/"/g,'\\"')}catch{return S}};function u(){let S=document.querySelector(c.map(w=>`button[aria-label="${d(w)}"]`).join(","));if(!S)return null;let v=S.parentElement;for(;v&&v!==document.body;){if(c.reduce((T,C)=>T+v.querySelectorAll(`button[aria-label="${d(C)}"]`).length,0)>=2)return v;v=v.parentElement}return null}function p(S){return S}function m(S){let v=Array.from(S.querySelectorAll("button[aria-label]"));if(!v.length)return{refBtn:null,refWrapper:null};let w=v.filter(K=>K.dataset.mghBtn!=="true"&&(K.getAttribute("aria-label")||"")!==(e.ariaLabel||"Open MGH")),T=w.length?w:v,C=T.find(K=>(K.getAttribute("aria-label")||"").toLowerCase()===Sc.toLowerCase())||null,M=T.length>=2?T.length-2:T.length-1,L=C||T[M],O=L.parentElement,P=O&&O.parentElement===S&&O.tagName==="DIV"?O:null;return{refBtn:L,refWrapper:P}}function g(S,v,w){let T=S.cloneNode(!1);T.type="button",T.setAttribute("aria-label",v),T.title=v,T.dataset.mghBtn="true",T.style.pointerEvents="auto",T.removeAttribute("id");let C=document.createElement("img");return C.src=w,C.alt="MGH",C.style.pointerEvents="none",C.style.userSelect="none",C.style.width="76%",C.style.height="76%",C.style.objectFit="contain",C.style.display="block",C.style.margin="auto",T.appendChild(C),T.addEventListener("click",M=>{M.preventDefault(),M.stopPropagation();try{e.onClick?.()}catch{}}),T}function h(){if(i)return!1;i=!0;let S=!1;try{let v=u();if(!v)return!1;s!==v&&(s=v);let{refBtn:w,refWrapper:T}=m(v);if(!w)return!1;r=v.querySelector('div[data-mgh-wrapper="true"]'),!r&&T&&(r=T.cloneNode(!1),r.dataset.mghWrapper="true",r.removeAttribute("id"),S=!0);let C=r?.querySelector('button[data-mgh-btn="true"]')||null;o||(o=C),o||(o=g(w,n,t),r?r.appendChild(o):o.parentElement!==v&&v.appendChild(o),S=!0),r&&r.parentElement!==v&&(v.appendChild(r),S=!0);let M=v;if(M&&M!==l){try{k.disconnect()}catch{}l=M,k.observe(l,{childList:!0,subtree:!0})}return S}finally{i=!1}}h();let b=document.getElementById("App")||document.body,y=null,k=new MutationObserver(S=>{let v=S.every(T=>{let C=Array.from(T.addedNodes||[]),M=Array.from(T.removedNodes||[]),L=C.concat(M);if(L.length===0){let O=T.target;return r&&(O===r||r.contains(O))||o&&(O===o||o.contains(O))}return L.every(O=>!!(!(O instanceof HTMLElement)||r&&(O===r||r.contains(O))||o&&(O===o||o.contains(O))))}),w=S.some(T=>Array.from(T.removedNodes||[]).some(C=>C instanceof HTMLElement?!!(r&&(C===r||r.contains(C))||o&&(C===o||o.contains(C))):!1));v&&!w||y===null&&(y=window.setTimeout(()=>{if(y=null,h()&&r){let C=r.parentElement;C&&C.lastElementChild!==r&&C.appendChild(r)}},150))});return k.observe(b,{childList:!0,subtree:!0}),a=()=>k.disconnect(),()=>{try{a?.()}catch{}try{r?.remove()}catch{}}}var Mc={},ar=[];function Tc(){return ar.slice()}function Ac(e){ar.push(e)}function ir(e){try{return JSON.parse(e)}catch{return}}function or(e){if(typeof e=="string"){let t=ir(e);return t!==void 0?t:e}return e}function sr(e){if(e!=null){if(typeof e=="string"){let t=ir(e);return t!==void 0?sr(t):e}if(Array.isArray(e)&&typeof e[0]=="string")return e[0];if(typeof e=="object"){let t=e;return t.type??t.Type??t.kind??t.messageType}}}function Cc(e){let t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function j(e,t,n){let o=typeof t=="boolean"?t:!0,r=typeof t=="function"?t:n,a=(i,s)=>{if(sr(i)!==e)return;let c=r(i,s);return c&&typeof c=="object"&&"kind"in c?c:typeof c=="boolean"?c?void 0:{kind:"drop"}:o?void 0:{kind:"drop"}};return Ac(a),a}var gt=new WeakSet,rr=new WeakMap;function lr(e){let t=e.pageWindow,n=!!e.debug,o=e.middlewares&&e.middlewares.length?e.middlewares:Tc();if(!o.length)return()=>{};let r=p=>({ws:p,pageWindow:t,debug:n}),a=(p,m)=>{let g=p;for(let h of o){let b=h(g,r(m));if(b){if(b.kind==="drop")return{kind:"drop"};b.kind==="replace"&&(g=b.message)}}return g!==p?{kind:"replace",message:g}:void 0},i=null,s=null,l=null,c=()=>{let p=t?.MagicCircle_RoomConnection,m=p?.sendMessage;if(!p||typeof m!="function")return!1;if(gt.has(m))return!0;let g=m.bind(p);function h(...b){let y=b.length===1?b[0]:b,k=or(y),S=a(k,Cc(t));if(S?.kind==="drop"){n&&console.log("[WS] drop outgoing (RoomConnection.sendMessage)",k);return}if(S?.kind==="replace"){let v=S.message;return b.length>1&&Array.isArray(v)?(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",k,"=>",v),g(...v)):(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",k,"=>",v),g(v))}return g(...b)}gt.add(h),rr.set(h,m);try{p.sendMessage=h,gt.add(p.sendMessage),n&&console.log("[WS] outgoing patched via MagicCircle_RoomConnection.sendMessage")}catch{return!1}return i=()=>{try{p.sendMessage===h&&(p.sendMessage=m)}catch{}},!0};(()=>{let p=t?.WebSocket?.prototype,m=p?.send;if(typeof m!="function"||gt.has(m))return;function g(h){let b=or(h),y=a(b,this);if(y?.kind==="drop"){n&&console.log("[WS] drop outgoing (ws.send)",b);return}if(y?.kind==="replace"){let k=y.message,S=typeof k=="string"||k instanceof ArrayBuffer||k instanceof Blob?k:JSON.stringify(k);return n&&console.log("[WS] replace outgoing (ws.send)",b,"=>",k),m.call(this,S)}return m.call(this,h)}gt.add(g),rr.set(g,m);try{p.send=g,n&&console.log("[WS] outgoing patched via WebSocket.prototype.send")}catch{return}s=()=>{try{p.send===g&&(p.send=m)}catch{}}})();let u=e.waitForRoomConnectionMs??4e3;if(!c()&&u>0){let p=Date.now();l=setInterval(()=>{if(c()){clearInterval(l),l=null;return}Date.now()-p>u&&(clearInterval(l),l=null,n&&console.log("[WS] RoomConnection not found, only ws.send is patched"))},250)}return()=>{if(l){try{clearInterval(l)}catch{}l=null}if(i){try{i()}catch{}i=null}if(s){try{s()}catch{}s=null}}}(function(){try{let t=Mc,n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();var Lc={},dr=[];function Pc(){return dr.slice()}function cr(e){dr.push(e)}function Ec(e){if(e!=null){if(typeof e=="object"){let t=e;if(typeof t.type=="string")return t.type;if(typeof t.Type=="string")return t.Type;if(typeof t.kind=="string")return t.kind;if(typeof t.messageType=="string")return t.messageType}if(Array.isArray(e)&&typeof e[0]=="string")return e[0]}}function Ic(e){if(typeof e=="string")try{return JSON.parse(e)}catch{return e}return e}var Hn=Symbol.for("ariesmod.ws.handlers.patched");function ee(e,t){if(typeof e=="string"){let r=e,a={match:i=>i.kind==="message"&&i.type===r,handle:t};return cr(a),a}let n=e,o={match:r=>r.kind==="close"&&r.code===n,handle:t};return cr(o),o}function ur(e,t=Pc(),n={}){let o=n.pageWindow??window,r=!!n.debug;if(e[Hn])return()=>{};e[Hn]=!0;let a={ws:e,pageWindow:o,debug:r},i=u=>{for(let p of t)try{if(!p.match(u))continue;if(p.handle(u,a)===!0)return}catch(m){r&&console.error("[WS] handler error",m,u)}},s=u=>{let p=Ic(u.data),m=Ec(p);i({kind:"message",raw:u.data,data:p,type:m})},l=u=>{i({kind:"close",code:u.code,reason:u.reason,wasClean:u.wasClean,event:u})},c=u=>i({kind:"open",event:u}),d=u=>i({kind:"error",event:u});return e.addEventListener("message",s),e.addEventListener("close",l),e.addEventListener("open",c),e.addEventListener("error",d),()=>{try{e.removeEventListener("message",s)}catch{}try{e.removeEventListener("close",l)}catch{}try{e.removeEventListener("open",c)}catch{}try{e.removeEventListener("error",d)}catch{}try{delete e[Hn]}catch{}}}(function(){try{let t=Lc,n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();ee(4800,(e,t)=>{t.debug&&console.log("[WS][Close] Auth failure",e.code,e.reason)});ee(4300,(e,t)=>{t.debug&&console.log("[WS][Close] Superseded",e.code,e.reason)});ee(4400,(e,t)=>{t.debug&&console.log("[WS][Close] Heartbeat expired",e.code,e.reason)});ee(4500,(e,t)=>{t.debug&&console.log("[WS][Close] Player kicked",e.code,e.reason)});ee(4200,(e,t)=>{t.debug&&console.log("[WS][Close] Player left voluntarily",e.code,e.reason)});ee(4100,(e,t)=>{t.debug&&console.log("[WS][Close] Reconnect initiated",e.code,e.reason)});ee(4310,(e,t)=>{t.debug&&console.log("[WS][Close] Server disposed",e.code,e.reason)});ee(4250,(e,t)=>{t.debug&&console.log("[WS][Close] User session superseded",e.code,e.reason)});ee(4710,(e,t)=>{t.debug&&console.log("[WS][Close] Version expired",e.code,e.reason)});ee(4700,(e,t)=>{t.debug&&console.log("[WS][Close] Version mismatch",e.code,e.reason)});ee(xe.Config,(e,t)=>{t.debug&&console.log("[WS][STC] Config",e.data)});ee(xe.CurrencyTransaction,(e,t)=>{t.debug&&console.log("[WS][STC] CurrencyTransaction",e.data)});ee(xe.Emote,(e,t)=>{t.debug&&console.log("[WS][STC] Emote",e.data)});ee(xe.InappropriateContentRejected,(e,t)=>{t.debug&&console.log("[WS][STC] InappropriateContentRejected",e.data)});ee(xe.PartialState,(e,t)=>{t.debug&&console.log("[WS][STC] PartialState",e.data)});ee(xe.Pong,(e,t)=>{t.debug&&console.log("[WS][STC] Pong",e.data)});ee(xe.ServerErrorMessage,(e,t)=>{t.debug&&console.log("[WS][STC] ServerErrorMessage",e.data)});ee(xe.Welcome,(e,t)=>{t.debug&&console.log("[WS][STC] Welcome",e.data)});j(V.PlantSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantSeed"),!!1));j(V.WaterPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] WaterPlant"),!!1));j(V.HarvestCrop,(e,t)=>(t.debug&&console.log("[MW][Garden] HarvestCrop"),!!1));j(V.SellAllCrops,(e,t)=>(t.debug&&console.log("[MW][Garden] SellAllCrops"),!!1));j(V.PurchaseSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseSeed"),!!1));j(V.PurchaseEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseEgg"),!!1));j(V.PurchaseTool,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseTool"),!!1));j(V.PurchaseDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseDecor"),!!1));j(V.PlantEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantEgg"),!!1));j(V.HatchEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] HatchEgg"),!!1));j(V.PlantGardenPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantGardenPlant"),!!1));j(V.PotPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PotPlant"),!!1));j(V.MutationPotion,(e,t)=>(t.debug&&console.log("[MW][Garden] MutationPotion"),!!1));j(V.PickupDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PickupDecor"),!!1));j(V.PlaceDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PlaceDecor"),!!1));j(V.RemoveGardenObject,(e,t)=>(t.debug&&console.log("[MW][Garden] RemoveGardenObject"),!!1));j(V.MoveInventoryItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveInventoryItem"),!!1));j(V.DropObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] DropObject"),!!1));j(V.PickupObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] PickupObject"),!!1));j(V.ToggleFavoriteItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] ToggleFavoriteItem"),!!1));j(V.PutItemInStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] PutItemInStorage"),!!1));j(V.RetrieveItemFromStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] RetrieveItemFromStorage"),!!1));j(V.MoveStorageItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveStorageItem"),!!1));j(V.LogItems,(e,t)=>(t.debug&&console.log("[MW][Inventory] LogItems"),!!1));j(V.PlacePet,(e,t)=>(t.debug&&console.log("[MW][Pets] PlacePet"),!!1));j(V.FeedPet,(e,t)=>(t.debug&&console.log("[MW][Pets] FeedPet"),!!1));j(V.PetPositions,(e,t)=>(t.debug&&console.log("[MW][Pets] PetPositions"),!!1));j(V.SwapPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SwapPet"),!!1));j(V.StorePet,(e,t)=>(t.debug&&console.log("[MW][Pets] StorePet"),!!1));j(V.NamePet,(e,t)=>(t.debug&&console.log("[MW][Pets] NamePet"),!!1));j(V.SellPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SellPet"),!!1));console.log("[WS] TESTTEST");j(V.SetSelectedGame,(e,t)=>(t.debug&&console.log("[MW][Session] SetSelectedGame"),!!1));j(V.VoteForGame,(e,t)=>(t.debug&&console.log("[MW][Session] VoteForGame"),!!1));j(V.RequestGame,(e,t)=>(t.debug&&console.log("[MW][Session] RequestGame"),!!1));j(V.RestartGame,(e,t)=>(t.debug&&console.log("[MW][Session] RestartGame"),!!1));j(V.Ping,(e,t)=>(t.debug&&console.log("[MW][Session] Ping"),!!1));j(V.PlayerPosition,(e,t)=>(t.debug&&console.log("[MW][Session] PlayerPosition"),!!1));j(V.Teleport,(e,t)=>(t.debug&&console.log("[MW][Session] Teleport"),!!1));j(V.CheckWeatherStatus,(e,t)=>(t.debug&&console.log("[MW][Session] CheckWeatherStatus"),!!1));j(V.Chat,(e,t)=>(t.debug&&console.log("[MW][Social] Chat"),!!1));j(V.Dev,(e,t)=>(t.debug&&console.log("[MW][Social] Dev"),!!1));j(V.Emote,(e,t)=>(t.debug&&console.log("[MW][Social] Emote"),!!1));j(V.Wish,(e,t)=>(t.debug&&console.log("[MW][Social] Wish"),!!1));j(V.KickPlayer,(e,t)=>(t.debug&&console.log("[MW][Social] KickPlayer"),!!1));j(V.ReportSpeakingStart,(e,t)=>(t.debug&&console.log("[MW][Voice] ReportSpeakingStart"),!!1));j(V.SetPlayerData,(e,t)=>(t.debug&&console.log("[MW][Social] SetPlayerData"),!!1));j(V.UsurpHost,(e,t)=>(t.debug&&console.log("[MW][Social] UsurpHost"),!!1));function Rc(e={}){let t=e.pageWindow??B,n=e.pollMs??500,o=!!e.debug,r=[];r.push(_o(t,{debug:o})),r.push(lr({pageWindow:t,middlewares:e.middlewares,debug:o}));let a=null,i=s=>{if(a){try{a()}catch{}a=null}s&&(a=ur(s,e.handlers,{debug:o,pageWindow:t}))};return i(pt(t).ws),r.push(Dt(s=>i(s.ws),{intervalMs:n,debug:o,pageWindow:t})),{getWs:()=>pt(t).ws,dispose:()=>{for(let s=r.length-1;s>=0;s--)try{r[s]()}catch{}if(a){try{a()}catch{}a=null}}}}var Gt=null;function pr(e={}){return Gt||(Gt=Rc(e),Gt)}var ve=e=>new Promise(t=>setTimeout(t,e)),le=e=>{try{return e()}catch{return}},pe=(e,t,n)=>Math.max(t,Math.min(n,e)),mr=e=>pe(e,0,1);async function On(e,t,n){let o=performance.now();for(;performance.now()-o<t;){let r=await Promise.race([e,ve(50).then(()=>null)]);if(r!==null)return r}throw new Error(`${n} timeout`)}var ft=null;function Hc(){return B?.document??(typeof document<"u"?document:null)}function _n(e){if(ft!==null)return;let t=e??Hc();if(!t)return;let n=t.scripts;for(let o=0;o<n.length;o++){let a=n.item(o)?.src;if(!a)continue;let i=a.match(/\/(?:r\/\d+\/)?version\/([^/]+)/);if(i?.[1]){ft=i[1];return}}}function Oc(){return _n(),ft}async function _c(e=15e3){let t=performance.now();for(;performance.now()-t<e;){if(_n(),ft)return ft;await ve(50)}throw new Error("MGVersion timeout (gameVersion not found)")}var bt={init:_n,get:Oc,wait:_c};var gr=B?.location?.origin||"https://magicgarden.gg";function fr(){return typeof GM_xmlhttpRequest=="function"}function br(e,t="text"){return new Promise((n,o)=>{GM_xmlhttpRequest({method:"GET",url:e,responseType:t,onload:r=>r.status>=200&&r.status<300?n(r):o(new Error(`HTTP ${r.status} for ${e}`)),onerror:()=>o(new Error(`Network error for ${e}`)),ontimeout:()=>o(new Error(`Timeout for ${e}`))})})}async function qe(e){if(fr())return JSON.parse((await br(e,"text")).responseText);let t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.json()}async function Wt(e){if(fr())return(await br(e,"blob")).response;let t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.blob()}function hr(e){return new Promise((t,n)=>{let o=URL.createObjectURL(e),r=B?.Image||Image,a=new r;a.decoding="async",a.onload=()=>{URL.revokeObjectURL(o),t(a)},a.onerror=()=>{URL.revokeObjectURL(o),n(new Error("Image decode failed"))},a.src=o})}var se=(e,t)=>e.replace(/\/?$/,"/")+String(t||"").replace(/^\//,""),Dc=e=>e.lastIndexOf("/")>=0?e.slice(0,e.lastIndexOf("/")+1):"",Dn=(e,t)=>String(t||"").startsWith("/")?String(t).slice(1):Dc(e)+String(t||"");var Bt=null,Vt=null;async function yr(){return Vt||Bt||(Bt=(async()=>{let e=await bt.wait(15e3);return Vt=`${gr}/version/${e}/assets/`,Vt})(),Bt)}async function Nc(e){let t=await yr();return se(t,e)}var fe={base:yr,url:Nc};var Nn=new Map;async function Gc(e){let t=e||await fe.base();if(Nn.has(t))return Nn.get(t);let n=qe(se(t,"manifest.json"));return Nn.set(t,n),n}function Wc(e,t){return e?.bundles?.find(n=>n?.name===t)||null}function Bc(e){let t=new Set;for(let n of e?.assets||[])for(let o of n?.src||[])typeof o=="string"&&o.endsWith(".json")&&o!=="manifest.json"&&t.add(o);return Array.from(t)}var ce={load:Gc,getBundle:Wc,listJsonFromBundle:Bc};var xr=Function.prototype.bind,Y={_bindPatched:!1,engine:null,tos:null,app:null,renderer:null,ticker:null,stage:null},vr,wr,kr,Vc=new Promise(e=>{vr=e}),jc=new Promise(e=>{wr=e}),Fc=new Promise(e=>{kr=e});function zc(e){return!!(e&&typeof e=="object"&&typeof e.start=="function"&&typeof e.destroy=="function"&&e.app&&e.app.stage&&e.app.renderer&&e.systems&&typeof e.systems.values=="function")}function $c(e){try{for(let t of e.systems.values()){let n=t?.system;if(n?.name==="tileObject")return n}}catch{}return null}function Uc(e){Y.engine=e,Y.tos=$c(e)||null,Y.app=e.app||null,Y.renderer=e.app?.renderer||null,Y.ticker=e.app?.ticker||null,Y.stage=e.app?.stage||null;try{vr(e)}catch{}try{Y.app&&wr(Y.app)}catch{}try{Y.renderer&&kr(Y.renderer)}catch{}}function Gn(){return Y.engine?!0:(Y._bindPatched||(Y._bindPatched=!0,Function.prototype.bind=function(e,...t){let n=xr.call(this,e,...t);try{!Y.engine&&zc(e)&&(Function.prototype.bind=xr,Y._bindPatched=!1,Uc(e))}catch{}return n}),!1)}Gn();async function Kc(e=15e3){let t=performance.now();for(;performance.now()-t<e;){if(Y.engine)return!0;Gn(),await ve(50)}throw new Error("MGPixiHooks: engine capture timeout")}async function qc(e=15e3){return Y.engine||await Kc(e),!0}function Jc(){return Y.engine&&Y.app?{ok:!0,engine:Y.engine,tos:Y.tos,app:Y.app}:(Gn(),{ok:!1,engine:Y.engine,tos:Y.tos,app:Y.app,note:"Not captured. Wait for room, or reload."})}var oe={engineReady:Vc,appReady:jc,rendererReady:Fc,engine:()=>Y.engine,tos:()=>Y.tos,app:()=>Y.app,renderer:()=>Y.renderer,ticker:()=>Y.ticker,stage:()=>Y.stage,PIXI:()=>B.PIXI||null,init:qc,hook:Jc,ready:()=>!!Y.engine};var jt=null,D={ready:!1,app:null,renderer:null,ctors:null,baseUrl:null,textures:new Map,animations:new Map,live:new Set,defaultParent:null,overlay:null,categoryIndex:null},_e=(...e)=>{try{console.log("[MGSprite]",...e)}catch{}};function Yc(e,t,n=25e3){let o=[e],r=new Set,a=0;for(;o.length&&a++<n;){let i=o.pop();if(!i||r.has(i))continue;if(r.add(i),t(i))return i;let s=i.children;if(Array.isArray(s))for(let l=s.length-1;l>=0;l--)o.push(s[l])}return null}function Xc(e){let t=B.PIXI;if(t?.Texture&&t?.Sprite&&t?.Container&&t?.Rectangle)return{Container:t.Container,Sprite:t.Sprite,Texture:t.Texture,Rectangle:t.Rectangle,AnimatedSprite:t.AnimatedSprite||null};let n=e?.stage,o=Yc(n,r=>r?.texture?.frame&&r?.constructor&&r?.texture?.constructor&&r?.texture?.frame?.constructor);if(!o)throw new Error("No Sprite found yet (constructors).");return{Container:n.constructor,Sprite:o.constructor,Texture:o.texture.constructor,Rectangle:o.texture.frame.constructor,AnimatedSprite:t?.AnimatedSprite||null}}async function Qc(e,t=15e3){let n=performance.now();for(;performance.now()-n<t;)try{return Xc(e)}catch{await ve(50)}throw new Error("Constructors timeout")}var Zc=e=>e&&typeof e=="object"&&e.frames&&e.meta&&typeof e.meta.image=="string";function Wn(e,t,n,o,r){return new e(t,n,o,r)}function ed(e,t,n,o,r,a,i){let s;try{s=new e({source:t.source,frame:n,orig:o,trim:r||void 0,rotate:a||0})}catch{s=new e(t.baseTexture||t,n,o,r||void 0,a||0)}if(i)if(s.defaultAnchor?.set)try{s.defaultAnchor.set(i.x,i.y)}catch{}else s.defaultAnchor?(s.defaultAnchor.x=i.x,s.defaultAnchor.y=i.y):s.defaultAnchor={x:i.x,y:i.y};try{s.updateUvs?.()}catch{}return s}function td(e,t,n,o){let{Texture:r,Rectangle:a}=o;for(let[i,s]of Object.entries(e.frames)){let l=s.frame,c=!!s.rotated,d=c?2:0,u=c?l.h:l.w,p=c?l.w:l.h,m=Wn(a,l.x,l.y,u,p),g=s.sourceSize||{w:l.w,h:l.h},h=Wn(a,0,0,g.w,g.h),b=null;if(s.trimmed&&s.spriteSourceSize){let y=s.spriteSourceSize;b=Wn(a,y.x,y.y,y.w,y.h)}n.set(i,ed(r,t,m,h,b,d,s.anchor||null))}}function Ft(e){let t=String(e||"").trim();return t?t.startsWith("sprite/")||t.startsWith("sprites/")?t:t.includes("/")?`sprite/${t}`:t:""}function ht(e,t){let n=String(e||"").trim().replace(/^sprites?\//,"").replace(/^\/+|\/+$/g,""),o=String(t||"").trim();return o.includes("/")||!n?Ft(o):`sprite/${n}/${o}`}function Je(e,t){let n=ht(e,t);if(D.textures.has(n)||D.animations.has(n))return n;let o=String(t||"").trim();if(D.textures.has(o)||D.animations.has(o))return o;let r=Ft(o);return D.textures.has(r)||D.animations.has(r)?r:n}function nd(){if(D.overlay)return D.overlay;let e=new D.ctors.Container;e.sortableChildren=!0,e.zIndex=99999999;try{D.app.stage.sortableChildren=!0}catch{}return D.app.stage.addChild(e),D.overlay=e,e}function od(){let e=D.defaultParent;if(!e)return null;try{return typeof e=="function"?e():e}catch{return null}}async function rd(){let e=await ce.load(D.baseUrl),t=ce.getBundle(e,"default");if(!t)throw new Error("No default bundle in manifest");let n=ce.listJsonFromBundle(t),o=new Set,r=new Map,a=(s,l)=>{let c=String(s||"").trim(),d=String(l||"").trim();!c||!d||(r.has(c)||r.set(c,new Set),r.get(c).add(d))};async function i(s){if(o.has(s))return;o.add(s);let l=await qe(se(D.baseUrl,s));if(!Zc(l))return;let c=l.meta?.related_multi_packs;if(Array.isArray(c))for(let m of c)await i(Dn(s,m));let d=Dn(s,l.meta.image),u=await hr(await Wt(se(D.baseUrl,d))),p=D.ctors.Texture.from(u);td(l,p,D.textures,D.ctors);for(let m of Object.keys(l.frames||{})){let g=/^sprite\/([^/]+)\/(.+)$/.exec(m);g&&a(g[1],g[2])}if(l.animations&&typeof l.animations=="object")for(let[m,g]of Object.entries(l.animations)){if(!Array.isArray(g))continue;let h=g.map(b=>D.textures.get(b)).filter(Boolean);h.length>=2&&D.animations.set(m,h)}}for(let s of n)await i(s);D.categoryIndex=r}function ad(e,t,n){if(!D.ready)throw new Error("MGSprite not ready yet");let o,r;typeof t=="string"?(o=Je(e,t),r=n||{}):(o=Je(null,e),r=t||{});let a=r.parent||od()||nd(),i=D.renderer?.width||D.renderer?.view?.width||innerWidth,s=D.renderer?.height||D.renderer?.view?.height||innerHeight,l=r.center?i/2:r.x??i/2,c=r.center?s/2:r.y??s/2,d,u=D.animations.get(o);if(u&&u.length>=2){let g=D.ctors.AnimatedSprite;if(g)d=new g(u),d.animationSpeed=r.fps?r.fps/60:r.speed??.15,d.loop=r.loop??!0,d.play();else{let h=new D.ctors.Sprite(u[0]),y=1e3/Math.max(1,r.fps||8),k=0,S=0,v=w=>{let T=D.app.ticker?.deltaMS??w*16.666666666666668;if(k+=T,k<y)return;let C=k/y|0;k%=y,S=(S+C)%u.length,h.texture=u[S]};h.__mgTick=v,D.app.ticker?.add?.(v),d=h}}else{let g=D.textures.get(o);if(!g)throw new Error(`Unknown sprite/anim key: ${o}`);d=new D.ctors.Sprite(g)}let p=r.anchorX??d.texture?.defaultAnchor?.x??.5,m=r.anchorY??d.texture?.defaultAnchor?.y??.5;return d.anchor?.set?.(p,m),d.position.set(l,c),d.scale.set(r.scale??1),d.alpha=r.alpha??1,d.rotation=r.rotation??0,d.zIndex=r.zIndex??999999,a.addChild(d),D.live.add(d),d.__mgDestroy=()=>{try{d.__mgTick&&D.app.ticker?.remove?.(d.__mgTick)}catch{}try{d.destroy?.({children:!0,texture:!1,baseTexture:!1})}catch{try{d.destroy?.()}catch{}}D.live.delete(d)},d}function id(e){let t=D.renderer;if(t?.extract?.canvas)return t.extract.canvas(e);if(t?.plugins?.extract?.canvas)return t.plugins.extract.canvas(e);throw new Error("No extract.canvas available on renderer")}function sd(e,t,n){if(!D.ready)throw new Error("MGSprite not ready yet");let o,r;typeof t=="string"?(o=Je(e,t),r=n||{}):(o=Je(null,e),r=t||{});let a=D.animations.get(o),i=Math.max(0,(r.frameIndex??0)|0),s=a?.length?a[i%a.length]:D.textures.get(o);if(!s)throw new Error(`Unknown sprite/anim key: ${o}`);let l=new D.ctors.Sprite(s),c=r.anchorX??l.texture?.defaultAnchor?.x??.5,d=r.anchorY??l.texture?.defaultAnchor?.y??.5;l.anchor?.set?.(c,d),l.scale.set(r.scale??1);let u=r.pad??2,p=new D.ctors.Container;p.addChild(l);try{p.updateTransform?.()}catch{}let m=l.getBounds?.(!0)||{x:0,y:0,width:l.width,height:l.height};l.position.set(-m.x+u,-m.y+u);let g=id(p);try{p.destroy?.({children:!0})}catch{}return g}function ld(){for(let e of Array.from(D.live))e.__mgDestroy?.()}function cd(e){return D.defaultParent=e,!0}function dd(e){return D.defaultParent=e,!0}function ud(e,t){let n=typeof t=="string"?Je(e,t):Je(null,e);return D.textures.has(n)||D.animations.has(n)}function Ye(){if(!D.ready)throw new Error("MGSprite not ready yet")}function pd(){Ye();let e=D.categoryIndex;return e?Array.from(e.keys()).sort((t,n)=>t.localeCompare(n)):[]}function md(e){Ye();let t=String(e||"").trim();if(!t)return[];let n=D.categoryIndex;return n?Array.from(n.get(t)?.values()||[]).sort((o,r)=>o.localeCompare(r)):[]}function gd(e,t){Ye();let n=String(e||"").trim(),o=String(t||"").trim();if(!n||!o)return!1;let r=D.categoryIndex;if(!r)return!1;let a=n.toLowerCase(),i=o.toLowerCase();for(let[s,l]of r.entries())if(s.toLowerCase()===a){for(let c of l.values())if(c.toLowerCase()===i)return!0}return!1}function fd(e){Ye();let t=D.categoryIndex;if(!t)return[];let n=String(e||"").trim().toLowerCase(),o=[];for(let[r,a]of t.entries())for(let i of a.values()){let s=ht(r,i);(!n||s.toLowerCase().startsWith(n))&&o.push(s)}return o.sort((r,a)=>r.localeCompare(a))}function bd(e){Ye();let t=String(e||"").trim();if(!t)return null;let n=Ft(t),o=/^sprite\/([^/]+)\/(.+)$/.exec(n);if(!o)return null;let r=o[1],a=o[2],i=D.categoryIndex,s=r.toLowerCase(),l=a.toLowerCase(),c=r,d=a;if(i){let u=Array.from(i.keys()).find(g=>g.toLowerCase()===s);if(!u)return null;c=u;let p=i.get(u);if(!p)return null;let m=Array.from(p.values()).find(g=>g.toLowerCase()===l);if(!m)return null;d=m}return{category:c,id:d,key:ht(c,d)}}function hd(e,t){Ye();let n=String(e||"").trim(),o=String(t||"").trim();if(!n||!o)throw new Error("getIdPath(category, id) requires both category and id");let r=D.categoryIndex;if(!r)throw new Error("Sprite categories not indexed");let a=n.toLowerCase(),i=o.toLowerCase(),s=Array.from(r.keys()).find(d=>d.toLowerCase()===a)||n,l=r.get(s);if(!l)throw new Error(`Unknown sprite category: ${n}`);let c=Array.from(l.values()).find(d=>d.toLowerCase()===i)||o;if(!l.has(c))throw new Error(`Unknown sprite id: ${n}/${o}`);return ht(s,c)}async function yd(){return D.ready?!0:jt||(jt=(async()=>{let e=performance.now();_e("init start");let t=await On(oe.appReady,15e3,"PIXI app");_e("app ready");let n=await On(oe.rendererReady,15e3,"PIXI renderer");return _e("renderer ready"),D.app=t,D.renderer=n||t?.renderer||null,D.ctors=await Qc(t),_e("constructors resolved"),D.baseUrl=await fe.base(),_e("base url",D.baseUrl),await rd(),_e("atlases loaded","textures",D.textures.size,"animations",D.animations.size,"categories",D.categoryIndex?.size??0),D.ready=!0,_e("ready in",Math.round(performance.now()-e),"ms"),!0})(),jt)}var ke={init:yd,ready:()=>D.ready,show:ad,toCanvas:sd,clear:ld,attach:cd,attachProvider:dd,has:ud,key:(e,t)=>ht(e,t),getCategories:pd,getCategoryId:md,hasId:gd,listIds:fd,getIdInfo:bd,getIdPath:hd};var Vn=B,Se=Vn.Object||Object,jn=Se.keys,zt=Se.values,$t=Se.entries,De={items:["WateringCan","PlanterPot","Shovel","RainbowPotion"],decor:["SmallRock","MediumRock","LargeRock","WoodBench","StoneBench","MarbleBench"],mutations:["Gold","Rainbow","Wet","Chilled","Frozen"],eggs:["CommonEgg","UncommonEgg","RareEgg","LegendaryEgg"],pets:["Worm","Snail","Bee","Chicken","Bunny"],abilities:["ProduceScaleBoost","DoubleHarvest","SeedFinderI","CoinFinderI"],plants:["Carrot","Strawberry","Aloe","Blueberry","Apple"]},xd=["Rain","Frost","Dawn","AmberMoon"],Sr=/main-[^/]+\.js(\?|$)/,Tr=new WeakSet,U={ready:!1,hookInstalled:!1,data:{items:null,decor:null,mutations:null,eggs:null,pets:null,abilities:null,plants:null,weather:null},spritesResolved:!1,spritesResolving:null,weatherTimer:null,weatherAttempts:0},Ne=(e,t)=>t.every(n=>e.includes(n));function Ge(e,t){U.data[e]==null&&(U.data[e]=t,vd()&&Mr())}function vd(){return Object.values(U.data).every(e=>e!=null)}function Ar(e,t){if(!e||typeof e!="object"||Tr.has(e))return;Tr.add(e);let n;try{n=jn(e)}catch{return}if(!n||n.length===0)return;let o;if(!U.data.items&&Ne(n,De.items)&&(o=e.WateringCan,o&&typeof o=="object"&&"coinPrice"in o&&"creditPrice"in o&&Ge("items",e)),!U.data.decor&&Ne(n,De.decor)&&(o=e.SmallRock,o&&typeof o=="object"&&"coinPrice"in o&&"creditPrice"in o&&Ge("decor",e)),!U.data.mutations&&Ne(n,De.mutations)&&(o=e.Gold,o&&typeof o=="object"&&"baseChance"in o&&"coinMultiplier"in o&&Ge("mutations",e)),!U.data.eggs&&Ne(n,De.eggs)&&(o=e.CommonEgg,o&&typeof o=="object"&&"faunaSpawnWeights"in o&&"secondsToHatch"in o&&Ge("eggs",e)),!U.data.pets&&Ne(n,De.pets)&&(o=e.Worm,o&&typeof o=="object"&&"coinsToFullyReplenishHunger"in o&&Array.isArray(o.diet)&&Ge("pets",e)),!U.data.abilities&&Ne(n,De.abilities)&&(o=e.ProduceScaleBoost,o&&typeof o=="object"&&"trigger"in o&&"baseParameters"in o&&Ge("abilities",e)),!U.data.plants&&Ne(n,De.plants)&&(o=e.Carrot,o&&typeof o=="object"&&o.seed&&o.plant&&o.crop&&Ge("plants",e)),!(t>=3))for(let r=0;r<n.length;r++){let a;try{a=e[n[r]]}catch{continue}a&&typeof a=="object"&&Ar(a,t+1)}}function Bn(e){try{Ar(e,0)}catch{}}function Cr(){if(!U.hookInstalled){U.hookInstalled=!0;try{Se.keys=function(t){return Bn(t),jn.apply(this,arguments)},zt&&(Se.values=function(t){return Bn(t),zt.apply(this,arguments)}),$t&&(Se.entries=function(t){return Bn(t),$t.apply(this,arguments)})}catch{}}}function Mr(){if(U.hookInstalled){try{Se.keys=jn,zt&&(Se.values=zt),$t&&(Se.entries=$t)}catch{}U.hookInstalled=!1}}function wd(){try{for(let e of Vn.document?.scripts||[]){let t=e?.src?String(e.src):"";if(Sr.test(t))return t}}catch{}try{for(let e of Vn.performance?.getEntriesByType?.("resource")||[]){let t=e?.name?String(e.name):"";if(Sr.test(t))return t}}catch{}return null}function kd(e,t){let n=Math.max(e.lastIndexOf("const ",t),e.lastIndexOf("let ",t),e.lastIndexOf("var ",t));if(n<0)return null;let o=e.indexOf("=",n);if(o<0||o>t)return null;let r=e.indexOf("{",o);if(r<0||r>t)return null;let a=0,i="",s=!1;for(let l=r;l<e.length;l++){let c=e[l];if(i){if(s){s=!1;continue}if(c==="\\"){s=!0;continue}c===i&&(i="");continue}if(c==='"'||c==="'"){i=c;continue}if(c==="{")a++;else if(c==="}"&&--a===0)return e.slice(r,l+1)}return null}function Sd(e){let t={},n=!1;for(let o of xd){let r=e?.[o];if(!r||typeof r!="object")continue;let a=r.iconSpriteKey||null,{iconSpriteKey:i,...s}=r;t[o]={weatherId:o,spriteId:a,...s},n=!0}return t.Sunny||(t.Sunny={weatherId:"Sunny",name:"Sunny",spriteId:"sprite/ui/SunnyIcon",type:"primary"}),!n||t.Rain&&t.Rain.mutator?.mutation!=="Wet"?null:t}async function Td(){if(U.data.weather)return!0;let e=wd();if(!e)return!1;let t="";try{let s=await fetch(e,{credentials:"include"});if(!s.ok)return!1;t=await s.text()}catch{return!1}let n=t.indexOf("fixedTimeSlots:[0,48,96,144,192,240]");if(n<0&&(n=t.indexOf('name:"Amber Moon"')),n<0)return!1;let o=kd(t,n);if(!o)return!1;let r=o.replace(/\b[A-Za-z_$][\w$]*\.(Rain|Frost|Dawn|AmberMoon)\b/g,'"$1"'),a;try{a=Function('"use strict";return('+r+")")()}catch{return!1}let i=Sd(a);return i?(U.data.weather=i,!0):!1}function Ad(){if(U.weatherTimer)return;U.weatherAttempts=0;let e=setInterval(async()=>{(await Td()||++U.weatherAttempts>200)&&(clearInterval(e),U.weatherTimer=null)},50);U.weatherTimer=e}function Cd(e){return String(e||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^A-Za-z0-9]/g,"").trim()}function Md(e,t=[]){let n=new Set,o=r=>{let a=String(r||"").trim();a&&n.add(a)};o(e);for(let r of t)o(r);for(let r of Array.from(n.values()))r.endsWith("s")?o(r.slice(0,-1)):o(`${r}s`),r.endsWith("es")&&o(r.slice(0,-2));return Array.from(n.values()).filter(Boolean)}function Pr(e,t,n,o=[],r=[]){let a=Md(e,o);if(!a.length)return null;let i=[t,...r].filter(d=>typeof d=="string"),s=d=>{let u=String(d||"").trim();if(!u)return null;for(let p of a)try{if(ke.has(p,u))return ke.getIdPath(p,u)}catch{}return null};for(let d of i){let u=s(d);if(u)return u}let l=Cd(n||""),c=s(l||n||"");if(c)return c;try{for(let d of a){let u=ke.listIds(`sprite/${d}/`),p=i.map(g=>String(g||"").toLowerCase()),m=String(n||l||"").toLowerCase();for(let g of u){let b=(g.split("/").pop()||"").toLowerCase();if(p.some(y=>y&&y===b)||b===m)return g}for(let g of u){let b=(g.split("/").pop()||"").toLowerCase();if(p.some(y=>y&&b.includes(y))||m&&b.includes(m))return g}}}catch{}return null}function me(e,t,n,o,r=[],a=[]){if(!e||typeof e!="object")return;let i=e.tileRef;if(!i||typeof i!="object")return;let s=String(i.spritesheet||t||"").trim(),l=Pr(s,n,o,r,a);if(l)try{e.spriteId=l}catch{}let c=e.rotationVariants;if(c&&typeof c=="object")for(let d of Object.values(c))me(d,s,n,o);if(e.immatureTileRef){let d={tileRef:e.immatureTileRef};me(d,s,n,o),d.spriteId&&(e.immatureSpriteId=d.spriteId)}if(e.topmostLayerTileRef){let d={tileRef:e.topmostLayerTileRef};me(d,s,n,o),d.spriteId&&(e.topmostLayerSpriteId=d.spriteId)}e.activeState&&typeof e.activeState=="object"&&me(e.activeState,s,n,e.activeState?.name||o)}function Pd(e,t,n,o=[]){if(!Array.isArray(t)||t.length===0)return null;let r=t[0],a=t.slice(1);return Pr(e,r,n??null,o,a)}function Ed(e){for(let[t,n]of Object.entries(e.items||{}))me(n,"items",t,n?.name,["item"]);for(let[t,n]of Object.entries(e.decor||{}))me(n,"decor",t,n?.name);for(let[t,n]of Object.entries(e.mutations||{})){me(n,"mutations",t,n?.name,["mutation"]);let o=Pd("mutation-overlay",[`${t}TallPlant`,`${t}TallPlantIcon`,t],n?.name,["mutation-overlay"]);if(o)try{n.overlaySpriteId=o}catch{}}for(let[t,n]of Object.entries(e.eggs||{}))me(n,"pets",t,n?.name,["pet"]);for(let[t,n]of Object.entries(e.pets||{}))me(n,"pets",t,n?.name,["pet"]);for(let[t,n]of Object.entries(e.plants||{})){let o=n;o.seed&&me(o.seed,o.seed?.tileRef?.spritesheet||"seeds",`${t}Seed`,o.seed?.name||`${t} Seed`,["seed","plant","plants"],[t]),o.plant&&me(o.plant,o.plant?.tileRef?.spritesheet||"plants",`${t}Plant`,o.plant?.name||`${t} Plant`,["plant","plants","tallplants"],[t]),o.crop&&me(o.crop,o.crop?.tileRef?.spritesheet||"plants",t,o.crop?.name||t,["plant","plants"],[`${t}Crop`])}}async function Er(){if(!U.spritesResolved)return U.spritesResolving||(U.spritesResolving=(async()=>{try{await Ir(2e4,50),await ke.init(),Ed(U.data),U.spritesResolved=!0}catch(e){try{console.warn("[MGData] sprite resolution failed",e)}catch{}}finally{U.spritesResolving=null}})()),U.spritesResolving}async function Id(){return U.ready||(Cr(),Ad(),Er(),U.ready=!0),!0}function Ld(){return U.ready}function Rd(){return Mr(),U.weatherTimer&&(clearInterval(U.weatherTimer),U.weatherTimer=null),U.ready=!1,!0}function Hd(){return!U.spritesResolved&&!U.spritesResolving&&Er(),{...U.data}}function Od(e){return U.data[e]??null}function _d(e){return U.data[e]!=null}async function Ir(e=1e4,t=50){let n=Date.now();for(;Date.now()-n<e;){if(Object.values(U.data).some(o=>o!=null))return{...U.data};await ve(t)}throw new Error("MGData.waitAll: timeout")}async function Dd(e,t=1e4,n=50){let o=Date.now();for(;Date.now()-o<t;){let r=U.data[e];if(r!=null)return r;await ve(n)}throw new Error(`MGData.waitFor: timeout waiting for "${e}"`)}var Ut={init:Id,ready:Ld,stop:Rd,getAll:Hd,get:Od,has:_d,waitAll:Ir,waitFor:Dd};Cr();var Kt=null,be={ready:!1,xform:null,xformAt:0};function Qe(e){try{if(typeof structuredClone=="function")return structuredClone(e)}catch{}try{return JSON.parse(JSON.stringify(e))}catch{}return e}function yt(){return oe.tos()}function $n(){return oe.engine()}function Nd(){let e=yt()?.map?.cols;return Number.isFinite(e)&&e>0?e:null}function Un(e,t){let n=Nd();return n?t*n+e|0:null}function We(e,t,n=!0){let o=yt(),r=Un(e,t);if(!o||r==null)return{gidx:null,tv:null};let a=o.tileViews?.get?.(r)||null;if(!a&&n&&typeof o.getOrCreateTileView=="function")try{a=o.getOrCreateTileView(r)}catch{}return{gidx:r,tv:a||null}}function Xe(e,t,n,o={}){let r=o.ensureView!==!1,a=o.forceUpdate!==!1,i=$n(),{gidx:s,tv:l}=We(Number(e),Number(t),r);if(s==null)throw new Error("MGTile: cols unavailable (engine/TOS not ready)");if(!l)throw new Error("MGTile: TileView unavailable (not instantiated)");let c=l.tileObject;if(typeof l.onDataChanged!="function")throw new Error("MGTile: tileView.onDataChanged not found (different API?)");if(l.onDataChanged(n),a&&i?.reusableContext&&typeof l.update=="function")try{l.update(i.reusableContext)}catch{}return{ok:!0,tx:Number(e),ty:Number(t),gidx:s,before:c,after:l.tileObject}}function Kn(e,t){if(!e)throw new Error("MGTile: no tileObject on this tile");if(e.objectType!==t)throw new Error(`MGTile: expected objectType "${t}", got "${e.objectType}"`)}function Fn(e,t){if("startTime"in t&&(e.startTime=Number(t.startTime)),"endTime"in t&&(e.endTime=Number(t.endTime)),"targetScale"in t&&(e.targetScale=Number(t.targetScale)),"mutations"in t){if(!Array.isArray(t.mutations))throw new Error("MGTile: mutations must be an array of strings");e.mutations=t.mutations.slice()}}function Te(){if(!be.ready)throw new Error("MGTile: not ready. Call MGTile.init() first.")}function zn(e){if(!e)return null;let t=r=>r&&(typeof r.getGlobalPosition=="function"||typeof r.toGlobal=="function"),n=["container","root","view","tile","ground","base","floor","bg","background","baseSprite","tileSprite","displayObject","gfx","graphics","sprite"];for(let r of n)if(t(e[r]))return e[r];if(t(e))return e;let o=[e.container,e.root,e.view,e.displayObject,e.tileSprite,e.gfx,e.graphics,e.sprite];for(let r of o)if(t(r))return r;try{for(let r of Object.keys(e))if(t(e[r]))return e[r]}catch{}return null}function qt(e){let t=le(()=>e?.getGlobalPosition?.());if(t&&Number.isFinite(t.x)&&Number.isFinite(t.y))return{x:t.x,y:t.y};let n=le(()=>e?.toGlobal?.({x:0,y:0}));return n&&Number.isFinite(n.x)&&Number.isFinite(n.y)?{x:n.x,y:n.y}:null}function Gd(e){try{if(!e?.getBounds)return"center";let t=e.getBounds(),n=qt(e);if(!n||!t||!Number.isFinite(t.width)||!Number.isFinite(t.height))return"center";let o=t.x+t.width/2,r=t.y+t.height/2;return Math.hypot(n.x-o,n.y-r)<Math.hypot(n.x-t.x,n.y-t.y)?"center":"topleft"}catch{return"center"}}function Wd(){let e=yt(),t=e?.map?.cols,n=e?.map?.rows;if(!e||!Number.isFinite(t)||t<=1)return null;let o=Number.isFinite(n)&&n>1?n:null,r=[[0,0],[1,1],[Math.min(2,t-2),0],[0,1]];o&&o>2&&r.push([Math.floor(t/2),Math.floor(o/2)]);for(let[a,i]of r){if(a<0||i<0||a>=t||o&&i>=o)continue;let s=We(a,i,!0).tv,l=a+1<t?We(a+1,i,!0).tv:null,c=We(a,i+1,!0).tv,d=zn(s),u=zn(l),p=zn(c);if(!d||!u||!p)continue;let m=qt(d),g=qt(u),h=qt(p);if(!m||!g||!h)continue;let b={x:g.x-m.x,y:g.y-m.y},y={x:h.x-m.x,y:h.y-m.y},k=b.x*y.y-b.y*y.x;if(!Number.isFinite(k)||Math.abs(k)<1e-6)continue;let S=1/k,v={a:y.y*S,b:-y.x*S,c:-b.y*S,d:b.x*S},w={x:m.x-a*b.x-i*y.x,y:m.y-a*b.y-i*y.y},T=Gd(d),C=T==="center"?w:{x:w.x+.5*(b.x+y.x),y:w.y+.5*(b.y+y.y)};return{ok:!0,cols:t,rows:o,vx:b,vy:y,inv:v,anchorMode:T,originCenter:C}}return null}async function Bd(e=15e3){return be.ready?!0:Kt||(Kt=(async()=>{if(await oe.init(e),!yt())throw new Error("MGTile: engine captured but tileObject system not found");return be.ready=!0,!0})(),Kt)}function Vd(){return oe.hook()}function Jt(e,t,n={}){Te();let o=n.ensureView!==!1,r=n.clone!==!1,{gidx:a,tv:i}=We(Number(e),Number(t),o);if(a==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!i)return{tx:Number(e),ty:Number(t),gidx:a,tileView:null,tileObject:void 0};let s=i.tileObject;return{tx:Number(e),ty:Number(t),gidx:a,tileView:i,tileObject:r?Qe(s):s}}function jd(e,t,n={}){return Te(),Xe(e,t,null,n)}function Fd(e,t,n,o={}){Te();let a=Jt(e,t,{...o,clone:!1}).tileView?.tileObject;Kn(a,"plant");let i=Qe(a);if(Array.isArray(i.slots)||(i.slots=[]),"plantedAt"in n&&(i.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(i.maturedAt=Number(n.maturedAt)),"species"in n&&(i.species=String(n.species)),"slotIdx"in n&&"slotPatch"in n){let s=Number(n.slotIdx)|0;if(!i.slots[s])throw new Error(`MGTile: plant slot ${s} doesn't exist`);return Fn(i.slots[s],n.slotPatch),Xe(e,t,i,o)}if("slots"in n){let s=n.slots;if(Array.isArray(s)){for(let l=0;l<s.length;l++)if(s[l]!=null){if(!i.slots[l])throw new Error(`MGTile: plant slot ${l} doesn't exist`);Fn(i.slots[l],s[l])}}else if(s&&typeof s=="object")for(let l of Object.keys(s)){let c=Number(l)|0;if(Number.isFinite(c)){if(!i.slots[c])throw new Error(`MGTile: plant slot ${c} doesn't exist`);Fn(i.slots[c],s[c])}}else throw new Error("MGTile: patch.slots must be array or object map");return Xe(e,t,i,o)}return Xe(e,t,i,o)}function zd(e,t,n,o={}){Te();let a=Jt(e,t,{...o,clone:!1}).tileView?.tileObject;Kn(a,"decor");let i=Qe(a);return"rotation"in n&&(i.rotation=Number(n.rotation)),Xe(e,t,i,o)}function $d(e,t,n,o={}){Te();let a=Jt(e,t,{...o,clone:!1}).tileView?.tileObject;Kn(a,"egg");let i=Qe(a);return"plantedAt"in n&&(i.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(i.maturedAt=Number(n.maturedAt)),Xe(e,t,i,o)}function Ud(e,t,n,o={}){Te();let r=o.ensureView!==!1,a=o.forceUpdate!==!1,i=$n(),{gidx:s,tv:l}=We(Number(e),Number(t),r);if(s==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!l)throw new Error("MGTile: TileView unavailable");let c=l.tileObject,d=typeof n=="function"?n(Qe(c)):n;if(l.onDataChanged(d),a&&i?.reusableContext&&typeof l.update=="function")try{l.update(i.reusableContext)}catch{}return{ok:!0,tx:Number(e),ty:Number(t),gidx:s,before:c,after:l.tileObject}}function Kd(e,t,n={}){Te();let o=n.ensureView!==!1,{gidx:r,tv:a}=We(Number(e),Number(t),o);if(r==null)throw new Error("MGTile: cols unavailable");if(!a)return{ok:!0,tx:Number(e),ty:Number(t),gidx:r,tv:null,tileObject:void 0};let i=n.clone!==!1,s=a.tileObject;return{ok:!0,tx:Number(e),ty:Number(t),gidx:r,objectType:s?.objectType??null,tileObject:i?Qe(s):s,tvKeys:Object.keys(a||{}).sort(),tileView:a}}function Lr(){return Te(),be.xform=Wd(),be.xformAt=Date.now(),{ok:!!be.xform?.ok,xform:be.xform}}function qd(e,t={}){if(Te(),!e||!Number.isFinite(e.x)||!Number.isFinite(e.y))return null;let n=Number.isFinite(t.maxAgeMs)?Number(t.maxAgeMs):1500;(!be.xform?.ok||t.forceRebuild||Date.now()-be.xformAt>n)&&Lr();let o=be.xform;if(!o?.ok)return null;let r=e.x-o.originCenter.x,a=e.y-o.originCenter.y,i=o.inv.a*r+o.inv.b*a,s=o.inv.c*r+o.inv.d*a,l=Math.floor(i),c=Math.floor(s),d=[[l,c],[l+1,c],[l,c+1],[l+1,c+1]],u=null,p=1/0;for(let[m,g]of d){if(m<0||g<0||m>=o.cols||Number.isFinite(o.rows)&&o.rows!==null&&g>=o.rows)continue;let h=o.originCenter.x+m*o.vx.x+g*o.vy.x,b=o.originCenter.y+m*o.vx.y+g*o.vy.y,y=(e.x-h)**2+(e.y-b)**2;y<p&&(p=y,u={tx:m,ty:g,fx:i,fy:s,x:e.x,y:e.y,gidx:null})}return u?(u.gidx=Un(u.tx,u.ty),u):null}function Jd(){return["MGTile.init()","MGTile.hook()","MGTile.getTileObject(tx,ty) / inspect(tx,ty)","MGTile.setTileEmpty(tx,ty)","MGTile.setTilePlant(tx,ty,{...}) / setTileDecor / setTileEgg","MGTile.setTileObjectRaw(tx,ty,objOrFn)","MGTile.rebuildTransform() / pointToTile({x,y})"].join(`
`)}var Ae={init:Bd,ready:()=>be.ready,hook:Vd,engine:()=>$n(),tos:()=>yt(),gidx:(e,t)=>Un(Number(e),Number(t)),getTileObject:Jt,inspect:Kd,setTileEmpty:jd,setTilePlant:Fd,setTileDecor:zd,setTileEgg:$d,setTileObjectRaw:Ud,rebuildTransform:Lr,pointToTile:qd,help:Jd};var F={ready:!1,app:null,renderer:null,stage:null,ticker:null,tileSets:new Map,highlights:new Map,watches:new Map,fades:new Map,fadeWatches:new Map},Qn=e=>!!e&&typeof e=="object"&&!Array.isArray(e),qn=e=>!!(e&&typeof e.getBounds=="function"&&("parent"in e||"children"in e)),Xt=e=>!!(e&&typeof e.tint=="number"),Be=e=>!!(e&&typeof e.alpha=="number");function Yt(e,t,n){return e+(t-e)*n}function Yd(e,t,n){let o=e>>16&255,r=e>>8&255,a=e&255,i=t>>16&255,s=t>>8&255,l=t&255,c=Yt(o,i,n)|0,d=Yt(r,s,n)|0,u=Yt(a,l,n)|0;return c<<16|d<<8|u}function Xd(e,t=900){let n=[],o=[e];for(;o.length&&n.length<t;){let r=o.pop();if(!r)continue;Xt(r)&&n.push(r);let a=r.children;if(Array.isArray(a))for(let i=a.length-1;i>=0;i--)o.push(a[i])}return n}function Qd(e,t=25e3){let n=[],o=[e],r=0;for(;o.length&&r++<t;){let a=o.pop();if(!a)continue;Be(a)&&n.push(a);let i=a.children;if(Array.isArray(i))for(let s=i.length-1;s>=0;s--)o.push(i[s])}return n}function Rr(e){if(!Array.isArray(e))return[];let t=new Set,n=[];for(let o of e){let r,a;if(Array.isArray(o))r=o[0],a=o[1];else if(Qn(o))r=o.x??o.tx,a=o.y??o.ty;else continue;if(r=Number(r),a=Number(a),!Number.isFinite(r)||!Number.isFinite(a))continue;r|=0,a|=0;let i=`${r},${a}`;t.has(i)||(t.add(i),n.push({x:r,y:a}))}return n}function Zd(e,t){let n=String(e||"").trim();if(!n)throw new Error("MGPixi.defineTileSet: empty name");let o=Rr(t);return F.tileSets.set(n,o),{ok:!0,name:n,count:o.length}}function eu(e){return F.tileSets.delete(String(e||"").trim())}function tu(){return Array.from(F.tileSets.keys()).sort((e,t)=>e.localeCompare(t))}function Hr(e){return!!(e&&(e.tileSet!=null||Array.isArray(e.tiles)))}function Zn(e){let n=Ae.tos?.()?.tileViews;if(!n?.entries)throw new Error("MGPixi: TOS.tileViews not found");if(!Hr(e))return{entries:Array.from(n.entries()),gidxSet:null};let o=[];if(e.tileSet!=null){let a=String(e.tileSet||"").trim(),i=F.tileSets.get(a);if(!i)throw new Error(`MGPixi: tileSet not found "${a}"`);o=i}else o=Rr(e.tiles||[]);let r=new Map;for(let a of o){let i=Ae.getTileObject(a.x,a.y,{ensureView:!0,clone:!1});i?.tileView&&i.gidx!=null&&r.set(i.gidx,i.tileView)}return{entries:Array.from(r.entries()),gidxSet:new Set(r.keys())}}function eo(e){let t=F.highlights.get(e);if(!t)return!1;le(()=>F.ticker?.remove(t.tick)),t.root&&t.baseAlpha!=null&&Be(t.root)&&le(()=>{t.root.alpha=t.baseAlpha});for(let n of t.tint)n.o&&Xt(n.o)&&le(()=>{n.o.tint=n.baseTint});return F.highlights.delete(e),!0}function Or(e=null){for(let t of Array.from(F.highlights.keys()))e&&!String(t).startsWith(e)||eo(t);return!0}function _r(e,t={}){if(Ve(),!qn(e))throw new Error("MGPixi.highlightPulse: invalid root");let n=String(t.key||`hl:${Math.random().toString(16).slice(2)}`);if(F.highlights.has(n))return n;let o=Be(e)?Number(e.alpha):null,r=pe(Number(t.minAlpha??.12),0,1),a=pe(Number(t.maxAlpha??1),0,1),i=Number(t.speed??1.25),s=(t.tint??8386303)>>>0,l=pe(Number(t.tintMix??.85),0,1),c=t.deepTint!==!1,d=[];if(c)for(let m of Xd(e))d.push({o:m,baseTint:m.tint});else Xt(e)&&d.push({o:e,baseTint:e.tint});let u=performance.now(),p=()=>{let m=(performance.now()-u)/1e3,g=(Math.sin(m*Math.PI*2*i)+1)/2,h=g*g*(3-2*g);o!=null&&Be(e)&&(e.alpha=pe(Yt(r,a,h)*o,0,1));let b=h*l;for(let y of d)y.o&&Xt(y.o)&&(y.o.tint=Yd(y.baseTint,s,b))};return F.ticker?.add(p),F.highlights.set(n,{root:e,tick:p,baseAlpha:o,tint:d}),n}var nu=["plantVisual","cropVisual","slotVisual","slotView","displayObject","view","container","root","sprite","gfx","graphics"];function Jn(e){if(!e)return null;if(qn(e))return e;if(!Qn(e))return null;for(let t of nu){let n=e[t];if(qn(n))return n}return null}function ou(e,t){let n=[{o:e,d:0}],o=new Set,r=6;for(;n.length;){let{o:a,d:i}=n.shift();if(!(!a||i>r)&&!o.has(a)){if(o.add(a),Array.isArray(a)){if(a.length===t){let s=new Array(t),l=!0;for(let c=0;c<t;c++){let d=Jn(a[c]);if(!d){l=!1;break}s[c]=d}if(l)return s}for(let s of a)n.push({o:s,d:i+1});continue}if(Qn(a)){let s=a;for(let l of Object.keys(s))n.push({o:s[l],d:i+1})}}}return null}function ru(e,t){let n=e?.mutations;if(!Array.isArray(n))return!1;for(let o of n)if(String(o||"").toLowerCase()===t)return!0;return!1}function Dr(e,t={}){Ve();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.highlightMutation: empty mutation");let{entries:o,gidxSet:r}=Zn(t),a=`hlmut:${n}:`;if(t.clear===!0)if(!r)Or(a);else for(let u of Array.from(F.highlights.keys())){if(!u.startsWith(a))continue;let p=u.split(":"),m=Number(p[2]);r.has(m)&&eo(u)}let i={tint:(t.tint??8386303)>>>0,minAlpha:Number(t.minAlpha??.12),maxAlpha:Number(t.maxAlpha??1),speed:Number(t.speed??1.25),tintMix:Number(t.tintMix??.85),deepTint:t.deepTint!==!1},s=0,l=0,c=0,d=0;for(let[u,p]of o){let m=p?.tileObject;if(!m||m.objectType!=="plant")continue;let g=m.slots;if(!Array.isArray(g)||g.length===0)continue;let h=!1,b=[];for(let S=0;S<g.length;S++)ru(g[S],n)&&(b.push(S),h=!0);if(!h)continue;s++,l+=b.length;let y=p?.childView?.plantVisual||p?.childView||p,k=ou(y,g.length);if(!k){d+=b.length;continue}for(let S of b){let v=k[S];if(!v){d++;continue}let w=`${a}${u}:${S}`;F.highlights.has(w)||(_r(v,{key:w,...i}),c++)}}return{ok:!0,mutation:n,filtered:!!r,plantsMatched:s,matchedSlots:l,newHighlights:c,failedSlots:d}}function au(e,t={}){Ve();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchMutation: empty mutation");let o=`watchmut:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,r=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,a=F.watches.get(o);a&&clearInterval(a);let i=setInterval(()=>{le(()=>Dr(n,{...t,clear:!1}))},r);return F.watches.set(o,i),{ok:!0,key:o,mutation:n,intervalMs:r}}function iu(e){let t=String(e||"").trim();if(!t)return!1;if(!t.startsWith("watchmut:")){let o=t.toLowerCase(),r=0;for(let[a,i]of Array.from(F.watches.entries()))a.startsWith(`watchmut:${o}:`)&&(clearInterval(i),F.watches.delete(a),r++);return r>0}let n=F.watches.get(t);return n?(clearInterval(n),F.watches.delete(t),!0):!1}function su(e){let t=Array.isArray(e?.slots)?e.slots:[];return{objectType:"plant",species:e?.species??null,plantedAt:e?.plantedAt??null,maturedAt:e?.maturedAt??null,slotCount:t.length,slots:t.map((n,o)=>({idx:o,mutations:Array.isArray(n?.mutations)?n.mutations.slice():[]}))}}function lu(e,t,n={}){Ve();let o=Number(e)|0,r=Number(t)|0,a=n.ensureView!==!1,i=Ae.getTileObject(o,r,{ensureView:a,clone:!1}),s=i?.tileView||null,l=s?.tileObject,c={ok:!0,tx:o,ty:r,gidx:i?.gidx??Ae.gidx?.(o,r)??null,hasTileView:!!s,objectType:l?.objectType??null,tileObject:l??null,summary:l?.objectType==="plant"?su(l):l?{objectType:l.objectType??null}:null,display:s?s.childView?.plantVisual||s.childView||s.displayObject||s:null};return n.log!==!1&&le(()=>console.log("[MGPixi.inspectTile]",c)),c}function cu(e){let t=e?.childView?.plantVisual||e?.childView?.cropVisual||e?.childView||e?.displayObject||e;return Jn(t)||Jn(e?.displayObject)||null}function Nr(e){let t=F.fades.get(e);if(!t)return!1;for(let n of t.targets)n.o&&Be(n.o)&&Number.isFinite(n.baseAlpha)&&le(()=>{n.o.alpha=n.baseAlpha});return F.fades.delete(e),!0}function Yn(e=null){for(let t of Array.from(F.fades.keys()))e&&!String(t).startsWith(e)||Nr(t);return!0}function Gr(e,t={}){Ve();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.clearSpeciesFade: empty species");let o=`fade:${n}:`;if(!Hr(t))return Yn(o);let{gidxSet:r}=Zn(t);if(!r)return Yn(o);for(let a of Array.from(F.fades.keys())){if(!a.startsWith(o))continue;let i=Number(a.slice(o.length));r.has(i)&&Nr(a)}return!0}function Wr(e,t={}){Ve();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.fadeSpecies: empty species");let o=pe(Number(t.alpha??.2),0,1),r=t.deep===!0,{entries:a,gidxSet:i}=Zn(t),s=`fade:${n}:`;t.clear===!0&&Gr(n,t);let l=0,c=0,d=0,u=0;for(let[p,m]of a){let g=m?.tileObject;if(!g||g.objectType!=="plant")continue;l++;let h=String(g.species||"").trim().toLowerCase();if(!h||h!==n)continue;c++;let b=cu(m);if(!b||!Be(b)){u++;continue}let y=`${s}${p}`;if(F.fades.has(y)){le(()=>{b.alpha=o}),d++;continue}let k=r?Qd(b):[b],S=[];for(let v of k)Be(v)&&S.push({o:v,baseAlpha:Number(v.alpha)});for(let v of S)le(()=>{v.o.alpha=o});F.fades.set(y,{targets:S}),d++}return{ok:!0,species:n,alpha:o,deep:r,filtered:!!i,plantsSeen:l,matchedPlants:c,applied:d,failed:u,totalFades:F.fades.size}}function du(e,t={}){Ve();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchFadeSpecies: empty species");let o=`watchfade:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,r=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,a=F.fadeWatches.get(o);a&&clearInterval(a);let i=setInterval(()=>{le(()=>Wr(n,{...t,clear:!1}))},r);return F.fadeWatches.set(o,i),{ok:!0,key:o,species:n,intervalMs:r}}function uu(e){let t=String(e||"").trim();if(!t)return!1;if(!t.startsWith("watchfade:")){let o=t.toLowerCase(),r=0;for(let[a,i]of Array.from(F.fadeWatches.entries()))a.startsWith(`watchfade:${o}:`)&&(clearInterval(i),F.fadeWatches.delete(a),r++);return r>0}let n=F.fadeWatches.get(t);return n?(clearInterval(n),F.fadeWatches.delete(t),!0):!1}function Xn(){let e=B;return e.$PIXI=e.PIXI||null,e.$app=F.app||null,e.$renderer=F.renderer||null,e.$stage=F.stage||null,e.$ticker=F.ticker||null,e.__MG_PIXI__={PIXI:e.$PIXI,app:e.$app,renderer:e.$renderer,stage:e.$stage,ticker:e.$ticker,ready:F.ready},e.__MG_PIXI__}function Ve(){if(!F.ready)throw new Error("MGPixi: call MGPixi.init() first")}async function pu(e=15e3){if(F.ready)return Xn(),!0;if(await oe.init(e),F.app=oe.app(),F.ticker=oe.ticker(),F.renderer=oe.renderer(),F.stage=oe.stage(),!F.app||!F.ticker)throw new Error("MGPixi: PIXI app/ticker not found");return F.ready=!0,Xn(),!0}var Qt={init:pu,ready:()=>F.ready,expose:Xn,get app(){return F.app},get renderer(){return F.renderer},get stage(){return F.stage},get ticker(){return F.ticker},get PIXI(){return B.PIXI||null},defineTileSet:Zd,deleteTileSet:eu,listTileSets:tu,highlightPulse:_r,stopHighlight:eo,clearHighlights:Or,highlightMutation:Dr,watchMutation:au,stopWatchMutation:iu,inspectTile:lu,fadeSpecies:Wr,clearSpeciesFade:Gr,clearFades:Yn,watchFadeSpecies:du,stopWatchFadeSpecies:uu};var Br=B??window,mu={sfx:"soundEffectsVolume",music:"musicVolume",ambience:"ambienceVolume"},gu={sfx:"soundEffectsVolumeAtom",music:"musicVolumeAtom",ambience:"ambienceVolumeAtom"},xt=.001,vt=.2,Zt=null,$={ready:!1,baseUrl:null,urls:{ambience:new Map,music:new Map},sfx:{mp3Url:null,atlasUrl:null,atlas:null,groups:new Map,buffer:null},tracks:{ambience:null,music:null},ctx:null};function kt(){if(!$.ready)throw new Error("MGAudio not ready yet")}function Vr(e,t=NaN){try{let n=localStorage.getItem(e);if(n==null)return t;let o;try{o=JSON.parse(n)}catch{o=n}if(typeof o=="number"&&Number.isFinite(o))return o;if(typeof o=="string"){let r=parseFloat(o);if(Number.isFinite(r))return r}}catch{}return t}function wt(e){let t=mu[e],n=gu[e];if(!t)return{atom:vt,vol100:en(vt)};let o=Vr(t,NaN);if(Number.isFinite(o)){let a=pe(o,0,1);return{atom:a,vol100:en(a)}}if(n){let a=Vr(n,NaN);if(Number.isFinite(a)){let i=pe(a,0,1);return{atom:i,vol100:en(i)}}}let r=vt;return{atom:r,vol100:en(r)}}function fu(e){let t=Number(e);if(!Number.isFinite(t))return null;if(t<=0)return 0;let o=(pe(t,1,100)-1)/99;return xt+o*(vt-xt)}function en(e){let t=pe(Number(e),0,1);if(t<=xt)return 0;let n=(t-xt)/(vt-xt);return Math.round(1+n*99)}function jr(e,t){if(t==null)return wt(e).atom;let n=fu(t);return n===null?wt(e).atom:mr(n)}async function Fr(){let e=$.ctx;if(e)return e;let t=Br.AudioContext||Br.webkitAudioContext;if(!t)throw new Error("WebAudio not supported");let n=new t;return $.ctx=n,n}async function zr(){if($.ctx&&$.ctx.state==="suspended")try{await $.ctx.resume()}catch{}}function bu(e){let t=new Map,n=(o,r)=>{t.has(o)||t.set(o,[]),t.get(o).push(r)};for(let o of Object.keys(e||{})){let r=/^(.*)_([A-Z])$/.exec(o);r?.[1]?n(r[1],o):n(o,o)}for(let[o,r]of Array.from(t.entries()))r.sort((a,i)=>a.localeCompare(i)),t.set(o,r);$.sfx.groups=t}function hu(e){let t=$.sfx.atlas;if(!t)throw new Error("SFX atlas not loaded");if(t[e])return e;let n=$.sfx.groups.get(e);if(n?.length)return n[Math.random()*n.length|0];throw new Error(`Unknown sfx/group: ${e}`)}async function yu(){if($.sfx.buffer)return $.sfx.buffer;if(!$.sfx.mp3Url)throw new Error("SFX mp3 url missing");let e=await Fr();await zr();let n=await(await Wt($.sfx.mp3Url)).arrayBuffer(),o=await new Promise((r,a)=>{let i=e.decodeAudioData(n,r,a);i?.then&&i.then(r,a)});return $.sfx.buffer=o,o}async function xu(e,t={}){if(!$.ready)throw new Error("MGAudio not ready yet");let n=String(e||"").trim();if(!n)throw new Error("Missing sfx name");let o=hu(n),r=$.sfx.atlas[o];if(!r)throw new Error(`Missing segment for sfx: ${o}`);let a=await Fr();await zr();let i=await yu(),s=Math.max(0,+r.start||0),l=Math.max(s,+r.end||s),c=Math.max(.01,l-s),d=jr("sfx",t.volume),u=a.createGain();u.gain.value=d,u.connect(a.destination);let p=a.createBufferSource();return p.buffer=i,p.connect(u),p.start(0,s,c),{name:o,source:p,start:s,end:l,duration:c,volume:d}}function $r(e){if(e!=="music"&&e!=="ambience")return!1;let t=$.tracks[e];if(t){try{t.pause()}catch{}try{t.src=""}catch{}}return $.tracks[e]=null,!0}function vu(e,t,n={}){if(!$.ready)throw new Error("MGAudio not ready yet");if(e!=="music"&&e!=="ambience")throw new Error(`Invalid category: ${e}`);let o=$.urls[e].get(t);if(!o)throw new Error(`Unknown ${e}: ${t}`);$r(e);let r=new Audio(o);return r.loop=!!n.loop,r.volume=jr(e,n.volume),r.preload="auto",r.play().catch(()=>{}),$.tracks[e]=r,r}async function wu(e,t,n={}){let o=String(e||"").trim(),r=String(t||"").trim();if(!o||!r)throw new Error("play(category, asset) missing args");if(o==="sfx")return xu(r,n);if(o==="music"||o==="ambience")return vu(o,r,n);throw new Error(`Unknown category: ${o}`)}function ku(e,t={}){let n=String(e||"").trim();return n==="music"||n==="ambience"?Array.from($.urls[n].keys()).sort():n==="sfx"?$.sfx.atlas?t.groups?Array.from($.sfx.groups.keys()).sort():Object.keys($.sfx.atlas).sort():[]:[]}function Su(){return $.tracks.music&&($.tracks.music.volume=wt("music").atom),$.tracks.ambience&&($.tracks.ambience.volume=wt("ambience").atom),!0}function Tu(){return kt(),["sfx","music","ambience"]}function Au(){return kt(),Array.from($.sfx.groups.keys()).sort((e,t)=>e.localeCompare(t))}function Cu(e,t){kt();let n=String(e||"").trim().toLowerCase(),o=String(t||"").trim();if(!o||n!=="music"&&n!=="ambience")return!1;let r=$.urls[n],a=o.toLowerCase();for(let i of r.keys())if(i.toLowerCase()===a)return!0;return!1}function Mu(e){kt();let t=String(e||"").trim();if(!t)return!1;let n=t.toLowerCase();for(let o of $.sfx.groups.keys())if(o.toLowerCase()===n)return!0;return!1}function Pu(e,t){kt();let n=String(e||"").trim().toLowerCase(),o=String(t||"").trim();if(!o)throw new Error("getTrackUrl(category, name) missing name");if(n!=="music"&&n!=="ambience")throw new Error(`Invalid category: ${e}`);let r=$.urls[n],a=o.toLowerCase();for(let[i,s]of r.entries())if(i.toLowerCase()===a)return s;return null}async function Eu(){return $.ready?!0:Zt||(Zt=(async()=>{$.baseUrl=await fe.base();let e=await ce.load($.baseUrl),t=ce.getBundle(e,"audio");if(!t)throw new Error("No audio bundle in manifest");for(let n of t.assets||[])for(let o of n.src||[]){if(typeof o!="string")continue;let r=/^audio\/(ambience|music)\/(.+)\.mp3$/i.exec(o);if(r){let a=r[1].toLowerCase(),i=r[2];$.urls[a].set(i,se($.baseUrl,o));continue}/^audio\/sfx\/sfx\.mp3$/i.test(o)&&($.sfx.mp3Url=se($.baseUrl,o)),/^audio\/sfx\/sfx\.json$/i.test(o)&&($.sfx.atlasUrl=se($.baseUrl,o))}if(!$.sfx.atlasUrl)throw new Error("Missing audio/sfx/sfx.json in manifest");return $.sfx.atlas=await qe($.sfx.atlasUrl),bu($.sfx.atlas),$.ready=!0,!0})(),Zt)}var tn={init:Eu,ready:()=>$.ready,play:wu,stop:$r,list:ku,refreshVolumes:Su,categoryVolume:wt,getCategories:Tu,getGroups:Au,hasTrack:Cu,hasGroup:Mu,getTrackUrl:Pu};var to=B?.document??document,nn=null,Q={ready:!1,baseUrl:null,byCat:new Map,byBase:new Map,overlay:null,live:new Set,defaultParent:null};function Iu(){if(Q.overlay)return Q.overlay;let e=to.createElement("div");return e.id="MG_COSMETIC_OVERLAY",e.style.cssText=["position:fixed","left:0","top:0","width:100vw","height:100vh","pointer-events:none","z-index:99999999"].join(";"),to.documentElement.appendChild(e),Q.overlay=e,e}function Lu(){let e=Q.defaultParent;if(!e)return null;try{return typeof e=="function"?e():e}catch{return null}}function no(e){let t=String(e||"").trim();return t?(t=t.replace(/^cosmetic\//i,""),t=t.replace(/\.png$/i,""),t):""}function Ru(e,t){if(t===void 0){let a=no(e),i=a.indexOf("_");return i<0?{cat:"",asset:a,base:a}:{cat:a.slice(0,i),asset:a.slice(i+1),base:a}}let n=String(e||"").trim(),o=no(t),r=o.includes("_")?o:`${n}_${o}`;if(o.includes("_")&&!n){let a=o.indexOf("_");return{cat:o.slice(0,a),asset:o.slice(a+1),base:o}}return{cat:n,asset:o.replace(/^.+?_/,""),base:r}}function Hu(){return Array.from(Q.byCat.keys()).sort((e,t)=>e.localeCompare(t))}function Ou(e){let t=Q.byCat.get(String(e||"").trim());return t?Array.from(t.keys()).sort((n,o)=>n.localeCompare(o)):[]}function oo(e,t){let{cat:n,asset:o,base:r}=Ru(e,t),a=Q.byBase.get(r);if(a)return a;let s=Q.byCat.get(n)?.get(o);if(s)return s;if(!Q.baseUrl)throw new Error("MGCosmetic not initialized");if(!r)throw new Error("Invalid cosmetic name");return se(Q.baseUrl,`cosmetic/${r}.png`)}function ro(e,t,n){if(!Q.ready)throw new Error("MGCosmetic not ready yet");let o,r;typeof t=="object"&&t!==null?(o=t,r=void 0):typeof t=="string"?(r=t,o=n||{}):(r=void 0,o=n||{});let a=r!==void 0?oo(e,r):oo(e),i=to.createElement("img");if(i.decoding="async",i.loading="eager",i.src=a,i.alt=o.alt!=null?String(o.alt):no(r??e),o.className&&(i.className=String(o.className)),o.width!=null&&(i.style.width=String(o.width)),o.height!=null&&(i.style.height=String(o.height)),o.opacity!=null&&(i.style.opacity=String(o.opacity)),o.style&&typeof o.style=="object")for(let[s,l]of Object.entries(o.style))try{i.style[s]=String(l)}catch{}return i}function _u(e,t,n){let o,r;typeof t=="object"&&t!==null?(o=t,r=void 0):typeof t=="string"?(r=t,o=n||{}):(r=void 0,o=n||{});let a=o.parent||Lu()||Iu(),i=r!==void 0?ro(e,r,o):ro(e,o);if(a===Q.overlay||o.center||o.x!=null||o.y!=null||o.absolute){i.style.position="absolute",i.style.pointerEvents="none",i.style.zIndex=String(o.zIndex??999999);let l=o.scale??1,c=o.rotation??0;if(o.center)i.style.left="50%",i.style.top="50%",i.style.transform=`translate(-50%, -50%) scale(${l}) rotate(${c}rad)`;else{let d=o.x??innerWidth/2,u=o.y??innerHeight/2;i.style.left=`${d}px`,i.style.top=`${u}px`,i.style.transform=`scale(${l}) rotate(${c}rad)`,o.anchor==="center"&&(i.style.transform=`translate(-50%, -50%) scale(${l}) rotate(${c}rad)`)}}return a.appendChild(i),Q.live.add(i),i.__mgDestroy=()=>{try{i.remove()}catch{}Q.live.delete(i)},i}function Du(e){return Q.defaultParent=e,!0}function Nu(){for(let e of Array.from(Q.live))e.__mgDestroy?.()}async function Gu(){return Q.ready?!0:nn||(nn=(async()=>{Q.baseUrl=await fe.base();let e=await ce.load(Q.baseUrl),t=ce.getBundle(e,"cosmetic");if(!t)throw new Error("No 'cosmetic' bundle in manifest");Q.byCat.clear(),Q.byBase.clear();for(let n of t.assets||[])for(let o of n.src||[]){if(typeof o!="string"||!/^cosmetic\/.+\.png$/i.test(o))continue;let a=o.split("/").pop().replace(/\.png$/i,""),i=a.indexOf("_");if(i<0)continue;let s=a.slice(0,i),l=a.slice(i+1),c=se(Q.baseUrl,o);Q.byBase.set(a,c),Q.byCat.has(s)||Q.byCat.set(s,new Map),Q.byCat.get(s).set(l,c)}return Q.ready=!0,!0})(),nn)}var on={init:Gu,ready:()=>Q.ready,categories:Hu,list:Ou,url:oo,create:ro,show:_u,attach:Du,clear:Nu};function Ur(){ye("MGVersion",bt),ye("MGAssets",fe),ye("MGManifest",ce),ye("MGData",Ut),ye("MGSprite",ke),ye("MGTile",Ae),ye("MGPixi",Qt),ye("MGAudio",tn),ye("MGCosmetic",on)}async function Kr(e){Ur();let t=[{name:"Data",init:()=>Ut.init()},{name:"Sprites",init:()=>ke.init()},{name:"TileObjectSystem",init:()=>Ae.init()},{name:"Pixi",init:()=>Qt.init()},{name:"Audio",init:()=>tn.init()},{name:"Cosmetics",init:()=>on.init()}];await Promise.all(t.map(async n=>{e?.({status:"start",name:n.name});try{await n.init(),e?.({status:"success",name:n.name})}catch(o){console.error(`[${n.name}] failed`,o),e?.({status:"error",name:n.name,error:o})}})),console.log("[MG] Ready: MGData / MGSprite / MGAudio / MGCosmetic / MGTile / MGPixi / MGSkins"),console.log("MGPixi.inspectTile(tx, ty)"),console.log("MGTile.help()")}Ur();function qr(e){e.logStep("WebSocket","Capturing WebSocket...");let t=null;return t=Dt(n=>{n.ws&&(e.logStep("WebSocket","WebSocket captured","success"),t?.(),t=null)},{intervalMs:250}),pr({debug:!1}),()=>{t?.(),t=null}}async function Jr(e){e.logStep("Atoms","Prewarming Jotai store...");try{await mn(),await Tt({timeoutMs:8e3,intervalMs:50}),e.logStep("Atoms","Jotai store ready","success")}catch(t){e.logStep("Atoms","Jotai store not captured yet","error"),console.warn("[Bootstrap] Jotai store wait failed",t)}}function Yr(e){e.logStep("HUD","Loading HUD preferences...");let t=Ln(),n=In({hostId:"gemini-hud-root",initialWidth:t.width,initialOpen:t.isOpen,onWidthChange:o=>Ke("width",o),onOpenChange:o=>Ke("isOpen",o),themes:Ie,initialTheme:t.theme,onThemeChange:o=>Ke("theme",o),buildSections:o=>Sn({applyTheme:o.applyTheme,initialTheme:o.initialTheme,getCurrentTheme:o.getCurrentTheme}),initialTab:t.activeTab,onTabChange:o=>Ke("activeTab",o)});return e.logStep("HUD","HUD ready","success"),n}async function Xr(e){e.log("HUD ready. Loading modules in the background...","success"),e.setSubtitle("Activating Gemini modules..."),await Kr(t=>{t.status==="start"?e.logStep(t.name,`Loading ${t.name}...`):t.status==="success"?e.logStep(t.name,`${t.name} ready`,"success"):e.logStep(t.name,`${t.name} encountered an issue.`,"error")})}pn();(async function(){"use strict";let e=mo({title:"Gemini is loading",subtitle:"Connecting and preparing modules..."}),t=null,n=null;try{t=qr(e),await Jr(e),n=Yr(e),await Xr(e),e.succeed("Gemini is ready!")}catch(o){e.fail("Failed to initialize the mod.",o)}finally{t?.()}if(n){let o=n;Rn({onClick:()=>o.setOpen(!0)})}})();})();
