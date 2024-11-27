import { useNavigate } from "react-router-dom";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuthStore } from "@/store/auth.store";

import { signIn } from "@/services/api/auth.service";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInFormData = z.infer<typeof signInSchema>;

const SignInForm = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async ({ email, password }: SignInFormData) => {
    try {
      const data = await signIn(email, password);

      if (data.success) {
        setAuth(data.token);

        toast.success("Successfully Signed In");
        navigate("/dashboard");
      } else {
        toast.error(data.message || "Failed to sign in");
      }
    } catch (err: any) {
      console.error("Sign-in error:", err.message);
      toast.error(err.message || "Failed to sign in");
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader className="space-y-3">
          <CardTitle>Welcome back,</CardTitle>
          <CardDescription>Signin to continue...</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                {...register("email")}
                className={`${errors.email ? "border-destructive" : ""}`}
              />
              {errors.email && (
                <p className="text-destructive text-xs">
                  {errors.email.message}
                </p>
              )}
              <Input
                type="password"
                placeholder="Password"
                {...register("password")}
                className={`${errors.password ? "border-destructive" : ""}`}
              />
              {errors.password && (
                <p className="text-destructive text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button
              disabled={isSubmitting}
              type="submit"
              size={"lg"}
              className="w-full flex items-center"
            >
              {isSubmitting && (
                <span>
                  <Loader2 className="size-4 animate-spin" />
                </span>
              )}
              Sign In
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center w-full text-muted-foreground">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/auth/sign-up")}
              className="underline cursor-pointer font-semibold text-[#646cff]"
            >
              Sign Up
            </span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignInForm;
