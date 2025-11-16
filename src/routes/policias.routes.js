import { Router } from 'express';
import {
  getPolicias,
  getPoliciaById,
  createPolicia,
  updatePolicia,
  deletePolicia,
} from '../controllers/policias.controller.js';
import {
  authMiddleware,
  isAdmin,
} from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/', isAdmin, getPolicias);
router.get('/:id', isAdmin, getPoliciaById);
router.post('/', isAdmin, createPolicia);
router.put('/:id', isAdmin, updatePolicia);
router.delete('/:id', isAdmin, deletePolicia);

export default router;
