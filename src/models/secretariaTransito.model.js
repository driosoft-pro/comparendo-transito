import { createBaseModel } from "./baseModel.js";

const TABLE = "secretaria_transito";
const ID_COLUMN = "id_secretaria";

export const SecretariaTransitoModel = createBaseModel({
  table: TABLE,
  idColumn: ID_COLUMN,
  requiredOnCreate: ["nombre_secretaria", "direccion", "telefono"],
  requiredOnUpdate: ["nombre_secretaria", "direccion", "telefono"],
  requiredOnDelete: [],
  softDelete: true,
  defaultSelect: "*",
  relationsSelect: "*, municipio(*), policia_transito(*)",
});

export default SecretariaTransitoModel;
