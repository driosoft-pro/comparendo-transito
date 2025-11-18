import { supabase } from "../config/supabase.js";
import { createBaseModel } from "./baseModel.js";

const TABLE = "personas";
const ID_COLUMN = "id_persona";

const baseModel = createBaseModel({
  table: TABLE,
  idColumn: ID_COLUMN,
  requiredOnCreate: [
    "tipo_doc",
    "num_doc",
    "primer_nombre",
    "primer_apellido",
    "fecha_nacimiento",
    "genero",
    "direccion",
    "telefono",
    "email",
    "id_municipio",
  ],
  requiredOnUpdate: [
    "primer_nombre",
    "primer_apellido",
    "fecha_nacimiento",
    "genero",
    "direccion",
    "telefono",
    "email",
    "id_municipio",
  ],
  requiredOnDelete: [],
  softDelete: true,
  defaultSelect: "*",
  relationsSelect:
    "*, municipio(*), licencia_conduccion(*), usuario:usuarios(id_usuario, username, rol), propietario_automotor(*), propiedad_automotor(*), comparendo(*), queja(*)",
  ownershipField: "id_usuario", // relación directa con usuarios
});

export const PersonaModel = {
  ...baseModel,

  async findByDocumento(tipo_doc, num_doc, { withRelations = false } = {}) {
    let query = supabase
      .from(TABLE)
      .select(
        withRelations
          ? "*, municipio(*), licencia_conduccion(*), usuario:usuarios(id_usuario, username, rol)"
          : "*",
      )
      .eq("tipo_doc", tipo_doc)
      .eq("num_doc", num_doc)
      .is("deleted_at", null);

    const { data, error } = await query.single();
    if (error) throw error;
    return data;
  },

  async findByUsuario(id_usuario, { withRelations = false } = {}) {
    let query = supabase
      .from(TABLE)
      .select(
        withRelations
          ? "*, municipio(*), licencia_conduccion(*), usuario:usuarios(id_usuario, username, rol)"
          : "*",
      )
      .eq("id_usuario", id_usuario)
      .is("deleted_at", null);

    const { data, error } = await query.single();
    if (error) throw error;
    return data;
  },
};

export default PersonaModel;
