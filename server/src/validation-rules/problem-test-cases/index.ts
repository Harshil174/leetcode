import { body } from "express-validator";

export const createTestCaseRules = [
  body("input")
    .notEmpty()
    .withMessage("Input is Required.")
    .isObject()
    .withMessage("Test cases must be an object."),
  body("output").trim().notEmpty().withMessage("Output is Required."),
  body("explanation").trim().optional(),
  body("visible").isBoolean().optional(),
  body("problemId").trim().notEmpty().withMessage("Problem ID is Required."),
];

export const updateTestCaseRules = [
  body("input")
    .optional()
    .isObject()
    .withMessage("Test cases must be an object."),
  body("explanation").trim().optional(),
  body("visible").isBoolean().optional(),
];
