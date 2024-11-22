import { Response } from "express";

import { Problem } from "../models/problem.model";

import { ProblemTest } from "../models/problem-test.model";

import { AuthRequest, IProblemTest } from "../types";

export const createTestCase = async (req: AuthRequest, res: Response) => {
  try {
    const { input, output, explanation, visible, problemId } = req.body;

    const problem = await Problem.findById({
      _id: problemId,
      userId: req.user._id,
    });
    if (!problem) {
      res.status(404).json({ message: "Problem not found" });
      return;
    }

    const problemTest = new ProblemTest({
      input,
      output,
      explanation,
      visible,
      problemId,
      userId: req.user._id,
    });
    await problemTest.save();

    await Problem.findByIdAndUpdate(
      { _id: problemId, userId: req.user._id },
      { $push: { testCases: problemTest._id } },
      { new: true }
    );

    res.status(201).json({
      message: "Test case created successfully",
      problemTest,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      message: "An unexpected error occurs, Please try again later.",
      error: err.message,
    });
  }
};

export const getTestCases = async (req: AuthRequest, res: Response) => {
  try {
    const problemTests = await ProblemTest.find();
    if (!problemTests) {
      res.status(404).json({ message: "Problem test cases not found" });
      return;
    }

    res.status(200).json({
      message: "Test cases fetched successfully",
      testCases: problemTests,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      message: "An unexpected error occurs, Please try again later.",
      error: err.message,
    });
  }
};

export const getTestCaseById = async (req: AuthRequest, res: Response) => {
  try {
    const { testCaseId } = req.params;

    const problemTest = await ProblemTest.findById({
      _id: testCaseId,
      userId: req.user._id,
    });
    if (!problemTest) {
      res.status(404).json({ message: "Problem test cases not found" });
      return;
    }

    res.status(200).json({
      message: "Test case fetched successfully",
      testCase: problemTest,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      message: "An unexpected error occurs, Please try again later.",
      error: err.message,
    });
  }
};

export const updateTestCase = async (req: AuthRequest, res: Response) => {
  try {
    const { testCaseId } = req.params;
    const { input, output, explanation, visible, problemId } = req.body;

    const updateData: Partial<IProblemTest> = {};

    if (input) updateData.input = input;
    if (output) updateData.output = output;
    if (explanation) updateData.explanation = explanation;
    if (visible) updateData.visible = visible;
    if (problemId) updateData.problemId = problemId;

    const problemTest = await ProblemTest.findByIdAndUpdate(
      { _id: testCaseId, userId: req.user._id },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!problemTest) {
      res.status(404).json({ message: "Problem Test Case not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "Test case updated successfully", problemTest });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      message: "An unexpected error occurs, Please try again later.",
      error: err.message,
    });
  }
};

export const deleteTestCase = async (req: AuthRequest, res: Response) => {
  try {
    const { testCaseId } = req.params;

    const problemTest = await ProblemTest.findByIdAndDelete(
      {
        _id: testCaseId,
        userId: req.user._id,
      },
      { new: true }
    );

    if (!problemTest) {
      res.status(404).json({ message: "Problem Test Case not found" });
      return;
    }

    await Problem.findByIdAndUpdate(
      { _id: problemTest.problemId },
      { $pull: { testCases: problemTest._id } },
      { new: true }
    );

    res.status(200).json({ message: "Test case deleted successfully" });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      message: "An unexpected error occurs, Please try again later.",
      error: err.message,
    });
  }
};
