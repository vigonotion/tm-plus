import { Circle } from "lucide-react";
import { hstack } from "../../styled-system/patterns";
import { css } from "../../styled-system/css";

export function Logo() {
  return (
    <div className={hstack({ justify: "start" })}>
      <Circle className={css({ color: "orange.9" })} />
      <span
        className={css({
          fontFamily: "headline",
          textTransform: "uppercase",
          mt: "3px",
        })}
      >
        Terraforming Marsᐩ
      </span>
    </div>
  );
}
