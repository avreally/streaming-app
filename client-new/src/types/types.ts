export type TrackType = {
  id: number;
  title: string;
  url: string;
  artist: string;
};

export type PlaylistType = {
  playlistId: number;
  title: string;
};

export type PlaylistsType = {
  playlists: PlaylistType[];
};
