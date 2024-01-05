import mongoose from "mongoose";

const dbName: string = "book-app";
const uri: string = `mongodb://localhost:27017/${dbName}`;

export default async function connectToMongoDB(): Promise<typeof mongoose | undefined> {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");

        return mongoose;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

mongoose.connection.on("close", () => {
    console.log("MongoDB connection closed");
});
