# Pet Team XP Tracker - Implementation Plan (GEMINI)

**Project:** GEMINI Mod
**Spec:** Pet-Team-XP-Tracker-Integration.md
**Created:** 2026-01-07
**Status:** Ready for Implementation

---

## Implementation Summary

This plan details the step-by-step implementation of inline XP tracking within the Pets section for the GEMINI mod. All work follows `.claude/rules/` compliance and `.claude/workflows/` patterns.

---

## Phase 1: Preparation & Cleanup

### 1.1 Verify Existing XP Tracker Implementation

**Files to Review:**
- `src/features/xpTracker/index.ts` - Public API
- `src/features/xpTracker/logic/xpCalculations.ts` - Core XP logic
- `src/features/xpTracker/logic/xpBoost.ts` - XP Boost detection
- `src/features/xpTracker/logic/feedCalculations.ts` - Feed requirements
- `src/modules/calculators/logic/xp.ts` - Base XP calculations
- `src/modules/calculators/logic/feed.ts` - Feed utilities

**Goal:** Ensure we understand all XP calculation functions that will be reused.

**Action Items:**
- [ ] Read and document all public methods from `MGXPTracker`
- [ ] Identify which functions can be imported directly
- [ ] Note any functions that need adaptation for team-specific calculations

### 1.2 Review Pets Section Architecture

**Files to Review:**
- `src/ui/sections/Pets/section.ts` - PetsSection class
- `src/ui/sections/Pets/parts/TeamCard.ts` - TeamCardPart component
- `src/ui/components/TeamListItem/TeamListItem.ts` - Team display
- `src/features/petTeam/index.ts` - Pet team management API

**Goal:** Understand current Pets section structure and how to integrate XP panels.

**Action Items:**
- [ ] Document TeamCardPart render lifecycle
- [ ] Identify where expand/collapse button will be added
- [ ] Determine how to inject XP panel into team cards
- [ ] Review drag-and-drop code to ensure XP panel doesn't interfere

---

## Phase 2: Core Implementation

### 2.1 Create TeamXpPanel Component

**File:** `src/ui/sections/Pets/parts/TeamXpPanel.ts`

**Purpose:** Displays XP tracking data for a single pet team.

**Public API:**
```typescript
export class TeamXpPanel {
  root: HTMLElement;

  constructor(options: {
    teamId: string;
    onCollapse?: () => void;
  });

  build(): HTMLElement;
  update(xpData: TeamXpData): void;
  destroy(): void;
}
```

**Responsibilities:**
- Render team XP summary (base + bonus XP/hr)
- Display per-pet stats grid (strength, time to max, feeds, XP boost)
- Show XP boost summary for team
- Handle starving pets (STARVING badge, 0 XP/hr)
- Display max-strength boosters with "Supporting: X feeds"

**Data Structure:**
```typescript
interface TeamXpData {
  teamId: string;
  teamName: string;
  pets: Array<{
    id: string;
    name: string;
    species: string;
    currentStrength: number;
    maxStrength: number;
    isMaxStrength: boolean;
    xpPerHour: number;  // base + team boosts
    hoursToNextStrength: number | null;
    hoursToMaxStrength: number;
    feedsToNextStrength: number | null;
    feedsToMaxStrength: number;
    isStarving: boolean;
    hunger: number;
    xpBoostStats: XpBoostStats | null;
    supportingFeeds: number | null;  // for max STR boosters
  }>;
  teamSummary: {
    baseXpPerHour: number;  // 3600
    bonusXpPerHour: number;  // from XP boost pets
    totalXpPerHour: number;  // base + bonus
    activeBoosterCount: number;
    totalProcsPerHour: number;
  };
}
```

**Implementation Steps:**
1. Create component file with basic structure
2. Implement `build()` - create DOM structure
3. Implement `update()` - populate with XP data
4. Implement per-pet stat rendering
5. Implement XP boost summary rendering
6. Handle edge cases (starving, empty, max STR)
7. Add destroy() cleanup

**Dependencies:**
- `MGSprite.toCanvas()` for pet sprites (if showing sprites in panel)
- XP calculation utilities (imported from xpTracker feature)

---

### 2.2 Create TeamXpPanel Styles

**File:** `src/ui/sections/Pets/parts/teamXpPanel.css.ts`

**Export:** `teamXpPanelCss`

