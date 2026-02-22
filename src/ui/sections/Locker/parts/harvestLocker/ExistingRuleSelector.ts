/**
 * Existing Rule Selector Modal
 * Allows selecting an existing overall rule and assigning it to a species
 *
 * Refactored to use Modal component
 */

import { element } from "../../../../styles/helpers";
import { Modal, type ModalHandle } from "../../../../components/Modal/Modal";
import { Button } from "../../../../components/Button/Button";
import { MGHarvestLocker } from "../../../../../features/harvestLocker";
import type { HarvestRule } from "../../../../../features/harvestLocker";
import type { ExistingRuleSelectorOptions, ExistingRuleSelectorHandle } from "./types";
import { renderPlantSprite } from "./helpers";

/* ─────────────────────────── Factory ─────────────────────────── */

export function createExistingRuleSelector(
    options: ExistingRuleSelectorOptions
): ExistingRuleSelectorHandle {
    const { species, existingRules, onSelect, onCancel } = options;

    let modalHandle: ModalHandle | null = null;

    // Build content
    const content = buildContent();
    const footer = buildFooter();

    // Create modal
    modalHandle = Modal({
        title: buildModalTitle(),
        subtitle: "Select a rule to assign to this species",
        content,
        footer,
        size: "md",
        closeOnBackdrop: true,
        closeOnEscape: true,
        onClose: () => {
            onCancel?.();
        },
    });

    /* ───────────────────── Title Building ───────────────────── */

    function buildModalTitle(): Node {
        const titleRow = element("div", {
            style: "display: flex; align-items: center; gap: 10px;",
        });

        const spriteContainer = element("div", {
            style: "width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;",
        });
        renderPlantSprite(species, spriteContainer, { size: 24 });
        titleRow.appendChild(spriteContainer);

        titleRow.appendChild(element("span", {}, `${species} — Assign Rule`));

        return titleRow;
    }

    /* ───────────────────── Content Building ───────────────────── */

    function buildContent(): HTMLElement {
        const container = element("div", {
            style: "display: flex; flex-direction: column; gap: 8px;",
        });

        if (existingRules.length === 0) {
            const empty = element("div", {
                style: "padding: 20px; text-align: center; color: var(--muted); font-size: 14px;",
            }, "No overall rules available");
            container.appendChild(empty);
        } else {
            existingRules.forEach((rule) => {
                container.appendChild(createRuleItem(rule));
            });
        }

        return container;
    }

    function buildFooter(): HTMLElement {
        const footer = element("div", {
            style: "display: flex; gap: 8px; justify-content: flex-end;",
        });

        const cancelBtn = Button({
            label: "Cancel",
            variant: "default",
            onClick: () => {
                onCancel?.();
                destroy();
            },
        });
        footer.appendChild(cancelBtn);

        return footer;
    }

    function createRuleItem(rule: HarvestRule): HTMLElement {
        // Reuse card styles for border/bg/hover, override to column layout
        const item = element("div", {
            className: "harvest-locker-rule-item",
            style: "flex-direction: column; align-items: flex-start; gap: 8px;",
        });

        item.addEventListener("click", () => {
            MGHarvestLocker.cloneRuleToSpecies(rule.id, species);
            onSelect(rule.id);
            destroy();
        });

        // Header row: name + mode badge
        const headerRow = element("div", {
            style: "display: flex; align-items: center; justify-content: space-between; width: 100%;",
        });
        headerRow.appendChild(element("div", {
            className: "harvest-locker-rule-item__name",
        }, rule.name));
        headerRow.appendChild(element("div", {
            className: "harvest-locker-rule-item__badge",
        }, rule.mode));
        item.appendChild(headerRow);

        // Condition tags
        const tags = buildConditionTags(rule);
        if (tags.childNodes.length > 0) {
            item.appendChild(tags);
        }

        return item;
    }

    function buildConditionTags(rule: HarvestRule): HTMLElement {
        const row = element("div", {
            style: "display: flex; flex-wrap: wrap; gap: 4px;",
        });

        if (rule.sizeCondition?.enabled) {
            row.appendChild(createTag(`Size ≥ ${rule.sizeCondition.minPercentage}%`));
        }

        if (rule.mutationCondition?.enabled) {
            rule.mutationCondition.mutations.forEach((m) => {
                row.appendChild(createTag(m === "none" ? "Normal" : m));
            });
        }

        return row;
    }

    function createTag(label: string): HTMLElement {
        return element("div", {
            style: `
                padding: 2px 8px;
                border-radius: 10px;
                font-size: 11px;
                font-weight: 500;
                color: color-mix(in oklab, var(--fg) 75%, transparent);
                background: color-mix(in oklab, var(--fg) 8%, transparent);
                border: 1px solid color-mix(in oklab, var(--border) 60%, transparent);
            `,
        }, label);
    }

    /* ───────────────────── Public API ───────────────────── */

    function destroy(): void {
        modalHandle?.destroy();
        modalHandle = null;
    }

    return {
        root: modalHandle.root,
        destroy,
    };
}

// Re-export types for backward compatibility
export type { ExistingRuleSelectorOptions, ExistingRuleSelectorHandle } from "./types";
