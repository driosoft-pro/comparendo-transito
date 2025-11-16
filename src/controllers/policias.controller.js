import models from '../models/index.js';
const { PoliciaTransitoModel } = models;

// GET /api/policias
export const getPolicias = async (req, res) => {
  try {
    const page = Number(req.query.page || 1);
    const pageSize = Number(req.query.pageSize || 50);
    const withRelations = req.query.withRelations === 'true';

    const result = await PoliciaTransitoModel.findPage({
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
    console.error('Error listando policías:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error listando policías',
    });
  }
};

// GET /api/policias/:id
export const getPoliciaById = async (req, res) => {
  try {
    const { id } = req.params;
    const withRelations = req.query.withRelations === 'true';

    const policia = await PoliciaTransitoModel.findById(id, { withRelations });

    if (!policia) {
      return res.status(404).json({
        ok: false,
        message: 'Policía no encontrado',
      });
    }

    return res.json({
      ok: true,
      policia,
    });
  } catch (error) {
    console.error('Error obteniendo policía:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error obteniendo policía',
    });
  }
};

// POST /api/policias
export const createPolicia = async (req, res) => {
  try {
    const nuevo = await PoliciaTransitoModel.create(req.body);

    return res.status(201).json({
      ok: true,
      message: 'Policía creado correctamente',
      policia: nuevo,
    });
  } catch (error) {
    console.error('Error creando policía:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error creando policía',
    });
  }
};

// PUT /api/policias/:id
export const updatePolicia = async (req, res) => {
  try {
    const { id } = req.params;
    const actualizado = await PoliciaTransitoModel.update(id, req.body);

    return res.json({
      ok: true,
      message: 'Policía actualizado correctamente',
      policia: actualizado,
    });
  } catch (error) {
    console.error('Error actualizando policía:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error actualizando policía',
    });
  }
};

// DELETE /api/policias/:id
export const deletePolicia = async (req, res) => {
  try {
    const { id } = req.params;
    await PoliciaTransitoModel.delete(id);

    return res.json({
      ok: true,
      message: 'Policía eliminado (soft delete) correctamente',
    });
  } catch (error) {
    console.error('Error eliminando policía:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error eliminando policía',
    });
  }
};
