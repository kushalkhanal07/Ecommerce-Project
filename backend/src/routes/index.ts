import express from 'express';
import userRouter from "./user";
import adminRouter from "./admin";
import productRouter from "./product";
import orderRouter from "./order";
import cartRouter from "./cart"
import wishlistRouter from "./wishlist"

const baseRouter = () => {
  const router = express.Router();

  // Define your routes here
  router.use("/users", userRouter);
  router.use("/admin", adminRouter);
  router.use("/products", productRouter);
  router.use("/orders", orderRouter);
  router.use("/cart", cartRouter); 
  router.use("/wishlist", wishlistRouter); // Assuming cart routes are handled in productRouter, change if needed

  return router;
};
export default baseRouter;


 