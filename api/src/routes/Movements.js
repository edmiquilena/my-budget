import { Router } from "express";
import { getMovement, listMovements, myBalance, newMovement, removeMovement, updateMovement } from "../controllers/movements";

const router = Router()
router.get('/', listMovements)
router.get('/balance', myBalance)
router.post('/', newMovement)
router.get('/:id', getMovement)
router.patch('/:id', updateMovement)
router.delete('/:id', removeMovement)
export default router