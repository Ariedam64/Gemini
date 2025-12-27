// ==UserScript==
// @name         MagicGarden - Version + Manifest + Sprites + Audio + Cosmetics + Tile + Pixi (console-only)
// @namespace    mg
// @version      1.2.0
// @description  MGVersion -> MGAssets -> MGManifest -> MGSprite / MGAudio / MGCosmetic + MGTile + MGPixi (console-only)
// @match        https://magicgarden.gg/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @connect      magicgarden.gg
// ==/UserScript==

(() => {
  "use strict";

  const ORIGIN = "https://magicgarden.gg";
  const root = unsafeWindow || window;

  // ----------------------------
  // tiny utils
  // ----------------------------
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const tryDo = (fn) => { try { return fn(); } catch { return undefined; } };
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

  function gmGet(url, responseType = "text") {
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: "GET",
        url,
        responseType,
        onload: (r) =>
          r.status >= 200 && r.status < 300
            ? resolve(r)
            : reject(new Error(`HTTP ${r.status} for ${url}`)),
        onerror: () => reject(new Error(`Network error for ${url}`)),
        ontimeout: () => reject(new Error(`Timeout for ${url}`)),
      });
    });
  }

  const getJSON = async (url) => JSON.parse((await gmGet(url, "text")).responseText);
  const getBlob = async (url) => (await gmGet(url, "blob")).response;

  function blobToImage(blob) {
    return new Promise((resolve, reject) => {
      const u = URL.createObjectURL(blob);
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        URL.revokeObjectURL(u);
        resolve(img);
      };
      img.onerror = () => {
        URL.revokeObjectURL(u);
        reject(new Error("Image decode failed"));
      };
      img.src = u;
    });
  }

  const joinPath = (base, p) =>
    base.replace(/\/?$/, "/") + String(p || "").replace(/^\//, "");
  const dirOf = (p) => (p.lastIndexOf("/") >= 0 ? p.slice(0, p.lastIndexOf("/") + 1) : "");
  const relPath = (baseFile, p) =>
    String(p || "").startsWith("/") ? String(p).slice(1) : dirOf(baseFile) + String(p || "");

  async function waitWithTimeout(p, ms, label) {
    const t0 = performance.now();
    while (performance.now() - t0 < ms) {
      const out = await Promise.race([p, sleep(50).then(() => null)]);
      if (out !== null) return out;
    }
    throw new Error(`${label} timeout`);
  }

  // ============================================================
  // Shared: Pixi capture (robuste, 1 seule fois)
  // ============================================================
  const MGPixiHooks = (() => {
    let _installed = false;

    let _app = null, _renderer = null;
    let appResolve, rdrResolve;
    const appReady = new Promise((r) => (appResolve = r));
    const rendererReady = new Promise((r) => (rdrResolve = r));

    function hookFunctionGlobal(name, onCall) {
      const cur = root[name];
      if (typeof cur === "function") {
        root[name] = function () {
          try { onCall.apply(this, arguments); } finally {
            try { cur.apply(this, arguments); } catch (_) {}
          }
        };
        return;
      }
      Object.defineProperty(root, name, {
        configurable: true,
        set(fn) {
          Object.defineProperty(root, name, { configurable: true, writable: true, value: fn });
          hookFunctionGlobal(name, onCall);
        },
        get() { return undefined; },
      });
    }

    function install() {
      if (_installed) return;
      _installed = true;

      hookFunctionGlobal("__PIXI_APP_INIT__", (app) => {
        if (_app) return;
        _app = app;
        try { appResolve(app); } catch (_) {}
      });

      hookFunctionGlobal("__PIXI_RENDERER_INIT__", (renderer) => {
        if (_renderer) return;
        _renderer = renderer;
        try { rdrResolve(renderer); } catch (_) {}
      });
    }

    install();

    return {
      appReady,
      rendererReady,
      app: () => _app,
      renderer: () => _renderer,
    };
  })();

  // ============================================================
  // Module 1: MGVersion
  // ============================================================
  const MGVersion = (() => {
    let gameVersion = null;

    function init(doc) {
      if (gameVersion !== null) return;
      const d = doc ?? (typeof document !== "undefined" ? document : null);
      if (!d) return;

      const scripts = d.scripts;
      for (let i = 0; i < scripts.length; i++) {
        const s = scripts.item(i);
        const src = s?.src;
        if (!src) continue;

        // Match: /version/<hash>/... ou /r/12345/version/<hash>/...
        const m = src.match(/\/(?:r\/\d+\/)?version\/([^/]+)/);
        if (m && m[1]) {
          gameVersion = m[1];
          return;
        }
      }
    }

    function get() {
      init(document);
      return gameVersion;
    }

    async function wait(timeoutMs = 15000) {
      const t0 = performance.now();
      while (performance.now() - t0 < timeoutMs) {
        init(document);
        if (gameVersion) return gameVersion;
        await sleep(50);
      }
      throw new Error("MGVersion timeout (gameVersion not found)");
    }

    return { init, get, wait };
  })();

  // ============================================================
  // Module 2: MGAssets
  // ============================================================
  const MGAssets = (() => {
    let _baseP = null;
    let _base = null;

    async function base() {
      if (_base) return _base;
      if (_baseP) return _baseP;

      _baseP = (async () => {
        const gv = await MGVersion.wait(15000);
        _base = `${ORIGIN}/version/${gv}/assets/`;
        return _base;
      })();

      return _baseP;
    }

    async function url(rel) {
      const b = await base();
      return joinPath(b, rel);
    }

    return { base, url };
  })();

  // ============================================================
  // Module 3: MGManifest
  // ============================================================
  const MGManifest = (() => {
    const _cache = new Map(); // baseUrl -> Promise<manifest>

    async function load(baseUrl) {
      const b = baseUrl || (await MGAssets.base());
      if (_cache.has(b)) return _cache.get(b);

      const p = getJSON(joinPath(b, "manifest.json"));
      _cache.set(b, p);
      return p;
    }

    function getBundle(manifest, name) {
      return (manifest?.bundles || []).find((x) => x?.name === name) || null;
    }

    function listJsonFromBundle(bundle) {
      const out = new Set();
      for (const asset of bundle?.assets || []) {
        for (const src of asset?.src || []) {
          if (typeof src === "string" && src.endsWith(".json") && src !== "manifest.json") out.add(src);
        }
      }
      return Array.from(out);
    }

    return { load, getBundle, listJsonFromBundle };
  })();

  // ============================================================
  // Module: MGSprite
  // ============================================================
  const MGSprite = (() => {
    let _initP = null;

    const state = {
      ready: false,
      app: null,
      renderer: null,
      ctors: null,
      baseUrl: null,

      textures: new Map(),
      animations: new Map(),
      live: new Set(),

      defaultParent: null,
      overlay: null,
    };

    // ----- constructors (no PIXI global required)
    function findAny(rootNode, pred, lim = 25000) {
      const stack = [rootNode];
      const seen = new Set();
      let n = 0;
      while (stack.length && n++ < lim) {
        const node = stack.pop();
        if (!node || seen.has(node)) continue;
        seen.add(node);
        if (pred(node)) return node;
        const ch = node.children;
        if (Array.isArray(ch)) for (let i = ch.length - 1; i >= 0; i--) stack.push(ch[i]);
      }
      return null;
    }

    function getCtors(app) {
      const P = root.PIXI;
      if (P?.Texture && P?.Sprite && P?.Container && P?.Rectangle) {
        return {
          Container: P.Container,
          Sprite: P.Sprite,
          Texture: P.Texture,
          Rectangle: P.Rectangle,
          AnimatedSprite: P.AnimatedSprite || null,
        };
      }

      const stage = app?.stage;
      const anySpr = findAny(stage, (x) => x?.texture?.frame && x?.constructor && x?.texture?.constructor && x?.texture?.frame?.constructor);
      if (!anySpr) throw new Error("No Sprite found yet (constructors).");

      return {
        Container: stage.constructor,
        Sprite: anySpr.constructor,
        Texture: anySpr.texture.constructor,
        Rectangle: anySpr.texture.frame.constructor,
        AnimatedSprite: P?.AnimatedSprite || null,
      };
    }

    async function waitForCtors(app, timeoutMs = 15000) {
      const t0 = performance.now();
      while (performance.now() - t0 < timeoutMs) {
        try { return getCtors(app); } catch (_) { await sleep(50); }
      }
      throw new Error("Constructors timeout");
    }

    // ----- atlas decode
    const isAtlas = (j) => j && typeof j === "object" && j.frames && j.meta && typeof j.meta.image === "string";
    const mkRect = (Rectangle, x, y, w, h) => new Rectangle(x, y, w, h);

    function mkSubTex(Texture, baseTex, frame, orig, trim, rotate, anchor) {
      let t;
      try {
        t = new Texture({ source: baseTex.source, frame, orig, trim: trim || undefined, rotate: rotate || 0 });
      } catch (_) {
        t = new Texture(baseTex.baseTexture || baseTex, frame, orig, trim || undefined, rotate || 0);
      }

      if (anchor) {
        if (t.defaultAnchor?.set) {
          try { t.defaultAnchor.set(anchor.x, anchor.y); } catch (_) {}
        } else if (t.defaultAnchor) {
          t.defaultAnchor.x = anchor.x; t.defaultAnchor.y = anchor.y;
        } else {
          t.defaultAnchor = { x: anchor.x, y: anchor.y };
        }
      }
      try { t.updateUvs?.(); } catch (_) {}
      return t;
    }

    function buildAtlasTextures(atlasJson, baseTex, outTexMap, ctors) {
      const { Texture, Rectangle } = ctors;

      for (const [key, fd] of Object.entries(atlasJson.frames)) {
        const fr = fd.frame;
        const rotated = !!fd.rotated;

        const rot = rotated ? 2 : 0;
        const w = rotated ? fr.h : fr.w;
        const h = rotated ? fr.w : fr.h;

        const frame = mkRect(Rectangle, fr.x, fr.y, w, h);
        const ss = fd.sourceSize || { w: fr.w, h: fr.h };
        const orig = mkRect(Rectangle, 0, 0, ss.w, ss.h);

        let trim = null;
        if (fd.trimmed && fd.spriteSourceSize) {
          const s = fd.spriteSourceSize;
          trim = mkRect(Rectangle, s.x, s.y, s.w, s.h);
        }

        outTexMap.set(key, mkSubTex(Texture, baseTex, frame, orig, trim, rot, fd.anchor || null));
      }
    }

    // ----- keys
    function normalizeKey(k) {
      const s = String(k || "").trim();
      if (!s) return "";
      if (s.startsWith("sprite/") || s.startsWith("sprites/")) return s;
      if (s.includes("/")) return `sprite/${s}`;
      return s;
    }

    function makeKey(category, asset) {
      const cat = String(category || "").trim().replace(/^sprites?\//, "").replace(/^\/+|\/+$/g, "");
      const a = String(asset || "").trim();
      if (a.includes("/")) return normalizeKey(a);
      if (!cat) return normalizeKey(a);
      return `sprite/${cat}/${a}`;
    }

    function resolveKey(category, asset) {
      const k1 = makeKey(category, asset);
      if (state.textures.has(k1) || state.animations.has(k1)) return k1;

      const a = String(asset || "").trim();
      if (state.textures.has(a) || state.animations.has(a)) return a;

      const k3 = normalizeKey(a);
      if (state.textures.has(k3) || state.animations.has(k3)) return k3;

      return k1;
    }

    // ----- overlay fallback
    function ensureOverlay() {
      if (state.overlay) return state.overlay;

      const c = new state.ctors.Container();
      c.sortableChildren = true;
      c.zIndex = 99999999;

      try { state.app.stage.sortableChildren = true; } catch (_) {}
      state.app.stage.addChild(c);

      state.overlay = c;
      return c;
    }

    function getDefaultParent() {
      const p = state.defaultParent;
      if (!p) return null;
      try { return typeof p === "function" ? p() : p; } catch (_) { return null; }
    }

    // ----- loader (default bundle)
    async function loadDefaultSprites() {
      const manifest = await MGManifest.load(state.baseUrl);
      const bundle = MGManifest.getBundle(manifest, "default");
      if (!bundle) throw new Error("No default bundle in manifest");

      const jsonPaths = MGManifest.listJsonFromBundle(bundle);
      const seen = new Set();

      async function loadAtlasJson(path) {
        if (seen.has(path)) return;
        seen.add(path);

        const atlas = await getJSON(joinPath(state.baseUrl, path));
        if (!isAtlas(atlas)) return;

        const rels = atlas.meta?.related_multi_packs;
        if (Array.isArray(rels)) {
          for (const rel of rels) await loadAtlasJson(relPath(path, rel));
        }

        const imgPath = relPath(path, atlas.meta.image);
        const img = await blobToImage(await getBlob(joinPath(state.baseUrl, imgPath)));

        const baseTex = state.ctors.Texture.from(img);
        buildAtlasTextures(atlas, baseTex, state.textures, state.ctors);

        if (atlas.animations && typeof atlas.animations === "object") {
          for (const [animKey, frames] of Object.entries(atlas.animations)) {
            if (!Array.isArray(frames)) continue;
            const texFrames = frames.map((k) => state.textures.get(k)).filter(Boolean);
            if (texFrames.length >= 2) state.animations.set(animKey, texFrames);
          }
        }
      }

      for (const p of jsonPaths) await loadAtlasJson(p);
    }

    // ----- public commands
    function show(a, b, c) {
      if (!state.ready) throw new Error("MGSprite not ready yet");

      let key, opts;
      if (typeof b === "string") { key = resolveKey(a, b); opts = c || {}; }
      else { key = resolveKey(null, a); opts = b || {}; }

      const parent = opts.parent || getDefaultParent() || ensureOverlay();

      const W = state.renderer?.width || state.renderer?.view?.width || innerWidth;
      const H = state.renderer?.height || state.renderer?.view?.height || innerHeight;
      const x = opts.center ? W / 2 : (opts.x ?? W / 2);
      const y = opts.center ? H / 2 : (opts.y ?? H / 2);

      let obj;
      const frames = state.animations.get(key);

      if (frames?.length >= 2) {
        const AS = state.ctors.AnimatedSprite;
        if (AS) {
          obj = new AS(frames);
          obj.animationSpeed = opts.fps ? (opts.fps / 60) : (opts.speed ?? 0.15);
          obj.loop = (opts.loop ?? true);
          obj.play();
        } else {
          const spr = new state.ctors.Sprite(frames[0]);
          const fps = Math.max(1, opts.fps || 8);
          const frameMs = 1000 / fps;
          let acc = 0, i = 0;

          const tick = (delta) => {
            const ms = state.app.ticker?.deltaMS ?? (delta * (1000 / 60));
            acc += ms;
            if (acc < frameMs) return;
            const step = (acc / frameMs) | 0;
            acc %= frameMs;
            i = (i + step) % frames.length;
            spr.texture = frames[i];
          };

          spr.__mgTick = tick;
          state.app.ticker?.add?.(tick);
          obj = spr;
        }
      } else {
        const tex = state.textures.get(key);
        if (!tex) throw new Error(`Unknown sprite/anim key: ${key}`);
        obj = new state.ctors.Sprite(tex);
      }

      const ax = opts.anchorX ?? obj.texture?.defaultAnchor?.x ?? 0.5;
      const ay = opts.anchorY ?? obj.texture?.defaultAnchor?.y ?? 0.5;
      obj.anchor?.set?.(ax, ay);

      obj.position.set(x, y);
      obj.scale.set(opts.scale ?? 1);
      obj.alpha = opts.alpha ?? 1;
      obj.rotation = opts.rotation ?? 0;
      obj.zIndex = opts.zIndex ?? 999999;

      parent.addChild(obj);
      state.live.add(obj);

      obj.__mgDestroy = () => {
        try { if (obj.__mgTick) state.app.ticker?.remove?.(obj.__mgTick); } catch (_) {}
        try { obj.destroy?.({ children: true, texture: false, baseTexture: false }); }
        catch (_) { try { obj.destroy?.(); } catch (_) {} }
        state.live.delete(obj);
      };

      return obj;
    }

    function extractCanvas(target) {
      const r = state.renderer;
      if (r?.extract?.canvas) return r.extract.canvas(target);
      if (r?.plugins?.extract?.canvas) return r.plugins.extract.canvas(target);
      throw new Error("No extract.canvas available on renderer");
    }

    function toCanvas(a, b, c) {
      if (!state.ready) throw new Error("MGSprite not ready yet");

      let key, opts;
      if (typeof b === "string") { key = resolveKey(a, b); opts = c || {}; }
      else { key = resolveKey(null, a); opts = b || {}; }

      const frames = state.animations.get(key);
      const idx = Math.max(0, (opts.frameIndex ?? 0) | 0);
      const tex = frames?.length ? frames[idx % frames.length] : state.textures.get(key);
      if (!tex) throw new Error(`Unknown sprite/anim key: ${key}`);

      const spr = new state.ctors.Sprite(tex);
      const ax = opts.anchorX ?? spr.texture?.defaultAnchor?.x ?? 0.5;
      const ay = opts.anchorY ?? spr.texture?.defaultAnchor?.y ?? 0.5;
      spr.anchor?.set?.(ax, ay);
      spr.scale.set(opts.scale ?? 1);

      const pad = opts.pad ?? 2;
      const tmp = new state.ctors.Container();
      tmp.addChild(spr);

      try { tmp.updateTransform?.(); } catch (_) {}
      const bnd = spr.getBounds?.(true) || { x: 0, y: 0, width: spr.width, height: spr.height };
      spr.position.set(-bnd.x + pad, -bnd.y + pad);

      const canvas = extractCanvas(tmp);
      try { tmp.destroy?.({ children: true }); } catch (_) {}
      return canvas;
    }

    function clear() {
      for (const o of Array.from(state.live)) o.__mgDestroy?.();
    }

    function attach(container) { state.defaultParent = container; return true; }
    function attachProvider(fn) { state.defaultParent = fn; return true; }

    async function init() {
      if (state.ready) return true;
      if (_initP) return _initP;

      _initP = (async () => {
        const app = await waitWithTimeout(MGPixiHooks.appReady, 15000, "PIXI app");
        const renderer = await waitWithTimeout(MGPixiHooks.rendererReady, 15000, "PIXI renderer");
        state.app = app;
        state.renderer = renderer || app?.renderer || null;

        state.ctors = await waitForCtors(app);

        state.baseUrl = await MGAssets.base();
        await loadDefaultSprites();

        state.ready = true;
        return true;
      })();

      return _initP;
    }

    return {
      init,
      ready: () => state.ready,

      show,
      toCanvas,

      clear,
      attach,
      attachProvider,

      has: (a, b) => {
        const k = (typeof b === "string") ? resolveKey(a, b) : resolveKey(null, a);
        return state.textures.has(k) || state.animations.has(k);
      },
      key: (cat, asset) => makeKey(cat, asset),
    };
  })();

  // ============================================================
  // Module: MGAudio
  // ============================================================
  const MGAudio = (() => {
    let _initP = null;

    const ATOMS = {
      sfx: "soundEffectsVolumeAtom",
      music: "musicVolumeAtom",
      ambience: "ambienceVolumeAtom",
    };

    const VMIN = 0.001;
    const VMAX = 0.20;

    const state = {
      ready: false,
      baseUrl: null,

      urls: {
        ambience: new Map(),
        music: new Map(),
      },

      sfx: {
        mp3Url: null,
        atlasUrl: null,
        atlas: null,
        groups: new Map(),
        buffer: null,
      },

      tracks: {
        ambience: null,
        music: null,
      },

      ctx: null,
    };

    const clamp01 = (v) => clamp(v, 0, 1);

    function readAtomNumber(key, fallback = VMAX) {
      try {
        const raw = localStorage.getItem(key);
        if (raw == null) return fallback;

        let v;
        try { v = JSON.parse(raw); } catch (_) { v = raw; }

        if (typeof v === "number" && Number.isFinite(v)) return v;
        if (typeof v === "string") {
          const n = parseFloat(v);
          if (Number.isFinite(n)) return n;
        }
      } catch (_) {}
      return fallback;
    }

    function atomVolume(cat) {
      const key = ATOMS[cat];
      if (!key) return VMAX;
      return clamp(readAtomNumber(key, VMAX), 0, 1);
    }

    function vol100ToAtom(vol100) {
      const v = Number(vol100);
      if (!Number.isFinite(v)) return null;
      if (v <= 0) return 0;

      const vv = clamp(v, 1, 100);
      const t = (vv - 1) / 99;
      return VMIN + t * (VMAX - VMIN);
    }

    function resolveVolume(cat, optsVolume) {
      if (optsVolume === undefined || optsVolume === null) return atomVolume(cat);
      const mapped = vol100ToAtom(optsVolume);
      if (mapped === null) return atomVolume(cat);
      return clamp01(mapped);
    }

    async function ensureAudioContext() {
      if (state.ctx) return state.ctx;
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) throw new Error("WebAudio not supported");
      state.ctx = new Ctx();
      return state.ctx;
    }

    async function resumeIfNeeded() {
      if (!state.ctx) return;
      if (state.ctx.state === "suspended") {
        try { await state.ctx.resume(); } catch (_) {}
      }
    }

    function buildSfxGroups(atlas) {
      const groups = new Map();
      const add = (base, name) => {
        if (!groups.has(base)) groups.set(base, []);
        groups.get(base).push(name);
      };

      for (const name of Object.keys(atlas || {})) {
        const m = /^(.*)_([A-Z])$/.exec(name);
        if (m?.[1]) add(m[1], name);
        else add(name, name);
      }

      for (const [base, arr] of groups.entries()) {
        arr.sort((a, b) => a.localeCompare(b));
        groups.set(base, arr);
      }

      state.sfx.groups = groups;
    }

    function pickSfxName(request) {
      const atlas = state.sfx.atlas;
      if (!atlas) throw new Error("SFX atlas not loaded");
      if (atlas[request]) return request;

      const variants = state.sfx.groups.get(request);
      if (variants?.length) return variants[(Math.random() * variants.length) | 0];

      throw new Error(`Unknown sfx/group: ${request}`);
    }

    async function loadSfxBuffer() {
      if (state.sfx.buffer) return state.sfx.buffer;
      if (!state.sfx.mp3Url) throw new Error("SFX mp3 url missing");

      const ctx = await ensureAudioContext();
      await resumeIfNeeded();

      const r = await gmGet(state.sfx.mp3Url, "arraybuffer");
      const ab = r.response;

      const buf = await new Promise((resolve, reject) => {
        const p = ctx.decodeAudioData(ab, resolve, reject);
        if (p?.then) p.then(resolve, reject);
      });

      state.sfx.buffer = buf;
      return buf;
    }

    async function playSfx(nameOrGroup, opts = {}) {
      if (!state.ready) throw new Error("MGAudio not ready yet");
      const req = String(nameOrGroup || "").trim();
      if (!req) throw new Error("Missing sfx name");

      const picked = pickSfxName(req);
      const seg = state.sfx.atlas[picked];
      if (!seg) throw new Error(`Missing segment for sfx: ${picked}`);

      const ctx = await ensureAudioContext();
      await resumeIfNeeded();
      const buf = await loadSfxBuffer();

      const start = Math.max(0, +seg.start || 0);
      const end = Math.max(start, +seg.end || start);
      const dur = Math.max(0.01, end - start);

      const vol = resolveVolume("sfx", opts.volume);

      const gain = ctx.createGain();
      gain.gain.value = vol;
      gain.connect(ctx.destination);

      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.connect(gain);
      src.start(0, start, dur);

      return { name: picked, source: src, start, end, duration: dur, volume: vol };
    }

    function stop(cat) {
      if (cat !== "music" && cat !== "ambience") return false;
      const a = state.tracks[cat];
      if (a) {
        try { a.pause(); } catch (_) {}
        try { a.src = ""; } catch (_) {}
      }
      state.tracks[cat] = null;
      return true;
    }

    function playTrack(cat, name, opts = {}) {
      if (!state.ready) throw new Error("MGAudio not ready yet");
      if (cat !== "music" && cat !== "ambience") throw new Error(`Invalid category: ${cat}`);

      const url = state.urls[cat].get(name);
      if (!url) throw new Error(`Unknown ${cat}: ${name}`);

      stop(cat);

      const a = new Audio(url);
      a.loop = !!opts.loop;
      a.volume = resolveVolume(cat, opts.volume);
      a.preload = "auto";
      a.play().catch(() => {});

      state.tracks[cat] = a;
      return a;
    }

    async function play(category, asset, opts = {}) {
      const cat = String(category || "").trim();
      const name = String(asset || "").trim();
      if (!cat || !name) throw new Error("play(category, asset) missing args");

      if (cat === "sfx") return playSfx(name, opts);
      if (cat === "music" || cat === "ambience") return playTrack(cat, name, opts);

      throw new Error(`Unknown category: ${cat}`);
    }

    function list(category, { groups = false } = {}) {
      const cat = String(category || "").trim();
      if (cat === "music" || cat === "ambience") return Array.from(state.urls[cat].keys()).sort();
      if (cat === "sfx") {
        if (!state.sfx.atlas) return [];
        return groups ? Array.from(state.sfx.groups.keys()).sort() : Object.keys(state.sfx.atlas).sort();
      }
      return [];
    }

    function refreshVolumes() {
      if (state.tracks.music) state.tracks.music.volume = atomVolume("music");
      if (state.tracks.ambience) state.tracks.ambience.volume = atomVolume("ambience");
      return true;
    }

    async function init() {
      if (state.ready) return true;
      if (_initP) return _initP;

      _initP = (async () => {
        state.baseUrl = await MGAssets.base();

        const manifest = await MGManifest.load(state.baseUrl);
        const bundle = MGManifest.getBundle(manifest, "audio");
        if (!bundle) throw new Error("No audio bundle in manifest");

        for (const asset of bundle.assets || []) {
          for (const src of asset.src || []) {
            if (typeof src !== "string") continue;

            const m = /^audio\/(ambience|music)\/(.+)\.mp3$/i.exec(src);
            if (m) {
              const cat = m[1].toLowerCase();
              const name = m[2];
              state.urls[cat].set(name, joinPath(state.baseUrl, src));
              continue;
            }

            if (/^audio\/sfx\/sfx\.mp3$/i.test(src)) state.sfx.mp3Url = joinPath(state.baseUrl, src);
            if (/^audio\/sfx\/sfx\.json$/i.test(src)) state.sfx.atlasUrl = joinPath(state.baseUrl, src);
          }
        }

        if (!state.sfx.atlasUrl) throw new Error("Missing audio/sfx/sfx.json in manifest");
        state.sfx.atlas = await getJSON(state.sfx.atlasUrl);
        buildSfxGroups(state.sfx.atlas);

        state.ready = true;
        return true;
      })();

      return _initP;
    }

    return {
      init,
      ready: () => state.ready,

      play,
      stop,
      list,

      refreshVolumes,

      atom: (cat) => atomVolume(cat),
      map100: (v) => vol100ToAtom(v),
    };
  })();

  // ============================================================
  // Module: MGCosmetic
  // ============================================================
  const MGCosmetic = (() => {
    let _initP = null;

    const state = {
      ready: false,
      baseUrl: null,

      byCat: new Map(),
      byBase: new Map(),

      overlay: null,
      live: new Set(),
      defaultParent: null,
    };

    function ensureOverlay() {
      if (state.overlay) return state.overlay;

      const d = document.createElement("div");
      d.id = "MG_COSMETIC_OVERLAY";
      d.style.cssText = [
        "position:fixed",
        "left:0",
        "top:0",
        "width:100vw",
        "height:100vh",
        "pointer-events:none",
        "z-index:99999999",
      ].join(";");

      document.documentElement.appendChild(d);
      state.overlay = d;
      return d;
    }

    function getDefaultParent() {
      const p = state.defaultParent;
      if (!p) return null;
      try { return (typeof p === "function") ? p() : p; } catch (_) { return null; }
    }

    function stripCosmeticPath(s) {
      let x = String(s || "").trim();
      if (!x) return "";
      x = x.replace(/^cosmetic\//i, "");
      x = x.replace(/\.png$/i, "");
      return x;
    }

    function normalize(a, b) {
      if (b === undefined) {
        const base = stripCosmeticPath(a);
        const i = base.indexOf("_");
        if (i < 0) return { cat: "", asset: base, base };
        return { cat: base.slice(0, i), asset: base.slice(i + 1), base };
      }

      const cat = String(a || "").trim();
      const asset = stripCosmeticPath(b);
      const base = asset.includes("_") ? asset : `${cat}_${asset}`;

      if (asset.includes("_") && !cat) {
        const i = asset.indexOf("_");
        return { cat: asset.slice(0, i), asset: asset.slice(i + 1), base: asset };
      }
      return { cat, asset: asset.replace(/^.+?_/, ""), base };
    }

    function categories() {
      return Array.from(state.byCat.keys()).sort((x, y) => x.localeCompare(y));
    }

    function list(cat) {
      const m = state.byCat.get(String(cat || "").trim());
      if (!m) return [];
      return Array.from(m.keys()).sort((a, b) => a.localeCompare(b));
    }

    function url(a, b) {
      const { cat, asset, base } = normalize(a, b);

      const direct = state.byBase.get(base);
      if (direct) return direct;

      const m = state.byCat.get(cat);
      const u = m?.get(asset);
      if (u) return u;

      if (!state.baseUrl) throw new Error("MGCosmetic not initialized");
      if (!base) throw new Error("Invalid cosmetic name");
      return joinPath(state.baseUrl, `cosmetic/${base}.png`);
    }

    function create(a, b, opts = {}) {
      if (!state.ready) throw new Error("MGCosmetic not ready yet");

      if (typeof b === "object" && b !== null) {
        opts = b;
        b = undefined;
      }

      const u = url(a, b);
      const img = document.createElement("img");
      img.decoding = "async";
      img.loading = "eager";
      img.src = u;

      img.alt = (opts.alt != null) ? String(opts.alt) : stripCosmeticPath(b ?? a);
      if (opts.className) img.className = String(opts.className);

      if (opts.width != null) img.style.width = String(opts.width);
      if (opts.height != null) img.style.height = String(opts.height);
      if (opts.opacity != null) img.style.opacity = String(opts.opacity);

      if (opts.style && typeof opts.style === "object") {
        for (const [k, v] of Object.entries(opts.style)) {
          try { img.style[k] = String(v); } catch (_) {}
        }
      }

      return img;
    }

    function show(a, b, opts = {}) {
      if (typeof b === "object" && b !== null) {
        opts = b;
        b = undefined;
      }

      const parent = opts.parent || getDefaultParent() || ensureOverlay();
      const img = create(a, b, opts);

      const useOverlayPos = parent === state.overlay || opts.center || opts.x != null || opts.y != null || opts.absolute;

      if (useOverlayPos) {
        img.style.position = "absolute";
        img.style.pointerEvents = "none";
        img.style.zIndex = String(opts.zIndex ?? 999999);

        const scale = (opts.scale ?? 1);
        const rot = (opts.rotation ?? 0);

        if (opts.center) {
          img.style.left = "50%";
          img.style.top = "50%";
          img.style.transform = `translate(-50%, -50%) scale(${scale}) rotate(${rot}rad)`;
        } else {
          const x = (opts.x ?? (innerWidth / 2));
          const y = (opts.y ?? (innerHeight / 2));
          img.style.left = `${x}px`;
          img.style.top = `${y}px`;
          img.style.transform = `scale(${scale}) rotate(${rot}rad)`;
          if (opts.anchor === "center") img.style.transform = `translate(-50%, -50%) scale(${scale}) rotate(${rot}rad)`;
        }
      }

      parent.appendChild(img);
      state.live.add(img);

      img.__mgDestroy = () => {
        try { img.remove(); } catch (_) {}
        state.live.delete(img);
      };

      return img;
    }

    function attach(elOrFn) { state.defaultParent = elOrFn; return true; }
    function clear() { for (const el of Array.from(state.live)) el.__mgDestroy?.(); }

    async function init() {
      if (state.ready) return true;
      if (_initP) return _initP;

      _initP = (async () => {
        state.baseUrl = await MGAssets.base();

        const manifest = await MGManifest.load(state.baseUrl);
        const bundle = MGManifest.getBundle(manifest, "cosmetic");
        if (!bundle) throw new Error("No 'cosmetic' bundle in manifest");

        state.byCat.clear();
        state.byBase.clear();

        for (const asset of bundle.assets || []) {
          for (const src of asset.src || []) {
            if (typeof src !== "string") continue;
            if (!/^cosmetic\/.+\.png$/i.test(src)) continue;

            const file = src.split("/").pop();
            const base = file.replace(/\.png$/i, "");
            const i = base.indexOf("_");
            if (i < 0) continue;

            const cat = base.slice(0, i);
            const name = base.slice(i + 1);
            const u = joinPath(state.baseUrl, src);

            state.byBase.set(base, u);
            if (!state.byCat.has(cat)) state.byCat.set(cat, new Map());
            state.byCat.get(cat).set(name, u);
          }
        }

        state.ready = true;
        return true;
      })();

      return _initP;
    }

    return {
      init,
      ready: () => state.ready,

      categories,
      list,
      url,

      create,
      show,

      attach,
      clear,
    };
  })();

  // ============================================================
  // Module: MGTile (TileObject API + pointToTile sans overlay)
  // ============================================================
  const MGTile = (() => {
    let _initP = null;

    const state = {
      ready: false,
      engine: null,
      tos: null,
      _bindPatched: false,

      xform: null,
      xformAt: 0,
    };

    const origBind = Function.prototype.bind;

    const looksLikeEngine = (o) =>
      o && typeof o === "object" &&
      typeof o.start === "function" &&
      typeof o.destroy === "function" &&
      o.app && o.app.stage && o.app.renderer &&
      o.systems && typeof o.systems.values === "function";

    function findTileObjectSystem(engine) {
      try {
        for (const e of engine.systems.values()) {
          const s = e?.system;
          if (s?.name === "tileObject") return s;
        }
      } catch {}
      return null;
    }

    function captureOnce() {
      if (state.engine && state.tos) return true;
      if (state._bindPatched) return false;

      state._bindPatched = true;

      Function.prototype.bind = function (thisArg, ...args) {
        const bound = origBind.call(this, thisArg, ...args);
        try {
          if (!state.engine && looksLikeEngine(thisArg)) {
            state.engine = thisArg;
            state.tos = findTileObjectSystem(thisArg) || null;

            Function.prototype.bind = origBind;
            state._bindPatched = false;
          }
        } catch {}
        return bound;
      };

      return false;
    }

    captureOnce();

    const engine = () => state.engine || null;
    const tos = () => state.tos || null;

    function deepClone(v) {
      try { if (typeof structuredClone === "function") return structuredClone(v); } catch {}
      try { return JSON.parse(JSON.stringify(v)); } catch {}
      return v;
    }

    function cols() {
      const c = tos()?.map?.cols;
      return Number.isFinite(c) && c > 0 ? c : null;
    }

    function rows() {
      const r = tos()?.map?.rows;
      return Number.isFinite(r) && r > 0 ? r : null;
    }

    function gidx(tx, ty) {
      const c = cols();
      if (!c) return null;
      return ((ty * c + tx) | 0);
    }

    function getTileViewAt(tx, ty, ensure = true) {
      const TOS = tos();
      const gi = gidx(tx, ty);
      if (!TOS || gi == null) return { gidx: null, tv: null };

      let tv = TOS.tileViews?.get?.(gi) || null;
      if (!tv && ensure && typeof TOS.getOrCreateTileView === "function") {
        try { tv = TOS.getOrCreateTileView(gi); } catch {}
      }
      return { gidx: gi, tv: tv || null };
    }

    function applyTileObject(tx, ty, nextObj, opts = {}) {
      const ensureView = opts.ensureView !== false;
      const forceUpdate = opts.forceUpdate !== false;

      const E = engine();
      const { gidx: gi, tv } = getTileViewAt(Number(tx), Number(ty), ensureView);
      if (gi == null) throw new Error("MGTile: cols indisponible (engine/TOS pas prêt)");
      if (!tv) throw new Error("MGTile: TileView indispo (non instanciée et non créable)");

      const before = tv.tileObject;

      if (typeof tv.onDataChanged !== "function") {
        throw new Error("MGTile: tileView.onDataChanged introuvable (API différente ?)");
      }

      tv.onDataChanged(nextObj);

      if (forceUpdate && E?.reusableContext && typeof tv.update === "function") {
        try { tv.update(E.reusableContext); } catch {}
      }

      return { ok: true, tx: Number(tx), ty: Number(ty), gidx: gi, before, after: tv.tileObject };
    }

    function assertType(obj, type) {
      if (!obj) throw new Error("MGTile: pas de tileObject sur cette tile");
      if (obj.objectType !== type) throw new Error(`MGTile: objectType attendu "${type}", reçu "${obj.objectType}"`);
    }

    function patchPlantSlot(slot, patch) {
      const p = patch || {};
      if ("startTime" in p) slot.startTime = Number(p.startTime);
      if ("endTime" in p) slot.endTime = Number(p.endTime);
      if ("targetScale" in p) slot.targetScale = Number(p.targetScale);

      if ("mutations" in p) {
        if (!Array.isArray(p.mutations)) throw new Error("MGTile: mutations doit être un array de string");
        slot.mutations = p.mutations.slice();
      }
    }

    async function waitForCapture(timeoutMs = 15000) {
      const t0 = performance.now();
      while (performance.now() - t0 < timeoutMs) {
        if (engine() && tos()) return true;
        captureOnce();
        await sleep(50);
      }
      throw new Error("MGTile init timeout (engine/TOS non capturé)");
    }

    async function init(timeoutMs = 15000) {
      if (state.ready) return true;
      if (_initP) return _initP;

      _initP = (async () => {
        await waitForCapture(timeoutMs);
        if (!tos()) throw new Error("MGTile: engine capturé mais tileObject system introuvable");
        state.ready = true;
        return true;
      })();

      return _initP;
    }

    function hook() {
      const ok = !!(engine() && tos());
      if (ok) return { ok: true, engine: engine(), tos: tos() };
      captureOnce();
      return { ok: false, engine: engine(), tos: tos(), note: "Pas capturé. Attends la room, ou reload." };
    }

    function ensureReady() {
      if (!state.ready) throw new Error("MGTile: pas prêt. Fais MGTile.init() d’abord.");
    }

    function getTileObject(tx, ty, opts = {}) {
      ensureReady();
      const ensureView = opts.ensureView !== false;
      const clone = opts.clone !== false;

      const { gidx: gi, tv } = getTileViewAt(Number(tx), Number(ty), ensureView);
      if (gi == null) throw new Error("MGTile: cols indisponible (engine pas prêt)");
      if (!tv) return { tx: Number(tx), ty: Number(ty), gidx: gi, tileView: null, tileObject: undefined };

      const obj = tv.tileObject;
      return {
        tx: Number(tx),
        ty: Number(ty),
        gidx: gi,
        tileView: tv,
        tileObject: clone ? deepClone(obj) : obj,
      };
    }

    function setTileEmpty(tx, ty, opts = {}) {
      ensureReady();
      return applyTileObject(tx, ty, null, opts);
    }

    function setTilePlant(tx, ty, patch, opts = {}) {
      ensureReady();
      const info = getTileObject(tx, ty, { ...opts, clone: false });
      const cur = info.tileView?.tileObject;
      assertType(cur, "plant");

      const next = deepClone(cur);
      if (!Array.isArray(next.slots)) next.slots = [];

      const p = patch || {};
      if ("plantedAt" in p) next.plantedAt = Number(p.plantedAt);
      if ("maturedAt" in p) next.maturedAt = Number(p.maturedAt);
      if ("species" in p) next.species = String(p.species);

      if ("slotIdx" in p && "slotPatch" in p) {
        const i = (Number(p.slotIdx) | 0);
        if (!next.slots[i]) throw new Error(`MGTile: slot plant ${i} n'existe pas`);
        patchPlantSlot(next.slots[i], p.slotPatch);
        return applyTileObject(tx, ty, next, opts);
      }

      if ("slots" in p) {
        const s = p.slots;

        if (Array.isArray(s)) {
          for (let i = 0; i < s.length; i++) {
            if (s[i] == null) continue;
            if (!next.slots[i]) throw new Error(`MGTile: slot plant ${i} n'existe pas`);
            patchPlantSlot(next.slots[i], s[i]);
          }
        } else if (s && typeof s === "object") {
          for (const k of Object.keys(s)) {
            const i = (Number(k) | 0);
            if (!Number.isFinite(i)) continue;
            if (!next.slots[i]) throw new Error(`MGTile: slot plant ${i} n'existe pas`);
            patchPlantSlot(next.slots[i], s[k]);
          }
        } else {
          throw new Error("MGTile: patch.slots doit être array ou object map");
        }

        return applyTileObject(tx, ty, next, opts);
      }

      return applyTileObject(tx, ty, next, opts);
    }

    function setTileDecor(tx, ty, patch, opts = {}) {
      ensureReady();
      const info = getTileObject(tx, ty, { ...opts, clone: false });
      const cur = info.tileView?.tileObject;
      assertType(cur, "decor");

      const next = deepClone(cur);
      const p = patch || {};
      if ("rotation" in p) next.rotation = Number(p.rotation);
      return applyTileObject(tx, ty, next, opts);
    }

    function setTileEgg(tx, ty, patch, opts = {}) {
      ensureReady();
      const info = getTileObject(tx, ty, { ...opts, clone: false });
      const cur = info.tileView?.tileObject;
      assertType(cur, "egg");

      const next = deepClone(cur);
      const p = patch || {};
      if ("plantedAt" in p) next.plantedAt = Number(p.plantedAt);
      if ("maturedAt" in p) next.maturedAt = Number(p.maturedAt);
      return applyTileObject(tx, ty, next, opts);
    }

    function setTileObjectRaw(tx, ty, objOrFn, opts = {}) {
      ensureReady();
      const ensureView = opts.ensureView !== false;
      const forceUpdate = opts.forceUpdate !== false;

      const E = engine();
      const { gidx: gi, tv } = getTileViewAt(Number(tx), Number(ty), ensureView);
      if (gi == null) throw new Error("MGTile: cols indisponible (engine pas prêt)");
      if (!tv) throw new Error("MGTile: TileView indispo");

      const before = tv.tileObject;
      const next = (typeof objOrFn === "function") ? objOrFn(deepClone(before)) : objOrFn;

      tv.onDataChanged(next);
      if (forceUpdate && E?.reusableContext && typeof tv.update === "function") {
        try { tv.update(E.reusableContext); } catch {}
      }

      return { ok: true, tx: Number(tx), ty: Number(ty), gidx: gi, before, after: tv.tileObject };
    }

    function inspect(tx, ty, opts = {}) {
      ensureReady();
      const ensureView = opts.ensureView !== false;
      const { gidx: gi, tv } = getTileViewAt(Number(tx), Number(ty), ensureView);
      if (gi == null) throw new Error("MGTile: cols indisponible");
      if (!tv) return { ok: true, tx: Number(tx), ty: Number(ty), gidx: gi, tv: null, tileObject: undefined };

      const clone = opts.clone !== false;
      const obj = tv.tileObject;

      return {
        ok: true,
        tx: Number(tx),
        ty: Number(ty),
        gidx: gi,
        objectType: obj?.objectType ?? null,
        tileObject: clone ? deepClone(obj) : obj,
        tvKeys: Object.keys(tv || {}).sort(),
        tileView: tv,
      };
    }

    // ---------- pointToTile (sans overlay)
    function getTileDisplay(tv) {
      if (!tv) return null;

      const ok = (o) => o && (typeof o.getGlobalPosition === "function" || typeof o.toGlobal === "function");

      const prefer = [
        "container","root","view","tile","ground","base","floor","bg","background",
        "baseSprite","tileSprite","displayObject","gfx","graphics","sprite",
      ];
      for (const k of prefer) if (ok(tv[k])) return tv[k];
      if (ok(tv)) return tv;

      const known = [tv.container, tv.root, tv.view, tv.displayObject, tv.tileSprite, tv.gfx, tv.graphics, tv.sprite];
      for (const o of known) if (ok(o)) return o;

      try { for (const k of Object.keys(tv)) if (ok(tv[k])) return tv[k]; } catch {}
      return null;
    }

    function getGlobalPos(disp) {
      const p = tryDo(() => disp?.getGlobalPosition?.());
      if (p && Number.isFinite(p.x) && Number.isFinite(p.y)) return { x: p.x, y: p.y };
      const q = tryDo(() => disp?.toGlobal?.({ x: 0, y: 0 }));
      if (q && Number.isFinite(q.x) && Number.isFinite(q.y)) return { x: q.x, y: q.y };
      return null;
    }

    function detectAnchorMode(disp) {
      try {
        if (!disp?.getBounds) return "center";
        const b = disp.getBounds();
        const gp = getGlobalPos(disp);
        if (!gp || !b || !Number.isFinite(b.width) || !Number.isFinite(b.height)) return "center";
        const cx = b.x + b.width / 2, cy = b.y + b.height / 2;
        return (Math.hypot(gp.x - cx, gp.y - cy) < Math.hypot(gp.x - b.x, gp.y - b.y)) ? "center" : "topleft";
      } catch { return "center"; }
    }

    function buildTileTransform() {
      const TOS = tos();
      const c = TOS?.map?.cols;
      const r = TOS?.map?.rows;

      if (!TOS || !Number.isFinite(c) || c <= 1) return null;

      const rr = (Number.isFinite(r) && r > 1) ? r : null;

      const cand = [[0,0],[1,1],[Math.min(2, c - 2), 0],[0,1]];
      if (rr && rr > 2) cand.push([Math.floor(c/2), Math.floor(rr/2)]);

      for (const [bx, by] of cand) {
        if (bx < 0 || by < 0 || bx >= c) continue;
        if (rr && by >= rr) continue;

        const a = getTileViewAt(bx, by, true).tv;
        const b = (bx + 1 < c) ? getTileViewAt(bx + 1, by, true).tv : null;
        const d = getTileViewAt(bx, by + 1, true).tv;

        const da = getTileDisplay(a), db = getTileDisplay(b), dd = getTileDisplay(d);
        if (!da || !db || !dd) continue;

        const p0 = getGlobalPos(da), p1 = getGlobalPos(db), p2 = getGlobalPos(dd);
        if (!p0 || !p1 || !p2) continue;

        const vx = { x: p1.x - p0.x, y: p1.y - p0.y };
        const vy = { x: p2.x - p0.x, y: p2.y - p0.y };
        const det = vx.x * vy.y - vx.y * vy.x;
        if (!Number.isFinite(det) || Math.abs(det) < 1e-6) continue;

        const invDet = 1 / det;
        const inv = { a: vy.y * invDet, b: -vy.x * invDet, c: -vx.y * invDet, d: vx.x * invDet };

        const origin = { x: p0.x - bx*vx.x - by*vy.x, y: p0.y - bx*vx.y - by*vy.y };
        const anchorMode = detectAnchorMode(da);
        const originCenter = (anchorMode === "center")
          ? origin
          : { x: origin.x + 0.5*(vx.x + vy.x), y: origin.y + 0.5*(vx.y + vy.y) };

        return { ok: true, cols: c, rows: rr, vx, vy, inv, anchorMode, originCenter };
      }

      return null;
    }

    function rebuildTransform() {
      ensureReady();
      state.xform = buildTileTransform();
      state.xformAt = Date.now();
      return { ok: !!state.xform?.ok, xform: state.xform };
    }

    function pointToTile(point, opts = {}) {
      ensureReady();
      if (!point || !Number.isFinite(point.x) || !Number.isFinite(point.y)) return null;

      const maxAgeMs = Number.isFinite(opts.maxAgeMs) ? opts.maxAgeMs : 1500;
      if (!state.xform?.ok || opts.forceRebuild || (Date.now() - state.xformAt) > maxAgeMs) {
        rebuildTransform();
      }

      const xf = state.xform;
      if (!xf?.ok) return null;

      const dx = point.x - xf.originCenter.x;
      const dy = point.y - xf.originCenter.y;

      const fx = xf.inv.a*dx + xf.inv.b*dy;
      const fy = xf.inv.c*dx + xf.inv.d*dy;

      const ix = Math.floor(fx), iy = Math.floor(fy);
      const cand = [[ix,iy],[ix+1,iy],[ix,iy+1],[ix+1,iy+1]];

      let best = null, bestD2 = Infinity;
      for (const [tx, ty] of cand) {
        if (tx < 0 || ty < 0 || tx >= xf.cols) continue;
        if (Number.isFinite(xf.rows) && ty >= xf.rows) continue;

        const cx = xf.originCenter.x + tx*xf.vx.x + ty*xf.vy.x;
        const cy = xf.originCenter.y + tx*xf.vx.y + ty*xf.vy.y;
        const d2 = (point.x - cx) ** 2 + (point.y - cy) ** 2;

        if (d2 < bestD2) bestD2 = d2, best = { tx, ty, fx, fy, x: point.x, y: point.y };
      }

      if (!best) return null;
      best.gidx = gidx(best.tx, best.ty);
      return best;
    }

    function help() {
      return [
        "MGTile.init()",
        "MGTile.hook()",
        "MGTile.getTileObject(tx,ty) / inspect(tx,ty)",
        "MGTile.setTileEmpty(tx,ty)",
        "MGTile.setTilePlant(tx,ty,{...}) / setTileDecor / setTileEgg",
        "MGTile.setTileObjectRaw(tx,ty,objOrFn)",
        "MGTile.rebuildTransform() / pointToTile({x,y})",
      ].join("\n");
    }

    return {
      init,
      ready: () => state.ready,

      hook,
      engine,
      tos,

      gidx: (tx, ty) => gidx(Number(tx), Number(ty)),

      getTileObject,
      inspect,

      setTileEmpty,
      setTilePlant,
      setTileDecor,
      setTileEgg,
      setTileObjectRaw,

      rebuildTransform,
      pointToTile,

      help,
    };
  })();


// =====================
// MGPixi (minimal + opti)
// Dépend de MGTile
// =====================
(() => {
  const root = (typeof unsafeWindow !== "undefined") ? unsafeWindow : window;

  const MGPixi = (() => {
    const S = {
      ready: false,
      app: null,
      renderer: null,
      stage: null,
      ticker: null,

      tileSets: new Map(),        // name -> [{x,y}]
      highlights: new Map(),      // key -> { root, tick, baseAlpha, tint:[{o, baseTint}] }
      watches: new Map(),         // key -> intervalId

      fades: new Map(),           // key -> { targets:[{o, baseAlpha}] }
      fadeWatches: new Map(),     // key -> intervalId
    };

    // ---- utils
    const tryDo = (fn) => { try { return fn(); } catch { return undefined; } };
    const clamp = (n, a, b) => (n < a ? a : (n > b ? b : n));
    const isObj = (v) => v && typeof v === "object";
    const isDisp = (o) => !!(o && typeof o.getBounds === "function" && ("parent" in o || "children" in o));
    const hasTint = (o) => !!(o && typeof o.tint === "number");
    const hasAlpha = (o) => !!(o && typeof o.alpha === "number");

    function MGTile() {
      if (!root.MGTile) throw new Error("MGPixi: MGTile introuvable");
      return root.MGTile;
    }

    // ---- expose captured pixi to console
    function expose() {
      root.$PIXI = root.PIXI || null;
      root.$app = S.app || null;
      root.$renderer = S.renderer || null;
      root.$stage = S.stage || null;
      root.$ticker = S.ticker || null;

      root.__MG_PIXI__ = {
        PIXI: root.$PIXI,
        app: root.$app,
        renderer: root.$renderer,
        stage: root.$stage,
        ticker: root.$ticker,
        ready: S.ready,
      };

      return root.__MG_PIXI__;
    }

    async function init(timeoutMs = 15000) {
      if (S.ready) { expose(); return true; }

      const T = MGTile();
      await T.init(timeoutMs);

      const eng = T.engine?.();
      const app = eng?.app || eng?.pixiApp || null;
      const ticker = app?.ticker || null;

      if (!app || !ticker) throw new Error("MGPixi: PIXI app/ticker introuvable");

      S.app = app;
      S.ticker = ticker;
      S.renderer = app?.renderer || null;
      S.stage = app?.stage || null;

      S.ready = true;
      expose();
      return true;
    }

    const ensure = () => { if (!S.ready) throw new Error("MGPixi: appelle MGPixi.init() d'abord"); };

    // ---- tilesets
    function normTiles(tiles) {
      if (!Array.isArray(tiles)) return [];
      const seen = new Set();
      const out = [];
      for (const t of tiles) {
        let x, y;
        if (Array.isArray(t)) { x = t[0]; y = t[1]; }
        else if (isObj(t)) { x = t.x ?? t.tx; y = t.y ?? t.ty; }
        x = Number(x); y = Number(y);
        if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
        x |= 0; y |= 0;
        const k = x + "," + y;
        if (seen.has(k)) continue;
        seen.add(k);
        out.push({ x, y });
      }
      return out;
    }

    function defineTileSet(name, tiles) {
      const n = String(name || "").trim();
      if (!n) throw new Error("MGPixi.defineTileSet: name vide");
      const list = normTiles(tiles);
      S.tileSets.set(n, list);
      return { ok: true, name: n, count: list.length };
    }

    const deleteTileSet = (name) => S.tileSets.delete(String(name || "").trim());
    const listTileSets = () => Array.from(S.tileSets.keys()).sort((a, b) => a.localeCompare(b));

    function hasFilter(o) { return !!(o && (o.tileSet != null || Array.isArray(o.tiles))); }

    function getEntries(filter) {
      const T = MGTile();
      const TOS = T.tos?.();
      const tileViews = TOS?.tileViews;
      if (!tileViews?.entries) throw new Error("MGPixi: TOS.tileViews introuvable");

      if (!hasFilter(filter)) return { entries: tileViews.entries(), gidxSet: null };

      let list = [];
      if (filter.tileSet != null) {
        const n = String(filter.tileSet || "").trim();
        const set = S.tileSets.get(n);
        if (!set) throw new Error(`MGPixi: tileSet introuvable "${n}"`);
        list = set;
      } else list = normTiles(filter.tiles);

      const map = new Map();
      for (const p of list) {
        const info = T.getTileObject(p.x, p.y, { ensureView: true, clone: false });
        if (info?.tileView && info.gidx != null) map.set(info.gidx, info.tileView);
      }
      return { entries: map.entries(), gidxSet: new Set(map.keys()) };
    }

    // ---- traversal light
    function collectTint(rootDisp, cap = 900) {
      const out = [];
      const st = [rootDisp];
      while (st.length && out.length < cap) {
        const n = st.pop();
        if (!n) continue;
        if (hasTint(n)) out.push(n);
        const ch = n.children;
        if (Array.isArray(ch)) for (let i = ch.length - 1; i >= 0; i--) st.push(ch[i]);
      }
      return out;
    }

    function collectAlpha(rootDisp, cap = 25000) {
      const out = [];
      const st = [rootDisp];
      let guard = 0;
      while (st.length && guard++ < cap) {
        const n = st.pop();
        if (!n) continue;
        if (hasAlpha(n)) out.push(n);
        const ch = n.children;
        if (Array.isArray(ch)) for (let i = ch.length - 1; i >= 0; i--) st.push(ch[i]);
      }
      return out;
    }

    // ---- highlight core
    function lerp(a, b, t) { return a + (b - a) * t; }
    function lerpColor(c0, c1, t) {
      const r0 = (c0 >> 16) & 255, g0 = (c0 >> 8) & 255, b0 = c0 & 255;
      const r1 = (c1 >> 16) & 255, g1 = (c1 >> 8) & 255, b1 = c1 & 255;
      const r = (lerp(r0, r1, t) | 0), g = (lerp(g0, g1, t) | 0), b = (lerp(b0, b1, t) | 0);
      return (r << 16) | (g << 8) | b;
    }

    function stopHighlight(key) {
      const e = S.highlights.get(key);
      if (!e) return false;
      tryDo(() => S.ticker.remove(e.tick));
      if (e.root && e.baseAlpha != null && hasAlpha(e.root)) tryDo(() => { e.root.alpha = e.baseAlpha; });
      for (const t of e.tint) if (t.o && hasTint(t.o)) tryDo(() => { t.o.tint = t.baseTint; });
      S.highlights.delete(key);
      return true;
    }

    function clearHighlights(prefix = null) {
      for (const k of Array.from(S.highlights.keys())) {
        if (prefix && !String(k).startsWith(prefix)) continue;
        stopHighlight(k);
      }
      return true;
    }

    function highlightPulse(rootDisp, opts = {}) {
      ensure();
      if (!isDisp(rootDisp)) throw new Error("MGPixi.highlightPulse: root invalide");

      const key = String(opts.key || ("hl:" + Math.random().toString(16).slice(2)));
      if (S.highlights.has(key)) return key;

      const baseAlpha = hasAlpha(rootDisp) ? Number(rootDisp.alpha) : null;
      const minA = clamp(Number(opts.minAlpha ?? 0.12), 0, 1);
      const maxA = clamp(Number(opts.maxAlpha ?? 1.00), 0, 1);
      const speed = Number(opts.speed ?? 1.25);
      const tint = (opts.tint ?? 0x7ff6ff) >>> 0;
      const tintMix = clamp(Number(opts.tintMix ?? 0.85), 0, 1);
      const deepTint = (opts.deepTint !== false);

      const tintTargets = [];
      if (deepTint) {
        for (const o of collectTint(rootDisp)) tintTargets.push({ o, baseTint: o.tint });
      } else if (hasTint(rootDisp)) tintTargets.push({ o: rootDisp, baseTint: rootDisp.tint });

      const start = performance.now();
      const tick = () => {
        const t = (performance.now() - start) / 1000;
        const s = (Math.sin(t * Math.PI * 2 * speed) + 1) / 2;
        const e = s * s * (3 - 2 * s);
        if (baseAlpha != null && hasAlpha(rootDisp)) rootDisp.alpha = clamp(lerp(minA, maxA, e) * baseAlpha, 0, 1);
        const mix = e * tintMix;
        for (const tt of tintTargets) if (tt.o && hasTint(tt.o)) tt.o.tint = lerpColor(tt.baseTint, tint, mix);
      };

      S.ticker.add(tick);
      S.highlights.set(key, { root: rootDisp, tick, baseAlpha, tint: tintTargets });
      return key;
    }

    // ---- slot resolver (fast heuristique)
    const DISP_KEYS = ["plantVisual", "cropVisual", "slotVisual", "slotView", "displayObject", "view", "container", "root", "sprite", "gfx", "graphics"];
    function pickDisp(node) {
      if (!node) return null;
      if (isDisp(node)) return node;
      if (!isObj(node)) return null;
      for (const k of DISP_KEYS) {
        const v = node[k];
        if (isDisp(v)) return v;
      }
      return null;
    }

    function findSlotDisplays(base, slotCount) {
      const q = [{ o: base, d: 0 }];
      const seen = new Set();
      const maxDepth = 6;

      while (q.length) {
        const { o, d } = q.shift();
        if (!o || d > maxDepth) continue;

        if (seen.has(o)) continue;
        seen.add(o);

        if (Array.isArray(o)) {
          if (o.length === slotCount) {
            const arr = new Array(slotCount);
            let ok = true;
            for (let i = 0; i < slotCount; i++) {
              const disp = pickDisp(o[i]);
              if (!disp) { ok = false; break; }
              arr[i] = disp;
            }
            if (ok) return arr;
          }
          for (const it of o) q.push({ o: it, d: d + 1 });
          continue;
        }

        if (isObj(o)) {
          for (const k in o) q.push({ o: o[k], d: d + 1 });
        }
      }
      return null;
    }

    function slotHasMutation(slot, wantLower) {
      const muts = slot?.mutations;
      if (!Array.isArray(muts)) return false;
      for (const m of muts) if (String(m || "").toLowerCase() === wantLower) return true;
      return false;
    }

    function highlightMutation(mutation, opts = {}) {
      ensure();
      const mut = String(mutation || "").trim().toLowerCase();
      if (!mut) throw new Error("MGPixi.highlightMutation: mutation vide");

      const { entries, gidxSet } = getEntries(opts);
      const prefix = "hlmut:" + mut + ":";

      if (opts.clear === true) {
        if (!gidxSet) clearHighlights(prefix);
        else {
          for (const k of Array.from(S.highlights.keys())) {
            const ks = String(k);
            if (!ks.startsWith(prefix)) continue;
            const parts = ks.split(":");
            const g = Number(parts[2]);
            if (gidxSet.has(g)) stopHighlight(ks);
          }
        }
      }

      const hlOpts = {
        tint: (opts.tint ?? 0x7ff6ff) >>> 0,
        minAlpha: Number(opts.minAlpha ?? 0.12),
        maxAlpha: Number(opts.maxAlpha ?? 1.00),
        speed: Number(opts.speed ?? 1.25),
        tintMix: Number(opts.tintMix ?? 0.85),
        deepTint: (opts.deepTint !== false),
      };

      let plants = 0, matchedSlots = 0, created = 0, failed = 0;

      for (const [gidx, tv] of entries) {
        const obj = tv?.tileObject;
        if (!obj || obj.objectType !== "plant") continue;

        const slots = obj.slots;
        if (!Array.isArray(slots) || slots.length === 0) continue;

        let any = false;
        const wanted = [];
        for (let i = 0; i < slots.length; i++) {
          if (slotHasMutation(slots[i], mut)) { wanted.push(i); any = true; }
        }
        if (!any) continue;

        plants++;
        matchedSlots += wanted.length;

        const base = tv?.childView?.plantVisual || tv?.childView || tv;
        const slotDisp = findSlotDisplays(base, slots.length);
        if (!slotDisp) { failed += wanted.length; continue; }

        for (const i of wanted) {
          const rootSlot = slotDisp[i];
          if (!rootSlot) { failed++; continue; }
          const key = prefix + gidx + ":" + i;
          if (S.highlights.has(key)) continue;
          highlightPulse(rootSlot, { key, ...hlOpts });
          created++;
        }
      }

      return { ok: true, mutation: mut, filtered: !!gidxSet, plantsMatched: plants, matchedSlots, newHighlights: created, failedSlots: failed };
    }

    function watchMutation(mutation, opts = {}) {
      ensure();
      const mut = String(mutation || "").trim().toLowerCase();
      if (!mut) throw new Error("MGPixi.watchMutation: mutation vide");

      const key = "watchmut:" + mut + ":" + (opts.tileSet ? ("set:" + opts.tileSet) : (opts.tiles ? "tiles" : "all"));
      const intervalMs = Number.isFinite(opts.intervalMs) ? opts.intervalMs : 1000;

      const prev = S.watches.get(key);
      if (prev) clearInterval(prev);

      const id = setInterval(() => { tryDo(() => highlightMutation(mut, { ...opts, clear: false })); }, intervalMs);
      S.watches.set(key, id);
      return { ok: true, key, mutation: mut, intervalMs };
    }

    function stopWatchMutation(keyOrMutation) {
      const k = String(keyOrMutation || "").trim();
      if (!k) return false;

      if (!k.startsWith("watchmut:")) {
        const mut = k.toLowerCase();
        let stopped = 0;
        for (const [wk, id] of Array.from(S.watches.entries())) {
          if (wk.startsWith("watchmut:" + mut + ":")) {
            clearInterval(id);
            S.watches.delete(wk);
            stopped++;
          }
        }
        return stopped > 0;
      }

      const id = S.watches.get(k);
      if (!id) return false;
      clearInterval(id);
      S.watches.delete(k);
      return true;
    }

    // ---- inspect tile
    function summarizePlant(obj) {
      const slots = Array.isArray(obj?.slots) ? obj.slots : [];
      return {
        objectType: "plant",
        species: obj?.species ?? null,
        plantedAt: obj?.plantedAt ?? null,
        maturedAt: obj?.maturedAt ?? null,
        slotCount: slots.length,
        slots: slots.map((s, i) => ({ idx: i, mutations: Array.isArray(s?.mutations) ? s.mutations.slice() : [] }))
      };
    }

    function inspectTile(tx, ty, opts = {}) {
      ensure();
      const T = MGTile();
      const x = Number(tx) | 0, y = Number(ty) | 0;
      const ensureView = (opts.ensureView !== false);

      const info = T.getTileObject(x, y, { ensureView, clone: false });
      const tv = info?.tileView || null;
      const obj = tv?.tileObject;

      const res = {
        ok: true,
        tx: x, ty: y,
        gidx: info?.gidx ?? (T.gidx?.(x, y) ?? null),
        hasTileView: !!tv,
        objectType: obj?.objectType ?? null,
        tileObject: obj ?? null,
        summary: (obj?.objectType === "plant") ? summarizePlant(obj) : (obj ? { objectType: obj.objectType ?? null } : null),
        display: tv ? (tv.childView?.plantVisual || tv.childView || tv.displayObject || tv) : null,
      };

      if (opts.log !== false) tryDo(() => console.log("[MGPixi.inspectTile]", res));
      return res;
    }

    // ---- fades (species alpha)
    function resolvePlantRoot(tv) {
      const base = tv?.childView?.plantVisual || tv?.childView?.cropVisual || tv?.childView || tv?.displayObject || tv;
      return pickDisp(base) || pickDisp(tv?.displayObject) || null;
    }

    function stopFade(key) {
      const e = S.fades.get(key);
      if (!e) return false;
      for (const t of e.targets) if (t.o && hasAlpha(t.o) && Number.isFinite(t.baseAlpha)) tryDo(() => { t.o.alpha = t.baseAlpha; });
      S.fades.delete(key);
      return true;
    }

    function clearFades(prefix = null) {
      for (const k of Array.from(S.fades.keys())) {
        if (prefix && !String(k).startsWith(prefix)) continue;
        stopFade(k);
      }
      return true;
    }

    function clearSpeciesFade(species, opts = {}) {
      ensure();
      const sp = String(species || "").trim().toLowerCase();
      if (!sp) throw new Error("MGPixi.clearSpeciesFade: species vide");

      const prefix = "fade:" + sp + ":";

      if (!hasFilter(opts)) return clearFades(prefix);

      const { gidxSet } = getEntries(opts);
      if (!gidxSet) return clearFades(prefix);

      for (const k of Array.from(S.fades.keys())) {
        const ks = String(k);
        if (!ks.startsWith(prefix)) continue;
        const g = Number(ks.slice(prefix.length));
        if (gidxSet.has(g)) stopFade(ks);
      }
      return true;
    }

    function fadeSpecies(species, opts = {}) {
      ensure();
      const sp = String(species || "").trim().toLowerCase();
      if (!sp) throw new Error("MGPixi.fadeSpecies: species vide");

      const alpha = clamp(Number(opts.alpha ?? 0.2), 0, 1);
      const deep = (opts.deep === true);

      const { entries, gidxSet } = getEntries(opts);
      const prefix = "fade:" + sp + ":";

      if (opts.clear === true) clearSpeciesFade(sp, opts);

      let plantsSeen = 0, matched = 0, applied = 0, failed = 0;

      for (const [gidx, tv] of entries) {
        const obj = tv?.tileObject;
        if (!obj || obj.objectType !== "plant") continue;
        plantsSeen++;

        const s = String(obj.species || "").trim().toLowerCase();
        if (!s || s !== sp) continue;
        matched++;

        const rootDisp = resolvePlantRoot(tv);
        if (!rootDisp || !hasAlpha(rootDisp)) { failed++; continue; }

        const key = prefix + gidx;
        if (S.fades.has(key)) {
          tryDo(() => { rootDisp.alpha = alpha; });
          applied++;
          continue;
        }

        const targets = deep ? collectAlpha(rootDisp) : [rootDisp];
        const snap = [];
        for (const o of targets) if (hasAlpha(o)) snap.push({ o, baseAlpha: Number(o.alpha) });

        for (const t of snap) tryDo(() => { t.o.alpha = alpha; });
        S.fades.set(key, { targets: snap });
        applied++;
      }

      return { ok: true, species: sp, alpha, deep, filtered: !!gidxSet, plantsSeen, matchedPlants: matched, applied, failed, totalFades: S.fades.size };
    }

    function watchFadeSpecies(species, opts = {}) {
      ensure();
      const sp = String(species || "").trim().toLowerCase();
      if (!sp) throw new Error("MGPixi.watchFadeSpecies: species vide");

      const key = "watchfade:" + sp + ":" + (opts.tileSet ? ("set:" + opts.tileSet) : (opts.tiles ? "tiles" : "all"));
      const intervalMs = Number.isFinite(opts.intervalMs) ? opts.intervalMs : 1000;

      const prev = S.fadeWatches.get(key);
      if (prev) clearInterval(prev);

      const id = setInterval(() => { tryDo(() => fadeSpecies(sp, { ...opts, clear: false })); }, intervalMs);
      S.fadeWatches.set(key, id);
      return { ok: true, key, species: sp, intervalMs };
    }

    function stopWatchFadeSpecies(keyOrSpecies) {
      const k = String(keyOrSpecies || "").trim();
      if (!k) return false;

      if (!k.startsWith("watchfade:")) {
        const sp = k.toLowerCase();
        let stopped = 0;
        for (const [wk, id] of Array.from(S.fadeWatches.entries())) {
          if (wk.startsWith("watchfade:" + sp + ":")) {
            clearInterval(id);
            S.fadeWatches.delete(wk);
            stopped++;
          }
        }
        return stopped > 0;
      }

      const id = S.fadeWatches.get(k);
      if (!id) return false;
      clearInterval(id);
      S.fadeWatches.delete(k);
      return true;
    }

    // ---- return (avec getters live)
    return {
      init,
      ready: () => S.ready,
      expose,

      get app() { return S.app; },
      get renderer() { return S.renderer; },
      get stage() { return S.stage; },
      get ticker() { return S.ticker; },
      get PIXI() { return root.PIXI || null; },

      defineTileSet,
      deleteTileSet,
      listTileSets,

      highlightPulse,
      stopHighlight,
      clearHighlights,

      highlightMutation,
      watchMutation,
      stopWatchMutation,

      inspectTile,

      fadeSpecies,
      clearSpeciesFade,
      clearFades,
      watchFadeSpecies,
      stopWatchFadeSpecies,
    };
  })();

  root.MGPixi = MGPixi;
})();


// =====================
// MGSkins (Pixi v7 atlas patcher + custom(category, asset, url))
// Dépend: MGAssets, MGManifest, getJSON, getBlob, blobToImage, joinPath, relPath, sleep
// =====================
const MGSkins = (() => {
  const root = (typeof unsafeWindow !== "undefined") ? unsafeWindow : window;

  const S = {
    ready: false,
    baseUrl: null,

    // frameKey -> { imgRel, frame:{x,y,w,h}, rotated:boolean }
    frameIndex: new Map(),

    // "sprite/pet/peacock.png" -> "sprite/pet/Peacock.png"
    lowerKeyToKey: new Map(),

    // cat -> Set(assetKeys) (assetKeys = après "sprite/<cat>/")
    catIndex: new Map(),

    // imgRel -> atlasJsonPath (owner)
    imgOwners: new Map(),
  };

  const isAtlas = (j) =>
    j && typeof j === "object" && j.frames && j.meta && typeof j.meta.image === "string";

  // ----------------------------
  // Cache Pixi v7 helpers
  // ----------------------------
  function getCacheMaps() {
    const P = root.PIXI;
    const out = [];

    if (!P) return out;

    const c1 = P.Assets?.cache;
    if (c1) {
      if (c1 instanceof Map) out.push({ name: "PIXI.Assets.cache(Map)", map: c1 });
      if (c1._cache instanceof Map) out.push({ name: "PIXI.Assets.cache._cache", map: c1._cache });
      if (c1.cache instanceof Map) out.push({ name: "PIXI.Assets.cache.cache", map: c1.cache });
    }

    const c2 = P.Cache;
    if (c2) {
      if (c2._cache instanceof Map) out.push({ name: "PIXI.Cache._cache", map: c2._cache });
      if (c2.cache instanceof Map) out.push({ name: "PIXI.Cache.cache", map: c2.cache });
    }

    // vieux fallback (souvent inutile en v7, mais on garde)
    const tc = P.utils?.TextureCache || P.TextureCache;
    if (tc && typeof tc === "object") out.push({ name: "PIXI.TextureCache(object)", obj: tc });

    return out;
  }

  function asTextureSource(v) {
    // Pixi v7 TextureSource ressemble à: { resource, update(), resize(), uid, ... }
    if (!v || typeof v !== "object") return null;

    // Texture (Ie): { source: TextureSource }
    if (v.source && typeof v.source === "object" && typeof v.source.update === "function") return v.source;

    // Spritesheet (IM): { textureSource: TextureSource }
    if (v.textureSource && typeof v.textureSource === "object" && typeof v.textureSource.update === "function") return v.textureSource;

    // TextureSource direct
    if (typeof v.update === "function" && "resource" in v) return v;

    return null;
  }

  function findTextureSourceByUrlPart(urlPart) {
    const part = String(urlPart || "");
    if (!part) return null;

    const stores = getCacheMaps();
    for (const st of stores) {
      if (st.map) {
        for (const [k, v] of st.map.entries()) {
          if (!String(k).includes(part)) continue;
          const ts = asTextureSource(v);
          if (ts) return ts;
        }
      } else if (st.obj) {
        for (const k of Object.keys(st.obj)) {
          if (!String(k).includes(part)) continue;
          const ts = asTextureSource(st.obj[k]);
          if (ts) return ts;
        }
      }
    }

    return null;
  }

  function stageScanTextureSource(urlPart, cap = 25000) {
    // fallback si l'objet est affiché quelque part
    const part = String(urlPart || "");
    if (!part) return null;

    const app = root.MGPixi?.ready?.() ? (root.MGPixi?.app || root.MGPixi?._app) : null;
    const stage = app?.stage || root.MGPixi?.S?.app?.stage || null;
    if (!stage) return null;

    const stack = [stage];
    let n = 0;

    while (stack.length && n++ < cap) {
      const o = stack.pop();
      if (!o) continue;

      const tex = o.texture || o._texture || null;
      const ts = asTextureSource(tex);
      if (ts) {
        const origin = String(ts._sourceOrigin || ts.label || "");
        if (origin.includes(part)) return ts;
      }

      const ch = o.children;
      if (Array.isArray(ch)) for (let i = ch.length - 1; i >= 0; i--) stack.push(ch[i]);
    }

    return null;
  }

  // ----------------------------
  // Canvas patching (Pixi v7 TextureSource.resource)
  // ----------------------------
  function baseSourceToCanvas(src) {
    // src peut être: HTMLImageElement, HTMLCanvasElement, ImageBitmap, Video, etc.
    const s = (src && src.source) ? src.source : src;
    const w = s?.naturalWidth || s?.videoWidth || s?.displayWidth || s?.width || 0;
    const h = s?.naturalHeight || s?.videoHeight || s?.displayHeight || s?.height || 0;
    if (!w || !h) return null;

    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;

    const ctx = c.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(s, 0, 0);

    return c;
  }

  function ensureAtlasCanvas(textureSource) {
    if (!textureSource) return null;

    const res = textureSource.resource;
    if (res instanceof HTMLCanvasElement) return res;

    const c = baseSourceToCanvas(res);
    if (!c) return null;

    // remplace la resource par un canvas patchable
    try { textureSource.resource = c; } catch (_) {}
    try { textureSource.update?.(); } catch (_) {}
    return c;
  }

  function drawIntoAtlas(atlasCanvas, targetFrame, rotated, customImg) {
    const { x, y, w, h } = targetFrame;
    const ctx = atlasCanvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    ctx.clearRect(x, y, w, h);

    if (!rotated) {
      ctx.drawImage(customImg, 0, 0, customImg.width, customImg.height, x, y, w, h);
      return true;
    }

    // rotated pack: stored rotated 90° in the sheet
    ctx.save();
    ctx.translate(x, y);
    ctx.translate(0, h);
    ctx.rotate(-Math.PI / 2);
    ctx.drawImage(customImg, 0, 0, customImg.width, customImg.height, 0, 0, h, w);
    ctx.restore();
    return true;
  }

  function updateTextureSource(textureSource) {
    try { textureSource.update?.(); return true; } catch (_) {}
    try { textureSource.emit?.("update"); return true; } catch (_) {}
    return false;
  }

  // ----------------------------
  // Indexing
  // ----------------------------
  function indexKey(key) {
    const k = String(key || "");
    if (!k) return;

    S.lowerKeyToKey.set(k.toLowerCase(), k);

    const m = /^sprite\/([^/]+)\/(.+)$/.exec(k);
    if (m) {
      const cat = m[1];
      const asset = m[2];
      if (!S.catIndex.has(cat)) S.catIndex.set(cat, new Set());
      S.catIndex.get(cat).add(asset);
    }
  }

  async function buildIndex() {
    if (S.ready) return true;

    S.baseUrl = await MGAssets.base();
    const manifest = await MGManifest.load(S.baseUrl);

    S.frameIndex.clear();
    S.lowerKeyToKey.clear();
    S.catIndex.clear();
    S.imgOwners.clear();

    // scan tous les bundles
    const allJson = new Set();
    for (const b of (manifest?.bundles || [])) {
      for (const p of MGManifest.listJsonFromBundle(b)) allJson.add(p);
    }

    const seen = new Set();

    async function loadAtlasJson(path) {
      if (!path || seen.has(path)) return;
      seen.add(path);

      const atlas = await getJSON(joinPath(S.baseUrl, path));
      if (!isAtlas(atlas)) return;

      // multipack
      const rels = atlas.meta?.related_multi_packs;
      if (Array.isArray(rels)) {
        for (const rel of rels) await loadAtlasJson(relPath(path, rel));
      }

      const imgRel = relPath(path, atlas.meta.image);
      S.imgOwners.set(imgRel, path);

      for (const [key, fd] of Object.entries(atlas.frames || {})) {
        const fr = fd?.frame;
        if (!fr) continue;

        const rotated = !!fd.rotated;
        const w = rotated ? fr.h : fr.w;
        const h = rotated ? fr.w : fr.h;

        S.frameIndex.set(key, {
          imgRel,
          rotated,
          frame: { x: fr.x | 0, y: fr.y | 0, w: w | 0, h: h | 0 },
        });

        indexKey(key);
      }
    }

    for (const p of allJson) await loadAtlasJson(p);

    S.ready = true;
    return true;
  }

  // ----------------------------
  // Key resolving helpers
  // ----------------------------
  function categories() {
    return Array.from(S.catIndex.keys()).sort((a, b) => a.localeCompare(b));
  }

  function list(category) {
    const cat = String(category || "").trim();
    const set = S.catIndex.get(cat);
    return set ? Array.from(set).sort((a, b) => a.localeCompare(b)) : [];
  }

  function find(query, { category = null, limit = 50 } = {}) {
    const q = String(query || "").toLowerCase().trim();
    if (!q) return [];

    const out = [];

    if (category) {
      const cat = String(category || "").trim();
      for (const a of list(cat)) {
        const k = `sprite/${cat}/${a}`;
        if (k.toLowerCase().includes(q)) out.push(k);
        if (out.length >= limit) break;
      }
      return out;
    }

    for (const k of S.frameIndex.keys()) {
      if (String(k).toLowerCase().includes(q)) out.push(k);
      if (out.length >= limit) break;
    }
    return out;
  }

  function normalizeAsset(a) {
    return String(a || "").trim().replace(/^\/+|\/+$/g, "");
  }

  function candidateKeys(cat, asset) {
    const c = String(cat || "")
      .trim()
      .replace(/^sprite\//, "")
      .replace(/^\/+|\/+$/g, "");
    const a = normalizeAsset(asset);

    const out = new Set();
    const base = c ? `sprite/${c}/${a}` : a;

    out.add(base);
    out.add(base.replace(/\.png$/i, ""));
    out.add(base.endsWith(".png") ? base : base + ".png");

    out.add(a);
    out.add(a.replace(/\.png$/i, ""));
    out.add(a.endsWith(".png") ? a : a + ".png");

    out.add(`sprite/${a}`);
    out.add(`sprite/${a}`.replace(/\.png$/i, ""));
    out.add(`sprite/${a}`.endsWith(".png") ? `sprite/${a}` : `sprite/${a}.png`);

    return Array.from(out).filter(Boolean);
  }

  function resolveKey(category, asset) {
    const tries = candidateKeys(category, asset);
    for (const k of tries) {
      if (S.frameIndex.has(k)) return k;
      const real = S.lowerKeyToKey.get(k.toLowerCase());
      if (real && S.frameIndex.has(real)) return real;
    }
    return null;
  }

  // ----------------------------
  // Loading + waiting for TextureSource (Option B)
  // ----------------------------
  async function tryAutoLoadSpritesheetForImg(imgRel) {
    const P = root.PIXI;
    const Assets = P?.Assets;
    if (!Assets?.load) return false;

    const ownerJson = S.imgOwners.get(imgRel);
    if (!ownerJson) return false;

    const url = joinPath(S.baseUrl, ownerJson);
    try {
      await Assets.load(url);
      return true;
    } catch (_) {
      return false;
    }
  }

  async function waitTextureSource(imgRel, opts = {}) {
    const timeoutMs = Number.isFinite(opts.timeoutMs) ? opts.timeoutMs : 15000;
    const autoLoad = (opts.autoLoad !== false);

    const part = String(imgRel || "");
    const full = joinPath(S.baseUrl, imgRel);

    let triedLoad = false;
    const t0 = performance.now();

    while (performance.now() - t0 < timeoutMs) {
      let ts =
        findTextureSourceByUrlPart(part) ||
        findTextureSourceByUrlPart(full) ||
        stageScanTextureSource(part);

      if (ts) return ts;

      if (autoLoad && !triedLoad) {
        triedLoad = true;
        await tryAutoLoadSpritesheetForImg(imgRel);
      }

      await sleep(50);
    }

    throw new Error(`MGSkins: TextureSource introuvable pour "${imgRel}" (pas chargé ou non référencé)`);
  }

  // ----------------------------
  // Custom image loading
  // ----------------------------
  async function loadCustomImage(url) {
    const u = String(url || "").trim();
    if (!u) throw new Error("MGSkins: custom image url vide");

    if (/^data:image\//i.test(u)) {
      return await new Promise((resolve, reject) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("MGSkins: data URL decode failed"));
        img.src = u;
      });
    }

    const blob = await getBlob(u);
    return await blobToImage(blob);
  }

  // ----------------------------
  // Public API
  // ----------------------------
  async function apply(skinMap, opts = {}) {
    await buildIndex();

    const entries = Object.entries(skinMap || {});
    if (!entries.length) return { ok: false, reason: "empty skin map" };

    const strictSize = (opts.strictSize === true);
    const timeoutMs = Number.isFinite(opts.timeoutMs) ? opts.timeoutMs : 15000;
    const autoLoad = (opts.autoLoad !== false);

    let patched = 0, missingKey = 0, missingTS = 0, badSize = 0;

    // group by imgRel
    const byImg = new Map(); // imgRel -> [{key,url,frame,rotated}]
    for (const [key, url] of entries) {
      const info = S.frameIndex.get(key);
      if (!info) { missingKey++; continue; }
      if (!byImg.has(info.imgRel)) byImg.set(info.imgRel, []);
      byImg.get(info.imgRel).push({ key, url, frame: info.frame, rotated: info.rotated });
    }

    for (const [imgRel, list] of byImg.entries()) {
      let ts = null;
      try {
        ts = await waitTextureSource(imgRel, { timeoutMs, autoLoad });
      } catch (_) {
        missingTS += list.length;
        continue;
      }

      const atlasCanvas = ensureAtlasCanvas(ts);
      if (!atlasCanvas) {
        missingTS += list.length;
        continue;
      }

      for (const it of list) {
        const custom = await loadCustomImage(it.url);

        if (strictSize) {
          if (custom.width !== it.frame.w || custom.height !== it.frame.h) {
            badSize++;
            continue;
          }
        }

        drawIntoAtlas(atlasCanvas, it.frame, it.rotated, custom);
        patched++;
      }

      updateTextureSource(ts);
    }

    return { ok: true, patched, missingKey, missingTextureSource: missingTS, badSize };
  }

  async function custom(category, asset, newSkinUrl, opts = {}) {
    await buildIndex();

    const key = resolveKey(category, asset);
    if (!key) {
      return {
        ok: false,
        reason: "key_not_found",
        category: String(category || ""),
        asset: String(asset || ""),
        suggestions: find(asset, { category, limit: 20 }),
      };
    }

    return await apply({ [key]: String(newSkinUrl) }, opts);
  }

  // debug helpers
  function debugFind(urlPart, limit = 25) {
    const part = String(urlPart || "");
    const res = [];
    const stores = getCacheMaps();

    for (const st of stores) {
      if (st.map) {
        for (const [k, v] of st.map.entries()) {
          if (!String(k).includes(part)) continue;
          res.push({ store: st.name, key: String(k), type: v?.constructor?.name || typeof v });
          if (res.length >= limit) return res;
        }
      } else if (st.obj) {
        for (const k of Object.keys(st.obj)) {
          if (!String(k).includes(part)) continue;
          const v = st.obj[k];
          res.push({ store: st.name, key: String(k), type: v?.constructor?.name || typeof v });
          if (res.length >= limit) return res;
        }
      }
    }

    return res;
  }

  return {
    init: buildIndex,
    indexReady: () => S.ready,

    categories,
    list,
    find,
    resolveKey,

    custom,
    apply,

    frameIndex: () => S.frameIndex,

    debug: {
      find: debugFind,
      findTextureSourceByUrlPart,
    },
  };
})();




  // expose modules
  root.MGVersion = MGVersion;
  root.MGAssets = MGAssets;
  root.MGManifest = MGManifest;
  root.MGSprite = MGSprite;
  root.MGAudio = MGAudio;
  root.MGCosmetic = MGCosmetic;
  root.MGTile = MGTile;
  root.MGPixi = MGPixi;
  root.MGSkins = MGSkins;

  // boot (idempotent anyway)
  MGSprite.init().catch((e) => console.error("[MGSprite] failed", e));
  MGTile.init().catch((e) => console.error("[MGTile] failed", e));
  MGPixi.init().catch((e) => console.error("[MGPixi] failed", e));
  MGAudio.init().catch((e) => console.error("[MGAudio] failed", e));
  MGCosmetic.init().catch((e) => console.error("[MGCosmetic] failed", e));
      MGSkins.init().catch((e) => console.error("[MGSkins] failed", e));

  // (Optionnel) petit log d'aide
  console.log("[MG] Ready: MGSprite / MGAudio / MGCosmetic / MGTile / MGPixi");
  console.log("MGPixi.help()\nMGTile.help()");
})();
