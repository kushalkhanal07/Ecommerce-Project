import Cards from "@/components/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProducts } from "@/service/products";
import { useQuery } from "@tanstack/react-query";
import { Loader, Star } from "lucide-react";
import { Link } from "react-router-dom";
export default function Home() {
  const image = ["/image1.png", "/image2.png", "/image3.png"];

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["listProducts"],
    queryFn: getProducts,
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

  return (
    <div className="pb-32">
      <img src="/shoe.png" />
      <div className="grid grid-cols-3  max-w-[70%] mx-auto -mt-20">
        {image.map((images, i) => {
          return (
            <div key={i}>
              <img src={images} className="h-full object-cover" />
            </div>
          );
        })}
      </div>

      <div>
        <p className="text-center font-bold text-[1.8em] my-5">BEST SELLER</p>

        <div className="w-full">
          <Tabs defaultValue="all" className="w-full ">
            <TabsList className="w-full ">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="women">WOMEN</TabsTrigger>
              <TabsTrigger value="men">MEN</TabsTrigger>
              <TabsTrigger value="unisex">UNISEX</TabsTrigger>
              <TabsTrigger value="casual">CASUAL</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                {data.map(
                  ({
                    id,
                    name,
                    price,
                    description,
                    brand,
                    rating,
                    images,
                    slug
                  }: any) => (
                    <Cards
                      key={id}
                      id={id}
                      slug={slug}
                      shoeType={name}
                      price={price}
                      description={description}
                      brand={brand}
                      rating={rating}
                      image={images[0]}
                    />

                  )
                )}
              </div>
            </TabsContent>
            <TabsContent value="women">
              <div className="grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                {data.map(
                  ({
                    id,
                    name,
                    price,
                    description,
                    brand,
                    rating,
                    images,
                  }: any) => (
                    <Cards
                      key={id}
                      id={id}
                      shoeType={name}
                      price={price}
                      description={description}
                      brand={brand}
                      rating={rating}
                      image={images[0]}
                    />
                  )
                )}
              </div>
            </TabsContent>
            <TabsContent value="men">
              <div className="grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                {data.map(
                  ({
                    id,
                    name,
                    price,
                    description,
                    brand,
                    rating,
                    images,
                  }: any) => (
                    <Cards
                      key={id}
                      id={id}
                      shoeType={name}
                      price={price}
                      description={description}
                      brand={brand}
                      rating={rating}
                      image={images[0]}
                    />
                  )
                )}
              </div>
            </TabsContent>
            <TabsContent value="unisex">
              <div className="grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                {data.map(
                  ({
                    id,
                    name,
                    price,
                    description,
                    brand,
                    rating,
                    images,
                  }: any) => (
                    <Cards
                      key={id}
                      id={id}
                      shoeType={name}
                      price={price}
                      description={description}
                      brand={brand}
                      rating={rating}
                      image={images[0]}
                    />
                  )
                )}
              </div>
            </TabsContent>
            <TabsContent value="casual">
              <div className="grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                {data.map(
                  ({
                    id,
                    name,
                    price,
                    description,
                    brand,
                    rating,
                    images,
                  }: any) => (
                    <Cards
                      key={id}
                      id={id}
                      shoeType={name}
                      price={price}
                      description={description}
                      brand={brand}
                      rating={rating}
                      image={images[0]}
                    />
                  )
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <p className="text-[#33A0FF] font-semibold text-[1.2em] text-center my-4">
          LOAD MORE
        </p>

        <div className="bg-[#4440FF] px-3 sm:px-12 text-white grid sm:grid-cols-2 items-center mt-24 py-6">
          <div className="flex flex-col pl-5 sm:pl-12 ">
            <p className="text-[1.4em] md:text-[2em] lg:text-[55px] font-semibold ">
              Newbalance Running Sneakers
            </p>
            <p className="mt-4 lg:mt-0 lg:text-[1.4em]">
              Shoes that transform your body language and attitude.
            </p>
            <Button
              variant={"ghost"}
              className="border-b-2 mt-8 w-fit font-bold text-[1.2em]"
            >
              SHOP NOW
            </Button>
          </div>
          <div className="sm:-mt-18">
            <img src="./big-shoes.png" />
          </div>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap justify-center sm:justify-between gap-4 max-w-[80%] mx-auto my-20 ">
          <div className="flex flex-col gap-5 items-center font-semibold text-[1.2em]">
            <div>
              <img src="/delivery.png" className="w-20" />
            </div>
            <p>FREE SHIPPING</p>
          </div>
          <div className="flex flex-col gap-5 items-center font-semibold text-[1.2em]">
            <div>
              <img src="/coin.png" className="w-20" />
            </div>
            <p>100% REFUND</p>
          </div>
          <div className="flex flex-col gap-5 items-center font-semibold text-[1.2em]">
            <div>
              <img src="/group.png" className="w-20" />
            </div>
            <p>SUPPORT 24/7</p>
          </div>
        </div>

        <div>
          <p className="font-semibold text-[1.2em] sm:text-[1.6em] lg:text-[2.2em] text-center">
            FEATURED PRODUCTS
          </p>
          <div className="grid items-center justify-center md:grid-cols-2 lg:grid-cols-3 gap-6 my-4 ">
            {Array.from({ length: 3 }).map((_, i) => {
              return (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row items-center "
                >
                  <div className="p-2">
                    <div>
                      <img src={"/shoe2.png"} alt="Blue Swade Nike Sneakers" />
                    </div>
                  </div>

                  <div className=" px-2 flex flex-col gap-4">
                    <div className="font-bold text-[1.1em]">
                      Blue Swade Nike Sneakers
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          size={15}
                          key={i}
                          className="text-yellow-300 fill-yellow-500"
                        />
                      ))}
                    </div>
                    <div className="flex gap-x-4">
                      <p className="text-[#4440FF]">1200</p>
                      <p className="line-through">2200</p>
                      <p className="text-red-500">20% off</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center max-w-[60%] mx-auto my-24">
          <Input
            className="py-5 rounded-[0]"
            placeholder="Search for products..."
          />
          <div className=" text-[1.2em] bg-[#4440FF] text-white px-6 py-2">
            Search
          </div>
        </div>
      </div>
    </div>
  );
}
