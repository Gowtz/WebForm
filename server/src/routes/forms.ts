import { Router } from "express";
import { formSubmit, getAllForms } from "../controller/form";

const router = Router()

router.post('/form',formSubmit)
router.get('/ge',getAllForms)

export default router
