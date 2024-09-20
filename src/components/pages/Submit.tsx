import React, { useMemo, useState } from "react";
import { parse } from "@/mapdata.ts";
import { Headline } from "@/components/Headline.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { MapView } from "@/components/pages/MapView.tsx";

export function Submit() {
  return (
    <div>
      <Headline>Submit tool</Headline>
      Content
    </div>
  );
}
