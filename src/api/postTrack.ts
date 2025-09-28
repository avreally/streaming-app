import axios from "axios";
const baseUrl = "http://localhost:3001";

export async function postTrack(playlistId: string, trackId: string) {
  const response = await axios.post(
    `${baseUrl}/playlists/${playlistId}`,
    {
      trackId,
    },
    {
      withCredentials: true,
    },
  );

  return response.data;
}
