import mongoose from "mongoose";
import { IProblem } from "../types";

const problemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: [{ type: String, required: true, trim: true }],
    status: { type: String, enum: ["pending", "solved"], default: "pending" },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },
    testCases: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProblemTest",
      },
    ],
    boilerPlateCode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProblemBoilerPlate",
    },
    submissions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "ProblemSubmission" },
    ],
    contestId: { type: mongoose.Schema.Types.ObjectId, ref: "Contest" },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Problem = mongoose.model<IProblem>("Problem", problemSchema);
