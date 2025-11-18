import { createBaseModel } from "./baseModel.js";

const TABLE = "secretaria_transito";
const ID_COLUMN = "id_secretaria";

export const SecretariaTransitoModel = createBaseModel({
  table: TABLE,
  idColumn: ID_COLUMN,
  requiredOnCreate: ["nombre_secretaria", "direccion", "telefono", "id_municipio"],
  requiredOnUpdate: ["nombre_secretaria", "direccion", "telefono", "id_municipio"],
  requiredOnDelete: [],
  softDelete: true,
  defaultSelect: "*",
  relationsSelect: "*, municipio(*), policia_transito(*)",
});

export default SecretariaTransitoModel;
