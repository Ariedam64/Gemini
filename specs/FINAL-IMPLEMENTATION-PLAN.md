# FINAL IMPLEMENTATION PLAN - XP Tracker Refinements & Pet Feature System

**Status:** ✅ Ready for Implementation
**Priority:** High
**Compliance:** All `.claude/rules/` applied
**Compatibility:** Mobile + Desktop, All 8 Themes

---

## 📚 Documentation Structure

This plan consolidates all requirements from:
1. `XP-Tracker-Refinement-and-Extensibility.md` - Full spec with user interview
2. `All-Pet-Abilities-Complete-List.md` - 53 abilities categorized (✅ COMPLETE)
3. `Template-Layout-Refinements.md` - Layout optimization details
4. User notes and feedback across all documents

---

## 🎯 What We're Building

### Phase 1: XP Tracker Refinements + Base Template System
**Scope:** Fix all issues, optimize layout, create reusable template
**Time Est:** 6-8 hours
**Blocks:** None - can start immediately

### Phase 2: Intelligent Feature Panel System
**Scope:** Team purpose detection, modular features, smart display
**Time Est:** 8-12 hours
**Blocks:** Awaits Phase 1 completion + visual mockup approval

---

## ✅ Phase 1: Implementation Details

### Part A: XP Tracker UI Refinements

**Files:** `src/ui/sections/Pets/parts/TeamXpPanel.ts`, `teamXpPanel.css.ts`

#### 1. Rename Header Title
**Current:** "Team XP Tracker"
**New:** "XP Tracker"

**File:** `TeamXpPanel.ts` line ~122
```typescript
// BEFORE
<span>Team XP Tracker</span>

// AFTER
<span>XP Tracker</span>
```

#### 2. Fix Food Formatting
**Current:** "🍖:1"
**New:** "🍖 x1"

**File:** `TeamXpPanel.ts` line ~322
```typescript
// BEFORE
<span class="xp-progress-row__feeds">(🍖: ${feeds})</span>

// AFTER
<span class="xp-progress-row__feeds">(🍖 x${feeds})</span>
```

#### 3. Remove Card Dividers
**Current:** Horizontal lines between stat rows
**New:** No dividers (cleaner look)

**File:** `teamXpPanel.css.ts` line ~302
```css
/* REMOVE THIS */
.xp-stats-table__row {
    border-bottom: 1px solid var(--border);
}

.xp-stats-table__row:last-child {
    border-bottom: none;
}
```

#### 4. Fix Footer Colors (Theme-Compatible)
**Current:** Hardcoded mutation gold colors
**New:** Theme-semantic CSS variables

**File:** `teamXpPanel.css.ts` lines 481-528
```css
/* BEFORE */
.xp-panel__footer {
    background: linear-gradient(90deg, var(--soft), var(--muted));
}

.xp-panel__footer-icon {
    color: var(--mut-gold);
}

.xp-panel__footer-title {
    color: var(--mut-ambercharged);
}

/* AFTER */
.xp-panel__footer {
    background: linear-gradient(90deg, var(--soft), var(--bg));
    border-top: 1px solid var(--border);
}

.xp-panel__footer-icon {
    color: var(--accent);
    animation: boostPulse 1.5s ease-in-out infinite;
}

.xp-panel__footer-title {
    color: var(--fg);
    font-weight: 800;
}

.xp-panel__footer-detail {
    color: var(--pill-to);
    font-weight: 600;
}

.xp-panel__footer-names {
    color: var(--muted);
}
```

#### 5. Fix Header Colors & Simplify Display
**Current:** Shows base + bonus calculation, uses mutation colors
**New:** Show final total only, theme-semantic colors

