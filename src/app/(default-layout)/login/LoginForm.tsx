"use client";

// ** Next Imports
import Link from "next/link";

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

// ** Library Imports
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";

// ** Hooks
import { useToast } from "@/hooks/useToast";

// ** Services
import { login, getUserInfo } from "@/services/authService";
import { useAuthContext } from "@/context/AuthProvider";

// ** Lib
import { setCookie } from "@/lib/utils/cookies";
import { getItemLocalStorage } from "@/lib/utils";

// ** Schema
const formSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .min(5, "Email must be at least 5 characters long")
    .max(100, "Email must be at most 100 characters long"),
  password: z
    .string()
    .min(3, "Password must be at least 3 characters long")
    .max(255, "Password must be at most 255 characters long"),
  rememberMe: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

const LoginForm = () => {
  const router = useRouter();
  const { setUser } = useAuthContext();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const form = useForm<FormValues>({
    defaultValues: {
      email: "legno@gmail.com",
      password: "admin",
      rememberMe: getItemLocalStorage<boolean>("rememberMe") || false,
    },
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(dataSubmit: FormValues) {
    setLoading(true);
    if (error) setError("");

    try {
      const accessToken = await login(dataSubmit);
      setCookie("accessToken", accessToken, {
        path: "/",
        secure: true,
        sameSite: "none",
      });
      const userInfo = await getUserInfo();
      setUser(userInfo);
      router.back();
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  function togglePasswordVisibility() {
    setShowPassword((prev) => !prev);
  }

  return (
    <Card className="w-full rounded-lg border-none shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">Login</CardTitle>
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
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm leading-none">
                            Remember Me
                          </FormLabel>
                        </div>
                      </FormItem>
                    );
                  }}
                />

                <Link href="#" className="text-sm font-medium">
                  Forgot Password?
                </Link>
              </div>
              <Button disabled={isLoading} className="w-full" type="submit">
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Log in"
                )}
              </Button>
              {error && <p className="text-destructive">{error}</p>}
              <p className="text-center">
                Not registered yet?{" "}
                <Link
                  href="#"
                  className="text-sm font-medium leading-none underline">
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
