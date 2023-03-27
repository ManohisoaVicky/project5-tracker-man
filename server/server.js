import express from "express";
import { fileURLToPath } from "url";
import path, { dirname, join } from "path";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import usersRoutes from "./routes/usersRoutes.js";
import mangasRoutes from "./routes/mangasRoutes.js";

import { connectToDb } from "./config/db.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

dotenv.config();

app.use(logger("dev"));
app.use(express.json({ limit: "30mb" }));

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");

app.use(express.static(join(__dirname, "..", "client", "build")));
app.use(express.static(__dirname));

app.use("/api/users", usersRoutes);
app.use("/api/mangas", mangasRoutes);

const port = process.env.PORT || 3001;

async function startServer() {
  await connectToDb();

  app.listen(port, function () {
    console.log(`App running on port ${port}`);
  });
}

startServer();
