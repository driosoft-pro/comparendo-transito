import crypto from 'node:crypto';
import { UsuarioModel } from '../models/usuario.model.js';
import { signToken } from '../config/jwt.js';

/**
 * Verifica un hash tipo:
 * sha256$<salt_hex>$<digest_hex>
 */
const verifyPassword = (plainPassword, storedHash) => {
  if (!storedHash || !storedHash.startsWith('sha256$')) {
    return false;
  }

  const parts = storedHash.split('$');
  if (parts.length !== 3) return false;

  const [, saltHex, digestHex] = parts;

  const salt = Buffer.from(saltHex, 'hex');
  const hash = crypto.createHash('sha256').update(Buffer.concat([salt, Buffer.from(plainPassword)])).digest('hex');

  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(digestHex, 'hex'));
};

/**
 * POST /api/auth/login
 * body: { username, password }
 */
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        ok: false,
        message: 'Username y password son requeridos',
      });
    }

    // Buscar usuario en Supabase
    const user = await UsuarioModel.findByUsername(username);

    if (!user) {
      return res.status(401).json({
        ok: false,
        message: 'Usuario o contraseña incorrectos',
      });
    }

    const passwordHash = user.password_hash || user.passwordHash;

    const isValid = verifyPassword(password, passwordHash);
    if (!isValid) {
      return res.status(401).json({
        ok: false,
        message: 'Usuario o contraseña incorrectos',
      });
    }

    // Crear payload JWT
    const payload = {
      id_usuario: user.id_usuario,
      username: user.username,
      rol: user.rol,
    };

    const token = signToken(payload);

    // No devolvemos el hash
    const { password_hash, ...safeUser } = user;

    return res.json({
      ok: true,
      message: 'Login exitoso',
      token,
      user: safeUser,
    });
  } catch (error) {
    console.error('Error en login:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error interno en login',
    });
  }
};
