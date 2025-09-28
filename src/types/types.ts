export type TrackType = {
  id: string;
  title: string;
  url: string;
  artist: string;
};

export type PlaylistType = {
  playlistId: string;
  title: string;
  playlistTracks: string[];
};

export type PlaylistsType = {
  playlists: PlaylistType[];
};

export type User = {
  githubUserId: number;
  userName: string;
  favouriteTrackIds: number[];
  avatarUrl: string;
  playlists: PlaylistType[];
};
