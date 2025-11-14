import { verifyToken } from '../config/jwt.js';

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
      return res.status(401).json({
        ok: false,
        message: 'Token no proporcionado o formato inválido',
      });
    }

    const payload = verifyToken(token);
    req.user = payload; // { id_usuario, username, rol }

    next();
  } catch (error) {
    console.error('Error en authMiddleware:', error.message);
    return res.status(401).json({
      ok: false,
      message: 'Token inválido o expirado',
    });
  }
};

// Middleware opcional para exigir rol admin
export const isAdmin = (req, res, next) => {
  if (!req.user || req.user.rol !== 'admin') {
    return res.status(403).json({
      ok: false,
      message: 'Acceso restringido a administradores',
    });
  }
  next();
};
