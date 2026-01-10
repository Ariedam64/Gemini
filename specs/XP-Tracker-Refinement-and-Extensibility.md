# XP Tracker Refinement & Pet Feature Extensibility Plan

**Project:** GEMINI Mod
**Status:** Planning (Requires User Interview)
**Created:** 2026-01-07
**Feature Type:** UI Refinement + Architecture Enhancement

---

## Executive Summary

The XP tracker is currently implemented and working well, displaying inline within the Pets section. This spec addresses:

1. **Immediate UI refinements** based on developer feedback
2. **Future-proofing architecture** for additional pet-related features
3. **Extensible display system** for user-customizable feature visibility
4. **Backend intelligence** for team purpose detection

---

## Current State (What's Working)

### ✅ Fully Implemented XP Tracker

**Location:** `src/features/xpTracker/`, `src/ui/sections/Pets/parts/TeamXpPanel.ts`

**Features:**
- XP calculations (base 3600 XP/hr + boost abilities)
- Team-specific XP data display
- Expandable panels in Pets section
- Auto-updates every 3 seconds
- Max 5 expanded teams (FIFO)
- Pet sprites with mutations
- Progress bars and time/feed estimates
- XP Boost detection (I/II/III, Snowy)
- Supporting feeds for max-STR boosters
- Weather-aware boost calculations

**Data Structure (petTeam.getTeam):**
```typescript
{
  "id": "bf2c2dcc-0107-45a0-a781-821eac7ef5f3",
  "name": "New Team (1)",
  "petIds": [
    "6a4a2de8-021c-49f2-be50-7b282af25ba7",
    "cc4d3871-d013-4d48-82e9-0d9547b0a4d3",
    "57f5d46f-bf08-49b1-b81b-ceabdb60dfae"
  ],
  "createdAt": 1767571626362,
  "updatedAt": 1767646822854
}
```

**Public API (MGXPTracker):**
```typescript
{
  init, isReady, destroy,
  loadConfig, saveConfig, updateConfig, isEnabled, setEnabled,
  getAllPetsProgress, getActivePetsProgress, getCombinedBoostStats,
  getFilteredPets, refresh, startAutoUpdate, stopAutoUpdate,
  sortPets, filterAndSortPets
}
```

**Public API (MGPetTeam):**
```typescript
{
  init, destroy, isEnabled, setEnabled,
  createTeam, updateTeam, deleteTeam, renameTeam,
  getTeam, getAllTeams, getTeamByName, reorderTeams,
  getActiveTeamId, setActiveTeamId, isActiveTeam, activateTeam
}
```

---

## Part 1: Immediate UI Refinements (Developer Feedback)

### Refinement 1: Rename Card Title ✅ SIMPLE
**Issue:** "Team XP Tracker" is redundant since we're already in the Team tab

**File:** `src/ui/sections/Pets/parts/TeamXpPanel.ts`
**Line:** 122
**Change:**
```typescript
// Before
<span>Team XP Tracker</span>

// After
<span>XP Tracker</span>
```

---

### Refinement 2: Food Requirement Formatting ✅ SIMPLE
**Issue:** `🍖:1` format looks cramped, prefer `🍖 x1`

**File:** `src/ui/sections/Pets/parts/TeamXpPanel.ts`
**Line:** 322
**Change:**
```typescript
// Before
<span class="xp-progress-row__feeds">(🍖: ${feeds})</span>

// After
<span class="xp-progress-row__feeds">(🍖 x${feeds})</span>
```

---

### Refinement 3: Card Divider Lines (Optional) 🔍 REVIEW
**Issue:** Horizontal separator lines inside cards may be too busy

**File:** `src/ui/sections/Pets/parts/teamXpPanel.css.ts`
**Lines:** 302-303
**Current:**
```css
.xp-stats-table__row {
    border-bottom: 1px solid var(--border);
}
```

**Options:**
- **A. Remove all dividers** - cleaner but less structured


**User Decision Required:** Which option do you prefer?

---

### Refinement 4: Pet Ability Icons ✅ KEEP AS-IS
**Feedback:** Current ability icons look good and bring variety

**Current Implementation:**
- XP Boost badges: `⚡I`, `⚡II`, `⚡III`, `❄` (Snowy)
- MAX badge for max-strength pets
- STARVING badge for hungry pets

**Action:** No changes needed - keep current implementation

---

### Refinement 5: XP Booster Footer Styling 🎨 THEME UPDATE
**Issue:** Footer colors don't match theme

**File:** `src/ui/sections/Pets/parts/teamXpPanel.css.ts`
**Lines:** 481-528

