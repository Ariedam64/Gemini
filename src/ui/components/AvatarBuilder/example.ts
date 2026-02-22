/**
 * AvatarBuilder Component - Usage Examples
 *
 * This file demonstrates how to use the AvatarBuilder component.
 * NOT imported anywhere - for reference only.
 */

import { createAvatarBuilder } from './AvatarBuilder';
import type { AvatarBuilderHandle } from './AvatarBuilder';

// ============================================================================
// Example 1: Basic Usage
// ============================================================================

export function example1_BasicUsage(container: HTMLElement): AvatarBuilderHandle {
    const builder = createAvatarBuilder({
        onChange: ({ slot, item }) => {
            console.log(`[AvatarBuilder] Changed ${slot} to ${item.displayName}`);
        }
    });

    container.appendChild(builder.root);

    return builder;
}

// ============================================================================
// Example 2: With Initial Outfit
// ============================================================================

export function example2_WithInitialOutfit(container: HTMLElement): AvatarBuilderHandle {
    const builder = createAvatarBuilder({
        initialOutfit: {
            expression: 'Expression_Happy.png',
            top: 'Top_Wizard.png',
            mid: 'Mid_Glasses.png',
            bottom: 'Bottom_Robe.png'
        },
        onChange: ({ slot, item }) => {
            console.log(`Updated ${slot}:`, item);
        }
    });

    container.appendChild(builder.root);

    return builder;
}

// ============================================================================
// Example 3: Custom Sizing
// ============================================================================

export function example3_CustomSizing(container: HTMLElement): AvatarBuilderHandle {
    const builder = createAvatarBuilder({
        width: '600px',
        onChange: ({ slot, item }) => {
            console.log('Cosmetic changed:', slot, item);
        }
    });

    container.appendChild(builder.root);

    return builder;
}

// ============================================================================
// Example 4: Programmatic Control
// ============================================================================

export function example4_ProgrammaticControl(container: HTMLElement): {
    builder: AvatarBuilderHandle;
    controls: HTMLDivElement;
} {
    const builder = createAvatarBuilder({
        onChange: ({ slot, item }) => {
            console.log(`Changed ${slot} to ${item.displayName}`);
        }
    });

    container.appendChild(builder.root);

    // Create control buttons
    const controls = document.createElement('div');
    controls.style.display = 'flex';
    controls.style.gap = '8px';
    controls.style.marginTop = '16px';

    const btnGetOutfit = document.createElement('button');
    btnGetOutfit.textContent = 'Get Current Outfit';
    btnGetOutfit.onclick = () => {
        const outfit = builder.getOutfit();
        console.log('Current outfit:', outfit);
        alert(JSON.stringify(outfit, null, 2));
    };
    controls.appendChild(btnGetOutfit);

    const btnSetDefault = document.createElement('button');
    btnSetDefault.textContent = 'Reset to Default';
    btnSetDefault.onclick = () => {
        builder.setOutfit({
            expression: 'Expression_Default.png',
            top: 'Top_DefaultGray.png',
            mid: 'Mid_DefaultGray.png',
            bottom: 'Bottom_DefaultGray.png'
        });
    };
    controls.appendChild(btnSetDefault);

    const btnSetExpression = document.createElement('button');
    btnSetExpression.textContent = 'Focus Expression';
    btnSetExpression.onclick = () => {
        builder.setCategory('expression');
    };
    controls.appendChild(btnSetExpression);

    container.appendChild(controls);

    return { builder, controls };
}

// ============================================================================
// Example 5: Save to Storage (Real-world)
// ============================================================================

export function example5_WithStorage(container: HTMLElement): AvatarBuilderHandle {
    const STORAGE_KEY = 'gemini:avatar-builder-example';

    // Load saved outfit
    const savedOutfit = localStorage.getItem(STORAGE_KEY);
    const initialOutfit = savedOutfit ? JSON.parse(savedOutfit) : undefined;

    const builder = createAvatarBuilder({
        initialOutfit,
        onChange: ({ slot, item }) => {
            // Save to localStorage on every change
            const outfit = builder.getOutfit();
            localStorage.setItem(STORAGE_KEY, JSON.stringify(outfit));
            console.log(`Saved ${slot} to storage`);
        }
    });

    container.appendChild(builder.root);

    return builder;
}

// ============================================================================
// Example 6: In a Modal Dialog
// ============================================================================