**File:** `TeamXpPanel.ts` lines 114-135
```typescript
// BEFORE (verbose)
<div class="xp-panel__header-rate">
    <span class="xp-panel__rate-label">XP Rate:</span>
    ${hasBoost ? `
        <span class="xp-panel__rate-base">${summary.baseXpPerHour.toLocaleString()}</span>
        <span class="xp-panel__rate-plus">+</span>
        <span class="xp-panel__rate-bonus">${summary.bonusXpPerHour.toLocaleString()}</span>
        <span class="xp-panel__rate-equals">=</span>
    ` : ''}
    <span class="xp-panel__rate-total">${summary.totalXpPerHour.toLocaleString()} XP/hr</span>
</div>

// AFTER (simplified)
<div class="xp-panel__header-rate">
    <span class="xp-panel__rate-label">XP Rate:</span>
    <span class="xp-panel__rate-total">${summary.totalXpPerHour.toLocaleString()} XP/hr</span>
    ${hasBoost ? `<span class="xp-panel__rate-boost-indicator">⚡</span>` : ''}
</div>
```

**File:** `teamXpPanel.css.ts` lines 47-108
```css
/* BEFORE */
.xp-panel__header {
    background: linear-gradient(90deg, var(--soft), var(--muted));
}

.xp-panel__header-title {
    color: var(--pill-to);
}

.xp-panel__rate-total {
    background: linear-gradient(135deg, var(--pill-from), var(--pill-to));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

/* AFTER */
.xp-panel__header {
    background: linear-gradient(90deg, var(--bg), var(--soft));
    border-bottom: 1px solid var(--border);
}

.xp-panel__header-title {
    color: var(--fg);
    font-weight: 800;
}

.xp-panel__header-icon {
    color: var(--accent);
}

.xp-panel__rate-total {
    color: var(--fg);
    font-weight: 900;
    font-size: 16px;
}

.xp-panel__rate-boost-indicator {
    color: var(--accent);
    font-size: 14px;
    margin-left: 6px;
    animation: boostPulse 1.5s ease-in-out infinite;
}
```

---

### Part B: Layout Optimization (STR Under Sprite)

**Critical User Requirement:** KEEP current layout, don't restructure. Just move STR under sprite.

#### Changes to TeamXpPanel.ts

**1. Remove "STRENGTH" row from stats table** (line ~247-258)
```typescript
// REMOVE THIS ENTIRE ROW
<tr class="xp-stats-table__row">
    <td class="xp-stats-table__label">Strength</td>
    <td class="xp-stats-table__value">
        <div class="xp-strength">
            <span class="xp-strength__current">${pet.currentStrength}</span>
            <span class="xp-strength__separator">/</span>
            <span class="xp-strength__max">${pet.maxStrength}</span>
        </div>
    </td>
</tr>
```

**2. Add STR display under badges** (line ~217, after badgesRow)
```typescript
// After badges row, add:
const strDisplay = document.createElement('div');
strDisplay.className = 'xp-pet-card__str';
if (pet.isMaxStrength) {
    strDisplay.textContent = `STR: ${pet.currentStrength}`;
} else {
    strDisplay.textContent = `STR: ${pet.currentStrength}/${pet.maxStrength}`;
}
spriteSection.appendChild(strDisplay);
```

**3. Update CSS for STR display**
```css
/* Add to teamXpPanel.css.ts after badges styles */
.xp-pet-card__str {
    font-size: 11px;
    font-weight: 700;
    color: var(--muted);
    text-align: center;
    margin-top: 4px;
    letter-spacing: 0.5px;
}
```

**Visual Result:**
```
[Sprite 64x64]
[MAX] [⚡II]
STR: 91/91  ← ADDED HERE

Next STR    2.5h (🍖 x3)
Max STR     12.3h (🍖 x15)
...
```

---

### Part C: Base Template System

**Goal:** Create reusable pet card template that all features can use

**New File:** `src/ui/sections/Pets/parts/BasePetCard.ts`

