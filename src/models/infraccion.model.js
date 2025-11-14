import { supabase } from '../config/supabase.js';

const TABLE = 'infraccion';

export const InfraccionModel = {
  async findAll() {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .order('codigo_infraccion', { ascending: true });

    if (error) throw error;
    return data;
  },

  async findById(id_infraccion) {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .eq('id_infraccion', id_infraccion)
      .single();

    if (error) throw error;
    return data;
  },

  async findByCodigo(codigo_infraccion) {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .eq('codigo_infraccion', codigo_infraccion)
      .single();

    if (error) throw error;
    return data;
  },

  async create(infraccion) {
    const { data, error } = await supabase
      .from(TABLE)
      .insert(infraccion)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id_infraccion, campos) {
    const { data, error } = await supabase
      .from(TABLE)
      .update(campos)
      .eq('id_infraccion', id_infraccion)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id_infraccion) {
    const { error } = await supabase
      .from(TABLE)
      .delete()
      .eq('id_infraccion', id_infraccion);

    if (error) throw error;
    return true;
  },
};
