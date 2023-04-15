import express, { Application } from "express";
import "dotenv/config";
import {
  createDeveloper,
  createDeveloperInfo,
  createProjects,
  createTech,
  deleteDeveloper,
  deleteProjects,
  deleteTechProjects,
  getDeveloperById,
  getProjectsById,
  updateDeveloper,
  updateProjects,
} from "./logic";
import { verifyEmail } from "./middleware/verifyEmail";
import { handler } from "./error/handler";
import { verifyInfo } from "./middleware/verifyInfo";
import { verifyUserExists } from "./middleware/verifyUserExists";
import { verifyUserProjects } from "./middleware/verifyUserProjects";
import { verifyProjectExists } from "./middleware/veriryProjectExists";
import { verifyTech } from "./middleware/verifyTech";
import { verifyDeleteTech } from "./middleware/verifyDeleteTech";

const app: Application = express();

app.use(express.json());

//Rotas Developer

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

//Rotas Projects

app.post("/projects", verifyUserProjects, createProjects);
app.get("/projects/:id", verifyProjectExists, getProjectsById);
app.patch(
  "/projects/:id",
  verifyUserExists,
  verifyUserProjects,
  updateProjects
);
app.delete("/projects/:id", verifyProjectExists, deleteProjects);
app.post("/projects/:id/technologies", verifyTech, createTech);
app.delete(
  "/projects/:id/technologies/:name",
  verifyDeleteTech,
  deleteTechProjects
);
app.use(handler);

export default app;
