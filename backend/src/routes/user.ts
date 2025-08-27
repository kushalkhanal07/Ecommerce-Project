import { adminAuth } from "../config/auth";
import { getUser, loginUser, registerUser } from "../controller/user";
import express from "express";

const router = express.Router();
router.get("/all", adminAuth, getUser);
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
