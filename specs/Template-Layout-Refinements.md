# Template & Layout Refinements - Expanded Pet Cards

**Related Spec:** XP-Tracker-Refinement-and-Extensibility.md
**Status:** Design Finalized, Ready for Implementation
**Created:** 2026-01-07

---

## Template System Overview

### Base Template Concept

**All pet team cards** come with an expand option that drops a panel below the team, showing:
- **3 pet slots** (matching team.petIds)
- **Each slot displays:** Sprite + Name + STR
- **Developer hookable:** Feature stats can be wired into the cards (like XP tracker does)

**Reference Image:** `specs/templateexample.png`

---

## Layout Refinements (Apply to BOTH Template & XP Tracker)

### Refinement A: STR Label and Positioning

**Current Issues:**
1. Label says "STRENGTH" - too long
2. Positioned too far from name
3. Takes up too much space

**Changes:**
```
BEFORE:
┌─────────────────┐
│ [Sprite]        │
│                 │
│  Snael (91)     │
│                 │
│  STRENGTH       │
│  91/91          │
└─────────────────┘

AFTER:
┌─────────────────┐
│ [Sprite]        │
│                 │
│  Snael (91)     │
│  STR 91/91      │ <- Moved up, tighter spacing, renamed
│                 │
└─────────────────┘
```

**Implementation:**
1. Rename "STRENGTH" → "STR"
2. Move closer to name (reduce margin/padding)
3. Display on same line or very close: "STR 55/82"

**Files to Update:**
- `src/ui/sections/Pets/parts/TeamXpPanel.ts` (line ~243-258)
- `src/ui/sections/Pets/parts/teamXpPanel.css.ts` (stat label styles)

---

### Refinement B: Optimize Sprite Space

**Current Issue:**
- Lots of empty space above and below the pet sprite
- Space is wasted

**Solution: STR Display Under Sprite (Keep Current Layout)**

**User Requirement:** KEEP the current XP tracker layout - don't restructure. Just add STR under sprite.

**Base Template Layout (No Feature Stats):**
```
┌──────────────────────────────────────────┐
│                                          │
│ [Sprite]  Snael                          │
│ | 64x64|  ─────────────────────────      │
│ |      |                                 │
│ |------|   (Feature stats go here)       │
│ [MAX]                                    │
│ STR: 91/91                               │
│                                          │
│                                          │
│                                          │
└──────────────────────────────────────────┘
```

**How It Works:**

1. **Base Template Components:**
   - Sprite (64x64, with mutations)
   - Pet name (right of sprite)
   - Horizontal separator line
   - Badges under sprite (MAX, XP Boost tier, etc.)
   - **STR display under badges** (e.g., "STR: 91" or "STR: 89/91")
   - Content area below (for features to populate)

2. **When Expand Button Clicked:**
   - Panel drops down below team
   - Shows **3 cards** (one per pet slot)
   - Each card auto-populates: sprite + name + STR
   - Content area is empty, waiting for feature stats

3. **When Feature Adds Stats (e.g., XP Tracker):**
   - Feature inputs its data into content area
   - Result looks like current XP tracker implementation
   - Stats appear in the "Feature stats go here" space

**Example: XP Tracker Populated Template:**
```
┌──────────────────────────────────────────┐
│ [Sprite]  Snael                          │
│ | 64x64|  ─────────────────────────      │
│ |      |   Next STR      MAXED OUT       │
│ |------|   Max STR       MAXED OUT       │
│ [MAX]      XP Boost      +1,200 XP/hr    │
│ [⚡II]    XP Pet [foodemji]  15          │
│ STR: 91/91                               │
│                                          │
└──────────────────────────────────────────┘
```

**Benefits:**
- NO restructuring of current XP tracker
- Template just adds the base (sprite + name + STR)
- Features populate the rest
- Consistent across all future features

---

## Detailed Implementation Plan

### Step 1: Update Pet Card HTML Structure

**File:** `src/ui/sections/Pets/parts/TeamXpPanel.ts`

**Current Structure (lines 156-296):**
```typescript
const card = document.createElement('div');
card.className = 'xp-pet-card';

// Left: Sprite section
const spriteSection = document.createElement('div');
spriteSection.className = 'xp-pet-card__sprite';

// Right: Stats section
const statsSection = document.createElement('div');
statsSection.className = 'xp-pet-card__stats';
```