**Current (Problematic):**
```css
.xp-panel__footer {
    background: linear-gradient(90deg, var(--soft), var(--muted));
}

.xp-panel__footer-icon {
    color: var(--mut-gold);
}

.xp-panel__footer-title {
    color: var(--mut-ambercharged);
}

.xp-panel__footer-detail {
    color: var(--mut-gold);
}
```

**Problems:**
- Using mutation-specific colors (`--mut-gold`, `--mut-ambercharged`) for non-mutation context
- Gradient doesn't match header gradient pattern
- Stands out too much from theme

**Proposed Fix:**
```css
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
    font-size: 12px;
}
```

**Rationale:**
- Use semantic theme colors that adapt to all themes
- `--accent` for the icon (highlights active state)
- `--fg` for main text (readable in all themes)
- `--pill-to` for bonus XP (subtle emphasis)
- `--muted` for pet names (de-emphasize)

---

### Refinement 6: Header Styling & Simplification 🎨 THEME UPDATE
**Issue:**
1. Header colors should match theme better
2. Don't show base XP + boost calculation - just display final total

**File:** `src/ui/sections/Pets/parts/TeamXpPanel.ts`
**Lines:** 114-135

**Current Implementation (Too Verbose):**
```typescript
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
```

**Proposed Simplification:**
```typescript
<div class="xp-panel__header-rate">
    <span class="xp-panel__rate-label">XP Rate:</span>
    <span class="xp-panel__rate-total">${summary.totalXpPerHour.toLocaleString()} XP/hr</span>
    ${hasBoost ? `<span class="xp-panel__rate-boost-indicator">⚡</span>` : ''}
</div>
```

**Rationale:**
- User doesn't need to see the math breakdown in the header
- A simple boost indicator (⚡) shows boosts are active
- Cleaner, less cluttered
- Individual pet cards still show detailed boost stats

**File:** `src/ui/sections/Pets/parts/teamXpPanel.css.ts`
**Lines:** 47-108

**Current Header Styles (Problematic):**
```css
.xp-panel__header {
    background: linear-gradient(90deg, var(--soft), var(--muted));
}

.xp-panel__header-title {
    color: var(--pill-to);
}

.xp-panel__rate-bonus {
    color: var(--mut-gold);
}

.xp-panel__rate-total {
    background: linear-gradient(135deg, var(--pill-from), var(--pill-to));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
```

**Proposed Header Styles (Theme-Consistent):**
```css
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

.xp-panel__rate-label {
    color: var(--muted);
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

**Rationale:**
- Simpler gradient that matches panel background
- Standard theme colors throughout
- Boost indicator uses `--accent` (adapts to all themes)
- No gradient text (can cause rendering issues in some browsers)

---

### Refinement 7: Merge List Item + XP Card (Advanced) 🏗️ REFACTOR

**Issue:** Currently two separate components (TeamListItem + TeamXpPanel). Could be merged into single expandable component.

**Current Architecture:**
```
TeamCardPart
├─ TeamListItem (collapsed state)
│  └─ Team name, pets, expand button
└─ TeamXpPanel (expanded state)
   └─ XP tracking data
```

**Proposed Architecture:**
```
TeamCardPart
└─ ExpandableTeamCard (single component)
   ├─ Collapsed View: Team name, pets, expand button, progress badge
   └─ Expanded View: XP tracking data (inline)
```

**Benefits:**
- Single component = cleaner state management
- Smoother animations (no separate DOM insertion)
- Easier to maintain and extend
- Better encapsulation

**Drawbacks:**
- Requires significant refactoring
- May break existing drag-and-drop logic
- More complex component internals

**Files to Refactor:**
- `src/ui/components/TeamListItem/TeamListItem.ts` - Merge into new component
- `src/ui/sections/Pets/parts/TeamXpPanel.ts` - Integrate as expanded state
- `src/ui/sections/Pets/parts/TeamCard.ts` - Update to use new component

**User Decision Required:** Is this refactoring worth the effort? The current two-component system works well.
User Response: so what the note here is talking about is simply the 'expand button' and 'expand feature', previously, when a pet team was clicked there was no option or possibility to expand it at all. when i added the xp tracker features to this Pets section, i put a small expand button that drops/expands a table BELOW. essentially exactly what the xp tracker pet team dropdown does but without the xp tracker info, just a completely base template to input information/displays/features. so if i were to click the expand button using this template on a pet team, it would just expand with no text or info apart from the pet sprite,name and STR (image/png provided in specs repo called templateexample) just tighten the positioning of the name, STR, and sprite to each other

---

### Refinement 8: Easy-to-Use Functions in index.ts ✅ API ENHANCEMENT

**Issue:** Other developers need clarity on what functions are available and how to use them

**Current State:**
- ✅ MGPetTeam has clear API in `src/features/petTeam/index.ts`
- ✅ MGXPTracker has clear API in `src/features/xpTracker/index.ts`
- ✅ Both export team-specific calculators: `calculateTeamXpData`, `calculateTeamProgressPercent`

**Gaps:**
- No helper for "get pets from team"
- No helper for "check if team is for XP farming"
- No helper for "get team stats summary"

**Proposed Additions to MGPetTeam:**
```typescript
// src/features/petTeam/logic/pets.ts (NEW FILE)
import { Globals } from '../../../globals';
import type { PetTeam } from '../types';