```typescript
/**
 * Base Pet Card Template
 * Provides: Sprite + Name + STR + Badges + Content Area
 * Used by: XP Tracker, future features (turtle timers, ability trackers, etc.)
 */

import { MGSprite } from '../../../../modules/sprite';

export interface BasePetCardData {
    id: string;
    name: string;
    species: string;
    currentStrength: number;
    maxStrength: number;
    isMaxStrength: boolean;
    isStarving: boolean;
    mutations: string[];
    targetScale: number;
    badges?: string[]; // e.g., ['MAX', '⚡II']
}

export interface BasePetCardOptions {
    showName?: boolean;  // default: true
    showStr?: boolean;   // default: true
    showBadges?: boolean; // default: true
}

export class BasePetCard {
    public root: HTMLElement;
    private options: BasePetCardOptions;

    private spriteWrapper: HTMLElement | null = null;
    private nameElement: HTMLElement | null = null;
    private badgesRow: HTMLElement | null = null;
    private strDisplay: HTMLElement | null = null;
    private contentArea: HTMLElement | null = null;

    constructor(options: BasePetCardOptions = {}) {
        this.options = {
            showName: options.showName ?? true,
            showStr: options.showStr ?? true,
            showBadges: options.showBadges ?? true,
        };

        this.root = document.createElement('div');
        this.root.className = 'base-pet-card';
    }

    build(): HTMLElement {
        // Left: Sprite section
        const spriteSection = document.createElement('div');
        spriteSection.className = 'base-pet-card__sprite';

        // Sprite wrapper
        this.spriteWrapper = document.createElement('div');
        this.spriteWrapper.className = 'base-pet-card__sprite-wrapper';
        spriteSection.appendChild(this.spriteWrapper);

        // Badges
        if (this.options.showBadges) {
            this.badgesRow = document.createElement('div');
            this.badgesRow.className = 'base-pet-card__badges';
            spriteSection.appendChild(this.badgesRow);
        }

        // STR display
        if (this.options.showStr) {
            this.strDisplay = document.createElement('div');
            this.strDisplay.className = 'base-pet-card__str';
            spriteSection.appendChild(this.strDisplay);
        }

        this.root.appendChild(spriteSection);

        // Right: Content section
        const contentSection = document.createElement('div');
        contentSection.className = 'base-pet-card__content';

        // Name (if enabled)
        if (this.options.showName) {
            this.nameElement = document.createElement('div');
            this.nameElement.className = 'base-pet-card__name';
            contentSection.appendChild(this.nameElement);
        }

        // Feature content area
        this.contentArea = document.createElement('div');
        this.contentArea.className = 'base-pet-card__feature-content';
        contentSection.appendChild(this.contentArea);

        this.root.appendChild(contentSection);

        return this.root;
    }

    update(pet: BasePetCardData): void {
        this.updateSprite(pet);
        if (this.options.showName) this.updateName(pet);
        if (this.options.showBadges) this.updateBadges(pet);
        if (this.options.showStr) this.updateStr(pet);
    }

    getContentArea(): HTMLElement {
        if (!this.contentArea) throw new Error('Must call build() first');
        return this.contentArea;
    }

    private updateSprite(pet: BasePetCardData): void {
        if (!this.spriteWrapper) return;

        this.spriteWrapper.innerHTML = '';

        try {
            const mutations = pet.mutations as import('../../../../modules/sprite').MutationName[];

            if (MGSprite.has('pet', pet.species)) {
                const spriteCanvas = MGSprite.toCanvas('pet', pet.species, {
                    mutations,
                    scale: 1,
                    boundsMode: 'padded'
                });

                spriteCanvas.style.width = '64px';
                spriteCanvas.style.height = '64px';
                spriteCanvas.style.objectFit = 'contain';
                spriteCanvas.style.display = 'block';

                this.spriteWrapper.appendChild(spriteCanvas);
            } else {
                this.spriteWrapper.innerHTML = `<div class="base-pet-card__sprite-fallback">🐾</div>`;
            }
        } catch (error) {
            console.warn(`[BasePetCard] Failed to render sprite for ${pet.species}:`, error);
            this.spriteWrapper.innerHTML = `<div class="base-pet-card__sprite-fallback">🐾</div>`;
        }
    }

    private updateName(pet: BasePetCardData): void {
        if (!this.nameElement) return;
        this.nameElement.textContent = pet.name || pet.species;
    }

    private updateBadges(pet: BasePetCardData): void {
        if (!this.badgesRow) return;

        this.badgesRow.innerHTML = '';

        if (pet.isMaxStrength) {
            this.badgesRow.innerHTML += `<span class="base-badge base-badge--max">MAX</span>`;
        }
        if (pet.isStarving) {
            this.badgesRow.innerHTML += `<span class="base-badge base-badge--starving">STARVING</span>`;
        }
        if (pet.badges) {
            for (const badge of pet.badges) {
                this.badgesRow.innerHTML += `<span class="base-badge base-badge--custom">${badge}</span>`;
            }
        }
    }

    private updateStr(pet: BasePetCardData): void {
        if (!this.strDisplay) return;

        if (pet.isMaxStrength) {
            this.strDisplay.textContent = `STR: ${pet.currentStrength}`;
        } else {
            this.strDisplay.textContent = `STR: ${pet.currentStrength}/${pet.maxStrength}`;
        }
    }

    destroy(): void {
        if (this.root.parentNode) {
            this.root.parentNode.removeChild(this.root);
        }
    }
}
```

