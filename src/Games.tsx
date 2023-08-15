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
import { Circle, Snowflake, Leaf, Trophy } from "lucide-react";
import { isWin } from "./utils";

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
          <span key={x.player} className="flex items-center">
            <span>
              {plc}. {x.expand?.player?.name}
            </span>
            {isWin(plc, data.length) && (
              <Trophy className="text-yellow-500 ml-2" size={12} />
            )}
          </span>
        );
      })}
    </span>
  );
}

function MapIcon({ map }: { map: string }) {
  if (map === "hellas") {
    return <Snowflake size={16} className="text-blue-500" />;
  }

  if (map === "elysium") {
    return <Leaf size={16} className="text-green-500" />;
  }

  return <Circle size={16} className="text-orange-500" />;
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
            <TableHead>Map</TableHead>
            <TableHead>Generations</TableHead>
            <TableHead>Placements</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((game) => (
            <TableRow key={game.id}>
              <TableCell>{game.date.split(" ")[0]}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <MapIcon map={game.map} />
                  <span className="capitalize">{game.map}</span>
                </div>
              </TableCell>
              <TableCell>{game.generations}</TableCell>
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
