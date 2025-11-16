import { Router } from 'express';
import {
  getInfracciones,
  getInfraccionById,
  createInfraccion,
  updateInfraccion,
  deleteInfraccion,
} from '../controllers/infracciones.controller.js';
import {
  authMiddleware,
  isAdmin,
} from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/', isAdmin, getInfracciones);
router.get('/:id', isAdmin, getInfraccionById);
router.post('/', isAdmin, createInfraccion);
router.put('/:id', isAdmin, updateInfraccion);
router.delete('/:id', isAdmin, deleteInfraccion);

export default router;
