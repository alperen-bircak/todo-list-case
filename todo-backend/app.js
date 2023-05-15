import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import startDatabaseConnection from "./database.js";
import router from "./routes.js";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

await startDatabaseConnection();

const baseUrl = process.env.BASE_URL || "/api/v1";

app.use(baseUrl, router);

app.use((err, req, res, next) => {
  console.error(err?.stack ? err?.stack : "Error: " + JSON.stringify(err));

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    message,
  });
});

export default app;
