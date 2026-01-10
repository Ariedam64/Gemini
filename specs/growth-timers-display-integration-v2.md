# Growth Timers - Gemini-Specific Display Integration Interview

**Created:** 2026-01-07  
**Context:** Actual codebase analysis complete  
**Purpose:** Bridge TeamCard to use Phase 2 registry + define Garden tab structure

---

## 🔍 Current Implementation Analysis

### What Exists Now:

**Phase 2 Registry (Complete, but not integrated):**
- ✅ `registry.ts` - Feature panel types and utilities
- ✅ `xpPanel.ts` - XP Tracker wrapped as FeaturePanelDefinition
- ✅ `index.ts` - `FEATURE_PANELS` array with xpPanel registered

**TeamCard Expansion (Hardcoded, needs registry integration):**
- TeamCard.ts lines 947-1013: `expandTeam()` directly instantiates `TeamXpPanel`
- Panels inserted via `insertAdjacentElement('afterend')` (sibling after team item)
- Max 5 teams expanded (FIFO) - line 960
- 3 second update interval - line 1101
- **Does NOT use `FEATURE_PANELS` registry yet**

### The Gap:

Currently TeamCard expansion is **hardcoded for XP Tracker only**:
```typescript
// Line 978 - TeamCard.ts
const panel = new TeamXpPanel({
    teamId,
    onCollapse: () => this.collapseTeam(teamId),
});
```

We need to **integrate the registry** so TeamCard can:
1. Discover available features via `FEATURE_PANELS`
2. Display multiple features (XP Tracker, Growth Timers, etc.)
3. Let users switch between features

---

## 📋 Interview Questions (Gemini-Specific)

### PART 1: TeamCard Registry Integration

**Context:** TeamCard.ts currently hardcodes XP panel. We need to modify `expandTeam()` to use `FEATURE_PANELS` registry.

---

#### Q1: Feature Discovery & Selection

When `expandTeam(teamId)` is called, how should it determine which feature to show?

**A) Show first available feature from registry**
```typescript
const availableFeatures = getAvailableFeatures(team, pets, FEATURE_PANELS);
const defaultFeature = availableFeatures[0]; // xpPanel
```

**B) Use team purpose detection to auto-select**
```typescript
const purpose = detectTeamPurpose(team, pets);
// If purpose is 'xp-farming' -> show xpPanel
// If purpose has growth boosts -> show growthTimersPanel
const smartFeature = selectFeatureByPurpose(purpose, availableFeatures);
```

**C) Remember user's last selection per team**
```typescript
const lastFeatureId = getLastViewedFeature(teamId);
const feature = getFeatureById(lastFeatureId, FEATURE_PANELS) || availableFeatures[0];
```

**D) Always show all features stacked**
```typescript
// No selection needed, build all panels
availableFeatures.forEach(feature => {
    feature.buildPanel(team, container);
});
```

**Your answer:** ____

**Follow-up if A/B/C:** Where is the "switch feature" UI? (See Q2)

---

#### Q2: Feature Switching UI Location

If user can switch between features (XP Tracker ↔ Growth Timers), where is the UI?

**Context:** Currently TeamCard inserts panel as sibling after team item:
```typescript
// Line 1004
teamItemEl.insertAdjacentElement('afterend', panelElement);
```

**A) Tabs INSIDE the feature panel container**
```html
<div class="team-list-item">Team A</div>
<div class="feature-panel-container">  ← NEW wrapper
    <div class="feature-tabs">
        <button>[📊 XP]</button>
        <button>[⏱️ Growth]</button>
    </div>
    <div class="feature-content">
        <!-- Active feature panel here -->
    </div>
</div>
```

**B) Tabs in TeamListItem itself (expand button becomes dropdown)**
```html
<div class="team-list-item">
    <span>Team A</span>
    <select class="feature-selector">
        <option>📊 XP Tracker</option>
        <option>⏱️ Growth Timers</option>
    </select>
    <button class="expand-btn">▼</button>
</div>
<div class="xp-panel">...</div> <!-- Currently selected -->
```

**C) No switching UI - one feature at a time, use purpose detection**

**Your answer:** ____

---

#### Q3: Panel Container Structure

Which DOM structure for the expanded panel area?

**Current (hardcoded XP):**
```html
<div class="team-list-item" data-team-id="123">...</div>
<div class="xp-panel">...</div> ← Directly inserted
<div class="team-list-item" data-team-id="456">...</div>
```

**Option A: Minimal wrapper (just for multi-feature support)**
```html
<div class="team-list-item" data-team-id="123">...</div>
<div class="feature-panel-wrapper" data-team-id="123">
    <!-- If option Q2-A: tabs here -->
    <div class="xp-panel">...</div> <!-- or growth-timers-panel -->
</div>
<div class="team-list-item" data-team-id="456">...</div>
```

**Option B: Keep current (one panel at a time, swap as needed)**
```html
<div class="team-list-item">...</div>
<div class="xp-panel">...</div> <!-- OR -->
<div class="growth-timers-panel">...</div> <!-- Swapped on feature change -->
```

**Your answer:** ____

---

### PART 2: Growth Timers Specific Behavior

**Context:** Growth Timers will be the 2nd registered feature in `FEATURE_PANELS`

---

#### Q4: Team-Specific Timer Filtering (Pets Tab Context)

When Growth Timers panel is shown for "Team A" in Pets tab:

**A) Show ALL garden timers** (no filtering by team)
- Team A expanded → shows all 15 eggs/plants in MY garden
- Same data regardless of which team is expanded

**B) Show only items boosted by THIS team**
- Team A has EggGrowthBoost → only show eggs being boosted
- Team B has PlantGrowthBoost → only show plants being boosted