**New File:** `src/ui/sections/Pets/parts/basePetCard.css.ts`

```typescript
export const basePetCardCss = `
/* Base Pet Card - Reusable Template */
.base-pet-card {
    display: flex;
    align-items: stretch;
    gap: 16px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 14px;
    transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.base-pet-card:hover {
    box-shadow: 0 6px 20px var(--shadow);
}

/* Sprite Section */
.base-pet-card__sprite {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    min-width: 80px;
    flex-shrink: 0;
}

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

/* Badges */
.base-pet-card__badges {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    justify-content: center;
}

.base-badge {
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

.base-badge--max {
    background: linear-gradient(135deg, var(--complete), var(--high));
    color: #fff;
    text-shadow: 0 1px 1px rgba(0,0,0,0.2);
}

.base-badge--starving {
    background: var(--low);
    color: #fff;
    text-shadow: 0 1px 1px rgba(0,0,0,0.2);
}

.base-badge--custom {
    background: linear-gradient(135deg, var(--accent), var(--pill-to));
    color: var(--bg);
    text-shadow: 0 1px 0 rgba(0,0,0,0.1);
}

/* STR Display */
.base-pet-card__str {
    font-size: 11px;
    font-weight: 700;
    color: var(--muted);
    text-align: center;
    margin-top: 4px;
    letter-spacing: 0.5px;
}

/* Content Section */
.base-pet-card__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
}

.base-pet-card__name {
    font-size: 15px;
    font-weight: 800;
    color: var(--fg);
    margin-bottom: 10px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--border);
    letter-spacing: 0.3px;
}

.base-pet-card__feature-content {
    flex: 1;
}

/* Responsive */
@media (max-width: 480px) {
    .base-pet-card {
        flex-direction: column;
        align-items: center;
    }

    .base-pet-card__sprite {
        flex-direction: row;
        gap: 12px;
    }
}
`;
```

---

### Part D: Helper Functions for MGPetTeam

**New File:** `src/features/petTeam/logic/pets.ts`

