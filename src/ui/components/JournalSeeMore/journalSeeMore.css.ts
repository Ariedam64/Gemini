/**
 * JournalSeeMore Component Styles
 * Per .claude/rules/ui/components.md: style file exports componentNameCss
 */

export const journalSeeMoreCss = `
  .journal-see-more {
    display: flex;
    justify-content: center;
    padding: 8px 0;
  }

  .journal-see-more-link {
    font-family: 'Fredoka', var(--font-game), sans-serif;
    font-size: 12px;
    font-weight: 500;
    color: var(--accent, #60a5fa);
    cursor: pointer;
    transition: color 0.2s ease, transform 0.2s ease;
    text-decoration: none;
  }

  .journal-see-more-link:hover {
    color: var(--accent, #60a5fa);
    filter: brightness(1.2);
    text-decoration: underline;
  }

  .journal-see-more-link:active {
    transform: scale(0.98);
  }
`;
