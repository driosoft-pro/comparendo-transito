import bcrypt from "bcryptjs";
import models from "../models/index.js";
import { signToken } from "../config/jwt.js";
import { verifyPassword } from "../utils/password.js";

const { UsuarioModel } = models;

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
        message: "Username y password son requeridos",
        debug:
          process.env.NODE_ENV !== "production"
            ? {
                receivedUsername: !!username,
                receivedPassword: !!password,
                body: req.body,
              }
            : undefined,
      });
    }

    const user = await UsuarioModel.findByUsername(username);

    if (!user) {
      return res.status(401).json({
        ok: false,
        message: "Usuario o contraseña incorrectos",
      });
    }

    if (user.estado !== 1) {
      return res.status(401).json({
        ok: false,
        message: "Usuario inactivo. Contacte al administrador.",
      });
    }

    const passwordHash = user.contrasena;
    if (!passwordHash) {
      return res.status(500).json({
        ok: false,
        message: "Error de configuración del usuario",
      });
    }

    const isValid = verifyPassword(password, passwordHash);

    if (!isValid) {
      return res.status(401).json({
        ok: false,
        message: "Usuario o contraseña incorrectos",
      });
    }

    const payload = {
      id_usuario: user.id_usuario,
      username: user.username,
      rol: user.rol,
      estado: user.estado,
    };

    const token = signToken(payload);

    const { contrasena, ...safeUser } = user;

    return res.json({
      ok: true,
      message: "Login exitoso",
      token,
      user: safeUser,
    });
  } catch (error) {
    console.error("Error en login:", error.message);
    return res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
      error: process.env.NODE_ENV !== "production" ? error.message : undefined,
    });
  }
};

/**
 * POST /api/auth/register
 * Registra un nuevo usuario
 */
export const register = async (req, res) => {
  try {
    const { username, password, rol = "ciudadano" } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        ok: false,
        message: "Username y password son requeridos",
      });
    }

    const existingUser = await UsuarioModel.findByUsername(username);
    if (existingUser) {
      return res.status(409).json({
        ok: false,
        message: "El usuario ya existe",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const contrasena = bcrypt.hashSync(password, salt);

    const newUser = await UsuarioModel.create({
      username,
      contrasena,
      rol,
      estado: 1,
    });

    const payload = {
      id_usuario: newUser.id_usuario,
      username: newUser.username,
      rol: newUser.rol,
    };

    const token = signToken(payload);
    const { contrasena: _, ...safeUser } = newUser;

    return res.status(201).json({
      ok: true,
      message: "Usuario registrado exitosamente",
      token,
      user: safeUser,
    });
  } catch (error) {
    console.error("Error en register:", error.message);
    return res.status(500).json({
      ok: false,
      message: "Error al registrar usuario",
    });
  }
};

/**
 * POST /api/auth/change-password
 * Cambia la contraseña del usuario autenticado
 */
export const changePassword = async (req, res) => {
  try {
    const { id_usuario } = req.user;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        ok: false,
        message: "Contraseña actual y nueva son requeridas",
      });
    }

    const user = await UsuarioModel.findById(id_usuario);
    if (!user) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    const isValid = verifyPassword(currentPassword, user.contrasena);
    if (!isValid) {
      return res.status(401).json({
        ok: false,
        message: "Contraseña actual incorrecta",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const newHash = bcrypt.hashSync(newPassword, salt);

    await UsuarioModel.update(id_usuario, { contrasena: newHash });

    return res.json({
      ok: true,
      message: "Contraseña actualizada exitosamente",
    });
  } catch (error) {
    console.error("Error en changePassword:", error.message);
    return res.status(500).json({
      ok: false,
      message: "Error al cambiar contraseña",
    });
  }
};

/**
 * GET /api/auth/me
 */
export const getMe = async (req, res) => {
  try {
    const { id_usuario } = req.user;
    const user = await UsuarioModel.findById(id_usuario);

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    const { contrasena, ...safeUser } = user;

    return res.json({
      ok: true,
      user: safeUser,
    });
  } catch (error) {
    console.error("Error en getMe:", error.message);
    return res.status(500).json({
      ok: false,
      message: "Error al obtener información del usuario",
    });
  }
};
