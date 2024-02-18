"use client";

import { Popover as AriaFieldPopover } from "react-aria-components";
import { styled } from "@styled-system/jsx";

export const FieldPopover = styled(AriaFieldPopover, {
  base: {
    border: "thin solid token(colors.slate.6)",
    bgColor: "slate.3",
    padding: "2xs",
    rounded: "s",
    minWidth: 200,
    width: "var(--trigger-width)",
    my: "2xs",
  },
});
