# Trackers Section - Implementation Plan & Architecture

**Status**: ✅ **COMPLETE & PRODUCTION READY**
**Created**: 2026-01-13
**Last Updated**: 2026-01-13
**Completion Date**: 2026-01-13

---

## 📋 Overview

The Trackers section is a dedicated HUD tab for displaying team-based tracking statistics (XP, Growth, Value, etc.). It provides:

- **Team-centric tracking** - Select teams to view stats
- **Purpose-aware display** - Auto-detects team purpose and shows relevant trackers
- **Comparison mode** - Compare up to 2 teams side-by-side with diff indicators
- **Event-driven updates** - Real-time updates via ability log subscriptions
- **Extensible registry** - Easy to add new trackers (Value, Coin, Mutation, etc.)

---

## 🎯 Goals & Requirements

### User Flow
```
1. User clicks "Trackers" tab in HUD
2. Sees horizontal scrollable team selection cards
3. Selects a team → Purpose detection runs
4. Relevant tracker displayed (XP for XP teams, Growth for growth teams, etc.)
5. Optional: Select second team → Comparison mode with green/red diff indicators
6. Stats update automatically when abilities proc (event-driven)
```

### Key Features
- ✅ Card-based team selection (horizontal scroll on mobile)
- ✅ Purpose-aware auto-switching between trackers
- ✅ Comparison mode (max 2 teams)
- ✅ Event-driven updates (ability logs, garden changes)
- ✅ Mobile-responsive design
- ✅ Persistent state (selected teams, last viewed tracker)
- ✅ Clean separation from Pets section

---

## 🏗️ Architecture

### Folder Structure
```
src/ui/sections/Trackers/
├── README.md               # This file - comprehensive planning doc
├── index.ts                # Public exports only
├── section.ts              # TrackersSection extends BaseSection
├── state.ts                # Persistent state (createSectionStore)
├── trackers.css.ts         # Section-level styles
├── parts/                  # UI sub-components
│   ├── index.ts            # Barrel export
│   ├── TeamSelector.ts     # Team selection cards
│   ├── TrackerContainer.ts # Purpose-aware container
│   ├── ComparisonOverlay.ts# Diff indicators (green/red)
│   ├── XpTracker.ts        # MOVED from Pets/TeamXpPanel.ts
│   ├── GrowthTracker.ts    # REFACTORED from growthPanel.ts
│   ├── xpTracker.css.ts    # XP tracker styles
│   ├── growthTracker.css.ts# Growth tracker styles
│   └── parts.css.ts        # Shared part styles
└── trackers/               # Tracker definitions
    ├── registry.ts         # TRACKERS array + getRelevantTracker
    ├── xpTracker.ts        # XP tracker definition
    ├── growthTracker.ts    # Growth tracker definition
    └── types.ts            # Shared interfaces
```

### Class Hierarchy
```
BaseSection (from core/Section.ts)
    └─ TrackersSection (section.ts)
           ├─ TeamSelector (parts/TeamSelector.ts)
           ├─ TrackerContainer (parts/TrackerContainer.ts)
           │      └─ XpTracker / GrowthTracker (dynamic based on purpose)
           └─ ComparisonOverlay (optional, when comparing)
```

---

## 📦 Component Responsibilities

### `section.ts` - TrackersSection
**Responsibility**: Main section lifecycle, state management, part orchestration

**Key Methods**:
- `build(container)` - Initialize parts, inject styles, subscribe to state
- `destroy()` - Cleanup all subscriptions and destroy parts
- `initializeParts(section)` - Create TeamSelector and TrackerContainer
- `handleStateChange(newState)` - Re-render when team selection changes

**Dependencies**:
- `BaseSection` - Core section lifecycle
- `state` - Persistent state store
- `TeamSelector`, `TrackerContainer`, `ComparisonOverlay` - Parts
- `injectStyleOnce` - CSS injection helper

---

### `state.ts` - Persistent State
**Responsibility**: JSON-serializable state persisted to GM storage

**State Shape**:
```typescript
interface TrackersState {
  selectedTeamIds: string[];           // Max 2 for comparison
  lastTrackerView: Record<string, string>; // teamId -> trackerId
  expanded: boolean;                   // Future: collapsible sections
}
```

