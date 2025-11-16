import models from '../models/index.js';
const { SecretariaTransitoModel } = models;

// GET /api/secretarias
export const getSecretarias = async (req, res) => {
  try {
    const page = Number(req.query.page || 1);
    const pageSize = Number(req.query.pageSize || 50);
    const withRelations = req.query.withRelations === 'true';

    const result = await SecretariaTransitoModel.findPage({
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
    console.error('Error listando secretarías:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error listando secretarías',
    });
  }
};

// GET /api/secretarias/:id
export const getSecretariaById = async (req, res) => {
  try {
    const { id } = req.params;
    const withRelations = req.query.withRelations === 'true';

    const secretaria = await SecretariaTransitoModel.findById(id, { withRelations });

    if (!secretaria) {
      return res.status(404).json({
        ok: false,
        message: 'Secretaría no encontrada',
      });
    }

    return res.json({
      ok: true,
      secretaria,
    });
  } catch (error) {
    console.error('Error obteniendo secretaría:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error obteniendo secretaría',
    });
  }
};

// POST /api/secretarias
export const createSecretaria = async (req, res) => {
  try {
    const nueva = await SecretariaTransitoModel.create(req.body);

    return res.status(201).json({
      ok: true,
      message: 'Secretaría creada correctamente',
      secretaria: nueva,
    });
  } catch (error) {
    console.error('Error creando secretaría:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error creando secretaría',
    });
  }
};

// PUT /api/secretarias/:id
export const updateSecretaria = async (req, res) => {
  try {
    const { id } = req.params;
    const actualizada = await SecretariaTransitoModel.update(id, req.body);

    return res.json({
      ok: true,
      message: 'Secretaría actualizada correctamente',
      secretaria: actualizada,
    });
  } catch (error) {
    console.error('Error actualizando secretaría:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error actualizando secretaría',
    });
  }
};

// DELETE /api/secretarias/:id
export const deleteSecretaria = async (req, res) => {
  try {
    const { id } = req.params;
    await SecretariaTransitoModel.delete(id);

    return res.json({
      ok: true,
      message: 'Secretaría eliminada (soft delete) correctamente',
    });
  } catch (error) {
    console.error('Error eliminando secretaría:', error.message);
    return res.status(500).json({
      ok: false,
      message: 'Error eliminando secretaría',
    });
  }
};
