import { css } from "../../styled-system/css";
import { PropsWithChildren } from "react";
import { hstack } from "../../styled-system/patterns";

export const Title = ({ children }: PropsWithChildren) => {
  return (
    <div className={hstack()}>
      <h1
        className={css({
          fontFamily: "display",
          fontSize: "3xl",

          _after: {
            content: "'.'",
            color: "orange.9",
          },
        })}
      >
        {children}
      </h1>
    </div>
  );
};
