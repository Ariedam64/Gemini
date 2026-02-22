/**
 * Mutation Data Helpers
 * Utilities for working with mutation data
 */

import { MGData, MGSprite } from "../../../../../../modules";
import { MUTATION_GROUPS } from "../types";

/* ─────────────────────────── Weather Mutations ─────────────────────────── */

/**
 * Get available weather mutations (excludes Gold/Rainbow color mutations)
 */
export function getAvailableWeatherMutations(): string[] {
    if (!MGSprite.isReady()) {
        console.warn("[MutationData] MGSprite not ready yet");
        return [];
    }

    try {
        const allMutations = MGSprite.getMutationNames();
        return allMutations.filter(m => m !== "Gold" && m !== "Rainbow");
    } catch (error) {
        console.error("[MutationData] Failed to get mutation names:", error);
        return [];
    }
}

/* ─────────────────────────── Display Names ─────────────────────────── */

/**
 * Get the display name for a mutation
 * Returns the mutation's name from MGData, or the ID as fallback
 */
export function getMutationDisplayName(mutationId: string): string {
    if (mutationId === "none") return "Normal";

    try {
        const mutationsData = MGData.get("mutations") as Record<string, unknown> | null;
        const mutationInfo = mutationsData?.[mutationId] as { name?: string } | undefined;
        return mutationInfo?.name || mutationId;
    } catch {
        return mutationId;
    }
}

/**
 * Get formatted display names for a list of mutations
 */
export function formatMutationNames(mutations: string[]): string {
    return mutations
        .map(m => m === "none" ? "none" : getMutationDisplayName(m).toLowerCase())
        .join(", ");
}

/* ─────────────────────────── Ordering ─────────────────────────── */

/**
 * Get weather mutations in MGData order (excludes Gold/Rainbow)
 * Used as the canonical ordering reference for preview sorting
 */
export function getWeatherMutationOrder(): string[] {
    return getAvailableWeatherMutations();
}

/**
 * Get the index of a weather mutation in MGData order.
 * Returns Infinity for unknown mutations (sorts last).
 */
export function getWeatherMutationIndex(mutation: string): number {
    const order = getWeatherMutationOrder();
    const idx = order.indexOf(mutation);
    return idx === -1 ? Infinity : idx;
}

/* ─────────────────────────── Validation ─────────────────────────── */

/**
 * Check if a mutation belongs to the wet group
 */
export function isWetMutation(mutation: string): boolean {
    return (MUTATION_GROUPS.wet as readonly string[]).includes(mutation);
}

/**
 * Check if a mutation belongs to the lunar group
 */
export function isLunarMutation(mutation: string): boolean {
    return (MUTATION_GROUPS.lunar as readonly string[]).includes(mutation);
}

/**
 * Clean up selections when switching to "all" match mode
 * Ensures only one mutation per group is selected
 */
export function cleanSelectionsForAllMode(selected: string[]): string[] {
    const selectedWet = selected.filter(m => isWetMutation(m));
    const selectedLunar = selected.filter(m => isLunarMutation(m));

    const cleaned: string[] = [];
    if (selectedWet.length > 0) cleaned.push(selectedWet[0]);
    if (selectedLunar.length > 0 && cleaned.length < 2) cleaned.push(selectedLunar[0]);

    return cleaned;
}

/**
 * Check if adding a mutation is valid in "all" match mode
 */
export function canAddInAllMode(
    mutation: string,
    currentSelections: string[]
): boolean {
    if (mutation === "none") return true;

    // Count non-none selections
    const nonNoneCount = currentSelections.filter(m => m !== "none").length;
    if (nonNoneCount >= 2) return false;

    return true;
}

/**
 * Get the mutation group to replace when adding in "all" mode
 */
export function getMutationsToRemoveForAllMode(
    newMutation: string,
    currentSelections: string[]
): string[] {
    if (isWetMutation(newMutation)) {
        return currentSelections.filter(m => isWetMutation(m));
    }
    if (isLunarMutation(newMutation)) {
        return currentSelections.filter(m => isLunarMutation(m));
    }
    return [];
}

/* ─────────────────────────── Rule Comparison ─────────────────────────── */

interface RuleConditions {
    mode: string;
    sizeCondition?: { enabled: boolean; minPercentage: number };
    mutationCondition?: { enabled: boolean; mutations: string[]; matchMode: string };
}

/**
 * Generate a unique signature for a rule based on its conditions
 * Used to detect duplicate rules (same conditions, different name/ID)
 */
export function getRuleSignature(rule: RuleConditions): string {
    const parts: string[] = [rule.mode];

    if (rule.sizeCondition?.enabled) {
        parts.push(`size:${rule.sizeCondition.minPercentage}`);
    }

    if (rule.mutationCondition?.enabled) {
        const sortedMutations = [...rule.mutationCondition.mutations].sort();
        parts.push(`mut:${rule.mutationCondition.matchMode}:${sortedMutations.join(",")}`);
    }

    return parts.join("|");
}

/**
 * Check if two rules have equivalent conditions
 */
export function areRulesEquivalent(ruleA: RuleConditions, ruleB: RuleConditions): boolean {
    return getRuleSignature(ruleA) === getRuleSignature(ruleB);
}
