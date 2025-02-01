import { cva } from "../../styled-system/css";
import { styled } from "../../styled-system/jsx";

export const Title = styled(
  "h1",
  cva({
    base: {
      fontFamily: "display",
      fontSize: "3xl",
    },
  }),
);
