import { createFileRoute } from "@tanstack/react-router";
import { Title } from "../../../components/title.tsx";
import { useQuery } from "@tanstack/react-query";
import { getListQueryData, getOneQueryData } from "../../../client/conn.ts";
import { Collections } from "../../../client/types.gen.ts";

export const Route = createFileRoute("/_layout/games/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useQuery(getListQueryData(Collections.Games, {}));

  return (
    <>
      <Title>Games</Title>
      <div>
        {/*<DataTable columns={columns} data={data} />*/}
        {JSON.stringify(data?.map((x) => x.map))}
      </div>
    </>
  );
}
