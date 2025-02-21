import { useState } from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import AllTracks from "./../components/AllTracks/AllTracks.tsx";

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <Outlet />
        <AllTracks />
        <TanStackRouterDevtools />
      </>
    );
  },
});
