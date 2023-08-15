import React from "react";
import { Slot } from "@radix-ui/react-slot";

type HeadingElement = React.ElementRef<"h1">;
type HeadingProps = React.ComponentProps<"h1">;

export const Headline = React.forwardRef<HeadingElement, HeadingProps>(
  (props, ref) => {
    const { children, ...other } = props;

    return (
      <Slot className="text-4xl font-head mb-4">
        <h1 {...other}>{children}</h1>
      </Slot>
    );
  }
);
