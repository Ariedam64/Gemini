# Base Pet Card Template System

**Phase:** 1 - Foundation
**Status:** Design Complete, Ready for Implementation
**Created:** 2026-01-07
**Reference Image:** `specs/templateexample.png`

---

## Table of Contents

1. [Overview](#overview)
2. [Concept and User Clarifications](#concept-and-user-clarifications)
3. [Template Components](#template-components)
4. [Visual Layout](#visual-layout)
5. [Design Principles](#design-principles)
6. [Usage Patterns](#usage-patterns)
7. [Implementation Details](#implementation-details)
8. [Code Examples](#code-examples)
9. [Future Features](#future-features)

---

## Overview

The Base Pet Card Template System provides a **consistent, reusable foundation** for displaying pet information across all features. It establishes a minimal template that all pet-related feature panels can build upon, ensuring visual consistency and reducing code duplication.

### Core Concept

**All pet team cards** include an expand button that drops a panel below the team, showing:
- **3 pet slots** (matching `team.petIds`)
- **Each slot displays:** Sprite + Name + Badges + STR
- **Content area:** Empty by default, hookable by features (XP tracker, turtle timer, etc.)

### Key Goals

1. **Consistency:** All features display pets in the same base format
2. **Extensibility:** Easy to add new features without duplicating sprite/name/STR code
3. **Minimal:** Template provides only essential elements, features add the rest
4. **No Restructuring:** Works with existing XP tracker layout (horizontal design)

---

## Concept and User Clarifications

### User's Explanation

> "what the note here is talking about is simply the 'expand button' and 'expand feature', previously, when a pet team was clicked there was no option or possibility to expand it at all. when i added the xp tracker features to this Pets section, i put a small expand button that drops/expands a table BELOW. essentially exactly what the xp tracker pet team dropdown does but without the xp tracker info, just a completely base template to input information/displays/features."

### Critical User Requirement: STR Placement

**User was VERY clear about this:**

> **STR goes UNDER sprite/badges, NOT next to name**

The user emphasized multiple times that STR should display below the sprite and any badges, not as part of the name header. This is a fundamental design decision that must be preserved.

### User's ASCII Diagram

```
┌──────────────────────────────────────────┐
│ [Sprite]  Snael                          │
│ | 64x64|  ─────────────────────────      │
│ |      |                                 │
│ |------|   (Feature stats go here)       │
│ [MAX]                                    │
│ [⚡II]                                   │
│ STR: 91/91  ← Under sprite/badges       │
│                                          │
└──────────────────────────────────────────┘
```

### How the System Works

1. **Expand Button Clicked:**
   - Panel drops down below the team card
   - Shows 3 pet cards (one per pet slot in team)
   - Each card is built from the base template

2. **Each Card Auto-Populates:**
   - Pet sprite (64x64, with mutations rendered)
   - Pet name (displayed to the right of sprite)
   - Badges under sprite (MAX, XP Boost tier, etc.)
   - **STR display under badges** (e.g., "STR: 91/91" or "STR: 89/91")
   - Content area below (empty, waiting for features to populate)

3. **Features Wire Into Content Area:**
   - **XP tracker:** Populates with Next STR, Max STR, XP Boost stats
   - **Turtle timer:** Would populate with hatch time, optimal feed time
   - **Ability tracker:** Would populate with ability effectiveness stats
   - **Future features:** Any new feature can hook into the template

---

## Template Components

### Component Hierarchy

```
BasePetCard
├── Sprite Section (Left Column)
│   ├── Sprite Wrapper (64x64)
│   │   └── Pet Sprite (with mutations)
│   ├── Badges Row
│   │   ├── MAX badge (if isMaxStrength)
│   │   ├── XP Boost badge (if applicable)
│   │   └── Other badges (future: starving indicator, etc.)
│   └── STR Display
│       └── "STR: XX/YY" or "STR: XX" (if maxed)
│
└── Content Section (Right Column)
    ├── Name Header
    │   └── Pet name or species
    ├── Separator Line
    └── Feature Content Area
        └── (Empty by default, populated by features)
```

### Essential Elements (Always Present)

1. **Sprite:** 64x64 pixel pet sprite with mutations
2. **Name:** Pet name (or species if unnamed)
3. **Badges:** Visual indicators (MAX, XP Boost, etc.)
4. **STR Display:** Current/max strength in "STR: X/Y" format

### Optional Elements (Feature-Specific)

1. **Feature Stats:** XP timers, turtle hatch times, ability stats, etc.
2. **Progress Bars:** Mini progress indicators for specific features
3. **Action Buttons:** Feature-specific controls (feed, hatch, etc.)

---

## Visual Layout

### Base Template (No Feature Stats)

```
┌────────────────────────────────────────────────┐
│                                                │
│ ┌─────────┐  Snael                            │
│ │         │  ───────────────────────────────  │
│ │ Sprite  │                                   │
│ │ 64x64   │                                   │
│ │         │  (Feature content area)           │
│ └─────────┘                                   │
│   [MAX]                                       │
│   [⚡II]                                      │
│ STR: 91/91  ← CRITICAL: Under sprite/badges  │
│                                                │
└────────────────────────────────────────────────┘
```

### With XP Tracker Feature

```
┌────────────────────────────────────────────────┐
│                                                │
│ ┌─────────┐  Snael                            │
│ │         │  ───────────────────────────────  │
│ │ Sprite  │  Next STR        2.5h (🍖 x3)    │
│ │ 64x64   │  Max STR         12.3h (🍖 x15)  │
│ │         │  XP Boost        +1,200 XP/hr     │
│ └─────────┘  XP Per 🍖       15              │
│   [MAX]                                       │
│   [⚡II]                                      │
│ STR: 91/91                                    │
│                                                │
└────────────────────────────────────────────────┘
```

### Layout Refinements (Applied to Template)

#### Refinement A: STR Label and Positioning

**BEFORE (Old XP Tracker):**
```
┌─────────────────┐
│ [Sprite]        │
│                 │
│  Snael (91)     │
│                 │
│  STRENGTH       │  ← Too far from name
│  91/91          │  ← Label too long
└─────────────────┘
```

**AFTER (Base Template):**
```
┌─────────────────┐
│ [Sprite]        │
│                 │
│  Snael (91)     │
│  [MAX]          │
│  STR: 91/91     │  ← Renamed, moved under badges
│                 │
└─────────────────┘
```

**Changes:**
1. Rename "STRENGTH" → "STR" (shorter)
2. Move under sprite/badges (not in stats table)
3. Format: "STR: XX/YY" or "STR: XX" (if maxed)

#### Refinement B: Horizontal Layout Preservation

**CRITICAL: Do NOT restructure the existing XP tracker horizontal layout**

The template system adds the base elements (sprite + name + STR + badges) but **keeps the existing horizontal layout** where:
- Sprite is on the left (64x64)
- Name and stats are on the right
- Content flows horizontally, not vertically stacked

This ensures no breaking changes to the current XP tracker design.

---

## Design Principles

### 1. No Restructuring

**Principle:** The template must work with the existing XP tracker layout without requiring a complete redesign.

**Implementation:**
- Keep horizontal layout (sprite left, content right)
- Don't change stat table structure
- Only add base elements, don't remove existing features

### 2. STR Under Sprite

**Principle:** STR display ALWAYS goes under the sprite and badges, never next to the name.

**Rationale:**
- User explicitly requested this placement multiple times
- Keeps name area clean and uncluttered
- Groups physical pet elements (sprite + badges + STR) together
- Separates identity (sprite/STR) from feature stats (right side)

### 3. Minimal Template

**Principle:** The base template provides only essential elements that ALL features need.

**Essential Elements:**
- Sprite (every feature needs to show which pet)
- Name (every feature needs to identify the pet)
- Badges (visual indicators for pet state)
- STR (fundamental stat that all features reference)

**Non-Essential Elements:**
- Feature-specific stats (XP timers, turtle times, etc.)
- Progress bars for specific features
- Feature-specific action buttons

### 4. Consistent Future

**Principle:** All future features use the same base template, ensuring visual consistency.

**Benefits:**
- No code duplication across features
- Users see consistent pet displays
- Easy to add new features without redesigning UI
- Maintenance is centralized in one template component

---

## Usage Patterns

### Pattern 1: Feature Using Base Template

```typescript
// 1. Create base card
const baseCard = new BasePetCard();
const cardElement = baseCard.build();

// 2. Populate with pet data
baseCard.update({
    id: pet.id,
    name: pet.name,
    species: pet.species,
    currentStrength: pet.currentStrength,
    maxStrength: pet.maxStrength,
    isMaxStrength: pet.isMaxStrength,
    isStarving: pet.isStarving,
    mutations: pet.mutations,
    targetScale: 1.5,
    badges: ['⚡II'] // XP Boost tier
});

// 3. Get content area and add feature-specific stats
const contentArea = baseCard.getContentArea();
contentArea.appendChild(buildXpStatsTable(pet));

// 4. Add card to panel
panelContainer.appendChild(cardElement);
```

### Pattern 2: XP Tracker Refactored

**BEFORE (Duplicated Code):**
```typescript
// TeamXpPanel.ts manually creates sprite, name, badges, strength
const card = document.createElement('div');
const spriteSection = /* ... 50 lines of sprite code ... */;
const statsSection = /* ... 30 lines of stats code ... */;
const strengthRow = /* ... strength display code ... */;
// Then adds XP stats
```

**AFTER (Using Base Template):**
```typescript
// TeamXpPanel.ts uses base template
const baseCard = new BasePetCard();
baseCard.build();
baseCard.update(petData); // Sprite, name, badges, STR handled automatically

const contentArea = baseCard.getContentArea();
contentArea.appendChild(buildXpStats(petData)); // Only XP-specific logic
```

### Pattern 3: Future Turtle Timer Feature

```typescript
// New feature: Turtle Timer
const baseCard = new BasePetCard();
baseCard.build();
baseCard.update(petData);

const contentArea = baseCard.getContentArea();
contentArea.innerHTML = `
    <table class="feature-stats">
        <tr>
            <td class="label">Hatch Time</td>
            <td class="value">2.3h</td>
        </tr>
        <tr>
            <td class="label">Optimal Feed</td>
            <td class="value">In 1.5h</td>
        </tr>
        <tr>
            <td class="label">Hatch Progress</td>
            <td class="value">
                <div class="progress-bar">
                    <div class="fill" style="width: 68%"></div>
                </div>
            </td>
        </tr>
    </table>
`;
```

### Pattern 4: Future Ability Tracker Feature

```typescript
// New feature: Ability Tracker
const baseCard = new BasePetCard();
baseCard.build();
baseCard.update(petData);

const contentArea = baseCard.getContentArea();
contentArea.innerHTML = `
    <table class="feature-stats">
        <tr>
            <td class="label">Ability</td>
            <td class="value">${ability.name}</td>
        </tr>
        <tr>
            <td class="label">Effectiveness</td>
            <td class="value">${ability.effectiveness}%</td>
        </tr>
        <tr>
            <td class="label">Cooldown</td>
            <td class="value">${ability.cooldown}s</td>
        </tr>
    </table>
`;
```

---

## Implementation Details

### BasePetCard Interface

```typescript
/**
 * Data required to populate a base pet card
 */
export interface BasePetCardData {
    id: string;
    name: string;
    species: string;
    currentStrength: number;
    maxStrength: number;
    isMaxStrength: boolean;
    isStarving: boolean;
    mutations: string[]; // e.g., ['gold', 'large']
    targetScale: number; // For sprite scaling
    badges?: string[];   // e.g., ['MAX', '⚡II']
}
```

### BasePetCard Class Structure

```typescript
/**
 * Base Pet Card Template
 * Provides consistent sprite + name + badges + STR display
 * Features populate the content area with their specific stats
 */
export class BasePetCard {
    public root: HTMLElement;
    private spriteWrapper: HTMLElement | null = null;
    private badgesRow: HTMLElement | null = null;
    private strDisplay: HTMLElement | null = null;
    private nameHeader: HTMLElement | null = null;
    private contentArea: HTMLElement | null = null;

    constructor() {
        this.root = document.createElement('div');
        this.root.className = 'base-pet-card';
    }

    /**
     * Build the card DOM structure
     * Creates sprite section and content section
     */
    build(): HTMLElement {
        // Left: Sprite section
        const spriteSection = document.createElement('div');
        spriteSection.className = 'base-pet-card__sprite';

        // Sprite wrapper (64x64)
        this.spriteWrapper = document.createElement('div');
        this.spriteWrapper.className = 'base-pet-card__sprite-wrapper';
        spriteSection.appendChild(this.spriteWrapper);

        // Badges row (under sprite)
        this.badgesRow = document.createElement('div');
        this.badgesRow.className = 'base-pet-card__badges';
        spriteSection.appendChild(this.badgesRow);

        // STR display (under badges)
        this.strDisplay = document.createElement('div');
        this.strDisplay.className = 'base-pet-card__str';
        spriteSection.appendChild(this.strDisplay);

        this.root.appendChild(spriteSection);

        // Right: Content section
        const contentSection = document.createElement('div');
        contentSection.className = 'base-pet-card__content';

        // Name header
        this.nameHeader = document.createElement('div');
        this.nameHeader.className = 'base-pet-card__name';
        contentSection.appendChild(this.nameHeader);

        // Separator line
        const separator = document.createElement('div');
        separator.className = 'base-pet-card__separator';
        contentSection.appendChild(separator);

        // Content area (for features)
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
        this.updateBadges(pet);
        this.updateStr(pet);
        this.updateName(pet);
    }

    /**
     * Get content area for features to populate
     */
    getContentArea(): HTMLElement {
        if (!this.contentArea) {
            throw new Error('BasePetCard: Must call build() before getContentArea()');
        }
        return this.contentArea;
    }

    /**
     * Update sprite with mutations
     */
    private updateSprite(pet: BasePetCardData): void {
        if (!this.spriteWrapper) return;

        // Clear previous sprite
        this.spriteWrapper.innerHTML = '';

        // Render sprite with mutations
        const sprite = renderPetSprite({
            species: pet.species,
            mutations: pet.mutations,
            scale: pet.targetScale,
            isStarving: pet.isStarving
        });

        this.spriteWrapper.appendChild(sprite);
    }

    /**
     * Update badges (MAX, XP Boost, etc.)
     */
    private updateBadges(pet: BasePetCardData): void {
        if (!this.badgesRow) return;

        this.badgesRow.innerHTML = '';

        // MAX badge
        if (pet.isMaxStrength) {
            const maxBadge = document.createElement('span');
            maxBadge.className = 'pet-badge pet-badge--max';
            maxBadge.textContent = 'MAX';
            this.badgesRow.appendChild(maxBadge);
        }

        // Custom badges (XP Boost, etc.)
        if (pet.badges && pet.badges.length > 0) {
            pet.badges.forEach(badgeText => {
                const badge = document.createElement('span');
                badge.className = 'pet-badge pet-badge--custom';
                badge.textContent = badgeText;
                this.badgesRow.appendChild(badge);
            });
        }
    }

    /**
     * Update STR display
     * CRITICAL: Goes UNDER sprite/badges, not next to name
     */
    private updateStr(pet: BasePetCardData): void {
        if (!this.strDisplay) return;

        if (pet.isMaxStrength) {
            this.strDisplay.textContent = `STR: ${pet.currentStrength}`;
        } else {
            this.strDisplay.textContent = `STR: ${pet.currentStrength}/${pet.maxStrength}`;
        }
    }

    /**
     * Update name header
     */
    private updateName(pet: BasePetCardData): void {
        if (!this.nameHeader) return;

        const displayName = pet.name || pet.species;
        const level = pet.currentStrength;

        this.nameHeader.textContent = `${displayName} (${level})`;
    }
}
```

### CSS Structure

```typescript
// basePetCard.css.ts

import { style } from '@vanilla-extract/css';
import { vars } from '../../../styles/theme.css';

/**
 * Base card container
 */
export const basePetCard = style({
    display: 'flex',
    gap: '16px',
    padding: '16px',
    background: vars.color.bg,
    border: `1px solid ${vars.color.border}`,
    borderRadius: '8px',
});

/**
 * Left section: Sprite + Badges + STR
 */
export const spriteSection = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    minWidth: '64px',
});

export const spriteWrapper = style({
    width: '64px',
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
});

export const badgesRow = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    alignItems: 'center',
    width: '100%',
});

export const petBadge = style({
    fontSize: '9px',
    fontWeight: 700,
    padding: '2px 6px',
    borderRadius: '4px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    textAlign: 'center',
    minWidth: '40px',
});

export const petBadgeMax = style([petBadge, {
    background: vars.color.success,
    color: vars.color.successFg,
}]);

export const petBadgeCustom = style([petBadge, {
    background: vars.color.accent,
    color: vars.color.accentFg,
}]);

/**
 * STR display - CRITICAL: Under sprite/badges
 */
export const strDisplay = style({
    fontSize: '11px',
    fontWeight: 700,
    color: vars.color.muted,
    textTransform: 'uppercase',
    letterSpacing: '0.3px',
    textAlign: 'center',
    width: '100%',
    marginTop: '2px',
});

/**
 * Right section: Name + Feature Content
 */
export const contentSection = style({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
});

export const nameHeader = style({
    fontSize: '15px',
    fontWeight: 800,
    color: vars.color.fg,
    letterSpacing: '0.3px',
    lineHeight: 1.2,
});

export const separator = style({
    height: '1px',
    background: vars.color.border,
    margin: '4px 0',
});

export const featureContent = style({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
});
```

---

## Code Examples

### Example 1: Creating a Base Card

```typescript
import { BasePetCard } from './parts/BasePetCard';
import type { BasePetCardData } from './parts/BasePetCard';

// Get pet data from state
const petData: BasePetCardData = {
    id: pet.id,
    name: pet.name,
    species: pet.species,
    currentStrength: pet.currentStrength,
    maxStrength: pet.maxStrength,
    isMaxStrength: pet.currentStrength >= pet.maxStrength,
    isStarving: pet.isStarving,
    mutations: pet.mutations,
    targetScale: 1.5,
    badges: pet.xpBoostTier ? [`⚡${pet.xpBoostTier}`] : undefined
};

// Create and build card
const card = new BasePetCard();
const cardElement = card.build();
card.update(petData);

// Add to container
container.appendChild(cardElement);
```

### Example 2: XP Tracker Using Base Template

```typescript
import { BasePetCard } from './BasePetCard';
import { buildXpStatsTable } from './xpStatsBuilder';

/**
 * Refactored TeamXpPanel using base template
 */
export class TeamXpPanel {
    private cards: BasePetCard[] = [];

    buildPanel(pets: Pet[]): HTMLElement {
        const panel = document.createElement('div');
        panel.className = 'team-xp-panel';

        pets.forEach(pet => {
            // Create base card
            const baseCard = new BasePetCard();
            const cardElement = baseCard.build();

            // Update with pet data
            baseCard.update({
                id: pet.id,
                name: pet.name,
                species: pet.species,
                currentStrength: pet.currentStrength,
                maxStrength: pet.maxStrength,
                isMaxStrength: pet.isMaxStrength,
                isStarving: pet.isStarving,
                mutations: pet.mutations,
                targetScale: 1.5,
                badges: this.buildBadges(pet)
            });

            // Add XP-specific stats to content area
            const contentArea = baseCard.getContentArea();
            contentArea.appendChild(buildXpStatsTable(pet));

            panel.appendChild(cardElement);
            this.cards.push(baseCard);
        });

        return panel;
    }

    private buildBadges(pet: Pet): string[] {
        const badges: string[] = [];

        if (pet.xpBoostTier) {
            badges.push(`⚡${toRoman(pet.xpBoostTier)}`);
        }

        return badges;
    }
}
```

### Example 3: Building XP Stats Table

```typescript
/**
 * Build XP stats table for content area
 * This is XP tracker specific logic, separate from base template
 */
export function buildXpStatsTable(pet: Pet): HTMLElement {
    const table = document.createElement('table');
    table.className = 'feature-stats';

    const rows: string[] = [];

    // Next STR row (if not maxed)
    if (!pet.isMaxStrength) {
        const nextStrData = calculateNextStrTime(pet);
        rows.push(`
            <tr>
                <td class="label">Next STR</td>
                <td class="value">${formatTime(nextStrData.time)} (🍖 x${nextStrData.foodCount})</td>
            </tr>
        `);
    }

    // Max STR row (if not maxed)
    if (!pet.isMaxStrength) {
        const maxStrData = calculateMaxStrTime(pet);
        rows.push(`
            <tr>
                <td class="label">Max STR</td>
                <td class="value">${formatTime(maxStrData.time)} (🍖 x${maxStrData.foodCount})</td>
            </tr>
        `);
    } else {
        rows.push(`
            <tr>
                <td class="label">Max STR</td>
                <td class="value">MAXED OUT</td>
            </tr>
        `);
    }

    // XP Boost row (if applicable)
    if (pet.xpBoostValue > 0) {
        rows.push(`
            <tr>
                <td class="label">XP Boost</td>
                <td class="value">+${pet.xpBoostValue.toLocaleString()} XP/hr</td>
            </tr>
        `);
    }

    // XP per food row
    rows.push(`
        <tr>
            <td class="label">XP Per 🍖</td>
            <td class="value">${pet.xpPerFood}</td>
        </tr>
    `);

    table.innerHTML = rows.join('');
    return table;
}
```

### Example 4: Future Turtle Timer Feature

```typescript
/**
 * New feature: Turtle Timer
 * Uses base template, adds turtle-specific stats
 */
export class TurtleTimerPanel {
    buildPanel(pets: Pet[]): HTMLElement {
        const panel = document.createElement('div');
        panel.className = 'turtle-timer-panel';

        // Filter for turtles only
        const turtles = pets.filter(pet => pet.species === 'turtle');

        turtles.forEach(turtle => {
            // Create base card
            const baseCard = new BasePetCard();
            const cardElement = baseCard.build();

            baseCard.update({
                id: turtle.id,
                name: turtle.name,
                species: turtle.species,
                currentStrength: turtle.currentStrength,
                maxStrength: turtle.maxStrength,
                isMaxStrength: turtle.isMaxStrength,
                isStarving: turtle.isStarving,
                mutations: turtle.mutations,
                targetScale: 1.5
            });

            // Add turtle-specific stats
            const contentArea = baseCard.getContentArea();
            contentArea.appendChild(buildTurtleStats(turtle));

            panel.appendChild(cardElement);
        });

        return panel;
    }
}

function buildTurtleStats(turtle: Pet): HTMLElement {
    const table = document.createElement('table');
    table.className = 'feature-stats';

    const hatchTime = calculateTurtleHatchTime(turtle);
    const optimalFeedTime = calculateOptimalFeedTime(turtle);
    const hatchProgress = (turtle.currentStrength / turtle.maxStrength) * 100;

    table.innerHTML = `
        <tr>
            <td class="label">Hatch Time</td>
            <td class="value">${formatTime(hatchTime)}</td>
        </tr>
        <tr>
            <td class="label">Optimal Feed</td>
            <td class="value">In ${formatTime(optimalFeedTime)}</td>
        </tr>
        <tr>
            <td class="label">Hatch Progress</td>
            <td class="value">
                <div class="progress-bar">
                    <div class="fill" style="width: ${hatchProgress}%"></div>
                </div>
                <span class="progress-text">${Math.round(hatchProgress)}%</span>
            </td>
        </tr>
    `;

    return table;
}
```

---

## Future Features

Once the base template is implemented, adding new features becomes significantly easier. Here are examples of features that could use the template:

### 1. Ability Tracker

**Purpose:** Show pet ability stats and cooldowns

**Content Area:**
```typescript
{
    "Ability": "Gold Rush",
    "Effectiveness": "82%",
    "Cooldown": "5m 23s",
    "Uses Today": "12/20"
}
```

### 2. Feeding Schedule

**Purpose:** Optimal feeding times for each pet

**Content Area:**
```typescript
{
    "Last Fed": "2h 15m ago",
    "Next Feed": "In 45m",
    "Food Stock": "🍖 x23",
    "Daily Goal": "8/12 feeds"
}
```

### 3. Mutation Tracker

**Purpose:** Track mutation progress and breeding

**Content Area:**
```typescript
{
    "Current Mutations": "Gold, Large",
    "Mutation Progress": "68%",
    "Next Mutation": "Sparkle (estimated 3.2h)",
    "Breeding Ready": "Yes"
}
```

### 4. Competition Stats

**Purpose:** Show pet performance in competitions

**Content Area:**
```typescript
{
    "Win Rate": "72%",
    "Competitions Today": "5/10",
    "Best Time": "12.3s",
    "Rank": "#127 (Top 5%)"
}
```

### 5. Health Monitor

**Purpose:** Track pet health and needs

**Content Area:**
```typescript
{
    "Health": "98%",
    "Happiness": "82%",
    "Energy": "Low (feed soon)",
    "Status": "Healthy"
}
```

### Benefits of Template System for Future Features

1. **Fast Development:** No need to recreate sprite/name/STR logic
2. **Consistent UX:** All features look and feel similar
3. **Easy Maintenance:** Fix bugs once, all features benefit
4. **Modular Design:** Features are independent, can be toggled on/off
5. **Scalability:** Add unlimited features without code bloat

---

## Files to Create/Modify

### New Files

1. **`src/ui/sections/Pets/parts/BasePetCard.ts`**
   - Main template class
   - Interface definitions
   - Update methods

2. **`src/ui/sections/Pets/parts/basePetCard.css.ts`**
   - Template styles
   - Badge styles
   - STR display styles

### Modified Files

1. **`src/ui/sections/Pets/parts/TeamXpPanel.ts`**
   - Refactor to use BasePetCard
   - Remove duplicate sprite/name/STR code
   - Focus on XP-specific logic only

2. **`src/ui/sections/Pets/parts/teamXpPanel.css.ts`**
   - Remove duplicate styles
   - Keep XP-specific styles
   - Update to match template

3. **`src/ui/sections/Pets/parts/index.ts`**
   - Export BasePetCard
   - Export BasePetCardData interface

---

## Success Criteria

### Template System

- [ ] BasePetCard class created and tested
- [ ] All template components render correctly
- [ ] STR displays under sprite/badges (NOT next to name)
- [ ] Badges render correctly (MAX, XP Boost, etc.)
- [ ] Content area is hookable by features
- [ ] Template works across all 8 themes

### XP Tracker Refactoring

- [ ] TeamXpPanel refactored to use BasePetCard
- [ ] No duplicate code for sprite/name/STR
- [ ] XP stats display in content area
- [ ] All existing functionality preserved
- [ ] No visual regressions

### Code Quality

- [ ] Clear separation: template vs feature logic
- [ ] Reusable interface (BasePetCardData)
- [ ] Well-documented code
- [ ] TypeScript types are strict
- [ ] CSS follows theme system

### Visual Design

- [ ] Layout matches user's ASCII diagram
- [ ] STR positioned correctly (under sprite/badges)
- [ ] Horizontal layout preserved (no restructuring)
- [ ] Badges aligned and visible
- [ ] Content area flows naturally

### Future-Proofing

- [ ] Easy to add new features
- [ ] Template is flexible but consistent
- [ ] No hardcoded feature-specific logic in template
- [ ] Documentation clear for future developers

---

## Notes

### Critical Reminders

1. **STR GOES UNDER SPRITE/BADGES:** User emphasized this multiple times
2. **NO RESTRUCTURING:** Keep existing horizontal layout
3. **MINIMAL TEMPLATE:** Only sprite + name + badges + STR, features add the rest
4. **CONSISTENT FUTURE:** All features use same base

### Design Philosophy

The base template system embodies a "separation of concerns" approach:

- **Template's job:** Display pet identity (sprite, name, badges, STR)
- **Feature's job:** Display feature-specific stats and functionality
- **Template does NOT:** Implement feature logic or hardcode feature elements
- **Features do NOT:** Recreate sprite/name/STR display logic

This clear separation makes the codebase maintainable, scalable, and easy to extend.

### Reference Materials

- **Visual Example:** `specs/templateexample.png`
- **Full Roadmap:** `specs/COMPLETE-IMPLEMENTATION-ROADMAP.md`
- **Layout Refinements:** `specs/Template-Layout-Refinements.md`
- **XP Tracker Spec:** `specs/XP-Tracker-Refinement-and-Extensibility.md`

---

**End of Document**
