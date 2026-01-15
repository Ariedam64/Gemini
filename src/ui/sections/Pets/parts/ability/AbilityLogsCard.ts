/**
 * Ability Logs Card Part
 * Displays a log of pet ability activations with filtering
 * Uses a responsive card-based layout for better mobile experience
 */

import { Card } from "../../../../components/Card/Card";
import { SearchBar } from "../../../../components/SearchBar/SearchBar";
import { Badge } from "../../../../components/Badge/Badge";
import { element } from "../../../../styles/helpers";
import { MGSprite, MGData, formatAbilityLog } from "../../../../../modules";
import { getMyPets } from "../../../../../globals/variables/myPets";
import type { Unsubscribe, AbilityLog } from "../../../../../globals/core/types";

// UI display format
interface AbilityLogDisplay {
    timestamp: number;
    petName: string;
    petSpecies: string;
    abilityName: string;
    abilityId: string;
    description: string;
    formattedDate: string; // Pre-calculated for performance
}

export class AbilityLogsCardPart {
    private card: HTMLDivElement | null = null;
    private listContainer: HTMLDivElement | null = null;
    private innerContent: HTMLDivElement | null = null; // Inner scrollable container for virtual scrolling
    private logs: AbilityLogDisplay[] = [];
    private filteredLogs: AbilityLogDisplay[] = [];
    private unsubscribe: Unsubscribe | null = null;

    // Virtual scrolling config
    private readonly ITEM_HEIGHT = 88; // Estimated height of each log item (padding + content + gap)
    private readonly BUFFER_SIZE = 3; // Number of items to render before/after viewport
    private readonly VIEWPORT_HEIGHT = 480; // Match the max-height in CSS
    private renderedRange: { start: number; end: number } = { start: 0, end: 0 };
    private scrollListener: (() => void) | null = null;
    private scrollScheduled: boolean = false; // Throttle scroll events

    build(): HTMLDivElement {
        if (this.card) return this.card;
        return this.createAbilityLogsCard();
    }

    destroy(): void {
        if (this.scrollListener && this.listContainer) {
            this.listContainer.removeEventListener("scroll", this.scrollListener);
            this.scrollListener = null;
        }
        if (this.unsubscribe) {
            this.unsubscribe();
            this.unsubscribe = null;
        }
        this.card = null;
        this.listContainer = null;
        this.innerContent = null;
        this.logs = [];
        this.filteredLogs = [];
    }

    async render(): Promise<void> {
        // Load initial ability logs
        const myPets = getMyPets();
        const initialLogs = myPets.get().abilityLogs;
        this.updateFromAbilityLogs(initialLogs);

        // Subscribe only to new ability triggers (not all myPets changes)
        this.unsubscribe = myPets.subscribeAbility(() => {
            // When a new ability is triggered, reload logs from myPets
            const updatedLogs = myPets.get().abilityLogs;
            this.updateFromAbilityLogs(updatedLogs);
        });
    }

    private updateFromAbilityLogs(abilityLogs: AbilityLog[]): void {
        if (!abilityLogs || !Array.isArray(abilityLogs)) {
            this.logs = [];
            this.filteredLogs = [];
            this.updateList();
            return;
        }

        // Transform to display format (pre-calculate expensive values)
        this.logs = abilityLogs.map((log) => {
            // Get ability name from MGData
            const abilities = MGData.get("abilities") as Record<string, { name?: string }> | null;
            const ability = abilities?.[log.abilityId];
            const abilityName = ability?.name || log.abilityId || "Unknown Ability";

            // Format description using activity log data
            const fakeEntry = {
                action: log.abilityId,
                timestamp: log.performedAt,
                parameters: (log.data as Record<string, unknown>) || {},
            };
            const description = formatAbilityLog(fakeEntry);

            // Pre-calculate formatted date to avoid Date creation during render
            const date = new Date(log.performedAt);
            const dateStr = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
            const timeStr = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
            const formattedDate = `${dateStr} ${timeStr}`;

            return {
                timestamp: log.performedAt,
                petName: log.petName,
                petSpecies: log.petSpecies,
                abilityName,
                abilityId: log.abilityId,
                description,
                formattedDate, // Pre-calculated
            };
        });

        this.filteredLogs = [...this.logs];
        this.updateList();
    }

