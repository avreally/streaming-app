import Track from "../models/track.js";
import User from "../models/user.js";

type Data = {
  tracks: Track[];
  users: User[];
};

const defaultData: Data = {
  tracks: [],
  users: [],
};

export const tracks: {
  tracks?: Track[];
} = {};

export async function connectToDatabase() {
  const { JSONFilePreset } = await import("lowdb/node");
  const db = await JSONFilePreset<Data>("db.json", defaultData);

  tracks.tracks = db.data.tracks;

  console.log(`Successfully connected to database`);
}
