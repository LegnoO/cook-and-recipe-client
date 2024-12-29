"use client";

// ** React Imports
import { useState, Dispatch, SetStateAction } from "react";

// ** Components
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import LoadingButton from "@/components/LoadingButton";

// ** Icons
import { MailWarning, Loader2 } from "lucide-react";

// ** Library Imports
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// ** Services
import { sendOtp, requestReset } from "@/services/client/authService";

// ** Schemas
const schema = z.object({
  otp: z.string({ required_error: "OTP is required" }).min(6, {
    message: "OTP must be 6 characters",
  }),
});

type FormData = z.infer<typeof schema>;

// ** Types
type Props = {
  onNextStep: () => void;
  email: string;
  setCodeId: Dispatch<SetStateAction<string>>;
};

const EmailStep = ({ email, setCodeId, onNextStep }: Props) => {
  const [message, setMessage] = useState(
    "A new verification code has been sent to your email.",
  );
  const [isLoading, setLoading] = useState(false);
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const {
    control,
    setError,
    formState: { errors },
    handleSubmit,
  } = form;

  async function handleResendRequest() {
    try {
      setMessage("");
      setLoading(true);
      await requestReset(email);
      setMessage("A new verification code has been sent to your email.");
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit({ otp }: FormData) {
    try {
      setMessage("");
      setLoading(true);
      const codeId = await sendOtp(otp);
      setCodeId(codeId);
      onNextStep();
    } catch (error) {
      if (error instanceof Error) setError("otp", { message: error.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex max-w-md flex-col gap-4">
      <div className="flex justify-center">
        <MailWarning className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-center text-2xl font-bold">Verify your email</h3>
      <p className="text-center text-sm text-gray-500">
        We sent a code to <b>{email}</b>
      </p>
      <Form {...form}>
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6">
          <FormField
            control={control}
            name="otp"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <InputOTP {...field} maxLength={6} pattern="^[0-9]*$">
                      <InputOTPGroup>
                        {Array.from({ length: 6 }, (_, index) => (
                          <InputOTPSlot
                            className="h-16 w-2/12"
                            key={index}
                            index={index}
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <div className="flex flex-col gap-1">
            <LoadingButton
              label="Continue"
              type="submit"
              isLoading={isLoading}
              disabled={Boolean(errors.otp) || isLoading}
            />
          </div>
        </form>
      </Form>
      <p className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
        {"Didn't receive the email?"}
        <span className="leading-none text-primary">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <u className="cursor-pointer" onClick={handleResendRequest}>
              Click to resend
            </u>
          )}
        </span>
      </p>
      {message && (
        <p className="text-center text-sm text-muted-foreground">{message}</p>
      )}
    </div>
  );
};

export default EmailStep;
