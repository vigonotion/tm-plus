import React, { PropsWithChildren, useId, useMemo, useState } from "react";
import { Headline } from "@/components/Headline.tsx";
import {
  Button,
  Card,
  Flex,
  Heading,
  Select,
  Table,
  Text,
  TextField,
} from "@radix-ui/themes";
import { Slot } from "@radix-ui/react-slot";
import { PlayerMarker } from "@/components/pages/PlayerMarker.tsx";

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

const COLORS = ["black", "green", "yellow", "blue", "red"];

export function Submit() {
  return (
    <div>
      <Headline>Submit tool</Headline>

      <Flex direction={"column"} gap={"4"} my={"8"}>
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

      <Flex direction={"column"} gap={"4"} mb={"8"}>
        <Heading>Placements</Heading>
        <Table.Root variant={"surface"}>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Placement</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Player</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Color</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Corporation</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>TR</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Score</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {[1, 2, 3, 4, 5].map((placement) => (
              <Table.Row key={placement} align={"center"}>
                <Table.RowHeaderCell>{placement}.</Table.RowHeaderCell>
                <Table.Cell>Player</Table.Cell>
                <Table.Cell>
                  <Select.Root defaultValue={COLORS[placement - 1]}>
                    <Select.Trigger />
                    <Select.Content>
                      {COLORS.map((color) => (
                        <Select.Item value={color}>
                          <Flex gap={"2"} align={"center"}>
                            <PlayerMarker color={color} />
                            <span>{color}</span>
                          </Flex>
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Root>
                </Table.Cell>
                <Table.Cell>Corporation</Table.Cell>
                <Table.Cell>
                  <TextField.Root type={"number"} min={1} className={"w-16"} />
                </Table.Cell>
                <Table.Cell>
                  <TextField.Root type={"number"} min={1} className={"w-16"} />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Flex>

      <Flex justify={"end"}>
        <Button>Submit</Button>
      </Flex>
    </div>
  );
}
