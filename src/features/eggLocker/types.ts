/**
 * EggLocker types and configuration
 */

/**
 * EggLocker feature configuration
 */
export interface EggLockerConfig {
    enabled: boolean;
    /** Egg IDs to block hatching on (e.g. "CommonEgg") */
    blockedEggs: string[];
}

/**
 * Default configuration
 */
export const DEFAULT_CONFIG: EggLockerConfig = {
    enabled: true,
    blockedEggs: [],
};
