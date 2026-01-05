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
import { injectStyleOnce } from "../../styles/inject";
import { autoFavoriteSettingsCss } from "./styles.css";
import { initSectionState, getStore } from "./state";
import { MGData, MGSprite } from "../../../modules";
import { MGAutoFavorite } from "../../../features";

const MUTATION_DATA = [
    { id: 'Rainbow', desc: 'All Rainbow items' },
    { id: 'Gold', desc: 'All Gold items' },
    { id: 'Wet', desc: 'All Wet items' },
    { id: 'Chilled', desc: 'All Chilled items' },
    { id: 'Frozen', desc: 'All Frozen items' },
    { id: 'Dawnlit', desc: 'Dawn mutations' },
    { id: 'Dawncharged', desc: 'Dawn charged' },
    { id: 'Ambershine', desc: 'Amber mutations' },
    { id: 'Ambercharged', desc: 'Amber charged' },
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
    private allPlants: string[] = [];
    private allPets: string[] = [];
    private sectionElement: HTMLElement | null = null;

    constructor() {
        super({ id: "tab-auto-favorite", label: "Auto-Favorite" });
    }

    protected async build(container: HTMLElement): Promise<void> {
        // Initialize persistent state (per ui/sections.md)
        await initSectionState();

        // Inject external stylesheet (per ui/sections.md)
        const shadow = container.getRootNode() as ShadowRoot;
        injectStyleOnce(shadow, autoFavoriteSettingsCss, 'auto-favorite-settings-styles');

        const section = this.createGrid("12px");
        section.id = "auto-favorite-settings";

        this.sectionElement = section;
        container.appendChild(section);

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
            checked: getStore().get().enabled,
            onChange: async (enabled: boolean) => {
                const store = getStore();
                const config = store.get();
                await store.set({ ...config, enabled });
                await this.saveConfig();
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
                `${getStore().get().favoriteMutations.length} / ${MUTATION_DATA.length} active`)
        );
    }

    private createMutationButton(data: typeof MUTATION_DATA[0]): HTMLDivElement {
        let isActive = getStore().get().favoriteMutations.includes(data.id);

        // Build CSS classes for mutation button
        const mutationClass = `mut-btn--${data.id.toLowerCase()}`;
        const classes = ['mut-btn', mutationClass];
        if (isActive) {
            classes.push('active');
        }

        const btn = element("div", {
            className: classes.join(' ')
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

        btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const store = getStore();
            const config = store.get();

            if (isActive) {
                const updated = config.favoriteMutations.filter((m: string) => m !== data.id);
                await store.set({ ...config, favoriteMutations: updated });
                isActive = false;
                btn.classList.remove('active');
            } else {
                const updated = [...config.favoriteMutations, data.id];
                await store.set({ ...config, favoriteMutations: updated });
                isActive = true;
                btn.classList.add('active');
            }

            await this.saveConfig();

            // Update counter without full re-render
            const counter = this.sectionElement?.querySelector('.card p');
            if (counter) {
                counter.textContent = `${getStore().get().favoriteMutations.length} / ${MUTATION_DATA.length} active`;
            }
        });

        return btn;
    }

    private createProduceCard(): HTMLDivElement {
        return this.createItemSelectionCard({
            title: "Produce", items: this.allPlants, category: 'plant', selected: getStore().get().favoriteProduceList,
            onUpdate: async (newList) => {
                const store = getStore();
                const config = store.get();
                await store.set({ ...config, favoriteProduceList: newList });
                await this.saveConfig();
            }
        });
    }

    private createPetsCard(): HTMLDivElement {
        return this.createItemSelectionCard({
            title: "Pets", items: this.allPets, category: 'pet', selected: getStore().get().favoritePetsList,
            onUpdate: async (newList) => {
                const store = getStore();
                const config = store.get();
                await store.set({ ...config, favoritePetsList: newList });
                await this.saveConfig();
            }
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
                style: "width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0; background: color-mix(in oklab, var(--bg) 5%, transparent); border-radius: 6px;"
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
        const config = getStore().get();
        // Store is automatically persisted by createSectionStore

        try {
            const { updateSimpleConfig } = MGAutoFavorite;
            await updateSimpleConfig({
                enabled: config.enabled,
                favoriteSpecies: [...config.favoriteProduceList, ...config.favoritePetsList],
                favoriteMutations: config.favoriteMutations,
            });
        } catch (error) {
            console.error('[AutoFavoriteSettings] Failed to update feature config:', error);
        }
    }
}
