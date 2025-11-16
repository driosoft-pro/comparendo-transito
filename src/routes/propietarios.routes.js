import { Router } from 'express';
import {
  getPropietarios,
  getPropietarioById,
  createPropietario,
  updatePropietario,
  deletePropietario,
} from '../controllers/propietarios.controller.js';
import {
  authMiddleware,
  isAdmin,
} from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/', isAdmin, getPropietarios);
router.get('/:id', isAdmin, getPropietarioById);
router.post('/', isAdmin, createPropietario);
router.put('/:id', isAdmin, updatePropietario);
router.delete('/:id', isAdmin, deletePropietario);

export default router;
