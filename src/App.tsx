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

// Create a root route
const rootRoute = new RootRoute({
  component: Root,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Games,
});

const ratingsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/ratings",
  component: Ratings,
});

const corpRatesRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/corp-ratings",
  component: CorpRates,
});

// Create the route tree using your routes
const routeTree = rootRoute.addChildren([indexRoute, ratingsRoute, corpRatesRoute]);

// Create the router using your route tree
const router = new Router({ routeTree });

// Register your router for maximum type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function Root() {
  const queryClient = new QueryClient();

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
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
      </ThemeProvider>
    </>
  );
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