/**
 * Get full pet data for a team's pet IDs
 * Returns UnifiedPet objects for each non-empty slot
 */
export function getPetsForTeam(team: PetTeam): UnifiedPet[] {
  const myPets = Globals.myPets.get();

  return team.petIds
    .filter(id => id !== '')
    .map(id => myPets.all.find(p => p.id === id))
    .filter(Boolean) as UnifiedPet[];
}

/**
 * Check if team has all slots filled
 */
export function isTeamFull(team: PetTeam): boolean {
  return team.petIds.every(id => id !== '');
}

/**
 * Get empty slot indices for a team
 */
export function getEmptySlots(team: PetTeam): number[] {
  return team.petIds
    .map((id, index) => id === '' ? index : -1)
    .filter(index => index !== -1);
}

/**
 * Count filled slots in a team
 */
export function getFilledSlotCount(team: PetTeam): number {
  return team.petIds.filter(id => id !== '').length;
}
```

**Add to MGPetTeam exports:**
```typescript
// src/features/petTeam/index.ts
import * as PetLogic from './logic/pets';

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

## Part 2: Future-Proofing Architecture

### The Big Picture: Multiple Pet Features

**Planned Features (from user feedback, these are very rough examples so dont focus on these as actual features too much, more so futureproofing FOR future features/expansions):**
1. ✅ **XP Tracker** - Current STR, time/feeds to max, XP boost stats
2. 🔮 **Turtle Timer** - Track turtle hatch times and optimal feeding schedules
3. 🔮 **Ability/Value Tracker** - Track pet abilities and their effectiveness
4. 🔮 **Crop Size Boost Tracker** - Track crop size boost pets and their impact
5. 🔮 **Mutation Tracker** - Track mutation probabilities and rare mutations
6. 🔮 **Hunger Timer** - Track when pets will starve
7. 🔮 **Earnings Calculator** - Track passive coin generation from pets



**Challenge:** How do we display all these features without overwhelming the user?

---

### Proposed Solution: Modular Feature Panel System (can we somehow create an example or concept that i can see that represents this more clearly before full implementation)

#### Architecture Overview

```
TeamCard (Pets Section)
├─ TeamListItem (collapsed)
│  ├─ Team name
│  ├─ Pet sprites
│  ├─ Active indicator
│  ├─ Expand button
│  └─ Summary badges (configurable)
│     ├─ XP Progress Badge (67% to max)
│     ├─ Turtle Timer Badge (3 hatching soon)
│     └─ Ability Badge (2 XP Boost active)
│
└─ FeaturePanel (expanded)
   ├─ Feature Tab Bar (user can toggle which features to show)
   │  ├─ [XP] Tab (active)
   │  ├─ [Turtles] Tab
   │  ├─ [Abilities] Tab
   │  └─ [Crops] Tab
   │
   └─ Active Feature View
      └─ TeamXpPanel (currently visible)
         or TeamTurtlePanel
         or TeamAbilityPanel
         or TeamCropPanel
```

#### Core Concept: Feature Registry

**File:** `src/ui/sections/Pets/parts/featurePanels/registry.ts` (NEW)

```typescript
/**
 * Feature Panel Registry
 * Extensible system for adding new pet team feature displays
 */

import type { PetTeam } from '../../../../../features/petTeam';

export interface FeaturePanelDefinition {
  /** Unique feature ID */
  id: string;

  /** Display name in tab */
  label: string;

  /** Icon/emoji for tab */
  icon: string;

  /** Feature is available (check if enabled) */
  isAvailable: () => boolean;

  /** Calculate summary data for collapsed badge */
  getSummary: (team: PetTeam) => FeatureSummary | null;

  /** Build the expanded panel DOM */
  buildPanel: (team: PetTeam, container: HTMLElement) => FeaturePanelInstance;
}

export interface FeatureSummary {
  /** Badge text (e.g., "67%", "3 hatching") */
  text: string;

  /** Badge color class (e.g., "low", "medium", "high") */
  colorClass?: string;

  /** Tooltip on hover */
  tooltip?: string;
}

export interface FeaturePanelInstance {
  /** Update panel with new data */
  update: (team: PetTeam) => void;

  /** Cleanup panel */
  destroy: () => void;
}
```

