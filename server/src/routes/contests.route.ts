import express from "express";

import { authMiddleware } from "../middlewares/auth.middleware";
import { validateMongoId } from "../middlewares/validate-mongo-id.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
  createContestRules,
  updateContestRules,
} from "../validation-rules/contest";

import {
  createContest,
  deleteContest,
  getContestById,
  getContests,
  updateContest,
} from "../controllers/contest.controller.ts";

const router = express.Router();

router.use(authMiddleware);

router.post("/", validate(createContestRules), createContest);
router.get("/", getContests);
router.get("/:contestId", validateMongoId, getContestById);
router.patch(
  "/:contestId",
  validateMongoId,
  validate(updateContestRules),
  updateContest
);
router.delete("/:contestId", validateMongoId, deleteContest);

export default router;
