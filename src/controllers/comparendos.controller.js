import models from '../models/index.js';
const { ComparendoModel } = models;

// GET /api/comparendos
export const getComparendos = async (req, res) => {
  try {
    const page = Number(req.query.page || 1);
    const pageSize = Number(req.query.pageSize || 50);
    const withRelations = req.query.withRelations === 'true';

    const result = await ComparendoModel.findPage({
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
    console.error('Error listando comparendos:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error listando comparendos',
    });
  }
};

// GET /api/comparendos/:id
export const getComparendoById = async (req, res) => {
  try {
    const { id } = req.params;
    const withRelations = req.query.withRelations === 'true';

    const comparendo = await ComparendoModel.findById(id, { withRelations });

    if (!comparendo) {
      return res.status(404).json({
        ok: false,
        message: 'Comparendo no encontrado',
      });
    }

    return res.json({
      ok: true,
      comparendo,
    });
  } catch (error) {
    console.error('Error obteniendo comparendo:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error obteniendo comparendo',
    });
  }
};

// GET /api/comparendos/numero/:numero
export const getComparendoByNumero = async (req, res) => {
  try {
    const { numero } = req.params;
    const withRelations = req.query.withRelations === 'true';

    const comparendo = await ComparendoModel.findByNumero(numero, { withRelations });

    if (!comparendo) {
      return res.status(404).json({
        ok: false,
        message: 'Comparendo no encontrado',
      });
    }

    return res.json({
      ok: true,
      comparendo,
    });
  } catch (error) {
    console.error('Error buscando comparendo por número:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error buscando comparendo por número',
    });
  }
};

// POST /api/comparendos
export const createComparendo = async (req, res) => {
  try {
    const nuevo = await ComparendoModel.create(req.body);

    return res.status(201).json({
      ok: true,
      message: 'Comparendo creado correctamente',
      comparendo: nuevo,
    });
  } catch (error) {
    console.error('Error creando comparendo:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error creando comparendo',
    });
  }
};

// PUT /api/comparendos/:id
export const updateComparendo = async (req, res) => {
  try {
    const { id } = req.params;
    const actualizado = await ComparendoModel.update(id, req.body);

    return res.json({
      ok: true,
      message: 'Comparendo actualizado correctamente',
      comparendo: actualizado,
    });
  } catch (error) {
    console.error('Error actualizando comparendo:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error actualizando comparendo',
    });
  }
};

// DELETE /api/comparendos/:id
export const deleteComparendo = async (req, res) => {
  try {
    const { id } = req.params;
    await ComparendoModel.delete(id);

    return res.json({
      ok: true,
      message: 'Comparendo eliminado (soft delete) correctamente',
    });
  } catch (error) {
    console.error('Error eliminando comparendo:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error eliminando comparendo',
    });
  }
};
