import models from "../models/index.js";
const { InfraccionModel } = models;

// GET /api/infracciones
export const getInfracciones = async (req, res) => {
  try {
    const page = Number(req.query.page || 1);
    const pageSize = Number(req.query.pageSize || 50);

    const result = await InfraccionModel.findPage({
      page,
      pageSize,
      withRelations: false,
      filters: {},
    });

    return res.json({
      ok: true,
      ...result,
    });
  } catch (error) {
    console.error("Error listando infracciones:", error.message);
    return res.status(500).json({
      ok: false,
      message: "Error listando infracciones",
    });
  }
};

// GET /api/infracciones/:id
export const getInfraccionById = async (req, res) => {
  try {
    const { id } = req.params;

    const infraccion = await InfraccionModel.findById(id, {
      withRelations: true,
    });

    if (!infraccion) {
      return res.status(404).json({
        ok: false,
        message: "Infracción no encontrada",
      });
    }

    return res.json({
      ok: true,
      infraccion,
    });
  } catch (error) {
    console.error("Error obteniendo infracción:", error.message);
    return res.status(500).json({
      ok: false,
      message: "Error obteniendo infracción",
    });
  }
};

// POST /api/infracciones
export const createInfraccion = async (req, res) => {
  try {
    const nueva = await InfraccionModel.create(req.body);

    return res.status(201).json({
      ok: true,
      message: "Infracción creada correctamente",
      infraccion: nueva,
    });
  } catch (error) {
    console.error("Error creando infracción:", error.message);
    return res.status(500).json({
      ok: false,
      message: "Error creando infracción",
    });
  }
};

// PUT /api/infracciones/:id
export const updateInfraccion = async (req, res) => {
  try {
    const { id } = req.params;
    const actualizada = await InfraccionModel.update(id, req.body);

    return res.json({
      ok: true,
      message: "Infracción actualizada correctamente",
      infraccion: actualizada,
    });
  } catch (error) {
    console.error("Error actualizando infracción:", error.message);
    return res.status(500).json({
      ok: false,
      message: "Error actualizando infracción",
    });
  }
};

// DELETE /api/infracciones/:id
export const deleteInfraccion = async (req, res) => {
  try {
    const { id } = req.params;
    await InfraccionModel.delete(id);

    return res.json({
      ok: true,
      message: "Infracción eliminada (soft delete) correctamente",
    });
  } catch (error) {
    console.error("Error eliminando infracción:", error.message);
    return res.status(500).json({
      ok: false,
      message: "Error eliminando infracción",
    });
  }
};
