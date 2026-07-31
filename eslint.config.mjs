import next from "eslint-config-next";

/**
 * Flat ESLint config. Next 16 ships eslint-config-next as a flat-config array,
 * so we spread it directly (no FlatCompat needed).
 */
const eslintConfig = [
  ...next,
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "sanity.types.ts",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
