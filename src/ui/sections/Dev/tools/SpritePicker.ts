/**
 * SpritePicker - Dynamic sprite selection for Card Builder
 * Dev-only: Located in src/ui/sections/Dev/ for conditional compilation
 * Uses MGData to get available sprites dynamically (no hardcoding)
 */

import { element } from '../../../styles/helpers';
import { Select } from '../../../components/Select/Select';
import { Button } from '../../../components/Button/Button';
import { MGData } from '../../../../modules';
import { MGSprite } from '../../../../modules';

export interface SpriteSelection {
    category: string;
    assetId: string;
    mutations: string[];
}

export interface SpritePickerOptions {
    onSelect?: (selection: SpriteSelection) => void;
    initialSelection?: SpriteSelection;
}

export interface SpritePickerHandle {
    root: HTMLElement;
    getSelection: () => SpriteSelection | null;
    renderPreview: () => void;
}

// Available sprite categories from MGData
const SPRITE_CATEGORIES = ['plants', 'pets', 'decor'] as const;

export function SpritePicker(opts: SpritePickerOptions = {}): SpritePickerHandle {
    let currentCategory = opts.initialSelection?.category || 'plants';
    let currentAsset = opts.initialSelection?.assetId || '';
    let currentMutations: string[] = opts.initialSelection?.mutations || [];

    const container = element('div', {
        className: 'sprite-picker',
        style: 'display: flex; flex-direction: column; gap: 8px; padding: 8px; background: rgba(0,0,0,0.2); border-radius: 6px;'
    });

    // Category selector
    const categoryRow = element('div', { style: 'display: flex; gap: 8px; align-items: center;' });
    categoryRow.appendChild(element('label', { textContent: 'Category:', style: 'font-size: 11px; opacity: 0.7; min-width: 60px;' }));

    const categorySelect = Select({
        options: SPRITE_CATEGORIES.map(c => ({ value: c, label: c.charAt(0).toUpperCase() + c.slice(1) })),
        value: currentCategory,
        onChange: (v) => {
            currentCategory = v;
            currentAsset = '';
            updateAssetOptions();
            renderPreview();
        }
    });
    categoryRow.appendChild(categorySelect.root);
    container.appendChild(categoryRow);

    // Asset selector
    const assetRow = element('div', { style: 'display: flex; gap: 8px; align-items: center;' });
    assetRow.appendChild(element('label', { textContent: 'Asset:', style: 'font-size: 11px; opacity: 0.7; min-width: 60px;' }));

    let assetSelect = Select({
        options: [{ value: '', label: 'Select...' }],
        value: currentAsset,
        onChange: (v) => {
            currentAsset = v;
            renderPreview();
            notifySelection();
        }
    });
    assetRow.appendChild(assetSelect.root);
    container.appendChild(assetRow);

    // Mutation checkboxes (dynamic based on MGData)
    const mutationRow = element('div', { style: 'display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px;' });
    container.appendChild(mutationRow);

    // Preview area
    const previewArea = element('div', {
        style: 'display: flex; align-items: center; justify-content: center; min-height: 64px; background: rgba(0,0,0,0.2); border-radius: 4px; margin-top: 8px;'
    });
    container.appendChild(previewArea);

    // Confirm button
    const confirmBtn = Button({
        label: 'Use This Sprite',
        size: 'sm',
        variant: 'primary',
        onClick: () => notifySelection()
    });
    container.appendChild(confirmBtn);

    // Update asset dropdown based on category
    const updateAssetOptions = () => {
        const data = MGData.get(currentCategory as any);
        const assets = data ? Object.keys(data) : [];

        // Replace select with new options
        const oldSelect = assetSelect.root;
        assetSelect = Select({
            options: [
                { value: '', label: 'Select...' },
                ...assets.slice(0, 50).map(a => ({ value: a, label: a })) // Limit to 50
            ],
            value: currentAsset,
            onChange: (v) => {
                currentAsset = v;
                renderPreview();
                notifySelection();
            }
        });
        oldSelect.replaceWith(assetSelect.root);
    };

    // Update mutation checkboxes
    const updateMutationOptions = () => {
        mutationRow.innerHTML = '';
        const mutations = MGData.get('mutations');
        if (!mutations) return;

        const mutNames = Object.keys(mutations).slice(0, 10); // Limit to 10
        mutNames.forEach(name => {
            const checkbox = element('label', {
                style: 'display: flex; align-items: center; gap: 4px; font-size: 10px; cursor: pointer;'
            });
            const input = element('input', { type: 'checkbox' }) as HTMLInputElement;
            input.checked = currentMutations.includes(name);
            input.onchange = () => {
                if (input.checked) {
                    if (!currentMutations.includes(name)) currentMutations.push(name);
                } else {
                    currentMutations = currentMutations.filter(m => m !== name);
                }
                renderPreview();
            };
            checkbox.appendChild(input);
            checkbox.appendChild(document.createTextNode(name));
            mutationRow.appendChild(checkbox);
        });
    };

    // Render preview
    const renderPreview = () => {
        previewArea.innerHTML = '';

        if (!currentCategory || !currentAsset) {
            previewArea.appendChild(element('span', { textContent: 'Select a sprite', style: 'opacity: 0.4; font-size: 11px;' }));
            return;
        }

        if (!MGSprite.isReady()) {
            previewArea.appendChild(element('span', { textContent: 'Sprite system not ready', style: 'opacity: 0.4; font-size: 11px;' }));
            return;
        }

        try {
            const canvas = MGSprite.toCanvas(currentCategory, currentAsset, {
                mutations: currentMutations as any,
                scale: 2
            });
            canvas.style.imageRendering = 'pixelated';
            previewArea.appendChild(canvas);
        } catch (e) {
            previewArea.appendChild(element('span', { textContent: 'Failed to render', style: 'color: var(--color-danger); font-size: 11px;' }));
        }
    };

    // Notify parent of selection
    const notifySelection = () => {
        if (currentCategory && currentAsset) {
            opts.onSelect?.({
                category: currentCategory,
                assetId: currentAsset,
                mutations: [...currentMutations]
            });
        }
    };

    // Initialize
    updateAssetOptions();
    updateMutationOptions();
    renderPreview();

    const handle: SpritePickerHandle = {
        root: container,
        getSelection: () => {
            if (!currentCategory || !currentAsset) return null;
            return { category: currentCategory, assetId: currentAsset, mutations: [...currentMutations] };
        },
        renderPreview
    };

    return handle;
}
