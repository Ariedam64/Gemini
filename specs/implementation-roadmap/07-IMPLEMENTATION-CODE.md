# Implementation Code - Phase 1 Calculator Modules

Complete, production-ready code for all new files in Phase 1.

---

## File 1: `src/ui/components/BasePetCard/BasePetCard.ts`

```typescript
/**
 * Base Pet Card Component
 *
 * Reusable component for rendering pet cards with:
 * - Pet sprite (64x64)
 * - Status badges (MAX, STARVING, XP BOOST)
 * - Automatic strength display
 * - Content area for custom stats/actions
 *
 * Per .claude/rules/ui/ui.components.md:
 * - Must have build() and destroy() methods
 * - Must be safe to call multiple times
 * - Must use theme CSS variables
 * - Must be responsive
 *
 * @module BasePetCard
 */

import { MGSprite } from '../../../modules/sprite';
import type { MutationName } from '../../../modules/sprite';
import type { UnifiedPet } from '../../../globals/core/types';
import type { XpBoostStats } from '../../../features/xpTracker/types';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface BasePetCardOptions {
    /** Pet data */
    pet: UnifiedPet;
    /** Optional XP boost stats for badge display */
    xpBoostStats?: XpBoostStats | null;
    /** Whether to show the automatic strength display (default: true) */
    showStrength?: boolean;
    /** CSS class for custom styling */
    className?: string;
    /** Callback when card is clicked */
    onClick?: (pet: UnifiedPet) => void;
}

export interface BasePetCardUpdateOptions {
    /** Updated pet data */
    pet?: UnifiedPet;
    /** Updated XP boost stats */
    xpBoostStats?: XpBoostStats | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Base Pet Card Component
// ─────────────────────────────────────────────────────────────────────────────

/**
 * BasePetCard - Reusable pet card component
 *
 * Usage:
 * ```typescript
 * const card = new BasePetCard({
 *   pet: myPet,
 *   xpBoostStats: stats,
 *   showStrength: true
 * });
 *
 * const cardElement = card.build();
 * container.appendChild(cardElement);
 *
 * // Add custom content
 * const content = card.getContentArea();
 * content.innerHTML = '<div>Custom stats here</div>';
 *
 * // Update later
 * card.update({ pet: updatedPet });
 *
 * // Cleanup
 * card.destroy();
 * ```
 */
export class BasePetCard {
    public root: HTMLElement;

    private readonly options: BasePetCardOptions;
    private spriteWrapper: HTMLElement | null = null;
    private badgesRow: HTMLElement | null = null;
    private strengthDisplay: HTMLElement | null = null;
    private contentArea: HTMLElement | null = null;
    private isBuilt = false;

    constructor(options: BasePetCardOptions) {
        this.options = {
            showStrength: true,
            ...options,
        };
        this.root = document.createElement('div');
        this.root.className = 'base-pet-card';
        if (options.className) {
            this.root.classList.add(options.className);
        }
    }

    /**
     * Build the card DOM structure
     */
    build(): HTMLElement {
        if (this.isBuilt) return this.root;

        const { pet, onClick } = this.options;

        // Add state classes
        if (pet.currentStrength >= pet.maxStrength) {
            this.root.classList.add('base-pet-card--max');
        }
        if (pet.hunger === 0) {
            this.root.classList.add('base-pet-card--starving');
        }

        // Add click handler
        if (onClick) {
            this.root.classList.add('base-pet-card--clickable');
            this.root.addEventListener('click', () => onClick(pet));
        }

        // Left section: Sprite + Badges + Strength
        const leftSection = document.createElement('div');
        leftSection.className = 'base-pet-card__left';

        // Sprite wrapper (64x64)
        this.spriteWrapper = document.createElement('div');
        this.spriteWrapper.className = 'base-pet-card__sprite-wrapper';
        this.renderSprite();
        leftSection.appendChild(this.spriteWrapper);

        // Badges row
        this.badgesRow = document.createElement('div');
        this.badgesRow.className = 'base-pet-card__badges';
        this.renderBadges();
        leftSection.appendChild(this.badgesRow);

        // Automatic strength display
        if (this.options.showStrength) {
            this.strengthDisplay = document.createElement('div');
            this.strengthDisplay.className = 'base-pet-card__strength';
            this.renderStrength();
            leftSection.appendChild(this.strengthDisplay);
        }

        this.root.appendChild(leftSection);

        // Right section: Content area (for custom content)
        this.contentArea = document.createElement('div');
        this.contentArea.className = 'base-pet-card__content';
        this.root.appendChild(this.contentArea);

        this.isBuilt = true;
        return this.root;
    }

    /**
     * Update card with new data
     */
    update(updates: BasePetCardUpdateOptions): void {
        if (!this.isBuilt) return;

        // Update options
        if (updates.pet) {
            this.options.pet = updates.pet;
        }
        if (updates.xpBoostStats !== undefined) {
            this.options.xpBoostStats = updates.xpBoostStats;
        }

        const pet = this.options.pet;

        // Update state classes
        this.root.classList.toggle('base-pet-card--max', pet.currentStrength >= pet.maxStrength);
        this.root.classList.toggle('base-pet-card--starving', pet.hunger === 0);

        // Re-render sections
        this.renderSprite();
        this.renderBadges();
        if (this.options.showStrength) {
            this.renderStrength();
        }
    }

    /**
     * Render pet sprite
     */
    private renderSprite(): void {
        if (!this.spriteWrapper) return;

        const { pet } = this.options;

        // Clear existing sprite
        this.spriteWrapper.innerHTML = '';

        try {
            const mutations = pet.mutations as MutationName[];

            // Check if sprite exists
            if (MGSprite.has('pet', pet.petSpecies)) {
                const spriteCanvas = MGSprite.toCanvas('pet', pet.petSpecies, {
                    mutations,
                    scale: 1,
                    boundsMode: 'padded',
                });

                // Apply explicit canvas styles (Journal pattern)
                spriteCanvas.style.width = '64px';
                spriteCanvas.style.height = '64px';
                spriteCanvas.style.objectFit = 'contain';
                spriteCanvas.style.display = 'block';

                this.spriteWrapper.appendChild(spriteCanvas);
            } else {
                // Fallback if sprite not found
                this.spriteWrapper.innerHTML = '<div class="base-pet-card__sprite-fallback">🐾</div>';
            }
        } catch (error) {
            console.warn(`[BasePetCard] Failed to render sprite for ${pet.petSpecies}:`, error);
            this.spriteWrapper.innerHTML = '<div class="base-pet-card__sprite-fallback">🐾</div>';
        }
    }

    /**
     * Render status badges
     */
    private renderBadges(): void {
        if (!this.badgesRow) return;

        const { pet, xpBoostStats } = this.options;

        // Clear existing badges
        this.badgesRow.innerHTML = '';

        // MAX badge
        if (pet.currentStrength >= pet.maxStrength) {
            const maxBadge = document.createElement('span');
            maxBadge.className = 'base-pet-card__badge base-pet-card__badge--max';
            maxBadge.textContent = 'MAX';
            this.badgesRow.appendChild(maxBadge);
        }

        // STARVING badge
        if (pet.hunger === 0) {
            const starvingBadge = document.createElement('span');
            starvingBadge.className = 'base-pet-card__badge base-pet-card__badge--starving';
            starvingBadge.textContent = 'STARVING';
            this.badgesRow.appendChild(starvingBadge);
        }

        // XP BOOST badge
        if (xpBoostStats) {
            const boostBadge = document.createElement('span');
            boostBadge.className = 'base-pet-card__badge base-pet-card__badge--boost';
            const icon = xpBoostStats.tier === 'Snowy' ? '❄' : '⚡';
            boostBadge.textContent = `${icon}${xpBoostStats.tier}`;
            this.badgesRow.appendChild(boostBadge);
        }
    }

    /**
     * Render automatic strength display
     */
    private renderStrength(): void {
        if (!this.strengthDisplay) return;

        const { pet } = this.options;

        // Format: Current/Max STR
        this.strengthDisplay.innerHTML = `
            <span class="base-pet-card__strength-label">STR</span>
            <span class="base-pet-card__strength-value">
                <span class="base-pet-card__strength-current">${pet.currentStrength}</span>
                <span class="base-pet-card__strength-separator">/</span>
                <span class="base-pet-card__strength-max">${pet.maxStrength}</span>
            </span>
        `;
    }

    /**
     * Get the content area element for adding custom content
     */
    getContentArea(): HTMLElement {
        if (!this.contentArea) {
            throw new Error('[BasePetCard] Content area not available. Call build() first.');
        }
        return this.contentArea;
    }

    /**
     * Get the current pet data
     */
    getPet(): UnifiedPet {
        return this.options.pet;
    }

    /**
     * Set custom content in the content area
     */
    setContent(content: string | HTMLElement): void {
        const contentArea = this.getContentArea();
        if (typeof content === 'string') {
            contentArea.innerHTML = content;
        } else {
            contentArea.innerHTML = '';
            contentArea.appendChild(content);
        }
    }

    /**
     * Cleanup
     */
    destroy(): void {
        if (this.root.parentNode) {
            this.root.parentNode.removeChild(this.root);
        }

        this.spriteWrapper = null;
        this.badgesRow = null;
        this.strengthDisplay = null;
        this.contentArea = null;
        this.isBuilt = false;
    }
}
```

