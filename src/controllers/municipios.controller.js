import models from '../models/index.js';
const { MunicipioModel } = models;

// GET /api/municipios
export const getMunicipios = async (req, res) => {
  try {
    const page = Number(req.query.page || 1);
    const pageSize = Number(req.query.pageSize || 50);
    const withRelations = req.query.withRelations === 'true';

    const result = await MunicipioModel.findPage({
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
    console.error('Error listando municipios:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error listando municipios',
    });
  }
};

// GET /api/municipios/:id
export const getMunicipioById = async (req, res) => {
  try {
    const { id } = req.params;
    const withRelations = req.query.withRelations === 'true';

    const municipio = await MunicipioModel.findById(id, { withRelations });

    if (!municipio) {
      return res.status(404).json({
        ok: false,
        message: 'Municipio no encontrado',
      });
    }

    return res.json({
      ok: true,
      municipio,
    });
  } catch (error) {
    console.error('Error obteniendo municipio:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error obteniendo municipio',
    });
  }
};

// POST /api/municipios
export const createMunicipio = async (req, res) => {
  try {
    const nuevo = await MunicipioModel.create(req.body);

    return res.status(201).json({
      ok: true,
      message: 'Municipio creado correctamente',
      municipio: nuevo,
    });
  } catch (error) {
    console.error('Error creando municipio:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error creando municipio',
    });
  }
};

// PUT /api/municipios/:id
export const updateMunicipio = async (req, res) => {
  try {
    const { id } = req.params;
    const actualizado = await MunicipioModel.update(id, req.body);

    return res.json({
      ok: true,
      message: 'Municipio actualizado correctamente',
      municipio: actualizado,
    });
  } catch (error) {
    console.error('Error actualizando municipio:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error actualizando municipio',
    });
  }
};

// DELETE /api/municipios/:id
export const deleteMunicipio = async (req, res) => {
  try {
    const { id } = req.params;
    await MunicipioModel.delete(id);

    return res.json({
      ok: true,
      message: 'Municipio eliminado (soft delete) correctamente',
    });
  } catch (error) {
    console.error('Error eliminando municipio:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error eliminando municipio',
    });
  }
};
