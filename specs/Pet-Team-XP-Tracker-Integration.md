# Pet Team XP Tracker Integration (GEMINI)

**Project:** GEMINI Mod (userscript for MagicGarden/MagicCircle)
**Status:** Planning Complete (Implementation Ready)
**Created:** 2026-01-07
**Feature Type:** UI Enhancement + Feature Integration
**Complexity:** High (Multi-section integration, state coordination, UI redesign)

---

## Overview

This spec defines the integration of XP tracking features directly into the Pets section UI. Instead of having a separate XP Tracker section, XP tracking information will be displayed contextually within each pet team card in the Pets section.

### Goals

1. **Contextual XP Information**: Display XP tracking data inline with pet teams for better UX
2. **Team-Specific Insights**: Show XP rates, progression, and boost stats for each individual team
3. **Maintain Existing Data**: Use all current XP tracker calculations and data, just with improved layout
4. **Smart Layout**: Design responsive, expandable UI that fits naturally into existing Pets section

### Non-Goals

- Creating a completely new XP calculation system (reuse existing)
- Removing the standalone XP Tracker section immediately (can be deprecated later)
- Changing core pet team management functionality

---

## Current State Analysis

### Existing XP Tracker Feature
- **Location**: `src/features/xpTracker/`, `src/ui/sections/XpTracker/`
- **Data Tracked**:
  - Per-pet XP progress (current XP, strength, time to next/max STR)
  - Feed requirements (feeds to next/max STR)
  - XP Boost ability stats (tier, proc rate, bonus XP/hour)
  - Combined team boost summary
  - Base XP rate (3600/hr) + bonus XP from boosters
- **UI Display**:
  - Active pets section (expanded cards with full stats)
  - All pets section (compact filterable list)
  - Sort/filter controls
  - Summary banner with team-wide XP rates

### Existing Pets Section
- **Location**: `src/ui/sections/Pets/`, `src/features/petTeam/`
- **Components**:
  - `TeamCardPart` - Main team management UI
  - `TeamListItem` - Individual team display
  - Two modes: Overview (activate teams) and Manage (edit teams)
- **Current Display**:
  - Team list with active indicator
  - 3 pet sprite slots per team
  - Drag-to-reorder functionality
  - Inline team name editing

---

## Proposed Solution

### Architecture: Expandable Team Cards with XP Tracking

When a user clicks on a pet team in the Pets section, the team card will expand to reveal XP tracking information specific to that team's composition.

#### Key Components

1. **Enhanced TeamListItem Component**
   - Add expand/collapse toggle button
   - Show condensed XP summary when collapsed (e.g., "3600 + 450 XP/hr")
   - Expand to full XP tracker view when clicked
   - Maintain existing drag-to-reorder and activation functionality

2. **New TeamXpTracker Component** (or Part)
   - Displays XP tracking data for a specific team
   - Shows per-pet stats (strength, time to max, feeds needed)
   - Shows team-wide XP boost summary
   - Reuses calculation logic from `src/modules/calculators/logic/xp.ts`
   - Reuses XP boost detection from `src/features/xpTracker/logic/xpBoost.ts`

3. **State Management**
   - Track which teams are expanded/collapsed (persist in section state)
   - Auto-refresh XP data for expanded teams (3s interval)
   - Stop updates for collapsed teams (performance optimization)

#### UI Flow

```
[Pets Section]
├─ [Team Card] "Main Team" ✓ Active [▼]  ← Collapsed, shows summary
│  ├─ [Pet 1] [Pet 2] [Pet 3]
│  └─ [XP Summary Badge: "3600 + 450 XP/hr"]
│
├─ [Team Card] "Leveling Squad" [▶]  ← Collapsed
│  ├─ [Pet 1] [Pet 2] [Pet 3]
│  └─ [XP Summary Badge: "10,800 + 1,200 XP/hr"]
│
├─ [Team Card] "XP Farm" [▼]  ← Expanded, shows full tracker
│  ├─ [Pet 1] [Pet 2] [Pet 3]
│  ├─ [XP Summary Badge: "3600 + 900 XP/hr"]
│  └─ [Expanded XP Tracker Panel]  ← NEW COMPONENT
│     ├─ [Team Summary]
│     │  ├─ Base: 3600 XP/hr per pet
│     │  ├─ Bonus: +900 XP/hr from 2 XP Boost pets
│     │  └─ Total: 4500 XP/hr per pet
│     ├─ [Per-Pet Stats Grid]
│     │  ├─ [Pet 1: Peacock "Speedy"]
│     │  │  ├─ Strength: 85/100 ████████▒▒ 85%
│     │  │  ├─ Time to Next: 12.5h (3 feeds)
│     │  │  ├─ Time to Max: 125h (30 feeds)
│     │  │  └─ XP Boost: Tier II (60 procs/hr, +540 XP/hr)
│     │  ├─ [Pet 2: Goat "Snowy"]
│     │  │  ├─ Strength: 100/100 ██████████ MAX
│     │  │  ├─ XP Boost: Snowy (45 procs/hr, +360 XP/hr)
│     │  │  └─ Supporting: 30 feeds (for Pet 1 to max)
│     │  └─ [Pet 3: Rabbit "Hopper"]
│     │     ├─ Strength: 45/100 ████▒▒▒▒▒▒ 45%
│     │     ├─ Time to Next: 6.2h (2 feeds)
│     │     └─ Time to Max: 310h (75 feeds)
│     └─ [XP Boost Summary]
│        └─ 2 Active Boosters: +900 XP/hr (105 procs/hr total)
```

---

## Technical Design (To Be Fleshed Out in Interview)

### Questions to Address

