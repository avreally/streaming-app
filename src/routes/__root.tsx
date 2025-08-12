import { createRootRoute, Outlet, Link } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Header } from "../components/Header/Header";
import { User, UserContext } from "../contexts";
import { useState } from "react";
// import { AudioPlayer } from "../components/AudioPlayer/AudioPlayer";

const Root = () => {
  const [user, setUser] = useState<User | undefined>(undefined);
  return (
    <>
      <UserContext value={{ user, setUser }}>
        <Header />
        <nav>
          <ul className="menu">
            <li>
              <Link to="/">Tracks</Link>
            </li>
            <li>
              <Link to="/playlists">Playlists</Link>
            </li>
          </ul>
        </nav>
        <Outlet />
        {/* <AudioPlayer /> */}
      </UserContext>
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </>
  );
};

export const Route = createRootRoute({
  component: Root,
});
