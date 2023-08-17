import React from "react";
import { Headline } from "../Headline";
import { useCorporation } from "@/hooks/use-placements";
import { Link } from "@tanstack/react-router";
import { FullLoading } from "../Loading";

export function Corporation({ corp }: { corp: string }) {
  const { data } = useCorporation(corp, {
    expand: "placements(corp).game",
  });

  if (data === undefined)
    return (
      <div>
        <FullLoading />
      </div>
    );

  return (
    <div>
      {data.logo ? (
        <div
          className="font-proto mb-8"
          dangerouslySetInnerHTML={{ __html: data.logo }}
        />
      ) : (
        <Headline className="capitalize">Corporation</Headline>
      )}

      <div dangerouslySetInnerHTML={{ __html: data.description ?? "" }} />
      <div dangerouslySetInnerHTML={{ __html: data.ability ?? "" }} />

      <Headline className="text-2xl mt-8">Recent games</Headline>
      <ul className="flex flex-col gap-2">
        {data.expand?.["placements(corp)"]?.map((p) => (
          <li key={p.id}>
            <Link
              className="underline"
              to="/games/$game"
              params={{ game: p.expand?.game?.id ?? "" }}
            >
              {p.expand?.game?.date.split(" ")[0]}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
