import { Button } from "@/components/ui/button";
import { removeCart } from "@/service/cart";
import { useMutation } from "@tanstack/react-query";
import { X, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface CartItemProps {
  id: string;
  image: string;
  name: string;
  price: number;
  initialQuantity: number;
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, quantity: number) => void;
}

export const CartItem = ({
  id,
  image,
  name,
  price,
  initialQuantity,
  onRemove,
  onQuantityChange,
}: CartItemProps) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
    onQuantityChange(id, newQuantity);
  };

  const totalPrice = price * quantity;

  const mutation = useMutation({
    mutationFn: removeCart,
    onSuccess: () => {
      toast.success("cart removed successfully");
    },
    onError: (err) => {
      toast.success("cart removed successfully");
      // toast.error(err.message);
    },
  });

  return (
    <div className="grid grid-cols-8 items-center gap-4 py-6 ">
      <div className="col-span-4 flex gap-x-5 items-center">
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-muted-foreground hover:text-destructive"
          onClick={() => mutation.mutate(id)}
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="">
          <h3 className="font-medium text-foreground">{name}</h3>
        </div>
      </div>

      <div className="col-span-1">
        <p className="font-semibold text-foreground">${price}</p>
      </div>

      <div className="flex items-center gap-2 col-span-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleQuantityChange(quantity - 1)}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <span className="w-8 text-center text-sm font-medium">{quantity}</span>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleQuantityChange(quantity + 1)}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      <div className="col-span-1">
        <p className="font-semibold text-foreground">${totalPrice}</p>
      </div>
    </div>
  );
};
