# Testing Strategy - Phase 1: Calculator Modules & Auto-Strength

## Overview

This document provides comprehensive testing strategy for the Phase 1 refactoring of the Gemini extension's Pet Teams feature. All tests must pass before moving to Phase 2.

---

## A. Phase 1 Testing - Task by Task

### Task 1: Create `/calculators/petStrength.ts`

**What to Test:**
- Function exports and imports correctly
- Calculates STR from all stat sources
- Handles edge cases gracefully

**Expected Behavior:**
```typescript
calculatePetStrength(pet, weather) returns number >= 0
```

**Test Cases:**
| Input | Expected Output | Notes |
|-------|----------------|-------|
| Basic pet, no weather | Base STR only | Verify base calculation |
| Pet with abilities | Base + ability bonuses | Check ability calculations |
| Pet with weather boost | Base + weather bonus | Weather multipliers work |
| Pet with XP Boost I | Base + 20% boost | Single boost |
| Pet with XP Boost II | Base + 40% boost | Double boost |
| Pet with XP Boost III | Base + 60% boost | Triple boost |
| Snowy variant pet | Base + additional boost | Variant handling |
| Starving pet (hunger=0) | 0 STR | Hunger penalty |
| Pet with all boosts | Base + all modifiers | Comprehensive test |
| Null/undefined inputs | 0 or error handling | Defensive programming |

**Edge Cases:**
- Pet with no abilities array
- Weather object missing
- Negative hunger values
- Decimal hunger values
- Pet with isSnowy=true and weather=Frost

**Verification:**
```typescript
// Unit test structure
describe('calculatePetStrength', () => {
  it('calculates base strength correctly', () => {
    const pet = { baseStats: { strength: 10 }, hunger: 100, abilities: [] };
    expect(calculatePetStrength(pet, null)).toBe(10);
  });

  it('returns 0 for starving pets', () => {
    const pet = { baseStats: { strength: 10 }, hunger: 0, abilities: [] };
    expect(calculatePetStrength(pet, null)).toBe(0);
  });

  // Additional tests...
});
```

---

### Task 2: Create `/calculators/teamStrength.ts`

**What to Test:**
- Sums individual pet strengths correctly
- Handles variable team sizes (1-3 pets)
- Propagates weather effects to all pets

**Expected Behavior:**
```typescript
calculateTeamStrength(pets[], weather) returns number >= 0
```

**Test Cases:**
| Input | Expected Output | Notes |
|-------|----------------|-------|
| Empty array | 0 | Handle empty team |
| Single pet | Pet's STR | 1-pet team |
| Two pets | Sum of both | 2-pet team |
| Three pets | Sum of all three | Full team |
| Mixed hunger states | Correct partial sum | Some starving, some healthy |
| All starving | 0 | Full team starving |
| With weather boost | Sum with weather applied | Weather affects all |
| Null/undefined array | 0 | Defensive handling |

**Edge Cases:**
- Array with null/undefined pets
- Pets with varying ability levels
- Mix of Snowy and non-Snowy variants
- Duplicate pet references

**Verification:**
```typescript
describe('calculateTeamStrength', () => {
  it('sums multiple pet strengths', () => {
    const pets = [
      { baseStats: { strength: 10 }, hunger: 100, abilities: [] },
      { baseStats: { strength: 15 }, hunger: 100, abilities: [] }
    ];
    expect(calculateTeamStrength(pets, null)).toBe(25);
  });

  it('handles empty team', () => {
    expect(calculateTeamStrength([], null)).toBe(0);
  });
});
```

---

### Task 3: Create `/calculators/xpCalculator.ts`

**What to Test:**
- Calculates XP gain per team correctly
- Applies team strength modifiers
- Handles XP Boost abilities

**Expected Behavior:**
```typescript
calculateExpectedXP(team, baseXP) returns number >= 0
```

**Test Cases:**
| Input | Expected Output | Notes |
|-------|----------------|-------|
| Base team, 100 base XP | Calculated XP | No modifiers |
| Team with XP Boost I | Base * 1.2 | Single boost |
| Team with XP Boost II | Base * 1.4 | Double boost |
| Team with XP Boost III | Base * 1.6 | Triple boost |
| Multiple pets with XP Boost | Highest boost wins | Boost stacking rules |
| High STR team | Base + STR bonus | Strength modifier |
| Low STR team | Base XP (minimum) | Floor protection |
| Starving team (0 STR) | Minimum XP | Zero strength handling |

**Edge Cases:**
- baseXP = 0
- Negative baseXP values
- Multiple XP Boost levels on same team
- Decimal XP values (rounding)

**Verification:**
```typescript
describe('calculateExpectedXP', () => {
  it('applies XP Boost I correctly', () => {
    const team = {
      pets: [{ abilities: ['xpBoostI'], hunger: 100 }],
      baseXP: 100
    };
    expect(calculateExpectedXP(team, 100)).toBeCloseTo(120);
  });
});
```

---

### Task 4: Create `/renderers/petStrengthRenderer.ts`

**What to Test:**
- Renders strength value correctly
- Applies proper styling classes
- Handles zero/null values
- No DOM manipulation on import

**Expected Behavior:**
- Returns HTMLElement or string
- Contains correct strength value
- Has proper theme classes

**Test Cases:**
| Input | Expected Output | Notes |
|-------|----------------|-------|
| STR = 100 | "100" with styling | Normal strength |
| STR = 0 | "0" with warning style | Zero strength indicator |
| STR = 999 | "999" with styling | High strength |
| STR = null/undefined | "0" or "—" | Null handling |
| Decimal STR (45.7) | "45" or "45.7" | Rounding behavior |

