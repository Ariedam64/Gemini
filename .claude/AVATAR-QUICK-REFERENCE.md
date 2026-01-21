# Avatar Compliance Fixes - Quick Reference

**Last Updated:** 2026-01-21
**Related Docs:**
- `.claude/AVATAR-COMPLIANCE-FIXES.md` (Full implementation plan)
- `.claude/AVATAR-OWNERSHIP-PLAN.md` (Ownership system - complete)
- `.claude/TESTING-OWNERSHIP.md` (Ownership testing guide)

---

## 🎯 Quick Summary

**8 Fixes** organized in **3 Phases** to bring Avatar system from **B+ (85%)** to **A (96%)**.

| Phase | Time | Risk | Improvement | Grade After |
|-------|------|------|-------------|-------------|
| 1 | 30 min | None | Quick wins | B+ (88%) |
| 2 | 1-2 hrs | Low | Performance | A- (92%) |
| 3 | 4-6 hrs | Medium | Architecture | A (96%) |

---

## ⚡ Phase 1: Quick Wins (30 minutes)

### Fix 1: Reduce Polling (5 min)

**File:** `src/modules/cosmetic/avatar/logic/override.ts:229`

```diff
- monitorInterval = setInterval(process, 100);
+ monitorInterval = setInterval(process, 500);
```

**Test:** Monitor CPU usage (should drop ~80%)

---

### Fix 2: Remove Duplicate Files (15 min)

**Delete:**
```bash
rm src/modules/cosmetic/avatar/query.ts
rm src/modules/cosmetic/avatar/worldOverride.ts
```

**Update:** `src/modules/cosmetic/avatar/index.ts` (Lines 7, 11)
```diff
- import { list, listUrls, get, debug, listAsync } from "./query";
- import { renderWorld, clearWorldOverride, getWorldOverride } from "./worldOverride";
+ import { list, listUrls, get, debug, listAsync } from "./logic/query";
+ import { renderWorld, clearWorldOverride, getWorldOverride } from "./logic/worldOverride";
```

**Test:**
```bash
npm run typecheck
npm run build
```

---

### Fix 3: Add Module Interface (10 min)

**File:** `src/modules/cosmetic/avatar/logic/ownership.ts`

**Add export at end:**
```typescript
export function isLoaded(): boolean {
  return state.loaded;
}
```

**File:** `src/modules/cosmetic/avatar/index.ts`

**Update export:**
```diff
export const Avatar = {
+   // Standard Module Interface
+   init: initOwnership,
+   isReady: () => {
+       const { isLoaded } = require('./logic/ownership');
+       return isLoaded();
+   },
+
    // Query functions
    list,
    listAsync,
    // ... rest unchanged
-   _initOwnership: initOwnership,
};
```

**Test:** Console: `Gemini.Modules.Cosmetic.Avatar.init()` and `.isReady()`

---

## 🚀 Phase 2: Performance (1-2 hours)

### Fix 4: Image Cache (30 min)

**File:** `src/modules/cosmetic/avatar/logic/render.ts`

**Add at top:**
```typescript
const imageCache = new Map<string, Promise<HTMLImageElement>>();
```

**Replace loadImage function:**
```typescript
function loadImage(url: string): Promise<HTMLImageElement> {
    if (imageCache.has(url)) {
        return imageCache.get(url)!;
    }

    const promise = new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = () => {
            imageCache.delete(url);
            reject(new Error(`Failed to load image: ${url}`));
        };
        img.src = url;
    });

    imageCache.set(url, promise);
    return promise;
}

export function clearImageCache(): void {
    imageCache.clear();
}
```

**Update exports in index.ts:**
```diff
+ import { toCanvas, clearImageCache } from "./logic/render";

export const Avatar = {
    // ... existing
    toCanvas,
+   clearImageCache,
};
```

**Test:** Render same avatar twice, check Network tab (0 requests second time)

---

### Fix 5: Parallel Async (15 min)

**File:** `src/ui/sections/Avatar/AvatarSection.ts` (Lines 39-61)

**Replace:**
```typescript
protected async build(container: HTMLElement): Promise<void> {
    // Parallel async operations
    const [_, uiState, current] = await Promise.all([
        initOwnership(),
        initAvatarUIState(),
        get().catch(() => ({
            top: 'Top_DefaultGray.png',
            mid: 'Mid_DefaultGray.png',
            bottom: 'Bottom_DefaultGray.png',
            expression: 'Expression_Default.png',
            color: 'Red',
        }))
    ]);

    this.uiState = uiState;
    this.previewOutfit = {
        top: current.top,
        mid: current.mid,
        bottom: current.bottom,
        expression: current.expression,
    };

    // Fire-and-forget (not blocking)
    preloadDiscovery().catch(e => console.warn("[AvatarSection] Discovery failed:", e));
    MGAvatarLoadouts.init();

    // ... rest unchanged
}
```

**Test:** Measure tab open time (DevTools Performance tab)

