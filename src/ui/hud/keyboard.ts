import { KeyboardShortcutsOptions, KeyboardShortcuts } from "./types";

/**
 * Setup keyboard shortcuts for the HUD
 * Handles toggle combo (default Ctrl+Shift+U) and Escape to close
 */
export function setupKeyboardShortcuts(options: KeyboardShortcutsOptions): KeyboardShortcuts {
  const {
    panel,
    onToggle,
    onClose,
    toggleCombo = (e) => e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "u",
    closeOnEscape = true,
  } = options;

  /**
   * Handle keydown events
   */
  function handleKeyDown(e: KeyboardEvent): void {
    const isHudOpen = panel.classList.contains("open");

    // Close on Escape if enabled and HUD is open
    if (closeOnEscape && e.key === "Escape" && isHudOpen) {
      onClose();
      return;
    }

    // Toggle HUD on custom combo
    if (toggleCombo(e)) {
      e.preventDefault();
      e.stopPropagation();
      onToggle();
    }
  }

  // Register global keyboard listener with capture phase
  document.addEventListener("keydown", handleKeyDown, { capture: true });

  /**
   * Cleanup event listener
   */
  function destroy(): void {
    document.removeEventListener("keydown", handleKeyDown, { capture: true } as any);
  }

  return {
    destroy,
  };
}
