import { createBaseModel } from "./baseModel.js";

const TABLE = "licencia_conduccion";
const ID_COLUMN = "id_licencia";

export const LicenciaConduccionModel = createBaseModel({
  table: TABLE,
  idColumn: ID_COLUMN,
  requiredOnCreate: [
    "numero_licencia",
    "fecha_expedicion",
    "fecha_vencimiento",
    "organismo_transito_expedidor",
    "estado",
  ],
  requiredOnUpdate: [
    "fecha_vencimiento",
    "organismo_transito_expedidor",
    "estado",
  ],
  requiredOnDelete: [],
  softDelete: true,
  defaultSelect: "*",
  relationsSelect: "*, licencia_categoria(*), personas(*), comparendo(*)",
});

export default LicenciaConduccionModel;
