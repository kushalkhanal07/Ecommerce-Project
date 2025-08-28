import express from "express";

import { getwishlist, toggleWishlist,listAll } from "../controller/wishlist";
import { customerAuth } from "../config/auth";


const router = express.Router();
router.post("/add",customerAuth, toggleWishlist);
router.get("/:id",customerAuth, getwishlist);
router.get("/list",customerAuth, listAll);

export default router;