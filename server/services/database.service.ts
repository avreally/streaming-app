import { Low } from "lowdb";
import { resolve } from "node:path";
import { Track } from "../types/track.js";
import { User } from "../types/user.js";
import { Playlist } from "../types/playlist.js";

type Data = {
  tracks: Track[];
  users: User[];
};

const defaultData: Data = {
  tracks: [],
  users: [],
};

let db: Low<Data>;

export async function connectToDatabase() {
  const { JSONFilePreset } = await import("lowdb/node");
  db = await JSONFilePreset<Data>(
    resolve(import.meta.dirname, "..", "db.json"),
    defaultData,
  );

  console.log(`Successfully connected to database`);
}

export function getAllTracks() {
  return db.data.tracks;
}

type GitHubUser = {
  id: number;
  login: string;
  avatar_url: string;
};

export async function createNewUser({ id, login, avatar_url }: GitHubUser) {
  const user: User = {
    githubUserId: id,
    userName: login,
    favouriteTrackIds: [],
    avatarUrl: avatar_url,
    playlists: [],
  };

  db.data.users.push(user);
  await db.write();
  return user;
}

export function findUserById(id: number) {
  return db.data.users.find((user) => user.githubUserId === id);
}

export async function createNewPlaylist(
  { playlistId, title, playlistTracks }: Playlist,
  userId: number,
) {
  const playlist: Playlist = {
    playlistId: playlistId,
    title: title,
    playlistTracks: playlistTracks,
  };

  const foundUser = findUserById(userId);

  if (foundUser) {
    foundUser["playlists"].unshift(playlist);
  }
  await db.write();
  return playlist;
}

export async function deletePlaylist(playlistId: string, userId: number) {
  const foundUser = findUserById(userId);

  if (foundUser) {
    foundUser["playlists"] = foundUser["playlists"].filter((playlist) => {
      return playlist.playlistId !== playlistId;
    });
  }

  await db.write();
}
