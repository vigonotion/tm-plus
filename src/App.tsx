import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import { QueryClient, QueryClientProvider } from "react-query";
import Games from "./Games";
import Ratings from "./Ratings";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div style={{ display: "flex", gap: 20 }}>
          <Games />
          <Ratings />
        </div>
      </QueryClientProvider>
    </>
  );
}

export default App;
