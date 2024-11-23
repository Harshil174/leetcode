import { Response } from "express";

import { Contest } from "./../models/contest.model";

import { AuthRequest, IContest } from "../types";

export const createContest = async (req: AuthRequest, res: Response) => {
  try {
    const { name, startTime, endTime, startDate } = req.body;

    const exitingContest = await Contest.findOne({ name });
    if (exitingContest) {
      res.status(400).json({ message: "Contest already exists." });
      return;
    }

    const contest = new Contest({
      name,
      startTime,
      endTime,
      startDate,
      userId: req.user._id,
    });
    await contest.save();

    res.status(201).json({
      message: "Contest created successfully",
      contest,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      message: "An unexpected error occurs, Please try again later.",
      error: err.message,
    });
  }
};

export const getContests = async (req: AuthRequest, res: Response) => {
  try {
    const contests = await Contest.find();
    if (!contests) {
      res.status(404).json({ message: "Contests not found" });
      return;
    }

    res.status(200).json({
      message: "Contests fetched successfully",
      contests,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      message: "An unexpected error occurs, Please try again later.",
      error: err.message,
    });
  }
};

export const getContestById = async (req: AuthRequest, res: Response) => {
  try {
    const { contestId } = req.params;

    const contest = await Contest.findById({
      _id: contestId,
      userId: req.user._id,
    });
    if (!contest) {
      res.status(404).json({ message: "Contests not found" });
      return;
    }

    res.status(200).json({
      message: "Contest fetched successfully",
      contest,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      message: "An unexpected error occurs, Please try again later.",
      error: err.message,
    });
  }
};

export const updateContest = async (req: AuthRequest, res: Response) => {
  try {
    const { contestId } = req.params;
    const { name, startTime, endTime, startDate, problems } = req.body;

    const updateData: Partial<IContest> = {};

    if (name) updateData.name = name;
    if (startTime) updateData.startTime = startTime;
    if (endTime) updateData.endTime = endTime;
    if (startDate) updateData.startDate = startDate;

    const contest = await Contest.findByIdAndUpdate(
      { _id: contestId, userId: req.user._id },
      { $set: updateData },
      { new: true, runValidator: true }
    );

    if (!contest) {
      res.status(404).json({ message: "Contests not found" });
      return;
    }

    res.status(200).json({
      message: "Contest updated successfully",
      contest,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      message: "An unexpected error occurs, Please try again later.",
      error: err.message,
    });
  }
};

export const deleteContest = async (req: AuthRequest, res: Response) => {
  try {
    const { contestId } = req.params;

    const contest = await Contest.findByIdAndDelete(
      {
        _id: contestId,
        userId: req.user._id,
      },
      { new: true }
    );

    if (!contest) {
      res.status(404).json({ message: "Contests not found" });
      return;
    }

    res.status(200).json({ message: "Contest deleted successfully" });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      message: "An unexpected error occurs, Please try again later.",
      error: err.message,
    });
  }
};
