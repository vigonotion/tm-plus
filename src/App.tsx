import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Games from "./Games";
import Ratings from "./Ratings";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CorpRates from "./CorpRates";
import Demo from "./Demo";
import View from "./View";

import "./app.css";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div style={{ display: "flex", gap: 20 }}>
          <Games />
          <Ratings />
          <CorpRates />
          <Demo />
        </div>
        {/* <View /> */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
