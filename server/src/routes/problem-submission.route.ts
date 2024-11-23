import express from "express";

import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validation.middleware";
import { validateMongoId } from "../middlewares/validate-mongo-id.middleware";
import {
  createSubmissionRules,
  updateSubmissionRules,
} from "../validation-rules/problem-submission";
import {
  createSubmission,
  deleteSubmission,
  getSubmissionById,
  getSubmissions,
  updateSubmission,
} from "../controllers/problems-submission.controller";

const router = express.Router();

router.use(authMiddleware);

router.post("/", validate(createSubmissionRules), createSubmission);
router.get("/", getSubmissions);
router.get("/:submissionId", validateMongoId, getSubmissionById);
router.patch(
  "/:submissionId",
  validateMongoId,
  validate(updateSubmissionRules),
  updateSubmission
);
router.delete("/:submissionId", validateMongoId, deleteSubmission);

export default router;
