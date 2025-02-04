import {
  RiCircleLine,
  RiCompassLine,
  RiEarthLine,
  RiFlashlightLine,
  RiHexagonLine,
  RiLeafLine,
  RiSnowflakeLine,
} from "@remixicon/react";
import { css } from "../../styled-system/css";
import { hstack } from "../../styled-system/patterns";

function MapIcon({ map, size = 16 }: { map: string; size?: number }) {
  if (map === "hellas") {
    return (
      <RiSnowflakeLine
        size={size}
        className={css({ color: "rgb(59, 130, 246)" })}
      />
    );
  }

  if (map === "elysium") {
    return (
      <RiLeafLine size={size} className={css({ color: "rgb(34, 197, 94)" })} />
    );
  }

  if (map === "utopia") {
    return (
      <RiFlashlightLine
        size={size}
        className={css({ color: "rgb(234, 179, 8)" })}
      />
    );
  }

  if (map === "terra") {
    return (
      <RiEarthLine
        size={size}
        className={css({ color: "rgb(168, 85, 247)" })}
      />
    );
  }

  if (map === "vastitas") {
    return (
      <RiCompassLine
        size={size}
        className={css({ color: "rgb(96, 165, 250)" })}
      />
    );
  }

  if (map === "amazonis") {
    return (
      <RiHexagonLine
        size={size}
        className={css({ color: "rgb(6, 182, 212)" })}
      />
    );
  }

  return <RiCircleLine size={size} className={css({ color: "orange.9" })} />;
}

export function MapLabel({ map }: { map: string }) {
  return (
    <span className={hstack()}>
      <MapIcon map={map} />
      <span className={css({ textTransform: "capitalize" })}>{map}</span>
    </span>
  );
}