**Rules**:
- ✅ All fields JSON-serializable (no functions, classes, DOM nodes)
- ✅ Section ID stable: `'tab-trackers'` (never change)
- ✅ Version increment when shape changes

---

### `parts/TeamSelector.ts`
**Responsibility**: Display team cards, handle selection, emit events

**Features**:
- Horizontal scrollable card grid (4 cols desktop, scroll mobile)
- Card shows: Purpose icon, team name, pet sprites, primary metric
- Selection states: default, selected, comparing
- Max 2 teams selectable

**API**:
```typescript
interface TeamSelectorOptions {
  selectedTeamIds: string[];
  onTeamSelect: (teamIds: string[]) => void;
}

class TeamSelector {
  build(): HTMLElement;
  refresh(): void;
  destroy(): void;
}
```

---

### `parts/TrackerContainer.ts`
**Responsibility**: Purpose detection, tracker loading, event subscriptions

**Features**:
- Detect team purpose via `detectTeamPurpose(team)`
- Get relevant tracker via `getRelevantTracker(purpose)`
- Render tracker and manage lifecycle
- Subscribe to ability logs for auto-updates
- Optional comparison overlay injection

**API**:
```typescript
interface TrackerContainerOptions {
  primaryTeamId: string;
  comparisonTeamId?: string;
  setHUDOpen?: (open: boolean) => void;
}

class TrackerContainer {
  build(): HTMLElement;
  refresh(): void;
  destroy(): void;
}
```

---

### `parts/ComparisonOverlay.ts`
**Responsibility**: Inject green/red diff indicators into tracker UI

**Features**:
- Find stat elements in tracker DOM
- Calculate diffs between primary and comparison teams
- Inject comparison indicators (↑ +800, ↓ -30, =)
- Color-coded: green for better, red for worse, gray for same

**API**:
```typescript
interface ComparisonData {
  primaryValue: number;
  comparisonValue: number;
  label: string;
  format: 'number' | 'percentage' | 'time';
}

class ComparisonOverlay {
  inject(container: HTMLElement, data: ComparisonData[]): void;
  refresh(): void;
  destroy(): void;
}
```

---

### `parts/XpTracker.ts`
**Responsibility**: Display XP tracking for a team

**MOVED FROM**: `src/ui/sections/Pets/parts/TeamXpPanel.ts`

**Changes**:
- ✅ Renamed class: `TeamXpPanel` → `XpTracker`
- ✅ Updated imports to use `MGData.get('abilities')` for colors
- ⚠️ No logic changes - exact same functionality

**Features**:
- Team XP rate header
- Per-pet cards with sprites, STR progress, timers
- Boost badges with dynamic ability colors
- Progress bars (Next STR, Max STR)

---

### `parts/GrowthTracker.ts`
**Responsibility**: Display growth tracking (eggs & plants) for a team

**REFACTORED FROM**: `src/ui/sections/Pets/parts/featurePanels/growthPanel.ts`

**Changes**:
- ✅ Converted functional `renderPetSlot` → class-based `GrowthTracker`
- ✅ Extracted growth summary from `TeamCardExpansion.ts`
- ✅ Consolidated into single class

**Features**:
- Growth summary bar (X eggs/plants growing, avg progress)
- View toggle (eggs vs plants)
- Per-pet boost contribution cards
- Timer displays (next ready, all items)

---

### `trackers/registry.ts`
**Responsibility**: Central tracker registry and relevance scoring

**Key Exports**:
```typescript
interface TrackerDefinition {
  id: string;
  label: string;
  icon: string;
  priority: number;
  isRelevant: (purpose: TeamPurposeAnalysis) => number; // 0-1
  render: (team: PetTeam, container: HTMLElement) => () => void;
  getComparisonData?: (primary: PetTeam, compare: PetTeam) => ComparisonData[];
}

const TRACKERS: TrackerDefinition[] = [xpTracker, growthTracker];

function getRelevantTracker(purpose: TeamPurposeAnalysis): TrackerDefinition;
```

**Pattern**:
- No adapter layer - direct instantiation
- `render()` returns cleanup function
- Priority determines fallback order

---

### `trackers/xpTracker.ts`
**Responsibility**: XP tracker definition and integration

