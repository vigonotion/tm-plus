import { useGames, usePlacements } from "./hooks/use-placements";

function Placements({ game }: { game: string }) {

  const { isLoading, data } = usePlacements({
    sort: "placement",
      expand: "player",
      filter: 'game.id = "' + game + '"'
  });

  if (isLoading || data === undefined) return <span>loading...</span>;

  return (
    <span style={{ display: "flex", gap: 4, flexDirection: "column" }}>
      {data.map((x) => {
        const plc = x.placement;

        return (
          <span key={x.player}>
            {plc === 1 ? "🥇" : plc === 2 ? "🥈" : plc === 3 ? "🥉" : "🔘"}
            {x.expand?.player?.name}
          </span>
        );
      })}
    </span>
  );
}

function Games() {
  const { isLoading, data } = useGames({ sort: "-date", expand: "placements" });

  if (isLoading || !data) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h1>Recent games</h1>
      <table border={1}>
        <thead>
          <tr>
            <th>Game</th>
            <th>Placements</th>
          </tr>
        </thead>
        <tbody>
        {data.map((game) => (
          <tr key={game.id}>
            <td>{game.name}</td>
            <td>
              <Placements game={game.id} />
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default Games;