**New Structure:**
```typescript
const card = document.createElement('div');
card.className = 'xp-pet-card';

// Left: Sprite section (enhanced)
const spriteSection = document.createElement('div');
spriteSection.className = 'xp-pet-card__sprite';

// Sprite wrapper
const spriteWrapper = document.createElement('div');
spriteWrapper.className = 'xp-pet-card__sprite-wrapper';
// ... sprite rendering code

// NEW: Mini progress bar under sprite
const miniProgress = document.createElement('div');
miniProgress.className = 'xp-pet-card__mini-progress';
const progressPercent = Math.round((pet.currentStrength / pet.maxStrength) * 100);
miniProgress.innerHTML = `
    <div class="xp-mini-progress-bar">
        <div class="xp-mini-progress-fill xp-mini-progress-fill--${getColorClass(progressPercent)}"
             style="width: ${progressPercent}%"></div>
    </div>
    <span class="xp-mini-progress-text">${progressPercent}%</span>
`;
spriteSection.appendChild(spriteWrapper);
spriteSection.appendChild(miniProgress);

// Existing badges
const badgesRow = document.createElement('div');
badgesRow.className = 'xp-pet-card__badges';
// ... badges code
spriteSection.appendChild(badgesRow);

// Right: Name + STR + Stats section (restructured)
const statsSection = document.createElement('div');
statsSection.className = 'xp-pet-card__stats';

// Name + STR header (tighter)
const header = document.createElement('div');
header.className = 'xp-pet-card__header';
header.innerHTML = `
    <div class="xp-pet-card__name">${pet.name || pet.species}</div>
    <div class="xp-pet-card__str">STR ${pet.currentStrength}/${pet.maxStrength}</div>
`;
statsSection.appendChild(header);

// Stats table (existing, but under name now)
const statsTable = document.createElement('table');
statsTable.className = 'xp-stats-table';
// ... stats code (no STRENGTH row anymore, it's in header)
```

---

### Step 2: Update CSS for New Layout

**File:** `src/ui/sections/Pets/parts/teamXpPanel.css.ts`

**Add to Sprite Section:**
```css
/* Mini progress bar under sprite */
.xp-pet-card__mini-progress {
    display: flex;
    align-items: center;
    gap: 6px;
    width: 64px;
    margin: 6px 0 4px 0;
}

.xp-mini-progress-bar {
    flex: 1;
    height: 6px;
    background: var(--soft);
    border: 1px solid var(--border);
    border-radius: 3px;
    overflow: hidden;
}

.xp-mini-progress-fill {
    height: 100%;
    border-radius: 2px;
    transition: width 0.3s ease;
}

.xp-mini-progress-fill--low {
    background: var(--low);
}

.xp-mini-progress-fill--medium {
    background: var(--medium);
}

.xp-mini-progress-fill--high {
    background: var(--high);
}

.xp-mini-progress-fill--complete {
    background: var(--complete);
}

.xp-mini-progress-text {
    font-size: 9px;
    font-weight: 700;
    color: var(--muted);
    min-width: 28px;
    text-align: right;
}
```

**Update Header Section (Name + STR):**
```css
/* Header with name + STR (tight spacing) */
.xp-pet-card__header {
    display: flex;
    flex-direction: column;
    gap: 2px; /* Very tight - name and STR close together */
    margin-bottom: 8px;
    padding-bottom: 6px;
    border-bottom: 1px solid var(--border);
}

.xp-pet-card__name {
    font-size: 15px;
    font-weight: 800;
    color: var(--fg);
    letter-spacing: 0.3px;
    line-height: 1.2;
}

.xp-pet-card__str {
    font-size: 12px;
    font-weight: 700;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    line-height: 1;
}
```

**Remove Old Strength Row from Stats Table:**
```css
/* REMOVE: Old strength display in stats table */
/* This is now in the header */
```

---

### Step 3: Update Stats Table Logic

**File:** `src/ui/sections/Pets/parts/TeamXpPanel.ts` (line ~247+)

**REMOVE the Strength row from stats table:**

