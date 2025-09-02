import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star, Minus, Plus, Facebook, Twitter, Heart } from "lucide-react";
import { Badge } from "./ui/badge";

const ProductDetails = ({ brand, description, name, price, size, slug, stock }: any) => {
  const [quantity, setQuantity] = useState(2);
  const [selectedColor, setSelectedColor] = useState("blue");
  const [selectedSize, setSelectedSize] = useState("XS");

  const colors = [
    { name: "blue", value: "#3b82f6" },
    { name: "red", value: "#ef4444" },
    { name: "black", value: "#1f2937" },
    { name: "yellow", value: "#eab308" },
  ];

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="space-y-6">
      {/* Product title */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground mb-2 flex flex-col">
          {name} <span className="text-sm my-3">Brand: {brand}</span>
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">4 reviews</span>
          <button className="text-sm text-primary hover:underline">
            Submit a review
          </button>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl font-bold text-primary">${price}</span>
          <span className="text-lg text-price-original line-through">
            $0
          </span>
          <Badge variant="destructive" className="bg-price-discount">
            24% Off
          </Badge>
        </div>
      </div>

      {/* Product info */}
      <div className="space-y-4 text-sm">
        <div className="flex justify-between">
          <span className="font-medium">Availability:</span>
          <span className="text-success">In stock : {stock}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Category:</span>
          <span className="capitalize">{slug}</span>
        </div>
        <div className="text-success font-medium">Free shipping</div>
      </div>

      {/* Color selection */}
      <div className="space-y-3">
        <label className="font-medium text-sm">Select Color:</label>
        <div className="flex gap-3">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(color.name)}
              className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === color.name
                ? "ring-2 ring-primary ring-offset-2"
                : "hover:ring-1 hover:ring-gray-400"
                }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Size selection */}
      <div className="space-y-3">
        <label className="font-medium text-sm">Size</label>
        <Select value={selectedSize} onValueChange={setSelectedSize}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="XS">XS</SelectItem>
            <SelectItem value="S">S</SelectItem>
            <SelectItem value="M">M</SelectItem>
            <SelectItem value="L">L</SelectItem>
            <SelectItem value="XL">XL</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Quantity and Add to Cart */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center border rounded-lg">
            <Button
              variant="ghost"
              size="sm"
              onClick={decreaseQuantity}
              className="h-8 w-8 p-0 hover:bg-muted"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="px-4 py-1 min-w-[40px] text-center">
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={increaseQuantity}
              className="h-8 w-8 p-0 hover:bg-muted"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <Button className="flex-1 bg-primary hover:bg-primary/90">
            Add To Cart
          </Button>

          <Button variant="outline" size="icon">
            <Heart className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Social sharing */}
      <div className="flex gap-3">
        <Button className="flex-1 bg-social-facebook hover:bg-social-facebook/90">
          <Facebook className="w-4 h-4 mr-2" />
          Share on Facebook
        </Button>
        <Button className="flex-1 bg-social-twitter hover:bg-social-twitter/90">
          <Twitter className="w-4 h-4 mr-2" />
          Share on Twitter
        </Button>
      </div>
    </div>
  );
};

export default ProductDetails;
