import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/tracks">Listen to Music</Link>
        </li>
        <li>
          <Link to="/signin">Sign In with GitHub</Link>
        </li>
      </ul>
    </div>
  );
}
