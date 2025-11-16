import { createBaseModel } from "./baseModel.js";

const TABLE = "comparendo_infraccion";

export const ComparendoInfraccionModel = createBaseModel({
  table: TABLE,
  idColumn: "id_comparendo", // PK compuesta, usamos id_comparendo como base
  requiredOnCreate: ["id_comparendo", "id_infraccion", "valor_calculado"],
  requiredOnUpdate: ["valor_calculado", "observaciones"],
  softDelete: true,
  defaultSelect: "*",
  relationsSelect: "*, comparendo(*), infraccion(*)",
});

export default ComparendoInfraccionModel;
