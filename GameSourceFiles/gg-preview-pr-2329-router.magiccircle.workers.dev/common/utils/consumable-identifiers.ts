/**
 * Parses the credit quantity from a Discord SKU name that follows the "X Donuts" format.
 *
 * This function extracts numerical values from SKU names that represent in-game currency
 * purchases. It handles comma-separated numbers (e.g., "10,000") and is case-insensitive
 * for the "Donuts" suffix.
 *
 * @param sku - The Discord API SKU object containing the name to parse
 * @returns The parsed credit quantity as a number, or 0 if the format doesn't match
 *
 * @example
 * ```typescript
 * const sku = { name: "10,000 Donuts" };
 * const credits = parseCreditQuantityForSku(sku); // returns 10000
 *
 * const sku2 = { name: "500 donuts" };
 * const credits2 = parseCreditQuantityForSku(sku2); // returns 500
 *
 * const sku3 = { name: "Invalid Format" };
 * const credits3 = parseCreditQuantityForSku(sku3); // returns 0
 * ```
 */
export function parseCreditQuantityForDiscordSku(sku: {
  id: string;
  name: string;
}): number {
  // Regex pattern breakdown:
  // ^([\d,]+)  - Start of string, capture group with digits and commas
  // \s+        - One or more whitespace characters
  // donuts     - Literal "donuts" text
  // $          - End of string
  // i flag     - Case insensitive matching
  const match = sku.name.match(/^([\d,]+) donuts$/i);

  if (match?.[1]) {
    // Extract the captured number string and remove all commas
    // Then parse as integer (base 10)
    return parseInt(match[1].replace(/,/g, ''), 10);
  }

  throw new Error(
    `Could not parse credit quantity for SKU ${sku.id}: ${sku.name}. Expected format: "X Donuts"`
  );
}

export function parseCreditQuantityForAppleProductId({
  productId,
}: {
  productId: string;
}): number {
  const match = productId.match(/^donuts\.(\d+)$/);
  if (match?.[1]) {
    return parseInt(match[1], 10);
  }

  throw new Error(
    `Could not parse credit quantity for Apple product ID ${productId}. Expected format: "donuts.X"`
  );
}

export function getAppleProductIdForAmount(amount: number) {
  return `donuts.${amount}`;
}
