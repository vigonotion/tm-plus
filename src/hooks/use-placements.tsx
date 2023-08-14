import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { Placement, Player } from "../client/placements";
import { Game, conn } from "../conn";
import { RecordFullListQueryParams } from "pocketbase";
import { useId } from "react";

function useGetFullList<TParams, TData>(collection: string, params: TParams, options?: Omit<UseQueryOptions<TData[], never, TData[]>, "queryKey" | "queryFn">)
{
    const key = [collection, params];
    const id = useId();

    const query = useQuery(key, () =>
        conn.collection(collection).getFullList<TData>({
            ...params,
            $cancelKey: id
        }),
        options
    );

    return query;
}

export function usePlacements(params: RecordFullListQueryParams, options?: Omit<UseQueryOptions<Placement[], never, Placement[]>, "queryKey" | "queryFn">)
{
    return useGetFullList("placements", params, options);
}

export function useGames(params: RecordFullListQueryParams, options?: Omit<UseQueryOptions<Game[], never, Game[]>, "queryKey" | "queryFn">)
{
    return useGetFullList("games", params, options);
}

export function usePlayers(params: RecordFullListQueryParams, options?: Omit<UseQueryOptions<Player[], never, Player[]>, "queryKey" | "queryFn">)
{
    return useGetFullList("players", params, options);
}