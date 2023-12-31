/* eslint-disable react-hooks/rules-of-hooks */
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
import imgTerra from "../assets/terra.png";

import "../wrapped.css";
import { WrappedBackground } from "@/components/WrappedBackground.tsx";
import { match, P } from "ts-pattern";
import { MapIcon } from "@/Games.tsx";
import { motion } from "framer-motion";
import { isMobile } from "react-device-detect";
import { Button } from "@/components/ui/button.tsx";

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
      content: (props) => {
        return (
          <>
            <WrappedBackground effect={"topology"} />

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
        );
      },
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
          }, 5000);

          return () => {
            window.clearTimeout(t);
            window.clearTimeout(t2);
          };
        }, [setX]);

        const hours = (placements?.length ?? 0) * 4;

        return (
          <>
            <WrappedBackground effect={"halo"} />

            <div
              className={
                "text-xl w-full h-full flex flex-col items-center justify-center gap-8 p-4 absolute transition-opacity duration-1000"
              }
              style={{ opacity: 1 - y }}
            >
              <div>You've played</div>
              <div>
                <span className="countdown font-proto text-6xl tm-countdown-wrapped">
                  <span style={{ ["--value" as string]: x }}></span>
                </span>
              </div>
              <div>games this year.</div>
            </div>

            <div
              className={
                "text-xl w-full h-full flex flex-col items-center justify-center gap-8 p-4 absolute "
              }
            >
              <div
                className={"text-center transition-opacity duration-1000 w-2/3"}
                style={{ opacity: y }}
              >
                With an average game duration of 4 hours, that would be{" "}
                {match(hours)
                  .with(P.number.between(0, 24), (h) => hours + " hours")
                  .with(P.number.lt(47), () => "a full day")
                  .otherwise((p) => Math.floor(p / 24) + " days")}
                !
              </div>
            </div>
          </>
        );
      },
    },
    {
      content: (props) => (
        <>
          <WrappedBackground effect={"trunk"} />

          <motion.div
            layout
            layoutRoot
            className={
              "text-xl w-full h-full flex flex-col items-center justify-center gap-8 p-4 absolute transition-opacity duration-1000"
            }
          >
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              Most of your games happened on
            </motion.div>
            <motion.div
              layout
              className={"flex justify-center items-center gap-2"}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 }}
            >
              <MapIcon map={favMap as "mars"} size={24} />{" "}
              <span className={"font-proto uppercase"}>
                {match(favMap)
                  .with("mars", () => "tharsis")
                  .otherwise((p) => p)}
              </span>
            </motion.div>
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 3 }}
            >
              You've played it {favMapTimes} times
            </motion.div>
          </motion.div>
        </>
      ),
    },
    // {
    //   content: (props) => (
    //     <>
    //       <WrappedBackground effect={"waves"} />
    //
    //       <motion.div
    //         layout
    //         layoutRoot
    //         className={
    //           "text-xl w-full h-full flex flex-col items-center justify-center gap-8 p-4 absolute transition-opacity duration-1000 text-center"
    //         }
    //       >
    //         <motion.div
    //           layout
    //           initial={{
    //             opacity: 0,
    //             transform: "translateY(-20px)",
    //           }}
    //           animate={{ opacity: 1, transform: "translateY(0px)" }}
    //         >
    //           There is one milestone you unlocked the most:
    //         </motion.div>
    //         <motion.div
    //           layout
    //           initial={{ opacity: 0, scale: 0.5 }}
    //           animate={{ opacity: 1, scale: 1 }}
    //           transition={{ delay: 1.5 }}
    //         >
    //           <div className={"font-proto text-2xl"}>{favMile?.name}</div>
    //           <div className={"text-sm opacity-40"}>{favMile?.note}</div>
    //         </motion.div>
    //         <motion.div
    //           layout
    //           initial={{
    //             opacity: 0,
    //             transform: "translateY(20px)",
    //           }}
    //           animate={{ opacity: 1, transform: "translateY(0px)" }}
    //           transition={{ delay: 3 }}
    //         >
    //           You've unlocked it in {favMileTimes} games.
    //         </motion.div>
    //       </motion.div>
    //     </>
    //   ),
    // },
    {
      content: (_) => {
        const [x, setX] = useState(0);
        const [y, setY] = useState(0);

        useEffect(() => {
          const t = window.setTimeout(() => {
            setX(terraScore ?? 0);
          }, 500);

          const t2 = window.setTimeout(() => {
            setY(1);
          }, 6000);

          return () => {
            window.clearTimeout(t);
            window.clearTimeout(t2);
          };
        }, [setX]);

        const hours = (placements?.length ?? 0) * 4;

        return (
          <>
            <WrappedBackground effect={"fog"} />

            <div
              className={
                "text-xl w-full h-full flex flex-col items-center justify-center gap-4 p-4 absolute transition-opacity duration-1000"
              }
              style={{ opacity: 1 - y }}
            >
              <div>Your total terraform score is</div>
              <motion.div
                className={"flex items-center gap-2"}
                initial={{
                  opacity: 0,
                  transform: "translateY(020px)",
                }}
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                transition={{ delay: 0.7 }}
              >
                <span className="font-proto text-6xl">{terraScore}</span>
                <img src={imgTerra} width={64} />
              </motion.div>
            </div>

            <div
              className={
                "text-xl w-full h-full flex flex-col items-center justify-center gap-8 p-4 absolute "
              }
            >
              <div
                className={"text-center transition-opacity duration-1000 w-2/3"}
                style={{ opacity: y }}
              >
                That means you alone terraformed the mars{" "}
                {Math.floor(terraScore / 43)} times.
              </div>
            </div>
          </>
        );
      },
    },
    {
      content: (props) => (
        <>
          <WrappedBackground effect={"net"} className={"opacity-20"} />

          <motion.div
            layout
            layoutRoot
            className={
              "text-xl w-full h-full flex flex-col items-center justify-center gap-8 p-4 absolute transition-opacity duration-1000 text-center"
            }
          >
            <motion.div
              layout
              initial={{
                opacity: 0,
                transform: "translateY(-20px)",
              }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
            >
              Your favorite corporation this year was:
            </motion.div>
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 }}
              className={"flex flex-col gap-3"}
            >
              <div
                dangerouslySetInnerHTML={{ __html: favCorp?.logo ?? "" }}
              ></div>
              <div className={"text-sm opacity-90"}>{favCorp?.ability}</div>
            </motion.div>
            <motion.div
              layout
              initial={{
                opacity: 0,
                transform: "translateY(20px)",
              }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ delay: 3 }}
            >
              You've played it {favCorpTimes} times.
            </motion.div>
          </motion.div>
        </>
      ),
    },
    {
      content: (_) => {
        const [x, setX] = useState(0);
        const [y, setY] = useState(0);

        useEffect(() => {
          const t = window.setTimeout(() => {
            setX(placements?.filter((x) => x.placement === 1).length ?? 0);
          }, 500);

          const t2 = window.setTimeout(() => {
            setY(1);
          }, 6000);

          return () => {
            window.clearTimeout(t);
            window.clearTimeout(t2);
          };
        }, [setX]);

        const hours = (placements?.length ?? 0) * 4;

        return (
          <>
            <WrappedBackground effect={"halo"} />

            <div
              className={
                "text-xl w-full h-full flex flex-col items-center justify-center gap-8 p-4 absolute transition-opacity duration-1000"
              }
              style={{ opacity: 1 - y }}
            >
              <div>You've won</div>
              <div>
                <span className="countdown font-proto text-6xl tm-countdown-wrapped">
                  <span style={{ ["--value" as string]: x }}></span>
                </span>
              </div>
              <div>games this year.</div>
            </div>

            <div
              className={
                "text-xl w-full h-full flex flex-col items-center justify-center gap-8 p-4 absolute "
              }
            >
              <div
                className={"text-center transition-opacity duration-1000 w-2/3"}
                style={{ opacity: y }}
              >
                <div>Your longest streak was</div>
                <div className={"font-proto"}>{winStreak} sessions long</div>
              </div>
            </div>
          </>
        );
      },
    },
    {
      content: (props) => {
        return (
          <>
            <WrappedBackground effect={"topology"} />

            <div
              className={
                "w-full h-full flex flex-col items-center justify-center gap-8 p-4 relative tm-textshadow"
              }
            >
              <div className={"font-proto text-5xl text-center"}>
                here's to a new year
              </div>

              <span className="flex gap-2 font-head uppercase items-center">
                <Circle className="text-orange-500" />
                <span className="mt-[3px]">
                  Terraforming Mars <sup>+</sup>
                </span>
              </span>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <div className={"flex content-center items-center justify-center"}>
      <Stories
        stories={stories}
        defaultInterval={10000}
        width={isMobile ? "100dvw" : undefined}
        height={isMobile ? "100dvh" : undefined}
        keyboardNavigation={true}
      />
    </div>
  );
}
