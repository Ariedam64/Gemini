/**
 * SpriteDownloader - Download sprites with mutations applied
 * Dev-only: Located in src/ui/sections/Dev/ for conditional compilation
 * Uses MGData/MGSprite for dynamic data (no hardcoding)
 */

import { element } from '../../../styles/helpers';
import { Select } from '../../../components/Select/Select';
import { Button } from '../../../components/Button/Button';
import { Input } from '../../../components/Input/Input';
import { Switch } from '../../../components/Switch/Switch';
import { Card } from '../../../components/Card/Card';
import { MGData, MGSprite } from '../../../../modules';
import type { MutationName } from '../../../../modules/sprite/types';

export interface SpriteDownloaderHandle {
    root: HTMLElement;
    destroy: () => void;
}

/**
 * SpriteDownloader - Two-panel layout matching spritecustomiser reference
 * Left: Controls (category, search, sprite, mutations, options, scale, actions)
 * Right: Preview canvas with metadata
 */
export function SpriteDownloader(): SpriteDownloaderHandle {
    // State
    let currentCategory = '';
    let currentAsset = '';
    const activeMutations = new Set<string>();
    let currentScale = 2;
    let showIcons = true;
    let showOverlays = true;
    let searchQuery = '';

    // Cleanups
    const cleanups: (() => void)[] = [];

    // Main container - two-column layout
    const container = element('div', {
        className: 'sprite-downloader',
        style: `
      display: grid;
      grid-template-columns: minmax(260px, 320px) 1fr;
      gap: 16px;
      height: 100%;
      overflow: hidden;
    `
    });

    // ========== LEFT PANEL (Controls) ==========
    const controlsPanel = element('div', {
        style: `
      display: flex;
      flex-direction: column;
      gap: 12px;
      overflow-y: auto;
      padding: 4px;
    `
    });

    // Helper to create labeled sections
    const createLabel = (text: string): HTMLElement => {
        return element('label', {
            textContent: text,
            style: 'font-size: 11px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;'
        });
    };

    // --- Category Selector ---
    const categorySection = element('div', { style: 'display: flex; flex-direction: column;' });
    categorySection.appendChild(createLabel('Category'));

    // Get categories dynamically
    const categories = MGSprite.getCategories();
    currentCategory = categories[0] || '';

    const categorySelect = Select({
        options: categories.map(c => ({ value: c, label: c })),
        value: currentCategory,
        onChange: (val) => {
            currentCategory = val;
            searchQuery = '';
            searchInput.setValue('');
            updateAssetOptions();
            updatePreview();
        }
    });
    categorySection.appendChild(categorySelect.root);
    controlsPanel.appendChild(categorySection);

    // --- Search Input ---
    const searchSection = element('div', { style: 'display: flex; flex-direction: column;' });
    searchSection.appendChild(createLabel('Search'));

    const searchInput = Input({
        placeholder: 'Type to filter sprites...',
        value: '',
        onChange: (val) => {
            searchQuery = val.toLowerCase();
            updateAssetOptions();
        }
    });
    searchSection.appendChild(searchInput.root);
    controlsPanel.appendChild(searchSection);

    // --- Sprite Selector ---
    const spriteSection = element('div', { style: 'display: flex; flex-direction: column;' });
    spriteSection.appendChild(createLabel('Sprite'));

    let assetSelect = Select({
        options: [{ value: '', label: 'Loading...' }],
        value: '',
        onChange: (val) => {
            currentAsset = val;
            updatePreview();
        }
    });
    spriteSection.appendChild(assetSelect.root);
    controlsPanel.appendChild(spriteSection);

    // --- Mutations ---
    const mutationSection = element('div', { style: 'display: flex; flex-direction: column;' });
    mutationSection.appendChild(createLabel('Mutations'));

    const mutationGrid = element('div', {
        style: 'display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px 10px;'
    });
    mutationSection.appendChild(mutationGrid);
    controlsPanel.appendChild(mutationSection);

    // --- Options ---
    const optionsSection = element('div', { style: 'display: flex; flex-direction: column;' });
    optionsSection.appendChild(createLabel('Options'));

    const optionsGrid = element('div', {
        style: 'display: grid; grid-template-columns: 1fr 1fr; gap: 8px;'
    });

    const iconSwitch = Switch({
        checked: showIcons,
        onChange: (checked) => {
            showIcons = checked;
            updatePreview();
        }
    });
    const iconLabel = element('div', { style: 'display: flex; align-items: center; gap: 8px;' });
    iconLabel.appendChild(iconSwitch.root);
    iconLabel.appendChild(element('span', { textContent: 'Icons', style: 'font-size: 12px;' }));
    optionsGrid.appendChild(iconLabel);

    const overlaySwitch = Switch({
        checked: showOverlays,
        onChange: (checked) => {
            showOverlays = checked;
            updatePreview();
        }
    });
    const overlayLabel = element('div', { style: 'display: flex; align-items: center; gap: 8px;' });
    overlayLabel.appendChild(overlaySwitch.root);
    overlayLabel.appendChild(element('span', { textContent: 'Tall overlays', style: 'font-size: 12px;' }));
    optionsGrid.appendChild(overlayLabel);

    optionsSection.appendChild(optionsGrid);
    controlsPanel.appendChild(optionsSection);

    // --- Scale Slider ---
    const scaleSection = element('div', { style: 'display: flex; flex-direction: column;' });
    scaleSection.appendChild(createLabel('Scale'));

    const scaleRow = element('div', { style: 'display: flex; align-items: center; gap: 10px;' });
    const scaleSlider = element('input', {
        type: 'range',
        min: '0.5',
        max: '4',
        step: '0.5',
        value: String(currentScale),
        style: 'flex: 1;'
    }) as HTMLInputElement;

    const scaleValue = element('span', {
        textContent: `${currentScale}x`,
        style: 'font-size: 12px; min-width: 30px; text-align: right;'
    });

    scaleSlider.oninput = () => {
        currentScale = parseFloat(scaleSlider.value);
        scaleValue.textContent = `${currentScale}x`;
        updatePreview();
    };

    scaleRow.appendChild(scaleSlider);
    scaleRow.appendChild(scaleValue);
    scaleSection.appendChild(scaleRow);
    controlsPanel.appendChild(scaleSection);

    // --- Actions ---
    const actionsSection = element('div', {
        style: 'display: flex; flex-direction: column; gap: 8px; margin-top: 8px;'
    });

    const buttonRow1 = element('div', { style: 'display: flex; gap: 8px;' });

    const downloadBtn = Button({
        label: 'Download PNG',
        variant: 'primary',
        size: 'sm',
        onClick: () => downloadCurrentSprite()
    });
    buttonRow1.appendChild(downloadBtn);

    const clearBtn = Button({
        label: 'Clear',
        variant: 'default',
        size: 'sm',
        onClick: () => {
            activeMutations.clear();
            updateMutationCheckboxes();
            updatePreview();
        }
    });
    buttonRow1.appendChild(clearBtn);

    actionsSection.appendChild(buttonRow1);

    const downloadAllBtn = Button({
        label: 'Download All in Category',
        variant: 'default',
        size: 'sm',
        onClick: () => downloadAllInCategory()
    });
    actionsSection.appendChild(downloadAllBtn);

    controlsPanel.appendChild(actionsSection);

    // --- Status ---
    const statusText = element('p', {
        textContent: 'Ready',
        style: 'font-size: 11px; color: var(--text-muted); margin-top: 8px;'
    });
    controlsPanel.appendChild(statusText);

    // ========== RIGHT PANEL (Preview) ==========
    const previewPanel = element('div', {
        style: `
      display: flex;
      flex-direction: column;
      gap: 12px;
      overflow: hidden;
    `
    });

    const previewCard = Card({ title: 'Preview', padding: 'sm' });

    const previewCanvas = element('div', {
        style: `
      flex: 1;
      min-height: 300px;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      border: 1px solid var(--border);
    `
    });

    const metaText = element('div', {
        style: 'font-size: 11px; color: var(--text-muted); text-align: center; padding: 8px;'
    });

    previewCard.appendChild(previewCanvas);
    previewCard.appendChild(metaText);
    previewPanel.appendChild(previewCard);

    // ========== Assemble Layout ==========
    container.appendChild(controlsPanel);
    container.appendChild(previewPanel);

    // ========== Functions ==========

    /** Update asset dropdown based on category and search */
    function updateAssetOptions(): void {
        let assets = currentCategory ? MGSprite.getCategoryId(currentCategory) : [];

        // Filter by search query
        if (searchQuery) {
            assets = assets.filter(a => a.toLowerCase().includes(searchQuery));
        }

        // Limit to prevent performance issues
        const limitedAssets = assets.slice(0, 100);

        // Update or recreate select
        const oldRoot = assetSelect.root;
        assetSelect = Select({
            options: limitedAssets.length
                ? limitedAssets.map(a => ({ value: a, label: a }))
                : [{ value: '', label: 'No sprites found' }],
            value: limitedAssets.includes(currentAsset) ? currentAsset : (limitedAssets[0] || ''),
            onChange: (val) => {
                currentAsset = val;
                updatePreview();
            }
        });


        oldRoot.replaceWith(assetSelect.root);

        // Update current asset if needed
        if (!limitedAssets.includes(currentAsset)) {
            currentAsset = limitedAssets[0] || '';
        }
    }

    /** Update mutation checkboxes from MGSprite */
    function updateMutationCheckboxes(): void {
        mutationGrid.innerHTML = '';

        // Use MGSprite.getMutationNames() to get all supported mutations
        // This includes all mutations in MUT_META (Gold, Rainbow, Wet, Chilled, Frozen, Thunderstruck, etc.)
        const mutNames = MGSprite.getMutationNames();
        if (!mutNames.length) {
            mutationGrid.appendChild(element('span', {
                textContent: 'No mutation data available',
                style: 'font-size: 11px; color: var(--text-muted); grid-column: 1 / -1;'
            }));
            return;
        }

        mutNames.forEach(name => {
            const label = element('label', {
                style: 'display: flex; align-items: center; gap: 6px; font-size: 12px; cursor: pointer;'
            });

            const checkbox = element('input', { type: 'checkbox' }) as HTMLInputElement;
            checkbox.checked = activeMutations.has(name);
            checkbox.onchange = () => {
                if (checkbox.checked) {
                    activeMutations.add(name);
                } else {
                    activeMutations.delete(name);
                }
                updatePreview();
            };

            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(name));
            mutationGrid.appendChild(label);
        });
    }

    /** Render preview */
    function updatePreview(): void {
        previewCanvas.innerHTML = '';

        if (!currentCategory || !currentAsset) {
            previewCanvas.appendChild(element('span', {
                textContent: 'Select a sprite',
                style: 'color: var(--text-muted); font-size: 12px;'
            }));
            metaText.textContent = '';
            return;
        }

        if (!MGSprite.isReady()) {
            previewCanvas.appendChild(element('span', {
                textContent: 'Sprite system loading...',
                style: 'color: var(--text-muted); font-size: 12px;'
            }));
            metaText.textContent = '';
            return;
        }

        try {
            const mutArray = Array.from(activeMutations) as MutationName[];
            const canvas = MGSprite.toCanvas(currentCategory, currentAsset, {
                mutations: mutArray,
                scale: currentScale,
                boundsMode: 'mutations' // Full overlay rendering (no clipping)
            });

            canvas.style.maxWidth = '100%';
            canvas.style.maxHeight = '100%';
            canvas.style.imageRendering = 'pixelated';
            canvas.style.objectFit = 'contain';

            previewCanvas.appendChild(canvas);

            // Update metadata
            const mutStr = mutArray.length ? ` | ${mutArray.join(', ')}` : '';
            metaText.textContent = `${currentAsset} | ${canvas.width}×${canvas.height}px${mutStr}`;
        } catch (err) {
            previewCanvas.appendChild(element('span', {
                textContent: 'Failed to render sprite',
                style: 'color: var(--color-danger); font-size: 12px;'
            }));
            metaText.textContent = '';
            console.warn('[Gemini] SpriteDownloader: Render error', err);
        }
    }

    /** Download current sprite */
    function downloadCurrentSprite(): void {
        if (!currentCategory || !currentAsset) {
            statusText.textContent = 'No sprite selected';
            return;
        }

        try {
            const mutArray = Array.from(activeMutations) as MutationName[];
            const canvas = MGSprite.toCanvas(currentCategory, currentAsset, {
                mutations: mutArray,
                scale: currentScale,
                boundsMode: 'mutations' // Full overlay rendering (no clipping)
            });

            canvas.toBlob((blob) => {
                if (!blob) {
                    statusText.textContent = 'Failed to create blob';
                    return;
                }

                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                const mutSuffix = mutArray.length ? `_${mutArray.join('-')}` : '';
                link.download = `${currentAsset}${mutSuffix}.png`;
                link.href = url;
                link.click();
                URL.revokeObjectURL(url);

                statusText.textContent = `Downloaded: ${link.download}`;
            }, 'image/png');
        } catch (err) {
            statusText.textContent = 'Download failed';
            console.error('[Gemini] SpriteDownloader: Download error', err);
        }
    }

    /** Download all sprites in current category */
    async function downloadAllInCategory(): Promise<void> {
        if (!currentCategory) {
            statusText.textContent = 'No category selected';
            return;
        }

        const assets = MGSprite.getCategoryId(currentCategory);
        if (!assets.length) {
            statusText.textContent = 'No sprites in category';
            return;
        }

        const mutArray = Array.from(activeMutations) as MutationName[];
        let downloaded = 0;
        const total = assets.length;

        statusText.textContent = `Downloading 0/${total}...`;

        for (const asset of assets) {
            try {
                const canvas = MGSprite.toCanvas(currentCategory, asset, {
                    mutations: mutArray,
                    scale: currentScale,
                    boundsMode: 'mutations' // Full overlay rendering (no clipping)
                });

                await new Promise<void>((resolve) => {
                    canvas.toBlob((blob) => {
                        if (blob) {
                            const url = URL.createObjectURL(blob);
                            const link = document.createElement('a');
                            const mutSuffix = mutArray.length ? `_${mutArray.join('-')}` : '';
                            link.download = `${asset}${mutSuffix}.png`;
                            link.href = url;
                            link.click();
                            URL.revokeObjectURL(url);
                        }
                        resolve();
                    }, 'image/png');
                });

                downloaded++;
                statusText.textContent = `Downloading ${downloaded}/${total}...`;

                // Small delay to prevent browser overwhelm
                await new Promise(r => setTimeout(r, 50));
            } catch (err) {
                console.warn(`[Gemini] SpriteDownloader: Failed to download ${asset}`, err);
            }
        }

        statusText.textContent = `Downloaded ${downloaded}/${total} sprites`;
    }

    /** Cleanup */
    function destroy(): void {
        cleanups.forEach(fn => fn());
        cleanups.length = 0;
    }

    // ========== Initialize ==========
    updateAssetOptions();
    updateMutationCheckboxes();
    updatePreview();

    return {
        root: container,
        destroy
    };
}
