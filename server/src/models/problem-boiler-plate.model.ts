import mongoose from "mongoose";
import { IProblemBoilerPlate } from "../types";

const problemBoilerPlateSchema = new mongoose.Schema(
  {
    language: { type: String, required: true },
    code: { type: String, default: "", trim: true },
    problemId: { type: mongoose.Schema.Types.ObjectId, ref: "Problem" },
  },
  { timestamps: true }
);

export const ProblemBoilerPlate = mongoose.model<IProblemBoilerPlate>(
  "ProblemBoilerPlate",
  problemBoilerPlateSchema
);
