import bcrypt from "bcryptjs";
import { UsuarioModel } from '../models/usuario.model.js';
import { signToken } from '../config/jwt.js';
import { verifyPassword } from '../utils/password.js';

/**
 * POST /api/auth/login
 * body: { username, password }
 */
export const login = async (req, res) => {
  try {
    // 🔍 LOGS DE DIAGNÓSTICO
    console.log('\n' + '='.repeat(60));
    console.log('🔐 INTENTO DE LOGIN');
    console.log('='.repeat(60));
    console.log('📥 Headers:', JSON.stringify(req.headers, null, 2));
    console.log('📦 Body:', JSON.stringify(req.body, null, 2));
    console.log('📦 Body keys:', Object.keys(req.body));

    // Extraer credenciales
    const { username, password } = req.body;

    console.log('👤 Username:', username);
    console.log('🔑 Password recibido:', password ? `[${password.length} caracteres]` : 'VACÍO');

    // Validación básica
    if (!username || !password) {
      console.log('❌ Validación fallida - campos vacíos');
      return res.status(400).json({
        ok: false,
        message: 'Username y password son requeridos',
        debug: process.env.NODE_ENV !== 'production' ? {
          receivedUsername: !!username,
          receivedPassword: !!password,
          body: req.body
        } : undefined
      });
    }

    // Buscar usuario en Supabase
    console.log('🔍 Buscando usuario en Supabase...');
    const user = await UsuarioModel.findByUsername(username);

    if (!user) {
      console.log('❌ Usuario no encontrado:', username);
      return res.status(401).json({
        ok: false,
        message: 'Usuario o contraseña incorrectos',
      });
    }

    console.log('✅ Usuario encontrado:', {
      id: user.id_usuario,
      username: user.username,
      rol: user.rol,
      estado: user.estado
    });

    // Verificar que el usuario esté activo
    if (user.estado !== 1) {
      console.log('❌ Usuario inactivo');
      return res.status(401).json({
        ok: false,
        message: 'Usuario inactivo. Contacte al administrador.',
      });
    }

    // Obtener hash de la contraseña
    const passwordHash = user.contrasena;

    if (!passwordHash) {
      console.log('❌ No hay hash de contraseña en la BD');
      return res.status(500).json({
        ok: false,
        message: 'Error de configuración del usuario',
      });
    }

    console.log('🔐 Hash de BD:', passwordHash.substring(0, 30) + '...');
    console.log('🔐 Password a verificar:', password);

    // Verificar contraseña
    const isValid = verifyPassword(password, passwordHash);
    
    if (!isValid) {
      console.log('❌ Contraseña incorrecta');
      return res.status(401).json({
        ok: false,
        message: 'Usuario o contraseña incorrectos',
      });
    }

    console.log('✅ Contraseña correcta!');

    // Crear payload JWT
    const payload = {
      id_usuario: user.id_usuario,
      username: user.username,
      rol: user.rol,
      estado: user.estado
    };

    console.log('🎫 Generando token JWT...');
    const token = signToken(payload);

    // Preparar respuesta (sin el hash)
    const { contrasena, ...safeUser } = user;

    console.log('✅ Login exitoso para:', username);
    console.log('='.repeat(60) + '\n');

    return res.json({
      ok: true,
      message: 'Login exitoso',
      token,
      user: safeUser,
    });

  } catch (error) {
    console.error('\n' + '='.repeat(60));
    console.error('❌ ERROR EN LOGIN');
    console.error('='.repeat(60));
    console.error('Mensaje:', error.message);
    console.error('Stack:', error.stack);
    console.error('='.repeat(60) + '\n');

    return res.status(500).json({
      ok: false,
      message: 'Error interno del servidor',
      error: process.env.NODE_ENV !== 'production' ? error.message : undefined
    });
  }
};

/**
 * POST /api/auth/register (opcional)
 * Registra un nuevo usuario
 */
export const register = async (req, res) => {
  try {
    const { username, password, rol = 'ciudadano' } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        ok: false,
        message: 'Username y password son requeridos',
      });
    }

    // Verificar si el usuario ya existe
    const existingUser = await UsuarioModel.findByUsername(username);
    if (existingUser) {
      return res.status(409).json({
        ok: false,
        message: 'El usuario ya existe',
      });
    }

    // Hashear contraseña
    const salt = bcrypt.genSaltSync(10);
    const contrasena = bcrypt.hashSync(password, salt);

    // Crear usuario
    const newUser = await UsuarioModel.create({
      username,
      contrasena,
      rol,
      estado: 1
    });

    // Generar token
    const payload = {
      id_usuario: newUser.id_usuario,
      username: newUser.username,
      rol: newUser.rol,
    };

    const token = signToken(payload);

    const { contrasena: _, ...safeUser } = newUser;

    return res.status(201).json({
      ok: true,
      message: 'Usuario registrado exitosamente',
      token,
      user: safeUser,
    });

  } catch (error) {
    console.error('Error en register:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error al registrar usuario',
    });
  }
};

/**
 * POST /api/auth/change-password
 * Cambia la contraseña del usuario autenticado
 */
export const changePassword = async (req, res) => {
  try {
    const { id_usuario } = req.user; // Del middleware de auth
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        ok: false,
        message: 'Contraseña actual y nueva son requeridas',
      });
    }

    // Buscar usuario
    const user = await UsuarioModel.findById(id_usuario);
    if (!user) {
      return res.status(404).json({
        ok: false,
        message: 'Usuario no encontrado',
      });
    }

    // Verificar contraseña actual
    const isValid = verifyPassword(currentPassword, user.contrasena);
    if (!isValid) {
      return res.status(401).json({
        ok: false,
        message: 'Contraseña actual incorrecta',
      });
    }

    // Hashear nueva contraseña
    const salt = bcrypt.genSaltSync(10);
    const newHash = bcrypt.hashSync(newPassword, salt);

    // Actualizar en BD
    await UsuarioModel.update(id_usuario, { contrasena: newHash });

    return res.json({
      ok: true,
      message: 'Contraseña actualizada exitosamente',
    });

  } catch (error) {
    console.error('Error en changePassword:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error al cambiar contraseña',
    });
  }
};

/**
 * GET /api/auth/me
 * Obtiene información del usuario autenticado
 */
export const getMe = async (req, res) => {
  try {
    const { id_usuario } = req.user; // Del middleware de auth

    const user = await UsuarioModel.findById(id_usuario);
    
    if (!user) {
      return res.status(404).json({
        ok: false,
        message: 'Usuario no encontrado',
      });
    }

    const { contrasena, ...safeUser } = user;

    return res.json({
      ok: true,
      user: safeUser,
    });

  } catch (error) {
    console.error('Error en getMe:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error al obtener información del usuario',
    });
  }
};