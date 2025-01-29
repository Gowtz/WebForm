import { Router } from "express";
import { getAllForms } from "../controller/form";

const router = Router()

router.post('/submitform')
router.get('/ge',getAllForms)

export default router
