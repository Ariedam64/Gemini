/**
 * Journal Checker HUD Section
 * Displays collection progress in the Gemini side panel
 * 
 * Uses the comprehensive JournalProgress data from journalChecker feature
 */

import { BaseSection } from "../core/Section";
import { Card } from "../../components/Card/Card";
import { Label } from "../../components/Label/Label";
import { Button } from "../../components/Button/Button";
import { element } from "../../styles/helpers";
import type { JournalProgress, CategoryProgress, SpeciesProgress } from "../../../modules/journalChecker";

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
            const { aggregateJournalProgress } = await import('../../../modules/journalChecker');
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

        // Overall progress summary
        section.appendChild(this.createSummaryCard());

        // Detailed progress cards
        section.appendChild(this.createCategoryCard('🌱 Produce', this.progress.plants));
        section.appendChild(this.createCategoryCard('🐾 Pets', this.progress.pets, true));

        // Actions
        section.appendChild(this.createActionsCard());
    }

    private createLoadingCard(): HTMLDivElement {
        return Card(
            { title: "Loading...", padding: "lg" },
            element("p", {}, "Fetching journal data...")
        );
    }

    private createSummaryCard(): HTMLDivElement {
        if (!this.progress) return element("div") as HTMLDivElement;

        const plantsRow = this.createProgressRow(
            "🌱 Produce Species",
            this.progress.plants.logged,
            this.progress.plants.total,
            this.progress.plants.percentage
        );

        const plantsVariantsRow = this.createProgressRow(
            "   Variants Logged",
            this.progress.plants.variantsLogged,
            this.progress.plants.variantsTotal,
            this.progress.plants.variantsPercentage
        );

        const petsRow = this.createProgressRow(
            "🐾 Pet Species",
            this.progress.pets.logged,
            this.progress.pets.total,
            this.progress.pets.percentage
        );

        const petsVariantsRow = this.createProgressRow(
            "   Variants Logged",
            this.progress.pets.variantsLogged,
            this.progress.pets.variantsTotal,
            this.progress.pets.variantsPercentage
        );

        const petsAbilitiesRow = this.progress.pets.abilitiesTotal ? this.createProgressRow(
            "   Abilities Logged",
            this.progress.pets.abilitiesLogged ?? 0,
            this.progress.pets.abilitiesTotal,
            this.progress.pets.abilitiesPercentage ?? 0
        ) : null;

        const children = [plantsRow, plantsVariantsRow, petsRow, petsVariantsRow];
        if (petsAbilitiesRow) children.push(petsAbilitiesRow);

        return Card(
            { title: "Collection Progress", padding: "lg", expandable: true, defaultExpanded: true },
            ...children
        );
    }

    private createCategoryCard(title: string, category: CategoryProgress, showAbilities = false): HTMLDivElement {
        // Show top 5 incomplete species
        const incomplete = category.speciesDetails
            .filter(s => !s.isComplete)
            .sort((a, b) => b.variantsPercentage - a.variantsPercentage)
            .slice(0, 5);

        const content = element("div", { style: "display: flex; flex-direction: column; gap: 8px;" }) as HTMLDivElement;

        if (incomplete.length === 0) {
            const complete = element("div", {
                style: "color: var(--accent); font-size: 13px; text-align: center; padding: 8px;"
            }, "✅ All species complete!");
            content.appendChild(complete);
        } else {
            for (const species of incomplete) {
                content.appendChild(this.createSpeciesRow(species, showAbilities));
            }

            const moreCount = category.speciesDetails.filter(s => !s.isComplete).length - 5;
            if (moreCount > 0) {
                const more = element("div", {
                    style: "font-size: 12px; color: var(--muted); text-align: center; padding-top: 4px;"
                }, `...and ${moreCount} more species`);
                content.appendChild(more);
            }
        }

        return Card(
            { title, padding: "lg", expandable: true, defaultExpanded: false },
            content
        );
    }

    private createSpeciesRow(species: SpeciesProgress, showAbilities = false): HTMLDivElement {
        const row = element("div", {
            style: "display: flex; flex-direction: column; gap: 4px; padding: 6px 0; border-bottom: 1px solid var(--soft);"
        }) as HTMLDivElement;

        // Species name and completion
        const header = element("div", { style: "display: flex; justify-content: space-between; align-items: center;" });
        const name = element("span", { style: "font-weight: 500; font-size: 13px;" }, species.species);
        const completion = element("span", {
            style: `font-size: 12px; color: ${species.isComplete ? 'var(--accent)' : 'var(--muted)'}`
        }, species.isComplete ? '✅ Complete' : `${Math.round(species.variantsPercentage)}%`);
        header.append(name, completion);

        // Missing variants (compact)
        const missingVariants = species.variantsMissing.slice(0, 4);
        const variantsText = missingVariants.length > 0
            ? `Missing: ${missingVariants.join(', ')}${species.variantsMissing.length > 4 ? '...' : ''}`
            : 'All variants logged';
        const variants = element("div", {
            style: "font-size: 11px; color: var(--muted);"
        }, variantsText);

        row.append(header, variants);

        // Missing abilities (for pets)
        if (showAbilities && species.abilitiesMissing && species.abilitiesMissing.length > 0) {
            const missingAbilities = species.abilitiesMissing.slice(0, 3);
            const abilitiesText = `Abilities: ${missingAbilities.join(', ')}${species.abilitiesMissing.length > 3 ? '...' : ''}`;
            const abilities = element("div", {
                style: "font-size: 11px; color: var(--muted);"
            }, abilitiesText);
            row.appendChild(abilities);
        }

        return row;
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
        width: ${Math.min(100, percentage)}%;
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
            label: "📋 Log Missing",
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

    private async showMissingItems(): Promise<void> {
        if (!this.progress) return;

        try {
            const { getMissingSummary } = await import('../../../modules/journalChecker');
            const summary = await getMissingSummary();

            if (summary.plants.length === 0 && summary.pets.length === 0) {
                console.log('🎉 [JournalChecker] Collection complete!');
                return;
            }

            console.group('📋 Missing Journal Entries');

            if (summary.plants.length > 0) {
                console.group(`🌱 Produce (${summary.plants.length} species incomplete)`);
                for (const plant of summary.plants) {
                    console.log(`${plant.species}: ${plant.missing.join(', ')}`);
                }
                console.groupEnd();
            }

            if (summary.pets.length > 0) {
                console.group(`🐾 Pets (${summary.pets.length} species incomplete)`);
                for (const pet of summary.pets) {
                    const parts: string[] = [];
                    if (pet.missingVariants.length > 0) {
                        parts.push(`Variants: ${pet.missingVariants.join(', ')}`);
                    }
                    if (pet.missingAbilities.length > 0) {
                        parts.push(`Abilities: ${pet.missingAbilities.join(', ')}`);
                    }
                    console.log(`${pet.species}: ${parts.join(' | ')}`);
                }
                console.groupEnd();
            }

            console.groupEnd();
        } catch (error) {
            console.error('[JournalChecker] Failed to get missing summary:', error);
        }
    }
}
