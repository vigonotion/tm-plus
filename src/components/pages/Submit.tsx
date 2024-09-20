import React, { PropsWithChildren, useId, useMemo, useState } from "react";
import { Headline } from "@/components/Headline.tsx";
import {
  Button,
  Callout,
  Card,
  Flex,
  Heading,
  SegmentedControl,
  Select,
  Table,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { Slot } from "@radix-ui/react-slot";
import { PlayerMarker } from "@/components/pages/PlayerMarker.tsx";
import {
  useCorporation,
  useCorporations,
  usePlayers,
} from "@/hooks/use-placements.tsx";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { Ban } from "lucide-react";
import toast from "react-hot-toast";
import { conn } from "@/conn.ts";

function InputWrapper({
  label,
  children,
}: PropsWithChildren<{ label: string }>) {
  return (
    <label>
      <Flex gap={"1"} direction={"column"}>
        <span>{label}</span>
        {children}
      </Flex>
    </label>
  );
}

const COLORS = ["black", "green", "yellow", "blue", "red"];

type FormValues = {
  date?: string;
  map?: string;
  generations?: number;
  players?: number;
  notes?: string;

  placements?: {
    placement?: number;
    player?: string;
    color?: string;
    corporation?: string;
    tr?: number;
    score?: number;
  }[];
};

export function Submit() {
  const { data: corps } = useCorporations({
    sort: "name",
  });

  const { data: players } = usePlayers({
    sort: "name",
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors, isValid, isDirty, isSubmitted },
  } = useForm<FormValues>({
    defaultValues: {
      map: "mars",
      players: 5,
      date: new Date().toISOString().slice(0, 10),
      placements: [
        { placement: 1 },
        { placement: 2 },
        { placement: 3 },
        { placement: 4 },
        { placement: 5 },
      ],
    },
  });

  const placements: FormValues["placements"] = watch("placements");

  const handleColorChange = (index: number, newColor: string) => {
    if (!placements) return;

    const oldColor = placements[index].color;
    if (oldColor === newColor) return;

    const newPlacements = [...placements];
    const conflictIndex = newPlacements.findIndex((p) => p.color === newColor);

    if (conflictIndex !== -1) {
      newPlacements[conflictIndex].color = oldColor;
    }

    newPlacements[index].color = newColor;
    setValue("placements", newPlacements);
  };

  const handlePlayerChange = (index: number, newPlayer: string) => {
    const player = players?.find((player) => player.id === newPlayer);

    if (!player || !player.default_color || !placements) return;

    const oldColor = placements[index].color;

    if (oldColor) return;

    const newColor = player.default_color;

    const newPlacements = [...placements];

    newPlacements[index].color = newColor;
    setValue("placements", newPlacements);
  };

  async function onSubmit(data: FormValues) {
    const actualPlacements = data.placements?.slice(0, data.players) ?? [];

    async function work(): Promise<void> {
      const game = await conn.collection("games").create({
        date: `${data.date} 17:30:00.000Z`,
        planned: false,
        name: data.date,
        map: data.map,
        generations: data.generations,
        notes: data.notes,
        duration_in_minutes: 0,
        map_state: "",
      });

      let i = 1;
      for (const placement of actualPlacements) {
        await conn.collection("placements").create({
          game: game.id,
          player: placement.player,
          color: placement.color,
          placement: i++,
          tw: placement.tr,
          score: placement.score,
          corp: placement.corporation,
          politics_tw: 0,
        });
      }
    }

    await toast.promise(work(), {
      loading: "Sending game to server...",
      success: "Game submitted successfully.",
      error: "Error while submitting game.",
    });
  }

  const playerCount = watch("players");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Headline>Submit tool</Headline>

        <Flex direction={"column"} gap={"4"} my={"8"}>
          <Heading>Game</Heading>
          <Card>
            <Flex direction={"column"} gap={"4"}>
              <InputWrapper label={"Date"}>
                <TextField.Root type={"date"} {...register("date")} />
              </InputWrapper>

              <InputWrapper label={"Map"}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { value, onChange } }) => (
                    <Select.Root value={value} onValueChange={onChange}>
                      <Select.Trigger />
                      <Select.Content>
                        <Select.Group>
                          <Select.Label>Official</Select.Label>
                          <Select.Item value="mars">Tharsis</Select.Item>
                          <Select.Item value="hellas">Hellas</Select.Item>
                          <Select.Item value="elysium">Elysium</Select.Item>
                          <Select.Item value="amazonis">
                            Amazonis Plantia
                          </Select.Item>
                        </Select.Group>
                        <Select.Separator />
                        <Select.Group>
                          <Select.Label>Fan made</Select.Label>
                          <Select.Item value="terra">
                            Terra Cimmeria
                          </Select.Item>
                          <Select.Item value="utopia">
                            Utopia Planitia
                          </Select.Item>
                          <Select.Item value="vastitas">
                            Vastitas Borealis
                          </Select.Item>
                        </Select.Group>
                      </Select.Content>
                    </Select.Root>
                  )}
                  name={"map"}
                />
              </InputWrapper>

              <InputWrapper label={"Generations"}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                    min: 1,
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Must be an integer value.",
                    },
                  }}
                  render={({ field: { value, onChange } }) => (
                    <NumericFormat
                      customInput={TextField.Root}
                      min={1}
                      value={value}
                      onValueChange={(value) => onChange(value.floatValue)}
                    />
                  )}
                  name={"generations"}
                />
              </InputWrapper>

              <InputWrapper label={"Players"}>
                <Controller
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <SegmentedControl.Root
                      value={value?.toString()}
                      onValueChange={(value) => onChange(parseInt(value))}
                    >
                      {[1, 2, 3, 4, 5].map((x) => (
                        <SegmentedControl.Item key={x} value={x.toString()}>
                          {x}
                        </SegmentedControl.Item>
                      ))}
                    </SegmentedControl.Root>
                  )}
                  name={"players"}
                />
              </InputWrapper>

              <InputWrapper label={"Notes"}>
                <TextArea {...register("notes")} />
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
              {[1, 2, 3, 4, 5].slice(0, playerCount).map((placement, i) => (
                <Table.Row key={placement} align={"center"}>
                  <Table.RowHeaderCell>{placement}.</Table.RowHeaderCell>
                  <Table.Cell>
                    <Controller
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <Select.Root
                          value={value}
                          onValueChange={(value) => {
                            onChange(value);
                            handlePlayerChange(i, value);
                          }}
                        >
                          <Select.Trigger className={"!w-48"} />
                          <Select.Content>
                            {players?.map((player) => (
                              <Select.Item key={player.id} value={player.id}>
                                {player.name}
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Root>
                      )}
                      name={`placements.${i}.player`}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Controller
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <Select.Root
                          value={value}
                          onValueChange={(newColor) => {
                            handleColorChange(i, newColor);
                          }}
                        >
                          <Select.Trigger className={"!w-28"} />
                          <Select.Content>
                            {COLORS.map((color) => (
                              <Select.Item key={color} value={color}>
                                <Flex gap={"2"} align={"center"}>
                                  <PlayerMarker color={color} />
                                  <span>{color}</span>
                                </Flex>
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Root>
                      )}
                      name={`placements.${i}.color`}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Controller
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <Select.Root value={value} onValueChange={onChange}>
                          <Select.Trigger className={"!w-48"} />
                          <Select.Content>
                            {corps?.map((corp) => (
                              <Select.Item key={corp.id} value={corp.id}>
                                {corp.name}
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Root>
                      )}
                      name={`placements.${i}.corporation`}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Controller
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <NumericFormat
                          customInput={TextField.Root}
                          min={1}
                          value={value}
                          onValueChange={(value) => onChange(value.floatValue)}
                          className={"w-16"}
                        />
                      )}
                      name={`placements.${i}.tr`}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Controller
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <NumericFormat
                          customInput={TextField.Root}
                          min={1}
                          value={value}
                          onValueChange={(value) => onChange(value.floatValue)}
                          className={"w-16"}
                        />
                      )}
                      name={`placements.${i}.score`}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Flex>

        {isSubmitted && !isValid && Object.values(errors).length > 0 && (
          <Callout.Root color="red" mb={"4"}>
            <Callout.Icon>
              <Ban width={15} />
            </Callout.Icon>
            <Callout.Text>{JSON.stringify(errors, null, 4)}</Callout.Text>
          </Callout.Root>
        )}

        <Flex justify={"end"}>
          <Button disabled={!isDirty}>Submit</Button>
        </Flex>
      </div>
    </form>
  );
}
