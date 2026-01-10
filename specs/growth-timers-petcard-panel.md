# Growth Timers Pet Card Panel Specification

**Feature Name:** Growth Timers Panel (Pet Card Integration)
**Status:** Spec Interview Required
**Created:** 2026-01-08

---

## Overview

Implement Growth Timers as a **feature panel** in the expanded pet team view, matching the visual style of the existing XP Tracker panel.

**Core Goal:** Display egg hatching and plant/crop growth timers in a compact, readable format that matches the XP tracker card layout.

---

## Visual Consistency Requirements

Must match XP Tracker panel layout:
- Same row structure: Label | Time | Indicator | Progress Bar | Percent
- Same stat-row CSS classes
- Same progress bar color (#2f9aba solid blue)
- Same responsive mobile layout

---

## Data Sources

### Globals.myGarden
```typescript
interface MyGardenData {
  eggs: { all: EggWithTile[]; growing: EggWithTile[] };
  plants: { all: PlantWithTile[]; growing: PlantWithTile[] };
  crops: { all: CropInfo[]; growing: CropInfo[] };
}
```

### Pet Abilities (Growth Boost)
- `EggGrowthBoost` / `EggGrowthBoostII` / `EggGrowthBoostIII`
- `PlantGrowthBoost` / `PlantGrowthBoostII` / `PlantGrowthBoostIII`
- `SnowyEggGrowthBoost` / `SnowyPlantGrowthBoost` (Frost weather)

---

## Interview Questions

### Q1: What data to show per pet slot?

When expanded in pet team view, each pet card shows:

A) **Eggs only** - Show eggs the pet's abilities boost
B) **Plants only** - Show plants the pet's abilities boost  
C) **Both Eggs + Plants** - Combined timers relevant to this pet
D) **Garden-wide summary** - Aggregate stats not per-pet

### Q2: Timer display format?

A) **Time only**: "12h 35m"
B) **Time + Count**: "3 eggs | 12h 35m"
C) **Next ready countdown**: "Next in 12h 35m (Mythical Egg)"
D) **Progress bar + time**: Same as XP tracker layout

### Q3: Per-pet relevance?

A) Only show timers if pet has growth boost abilities
B) Show all garden timers for any pet
C) Show garden timers but highlight what THIS pet boosts

### Q4: Info priority (keep short/sweet)?

What's most useful? Pick 2-3:
- [ ] Next item ready time
- [ ] Total items growing
- [ ] Estimated boost savings
- [ ] Specific item countdown
- [ ] Ready count (items hatched/mature)

### Q5: Empty state (no timers)?

A) Hide panel section for that pet
B) Show "No active timers"
C) Show "No growth abilities" if pet lacks boost

---

## Proposed Implementation

### File Structure
```
src/ui/sections/Pets/parts/featurePanels/
├── registry.ts          # Existing
├── xpPanel.ts           # Existing  
└── growthPanel.ts       # NEW - Growth Timers panel
```

### Panel Definition
```typescript
export const growthPanel: FeaturePanelDefinition = {
  id: 'growth',
  label: 'Growth',
  icon: '⏱️',
  category: 'tracking',
  isAvailable: () => true,
  shouldDisplay: (team, pets) => hasGrowthBoosts(pets) || hasActiveTimers(),
  renderPetSlot: (pet, team, container) => { /* compact stats */ },
};
```

### Display Layout (Matching XP Tracker)
```
NEXT EGG    12h 35m   🥚 x3   ⏱️ Mythical  [████████  ] 67%
NEXT PLANT   2h 10m   🌱 x5   ⏱️ Pumpkin   [████████  ] 82%
```

---

## Dependencies

- Globals.myGarden (eggs, plants, crops)
- Globals.myPets (active team abilities)
- Existing featurePanels registry
- Existing stat-row CSS classes

---

## Questions for User

1. Should this panel appear for ALL pets or only pets with growth boost abilities?
2. For pets without growth boosts, show all garden timers or hide the panel?
3. What's the single most important piece of info to show per row?
