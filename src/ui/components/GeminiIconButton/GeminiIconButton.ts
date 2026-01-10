// ui/components/GeminiIconButton/GeminiIconButton.ts
// Floating icon button with sprite support - Gemini design system

import { element } from "../../styles/helpers";

export type GeminiIconButtonVariant = "default" | "plant" | "egg";
export type GeminiIconButtonSize = "sm" | "md" | "lg";

export type GeminiIconButtonOptions = {
    id?: string;
    variant?: GeminiIconButtonVariant;
    size?: GeminiIconButtonSize;
    round?: boolean;
    sprite?: HTMLCanvasElement | null;
    onClick?: (e: MouseEvent) => void;
    disabled?: boolean;
    playSound?: boolean;
    tooltip?: string;
};

export type GeminiIconButtonHandle = HTMLButtonElement & {
    setSprite: (canvas: HTMLCanvasElement | null) => void;
    setVariant: (v: GeminiIconButtonVariant) => void;
    setDisabled: (v: boolean) => void;
};

/**
 * Soft, pleasant click sound using Web Audio API
 * Gentler than the arcade button's mechanical click
 */
async function playClickSound(): Promise<void> {
    try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtx) return;

        const ctx = new AudioCtx();
        const now = ctx.currentTime;

        // Soft pop/click
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.03);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        osc.start(now);
        osc.stop(now + 0.05);

        // Cleanup
        setTimeout(() => ctx.close(), 100);
    } catch {
        // Silently fail if audio not available
    }
}

/**
 * Creates a floating icon button following Gemini's design system
 * 
 * Features:
 * - Glassmorphism background with theme compatibility
 * - Subtle depth via soft shadows
 * - Smooth hover/press animations
 * - Sprite support for icons
 * - Optional pleasant click sound
 */
export function GeminiIconButton(opts: GeminiIconButtonOptions = {}): GeminiIconButtonHandle {
    const {
        id,
        variant = "default",
        size = "md",
        round = false,
        sprite = null,
        onClick,
        disabled = false,
        playSound = true,
        tooltip,
    } = opts;

    // Create button
    const btn = element("button", { className: "gemini-icon-btn", id }) as HTMLButtonElement;
    btn.type = "button";

    // Apply variant
    if (variant !== "default") {
        btn.classList.add(`gemini-icon-btn--${variant}`);
    }

    // Apply size
    if (size !== "md") {
        btn.classList.add(`gemini-icon-btn--${size}`);
    }

    // Apply round
    if (round) {
        btn.classList.add("gemini-icon-btn--round");
    }

    // Tooltip
    if (tooltip) btn.title = tooltip;

    // Disabled state
    btn.disabled = disabled;

    // Content wrapper for sprite
    const content = element("span", { className: "gemini-icon-btn__content" });
    btn.appendChild(content);

    // Add sprite if provided
    if (sprite) {
        content.appendChild(sprite);
    }

    // Swap indicator in bottom-right corner (signals interactivity)
    const swapIndicator = element("span", { className: "gemini-icon-btn__swap" });
    swapIndicator.textContent = "⇄";
    btn.appendChild(swapIndicator);

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
    const handle = btn as GeminiIconButtonHandle;

    handle.setSprite = (canvas: HTMLCanvasElement | null) => {
        content.innerHTML = "";
        if (canvas) {
            content.appendChild(canvas);
        }
    };

    handle.setVariant = (v: GeminiIconButtonVariant) => {
        btn.classList.remove("gemini-icon-btn--default", "gemini-icon-btn--plant", "gemini-icon-btn--egg");
        if (v !== "default") {
            btn.classList.add(`gemini-icon-btn--${v}`);
        }
    };

    handle.setDisabled = (v: boolean) => {
        btn.disabled = v;
    };

    return handle;
}
