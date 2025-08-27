
import { adminAuth } from "../config/auth";
import { getAdminProfile, loginAdmin, registerAdmin} from "../controller/admin";
import express from "express";


const router = express.Router();
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/me", adminAuth, getAdminProfile);


export default router;