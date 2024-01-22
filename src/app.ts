import { Application } from "express";
import connectToMongoDB from "./utils/database";
import createServer from "./utils/server";
import logger from "./utils/logger";

const port: string | number = process.env.PORT || 3004;
const app: Application = createServer();

app.listen(port, async () => {
    logger.info(`App is running at http://localhost:${port}`);
    await connectToMongoDB();
});
