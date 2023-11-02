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
import { Placement } from "./client/placements";
import { Link } from "@tanstack/react-router";
import { FullLoading } from "./components/Loading";
import { Game } from "./conn";

function Placements({ placements }: { placements: Placement[] }) {
  return (
    <span style={{ display: "flex", gap: 4, flexDirection: "column" }}>
      {placements.sort(
        (a, b) => a.placement - b.placement
      ).map((x) => {
        const plc = x.placement;

        return (
          <span key={x.id} className="flex items-center">
            <span>
              {plc}. {x.expand?.player?.name}
            </span>
            {isWin(plc, placements.length) && (
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
  const { isLoading, data } = useGames({
    sort: "-date",
    expand: "placements(game),placements(game).player",
  });

  if (isLoading || !data) {
    return (
      <div>
        <FullLoading />
      </div>
    );
  }

  return (
    <div>
      <Headline>Games</Headline>

      <div className="text-muted-foreground mb-8">
        A game is considered won if on the first place, or in a game with five
        players, on the first or second place.
      </div>

      <RecentGamesTable data={data} />
    </div>
  );
}

export function RecentGamesTable({
  data,
  showMapColumn = true,
}: {
  data: Game[];
  showMapColumn?: boolean;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Game</TableHead>
          {showMapColumn && <TableHead>Map</TableHead>}
          <TableHead>Generations</TableHead>
          <TableHead>Placements</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((game) => {
          const placements = game.expand?.["placements(game)"];
          return (
            <TableRow key={game.id}>
              <TableCell>
                <Link
                  to="/games/$game"
                  params={{ game: game.id }}
                  className="underline"
                >
                  {game.date.split(" ")[0]}
                </Link>
              </TableCell>
              {showMapColumn && (
                <TableCell>
                  <MapCell map={game.map} />
                </TableCell>
              )}
              <TableCell>{game.generations}</TableCell>
              <TableCell>
                {placements && <Placements placements={placements} />}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export function MapCell({ map }: { map: string }) {
  return (
    <Link to={"/maps/$map"} params={{ map }} className="underline">
      <div className="flex items-center gap-1">
        <MapIcon map={map} />
        <span className="capitalize">{map}</span>
      </div>
    </Link>
  );
}

export default Games;
