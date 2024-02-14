import { styled } from "@styled-system/jsx";

export const FieldBackground = styled("div", {
  base: {
    display: "flex",
    gap: "s",
    alignItems: "center",

    px: "xs",
    py: "2xs",
    rounded: "s",
    justifyContent: "space-between",
    colorPalette: "sand",

    bgColor: "colorPalette.3",

    "&:not(:focus-within):hover": {
      bgColor: "colorPalette.4",
    },

    "&:focus-within": {
      bgColor: "colorPalette.5",
    },
  },
  variants: {
    isInvalid: {
      true: {
        roundedBottom: 0,
      },
    },
  },
});
