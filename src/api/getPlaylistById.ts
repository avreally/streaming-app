import axios from "axios";
import { PlaylistType } from "../types/types";

const baseUrl = "http://localhost:3001";

export async function getPlaylistById(
  playlistId: string,
): Promise<PlaylistType> {
  const response = await axios.get(`${baseUrl}/playlists/${playlistId}`, {
    withCredentials: true,
  });

  return response.data;
}
