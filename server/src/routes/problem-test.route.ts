import express from "express";
import {
  createTestCase,
  deleteTestCase,
  getTestCaseById,
  getTestCases,
  updateTestCase,
} from "../controllers/problems-test.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validateMongoId } from "../middlewares/validate-mongo-id.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  createTestCaseRules,
  updateTestCaseRules,
} from "../validation-rules/problem-test-cases";

const router = express.Router();

router.use(authMiddleware);

router.post("/", validate(createTestCaseRules), createTestCase);
router.get("/", getTestCases);
router.get("/:testCaseId", validateMongoId, getTestCaseById);
router.patch(
  "/:testCaseId",
  validateMongoId,
  validate(updateTestCaseRules),
  updateTestCase
);
router.delete("/:testCaseId", validateMongoId, deleteTestCase);

export default router;
