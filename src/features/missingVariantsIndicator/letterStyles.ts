/**
 * Missing Variants Indicator - Variant Letter Styling
 * Uses theme variables and deterministic hue for unknown variants.
 */

export type VariantStyle = {
    letter: string;
    color: string;
    bold: boolean;
    isGradient?: boolean;
};

function normalizeVariantId(variantId: string): string {
    if (variantId === 'Max Weight') return 'MaxWeight';
    return variantId.replace(/\s+/g, '');
}

function styleForKnown(variantId: string): VariantStyle | null {
    switch (variantId) {
        case 'Normal':
            return { letter: 'N', color: 'var(--muted, var(--fg))', bold: false };
        case 'Gold':
            return { letter: 'G', color: 'var(--accent)', bold: true };
        case 'Rainbow':
            return { letter: 'R', color: 'var(--accent-3, var(--accent))', bold: true };
        case 'Max Weight':
            return { letter: 'S', color: 'var(--muted, var(--fg))', bold: false };
        default:
            return null;
    }
}

function stableHue(seed: string): number {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = (hash * 31 + seed.charCodeAt(i)) % 360;
    }
    return hash;
}

function styleForFallback(variantId: string): VariantStyle {
    const hue = stableHue(variantId);
    return {
        letter: variantId.charAt(0).toUpperCase(),
        color: `hsl(${hue} 55% 55%)`,
        bold: false,
    };
}

export function getVariantStyle(variantId: string): VariantStyle {
    return styleForKnown(variantId) ?? styleForFallback(variantId);
}

export function getVariantLetterStyle(variantId: string): { text: string; css: string } {
    const style = getVariantStyle(variantId);
    const weight = style.bold ? 'bold' : 'normal';

    if (style.isGradient) {
        return {
            text: style.letter,
            css: `
      background: ${style.color};
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: ${weight};
      font-size: 11px;
      display: inline-block;
    `,
        };
    }

    return {
        text: style.letter,
        css: `
      color: ${style.color};
      font-weight: ${weight};
      font-size: 11px;
    `,
    };
}
