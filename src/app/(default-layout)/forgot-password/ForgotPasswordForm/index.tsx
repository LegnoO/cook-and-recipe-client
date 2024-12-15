"use client";

// ** React Imports
import { useState } from "react";

// ** Next Imports
import Link from "next/link";

// ** Components
import Stepper from "./Stepper";
import EmailStep from "./EmailStep";
import OTPStep from "./OTPStep";
import ResetPasswordStep from "./ResetPasswordStep";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";

// ** Library Imports
import { useRouter } from "nextjs-toploader/app";

// ** Icons
import { ArrowLeft, ShieldCheck } from "lucide-react";

const ForgotPasswordForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [codeId, setCodeId] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  function handleNextStep() {
    setCurrentStep(currentStep + 1);
  }

  function navigateTo(url: string) {
    router.replace(url);
  }

  function renderStepContent() {
    switch (currentStep) {
      case 1:
        return (
          <EmailStep
            email={email}
            setEmail={setEmail}
            onNextStep={handleNextStep}
          />
        );
      case 2:
        return (
          <OTPStep
            setCodeId={setCodeId}
            email={email}
            onNextStep={handleNextStep}
          />
        );
      case 3:
        return (
          <ResetPasswordStep codeId={codeId} onNextStep={handleNextStep} />
        );
      case 4:
        return (
          <div className="flex max-w-md flex-col gap-4">
            <div className="flex justify-center">
              <ShieldCheck className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-center text-2xl font-bold">All done!</h3>
            <p className="text-center text-sm text-gray-500">
              Your password has been reset.
            </p>

            <div className="mt-2 flex flex-col gap-2">
              <Button
                onClick={() => {
                  navigateTo("/login");
                }}>
                Login
              </Button>
              <Button
                className="text-foreground"
                variant="link"
                onClick={() => {
                  navigateTo("/");
                }}>
                Back to home
              </Button>
            </div>
          </div>
        );
    }
  }

  return (
    <div className="space-y-2">
      <Card className="rounded-lg border-none px-6 py-8 shadow-md">
        <CardHeader>
          <div className="mb-8">
            <Stepper currentStep={currentStep} maxStep={4} />
          </div>
        </CardHeader>
        <CardContent>{renderStepContent()}</CardContent>
        <CardFooter className="justify-center">
          {currentStep !== 4 && (
            <Link
              replace
              href="/login"
              className="mt-4 flex flex-1 items-center justify-center gap-1 text-sm text-primary">
              <ArrowLeft />
              Back to login
            </Link>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};
export default ForgotPasswordForm;
