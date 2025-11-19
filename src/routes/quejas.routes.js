import { Router } from "express";
import {
  getQuejas,
  getQuejaById,
  getQuejasByPersona,
  getQuejasByComparendo,
  createQueja,
  updateQueja,
  deleteQueja,
} from "../controllers/quejas.controller.js";
import {
  authMiddleware,
  isAdmin,
} from "../middlewares/auth.middleware.js";

const router = Router();

// 🔐 Todas requieren autenticación
router.use(authMiddleware);

// 📌 Listar todas — admin
router.get("/", isAdmin, getQuejas);

// ⚠️ IMPORTANTE: primero rutas específicas
router.get("/persona/:id_persona", isAdmin, getQuejasByPersona);
router.get("/comparendo/:id_comparendo", isAdmin, getQuejasByComparendo);

// 📌 Obtener por ID
router.get("/:id", isAdmin, getQuejaById);

// 📌 Crear queja — cualquier usuario autenticado
router.post("/", createQueja);

// 📌 Actualizar queja — admin
router.put("/:id", isAdmin, updateQueja);

// 📌 Eliminar queja (soft delete) — admin
router.delete("/:id", isAdmin, deleteQueja);

export default router;
