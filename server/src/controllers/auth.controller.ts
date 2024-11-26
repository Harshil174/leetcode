import { Request, Response } from "express";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../models/user.model";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res
        .status(400)
        .json({ success: false, message: "Please fill all required fields." });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res
        .status(400)
        .json({ success: false, message: "Email already exists." });
      return;
    }

    const user = new User({
      name,
      email,
      password,
    });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "", {
      expiresIn: "1d",
    });

    res.status(201).json({
      success: true,
      message: "Signed up successfully",
      token,
      user,
    });
  } catch (err: any) {
    console.error("Error in sign-up", err);
    res.status(500).json({
      success: false,
      message: "An unexpected error occurs, Please try again later.",
      error: err.message,
    });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Please fill all required fields." });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ success: false, message: "User not found." });
      return;
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      res.status(400).json({ success: false, message: "Invalid Password." });
      return;
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "", {
      expiresIn: "1d",
    });

    res.status(200).json({
      success: true,
      message: "Successfully signed in",
      token,
      user,
    });
  } catch (err: any) {
    console.error("Error in sign-in", err);
    res.status(500).json({
      success: false,
      message: "An unexpected error occurs, Please try again later.",
      error: err.message,
    });
  }
};
