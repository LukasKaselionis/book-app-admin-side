import express, { Application } from "express";
import connectToMongoDB from "../database/database";
import bodyParser from "body-parser";
import router from "../router/router";

const app: Application = express();
const port: string | number = process.env.PORT || 3004;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/uploads", express.static("app/uploads"));

const startApp = async (): Promise<void> => {
    const dbClient = await connectToMongoDB();

    if (dbClient) {
        app.use("/api", router);
        app.listen(port, () => {
            console.log(`Server is Fire at http://localhost:${port}`);
        });
    } else {
        console.log("Failed to connect to MongoDB. Exiting...");
    }
};


const initializeApp = async (): Promise<void> => {
    try {
        await startApp();
    } catch (error) {
        console.error("Error starting the app:", error);
    }
};

initializeApp();
