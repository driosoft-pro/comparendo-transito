import { supabase } from '../config/supabase.js';

const TABLE = 'usuarios';

export const UsuarioModel = {

  async findAll() {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*');

    if (error) throw error;
    return data;
  },

  async findById(id_usuario) {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .eq('id_usuario', id_usuario)
      .single();

    if (error) throw error;
    return data;
  },

  async findByUsername(username) {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .eq('username', username)
      .single();

    if (error) throw error;
    return data;
  },

  async create(usuario) {
    const { data, error } = await supabase
      .from(TABLE)
      .insert(usuario)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id_usuario, campos) {
    const { data, error } = await supabase
      .from(TABLE)
      .update(campos)
      .eq('id_usuario', id_usuario)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id_usuario) {
    const { error } = await supabase
      .from(TABLE)
      .delete()
      .eq('id_usuario', id_usuario);

    if (error) throw error;
    return true;
  },
};
