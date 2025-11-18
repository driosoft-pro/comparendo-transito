import models from "../models/index.js";
const { CargoPolicialModel } = models;

/**
 * GET /api/cargos-policiales
 * Query: page, pageSize, withDeleted?
 */
export const getCargosPoliciales = async (req, res) => {
  try {
    const page = Number(req.query.page || 1);
    const pageSize = Number(req.query.pageSize || req.query.limit || 50);
    const withDeleted = req.query.withDeleted === "true";

    const pageResult = await CargoPolicialModel.findPage({
      page,
      pageSize,
      withRelations: false,
      filters: {},
    });

    let cargos = pageResult.data || [];
    if (!withDeleted) {
      cargos = cargos.filter(
        (c) => c.deleted_at === null || c.deleted_at === undefined,
      );
    }

    return res.json({
      ok: true,
      page: pageResult.page,
      pageSize: pageResult.pageSize,
      total: pageResult.total,
      totalPages: pageResult.totalPages,
      cargos,
    });
  } catch (error) {
    console.error("Error listando cargos policiales:", error.message);
    return res.status(500).json({
      ok: false,
      message: "Error obteniendo cargos policiales",
    });
  }
};

/**
 * GET /api/cargos-policiales/:id
 */
export const getCargoPolicialById = async (req, res) => {
  try {
    const { id } = req.params;

    const cargo = await CargoPolicialModel.findById(id);
    if (!cargo) {
      return res.status(404).json({
        ok: false,
        message: "Cargo policial no encontrado",
      });
    }

    return res.json({
      ok: true,
      cargo,
    });
  } catch (error) {
    console.error("Error obteniendo cargo policial:", error.message);
    return res.status(500).json({
      ok: false,
      message: "Error obteniendo cargo policial",
    });
  }
};

/**
 * POST /api/cargos-policiales
 * body: { ...camposDelModelo }
 */
export const createCargoPolicial = async (req, res) => {
  try {
    const data = req.body || {};

    if (Object.keys(data).length === 0) {
      return res.status(400).json({
        ok: false,
        message: "No se recibieron datos para crear el cargo policial",
      });
    }

    const nuevoCargo = await CargoPolicialModel.create(data);

    return res.status(201).json({
      ok: true,
      message: "Cargo policial creado correctamente",
      cargo: nuevoCargo,
    });
  } catch (error) {
    console.error("Error creando cargo policial:", error.message);
    return res.status(500).json({
      ok: false,
      message: "Error creando cargo policial",
    });
  }
};

/**
 * PUT /api/cargos-policiales/:id
 */
export const updateCargoPolicial = async (req, res) => {
  try {
    const { id } = req.params;
    const campos = req.body || {};

    if (Object.keys(campos).length === 0) {
      return res.status(400).json({
        ok: false,
        message: "No hay campos para actualizar",
      });
    }

    const actualizado = await CargoPolicialModel.update(id, campos);

    return res.json({
      ok: true,
      message: "Cargo policial actualizado correctamente",
      cargo: actualizado,
    });
  } catch (error) {
    console.error("Error actualizando cargo policial:", error.message);
    return res.status(500).json({
      ok: false,
      message: "Error actualizando cargo policial",
    });
  }
};

/**
 * DELETE /api/cargos-policiales/:id
 * Se asume soft-delete en el modelo
 */
export const deleteCargoPolicial = async (req, res) => {
  try {
    const { id } = req.params;

    const eliminado = await CargoPolicialModel.delete(id);

    return res.json({
      ok: true,
      message: "Cargo policial eliminado correctamente",
      cargo: eliminado,
    });
  } catch (error) {
    console.error("Error eliminando cargo policial:", error.message);
    return res.status(500).json({
      ok: false,
      message: "Error eliminando cargo policial",
    });
  }
};
