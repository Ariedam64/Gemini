# Trackers Section Design Specification

**Status**: Complete UI Definition (Ready for Implementation)
**Date**: 2026-01-14
**Goal**: Match Pets section design exactly while adding team selection and comparison features

---

## Design Philosophy

The Trackers section should **reuse the Pets section's expansion panel design exactly**, NOT create parallel designs. It combines:
- Team selector cards (for choosing which team(s) to track)
- Expansion panels matching Pets section's XP/Growth tracker design
- Bunching/triad sprites for Growth trackers (NOT for XP trackers)
- Team comparison features

---

## State 1: Team Selection Layer - Team Card Grid

### Layout & Structure
- **Grid Pattern**: Responsive grid, one card per row (like Pets section)
- **No horizontal scrolling** - cards wrap and auto-resize on smaller screens
- **Card Sizing**: Stretch to fill available width, maintain mobile compatibility
- **Responsive**: Match Pets section breakpoints

### Team Card Content
- **Keep All Current Elements**: Pet sprites, names, purpose icon/label (debugging), confidence %
- **Add STR Badges**: Small badges above each pet name showing current STR
- **Add Ability Badges**: Below each pet sprite, using MGData ability colors and game text font
  - Stack vertically if pet has multiple abilities
  - Reference: Pets section Pet Ability log for perfect badge styling

### Selection Visual States
- **Unselected**: Default styling
- **Primary (1st selected)**: Use `--pill-from` color
- **Secondary (2nd selected)**: Use `--pill-to` color
- **Hover**: Keep current hover states (no additional changes)

### Card Interaction
- **Click**: Select/deselect team
- **Click Again**: Deselect (current behavior)
- **Drag-to-Reorder**: Use Pets section implementation (persist to storage)
- **Selection Limit**: Maximum 2 teams can be selected

### Empty State
- **Message**: Clear instructional text
- **Action**: "Create Team" button that navigates to Pets section
- **Styling**: Match Pets section empty state

---

## State 2: No Selection State

### Display
- **Content**: Instructional message - "Select a team above to view XP tracking"
- **Visual Cues**: None (no arrows, pulsing, or highlights)
- **Behavior**: No auto-selection, user must choose explicitly
- **Styling**: Match Pets section empty state styling

---

## State 3: Single Team Selected

### Expansion Behavior
- **Position**: Expand **directly below the selected team card** (seamless extension)
- **CRITICAL FIX**: Must open below the specific team card, above other team cards in list
  - Current bug: Drops to bottom of entire list
  - Solution: Use TrackerExpansionHandler with proper insertion
- **Animation**: Match Pets section expansion animation (slide down/fade in)
- **Collapse**: Click selected team card again

### Header
- **Content**: Tracker type label ("XP Tracker" / "Growth Tracker")
- **No redundant team name** (already shown in card above)

### XP Tracker (XP Boost Teams)

**NO BUNCHING** - Each pet gets individual card because XP/STR are unique per pet

**Layout**:
- Sprite (left)
- STR badge above name
- Ability badges below sprite (stacked vertically)
- Stats table (right)

**Stats Table Columns**:
- RATE (only for XP boost pets)
- NEXT STR
- MAX STR
- SUPPORT (renamed from INSIGHT)

**Visual Elements**:
- Progress bars and percentages in table cells
- Match Pets section exact spacing/columns/widths
- Font sizes, weights, colors from Pets section

**Pet States**:
- Normal
- MAX STR (green badge)
- STARVING (red warning, "0 XP/hr" message)

### Growth Tracker (Egg/Plant Growth Teams)

**USE BUNCHING** - Pets with identical abilities (exact match) grouped on single card (2-3 pets)

