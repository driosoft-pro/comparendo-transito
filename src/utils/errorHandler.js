import { logger } from "./logger.js";

export class ApiError extends Error {
  constructor(statusCode, message, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

// 404 cuando ninguna ruta hace match
export const notFoundHandler = (req, res, next) => {
  next(new ApiError(404, `Ruta no encontrada: ${req.method} ${req.originalUrl}`));
};

// Middleware central de manejo de errores
export const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;

  // Log completo
  logger.error(err.stack || err.message);

  const response = {
    ok: false,
    message: err.message || "Error interno del servidor",
  };

  if (process.env.NODE_ENV !== "production") {
    response.stack = err.stack;
    response.details = err.details ?? null;
  }

  res.status(status).json(response);
};

// Helper para envolver funciones async sin try/catch
export const catchAsync = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
