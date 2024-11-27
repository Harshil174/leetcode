import { Response, NextFunction } from "express";
import mongoose from "mongoose";
import { AuthRequest } from "../types";

export const validateMongoId = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const paramsToCheck = ["id", "problemId"];

  for (const param of paramsToCheck) {
    if (
      req.params[param] &&
      !mongoose.Types.ObjectId.isValid(req.params[param])
    ) {
      res.status(400).json({success: false, message: `Invalid ${param}` });
      return;
    }
  }
  next();
};
