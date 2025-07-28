const baseUrl = "http://localhost:3001";

export async function deletePlaylist(playlistId: string) {
  const response = await fetch(`${baseUrl}/playlists/${playlistId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Network response not ok");
  }

  return response.json;
}
