import { hstack } from "../../styled-system/patterns";
import { RiCircleLine } from "@remixicon/react";
import { css } from "../../styled-system/css";
import { Link } from "@tanstack/react-router";

export function TmpLogo() {
  return (
    <Link to={"/"} className={hstack()}>
      <RiCircleLine className={css({ color: "orange.9" })} />
      <span
        className={css({
          fontFamily: "display",
          textTransform: "uppercase",
        })}
      >
        Terraforming Marsᐩ
      </span>
    </Link>
  );
}
