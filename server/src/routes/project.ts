import { Router } from "express";
import { createProject, getAllProject } from "../controllers/project";

const router = Router();

router.get("/getall", getAllProject);
router.post("/create", createProject);

export default router;
