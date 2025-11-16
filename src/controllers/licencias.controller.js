import models from '../models/index.js';
const {
  LicenciaConduccionModel,
  LicenciaCategoriaModel,
} = models;

// GET /api/licencias
export const getLicencias = async (req, res) => {
  try {
    const page = Number(req.query.page || 1);
    const pageSize = Number(req.query.pageSize || 50);
    const withRelations = req.query.withRelations === 'true';

    const result = await LicenciaConduccionModel.findPage({
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
    console.error('Error listando licencias:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error listando licencias',
    });
  }
};

// GET /api/licencias/:id
export const getLicenciaById = async (req, res) => {
  try {
    const { id } = req.params;
    const withRelations = req.query.withRelations === 'true';

    const licencia = await LicenciaConduccionModel.findById(id, { withRelations });

    if (!licencia) {
      return res.status(404).json({
        ok: false,
        message: 'Licencia no encontrada',
      });
    }

    return res.json({
      ok: true,
      licencia,
    });
  } catch (error) {
    console.error('Error obteniendo licencia:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error obteniendo licencia',
    });
  }
};

// POST /api/licencias
export const createLicencia = async (req, res) => {
  try {
    const nueva = await LicenciaConduccionModel.create(req.body);

    return res.status(201).json({
      ok: true,
      message: 'Licencia creada correctamente',
      licencia: nueva,
    });
  } catch (error) {
    console.error('Error creando licencia:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error creando licencia',
    });
  }
};

// PUT /api/licencias/:id
export const updateLicencia = async (req, res) => {
  try {
    const { id } = req.params;
    const actualizada = await LicenciaConduccionModel.update(id, req.body);

    return res.json({
      ok: true,
      message: 'Licencia actualizada correctamente',
      licencia: actualizada,
    });
  } catch (error) {
    console.error('Error actualizando licencia:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error actualizando licencia',
    });
  }
};

// DELETE /api/licencias/:id
export const deleteLicencia = async (req, res) => {
  try {
    const { id } = req.params;
    await LicenciaConduccionModel.delete(id);

    return res.json({
      ok: true,
      message: 'Licencia eliminada (soft delete) correctamente',
    });
  } catch (error) {
    console.error('Error eliminando licencia:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error eliminando licencia',
    });
  }
};

// CRUD simple para relación licencia-categoría

// POST /api/licencias/:id/licencias-categorias
export const addCategoriaToLicencia = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_categoria_licencia } = req.body;

    const relacion = await LicenciaCategoriaModel.create({
      id_licencia_conduccion: id,
      id_categoria_licencia,
    });

    return res.status(201).json({
      ok: true,
      message: 'Categoría asociada a licencia correctamente',
      relacion,
    });
  } catch (error) {
    console.error('Error asociando categoría a licencia:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error asociando categoría a licencia',
    });
  }
};
