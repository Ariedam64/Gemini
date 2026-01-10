# Growth Timers - Display Integration Interview

**Purpose:** Detail exact UI behavior within TeamCard expansion  
**Context:** We have core feature spec, now need display integration specifics  
**Files Reviewed:** `TeamCard.ts` (lines 1-1000)

---

## Current TeamCard Behavior (Observed)

From examining `TeamCard.ts`:

**Expansion Mechanism:**
- Team items have expand button (only in overview mode)
- Click expand → `expandTeam(teamId)` → Creates `TeamXpPanel`
- Panel inserted after team item in DOM
- Stores in `expandedTeams` Map with timestamp
- Max 5 teams expanded (FIFO eviction)

**Current Structure:**
```
<div class="team-list-item">  ← Team item
  <!-- Team name, pets, progress badge -->
</div>
<div class="xp-panel">         ← Currently: TeamXpPanel
  <!-- XP tracking content -->
</div>
```

---

## Interview: Display Integration

### Part 1: Feature Panel Architecture 🏗️

**Q1: Multi-Feature Panel Switching**

When multiple features are available (XP Tracker + Growth Timers + future features):

**A) Tabs within expanded panel**
```
┌─ Team "Main Squad" ───────────────┐
│ 🐕 🐱 🦊                            │
└────────────────────────────────────┘
┌─ Features ─────────────────────────┐
│ [📊 XP Tracker] [⏱️ Growth] [⚡ Abilities] │  
│ ┌────────────────────────────────┐│
│ │ (Active feature content)       ││
│ │                                ││
│ └────────────────────────────────┘│
└────────────────────────────────────┘
```

**B) Dropdown selector**
```
┌─ Team "Main Squad" ───────────────┐
│ 🐕 🐱 🦊                            │
└────────────────────────────────────┘
┌─ Feature: [XP Tracker ▼] ─────────┐
│ (Feature content)                  │
└────────────────────────────────────┘
```

**C) Stacked panels (all visible)**
```
┌─ Team "Main Squad" ───────────────┐
│ 🐕 🐱 🦊                            │
└────────────────────────────────────┘
┌─ XP Tracker ──────────────────────┐
│ ...                                │
└────────────────────────────────────┘
┌─ Growth Timers ────────────────────┐
│ ...                                │
└────────────────────────────────────┘
```

**D) Purpose-based smart default (one at a time, smart selection)**

**Your answer:** ____

---

**Q2: Feature Panel DOM Structure**

Where does the feature panel attach in relation to team item?

**A) After team item** (current XP Tracker pattern)
```html
<div class="team-list-item" data-team-id="123">...</div>
<div class="feature-panel-container">...</div>  ← HERE
<div class="team-list-item" data-team-id="456">...</div>
```

**B) Inside team item**
```html
<div class="team-list-item">
  <div class="team-header">...</div>
  <div class="team-expanded-content">    ← HERE
    <div class="feature-panel">...</div>
  </div>
</div>
```

**C) Other structure**

**Your answer:** ____

---

**Q3: Max Expanded Teams Limit**

Current: Max 5 teams expanded (FIFO eviction)

Should this apply to Growth Timers too?

**A) Yes - same 5 team limit for all features
**B) No - Growth Timers can have different limit
**C) No limit - let users expand as many as they want

**Your answer:** ____

---

### Part 2: Visual Design 🎨

**Q4: Feature Panel Styling**

Growth Timers panel should:

**A) Match XP Tracker styling** (same card/panel aesthetic)
**B) Have distinct visual style** (different to distinguish features)
**C) Minimal/flat** (less visual weight than XP Tracker)

**Your answer:** ____

---

**Q5: Panel Height/Size**

Growth Timers content might vary (0-20+ timers):

**A) Fixed height** (e.g., 400px, scrollable if content exceeds)
**B) Dynamic height** (expands to fit content, with max-height)
**C) Match XP Tracker height** (same size for visual consistency)

**Your answer:** ____

---

**Q6: Spacing Between Elements**

