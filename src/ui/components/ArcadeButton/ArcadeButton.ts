// ui/components/ArcadeButton/ArcadeButton.ts
// 3D arcade-style push button with sprite support

import { element } from "../../styles/helpers";

export type ArcadeButtonVariant = "default" | "plant" | "egg";

export type ArcadeButtonOptions = {
    id?: string;
    variant?: ArcadeButtonVariant;
    sprite?: HTMLCanvasElement | null;
    onClick?: (e: MouseEvent) => void;
    disabled?: boolean;
    playSound?: boolean;
    tooltip?: string;
};

export type ArcadeButtonHandle = HTMLButtonElement & {
    setSprite: (canvas: HTMLCanvasElement | null) => void;
    setVariant: (v: ArcadeButtonVariant) => void;
    setDisabled: (v: boolean) => void;
};

/**
 * Snappy mechanical "click" sound using Web Audio API
 * Short, crisp, satisfying
 */
async function playClickSound(): Promise<void> {
    try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioCtx) return;

        const ctx = new AudioCtx();
        const now = ctx.currentTime;

        // Sharp click transient
        const click = ctx.createOscillator();
        const clickGain = ctx.createGain();
        click.connect(clickGain);
        clickGain.connect(ctx.destination);
        click.type = 'square';
        click.frequency.setValueAtTime(2000, now);
        click.frequency.exponentialRampToValueAtTime(500, now + 0.008);
        clickGain.gain.setValueAtTime(0.2, now);
        clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.015);
        click.start(now);
        click.stop(now + 0.015);

        // Cleanup
        setTimeout(() => ctx.close(), 100);
    } catch {
        // Silently fail if audio not available
    }
}

/**
 * Creates a 3D arcade-style push button with grey base
 * 
 * Features:
 * - 3D appearance with static grey base
 * - Colored top that presses down on click
 * - Sprite support for icons
 * - Theme-compatible colors via CSS variables
 * - Satisfying click sound
 */
export function ArcadeButton(opts: ArcadeButtonOptions = {}): ArcadeButtonHandle {
    const {
        id,
        variant = "default",
        sprite = null,
        onClick,
        disabled = false,
        playSound = true,
        tooltip,
    } = opts;

    // Create button (the base and rim are CSS pseudo-elements ::before and ::after)
    const btn = element("button", { className: "arcade-btn", id }) as HTMLButtonElement;
    btn.type = "button";

    // Apply variant
    if (variant !== "default") {
        btn.classList.add(`arcade-btn--${variant}`);
    }

    // Tooltip
    if (tooltip) btn.title = tooltip;

    // Disabled state
    btn.disabled = disabled;

    // Create the colored top (this is the part that moves on press)
    const top = element("div", { className: "arcade-btn__top" });
    btn.appendChild(top);

    // Content wrapper for sprite (inside the top)
    const content = element("span", { className: "arcade-btn__content" });
    top.appendChild(content);

    // Add sprite if provided
    if (sprite) {
        content.appendChild(sprite);
    }

    // Click handler
    btn.addEventListener("click", async (e) => {
        if (btn.disabled) return;

        // Play sound
        if (playSound) {
            playClickSound();
        }

        // Call user handler
        onClick?.(e);
    });

    // Handle API
    const handle = btn as ArcadeButtonHandle;

    handle.setSprite = (canvas: HTMLCanvasElement | null) => {
        content.innerHTML = "";
        if (canvas) {
            content.appendChild(canvas);
        }
    };

    handle.setVariant = (v: ArcadeButtonVariant) => {
        btn.classList.remove("arcade-btn--default", "arcade-btn--plant", "arcade-btn--egg");
        if (v !== "default") {
            btn.classList.add(`arcade-btn--${v}`);
        }
    };

    handle.setDisabled = (v: boolean) => {
        btn.disabled = v;
    };

    return handle;
}
