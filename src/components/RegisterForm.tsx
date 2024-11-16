"use client";

// ** Next Imports
import Link from "next/link";

// ** React Imports
import { useState } from "react";

// ** Components
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Logo } from "./ui/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// ** Library Imports
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Eye, EyeOff } from "lucide-react";

// ** Hooks
import { useToast } from "@/hooks/useToast";

// ** Utils

import { typography } from "./Primitives";

// ** Services
import { getUserInfo } from "@/services/authService";
import { useAuthContext } from "@/context/AuthProvider";

// ** Schema
const formSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

const RegisterForm = () => {
  const { login, setUser } = useAuthContext();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(dataSubmit: FormValues) {
    console.log("🚀 ~ onSubmit ~ dataSubmit:", dataSubmit);
    // try {
    //   setLoading(true);
    //   setError("");
    //   await login(dataSubmit);
    //   const userInfo = await getUserInfo();
    //   setUser(userInfo);
    // } catch (error) {
    //   setError((prev) => (typeof error === "string" ? error : prev));
    // } finally {
    //   setLoading(false);
    // }
  }

  function togglePasswordVisibility(
    state: "showPassword" | "showConfirmPassword",
  ) {
    if (state === "showPassword") {
      setShowPassword((prev) => !prev);
    } else {
      setShowConfirmPassword((prev) => !prev);
    }
  }

  return (
    <Card className="w-full rounded-lg border-none shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl">Sign up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Form {...form}>
            <form
              noValidate
              autoComplete="off"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6">
              <FormField
                name="fullName"
                control={form.control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Legno" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                control={form.control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() =>
                            togglePasswordVisibility("showPassword")
                          }
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }>
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-500" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-500" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="confirmPassword"
                control={form.control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() =>
                            togglePasswordVisibility("showConfirmPassword")
                          }
                          aria-label={
                            showConfirmPassword
                              ? "Hide password"
                              : "Show password"
                          }>
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-500" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-500" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isLoading} className="w-full" type="submit">
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Create an account"
                )}
              </Button>
              {error && <p className="text-destructive">{error}</p>}
              <p className="text-center">
                Already have an account?{" "}
                <Link href="#" className="underline">
                  Sign in
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};
export default RegisterForm;
