import PocketBase, { RecordOptions } from "pocketbase";
import {
  CollectionResponses,
  Collections,
  TypedPocketBase,
} from "./types.gen.ts";
import {
  QueryFunction,
  QueryKey,
  UseQueryOptions,
} from "@tanstack/react-query";

export const pb = new PocketBase(
  "https://tm-plus-data.vigonotion.com",
) as TypedPocketBase;

export function record<
  TCollection extends Collections,
  TData = CollectionResponses[TCollection],
>(
  collection: TCollection,
  id: string,
  params: RecordOptions,
  options?: Omit<UseQueryOptions<TData, never, TData>, "queryKey" | "queryFn">,
): {
  queryKey: QueryKey;
  queryFn: QueryFunction<TData>;
  options?: Omit<UseQueryOptions<TData, never, TData>, "queryKey" | "queryFn">;
} {
  const key = [collection, id, params];

  const queryFn = () =>
    pb.collection(collection).getOne(id, {
      ...params,
      requestKey: null,
    }) as unknown as Promise<TData>;

  return { queryKey: key, queryFn, options };
}

export function collection<
  TCollection extends Collections,
  TData = CollectionResponses[TCollection][],
>(
  collection: TCollection,
  params: RecordOptions,
  options?: Omit<UseQueryOptions<TData, never, TData>, "queryKey" | "queryFn">,
): {
  queryKey: QueryKey;
  queryFn: QueryFunction<TData>;
  options?: Omit<UseQueryOptions<TData, never, TData>, "queryKey" | "queryFn">;
} {
  const key = [collection, "*", params];

  const queryFn = () =>
    pb.collection(collection).getFullList(undefined, {
      ...params,
      requestKey: null,
    }) as unknown as Promise<TData>;

  return { queryKey: key, queryFn, options };
}
