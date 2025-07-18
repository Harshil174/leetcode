import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";

import { connectDB } from "./db/connectDB";

import authRouter from "./routes/auth.route";
import problemsRouter from "./routes/problems.route";
import contestsRouter from "./routes/contests.route";
import testCasesRouter from "./routes/problem-test.route";
import boilerPlateCodeRouter from "./routes/problem-boiler-plate.route";
import submissionRouter from "./routes/problem-submission.route";

const app = express();
const MONGODB_URI = process.env.MONGODB_URI || "";
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/api/auth", authRouter);
app.use("/api/contest", contestsRouter);
app.use("/api/problem", problemsRouter);
app.use("/api/test-case", testCasesRouter);
app.use("/api/boiler-plate-code", boilerPlateCodeRouter);
app.use("/api/submission", submissionRouter);

app.listen(PORT, async () => {
  await connectDB(MONGODB_URI);
  console.log(`Server running on ${PORT}`);
});
