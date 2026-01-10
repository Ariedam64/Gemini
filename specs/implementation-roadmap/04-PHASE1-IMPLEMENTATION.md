# Phase 1: XP Tracker Refinement - Implementation Guide

**Status:** Ready for Implementation
**Estimated Duration:** 8-12 hours
**Prerequisite:** Phase 0 complete (XP Tracker deployed and functional)

---

## Overview

This document provides the **complete implementation specification** for Phase 1 of the XP Tracker refinement. Every task includes exact file paths, line numbers, before/after code, and rationale.

Phase 1 focuses on three primary objectives:
1. **UI Refinements** - Polish the visual presentation
2. **Layout Optimization** - Improve information density and readability
3. **Foundation Building** - Create reusable base components for Phase 2

---

## Table of Contents

1. [Implementation Order](#implementation-order)
2. [Task Groups](#task-groups)
   - [A. UI Refinements (7 tasks)](#a-ui-refinements-7-tasks)
   - [B. Layout Optimization (6 tasks)](#b-layout-optimization-6-tasks)
   - [C. Base Template System (4 tasks)](#c-base-template-system-4-tasks)
   - [D. Helper Functions API (5 tasks)](#d-helper-functions-api-5-tasks)
3. [Testing Checkpoints](#testing-checkpoints)
4. [Dependencies](#dependencies)

---

## Implementation Order

**Recommended sequence to minimize rework and enable parallel development:**

1. **Group A (Tasks 1-7)**: UI Refinements - Independent, can start immediately
2. **Group B (Tasks 8-13)**: Layout Optimization - Requires Group A completion
3. **Group D (Tasks 18-22)**: Helper Functions API - Independent, can start anytime
4. **Group C (Tasks 14-17)**: Base Template System - Requires Groups A+B completion

**Parallel Work Opportunities:**
- Group A and Group D can be worked on simultaneously
- After Group A is complete, Group B can start while Group D continues

---

## Task Groups

---

## A. UI Refinements (7 tasks)

### Task 1: Rename "Team XP Tracker" → "XP Tracker"

**Time Estimate:** 5 minutes
**Dependencies:** None
**Files Modified:** 1

#### File: `C:\Users\ryand\Feeder-Extension\Gemini-main\Gemini-main\src\ui\sections\Pets\parts\TeamXpPanel.ts`

**Location:** Lines 119-123
**Change Type:** Text update

**Before:**
```typescript
this.headerElement.innerHTML = `
    <div class="xp-panel__header-title">
        <span class="xp-panel__header-icon">📊</span>
        <span>Team XP Tracker</span>
    </div>
```

**After:**
```typescript
this.headerElement.innerHTML = `
    <div class="xp-panel__header-title">
        <span class="xp-panel__header-icon">📊</span>
        <span>XP Tracker</span>
    </div>
```

**Rationale:**
The word "Team" is redundant since the tracker is always contextually shown within a team. Shorter title reduces visual clutter and improves readability.

---

### Task 2: Change food format "🍖:1" → "🍖 x1"

**Time Estimate:** 10 minutes
**Dependencies:** None
**Files Modified:** 1

#### File: `C:\Users\ryand\Feeder-Extension\Gemini-main\Gemini-main\src\ui\sections\Pets\parts\TeamXpPanel.ts`

**Location:** Line 322
**Change Type:** String format update

**Before:**
```typescript
<span class="xp-progress-row__feeds">(🍖: ${feeds})</span>
```

**After:**
```typescript
<span class="xp-progress-row__feeds">(🍖 x${feeds})</span>
```

**Rationale:**
The "x" notation is more universally recognized for quantity (like "3 x items"). The space after the emoji improves visual separation and readability.

---

### Task 3: Remove all card divider lines

**Time Estimate:** 10 minutes
**Dependencies:** None
**Files Modified:** 1

#### File: `C:\Users\ryand\Feeder-Extension\Gemini-main\Gemini-main\src\ui\sections\Pets\parts\teamXpPanel.css.ts`

**Location:** Lines 301-307
**Change Type:** CSS removal

**Before:**
```typescript
.xp-stats-table__row {
    border-bottom: 1px solid var(--border);
}

.xp-stats-table__row:last-child {
    border-bottom: none;
}
```

**After:**
```typescript
.xp-stats-table__row {
    /* No border - clean, minimal design */
}

.xp-stats-table__row:last-child {
    /* No special treatment needed */
}
```

**Rationale:**
Removing horizontal dividers between stats rows creates a cleaner, more modern appearance. The label/value structure is clear enough without additional visual separation.

---

### Task 4: Keep pet ability icons as-is (no changes needed)

**Time Estimate:** 0 minutes (documentation only)
**Dependencies:** None
**Files Modified:** 0

**Current Implementation:**
Lines 212-215 in TeamXpPanel.ts already show ability icons correctly:
```typescript
if (pet.xpBoostStats) {
    const icon = pet.xpBoostStats.tier === 'Snowy' ? '❄' : '⚡';
    badgesRow.innerHTML += `<span class="xp-badge xp-badge--boost">${icon}${pet.xpBoostStats.tier}</span>`;
}
```

**Rationale:**
The current implementation is correct and meets design requirements. No changes needed - this task serves as confirmation.

---

### Task 5: Fix footer colors → theme-semantic

**Time Estimate:** 15 minutes
**Dependencies:** None
**Files Modified:** 1

#### File: `C:\Users\ryand\Feeder-Extension\Gemini-main\Gemini-main\src\ui\sections\Pets\parts\teamXpPanel.css.ts`

**Location:** Lines 481-528
**Change Type:** CSS variable updates

**Before:**
```css
.xp-panel__footer {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 20px;
    background: linear-gradient(90deg, var(--soft), var(--muted));
    border-top: 1px solid var(--border);
}

.xp-panel__footer-icon {
    font-size: 24px;
    color: var(--mut-gold);
    animation: boostPulse 1.5s ease-in-out infinite;
}

.xp-panel__footer-title {
    font-size: 13px;
    font-weight: 800;
    color: var(--mut-ambercharged);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.xp-panel__footer-detail {
    font-size: 14px;
    font-weight: 600;
    color: var(--mut-gold);
    margin-top: 2px;
}

.xp-panel__footer-names {
    color: var(--mut-ambercharged);
    font-size: 12px;
    font-weight: 500;
}
```

**After:**
```css
.xp-panel__footer {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 20px;
    background: linear-gradient(90deg, var(--accent), var(--pill-to));
    border-top: 1px solid var(--border);
}

.xp-panel__footer-icon {
    font-size: 24px;
    color: var(--fg);
    animation: boostPulse 1.5s ease-in-out infinite;
}

.xp-panel__footer-title {
    font-size: 13px;
    font-weight: 800;
    color: var(--fg);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.xp-panel__footer-detail {
    font-size: 14px;
    font-weight: 600;
    color: var(--fg);
    margin-top: 2px;
}

.xp-panel__footer-names {
    color: var(--pill-to);
    font-size: 12px;
    font-weight: 500;
}
```

**Rationale:**
Replace mutation-specific colors (--mut-gold, --mut-ambercharged) with theme-semantic colors (--accent, --fg, --pill-to). This ensures the footer adapts to theme changes and maintains visual consistency.

---

### Task 6: Fix header colors → theme-semantic

**Time Estimate:** 15 minutes
**Dependencies:** None
**Files Modified:** 1

#### File: `C:\Users\ryand\Feeder-Extension\Gemini-main\Gemini-main\src\ui\sections\Pets\parts\teamXpPanel.css.ts`

**Location:** Lines 47-108
**Change Type:** CSS variable updates

**Before:**
```css
.xp-panel__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 20px;
    background: linear-gradient(90deg, var(--soft), var(--muted));
    border-bottom: 1px solid var(--border);
}

.xp-panel__header-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--pill-to);
}
```

**After:**
```css
.xp-panel__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 20px;
    background: linear-gradient(90deg, var(--accent), var(--pill-to));
    border-bottom: 1px solid var(--border);
}

.xp-panel__header-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--fg);
}
```

**Rationale:**
Apply consistent theme-semantic colors to the header. The gradient from --accent to --pill-to provides visual interest while maintaining theme consistency.

---

### Task 7: Simplify header → show final total only

**Time Estimate:** 20 minutes
**Dependencies:** None
**Files Modified:** 1

#### File: `C:\Users\ryand\Feeder-Extension\Gemini-main\Gemini-main\src\ui\sections\Pets\parts\TeamXpPanel.ts`

**Location:** Lines 114-135
**Change Type:** Logic simplification

**Before:**
```typescript
private updateHeader(summary: TeamXpSummary): void {
    if (!this.headerElement) return;

    const hasBoost = summary.bonusXpPerHour > 0;

    this.headerElement.innerHTML = `
        <div class="xp-panel__header-title">
            <span class="xp-panel__header-icon">📊</span>
            <span>Team XP Tracker</span>
        </div>
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
    `;
}
```

**After:**
```typescript
private updateHeader(summary: TeamXpSummary): void {
    if (!this.headerElement) return;

    this.headerElement.innerHTML = `
        <div class="xp-panel__header-title">
            <span class="xp-panel__header-icon">📊</span>
            <span>XP Tracker</span>
        </div>
        <div class="xp-panel__header-rate">
            <span class="xp-panel__rate-total">${summary.totalXpPerHour.toLocaleString()} XP/hr</span>
        </div>
    `;
}
```

**Rationale:**
The breakdown (base + bonus = total) adds complexity without significant value. The footer already shows active boosters, so the header can focus on the final rate. Simpler is better.

---

## B. Layout Optimization (6 tasks)

### Task 8: Rename "STRENGTH" → "STR"

**Time Estimate:** 5 minutes
**Dependencies:** Task 3 complete (dividers removed)
**Files Modified:** 1

#### File: `C:\Users\ryand\Feeder-Extension\Gemini-main\Gemini-main\src\ui\sections\Pets\parts\TeamXpPanel.ts`

**Location:** Line 250
**Change Type:** Text update

**Before:**
```typescript
<tr class="xp-stats-table__row">
    <td class="xp-stats-table__label">Strength</td>
    <td class="xp-stats-table__value">
```

**After:**
```typescript
<tr class="xp-stats-table__row">
    <td class="xp-stats-table__label">STR</td>
    <td class="xp-stats-table__value">
```

**Rationale:**
"STR" is a common gaming abbreviation that saves horizontal space. Users familiar with RPG mechanics will recognize it immediately.

---

### Task 9: Move STR up closer to name (tight 2px spacing)

**Time Estimate:** 10 minutes
**Dependencies:** Task 8 complete (STR renamed)
**Files Modified:** 1

#### File: `C:\Users\ryand\Feeder-Extension\Gemini-main\Gemini-main\src\ui\sections\Pets\parts\teamXpPanel.css.ts`

**Location:** Lines 284-292
**Change Type:** CSS spacing adjustment

**Before:**
```css
.xp-pet-card__name {
    font-size: 15px;
    font-weight: 800;
    color: var(--fg);
    margin-bottom: 10px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--border);
    letter-spacing: 0.3px;
}
```

**After:**
```css
.xp-pet-card__name {
    font-size: 15px;
    font-weight: 800;
    color: var(--fg);
    margin-bottom: 2px;
    padding-bottom: 2px;
    border-bottom: 1px solid var(--border);
    letter-spacing: 0.3px;
}
```

**Rationale:**
Reducing vertical spacing from 10px+8px=18px to 2px+2px=4px brings the STR row visually closer to the pet name, creating a tighter, more cohesive header area.

---

### Task 10: Display as "STR 55/82" format

**Time Estimate:** 15 minutes
**Dependencies:** Tasks 8-9 complete
**Files Modified:** 1

#### File: `C:\Users\ryand\Feeder-Extension\Gemini-main\Gemini-main\src\ui\sections\Pets\parts\TeamXpPanel.ts`

**Location:** Lines 248-258
**Change Type:** HTML structure change

**Before:**
```typescript
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

**After:**
```typescript
<tr class="xp-stats-table__row">
    <td class="xp-stats-table__label">STR</td>
    <td class="xp-stats-table__value">
        <span class="xp-strength__current">${pet.currentStrength}</span>
        <span class="xp-strength__separator">/</span>
        <span class="xp-strength__max">${pet.maxStrength}</span>
    </td>
</tr>
```

**Rationale:**
Remove unnecessary `<div class="xp-strength">` wrapper. The inline spans display naturally as "STR 55/82" which is more compact and readable.

---

### Task 11: Add mini progress bar under sprite

**Time Estimate:** 30 minutes
**Dependencies:** Tasks 8-10 complete
**Files Modified:** 2

#### File 1: `C:\Users\ryand\Feeder-Extension\Gemini-main\Gemini-main\src\ui\sections\Pets\parts\TeamXpPanel.ts`

**Location:** After line 217 (after badges section)
**Change Type:** Add new HTML element

**Before:**
```typescript
spriteSection.appendChild(badgesRow);
card.appendChild(spriteSection);
```

**After:**
```typescript
spriteSection.appendChild(badgesRow);

// Add mini progress bar for current STR progress
if (!pet.isMaxStrength && !pet.isStarving) {
    const currentProgress = pet.currentStrength - Math.floor(pet.currentStrength);
    const progressPercent = Math.floor(currentProgress * 100);

    const miniBar = document.createElement('div');
    miniBar.className = 'xp-pet-card__mini-progress';
    miniBar.innerHTML = `
        <div class="xp-mini-progress__bar">
            <div class="xp-mini-progress__fill" style="width: ${progressPercent}%"></div>
        </div>
    `;
    spriteSection.appendChild(miniBar);
}

card.appendChild(spriteSection);
```

**Rationale:**
Adds a visual indicator of progress to next strength level directly under the pet sprite. Makes it easy to see at-a-glance which pets are close to leveling up.

#### File 2: `C:\Users\ryand\Feeder-Extension\Gemini-main\Gemini-main\src\ui\sections\Pets\parts\teamXpPanel.css.ts`

**Location:** After line 272 (after .xp-badge--boost)
**Change Type:** Add new CSS rules

**Before:**
```css
.xp-badge--boost {
    background: linear-gradient(135deg, var(--mut-gold), var(--mut-ambercharged));
    color: #1a1a1a; /* Dark for readability on gold background */
    text-shadow: 0 1px 0 rgba(255,255,255,0.3);
}

/* ═══════════════════════════════════════════════════════════════════════════
   STATS SECTION - Right Side
   ═══════════════════════════════════════════════════════════════════════════ */
```

**After:**
```css
.xp-badge--boost {
    background: linear-gradient(135deg, var(--mut-gold), var(--mut-ambercharged));
    color: #1a1a1a; /* Dark for readability on gold background */
    text-shadow: 0 1px 0 rgba(255,255,255,0.3);
}

/* Mini progress bar under sprite */
.xp-pet-card__mini-progress {
    width: 100%;
    margin-top: 6px;
}

.xp-mini-progress__bar {
    width: 100%;
    height: 4px;
    background: var(--soft);
    border: 1px solid var(--border);
    border-radius: 2px;
    overflow: hidden;
}

.xp-mini-progress__fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent), var(--pill-to));
    border-radius: 1px;
    transition: width 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}

/* ═══════════════════════════════════════════════════════════════════════════
   STATS SECTION - Right Side
   ═══════════════════════════════════════════════════════════════════════════ */
```

**Rationale:**
Provides clean, minimal styling for the mini progress bar. The gradient matches the overall theme and the animation provides smooth visual feedback.

---

### Task 12: Remove "Strength" row from stats table

**Time Estimate:** 10 minutes
**Dependencies:** Tasks 8-11 complete
**Files Modified:** 1

#### File: `C:\Users\ryand\Feeder-Extension\Gemini-main\Gemini-main\src\ui\sections\Pets\parts\TeamXpPanel.ts`

**Location:** Lines 234-258
**Change Type:** Remove entire code block

**Before:**
```typescript
if (pet.isStarving) {
    // Starving state - simplified display
    statsTable.innerHTML = `
        <tr class="xp-stats-table__row xp-stats-table__row--warning">
            <td class="xp-stats-table__label">Status</td>
            <td class="xp-stats-table__value xp-stats-table__value--danger">0 XP/hr - FEED NOW!</td>
        </tr>
        <tr class="xp-stats-table__row">
            <td class="xp-stats-table__label">Strength</td>
            <td class="xp-stats-table__value">${pet.currentStrength}/${pet.maxStrength}</td>
        </tr>
    `;
} else {
    // Normal state with full stats
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
        ${!pet.isMaxStrength ? `
```

**After:**
```typescript
if (pet.isStarving) {
    // Starving state - simplified display
    statsTable.innerHTML = `
        <tr class="xp-stats-table__row xp-stats-table__row--warning">
            <td class="xp-stats-table__label">Status</td>
            <td class="xp-stats-table__value xp-stats-table__value--danger">0 XP/hr - FEED NOW!</td>
        </tr>
    `;
} else {
    // Normal state with full stats
    statsTable.innerHTML = `
        ${!pet.isMaxStrength ? `
```

**Rationale:**
The STR display has been moved to a more prominent position next to the pet name (Tasks 8-10). Removing it from the stats table eliminates redundancy and saves vertical space.

---

### Task 13: Stats table starts with "Next STR"

**Time Estimate:** 5 minutes
**Dependencies:** Task 12 complete
**Files Modified:** 1

**Note:** This task is already complete as a side effect of Task 12. After removing the "Strength" row, the first row in the stats table for non-maxed, non-starving pets is naturally "Next STR" (line 260).

**Current State (after Task 12):**
```typescript
statsTable.innerHTML = `
    ${!pet.isMaxStrength ? `
    <tr class="xp-stats-table__row">
        <td class="xp-stats-table__label">Next STR</td>
        <td class="xp-stats-table__value">
```

**Rationale:**
No additional changes needed - this is the natural result of removing the Strength row. Document for completeness.

---

## C. Base Template System (4 tasks)

### Task 14: Create BasePetCard.ts component

**Time Estimate:** 45 minutes
**Dependencies:** Groups A and B complete
**Files Created:** 1

#### File: `C:\Users\ryand\Feeder-Extension\Gemini-main\Gemini-main\src\ui\sections\Pets\parts\BasePetCard.ts`

**Location:** New file
**Change Type:** Create new component

**Content:**
```typescript
/**
 * Base Pet Card - Reusable card template for pet displays
 *
 * Per .claude/rules/ui/ui.sections.md:
 * - Section parts handle focused sub-features
 * - Must have build() and destroy() methods
 * - Safe to call multiple times
 *
 * @module BasePetCard
 */

import { MGSprite } from '../../../../modules/sprite';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface BasePetCardData {
    id: string;
    name: string;
    species: string;
    currentStrength: number;
    maxStrength: number;
    isMaxStrength: boolean;
    isStarving: boolean;
    mutations: string[];
}

export interface BasePetCardOptions {
    /** Callback when card is clicked */
    onClick?: (petId: string) => void;
    /** Additional CSS classes to apply */
    className?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Base Pet Card Component
// ─────────────────────────────────────────────────────────────────────────────

export class BasePetCard {
    public root: HTMLElement;

    private readonly data: BasePetCardData;
    private readonly options: BasePetCardOptions;
    private contentSlot: HTMLElement | null = null;

    constructor(data: BasePetCardData, options: BasePetCardOptions = {}) {
        this.data = data;
        this.options = options;
        this.root = document.createElement('div');
        this.root.className = `base-pet-card ${options.className || ''}`;
    }

    /**
     * Build the base card structure
     */
    build(): HTMLElement {
        // Add state classes
        if (this.data.isStarving) this.root.classList.add('base-pet-card--starving');
        if (this.data.isMaxStrength) this.root.classList.add('base-pet-card--max');

        // Left section: Sprite + Name + STR
        const leftSection = this.buildLeftSection();
        this.root.appendChild(leftSection);

        // Right section: Content slot (to be filled by consumer)
        this.contentSlot = document.createElement('div');
        this.contentSlot.className = 'base-pet-card__content';
        this.root.appendChild(this.contentSlot);

        // Click handler
        if (this.options.onClick) {
            this.root.style.cursor = 'pointer';
            this.root.addEventListener('click', () => {
                this.options.onClick?.(this.data.id);
            });
        }

        return this.root;
    }

    /**
     * Build left section with sprite, name, and STR display
     */
    private buildLeftSection(): HTMLElement {
        const leftSection = document.createElement('div');
        leftSection.className = 'base-pet-card__left';

        // Sprite wrapper
        const spriteWrapper = document.createElement('div');
        spriteWrapper.className = 'base-pet-card__sprite-wrapper';

        // Render sprite
        try {
            const mutations = this.data.mutations as import('../../../../modules/sprite').MutationName[];

            if (MGSprite.has('pet', this.data.species)) {
                const spriteCanvas = MGSprite.toCanvas('pet', this.data.species, {
                    mutations,
                    scale: 1,
                    boundsMode: 'padded'
                });

                spriteCanvas.style.width = '64px';
                spriteCanvas.style.height = '64px';
                spriteCanvas.style.objectFit = 'contain';
                spriteCanvas.style.display = 'block';

                spriteWrapper.appendChild(spriteCanvas);
            } else {
                spriteWrapper.innerHTML = `<div class="base-pet-card__sprite-fallback">🐾</div>`;
            }
        } catch (error) {
            console.warn(`[BasePetCard] Failed to render sprite for ${this.data.species}:`, error);
            spriteWrapper.innerHTML = `<div class="base-pet-card__sprite-fallback">🐾</div>`;
        }

        leftSection.appendChild(spriteWrapper);

        // Mini progress bar (if not maxed or starving)
        if (!this.data.isMaxStrength && !this.data.isStarving) {
            const currentProgress = this.data.currentStrength - Math.floor(this.data.currentStrength);
            const progressPercent = Math.floor(currentProgress * 100);

            const miniBar = document.createElement('div');
            miniBar.className = 'base-pet-card__mini-progress';
            miniBar.innerHTML = `
                <div class="base-mini-progress__bar">
                    <div class="base-mini-progress__fill" style="width: ${progressPercent}%"></div>
                </div>
            `;
            leftSection.appendChild(miniBar);
        }

        // Name and STR
        const infoSection = document.createElement('div');
        infoSection.className = 'base-pet-card__info';

        const nameEl = document.createElement('div');
        nameEl.className = 'base-pet-card__name';
        nameEl.textContent = this.data.name || this.data.species;
        infoSection.appendChild(nameEl);

        const strEl = document.createElement('div');
        strEl.className = 'base-pet-card__str';
        strEl.innerHTML = `
            <span class="base-str__label">STR</span>
            <span class="base-str__current">${this.data.currentStrength}</span>
            <span class="base-str__separator">/</span>
            <span class="base-str__max">${this.data.maxStrength}</span>
        `;
        infoSection.appendChild(strEl);

        leftSection.appendChild(infoSection);

        return leftSection;
    }

    /**
     * Get content slot for consumer to fill
     */
    getContentSlot(): HTMLElement {
        if (!this.contentSlot) {
            throw new Error('BasePetCard not built yet - call build() first');
        }
        return this.contentSlot;
    }

    /**
     * Update card data
     */
    update(data: Partial<BasePetCardData>): void {
        Object.assign(this.data, data);
        this.rebuild();
    }

    /**
     * Rebuild card with current data
     */
    private rebuild(): void {
        const parent = this.root.parentNode;
        const nextSibling = this.root.nextSibling;

        this.destroy();
        this.root = document.createElement('div');
        this.root.className = `base-pet-card ${this.options.className || ''}`;

        const builtCard = this.build();

        if (parent) {
            parent.insertBefore(builtCard, nextSibling);
        }
    }

    /**
     * Cleanup
     */
    destroy(): void {
        if (this.root.parentNode) {
            this.root.parentNode.removeChild(this.root);
        }
        this.contentSlot = null;
    }
}
```

**Rationale:**
Creates a reusable base component that encapsulates the left side (sprite, name, STR) and provides a content slot for consumers to fill with custom data. This enables Phase 2's Pet Compare View and future card-based displays.

---

### Task 15: Create basePetCard.css.ts styles

**Time Estimate:** 30 minutes
**Dependencies:** Task 14 complete
**Files Created:** 1

#### File: `C:\Users\ryand\Feeder-Extension\Gemini-main\Gemini-main\src\ui\sections\Pets\parts\basePetCard.css.ts`

**Location:** New file
**Change Type:** Create new stylesheet

**Content:**
```typescript
/**
 * Base Pet Card Styles - GEMINI Design System
 *
 * Reusable card component for pet displays with:
 * - Consistent sprite rendering
 * - STR display with mini progress bar
 * - Flexible content slot
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
}

.base-pet-card:hover {
    box-shadow: 0 6px 20px var(--shadow);
    transform: translateX(2px);
}

/* Left accent bar */
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
    transition: opacity 0.3s ease;
}

.base-pet-card:hover::before {
    opacity: 1;
    background: linear-gradient(180deg, var(--accent), var(--pill-to));
}

/* Max strength state */
.base-pet-card--max {
    border-color: var(--complete);
    background: linear-gradient(135deg, var(--soft), var(--bg));
}

.base-pet-card--max::before {
    background: linear-gradient(180deg, var(--complete), var(--high));
}

.base-pet-card--max:hover::before {
    opacity: 0.8;
}

/* Starving state */
.base-pet-card--starving {
    border-color: var(--low);
    background: linear-gradient(135deg, var(--soft), var(--bg));
    animation: starvingPulse 2s ease-in-out infinite;
}

.base-pet-card--starving::before {
    background: var(--low);
}

.base-pet-card--starving:hover::before {
    opacity: 1;
}

@keyframes starvingPulse {
    0%, 100% { border-color: var(--low); }
    50% { border-color: var(--medium); }
}

/* ═══════════════════════════════════════════════════════════════════════════
   LEFT SECTION - Sprite + Info
   ═══════════════════════════════════════════════════════════════════════════ */

.base-pet-card__left {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
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

/* Mini progress bar */
.base-pet-card__mini-progress {
    width: 100%;
    margin-top: 2px;
}

.base-mini-progress__bar {
    width: 100%;
    height: 4px;
    background: var(--soft);
    border: 1px solid var(--border);
    border-radius: 2px;
    overflow: hidden;
}

.base-mini-progress__fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent), var(--pill-to));
    border-radius: 1px;
    transition: width 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}

/* Info section (Name + STR) */
.base-pet-card__info {
    width: 100%;
    text-align: center;
}

.base-pet-card__name {
    font-size: 13px;
    font-weight: 800;
    color: var(--fg);
    letter-spacing: 0.3px;
    margin-bottom: 2px;
    padding-bottom: 2px;
    border-bottom: 1px solid var(--border);
}

.base-pet-card__str {
    font-size: 11px;
    font-weight: 600;
    color: var(--muted);
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 2px;
}

.base-str__label {
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.base-str__current {
    font-size: 14px;
    font-weight: 800;
    background: linear-gradient(135deg, var(--pill-from), var(--pill-to));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.base-str__separator {
    color: var(--muted);
    font-size: 11px;
}

.base-str__max {
    color: var(--muted);
    font-size: 11px;
    font-weight: 600;
}

/* ═══════════════════════════════════════════════════════════════════════════
   CONTENT SLOT - Right Side (filled by consumer)
   ═══════════════════════════════════════════════════════════════════════════ */

.base-pet-card__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
}

/* ═══════════════════════════════════════════════════════════════════════════
   RESPONSIVE
   ═══════════════════════════════════════════════════════════════════════════ */

@media (max-width: 480px) {
    .base-pet-card {
        flex-direction: column;
        align-items: center;
    }

    .base-pet-card__left {
        flex-direction: row;
        gap: 12px;
        min-width: 100%;
    }

    .base-pet-card__info {
        text-align: left;
    }

    .base-pet-card__str {
        justify-content: flex-start;
    }
}

/* ═══════════════════════════════════════════════════════════════════════════
   ACCESSIBILITY
   ═══════════════════════════════════════════════════════════════════════════ */

.base-pet-card:focus-within {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
    .base-pet-card,
    .base-pet-card::before,
    .base-mini-progress__fill {
        animation: none;
        transition: none;
    }
}
`;
```

**Rationale:**
Provides complete styling for the base card component. Styles are consistent with the existing XP Tracker design but extracted into a reusable module.

---

### Task 16: Refactor TeamXpPanel.ts to use base template

**Time Estimate:** 60 minutes
**Dependencies:** Tasks 14-15 complete
**Files Modified:** 2

**Note:** This is a significant refactor. The goal is to replace the current `buildPetCard()` method with usage of `BasePetCard`.

#### File 1: `C:\Users\ryand\Feeder-Extension\Gemini-main\Gemini-main\src\ui\sections\Pets\parts\TeamXpPanel.ts`

**Location:** Lines 1-12 (imports) and lines 156-297 (buildPetCard method)

**Before (imports):**
```typescript
import { MGSprite } from '../../../../modules/sprite';
import type { XpBoostStats } from '../../../../features/xpTracker';
```

**After (imports):**
```typescript
import { MGSprite } from '../../../../modules/sprite';
import type { XpBoostStats } from '../../../../features/xpTracker';
import { BasePetCard } from './BasePetCard';
import type { BasePetCardData } from './BasePetCard';
```

**Before (buildPetCard method - lines 156-297):**
```typescript
private buildPetCard(pet: TeamPetXpData): HTMLElement {
    const card = document.createElement('div');
    card.className = 'xp-pet-card';

    if (pet.isStarving) card.classList.add('xp-pet-card--starving');
    if (pet.isMaxStrength) card.classList.add('xp-pet-card--max');

    // Left side: Sprite container
    const spriteSection = document.createElement('div');
    spriteSection.className = 'xp-pet-card__sprite';

    // Create sprite element
    const spriteWrapper = document.createElement('div');
    spriteWrapper.className = 'xp-pet-card__sprite-wrapper';

    // Render pet sprite (using Journal pattern)
    try {
        const mutations = pet.mutations as import('../../../../modules/sprite').MutationName[];

        // Check if sprite exists before rendering
        if (MGSprite.has('pet', pet.species)) {
            const spriteCanvas = MGSprite.toCanvas('pet', pet.species, {
                mutations,
                scale: 1,
                boundsMode: 'padded'
            });

            // Apply explicit canvas styles (Journal pattern)
            spriteCanvas.style.width = '64px';
            spriteCanvas.style.height = '64px';
            spriteCanvas.style.objectFit = 'contain';
            spriteCanvas.style.display = 'block';

            spriteWrapper.appendChild(spriteCanvas);
        } else {
            // Sprite not found
            spriteWrapper.innerHTML = `<div class="xp-pet-card__sprite-fallback">🐾</div>`;
        }
    } catch (error) {
        // Fallback if sprite fails
        console.warn(`[TeamXpPanel] Failed to render sprite for ${pet.species}:`, error);
        spriteWrapper.innerHTML = `<div class="xp-pet-card__sprite-fallback">🐾</div>`;
    }

    spriteSection.appendChild(spriteWrapper);

    // Status badges under sprite
    const badgesRow = document.createElement('div');
    badgesRow.className = 'xp-pet-card__badges';

    if (pet.isMaxStrength) {
        badgesRow.innerHTML += `<span class="xp-badge xp-badge--max">MAX</span>`;
    }
    if (pet.isStarving) {
        badgesRow.innerHTML += `<span class="xp-badge xp-badge--starving">STARVING</span>`;
    }
    if (pet.xpBoostStats) {
        const icon = pet.xpBoostStats.tier === 'Snowy' ? '❄' : '⚡';
        badgesRow.innerHTML += `<span class="xp-badge xp-badge--boost">${icon}${pet.xpBoostStats.tier}</span>`;
    }

    spriteSection.appendChild(badgesRow);
    card.appendChild(spriteSection);

    // Right side: Stats table
    const statsSection = document.createElement('div');
    statsSection.className = 'xp-pet-card__stats';

    // Pet name header
    const nameHeader = document.createElement('div');
    nameHeader.className = 'xp-pet-card__name';
    nameHeader.textContent = pet.name || pet.species;
    statsSection.appendChild(nameHeader);

    // Stats table
    const statsTable = document.createElement('table');
    statsTable.className = 'xp-stats-table';

    if (pet.isStarving) {
        // Starving state - simplified display
        statsTable.innerHTML = `
            <tr class="xp-stats-table__row xp-stats-table__row--warning">
                <td class="xp-stats-table__label">Status</td>
                <td class="xp-stats-table__value xp-stats-table__value--danger">0 XP/hr - FEED NOW!</td>
            </tr>
        `;
    } else {
        // Normal state with full stats
        statsTable.innerHTML = `
            ${!pet.isMaxStrength ? `
            <tr class="xp-stats-table__row">
                <td class="xp-stats-table__label">Next STR</td>
                <td class="xp-stats-table__value">
                    ${this.buildProgressWithStats(pet, 'next')}
                </td>
            </tr>
            <tr class="xp-stats-table__row">
                <td class="xp-stats-table__label">Max STR</td>
                <td class="xp-stats-table__value">
                    ${this.buildProgressWithStats(pet, 'max')}
                </td>
            </tr>
            ` : ''}
            ${pet.xpBoostStats ? `
            <tr class="xp-stats-table__row xp-stats-table__row--boost">
                <td class="xp-stats-table__label">XP Boost</td>
                <td class="xp-stats-table__value">
                    <span class="xp-boost-stat">+${pet.xpBoostStats.expectedXpPerHour.toLocaleString()} XP/hr</span>
                    ${!pet.xpBoostStats.isActive ? '<span class="xp-inactive">(inactive)</span>' : ''}
                </td>
            </tr>
            ` : ''}
            ${pet.supportingFeeds !== null ? `
            <tr class="xp-stats-table__row xp-stats-table__row--support">
                <td class="xp-stats-table__label">Supporting</td>
                <td class="xp-stats-table__value">
                    <span class="xp-support">${pet.supportingFeeds} feeds to carry team</span>
                </td>
            </tr>
            ` : ''}
        `;
    }

    statsSection.appendChild(statsTable);
    card.appendChild(statsSection);

    return card;
}
```

**After (buildPetCard method):**
```typescript
private buildPetCard(pet: TeamPetXpData): HTMLElement {
    // Convert TeamPetXpData to BasePetCardData
    const cardData: BasePetCardData = {
        id: pet.id,
        name: pet.name,
        species: pet.species,
        currentStrength: pet.currentStrength,
        maxStrength: pet.maxStrength,
        isMaxStrength: pet.isMaxStrength,
        isStarving: pet.isStarving,
        mutations: pet.mutations,
    };

    // Create base card with XP-specific styling
    const baseCard = new BasePetCard(cardData, {
        className: 'xp-pet-card'
    });

    const cardRoot = baseCard.build();
    const contentSlot = baseCard.getContentSlot();

    // Add badges to the left section (after sprite)
    const leftSection = cardRoot.querySelector('.base-pet-card__left');
    if (leftSection) {
        const badgesRow = document.createElement('div');
        badgesRow.className = 'xp-pet-card__badges';

        if (pet.isMaxStrength) {
            badgesRow.innerHTML += `<span class="xp-badge xp-badge--max">MAX</span>`;
        }
        if (pet.isStarving) {
            badgesRow.innerHTML += `<span class="xp-badge xp-badge--starving">STARVING</span>`;
        }
        if (pet.xpBoostStats) {
            const icon = pet.xpBoostStats.tier === 'Snowy' ? '❄' : '⚡';
            badgesRow.innerHTML += `<span class="xp-badge xp-badge--boost">${icon}${pet.xpBoostStats.tier}</span>`;
        }

        leftSection.appendChild(badgesRow);
    }

    // Fill content slot with XP stats table
    const statsTable = document.createElement('table');
    statsTable.className = 'xp-stats-table';

    if (pet.isStarving) {
        // Starving state - simplified display
        statsTable.innerHTML = `
            <tr class="xp-stats-table__row xp-stats-table__row--warning">
                <td class="xp-stats-table__label">Status</td>
                <td class="xp-stats-table__value xp-stats-table__value--danger">0 XP/hr - FEED NOW!</td>
            </tr>
        `;
    } else {
        // Normal state with full stats
        statsTable.innerHTML = `
            ${!pet.isMaxStrength ? `
            <tr class="xp-stats-table__row">
                <td class="xp-stats-table__label">Next STR</td>
                <td class="xp-stats-table__value">
                    ${this.buildProgressWithStats(pet, 'next')}
                </td>
            </tr>
            <tr class="xp-stats-table__row">
                <td class="xp-stats-table__label">Max STR</td>
                <td class="xp-stats-table__value">
                    ${this.buildProgressWithStats(pet, 'max')}
                </td>
            </tr>
            ` : ''}
            ${pet.xpBoostStats ? `
            <tr class="xp-stats-table__row xp-stats-table__row--boost">
                <td class="xp-stats-table__label">XP Boost</td>
                <td class="xp-stats-table__value">
                    <span class="xp-boost-stat">+${pet.xpBoostStats.expectedXpPerHour.toLocaleString()} XP/hr</span>
                    ${!pet.xpBoostStats.isActive ? '<span class="xp-inactive">(inactive)</span>' : ''}
                </td>
            </tr>
            ` : ''}
            ${pet.supportingFeeds !== null ? `
            <tr class="xp-stats-table__row xp-stats-table__row--support">
                <td class="xp-stats-table__label">Supporting</td>
                <td class="xp-stats-table__value">
                    <span class="xp-support">${pet.supportingFeeds} feeds to carry team</span>
                </td>
            </tr>
            ` : ''}
        `;
    }

    contentSlot.appendChild(statsTable);

    return cardRoot;
}
```

**Rationale:**
Refactors the pet card builder to use the new `BasePetCard` component. The base handles sprite rendering, name, and STR display, while the XP-specific logic (stats table, badges) is added via the content slot and DOM manipulation.

#### File 2: `C:\Users\ryand\Feeder-Extension\Gemini-main\Gemini-main\src\ui\sections\Pets\PetsSection.ts`

**Location:** Find the CSS injection section (search for `injectStyleOnce`)

**Before:**
```typescript
import { teamXpPanelCss } from './parts/teamXpPanel.css';
// ... later in code
injectStyleOnce(this.root, 'team-xp-panel', teamXpPanelCss);
```

**After:**
```typescript
import { teamXpPanelCss } from './parts/teamXpPanel.css';
import { basePetCardCss } from './parts/basePetCard.css';
// ... later in code
injectStyleOnce(this.root, 'team-xp-panel', teamXpPanelCss);
injectStyleOnce(this.root, 'base-pet-card', basePetCardCss);
```

**Rationale:**
Inject the new base card styles into the shadow DOM so they're available for use.

---

### Task 17: Test template with empty content area

**Time Estimate:** 20 minutes
**Dependencies:** Tasks 14-16 complete
**Files Modified:** 0 (testing only)

**Test Procedure:**

1. **Open game with XP Tracker visible**
2. **Verify base card rendering:**
   - Check that pet sprites render correctly
   - Verify name displays properly
   - Confirm STR display shows "STR 55/82" format
   - Check mini progress bar appears and fills correctly
3. **Verify state classes:**
   - Check starving pets have red border and pulse
   - Verify max strength pets have green border
4. **Test content slot:**
   - Confirm stats table renders in the right section
   - Verify all XP-specific data displays correctly
5. **Responsive check:**
   - Resize window to mobile width
   - Confirm card layout stacks properly

**Expected Results:**
- All existing functionality works identically
- Visual appearance is unchanged from Phase 1 Groups A+B
- No console errors
- Base card component successfully encapsulates shared logic

**Rationale:**
Ensures the refactor to `BasePetCard` doesn't break existing functionality and properly sets the foundation for Phase 2.

---

## D. Helper Functions API (5 tasks)

### Task 18: Add MGPetTeam.getPetsForTeam(team) helper

**Time Estimate:** 5 minutes
**Dependencies:** None
**Files Modified:** 1

**Note:** This function already exists in `logic/team.ts` (line 127). This task is to expose it in the public API.

#### File: `C:\Users\ryand\Feeder-Extension\Gemini-main\Gemini-main\src\features\petTeam\index.ts`

**Location:** Lines 58-73 (public API section)

**Before:**
```typescript
// ─── Team Management ───
createTeam: TeamLogic.createTeam,
updateTeam: TeamLogic.updateTeam,
deleteTeam: TeamLogic.deleteTeam,
renameTeam: TeamLogic.renameTeam,
getTeam: TeamLogic.getTeam,
getAllTeams: TeamLogic.getAllTeams,
getTeamByName: TeamLogic.getTeamByName,
reorderTeams: TeamLogic.reorderTeams,

// ─── Active Team ───
getActiveTeamId: ActiveLogic.getActiveTeamId,
```

**After:**
```typescript
// ─── Team Management ───
createTeam: TeamLogic.createTeam,
updateTeam: TeamLogic.updateTeam,
deleteTeam: TeamLogic.deleteTeam,
renameTeam: TeamLogic.renameTeam,
getTeam: TeamLogic.getTeam,
getAllTeams: TeamLogic.getAllTeams,
getTeamByName: TeamLogic.getTeamByName,
reorderTeams: TeamLogic.reorderTeams,
getPetsForTeam: TeamLogic.getPetsForTeam,

// ─── Active Team ───
getActiveTeamId: ActiveLogic.getActiveTeamId,
```

**Rationale:**
Exposes the existing `getPetsForTeam()` helper in the public API, making it easily accessible for UI components that need to retrieve pet objects for a team.

---

### Task 19: Add MGPetTeam.isTeamFull(team) helper

**Time Estimate:** 10 minutes
**Dependencies:** Task 18 complete
**Files Modified:** 2

#### File 1: `C:\Users\ryand\Feeder-Extension\Gemini-main\Gemini-main\src\features\petTeam\logic\team.ts`

**Location:** After line 144 (after getPetsForTeam function)
**Change Type:** Add new function

**Content:**
```typescript
/**
 * Check if a team is full (all 3 slots occupied)
 * @param team - Pet team to check
 * @returns true if all slots are filled, false otherwise
 */
export function isTeamFull(team: PetTeam): boolean {
    return team.petIds.every(petId => petId !== EMPTY_SLOT);
}
```

**Rationale:**
Provides a convenient helper to check if a team has all slots filled. Useful for UI logic that needs to disable "add pet" actions when teams are full.

#### File 2: `C:\Users\ryand\Feeder-Extension\Gemini-main\Gemini-main\src\features\petTeam\index.ts`

**Location:** After getPetsForTeam line (added in Task 18)

**Before:**
```typescript
getPetsForTeam: TeamLogic.getPetsForTeam,

// ─── Active Team ───
```

**After:**
```typescript
getPetsForTeam: TeamLogic.getPetsForTeam,
isTeamFull: TeamLogic.isTeamFull,

// ─── Active Team ───
```

**Rationale:**
Expose the new helper in the public API.

---

### Task 20: Add MGPetTeam.getEmptySlots(team) helper

**Time Estimate:** 10 minutes
**Dependencies:** Task 19 complete
**Files Modified:** 2

#### File 1: `C:\Users\ryand\Feeder-Extension\Gemini-main\Gemini-main\src\features\petTeam\logic\team.ts`

**Location:** After isTeamFull function (added in Task 19)
**Change Type:** Add new function

**Content:**
```typescript
/**
 * Get number of empty slots in a team
 * @param team - Pet team to check
 * @returns Number of empty slots (0-3)
 */
export function getEmptySlots(team: PetTeam): number {
    return team.petIds.filter(petId => petId === EMPTY_SLOT).length;
}
```

**Rationale:**
Provides a helper to count empty slots. Useful for displaying "2/3 pets" type information in the UI.

#### File 2: `C:\Users\ryand\Feeder-Extension\Gemini-main\Gemini-main\src\features\petTeam\index.ts`

**Location:** After isTeamFull line (added in Task 19)

**Before:**
```typescript
isTeamFull: TeamLogic.isTeamFull,

// ─── Active Team ───
```

**After:**
```typescript
isTeamFull: TeamLogic.isTeamFull,
getEmptySlots: TeamLogic.getEmptySlots,

// ─── Active Team ───
```

**Rationale:**
Expose the new helper in the public API.

---

### Task 21: Add MGPetTeam.getFilledSlotCount(team) helper

**Time Estimate:** 10 minutes
**Dependencies:** Task 20 complete
**Files Modified:** 2

#### File 1: `C:\Users\ryand\Feeder-Extension\Gemini-main\Gemini-main\src\features\petTeam\logic\team.ts`

**Location:** After getEmptySlots function (added in Task 20)
**Change Type:** Add new function

**Content:**
```typescript
/**
 * Get number of filled slots in a team
 * @param team - Pet team to check
 * @returns Number of filled slots (0-3)
 */
export function getFilledSlotCount(team: PetTeam): number {
    return team.petIds.filter(petId => petId !== EMPTY_SLOT).length;
}
```

**Rationale:**
Provides a helper to count filled slots. Complementary to `getEmptySlots()`, useful for "Team has 2 pets" type displays.

#### File 2: `C:\Users\ryand\Feeder-Extension\Gemini-main\Gemini-main\src\features\petTeam\index.ts`

**Location:** After getEmptySlots line (added in Task 20)

**Before:**
```typescript
getEmptySlots: TeamLogic.getEmptySlots,

// ─── Active Team ───
```

**After:**
```typescript
getEmptySlots: TeamLogic.getEmptySlots,
getFilledSlotCount: TeamLogic.getFilledSlotCount,

// ─── Active Team ───
```

**Rationale:**
Expose the new helper in the public API.

---

### Task 22: Update MGPetTeam index.ts exports

**Time Estimate:** 5 minutes
**Dependencies:** Tasks 18-21 complete
**Files Modified:** 1

**Note:** This task is already complete as a side effect of Tasks 18-21. Each task added the export to the public API.

**Verification:**

Check that `C:\Users\ryand\Feeder-Extension\Gemini-main\Gemini-main\src\features\petTeam\index.ts` contains all new exports:

```typescript
// ─── Team Management ───
createTeam: TeamLogic.createTeam,
updateTeam: TeamLogic.updateTeam,
deleteTeam: TeamLogic.deleteTeam,
renameTeam: TeamLogic.renameTeam,
getTeam: TeamLogic.getTeam,
getAllTeams: TeamLogic.getAllTeams,
getTeamByName: TeamLogic.getTeamByName,
reorderTeams: TeamLogic.reorderTeams,
getPetsForTeam: TeamLogic.getPetsForTeam,
isTeamFull: TeamLogic.isTeamFull,
getEmptySlots: TeamLogic.getEmptySlots,
getFilledSlotCount: TeamLogic.getFilledSlotCount,
```

**Rationale:**
Final verification that all helper functions are properly exposed in the MGPetTeam public API.

---

## Testing Checkpoints

### Checkpoint A: After UI Refinements (Tasks 1-7)

**What to test:**
- Header shows "XP Tracker" instead of "Team XP Tracker"
- Header shows only total XP/hr (no breakdown)
- Header and footer use theme-semantic colors (--accent, --fg, --pill-to)
- Food format shows "🍖 x1" instead of "🍖:1"
- Stats table has no divider lines between rows
- Ability icons display correctly (❄ for Snowy, ⚡ for others)

**How to test:**
1. Load game with active pet team
2. View XP Tracker panel
3. Check each visual element matches specification
4. Switch themes (if available) to verify color consistency

**Expected duration:** 15 minutes

---

### Checkpoint B: After Layout Optimization (Tasks 8-13)

**What to test:**
- "STRENGTH" label changed to "STR"
- STR row is 2px below pet name (tight spacing)
- STR displays as "STR 55/82" format inline
- Mini progress bar appears under sprite
- Stats table no longer shows "Strength" row
- First row of stats table is "Next STR"

**How to test:**
1. View XP Tracker for multiple pets
2. Verify layout changes for normal, starving, and max-strength pets
3. Check mini progress bar fills correctly (matches current progress)
4. Confirm visual hierarchy is improved

**Expected duration:** 20 minutes

---

### Checkpoint C: After Base Template System (Tasks 14-17)

**What to test:**
- All existing functionality works identically to Checkpoint B
- No visual regression
- Base card component renders correctly
- Content slot is properly filled with XP stats

**How to test:**
1. Full regression test of Checkpoints A and B
2. Inspect DOM to verify base card structure
3. Test with various pet states (starving, max, boosted)
4. Check responsive behavior on mobile

**Expected duration:** 30 minutes

---

### Checkpoint D: After Helper Functions API (Tasks 18-22)

**What to test:**
- New helper functions are accessible via MGPetTeam
- Functions return correct data

**How to test:**
1. Open browser console
2. Test each helper function:
   ```javascript
   const team = MGPetTeam.getAllTeams()[0];
   console.log('Pets:', MGPetTeam.getPetsForTeam(team));
   console.log('Is full:', MGPetTeam.isTeamFull(team));
   console.log('Empty slots:', MGPetTeam.getEmptySlots(team));
   console.log('Filled slots:', MGPetTeam.getFilledSlotCount(team));
   ```
3. Verify output matches team state

**Expected duration:** 10 minutes

---

## Dependencies

### Task Dependency Graph

```
Group A (UI Refinements) - Independent
├── Task 1: Rename header
├── Task 2: Food format
├── Task 3: Remove dividers
├── Task 4: Keep icons (no-op)
├── Task 5: Footer colors
├── Task 6: Header colors
└── Task 7: Simplify header

Group B (Layout Optimization) - Requires Group A
├── Task 8: Rename STR (requires Task 3)
├── Task 9: Move STR up (requires Task 8)
├── Task 10: STR format (requires Tasks 8-9)
├── Task 11: Mini progress bar (requires Tasks 8-10)
├── Task 12: Remove STR row (requires Tasks 8-11)
└── Task 13: Stats start with Next STR (auto-complete from Task 12)

Group C (Base Template) - Requires Groups A+B
├── Task 14: Create BasePetCard.ts
├── Task 15: Create basePetCard.css.ts
├── Task 16: Refactor TeamXpPanel (requires Tasks 14-15)
└── Task 17: Test template (requires Task 16)

Group D (Helper Functions) - Independent
├── Task 18: getPetsForTeam
├── Task 19: isTeamFull (requires Task 18)
├── Task 20: getEmptySlots (requires Task 19)
├── Task 21: getFilledSlotCount (requires Task 20)
└── Task 22: Update exports (auto-complete from Tasks 18-21)
```

---

## Summary

**Total Tasks:** 22
**Total Estimated Time:** 8-12 hours
**Files to Create:** 2
**Files to Modify:** 6

**Deliverables:**
1. Polished XP Tracker with improved visual design
2. Optimized layout with better information density
3. Reusable BasePetCard component for Phase 2
4. Enhanced MGPetTeam API with utility helpers

**Next Phase:** Phase 2 - Pet Compare View (separate document)

---

## Implementation Notes

1. **Commit Strategy:**
   - Commit after each checkpoint (4 commits total)
   - Use descriptive commit messages referencing task numbers

2. **Rollback Plan:**
   - Each group is independently reversible
   - If Group C fails, can revert to Checkpoint B
   - Groups A and D are non-breaking

3. **Performance Considerations:**
   - Base template adds minimal overhead
   - No impact on rendering performance
   - Helper functions are O(1) or O(n) where n=3 (max pets per team)

4. **Browser Compatibility:**
   - All CSS uses standard properties
   - No experimental features
   - Should work in all modern browsers

---

**Document Version:** 1.0
**Last Updated:** 2026-01-07
**Author:** Phase 1 Implementation Team
