/**
 * Auto-Favorite Settings Section
 * FIXED: Professional UI polishes, rainbow effect, and canon sorting
 */

import { BaseSection } from "../core/Section";
import { Card } from "../../components/Card/Card";
import { Label } from "../../components/Label/Label";
import { Switch } from "../../components/Switch/Switch";
import { Button } from "../../components/Button/Button";
import { Table, ColDef } from "../../components/Table/Table";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { Badge } from "../../components/Badge/Badge";
import { element } from "../../styles/helpers";
import { MGData, MGSprite } from "../../../modules";
import { MGAutoFavorite } from "../../../features";
import { storageGet, storageSet, FEATURE_KEYS } from "../../../utils/storage";

interface AutoFavoriteUIConfig {
    enabled: boolean;
    favoriteProduceList: string[];
    favoritePetsList: string[];
    favoriteMutations: string[];
}

const DEFAULT_CONFIG: AutoFavoriteUIConfig = {
    enabled: false,
    favoriteProduceList: [],
    favoritePetsList: [],
    favoriteMutations: [],
};

const MUTATION_DATA = [
    { id: 'Rainbow', color: '#FF00FF', desc: 'All Rainbow items' },
    { id: 'Gold', color: '#EBC800', desc: 'All Gold items' },
    { id: 'Wet', color: '#5FFFFF', desc: 'All Wet items' },
    { id: 'Chilled', color: '#B4E6FF', desc: 'All Chilled items' },
    { id: 'Frozen', color: '#B9C8FF', desc: 'All Frozen items' },
    { id: 'Dawnlit', color: '#F59BE1', desc: 'Dawn mutations' },
    { id: 'Dawncharged', color: '#C896FF', desc: 'Dawn charged' },
    { id: 'Ambershine', color: '#FFB478', desc: 'Amber mutations' },
    { id: 'Ambercharged', color: '#FA8C4B', desc: 'Amber charged' },
];

const RARITY_ORDER: Record<string, number> = {
    Common: 1,
    Uncommon: 2,
    Rare: 3,
    Legendary: 4,
    Mythical: 5,
    Divine: 6,
    Celestial: 7,
};

function getRarityOrder(rarity: string | null): number {
    if (!rarity) return 0;
    return RARITY_ORDER[rarity] ?? 0;
}

export class AutoFavoriteSettingsSection extends BaseSection {
    private config: AutoFavoriteUIConfig = DEFAULT_CONFIG;
    private allPlants: string[] = [];
    private allPets: string[] = [];
    private sectionElement: HTMLElement | null = null;

    constructor() {
        super({ id: "tab-auto-favorite", label: "Auto-Favorite" });
    }

    protected async build(container: HTMLElement): Promise<void> {
        const section = this.createGrid("12px");
        section.id = "auto-favorite-settings";

        const style = document.createElement('style');
        style.textContent = `
      /* Themed scrollbar using CSS variables */
      #auto-favorite-settings .selection-grid::-webkit-scrollbar {
        width: 6px;
      }
      #auto-favorite-settings .selection-grid::-webkit-scrollbar-track {
        background: transparent;
      }
      #auto-favorite-settings .selection-grid::-webkit-scrollbar-thumb {
        background: var(--scrollbar-thumb, rgba(255,255,255,0.2));
        border-radius: 3px;
      }
      #auto-favorite-settings .selection-grid::-webkit-scrollbar-thumb:hover {
        background: var(--scrollbar-thumb-hover, rgba(255,255,255,0.3));
      }

      /* Game-style checkbox using theme variables */
      #auto-favorite-settings .game-checkbox {
        appearance: none;
        width: 18px;
        height: 18px;
        border: 2px solid color-mix(in oklab, var(--tab-bg) 60%, transparent);
        border-radius: 3px;
        background: var(--bg);
        cursor: pointer;
        position: relative;
        transition: all 0.2s;
      }

      #auto-favorite-settings .game-checkbox:hover {
        border-color: var(--accent);
        box-shadow: 0 0 4px color-mix(in oklab, var(--accent) 40%, transparent);
      }

      #auto-favorite-settings .game-checkbox:checked {
        background: linear-gradient(135deg, var(--tab-bg) 0%, var(--accent) 100%);
        border-color: var(--accent);
      }

      #auto-favorite-settings .game-checkbox:checked::after {
        content: '✓';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: var(--bg);
        font-size: 14px;
        font-weight: bold;
      }

      /* Item row using theme variables */
      #auto-favorite-settings .item-row {
        background: color-mix(in oklab, var(--tab-bg) 8%, transparent);
        border: 1px solid color-mix(in oklab, var(--tab-bg) 20%, transparent);
        transition: all 0.15s ease;
      }

      #auto-favorite-settings .item-row:hover {
        background: color-mix(in oklab, var(--tab-bg) 15%, transparent);
        border-color: var(--accent);
        transform: translateX(2px);
      }

      #auto-favorite-settings .item-row.checked {
        background: color-mix(in oklab, var(--accent) 12%, transparent);
        border-color: var(--accent);
      }

      /* Responsive Mutation Rows - Fluid Flexbox */
      #auto-favorite-settings .mut-row {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 8px;
        width: 100%;
      }

      #auto-favorite-settings .mut-btn {
        flex: 1 1 130px;
        min-width: 0; /* Allow shrinking below content size */
      }

      /* On narrow containers, buttons will stack automatically due to flex-basis */
    `;
        container.appendChild(style);

        this.sectionElement = section;
        container.appendChild(section);

        this.config = storageGet<AutoFavoriteUIConfig>(FEATURE_KEYS.AUTO_FAVORITE_UI, DEFAULT_CONFIG);
        await this.loadGameData();

        await this.waitForSprites();
        this.renderContent();
    }

