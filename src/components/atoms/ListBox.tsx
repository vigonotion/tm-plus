"use client";

import { ListBox as AriaListBox } from "react-aria-components";
import { styled } from "@styled-system/jsx";

export const ListBox = styled(AriaListBox, {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "3xs",
  },
});
