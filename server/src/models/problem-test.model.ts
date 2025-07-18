import mongoose from "mongoose";
import { IProblemTest } from "../types";

const problemTestSchema = new mongoose.Schema(
  {
    input: { type: mongoose.Schema.Types.Mixed, required: true },
    output: { type: mongoose.Schema.Types.Mixed, required: true, trim: true },
    explanation: { type: String, default: "", trim: true },
    visible: { type: Boolean, default: false },
    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },
  },
  { timestamps: true }
);

export const ProblemTest = mongoose.model<IProblemTest>(
  "ProblemTest",
  problemTestSchema
);