import { createRootRoute, Outlet, Link } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <Link to="/">
          <h1>Streaming App</h1>
        </Link>
        <Outlet />
        <TanStackRouterDevtools />
        <ReactQueryDevtools />
      </>
    );
  },
});