**Register Features:**

```typescript
// src/ui/sections/Pets/parts/featurePanels/xpFeature.ts
import { MGXPTracker, calculateTeamXpData, calculateTeamProgressPercent } from '../../../../../features/xpTracker';
import { TeamXpPanel } from '../TeamXpPanel';

export const xpFeature: FeaturePanelDefinition = {
  id: 'xp',
  label: 'XP',
  icon: '📊',

  isAvailable: () => MGXPTracker.isEnabled(),

  getSummary: (team) => {
    const progress = calculateTeamProgressPercent(team.id);
    return {
      text: `${Math.round(progress)}%`,
      colorClass: progress < 33 ? 'low' : progress < 67 ? 'medium' : 'high',
      tooltip: `Average progress to max STR: ${Math.round(progress)}%`
    };
  },

  buildPanel: (team, container) => {
    const panel = new TeamXpPanel({ teamId: team.id });
    container.appendChild(panel.build());

    const xpData = calculateTeamXpData(team.id);
    if (xpData) panel.update(xpData);

    return {
      update: (updatedTeam) => {
        const newData = calculateTeamXpData(updatedTeam.id);
        if (newData) panel.update(newData);
      },
      destroy: () => panel.destroy()
    };
  }
};
```

```typescript
// src/ui/sections/Pets/parts/featurePanels/turtleFeature.ts (FUTURE)
export const turtleFeature: FeaturePanelDefinition = {
  id: 'turtle',
  label: 'Turtles',
  icon: '🐢',

  isAvailable: () => MGTurtleTracker.isEnabled(), // When implemented

  getSummary: (team) => {
    const turtles = getTurtlesInTeam(team);
    const hatchingSoon = turtles.filter(t => t.hoursUntilHatch < 2);

    if (hatchingSoon.length === 0) return null;

    return {
      text: `${hatchingSoon.length} hatching`,
      colorClass: 'medium',
      tooltip: `${hatchingSoon.length} turtle(s) hatching in < 2 hours`
    };
  },

  buildPanel: (team, container) => {
    // Build turtle panel (to be implemented)
    return { update: () => {}, destroy: () => {} };
  }
};
```

```typescript
// src/ui/sections/Pets/parts/featurePanels/index.ts
import { xpFeature } from './xpFeature';
import { turtleFeature } from './turtleFeature';
import { abilityFeature } from './abilityFeature';
import { cropFeature } from './cropFeature';

/**
 * All registered feature panels
 * Order determines tab order in UI
 */
export const FEATURE_PANELS: FeaturePanelDefinition[] = [
  xpFeature,
  turtleFeature,
  abilityFeature,
  cropFeature,
];

/**
 * Get available features (user has them enabled)
 */
export function getAvailableFeatures(): FeaturePanelDefinition[] {
  return FEATURE_PANELS.filter(f => f.isAvailable());
}
```

---

### User Preferences: Which Features to Display (again we will have to see what the visual concepts look like because ideally the system should be smart enough to KNOW what the user wants to see, based off predefined rules that i can create + theyre current state of multiple variables like their garden, pets, coins, so many metrics to see 'what stage of the game' or what stats should be appropriately displayed (potentially even planning < >  buttons on the individual pets expanded cards to switch to a different stat view, all while keeping it as minimalist/visually represented but useful as possible)

**New Config in Pets Section State:**

```typescript
// src/ui/sections/Pets/state.ts
interface PetsSectionState {
  // ... existing state

  /** Which feature to show when expanding a team (default: first available) */
  defaultExpandedFeature: string; // 'xp' | 'turtle' | 'ability' | 'crop'

  /** Which features to show badges for when collapsed */
  collapsedBadges: string[]; // ['xp', 'turtle']

  /** Tab history: which feature was last viewed per team */
  teamFeatureHistory: Record<string, string>; // { teamId: featureId }
}
```

**User Settings Panel:**
```
Pets Section Settings:
─────────────────────────────────────
Default Feature Tab: [XP ▼]
  └─ Which feature to show when expanding teams

Collapsed Badges: [Configure...]
  ☑ XP Progress
  ☑ Turtle Timers
  ☐ Ability Stats
  ☐ Crop Boosts
  └─ Which badges to show on collapsed teams

Remember Last Tab: [✓] (per team)
  └─ Open teams to the last feature you viewed
```

