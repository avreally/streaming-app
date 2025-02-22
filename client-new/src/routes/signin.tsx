import { createFileRoute } from "@tanstack/react-router";
import {
  // QueryClient,
  // QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const baseUrl = "http://localhost:3001";

export const Route = createFileRoute("/signin")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello!</div>;
}

function handleSignIn() {
  console.log("signing in");
  const { isLoading, error, data } = useQuery({
    queryKey: ["login"],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/login`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.json());
      return await response.json();
    },
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
}
