import { createBaseModel } from "./baseModel.js";

const TABLE = "cargo_policial";
const ID_COLUMN = "id_cargo";

export const CargoPolicialModel = createBaseModel({
  table: TABLE,
  idColumn: ID_COLUMN,
  requiredOnCreate: ["nombre_cargo", "descripcion", "grado"],
  requiredOnUpdate: ["nombre_cargo", "descripcion", "grado"],
  softDelete: true,
  defaultSelect: "*",
  relationsSelect: "*", // relacionado con policia_transito, pero usualmente se consulta solo
});

export default CargoPolicialModel;
