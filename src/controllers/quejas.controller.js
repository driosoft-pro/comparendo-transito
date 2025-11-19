import { QuejaService } from "../services/queja.service.js";

/**
 * GET /api/quejas
 */
export const getQuejas = async (req, res) => {
  try {
    const page = Number(req.query.page || 1);
    const pageSize = Number(req.query.pageSize || 50);
    const withRelations = req.query.withRelations === "true";

    const result = await QuejaService.findPage({
      page,
      pageSize,
      filters: {},
    });

    if (withRelations) {
      const dataRel = await Promise.all(
        result.data.map((q) =>
          QuejaService.findById(q._id, { withRelations: true }),
        ),
      );
      result.data = dataRel;
    }

    return res.json({
      ok: true,
      ...result,
    });
  } catch (error) {
    console.error("Error listando quejas:", error);
    return res.status(500).json({
      ok: false,
      message: "Error listando quejas",
    });
  }
};

/**
 * GET /api/quejas/:id
 */
export const getQuejaById = async (req, res) => {
  try {
    const { id } = req.params;
    const withRelations = req.query.withRelations === "true";

    const queja = await QuejaService.findById(id, { withRelations });

    if (!queja) {
      return res.status(404).json({
        ok: false,
        message: "Queja no encontrada",
      });
    }

    return res.json({
      ok: true,
      queja,
    });
  } catch (error) {
    console.error("Error obteniendo queja:", error);
    return res.status(500).json({
      ok: false,
      message: "Error obteniendo queja",
    });
  }
};

/**
 * GET /api/quejas/persona/:id_persona
 */
export const getQuejasByPersona = async (req, res) => {
  try {
    const { id_persona } = req.params;
    const withRelations = req.query.withRelations === "true";

    const quejas = await QuejaService.findAll({
      filters: { id_persona: Number(id_persona) },
    });

    let result = quejas;
    if (withRelations) {
      result = await Promise.all(
        quejas.map((q) =>
          QuejaService.findById(q._id, { withRelations: true }),
        ),
      );
    }

    return res.json({
      ok: true,
      quejas: result,
    });
  } catch (error) {
    console.error("Error listando quejas por persona:", error);
    return res.status(500).json({
      ok: false,
      message: "Error listando quejas por persona",
    });
  }
};

// GET /api/personas/:id
export const getQuejasByComparendo = async (req, res) => {
  try {
    const { id_comparendo } = req.params;
    const withRelations = req.query.withRelations === "true";

    const quejas = await QuejaService.findAll({
      filters: { id_comparendo: Number(id_comparendo) },
    });

    let result = quejas;
    if (withRelations) {
      result = await Promise.all(
        quejas.map((q) =>
          QuejaService.findById(q._id, { withRelations: true }),
        ),
      );
    }

    return res.json({
      ok: true,
      quejas: result,
    });
  } catch (error) {
    console.error("Error listando quejas por comparendo:", error);
    return res.status(500).json({
      ok: false,
      message: "Error listando quejas por comparendo",
    });
  }
};

// POST /api/personas
export const createQueja = async (req, res) => {
  try {
    const nueva = await QuejaService.create(req.body);

    return res.status(201).json({
      ok: true,
      message: "Queja creada correctamente",
      queja: nueva,
    });
  } catch (error) {
    console.error("Error creando queja:", error);
    return res.status(500).json({
      ok: false,
      message: "Error creando queja",
    });
  }
};

// PUT /api/quejas/:id
export const updateQueja = async (req, res) => {
  try {
    const { id } = req.params;
    const actualizada = await QuejaService.update(id, req.body);

    if (!actualizada) {
      return res.status(404).json({
        ok: false,
        message: "Queja no encontrada",
      });
    }

    return res.json({
      ok: true,
      message: "Queja actualizada correctamente",
      queja: actualizada,
    });
  } catch (error) {
    console.error("Error actualizando queja:", error);
    return res.status(500).json({
      ok: false,
      message: "Error actualizando queja",
    });
  }
};

// DELETE /api/quejas/:id
export const deleteQueja = async (req, res) => {
  try {
    const { id } = req.params;
    await QuejaService.delete(id);

    return res.json({
      ok: true,
      message: "Queja eliminada (soft delete) correctamente",
    });
  } catch (error) {
    console.error("Error eliminando queja:", error);
    return res.status(500).json({
      ok: false,
      message: "Error eliminando queja",
    });
  }
};
