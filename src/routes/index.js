import { Router } from 'express';
import authRoutes from './auth.routes.js';
import usuariosRoutes from './usuarios.routes.js';
// luego agregas comparendos, personas, etc.

const router = Router();

router.get('/ping', (req, res) => {
  res.json({ ok: true, message: 'pong desde /api/ping' });
});

router.use('/auth', authRoutes);
router.use('/usuarios', usuariosRoutes);

export default router;
