// src/modules/tracker/stats.ts
// Stats Tracker - Track player statistics and actions

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface CropStats {
  harvested: number;
  sold: number;
  totalValue: number;
  mutations: Record<string, number>; // mutation -> count
}

export interface PetStats {
  hatched: number;
  sold: number;
  fed: number;
  mutations: Record<string, number>; // mutation -> count
  abilities: Record<string, number>; // ability -> count
}

export interface SessionStats {
  sessionStart: number;
  sessionEnd: number | null;
  coinsEarned: number;
  coinsSpent: number;
  cropsHarvested: number;
  cropsSold: number;
  petsHatched: number;
  petsSold: number;
  petsFed: number;
  seedsPurchased: number;
  eggsPurchased: number;
  abilityProcs: number;
}

export interface AllTimeStats {
  totalSessions: number;
  totalPlayTime: number; // milliseconds
  coinsEarned: number;
  coinsSpent: number;
  cropsHarvested: number;
  cropsSold: number;
  petsHatched: number;
  petsSold: number;
  petsFed: number;
  seedsPurchased: number;
  eggsPurchased: number;
  abilityProcs: number;
  crops: Record<string, CropStats>;
  pets: Record<string, PetStats>;
}

export interface StatsData {
  session: SessionStats;
  allTime: AllTimeStats;
}

// ─────────────────────────────────────────────────────────────────────────────
// Stats Tracker Class
// ─────────────────────────────────────────────────────────────────────────────

export class StatsTracker {
  private stats: StatsData;
  private storageKey = 'gemini_stats';

  constructor() {
    this.stats = this.loadStats();
    this.startSession();
  }

  /**
   * Load stats from localStorage
   */
  private loadStats(): StatsData {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (err) {
      console.warn('[StatsTracker] Failed to load stats:', err);
    }

    return this.getDefaultStats();
  }

