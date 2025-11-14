import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-no-usar-en-produccion";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "2h";

/**
 * Firma un token JWT con el payload dado.
 * @param {Object} payload - Datos a incluir en el token.
 * @param {Object} options - Opciones adicionales para jwt.sign.
 */
export const signToken = (payload, options = {}) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
    ...options,
  });
};

/**
 * Verifica un token JWT y devuelve el payload si es válido.
 * Lanza error si el token es inválido o expiró.
 */
export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

/**
 * Decodifica un token SIN verificar firma (útil solo para debug).
 */
export const decodeToken = (token) => {
  return jwt.decode(token);
};
