/**
 * AvatarBuilder Component
 * Interactive avatar customization with swipe navigation and category selection.
 */

import { element } from "../../styles/helpers";
import { avatarBuilderStyles } from "./avatarBuilder.css";
import { listAsync, getAssetBaseUrl } from "../../../modules/cosmetic/avatar/logic/query";
import type { AvatarOutfit, CosmeticInfo } from "../../../modules/cosmetic/avatar/types";
import { ALT_ASSET_PATH } from "../../../modules/cosmetic/avatar/types";
import { MGRiveLoader } from "../../../modules/riveLoader";
import type { RiveInstanceHandle } from "../../../modules/riveLoader/types";

type SlotType = keyof Omit<AvatarOutfit, 'color'>;

export interface AvatarBuilderOptions {
    /** Initial outfit to display */
    initialOutfit?: Partial<AvatarOutfit>;
    /** Callback when any cosmetic changes */
    onChange?: (data: { slot: SlotType; item: CosmeticInfo }) => void;
    /** Custom width (default: 100%) */
    width?: string;
    /** Use Rive animations instead of static images (default: false) */
    useRiveAnimation?: boolean;
}

export interface AvatarBuilderHandle {
    root: HTMLElement;
    /** Get current outfit */
    getOutfit(): Required<Omit<AvatarOutfit, 'color'>>;
    /** Set outfit programmatically */
    setOutfit(outfit: Partial<AvatarOutfit>): void;
    /** Set active category */
    setCategory(slot: SlotType): void;
    destroy(): void;
}

