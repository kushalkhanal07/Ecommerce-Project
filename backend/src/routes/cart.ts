import express from "express";
import { addToCart, getCart, listAll } from "../controller/cart";
import { customerAuth } from "../config/auth";

const router = express.Router();
router.get("/list", listAll);
router.post("/add", customerAuth, addToCart);
router.get("/:id", customerAuth, getCart);

export default router;
