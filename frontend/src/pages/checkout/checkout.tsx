import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  CreditCard,
  Phone,
  MapPin,
  ShoppingBag,
  Loader2,
  BanknoteIcon,
  Loader,
} from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { PaypalIcon } from "@/components/PaymentIcons";
import { Checkbox } from "@/components/ui/checkbox";
import { listCart } from "@/service/cart";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCustomer } from "@/service/customer";
import { addOrder } from "@/service/order";
import { toast } from "sonner";

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

const checkoutSchema = z.object({
  // Card Details
  cardNumber: z
    .string()
    .min(19, "Card number must be 16 digits")
    .max(19, "Card number must be 16 digits")
    .regex(/^\d{4} \d{4} \d{4} \d{4}$/, "Invalid card number format"),
  expiryDate: z
    .string()
    .min(5, "Expiry date required")
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date format (MM/YY)"),
  cvv: z
    .string()
    .min(3, "CVV must be 3-4 digits")
    .max(4, "CVV must be 3-4 digits")
    .regex(/^\d{3,4}$/, "CVV must contain only numbers"),
  cardholderName: z
    .string()
    .min(2, "Cardholder name is required")
    .max(50, "Cardholder name too long"),

  // Contact Details
  phoneNumber: z
    .string()
    .min(10, "Phone number is required")
    .regex(/^\+?[\d\s\-\(\)]{10,}$/, "Invalid phone number format"),

  // Delivery Address
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  streetAddress: z.string().min(5, "Street address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State/Province is required"),
  postalCode: z.string().min(5, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const Checkout = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: "",
      phoneNumber: "",
      firstName: "",
      lastName: "",
      streetAddress: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
  });

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  const {
    data: datas,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: listCart,
  });

  const {
    data: userData,
    isLoading: isLoader,
    isError: showError,
    error: errors,
  } = useQuery({
    queryKey: ["getCustomer"],
    queryFn: getCustomer,
  });

  const mutation = useMutation({
    mutationFn: addOrder,
    onSuccess: (data) => {
      toast.success("Order Created successfully");
      form.reset();
    },
    onError: () => {
      toast.error("Create Order failed");
    },
  });

  if (isLoading || isLoader) {
    return (
      <div className="flex justify-center items-center h-[600px]">
        <Loader size={25} className="animate-spin" />
      </div>
    );
  }

  if (isError || showError) {
    return <div>{error?.message}</div>;
  }

  console.log(datas);

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true);
    // Simulate API call
    //     {
    //   productId: string;
    //   productName: string;
    //   quantity: number;
    //   price: number;
    //   totalPrice: number;
    // }
    console.log("===", datas);
    const finalData = datas.map(({ quantity, product }: any) => {
      return {
        productId: product[0].id,
        productName: product[0].name,
        quantity,
        price: product[0].price,
        totalPrice: product[0].price,
      };
    });

    // };
    const details = {
      userId: userData?.user?.id,
      items: finalData,
      shippingAddress: data.streetAddress,
      paymentMethod: "stripe",
      remarks: "Good system",
    };
    mutation.mutate(details);
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <p className="text-gray-600">Complete your order with secure payment</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Payment Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Card Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            {...field}
                            onChange={(e) => {
                              const formatted = formatCardNumber(
                                e.target.value
                              );
                              field.onChange(formatted);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="expiryDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expiry Date</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="MM/YY"
                              maxLength={5}
                              {...field}
                              onChange={(e) => {
                                const formatted = formatExpiryDate(
                                  e.target.value
                                );
                                field.onChange(formatted);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="cvv"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CVV</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="123"
                              maxLength={4}
                              type="password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="cardholderName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cardholder Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Delivery Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Delivery Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="streetAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Main Street" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="New York" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State/Province</FormLabel>
                          <FormControl>
                            <Input placeholder="NY" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Code</FormLabel>
                          <FormControl>
                            <Input placeholder="10001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="us">United States</SelectItem>
                              <SelectItem value="ca">Canada</SelectItem>
                              <SelectItem value="uk">United Kingdom</SelectItem>
                              <SelectItem value="au">Australia</SelectItem>
                              <SelectItem value="de">Germany</SelectItem>
                              <SelectItem value="fr">France</SelectItem>
                              <SelectItem value="jp">Japan</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <Button
                type="submit"
                className="w-full h-12 text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing Order...
                  </>
                ) : (
                  "Complete Order"
                )}
              </Button>

              {/* <Dialog>
                <Link to="/checkout">
                  <DialogTrigger className="w-full mt-6 bg-blue-600 text-primary-foreground hover:bg-blue-600 h-12 text-base font-medium cursor-pointer">
                    CheckOut
                  </DialogTrigger>
                </Link>
                <DialogContent className="max-w-[800px] w-full p-0 gap-0 bg-white border-0 shadow-2xl">
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
                              name="firstName"
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
                              name="lastName"
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
                              name="phoneNumber"
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
                              name="streetAddress"
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
                              name="phoneNumber"
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
              </Dialog> */}
            </form>
          </Form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {datas.map(({ id, quantity, product }: any) => {
                  return (
                    <div key={id} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                          <img src={product[0].images} />
                        </div>
                        <div>
                          <p className="font-medium">{product[0].name}</p>
                          <p className="text-sm text-gray-500">
                            Qty: {quantity}
                          </p>
                        </div>
                      </div>
                      <span className="font-medium">
                        ${quantity * product[0].price}
                      </span>
                    </div>
                  );
                })}
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>
                    $
                    {datas.reduce((acc: number, current: any) => {
                      return acc + current.quantity * current.product[0].price;
                    }, 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>$0</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>No tax</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>$507.56</span>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-blue-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium">
                    Free shipping on orders over $50
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
