import { defineConfig } from "@pandacss/dev";
import { globalCss } from "./global.styles";

import radixColorsPreset from "pandacss-preset-radix-colors";
import { Prototype } from "@/fonts.styles";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    tokens: {
      spacing: {
        "4xs": { value: "0.125rem" },
        "3xs": { value: "0.25rem" },
        "2xs": { value: "0.55rem" },
        xs: { value: "0.75rem" },
        s: { value: "1rem" },
        m: { value: "1.5rem" },
        l: { value: "2rem" },
        xl: { value: "2.5rem" },
        "2xl": { value: "3rem" },
      },
      radii: {
        s: { value: "5px" },
        m: { value: "10px" },
        full: { value: "9999px" },
      },
    },
    extend: {
      tokens: {
        fonts: {
          proto: { value: "var(--font-prototype), sans-serif" },
          headline: { value: "var(--font-hubot), sans-serif" },
        },
        fontSizes: {
          sm: { value: ".8em" },
        },
      },
    },
    semanticTokens: {
      colors: {},
    },
  },

  // The output directory for your css system
  outdir: "styled-system",

  prefix: "tm",
  jsxFramework: "react",

  globalCss,

  presets: [
    radixColorsPreset({
      darkMode: {
        condition: '[data-theme="dark"] &',
      },
      autoP3: true,
    }),
    "@pandacss/preset-panda", // default tokens
  ],
});
