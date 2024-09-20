import React, { PropsWithChildren, useId, useMemo, useState } from "react";
import { parse } from "@/mapdata.ts";
import { Headline } from "@/components/Headline.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { MapView } from "@/components/pages/MapView.tsx";
import { Card, Flex, Heading, Select, Text, TextField } from "@radix-ui/themes";
import { Slot } from "@radix-ui/react-slot";

function InputWrapper({
  label,
  children,
}: PropsWithChildren<{ label: string }>) {
  const id = useId();

  return (
    <Flex gap={"1"} direction={"column"}>
      <label htmlFor={id}>{label}</label>
      <Slot id={id}>{children}</Slot>
    </Flex>
  );
}

export function Submit() {
  return (
    <div>
      <Headline>Submit tool</Headline>

      <Flex direction={"column"} gap={"4"}>
        <Heading>Game</Heading>
        <Card>
          <Flex direction={"column"} gap={"4"}>
            <InputWrapper label={"Date"}>
              <TextField.Root type={"date"} />
            </InputWrapper>

            <InputWrapper label={"Map"}>
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
                    <Select.Item value="vastitas">
                      Vastitas Borealis
                    </Select.Item>
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </InputWrapper>

            <InputWrapper label={"Generations"}>
              <TextField.Root type={"number"} min={1} />
            </InputWrapper>
          </Flex>
        </Card>
      </Flex>
    </div>
  );
}
