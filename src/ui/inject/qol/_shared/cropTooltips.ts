import { resolveSpeciesId } from './names';

export interface CropTooltipInfo {
    root: HTMLElement;
    infoContainer: HTMLElement;
    nameEl: HTMLElement;
    speciesId: string | null;
}

const CROP_CONTAINER_CLASS_MATURE = 'css-qnqsp4';
const CROP_CONTAINER_CLASS_GROWTH = 'css-v439q6';

const TOOLTIP_SELECTORS = [
    `.${CROP_CONTAINER_CLASS_MATURE}`,
    `.${CROP_CONTAINER_CLASS_GROWTH}`,
    '[role="tooltip"]',
    '.chakra-tooltip',
    '[data-popper-placement]',
];

const NAME_SELECTOR = 'p.chakra-text, span.chakra-text, div.chakra-text, p, span';

function isVisible(el: HTMLElement): boolean {
    const style = window.getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden') return false;
    const opacity = parseFloat(style.opacity || '1');
    if (Number.isFinite(opacity) && opacity <= 0) return false;
    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
}

function isKnownCropContainer(el: HTMLElement): boolean {
    return el.classList.contains(CROP_CONTAINER_CLASS_MATURE) || el.classList.contains(CROP_CONTAINER_CLASS_GROWTH);
}

function looksLikeNoise(text: string): boolean {
    if (!text) return true;
    if (text.length < 2 || text.length > 40) return true;
    if (/%|^\d+\/\d+$/i.test(text)) return true;
    if (/kg/i.test(text)) return true;
    if (/^size:/i.test(text)) return true;
    return false;
}

function hasCropHints(root: HTMLElement): boolean {
    const text = root.textContent ?? '';
    if (/\bkg\b/i.test(text)) return true;
    if (/(Gold|Rainbow|Wet|Chilled|Frozen|Dawnlit|Dawnbound|Amberlit|Amberbound)/i.test(text)) return true;
    return false;
}

function findNameElement(root: HTMLElement): { nameEl: HTMLElement; speciesId: string | null } | null {
    const candidates = root.querySelectorAll<HTMLElement>(NAME_SELECTOR);
    let fallback: HTMLElement | null = null;

    for (const el of candidates) {
        const text = el.textContent?.trim() ?? '';
        if (looksLikeNoise(text)) continue;

        const resolution = resolveSpeciesId(text);
        if (resolution?.type === 'crop') {
            return { nameEl: el, speciesId: resolution.id };
        }

        if (!fallback) {
            fallback = el;
        }
    }

    if (fallback) {
        return { nameEl: fallback, speciesId: null };
    }

    return null;
}

function buildTooltipInfo(root: HTMLElement): CropTooltipInfo | null {
    if (!isVisible(root)) return null;

    const nameInfo = findNameElement(root);
    if (!nameInfo) return null;

    if (nameInfo.nameEl.closest('button.chakra-button')) return null;

    const knownContainer = isKnownCropContainer(root);
    if (!knownContainer && !nameInfo.speciesId && !hasCropHints(root)) {
        return null;
    }

    const infoContainer =
        (nameInfo.nameEl.closest('.McFlex') as HTMLElement | null) ||
        nameInfo.nameEl.parentElement ||
        root;

    return {
        root,
        infoContainer,
        nameEl: nameInfo.nameEl,
        speciesId: nameInfo.speciesId,
    };
}

function collectCandidates(scope: ParentNode): HTMLElement[] {
    const selector = TOOLTIP_SELECTORS.join(',');
    const nodes = scope.querySelectorAll<HTMLElement>(selector);
    return Array.from(nodes);
}

export function findCropTooltipInfos(): CropTooltipInfo[] {
    const candidates = collectCandidates(document);
    const unique = new Set<HTMLElement>();
    const results: CropTooltipInfo[] = [];

    for (const candidate of candidates) {
        if (unique.has(candidate)) continue;
        unique.add(candidate);
        const info = buildTooltipInfo(candidate);
        if (info) results.push(info);
    }

    return results;
}

export function findCropTooltipInfosFromNode(node: HTMLElement): CropTooltipInfo[] {
    const selector = TOOLTIP_SELECTORS.join(',');
    const candidates: HTMLElement[] = [];

    if (node.matches(selector)) {
        candidates.push(node);
    }

    candidates.push(...collectCandidates(node));

    const unique = new Set<HTMLElement>();
    const results: CropTooltipInfo[] = [];

    for (const candidate of candidates) {
        if (unique.has(candidate)) continue;
        unique.add(candidate);
        const info = buildTooltipInfo(candidate);
        if (info) results.push(info);
    }

    return results;
}
