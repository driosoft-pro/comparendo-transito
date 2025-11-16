import models from '../models/index.js';
const { PropietarioAutomotorModel } = models;

// GET /api/propietarios
export const getPropietarios = async (req, res) => {
  try {
    const page = Number(req.query.page || 1);
    const pageSize = Number(req.query.pageSize || 50);
    const withRelations = req.query.withRelations === 'true';

    const result = await PropietarioAutomotorModel.findPage({
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
    console.error('Error listando propietarios:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error listando propietarios',
    });
  }
};

// GET /api/propietarios/:id
export const getPropietarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const withRelations = req.query.withRelations === 'true';

    const propietario = await PropietarioAutomotorModel.findById(id, { withRelations });

    if (!propietario) {
      return res.status(404).json({
        ok: false,
        message: 'Propietario no encontrado',
      });
    }

    return res.json({
      ok: true,
      propietario,
    });
  } catch (error) {
    console.error('Error obteniendo propietario:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error obteniendo propietario',
    });
  }
};

// POST /api/propietarios
export const createPropietario = async (req, res) => {
  try {
    const nuevo = await PropietarioAutomotorModel.create(req.body);

    return res.status(201).json({
      ok: true,
      message: 'Propietario creado correctamente',
      propietario: nuevo,
    });
  } catch (error) {
    console.error('Error creando propietario:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error creando propietario',
    });
  }
};

// PUT /api/propietarios/:id
export const updatePropietario = async (req, res) => {
  try {
    const { id } = req.params;
    const actualizado = await PropietarioAutomotorModel.update(id, req.body);

    return res.json({
      ok: true,
      message: 'Propietario actualizado correctamente',
      propietario: actualizado,
    });
  } catch (error) {
    console.error('Error actualizando propietario:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error actualizando propietario',
    });
  }
};

// DELETE /api/propietarios/:id
export const deletePropietario = async (req, res) => {
  try {
    const { id } = req.params;
    await PropietarioAutomotorModel.delete(id);

    return res.json({
      ok: true,
      message: 'Propietario eliminado (soft delete) correctamente',
    });
  } catch (error) {
    console.error('Error eliminando propietario:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error eliminando propietario',
    });
  }
};
