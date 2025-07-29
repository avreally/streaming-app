import { createFileRoute } from "@tanstack/react-router";
import { Playlist } from "../components/Playlist/Playlist";

export const Route = createFileRoute("/playlists/$playlistId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { playlistId } = Route.useParams();
  return <Playlist playlistId={playlistId} />;
}
