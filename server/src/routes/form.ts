import { Router } from "express";
import { createForm } from "../controllers/form";

const router = Router();

router.post("/create", createForm);
export default router;
