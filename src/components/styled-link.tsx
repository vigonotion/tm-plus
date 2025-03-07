/* eslint-disable @typescript-eslint/no-empty-object-type */
import * as React from "react";
import { createLink, LinkComponent } from "@tanstack/react-router";
import { forwardRef } from "react";
import { Link as RadixLink } from "@radix-ui/themes";

interface BasicLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  // Add any additional props you want to pass to the anchor element
}

// eslint-disable-next-line react/display-name
const BasicLinkComponent = forwardRef<HTMLAnchorElement, BasicLinkProps>(
  (props, ref) => {
    return (
      <RadixLink asChild>
        <a ref={ref} {...props} />
      </RadixLink>
    );
  },
);

const CreatedLinkComponent = createLink(BasicLinkComponent);

export const StyledLink = CreatedLinkComponent;
