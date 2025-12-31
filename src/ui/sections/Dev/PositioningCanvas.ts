/**
 * PositioningCanvas - Free-form component positioning for Card Builder
 * Dev-only: Located in src/ui/sections/Dev/ for conditional compilation
 */

import { element } from '../../styles/helpers';
import { Button } from '../../components/Button/Button';
import { MGSprite } from '../../../modules/sprite';

// --- Types ---
export interface CanvasItem {
    id: string;
    type: string;
    label: string;
    element: HTMLElement;
    position: { x: number; y: number };
    size: { width: number; height: number };
    zIndex: number;
}

export interface PositioningCanvasOptions {
    width?: number;
    height?: number;
    gridSize?: number;  // Snap-to-grid size (0 = disabled)
    showGrid?: boolean;
    onItemMove?: (id: string, position: { x: number; y: number }) => void;
    onItemResize?: (id: string, size: { width: number; height: number }) => void;
    onItemRemove?: (id: string) => void;
}

export interface PositioningCanvasHandle {
    root: HTMLElement;
    addItem: (id: string, type: string, label: string, content: HTMLElement, initialSize?: { width: number; height: number }) => CanvasItem;
    removeItem: (id: string) => void;
    getItems: () => CanvasItem[];
    clear: () => void;
    setGridSize: (size: number) => void;
    destroy: () => void;
}