```typescript
/**
 * Pet Team Helper Functions
 * Provides easy access to pet data for teams
 */

import { Globals } from '../../../globals';
import type { PetTeam } from '../types';
import type { UnifiedPet } from '../../../globals/variables/myPets';
import { EMPTY_SLOT } from '../types';

/**
 * Get full pet data for a team's pet IDs
 * Returns UnifiedPet objects for each non-empty slot
 */
export function getPetsForTeam(team: PetTeam): UnifiedPet[] {
    const myPets = Globals.myPets.get();

    return team.petIds
        .filter(id => id !== EMPTY_SLOT)
        .map(id => myPets.all.find(p => p.id === id))
        .filter(Boolean) as UnifiedPet[];
}

/**
 * Check if team has all slots filled
 */
export function isTeamFull(team: PetTeam): boolean {
    return team.petIds.every(id => id !== EMPTY_SLOT);
}

/**
 * Get empty slot indices for a team
 */
export function getEmptySlots(team: PetTeam): number[] {
    return team.petIds
        .map((id, index) => id === EMPTY_SLOT ? index : -1)
        .filter(index => index !== -1);
}

/**
 * Count filled slots in a team
 */
export function getFilledSlotCount(team: PetTeam): number {
    return team.petIds.filter(id => id !== EMPTY_SLOT).length;
}
```

**Update:** `src/features/petTeam/index.ts`

```typescript
// Add imports
import * as PetLogic from './logic/pets';

// Add to MGPetTeam export
export const MGPetTeam = {
    // ... existing exports

    // Pet Utilities
    getPetsForTeam: PetLogic.getPetsForTeam,
    isTeamFull: PetLogic.isTeamFull,
    getEmptySlots: PetLogic.getEmptySlots,
    getFilledSlotCount: PetLogic.getFilledSlotCount,
} as const;
```

---

### Part E: Gemini Compliance Checklist

**Per `.claude/rules/`:**

✅ **Core Rules** (`core.md`):
- No hardcoded game data (all from MGData)
- Sprites via MGSprite only
- DOM rendering in `src/ui/` only
- State via Store/atoms + Globals
- No side effects on import
- Files < 500 lines
- No `any` types (strict TypeScript)

✅ **UI Rules** (`ui/ui.core.md`, `ui/ui.components.md`, `ui/ui.sections.md`):
- Shadow DOM isolated rendering
- Theme-compatible (CSS variables only)
- Responsive (mobile + desktop)
- Components have Options + public API
- Sections have build() + destroy()
- Proper cleanup

✅ **Features Rules** (`features.md`):
- Toggleable (enabled/disabled)
- No dependencies on other features
- Bootstrap pattern (init/destroy)
- Storage with FEATURE_KEYS prefix

✅ **Modules Rules** (`modules.md`):
- Public API: `MG<Name>` object
- Required methods: `init()`, `isReady()`
- Façade approach (simple usage)

---

### Part F: Theme Compatibility Matrix

**Test Requirements:** All 8 themes must render correctly

| Theme | Header Colors | Footer Colors | Progress Bars | Badges | STR Display |
|-------|--------------|---------------|---------------|--------|-------------|
| Light | ✅ --fg/--accent | ✅ --accent/--pill-to | ✅ --low/--high | ✅ themed | ✅ --muted |
| Dark  | ✅ --fg/--accent | ✅ --accent/--pill-to | ✅ --low/--high | ✅ themed | ✅ --muted |
| Blue  | ✅ adapts | ✅ adapts | ✅ adapts | ✅ adapts | ✅ adapts |
| Purple | ✅ adapts | ✅ adapts | ✅ adapts | ✅ adapts | ✅ adapts |
| Green | ✅ adapts | ✅ adapts | ✅ adapts | ✅ adapts | ✅ adapts |
| Red   | ✅ adapts | ✅ adapts | ✅ adapts | ✅ adapts | ✅ adapts |
| Orange | ✅ adapts | ✅ adapts | ✅ adapts | ✅ adapts | ✅ adapts |
| Pink  | ✅ adapts | ✅ adapts | ✅ adapts | ✅ adapts | ✅ adapts |

**Key:** All colors use CSS variables that adapt to theme automatically.

---

### Part G: Responsive Design Requirements