---

### Team Purpose Detection (Backend Rules) 

**Goal:** Automatically detect what a team is for and show relevant features first
User requirement: i think the best way to do this is for you to list ALL the pet abilities in the game from C:\Users\ryand\Feeder-Extension\Gemini-main\Gemini-main\GameSourceFiles\gg-preview-pr-2329-router.magiccircle.workers.dev and group the similarly named/tiered ones together and display each and every one and i will then categorise ALL of them for you and provide more info, just ensure you have a good understanding of what they do/how they function etc from the game source files, this will take you a long time, just dont stop until its done
**File:** `src/features/petTeam/logic/purpose.ts` (NEW)

```typescript
/**
 * Team Purpose Detection
 * Analyzes team composition to infer purpose
 */

import type { PetTeam } from '../types';
import { getPetsForTeam } from './pets';
import { hasXpBoostAbility } from '../../xpTracker/logic/xpBoost';

export type TeamPurpose =
  | 'xp-farming'        // All XP boost pets or leveling pets
  | 'turtle-hatching'   // Contains turtles
  | 'crop-farming'      // Crop boost pets
  | 'coin-farming'      // Passive coin generation pets
  | 'balanced'          // Mixed purpose
  | 'unknown';          // Can't determine

export interface TeamPurposeAnalysis {
  primary: TeamPurpose;
  confidence: number;        // 0-1
  suggestedFeatures: string[]; // ['xp', 'turtle', 'crop']
  reasons: string[];           // Human-readable explanation
}

/**
 * Analyze team composition to infer purpose
 */
export function detectTeamPurpose(team: PetTeam): TeamPurposeAnalysis {
  const pets = getPetsForTeam(team);

  if (pets.length === 0) {
    return {
      primary: 'unknown',
      confidence: 0,
      suggestedFeatures: [],
      reasons: ['Team has no pets']
    };
  }

  const reasons: string[] = [];
  const scores: Partial<Record<TeamPurpose, number>> = {};

  // XP Farming Detection
  const xpBoostPets = pets.filter(p => hasXpBoostAbility(p.abilities));
  const levelingPets = pets.filter(p => !p.isMature);

  if (xpBoostPets.length >= 2) {
    scores['xp-farming'] = 0.9;
    reasons.push(`${xpBoostPets.length} XP boost pets`);
  } else if (xpBoostPets.length === 1 && levelingPets.length >= 1) {
    scores['xp-farming'] = 0.7;
    reasons.push('1 XP boost pet with leveling pets');
  } else if (levelingPets.length >= 2) {
    scores['xp-farming'] = 0.5;
    reasons.push(`${levelingPets.length} pets leveling`);
  }

  // Turtle Hatching Detection
  const turtlePets = pets.filter(p => p.petSpecies === 'Turtle');
  if (turtlePets.length >= 2) {
    scores['turtle-hatching'] = 0.8;
    reasons.push(`${turtlePets.length} turtles`);
  } else if (turtlePets.length === 1) {
    scores['turtle-hatching'] = 0.4;
    reasons.push('1 turtle');
  }

  // Crop Farming Detection
  const cropBoostAbilities = [
    'CropSizeBoost1', 'CropSizeBoost2', 'CropSizeBoost3',
    'CropYieldBoost', 'FastGrowth'
  ];
  const cropBoostPets = pets.filter(p =>
    p.abilities.some(a => cropBoostAbilities.includes(a))
  );

  if (cropBoostPets.length >= 2) {
    scores['crop-farming'] = 0.8;
    reasons.push(`${cropBoostPets.length} crop boost pets`);
  } else if (cropBoostPets.length === 1) {
    scores['crop-farming'] = 0.4;
    reasons.push('1 crop boost pet');
  }

  // Coin Farming Detection (placeholder - need to identify coin abilities)
  // TODO: Implement when coin farming abilities are identified

  // Determine primary purpose
  const sortedPurposes = Object.entries(scores)
    .sort(([, a], [, b]) => b - a);

  if (sortedPurposes.length === 0) {
    return {
      primary: 'balanced',
      confidence: 0.3,
      suggestedFeatures: ['xp'], // Default to XP if can't determine
      reasons: ['Mixed purpose team']
    };
  }

  const [primary, confidence] = sortedPurposes[0] as [TeamPurpose, number];

  // Map purpose to suggested features
  const featureMap: Record<TeamPurpose, string[]> = {
    'xp-farming': ['xp'],
    'turtle-hatching': ['turtle', 'xp'],
    'crop-farming': ['crop', 'xp'],
    'coin-farming': ['coin', 'xp'],
    'balanced': ['xp', 'ability'],
    'unknown': ['xp']
  };

  return {
    primary,
    confidence,
    suggestedFeatures: featureMap[primary] || ['xp'],
    reasons
  };
}
```

