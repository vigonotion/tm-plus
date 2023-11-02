import React from "react";
import { Headline } from "../Headline";
import { useCorporation } from "@/hooks/use-placements";
import { Link, useRouteContext } from "@tanstack/react-router";
import { FullLoading } from "../Loading";
import { RecentGamesTables } from "./RecentGamesTables";
import { useQuery } from "@tanstack/react-query";

export function Corporation({ corp }: { corp: string }) {
  const { queryKey, queryFn, options } = useRouteContext({
    from: "/l/corporations/$corp",
  });
  const { data } = useQuery(queryKey, queryFn, options);

  if (data === undefined)
    return (
      <div>
        <FullLoading />
      </div>
    );

  const placements = data.expand?.["placements(corp)"];

  return (
    <div>
      <div className="mb-8">
        <Headline className="text-sm uppercase text-muted-foreground mb-1 inline-block">
          <Link to="/corporations">Corporations</Link>
        </Headline>
        <Headline className={"capitalize"}>{data.name}</Headline>
      </div>

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

      <Headline className="text-xl mt-8">Recent games</Headline>

      {placements && (
        <RecentGamesTables
          placements={placements.sort(
            (a, b) =>
              b.expand?.game?.date.localeCompare(a.expand?.game?.date ?? "") ??
              0
          )}
        />
      )}
    </div>
  );
}