**Mobile (<768px):**
- Pet cards stack vertically
- Stats table full width
- Touch-friendly buttons (min 44x44px)
- Badges wrap properly

**Desktop (≥768px):**
- Pet cards horizontal layout
- Stats table side-by-side
- Hover effects enabled
- Smooth transitions

**Implementation:** All responsive CSS already in `teamXpPanel.css.ts` @media queries

---

## ✅ Phase 1 Complete Checklist

**UI Refinements:**
- [ ] 1. Rename "Team XP Tracker" → "XP Tracker"
- [ ] 2. Change "🍖:1" → "🍖 x1"
- [ ] 3. Remove card divider lines
- [ ] 4. Fix footer colors (theme-semantic)
- [ ] 5. Fix header colors & simplify

**Layout Optimization:**
- [ ] 6. Remove "STRENGTH" row from stats table
- [ ] 7. Add "STR: X/Y" display under sprite/badges
- [ ] 8. Remove "Progress" row (redundant)

**Base Template:**
- [ ] 9. Create `BasePetCard.ts` component
- [ ] 10. Create `basePetCard.css.ts` styles
- [ ] 11. Export from `src/ui/sections/Pets/parts/index.ts`

**Helper Functions:**
- [ ] 12. Create `src/features/petTeam/logic/pets.ts`
- [ ] 13. Add `getPetsForTeam()` helper
- [ ] 14. Add `isTeamFull()` helper
- [ ] 15. Add `getEmptySlots()` helper
- [ ] 16. Add `getFilledSlotCount()` helper
- [ ] 17. Export from `MGPetTeam` API

**Testing:**
- [ ] 18. Test all 8 themes
- [ ] 19. Test mobile responsive
- [ ] 20. Test desktop responsive
- [ ] 21. Test edge cases (starving, max STR, empty slots)
- [ ] 22. Verify no regressions

**Files Created:** 3 new files
**Files Modified:** 3 existing files
**Total Changes:** ~400 lines of code

---

## 🔮 Phase 2: Feature Panel System (Future)

### Prerequisites
- ✅ Phase 1 complete
- ✅ User ability categorization (DONE!)
- ⏳ Visual mockups approved
- ⏳ User confirms Phase 2 approach

### Scope

**A. Team Purpose Detection** (`src/features/petTeam/logic/purpose.ts`)
- Analyze team composition
- Detect primary purpose (XP Farming, Coin Farming, etc.)
- Confidence scoring (0-1)
- Combo detection (XP Boost + low-STR pets, etc.)
- Exclude Copycat (not used in game)
- Handle Crop Eater (unwanted unless rainbow/gold)

**B. Feature Panel Registry** (`src/ui/sections/Pets/parts/featurePanels/`)
- `registry.ts` - Plugin system for features
- `xpFeature.ts` - XP tracker integration
- `timeReductionFeature.ts` - Plant/Egg growth timers
- `mutationFeature.ts` - Mutation hunting tracker
- `hatching Feature.ts` - Hatching optimization tracker

**C. Smart Display Management**
- User preferences (which features to show)
- Per-team feature history
- Collapsed badge configuration
- Feature tab navigation UI

**D. Game Metrics Intelligence**
- Detect game stage (early/mid/late game)
- Auto-suggest features based on:
  - Garden state (crops planted)
  - Pet collection (species, abilities)
  - Coin balance
  - Active weather
  - Session duration

---

## 📊 Ability Categorization Summary (For Phase 2)

✅ **Complete:** All 53 abilities categorized into 8 purpose groups

