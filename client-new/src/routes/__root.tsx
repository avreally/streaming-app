import { createRootRoute, Outlet, Link } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Header } from "../components/Header/Header";
import { User, UserContext } from "../contexts";
import { useState } from "react";

const Root = () => {
  const [user, setUser] = useState<User | undefined>(undefined);
  return (
    <>
      <UserContext value={{ user, setUser }}>
        <Header />
        <Outlet />
      </UserContext>
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </>
  );
};

export const Route = createRootRoute({
  component: Root,
});