**Add to MGPetTeam API:**
```typescript
// src/features/petTeam/index.ts
import * as PurposeLogic from './logic/purpose';

export const MGPetTeam = {
  // ... existing exports

  // Purpose Detection
  detectTeamPurpose: PurposeLogic.detectTeamPurpose,
} as const;

export type { TeamPurpose, TeamPurposeAnalysis } from './logic/purpose';
```

**Usage in TeamCard:**
```typescript
// When expanding a team, use purpose detection to show relevant feature first
const purpose = MGPetTeam.detectTeamPurpose(team);

// If user hasn't set a preference, use suggested features
const featureToShow = userPreference
  || teamFeatureHistory[team.id]
  || purpose.suggestedFeatures[0]
  || 'xp';
```

---

## Part 3: Display Management System (we are going to have to properly explore and plan for my previous comments in the doc before i can effectively make a decision on this because its subject to change + needs visual representation)

### User Control Over Feature Visibility

**Challenge:** With 5-7 features, showing all of them would be overwhelming

**Solution:** Let users choose which features to display

#### A. Global Feature Toggle (Settings)

```
Settings > Pets Section:
─────────────────────────────────────
Available Features:
  ☑ XP Tracker
  ☑ Turtle Timer
  ☐ Ability Tracker
  ☐ Crop Boost Tracker
  ☐ Mutation Tracker
  ☐ Hunger Timer
  ☐ Earnings Calculator

Note: Only enabled features will appear in team panels
```

#### B. Per-Team Feature Tabs

When a team is expanded, show tabs for enabled features:

```
[Team Name] (expanded)
─────────────────────────────────────
[📊 XP] [🐢 Turtles] [⚡ Abilities]
─────────────────────────────────────
(Current tab content here)
```

User can click tabs to switch between features without collapsing the panel.

#### C. Collapsed Badge Selection

When team is collapsed, show configurable summary badges:

```
[Team Name]
[Pet 1] [Pet 2] [Pet 3]  [67% max] [3 hatching] [▶]
                         └─ XP     └─ Turtles   └─ Expand
```

**Config:**
```typescript
interface CollapsedBadgeConfig {
  /** Which features to show badges for */
  enabledBadges: string[]; // ['xp', 'turtle']

  /** Maximum number of badges to show */
  maxBadges: number; // Default: 3

  /** Hide badge if no data (e.g., no turtles in team) */
  hideEmpty: boolean; // Default: true
}
```

---

## Part 4: Implementation Roadmap

### Phase 1: Immediate UI Refinements (2-3 hours)

**Goal:** Address all developer feedback for current XP tracker

1. ✅ Rename "Team XP Tracker" to "XP Tracker"
2. ✅ Change food formatting from `🍖:1` to `🍖 x1`
3. 🔍 Review card divider lines (user decision)
4. ✅ Keep pet ability icons as-is (no changes)
5. 🎨 Fix XP booster footer styling (theme-compatible colors)
6. 🎨 Fix header styling (simplify to show final total only)
7. 🏗️ Merge list item + XP card (user decision - optional refactor)
8. ✅ Add helper functions to MGPetTeam for team pets

**Files to Modify:**
- `src/ui/sections/Pets/parts/TeamXpPanel.ts` (refinements 1, 2, 6)
- `src/ui/sections/Pets/parts/teamXpPanel.css.ts` (refinements 3, 5, 6)
- `src/features/petTeam/logic/pets.ts` (NEW - helper functions)
- `src/features/petTeam/index.ts` (export helpers)

**Testing:**
- Test with all 8 themes
- Test with different team sizes (1-3 pets)
- Test with edge cases (starving, max STR, XP boost)
- Test responsive design on mobile

---

### Phase 2: Architecture Foundation (4-6 hours)

**Goal:** Build extensible feature panel system

1. Create feature panel registry system
2. Refactor XP tracker to use new system
3. Add team purpose detection logic
4. Add user preference storage for feature tabs
5. Build tab navigation UI
6. Add collapsed badge configuration

