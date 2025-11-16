import { Router } from 'express';
import {
  getPropiedades,
  getPropiedadById,
  createPropiedad,
  updatePropiedad,
  deletePropiedad,
} from '../controllers/propiedades.controller.js';
import {
  authMiddleware,
  isAdmin,
} from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/', isAdmin, getPropiedades);
router.get('/:id', isAdmin, getPropiedadById);
router.post('/', isAdmin, createPropiedad);
router.put('/:id', isAdmin, updatePropiedad);
router.delete('/:id', isAdmin, deletePropiedad);

export default router;
