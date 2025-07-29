import { Playlist } from "./playlist.js";

export type User = {
  githubUserId: number;
  userName: string;
  favouriteTrackIds: number[];
  avatarUrl: string;
  playlists: Playlist[];
};
