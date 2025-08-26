
import { loginUser, registerUser} from "../controller/user";
import express from "express";


const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);


export default router;