import { AppDataSource } from "../config/database";
import { Product,User } from "../entities";
import { Wishlist } from "../entities/wishlist";
import { Request, Response } from "express";


export const toggleWishlist = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const productId = req.params.id;
  if (!userId) {
    return res.status(401).send({
      success: false,
      message: "Login is required to add product on wishlist",
    });
  }
  const userRepo = AppDataSource.getRepository(User);
  const wishlistRepo = AppDataSource.getRepository(Wishlist);
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
        message: "Login is required to add product on wishlist",
      });
    }
    const productExists = await productRepo.findOne({
      where: {
        id: productId,
      },
    });
    if (!productExists) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }
    const wishlistExist = await wishlistRepo.findOne({
      where: {
        user: user,
        product: {
          id: productExists.id,
        },
      },
    });

    if (!wishlistExist) {
      let wishlist;
      wishlist = new Wishlist();
      wishlist.user = user;
      wishlist.product = productExists;
      await wishlistRepo.save(wishlist);
      return res.status(200).send({
        success: true,
        message: "Product added to wishlist",
      });
    }
    await wishlistRepo.remove(wishlistExist);
    return res.status(200).send({
      success: true,
      message: "Product removed from wishlist",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const getwishlist = async(req:Request,res: Response)=>{
    const wishlistId = req.params.id;
    const wishlistRepo= AppDataSource.getRepository(Wishlist);
    try{
        const wishlist = await wishlistRepo.findOne({
            where: {
                id: wishlistId
            },
            
        });
        if (!wishlist) {
            return res.status(404).send({
                success: false,
                message: "Wishlist not found"
            });
        }
        return res.status(200).send({
            success: true,
            data: wishlist
        });
    }
    catch(err) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
}
}
export const listAll = async(req:Request,res:Response)=>{
    const wishlistRepo= AppDataSource.getRepository(Wishlist);
    try{
        const wishlists = await wishlistRepo.find({
            relations: ["product"]
        });
        return res.status(200).send({
            success: true,
            data: wishlists
        });
    }
    catch(err) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
}
}
