import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "../router/router";

const createServer = (): Application => {
    const app: Application = express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());
    app.use("/uploads", express.static("uploads"));
    app.use("/api", router);

    return app;
};

export default createServer;
