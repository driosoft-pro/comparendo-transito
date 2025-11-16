import { Router } from 'express';
import {
  getSecretarias,
  getSecretariaById,
  createSecretaria,
  updateSecretaria,
  deleteSecretaria,
} from '../controllers/secretarias.controller.js';
import {
  authMiddleware,
  isAdmin,
} from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/', isAdmin, getSecretarias);
router.get('/:id', isAdmin, getSecretariaById);
router.post('/', isAdmin, createSecretaria);
router.put('/:id', isAdmin, updateSecretaria);
router.delete('/:id', isAdmin, deleteSecretaria);

export default router;