const ICON_TOP = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAAA2CAYAAACY0PQ8AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKnSURBVHgB7ZuPddMwEMY/9zFAmAAxAWUCzASwAWGDbsDrBs0EJBMAE9SdAHeCqBOQDcQdkuu8Ngk6ubbPcn7v3VP0LCe5zyfJ+ldgBJxzC0oWh64VRWExMAVeiOCYIbsM6Rt4Rw1ahw1k7ILZkOf0IaRsNYm2Q0eSRSCn2dmS7ANax8eARajJ7sgqEqVC35DzhuzW6WVLZiQ+iSOBfwTjPfVYLEXE29jCFxBAApTQLwDD0XoZW1gkAnz9mwqL2IKi6uB8D/AH0+B1bM8hioTwpRb6sZKuU1odmDvo515SOEWEGvqpJIVTRLDQTyUpnPKeYCjZQjHUHoj8EkdCGOBo7iorCEmpDoxmEUSNIpMqgubGUfzfUkV4gF4shKSKYKGXwSLBQidJkyy5iZDUYOfWO4h7BiZJhDEmQyOxSCA1EpJ/sGcsEugigkYGbRMYC30MLoJGziKkNti5RUISZxGQmQhhNlxMbpEwuAgGmXCOBOLVfiasNZYha+GXuu2Rew30cVKEMElchiwPu+unBb4dWer+TbZ8UnbhdLI84HjpvG/bA+WvuEyxp9D/ptEt2ZpsE/Iap92/0tNdO99LLMk+oX3yx3jfiPA93BSDDVZCHxze/OpcCu5ZNSLwSnNSo5IBu8JNa7m9F7iLnGsEPMIiTGn3SS9chCnqKSy390XdvDH+wnzZNL0Dtwvc78+tfbBkH/9FQqgS15gf1zwseBxAUeaGkhXmw4rfLvnDsx0dVDX4whfkzYYEWDaZZ0PpcDHniFjtC3ASHmHx67TLB/blClKc39G+dtPnhxPufM9JjFvnJ4pOIt3bbCj5DN9wRu8iH5gKftftTeyGjS4nXwz8uJ0nLsY++VLBO/4zZRXqJc9AGbRnoN6Fz411Zf8sFNs92jNQFh35C3Y0hc/7VYYmAAAAAElFTkSuQmCC';
const ICON_MID = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA/CAYAAACxdtubAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKfSURBVHgB7ZuPdZswEMY//DqAuwGdwM4EJRPUG9TdoCM0G7QT1NkgmSB0gngDkwnKBvQ+W+LJBJCUxnnoyO89/hgL0McdJ50sZxigaZpcNgekRy3LpyzLavfgYuSEr0iTpSzb7sFsqLRYlNbMkSZ7seiVe6DXoiJyi3RFkrVoKNwDQ66bqtu6bNwPz1w34SDU5Swo9Vl0Cx0wKLVW7ROqwW0tn+3OmeuK265l8wg91OK6H7nTtWgBXSxt9O0K/QJ9HN/TVqgo58tbQB8rrlyLrqETdh6WrtANdEJPzV2hK+ilmIPrktVRqGk/l9DL2lpUs0jSBiPNbkvaYJRDOVao5oh7ZIGZMDvX1R51T/motKMNlDO7d1Q9sxNaQTnvFtWGFfoE5Vihe+hmPxehT3MRWh6Fml+cSuildJuXP9BJJYbcu0JL6KTkqhUqqkvoFHvP1aLvoCLotnfc6Qrd4fSTuBZKu3Mm1ETfX9DDjd3pm6zBYRVO1kh9eOVeDDc8h0GRVb+7H4bStJ9IO6PZicEq98DYFLlCNg9ID3rkVVfoYOJt2tUUXfimK5JkvrPEsrRqgTSgy37r+yJEKKMv5x7lmDYVTi7b2w/wjhmZE68x/eB0OySSBA2OGZ+fenYzmlPHjAJOPTmvxr70vqOWqc8TFK8b1RJsUSavmG6Hv/QViB3Anmoa561XrNAdpsmdr0CUUNNbqhBHFViuNmVjg17Z1xPq8gHxMMf7HVi2kuWaFTEdjxzP0z+WsU2YndP/iPA08RaXgt3CJowfeAE8L/D6l20F+NRl+eupxIv/aUHrU4Tn+rx/jksjN9k0w2IP/1sJ8zAPI0K3eCsGKvPwWk/aXH/XY8noucXBPSNPhdhrymFGxfHKmAfHpTb3iO64/AONOretDlUMVwAAAABJRU5ErkJggg==';
const ICON_BOTTOM = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAAA8CAYAAAA5S9daAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKgSURBVHgB7ZvvdYIwEMBPXr/XTtBs0I5gJ+kI7QbtCI7QTXSD4gTiBLJBmoMEA1wC+CSpF37vReEAIZfL/ckTAA9Syg/VzvL+Oar25ernyqMAob6OwIun1WpVdoWZ54I18ENQQp8SSuAH2adFCeDxCQh6FGCE8gdkf7OB6zhZg7MvixJgWAlJsPgE8FiC6v8rMEMngD1SS5bIgc2mXnDnCEqYTb3gzhGU0KeEZ+CHoISpWcILJUxNCaSzJ5WgQskaeEaHNRUmXZbAMTIYeoObjT2REb0BTtESRFfgUsIL8KUX+pfpAItjrOiVljo8noE3raV3yhIE8EfYO4sSYFFCRapKaKUA2dAJTHmydyglcM4RDK2BpkIkqxVmF/bKc8sSOK4wu7BL6u50SGEqGJoBz1wHEqAZ8K4SBKSD0xI4rjC7eDQb/8ES3nQLTWMJrRCpPCZWj6Gdo0lcQleupYqS1b0bS4i0wpxjSavL2gLC0qw829MhRmQ4Wds5hKca9KwrCIzd8QOEpxr42JaQO7ZDIfDDVkKM6rGwtmMooUoJYk4HdIhNx9V2AeH/KBZ9OlAjX0BYojvGw0jZnAj8qJQQqYQuCFlwv4C5grGE2OHRJ5ubV6OE2OHRJ5ubdSxLyKmXLyKlz40lhM4RTp5joa3hMZoleI75FDQH0XxCfuWxOWiiwx7CUniO7SEsF6WreLlRbSfnZ3DxRIZ5DXGn2sb1AEK1b1m/SzjLzUco4VfOw1HWfRvvA2WtkE9Za+1Wo7Mdcd8feRvwmXey7oNw3e/B9zC6stvqZtLrDdQ5N4ZV3J8aWYoR5+A8fYdpmBwDr8UaZG9XqT4eYAL6R1s/LGvTQmUI3XD/WX93Gz7ofvhOrXuUcCmxC2v/BJdOl3rAruIPOjGfbeyq8HcAAAAASUVORK5CYII=';
const ICON_EXPRESSION = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABACAYAAACNx/A2AAAACXBIWXMAAAsTAAALEwEAmpwYAAAEh0lEQVR42u3cX2iVdRzH8bPV2tIJGhYzU4iCpJssUsLQpASVyqALLS0M0lC7qFTIBL0ISugmmERFKlZKClLeLIqlTU2kWOKfUmeaEzd109zcdua2s3NeQZybDu6fZ+fsOTvPG763Pz7PGx5+z++c7+8bmf32c5FsFgowGjOwAhuwDVWowWW0Ig7oRgsu4k9UYhPW4zU8ijuT62e9siVtBKZhNb5CFY7gLC7iGqKI651utOEKLuA0fkclPsEyPIjCnBeIIkzFamzBPlxADPFkJUjWwEggWeLJiuIvfI+P8ToeyDmBGIvpWIVKNCOWrITMkkAM3ajDDryBx1AaaIEoxSNYh1PoQMzQkUAnojiE5OutJHACcRfW4BSiiAsWMbSiGotREgiBKMQi7EUj4oJNN+qxG7OGTCAKcT8+wh/ollt04RDexZisCkQxZuEbROUucTTiU0xHUcYFohjP4iC6DA/asRdzUZwxgSjGfJw0/IjjBF7CiEEXiBIsxt+GN7VYhlGDJhC3YQFq5AdnsAQjB0vgbFTLL05gIe5ISyAex0/yk2rMvWWBGI8v5TcVmHyrAtehTX4Tx+coG5BAzMNpIdCElf0WiLHYLQQAjmBGfwWuQqOQVLaiqFeBuBf7hdyM81jSl8D30SykJypQfFOBGIvfhPRGA1b0JPBNXBHSF1UouZnAPcH/RVkQqMOL/xOIh1ArpD+0Y3uqwHdwVRr0eKJJgwDnOYl7/hOIAnyHG+kGzUTogGZqxKtJgcbgbLpBgyIyS3mi2J4U6ClcHw4Cs5znJEojWInraYTNSOjg59GEKRFsRHSgYUOBmrA0ggp05KvANDK1YUMER9Ad8LB95hmCTB34NoLzSIQCB0wMhyO4FvzXRRAzJVAXQWfwwwrqV0FbBLEcChy0PIkIrufIh2sQ88QjOId4pgOnc9hPY91MC4xGUIVOSEdiph4yE+sbHBI438tJJH2RAJkWmEamdOjCvggWoEUGyJrAoaEd5RGMQx0gFNh/mjE/GcB2tAFySqKhow5lyRCeQQNSCaxMQ0sHdqX+K1clIKTKEjwa8HSqwPm4JKQvurCrp9aOLegQ0hvH8URPAifhgJCeuIzVfbW3zcujjvyB0IqNGN2fDtWlqBcC0IkdmDSQHum3wk0FdGI3pgy0yfx2LMcZJOQnHdiKSbd6T2QkFuBAnnVuJXAJH+K+dG8qFWMGtuRJ73QC+7EMZYN5W3Mc1uJgjt8T7o0abMY0FGbivnABJmMbatEu94nhIvbgZZRm48p/EWZiJ+rRkmMbTQJRNOBnvIJRWR06gUKU4UmsxzE040ZAN5w4bqAV51COOZiI4qEee3I3pmEpPsNRtKILsSESGkcMXWjFcWzCcszEhKBOLhqP57EWm1GJGrQgnubYp1RSxz91I45/cBw/4Au8hxcwMbCTi3oZFTAZS1COCvyKYziLelxDG7oQ7+dop3Y04TJqcQqH8Qt24QMsxMO4I6dmZ/U9PsAEzMEKbMDX+BHVOIeraEUsZWLbVdTiKPZhJ8qxBoswFaNRkM1n+he4a3+KgaBGGQAAAABJRU5ErkJggg==';

