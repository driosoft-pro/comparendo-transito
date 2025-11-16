import { Router } from 'express';
import {
  getLicencias,
  getLicenciaById,
  createLicencia,
  updateLicencia,
  deleteLicencia,
  addCategoriaToLicencia,
} from '../controllers/licencias.controller.js';
import {
  authMiddleware,
  isAdmin,
} from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

// Licencias
router.get('/', isAdmin, getLicencias);
router.get('/:id', isAdmin, getLicenciaById);
router.post('/', isAdmin, createLicencia);
router.put('/:id', isAdmin, updateLicencia);
router.delete('/:id', isAdmin, deleteLicencia);

// Asociación licencia-categoría
router.post('/:id/categorias', isAdmin, addCategoriaToLicencia);

export default router;
