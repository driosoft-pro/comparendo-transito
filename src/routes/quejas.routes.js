import { Router } from 'express';
import {
  getQuejas,
  getQuejaById,
  getQuejasByPersona,
  getQuejasByComparendo,
  createQueja,
  updateQueja,
  deleteQueja,
} from '../controllers/quejas.controller.js';
import {
  authMiddleware,
  isAdmin,
} from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

// Listar todas las quejas - admin
router.get('/', isAdmin, getQuejas);

// Obtener una queja por ID
router.get('/:id', isAdmin, getQuejaById);

// Quejas por persona
router.get('/persona/:id_persona', isAdmin, getQuejasByPersona);

// Quejas por comparendo
router.get('/comparendo/:id_comparendo', isAdmin, getQuejasByComparendo);

// Crear queja
router.post('/', createQueja);

// Actualizar queja
router.put('/:id', isAdmin, updateQueja);

// Eliminar (soft delete) queja
router.delete('/:id', isAdmin, deleteQueja);

export default router;