    private async loadGameData(): Promise<void> {
        try {
            // Wait for some data to be captured first (Soft Wait Strategy)
            await MGData.waitForAny(3000).catch(() => { });

            // Then try to get plants and pets specifically, but don't hard-fail on individual timeouts
            await Promise.all([
                MGData.waitFor('plants', 3000).catch(() => console.warn('[AutoFavorite UI] Still waiting for plants data...')),
                MGData.waitFor('pets', 3000).catch(() => console.warn('[AutoFavorite UI] Still waiting for pets data...'))
            ]);

            const plants = (MGData.get('plants') || {}) as Record<string, any>;
            const pets = (MGData.get('pets') || {}) as Record<string, any>;

            // Load and sort all items dynamically by Rarity then Name
            this.allPlants = Object.keys(plants).sort((a, b) => {
                const rarA = plants[a]?.seed?.rarity || null;
                const rarB = plants[b]?.seed?.rarity || null;
                const diff = getRarityOrder(rarA) - getRarityOrder(rarB);
                if (diff !== 0) return diff;
                return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
            });

            this.allPets = Object.keys(pets).sort((a, b) => {
                const rarA = pets[a]?.rarity || null;
                const rarB = pets[b]?.rarity || null;
                const diff = getRarityOrder(rarA) - getRarityOrder(rarB);
                if (diff !== 0) return diff;
                return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
            });
        } catch (error) {
            console.error('[AutoFavorite UI] Failed to load game data:', error);
        }
    }

    private async waitForSprites(): Promise<void> {
        if (MGSprite.isReady()) return;

        const maxWait = 10000;
        const checkInterval = 100;
        let waited = 0;

        return new Promise((resolve) => {
            const check = () => {
                if (MGSprite.isReady() || waited >= maxWait) {
                    resolve();
                } else {
                    waited += checkInterval;
                    setTimeout(check, checkInterval);
                }
            };
            check();
        });
    }

    private renderContent(): void {
        if (!this.sectionElement) return;
        this.sectionElement.innerHTML = '';

        this.sectionElement.appendChild(this.createMasterToggle());
        this.sectionElement.appendChild(this.createMutationsCard());
        this.sectionElement.appendChild(this.createProduceCard());
        this.sectionElement.appendChild(this.createPetsCard());
    }

    private createMasterToggle(): HTMLDivElement {
        const row = element("div", { className: "kv" }) as HTMLDivElement;
        const label = Label({ text: "Enable Auto-Favorite", tone: "default", size: "lg" });
        const toggle = Switch({
            checked: this.config.enabled,
            onChange: (enabled: boolean) => {
                this.config.enabled = enabled;
                this.saveConfig();
            }
        });

        row.append(label.root, toggle.root);

        return Card(
            { title: "Auto-Favorite", padding: "lg" },
            row,
            element("p", { style: "margin-top: 6px; font-size: 12px; color: var(--muted);" },
                "Automatically favorite items when added to inventory")
        );
    }

