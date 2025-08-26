import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { AddToCart } from "@/service/cart";
export default function Cards({
  id,
  shoeType,
  price,
  originalPrice,
  discount,
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

  return (
    <Card className="p-2 ">
      <CardHeader className="p-2">
        <div>
          <img src={image} alt={shoeType} />
        </div>
        <CardTitle className="font-bold text-[1.1em] flex justify-between items-center">
          {shoeType}{" "}
          <Button
            variant={"outline"}
            className="cursor-pointer"
            onClick={() => mutation.mutate(id)}
          >
            <ShoppingCart />{" "}
          </Button>{" "}
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
        <div className="flex gap-x-4 flex-wrap">
          <p className="text-[#4440FF]">{price}</p>
          <p className="line-through">{originalPrice}</p>
          <p className="text-red-500">{discount}</p>
        </div>
      </CardFooter>
    </Card>
  );
}
