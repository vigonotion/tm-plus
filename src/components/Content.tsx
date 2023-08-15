import React from "react";

export function Content({ children }: { children: React.ReactNode }) {
  return (
    <main className="max-w-screen-xl mx-auto px-4 md:px-8 mb-16">
      {children}
    </main>
  );
}
