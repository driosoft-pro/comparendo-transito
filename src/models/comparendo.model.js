import { supabase } from "../config/supabase.js";
import { createBaseModel } from "./baseModel.js";

const TABLE = "comparendo";
const ID_COLUMN = "id_comparendo";

const baseModel = createBaseModel({
  table: TABLE,
  idColumn: ID_COLUMN,
  requiredOnCreate: [
    "numero_comparendo",
    "direccion_infraccion",
    "estado",
    "id_municipio",
    "id_policia_transito",
    "id_automotor",
  ],
  requiredOnUpdate: [
    "direccion_infraccion",
    "coordenadas_gps",
    "observaciones",
    "estado",
  ],
  softDelete: true,
  defaultSelect: "*",
  relationsSelect:
    "*, municipio(*), persona:personas(*), licencia_conduccion(*), policia:policia_transito(*), automotor(*), comparendo_infraccion(*), queja(*)",
});

export const ComparendoModel = {
  ...baseModel,

  async findByNumero(numero_comparendo, { withRelations = false } = {}) {
    let query = supabase
      .from(TABLE)
      .select(
        withRelations
          ? "*, municipio(*), persona:personas(*), licencia_conduccion(*), policia:policia_transito(*), automotor(*), comparendo_infraccion(*), queja(*)"
          : "*",
      )
      .eq("numero_comparendo", numero_comparendo)
      .is("deleted_at", null);

    const { data, error } = await query.single();
    if (error) throw error;
    return data;
  },

  async listByPersona(id_persona, { withRelations = false } = {}) {
    let query = supabase
      .from(TABLE)
      .select(
        withRelations
          ? "*, municipio(*), persona:personas(*), licencia_conduccion(*), policia:policia_transito(*), automotor(*)"
          : "*",
      )
      .eq("id_persona", id_persona)
      .is("deleted_at", null);

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async listByPolicia(id_policia_transito, { withRelations = false } = {}) {
    let query = supabase
      .from(TABLE)
      .select(
        withRelations
          ? "*, municipio(*), persona:personas(*), licencia_conduccion(*), policia:policia_transito(*), automotor(*)"
          : "*",
      )
      .eq("id_policia_transito", id_policia_transito)
      .is("deleted_at", null);

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async listByEstado(estado, { withRelations = false } = {}) {
    let query = supabase
      .from(TABLE)
      .select(
        withRelations
          ? "*, municipio(*), persona:personas(*), licencia_conduccion(*), policia:policia_transito(*), automotor(*)"
          : "*",
      )
      .eq("estado", estado)
      .is("deleted_at", null);

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },
};

export default ComparendoModel;