**Implementation**:
```typescript
export const xpTracker: TrackerDefinition = {
  id: 'xp',
  label: 'XP Tracker',
  icon: '📊',
  priority: 10,

  isRelevant: (purpose) => {
    if (purpose.primary === 'xp-farming') return purpose.confidence;
    if (purpose.primary === 'balanced') return 0.8;
    return 0.5; // Always somewhat relevant
  },

  render: (team, container) => {
    const tracker = new XpTracker({ teamId: team.id });
    container.appendChild(tracker.build());

    const xpData = calculateTeamXpData(team.id);
    if (xpData) tracker.update(xpData);

    // Event-driven updates
    const unsub = Globals.abilityLogs.subscribe((event) => {
      if (isRelevantToTeam(event, team)) {
        const newData = calculateTeamXpData(team.id);
        if (newData) tracker.update(newData);
      }
    });

    return () => {
      unsub();
      tracker.destroy();
    };
  },
};
```

---

### `trackers/growthTracker.ts`
**Responsibility**: Growth tracker definition and integration

**Similar structure to xpTracker.ts**, but:
- Subscribes to `Globals.myGarden` for garden changes
- Determines default view (egg vs plant) based on team abilities
- Uses `hasEggBoosts()` and `hasPlantBoosts()` helpers

---

## 🔄 Data Flow

### Initialization
```
1. TrackersSection.build()
   ├─ Inject CSS
   ├─ Create TeamSelector
   │   └─ Fetch all teams via MGPetTeam.getAllTeams()
   └─ Create TrackerContainer (if team selected)
       ├─ Detect purpose via detectTeamPurpose(team)
       ├─ Get tracker via getRelevantTracker(purpose)
       ├─ Render tracker
       └─ Subscribe to ability logs
```

### Team Selection
```
1. User clicks team card in TeamSelector
2. TeamSelector.onTeamSelect([teamId]) fires
3. State updates: state.set({ selectedTeamIds: [teamId] })
4. TrackersSection.handleStateChange() triggered
5. Destroy old TrackerContainer (if exists)
6. Create new TrackerContainer with new teamId
7. Tracker re-renders with new team data
```

### Comparison Mode
```
1. User clicks second team card
2. TeamSelector.onTeamSelect([team1, team2]) fires
3. State updates: state.set({ selectedTeamIds: [team1, team2] })
4. TrackerContainer receives comparisonTeamId
5. ComparisonOverlay.inject() adds diff indicators
6. Both trackers update in sync
```

### Event-Driven Updates
```
1. Ability procs in game (XP boost, growth boost, etc.)
2. Globals.abilityLogs fires event
3. TrackerContainer subscription checks relevance
4. If relevant to current team → tracker.refresh()
5. Tracker recalculates data and updates DOM
6. ComparisonOverlay.refresh() if comparing
```

---

## 🎨 Styling Strategy

### CSS Architecture
```
trackers.css.ts          # Section-level layout (grid, spacing)
parts/parts.css.ts       # Shared part styles (cards, buttons)
parts/xpTracker.css.ts   # XP-specific styles (MOVED from teamXpPanel.css.ts)
parts/growthTracker.css.ts # Growth-specific styles
```

### Design Tokens (from theme)
```css
--spacing-xs, --spacing-sm, --spacing-md, --spacing-lg
--color-text, --color-text-secondary
--color-bg, --color-bg-secondary
--color-border
--color-accent, --color-success, --color-danger
--border-radius, --shadow-sm, --shadow-md
--font-size-sm, --font-size-md, --font-size-lg
```

### Responsive Breakpoints
```css
/* Mobile: < 480px */
.team-selector { overflow-x: auto; scroll-snap-type: x; }
.tracker-panel__pets { flex-direction: column; }

/* Tablet: 480px - 767px */
.team-selector { grid-template-columns: repeat(3, 1fr); }

/* Desktop: >= 768px */
.team-selector { grid-template-columns: repeat(4, 1fr); }
.tracker-panel__pets { grid-template-columns: repeat(3, 1fr); }
```

---

## 🔧 Implementation Checklist

### Phase 1: Structure Setup ✅
- [x] Create folder structure
- [x] Create README.md (this file)
- [ ] Create section.ts
- [ ] Create state.ts
- [ ] Create index.ts
- [ ] Create trackers.css.ts
- [ ] Create parts/ and trackers/ subfolders

