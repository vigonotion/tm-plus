import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const Route = createRootRoute({
  component: RootComponent,
});

const client = new QueryClient();

function RootComponent() {
  return (
    <React.Fragment>
      <QueryClientProvider client={client}>
        <Outlet />
      </QueryClientProvider>
    </React.Fragment>
  );
}