**Required Styles:**
- `.team-xp-panel` - Main container
- `.team-xp-summary` - Top summary banner
- `.team-xp-pets-grid` - Per-pet stats grid
- `.team-xp-pet-card` - Individual pet stat card
- `.team-xp-boost-summary` - Bottom XP boost summary
- `.team-xp-progress-bar` - Progress bar with color classes
- `.team-xp-badge` - Badges (MAX, STARVING, ⚡II, etc.)
- `.team-xp-stat-row` - Stat row layout
- `.team-xp-supporting` - Max STR booster supporting info

**Theme Compatibility:**
- Use CSS variables: `--fg`, `--bg`, `--soft`, `--accent`, `--border`, `--muted`
- Use status colors: `--low`, `--medium`, `--high`
- Use `--font-game` for game-style text

**Responsive:**
- Grid layout: 3 columns on desktop, 1 column on mobile (<768px)
- Stack stats vertically on narrow screens
- Touch-friendly spacing

---

### 2.3 Add Expand/Collapse Logic to TeamListItem

**File:** `src/ui/components/TeamListItem/TeamListItem.ts`

**Changes Required:**

1. **Add expand button to DOM structure:**
```typescript
// In build() method, add:
const expandButton = document.createElement('button');
expandButton.className = 'team-list-item-expand-btn';
expandButton.innerHTML = '▶'; // or '▼' when expanded
expandButton.title = 'Show XP tracking';
expandButton.addEventListener('click', (e) => {
  e.stopPropagation();  // Don't trigger team activation
  this.handleExpandToggle();
});
```

2. **Add expanded state:**
```typescript
private isExpanded: boolean = false;

private handleExpandToggle(): void {
  this.isExpanded = !this.isExpanded;
  this.options.onExpandToggle?.(this.isExpanded);
  this.updateExpandButton();
}

private updateExpandButton(): void {
  this.expandButton.innerHTML = this.isExpanded ? '▼' : '▶';
  this.expandButton.title = this.isExpanded ? 'Hide XP tracking' : 'Show XP tracking';
}
```

3. **Add progress summary badge:**
```typescript
// Add after pet slots, shows when collapsed
const progressBadge = document.createElement('div');
progressBadge.className = 'team-progress-badge';
// Will be updated with: "██████░░░░ 67%"
```

4. **Update Options interface:**
```typescript
interface TeamListItemOptions {
  // ... existing options
  showExpandButton?: boolean;  // Only show if XP tracker enabled
  onExpandToggle?: (isExpanded: boolean) => void;
  progressPercent?: number;  // For progress badge
}
```

**Position of Expand Button:**
- Place to the right of the team name, before pet slots
- Hidden in Manage mode (managed via `showExpandButton` option)

---

### 2.4 Enhance TeamCardPart with XP Panel Integration

**File:** `src/ui/sections/Pets/parts/TeamCard.ts`

**Changes Required:**

1. **Add expansion tracking state:**
```typescript
private expandedTeams: Map<string, {
  panel: TeamXpPanel;
  expandedAt: number;  // timestamp for FIFO
}> = new Map();

private readonly MAX_EXPANDED = 5;
```

2. **Add XP data calculation method:**
```typescript
private async calculateTeamXp(teamId: string): Promise<TeamXpData | null> {
  const team = MGPetTeam.getTeam(teamId);
  if (!team) return null;

  // Use MGXPTracker utility functions:
  // - Get pets for team
  // - Calculate per-pet XP stats
  // - Calculate team boost summary
  // - Handle empty slots
  // - Return TeamXpData
}
```

3. **Add expansion handler:**
```typescript
private handleTeamExpand(teamId: string): void {
  if (this.expandedTeams.has(teamId)) {
    // Collapse
    this.collapseTeam(teamId);
  } else {
    // Check limit
    if (this.expandedTeams.size >= this.MAX_EXPANDED) {
      // Find oldest (FIFO)
      const oldest = Array.from(this.expandedTeams.entries())
        .sort(([, a], [, b]) => a.expandedAt - b.expandedAt)[0];
      if (oldest) {
        this.collapseTeam(oldest[0]);
      }
    }

    // Expand
    this.expandTeam(teamId);
  }
}

private expandTeam(teamId: string): void {
  const panel = new TeamXpPanel({
    teamId,
    onCollapse: () => this.collapseTeam(teamId),
  });

  // Insert panel below team list item
  const teamElement = this.findTeamElement(teamId);
  const panelElement = panel.build();
  teamElement.insertAdjacentElement('afterend', panelElement);

  this.expandedTeams.set(teamId, {
    panel,
    expandedAt: Date.now(),
  });

  // Initial update
  this.updateTeamXp(teamId);
}

private collapseTeam(teamId: string): void {
  const entry = this.expandedTeams.get(teamId);
  if (!entry) return;

  entry.panel.destroy();
  this.expandedTeams.delete(teamId);
}
```