#### 1. Component Architecture
- Should we create a new reusable component `TeamXpTracker` or integrate as a part in `TeamCardPart`?
- Where should the expanded/collapsed state live? (Section state? Pet team config?)
- Should the XP data be calculated on-demand or cached?

#### 2. Data Flow
- How do we ensure XP calculations are only running for expanded teams?
- Should we reuse `MGXPTracker` module methods or create team-specific calculators?
- How do we handle updates when pets change (team edited, pets fed, weather changes)?

#### 3. UI/UX Behavior
- Should clicking the team name toggle expansion, or should there be a separate expand/collapse button?
- In Overview mode: Can you expand AND activate a team with one click, or are they separate actions?
- In Manage mode: Should XP tracking be disabled or still available?
- Should there be a "show XP for all teams" toggle for power users?

#### 4. Performance Considerations
- With 50 teams max, if all are expanded, we'd have 50 × 3 = 150 pet calculations every 3s. How to optimize?
- Should we limit the number of simultaneously expanded teams?
- Lazy-load XP data only when expanding a team?

#### 5. Mobile/Responsive Design
- How does the expanded panel look on narrow screens?
- Should the per-pet stats be stacked vertically on mobile?
- Touch-friendly expand/collapse gestures?

#### 6. Feature Flag & Migration
- Should this be a toggleable feature (e.g., "Enhanced Pet Team XP Tracking")?
- If enabled, should the old XP Tracker section be hidden?
- How do users discover this new functionality?

#### 7. Edge Cases
- What happens if a team has empty slots (< 3 pets)?
- What if a team has starving pets (0 XP/hr)?
- What if no XP Boost pets are in the team?
- How do we display max-strength XP Boost pets supporting leveling pets?

#### 8. Styling & Theming
- Should the expanded panel use existing XP tracker styles or new styles matching the Pets section aesthetic?
- How to make the transition smooth (expand/collapse animation)?
- Color coding for progress bars (low/medium/high)?

---

## Dependencies

### Existing Modules (Reuse)
- `src/modules/calculators/logic/xp.ts` - XP calculations
- `src/modules/calculators/logic/feed.ts` - Feed calculations
- `src/features/xpTracker/logic/xpBoost.ts` - XP Boost detection
- `src/features/xpTracker/logic/xpCalculations.ts` - Strength progression
- `src/modules/MGSprite` - Pet sprite rendering
- `src/globals/variables/myPets.ts` - Pet data source

### Existing Features (Integration)
- `src/features/petTeam/` - Pet team management
- `src/ui/sections/Pets/` - Pets section UI
- `src/ui/components/TeamListItem/` - Team display component

### New Components (To Create)
- `src/ui/sections/Pets/parts/TeamXpPanel.ts` - Expanded XP tracker panel
- `src/ui/sections/Pets/parts/teamXpPanel.css.ts` - Panel styling
- Enhanced `TeamCardPart` with expand/collapse logic
- Enhanced `TeamListItem` with XP summary badge

---

## Success Criteria

- [ ] Users can view XP tracking data inline with pet teams
- [ ] XP data is accurate and matches existing XP tracker calculations
- [ ] Expand/collapse is smooth and intuitive
- [ ] Performance remains good with multiple expanded teams
- [ ] Mobile-responsive design works on all screen sizes
- [ ] Feature is toggleable on/off
- [ ] Existing pet team management functionality is not disrupted
- [ ] Clear visual hierarchy distinguishes XP data from team management UI

---

## Design Decisions (Interview Complete ✓)

All critical design questions have been answered through user interview.

### User Interaction (DECIDED ✓)
1. **Expand Trigger**: Click dedicated expand button (▼/▶) on each team card
2. **State Persistence**: No persistence - all teams collapse on page reload
3. **Update Strategy**: Limit to 5 expanded teams max, update those every 3s
4. **Mode Behavior**: XP tracking only available in Overview mode (disabled in Manage mode)
5. **Expansion Limit**: Auto-collapse oldest expanded team when 6th is expanded (FIFO)

### Layout & Visual Design (DECIDED ✓)
6. **Panel Position**: Below team card (inline expansion) - accordion-style
7. **Summary Badge**: Show mini progress bar + % to max STR when collapsed
8. **XP Boost Indicator**: Badge on pet sprite (⚡II, ⚡III, ❄ for Snowy)
9. **Empty Slots**: Show XP for filled slots only - skip empty slots
10. **Max STR Boosters**: Show 'Supporting: X feeds' for leveling pets

### Data & Calculations (DECIDED ✓)
11. **Progress Calculation**: Average of all pets' (currentSTR/maxSTR) percentages
12. **Update Triggers**: Auto-update every 3 seconds for expanded teams
13. **Starving Pets**: Show STARVING badge + 0 XP/hr, gray out stats
14. **Weather Sync**: Recalculations include weather check for Snowy XP Boost

### Integration & Migration (DECIDED ✓)
15. **Standalone Section**: Remove standalone XP Tracker section entirely
16. **Feature Toggle**: Tie to existing XP Tracker feature toggle (no separate toggle)
17. **Discoverability**: Expand button is visible on all teams when XP Tracker is enabled

---

## Next Steps

1. **Conduct thorough interview** to answer all open questions
2. **Create detailed implementation plan** with file-by-file breakdown
3. **Design mockups** for collapsed and expanded states
4. **Prototype** expand/collapse interaction
5. **Implement** following QPMS workflows and compliance rules
6. **Test** across devices and themes
7. **Document** user-facing features and API changes

---

## Notes

- This spec follows `.claude/rules/features.md` and `.claude/rules/ui/ui.sections.md`
- Must maintain independence from other features (per features rules)
- Must use existing globals/atoms for data access (per core rules)
- Must use CSS variables for theming (per UI component rules)
- Must be responsive and cross-platform (per UI component rules)
- Must cleanup subscriptions properly (per core rules)
