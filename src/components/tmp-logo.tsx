import { RiCircleLine } from "@remixicon/react";
import { Link } from "@tanstack/react-router";
import { Flex } from "@radix-ui/themes";

import css from "./tmp-logo.module.css";

export function TmpLogo() {
  return (
    <Link to={"/"} className={css.root}>
      <Flex align={"center"} gap={"2"}>
        <RiCircleLine className={css.icon} />
        {/* font display */}
        <span className={css.text}>Terraforming Marsᐩ</span>
      </Flex>
    </Link>
  );
}