  /**
   * Save stats to localStorage
   */
  private saveStats(): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.stats));
    } catch (err) {
      console.warn('[StatsTracker] Failed to save stats:', err);
    }
  }

  /**
   * Get default stats structure
   */
  private getDefaultStats(): StatsData {
    return {
      session: {
        sessionStart: Date.now(),
        sessionEnd: null,
        coinsEarned: 0,
        coinsSpent: 0,
        cropsHarvested: 0,
        cropsSold: 0,
        petsHatched: 0,
        petsSold: 0,
        petsFed: 0,
        seedsPurchased: 0,
        eggsPurchased: 0,
        abilityProcs: 0,
      },
      allTime: {
        totalSessions: 0,
        totalPlayTime: 0,
        coinsEarned: 0,
        coinsSpent: 0,
        cropsHarvested: 0,
        cropsSold: 0,
        petsHatched: 0,
        petsSold: 0,
        petsFed: 0,
        seedsPurchased: 0,
        eggsPurchased: 0,
        abilityProcs: 0,
        crops: {},
        pets: {},
      },
    };
  }

  /**
   * Start a new session
   */
  private startSession(): void {
    this.stats.session = {
      sessionStart: Date.now(),
      sessionEnd: null,
      coinsEarned: 0,
      coinsSpent: 0,
      cropsHarvested: 0,
      cropsSold: 0,
      petsHatched: 0,
      petsSold: 0,
      petsFed: 0,
      seedsPurchased: 0,
      eggsPurchased: 0,
      abilityProcs: 0,
    };
    this.stats.allTime.totalSessions++;
    this.saveStats();
  }

  /**
   * End current session
   */
  endSession(): void {
    this.stats.session.sessionEnd = Date.now();
    const sessionDuration = this.stats.session.sessionEnd - this.stats.session.sessionStart;
    this.stats.allTime.totalPlayTime += sessionDuration;
    this.saveStats();
  }

  // ───────────────────────────────────────────────────────────────────────────
  // Recording methods
  // ───────────────────────────────────────────────────────────────────────────

  /**
   * Record crop harvest
   */
  recordHarvest(species: string, quantity: number = 1, mutations: string[] = []): void {
    this.stats.session.cropsHarvested += quantity;
    this.stats.allTime.cropsHarvested += quantity;

    if (!this.stats.allTime.crops[species]) {
      this.stats.allTime.crops[species] = {
        harvested: 0,
        sold: 0,
        totalValue: 0,
        mutations: {},
      };
    }

    this.stats.allTime.crops[species].harvested += quantity;

    // Track mutations
    for (const mutation of mutations) {
      if (!this.stats.allTime.crops[species].mutations[mutation]) {
        this.stats.allTime.crops[species].mutations[mutation] = 0;
      }
      this.stats.allTime.crops[species].mutations[mutation]++;
    }

    this.saveStats();
  }

  /**
   * Record crop sale
   */
  recordCropSale(species: string, quantity: number = 1, value: number = 0): void {
    this.stats.session.cropsSold += quantity;
    this.stats.session.coinsEarned += value;
    this.stats.allTime.cropsSold += quantity;
    this.stats.allTime.coinsEarned += value;

    if (!this.stats.allTime.crops[species]) {
      this.stats.allTime.crops[species] = {
        harvested: 0,
        sold: 0,
        totalValue: 0,
        mutations: {},
      };
    }

    this.stats.allTime.crops[species].sold += quantity;
    this.stats.allTime.crops[species].totalValue += value;

    this.saveStats();
  }

  /**
   * Record pet hatch
   */
  recordPetHatch(
    species: string,
    mutations: string[] = [],
    abilities: string[] = []
  ): void {
    this.stats.session.petsHatched++;
    this.stats.allTime.petsHatched++;

    if (!this.stats.allTime.pets[species]) {
      this.stats.allTime.pets[species] = {
        hatched: 0,
        sold: 0,
        fed: 0,
        mutations: {},
        abilities: {},
      };
    }

    this.stats.allTime.pets[species].hatched++;

    // Track mutations
    for (const mutation of mutations) {
      if (!this.stats.allTime.pets[species].mutations[mutation]) {
        this.stats.allTime.pets[species].mutations[mutation] = 0;
      }
      this.stats.allTime.pets[species].mutations[mutation]++;
    }

    // Track abilities
    for (const ability of abilities) {
      if (!this.stats.allTime.pets[species].abilities[ability]) {
        this.stats.allTime.pets[species].abilities[ability] = 0;
      }
      this.stats.allTime.pets[species].abilities[ability]++;
    }

    this.saveStats();
  }

  /**
   * Record pet sale
   */
  recordPetSale(species: string, value: number = 0): void {
    this.stats.session.petsSold++;
    this.stats.session.coinsEarned += value;
    this.stats.allTime.petsSold++;
    this.stats.allTime.coinsEarned += value;

    if (!this.stats.allTime.pets[species]) {
      this.stats.allTime.pets[species] = {
        hatched: 0,
        sold: 0,
        fed: 0,
        mutations: {},
        abilities: {},
      };
    }

    this.stats.allTime.pets[species].sold++;

    this.saveStats();
  }

  /**
   * Record pet feeding
   */
  recordPetFeed(species: string): void {
    this.stats.session.petsFed++;
    this.stats.allTime.petsFed++;

    if (!this.stats.allTime.pets[species]) {
      this.stats.allTime.pets[species] = {
        hatched: 0,
        sold: 0,
        fed: 0,
        mutations: {},
        abilities: {},
      };
    }

    this.stats.allTime.pets[species].fed++;

    this.saveStats();
  }

  /**
   * Record seed purchase
   */
  recordSeedPurchase(species: string, quantity: number = 1, cost: number = 0): void {
    this.stats.session.seedsPurchased += quantity;
    this.stats.session.coinsSpent += cost;
    this.stats.allTime.seedsPurchased += quantity;
    this.stats.allTime.coinsSpent += cost;

    this.saveStats();
  }

  /**
   * Record egg purchase
   */
  recordEggPurchase(eggId: string, quantity: number = 1, cost: number = 0): void {
    this.stats.session.eggsPurchased += quantity;
    this.stats.session.coinsSpent += cost;
    this.stats.allTime.eggsPurchased += quantity;
    this.stats.allTime.coinsSpent += cost;

    this.saveStats();
  }

  /**
   * Record ability proc
   */
  recordAbilityProc(abilityId: string): void {
    this.stats.session.abilityProcs++;
    this.stats.allTime.abilityProcs++;

    this.saveStats();
  }

  /**
   * Record coins earned
   */
  recordCoinsEarned(amount: number): void {
    this.stats.session.coinsEarned += amount;
    this.stats.allTime.coinsEarned += amount;

    this.saveStats();
  }

  /**
   * Record coins spent
   */
  recordCoinsSpent(amount: number): void {
    this.stats.session.coinsSpent += amount;
    this.stats.allTime.coinsSpent += amount;

    this.saveStats();
  }

  // ───────────────────────────────────────────────────────────────────────────
  // Getters
  // ───────────────────────────────────────────────────────────────────────────

  /**
   * Get current stats
   */
  getStats(): StatsData {
    return { ...this.stats };
  }

  /**
   * Get session stats
   */
  getSessionStats(): SessionStats {
    return { ...this.stats.session };
  }

  /**
   * Get all-time stats
   */
  getAllTimeStats(): AllTimeStats {
    return { ...this.stats.allTime };
  }

  /**
   * Get crop stats for a specific species
   */
  getCropStats(species: string): CropStats | null {
    return this.stats.allTime.crops[species] || null;
  }

  /**
   * Get pet stats for a specific species
   */
  getPetStats(species: string): PetStats | null {
    return this.stats.allTime.pets[species] || null;
  }

  /**
   * Get top crops by harvested count
   */
  getTopCrops(limit: number = 10): Array<{ species: string; stats: CropStats }> {
    return Object.entries(this.stats.allTime.crops)
      .map(([species, stats]) => ({ species, stats }))
      .sort((a, b) => b.stats.harvested - a.stats.harvested)
      .slice(0, limit);
  }

  /**
   * Get top pets by hatched count
   */
  getTopPets(limit: number = 10): Array<{ species: string; stats: PetStats }> {
    return Object.entries(this.stats.allTime.pets)
      .map(([species, stats]) => ({ species, stats }))
      .sort((a, b) => b.stats.hatched - a.stats.hatched)
      .slice(0, limit);
  }

  /**
   * Reset session stats
   */
  resetSession(): void {
    this.startSession();
  }

  /**
   * Reset all stats
   */
  resetAll(): void {
    this.stats = this.getDefaultStats();
    this.saveStats();
  }

  /**
   * Export stats as JSON
   */
  exportStats(): string {
    return JSON.stringify(this.stats, null, 2);
  }

  /**
   * Import stats from JSON
   */
  importStats(json: string): boolean {
    try {
      const imported = JSON.parse(json);
      this.stats = imported;
      this.saveStats();
      return true;
    } catch (err) {
      console.warn('[StatsTracker] Failed to import stats:', err);
      return false;
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Singleton instance
// ─────────────────────────────────────────────────────────────────────────────

let instance: StatsTracker | null = null;

/**
 * Get the singleton StatsTracker instance
 */
export function getStatsTracker(): StatsTracker {
  if (!instance) {
    instance = new StatsTracker();
  }
  return instance;
}

/**
 * Destroy the singleton instance
 */
export function destroyStatsTracker(): void {
  if (instance) {
    instance.endSession();
    instance = null;
  }
}