# Growth Timers Feature Specification

**Feature Name:** Growth Timers  
**Status:** Draft - Requires User Interview  
**Created:** 2026-01-07  
**Phase:** 3 (Post Phase 1-2 Complete)

---

##  Executive Summary

Growth Timers displays real-time countdown timers and growth progress for eggs and plants/crops in the player's active pet team's area. This feature helps players optimize planting/hatching schedules by showing when eggs will hatch and when crops will mature, factoring in pet abilities that modify growth rates.

**Core Value:**
- Know exactly when eggs will hatch (600s to 86400s range = 10 min to 24 hours)
- Track plant maturation (70s to 86400s range = 1 min to 24 hours)
- Track individual crop growth within multi-harvest plants
- See impact of Egg Growth Boost and Plant Growth Boost abilities
- Plan harvest schedules for maximum efficiency

---

## Table of Contents

1. [Game Data Analysis](#1-game-data-analysis)
2. [User Requirements (Interview Required)](#2-user-requirements-interview-required)
3. [Technical Architecture](#3-technical-architecture)
4. [UI/UX Design](#4-uiux-design)
5. [Implementation Plan](#5-implementation-plan)
6. [Testing Strategy](#6-testing-strategy)
7. [Open Questions](#7-open-questions)

---

## 1. Game Data Analysis

### 1.1 Data Sources (Confirmed from Game Files)

#### Eggs - Source: `eggsDex.ts`

| Egg Type | Base Hatch Time | Coin Price | Credit Price | Spawn Species |
|----------|----------------|------------|--------------|---------------|
| CommonEgg | **600s** (10 min) | 100k | 19 | Worm, Snail, Bee |
| UncommonEgg | **3,600s** (1 hour) | 1M | 48 | Chicken, Bunny, Dragonfly |
| RareEgg | **21,600s** (6 hours) | 10M | 99 | Pig, Cow, Turkey |
| WinterEgg | **43,200s** (12 hours) | 80M | 199 | SnowFox, Stoat, WhiteCaribou |
| LegendaryEgg | **43,200s** (12 hours) | 100M | 249 | Squirrel, Turtle, Goat |
| MythicalEgg | **86,400s** (24 hours) | 1B | 599 | Butterfly, Peacock, Capybara |

**Data Structure (from game source):**
```typescript
interface EggTileObject {
  objectType: 'egg';
  eggId: EggId; // 'CommonEgg' | 'UncommonEgg' | ...
  plantedAt: number; // Unix timestamp (ms)
  maturedAt: number; // plantedAt + (secondsToHatch * 1000) * modifiers
}
```

#### Plants/Crops - Source: `floraSpeciesDex.ts`

**Sample Plant Growth Times:**
- Wheat: 70s
- Carrot: 900s (15 min)
- Tomato: 105s
- Potato: 21,600s (6 hours)
- Apple: 1,100s (~18 min)
- Strawberry: 130s
- Lychee: 43,200s (12 hours)
- Blueberry: 14,400s (4 hours)
- Pumpkin: 86,400s (24 hours)
- Corn: 1,500s (25 min)
- Rice: 1,800s (30 min)
- Cherry: 10,800s (3 hours)
- Cactus: 86,400s (24 hours)
- And many more...

**Data Structure (from `myGarden.ts`):**
```typescript
interface PlantWithTile {
  tileIndex: string;
  position: XY;
  species: FloraSpeciesId;
  plantedAt: number; // Unix timestamp (ms)
  maturedAt: number; // plantedAt + (secondsToMature * 1000) * modifiers
  isMature: boolean;
  slots: GrowSlot[]; // Multi-harvest crops
  slotsCount: number;
  matureSlotsCount: number;
}

interface GrowSlot {
  species: FloraSpeciesId;
  startTime: number; // Unix timestamp (ms)
  endTime: number; // startTime + (crop growth time * 1000) * modifiers
  targetScale: number;
  mutations: MutationId[];
}

interface CropInfo {
  tileIndex: string;
 position: XY;
  slotIndex: number;
  species: FloraSpeciesId;
  startTime: number;
  endTime: number;
  targetScale: number;
  mutations: MutationId[];
  isMature: boolean;
}
```

### 1.2 Growth Rate Modifiers

#### Egg Growth Boost Abilities
From `01-ABILITY-SYSTEM-REFERENCE.md` (**CONFIRMED**):

| Ability | Proc Rate | Time Reduction | Weather | Verification |
|---------|-----------|----------------|---------|--------------|
| EggGrowthBoost | 21% | **-7 minutes** | None | ✅ Confirmed |
| EggGrowthBoostII_NEW | 24% | **-9 minutes** | None | ✅ Confirmed |
| EggGrowthBoostII | 27% | **-11 minutes** | None | ✅ Confirmed (Tier III) |
| SnowyEggGrowthBoost | 35% | **-10 minutes** | Frost | ✅ Confirmed |

**Note:** EggGrowthBoostII was retroactively upgraded to Tier III. Proc rates are per-minute chances.

**Critical Discovery:** Time reduction is **FIXED MINUTES** per proc, NOT percentages!

**How It Works:**
```typescript
// Each successful proc reduces hatch time by fixed amount
actualHatchTime = baseHatchTime - (procCount * minutesReduction)
// Example: Mythical Egg (24h) with EggGrowthBoost I
// ~0.21 procs/min * 1440 min = ~302 procs = 302 * 7 min = 2114 min saved
// 1440 - 2114 = already hatched (negative time = instant)
```

**Questions for Interview:**
- Are these reductions applied per-proc over time or instant on placement?
- Do multiple Egg Growth Boost pets stack (additive or best tier wins)?
- Is `maturedAt` timestamp already adjusted, or calculate client-side?

#### Plant Growth Boost Abilities

| Ability | Proc Rate | Time Reduction | Weather | Verification |
|---------|-----------|----------------|---------|--------------|
| PlantGrowthBoost | 24% | **-3 minutes** | None | ✅ Confirmed |
| PlantGrowthBoostII | 27% | **-5 minutes** | None | ✅ Confirmed |
| PlantGrowthBoostIII | 30% | **-7 minutes** | None | ✅ Confirmed |
| SnowyPlantGrowthBoost | 40% | **-6 minutes** | Frost | ✅ Confirmed |

**How It Works:**
```typescript
// Same mechanic as Egg Growth - fixed minute reduction per proc
actualMatureTime = baseMatureTime - (procCount * minutesReduction)
```

**Questions for Interview:**
- Does it affect both plant maturation AND individual crop growth in slots?
- For multi-harvest plants, does each crop slot get separate boost procs?

### 1.3 Available Gemini Data Streams

#### Current Global Access (Confirmed)

**`Globals.myGarden.get()`** - Source: `src/globals/variables/myGarden.ts`

```typescript
interface MyGardenData {
  eggs: {
    all: EggWithTile[];           // All eggs in garden
    mature: EggWithTile[];         // Ready to hatch
    growing: EggWithTile[];        // Still hatching
    byType: Record<EggId, EggWithTile[]>; // Grouped by egg type
    count: number;
  };
  
  plants: {
    all: PlantWithTile[];          // All plants
    mature: PlantWithTile[];        // Fully mature plants
    growing: PlantWithTile[];       // Still maturing
    bySpecies: Record<FloraSpeciesId, PlantWithTile[]>;
    count: number;
  };
  
  crops: {
    all: CropInfo[];               // All crops in all slots
    mature: CropInfo[];             // Harvestable crops
    growing: CropInfo[];            // Still growing
    mutated: {
      all: CropInfo[];
      byMutation: Record<MutationId, CropInfo[]>;
    };
  };
}
```

**Events Available:**
- `eggPlaced` - When egg is placed
- `eggMatured` - When egg hatches
- `eggRemoved` - When egg is removed/hatched
- `plantAdded` - When plant is planted
- `plantMatured` - When plant reaches maturity
- `plantRemoved` - When plant is removed
- `cropMatured` - When individual crop slot matures
- `cropHarvested` - When crop is harvested

**`Globals.myPets.get()`** - For detecting active team abilities

```typescript
interface MyPetsData {
  byLocation: {
    active: UnifiedPet[];  // Active team (up to 3 pets)
    inventory: UnifiedPet[];
    hutch: UnifiedPet[];
  };
}

interface UnifiedPet {
  abilities: string[];  // ['PlantGrowthBoostII', 'EggGrowthBoost', ...]
  location: 'active' | 'inventory' | 'hutch';
  // ... other pet data
}
```

---

## 2. Finalized Requirements (Interview Complete ✅)

### 2.1 Core Mechanics

**Q1: Boost Timing - ANSWERED**
- ✅ **Decision:** Boosts apply **dynamically** (Option B)
- `maturedAt` timestamp is the **base time** (no boosts)
- **Client-side calculation required** for expected boost impact
- Display "estimated" completion time accounting for active team boosts

**Implementation Impact:**
```typescript
// Server provides base maturedAt
// We calculate expected reduction from active boosts:
baseTimeRemaining = item.maturedAt - now
expectedProcCount = calculateExpectedProcs(activePets, timeElapsed)
timeReduction = expectedProcCount * minutesPerProc * 60 * 1000
adjustedTimeRemaining = baseTimeRemaining - timeReduction
```

---

**Q2: Feature Scope - ANSWERED**
- ✅ **Decision:** Track items in MY garden where MY team provides boosts (Option C)
- Show ALL items in MY garden
- **Highlight/prioritize** items boosted by MY active team
- Gray out or mark items not benefiting from current team

---

**Q3: Boost Stacking - ANSWERED**
- ✅ **Decision:** Boosts stack **additively** (Option B)
- Multiple pets with same boost = multiple independent proc chances
- Example: 2 pets with PlantGrowthBoost II = ~0.54 procs/min total (0.27 each)
- Each pet's boost procs independently

---

### 2.2 Display & Location

**Q4: Display Location - ANSWERED**
- ✅ **Decision:** **BOTH** (Option C) + New Architecture!
- **Feature Panel:** Integrated in pet teams via Phase 2 registry
- **Standalone:** NEW **"Garden" tab** (mirrors Pets tab structure)
- Garden tab will house Growth Timers + future garden features

**New Architecture:**
```
Sections:
├── Pets Tab        # Existing
│   └── Feature Panels: XP Tracker, Ability Tracker, etc.
│
└── Garden Tab      # NEW - Phase 3
    └── Feature Panels: Growth Timers, Mutation Tracker, Harvest Optimizer, etc.
```

---

**Q5: UI Layout - ANSWERED**
- ✅ **Decision:** Custom hybrid format (Option D)
- **Format:** `[████░40%░░░23h 14m 32s░░] | 2:35 PM tomorrow`
- Progress bar with embedded countdown AND estimated completion time
- Compact yet information-dense
- Visual progress + precise time remaining + planning value

**Example:**
```
🥚 Mythical Egg  [████░40%░░░23h 14m 32s░░] | Tomorrow 2:35 PM  ⚡-7min
🌱 Pumpkin       [████████░░80%░░6h 02m 18s░░] | Today 8:15 PM
🍅 Tomato        [█████████░90%░░░░░45s░░░░░] | Ready soon!
```

---

**Q6: Information Shown - ANSWERED**
- ✅ **All selected:** A, B, C, D
  - ✅ Countdown timer (23h 14m 32s)
  - ✅ Estimated completion (2:35 PM tomorrow) 
  - ✅ Progress percentage (40%)
  - ✅ Boost indicator (⚡-7min/proc)

---

**Q7: Grouping - ANSWERED**
- ✅ **Decision:** Grouped by type, sorted within (Option C)
- **Groups:** "Eggs" and "Crops" (plants = crops, combined)
- **Sort:** Time remaining (soonest first) within each group
- Cleaner than "Eggs | Plants | Crops" redundancy

**Layout:**
```
=== EGGS (2 active) ===
🥚 Common Egg      [███░30%░░8m 32s░░] | 9:15 PM
🥚 Mythical Egg   [░░░░3%░░23h 14m░░] | Tomorrow 2:35 PM

=== CROPS (3 active) ===
🍅 Tomato         [█████░90%░░45s░░] | Ready soon!
🌱 Pumpkin        [████░80%░6h 02m░] | 8:15 PM
🥕 Carrot         [░░░15%░░23h 45m░] | Tomorrow 3:00 PM
```

---

**Q8: Update Frequency - ANSWERED**
- ✅ **Decision:** 5-10 seconds (Option B or C)
- **Critical:** Avoid duplication with existing systems
- Check XP Tracker's update interval
- Coordinate shared timer infrastructure if available

---

### 2.3 Feature Behavior

**Q9: Multi-Harvest Crops - ANSWERED**
- ✅ **Decision:** Show plant maturation only (Option A)
- Do NOT show individual crop slot timers
- Simpler, less cluttered
- Individual crop harvesting is separate concern

---

**Q10: Ready State - ANSWERED**
- ✅ **Decision:** Move to "Ready" section + toast (Option C + D)
- Mature items move to **"Ready to Harvest/Hatch"** section at top
- User can clear items from Ready section manually
- **In-UI toast** notification when item matures
- No browser notifications (too intrusive)

**Layout:**
```
┌─ READY TO HARVEST/HATCH (3) ──────┐
│ 🥚 Common Egg    Ready! [Clear]    │
│ 🍅 Tomato        Ready! [Clear]    │
│ 🥕 Carrot        Ready! [Clear]    │
└────────────────────────────────────┘

=== EGGS (1 active) ===
...
```

---

**Q11: Empty State - ANSWERED**
- ✅ **Decision:** Show message (Option A)
- Display: "No active timers"
- Simple, clear communication

---

**Q12: Notifications - ANSWERED**
- ✅ **Decision:** User configurable, UI toast only (Option D)
- **No browser notifications** (no permission requests)
- In-UI toast when items mature
- User can enable/disable in settings
- Toast style (non-intrusive, auto-dismiss)

---

### 2.4 Future Features

**Q13: History - ANSWERED**
- ✅ **Decision:** Expandable, collapsed by default (Option A)
- Show "Last 10 hatched eggs/harvested plants"
- Collapsed by default (no clutter)
- Expandable for reference
- Useful for tracking farming patterns

---

**Q14: Optimization Suggestions - ANSWERED**
- ✅ **Decision:** YES - with thorough planning (Option A)
- **Examples:**
  - "Plant Pumpkin now to harvest at 8 AM"
  - "Egg will hatch during sleep - consider faster egg"
  - "Current team optimizes Mythical Eggs (-11min procs)"
- **Requirements:**
  - User's system time
  - Sleep schedule preferences (configurable)
  - Team switching suggestions
  - "Optimal planting windows" calculator
- **Deferred:** Post-MVP, needs separate planning phase

---

## 3. Technical Architecture (Updated)

### 3.1 Feature Module Structure

Following Gemini standards (`.claude/rules/features.md`):

```
src/features/growthTimers/
├── index.ts                    # Public API exports
├── types.ts                    # GrowthTimer, TimerGroup, Config
├── state.ts                    # Config persistence
└── logic/
    ├── calculations.ts         # Timer math, boost detection
    ├── boostCalculator.ts      # Expected proc calculations
    ├── filtering.ts            # Sort/filter/group logic
    └── formatting.ts           # Time display formatting
```

### 3.2 Garden Tab Architecture (NEW)

```
src/ui/sections/Garden/              # NEW - Mirrors Pets
├── GardenSection.ts                 # Main section component
├── state.ts                         # Garden section state
├── garden.css.ts                    # Section styles
└── parts/
    ├── GardenHeader.ts              # Tab header
    ├── GardenRow.ts                 # Expandable rows (future)
    └── featurePanels/               # Feature registry
        ├── index.ts                 # Panel registration
        ├── registry.ts              # Panel types/utilities
        └── growthTimersPanel.ts     # Growth Timers panel
```

### 3.3 Dual Integration

**As Feature Panel (in Pets or Garden tab):**
```typescript
export const growthTimersPanel: FeaturePanelDefinition = {
  id: 'growth-timers',
  label: 'Growth Timers',
  icon: '⏱️',
  category: 'tracking',
  isAvailable: () => MGGrowthTimers.isEnabled(),
  shouldDisplay: (team, pets) => {
    // Show if team has growth boosts OR items in garden
    return hasGrowthBoosts(team) || hasActiveTimers();
  },
  buildPanel: (team, container) => { /* ... */ }
};
```

**As Standalone Garden Tab:**
```typescript
// Full-featured view with history, settings, optimization
class GardenSection {
  build(): HTMLElement {
    // Main garden interface
    // Houses multiple garden feature panels
  }
}
```

### 2.1 Scope Questions

**CRITICAL - Must Answer:**

1. **What should be tracked?**
   - [ ] Only eggs and plants in MY garden?
   - [ ] Only items affected by MY active team abilities?
   - [ ] All eggs/plants regardless of boost benefits?

2. **Display Location**
   - [ ] As a feature panel in pet teams (using Phase 2 registry)?
   - [ ] Standalone UI section?
   - [ ] Overlay on garden map?
   - [ ] All of the above?

3. **What information to show?**
   - [ ] Time remaining until mature (countdown timer)?
   - [ ] Estimated completion time (e.g., "2:35 PM")?
   - [ ] Progress percentage?
   - [ ] Growth rate modifier from abilities (e.g., "+50% faster")?
   - [ ] All of the above?

4. **Grouping/Filtering**
   - [ ] Show all at once?
   - [ ] Group by type (Eggs | Plants | Crops)?
   - [ ] Filter by "Ready Soon" (<5 min, <1 hour, etc.)?
   - [ ] Sort by time remaining?

5. **Update Frequency**
   - [ ] Real-time (every second)?
   - [ ] Every 5 seconds (reasonable for 10min+ timers)?
   - [ ] On-demand refresh button?

### 2.2 Feature Priorities

**High Priority (MVP):**
- Display eggs currently hatching with countdown
- Display plants currently maturing with countdown
- Show "Ready!" status when mature
- Factor in active team's growth boost abilities
- Real-time timer updates

**Medium Priority:**
- Display individual crop slots for multi-harvest plants
- Group/filter options
- Notifications when items mature
- Historical data (e.g., "Last 10 hatches")

**Low Priority (Nice to Have):**
- Predict optimal planting times based on team abilities
- Calendar view of upcoming maturations
- Export/share timer data

### 2.3 UI/UX Preferences

**Questions:**

1. **Visual Style**
   - [ ] Compact list (name + timer)?
   - [ ] Card-based layout (like XP Tracker)?
   - [ ] Timeline/Gantt chart view?

2. **Icons/Sprites**
   - [ ] Show egg/plant sprites?
   - [ ] Just emoji icons (🥚 🌱)?
   - [ ] Text only?

3. **Color Coding**
   - [ ] Red (>1 hour), Yellow (<1 hour), Green (<5 min)?
   - [ ] Use theme colors only (--accent, --success, etc.)?

4. **Empty State**
   - [ ] Show "No active timers" message?
   - [ ] Show planting suggestions?
   - [ ] Hide panel entirely?

---

## 3. Technical Architecture

### 3.1 Feature Module Structure

Following Gemini standards (`.claude/rules/features.md`):

```
src/features/growthTimers/
├── index.ts                    # Public API exports
├── types.ts                    # Type definitions
├── state.ts                    # Config persistence
└── logic/
    ├── calculations.ts         # Timer math, boost detection
    ├── filtering.ts            # Sort/filter logic
    └── formatting.ts           # Time display formatting
```

### 3.2 Phase 2 Integration

As a registered feature panel:

```
src/ui/sections/Pets/parts/featurePanels/
└── growthTimersPanel.ts       # Implements FeaturePanelDefinition
```

### 3.3 Core Calculations

**Time Remaining Formula:**
```typescript
function getTimeRemaining(item: EggWithTile | PlantWithTile): number {
  const now = Date.now();
  const remaining = item.maturedAt - now;
  return Math.max(0, remaining); // ms
}
```

**Growth Boost Detection:**
```typescript
function getGrowthBoostInfo(
  itemType: 'egg' | 'plant',
  activePets: UnifiedPet[]
): { hasBoost: boolean; boostDesc: string } {
  const boostAbilities = itemType === 'egg' 
    ? {
        'EggGrowthBoost': '21% proc, -7min',
        'EggGrowthBoostII_NEW': '24% proc, -9min', 
        'EggGrowthBoostII': '27% proc, -11min (Tier III)',
        'SnowyEggGrowthBoost': '35% proc, -10min (Frost only)'
      }
    : {
        'PlantGrowthBoost': '24% proc, -3min',
        'PlantGrowthBoostII': '27% proc, -5min',
        'PlantGrowthBoostIII': '30% proc, -7min',
        'SnowyPlantGrowthBoost': '40% proc, -6min (Frost only)'
      };
  
  const activeBoosts = activePets
    .flatMap(pet => pet.abilities)
    .filter(ability => ability in boostAbilities)
    .map(ability => boostAbilities[ability]);
  
  return {
    hasBoost: activeBoosts.length > 0,
    boostDesc: activeBoosts.join(', ')
  };
}
```

**IMPORTANT:** Growth boosts work via **PROC-BASED FIXED MINUTE REDUCTIONS**, not percentages!
- Each proc reduces time by fixed minutes (-3min, -7min, etc.)
- Proc rate determines how often reductions apply (21% = ~0.21 procs/min)
- Multiple boosts may stack (needs user confirmation)

**Critical Question:**
- Is `maturedAt` timestamp already adjusted by boosts when egg/plant is placed?
- Or do we calculate expected boost impact client-side for display?

### 3.4 Data Flow

```
┌─────────────────────┐
│ Globals.myGarden    │ ──► Subscribe to garden changes
└─────────────────────┘
          │
          ▼
┌─────────────────────┐
│ MGGrowthTimers      │ ──► Calculate timers, detect boosts
│ .getAllTimers()     │
└─────────────────────┘
          │
          ▼
┌─────────────────────┐
│ GrowthTimersPanel   │ ──► Render UI, update every second
│ (Feature Panel)     │
└─────────────────────┘
```

---

## 4. UI/UX Design

### 4.1 Feature Panel Integration

**Registration:**
```typescript
// featurePanels/growthTimersPanel.ts
export const growthTimersPanel: FeaturePanelDefinition = {
  id: 'growth-timers',
  label: 'Growth Timers',
  icon: '⏱️',
  category: 'tracking',
  
  isAvailable: () => MGGrowthTimers.isEnabled(),
  
  getSummary: (team, pets) => {
    const timers = MGGrowthTimers.getActiveTimers();
    const readySoon = timers.filter(t => t.remainingMs < 300000); // <5 min
    
    if (readySoon.length === 0) return null;
    
    return {
      text: `${readySoon.length} ready soon`,
      variant: 'warning',
      tooltip: `${readySoon.length} items maturing in <5 minutes`,
      priority: 8,
    };
  },
  
  buildPanel: (team, container) => {
    // Build timer display UI
    const panel = new GrowthTimersPanel({ teamId: team.id });
    container.appendChild(panel.build());
    
    return {
      update: () => panel.refresh(),
      destroy: () => panel.destroy(),
      refresh: () => panel.refresh(),
    };
  },
  
  shouldDisplay: (team, pets) => {
    // Show if team has growth boost abilities OR if there are active timers
    const hasBoosts = pets.some(p => 
      p.abilities.some(a => 
        a.includes('EggGrowth') || a.includes('PlantGrowth')
      )
    );
    const hasTimers = MGGrowthTimers.getActiveTimers().length > 0;
    
    return hasBoosts || hasTimers;
  },
};
```

### 4.2 Display Layouts (Options for Interview)

#### Option A: Compact List

```
Growth Timers (5 active)
─────────────────────────
🥚 Mythical Egg      23h 14m 32s
🌱 Pumpkin (Plant)    6h 02m 18s
🍅 Tomato (Crop 1/3)     45s
🍅 Tomato (Crop 2/3)   1m 12s
🥕 Carrot (Plant)      4m 58s ⚡+50%
```

#### Option B: Card Layout

```
┌────────────────────────────┐
│ 🥚 Mythical Egg            │
│ Ready in: 23h 14m 32s      │
│ Hatches: 2:35 PM tomorrow  │
└────────────────────────────┘

┌────────────────────────────┐
│ 🌱 Pumpkin                 │
│ Ready in: 6h 02m 18s       │
│ Matures: 8:15 PM today     │
└────────────────────────────┘
```

#### Option C: Progress Bars

```
Mythical Egg 🥚
[████░░░░░░] 40% | 23h 14m 32s

Pumpkin 🌱
[████████░░] 80% | 6h 02m 18s

Tomato (Crop 1) 🍅
[█████████░] 90% | 45s
```

### 4.3 Boost Indicator

When active team has growth boost abilities:

```
⚡ Active Boosts: +50% Egg Growth, +25% Plant Growth

[Timer displays with indicator]
🥚 Common Egg    8m 32s  ⚡-50%
```

---

## 5. Implementation Plan

### 5.1 Dependencies

**Prior Work (Complete):**
- ✅ Phase 2 Feature Registry
- ✅ Team Purpose Detection
- ✅ `Globals.myGarden` with egg/plant tracking
- ✅ `Globals.myPets` with active team abilities

**New Dependencies:**
- [ ] Growth boost percentage values (from game data or testing)
- [ ] Timer update mechanism (setInterval vs requestAnimationFrame)
- [ ] Notification system integration (optional)

### 5.2 Implementation Steps

1. **Create Feature Module** (`features/growthTimers/`)
   - Define types (GrowthTimer, TimerGroup, etc.)
   - Implement calculations (time remaining, boost detection)
   - Create config/state management
   - Build public API

2. **Create Feature Panel** (`featurePanels/growthTimersPanel.ts`)
   - Implement FeaturePanelDefinition
   - Build timer display UI
   - Integrate with Phase 2 registry

3. **Testing**
   - Unit tests for calculations
   - Browser tests for UI rendering
   - Test with all growth boost tiers
   - Test with multi-harvest plants

4. **Polish**
   - Add loading states
   - Error handling for missing data
   - Theme compliance
   - Accessibility (ARIA labels)

### 5.3 Estimated Effort

- **Core Feature:** 4-6 hours
- **UI Implementation:** 3-4 hours
- **Testing & Polish:** 2-3 hours
- **Total:** 9-13 hours

---

## 6. Testing Strategy

### 6.1 Test Scenarios

**Egg Timers:**
- [ ] Common Egg (10 min base) with no boosts
- [ ] Mythical Egg (24 hour base) with EggGrowthBoost III
- [ ] Multiple eggs of same type
- [ ] Egg hatching (timer reaches 0)
- [ ] Egg removed before hatching

**Plant Timers:**
- [ ] Fast plant (Wheat, 70s) with no boosts
- [ ] Slow plant (Pumpkin, 24h) with PlantGrowthBoost III
- [ ] Multi-harvest plant (Tomato) with crops at different stages
- [ ] Plant maturation event
- [ ] Crop harvest event (slot resets)

**Boost Detection:**
- [ ] No boost pets in team
- [ ] Single Tier I boost
- [ ] Multiple boost pets (confirm stacking)
- [ ] Mix of egg and plant boosts

**Edge Cases:**
- [ ] No eggs/plants in garden
- [ ] Team has boosts but nothing planted
- [ ] Negative time (already mature but not collected)
- [ ] Rapid updates (e.g., 1-second timers)

### 6.2 Performance Testing

- [ ] 100+ timers simultaneously
- [ ] Timer update performance (CPU usage)
- [ ] Memory leaks from setInterval
- [ ] UI responsiveness during rapid changes

---

## 7. Open Questions

### 7.1 Critical (Blocks Implementation)

1. **Growth Boost Mechanics**
   - What are the exact percentage reductions per tier?
   - Do multiple boosts stack? If so, additively or multiplicatively?
   - Is there a cap on growth rate increase?
   - Are boost effects already in `maturedAt` or calculated client-side?

2. **Scope Definition**
   - Track only MY garden or all visible gardens?
   - Track only items boosted by MY team or all items?

3. **UI Layout Preference**
   - Which display layout (Option A/B/C)?
   - Where should this feature appear?

### 7.2 Important (Affects Design)

4. **Update Frequency**
   - Real-time (1s updates) or periodic (5s)?
   - Performance considerations for many timers?

5. **Notifications**
   - Should we notify when items mature?
   - Browser notifications? In-UI only?

6. **Historical Data**
   - Track past hatches/harvests?
   - Useful for optimization suggestions?

### 7.3 Nice to Have (Future Enhancements)

7. **Predictive Features**
   - Suggest optimal planting times?
   - Show "best team" for current garden state?

8. **Integration**
   - Link to inventory for replanting?
   - Jump to garden tile from timer?

---

## Next Steps

1. **User Interview** - Answer open questions above
2. **Confirm Game Data** - Verify boost percentages from game source or testing
3. **Finalize Spec** - Update this document with interview results
4. **Begin Implementation** - Start with feature module, then UI

---

## Appendix: Data Structure Proposals

### A.1 Growth Timer Type

```typescript
interface GrowthTimer {
  id: string; // Unique identifier
  type: 'egg' | 'plant' | 'crop';
  tileIndex: string;
  position: XY;
  
  // Display info
  name: string; // "Mythical Egg" | "Pumpkin" | "Tomato (Crop 2/3)"
  species: EggId | FloraSpeciesId;
  
  // Timing
  plantedAt: number; // ms timestamp
  maturedAt: number; // ms timestamp
  remainingMs: number; // Calculated
  progress: number; // 0-1
  
  // Status
  isMature: boolean;
  isReadySoon: boolean; // <5 min or configurable threshold
  
  // Growth modifiers
  baseGrowthTime: number; // seconds (from dex)
  boostMultiplier: number; // 1.0 = no boost, 1.5 = +50%
  adjustedGrowthTime: number; // baseGrowthTime / boostMultiplier
  
  // For crops only
  slotIndex?: number;
  parentPlant?: string; // tileIndex of plant
}
```

### A.2 Feature Config

```typescript
interface GrowthTimersConfig {
  enabled: boolean;
  updateIntervalMs: number; // How often to refresh (1000 = 1s)
  showReadyThresholdMs: number; // "Ready soon" threshold (300000 = 5 min)
  displayMode: 'compact' | 'cards' | 'progress';
  groupBy: 'type' | 'time' | 'location';
  sortBy: 'time-asc' | 'time-desc' | 'name' | 'type';
  showBoostIndicators: boolean;
  showEstimatedTime: boolean; // "2:35 PM" vs just countdown
  notifyOnMature: boolean;
}
```

---

**Document Status:** Draft - Awaiting User Interview  
**Next Action:** Run `/spec` workflow to conduct structured interview
