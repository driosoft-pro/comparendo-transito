import { supabase } from "../config/supabase.js";
import { createBaseModel } from "./baseModel.js";
import { validateRequired, validateStringLength } from "../utils/validators.js";

const TABLE = "usuarios";
const ID_COLUMN = "id_usuario";
const DEFAULT_SELECT =
  "id_usuario, username, rol, estado, fecha_creacion, deleted_at";

const baseModel = createBaseModel({
  table: TABLE,
  idColumn: ID_COLUMN,
  requiredOnCreate: ["username", "contrasena", "rol"],
  requiredOnUpdate: ["username", "rol"],
  softDelete: true,
  defaultSelect: DEFAULT_SELECT,
  relationsSelect:
    "id_usuario, username, rol, estado, fecha_creacion, deleted_at",
  ownershipField: "id_usuario", // el propio usuario es dueño de su registro
});

export const UsuarioModel = {
  ...baseModel,

  /**
   * Validación adicional para crear/actualizar usuario
   */
  validatePayload(payload, { isCreate = true } = {}) {
    validateRequired(
      payload,
      isCreate ? ["username", "contrasena", "rol"] : ["username", "rol"],
    );
    validateStringLength(payload.username, { min: 3, max: 50 }, "username");
  },

  async create(usuario, options = {}) {
    this.validatePayload(usuario, { isCreate: true });
    // La contraseña ya debería venir hasheada desde el servicio
    return baseModel.create(usuario, options);
  },

  async update(id_usuario, campos, options = {}) {
    this.validatePayload(campos, { isCreate: false });
    return baseModel.update(id_usuario, campos, options);
  },

  async findByUsername(username, { withDeleted = false } = {}) {
    let query = supabase
      .from(TABLE)
      .select(DEFAULT_SELECT)
      .eq("username", username);

    if (!withDeleted) {
      query = query.is("deleted_at", null);
    }

    const { data, error } = await query.single();
    if (error) throw error;
    return data;
  },
};

export default UsuarioModel;
