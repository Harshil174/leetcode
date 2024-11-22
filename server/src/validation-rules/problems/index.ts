import { body } from "express-validator";
// import MarkdownIt from "markdown-it";

// const mdParser = new MarkdownIt();

export const createProblemRules = [
  body("title").trim().notEmpty().withMessage("Title is Required."),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is Required.")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters long."),
  // .matches(/#{1,6} .+/)
  // .withMessage("Description must include at least one header.")
  // .custom((value) => {
  //   if (typeof value !== "string") {
  //     throw new Error("Description must be a string.");
  //   }

  //   if (/<script>/i.test(value)) {
  //     throw new Error("Script tags are not allowed in Markdown.");
  //   }

  //   const html = mdParser.render(value);
  //   if (!html) {
  //     throw new Error("Invalid Markdown content.");
  //   }

  //   return true;
  // })
  // .withMessage("Invalid Markdown content."),
  body("status")
    .trim()
    .optional()
    .isIn(["pending", "solved"])
    .withMessage("Invalid problem status"),
  body("difficulty")
    .trim()
    .notEmpty()
    .withMessage("Difficulty is Required.")
    .isIn(["easy", "medium", "hard"])
    .withMessage("Invalid problem difficulty"),
];
