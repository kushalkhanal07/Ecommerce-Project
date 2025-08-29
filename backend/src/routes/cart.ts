import express from "express";
import { addToCart, getCart, listAll,clearCart, deleteFromCart } from "../controller/cart";
import { customerAuth } from "../config/auth";
import { clear } from "console";

const router = express.Router();
router.get("/list", listAll);
router.post("/add", customerAuth, addToCart);
router.get("/:id", customerAuth, getCart);
router.delete("/:id", customerAuth, deleteFromCart);
router.delete("/clear", customerAuth, clearCart);


export default router;
