import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Games from "./Games";
import Ratings from "./Ratings";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CorpRates from "./CorpRates";

import "./global.css";
import { ThemeProvider } from "./components/theme-provider";
import { Navbar } from "./components/Navbar";
import { Content } from "./components/Content";
import {
  Outlet,
  RouterProvider,
  Link,
  Router,
  Route,
  RootRoute,
} from "@tanstack/react-router";
import { TooltipProvider } from "./components/ui/tooltip";
import { Game } from "./components/pages/Game";

// Create a root route
const rootRoute = new RootRoute({
  component: Root,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Games,
});

const gamesRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "games",
  component: () => <Outlet />,
});

const ratingsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/ratings",
  component: Ratings,
});

const corpRatesRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/corporations",
  component: CorpRates,
});

const gameRoute = new Route({
  getParentRoute: () => gamesRoute,
  path: "$game",
  key: false,
  component: ({ useParams }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const params = useParams();

    return <Game game={params.game} />;
  },
});

// Create the route tree using your routes
const routeTree = rootRoute.addChildren([
  indexRoute,
  ratingsRoute,
  corpRatesRoute,
  gamesRoute.addChildren([gameRoute]),
]);

const queryClient = new QueryClient();

// Create the router using your route tree
const router = new Router({
  routeTree,
  defaultPreload: "intent",
  context: queryClient,
});

// Register your router for maximum type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function Root() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <TooltipProvider delayDuration={200}>
          <QueryClientProvider client={queryClient}>
            <Navbar />
            <Content>
              <Outlet />
            </Content>
            {/* <div style={{ display: "flex", gap: 20 }}>
                <Games />
                <Ratings />
                <CorpRates />
              </div> */}
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </TooltipProvider>
      </ThemeProvider>
    </>
  );
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
