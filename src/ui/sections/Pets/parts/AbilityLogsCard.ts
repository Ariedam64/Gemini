/**
 * Ability Logs Card Part
 * Displays a log of pet ability activations with filtering
 * Uses a responsive card-based layout for better mobile experience
 */

import { Card } from "../../../components/Card/Card";
import { SearchBar } from "../../../components/SearchBar/SearchBar";
import { element } from "../../../styles/helpers";
import { MGSprite } from "../../../../modules";

// Template data for demonstration
interface AbilityLog {
    timestamp: number;
    petName: string;
    petSpecies: string;
    abilityName: string;
    data: string;
}

const TEMPLATE_LOGS: AbilityLog[] = [
    {
        timestamp: Date.now() - 5000,
        petName: "Fluffy",
        petSpecies: "Capybara",
        abilityName: "Water Boost",
        data: "+15% water speed"
    },
    {
        timestamp: Date.now() - 60000,
        petName: "Shadow",
        petSpecies: "Cat",
        abilityName: "Night Vision",
        data: "Revealed 3 hidden items"
    },
    {
        timestamp: Date.now() - 120000,
        petName: "Buddy",
        petSpecies: "Dog",
        abilityName: "Treasure Hunter",
        data: "Found: Gold Coin x2"
    },
    {
        timestamp: Date.now() - 180000,
        petName: "Whiskers",
        petSpecies: "Ferret",
        abilityName: "Quick Dig",
        data: "Harvested 5 plots instantly"
    },
    {
        timestamp: Date.now() - 240000,
        petName: "Fluffy",
        petSpecies: "Capybara",
        abilityName: "Water Boost",
        data: "+15% water speed"
    },
    {
        timestamp: Date.now() - 300000,
        petName: "Shadow",
        petSpecies: "Cat",
        abilityName: "Stealth",
        data: "Avoided 2 encounters"
    },
];

export class AbilityLogsCardPart {
    private card: HTMLDivElement | null = null;
    private listContainer: HTMLDivElement | null = null;
    private logs: AbilityLog[] = [];
    private filteredLogs: AbilityLog[] = [];

    build(): HTMLDivElement {
        if (this.card) return this.card;
        return this.createAbilityLogsCard();
    }

    destroy(): void {
        this.card = null;
        this.listContainer = null;
        this.logs = [];
        this.filteredLogs = [];
    }

    render(): void {
        // For now, use template data
        this.logs = TEMPLATE_LOGS;
        this.filteredLogs = [...this.logs];
        this.updateList();
    }

    private createAbilityLogsCard(): HTMLDivElement {
        const container = element("div", {
            className: "ability-logs-container",
            style: "display: flex; flex-direction: column; gap: 12px;"
        }) as HTMLDivElement;

        // Search bar
        const searchContainer = element("div", {
            style: "margin-bottom: 0;"
        }) as HTMLDivElement;

        const search = SearchBar({
            placeholder: "Search logs...",
            value: "",
            debounceMs: 150,
            withClear: true,
            size: "sm",
            focusKey: "",
            onChange: (val) => {
                const query = val.trim().toLowerCase();
                if (query) {
                    this.filteredLogs = this.logs.filter(log =>
                        log.petName.toLowerCase().includes(query) ||
                        log.petSpecies.toLowerCase().includes(query) ||
                        log.abilityName.toLowerCase().includes(query) ||
                        log.data.toLowerCase().includes(query)
                    );
                } else {
                    this.filteredLogs = [...this.logs];
                }
                this.updateTable();
            },
        });
        searchContainer.appendChild(search.root);
        container.appendChild(searchContainer);

        // Table
        const columns: ColDef[] = [
            {
                id: "datetime",
                header: "Date/Time",
                sortable: true,
                width: "140px",
                render: (log: AbilityLog) => {
                    const date = new Date(log.timestamp);
                    const dateStr = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
                    const timeStr = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
                    return element("div", {
                        style: "font-size: 12px; color: var(--fg);"
                    }, `${dateStr} ${timeStr}`);
                }
            },
            {
                id: "pet",
                header: "Pet",
                sortable: true,
                width: "180px",
                render: (log: AbilityLog) => {
                    const petCell = element("div", {
                        style: "display: flex; align-items: center; gap: 8px;"
                    }) as HTMLDivElement;

                    // Pet sprite
                    const spriteContainer = element("div", {
                        style: "width: 32px; height: 32px; flex-shrink: 0;"
                    }) as HTMLDivElement;

                    try {
                        const canvas = MGSprite.toCanvas("pet", log.petSpecies);
                        if (canvas) {
                            canvas.style.width = "100%";
                            canvas.style.height = "100%";
                            canvas.style.objectFit = "contain";
                            spriteContainer.appendChild(canvas);
                        }
                    } catch (error) {
                        // Fallback if sprite fails
                        spriteContainer.textContent = "🐾";
                        spriteContainer.style.display = "flex";
                        spriteContainer.style.alignItems = "center";
                        spriteContainer.style.justifyContent = "center";
                        spriteContainer.style.fontSize = "20px";
                    }

                    // Pet name
                    const nameEl = element("div", {
                        style: "font-size: 13px; font-weight: 600; color: var(--fg); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"
                    }, log.petName);

                    petCell.appendChild(spriteContainer);
                    petCell.appendChild(nameEl);
                    return petCell;
                }
            },
            {
                id: "ability",
                header: "Ability",
                sortable: true,
                width: "150px",
                render: (log: AbilityLog) => {
                    return element("div", {
                        style: "font-size: 13px; font-weight: 600; color: var(--fg);"
                    }, log.abilityName);
                }
            },
            {
                id: "data",
                header: "Data",
                sortable: false,
                render: (log: AbilityLog) => {
                    return element("div", {
                        style: "font-size: 12px; color: color-mix(in oklab, var(--fg) 80%, #9ca3af); overflow: hidden; text-overflow: ellipsis;"
                    }, log.data);
                }
            }
        ];

        this.tableHandle = Table({
            columns,
            data: [],
            maxRows: 6,
            emptyText: "No ability logs yet",
        });

        container.appendChild(this.tableHandle.root);

        this.card = Card({
            title: "Ability Logs",
            subtitle: "Track all pet ability activations",
            expandable: true,
            defaultExpanded: true,
        }, container);

        return this.card;
    }

    private updateTable(): void {
        if (!this.tableHandle) return;

        // Sort by timestamp descending (most recent first)
        const sortedLogs = [...this.filteredLogs].sort((a, b) => b.timestamp - a.timestamp);

        this.tableHandle.setData(sortedLogs);
    }
}
