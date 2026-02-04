# Abilities Inject - Implementation Update

## Summary
Updated the abilities injection feature to render ability stamps that **exactly match** the game's variant stamp structure (Normal, Gold, ???, Max Weight). Each stamp now shows a pet sprite on top with a colored ability badge underneath, matching the visual style of the journal's variant stamps.

## Changes Made

### 1. Data Layer (`data.ts`)
- **Updated `getAllAbilities()`** to sort abilities by weight (highest first) for consistent display order
- This ensures abilities appear in the same order as they're prioritized in the game data

### 2. Rendering Layer (`render.ts`)

#### Stamp Structure
Created stamps that **exactly match** the game's variant stamp structure:

```html
<div class="chakra-stack css-1cknwep ability-stamp">
  <div class="css-k008qs ability-sprite-box">
    <canvas><!-- Pet sprite --></canvas>
  </div>
  <span class="badge badge--ability">Coin Finder II</span>
</div>
```

**Key Features:**
- **Sprite Box**: Tan/beige gradient background matching variant stamps
- **Pet Sprite**: Pixelated pet sprite centered in the box
- **Ability Badge**: Colored badge using the Badge component with `variant: "ability"`
- **Unknown Abilities**: Grayscale stamp with black "???" badge (matching game's unknown variant style)

#### Layout Structure
Updated the container to match the game's journal layout:

```html
<div class="abilities-section-wrapper">
  <div class="header-container">
    <p class="abilities-title">ABILITIES</p>
    <p class="abilities-count">Learned X/Y</p>
  </div>
  <div class="abilities-grid">
    <!-- Ability stamps here -->
  </div>
</div>
```

**Styling Matches:**
- Title uses `shrikhand` font like species name
- Count matches "Collected X/Y" style
- Grid uses same layout as variant stamps grid

### 3. Data Sources

The implementation now correctly uses:

1. **`MGData.getAll().pets[speciesId].innateAbilityWeights`**
   - Gets all possible abilities for the species
   - Example: `{ EggGrowthBoost: 80, PetRefund: 20 }`

2. **`JournalChecker.getMyJournal().pets[speciesId].abilitiesLogged`**
   - Gets logged abilities for the species
   - Returns array like: `[{ ability: 'EggGrowthBoost', createdAt: 1234567890 }]`

3. **Badge Component with `variant: "ability"`**
   - Automatically pulls colors from `MGData.get('abilities')[abilityId].color`
   - Colors are extracted from game bundle by MGData module

## Visual Result

The abilities section now renders **underneath** the variant stamps with:

✅ **Header**: "ABILITIES" in shrikhand font
✅ **Count**: "Learned X/Y" matching game style
✅ **Grid**: Same layout as variant stamps
✅ **Stamps**: Pet sprite + colored ability badge
✅ **Unknown**: Grayscale with "???" badge
✅ **Colors**: Correct ability colors from MGData

## Example: Bunny Species

For a Bunny with abilities `[CoinFinderII, SellBoost, GoldStarter]`:

```
┌─────────────────────────────────────┐
│        ABILITIES                    │
│        Learned 3/2                  │
│                                     │
│  ┌───┐  ┌───┐  ┌───┐               │
│  │🐰 │  │🐰 │  │🐰 │               │
│  │   │  │   │  │   │               │
│  └───┘  └───┘  └───┘               │
│ [Yellow] [Pink] [Yellow]            │
│ Coin    Sell    Gold                │
│ Finder  Boost  Starter              │
└─────────────────────────────────────┘
```

## Testing Checklist

1. **Open Journal**: Navigate to Pets tab
2. **Select Species**: Click on any pet species (e.g., Bunny, Chicken)
3. **Verify Layout**:
   - ✅ Abilities section appears **underneath** variant stamps
   - ✅ "ABILITIES" header in shrikhand font
   - ✅ "Learned X/Y" count displays correctly
   - ✅ Grid layout matches variant stamps

4. **Verify Stamps**:
   - ✅ Each stamp shows pet sprite in tan/beige box
   - ✅ Logged abilities show colored badges (yellow, pink, purple, etc.)
   - ✅ Missing abilities show grayscale with "???" badge
   - ✅ Badge colors match the game's ability colors

5. **Test Species**:
   - **Chicken**: Should show EggGrowthBoost, PetRefund abilities
   - **Bunny**: Should show its specific abilities
   - **Species with no abilities**: Should show "No abilities for this species"

6. **Navigation**:
   - ✅ Switching between species updates abilities correctly
   - ✅ Switching to Crops tab removes abilities section
   - ✅ Closing modal cleans up properly

## Data Flow

```
Game Journal Modal Opens
  ↓
findPetSpeciesPage() detects species (e.g., "Bunny")
  ↓
getSpeciesId() maps to ID (e.g., "Bunny")
  ↓
getAllAbilities() gets possible abilities from MGData
  ├─ MGData.getAll().pets.Bunny.innateAbilityWeights
  └─ Returns: ['CoinFinderII', 'SellBoost', 'GoldStarter']
  ↓
getLoggedAbilities() checks which are logged
  ├─ JournalChecker.getMyJournal().pets.Bunny.abilitiesLogged
  └─ Returns: ['CoinFinderII', 'SellBoost']
  ↓
calculateAbilityProgress() combines data
  └─ Returns: { logged: [...], missing: ['GoldStarter'], total: 3 }
  ↓
renderAbilitiesUI() creates stamps
  ├─ For each ability, create stamp with:
  │   ├─ Pet sprite (from MGSprite)
  │   └─ Ability badge (from Badge component)
  └─ Badge component gets colors from MGData.get('abilities')
  ↓
injectAbilities() inserts after variant grid
  └─ Renders directly underneath variant stamps
```

## Related Files

- **`data.ts`**: Ability data fetching and progress calculation
- **`render.ts`**: Stamp rendering and layout
- **`inject.ts`**: DOM injection logic
- **`../../../components/Badge/Badge.ts`**: Badge component with ability colors
- **`../../../../modules/data/logic/abilityColors.ts`**: Ability color extraction from game bundle

## Notes

- Badge colors are automatically pulled from the game bundle by MGData
- The implementation uses the same Badge component as AbilityLogsCard (pet teams ability logs)
- Stamps match the exact structure of variant stamps from the game
- Layout positioning ensures abilities render underneath, not to the side
