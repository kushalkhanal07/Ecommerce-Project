import { Heart, ShoppingCart, Eye, Trash2, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getWishlist, removeWishlist } from "@/service/wishlist";
import { toast } from "sonner";

// Mock data for wishlist items
const mockWishlistItems = [
  {
    id: "1",
    name: "Nike Air Max 90",
    brand: "Nike",
    price: 129.99,
    originalPrice: 149.99,
    image: "./shoe1.png",
    inStock: true,
    rating: 4.8,
  },
  {
    id: "2",
    name: "Adidas Ultraboost 22",
    brand: "Adidas",
    price: 159.99,
    originalPrice: 179.99,
    image: "./shoe2.png",
    inStock: true,
    rating: 4.7,
  },
  {
    id: "3",
    name: "Converse Chuck Taylor",
    brand: "Converse",
    price: 69.99,
    originalPrice: 79.99,
    image: "./shoe5.png",
    inStock: false,
    rating: 4.5,
  },
  {
    id: "4",
    name: "Vans Old Skool",
    brand: "Vans",
    price: 89.99,
    originalPrice: 99.99,
    image: "./shoe4.png",
    inStock: true,
    rating: 4.6,
  },
];

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState(mockWishlistItems);
  const queryClient = useQueryClient();
  const removeFromWishlist = (id: string) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  const moveToCart = (id: string) => {
    // This would typically call an API to move item to cart
    console.log(`Moving item ${id} to cart`);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
  });

  const mutation = useMutation({
    mutationFn: removeWishlist,
    onSuccess: (data) => {
      console.log("Delete success:", data);
      toast.success("Wishlist deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["getProducts"] });
    },
    onError: () => {
      toast.error("wishlist delete failed");
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[600px]">
        <Loader size={25} className="animate-spin" />
      </div>
    );
  }

  if (isError) {
    return <div>{error?.message}</div>;
  }

  console.log(data);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Wishlist</h1>
        <p className="text-gray-600">Items you've saved for later</p>
        <div className="w-20 h-1 bg-blue-500 mx-auto mt-4 rounded-full"></div>
      </div>

      {!data?.length ? (
        <div className="text-center py-20">
          <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-gray-500 mb-6">Start adding items you love!</p>
          <Button>Continue Shopping</Button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              {data.length} {data.length === 1 ? "item" : "items"} in wishlist
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data?.map((item: any) => (
              <Card
                key={item.id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative">
                  <img
                    src={item?.product?.images[0]}
                    alt={item?.product?.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-white/80 hover:bg-white"
                      onClick={() => mutation.mutate(item?.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                  {!item.inStock && (
                    <div className="absolute top-2 left-2">
                      <Badge variant="destructive">Out of Stock</Badge>
                    </div>
                  )}
                  {item.originalPrice > item.price && (
                    <div className="absolute bottom-2 left-2">
                      <Badge className="bg-green-500">Sale</Badge>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <p className="font-semibold text-[1.3em]">
                    {item?.product?.description}
                  </p>
                  <p className="text-sm text-gray-500 mb-1">
                    Brand: {item?.product?.brand}
                  </p>
                  <h3 className="font-semibold mb-2 line-clamp-1">
                    {item?.product?.name}
                  </h3>

                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {"★".repeat(Math.floor(item.rating))}
                      {"☆".repeat(5 - Math.floor(item.rating))}
                    </div>
                    <span className="text-sm text-gray-500">
                      Rating: ({item.rating || 5})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-lg">
                        ${item?.product?.price}
                      </span>
                      {item.originalPrice > item.price && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          ${item.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
                {/* <CardFooter className="p-4 pt-0 flex gap-2">
                  <Button
                    className="flex-1"
                    disabled={!item.inStock}
                    onClick={() => moveToCart(item.id)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                </CardFooter> */}
              </Card>
            ))}
          </div>

          <div className="mt-10 border-t pt-6 flex justify-between items-center">
            <p className="text-gray-600">
              Items in your wishlist are saved for 90 days
            </p>
            <Button variant="outline">
              <Heart className="h-4 w-4 mr-2" />
              Share Wishlist
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