    private createAbilityBadge(abilityId: string, abilityName: string): HTMLSpanElement {
        const badge = Badge({
            variant: "ability",
            abilityId,
            abilityName,
        });

        return badge.root;
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
                        log.description.toLowerCase().includes(query)
                    );
                } else {
                    this.filteredLogs = [...this.logs];
                }
                this.updateList();
            },
        });
        searchContainer.appendChild(search.root);
        container.appendChild(searchContainer);

        // List container (scrollable, max height for ~6 items)
        this.listContainer = element("div", {
            className: "ability-logs-list",
            style: "max-height: 480px; overflow-y: auto; overflow-x: hidden; position: relative;"
        }) as HTMLDivElement;

        // Inner content for virtual scrolling (holds spacers + actual items)
        this.innerContent = element("div", {
            style: "display: flex; flex-direction: column; gap: 8px; position: relative;"
        }) as HTMLDivElement;

        this.listContainer.appendChild(this.innerContent);

        // Attach scroll listener for virtual scrolling (throttled via requestAnimationFrame)
        this.scrollListener = () => {
            if (!this.scrollScheduled) {
                this.scrollScheduled = true;
                requestAnimationFrame(() => {
                    this.handleScroll();
                    this.scrollScheduled = false;
                });
            }
        };
        this.listContainer.addEventListener("scroll", this.scrollListener);

        container.appendChild(this.listContainer);

        this.card = Card({
            title: "Ability Logs",
            subtitle: "Track all pet ability activations",
            expandable: true,
            defaultExpanded: true,
        }, container);

        return this.card;
    }

    private updateList(): void {
        if (!this.listContainer || !this.innerContent) return;

        // Clear existing items and reset rendered range
        this.innerContent.replaceChildren();
        this.renderedRange = { start: 0, end: 0 }; // Reset so handleScroll() will re-render

        // Sort by timestamp descending (most recent first)
        const sortedLogs = [...this.filteredLogs].sort((a, b) => b.timestamp - a.timestamp);

        if (sortedLogs.length === 0) {
            const emptyState = element("div", {
                className: "ability-logs-empty",
                style: "padding: 24px; text-align: center; color: color-mix(in oklab, var(--fg) 60%, #9ca3af); font-size: 14px;"
            }, "No ability logs yet");
            this.innerContent.appendChild(emptyState);
            return;
        }

        // Store sorted logs for virtual scrolling
        this.filteredLogs = sortedLogs;

        // Reset scroll position and render initial items
        this.listContainer.scrollTop = 0;
        this.handleScroll();
    }

    private handleScroll(): void {
        if (!this.listContainer || !this.innerContent) return;

        const scrollTop = this.listContainer.scrollTop;
        const itemsPerPage = Math.ceil(this.VIEWPORT_HEIGHT / this.ITEM_HEIGHT);

        // Calculate which items should be visible
        let startIndex = Math.max(0, Math.floor(scrollTop / this.ITEM_HEIGHT) - this.BUFFER_SIZE);
        let endIndex = Math.min(
            this.filteredLogs.length,
            startIndex + itemsPerPage + this.BUFFER_SIZE * 2
        );

        // Only re-render if the range changed
        if (startIndex === this.renderedRange.start && endIndex === this.renderedRange.end) {
            return;
        }

        this.renderedRange = { start: startIndex, end: endIndex };

        // Clear inner content
        this.innerContent.replaceChildren();

        // Top spacer (represents items before startIndex)
        const topSpacerHeight = startIndex * this.ITEM_HEIGHT;
        if (topSpacerHeight > 0) {
            const topSpacer = element("div", {
                style: `height: ${topSpacerHeight}px; flex-shrink: 0;`
            }) as HTMLDivElement;
            this.innerContent.appendChild(topSpacer);
        }

        // Render visible items
        for (let i = startIndex; i < endIndex; i++) {
            const log = this.filteredLogs[i];
            const logCard = this.createLogItemCard(log);
            this.innerContent.appendChild(logCard);
        }

        // Bottom spacer (represents items after endIndex)
        const bottomSpacerHeight = Math.max(0, (this.filteredLogs.length - endIndex) * this.ITEM_HEIGHT);
        if (bottomSpacerHeight > 0) {
            const bottomSpacer = element("div", {
                style: `height: ${bottomSpacerHeight}px; flex-shrink: 0;`
            }) as HTMLDivElement;
            this.innerContent.appendChild(bottomSpacer);
        }
    }

    private createLogItemCard(log: AbilityLogDisplay): HTMLDivElement {
        const logItem = element("div", {
            className: "ability-log-item",
            style: "background: var(--soft); border: 1px solid var(--border); border-radius: 8px; padding: 12px; display: flex; gap: 12px; align-items: center; transition: all 0.2s ease;"
        }) as HTMLDivElement;

        // Use pointerenter/pointerleave for better touch support and performance
        logItem.addEventListener("pointerenter", function(this: HTMLDivElement) {
            this.style.background = "color-mix(in oklab, var(--soft) 90%, var(--fg) 10%)";
            this.style.borderColor = "color-mix(in oklab, var(--border) 70%, var(--fg) 30%)";
        });
        logItem.addEventListener("pointerleave", function(this: HTMLDivElement) {
            this.style.background = "var(--soft)";
            this.style.borderColor = "var(--border)";
        });

        // Pet sprite
        const spriteContainer = element("div", {
            style: "width: 40px; height: 40px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: var(--muted); border-radius: 6px;"
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
            spriteContainer.textContent = "🐾";
            spriteContainer.style.fontSize = "24px";
        }

        logItem.appendChild(spriteContainer);

        // Content area
        const content = element("div", {
            style: "flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px;"
        }) as HTMLDivElement;

        // Top row: Pet name + Date/time
        const topRow = element("div", {
            style: "display: flex; align-items: center; justify-content: space-between; gap: 8px;"
        }) as HTMLDivElement;

        const petName = element("div", {
            style: "font-size: 14px; font-weight: 700; color: var(--fg); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"
        }, log.petName);

        // Use pre-calculated date from updateFromAbilityLogs (avoid Date creation during render)
        const timestamp = element("div", {
            style: "font-size: 11px; font-weight: 500; color: color-mix(in oklab, var(--fg) 60%, #9ca3af); white-space: nowrap;"
        }, log.formattedDate);

        topRow.appendChild(petName);
        topRow.appendChild(timestamp);
        content.appendChild(topRow);

        // Middle row: Ability badge with dynamic color
        const abilityBadge = this.createAbilityBadge(log.abilityId, log.abilityName);
        content.appendChild(abilityBadge);

        // Bottom row: Description
        const descriptionText = element("div", {
            style: "font-size: 12px; color: color-mix(in oklab, var(--fg) 70%, #9ca3af); line-height: 1.4; overflow: hidden; text-overflow: ellipsis;"
        }, log.description);

        content.appendChild(descriptionText);

        logItem.appendChild(content);

        return logItem;
    }
}
