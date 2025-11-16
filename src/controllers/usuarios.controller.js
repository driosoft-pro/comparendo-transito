import models from "../models/index.js";
import { hashPassword } from "../utils/password.js";

const { UsuarioModel } = models;

/**
 * GET /api/usuarios/me
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
      usuario: safeUser,
    });
  } catch (error) {
    console.error("Error en /me usuarios:", error.message);
    return res.status(500).json({
      ok: false,
      message: "Error obteniendo información de usuario",
    });
  }
};

/**
 * GET /api/usuarios
 * Query: page, pageSize, withDeleted?
 */
export const getUsuarios = async (req, res) => {
  try {
    const page = Number(req.query.page || 1);
    const pageSize = Number(req.query.pageSize || req.query.limit || 50);
    const withDeleted = req.query.withDeleted === "true";

    const pageResult = await UsuarioModel.findPage({
      page,
      pageSize,
      withRelations: false,
      filters: {},
    });

    let usuarios = pageResult.data || [];
    if (!withDeleted) {
      usuarios = usuarios.filter(
        (u) => u.deleted_at === null || u.deleted_at === undefined,
      );
    }

    const safe = usuarios.map(({ contrasena, ...rest }) => rest);

    return res.json({
      ok: true,
      page: pageResult.page,
      pageSize: pageResult.pageSize,
      total: pageResult.total,
      totalPages: pageResult.totalPages,
      usuarios: safe,
    });
  } catch (error) {
    console.error("Error listando usuarios:", error.message);
    return res.status(500).json({
      ok: false,
      message: "Error obteniendo usuarios",
    });
  }
};

/**
 * GET /api/usuarios/:id
 */
export const getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UsuarioModel.findById(id);
    if (!user) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    const { contrasena, ...safeUser } = user;

    return res.json({
      ok: true,
      usuario: safeUser,
    });
  } catch (error) {
    console.error("Error obteniendo usuario:", error.message);
    return res.status(500).json({
      ok: false,
      message: "Error obteniendo usuario",
    });
  }
};

/**
 * POST /api/usuarios
 * body: { username, password, rol }
 */
export const createUsuario = async (req, res) => {
  try {
    const { username, password, rol } = req.body;

    if (!username || !password || !rol) {
      return res.status(400).json({
        ok: false,
        message: "username, password y rol son requeridos",
      });
    }

    const contrasena = hashPassword(password);

    const nuevoUsuario = await UsuarioModel.create({
      username,
      contrasena,
      rol,
      estado: 1,
    });

    const { contrasena: _, ...safeUser } = nuevoUsuario;

    return res.status(201).json({
      ok: true,
      message: "Usuario creado correctamente",
      usuario: safeUser,
    });
  } catch (error) {
    console.error("Error creando usuario:", error.message);
    return res.status(500).json({
      ok: false,
      message: "Error creando usuario",
    });
  }
};

/**
 * PUT /api/usuarios/:id
 */
export const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, contrasena, rol, estado } = req.body;

    const campos = {};

    if (username !== undefined) campos.username = username;
    if (rol !== undefined) campos.rol = rol;
    if (estado !== undefined) campos.estado = estado;

    if (contrasena) {
      campos.contrasena = hashPassword(contrasena);
    }

    if (Object.keys(campos).length === 0) {
      return res.status(400).json({
        ok: false,
        message: "No hay campos para actualizar",
      });
    }

    const actualizado = await UsuarioModel.update(id, campos);
    const { contrasena: _, ...safeUser } = actualizado;

    return res.json({
      ok: true,
      message: "Usuario actualizado correctamente",
      usuario: safeUser,
    });
  } catch (error) {
    console.error("Error actualizando usuario:", error.message);
    return res.status(500).json({
      ok: false,
      message: "Error actualizando usuario",
    });
  }
};

/**
 * DELETE /api/usuarios/:id
 * Soft-delete: estado = 0 + marca deleted_at
 */
export const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    // Primero desactivar
    const actualizado = await UsuarioModel.update(id, { estado: 0 });
    // Luego marcar deleted_at
    await UsuarioModel.delete(id);

    const { contrasena: _, ...safeUser } = actualizado;

    return res.json({
      ok: true,
      message: "Usuario desactivado correctamente",
      usuario: safeUser,
    });
  } catch (error) {
    console.error("Error eliminando usuario:", error.message);
    return res.status(500).json({
      ok: false,
      message: "Error eliminando usuario",
    });
  }
};
