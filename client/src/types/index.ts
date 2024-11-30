export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  problems: Problem[];
  createdAt: string;
  updatedAt: string;
};

export type Problem = {
  _id: string;
  title: string;
  description: string[];
  status: "pending" | "solved";
  difficulty: "easy" | "medium" | "hard";
  testCases: ProblemTest[];
  boilerPlateCode: ProblemBoilerPlate;
  submissions: ProblemSubmission[];
  contestId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type ProblemTest = {
  _id: string;
  input: any;
  output: any;
  explanation: string;
  visible: boolean;
  problemId: string;
  createdAt: string;
  updatedAt: string;
};

export type ProblemBoilerPlate = {
  _id: string;
  language: string;
  code: string;
  problemId: string;
  createdAt: string;
  updatedAt: string;
};

export type ProblemSubmission = {
  _id: string;
  status: "wrong-answer" | "accepted" | "time-limit-exceeded" | "runtime-error";
  language: string;
  runTime: Number;
  memory: string;
  problemId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};