import { cva } from "../../styled-system/css";
import { styled } from "../../styled-system/jsx";

export const BlockText = styled(
  "div",
  cva({
    base: {
      maxWidth: "80ch",

      "& a": {
        textDecoration: "underline",
      },

      "& p, & ul": {
        marginBottom: "2",
      },

      "& ul": {
        listStyle: "disc inside",
      },
    },
  }),
);
