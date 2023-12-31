import React, { memo, useLayoutEffect, useRef, useState } from "react";
import TOPOLOGY from "vanta/src/vanta.topology";
import HALO from "vanta/src/vanta.halo";
import * as THREE from "three";
import p5 from "p5";
import { match } from "ts-pattern";

export type Effect = "topology" | "halo";

function Background({ effect }: { effect: Effect }) {
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
        .exhaustive();

      setVantaEffect(e);
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [effect, vantaEffect]);

  console.log("rerender");

  return <div className={"w-full h-full absolute"} ref={myRef}></div>;
}

export const WrappedBackground = memo(Background);
