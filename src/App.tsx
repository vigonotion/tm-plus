import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Games from "./Games";
import Ratings from "./Ratings";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";


function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div style={{ display: "flex", gap: 20 }}>
          <Games />
          <Ratings />
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