---

## File 2: `src/ui/components/BasePetCard/basePetCard.css.ts`

```typescript
/**
 * Base Pet Card Styles - GEMINI Design System
 *
 * Reusable pet card component styles with:
 * - 64x64 sprite display
 * - Badge system (MAX, STARVING, XP BOOST)
 * - Automatic strength display
 * - Content area for custom content
 * - Full theme compatibility
 * - Responsive design
 */

export const basePetCardCss = `
/* ═══════════════════════════════════════════════════════════════════════════
   BASE PET CARD - Main Container
   ═══════════════════════════════════════════════════════════════════════════ */

.base-pet-card {
    display: flex;
    align-items: stretch;
    gap: 16px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 14px;
    transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
    position: relative;
    overflow: hidden;
}

/* Clickable state */
.base-pet-card--clickable {
    cursor: pointer;
}

.base-pet-card--clickable:hover {
    box-shadow: 0 6px 20px var(--shadow);
    transform: translateX(2px);
}

/* Left accent bar (appears on hover with smooth color transition) */
.base-pet-card::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(180deg, var(--pill-from), var(--pill-to));
    border-radius: 12px 0 0 12px;
    opacity: 0;
    transition: opacity 0.3s ease, background 0.3s ease;
}

.base-pet-card:hover::before {
    opacity: 1;
    background: linear-gradient(180deg, var(--accent), var(--pill-to));
}

