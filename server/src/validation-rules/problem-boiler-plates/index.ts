import { body } from "express-validator";

export const createBoilerPlateRules = [
  body("language").notEmpty().withMessage("Language is Required."),
  body("code").trim().notEmpty().withMessage("Code is Required."),
  body("problemId").trim().notEmpty().withMessage("Problem ID is Required."),
];

export const updateBoilerPlateRules = [];
