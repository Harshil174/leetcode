import { NextFunction, Response } from "express";

import jwt from "jsonwebtoken";

import { User } from "../models/user.model";

import { AuthRequest } from "../types";

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Authorization Required" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as any;
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
