import { Router } from 'express';
import {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  getMe,
} from '../controllers/usuarios.controller.js';
import { authMiddleware, isAdmin } from '../middleware/auth.middleware.js';

const router = Router();

// Rutas protegidas por JWT
router.use(authMiddleware);

// Info del usuario autenticado
router.get('/me', getMe);

// El admin puede gestionar usuarios
router.get('/', isAdmin, getUsuarios);
router.get('/:id', isAdmin, getUsuarioById);
router.post('/', isAdmin, createUsuario);
router.put('/:id', isAdmin, updateUsuario);
router.delete('/:id', isAdmin, deleteUsuario);

export default router;
