import { createBaseModel } from "./baseModel.js";

const TABLE = "policia_transito";
const ID_COLUMN = "id_policia";

export const PoliciaTransitoModel = createBaseModel({
  table: TABLE,
  idColumn: ID_COLUMN,
  requiredOnCreate: [
    "codigo_policia",
    "nombres",
    "apellidos",
    "genero",
    "fecha_nacimiento",
    "fecha_vinculacion",
    "salario",
    "id_secretaria_transito",
    "id_cargo_policial",
    "id_usuario",
  ],
  requiredOnUpdate: [
    "nombres",
    "apellidos",
    "genero",
    "fecha_nacimiento",
    "fecha_vinculacion",
    "salario",
    "id_secretaria_transito",
    "id_cargo_policial",
  ],
  softDelete: true,
  defaultSelect: "*",
  relationsSelect:
    "*, secretaria_transito(*), cargo_policial(*), supervisor:policia_transito!id_supervisor(*), usuario:usuarios(*)",
});

export default PoliciaTransitoModel;
