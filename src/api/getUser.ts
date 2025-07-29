import { User } from "../types/types";

const baseUrl = "http://localhost:3001";

export async function getUser(): Promise<User> {
  const response = await fetch(`${baseUrl}/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();

  return data;
}
