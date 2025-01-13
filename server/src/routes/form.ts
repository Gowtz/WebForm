import { Router } from "express";
import { createForm, deleteForm, getAllForm, toggleFormActive } from "../controllers/form";

const router = Router();

router.post("/create", createForm);
router.post("/toggleisactive",toggleFormActive);
router.get("/getall",getAllForm);
router.delete("/delete/:id",deleteForm)
export default router;
