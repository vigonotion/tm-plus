import { css } from "../../styled-system/css";
import { Logo } from "@/components/Logo";
import { ArrowUpDown, ChevronsUpDown, Hexagon, Users } from "lucide-react";
import { hstack, vstack } from "../../styled-system/patterns";

export function Sidebar() {
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: "m",
        p: "m",
      })}
    >
      <div className={css({ ml: "4xs" })}>
        <Logo />
      </div>
      <div
        className={hstack({
          px: "xs",
          py: "2xs",
          // border: "1px solid token(colors.sand.6)",
          rounded: "s",
          justify: "space-between",
          colorPalette: "sand",

          bgColor: "colorPalette.3",

          "&:hover": {
            bgColor: "colorPalette.4",
          },

          "&:focus": {
            bgColor: "colorPalette.5",
          },
        })}
      >
        <div className={vstack({ alignItems: "start", gap: "4xs" })}>
          <label
            className={hstack({
              fontSize: ".8em",
              gap: "2xs",
              color: "sand.11",
            })}
          >
            <Users size={12} />
            <span>Group</span>
          </label>
          <span>Tiplu</span>
        </div>

        <ChevronsUpDown className={css({ color: "sand.11" })} size={16} />
      </div>
      <div>Nav</div>
    </div>
  );
}
