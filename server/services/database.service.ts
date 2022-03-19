import * as mongoDB from "mongodb";

export const collections: {
  items?: mongoDB.Collection;
  users?: mongoDB.Collection;
} = {};

export async function connectToDatabase() {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    "mongodb://localhost:27017"
  );

  await client.connect();

  const db: mongoDB.Db = client.db("streaming-app-db");

  const itemsCollection: mongoDB.Collection = db.collection("items");

  collections.items = itemsCollection;

  const usersCollection: mongoDB.Collection = db.collection("users");

  collections.users = usersCollection;

  console.log(
    `Successfully connected to database: ${db.databaseName} and collections: ${itemsCollection.collectionName}, ${usersCollection.collectionName}`
  );
}
