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
  const userRepo = AppDataSource.getRepository(User);
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
        product: {
          id: productId,
        }
      },
    });

    if (cartExist) {
      cartExist.quantity = quantity;
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
    console.error(err);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
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
            },
            relations: ["product","user"]
        });
        if (!cart) {
            return res.status(200).send({
                success: false,
                message: "Cart not found",
                data: []
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
        const carts = await cartRepo.find({
          relations: ["product"]
        });
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
  };

// Clear entire cart
export const clearCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Login is required to clear cart",
      });
    }

    const cartRepo = AppDataSource.getRepository(Cart);

    await cartRepo.delete({ user: { id: userId } });

    return res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
    });
  } catch (error) {
    console.error("Error clearing cart:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Delete single product from cart
export const deleteFromCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const productId = req.params.id;
    const cartId = req.params.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Login is required to remove product from cart",
      });
    }

    const cartRepo = AppDataSource.getRepository(Cart);

    const cart = await cartRepo.findOne({
      where: {
        id: cartId,
      },
      relations: ["user", "product"], // ensures user/product objects are loaded
    });
    console.log("Cart found:", cart);
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    await cartRepo.remove(cart);

    return res.status(200).json({
      success: true,
      message: "Product removed from cart successfully",
    });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};