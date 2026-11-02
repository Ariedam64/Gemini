import { defineConfig } from "vitest/config";

// Les checks des correctifs ecrits par mg-maintenance: de la logique pure,
// sans DOM ni setup. Chaque check:<nom> lance
// vitest run --config vitest.checks.config.ts <fichier>.
export default defineConfig({
  test: {
    environment: "node",
    include: ["**/*.check.test.ts"],
    exclude: ["node_modules/**", "dist/**"],
  },
});
