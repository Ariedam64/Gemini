/**
 * V11 QuinoaUserDataSchema - Complete Schema Definition
 */

import * as v from 'valibot';
import { DecorIdSchema } from '@/common/games/Quinoa/systems/decor';
import {
  EggIdSchema,
  FaunaAbilityIdSchema,
  FaunaSpeciesIdSchema,
} from '@/common/games/Quinoa/systems/fauna';
import { FloraSpeciesIdSchema } from '@/common/games/Quinoa/systems/flora';
import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import {
  cropJournalVariants,
  petJournalVariants,
} from '@/common/games/Quinoa/systems/journal';
import { MutationIdSchema } from '@/common/games/Quinoa/systems/mutation';
import { SlotMachineIdSchema } from '@/common/games/Quinoa/systems/slotMachine';
import { PlayerStatIdSchema } from '@/common/games/Quinoa/systems/stats';
import { PetAbilityStatIdSchema } from '@/common/games/Quinoa/systems/stats/petAbilityStatsDex';
import { PlantAbilityStatIdSchema } from '@/common/games/Quinoa/systems/stats/plantAbilityStatsDex';
import { TaskIdSchema } from '@/common/games/Quinoa/systems/tasks';
import { ToolIdSchema } from '@/common/games/Quinoa/systems/tools';
import { Currency } from '@/common/games/Quinoa/types';
import { QuinoaUserJsonSchemaVersion } from '@/common/games/Quinoa/user-json-schema/QuinoaUserJsonSchemaVersion';

const CurrencySchema = v.picklist(Object.values(Currency));
const UnixTimestampSchema = v.pipe(v.number(), v.minValue(0));

enum ShopType {
  Seed = 'seed',
  Egg = 'egg',
  Tool = 'tool',
  Decor = 'decor',
}

const ShopTypeSchema = v.picklist(Object.values(ShopType));
/**
 * Schema for decor rotation values.
 *
 * Valid rotations include:
 * - 0, 90, 180, 270: Standard rotation angles
 * - -360, -90, -180, -270: Same angles but with horizontal flip
 *
 * Note: -360 is semantically "0° with horizontal flip" and is used throughout
 * the codebase as the flipped version of the default rotation.
 */
const DecorRotationSchema = v.picklist([
  0, -360, 90, -90, 180, -180, 270, -270,
]);

const PetSlotSchema = v.strictObject({
  id: v.string(),
  petSpecies: FaunaSpeciesIdSchema,
  name: v.nullable(v.string()),
  xp: v.pipe(v.number(), v.minValue(0)),
  hunger: v.pipe(v.number(), v.minValue(0)),
  mutations: v.array(MutationIdSchema),
  targetScale: v.pipe(v.number(), v.minValue(0)),
  abilities: v.array(FaunaAbilityIdSchema),
});

const GrowSlotSchema = v.strictObject({
  species: FloraSpeciesIdSchema,
  startTime: UnixTimestampSchema,
  endTime: UnixTimestampSchema,
  targetScale: v.pipe(v.number(), v.minValue(0)),
  mutations: v.array(MutationIdSchema),
});

const CropInventoryItemSchema = v.strictObject({
  /**
   * Unique identifier for this specific crop item.
   *
   * Inventory ID System Design:
   * - Crop items: Each gets a unique `id` field since they're not stackable
   *   (individual properties like scale and mutations make each one unique)
   * - Plants: Each gets a unique `id` field since they're not stackable
   *   (individual properties like slots make each one unique)
   * - Seeds: No individual ID needed - they're stackable and identified by `species + itemType`
   * - Tools: No individual ID needed - they're stackable and identified by `toolId + itemType`
   *
   * This system ensures every item in the inventory has a stable, unique identifier
   * that greatly aids in implementing future features like:
   * - Inventory reordering (drag & drop)
   * - Item trading between players
   * - Precise tracking of selected items
   * - Better React performance (proper key usage prevents unnecessary re-renders)
   */
  id: v.string(),
  species: FloraSpeciesIdSchema,
  itemType: v.literal(ItemType.Produce),
  scale: v.pipe(v.number(), v.minValue(0)),
  mutations: v.array(MutationIdSchema),
});

