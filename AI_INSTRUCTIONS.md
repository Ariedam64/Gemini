# Gemini AI Instructions & Source of Truth

This document serves as the primary instruction set for ALL AI agents (including but not limited to Claude, GPT-4, Cursor, Antigravity, and Codex) interacting with this codebase.

## ⚠️ CRITICAL: Sources of Truth

1.  **Primary Rulebook**: [development_guidelinesbase.md](./development_guidelinesbase.md)
    -   This is the **absolute source of truth**. You MUST read this before proposing or implementing ANY changes.
2.  **Section Details**:
    -   [api/README.md](./src/api/README.md)
    -   [atoms/README.md](./src/atoms/README.md)
    -   [globals/README.md](./src/globals/README.md)
    -   [ui/README.md](./src/ui/README.md)
    -   [websocket/README.md](./src/websocket/README.md)

## 🤖 Instructions for AI Agents

-   **Context Awareness**: Before executing any task, search for and read the relevant section README.
-   **Architecture Adherence**: You MUST follow the philosophy of "Pure Functions", "Shadow DOM Isolation", and "No Hardcoded Data".
-   **Documentation Maintenance**: Every time you modify a core module, you MUST update the `# Changelog` in its corresponding section README AND the global `development_guidelinesbase.md`.
-   **TODO Tracking**: If a feature is incomplete or requires follow-up, add it to the `# TODO` section of the relevant README.
-   **Removability**: Ensure all developer tools/debug logic are conditionally compiled using `import.meta.env.MODE !== 'production'`.

## Project Hierarchy

-   `src/modules/core/`: Engine-level data and environment logic.
-   `src/atoms/`: Jotai bridge and game state signatures.
-   `src/globals/`: Combined reactive variables.
-   `src/ui/`: Components, design tokens, and HUD management.
-   `src/websocket/`: Network transport and middleware.

---
*Last Updated: 2024-12-31*