---

### Fix 6: Scope Observer (30 min)

**File:** `src/modules/cosmetic/avatar/logic/override.ts` (Line 236)

**Replace:**
```diff
- mutationObserver.observe(doc.body, {
+ const targetElement = doc.querySelector('.game-root')
+                       || doc.querySelector('#root')
+                       || doc.body;
+
+ mutationObserver.observe(targetElement, {
    childList: true,
    subtree: true,
-   attributes: true,
    attributeFilter: ['src']
});
```

**Test:** Monitor mutation callback count (should drop 50-80%)

---

## 🏗️ Phase 3: Architecture (4-6 hours)

### Fix 7: Discovery-First Pattern

**Step 1:** Create `src/modules/cosmetic/avatar/logic/criticalDefaults.ts`

```typescript
import type { CosmeticItem } from './cosmeticTypes';

export const CRITICAL_DEFAULTS: CosmeticItem[] = [
  {
    id: 'Top_DefaultGray.png',
    filename: 'Top_DefaultGray.png',
    type: 'Top',
    availability: 'default',
    displayName: 'Default',
    price: 0,
  },
  {
    id: 'Mid_DefaultGray.png',
    filename: 'Mid_DefaultGray.png',
    type: 'Mid',
    availability: 'default',
    displayName: 'Default',
    price: 0,
  },
  {
    id: 'Bottom_DefaultGray.png',
    filename: 'Bottom_DefaultGray.png',
    type: 'Bottom',
    availability: 'default',
    displayName: 'Default',
    price: 0,
  },
  {
    id: 'Expression_Default.png',
    filename: 'Expression_Default.png',
    type: 'Expression',
    availability: 'default',
    displayName: 'Default',
    price: 0,
  },
  // Blank options
  {
    id: 'Top_Blank.png',
    filename: 'Top_Blank.png',
    type: 'Top',
    availability: 'default',
    displayName: 'None',
    price: 0,
  },
  {
    id: 'Mid_Blank.png',
    filename: 'Mid_Blank.png',
    type: 'Mid',
    availability: 'default',
    displayName: 'None',
    price: 0,
  },
  {
    id: 'Bottom_Blank.png',
    filename: 'Bottom_Blank.png',
    type: 'Bottom',
    availability: 'default',
    displayName: 'None',
    price: 0,
  },
];
```

**Step 2:** Rename `allCosmeticItems.ts` → `allCosmeticItems.legacy.ts`

```bash
git mv src/modules/cosmetic/avatar/logic/allCosmeticItems.ts \
       src/modules/cosmetic/avatar/logic/allCosmeticItems.legacy.ts
```

**Add warning comment at top:**
```typescript
/**
 * LEGACY HARDCODED COSMETICS - FALLBACK ONLY
 *
 * This file is used as a FALLBACK ONLY when discovery fails.
 * Primary source: discoverFromManifest() in query.ts
 * Fallback: CRITICAL_DEFAULTS in criticalDefaults.ts
 * Last resort: This file
 *
 * DO NOT ADD NEW ITEMS HERE - They will be discovered automatically.
 */
```

**Step 3:** Update `src/modules/cosmetic/avatar/logic/query.ts`

**Add imports:**
```typescript
import { allCosmeticItems } from "./allCosmeticItems.legacy";
import { CRITICAL_DEFAULTS } from "./criticalDefaults";
```

**Add auto-init at top:**
```typescript
let discoveryStarted = false;

function ensureDiscoveryStarted() {
    if (discoveryStarted) return;
    discoveryStarted = true;

    discoverFromManifest().then(() => {
        console.log(`[Avatar] Discovery complete: ${discoveredItems.length} items`);
    }).catch((err) => {
        console.warn('[Avatar] Discovery failed, using fallbacks:', err);
    });
}

ensureDiscoveryStarted();
```

**Replace list() function logic:**
```typescript
export function list(options?: ListOptions): CosmeticInfo[] {
    const baseUrl = getAssetBaseUrl();

    // Priority 1: Discovered items (primary source)
    const discoveredWithUrls = discoveredItems.map(i => ({...i, url: i.url || `${baseUrl}${i.filename}`}));

    // Priority 2: Critical defaults (fallback)
    const defaultsWithUrls = CRITICAL_DEFAULTS.map(i => ({...i, url: `${baseUrl}${i.filename}`}));

    // Priority 3: Full list (only if discovery failed)
    const fullListWithUrls = allCosmeticItems.map(i => ({...i, url: `${baseUrl}${i.filename}`}));

    // Deduplicate
    const seen = new Set<string>();
    const items: CosmeticInfo[] = [];

    // Add discovered first
    for (const item of discoveredWithUrls) {
        if (!seen.has(item.filename as string)) {
            items.push(item);
            seen.add(item.filename as string);
        }
    }

    // Add defaults for missing types
    for (const item of defaultsWithUrls) {
        if (!seen.has(item.filename as string)) {
            items.push(item);
            seen.add(item.filename as string);
        }
    }

    // Only use full list if discovery failed (<20 items)
    if (items.length < 20) {
        console.warn('[Avatar] Discovery incomplete, using full hardcoded list');
        for (const item of fullListWithUrls) {
            if (!seen.has(item.filename as string)) {
                items.push(item);
                seen.add(item.filename as string);
            }
        }
    }

    // Add "None" options (dev only)
    const noneOptions: CosmeticInfo[] = [];
    if (isDevBuild()) {
        // ... existing none logic
    }

    const combined = [...noneOptions, ...items];
    let filtered = filterCosmetics(combined, options);
    filtered = applyOwnershipFilter(filtered, options);

    return filtered;
}
```

