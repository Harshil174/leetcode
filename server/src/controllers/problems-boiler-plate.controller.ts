import { Response } from "express";

import { Problem } from "../models/problem.model";
import { ProblemBoilerPlate } from "../models/problem-boiler-plate.model";

import { AuthRequest, IProblemBoilerPlate } from "../types";

export const createBoilerPlate = async (req: AuthRequest, res: Response) => {
  try {
    const { language, code, problemId } = req.body;

    const problem = await Problem.findById({
      _id: problemId,
      userId: req.user._id,
    });
    if (!problem) {
      res.status(404).json({ message: "Problem not found" });
      return;
    }

    const problemBoilerPlate = new ProblemBoilerPlate({
      language,
      code,
      problemId,
      userId: req.user._id,
    });
    await problemBoilerPlate.save();

    await Problem.findByIdAndUpdate(
      { _id: problemId, userId: req.user._id },
      { $set: { boilerPlateCode: problemBoilerPlate._id } },
      { new: true }
    );

    res.status(201).json({
      message: "Boiler Plate Code created successfully",
      problemBoilerPlate,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      message: "An unexpected error occurs, Please try again later.",
      error: err.message,
    });
  }
};

export const getBoilerPlates = async (req: AuthRequest, res: Response) => {
  try {
    const problemBoilerPlate = await ProblemBoilerPlate.find();
    if (!problemBoilerPlate) {
      res.status(404).json({ message: "Problem Boiler Plate Code not found" });
      return;
    }

    res.status(200).json({
      message: "Boiler Plate Code fetched successfully",
      boilerPlate: problemBoilerPlate,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      message: "An unexpected error occurs, Please try again later.",
      error: err.message,
    });
  }
};

export const getBoilerPlateById = async (req: AuthRequest, res: Response) => {
  try {
    const { boilerPlateId } = req.params;

    const problemBoilerPlate = await ProblemBoilerPlate.findById({
      _id: boilerPlateId,
      userId: req.user._id,
    });
    if (!problemBoilerPlate) {
      res.status(404).json({ message: "Problem Boiler Plate Code not found" });
      return;
    }

    res.status(200).json({
      message: "Boiler Plate Code fetched successfully",
      boilerPlate: problemBoilerPlate,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      message: "An unexpected error occurs, Please try again later.",
      error: err.message,
    });
  }
};

export const updateBoilerPlate = async (req: AuthRequest, res: Response) => {
  try {
    const { boilerPlateId } = req.params;
    const { language, code, problemId } = req.body;

    const updateData: Partial<IProblemBoilerPlate> = {};

    if (language) updateData.language = language;
    if (code) updateData.code = code;
    if (problemId) updateData.problemId = problemId;

    const problemBoilerPlate = await ProblemBoilerPlate.findByIdAndUpdate(
      { _id: boilerPlateId, userId: req.user._id },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!problemBoilerPlate) {
      res.status(404).json({ message: "Problem Boiler Plate Code not found" });
      return;
    }

    res.status(200).json({
      message: "Boiler Plate updated successfully",
      boilerPlate: problemBoilerPlate,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      message: "An unexpected error occurs, Please try again later.",
      error: err.message,
    });
  }
};

export const deleteBoilerPlate = async (req: AuthRequest, res: Response) => {
  try {
    const { boilerPlateId } = req.params;

    const problemBoilerPlate = await ProblemBoilerPlate.findByIdAndDelete(
      {
        _id: boilerPlateId,
        userId: req.user._id,
      },
      { new: true }
    );

    if (!problemBoilerPlate) {
      res.status(404).json({ message: "Problem Boiler Plate Code not found" });
      return;
    }

    await Problem.findByIdAndUpdate(
      { _id: problemBoilerPlate.problemId },
      { $unset: { boilerPlateCode: "" } },
      { new: true }
    );

    res.status(200).json({ message: "Boiler Plate deleted successfully" });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      message: "An unexpected error occurs, Please try again later.",
      error: err.message,
    });
  }
};