### Phase 2: Move XP Tracker
- [ ] Copy TeamXpPanel.ts → parts/XpTracker.ts
- [ ] Rename class: TeamXpPanel → XpTracker
- [ ] Copy teamXpPanel.css.ts → parts/xpTracker.css.ts
- [ ] Update imports (adjust relative paths)
- [ ] Update ability color fetching to use MGData.get('abilities')
- [ ] Create trackers/xpTracker.ts definition

### Phase 3: Refactor Growth Tracker
- [ ] Create parts/GrowthTracker.ts class
- [ ] Extract renderPetSlot logic from growthPanel.ts
- [ ] Extract growth summary from TeamCardExpansion.ts
- [ ] Create parts/growthTracker.css.ts
- [ ] Create trackers/growthTracker.ts definition
- [ ] Test growth tracker in isolation

### Phase 4: Registry & Container
- [ ] Create trackers/registry.ts
- [ ] Create trackers/types.ts
- [ ] Create parts/TrackerContainer.ts
- [ ] Implement purpose detection integration
- [ ] Implement event subscriptions (ability logs, garden)
- [ ] Test auto-switching between trackers

### Phase 5: Team Selection
- [ ] Create parts/TeamSelector.ts
- [ ] Implement card-based UI
- [ ] Implement selection logic (max 2 teams)
- [ ] Hook up to state management
- [ ] Test team selection persistence

### Phase 6: Comparison Mode
- [ ] Create parts/ComparisonOverlay.ts
- [ ] Implement diff calculation
- [ ] Implement diff indicator injection
- [ ] Style indicators (green/red/gray)
- [ ] Test comparison with 2 teams

### Phase 7: Integration
- [ ] Create parts/index.ts barrel export
- [ ] Create parts/parts.css.ts
- [ ] Assemble all parts in section.ts
- [ ] Register in src/ui/sections/registry.ts
- [ ] Test full section lifecycle

### Phase 8: Cleanup Pets Section
- [ ] Remove tracker logic from TeamCardExpansion.ts
- [ ] Update TeamCard.ts (remove tracker refs)
- [ ] Clean up unused imports
- [ ] Verify Pets section still works

### Phase 9: Polish & Testing
- [ ] Mobile responsive styles
- [ ] Event-driven update testing
- [ ] Memory leak testing (tab switching)
- [ ] Purpose detection accuracy
- [ ] Documentation updates

---

## 🚨 Critical Rules to Follow

### 1. Game Compatibility
- ✅ Use `MGData.get('abilities')` for ability colors (dynamic)
- ✅ Use `MGSprite` for all sprite rendering
- ✅ Never hardcode game data

### 2. State Management
- ✅ All state fields JSON-serializable
- ✅ Section ID stable: `'tab-trackers'`
- ✅ Use `createSectionStore` pattern

### 3. Cleanup Discipline
- ✅ Every subscription must have cleanup
- ✅ Use `this.addCleanup()` in BaseSection
- ✅ Parts must implement destroy()
- ✅ No memory leaks on tab switching

### 4. Event-Driven Updates
- ✅ Subscribe to `Globals.abilityLogs` for XP/boosts
- ✅ Subscribe to `Globals.myGarden` for growth
- ❌ No polling intervals (`setInterval`)

### 5. No Over-Engineering
- ✅ Simple tracker definitions (not adapters)
- ✅ Direct class instantiation
- ✅ Minimal abstraction
- ❌ No unnecessary interfaces

---

## 🔍 Example: Dynamic Ability Colors

```typescript
// ❌ DON'T hardcode
const boostColor = 'rgba(100, 100, 100, 0.9)';

// ✅ DO fetch dynamically
const abilities = MGData.get('abilities');
const boostAbility = abilities['PetXpBoostIII'];

if (boostAbility?.color) {
  badge.style.backgroundColor = boostAbility.color.bg;
  badge.style.setProperty('--hover-color', boostAbility.color.hover);
}

// Available ability colors from MGData:
// abilities['PetXpBoost'].color.bg       // XP boost background
// abilities['PetXpBoost'].color.hover    // XP boost hover
// abilities['PlantGrowthBoostIII'].color // Plant growth colors
// abilities['EggGrowthBoostII'].color    // Egg growth colors
```

---

## 📚 Related Documentation

