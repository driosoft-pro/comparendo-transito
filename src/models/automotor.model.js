import { supabase } from "../config/supabase.js";
import { createBaseModel } from "./baseModel.js";

const TABLE = "automotor";
const ID_COLUMN = "id_automotor";

const baseModel = createBaseModel({
  table: TABLE,
  idColumn: ID_COLUMN,
  requiredOnCreate: [
    "placa",
    "tipo_vehiculo",
    "marca",
    "linea_modelo",
    "cilindraje",
    "modelo_ano",
    "color",
    "clase_servicio",
    "id_municipio",
  ],
  requiredOnUpdate: [
    "tipo_vehiculo",
    "marca",
    "linea_modelo",
    "cilindraje",
    "modelo_ano",
    "color",
    "clase_servicio",
    "id_municipio",
  ],
  softDelete: true,
  defaultSelect: "*",
  relationsSelect:
    "*, municipio(*), propietario_automotor(*), propiedad_automotor(*), comparendo(*)",
});

export const AutomotorModel = {
  ...baseModel,

  async findByPlaca(
    placa,
    { withDeleted = false, withRelations = false } = {},
  ) {
    let query = supabase
      .from(TABLE)
      .select(
        withRelations
          ? "*, municipio(*), propietario_automotor(*), propiedad_automotor(*), comparendo(*)"
          : "*",
      )
      .eq("placa", placa);

    if (!withDeleted) {
      query = query.is("deleted_at", null);
    }

    const { data, error } = await query.single();
    if (error) throw error;
    return data;
  },
};

export default AutomotorModel;
