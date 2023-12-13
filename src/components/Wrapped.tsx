import React, { useMemo } from "react";
import Stories from "react-insta-stories";
import { Story } from "react-insta-stories/dist/interfaces";
import {
  useCorporation,
  usePlacements,
  usePlayer,
} from "@/hooks/use-placements.tsx";
import { useRatings } from "@/hooks/use-ratings.tsx";
import Enumerable from "linq";

export function Wrapped({ playerId }: { playerId: string }) {
  const { data: player } = usePlayer(playerId, {});

  const { data: placements } = usePlacements({
    filter: `player = '${player?.id}' && game.date >= "2023-01-01" && game.date <= "2023-12-31"`,
    expand: "game",
    sort: "-game.date",
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
    () => placements?.map((a) => a.tw).reduce((a, b) => a + b) ?? 0,
    [placements],
  );

  const { data: favCorp } = useCorporation(favCorpId || "", {});

  const stories: Story[] = [
    {
      content: (props) => (
        <div>
          <div>Terraforming Mars Wrapped</div>
          <div>2023</div>
          <div>for {player?.name}</div>
        </div>
      ),
    },
    {
      content: (props) => (
        <div>
          <div>You've played {placements?.length} times this year</div>
          <div>
            With an average game duration of 4 hours, that would be{" "}
            {((placements?.length ?? 0) * 4) / 24} days!
          </div>
        </div>
      ),
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
    <div className={"flex content-center items-center justify-center mt-4"}>
      <Stories
        stories={stories}
        defaultInterval={5000}
        width={432}
        height={768}
        keyboardNavigation={true}
      />
    </div>
  );
}
