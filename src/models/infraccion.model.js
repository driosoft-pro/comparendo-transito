import { supabase } from "../config/supabase.js";
import { createBaseModel } from "./baseModel.js";
import { validateEnum } from "../utils/validators.js";

const TABLE = "infraccion";
const ID_COLUMN = "id_infraccion";

const baseModel = createBaseModel({
  table: TABLE,
  idColumn: ID_COLUMN,
  requiredOnCreate: [
    "codigo_infraccion",
    "descripcion",
    "tipo_infraccion",
    "valor_base",
  ],
  requiredOnUpdate: ["descripcion", "tipo_infraccion", "valor_base"],
  requiredOnDelete: [],
  softDelete: true,
  defaultSelect: "*",
  relationsSelect: "*, comparendo_infraccion(id_comparendo, valor_calculado)",
});

const TIPOS = ["Leve", "Grave", "Muy Grave"];

export const InfraccionModel = {
  ...baseModel,

  validatePayload(payload, { isCreate = true } = {}) {
    validateEnum(payload.tipo_infraccion, TIPOS, "tipo_infraccion");
  },

  async create(data, options = {}) {
    this.validatePayload(data, { isCreate: true });
    return baseModel.create(data, options);
  },

  async update(id, data, options = {}) {
    this.validatePayload(data, { isCreate: false });
    return baseModel.update(id, data, options);
  },

  async findByCodigo(codigo_infraccion) {
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .eq("codigo_infraccion", codigo_infraccion)
      .is("deleted_at", null)
      .single();

    if (error) throw error;
    return data;
  },
};

export default InfraccionModel;
