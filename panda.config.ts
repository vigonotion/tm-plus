import { defineConfig, defineGlobalStyles } from "@pandacss/dev";

const globalCss = defineGlobalStyles({
  ":root": {
    backgroundColor: "page",
    color: "gray.12",
    minHeight: "100vh",
    lineHeight: "1.5",

    fontFamily: "body",
  },
});

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  globalCss,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        fonts: {
          body: { value: "'Public Sans Variable', system-ui, sans-serif" },
          display: { value: "'Hubot Sans Variable', system-ui, sans-serif" },
        },
        colors: {
          page: { value: "#0c0a09" },
          yellow: {
            "1": { value: "#14100e" },
            "2": { value: "#1d1713" },
            "3": { value: "#2c2015" },
            "4": { value: "#3b2613" },
            "5": { value: "#492e16" },
            "6": { value: "#583a20" },
            "7": { value: "#6c4a2b" },
            "8": { value: "#8b5e35" },
            "9": { value: "#de8f44" },
            "10": { value: "#d28437" },
            "11": { value: "#f0ad73" },
            "12": { value: "#fbdfc8" },
          },
          orange: {
            "1": { value: "#170f0d" },
            "2": { value: "#201411" },
            "3": { value: "#3b1508" },
            "4": { value: "#531000" },
            "5": { value: "#631600" },
            "6": { value: "#732404" },
            "7": { value: "#8c3514" },
            "8": { value: "#b5451b" },
            "9": { value: "#c4532b" },
            "10": { value: "#b5451b" },
            "11": { value: "#ff936b" },
            "12": { value: "#ffd2c3" },
          },
          red: {
            "1": { value: "#170e0e" },
            "2": { value: "#211211" },
            "3": { value: "#3f0e0e" },
            "4": { value: "#56030a" },
            "5": { value: "#680911" },
            "6": { value: "#7a191c" },
            "7": { value: "#942a2b" },
            "8": { value: "#bf3839" },
            "9": { value: "#832324" },
            "10": { value: "#6e1216" },
            "11": { value: "#ff8f88" },
            "12": { value: "#ffd0cb" },
          },
          gray: {
            "1": { value: "#111110" },
            "2": { value: "#191918" },
            "3": { value: "#222221" },
            "4": { value: "#2a2a28" },
            "5": { value: "#31312e" },
            "6": { value: "#3b3a37" },
            "7": { value: "#494844" },
            "8": { value: "#62605b" },
            "9": { value: "#6f6d66" },
            "10": { value: "#7c7b74" },
            "11": { value: "#b5b3ad" },
            "12": { value: "#eeeeec" },
          },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
