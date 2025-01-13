import { Router } from "express";
import { createProject, deleteProject, getAllProject, toggleProjectActive } from "../controllers/project";

const router = Router();

router.get("/getall", getAllProject);
router.post("/create", createProject);
router.delete("/delete/:id",deleteProject);
router.post("/toggleisactive",toggleProjectActive);

export default router;
