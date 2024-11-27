import { body } from "express-validator";

export const createContestRules = [
  body("name").trim().notEmpty().withMessage("Name is Required."),
  body("startTime").trim().notEmpty().withMessage("Start Time is Required."),
  body("endTime").trim().notEmpty().withMessage("End Time is Required."),
  body("startDate")
    .trim()
    .notEmpty()
    .withMessage("End Time is Required.")
    .custom((value) => {
      if (!Date.parse(value)) {
        throw new Error("Provide a valid date.");
      }
      return true;
    }),
];

export const updateContestRules = [
  body("startDate")
    .trim()
    .optional()
    .custom((value) => {
      if (!Date.parse(value)) {
        throw new Error("Provide a valid date.");
      }
      return true;
    }),
];