const SeedInventoryItemSchema = v.strictObject({
  species: FloraSpeciesIdSchema,
  itemType: v.literal(ItemType.Seed),
  /**
   * Seeds are stackable items - multiple identical seeds are combined into one entry.
   * They don't need individual IDs because they're functionally identical.
   * Their unique identifier is derived from species + itemType.
   */
  quantity: v.pipe(v.number(), v.minValue(1)),
});

const ToolInventoryItemSchema = v.strictObject({
  toolId: ToolIdSchema,
  itemType: v.literal(ItemType.Tool),
  /**
   * Tools are stackable items - multiple identical tools are combined into one entry.
   * They don't need individual IDs because they're functionally identical.
   * Their unique identifier is derived from toolId + itemType.
   */
  quantity: v.pipe(v.number(), v.minValue(1)),
});

const PlantInventoryItemSchema = v.strictObject({
  id: v.string(),
  species: FloraSpeciesIdSchema,
  itemType: v.literal(ItemType.Plant),
  /** The growth slots for this plant */
  slots: v.array(GrowSlotSchema),
  /** The time, in milliseconds since the Unix epoch, the plant was planted */
  plantedAt: UnixTimestampSchema,
  /** The time, in milliseconds since the Unix epoch, the plant matured */
  maturedAt: UnixTimestampSchema,
});

const EggInventoryItemSchema = v.strictObject({
  eggId: EggIdSchema,
  itemType: v.literal(ItemType.Egg),
  /**
   * Seeds are stackable items - multiple identical seeds are combined into one entry.
   * They don't need individual IDs because they're functionally identical.
   * Their unique identifier is derived from species + itemType.
   */
  quantity: v.pipe(v.number(), v.minValue(1)),
});

const PetInventoryItemSchema = v.strictObject({
  id: v.string(),
  itemType: v.literal(ItemType.Pet),
  petSpecies: FaunaSpeciesIdSchema,
  name: v.nullable(v.string()),
  xp: v.pipe(v.number(), v.minValue(0)),
  hunger: v.pipe(v.number(), v.minValue(0)),
  mutations: v.array(MutationIdSchema),
  targetScale: v.pipe(v.number(), v.minValue(0)),
  abilities: v.array(FaunaAbilityIdSchema),
});

const DecorInventoryItemSchema = v.strictObject({
  decorId: DecorIdSchema,
  itemType: v.literal(ItemType.Decor),
  quantity: v.pipe(v.number(), v.minValue(1)),
});

const InventoryItemSchema = v.union([
  CropInventoryItemSchema,
  SeedInventoryItemSchema,
  ToolInventoryItemSchema,
  PlantInventoryItemSchema,
  EggInventoryItemSchema,
  PetInventoryItemSchema,
  DecorInventoryItemSchema,
]);

const itemStorageSchema = v.strictObject({
  decorId: DecorIdSchema,
  items: v.array(InventoryItemSchema),
});

const itemStoragesSchema = v.array(itemStorageSchema);
const favoritedItemIdsSchema = v.array(v.string());

const InventorySchema = v.strictObject({
  items: v.array(InventoryItemSchema),
  /**
   * Storage containers organized by decor ID.
   * Each decor can store an array of inventory items.
   * Keys are decor IDs, values are arrays of items stored in that decor.
   */
  storages: itemStoragesSchema,
  /**
   * Array of unique identifiers for favorited items.
   * - For crop items: Contains the item's unique `id` field
   * - For seeds: Contains `seed-${species}` format
   * - For tools: Contains `tool-${toolId}` format
   */
  favoritedItemIds: favoritedItemIdsSchema,
});

const PlantTileObjectSchema = v.strictObject({
  /** The type of object, always 'plant' for plant tile objects */
  objectType: v.literal('plant'),

  /** The species of plant */
  species: FloraSpeciesIdSchema,

  /** The growth slots for this plant */
  slots: v.array(GrowSlotSchema),

  /** The time, in milliseconds since the Unix epoch, the plant was planted */
  plantedAt: UnixTimestampSchema,

  /** The time, in milliseconds since the Unix epoch, the plant matured */
  maturedAt: UnixTimestampSchema,
});

