import { body } from "express-validator";

export const createSubmissionRules = [
  body("status")
    .trim()
    .notEmpty()
    .withMessage("Submit status is Required.")
    .isIn(["wrong-answer", "accepted", "time-limit-exceeded", "runtime-error"])
    .withMessage("Invalid submit status"),
  body("language").trim().notEmpty().withMessage("Language is Required."),
  body("runTime")
    .notEmpty()
    .withMessage("runTime must not be empty")
    .isNumeric()
    .withMessage("runTime must be a number")
    .custom((value) => value > 0)
    .withMessage("runTime must be greater than 0"),
  body("memory")
    .isDecimal()
    .withMessage("Memory must be a valid decimal or float value")
    .isFloat()
    .withMessage("Memory must be a valid decimal or float value")
    .custom((value) => parseFloat(value) > 0)
    .withMessage("Memory must be greater than 0"),
];

export const updateSubmissionRules = [
  body("status")
    .trim()
    .notEmpty()
    .withMessage("Submit status is Required.")
    .isIn(["wrong-answer", "accepted", "time-limit-exceeded", "runtime-error"])
    .withMessage("Invalid submit status"),
  body("language").trim().notEmpty().withMessage("Language is Required."),
  body("runTime")
    .notEmpty()
    .withMessage("runTime must not be empty")
    .isNumeric()
    .withMessage("runTime must be a number")
    .custom((value) => value > 0)
    .withMessage("runTime must be greater than 0"),
  body("memory")
    .isDecimal()
    .withMessage("Memory must be a valid decimal or float value")
    .isFloat()
    .withMessage("Memory must be a valid decimal or float value")
    .custom((value) => parseFloat(value) > 0)
    .withMessage("Memory must be greater than 0"),
];
