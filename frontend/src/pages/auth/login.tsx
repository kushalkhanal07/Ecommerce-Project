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
import { LoginFormData, loginSchema } from "@/lib/auth";
import { useMutation } from "@tanstack/react-query";
import { userLogin } from "@/service/auth/login";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: userLogin,
    onSuccess: (data) => {
      console.log(data);
      localStorage.setItem("user", data.success);
      toast.success("User Login Successful", {
        description: "Welcome back! You have been logged in successfully.",
      });

      setTimeout(() => {
        navigate("/checkout");
      }, 1000);
    },
    onError: (err) => {
      console.log(err.message);
      toast.error("Login Failed", {
        description: "Invalid credentials. Please try again.",
      });
    },
  });

  const onSubmit = (data: LoginFormData) => {
    mutation.mutate(data);

    // Navigate to dashboard or home after successful login
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-auth-background to-auth-background-secondary p-4">
      <Card className="w-full max-w-md backdrop-blur-lg bg-glass-bg border-glass-border shadow-2xl">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl font-bold text-auth-card-foreground">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                        className="transition-all duration-300 focus:shadow-lg"
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
                        className="transition-all duration-300 focus:shadow-lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </Form>
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-auth-accent hover:underline transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
