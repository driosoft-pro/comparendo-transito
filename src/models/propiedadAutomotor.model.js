import { createBaseModel } from "./baseModel.js";

const TABLE = "propiedad_automotor";
const ID_COLUMN = "id_propiedad";

export const PropiedadAutomotorModel = createBaseModel({
  table: TABLE,
  idColumn: ID_COLUMN,
  requiredOnCreate: ["id_automotor", "id_persona", "fecha_inicio"],
  requiredOnUpdate: [
    "fecha_inicio",
    "fecha_fin",
    "es_propietario_principal",
    "responsable_impuestos",
  ],
  softDelete: true,
  defaultSelect: "*",
  relationsSelect: "*, automotor(*), persona:personas(*)",
});

export default PropiedadAutomotorModel;
