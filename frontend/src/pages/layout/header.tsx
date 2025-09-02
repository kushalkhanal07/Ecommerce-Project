import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { listCart } from "@/service/cart";
import { useQuery } from "@tanstack/react-query";
import {
  Key,
  Loader,
  LogIn,
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [show, setShow] = useState(false);
  function handleShow() {
    setShow((prev) => !prev);
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["cart"],
    queryFn: listCart,
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
    <div className="shadow-sm  py-4">
      <header className="h-[50px] max-w-[1300px] mx-auto flex justify-between items-center px-2 text-[0.8em] sm:text-[1em]">
        <Select>
          <SelectTrigger className="w-[70px]">
            <SelectValue placeholder="En" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="En">En</SelectItem>
            <SelectItem value="Nep">Nep</SelectItem>
            <SelectItem value="Hin">Hin</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-x-8 lg:gap-x-12">
          <div className="hidden sm:flex gap-x-2 items-center ">
            <User size={18} />
            My profile
          </div>
          <div className="flex gap-x-4 items-center ">
            <Link to="/cart" className="relative">
              <ShoppingCart size={18} />
              <span className="bg-red-600 absolute -top-2 px-[6px] text-white -right-3 rounded-full text-[0.8em]">
                {data.length}
              </span>
            </Link>

            <p>Items</p>
          </div>

          <div className="relative hidden md:block">
            <Input className="pl-8" />
            <div className="absolute inset-y-0 flex items-center pl-2 pointer-events-none">
              <Search size={18} />
            </div>
          </div>
          <div className="hidden sm:flex gap-x-2">
            <Link to="/login">
              <Button className="cursor-pointer" variant={"outline"}>
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button className="cursor-pointer" variant={"outline"}>
                Register
              </Button>
            </Link>
          </div>

          <div className="block sm:hidden  cursor-pointer  relative">
            {!show ? <Menu onClick={handleShow} /> : <X onClick={handleShow} />}
            {show && (
              <div className="absolute w-[200px]  bg-white shadow-md border-t backdrop-blur-3xl rounded-md overflow-hidden right-0 top-8 flex gap-2 flex-col p-4 ">
                <Link
                  to="/login"
                  className="hover:bg-gray-100 font-semibold bg-gray rounded-sm px-3 py-2 flex gap-x-2 items-center"
                >
                  <LogIn size={15} /> Login
                </Link>
                <Link
                  to="/register"
                  className="hover:bg-gray-200 font-semibold bg-gray rounded-sm px-3 py-2 flex gap-x-2 items-center"
                >
                  <Key size={15} />
                  Register
                </Link>
                <Link
                  to="/user"
                  className="hover:bg-gray-200 font-semibold bg-gray rounded-sm px-3 py-2 flex gap-x-2 items-center"
                >
                  <User size={15} />
                  Profile
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex justify-between max-w-[1300px] mx-auto py-6 px-2 font-semibold text-[0.8em] sm:text-[1.2em]">
        <div className="flex-1 ">
          <Link to="/shop">SHOE - STORE</Link>
        </div>
        <div className="flex gap-x-6 sm:gap-x-12 justify-between flex-1 ">
          <Link to="/">HOME</Link>
          {/* <Link to="/product">SNEAKERS</Link> */}
          <Link to="/contact">CONTACT</Link>
        </div>
      </div>
    </div>
  );
}
