# Implementation Roadmap - XP Tracker Refinements & Pet Feature System

**Status:** ✅ Ready for Implementation
**Created:** 2026-01-07
**Consolidated From:** All user-updated specs + game source + current implementation

---

## Overview

This folder contains the comprehensive implementation roadmap split into focused, phase-ordered documents for efficient development of the XP Tracker refinements and extensible pet feature system.

### What We're Building

- **Phase 1 (6-8 hours):** XP Tracker UI refinements + Base template system
- **Phase 2 (8-12 hours):** Team purpose detection + Feature panel registry

---

## Document Navigation

Read the documents in order for best understanding:

### 1. Foundation & Research
- **[01-ABILITY-SYSTEM-REFERENCE.md](01-ABILITY-SYSTEM-REFERENCE.md)**
  - All 53 pet abilities with complete details
  - User's categorization into 8 purpose groups
  - Species-to-ability mapping from game source
  - Detection rules and critical combos
  - **Research notes captured for later**

### 2. Current State
- **[02-CURRENT-STATE-ANALYSIS.md](02-CURRENT-STATE-ANALYSIS.md)**
  - Existing XP tracker implementation
  - Component structure and data flow
  - Exact line numbers for Phase 1 changes
  - Current APIs (MGPetTeam, MGXPTracker)

### 3. Design
- **[03-BASE-TEMPLATE-DESIGN.md](03-BASE-TEMPLATE-DESIGN.md)**
  - User's clarified template concept
  - STR display under sprite/badges (user's diagram)
  - How features wire into the template
  - Design principles

### 4. Implementation - Phase 1
- **[04-PHASE1-IMPLEMENTATION.md](04-PHASE1-IMPLEMENTATION.md)**
  - 22 detailed tasks with exact code changes
  - UI refinements (header, footer, food format, dividers)
  - Theme color fixes
  - Layout optimization (STR positioning)
  - Helper functions to add
  - **START HERE FOR IMPLEMENTATION**

### 5. Implementation - Phase 2
- **[05-PHASE2-ARCHITECTURE.md](05-PHASE2-ARCHITECTURE.md)**
  - Team purpose detection using ability categorization
  - Feature panel registry system
  - Smart display management
  - Future extensibility

### 6. Quality Assurance
- **[06-TESTING-STRATEGY.md](06-TESTING-STRATEGY.md)**
  - Test scenarios for each refinement
  - Edge cases to verify
  - Theme testing matrix (all 8 themes)
  - Responsive testing (mobile/desktop)
  - Gemini compliance verification

### 7. Complete Code
- **[07-IMPLEMENTATION-CODE.md](07-IMPLEMENTATION-CODE.md)**
  - Full implementation for all new files:
    - `BasePetCard.ts`
    - `basePetCard.css.ts`
    - `pets.ts` (helper functions)
    - `purpose.ts` (team detection)

---

## Key User Corrections Incorporated

1. ✅ XP farming detection: Lowered confidence to 25-30% for "2+ pets below max STR" case
2. ✅ Coin farming: Clarified Double Harvest used in harvest team, then swap to sell boost + crop refund for selling
3. ✅ Crop Size Boost: Added research note for exact multipliers and scale effect
4. ✅ Category rename: "MUTATION HUNTING" → "MUTATION GRANTERS"
5. ✅ Rainbow vs Gold: Clarified rainbow is #1, gold "ever so slightly less"
6. ✅ Terminology: Avoid "AFK farming", "automatic", "auto feeding/harvesting/planting", "macros"

---

## Quick Start

**To begin implementation:**

1. Read **01-ABILITY-SYSTEM-REFERENCE.md** to understand all abilities
2. Review **02-CURRENT-STATE-ANALYSIS.md** to know what exists
3. Understand **03-BASE-TEMPLATE-DESIGN.md** for the template concept
4. **Start implementing** with **04-PHASE1-IMPLEMENTATION.md** (Task 1-22)
5. Test using **06-TESTING-STRATEGY.md**
6. Reference **07-IMPLEMENTATION-CODE.md** for complete code

---

## Research Items (To Complete After Implementation)

The following research items are noted throughout the documents and should be completed after the main implementation:

1. **Crop Size Boost:** Exact multipliers for scale values 1-100 and their effect on sell price
2. **Crop Mutation Boost:** Exact mechanics of how mutation chance increases work
3. **Mutation Value Multipliers:** Exact sell price multipliers for each mutation (Wet, Chilled, Frozen, Gold, Rainbow)
4. **Double Hatch Optimal Combos:** Research interaction between Pet Mutation Boost, Double Hatch, and Pet Refund for rainbow hunting
5. **Species Abilities:** Complete list for Turtle, Peacock, and Goat (partial data in excerpt)

---

## User Decisions Applied

All user decisions from the updated specification documents have been incorporated:

- **Card Dividers:** Remove all ✅
- **Theme Colors:** Use semantic variables (--accent, --fg, --pill-to) ✅
- **Template System:** Expand button drops panel below with 3 pet slots ✅
- **STR Display:** Under sprite/badges (not next to name) ✅
- **Layout:** Keep current horizontal layout (no restructuring) ✅
- **Terminology:** Avoid macro/automation terms ✅
- **Categories:** All abilities properly categorized ✅

---

## File Status

| Document | Status | Lines | Purpose |
|----------|--------|-------|---------|
| README.md | ✅ Complete | This file | Navigation |
| 01-ABILITY-SYSTEM-REFERENCE.md | 🔨 Creating | ~1200 | Complete ability details |
| 02-CURRENT-STATE-ANALYSIS.md | 📝 Queued | ~400 | Current implementation |
| 03-BASE-TEMPLATE-DESIGN.md | 📝 Queued | ~300 | Template design |
| 04-PHASE1-IMPLEMENTATION.md | 📝 Queued | ~800 | Phase 1 tasks |
| 05-PHASE2-ARCHITECTURE.md | 📝 Queued | ~600 | Phase 2 design |
| 06-TESTING-STRATEGY.md | 📝 Queued | ~400 | Test cases |
| 07-IMPLEMENTATION-CODE.md | 📝 Queued | ~1000 | Complete code |

---

## Contact & Feedback

This roadmap is based on extensive cross-referencing between:
- User's 3 updated specification documents
- Game source files (faunaAbilitiesDex.ts, faunaSpeciesDex.ts)
- Current Gemini implementation
- Gemini compliance rules (.claude/rules/)

All user notes and corrections have been incorporated. If additional clarifications are needed, refer back to the original spec documents or request updates.