    private createMutationsCard(): HTMLDivElement {
        const container = element("div", { className: "u-col" }) as HTMLDivElement;

        // Row 1: Rainbow & Gold (2 columns preferred)
        const row1 = element("div", { className: "mut-row" }) as HTMLDivElement;
        row1.appendChild(this.createMutationButton(MUTATION_DATA[0])); // Rainbow
        row1.appendChild(this.createMutationButton(MUTATION_DATA[1])); // Gold
        container.appendChild(row1);

        // Row 2: Wet, Chilled, Frozen (3 columns preferred)
        const row2 = element("div", { className: "mut-row" }) as HTMLDivElement;
        row2.appendChild(this.createMutationButton(MUTATION_DATA[2])); // Wet
        row2.appendChild(this.createMutationButton(MUTATION_DATA[3])); // Chilled
        row2.appendChild(this.createMutationButton(MUTATION_DATA[4])); // Frozen
        container.appendChild(row2);

        // Row 3: Dawn mutations (2 columns preferred)
        const row3 = element("div", { className: "mut-row" }) as HTMLDivElement;
        row3.appendChild(this.createMutationButton(MUTATION_DATA[5])); // Dawnlit
        row3.appendChild(this.createMutationButton(MUTATION_DATA[6])); // Dawncharged
        container.appendChild(row3);

        // Row 4: Amber mutations (2 columns preferred)
        const row4 = element("div", { className: "mut-row" }) as HTMLDivElement;
        row4.appendChild(this.createMutationButton(MUTATION_DATA[7])); // Ambershine
        row4.appendChild(this.createMutationButton(MUTATION_DATA[8])); // Ambercharged
        container.appendChild(row4);

        return Card(
            { title: "Mutations Priority", variant: "soft", padding: "lg", expandable: true, defaultExpanded: true },
            container,
            element("p", { style: "margin-top: 8px; font-size: 11px; color: var(--muted);" },
                `${this.config.favoriteMutations.length} / ${MUTATION_DATA.length} active`)
        );
    }

    private createMutationButton(data: typeof MUTATION_DATA[0]): HTMLDivElement {
        let isActive = this.config.favoriteMutations.includes(data.id);
        const color = data.color;

        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);

        const getButtonStyles = (active: boolean) => {
            // Brighter Rainbow gradient
            let activeBg = `rgba(${r}, ${g}, ${b}, 0.25)`;
            let activeBorder = color;

            if (data.id === 'Rainbow' && active) {
                activeBg = 'linear-gradient(135deg, rgba(255,0,0,0.3) 0%, rgba(255,165,0,0.3) 20%, rgba(255,255,0,0.3) 40%, rgba(0,128,0,0.3) 60%, rgba(0,0,255,0.3) 80%, rgba(75,0,130,0.3) 100%)';
                activeBorder = '#fff9c4';
            }

            return `
                padding: 8px 12px;
                min-height: 52px;
                border-radius: var(--card-radius, 12px);
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                background: ${active ? activeBg : 'color-mix(in oklab, var(--bg) 12%, transparent)'};
                border: 2px solid ${active ? activeBorder : 'color-mix(in oklab, var(--border) 40%, transparent)'};
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 12px;
                box-shadow: ${active ? (data.id === 'Rainbow' ? '0 4px 18px rgba(255,255,255,0.25)' : `0 4px 12px rgba(${r}, ${g}, ${b}, 0.3)`) : 'none'};
                opacity: ${active ? '1' : '0.8'};
                width: 100%;
            `;
        };

        const btn = element("div", {
            className: "mut-btn",
            style: getButtonStyles(isActive)
        }) as HTMLDivElement;

        const leftSprite = element("div", { style: "width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;" }) as HTMLDivElement;

        // Add left sprite (Sunflower with mutation)
        try {
            if (MGSprite.isReady()) {
                const canvas = MGSprite.toCanvas('plant', 'Sunflower', { mutations: [data.id as any], scale: 0.16 });
                canvas.style.width = '28px'; canvas.style.height = '28px'; canvas.style.objectFit = 'contain';
                leftSprite.appendChild(canvas);
            }
        } catch (error) { }

        // Title Case label
        const formattedLabel = data.id.charAt(0).toUpperCase() + data.id.slice(1).toLowerCase();
        const title = element("div", {
            style: `font-size: 13px; font-weight: 600; color: var(--fg); text-shadow: 0 1px 2px rgba(0,0,0,0.5); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`
        }, formattedLabel);

        btn.append(leftSprite, title);

