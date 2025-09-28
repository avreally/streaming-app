import axios from "axios";
const baseUrl = "http://localhost:3001";

export async function deleteTrack(playlistId: string, trackId: string) {
  const response = await axios.delete(
    `${baseUrl}/playlists/${playlistId}/tracks/${trackId}`,
    {
      withCredentials: true,
    },
  );

  return response.data;
}
