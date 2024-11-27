import { Response } from "express";

import { AuthRequest, IProblem } from "../types";

import { Problem } from "../models/problem.model";
import { User } from "../models/user.model";

export const createProblem = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, status, difficulty } = req.body;

    const problem = new Problem({
      title,
      description,
      status,
      difficulty,
      userId: req.user._id,
    });
    await problem.save();

    await User.findByIdAndUpdate(
      req.user._id,
      { $push: { problems: problem._id } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Problem created successfully",
      problem,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "An unexpected error occurs, Please try again later.",
      error: err.message,
    });
  }
};

export const getProblems = async (req: AuthRequest, res: Response) => {
  try {
    const problems = await Problem.find().select(
      "-testCases -boilerPlateCode -submissions"
    );

    if (!problems) {
      res.status(404).json({ success: false, message: "Problems not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Problems fetched successfully",
      problems,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "An unexpected error occurs, Please try again later.",
      error: err.message,
    });
  }
};

export const getProblemById = async (req: AuthRequest, res: Response) => {
  try {
    const { problemId } = req.params;

    const problem = await Problem.findById({
      _id: problemId,
      userId: req.user._id,
    }).populate("testCases submissions boilerPlateCode");

    if (!problem) {
      res.status(404).json({ success: false, message: "Problem not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Problem fetched successfully",
      problem,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "An unexpected error occurs, Please try again later.",
      error: err.message,
    });
  }
};

export const updateProblem = async (req: AuthRequest, res: Response) => {
  try {
    const { problemId } = req.params;
    const { title, description, status, difficulty } = req.body;

    const updateData: Partial<IProblem> = {};

    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (status) updateData.status = status;
    if (difficulty) updateData.difficulty = difficulty;

    const problem = await Problem.findByIdAndUpdate(
      { _id: problemId, userId: req.user._id },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!problem) {
      res.status(404).json({ success: false, message: "Problem not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Problem updated successfully",
      problem,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "An unexpected error occurs, Please try again later.",
      error: err.message,
    });
  }
};

export const deleteProblem = async (req: AuthRequest, res: Response) => {
  try {
    const { problemId } = req.params;

    await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { problems: problemId } },
      { new: true }
    );

    const problem = await Problem.findByIdAndDelete({
      _id: problemId,
      userId: req.user._id,
    });

    if (!problem) {
      res.status(404).json({ success: false, message: "Problem not found" });
      return;
    }

    res
      .status(200)
      .json({ success: true, message: "Problem deleted successfully" });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "An unexpected error occurs, Please try again later.",
      error: err.message,
    });
  }
};
