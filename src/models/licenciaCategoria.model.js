import { createBaseModel } from "./baseModel.js";

const TABLE = "licencia_categoria";

export const LicenciaCategoriaModel = createBaseModel({
  table: TABLE,
  idColumn: "id_licencia_conduccion", // PK compuesta, el modelo usará este campo como clave base
  requiredOnCreate: ["id_licencia_conduccion", "id_categoria_licencia"],
  requiredOnUpdate: [],
  softDelete: true,
  defaultSelect: "*",
  relationsSelect: "*, licencia_conduccion(*), categoria_licencia(*)",
});

export default LicenciaCategoriaModel;
