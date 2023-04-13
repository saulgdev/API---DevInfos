import express, { Application } from "express";
import "dotenv/config";
import {
  createDeveloper,
  createDeveloperInfo,
  deleteDeveloper,
  getDeveloperById,
  updateDeveloper,
} from "./logic";
import { verifyEmail } from "./middleware/verifyEmail";
import { handler } from "./error/handler";
import { verifyInfo } from "./middleware/verifyInfo";
import { verifyUserExists } from "./middleware/verifyUserExists";

const app: Application = express();

app.use(express.json());

app.post("/developers", verifyEmail, createDeveloper);
app.get("/developers/:id", verifyUserExists, getDeveloperById);
app.patch("/developers/:id", verifyUserExists, verifyEmail, updateDeveloper);
app.delete("/developers/:id", verifyUserExists, deleteDeveloper);
app.post(
  "/developers/:id/infos",
  verifyUserExists,
  verifyInfo,
  createDeveloperInfo
);
app.use(handler);

export default app;
