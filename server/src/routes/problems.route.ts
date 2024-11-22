import express from "express";

import { authMiddleware } from "../middlewares/auth.middleware";
import { validateMongoId } from "../middlewares/validate-mongo-id.middleware";

import { validate } from "../middlewares/validation.middleware";

import {
  createProblemRules,
  updateProblemRules,
} from "../validation-rules/problems";

import {
  createProblem,
  deleteProblem,
  getProblemById,
  getProblems,
  updateProblem,
} from "../controllers/problems.controller";

const router = express.Router();

router.use(authMiddleware);

router.post("/", validate(createProblemRules), createProblem);
router.get("/", getProblems);
router.get("/:problemId", validateMongoId, getProblemById);
router.patch(
  "/:problemId",
  validateMongoId,
  validate(updateProblemRules),
  updateProblem
);
router.delete("/:problemId", validateMongoId, deleteProblem);

export default router;
