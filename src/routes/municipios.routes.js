import { Router } from 'express';
import {
  getMunicipios,
  getMunicipioById,
  createMunicipio,
  updateMunicipio,
  deleteMunicipio,
} from '../controllers/municipios.controller.js';
import {
  authMiddleware,
  isAdmin,
} from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/', isAdmin, getMunicipios);
router.get('/:id', isAdmin, getMunicipioById);
router.post('/', isAdmin, createMunicipio);
router.put('/:id', isAdmin, updateMunicipio);
router.delete('/:id', isAdmin, deleteMunicipio);

export default router;
