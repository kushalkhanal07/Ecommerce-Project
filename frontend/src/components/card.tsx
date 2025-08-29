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
import { addWishlist } from "@/service/wishlist";
import { toast } from "sonner";
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
      toast.success("cart added successfully", {
        description: "Successfull.",
      });
    },
    onError: (err) => {
      console.log(err.message);
      toast.error("Failed to add cart", {
        description: "Failed",
      });
    },
  });

  const wishlistMutation = useMutation({
    mutationFn: addWishlist,
    onSuccess: () => {
      console.log("wishlist added successfully");
      toast.success("wishlist added successfully", {
        description: "Successfull.",
      });
    },
    onError: (err) => {
      console.log(err.message);
      toast.error("Failed to add wishlist", {
        description: "Failed",
      });
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
          <span className="capitalize">{shoeType}</span>{" "}
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
        <CardDescription className="flex items-center ">
          <span className="mr-4">Reviews :</span>
          {[...Array(5)].map((_, i) => (
            <Star
              size={15}
              key={i}
              className={
                i < 4 ? "text-yellow-300 fill-yellow-500" : "text-gray-300"
              }
            />
          ))}
        </CardDescription>
      </CardHeader>

      <CardFooter className="-mt-3 px-2">
        <div className="flex flex-col gap-4 flex-wrap">
          <p className="text-[1.2em] font-semibold">{description}</p>
          <p className="text-[#4440FF]">Price : ${price}</p>
          <p className="text-red-500">Brand: {brand}</p>
        </div>
      </CardFooter>
    </Card>
  );
}