const EggObjectSchema = v.strictObject({
  /** The type of object, always 'egg' for egg tile objects */
  objectType: v.literal('egg'),

  /** The type of egg */
  eggId: EggIdSchema,

  /** The time, in milliseconds since the Unix epoch, the egg was planted */
  plantedAt: UnixTimestampSchema,

  /** The time, in milliseconds since the Unix epoch, the egg matured */
  maturedAt: UnixTimestampSchema,
});

const DecorObjectSchema = v.strictObject({
  objectType: v.literal('decor'),
  decorId: DecorIdSchema,
  /**
   * The rotation of the decor object, in degrees.
   *
   * - Positive values (e.g., 0, 90, 180, 270) represent standard rotation angles.
   * - Negative values indicate the decor is flipped horizontally.
   *   - Special case: -360 is used to represent "0° rotation, but flipped horizontally".
   *     This is a convention used throughout the codebase (see getTileRefForRotation, flipDecorHorizontal, etc).
   *     Note: -360 is mathematically equivalent to 0°, but semantically means "0° with horizontal flip".
   *     This implicit contract is important for correct rendering and must be preserved.
   * - Any other negative value (e.g., -90, -180) means "that rotation, flipped horizontally".
   */
  rotation: DecorRotationSchema,
});

const GardenTileObjectSchema = v.union([
  PlantTileObjectSchema,
  EggObjectSchema,
  DecorObjectSchema,
]);

const BoardwalkTileObjectSchema = v.union([DecorObjectSchema]);

const GardenSchema = v.strictObject({
  tileObjects: v.record(v.string(), GardenTileObjectSchema),
  boardwalkTileObjects: v.record(v.string(), BoardwalkTileObjectSchema),
});

const CustomRestockSchema = v.nullable(
  v.strictObject({
    purchasedAt: UnixTimestampSchema,
  })
);

const CustomRestocksSchema = v.strictObject({
  seed: CustomRestockSchema,
  egg: CustomRestockSchema,
  tool: CustomRestockSchema,
  decor: CustomRestockSchema,
});

const ShopPurchaseSchema = v.nullable(
  v.strictObject({
    // Timestamp (ms since epoch) of when the purchase batch was made.
    createdAt: UnixTimestampSchema,
    /*
     * Quantities purchased for each species in this transaction.
     * Keys are species IDs (validated through `SpeciesSchema`) and values are
     * non-zero integers.
     */
    purchases: v.record(
      v.string(),
      v.pipe(v.number(), v.safeInteger(), v.minValue(1))
    ),
  })
);

const ShopPurchasesSchema = v.strictObject({
  seed: ShopPurchaseSchema,
  egg: ShopPurchaseSchema,
  tool: ShopPurchaseSchema,
  decor: ShopPurchaseSchema,
});

/**
 * Schema for a single journal entry with variant and timestamp.
 */
const CropVariantLogSchema = v.strictObject({
  variant: v.picklist(cropJournalVariants),
  createdAt: UnixTimestampSchema,
});

const PetVariantLogSchema = v.strictObject({
  variant: v.picklist(petJournalVariants),
  createdAt: UnixTimestampSchema,
});

/**
 * Schema for a single ability journal entry with ability and timestamp.
 */
const AbilityLogSchema = v.strictObject({
  ability: FaunaAbilityIdSchema,
  createdAt: UnixTimestampSchema,
});

/**
 * Schema for tracking journal data for a specific crop species.
 */
const CropJournalDataSchema = v.strictObject({
  /**
   * All variants logged for this crop species.
   * Includes "Normal" for non-mutated version and actual mutation names.
   * Each entry contains the variant name and when it was logged.
   */
  variantsLogged: v.array(CropVariantLogSchema),
});

/**
 * Schema for tracking journal data for a specific pet species.
 */
