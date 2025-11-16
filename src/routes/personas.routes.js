import { Router } from 'express';
import {
  getPersonas,
  getPersonaById,
  createPersona,
  updatePersona,
  deletePersona,
} from '../controllers/personas.controller.js';
import {
  authMiddleware,
  isAdmin,
} from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

// Listar personas - solo admin por defecto
router.get('/', isAdmin, getPersonas);

// Obtener persona por ID
router.get('/:id', isAdmin, getPersonaById);

// Crear persona
router.post('/', isAdmin, createPersona);

// Actualizar persona
router.put('/:id', isAdmin, updatePersona);

// Eliminar (soft delete) persona
router.delete('/:id', isAdmin, deletePersona);

export default router;