```typescript
// BEFORE (REMOVE THIS):
statsTable.innerHTML = `
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
    ...
`;

// AFTER (strength is in header, start with Next STR):
statsTable.innerHTML = `
    ${!pet.isMaxStrength ? `
    <tr class="xp-stats-table__row">
        <td class="xp-stats-table__label">Next STR</td>
        <td class="xp-stats-table__value">
            ${this.buildProgressWithStats(pet, 'next')}
        </td>
    </tr>
    ...
`;
```

---

### Step 4: Apply to Template System

**Create Base Template Component:**

**File:** `src/ui/sections/Pets/parts/BasePetCard.ts` (NEW)

```typescript
/**
 * Base Pet Card Template
 * Minimal display: Sprite + Name + STR + Mini Progress
 * Used as foundation for all feature panels
 */

export interface BasePetCardData {
    id: string;
    name: string;
    species: string;
    currentStrength: number;
    maxStrength: number;
    isMaxStrength: boolean;
    mutations: string[];
    targetScale: number;
}

export class BasePetCard {
    public root: HTMLElement;
    private spriteWrapper: HTMLElement | null = null;
    private miniProgress: HTMLElement | null = null;
    private badgesRow: HTMLElement | null = null;
    private header: HTMLElement | null = null;
    private contentArea: HTMLElement | null = null;

    constructor() {
        this.root = document.createElement('div');
        this.root.className = 'base-pet-card';
    }

    /**
     * Build the card structure
     */
    build(): HTMLElement {
        // Left: Sprite section
        const spriteSection = document.createElement('div');
        spriteSection.className = 'base-pet-card__sprite';

        // Sprite wrapper
        this.spriteWrapper = document.createElement('div');
        this.spriteWrapper.className = 'base-pet-card__sprite-wrapper';
        spriteSection.appendChild(this.spriteWrapper);

        // Mini progress bar
        this.miniProgress = document.createElement('div');
        this.miniProgress.className = 'base-pet-card__mini-progress';
        spriteSection.appendChild(this.miniProgress);

        // Badges
        this.badgesRow = document.createElement('div');
        this.badgesRow.className = 'base-pet-card__badges';
        spriteSection.appendChild(this.badgesRow);

        this.root.appendChild(spriteSection);

        // Right: Header + Content section
        const contentSection = document.createElement('div');
        contentSection.className = 'base-pet-card__content';

        // Header (Name + STR)
        this.header = document.createElement('div');
        this.header.className = 'base-pet-card__header';
        contentSection.appendChild(this.header);

        // Content area (for features to populate)
        this.contentArea = document.createElement('div');
        this.contentArea.className = 'base-pet-card__feature-content';
        contentSection.appendChild(this.contentArea);

        this.root.appendChild(contentSection);

        return this.root;
    }

    /**
     * Update card with pet data
     */
    update(pet: BasePetCardData): void {
        this.updateSprite(pet);
        this.updateMiniProgress(pet);
        this.updateBadges(pet);
        this.updateHeader(pet);
    }

    /**
     * Get content area for features to populate
     */
    getContentArea(): HTMLElement {
        return this.contentArea!;
    }

    // ... helper methods for updating sprite, progress, badges, header
}
```

**Usage by Features:**
```typescript
// XP Tracker uses base template and adds stats
const baseCard = new BasePetCard();
baseCard.build();
baseCard.update(petData);

const contentArea = baseCard.getContentArea();
contentArea.appendChild(buildXpStats(petData));

// Turtle Timer uses same template but adds turtle stats
const baseCard = new BasePetCard();
baseCard.build();
baseCard.update(petData);

const contentArea = baseCard.getContentArea();
contentArea.appendChild(buildTurtleStats(petData));
```

---

## Visual Comparison

### BEFORE (Current XP Tracker):
```
┌────────────────────────────────────────────────┐
│ [Sprite]  Snael (91)                           │
│  64x64    ───────────────────────────────      │
│           STRENGTH        91/91                │
│ [MAX]     Progress        ████████░░  91%      │
│ [⚡II]    Next STR        2.5h (🍖:3)          │
│           Max STR         12.3h (🍖:15)        │
│           XP Boost        +1,200 XP/hr         │
└────────────────────────────────────────────────┘
```

### AFTER (Refined Layout - Minimal Changes):
```
┌────────────────────────────────────────────────┐
│ [Sprite]  Snael (91)                           │
│  64x64    ───────────────────────────────      │
│ [MAX]                                          │
│ [⚡II]                                         │
│ STR: 91/91      ← MOVED: under sprite/badges  │
│                                                │
│ Next STR        2.5h (🍖 x3)  ← UPDATED format│
│ Max STR         12.3h (🍖 x15) ← UPDATED       │
│ XP Boost        +1,200 XP/hr                   │
└────────────────────────────────────────────────┘
```

**Changes:**
1. ✅ "STRENGTH" row → "STR: 91/91" (moved under sprite/badges)
2. ✅ Food format: "🍖 x3" (not "🍖:3")
3. ✅ Removed redundant "STRENGTH" and "Progress" rows from stats table
4. ✅ Cleaner, more minimal layout
5. ✅ KEEPS current horizontal layout (no restructuring)

---

## Implementation Checklist

### Phase 1A: Base Template System
- [ ] Create `BasePetCard.ts` component
- [ ] Create `basePetCard.css.ts` styles
- [ ] Add mini progress bar logic
- [ ] Update header with Name + STR
- [ ] Test with empty content area

### Phase 1B: XP Tracker Refactoring
- [ ] Refactor `TeamXpPanel.ts` to use `BasePetCard`
- [ ] Remove duplicate sprite/header code
- [ ] Populate content area with XP stats
- [ ] Remove "Strength" row from stats table
- [ ] Update food formatting (🍖:3 → 🍖 x3)

### Phase 1C: Other Refinements (from other doc)
- [ ] Rename "Team XP Tracker" → "XP Tracker"
- [ ] Remove card dividers (Option A selected)
- [ ] Fix footer colors (theme-semantic)
- [ ] Fix header colors (theme-semantic)
- [ ] Simplify header (show total only, not breakdown)

### Phase 1D: Testing
- [ ] Test with all 8 themes
- [ ] Test with different pet counts (1-3)
- [ ] Test with edge cases (starving, max STR, XP boost)
- [ ] Test responsive design on mobile
- [ ] Verify mini progress bar accuracy

---

## Future Features Using Template

**Once base template is ready, adding new features is easy:**

```typescript
// Turtle Timer Feature
const card = new BasePetCard();
card.update(petData);
const content = card.getContentArea();

content.innerHTML = `
    <table class="feature-stats">
        <tr>
            <td>Hatch Time</td>
            <td>2.3h</td>
        </tr>
        <tr>
            <td>Optimal Feed</td>
            <td>In 1.5h</td>
        </tr>
    </table>
`;
```

**Benefits:**
- Consistent sprite/name/STR display across all features
- No code duplication
- Features only implement their specific stats
- Easy to add new features

---

## Files to Create/Modify

### New Files:
1. `src/ui/sections/Pets/parts/BasePetCard.ts` - Base template component
2. `src/ui/sections/Pets/parts/basePetCard.css.ts` - Base template styles

### Modified Files:
1. `src/ui/sections/Pets/parts/TeamXpPanel.ts` - Refactor to use base template
2. `src/ui/sections/Pets/parts/teamXpPanel.css.ts` - Remove duplicate styles, update refinements
3. `src/ui/sections/Pets/parts/index.ts` - Export BasePetCard

---

## Success Criteria

- [ ] All pet cards show: Sprite + Name + STR (tight spacing)
- [ ] STR displays as "STR 55/82" format
- [ ] Mini progress bar shows under sprite
- [ ] Badges remain under sprite (below progress bar)
- [ ] Stats table starts with feature-specific data (no redundant strength row)
- [ ] Layout is more compact and space-efficient
- [ ] Template is reusable for future features
- [ ] All refinements from main spec are applied
- [ ] Works across all themes
- [ ] No regressions in existing functionality

---

## Notes

- This template system is the foundation for ALL future pet features
- Once implemented, adding turtle timers/ability trackers/etc. becomes trivial
- The mini progress bar gives users instant visual feedback without opening stats
- Tight name+STR spacing saves vertical space for more stats
- This design aligns with the minimal aesthetic shown in templateexample.png
