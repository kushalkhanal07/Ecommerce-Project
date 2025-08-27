import { Request, Response } from "express";
import { User, Admin } from "../entities";
import { AppDataSource } from "./database";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

export const customerAuth = async (
  req: Request,
  res: Response,
  next: Function
) => {
  // step 1: Check authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Unauthorized! Please provide a valid token." });
  }
  const token = authHeader.split(" ")[1];
  // step 2: Verify token and extract user information
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    const userRepo = AppDataSource.getRepository(User);
    const userData = await userRepo.findOne({ where: { id: payload.id } });
    if (!userData) {
      return res.status(401).json({ message: "Unauthorized! Please Login" });
    }
    req.user = userData;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized! Invalid token" });
  }
};

export const adminAuth = async (
  req: Request,
  res: Response,
  next: Function
) => {
  // step 1: Check authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Unauthorized! Please provide a valid token." });
  }
  const token = authHeader.split(" ")[1];
  // step 2: Verify token and extract user information
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    const userRepo = AppDataSource.getRepository(Admin);
    const userData = await userRepo.findOne({ where: { id: payload.id } });
    if (!userData) {
      return res.status(401).json({ message: "Unauthorized! Please Login" });
    }
    req.admin = userData;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized! Invalid token" });
  }
};
