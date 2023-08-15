import { Headline } from "./components/Headline";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import { useGames, usePlacements } from "./hooks/use-placements";

function Placements({ game }: { game: string }) {
  const { isLoading, data } = usePlacements({
    sort: "placement",
    expand: "player",
    filter: 'game.id = "' + game + '"',
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
      <Headline>Recent games</Headline>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Game</TableHead>
            <TableHead>Placements</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((game) => (
            <TableRow key={game.id}>
              <TableCell>{game.name}</TableCell>
              <TableCell>
                <Placements game={game.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Games;
