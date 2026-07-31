/**
 * JS-side mirror of the Tailwind theme tokens (app/globals.css @theme).
 * Use only where a value must be read in TypeScript (rare). Prefer Tailwind
 * utilities and the component classes in globals.css for all styling.
 */
export const colors = {
  ink: "#111111",
  obsidian: "#000000",
  white: "#FFFFFF",
  bone: "#FAF8F5",
  alabaster: "#F2F0EC",
  rule: "#E4E0D8",
  stroke: "#CCCCCC",
  slate: "#595959",
  gold: "#C9A227",
  brass: "#8C6E1F",
  dark: {
    body: "#B5B5B5",
    label: "#8A8A8A",
    border: "#3A3A3A",
    rule: "#2A2A2A",
    link: "#D6D6D6",
  },
} as const;

export const radius = {
  input: 6,
  button: 10,
  card: 12,
} as const;

export const shadow = {
  rest: "0 4px 20px rgba(17,17,17,.04)",
  hover: "0 12px 32px rgba(17,17,17,.08)",
} as const;
