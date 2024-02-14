"use client";

import { FieldError as AriaFieldError } from "react-aria-components";
import { styled } from "@styled-system/jsx";

export const FieldError = styled(AriaFieldError, {
  base: {
    color: "ruby.11",
    fontSize: "sm",
  },
});
