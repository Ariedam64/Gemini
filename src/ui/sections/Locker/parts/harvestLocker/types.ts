/**
 * Shared types for HarvestLocker UI
 * Centralized type definitions and constants
 */

import type { RuleMode, MutationMatchMode } from "../../../../../features/harvestLocker";

/* ─────────────────────────── View Mode ─────────────────────────── */

export type ViewMode = "overall" | "bySpecies";

/* ─────────────────────────── Rule Editor ─────────────────────────── */

export interface RuleEditorData {
    name: string;
    ruleMode: RuleMode;
    sizeCondition?: { enabled: boolean; minPercentage: number };
    mutationCondition?: { enabled: boolean; mutations: string[]; matchMode: MutationMatchMode };
}

export interface RuleEditorModalOptions {
    mode: "overall" | "species";
    species?: string | null;
    ruleId?: string;
    initialData?: Partial<RuleEditorData>;
    onSave: (data: RuleEditorData) => void;
    onDelete?: () => void;
    onCancel?: () => void;
}

export interface RuleEditorModalHandle {
    root: HTMLElement;
    destroy(): void;
}

/* ─────────────────────────── Existing Rule Selector ─────────────────────────── */

export interface ExistingRuleSelectorOptions {
    species: string;
    existingRules: import("../../../../../features/harvestLocker").HarvestRule[];
    onSelect: (ruleId: string) => void;
    onCancel?: () => void;
}

export interface ExistingRuleSelectorHandle {
    root: HTMLElement;
    destroy(): void;
}

/* ─────────────────────────── Constants ─────────────────────────── */

/** Color mutations (Gold, Rainbow, or none) */
export const COLOR_MUTATIONS = ["none", "Gold", "Rainbow"] as const;
export type ColorMutation = typeof COLOR_MUTATIONS[number];

/** Mutually exclusive mutation groups */
export const MUTATION_GROUPS = {
    wet: ["Wet", "Chilled", "Frozen"],
    lunar: ["Dawnlit", "Ambershine", "Dawncharged", "Ambercharged"],
} as const;
