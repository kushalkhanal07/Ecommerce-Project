import express from "express";
import { addToCart, getCart, listAll } from "../controller/cart";   
import { customerAuth } from "../config/auth";

const router = express.Router();
router.post("/add", customerAuth,addToCart);
router.get("/:id",customerAuth, getCart);
router.get("/list", listAll);

export default router;