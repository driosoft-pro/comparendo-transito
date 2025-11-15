import { UsuarioModel } from '../models/usuario.model.js';
import { signToken } from '../config/jwt.js';
import { verifyPassword } from '../utils/password.js';

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

    // intentamos leer el campo correcto según cómo esté en la tabla
    const passwordHash =
      user.password_hash ||
      user.passwordHash ||
      user.contrasena; // por si tu columna se llama así

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
    const { password_hash, contrasena, ...safeUser } = user;

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
