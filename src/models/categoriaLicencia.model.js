import { createBaseModel } from "./baseModel.js";

const TABLE = "categoria_licencia";
const ID_COLUMN = "id_categoria";

export const CategoriaLicenciaModel = createBaseModel({
  table: TABLE,
  idColumn: ID_COLUMN,
  requiredOnCreate: ["codigo", "descripcion"],
  requiredOnUpdate: ["codigo", "descripcion"],
  softDelete: true,
  defaultSelect: "*",
  relationsSelect: "*, licencia_categoria(id_licencia_conduccion)",
});

export default CategoriaLicenciaModel;
