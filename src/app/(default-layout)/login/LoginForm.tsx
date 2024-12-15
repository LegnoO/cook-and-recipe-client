"use client";

// ** Next Imports
import Link from "next/link";
import { usePathname } from "next/navigation";

// ** React Imports
import { useState } from "react";

// ** Components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
} from "@/components/ui/form";
import NoSsr from "@/components/NoSsr";

// ** Library Imports
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";

// ** Context
import { useAuthContext } from "@/context/AuthProvider";

// ** Services
import { login, fetchUserInfo } from "@/services/authService";

// ** Lib
import { setCookie } from "@/lib/utils/cookies";
import { getDecodedParam, getItemLocalStorage } from "@/lib/utils";

// ** Schema
import { LoginFormValues, loginFormSchema } from "@/schemas/loginFormSchema";

const LoginForm = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { setUser } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "legno@gmail.com",
      password: "admin",
      rememberMe: getItemLocalStorage<boolean>("rememberMe") || false,
    },
    resolver: zodResolver(loginFormSchema),
  });

  async function onSubmit(dataSubmit: LoginFormValues) {
    setLoading(true);
    setErrorMessage("");

    try {
      const token = await login(dataSubmit);
      setCookie("accessToken", token, {
        path: "/",
        secure: true,
        sameSite: "none",
      });
      const userDetails = await fetchUserInfo();
      console.log("🚀 ~ onSubmit ~ userDetails:", userDetails);
      setUser(userDetails);
      const redirectUrl = getDecodedParam("returnTo");
      if (redirectUrl) {
        router.push(redirectUrl);
        return;
      }

      if (pathname === "/login") {
        router.push("/");
      } else {
        router.back();
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "An unexpected error occurred",
      );
    } finally {
      setLoading(false);
    }
  }

  function togglePasswordVisibility() {
    setShowPassword((prev) => !prev);
  }

  return (
    <Card className="w-full max-w-lg rounded-lg border-none shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Login to access your account</CardDescription>
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
                          placeholder="Enter your password"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full border-none px-3 py-2 hover:bg-transparent"
                          onClick={togglePasswordVisibility}
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
              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex items-center space-x-2">
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <NoSsr>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </NoSsr>
                          </FormControl>
                          <FormLabel className="text-sm leading-[0]">
                            Remember Me
                          </FormLabel>
                        </div>
                      </FormItem>
                    );
                  }}
                />

                <Link
                  replace
                  href="/forgot-password"
                  className="text-sm font-medium hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="space-y-2">
                <Button disabled={isLoading} className="w-full" type="submit">
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Log in"
                  )}
                </Button>
                {errorMessage && (
                  <p className="text-destructive">{errorMessage}</p>
                )}
              </div>
              <p className="text-center">
                Not registered yet?{" "}
                <Link
                  replace
                  href="/register"
                  className="text-sm font-medium leading-none hover:underline">
                  Create an account
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};
export default LoginForm;
