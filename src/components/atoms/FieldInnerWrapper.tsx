import { styled } from "@styled-system/jsx";

export const FieldInnerWrapper = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "4xs",

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