**New Files:**
- `src/ui/sections/Pets/parts/featurePanels/registry.ts`
- `src/ui/sections/Pets/parts/featurePanels/xpFeature.ts`
- `src/ui/sections/Pets/parts/featurePanels/index.ts`
- `src/features/petTeam/logic/purpose.ts`
- `src/features/petTeam/logic/pets.ts`

**Modified Files:**
- `src/ui/sections/Pets/parts/TeamCard.ts` (integrate feature tabs)
- `src/ui/sections/Pets/state.ts` (add feature preferences)
- `src/features/petTeam/index.ts` (export purpose detection)

**Testing:**
- Test tab switching
- Test purpose detection accuracy
- Test preference persistence
- Test multiple teams with different features

---

### Phase 3: Future Feature Scaffolding (2-3 hours)

**Goal:** Prepare for future features with placeholders

1. Create stub feature panel definitions:
   - Turtle Timer Feature
   - Ability Tracker Feature
   - Crop Boost Tracker Feature
2. Add feature toggle UI to settings
3. Add "Coming Soon" state for unimplemented features

**New Files:**
- `src/ui/sections/Pets/parts/featurePanels/turtleFeature.ts` (stub)
- `src/ui/sections/Pets/parts/featurePanels/abilityFeature.ts` (stub)
- `src/ui/sections/Pets/parts/featurePanels/cropFeature.ts` (stub)

**Testing:**
- Test feature enable/disable
- Test "Coming Soon" message display
- Test tab appearance when features are disabled

---

### Phase 4: Documentation (1-2 hours)

**Goal:** Document new architecture for future developers

1. Update CHANGELOG.md with all changes
2. Create architecture diagram for feature panel system
3. Document how to add new feature panels
4. Add JSDoc comments to all new functions
5. Create user guide for feature customization

**Files:**
- `CHANGELOG.md` (update)
- `specs/Feature-Panel-System.md` (NEW - architecture guide)
- `specs/Adding-New-Pet-Features.md` (NEW - developer guide)

---

## Part 5: User Interview Questions

Before implementation, we need your decisions on:

### Critical Decisions (Must Answer)

**1. Card Divider Lines**
- [ ] A. Remove all dividers (cleaner but less structured) - yes
- [ ] B. Keep dividers (current state)
- [ ] C. Lighter dividers (opacity: 0.3)
- [ ] D. Dividers only between pets, not between stat rows

**2. Merge TeamListItem + TeamXpPanel?** - read my new notes in this doc before i can answer
- [ ] Yes, merge into single ExpandableTeamCard component (4-6 hour refactor)
- [ ] No, keep current two-component system (works well as-is)

**3. Phase 2 Architecture (Feature Panel System)**- read my new notes in this doc before i can answer
- [ ] Yes, implement now (future-proof for multiple features)
- [ ] No, wait until we actually need more features (YAGNI)
- [ ] Partial (just add stub for 1-2 features, full system later)

**4. Team Purpose Detection**- read my new notes in this doc before i can answer
- [ ] Yes, implement auto-detection (smart defaults)
- [ ] No, user manually chooses (simpler)
- [ ] Suggest but let user override

### Optional Preferences

**5. Default Collapsed Badges**- read my new notes in this doc before i can answer
Which badges should show by default when teams are collapsed?
- [ ] XP Progress only (minimal)
- [ ] XP Progress + Turtle Timer
- [ ] XP Progress + Turtle Timer + Ability Stats
- [ ] User configures in settings

**6. Feature Tab Position** - read my new notes in this doc before i can answer but what is this feature tab you talk off? the one thats in the header just like auto favorite or test or settings? that needs to stay there as is
Where should feature tabs appear when team is expanded?
- [ ] Top of panel (header area)
- [ ] Bottom of panel (footer area)
- [ ] Sidebar (left of content)

**7. Theme Colors Priority**
For refinements 5 & 6, which theme compatibility approach?
- [ ] Option A: Proposed theme-semantic colors (--accent, --fg, --pill-to) -  yes
- [ ] Option B: Keep gold colors but make them theme-aware
- [ ] Option C: Different approach (specify)

---

## Part 6: Philosophy vs Implementation (QPM Comparison)

**User Request:** Look at QPM for philosophy/ideas only, not implementation

### QPM Lessons to Apply

**✅ Good Philosophy from QPM:**
1. **Pet Optimizer Logic** - Team composition analysis for optimal XP/farming
2. **Purpose-Based Teams** - Detecting team intent (XP, coins, crops, etc.)
3. **Multi-Metric Display** - Showing different stats depending on team purpose

**❌ Avoid from QPM:**
1. **Implementation details** - Gemini has different architecture
2. **UI patterns** - Gemini uses Shadow DOM, theme system, component structure
3. **Code style** - QPM may have technical debt, we want clean implementation

