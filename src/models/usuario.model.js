import { supabase } from "../config/supabase.js";
import { createBaseModel } from "./baseModel.js";
import { validateRequired, validateStringLength } from "../utils/validators.js";

const TABLE = "usuarios";
const ID_COLUMN = "id_usuario";
const DEFAULT_SELECT =
  "id_usuario, username, rol, estado, contrasena, fecha_creacion, deleted_at";

const baseModel = createBaseModel({
  table: TABLE,
  idColumn: ID_COLUMN,
  requiredOnCreate: ["username", "contrasena", "rol"],
  requiredOnUpdate: [],
  softDelete: true,
  defaultSelect: DEFAULT_SELECT,
  relationsSelect:
    "id_usuario, username, rol, estado, fecha_creacion, deleted_at",
  ownershipField: "id_usuario",
});

export const UsuarioModel = {
  ...baseModel,

  /**
   * Validación adicional para crear/actualizar usuario
   */
  validatePayload(payload, { isCreate = true } = {}) {
    if (isCreate) {
      validateRequired(payload, ["username", "contrasena", "rol"]);
    } else {
      // Solo validamos si vienen username y/o rol
      const campos = {};
      if ("username" in payload) campos.username = payload.username;
      if ("rol" in payload) campos.rol = payload.rol;

      if (Object.keys(campos).length > 0) {
        validateRequired(campos, ["username", "rol"]); // aquí puedes decidir si quieres exigir los dos o permitir parciales
      }
    }

    if (payload.username !== undefined) {
      validateStringLength(payload.username, { min: 3, max: 50 }, "username");
    }
  },

  async create(usuario, options = {}) {
    this.validatePayload(usuario, { isCreate: true });
    return baseModel.create(usuario, options);
  },

  async update(id_usuario, campos, options = {}) {
    // Validamos SOLO si se tocan username/rol
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
