import { Box, Flex, Text } from "@radix-ui/themes";
import { ReactNode } from "react";

interface KpiCardProps {
  title: string;
  value: ReactNode;
  icon?: ReactNode;
  color?: "default" | "orange" | "blue" | "green";
}

export function KpiCard({ title, value, icon, color = "default" }: KpiCardProps) {
  // Define color styles based on the color prop
  const getColorStyles = () => {
    switch (color) {
      case "orange":
        return {
          backgroundColor: "var(--orange-2)",
          borderColor: "var(--orange-5)",
        };
      case "blue":
        return {
          backgroundColor: "var(--blue-2)",
          borderColor: "var(--blue-5)",
        };
      case "green":
        return {
          backgroundColor: "var(--green-2)",
          borderColor: "var(--green-5)",
        };
      default:
        return {
          backgroundColor: "var(--gray-2)",
          borderColor: "var(--gray-4)",
        };
    }
  };

  const colorStyles = getColorStyles();

  return (
    <Box
      p="4"
      style={{
        backgroundColor: colorStyles.backgroundColor,
        borderRadius: "var(--radius-3)",
        border: `1px solid ${colorStyles.borderColor}`,
        minWidth: "200px",
      }}
    >
      <Flex direction="column" gap="1">
        <Flex align="center" justify="between">
          <Text size="2" color="gray" weight="medium">
            {title}
          </Text>
          {icon && (
            <Box style={{ color: `var(--${color}-11)` }}>
              {React.cloneElement(icon as React.ReactElement, { size: 14 })}
            </Box>
          )}
        </Flex>
        <Text size="7" weight="bold">
          {value}
        </Text>
      </Flex>
    </Box>
  );
}
