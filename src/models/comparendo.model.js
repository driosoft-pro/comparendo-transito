import { supabase } from '../config/supabase.js';

const TABLE_COMPARENDO = 'comparendo';
const TABLE_CI = 'comparendo_infraccion';

export const ComparendoModel = {
  async findAll({ limit = 50, offset = 0 } = {}) {
    const { data, error } = await supabase
      .from(TABLE_COMPARENDO)
      .select('*')
      .order('fecha_hora_registro', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data;
  },

  async findById(id_comparendo) {
    const { data, error } = await supabase
      .from(TABLE_COMPARENDO)
      .select('*')
      .eq('id_comparendo', id_comparendo)
      .single();

    if (error) throw error;
    return data;
  },

  async createComparendo(comparendo) {
    const { data, error } = await supabase
      .from(TABLE_COMPARENDO)
      .insert(comparendo)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateComparendo(id_comparendo, campos) {
    const { data, error } = await supabase
      .from(TABLE_COMPARENDO)
      .update(campos)
      .eq('id_comparendo', id_comparendo)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteComparendo(id_comparendo) {
    const { error } = await supabase
      .from(TABLE_COMPARENDO)
      .delete()
      .eq('id_comparendo', id_comparendo);

    if (error) throw error;
    return true;
  },

  // --- Infracciones asociadas ---

  async addInfraccionToComparendo(id_comparendo, id_infraccion, valor_calculado, observaciones = null) {
    const { data, error } = await supabase
      .from(TABLE_CI)
      .insert({
        id_comparendo,
        id_infraccion,
        valor_calculado,
        observaciones,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getInfraccionesByComparendo(id_comparendo) {
    const { data, error } = await supabase
      .from(TABLE_CI)
      .select('id_infraccion, valor_calculado, observaciones')
      .eq('id_comparendo', id_comparendo);

    if (error) throw error;
    return data;
  },

  async removeInfraccionFromComparendo(id_comparendo, id_infraccion) {
    const { error } = await supabase
      .from(TABLE_CI)
      .delete()
      .eq('id_comparendo', id_comparendo)
      .eq('id_infraccion', id_infraccion);

    if (error) throw error;
    return true;
  },
};