const PetJournalDataSchema = v.strictObject({
  /**
   * All variants logged for this pet species.
   * Includes "Normal" for non-mutated version and actual mutation names.
   * Each entry contains the variant name and when it was logged.
   */
  variantsLogged: v.array(PetVariantLogSchema),
  abilitiesLogged: v.array(AbilityLogSchema),
});

const JournalSchema = v.strictObject({
  /**
   * Crop journal: keys are SpeciesId, values contain mutations, scale, and prized possessions
   */
  produce: v.record(FloraSpeciesIdSchema, CropJournalDataSchema),
  /**
   * Pet journal: keys are FaunaSpeciesId, values contain mutations and prized possessions
   */
  pets: v.record(FaunaSpeciesIdSchema, PetJournalDataSchema),
});

export type Journal = v.InferOutput<typeof JournalSchema>;

/**
 * Schema for slot machine stats tracking plays and prizes won per machine.
 */
const SlotMachineStatsSchema = v.record(
  SlotMachineIdSchema,
  v.strictObject({
    numPlays: v.pipe(v.number(), v.safeInteger(), v.minValue(0)),
    prizesWon: v.record(
      v.string(),
      v.pipe(v.number(), v.safeInteger(), v.minValue(0))
    ),
  })
);

const PlayerStatsSchema = v.record(PlayerStatIdSchema, v.number());

const PetAbilityStatsSchema = v.record(PetAbilityStatIdSchema, v.number());

const PlantAbilityStatsSchema = v.record(PlantAbilityStatIdSchema, v.number());

/**
 * Player stats track various gameplay metrics.
 */
const StatsSchema = v.strictObject({
  player: PlayerStatsSchema,
  slotMachine: SlotMachineStatsSchema,
  petAbility: PetAbilityStatsSchema,
  plantAbility: PlantAbilityStatsSchema,
});

/**
 * Activity log schemas - single source of truth for both runtime validation and TypeScript types.
 * Uses discriminated union for type-safe parameter validation based on action.
 */
