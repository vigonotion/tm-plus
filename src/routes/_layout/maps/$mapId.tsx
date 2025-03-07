import { createFileRoute } from "@tanstack/react-router";
import { Title } from "../../../components/title.tsx";
import { useParams } from "@tanstack/react-router";
import { Box, Flex, Text } from "@radix-ui/themes";
import { MapLabel } from "../../../components/maplabel.tsx";

export const Route = createFileRoute("/_layout/maps/$mapId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { mapId } = useParams({ from: "/_layout/maps/$mapId" });
  
  return (
    <>
      <Title>Map Details</Title>
      <Box mb="4">
        <Flex direction="column" gap="2">
          <Flex align="center" gap="2">
            <MapLabel map={mapId} />
          </Flex>
          <Text color="gray">
            This is a placeholder for the map details page. More information about this map will be added soon.
          </Text>
        </Flex>
      </Box>
    </>
  );
}
