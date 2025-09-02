import { useState } from "react";
import { Button } from "@/components/ui/button";

import { CartItem } from "@/components/CartItem";
import { VoucherCode } from "@/components/VoucherCode";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { BanknoteIcon, CreditCard, Loader } from "lucide-react";
import { PaypalIcon } from "@/components/PaymentIcons";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { listCart } from "@/service/cart";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const paymentMethods: any = [
  {
    id: "card",
    name: "Credit Card or Debit",
    icon: <CreditCard className="w-6 h-6 text-blue " />,
  },
  {
    id: "paypal",
    name: "Paypal",
    icon: <PaypalIcon />,
  },
  {
    id: "bank",
    name: "Bank Transfer",
    icon: <BanknoteIcon className="w-6 h-6 text-blue " />,
  },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      image: "/shoe1.png",
      name: "MEN CASUAL",
      price: 499,
      quantity: 2,
    },
    {
      id: "2",
      image: "/shoe2.png",
      name: "UNISEX CASUAL",
      price: 499,
      quantity: 2,
    },
  ]);

  const [couponApplied, setCouponApplied] = useState(false);
  const shippingFee = 20;

  const handleRemoveItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleApplyVoucher = (code: string) => {
    // Simple voucher logic - in real app this would call an API
    if (code.toLowerCase() === "save20") {
      setCouponApplied(true);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = couponApplied ? subtotal * 0.9 : 0; // 90% discount for demo
  const total = subtotal - discount + shippingFee;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["customers"],
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

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="min-h-screen ">
      <div className=" px-4 py-8 ">
        {/* Header */}
        <div className="grid grid-cols-8  gap-4 py-4 border-b font-medium text-[0.7em] sm:text-[0.9em] lg:text-[1em] ">
          <div className="col-span-4">PRODUCT</div>
          <div className=" col-span-1">PRICE</div>
          <div className=" col-span-2">QTY</div>
          <div className="col-span-1">UNIT PRICE</div>
        </div>

        {/* Cart Items */}
        <div className="space-y-2 text-[0.7em] sm:text-[0.9em] lg:text-[1em]">
          {data?.length ? (
            data?.map((item: any) => (
              <CartItem
                key={item?.product[0]?.id}
                id={item?.id}
                image={item?.product[0]?.images[0]}
                name={item?.product[0]?.name}
                price={item?.product[0]?.price}
                initialQuantity={item?.quantity}
                onRemove={handleRemoveItem}
                onQuantityChange={handleQuantityChange}
              />
            ))
          ) : (
            <p className="text-center text-lg text-gray-500 my-8">
              Add product to cart. No cart available
            </p>
          )}
        </div>

        {/* Voucher Section */}
        <div className="flex flex-wrap sm:flex-nowrap justify-center sm:justify-between gap-x-8">
          <div className="max-w-[400px] w-full">
            <VoucherCode onApply={handleApplyVoucher} />
          </div>

          {/* Summary */}
          <div className="mt-8 space-y-4 max-w-[400px] w-full">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">
                $
                {data.reduce((acc: number, current: any) => {
                  return acc + current.quantity * current.product[0]?.price;
                }, 0)}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping fee</span>
              <span className="font-medium">${0}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Coupon</span>
              <span className="font-medium">
                {couponApplied ? `- $${discount.toFixed(0)}` : "No"}
              </span>
            </div>

            <div
              className="w-full max-w-[800px] sm:max-w-[800px] sm:w-full p-0 gap-0 bg-white border-0 shadow-2xl flex justify-between
            "
            >
              <span>TOTAL</span>
              <span className="font-bold">
                $
                {data.reduce((acc: number, current: any) => {
                  return acc + current.quantity * current.product[0]?.price;
                }, 0)}
              </span>
            </div>

            <Dialog>
              <Link to="/checkout">
                <DialogTrigger className="w-full mt-6 bg-blue-600 text-primary-foreground hover:bg-blue-600 h-12 text-base font-medium cursor-pointer">
                  CheckOut
                </DialogTrigger>
              </Link>
              <DialogContent className="max-w-[800px] w-full p-0 gap-0 bg-white border-0 shadow-2xl">
                {/* Header */}
                <p className="text-[#4440FF] my-3 text-[2em] font-semibold text-center">
                  Make Payment{" "}
                </p>
                <div className="flex items-center justify-center">
                  <span className="bg-blue-500 p-1 px-3 text-white rounded-full">
                    1
                  </span>
                  <span className="w-6 h-1 bg-gray-200"></span>
                  <span className="bg-blue-500 p-1 px-3 text-white rounded-full">
                    2
                  </span>
                  <span className="w-6 h-1 bg-gray-200"></span>
                  <span className="bg-blue-500 p-1 px-3 text-white rounded-full">
                    3
                  </span>
                </div>
                <div className="px-5 my-5">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-8"
                    >
                      <div className="grid grid-cols-2 gap-5  ">
                        <div>
                          <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    placeholder="First Name"
                                    {...field}
                                    className="w-full bg-gray-100"
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div>
                          <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    placeholder="Last Name"
                                    {...field}
                                    className="bg-gray-100"
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-5  ">
                        <div>
                          <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Email Address"
                                    {...field}
                                    className="w-full bg-gray-100"
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div>
                          <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Address for delivery</FormLabel>
                                <FormControl>
                                  <Textarea className="bg-gray-100" />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1">
                        <div className="mb-4">
                          <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    placeholder="Mobile Phone"
                                    {...field}
                                    className="w-full bg-gray-100"
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div>
                          <p className="text-[#4440FF] font-semibold text-[1.2em]">
                            Select Method of Payment
                          </p>
                          <div className="flex flex-col gap-2 mt-4">
                            {paymentMethods.map(({ id, name, icon }: any) => {
                              return (
                                <div
                                  className="flex justify-between items-center bg-[#EBF0FF] px-4 py-5 text-[0.8em] font-bold"
                                  key={id}
                                >
                                  <div className="flex gap-5 items-center">
                                    {icon}
                                    <p>{name}</p>
                                  </div>
                                  <Checkbox className="w-5 h-5 border-gray-400" />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-center">
                        <Button
                          type="submit"
                          className="bg-[#4440FF] text-white hover:bg-[#4440FF] py-6 px-12"
                        >
                          Go to Payment
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
