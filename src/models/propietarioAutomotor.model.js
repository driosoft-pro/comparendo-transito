import { createBaseModel } from "./baseModel.js";

const TABLE = "propietario_automotor";
const ID_COLUMN = "id_propietario";

export const PropietarioAutomotorModel = createBaseModel({
  table: TABLE,
  idColumn: ID_COLUMN,
  requiredOnCreate: ["id_persona", "id_automotor"],
  requiredOnUpdate: ["id_persona", "id_automotor", "es_principal"],
  requiredOnDelete: [],
  softDelete: true,
  defaultSelect: "*",
  relationsSelect: "*, persona:personas(*), automotor(*)",
});

export default PropietarioAutomotorModel;
