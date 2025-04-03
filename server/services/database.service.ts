import { Low } from "lowdb";
import { Track } from "../types/track.js";
import { User } from "../types/user.js";

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
  db = await JSONFilePreset<Data>("db.json", defaultData);

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
  };

  db.data.users.push(user);
  await db.write();
  return user;
}

export function findUserById(id: number) {
  return db.data.users.find((user) => user.githubUserId === id);
}
