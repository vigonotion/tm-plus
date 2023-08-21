import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function Measure({ label, value }: { label: string; value: number }) {
  return (
    <Card className=" h-[200px] overflow-hidden">
      <CardHeader>
        <CardTitle>{label}</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex flex-col space-between grow gap-8">
        <div className="px-6 flex gap-2 items-center">
          <div className="text-4xl">{value}</div>
        </div>
      </CardContent>
    </Card>
  );
}
