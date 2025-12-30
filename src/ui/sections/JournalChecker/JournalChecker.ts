/**
 * Journal Checker HUD Section
 * Displays collection progress in the Gemini side panel
 */

import { BaseSection } from "../core/Section";
import { Card } from "../../components/Card/Card";
import { Label } from "../../components/Label/Label";
import { Button } from "../../components/Button/Button";
import { element } from "../../styles/helpers";
import type { JournalProgress } from "../../../features/journalChecker";

export class JournalCheckerSection extends BaseSection {
    private progress: JournalProgress | null = null;

    constructor() {
        super({ id: "tab-journal-checker", label: "Journal" });
    }

    protected async build(container: HTMLElement): Promise<void> {
        this.container = container;
        const section = this.createGrid("12px");
        section.id = "journal-checker";
        container.appendChild(section);

        // Initial render
        await this.updateProgress();

        // Listen for updates
        const updateHandler = ((e: CustomEvent) => {
            this.progress = e.detail;
            this.renderContent();
        }) as EventListener;

        window.addEventListener('gemini:journal-updated', updateHandler);

        this.addCleanup(() => {
            window.removeEventListener('gemini:journal-updated', updateHandler);
        });
    }

    private async updateProgress(): Promise<void> {
        try {
            const { aggregateJournalProgress } = await import('../../../features/journalChecker');
            this.progress = await aggregateJournalProgress();
            this.renderContent();
        } catch (error) {
            console.error('[JournalChecker] Failed to load progress:', error);
        }
    }

    private renderContent(): void {
        if (!this.container) return;

        const section = this.container.querySelector('#journal-checker');
        if (!section) return;

        // Clear existing content
        section.innerHTML = '';

        if (!this.progress) {
            section.appendChild(this.createLoadingCard());
            return;
        }

        // Progress cards
        section.appendChild(this.createProgressCard());
        section.appendChild(this.createActionsCard());
    }

    private createLoadingCard(): HTMLDivElement {
        return Card(
            { title: "Loading...", padding: "lg" },
            element("p", {}, "Fetching journal data...")
        );
    }

    private createProgressCard(): HTMLDivElement {
        if (!this.progress) return element("div") as HTMLDivElement;

        const plantsRow = this.createProgressRow(
            "🌱 Plants",
            this.progress.plants.logged,
            this.progress.plants.total,
            this.progress.plants.percentage
        );

        const petsRow = this.createProgressRow(
            "🐾 Pets",
            this.progress.pets.logged,
            this.progress.pets.total,
            this.progress.pets.percentage
        );

        const decorRow = this.createProgressRow(
            "🎨 Decor",
            this.progress.decor.logged,
            this.progress.decor.total,
            this.progress.decor.percentage
        );

        return Card(
            { title: "Collection Progress", padding: "lg", expandable: true, defaultExpanded: true },
            plantsRow,
            petsRow,
            decorRow
        );
    }

    private createProgressRow(
        label: string,
        logged: number,
        total: number,
        percentage: number
    ): HTMLDivElement {
        const row = element("div", { className: "kv-col", style: "gap: 6px;" }) as HTMLDivElement;

        const header = element("div", { className: "kv" }) as HTMLDivElement;
        const labelEl = Label({ text: label, tone: "default", size: "md" });
        const countEl = element("span", {
            style: "font-size: 13px; color: var(--item-desc, var(--muted));"
        }, `${logged}/${total}`);

        header.append(labelEl.root, countEl);

        // Progress bar using theme variables
        const progressBar = element("div", {
            style: `
        width: 100%;
        height: 6px;
        background: var(--card-bg, var(--soft));
        border-radius: 3px;
        overflow: hidden;
      `
        }) as HTMLDivElement;

        const progressFill = element("div", {
            style: `
        width: ${percentage}%;
        height: 100%;
        background: linear-gradient(90deg, var(--tab-bg, var(--accent)), var(--group-title, var(--pill-to)));
        transition: width 0.3s ease;
      `
        });

        progressBar.appendChild(progressFill);

        row.append(header, progressBar);
        return row;
    }

    private createActionsCard(): HTMLDivElement {
        const refreshBtn = Button({
            label: "🔄 Refresh",
            variant: "default",
            size: "md",
            onClick: async () => {
                await this.updateProgress();
            }
        });

        const showMissingBtn = Button({
            label: "📋 Show Missing",
            variant: "default",
            size: "md",
            onClick: () => {
                this.showMissingItems();
            }
        });

        const btnContainer = element("div", {
            style: "display: flex; gap: 8px; flex-wrap: wrap;"
        }) as HTMLDivElement;

        btnContainer.append(refreshBtn, showMissingBtn);

        return Card(
            { title: "Actions", variant: "soft", padding: "lg", expandable: true, defaultExpanded: false },
            btnContainer
        );
    }

    private showMissingItems(): void {
        if (!this.progress) return;

        const missing = [
            { category: 'Plants', items: this.progress.plants.missing },
            { category: 'Pets', items: this.progress.pets.missing },
            { category: 'Decor', items: this.progress.decor.missing },
        ].filter(group => group.items.length > 0);

        if (missing.length === 0) {
            console.log('🎉 [JournalChecker] Collection complete!');
            return;
        }

        console.group('📋 Missing Items');
        missing.forEach(group => {
            console.group(`${group.category} (${group.items.length})`);
            group.items.forEach(item => console.log(`- ${item}`));
            console.groupEnd();
        });
        console.groupEnd();
    }
}
