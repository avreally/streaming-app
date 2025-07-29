import { PlaylistType } from "../types/types";

const baseUrl = "http://localhost:3001";

export async function getPlaylists(): Promise<PlaylistType[]> {
  const response = await fetch(`${baseUrl}/playlists`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();
  return data;
}
