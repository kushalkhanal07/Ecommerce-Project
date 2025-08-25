import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Grid3x3, Menu } from "lucide-react";
import data from "@/data/shoeData.json";
import Cards from "@/components/card";

export default function Shop() {
  return (
    <>
      <div className="mt-10 grid grid-cols-5 gap-x-4">
        <div className="col-span-1  ">
          <div className="bg-gray-100 px-4 py-2">
            <p className="font-bold text-[1.2em] my-2">PRICES</p>
            <p className="flex justify-between">
              <span>Ranger:</span>
              <span>$13.99 - $25.99</span>
            </p>
            <img src="/slider.png" className="mt-4" />
          </div>

          <div className="mt-12 bg-gray-100 px-4 py-2 pb-6">
            <p className="mt-2 mb-4">COLOR</p>
            <div className="flex justify-between">
              <div className="p-1 border-blue-400 border  rounded-full">
                <p className="w-4 h-4 rounded-full bg-blue-500"></p>
              </div>
              <div className="p-1 border-red-400 border  rounded-full">
                <p className="w-4 h-4 rounded-full bg-red-500"></p>
              </div>
              <div className="p-1 border-green-400 border  rounded-full">
                <p className="w-4 h-4 rounded-full bg-green-500"></p>
              </div>
              <div className="p-1 border-yellow-400 border  rounded-full">
                <p className="w-4 h-4 rounded-full bg-yellow-500"></p>
              </div>
              <div className="p-1 border-black border  rounded-full">
                <p className="w-4 h-4 rounded-full bg-black"></p>
              </div>
              <div className="p-1 border-purple-400 border  rounded-full">
                <p className="w-4 h-4 rounded-full bg-purple-500"></p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#4440FF] px-12 text-white grid grid-cols-2 items-center  py-6 col-span-4">
          <div className="flex flex-col pl-12 ">
            <p className="text-[3em] font-semibold ">
              New balance Men Running Sneakers
            </p>
            <p className="text-[1.4em]">
              Shoes that transform your body language and attitude.
            </p>
            <Button
              variant={"ghost"}
              className="border-b-2 mt-8 w-fit font-bold text-[1.2em]"
            >
              SHOP NOW
            </Button>
          </div>
          <div className="-mt-18">
            <img src="./big-shoes.png" />
          </div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-5 gap-x-4">
        <Button variant={"secondary"} className="py-6 col-span-1 bg-amber-400">
          MORE
        </Button>

        <div className="col-span-4  ">
          <div className="flex justify-between items-center bg-gray-100 px-4">
            <div className="flex justify-between max-w-[600px] w-full items-center">
              <p>13 Items</p>

              <div className="flex gap-x-5 items-center">
                <p>Sort By</p>
                <Select>
                  <SelectTrigger className="w-fit">
                    <SelectValue placeholder="Name" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Name</SelectItem>
                    <SelectItem value="dark">Category</SelectItem>
                    <SelectItem value="system">Brand</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-x-5 items-center">
                <p>Show</p>
                <Select>
                  <SelectTrigger className="w-fit">
                    <SelectValue placeholder="12" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">10</SelectItem>
                    <SelectItem value="dark">20</SelectItem>
                    <SelectItem value="system">30</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-x-4 items-center">
              <div className="hover:bg-gray-200 p-3">
                <Grid3x3 />
              </div>
              <div className="hover:bg-gray-200 p-3">
                <Menu />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mt-12">
            {data.map(
              (
                {
                  shoeType,
                  price,
                  originalPrice,
                  discount,
                  rating,
                  image,
                }: any,
                i
              ) => (
                <Cards
                  key={i}
                  shoeType={shoeType}
                  price={price}
                  originalPrice={originalPrice}
                  discount={discount}
                  rating={rating}
                  image={image}
                />
              )
            )}
          </div>

          <div className="flex justify-center gap-x-2 mt-12 bg-[#80808015]">
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className={` px-5 py-3 ${
                  i == 2 ? "bg-blue-600 text-white" : ""
                } hover:bg-blue-600 hover:text-white`}
              >
                {i + 1}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
