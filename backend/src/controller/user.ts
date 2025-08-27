import { AppDataSource } from "../config/database";
import { User } from "../entities/user";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
  const user = AppDataSource.getRepository(User);
  const { name, email, password, phoneNumber } = req.body;

  try {
    if (!name || !email || !password || !phoneNumber) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await user.findOne({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      return res.status(409).send({
        success: false,
        message: "User with this email already exists",
      });
    }

    const newUser = user.create({
      name,
      email,
      password,
      phoneNumber,
    });

    await user.save(newUser);
    return res.status(201).send({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};
export const loginUser = async (req: Request, res: Response) => {
  const user = AppDataSource.getRepository(User);
  const { email, password } = req.body;
  console.log({ email, password });
  try {
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Email and password are required",
      });
    }

    const existingUser = await user.findOne({
      where: {
        email: email,
      },
    });

    if (!existingUser) {
      return res.status(401).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Here you would normally compare the password with a hashed password
    if (existingUser.password !== password) {
      return res.status(401).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    const token = jwt.sign(
      { id: existingUser.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    return res.status(200).send({
      success: true,
      message: "User logged in successfully",
      user: {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
        phoneNumber: existingUser.phoneNumber,
      },
      token: token,
    });
  } catch (err: any) {
    console.log(err);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = AppDataSource.getRepository(User);
    const allUser = await user.find();
    const users = allUser.map(({ id, name, email, phoneNumber }) => {
      return { id, name, email, phoneNumber };
    });
    return res.status(200).send({
      success: true,
      users,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};