const ActivityLogSchema = v.variant('action', [
  // === Flora (Crops) Actions ===
  v.object({
    action: v.literal('plantSeed'),
    timestamp: UnixTimestampSchema,
    parameters: v.object({
      speciesIds: v.array(FloraSpeciesIdSchema),
    }),
  }),
  v.object({
    action: v.literal('harvest'),
    timestamp: UnixTimestampSchema,
    parameters: v.object({
      crops: v.array(CropInventoryItemSchema),
    }),
  }),
  v.object({
    action: v.literal('potPlant'),
    timestamp: UnixTimestampSchema,
    parameters: v.object({
      plant: PlantTileObjectSchema,
    }),
  }),
  v.object({
    action: v.literal('plantGardenPlant'),
    timestamp: UnixTimestampSchema,
    parameters: v.object({
      plant: PlantTileObjectSchema,
    }),
  }),
  v.object({
    action: v.literal('waterPlant'),
    timestamp: UnixTimestampSchema,
    parameters: v.object({
      plant: PlantTileObjectSchema,
      numTimes: v.pipe(v.number(), v.minValue(1)),
      secondsReduced: v.number(),
    }),
  }),
  // === Fauna (Pets/Eggs) Actions ===
  v.object({
    action: v.literal('plantEgg'),
    timestamp: UnixTimestampSchema,
    parameters: v.object({
      eggIds: v.array(EggIdSchema),
    }),
  }),
  v.object({
    action: v.literal('hatchEgg'),
    timestamp: UnixTimestampSchema,
    parameters: v.object({
      eggId: EggIdSchema,
      pet: PetInventoryItemSchema,
    }),
  }),
  v.object({
    action: v.literal('feedPet'),
    timestamp: UnixTimestampSchema,
    parameters: v.object({
      pet: PetSlotSchema,
      crops: v.array(CropInventoryItemSchema),
    }),
  }),
  // === Garden Management ===
  v.object({
    action: v.literal('removeGardenObject'),
    timestamp: UnixTimestampSchema,
    parameters: v.object({
      gardenObject: GardenTileObjectSchema,
    }),
  }),
  // === Economy/Trading ===
  v.object({
    action: v.literal('purchaseSeed'),
    timestamp: UnixTimestampSchema,
    parameters: v.object({
      speciesIds: v.array(FloraSpeciesIdSchema),
      currency: CurrencySchema,
      purchasePrice: v.number(),
    }),
  }),
  v.object({
    action: v.literal('purchaseEgg'),
    timestamp: UnixTimestampSchema,
    parameters: v.object({
      eggIds: v.array(EggIdSchema),
      currency: CurrencySchema,
      purchasePrice: v.number(),
    }),
  }),
  v.object({
    action: v.literal('purchaseTool'),
    timestamp: UnixTimestampSchema,
    parameters: v.object({
      toolIds: v.array(ToolIdSchema),
      currency: CurrencySchema,
      purchasePrice: v.number(),
    }),
  }),
  v.object({
    action: v.literal('purchaseDecor'),
    timestamp: UnixTimestampSchema,
    parameters: v.object({
      decorIds: v.array(DecorIdSchema),
      currency: CurrencySchema,
      purchasePrice: v.number(),
    }),
  }),
  v.object({
    action: v.literal('sellAllCrops'),
    timestamp: UnixTimestampSchema,
    parameters: v.object({
      totalValue: v.number(),
      bonusMultiplier: v.number(),
      cropsSold: v.array(CropInventoryItemSchema),
    }),
  }),
  v.object({
    action: v.literal('sellPet'),
    timestamp: UnixTimestampSchema,
    parameters: v.object({
      pet: PetInventoryItemSchema,
      totalValue: v.number(),
    }),
  }),
  // === Collection/Discovery ===
  v.object({
    action: v.literal('logItems'),
    timestamp: UnixTimestampSchema,
    parameters: v.object({
      newCropVariants: v.record(
        FloraSpeciesIdSchema,
        v.array(v.picklist(cropJournalVariants))
      ),
      newPetVariants: v.record(
        FaunaSpeciesIdSchema,
        v.array(v.picklist(petJournalVariants))
      ),
    }),
  }),
  // === Boosts/Consumables ===
  v.object({
    action: v.literal('instaGrow'),
    timestamp: UnixTimestampSchema,
    parameters: v.object({
      gardenObject: GardenTileObjectSchema,
      secondsSaved: v.number(),
      cost: v.number(),
    }),
  }),
  // === Mutation Potions ===
  v.object({
    action: v.literal('mutationPotion'),
    timestamp: UnixTimestampSchema,
    parameters: v.object({
      growSlot: GrowSlotSchema,
      toolId: ToolIdSchema,
    }),
  }),
  /// === Shop Restocks ===
  v.object({
    action: v.literal('customRestock'),
    timestamp: UnixTimestampSchema,
    parameters: v.object({
      shopType: ShopTypeSchema,
      currency: CurrencySchema,
      purchasePrice: v.number(),
    }),
  }),
  // === Slot Machines ===
  v.object({
    action: v.literal('spinSlotMachine'),
    timestamp: UnixTimestampSchema,
    parameters: v.object({
      slotMachineId: SlotMachineIdSchema,
      prizeId: v.pipe(v.number(), v.safeInteger(), v.minValue(0)),
    }),
  }),
  // === Pet Abilities ===
  // Coin Finders
  v.object({
    action: v.union([
      v.literal('CoinFinderI'),
      v.literal('CoinFinderII'),
      v.literal('CoinFinderIII'),
    ]),
    timestamp: UnixTimestampSchema,
    parameters: v.object({
      pet: PetSlotSchema,
      coinsFound: v.pipe(v.number(), v.minValue(0)),
    }),
  }),
  // Seed Finders
  v.object({
    action: v.union([
      v.literal('SeedFinderI'),
      v.literal('SeedFinderII'),
      v.literal('SeedFinderIII'),
      v.literal('SeedFinderIV'),
    ]),
    timestamp: UnixTimestampSchema,
    parameters: v.object({
      pet: PetSlotSchema,
      speciesId: FloraSpeciesIdSchema,
    }),
  }),
  // Hunger Restore
  v.object({
    action: v.union([v.literal('HungerRestore'), v.literal('HungerRestoreII')]),
    timestamp: UnixTimestampSchema,
    parameters: v.object({
      pet: PetSlotSchema,
      targetPet: PetSlotSchema,
      hungerRestoreAmount: v.pipe(v.number(), v.minValue(0)),
    }),
  }),
  // Double Harvest
  v.object({
    action: v.literal('DoubleHarvest'),
    timestamp: UnixTimestampSchema,
    parameters: v.object({
      pet: PetSlotSchema,
      harvestedCrop: CropInventoryItemSchema,
    }),
  }),
  // Double Hatch
  v.object({
    action: v.literal('DoubleHatch'),
    timestamp: UnixTimestampSchema,
    parameters: v.object({
      pet: PetSlotSchema,
      extraPet: PetInventoryItemSchema,
    }),
  }),
  // Produce Refund
  v.object({
    action: v.literal('ProduceRefund'),
    timestamp: UnixTimestampSchema,
    parameters: v.object({
      pet: PetSlotSchema,
      cropsRefunded: v.array(CropInventoryItemSchema),
    }),
  }),
  // Sell Boost
  v.object({
    action: v.union([
      v.literal('SellBoostI'),
      v.literal('SellBoostII'),
      v.literal('SellBoostIII'),
      v.literal('SellBoostIV'),
    ]),
    timestamp: UnixTimestampSchema,
    parameters: v.object({
      pet: PetSlotSchema,
      bonusCoins: v.pipe(v.number(), v.minValue(0)),
    }),
  }),
  // Pet XP Boost
  v.object({
    action: v.union([v.literal('PetXpBoost'), v.literal('PetXpBoostII')]),
    timestamp: UnixTimestampSchema,
    parameters: v.object({
      pet: PetSlotSchema,
      bonusXp: v.pipe(v.number(), v.minValue(0)),
      petsAffected: v.array(PetSlotSchema),
    }),
  }),
  // Pet Refund
  v.object({
    action: v.union([v.literal('PetRefund'), v.literal('PetRefundII')]),
    timestamp: UnixTimestampSchema,
    parameters: v.object({
      pet: PetSlotSchema,
      eggId: EggIdSchema,
    }),
  }),
  // Pet Age Boost
  v.object({
    action: v.union([v.literal('PetAgeBoost'), v.literal('PetAgeBoostII')]),
    timestamp: UnixTimestampSchema,
    parameters: v.object({
      pet: PetSlotSchema,
      targetPet: PetInventoryItemSchema,
      bonusXp: v.pipe(v.number(), v.minValue(0)),
    }),
  }),
  // Egg Growth Boost
  v.object({
    action: v.union([
      v.literal('EggGrowthBoost'),
      v.literal('EggGrowthBoostII_NEW'),
      v.literal('EggGrowthBoostII'),
    ]),
    timestamp: UnixTimestampSchema,
    parameters: v.object({
      pet: PetSlotSchema,
      secondsReduced: v.pipe(v.number(), v.minValue(0)),
      eggsAffected: v.array(EggIdSchema),
    }),
  }),
  // Pet Hatch Size Boost
  v.object({
    action: v.union([
      v.literal('PetHatchSizeBoost'),
      v.literal('PetHatchSizeBoostII'),
    ]),
    timestamp: UnixTimestampSchema,
    parameters: v.object({
      pet: PetSlotSchema,
      targetPet: PetInventoryItemSchema,
      strengthIncrease: v.pipe(v.number(), v.minValue(0)),
    }),
  }),
  // Produce Scale Boost
  v.object({
    action: v.union([
      v.literal('ProduceScaleBoost'),
      v.literal('ProduceScaleBoostII'),
    ]),
    timestamp: UnixTimestampSchema,
    parameters: v.object({
      pet: PetSlotSchema,
      scaleIncreasePercentage: v.pipe(v.number(), v.minValue(0)),
      numPlantsAffected: v.pipe(v.number(), v.safeInteger(), v.minValue(0)),
    }),
  }),
  // Plant Growth Boost
  v.object({
    action: v.union([
      v.literal('PlantGrowthBoost'),
      v.literal('PlantGrowthBoostII'),
    ]),
    timestamp: UnixTimestampSchema,
    parameters: v.object({
      pet: PetSlotSchema,
      secondsReduced: v.pipe(v.number(), v.minValue(0)),
      numPlantsAffected: v.pipe(v.number(), v.safeInteger(), v.minValue(0)),
    }),
  }),
  // Gold/Rainbow Granter/RainDance
  v.object({
    action: v.union([
      v.literal('GoldGranter'),
      v.literal('RainbowGranter'),
      v.literal('RainDance'),
    ]),
    timestamp: UnixTimestampSchema,
    parameters: v.object({
      pet: PetSlotSchema,
      growSlot: GrowSlotSchema,
      mutation: MutationIdSchema,
    }),
  }),
  // Produce Eater
  v.object({
    action: v.literal('ProduceEater'),
    timestamp: UnixTimestampSchema,
    parameters: v.object({
      pet: PetSlotSchema,
      growSlot: GrowSlotSchema,
      sellPrice: v.pipe(v.number(), v.minValue(0)),
    }),
  }),
  // === Plant Abilities ===
  v.object({
    action: v.union([v.literal('MoonKisser'), v.literal('DawnKisser')]),
    timestamp: UnixTimestampSchema,
    parameters: v.object({
      speciesId: FloraSpeciesIdSchema,
      growSlotsAffected: v.array(GrowSlotSchema),
      targetMutation: MutationIdSchema,
      sourceMutation: MutationIdSchema,
    }),
  }),
]);