**C) Show all, but HIGHLIGHT which ones THIS team boosts**
- All 15 timers visible
- Eggs dimmed/grayed if Team A has no EggGrowthBoost
- Plants highlighted if Team A has PlantGrowthBoost

**Your answer:** ____

---

#### Q5: Empty State - No Growth Boosts

If expanded team has NO growth boost abilities:

**A) Don't show Growth Timers panel at all**
```typescript
shouldDisplay: (team, pets) => {
    return pets.some(p => hasGrowthBoostAbility(p));
}
```

**B) Show panel with "No growth boosts equipped"**
- Still show all garden timers
- Banner: "💡 Equip pets with EggGrowth/PlantGrowth to reduce times"

**C) Show panel with team composition suggestion**
- "Try: Chicken (EggGrowthBoost) or Cow (PlantGrowthBoost)"

**Your answer:** ____

---

#### Q6: Empty State - No Timers

If team has growth boosts but NO active eggs/plants:

**A) Hide panel entirely** (like XP panel hides if all pets maxed)

**B) Show "Plant crops or eggs to track growth"**

**C) Show planting suggestions**
- "💡 Plant Pumpkin (24h) → ~12h with your PlantGrowthBoost III"
- Calculates optimal items for current team

**Your answer:** ____

---

### PART 3: Update & Refresh Coordination

---

#### Q7: Update Interval Coordination

Current XP Tracker: 3 second interval (line 1101)

Growth Timers needs 1-10 second updates. How to coordinate?

**A) Shared interval - both features update together**
```typescript
// Modify existing xpUpdateInterval to handle all features
this.xpUpdateInterval = setInterval(() => {
    this.updateAllExpandedFeatures(); // XP + Growth + future
}, 3000); // Keep 3s or change to 5s?
```

**B) Separate intervals per feature**
```typescript
// XP stays at 3s
// Growth Timers uses own 5s interval
// Each feature manages own timing
```

**C) Feature-defined interval** 
```typescript
// Add to FeaturePanelDefinition:
updateIntervalMs?: number; // xpPanel: 3000, growthTimersPanel: 5000
```

**Your answer:** ____

---

#### Q8: Expansion Limit

Current: Max 5 teams expanded simultaneously (line 960, FIFO eviction)

**A) Same limit for all features** (5 teams total, regardless of feature)

**B) Limit per feature** (5 XP panels + 5 Growth panels = 10 total possible)

**C) Increase limit** (e.g., 10 teams) or remove limit

**Your answer:** ____

---

### PART 4: Garden Tab (Standalone)

**Context:** Creating new `ui/sections/Garden/` to mirror `Pets/` structure

---

#### Q9: Garden Tab Feature Display

In standalone Garden tab (not Pets tab):

**A) Same multi-feature system** (tabs/dropdown to switch)
- Garden tab mirrors Pets tab team expansion
- One feature shown at a time

**B) All features visible simultaneously**
- Growth Timers (main feature)
- Mutation Tracker (future)
- Harvest Optimizer (future)
- All stacked vertically

**C) Growth Timers only initially**
- Garden tab = dedicated Growth Timers view
- More detailed than Pets tab version
- Future features added as separate sections

**Your answer:** ____

---

#### Q10: Garden Tab Content Scope

Garden tab Growth Timers shows:

**A) Exact same data as Pets tab panel**
- Just a different place to access it
- No additional features

**B) Enhanced version with extras**
- Same timers PLUS:
  - History section (last 10 hatches/harvests)
  - Settings (notification preferences)
  - Optimization suggestions

**C) Different focus entirely**
- Pets tab: team-centric ("what does THIS team boost?")
- Garden tab: garden-centric ("all items with ALL boost calculations")

**Your answer:** ____

---

### PART 5: Visual & UX Details

---

#### Q11: Collapse Button Behavior

XP Panel has collapse button (calls `onCollapse` callback). For Growth Timers:

**A) Same - collapse button in panel header**
```typescript
buildPanel: (team, container) => {
    const panel = new GrowthTimersPanel({
        teamId: team.id,
        onCollapse: () => collapseTeam(teamId), // Same as XP
    });
}
```

**B) No collapse button - only team expand/collapse matters**

**C) Collapse = remove feature, not collapse team**
- Clicking collapse switches to different feature
- Team stays expanded

**Your answer:** ____

---

#### Q12: Panel Height Strategy

XP Panel is ~400-600px depending on content. Growth Timers could vary (0-20+ items):

**A) Fixed height** (e.g., 500px, scroll if overflow)

**B) Dynamic height** (grows with content, max 800px)

**C) Match XP Panel height** (consistent visual rhythm)

**Your answer:** ____

---

#### Q13: Feature Badge Display

XP Tracker shows "67%" progress badge on team item. For Growth Timers:

**A) Replace XP badge** when Growth feature is active
- Only one badge at a time

**B) Multiple badges** side-by-side
- "📊 67% | ⏱️ 3 ready"

**C) Badge shows active feature only**
- If viewing XP → show XP badge
- If viewing Growth → show Growth badge

**D) No badge for Growth Timers**
- Only XP shows badge

**Your answer:** ____

---

## Answer Format

Please answer using this format:

```
Q1: B (purpose detection)
Q2: A
Q3: A
Q4: C (show all, highlight boosted)
Q5: A
Q6: C
Q7: A (shared 5s interval)
Q8: A
Q9: C
Q10: B
Q11: A
Q12: B
Q13: B
```

**Add any notes/preferences after your answers.**

---

## What Happens Next

Once you answer:

1. I'll update `implementation_plan.md` with exact integration steps
2. Create code examples for TeamCard modifications
3. Define Growth Timers panel structure
4. Update task breakdown with specific file changes

**Ready for your answers!** 🎯
