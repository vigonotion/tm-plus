import {
  RiCircleLine,
  RiCompassLine,
  RiEarthLine,
  RiFlashlightLine,
  RiHexagonLine,
  RiLeafLine,
  RiSnowflakeLine,
} from "@remixicon/react";
import { Flex } from "@radix-ui/themes";

import css from "./maplabel.module.css";

function MapIcon({ map, size = 16 }: { map: string; size?: number }) {
  if (map === "hellas") {
    return <RiSnowflakeLine size={size} className={css.hellas} />;
  }

  if (map === "elysium") {
    return <RiLeafLine size={size} className={css.elysium} />;
  }

  if (map === "utopia") {
    return <RiFlashlightLine size={size} className={css.utopia} />;
  }

  if (map === "terra") {
    return <RiEarthLine size={size} className={css.terra} />;
  }

  if (map === "vastitas") {
    return <RiCompassLine size={size} className={css.vastitas} />;
  }

  if (map === "amazonis") {
    return <RiHexagonLine size={size} className={css.amazonis} />;
  }

  return <RiCircleLine size={size} className={css.mars} />;
}

export function MapLabel({ map }: { map: string }) {
  return (
    <Flex align={"center"} gap={"1"}>
      <MapIcon map={map} />
      <span className={css.text}>{map}</span>
    </Flex>
  );
}
