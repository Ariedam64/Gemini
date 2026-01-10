# Current State Analysis: XP Tracker Implementation

**Document Version:** 1.0
**Date:** 2026-01-07
**Status:** Active Implementation

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [System Architecture](#system-architecture)
3. [MGPetTeam API Documentation](#mgpetteam-api-documentation)
4. [MGXPTracker API Documentation](#mgxptracker-api-documentation)
5. [Data Flow Analysis](#data-flow-analysis)
6. [Component Architecture](#component-architecture)
7. [Phase 1 Change Specifications](#phase-1-change-specifications)
8. [Technical Debt & Known Issues](#technical-debt--known-issues)

---

## Executive Summary

### Current State (✅ Working)

#### XP Tracker Feature
- **Status:** Fully functional, displays inline in Pets section
- **Location:**
  - Core Logic: `C:\Users\ryand\Feeder-Extension\Gemini-main\Gemini-main\src\features\xpTracker\`
  - UI Component: `C:\Users\ryand\Feeder-Extension\Gemini-main\Gemini-main\src\ui\sections\Pets\parts\TeamXpPanel.ts`
  - Styles: `C:\Users\ryand\Feeder-Extension\Gemini-main\Gemini-main\src\ui\sections\Pets\parts\teamXpPanel.css.ts`

- **Features:**
  - XP calculations for all pets
  - Team-based XP data aggregation
  - Expandable team panels with 5-team FIFO limit
  - Auto-updates every 3 seconds
  - Pet sprites with mutation support
  - Progress bars with time/feed estimates
  - XP Boost detection (Tier I/II/III/Snowy)
  - Combined team boost calculations
  - Supporting feeds for max-STR boosters

#### Pet Team Management Feature
- **Status:** Full CRUD operations available
- **Location:** `C:\Users\ryand\Feeder-Extension\Gemini-main\Gemini-main\src\features\petTeam\`
- **API:** `MGPetTeam` module
- **Operations:** createTeam, updateTeam, deleteTeam, renameTeam, getTeam, getAllTeams, getTeamByName, reorderTeams, activateTeam
- **Data Structure:**
  ```typescript
  PetTeam {
    id: string;              // UUID v4
    name: string;            // Unique team name
    petIds: [string, string, string];  // Exactly 3 slots
    createdAt: number;       // Timestamp
    updatedAt: number;       // Timestamp
  }
  ```

### Key Technical Constants

```typescript
// Team Configuration
MAX_PETS_PER_TEAM = 3;       // Game limitation
MAX_TEAMS = 50;              // System limitation
EMPTY_SLOT = '';             // Vacant slot identifier

// XP Configuration
XP_PER_HOUR = 3600;          // Base passive XP rate
XP_PER_SECOND = 1;           // Conversion factor
BASE_TARGET_STRENGTH = 10;   // Default target strength
MAX_TARGET_STRENGTH = 100;   // Maximum achievable strength

// XP Boost Abilities
XP_BOOST_ABILITY_IDS = [
  'PetXpBoost',              // Tier I
  'PetXpBoostII',            // Tier II
  'PetXpBoostIII',           // Tier III
  'SnowyPetXpBoost'          // Snowy variant (weather-dependent)
];

// Update Configuration
UPDATE_INTERVAL_MS = 3000;   // Auto-refresh interval
MAX_EXPANDED_TEAMS = 5;      // FIFO limit for expanded panels
```

### UnifiedPet Data Structure

The `Globals.myPets.get()` returns pets in this format:

```typescript
interface UnifiedPet {
  id: string;
  petSpecies: string;
  name: string | null;
  xp: number;
  hunger: number;              // 0-100, 0 = starving
  mutations: string[];
  targetScale: number;         // Determines maxStrength
  abilities: string[];
  location: 'active' | 'inventory' | 'hutch';
  position: {x: number, y: number} | null;
  growthStage: number;
  currentStrength: number;     // Automatically calculated
  maxStrength: number;         // Automatically calculated
  isMature: boolean;           // Automatically calculated
}
```

---

## System Architecture

### Directory Structure

```
src/
├── features/
│   ├── petTeam/
│   │   ├── index.ts              # Public API (MGPetTeam)
│   │   ├── types.ts              # Type definitions
│   │   ├── state.ts              # State management
│   │   └── logic/
│   │       ├── team.ts           # Team CRUD operations
│   │       └── active.ts         # Active team management
│   │
│   └── xpTracker/
│       ├── index.ts              # Public API (MGXPTracker)
│       ├── types.ts              # Type definitions
│       ├── state.ts              # State management
│       └── logic/
│           ├── xpBoost.ts        # XP Boost calculations
│           ├── teamXpCalculations.ts  # Team XP data
│           └── sorting.ts        # Pet filtering/sorting
│
├── ui/sections/Pets/parts/
│   ├── TeamXpPanel.ts            # XP display component
│   └── teamXpPanel.css.ts        # Component styles
│
└── modules/calculators/
    └── logic/
        ├── xp.ts                 # Core XP calculations
        └── feed.ts               # Feed calculations
```

### Module Dependency Graph

```
TeamXpPanel (UI Component)
    ↓
calculateTeamXpData (Logic)
    ↓
    ├── MGPetTeam.getTeam() → Get team data
    ├── Globals.myPets.get() → Get pet data
    ├── calculateCombinedXpBoostStats() → Aggregate boosts
    └── For each pet:
        ├── calculateCurrentStrength()
        ├── calculateMaxStrength()
        ├── calculateHoursToNextStrength()
        ├── calculateHoursToMaxStrength()
        ├── calculateFeedsToNextStrength()
        ├── calculateFeedsToMaxStrength()
        ├── getPrimaryXpBoostStats()
        └── calculateAdjustedFeedsToMax() (for max-STR boosters)
```

---

## MGPetTeam API Documentation

### Module Location
**File:** `C:\Users\ryand\Feeder-Extension\Gemini-main\Gemini-main\src\features\petTeam\index.ts`

### Public API Surface

```typescript
export const MGPetTeam = {
  // ═══ Lifecycle ═══
  init(): void
  destroy(): void

  // ═══ Configuration ═══
  isEnabled(): boolean
  setEnabled(enabled: boolean): void

  // ═══ Team Management ═══
  createTeam(name: string, petIds?: [string, string, string]): TeamId
  updateTeam(teamId: TeamId, petIds: [string, string, string]): void
  deleteTeam(teamId: TeamId): void
  renameTeam(teamId: TeamId, newName: string): void
  getTeam(teamId: TeamId): PetTeam | undefined
  getAllTeams(): PetTeam[]
  getTeamByName(name: string): PetTeam | undefined
  reorderTeams(teamIds: TeamId[]): void

  // ═══ Active Team ═══
  getActiveTeamId(): TeamId | null
  setActiveTeamId(teamId: TeamId | null): void
  isActiveTeam(teamId: TeamId): boolean
  activateTeam(teamId: TeamId): void
} as const;
```

### Method Details

#### Lifecycle Methods

**`init(): void`**
- **Lines:** 35-46
- **Purpose:** Initialize the PetTeam feature
- **Behavior:**
  - Guards against multiple initialization
  - Loads configuration from storage
  - Returns early if feature is disabled
  - Sets `initialized` flag
  - Logs initialization status

**`destroy(): void`**
- **Lines:** 48-52
- **Purpose:** Cleanup feature resources
- **Behavior:**
  - Guards against destroying uninitialized feature
  - Clears `initialized` flag
  - Logs destruction status

#### Configuration Methods

**`isEnabled(): boolean`**
- **Lines:** 55 (re-export from State)
- **Source:** `src/features/petTeam/state.ts`
- **Returns:** Current enabled state from config

**`setEnabled(enabled: boolean): void`**
- **Lines:** 56 (re-export from State)
- **Source:** `src/features/petTeam/state.ts`
- **Purpose:** Toggle feature on/off
- **Side Effects:** Saves config to storage

#### Team Management Methods

**`createTeam(name: string, petIds?: [string, string, string]): TeamId`**
- **Source:** `src/features/petTeam/logic/team.ts`
- **Purpose:** Create a new pet team
- **Parameters:**
  - `name`: Unique team name (required)
  - `petIds`: Array of 3 pet IDs (defaults to ['', '', ''])
- **Returns:** New team ID (UUID v4)
- **Throws:** Error if name already exists or max teams reached
- **Side Effects:**
  - Generates UUID v4
  - Sets createdAt/updatedAt timestamps
  - Saves to storage

**`updateTeam(teamId: TeamId, petIds: [string, string, string]): void`**
- **Source:** `src/features/petTeam/logic/team.ts`
- **Purpose:** Update team's pet composition
- **Parameters:**
  - `teamId`: Target team ID
  - `petIds`: New array of 3 pet IDs
- **Throws:** Error if team not found
- **Side Effects:**
  - Updates `updatedAt` timestamp
  - Saves to storage

**`deleteTeam(teamId: TeamId): void`**
- **Source:** `src/features/petTeam/logic/team.ts`
- **Purpose:** Remove a team
- **Throws:** Error if team not found
- **Side Effects:**
  - Removes team from config
  - Clears active team if deleting active team
  - Saves to storage

**`renameTeam(teamId: TeamId, newName: string): void`**
- **Source:** `src/features/petTeam/logic/team.ts`
- **Purpose:** Change team name
- **Throws:** Error if team not found or name already exists
- **Side Effects:**
  - Updates `updatedAt` timestamp
  - Saves to storage

**`getTeam(teamId: TeamId): PetTeam | undefined`**
- **Source:** `src/features/petTeam/logic/team.ts`
- **Purpose:** Retrieve team by ID
- **Returns:** Team object or undefined

**`getAllTeams(): PetTeam[]`**
- **Source:** `src/features/petTeam/logic/team.ts`
- **Purpose:** Get all teams
- **Returns:** Array of all teams in order

**`getTeamByName(name: string): PetTeam | undefined`**
- **Source:** `src/features/petTeam/logic/team.ts`
- **Purpose:** Find team by name
- **Returns:** Team object or undefined

**`reorderTeams(teamIds: TeamId[]): void`**
- **Source:** `src/features/petTeam/logic/team.ts`
- **Purpose:** Change team display order
- **Throws:** Error if teamIds don't match existing teams
- **Side Effects:** Saves to storage

#### Active Team Methods

**`getActiveTeamId(): TeamId | null`**
- **Source:** `src/features/petTeam/logic/active.ts`
- **Purpose:** Get currently active team ID
- **Returns:** Active team ID or null

**`setActiveTeamId(teamId: TeamId | null): void`**
- **Source:** `src/features/petTeam/logic/active.ts`
- **Purpose:** Set active team
- **Side Effects:** Saves to storage

**`isActiveTeam(teamId: TeamId): boolean`**
- **Source:** `src/features/petTeam/logic/active.ts`
- **Purpose:** Check if team is active
- **Returns:** True if team is currently active

**`activateTeam(teamId: TeamId): void`**
- **Source:** `src/features/petTeam/logic/active.ts`
- **Purpose:** Activate a team
- **Throws:** Error if team not found
- **Side Effects:** Saves to storage

### Type Exports

```typescript
export type { PetTeam, TeamId, PetTeamConfig };
```

**Source:** `src/features/petTeam/types.ts`
- **Lines:** 19-30 (PetTeam)
- **Lines:** 13 (TeamId)
- **Lines:** 36-43 (PetTeamConfig)

---

## MGXPTracker API Documentation

### Module Location
**File:** `C:\Users\ryand\Feeder-Extension\Gemini-main\Gemini-main\src\features\xpTracker\index.ts`

### Public API Surface

```typescript
export const MGXPTracker = {
  // ═══ Required API ═══
  init(): void
  isReady(): boolean
  destroy(): void

  // ═══ Configuration ═══
  loadConfig(): XpTrackerConfig
  saveConfig(config: XpTrackerConfig): void
  updateConfig(updates: Partial<XpTrackerConfig>): void
  isEnabled(): boolean
  setEnabled(enabled: boolean): void

  // ═══ Data Access ═══
  getAllPetsProgress(): PetXpProgress[]
  getActivePetsProgress(): PetXpProgress[]
  getCombinedBoostStats(): CombinedXpBoostStats | null
  getFilteredPets(): PetXpProgress[]
  refresh(): void

  // ═══ Auto-update ═══
  startAutoUpdate(intervalMs?: number): void
  stopAutoUpdate(): void

  // ═══ Utilities ═══
  sortPets(pets: PetXpProgress[], sortBy: SortOption): PetXpProgress[]
  filterAndSortPets(pets: PetXpProgress[], options: FilterOptions): PetXpProgress[]
} as const;
```

### Method Details

#### Lifecycle Methods

**`init(): void`**
- **Lines:** 217-235
- **Purpose:** Initialize XP Tracker feature
- **Behavior:**
  - Guards against multiple initialization
  - Loads configuration from storage
  - Returns early if feature is disabled
  - Performs initial data build if MGData is ready
  - Sets `initialized` flag
  - Logs initialization status

**`isReady(): boolean`**
- **Lines:** 240-242
- **Purpose:** Check if feature is ready for use
- **Returns:** True if initialized AND MGData is ready
- **Usage:** Always check before accessing data methods

**`destroy(): void`**
- **Lines:** 303-312
- **Purpose:** Cleanup feature resources
- **Behavior:**
  - Guards against destroying uninitialized feature
  - Stops auto-update interval
  - Clears `initialized` flag
  - Clears cached data
  - Logs destruction status

#### Configuration Methods

**`loadConfig(): XpTrackerConfig`**
- **Lines:** 359 (re-export from state)
- **Source:** `src/features/xpTracker/state.ts`
- **Returns:** Current configuration object
- **Default:** Returns DEFAULT_CONFIG if no saved config

**`saveConfig(config: XpTrackerConfig): void`**
- **Lines:** 360 (re-export from state)
- **Source:** `src/features/xpTracker/state.ts`
- **Purpose:** Persist full config to storage
- **Side Effects:** Writes to localStorage

**`updateConfig(updates: Partial<XpTrackerConfig>): void`**
- **Lines:** 361 (re-export from state)
- **Source:** `src/features/xpTracker/state.ts`
- **Purpose:** Update specific config fields
- **Behavior:** Merges updates with existing config
- **Side Effects:** Writes to localStorage

**`isEnabled(): boolean`**
- **Lines:** 362 (re-export from state)
- **Source:** `src/features/xpTracker/state.ts`
- **Returns:** Current enabled state from config

**`setEnabled(enabled: boolean): void`**
- **Lines:** 333-350
- **Purpose:** Toggle feature on/off with automatic init/cleanup
- **Behavior:**
  - Saves enabled state to config
  - If enabling: re-initializes and triggers data refresh
  - If disabling: destroys feature and cleans up
  - Logs state change

#### Data Access Methods

**`getAllPetsProgress(): PetXpProgress[]`**
- **Lines:** 247-250
- **Purpose:** Get XP progress for ALL pets (active + inventory + hutch)
- **Returns:** Array of PetXpProgress objects
- **Returns:** Empty array if not ready
- **Data Source:** Cached data (call refresh() to update)

**`getActivePetsProgress(): PetXpProgress[]`**
- **Lines:** 255-257
- **Purpose:** Get XP progress for active pets only
- **Returns:** Filtered array where location === 'active'
- **Implementation:** Filters getAllPetsProgress()

**`getCombinedBoostStats(): CombinedXpBoostStats | null`**
- **Lines:** 262-264
- **Purpose:** Get aggregated XP Boost stats for active team
- **Returns:** Combined stats from all active XP Boost pets
- **Returns:** Null if no boosters or not ready
- **Data Source:** Cached data (updated on refresh)

**`getFilteredPets(): PetXpProgress[]`**
- **Lines:** 317-324
- **Purpose:** Get pets filtered and sorted by current config
- **Returns:** Filtered/sorted array based on config settings
- **Uses Config:**
  - `config.sortBy`: Sort order
  - `config.filterSpecies`: Species filter
  - `config.filterHasXpBoost`: XP Boost ability filter

**`refresh(): void`**
- **Lines:** 269-272
- **Purpose:** Manually trigger data rebuild
- **Behavior:**
  - Guards against calling when not ready
  - Calls `buildAllPetsProgress()` to recalculate
  - Updates cached data
  - Updates cached combined boost stats
- **Usage:** Call after game state changes

#### Auto-update Methods

**`startAutoUpdate(intervalMs?: number): void`**
- **Lines:** 277-288
- **Purpose:** Start automatic data refresh
- **Parameters:**
  - `intervalMs`: Custom interval (defaults to config.updateIntervalMs = 3000)
- **Behavior:**
  - Stops existing interval if running
  - Creates new interval
  - Only refreshes if feature is enabled
- **Side Effects:** Sets interval timer

**`stopAutoUpdate(): void`**
- **Lines:** 293-298
- **Purpose:** Stop automatic refresh
- **Behavior:** Clears interval timer
- **Usage:** Called automatically on destroy()

#### Utility Methods

**`sortPets(pets: PetXpProgress[], sortBy: SortOption): PetXpProgress[]`**
- **Lines:** 377 (re-export)
- **Source:** `src/features/xpTracker/logic/sorting.ts`
- **Purpose:** Sort pets by specified criteria
- **Sort Options:**
  - `'closestToMax'`: Highest % to max STR first
  - `'furthestFromMax'`: Lowest % to max STR first
  - `'species'`: Alphabetical by species
  - `'strength'`: Highest current strength first
  - `'location'`: Active → Inventory → Hutch
  - `'name'`: Alphabetical by name
- **Returns:** New sorted array (does not mutate)

**`filterAndSortPets(pets: PetXpProgress[], options: FilterOptions): PetXpProgress[]`**
- **Lines:** 378 (re-export)
- **Source:** `src/features/xpTracker/logic/sorting.ts`
- **Purpose:** Apply filters and sorting in one call
- **Filter Options:**
  - `sortBy`: Sort criteria
  - `filterSpecies`: Array of species to include (empty = all)
  - `filterHasXpBoost`: Only show XP Boost pets
- **Returns:** New filtered/sorted array

### Internal Data Building (Private)

**`buildPetXpProgress(pet, currentWeather, combinedBoostXpPerHour): PetXpProgress`**
- **Lines:** 62-142
- **Purpose:** Build XP progress data for a single pet
- **Visibility:** Internal only (not exported)
- **Calculations:**
  - Current/max strength from species and targetScale
  - Base XP rate (0 if starving, 3600 otherwise)
  - Total XP rate (base + team boosts for active pets)
  - Hours to next/max strength
  - Feeds to next/max strength
  - XP Boost stats if applicable
- **Returns:** Complete PetXpProgress object

**`buildAllPetsProgress(): PetXpProgress[]`**
- **Lines:** 147-208
- **Purpose:** Build XP progress for all pets
- **Visibility:** Internal only (not exported)
- **Data Flow:**
  1. Get all pets from `Globals.myPets.get()`
  2. Get current weather from `Globals.weather.get()`
  3. Filter active pets for booster calculation
  4. Calculate combined boost stats
  5. Build progress for each pet
  6. Adjust feeds for max-STR boosters
- **Returns:** Array of all pet progress data
- **Side Effect:** Updates `cachedCombinedStats`

### Type Exports

```typescript
export * from './types';  // All types exported
export { filterAndSortPets, sortPets } from './logic/sorting';
export { calculateTeamXpData, calculateTeamProgressPercent } from './logic/teamXpCalculations';
```

**Key Types:**
- `PetXpProgress` (Lines 77-118)
- `XpBoostStats` (Lines 47-70)
- `CombinedXpBoostStats` (Lines 125-138)
- `XpTrackerConfig` (Lines 154-175)
- `SortOption` (Lines 145-151)

**Source:** `C:\Users\ryand\Feeder-Extension\Gemini-main\Gemini-main\src\features\xpTracker\types.ts`

---

## Data Flow Analysis

### Team XP Data Calculation Flow

```
┌─────────────────────────────────────────────────────────────┐
│ USER ACTION: Click "Expand" on Team Card                   │
└───────────────────────────┬─────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ TeamCard Component                                          │
│ → Calls: calculateTeamXpData(teamId)                       │
└───────────────────────────┬─────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 1: Get Team Data                                      │
│ File: src/features/xpTracker/logic/teamXpCalculations.ts   │
│ Lines: 44-47                                                │
│                                                             │
│ → MGPetTeam.getTeam(teamId)                                │
│ → Returns: PetTeam | null                                  │
│                                                             │
│ If null → return null (team not found)                     │
└───────────────────────────┬─────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 2: Get Team Pets                                      │
│ Function: getTeamPets(team)                                │
│ Lines: 113-127                                              │
│                                                             │
│ → Globals.myPets.get()                                     │
│ → Filter by team.petIds (skip empty slots)                │
│ → Returns: UnifiedPet[]                                    │
│                                                             │
│ If empty → return minimal TeamXpData (lines 52-65)         │
└───────────────────────────┬─────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 3: Calculate Combined XP Boost Stats                  │
│ Lines: 68-82                                                │
│                                                             │
│ → Get current weather from Globals.weather.get()           │
│ → Filter boosters:                                         │
│   • Include mature pets with XP Boost                      │
│   • Exclude starving pets (hunger <= 0)                    │
│ → Map to booster data: {petId, petName, abilities, str}   │
│ → calculateCombinedXpBoostStats(boosters, weather)         │
│ → Returns: CombinedXpBoostStats                            │
│   {                                                         │
│     totalBonusXpPerHour: number,                           │
│     totalProcsPerHour: number,                             │
│     activeBoosterCount: number,                            │
│     boosters: Array<{petId, petName, stats}>              │
│   }                                                         │
└───────────────────────────┬─────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 4: Calculate Longest Hours to Max                     │
│ Function: calculateLongestHoursToMax(pets, teamBonus)     │
│ Lines: 133-154                                              │
│                                                             │
│ Purpose: Used for max-STR booster supporting feeds         │
│                                                             │
│ For each non-max-STR pet:                                  │
│ → calculateMaxStrength(species, targetScale)               │
│ → calculateCurrentStrength(species, xp, maxStr)            │
│ → Skip if currentStr >= maxStr                             │
│ → Calculate totalXpPerHour (base + teamBonus)              │
│ → calculateHoursToMaxStrength(...)                         │
│ → Track maximum hours                                      │
│                                                             │
│ Returns: number (longest hours among all pets)             │
└───────────────────────────┬─────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 5: Calculate Per-Pet Data                             │
│ Lines: 88-91                                                │
│                                                             │
│ For each pet in teamPets:                                  │
│ → calculatePetXpData(pet, weather, teamBonus, longestHrs) │
│   (See detailed breakdown below)                           │
│ → Push to petsData array                                   │
└───────────────────────────┬─────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 6: Build Team Summary                                 │
│ Lines: 94-100                                               │
│                                                             │
│ TeamXpSummary {                                            │
│   baseXpPerHour: XP_PER_HOUR (3600),                      │
│   bonusXpPerHour: combinedBoostStats.total,               │
│   totalXpPerHour: 3600 + bonus,                           │
│   activeBoosterCount: combinedBoostStats.count,           │
│   totalProcsPerHour: combinedBoostStats.procs             │
│ }                                                           │
└───────────────────────────┬─────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 7: Return Complete Data                               │
│ Lines: 102-108                                              │
│                                                             │
│ TeamXpData {                                               │
│   teamId: team.id,                                         │
│   teamName: team.name,                                     │
│   pets: petsData[],                                        │
│   teamSummary: TeamXpSummary                               │
│ }                                                           │
└───────────────────────────┬─────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ TeamXpPanel.update(data)                                   │
│ File: src/ui/sections/Pets/parts/TeamXpPanel.ts           │
│ Lines: 105-109                                              │
│                                                             │
│ → updateHeader(data.teamSummary)                           │
│ → updatePets(data.pets)                                    │
│ → updateFooter(data.teamSummary, data.pets)                │
└───────────────────────────┬─────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ RENDERED UI: Expandable XP Panel                           │
│ • Header: Team XP rate (base + bonus)                      │
│ • Pet Cards: Sprites + Stats + Progress bars               │
│ • Footer: Active booster summary                           │
│                                                             │
│ Auto-updates every 3 seconds                                │
└─────────────────────────────────────────────────────────────┘
```

### Per-Pet XP Data Calculation (Detailed)

```
┌─────────────────────────────────────────────────────────────┐
│ Function: calculatePetXpData(pet, weather, teamBonus, hrs) │
│ File: teamXpCalculations.ts, Lines: 159-235                │
└───────────────────────────┬─────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 1: Calculate Strength Values                          │
│ Lines: 165-168                                              │
│                                                             │
│ → maxStrength = calculateMaxStrength(species, targetScale) │
│   File: src/modules/calculators/logic/xp.ts                │
│   Formula: BASE_TARGET_STRENGTH * targetScale              │
│                                                             │
│ → currentStrength = calculateCurrentStrength(species, xp,  │
│                                              maxStrength)   │
│   Formula: BASE_STRENGTH + (xp / xpPerLevel) * increment   │
│                                                             │
│ → isMaxStrength = currentStrength >= maxStrength           │
│ → isStarving = pet.hunger <= 0                             │
└───────────────────────────┬─────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 2: Calculate XP Rates                                 │
│ Lines: 171-172                                              │
│                                                             │
│ → baseXpPerHour = isStarving ? 0 : 3600                    │
│ → totalXpPerHour = isStarving ? 0 :                        │
│                    baseXpPerHour + teamBonusXpPerHour      │
│                                                             │
│ Note: Non-active pets don't receive team bonus             │
└───────────────────────────┬─────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 3: Get XP Boost Stats (if applicable)                 │
│ Lines: 175                                                  │
│                                                             │
│ → getPrimaryXpBoostStats(abilities, currentStr, weather)   │
│   File: src/features/xpTracker/logic/xpBoost.ts            │
│                                                             │
│   Returns: XpBoostStats | null                             │
│   {                                                         │
│     abilityId: string,                                     │
│     tier: 'I'|'II'|'III'|'Snowy',                         │
│     baseChancePerMinute: number,                           │
│     actualChancePerMinute: number,                         │
│     baseXpPerProc: number,                                 │
│     actualXpPerProc: number,                               │
│     expectedProcsPerHour: number,                          │
│     expectedXpPerHour: number,                             │
│     requiredWeather: 'Frost'|null,                         │
│     isActive: boolean                                      │
│   }                                                         │
└───────────────────────────┬─────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 4: Calculate Time to Next/Max Strength                │
│ Lines: 178-191                                              │
│                                                             │
│ → hoursToNextStrength = isMaxStrength ? null :             │
│     calculateHoursToNextStrength(species, xp, currentStr,  │
│                                  maxStr, totalXpPerHour)   │
│   File: src/modules/calculators/logic/xp.ts                │
│   Formula: (xpNeeded - currentXp) / xpPerHour              │
│                                                             │
│ → hoursToMaxStrength =                                     │
│     calculateHoursToMaxStrength(species, xp, maxStr,       │
│                                 totalXpPerHour)            │
│   Formula: (totalXpNeeded - currentXp) / xpPerHour         │
└───────────────────────────┬─────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 5: Calculate Feeds Required                           │
│ Lines: 194-202                                              │
│                                                             │
│ → feedsToNextStrength = hoursToNextStr !== null ?          │
│     calculateFeedsToNextStrength(species, hunger, hours)   │
│     : null                                                  │
│   File: src/modules/calculators/logic/feed.ts              │
│                                                             │
│ → feedsToMaxStrength =                                     │
│     calculateFeedsToMaxStrength(species, hunger, hours)    │
│                                                             │
│ Formula (simplified):                                       │
│   feedsNeeded = hoursUntilStarving + feedsToSustain        │
│   where hoursUntilStarving = hunger / hungerLossPerHour    │
└───────────────────────────┬─────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 6: Calculate Supporting Feeds (max-STR boosters only) │
│ Lines: 205-214                                              │
│                                                             │
│ → supportingFeeds =                                        │
│     (isMaxStr && hasXpBoost && longestHoursToMax > 0) ?   │
│       calculateAdjustedFeedsToMax(true, true, species,     │
│                                   hunger, 0, longestHours) │
│       : null                                                │
│                                                             │
│ Purpose: How many feeds needed to keep max-STR booster     │
│          alive while team reaches max                      │
└───────────────────────────┬─────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 7: Return TeamPetXpData                                │
│ Lines: 216-234                                              │
│                                                             │
│ TeamPetXpData {                                            │
│   id: string,                                              │
│   name: string,                                            │
│   species: string,                                         │
│   currentStrength: number,                                 │
│   maxStrength: number,                                     │
│   isMaxStrength: boolean,                                  │
│   xpPerHour: number,                                       │
│   hoursToNextStrength: number | null,                      │
│   hoursToMaxStrength: number,                              │
│   feedsToNextStrength: number | null,                      │
│   feedsToMaxStrength: number,                              │
│   isStarving: boolean,                                     │
│   hunger: number,                                          │
│   xpBoostStats: XpBoostStats | null,                       │
│   supportingFeeds: number | null,                          │
│   mutations: string[],                                     │
│   targetScale: number                                      │
│ }                                                           │
└─────────────────────────────────────────────────────────────┘
```

### XP Boost Calculation Flow

```
┌─────────────────────────────────────────────────────────────┐
│ Function: calculateCombinedXpBoostStats(boosters, weather) │
│ File: src/features/xpTracker/logic/xpBoost.ts              │
└───────────────────────────┬─────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ For each booster in boosters array:                        │
│                                                             │
│ Input: {                                                    │
│   petId: string,                                           │
│   petName: string,                                         │
│   abilities: string[],                                     │
│   strength: number                                         │
│ }                                                           │
└───────────────────────────┬─────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 1: Get Primary XP Boost Ability                       │
│ → getPrimaryXpBoostStats(abilities, strength, weather)     │
│                                                             │
│ Detection:                                                  │
│ → Filter abilities for XP_BOOST_ABILITY_IDS                │
│ → Priority: Snowy > III > II > I                           │
│ → If Snowy: check weather === 'Frost'                      │
│ → Get ability data from MGData.get('abilities')            │
│                                                             │
│ Calculation:                                                │
│ → baseChancePerMinute from ability data                    │
│ → actualChance = baseChance * (strength / 100)             │
│ → baseXpPerProc from ability data                          │
│ → actualXpPerProc = baseXp * (strength / 100)              │
│ → expectedProcsPerHour = actualChance * 60                 │
│ → expectedXpPerHour = actualXpPerProc * expectedProcs      │
│ → isActive = !requiredWeather || weather === required      │
│                                                             │
│ Returns: XpBoostStats | null                               │
└───────────────────────────┬─────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ STEP 2: Aggregate Stats from All Boosters                  │
│                                                             │
│ → Filter out null stats                                    │
│ → Sum totalBonusXpPerHour (only if isActive)               │
│ → Sum totalProcsPerHour (only if isActive)                 │
│ → Count activeBoosterCount (only if isActive)              │
│ → Build boosters array with pet info                       │
│                                                             │
│ Returns: CombinedXpBoostStats {                            │
│   totalBonusXpPerHour: number,                             │
│   totalProcsPerHour: number,                               │
│   activeBoosterCount: number,                              │
│   boosters: Array<{petId, petName, stats}>                │
│ }                                                           │
└─────────────────────────────────────────────────────────────┘
```

---

## Component Architecture

### TeamXpPanel Component

**File:** `C:\Users\ryand\Feeder-Extension\Gemini-main\Gemini-main\src\ui\sections\Pets\parts\TeamXpPanel.ts`

#### Class Structure

```typescript
export class TeamXpPanel {
  // Public
  public root: HTMLElement;

  // Private
  private readonly options: TeamXpPanelOptions;
  private headerElement: HTMLElement | null = null;
  private petsContainer: HTMLElement | null = null;
  private footerElement: HTMLElement | null = null;

  // Methods
  constructor(options: TeamXpPanelOptions)
  build(): HTMLElement
  update(data: TeamXpData): void
  destroy(): void

  // Private Methods
  private updateHeader(summary: TeamXpSummary): void
  private updatePets(pets: TeamPetXpData[]): void
  private updateFooter(summary: TeamXpSummary, pets: TeamPetXpData[]): void
  private buildPetCard(pet: TeamPetXpData): HTMLElement
  private buildProgressWithStats(pet: TeamPetXpData, type: 'next'|'max'): string
  private formatHours(hours: number | null): string
}
```

#### Method Documentation

**`constructor(options: TeamXpPanelOptions)`**
- **Lines:** 71-75
- **Purpose:** Initialize panel instance
- **Parameters:**
  - `options.teamId`: Team to display
  - `options.onCollapse?`: Optional collapse callback
- **Creates:** Root div with class `xp-panel`

**`build(): HTMLElement`**
- **Lines:** 80-100
- **Purpose:** Construct DOM structure
- **Returns:** Root element
- **Structure:**
  ```html
  <div class="xp-panel">
    <div class="xp-panel__header"></div>
    <div class="xp-panel__pets"></div>
    <div class="xp-panel__footer"></div>
  </div>
  ```
- **Note:** CSS injected at PetsSection level for Shadow DOM compatibility

**`update(data: TeamXpData): void`**
- **Lines:** 105-109
- **Purpose:** Refresh panel with new data
- **Calls:**
  - `updateHeader(data.teamSummary)`
  - `updatePets(data.pets)`
  - `updateFooter(data.teamSummary, data.pets)`

**`updateHeader(summary: TeamXpSummary): void`**
- **Lines:** 114-135
- **Purpose:** Display XP rate information
- **Layout:**
  - Left: "Team XP Tracker" title with icon
  - Right: XP rate breakdown (base + bonus = total)
- **Conditional:** Only shows breakdown if bonusXpPerHour > 0

**`updatePets(pets: TeamPetXpData[]): void`**
- **Lines:** 140-151
- **Purpose:** Render pet cards
- **Behavior:**
  - Clears existing cards
  - Calls `buildPetCard()` for each pet
  - Appends to petsContainer

**`buildPetCard(pet: TeamPetXpData): HTMLElement`**
- **Lines:** 156-297
- **Purpose:** Create individual pet card
- **Structure:**
  ```html
  <div class="xp-pet-card [--starving] [--max]">
    <!-- LEFT: Sprite Section -->
    <div class="xp-pet-card__sprite">
      <div class="xp-pet-card__sprite-wrapper">
        <canvas>Pet Sprite</canvas>
      </div>
      <div class="xp-pet-card__badges">
        <span class="xp-badge">MAX/STARVING/Boost</span>
      </div>
    </div>

    <!-- RIGHT: Stats Section -->
    <div class="xp-pet-card__stats">
      <div class="xp-pet-card__name">Pet Name</div>
      <table class="xp-stats-table">
        <tr><td>Strength</td><td>50/100</td></tr>
        <tr><td>Next STR</td><td>progress row</td></tr>
        <tr><td>Max STR</td><td>progress row</td></tr>
        <tr><td>XP Boost</td><td>+7200 XP/hr</td></tr>
        <tr><td>Supporting</td><td>15 feeds</td></tr>
      </table>
    </div>
  </div>
  ```

**Sprite Rendering (Lines 172-198):**
- Uses `MGSprite.toCanvas('pet', species, {mutations, scale, boundsMode})`
- Fallback to paw emoji if sprite not found
- Explicit canvas styles: 64x64px, contain, block
- Pattern matches Journal sprite rendering

**Badge System (Lines 202-218):**
- MAX badge: Green gradient for max-strength pets
- STARVING badge: Red for hunger = 0
- BOOST badge: Gold with tier (I/II/III/❄Snowy)

**Stats Table (Lines 231-291):**
- **Starving state:** Simplified display, warning row
- **Normal state:**
  - Strength row: Gradient current / muted max
  - Next STR row: Progress with time/feeds/bar (if not max)
  - Max STR row: Progress with time/feeds/bar
  - XP Boost row: Bonus XP/hr with inactive indicator
  - Supporting row: Feeds to carry team (max-STR boosters only)

**`buildProgressWithStats(pet, type): string`**
- **Lines:** 303-331
- **Purpose:** Generate progress row HTML
- **Format:** `12.8h (🍖: 13) [████████░░ 69%]`
- **Parameters:**
  - `type`: 'next' or 'max'
- **Calculations:**
  - Next STR: 1-99% (partial progress to next level)
  - Max STR: 0-100% (overall progress)
- **Color Coding:**
  - 0-33%: Red (low)
  - 33-67%: Yellow (medium)
  - 67-100%: Green (high)

**`updateFooter(summary, pets): void`**
- **Lines:** 336-362
- **Purpose:** Display active booster summary
- **Behavior:**
  - Hidden if activeBoosterCount === 0
  - Shows count, bonus XP/hr, booster names
  - Animated lightning icon

**`formatHours(hours): string`**
- **Lines:** 367-381
- **Purpose:** Human-readable time format
- **Logic:**
  - < 1h: Minutes (e.g., "45m")
  - < 24h: Hours with decimal (e.g., "12.8h")
  - >= 24h: Days + hours (e.g., "3d 7h")
  - null/0: "0h"
  - Infinity: "∞"

**`destroy(): void`**
- **Lines:** 386-394
- **Purpose:** Cleanup and remove from DOM
- **Behavior:**
  - Removes from parent node
  - Nulls element references

### CSS Architecture

**File:** `C:\Users\ryand\Feeder-Extension\Gemini-main\Gemini-main\src\ui\sections\Pets\parts\teamXpPanel.css.ts`

#### Design System

**Theme Variables Used:**
```css
/* Layout */
--bg: Background color
--soft: Soft background
--muted: Muted background
--border: Border color
--shadow: Shadow color

/* Text */
--fg: Foreground text
--muted: Muted text

/* Accents */
--accent: Primary accent
--pill-from: Gradient start
--pill-to: Gradient end

/* Mutations (used for XP Boost) */
--mut-gold: Gold color
--mut-ambercharged: Amber color

/* Status Colors */
--low: Red (danger)
--medium: Yellow (warning)
--high: Orange (good)
--complete: Green (success)
```

#### Key Sections

**Main Container (Lines 16-41)**
- Gradient background with border accent
- 3px left border (pill-to color)
- 16px border radius
- Layered shadows (outer + inset)
- Slide-in animation (0.4s cubic-bezier)

**Header (Lines 47-108)**
- Flexbox: space-between alignment
- Gradient background (soft → muted)
- Title: Uppercase, bold, letter-spacing
- Rate display: Conditional breakdown showing base + bonus = total

**Pets Container (Lines 114-120)**
- Vertical flex column
- 2px gap between cards
- Soft background

**Pet Card (Lines 126-194)**
- Horizontal flex layout
- Hover effects: shadow + translateX
- Left accent bar (gradient, opacity transition)
- Modifiers:
  - `--max`: Green border, complete gradient
  - `--starving`: Red border, pulsing animation (2s)

**Sprite Section (Lines 200-233)**
- Fixed 64x64px wrapper
- Gradient inset background
- Pixelated rendering for sprites
- Fallback emoji at 50% opacity

**Badges (Lines 235-271)**
- Flex wrap layout
- Uppercase, bold, micro-font
- Color-coded:
  - MAX: Green gradient, white text
  - STARVING: Red, white text
  - BOOST: Gold gradient, dark text

**Stats Table (Lines 295-356)**
- Full width, collapsed borders
- Label: Uppercase, muted, fixed 80px width
- Value: Bold, foreground color
- Strength display: Gradient current, large font

**Progress Row (Lines 358-443)**
- Flex layout with wrapping
- Time: Bold, fixed min-width
- Feeds: Muted, meat emoji
- Progress bar:
  - 10px height, rounded
  - Gradient fills (low/medium/high)
  - Shimmer animation (2.5s loop)
  - Percent label (11px, bold)

**Footer (Lines 481-528)**
- Gradient background
- Lightning icon with pulse animation (1.5s)
- Booster count + names display
- Gold/amber color scheme

**Responsive (Lines 534-559)**
- Mobile (< 480px):
  - Header stacks vertically
  - Pet cards center-aligned
  - Sprite section horizontal

**Accessibility (Lines 565-599)**
- Focus-within outline
- Reduced motion support
- Print-friendly styles

---

## Phase 1 Change Specifications

### Overview

Phase 1 focuses on visual refinements to the TeamXpPanel component without changing functionality.

**Files Modified:** 2
1. `C:\Users\ryand\Feeder-Extension\Gemini-main\Gemini-main\src\ui\sections\Pets\parts\TeamXpPanel.ts`
2. `C:\Users\ryand\Feeder-Extension\Gemini-main\Gemini-main\src\ui\sections\Pets\parts\teamXpPanel.css.ts`

### Change Specification: TeamXpPanel.ts

#### Change 1: Header Title
**Line:** 122
**Current:**
```typescript
<span>Team XP Tracker</span>
```
**New:**
```typescript
<span>XP Tracker</span>
```
**Reason:** Shorter, cleaner title

---

#### Change 2: Header Rate Display
**Lines:** 119-134
**Current:**
```typescript
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
```

**New:**
```typescript
this.headerElement.innerHTML = `
    <div class="xp-panel__header-title">
        <span class="xp-panel__header-icon">📊</span>
        <span>XP Tracker</span>
    </div>
    <div class="xp-panel__header-rate">
        <span class="xp-panel__rate-total">${summary.totalXpPerHour.toLocaleString()} XP/hr</span>
    </div>
`;
```
**Reason:** Simplify to show only total XP rate (breakdown in footer)

---

#### Change 3: Feed Display Format
**Line:** 322
**Current:**
```typescript
<span class="xp-progress-row__feeds">(🍖: ${feeds})</span>
```
**New:**
```typescript
<span class="xp-progress-row__feeds">(🍖 x${feeds})</span>
```
**Reason:** More intuitive "x" notation for quantity

---

#### Change 4: Remove Strength Row from Stats Table
**Lines:** 247-258
**Current:**
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
**New:**
```typescript
<!-- REMOVED - Strength displayed under sprite badge instead -->
```
**Reason:** Move strength display under sprite for better visual hierarchy

**New Badge Addition (insert after line 218):**
```typescript
// Add strength badge under sprite
const strengthBadge = document.createElement('div');
strengthBadge.className = 'xp-badge xp-badge--strength';
strengthBadge.textContent = `${pet.currentStrength}/${pet.maxStrength} STR`;
badgesRow.appendChild(strengthBadge);
```

---

### Change Specification: teamXpPanel.css.ts

#### Change 1: Remove Stats Table Row Borders
**Lines:** 302-303
**Current:**
```css
.xp-stats-table__row {
    border-bottom: 1px solid var(--border);
}
```
**New:**
```css
.xp-stats-table__row {
    /* No border - cleaner look */
}
```
**Reason:** Reduce visual clutter

---

#### Change 2: Update Bonus XP Color
**Line:** 97
**Current:**
```css
.xp-panel__rate-bonus {
    color: var(--mut-gold);
    font-weight: 700;
}
```
**New:**
```css
/* REMOVED - no longer showing breakdown in header */
```
**Reason:** Breakdown removed from header

---

#### Change 3: Update Footer to Theme Colors
**Lines:** 481-528
**Current:**
```css
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

**New:**
```css
.xp-panel__footer-icon {
    font-size: 24px;
    color: var(--accent);
    animation: boostPulse 1.5s ease-in-out infinite;
}

.xp-panel__footer-title {
    font-size: 13px;
    font-weight: 800;
    color: var(--pill-to);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.xp-panel__footer-detail {
    font-size: 14px;
    font-weight: 600;
    color: var(--accent);
    margin-top: 2px;
}

.xp-panel__footer-names {
    color: var(--muted);
    font-size: 12px;
    font-weight: 500;
}
```
**Reason:** Use semantic theme colors instead of mutation colors

---

#### Change 4: Update Header Colors
**Lines:** 47-108
**Current:**
```css
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

.xp-panel__rate-total {
    background: linear-gradient(135deg, var(--pill-from), var(--pill-to));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-size: 16px;
    font-weight: 900;
}
```

**New:**
```css
.xp-panel__header-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--accent);
}

.xp-panel__rate-total {
    color: var(--pill-to);
    font-size: 16px;
    font-weight: 900;
}
```
**Reason:** Simplify color usage, accent for title, solid pill-to for rate

---

#### Change 5: Add Strength Badge Style
**Insert after line 271:**
```css
.xp-badge--strength {
    background: linear-gradient(135deg, var(--pill-from), var(--pill-to));
    color: var(--fg);
    text-shadow: 0 1px 1px var(--shadow);
    font-size: 10px;
}
```
**Reason:** New badge style for strength display under sprite

---

### Implementation Checklist

- [ ] Update TeamXpPanel.ts line 122 (header title)
- [ ] Update TeamXpPanel.ts lines 119-134 (header rate display)
- [ ] Update TeamXpPanel.ts line 322 (feed format)
- [ ] Remove TeamXpPanel.ts lines 247-258 (strength row)
- [ ] Add strength badge to TeamXpPanel.ts buildPetCard() method
- [ ] Update teamXpPanel.css.ts lines 302-303 (remove row borders)
- [ ] Remove teamXpPanel.css.ts lines 97-99 (rate bonus styles)
- [ ] Update teamXpPanel.css.ts lines 481-528 (footer colors)
- [ ] Update teamXpPanel.css.ts lines 56-64, 101-108 (header colors)
- [ ] Add teamXpPanel.css.ts strength badge styles

### Testing Requirements

**Visual Testing:**
1. Verify header shows "XP Tracker" title
2. Verify header shows only total XP rate
3. Verify feed format shows "🍖 x13" notation
4. Verify strength badge appears under sprite
5. Verify strength removed from stats table
6. Verify footer uses theme colors (accent, pill-to, muted)
7. Verify header title uses accent color
8. Verify stats table rows have no borders

**Functional Testing:**
1. Verify XP calculations unchanged
2. Verify expand/collapse still works
3. Verify 5-team FIFO limit still enforced
4. Verify auto-update continues every 3s
5. Verify all data displays correctly

**Browser Testing:**
- Chrome/Edge (Chromium)
- Firefox
- Mobile responsive view (< 480px)

---

## Technical Debt & Known Issues

### Known Issues

1. **No Error Handling for Missing Sprites**
   - **Location:** TeamXpPanel.ts, lines 176-198
   - **Issue:** Try-catch logs warning but doesn't provide user feedback
   - **Impact:** Low - fallback emoji displays
   - **Resolution:** Phase 2+ consideration

2. **Hard-coded Max Expanded Teams**
   - **Location:** PetsSection (not shown in current files)
   - **Issue:** 5-team limit not configurable
   - **Impact:** Low - reasonable default
   - **Resolution:** Move to config in future version

3. **Feed Calculations Assume Full Replenishment**
   - **Location:** calculators/logic/feed.ts
   - **Issue:** Doesn't account for partial feeds or degrading hunger
   - **Impact:** Medium - estimates may be slightly off
   - **Resolution:** Noted as "MVP" in types, future enhancement

4. **No Offline Support**
   - **Location:** All auto-update logic
   - **Issue:** Relies on Globals being available
   - **Impact:** Low - game requires online connection
   - **Resolution:** Not planned

5. **CSS Variable Dependency**
   - **Location:** teamXpPanel.css.ts
   - **Issue:** Assumes theme CSS variables exist
   - **Impact:** Low - core game provides these
   - **Resolution:** Document dependency

### Technical Debt

1. **Duplicate Strength Calculations**
   - **Location:** Multiple files calculate currentStrength/maxStrength
   - **Debt:** Should centralize in Globals.myPets
   - **Effort:** Medium
   - **Priority:** Low

2. **Type Duplication**
   - **Location:** TeamXpData types defined in TeamXpPanel.ts
   - **Debt:** Should be in xpTracker/types.ts
   - **Effort:** Low
   - **Priority:** Medium

3. **Magic Numbers**
   - **Location:** Various (e.g., 64px sprite size, 3s update interval)
   - **Debt:** Extract to constants
   - **Effort:** Low
   - **Priority:** Low

4. **No Unit Tests**
   - **Location:** All calculation logic
   - **Debt:** Add Jest tests for calculators
   - **Effort:** High
   - **Priority:** High (for future phases)

5. **Manual DOM Manipulation**
   - **Location:** TeamXpPanel component
   - **Debt:** Consider React/Vue migration
   - **Effort:** Very High
   - **Priority:** Low (works well as-is)

### Performance Considerations

1. **3s Auto-update Interval**
   - Current: Every 3 seconds for all expanded panels
   - Impact: Negligible (< 50ms per update)
   - Optimization: Could batch updates if many teams expanded

2. **Sprite Rendering**
   - Current: Re-renders canvas on every update
   - Impact: Low (sprites cached by MGSprite)
   - Optimization: Cache rendered canvases per pet

3. **Progress Calculation**
   - Current: Recalculates all pets on each refresh
   - Impact: Low (< 100 pets typical)
   - Optimization: Only recalculate if XP/hunger changed

### Future Enhancements

1. **Team Comparison View**
   - Side-by-side team stats
   - XP rate rankings
   - Optimal team suggestions

2. **Historical Tracking**
   - XP gain over time graphs
   - Feed usage analytics
   - Strength progression charts

3. **Export/Import Teams**
   - Share team configs
   - Backup/restore functionality

4. **Advanced Filters**
   - Filter by ability
   - Filter by mutation
   - Custom sort expressions

5. **Notifications**
   - Alert when pet reaches max STR
   - Alert when pet is starving
   - Feed reminder system

---

## Appendix: File Manifest

### Core Implementation Files

| File Path | Lines | Purpose |
|-----------|-------|---------|
| `src/features/petTeam/index.ts` | 80 | MGPetTeam public API |
| `src/features/petTeam/types.ts` | 67 | PetTeam type definitions |
| `src/features/petTeam/state.ts` | ~100 | Config storage management |
| `src/features/petTeam/logic/team.ts` | ~200 | CRUD operations |
| `src/features/petTeam/logic/active.ts` | ~50 | Active team management |
| `src/features/xpTracker/index.ts` | 382 | MGXPTracker public API |
| `src/features/xpTracker/types.ts` | 205 | XP type definitions |
| `src/features/xpTracker/state.ts` | ~100 | Config storage management |
| `src/features/xpTracker/logic/xpBoost.ts` | ~250 | XP Boost calculations |
| `src/features/xpTracker/logic/teamXpCalculations.ts` | 265 | Team XP data builder |
| `src/features/xpTracker/logic/sorting.ts` | ~150 | Pet filtering/sorting |
| `src/ui/sections/Pets/parts/TeamXpPanel.ts` | 396 | XP display component |
| `src/ui/sections/Pets/parts/teamXpPanel.css.ts` | 601 | Component styles |
| `src/modules/calculators/logic/xp.ts` | ~300 | Core XP calculations |
| `src/modules/calculators/logic/feed.ts` | ~200 | Feed calculations |

**Total Implementation:** ~3,000 lines across 15 files

---

**End of Document**