**Test:**
- Normal case: Verify 200+ items from discovery
- Blocked manifest: Verify falls back to hardcoded
- Check console for discovery logs

---

## 📋 Testing Checklist

### Phase 1
- [ ] `npm run typecheck` passes
- [ ] `npm run build` succeeds
- [ ] No duplicate files: `ls src/modules/cosmetic/avatar/*.ts`
- [ ] `Avatar.init()` callable from console
- [ ] `Avatar.isReady()` returns boolean
- [ ] CPU usage reduced (Task Manager shows <5% idle)

### Phase 2
- [ ] Image cache working (Network tab shows 0 requests on repeat)
- [ ] `clearImageCache()` works
- [ ] Tab opens faster (<150ms via Performance tab)
- [ ] MutationObserver callbacks reduced

### Phase 3
- [ ] Discovery logs show item count
- [ ] Defaults always available
- [ ] Manifest block test (falls back gracefully)
- [ ] All 200+ items accessible

---

## 🛠️ Quick Commands

```bash
# Typecheck
npm run typecheck

# Build production
npm run build

# Build dev (watch mode)
npm run devtools

# Test in console
Gemini.Modules.Cosmetic.Avatar.init()
Gemini.Modules.Cosmetic.Avatar.isReady()
Gemini.Modules.Cosmetic.Avatar.listAsync().then(i => console.log(i.length))

# Check for duplicates
ls src/modules/cosmetic/avatar/*.ts

# Git operations
git status
git add .
git commit -m "fix(avatar): Phase 1 - Quick wins"
git diff HEAD~1

# View file
cat src/modules/cosmetic/avatar/logic/override.ts | grep setInterval
```

---

## 🎯 Expected Outcomes

| After Phase | Grade | CPU | Load Time | Items Source |
|-------------|-------|-----|-----------|--------------|
| Initial | B+ (85%) | High | ~300ms | Hardcoded |
| Phase 1 | B+ (88%) | Low ✅ | ~300ms | Hardcoded |
| Phase 2 | A- (92%) | Low ✅ | ~150ms ✅ | Hardcoded |
| Phase 3 | A (96%) | Low ✅ | ~150ms ✅ | Discovery ✅ |

---

## 🚨 Troubleshooting

### Build fails
```bash
npm run typecheck  # Check for type errors
npm ci             # Reinstall dependencies
rm -rf node_modules dist && npm install
```

### Avatar not loading
```bash
# Check browser console (F12)
# Look for errors in Avatar section
# Verify ownership init succeeded
```

### Performance not improved
```bash
# Open Task Manager / Activity Monitor
# Navigate to Avatar tab
# Monitor CPU usage during override
# Should be <5% idle
```

### Discovery not working
```bash
# Check console for "[Avatar] Discovery complete"
# If missing, check network tab for manifest.json
# Verify base URL detection: `Gemini.Modules.Cosmetic.Avatar.debug()`
```

---

## 📁 Files Reference

### Core Files
- `src/modules/cosmetic/avatar/index.ts` - Public API
- `src/modules/cosmetic/avatar/logic/query.ts` - Main logic
- `src/modules/cosmetic/avatar/logic/ownership.ts` - Ownership system
- `src/modules/cosmetic/avatar/logic/render.ts` - Canvas rendering
- `src/modules/cosmetic/avatar/logic/override.ts` - UI override
- `src/ui/sections/Avatar/AvatarSection.ts` - UI section

### New Files (Phase 3)
- `src/modules/cosmetic/avatar/logic/criticalDefaults.ts` - Minimal defaults

### Renamed Files (Phase 3)
- `src/modules/cosmetic/avatar/logic/allCosmeticItems.ts` → `.legacy.ts`

---

## 📚 Documentation Updates Needed

After all phases complete:

1. **README.md** (Lines 159-161)
   - Add Avatar.init() / isReady() to example
   - Update to reflect discovery-first pattern

2. **CHANGELOG.md**
   - Add entry for compliance fixes
   - Version bump

3. **Update this file**
   - Mark phases as complete
   - Record actual timings
   - Note any deviations from plan

---

**Status:** Ready for implementation. Start with Phase 1 for immediate wins.
