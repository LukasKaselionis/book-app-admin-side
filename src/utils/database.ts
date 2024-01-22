import mongoose from "mongoose";
import logger from "./logger";

const dbName: string = "book-app";
const uri: string = `mongodb://localhost:27017/${dbName}`;

const connectDatabase = async (): Promise<void> => {
    try {
        await mongoose.connect(uri);
        logger.info("Connected to MongoDB");
    } catch (error) {
        logger.error("Could not connect to db");
        process.exit(1);
    }
};

export default connectDatabase;
