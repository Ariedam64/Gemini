// src/modules/data/logic/abilityColors.ts
// Ability color mapping (extracted from game bundle)

import { captureState } from "../state";

/**
 * Ability color interface
 */
export interface AbilityColor {
  bg: string;
  hover: string;
}

/**
 * Static ability color mapping
 * Extracted from the game's v3 function in main bundle
 */
const ABILITY_COLORS: Record<string, AbilityColor> = {
  MoonKisser: { bg: "rgba(250, 166, 35, 0.9)", hover: "rgba(250, 166, 35, 1)" },
  DawnKisser: { bg: "rgba(162, 92, 242, 0.9)", hover: "rgba(162, 92, 242, 1)" },
  ProduceScaleBoost: { bg: "rgba(34, 139, 34, 0.9)", hover: "rgba(34, 139, 34, 1)" },
  ProduceScaleBoostII: { bg: "rgba(34, 139, 34, 0.9)", hover: "rgba(34, 139, 34, 1)" },
  SnowyCropSizeBoost: { bg: "rgba(34, 139, 34, 0.9)", hover: "rgba(34, 139, 34, 1)" },
  PlantGrowthBoost: { bg: "rgba(0, 128, 128, 0.9)", hover: "rgba(0, 128, 128, 1)" },
  PlantGrowthBoostII: { bg: "rgba(0, 128, 128, 0.9)", hover: "rgba(0, 128, 128, 1)" },
  SnowyPlantGrowthBoost: { bg: "rgba(0, 128, 128, 0.9)", hover: "rgba(0, 128, 128, 1)" },
  EggGrowthBoost: { bg: "rgba(180, 90, 240, 0.9)", hover: "rgba(180, 90, 240, 1)" },
  EggGrowthBoostII_NEW: { bg: "rgba(180, 90, 240, 0.9)", hover: "rgba(180, 90, 240, 1)" },
  EggGrowthBoostII: { bg: "rgba(180, 90, 240, 0.9)", hover: "rgba(180, 90, 240, 1)" },
  SnowyEggGrowthBoost: { bg: "rgba(180, 90, 240, 0.9)", hover: "rgba(180, 90, 240, 1)" },
  PetAgeBoost: { bg: "rgba(147, 112, 219, 0.9)", hover: "rgba(147, 112, 219, 1)" },
  PetAgeBoostII: { bg: "rgba(147, 112, 219, 0.9)", hover: "rgba(147, 112, 219, 1)" },
  PetHatchSizeBoost: { bg: "rgba(128, 0, 128, 0.9)", hover: "rgba(128, 0, 128, 1)" },
  PetHatchSizeBoostII: { bg: "rgba(128, 0, 128, 0.9)", hover: "rgba(128, 0, 128, 1)" },
  PetXpBoost: { bg: "rgba(30, 144, 255, 0.9)", hover: "rgba(30, 144, 255, 1)" },
  PetXpBoostII: { bg: "rgba(30, 144, 255, 0.9)", hover: "rgba(30, 144, 255, 1)" },
  SnowyPetXpBoost: { bg: "rgba(30, 144, 255, 0.9)", hover: "rgba(30, 144, 255, 1)" },
  HungerBoost: { bg: "rgba(255, 20, 147, 0.9)", hover: "rgba(255, 20, 147, 1)" },
  HungerBoostII: { bg: "rgba(255, 20, 147, 0.9)", hover: "rgba(255, 20, 147, 1)" },
  SnowyHungerBoost: { bg: "rgba(255, 20, 147, 0.9)", hover: "rgba(255, 20, 147, 1)" },
  SellBoostI: { bg: "rgba(220, 20, 60, 0.9)", hover: "rgba(220, 20, 60, 1)" },
  SellBoostII: { bg: "rgba(220, 20, 60, 0.9)", hover: "rgba(220, 20, 60, 1)" },
  SellBoostIII: { bg: "rgba(220, 20, 60, 0.9)", hover: "rgba(220, 20, 60, 1)" },
  SellBoostIV: { bg: "rgba(220, 20, 60, 0.9)", hover: "rgba(220, 20, 60, 1)" },
  CoinFinderI: { bg: "rgba(180, 150, 0, 0.9)", hover: "rgba(180, 150, 0, 1)" },
  CoinFinderII: { bg: "rgba(180, 150, 0, 0.9)", hover: "rgba(180, 150, 0, 1)" },
  CoinFinderIII: { bg: "rgba(180, 150, 0, 0.9)", hover: "rgba(180, 150, 0, 1)" },
  SnowyCoinFinder: { bg: "rgba(180, 150, 0, 0.9)", hover: "rgba(180, 150, 0, 1)" },
  ProduceMutationBoost: { bg: "rgba(140, 15, 70, 0.9)", hover: "rgba(140, 15, 70, 1)" },
  ProduceMutationBoostII: { bg: "rgba(140, 15, 70, 0.9)", hover: "rgba(140, 15, 70, 1)" },
  SnowyCropMutationBoost: { bg: "rgba(140, 15, 70, 0.9)", hover: "rgba(140, 15, 70, 1)" },
  DoubleHarvest: { bg: "rgba(0, 120, 180, 0.9)", hover: "rgba(0, 120, 180, 1)" },
  DoubleHatch: { bg: "rgba(60, 90, 180, 0.9)", hover: "rgba(60, 90, 180, 1)" },
  ProduceEater: { bg: "rgba(255, 69, 0, 0.9)", hover: "rgba(255, 69, 0, 1)" },
  ProduceRefund: { bg: "rgba(255, 99, 71, 0.9)", hover: "rgba(255, 99, 71, 1)" },
  PetMutationBoost: { bg: "rgba(160, 50, 100, 0.9)", hover: "rgba(160, 50, 100, 1)" },
  PetMutationBoostII: { bg: "rgba(160, 50, 100, 0.9)", hover: "rgba(160, 50, 100, 1)" },
  HungerRestore: { bg: "rgba(255, 105, 180, 0.9)", hover: "rgba(255, 105, 180, 1)" },
  HungerRestoreII: { bg: "rgba(255, 105, 180, 0.9)", hover: "rgba(255, 105, 180, 1)" },
  SnowyHungerRestore: { bg: "rgba(255, 105, 180, 0.9)", hover: "rgba(255, 105, 180, 1)" },
  PetRefund: { bg: "rgba(0, 80, 120, 0.9)", hover: "rgba(0, 80, 120, 1)" },
  PetRefundII: { bg: "rgba(0, 80, 120, 0.9)", hover: "rgba(0, 80, 120, 1)" },
  Copycat: { bg: "rgba(255, 140, 0, 0.9)", hover: "rgba(255, 140, 0, 1)" },
  GoldGranter: {
    bg: "linear-gradient(135deg, rgba(225, 200, 55, 0.9) 0%, rgba(225, 180, 10, 0.9) 40%, rgba(215, 185, 45, 0.9) 70%, rgba(210, 185, 45, 0.9) 100%)",
    hover: "linear-gradient(135deg, rgba(220, 200, 70, 1) 0%, rgba(210, 175, 5, 1) 40%, rgba(210, 185, 55, 1) 70%, rgba(200, 175, 30, 1) 100%)",
  },
  RainbowGranter: {
    bg: "linear-gradient(45deg, rgba(200,0,0,0.9), rgba(200,120,0,0.9), rgba(160,170,30,0.9), rgba(60,170,60,0.9), rgba(50,170,170,0.9), rgba(40,150,180,0.9), rgba(20,90,180,0.9), rgba(70,30,150,0.9))",
    hover: "linear-gradient(45deg, rgba(200,0,0,1), rgba(200,120,0,1), rgba(160,170,30,1), rgba(60,170,60,1), rgba(50,170,170,1), rgba(40,150,180,1), rgba(20,90,180,1), rgba(70,30,150,1))",
  },
  RainDance: { bg: "rgba(102, 204, 216, 0.9)", hover: "rgba(102, 204, 216, 1)" },
  SnowGranter: { bg: "rgba(144, 184, 204, 0.9)", hover: "rgba(144, 184, 204, 1)" },
  FrostGranter: { bg: "rgba(148, 160, 204, 0.9)", hover: "rgba(148, 160, 204, 1)" },
  SeedFinderI: { bg: "rgba(168, 102, 38, 0.9)", hover: "rgba(168, 102, 38, 1)" },
  SeedFinderII: { bg: "rgba(168, 102, 38, 0.9)", hover: "rgba(168, 102, 38, 1)" },
  SeedFinderIII: { bg: "rgba(168, 102, 38, 0.9)", hover: "rgba(168, 102, 38, 1)" },
  SeedFinderIV: { bg: "rgba(168, 102, 38, 0.9)", hover: "rgba(168, 102, 38, 1)" },
};

