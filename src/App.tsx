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
import { Corporation } from "./components/pages/Corporation";
import { EloSimulator } from "./components/pages/EloSimulator";
import { Player } from "./components/pages/Player";
import { MapPage } from "./components/pages/Map";
import { About } from "./components/pages/About";

// Create a root route
const rootRoute = new RootRoute({
  component: Root,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Games,
});

const eloSimRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "elo-sim",
  component: EloSimulator,
});

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "about",
  component: About,
});

const gamesRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "games",
  component: () => <Outlet />,
});

const playersRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/players",
  component: () => <Outlet />,
});

const corpRatesRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "corporations",
  component: () => <Outlet />,
});

const corpIndexRoute = new Route({
  getParentRoute: () => corpRatesRoute,
  path: "/",
  component: CorpRates,
});

const corpRoute = new Route({
  getParentRoute: () => corpRatesRoute,
  path: "$corp",
  key: ({ params }) => params.corp,
  
  component: ({ useParams }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const params = useParams();

    return <Corporation corp={params.corp} key={params.corp} />;
  },
});

const playerIndexRoute = new Route({
  getParentRoute: () => playersRoute,
  path: "/",
  component: Ratings,
});

const playerRoute = new Route({
  getParentRoute: () => playersRoute,
  path: "$player",
  component: ({ useParams }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const params = useParams();

    return <Player player={params.player} key={params.player} />;
  },
});

const gameRoute = new Route({
  getParentRoute: () => gamesRoute,
  path: "$game",
  key: ({ params }) => params.game,
  component: ({ useParams }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const params = useParams();

    return <Game game={params.game} key={params.game} />;
  },
});

const mapsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "maps",
  component: () => <Outlet />,
});

const mapIndexRoute = new Route({
  getParentRoute: () => mapsRoute,
  path: "/",
  component: () => <span></span>,
});

const mapRoute = new Route({
  getParentRoute: () => mapsRoute,
  path: "$map",
  component: ({ useParams }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const params = useParams();

    return <MapPage map={params.map} key={params.map} />;
  },
});

// Create the route tree using your routes
const routeTree = rootRoute.addChildren([
  indexRoute,
  playersRoute.addChildren([playerRoute, playerIndexRoute]),
  eloSimRoute,
  aboutRoute,
  mapsRoute.addChildren([mapRoute, mapIndexRoute]),
  corpRatesRoute.addChildren([corpRoute, corpIndexRoute]),
  gamesRoute.addChildren([gameRoute]),
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000,
    },
  },
});

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
