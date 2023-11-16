import { Headline } from "@/components/Headline.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { CorpTable } from "@/CorpRates.tsx";
import React, { useEffect, useMemo, useState } from "react";
import { DateTime, Duration, DurationUnits } from "luxon";
import { useGames } from "@/hooks/use-placements.tsx";
import { RecentGamesTable } from "@/Games.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "@tanstack/react-router";

const UNITS: DurationUnits = [
  "days",
  "hours",
  "minutes",
  "seconds",
  "milliseconds",
];

const DAY_GRADIENTS: Record<number, string> = {
  6: "from-blue-400 to-blue-700",
  5: "from-blue-600 to-blue-800",
  4: "from-blue-600 to-purple-800",
  3: "from-blue-700 to-purple-500",
  2: "from-purple-500 to-purple-900",
  1: "from-purple-500 to-red-900",
  0: "from-red-500 to-red-900",
};

function Countdown({ to }: { to: DateTime }) {
  const [diff, setDiff] = useState<Duration>(to.diffNow(UNITS));

  useEffect(() => {
    const interval = setInterval(() => {
      setDiff(to.diffNow(UNITS));
    }, 1000);
    return () => clearInterval(interval);
  }, [to]);

  const dayGradient = DAY_GRADIENTS[Math.min(6, diff.days)];

  return (
    <div className={"flex"}>
      <div
        className={`flex gap-5 text-white md:text-transparent md:bg-clip-text md:bg-gradient-to-r ${dayGradient}`}
      >
        {diff.seconds >= 0 ? (
          <>
            <div>
              <span className="countdown font-head text-3xl lg:text-6xl">
                <span style={{ ["--value" as string]: diff.days }}></span>
              </span>
              days
            </div>
            <div>
              <span className="countdown font-head text-3xl lg:text-6xl">
                <span style={{ ["--value" as string]: diff.hours }}></span>
              </span>
              hours
            </div>
            <div>
              <span className="countdown font-head text-3xl lg:text-6xl">
                <span style={{ ["--value" as string]: diff.minutes }}></span>
              </span>
              min
            </div>
            <div>
              <span className="countdown font-head text-3xl lg:text-6xl">
                <span style={{ ["--value" as string]: diff.seconds }}></span>
              </span>
              sec
            </div>
          </>
        ) : (
          <>
            <span className={"font-head text-3xl lg:text-6xl"}>
              Right now. Good luck!
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export function Home() {
  const { isLoading, data } = useGames({
    sort: "-date",
    expand: "placements(game),placements(game).player",
    filter: "planned = false",
  });

  const { data: plannedGames } = useGames({
    sort: "date",
    filter: "planned = true",
  });

  const date = useMemo(() => {
    if (!plannedGames) return DateTime.fromISO("2030-11-11T15:30:00");
    return DateTime.fromFormat(
      plannedGames[0].date,
      "yyyy-MM-dd HH:mm:ss.SSS'Z'",
    );
  }, [plannedGames]);

  return (
    <div>
      <div className={"grid gap-4"}>
        {date.diffNow(UNITS).hours >= 0 && (
          <Card className="">
            <CardHeader>
              <CardTitle>Next game</CardTitle>
            </CardHeader>
            <CardContent>
              <div>{plannedGames && <Countdown to={date} />}</div>
            </CardContent>
          </Card>
        )}

        <Card className="">
          <CardHeader>
            <CardTitle className={"hover:underline"}>
              <Link search={{}} params={{}} to={"/games"}>
                Last games
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <div>{data && <RecentGamesTable data={data.slice(0, 3)} />}</div>
              <div className={"flex justify-end"}>
                <Link search={{}} params={{}} to={"/games"}>
                  <Button variant={"link"}>Show all</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
