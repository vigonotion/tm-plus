import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { Placement, Player } from "../client/placements";
import { Game, Group, conn } from "../conn";
import { RecordFullListQueryParams, RecordQueryParams } from "pocketbase";
import { useId } from "react";

function useGetFullList<TParams, TData>(
  collection: string,
  params: TParams,
  options?: Omit<
    UseQueryOptions<TData[], never, TData[]>,
    "queryKey" | "queryFn"
  >
) {
  const key = [collection, params];
  const id = useId();

  const query = useQuery(
    key,
    () =>
      conn.collection(collection).getFullList<TData>({
        ...params,
        $cancelKey: id,
      }),
    options
  );

  return query;
}

function useGetOne<TParams, TData>(
  collection: string,
  id: string,
  params: TParams,
  options?: Omit<UseQueryOptions<TData, never, TData>, "queryKey" | "queryFn">
) {
  const key = [collection, params];
  const cancelKey = useId();

  const query = useQuery(
    key,
    () =>
      conn.collection(collection).getOne<TData>(id, {
        ...params,
        $cancelKey: cancelKey,
      }),
    options
  );

  return query;
}

export function usePlacements(
  params: RecordFullListQueryParams,
  options?: Omit<
    UseQueryOptions<Placement[], never, Placement[]>,
    "queryKey" | "queryFn"
  >
) {
  return useGetFullList("placements", params, options);
}

export function useGames(
  params: RecordFullListQueryParams,
  options?: Omit<UseQueryOptions<Game[], never, Game[]>, "queryKey" | "queryFn">
) {
  return useGetFullList("games", params, options);
}

export function useGame(
  id: string,
  params: RecordQueryParams,
  options?: Omit<UseQueryOptions<Game, never, Game>, "queryKey" | "queryFn">
) {
  return useGetOne("games", id, params, options);
}

export function usePlayers(
  params: RecordFullListQueryParams,
  options?: Omit<
    UseQueryOptions<Player[], never, Player[]>,
    "queryKey" | "queryFn"
  >
) {
  return useGetFullList("players", params, options);
}

export function useGroups(
  params: RecordFullListQueryParams,
  options?: Omit<
    UseQueryOptions<Group[], never, Group[]>,
    "queryKey" | "queryFn"
  >
) {
  return useGetFullList("groups", params, options);
}
