import { element } from '../../styles/helpers';
import { Button } from '../../components/Button/Button';
import { Card } from '../../components/Card/Card';
import { Switch } from '../../components/Switch/Switch';
import { Input } from '../../components/Input/Input';
import { Range as UIRange } from '../../components/Range/Range';
import { Badge } from '../../components/Badge/Badge';
import { Select } from '../../components/Select/Select';
import { MGSprite } from '../../../modules/sprite';
import { MGEnvironment } from '../../../modules/core/environment';
import { ComponentPalette, createComponent, ComponentItem } from './ComponentPalette';
import { PositioningCanvas } from './PositioningCanvas';


export function UIGallery(): HTMLElement {
    const mount = (parent: HTMLElement, child: any) => {
        if (!child) return;
        if (child instanceof Node) parent.appendChild(child);
        else if (child.root instanceof Node) parent.appendChild(child.root);
        else console.warn('[Gemini] UI Gallery: Cannot mount child', child);
    };

    const container = element('div', {
        className: 'ui-gallery',
        style: 'height: 100%; display: flex; flex-direction: column; gap: 24px; padding: 12px; overflow-y: auto;'
    });

    const createSection = (title: string, description: string) => {
        const wrap = element('div', { style: 'display: flex; flex-direction: column; gap: 12px; flex-shrink: 0;' });
        const header = element('div', { style: 'border-left: 3px solid var(--color-primary); padding-left: 10px;' });
        header.appendChild(element('strong', { style: 'display: block; font-size: 15px; color: #fff;', textContent: title }));
        header.appendChild(element('small', { style: 'opacity: 0.6; font-size: 12px;', textContent: description }));
        wrap.appendChild(header);
        return wrap;
    };

    // --- Device / Layout Simulation ---
    const layoutSection = createSection('Layout & Device Simulation', 'Test Geminis responsiveness and mobile views');
    const layoutGrid = element('div', { style: 'display: grid; grid-template-columns: 1fr 1fr; gap: 10px;' });

    const isMobileInitial = MGEnvironment.isMobile();

    const mobileBtn = Button({
        label: 'Switch to Mobile (360px)',
        variant: isMobileInitial ? 'primary' : 'default',
        onClick: () => {
            MGEnvironment.setPlatformOverride('mobile');
            const host = document.querySelector('#gemini-hud-root') as HTMLElement;
            if (host) {
                host.style.setProperty('--w', '360px');
                host.dispatchEvent(new CustomEvent('gemini:layout-resize', { detail: { width: 360 } }));
            }
            mobileBtn.setVariant('primary');
            desktopBtn.setVariant('default');
        }
    });

    const desktopBtn = Button({
        label: 'Reset to Desktop',
        variant: !isMobileInitial ? 'primary' : 'default',
        onClick: () => {
            MGEnvironment.setPlatformOverride(null);
            const host = document.querySelector('#gemini-hud-root') as HTMLElement;
            if (host) {
                host.style.removeProperty('--w');
                host.dispatchEvent(new CustomEvent('gemini:layout-resize', { detail: { width: null } }));
            }
            mobileBtn.setVariant('default');
            desktopBtn.setVariant('primary');
        }
    });

    mount(layoutGrid, mobileBtn);
    mount(layoutGrid, desktopBtn);
    layoutSection.appendChild(layoutGrid);
    container.appendChild(layoutSection);

    // --- Sprite Tools (API Unchanged) ---
    // ... (Keeping existing sprite explorer code as it works)
    const spriteSection = createSection('Sprite Explorer', 'Live rendering of game assets and mutations');
    const spriteCard = Card({ title: 'MGSprite Live Preview', padding: 'sm' });
    const spriteContent = element('div', { style: 'display: flex; flex-direction: column; gap: 12px;' });
    const previewArea = element('div', {
        style: 'height: 140px; background: rgba(0,0,0,0.3); border-radius: 8px; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.1); position: relative; overflow: hidden;'
    });
    let currentCat = 'plants';
    let currentAsset = 'Carrot';
    const activeMutations = new Set<string>();
    const updatePreview = () => {
        previewArea.innerHTML = '';
        try {
            const canvas = MGSprite.toCanvas(currentCat, currentAsset, {
                mutations: Array.from(activeMutations) as any,
                scale: 1.5
            });
            canvas.style.maxHeight = '90%';
            canvas.style.imageRendering = 'pixelated';
            previewArea.appendChild(canvas);
        } catch (e) { previewArea.innerHTML = '<small style="color:var(--color-danger)">Sprite Not Found</small>'; }
    };
    const catSelect = Select({
        options: MGSprite.getCategories().map(c => ({ value: c, label: c })),
        value: currentCat,
        onChange: (val) => {
            currentCat = val;
            const assets = MGSprite.getCategoryId(val);
            assetSelect.setOptions(assets.map(a => ({ value: a, label: a })));
            if (assets.length) { currentAsset = assets[0]; assetSelect.setValue(assets[0]); }
            updatePreview();
        }
    });
    const assetSelect = Select({
        options: MGSprite.getCategoryId(currentCat).map(a => ({ value: a, label: a })),
        value: currentAsset,
        onChange: (val) => { currentAsset = val; updatePreview(); }
    });
    const mutationGrid = element('div', { style: 'display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 4px;' });
    ['Gold', 'Rainbow', 'Wet', 'Chilled', 'Frozen', 'Dawnlit'].forEach(mut => {
        const row = element('div', { style: 'display: flex; align-items: center; gap: 8px;' });
        mount(row, Switch({
            checked: activeMutations.has(mut),
            onChange: (checked) => {
                if (checked) activeMutations.add(mut);
                else activeMutations.delete(mut);
                updatePreview();
            }
        }));
        row.appendChild(element('span', { textContent: mut, style: 'font-size: 12px;' }));
        mutationGrid.appendChild(row);
    });
    mount(spriteContent, catSelect);
    mount(spriteContent, assetSelect);
    spriteContent.appendChild(element('small', { textContent: 'MUTATIONS', style: 'opacity: 0.5; font-size: 10px; font-weight: bold; margin-top: 4px;' }));
    spriteContent.appendChild(mutationGrid);
    spriteCard.appendChild(previewArea);
    spriteCard.appendChild(spriteContent);
    spriteSection.appendChild(spriteCard);
    container.appendChild(spriteSection);

    // --- Card Builder with Free-Form Positioning ---
    const builderSection = createSection('Interactive Card Builder', 'Drag components from below - free-form positioning with snap-to-grid!');
    builderSection.className = 'card-builder';

    // Create the positioning canvas
    const positioningCanvas = PositioningCanvas({
        width: 380,
        height: 280,
        gridSize: 8,
        showGrid: true,
        onItemMove: (id, pos) => console.log('[CardBuilder] Item moved:', id, pos),
        onItemResize: (id, size) => console.log('[CardBuilder] Item resized:', id, size),
        onItemRemove: (id) => console.log('[CardBuilder] Item removed:', id)
    });

    // Handle drops from ComponentPalette
    const canvasEl = positioningCanvas.root.querySelector('.positioning-canvas') as HTMLElement;
    if (canvasEl) {
        canvasEl.addEventListener('canvas-drop', (e: Event) => {
            const customEvent = e as CustomEvent;
            const { x, y, dataTransfer } = customEvent.detail;

            try {
                const data = dataTransfer?.getData('application/json');
                if (data) {
                    const item: ComponentItem = JSON.parse(data);
                    const uniqueId = `${item.id}-${Date.now()}`;

                    // Create the component element
                    const content = createComponent(item);
                    if (content) {
                        const canvasItem = positioningCanvas.addItem(uniqueId, item.type, item.label, content);
                        // Position at drop location
                        canvasItem.position = { x, y };
                        (canvasItem.element as HTMLElement).style.left = `${x}px`;
                        (canvasItem.element as HTMLElement).style.top = `${y}px`;
                    }
                }
            } catch (err) {
                console.warn('[Gemini] CardBuilder: Invalid drop data', err);
            }
        });
    }

    builderSection.appendChild(positioningCanvas.root);
    container.appendChild(builderSection);

    // --- Component Palette (Drag Source) ---
    const paletteSection = createSection('Component Palette', 'Drag components into the Card Builder above');

    // Helper to add component (handles Sprite specially)
    const addComponentToCanvas = (item: ComponentItem) => {
        const uniqueId = `${item.id}-${Date.now()}`;

        // For Sprite type, pass empty placeholder - PositioningCanvas handles dropdown UI
        if (item.type === 'Sprite') {
            const placeholder = element('div', { style: 'width: 100%; height: 100%;' });
            // PositioningCanvas will detect Sprite type and add dropdown controls
            positioningCanvas.addItem(uniqueId, 'Sprite', 'Sprite', placeholder, { width: 160, height: 120 });
        } else {
            const content = createComponent(item);
            if (content) {
                positioningCanvas.addItem(uniqueId, item.type, item.label, content);
            }
        }
        builderSection.scrollIntoView({ behavior: 'smooth' });
    };

    const palette = ComponentPalette({
        onItemClick: addComponentToCanvas
    });
    paletteSection.appendChild(palette);
    container.appendChild(paletteSection);

    container.appendChild(element('div', { style: 'height: 60px; flex-shrink: 0;' }));

    updatePreview();
    return container;
}

