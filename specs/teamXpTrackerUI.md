# Team XP Tracker UI Redesign

## Problem Statement

The current inline XP tracker panel that expands under pet teams in the Pets section has critical issues:

### Issue 1: Pet Sprites Not Displaying ✅ FIXED
**Root Causes:**
1. Using wrong MGSprite category (`"pets"` instead of `"pet"`)
2. Not calling `MGSprite.init()` before rendering
3. Not using `MGSprite.has()` to check sprite existence
4. Missing canvas style properties (width, height, objectFit)
5. Not using `boundsMode: 'padded'`

**Solution Applied:** Replicate JournalChecker sprite pattern
- ✅ Changed to `MGSprite.toCanvas("pet", pet.species, ...)`
- ✅ Added `await MGSprite.init()` in PetsSection.build()
- ✅ Added `MGSprite.has()` check before rendering
- ✅ Applied explicit canvas styles: width, height, objectFit, display
- ✅ Added `boundsMode: 'padded'` option
- ✅ Reduced scale from 2 to 1 (matches Journal pattern)

### Issue 2: CSS Not Being Applied
**Root Cause:** Styles injected into wrong location

The XP panel injects CSS into `document.head`:
```typescript
// Current (WRONG):
document.head.appendChild(styleEl);
```

But the panel is inside GEMINI's Shadow DOM. Styles in `document.head` don't penetrate shadow roots!

**Correct Pattern:** (from JournalCheckerSection:58-62)
```typescript
const shadow = container.getRootNode() as ShadowRoot;
injectStyleOnce(shadow, journalCheckerCss, 'journal-checker-styles');
```

### Issue 3: No Visual Structure
The HTML structure exists but without CSS, it renders as unstyled white text.

---

## Technical Solution

### Fix 1: Correct Sprite Category
Change `"pets"` to `"pet"` in TeamXpPanel.ts

### Fix 2: Shadow DOM CSS Injection
Two options:

**Option A: Inject at PetsSection level (Recommended)**
- Inject teamXpPanelCss in PetsSection.build() before any parts are built
- This follows the pattern used by JournalCheckerSection
- Cleaner separation of concerns

**Option B: Pass shadowRoot to TeamXpPanel**
- TeamCard passes shadowRoot to TeamXpPanel constructor
- TeamXpPanel injects its own styles
- More self-contained but adds complexity

---

## Design Requirements

### Layout Structure
```
┌─────────────────────────────────────────────────────────────┐
│ 📊 TEAM XP TRACKER          XP Rate: 3,600 + 1,200 = 4,800 │ <- Header
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ [SPRITE]  Pet Name                                      │ │
│ │  64x64    ───────────────────────────────────────────   │ │
│ │           Strength    │  15/30                          │ │
│ │ [MAX]     Progress    │  ████████░░░░░░  50%            │ │
│ │ [⚡II]    Next STR    │  2.5h (3 feeds)                 │ │
│ │           Max STR     │  12.3h (15 feeds)               │ │
│ │           XP Boost    │  +1,200 XP/hr                   │ │
│ └─────────────────────────────────────────────────────────┘ │
│                          (repeat for each pet)              │
├─────────────────────────────────────────────────────────────┤
│ ⚡ 2 XP Boosters Active: +2,400 bonus XP/hr (Bee, Snail)   │ <- Footer
└─────────────────────────────────────────────────────────────┘
```

### Visual Elements (GEMINI Design Language)
1. **Card Container**: Rounded corners, subtle gradient, border, shadow
2. **Header**: Gradient background with pill-from/pill-to colors
3. **Pet Cards**: Horizontal layout (sprite left, stats right)
4. **Pet Sprite**: 64x64, rounded container with inset shadow
5. **Badges**: Under sprite (MAX, STARVING, XP Boost tier)
6. **Stats Table**: Clean rows with label/value columns
7. **Progress Bar**: Gradient fill with shimmer animation
8. **Footer**: Gold gradient for XP boost summary
9. **Animations**: Slide-in on expand, pulse for starving pets

### Theme Compatibility
All colors MUST use CSS variables:
- `var(--bg)`, `var(--fg)`, `var(--border)`, `var(--shadow)`
- `var(--pill-from)`, `var(--pill-to)` for gradients
- `var(--low)`, `var(--medium)`, `var(--high)`, `var(--complete)` for status
- `var(--muted)`, `var(--accent)` for text

---

## Implementation Checklist

### Phase 1: Fix Critical Issues ✅ COMPLETE
- [x] Change sprite category from `"pets"` to `"pet"` in TeamXpPanel.ts
- [x] Add CSS injection in PetsSection.build() using shadow root
- [x] Import teamXpPanelCss and injectStyleOnce in PetsSection
- [x] Refactor CSS to use direct CSS variables instead of color-mix()

### Phase 2: Verify Styling
- [x] Confirm all CSS class names match between .ts and .css.ts files
- [ ] Test with at least 2 different themes (browser testing required)
- [ ] Verify animations work (slide-in, shimmer, pulse) (browser testing required)

### Phase 3: Polish (Browser Testing Required)
- [ ] Test with different team sizes (1-5 pets)
- [ ] Test edge cases: starving pets, max STR pets, XP Boost pets
- [ ] Verify responsive behavior on narrow viewports

---

## Files to Modify

1. **`src/ui/sections/Pets/section.ts`**
   - Import `injectStyleOnce` from `../../styles/inject`
   - Import `teamXpPanelCss` from `./parts/teamXpPanel.css`
   - Add injection in `build()` method

2. **`src/ui/sections/Pets/parts/TeamXpPanel.ts`**
   - Change `"pets"` to `"pet"` on line ~179
   - Remove document.head style injection (lines 83-89)

---

## Success Criteria

- [ ] Pet sprites display correctly with mutations
- [ ] All CSS styling is visible (colors, shadows, borders)
- [ ] Progress bars show correct colors and shimmer
- [ ] Badges display properly under sprites
- [ ] Animations work (slide-in, hover effects)
- [ ] Works correctly across all 8 themes
- [ ] No console errors related to styles or sprites
