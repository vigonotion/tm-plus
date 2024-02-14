"use client";

import { FieldError as AriaFieldError } from "react-aria-components";
import { styled } from "@styled-system/jsx";

export const FieldError = styled(AriaFieldError, {
  base: {
    colorPalette: "tomato",
    color: "colorPalette.12",
    bg: "colorPalette.3",
    fontSize: "sm",
    roundedBottom: "s",
    px: "xs",
    py: "3xs",
    boxShadow: "0 -10px 0 token(colors.colorPalette.3)",
    zIndex: -1,
  },
});
