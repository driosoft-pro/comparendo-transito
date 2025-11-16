import { Router } from 'express';
import {
  getMe,
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from '../controllers/usuarios.controller.js';
import {
  authMiddleware,
  requirePermission,
  isAdmin,
  PERMISOS,
} from '../middlewares/auth.middleware.js';

const router = Router();

// Todas las rutas requieren autenticación
router.use(authMiddleware);

// Info del usuario autenticado
router.get('/me', getMe);

// Listar usuarios - Solo admin
router.get('/', isAdmin, getUsuarios);

// Ver un usuario - Solo admin
router.get('/:id', isAdmin, getUsuarioById);

// Crear usuario - Solo admin (permiso granular)
router.post('/',
  requirePermission(PERMISOS.USUARIO_CREATE),
  createUsuario
);

// Actualizar usuario - Solo admin (permiso granular)
router.put('/:id',
  requirePermission(PERMISOS.USUARIO_UPDATE),
  updateUsuario
);

// Eliminar (soft delete) usuario - Solo admin (permiso granular)
router.delete('/:id',
  requirePermission(PERMISOS.USUARIO_DELETE),
  deleteUsuario
);

export default router;
