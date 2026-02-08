// src/modules/cosmetic/avatar/override.ts
/**
 * Avatar visual override system - Aggressive React-fighting version
 * Uses MutationObserver + 100ms polling to persistently override avatar cosmetics
 */

import type { AvatarOutfit } from "../types";
import { pageWindow } from "../../../../utils/windowContext";
import { getAssetBaseUrl } from "./query";
import { outfitToArray } from "./internal";

// State
let currentOverride: { avatar: string[]; color?: string } | null = null;
let monitorInterval: any = null;
let mutationObserver: MutationObserver | null = null;
let styleElement: HTMLStyleElement | null = null;

function getCosmeticURL(filename: string): string {
    return getAssetBaseUrl() + filename;
}

/**
 * Render override
 */
export async function render(outfit: AvatarOutfit): Promise<boolean> {
    try {
        const { Store } = await import("../../../../atoms/store");
        const myData = await Store.select("myDataAtom") as any;
        const currentAvatar = myData?.cosmetic?.avatar || [];
        const newAvatar = outfitToArray(outfit, currentAvatar);
        const newColor = outfit.color || myData?.cosmetic?.color || "Red";

        currentOverride = { avatar: newAvatar, color: newColor };
        injectStyles();
        startMonitor(newAvatar);

        console.log("[Avatar] Rendered avatar override:", newAvatar);
        return true;
    } catch (err) {
        console.error("[Avatar] Failed to render avatar:", err);
        return false;
    }
}

/**
 * Clear override
 */
export async function clearOverride(): Promise<boolean> {
    currentOverride = null;

    if (monitorInterval) {
        clearInterval(monitorInterval);
        monitorInterval = null;
    }
    if (mutationObserver) {
        mutationObserver.disconnect();
        mutationObserver = null;
    }

    const doc = pageWindow.document;
    doc.querySelectorAll("[data-gemini-avatar-overridden]").forEach(el => {
        el.removeAttribute("data-gemini-avatar-overridden");
    });
    doc.querySelectorAll(".gemini-avatar-overlay").forEach(el => el.remove());
    doc.querySelectorAll("img[data-gemini-override]").forEach(el => {
        el.removeAttribute("data-gemini-override");
    });

    if (styleElement) {
        styleElement.remove();
        styleElement = null;
    }

    console.log("[Avatar] Cleared override");
    return true;
}

/**
 * Inject styles
 */
function injectStyles() {
    if (styleElement) return;
    const doc = pageWindow.document;
    styleElement = doc.createElement("style");
    styleElement.id = "gemini-avatar-override-styles";
    styleElement.textContent = `
        [data-gemini-avatar-overridden="true"] canvas {
            opacity: 0 !important;
            visibility: hidden !important;
        }

        .gemini-avatar-overlay {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            pointer-events: none !important;
            z-index: 9999 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
        }

        .gemini-avatar-overlay img {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            object-fit: contain !important;
        }
    `;
    doc.head.appendChild(styleElement);
}

/**
 * Aggressively monitor and patch avatars
 */
function startMonitor(avatar: string[]) {
    if (monitorInterval) clearInterval(monitorInterval);
    if (mutationObserver) mutationObserver.disconnect();

    const doc = pageWindow.document;

    const process = () => {
        const containers = doc.querySelectorAll(".Avatar");
        let patchCount = 0;

        containers.forEach(container => {
            // Mode 1: IMG-based StaticAvatar
            const images = Array.from(container.querySelectorAll("img"));
            if (images.length === 4) {
                let needsPatch = false;
                images.forEach((img, idx) => {
                    const expected = getCosmeticURL(avatar[idx]);
                    if (img.src !== expected) {
                        needsPatch = true;
                    }
                });

                if (needsPatch) {
                    images.forEach((img, idx) => {
                        img.src = getCosmeticURL(avatar[idx]);
                        img.setAttribute('data-gemini-override', avatar[idx]);
                    });
                    patchCount++;
                }
                return;
            }

            // Mode 2: Canvas-based RiveAvatar
            const canvas = container.querySelector("canvas");
            if (canvas && !container.querySelector(".gemini-avatar-overlay")) {
                container.setAttribute("data-gemini-avatar-overridden", "true");

                const overlay = doc.createElement("div");
                overlay.className = "gemini-avatar-overlay";

                avatar.forEach(filename => {
                    const img = doc.createElement("img");
                    img.src = getCosmeticURL(filename);
                    img.setAttribute('data-gemini-cosmetic', filename);
                    overlay.appendChild(img);
                });

                if (window.getComputedStyle(container).position === "static") {
                    (container as HTMLElement).style.position = "relative";
                }

                container.appendChild(overlay);
                patchCount++;
            }
        });

        if (patchCount > 0) {
            console.log(`[Avatar] Re-applied ${patchCount} override(s) (React reverted)`);
        }
    };

    // Initial pass
    process();

    // Reasonable polling (500ms) - MutationObserver catches instant changes
    monitorInterval = setInterval(process, 500);

    // MutationObserver for instant response to DOM changes
    mutationObserver = new MutationObserver(() => {
        setTimeout(process, 10); // Slight delay to let React finish
    });

    // Scope to game viewport if possible (reduces unnecessary callbacks)
    const targetElement = doc.querySelector('.game-root')
                          || doc.querySelector('#root')
                          || doc.body;

    mutationObserver.observe(targetElement, {
        childList: true,
        subtree: true,
        attributeFilter: ['src'] // Only watch src changes
    });

    console.log('[Avatar] Aggressive monitor started (500ms + MutationObserver)');
}

/**
 * Get current override
 */
export function getOverride() {
    return currentOverride;
}
