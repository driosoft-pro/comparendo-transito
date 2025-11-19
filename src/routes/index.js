import { Router } from "express";

// SQL
import authRoutes from "./auth.routes.js";
import usuariosRoutes from "./usuarios.routes.js";
import comparendosRoutes from "./comparendos.routes.js";
import personasRoutes from "./personas.routes.js";
import automotoresRoutes from "./automotores.routes.js";
import municipiosRoutes from "./municipios.routes.js";
import policiasRoutes from "./policias.routes.js";
import licenciasRoutes from "./licencias.routes.js";
import infraccionesRoutes from "./infracciones.routes.js";
import secretariasRoutes from "./secretarias.routes.js";
import propiedadesRoutes from "./propiedades.routes.js";
import cargosPolicialesRoutes from "./cargosPoliciales.routes.js";
import categoriasLicenciaRoutes from "./categoriasLicencia.routes.js";
import licenciaCategoriaRoutes from "./licenciaCategoria.routes.js";

// NoSQL
import quejasRoutes from "./quejas.routes.js";

// Rou
const router = Router();

// Ruta pública de prueba
router.get("/ping", (req, res) => {
  res.json({ ok: true, message: "pong desde /api/ping" });
});

// Rutas públicas
router.use("/auth", authRoutes);

// Rutas protegidas SQL
router.use("/usuarios", usuariosRoutes);
router.use("/comparendos", comparendosRoutes);
router.use("/perfiles", personasRoutes);
router.use("/vehiculos", automotoresRoutes);
router.use("/municipios", municipiosRoutes);
router.use("/policias", policiasRoutes);
router.use("/licencias", licenciasRoutes);
router.use("/infracciones", infraccionesRoutes);
router.use("/secretarias", secretariasRoutes);
router.use("/propiedades", propiedadesRoutes);
router.use("/cargos-policiales", cargosPolicialesRoutes);
router.use("/categorias-licencia", categoriasLicenciaRoutes);
router.use("/licencia-categoria", licenciaCategoriaRoutes);

// Rutas protegidas NoSQL
router.use("/quejas", quejasRoutes);

export default router;
