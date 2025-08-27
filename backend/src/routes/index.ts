import express from 'express';
import userRouter from "./user";
import adminRouter from "./admin";
import productRouter from "./product";
import orderRouter from "./order";

const baseRouter = () => {
  const router = express.Router();

  // Define your routes here
  router.use("/users", userRouter);
  router.use("/admin", adminRouter);
  router.use("/products", productRouter);
  router.use("/orders", orderRouter);

  return router;
};
export default baseRouter;


 