const SLOT_CONFIG: Record<SlotType, { label: string; type: string; icon: string }> = {
    expression: { label: 'Expression', type: 'Expression', icon: ICON_EXPRESSION },
    top: { label: 'Top', type: 'Top', icon: ICON_TOP },
    mid: { label: 'Mid', type: 'Mid', icon: ICON_MID },
    bottom: { label: 'Bottom', type: 'Bottom', icon: ICON_BOTTOM },
};

const DEFAULT_OUTFIT: Required<Omit<AvatarOutfit, 'color'>> = {
    expression: 'Expression_Default.png',
    top: 'Top_DefaultGray.png',
    mid: 'Mid_DefaultGray.png',
    bottom: 'Bottom_DefaultGray.png',
};

export function createAvatarBuilder(options: AvatarBuilderOptions = {}): AvatarBuilderHandle {
    const {
        initialOutfit = {},
        onChange,
        width = '100%',
        useRiveAnimation = false,
    } = options;

    // State
    let currentOutfit: Required<Omit<AvatarOutfit, 'color'>> = { ...DEFAULT_OUTFIT, ...initialOutfit };
    let activeSlot: SlotType = 'bottom';
    let slotItems: Record<SlotType, CosmeticInfo[]> = {
        expression: [],
        top: [],
        mid: [],
        bottom: [],
    };
    let currentIndices: Record<SlotType, number> = {
        expression: 0,
        top: 0,
        mid: 0,
        bottom: 0,
    };

    // DOM References
    let previewContainer: HTMLDivElement;
    let itemNameEl: HTMLDivElement;
    let dotsIndicatorEl: HTMLDivElement;
    let categoryButtons: Record<SlotType, HTMLButtonElement> = {} as any;
    let isDragging = false;
    let startX = 0;
    let currentTranslateX = 0;

    // Rive animation
    let riveHandle: RiveInstanceHandle | null = null;
    let riveCanvas: HTMLCanvasElement | null = null;

    // Cleanups
    const cleanups: (() => void)[] = [];

    // Root
    const root = element("div", { className: "avatar-builder" }) as HTMLDivElement;
    root.style.width = width;

    // Inject styles
    const styleEl = element("style") as HTMLStyleElement;
    styleEl.textContent = avatarBuilderStyles;
    root.appendChild(styleEl);

    // === Preview Area ===
    const previewArea = element("div", { className: "avatar-builder-preview-area" }) as HTMLDivElement;
    root.appendChild(previewArea);

    // Avatar wrapper: holds the preview container + arrows as siblings so clearing
    // the container doesn't destroy the arrows
    const avatarWrapper = element("div", { className: "avatar-builder-avatar-wrapper" }) as HTMLDivElement;
    previewArea.appendChild(avatarWrapper);

    // Preview container (for layers)
    previewContainer = element("div", { className: "avatar-builder-preview-container" }) as HTMLDivElement;
    avatarWrapper.appendChild(previewContainer);

    // Arrow buttons — siblings of the container so innerHTML = "" doesn't clear them
    const leftArrow = element("button", {
        className: "avatar-builder-arrow avatar-builder-arrow-left",
        onclick: () => navigateSlot(-1)
    }) as HTMLButtonElement;
    leftArrow.innerHTML = `<svg width="18" height="18" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7L9 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    avatarWrapper.appendChild(leftArrow);

    const rightArrow = element("button", {
        className: "avatar-builder-arrow avatar-builder-arrow-right",
        onclick: () => navigateSlot(1)
    }) as HTMLButtonElement;
    rightArrow.innerHTML = `<svg width="18" height="18" viewBox="0 0 14 14" fill="none"><path d="M5 2L10 7L5 12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    avatarWrapper.appendChild(rightArrow);

    // Swipe/Drag support
    previewContainer.addEventListener('mousedown', handleDragStart);
    previewContainer.addEventListener('touchstart', handleDragStart, { passive: true });
    cleanups.push(() => {
        previewContainer.removeEventListener('mousedown', handleDragStart);
        previewContainer.removeEventListener('touchstart', handleDragStart);
    });

    // Item name
    itemNameEl = element("div", { className: "avatar-builder-item-name" }, "Loading...") as HTMLDivElement;
    previewArea.appendChild(itemNameEl);

    // Dots indicator
    dotsIndicatorEl = element("div", { className: "avatar-builder-dots-indicator" }) as HTMLDivElement;
    previewArea.appendChild(dotsIndicatorEl);

    // === Category Selectors ===
    const categoryRow = element("div", { className: "avatar-builder-category-row" }) as HTMLDivElement;
    root.appendChild(categoryRow);

    Object.entries(SLOT_CONFIG).forEach(([slotKey, config]) => {
        const slot = slotKey as SlotType;
        const btn = element("button", {
            className: `avatar-builder-category-btn ${slot === activeSlot ? 'active' : ''}`,
            onclick: () => setActiveCategory(slot),
            title: config.label // Tooltip pour l'accessibilité
        }) as HTMLButtonElement;

        // Icône au lieu de texte
        const icon = element("img", {
            src: config.icon,
            alt: config.label,
            className: "category-icon"
        }) as HTMLImageElement;
        btn.appendChild(icon);

        categoryButtons[slot] = btn;
        categoryRow.appendChild(btn);
    });

    // === Initialize ===
    loadAllSlots().then(() => {
        updatePreview();
        updateItemName();
        updateDotsIndicator();
    });

    // === Functions ===

    async function loadAllSlots() {
        const slots: SlotType[] = ['expression', 'top', 'mid', 'bottom'];
        await Promise.all(slots.map(async (slot) => {
            const items = await listAsync({ type: SLOT_CONFIG[slot].type });
            slotItems[slot] = items;

            // Find current index
            const currentFilename = currentOutfit[slot];
            const index = items.findIndex(item => item.filename === currentFilename);
            currentIndices[slot] = index >= 0 ? index : 0;
        }));
    }

    function updatePreview() {
        if (useRiveAnimation) {
            // Use Rive animations
            if (riveHandle) {
                MGRiveLoader.updateOutfit(riveHandle, currentOutfit).catch((err: unknown) => {
                    console.error('[AvatarBuilder] Failed to update Rive outfit:', err);
                });
            } else {
                initializeRive();
            }
        } else {
            // Use static PNG layers
            previewContainer.innerHTML = "";
            const assetBase = getAssetBaseUrl();

            const layerOrder: { slot: SlotType; zIndex: number }[] = [
                { slot: 'bottom', zIndex: 1 },
                { slot: 'mid', zIndex: 2 },
                { slot: 'top', zIndex: 3 },
                { slot: 'expression', zIndex: 4 },
            ];

            layerOrder.forEach(({ slot, zIndex }) => {
                const filename = currentOutfit[slot];
                if (!filename) return;

                const isAltPath = filename === ALT_ASSET_PATH;
                const isBlank = filename.includes("_Blank.png");

                if (isBlank || isAltPath) return;

                const img = element("img", {
                    src: `${assetBase}${filename}`,
                    className: `avatar-builder-layer ${slot === activeSlot ? 'active' : ''}`,
                    style: { zIndex: String(zIndex) },
                    onerror: () => (img as HTMLImageElement).style.display = "none"
                }) as HTMLImageElement;

                previewContainer.appendChild(img);
            });
        }
    }

    async function initializeRive() {
        if (!useRiveAnimation || riveHandle) return;

        try {
            // Clear container
            previewContainer.innerHTML = "";

            // Create canvas
            riveCanvas = element("canvas", {
                className: "avatar-builder-rive-canvas",
                width: 260,
                height: 260
            }) as HTMLCanvasElement;

            previewContainer.appendChild(riveCanvas);

            // Create Rive instance with current outfit
            riveHandle = await MGRiveLoader.createInstance({
                canvas: riveCanvas,
                outfit: currentOutfit,
                autoplay: true
            });

            console.log('[AvatarBuilder] Rive animation initialized');
        } catch (err) {
            console.error('[AvatarBuilder] Failed to initialize Rive:', err);
            console.warn('[AvatarBuilder] Falling back to static images');

            // Fallback to static images
            if (riveCanvas) {
                riveCanvas.remove();
                riveCanvas = null;
            }
            riveHandle = null;

            // Re-render with static images
            updatePreview();
        }
    }

    function updateItemName() {
        const items = slotItems[activeSlot];
        const index = currentIndices[activeSlot];
        if (!items || items.length === 0) {
            itemNameEl.textContent = "Loading...";
            return;
        }
        const item = items[index];
        itemNameEl.textContent = item?.displayName || "Unknown";
    }

    function updateDotsIndicator() {
        const items = slotItems[activeSlot];
        const index = currentIndices[activeSlot];
        const total = items.length;

        if (total === 0) {
            dotsIndicatorEl.innerHTML = "";
            return;
        }

        // Show position text
        dotsIndicatorEl.innerHTML = `<span class="dots-text">${index + 1} / ${total}</span>`;

        // Create dots (max 10 to avoid clutter)
        const maxDots = Math.min(total, 10);
        const dotsContainer = element("div", { className: "dots-container" });

        // Map current index proportionally so one dot is always active
        const activeDot = total > 1 ? Math.round((index / (total - 1)) * (maxDots - 1)) : 0;

        for (let i = 0; i < maxDots; i++) {
            const dot = element("span", {
                className: `dot ${i === activeDot ? 'active' : ''}`
            });
            dotsContainer.appendChild(dot);
        }

        dotsIndicatorEl.appendChild(dotsContainer);
    }

    function setActiveCategory(slot: SlotType) {
        activeSlot = slot;

        // Update button states
        Object.entries(categoryButtons).forEach(([key, btn]) => {
            btn.classList.toggle('active', key === slot);
        });

        updatePreview();
        updateItemName();
        updateDotsIndicator();
    }

    function navigateSlot(direction: number) {
        const items = slotItems[activeSlot];
        if (!items || items.length === 0) return;

        let newIndex = currentIndices[activeSlot] + direction;

        // Wrap around
        if (newIndex < 0) newIndex = items.length - 1;
        if (newIndex >= items.length) newIndex = 0;

        currentIndices[activeSlot] = newIndex;
        const item = items[newIndex];
        currentOutfit[activeSlot] = item.filename;

        // Trigger callback
        if (onChange) {
            onChange({ slot: activeSlot, item });
        }

        // Slide animation
        animateSlide(direction > 0 ? 'left' : 'right');

        updatePreview();
        updateItemName();
        updateDotsIndicator();
    }

    function animateSlide(direction: 'left' | 'right') {
        const offset = direction === 'left' ? -20 : 20;
        previewContainer.style.transform = `translateX(${offset}px)`;
        previewContainer.style.opacity = '0.5';

        setTimeout(() => {
            previewContainer.style.transform = 'translateX(0)';
            previewContainer.style.opacity = '1';
        }, 150);
    }

    function handleDragStart(e: MouseEvent | TouchEvent) {
        isDragging = true;
        startX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        currentTranslateX = 0;

        const handleMove = (e: MouseEvent | TouchEvent) => {
            if (!isDragging) return;
            const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX;
            currentTranslateX = currentX - startX;

            // Visual feedback
            previewContainer.style.transform = `translateX(${currentTranslateX * 0.3}px)`;
        };

        const handleEnd = () => {
            if (!isDragging) return;
            isDragging = false;

            previewContainer.style.transform = 'translateX(0)';

            // Threshold for navigation (50px)
            if (Math.abs(currentTranslateX) > 50) {
                const direction = currentTranslateX > 0 ? -1 : 1;
                navigateSlot(direction);
            }

            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseup', handleEnd);
            document.removeEventListener('touchmove', handleMove);
            document.removeEventListener('touchend', handleEnd);
        };

        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleEnd);
        document.addEventListener('touchmove', handleMove);
        document.addEventListener('touchend', handleEnd);
    }

    // === Public API ===

    function getOutfit(): Required<Omit<AvatarOutfit, 'color'>> {
        return { ...currentOutfit };
    }

    function setOutfit(outfit: Partial<AvatarOutfit>) {
        currentOutfit = { ...currentOutfit, ...outfit };

        // Update indices
        Object.entries(outfit).forEach(([slotKey, filename]) => {
            const slot = slotKey as SlotType;
            if (!filename || !slotItems[slot]) return;
            const index = slotItems[slot].findIndex(item => item.filename === filename);
            if (index >= 0) {
                currentIndices[slot] = index;
            }
        });

        updatePreview();
        updateItemName();
        updateDotsIndicator();
    }

    function setCategory(slot: SlotType) {
        setActiveCategory(slot);
    }

    function destroy() {
        // Cleanup Rive
        if (riveHandle) {
            riveHandle.destroy();
            riveHandle = null;
        }

        if (riveCanvas) {
            riveCanvas.remove();
            riveCanvas = null;
        }

        // Cleanup other resources
        cleanups.forEach(fn => fn());
        cleanups.length = 0;
        root.remove();
    }

    return {
        root,
        getOutfit,
        setOutfit,
        setCategory,
        destroy,
    };
}