4. **Add auto-update logic:**
```typescript
private xpUpdateInterval: number | null = null;

private startXpUpdates(): void {
  if (this.xpUpdateInterval !== null) return;

  this.xpUpdateInterval = window.setInterval(() => {
    for (const teamId of this.expandedTeams.keys()) {
      this.updateTeamXp(teamId);
    }
  }, 3000);
}

private stopXpUpdates(): void {
  if (this.xpUpdateInterval === null) return;

  window.clearInterval(this.xpUpdateInterval);
  this.xpUpdateInterval = null;
}

private async updateTeamXp(teamId: string): Promise<void> {
  const entry = this.expandedTeams.get(teamId);
  if (!entry) return;

  const xpData = await this.calculateTeamXp(teamId);
  if (xpData) {
    entry.panel.update(xpData);
  }
}
```

5. **Add progress calculation for badges:**
```typescript
private calculateTeamProgress(teamId: string): number {
  const team = MGPetTeam.getTeam(teamId);
  if (!team) return 0;

  const pets = MGPetTeam.getPetsForTeam(team);
  if (pets.length === 0) return 0;

  // Average of all pets' (currentSTR / maxSTR)
  const percentages = pets.map(pet => {
    const maxStr = calculateMaxStrength(pet);  // from xp utils
    const currentStr = calculateCurrentStrength(pet);  // from xp utils
    return (currentStr / maxStr) * 100;
  });

  return percentages.reduce((a, b) => a + b, 0) / percentages.length;
}
```

6. **Update render() to pass progress and expand state:**
```typescript
// In renderOverviewMode(), when creating TeamListItem:
new TeamListItem({
  // ... existing options
  showExpandButton: MGXPTracker.isEnabled(),  // Only if XP tracker enabled
  onExpandToggle: (isExpanded) => this.handleTeamExpand(team.id),
  progressPercent: this.calculateTeamProgress(team.id),
});
```

7. **Mode switching logic:**
```typescript
// In mode change handler:
private handleModeChange(newMode: 'overview' | 'manage'): void {
  if (newMode === 'manage') {
    // Collapse all XP panels
    for (const teamId of Array.from(this.expandedTeams.keys())) {
      this.collapseTeam(teamId);
    }
    this.stopXpUpdates();
  } else if (newMode === 'overview') {
    // Re-enable XP tracking
    // (User can expand teams again)
  }

  this.render();
}
```

8. **Cleanup in destroy():**
```typescript
destroy(): void {
  this.stopXpUpdates();

  for (const teamId of Array.from(this.expandedTeams.keys())) {
    this.collapseTeam(teamId);
  }

  // ... existing cleanup
}
```

---

### 2.5 Add Progress Badge Styles to TeamListItem

**File:** `src/ui/components/TeamListItem/teamListItem.css.ts`

**Add Styles:**
```css
/* Expand button */
.team-list-item-expand-btn {
  background: var(--soft);
  border: 1px solid var(--border);
  border-radius: 4px;
  color: var(--fg);
  cursor: pointer;
  font-size: 12px;
  padding: 4px 8px;
  margin-left: 8px;
  transition: all 0.2s ease;
}

.team-list-item-expand-btn:hover {
  background: var(--accent);
  color: var(--bg);
}

/* Progress badge (shown when collapsed) */
.team-progress-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--muted);
  margin-left: auto;
  padding: 4px 8px;
  background: var(--soft);
  border-radius: 4px;
  border: 1px solid var(--border);
}

.team-progress-bar-mini {
  display: inline-block;
  width: 60px;
  height: 8px;
  background: var(--soft);
  border: 1px solid var(--border);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.team-progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--low), var(--high));
  transition: width 0.3s ease;
}

.team-progress-percent {
  font-family: var(--font-game);
  font-weight: 600;
}
```

---

### 2.6 Add XP Boost Badges to Pet Sprites

**File:** `src/ui/components/TeamListItem/TeamListItem.ts`

**Changes:**

