import { RiCircleLine } from "@remixicon/react";
import { Link } from "@tanstack/react-router";

export function TmpLogo() {
  return (
    <Link to={"/"}>
      <RiCircleLine />
      {/* font display */}
      <span>Terraforming Marsᐩ</span>
    </Link>
  );
}
