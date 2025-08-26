
import { loginAdmin, registerAdmin} from "../controller/admin";
import express from "express";


const router = express.Router();
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);


export default router;