// --- Component ---
export function PositioningCanvas(opts: PositioningCanvasOptions = {}): PositioningCanvasHandle {
    const {
        width = 400,
        height = 300,
        gridSize: initialGridSize = 8,
        showGrid = true,
    } = opts;

    let gridSize = initialGridSize;
    const items = new Map<string, CanvasItem>();
    let nextZIndex = 1;

    // Main container
    const container = element('div', {
        className: 'positioning-canvas-container',
        style: 'display: flex; flex-direction: column; gap: 8px;'
    });

    // Controls bar
    const controls = element('div', {
        style: 'display: flex; gap: 8px; align-items: center; font-size: 11px;'
    });

    let previewMode = false;

    const gridLabel = element('span', { textContent: `Grid: ${gridSize}px`, style: 'opacity: 0.6;' });
    const gridToggle = Button({
        label: showGrid ? 'Grid On' : 'Grid Off',
        size: 'sm',
        variant: 'default',
        onClick: () => {
            canvas.style.backgroundImage = canvas.style.backgroundImage ? '' : generateGridPattern();
            gridToggle.textContent = canvas.style.backgroundImage ? 'Grid On' : 'Grid Off';
        }
    });

    const previewToggle = Button({
        label: 'Preview',
        size: 'sm',
        variant: 'default',
        onClick: () => {
            previewMode = !previewMode;
            previewToggle.textContent = previewMode ? 'Edit Mode' : 'Preview';
            previewToggle.style.background = previewMode ? 'var(--color-primary)' : '';
            previewToggle.style.color = previewMode ? '#000' : '';

            // Toggle visibility of edit indicators on all items
            items.forEach(item => {
                const wrapper = item.element;
                const header = wrapper.querySelector('div:first-child') as HTMLElement;
                const resizeHandle = wrapper.querySelector('[style*="se-resize"]') as HTMLElement;
                // Find sprite controls row (contains select elements)
                const controlsRow = wrapper.querySelector('div:has(select)') as HTMLElement;

                if (header) header.style.display = previewMode ? 'none' : 'flex';
                if (resizeHandle) resizeHandle.style.display = previewMode ? 'none' : 'block';
                if (controlsRow) controlsRow.style.display = previewMode ? 'none' : 'flex';

                // Disable pointer events in preview mode
                wrapper.style.pointerEvents = previewMode ? 'none' : 'auto';
                wrapper.style.border = previewMode ? 'none' : '1px solid rgba(255,255,255,0.15)';
                wrapper.style.background = previewMode ? 'transparent' : 'rgba(255,255,255,0.08)';
            });

            // Also toggle canvas border
            canvas.style.border = previewMode ? 'none' : '2px dashed rgba(255,255,255,0.15)';
        }
    });

    const clearAllBtn = Button({
        label: 'Clear All',
        size: 'sm',
        variant: 'danger',
        onClick: () => handle.clear()
    });

    controls.appendChild(gridLabel);
    controls.appendChild(gridToggle);
    controls.appendChild(previewToggle);
    controls.appendChild(clearAllBtn);
    container.appendChild(controls);

    // Generate grid background pattern
    const generateGridPattern = () => {
        if (gridSize <= 0) return '';
        return `repeating-linear-gradient(
            0deg,
            transparent,
            transparent ${gridSize - 1}px,
            rgba(255,255,255,0.05) ${gridSize - 1}px,
            rgba(255,255,255,0.05) ${gridSize}px
        ),
        repeating-linear-gradient(
            90deg,
            transparent,
            transparent ${gridSize - 1}px,
            rgba(255,255,255,0.05) ${gridSize - 1}px,
            rgba(255,255,255,0.05) ${gridSize}px
        )`;
    };

    // Canvas area (drop zone + positioning surface)
    const canvas = element('div', {
        className: 'positioning-canvas',
        style: `
            position: relative;
            width: ${width}px;
            height: ${height}px;
            min-height: ${height}px;
            background: rgba(0,0,0,0.3);
            border: 2px dashed rgba(255,255,255,0.15);
            border-radius: 8px;
            overflow: hidden;
            ${showGrid ? `background-image: ${generateGridPattern()};` : ''}
        `
    });

    // Drop zone hint
    const dropHint = element('div', {
        textContent: 'Drop components here',
        style: `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 12px;
            opacity: 0.3;
            pointer-events: none;
            transition: opacity 0.2s;
        `
    });
    canvas.appendChild(dropHint);

    // --- Drag Logic ---
    let dragState: { item: CanvasItem; startX: number; startY: number; offsetX: number; offsetY: number } | null = null;
    let resizeState: { item: CanvasItem; startX: number; startY: number; startW: number; startH: number; corner: string } | null = null;

    const snapToGrid = (val: number) => {
        if (gridSize <= 0) return val;
        return Math.round(val / gridSize) * gridSize;
    };

    const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

    const startDrag = (item: CanvasItem, e: PointerEvent) => {
        // Calculate offset from pointer to item's top-left corner
        // item.position is already relative to canvas, so we just need
        // the offset from the current pointer position (in canvas coords) to item position
        const canvasRect = canvas.getBoundingClientRect();
        const pointerInCanvas = {
            x: e.clientX - canvasRect.left,
            y: e.clientY - canvasRect.top
        };

        dragState = {
            item,
            startX: e.clientX,
            startY: e.clientY,
            offsetX: pointerInCanvas.x - item.position.x,
            offsetY: pointerInCanvas.y - item.position.y
        };
        item.element.style.cursor = 'grabbing';
        item.element.style.zIndex = String(++nextZIndex);
        item.zIndex = nextZIndex;

        document.addEventListener('pointermove', onDragMove);
        document.addEventListener('pointerup', onDragEnd);
    };

    const onDragMove = (e: PointerEvent) => {
        if (!dragState) return;
        const canvasRect = canvas.getBoundingClientRect();
        let x = e.clientX - canvasRect.left - dragState.offsetX;
        let y = e.clientY - canvasRect.top - dragState.offsetY;

        x = snapToGrid(clamp(x, 0, width - dragState.item.size.width));
        y = snapToGrid(clamp(y, 0, height - dragState.item.size.height));

        dragState.item.position = { x, y };
        dragState.item.element.style.left = `${x}px`;
        dragState.item.element.style.top = `${y}px`;
    };

    const onDragEnd = () => {
        if (dragState) {
            dragState.item.element.style.cursor = '';
            opts.onItemMove?.(dragState.item.id, dragState.item.position);
        }
        dragState = null;
        document.removeEventListener('pointermove', onDragMove);
        document.removeEventListener('pointerup', onDragEnd);
    };

    // --- Resize Logic ---
    const startResize = (item: CanvasItem, corner: string, e: PointerEvent) => {
        e.stopPropagation();
        resizeState = {
            item,
            startX: e.clientX,
            startY: e.clientY,
            startW: item.size.width,
            startH: item.size.height,
            corner
        };
        document.addEventListener('pointermove', onResizeMove);
        document.addEventListener('pointerup', onResizeEnd);
    };

    const onResizeMove = (e: PointerEvent) => {
        if (!resizeState) return;
        const dx = e.clientX - resizeState.startX;
        const dy = e.clientY - resizeState.startY;

        let newW = resizeState.startW;
        let newH = resizeState.startH;

        if (resizeState.corner.includes('e')) newW = snapToGrid(Math.max(40, resizeState.startW + dx));
        if (resizeState.corner.includes('s')) newH = snapToGrid(Math.max(24, resizeState.startH + dy));

        resizeState.item.size = { width: newW, height: newH };
        resizeState.item.element.style.width = `${newW}px`;
        resizeState.item.element.style.height = `${newH}px`;
    };

    const onResizeEnd = () => {
        if (resizeState) {
            opts.onItemResize?.(resizeState.item.id, resizeState.item.size);
        }
        resizeState = null;
        document.removeEventListener('pointermove', onResizeMove);
        document.removeEventListener('pointerup', onResizeEnd);
    };

    // --- Item Creation ---
    const createItemWrapper = (item: CanvasItem): HTMLElement => {
        const isSprite = item.type === 'Sprite';

        const wrapper = element('div', {
            className: 'positioned-item',
            style: `
                position: absolute;
                left: ${item.position.x}px;
                top: ${item.position.y}px;
                width: ${item.size.width}px;
                height: ${item.size.height}px;
                background: rgba(255,255,255,0.08);
                border: 1px solid rgba(255,255,255,0.15);
                border-radius: 6px;
                cursor: grab;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                z-index: ${item.zIndex};
            `
        });

        // Header with label + delete (and sprite controls if applicable)
        const header = element('div', {
            style: `
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 2px 4px;
                background: rgba(0,0,0,0.3);
                font-size: 9px;
                opacity: 0.9;
                cursor: grab;
                flex-wrap: ${isSprite ? 'wrap' : 'nowrap'};
                gap: 4px;
            `
        });
        header.appendChild(element('span', { textContent: item.label, style: 'font-weight: bold;' }));

        const deleteBtn = element('button', {
            textContent: '×',
            style: 'background: none; border: none; color: var(--color-danger); font-size: 12px; cursor: pointer; padding: 0 4px; margin-left: auto;'
        });
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            handle.removeItem(item.id);
        };
        header.appendChild(deleteBtn);

        // Content area
        const content = element('div', {
            style: 'flex: 1; padding: 4px; overflow: auto; display: flex; align-items: center; justify-content: center;'
        });
        content.appendChild(item.element);

        // For Sprite type: add dropdown controls in a second header row
        if (isSprite) {
            const controlsRow = element('div', {
                style: 'display: flex; gap: 4px; padding: 4px; background: rgba(0,0,0,0.2); flex-wrap: wrap;'
            });

            // Native select style
            const selectStyle = 'font-size: 9px; padding: 2px 4px; background: rgba(0,0,0,0.4); color: #fff; border: 1px solid rgba(255,255,255,0.2); border-radius: 3px; flex: 1; min-width: 60px; max-width: 80px;';

            // Category select - use MGSprite.getCategories() like Sprite Explorer
            const categorySelect = element('select', { style: selectStyle }) as HTMLSelectElement;
            const categories = MGSprite.getCategories();
            categories.forEach(cat => {
                const opt = element('option', { value: cat, textContent: cat }) as HTMLOptionElement;
                categorySelect.appendChild(opt);
            });

            // Asset select
            const assetSelect = element('select', { style: selectStyle }) as HTMLSelectElement;
            assetSelect.appendChild(element('option', { value: '', textContent: 'Asset...' }));

            // Mutation select - use same mutations as Sprite Explorer
            const mutationSelect = element('select', { style: selectStyle }) as HTMLSelectElement;
            mutationSelect.appendChild(element('option', { value: '', textContent: 'None' }));
            ['Gold', 'Rainbow', 'Wet', 'Chilled', 'Frozen', 'Dawnlit'].forEach(m => {
                mutationSelect.appendChild(element('option', { value: m, textContent: m }));
            });

            // Update asset options - use MGSprite.getCategoryId() like Sprite Explorer
            const updateAssets = () => {
                assetSelect.innerHTML = '';
                assetSelect.appendChild(element('option', { value: '', textContent: 'Asset...' }));
                const assets = MGSprite.getCategoryId(categorySelect.value);
                assets.forEach(a => {
                    assetSelect.appendChild(element('option', { value: a, textContent: a }));
                });
            };

            // Render sprite preview - use imported MGSprite like Sprite Explorer
            const renderSprite = () => {
                content.innerHTML = '';
                const cat = categorySelect.value;
                const asset = assetSelect.value;
                const mut = mutationSelect.value;

                if (!asset) {
                    content.appendChild(element('span', { textContent: '🌱 Select asset', style: 'opacity: 0.4; font-size: 11px;' }));
                    return;
                }

                try {
                    const canvas = MGSprite.toCanvas(cat, asset, {
                        mutations: mut ? [mut] as any : [],
                        scale: 2
                    });
                    // Make sprite scale with component size
                    canvas.style.imageRendering = 'pixelated';
                    canvas.style.maxWidth = '100%';
                    canvas.style.maxHeight = '100%';
                    canvas.style.objectFit = 'contain';
                    content.appendChild(canvas);
                } catch (e) {
                    content.appendChild(element('span', { textContent: 'Sprite Not Found', style: 'color: var(--color-danger); font-size: 10px;' }));
                }
            };

            // Event handlers
            categorySelect.onchange = () => { updateAssets(); renderSprite(); };
            assetSelect.onchange = renderSprite;
            mutationSelect.onchange = renderSprite;

            // Stop propagation to prevent drag on dropdowns
            [categorySelect, assetSelect, mutationSelect].forEach(sel => {
                sel.onpointerdown = (e) => e.stopPropagation();
                sel.onclick = (e) => e.stopPropagation();
            });

            controlsRow.appendChild(categorySelect);
            controlsRow.appendChild(assetSelect);
            controlsRow.appendChild(mutationSelect);

            // Initialize
            updateAssets();
            renderSprite();

            wrapper.appendChild(header);
            wrapper.appendChild(controlsRow);
            wrapper.appendChild(content);
        } else {
            wrapper.appendChild(header);
            wrapper.appendChild(content);
        }

        // Resize handle (SE corner)
        const resizeHandle = element('div', {
            style: `
                position: absolute;
                right: 0;
                bottom: 0;
                width: 12px;
                height: 12px;
                cursor: se-resize;
                background: linear-gradient(135deg, transparent 50%, rgba(255,255,255,0.3) 50%);
            `
        });
        resizeHandle.onpointerdown = (e) => startResize(item, 'se', e);
        wrapper.appendChild(resizeHandle);

        // Drag from header or wrapper
        header.onpointerdown = (e) => startDrag(item, e);
        wrapper.onpointerdown = (e) => {
            if (e.target === wrapper || e.target === content) {
                startDrag(item, e);
            }
        };

        return wrapper;
    };

    // Drop handling
    canvas.ondragover = (e) => {
        e.preventDefault();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
        canvas.style.borderColor = 'var(--color-primary)';
        canvas.style.background = 'rgba(var(--color-primary-rgb, 0,200,150), 0.1)';
        dropHint.style.opacity = '0.6';
    };

    canvas.ondragleave = () => {
        canvas.style.borderColor = 'rgba(255,255,255,0.15)';
        canvas.style.background = 'rgba(0,0,0,0.3)';
        dropHint.style.opacity = items.size === 0 ? '0.3' : '0';
    };

    canvas.ondrop = (e) => {
        e.preventDefault();
        canvas.style.borderColor = 'rgba(255,255,255,0.15)';
        canvas.style.background = 'rgba(0,0,0,0.3)';
        dropHint.style.opacity = '0';

        // Dispatch custom event for parent to handle
        const canvasRect = canvas.getBoundingClientRect();
        const dropX = snapToGrid(e.clientX - canvasRect.left);
        const dropY = snapToGrid(e.clientY - canvasRect.top);

        const customEvent = new CustomEvent('canvas-drop', {
            detail: {
                x: dropX,
                y: dropY,
                dataTransfer: e.dataTransfer
            }
        });
        canvas.dispatchEvent(customEvent);
    };

    container.appendChild(canvas);

    // --- Handle API ---
    const handle: PositioningCanvasHandle = {
        root: container,

        addItem(id: string, type: string, label: string, content: HTMLElement, initialSize?: { width: number; height: number }): CanvasItem {
            // Place at center if first, else cascade
            const existingCount = items.size;
            const itemWidth = initialSize?.width ?? 100;
            const itemHeight = initialSize?.height ?? 60;
            const startX = snapToGrid(20 + (existingCount * 16) % (width - itemWidth));
            const startY = snapToGrid(20 + (existingCount * 16) % Math.max(20, height - itemHeight));

            const item: CanvasItem = {
                id,
                type,
                label,
                element: content,
                position: { x: startX, y: startY },
                size: { width: itemWidth, height: itemHeight },
                zIndex: ++nextZIndex
            };

            const wrapper = createItemWrapper(item);
            item.element = wrapper; // Replace with wrapper reference
            items.set(id, item);
            canvas.appendChild(wrapper);
            dropHint.style.opacity = '0';

            return item;
        },

        removeItem(id: string) {
            const item = items.get(id);
            if (item) {
                item.element.remove();
                items.delete(id);
                opts.onItemRemove?.(id);
                if (items.size === 0) dropHint.style.opacity = '0.3';
            }
        },

        getItems() {
            return Array.from(items.values());
        },

        clear() {
            items.forEach(item => item.element.remove());
            items.clear();
            dropHint.style.opacity = '0.3';
        },

        setGridSize(size: number) {
            gridSize = size;
            gridLabel.textContent = `Grid: ${size}px`;
            if (canvas.style.backgroundImage) {
                canvas.style.backgroundImage = generateGridPattern();
            }
        },

        destroy() {
            document.removeEventListener('pointermove', onDragMove);
            document.removeEventListener('pointerup', onDragEnd);
            document.removeEventListener('pointermove', onResizeMove);
            document.removeEventListener('pointerup', onResizeEnd);
            items.clear();
        }
    };

    return handle;
}