```
┌─ Team Item ────────┐
│ ...                │
└────────────────────┘
    ← How much gap?
┌─ Feature Panel ────┐
│ ...                │
└────────────────────┘
    ← How much gap?
┌─ Next Team Item ───┐
```

**A) 8px** (tight, compact)
**B) 16px** (medium, clear separation)
**C) 24px** (spacious, distinct sections)
**D) Match current XP Tracker spacing

**Your answer:** ____

---

### Part 3: Team-Specific Behavior 🎯

**Q7: Timer Filtering in Pets Tab Context**

When viewing Growth Timers from a specific team's expansion:

**A) Show ALL timers in garden** (no filtering)
**B) Show only timers boosted by THIS team**
**C) Show timers + highlight which ones THIS team boosts**
**D) Team context doesn't matter - same data everywhere

**Your answer:** ____

---

**Q8: Empty State - No Timers**

If team has growth boosts but no active eggs/plants:

**A) Show "No active timers - plant crops to track growth"
**B) Hide panel entirely
**C) Show panel with suggestions "Plant Pumpkin to utilize PlantGrowthBoost III"

**Your answer:** ____

---

**Q9: Empty State - No Boost Abilities**

If team has NO growth boost abilities:

**A) Don't show Growth Timers at all** (`shouldDisplay` returns false)
**B) Show anyway** (timers for MY garden, even without boosts)
**C) Show with note** ("Equip pets with EggGrowth/PlantGrowth boosts to reduce time")

**Your answer:** ____

---

### Part 4: Interaction & State 🔄

**Q10: Feature Panel State Persistence**

If user expands Team A → switches to Growth Timers → collapses Team A → re-expands Team A:

**A) Remember last viewed feature** (show Growth Timers again)
**B) Always default to XP Tracker** (or purpose-detected feature)
**C) User configurable** (setting: "Remember last viewed feature")

**Your answer:** ____

---

**Q11: Collapse Behavior**

Current XP Tracker has collapse button. For Growth Timers:**

**A) Same - include collapse button in panel header
**B) No collapse button - only team expand/collapse controls it
**C) Collapse button collapses TEAM, not just feature panel

**Your answer:** ____

---

**Q12: Update/Refresh Coordination**

XP Tracker updates via interval. Growth Timers needs updates too:

**A) Separate intervals** (each feature manages own updates)
**B) Shared update trigger** (both update on same interval)
**C) On-demand only** (no auto-update, manual refresh button)

**Your answer:** ____

---

### Part 5: Responsiveness 📱

**Q13: Mobile/Narrow Viewport**

On small screens (< 768px):

**A) Panels stack vertically** (same as desktop, just narrower)
**B) Tabs collapse to dropdown** (save horizontal space
)
**C) One feature at a time** (no multi-feature panel)
**D) Hide secondary features** (only show XP Tracker on mobile)

**Your answer:** ____

---

**Q14: Touch Interactions**

For mobile users:

**A) Tap feature tab to switch
**B) Swipe between features** (gestures)
**C) Both tap and swipe
**D) Desktop-only feature** (too complex for mobile)

**Your answer:** ____

---

### Part 6: Advanced 🚀

**Q15: Feature Panel Badge/Summary**

Currently XP Tracker shows progress % badge on team item. For Growth Timers:

**A) Show count badge** ("3 ready" next to team name)
**B) Show in expand button** (instead of XP %)
**C) Multiple badges** (XP % + timer count)
**D) No badge** (only in expanded panel)

**Your answer:** ____

---

## Answer Format

Please provide answers like:

```
Q1: D (purpose-based smart default)
Q2: A
Q3: A
Q4: A
Q5: B (dynamic with max 600px)
Q6: D
Q7: C
Q8: C
Q9: A
Q10: A
Q11: A
Q12: B
Q13: B
Q14: A
Q15: C
```

Any additional notes/preferences, add after answers.

---

**Once answered:**
1. I'll update implementation plan with exact UI specs
2. Create visual mockups if needed
3. Begin implementation with complete clarity

**Ready for your answers!** 🎯
