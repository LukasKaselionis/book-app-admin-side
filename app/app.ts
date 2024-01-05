import express, { Application, Request, Response } from "express";
import connectToMongoDB from "../database/database";
import { MongoClient } from "mongodb";
import router from "../router/router";

const app: Application = express();
const port: string | number = process.env.PORT || 3003;

// Routes
app.get("/", (req: Request, res: Response) => {
    res.send("Home");
});
app.use("/api", router);

const startApp = async (): Promise<void> => {
    const dbClient: MongoClient | undefined = await connectToMongoDB();

    if (dbClient) {
        // Perform operations with the MongoDB client
        // For example, you can access the database using dbClient.db(dbName)
        app.listen(port, () => {
            console.log(`Server is Fire at http://localhost:${port}`);
        });
    } else {
        console.log("Failed to connect to MongoDB. Exiting...");
    }
};


const initializeApp = async (): Promise<void> => {
    {
        try {
            await startApp();
        } catch (error) {
            console.error("Error starting the app:", error);
        }
    }
};

initializeApp();