### How We'll Apply QPM Philosophy

**Team Purpose Detection:**
- QPM Idea: "Analyze team to determine purpose"
- Gemini Implementation: `detectTeamPurpose()` function with confidence scores
- Different: We use Gemini's type system, globals, and feature pattern

**Extensible Display:**
- QPM Idea: "Show relevant metrics based on team type"
- Gemini Implementation: Feature panel registry with conditional display
- Different: We use Gemini's component system and theme variables

**Pet Helpers:**
- QPM Idea: "Easy access to team pet data"
- Gemini Implementation: `MGPetTeam.getPetsForTeam()` and helpers
- Different: We integrate with Gemini's Globals and types

---

## Success Criteria

### Immediate Refinements (Phase 1)
- [ ] "XP Tracker" title (not "Team XP Tracker")
- [ ] Food formatting uses `x` (not `:`)
- [ ] Divider lines match user preference
- [ ] Header shows final total only (simplified)
- [ ] Footer uses theme-compatible colors
- [ ] All 8 themes look correct
- [ ] No console errors
- [ ] Helper functions accessible via MGPetTeam

### Architecture (Phase 2+)
- [ ] Feature panel registry is extensible
- [ ] XP tracker works through new system
- [ ] Team purpose detection is accurate
- [ ] User can configure feature visibility
- [ ] Tab navigation works smoothly
- [ ] Preferences persist correctly
- [ ] Performance remains good (no lag)
- [ ] Documentation is clear for future features

---

## Next Steps

1. **User Interview** - Answer critical decisions above
2. **Review This Spec** - Ensure all requirements are captured
3. **Approval** - Confirm this plan aligns with vision
4. **Implementation** - Execute phases in order
5. **Testing** - Verify each phase before moving to next
6. **Documentation** - Update docs as we build

---

## Appendix: File Structure After All Phases

```
src/
├── features/
│   ├── petTeam/
│   │   ├── index.ts (✅ enhanced with helpers + purpose detection)
│   │   ├── types.ts
│   │   ├── state.ts
│   │   └── logic/
│   │       ├── team.ts
│   │       ├── active.ts
│   │       ├── pets.ts (🆕 helper functions)
│   │       └── purpose.ts (🆕 team purpose detection)
│   │
│   ├── xpTracker/
│   │   ├── index.ts (✅ already exports team functions)
│   │   ├── types.ts
│   │   ├── state.ts
│   │   └── logic/
│   │       ├── xpBoost.ts
│   │       ├── xpCalculations.ts
│   │       ├── feedCalculations.ts
│   │       ├── teamXpCalculations.ts
│   │       └── sorting.ts
│   │
│   ├── turtleTracker/ (🔮 future)
│   ├── abilityTracker/ (🔮 future)
│   └── cropTracker/ (🔮 future)
│
└── ui/
    └── sections/
        └── Pets/
            ├── section.ts
            ├── state.ts (✨ enhanced with feature preferences)
            └── parts/
                ├── TeamCard.ts (✨ enhanced with feature tabs)
                ├── TeamListItem.ts (✨ enhanced with badges or merged)
                ├── TeamXpPanel.ts (✨ refined UI)
                ├── teamXpPanel.css.ts (✨ refined styles)
                │
                └── featurePanels/ (🆕 Phase 2)
                    ├── registry.ts (🆕 feature panel system)
                    ├── index.ts (🆕 exports all features)
                    ├── xpFeature.ts (🆕 XP tracker integration)
                    ├── turtleFeature.ts (🔮 future/stub)
                    ├── abilityFeature.ts (🔮 future/stub)
                    └── cropFeature.ts (🔮 future/stub)
```

**Legend:**
- ✅ Already exists, working
- ✨ Exists, needs refinement
- 🆕 New file to create
- 🔮 Future/placeholder

---

## Summary for User

This spec provides:

1. ✅ **Immediate refinements** for current XP tracker (developer feedback)
2. 🏗️ **Extensible architecture** for future pet features (turtle timers, abilities, etc.)
3. 🎯 **Smart defaults** via team purpose detection
4. ⚙️ **User customization** for feature visibility and display
5. 📚 **Clear roadmap** with phases and time estimates
6. 🔍 **Decisions needed** from you before we start

**What I need from you:**

Please answer the **Critical Decisions** (questions 1-4) in Part 5 so I can create a detailed implementation plan tailored to your preferences.

After your decisions, I'll create a final implementation checklist and we can begin Phase 1 refinements.
