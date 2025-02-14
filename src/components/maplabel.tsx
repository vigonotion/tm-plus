import {
  RiCircleLine,
  RiCompassLine,
  RiEarthLine,
  RiFlashlightLine,
  RiHexagonLine,
  RiLeafLine,
  RiSnowflakeLine,
} from "@remixicon/react";
function MapIcon({ map, size = 16 }: { map: string; size?: number }) {
  if (map === "hellas") {
    return <RiSnowflakeLine size={size} />;
  }

  if (map === "elysium") {
    return <RiLeafLine size={size} />;
  }

  if (map === "utopia") {
    return <RiFlashlightLine size={size} />;
  }

  if (map === "terra") {
    return <RiEarthLine size={size} />;
  }

  if (map === "vastitas") {
    return <RiCompassLine size={size} />;
  }

  if (map === "amazonis") {
    return <RiHexagonLine size={size} />;
  }

  return <RiCircleLine size={size} />;
}

export function MapLabel({ map }: { map: string }) {
  return (
    <span>
      <MapIcon map={map} />
      <span>{map}</span>
    </span>
  );
}