1. **Detect XP Boost abilities when rendering pet sprites:**
```typescript
private async renderPetSlot(petId: string, slotElement: HTMLElement): Promise<void> {
  // ... existing sprite rendering

  // After sprite is rendered, check for XP Boost
  const pet = Globals.myPets.get()?.activePets.find(p => p.id === petId);
  if (!pet) return;

  const xpBoostAbility = this.getXpBoostAbility(pet);
  if (xpBoostAbility) {
    const badge = this.createXpBoostBadge(xpBoostAbility);
    slotElement.appendChild(badge);
  }
}

private getXpBoostAbility(pet: UnifiedPet): string | null {
  const abilities = pet.abilities || [];

  if (abilities.includes('PetXpBoost1')) return '⚡I';
  if (abilities.includes('PetXpBoost2')) return '⚡II';
  if (abilities.includes('PetXpBoost3')) return '⚡III';
  if (abilities.includes('SnowyPetXpBoost')) return '❄';

  return null;
}

private createXpBoostBadge(badgeText: string): HTMLElement {
  const badge = document.createElement('div');
  badge.className = 'pet-xp-boost-badge';
  badge.textContent = badgeText;
  return badge;
}
```

2. **Add badge styles:**
```css
.pet-xp-boost-badge {
  position: absolute;
  top: 2px;
  right: 2px;
  background: rgba(255, 215, 0, 0.9);
  color: #000;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 4px;
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  pointer-events: none;
  z-index: 10;
}
```

---

## Phase 3: XP Calculation Integration

### 3.1 Create Team XP Calculator Utility

**File:** `src/features/xpTracker/logic/teamXpCalculations.ts`

**Purpose:** Centralized team-specific XP calculations.

**Functions to Implement:**
```typescript
/**
 * Calculate full XP data for a specific pet team
 */
export function calculateTeamXpData(teamId: string): TeamXpData | null {
  // 1. Get team from MGPetTeam
  // 2. Get pets for team
  // 3. For each pet:
  //    - Calculate current/max strength
  //    - Calculate XP rates
  //    - Calculate time to next/max
  //    - Calculate feed requirements
  //    - Detect XP Boost abilities
  //    - Handle starving status
  // 4. Calculate team boost summary
  // 5. Handle max STR boosters (supporting feeds)
  // 6. Return TeamXpData
}

/**
 * Calculate average team progress (% to max STR)
 */
export function calculateTeamProgressPercent(teamId: string): number {
  // Average of all pets' (currentSTR / maxSTR) * 100
}

/**
 * Calculate supporting feeds for max STR XP Boost pet
 */
export function calculateSupportingFeeds(
  boosterPet: UnifiedPet,
  levelingPets: UnifiedPet[]
): number {
  // Find slowest leveling pet
  // Calculate feeds needed for booster to support that pet reaching max
}
```

**Dependencies:**
- Import from `src/modules/calculators/logic/xp.ts`:
  - `calculateMaxStrength()`
  - `calculateCurrentStrength()`
  - `calculateXpToNextStrength()`
  - `calculateXpToMaxStrength()`
- Import from `src/modules/calculators/logic/feed.ts`:
  - `calculateFeedsNeeded()`
- Import from `src/features/xpTracker/logic/xpBoost.ts`:
  - `detectXpBoostAbilities()`
  - `calculateXpBoostStats()`
- Import from `src/globals/variables/myPets.ts`:
  - `Globals.myPets.get()`
- Import from `src/features/petTeam/index.ts`:
  - `MGPetTeam.getTeam()`
  - `MGPetTeam.getPetsForTeam()`

---

### 3.2 Weather-Aware XP Boost Detection

**Update:** `src/features/xpTracker/logic/xpBoost.ts` (if needed)

**Ensure:**
- `calculateXpBoostStats()` checks current weather from `Globals.weather.get()`
- Snowy XP Boost ability is marked as `isActive: false` when weather is not Frost
- Bonus XP calculations account for weather conditions

---

## Phase 4: Standalone XP Tracker Removal

### 4.1 Remove XP Tracker Section Files

**Files to Delete:**
- `src/ui/sections/XpTracker/section.ts`
- `src/ui/sections/XpTracker/index.ts`
- `src/ui/sections/XpTracker/styles.css.ts`

**Actions:**
1. Delete the entire `src/ui/sections/XpTracker/` directory
2. Remove from `src/ui/sections/registry.ts`:
   - Remove `import { XpTrackerSection } from './XpTracker';`
   - Remove `new XpTrackerSection()` from sections array
3. Remove from `src/ui/sections/index.ts` (if exported there)

**Note:** Keep the `src/features/xpTracker/` directory intact - we're reusing the calculation logic!

---

