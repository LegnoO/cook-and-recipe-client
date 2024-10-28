"use client";

// ** Next Imports
import Link from "next/link";

// ** React Imports
import { useState } from "react";

// ** Components
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Logo } from "./ui/Icons";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/Dialog";

// ** Library Imports
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Eye, EyeOff } from "lucide-react";

// ** Hooks
import { useToast } from "@/hooks/useToast";

// ** Utils
import { LoginFormSchema, LoginFormData } from "@/schemas/LoginFormSchema";
import { typography } from "./Primitives";

// ** Services
import { getUserInfo } from "@/services/authService";
import { useAuthContext } from "@/context/AuthProvider";

const ButtonLoginForm = () => {
  const { login, setUser } = useAuthContext();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const form = useForm<LoginFormData>({
    defaultValues: {
      email: "legno@gmail.com",
      password: "admin",
      rememberMe: true,
    },
    resolver: zodResolver(LoginFormSchema),
  });

  async function onSubmit(dataSubmit: LoginFormData) {
    try {
      setLoading(true);
      setError("");
      await login(dataSubmit);
      const userInfo = await getUserInfo();
      setUser(userInfo);
    } catch (error) {
      setError((prev) => (typeof error === "string" ? error : prev));
    } finally {
      setLoading(false);
    }
  }

  function togglePasswordVisibility() {
    setShowPassword((prev) => !prev);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">Sign in</Button>
      </DialogTrigger>
      <DialogContent className="w-[calc(100%-2.5rem)] rounded-lg sm:max-w-[425px]">
        <DialogHeader className="text-center">
          <DialogTitle
            className={typography({
              display: "xs",
              className: "w-full text-center font-medium",
            })}>
            Login
          </DialogTitle>
          <DialogDescription
            className={typography({
              text: "md",
              className: "text-center text-tertiary",
            })}>
            Hi, welcome back
          </DialogDescription>
        </DialogHeader>
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
                      <Input placeholder="Enter your email" {...field} />
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
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
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

                <Link
                  href="#"
                  className={typography({
                    text: "sm",
                    className: "font-medium leading-none",
                  })}>
                  Forgot Password?
                </Link>
              </div>
              <Button disabled={isLoading} className="w-full" type="submit">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Log in"
                )}
              </Button>
              {error && <p className="text-destructive">{error}</p>}
              <p className="text-center">
                Not registered yet?{" "}
                <Link
                  href="#"
                  className={typography({
                    text: "sm",
                    className: "font-medium leading-none",
                  })}>
                  Create an account
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ButtonLoginForm;
