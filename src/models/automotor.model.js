import { supabase } from '../config/supabase.js';

const TABLE = 'automotor';

export const AutomotorModel = {
  async findAll({ limit = 50, offset = 0 } = {}) {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data;
  },

  async findByPlaca(placa) {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .eq('placa', placa)
      .single();

    if (error) throw error;
    return data;
  },

  async create(automotor) {
    const { data, error } = await supabase
      .from(TABLE)
      .insert(automotor)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(placa, campos) {
    const { data, error } = await supabase
      .from(TABLE)
      .update(campos)
      .eq('placa', placa)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(placa) {
    const { error } = await supabase
      .from(TABLE)
      .delete()
      .eq('placa', placa);

    if (error) throw error;
    return true;
  },
};
