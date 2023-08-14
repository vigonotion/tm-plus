import React, { useMemo, useState, useEffect } from "react";
import * as THREE from "three";
import { useSpring, animated } from "@react-spring/three";
import { GroupProps } from "@react-three/fiber";
import { SVGLoader } from "three/addons/loaders/SVGLoader.js";

function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(101);

export const Square = (size: number) => {
  const half = size / 2;
  return `
      m .5 .5
      m -${half} -${half}
      l ${size} 0
      l 0 ${size}
      l -${size} 0
      l 0 -${size + 0.5}
      m 0 .5
    `;
};

export const RepeatedSquares = (size: number) => {
  const CELL_PADDING = 2;
  const CELL_SIZE = 4;
  const cells = size / 6;

  let str = `m -${size / 2} -${size / 2}`;
  str += `m 0 2`;

  for (let x = 0; x < cells; x += 1) {
    for (let y = 0; y < cells; y += 1) {
      if (rand() > 0.5) {
        str += Square(CELL_SIZE);
        str += ` m -.5 -.5`;
        str += ` m ${CELL_SIZE / 2} ${CELL_SIZE / 2}`;
      }
      str += ` m ${CELL_SIZE + CELL_PADDING} 0`;
    }
    str += `m -${Math.ceil(cells) * (CELL_SIZE + CELL_PADDING)} ${
      CELL_SIZE + CELL_PADDING
    }`;
  }
  return str;
};

export const Plus = (size: number) => {
  const half = size / 2;
  return `
      m .5 .5
      m -${half} -${half}
      m 0 ${half}
      l ${size} 0
      m -${half} -${half}
      l 0 ${size}
    `;
};

export const Circle = (size: number) => {
  const half = size / 2;
  if (rand() < 0.8) return "";
  return `
      m .5 .5
      m ${size - 1} ${0}
      a ${size} ${size}, 0, 1, 0, ${0} ${0.01}
    `;
};

export const Panel = (
  width: number,
  height: number,
  startX = 40,
  startY = 40
) => {
  // rand = mulberry32(9999);

  let pathString = "";

  // pathString += `
  //   M ${startX} ${startY}
  //   m .5 .5
  //   l ${width} 0
  //   l 0 ${height}
  //   l ${-width} 0
  //   l 0 ${-height}
  // `;

  const SPACING_X = 22;
  const SPACING_Y = 22;
  const SIZE_INTERVAL = 2;

  const cellsX = width / (SPACING_X + SIZE_INTERVAL / 2);
  const cellsY = height / (SPACING_Y + SIZE_INTERVAL / 2);

  const items = [Square, RepeatedSquares, Plus, Circle];

  for (let x = 0; x < 2; x += 1) {
    // Draw verticals
    for (let y1 = 1; y1 < cellsY - 1; y1 += 1) {
      if (rand() > 0.3) {
        const posX = x * width;
        const posY = y1 * SPACING_Y;
        pathString += ` M ${startX + posX} ${startY + posY}`;
        const shape = items[Math.floor(rand() * items.length)];
        const size = Math.floor(rand() * 5) * SIZE_INTERVAL;
        pathString += shape(size);
      }
    }
  }

  for (let y = 0; y < 2; y += 1) {
    // Draw horizontals
    for (let x1 = 1; x1 < cellsX - 1; x1 += 1) {
      if (rand() > 0.3) {
        const posX = x1 * SPACING_X;
        const posY = y * height;
        pathString += ` M ${startX + posX} ${startY + posY}`;
        const shape = items[Math.floor(rand() * items.length)];
        const size = Math.floor(rand() * 5) * SIZE_INTERVAL;
        pathString += shape(size);
      }
    }
  }

  return pathString;
};

export const randomSquares = ({
  width,
  height,
  spacing = 40,
  sizeInterval = 4,
}: {
  width: number;
  height: number;
  spacing: number;
  sizeInterval: number;
}) => {
  const SPACING_X = spacing;
  const SPACING_Y = spacing;
  const SIZE_INTERVAL = sizeInterval;

  const items = [Square, RepeatedSquares, Plus, Circle];

  let pathString = "";

  for (let x = 0; x < Math.floor(width / SPACING_X); x += 1) {
    for (let y = 0; y < Math.floor(height / SPACING_Y); y += 1) {
      if (rand() > 0.5) {
        pathString += ` M ${x * SPACING_X} ${y * SPACING_Y}`;
        const shape = items[Math.floor(rand() * items.length)];
        const size = Math.floor(rand() * 5) * SIZE_INTERVAL;
        pathString += shape(size);
      } else if (rand() > 0.99) {
        pathString += ` M ${x * SPACING_X} ${y * SPACING_Y}`;
        pathString += ` m 0 .5 m -${SPACING_X / 2} 0 l ${SPACING_X} 0`;
      }
    }
  }

  return pathString;
};

function Shape({
  shape,
  color,
  opacity,
  position,
  rotation,
}: {
  shape: THREE.Shape;
  color: THREE.Color;
  opacity: number;
  position: THREE.Vector3;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rotation: any; // TODO any
}) {
  return (
    <animated.mesh position={position} rotation={rotation}>
      <meshBasicMaterial
        attach="material"
        transparent
        opacity={opacity}
        depthWrite={false}
        color={color}
        side={THREE.DoubleSide}
      />
      <shapeBufferGeometry attach="geometry" args={[shape]} />
    </animated.mesh>
  );
}

