import express from "express";

import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validation.middleware";
import { validateMongoId } from "../middlewares/validate-mongo-id.middleware";

import {
  createBoilerPlate,
  deleteBoilerPlate,
  getBoilerPlateById,
  getBoilerPlates,
  updateBoilerPlate,
} from "../controllers/problems-boiler-plate.controller";
import {
  createBoilerPlateRules,
  updateBoilerPlateRules,
} from "../validation-rules/problem-boiler-plates";

const router = express.Router();

router.use(authMiddleware);

router.post("/", validate(createBoilerPlateRules), createBoilerPlate);
router.get("/", getBoilerPlates);
router.get("/:boilerPlateId", validateMongoId, getBoilerPlateById);
router.patch(
  "/:boilerPlateId",
  validateMongoId,
  validate(updateBoilerPlateRules),
  updateBoilerPlate
);
router.delete("/:boilerPlateId", validateMongoId, deleteBoilerPlate);

export default router;