**Edge Cases:**
- Very large numbers (>9999)
- Negative numbers (shouldn't happen)
- NaN values

**Verification:**
```typescript
describe('renderPetStrength', () => {
  it('renders strength value', () => {
    const element = renderPetStrength(100);
    expect(element.textContent).toContain('100');
  });

  it('applies warning style for zero strength', () => {
    const element = renderPetStrength(0);
    expect(element.classList.contains('warning')).toBe(true);
  });
});
```

---

### Task 5: Create `/renderers/teamStrengthRenderer.ts`

**What to Test:**
- Renders total team strength
- Includes breakdown icon/tooltip
- Applies theme styling
- No side effects on import

**Expected Behavior:**
- Displays total STR with label
- Shows individual pet contributions on hover/click
- Uses semantic CSS variables

**Test Cases:**
| Input | Expected Output | Notes |
|-------|----------------|-------|
| Team STR = 250 | "Total: 250" | Basic rendering |
| Empty team (0 STR) | "Total: 0" | Empty team |
| Single pet team | "Total: X" | One pet |
| With breakdown data | Tooltip/modal visible | Interaction test |

**Edge Cases:**
- Very long team names
- Teams with all starving pets
- Missing pet data

**Verification:**
- Visual inspection across all 8 themes
- Tooltip accessibility (keyboard navigation)
- Screen reader compatibility

---

### Task 6: Create `/renderers/xpProjectionRenderer.ts`

**What to Test:**
- Renders XP projection correctly
- Shows calculation breakdown
- Updates when team changes
- Responsive to theme changes

**Expected Behavior:**
- Displays projected XP gain
- Shows formula breakdown
- Updates in real-time

**Test Cases:**
| Input | Expected Output | Notes |
|-------|----------------|-------|
| Base XP = 100 | "~100 XP" | No modifiers |
| With XP Boost | "~120 XP (+20%)" | Shows boost |
| With STR modifier | "~XXX XP" | Includes STR bonus |
| Multiple modifiers | "~XXX XP (details)" | Combined effects |

**Edge Cases:**
- XP = 0
- Extremely high XP values
- Rapid team updates

**Verification:**
- Compare calculated vs. actual in-game XP
- Test across all boost combinations

---

### Task 7: Create `/state/petStatsState.ts`

**What to Test:**
- Stores pet stats correctly
- Updates on hunger changes
- Triggers recalculations when needed
- No memory leaks

**Expected Behavior:**
- Reactive state management
- Efficient updates (only changed pets)
- Clean state cleanup

**Test Cases:**
| Action | Expected State | Notes |
|--------|----------------|-------|
| Initialize state | Empty or default | Initial state |
| Add pet stats | Pet stored correctly | State update |
| Update hunger | STR recalculated | Reactive update |
| Remove pet | Pet removed from state | Cleanup |
| Bulk update | All pets updated | Performance test |

**Edge Cases:**
- Duplicate pet IDs
- Rapid state changes
- State during team deletion

**Verification:**
```typescript
describe('petStatsState', () => {
  it('stores and retrieves pet stats', () => {
    const state = new PetStatsState();
    state.updatePet('pet1', { strength: 100 });
    expect(state.getPet('pet1').strength).toBe(100);
  });
});
```

---

### Task 8: Create `/state/weatherState.ts`

**What to Test:**
- Stores current weather
- Notifies listeners on weather change
- Handles weather-specific modifiers

**Expected Behavior:**
- Pub/sub pattern for weather updates
- Efficient notification system

**Test Cases:**
| Action | Expected Behavior | Notes |
|--------|-------------------|-------|
| Set weather to Frost | All listeners notified | Weather change |
| No weather change | No notifications | Optimization |
| Multiple listeners | All receive update | Pub/sub test |

**Edge Cases:**
- Weather changes during calculations
- Invalid weather types
- Null weather

**Verification:**
```typescript
describe('weatherState', () => {
  it('notifies listeners on weather change', () => {
    const state = new WeatherState();
    let notified = false;
    state.subscribe(() => notified = true);
    state.setWeather('Frost');
    expect(notified).toBe(true);
  });
});
```

---

### Task 9: Create `/observers/hungerObserver.ts`

**What to Test:**
- Detects hunger changes via MutationObserver
- Triggers STR recalculations
- Doesn't observe unnecessarily
- Cleans up observers properly

**Expected Behavior:**
- Observes hunger indicators in DOM
- Fires callbacks on hunger change
- Disconnects when component unmounts

**Test Cases:**
| Action | Expected Behavior | Notes |
|--------|-------------------|-------|
| Hunger changes in DOM | Callback fired | Detection works |
| No hunger change | No callback | Optimization |
| Multiple rapid changes | Debounced callbacks | Performance |
| Observer disconnects | No memory leak | Cleanup |

**Edge Cases:**
- Hunger element removed from DOM
- Multiple observers on same element
- Observer started before DOM ready

**Verification:**
```typescript
describe('hungerObserver', () => {
  it('detects hunger changes', (done) => {
    const observer = new HungerObserver((hunger) => {
      expect(hunger).toBe(50);
      done();
    });
    // Simulate DOM change
    updateHungerInDOM(50);
  });
});
```

---

### Task 10: Create `/observers/weatherObserver.ts`

**What to Test:**
- Detects weather changes in game state
- Updates weatherState correctly
- Handles weather transitions
- No performance impact

**Expected Behavior:**
- Monitors weather indicators
- Updates state on change
- Efficient polling/observation

**Test Cases:**
| Action | Expected Behavior | Notes |
|--------|-------------------|-------|
| Weather changes to Frost | State updated | Detection |
| Weather unchanged | No state update | Optimization |
| Rapid weather changes | All changes captured | Reliability |

**Edge Cases:**
- Weather during page load
- Weather element not present
- Invalid weather values

**Verification:**
- Manual weather change in-game
- Verify state update propagation

---

### Task 11: Create `/components/PetStrengthBadge.ts`

**What to Test:**
- Renders as Web Component
- Uses Shadow DOM correctly
- Applies theme CSS variables
- Updates reactively
- No side effects on import

**Expected Behavior:**
- Custom element `<pet-strength-badge>`
- Isolated styling via Shadow DOM
- Theme-aware rendering

**Test Cases:**
| Scenario | Expected Rendering | Notes |
|----------|-------------------|-------|
| Normal strength | Badge with value | Basic render |
| Zero strength | Red/warning badge | Visual indicator |
| High strength | Emphasized styling | Visual hierarchy |
| Theme change | Updates immediately | Theme reactivity |

**Edge Cases:**
- Component not registered
- Multiple instances on same pet
- Component created before DOM ready

**Verification:**
```typescript
describe('PetStrengthBadge', () => {
  it('registers as custom element', () => {
    expect(customElements.get('pet-strength-badge')).toBeDefined();
  });

  it('uses shadow DOM', () => {
    const badge = document.createElement('pet-strength-badge');
    expect(badge.shadowRoot).not.toBeNull();
  });
});
```

---

### Task 12: Create `/components/TeamStrengthDisplay.ts`

**What to Test:**
- Renders team total strength
- Shows expandable breakdown
- Integrates with theme system
- Updates on team changes
- No side effects on import

**Expected Behavior:**
- Custom element `<team-strength-display>`
- Clickable to show/hide breakdown
- Real-time updates

**Test Cases:**
| Scenario | Expected Rendering | Notes |
|----------|-------------------|-------|
| Collapsed state | Total only | Default state |
| Expanded state | Total + breakdown | Interaction |
| Empty team | "0 STR" | Empty handling |
| Team update | Immediate re-render | Reactivity |

**Edge Cases:**
- Expand/collapse during update
- Multiple rapid team changes
- Component removal during expansion

**Verification:**
- Click expand/collapse 10+ times
- Update team while expanded
- Check for memory leaks

---

### Task 13: Create `/components/XPProjectionCard.ts`

**What to Test:**
- Renders XP projection
- Shows calculation details
- Expands/collapses smoothly
- Theme integration
- No side effects on import

**Expected Behavior:**
- Custom element `<xp-projection-card>`
- Smooth animations
- Detailed breakdown on expand

**Test Cases:**
| Scenario | Expected Rendering | Notes |
|----------|-------------------|-------|
| Collapsed | Projected XP only | Default |
| Expanded | Full breakdown | Details visible |
| No XP Boost | Base calculation | Simple case |
| With XP Boost | Boost highlighted | Modifier display |
| Multiple modifiers | All shown clearly | Complex case |

**Edge Cases:**
- Zero XP projection
- Very high XP values (formatting)
- Expand during calculation

**Verification:**
- Expand/collapse animation smooth
- Breakdown matches calculation
- No layout shift

---

### Task 14: Create `/styles/components/petStrengthBadge.css`

**What to Test:**
- Uses only CSS variables (no hardcoded colors)
- Renders correctly in all 8 themes
- Responsive sizing
- Accessible contrast ratios

**Expected Behavior:**
- Theme variables applied
- WCAG AA contrast minimum
- Scales with font size

**Test Cases:**
| Theme | Badge Appearance | Pass/Fail |
|-------|------------------|-----------|
| Light | Dark text on light bg | ✓ |
| Dark | Light text on dark bg | ✓ |
| Blue | Blue accent colors | ✓ |
| Purple | Purple accent colors | ✓ |
| Green | Green accent colors | ✓ |
| Red | Red accent colors | ✓ |
| Orange | Orange accent colors | ✓ |
| Pink | Pink accent colors | ✓ |

**Edge Cases:**
- High contrast mode
- Custom theme CSS
- Browser zoom (200%+)

**Verification:**
- Contrast checker tool
- Visual inspection per theme
- Screen reader testing

---

### Task 15: Create `/styles/components/teamStrengthDisplay.css`

**What to Test:**
- Theme variable usage
- Expand/collapse animations
- Responsive layout
- Breakdown list styling

**Expected Behavior:**
- Smooth transitions
- No layout shift on expand
- Readable breakdown text

**Test Cases:**
| Scenario | CSS Behavior | Notes |
|----------|--------------|-------|
| Collapsed | height: auto or fixed | No overflow |
| Expanding | Smooth transition | No jank |
| Expanded | Full content visible | Scrollable if needed |
| Collapsing | Smooth transition | Reverse animation |

**Edge Cases:**
- Long pet names in breakdown
- Very tall expanded content
- Rapid expand/collapse

**Verification:**
- Record video at 60fps
- Check frame drops
- Test on low-end devices

---

### Task 16: Create `/styles/components/xpProjectionCard.css`

**What to Test:**
- Card styling with theme variables
- Expand/collapse animations
- Icon/badge integration
- Responsive behavior

**Expected Behavior:**
- Card follows Gemini design system
- Smooth animations
- Clear visual hierarchy

**Test Cases:**
| Element | Styling Check | Pass/Fail |
|---------|---------------|-----------|
| Card border | Uses `--border-color` | ✓ |
| Background | Uses `--bg-secondary` | ✓ |
| Text | Uses `--text-primary` | ✓ |
| Accent | Uses `--accent-color` | ✓ |
| Hover state | Subtle highlight | ✓ |

**Edge Cases:**
- Very long breakdown text
- Multiple cards on screen
- Print styles

**Verification:**
- Theme switcher test
- Hover/focus states
- Keyboard navigation highlighting

---

### Task 17: Extract from `myPets.js` → `myPets-core.js`

**What to Test:**
- Core functionality unchanged
- No new dependencies introduced
- File size < 500 lines
- No side effects on import

**Expected Behavior:**
- Existing features work identically
- Clean separation of concerns
- Importable without execution

**Test Cases:**
| Feature | Before | After | Status |
|---------|--------|-------|--------|
| Pet display | ✓ | ✓ | Unchanged |
| Team management | ✓ | ✓ | Unchanged |
| Hunger tracking | ✓ | ✓ | Unchanged |
| XP tracking | ✓ | ✓ | Unchanged |

**Edge Cases:**
- Module import order
- Circular dependencies
- Global variable pollution

**Verification:**
```bash
# Check file size
wc -l myPets-core.js  # Should be < 500

# Check for side effects
grep -E "(window\.|document\.)" myPets-core.js | grep -v export

# Dependency check
npm run check-deps
```

---

### Task 18: Extract from `myPets.js` → `myPets-ui.js`

**What to Test:**
- UI rendering isolated
- Theme integration maintained
- No business logic present
- Shadow DOM CSS injection

**Expected Behavior:**
- Pure UI rendering functions
- Uses only theme CSS variables
- No direct DOM manipulation on import

**Test Cases:**
| UI Component | Renders | Theme-aware | Pass/Fail |
|--------------|---------|-------------|-----------|
| Pet card | ✓ | ✓ | ✓ |
| Team header | ✓ | ✓ | ✓ |
| Strength badge | ✓ | ✓ | ✓ |
| XP projection | ✓ | ✓ | ✓ |

**Edge Cases:**
- Render before theme loaded
- Multiple theme changes
- Component unmounting

**Verification:**
- Visual regression testing
- Theme switcher testing
- Performance profiling

---

### Task 19: Extract from `myPets.js` → `myPets-calculator.js`

**What to Test:**
- Pure calculation functions
- No DOM access
- No side effects
- Correct mathematical operations

**Expected Behavior:**
- Stateless functions
- Deterministic output
- Fast execution (<1ms per call)

**Test Cases:**
| Function | Input | Output | Time |
|----------|-------|--------|------|
| calculateStrength | Pet data | Number | <1ms |
| calculateTeamTotal | Pet array | Number | <1ms |
| calculateXP | Team + base | Number | <1ms |

**Edge Cases:**
- Null/undefined inputs
- Empty arrays
- Extreme values

**Verification:**
```typescript
// Unit tests for each function
describe('myPets-calculator', () => {
  it('has no side effects', () => {
    const input = { /* test data */ };
    calculateStrength(input);
    // Verify input unchanged
    expect(input).toEqual(originalInput);
  });
});
```

---

### Task 20: Create `/integration/petTeamsIntegration.js`

**What to Test:**
- Coordinates all modules correctly
- Initializes in correct order
- Handles errors gracefully
- Cleans up on unmount

**Expected Behavior:**
- Single entry point for Pet Teams
- Manages module lifecycle
- Error boundaries in place

**Test Cases:**
| Scenario | Expected Behavior | Notes |
|----------|-------------------|-------|
| Normal init | All modules load | Success path |
| Module load failure | Graceful degradation | Error handling |
| Rapid re-init | No duplicate observers | Cleanup test |
| Unmount | All observers disconnect | Memory leak check |

**Edge Cases:**
- Init before DOM ready
- Init after page unload
- Concurrent initializations

**Verification:**
```typescript
describe('petTeamsIntegration', () => {
  it('initializes all modules', () => {
    const integration = new PetTeamsIntegration();
    integration.init();
    expect(integration.isInitialized()).toBe(true);
  });

  it('cleans up on destroy', () => {
    const integration = new PetTeamsIntegration();
    integration.init();
    integration.destroy();
    expect(integration.hasActiveObservers()).toBe(false);
  });
});
```

---

### Task 21: Update `myPets.js` to use new modules

**What to Test:**
- Backwards compatibility maintained
- No breaking changes
- Performance unchanged or improved
- All imports resolve correctly

**Expected Behavior:**
- Drop-in replacement
- Identical user experience
- Cleaner codebase

**Test Cases:**
| Feature | Works | Performance | Notes |
|---------|-------|-------------|-------|
| Pet display | ✓ | Same/Better | Core feature |
| Team strength | ✓ | Same/Better | New calculation |
| XP projection | ✓ | Same/Better | New feature |
| Hunger updates | ✓ | Same/Better | Real-time |
| Weather effects | ✓ | Same/Better | Auto-update |

**Edge Cases:**
- Load order changes
- Missing module files
- Browser compatibility

**Verification:**
```bash
# Regression test suite
npm run test:regression

# Performance comparison
npm run perf:compare -- --before=old-myPets.js --after=myPets.js
```

---

### Task 22: Add JSDoc comments to all new modules

**What to Test:**
- All public functions documented
- Parameter types specified
- Return types specified
- Examples provided

**Expected Behavior:**
- Clear, concise documentation
- TypeScript-compatible JSDoc
- IDE autocomplete works

**Test Cases:**
| Module | Has JSDoc | Complete | Examples | Pass/Fail |
|--------|-----------|----------|----------|-----------|
| petStrength.ts | ✓ | ✓ | ✓ | ✓ |
| teamStrength.ts | ✓ | ✓ | ✓ | ✓ |
| xpCalculator.ts | ✓ | ✓ | ✓ | ✓ |
| ... | ✓ | ✓ | ✓ | ✓ |

**Edge Cases:**
- Complex function signatures
- Generic types
- Optional parameters

**Verification:**
```bash
# Check JSDoc coverage
npm run docs:check

# Generate documentation
npm run docs:generate

# Verify in IDE (VSCode IntelliSense)
```

---

## B. Theme Compatibility Testing

### Theme Test Matrix

Test all components across all 8 themes:

| Component | Light | Dark | Blue | Purple | Green | Red | Orange | Pink |
|-----------|-------|------|------|--------|-------|-----|--------|------|
| PetStrengthBadge | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| TeamStrengthDisplay | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| XPProjectionCard | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| Footer styling | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |
| Header styling | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ |

### Theme-Specific Tests

#### 1. Semantic Color Variables

Verify each component uses ONLY these variables:

```css
/* Required variables */
--bg-primary
--bg-secondary
--text-primary
--text-secondary
--text-muted
--border-color
--accent-color
--accent-hover
--success-color
--warning-color
--error-color
```

**Test Procedure:**
1. Open DevTools
2. Inspect component Shadow DOM
3. Check computed styles
4. Verify no hardcoded colors (no `#` or `rgb()`)

**Pass Criteria:**
- ✓ All colors from CSS variables
- ✓ No hardcoded hex/rgb values
- ✓ Falls back gracefully if variable missing

---

#### 2. Contrast and Readability

Test with contrast checker (WCAG AA standard = 4.5:1 for text):

| Theme | Text/BG Ratio | Badge Text Ratio | Pass/Fail |
|-------|---------------|------------------|-----------|
| Light | ≥4.5:1 | ≥4.5:1 | ⬜ |
| Dark | ≥4.5:1 | ≥4.5:1 | ⬜ |
| Blue | ≥4.5:1 | ≥4.5:1 | ⬜ |
| Purple | ≥4.5:1 | ≥4.5:1 | ⬜ |
| Green | ≥4.5:1 | ≥4.5:1 | ⬜ |
| Red | ≥4.5:1 | ≥4.5:1 | ⬜ |
| Orange | ≥4.5:1 | ≥4.5:1 | ⬜ |
| Pink | ≥4.5:1 | ≥4.5:1 | ⬜ |

**Tools:**
- Chrome DevTools Contrast Checker
- WebAIM Contrast Checker
- axe DevTools

---

#### 3. Footer Styling

**Test Cases:**
- Footer background matches theme
- Border separators use `--border-color`
- Text uses `--text-secondary`
- Hover states use `--accent-hover`
- Expanded state clearly visible

**Visual Checklist (per theme):**
- [ ] Footer integrates seamlessly
- [ ] No visual "break" from main card
- [ ] Expand/collapse icon visible
- [ ] Hover state provides feedback
- [ ] Expanded content readable

---

#### 4. Header Styling

**Test Cases:**
- Header uses `--bg-secondary`
- Title text uses `--text-primary`
- Subtitle uses `--text-muted`
- Icons use `--text-secondary`
- Dividers use `--border-color`

**Visual Checklist (per theme):**
- [ ] Header stands out from content
- [ ] Clear visual hierarchy
- [ ] Icons properly aligned
- [ ] Responsive font sizing
- [ ] No text overflow

---

### Theme Switching Test

**Procedure:**
1. Load page with Pet Teams visible
2. Rapidly switch between all 8 themes
3. Observe for:
   - Flash of unstyled content (FOUC)
   - Color transition smoothness
   - Any stuck/cached styles
   - Component re-rendering

**Pass Criteria:**
- ✓ Instant theme change (no delay)
- ✓ No FOUC or flickering
- ✓ All components update simultaneously
- ✓ No console errors

---

## C. Responsive Design Testing

### Mobile Testing (<768px)

**Test Devices/Viewports:**
- iPhone SE (375px)
- iPhone 12/13 (390px)
- iPhone 12/13 Pro Max (428px)
- Android (360px, 412px)

**Test Cases:**

#### 1. Component Layout
| Component | Mobile Behavior | Pass/Fail |
|-----------|----------------|-----------|
| PetStrengthBadge | Scales down appropriately | ⬜ |
| TeamStrengthDisplay | Stacks vertically if needed | ⬜ |
| XPProjectionCard | Full-width, readable | ⬜ |
| Expanded breakdown | Scrollable, no overflow | ⬜ |

#### 2. Touch Interactions
- [ ] Expand/collapse buttons large enough (min 44×44px)
- [ ] No accidental clicks
- [ ] Smooth scroll in expanded view
- [ ] No horizontal scroll

#### 3. Font Sizes
- [ ] All text ≥14px
- [ ] Headers ≥16px
- [ ] Numbers in badges ≥16px
- [ ] Readable without zooming

---

### Desktop Testing (≥768px)

**Test Viewports:**
- Tablet (768px, 1024px)
- Laptop (1366px, 1440px)
- Desktop (1920px, 2560px)

**Test Cases:**

#### 1. Component Layout
| Component | Desktop Behavior | Pass/Fail |
|-----------|-----------------|-----------|
| PetStrengthBadge | Inline with pet info | ⬜ |
| TeamStrengthDisplay | Horizontal layout | ⬜ |
| XPProjectionCard | Constrained width | ⬜ |
| Expanded breakdown | Multi-column if space | ⬜ |

#### 2. Hover States
- [ ] Strength badge hover shows tooltip
- [ ] Expand button hover changes cursor
- [ ] Interactive elements have hover feedback
- [ ] No hover on touch devices

#### 3. Layout Efficiency
- [ ] No wasted whitespace
- [ ] Optimal information density
- [ ] Clear visual grouping
- [ ] Balanced composition

---

### Expand/Collapse Behavior Testing

**Test Scenarios:**

1. **Single Expand**
   - Click to expand
   - Verify smooth animation
   - Content fully visible
   - Click to collapse
   - Returns to original state

2. **Multiple Expand**
   - Expand Team 1
   - Expand Team 2
   - Both remain expanded
   - Collapse Team 1
   - Team 2 still expanded

3. **Max Expanded (5 Teams)**
   - Expand all 5 teams
   - Page remains scrollable
   - No performance degradation
   - All collapse independently

4. **Rapid Expand/Collapse**
   - Click expand 5× rapidly
   - No animation conflicts
   - Final state correct
   - No orphaned animations

**Pass Criteria:**
- ✓ Smooth 60fps animations
- ✓ No layout shift
- ✓ Correct final state
- ✓ No console errors

---

### Sprite Rendering at Different Sizes

**Pet Sprites:**
- Small (32×32px) - Mobile
- Medium (48×48px) - Tablet
- Large (64×64px) - Desktop

**Test Cases:**
| Size | Sharp | No pixelation | Aligned | Pass/Fail |
|------|-------|---------------|---------|-----------|
| 32px | ✓ | ✓ | ✓ | ⬜ |
| 48px | ✓ | ✓ | ✓ | ⬜ |
| 64px | ✓ | ✓ | ✓ | ⬜ |

**Test Procedure:**
1. Set viewport to target size
2. Inspect pet sprite rendering
3. Check for:
   - Blurriness
   - Pixelation
   - Alignment issues
   - Color accuracy

---

## D. Edge Cases

### 1. Starving Pets (hunger = 0)

**Scenarios:**

| Scenario | Expected Behavior | Pass/Fail |
|----------|-------------------|-----------|
| Single starving pet | STR = 0, visual indicator | ⬜ |
| All pets starving | Team STR = 0, warning message | ⬜ |
| Some starving | Partial team STR, breakdown shows 0s | ⬜ |
| Hunger drops to 0 | Immediate STR update to 0 | ⬜ |
| Feed starving pet | STR recalculates instantly | ⬜ |

**Visual Indicators:**
- [ ] Red/warning color for 0 STR
- [ ] Hunger icon shows empty
- [ ] Tooltip explains penalty
- [ ] Clear CTA to feed pet

---

### 2. Max STR Pets

**Scenarios:**

| Scenario | Expected Behavior | Pass/Fail |
|----------|-------------------|-----------|
| Pet with max abilities | Correct calculation | ⬜ |
| Pet with all XP Boosts | Highest boost applied | ⬜ |
| Snowy variant + Frost weather | All bonuses stack | ⬜ |
| Display very high STR (999+) | Number doesn't overflow | ⬜ |

**Number Formatting:**
- 1-999: Display as-is
- 1,000-9,999: "1,234" or "1.2K"
- 10,000+: "12.3K"

---

### 3. Empty Team Slots

**Scenarios:**

| Scenario | Expected Behavior | Pass/Fail |
|----------|-------------------|-----------|
| Team with 1 pet, 2 empty | Show 1 pet STR | ⬜ |
| Team with 2 pets, 1 empty | Show 2 pets STR | ⬜ |
| All slots empty | Team STR = 0 or "No pets" | ⬜ |
| Add pet to empty slot | Immediate STR update | ⬜ |
| Remove pet from slot | Immediate STR recalc | ⬜ |

**UI Behavior:**
- [ ] Empty slots greyed out
- [ ] No STR shown for empty slots
- [ ] Breakdown only shows actual pets
- [ ] Add pet button visible

---

### 4. Weather Changes

**Frost Weather Tests:**

| Pet Type | Weather | Expected STR | Pass/Fail |
|----------|---------|--------------|-----------|
| Normal pet | None | Base STR | ⬜ |
| Normal pet | Frost | Base STR | ⬜ |
| Snowy variant | None | Base STR + variant bonus | ⬜ |
| Snowy variant | Frost | Base + variant + weather | ⬜ |

**Weather Transition:**
- [ ] Weather changes detected within 3 seconds
- [ ] All teams recalculate automatically
- [ ] Visual indicator of weather boost
- [ ] Breakdown shows weather contribution

---

### 5. XP Boost Combinations

**Boost Stacking Tests:**

| Team Composition | Expected Boost | Pass/Fail |
|------------------|----------------|-----------|
| No XP Boost | 0% | ⬜ |
| 1 pet with Boost I | +20% | ⬜ |
| 2 pets with Boost I | +20% (doesn't stack) | ⬜ |
| 1 pet with Boost II | +40% | ⬜ |
| Boost I + Boost II | +40% (highest wins) | ⬜ |
| Boost I + Boost II + Boost III | +60% (highest wins) | ⬜ |
| 3 pets all Boost III | +60% | ⬜ |

**Snowy Variant XP Tests:**

| Scenario | Expected Boost | Pass/Fail |
|----------|----------------|-----------|
| Snowy + Boost I | Boost I only | ⬜ |
| Snowy + Boost II + Frost | Boost II + weather | ⬜ |
| 2 Snowy + Boost III | Boost III | ⬜ |

**Visual Breakdown:**
- [ ] Shows which boost is active
- [ ] Explains why higher boost chosen
- [ ] Lists all boost sources
- [ ] Calculates final XP correctly

---

### 6. Variable Team Sizes (1-3 Pets)

**Test Matrix:**

| Team Size | STR Calculation | XP Calculation | UI Display | Pass/Fail |
|-----------|----------------|----------------|------------|-----------|
| 1 pet | Pet's STR | Base + pet boost | Compact | ⬜ |
| 2 pets | Sum of both | Base + best boost | Normal | ⬜ |
| 3 pets | Sum of all | Base + best boost | Full | ⬜ |

**Edge Cases:**
- [ ] Add 2nd pet to 1-pet team
- [ ] Add 3rd pet to 2-pet team
- [ ] Remove pet from 3-pet team
- [ ] Swap pets in team
- [ ] Delete entire team

---

## E. Gemini Compliance Verification

### Core Rules Compliance (`core.md`)

**Checklist:**

- [ ] **No side effects on import**
  - Import any module without execution
  - No global variable pollution
  - No DOM manipulation on load

- [ ] **Shadow DOM CSS injection**
  - All component styles in Shadow DOM
  - No global style pollution
  - Styles scoped per component

- [ ] **Theme variables only**
  - No hardcoded colors
  - Uses semantic CSS variables
  - Falls back gracefully

- [ ] **Files < 500 lines**
  - All files under limit
  - Logical separation maintained
  - No artificially split files

**Test Command:**
```bash
# Check file sizes
find src/features/myPets -name "*.js" -o -name "*.ts" | xargs wc -l | awk '$1 > 500 {print}'

# Check for side effects (heuristic)
grep -r "window\." src/features/myPets --exclude="*.test.js"
grep -r "document\." src/features/myPets --exclude="*.test.js"

# Check for hardcoded colors
grep -rE "#[0-9a-fA-F]{3,6}" src/features/myPets --exclude="*.md"
grep -r "rgb(" src/features/myPets
```

---

### Features Rules Compliance (`features.md`)

**Checklist:**

- [ ] **Modular architecture**
  - Clear separation of concerns
  - Calculators, renderers, state separate
  - Composable modules

- [ ] **State management**
  - Centralized state (petStatsState, weatherState)
  - Reactive updates
  - No direct DOM mutation

- [ ] **Observer pattern**
  - MutationObservers for DOM changes
  - Pub/sub for state changes
  - Clean disconnect on unmount

- [ ] **Performance optimization**
  - Debounced updates
  - Efficient re-renders
  - No unnecessary calculations

**Test Procedure:**
1. Code review each module
2. Verify module boundaries
3. Check state flow
4. Profile performance

---

### UI Components Rules (`ui.components.md`)

**Checklist:**

- [ ] **Web Components standard**
  - Extends HTMLElement
  - Registers with customElements
  - Uses Shadow DOM

- [ ] **Lifecycle methods**
  - connectedCallback for setup
  - disconnectedCallback for cleanup
  - attributeChangedCallback for reactivity

- [ ] **Accessibility**
  - ARIA labels where needed
  - Keyboard navigation
  - Screen reader friendly

- [ ] **Theme integration**
  - Reads CSS variables from host
  - Updates on theme change
  - No hardcoded colors

**Test Components:**
```typescript
// Component test template
describe('ComponentName', () => {
  it('is a valid Web Component', () => {
    expect(ComponentName.prototype instanceof HTMLElement).toBe(true);
  });

  it('uses Shadow DOM', () => {
    const el = new ComponentName();
    expect(el.shadowRoot).toBeTruthy();
  });

  it('cleans up on disconnect', () => {
    const el = new ComponentName();
    document.body.appendChild(el);
    document.body.removeChild(el);
    // Check for leaks
  });
});
```

---

### No Side Effects on Import

**Test Procedure:**

1. **Static Analysis:**
   ```bash
   # Check for immediate function calls
   grep -r "^[^/]*(" src/features/myPets --exclude="*.test.js"

   # Check for IIFE
   grep -r "(function()" src/features/myPets

   # Check for top-level await
   grep -r "^await " src/features/myPets
   ```

2. **Dynamic Test:**
   ```javascript
   // Test file: no-side-effects.test.js
   const globalsBefore = Object.keys(window);
   const domBefore = document.body.innerHTML;

   import('./myPets.js');

   const globalsAfter = Object.keys(window);
   const domAfter = document.body.innerHTML;

   expect(globalsAfter.length).toBe(globalsBefore.length);
   expect(domAfter).toBe(domBefore);
   ```

3. **Manual Verification:**
   - Import module in fresh page
   - Check window object
   - Inspect DOM
   - Verify no network requests

**Pass Criteria:**
- ✓ No new global variables
- ✓ No DOM changes
- ✓ No console output
- ✓ No network activity

---

## F. Performance Testing

### 1. Auto-Update Performance (3-Second Interval)

**Test Setup:**
- 5 teams configured
- All teams expanded
- Auto-update enabled (every 3 seconds)
- Monitor for 5 minutes (100 updates)

**Metrics:**

| Metric | Target | Measured | Pass/Fail |
|--------|--------|----------|-----------|
| CPU usage (average) | <5% | | ⬜ |
| CPU usage (peak) | <15% | | ⬜ |
| Memory growth | <1MB/min | | ⬜ |
| Frame rate | 60fps | | ⬜ |
| Update latency | <50ms | | ⬜ |

**Test Procedure:**
1. Open DevTools Performance tab
2. Start recording
3. Enable auto-update
4. Wait 5 minutes
5. Stop recording
6. Analyze:
   - CPU usage chart
   - Memory timeline
   - Frame rate consistency
   - Long tasks (>50ms)

**Pass Criteria:**
- ✓ No memory leaks (stable sawtooth pattern)
- ✓ Consistent frame rate
- ✓ No long tasks blocking main thread
- ✓ Memory usage returns to baseline

---

### 2. Max Expanded Teams (5 Teams)

**Test Scenario:**
- Create 5 teams
- Each team has 3 pets
- Expand all 5 teams simultaneously
- Interact with page (scroll, hover, click)

**Performance Metrics:**

| Action | Frame Rate | Time to Complete | Pass/Fail |
|--------|-----------|------------------|-----------|
| Expand all 5 | ≥60fps | <1s | ⬜ |
| Scroll page | ≥60fps | Smooth | ⬜ |
| Collapse all 5 | ≥60fps | <1s | ⬜ |
| Update all teams | ≥60fps | <100ms | ⬜ |

**Test Procedure:**
1. Record Performance profile
2. Expand all teams (measure time)
3. Scroll page (check frame rate)
4. Collapse all (measure time)
5. Trigger update (measure latency)

**Pass Criteria:**
- ✓ Expand animation smooth
- ✓ No layout thrashing
- ✓ Collapse animation smooth
- ✓ Updates don't block UI

---

### 3. Memory Leak Testing

**Test Duration:** 30 minutes

**Procedure:**
1. Take heap snapshot (baseline)
2. Expand/collapse teams 100 times
3. Take heap snapshot
4. Add/remove pets 50 times
5. Take heap snapshot
6. Switch themes 20 times
7. Take final heap snapshot

**Analysis:**
- Compare snapshots
- Look for:
  - Detached DOM nodes
  - Event listener leaks
  - Retained references
  - Growing object counts

**Pass Criteria:**
- ✓ <1MB memory growth over 30min
- ✓ No detached DOM nodes
- ✓ Event listeners properly cleaned up
- ✓ Object count stable

**Tools:**
- Chrome DevTools Memory profiler
- Heap snapshot comparison
- Allocation timeline

---

### 4. Calculation Performance

**Benchmark Tests:**

| Function | Iterations | Max Time | Measured | Pass/Fail |
|----------|-----------|----------|----------|-----------|
| calculatePetStrength | 10,000 | <10ms | | ⬜ |
| calculateTeamStrength | 10,000 | <20ms | | ⬜ |
| calculateExpectedXP | 10,000 | <20ms | | ⬜ |

**Test Code:**
```javascript
// Benchmark template
function benchmark(fn, iterations = 10000) {
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    fn();
  }
  const end = performance.now();
  return end - start;
}

// Run benchmarks
const strTime = benchmark(() => calculatePetStrength(testPet, testWeather));
const teamTime = benchmark(() => calculateTeamStrength(testPets, testWeather));
const xpTime = benchmark(() => calculateExpectedXP(testTeam, 100));

console.log(`Pet STR: ${strTime}ms for 10k iterations`);
console.log(`Team STR: ${teamTime}ms for 10k iterations`);
console.log(`XP Calc: ${xpTime}ms for 10k iterations`);
```

**Pass Criteria:**
- ✓ All functions <1ms per call (average)
- ✓ No noticeable lag during updates
- ✓ Calculations don't block rendering

---

## G. Regression Testing

### Existing XP Tracker Functionality

**Test Cases:**

| Feature | Before | After | Status |
|---------|--------|-------|--------|
| Display current XP | ✓ | ✓ | ⬜ |
| Show XP progress bar | ✓ | ✓ | ⬜ |
| Calculate XP to next level | ✓ | ✓ | ⬜ |
| Update on XP gain | ✓ | ✓ | ⬜ |
| Level up animation | ✓ | ✓ | ⬜ |
| XP history tracking | ✓ | ✓ | ⬜ |

**Verification:**
- Side-by-side comparison (old vs new)
- Pixel-perfect UI match
- Identical functionality
- No console errors

---

### Pet Team Management

**Test Cases:**

| Feature | Before | After | Status |
|---------|--------|-------|--------|
| Create new team | ✓ | ✓ | ⬜ |
| Edit team name | ✓ | ✓ | ⬜ |
| Add pet to team | ✓ | ✓ | ⬜ |
| Remove pet from team | ✓ | ✓ | ⬜ |
| Delete team | ✓ | ✓ | ⬜ |
| Reorder teams | ✓ | ✓ | ⬜ |
| Save team configuration | ✓ | ✓ | ⬜ |
| Load team configuration | ✓ | ✓ | ⬜ |

**Verification:**
- Test each operation 10 times
- Verify data persistence
- Check for edge cases (empty names, etc.)
- Ensure no data loss

---

### Other Feature Integration

**Features to Test:**

1. **Settings Panel**
   - [ ] Pet Teams settings accessible
   - [ ] Theme switcher still works
   - [ ] Other settings unaffected

2. **Pet Catalog**
   - [ ] Pet selection for teams works
   - [ ] Pet stats display correctly
   - [ ] Filtering/search functional

3. **Weather System**
   - [ ] Weather changes propagate
   - [ ] Weather icons display
   - [ ] Weather-based calculations correct

4. **Shop/Inventory**
   - [ ] Can buy/sell pets
   - [ ] Inventory updates correctly
   - [ ] Transactions don't affect teams

**Pass Criteria:**
- ✓ All existing features work
- ✓ No new bugs introduced
- ✓ Performance unchanged or better
- ✓ UI consistency maintained

---

### Breaking Changes Check

**Checklist:**

- [ ] **API compatibility**
  - No removed public functions
  - No changed function signatures
  - Backwards-compatible exports

- [ ] **Data format compatibility**
  - Team data structure unchanged
  - Pet data structure unchanged
  - Save file format compatible

- [ ] **Event compatibility**
  - Same events fired
  - Same event data format
  - Event listeners still work

- [ ] **CSS compatibility**
  - Same class names (if public)
  - Same CSS variables (if public)
  - No broken external styles

**Test Procedure:**
1. Load old save file
2. Import into new version
3. Verify all data intact
4. Test all operations
5. Export save file
6. Import into old version (if possible)

**Pass Criteria:**
- ✓ 100% save file compatibility
- ✓ No data migration needed
- ✓ Old integrations still work
- ✓ No breaking API changes

---

## Test Checklists

### Pre-Release Checklist

#### Functionality
- [ ] All 22 tasks completed
- [ ] Unit tests pass (100% of suite)
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Edge cases handled

#### Performance
- [ ] No memory leaks detected
- [ ] 60fps animations
- [ ] <100ms update latency
- [ ] Auto-update doesn't lag

#### Compatibility
- [ ] All 8 themes tested
- [ ] Mobile + desktop responsive
- [ ] Cross-browser tested (Chrome, Firefox, Edge)
- [ ] Backwards compatible

#### Code Quality
- [ ] All files <500 lines
- [ ] JSDoc comments complete
- [ ] No console errors/warnings
- [ ] Linter passes
- [ ] No hardcoded values

#### Gemini Compliance
- [ ] No side effects on import
- [ ] Shadow DOM CSS injection
- [ ] Theme variables only
- [ ] Observer pattern used
- [ ] Modular architecture

---

### Per-Task Sign-Off

For each of 22 tasks:

**Task #**: ___________

**Completed by**: ___________

**Date**: ___________

**Functionality Tests:**
- [ ] Unit tests written and passing
- [ ] Integration tests passing
- [ ] Manual testing completed
- [ ] Edge cases handled

**Code Review:**
- [ ] File <500 lines
- [ ] JSDoc complete
- [ ] No side effects
- [ ] Follows conventions

**Performance:**
- [ ] No performance regression
- [ ] Benchmarks meet targets
- [ ] No memory leaks

**Sign-off**: ___________

---

### Theme Testing Checklist

For each component × each theme (24 total tests):

| Component | Theme | Visual ✓ | Contrast ✓ | Variables ✓ | Sign-off |
|-----------|-------|----------|-----------|-------------|----------|
| PetStrengthBadge | Light | ⬜ | ⬜ | ⬜ | |
| PetStrengthBadge | Dark | ⬜ | ⬜ | ⬜ | |
| PetStrengthBadge | Blue | ⬜ | ⬜ | ⬜ | |
| PetStrengthBadge | Purple | ⬜ | ⬜ | ⬜ | |
| PetStrengthBadge | Green | ⬜ | ⬜ | ⬜ | |
| PetStrengthBadge | Red | ⬜ | ⬜ | ⬜ | |
| PetStrengthBadge | Orange | ⬜ | ⬜ | ⬜ | |
| PetStrengthBadge | Pink | ⬜ | ⬜ | ⬜ | |
| TeamStrengthDisplay | Light | ⬜ | ⬜ | ⬜ | |
| TeamStrengthDisplay | Dark | ⬜ | ⬜ | ⬜ | |
| TeamStrengthDisplay | Blue | ⬜ | ⬜ | ⬜ | |
| TeamStrengthDisplay | Purple | ⬜ | ⬜ | ⬜ | |
| TeamStrengthDisplay | Green | ⬜ | ⬜ | ⬜ | |
| TeamStrengthDisplay | Red | ⬜ | ⬜ | ⬜ | |
| TeamStrengthDisplay | Orange | ⬜ | ⬜ | ⬜ | |
| TeamStrengthDisplay | Pink | ⬜ | ⬜ | ⬜ | |
| XPProjectionCard | Light | ⬜ | ⬜ | ⬜ | |
| XPProjectionCard | Dark | ⬜ | ⬜ | ⬜ | |
| XPProjectionCard | Blue | ⬜ | ⬜ | ⬜ | |
| XPProjectionCard | Purple | ⬜ | ⬜ | ⬜ | |
| XPProjectionCard | Green | ⬜ | ⬜ | ⬜ | |
| XPProjectionCard | Red | ⬜ | ⬜ | ⬜ | |
| XPProjectionCard | Orange | ⬜ | ⬜ | ⬜ | |
| XPProjectionCard | Pink | ⬜ | ⬜ | ⬜ | |

---

## Pass/Fail Criteria

### Overall Phase 1 Approval

**PASS requires:**
- ✓ All 22 tasks completed
- ✓ All unit tests passing (≥95% coverage)
- ✓ All integration tests passing
- ✓ All 8 themes tested and approved
- ✓ Mobile + desktop responsive tested
- ✓ Performance benchmarks met
- ✓ No memory leaks
- ✓ No regression in existing features
- ✓ All Gemini compliance checks passed
- ✓ Code review approved

**FAIL triggers:**
- ✗ Any critical bug found
- ✗ Performance regression >10%
- ✗ Memory leak detected
- ✗ Breaking change introduced
- ✗ Accessibility failure (WCAG AA)
- ✗ Cross-browser compatibility issue
- ✗ Theme doesn't work correctly
- ✗ Gemini compliance violation

---

### Bug Severity Classification

**Critical (Must Fix):**
- Data loss or corruption
- Application crash/freeze
- Security vulnerability
- Complete feature failure
- Accessibility blocker

**High (Should Fix):**
- Major functionality broken
- Performance degradation >20%
- Visual bugs in multiple themes
- Incorrect calculations
- Memory leak

**Medium (Fix if Time):**
- Minor UI inconsistencies
- Edge case failures
- Performance degradation <20%
- Non-critical accessibility issues

**Low (Document/Defer):**
- Cosmetic issues
- Nice-to-have features
- Minor optimizations
- Documentation gaps

---

## Testing Tools & Setup

### Required Tools

1. **Unit Testing:**
   - Jest or Vitest
   - @testing-library/dom
   - jsdom

2. **E2E Testing:**
   - Puppeteer or Playwright
   - Chrome DevTools Protocol

3. **Performance:**
   - Chrome DevTools
   - Lighthouse
   - Web Vitals extension

4. **Accessibility:**
   - axe DevTools
   - WAVE
   - Contrast checker

5. **Visual Regression:**
   - Percy or Chromatic
   - Storybook (optional)

---

### Test Environment Setup

```bash
# Install dependencies
npm install --save-dev jest @testing-library/dom jsdom
npm install --save-dev puppeteer
npm install --save-dev eslint prettier

# Run tests
npm test                    # Unit tests
npm run test:integration    # Integration tests
npm run test:e2e           # End-to-end tests
npm run test:performance   # Performance tests
npm run test:all           # All tests

# Coverage
npm run test:coverage      # Generate coverage report
```

---

## Testing Schedule

### Week 1: Unit Testing
- Days 1-2: Calculator modules
- Days 3-4: Renderer modules
- Day 5: State & observers

### Week 2: Integration Testing
- Days 1-2: Component integration
- Days 3-4: Full feature integration
- Day 5: Regression testing

### Week 3: Theme & Responsive Testing
- Days 1-2: All 8 themes
- Days 3-4: Mobile + desktop
- Day 5: Edge cases

### Week 4: Performance & Polish
- Days 1-2: Performance testing
- Days 3-4: Bug fixes
- Day 5: Final approval

---

## Conclusion

This testing strategy ensures Phase 1 implementation meets all requirements:

- **Comprehensive coverage**: Every task, every theme, every viewport
- **Quality assurance**: Performance, accessibility, compatibility
- **Gemini compliance**: Follows all architectural rules
- **Regression prevention**: Existing features protected
- **Clear criteria**: Pass/fail defined objectively

**Next Steps:**
1. Review this strategy with team
2. Set up testing infrastructure
3. Begin implementation with TDD
4. Execute tests per schedule
5. Document results
6. Obtain final approval

**Ready for Phase 2 when:**
- All Phase 1 tests pass
- Code review approved
- Documentation complete
- Stakeholder sign-off obtained
