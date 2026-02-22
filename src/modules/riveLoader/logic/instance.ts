/**
 * RiveLoader Instance Logic
 *
 * Creates and manages Rive animation instances
 * Uses the same approach as the game
 */

import { Rive } from '@rive-app/canvas';
import type { RiveInstanceHandle, AvatarOutfit } from '../types';
import { loadRiveFile } from './loader';
import { applyOutfit } from './outfit';
import { findAvatarRiveFile } from './discovery';

/**
 * Create options for Rive instance
 */
export interface CreateRiveInstanceOptions {
    /** Canvas element to render to */
    canvas: HTMLCanvasElement;
    /** Avatar outfit to apply */
    outfit: AvatarOutfit;
    /** .riv file URL (if omitted, uses avatar .riv file) */
    riveUrl?: string;
    /** State machine name (default: 'State Machine 1') */
    stateMachine?: string;
    /** Auto-play animation (default: true) */
    autoplay?: boolean;
}

/**
 * Create a Rive instance with outfit
 * Uses the game's approach: RiveFile → Rive → applyOutfit
 */
export async function createRiveInstance(
    options: CreateRiveInstanceOptions
): Promise<RiveInstanceHandle> {
    const {
        canvas,
        outfit,
        riveUrl: providedUrl,
        stateMachine = 'State Machine 1',
        autoplay = true,
    } = options;

    // Determine .riv URL
    let riveUrl = providedUrl;
    if (!riveUrl) {
        const avatarFile = await findAvatarRiveFile();
        if (!avatarFile) {
            throw new Error('[MGRiveLoader] Could not find avatar .riv file');
        }
        riveUrl = avatarFile.url;
    }

    console.log(`[MGRiveLoader] Creating Rive instance from: ${riveUrl}`);

    // Step 1: Load RiveFile and capture ImageAssets (game pattern)
    const cacheEntry = await loadRiveFile(riveUrl);

    // Step 2: Create Rive instance from cached RiveFile
    const rive = new Rive({
        riveFile: cacheEntry.riveFile,
        canvas,
        autoplay,
        stateMachines: stateMachine,
    });

    console.log('[MGRiveLoader] Rive instance created');

    // Step 3: Apply outfit to captured ImageAssets (game pattern: decodeImage + setRenderImage)
    await applyOutfit(cacheEntry, outfit);

    // Step 4: Handle expression via state machine input (game pattern)
    if (outfit.expression && outfit.expression !== 'Expression_Blank.png') {
        // Expression list from game (avatarRiveConstants.ts) - FULL FILENAMES!
        const expressions = [
            'Expression_Default.png',
            'Expression_Alarmed.png',
            'Expression_Annoyed.png',
            'Expression_Bashful.png',
            'Expression_Calm3.png',
            'Expression_Crying.png',
            'Expression_Cute.png',
            'Expression_Derpy.png',
            'Expression_Happy.png',
            'Expression_Mad.png',
            'Expression_Pouty.png',
            'Expression_Shocked.png',
            'Expression_Thinking.png',
            'Expression_Tired.png',
            'Expression_Loopy.png',
            'Expression_SoHappy.png',
            'Expression_Vampire.png',
            'Expression_Stressed.png',
        ];

        const expressionIndex = expressions.indexOf(outfit.expression);

        if (expressionIndex !== -1 && rive.stateMachineInputs('State Machine 1')) {
            const input = rive.stateMachineInputs('State Machine 1').find((i: any) => i.name === 'expression');
            if (input) {
                input.value = expressionIndex;
                console.log(`[MGRiveLoader] Set expression: ${outfit.expression} (index ${expressionIndex})`);

                // IMPORTANT: Advance to apply expression immediately (game pattern)
                (rive as any).drawFrame();
            }
        }
    }

    console.log('[MGRiveLoader] Outfit applied');

    // Create handle
    const handle: RiveInstanceHandle = {
        rive,
        cacheEntry,
        outfit: { ...outfit },
        play() {
            rive.play();
        },
        pause() {
            rive.pause();
        },
        triggerAnimation(name: string): boolean {
            const inputs = rive.stateMachineInputs(stateMachine);
            if (!inputs) return false;
            const input = inputs.find((i: any) => i.name === name);
            if (!input) return false;
            if (typeof input.fire === 'function') {
                input.fire();
            } else {
                input.value = true;
            }
            return true;
        },
        randomAnimation(): boolean {
            const inputs = rive.stateMachineInputs(stateMachine);
            if (!inputs || inputs.length === 0) return false;
            const triggers = inputs.filter((i: any) => typeof i.fire === 'function');
            if (triggers.length === 0) return false;
            const pick = triggers[Math.floor(Math.random() * triggers.length)];
            pick.fire();
            return true;
        },
        destroy() {
            rive.cleanup();
        },
    };

    return handle;
}

/**
 * Update outfit on existing instance
 * Simply reapplies outfit to the ImageAssets (game pattern)
 */
export async function updateInstanceOutfit(
    handle: RiveInstanceHandle,
    outfit: AvatarOutfit
): Promise<void> {
    console.log('[MGRiveLoader] Updating outfit');

    // Apply new outfit to captured ImageAssets (game pattern)
    await applyOutfit(handle.cacheEntry, outfit);

    // Handle expression via state machine input
    if (outfit.expression && outfit.expression !== 'Expression_Blank.png') {
        // Expression list from game - FULL FILENAMES!
        const expressions = [
            'Expression_Default.png',
            'Expression_Alarmed.png',
            'Expression_Annoyed.png',
            'Expression_Bashful.png',
            'Expression_Calm3.png',
            'Expression_Crying.png',
            'Expression_Cute.png',
            'Expression_Derpy.png',
            'Expression_Happy.png',
            'Expression_Mad.png',
            'Expression_Pouty.png',
            'Expression_Shocked.png',
            'Expression_Thinking.png',
            'Expression_Tired.png',
            'Expression_Loopy.png',
            'Expression_SoHappy.png',
            'Expression_Vampire.png',
            'Expression_Stressed.png',
        ];

        const expressionIndex = expressions.indexOf(outfit.expression);

        if (expressionIndex !== -1 && handle.rive.stateMachineInputs('State Machine 1')) {
            const input = handle.rive.stateMachineInputs('State Machine 1').find((i: any) => i.name === 'expression');
            if (input) {
                input.value = expressionIndex;
                console.log(`[MGRiveLoader] Set expression: ${outfit.expression} (index ${expressionIndex})`);

                // IMPORTANT: Advance to apply expression immediately
                (handle.rive as any).drawFrame();
            }
        }
    }

    // Update stored outfit
    handle.outfit = { ...outfit };

    console.log('[MGRiveLoader] Outfit updated');
}