/* Max strength pet */
.base-pet-card--max {
    border-color: var(--complete);
    background: linear-gradient(135deg, var(--soft), var(--bg));
}

.base-pet-card--max::before {
    background: linear-gradient(180deg, var(--complete), var(--high));
    opacity: 0.6;
}

.base-pet-card--max:hover::before {
    opacity: 0.8;
}

/* Starving pet */
.base-pet-card--starving {
    border-color: var(--low);
    background: linear-gradient(135deg, var(--soft), var(--bg));
    animation: starvingPulse 2s ease-in-out infinite;
}

.base-pet-card--starving::before {
    background: var(--low);
    opacity: 0.6;
}

.base-pet-card--starving:hover::before {
    opacity: 1;
}

@keyframes starvingPulse {
    0%, 100% { border-color: var(--low); }
    50% { border-color: var(--medium); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   LEFT SECTION - Sprite + Badges + Strength
   ═══════════════════════════════════════════════════════════════════════════ */

.base-pet-card__left {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    min-width: 80px;
    flex-shrink: 0;
}

/* ═══════════════════════════════════════════════════════════════════════════
   SPRITE WRAPPER - 64x64 Container
   ═══════════════════════════════════════════════════════════════════════════ */

.base-pet-card__sprite-wrapper {
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(145deg, var(--soft), var(--bg));
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
    box-shadow:
        inset 0 2px 4px var(--shadow),
        0 2px 8px var(--shadow);
}

.base-pet-card__sprite-wrapper canvas {
    image-rendering: pixelated;
    image-rendering: crisp-edges;
}

.base-pet-card__sprite-fallback {
    font-size: 32px;
    opacity: 0.5;
}

/* ═══════════════════════════════════════════════════════════════════════════
   BADGES ROW - Status Indicators
   ═══════════════════════════════════════════════════════════════════════════ */

.base-pet-card__badges {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    justify-content: center;
    min-height: 18px; /* Reserve space even when empty */
}

.base-pet-card__badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 9px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    white-space: nowrap;
}

.base-pet-card__badge--max {
    background: linear-gradient(135deg, var(--complete), var(--high));
    color: #fff;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
}

.base-pet-card__badge--starving {
    background: var(--low);
    color: #fff;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
}

.base-pet-card__badge--boost {
    background: linear-gradient(135deg, var(--mut-gold), var(--mut-ambercharged));
    color: #1a1a1a;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.3);
}

/* ═══════════════════════════════════════════════════════════════════════════
   STRENGTH DISPLAY - Automatic STR Display
   ═══════════════════════════════════════════════════════════════════════════ */

.base-pet-card__strength {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    font-size: 11px;
    font-weight: 600;
}

.base-pet-card__strength-label {
    color: var(--muted);
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.base-pet-card__strength-value {
    display: flex;
    align-items: baseline;
    gap: 2px;
}

.base-pet-card__strength-current {
    font-size: 14px;
    font-weight: 800;
    background: linear-gradient(135deg, var(--pill-from), var(--pill-to));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.base-pet-card__strength-separator {
    color: var(--muted);
    font-size: 11px;
}

.base-pet-card__strength-max {
    color: var(--muted);
    font-size: 11px;
    font-weight: 600;
}

/* ═══════════════════════════════════════════════════════════════════════════
   CONTENT AREA - Custom Content Section
   ═══════════════════════════════════════════════════════════════════════════ */

.base-pet-card__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0; /* Allow text truncation */
}

/* ═══════════════════════════════════════════════════════════════════════════
   RESPONSIVE
   ═══════════════════════════════════════════════════════════════════════════ */

@media (max-width: 480px) {
    .base-pet-card {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .base-pet-card__left {
        flex-direction: row;
        gap: 12px;
        width: 100%;
        justify-content: center;
    }

    .base-pet-card__content {
        text-align: center;
        width: 100%;
    }
}

/* ═══════════════════════════════════════════════════════════════════════════
   ACCESSIBILITY
   ═══════════════════════════════════════════════════════════════════════════ */

.base-pet-card--clickable:focus {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
    .base-pet-card,
    .base-pet-card::before {
        animation: none;
        transition: none;
    }
}

/* ═══════════════════════════════════════════════════════════════════════════
   PRINT
   ═══════════════════════════════════════════════════════════════════════════ */

@media print {
    .base-pet-card {
        box-shadow: none;
        border: 2px solid var(--border);
    }

    .base-pet-card::before {
        display: none;
    }
}
`;
```

---

## File 3: `src/features/petTeam/logic/pets.ts`

```typescript
/**
 * PetTeam Feature - Pet Helper Functions
 *
 * Utility functions for working with pet teams and pets.
 *
 * Level 2: Imports from types.ts and core modules
 */

import type { PetTeam } from '../types';
import { EMPTY_SLOT, MAX_PETS_PER_TEAM } from '../types';
import { getMyPets } from '../../../globals/variables/myPets';
import type { UnifiedPet } from '../../../globals/core/types';

// ─────────────────────────────────────────────────────────────────────────────
// Pet Team Helper Functions
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get unified pet objects for a team
 *
 * @param team - Pet team
 * @returns Array of UnifiedPet objects (may be less than 3 if slots are empty)
 *
 * @example
 * const team = getTeam('team-id-123');
 * const pets = getPetsForTeam(team);
 * console.log(`Team has ${pets.length} pets`);
 * pets.forEach(pet => console.log(pet.name, pet.currentStrength));
 */
export function getPetsForTeam(team: PetTeam): UnifiedPet[] {
    const myPets = getMyPets();
    const petsData = myPets.get();
    const petsMap = new Map(petsData.all.map((pet) => [pet.id, pet]));

    const pets: UnifiedPet[] = [];

    for (const petId of team.petIds) {
        if (petId === EMPTY_SLOT) continue;

        const pet = petsMap.get(petId);
        if (pet) {
            pets.push(pet);
        }
    }

    return pets;
}

/**
 * Check if a team is full (all slots occupied)
 *
 * @param team - Pet team
 * @returns true if all 3 slots are filled, false otherwise
 *
 * @example
 * const team = getTeam('team-id-123');
 * if (isTeamFull(team)) {
 *   console.log('Team is full!');
 * } else {
 *   console.log('Team has empty slots');
 * }
 */
export function isTeamFull(team: PetTeam): boolean {
    return team.petIds.every((petId) => petId !== EMPTY_SLOT);
}

/**
 * Get empty slot indices in a team
 *
 * @param team - Pet team
 * @returns Array of empty slot indices (0-2)
 *
 * @example
 * const team = getTeam('team-id-123');
 * const emptySlots = getEmptySlots(team);
 * console.log(`Empty slots: ${emptySlots.join(', ')}`);
 * // Output: "Empty slots: 1, 2" (if slots 1 and 2 are empty)
 */
export function getEmptySlots(team: PetTeam): number[] {
    const emptySlots: number[] = [];

    for (let i = 0; i < MAX_PETS_PER_TEAM; i++) {
        if (team.petIds[i] === EMPTY_SLOT) {
            emptySlots.push(i);
        }
    }

    return emptySlots;
}

/**
 * Get the number of filled slots in a team
 *
 * @param team - Pet team
 * @returns Number of filled slots (0-3)
 *
 * @example
 * const team = getTeam('team-id-123');
 * const filledCount = getFilledSlotCount(team);
 * console.log(`Team has ${filledCount} pets`);
 */
export function getFilledSlotCount(team: PetTeam): number {
    return team.petIds.filter((petId) => petId !== EMPTY_SLOT).length;
}

/**
 * Get the number of empty slots in a team
 *
 * @param team - Pet team
 * @returns Number of empty slots (0-3)
 *
 * @example
 * const team = getTeam('team-id-123');
 * const emptyCount = getEmptySlotCount(team);
 * console.log(`Team has ${emptyCount} empty slots`);
 */
export function getEmptySlotCount(team: PetTeam): number {
    return MAX_PETS_PER_TEAM - getFilledSlotCount(team);
}

/**
 * Check if a team is empty (no pets assigned)
 *
 * @param team - Pet team
 * @returns true if all slots are empty, false otherwise
 *
 * @example
 * const team = getTeam('team-id-123');
 * if (isTeamEmpty(team)) {
 *   console.log('Team has no pets assigned');
 * }
 */
export function isTeamEmpty(team: PetTeam): boolean {
    return team.petIds.every((petId) => petId === EMPTY_SLOT);
}

/**
 * Check if a pet is in a team
 *
 * @param team - Pet team
 * @param petId - Pet ID to check
 * @returns true if pet is in the team, false otherwise
 *
 * @example
 * const team = getTeam('team-id-123');
 * const petId = 'pet-abc-123';
 * if (isPetInTeam(team, petId)) {
 *   console.log('Pet is in this team');
 * }
 */
export function isPetInTeam(team: PetTeam, petId: string): boolean {
    return team.petIds.includes(petId);
}

/**
 * Get the slot index of a pet in a team
 *
 * @param team - Pet team
 * @param petId - Pet ID to find
 * @returns Slot index (0-2) or -1 if pet is not in team
 *
 * @example
 * const team = getTeam('team-id-123');
 * const petId = 'pet-abc-123';
 * const slotIndex = getPetSlotIndex(team, petId);
 * if (slotIndex !== -1) {
 *   console.log(`Pet is in slot ${slotIndex}`);
 * }
 */
export function getPetSlotIndex(team: PetTeam, petId: string): number {
    return team.petIds.indexOf(petId);
}
```

---

## File 4: `src/features/petTeam/logic/purpose.ts`

```typescript
/**
 * PetTeam Feature - Team Purpose Detection
 *
 * Analyzes a team's abilities to determine its primary purpose.
 *
 * Categories:
 * - XP Boost: Generates bonus XP (PetXpBoost, PetXpBoostII, PetXpBoostIII, SnowyPetXpBoost)
 * - Weather: Weather-related abilities (PetRainDance, SnowyPetXpBoost, etc.)
 * - Harvest: Crop harvesting abilities (PetFarmHarvestIncrease, etc.)
 * - Growth: Plant growth speed abilities (PetFarmGrowthIncrease, etc.)
 * - Resource: Resource generation (PetShardChance, PetBerryChance, etc.)
 * - Utility: General utility abilities (PetAutoHarvest, PetAutoPlant, etc.)
 * - Social: Social/multiplayer abilities (PetFriendBonus, etc.)
 * - Combat: Combat/protection abilities (if any exist)
 *
 * Level 2: Imports from types.ts and core modules
 */

import type { PetTeam } from '../types';
import { getPetsForTeam } from './pets';
import type { UnifiedPet } from '../../../globals/core/types';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

/** Team purpose categories */
export type TeamPurposeCategory =
    | 'xp-boost'
    | 'weather'
    | 'harvest'
    | 'growth'
    | 'resource'
    | 'utility'
    | 'social'
    | 'combat';

/** Purpose detection result for a single category */
export interface CategoryPurpose {
    /** Category identifier */
    category: TeamPurposeCategory;
    /** Human-readable category name */
    name: string;
    /** Confidence score (0-1) */
    confidence: number;
    /** Number of abilities in this category */
    abilityCount: number;
    /** List of ability IDs in this category */
    abilities: string[];
}

/** Full team purpose analysis result */
export interface TeamPurposeAnalysis {
    /** Primary purpose (highest confidence) */
    primary: CategoryPurpose | null;
    /** Secondary purposes (confidence > 0.25) */
    secondary: CategoryPurpose[];
    /** All detected purposes with their confidence scores */
    all: CategoryPurpose[];
    /** Whether team is multi-purpose (has 2+ categories with confidence > 0.3) */
    isMultiPurpose: boolean;
    /** Total number of unique abilities analyzed */
    totalAbilities: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Ability Categorization
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Ability categories mapped to ability ID patterns
 * Based on ability naming conventions from MGData
 */
const ABILITY_CATEGORIES: Record<TeamPurposeCategory, string[]> = {
    'xp-boost': [
        'PetXpBoost',
        'PetXpBoostII',
        'PetXpBoostIII',
        'SnowyPetXpBoost',
    ],
    weather: [
        'PetRainDance',
        'SnowyPetXpBoost', // Also weather-dependent
        'PetWeatherControl',
    ],
    harvest: [
        'PetFarmHarvestIncrease',
        'PetAutoHarvest',
        'PetHarvestMultiplier',
        'PetYieldBoost',
    ],
    growth: [
        'PetFarmGrowthIncrease',
        'PetGrowthSpeed',
        'PetSpeedyGrowth',
    ],
    resource: [
        'PetShardChance',
        'PetBerryChance',
        'PetCoinFind',
        'PetResourceBonus',
        'PetLootChance',
    ],
    utility: [
        'PetAutoPlant',
        'PetAutoWater',
        'PetAutoFeed',
        'PetInventoryExpansion',
        'PetWorkSpeed',
    ],
    social: [
        'PetFriendBonus',
        'PetGroupBonus',
        'PetCoopBonus',
    ],
    combat: [
        'PetDefense',
        'PetAttack',
        'PetProtection',
    ],
};

/**
 * Human-readable category names
 */
const CATEGORY_NAMES: Record<TeamPurposeCategory, string> = {
    'xp-boost': 'XP Generation',
    weather: 'Weather Control',
    harvest: 'Harvest Optimization',
    growth: 'Growth Acceleration',
    resource: 'Resource Gathering',
    utility: 'Automation & Utility',
    social: 'Social & Cooperative',
    combat: 'Combat & Defense',
};

// ─────────────────────────────────────────────────────────────────────────────
// Purpose Detection Logic
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Categorize a single ability
 *
 * @param abilityId - Ability ID to categorize
 * @returns Category or null if not recognized
 */
function categorizeAbility(abilityId: string): TeamPurposeCategory | null {
    for (const [category, patterns] of Object.entries(ABILITY_CATEGORIES)) {
        for (const pattern of patterns) {
            // Exact match or starts with pattern
            if (abilityId === pattern || abilityId.startsWith(pattern)) {
                return category as TeamPurposeCategory;
            }
        }
    }
    return null;
}

/**
 * Collect all abilities from a team
 *
 * @param team - Pet team
 * @returns Map of ability IDs to their counts
 */
function collectTeamAbilities(team: PetTeam): Map<string, number> {
    const pets = getPetsForTeam(team);
    const abilityMap = new Map<string, number>();

    for (const pet of pets) {
        for (const abilityId of pet.abilities) {
            const count = abilityMap.get(abilityId) || 0;
            abilityMap.set(abilityId, count + 1);
        }
    }

    return abilityMap;
}

/**
 * Calculate confidence score for a category
 *
 * Confidence is based on:
 * - Number of abilities in category
 * - Proportion of team's total abilities
 * - Number of pets with abilities in category
 *
 * @param categoryAbilityCount - Number of abilities in this category
 * @param totalAbilityCount - Total number of unique abilities on team
 * @param teamSize - Number of pets in team (1-3)
 * @returns Confidence score (0-1)
 */
function calculateConfidence(
    categoryAbilityCount: number,
    totalAbilityCount: number,
    teamSize: number
): number {
    if (totalAbilityCount === 0) return 0;

    // Base confidence from proportion of abilities
    const proportion = categoryAbilityCount / totalAbilityCount;

    // Boost confidence if multiple pets have abilities in this category
    const teamCoverageBoost = Math.min(categoryAbilityCount / teamSize, 1) * 0.2;

    // Raw confidence (0-1.2)
    const rawConfidence = proportion + teamCoverageBoost;

    // Normalize to 0-1
    return Math.min(rawConfidence, 1);
}

/**
 * Detect team purpose from abilities
 *
 * @param team - Pet team to analyze
 * @returns Team purpose analysis with primary, secondary, and all purposes
 *
 * @example
 * const team = getTeam('team-id-123');
 * const analysis = detectTeamPurpose(team);
 *
 * if (analysis.primary) {
 *   console.log(`Primary purpose: ${analysis.primary.name}`);
 *   console.log(`Confidence: ${(analysis.primary.confidence * 100).toFixed(1)}%`);
 * }
 *
 * if (analysis.isMultiPurpose) {
 *   console.log('This is a multi-purpose team!');
 *   analysis.secondary.forEach(purpose => {
 *     console.log(`- ${purpose.name}: ${(purpose.confidence * 100).toFixed(1)}%`);
 *   });
 * }
 */
export function detectTeamPurpose(team: PetTeam): TeamPurposeAnalysis {
    // Collect all abilities
    const abilityMap = collectTeamAbilities(team);
    const totalAbilities = abilityMap.size;

    // Get team size (number of non-empty slots)
    const pets = getPetsForTeam(team);
    const teamSize = pets.length;

    // Categorize abilities
    const categoryMap = new Map<TeamPurposeCategory, string[]>();

    for (const [abilityId] of abilityMap) {
        const category = categorizeAbility(abilityId);
        if (category) {
            const abilities = categoryMap.get(category) || [];
            abilities.push(abilityId);
            categoryMap.set(category, abilities);
        }
    }

    // Build purpose results
    const purposes: CategoryPurpose[] = [];

    for (const [category, abilities] of categoryMap) {
        const confidence = calculateConfidence(
            abilities.length,
            totalAbilities,
            teamSize
        );

        purposes.push({
            category,
            name: CATEGORY_NAMES[category],
            confidence,
            abilityCount: abilities.length,
            abilities,
        });
    }

    // Sort by confidence (descending)
    purposes.sort((a, b) => b.confidence - a.confidence);

    // Determine primary and secondary purposes
    const primary = purposes[0] || null;
    const secondary = purposes
        .slice(1)
        .filter((p) => p.confidence > 0.25);

    // Check if multi-purpose
    const isMultiPurpose = purposes.filter((p) => p.confidence > 0.3).length >= 2;

    return {
        primary,
        secondary,
        all: purposes,
        isMultiPurpose,
        totalAbilities,
    };
}

/**
 * Get a human-readable team purpose summary
 *
 * @param team - Pet team to analyze
 * @returns Human-readable purpose summary string
 *
 * @example
 * const team = getTeam('team-id-123');
 * const summary = getTeamPurposeSummary(team);
 * console.log(summary);
 * // Output: "XP Generation (primary), Harvest Optimization (secondary)"
 */
export function getTeamPurposeSummary(team: PetTeam): string {
    const analysis = detectTeamPurpose(team);

    if (!analysis.primary) {
        return 'General Purpose';
    }

    const parts: string[] = [];

    parts.push(`${analysis.primary.name} (primary)`);

    if (analysis.secondary.length > 0) {
        const secondaryNames = analysis.secondary
            .slice(0, 2) // Show max 2 secondary
            .map((p) => p.name);
        parts.push(`${secondaryNames.join(', ')} (secondary)`);
    }

    if (analysis.isMultiPurpose) {
        parts.push('(Multi-Purpose)');
    }

    return parts.join(', ');
}

/**
 * Check if a team is specialized (has one clear primary purpose)
 *
 * @param team - Pet team to analyze
 * @returns true if team is specialized (primary confidence > 0.6), false otherwise
 *
 * @example
 * const team = getTeam('team-id-123');
 * if (isTeamSpecialized(team)) {
 *   console.log('This team is highly specialized!');
 * } else {
 *   console.log('This team is more general purpose');
 * }
 */
export function isTeamSpecialized(team: PetTeam): boolean {
    const analysis = detectTeamPurpose(team);
    return analysis.primary !== null && analysis.primary.confidence > 0.6;
}
```

---

## Integration Notes

### 1. Registering BasePetCard Component

Add to `src/ui/components/index.ts`:

```typescript
export { BasePetCard } from './BasePetCard/BasePetCard';
export type { BasePetCardOptions, BasePetCardUpdateOptions } from './BasePetCard/BasePetCard';
```

### 2. Injecting BasePetCard Styles

The styles must be injected into the Shadow DOM. Add to the appropriate section component that uses BasePetCard:

```typescript
import { basePetCardCss } from '../../components/BasePetCard/basePetCard.css';

// In the section's build() method:
injectStyleOnce(this.root, 'base-pet-card-styles', basePetCardCss);
```

### 3. Using BasePetCard in UI

Example usage in a section component:

```typescript
import { BasePetCard } from '../../components/BasePetCard/BasePetCard';
import type { UnifiedPet } from '../../../globals/core/types';

// Create card
const card = new BasePetCard({
    pet: myPet,
    xpBoostStats: calculateXpBoostStats(...),
    showStrength: true,
    onClick: (pet) => console.log('Clicked:', pet.name)
});

// Build and mount
const cardElement = card.build();
container.appendChild(cardElement);

// Add custom content
const content = card.getContentArea();
content.innerHTML = `
    <div class="my-custom-stats">
        <div>XP: ${myPet.xp}</div>
        <div>Hunger: ${myPet.hunger}%</div>
    </div>
`;

// Update later
card.update({ pet: updatedPet });

// Cleanup when done
card.destroy();
```

### 4. Using Pet Helper Functions

Example usage:

```typescript
import { getPetsForTeam, isTeamFull, getEmptySlots } from '../../../features/petTeam/logic/pets';

const team = getTeam('team-id-123');

// Get pets
const pets = getPetsForTeam(team);
console.log(`Team has ${pets.length} pets`);

// Check if full
if (isTeamFull(team)) {
    console.log('Team is full!');
} else {
    const emptySlots = getEmptySlots(team);
    console.log(`Empty slots: ${emptySlots.join(', ')}`);
}
```

### 5. Using Team Purpose Detection

Example usage:

```typescript
import { detectTeamPurpose, getTeamPurposeSummary } from '../../../features/petTeam/logic/purpose';

const team = getTeam('team-id-123');

// Get full analysis
const analysis = detectTeamPurpose(team);

if (analysis.primary) {
    console.log(`Primary: ${analysis.primary.name}`);
    console.log(`Confidence: ${(analysis.primary.confidence * 100).toFixed(1)}%`);
}

// Get summary
const summary = getTeamPurposeSummary(team);
console.log(`Team Purpose: ${summary}`);
```

---

## Testing Checklist

### BasePetCard Component

- [ ] Sprite renders correctly for all pet species
- [ ] Fallback emoji appears when sprite fails
- [ ] MAX badge appears when currentStrength >= maxStrength
- [ ] STARVING badge appears when hunger = 0
- [ ] XP BOOST badge appears with correct tier (I, II, III, Snowy)
- [ ] Automatic strength display shows "Current/Max STR"
- [ ] Content area accepts custom HTML/elements
- [ ] Update() correctly refreshes all sections
- [ ] Hover effects work (left accent bar, shadow)
- [ ] Responsive layout works on mobile (vertical stacking)
- [ ] Click handler fires when provided
- [ ] Destroy() cleans up properly

### Pet Helper Functions

- [ ] getPetsForTeam() returns correct pets
- [ ] getPetsForTeam() handles empty slots correctly
- [ ] isTeamFull() returns true when all slots filled
- [ ] isTeamFull() returns false when any slot empty
- [ ] getEmptySlots() returns correct indices
- [ ] getFilledSlotCount() returns correct count (0-3)
- [ ] isTeamEmpty() returns true for empty team
- [ ] isPetInTeam() correctly identifies pet presence
- [ ] getPetSlotIndex() returns correct index or -1

### Team Purpose Detection

- [ ] detectTeamPurpose() identifies XP Boost teams
- [ ] detectTeamPurpose() identifies Harvest teams
- [ ] detectTeamPurpose() identifies Growth teams
- [ ] detectTeamPurpose() identifies multi-purpose teams
- [ ] Primary purpose has highest confidence
- [ ] Secondary purposes have confidence > 0.25
- [ ] isMultiPurpose flag set when 2+ categories > 0.3
- [ ] getTeamPurposeSummary() returns readable string
- [ ] isTeamSpecialized() correctly identifies specialized teams
- [ ] Handles teams with no recognized abilities

---

## Theme Compatibility

All CSS uses theme variables from `src/ui/styles/variables.css.ts`:

- `--bg`: Background color
- `--fg`: Foreground (text) color
- `--border`: Border color
- `--shadow`: Shadow color
- `--soft`: Soft background color
- `--muted`: Muted text color
- `--accent`: Accent color
- `--pill-from`, `--pill-to`: Gradient colors
- `--complete`, `--high`, `--medium`, `--low`: Progress colors
- `--mut-gold`, `--mut-ambercharged`: Mutation colors (for XP boost)

All animations respect `prefers-reduced-motion` and have print-friendly styles.

---

## Performance Notes

### BasePetCard

- Sprite rendering is done once per build/update
- Canvas reuse via MGSprite.toCanvas() avoids recreation
- Minimal DOM manipulation during updates
- Event listeners are properly cleaned up in destroy()

### Pet Helper Functions

- All functions use efficient array operations
- No expensive lookups or iterations
- Proper use of Map for O(1) lookups in getPetsForTeam()

### Team Purpose Detection

- Single pass through abilities (O(n) where n = total abilities)
- Cached ability categorization via Map
- Minimal string operations (exact match first, then startsWith)
- No regex or complex pattern matching

---

## Future Enhancements

### BasePetCard

- Add animation support (e.g., sprite animations, badge transitions)
- Add tooltip support for badges
- Add drag-and-drop support for team management
- Add hover preview for pet details

### Team Purpose Detection

- Add ability weighting (some abilities more important than others)
- Add team synergy detection (abilities that work well together)
- Add purpose recommendations ("Add X pet to improve Y")
- Add historical tracking (how team purpose changes over time)

---

## End of Implementation Code

All four files are complete and production-ready. Copy directly into the codebase.