- `.claude/rules/ui/sections.md` - Section rules and patterns
- `.claude/rules/core.md` - Core rules (game compat, boundaries, cleanup)
- `.claude/workflows/ui/section/add-section.md` - Section creation workflow
- `src/features/petTeam/logic/purpose.ts` - Purpose detection algorithm
- `src/features/xpTracker/` - XP calculation logic
- `src/features/growthTimers/` - Growth boost calculation logic

---

## 🐛 Common Pitfalls to Avoid

1. **Hardcoding ability colors** → Use `MGData.get('abilities')`
2. **Forgetting cleanup** → Use `this.addCleanup()` for all subscriptions
3. **Using intervals** → Use event subscriptions instead
4. **Non-serializable state** → Keep state JSON-only
5. **Changing section ID** → Keep `'tab-trackers'` stable
6. **Missing destroy()** → All parts must cleanup in destroy()
7. **Double-rendering** → Check `if (root) return` in build()

---

## 🎯 Future Enhancements

### Short Term (Post-MVP)
- Value Tracker (coin generation, portfolio value)
- Coin Tracker (coin finder, sell boost breakdown)
- Efficiency Tracker (hunger consumption, feeds per hour)

### Long Term
- Mutation Tracker (rare mutation probabilities)
- Ability Tracker (proc rates, cooldowns, synergies)
- History Graphs (XP gain over time, growth trends)
- Goal Setting (notifications when pets reach milestones)
- Export Data (CSV export for analysis)

---

## 📝 Notes & Decisions

### Why No Adapter Pattern?
- **Simpler**: Direct instantiation is clearer than wrapper layer
- **Gemini Style**: Minimal abstraction, avoid over-engineering
- **Performance**: One less layer of indirection
- **Maintenance**: Fewer files to track

### Why Class-Based Parts?
- **Consistency**: Matches existing `TeamXpPanel` pattern
- **Lifecycle**: Clear `build()/destroy()` methods
- **State**: Encapsulated instance state
- **Testability**: Easy to test in isolation

### Why Event-Driven Updates?
- **Efficiency**: Only update when relevant changes occur
- **Real-time**: Instant feedback when abilities proc
- **Battery**: No wasteful polling intervals
- **Scalability**: Easy to add more event sources

---

## 🔄 Migration from Pets Section

**Date**: 2026-01-13

### What Was Removed
The following files were removed from the Pets section to eliminate duplication:
- ❌ `Pets/parts/TeamXpPanel.ts` (388 lines)
- ❌ `Pets/parts/teamXpPanel.css.ts`
- ❌ `Pets/parts/featurePanels/xpPanel.ts` (wrapper)
- ❌ `Pets/parts/featurePanels/growthPanel.ts` (523 lines)
- ❌ `Pets/parts/featurePanels/growthPanel.css.ts`

### What Was Updated
- ✅ `Pets/parts/featurePanels/index.ts` - Removed tracker imports, empty `FEATURE_PANELS` array
- ✅ `Pets/parts/index.ts` - Removed `TeamXpPanel` exports
- ✅ `Pets/section.ts` - Removed tracker CSS imports and injections
- ✅ `features/xpTracker/logic/teamXpCalculations.ts` - Updated types import to `Trackers/parts/XpTracker`

### Impact on Pets Section
The Pets section still works fully for team management:
- ✅ Create/delete teams
- ✅ Assign pets to teams
- ✅ View team cards with pet sprites
- ❌ **Team card expansion disabled** (no feature panels registered)
  - When users try to expand a team card, it returns early with console warning
  - This is intentional - users should use the **Trackers tab** for statistics

### Bundle Size Impact
- **Before**: 665.16 kB raw (167.45 kB gzipped)
- **After**: 619.01 kB raw (159.47 kB gzipped)
- **Savings**: ~46 KB raw, ~8 KB gzipped (7% reduction)

### User Migration Path
Users who previously viewed XP/Growth stats in the Pets section should now:
1. Click the **"Trackers"** tab in the HUD
2. Select teams to view statistics
3. Enjoy new features: comparison mode, purpose detection, event-driven updates

### Architecture Benefits
1. **Single Source of Truth**: Tracker logic only exists in `Trackers/` section
2. **Cleaner Separation**: Pets = team management, Trackers = team analysis
3. **Better UX**: Dedicated space for in-depth statistics and comparisons
4. **Easier Maintenance**: Changes only needed in one place
5. **Smaller Bundle**: Removed ~1000 lines of duplicate code

---

**End of Planning Document**
