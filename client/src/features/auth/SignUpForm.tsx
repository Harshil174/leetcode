import { useNavigate } from "react-router-dom";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuthStore } from "@/store/auth.store";

import { signUp } from "@/services/auth.service";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";

import { Loader2 } from "lucide-react";

const signUpSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUpForm = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async ({ name, email, password }: SignUpFormData) => {
    try {
      const data = await signUp(name, email, password);

      if (data.success) {
        setAuth(data.token);

        toast.success("Successfully Signed In");
        navigate("/dashboard");
      } else {
        toast.error(data.message || "Failed to sign in");
      }
    } catch (err: any) {
      console.error("Sign-up error:", err.message);
      toast.error(err.message || "Failed to sign up");
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader className="space-y-3">
          <CardTitle>Create An Account,</CardTitle>
          <CardDescription>Signup to continue...</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Input
                placeholder="Name"
                {...register("name")}
                className={`${errors.name ? "border-destructive" : ""}`}
              />
              {errors.name && (
                <p className="text-destructive text-xs">
                  {errors.name.message}
                </p>
              )}
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
                  <Loader2 className="size-4 animate-spin " />
                </span>
              )}
              Sign Up
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center w-full text-muted-foreground">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/auth/sign-in")}
              className="underline cursor-pointer font-semibold text-[#646cff]"
            >
              Sign in
            </span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUpForm;
