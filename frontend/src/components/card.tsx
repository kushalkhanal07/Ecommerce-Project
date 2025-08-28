import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { AddToCart } from "@/service/cart";
import { addWishlist, listWishlist } from "@/service/wishlist";
export default function Cards({
  id,
  shoeType,
  price,
  description,
  brand,
  rating,
  image,
}: any) {
  const mutation = useMutation({
    mutationFn: AddToCart,
    onSuccess: () => {
      console.log("cart added successfully");
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  const wishlistMutation = useMutation({
    mutationFn: addWishlist,
    onSuccess: () => {
      console.log("wishlist added successfully");
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  return (
    <Card className="p-2 ">
      <CardHeader className="p-2">
        <div className="h-[200px] ">
          <img
            src={image}
            alt={shoeType}
            className="w-full h-full object-cover"
          />
        </div>
        <CardTitle className="font-bold text-[1.1em] flex justify-between items-center">
          {shoeType}{" "}
          <div className="flex gap-x-2">
            <Button
              variant={"outline"}
              className="cursor-pointer"
              onClick={() => mutation.mutate(id)}
            >
              <ShoppingCart />{" "}
            </Button>{" "}
            <Button
              variant={"outline"}
              className="cursor-pointer"
              onClick={() => wishlistMutation.mutate(id)}
            >
              <Heart />{" "}
            </Button>{" "}
          </div>
        </CardTitle>
        <CardDescription className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              size={15}
              key={i}
              className={
                i < rating ? "text-yellow-300 fill-yellow-500" : "text-gray-300"
              }
            />
          ))}
        </CardDescription>
      </CardHeader>

      <CardFooter className="-mt-3 px-2">
        <div className="flex flex-col gap-x-4 flex-wrap">
          <p className="text-[#4440FF]">{price}</p>
          <p className="">{description}</p>
          <p className="text-red-500">{brand}</p>
        </div>
      </CardFooter>
    </Card>
  );
}
