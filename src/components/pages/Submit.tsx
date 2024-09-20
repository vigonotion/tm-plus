import React, { useMemo, useState } from "react";
import { parse } from "@/mapdata.ts";
import { Headline } from "@/components/Headline.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { MapView } from "@/components/pages/MapView.tsx";
import { Card, Flex, Select, Text, TextField } from "@radix-ui/themes";

export function Submit() {
  return (
    <div>
      <Headline>Submit tool</Headline>
      <Card>
        <Text as="div" size="2" weight="bold">
          Game
        </Text>

        <Flex align={"center"} gap={"2"}>
          <label>Date</label>
          <TextField.Root type={"date"} />
        </Flex>

        <Flex align={"center"} gap={"2"}>
          <label>Map</label>
          <Select.Root defaultValue="mars">
            <Select.Trigger />
            <Select.Content>
              <Select.Group>
                <Select.Label>Official</Select.Label>
                <Select.Item value="mars">Tharsis</Select.Item>
                <Select.Item value="hellas">Hellas</Select.Item>
                <Select.Item value="elysium">Elysium</Select.Item>
                <Select.Item value="amazonis">Amazonis Plantia</Select.Item>
              </Select.Group>
              <Select.Separator />
              <Select.Group>
                <Select.Label>Fan made</Select.Label>
                <Select.Item value="terra">Terra Cimmeria</Select.Item>
                <Select.Item value="utopia">Utopia Planitia</Select.Item>
                <Select.Item value="vastitas">Vastitas Borealis</Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </Flex>

        <Flex align={"center"} gap={"2"}>
          <label>Generations</label>
          <TextField.Root type={"number"} min={1} />
        </Flex>
      </Card>
    </div>
  );
}
