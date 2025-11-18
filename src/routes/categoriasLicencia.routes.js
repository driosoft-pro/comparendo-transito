import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  getCategoriasLicencia,
  getCategoriaLicenciaById,
  createCategoriaLicencia,
  updateCategoriaLicencia,
  deleteCategoriaLicencia,
} from "../controllers/categoriaLicencia.controller.js";

const router = Router();

// Todas protegidas con JWT
router.use(authMiddleware);

router.get("/", getCategoriasLicencia);
router.get("/:id", getCategoriaLicenciaById);
router.post("/", createCategoriaLicencia);
router.put("/:id", updateCategoriaLicencia);
router.delete("/:id", deleteCategoriaLicencia);

export default router;
