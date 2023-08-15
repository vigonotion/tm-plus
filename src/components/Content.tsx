import React from "react";

export function Content({ children }: { children: React.ReactNode }) {
  return <main className="max-w-screen-xl mx-auto">{children}</main>;
}
