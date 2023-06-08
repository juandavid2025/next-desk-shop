import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  return MongoClient.connect(process.env.REACT_APP_MONGODB_URL);
}