function Stroke({
  stroke,
  color,
  opacity,
  animate,
}: {
  stroke: THREE.BufferGeometry;
  color: THREE.Color;
  opacity: number;
  animate: boolean;
}) {
  const rotation = new THREE.Euler();
  const [state, setState] = useState(() => Math.random() > 0.5);
  const shouldAnimate = useMemo(() => Math.random() > 0.5, []);
  const direction = useMemo(() => Math.random() > 0.5, []);

  const position: THREE.Vector3 = new THREE.Vector3(
    direction ? 10 : 0,
    direction ? 0 : 10,
    0
  );

  return (
    <animated.mesh geometry={stroke} position={position} rotation={rotation}>
      <meshBasicMaterial
        attach="material"
        transparent
        opacity={opacity}
        depthWrite={false}
        color={color}
        side={THREE.DoubleSide}
      />
    </animated.mesh>
  );
}

export function SVG({
  shapes,
  strokes,
  opacity,
  animate,
  ...rest
}: {
  opacity: number;
  animate: boolean;
  strokes: React.ComponentProps<typeof Stroke>[];
  shapes: React.ComponentProps<typeof Shape>[];
} & GroupProps) {
  return (
    <group {...rest}>
      {shapes &&
        shapes.map((item, idx) => <Shape key={item.shape.uuid} {...item} />)}
      {strokes &&
        strokes.map((item, idx) => <Stroke key={item.stroke.uuid} {...item} />)}
    </group>
  );
}

function rad(deg: number) {
  return (deg * Math.PI) / 180;
}

export function getSVGGeometry(src: string) {
  const data = new SVGLoader().parse(src);

  const shapes = flatten(
    data.paths.map((path, index) =>
      path.toShapes(true).map((shape) => ({ shape, color: path.color, index }))
    )
  );

//   const strokes = flatten(
//     data.paths.map((path, index) => {
//       const strokeColor = path.userData.style.stroke;
//       if (strokeColor !== undefined && strokeColor !== "none") {
//         return path.subPaths.map((subPath) => ({
//           stroke: SVGLoader.pointsToStroke(subPath.getPoints(), {
//             ...path.userData.style,
//             strokeWidth: 1,
//           }),
//           color: strokeColor,
//         }));
//       }
//     })
//   ).filter((s) => s && s.stroke);
const strokes: THREE.BufferGeometry<THREE.NormalBufferAttributes>[] = [];

  return { shapes, strokes };
}

export default function ScifiPanel({
  width,
  height,
  color = "#fff",
  opacity = 1,
  ghost,
  children,
  ...rest
}: React.PropsWithChildren<{
    width: number,
    height: number,
    color: string,
    opacity: number,
    ghost: boolean,
}>) {
  const { shapes, strokes } = useMemo(
    () =>
      getSVGGeometry(`
      <svg>
        <path d="M16 6H86V8H16V6Z" fill="${color}"/>
        <path d="M14 8L12 6L6 12L8 14L14 8Z" fill="${color}"/>
        <path d="M6 86V16H8V86H6Z" fill="${color}"/>
        <path d="M0 64H2V88L8 94V130H6V95L0 89V64Z" fill="${color}"/>
        <path d="M64 0V2H88L94 8H130V6H95L89 0H64Z" fill="${color}"/>
      </svg>
    `),
    [color]
  );

  const { genShapes, genStrokes } = useMemo(() => {
    const data = getSVGGeometry(`
      <svg>
        <path stroke="${color}" d="${RandomPanel(width, height, 0, 0)}" />
      </svg>
    `);

    return {
      genShapes: data.shapes,
      genStrokes: data.strokes,
    };
  }, [width, height, color]);

  const render = (zOffset = 0, opacity2) => {
    return (
      <>
        <SVG animate strokes={genStrokes} opacity={opacity - opacity2} />
        <SVG
          opacity={opacity - opacity2}
          shapes={shapes.map(x => x.shape)}
          strokes={strokes}
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, zOffset]}
          rotation={[0, 0, 0]}
        />
        <SVG
          opacity={opacity - opacity2}
          shapes={shapes}
          strokes={strokes}
          scale={[0.5, 0.5, 0.5]}
          position={[width, 0, zOffset]}
          rotation={[0, 0, rad(90)]}
        />
        <SVG
          opacity={opacity - opacity2}
          shapes={shapes}
          strokes={strokes}
          scale={[0.5, 0.5, 0.5]}
          position={[width, height, zOffset]}
          rotation={[0, 0, rad(180)]}
        />
        <SVG
          opacity={opacity - opacity2}
          shapes={shapes}
          strokes={strokes}
          scale={[0.5, 0.5, 0.5]}
          position={[0, height, zOffset]}
          rotation={[0, 0, rad(270)]}
        />
      </>
    );
  };

  return (
    <group {...rest}>
      <group position={[0, -height, 0]}>
        {render(0, 0)}
        {render(-15, 0.9)}
      </group>
      {children}
    </group>
  );
}

function flatten<T>(arg0: T[][]) {
  return arg0.flat();
}
