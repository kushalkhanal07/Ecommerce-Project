// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { RegisterFormData, registerSchema } from "@/lib/auth";
// import { useToast } from "@/hooks/use-toast";
// import { useMutation } from "@tanstack/react-query";
// import { userRegister } from "@/service/auth/login";

// const Register = () => {
//   const { toast } = useToast();
//   const navigate = useNavigate();

//   const form = useForm<RegisterFormData>({
//     resolver: zodResolver(registerSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//       phoneNumber:""
//     },
//   });

//   const onSubmit = (data: RegisterFormData) => {
//     // Simulate registration logic
//     mutation.mutate(data);

//     // Navigate to login after successful registration
//     // navigate("/login");
//   };

//   const mutation = useMutation({
//     mutationFn: userRegister,
//     onSuccess: () => {
//       toast({
//         title: "Login Successful",
//         description: "Welcome back! You have been logged in successfully.",
//       });
//     },
//     onError: () => {
//       toast({
//         title: "Login Failed",
//         description: "Invalid credentials. Please try again.",
//         // variant: "destructive", // highlights as an error
//       });
//     },
//   });

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-auth-background to-auth-background-secondary p-4">
//       <Card className="w-full max-w-md backdrop-blur-lg bg-glass-bg border-glass-border shadow-2xl">
//         <CardHeader className="text-center space-y-1">
//           <CardTitle className="text-2xl font-bold text-auth-card-foreground">
//             Create Account
//           </CardTitle>
//           <CardDescription className="text-muted-foreground">
//             Enter your information to create your account
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//               <FormField
//                 control={form.control}
//                 name="name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Full Name</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="Enter your full name"
//                         {...field}
//                         className="transition-all duration-300 focus:shadow-lg"
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Email</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="Enter your email"
//                         type="email"
//                         {...field}
//                         className="transition-all duration-300 focus:shadow-lg"
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Password</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="Enter your password"
//                         type="password"
//                         {...field}
//                         className="transition-all duration-300 focus:shadow-lg"
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="confirmPassword"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Confirm Password</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="Confirm your password"
//                         type="password"
//                         {...field}
//                         className="transition-all duration-300 focus:shadow-lg"
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="phoneNumber"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Confirm Password</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="Enter your number"
//                         type="number"
//                         {...field}
//                         className="transition-all duration-300 focus:shadow-lg"
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <Button
//                 type="submit"
//                 className="w-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
//                 disabled={form.formState.isSubmitting}
//               >
//                 {form.formState.isSubmitting
//                   ? "Creating account..."
//                   : "Create Account"}
//               </Button>
//             </form>
//           </Form>
//           <div className="mt-6 text-center">
//             <p className="text-sm text-muted-foreground">
//               Already have an account?{" "}
//               <Link
//                 to="/login"
//                 className="font-medium text-auth-accent hover:underline transition-colors"
//               >
//                 Sign in
//               </Link>
//             </p>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Register;

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { userRegister } from "@/service/auth/login";
import { z } from "zod";
import { registerSchema } from "@/lib/auth";
import { toast } from "sonner";

// Updated schema with phone number validation

export type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    mutation.mutate(data);
  };

  const mutation = useMutation({
    mutationFn: userRegister,
    onSuccess: () => {
      toast.success("User registered successfully", {
        description: "Registered.",
      });
      navigate("/login");
    },
    onError: (error: any) => {
      toast.error("Registered Failed", {
        description: "Invalid credentials. Please try again.",
      });
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md backdrop-blur-lg bg-white/80 border-gray-200 shadow-2xl">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Create Account
          </CardTitle>
          <CardDescription className="text-gray-600">
            Enter your information to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        {...field}
                        className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        type="email"
                        {...field}
                        className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your phone number"
                        {...field}
                        className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your password"
                        type="password"
                        {...field}
                        className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Confirm your password"
                        type="password"
                        {...field}
                        className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full transition-all duration-300 bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
                disabled={form.formState.isSubmitting || mutation.isPending}
              >
                {form.formState.isSubmitting || mutation.isPending
                  ? "Creating account..."
                  : "Create Account"}
              </Button>
            </form>
          </Form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:underline transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
