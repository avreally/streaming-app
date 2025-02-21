import Item from "../models/item.js";
import User from "../models/user.js";

type Data = {
  items: Item[];
  users: User[];
};

const defaultData: Data = {
  items: [],
  users: [],
};

export const items: {
  items?: Item[];
} = {};

export async function connectToDatabase() {
  const { JSONFilePreset } = await import("lowdb/node");
  const db = await JSONFilePreset<Data>("db.json", defaultData);

  items.items = db.data.items;

  console.log(`Successfully connected to database`);
}
