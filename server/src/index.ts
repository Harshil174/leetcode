import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";

import { connectDB } from "./db/connectDB";

import authRouter from "./routes/auth.route";
import problemsRouter from "./routes/problems.route";
import problemTestCasesRouter from "./routes/problem-test.route";

const app = express();
const MONGODB_URI = process.env.MONGODB_URI || "";
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/api/auth", authRouter);
app.use("/api/problems", problemsRouter);
app.use("/api/problems-test-cases", problemTestCasesRouter);

app.listen(PORT, async () => {
  await connectDB(MONGODB_URI);
  console.log(`Server running on ${PORT}`);
});
