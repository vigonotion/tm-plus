import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  CommandDialog,
} from "@/components/ui/command";
import { useCorporations, usePlayers } from "@/hooks/use-placements";
import { useRouter } from "@tanstack/react-router";
import { useDebounce } from "@uidotdev/usehooks";
import { CommandLoading } from "cmdk";

import { useState, useEffect } from "react";
import { Loading } from "./Loading";

export function CommandMenu() {
  const [open, setOpen] = useState(true);

  const [rawSearch, setSearch] = useState("");
  const search = useDebounce(rawSearch, 300);

  const { data: players, isLoading: playersLoading } = usePlayers(
    {
      filter: "name ~ '" + search + "'",
      perPage: 10,
    },
    {
      enabled: search !== "",
    }
  );

  const { data: corporations, isLoading: corpsLoading } = useCorporations(
    {
      filter: "name ~ '" + search + "'",
      perPage: 10,
    },
    {
      enabled: search !== "",
    }
  );

  const { navigate } = useRouter();

  const loading = search !== "" && (playersLoading || corpsLoading);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        console.log("cmd+k");

        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder="Search for players, corporations or games..."
        onValueChange={setSearch}
      />
      {loading && (
        <CommandLoading>
          <div className="h-24 flex items-center justify-center">
            <Loading />
          </div>
        </CommandLoading>
      )}
      <CommandList>
        <CommandEmpty>
          {loading ? "Loading..." : "No results found."}
        </CommandEmpty>
        <CommandGroup heading="Pages">
          <CommandItem
            onSelect={() => {
              navigate({ to: "/" });
              setOpen(false);
            }}
          >
            Games
          </CommandItem>
          <CommandItem
            onSelect={() => {
              navigate({ to: "/players" });
              setOpen(false);
            }}
          >
            Players
          </CommandItem>
          <CommandItem
            onSelect={() => {
              navigate({ to: "/corporations" });
              setOpen(false);
            }}
          >
            Corporations
          </CommandItem>
        </CommandGroup>

        <CommandGroup heading="Maps">
          <CommandItem
            onSelect={() => {
              navigate({ to: "/maps/$map", params: { map: "mars" } });
              setOpen(false);
            }}
          >
            Mars
          </CommandItem>
          <CommandItem
            onSelect={() => {
              navigate({ to: "/maps/$map", params: { map: "hellas" } });
              setOpen(false);
            }}
          >
            Hellas
          </CommandItem>
          <CommandItem
            onSelect={() => {
              navigate({ to: "/maps/$map", params: { map: "elysium" } });
              setOpen(false);
            }}
          >
            Elysium
          </CommandItem>
        </CommandGroup>

        {players && (
          <CommandGroup heading="Players">
            {players.map((player) => (
              <CommandItem
                key={player.id}
                onSelect={() => {
                  navigate({
                    to: "/players/$player",
                    params: { player: player.id },
                  });
                  setOpen(false);
                }}
              >
                {player.name}
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {corporations && (
          <CommandGroup heading="Corporations">
            {corporations.map((corporation) => (
              <CommandItem
                key={corporation.id}
                className="capitalize"
                onSelect={() => {
                  navigate({
                    to: "/corporations/$corp",
                    params: { corp: corporation.id },
                  });
                  setOpen(false);
                }}
              >
                {corporation.name}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}
