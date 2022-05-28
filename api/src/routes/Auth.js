import { Router } from "express";
import { login, me, register } from "../controllers/user";

const router = Router()
router.post('/login', login)
router.post('/register', register)
router.get('/me', me)
export default router