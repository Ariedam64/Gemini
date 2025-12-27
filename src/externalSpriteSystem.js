// ==UserScript==
// @name         MagicGarden - Sprite Catalog (Gemini build)
// @namespace    mg
// @version      2.3.0
// @description  Preload sprites at load
// @match        https://magicgarden.gg/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @connect      magicgarden.gg
// ==/UserScript==

"use strict";
(() => {
  // gemini-modules/modules/sprite/settings.ts
  var DEFAULT_CFG = {
    origin: "https://magicgarden.gg",
    key: { ctrl: true, shift: true, code: "KeyK" },
    panelW: 480,
    pad: 12,
    cell: 320,
    // larger HUD cells for bigger previews
    gap: 10,
    bgA: 0.72,
    maxItems: 3500,
    catLevels: 1,
    labelMax: 28,
    labelH: 26,
    animFps: 8,
    animMaxFrames: 60,
    prebuildCells: 220,
    prebuildBatch: 28,
    prebuildBudgetMs: 5,
    jobOn: true,
    jobBudgetMs: 5,
    jobBurstMs: 12,
    jobBurstWindowMs: 400,
    jobCapPerTick: 20,
    cacheOn: true,
    cacheMaxEntries: 1200,
    cacheMaxCost: 5e3,
    keepCacheOnClose: true,
    srcCanvasMax: 450,
    debugLog: true,
    debugLimitDefault: 25
  };
  var MUT_META = {
    Gold: { overlayTall: null, tallIconOverride: null },
    Rainbow: { overlayTall: null, tallIconOverride: null, angle: 130, angleTall: 0 },
    Wet: { overlayTall: "sprite/mutation-overlay/WetTallPlant", tallIconOverride: "sprite/mutation/Puddle" },
    Chilled: { overlayTall: "sprite/mutation-overlay/ChilledTallPlant", tallIconOverride: null },
    Frozen: { overlayTall: "sprite/mutation-overlay/FrozenTallPlant", tallIconOverride: null },
    Dawnlit: { overlayTall: null, tallIconOverride: null },
    Ambershine: { overlayTall: null, tallIconOverride: null },
    Dawncharged: { overlayTall: null, tallIconOverride: null },
    Ambercharged: { overlayTall: null, tallIconOverride: null }
  };
  var MUT_NAMES = Object.keys(MUT_META);
  var MUT_G1 = ["", "Gold", "Rainbow"].filter(Boolean);
  var MUT_G2 = ["", "Wet", "Chilled", "Frozen"].filter(Boolean);
  var MUT_G3 = ["", "Dawnlit", "Ambershine", "Dawncharged", "Ambercharged"].filter(Boolean);

  // gemini-modules/modules/sprite/state.ts
  function createInitialState() {
    return {
      started: false,
      open: false,
      loaded: false,
      version: null,
      base: null,
      ctors: null,
      app: null,
      renderer: null,
      cat: "__all__",
      q: "",
      f: "",
      mutOn: false,
      mutations: [],
      scroll: 0,
      items: [],
      filtered: [],
      cats: /* @__PURE__ */ new Map(),
      tex: /* @__PURE__ */ new Map(),
      lru: /* @__PURE__ */ new Map(),
      cost: 0,
      jobs: [],
      jobMap: /* @__PURE__ */ new Set(),
      srcCan: /* @__PURE__ */ new Map(),
      atlasBases: /* @__PURE__ */ new Set(),
      dbgCount: {},
      sig: "",
      changedAt: 0,
      needsLayout: false,
      overlay: null,
      bg: null,
      grid: null,
      dom: null,
      selCat: null,
      count: null,
      pool: [],
      active: /* @__PURE__ */ new Map(),
      anim: /* @__PURE__ */ new Set()
    };
  }
  function createSpriteContext() {
    return {
      cfg: { ...DEFAULT_CFG },
      state: createInitialState()
    };
  }

  // gemini-modules/modules/sprite/utils/async.ts
  var sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  async function waitWithTimeout(p, ms, label) {
    const t0 = performance.now();
    while (performance.now() - t0 < ms) {
      const result = await Promise.race([p, sleep(50).then(() => null)]);
      if (result !== null)
        return result;
    }
    throw new Error(`${label} timeout`);
  }

  // gemini-modules/modules/sprite/pixi/hooks.ts
  function createPixiHooks() {
    let appResolver;
    let rdrResolver;
    const appReady = new Promise((resolve) => appResolver = resolve);
    const rendererReady = new Promise((resolve) => rdrResolver = resolve);
    let APP = null;
    let RDR = null;
    let PIXI_VER = null;
    const hook = (name, cb) => {
      const root = globalThis.unsafeWindow || globalThis;
      const prev = root[name];
      root[name] = function() {
        try {
          cb.apply(this, arguments);
        } finally {
          if (typeof prev === "function") {
            try {
              prev.apply(this, arguments);
            } catch (e) {
            }
          }
        }
      };
    };
    hook("__PIXI_APP_INIT__", (a, v) => {
      if (!APP) {
        APP = a;
        PIXI_VER = v;
        appResolver(a);
      }
    });
    hook("__PIXI_RENDERER_INIT__", (r, v) => {
      if (!RDR) {
        RDR = r;
        PIXI_VER = v;
        rdrResolver(r);
      }
    });
    return {
      get app() {
        return APP;
      },
      get renderer() {
        return RDR;
      },
      get pixiVersion() {
        return PIXI_VER;
      },
      appReady,
      rendererReady
    };
  }
  async function waitForPixi(handles, timeoutMs = 15e3) {
    const app = await waitWithTimeout(handles.appReady, timeoutMs, "PIXI app");
    const renderer = await waitWithTimeout(handles.rendererReady, timeoutMs, "PIXI renderer");
    return { app, renderer, version: handles.pixiVersion };
  }

  // gemini-modules/modules/sprite/utils/pixi.ts
  function findAny(root, pred, lim = 25e3) {
    const stack = [root];
    const seen = /* @__PURE__ */ new Set();
    let n = 0;
    while (stack.length && n++ < lim) {
      const node = stack.pop();
      if (!node || seen.has(node))
        continue;
      seen.add(node);
      if (pred(node))
        return node;
      const children = node.children;
      if (Array.isArray(children)) {
        for (let i = children.length - 1; i >= 0; i -= 1)
          stack.push(children[i]);
      }
    }
    return null;
  }
  function getCtors(app) {
    var _a;
    const P = globalThis.PIXI || ((_a = globalThis.unsafeWindow) == null ? void 0 : _a.PIXI);
    if ((P == null ? void 0 : P.Texture) && (P == null ? void 0 : P.Sprite) && (P == null ? void 0 : P.Container) && (P == null ? void 0 : P.Rectangle)) {
      return { Container: P.Container, Sprite: P.Sprite, Texture: P.Texture, Rectangle: P.Rectangle, Text: P.Text || null };
    }
    const stage = app == null ? void 0 : app.stage;
    const anySpr = findAny(stage, (x) => {
      var _a2, _b, _c, _d;
      return ((_a2 = x == null ? void 0 : x.texture) == null ? void 0 : _a2.frame) && (x == null ? void 0 : x.constructor) && ((_b = x == null ? void 0 : x.texture) == null ? void 0 : _b.constructor) && ((_d = (_c = x == null ? void 0 : x.texture) == null ? void 0 : _c.frame) == null ? void 0 : _d.constructor);
    });
    if (!anySpr)
      throw new Error("No Sprite found (ctors).");
    const anyTxt = findAny(stage, (x) => (typeof (x == null ? void 0 : x.text) === "string" || typeof (x == null ? void 0 : x.text) === "number") && (x == null ? void 0 : x.style));
    return {
      Container: stage.constructor,
      Sprite: anySpr.constructor,
      Texture: anySpr.texture.constructor,
      Rectangle: anySpr.texture.frame.constructor,
      Text: (anyTxt == null ? void 0 : anyTxt.constructor) || null
    };
  }
  var baseTexOf = (tex) => {
    var _a, _b, _c, _d, _e;
    return (_e = (_d = (_c = (_b = tex == null ? void 0 : tex.baseTexture) != null ? _b : (_a = tex == null ? void 0 : tex.source) == null ? void 0 : _a.baseTexture) != null ? _c : tex == null ? void 0 : tex.source) != null ? _d : tex == null ? void 0 : tex._baseTexture) != null ? _e : null;
  };
  function rememberBaseTex(tex, atlasBases) {
    const base = baseTexOf(tex);
    if (base)
      atlasBases.add(base);
  }

  // gemini-modules/modules/sprite/utils/path.ts
  var splitKey = (key) => String(key || "").split("/").filter(Boolean);
  var joinPath = (base, path) => base.replace(/\/?$/, "/") + String(path || "").replace(/^\//, "");
  var dirOf = (path) => path.lastIndexOf("/") >= 0 ? path.slice(0, path.lastIndexOf("/") + 1) : "";
  var relPath = (base, path) => typeof path === "string" ? path.startsWith("/") ? path.slice(1) : dirOf(base) + path : path;
  function categoryOf(key, cfg) {
    const parts = splitKey(key);
    const start2 = parts[0] === "sprite" || parts[0] === "sprites" ? 1 : 0;
    const width = Math.max(1, cfg.catLevels | 0);
    return parts.slice(start2, start2 + width).join("/") || "misc";
  }
  function labelOf(key, cfg) {
    const parts = splitKey(key);
    const start2 = (parts[0] === "sprite" || parts[0] === "sprites" ? 1 : 0) + Math.max(1, cfg.catLevels | 0);
    const name = parts.slice(start2).join("/") || parts[parts.length - 1] || "";
    if (name.length <= cfg.labelMax)
      return name;
    return `${name.slice(0, Math.max(0, cfg.labelMax - 3))}...`;
  }
  function animParse(key) {
    const parts = splitKey(key);
    const last = parts[parts.length - 1];
    const match = last && last.match(/^(.*?)(?:[_-])(\d{1,6})(\.[a-z0-9]+)?$/i);
    if (!match)
      return null;
    const baseName = (match[1] || "") + (match[3] || "");
    const idx = Number(match[2]);
    if (!baseName || !Number.isFinite(idx))
      return null;
    return { baseKey: parts.slice(0, -1).concat(baseName).join("/"), idx, frameKey: key };
  }

  // gemini-modules/modules/sprite/data/assetFetcher.ts
  function gm(url, type = "text") {
    return new Promise(
      (resolve, reject) => GM_xmlhttpRequest({
        method: "GET",
        url,
        responseType: type,
        onload: (r) => r.status >= 200 && r.status < 300 ? resolve(r) : reject(new Error(`HTTP ${r.status} (${url})`)),
        onerror: () => reject(new Error(`Network (${url})`)),
        ontimeout: () => reject(new Error(`Timeout (${url})`))
      })
    );
  }
  var getJSON = async (url) => JSON.parse((await gm(url, "text")).responseText);
  var getBlob = async (url) => (await gm(url, "blob")).response;
  function blobToImage(blob) {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve(img);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("decode fail"));
      };
      img.src = url;
    });
  }
  function extractAtlasJsons(manifest) {
    const jsons = /* @__PURE__ */ new Set();
    for (const bundle of manifest.bundles || []) {
      for (const asset of bundle.assets || []) {
        for (const src of asset.src || []) {
          if (typeof src !== "string")
            continue;
          if (!src.endsWith(".json"))
            continue;
          if (src === "manifest.json")
            continue;
          if (src.startsWith("audio/"))
            continue;
          jsons.add(src);
        }
      }
    }
    return jsons;
  }
  async function loadAtlasJsons(base, manifest) {
    const jsons = extractAtlasJsons(manifest);
    const seen = /* @__PURE__ */ new Set();
    const data = {};
    const loadOne = async (path) => {
      var _a;
      if (seen.has(path))
        return;
      seen.add(path);
      const json = await getJSON(joinPath(base, path));
      data[path] = json;
      if ((_a = json == null ? void 0 : json.meta) == null ? void 0 : _a.related_multi_packs) {
        for (const rel of json.meta.related_multi_packs) {
          await loadOne(relPath(path, rel));
        }
      }
    };
    for (const p of jsons) {
      await loadOne(p);
    }
    return data;
  }

  // gemini-modules/modules/sprite/pixi/atlasToTextures.ts
  var isAtlas = (j) => j && typeof j === "object" && j.frames && j.meta && typeof j.meta.image === "string";
  function mkRect(Rectangle, x, y, w, h) {
    return new Rectangle(x, y, w, h);
  }
  function mkSubTex(Texture, baseTex, frame, orig, trim, rotate, anchor) {
    var _a, _b, _c;
    let t;
    try {
      t = new Texture({ source: baseTex.source, frame, orig, trim: trim || void 0, rotate: rotate || 0 });
    } catch (e) {
      t = new Texture((_a = baseTex.baseTexture) != null ? _a : baseTex, frame, orig, trim || void 0, rotate || 0);
    }
    try {
      if (t && !t.label)
        t.label = (frame == null ? void 0 : frame.width) && (frame == null ? void 0 : frame.height) ? `sub:${frame.width}x${frame.height}` : "subtex";
    } catch (e) {
    }
    if (anchor) {
      const target = t;
      if ((_b = target.defaultAnchor) == null ? void 0 : _b.set) {
        try {
          target.defaultAnchor.set(anchor.x, anchor.y);
        } catch (e) {
        }
      }
      if (target.defaultAnchor && !target.defaultAnchor.set) {
        target.defaultAnchor.x = anchor.x;
        target.defaultAnchor.y = anchor.y;
      }
      if (!target.defaultAnchor) {
        target.defaultAnchor = { x: anchor.x, y: anchor.y };
      }
    }
    try {
      (_c = t == null ? void 0 : t.updateUvs) == null ? void 0 : _c.call(t);
    } catch (e) {
    }
    return t;
  }
  function buildAtlasTextures(data, baseTex, texMap, atlasBases, ctors) {
    var _a;
    const { Texture, Rectangle } = ctors;
    try {
      if (baseTex && !baseTex.label)
        baseTex.label = ((_a = data == null ? void 0 : data.meta) == null ? void 0 : _a.image) || "atlasBase";
    } catch (e) {
    }
    rememberBaseTex(baseTex, atlasBases);
    for (const [k, fd] of Object.entries(data.frames)) {
      const fr = fd.frame;
      const rot = fd.rotated ? 2 : 0;
      const w = fd.rotated ? fr.h : fr.w;
      const h = fd.rotated ? fr.w : fr.h;
      const frame = mkRect(Rectangle, fr.x, fr.y, w, h);
      const ss = fd.sourceSize || { w: fr.w, h: fr.h };
      const orig = mkRect(Rectangle, 0, 0, ss.w, ss.h);
      let trim = null;
      if (fd.trimmed && fd.spriteSourceSize) {
        const s = fd.spriteSourceSize;
        trim = mkRect(Rectangle, s.x, s.y, s.w, s.h);
      }
      const t = mkSubTex(Texture, baseTex, frame, orig, trim, rot, fd.anchor || null);
      try {
        t.label = k;
      } catch (e) {
      }
      rememberBaseTex(t, atlasBases);
      texMap.set(k, t);
    }
  }

  // gemini-modules/modules/sprite/data/catalogIndexer.ts
  function buildItemsFromTextures(tex, cfg) {
    const keys = [...tex.keys()].sort((a, b) => a.localeCompare(b));
    const used = /* @__PURE__ */ new Set();
    const items = [];
    const cats = /* @__PURE__ */ new Map();
    const addToCat = (key, item) => {
      const cat = categoryOf(key, cfg);
      if (!cats.has(cat))
        cats.set(cat, []);
      cats.get(cat).push(item);
    };
    for (const key of keys) {
      const texEntry = tex.get(key);
      if (!texEntry || used.has(key))
        continue;
      const anim = animParse(key);
      if (!anim) {
        const item = { key, isAnim: false, first: texEntry };
        items.push(item);
        addToCat(key, item);
        continue;
      }
      const frames = [];
      for (const candidate of keys) {
        const maybe = animParse(candidate);
        if (!maybe || maybe.baseKey !== anim.baseKey)
          continue;
        const t = tex.get(candidate);
        if (!t)
          continue;
        frames.push({ idx: maybe.idx, tex: t });
        used.add(candidate);
      }
      frames.sort((a, b) => a.idx - b.idx);
      const ordered = frames.map((f) => f.tex);
      if (ordered.length === 1) {
        const item = { key: anim.baseKey, isAnim: false, first: ordered[0] };
        items.push(item);
        addToCat(anim.baseKey, item);
      } else if (ordered.length > 1) {
        const item = {
          key: anim.baseKey,
          isAnim: true,
          frames: ordered,
          first: ordered[0],
          count: ordered.length
        };
        items.push(item);
        addToCat(anim.baseKey, item);
      }
    }
    return { items, cats };
  }

  // gemini-modules/modules/sprite/mutations/variantBuilder.ts
  var TILE_SIZE_WORLD = 256;
  var BASE_ICON_SCALE = 0.5;
  var TALL_PLANT_MUTATION_ICON_SCALE_BOOST = 2;
  var FLOATING_MUTATION_ICONS = /* @__PURE__ */ new Set([
    "Dawnlit",
    "Ambershine",
    "Dawncharged",
    "Ambercharged"
  ]);
  var MUT_ICON_Y_EXCEPT = {
    Banana: 0.6,
    Carrot: 0.6,
    Sunflower: 0.5,
    Starweaver: 0.5,
    FavaBean: 0.25,
    BurrosTail: 0.2
  };
  var MUT_ICON_X_EXCEPT = {
    Pepper: 0.5,
    Banana: 0.6
  };
  var MUTATION_ORDER = ["Gold", "Rainbow", "Wet", "Chilled", "Frozen", "Ambershine", "Dawnlit", "Dawncharged", "Ambercharged"];
  var MUTATION_INDEX = new Map(MUTATION_ORDER.map((m, idx) => [m, idx]));
  var sortMutations = (list) => {
    const uniq = [...new Set(list.filter(Boolean))];
    return uniq.sort((a, b) => {
      var _a, _b;
      return ((_a = MUTATION_INDEX.get(a)) != null ? _a : Infinity) - ((_b = MUTATION_INDEX.get(b)) != null ? _b : Infinity);
    });
  };
  var SUPPORTED_BLEND_OPS = (() => {
    try {
      const c = document.createElement("canvas");
      const g = c.getContext("2d");
      if (!g)
        return /* @__PURE__ */ new Set();
      const ops = ["color", "hue", "saturation", "luminosity", "overlay", "screen", "lighter", "source-atop"];
      const ok = /* @__PURE__ */ new Set();
      for (const op of ops) {
        g.globalCompositeOperation = op;
        if (g.globalCompositeOperation === op)
          ok.add(op);
      }
      return ok;
    } catch (e) {
      return /* @__PURE__ */ new Set();
    }
  })();
  var pickBlendOp = (desired) => {
    if (SUPPORTED_BLEND_OPS.has(desired))
      return desired;
    if (SUPPORTED_BLEND_OPS.has("overlay"))
      return "overlay";
    if (SUPPORTED_BLEND_OPS.has("screen"))
      return "screen";
    if (SUPPORTED_BLEND_OPS.has("lighter"))
      return "lighter";
    return "source-atop";
  };
  var FILTERS = {
    Gold: { op: "source-atop", colors: ["rgb(235,200,0)"], a: 0.7 },
    Rainbow: { op: "color", colors: ["#FF1744", "#FF9100", "#FFEA00", "#00E676", "#2979FF", "#D500F9"], ang: 130, angTall: 0, masked: true },
    Wet: { op: "source-atop", colors: ["rgb(50,180,200)"], a: 0.25 },
    Chilled: { op: "source-atop", colors: ["rgb(100,160,210)"], a: 0.45 },
    Frozen: { op: "source-atop", colors: ["rgb(100,130,220)"], a: 0.5 },
    Dawnlit: { op: "source-atop", colors: ["rgb(209,70,231)"], a: 0.5 },
    Ambershine: { op: "source-atop", colors: ["rgb(190,100,40)"], a: 0.5 },
    Dawncharged: { op: "source-atop", colors: ["rgb(140,80,200)"], a: 0.5 },
    Ambercharged: { op: "source-atop", colors: ["rgb(170,60,25)"], a: 0.5 }
  };
  var hasMutationFilter = (value) => Boolean(value && FILTERS[value]);
  var isTallKey = (k) => /tallplant/i.test(k);
  var computeVariantSignature = (state) => {
    if (!state.mutOn) {
      const f = hasMutationFilter(state.f) ? state.f : null;
      const baseMuts = f ? [f] : [];
      return { mode: "F", muts: baseMuts, overlayMuts: baseMuts, selectedMuts: baseMuts, sig: `F:${f != null ? f : ""}` };
    }
    const raw = state.mutations.filter((value) => hasMutationFilter(value));
    const selected = sortMutations(raw);
    const muts = normalizeMutListColor(raw);
    const overlayMuts = normalizeMutListOverlay(raw);
    return {
      mode: "M",
      muts,
      overlayMuts,
      selectedMuts: selected,
      sig: `M:${selected.join(",")}|${muts.join(",")}|${overlayMuts.join(",")}`
    };
  };
  var curVariant = computeVariantSignature;
  var normalizeMutListColor = (list) => {
    const names = list.filter((m, idx, arr) => FILTERS[m] && arr.indexOf(m) === idx);
    if (!names.length)
      return [];
    if (names.includes("Gold"))
      return ["Gold"];
    if (names.includes("Rainbow"))
      return ["Rainbow"];
    const warm = ["Ambershine", "Dawnlit", "Dawncharged", "Ambercharged"];
    const hasWarm = names.some((n) => warm.includes(n));
    if (hasWarm) {
      return sortMutations(names.filter((n) => !["Wet", "Chilled", "Frozen"].includes(n)));
    }
    return sortMutations(names);
  };
  var normalizeMutListOverlay = (list) => {
    const names = list.filter((m, idx, arr) => {
      var _a;
      return ((_a = MUT_META[m]) == null ? void 0 : _a.overlayTall) && arr.indexOf(m) === idx;
    });
    return sortMutations(names);
  };
  var buildMutationPipeline = (mutNames, isTall) => mutNames.map((m) => {
    var _a;
    return { name: m, meta: MUT_META[m], overlayTall: (_a = MUT_META[m]) == null ? void 0 : _a.overlayTall, isTall };
  });
  var angleGrad = (ctx2, w, h, ang, fullSpan = false) => {
    const rad = (ang - 90) * Math.PI / 180;
    const cx = w / 2;
    const cy = h / 2;
    if (!fullSpan) {
      const R2 = Math.min(w, h) / 2;
      return ctx2.createLinearGradient(cx - Math.cos(rad) * R2, cy - Math.sin(rad) * R2, cx + Math.cos(rad) * R2, cy + Math.sin(rad) * R2);
    }
    const dx = Math.cos(rad);
    const dy = Math.sin(rad);
    const R = Math.abs(dx) * w / 2 + Math.abs(dy) * h / 2;
    return ctx2.createLinearGradient(cx - dx * R, cy - dy * R, cx + dx * R, cy + dy * R);
  };
  var fillGrad = (ctx2, w, h, f, fullSpan = false) => {
    var _a;
    const cols = ((_a = f.colors) == null ? void 0 : _a.length) ? f.colors : ["#fff"];
    const g = f.ang != null ? angleGrad(ctx2, w, h, f.ang, fullSpan) : ctx2.createLinearGradient(0, 0, 0, h);
    if (cols.length === 1) {
      g.addColorStop(0, cols[0]);
      g.addColorStop(1, cols[0]);
    } else
      cols.forEach((c, i) => g.addColorStop(i / (cols.length - 1), c));
    ctx2.fillStyle = g;
    ctx2.fillRect(0, 0, w, h);
  };
  function mutationAliases(mut) {
    switch (mut) {
      case "Ambershine":
        return ["Ambershine", "Amberlit"];
      case "Dawncharged":
        return ["Dawncharged", "Dawnbound"];
      case "Ambercharged":
        return ["Ambercharged", "Amberbound"];
      default:
        return [mut];
    }
  }
  function applyFilterOnto(ctx2, sourceCanvas, name, isTall) {
    const base = FILTERS[name];
    if (!base)
      return;
    const f = { ...base };
    if (name === "Rainbow" && isTall && f.angTall != null)
      f.ang = f.angTall;
    const fullSpan = name === "Rainbow" && isTall;
    const w = sourceCanvas.width;
    const h = sourceCanvas.height;
    ctx2.save();
    const blendOp = f.masked ? pickBlendOp(f.op) : "source-in";
    ctx2.globalCompositeOperation = blendOp;
    if (f.a != null)
      ctx2.globalAlpha = f.a;
    if (f.masked) {
      const m = document.createElement("canvas");
      m.width = w;
      m.height = h;
      const mctx = m.getContext("2d");
      mctx.imageSmoothingEnabled = false;
      fillGrad(mctx, w, h, f, fullSpan);
      mctx.globalCompositeOperation = "destination-in";
      mctx.drawImage(sourceCanvas, 0, 0);
      ctx2.drawImage(m, 0, 0);
    } else {
      fillGrad(ctx2, w, h, f, fullSpan);
    }
    ctx2.restore();
  }
  function variantKey(it, V) {
    return `${V.sig}::${it.key}`;
  }
  function tallOverlayFromSheet(mutName, state) {
    const target = String(mutName || "").toLowerCase();
    for (const k of state.tex.keys()) {
      const m = /sprite\/mutation-overlay\/([A-Za-z0-9]+)TallPlant/i.exec(String(k));
      if (!m || !m[1])
        continue;
      const prefix = m[1].toLowerCase();
      if (prefix === target) {
        const t = state.tex.get(k);
        if (t)
          return { tex: t, key: k };
      }
    }
    return null;
  }
  function findOverlayTexture(itKey, mutName, state, preferTall) {
    if (!mutName)
      return null;
    const base = baseNameOf(itKey);
    const aliases = mutationAliases(mutName);
    for (const name of aliases) {
      const tries = [
        `sprite/mutation/${name}${base}`,
        `sprite/mutation/${name}-${base}`,
        `sprite/mutation/${name}_${base}`,
        `sprite/mutation/${name}/${base}`,
        `sprite/mutation/${name}`
      ];
      for (const k of tries) {
        const t = state.tex.get(k);
        if (t)
          return { tex: t, key: k };
      }
      if (preferTall) {
        const hit = state.tex.get(`sprite/mutation-overlay/${name}TallPlant`) && {
          tex: state.tex.get(`sprite/mutation-overlay/${name}TallPlant`),
          key: `sprite/mutation-overlay/${name}TallPlant`
        } || state.tex.get(`sprite/mutation-overlay/${name}`) && {
          tex: state.tex.get(`sprite/mutation-overlay/${name}`),
          key: `sprite/mutation-overlay/${name}`
        } || tallOverlayFromSheet(mutName, state);
        if (hit)
          return hit;
      }
    }
    return null;
  }
  function findIconTexture(itKey, mutName, isTall, state) {
    if (!mutName)
      return null;
    const meta = MUT_META[mutName];
    if (isTall && (meta == null ? void 0 : meta.tallIconOverride)) {
      const t = state.tex.get(meta.tallIconOverride);
      if (t)
        return t;
    }
    const base = baseNameOf(itKey);
    const aliases = mutationAliases(mutName);
    for (const name of aliases) {
      const tries = [
        `sprite/mutation/${name}Icon`,
        `sprite/mutation/${name}`,
        `sprite/mutation/${name}${base}`,
        `sprite/mutation/${name}-${base}`,
        `sprite/mutation/${name}_${base}`,
        `sprite/mutation/${name}/${base}`
      ];
      for (const k of tries) {
        const t = state.tex.get(k);
        if (t)
          return t;
      }
      if (isTall) {
        const t = state.tex.get(`sprite/mutation-overlay/${name}TallPlantIcon`) || state.tex.get(`sprite/mutation-overlay/${name}TallPlant`);
        if (t)
          return t;
      }
    }
    return null;
  }
  var baseNameOf = (k) => {
    const p = String(k || "").split("/");
    return p[p.length - 1] || "";
  };
  function computeIconLayout(tex, baseName, isTall) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
    const width = (_e = (_d = (_c = (_a = tex == null ? void 0 : tex.orig) == null ? void 0 : _a.width) != null ? _c : (_b = tex == null ? void 0 : tex.frame) == null ? void 0 : _b.width) != null ? _d : tex == null ? void 0 : tex.width) != null ? _e : 1;
    const height = (_j = (_i = (_h = (_f = tex == null ? void 0 : tex.orig) == null ? void 0 : _f.height) != null ? _h : (_g = tex == null ? void 0 : tex.frame) == null ? void 0 : _g.height) != null ? _i : tex == null ? void 0 : tex.height) != null ? _j : 1;
    const anchorX = (_l = (_k = tex == null ? void 0 : tex.defaultAnchor) == null ? void 0 : _k.x) != null ? _l : 0;
    const anchorY = (_n = (_m = tex == null ? void 0 : tex.defaultAnchor) == null ? void 0 : _m.y) != null ? _n : 0;
    let targetX = (_o = MUT_ICON_X_EXCEPT[baseName]) != null ? _o : anchorX;
    const isVerticalShape = height > width * 1.5;
    let targetY = (_p = MUT_ICON_Y_EXCEPT[baseName]) != null ? _p : isVerticalShape ? anchorY : 0.4;
    const offset = {
      x: (targetX - anchorX) * width,
      y: (targetY - anchorY) * height
    };
    const minDimension = Math.min(width, height);
    const scaleFactor = Math.min(1.5, minDimension / TILE_SIZE_WORLD);
    let iconScale = BASE_ICON_SCALE * scaleFactor;
    if (isTall)
      iconScale *= TALL_PLANT_MUTATION_ICON_SCALE_BOOST;
    return {
      width,
      height,
      anchorX,
      anchorY,
      offset,
      iconScale,
      content: {
        x: 0,
        y: 0,
        width,
        height,
        centerX: 0.5,
        centerY: 0.5,
        top: 0
      }
    };
  }
  function textureToCanvas(tex, state, cfg) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
    const hit = state.srcCan.get(tex);
    if (hit)
      return hit;
    let c = null;
    const RDR = state.renderer;
    try {
      if ((_a = RDR == null ? void 0 : RDR.extract) == null ? void 0 : _a.canvas) {
        const s = new state.ctors.Sprite(tex);
        c = RDR.extract.canvas(s);
        (_b = s.destroy) == null ? void 0 : _b.call(s, { children: true, texture: false, baseTexture: false });
      }
    } catch (e) {
    }
    if (!c) {
      const fr = (tex == null ? void 0 : tex.frame) || (tex == null ? void 0 : tex._frame);
      const orig = (tex == null ? void 0 : tex.orig) || (tex == null ? void 0 : tex._orig);
      const trim = (tex == null ? void 0 : tex.trim) || (tex == null ? void 0 : tex._trim);
      const rot = (tex == null ? void 0 : tex.rotate) || (tex == null ? void 0 : tex._rotate) || 0;
      const src = ((_d = (_c = tex == null ? void 0 : tex.baseTexture) == null ? void 0 : _c.resource) == null ? void 0 : _d.source) || ((_e = tex == null ? void 0 : tex.baseTexture) == null ? void 0 : _e.resource) || ((_g = (_f = tex == null ? void 0 : tex.source) == null ? void 0 : _f.resource) == null ? void 0 : _g.source) || ((_h = tex == null ? void 0 : tex.source) == null ? void 0 : _h.resource) || ((_j = (_i = tex == null ? void 0 : tex._source) == null ? void 0 : _i.resource) == null ? void 0 : _j.source) || null;
      if (!fr || !src)
        throw new Error("texToCanvas fail");
      c = document.createElement("canvas");
      const fullW = Math.max(1, ((_k = orig == null ? void 0 : orig.width) != null ? _k : fr.width) | 0);
      const fullH = Math.max(1, ((_l = orig == null ? void 0 : orig.height) != null ? _l : fr.height) | 0);
      const offX = (_m = trim == null ? void 0 : trim.x) != null ? _m : 0;
      const offY = (_n = trim == null ? void 0 : trim.y) != null ? _n : 0;
      c.width = fullW;
      c.height = fullH;
      const ctx2 = c.getContext("2d");
      ctx2.imageSmoothingEnabled = false;
      const rotated = rot === true || rot === 2 || rot === 8;
      if (rotated) {
        ctx2.save();
        ctx2.translate(offX + fr.height / 2, offY + fr.width / 2);
        ctx2.rotate(-Math.PI / 2);
        ctx2.drawImage(src, fr.x, fr.y, fr.width, fr.height, -fr.width / 2, -fr.height / 2, fr.width, fr.height);
        ctx2.restore();
      } else {
        ctx2.drawImage(src, fr.x, fr.y, fr.width, fr.height, offX, offY, fr.width, fr.height);
      }
    }
    state.srcCan.set(tex, c);
    if (state.srcCan.size > cfg.srcCanvasMax) {
      const k = state.srcCan.keys().next().value;
      if (k !== void 0)
        state.srcCan.delete(k);
    }
    return c;
  }

  // --- MG: download helpers (ADDED) ---
  function sanitizeFilePart(s) {
    return String(s || "")
      .replace(/^sprites?\//i, "")
      .replace(/[\\/:*?"<>|]+/g, "_")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 180);
  }
  function triggerDownloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  }
  async function downloadTextureAsPng(tex, filenameBase, state, cfg) {
    if (!tex) return;
    const can = textureToCanvas(tex, state, cfg);
    if (!can) return;

    const filename = `${filenameBase}.png`;

    const blob = await new Promise((resolve) =>
      can.toBlob((b) => resolve(b), "image/png")
    );

    if (blob) {
      triggerDownloadBlob(blob, filename);
      return;
    }

    const dataUrl = can.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = filename;
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  function buildColorLayerSprites(tex, dims, pipeline, state, cfg, disposables, TextureCtor) {
    var _a, _b;
    const { w, h, aX, aY, basePos } = dims;
    const layers = [];
    for (const step of pipeline) {
      const clone = new state.ctors.Sprite(tex);
      (_b = (_a = clone.anchor) == null ? void 0 : _a.set) == null ? void 0 : _b.call(_a, aX, aY);
      clone.position.set(basePos.x, basePos.y);
      clone.zIndex = 1;
      const layerCanvas = document.createElement("canvas");
      layerCanvas.width = w;
      layerCanvas.height = h;
      const lctx = layerCanvas.getContext("2d");
      lctx.imageSmoothingEnabled = false;
      lctx.save();
      lctx.translate(w * aX, h * aY);
      lctx.drawImage(textureToCanvas(tex, state, cfg), -w * aX, -h * aY);
      lctx.restore();
      applyFilterOnto(lctx, layerCanvas, step.name, step.isTall);
      const filteredTex = TextureCtor.from(layerCanvas);
      disposables.push(filteredTex);
      clone.texture = filteredTex;
      layers.push(clone);
    }
    return layers;
  }
  function buildTallOverlaySprites(itKey, dims, overlayPipeline, state, cfg, baseCanvas, TextureCtor, disposables) {
    var _a, _b;
    const { w, aX, basePos } = dims;
    if (!baseCanvas)
      return [];
    const overlays = [];
    for (const step of overlayPipeline) {
      const hit = step.overlayTall && state.tex.get(step.overlayTall) && { tex: state.tex.get(step.overlayTall), key: step.overlayTall } || findOverlayTexture(itKey, step.name, state, true);
      if (!(hit == null ? void 0 : hit.tex))
        continue;
      const oCan = textureToCanvas(hit.tex, state, cfg);
      if (!oCan)
        continue;
      const ow = oCan.width;
      const overlayAnchor = { x: 0, y: 0 };
      const overlayPos = { x: basePos.x - aX * ow, y: 0 };
      const maskedCanvas = document.createElement("canvas");
      maskedCanvas.width = ow;
      maskedCanvas.height = oCan.height;
      const mctx = maskedCanvas.getContext("2d");
      if (!mctx)
        continue;
      mctx.imageSmoothingEnabled = false;
      mctx.drawImage(oCan, 0, 0);
      mctx.globalCompositeOperation = "destination-in";
      mctx.drawImage(baseCanvas, -overlayPos.x, -overlayPos.y);
      const maskedTex = TextureCtor.from(maskedCanvas);
      disposables.push(maskedTex);
      const ov = new state.ctors.Sprite(maskedTex);
      (_b = (_a = ov.anchor) == null ? void 0 : _a.set) == null ? void 0 : _b.call(_a, overlayAnchor.x, overlayAnchor.y);
      ov.position.set(overlayPos.x, overlayPos.y);
      ov.scale.set(1);
      ov.alpha = 1;
      ov.zIndex = 3;
      overlays.push(ov);
    }
    return overlays;
  }
  function buildIconSprites(itKey, dims, iconPipeline, state, iconLayout) {
    var _a, _b, _c, _d, _e, _f;
    const { basePos } = dims;
    const icons = [];
    for (const step of iconPipeline) {
      if (step.name === "Gold" || step.name === "Rainbow")
        continue;
      const itex = findIconTexture(itKey, step.name, step.isTall, state);
      if (!itex)
        continue;
      const icon = new state.ctors.Sprite(itex);
      const iconAnchorX = (_b = (_a = itex == null ? void 0 : itex.defaultAnchor) == null ? void 0 : _a.x) != null ? _b : 0.5;
      const iconAnchorY = (_d = (_c = itex == null ? void 0 : itex.defaultAnchor) == null ? void 0 : _c.y) != null ? _d : 0.5;
      (_f = (_e = icon.anchor) == null ? void 0 : _e.set) == null ? void 0 : _f.call(_e, iconAnchorX, iconAnchorY);
      icon.position.set(basePos.x + iconLayout.offset.x, basePos.y + iconLayout.offset.y);
      icon.scale.set(iconLayout.iconScale);
      if (step.isTall)
        icon.zIndex = -1;
      if (FLOATING_MUTATION_ICONS.has(step.name))
        icon.zIndex = 10;
      if (!icon.zIndex)
        icon.zIndex = 2;
      icons.push(icon);
    }
    return icons;
  }
  var entryCost = (e) => {
    var _a;
    return (e == null ? void 0 : e.isAnim) ? ((_a = e.frames) == null ? void 0 : _a.length) || 0 : (e == null ? void 0 : e.tex) ? 1 : 0;
  };
  function lruTouch(state, k, e) {
    state.lru.delete(k);
    state.lru.set(k, e);
  }
  function lruEvict(state, cfg) {
    if (!cfg.cacheOn)
      return;
    while (state.lru.size > cfg.cacheMaxEntries || state.cost > cfg.cacheMaxCost) {
      const k = state.lru.keys().next().value;
      if (k === void 0)
        break;
      const e = state.lru.get(k);
      state.lru.delete(k);
      state.cost = Math.max(0, state.cost - entryCost(e));
    }
  }
  function clearVariantCache(state) {
    state.lru.clear();
    state.cost = 0;
    state.srcCan.clear();
  }
  function renderMutatedTexture(tex, itKey, V, state, cfg) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u;
    try {
      if (!tex || !state.renderer || !((_a = state.ctors) == null ? void 0 : _a.Container) || !((_b = state.ctors) == null ? void 0 : _b.Sprite) || !((_c = state.ctors) == null ? void 0 : _c.Texture))
        return null;
      const { Container, Sprite, Texture } = state.ctors;
      const w = (_h = (_g = (_f = (_d = tex == null ? void 0 : tex.orig) == null ? void 0 : _d.width) != null ? _f : (_e = tex == null ? void 0 : tex.frame) == null ? void 0 : _e.width) != null ? _g : tex == null ? void 0 : tex.width) != null ? _h : 1;
      const h = (_m = (_l = (_k = (_i = tex == null ? void 0 : tex.orig) == null ? void 0 : _i.height) != null ? _k : (_j = tex == null ? void 0 : tex.frame) == null ? void 0 : _j.height) != null ? _l : tex == null ? void 0 : tex.height) != null ? _m : 1;
      const aX = (_o = (_n = tex == null ? void 0 : tex.defaultAnchor) == null ? void 0 : _n.x) != null ? _o : 0.5;
      const aY = (_q = (_p = tex == null ? void 0 : tex.defaultAnchor) == null ? void 0 : _p.y) != null ? _q : 0.5;
      const basePos = { x: w * aX, y: h * aY };
      const baseCanvas = textureToCanvas(tex, state, cfg);
      const root = new Container();
      root.sortableChildren = true;
      const base = new Sprite(tex);
      (_s = (_r = base.anchor) == null ? void 0 : _r.set) == null ? void 0 : _s.call(_r, aX, aY);
      base.position.set(basePos.x, basePos.y);
      base.zIndex = 0;
      root.addChild(base);
      const isTall = isTallKey(itKey);
      const pipeline = buildMutationPipeline(V.muts, isTall);
      const overlayPipeline = buildMutationPipeline(V.overlayMuts, isTall);
      const iconPipeline = buildMutationPipeline(V.selectedMuts, isTall);
      const disposables = [];
      const baseName = baseNameOf(itKey);
      const iconLayout = computeIconLayout(tex, baseName, isTall);
      const dims = { w, h, aX, aY, basePos };
      buildColorLayerSprites(tex, dims, pipeline, state, cfg, disposables, Texture).forEach((layer) => root.addChild(layer));
      if (isTall) {
        buildTallOverlaySprites(itKey, dims, overlayPipeline, state, cfg, baseCanvas, Texture, disposables).forEach((ov) => root.addChild(ov));
      }
      buildIconSprites(itKey, dims, iconPipeline, state, iconLayout).forEach((icon) => root.addChild(icon));
      const RDR = state.renderer;
      let rt = null;
      if (typeof (RDR == null ? void 0 : RDR.generateTexture) === "function")
        rt = RDR.generateTexture(root, { resolution: 1 });
      else if ((_t = RDR == null ? void 0 : RDR.textureGenerator) == null ? void 0 : _t.generateTexture)
        rt = RDR.textureGenerator.generateTexture({ target: root, resolution: 1 });
      if (!rt)
        throw new Error("no render texture");
      const outTex = rt instanceof Texture ? rt : Texture.from(RDR.extract.canvas(rt));
      if (rt && rt !== outTex)
        (_u = rt.destroy) == null ? void 0 : _u.call(rt, true);
      root.destroy({ children: true, texture: false, baseTexture: false });
      disposables.forEach(() => {
      });
      try {
        outTex.__mg_gen = true;
        outTex.label = `${itKey}|${V.sig}`;
      } catch (e) {
      }
      return outTex;
    } catch (e) {
      return null;
    }
  }
  function enqueueVariantJob(it, V, state, cfg) {
    if (!cfg.cacheOn)
      return null;
    if (!V.muts.length)
      return null;
    const k = variantKey(it, V);
    const hit = state.lru.get(k);
    if (hit)
      return lruTouch(state, k, hit), hit;
    if (!cfg.jobOn)
      return null;
    if (state.jobMap.has(k))
      return null;
    state.jobs.push({
      k,
      sig: state.sig,
      itKey: it.key,
      isAnim: !!it.isAnim,
      src: it.isAnim ? it.frames || [] : [it.first],
      i: 0,
      out: [],
      V
    });
    state.jobMap.add(k);
    return null;
  }
  function processVariantJobs(state, cfg) {
    if (!cfg.jobOn || !state.open || !state.jobs.length)
      return false;
    const now = performance.now();
    const burst = now - state.changedAt <= cfg.jobBurstWindowMs;
    const budget = burst ? cfg.jobBurstMs : cfg.jobBudgetMs;
    const t0 = performance.now();
    let done = 0;
    let needsLayout = false;
    while (state.jobs.length) {
      if (performance.now() - t0 >= budget)
        break;
      if (done >= cfg.jobCapPerTick)
        break;
      const job = state.jobs[0];
      if (job.sig !== state.sig) {
        state.jobs.shift();
        state.jobMap.delete(job.k);
        continue;
      }
      const tex = job.src[job.i];
      if (!tex) {
        state.jobs.shift();
        state.jobMap.delete(job.k);
        continue;
      }
      const ft = renderMutatedTexture(tex, job.itKey, job.V, state, cfg);
      if (ft)
        job.out.push(ft);
      job.i++;
      done++;
      if (job.i >= job.src.length) {
        state.jobs.shift();
        state.jobMap.delete(job.k);
        let entry = null;
        if (job.isAnim) {
          if (job.out.length >= 2)
            entry = { isAnim: true, frames: job.out };
          else
            job.out.forEach(() => {
            });
        } else {
          if (job.out[0])
            entry = { isAnim: false, tex: job.out[0] };
        }
        if (entry) {
          state.lru.set(job.k, entry);
          state.cost += entryCost(entry);
          lruEvict(state, cfg);
          needsLayout = true;
        }
      }
    }
    return needsLayout;
  }
  var getGenerated = enqueueVariantJob;
  var processJobs = processVariantJobs;

  // gemini-modules/modules/sprite/ui/hud.ts
  function whiteTex(state) {
    const T = state.ctors.Texture;
    if (T.WHITE)
      return T.WHITE;
    const c = document.createElement("canvas");
    c.width = c.height = 1;
    const ctx2 = c.getContext("2d");
    ctx2 == null ? void 0 : ctx2.fillRect(0, 0, 1, 1);
    return T.from(c);
  }
  function mkOpt(sel, v, txt) {
    var _a;
    const o = document.createElement("option");
    o.value = v;
    o.textContent = (_a = txt != null ? txt : v) != null ? _a : "";
    sel.appendChild(o);
  }
  function applyListFilters(state, cfg) {
    const cat = state.cat;
    const q = state.q.toLowerCase();
    const filtered = [];
    for (const it of state.items) {
      if (cat !== "__all__") {
        const catItems = state.cats.get(cat);
        if (!(catItems == null ? void 0 : catItems.includes(it)))
          continue;
      }
      if (q) {
        const key = it.key.toLowerCase();
        const lbl = labelOf(it.key, cfg).toLowerCase();
        if (!key.includes(q) && !lbl.includes(q))
          continue;
      }
      filtered.push(it);
    }
    state.filtered = filtered.slice(0, cfg.maxItems);
    state.scroll = 0;
  }
  function updateCount(state) {
    if (state.count)
      state.count.textContent = `${state.filtered.length}/${state.items.length}`;
  }
  function makeCell(state, cfg) {
    var _a, _b, _c, _d, _e;
    const { Container, Sprite, Text } = state.ctors;
    const c = new Container();
    const w = whiteTex(state);
    const tile = new Sprite(w);
    tile.tint = 986895;
    tile.alpha = 0.9;
    tile.width = cfg.cell;
    tile.height = cfg.cell;
    const icon = new Sprite(w);
    (_b = (_a = icon.anchor) == null ? void 0 : _a.set) == null ? void 0 : _b.call(_a, 0.5, 0.5);
    let label = null;
    if (Text) {
      try {
        label = new Text("", {
          fontFamily: "system-ui",
          fontSize: 11,
          fill: 16777215,
          align: "center",
          wordWrap: true,
          wordWrapWidth: cfg.cell - 10
        });
        (_d = (_c = label.anchor) == null ? void 0 : _c.set) == null ? void 0 : _d.call(_c, 0.5, 0.5);
        label.alpha = 0.9;
      } catch (e) {
        label = null;
      }
    }
    c.addChild(tile, icon);
    if (label)
      c.addChild(label);
    c.__icon = icon;
    c.__label = label;
    c.__frames = null;
    c.__fi = 0;
    c.__acc = 0;
    c.__copyKey = "";
    try {
      c.eventMode = "static";
    } catch (e) {
      c.interactive = true;
    }

    // MG MOD: clic = download PNG ; Ctrl+clic = copie la clé ; Shift+clic = télécharge toutes les frames (si anim)
    try { c.cursor = "pointer"; } catch (e) {}
    (_e = c.on) == null ? void 0 : _e.call(c, "pointertap", async (ev) => {
      const oe = (ev && ev.data && ev.data.originalEvent) ? ev.data.originalEvent : ev;

      const key = c.__copyKey || "sprite";
      const V = curVariant(state);
      const baseName = sanitizeFilePart(key);
      const sigPart = sanitizeFilePart(V.sig || "V");
      const fileBase = `${baseName}__${sigPart}`;

      if (oe && oe.ctrlKey) {
        try { await navigator.clipboard.writeText(key); } catch (e) {}
        return;
      }

      if (oe && oe.shiftKey && c.__frames && c.__frames.length >= 2) {
        const frames = c.__frames;
        for (let i = 0; i < frames.length; i++) {
          const idx = String(i).padStart(3, "0");
          await downloadTextureAsPng(frames[i], `${fileBase}__f${idx}`, state, cfg);
        }
        return;
      }

      const tex = (c.__frames && c.__frames.length)
        ? c.__frames[c.__fi || 0]
        : (c.__icon ? c.__icon.texture : null);

      await downloadTextureAsPng(tex, fileBase, state, cfg);
    });

    return c;
  }
  function clearAnim(state, cell) {
    state.anim.delete(cell);
    cell.__frames = null;
    cell.__fi = 0;
    cell.__acc = 0;
  }
  function layout(state, cfg, renderer) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o;
    if (!state.open || !state.overlay)
      return;
    const RDR = renderer;
    const W = (_c = (_b = RDR == null ? void 0 : RDR.width) != null ? _b : (_a = RDR == null ? void 0 : RDR.view) == null ? void 0 : _a.width) != null ? _c : innerWidth;
    const H = (_f = (_e = RDR == null ? void 0 : RDR.height) != null ? _e : (_d = RDR == null ? void 0 : RDR.view) == null ? void 0 : _d.height) != null ? _f : innerHeight;
    state.bg.width = W;
    state.bg.height = H;
    const viewX = cfg.panelW + cfg.pad * 2 + 12;
    const viewY = cfg.pad;
    const viewW = Math.max(1, W - viewX - cfg.pad);
    const viewH = Math.max(1, H - viewY - cfg.pad);
    const colW = cfg.cell + cfg.gap;
    const rowH = cfg.cell + cfg.gap;
    const cols = Math.max(1, Math.floor((viewW + cfg.gap) / colW));
    const rows = Math.ceil(state.filtered.length / cols);
    const totalH = rows * rowH;
    const maxScroll = Math.max(0, totalH - viewH);
    state.scroll = Math.max(0, Math.min(state.scroll, maxScroll));
    const firstRow = Math.floor(state.scroll / rowH);
    const lastRow = Math.floor((state.scroll + viewH) / rowH) + 1;
    const start2 = Math.max(0, Math.min(firstRow * cols, state.filtered.length));
    const end = Math.max(0, Math.min((lastRow + 1) * cols, state.filtered.length));
    for (const [idx, cell] of state.active.entries()) {
      if (idx < start2 || idx >= end) {
        clearAnim(state, cell);
        state.grid.removeChild(cell);
        state.active.delete(idx);
        state.pool.push(cell);
      }
    }
    const V = curVariant(state);
    for (let idx = start2; idx < end; idx++) {
      const it = state.filtered[idx];
      if (!(it == null ? void 0 : it.first))
        continue;
      let cell = state.active.get(idx);
      if (!cell) {
        cell = state.pool.pop() || makeCell(state, cfg);
        state.active.set(idx, cell);
        state.grid.addChild(cell);
      }
      clearAnim(state, cell);
      const col = idx % cols;
      const row = idx / cols | 0;
      cell.x = viewX + col * colW;
      cell.y = viewY + row * rowH - state.scroll;
      cell.__copyKey = it.key;
      if (cell.__label)
        cell.__label.text = labelOf(it.key, cfg);
      const labelH = cell.__label ? cfg.labelH : 0;
      const iconBox = cfg.cell - labelH;
      cell.__icon.x = cfg.cell / 2;
      cell.__icon.y = iconBox / 2;
      if (cell.__label) {
        cell.__label.x = cfg.cell / 2;
        cell.__label.y = iconBox + labelH / 2;
      }
      let frames = null;
      let tex = null;
      const e = getGenerated(it, V, state, cfg);
      if (e == null ? void 0 : e.isAnim)
        frames = e.frames;
      else if (e == null ? void 0 : e.tex)
        tex = e.tex;
      if (!tex && !frames) {
        if (it.isAnim && ((_g = it.frames) == null ? void 0 : _g.length) >= 2)
          frames = it.frames;
        else
          tex = it.first;
      }
      if (frames) {
        cell.__frames = frames;
        state.anim.add(cell);
        cell.__icon.texture = frames[0];
      } else {
        cell.__icon.texture = tex;
      }
      const t = cell.__icon.texture;
      const tw = (_k = (_j = (_h = t == null ? void 0 : t.orig) == null ? void 0 : _h.width) != null ? _j : (_i = t == null ? void 0 : t.frame) == null ? void 0 : _i.width) != null ? _k : 1;
      const th = (_o = (_n = (_l = t == null ? void 0 : t.orig) == null ? void 0 : _l.height) != null ? _n : (_m = t == null ? void 0 : t.frame) == null ? void 0 : _m.height) != null ? _o : 1;
      if (tw <= 0 || th <= 0) {
        if (it.first)
          cell.__icon.texture = it.first;
      }
      const s = Math.min(cfg.cell * 1.05 / tw, iconBox * 1.05 / th);
      cell.__icon.scale.set(s);
    }
  }
  function createHud(app, renderer, cfg, state) {
    var _a, _b, _c, _d, _e, _f;
    const { Container, Sprite } = state.ctors;
    const overlay = new Container();
    overlay.visible = false;
    overlay.name = "MG_SPRITE_CATALOG";
    const bg = new Sprite(whiteTex(state));
    bg.tint = 0;
    bg.alpha = cfg.bgA;
    const grid = new Container();
    overlay.addChild(bg, grid);
    app.stage.addChild(overlay);
    (_b = (_a = app.ticker) == null ? void 0 : _a.add) == null ? void 0 : _b.call(_a, () => {
      if (!state.open)
        return;
      const p = overlay.parent;
      try {
        if (p && p.getChildIndex(overlay) !== p.children.length - 1)
          p.setChildIndex(overlay, p.children.length - 1);
      } catch (e) {
      }
    });
    const frameMs = 1e3 / Math.max(1, cfg.animFps);
    (_d = (_c = app.ticker) == null ? void 0 : _c.add) == null ? void 0 : _d.call(_c, () => {
      var _a2, _b2;
      if (!state.open || !state.anim.size)
        return;
      const ms = (_b2 = (_a2 = app == null ? void 0 : app.ticker) == null ? void 0 : _a2.deltaMS) != null ? _b2 : 16.666;
      for (const c of state.anim) {
        const frames = c.__frames;
        if (!frames || frames.length < 2)
          continue;
        c.__acc = (c.__acc || 0) + ms;
        if (c.__acc < frameMs)
          continue;
        const step = Math.floor(c.__acc / frameMs);
        c.__acc %= frameMs;
        c.__fi = ((c.__fi || 0) + step) % frames.length;
        c.__icon.texture = frames[c.__fi];
      }
    });
    (_f = (_e = app.ticker) == null ? void 0 : _e.add) == null ? void 0 : _f.call(_e, () => {
      if (processJobs(state, cfg))
        layout(state, cfg, renderer);
    });
    state.overlay = overlay;
    state.bg = bg;
    state.grid = grid;
    const root = document.createElement("div");
    root.style.cssText = "position:fixed;inset:0;z-index:1000000;display:none;pointer-events:none;font:12px system-ui;color:#fff;";
    const panel = document.createElement("div");
    panel.style.cssText = `position:absolute;top:12px;left:12px;bottom:12px;width:${cfg.panelW}px;pointer-events:auto;background:rgba(20,20,20,.92);border:1px solid rgba(255,255,255,.12);border-radius:12px;overflow:hidden;display:grid;grid-template-rows:auto auto auto auto auto;`;
    const head = document.createElement("div");
    head.style.cssText = "padding:10px 12px;font-weight:800;background:rgba(255,255,255,.04);border-bottom:1px solid rgba(255,255,255,.08);display:flex;justify-content:space-between;gap:10px;";
    const title = document.createElement("div");
    title.textContent = "Sprite Catalog";
    const count = document.createElement("div");
    count.style.cssText = "opacity:.75;font-weight:600;";
    head.append(title, count);
    const selStyle = "margin:10px 12px 0;padding:8px 10px;border-radius:10px;border:1px solid rgba(255,255,255,.14);background:rgba(0,0,0,.22);color:#fff;outline:none;";
    const selCat = document.createElement("select");
    selCat.style.cssText = selStyle;
    const mutBox = document.createElement("div");
    mutBox.style.cssText = "margin:10px 12px 0;padding:10px;border-radius:10px;border:1px solid rgba(255,255,255,.14);background:rgba(0,0,0,.22);display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:8px;";
    const mutChecks = [];
    const hint = document.createElement("div");
    hint.style.cssText = "margin:10px 12px 12px;opacity:.65;";
    hint.textContent = "Molette: scroll. Click: télécharge. Ctrl+Click: copie la clé. Shift+Click: toutes les frames (anim). Toggle: Ctrl+Shift+K.";
    panel.append(head, selCat, mutBox, hint);
    root.append(panel);
    document.documentElement.appendChild(root);
    state.dom = root;
    state.selCat = selCat;
    state.count = count;
    const fillCats = () => {
      selCat.textContent = "";
      mkOpt(selCat, "__all__", `All (${state.items.length})`);
      [...state.cats.keys()].sort((a, b) => a.localeCompare(b)).forEach((c) => {
        var _a2;
        return mkOpt(selCat, c, `${c} (${((_a2 = state.cats.get(c)) == null ? void 0 : _a2.length) || 0})`);
      });
      selCat.value = state.cat;
    };
    const fillMut = () => {
      mutBox.textContent = "";
      mutChecks.length = 0;
      MUT_NAMES.forEach((name) => {
        const label = document.createElement("label");
        label.style.cssText = "display:flex;align-items:center;gap:8px;font-weight:600;";
        const cb = document.createElement("input");
        cb.type = "checkbox";
        cb.value = name;
        cb.addEventListener("change", () => {
          const selected = mutChecks.filter((c) => c.input.checked).map((c) => c.name);
          state.mutations = selected;
          state.mutOn = selected.length > 0;
          syncMutUI();
          onVariantChange();
        });
        label.append(cb, document.createTextNode(name));
        mutBox.appendChild(label);
        mutChecks.push({ name, input: cb });
      });
    };
    function syncMutUI() {
      const selected = state.mutations;
      mutChecks.forEach((c) => c.input.checked = selected.includes(c.name));
      state.mutOn = selected.length > 0;
    }
    function onVariantChange() {
      state.sig = curVariant(state).sig;
      state.changedAt = performance.now();
      state.dbgCount = {};
      layout(state, cfg, renderer);
    }
    fillCats();
    fillMut();
    syncMutUI();
    selCat.addEventListener("change", () => {
      state.cat = selCat.value || "__all__";
      applyListFilters(state, cfg);
      updateCount(state);
      layout(state, cfg, renderer);
    });
    const prebuildPool = () => {
      const target = Math.max(0, cfg.prebuildCells | 0);
      if (!target)
        return;
      let made = 0;
      const step = () => {
        const t0 = performance.now();
        let n = 0;
        while (made < target && n < cfg.prebuildBatch && performance.now() - t0 < cfg.prebuildBudgetMs) {
          state.pool.push(makeCell(state, cfg));
          made += 1;
          n += 1;
        }
        if (made < target)
          requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    applyListFilters(state, cfg);
    updateCount(state);
    prebuildPool();
    function open() {
      var _a2, _b2;
      if (state.open || !state.loaded)
        return;
      state.open = true;
      state.dbgCount = {};
      root.style.display = "block";
      overlay.visible = true;
      (_b2 = (_a2 = state.inp) == null ? void 0 : _a2.focus) == null ? void 0 : _b2.call(_a2);
      updateCount(state);
      layout(state, cfg, renderer);
    }
    function close() {
      if (!state.open)
        return;
      state.open = false;
      root.style.display = "none";
      overlay.visible = false;
      for (const c of state.active.values())
        clearAnim(state, c);
      state.anim.clear();
    }
    const toggle = () => state.open ? close() : open();
    const onWheel = (e) => {
      if (!state.open)
        return;
      e.preventDefault();
      state.scroll += e.deltaY;
      layout(state, cfg, renderer);
    };
    const wheelTarget = (renderer == null ? void 0 : renderer.view) || (renderer == null ? void 0 : renderer.canvas);
    const wheelHost = wheelTarget && typeof wheelTarget.addEventListener === "function" ? wheelTarget : window;
    wheelHost.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", () => state.open && layout(state, cfg, renderer));
    return { open, close, toggle, layout: () => layout(state, cfg, renderer), root };
  }

  // gemini-modules/modules/sprite/ui/controls.ts
  function bindHotkey(cfg, toggle) {
    const onKey = (e) => {
      if (!!cfg.key.ctrl !== !!e.ctrlKey)
        return;
      if (!!cfg.key.shift !== !!e.shiftKey)
        return;
      if (e.code !== cfg.key.code)
        return;
      e.preventDefault();
      toggle();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }

  // gemini-modules/modules/sprite/api/expose.ts
  function exposeApi(state, hud) {
    const root = globalThis.unsafeWindow || globalThis;
    const api = {
      open() {
        hud.root.style.display = "block";
        state.open = true;
      },
      close() {
        hud.root.style.display = "none";
        state.open = false;
      },
      toggle() {
        state.open ? api.close() : api.open();
      },
      setCategory(cat) {
        state.cat = cat || "__all__";
      },
      setFilterText(text) {
        state.q = String(text || "").trim();
      },
      setSpriteFilter(name) {
        state.f = name;
        state.mutOn = false;
      },
      setMutation(on, ...muts) {
        state.mutOn = !!on;
        state.f = "";
        state.mutations = state.mutOn ? muts.filter(Boolean).map((name) => name) : [];
      },
      filters() {
        return [];
      },
      categories() {
        return [...state.cats.keys()].sort((a, b) => a.localeCompare(b));
      },
      cacheStats() {
        return { entries: state.lru.size, cost: state.cost };
      },
      clearCache() {
        clearVariantCache(state);
      },
      curVariant: () => curVariant(state)
    };
    root.MGSpriteCatalog = api;
    return api;
  }

  // gemini-modules/modules/sprite/index.ts
  var ctx = createSpriteContext();
  var hooks = createPixiHooks();
  function detectGameVersion() {
    const root = globalThis.unsafeWindow || globalThis;
    const gv = root.gameVersion || root.MG_gameVersion || root.__MG_GAME_VERSION__;
    if (gv) {
      if (typeof gv.getVersion === "function")
        return gv.getVersion();
      if (typeof gv.get === "function")
        return gv.get();
      if (typeof gv === "string")
        return gv;
    }
    const scriptUrls = Array.from(document.scripts || []).map((s) => s.src).filter(Boolean);
    const linkUrls = Array.from(document.querySelectorAll("link[href]") || []).map(
      (l) => l.href
    );
    const urls = [...scriptUrls, ...linkUrls];
    for (const u of urls) {
      const m = u.match(/\/version\/([^/]+)\//);
      if (m == null ? void 0 : m[1])
        return m[1];
    }
    throw new Error("Version not found.");
  }
  async function loadTextures(base) {
    const manifest = await getJSON(joinPath(base, "manifest.json"));
    const atlasJsons = await loadAtlasJsons(base, manifest);
    const ctors = ctx.state.ctors;
    if (!(ctors == null ? void 0 : ctors.Texture) || !(ctors == null ? void 0 : ctors.Rectangle))
      throw new Error("PIXI constructors missing");
    for (const [path, data] of Object.entries(atlasJsons)) {
      if (!isAtlas(data))
        continue;
      const imgPath = relPath(path, data.meta.image);
      const img = await blobToImage(await getBlob(joinPath(base, imgPath)));
      const baseTex = ctors.Texture.from(img);
      buildAtlasTextures(data, baseTex, ctx.state.tex, ctx.state.atlasBases, {
        Texture: ctors.Texture,
        Rectangle: ctors.Rectangle
      });
    }
    const { items, cats } = buildItemsFromTextures(ctx.state.tex, ctx.cfg);
    ctx.state.items = items;
    ctx.state.filtered = items.slice();
    ctx.state.cats = cats;
    ctx.state.loaded = true;
  }
  function ensureDocumentReady() {
    if (document.readyState !== "loading")
      return Promise.resolve();
    return new Promise((resolve) => {
      const onReady = () => {
        document.removeEventListener("DOMContentLoaded", onReady);
        resolve();
      };
      document.addEventListener("DOMContentLoaded", onReady);
    });
  }
  async function start() {
    if (ctx.state.started)
      return;
    ctx.state.started = true;
    const { app, renderer: _renderer, version } = await waitForPixi(hooks);
    await ensureDocumentReady();
    ctx.state.ctors = getCtors(app);
    const renderer = _renderer || (app == null ? void 0 : app.renderer) || (app == null ? void 0 : app.render) || null;
    ctx.state.app = app;
    ctx.state.renderer = renderer;
    ctx.state.version = detectGameVersion();
    ctx.state.base = `${ctx.cfg.origin.replace(/\/$/, "")}/version/${ctx.state.version}/assets/`;
    ctx.state.sig = curVariant(ctx.state).sig;
    await loadTextures(ctx.state.base);
    const hud = createHud(app, renderer, ctx.cfg, ctx.state);
    const unbindHotkey = bindHotkey(ctx.cfg, () => {
      hud.toggle();
    });
    exposeApi(ctx.state, hud);
    console.log("[MG SpriteCatalog] ready", {
      version: ctx.state.version,
      pixi: version,
      textures: ctx.state.tex.size,
      items: ctx.state.items.length,
      cats: ctx.state.cats.size
    });
    ctx.state.__cleanup = () => unbindHotkey();
  }
  start().catch((err) => console.error("[MG SpriteCatalog] failed", err));
})();