### 4.2 Update XP Tracker Feature Docs

**File:** `src/features/xpTracker/README.md` (if exists)

**Update:** Document that XP tracking is now inline in Pets section, not standalone.

---

## Phase 5: Testing & Polish

### 5.1 Test Cases

**Expansion/Collapse:**
- [ ] Click expand button (▶) - team expands with XP panel
- [ ] Click expand button (▼) - team collapses, XP panel removed
- [ ] Expand 5 teams - all show XP panels
- [ ] Expand 6th team - oldest team auto-collapses
- [ ] Switch to Manage mode - all XP panels collapse
- [ ] Switch back to Overview - can expand teams again
- [ ] Reload page - all teams are collapsed

**XP Data Display:**
- [ ] Team with 3 pets - shows all 3 pet stats
- [ ] Team with 2 pets - shows 2 pet stats (skips empty slot)
- [ ] Team with 1 pet - shows 1 pet stat
- [ ] Team with starving pet - shows STARVING badge, 0 XP/hr
- [ ] Team with max STR pet - shows MAX badge
- [ ] Team with XP Boost pet - shows ⚡badge and boost stats
- [ ] Team with Snowy XP Boost in Frost weather - active boost
- [ ] Team with Snowy XP Boost in other weather - inactive boost
- [ ] Max STR booster + leveling pets - shows "Supporting: X feeds"

**Progress Summary:**
- [ ] Collapsed team - shows mini progress bar + %
- [ ] Team with mixed progress (45%, 85%, 100%) - shows 76.7%
- [ ] Team with all max STR - shows 100%
- [ ] Team with all low STR - shows correct low %

**Auto-Update:**
- [ ] Expanded team updates every 3 seconds
- [ ] Feed a pet - XP data updates on next cycle
- [ ] Weather changes - Snowy boost activates/deactivates
- [ ] Edit team - XP panel updates with new pets

**Performance:**
- [ ] 5 expanded teams update smoothly (no lag)
- [ ] Collapsed teams don't calculate XP (performance check)
- [ ] No memory leaks after expanding/collapsing 20+ times

**Responsive:**
- [ ] Desktop (>768px) - 3-column pet grid
- [ ] Mobile (<768px) - 1-column stacked pet grid
- [ ] Touch-friendly expand button
- [ ] Scrollable XP panel on small screens

**Theme Compatibility:**
- [ ] Light theme - readable XP data
- [ ] Dark theme - readable XP data
- [ ] All CSS variables resolve correctly

---

### 5.2 Edge Case Handling

**Empty/Incomplete Teams:**
- [ ] Empty team (no pets) - expand button disabled or hidden
- [ ] Team with only XP Boost pets (all max STR) - shows boost-only info
- [ ] Team with no XP Boost pets - shows base XP only

**Extreme Values:**
- [ ] Very high strength (99/100) - correct time/feed calc
- [ ] Very low strength (1/100) - correct time/feed calc
- [ ] Max STR pet (100/100) - shows MAX, no time/feeds

**Data Sync:**
- [ ] Pet is removed from team while expanded - panel updates
- [ ] Pet is added to team while expanded - panel updates
- [ ] Active team changes - new active team's indicator updates

---

### 5.3 Polish & UX

**Visual:**
- [ ] Smooth expand/collapse animation (CSS transition)
- [ ] Progress bars color-coded (low: red, medium: yellow, high: green)
- [ ] XP Boost badges clearly visible on pet sprites
- [ ] Clear visual separation between teams and XP panels

**Accessibility:**
- [ ] Expand button has aria-label
- [ ] Progress bar has aria-valuenow/valuemin/valuemax
- [ ] Badges have tooltips explaining what they mean

**Discoverability:**
- [ ] Expand button visible when XP Tracker is enabled
- [ ] Tooltip on expand button: "Show XP tracking for this team"
- [ ] First-time user sees expand buttons immediately

---

## Phase 6: Documentation & Release

### 6.1 Update CHANGELOG

**File:** `CHANGELOG.md`

**Add Entry:**
```markdown
## [Unreleased]

### Added
- Inline XP tracking in Pets section - view XP data directly on team cards
- Progress summary badges on collapsed teams (% to max STR)
- XP Boost badges on pet sprites (⚡I, ⚡II, ⚡III, ❄)
- Expandable XP panels with per-pet stats and team boost summary
- Auto-update every 3s for expanded teams (max 5)
- Supporting feeds display for max STR XP Boost pets

### Changed
- XP tracking now integrated into Pets section (was standalone)
- XP tracker only shows in Overview mode (not Manage mode)

### Removed
- Standalone XP Tracker section (replaced by inline tracking)
```

