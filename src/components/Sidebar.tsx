import { css } from "../../styled-system/css";
import { Logo } from "@/components/Logo";
import { ArrowUpDown, ChevronsUpDown } from "lucide-react";
import { hstack } from "../../styled-system/patterns";

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
      <Logo />
      <div
        className={hstack({
          px: "xs",
          py: "2xs",
          border: "1px solid token(colors.sand.6)",
          rounded: "s",
          justify: "space-between",
        })}
      >
        <span>Tiplu</span>
        <ChevronsUpDown className={css({ color: "sand.6" })} size={16} />
      </div>
      <div>Nav</div>
    </div>
  );
}
