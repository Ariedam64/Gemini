/**
 * Journal Guide - Scoped CSS
 *
 * All classes prefixed with gemini-qol-journalGuide.
 * Covers badges and guide tab content.
 */

const STYLE_ID = 'gemini-qol-journalGuide-styles';

const CSS = `
/* ─── Badge ─── */

.gemini-qol-journalGuide-badge {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 11px;
    line-height: 1.2;
    white-space: nowrap;
    position: absolute;
    right: 80px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 5;
    opacity: 0.95;
    pointer-events: auto;
    cursor: help;
    min-height: 22px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.25);
    transition: opacity 0.2s, transform 0.2s;
    border: 1px solid rgba(255,255,255,0.3);
}

.gemini-qol-journalGuide-badge:hover {
    opacity: 1;
    transform: translateY(-50%) scale(1.05);
    box-shadow: 0 3px 8px rgba(0,0,0,0.3);
}

.gemini-qol-journalGuide-badge[data-active="true"] {
    animation: gemini-qol-journalGuide-pulse 2s ease-in-out infinite;
}

.gemini-qol-journalGuide-badge[data-predicted="true"] {
    opacity: 0.75;
    border: 2px dashed rgba(255,255,255,0.5);
}

.gemini-qol-journalGuide-badge-icon {
    width: 14px;
    height: 14px;
    image-rendering: pixelated;
}

.gemini-qol-journalGuide-badge-icon-fallback {
    font-size: 10px;
    color: #fff;
    font-weight: bold;
}

.gemini-qol-journalGuide-badge-letter {
    display: inline-block;
}

@keyframes gemini-qol-journalGuide-pulse {
    0%, 100% { box-shadow: 0 1px 3px rgba(0,0,0,0.2); }
    50% { box-shadow: 0 1px 8px rgba(255,255,255,0.4), 0 1px 3px rgba(0,0,0,0.2); }
}

/* ─── Shared Scrollbar (used by journalGuide and journalAllTab) ─── */

.gemini-journal-scrollbar::-webkit-scrollbar,
.gemini-qol-journalGuide-scroll::-webkit-scrollbar {
    width: 4px;
    height: 6px;
}

.gemini-journal-scrollbar::-webkit-scrollbar-track,
.gemini-qol-journalGuide-scroll::-webkit-scrollbar-track {
    background: transparent;
}

.gemini-journal-scrollbar::-webkit-scrollbar-thumb,
.gemini-qol-journalGuide-scroll::-webkit-scrollbar-thumb {
    background: rgba(85, 48, 20, 0.2);
    border-radius: 3px;
}

.gemini-journal-scrollbar::-webkit-scrollbar-thumb:hover,
.gemini-qol-journalGuide-scroll::-webkit-scrollbar-thumb:hover {
    background: rgba(110, 60, 24, 0.3);
}

/* ─── Responsive Badge Sizing ─── */

@media (max-width: 480px) {
    .gemini-qol-journalGuide-badge {
        font-size: 10px;
        padding: 2px 6px;
        right: 72px;
    }
    .gemini-qol-journalGuide-badge-icon {
        width: 12px;
        height: 12px;
    }
    .gemini-qol-journalGuide-row {
        grid-template-columns: 36px 1fr;
        gap: 4px;
        padding: 4px 2px;
    }
}

@media (max-width: 360px) {
    .gemini-qol-journalGuide-badge {
        font-size: 9px;
        padding: 1px 5px;
        right: 64px;
    }
    .gemini-qol-journalGuide-badge-icon {
        width: 10px;
        height: 10px;
    }
    .gemini-qol-journalGuide-row {
        grid-template-columns: 30px 1fr;
        gap: 3px;
        padding: 3px 2px;
    }
}

/* ─── Reduced Motion Support ─── */

@media (prefers-reduced-motion: reduce) {
    .gemini-qol-journalGuide-badge[data-active="true"] {
        animation: none;
    }
    .gemini-qol-journalGuide-badge {
        transition: none;
    }
}
`;

let styleElement: HTMLStyleElement | null = null;

export function injectStyles(): void {
    if (styleElement) return;

    styleElement = document.createElement('style');
    styleElement.id = STYLE_ID;
    styleElement.textContent = CSS;
    document.head.appendChild(styleElement);
}

export function removeStyles(): void {
    if (styleElement) {
        styleElement.remove();
        styleElement = null;
    }
}
