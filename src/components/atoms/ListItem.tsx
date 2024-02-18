"use client";

import { styled } from "@styled-system/jsx";

export const ListItem = styled("div", {
  base: {
    colorPalette: "iris",
    px: "2xs",
    py: "4xs",
    rounded: "s",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    _hover: {
      bgColor: "colorPalette.4",
    },
  },
  variants: {
    isSelected: {
      true: {
        bgColor: "colorPalette.5",
        _hover: {
          bgColor: "colorPalette.5",
        },
      },
    },
  },
});
