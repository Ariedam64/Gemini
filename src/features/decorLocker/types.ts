/**
 * DecorLocker types and configuration
 */

/**
 * DecorLocker feature configuration
 */
export interface DecorLockerConfig {
    enabled: boolean;
    /** Decor IDs to block pickup (e.g. "MiniWizardTower") */
    blockedDecors: string[];
}

/**
 * Default configuration
 */
export const DEFAULT_CONFIG: DecorLockerConfig = {
    enabled: true,
    blockedDecors: [],
};
