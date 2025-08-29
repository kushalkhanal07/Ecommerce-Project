import { adminAuth, customerAuth } from "../config/auth";
import { getCustomerProfile, getUser, loginUser, registerUser } from "../controller/user";
import express from "express";

const router = express.Router();
router.get("/all", adminAuth, getUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", customerAuth, getCustomerProfile);

export default router;