const ActivityLogsSchema = v.array(ActivityLogSchema);

/**
 * QuinoaUserJsonSchema - Complete schema definition
 * Represents the entirety of a user's persistent data in the Quinoa game.
 * While playing, this is stored in-memory in the QuinoaManager and periodically
 * written to the database.
 */
const quinoaUserJsonSchema = v.strictObject({
  /**
   * The schema version of the user data.
   * This is used to ensure backwards compatibility when the schema changes.
   */
  schemaVersion: v.literal(QuinoaUserJsonSchemaVersion.V11),

  /**
   * The number of coins the user has.
   * Coins are used to buy plants, seeds, and other items.
   * This is the total number of coins the user has.
   */
  coinsCount: v.pipe(v.number(), v.safeInteger(), v.minValue(0)),

  /**
   * The inventory of the user.
   * This is used to store the items the user has.
   */
  inventory: InventorySchema,

  /**
   * What's in the user's garden.
   */
  garden: GardenSchema,

  /**
   * The pet slots in the user's garden.
   */
  petSlots: v.array(PetSlotSchema),

  /**
   * The current custom restock of the user, if any.
   */
  customRestocks: CustomRestocksSchema,
  /**
   * The purchases the user has made in the seed shop. Resets when the shop restocks.
   */
  shopPurchases: ShopPurchasesSchema,
  journal: JournalSchema,
  /**
   * Array of task IDs that the user has completed.
   * Used to track progression through the game's task system.
   */
  tasksCompleted: v.array(TaskIdSchema),
  /**
   * Player statistics tracking various gameplay metrics.
   * Stored as a flexible record to allow new stats to be added without schema migrations.
   */
  stats: StatsSchema,
  activityLogs: ActivityLogsSchema,
});

