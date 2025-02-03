import { hstack } from "../../styled-system/patterns";
import { RiCircleLine } from "@remixicon/react";
import { css } from "../../styled-system/css";

export function TmpLogo() {
  return (
    <div className={hstack()}>
      <RiCircleLine className={css({ color: "orange.9" })} />
      <span
        className={css({
          fontFamily: "display",
          textTransform: "uppercase",
        })}
      >
        Terraforming Marsᐩ
      </span>
    </div>
  );
}
