import { AppDataSource } from "../config/database";
import { Product } from "../entities/product";
import { User } from "../entities/user";
import { Cart } from "../entities/cart";
import { Request, Response } from "express";

export const addToCart = async (req: Request, res: Response) => {
  const { productId, quantity } = req.body as {
    productId: string;
    quantity: number;
  };
  if (!productId || !quantity) {
    return res.status(400).send({
      success: false,
      message: "Product ID and quantity are required",
    });
  }
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).send({
      success: false,
      message: "Login is required to add product on cart",
    });
  }
  const userRepo = AppDataSource.getMongoRepository(User);
  const cartRepo = AppDataSource.getRepository(Cart);
  const productRepo = AppDataSource.getRepository(Product);
  try {
    const user = await userRepo.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Login is required to add product on cart",
      });
    }
    let cart;
    const cartExist = await cartRepo.findOne({
      where: {
        user: user,
      },
    });

    if (cartExist) {
      cartExist.quantity += quantity;
      cart = cartExist;
    } else {
      const product = await productRepo.findOne({
        where: {
          id: productId,
        },
      });
      if (!product) {
        return res.status(404).send({
          success: false,
          message: "Product not found",
        });
      }
      cart = new Cart();
      cart.user = user;
      cart.product = [product];
      cart.quantity = quantity;
    }
    await cartRepo.save(cart);
    return res.status(200).send({
      success: true,
      message: "Product added to cart successfully",
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      Message: "Internal server error",
    });
  }
};
export const getCart = async (req: Request, res: Response) => {
    const cartId = req.params.id;
    const cartRepo = AppDataSource.getRepository(Cart);
    try{
        const cart = await cartRepo.findOne({
            where: {
                id: cartId
            }
        });
        if (!cart) {
            return res.status(404).send({
                success: false,
                message: "Cart not found",
            });
        }
        return res.status(200).send({
            success: true,
            data: cart
        });
    }
    catch(err){
        return res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
}
export const listAll = async(req:Request,res:Response)=>{
    const cartRepo = AppDataSource.getRepository(Cart);
    try{
        const carts = await cartRepo.find();
        return res.status(200).send({
            success: true,
            data: carts
        });
    }
    catch(err){
        return res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
}