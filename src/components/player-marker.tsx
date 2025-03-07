import { Box, Flex, Text } from "@radix-ui/themes";
import { PlacementsColorOptions } from "../client/types.gen";

interface PlayerMarkerProps {
  color?: string;
  showText?: boolean;
  size?: number;
}

export function PlayerMarker({ color, showText = true, size = 16 }: PlayerMarkerProps) {
  // Map colors to Radix UI color system
  const getColorStyle = (color?: string) => {
    switch (color?.toLowerCase()) {
      case "red":
        return { backgroundColor: "var(--red-9)" };
      case "green":
        return { backgroundColor: "var(--green-9)" };
      case "blue":
        return { backgroundColor: "var(--blue-9)" };
      case "yellow":
        return { backgroundColor: "var(--yellow-9)" };
      case "black":
        // Use white for black in dark mode
        return { backgroundColor: "var(--gray-1)" };
      default:
        return { backgroundColor: "var(--gray-6)" };
    }
  };

  return (
    <Flex align="center" gap="2">
      <Box
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: "4px",
          border: "1px solid var(--gray-6)",
          ...getColorStyle(color),
        }}
      />
      {showText && <Text>{color || "none"}</Text>}
    </Flex>
  );
}
