import { Router } from 'express';

const router = Router();

// GET /api/ping
router.get('/ping', (req, res) => {
  res.json({
    ok: true,
    message: 'pong desde /api/ping'
  });
});

export default router;
