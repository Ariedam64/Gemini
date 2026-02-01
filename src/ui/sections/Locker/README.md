# Locker Section - HarvestLocker Card

## Overview

The HarvestLocker card provides a user-friendly interface for managing harvest locking rules with a flexible rule-based system.

## Features

### Rule System

**Rule Modes:**
- **Lock**: Prevent harvesting plants that match the conditions (blacklist)
- **Allow**: Only allow harvesting plants that match the conditions (whitelist)

**Conditions:**
- **Size Condition**: Lock/Allow based on plant size percentage (0-100%)
- **Mutation Condition**: Lock/Allow based on plant mutations
  - **Match ANY**: Plant has at least one of the selected mutations (OR logic)
  - **Match ALL**: Plant has all of the selected mutations (AND logic)

**Rule Types:**
- **Overall Rules**: Apply to all species by default
- **By Species Rules**: Species-specific rules that override overall rules

### UI Structure

#### Mode Toggle
- **Overall**: Manage rules that apply to all plant species
- **By Species**: Select a species to manage species-specific rules

#### Rule List
- Checkbox to quickly enable/disable rules
- Click a rule to select it (for deletion)
- Visual indicators:
  - **Green badge**: Allow mode
  - **Red badge**: Lock mode
- Rule description showing conditions (size, mutations)

#### Actions
- **Create Rule**: Opens modal to create a new rule
- **Delete Rule**: Deletes the selected rule (requires selection)

### Rule Creation Modal

**Fields:**
1. **Rule Name**: User-friendly name for the rule
2. **Rule Mode**: Lock or Allow
3. **Size Condition** (optional):
   - Enable/disable checkbox
   - Slider for minimum size percentage (0-100%)
4. **Mutation Condition** (optional):
   - Enable/disable checkbox
   - Match mode: ANY or ALL
   - Mutation selection (multiple checkboxes)

**Live Preview:**
- Shows how many plants would be harvestable vs locked
- Updates in real-time as you adjust conditions
- Based on current garden state

**Validation:**
- Rule name required
- At least one condition must be enabled
- If mutations enabled, at least one mutation must be selected

## Implementation Details

### Files Created

```
src/ui/sections/Locker/
├── parts/
│   ├── harvestLocker/
│   │   ├── HarvestLockerCard.ts      # Main card UI (Class pattern)
│   │   ├── RuleEditorModal.ts        # Rule creation/editing modal
│   │   └── index.ts                  # Barrel exports
│   └── index.ts                      # Parts barrel exports
└── section.ts                         # Updated to use HarvestLockerCard
```

### Feature Refactoring

The HarvestLocker feature was refactored from a simple criteria-based system to a flexible rule-based system:

**Updated Files:**
- `src/features/harvestLocker/types.ts` - New rule types
- `src/features/harvestLocker/state.ts` - Migration logic + rule management
- `src/features/harvestLocker/logic/core.ts` - Rule evaluation engine
- `src/features/harvestLocker/index.ts` - Public API

**Key Features:**
- Automatic migration from old config format
- Species rules override overall rules
- Support for both "lock" and "allow" modes
- Flexible mutation matching (ANY/ALL)

### Public API

```typescript
window.Gemini.Features.HarvestLocker

// Get rules
.getOverallRules(): HarvestRule[]
.getSpeciesRules(species: string): HarvestRule[]
.getAllSpeciesWithRules(): string[]

// Add rules
.addNewOverallRule(name, mode, sizeCondition?, mutationCondition?): HarvestRule
.addNewSpeciesRule(species, name, mode, sizeCondition?, mutationCondition?): HarvestRule

// Modify rules
.modifyRule(ruleId, updates): void
.removeRule(ruleId): void
.toggleRule(ruleId, enabled): void

// Configuration
.getConfig(): HarvestLockerConfig
```

## Usage Examples

### Example 1: Lock Large Frozen Plants (Overall)
- Name: "Lock Large Frozen"
- Mode: Lock
- Size: ≥50%
- Mutations: Frozen (Match ANY)

Result: Any plant ≥50% size with Frozen mutation will be locked

### Example 2: Only Harvest Perfect Dawncharged (Overall)
- Name: "Only Perfect Dawncharged"
- Mode: Allow
- Size: ≥100%
- Mutations: Dawncharged (Match ANY)

Result: Only 100% size Dawncharged plants can be harvested

### Example 3: Lock Carrots with Multiple Mutations (By Species)
- Species: Carrot
- Name: "Lock Multi-Mutation Carrots"
- Mode: Lock
- Mutations: Frozen, Dawncharged, Spicy (Match ALL)

Result: Only Carrots with ALL three mutations will be locked

## Testing

To test the implementation:

1. Run `npm run build` to build the userscript
2. Load the script in Tampermonkey/Violetmonkey
3. Open the game and access the Gemini HUD (Ctrl+Shift+U)
4. Navigate to the "Locker" tab
5. Try creating rules with different combinations
6. Check the live preview to see affected plants
7. Verify that harvest locks work correctly in-game

## Notes

- The live preview uses current garden state for accuracy
- Rules are persisted to storage automatically
- Legacy config is migrated automatically on first load
- Species rules completely override overall rules (no merging)