export function example6_InModal(container: HTMLElement): {
    openButton: HTMLButtonElement;
    cleanup: () => void;
} {
    let builder: AvatarBuilderHandle | null = null;
    let modal: HTMLDivElement | null = null;

    const openButton = document.createElement('button');
    openButton.textContent = 'Open Avatar Builder';
    openButton.onclick = () => {
        // Create modal backdrop
        modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        `;

        // Modal content
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: var(--color-bg);
            padding: 24px;
            border-radius: 12px;
            max-width: 600px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
        `;

        // Title
        const title = document.createElement('h2');
        title.textContent = 'Customize Your Avatar';
        title.style.marginBottom = '16px';
        modalContent.appendChild(title);

        // Builder
        builder = createAvatarBuilder({
            onChange: ({ slot, item }) => {
                console.log(`Modal: Changed ${slot} to ${item.displayName}`);
            }
        });
        modalContent.appendChild(builder.root);

        // Close button
        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Close';
        closeBtn.style.marginTop = '16px';
        closeBtn.onclick = closeModal;
        modalContent.appendChild(closeBtn);

        modal.appendChild(modalContent);
        document.body.appendChild(modal);
    };

    const closeModal = () => {
        if (builder) {
            builder.destroy();
            builder = null;
        }
        if (modal) {
            modal.remove();
            modal = null;
        }
    };

    container.appendChild(openButton);

    return {
        openButton,
        cleanup: closeModal
    };
}

// ============================================================================
// Example 7: Multiple Builders (Comparison View)
// ============================================================================

export function example7_MultipleBuilders(container: HTMLElement): {
    builders: AvatarBuilderHandle[];
    cleanup: () => void;
} {
    const wrapper = document.createElement('div');
    wrapper.style.display = 'grid';
    wrapper.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
    wrapper.style.gap = '16px';

    const builders: AvatarBuilderHandle[] = [];

    // Create 2 builders for comparison
    for (let i = 0; i < 2; i++) {
        const builderContainer = document.createElement('div');
        builderContainer.style.border = '1px solid var(--color-border)';
        builderContainer.style.borderRadius = '8px';
        builderContainer.style.padding = '16px';

        const label = document.createElement('h3');
        label.textContent = `Avatar ${i + 1}`;
        label.style.marginBottom = '12px';
        builderContainer.appendChild(label);

        const builder = createAvatarBuilder({
            onChange: ({ slot, item }) => {
                console.log(`Avatar ${i + 1}: ${slot} = ${item.displayName}`);
            }
        });

        builderContainer.appendChild(builder.root);
        wrapper.appendChild(builderContainer);
        builders.push(builder);
    }

    container.appendChild(wrapper);

    return {
        builders,
        cleanup: () => {
            builders.forEach(b => b.destroy());
        }
    };
}

// ============================================================================
// Example 8: With Apply/Cancel Buttons
// ============================================================================

export function example8_WithApplyCancelButtons(container: HTMLElement): {
    builder: AvatarBuilderHandle;
    cleanup: () => void;
} {
    let pendingOutfit = {};
    let confirmedOutfit = {};

    const builder = createAvatarBuilder({
        onChange: ({ slot, item }) => {
            // Store pending changes (not applied yet)
            pendingOutfit = { ...pendingOutfit, [slot]: item.filename };
            console.log('Pending changes:', pendingOutfit);
        }
    });

    container.appendChild(builder.root);

    // Action buttons
    const actions = document.createElement('div');
    actions.style.display = 'flex';
    actions.style.gap = '12px';
    actions.style.marginTop = '16px';

    const applyBtn = document.createElement('button');
    applyBtn.textContent = 'Apply Changes';
    applyBtn.style.cssText = `
        padding: 12px 24px;
        background: var(--color-primary);
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
    `;
    applyBtn.onclick = () => {
        confirmedOutfit = { ...pendingOutfit };
        console.log('Applied outfit:', confirmedOutfit);
        alert('Outfit applied!');

        // Send to server or save to state
        // await saveOutfitToServer(confirmedOutfit);
    };
    actions.appendChild(applyBtn);

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.style.cssText = `
        padding: 12px 24px;
        background: var(--color-bg-tertiary);
        color: var(--color-text);
        border: 1px solid var(--color-border);
        border-radius: 8px;
        cursor: pointer;
    `;
    cancelBtn.onclick = () => {
        // Reset to last confirmed outfit
        builder.setOutfit(confirmedOutfit);
        pendingOutfit = { ...confirmedOutfit };
        console.log('Cancelled changes');
    };
    actions.appendChild(cancelBtn);

    container.appendChild(actions);

    return {
        builder,
        cleanup: () => {
            builder.destroy();
            actions.remove();
        }
    };
}
