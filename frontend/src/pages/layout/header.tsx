import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="shadow-2xl  py-4">
      <header className='h-[50px] max-w-[1300px] mx-auto flex justify-between items-center '>
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

        <div className="flex gap-x-12">
          <div className="flex gap-x-2 items-center">
            <User size={18} />
            My profile
          </div>
          <div className="flex gap-x-4 items-center ">
            <div className="relative">
              <ShoppingCart size={18} />
              <span className="bg-red-600 absolute -top-2 px-[6px] text-white -right-3 rounded-full text-[0.8em]">2</span>
            </div>

            <p>Items</p>
          </div>

          <div className="relative">
            <Input className="pl-8" />
            <div className="absolute inset-y-0 flex items-center pl-2 pointer-events-none">
              <Search size={18} />
            </div>
          </div>

        </div>
      </header>
      
      <div className="flex justify-between max-w-[1300px] mx-auto py-6 font-semibold">
        <div className="flex-1 "><Link to="/">SHOE - STORE</Link></div>
        <div className="flex gap-x-12 justify-between flex-1 ">
          <Link to="/">HOME</Link>
          <Link to="/">SNEAKERS</Link>
          <Link to="/" >CONTACT</Link>
        </div>
      </div>
    </div>
  )
}
