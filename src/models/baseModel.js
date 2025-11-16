import { supabase } from "../config/supabase.js";
import { validateRequired } from "../utils/validators.js";

/**
 * Crea un modelo base para una tabla de Supabase/PostgreSQL
 * @param {Object} options
 * @param {string} options.table              Nombre de la tabla
 * @param {string} options.idColumn           Nombre de la PK
 * @param {string[]} [options.requiredOnCreate] Campos requeridos en create()
 * @param {string[]} [options.requiredOnUpdate] Campos requeridos en update()
 * @param {boolean} [options.softDelete]      Si true, delete() marca deleted_at en vez de borrar
 * @param {string} [options.defaultSelect]    Proyección por defecto
 * @param {string|null} [options.relationsSelect] Proyección con relaciones (joins automáticos)
 * @param {string|null} [options.ownershipField]  Campo que referencia al id_usuario dueño (ej: 'id_usuario')
 */
export const createBaseModel = ({
  table,
  idColumn,
  requiredOnCreate = [],
  requiredOnUpdate = [],
  softDelete = true,
  defaultSelect = "*",
  relationsSelect = null,
  ownershipField = null,
}) => {
  const selectColumns = (withRelations) =>
    withRelations && relationsSelect ? relationsSelect : defaultSelect;

  const model = {
    table,
    idColumn,
    softDelete,
    ownershipField,

    /**
     * Listado general con filtros simples
     */
    async findAll({
      withDeleted = false,
      withRelations = false,
      filters = {},
    } = {}) {
      let query = supabase.from(table).select(selectColumns(withRelations));

      if (softDelete && !withDeleted) {
        query = query.is("deleted_at", null);
      }

      for (const [field, value] of Object.entries(filters)) {
        if (value !== undefined && value !== null) {
          query = query.eq(field, value);
        }
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },

    /**
     * Buscar por ID
     */
    async findById(id, { withDeleted = false, withRelations = false } = {}) {
      let query = supabase
        .from(table)
        .select(selectColumns(withRelations))
        .eq(idColumn, id);

      if (softDelete && !withDeleted) {
        query = query.is("deleted_at", null);
      }

      const { data, error } = await query.single();
      if (error) throw error;
      return data;
    },

    /**
     * Crear registro (valida campos requeridos)
     */
    async create(payload, { currentUser } = {}) {
      validateRequired(payload, requiredOnCreate);

      if (softDelete && payload.deleted_at === undefined) {
        payload.deleted_at = null;
      }

      const { data, error } = await supabase
        .from(table)
        .insert(payload)
        .select(defaultSelect)
        .single();

      if (error) throw error;
      return data;
    },

    /**
     * Actualizar por ID (permite validaciones adicionales externas)
     */
    async update(id, payload, { currentUser } = {}) {
      validateRequired(payload, requiredOnUpdate);

      if (softDelete && payload.deleted_at === undefined) {
        // Nunca permitimos setear deleted_at manualmente desde aquí
        delete payload.deleted_at;
      }

      const { data, error } = await supabase
        .from(table)
        .update(payload)
        .eq(idColumn, id)
        .select(defaultSelect)
        .single();

      if (error) throw error;
      return data;
    },

    /**
     * Soft delete: marca deleted_at
     */
    async delete(id, { currentUser } = {}) {
      if (!softDelete) {
        // Fallback a hard delete si se desactiva softDelete para esta tabla
        const { error } = await supabase.from(table).delete().eq(idColumn, id);

        if (error) throw error;
        return true;
      }

      const { error } = await supabase
        .from(table)
        .update({ deleted_at: new Date().toISOString() })
        .eq(idColumn, id);

      if (error) throw error;
      return true;
    },

    /**
     * Búsqueda paginada básica
     */
    async findPage({
      page = 1,
      pageSize = 20,
      withRelations = false,
      filters = {},
    } = {}) {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      let query = supabase
        .from(table)
        .select(selectColumns(withRelations), { count: "exact" })
        .range(from, to);

      if (softDelete) {
        query = query.is("deleted_at", null);
      }

      for (const [field, value] of Object.entries(filters)) {
        if (value !== undefined && value !== null) {
          query = query.eq(field, value);
        }
      }

      const { data, error, count } = await query;
      if (error) throw error;

      return {
        data,
        page,
        pageSize,
        total: count ?? 0,
        totalPages: count ? Math.ceil(count / pageSize) : 0,
      };
    },
  };

  // --- Helpers de ownership básicos (por id_usuario directamente en la tabla) ---
  if (ownershipField) {
    model.isOwner = (record, idUsuario) => {
      if (!record) return false;
      return record[ownershipField] === idUsuario;
    };

    model.assertOwnership = (record, idUsuario) => {
      if (!record) {
        const err = new Error("Recurso no encontrado");
        err.status = 404;
        throw err;
      }
      if (!model.isOwner(record, idUsuario)) {
        const err = new Error("No eres dueño de este recurso");
        err.status = 403;
        throw err;
      }
    };

    model.findByIdOwned = async (id, idUsuario, options = {}) => {
      const record = await model.findById(id, options);
      model.assertOwnership(record, idUsuario);
      return record;
    };

    model.findAllByOwner = async (idUsuario, options = {}) => {
      const {
        withDeleted = false,
        withRelations = false,
        filters = {},
      } = options;

      let query = supabase
        .from(table)
        .select(selectColumns(withRelations))
        .eq(ownershipField, idUsuario);

      if (softDelete && !withDeleted) {
        query = query.is("deleted_at", null);
      }

      for (const [field, value] of Object.entries(filters)) {
        if (value !== undefined && value !== null) {
          query = query.eq(field, value);
        }
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    };
  }

  return model;
};
