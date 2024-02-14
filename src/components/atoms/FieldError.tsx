"use client";

import { FieldError as AriaFieldError } from "react-aria-components";
import { styled } from "@styled-system/jsx";

export const FieldError = styled(AriaFieldError, {
  base: {
    color: "ruby.12",
    bg: "ruby.3",
    fontSize: "sm",
    roundedBottom: "s",
    px: "xs",
    py: "3xs",
    boxShadow: "0 -10px 0 token(colors.ruby.3)",
    zIndex: -1,
  },
});
