import mongoose from "mongoose";
import { IProblemSubmission } from "../types";

const problemSubmissionSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: [
        "wrong-answer",
        "accepted",
        "time-limit-exceeded",
        "runtime-error",
      ],
      required: true,
    },
    language: { type: String, required: true },
    runTime: { type: Number, required: true, default: 0 },
    memory: { type: mongoose.Schema.Types.Decimal128, required: true },
    problemId: { type: mongoose.Schema.Types.ObjectId, ref: "Problem" },
  },
  { timestamps: true }
);

export const ProblemSubmission = mongoose.model<IProblemSubmission>(
  "ProblemSubmission",
  problemSubmissionSchema
);
