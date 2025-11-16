import models from '../models/index.js';
const { AutomotorModel } = models;

// GET /api/automotores
export const getAutomotores = async (req, res) => {
  try {
    const page = Number(req.query.page || 1);
    const pageSize = Number(req.query.pageSize || 50);
    const withRelations = req.query.withRelations === 'true';

    const result = await AutomotorModel.findPage({
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
    console.error('Error listando automotores:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error listando automotores',
    });
  }
};

// GET /api/automotores/:id
export const getAutomotorById = async (req, res) => {
  try {
    const { id } = req.params;
    const withRelations = req.query.withRelations === 'true';

    const automotor = await AutomotorModel.findById(id, { withRelations });

    if (!automotor) {
      return res.status(404).json({
        ok: false,
        message: 'Automotor no encontrado',
      });
    }

    return res.json({
      ok: true,
      automotor,
    });
  } catch (error) {
    console.error('Error obteniendo automotor:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error obteniendo automotor',
    });
  }
};

// GET /api/automotores/placa/:placa
export const getAutomotorByPlaca = async (req, res) => {
  try {
    const { placa } = req.params;
    const withRelations = req.query.withRelations === 'true';

    const automotor = await AutomotorModel.findByPlaca(placa, { withRelations });

    if (!automotor) {
      return res.status(404).json({
        ok: false,
        message: 'Automotor no encontrado',
      });
    }

    return res.json({
      ok: true,
      automotor,
    });
  } catch (error) {
    console.error('Error buscando automotor por placa:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error buscando automotor por placa',
    });
  }
};

// POST /api/automotores
export const createAutomotor = async (req, res) => {
  try {
    const nuevo = await AutomotorModel.create(req.body);

    return res.status(201).json({
      ok: true,
      message: 'Automotor creado correctamente',
      automotor: nuevo,
    });
  } catch (error) {
    console.error('Error creando automotor:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error creando automotor',
    });
  }
};

// PUT /api/automotores/:id
export const updateAutomotor = async (req, res) => {
  try {
    const { id } = req.params;
    const actualizado = await AutomotorModel.update(id, req.body);

    return res.json({
      ok: true,
      message: 'Automotor actualizado correctamente',
      automotor: actualizado,
    });
  } catch (error) {
    console.error('Error actualizando automotor:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error actualizando automotor',
    });
  }
};

// DELETE /api/automotores/:id
export const deleteAutomotor = async (req, res) => {
  try {
    const { id } = req.params;
    await AutomotorModel.delete(id);

    return res.json({
      ok: true,
      message: 'Automotor eliminado (soft delete) correctamente',
    });
  } catch (error) {
    console.error('Error eliminando automotor:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error eliminando automotor',
    });
  }
};
