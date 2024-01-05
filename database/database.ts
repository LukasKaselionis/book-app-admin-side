import { MongoClient } from "mongodb";

const dbName: string = "book-app";
const uri: string = `mongodb://localhost:27017/${dbName}`;
const client: MongoClient = new MongoClient(uri);

export default async function connectToMongoDB(): Promise<MongoClient | undefined> {
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        return client;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}
