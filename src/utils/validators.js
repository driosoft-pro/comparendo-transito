/**
 * Valida campos requeridos en un payload
 * @param {Object} payload
 * @param {string[]} fields
 */
export const validateRequired = (payload = {}, fields = []) => {
  const missing = fields.filter((field) => {
    const value = payload[field];
    return value === undefined || value === null || value === "";
  });

  if (missing.length) {
    const error = new Error(
      `Campos requeridos faltantes: ${missing.join(", ")}`,
    );
    error.status = 400;
    error.code = "VALIDATION_ERROR";
    throw error;
  }
};

/**
 * Valida que un campo esté dentro de un conjunto de valores permitidos
 */
export const validateEnum = (value, allowed = [], fieldName = "valor") => {
  if (value === undefined || value === null) return;
  if (!allowed.includes(value)) {
    const error = new Error(
      `Valor inválido para ${fieldName}. Permitidos: ${allowed.join(", ")}`,
    );
    error.status = 400;
    error.code = "VALIDATION_ERROR";
    throw error;
  }
};

/**
 * Valida longitud mínima y/o máxima de un string
 */
export const validateStringLength = (
  value,
  { min = 0, max = Infinity } = {},
  fieldName = "campo",
) => {
  if (value === undefined || value === null) return;
  if (typeof value !== "string") {
    const error = new Error(`El campo ${fieldName} debe ser un string`);
    error.status = 400;
    error.code = "VALIDATION_ERROR";
    throw error;
  }

  if (value.length < min || value.length > max) {
    const error = new Error(
      `Longitud inválida para ${fieldName}. Debe estar entre ${min} y ${max} caracteres`,
    );
    error.status = 400;
    error.code = "VALIDATION_ERROR";
    throw error;
  }
};
