// src/modules/cosmetic/avatar/render.ts
/**
 * Avatar canvas rendering functions (toCanvas)
 * Follows MGSprite pattern - uses Canvas, not DOM
 */

import type { AvatarOutfit, ToCanvasOptions } from "../types";
import { list } from "./query";

// Image cache for repeated renders
const imageCache = new Map<string, Promise<HTMLImageElement>>();

/**
 * Load an image and return a promise (with caching)
 */
function loadImage(url: string): Promise<HTMLImageElement> {
    // Check cache first
    if (imageCache.has(url)) {
        return imageCache.get(url)!;
    }

    // Create promise and cache it immediately
    const promise = new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = () => {
            // Remove from cache on error so retry is possible
            imageCache.delete(url);
            reject(new Error(`Failed to load image: ${url}`));
        };
        img.src = url;
    });

    imageCache.set(url, promise);
    return promise;
}

/**
 * Clear image cache (useful for testing or memory management)
 */
export function clearImageCache(): void {
    imageCache.clear();
}

/**
 * Get cosmetic URL for a filename
 */
function getCosmeticURL(filename: string): string {
    const items = list();
    const item = items.find((i) => i.filename === filename);
    return item?.url || "";
}

/**
 * Render avatar to canvas element
 * Layers cosmetic images: color (background), bottom, mid, top, expression
 *
 * @example
 * const canvas = await toCanvas({
 *   top: 'Top_AviatorHat.png',
 *   mid: 'Mid_Cat.png',
 *   bottom: 'Bottom_Tuxedo.png',
 *   expression: 'Expression_Happy.png',
 *   color: 'Red'
 * });
 */
export async function toCanvas(
    outfit: AvatarOutfit,
    options: ToCanvasOptions = {}
): Promise<HTMLCanvasElement> {
    const canvas = document.createElement("canvas");
    const width = options.width || 400;
    const height = options.height || 400;
    const scale = options.scale || 1;

    canvas.width = width * scale;
    canvas.height = height * scale;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
        throw new Error("Failed to get canvas 2D context");
    }

    // Set image smoothing based on scale
    ctx.imageSmoothingEnabled = scale !== 1;

    // Draw background color (if specified)
    if (outfit.color) {
        // Map color names to actual colors
        const colorMap: Record<string, string> = {
            Red: "#FF0000",
            Blue: "#0000FF",
            Green: "#00FF00",
            Yellow: "#FFFF00",
            Purple: "#800080",
            Orange: "#FFA500",
            Pink: "#FFC0CB",
            Brown: "#A52A2A",
        };
        ctx.fillStyle = colorMap[outfit.color] || "#FF0000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Layer order: bottom, mid, top, expression (NOT color - that's background only!)
    const layers: string[] = [outfit.bottom, outfit.mid, outfit.top, outfit.expression].filter(
        (f): f is string => !!f
    );

    // Load all images in parallel
    const urls = layers.map((filename) => getCosmeticURL(filename));
    const images = await Promise.all(urls.map((url) => loadImage(url)));

    // Draw each layer
    images.forEach((img) => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    });

    return canvas;
}
