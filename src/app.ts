import express, { Application } from "express";
import "dotenv/config";
import { createDeveloper, createDeveloperInfo } from "./logic";
import { verifyEmail } from "./middleware/verifyEmail";
import { handler } from "./error/handler";
import { verifyInfo } from "./middleware/verifyInfo";

const app: Application = express();

app.use(express.json());

app.post("/developers", verifyEmail, createDeveloper);
app.get("/developers/:id");
app.patch("/developers/:id");
app.delete("/developers/:id");
app.post("/developers/:id/infos", verifyInfo, createDeveloperInfo);
app.use(handler);

export default app;
