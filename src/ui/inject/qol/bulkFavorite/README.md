# Bulk Favorite - QOL Injection

Game UI injection feature for bulk favoriting inventory items.

## Hardcoded Colors (Intentional)

This feature injects UI into the **game's interface**, not Gemini's HUD. The hardcoded colors in `styles.css.ts` are intentional to match the game's aesthetic:

- Line 133: `#ff4d4d` - Error state (matches game error color)
- Lines 137, 143, 167: `#ffffff` - Button text (high contrast on game buttons)

**Rationale:** Injection code should blend with the game UI, not follow Gemini's theme system.

Per `.claude/rules/ui/inject.md`:
> Injection features modify existing game UI through DOM patching/injection
