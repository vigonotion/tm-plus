"use client";

import { Label as AriaLabel } from "react-aria-components";
import { styled } from "@styled-system/jsx";

export const Label = styled(AriaLabel, {
  base: {
    fontSize: ".8em",
    gap: "2xs",
    color: "sand.11",
  },
});