type GrowSlot = v.InferOutput<typeof GrowSlotSchema>;
type PlantTileObject = v.InferOutput<typeof PlantTileObjectSchema>;
type EggTileObject = v.InferOutput<typeof EggObjectSchema>;
type GardenTileObject = v.InferOutput<typeof GardenTileObjectSchema>;
type BoardwalkTileObject = v.InferOutput<typeof BoardwalkTileObjectSchema>;
type DecorObject = v.InferOutput<typeof DecorObjectSchema>;
type PetSlot = v.InferOutput<typeof PetSlotSchema>;
type Inventory = v.InferOutput<typeof InventorySchema>;
type InventoryItem = v.InferOutput<typeof InventoryItemSchema>;
type CropInventoryItem = v.InferOutput<typeof CropInventoryItemSchema>;
type SeedInventoryItem = v.InferOutput<typeof SeedInventoryItemSchema>;
type ToolInventoryItem = v.InferOutput<typeof ToolInventoryItemSchema>;
type PetInventoryItem = v.InferOutput<typeof PetInventoryItemSchema>;
type CustomRestocks = v.InferOutput<typeof CustomRestocksSchema>;
type ShopPurchases = v.InferOutput<typeof ShopPurchasesSchema>;
type PlantInventoryItem = v.InferOutput<typeof PlantInventoryItemSchema>;
type Garden = v.InferOutput<typeof GardenSchema>;
type DecorRotation = v.InferOutput<typeof DecorRotationSchema>;
type Stats = v.InferOutput<typeof StatsSchema>;
type ActivityLogEntry = v.InferOutput<typeof ActivityLogSchema>;
type ActivityLogAction = ActivityLogEntry['action'];

