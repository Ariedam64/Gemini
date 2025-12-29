import {
  createLoader,
  initWebSocketCapture,
  initAtoms,
  initReactiveGlobals,
  initAPI,
  initHUD,
  initModules,
  startInjectGamePanelButton,
} from "./ui/loader";
import { Globals } from "./globals";

(async function () {
  "use strict";

  const loader = createLoader({
    title: "Gemini is loading",
    subtitle: "Connecting and preparing modules...",
  });

  let cleanupWebSocket: (() => void) | null = null;
  let hud: ReturnType<typeof initHUD> | null = null;

  try {
    cleanupWebSocket = initWebSocketCapture(loader);
    await initAtoms(loader);
    initReactiveGlobals(loader);
    initAPI(loader);
    hud = initHUD(loader);
    await initModules(loader);

    loader.succeed("Gemini is ready!");

     // === TEST: MyGarden subscribes ===
  const garden = Globals.myGarden;

  garden.subscribe((data, prev) => {
    console.log("[MyGarden] subscribe - data changed", { data, prev });
  }, { immediate: false });

  garden.subscribeStable((data, prev) => {
    console.log("[MyGarden] subscribeStable - counts changed", {
      counts: data.counts,
      prevCounts: prev.counts
    });
  }, { immediate: false });

  garden.subscribePlantAdded(({ plant }) => {
    console.log("[MyGarden] subscribePlantAdded", {
      species: plant.species,
      tileIndex: plant.tileIndex,
      position: plant.position,
      slotsCount: plant.slotsCount
    });
  });

  garden.subscribePlantRemoved(({ plant, tileIndex }) => {
    console.log("[MyGarden] subscribePlantRemoved", {
      species: plant.species,
      tileIndex
    });
  });

  garden.subscribePlantMatured(({ plant }) => {
    console.log("[MyGarden] subscribePlantMatured", {
      species: plant.species,
      tileIndex: plant.tileIndex,
      position: plant.position,
      maturedAt: plant.maturedAt
    });
  });

  garden.subscribeCropMutated(({ crop, added, removed }) => {
    console.log("[MyGarden] subscribeCropMutated", {
      species: crop.species,
      tileIndex: crop.tileIndex,
      slotIndex: crop.slotIndex,
      added,
      removed,
      currentMutations: crop.mutations
    });
  });

  garden.subscribeCropMatured(({ crop }) => {
    console.log("[MyGarden] subscribeCropMatured", {
      species: crop.species,
      tileIndex: crop.tileIndex,
      slotIndex: crop.slotIndex,
      targetScale: crop.targetScale
    });
  });

  garden.subscribeCropHarvested(({ crop, remainingSlots }) => {
    console.log("[MyGarden] subscribeCropHarvested", {
      species: crop.species,
      tileIndex: crop.tileIndex,
      slotIndex: crop.slotIndex,
      remainingSlots,
      mutations: crop.mutations
    });
  });

  garden.subscribeEggPlaced(({ egg }) => {
    console.log("[MyGarden] subscribeEggPlaced", {
      eggId: egg.eggId,
      tileIndex: egg.tileIndex,
      position: egg.position
    });
  });

  garden.subscribeEggRemoved(({ egg }) => {
    console.log("[MyGarden] subscribeEggRemoved", {
      eggId: egg.eggId,
      tileIndex: egg.tileIndex
    });
  });

  garden.subscribeEggMatured(({ egg }) => {
    console.log("[MyGarden] subscribeEggMatured", {
      eggId: egg.eggId,
      tileIndex: egg.tileIndex,
      position: egg.position
    });
  });

  garden.subscribeDecorPlaced(({ decor }) => {
    console.log("[MyGarden] subscribeDecorPlaced", {
      decorId: decor.decorId,
      tileIndex: decor.tileIndex,
      location: decor.location,
      rotation: decor.rotation
    });
  });

  garden.subscribeDecorRemoved(({ decor }) => {
    console.log("[MyGarden] subscribeDecorRemoved", {
      decorId: decor.decorId,
      tileIndex: decor.tileIndex,
      location: decor.location
    });
  });

  console.log("[MyGarden] Initial state:", garden.get());
  // === END TEST ===

  } catch (e) {
    loader.fail("Failed to initialize the mod.", e);
  } finally {
    cleanupWebSocket?.();
  }

  if (hud) {
    const hudRef = hud;
    startInjectGamePanelButton({ onClick: () => hudRef.setOpen(true) });
  }

 
})();
