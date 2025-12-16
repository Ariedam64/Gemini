// shops.ts
export const shops = {
  seed:  { reset: 300 },
  tool:  { reset: 600 },
  egg:   { reset: 900 },
  decor: { reset: 3600 },
} as const satisfies Record<string, { reset: number }>;
