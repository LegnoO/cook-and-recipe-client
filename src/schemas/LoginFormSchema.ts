// ** Library
import { z } from "zod";

export const LoginFormSchema = z.object({
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

export type LoginFormData = z.infer<typeof LoginFormSchema>;
