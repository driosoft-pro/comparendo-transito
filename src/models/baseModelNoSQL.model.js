import { validateRequired } from "../utils/validators.js";

/**
 * Crea un modelo base para Mongo / Mongoose
 * @param {Object} options
 * @param {MongooseModel} options.model        Modelo de mongoose
 * @param {string[]} [options.requiredOnCreate]
 * @param {string[]} [options.requiredOnUpdate]
 * @param {string[]} [options.requiredOnDelete]
 * @param {boolean} [options.softDelete]       Si true marcará deleted_at
 * @param {string|null} [options.ownershipField] Campo opcional para validar dueño
 */
export const createBaseModelNoSQL = ({
  model,
  requiredOnCreate = [],
  requiredOnUpdate = [],
  requiredOnDelete = [],
  softDelete = true,
  ownershipField = null,
}) => {
  const base = {
    /**
     * Listar con filtros
     */
    async findAll({ withDeleted = false, filters = {} } = {}) {
      const query = model.find(filters);

      if (softDelete && !withDeleted) {
        query.where("deleted_at").equals(null);
      }

      return await query.lean();
    },

    /**
     * Buscar por ID
     */
    async findById(id, { withDeleted = false } = {}) {
      const record = await model.findById(id).lean();
      if (!record) return null;

      if (softDelete && !withDeleted && record.deleted_at) return null;
      return record;
    },

    /**
     * Crear
     */
    async create(payload) {
      validateRequired(payload, requiredOnCreate);

      if (softDelete && payload.deleted_at === undefined) {
        payload.deleted_at = null;
      }

      const doc = await model.create(payload);
      return doc.toObject();
    },

    /**
     * Actualizar
     */
    async update(id, payload) {
      validateRequired(payload, requiredOnUpdate);

      if (softDelete && "deleted_at" in payload) {
        delete payload.deleted_at;
      }

      const updated = await model
        .findByIdAndUpdate(id, payload, { new: true })
        .lean();

      return updated;
    },

    /**
     * Soft delete o borrado real
     */
    async delete(id, { extra = null } = {}) {
      if (!softDelete) {
        await model.findByIdAndDelete(id);
        return true;
      }

      const payload = {
        deleted_at: new Date(),
        ...(extra || {}),
      };

      validateRequired(payload, requiredOnDelete);

      await model.findByIdAndUpdate(id, payload);
      return true;
    },

    /**
     * Paginado
     */
    async findPage({ page = 1, pageSize = 20, filters = {} } = {}) {
      const skip = (page - 1) * pageSize;

      const query = model.find(filters);
      if (softDelete) query.where("deleted_at").equals(null);

      const [data, total] = await Promise.all([
        query.skip(skip).limit(pageSize).lean(),
        model.countDocuments(filters),
      ]);

      return {
        data,
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      };
    },
  };

  // ---------------- Ownership opcional ----------------
  if (ownershipField) {
    base.isOwner = (record, id_usuario) =>
      record && record[ownershipField] === id_usuario;

    base.assertOwnership = (record, id_usuario) => {
      if (!record) {
        const err = new Error("Recurso no encontrado");
        err.status = 404;
        throw err;
      }
      if (!base.isOwner(record, id_usuario)) {
        const err = new Error("No eres dueño de este recurso");
        err.status = 403;
        throw err;
      }
    };

    base.findByIdOwned = async (id, id_usuario, options = {}) => {
      const record = await base.findById(id, options);
      base.assertOwnership(record, id_usuario);
      return record;
    };

    base.findAllByOwner = async (id_usuario, options = {}) => {
      const { withDeleted = false, filters = {} } = options;
      const fullFilters = { ...filters, [ownershipField]: id_usuario };
      return await base.findAll({ withDeleted, filters: fullFilters });
    };
  }

  return base;
};