**Layout**:
- Triad/bunched sprites (overlapping layout, current implementation)
- Individual STR badges for each pet (if space allows, don't cramp)
- Ability badges below sprites
- Stats table (right)

**Stats Table Rows**:
- **'Next Plant/Egg'** - Estimated maturation time using team boosts
- Growth multiplier stats
- Average progress percentage

**Visual Elements**:
- Plant/egg selection button system (from Pets section)
- Match Pets section design with bunching/triad sprite system
- Same card styling (background, borders, shadows, padding)

### Styling Consistency
- Match Pets section **exactly**:
  - Background colors
  - Borders and shadows
  - Padding and spacing
  - Font sizes and weights
  - Progress bar styling
  - Badge styling

---

## State 4: Two Teams Selected (Comparison Mode)

### Layout Rearrangement
- **Card Positioning**: Animate selected team cards to positions **above and below** comparison card
  - Visual indication of which teams are being compared
  - Slide animation for card movement
- **Comparison Card**: Appears between the two team cards

### Comparison Rules
- **Same Type Only**: Must compare XP teams OR Growth teams (not mixed)
- **Incompatible Teams**: Grey out/ghost team cards that don't match selected team's type
  - Prevents user from selecting incompatible teams
- **Metrics Compared**:
  - XP teams: Total XP/hr
  - Growth teams: Growth multipliers

### Comparison Display
- **Layout**: Current bunched sprites with simple indicator
- **Message**: "X is better because Y" with dropdown for expanded stats
- **Difference Highlights**:
  - Green (`--complete`) for better stats
  - Red (`--low`) for worse stats
- **Styling**: Keep current comparison layout, tweak to match overall design

### Mobile Behavior
- **Simplified View**: Show only comparison card (hide team cards above/below)
- **No horizontal scroll**

### Exit Comparison
- **Click Team Card**: Deselect that team, switch to single-team view
- **Click Again**: Fully deselect (current behavior)

---

## State 5: Pet Card Sub-Components

### Individual Pet Cards (XP Tracker Only)

**Elements**:
- Pet sprite (1.5x scale, show mutations, no animations)
- Pet name
- STR badge above name (info badge variant)
  - Format: "STR 90" (if max) or "STR 90/91" (if not max)
- Ability badges below sprite (stacked vertically)
  - Use MGData ability colors
  - Game text font (reference Pet Ability log)
- Stats table with progress bars

**Visual States**:
- Normal
- MAX STR (green `--complete` color)
- STARVING (red `--low` color, warning message)

### Bunched/Triad Pet Cards (Growth Tracker Only)

**Header**:
- Ability-based label: e.g., "Egg Boost, Plant Boost (3 pets)"
- Generated by `getGroupLabel()` utility

**Elements**:
- Triad sprites (overlapping/bunched layout, current pattern)
- Individual STR badges for each pet (if space allows)
  - Format: "STR 90" or "STR 90/91"
  - Info badge background (distinct from ability badges)
- Ability badges below sprites (shared, since all pets have same abilities)
- Stats showing combined team output

**Visual States**:
- Normal
- ALL MAX STR (green badge when all 3 are maxed)

### Sprite Display
- **Size**: 1.5x scale (current implementation)
- **Mutations**: Show mutations/colors for each pet
- **Animations**: None (static sprites)
- **Bunched Layout**: Overlapping pattern (current implementation works well)

---

## State 6: Badge/Icon System

### Status Badges
- **MAX STR**: Green badge (current styling is good)
- **ALL MAX STR**: Green badge for bunched cards
- **STARVING**: Red warning badge (current styling is good)
- **XP BOOST / EGG BOOST / PLANT BOOST**: Keep current style

### Ability Badges (Below Sprites)
- **Reference**: Pet Ability log section (Pets section) for perfect styling
- **Color**: Exact match to MGData ability definitions
- **Font**: Game text font
- **Text**: Normalized ability name (proper capitalization/spacing)
- **Multiple Abilities**: Stack vertically
- **Shape**: Pill/rounded rectangle (match Pet Ability log)

### STR Info Badge (Above Name)
- **Variant**: Info badge background
- **Must be distinct** from ability badges (different color/style)
- **Format**: "STR 90" or "STR 90/91"
- **Size**: Relative to pet name text, not cramped

### Purpose Icons (Temporary)
- **Keep as-is** for debugging
- **Eventually remove** purpose icon and label (not yet)

### Progress Indicators
- **Match Pets section exactly** (no more, no less)
- **Color Coding**:
  - Low: red (`--low`)
  - Medium: yellow (`--medium`)
  - High: green (`--high` or `--complete`)

---

## State 7: Empty/Error States

### No Teams Created
- **Message**: Helpful instructional text
- **Action**: "Create Team" button → navigate to Pets section
- **Styling**: Match Pets section empty state

### Team Has No Pets
- **Message**: "This team has no pets assigned"
- **Action**: Suggest navigating to Pets section to assign pets
- **Button**: "Go to Pets Section"

### Invalid/Corrupted Data
- **Message**: "Unable to load tracker data"
- **Action**: "Refresh the page" button (triggers browser refresh)
- **No retry logic** (full page refresh)

### No Matching Tracker Type
- **Fallback**: Use XP tracking
- **If Max Level**: Display triad/bunched sprites centered with:
  - Pet names
  - Sprites
  - Ability badges
  - (Like Pets section but WITH triad sprites)

### Comparison Incompatibility
- **Behavior**: Grey out/ghost team cards that don't match selected team's type
- **Visual**: Reduced opacity, disabled cursor
- **Prevents**: Selecting XP team + Growth team

---

## State 8: Loading/Transition States

### Initial Load
- **Show loading spinner/skeleton if needed**
- **Render immediately if data available** (use cached data)

### Data Refresh
- **Trigger**: When pet ability procs or data changes
- **Behavior**: Silent background updates (no flash/indicator)
- **Update**: Stats values only, smooth transitions

### Expansion/Collapse Animation
- **Match Pets section expansion animation**:
  - Slide down/up
  - Fade in/out
  - Duration and easing from Pets section

### Team Selection Changes
- **Match Pets section animation**
- **Fade out old content, fade in new**

### Comparison Mode Rearrangement
- **Animate team cards** sliding to positions above/below comparison card
- **Visual indication** of which teams are being compared
- **Smooth transition** (not instant snap)

---

## State 9: Responsive Behavior

### Team Card Grid
- **Layout**: One card per row (like Pets section)
- **Sizing**: Stretch to fill space
- **Mobile**: Fully responsive and compatible
- **Breakpoints**: Match Pets section breakpoints exactly

### Expanded Tracker Panels
- **Pet Cards**: Vertical stacking only
- **NO horizontal scrolling** anywhere
- **Mobile**: Stack all cards vertically

### Comparison Mode (Mobile)
- **Simplified View**: Show only comparison card
- **Hide**: Team cards above/below (not visible on mobile)
- **Focus**: Comparison stats only

### Stats Tables
- **Use Rows**: Pets section tracker handles this well
- **Reference**: Look at Pets section for proper responsive table handling
- **No horizontal scroll**: Data fits within viewport

### Breakpoints
- **Match Pets section** breakpoints (no custom breakpoints)
- **No special handling** for 4K/ultrawide (use Pets patterns)

---

## State 10: Interactive Features & Special Behaviors

### Drag-to-Reorder Teams
- **Implementation**: Use Pets section drag-to-reorder pattern
- **Persistence**: Save order to storage
- **Visual Feedback**: Ghost/shadow during drag
- **Mobile Support**: Touch drag enabled
- **Reference**: `src/ui/sections/Pets/` team list implementation

### Expansion Positioning (CRITICAL)
- **Requirement**: Tracker expands **below the specific team card**, **above other team cards**
- **Current Bug**: Drops to bottom of entire list
- **Solution**: TrackerExpansionHandler with `insertAdjacentElement('afterend')`
- **Ensure**: Position maintained during re-renders

### Data Auto-Refresh
- **Updates**: Silent background updates when data changes
- **No indicators**: No pulse, flash, or visible refresh
- **Just update stats**: Values change smoothly

### Keyboard Navigation
- **Not required**: Mouse/touch only
- **No tab navigation**
- **No keyboard shortcuts**

### Accessibility
- **Not required**:
  - No screen reader support
  - No ARIA labels
  - No focus indicators
  - No high contrast mode

### Future Tracker Types
- **Registry System**: Current `trackers/registry.ts` is sufficient
- **Extensibility**: New tracker types can be easily added
- **Seamless Integration**: New trackers work alongside existing ones
- **Pattern**: Follow XpTracker/GrowthTracker patterns

---

## Implementation Priorities

### Phase 1: Critical Fixes
1. Fix expansion positioning (open below specific team card)
2. Remove horizontal scrolling from all components
3. Remove bunching from XP Tracker (individual pets only)

### Phase 2: Visual Consistency
1. Match Pets section expansion animation and styling
2. Add STR badges above pet names
3. Add ability badges below sprites (using Pet Ability log styling)
4. Match exact spacing/columns/widths from Pets section

### Phase 3: New Features
1. Add 'Next Plant/Egg' row to Growth Tracker
2. Implement comparison mode card rearrangement
3. Grey out incompatible teams during selection
4. Add navigation buttons to Pets section in empty states

### Phase 4: Polish
1. Implement drag-to-reorder (Pets section pattern)
2. Silent background data updates
3. Mobile responsive refinements
4. Final visual consistency pass

---

## Technical Notes

### Key Files
- `src/ui/sections/Trackers/section.ts` - Main section orchestration
- `src/ui/sections/Trackers/parts/TeamSelector.ts` - Team card grid
- `src/ui/sections/Trackers/parts/TrackerExpansionHandler.ts` - Expansion logic
- `src/ui/sections/Trackers/parts/XpTracker.ts` - XP tracker display
- `src/ui/sections/Trackers/parts/GrowthTracker.ts` - Growth tracker display
- `src/ui/sections/Trackers/parts/ComparisonOverlay.ts` - Comparison mode
- `src/ui/sections/Trackers/utils/grouping.ts` - Ability-based grouping
- `src/ui/sections/Trackers/trackers/registry.ts` - Tracker registration

### Reference Files (Pets Section)
- `src/ui/sections/Pets/section.ts` - Layout structure
- `src/ui/sections/Pets/parts/TeamCard.ts` - Card patterns
- `src/ui/sections/Pets/parts/TeamCardExpansion.ts` - Expansion mechanism
- `src/ui/sections/Pets/styles.ts` - CSS to match

### Design Principles
1. **NO horizontal scrolling** anywhere in Trackers section
2. **Match Pets section exactly** for visual consistency
3. **XP Tracker**: Individual pets (no bunching)
4. **Growth Tracker**: Triad/bunching for identical abilities
5. **Silent updates**: No flash/pulse on data refresh
6. **Mobile-first**: Vertical stacking, responsive grid

---

## Success Criteria

- [ ] Expansion opens below specific team card (not at bottom)
- [ ] No horizontal scrolling anywhere
- [ ] XP Tracker shows individual pet cards (no bunching)
- [ ] Growth Tracker uses triad sprites for identical-ability pets
- [ ] STR badges above names, ability badges below sprites
- [ ] Stats tables match Pets section spacing/layout exactly
- [ ] Comparison mode animates cards to positions above/below
- [ ] Incompatible teams are greyed out during selection
- [ ] Drag-to-reorder works like Pets section
- [ ] Mobile responsive (vertical stacking, no horizontal scroll)
- [ ] Visual consistency with Pets section (colors, fonts, spacing, animations)
