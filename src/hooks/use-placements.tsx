import {
  QueryFunction,
  QueryKey,
  UseQueryOptions,
  useQuery,
} from "@tanstack/react-query";
import { Placement, Player } from "../client/placements";
import { Corporation, Game, Group, conn } from "../conn";
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

export function getOneQueryData<TData>(
  collection: string,
  id: string,
  params: RecordQueryParams,
  options?: Omit<UseQueryOptions<TData, never, TData>, "queryKey" | "queryFn">
): {
  queryKey: QueryKey;
  queryFn: QueryFunction<TData>;
  options?: Omit<UseQueryOptions<TData, never, TData>, "queryKey" | "queryFn">;
} {
  const key = [collection, id, params];

  const queryFn = () =>
    conn.collection(collection).getOne<TData>(id, {
      ...params,
      $autoCancel: false,
    });

  return { queryKey: key, queryFn, options };
}

function useGetOne<TData>(
  collection: string,
  id: string,
  params: RecordQueryParams,
  options?: Omit<UseQueryOptions<TData, never, TData>, "queryKey" | "queryFn">
) {
  const query = useQuery(getOneQueryData(collection, id, params, options));

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

// export function useGame(
//   id: string,
//   params: RecordQueryParams,
//   options?: Omit<UseQueryOptions<Game, never, Game>, "queryKey" | "queryFn">
// ) {
//   return useGetOne("games", id, params, options);
// }

export function useGameQueryOptions(
  id: string,
  params: RecordQueryParams,
  options?: Omit<UseQueryOptions<Game, never, Game>, "queryKey" | "queryFn">
) {
  return getOneQueryData("games", id, params, options);
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

export function useCorporation(
  id: string,
  params: RecordQueryParams,
  options?: Omit<
    UseQueryOptions<Corporation, never, Corporation>,
    "queryKey" | "queryFn"
  >
) {
  return useGetOne("corporations", id, params, options);
}

export function usePlayer(
  id: string,
  params: RecordQueryParams,
  options?: Omit<UseQueryOptions<Player, never, Player>, "queryKey" | "queryFn">
) {
  return useGetOne("players", id, params, options);
}
