import { supabase } from "../config/supabase.js";
import { createBaseModel } from "./baseModel.js";

const TABLE = "queja";
const ID_COLUMN = "id_queja";

const baseModel = createBaseModel({
  table: TABLE,
  idColumn: ID_COLUMN,
  requiredOnCreate: [
    "texto_queja",
    "estado",
    "medio_radicacion",
    "id_comparendo",
    "id_persona",
  ],
  requiredOnUpdate: ["texto_queja", "estado", "respuesta", "fecha_respuesta"],
  requiredOnDelete: [],
  softDelete: true,
  defaultSelect: "*",
  relationsSelect: "*, comparendo(*), persona:personas(*)",
});

export const QuejaModel = {
  ...baseModel,

  async listByPersona(id_persona, { withRelations = false } = {}) {
    let query = supabase
      .from(TABLE)
      .select(withRelations ? "*, comparendo(*), persona:personas(*)" : "*")
      .eq("id_persona", id_persona)
      .is("deleted_at", null);

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async listByComparendo(id_comparendo, { withRelations = false } = {}) {
    let query = supabase
      .from(TABLE)
      .select(withRelations ? "*, comparendo(*), persona:personas(*)" : "*")
      .eq("id_comparendo", id_comparendo)
      .is("deleted_at", null);

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },
};

export default QuejaModel;