1. **XP Farming** (4 abilities) - Pet XP Boost
2. **Coin Farming** (6 abilities) - Coin Finder, Sell Boost, Crop Refund, Double Harvest
3. **Crop Farming** (13 abilities) - Granters, Growth boosts, Mutation boosts
4. **Time Reduction** (8 abilities) - Plant Growth, Egg Growth (NOT "Turtle Farming")
5. **Mutation Hunting** (7 abilities) - Rare Granters, Mutation boosts
6. **Efficiency** (17 abilities) - Hunger management, passive abilities
7. **Hatching Optimization** (9 abilities) - Max STR Boost, Pet Mutation, Double Hatch, Pet Refund
8. **Special/Utility** (2 abilities) - Crop Eater (unwanted), Copycat (DO NOT DISPLAY)

**Key Insights:**
- Many abilities serve multiple purposes
- Rainbow Granter = #1 priority (0.72% ultra-rare)
- Max STR Boost = most sought-after for hatching
- Hunger Boost + Restore = AFK overnight combo
- Double Hatch + Pet Refund = rainbow hunting strategy

---

## 🚀 Implementation Strategy

### Recommended Approach: Option B (Parallel Track)

**Week 1: Phase 1 Implementation**
- Developer: Implement all refinements + base template
- User: No action required (can observe progress)

**Week 2: Visual Mockups & Review**
- Developer: Create mockups for Phase 2 feature panels
- User: Review mockups, provide feedback

**Week 3: Phase 2 Implementation** (if approved)
- Developer: Implement team detection + feature system
- User: Test and provide feedback

**Total Time:** 14-20 hours across 3 weeks

---

## 📋 Success Criteria

### Phase 1 Success = ALL of:
- ✅ All UI refinements applied
- ✅ Theme colors are semantic (--fg, --accent, --pill-to, etc.)
- ✅ STR displays under sprite/badges
- ✅ Base template system works and is reusable
- ✅ Helper functions in MGPetTeam API
- ✅ All 8 themes render correctly
- ✅ Mobile + desktop responsive
- ✅ No regressions in existing functionality
- ✅ Follows ALL `.claude/rules/` compliance

### Phase 2 Success = ALL of:
- ✅ Team purpose detection >80% accuracy
- ✅ Feature panel system is extensible
- ✅ Adding new features takes <2 hours
- ✅ Smart display shows relevant features first
- ✅ User can customize feature visibility
- ✅ Copycat ability never displayed
- ✅ Crop Eater flagged as "unwanted"

---

## 🎯 Next Steps

**Immediate (Can Start Now):**
1. ✅ Approve Phase 1 plan
2. ✅ Developer begins implementation
3. ⏳ 6-8 hours of coding
4. ⏳ Testing across themes/devices
5. ⏳ Phase 1 complete!

**Short-Term (After Phase 1):**
1. ⏳ Create visual mockups for feature panels
2. ⏳ User reviews mockups
3. ⏳ Decide on Phase 2 approach

**Long-Term (Phase 2):**
1. ⏳ Implement team purpose detection
2. ⏳ Build feature panel registry
3. ⏳ Add smart display management
4. ⏳ Create stub features for future expansion

---

## ❓ Outstanding Questions

1. **Copycat Ability:** Confirmed - DO NOT DISPLAY (not used in game)
2. **Crop Eater:** Confirmed - Flag as "unwanted" (only keep if rainbow/gold mutation)
3. **Crop Size Boost:** Affects value (scale 1-100 in-game indicator) - needs more research
4. **Species-to-Ability Map:** Needs research for accurate team analysis
5. **Mutation Value Multipliers:** Needs research for coin farming optimization

---

## 📚 Documentation Updated

- [x] All-Pet-Abilities-Complete-List.md - Categorization complete
- [x] Template-Layout-Refinements.md - Corrected layout (STR under sprite)
- [x] FINAL-IMPLEMENTATION-PLAN.md - This document
- [ ] CHANGELOG.md - Update after Phase 1 completion
- [ ] TODO.md - Mark items complete

---

## 🎉 Ready to Proceed!

**Phase 1 has NO BLOCKERS and can start immediately.**

Just say "**Start Phase 1**" and I'll begin implementation!
