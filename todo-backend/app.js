import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import startDatabaseConnection from "./database.js";
import router from "./routes.js";

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

await startDatabaseConnection();

const baseUrl = process.env.BASE_URL || "/api/v1";

app.use(baseUrl + "/games", router);


export default app;