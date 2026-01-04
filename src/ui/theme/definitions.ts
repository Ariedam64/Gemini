// UI theme definitions for the HUD.

export type ThemeVars = Record<string, string>;

export const THEMES: Record<string, ThemeVars> = {
  light: {
    "--bg": "rgba(255,255,255,0.7)",
    "--fg": "#0f172a",
    "--muted": "rgba(15,23,42,0.06)",
    "--soft": "rgba(15,23,42,0.04)",
    "--accent": "#2563eb",
    "--border": "rgba(15,23,42,0.12)",
    "--shadow": "rgba(2,6,23,.2)",
    "--tab-bg": "#ffffff",
    "--tab-fg": "#0f172a",
    "--pill-from": "#4f46e5",
    "--pill-to": "#06b6d4",
    "--section-title": "#1e40af",
    "--group-title": "#3b82f6",
  },
  dark: {
    "--bg": "rgba(10,12,18,0.6)",
    "--fg": "#e5e7eb",
    "--muted": "rgba(229,231,235,0.08)",
    "--soft": "rgba(229,231,235,0.05)",
    "--accent": "#60a5fa",
    "--border": "rgba(148,163,184,0.2)",
    "--shadow": "rgba(0,0,0,.45)",
    "--tab-bg": "rgba(255,255,255,0.08)",
    "--tab-fg": "#e5e7eb",
    "--pill-from": "#6366f1",
    "--pill-to": "#06b6d4",
    "--section-title": "#93c5fd",
    "--group-title": "#bfdbfe",
  },
  sepia: {
    "--bg": "rgba(247,242,231,0.72)",
    "--fg": "#3b2f2f",
    "--muted": "rgba(59,47,47,0.06)",
    "--soft": "rgba(59,47,47,0.04)",
    "--accent": "#b07d62",
    "--border": "rgba(59,47,47,0.14)",
    "--shadow": "rgba(0,0,0,.18)",
    "--tab-bg": "#fff",
    "--tab-fg": "#3b2f2f",
    "--pill-from": "#b07d62",
    "--pill-to": "#d4a373",
    "--section-title": "#92552a",
    "--group-title": "#c99a6e",
  },
  forest: {
    "--bg": "rgba(14,24,18,0.62)",
    "--fg": "#e7f5e9",
    "--muted": "rgba(231,245,233,0.08)",
    "--soft": "rgba(231,245,233,0.05)",
    "--accent": "#34d399",
    "--border": "rgba(231,245,233,0.16)",
    "--shadow": "rgba(0,0,0,.5)",
    "--tab-bg": "rgba(255,255,255,0.06)",
    "--tab-fg": "#e7f5e9",
    "--pill-from": "#10b981",
    "--pill-to": "#84cc16",
    "--section-title": "#6ee7b7",
    "--group-title": "#a7f3d0",
  },
  violet: {
    "--bg": "rgba(23, 16, 42, 0.68)",
    "--fg": "#f5f3ff",
    "--muted": "rgba(245,243,255,0.08)",
    "--soft": "rgba(245,243,255,0.05)",
    "--accent": "#a855f7",
    "--border": "rgba(216,180,254,0.22)",
    "--shadow": "rgba(12,3,30,.55)",
    "--tab-bg": "rgba(255,255,255,0.08)",
    "--tab-fg": "#ede9fe",
    "--pill-from": "#a855f7",
    "--pill-to": "#f472b6",
    "--section-title": "#d8b4fe",
    "--group-title": "#e9d5ff",
  },
  ocean: {
    "--bg": "rgba(10, 34, 46, 0.66)",
    "--fg": "#e0f7ff",
    "--muted": "rgba(224,247,255,0.07)",
    "--soft": "rgba(224,247,255,0.05)",
    "--accent": "#38bdf8",
    "--border": "rgba(125, 211, 252, 0.22)",
    "--shadow": "rgba(0, 16, 32, .52)",
    "--tab-bg": "rgba(56,189,248,0.14)",
    "--tab-fg": "#e0f7ff",
    "--pill-from": "#0ea5e9",
    "--pill-to": "#14b8a6",
    "--section-title": "#7dd3fc",
    "--group-title": "#cffafe",
  },
  ember: {
    "--bg": "rgba(34,18,10,0.64)",
    "--fg": "#fff7ed",
    "--muted": "rgba(255,247,237,0.08)",
    "--soft": "rgba(255,247,237,0.05)",
    "--accent": "#f97316",
    "--border": "rgba(255, 159, 92, 0.24)",
    "--shadow": "rgba(16,6,2,.52)",
    "--tab-bg": "rgba(255,247,237,0.09)",
    "--tab-fg": "#fff7ed",
    "--pill-from": "#fb923c",
    "--pill-to": "#facc15",
    "--section-title": "#fed7aa",
    "--group-title": "#fecaca",
  },
  magicGarden: {
    // ===== Core Colors (from Magic Garden StatsModal.tsx) =====
    "--bg": "#201D1D",                      // MagicBlack - main dark background
    "--fg": "#F5F5F5",                      // MagicWhite - primary white text
    "--muted": "rgba(255,255,255,0.6)",     // Light grey subtext/descriptions
    "--soft": "rgba(0,0,0,0.3)",            // Card/section backgrounds (darker overlay)
    "--accent": "#FFF27D",                  // Yellow.Light - highlights & accent

    // ===== Borders & Shadows =====
    "--border": "rgba(255,255,255,0.1)",    // Thin dividing lines between sections
    "--border-accent": "#4A3B2E",           // Brown.Dark - modal accent border
    "--shadow": "rgba(0,0,0,0.5)",          // Drop shadows for cards
    "--card-shadow": "0 4px 10px rgba(0, 0, 0, 0.5)",

    // ===== Header/Tabs =====
    "--tab-bg": "#10725A",                  // Cyan.Dark - greenish header background
    "--tab-fg": "#F5F5F5",                  // White text on greenish header

    // ===== Content Hierarchy (Game-Accurate) =====
    "--section-title": "#10725A",           // Cyan.Dark - section title headers (FIXED: green not yellow)
    "--group-title": "#5EB292",             // Cyan.Light - group headings (e.g., "Plants", "Pets")
    "--item-label": "#F5F5F5",              // MagicWhite - stat item labels
    "--item-desc": "rgba(255,255,255,0.6)", // Subtext/descriptions
    "--item-value": "#FFF27D",              // Yellow.Light - stat values (aligned right)

    // ===== Card Styling =====
    "--card-bg": "rgba(0,0,0,0.3)",         // Content card dark overlay
    "--card-radius": "12px",                // Standard card border radius
    "--card-border": "#4A3B2E",             // Brown.Dark border

    // ===== Pills/Badges =====
    "--pill-from": "#FFF27D",               // Yellow.Light gradient start
    "--pill-to": "#5EB292",                 // Cyan.Light gradient end

    // ===== Scrollbar (matching AutoFavorite) =====
    "--scrollbar-thumb": "rgba(255,255,255,0.2)",
    "--scrollbar-thumb-hover": "rgba(255,255,255,0.3)",
  },
};
