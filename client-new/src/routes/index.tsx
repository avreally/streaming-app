import { createFileRoute } from "@tanstack/react-router";
import { Tracks } from "../components/Tracks/Tracks";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return <Tracks />;
}
