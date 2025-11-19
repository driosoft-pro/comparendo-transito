import { Queja } from "../models/queja.model.js";
import { supabase } from "../config/supabase.js";

/**
 * Obtener comparendo desde Supabase
 */
const getComparendo = async (id_comparendo) => {
  const { data, error } = await supabase
    .from("comparendo")
    .select("*")
    .eq("id", id_comparendo)
    .single();
  if (error) throw error;
  return data;
};

/**
 * Obtener persona desde Supabase
 */
const getPersona = async (id_persona) => {
  const { data, error } = await supabase
    .from("personas")
    .select("*")
    .eq("id", id_persona)
    .single();
  if (error) throw error;
  return data;
};

/**
 * Obtener datos relacionados de Supabase
 */
const agregarRelaciones = async (queja) => {
  if (!queja) return null;

  const [comparendo, persona] = await Promise.all([
    getComparendo(queja.id_comparendo),
    getPersona(queja.id_persona),
  ]);

  return {
    ...queja,
    comparendo,
    persona,
  };
};

export const QuejaService = {
  /**
   * Listar quejas con filtros opcionales
   */
  async findAll({ withDeleted = false, filters = {} } = {}) {
    const query = { ...filters };
    if (!withDeleted) query.deleted_at = null;

    return await Queja.find(query).lean();
  },

  /**
   * Paginación
   */
  async findPage({ page = 1, pageSize = 10, filters = {} } = {}) {
    const skip = (page - 1) * pageSize;
    const query = { ...filters, deleted_at: null };

    const [data, total] = await Promise.all([
      Queja.find(query).skip(skip).limit(pageSize).lean(),
      Queja.countDocuments(query),
    ]);

    return {
      data,
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    };
  },

  /**
   * Obtener por ID
   */
  async findById(id, { withRelations = false } = {}) {
    const queja = await Queja.findById(id).lean();
    if (!queja || queja.deleted_at) return null;

    return withRelations ? await agregarRelaciones(queja) : queja;
  },

  /**
   * Crear queja
   */
  async create(payload) {
    payload.deleted_at = null;
    const doc = await Queja.create(payload);
    return doc.toObject();
  },

  /**
   * Actualizar queja
   */
  async update(id, payload) {
    if ("deleted_at" in payload) delete payload.deleted_at;
    const updated = await Queja.findByIdAndUpdate(id, payload, { new: true }).lean();
    return updated;
  },

  /**
   * Responder una queja
   */
  async responder(id, respuesta) {
    const payload = {
      respuesta,
      fecha_respuesta: new Date(),
    };

    return await Queja.findByIdAndUpdate(id, payload, { new: true }).lean();
  },

  /**
   * Soft delete
   */
  async delete(id) {
    await Queja.findByIdAndUpdate(id, { deleted_at: new Date() });
    return true;
  },
};
