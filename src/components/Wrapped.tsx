/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useMemo, useRef, useState } from "react";
import Stories from "react-insta-stories";
import { Story } from "react-insta-stories/dist/interfaces";
import {
  useCorporation,
  useMilestonesUnlocked,
  usePlacements,
  usePlayer,
} from "@/hooks/use-placements.tsx";
import { useRatings } from "@/hooks/use-ratings.tsx";
import Enumerable from "linq";
import { Circle } from "lucide-react";

import "../wrapped.css";

export function Wrapped({ playerId }: { playerId: string }) {
  const { data: player } = usePlayer(playerId, {});

  const { data: placements } = usePlacements({
    filter: `player = '${player?.id}' && game.date >= "2023-01-01" && game.date <= "2023-12-31"`,
    expand: "game",
    sort: "-game.date",
  });

  const { data: milestonesUnlocked } = useMilestonesUnlocked({
    filter: `player = '${player?.id}' && game.date >= "2023-01-01" && game.date <= "2023-12-31"`,
    expand: "milestone",
  });

  const [favCorpId, favCorpTimes] = useMemo(() => {
    if (!placements) return [null, 0];

    const e = Enumerable.from(placements)
      .where((x) => !!x.corp)
      .groupBy((x) => x.corp)
      .orderByDescending((x) => x.count())
      .firstOrDefault();

    return [e?.key(), e?.count() ?? 0];
  }, [placements]);

  const [favMap, favMapTimes] = useMemo(() => {
    if (!placements) return [null, 0];

    const e = Enumerable.from(placements)
      .groupBy((x) => x.expand!.game!.map)
      .orderByDescending((x) => x.count())
      .firstOrDefault();

    return [e?.key(), e?.count() ?? 0];
  }, [placements]);

  const [favMile, favMileTimes] = useMemo(() => {
    if (!milestonesUnlocked) return [null, 0];

    const e = Enumerable.from(milestonesUnlocked)
      .groupBy((x) => x.id)
      .orderByDescending((x) => x.count())
      .firstOrDefault();

    return [e?.first().expand?.milestone, e?.count() ?? 0];
  }, [placements]);

  const winStreak = useMemo(() => {
    if (!placements) return 0;

    let max = 0;
    let cur = 0;

    placements.forEach((p) => {
      if (p.placement === 1) {
        cur++;
        if (cur > max) max = cur;
      } else {
        cur = 0;
      }
    });

    return max;
  }, [placements]);

  const terraScore = useMemo(
    () => placements?.map((a) => a.tw).reduce((a, b) => a + b, 0) ?? 0,
    [placements],
  );

  const { data: favCorp } = useCorporation(favCorpId || "", {});

  const stories: Story[] = [
    {
      content: (props) => (
        <>
          <div className="gradient"></div>

          <div
            className={
              "w-full h-full flex flex-col items-center justify-center gap-8 p-4 relative tm-textshadow"
            }
          >
            <span className="flex gap-2 font-head uppercase items-center">
              <Circle className="text-orange-500" />
              <span className="mt-[3px]">
                Terraforming Mars <sup>WRAPPED</sup>
              </span>
            </span>
            <div className={"font-head text-5xl"}>2023</div>
            <div className={"text-[3em] font-proto"}>for {player?.name}</div>
          </div>
        </>
      ),
    },
    {
      content: (_) => {
        const [x, setX] = useState(0);
        const [y, setY] = useState(0);

        useEffect(() => {
          const t = window.setTimeout(() => {
            setX(placements?.length ?? 0);
          }, 500);

          const t2 = window.setTimeout(() => {
            setY(1);
          }, 4000);

          return () => {
            window.clearTimeout(t);
            window.clearTimeout(t2);
          };
        }, [setX]);

        return (
          <>
            <div className="gradient2"></div>
            <div className="gradient2b"></div>
            <div
              className={
                "text-2xl w-full h-full flex flex-col items-center justify-center gap-8 p-4"
              }
            >
              <div>You've played</div>
              <div>
                <span className="countdown font-proto text-6xl tm-countdown-wrapped">
                  <span style={{ ["--value" as string]: x }}></span>
                </span>
              </div>
              <div>games this year.</div>

              <div className="h-8"></div>

              <div
                className={"text-center transition-opacity duration-700"}
                style={{ opacity: y }}
              >
                With an average game duration of 4 hours, that would be{" "}
                {Math.floor(((placements?.length ?? 0) * 4) / 24)} days!
              </div>
            </div>
          </>
        );
      },
    },
    {
      content: (props) => (
        <div>
          <div>Most of your games happened on {favMap}</div>
          <div>You've played it {favMapTimes} times</div>
        </div>
      ),
    },
    {
      content: (props) => (
        <div>
          <div>There is one milestone you unlocked the most:</div>
          <div>{favMile?.name}</div>
          <div>{favMile?.note}</div>

          <div>You've unlocked it in {favMileTimes} games.</div>
        </div>
      ),
    },
    {
      content: (props) => (
        <div>
          <div>You got {terraScore} terra scores.</div>
          <div>
            That means you alone terraformed the mars{" "}
            {Math.floor(terraScore / 43)} times
          </div>
        </div>
      ),
    },
    {
      content: (props) => (
        <div>
          <div>Your favorite corporation was</div>

          <div dangerouslySetInnerHTML={{ __html: favCorp?.logo ?? "" }}></div>
          <div>{favCorp?.ability}</div>

          <div>You've played it {favCorpTimes} times</div>
        </div>
      ),
    },
    {
      content: (props) => (
        <div>
          <div>
            You've won {placements?.filter((x) => x.placement === 1).length}{" "}
            times this year
          </div>
          <div>And your longest streak was {winStreak} sessions long</div>
        </div>
      ),
    },
  ];

  return (
    <div className={"flex content-center items-center justify-center"}>
      <Stories
        stories={stories}
        defaultInterval={500000}
        // width={"100dvw"}
        // height={"100dvh"}

        keyboardNavigation={true}
      />
    </div>
  );
}
