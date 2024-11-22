import { validationResult } from "express-validator";
import { Response, NextFunction } from "express";

import { AuthRequest } from "../types";

export const validate = (validations: any[]) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res
        .status(400)
        .json({ message: "Please enter valid data.", error: errors.array() });
      return;
    }
    next();
  };
};
