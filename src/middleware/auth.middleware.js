import { verifyToken } from "../config/jwt.js";

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
      return res.status(401).json({
        ok: false,
        message: "Token no proporcionado o formato incorrecto",
      });
    }

    const payload = verifyToken(token);
    req.user = payload; // aquí guardas el payload en el request

    next();
  } catch (error) {
    console.error("Error en authMiddleware:", error.message);
    return res.status(401).json({
      ok: false,
      message: "Token inválido o expirado",
    });
  }
};
