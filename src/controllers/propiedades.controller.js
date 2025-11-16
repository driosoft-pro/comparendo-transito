import models from '../models/index.js';
const { PropiedadAutomotorModel } = models;

// GET /api/propiedades
export const getPropiedades = async (req, res) => {
  try {
    const page = Number(req.query.page || 1);
    const pageSize = Number(req.query.pageSize || 50);
    const withRelations = req.query.withRelations === 'true';

    const result = await PropiedadAutomotorModel.findPage({
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
    console.error('Error listando propiedades:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error listando propiedades',
    });
  }
};

// GET /api/propiedades/:id
export const getPropiedadById = async (req, res) => {
  try {
    const { id } = req.params;
    const withRelations = req.query.withRelations === 'true';

    const propiedad = await PropiedadAutomotorModel.findById(id, { withRelations });

    if (!propiedad) {
      return res.status(404).json({
        ok: false,
        message: 'Propiedad no encontrada',
      });
    }

    return res.json({
      ok: true,
      propiedad,
    });
  } catch (error) {
    console.error('Error obteniendo propiedad:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error obteniendo propiedad',
    });
  }
};

// POST /api/propiedades
export const createPropiedad = async (req, res) => {
  try {
    const nueva = await PropiedadAutomotorModel.create(req.body);

    return res.status(201).json({
      ok: true,
      message: 'Propiedad creada correctamente',
      propiedad: nueva,
    });
  } catch (error) {
    console.error('Error creando propiedad:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error creando propiedad',
    });
  }
};

// PUT /api/propiedades/:id
export const updatePropiedad = async (req, res) => {
  try {
    const { id } = req.params;
    const actualizada = await PropiedadAutomotorModel.update(id, req.body);

    return res.json({
      ok: true,
      message: 'Propiedad actualizada correctamente',
      propiedad: actualizada,
    });
  } catch (error) {
    console.error('Error actualizando propiedad:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error actualizando propiedad',
    });
  }
};

// DELETE /api/propiedades/:id
export const deletePropiedad = async (req, res) => {
  try {
    const { id } = req.params;
    await PropiedadAutomotorModel.delete(id);

    return res.json({
      ok: true,
      message: 'Propiedad eliminada (soft delete) correctamente',
    });
  } catch (error) {
    console.error('Error eliminando propiedad:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error eliminando propiedad',
    });
  }
};
