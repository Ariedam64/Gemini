/**
 * Feature Settings Section
 * Unified settings panel for all migrated QPM features
 */

import { element } from "../../styles/helpers";
import { BaseSection } from "../core/Section";
import { Card } from "../../components/Card/Card";
import { Label } from "../../components/Label/Label";
import { Switch } from "../../components/Switch/Switch";
import { storageGet, storageSet } from "../../../utils/storage";

/* ───────────────────────── Feature Configurations ───────────────────────── */

interface FeatureConfig {
    autoFavorite: { enabled: boolean };
    bulkFavorite: { enabled: boolean };
    journalChecker: { enabled: boolean };
    cropSizeIndicator: { enabled: boolean; showForGrowing: boolean; showForMature: boolean; showJournalBadges: boolean };
    eggProbabilityIndicator: { enabled: boolean };
    cropValueIndicator: { enabled: boolean };
    xpTracker: { enabled: boolean };
    abilityTracker: { enabled: boolean };
    mutationTracker: { enabled: boolean };
    cropBoostTracker: { enabled: boolean };
    turtleTimer: { enabled: boolean };
}

const DEFAULT_CONFIG: FeatureConfig = {
    autoFavorite: { enabled: false },
    bulkFavorite: { enabled: false },
    journalChecker: { enabled: false },
    cropSizeIndicator: { enabled: false, showForGrowing: true, showForMature: true, showJournalBadges: true },
    eggProbabilityIndicator: { enabled: false },
    cropValueIndicator: { enabled: false },
    xpTracker: { enabled: false },
    abilityTracker: { enabled: false },
    mutationTracker: { enabled: false },
    cropBoostTracker: { enabled: false },
    turtleTimer: { enabled: false },
};

/* ───────────────────────── Feature Settings Section ───────────────────────── */

export class FeatureSettingsSection extends BaseSection {
    private config: FeatureConfig = DEFAULT_CONFIG;

    constructor() {
        super({ id: "tab-feature-settings", label: "Features" });
    }

    protected async build(container: HTMLElement): Promise<void> {
        const section = this.createGrid("12px");
        section.id = "feature-settings";
        container.appendChild(section);

        this.config = storageGet<FeatureConfig>('gemini:features:config', DEFAULT_CONFIG);

        section.appendChild(this.createQOLCard());
        section.appendChild(this.createVisualIndicatorsCard());
        section.appendChild(this.createTrackingCard());
    }

    private createQOLCard(): HTMLDivElement {
        return Card(
            { title: "Quality of Life", padding: "lg", expandable: true, defaultExpanded: true },
            this.createToggleRow("Auto-Favorite", this.config.autoFavorite.enabled, (v: boolean) => {
                this.config.autoFavorite.enabled = v;
                this.saveConfig();
            }),
            this.createToggleRow("Bulk Favorite", this.config.bulkFavorite.enabled, (v: boolean) => {
                this.config.bulkFavorite.enabled = v;
                this.saveConfig();
            }),
            this.createToggleRow("Journal Checker", this.config.journalChecker.enabled, (v: boolean) => {
                this.config.journalChecker.enabled = v;
                this.saveConfig();
            })
        );
    }

    private createVisualIndicatorsCard(): HTMLDivElement {
        return Card(
            { title: "Visual Indicators", variant: "soft", padding: "lg", expandable: true, defaultExpanded: true },
            this.createToggleRow("Crop Size", this.config.cropSizeIndicator.enabled, (v: boolean) => {
                this.config.cropSizeIndicator.enabled = v;
                this.saveConfig();
            }, "Shows size % and journal badges"),
            this.createToggleRow("Egg Probability", this.config.eggProbabilityIndicator.enabled, (v: boolean) => {
                this.config.eggProbabilityIndicator.enabled = v;
                this.saveConfig();
            }, "Shows hatch chances + mutation %"),
            this.createToggleRow("Crop Value", this.config.cropValueIndicator.enabled, (v: boolean) => {
                this.config.cropValueIndicator.enabled = v;
                this.saveConfig();
            }, "Shows coin value")
        );
    }

    private createTrackingCard(): HTMLDivElement {
        return Card(
            { title: "Tracking & Analytics", variant: "soft", padding: "lg", expandable: true, defaultExpanded: false },
            this.createToggleRow("XP Tracker", this.config.xpTracker.enabled, (v: boolean) => {
                this.config.xpTracker.enabled = v;
                this.saveConfig();
            }),
            this.createToggleRow("Ability Tracker", this.config.abilityTracker.enabled, (v: boolean) => {
                this.config.abilityTracker.enabled = v;
                this.saveConfig();
            }),
            this.createToggleRow("Mutation Tracker", this.config.mutationTracker.enabled, (v: boolean) => {
                this.config.mutationTracker.enabled = v;
                this.saveConfig();
            }),
            this.createToggleRow("Crop Boost Tracker", this.config.cropBoostTracker.enabled, (v: boolean) => {
                this.config.cropBoostTracker.enabled = v;
                this.saveConfig();
            }),
            this.createToggleRow("Turtle Timer", this.config.turtleTimer.enabled, (v: boolean) => {
                this.config.turtleTimer.enabled = v;
                this.saveConfig();
            })
        );
    }

    private createToggleRow(label: string, enabled: boolean, onChange: (val: boolean) => void, description?: string): HTMLDivElement {
        const container = element("div", { className: description ? "kv-col" : "kv" }) as HTMLDivElement;

        const row = element("div", { className: "kv" }) as HTMLDivElement;
        const labelEl = Label({ text: label, tone: "default", size: "md" });
        const switchEl = Switch({ checked: enabled, onChange });

        row.append(labelEl.root, switchEl.root);

        if (description) {
            container.appendChild(row);
            const desc = element("p", { className: "helper-text", style: "font-size: 12px; color: var(--item-desc, var(--muted)); margin-top: 4px;" }, description);
            container.appendChild(desc);
            return container;
        }

        return row;
    }

    private saveConfig(): void {
        storageSet('gemini:features:config', this.config);
        console.log('[FeatureSettings] Config saved:', this.config);
    }
}
