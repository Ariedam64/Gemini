(() => {
  const ASSET_BASE = new URL("./assets/", location.href).href;
  const PATHS = {
    map: `${ASSET_BASE}map.json`,
    tiles: `${ASSET_BASE}tiles.json`,
    sprites0: `${ASSET_BASE}sprites-0.json`,
    sprites1: `${ASSET_BASE}sprites-1.json`,
    decor: `${ASSET_BASE}decor-data.json`
  };

  const ui = {
    host: document.getElementById("canvas-host"),
    list: document.getElementById("decor-list"),
    search: document.getElementById("decor-search"),
    rotationLabel: document.getElementById("rotation-label"),
    rotLeft: document.getElementById("rot-left"),
    rotRight: document.getElementById("rot-right"),
    toggleGrid: document.getElementById("toggle-grid"),
    toggleDirt: document.getElementById("toggle-dirt"),
    toggleBoardwalk: document.getElementById("toggle-boardwalk"),
    copyLayout: document.getElementById("copy-layout"),
    clearLayout: document.getElementById("clear-layout"),
    status: document.getElementById("status")
  };

  const FLIP_H = 0x80000000;
  const FLIP_V = 0x40000000;
  const FLIP_D = 0x20000000;

  let app;
  let camera;
  let world;
  let decorLayer;
  let gridSprite;
  let dirtOverlay;
  let boardwalkOverlay;
  let ghostSprite;

  let textures = {};
  let mapData;
  let decorData;
  let gidToFrame = new Map();
  let dirtTiles = new Set();
  let boardwalkTiles = new Set();
  let allowedTiles = new Set();

  let decorItems = [];
  let selectedDecorKey = null;
  let rotation = 0;

  let isSpaceDown = false;
  let isPanning = false;
  let panPointerId = null;
  let panStart = null;
  let panOrigin = null;

  let draggingDecor = null;
  let dragPointerId = null;
  let lastPointerGlobal = null;

  const placedDecor = [];

  function setStatus(message, visible = true) {
    if (!message) {
      ui.status.classList.remove("visible");
      ui.status.textContent = "";
      return;
    }
    ui.status.textContent = message;
    ui.status.classList.toggle("visible", visible);
  }

  async function loadJson(url) {
    const res = await fetch(url, { cache: "no-cache" });
    if (!res.ok) {
      throw new Error(`Failed to load ${url}: ${res.status}`);
    }
    return res.json();
  }

  async function loadSpritesheet(jsonUrl) {
    const data = await loadJson(jsonUrl);
    const imageUrl = new URL(data.meta.image, ASSET_BASE).href;
    const base = PIXI.BaseTexture.from(imageUrl);
    if (base.resource && base.resource.load) {
      await base.resource.load();
    } else {
      await new Promise((resolve, reject) => {
        base.once("loaded", resolve);
        base.once("error", reject);
      });
    }
    const sheet = new PIXI.Spritesheet(base, data);
    await sheet.parse();
    return sheet;
  }

  function decodeGid(gid) {
    const flipH = (gid & FLIP_H) !== 0;
    const flipV = (gid & FLIP_V) !== 0;
    const flipD = (gid & FLIP_D) !== 0;
    const clean = gid & ~(FLIP_H | FLIP_V | FLIP_D);
    return { gid: clean, flipH, flipV, flipD };
  }

  function imagePathToFrame(path) {
    if (!path) return null;
    const normalized = path.replace(/\\\\/g, "/");
    const tileIdx = normalized.lastIndexOf("/tile/");
    const spriteIdx = normalized.lastIndexOf("/sprite/");
    const idx = tileIdx !== -1 ? tileIdx + 1 : spriteIdx !== -1 ? spriteIdx + 1 : -1;
    if (idx === -1) return null;
    return normalized.slice(idx).replace(/\\.png$/i, "");
  }

  function buildGidFrameMap(map) {
    const mapRef = new Map();
    for (const tileset of map.tilesets) {
      if (!tileset.tiles) continue;
      for (const tile of tileset.tiles) {
        const frame = imagePathToFrame(tile.image);
        if (!frame) continue;
        mapRef.set(tileset.firstgid + tile.id, frame);
      }
    }
    return mapRef;
  }

  function buildTileSets(map) {
    dirtTiles = new Set();
    boardwalkTiles = new Set();
    for (const layer of map.layers) {
      if (layer.type !== "tilelayer") continue;
      if (layer.class !== "DirtTiles" && layer.class !== "BoardwalkTiles") continue;
      layer.data.forEach((gid, index) => {
        if (!gid) return;
        if (layer.class === "DirtTiles") dirtTiles.add(index);
        if (layer.class === "BoardwalkTiles") boardwalkTiles.add(index);
      });
    }
    allowedTiles = new Set([...dirtTiles, ...boardwalkTiles]);
  }

  function buildDecorItems() {
    const items = [];
    for (const [key, decor] of Object.entries(decorData.decorCatalog)) {
      const tileKey = decorData.tileRefToKey[String(decor.tileRef)];
      if (!tileKey) continue;
      const frame = `sprite/decor/${tileKey}`;
      if (!textures[frame]) continue;
      items.push({
        key,
        name: decor.name || key,
        tileRef: decor.tileRef,
        baseTileScale: decor.baseTileScale || 1,
        nudgeX: decor.nudgeX || 0,
        nudgeY: decor.nudgeY || 0,
        rotationVariants: decor.rotationVariants || null
      });
    }
    return items.sort((a, b) => a.name.localeCompare(b.name));
  }

  function renderDecorList(filter = "") {
    ui.list.innerHTML = "";
    const term = filter.trim().toLowerCase();
    const filtered = decorItems.filter(item =>
      !term || item.name.toLowerCase().includes(term) || item.key.toLowerCase().includes(term)
    );
    for (const item of filtered) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "decor-item";
      if (item.key === selectedDecorKey) button.classList.add("active");
      button.dataset.key = item.key;
      button.innerHTML = `<span>${item.name}</span>`;
      button.addEventListener("click", () => {
        selectedDecorKey = item.key;
        renderDecorList(ui.search.value);
      });
      ui.list.appendChild(button);
    }
  }

  function updateRotationLabel() {
    ui.rotationLabel.textContent = `${rotation}°`;
  }

  function setRotation(value) {
    rotation = ((value % 360) + 360) % 360;
    if (![0, 90, 180, 270].includes(rotation)) rotation = 0;
    updateRotationLabel();
    updateGhostFromPointer();
  }

  function getDecorVariant(key, rotationValue) {
    const decor = decorData.decorCatalog[key];
    if (!decor) return null;
    const variant = decor.rotationVariants && decor.rotationVariants[rotationValue];
    const tileRef = (variant && variant.tileRef) || decor.tileRef;
    const tileKey = decorData.tileRefToKey[String(tileRef)];
    if (!tileKey) return null;
    const frame = `sprite/decor/${tileKey}`;
    if (!textures[frame]) return null;
    return {
      frame,
      flipH: variant && variant.flipH,
      baseTileScale: (variant && variant.baseTileScale) || decor.baseTileScale || 1,
      nudgeX: (variant && variant.nudgeX) || decor.nudgeX || 0,
      nudgeY: (variant && variant.nudgeY) || decor.nudgeY || 0
    };
  }

  function createDecorSprite(key, rotationValue, tileX, tileY) {
    const variant = getDecorVariant(key, rotationValue);
    if (!variant) return null;
    const sprite = new PIXI.Sprite(textures[variant.frame]);
    sprite.eventMode = "static";
    sprite.cursor = "move";
    sprite.decorInfo = { key, rotation: rotationValue, tileX, tileY };
    applyDecorTransform(sprite, variant, tileX, tileY);
    sprite.on("pointerdown", event => {
      event.stopPropagation();
      startDrag(sprite, event);
    });
    return sprite;
  }

  function applyDecorTransform(sprite, variant, tileX, tileY) {
    const tileW = mapData.tilewidth;
    const tileH = mapData.tileheight;
    const scale = variant.baseTileScale || 1;
    sprite.scale.set(scale * (variant.flipH ? -1 : 1), scale);
    sprite.x = (tileX + 0.5) * tileW + (variant.nudgeX || 0) * tileW;
    sprite.y = (tileY + 1) * tileH + (variant.nudgeY || 0) * tileH;
    sprite.zIndex = sprite.y;
  }

  function pointerToTile(point) {
    const local = camera.toLocal(point);
    const tileW = mapData.tilewidth;
    const tileH = mapData.tileheight;
    const x = Math.floor(local.x / tileW);
    const y = Math.floor(local.y / tileH);
    if (x < 0 || y < 0 || x >= mapData.width || y >= mapData.height) return null;
    const index = y * mapData.width + x;
    return { x, y, index };
  }

  function createOverlays() {
    const tileW = mapData.tilewidth;
    const tileH = mapData.tileheight;
    const mapW = mapData.width * tileW;
    const mapH = mapData.height * tileH;

    const gridCanvas = document.createElement("canvas");
    gridCanvas.width = tileW;
    gridCanvas.height = tileH;
    const ctx = gridCanvas.getContext("2d");
    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.lineWidth = 1;
    ctx.strokeRect(0.5, 0.5, tileW - 1, tileH - 1);
    const gridTexture = PIXI.Texture.from(gridCanvas);
    gridSprite = new PIXI.TilingSprite(gridTexture, mapW, mapH);
    gridSprite.alpha = 0.3;

    dirtOverlay = new PIXI.Graphics();
    dirtOverlay.alpha = 0.2;
    dirtOverlay.beginFill(0xc58f5a);
    for (const index of dirtTiles) {
      const x = index % mapData.width;
      const y = Math.floor(index / mapData.width);
      dirtOverlay.drawRect(x * tileW, y * tileH, tileW, tileH);
    }
    dirtOverlay.endFill();

    boardwalkOverlay = new PIXI.Graphics();
    boardwalkOverlay.alpha = 0.2;
    boardwalkOverlay.beginFill(0x6ea3a3);
    for (const index of boardwalkTiles) {
      const x = index % mapData.width;
      const y = Math.floor(index / mapData.width);
      boardwalkOverlay.drawRect(x * tileW, y * tileH, tileW, tileH);
    }
    boardwalkOverlay.endFill();

    ui.toggleGrid.addEventListener("change", () => {
      gridSprite.visible = ui.toggleGrid.checked;
    });
    ui.toggleDirt.addEventListener("change", () => {
      dirtOverlay.visible = ui.toggleDirt.checked;
    });
    ui.toggleBoardwalk.addEventListener("change", () => {
      boardwalkOverlay.visible = ui.toggleBoardwalk.checked;
    });

    gridSprite.visible = ui.toggleGrid.checked;
    dirtOverlay.visible = ui.toggleDirt.checked;
    boardwalkOverlay.visible = ui.toggleBoardwalk.checked;
  }

  function buildTileLayer(layer) {
    const container = new PIXI.Container();
    if (typeof layer.opacity === "number") container.alpha = layer.opacity;
    const tileW = mapData.tilewidth;
    const tileH = mapData.tileheight;
    layer.data.forEach((gid, index) => {
      if (!gid) return;
      const { gid: clean, flipH, flipV } = decodeGid(gid);
      const frame = gidToFrame.get(clean);
      if (!frame || !textures[frame]) return;
      const sprite = new PIXI.Sprite(textures[frame]);
      sprite.anchor.set(0, 0);
      const x = index % mapData.width;
      const y = Math.floor(index / mapData.width);
      sprite.x = x * tileW;
      sprite.y = y * tileH;
      if (flipH) {
        sprite.scale.x = -1;
        sprite.x += tileW;
      }
      if (flipV) {
        sprite.scale.y = -1;
        sprite.y += tileH;
      }
      container.addChild(sprite);
    });
    return container;
  }

  function buildObjectLayer(layer) {
    const container = new PIXI.Container();
    for (const obj of layer.objects || []) {
      if (!obj.gid) continue;
      const { gid: clean } = decodeGid(obj.gid);
      const frame = gidToFrame.get(clean);
      if (!frame || !textures[frame]) continue;
      const sprite = new PIXI.Sprite(textures[frame]);
      sprite.x = obj.x;
      sprite.y = obj.y;
      sprite.zIndex = sprite.y;
      container.addChild(sprite);
    }
    return container;
  }

  function placeDecor(tileX, tileY) {
    const sprite = createDecorSprite(selectedDecorKey, rotation, tileX, tileY);
    if (!sprite) return;
    decorLayer.addChild(sprite);
    placedDecor.push(sprite.decorInfo);
  }

  function startDrag(sprite, event) {
    draggingDecor = sprite;
    dragPointerId = event.data.pointerId;
    sprite.alpha = 0.7;
  }

  function updateDrag(event) {
    if (!draggingDecor || event.data.pointerId !== dragPointerId) return;
    const tile = pointerToTile(event.data.global);
    if (!tile || !allowedTiles.has(tile.index)) return;
    const variant = getDecorVariant(draggingDecor.decorInfo.key, draggingDecor.decorInfo.rotation);
    if (!variant) return;
    draggingDecor.decorInfo.tileX = tile.x;
    draggingDecor.decorInfo.tileY = tile.y;
    applyDecorTransform(draggingDecor, variant, tile.x, tile.y);
  }

  function endDrag(event) {
    if (!draggingDecor || event.data.pointerId !== dragPointerId) return;
    draggingDecor.alpha = 1;
    draggingDecor = null;
    dragPointerId = null;
  }

  function updateGhostFromPointer() {
    if (!ghostSprite || !selectedDecorKey) return;
    const pointer = lastPointerGlobal;
    if (!pointer) return;
    const tile = pointerToTile(pointer);
    if (!tile || !allowedTiles.has(tile.index)) {
      ghostSprite.visible = false;
      return;
    }
    const variant = getDecorVariant(selectedDecorKey, rotation);
    if (!variant) return;
    ghostSprite.visible = true;
    ghostSprite.texture = textures[variant.frame];
    applyDecorTransform(ghostSprite, variant, tile.x, tile.y);
    ghostSprite.alpha = 0.5;
  }

  function setupInteractions() {
    app.stage.eventMode = "static";
    app.stage.hitArea = app.screen;
    app.view.addEventListener("contextmenu", event => event.preventDefault());

    app.stage.on("pointerdown", event => {
      const button = event.data.button;
      if (isSpaceDown || button === 1 || button === 2) {
        isPanning = true;
        panPointerId = event.data.pointerId;
        panStart = { x: event.data.global.x, y: event.data.global.y };
        panOrigin = { x: camera.position.x, y: camera.position.y };
        return;
      }
      if (!selectedDecorKey) return;
      const tile = pointerToTile(event.data.global);
      if (!tile || !allowedTiles.has(tile.index)) return;
      placeDecor(tile.x, tile.y);
    });

    app.stage.on("pointermove", event => {
      lastPointerGlobal = event.data.global.clone();
      if (isPanning && event.data.pointerId === panPointerId) {
        camera.position.x = panOrigin.x + (event.data.global.x - panStart.x);
        camera.position.y = panOrigin.y + (event.data.global.y - panStart.y);
        return;
      }
      if (draggingDecor) {
        updateDrag(event);
        return;
      }
      updateGhostFromPointer();
    });

    app.stage.on("pointerup", event => {
      if (isPanning && event.data.pointerId === panPointerId) {
        isPanning = false;
        panPointerId = null;
      }
      endDrag(event);
    });

    app.stage.on("pointerupoutside", event => {
      if (isPanning && event.data.pointerId === panPointerId) {
        isPanning = false;
        panPointerId = null;
      }
      endDrag(event);
    });

    app.view.addEventListener("wheel", event => {
      event.preventDefault();
      const scaleFactor = event.deltaY > 0 ? 0.9 : 1.1;
      const newScale = Math.min(3, Math.max(0.25, camera.scale.x * scaleFactor));
      camera.scale.set(newScale);
    }, { passive: false });

    window.addEventListener("keydown", event => {
      if (event.code === "Space") {
        isSpaceDown = true;
      }
      if (event.code === "BracketLeft") {
        setRotation(rotation - 90);
      }
      if (event.code === "BracketRight") {
        setRotation(rotation + 90);
      }
    });

    window.addEventListener("keyup", event => {
      if (event.code === "Space") {
        isSpaceDown = false;
      }
    });
  }

  function layoutToJson() {
    return JSON.stringify(placedDecor, null, 2);
  }

  async function copyLayout() {
    const text = layoutToJson();
    try {
      await navigator.clipboard.writeText(text);
      setStatus("Layout JSON copied to clipboard.");
    } catch (error) {
      setStatus("Clipboard blocked. See console for layout JSON.");
      console.log(text);
    }
  }

  function clearLayout() {
    decorLayer.removeChildren();
    placedDecor.length = 0;
  }

  function resize() {
    if (!app) return;
    app.renderer.resize(ui.host.clientWidth, ui.host.clientHeight);
    app.stage.hitArea = app.screen;
    const mapW = mapData.width * mapData.tilewidth;
    const mapH = mapData.height * mapData.tileheight;
    const scale = Math.min(
      ui.host.clientWidth / mapW,
      ui.host.clientHeight / mapH
    ) * 0.9;
    camera.scale.set(scale);
    camera.position.set(
      (ui.host.clientWidth - mapW * scale) / 2,
      (ui.host.clientHeight - mapH * scale) / 2
    );
  }

  async function init() {
    try {
      setStatus("Loading assets...");
      [mapData, decorData] = await Promise.all([
        loadJson(PATHS.map),
        loadJson(PATHS.decor)
      ]);
      const [tilesSheet, sprites0, sprites1] = await Promise.all([
        loadSpritesheet(PATHS.tiles),
        loadSpritesheet(PATHS.sprites0),
        loadSpritesheet(PATHS.sprites1)
      ]);
      textures = {
        ...tilesSheet.textures,
        ...sprites0.textures,
        ...sprites1.textures
      };
      gidToFrame = buildGidFrameMap(mapData);
      buildTileSets(mapData);
      decorItems = buildDecorItems();
      selectedDecorKey = decorItems[0] ? decorItems[0].key : null;
    } catch (error) {
      setStatus(`Failed to load assets: ${error.message}`);
      return;
    }

    setStatus("");

    app = new PIXI.Application({
      backgroundAlpha: 0,
      antialias: true,
      resolution: Math.min(2, window.devicePixelRatio || 1)
    });
    ui.host.appendChild(app.view);

    camera = new PIXI.Container();
    world = new PIXI.Container();
    decorLayer = new PIXI.Container();
    decorLayer.sortableChildren = true;

    app.stage.addChild(camera);
    camera.addChild(world);

    for (const layer of mapData.layers) {
      if (layer.type === "tilelayer" && layer.visible) {
        world.addChild(buildTileLayer(layer));
      }
    }

    const buildingLayer = mapData.layers.find(layer => layer.name === "Buildings");
    if (buildingLayer) world.addChild(buildObjectLayer(buildingLayer));

    world.addChild(decorLayer);

    const buildingTopLayer = mapData.layers.find(layer => layer.name === "BuildingsTops");
    if (buildingTopLayer) world.addChild(buildObjectLayer(buildingTopLayer));

    createOverlays();
    world.addChild(gridSprite);
    world.addChild(dirtOverlay);
    world.addChild(boardwalkOverlay);

    ghostSprite = new PIXI.Sprite();
    ghostSprite.alpha = 0.5;
    ghostSprite.visible = false;
    world.addChild(ghostSprite);

    setupInteractions();
    renderDecorList();
    updateRotationLabel();

    ui.search.addEventListener("input", () => {
      renderDecorList(ui.search.value);
    });
    ui.rotLeft.addEventListener("click", () => setRotation(rotation - 90));
    ui.rotRight.addEventListener("click", () => setRotation(rotation + 90));
    ui.copyLayout.addEventListener("click", copyLayout);
    ui.clearLayout.addEventListener("click", clearLayout);

    window.addEventListener("resize", resize);
    resize();
  }

  init();
})();
