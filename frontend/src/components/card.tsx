import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Star } from "lucide-react"
export default function Cards({ shoeType, price, originalPrice, discount, rating, image }: any) {
  return (
    <div>
      <Card className="p-2 ">
        <CardHeader className="p-2">
          <div><img src={image} alt={shoeType} /></div>
          <CardTitle className="font-bold text-[1.1em]">{shoeType}</CardTitle>
          <CardDescription className="flex">{[...Array(5)].map((_, i) => <Star size={15} key={i} className={i < rating ? "text-yellow-300 fill-yellow-500" : "text-gray-300"} />)}</CardDescription>
        </CardHeader>

        <CardFooter className="-mt-3 px-2">
          <div className="flex gap-x-4">
            <p className="text-[#4440FF]">{price}</p>
            <p className="line-through">{originalPrice}</p>
            <p className="text-red-500">{discount}</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
