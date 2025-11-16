import models from "../models/index.js";
const { PersonaModel } = models;

/**
 * GET /api/usuarios/me
 */
export const getMe = async (req, res) => {
  try {
    const { id_usuario } = req.user;
    const persona = await PersonaModel.findById(id_usuario);

    if (!persona) {
      return res.status(404).json({
        ok: false,
        message: "Persona no encontrada",
      });
    }

    return res.json({
      ok: true,
      persona,
    });
  } catch (error) {
    console.error("Error obteniendo persona:", error.message);
    return res.status(500).json({
      ok: false,
      message: "Error obteniendo persona",
    });
  }
};

// GET /api/personas
export const getPersonas = async (req, res) => {
  try {
    const page = Number(req.query.page || 1);
    const pageSize = Number(req.query.pageSize || 50);
    const withRelations = req.query.withRelations === "true";

    const result = await PersonaModel.findPage({
      page,
      pageSize,
      withRelations,
      filters: {},
    });

    return res.json({
      ok: true,
      ...result,
    });
  } catch (error) {
    console.error("Error listando personas:", error.message);
    return res.status(500).json({
      ok: false,
      message: "Error listando personas",
    });
  }
};

// GET /api/personas/:id
export const getPersonaById = async (req, res) => {
  try {
    const { id } = req.params;
    const withRelations = req.query.withRelations === "true";

    const persona = await PersonaModel.findById(id, { withRelations });

    if (!persona) {
      return res.status(404).json({
        ok: false,
        message: "Persona no encontrada",
      });
    }

    return res.json({
      ok: true,
      persona,
    });
  } catch (error) {
    console.error("Error obteniendo persona:", error.message);
    return res.status(500).json({
      ok: false,
      message: "Error obteniendo persona",
    });
  }
};

// POST /api/personas
export const createPersona = async (req, res) => {
  try {
    const nueva = await PersonaModel.create(req.body);

    return res.status(201).json({
      ok: true,
      message: "Persona creada correctamente",
      persona: nueva,
    });
  } catch (error) {
    console.error("Error creando persona:", error.message);
    return res.status(500).json({
      ok: false,
      message: "Error creando persona",
    });
  }
};

// PUT /api/personas/:id
export const updatePersona = async (req, res) => {
  try {
    const { id } = req.params;
    const actualizada = await PersonaModel.update(id, req.body);

    return res.json({
      ok: true,
      message: "Persona actualizada correctamente",
      persona: actualizada,
    });
  } catch (error) {
    console.error("Error actualizando persona:", error.message);
    return res.status(500).json({
      ok: false,
      message: "Error actualizando persona",
    });
  }
};

// DELETE /api/personas/:id
export const deletePersona = async (req, res) => {
  try {
    const { id } = req.params;
    await PersonaModel.delete(id);

    return res.json({
      ok: true,
      message: "Persona eliminada (soft delete) correctamente",
    });
  } catch (error) {
    console.error("Error eliminando persona:", error.message);
    return res.status(500).json({
      ok: false,
      message: "Error eliminando persona",
    });
  }
};
