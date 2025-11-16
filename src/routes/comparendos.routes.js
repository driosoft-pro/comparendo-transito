import { Router } from 'express';
import {
  getComparendos,
  getComparendoById,
  getComparendoByNumero,
  createComparendo,
  updateComparendo,
  deleteComparendo,
} from '../controllers/comparendos.controller.js';
import {
  authMiddleware,
  isAdmin,
} from '../middlewares/auth.middleware.js';

const router = Router();

// Todas las rutas de comparendos requieren autenticación
router.use(authMiddleware);

// Listar comparendos (por ahora solo admin para evitar exponer datos sensibles)
router.get('/', isAdmin, getComparendos);

// Obtener comparendo por ID
router.get('/:id', isAdmin, getComparendoById);

// Buscar comparendo por número (ej: /api/comparendos/numero/ABC123)
router.get('/numero/:numero', isAdmin, getComparendoByNumero);

// Crear comparendo - solo admin (o podrías cambiar a rol policía en el futuro)
router.post('/', isAdmin, createComparendo);

// Actualizar comparendo
router.put('/:id', isAdmin, updateComparendo);

// Eliminar (soft delete) comparendo
router.delete('/:id', isAdmin, deleteComparendo);

export default router;
