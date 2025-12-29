// src/modules/core/abilityLogger.ts
// Ability Logger - Tracks pet ability procs detected by Globals.myPets.subscribeAbility()

import { Globals } from '../../globals';
import type { PetAbilityEvent, Unsubscribe } from '../../globals/core/types';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface AbilityProc {
  id: string;
  timestamp: number;
  abilityId: string;
  petId: string;
  petSpecies: string;
  petName: string | null;
}

export interface AbilityStats {
  abilityId: string;
  count: number;
  procsPerMinute: number;
  procsPerHour: number;
  lastProc: number | null;
}

export interface GetLogsOptions {
  abilityId?: string;
  petId?: string;
  petSpecies?: string;
  since?: number;
  limit?: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Ability Logger Class
// ─────────────────────────────────────────────────────────────────────────────

export class AbilityLogger {
  private logs: AbilityProc[] = [];
  private maxLogs = 1000;
  private unsubscribe: Unsubscribe | null = null;
  private isInitialized = false;

  /**
   * Initialize the logger and start tracking ability procs
   */
  init(): void {
    if (this.isInitialized) return;

    // Leverage Gemini's existing ability detection!
    this.unsubscribe = Globals.myPets.subscribeAbility((event: PetAbilityEvent) => {
      this.log({
        abilityId: event.trigger.abilityId || 'unknown',
        petId: event.pet.id,
        petSpecies: event.pet.petSpecies,
        petName: event.pet.name,
        timestamp: event.trigger.performedAt || Date.now(),
      });
    });

    this.isInitialized = true;
  }

  /**
   * Log a new ability proc
   */
  log(proc: Omit<AbilityProc, 'id'>): void {
    const fullProc: AbilityProc = {
      ...proc,
      id: `${proc.timestamp}-${Math.random().toString(36).substr(2, 9)}`,
    };

    this.logs.push(fullProc);

    // Maintain max log size
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }
  }

  /**
   * Get filtered logs
   */
  getLogs(options?: GetLogsOptions): AbilityProc[] {
    let filtered = this.logs;

    if (options?.abilityId) {
      filtered = filtered.filter(l => l.abilityId === options.abilityId);
    }

    if (options?.petId) {
      filtered = filtered.filter(l => l.petId === options.petId);
    }

    if (options?.petSpecies) {
      filtered = filtered.filter(l => l.petSpecies === options.petSpecies);
    }

    const { since } = options ?? {};
    if (since !== undefined) {
      filtered = filtered.filter(l => l.timestamp >= since);
    }

    if (options?.limit) {
      filtered = filtered.slice(-options.limit);
    }

    return filtered;
  }

  /**
   * Get statistics for a time window
   */
  getStats(timeWindowMs: number = 3600000): Map<string, AbilityStats> {
    const cutoff = Date.now() - timeWindowMs;
    const relevantLogs = this.logs.filter(l => l.timestamp >= cutoff);

    const stats = new Map<string, AbilityStats>();

    for (const log of relevantLogs) {
      if (!stats.has(log.abilityId)) {
        stats.set(log.abilityId, {
          abilityId: log.abilityId,
          count: 0,
          procsPerMinute: 0,
          procsPerHour: 0,
          lastProc: null,
        });
      }

      const stat = stats.get(log.abilityId)!;
      stat.count++;

      if (!stat.lastProc || log.timestamp > stat.lastProc) {
        stat.lastProc = log.timestamp;
      }
    }

    // Calculate rates
    for (const stat of stats.values()) {
      stat.procsPerMinute = (stat.count / timeWindowMs) * 60000;
      stat.procsPerHour = (stat.count / timeWindowMs) * 3600000;
    }

    return stats;
  }

  /**
   * Get statistics for a specific ability
   */
  getAbilityStats(abilityId: string, timeWindowMs: number = 3600000): AbilityStats | null {
    const stats = this.getStats(timeWindowMs);
    return stats.get(abilityId) || null;
  }

  /**
   * Get statistics for a specific pet
   */
  getPetStats(petId: string, timeWindowMs: number = 3600000): {
    totalProcs: number;
    abilities: Map<string, AbilityStats>;
  } {
    const cutoff = Date.now() - timeWindowMs;
    const petLogs = this.logs.filter(l => l.petId === petId && l.timestamp >= cutoff);

    const abilities = new Map<string, AbilityStats>();

    for (const log of petLogs) {
      if (!abilities.has(log.abilityId)) {
        abilities.set(log.abilityId, {
          abilityId: log.abilityId,
          count: 0,
          procsPerMinute: 0,
          procsPerHour: 0,
          lastProc: null,
        });
      }

      const stat = abilities.get(log.abilityId)!;
      stat.count++;

      if (!stat.lastProc || log.timestamp > stat.lastProc) {
        stat.lastProc = log.timestamp;
      }
    }

    // Calculate rates
    for (const stat of abilities.values()) {
      stat.procsPerMinute = (stat.count / timeWindowMs) * 60000;
      stat.procsPerHour = (stat.count / timeWindowMs) * 3600000;
    }

    return {
      totalProcs: petLogs.length,
      abilities,
    };
  }

  /**
   * Get top abilities by proc count
   */
  getTopAbilities(limit: number = 10, timeWindowMs: number = 3600000): AbilityStats[] {
    const stats = Array.from(this.getStats(timeWindowMs).values());
    return stats.sort((a, b) => b.count - a.count).slice(0, limit);
  }

  /**
   * Clear all logs
   */
  clear(): void {
    this.logs = [];
  }

  /**
   * Set max log size
   */
  setMaxLogs(max: number): void {
    this.maxLogs = max;
    if (this.logs.length > max) {
      this.logs = this.logs.slice(-max);
    }
  }

  /**
   * Get current log count
   */
  getLogCount(): number {
    return this.logs.length;
  }

  /**
   * Check if logger is initialized
   */
  isActive(): boolean {
    return this.isInitialized;
  }

  /**
   * Destroy the logger and clean up subscriptions
   */
  destroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
    this.logs = [];
    this.isInitialized = false;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Singleton instance
// ─────────────────────────────────────────────────────────────────────────────

let instance: AbilityLogger | null = null;

/**
 * Get the singleton AbilityLogger instance
 */
export function getAbilityLogger(): AbilityLogger {
  if (!instance) {
    instance = new AbilityLogger();
    instance.init();
  }
  return instance;
}

/**
 * Destroy the singleton instance
 */
export function destroyAbilityLogger(): void {
  if (instance) {
    instance.destroy();
    instance = null;
  }
}
