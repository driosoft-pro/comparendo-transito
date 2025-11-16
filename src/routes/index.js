import { Router } from "express";

import authRoutes from "./auth.routes.js";
import usuariosRoutes from "./usuarios.routes.js";
import comparendosRoutes from "./comparendos.routes.js";
import personasRoutes from "./personas.routes.js";
import automotoresRoutes from "./automotores.routes.js";
import quejasRoutes from "./quejas.routes.js";
import municipiosRoutes from "./municipios.routes.js";
import policiasRoutes from "./policias.routes.js";
import licenciasRoutes from "./licencias.routes.js";
import infraccionesRoutes from "./infracciones.routes.js";
import secretariasRoutes from "./secretarias.routes.js";
import propietariosRoutes from "./propietarios.routes.js";
import propiedadesRoutes from "./propiedades.routes.js";

const router = Router();

// Ruta pública de prueba
router.get("/ping", (req, res) => {
  res.json({ ok: true, message: "pong desde /api/ping" });
});

// Rutas públicas
router.use("/auth", authRoutes);

// Rutas protegidas (los propios routers aplican authMiddleware)
router.use("/usuarios", usuariosRoutes);
router.use("/comparendos", comparendosRoutes);
router.use("/perfiles", personasRoutes);
router.use("/vehiculos", automotoresRoutes);
router.use("/quejas", quejasRoutes);
router.use("/municipios", municipiosRoutes);
router.use("/policias", policiasRoutes);
router.use("/licencias", licenciasRoutes);
router.use("/infracciones", infraccionesRoutes);
router.use("/secretarias", secretariasRoutes);
router.use("/propietarios", propietariosRoutes);
router.use("/propiedades", propiedadesRoutes);

export default router;
