import express from "express";
import {
    addProduct,
    deleteProduct,
    getProducts,
    getProductBySlug,
    updateProduct,
} from "../controller/product";
import upload from "../config/upload";


const router = express.Router();
router.post("/add", upload.fields([{ name: "image" }]), addProduct);
router.get("/", getProducts);
router.get("/by-slug/:slug", getProductBySlug);
router.patch("/update/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
