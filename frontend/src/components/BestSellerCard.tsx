import { Star } from "lucide-react";
import { Badge } from "./ui/badge";

const BestSellerCard = () => {
  return (
    <div className=" rounded-lg border p-4 space-y-4">
      <div className="flex justify-between items-start">
        <Badge variant="secondary" className="text-xs">
          BEST SELLER
        </Badge>
      </div>

      <div className="aspect-square bg-background rounded-lg overflow-hidden">
        <img
          src={"/shoe1.png"}
          alt="Best seller product"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${
                i < 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold text-primary">$449</span>
          <span className="text-sm text-price-original line-through">$599</span>
        </div>
      </div>
    </div>
  );
};

export default BestSellerCard;
