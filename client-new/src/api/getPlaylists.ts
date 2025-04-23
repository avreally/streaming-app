const baseUrl = "http://localhost:3001";

export async function getPlaylists() {
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
