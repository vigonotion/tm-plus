import React from "react";
import { useQuery } from "react-query";
import { Game, conn } from "./conn";
import { Placement } from "./client/placements";

function Placements({ game }: { game: string }) {
  const { isLoading, data } = useQuery(["placements", game], () =>
    conn.collection("placements").getFullList<Placement>({
      sort: "placement",
      expand: "player",
      filter: 'game.id = "' + game + '"',
      $cancelKey: game,
    })
  );

  if (isLoading || data === undefined) return <span>loading...</span>;
  console.log(data);

  return (
    <span style={{ display: "flex", gap: 4, flexDirection: "column" }}>
      {data.map((x) => {
        const plc = x.placement;

        return (
          <span>
            {plc === 1 ? "🥇" : plc === 2 ? "🥈" : plc === 3 ? "🥉" : "🔘"}
            {x.expand?.player?.name}
          </span>
        );
      })}
    </span>
  );
}

function Games() {
  const { isLoading, data } = useQuery("games", () =>
    conn
      .collection("games")
      .getFullList<Game>({ sort: "-date", expand: "placements" })
  );

  if (isLoading || !data) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <div>Recent games</div>
      <table border={1}>
        <thead>
          <tr>
            <th>Game</th>
            <th>Placements</th>
          </tr>
        </thead>
        {data.map((game) => (
          <tr key={game.id}>
            <td>{game.name}</td>
            <td>
              <Placements game={game.id} />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default Games;
