import React, { memo, useLayoutEffect, useRef, useState } from "react";
import TOPOLOGY from "vanta/src/vanta.topology";
import HALO from "vanta/src/vanta.halo";
import TRUNK from "vanta/src/vanta.trunk";
import WAVES from "vanta/src/vanta.waves";
import CLOUDS from "vanta/src/vanta.clouds";
import NET from "vanta/src/vanta.net";
import DOTS from "vanta/src/vanta.dots";

import * as THREE from "three";
import p5 from "p5";
import { match } from "ts-pattern";
import { cn } from "@/utils.ts";

export type Effect =
  | "topology"
  | "halo"
  | "trunk"
  | "waves"
  | "fog"
  | "net"
  | "dots";

function Background({
  effect,
  className,
}: {
  effect: Effect;
  className?: string;
}) {
  const [vantaEffect, setVantaEffect] = useState<unknown>(null);
  const myRef = useRef(null);

  useLayoutEffect(() => {
    if (!vantaEffect) {
      const e = match(effect)
        .with("topology", () =>
          TOPOLOGY({
            el: myRef.current,
            THREE: THREE,
            p5: p5,
            mouseControls: false,
            touchControls: false,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 2.0,
            color: 0xc05b15,
            backgroundColor: 0x221200,
          }),
        )
        .with("halo", () =>
          HALO({
            el: myRef.current,
            THREE: THREE,
            p5: p5,
            mouseControls: true,
            touchControls: true,
            gyroControls: true,
            size: 1.4,
            minHeight: 200.0,
            minWidth: 200.0,
            baseColor: 0xde6e12,
            backgroundColor: 0x1b0d05,
          }),
        )
        .with("trunk", () =>
          TRUNK({
            el: myRef.current,
            THREE: THREE,
            p5: p5,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0x3c1d10,
            backgroundColor: 0x0,
            spacing: 10.0,
            chaos: 2.5,
          }),
        )
        .with("waves", () =>
          WAVES({
            el: myRef.current,
            THREE: THREE,
            p5: p5,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0x140b06,
            shininess: 8.0,
            waveSpeed: 0.4,
          }),
        )
        .with("fog", () =>
          CLOUDS({
            el: myRef.current,
            THREE: THREE,
            p5: p5,
            minHeight: 200.0,
            minWidth: 200.0,
            skyColor: 0x181414,
            sunColor: 0x412607,
            speed: 0.7,
          }),
        )
        .with("net", () =>
          NET({
            el: myRef.current,
            THREE: THREE,
            p5: p5,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0xff6c3f,
            backgroundColor: 0x3c2015,
            showDots: false,
          }),
        )
        .with("dots", () =>
          DOTS({
            el: myRef.current,
            THREE: THREE,
            p5: p5,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
          }),
        )
        .exhaustive();

      setVantaEffect(e);
    }
    return () => {
      if (vantaEffect) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        vantaEffect.destroy();
      }
    };
  }, [effect, vantaEffect]);

  return (
    <div className={cn("w-full h-full absolute", className)} ref={myRef}></div>
  );
}

export const WrappedBackground = memo(Background);
