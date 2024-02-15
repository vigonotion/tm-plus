"use client";

import { styled } from "@styled-system/jsx";
import { Button as AriaButton } from "react-aria-components";

export const FieldButton = styled(AriaButton, {
  base: {
    width: 32,
    height: 32,
    rounded: "full",
    _hover: {
      bgColor: "black.a.3",
    },
    _active: {
      bgColor: "black.a.4",
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
