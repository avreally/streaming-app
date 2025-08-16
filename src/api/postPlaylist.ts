import { PlaylistType } from "../types/types";

const baseUrl = "http://localhost:3001";

export async function postPlaylist(playlistData: PlaylistType, userId: number) {
  const response = await fetch(`${baseUrl}/playlists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",

    body: JSON.stringify({ playlistData, userId }),
  });

  if (!response.ok) {
    throw new Error("Network response not ok");
  }

  return response.json();
}
