import { Router } from "express";
import { listMovements } from "../controllers/movements";

const router = Router()
router.get('/', listMovements)
export default router