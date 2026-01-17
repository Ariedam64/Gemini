/**
 * Growth Panel - Barrel Exports
 */
export { growthPanel } from './GrowthPanel';

// Re-export helpers for potential reuse
export {
    el,
    formatTimeCompact,
    formatMinutesPerHour,
    formatCountdown,
    getSpriteElement,
    getStackedSpritesElement,
    buildStatRow,
    buildBoostRow,
    getPetBoostInfo,
    calculatePetMultiplier,
    calculateTeamMultiplier,
    calcAvgPercentEggs,
    calcAvgPercentCrops,
    findNextReadyEgg,
    findNextReadyCrop,
    findLastReadyEgg,
    findLastReadyCrop,
    calcBoostedRemaining,
} from './helpers';
