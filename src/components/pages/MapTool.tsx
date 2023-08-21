import React, { useMemo, useState } from "react";
import { Headline } from "../Headline";
import { Input } from "../ui/input";
import { demoMap, parse } from "@/mapdata";
import { Button } from "../ui/button";
import { MapView } from "./MapView";

const INITIAL =
  "oogbgkgk0000cbgkck000000gbgkxycycgxggyckgbcygyoooo00gkgk00gygyoooooo00ck00cy00cgoooo00oo0000gk00000000cgxk0000xg00ggcg0000";

const text = `
# Tile type
o ocean
g greenery
c city
x other
0 empty

# Tile owner
r red
g green
b blue
y yellow 
k black
0/o not owned

Example map string visualized:

    oogbgkgk00
   00cbgkck0000
  00gbgkxycycgxg
 gyckgbcygyoooo00
gkgk00gygyoooooo00
 ck00cy00cgoooo00
  oo0000gk000000
   00cgxk0000xg
    00ggcg0000
`;

export function MapTool() {
  const [map, setMap] = useState(INITIAL);

  const parsed = useMemo(() => parse(map), [map]);

  return (
    <div>
      <Headline>Map tool</Headline>

      <div className="flex gap-2">
        <Input value={map} onChange={(e) => setMap(e.target.value)} />
        <Button variant="outline" onClick={() => setMap(INITIAL)}>
          Reset
        </Button>
      </div>

      <MapView map={parsed} />

      <div>
        <Headline className="text-xl mt-8">Data format explained</Headline>
        <div>
          <p>
            The string represents the map from the top left to bottom right. Two
            characters describe one tile. The first character defines the tile
            type, the second defines the owner.
          </p>
          <p>
            Example: <code className="text-orange-500">gy</code> describes a
            greenery tile owned by yellow.
          </p>
          <p>
            <pre>{text}</pre>
          </p>
        </div>
      </div>
    </div>
  );
}
