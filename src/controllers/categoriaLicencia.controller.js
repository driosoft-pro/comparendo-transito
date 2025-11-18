import models from "../models/index.js";
const { CategoriaLicenciaModel } = models;

/**
 * GET /api/categorias-licencia
 * Query: page, pageSize, withDeleted?
 */
export const getCategoriasLicencia = async (req, res) => {
  try {
    const page = Number(req.query.page || 1);
    const pageSize = Number(req.query.pageSize || req.query.limit || 50);
    const withDeleted = req.query.withDeleted === "true";

    const pageResult = await CategoriaLicenciaModel.findPage({
      page,
      pageSize,
      withRelations: false,
      filters: {},
    });

    let categorias = pageResult.data || [];
    if (!withDeleted) {
      categorias = categorias.filter(
        (c) => c.deleted_at === null || c.deleted_at === undefined,
      );
    }

    return res.json({
      ok: true,
      page: pageResult.page,
      pageSize: pageResult.pageSize,
      total: pageResult.total,
      totalPages: pageResult.totalPages,
      categorias,
    });
  } catch (error) {
    console.error("Error listando categorías de licencia:", error.message);
    return res.status(500).json({
      ok: false,
      message: "Error obteniendo categorías de licencia",
    });
  }
};

/**
 * GET /api/categorias-licencia/:id
 */
export const getCategoriaLicenciaById = async (req, res) => {
  try {
    const { id } = req.params;

    const categoria = await CategoriaLicenciaModel.findById(id);
    if (!categoria) {
      return res.status(404).json({
        ok: false,
        message: "Categoría de licencia no encontrada",
      });
    }

    return res.json({
      ok: true,
      categoria,
    });
  } catch (error) {
    console.error("Error obteniendo categoría de licencia:", error.message);
    return res.status(500).json({
      ok: false,
      message: "Error obteniendo categoría de licencia",
    });
  }
};

/**
 * POST /api/categorias-licencia
 * body: { ...camposDelModelo }
 */
export const createCategoriaLicencia = async (req, res) => {
  try {
    const data = req.body || {};

    if (Object.keys(data).length === 0) {
      return res.status(400).json({
        ok: false,
        message: "No se recibieron datos para crear la categoría de licencia",
      });
    }

    const nuevaCategoria = await CategoriaLicenciaModel.create(data);

    return res.status(201).json({
      ok: true,
      message: "Categoría de licencia creada correctamente",
      categoria: nuevaCategoria,
    });
  } catch (error) {
    console.error("Error creando categoría de licencia:", error.message);
    return res.status(500).json({
      ok: false,
      message: "Error creando categoría de licencia",
    });
  }
};

/**
 * PUT /api/categorias-licencia/:id
 */
export const updateCategoriaLicencia = async (req, res) => {
  try {
    const { id } = req.params;
    const campos = req.body || {};

    if (Object.keys(campos).length === 0) {
      return res.status(400).json({
        ok: false,
        message: "No hay campos para actualizar",
      });
    }

    const actualizado = await CategoriaLicenciaModel.update(id, campos);

    return res.json({
      ok: true,
      message: "Categoría de licencia actualizada correctamente",
      categoria: actualizado,
    });
  } catch (error) {
    console.error("Error actualizando categoría de licencia:", error.message);
    return res.status(500).json({
      ok: false,
      message: "Error actualizando categoría de licencia",
    });
  }
};

/**
 * DELETE /api/categorias-licencia/:id
 * Se asume soft-delete en el modelo
 */
export const deleteCategoriaLicencia = async (req, res) => {
  try {
    const { id } = req.params;

    const eliminado = await CategoriaLicenciaModel.delete(id);

    return res.json({
      ok: true,
      message: "Categoría de licencia eliminada correctamente",
      categoria: eliminado,
    });
  } catch (error) {
    console.error("Error eliminando categoría de licencia:", error.message);
    return res.status(500).json({
      ok: false,
      message: "Error eliminando categoría de licencia",
    });
  }
};
