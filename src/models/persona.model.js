import { supabase } from '../config/supabase.js';

const TABLE = 'persona';

export const PersonaModel = {
  async findAll({ limit = 50, offset = 0 } = {}) {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data;
  },

  async findById(id_persona) {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .eq('id_persona', id_persona)
      .single();

    if (error) throw error;
    return data;
  },

  async create(persona) {
    const { data, error } = await supabase
      .from(TABLE)
      .insert(persona)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id_persona, campos) {
    const { data, error } = await supabase
      .from(TABLE)
      .update(campos)
      .eq('id_persona', id_persona)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id_persona) {
    const { error } = await supabase
      .from(TABLE)
      .delete()
      .eq('id_persona', id_persona);

    if (error) throw error;
    return true;
  },
};
