export const shopNotifierCss = `
  #shop-notifier-section {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  /* Shop Cards */
  .shop-card--seed,
  .shop-card--tool,
  .shop-card--egg,
  .shop-card--decor {
    /* Card styles inherited from Card component */
  }

  /* Emoji icon in table cells */
  .shop-item-icon {
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Rarity badge container in table */
  .shop-item-rarity {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  /* Toggle switch container in table */
  .shop-item-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
