import mongoose from "mongoose";
import { IContest } from "../types";

const contestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    startDate: { type: Date, default: Date.now },
    problems: [{ type: mongoose.Schema.Types.ObjectId, ref: "Problem" }],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Contest = mongoose.model<IContest>("Contest", contestSchema);
