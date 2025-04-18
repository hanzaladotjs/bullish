import express from "express";
import { user } from "../models/userschema";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const router = express.Router();

router.post("/signup", async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Username, email, and password are required" });
    }

    // Check for existing user
    const existingUser =
      (await user.findOne({ email })) || (await user.findOne({ username }));
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already taken" });
    }

    // Create user
    const userr = new user({ username, email, password });
    await userr.save(); // Password hashed via pre("save")

    // Generate JWT
    const token = jwt.sign(
      { userId: userr._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    // Send response
    res.status(201).json({ token, user: { id: userr._id, username, email } });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/signin", async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find user
    const userr = await user.findOne({ email });
    if (!userr) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, userr.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: userr._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    // Send response
    res.json({
      token,
      user: { id: userr._id, username: userr.username, email },
    });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "No token" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };
    const userr = await user.findById(decoded.userId);
    if (!userr) {
      res.status(401).json({ message: "User not found" });
      return;
    }
    req.body._userId = userr._id;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default router;
