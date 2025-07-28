import { createFileRoute } from "@tanstack/react-router";
import { Playlists } from "../components/Playlists/Playlists";

export const Route = createFileRoute("/playlists/")({
  component: PlaylistsRoute,
});

function PlaylistsRoute() {
  return <Playlists />;
}
