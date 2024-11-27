import { Request } from "express";
import mongoose from "mongoose";

export interface AuthRequest extends Request {
  user?: any;
}

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  problems: mongoose.Types.ObjectId[];
}

export interface IContest extends mongoose.Document {
  name: string;
  startTime: string;
  endTime: string;
  startDate: Date;
  problems: mongoose.Types.ObjectId[];
}

export interface IProblem extends mongoose.Document {
  title: string;
  description: string[];
  status: "pending" | "solved";
  difficulty: "easy" | "medium" | "hard";
  testCases: mongoose.Types.ObjectId[];
  boilerPlateCode: mongoose.Types.ObjectId;
  submissions: mongoose.Types.ObjectId[];
  contest: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
}

export interface IProblemTest extends mongoose.Document {
  input: Object;
  output: string;
  explanation: string;
  visible: boolean;
  problemId: mongoose.Types.ObjectId;
}

export interface IProblemBoilerPlate extends mongoose.Document {
  language: string;
  code: string;
  problemId: mongoose.Types.ObjectId;
}

export interface IProblemSubmission extends mongoose.Document {
  status: "wrong-answer" | "accepted" | "time-limit-exceeded" | "runtime-error";
  language: string;
  runTime: Number;
  memory: mongoose.Types.Decimal128;
  problemId: mongoose.Types.ObjectId;
}
