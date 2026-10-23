// src/modules/bugReport/logic/gameModal.ts
// The name of the game window that is open, whatever shape the game keeps it in.
//
// activeModalAtom resolves to the game's activeModalStateAtom (see the alias in
// atoms/core/lookup.ts). Current builds hold `{ modal, openId }` there and
// derive the bare name in a separate atom; older builds held the name itself.
// Read as is, the object would print as "[object Object]" and never pass as a
// name.

/** The open game window's name, from either shape, or null when none is open. */
export function modalNameOf(raw: unknown): string | null {
  if (raw && typeof raw === "object" && "modal" in raw) {
    return typeof raw.modal === "string" ? raw.modal : null;
  }
  return typeof raw === "string" ? raw : null;
}
