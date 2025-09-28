import { TrackType } from "../types/types";

const baseUrl = "http://localhost:3001";

export async function getTracks(): Promise<TrackType[]> {
  const response = await fetch(`${baseUrl}/tracks`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Network response not ok");
  }

  return response.json();
}
