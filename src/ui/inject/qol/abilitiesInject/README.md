# AbilitiesInject - Journal Modal Enhancement

## Overview

Injects missing pet abilities data into the game's native journal modal. Displays ability tracking information that the game collects but doesn't show in the UI.

## Architecture

### Components

- **constants.ts** - Color palette, typography, layout constants matching game's journal aesthetic
- **styles.css.ts** - Shadow DOM CSS for abilities section (brown tones, clipboard style)
- **data.ts** - Ability data fetching and progress calculation (uses Store + MGData)
- **render.ts** - DOM element creation for abilities UI
- **inject.ts** - Core injection logic (modal detection, MutationObserver, lifecycle)
- **index.ts** - Public API (init, destroy, isEnabled)

### Data Flow

```
MGCustomModal.onOpen('journal')
  ↓
startWatching() → MutationObserver
  ↓
findPetSpeciesDetailPage() → isPetTab() → extractSpeciesId()
  ↓
calculateAbilityProgress(speciesId)
  ├─ getLoggedAbilities() → Store.select('myPetJournalAtom')
  └─ getAllAbilities() → MGData.get('pets')
  ↓
renderAbilitiesUI() → Shadow DOM injection
  ↓
Game's Journal Modal (enhanced with abilities)
```

## Visual Design

Matches game's journal aesthetic:

- **Colors**: Brown tones (#4F6981 headers, #8B7355 text, #D4B5A0 dividers)
- **Typography**: Shrikhand font for headers, responsive sizes
- **Layout**: Grid with auto-fit columns, stamps with borders/gradients
- **Stamps**:
  - Logged: Green gradient background, checkmark (✓)
  - Missing: Grayscale, question mark (?)

## Lifecycle

### Initialization

```typescript
AbilitiesInject.init()
  ↓
MGCustomModal.init() (if not ready)
  ↓
startListening()
  ├─ onOpen('journal') → startWatching()
  └─ onClose('journal') → stopWatching()
```

### Watching

```typescript
MutationObserver on .modal-container
  ↓
On mutation:
  ├─ isPetTab() ? continue : removeInjection()
  ├─ findPetSpeciesDetailPage() ?
  │   ├─ extractSpeciesId()
  │   └─ injectAbilities()
  └─ else: removeInjection()
```

### Cleanup

```typescript
AbilitiesInject.destroy()
  ↓
stopListening()
  ↓
stopWatching()
  ├─ observer.disconnect()
  ├─ removeInjection()
  │   └─ container.remove()
  └─ clear state
```

## Usage

### Basic

```typescript
// Initialize on bootstrap
await AbilitiesInject.init();

// Check status
if (AbilitiesInject.isEnabled()) {
  console.log('Abilities injection active');
}

// Cleanup (not typically needed - runs until page unload)
AbilitiesInject.destroy();
```

### Manual Control

```typescript
// Advanced: control listening manually
import { startListening, stopListening } from './inject';

startListening(); // Begin listening for modal events
stopListening();  // Stop listening and cleanup
```

## Configuration

Registered in `src/ui/loader/bootstrap.ts`:

```typescript
registry.register({
  id: 'abilitiesInject',
  name: 'Journal Abilities',
  description: 'Shows pet abilities in journal modal',
  injection: AbilitiesInject,
  storageKey: INJECT_KEYS.ABILITIES_INJECT,
  defaultEnabled: true, // Enabled by default
});
```

Storage key: `inject:abilitiesInject:config`

## Edge Cases Handled

- **No abilities**: Shows "No abilities for this species" message
- **Data not ready**: Waits for MGData before injecting
- **Invalid species ID**: Logs error and skips injection
- **Modal closed**: Observer disconnects, DOM cleaned up
- **Crop tab**: No injection (pets only)
- **Overview page**: No injection (species detail only)
- **Rapid navigation**: Removes old injection before new one

## Performance

- **MutationObserver**: Throttled by browser, observes modal container only
- **Shadow DOM**: Style isolation prevents CSS pollution
- **Data caching**: Uses existing journalChecker cache where possible
- **Cleanup tracking**: All listeners tracked in `eventCleanups[]` array

## Testing Checklist

- [ ] Open journal → Verify no injection on overview
- [ ] Click pet species → Verify abilities section appears
- [ ] Check logged abilities have checkmarks (green)
- [ ] Check missing abilities have question marks (gray)
- [ ] Verify count: "Learned X/Y" is accurate
- [ ] Navigate to Crops tab → Verify injection removed
- [ ] Navigate back to Pets → Verify injection reappears
- [ ] Close modal → Verify DOM cleaned up
- [ ] Repeat 20x → Verify no memory leaks
- [ ] Test with pet having 0 abilities → Verify empty state
- [ ] Test with pet having all abilities → Verify all checkmarks

## Future Enhancements

Phase 2 (after abilities stable):
- Enhanced progress indicators in overview
- Quick filter: show only incomplete species
- Search/sort by name, completion %, rarity
- Export journal progress as JSON

Phase 3 (v5.0+):
- Replace JournalChecker HUD section entirely
- Migrate existing users to injection UI
- Archive old HUD code

## Related Files

- `src/features/journalChecker/logic/progress.ts` - Ability calculation logic (reference)
- `src/modules/customModal/index.ts` - Modal event system
- `src/modules/data/index.ts` - MGData game data access
- `src/atoms/store.ts` - Store atom access
- `src/ui/inject/core/registry.ts` - Injection registration
- `src/utils/storage.ts` - Storage keys (INJECT_KEYS)
