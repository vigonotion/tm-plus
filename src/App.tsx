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
  RouterContext,
} from "@tanstack/react-router";
import { TooltipProvider } from "./components/ui/tooltip";
import { Game as GamePage } from "./components/pages/Game";
import { Corporation } from "./components/pages/Corporation";
import { EloSimulator } from "./components/pages/EloSimulator";
import { Player } from "./components/pages/Player";
import { MapPage } from "./components/pages/Map";
import { About } from "./components/pages/About";
import { MapTool } from "./components/pages/MapTool";
import { getAllQueryData, getOneQueryData } from "./hooks/use-placements";
import { Corporation as CorporationResponse, Game } from "./conn";
import { Placement, Player as PlayerResponse } from "./client/placements";
import { CommandMenu } from "./components/CommandMenu";
import { Home } from "@/components/pages/Home.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000,
    },
  },
});

const routerContext = new RouterContext<{
  queryClient: typeof queryClient;
}>();

// Create a root route
const rootRoute = routerContext.createRootRoute({
  component: Root,
});

const gamesIndexRoute = new Route({
  getParentRoute: () => gamesRoute,
  getContext: () =>
    getAllQueryData<Game>("games", {
      sort: "-date",
      expand: "placements(game),placements(game).player",
    }),
  loader: async ({ context: { queryClient }, routeContext: queryOptions }) => {
    await queryClient.ensureQueryData(queryOptions);
  },
  path: "/",
  component: Games,
});

const eloSimRoute = new Route({
  getParentRoute: () => layoutRoute,
  path: "elo-sim",
  component: EloSimulator,
});

const aboutRoute = new Route({
  getParentRoute: () => layoutRoute,
  path: "about",
  component: About,
});

const mapToolRoute = new Route({
  getParentRoute: () => layoutRoute,
  path: "mapTool",
  component: MapTool,
});

const gamesRoute = new Route({
  getParentRoute: () => layoutRoute,
  path: "games",
  component: () => <Outlet />,
});

const playersRoute = new Route({
  getParentRoute: () => layoutRoute,
  getContext: () =>
    getAllQueryData<Placement>("placements", {
      sort: "placement",
      expand: "player,game",
    }),
  loader: async ({ context: { queryClient }, routeContext: queryOptions }) => {
    await queryClient.ensureQueryData(queryOptions);
  },
  path: "/players",
  component: () => <Outlet />,
});

const corpRatesRoute = new Route({
  getParentRoute: () => layoutRoute,
  getContext: () =>
    getAllQueryData<Placement>("placements", {
      expand: "corp",
    }),
  loader: async ({ context: { queryClient }, routeContext: queryOptions }) => {
    await queryClient.ensureQueryData(queryOptions);
  },
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
  getContext: ({ params: { corp } }) =>
    getOneQueryData<CorporationResponse>("corporations", corp, {
      expand: "placements(corp).game,placements(corp).player",
    }),
  loader: async ({ context: { queryClient }, routeContext: queryOptions }) => {
    await queryClient.ensureQueryData(queryOptions);
  },
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

const layoutRoute = new Route({
  getParentRoute: () => rootRoute,
  id: "layout",
  component: Layout,
});

const indexRoute = new Route({
  getParentRoute: () => layoutRoute,
  path: "/",
  component: Home,
});

const playerRoute = new Route({
  getParentRoute: () => playersRoute,
  path: "$player",
  getContext: ({ params: { player } }) =>
    getOneQueryData<PlayerResponse>("players", player, {}),
  loader: async ({ context: { queryClient }, routeContext: queryOptions }) => {
    await queryClient.ensureQueryData(queryOptions);
  },
  component: ({ useParams }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const params = useParams();

    return <Player key={params.player} player={params.player} />;
  },
});

const gameRoute = new Route({
  getParentRoute: () => gamesRoute,
  path: "$game",
  key: ({ params }) => params.game,
  getContext: ({ params: { game } }) =>
    getOneQueryData<Game>("games", game, {
      expand:
        "placements(game),placements(game).player,placements(game).corp,milestones_unlocked(game),milestones_unlocked(game).milestone,awards_unlocked(game),awards_unlocked(game).award",
    }),
  loader: async ({ context: { queryClient }, routeContext: queryOptions }) => {
    await queryClient.ensureQueryData(queryOptions);
  },
  component: () => <GamePage />,
});

const mapsRoute = new Route({
  getParentRoute: () => layoutRoute,
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
  getContext: ({ params: { map } }) =>
    getAllQueryData<Game>("games", {
      sort: "-date",
      expand: "placements(game),placements(game).player",
      filter: `map = '${map}'`,
    }),
  loader: async ({ context: { queryClient }, routeContext: queryOptions }) => {
    await queryClient.ensureQueryData(queryOptions);
  },
  component: ({ useParams }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const params = useParams();

    return <MapPage map={params.map} key={params.map} />;
  },
});

// Create the route tree using your routes
const routeTree = rootRoute.addChildren([
  layoutRoute.addChildren([
    indexRoute,
    playersRoute.addChildren([playerRoute, playerIndexRoute]),
    eloSimRoute,
    aboutRoute,
    mapsRoute.addChildren([mapRoute, mapIndexRoute]),
    corpRatesRoute.addChildren([corpRoute, corpIndexRoute]),
    gamesRoute.addChildren([gamesIndexRoute, gameRoute]),
    mapToolRoute,
  ]),
]);

// Create the router using your route tree
const router = new Router({
  routeTree,
  defaultPreload: "intent",
  context: { queryClient },
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
            <Outlet />
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

function Layout() {
  return (
    <>
      <CommandMenu />
      <Navbar />
      <Content>
        <Outlet />
      </Content>
    </>
  );
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