### 6.2 Update TODO

**File:** `TODO.md`

**Mark Complete:**
- [x] Integrate XP tracking into Pets section
- [x] Add inline team XP panels
- [x] Remove standalone XP Tracker section

---

### 6.3 Update User Documentation

**File:** `README.md` or user guide

**Add Section:**
```markdown
## XP Tracking

View XP tracking data directly within pet teams:

1. Enable XP Tracker in settings
2. Go to Pets section (Overview mode)
3. Click the expand button (▶) on any team
4. View per-pet XP rates, strength progression, and time/feeds to max
5. Collapse teams with the collapse button (▼)

Features:
- Progress summary on collapsed teams
- XP Boost badges on pet sprites
- Auto-updates every 3 seconds
- Up to 5 teams can be expanded simultaneously
```

---

## Implementation Checklist

### Phase 1: Preparation ✓
- [ ] Review existing XP tracker implementation
- [ ] Review Pets section architecture
- [ ] Document all functions to be reused

### Phase 2: Core Implementation
- [ ] Create TeamXpPanel component
- [ ] Create TeamXpPanel styles
- [ ] Add expand/collapse to TeamListItem
- [ ] Add progress badge to TeamListItem
- [ ] Enhance TeamCardPart with XP panel integration
- [ ] Add XP Boost badges to pet sprites
- [ ] Update TeamListItem styles

### Phase 3: Calculations
- [ ] Create team XP calculator utility
- [ ] Implement calculateTeamXpData()
- [ ] Implement calculateTeamProgressPercent()
- [ ] Implement calculateSupportingFeeds()
- [ ] Verify weather-aware XP Boost detection

### Phase 4: Cleanup
- [ ] Delete standalone XP Tracker section files
- [ ] Remove from sections registry
- [ ] Update feature documentation

### Phase 5: Testing
- [ ] Test expansion/collapse behavior
- [ ] Test XP data display accuracy
- [ ] Test progress summary calculation
- [ ] Test auto-update logic
- [ ] Test edge cases
- [ ] Test performance with 5 expanded teams
- [ ] Test responsive design
- [ ] Test theme compatibility

### Phase 6: Release
- [ ] Update CHANGELOG.md
- [ ] Update TODO.md
- [ ] Update user documentation
- [ ] Commit changes
- [ ] Create release build
- [ ] Test release build in browser

---

## File Manifest

### New Files
- `src/ui/sections/Pets/parts/TeamXpPanel.ts`
- `src/ui/sections/Pets/parts/teamXpPanel.css.ts`
- `src/features/xpTracker/logic/teamXpCalculations.ts`

### Modified Files
- `src/ui/components/TeamListItem/TeamListItem.ts`
- `src/ui/components/TeamListItem/teamListItem.css.ts`
- `src/ui/sections/Pets/parts/TeamCard.ts`
- `src/ui/sections/registry.ts`
- `CHANGELOG.md`
- `TODO.md`

### Deleted Files
- `src/ui/sections/XpTracker/section.ts`
- `src/ui/sections/XpTracker/index.ts`
- `src/ui/sections/XpTracker/styles.css.ts`
- Entire `src/ui/sections/XpTracker/` directory

---

## Notes

- All implementations follow `.claude/rules/` compliance
- Component structure follows `.claude/rules/ui/ui.components.md`
- Section integration follows `.claude/rules/ui/ui.sections.md`
- Feature logic follows `.claude/rules/features.md`
- State management follows `.claude/rules/state/atoms.md` and `.claude/rules/state/globals.md`
- Cleanup follows `.claude/rules/core.md` (no side effects, proper destroy)
- TypeScript strict mode enforced (no `any` types)

---

## Success Criteria

Implementation is complete when:
- ✓ Users can expand/collapse teams to view XP tracking
- ✓ XP data is accurate and matches calculations
- ✓ Max 5 teams can be expanded (FIFO auto-collapse)
- ✓ XP panels only work in Overview mode
- ✓ Progress badges show on collapsed teams
- ✓ XP Boost badges show on pet sprites
- ✓ Auto-update works every 3 seconds
- ✓ Standalone XP Tracker section is removed
- ✓ All tests pass
- ✓ Performance is smooth with 5 expanded teams
- ✓ Responsive design works on mobile
- ✓ Theme compatibility verified
- ✓ Documentation updated
