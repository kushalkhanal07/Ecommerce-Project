import BestSellerCard from "@/components/BestSellerCard";
import ProductDetails from "@/components/ProductDetails";
import ProductGallery from "@/components/ProductGallery";
import { Button } from "@/components/ui/button";
import { Facebook, Star, Twitter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Cards from "@/components/card";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Product = () => {
  const images = ["shoe1.png", "shoe2.png", "shoe3.png", "shoe4.png"];
  return (
    <div className="min-h-screen">
      <p className="mt-6 text-center text-blue-400 text-[1.2em]">Hot Deal</p>
      <div className=" mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Product Gallery - Left Column */}
          <div className="lg:col-span-4">
            <ProductGallery images={images} />
          </div>

          {/* Product Details - Middle Column */}
          <div className="lg:col-span-5">
            <ProductDetails />
          </div>

          {/* Best Seller - Right Column */}
          <div className="lg:col-span-3">
            <BestSellerCard />
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row items-center justify-center gap-x-5 mt-6">
          <Button className="bg-[#385C8E] max-w-[300px] w-full rounded-none">
            {" "}
            <Facebook /> Share on Facebook
          </Button>
          <Button className="bg-[#03A9F4] max-w-[300px] w-full rounded-none">
            {" "}
            <Twitter /> Share on Twitter
          </Button>
        </div>

        <div className="w-full mt-12">
          <Tabs defaultValue="info" className="">
            <TabsList className="max-w-[500px] w-full">
              <TabsTrigger value="info">Product Information</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="another">Another tab</TabsTrigger>
            </TabsList>
            <TabsContent value="info">
              <p className="text-gray-500 max-w-[500px]">
                Elevate your everyday look with the New Balance Men’s Casual
                Shoe, designed for the modern man who values both style and
                function. Perfect for a variety of casual settings, these shoes
                seamlessly blend classic design with unparalleled comfort.
              </p>
            </TabsContent>
            <TabsContent value="reviews">women</TabsContent>
            <TabsContent value="another">men</TabsContent>
          </Tabs>
        </div>

        <div className="mt-12 ">
          <p className="text-center font-bold text-[2.9em]">RELATED PRODUCTS</p>
          <div className="flex justify-center mt-6">
            <div className="grid grid-cols-2 items-center justify-center max-w-[700px] w-full gap-x-2">
              {Array.from({ length: 2 }, (_, i) => (
                <Card key={i} className="p-2 border-none shadow-none">
                  <CardHeader className="p-2">
                    <div>
                      <img src={`/shoe${i + 1}.png`} alt="shoe" />
                    </div>
                    <CardTitle className="font-bold text-[1.1em]">
                      PUMA
                    </CardTitle>

                    <CardDescription className="flex">
                      {Array.from({ length: 5 }, (_, j) => (
                        <Star
                          size={15}
                          key={j}
                          className={
                            j < 3
                              ? "text-yellow-300 fill-yellow-500"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </CardDescription>
                  </CardHeader>

                  <CardFooter className="-mt-3 px-2">
                    <div className="flex gap-x-4">
                      <p className="text-[#4440FF]">1200</p>
                      <p className="line-through">1400</p>
                      <p className="text-red-500">10</p>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
