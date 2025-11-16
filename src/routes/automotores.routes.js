import { Router } from 'express';
import {
  getAutomotores,
  getAutomotorById,
  getAutomotorByPlaca,
  createAutomotor,
  updateAutomotor,
  deleteAutomotor,
} from '../controllers/automotores.controller.js';
import {
  authMiddleware,
  isAdmin,
} from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

// Listar automotores - solo admin
router.get('/', isAdmin, getAutomotores);

// Buscar por placa
router.get('/placa/:placa', isAdmin, getAutomotorByPlaca);

// Obtener por ID
router.get('/:id', isAdmin, getAutomotorById);

// Crear automotor
router.post('/', isAdmin, createAutomotor);

// Actualizar automotor
router.put('/:id', isAdmin, updateAutomotor);

// Eliminar (soft delete)
router.delete('/:id', isAdmin, deleteAutomotor);

export default router;
