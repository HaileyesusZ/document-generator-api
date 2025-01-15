import { Db, MongoClient } from "mongodb";

// TODO : replace with singleton
let database: Db;
let dbClient: MongoClient;
export async function connectDB() {
  try {
    const DB_URI = process.env.MONGODB_URI ?? "";
    console.log("🚀 ~ connectDB ~ DB_URI:", DB_URI);
    const client = new MongoClient(DB_URI, {
      timeoutMS: 10000,
    });
    const connection = await client.connect();
    connection.once("connectionReady", () => {
      console.log("connection to database is ready.");
    });
    connection.on("error", (error) => {
      console.error("connection error", error);
    });
    dbClient = connection;

    database = connection.db("document-generator");
  } catch (error) {
    console.error("error connecting to DB", error);
  }
}
export function getDB() {
  if (database === undefined) {
    throw new Error("database not connected!");
  }
  return database;
}

export function getClient() {
  if (dbClient === undefined) {
    throw new Error("database not connected!");
  }
  return dbClient;
}
