import { Response } from "express";

import { Problem } from "../models/problem.model";
import { ProblemBoilerPlate } from "../models/problem-boiler-plate.model";

import { ProblemSubmission } from "../models/problem-submission.model";
import { AuthRequest, IProblemSubmission } from "../types";

export const createSubmission = async (req: AuthRequest, res: Response) => {
  try {
    const { status, language, runTime, memory, problemId } = req.body;

    const problem = await Problem.findById({
      _id: problemId,
      userId: req.user._id,
    });
    if (!problem) {
      res.status(404).json({ message: "Problem not found" });
      return;
    }

    const problemSubmission = new ProblemSubmission({
      status,
      language,
      runTime,
      memory,
      problemId,
      userId: req.user._id,
    });
    await problemSubmission.save();

    await Problem.findByIdAndUpdate(
      { _id: problemId, userId: req.user._id },
      {
        $push: { submissions: problemSubmission._id },
        $set: { status: "solved" },
      },
      { new: true }
    );

    res.status(201).json({
      message: "Answer submitted successfully",
      submission: problemSubmission,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      message: "An unexpected error occurs, Please try again later.",
      error: err.message,
    });
  }
};

export const getSubmissions = async (req: AuthRequest, res: Response) => {
  try {
    const problemSubmission = await ProblemSubmission.find();
    if (!problemSubmission) {
      res.status(404).json({ message: "Problem Boiler Plate Code not found" });
      return;
    }

    res.status(200).json({
      message: "Submissions fetched successfully",
      submission: problemSubmission,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      message: "An unexpected error occurs, Please try again later.",
      error: err.message,
    });
  }
};

export const getSubmissionById = async (req: AuthRequest, res: Response) => {
  try {
    const { submissionId } = req.params;

    const problemSubmission = await ProblemSubmission.findById({
      _id: submissionId,
      userId: req.user._id,
    });
    if (!problemSubmission) {
      res.status(404).json({ message: "Submission not found" });
      return;
    }

    res.status(200).json({
      message: "Submission fetched successfully",
      submission: problemSubmission,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      message: "An unexpected error occurs, Please try again later.",
      error: err.message,
    });
  }
};

export const updateSubmission = async (req: AuthRequest, res: Response) => {
  try {
    const { submissionId } = req.params;
    const { status, language, runTime, memory, problemId } = req.body;

    const updateData: Partial<IProblemSubmission> = {};

    if (status) updateData.status = status;
    if (language) updateData.language = language;
    if (runTime) updateData.runTime = runTime;
    if (memory) updateData.memory = memory;
    if (problemId) updateData.problemId = problemId;

    const problemSubmission = await ProblemSubmission.findByIdAndUpdate(
      { _id: submissionId, userId: req.user._id },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!problemSubmission) {
      res.status(404).json({ message: "Submission not found" });
      return;
    }

    res.status(200).json({
      message: "Submission updated successfully",
      submission: problemSubmission,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      message: "An unexpected error occurs, Please try again later.",
      error: err.message,
    });
  }
};

export const deleteSubmission = async (req: AuthRequest, res: Response) => {
  try {
    const { submissionId } = req.params;

    const problemSubmission = await ProblemSubmission.findByIdAndDelete(
      {
        _id: submissionId,
        userId: req.user._id,
      },
      { new: true }
    );

    if (!problemSubmission) {
      res.status(404).json({ message: "Submission not found" });
      return;
    }

    await Problem.findByIdAndUpdate(
      { _id: problemSubmission.problemId },
      { $pull: { submissions: problemSubmission._id } },
      { new: true }
    );

    res.status(200).json({ message: "Submission deleted successfully" });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      message: "An unexpected error occurs, Please try again later.",
      error: err.message,
    });
  }
};
