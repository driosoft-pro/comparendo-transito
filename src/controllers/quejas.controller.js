import models from '../models/index.js';
const { QuejaModel } = models;

// GET /api/quejas
export const getQuejas = async (req, res) => {
  try {
    const page = Number(req.query.page || 1);
    const pageSize = Number(req.query.pageSize || 50);
    const withRelations = req.query.withRelations === 'true';

    const result = await QuejaModel.findPage({
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
    console.error('Error listando quejas:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error listando quejas',
    });
  }
};

// GET /api/quejas/:id
export const getQuejaById = async (req, res) => {
  try {
    const { id } = req.params;
    const withRelations = req.query.withRelations === 'true';

    const queja = await QuejaModel.findById(id, { withRelations });

    if (!queja) {
      return res.status(404).json({
        ok: false,
        message: 'Queja no encontrada',
      });
    }

    return res.json({
      ok: true,
      queja,
    });
  } catch (error) {
    console.error('Error obteniendo queja:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error obteniendo queja',
    });
  }
};

// GET /api/quejas/persona/:id_persona
export const getQuejasByPersona = async (req, res) => {
  try {
    const { id_persona } = req.params;
    const withRelations = req.query.withRelations === 'true';

    const quejas = await QuejaModel.listByPersona(id_persona, { withRelations });

    return res.json({
      ok: true,
      quejas,
    });
  } catch (error) {
    console.error('Error listando quejas por persona:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error listando quejas por persona',
    });
  }
};

// GET /api/quejas/comparendo/:id_comparendo
export const getQuejasByComparendo = async (req, res) => {
  try {
    const { id_comparendo } = req.params;
    const withRelations = req.query.withRelations === 'true';

    const quejas = await QuejaModel.listByComparendo(id_comparendo, { withRelations });

    return res.json({
      ok: true,
      quejas,
    });
  } catch (error) {
    console.error('Error listando quejas por comparendo:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error listando quejas por comparendo',
    });
  }
};

// POST /api/quejas
export const createQueja = async (req, res) => {
  try {
    const nueva = await QuejaModel.create(req.body);

    return res.status(201).json({
      ok: true,
      message: 'Queja creada correctamente',
      queja: nueva,
    });
  } catch (error) {
    console.error('Error creando queja:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error creando queja',
    });
  }
};

// PUT /api/quejas/:id
export const updateQueja = async (req, res) => {
  try {
    const { id } = req.params;
    const actualizada = await QuejaModel.update(id, req.body);

    return res.json({
      ok: true,
      message: 'Queja actualizada correctamente',
      queja: actualizada,
    });
  } catch (error) {
    console.error('Error actualizando queja:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error actualizando queja',
    });
  }
};

// DELETE /api/quejas/:id
export const deleteQueja = async (req, res) => {
  try {
    const { id } = req.params;
    await QuejaModel.delete(id);

    return res.json({
      ok: true,
      message: 'Queja eliminada (soft delete) correctamente',
    });
  } catch (error) {
    console.error('Error eliminando queja:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error eliminando queja',
    });
  }
};
