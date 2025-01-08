import { Router } from "express";
import { createProject } from "../controllers/project";

const router = Router();

router.post("/create", createProject);

export default router;
