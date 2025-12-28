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
"use strict";(()=>{var sr=Object.defineProperty;var Gs=(e,t,n)=>t in e?sr(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var _s=(e,t)=>()=>(e&&(t=e(e=0)),t);var Ns=(e,t)=>{for(var n in t)sr(e,n,{get:t[n],enumerable:!0})};var ve=(e,t,n)=>Gs(e,typeof t!="symbol"?t+"":t,n);var ai={};Ns(ai,{clamp:()=>pe,clamp01:()=>oo,sleep:()=>Ae,tryDo:()=>ce,waitWithTimeout:()=>tn});async function tn(e,t,n){let o=performance.now();for(;performance.now()-o<t;){let r=await Promise.race([e,Ae(50).then(()=>null)]);if(r!==null)return r}throw new Error(`${n} timeout`)}var Ae,ce,pe,oo,Pe=_s(()=>{"use strict";Ae=e=>new Promise(t=>setTimeout(t,e)),ce=e=>{try{return e()}catch{return}},pe=(e,t,n)=>Math.max(t,Math.min(n,e)),oo=e=>pe(e,0,1)});var Ws=window;function js(){if(typeof unsafeWindow<"u"&&unsafeWindow)return unsafeWindow;let e=window.wrappedJSObject;return e&&e!==window?e:Ws}var Bs=js(),P=Bs;var Fs=new Map;function Vs(){return Fs}function it(){return P.jotaiAtomCache?.cache}function st(e){let t=Vs(),n=t.get(e);if(n)return n;let o=it();if(!o)return null;for(let r of o.values())if((r?.debugLabel||r?.label||"")===e)return t.set(e,r),r;return null}function Mn(){let e=P;if(e.__REACT_DEVTOOLS_GLOBAL_HOOK__)return;let t=new Map,n=new Map;e.__REACT_DEVTOOLS_GLOBAL_HOOK__={renderers:t,supportsFiber:!0,inject:o=>{let r=t.size+1;return t.set(r,o),n.set(r,new Set),r},onCommitFiberRoot:(o,r)=>{let a=n.get(o);a&&a.add(r)},onCommitFiberUnmount:()=>{},onPostCommitFiberRoot:()=>{},getFiberRoots:o=>n.get(o),checkDCE:()=>{},isDisabled:!1}}var Us={baseStore:null,captureInProgress:!1,captureError:null,lastCapturedVia:null,mirror:void 0};function Ke(){return Us}var zs="__JOTAI_STORE_READY__",lr=!1,An=new Set;function _t(){if(!lr){lr=!0;for(let e of An)try{e()}catch{}try{let e=P.CustomEvent||CustomEvent;P.dispatchEvent?.(new e(zs))}catch{}}}function $s(e){An.add(e);let t=Cn();if(t.via&&!t.polyfill)try{e()}catch{}return()=>{An.delete(e)}}async function Nt(e={}){let{timeoutMs:t=6e3,intervalMs:n=50}=e,o=Cn();if(!(o.via&&!o.polyfill))return new Promise((r,a)=>{let i=!1,s=$s(()=>{i||(i=!0,s(),r())}),u=Date.now();(async()=>{for(;!i&&Date.now()-u<t;){let l=Cn();if(l.via&&!l.polyfill){if(i)return;i=!0,s(),r();return}await lt(n)}i||(i=!0,s(),a(new Error("Store not captured within timeout")))})()})}var lt=e=>new Promise(t=>setTimeout(t,e));function cr(){try{let e=P.Event||Event;P.dispatchEvent?.(new e("visibilitychange"))}catch{}}function Pn(e){return e&&typeof e=="object"&&typeof e.get=="function"&&typeof e.set=="function"&&typeof e.sub=="function"}function Tn(e,t=0,n=new WeakSet){if(t>3||!e||typeof e!="object"||n.has(e))return null;try{n.add(e)}catch{return null}if(Pn(e))return e;let o=["store","value","current","state","s","baseStore"];for(let r of o)try{let a=e[r];if(Pn(a))return a}catch{}return null}function ur(){let e=Ke(),t=P.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!t?.renderers?.size)return null;let n=0;for(let[o]of t.renderers){let r=t.getFiberRoots?.(o);r&&(n+=r.size||0)}if(n===0)return null;for(let[o]of t.renderers){let r=t.getFiberRoots?.(o);if(r)for(let a of r){let i=new Set,s=[a.current];for(;s.length;){let u=s.pop();if(!(!u||i.has(u))){i.add(u);try{let d=u?.pendingProps?.value;if(Pn(d))return e.lastCapturedVia="fiber",d}catch{}try{let d=u?.memoizedState,l=0;for(;d&&l<15;){l++;let c=Tn(d);if(c)return e.lastCapturedVia="fiber",c;let p=Tn(d.memoizedState);if(p)return e.lastCapturedVia="fiber",p;d=d.next}}catch{}try{if(u?.stateNode){let d=Tn(u.stateNode);if(d)return e.lastCapturedVia="fiber",d}}catch{}u.child&&s.push(u.child),u.sibling&&s.push(u.sibling),u.alternate&&s.push(u.alternate)}}}}return null}function dr(){return{get:()=>{throw new Error("Store not captured: get unavailable")},set:()=>{throw new Error("Store not captured: set unavailable")},sub:()=>()=>{},__polyfill:!0}}async function Ks(e=5e3){let t=Date.now(),n=it();for(;!n&&Date.now()-t<e;)await lt(100),n=it();if(!n)throw new Error("jotaiAtomCache.cache not found");let o=Ke(),r=null,a=null,i=[],s=()=>{for(let d of i)try{d.__origWrite&&(d.write=d.__origWrite,delete d.__origWrite)}catch{}};for(let d of n.values()){if(!d||typeof d.write!="function"||d.__origWrite)continue;let l=d.write;d.__origWrite=l,d.write=function(c,p,...m){return a||(r=c,a=p,s()),l.call(this,c,p,...m)},i.push(d)}cr();let u=Date.now();for(;!a&&Date.now()-u<e;)await lt(50);return a?(o.lastCapturedVia="write",{get:d=>r(d),set:(d,l)=>a(d,l),sub:(d,l)=>{let c;try{c=r(d)}catch{}let p=setInterval(()=>{let m;try{m=r(d)}catch{return}if(m!==c){c=m;try{l()}catch{}}},100);return()=>clearInterval(p)}}):(s(),o.lastCapturedVia="polyfill",dr())}async function qs(e=1e4){let t=Ke();cr();let n=Date.now();for(;Date.now()-n<e;){let o=ur();if(o)return o;await lt(50)}return t.lastCapturedVia="polyfill",dr()}async function Js(){let e=Ke();if(e.baseStore&&!e.baseStore.__polyfill)return _t(),e.baseStore;if(e.captureInProgress){let t=Date.now(),n=2500;for(;!e.baseStore&&Date.now()-t<n;)await lt(25);if(e.baseStore)return e.baseStore.__polyfill||_t(),e.baseStore}e.captureInProgress=!0;try{let t=ur();if(t)return e.baseStore=t,_t(),t;try{let o=await Ks(5e3);return e.baseStore=o,o.__polyfill||_t(),o}catch(o){e.captureError=o}let n=await qs();return e.baseStore=n,n}catch(t){throw e.captureError=t,t}finally{e.captureInProgress=!1}}function Cn(){let e=Ke();return{via:e.lastCapturedVia,polyfill:!!e.baseStore?.__polyfill,error:e.captureError}}async function Ys(){let e=await Js(),t=new WeakMap,n=async r=>{let a=t.get(r);if(a)return a;a={last:void 0,has:!1,subs:new Set},t.set(r,a);try{a.last=e.get(r),a.has=!0}catch{}let i=e.sub(r,()=>{let s;try{s=e.get(r)}catch{return}let u=a.last,d=!Object.is(s,u)||!a.has;if(a.last=s,a.has=!0,d)for(let l of a.subs)try{l(s,u)}catch{}});return a.unsubUpstream=i,a};return{async get(r){let a=await n(r);if(a.has)return a.last;let i=e.get(r);return a.last=i,a.has=!0,i},async set(r,a){await e.set(r,a);let i=await n(r);i.last=a,i.has=!0},async sub(r,a){let i=await n(r);if(i.subs.add(a),i.has)try{a(i.last,i.last)}catch{}return()=>{i.subs.delete(a)}},getShadow(r){return t.get(r)?.last},hasShadow(r){return!!t.get(r)?.has},async ensureWatch(r){await n(r)},async asStore(){return{get:r=>this.get(r),set:(r,a)=>this.set(r,a),sub:(r,a)=>{let i=null;return this.sub(r,()=>a()).then(s=>i=s),()=>i?.()}}}}}async function ct(){let e=Ke();return e.mirror||(e.mirror=await Ys()),e.mirror}var Y={async select(e){let t=await ct(),n=st(e);if(!n)throw new Error(`[Store] Atom not found: "${e}"`);return t.get(n)},async set(e,t){let n=await ct(),o=st(e);if(!o)throw new Error(`[Store] Atom not found: "${e}"`);await n.set(o,t)},async subscribe(e,t){let n=await ct(),o=st(e);if(!o)throw new Error(`[Store] Atom not found: "${e}"`);return n.sub(o,r=>{try{t(r)}catch{}})},async subscribeImmediate(e,t){let n=await Y.select(e);try{t(n)}catch{}return Y.subscribe(e,t)}};async function In(){await ct()}function ut(e){return e?Array.isArray(e)?e.slice():e.split(".").map(t=>t.match(/^\d+$/)?Number(t):t):[]}function Ie(e,t){let n=ut(t),o=e;for(let r of n){if(o==null)return;o=o[r]}return o}function En(e,t,n){let o=ut(t);if(!o.length)return n;let r=Array.isArray(e)?[...e]:{...e??{}},a=r;for(let i=0;i<o.length-1;i++){let s=o[i],u=a[s],d=typeof u=="object"&&u!==null?Array.isArray(u)?[...u]:{...u}:{};a[s]=d,a=d}return a[o[o.length-1]]=n,r}function pr(e,t){let n={};for(let o of t)n[o]=o.includes(".")?Ie(e,o):e?.[o];try{return JSON.stringify(n)}catch{return String(n)}}function Ln(e,t,n){let o=n.mode??"auto";function r(d){let l=t?Ie(d,t):d,c=new Map;if(l==null)return{signatures:c,keys:[]};let p=Array.isArray(l);if((o==="array"||o==="auto"&&p)&&p)for(let f=0;f<l.length;f++){let g=l[f],b=n.key?n.key(g,f,d):f,h=n.sig?n.sig(g,f,d):n.fields?pr(g,n.fields):JSON.stringify(g);c.set(b,h)}else for(let[f,g]of Object.entries(l)){let b=n.key?n.key(g,f,d):f,h=n.sig?n.sig(g,f,d):n.fields?pr(g,n.fields):JSON.stringify(g);c.set(b,h)}return{signatures:c,keys:Array.from(c.keys())}}function a(d,l){if(d===l)return!0;if(!d||!l||d.size!==l.size)return!1;for(let[c,p]of d)if(l.get(c)!==p)return!1;return!0}async function i(d){let l=null;return Y.subscribeImmediate(e,c=>{let p=t?Ie(c,t):c,{signatures:m}=r(p);if(!a(l,m)){let f=new Set([...l?Array.from(l.keys()):[],...Array.from(m.keys())]),g=[];for(let b of f){let h=l?.get(b)??"__NONE__",w=m.get(b)??"__NONE__";h!==w&&g.push(b)}l=m,d({value:p,changedKeys:g})}})}async function s(d,l){return i(({value:c,changedKeys:p})=>{p.includes(d)&&l({value:c})})}async function u(d,l){let c=new Set(d);return i(({value:p,changedKeys:m})=>{let f=m.filter(g=>c.has(g));f.length&&l({value:p,changedKeys:f})})}return{sub:i,subKey:s,subKeys:u}}var qe=new Map;function Xs(e,t){let n=qe.get(e);if(n)try{n()}catch{}return qe.set(e,t),()=>{try{t()}catch{}qe.get(e)===t&&qe.delete(e)}}function Q(e,t={}){let{path:n,write:o="replace"}=t,r=n?`${e}:${ut(n).join(".")}`:e;async function a(){let c=await Y.select(e);return n?Ie(c,n):c}async function i(c){if(typeof o=="function"){let f=await Y.select(e),g=o(c,f);return Y.set(e,g)}let p=await Y.select(e),m=n?En(p,n,c):c;return o==="merge-shallow"&&!n&&p&&typeof p=="object"&&typeof c=="object"?Y.set(e,{...p,...c}):Y.set(e,m)}async function s(c){let p=await a(),m=c(p);return await i(m),m}async function u(c,p,m){let f,g=h=>{let w=n?Ie(h,n):h;if(typeof f>"u"||!m(f,w)){let T=f;f=w,p(w,T)}},b=c?await Y.subscribeImmediate(e,g):await Y.subscribe(e,g);return Xs(r,b)}function d(){let c=qe.get(r);if(c){try{c()}catch{}qe.delete(r)}}function l(c){return Ln(e,c?.path??n,c)}return{label:r,get:a,set:i,update:s,onChange:(c,p=Object.is)=>u(!1,c,p),onChangeNow:(c,p=Object.is)=>u(!0,c,p),asSignature:l,stopOnChange:d}}function y(e){return Q(e)}var Qs=y("positionAtom"),Zs=y("lastPositionInMyGardenAtom"),el=y("playerDirectionAtom"),tl=y("stateAtom"),nl=y("quinoaDataAtom"),ol=y("currentTimeAtom"),rl=y("actionAtom"),al=y("isPressAndHoldActionAtom"),il=y("mapAtom"),Rn=y("tileSizeAtom"),sl=Q("mapAtom",{path:"cols"}),ll=Q("mapAtom",{path:"rows"}),cl=Q("mapAtom",{path:"spawnTiles"}),ul=Q("mapAtom",{path:"locations.seedShop.spawnTileIdx"}),dl=Q("mapAtom",{path:"locations.eggShop.spawnTileIdx"}),pl=Q("mapAtom",{path:"locations.toolShop.spawnTileIdx"}),ml=Q("mapAtom",{path:"locations.decorShop.spawnTileIdx"}),fl=Q("mapAtom",{path:"locations.sellCropsShop.spawnTileIdx"}),gl=Q("mapAtom",{path:"locations.sellPetShop.spawnTileIdx"}),bl=Q("mapAtom",{path:"locations.collectorsClub.spawnTileIdx"}),hl=Q("mapAtom",{path:"locations.wishingWell.spawnTileIdx"}),yl=Q("mapAtom",{path:"locations.shopsCenter.spawnTileIdx"}),xl=y("playerAtom"),vl=y("myDataAtom"),wl=y("myUserSlotIdxAtom"),Sl=y("isSpectatingAtom"),kl=y("myCoinsCountAtom"),Tl=y("numPlayersAtom"),Al=Q("playerAtom",{path:"id"}),Pl=y("userSlotsAtom"),Cl=y("filteredUserSlotsAtom"),Ml=y("myUserSlotAtom"),Il=y("spectatorsAtom"),El=Q("stateAtom",{path:"child"}),Ll=Q("stateAtom",{path:"child.data"}),Rl=Q("stateAtom",{path:"child.data.shops"}),On=Q("stateAtom",{path:"child.data.userSlots"}),Dn=Q("stateAtom",{path:"data.players"}),Hn=Q("stateAtom",{path:"data.hostPlayerId"}),Ol=y("myInventoryAtom"),Dl=y("myInventoryItemsAtom"),Hl=y("isMyInventoryAtMaxLengthAtom"),Gl=y("myFavoritedItemIdsAtom"),_l=y("myCropInventoryAtom"),Nl=y("mySeedInventoryAtom"),Wl=y("myToolInventoryAtom"),jl=y("myEggInventoryAtom"),Bl=y("myDecorInventoryAtom"),Fl=y("myPetInventoryAtom"),Vl=Q("myInventoryAtom",{path:"favoritedItemIds"}),Ul=y("itemTypeFiltersAtom"),zl=y("myItemStoragesAtom"),$l=y("myPetHutchStoragesAtom"),Kl=y("myPetHutchItemsAtom"),ql=y("myPetHutchPetItemsAtom"),Jl=y("myNumPetHutchItemsAtom"),Yl=y("myValidatedSelectedItemIndexAtom"),Xl=y("isSelectedItemAtomSuspended"),Ql=y("mySelectedItemAtom"),Zl=y("mySelectedItemNameAtom"),ec=y("mySelectedItemRotationsAtom"),tc=y("mySelectedItemRotationAtom"),nc=y("setSelectedIndexToEndAtom"),oc=y("myPossiblyNoLongerValidSelectedItemIndexAtom"),rc=y("myCurrentGlobalTileIndexAtom"),ac=y("myCurrentGardenTileAtom"),ic=y("myCurrentGardenObjectAtom"),sc=y("myOwnCurrentGardenObjectAtom"),lc=y("myOwnCurrentDirtTileIndexAtom"),cc=y("myCurrentGardenObjectNameAtom"),uc=y("isInMyGardenAtom"),dc=y("myGardenBoardwalkTileObjectsAtom"),pc=Q("myDataAtom",{path:"garden"}),mc=Q("myDataAtom",{path:"garden.tileObjects"}),fc=Q("myOwnCurrentGardenObjectAtom",{path:"objectType"}),gc=y("myCurrentStablePlantObjectInfoAtom"),bc=y("myCurrentSortedGrowSlotIndicesAtom"),hc=y("myCurrentGrowSlotIndexAtom"),yc=y("myCurrentGrowSlotsAtom"),xc=y("myCurrentGrowSlotAtom"),vc=y("secondsUntilCurrentGrowSlotMaturesAtom"),wc=y("isCurrentGrowSlotMatureAtom"),Sc=y("numGrowSlotsAtom"),kc=y("myCurrentEggAtom"),Tc=y("petInfosAtom"),Ac=y("myPetInfosAtom"),Pc=y("myPetSlotInfosAtom"),Cc=y("myPrimitivePetSlotsAtom"),Mc=y("myNonPrimitivePetSlotsAtom"),Ic=y("expandedPetSlotIdAtom"),Ec=y("myPetsProgressAtom"),Lc=y("myActiveCropMutationPetsAtom"),Rc=y("totalPetSellPriceAtom"),Oc=y("selectedPetHasNewVariantsAtom"),Gn=y("shopsAtom"),_n=y("myShopPurchasesAtom"),Dc=y("seedShopAtom"),Hc=y("seedShopInventoryAtom"),Gc=y("seedShopRestockSecondsAtom"),_c=y("seedShopCustomRestockInventoryAtom"),Nc=y("eggShopAtom"),Wc=y("eggShopInventoryAtom"),jc=y("eggShopRestockSecondsAtom"),Bc=y("eggShopCustomRestockInventoryAtom"),Fc=y("toolShopAtom"),Vc=y("toolShopInventoryAtom"),Uc=y("toolShopRestockSecondsAtom"),zc=y("toolShopCustomRestockInventoryAtom"),$c=y("decorShopAtom"),Kc=y("decorShopInventoryAtom"),qc=y("decorShopRestockSecondsAtom"),Jc=y("decorShopCustomRestockInventoryAtom"),Yc=y("isDecorShopAboutToRestockAtom"),Xc=Q("shopsAtom",{path:"seed"}),Qc=Q("shopsAtom",{path:"tool"}),Zc=Q("shopsAtom",{path:"egg"}),eu=Q("shopsAtom",{path:"decor"}),tu=y("myCropItemsAtom"),nu=y("myCropItemsToSellAtom"),ou=y("totalCropSellPriceAtom"),ru=y("friendBonusMultiplierAtom"),au=y("myJournalAtom"),iu=y("myCropJournalAtom"),su=y("myPetJournalAtom"),lu=y("myStatsAtom"),cu=y("myActivityLogsAtom"),uu=y("newLogsAtom"),du=y("hasNewLogsAtom"),pu=y("newCropLogsFromSellingAtom"),mu=y("hasNewCropLogsFromSellingAtom"),fu=y("myCompletedTasksAtom"),gu=y("myActiveTasksAtom"),bu=y("isWelcomeToastVisibleAtom"),hu=y("shouldCloseWelcomeToastAtom"),yu=y("isInitialMoveToDirtPatchToastVisibleAtom"),xu=y("isFirstPlantSeedActiveAtom"),vu=y("isThirdSeedPlantActiveAtom"),wu=y("isThirdSeedPlantCompletedAtom"),Su=y("isDemoTouchpadVisibleAtom"),ku=y("areShopAnnouncersEnabledAtom"),Tu=y("arePresentablesEnabledAtom"),Au=y("isEmptyDirtTileHighlightedAtom"),Pu=y("isPlantTileHighlightedAtom"),Cu=y("isItemHiglightedInHotbarAtom"),Mu=y("isItemHighlightedInModalAtom"),Iu=y("isMyGardenButtonHighlightedAtom"),Eu=y("isSellButtonHighlightedAtom"),Lu=y("isShopButtonHighlightedAtom"),Ru=y("isInstaGrowButtonHiddenAtom"),Ou=y("isActionButtonHighlightedAtom"),Du=y("isGardenItemInfoCardHiddenAtom"),Hu=y("isSeedPurchaseButtonHighlightedAtom"),Gu=y("isFirstSeedPurchaseActiveAtom"),_u=y("isFirstCropHarvestActiveAtom"),Nu=y("isWeatherStatusHighlightedAtom"),Wu=y("weatherAtom"),ju=y("activeModalAtom"),Bu=y("hotkeyBeingPressedAtom"),Fu=y("avatarTriggerAnimationAtom"),Vu=y("avatarDataAtom"),Uu=y("emoteDataAtom"),zu=y("otherUserSlotsAtom"),$u=y("otherPlayerPositionsAtom"),Ku=y("otherPlayerSelectedItemsAtom"),qu=y("otherPlayerLastActionsAtom"),Ju=y("traderBunnyPlayerId"),Yu=y("npcPlayersAtom"),Xu=y("npcQuinoaUsersAtom"),Qu=y("numNpcAvatarsAtom"),Zu=y("traderBunnyEmoteTimeoutAtom"),ed=y("traderBunnyEmoteAtom"),td=y("unsortedLeaderboardAtom"),nd=y("currentGardenNameAtom"),od=y("quinoaEngineAtom"),rd=y("quinoaInitializationErrorAtom"),ad=y("avgPingAtom"),id=y("serverClientTimeOffsetAtom"),sd=y("isEstablishingShotRunningAtom"),ld=y("isEstablishingShotCompleteAtom");function S(e,t=null,...n){let o=document.createElement(e);for(let[r,a]of Object.entries(t||{}))a!=null&&(r==="style"?typeof a=="string"?o.setAttribute("style",a):typeof a=="object"&&Object.assign(o.style,a):r.startsWith("on")&&typeof a=="function"?o[r.toLowerCase()]=a:r in o?o[r]=a:o.setAttribute(r,String(a)));for(let r of n)r==null||r===!1||o.appendChild(typeof r=="string"||typeof r=="number"?document.createTextNode(String(r)):r);return o}var Wt="https://i.imgur.com/k5WuC32.png",mr="gemini-loader-style",Ge="gemini-loader",fr=80;function cd(){if(document.getElementById(mr))return;let e=document.createElement("style");e.id=mr,e.textContent=`
    /* ===== Loader Variables ===== */
    #${Ge} {
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
    #${Ge} {
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

    #${Ge}.gemini-loader--error .gemini-loader__actions {
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
    #${Ge}.gemini-loader--closing {
      animation: gemini-loader-fade-out 0.4s ease forwards;
      pointer-events: none;
    }

    #${Ge}.gemini-loader--error .gemini-loader__spinner {
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
      #${Ge} { padding: 16px 10px; }
      .gemini-loader__card { padding: 16px; }
      .gemini-loader__header { gap: 12px; }
      .gemini-loader__spinner { width: 42px; height: 42px; }
      .gemini-loader__spinner-icon { width: 56px; height: 56px; }
      .gemini-loader__title { font-size: 16px; }
    }
  `,document.head.appendChild(e)}function jt(e,t,n){let o=S("div",{className:`gemini-loader__log ${n}`},S("div",{className:"gemini-loader__dot"}),S("div",{textContent:t}));for(e.appendChild(o);e.childElementCount>fr;)e.firstElementChild?.remove();e.scrollTop=e.scrollHeight}function ud(){return new Promise(e=>{if(typeof GM_xmlhttpRequest>"u"){e(Wt);return}GM_xmlhttpRequest({method:"GET",url:Wt,responseType:"blob",onload:t=>{let n=t.response,o=new FileReader;o.onloadend=()=>e(o.result),o.onerror=()=>e(Wt),o.readAsDataURL(n)},onerror:()=>e(Wt)})})}function Nn(e={}){let t=Number.isFinite(e.blurPx)?Math.max(4,Number(e.blurPx)):14;cd();let n=S("div",{className:"gemini-loader__subtitle",textContent:e.subtitle??"Initializing the mod..."}),o=S("div",{className:"gemini-loader__logs"}),r=S("img",{className:"gemini-loader__spinner-icon",alt:"Gemini"}),a=S("div",{className:"gemini-loader__spinner"},r);ud().then(b=>{r.src=b});let i=S("div",{className:"gemini-loader__card"},S("div",{className:"gemini-loader__header"},a,S("div",{className:"gemini-loader__titles"},S("div",{className:"gemini-loader__title",textContent:e.title??"Gemini is loading"}),n)),o),s=S("div",{id:Ge},i);(document.body||document.documentElement).appendChild(s);let u=S("div",{className:"gemini-loader__actions"},S("button",{className:"gemini-loader__button",textContent:"Close loader",onclick:()=>s.remove()}));i.appendChild(u),s.style.setProperty("--loader-blur",`${t}px`);let d=b=>{n.textContent=b},l=new Map,c=(b,h)=>{b.className=`gemini-loader__log ${h}`};return{log:(b,h="info")=>jt(o,b,h),logStep:(b,h,w="info")=>{let T=String(b||"").trim();if(!T){jt(o,h,w);return}let x=l.get(T);if(x){x.el.lastElementChild&&(x.el.lastElementChild.textContent=h),x.tone!==w&&(c(x.el,w),x.tone=w);return}let v=S("div",{className:`gemini-loader__log ${w}`},S("div",{className:"gemini-loader__dot"}),S("div",{textContent:h}));for(l.set(T,{el:v,tone:w}),o.appendChild(v);o.childElementCount>fr;){let k=o.firstElementChild;if(!k)break;let L=Array.from(l.entries()).find(([,E])=>E.el===k)?.[0];L&&l.delete(L),k.remove()}o.scrollTop=o.scrollHeight},setSubtitle:d,succeed:(b,h=600)=>{b&&jt(o,b,"success"),s.classList.add("gemini-loader--closing"),setTimeout(()=>s.remove(),h)},fail:(b,h)=>{jt(o,b,"error"),d("Something went wrong. Check the console for details."),s.classList.add("gemini-loader--error"),console.error("[Gemini loader]",b,h)}}}function gr(e,t,n){let o=S("div",{className:"lg-pill",id:"pill"}),r=e.map(l=>{let c=S("button",{className:"lg-tab"},l.label);return c.setAttribute("data-target",l.id),c}),a=S("div",{className:"lg-tabs",id:"lg-tabs-row"},o,...r),i=a;a.addEventListener("wheel",l=>{Math.abs(l.deltaY)>Math.abs(l.deltaX)&&(l.preventDefault(),a.scrollLeft+=l.deltaY)},{passive:!1});function s(l){let c=a.getBoundingClientRect(),p=r.find(v=>v.dataset.target===l)||r[0];if(!p)return;let m=p.getBoundingClientRect(),f=m.left-c.left,g=m.width;o.style.width=`${g}px`,o.style.transform=`translateX(${f}px)`;let b=a.scrollLeft,h=b,w=b+a.clientWidth,T=f-12,x=f+g+12;T<h?a.scrollTo({left:T,behavior:"smooth"}):x>w&&a.scrollTo({left:x-a.clientWidth,behavior:"smooth"})}let u=t||(e[0]?.id??"");function d(l){u=l,r.forEach(c=>c.classList.toggle("active",c.dataset.target===l)),s(l),n(l)}return r.forEach(l=>l.addEventListener("click",()=>d(l.dataset.target))),queueMicrotask(()=>s(u)),{root:i,activate:d,recalc:()=>s(u),getActive:()=>u}}var _e=class{constructor(t){ve(this,"id");ve(this,"label");ve(this,"container",null);ve(this,"cleanupFunctions",[]);this.id=t.id,this.label=t.label}render(t){for(this.unmount();t.firstChild;)t.removeChild(t.firstChild);this.container=t;let n=this.build(t);n instanceof Promise&&n.catch(r=>{console.error(`[Gemini] Error building section ${this.id}:`,r)});let o=t.firstElementChild;o&&o.classList.contains("gemini-section")&&o.classList.add("active")}unmount(){this.executeCleanup(),this.container=null}createContainer(t,n){let o=n?`gemini-section ${n}`:"gemini-section";return S("section",{id:t,className:o})}addCleanup(t){this.cleanupFunctions.push(t)}createGrid(t="12px"){let n=S("div");return n.style.display="grid",n.style.gap=t,n}executeCleanup(){for(let t of this.cleanupFunctions)try{t()}catch(n){console.error(`[Gemini] Cleanup error in section ${this.id}:`,n)}this.cleanupFunctions=[]}};var dt=class{constructor(t,n,o){ve(this,"sections");ve(this,"activeId",null);ve(this,"container");ve(this,"theme");this.sections=new Map(t.map(r=>[r.id,r])),this.container=n,this.theme=o}get ids(){return Array.from(this.sections.keys())}get all(){return Array.from(this.sections.values())}get active(){return this.activeId}activate(t){if(this.activeId!==t){if(!this.sections.has(t))throw new Error(`[Gemini] Unknown section: ${t}`);if(this.activeId&&this.sections.get(this.activeId).unmount(),this.activeId=t,this.sections.get(t).render(this.container),this.theme){let n=this.theme.getCurrentTheme();this.theme.applyTheme(n)}}}};function pt(e,t){try{let n=JSON.stringify(t);GM_setValue(e,n)}catch(n){console.error(`[Gemini] Failed to save key "${e}" to storage:`,n)}}function Ee(e,t){try{let n=GM_getValue(e);return n==null?t:typeof n=="string"?JSON.parse(n):n}catch(n){return console.error(`[Gemini] Failed to load key "${e}" from storage, using default:`,n),t}}var br="gemini.sections";function hr(){let e=Ee(br,{});return e&&typeof e=="object"&&!Array.isArray(e)?e:{}}function dd(e){pt(br,e)}async function yr(e){return hr()[e]}function xr(e,t){let n=hr();dd({...n,[e]:t})}function Bt(e,t){return{...e,...t??{}}}async function vr(e){let t=await yr(e.path),n;e.migrate?n=e.migrate(t):n=t??{},n=Object.assign((d=>JSON.parse(JSON.stringify(d)))(e.defaults),n),e.sanitize&&(n=e.sanitize(n));function r(){xr(e.path,n)}function a(){return n}function i(d){n=e.sanitize?e.sanitize(d):d,r()}function s(d){let c=Object.assign((p=>JSON.parse(JSON.stringify(p)))(n),{});typeof d=="function"?d(c):Object.assign(c,d),n=e.sanitize?e.sanitize(c):c,r()}function u(){r()}return{get:a,set:i,update:s,save:u}}async function mt(e,t){let{path:n=e,...o}=t;return vr({path:n,...o})}var pd=0,Ft=new Map;function Le(e={},...t){let{id:n,className:o,variant:r="default",padding:a="md",interactive:i=!1,expandable:s=!1,defaultExpanded:u=!0,onExpandChange:d,mediaTop:l,title:c,subtitle:p,badge:m,actions:f,footer:g,divider:b=!1,tone:h="neutral",stateKey:w}=e,T=S("div",{className:"card",id:n,tabIndex:i?0:void 0});T.classList.add(`card--${r}`,`card--p-${a}`),i&&T.classList.add("card--interactive"),h!=="neutral"&&T.classList.add(`card--tone-${h}`),o&&T.classList.add(...o.split(" ").filter(Boolean)),s&&T.classList.add("card--expandable");let x=s?w??n??(typeof c=="string"?`title:${c}`:null):null,v=!s||u;x&&Ft.has(x)&&(v=!!Ft.get(x));let k=null,L=null,E=null,A=null,R=null,M=n?`${n}-collapse`:`card-collapse-${++pd}`,U=()=>{if(A!==null&&(cancelAnimationFrame(A),A=null),R){let D=R;R=null,D()}},J=(D,_)=>{if(!E)return;U();let O=E;if(O.setAttribute("aria-hidden",String(!D)),!_){O.classList.remove("card-collapse--animating"),O.style.display=D?"":"none",O.style.height="",O.style.opacity="";return}if(O.classList.add("card-collapse--animating"),O.style.display="",D){O.style.height="auto";let V=O.scrollHeight;if(!V){O.classList.remove("card-collapse--animating"),O.style.display="",O.style.height="",O.style.opacity="";return}O.style.height="0px",O.style.opacity="0",O.offsetHeight,A=requestAnimationFrame(()=>{A=null,O.style.height=`${V}px`,O.style.opacity="1"})}else{let V=O.scrollHeight;if(!V){O.classList.remove("card-collapse--animating"),O.style.display="none",O.style.height="",O.style.opacity="";return}O.style.height=`${V}px`,O.style.opacity="1",O.offsetHeight,A=requestAnimationFrame(()=>{A=null,O.style.height="0px",O.style.opacity="0"})}let I=()=>{O.classList.remove("card-collapse--animating"),O.style.height="",D||(O.style.display="none"),O.style.opacity=""},G=null,W=V=>{V.target===O&&(G!==null&&(clearTimeout(G),G=null),O.removeEventListener("transitionend",W),O.removeEventListener("transitioncancel",W),R=null,I())};R=()=>{G!==null&&(clearTimeout(G),G=null),O.removeEventListener("transitionend",W),O.removeEventListener("transitioncancel",W),R=null,I()},O.addEventListener("transitionend",W),O.addEventListener("transitioncancel",W),G=window.setTimeout(()=>{R?.()},420)};function K(D){let _=document.createElementNS("http://www.w3.org/2000/svg","svg");return _.setAttribute("viewBox","0 0 24 24"),_.setAttribute("width","16"),_.setAttribute("height","16"),_.innerHTML=D==="up"?'<path d="M7 14l5-5 5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>':'<path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',_}function N(D,_=!0,O=!0){v=D,T.classList.toggle("card--collapsed",!v),T.classList.toggle("card--expanded",v),k&&(k.dataset.expanded=String(v),k.setAttribute("aria-expanded",String(v))),L&&(L.setAttribute("aria-expanded",String(v)),L.classList.toggle("card-toggle--collapsed",!v),L.setAttribute("aria-label",v?"Replier le contenu":"Deplier le contenu"),L.replaceChildren(K(v?"up":"down"))),s?J(v,O):E&&(E.style.display="",E.style.height="",E.style.opacity="",E.setAttribute("aria-hidden","false")),_&&d&&d(v),x&&Ft.set(x,v)}if(l){let D=S("div",{className:"card-media"});D.append(l),T.appendChild(D)}let j=!!(c||p||m||f&&f.length||s);if(j){k=S("div",{className:"card-header"});let D=S("div",{className:"card-headline",style:"min-width:0;display:flex;flex-direction:column;gap:2px;"});if(c){let I=S("h3",{className:"card-title",style:"margin:0;font-size:15px;font-weight:700;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:flex;align-items:center;gap:8px;"},c);m&&I.append(typeof m=="string"?S("span",{className:"badge"},m):m),D.appendChild(I)}if(p){let I=S("div",{className:"card-subtitle",style:"opacity:.85;font-size:12px;color:color-mix(in oklab, var(--fg) 80%, #9ca3af)"},p);D.appendChild(I)}(D.childNodes.length||s)&&k.appendChild(D);let _=S("div",{className:"card-header-right",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"}),O=S("div",{className:"card-actions",style:"display:flex;gap:8px;flex:0 0 auto;align-items:center;"});f?.forEach(I=>O.appendChild(I)),O.childNodes.length&&_.appendChild(O),s&&(L=S("button",{className:"card-toggle",type:"button",ariaExpanded:String(v),ariaControls:M,ariaLabel:v?"Replier le contenu":"Deplier le contenu"}),L.textContent=v?"\u25B2":"\u25BC",L.addEventListener("click",I=>{I.preventDefault(),I.stopPropagation(),N(!v)}),_.appendChild(L),k.classList.add("card-header--expandable"),k.addEventListener("click",I=>{let G=I.target;G?.closest(".card-actions")||G?.closest(".card-toggle")||N(!v)})),_.childNodes.length&&k.appendChild(_),T.appendChild(k)}E=S("div",{className:"card-collapse",id:M,ariaHidden:s?String(!v):"false"}),T.appendChild(E),b&&j&&E.appendChild(S("div",{className:"card-divider"}));let H=S("div",{className:"card-body"});if(H.append(...t),E.appendChild(H),g){b&&E.appendChild(S("div",{className:"card-divider"}));let D=S("div",{className:"card-footer"});D.append(g),E.appendChild(D)}return L&&L.setAttribute("aria-controls",M),N(v,!1,!1),x&&Ft.set(x,v),T}function Wn(...e){return S("div",{className:"card-footer"},...e)}var Vt=!1,Ut=new Set,fe=e=>{let t=document.activeElement;for(let n of Ut)if(t&&(t===n||n.contains(t))){e.stopImmediatePropagation(),e.stopPropagation();return}};function md(){Vt||(Vt=!0,window.addEventListener("keydown",fe,!0),window.addEventListener("keypress",fe,!0),window.addEventListener("keyup",fe,!0),document.addEventListener("keydown",fe,!0),document.addEventListener("keypress",fe,!0),document.addEventListener("keyup",fe,!0))}function fd(){Vt&&(Ut.size>0||(Vt=!1,window.removeEventListener("keydown",fe,!0),window.removeEventListener("keypress",fe,!0),window.removeEventListener("keyup",fe,!0),document.removeEventListener("keydown",fe,!0),document.removeEventListener("keypress",fe,!0),document.removeEventListener("keyup",fe,!0)))}function Je(e){let{id:t,value:n=null,options:o,placeholder:r="Select...",size:a="md",disabled:i=!1,blockGameKeys:s=!0,onChange:u,onOpenChange:d}=e,l=S("div",{className:"select",id:t}),c=S("button",{className:"select-trigger",type:"button"}),p=S("span",{className:"select-value"},r),m=S("span",{className:"select-caret"},"\u25BE");c.append(p,m);let f=S("div",{className:"select-menu",role:"listbox",tabindex:"-1","aria-hidden":"true"});l.classList.add(`select--${a}`);let g=!1,b=n,h=null,w=!!i;function T(I){return I==null?r:(e.options||o).find(W=>W.value===I)?.label??r}function x(I){p.textContent=T(I),f.querySelectorAll(".select-option").forEach(G=>{let W=G.dataset.value,V=I!=null&&W===I;G.classList.toggle("selected",V),G.setAttribute("aria-selected",String(V))})}function v(I){f.replaceChildren(),I.forEach(G=>{let W=S("button",{className:"select-option"+(G.disabled?" disabled":""),type:"button",role:"option","data-value":G.value,"aria-selected":String(G.value===b),tabindex:"-1"},G.label);G.value===b&&W.classList.add("selected"),G.disabled||W.addEventListener("pointerdown",V=>{V.preventDefault(),V.stopPropagation(),M(G.value,{notify:!0}),A()},{capture:!0}),f.appendChild(W)})}function k(){c.setAttribute("aria-expanded",String(g)),f.setAttribute("aria-hidden",String(!g))}function L(){let I=c.getBoundingClientRect();Object.assign(f.style,{minWidth:`${I.width}px`})}function E(){g||w||(g=!0,l.classList.add("open"),k(),L(),document.addEventListener("mousedown",j,!0),document.addEventListener("scroll",H,!0),window.addEventListener("resize",D),f.focus({preventScroll:!0}),s&&(md(),Ut.add(l),h=()=>{Ut.delete(l),fd()}),d?.(!0))}function A(){g&&(g=!1,l.classList.remove("open"),k(),document.removeEventListener("mousedown",j,!0),document.removeEventListener("scroll",H,!0),window.removeEventListener("resize",D),c.focus({preventScroll:!0}),h?.(),h=null,d?.(!1))}function R(){g?A():E()}function M(I,G={}){let W=b;b=I,x(b),G.notify!==!1&&W!==I&&u?.(I)}function U(){return b}function J(I){let G=Array.from(f.querySelectorAll(".select-option:not(.disabled)"));if(!G.length)return;let W=G.findIndex(oe=>oe.classList.contains("active")),V=G[(W+(I===1?1:G.length-1))%G.length];G.forEach(oe=>oe.classList.remove("active")),V.classList.add("active"),V.focus({preventScroll:!0}),V.scrollIntoView({block:"nearest"})}function K(I){(I.key===" "||I.key==="Enter"||I.key==="ArrowDown")&&(I.preventDefault(),E())}function N(I){if(I.key==="Escape"){I.preventDefault(),A();return}if(I.key==="Enter"||I.key===" "){let G=f.querySelector(".select-option.active")||f.querySelector(".select-option.selected");G&&!G.classList.contains("disabled")&&(I.preventDefault(),M(G.dataset.value,{notify:!0}),A());return}if(I.key==="ArrowDown"){I.preventDefault(),J(1);return}if(I.key==="ArrowUp"){I.preventDefault(),J(-1);return}}function j(I){l.contains(I.target)||A()}function H(){g&&L()}function D(){g&&L()}function _(I){w=!!I,c.disabled=w,l.classList.toggle("disabled",w),w&&A()}function O(I){e.options=I,v(I),I.some(G=>G.value===b)||(b=null,x(null))}return l.append(c,f),c.addEventListener("pointerdown",I=>{I.preventDefault(),I.stopPropagation(),R()},{capture:!0}),c.addEventListener("keydown",K),f.addEventListener("keydown",N),v(o),n!=null?(b=n,x(b)):x(null),k(),_(w),{root:l,open:E,close:A,toggle:R,getValue:U,setValue:M,setOptions:O,setDisabled:_,destroy(){document.removeEventListener("mousedown",j,!0),document.removeEventListener("scroll",H,!0),window.removeEventListener("resize",D),h?.(),h=null}}}function zt(e={}){let{id:t,text:n="",htmlFor:o,tone:r="default",size:a="md",layout:i="inline",variant:s="text",required:u=!1,disabled:d=!1,tooltip:l,hint:c,icon:p,suffix:m,onClick:f}=e,g=S("div",{className:"lg-label-wrap",id:t}),b=S("label",{className:"lg-label",...o?{htmlFor:o}:{},...l?{title:l}:{}});if(p){let M=typeof p=="string"?S("span",{className:"lg-label-ico"},p):p;M.classList?.add?.("lg-label-ico"),b.appendChild(M)}let h=S("span",{className:"lg-label-text"},n);b.appendChild(h);let w=S("span",{className:"lg-label-req",ariaHidden:"true"}," *");u&&b.appendChild(w);let T=null;if(m!=null){T=typeof m=="string"?document.createTextNode(m):m;let M=S("span",{className:"lg-label-suffix"});M.appendChild(T),b.appendChild(M)}let x=c?S("div",{className:"lg-label-hint"},c):null;g.classList.add(`lg-label--${i}`),g.classList.add(`lg-label--${a}`),s==="title"&&g.classList.add("lg-label--title"),v(r),d&&g.classList.add("is-disabled"),g.appendChild(b),x&&g.appendChild(x),f&&b.addEventListener("click",f);function v(M){g.classList.remove("lg-label--default","lg-label--muted","lg-label--info","lg-label--success","lg-label--warning","lg-label--danger"),g.classList.add(`lg-label--${M}`)}function k(M){h.textContent=M}function L(M){v(M)}function E(M){M&&!w.isConnected&&b.appendChild(w),!M&&w.isConnected&&w.remove(),M?b.setAttribute("aria-required","true"):b.removeAttribute("aria-required")}function A(M){g.classList.toggle("is-disabled",!!M)}function R(M){!M&&x&&x.isConnected?x.remove():M&&x?x.textContent=M:M&&!x&&g.appendChild(S("div",{className:"lg-label-hint"},M))}return{root:g,labelEl:b,hintEl:x,setText:k,setTone:L,setRequired:E,setDisabled:A,setHint:R}}function ft(e){return e==null?null:typeof e=="string"?document.createTextNode(e):e}function $t(e,t){let n=document.createElement("span");n.className=`btn-ico btn-ico--${t}`;let o=ft(e);return o&&n.appendChild(o),n}function gd(){let e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("viewBox","0 0 24 24"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("aria-hidden","true"),t.style.marginRight="6px",t.style.display="none",t.style.flexShrink="0";let n=document.createElementNS(e,"circle");n.setAttribute("cx","12"),n.setAttribute("cy","12"),n.setAttribute("r","9"),n.setAttribute("fill","none"),n.setAttribute("stroke","currentColor"),n.setAttribute("stroke-width","3"),n.setAttribute("stroke-linecap","round");let o=document.createElementNS(e,"animate");o.setAttribute("attributeName","stroke-dasharray"),o.setAttribute("values","1,150;90,150;90,150"),o.setAttribute("dur","1.5s"),o.setAttribute("repeatCount","indefinite");let r=document.createElementNS(e,"animateTransform");return r.setAttribute("attributeName","transform"),r.setAttribute("attributeType","XML"),r.setAttribute("type","rotate"),r.setAttribute("from","0 12 12"),r.setAttribute("to","360 12 12"),r.setAttribute("dur","1s"),r.setAttribute("repeatCount","indefinite"),n.appendChild(o),n.appendChild(r),t.appendChild(n),t}function Re(e={}){let{label:t="",id:n,variant:o="default",size:r="md",iconLeft:a,iconRight:i,loading:s=!1,tooltip:u,type:d="button",onClick:l,disabled:c=!1,fullWidth:p=!1}=e,m=S("button",{className:"btn",id:n});m.type=d,o==="primary"&&m.classList.add("primary"),r==="sm"&&m.classList.add("btn--sm"),u&&(m.title=u),p&&(m.style.width="100%");let f=gd(),g=a?$t(a,"left"):null,b=i?$t(i,"right"):null,h=document.createElement("span");h.className="btn-label";let w=ft(t);w&&h.appendChild(w),!w&&(g||b)&&m.classList.add("btn--icon"),m.appendChild(f),g&&m.appendChild(g),m.appendChild(h),b&&m.appendChild(b);let T=c||s;m.disabled=T,m.setAttribute("aria-busy",String(!!s)),f.style.display=s?"inline-block":"none",l&&m.addEventListener("click",l);let x=m;return x.setLoading=v=>{m.setAttribute("aria-busy",String(!!v)),f.style.display=v?"inline-block":"none",m.disabled=v||c},x.setDisabled=v=>{m.disabled=v||m.getAttribute("aria-busy")==="true"},x.setLabel=v=>{h.replaceChildren();let k=ft(v);k&&h.appendChild(k),!k&&(g||b)?m.classList.add("btn--icon"):m.classList.remove("btn--icon")},x.setIconLeft=v=>{if(v==null){g?.remove();return}g?g.replaceChildren(ft(v)):m.insertBefore($t(v,"left"),h)},x.setIconRight=v=>{if(v==null){b?.remove();return}b?b.replaceChildren(ft(v)):m.appendChild($t(v,"right"))},x}function bd(){try{let e=window.visualViewport,t=Math.round((e?.width??window.innerWidth)||0),n=Math.round((e?.height??window.innerHeight)||0);if(t&&n)return t>=n?"landscape":"portrait"}catch{}return"unknown"}function hd(){let e=navigator.userAgent||"",t=navigator.platform||"",n=navigator.userAgentData;if(n&&typeof n.platform=="string"){let r=n.platform.toLowerCase();if(r.includes("windows"))return"windows";if(r.includes("mac"))return"mac";if(r.includes("android"))return"android";if(r.includes("chrome os")||r.includes("cros"))return"chromeos";if(r.includes("linux"))return"linux";if(r.includes("ios"))return"ios"}return/iPhone|iPad|iPod/i.test(e)||t==="MacIntel"&&navigator.maxTouchPoints>1?"ios":/Android/i.test(e)?"android":/CrOS/i.test(e)?"chromeos":/Win/i.test(e)?"windows":/Mac/i.test(e)?"mac":/Linux/i.test(e)?"linux":"unknown"}function yd(){let e=navigator.userAgent||"",t=navigator.userAgentData;if(t&&Array.isArray(t.brands)){let n=t.brands.map(i=>String(i.brand||i.brandName||i.brandVersion||i)),o=n.some(i=>/Edge/i.test(i)||/Microsoft Edge/i.test(i)),r=n.some(i=>/Opera/i.test(i)||/OPR/i.test(i)),a=n.some(i=>/Chrome|Chromium/i.test(i));if(o)return"Edge";if(r)return"Opera";if(a)return"Chrome";if(navigator.brave)return"Brave"}return/FxiOS/i.test(e)?"Firefox":/CriOS/i.test(e)?"Chrome":/EdgiOS/i.test(e)?"Edge":/OPiOS|OPR|Opera Mini|Opera/i.test(e)?"Opera":/Edg\//i.test(e)?"Edge":/OPR\//i.test(e)||/Opera/i.test(e)?"Opera":/Firefox/i.test(e)?"Firefox":/Safari/i.test(e)&&!/Chrome|Chromium|Edg|OPR/i.test(e)?"Safari":/Brave/i.test(e)||window.Brave||navigator.brave?"Brave":/Chrome|Chromium/i.test(e)?"Chrome":"Unknown"}function xd(){let e=navigator.userAgent||"",t=navigator.userAgentData;return t&&typeof t.mobile=="boolean"?t.mobile?"mobile":"desktop":/Android|iPhone|iPad|iPod|Mobile/i.test(e)?"mobile":"desktop"}function he(){let e=(()=>{try{return window.top!==window.self}catch{return!0}})(),t=vd(document.referrer),o=e&&!!t&&/(^|\.)discord(app)?\.com$/i.test(t)?"discord":"web",r=xd(),a=hd(),i=yd(),s=window.screen||{},u=window.visualViewport,d=Math.round(window.innerWidth||document.documentElement.clientWidth||0),l=Math.round(window.innerHeight||document.documentElement.clientHeight||0),c=Math.round(u?.width??d),p=Math.round(u?.height??l),m=Math.round(s.width||0),f=Math.round(s.height||0),g=Math.round(s.availWidth||m),b=Math.round(s.availHeight||f),h=Number.isFinite(window.devicePixelRatio)?window.devicePixelRatio:1;return{surface:o,host:location.hostname,origin:location.origin,isInIframe:e,platform:r,browser:i,os:a,viewportWidth:d,viewportHeight:l,visualViewportWidth:c,visualViewportHeight:p,screenWidth:m,screenHeight:f,availScreenWidth:g,availScreenHeight:b,dpr:h,orientation:bd()}}function wr(){return he().surface==="discord"}function vd(e){if(!e)return null;try{return new URL(e).hostname}catch{return null}}var Kt=!1,gt=new Set;function wd(e=document){let t=e.activeElement||null;for(;t&&t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;return t}var ge=e=>{let t=wd();if(t){for(let n of gt)if(t===n||n.contains(t)){e.stopImmediatePropagation(),e.stopPropagation();return}}};function Sd(){Kt||(Kt=!0,window.addEventListener("keydown",ge,!0),window.addEventListener("keypress",ge,!0),window.addEventListener("keyup",ge,!0),document.addEventListener("keydown",ge,!0),document.addEventListener("keypress",ge,!0),document.addEventListener("keyup",ge,!0))}function kd(){Kt&&(Kt=!1,window.removeEventListener("keydown",ge,!0),window.removeEventListener("keypress",ge,!0),window.removeEventListener("keyup",ge,!0),document.removeEventListener("keydown",ge,!0),document.removeEventListener("keypress",ge,!0),document.removeEventListener("keyup",ge,!0))}function Td(e){return gt.size===0&&Sd(),gt.add(e),()=>{gt.delete(e),gt.size===0&&kd()}}function Ad(e,t,n,o){let r;switch(e){case"digits":r="0-9";break;case"alpha":r="\\p{L}";break;case"alphanumeric":r="\\p{L}0-9";break;default:return null}return t&&(r+=" "),n&&(r+="\\-"),o&&(r+="_"),new RegExp(`[^${r}]`,"gu")}function Pd(e,t){return t?e.replace(t,""):e}function Cd(e,t=0){if(!t)return e;let n;return((...o)=>{clearTimeout(n),n=setTimeout(()=>e(...o),t)})}function Sr(e={}){let{id:t,placeholder:n="",value:o="",mode:r="any",allowSpaces:a=!1,allowDashes:i=!1,allowUnderscore:s=!1,maxLength:u,blockGameKeys:d=!0,debounceMs:l=0,onChange:c,onEnter:p,label:m}=e,f=S("div",{className:"lg-input-wrap"}),g=S("input",{className:"input",id:t,placeholder:n});if(typeof u=="number"&&u>0&&(g.maxLength=u),o&&(g.value=o),m){let M=S("div",{className:"lg-input-label"},m);f.appendChild(M)}f.appendChild(g);let b=Ad(r,a,i,s),h=()=>{let M=g.selectionStart??g.value.length,U=g.value.length,J=Pd(g.value,b);if(J!==g.value){g.value=J;let K=U-J.length,N=Math.max(0,M-K);g.setSelectionRange(N,N)}},w=Cd(()=>c?.(g.value),l);g.addEventListener("input",()=>{h(),w()}),g.addEventListener("paste",()=>queueMicrotask(()=>{h(),w()})),g.addEventListener("keydown",M=>{M.key==="Enter"&&p?.(g.value)});let T=d?Td(g):()=>{};function x(){return g.value}function v(M){g.value=M??"",h(),w()}function k(){g.focus()}function L(){g.blur()}function E(M){g.disabled=!!M}function A(){return document.activeElement===g}function R(){T()}return{root:f,input:g,getValue:x,setValue:v,focus:k,blur:L,setDisabled:E,isFocused:A,destroy:R}}function ne(e,t,n){return Math.min(n,Math.max(t,e))}function ht({h:e,s:t,v:n,a:o}){let r=(e%360+360)%360/60,a=n*t,i=a*(1-Math.abs(r%2-1)),s=0,u=0,d=0;switch(Math.floor(r)){case 0:s=a,u=i;break;case 1:s=i,u=a;break;case 2:u=a,d=i;break;case 3:u=i,d=a;break;case 4:s=i,d=a;break;default:s=a,d=i;break}let c=n-a,p=Math.round((s+c)*255),m=Math.round((u+c)*255),f=Math.round((d+c)*255);return{r:ne(p,0,255),g:ne(m,0,255),b:ne(f,0,255),a:ne(o,0,1)}}function kr({r:e,g:t,b:n,a:o}){let r=ne(e,0,255)/255,a=ne(t,0,255)/255,i=ne(n,0,255)/255,s=Math.max(r,a,i),u=Math.min(r,a,i),d=s-u,l=0;d!==0&&(s===r?l=60*((a-i)/d%6):s===a?l=60*((i-r)/d+2):l=60*((r-a)/d+4)),l<0&&(l+=360);let c=s===0?0:d/s;return{h:l,s:c,v:s,a:ne(o,0,1)}}function Bn({r:e,g:t,b:n}){let o=r=>ne(Math.round(r),0,255).toString(16).padStart(2,"0");return`#${o(e)}${o(t)}${o(n)}`.toUpperCase()}function Md({r:e,g:t,b:n,a:o}){let r=ne(Math.round(o*255),0,255);return`${Bn({r:e,g:t,b:n,a:o})}${r.toString(16).padStart(2,"0")}`.toUpperCase()}function bt({r:e,g:t,b:n,a:o}){let r=Math.round(o*1e3)/1e3;return`rgba(${e}, ${t}, ${n}, ${r})`}function Ye(e){let t=e.trim();if(!t||(t.startsWith("#")&&(t=t.slice(1)),![3,4,6,8].includes(t.length))||!/^[0-9a-fA-F]+$/.test(t))return null;(t.length===3||t.length===4)&&(t=t.split("").map(i=>i+i).join(""));let n=255;t.length===8&&(n=parseInt(t.slice(6,8),16),t=t.slice(0,6));let o=parseInt(t.slice(0,2),16),r=parseInt(t.slice(2,4),16),a=parseInt(t.slice(4,6),16);return{r:o,g:r,b:a,a:n/255}}function jn(e){if(!e)return null;let t=e.trim();if(t.startsWith("#"))return Ye(t);let n=t.match(/^rgba?\(([^)]+)\)$/i);if(n){let o=n[1].split(",").map(u=>u.trim());if(o.length<3)return null;let r=Number(o[0]),a=Number(o[1]),i=Number(o[2]),s=o[3]!=null?Number(o[3]):1;return[r,a,i,s].some(u=>Number.isNaN(u))?null:{r,g:a,b:i,a:s}}return null}function Id(e,t){let n=jn(e)??Ye(e??"")??{r:244,g:67,b:54,a:1};return typeof t=="number"&&(n.a=ne(t,0,1)),kr(n)}function Ed(e){return`#${e.trim().replace(/[^0-9a-fA-F#]/g,"").replace(/#/g,"")}`.slice(0,9).toUpperCase()}function Ld(e){let t=e.trim();return t&&(/^rgba?\s*\(/i.test(t)?t=t.replace(/^rgba?/i,"rgba"):(t=t.replace(/^\(?(.*)\)?$/,"$1"),t=`rgba(${t})`),t=t.replace(/\s*\(\s*/,"("),t=t.replace(/\s*\)\s*$/,")"),t=t.replace(/\s*,\s*/g,", "),t)}function Ne(e){let t=ht(e),n=ht({...e,a:1});return{hsva:{...e},hex:Bn(n),hexa:Md(t),rgba:bt(t),alpha:e.a}}function Tr(e={}){let{id:t,label:n="Color",value:o,alpha:r,defaultExpanded:a=!1,detectMobile:i,onInput:s,onChange:u}=e,l=i?i():he().platform==="mobile",c=Id(o,r),p=Le({id:t,className:"color-picker",title:n,padding:l?"md":"lg",variant:"soft",expandable:!l,defaultExpanded:!l&&a});p.classList.add(l?"color-picker--mobile":"color-picker--desktop");let m=p.querySelector(".card-header");m&&m.classList.add("color-picker__header");let f=m?.querySelector(".card-title"),g=S("button",{className:"color-picker__preview",type:"button",title:`Preview ${n}`,"aria-label":`Change ${n}`});f?f.prepend(g):m?m.prepend(g):p.prepend(g);let b=p.querySelector(".card-toggle");!l&&b&&g.addEventListener("click",()=>{p.classList.contains("card--collapsed")&&b.click()});let h=p.querySelector(".card-collapse"),w=null,T=null,x=null,v=null,k=null,L=null,E=null,A=null,R=null,M="hex";function U(H){let D=Ne(c);H==="input"?s?.(D):u?.(D)}function J(){let H=Ne(c);if(g.style.setProperty("--cp-preview-color",H.rgba),g.setAttribute("aria-label",`${n}: ${H.hexa}`),!l&&w&&T&&x&&v&&k&&L&&E){let D=ht({...c,s:1,v:1,a:1}),_=bt(D);w.style.setProperty("--cp-palette-hue",_),T.style.left=`${c.s*100}%`,T.style.top=`${(1-c.v)*100}%`,x.style.setProperty("--cp-alpha-gradient",`linear-gradient(180deg, ${bt({...D,a:1})} 0%, ${bt({...D,a:0})} 100%)`),v.style.top=`${(1-c.a)*100}%`,k.style.setProperty("--cp-hue-color",bt(ht({...c,v:1,s:1,a:1}))),L.style.left=`${c.h/360*100}%`;let O=c.a===1?H.hex:H.hexa,I=H.rgba,G=M==="hex"?O:I;E!==document.activeElement&&(E.value=G),E.setAttribute("aria-label",`${M.toUpperCase()} code for ${n}`),E.placeholder=M==="hex"?"#RRGGBB or #RRGGBBAA":"rgba(0, 0, 0, 1)",M==="hex"?E.maxLength=9:E.removeAttribute("maxLength"),E.dataset.mode=M,A&&(A.textContent=M.toUpperCase(),A.setAttribute("aria-label",M==="hex"?"Passer en saisie RGBA":"Revenir en saisie HEX"),A.setAttribute("aria-pressed",M==="rgba"?"true":"false"),A.classList.toggle("is-alt",M==="rgba"))}R&&R!==document.activeElement&&(R.value=H.hex)}function K(H,D=null){c={h:(H.h%360+360)%360,s:ne(H.s,0,1),v:ne(H.v,0,1),a:ne(H.a,0,1)},J(),D&&U(D)}function N(H,D=null){K(kr(H),D)}function j(H,D,_){H.addEventListener("pointerdown",O=>{O.preventDefault();let I=O.pointerId,G=V=>{V.pointerId===I&&D(V)},W=V=>{V.pointerId===I&&(document.removeEventListener("pointermove",G),document.removeEventListener("pointerup",W),document.removeEventListener("pointercancel",W),_?.(V))};D(O),document.addEventListener("pointermove",G),document.addEventListener("pointerup",W),document.addEventListener("pointercancel",W)})}if(!l&&h){let H=h.querySelector(".card-body");if(H){H.classList.add("color-picker__body"),T=S("div",{className:"color-picker__palette-cursor"}),w=S("div",{className:"color-picker__palette"},T),v=S("div",{className:"color-picker__alpha-thumb"}),x=S("div",{className:"color-picker__alpha"},v),L=S("div",{className:"color-picker__hue-thumb"}),k=S("div",{className:"color-picker__hue"},L);let D=S("div",{className:"color-picker__main"},w,x),_=S("div",{className:"color-picker__hue-row"},k),O=Sr({blockGameKeys:!0});E=O.input,E.classList.add("color-picker__hex-input"),E.value="",E.maxLength=9,E.spellcheck=!1,E.inputMode="text",E.setAttribute("aria-label",`Hex code for ${n}`),A=S("button",{type:"button",className:"color-picker__mode-btn",textContent:"HEX","aria-pressed":"false","aria-label":"Passer en saisie RGBA"}),O.root.classList.add("color-picker__hex-wrap");let I=S("div",{className:"color-picker__hex-row"},A,O.root);H.replaceChildren(D,_,I),j(w,W=>{if(!w||!T)return;let V=w.getBoundingClientRect(),oe=ne((W.clientX-V.left)/V.width,0,1),kn=ne((W.clientY-V.top)/V.height,0,1);K({...c,s:oe,v:1-kn},"input")},()=>U("change")),j(x,W=>{if(!x)return;let V=x.getBoundingClientRect(),oe=ne((W.clientY-V.top)/V.height,0,1);K({...c,a:1-oe},"input")},()=>U("change")),j(k,W=>{if(!k)return;let V=k.getBoundingClientRect(),oe=ne((W.clientX-V.left)/V.width,0,1);K({...c,h:oe*360},"input")},()=>U("change")),A.addEventListener("click",()=>{if(M=M==="hex"?"rgba":"hex",E){let W=Ne(c);E.value=M==="hex"?c.a===1?W.hex:W.hexa:W.rgba}J(),E?.focus(),E?.select()}),E.addEventListener("input",()=>{if(M==="hex"){let W=Ed(E.value);if(W!==E.value){let V=E.selectionStart??W.length;E.value=W,E.setSelectionRange(V,V)}}});let G=()=>{let W=E.value;if(M==="hex"){let V=Ye(W);if(!V){E.value=c.a===1?Ne(c).hex:Ne(c).hexa;return}let oe=W.startsWith("#")?W.slice(1):W,kn=oe.length===4||oe.length===8;V.a=kn?V.a:c.a,N(V,"change")}else{let V=Ld(W),oe=jn(V);if(!oe){E.value=Ne(c).rgba;return}N(oe,"change")}};E.addEventListener("change",G),E.addEventListener("blur",G),E.addEventListener("keydown",W=>{W.key==="Enter"&&(G(),E.blur())})}}return l&&(h&&h.remove(),R=S("input",{className:"color-picker__native",type:"color",value:Bn(ht({...c,a:1}))}),g.addEventListener("click",()=>R.click()),R.addEventListener("input",()=>{let H=Ye(R.value);H&&(H.a=c.a,N(H,"input"),U("change"))}),p.appendChild(R)),J(),{root:p,isMobile:l,getValue:()=>Ne(c),setValue:(H,D)=>{let _=jn(H)??Ye(H)??Ye("#FFFFFF");_&&(typeof D=="number"&&(_.a=D),N(_,null))}}}function Rd(e){try{return!!e.isSecureContext}catch{return!1}}function Fn(e){let t=e?.getRootNode?.();return t&&(t instanceof Document||t.host)?t:document}function Ar(){let e=navigator.platform||"",t=navigator.userAgent||"";return/Mac|iPhone|iPad|iPod/i.test(e)||/Mac OS|iOS/i.test(t)}async function Od(){try{let e=await navigator.permissions?.query?.({name:"clipboard-write"});return e?e.state==="granted"||e.state==="prompt":!0}catch{return!0}}function Dd(e,t){let n=document.createElement("textarea");return n.value=e,n.setAttribute("readonly","true"),n.style.position="fixed",n.style.opacity="0",n.style.pointerEvents="none",n.style.top="0",t.appendChild?t.appendChild(n):document.body.appendChild(n),n}function Hd(e){try{let t=window.getSelection?.();if(!t)return!1;let n=document.createRange();return n.selectNodeContents(e),t.removeAllRanges(),t.addRange(n),!0}catch{return!1}}async function Gd(e){if(!("clipboard"in navigator))return{ok:!1,method:"clipboard-write"};if(!Rd(P))return{ok:!1,method:"clipboard-write"};if(!await Od())return{ok:!1,method:"clipboard-write"};try{return await navigator.clipboard.writeText(e),{ok:!0,method:"clipboard-write"}}catch{return{ok:!1,method:"clipboard-write"}}}function _d(e,t){try{let n=t||Fn(),o=Dd(e,n);o.focus(),o.select(),o.setSelectionRange(0,o.value.length);let r=!1;try{r=document.execCommand("copy")}catch{r=!1}return o.remove(),{ok:r,method:"execCommand"}}catch{return{ok:!1,method:"execCommand"}}}function Nd(e,t){if(!t)return{ok:!1,method:"selection"};let n=t.textContent??"",o=!1;if(n!==e)try{t.textContent=e,o=!0}catch{}let r=Hd(t);o&&setTimeout(()=>{try{t.textContent=n}catch{}},80);let a=Ar()?"\u2318C pour copier":"Ctrl+C pour copier";return{ok:r,method:"selection",hint:a}}async function Wd(e,t={}){let n=(e??"").toString();if(!n.length)return{ok:!1,method:"noop"};let o=await Gd(n);if(o.ok)return o;let r=t.injectionRoot||Fn(t.valueNode||void 0),a=_d(n,r);if(a.ok)return a;let i=Nd(n,t.valueNode||null);if(i.ok)return i;if(!t.disablePromptFallback)try{return window.prompt(wr()?"Copie manuelle (Discord bloque clipboard):":"Copie manuelle:",n),{ok:!0,method:"prompt"}}catch{}return{ok:!1,method:"noop"}}function Pr(e,t,n={}){let o=r=>{if(n.showTip){n.showTip(r);return}try{e.setAttribute("aria-label",r);let a=document.createElement("div");a.textContent=r,a.style.position="absolute",a.style.top="-28px",a.style.right="0",a.style.padding="4px 8px",a.style.borderRadius="8px",a.style.fontSize="12px",a.style.background="color-mix(in oklab, var(--bg) 85%, transparent)",a.style.border="1px solid var(--border)",a.style.color="var(--fg)",a.style.pointerEvents="none",a.style.opacity="0",a.style.transition="opacity .12s";let i=Fn(e);i.appendChild?i.appendChild(a):document.body.appendChild(a);let s=e.getBoundingClientRect();a.style.left=`${s.right-8}px`,a.style.top=`${s.top-28}px`,requestAnimationFrame(()=>a.style.opacity="1"),setTimeout(()=>{a.style.opacity="0",setTimeout(()=>a.remove(),150)},1200)}catch{}};e.addEventListener("click",async r=>{r.stopPropagation();let a=(t()??"").toString(),i=await Wd(a,{valueNode:n.valueNode??null,injectionRoot:n.injectionRoot??null,disablePromptFallback:n.disablePromptFallback??!1});n.onResult?.(i),i.ok?i.method==="clipboard-write"||i.method==="execCommand"||i.method==="prompt"?o("Copi\xE9"):i.method==="selection"&&o(i.hint||(Ar()?"\u2318C pour copier":"Ctrl+C pour copier")):o("Impossible de copier")})}var Oe={light:{"--bg":"rgba(255,255,255,0.7)","--fg":"#0f172a","--muted":"rgba(15,23,42,0.06)","--soft":"rgba(15,23,42,0.04)","--accent":"#2563eb","--border":"rgba(15,23,42,0.12)","--shadow":"rgba(2,6,23,.2)","--tab-bg":"#ffffff","--tab-fg":"#0f172a","--pill-from":"#4f46e5","--pill-to":"#06b6d4"},dark:{"--bg":"rgba(10,12,18,0.6)","--fg":"#e5e7eb","--muted":"rgba(229,231,235,0.08)","--soft":"rgba(229,231,235,0.05)","--accent":"#60a5fa","--border":"rgba(148,163,184,0.2)","--shadow":"rgba(0,0,0,.45)","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#e5e7eb","--pill-from":"#6366f1","--pill-to":"#06b6d4"},sepia:{"--bg":"rgba(247,242,231,0.72)","--fg":"#3b2f2f","--muted":"rgba(59,47,47,0.06)","--soft":"rgba(59,47,47,0.04)","--accent":"#b07d62","--border":"rgba(59,47,47,0.14)","--shadow":"rgba(0,0,0,.18)","--tab-bg":"#fff","--tab-fg":"#3b2f2f","--pill-from":"#b07d62","--pill-to":"#d4a373"},forest:{"--bg":"rgba(14,24,18,0.62)","--fg":"#e7f5e9","--muted":"rgba(231,245,233,0.08)","--soft":"rgba(231,245,233,0.05)","--accent":"#34d399","--border":"rgba(231,245,233,0.16)","--shadow":"rgba(0,0,0,.5)","--tab-bg":"rgba(255,255,255,0.06)","--tab-fg":"#e7f5e9","--pill-from":"#10b981","--pill-to":"#84cc16"},violet:{"--bg":"rgba(23, 16, 42, 0.68)","--fg":"#f5f3ff","--muted":"rgba(245,243,255,0.08)","--soft":"rgba(245,243,255,0.05)","--accent":"#a855f7","--border":"rgba(216,180,254,0.22)","--shadow":"rgba(12,3,30,.55)","--tab-bg":"rgba(255,255,255,0.08)","--tab-fg":"#ede9fe","--pill-from":"#a855f7","--pill-to":"#f472b6"},ocean:{"--bg":"rgba(10, 34, 46, 0.66)","--fg":"#e0f7ff","--muted":"rgba(224,247,255,0.07)","--soft":"rgba(224,247,255,0.05)","--accent":"#38bdf8","--border":"rgba(125, 211, 252, 0.22)","--shadow":"rgba(0, 16, 32, .52)","--tab-bg":"rgba(56,189,248,0.14)","--tab-fg":"#e0f7ff","--pill-from":"#0ea5e9","--pill-to":"#14b8a6"},ember:{"--bg":"rgba(34,18,10,0.64)","--fg":"#fff7ed","--muted":"rgba(255,247,237,0.08)","--soft":"rgba(255,247,237,0.05)","--accent":"#f97316","--border":"rgba(255, 159, 92, 0.24)","--shadow":"rgba(16,6,2,.52)","--tab-bg":"rgba(255,247,237,0.09)","--tab-fg":"#fff7ed","--pill-from":"#fb923c","--pill-to":"#facc15"}};function Vn(e){let{host:t,themes:n,initialTheme:o,onThemeChange:r}=e,a=o,i=null,s=!1;function u(l){let c=n[l]||n[a]||{};s&&t.classList.add("theme-anim");for(let[p,m]of Object.entries(c))t.style.setProperty(p,m);s?(i!==null&&clearTimeout(i),i=P.setTimeout(()=>{t.classList.remove("theme-anim"),i=null},320)):s=!0,a=l,r?.(l)}function d(){return a}return u(o),{applyTheme:u,getCurrentTheme:d}}var qt={ui:{expandedCards:{style:!1,system:!1}}};async function Cr(){let e=await mt("tab-settings",{version:1,defaults:qt,sanitize:r=>({ui:{expandedCards:Bt(qt.ui.expandedCards,r.ui?.expandedCards)}})});function t(r){let a=e.get();e.update({ui:{...a.ui,...r,expandedCards:Bt(a.ui.expandedCards,r.expandedCards)}})}function n(r,a){let i=e.get();e.update({ui:{...i.ui,expandedCards:{...i.ui.expandedCards,[r]:!!a}}})}function o(r){let a=e.get();n(r,!a.ui.expandedCards[r])}return{get:e.get,set:e.set,save:e.save,setUI:t,setCardExpanded:n,toggleCard:o}}function Mr(e){return e.replace(/[_-]+/g," ").replace(/^\w/,t=>t.toUpperCase())}function jd(){return Object.keys(Oe).map(e=>({value:e,label:Mr(e)}))}var Bd=["--bg","--fg","--accent","--muted","--soft","--border","--shadow","--tab-bg","--tab-fg","--pill-from","--pill-to"];function Fd(e){return Mr(e.replace(/^--/,""))}function Vd(e){return e.alpha<1?e.rgba:e.hex}var Jt=class extends _e{constructor(n){super({id:"tab-settings",label:"Settings"});this.deps=n}async build(n){let o=this.createGrid("12px");o.id="settings",n.appendChild(o);let r;try{r=await Cr()}catch{r={get:()=>qt,set:()=>{},save:()=>{},setUI:()=>{},setCardExpanded:()=>{},toggleCard:()=>{}}}let a=r.get(),i=Object.keys(Oe),s=this.deps.getCurrentTheme?.()??this.deps.initialTheme,u=i.includes(s)?s:i[0]??"dark",d=u,l=zt({text:"Theme",tone:"muted",size:"lg"}),c=Je({options:jd(),value:u,onChange:g=>{d=g,this.deps.applyTheme(g),this.renderThemePickers(g,p,d)}}),p=S("div",{className:"settings-theme-grid"}),m=Le({title:"Style",padding:"lg",expandable:!0,defaultExpanded:!!a.ui.expandedCards.style,onExpandChange:g=>r.setCardExpanded("style",g)},S("div",{className:"kv settings-theme-row"},l.root,c.root),p);this.renderThemePickers(u,p,d);let f=this.createEnvCard({defaultExpanded:!!a.ui.expandedCards.system,onExpandChange:g=>r.setCardExpanded("system",g)});o.appendChild(m),o.appendChild(f)}renderThemePickers(n,o,r){let a=Oe[n];if(o.replaceChildren(),!!a)for(let i of Bd){let s=a[i];if(s==null)continue;let u=Tr({label:Fd(i),value:s,defaultExpanded:!1,onInput:d=>this.updateThemeVar(n,i,d,r),onChange:d=>this.updateThemeVar(n,i,d,r)});o.appendChild(u.root)}}updateThemeVar(n,o,r,a){let i=Oe[n];i&&(i[o]=Vd(r),a===n&&this.deps.applyTheme(n))}createEnvCard(n){let o=n?.defaultExpanded??!1,r=n?.onExpandChange,a=(h,w)=>{let T=S("div",{className:"kv kv--inline-mobile"}),x=S("label",{},h),v=S("div",{className:"ro"});return typeof w=="string"?v.textContent=w:v.append(w),T.append(x,v),T},i=S("code",{},"\u2014"),s=S("span",{},"\u2014"),u=S("span",{},"\u2014"),d=S("span",{},"\u2014"),l=S("span",{},"\u2014"),c=S("span",{},"\u2014"),p=()=>{let h=he();u.textContent=h.surface,d.textContent=h.platform,l.textContent=h.browser??"Unknown",c.textContent=h.os??"Unknown",i.textContent=h.host,s.textContent=h.isInIframe?"Yes":"No"},m=Re({label:"Copy JSON",variant:"primary",size:"sm"});Pr(m,()=>{let h=he();return JSON.stringify(h,null,2)});let f=S("div",{style:"width:100%;display:flex;justify-content:center;"},m),g=Le({title:"System",variant:"soft",padding:"lg",footer:f,expandable:!0,defaultExpanded:o,onExpandChange:r},a("Surface",u),a("Platform",d),a("Browser",l),a("OS",c),a("Host",i),a("Iframe",s)),b=()=>{document.hidden||p()};return document.addEventListener("visibilitychange",b),p(),this.addCleanup(()=>document.removeEventListener("visibilitychange",b)),g}};function yt(e){return e<10?`0${e}`:String(e)}function se(e){let t=/^(\d{1,2}):(\d{2})$/.exec((e||"").trim());if(!t)return 0;let n=Math.max(0,Math.min(23,parseInt(t[1],10)||0)),o=Math.max(0,Math.min(59,parseInt(t[2],10)||0));return n*60+o}function Un(e){let t=Math.max(0,Math.min(1439,e|0)),n=Math.floor(t/60),o=t%60;return`${yt(n)}:${yt(o)}`}function Te(e,t){let n=se(e),o=Math.max(0,Math.min(1439,n)),r=Math.floor(o/t)*t;return Un(r)}function Ud(e){let t=Math.floor(e/60),n=e%60,o=t>=12;return{h12:t%12||12,m:n,pm:o}}function zd(e,t,n){return(e%12+(n?12:0))*60+t}function $d(e){return e.platform==="mobile"||e.os==="ios"||e.os==="android"}function Ir(e={}){let{id:t,start:n="08:00",end:o="23:00",stepMinutes:r=5,disabled:a=!1,allowOvernight:i=!0,labels:s={from:"From",to:"To"},picker:u="auto",format:d="auto",useNativeOn:l,onChange:c}=e,p={start:Te(n,r),end:Te(o,r)},m=S("div",{className:"time-range",id:t});m.classList.add("time-range--stacked");let f=he();if(u==="native"||u==="auto"&&(l?.(f)??$d(f)))return b();return h();function b(){let x=S("div",{className:"time-range-field",role:"group"}),v=S("span",{className:"time-range-label"},s.from||"From"),k=S("input",{className:"input time-range-input",type:"time",step:String(r*60),value:p.start}),L=S("div",{className:"time-range-field",role:"group"}),E=S("span",{className:"time-range-label"},s.to||"To"),A=S("input",{className:"input time-range-input",type:"time",step:String(r*60),value:p.end});x.append(v,k),L.append(E,A),m.append(x,L);function R(){k.value=p.start,A.value=p.end}function M(){c?.(J())}function U(H){let D=H.target,_=D===k,O=Te(D.value||(_?p.start:p.end),r);_?(p.start=O,!i&&se(p.end)<se(p.start)&&(p.end=p.start)):(p.end=O,!i&&se(p.end)<se(p.start)&&(p.start=p.end)),R(),M()}k.addEventListener("change",U),k.addEventListener("blur",U),A.addEventListener("change",U),A.addEventListener("blur",U),a&&N(!0);function J(){return{...p}}function K(H){if(H.start&&(p.start=Te(H.start,r)),H.end&&(p.end=Te(H.end,r)),!i){let D=se(p.start);se(p.end)<D&&(p.end=p.start)}R(),M()}function N(H){k.disabled=H,A.disabled=H,m.classList.toggle("is-disabled",!!H)}function j(){k.removeEventListener("change",U),k.removeEventListener("blur",U),A.removeEventListener("change",U),A.removeEventListener("blur",U),m.replaceChildren()}return{root:m,getValue:J,setValue:K,setDisabled:N,destroy:j}}function h(){let x=S("label",{className:"time-range-field"}),v=S("span",{className:"time-range-label"},s.from||"From"),k=S("label",{className:"time-range-field"}),L=S("span",{className:"time-range-label"},s.to||"To"),E=d==="12h"||d==="auto"&&T(),A=w(p.start,E),R=w(p.end,E);x.append(v,A.container),k.append(L,R.container),m.append(x,k),a&&K(!0),J(),A.onAnyChange(()=>{p.start=A.to24h(r),!i&&se(p.end)<se(p.start)&&(p.end=p.start,R.setFrom24h(p.end)),c?.(M())}),R.onAnyChange(()=>{p.end=R.to24h(r),!i&&se(p.end)<se(p.start)&&(p.start=p.end,A.setFrom24h(p.start)),c?.(M())});function M(){return{...p}}function U(j){if(j.start&&(p.start=Te(j.start,r)),j.end&&(p.end=Te(j.end,r)),!i){let H=se(p.start);se(p.end)<H&&(p.end=p.start)}J(),c?.(M())}function J(){A.setFrom24h(p.start),R.setFrom24h(p.end)}function K(j){A.setDisabled(j),R.setDisabled(j),m.classList.toggle("is-disabled",!!j)}function N(){A.destroy(),R.destroy(),m.replaceChildren()}return{root:m,getValue:M,setValue:U,setDisabled:K,destroy:N}}function w(x,v){let k=S("div",{className:"time-picker"}),L=(I,G=2)=>{I.classList.add("time-picker-compact"),I.style.setProperty("--min-ch",String(G))},E=v?Array.from({length:12},(I,G)=>{let W=G+1;return{value:String(W),label:yt(W)}}):Array.from({length:24},(I,G)=>({value:String(G),label:yt(G)})),A=Je({size:"sm",options:E,placeholder:"HH",onChange:()=>j()});L(A.root,2);let R=Math.max(1,Math.min(30,Math.floor(e.stepMinutes??5))),M=Array.from({length:Math.floor(60/R)},(I,G)=>{let W=G*R;return{value:String(W),label:yt(W)}}),U=Je({size:"sm",options:M,placeholder:"MM",onChange:()=>j()});L(U.root,2);let J=v?Je({size:"sm",options:[{value:"am",label:"AM"},{value:"pm",label:"PM"}],value:"am",onChange:()=>j()}):null;J&&L(J.root,3),k.append(A.root,U.root,...J?[J.root]:[]);let K=null;function N(I){K=I}function j(){K?.()}function H(I){let G=se(I);if(v){let W=Ud(G);A.setValue(String(W.h12),{notify:!1}),U.setValue(String(Math.floor(W.m/R)*R),{notify:!1}),J.setValue(W.pm?"pm":"am",{notify:!1})}else{let W=Math.floor(G/60),V=G%60;A.setValue(String(W),{notify:!1}),U.setValue(String(Math.floor(V/R)*R),{notify:!1})}}function D(I){let G=parseInt(U.getValue()||"0",10)||0;if(v){let W=parseInt(A.getValue()||"12",10)||12,V=(J?.getValue()||"am")==="pm",oe=zd(W,G,V);return Te(Un(oe),I)}else{let V=(parseInt(A.getValue()||"0",10)||0)*60+G;return Te(Un(V),I)}}function _(I){A.setDisabled(I),U.setDisabled(I),J?.setDisabled(I),k.classList.toggle("is-disabled",!!I)}function O(){k.replaceChildren()}return{container:k,onAnyChange:N,setFrom24h:H,to24h:D,setDisabled:_,destroy:O}}function T(){try{let v=new Intl.DateTimeFormat(void 0,{hour:"numeric"}).format(new Date(2020,1,1,13));return/AM|PM|am|pm/.test(v)}catch{return!1}}}function Lr(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Kd(e){let t=Lr(e);t=t.replace(/\/\*[\s\S]*?\*\//g,r=>`<span class="tok tok-comm">${r}</span>`),t=t.replace(/(^|\s)(\/\/.*)$/gm,(r,a,i)=>`${a}<span class="tok tok-comm">${i}</span>`),t=t.replace(/`[^`\\]*(?:\\.[^`\\]*)*`/g,r=>`<span class="tok tok-str">${r}</span>`),t=t.replace(/'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/g,r=>`<span class="tok tok-str">${r}</span>`),t=t.replace(/\b(?:0[xX][0-9a-fA-F]+|0[bB][01]+|0[oO][0-7]+|\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?(?:[eE][+-]?\d+)?)\b/g,r=>`<span class="tok tok-num">${r}</span>`);let n=["break","case","catch","class","const","continue","debugger","default","delete","do","else","export","extends","finally","for","function","if","import","in","instanceof","let","new","return","super","switch","this","throw","try","typeof","var","void","while","with","yield","await","enum","implements","interface","package","private","protected","public","static","as","from","of"],o=new RegExp(`\\b(?:${n.join("|")})\\b`,"g");return t=t.replace(o,r=>`<span class="tok tok-kw">${r}</span>`),t=t.replace(/\b(?:true|false|null|undefined|NaN|Infinity)\b/g,r=>`<span class="tok tok-lit">${r}</span>`),t}function Er(e){if(!e)return new Date().toLocaleTimeString();let t=e instanceof Date?e:new Date(e);if(isNaN(t.getTime()))return String(e);let n=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0"),r=String(t.getSeconds()).padStart(2,"0");return`${n}:${o}:${r}`}function Rr(e={}){let{id:t,className:n,height:o,maxLines:r=500,wrap:a=!1,mode:i="plain",showTimestamps:s=!0,autoScroll:u=!0}=e,d=S("div",{className:"log",id:t});n&&d.classList.add(...n.split(" ").filter(Boolean)),a&&d.classList.add("log--wrap");let l=S("div",{className:"log-viewport"}),c=S("div",{className:"log-lines"});l.appendChild(c),d.appendChild(l),o!=null&&(d.style.blockSize=typeof o=="number"?`${o}px`:String(o));let p=i,m=r,f=new Map;function g(N){return p==="js"?Kd(N):Lr(N)}function b(N){return N?f.get(N)?.body??c:c}function h(N){let j=typeof N=="string"?{text:N}:N||{text:""},H=b(j.groupKey);if(j.key){let O=Array.from(H.querySelectorAll(`.log-line[data-key="${j.key}"]`)).pop();if(O){j.level&&(O.classList.remove("log-level--debug","log-level--info","log-level--warn","log-level--error"),O.classList.add(`log-level--${j.level}`));let I=O.querySelector(".log-time");s&&I&&(I.textContent=Er(j.time));let G=O.querySelector(".log-text");G&&(G.innerHTML=g(j.text)),u&&L();return}}let D=document.createElement("div");if(D.className="log-line",j.level&&D.classList.add(`log-level--${j.level}`),j.key&&(D.dataset.key=j.key),s){let O=document.createElement("span");O.className="log-time",O.textContent=Er(j.time),D.appendChild(O)}let _=document.createElement("span");_.className="log-text",_.innerHTML=g(j.text),D.appendChild(_),H.appendChild(D),R(),u&&L()}function w(N){for(let j of N)h(j)}function T(){c.replaceChildren(),f.clear()}function x(N){p=N,L()}function v(N){d.classList.toggle("log--wrap",!!N),L()}function k(N){m=Math.max(1,Math.floor(N||1))}function L(){requestAnimationFrame(()=>{l.scrollTop=l.scrollHeight})}function E(){let N=0;for(let j=0;j<c.children.length;j+=1){let H=c.children[j];(H.classList.contains("log-line")||H.classList.contains("log-group"))&&(N+=1)}return N}function A(){let N=c.firstElementChild;if(!N)return!1;if(N.classList.contains("log-group")){let j=N.dataset.groupKey;j&&f.delete(j)}return N.remove(),!0}function R(){let N=E();for(;N>m&&A();)N--}function M(N,j){let H=j?.key||`g-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,6)}`;if(f.has(H))return H;let D=document.createElement("div");D.className="log-group",D.dataset.groupKey=H;let _=document.createElement("div");_.className="log-group-header",_.textContent=N;let O=document.createElement("div");O.className="log-group-body",D.append(_,O),c.appendChild(D),f.set(H,{root:D,header:_,body:O});let I=G=>{D.classList.toggle("is-collapsed",!!G)};return j?.collapsed&&I(!0),_.addEventListener("click",()=>I(!D.classList.contains("is-collapsed"))),u&&L(),H}function U(N){f.get(N)}function J(N,j){let H=f.get(N);H&&(j==null?H.root.classList.toggle("is-collapsed"):H.root.classList.toggle("is-collapsed",!!j))}let K=d;return K.add=h,K.addMany=w,K.clear=T,K.setMode=x,K.setWrap=v,K.setMaxLines=k,K.scrollToEnd=L,K.beginGroup=M,K.endGroup=U,K.toggleGroup=J,K}var le={nativeCtor:null,captured:[],latestOpen:null},Or=Symbol.for("ariesmod.ws.capture.wrapped"),Dr=Symbol.for("ariesmod.ws.capture.native"),Hr=1;function zn(e){return!!e&&e.readyState===Hr}function qd(){if(zn(le.latestOpen))return le.latestOpen;for(let e=le.captured.length-1;e>=0;e--){let t=le.captured[e];if(zn(t))return t}return null}function Jd(e,t){le.captured.push(e),le.captured.length>25&&le.captured.splice(0,le.captured.length-25);let n=()=>{le.latestOpen=e,t&&console.log("[WS] captured socket opened",e.url)};e.addEventListener("open",n),e.addEventListener("close",()=>{le.latestOpen===e&&(le.latestOpen=null),t&&console.log("[WS] captured socket closed",e.url)}),e.readyState===Hr&&n()}function Gr(e=P,t={}){let n=!!t.debug,o=e?.WebSocket;if(typeof o!="function")return()=>{};if(o[Or])return le.nativeCtor=o[Dr]??le.nativeCtor??null,()=>{};let r=o;le.nativeCtor=r;function a(i,s){let u=s!==void 0?new r(i,s):new r(i);try{Jd(u,n)}catch{}return u}try{a.prototype=r.prototype}catch{}try{Object.setPrototypeOf(a,r)}catch{}try{a.CONNECTING=r.CONNECTING,a.OPEN=r.OPEN,a.CLOSING=r.CLOSING,a.CLOSED=r.CLOSED}catch{}a[Or]=!0,a[Dr]=r;try{e.WebSocket=a,n&&console.log("[WS] WebSocket capture installed")}catch{return()=>{}}return()=>{try{e.WebSocket===a&&(e.WebSocket=r)}catch{}}}function Yd(e=P){let t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function xt(e=P){let t=qd();if(t)return{ws:t,source:"captured"};let n=Yd(e);return n?{ws:n,source:"roomConnection"}:{ws:null,source:null}}function Yt(e,t={}){let n=t.pageWindow??P,o=t.intervalMs??500,r=!!t.debug,a=null,i=null,s=()=>{let d=xt(n);(d.ws!==a||d.source!==i)&&(a=d.ws,i=d.source,r&&console.log("[WS] best socket changed:",d.source,d.ws),e(d))};s();let u=setInterval(s,o);return()=>clearInterval(u)}function Xd(e){if(typeof e=="string")return e;try{return JSON.stringify(e)}catch{return null}}function Qd(e,t=P){let n=t?.MagicCircle_RoomConnection;if(n&&typeof n.sendMessage=="function")try{return Array.isArray(e)?n.sendMessage(...e):n.sendMessage(e),{ok:!0}}catch(a){return{ok:!1,reason:"error",error:a}}let{ws:o}=xt(t);if(!o)return{ok:!1,reason:"no-ws"};if(!zn(o))return{ok:!1,reason:"not-open"};let r=Xd(e);if(r==null)return{ok:!1,reason:"error",error:new Error("Cannot stringify message")};try{return o.send(r),{ok:!0}}catch(a){return{ok:!1,reason:"error",error:a}}}function _r(e,t={},n=P){return Qd({type:e,...t},n)}var we={Welcome:"Welcome",PartialState:"PartialState",ServerErrorMessage:"ServerErrorMessage",Config:"Config",InappropriateContentRejected:"InappropriateContentRejected",Emote:"Emote",CurrencyTransaction:"CurrencyTransaction",Pong:"Pong"},C={Chat:"Chat",Emote:"Emote",Wish:"Wish",KickPlayer:"KickPlayer",SetPlayerData:"SetPlayerData",UsurpHost:"UsurpHost",Dev:"Dev",SetSelectedGame:"SetSelectedGame",VoteForGame:"VoteForGame",RequestGame:"RequestGame",RestartGame:"RestartGame",Ping:"Ping",PlayerPosition:"PlayerPosition",Teleport:"Teleport",CheckWeatherStatus:"CheckWeatherStatus",MoveInventoryItem:"MoveInventoryItem",DropObject:"DropObject",PickupObject:"PickupObject",ToggleFavoriteItem:"ToggleFavoriteItem",PutItemInStorage:"PutItemInStorage",RetrieveItemFromStorage:"RetrieveItemFromStorage",MoveStorageItem:"MoveStorageItem",LogItems:"LogItems",PlantSeed:"PlantSeed",WaterPlant:"WaterPlant",HarvestCrop:"HarvestCrop",SellAllCrops:"SellAllCrops",PurchaseSeed:"PurchaseSeed",PurchaseEgg:"PurchaseEgg",PurchaseTool:"PurchaseTool",PurchaseDecor:"PurchaseDecor",PlantEgg:"PlantEgg",HatchEgg:"HatchEgg",PlantGardenPlant:"PlantGardenPlant",PotPlant:"PotPlant",MutationPotion:"MutationPotion",PickupDecor:"PickupDecor",PlaceDecor:"PlaceDecor",RemoveGardenObject:"RemoveGardenObject",PlacePet:"PlacePet",FeedPet:"FeedPet",PetPositions:"PetPositions",SwapPet:"SwapPet",StorePet:"StorePet",NamePet:"NamePet",SellPet:"SellPet",ReportSpeakingStart:"ReportSpeakingStart"};var uh=new Set(Object.values(we)),dh=new Set(Object.values(C));function $(e,t={},n=P){return _r(e,t,n)}function Xt(e,t=P){return $(C.Chat,{scopePath:["Room"],message:e},t)}function Nr(e,t=P){return $(C.Emote,{scopePath:["Room"],emoteType:e},t)}function Wr(e,t=P){return $(C.Wish,{wish:e},t)}function jr(e,t=P){return $(C.KickPlayer,{scopePath:["Room"],playerId:e},t)}function Br(e,t=P){return $(C.SetPlayerData,{scopePath:["Room"],data:e},t)}function Fr(e=P){return $(C.UsurpHost,{},e)}function Vr(e=P){return $(C.ReportSpeakingStart,{},e)}function Ur(e,t=P){return $(C.SetSelectedGame,{scopePath:["Room"],gameId:e},t)}function zr(e,t=P){return $(C.VoteForGame,{scopePath:["Room"],gameId:e},t)}function $r(e,t=P){return $(C.RequestGame,{scopePath:["Room"],gameId:e},t)}function Kr(e=P){return $(C.RestartGame,{scopePath:["Room"]},e)}function qr(e,t=P){return $(C.Ping,{id:e},t)}function $n(e,t,n=P){return $(C.PlayerPosition,{x:e,y:t},n)}var Jr=$n;function Yr(e,t,n=P){return $(C.Teleport,{x:e,y:t},n)}function Xr(e=P){return $(C.CheckWeatherStatus,{},e)}function Qr(e,t,n=P){return $(C.MoveInventoryItem,{fromIndex:e,toIndex:t},n)}function Zr(e,t=P){return $(C.DropObject,{slotIndex:e},t)}function ea(e,t=P){return $(C.PickupObject,{objectId:e},t)}function ta(e,t,n=P){return $(C.ToggleFavoriteItem,{itemId:e,favorite:t},n)}function na(e,t=P){return $(C.PutItemInStorage,{itemId:e},t)}function oa(e,t=P){return $(C.RetrieveItemFromStorage,{itemId:e},t)}function ra(e,t,n=P){return $(C.MoveStorageItem,{fromIndex:e,toIndex:t},n)}function aa(e=P){return $(C.LogItems,{},e)}function ia(e,t,n,o=P){return $(C.PlantSeed,{seedId:e,x:t,y:n},o)}function sa(e,t=P){return $(C.WaterPlant,{plantId:e},t)}function la(e,t=P){return $(C.HarvestCrop,{cropId:e},t)}function ca(e=P){return $(C.SellAllCrops,{},e)}function ua(e,t=P){return $(C.PurchaseDecor,{decorId:e},t)}function da(e,t=P){return $(C.PurchaseEgg,{eggId:e},t)}function pa(e,t=P){return $(C.PurchaseTool,{toolId:e},t)}function ma(e,t=P){return $(C.PurchaseSeed,{seedId:e},t)}function fa(e,t,n,o=P){return $(C.PlantEgg,{eggId:e,x:t,y:n},o)}function ga(e,t=P){return $(C.HatchEgg,{eggId:e},t)}function ba(e,t,n,o=P){return $(C.PlantGardenPlant,{plantId:e,x:t,y:n},o)}function ha(e,t,n=P){return $(C.PotPlant,{plantId:e,potId:t},n)}function ya(e,t,n=P){return $(C.MutationPotion,{potionId:e,targetId:t},n)}function xa(e,t=P){return $(C.PickupDecor,{decorInstanceId:e},t)}function va(e,t,n,o=P){return $(C.PlaceDecor,{decorId:e,x:t,y:n},o)}function wa(e,t=P){return $(C.RemoveGardenObject,{objectId:e},t)}function Sa(e,t,n,o=P){return $(C.PlacePet,{petId:e,x:t,y:n},o)}function ka(e,t,n=P){return $(C.FeedPet,{petId:e,foodItemId:t},n)}function Ta(e,t=P){return $(C.PetPositions,{positions:e},t)}function Aa(e,t,n=P){return $(C.SwapPet,{petIdA:e,petIdB:t},n)}function Pa(e,t=P){return $(C.StorePet,{petId:e},t)}function Ca(e,t,n=P){return $(C.NamePet,{petId:e,name:t},n)}function Ma(e,t=P){return $(C.SellPet,{petId:e},t)}var We={timeRange:{start:"09:00",end:"18:00"},logSettings:{mode:"js",wrap:!1}};async function Ea(){return mt("tab-test",{version:1,defaults:We,sanitize:e=>({timeRange:{start:e.timeRange?.start||We.timeRange.start,end:e.timeRange?.end||We.timeRange.end},logSettings:{mode:e.logSettings?.mode||We.logSettings.mode,wrap:e.logSettings?.wrap??We.logSettings.wrap}})})}var Qt=class extends _e{constructor(){super({id:"tab-test",label:"Test"})}async build(t){let n=this.createContainer("test-section");t.appendChild(n);let o;try{o=await Ea()}catch{o={get:()=>We,set:()=>{},update:()=>{},save:()=>{}}}let r=o.get(),a=zt({text:"Plage horaire",hint:"Heures actives du mode 'Plage horaire'.",icon:"\u23F0"}),i=Ir({start:r.timeRange.start,end:r.timeRange.end,stepMinutes:5,allowOvernight:!0,picker:"auto",format:"12h",onChange:b=>{o.update({timeRange:{start:b.start,end:b.end}})}}),s=S("div",null,a.root,i.root),u=Rr({height:220,mode:r.logSettings.mode,maxLines:1e3});r.logSettings.wrap&&u.setWrap(!0),u.add({level:"info",text:"Log initialise"}),u.add({level:"debug",text:"const x = 42; // demo"}),u.add({level:"warn",text:"Requete lente: fetch('/api') > 1200ms"}),u.add({level:"error",text:"new Error('Boom')"});let d=Re({label:"Appliquer",variant:"primary",onClick:()=>{let b=i.getValue();u.add({level:"info",text:`[Apply] ${b.start} -> ${b.end}`})}}),l=Le({title:"Parametres - Plage horaire",subtitle:"Choisis la fenetre d'activite",variant:"soft",padding:"lg",footer:Wn(d)},s),c=Re({label:"Clear",onClick:()=>Xt("test")}),p=Re({label:r.logSettings.wrap?"Unwrap":"Wrap",onClick:()=>{let b=!u.classList.contains("log--wrap");u.setWrap(b),p.setLabel(b?"Unwrap":"Wrap"),o.update({logSettings:{...o.get().logSettings,wrap:b}})}}),m=Re({label:`Mode: ${r.logSettings.mode}`,onClick:()=>{let h=o.get().logSettings.mode==="js"?"plain":"js";u.setMode(h),m.setLabel(`Mode: ${h}`),o.update({logSettings:{...o.get().logSettings,mode:h}})}}),f=Re({label:"Add line",onClick:()=>u.add({level:"debug",text:"function tick(){ return Date.now(); } // sample"})}),g=Le({title:"Logs",variant:"default",padding:"lg"},u,Wn(c,p,m,f));n.appendChild(l),n.appendChild(g)}};function Kn(e){return[new Jt(e),new Qt]}function qn(e){let{shadow:t,initialOpen:n}=e,o=S("div",{className:"gemini-panel",id:"panel",ariaHidden:String(!n)}),r=S("div",{className:"gemini-tabbar"}),a=S("div",{className:"gemini-content",id:"content"}),i=S("div",{className:"gemini-resizer",title:"Resize"}),s=S("button",{className:"gemini-close",title:"Fermer",ariaLabel:"Fermer"},"\u2715");o.append(r,a,i);let u=S("div",{className:"gemini-wrapper"},o);return t.append(u),{panel:o,tabbar:r,content:a,resizer:i,closeButton:s,wrapper:u}}function Jn(e){let{resizer:t,host:n,panel:o,shadow:r,onWidthChange:a,initialWidth:i,minWidth:s,maxWidth:u}=e,d=s,l=u;function c(){let v=he(),k=Math.round(P.visualViewport?.width??P.innerWidth??0);if(v.platform==="mobile"||v.os==="ios"||v.os==="android"){let L=getComputedStyle(r.host),E=parseFloat(L.getPropertyValue("--inset-l"))||0,A=parseFloat(L.getPropertyValue("--inset-r"))||0,R=Math.max(280,k-Math.round(E+A)),M=Math.min(420,Math.max(300,Math.floor(k*.66))),U=R;d=Math.min(M,R),l=U}else d=s,l=u;return{min:d,max:l}}function p(v){return Math.max(d,Math.min(l,Number(v)||i))}function m(v){let k=p(v);n.style.setProperty("--w",`${k}px`),a(k)}c();let f=he(),g=!(f.platform==="mobile"||f.os==="ios"||f.os==="android"),b=!1,h=v=>{if(!b)return;v.preventDefault();let k=Math.round(P.innerWidth-v.clientX);m(k)},w=()=>{b&&(b=!1,document.body.style.cursor="",P.removeEventListener("mousemove",h),P.removeEventListener("mouseup",w))},T=v=>{g&&(v.preventDefault(),b=!0,document.body.style.cursor="ew-resize",P.addEventListener("mousemove",h),P.addEventListener("mouseup",w))};t.addEventListener("mousedown",T);function x(){t.removeEventListener("mousedown",T),P.removeEventListener("mousemove",h),P.removeEventListener("mouseup",w)}return{calculateResponsiveBounds:c,constrainWidthToLimits:p,setHudWidth:m,destroy:x}}function Yn(e){let{panel:t,onToggle:n,onClose:o,toggleCombo:r=u=>u.ctrlKey&&u.shiftKey&&u.key.toLowerCase()==="u",closeOnEscape:a=!0}=e;function i(u){let d=t.classList.contains("open");if(a&&u.key==="Escape"&&d){o();return}r(u)&&(u.preventDefault(),u.stopPropagation(),n())}document.addEventListener("keydown",i,{capture:!0});function s(){document.removeEventListener("keydown",i,{capture:!0})}return{destroy:s}}var La=`
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
`;var Xn=`
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
`;var Qn=`
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
`;var Zn=`
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
`;function ee(e,t,n){if(e.querySelector(`style[data-style-id="${n}"]`))return;let o=document.createElement("style");o.setAttribute("data-style-id",n),o.textContent=t,e.appendChild(o)}var Ra=`
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
  
`;var Oa=`
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
`;var Da=`
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
`;var Ha=`
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
`;var Ga=`
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
`;var _a=`
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
`;var Na=`
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
`;var Wa=`
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
`;var ja=`
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
`;var Ba=`
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
`;var Fa=`
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
`;var Va=`
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
`;var Ua=`
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
`;var za=`
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
`;var $a=`
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
`;var Ka=`
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
`;var qa=`
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
`;var Zd={all:"initial",position:"fixed",top:"0",right:"0",zIndex:"2147483647",pointerEvents:"auto",fontFamily:'system-ui, -apple-system, "Segoe UI", Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',fontSize:"13px",lineHeight:"1.35"};function ep(e="gemini-root"){let t=document.createElement("div");t.id=e,Object.assign(t.style,Zd),(document.body||document.documentElement).appendChild(t);let n=t.attachShadow({mode:"open"});return{host:t,shadow:n}}function eo(e){let{hostId:t="gemini-hud-root",initialWidth:n,initialOpen:o,onWidthChange:r,onOpenChange:a,themes:i,initialTheme:s,onThemeChange:u,buildSections:d,initialTab:l,onTabChange:c,toggleCombo:p=_=>_.ctrlKey&&_.shiftKey&&_.key.toLowerCase()==="u",closeOnEscape:m=!0,minWidth:f=420,maxWidth:g=720}=e,{host:b,shadow:h}=ep(t);ee(h,Xn,"variables"),ee(h,Qn,"primitives"),ee(h,Zn,"utilities"),ee(h,La,"hud"),ee(h,Ra,"card"),ee(h,Oa,"badge"),ee(h,Da,"button"),ee(h,Ha,"input"),ee(h,Ga,"label"),ee(h,_a,"navTabs"),ee(h,Na,"searchBar"),ee(h,Wa,"select"),ee(h,ja,"switch"),ee(h,Ba,"table"),ee(h,Fa,"timeRangePicker"),ee(h,Va,"tooltip"),ee(h,Ua,"slider"),ee(h,za,"reorderableList"),ee(h,$a,"colorPicker"),ee(h,Ka,"log"),ee(h,qa,"settings");let{panel:w,tabbar:T,content:x,resizer:v,closeButton:k,wrapper:L}=qn({shadow:h,initialOpen:o});function E(_){w.dispatchEvent(new CustomEvent("gemini:hud-open-change",{detail:{isOpen:_},bubbles:!0})),a?.(_)}function A(_){let O=w.classList.contains("open");w.classList.toggle("open",_),w.setAttribute("aria-hidden",_?"false":"true"),_!==O&&E(_)}A(o),k.addEventListener("click",_=>{_.preventDefault(),_.stopPropagation(),A(!1)});let R=Vn({host:b,themes:i,initialTheme:s,onThemeChange:u}),M=Jn({resizer:v,host:b,panel:w,shadow:h,onWidthChange:r||(()=>{}),initialWidth:n,minWidth:f,maxWidth:g});M.setHudWidth(n);let U=d({applyTheme:R.applyTheme,initialTheme:s,getCurrentTheme:R.getCurrentTheme,setHUDWidth:M.setHudWidth,setHUDOpen:A}),J=new dt(U,x,{applyTheme:R.applyTheme,getCurrentTheme:R.getCurrentTheme}),K=U.map(_=>({id:_.id,label:_.label})),N=gr(K,l||K[0]?.id||"",_=>{J.activate(_),c?.(_)});N.root.style.flex="1 1 auto",N.root.style.minWidth="0",T.append(N.root,k),J.activate(l||K[0]?.id||"");let j=Yn({panel:w,onToggle:()=>A(!w.classList.contains("open")),onClose:()=>A(!1),toggleCombo:p,closeOnEscape:m}),H=()=>{N.recalc();let _=parseInt(getComputedStyle(b).getPropertyValue("--w"))||n;M.calculateResponsiveBounds(),M.setHudWidth(_)};P.addEventListener("resize",H);function D(){j.destroy(),M.destroy(),P.removeEventListener("resize",H)}return{host:b,shadow:h,wrapper:L,panel:w,content:x,setOpen:A,setWidth:M.setHudWidth,sections:U,manager:J,nav:N,destroy:D}}var Xe={isOpen:"gemini.hud.isOpen",width:"gemini.hud.width",theme:"gemini.hud.theme",activeTab:"gemini.hud.activeTab"},vt={isOpen:!1,width:480,theme:"dark",activeTab:"tab-settings"};function to(){return{isOpen:Ee(Xe.isOpen,vt.isOpen),width:Ee(Xe.width,vt.width),theme:Ee(Xe.theme,vt.theme),activeTab:Ee(Xe.activeTab,vt.activeTab)}}function Qe(e,t){pt(Xe[e],t)}var tp="https://i.imgur.com/IMkhMur.png",np="Stats";function Zt(e){let t=e.iconUrl||tp,n=e.ariaLabel||"Open MGH",o=null,r=null,a=null,i=!1,s=null,u=null,d=["Chat","Leaderboard","Stats","Open Activity Log"],l=T=>{try{return typeof CSS<"u"&&CSS&&typeof CSS.escape=="function"?CSS.escape(T):T.replace(/"/g,'\\"')}catch{return T}};function c(){let T=document.querySelector(d.map(v=>`button[aria-label="${l(v)}"]`).join(","));if(!T)return null;let x=T.parentElement;for(;x&&x!==document.body;){if(d.reduce((k,L)=>k+x.querySelectorAll(`button[aria-label="${l(L)}"]`).length,0)>=2)return x;x=x.parentElement}return null}function p(T){return T}function m(T){let x=Array.from(T.querySelectorAll("button[aria-label]"));if(!x.length)return{refBtn:null,refWrapper:null};let v=x.filter(U=>U.dataset.mghBtn!=="true"&&(U.getAttribute("aria-label")||"")!==(e.ariaLabel||"Open MGH")),k=v.length?v:x,L=k.find(U=>(U.getAttribute("aria-label")||"").toLowerCase()===np.toLowerCase())||null,E=k.length>=2?k.length-2:k.length-1,A=L||k[E],R=A.parentElement,M=R&&R.parentElement===T&&R.tagName==="DIV"?R:null;return{refBtn:A,refWrapper:M}}function f(T,x,v){let k=T.cloneNode(!1);k.type="button",k.setAttribute("aria-label",x),k.title=x,k.dataset.mghBtn="true",k.style.pointerEvents="auto",k.removeAttribute("id");let L=document.createElement("img");return L.src=v,L.alt="MGH",L.style.pointerEvents="none",L.style.userSelect="none",L.style.width="76%",L.style.height="76%",L.style.objectFit="contain",L.style.display="block",L.style.margin="auto",k.appendChild(L),k.addEventListener("click",E=>{E.preventDefault(),E.stopPropagation();try{e.onClick?.()}catch{}}),k}function g(){if(i)return!1;i=!0;let T=!1;try{let x=c();if(!x)return!1;s!==x&&(s=x);let{refBtn:v,refWrapper:k}=m(x);if(!v)return!1;r=x.querySelector('div[data-mgh-wrapper="true"]'),!r&&k&&(r=k.cloneNode(!1),r.dataset.mghWrapper="true",r.removeAttribute("id"),T=!0);let L=r?.querySelector('button[data-mgh-btn="true"]')||null;o||(o=L),o||(o=f(v,n,t),r?r.appendChild(o):o.parentElement!==x&&x.appendChild(o),T=!0),r&&r.parentElement!==x&&(x.appendChild(r),T=!0);let E=x;if(E&&E!==u){try{w.disconnect()}catch{}u=E,w.observe(u,{childList:!0,subtree:!0})}return T}finally{i=!1}}g();let b=document.getElementById("App")||document.body,h=null,w=new MutationObserver(T=>{let x=T.every(k=>{let L=Array.from(k.addedNodes||[]),E=Array.from(k.removedNodes||[]),A=L.concat(E);if(A.length===0){let R=k.target;return r&&(R===r||r.contains(R))||o&&(R===o||o.contains(R))}return A.every(R=>!!(!(R instanceof HTMLElement)||r&&(R===r||r.contains(R))||o&&(R===o||o.contains(R))))}),v=T.some(k=>Array.from(k.removedNodes||[]).some(L=>L instanceof HTMLElement?!!(r&&(L===r||r.contains(L))||o&&(L===o||o.contains(L))):!1));x&&!v||h===null&&(h=window.setTimeout(()=>{if(h=null,g()&&r){let L=r.parentElement;L&&L.lastElementChild!==r&&L.appendChild(r)}},150))});return w.observe(b,{childList:!0,subtree:!0}),a=()=>w.disconnect(),()=>{try{a?.()}catch{}try{r?.remove()}catch{}}}var ip={},Xa=[];function op(){return Xa.slice()}function rp(e){Xa.push(e)}function Qa(e){try{return JSON.parse(e)}catch{return}}function Ja(e){if(typeof e=="string"){let t=Qa(e);return t!==void 0?t:e}return e}function Za(e){if(e!=null){if(typeof e=="string"){let t=Qa(e);return t!==void 0?Za(t):e}if(Array.isArray(e)&&typeof e[0]=="string")return e[0];if(typeof e=="object"){let t=e;return t.type??t.Type??t.kind??t.messageType}}}function ap(e){let t=e?.MagicCircle_RoomConnection?.currentWebSocket;return t&&typeof t=="object"?t:null}function B(e,t,n){let o=typeof t=="boolean"?t:!0,r=typeof t=="function"?t:n,a=(i,s)=>{if(Za(i)!==e)return;let d=r(i,s);return d&&typeof d=="object"&&"kind"in d?d:typeof d=="boolean"?d?void 0:{kind:"drop"}:o?void 0:{kind:"drop"}};return rp(a),a}var wt=new WeakSet,Ya=new WeakMap;function ei(e){let t=e.pageWindow,n=!!e.debug,o=e.middlewares&&e.middlewares.length?e.middlewares:op();if(!o.length)return()=>{};let r=p=>({ws:p,pageWindow:t,debug:n}),a=(p,m)=>{let f=p;for(let g of o){let b=g(f,r(m));if(b){if(b.kind==="drop")return{kind:"drop"};b.kind==="replace"&&(f=b.message)}}return f!==p?{kind:"replace",message:f}:void 0},i=null,s=null,u=null,d=()=>{let p=t?.MagicCircle_RoomConnection,m=p?.sendMessage;if(!p||typeof m!="function")return!1;if(wt.has(m))return!0;let f=m.bind(p);function g(...b){let h=b.length===1?b[0]:b,w=Ja(h),T=a(w,ap(t));if(T?.kind==="drop"){n&&console.log("[WS] drop outgoing (RoomConnection.sendMessage)",w);return}if(T?.kind==="replace"){let x=T.message;return b.length>1&&Array.isArray(x)?(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",w,"=>",x),f(...x)):(n&&console.log("[WS] replace outgoing (RoomConnection.sendMessage)",w,"=>",x),f(x))}return f(...b)}wt.add(g),Ya.set(g,m);try{p.sendMessage=g,wt.add(p.sendMessage),n&&console.log("[WS] outgoing patched via MagicCircle_RoomConnection.sendMessage")}catch{return!1}return i=()=>{try{p.sendMessage===g&&(p.sendMessage=m)}catch{}},!0};(()=>{let p=t?.WebSocket?.prototype,m=p?.send;if(typeof m!="function"||wt.has(m))return;function f(g){let b=Ja(g),h=a(b,this);if(h?.kind==="drop"){n&&console.log("[WS] drop outgoing (ws.send)",b);return}if(h?.kind==="replace"){let w=h.message,T=typeof w=="string"||w instanceof ArrayBuffer||w instanceof Blob?w:JSON.stringify(w);return n&&console.log("[WS] replace outgoing (ws.send)",b,"=>",w),m.call(this,T)}return m.call(this,g)}wt.add(f),Ya.set(f,m);try{p.send=f,n&&console.log("[WS] outgoing patched via WebSocket.prototype.send")}catch{return}s=()=>{try{p.send===f&&(p.send=m)}catch{}}})();let c=e.waitForRoomConnectionMs??4e3;if(!d()&&c>0){let p=Date.now();u=setInterval(()=>{if(d()){clearInterval(u),u=null;return}Date.now()-p>c&&(clearInterval(u),u=null,n&&console.log("[WS] RoomConnection not found, only ws.send is patched"))},250)}return()=>{if(u){try{clearInterval(u)}catch{}u=null}if(i){try{i()}catch{}i=null}if(s){try{s()}catch{}s=null}}}(function(){try{let t=ip,n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();var up={},ni=[];function sp(){return ni.slice()}function ti(e){ni.push(e)}function lp(e){if(e!=null){if(typeof e=="object"){let t=e;if(typeof t.type=="string")return t.type;if(typeof t.Type=="string")return t.Type;if(typeof t.kind=="string")return t.kind;if(typeof t.messageType=="string")return t.messageType}if(Array.isArray(e)&&typeof e[0]=="string")return e[0]}}function cp(e){if(typeof e=="string")try{return JSON.parse(e)}catch{return e}return e}var no=Symbol.for("ariesmod.ws.handlers.patched");function te(e,t){if(typeof e=="string"){let r=e,a={match:i=>i.kind==="message"&&i.type===r,handle:t};return ti(a),a}let n=e,o={match:r=>r.kind==="close"&&r.code===n,handle:t};return ti(o),o}function oi(e,t=sp(),n={}){let o=n.pageWindow??window,r=!!n.debug;if(e[no])return()=>{};e[no]=!0;let a={ws:e,pageWindow:o,debug:r},i=c=>{for(let p of t)try{if(!p.match(c))continue;if(p.handle(c,a)===!0)return}catch(m){r&&console.error("[WS] handler error",m,c)}},s=c=>{let p=cp(c.data),m=lp(p);i({kind:"message",raw:c.data,data:p,type:m})},u=c=>{i({kind:"close",code:c.code,reason:c.reason,wasClean:c.wasClean,event:c})},d=c=>i({kind:"open",event:c}),l=c=>i({kind:"error",event:c});return e.addEventListener("message",s),e.addEventListener("close",u),e.addEventListener("open",d),e.addEventListener("error",l),()=>{try{e.removeEventListener("message",s)}catch{}try{e.removeEventListener("close",u)}catch{}try{e.removeEventListener("open",d)}catch{}try{e.removeEventListener("error",l)}catch{}try{delete e[no]}catch{}}}(function(){try{let t=up,n=t.glob?.("./**/*.ts",{eager:!0})??t.glob?.("./**/*.js",{eager:!0});if(!n)return}catch{}})();te(4800,(e,t)=>{t.debug&&console.log("[WS][Close] Auth failure",e.code,e.reason)});te(4300,(e,t)=>{t.debug&&console.log("[WS][Close] Superseded",e.code,e.reason)});te(4400,(e,t)=>{t.debug&&console.log("[WS][Close] Heartbeat expired",e.code,e.reason)});te(4500,(e,t)=>{t.debug&&console.log("[WS][Close] Player kicked",e.code,e.reason)});te(4200,(e,t)=>{t.debug&&console.log("[WS][Close] Player left voluntarily",e.code,e.reason)});te(4100,(e,t)=>{t.debug&&console.log("[WS][Close] Reconnect initiated",e.code,e.reason)});te(4310,(e,t)=>{t.debug&&console.log("[WS][Close] Server disposed",e.code,e.reason)});te(4250,(e,t)=>{t.debug&&console.log("[WS][Close] User session superseded",e.code,e.reason)});te(4710,(e,t)=>{t.debug&&console.log("[WS][Close] Version expired",e.code,e.reason)});te(4700,(e,t)=>{t.debug&&console.log("[WS][Close] Version mismatch",e.code,e.reason)});te(we.Config,(e,t)=>{t.debug&&console.log("[WS][STC] Config",e.data)});te(we.CurrencyTransaction,(e,t)=>{t.debug&&console.log("[WS][STC] CurrencyTransaction",e.data)});te(we.Emote,(e,t)=>{t.debug&&console.log("[WS][STC] Emote",e.data)});te(we.InappropriateContentRejected,(e,t)=>{t.debug&&console.log("[WS][STC] InappropriateContentRejected",e.data)});te(we.PartialState,(e,t)=>{t.debug&&console.log("[WS][STC] PartialState",e.data)});te(we.Pong,(e,t)=>{t.debug&&console.log("[WS][STC] Pong",e.data)});te(we.ServerErrorMessage,(e,t)=>{t.debug&&console.log("[WS][STC] ServerErrorMessage",e.data)});te(we.Welcome,(e,t)=>{t.debug&&console.log("[WS][STC] Welcome",e.data)});B(C.PlantSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantSeed"),!!1));B(C.WaterPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] WaterPlant"),!!1));B(C.HarvestCrop,(e,t)=>(t.debug&&console.log("[MW][Garden] HarvestCrop"),!!1));B(C.SellAllCrops,(e,t)=>(t.debug&&console.log("[MW][Garden] SellAllCrops"),!!1));B(C.PurchaseSeed,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseSeed"),!!1));B(C.PurchaseEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseEgg"),!!1));B(C.PurchaseTool,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseTool"),!!1));B(C.PurchaseDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PurchaseDecor"),!!1));B(C.PlantEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantEgg"),!!1));B(C.HatchEgg,(e,t)=>(t.debug&&console.log("[MW][Garden] HatchEgg"),!!1));B(C.PlantGardenPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PlantGardenPlant"),!!1));B(C.PotPlant,(e,t)=>(t.debug&&console.log("[MW][Garden] PotPlant"),!!1));B(C.MutationPotion,(e,t)=>(t.debug&&console.log("[MW][Garden] MutationPotion"),!!1));B(C.PickupDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PickupDecor"),!!1));B(C.PlaceDecor,(e,t)=>(t.debug&&console.log("[MW][Garden] PlaceDecor"),!!1));B(C.RemoveGardenObject,(e,t)=>(t.debug&&console.log("[MW][Garden] RemoveGardenObject"),!!1));B(C.MoveInventoryItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveInventoryItem"),!!1));B(C.DropObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] DropObject"),!!1));B(C.PickupObject,(e,t)=>(t.debug&&console.log("[MW][Inventory] PickupObject"),!!1));B(C.ToggleFavoriteItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] ToggleFavoriteItem"),!!1));B(C.PutItemInStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] PutItemInStorage"),!!1));B(C.RetrieveItemFromStorage,(e,t)=>(t.debug&&console.log("[MW][Inventory] RetrieveItemFromStorage"),!!1));B(C.MoveStorageItem,(e,t)=>(t.debug&&console.log("[MW][Inventory] MoveStorageItem"),!!1));B(C.LogItems,(e,t)=>(t.debug&&console.log("[MW][Inventory] LogItems"),!!1));B(C.PlacePet,(e,t)=>(t.debug&&console.log("[MW][Pets] PlacePet"),!!1));B(C.FeedPet,(e,t)=>(t.debug&&console.log("[MW][Pets] FeedPet"),!!1));B(C.PetPositions,(e,t)=>(t.debug&&console.log("[MW][Pets] PetPositions"),!!1));B(C.SwapPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SwapPet"),!!1));B(C.StorePet,(e,t)=>(t.debug&&console.log("[MW][Pets] StorePet"),!!1));B(C.NamePet,(e,t)=>(t.debug&&console.log("[MW][Pets] NamePet"),!!1));B(C.SellPet,(e,t)=>(t.debug&&console.log("[MW][Pets] SellPet"),!!1));console.log("[WS] TESTTEST");B(C.SetSelectedGame,(e,t)=>(t.debug&&console.log("[MW][Session] SetSelectedGame"),!!1));B(C.VoteForGame,(e,t)=>(t.debug&&console.log("[MW][Session] VoteForGame"),!!1));B(C.RequestGame,(e,t)=>(t.debug&&console.log("[MW][Session] RequestGame"),!!1));B(C.RestartGame,(e,t)=>(t.debug&&console.log("[MW][Session] RestartGame"),!!1));B(C.Ping,(e,t)=>(t.debug&&console.log("[MW][Session] Ping"),!!1));B(C.PlayerPosition,(e,t)=>(t.debug&&console.log("[MW][Session] PlayerPosition"),!!1));B(C.Teleport,(e,t)=>(t.debug&&console.log("[MW][Session] Teleport"),!!1));B(C.CheckWeatherStatus,(e,t)=>(t.debug&&console.log("[MW][Session] CheckWeatherStatus"),!!1));B(C.Chat,(e,t)=>(t.debug&&console.log("[MW][Social] Chat"),!!1));B(C.Dev,(e,t)=>(t.debug&&console.log("[MW][Social] Dev"),!!1));B(C.Emote,(e,t)=>(t.debug&&console.log("[MW][Social] Emote"),!!1));B(C.Wish,(e,t)=>(t.debug&&console.log("[MW][Social] Wish"),!!1));B(C.KickPlayer,(e,t)=>(t.debug&&console.log("[MW][Social] KickPlayer"),!!1));B(C.ReportSpeakingStart,(e,t)=>(t.debug&&console.log("[MW][Voice] ReportSpeakingStart"),!!1));B(C.SetPlayerData,(e,t)=>(t.debug&&console.log("[MW][Social] SetPlayerData"),!!1));B(C.UsurpHost,(e,t)=>(t.debug&&console.log("[MW][Social] UsurpHost"),!!1));function dp(e={}){let t=e.pageWindow??P,n=e.pollMs??500,o=!!e.debug,r=[];r.push(Gr(t,{debug:o})),r.push(ei({pageWindow:t,middlewares:e.middlewares,debug:o}));let a=null,i=s=>{if(a){try{a()}catch{}a=null}s&&(a=oi(s,e.handlers,{debug:o,pageWindow:t}))};return i(xt(t).ws),r.push(Yt(s=>i(s.ws),{intervalMs:n,debug:o,pageWindow:t})),{getWs:()=>xt(t).ws,dispose:()=>{for(let s=r.length-1;s>=0;s--)try{r[s]()}catch{}if(a){try{a()}catch{}a=null}}}}var en=null;function ri(e={}){return en||(en=dp(e),en)}Pe();var St=null;function pp(){return P?.document??(typeof document<"u"?document:null)}function ro(e){if(St!==null)return;let t=e??pp();if(!t)return;let n=t.scripts;for(let o=0;o<n.length;o++){let a=n.item(o)?.src;if(!a)continue;let i=a.match(/\/(?:r\/\d+\/)?version\/([^/]+)/);if(i?.[1]){St=i[1];return}}}function mp(){return ro(),St}async function fp(e=15e3){let t=performance.now();for(;performance.now()-t<e;){if(ro(),St)return St;await Ae(50)}throw new Error("MGVersion timeout (gameVersion not found)")}var kt={init:ro,get:mp,wait:fp};var ii=P?.location?.origin||"https://magicgarden.gg";function si(){return typeof GM_xmlhttpRequest=="function"}function li(e,t="text"){return new Promise((n,o)=>{GM_xmlhttpRequest({method:"GET",url:e,responseType:t,onload:r=>r.status>=200&&r.status<300?n(r):o(new Error(`HTTP ${r.status} for ${e}`)),onerror:()=>o(new Error(`Network error for ${e}`)),ontimeout:()=>o(new Error(`Timeout for ${e}`))})})}async function Ze(e){if(si())return JSON.parse((await li(e,"text")).responseText);let t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.json()}async function nn(e){if(si())return(await li(e,"blob")).response;let t=await fetch(e);if(!t.ok)throw new Error(`HTTP ${t.status} for ${e}`);return t.blob()}function ci(e){return new Promise((t,n)=>{let o=URL.createObjectURL(e),r=P?.Image||Image,a=new r;a.decoding="async",a.onload=()=>{URL.revokeObjectURL(o),t(a)},a.onerror=()=>{URL.revokeObjectURL(o),n(new Error("Image decode failed"))},a.src=o})}var ue=(e,t)=>e.replace(/\/?$/,"/")+String(t||"").replace(/^\//,""),gp=e=>e.lastIndexOf("/")>=0?e.slice(0,e.lastIndexOf("/")+1):"",ao=(e,t)=>String(t||"").startsWith("/")?String(t).slice(1):gp(e)+String(t||"");var on=null,rn=null;async function ui(){return rn||on||(on=(async()=>{let e=await kt.wait(15e3);return rn=`${ii}/version/${e}/assets/`,rn})(),on)}async function bp(e){let t=await ui();return ue(t,e)}var ye={base:ui,url:bp};var io=new Map;async function hp(e){let t=e||await ye.base();if(io.has(t))return io.get(t);let n=Ze(ue(t,"manifest.json"));return io.set(t,n),n}function yp(e,t){return e?.bundles?.find(n=>n?.name===t)||null}function xp(e){let t=new Set;for(let n of e?.assets||[])for(let o of n?.src||[])typeof o=="string"&&o.endsWith(".json")&&o!=="manifest.json"&&t.add(o);return Array.from(t)}var me={load:hp,getBundle:yp,listJsonFromBundle:xp};Pe();Pe();Pe();var di=Function.prototype.bind,X={_bindPatched:!1,engine:null,tos:null,app:null,renderer:null,ticker:null,stage:null},pi,mi,fi,vp=new Promise(e=>{pi=e}),wp=new Promise(e=>{mi=e}),Sp=new Promise(e=>{fi=e});function kp(e){return!!(e&&typeof e=="object"&&typeof e.start=="function"&&typeof e.destroy=="function"&&e.app&&e.app.stage&&e.app.renderer&&e.systems&&typeof e.systems.values=="function")}function Tp(e){try{for(let t of e.systems.values()){let n=t?.system;if(n?.name==="tileObject")return n}}catch{}return null}function Ap(e){X.engine=e,X.tos=Tp(e)||null,X.app=e.app||null,X.renderer=e.app?.renderer||null,X.ticker=e.app?.ticker||null,X.stage=e.app?.stage||null;try{pi(e)}catch{}try{X.app&&mi(X.app)}catch{}try{X.renderer&&fi(X.renderer)}catch{}}function so(){return X.engine?!0:(X._bindPatched||(X._bindPatched=!0,Function.prototype.bind=function(e,...t){let n=di.call(this,e,...t);try{!X.engine&&kp(e)&&(Function.prototype.bind=di,X._bindPatched=!1,Ap(e))}catch{}return n}),!1)}so();async function Pp(e=15e3){let t=performance.now();for(;performance.now()-t<e;){if(X.engine)return!0;so(),await Ae(50)}throw new Error("MGPixiHooks: engine capture timeout")}async function Cp(e=15e3){return X.engine||await Pp(e),!0}function Mp(){return X.engine&&X.app?{ok:!0,engine:X.engine,tos:X.tos,app:X.app}:(so(),{ok:!1,engine:X.engine,tos:X.tos,app:X.app,note:"Not captured. Wait for room, or reload."})}var ae={engineReady:vp,appReady:wp,rendererReady:Sp,engine:()=>X.engine,tos:()=>X.tos,app:()=>X.app,renderer:()=>X.renderer,ticker:()=>X.ticker,stage:()=>X.stage,PIXI:()=>P.PIXI||null,init:Cp,hook:Mp,ready:()=>!!X.engine};function Tt(e){let t=String(e||"").trim();return t?t.startsWith("sprite/")||t.startsWith("sprites/")?t:t.includes("/")?`sprite/${t}`:t:""}function et(e,t){let n=String(e||"").trim().replace(/^sprites?\//,"").replace(/^\/+|\/+$/g,""),o=String(t||"").trim();return o.includes("/")||!n?Tt(o):`sprite/${n}/${o}`}function tt(e,t,n,o){let r=et(e,t);if(n.has(r)||o.has(r))return r;let a=String(t||"").trim();if(n.has(a)||o.has(a))return a;let i=Tt(a);return n.has(i)||o.has(i)?i:r}function Ip(e,t,n=25e3){let o=[e],r=new Set,a=0;for(;o.length&&a++<n;){let i=o.pop();if(!i||r.has(i))continue;if(r.add(i),t(i))return i;let s=i.children;if(Array.isArray(s))for(let u=s.length-1;u>=0;u--)o.push(s[u])}return null}function Ep(e){let t=P.PIXI;if(t?.Texture&&t?.Sprite&&t?.Container&&t?.Rectangle)return{Container:t.Container,Sprite:t.Sprite,Texture:t.Texture,Rectangle:t.Rectangle,AnimatedSprite:t.AnimatedSprite||null};let n=e?.stage,o=Ip(n,r=>r?.texture?.frame&&r?.constructor&&r?.texture?.constructor&&r?.texture?.frame?.constructor);if(!o)throw new Error("No Sprite found yet (constructors).");return{Container:n.constructor,Sprite:o.constructor,Texture:o.texture.constructor,Rectangle:o.texture.frame.constructor,AnimatedSprite:t?.AnimatedSprite||null}}async function gi(e,t=15e3){let{sleep:n}=await Promise.resolve().then(()=>(Pe(),ai)),o=performance.now();for(;performance.now()-o<t;)try{return Ep(e)}catch{await n(50)}throw new Error("Constructors timeout")}var De=(...e)=>{try{console.log("[MGSprite]",...e)}catch{}};function Lp(e){return e&&typeof e=="object"&&e.frames&&e.meta&&typeof e.meta.image=="string"}function lo(e,t,n,o,r){return new e(t,n,o,r)}function Rp(e,t,n,o,r,a,i){let s;try{s=new e({source:t.source,frame:n,orig:o,trim:r||void 0,rotate:a||0})}catch{s=new e(t.baseTexture||t,n,o,r||void 0,a||0)}if(i)if(s.defaultAnchor?.set)try{s.defaultAnchor.set(i.x,i.y)}catch{}else s.defaultAnchor?(s.defaultAnchor.x=i.x,s.defaultAnchor.y=i.y):s.defaultAnchor={x:i.x,y:i.y};try{s.updateUvs?.()}catch{}return s}function Op(e,t,n,o){let{Texture:r,Rectangle:a}=o;for(let[i,s]of Object.entries(e.frames)){let u=s.frame,d=!!s.rotated,l=d?2:0,c=d?u.h:u.w,p=d?u.w:u.h,m=lo(a,u.x,u.y,c,p),f=s.sourceSize||{w:u.w,h:u.h},g=lo(a,0,0,f.w,f.h),b=null;if(s.trimmed&&s.spriteSourceSize){let h=s.spriteSourceSize;b=lo(a,h.x,h.y,h.w,h.h)}n.set(i,Rp(r,t,m,g,b,l,s.anchor||null))}}function Dp(e,t,n){if(!(!e.animations||typeof e.animations!="object"))for(let[o,r]of Object.entries(e.animations)){if(!Array.isArray(r))continue;let a=r.map(i=>t.get(i)).filter(Boolean);a.length>=2&&n.set(o,a)}}function Hp(e,t){let n=(o,r)=>{let a=String(o||"").trim(),i=String(r||"").trim();!a||!i||(t.has(a)||t.set(a,new Set),t.get(a).add(i))};for(let o of Object.keys(e.frames||{})){let r=/^sprite\/([^/]+)\/(.+)$/.exec(o);r&&n(r[1],r[2])}}async function bi(e,t){let n=await me.load(e),o=me.getBundle(n,"default");if(!o)throw new Error("No default bundle in manifest");let r=me.listJsonFromBundle(o),a=new Set,i=new Map,s=new Map,u=new Map;async function d(l){if(a.has(l))return;a.add(l);let c=await Ze(ue(e,l));if(!Lp(c))return;let p=c.meta?.related_multi_packs;if(Array.isArray(p))for(let b of p)await d(ao(l,b));let m=ao(l,c.meta.image),f=await ci(await nn(ue(e,m))),g=t.Texture.from(f);Op(c,g,i,t),Dp(c,i,s),Hp(c,u)}for(let l of r)await d(l);return{textures:i,animations:s,categoryIndex:u}}var hi={enabled:!0,maxEntries:1200,maxCost:5e3,srcCanvasMax:450};function yi(){return{lru:new Map,cost:0,srcCanvas:new Map}}function co(e,t){return`${t.sig}::${e}`}function xi(e){return e?e.isAnim?e.frames?.length||0:e.tex?1:0:0}function Gp(e,t,n){e.lru.delete(t),e.lru.set(t,n)}function _p(e,t){if(t.enabled)for(;e.lru.size>t.maxEntries||e.cost>t.maxCost;){let n=e.lru.keys().next().value;if(n===void 0)break;let o=e.lru.get(n);e.lru.delete(n),e.cost=Math.max(0,e.cost-xi(o??null))}}function uo(e,t){let n=e.lru.get(t);return n?(Gp(e,t,n),n):null}function po(e,t,n,o){e.lru.set(t,n),e.cost+=xi(n),_p(e,o)}function vi(e){e.lru.clear(),e.cost=0,e.srcCanvas.clear()}function wi(e,t){return e.srcCanvas.get(t)??null}function Si(e,t,n,o){if(e.srcCanvas.set(t,n),e.srcCanvas.size>o.srcCanvasMax){let r=e.srcCanvas.keys().next().value;r!==void 0&&e.srcCanvas.delete(r)}}function Np(){return{ready:!1,app:null,renderer:null,ctors:null,baseUrl:null,textures:new Map,animations:new Map,live:new Set,defaultParent:null,overlay:null,categoryIndex:null}}var an=null,re=Np(),Wp=yi(),jp={...hi};function ie(){return re}function nt(){return Wp}function At(){return jp}function mo(){return re.ready}async function ki(){return re.ready?!0:an||(an=(async()=>{let e=performance.now();De("init start");let t=await tn(ae.appReady,15e3,"PIXI app");De("app ready");let n=await tn(ae.rendererReady,15e3,"PIXI renderer");De("renderer ready"),re.app=t,re.renderer=n||t?.renderer||null,re.ctors=await gi(t),De("constructors resolved"),re.baseUrl=await ye.base(),De("base url",re.baseUrl);let{textures:o,animations:r,categoryIndex:a}=await bi(re.baseUrl,re.ctors);return re.textures=o,re.animations=r,re.categoryIndex=a,De("atlases loaded","textures",re.textures.size,"animations",re.animations.size,"categories",re.categoryIndex?.size??0),re.ready=!0,De("ready in",Math.round(performance.now()-e),"ms"),!0})(),an)}var je={Gold:{overlayTall:null,tallIconOverride:null},Rainbow:{overlayTall:null,tallIconOverride:null,angle:130,angleTall:0},Wet:{overlayTall:"sprite/mutation-overlay/WetTallPlant",tallIconOverride:"sprite/mutation/Puddle"},Chilled:{overlayTall:"sprite/mutation-overlay/ChilledTallPlant",tallIconOverride:null},Frozen:{overlayTall:"sprite/mutation-overlay/FrozenTallPlant",tallIconOverride:null},Dawnlit:{overlayTall:null,tallIconOverride:null},Ambershine:{overlayTall:null,tallIconOverride:null},Dawncharged:{overlayTall:null,tallIconOverride:null},Ambercharged:{overlayTall:null,tallIconOverride:null}},Ai=Object.keys(je),Bp=["Gold","Rainbow","Wet","Chilled","Frozen","Ambershine","Dawnlit","Dawncharged","Ambercharged"],Ti=new Map(Bp.map((e,t)=>[e,t]));function sn(e){return[...new Set(e.filter(Boolean))].sort((n,o)=>(Ti.get(n)??1/0)-(Ti.get(o)??1/0))}var Fp=["Wet","Chilled","Frozen"];var Pi=new Set(["Dawnlit","Ambershine","Dawncharged","Ambercharged"]),Ci={Banana:.6,Carrot:.6,Sunflower:.5,Starweaver:.5,FavaBean:.25,BurrosTail:.2},Mi={Pepper:.5,Banana:.6},Ii=256,Ei=.5,Li=2;function fo(e){if(!e.length)return{muts:[],overlayMuts:[],selectedMuts:[],sig:""};let t=sn(e),n=Vp(e),o=Up(e);return{muts:n,overlayMuts:o,selectedMuts:t,sig:`${t.join(",")}|${n.join(",")}|${o.join(",")}`}}function Vp(e){let t=e.filter((r,a,i)=>je[r]&&i.indexOf(r)===a);if(!t.length)return[];if(t.includes("Gold"))return["Gold"];if(t.includes("Rainbow"))return["Rainbow"];let n=["Ambershine","Dawnlit","Dawncharged","Ambercharged"];return t.some(r=>n.includes(r))?sn(t.filter(r=>!Fp.includes(r))):sn(t)}function Up(e){let t=e.filter((n,o,r)=>je[n]?.overlayTall&&r.indexOf(n)===o);return sn(t)}function ln(e,t){return e.map(n=>({name:n,meta:je[n],overlayTall:je[n]?.overlayTall??null,isTall:t}))}var zp={Gold:{op:"source-atop",colors:["rgb(235,200,0)"],a:.7},Rainbow:{op:"color",colors:["#FF1744","#FF9100","#FFEA00","#00E676","#2979FF","#D500F9"],ang:130,angTall:0,masked:!0},Wet:{op:"source-atop",colors:["rgb(50,180,200)"],a:.25},Chilled:{op:"source-atop",colors:["rgb(100,160,210)"],a:.45},Frozen:{op:"source-atop",colors:["rgb(100,130,220)"],a:.5},Dawnlit:{op:"source-atop",colors:["rgb(209,70,231)"],a:.5},Ambershine:{op:"source-atop",colors:["rgb(190,100,40)"],a:.5},Dawncharged:{op:"source-atop",colors:["rgb(140,80,200)"],a:.5},Ambercharged:{op:"source-atop",colors:["rgb(170,60,25)"],a:.5}};var cn=(()=>{try{let t=document.createElement("canvas").getContext("2d");if(!t)return new Set;let n=["color","hue","saturation","luminosity","overlay","screen","lighter","source-atop"],o=new Set;for(let r of n)t.globalCompositeOperation=r,t.globalCompositeOperation===r&&o.add(r);return o}catch{return new Set}})();function $p(e){return cn.has(e)?e:cn.has("overlay")?"overlay":cn.has("screen")?"screen":cn.has("lighter")?"lighter":"source-atop"}function Kp(e,t,n,o,r=!1){let a=(o-90)*Math.PI/180,i=t/2,s=n/2;if(!r){let c=Math.min(t,n)/2;return e.createLinearGradient(i-Math.cos(a)*c,s-Math.sin(a)*c,i+Math.cos(a)*c,s+Math.sin(a)*c)}let u=Math.cos(a),d=Math.sin(a),l=Math.abs(u)*t/2+Math.abs(d)*n/2;return e.createLinearGradient(i-u*l,s-d*l,i+u*l,s+d*l)}function Ri(e,t,n,o,r=!1){let a=o.colors?.length?o.colors:["#fff"],i=o.ang!=null?Kp(e,t,n,o.ang,r):e.createLinearGradient(0,0,0,n);a.length===1?(i.addColorStop(0,a[0]),i.addColorStop(1,a[0])):a.forEach((s,u)=>i.addColorStop(u/(a.length-1),s)),e.fillStyle=i,e.fillRect(0,0,t,n)}function Oi(e,t,n,o){let r=zp[n];if(!r)return;let a={...r};n==="Rainbow"&&o&&a.angTall!=null&&(a.ang=a.angTall);let i=n==="Rainbow"&&o,s=t.width,u=t.height;e.save();let d=a.masked?$p(a.op):"source-in";if(e.globalCompositeOperation=d,a.a!=null&&(e.globalAlpha=a.a),a.masked){let l=document.createElement("canvas");l.width=s,l.height=u;let c=l.getContext("2d");c.imageSmoothingEnabled=!1,Ri(c,s,u,a,i),c.globalCompositeOperation="destination-in",c.drawImage(t,0,0),e.drawImage(l,0,0)}else Ri(e,s,u,a,i);e.restore()}function Di(e){return/tallplant/i.test(e)}function un(e){let t=String(e||"").split("/");return t[t.length-1]||""}function Hi(e){switch(e){case"Ambershine":return["Ambershine","Amberlit"];case"Dawncharged":return["Dawncharged","Dawnbound"];case"Ambercharged":return["Ambercharged","Amberbound"];default:return[e]}}function qp(e,t){let n=String(e||"").toLowerCase();for(let o of t.keys()){let r=/sprite\/mutation-overlay\/([A-Za-z0-9]+)TallPlant/i.exec(String(o));if(!r||!r[1])continue;if(r[1].toLowerCase()===n){let i=t.get(o);if(i)return{tex:i,key:o}}}return null}function Gi(e,t,n,o){if(!t)return null;let r=un(e),a=Hi(t);for(let i of a){let s=[`sprite/mutation/${i}${r}`,`sprite/mutation/${i}-${r}`,`sprite/mutation/${i}_${r}`,`sprite/mutation/${i}/${r}`,`sprite/mutation/${i}`];for(let u of s){let d=n.get(u);if(d)return{tex:d,key:u}}if(o){let u=`sprite/mutation-overlay/${i}TallPlant`,d=n.get(u);if(d)return{tex:d,key:u};let l=`sprite/mutation-overlay/${i}`,c=n.get(l);if(c)return{tex:c,key:l};let p=qp(t,n);if(p)return p}}return null}function _i(e,t,n,o){if(!t)return null;let r=je[t];if(n&&r?.tallIconOverride){let s=o.get(r.tallIconOverride);if(s)return s}let a=un(e),i=Hi(t);for(let s of i){let u=[`sprite/mutation/${s}Icon`,`sprite/mutation/${s}`,`sprite/mutation/${s}${a}`,`sprite/mutation/${s}-${a}`,`sprite/mutation/${s}_${a}`,`sprite/mutation/${s}/${a}`];for(let d of u){let l=o.get(d);if(l)return l}if(n){let d=`sprite/mutation-overlay/${s}TallPlantIcon`,l=o.get(d);if(l)return l;let c=`sprite/mutation-overlay/${s}TallPlant`,p=o.get(c);if(p)return p}}return null}function Ni(e,t,n){let o=e?.orig?.width??e?.frame?.width??e?.width??1,r=e?.orig?.height??e?.frame?.height??e?.height??1,a=e?.defaultAnchor?.x??0,i=e?.defaultAnchor?.y??0,s=Mi[t]??a,u=r>o*1.5,d=Ci[t]??(u?i:.4),l={x:(s-a)*o,y:(d-i)*r},c=Math.min(o,r),p=Math.min(1.5,c/Ii),m=Ei*p;return n&&(m*=Li),{width:o,height:r,anchorX:a,anchorY:i,offset:l,iconScale:m}}function go(e,t,n,o,r){let a=wi(o,e);if(a)return a;let i=null;try{if(t?.extract?.canvas){let s=new n.Sprite(e);i=t.extract.canvas(s),s.destroy?.({children:!0,texture:!1,baseTexture:!1})}}catch{}if(!i){let s=e?.frame||e?._frame,u=e?.orig||e?._orig,d=e?.trim||e?._trim,l=e?.rotate||e?._rotate||0,c=e?.baseTexture?.resource?.source||e?.baseTexture?.resource||e?.source?.resource?.source||e?.source?.resource||e?._source?.resource?.source||null;if(!s||!c)throw new Error("textureToCanvas fail");i=document.createElement("canvas");let p=Math.max(1,(u?.width??s.width)|0),m=Math.max(1,(u?.height??s.height)|0),f=d?.x??0,g=d?.y??0;i.width=p,i.height=m;let b=i.getContext("2d");b.imageSmoothingEnabled=!1,l===!0||l===2||l===8?(b.save(),b.translate(f+s.height/2,g+s.width/2),b.rotate(-Math.PI/2),b.drawImage(c,s.x,s.y,s.width,s.height,-s.width/2,-s.height/2,s.width,s.height),b.restore()):b.drawImage(c,s.x,s.y,s.width,s.height,f,g,s.width,s.height)}return Si(o,e,i,r),i}function Jp(e,t,n,o,r,a,i,s){let{w:u,h:d,aX:l,aY:c,basePos:p}=t,m=[];for(let f of n){let g=new o.Sprite(e);g.anchor?.set?.(l,c),g.position.set(p.x,p.y),g.zIndex=1;let b=document.createElement("canvas");b.width=u,b.height=d;let h=b.getContext("2d");h.imageSmoothingEnabled=!1,h.save(),h.translate(u*l,d*c),h.drawImage(go(e,r,o,a,i),-u*l,-d*c),h.restore(),Oi(h,b,f.name,f.isTall);let w=o.Texture.from(b);s.push(w),g.texture=w,m.push(g)}return m}function Yp(e,t,n,o,r,a,i,s,u,d){let{aX:l,basePos:c}=t,p=[];for(let m of n){let f=m.overlayTall&&o.get(m.overlayTall)&&{tex:o.get(m.overlayTall),key:m.overlayTall}||Gi(e,m.name,o,!0);if(!f?.tex)continue;let g=go(f.tex,a,r,i,s);if(!g)continue;let b=g.width,h={x:0,y:0},w={x:c.x-l*b,y:0},T=document.createElement("canvas");T.width=b,T.height=g.height;let x=T.getContext("2d");if(!x)continue;x.imageSmoothingEnabled=!1,x.drawImage(g,0,0),x.globalCompositeOperation="destination-in",x.drawImage(u,-w.x,-w.y);let v=r.Texture.from(T);d.push(v);let k=new r.Sprite(v);k.anchor?.set?.(h.x,h.y),k.position.set(w.x,w.y),k.scale.set(1),k.alpha=1,k.zIndex=3,p.push(k)}return p}function Xp(e,t,n,o,r,a){let{basePos:i}=t,s=[];for(let u of n){if(u.name==="Gold"||u.name==="Rainbow")continue;let d=_i(e,u.name,u.isTall,o);if(!d)continue;let l=new r.Sprite(d),c=d?.defaultAnchor?.x??.5,p=d?.defaultAnchor?.y??.5;l.anchor?.set?.(c,p),l.position.set(i.x+a.offset.x,i.y+a.offset.y),l.scale.set(a.iconScale),u.isTall&&(l.zIndex=-1),Pi.has(u.name)&&(l.zIndex=10),l.zIndex||(l.zIndex=2),s.push(l)}return s}function bo(e,t,n,o){try{if(!e||!o.renderer||!o.ctors?.Container||!o.ctors?.Sprite||!o.ctors?.Texture)return null;let{Container:r,Sprite:a,Texture:i}=o.ctors,s=e?.orig?.width??e?.frame?.width??e?.width??1,u=e?.orig?.height??e?.frame?.height??e?.height??1,d=e?.defaultAnchor?.x??.5,l=e?.defaultAnchor?.y??.5,c={x:s*d,y:u*l},p=go(e,o.renderer,o.ctors,o.cacheState,o.cacheConfig),m=new r;m.sortableChildren=!0;let f=new a(e);f.anchor?.set?.(d,l),f.position.set(c.x,c.y),f.zIndex=0,m.addChild(f);let g=Di(t),b=ln(n.muts,g),h=ln(n.overlayMuts,g),w=ln(n.selectedMuts,g),T=[],x={w:s,h:u,aX:d,aY:l,basePos:c},v=un(t),k=Ni(e,v,g);Jp(e,x,b,o.ctors,o.renderer,o.cacheState,o.cacheConfig,T).forEach(M=>m.addChild(M)),g&&Yp(t,x,h,o.textures,o.ctors,o.renderer,o.cacheState,o.cacheConfig,p,T).forEach(U=>m.addChild(U)),Xp(t,x,w,o.textures,o.ctors,k).forEach(M=>m.addChild(M));let A=null;if(typeof o.renderer.generateTexture=="function"?A=o.renderer.generateTexture(m,{resolution:1}):o.renderer.textureGenerator?.generateTexture&&(A=o.renderer.textureGenerator.generateTexture({target:m,resolution:1})),!A)throw new Error("no render texture");let R=A instanceof i?A:i.from(o.renderer.extract.canvas(A));A&&A!==R&&A.destroy?.(!0),m.destroy({children:!0,texture:!1,baseTexture:!1});try{R.__mg_gen=!0,R.label=`${t}|${n.sig}`}catch{}return R}catch{return null}}function Wi(e,t,n,o){if(!e||e.length<2)return null;let r=[];for(let a of e){let i=bo(a,t,n,o);i&&r.push(i)}return r.length>=2?r:null}function Qp(e){if(e.overlay)return e.overlay;let t=new e.ctors.Container;t.sortableChildren=!0,t.zIndex=99999999;try{e.app.stage.sortableChildren=!0}catch{}return e.app.stage.addChild(t),e.overlay=t,t}function Zp(e){let t=e.defaultParent;if(!t)return null;try{return typeof t=="function"?t():t}catch{return null}}function ji(e,t,n,o,r,a){if(!n.length)return t;let i=fo(n);if(!i.sig)return t;let s=co(e,i),u=uo(r,s);if(u?.tex)return u.tex;let d=bo(t,e,i,{renderer:o.renderer,ctors:o.ctors,textures:o.textures,cacheState:r,cacheConfig:a});return d?(po(r,s,{isAnim:!1,tex:d},a),d):t}function Bi(e,t,n,o,r,a){if(!n.length)return t;let i=fo(n);if(!i.sig)return t;let s=co(e,i),u=uo(r,s);if(u?.isAnim&&u.frames?.length)return u.frames;let d=Wi(t,e,i,{renderer:o.renderer,ctors:o.ctors,textures:o.textures,cacheState:r,cacheConfig:a});return d?(po(r,s,{isAnim:!0,frames:d},a),d):t}function ho(e,t,n,o,r,a={}){if(!e.ready)throw new Error("MGSprite not ready yet");let i=tt(o,r,e.textures,e.animations),s=a.mutations||[],u=a.parent||Zp(e)||Qp(e),d=e.renderer?.width||e.renderer?.view?.width||innerWidth,l=e.renderer?.height||e.renderer?.view?.height||innerHeight,c=a.center?d/2:a.x??d/2,p=a.center?l/2:a.y??l/2,m,f=e.animations.get(i);if(f&&f.length>=2){let h=Bi(i,f,s,e,t,n),w=e.ctors.AnimatedSprite;if(w)m=new w(h),m.animationSpeed=a.fps?a.fps/60:a.speed??.15,m.loop=a.loop??!0,m.play();else{let T=new e.ctors.Sprite(h[0]),v=1e3/Math.max(1,a.fps||8),k=0,L=0,E=A=>{let R=e.app.ticker?.deltaMS??A*16.666666666666668;if(k+=R,k<v)return;let M=k/v|0;k%=v,L=(L+M)%h.length,T.texture=h[L]};T.__mgTick=E,e.app.ticker?.add?.(E),m=T}}else{let h=e.textures.get(i);if(!h)throw new Error(`Unknown sprite/anim key: ${i}`);let w=ji(i,h,s,e,t,n);m=new e.ctors.Sprite(w)}let g=a.anchorX??m.texture?.defaultAnchor?.x??.5,b=a.anchorY??m.texture?.defaultAnchor?.y??.5;return m.anchor?.set?.(g,b),m.position.set(c,p),m.scale.set(a.scale??1),m.alpha=a.alpha??1,m.rotation=a.rotation??0,m.zIndex=a.zIndex??999999,u.addChild(m),e.live.add(m),m.__mgDestroy=()=>{try{m.__mgTick&&e.app.ticker?.remove?.(m.__mgTick)}catch{}try{m.destroy?.({children:!0,texture:!1,baseTexture:!1})}catch{try{m.destroy?.()}catch{}}e.live.delete(m)},m}function em(e,t){let n=e.renderer;if(n?.extract?.canvas)return n.extract.canvas(t);if(n?.plugins?.extract?.canvas)return n.plugins.extract.canvas(t);throw new Error("No extract.canvas available on renderer")}function yo(e,t,n,o,r,a={}){if(!e.ready)throw new Error("MGSprite not ready yet");let i=tt(o,r,e.textures,e.animations),s=a.mutations||[],u=e.animations.get(i),d=Math.max(0,(a.frameIndex??0)|0),l;if(u?.length){let w=Bi(i,u,s,e,t,n);l=w[d%w.length]}else{let w=e.textures.get(i);if(!w)throw new Error(`Unknown sprite/anim key: ${i}`);l=ji(i,w,s,e,t,n)}let c=new e.ctors.Sprite(l),p=a.anchorX??c.texture?.defaultAnchor?.x??.5,m=a.anchorY??c.texture?.defaultAnchor?.y??.5;c.anchor?.set?.(p,m),c.scale.set(a.scale??1);let f=a.pad??2,g=new e.ctors.Container;g.addChild(c);try{g.updateTransform?.()}catch{}let b=c.getBounds?.(!0)||{x:0,y:0,width:c.width,height:c.height};c.position.set(-b.x+f,-b.y+f);let h=em(e,g);try{g.destroy?.({children:!0})}catch{}return h}function Fi(e){for(let t of Array.from(e.live))t.__mgDestroy?.()}function Vi(e,t){return e.defaultParent=t,!0}function Ui(e,t){return e.defaultParent=t,!0}function ot(){if(!mo())throw new Error("MGSprite not ready yet")}function tm(e,t,n){return typeof t=="string"?ho(ie(),nt(),At(),e,t,n||{}):ho(ie(),nt(),At(),null,e,t||{})}function nm(e,t,n){return typeof t=="string"?yo(ie(),nt(),At(),e,t,n||{}):yo(ie(),nt(),At(),null,e,t||{})}function om(){Fi(ie())}function rm(e){return Vi(ie(),e)}function am(e){return Ui(ie(),e)}function im(e,t){let n=ie(),o=typeof t=="string"?tt(e,t,n.textures,n.animations):tt(null,e,n.textures,n.animations);return n.textures.has(o)||n.animations.has(o)}function sm(){ot();let e=ie().categoryIndex;return e?Array.from(e.keys()).sort((t,n)=>t.localeCompare(n)):[]}function lm(e){ot();let t=String(e||"").trim();if(!t)return[];let n=ie().categoryIndex;return n?Array.from(n.get(t)?.values()||[]).sort((o,r)=>o.localeCompare(r)):[]}function cm(e,t){ot();let n=String(e||"").trim(),o=String(t||"").trim();if(!n||!o)return!1;let r=ie().categoryIndex;if(!r)return!1;let a=n.toLowerCase(),i=o.toLowerCase();for(let[s,u]of r.entries())if(s.toLowerCase()===a){for(let d of u.values())if(d.toLowerCase()===i)return!0}return!1}function um(e){ot();let t=ie().categoryIndex;if(!t)return[];let n=String(e||"").trim().toLowerCase(),o=[];for(let[r,a]of t.entries())for(let i of a.values()){let s=et(r,i);(!n||s.toLowerCase().startsWith(n))&&o.push(s)}return o.sort((r,a)=>r.localeCompare(a))}function dm(e){ot();let t=String(e||"").trim();if(!t)return null;let n=Tt(t),o=/^sprite\/([^/]+)\/(.+)$/.exec(n);if(!o)return null;let r=o[1],a=o[2],i=ie().categoryIndex,s=r.toLowerCase(),u=a.toLowerCase(),d=r,l=a;if(i){let c=Array.from(i.keys()).find(f=>f.toLowerCase()===s);if(!c)return null;d=c;let p=i.get(c);if(!p)return null;let m=Array.from(p.values()).find(f=>f.toLowerCase()===u);if(!m)return null;l=m}return{category:d,id:l,key:et(d,l)}}function pm(e,t){ot();let n=String(e||"").trim(),o=String(t||"").trim();if(!n||!o)throw new Error("getIdPath(category, id) requires both category and id");let r=ie().categoryIndex;if(!r)throw new Error("Sprite categories not indexed");let a=n.toLowerCase(),i=o.toLowerCase(),s=Array.from(r.keys()).find(l=>l.toLowerCase()===a)||n,u=r.get(s);if(!u)throw new Error(`Unknown sprite category: ${n}`);let d=Array.from(u.values()).find(l=>l.toLowerCase()===i)||o;if(!u.has(d))throw new Error(`Unknown sprite id: ${n}/${o}`);return et(s,d)}function mm(){vi(nt())}function fm(){return[...Ai]}var Se={init:ki,ready:mo,show:tm,toCanvas:nm,clear:om,attach:rm,attachProvider:am,has:im,key:(e,t)=>et(e,t),getCategories:sm,getCategoryId:lm,hasId:cm,listIds:um,getIdInfo:dm,getIdPath:pm,clearMutationCache:mm,getMutationNames:fm};var vo=P,Ce=vo.Object??Object,wo=Ce.keys,dn=Ce.values,pn=Ce.entries,Be={items:["WateringCan","PlanterPot","Shovel"],decor:["SmallRock","MediumRock","LargeRock","WoodBench","StoneBench","MarbleBench"],mutations:["Gold","Rainbow","Wet","Chilled","Frozen"],eggs:["CommonEgg","UncommonEgg","RareEgg"],pets:["Worm","Snail","Bee","Chicken","Bunny"],abilities:["ProduceScaleBoost","DoubleHarvest","SeedFinderI","CoinFinderI"],plants:["Carrot","Strawberry","Aloe","Blueberry","Apple"]},gm=["Rain","Frost","Dawn","AmberMoon"],zi=/main-[^/]+\.js(\?|$)/,bm=3,hm=200,ym=50,$i=new WeakSet,q={isReady:!1,isHookInstalled:!1,data:{items:null,decor:null,mutations:null,eggs:null,pets:null,abilities:null,plants:null,weather:null},spritesResolved:!1,spritesResolving:null,weatherPollingTimer:null,weatherPollAttempts:0},Fe=(e,t)=>t.every(n=>e.includes(n));function Ve(e,t){q.data[e]==null&&(q.data[e]=t,xm()&&Ji())}function xm(){return Object.values(q.data).every(e=>e!=null)}function Ki(e,t){if(!e||typeof e!="object"||$i.has(e))return;$i.add(e);let n;try{n=wo(e)}catch{return}if(!n||n.length===0)return;let o=e,r;if(!q.data.items&&Fe(n,Be.items)&&(r=o.WateringCan,r&&typeof r=="object"&&"coinPrice"in r&&"creditPrice"in r&&Ve("items",o)),!q.data.decor&&Fe(n,Be.decor)&&(r=o.SmallRock,r&&typeof r=="object"&&"coinPrice"in r&&"creditPrice"in r&&Ve("decor",o)),!q.data.mutations&&Fe(n,Be.mutations)&&(r=o.Gold,r&&typeof r=="object"&&"baseChance"in r&&"coinMultiplier"in r&&Ve("mutations",o)),!q.data.eggs&&Fe(n,Be.eggs)&&(r=o.CommonEgg,r&&typeof r=="object"&&"faunaSpawnWeights"in r&&"secondsToHatch"in r&&Ve("eggs",o)),!q.data.pets&&Fe(n,Be.pets)&&(r=o.Worm,r&&typeof r=="object"&&"coinsToFullyReplenishHunger"in r&&"diet"in r&&Array.isArray(r.diet)&&Ve("pets",o)),!q.data.abilities&&Fe(n,Be.abilities)&&(r=o.ProduceScaleBoost,r&&typeof r=="object"&&"trigger"in r&&"baseParameters"in r&&Ve("abilities",o)),!q.data.plants&&Fe(n,Be.plants)&&(r=o.Carrot,r&&typeof r=="object"&&"seed"in r&&"plant"in r&&"crop"in r&&Ve("plants",o)),!(t>=bm))for(let a of n){let i;try{i=o[a]}catch{continue}i&&typeof i=="object"&&Ki(i,t+1)}}function xo(e){try{Ki(e,0)}catch{}}function qi(){if(!q.isHookInstalled){q.isHookInstalled=!0;try{Ce.keys=function(t){return xo(t),wo.apply(this,arguments)},dn&&(Ce.values=function(t){return xo(t),dn.apply(this,arguments)}),pn&&(Ce.entries=function(t){return xo(t),pn.apply(this,arguments)})}catch{}}}function Ji(){if(q.isHookInstalled){try{Ce.keys=wo,dn&&(Ce.values=dn),pn&&(Ce.entries=pn)}catch{}q.isHookInstalled=!1}}function vm(){try{for(let e of vo.document?.scripts||[]){let t=e?.src?String(e.src):"";if(zi.test(t))return t}}catch{}try{for(let e of vo.performance?.getEntriesByType?.("resource")||[]){let t=e?.name?String(e.name):"";if(zi.test(t))return t}}catch{}return null}function wm(e,t){let n=Math.max(e.lastIndexOf("const ",t),e.lastIndexOf("let ",t),e.lastIndexOf("var ",t));if(n<0)return null;let o=e.indexOf("=",n);if(o<0||o>t)return null;let r=e.indexOf("{",o);if(r<0||r>t)return null;let a=0,i="",s=!1;for(let u=r;u<e.length;u++){let d=e[u];if(i){if(s){s=!1;continue}if(d==="\\"){s=!0;continue}d===i&&(i="");continue}if(d==='"'||d==="'"){i=d;continue}if(d==="{")a++;else if(d==="}"&&--a===0)return e.slice(r,u+1)}return null}function Sm(e){let t={},n=!1;for(let o of gm){let r=e?.[o];if(!r||typeof r!="object")continue;let a=r.iconSpriteKey||null,{iconSpriteKey:i,...s}=r;t[o]={weatherId:o,spriteId:a,...s},n=!0}return t.Sunny||(t.Sunny={weatherId:"Sunny",name:"Sunny",spriteId:"sprite/ui/SunnyIcon",type:"primary"}),!n||t.Rain&&t.Rain.mutator?.mutation!=="Wet"?null:t}async function km(){if(q.data.weather)return!0;let e=vm();if(!e)return!1;let t="";try{let s=await fetch(e,{credentials:"include"});if(!s.ok)return!1;t=await s.text()}catch{return!1}let n=t.indexOf("fixedTimeSlots:[0,48,96,144,192,240]");if(n<0&&(n=t.indexOf('name:"Amber Moon"')),n<0)return!1;let o=wm(t,n);if(!o)return!1;let r=o.replace(/\b[A-Za-z_$][\w$]*\.(Rain|Frost|Dawn|AmberMoon)\b/g,'"$1"'),a;try{a=Function('"use strict";return('+r+")")()}catch{return!1}let i=Sm(a);return i?(q.data.weather=i,!0):!1}function Tm(){if(q.weatherPollingTimer)return;q.weatherPollAttempts=0;let e=setInterval(async()=>{(await km()||++q.weatherPollAttempts>hm)&&(clearInterval(e),q.weatherPollingTimer=null)},ym);q.weatherPollingTimer=e}function Am(e){return String(e||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^A-Za-z0-9]/g,"").trim()}function Pm(e,t=[]){let n=new Set,o=r=>{let a=String(r||"").trim();a&&n.add(a)};o(e);for(let r of t)o(r);for(let r of Array.from(n.values()))r.endsWith("s")?o(r.slice(0,-1)):o(`${r}s`),r.endsWith("es")&&o(r.slice(0,-2));return Array.from(n.values()).filter(Boolean)}function Yi(e,t,n,o=[],r=[]){let a=Pm(e,o);if(!a.length)return null;let i=[t,...r].filter(l=>typeof l=="string"),s=l=>{let c=String(l||"").trim();if(!c)return null;for(let p of a)try{if(Se.has(p,c))return Se.getIdPath(p,c)}catch{}return null};for(let l of i){let c=s(l);if(c)return c}let u=Am(n||""),d=s(u||n||"");if(d)return d;try{for(let l of a){let c=Se.listIds(`sprite/${l}/`),p=i.map(f=>String(f||"").toLowerCase()),m=String(n||u||"").toLowerCase();for(let f of c){let b=(f.split("/").pop()||"").toLowerCase();if(p.some(h=>h&&h===b)||b===m)return f}for(let f of c){let b=(f.split("/").pop()||"").toLowerCase();if(p.some(h=>h&&b.includes(h))||m&&b.includes(m))return f}}}catch{}return null}function be(e,t,n,o,r=[],a=[]){if(!e||typeof e!="object")return;let i=e.tileRef;if(!i||typeof i!="object")return;let s=String(i.spritesheet||t||"").trim(),u=Yi(s,n,o,r,a);if(u)try{e.spriteId=u}catch{}let d=e.rotationVariants;if(d&&typeof d=="object")for(let l of Object.values(d))be(l,s,n,o);if(e.immatureTileRef){let l={tileRef:e.immatureTileRef};be(l,s,n,o),l.spriteId&&(e.immatureSpriteId=l.spriteId)}if(e.topmostLayerTileRef){let l={tileRef:e.topmostLayerTileRef};be(l,s,n,o),l.spriteId&&(e.topmostLayerSpriteId=l.spriteId)}e.activeState&&typeof e.activeState=="object"&&be(e.activeState,s,n,e.activeState?.name||o)}function Cm(e,t,n,o=[]){if(!Array.isArray(t)||t.length===0)return null;let r=t[0],a=t.slice(1);return Yi(e,r,n??null,o,a)}function Mm(e){for(let[t,n]of Object.entries(e.items||{}))be(n,"items",t,n?.name,["item"]);for(let[t,n]of Object.entries(e.decor||{}))be(n,"decor",t,n?.name);for(let[t,n]of Object.entries(e.mutations||{})){be(n,"mutations",t,n?.name,["mutation"]);let o=Cm("mutation-overlay",[`${t}TallPlant`,`${t}TallPlantIcon`,t],n?.name,["mutation-overlay"]);if(o)try{n.overlaySpriteId=o}catch{}}for(let[t,n]of Object.entries(e.eggs||{}))be(n,"pets",t,n?.name,["pet"]);for(let[t,n]of Object.entries(e.pets||{}))be(n,"pets",t,n?.name,["pet"]);for(let[t,n]of Object.entries(e.plants||{})){let o=n;o.seed&&be(o.seed,o.seed?.tileRef?.spritesheet||"seeds",`${t}Seed`,o.seed?.name||`${t} Seed`,["seed","plant","plants"],[t]),o.plant&&be(o.plant,o.plant?.tileRef?.spritesheet||"plants",`${t}Plant`,o.plant?.name||`${t} Plant`,["plant","plants","tallplants"],[t]),o.crop&&be(o.crop,o.crop?.tileRef?.spritesheet||"plants",t,o.crop?.name||t,["plant","plants"],[`${t}Crop`])}}async function Xi(){if(!q.spritesResolved)return q.spritesResolving||(q.spritesResolving=(async()=>{try{await Qi(2e4,50),await Se.init(),Mm(q.data),q.spritesResolved=!0}catch(e){try{console.warn("[MGData] sprite resolution failed",e)}catch{}}finally{q.spritesResolving=null}})()),q.spritesResolving}async function Im(){return q.isReady||(qi(),Tm(),Xi(),q.isReady=!0),!0}function Em(){return q.isReady}function Lm(){return Ji(),q.weatherPollingTimer&&(clearInterval(q.weatherPollingTimer),q.weatherPollingTimer=null),q.isReady=!1,!0}function Rm(){return!q.spritesResolved&&!q.spritesResolving&&Xi(),{...q.data}}function Om(e){return q.data[e]??null}function Dm(e){return q.data[e]!=null}async function Qi(e=1e4,t=50){let n=Date.now();for(;Date.now()-n<e;){if(Object.values(q.data).some(o=>o!=null))return{...q.data};await Ae(t)}throw new Error("MGData.waitForAnyData: timeout")}async function Hm(e,t=1e4,n=50){let o=Date.now();for(;Date.now()-o<t;){let r=q.data[e];if(r!=null)return r;await Ae(n)}throw new Error(`MGData.waitFor: timeout waiting for "${e}"`)}var Pt={init:Im,isReady:Em,stop:Lm,getAll:Rm,get:Om,has:Dm,waitForAnyData:Qi,waitFor:Hm};qi();Pe();var mn=null,xe={ready:!1,xform:null,xformAt:0};function at(e){try{if(typeof structuredClone=="function")return structuredClone(e)}catch{}try{return JSON.parse(JSON.stringify(e))}catch{}return e}function Ct(){return ae.tos()}function To(){return ae.engine()}function Gm(){let e=Ct()?.map?.cols;return Number.isFinite(e)&&e>0?e:null}function Ao(e,t){let n=Gm();return n?t*n+e|0:null}function Ue(e,t,n=!0){let o=Ct(),r=Ao(e,t);if(!o||r==null)return{gidx:null,tv:null};let a=o.tileViews?.get?.(r)||null;if(!a&&n&&typeof o.getOrCreateTileView=="function")try{a=o.getOrCreateTileView(r)}catch{}return{gidx:r,tv:a||null}}function rt(e,t,n,o={}){let r=o.ensureView!==!1,a=o.forceUpdate!==!1,i=To(),{gidx:s,tv:u}=Ue(Number(e),Number(t),r);if(s==null)throw new Error("MGTile: cols unavailable (engine/TOS not ready)");if(!u)throw new Error("MGTile: TileView unavailable (not instantiated)");let d=u.tileObject;if(typeof u.onDataChanged!="function")throw new Error("MGTile: tileView.onDataChanged not found (different API?)");if(u.onDataChanged(n),a&&i?.reusableContext&&typeof u.update=="function")try{u.update(i.reusableContext)}catch{}return{ok:!0,tx:Number(e),ty:Number(t),gidx:s,before:d,after:u.tileObject}}function Po(e,t){if(!e)throw new Error("MGTile: no tileObject on this tile");if(e.objectType!==t)throw new Error(`MGTile: expected objectType "${t}", got "${e.objectType}"`)}function So(e,t){if("startTime"in t&&(e.startTime=Number(t.startTime)),"endTime"in t&&(e.endTime=Number(t.endTime)),"targetScale"in t&&(e.targetScale=Number(t.targetScale)),"mutations"in t){if(!Array.isArray(t.mutations))throw new Error("MGTile: mutations must be an array of strings");e.mutations=t.mutations.slice()}}function Me(){if(!xe.ready)throw new Error("MGTile: not ready. Call MGTile.init() first.")}function ko(e){if(!e)return null;let t=r=>r&&(typeof r.getGlobalPosition=="function"||typeof r.toGlobal=="function"),n=["container","root","view","tile","ground","base","floor","bg","background","baseSprite","tileSprite","displayObject","gfx","graphics","sprite"];for(let r of n)if(t(e[r]))return e[r];if(t(e))return e;let o=[e.container,e.root,e.view,e.displayObject,e.tileSprite,e.gfx,e.graphics,e.sprite];for(let r of o)if(t(r))return r;try{for(let r of Object.keys(e))if(t(e[r]))return e[r]}catch{}return null}function fn(e){let t=ce(()=>e?.getGlobalPosition?.());if(t&&Number.isFinite(t.x)&&Number.isFinite(t.y))return{x:t.x,y:t.y};let n=ce(()=>e?.toGlobal?.({x:0,y:0}));return n&&Number.isFinite(n.x)&&Number.isFinite(n.y)?{x:n.x,y:n.y}:null}function _m(e){try{if(!e?.getBounds)return"center";let t=e.getBounds(),n=fn(e);if(!n||!t||!Number.isFinite(t.width)||!Number.isFinite(t.height))return"center";let o=t.x+t.width/2,r=t.y+t.height/2;return Math.hypot(n.x-o,n.y-r)<Math.hypot(n.x-t.x,n.y-t.y)?"center":"topleft"}catch{return"center"}}function Nm(){let e=Ct(),t=e?.map?.cols,n=e?.map?.rows;if(!e||!Number.isFinite(t)||t<=1)return null;let o=Number.isFinite(n)&&n>1?n:null,r=[[0,0],[1,1],[Math.min(2,t-2),0],[0,1]];o&&o>2&&r.push([Math.floor(t/2),Math.floor(o/2)]);for(let[a,i]of r){if(a<0||i<0||a>=t||o&&i>=o)continue;let s=Ue(a,i,!0).tv,u=a+1<t?Ue(a+1,i,!0).tv:null,d=Ue(a,i+1,!0).tv,l=ko(s),c=ko(u),p=ko(d);if(!l||!c||!p)continue;let m=fn(l),f=fn(c),g=fn(p);if(!m||!f||!g)continue;let b={x:f.x-m.x,y:f.y-m.y},h={x:g.x-m.x,y:g.y-m.y},w=b.x*h.y-b.y*h.x;if(!Number.isFinite(w)||Math.abs(w)<1e-6)continue;let T=1/w,x={a:h.y*T,b:-h.x*T,c:-b.y*T,d:b.x*T},v={x:m.x-a*b.x-i*h.x,y:m.y-a*b.y-i*h.y},k=_m(l),L=k==="center"?v:{x:v.x+.5*(b.x+h.x),y:v.y+.5*(b.y+h.y)};return{ok:!0,cols:t,rows:o,vx:b,vy:h,inv:x,anchorMode:k,originCenter:L}}return null}async function Wm(e=15e3){return xe.ready?!0:mn||(mn=(async()=>{if(await ae.init(e),!Ct())throw new Error("MGTile: engine captured but tileObject system not found");return xe.ready=!0,!0})(),mn)}function jm(){return ae.hook()}function gn(e,t,n={}){Me();let o=n.ensureView!==!1,r=n.clone!==!1,{gidx:a,tv:i}=Ue(Number(e),Number(t),o);if(a==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!i)return{tx:Number(e),ty:Number(t),gidx:a,tileView:null,tileObject:void 0};let s=i.tileObject;return{tx:Number(e),ty:Number(t),gidx:a,tileView:i,tileObject:r?at(s):s}}function Bm(e,t,n={}){return Me(),rt(e,t,null,n)}function Fm(e,t,n,o={}){Me();let a=gn(e,t,{...o,clone:!1}).tileView?.tileObject;Po(a,"plant");let i=at(a);if(Array.isArray(i.slots)||(i.slots=[]),"plantedAt"in n&&(i.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(i.maturedAt=Number(n.maturedAt)),"species"in n&&(i.species=String(n.species)),"slotIdx"in n&&"slotPatch"in n){let s=Number(n.slotIdx)|0;if(!i.slots[s])throw new Error(`MGTile: plant slot ${s} doesn't exist`);return So(i.slots[s],n.slotPatch),rt(e,t,i,o)}if("slots"in n){let s=n.slots;if(Array.isArray(s)){for(let u=0;u<s.length;u++)if(s[u]!=null){if(!i.slots[u])throw new Error(`MGTile: plant slot ${u} doesn't exist`);So(i.slots[u],s[u])}}else if(s&&typeof s=="object")for(let u of Object.keys(s)){let d=Number(u)|0;if(Number.isFinite(d)){if(!i.slots[d])throw new Error(`MGTile: plant slot ${d} doesn't exist`);So(i.slots[d],s[d])}}else throw new Error("MGTile: patch.slots must be array or object map");return rt(e,t,i,o)}return rt(e,t,i,o)}function Vm(e,t,n,o={}){Me();let a=gn(e,t,{...o,clone:!1}).tileView?.tileObject;Po(a,"decor");let i=at(a);return"rotation"in n&&(i.rotation=Number(n.rotation)),rt(e,t,i,o)}function Um(e,t,n,o={}){Me();let a=gn(e,t,{...o,clone:!1}).tileView?.tileObject;Po(a,"egg");let i=at(a);return"plantedAt"in n&&(i.plantedAt=Number(n.plantedAt)),"maturedAt"in n&&(i.maturedAt=Number(n.maturedAt)),rt(e,t,i,o)}function zm(e,t,n,o={}){Me();let r=o.ensureView!==!1,a=o.forceUpdate!==!1,i=To(),{gidx:s,tv:u}=Ue(Number(e),Number(t),r);if(s==null)throw new Error("MGTile: cols unavailable (engine not ready)");if(!u)throw new Error("MGTile: TileView unavailable");let d=u.tileObject,l=typeof n=="function"?n(at(d)):n;if(u.onDataChanged(l),a&&i?.reusableContext&&typeof u.update=="function")try{u.update(i.reusableContext)}catch{}return{ok:!0,tx:Number(e),ty:Number(t),gidx:s,before:d,after:u.tileObject}}function $m(e,t,n={}){Me();let o=n.ensureView!==!1,{gidx:r,tv:a}=Ue(Number(e),Number(t),o);if(r==null)throw new Error("MGTile: cols unavailable");if(!a)return{ok:!0,tx:Number(e),ty:Number(t),gidx:r,tv:null,tileObject:void 0};let i=n.clone!==!1,s=a.tileObject;return{ok:!0,tx:Number(e),ty:Number(t),gidx:r,objectType:s?.objectType??null,tileObject:i?at(s):s,tvKeys:Object.keys(a||{}).sort(),tileView:a}}function Zi(){return Me(),xe.xform=Nm(),xe.xformAt=Date.now(),{ok:!!xe.xform?.ok,xform:xe.xform}}function Km(e,t={}){if(Me(),!e||!Number.isFinite(e.x)||!Number.isFinite(e.y))return null;let n=Number.isFinite(t.maxAgeMs)?Number(t.maxAgeMs):1500;(!xe.xform?.ok||t.forceRebuild||Date.now()-xe.xformAt>n)&&Zi();let o=xe.xform;if(!o?.ok)return null;let r=e.x-o.originCenter.x,a=e.y-o.originCenter.y,i=o.inv.a*r+o.inv.b*a,s=o.inv.c*r+o.inv.d*a,u=Math.floor(i),d=Math.floor(s),l=[[u,d],[u+1,d],[u,d+1],[u+1,d+1]],c=null,p=1/0;for(let[m,f]of l){if(m<0||f<0||m>=o.cols||Number.isFinite(o.rows)&&o.rows!==null&&f>=o.rows)continue;let g=o.originCenter.x+m*o.vx.x+f*o.vy.x,b=o.originCenter.y+m*o.vx.y+f*o.vy.y,h=(e.x-g)**2+(e.y-b)**2;h<p&&(p=h,c={tx:m,ty:f,fx:i,fy:s,x:e.x,y:e.y,gidx:null})}return c?(c.gidx=Ao(c.tx,c.ty),c):null}function qm(){return["MGTile.init()","MGTile.hook()","MGTile.getTileObject(tx,ty) / inspect(tx,ty)","MGTile.setTileEmpty(tx,ty)","MGTile.setTilePlant(tx,ty,{...}) / setTileDecor / setTileEgg","MGTile.setTileObjectRaw(tx,ty,objOrFn)","MGTile.rebuildTransform() / pointToTile({x,y})"].join(`
`)}var ke={init:Wm,ready:()=>xe.ready,hook:jm,engine:()=>To(),tos:()=>Ct(),gidx:(e,t)=>Ao(Number(e),Number(t)),getTileObject:gn,inspect:$m,setTileEmpty:Bm,setTilePlant:Fm,setTileDecor:Vm,setTileEgg:Um,setTileObjectRaw:zm,rebuildTransform:Zi,pointToTile:Km,help:qm};Pe();var F={ready:!1,app:null,renderer:null,stage:null,ticker:null,tileSets:new Map,highlights:new Map,watches:new Map,fades:new Map,fadeWatches:new Map},Lo=e=>!!e&&typeof e=="object"&&!Array.isArray(e),Co=e=>!!(e&&typeof e.getBounds=="function"&&("parent"in e||"children"in e)),hn=e=>!!(e&&typeof e.tint=="number"),ze=e=>!!(e&&typeof e.alpha=="number");function bn(e,t,n){return e+(t-e)*n}function Jm(e,t,n){let o=e>>16&255,r=e>>8&255,a=e&255,i=t>>16&255,s=t>>8&255,u=t&255,d=bn(o,i,n)|0,l=bn(r,s,n)|0,c=bn(a,u,n)|0;return d<<16|l<<8|c}function Ym(e,t=900){let n=[],o=[e];for(;o.length&&n.length<t;){let r=o.pop();if(!r)continue;hn(r)&&n.push(r);let a=r.children;if(Array.isArray(a))for(let i=a.length-1;i>=0;i--)o.push(a[i])}return n}function Xm(e,t=25e3){let n=[],o=[e],r=0;for(;o.length&&r++<t;){let a=o.pop();if(!a)continue;ze(a)&&n.push(a);let i=a.children;if(Array.isArray(i))for(let s=i.length-1;s>=0;s--)o.push(i[s])}return n}function es(e){if(!Array.isArray(e))return[];let t=new Set,n=[];for(let o of e){let r,a;if(Array.isArray(o))r=o[0],a=o[1];else if(Lo(o))r=o.x??o.tx,a=o.y??o.ty;else continue;if(r=Number(r),a=Number(a),!Number.isFinite(r)||!Number.isFinite(a))continue;r|=0,a|=0;let i=`${r},${a}`;t.has(i)||(t.add(i),n.push({x:r,y:a}))}return n}function Qm(e,t){let n=String(e||"").trim();if(!n)throw new Error("MGPixi.defineTileSet: empty name");let o=es(t);return F.tileSets.set(n,o),{ok:!0,name:n,count:o.length}}function Zm(e){return F.tileSets.delete(String(e||"").trim())}function ef(){return Array.from(F.tileSets.keys()).sort((e,t)=>e.localeCompare(t))}function ts(e){return!!(e&&(e.tileSet!=null||Array.isArray(e.tiles)))}function Ro(e){let n=ke.tos?.()?.tileViews;if(!n?.entries)throw new Error("MGPixi: TOS.tileViews not found");if(!ts(e))return{entries:Array.from(n.entries()),gidxSet:null};let o=[];if(e.tileSet!=null){let a=String(e.tileSet||"").trim(),i=F.tileSets.get(a);if(!i)throw new Error(`MGPixi: tileSet not found "${a}"`);o=i}else o=es(e.tiles||[]);let r=new Map;for(let a of o){let i=ke.getTileObject(a.x,a.y,{ensureView:!0,clone:!1});i?.tileView&&i.gidx!=null&&r.set(i.gidx,i.tileView)}return{entries:Array.from(r.entries()),gidxSet:new Set(r.keys())}}function Oo(e){let t=F.highlights.get(e);if(!t)return!1;ce(()=>F.ticker?.remove(t.tick)),t.root&&t.baseAlpha!=null&&ze(t.root)&&ce(()=>{t.root.alpha=t.baseAlpha});for(let n of t.tint)n.o&&hn(n.o)&&ce(()=>{n.o.tint=n.baseTint});return F.highlights.delete(e),!0}function ns(e=null){for(let t of Array.from(F.highlights.keys()))e&&!String(t).startsWith(e)||Oo(t);return!0}function os(e,t={}){if($e(),!Co(e))throw new Error("MGPixi.highlightPulse: invalid root");let n=String(t.key||`hl:${Math.random().toString(16).slice(2)}`);if(F.highlights.has(n))return n;let o=ze(e)?Number(e.alpha):null,r=pe(Number(t.minAlpha??.12),0,1),a=pe(Number(t.maxAlpha??1),0,1),i=Number(t.speed??1.25),s=(t.tint??8386303)>>>0,u=pe(Number(t.tintMix??.85),0,1),d=t.deepTint!==!1,l=[];if(d)for(let m of Ym(e))l.push({o:m,baseTint:m.tint});else hn(e)&&l.push({o:e,baseTint:e.tint});let c=performance.now(),p=()=>{let m=(performance.now()-c)/1e3,f=(Math.sin(m*Math.PI*2*i)+1)/2,g=f*f*(3-2*f);o!=null&&ze(e)&&(e.alpha=pe(bn(r,a,g)*o,0,1));let b=g*u;for(let h of l)h.o&&hn(h.o)&&(h.o.tint=Jm(h.baseTint,s,b))};return F.ticker?.add(p),F.highlights.set(n,{root:e,tick:p,baseAlpha:o,tint:l}),n}var tf=["plantVisual","cropVisual","slotVisual","slotView","displayObject","view","container","root","sprite","gfx","graphics"];function Mo(e){if(!e)return null;if(Co(e))return e;if(!Lo(e))return null;for(let t of tf){let n=e[t];if(Co(n))return n}return null}function nf(e,t){let n=[{o:e,d:0}],o=new Set,r=6;for(;n.length;){let{o:a,d:i}=n.shift();if(!(!a||i>r)&&!o.has(a)){if(o.add(a),Array.isArray(a)){if(a.length===t){let s=new Array(t),u=!0;for(let d=0;d<t;d++){let l=Mo(a[d]);if(!l){u=!1;break}s[d]=l}if(u)return s}for(let s of a)n.push({o:s,d:i+1});continue}if(Lo(a)){let s=a;for(let u of Object.keys(s))n.push({o:s[u],d:i+1})}}}return null}function of(e,t){let n=e?.mutations;if(!Array.isArray(n))return!1;for(let o of n)if(String(o||"").toLowerCase()===t)return!0;return!1}function rs(e,t={}){$e();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.highlightMutation: empty mutation");let{entries:o,gidxSet:r}=Ro(t),a=`hlmut:${n}:`;if(t.clear===!0)if(!r)ns(a);else for(let c of Array.from(F.highlights.keys())){if(!c.startsWith(a))continue;let p=c.split(":"),m=Number(p[2]);r.has(m)&&Oo(c)}let i={tint:(t.tint??8386303)>>>0,minAlpha:Number(t.minAlpha??.12),maxAlpha:Number(t.maxAlpha??1),speed:Number(t.speed??1.25),tintMix:Number(t.tintMix??.85),deepTint:t.deepTint!==!1},s=0,u=0,d=0,l=0;for(let[c,p]of o){let m=p?.tileObject;if(!m||m.objectType!=="plant")continue;let f=m.slots;if(!Array.isArray(f)||f.length===0)continue;let g=!1,b=[];for(let T=0;T<f.length;T++)of(f[T],n)&&(b.push(T),g=!0);if(!g)continue;s++,u+=b.length;let h=p?.childView?.plantVisual||p?.childView||p,w=nf(h,f.length);if(!w){l+=b.length;continue}for(let T of b){let x=w[T];if(!x){l++;continue}let v=`${a}${c}:${T}`;F.highlights.has(v)||(os(x,{key:v,...i}),d++)}}return{ok:!0,mutation:n,filtered:!!r,plantsMatched:s,matchedSlots:u,newHighlights:d,failedSlots:l}}function rf(e,t={}){$e();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchMutation: empty mutation");let o=`watchmut:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,r=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,a=F.watches.get(o);a&&clearInterval(a);let i=setInterval(()=>{ce(()=>rs(n,{...t,clear:!1}))},r);return F.watches.set(o,i),{ok:!0,key:o,mutation:n,intervalMs:r}}function af(e){let t=String(e||"").trim();if(!t)return!1;if(!t.startsWith("watchmut:")){let o=t.toLowerCase(),r=0;for(let[a,i]of Array.from(F.watches.entries()))a.startsWith(`watchmut:${o}:`)&&(clearInterval(i),F.watches.delete(a),r++);return r>0}let n=F.watches.get(t);return n?(clearInterval(n),F.watches.delete(t),!0):!1}function sf(e){let t=Array.isArray(e?.slots)?e.slots:[];return{objectType:"plant",species:e?.species??null,plantedAt:e?.plantedAt??null,maturedAt:e?.maturedAt??null,slotCount:t.length,slots:t.map((n,o)=>({idx:o,mutations:Array.isArray(n?.mutations)?n.mutations.slice():[]}))}}function lf(e,t,n={}){$e();let o=Number(e)|0,r=Number(t)|0,a=n.ensureView!==!1,i=ke.getTileObject(o,r,{ensureView:a,clone:!1}),s=i?.tileView||null,u=s?.tileObject,d={ok:!0,tx:o,ty:r,gidx:i?.gidx??ke.gidx?.(o,r)??null,hasTileView:!!s,objectType:u?.objectType??null,tileObject:u??null,summary:u?.objectType==="plant"?sf(u):u?{objectType:u.objectType??null}:null,display:s?s.childView?.plantVisual||s.childView||s.displayObject||s:null};return n.log!==!1&&ce(()=>console.log("[MGPixi.inspectTile]",d)),d}function cf(e){let t=e?.childView?.plantVisual||e?.childView?.cropVisual||e?.childView||e?.displayObject||e;return Mo(t)||Mo(e?.displayObject)||null}function as(e){let t=F.fades.get(e);if(!t)return!1;for(let n of t.targets)n.o&&ze(n.o)&&Number.isFinite(n.baseAlpha)&&ce(()=>{n.o.alpha=n.baseAlpha});return F.fades.delete(e),!0}function Io(e=null){for(let t of Array.from(F.fades.keys()))e&&!String(t).startsWith(e)||as(t);return!0}function is(e,t={}){$e();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.clearSpeciesFade: empty species");let o=`fade:${n}:`;if(!ts(t))return Io(o);let{gidxSet:r}=Ro(t);if(!r)return Io(o);for(let a of Array.from(F.fades.keys())){if(!a.startsWith(o))continue;let i=Number(a.slice(o.length));r.has(i)&&as(a)}return!0}function ss(e,t={}){$e();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.fadeSpecies: empty species");let o=pe(Number(t.alpha??.2),0,1),r=t.deep===!0,{entries:a,gidxSet:i}=Ro(t),s=`fade:${n}:`;t.clear===!0&&is(n,t);let u=0,d=0,l=0,c=0;for(let[p,m]of a){let f=m?.tileObject;if(!f||f.objectType!=="plant")continue;u++;let g=String(f.species||"").trim().toLowerCase();if(!g||g!==n)continue;d++;let b=cf(m);if(!b||!ze(b)){c++;continue}let h=`${s}${p}`;if(F.fades.has(h)){ce(()=>{b.alpha=o}),l++;continue}let w=r?Xm(b):[b],T=[];for(let x of w)ze(x)&&T.push({o:x,baseAlpha:Number(x.alpha)});for(let x of T)ce(()=>{x.o.alpha=o});F.fades.set(h,{targets:T}),l++}return{ok:!0,species:n,alpha:o,deep:r,filtered:!!i,plantsSeen:u,matchedPlants:d,applied:l,failed:c,totalFades:F.fades.size}}function uf(e,t={}){$e();let n=String(e||"").trim().toLowerCase();if(!n)throw new Error("MGPixi.watchFadeSpecies: empty species");let o=`watchfade:${n}:${t.tileSet?`set:${t.tileSet}`:t.tiles?"tiles":"all"}`,r=Number.isFinite(t.intervalMs)?t.intervalMs:1e3,a=F.fadeWatches.get(o);a&&clearInterval(a);let i=setInterval(()=>{ce(()=>ss(n,{...t,clear:!1}))},r);return F.fadeWatches.set(o,i),{ok:!0,key:o,species:n,intervalMs:r}}function df(e){let t=String(e||"").trim();if(!t)return!1;if(!t.startsWith("watchfade:")){let o=t.toLowerCase(),r=0;for(let[a,i]of Array.from(F.fadeWatches.entries()))a.startsWith(`watchfade:${o}:`)&&(clearInterval(i),F.fadeWatches.delete(a),r++);return r>0}let n=F.fadeWatches.get(t);return n?(clearInterval(n),F.fadeWatches.delete(t),!0):!1}function Eo(){let e=P;return e.$PIXI=e.PIXI||null,e.$app=F.app||null,e.$renderer=F.renderer||null,e.$stage=F.stage||null,e.$ticker=F.ticker||null,e.__MG_PIXI__={PIXI:e.$PIXI,app:e.$app,renderer:e.$renderer,stage:e.$stage,ticker:e.$ticker,ready:F.ready},e.__MG_PIXI__}function $e(){if(!F.ready)throw new Error("MGPixi: call MGPixi.init() first")}async function pf(e=15e3){if(F.ready)return Eo(),!0;if(await ae.init(e),F.app=ae.app(),F.ticker=ae.ticker(),F.renderer=ae.renderer(),F.stage=ae.stage(),!F.app||!F.ticker)throw new Error("MGPixi: PIXI app/ticker not found");return F.ready=!0,Eo(),!0}var Mt={init:pf,ready:()=>F.ready,expose:Eo,get app(){return F.app},get renderer(){return F.renderer},get stage(){return F.stage},get ticker(){return F.ticker},get PIXI(){return P.PIXI||null},defineTileSet:Qm,deleteTileSet:Zm,listTileSets:ef,highlightPulse:os,stopHighlight:Oo,clearHighlights:ns,highlightMutation:rs,watchMutation:rf,stopWatchMutation:af,inspectTile:lf,fadeSpecies:ss,clearSpeciesFade:is,clearFades:Io,watchFadeSpecies:uf,stopWatchFadeSpecies:df};Pe();var ls=P??window,mf={sfx:"soundEffectsVolume",music:"musicVolume",ambience:"ambienceVolume"},ff={sfx:"soundEffectsVolumeAtom",music:"musicVolumeAtom",ambience:"ambienceVolumeAtom"},It=.001,Et=.2,yn=null,z={ready:!1,baseUrl:null,urls:{ambience:new Map,music:new Map},sfx:{mp3Url:null,atlasUrl:null,atlas:null,groups:new Map,buffer:null},tracks:{ambience:null,music:null},ctx:null};function Rt(){if(!z.ready)throw new Error("MGAudio not ready yet")}function cs(e,t=NaN){try{let n=localStorage.getItem(e);if(n==null)return t;let o;try{o=JSON.parse(n)}catch{o=n}if(typeof o=="number"&&Number.isFinite(o))return o;if(typeof o=="string"){let r=parseFloat(o);if(Number.isFinite(r))return r}}catch{}return t}function Lt(e){let t=mf[e],n=ff[e];if(!t)return{atom:Et,vol100:xn(Et)};let o=cs(t,NaN);if(Number.isFinite(o)){let a=pe(o,0,1);return{atom:a,vol100:xn(a)}}if(n){let a=cs(n,NaN);if(Number.isFinite(a)){let i=pe(a,0,1);return{atom:i,vol100:xn(i)}}}let r=Et;return{atom:r,vol100:xn(r)}}function gf(e){let t=Number(e);if(!Number.isFinite(t))return null;if(t<=0)return 0;let o=(pe(t,1,100)-1)/99;return It+o*(Et-It)}function xn(e){let t=pe(Number(e),0,1);if(t<=It)return 0;let n=(t-It)/(Et-It);return Math.round(1+n*99)}function us(e,t){if(t==null)return Lt(e).atom;let n=gf(t);return n===null?Lt(e).atom:oo(n)}async function ds(){let e=z.ctx;if(e)return e;let t=ls.AudioContext||ls.webkitAudioContext;if(!t)throw new Error("WebAudio not supported");let n=new t;return z.ctx=n,n}async function ps(){if(z.ctx&&z.ctx.state==="suspended")try{await z.ctx.resume()}catch{}}function bf(e){let t=new Map,n=(o,r)=>{t.has(o)||t.set(o,[]),t.get(o).push(r)};for(let o of Object.keys(e||{})){let r=/^(.*)_([A-Z])$/.exec(o);r?.[1]?n(r[1],o):n(o,o)}for(let[o,r]of Array.from(t.entries()))r.sort((a,i)=>a.localeCompare(i)),t.set(o,r);z.sfx.groups=t}function hf(e){let t=z.sfx.atlas;if(!t)throw new Error("SFX atlas not loaded");if(t[e])return e;let n=z.sfx.groups.get(e);if(n?.length)return n[Math.random()*n.length|0];throw new Error(`Unknown sfx/group: ${e}`)}async function yf(){if(z.sfx.buffer)return z.sfx.buffer;if(!z.sfx.mp3Url)throw new Error("SFX mp3 url missing");let e=await ds();await ps();let n=await(await nn(z.sfx.mp3Url)).arrayBuffer(),o=await new Promise((r,a)=>{let i=e.decodeAudioData(n,r,a);i?.then&&i.then(r,a)});return z.sfx.buffer=o,o}async function xf(e,t={}){if(!z.ready)throw new Error("MGAudio not ready yet");let n=String(e||"").trim();if(!n)throw new Error("Missing sfx name");let o=hf(n),r=z.sfx.atlas[o];if(!r)throw new Error(`Missing segment for sfx: ${o}`);let a=await ds();await ps();let i=await yf(),s=Math.max(0,+r.start||0),u=Math.max(s,+r.end||s),d=Math.max(.01,u-s),l=us("sfx",t.volume),c=a.createGain();c.gain.value=l,c.connect(a.destination);let p=a.createBufferSource();return p.buffer=i,p.connect(c),p.start(0,s,d),{name:o,source:p,start:s,end:u,duration:d,volume:l}}function ms(e){if(e!=="music"&&e!=="ambience")return!1;let t=z.tracks[e];if(t){try{t.pause()}catch{}try{t.src=""}catch{}}return z.tracks[e]=null,!0}function vf(e,t,n={}){if(!z.ready)throw new Error("MGAudio not ready yet");if(e!=="music"&&e!=="ambience")throw new Error(`Invalid category: ${e}`);let o=z.urls[e].get(t);if(!o)throw new Error(`Unknown ${e}: ${t}`);ms(e);let r=new Audio(o);return r.loop=!!n.loop,r.volume=us(e,n.volume),r.preload="auto",r.play().catch(()=>{}),z.tracks[e]=r,r}async function wf(e,t,n={}){let o=String(e||"").trim(),r=String(t||"").trim();if(!o||!r)throw new Error("play(category, asset) missing args");if(o==="sfx")return xf(r,n);if(o==="music"||o==="ambience")return vf(o,r,n);throw new Error(`Unknown category: ${o}`)}function Sf(e,t={}){let n=String(e||"").trim();return n==="music"||n==="ambience"?Array.from(z.urls[n].keys()).sort():n==="sfx"?z.sfx.atlas?t.groups?Array.from(z.sfx.groups.keys()).sort():Object.keys(z.sfx.atlas).sort():[]:[]}function kf(){return z.tracks.music&&(z.tracks.music.volume=Lt("music").atom),z.tracks.ambience&&(z.tracks.ambience.volume=Lt("ambience").atom),!0}function Tf(){return Rt(),["sfx","music","ambience"]}function Af(){return Rt(),Array.from(z.sfx.groups.keys()).sort((e,t)=>e.localeCompare(t))}function Pf(e,t){Rt();let n=String(e||"").trim().toLowerCase(),o=String(t||"").trim();if(!o||n!=="music"&&n!=="ambience")return!1;let r=z.urls[n],a=o.toLowerCase();for(let i of r.keys())if(i.toLowerCase()===a)return!0;return!1}function Cf(e){Rt();let t=String(e||"").trim();if(!t)return!1;let n=t.toLowerCase();for(let o of z.sfx.groups.keys())if(o.toLowerCase()===n)return!0;return!1}function Mf(e,t){Rt();let n=String(e||"").trim().toLowerCase(),o=String(t||"").trim();if(!o)throw new Error("getTrackUrl(category, name) missing name");if(n!=="music"&&n!=="ambience")throw new Error(`Invalid category: ${e}`);let r=z.urls[n],a=o.toLowerCase();for(let[i,s]of r.entries())if(i.toLowerCase()===a)return s;return null}async function If(){return z.ready?!0:yn||(yn=(async()=>{z.baseUrl=await ye.base();let e=await me.load(z.baseUrl),t=me.getBundle(e,"audio");if(!t)throw new Error("No audio bundle in manifest");for(let n of t.assets||[])for(let o of n.src||[]){if(typeof o!="string")continue;let r=/^audio\/(ambience|music)\/(.+)\.mp3$/i.exec(o);if(r){let a=r[1].toLowerCase(),i=r[2];z.urls[a].set(i,ue(z.baseUrl,o));continue}/^audio\/sfx\/sfx\.mp3$/i.test(o)&&(z.sfx.mp3Url=ue(z.baseUrl,o)),/^audio\/sfx\/sfx\.json$/i.test(o)&&(z.sfx.atlasUrl=ue(z.baseUrl,o))}if(!z.sfx.atlasUrl)throw new Error("Missing audio/sfx/sfx.json in manifest");return z.sfx.atlas=await Ze(z.sfx.atlasUrl),bf(z.sfx.atlas),z.ready=!0,!0})(),yn)}var Ot={init:If,ready:()=>z.ready,play:wf,stop:ms,list:Sf,refreshVolumes:kf,categoryVolume:Lt,getCategories:Tf,getGroups:Af,hasTrack:Pf,hasGroup:Cf,getTrackUrl:Mf};var Do=P?.document??document,vn=null,Z={ready:!1,baseUrl:null,byCat:new Map,byBase:new Map,overlay:null,live:new Set,defaultParent:null};function Ef(){if(Z.overlay)return Z.overlay;let e=Do.createElement("div");return e.id="MG_COSMETIC_OVERLAY",e.style.cssText=["position:fixed","left:0","top:0","width:100vw","height:100vh","pointer-events:none","z-index:99999999"].join(";"),Do.documentElement.appendChild(e),Z.overlay=e,e}function Lf(){let e=Z.defaultParent;if(!e)return null;try{return typeof e=="function"?e():e}catch{return null}}function Ho(e){let t=String(e||"").trim();return t?(t=t.replace(/^cosmetic\//i,""),t=t.replace(/\.png$/i,""),t):""}function Rf(e,t){if(t===void 0){let a=Ho(e),i=a.indexOf("_");return i<0?{cat:"",asset:a,base:a}:{cat:a.slice(0,i),asset:a.slice(i+1),base:a}}let n=String(e||"").trim(),o=Ho(t),r=o.includes("_")?o:`${n}_${o}`;if(o.includes("_")&&!n){let a=o.indexOf("_");return{cat:o.slice(0,a),asset:o.slice(a+1),base:o}}return{cat:n,asset:o.replace(/^.+?_/,""),base:r}}function Of(){return Array.from(Z.byCat.keys()).sort((e,t)=>e.localeCompare(t))}function Df(e){let t=Z.byCat.get(String(e||"").trim());return t?Array.from(t.keys()).sort((n,o)=>n.localeCompare(o)):[]}function Go(e,t){let{cat:n,asset:o,base:r}=Rf(e,t),a=Z.byBase.get(r);if(a)return a;let s=Z.byCat.get(n)?.get(o);if(s)return s;if(!Z.baseUrl)throw new Error("MGCosmetic not initialized");if(!r)throw new Error("Invalid cosmetic name");return ue(Z.baseUrl,`cosmetic/${r}.png`)}function _o(e,t,n){if(!Z.ready)throw new Error("MGCosmetic not ready yet");let o,r;typeof t=="object"&&t!==null?(o=t,r=void 0):typeof t=="string"?(r=t,o=n||{}):(r=void 0,o=n||{});let a=r!==void 0?Go(e,r):Go(e),i=Do.createElement("img");if(i.decoding="async",i.loading="eager",i.src=a,i.alt=o.alt!=null?String(o.alt):Ho(r??e),o.className&&(i.className=String(o.className)),o.width!=null&&(i.style.width=String(o.width)),o.height!=null&&(i.style.height=String(o.height)),o.opacity!=null&&(i.style.opacity=String(o.opacity)),o.style&&typeof o.style=="object")for(let[s,u]of Object.entries(o.style))try{i.style[s]=String(u)}catch{}return i}function Hf(e,t,n){let o,r;typeof t=="object"&&t!==null?(o=t,r=void 0):typeof t=="string"?(r=t,o=n||{}):(r=void 0,o=n||{});let a=o.parent||Lf()||Ef(),i=r!==void 0?_o(e,r,o):_o(e,o);if(a===Z.overlay||o.center||o.x!=null||o.y!=null||o.absolute){i.style.position="absolute",i.style.pointerEvents="none",i.style.zIndex=String(o.zIndex??999999);let u=o.scale??1,d=o.rotation??0;if(o.center)i.style.left="50%",i.style.top="50%",i.style.transform=`translate(-50%, -50%) scale(${u}) rotate(${d}rad)`;else{let l=o.x??innerWidth/2,c=o.y??innerHeight/2;i.style.left=`${l}px`,i.style.top=`${c}px`,i.style.transform=`scale(${u}) rotate(${d}rad)`,o.anchor==="center"&&(i.style.transform=`translate(-50%, -50%) scale(${u}) rotate(${d}rad)`)}}return a.appendChild(i),Z.live.add(i),i.__mgDestroy=()=>{try{i.remove()}catch{}Z.live.delete(i)},i}function Gf(e){return Z.defaultParent=e,!0}function _f(){for(let e of Array.from(Z.live))e.__mgDestroy?.()}async function Nf(){return Z.ready?!0:vn||(vn=(async()=>{Z.baseUrl=await ye.base();let e=await me.load(Z.baseUrl),t=me.getBundle(e,"cosmetic");if(!t)throw new Error("No 'cosmetic' bundle in manifest");Z.byCat.clear(),Z.byBase.clear();for(let n of t.assets||[])for(let o of n.src||[]){if(typeof o!="string"||!/^cosmetic\/.+\.png$/i.test(o))continue;let a=o.split("/").pop().replace(/\.png$/i,""),i=a.indexOf("_");if(i<0)continue;let s=a.slice(0,i),u=a.slice(i+1),d=ue(Z.baseUrl,o);Z.byBase.set(a,d),Z.byCat.has(s)||Z.byCat.set(s,new Map),Z.byCat.get(s).set(u,d)}return Z.ready=!0,!0})(),vn)}var Dt={init:Nf,ready:()=>Z.ready,categories:Of,list:Df,url:Go,create:_o,show:Hf,attach:Gf,clear:_f};async function fs(e){let t=[{name:"Data",init:()=>Pt.init()},{name:"Sprites",init:()=>Se.init()},{name:"TileObjectSystem",init:()=>ke.init()},{name:"Pixi",init:()=>Mt.init()},{name:"Audio",init:()=>Ot.init()},{name:"Cosmetics",init:()=>Dt.init()}];await Promise.all(t.map(async n=>{e?.({status:"start",name:n.name});try{await n.init(),e?.({status:"success",name:n.name})}catch(o){console.error(`[${n.name}] failed`,o),e?.({status:"error",name:n.name,error:o})}})),console.log("[Gemini] Modules ready. Access via Gemini.Modules in console.")}var gs={currentGardenTile:"myCurrentGardenTileAtom",globalTileIndex:"myCurrentGlobalTileIndexAtom",gardenObject:"myCurrentGardenObjectAtom",isMature:"isGardenObjectMatureAtom",isInMyGarden:"isInMyGardenAtom",gardenName:"currentGardenNameAtom",sortedSlotIndices:"myCurrentSortedGrowSlotIndicesAtom",currentGrowSlotIndex:"myCurrentGrowSlotIndexAtom"},bs={position:{globalIndex:null,localIndex:null},tile:{type:null,isEmpty:!0},garden:{name:null,isOwner:!1,playerSlotIndex:null},object:{type:null,data:null,isMature:!1},plant:null};function Wf(e){let t=e.currentGardenTile;return{globalIndex:e.globalTileIndex,localIndex:t?.localTileIndex??null}}function jf(e){return{type:e.currentGardenTile?.tileType??null,isEmpty:e.gardenObject===null}}function Bf(e){let t=e.currentGardenTile;return{name:e.gardenName,isOwner:e.isInMyGarden??!1,playerSlotIndex:t?.userSlotIdx??null}}function Ff(e){let t=e.gardenObject;return t?{type:t.objectType,data:t,isMature:e.isMature??!1}:{type:null,data:null,isMature:!1}}function Vf(e){let t=e.gardenObject;if(!t||t.objectType!=="plant")return null;let n=t,o=e.sortedSlotIndices??[];return{species:n.species,slots:n.slots??[],currentSlotIndex:e.currentGrowSlotIndex,sortedSlotIndices:o,nextHarvestSlotIndex:o.length>0?o[0]:null}}function hs(e){return{position:Wf(e),tile:jf(e),garden:Bf(e),object:Ff(e),plant:Vf(e)}}function ys(e){return JSON.stringify({globalIndex:e.position.globalIndex,localIndex:e.position.localIndex,tileType:e.tile.type,isEmpty:e.tile.isEmpty,gardenName:e.garden.name,isOwner:e.garden.isOwner,playerSlotIndex:e.garden.playerSlotIndex,objectType:e.object.type,isMature:e.object.isMature,plantSpecies:e.plant?.species??null,slotCount:e.plant?.slots.length??0})}function Ht(e,t){if(e===t)return!0;if(e===null||t===null)return e===t;if(typeof e!=typeof t)return!1;if(typeof e!="object")return e===t;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return!1;for(let i=0;i<e.length;i++)if(!Ht(e[i],t[i]))return!1;return!0}if(Array.isArray(e)||Array.isArray(t))return!1;let n=e,o=t,r=Object.keys(n),a=Object.keys(o);if(r.length!==a.length)return!1;for(let i of r)if(!Object.prototype.hasOwnProperty.call(o,i)||!Ht(n[i],o[i]))return!1;return!0}function Uf(e,t){return e.type!==t.type||e.isMature!==t.isMature?!0:e.data===null&&t.data===null?!1:e.data===null||t.data===null?!0:!Ht(e.data,t.data)}function zf(e,t){return e===null&&t===null?!1:e===null||t===null||e.species!==t.species||e.currentSlotIndex!==t.currentSlotIndex||e.nextHarvestSlotIndex!==t.nextHarvestSlotIndex||e.slots.length!==t.slots.length?!0:!Ht(e.sortedSlotIndices,t.sortedSlotIndices)}function $f(e,t){return e.name!==t.name||e.isOwner!==t.isOwner||e.playerSlotIndex!==t.playerSlotIndex}function Kf(){let e=bs,t=bs,n=!1,o=[],r={all:new Set,stable:new Set,object:new Set,plantInfo:new Set,garden:new Set},a={},i=Object.keys(gs),s=new Set;function u(){if(s.size<i.length)return;let l=hs(a);if(!Ht(e,l)&&(t=e,e=l,!!n)){for(let c of r.all)c(e,t);if(ys(t)!==ys(e))for(let c of r.stable)c(e,t);if(Uf(t.object,e.object)){let c={current:e.object,previous:t.object};for(let p of r.object)p(c)}if(zf(t.plant,e.plant)){let c={current:e.plant,previous:t.plant};for(let p of r.plantInfo)p(c)}if($f(t.garden,e.garden)){let c={current:e.garden,previous:t.garden};for(let p of r.garden)p(c)}}}async function d(){if(n)return;let l=i.map(async c=>{let p=gs[c],m=await Y.subscribe(p,f=>{a[c]=f,s.add(c),u()});o.push(m)});await Promise.all(l),n=!0,s.size===i.length&&(e=hs(a))}return d(),{get(){return e},subscribe(l){return r.all.add(l),n&&s.size===i.length&&l(e,e),()=>r.all.delete(l)},subscribeStable(l){return r.stable.add(l),n&&s.size===i.length&&l(e,e),()=>r.stable.delete(l)},subscribeObject(l){return r.object.add(l),()=>r.object.delete(l)},subscribePlantInfo(l){return r.plantInfo.add(l),()=>r.plantInfo.delete(l)},subscribeGarden(l){return r.garden.add(l),()=>r.garden.delete(l)},destroy(){for(let l of o)l();o.length=0,r.all.clear(),r.stable.clear(),r.object.clear(),r.plantInfo.clear(),r.garden.clear(),n=!1}}}var No=null;function Wo(){return No||(No=Kf()),No}var xs={inventory:"myPetInventoryAtom",hutch:"myPetHutchPetItemsAtom",active:"myPetInfosAtom",slotInfos:"myPetSlotInfosAtom"};function vs(e,t){return{id:e.id,petSpecies:e.petSpecies,name:e.name,xp:e.xp,hunger:e.hunger,mutations:[...e.mutations],targetScale:e.targetScale,abilities:[...e.abilities],location:t,position:null,lastAbilityTrigger:null}}function qf(e,t){let o=t[e.slot.id]?.lastAbilityTrigger??null;return{id:e.slot.id,petSpecies:e.slot.petSpecies,name:e.slot.name,xp:e.slot.xp,hunger:e.slot.hunger,mutations:[...e.slot.mutations],targetScale:e.slot.targetScale,abilities:[...e.slot.abilities],location:"active",position:e.position?{x:e.position.x,y:e.position.y}:null,lastAbilityTrigger:o}}function ws(e){let t=new Set,n=[];for(let i of e.active??[]){let s=qf(i,e.slotInfos??{});n.push(s),t.add(s.id)}let o=[];for(let i of e.inventory??[]){if(t.has(i.id))continue;let s=vs(i,"inventory");o.push(s),t.add(s.id)}let r=[];for(let i of e.hutch??[]){if(t.has(i.id))continue;let s=vs(i,"hutch");r.push(s),t.add(s.id)}let a=[...n,...o,...r];return{all:a,byLocation:{inventory:o,hutch:r,active:n},counts:{inventory:o.length,hutch:r.length,active:n.length,total:a.length}}}var Ss={all:[],byLocation:{inventory:[],hutch:[],active:[]},counts:{inventory:0,hutch:0,active:0,total:0}};function Jf(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}function ks(e){return JSON.stringify({id:e.id,petSpecies:e.petSpecies,name:e.name,mutations:e.mutations,abilities:e.abilities,location:e.location})}function Yf(e,t){if(e.all.length!==t.all.length)return!1;let n=e.all.map(ks),o=t.all.map(ks);return Jf(n,o)}function Bo(e,t){if(e===t)return!0;if(e===null||t===null)return e===t;if(typeof e!=typeof t)return!1;if(typeof e!="object")return e===t;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return!1;for(let i=0;i<e.length;i++)if(!Bo(e[i],t[i]))return!1;return!0}if(Array.isArray(e)||Array.isArray(t))return!1;let n=e,o=t,r=Object.keys(n),a=Object.keys(o);if(r.length!==a.length)return!1;for(let i of r)if(!Object.prototype.hasOwnProperty.call(o,i)||!Bo(n[i],o[i]))return!1;return!0}function Xf(e,t){let n=[],o=new Map(e.all.map(r=>[r.id,r]));for(let r of t.all){let a=o.get(r.id);a&&a.location!==r.location&&n.push({pet:r,from:a.location,to:r.location})}return n}function Qf(e,t){let n=[],o=new Map(e.all.map(r=>[r.id,r]));for(let r of t.all){if(!r.lastAbilityTrigger)continue;let i=o.get(r.id)?.lastAbilityTrigger;(!i||i.abilityId!==r.lastAbilityTrigger.abilityId||i.performedAt!==r.lastAbilityTrigger.performedAt)&&n.push({pet:r,trigger:r.lastAbilityTrigger})}return n}function Zf(e,t){let n=new Set(e.all.map(i=>i.id)),o=new Set(t.all.map(i=>i.id)),r=t.all.filter(i=>!n.has(i.id)),a=e.all.filter(i=>!o.has(i.id));return r.length===0&&a.length===0?null:{added:r,removed:a,counts:t.counts}}function eg(){let e=Ss,t=Ss,n=!1,o=[],r={all:new Set,stable:new Set,location:new Set,ability:new Set,count:new Set},a={},i=Object.keys(xs),s=new Set;function u(){if(s.size<i.length)return;let l=ws(a);if(Bo(e,l)||(t=e,e=l,!n))return;for(let f of r.all)f(e,t);if(!Yf(t,e))for(let f of r.stable)f(e,t);let c=Xf(t,e);for(let f of c)for(let g of r.location)g(f);let p=Qf(t,e);for(let f of p)for(let g of r.ability)g(f);let m=Zf(t,e);if(m)for(let f of r.count)f(m)}async function d(){if(n)return;let l=i.map(async c=>{let p=xs[c],m=await Y.subscribe(p,f=>{a[c]=f,s.add(c),u()});o.push(m)});await Promise.all(l),n=!0,s.size===i.length&&(e=ws(a))}return d(),{get(){return e},subscribe(l){return r.all.add(l),n&&s.size===i.length&&l(e,e),()=>r.all.delete(l)},subscribeStable(l){return r.stable.add(l),n&&s.size===i.length&&l(e,e),()=>r.stable.delete(l)},subscribeLocation(l){return r.location.add(l),()=>r.location.delete(l)},subscribeAbility(l){return r.ability.add(l),()=>r.ability.delete(l)},subscribeCount(l){return r.count.add(l),()=>r.count.delete(l)},destroy(){for(let l of o)l();o.length=0,r.all.clear(),r.stable.clear(),r.location.clear(),r.ability.clear(),r.count.clear(),n=!1}}}var jo=null;function Fo(){return jo||(jo=eg()),jo}function tg(){let e=null,t=[],n=new Set,o={},r=new Set,a=2;function i(c,p){return{x:p%c,y:Math.floor(p/c)}}function s(c,p,m){return m*c+p}function u(c,p){let{cols:m,rows:f}=c,g=m*f,b=new Set,h=new Set,w=new Map,T=[],x=c.userSlotIdxAndDirtTileIdxToGlobalTileIdx??[],v=c.userSlotIdxAndBoardwalkTileIdxToGlobalTileIdx??[],k=Math.max(x.length,v.length);for(let A=0;A<k;A++){let R=x[A]??[],M=v[A]??[],U=R.map((K,N)=>(b.add(K),w.set(K,A),{globalIndex:K,localIndex:N,position:i(m,K)})),J=M.map((K,N)=>(h.add(K),w.set(K,A),{globalIndex:K,localIndex:N,position:i(m,K)}));T.push({userSlotIdx:A,dirtTiles:U,boardwalkTiles:J,allTiles:[...U,...J]})}let L=c.spawnTiles.map(A=>i(m,A)),E={};if(c.locations)for(let[A,R]of Object.entries(c.locations)){let M=R.spawnTileIdx??[];E[A]={name:A,spawnTiles:M,spawnPositions:M.map(U=>i(m,U))}}return{cols:m,rows:f,totalTiles:g,tileSize:p,spawnTiles:c.spawnTiles,spawnPositions:L,locations:E,userSlots:T,globalToXY(A){return i(m,A)},xyToGlobal(A,R){return s(m,A,R)},getTileOwner(A){return w.get(A)??null},isDirtTile(A){return b.has(A)},isBoardwalkTile(A){return h.has(A)}}}function d(){if(r.size<a||e)return;let c=o.map,p=o.tileSize??0;if(c){e=u(c,p);for(let m of n)m(e);n.clear()}}async function l(){let c=await Y.subscribe("mapAtom",m=>{o.map=m,r.add("map"),d()});t.push(c);let p=await Rn.onChangeNow(m=>{o.tileSize=m,r.add("tileSize"),d()});t.push(p)}return l(),{get(){return e},isReady(){return e!==null},onReady(c){return e?(c(e),()=>{}):(n.add(c),()=>n.delete(c))},destroy(){for(let c of t)c();t.length=0,e=null,n.clear()}}}var Vo=null;function Uo(){return Vo||(Vo=tg()),Vo}var Ts={inventory:"myInventoryAtom",isFull:"isMyInventoryAtMaxLengthAtom",selectedItemIndex:"myPossiblyNoLongerValidSelectedItemIndexAtom"},As={items:[],favoritedItemIds:[],count:0,isFull:!1,selectedItem:null};function Ps(e){let t=e.inventory,n=t?.items??[],o=t?.favoritedItemIds??[],r=e.selectedItemIndex,a=null;return r!==null&&r>=0&&r<n.length&&(a={index:r,item:n[r]}),{items:n,favoritedItemIds:o,count:n.length,isFull:e.isFull??!1,selectedItem:a}}function Cs(e){let t=e.items.map(n=>"id"in n?n.id:"species"in n&&n.itemType==="Seed"?`seed:${n.species}:${n.quantity}`:"toolId"in n?`tool:${n.toolId}:${n.quantity}`:"eggId"in n?`egg:${n.eggId}:${n.quantity}`:"decorId"in n?`decor:${n.decorId}:${n.quantity}`:JSON.stringify(n));return JSON.stringify({itemKeys:t,favoritedItemIds:e.favoritedItemIds,isFull:e.isFull,selectedItemIndex:e.selectedItem?.index??null})}function ng(e,t){return Cs(e)===Cs(t)}function $o(e,t){if(e===t)return!0;if(e===null||t===null)return e===t;if(typeof e!=typeof t)return!1;if(typeof e!="object")return e===t;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return!1;for(let i=0;i<e.length;i++)if(!$o(e[i],t[i]))return!1;return!0}if(Array.isArray(e)||Array.isArray(t))return!1;let n=e,o=t,r=Object.keys(n),a=Object.keys(o);if(r.length!==a.length)return!1;for(let i of r)if(!Object.prototype.hasOwnProperty.call(o,i)||!$o(n[i],o[i]))return!1;return!0}function og(e,t){return e===null&&t===null?!1:e===null||t===null?!0:e.index!==t.index}function wn(e){return"id"in e?e.id:"species"in e&&e.itemType==="Seed"?`seed:${e.species}`:"toolId"in e?`tool:${e.toolId}`:"eggId"in e?`egg:${e.eggId}`:"decorId"in e?`decor:${e.decorId}`:JSON.stringify(e)}function rg(e,t){let n=new Set(e.map(wn)),o=new Set(t.map(wn)),r=t.filter(i=>!n.has(wn(i))),a=e.filter(i=>!o.has(wn(i)));return r.length===0&&a.length===0?null:{added:r,removed:a,counts:{before:e.length,after:t.length}}}function ag(e,t){let n=new Set(e),o=new Set(t),r=t.filter(i=>!n.has(i)),a=e.filter(i=>!o.has(i));return r.length===0&&a.length===0?null:{added:r,removed:a,current:t}}function ig(){let e=As,t=As,n=!1,o=[],r={all:new Set,stable:new Set,selection:new Set,items:new Set,favorites:new Set},a={},i=Object.keys(Ts),s=new Set;function u(){if(s.size<i.length)return;let l=Ps(a);if($o(e,l)||(t=e,e=l,!n))return;for(let m of r.all)m(e,t);if(!ng(t,e))for(let m of r.stable)m(e,t);if(og(t.selectedItem,e.selectedItem)){let m={current:e.selectedItem,previous:t.selectedItem};for(let f of r.selection)f(m)}let c=rg(t.items,e.items);if(c)for(let m of r.items)m(c);let p=ag(t.favoritedItemIds,e.favoritedItemIds);if(p)for(let m of r.favorites)m(p)}async function d(){if(n)return;let l=i.map(async c=>{let p=Ts[c],m=await Y.subscribe(p,f=>{a[c]=f,s.add(c),u()});o.push(m)});await Promise.all(l),n=!0,s.size===i.length&&(e=Ps(a))}return d(),{get(){return e},subscribe(l){return r.all.add(l),n&&s.size===i.length&&l(e,e),()=>r.all.delete(l)},subscribeStable(l){return r.stable.add(l),n&&s.size===i.length&&l(e,e),()=>r.stable.delete(l)},subscribeSelection(l){return r.selection.add(l),()=>r.selection.delete(l)},subscribeItems(l){return r.items.add(l),()=>r.items.delete(l)},subscribeFavorites(l){return r.favorites.add(l),()=>r.favorites.delete(l)},destroy(){for(let l of o)l();o.length=0,r.all.clear(),r.stable.clear(),r.selection.clear(),r.items.clear(),r.favorites.clear(),n=!1}}}var zo=null;function Ko(){return zo||(zo=ig()),zo}var Jo={all:[],host:null,count:0};function sg(e,t,n){let o=n.get(e.id),r=o?.slot,a=r?.data,i=r?.lastActionEvent;return{id:e.id,name:e.name,discordId:e.databaseUserId,discordAvatarUrl:e.discordAvatarUrl,guildId:e.guildId,isConnected:e.isConnected,isHost:e.id===t,slotIndex:o?.index??null,position:r?.position??null,cosmetic:{color:e.cosmetic?.color??"",avatar:e.cosmetic?.avatar?[...e.cosmetic.avatar]:[]},emote:{type:e.emoteData?.emoteType??-1},coins:a?.coinsCount??0,inventory:a?.inventory??null,shopPurchases:a?.shopPurchases??null,garden:a?.garden??null,pets:{slots:a?.petSlots??[],slotInfos:r?.petSlotInfos??null},journal:a?.journal??null,stats:a?.stats??null,tasksCompleted:a?.tasksCompleted??[],activityLogs:a?.activityLogs??[],customRestocks:{config:a?.customRestocks??null,inventories:r?.customRestockInventories??null},lastAction:i?{type:i.action,data:i.data,timestamp:i.timestamp}:null,selectedItemIndex:r?.notAuthoritative_selectedItemIndex??null,lastSlotMachineInfo:r?.lastSlotMachineInfo??null}}function Ms(e){let t=e.players,n=e.hostPlayerId??"",o=e.userSlots??[];if(!t||!Array.isArray(t)||t.length===0)return Jo;let r=new Map;Array.isArray(o)&&o.forEach((s,u)=>{s?.type==="user"&&s?.playerId&&r.set(s.playerId,{slot:s,index:u})});let a=t.map(s=>sg(s,n,r)),i=a.find(s=>s.isHost)??null;return{all:a,host:i,count:a.length}}function Is(e){let t=e.all.map(n=>`${n.id}:${n.isConnected}:${n.isHost}`);return JSON.stringify({playerKeys:t,hostId:e.host?.id??null,count:e.count})}function Yo(e,t){if(e===t)return!0;if(e===null||t===null)return e===t;if(typeof e!=typeof t)return!1;if(typeof e!="object")return e===t;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return!1;for(let i=0;i<e.length;i++)if(!Yo(e[i],t[i]))return!1;return!0}if(Array.isArray(e)||Array.isArray(t))return!1;let n=e,o=t,r=Object.keys(n),a=Object.keys(o);if(r.length!==a.length)return!1;for(let i of r)if(!Object.prototype.hasOwnProperty.call(o,i)||!Yo(n[i],o[i]))return!1;return!0}function lg(e,t){let n=[],o=new Set(e.map(a=>a.id)),r=new Set(t.map(a=>a.id));for(let a of t)o.has(a.id)||n.push({player:a,type:"join"});for(let a of e)r.has(a.id)||n.push({player:a,type:"leave"});return n}function cg(e,t){let n=[],o=new Map(e.map(r=>[r.id,r]));for(let r of t){let a=o.get(r.id);a&&a.isConnected!==r.isConnected&&n.push({player:r,isConnected:r.isConnected})}return n}function ug(){let e=Jo,t=Jo,n=!1,o=[],r={all:new Set,stable:new Set,joinLeave:new Set,connection:new Set,host:new Set},a={},i=new Set,s=3;function u(){if(i.size<s)return;let l=Ms(a);if(Yo(e,l)||(t=e,e=l,!n))return;for(let g of r.all)g(e,t);if(Is(t)!==Is(e))for(let g of r.stable)g(e,t);let c=lg(t.all,e.all);for(let g of c)for(let b of r.joinLeave)b(g);let p=cg(t.all,e.all);for(let g of p)for(let b of r.connection)b(g);let m=t.host?.id??null,f=e.host?.id??null;if(m!==f){let g={current:e.host,previous:t.host};for(let b of r.host)b(g)}}async function d(){if(n)return;let l=await Dn.onChangeNow(m=>{a.players=m,i.add("players"),u()});o.push(l);let c=await Hn.onChangeNow(m=>{a.hostPlayerId=m,i.add("hostPlayerId"),u()});o.push(c);let p=await On.onChangeNow(m=>{a.userSlots=m,i.add("userSlots"),u()});o.push(p),n=!0,i.size===s&&(e=Ms(a))}return d(),{get(){return e},subscribe(l){return r.all.add(l),n&&i.size===s&&l(e,e),()=>r.all.delete(l)},subscribeStable(l){return r.stable.add(l),n&&i.size===s&&l(e,e),()=>r.stable.delete(l)},subscribeJoinLeave(l){return r.joinLeave.add(l),()=>r.joinLeave.delete(l)},subscribeConnection(l){return r.connection.add(l),()=>r.connection.delete(l)},subscribeHost(l){return r.host.add(l),()=>r.host.delete(l)},destroy(){for(let l of o)l();o.length=0,r.all.clear(),r.stable.clear(),r.joinLeave.clear(),r.connection.clear(),r.host.clear(),n=!1}}}var qo=null;function Xo(){return qo||(qo=ug()),qo}var Gt=["seed","tool","egg","decor"];function dg(e,t){switch(t){case"seed":return e.species??e.itemType;case"tool":return e.toolId??e.itemType;case"egg":return e.eggId??e.itemType;case"decor":return e.decorId??e.itemType;default:return e.itemType}}function pg(e,t,n){let o=dg(e,t),r=n[o]??0,a=Math.max(0,e.initialStock-r);return{id:o,itemType:e.itemType,initialStock:e.initialStock,purchased:r,remaining:a,isAvailable:a>0}}function mg(e,t,n){if(!t)return{type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null};let r=n[e]?.purchases??{},a=(t.inventory??[]).map(d=>pg(d,e,r)),i=a.filter(d=>d.isAvailable).length,s=t.secondsUntilRestock??0,u=s>0?Date.now()+s*1e3:null;return{type:e,items:a,availableCount:i,totalCount:a.length,secondsUntilRestock:s,restockAt:u}}function Es(e){let t=e.shops,n=e.purchases??{},o=Gt.map(s=>mg(s,t?.[s],n)),r={seed:o[0],tool:o[1],egg:o[2],decor:o[3]},a=o.filter(s=>s.restockAt!==null),i=null;if(a.length>0){let u=a.sort((d,l)=>(d.restockAt??0)-(l.restockAt??0))[0];i={shop:u.type,seconds:u.secondsUntilRestock,at:u.restockAt}}return{all:o,byType:r,nextRestock:i}}var Ls={all:Gt.map(e=>({type:e,items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null})),byType:{seed:{type:"seed",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},tool:{type:"tool",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},egg:{type:"egg",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null},decor:{type:"decor",items:[],availableCount:0,totalCount:0,secondsUntilRestock:0,restockAt:null}},nextRestock:null};function Zo(e,t){if(e===t)return!0;if(e===null||t===null)return e===t;if(typeof e!=typeof t)return!1;if(typeof e!="object")return e===t;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return!1;for(let i=0;i<e.length;i++)if(!Zo(e[i],t[i]))return!1;return!0}if(Array.isArray(e)||Array.isArray(t))return!1;let n=e,o=t,r=Object.keys(n),a=Object.keys(o);if(r.length!==a.length)return!1;for(let i of r)if(!Object.prototype.hasOwnProperty.call(o,i)||!Zo(n[i],o[i]))return!1;return!0}function Rs(e){return JSON.stringify({shops:e.all.map(t=>({type:t.type,itemCount:t.items.length,availableCount:t.availableCount}))})}function fg(e,t){let n=e.secondsUntilRestock,o=t.secondsUntilRestock;return n>0&&n<=5&&o>n||n>0&&o===0&&t.items.some(a=>a.purchased===0)?{shop:t,previousItems:e.items}:null}function gg(e,t){let n=[];for(let o of Gt){let r=e.byType[o],a=t.byType[o],i=new Map(r.items.map(s=>[s.id,s]));for(let s of a.items){let u=i.get(s.id);u&&s.purchased>u.purchased&&n.push({shopType:o,itemId:s.id,quantity:s.purchased-u.purchased,newPurchased:s.purchased,remaining:s.remaining})}}return n}function bg(e,t){let n=[];for(let o of Gt){let r=e.byType[o],a=t.byType[o],i=new Map(r.items.map(s=>[s.id,s]));for(let s of a.items){let u=i.get(s.id);u&&u.isAvailable!==s.isAvailable&&n.push({shopType:o,itemId:s.id,wasAvailable:u.isAvailable,isAvailable:s.isAvailable})}}return n}function hg(){let e=Ls,t=Ls,n=!1,o=[],r={all:new Set,stable:new Set,seedRestock:new Set,toolRestock:new Set,eggRestock:new Set,decorRestock:new Set,purchase:new Set,availability:new Set},a={},i=new Set,s=2;function u(){if(i.size<s)return;let l=Es(a);if(Zo(e,l)||(t=e,e=l,!n))return;for(let f of r.all)f(e,t);if(Rs(t)!==Rs(e))for(let f of r.stable)f(e,t);let c={seed:r.seedRestock,tool:r.toolRestock,egg:r.eggRestock,decor:r.decorRestock};for(let f of Gt){let g=fg(t.byType[f],e.byType[f]);if(g)for(let b of c[f])b(g)}let p=gg(t,e);for(let f of p)for(let g of r.purchase)g(f);let m=bg(t,e);for(let f of m)for(let g of r.availability)g(f)}async function d(){if(n)return;let l=await Gn.onChangeNow(p=>{a.shops=p,i.add("shops"),u()});o.push(l);let c=await _n.onChangeNow(p=>{a.purchases=p,i.add("purchases"),u()});o.push(c),n=!0,i.size===s&&(e=Es(a))}return d(),{get(){return e},getShop(l){return e.byType[l]},getItem(l,c){return e.byType[l].items.find(m=>m.id===c)??null},subscribe(l){return r.all.add(l),n&&i.size===s&&l(e,e),()=>r.all.delete(l)},subscribeStable(l){return r.stable.add(l),n&&i.size===s&&l(e,e),()=>r.stable.delete(l)},subscribeSeedRestock(l){return r.seedRestock.add(l),()=>r.seedRestock.delete(l)},subscribeToolRestock(l){return r.toolRestock.add(l),()=>r.toolRestock.delete(l)},subscribeEggRestock(l){return r.eggRestock.add(l),()=>r.eggRestock.delete(l)},subscribeDecorRestock(l){return r.decorRestock.add(l),()=>r.decorRestock.delete(l)},subscribePurchase(l){return r.purchase.add(l),()=>r.purchase.delete(l)},subscribeAvailability(l){return r.availability.add(l),()=>r.availability.delete(l)},destroy(){for(let l of o)l();o.length=0,r.all.clear(),r.stable.clear(),r.seedRestock.clear(),r.toolRestock.clear(),r.eggRestock.clear(),r.decorRestock.clear(),r.purchase.clear(),r.availability.clear(),n=!1}}}var Qo=null;function er(){return Qo||(Qo=hg()),Qo}var de=null;function Sn(){return de||(de={currentTile:Wo(),myPets:Fo(),gameMap:Uo(),myInventory:Ko(),players:Xo(),shops:er()},de)}function He(){if(!de)throw new Error("[Globals] Not initialized. Call initGlobals() first.");return de}function Os(){de&&(de.currentTile.destroy(),de.myPets.destroy(),de.gameMap.destroy(),de.myInventory.destroy(),de.players.destroy(),de.shops.destroy(),de=null)}var Ds={get currentTile(){return He().currentTile},get myPets(){return He().myPets},get gameMap(){return He().gameMap},get myInventory(){return He().myInventory},get players(){return He().players},get shops(){return He().shops}};var yg={Store:{select:Y.select.bind(Y),set:Y.set.bind(Y),subscribe:Y.subscribe.bind(Y),subscribeImmediate:Y.subscribeImmediate.bind(Y)},Globals:Ds,Modules:{Version:kt,Assets:ye,Manifest:me,Data:Pt,Sprite:Se,Tile:ke,Pixi:Mt,Audio:Ot,Cosmetic:Dt},WebSocket:{chat:Xt,emote:Nr,wish:Wr,kickPlayer:jr,setPlayerData:Br,usurpHost:Fr,reportSpeakingStart:Vr,setSelectedGame:Ur,voteForGame:zr,requestGame:$r,restartGame:Kr,ping:qr,checkWeatherStatus:Xr,move:Jr,playerPosition:$n,teleport:Yr,moveInventoryItem:Qr,dropObject:Zr,pickupObject:ea,toggleFavoriteItem:ta,putItemInStorage:na,retrieveItemFromStorage:oa,moveStorageItem:ra,logItems:aa,plantSeed:ia,waterPlant:sa,harvestCrop:la,sellAllCrops:ca,purchaseDecor:ua,purchaseEgg:da,purchaseTool:pa,purchaseSeed:ma,plantEgg:fa,hatchEgg:ga,plantGardenPlant:ba,potPlant:ha,mutationPotion:ya,pickupDecor:xa,placeDecor:va,removeGardenObject:wa,placePet:Sa,feedPet:ka,petPositions:Ta,swapPet:Aa,storePet:Pa,namePet:Ca,sellPet:Ma},_internal:{getGlobals:He,initGlobals:Sn,destroyGlobals:Os}};function Hs(){P.Gemini=yg}function tr(e){e.logStep("WebSocket","Capturing WebSocket...");let t=null;return t=Yt(n=>{n.ws&&(e.logStep("WebSocket","WebSocket captured","success"),t?.(),t=null)},{intervalMs:250}),ri({debug:!1}),()=>{t?.(),t=null}}async function nr(e){e.logStep("Atoms","Prewarming Jotai store...");try{await In(),await Nt({timeoutMs:8e3,intervalMs:50}),e.logStep("Atoms","Jotai store ready","success")}catch(t){e.logStep("Atoms","Jotai store not captured yet","error"),console.warn("[Bootstrap] Jotai store wait failed",t)}}function or(e){e.logStep("Globals","Initializing global variables...");try{Sn(),e.logStep("Globals","Global variables ready","success")}catch(t){e.logStep("Globals","Failed to initialize global variables","error"),console.warn("[Bootstrap] Global variables init failed",t)}}function rr(e){e.logStep("API","Exposing Gemini API...");try{Hs(),e.logStep("API","Gemini API ready","success")}catch(t){e.logStep("API","Failed to expose API","error"),console.warn("[Bootstrap] API init failed",t)}}function ar(e){e.logStep("HUD","Loading HUD preferences...");let t=to(),n=eo({hostId:"gemini-hud-root",initialWidth:t.width,initialOpen:t.isOpen,onWidthChange:o=>Qe("width",o),onOpenChange:o=>Qe("isOpen",o),themes:Oe,initialTheme:t.theme,onThemeChange:o=>Qe("theme",o),buildSections:o=>Kn({applyTheme:o.applyTheme,initialTheme:o.initialTheme,getCurrentTheme:o.getCurrentTheme}),initialTab:t.activeTab,onTabChange:o=>Qe("activeTab",o)});return e.logStep("HUD","HUD ready","success"),n}async function ir(e){e.setSubtitle("Activating Gemini modules..."),await fs(t=>{t.status==="start"?e.logStep(t.name,`Loading ${t.name}...`):t.status==="success"?e.logStep(t.name,`${t.name} ready`,"success"):e.logStep(t.name,`${t.name} encountered an issue.`,"error")})}Mn();(async function(){"use strict";let e=Nn({title:"Gemini is loading",subtitle:"Connecting and preparing modules..."}),t=null,n=null;try{t=tr(e),await nr(e),or(e),rr(e),n=ar(e),await ir(e),e.succeed("Gemini is ready!")}catch(o){e.fail("Failed to initialize the mod.",o)}finally{t?.()}if(n){let o=n;Zt({onClick:()=>o.setOpen(!0)})}})();})();
