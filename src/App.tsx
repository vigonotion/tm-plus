import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Games from "./Games";
import Ratings from "./Ratings";
import CorpRates from "./CorpRates";

import "./global.css";
import { ThemeProvider } from "./components/theme-provider";
import { Navbar } from "./components/Navbar";
import { Content } from "./components/Content";
import {
  Outlet,
  RouterProvider,
  Navigate,
  createRoute,
  createRootRouteWithContext,
  createRouter,
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
import { conn, Corporation as CorporationResponse, Game } from "./conn";
import { Placement, Player as PlayerResponse } from "./client/placements";
import { CommandMenu } from "./components/CommandMenu";
import { LoginPage } from "@/components/pages/LoginPage.tsx";
import { Home } from "@/components/pages/Home.tsx";
import { Wrapped } from "@/components/Wrapped.tsx";
import "@radix-ui/themes/styles.css";
import { Theme, ThemePanel } from "@radix-ui/themes";
import { Submit } from "@/components/pages/Submit.tsx";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000,
    },
  },
});

// Create a root route
const rootRoute = createRootRouteWithContext<{
  queryClient: typeof queryClient;
}>()({
  component: Root,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "login",
  component: LoginPage,
});

const logoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "logout",
  component: () => {
    conn.authStore.clear();

    return (
      <>
        <Navigate to={"/login"} />
      </>
    );
  },
});

const gamesIndexRoute = createRoute({
  getParentRoute: () => gamesRoute,
  beforeLoad: () =>
    getAllQueryData<Game>("games", {
      sort: "-date",
      expand: "placements(game),placements(game).player",
    }),
  loader: async ({ context: queryOptions }) => {
    await queryClient.ensureQueryData(queryOptions);
  },
  path: "/",
  component: Games,
});

const eloSimRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "elo-sim",
  component: EloSimulator,
});

const aboutRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "about",
  component: About,
});

const mapToolRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "mapTool",
  component: MapTool,
});

const gamesRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "games",
  component: () => <Outlet />,
});

const playersRoute = createRoute({
  getParentRoute: () => layoutRoute,
  beforeLoad: () =>
    getAllQueryData<Placement>("placements", {
      sort: "placement",
      expand: "player,game",
    }),
  loader: async ({ context: queryOptions }) => {
    await queryClient.ensureQueryData(queryOptions);
  },
  path: "/players",
  component: () => <Outlet />,
});

const corpRatesRoute = createRoute({
  getParentRoute: () => layoutRoute,
  beforeLoad: () =>
    getAllQueryData<Placement>("placements", {
      expand: "corp",
    }),
  loader: async ({ context: queryOptions }) => {
    await queryClient.ensureQueryData(queryOptions);
  },
  path: "corporations",
  component: () => <Outlet />,
});

const corpIndexRoute = createRoute({
  getParentRoute: () => corpRatesRoute,
  path: "/",
  component: CorpRates,
});

const corpRoute = createRoute({
  getParentRoute: () => corpRatesRoute,
  path: "$corp",
  // key: ({ params }) => params.corp,
  beforeLoad: ({ params: { corp } }) =>
    getOneQueryData<CorporationResponse>("corporations", corp, {
      expand: "placements(corp).game,placements(corp).player",
    }),
  loader: async ({ context: queryOptions }) => {
    await queryClient.ensureQueryData(queryOptions);
  },
  component: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const params = corpRoute.useParams();

    return <Corporation corp={params.corp} key={params.corp} />;
  },
});

const playerIndexRoute = createRoute({
  getParentRoute: () => playersRoute,
  path: "/",
  component: Ratings,
});

const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "layout",
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/",
  component: Home,
});

const playerRoute = createRoute({
  getParentRoute: () => playersRoute,
  path: "$player",
  beforeLoad: ({ params: { player } }) =>
    getOneQueryData<PlayerResponse>("players", player, {}),
  loader: async ({ context: queryOptions }) => {
    await queryClient.ensureQueryData(queryOptions);
  },
  component: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const params = playerRoute.useParams();

    return <Player key={params.player} player={params.player} />;
  },
});

const wrappedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "wrapped/$player",
  component: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const params = wrappedRoute.useParams();

    return <Wrapped playerId={params.player} />;
  },
});

const gameRoute = createRoute({
  getParentRoute: () => gamesRoute,
  path: "$game",
  // key: ({ params }) => params.game,
  beforeLoad: ({ params: { game } }) =>
    getOneQueryData<Game>("games", game, {
      expand:
        "placements(game),placements(game).player,placements(game).corp,milestones_unlocked(game),milestones_unlocked(game).milestone,awards_unlocked(game),awards_unlocked(game).award",
    }),
  loader: async ({ context: queryOptions }) => {
    await queryClient.ensureQueryData(queryOptions);
  },
  component: () => <GamePage />,
});

const mapsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "maps",
  component: () => <Outlet />,
});

const mapIndexRoute = createRoute({
  getParentRoute: () => mapsRoute,
  path: "/",
  component: () => <span></span>,
});

const mapRoute = createRoute({
  getParentRoute: () => mapsRoute,
  path: "$map",
  beforeLoad: ({ params: { map } }) =>
    getAllQueryData<Game>("games", {
      sort: "-date",
      expand: "placements(game),placements(game).player",
      filter: `map = '${map}'`,
    }),
  loader: async ({ context: queryOptions }) => {
    await queryClient.ensureQueryData(queryOptions);
  },
  component: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const params = mapRoute.useParams();

    return <MapPage map={params.map} key={params.map} />;
  },
});

const submitToolRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "submitTool",
  component: Submit,
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
    submitToolRoute,
  ]),
  wrappedRoute,
  loginRoute,
  logoutRoute,
]);

// Create the router using your route tree
const router = createRouter({
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
      <Theme accentColor="brown" grayColor="sand" hasBackground={false}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <TooltipProvider delayDuration={200}>
            <QueryClientProvider client={queryClient}>
              <Outlet />
              {/*<ReactQueryDevtools initialIsOpen={false} />*/}
            </QueryClientProvider>
          </TooltipProvider>
        </ThemeProvider>
      </Theme>
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
      <Toaster
        position={"bottom-left"}
        toastOptions={{
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }}
      />
    </>
  );
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