        // Add optional right sprite (Capybara with mutation for Rainbow/Gold)
        if (data.id === 'Rainbow' || data.id === 'Gold') {
            const rightSprite = element("div", { style: "width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;" }) as HTMLDivElement;
            try {
                if (MGSprite.isReady()) {
                    const canvas = MGSprite.toCanvas('pet', 'Capybara', { mutations: [data.id as any], scale: 0.16 });
                    canvas.style.width = '28px'; canvas.style.height = '28px'; canvas.style.objectFit = 'contain';
                    rightSprite.appendChild(canvas);
                }
            } catch (error) { }
            btn.append(rightSprite);
        } else {
            // Spacer to keep name centered
            const spacer = element("div", { style: "width: 28px; flex-shrink: 0;" });
            btn.append(spacer);
        }

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (isActive) {
                this.config.favoriteMutations = this.config.favoriteMutations.filter(m => m !== data.id);
                isActive = false;
            } else {
                this.config.favoriteMutations.push(data.id);
                isActive = true;
            }

            // UI Update: Fast and performant
            btn.style.cssText = getButtonStyles(isActive);

            this.saveConfig();

            // Update counter without full re-render
            const counter = this.sectionElement?.querySelector('.card p');
            if (counter) {
                counter.textContent = `${this.config.favoriteMutations.length} / ${MUTATION_DATA.length} active`;
            }
        });

        return btn;
    }

    private createProduceCard(): HTMLDivElement {
        return this.createItemSelectionCard({
            title: "Produce", items: this.allPlants, category: 'plant', selected: this.config.favoriteProduceList,
            onUpdate: (newList) => { this.config.favoriteProduceList = newList; this.saveConfig(); }
        });
    }

    private createPetsCard(): HTMLDivElement {
        return this.createItemSelectionCard({
            title: "Pets", items: this.allPets, category: 'pet', selected: this.config.favoritePetsList,
            onUpdate: (newList) => { this.config.favoritePetsList = newList; this.saveConfig(); }
        });
    }

    private createItemSelectionCard(opts: { title: string, items: string[], category: string, selected: string[], onUpdate: (newList: string[]) => void }): HTMLDivElement {
        const { title, items, category, selected, onUpdate } = opts;

        // Track selected items locally for reactivity
        let selectedSet = new Set(selected);
        let filteredItems = items;

        // Search bar using proper SearchBar component (matches Test section pattern)
        const searchContainer = element("div", { style: "margin-bottom: 8px;" }) as HTMLDivElement;
        const search = SearchBar({
            placeholder: `Search ${title.toLowerCase()}...`,
            value: "",
            debounceMs: 150,
            withClear: true,
            size: "sm",
            focusKey: "",
            onChange: (val) => {
                const query = val.trim().toLowerCase();
                if (query) {
                    filteredItems = items.filter(id => id.toLowerCase().includes(query));
                } else {
                    filteredItems = items;
                }
                tableHandle.setData(buildTableData());
            },
        });
        searchContainer.appendChild(search.root);

        // Action buttons
        const actions = element("div", { style: "display: flex; gap: 8px; margin-bottom: 12px;" }) as HTMLDivElement;

        const selectAllBtn = Button({
            label: "Select All",
            variant: "default",
            size: "sm",
            onClick: () => {
                const allIds = buildTableData().map(i => i.id);
                tableHandle.setSelection(allIds);
            }
        });

        const deselectAllBtn = Button({
            label: "Deselect All",
            variant: "default",
            size: "sm",
            onClick: () => {
                tableHandle.clearSelection();
            }
        });

        actions.append(selectAllBtn, deselectAllBtn);

        // Build table data with item info
        type ItemRow = { id: string; name: string; rarity: string | null; selected: boolean };

        const buildTableData = (): ItemRow[] => {
            return filteredItems.map(id => ({
                id,
                name: id,
                rarity: this.getItemRarity(id, category),
                selected: selectedSet.has(id)
            }));
        };

        const renderRarity = (rarity: string | null): Node => {
            if (!rarity) {
                const span = element("span", { style: "opacity:0.5;" }) as HTMLSpanElement;
                span.textContent = "—";
                return span;
            }
            const badge = Badge({
                variant: "rarity",
                rarity: rarity,
                size: "sm",
            });
            return badge.root;
        };

        // Create sprite renderer
        const createSpriteCell = (itemId: string): Node => {
            const wrapper = element("div", {
                style: "width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0; background: rgba(0,0,0,0.05); border-radius: 6px;"
            }) as HTMLDivElement;

            try {
                if (MGSprite.isReady()) {
                    let loadCategory = category;
                    let loadAsset = itemId;

                    if (category === 'plant') {
                        const tallPlants = ['Bamboo', 'Cactus'];
                        if (tallPlants.includes(itemId)) loadCategory = 'tallplant';
                        if (itemId === 'DawnCelestial') loadAsset = 'DawnCelestialCrop';
                        if (itemId === 'MoonCelestial') loadAsset = 'MoonCelestialCrop';
                        if (itemId === 'OrangeTulip') loadAsset = 'Tulip';
                    }

                    const canvas = MGSprite.toCanvas(loadCategory, loadAsset, { scale: 0.5 });
                    canvas.style.width = '28px';
                    canvas.style.height = '28px';
                    canvas.style.objectFit = 'contain';
                    wrapper.appendChild(canvas);
                }
            } catch { }

            return wrapper;
        };



        // Table columns - Refined Layout: [✓] [Sprite + Name] [Rarity]
        const columns: ColDef<ItemRow>[] = [
            {
                key: 'name',
                header: 'Name',
                width: '1fr',
                align: 'center',
                sortable: true,
                sortFn: (a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" }),
                render: (row) => {
                    const container = element("div", {
                        style: "display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%;"
                    }) as HTMLDivElement;

                    const sprite = createSpriteCell(row.id);

                    const nameLabel = element("span", {
                        style: "font-weight: 500; color: var(--fg); white-space: nowrap;"
                    }, row.name);

                    container.append(sprite, nameLabel);
                    return container;
                }
            },
            {
                key: 'rarity',
                header: 'Rarity',
                width: '100px',
                align: 'center',
                sortable: true,
                sortFn: (a, b) => getRarityOrder(a.rarity) - getRarityOrder(b.rarity),
                render: (row) => renderRarity(row.rarity)
            }
        ];

        // Create the table
        const tableHandle = Table<ItemRow>({
            columns,
            data: buildTableData(),
            maxHeight: 280,
            compact: true,
            zebra: true,
            animations: true,
            selectable: true,
            selectOnRowClick: true,
            hideHeaderCheckbox: true,
            initialSelection: Array.from(selectedSet),
            getRowId: (row) => row.id,
            onSelectionChange: (ids) => {
                selectedSet.clear();
                ids.forEach(id => selectedSet.add(id));
                onUpdate(Array.from(selectedSet));
                updateCounter();
            }
        });

        // Search functionality is handled by SearchBar component's onChange callback

        // Counter element
        const counterEl = element("p", { style: "margin-top: 8px; font-size: 11px; color: var(--muted);" }) as HTMLParagraphElement;
        const updateCounter = () => {
            counterEl.textContent = `${selectedSet.size} / ${items.length} selected`;
        };
        updateCounter();

        return Card(
            { title: `${title} (${selectedSet.size}/${items.length})`, variant: "soft", padding: "lg", expandable: true, defaultExpanded: false },
            searchContainer,
            actions,
            tableHandle.root,
            counterEl
        );
    }


    private getItemRarity(id: string, category: string): string | null {
        try {
            if (category === 'pet') {
                const pets = (MGData.get('pets') || {}) as Record<string, any>;
                return pets[id]?.rarity || null;
            }
            if (category === 'plant') {
                const plants = (MGData.get('plants') || {}) as Record<string, any>;
                const plant = plants[id];
                if (plant?.seed?.rarity) return plant.seed.rarity;

                // Fallback: look for plant by name in case of slightly different ID mapping
                const lowerId = id.toLowerCase();
                for (const p of Object.values(plants)) {
                    if (p?.seed?.name?.toLowerCase() === lowerId) return p.seed.rarity;
                    if (p?.plant?.name?.toLowerCase() === lowerId) return p.seed.rarity;
                }
            }
        } catch (e) { }
        return null;
    }

    private async saveConfig(): Promise<void> {
        storageSet(FEATURE_KEYS.AUTO_FAVORITE_UI, this.config);
        try {
            const { setEnabled, updateSimpleConfig } = MGAutoFavorite;
            await updateSimpleConfig({
                enabled: this.config.enabled,
                favoriteSpecies: [...this.config.favoriteProduceList, ...this.config.favoritePetsList],
                favoriteMutations: this.config.favoriteMutations,
            });
            await setEnabled(this.config.enabled);
        } catch (error) {
            console.error('[AutoFavorite UI] Failed to apply config:', error);
        }
    }
}