/**
 * Default color for unknown abilities
 */
const DEFAULT_COLOR: AbilityColor = {
  bg: "rgba(100, 100, 100, 0.9)",
  hover: "rgba(150, 150, 150, 1)",
};

/**
 * Get color for a specific ability ID
 */
function getAbilityColor(abilityId: string): AbilityColor {
  return ABILITY_COLORS[abilityId] || DEFAULT_COLOR;
}

/**
 * Enrich abilities with colors
 */
function enrichAbilitiesWithColors(): void {
  if (!captureState.data.abilities) return;

  const abilities = captureState.data.abilities as Record<string, unknown>;
  let hasColors = false;

  // Check if already enriched
  for (const abilityData of Object.values(abilities)) {
    if (abilityData && typeof abilityData === "object" && "colors" in abilityData) {
      hasColors = true;
      break;
    }
  }

  if (hasColors) return;

  const enriched: Record<string, unknown> = {};

  // Enrich all abilities
  for (const [abilityId, abilityData] of Object.entries(abilities)) {
    const colors = getAbilityColor(abilityId);
    enriched[abilityId] = {
      ...(abilityData as object),
      colors: {
        bg: colors.bg,
        hover: colors.hover,
      },
    };
  }

  captureState.data.abilities = enriched;
  console.log("[MGData] Enriched abilities with colors");
}

/**
 * Start polling for ability color enrichment
 */
export function startColorPolling(): void {
  if (captureState.colorPollingTimer) return;
  captureState.colorPollAttempts = 0;

  const MAX_ATTEMPTS = 10;
  const POLL_INTERVAL_MS = 1000;

  const timer = setInterval(() => {
    if (captureState.data.abilities) {
      enrichAbilitiesWithColors();
      clearInterval(timer);
      captureState.colorPollingTimer = null;
    } else if (++captureState.colorPollAttempts > MAX_ATTEMPTS) {
      clearInterval(timer);
      captureState.colorPollingTimer = null;
    }
  }, POLL_INTERVAL_MS);

  captureState.colorPollingTimer = timer;

  // Try immediately
  if (captureState.data.abilities) {
    enrichAbilitiesWithColors();
    clearInterval(timer);
    captureState.colorPollingTimer = null;
  }
}

/**
 * Stop color polling
 */
export function stopColorPolling(): void {
  if (captureState.colorPollingTimer) {
    clearInterval(captureState.colorPollingTimer);
    captureState.colorPollingTimer = null;
  }
}
