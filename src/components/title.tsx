import { PropsWithChildren } from "react";
import { Flex, Heading } from "@radix-ui/themes";

import css from "./title.module.css";

export const Title = ({ children }: PropsWithChildren) => {
  return (
    <Flex align={"center"}>
      <Heading className={css.root}>{children}</Heading>
    </Flex>
  );
};
