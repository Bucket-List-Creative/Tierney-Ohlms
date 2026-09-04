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
      // AppleDouble sidecars. macOS writes these next to every file when the
      // repo lives on a non-HFS volume (this one is on an external drive).
      // They're already gitignored; ESLint scans the working tree, not the
      // index, so it needs telling separately or it tries to parse them.
      "**/._*",
      "**/.DS_Store",
    ],
  },
];

export default eslintConfig;