type QuinoaUserJson = Omit<
  v.InferOutput<typeof quinoaUserJsonSchema>,
  'coinsCount'
> & {
  /**
   * The number of coins the user has.
   * This is a readonly property to ensure we don't accidentally give users
   * fractional coins by allowing direct mutation of the property.
   *
   * See: QuinoaManager.addCoins() for more details.
   */
  readonly coinsCount: number;
};

function createDefaultQuinoaUserJson(): QuinoaUserJson {
  return {
    schemaVersion: QuinoaUserJsonSchemaVersion.V11,
    coinsCount: 0,
    inventory: {
      items: [{ species: 'Carrot', itemType: ItemType.Seed, quantity: 1 }],
      storages: [],
      favoritedItemIds: [],
    },
    petSlots: [],
    garden: {
      tileObjects: {},
      boardwalkTileObjects: {},
    },
    customRestocks: {
      seed: null,
      egg: null,
      tool: null,
      decor: null,
    },
    shopPurchases: {
      seed: null,
      egg: null,
      tool: null,
      decor: null,
    },
    journal: {
      produce: {},
      pets: {},
    },
    tasksCompleted: [],
    stats: {
      player: {},
      slotMachine: {},
      petAbility: {},
      plantAbility: {},
    },
    activityLogs: [],
  };
}

export {
  createDefaultQuinoaUserJson as V11_createDefaultQuinoaUserJson,
  quinoaUserJsonSchema as V11_quinoaUserJsonSchema,
  DecorRotationSchema as V11_DecorRotationSchema,
  UnixTimestampSchema as V11_UnixTimestampSchema,
  ActivityLogSchema as V11_ActivityLogSchema,
  ActivityLogsSchema as V11_ActivityLogsSchema,
  ShopTypeSchema as V11_ShopTypeSchema,
  ShopType as V11_ShopType,
  type CustomRestocks as V11_CustomRestocks,
  type EggTileObject as V11_EggTileObject,
  type Garden as V11_Garden,
  type GardenTileObject as V11_GardenTileObject,
  type BoardwalkTileObject as V11_BoardwalkTileObject,
  type DecorObject as V11_DecorObject,
  type GrowSlot as V11_GrowSlot,
  type Inventory as V11_Inventory,
  type InventoryItem as V11_InventoryItem,
  type Journal as V11_Journal,
  type PetInventoryItem as V11_PetInventoryItem,
  type PetSlot as V11_PetSlot,
  type Stats as V11_Stats,
  type PlantInventoryItem as V11_PlantInventoryItem,
  type PlantTileObject as V11_PlantTileObject,
  type CropInventoryItem as V11_CropInventoryItem,
  type QuinoaUserJson as V11_QuinoaUserJson,
  type SeedInventoryItem as V11_SeedInventoryItem,
  type ShopPurchases as V11_ShopPurchases,
  type ToolInventoryItem as V11_ToolInventoryItem,
  type DecorRotation as V11_DecorRotation,
  type ActivityLogEntry as V11_ActivityLogEntry,
  type ActivityLogAction as V11_ActivityLogAction,
};
