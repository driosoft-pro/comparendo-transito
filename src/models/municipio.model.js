import { createBaseModel } from "./baseModel.js";

const TABLE = "municipio";
const ID_COLUMN = "id_municipio";

export const MunicipioModel = createBaseModel({
  table: TABLE,
  idColumn: ID_COLUMN,
  requiredOnCreate: [
    "nombre_municipio",
    "departamento",
    "codigo_dane",
    "direccion_oficina_principal",
  ],
  requiredOnUpdate: [
    "nombre_municipio",
    "departamento",
    "codigo_dane",
    "direccion_oficina_principal",
  ],
  requiredOnDelete: [],
  softDelete: true,
  defaultSelect: "*",
  relationsSelect:
    "*, secretaria_transito(*), automotor(*), personas(*), comparendo(*)",
});

export default MunicipioModel;
