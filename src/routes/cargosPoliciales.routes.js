import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  getCargosPoliciales,
  getCargoPolicialById,
  createCargoPolicial,
  updateCargoPolicial,
  deleteCargoPolicial,
} from "../controllers/cargoPolicial.controller.js";

const router = Router();

// Todas protegidas con JWT
router.use(authMiddleware);

router.get("/", getCargosPoliciales);
router.get("/:id", getCargoPolicialById);
router.post("/", createCargoPolicial);
router.put("/:id", updateCargoPolicial);
router.delete("/:id", deleteCargoPolicial);

export default router;
