// src/modules/cosmetic/avatar/override.ts
/**
 * Avatar visual override system - Aggressive React-fighting version
 * Uses MutationObserver + 100ms polling to persistently override avatar cosmetics
 */

import type { AvatarOutfit } from "./types";
import { pageWindow } from "../../../utils/windowContext";
import { list } from "./query";

const AVATAR_INDICES = {
    BOTTOM: 0,
    MID: 1,
    TOP: 2,
    EXPRESSION: 3,
} as const;

// State
let currentOverride: { avatar: string[]; color?: string } | null = null;
let monitorInterval: any = null;
let mutationObserver: MutationObserver | null = null;
let styleElement: HTMLStyleElement | null = null;

/**
 * Get the base URL for cosmetic assets
 */
function getAssetBaseUrl(): string {
    try {
        const scripts = Array.from(pageWindow.document.querySelectorAll("script"));
        const versionedScript = scripts.find((s) => s.src.includes("/version/"));
        if (versionedScript) {
            const match = versionedScript.src.match(/(https:\/\/.+?\/version\/[^/]+)/);
            if (match) return `${match[1]}/assets/cosmetic/`;
        }
        return `${pageWindow.location.origin}/assets/cosmetic/`;
    } catch {
        return "https://magicgarden.gg/assets/cosmetic/";
    }
}

/**
 * Get cosmetic URL
 */
function getCosmeticURL(filename: string): string {
    return getAssetBaseUrl() + filename;
}

/**
 * Convert outfit to array
 */
function outfitToArray(outfit: AvatarOutfit, current?: string[]): string[] {
    const base = current || [
        "Bottom_DefaultGray.png",
        "Mid_DefaultGray.png",
        "Top_DefaultGray.png",
        "Expression_Default.png",
    ];
    const result = [...base];
    if (outfit.bottom) result[AVATAR_INDICES.BOTTOM] = outfit.bottom;
    if (outfit.mid) result[AVATAR_INDICES.MID] = outfit.mid;
    if (outfit.top) result[AVATAR_INDICES.TOP] = outfit.top;
    if (outfit.expression) result[AVATAR_INDICES.EXPRESSION] = outfit.expression;
    return result;
}

/**
 * Render override
 */
export async function render(outfit: AvatarOutfit): Promise<boolean> {
    try {
        const { Store } = await import("../../../atoms/store");
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

    // Fast polling (100ms) to catch React re-renders immediately
    monitorInterval = setInterval(process, 100);

    // MutationObserver for instant response to DOM changes
    mutationObserver = new MutationObserver(() => {
        setTimeout(process, 10); // Slight delay to let React finish
    });

    mutationObserver.observe(doc.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['src'] // Watch for src attribute changes
    });

    console.log('[Avatar] Aggressive monitor started (100ms + MutationObserver)');
}

/**
 * Get current override
 */
export function getOverride() {
    return currentOverride;
}
