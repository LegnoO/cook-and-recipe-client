"use client";
// ** React Imports
import { ReactNode } from "react";

// ** Next Imports
import Link from "next/link";

// ** React Imports
import { useState } from "react";

// ** Components
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// ** Icons

import {} from "lucide-react";

// ** Services
import { getUserInfo } from "@/services/authService";

// ** Types
type Props = {
  children: ReactNode;
};

const RecipeDetail = ({ children }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[calc(100%-2.5rem)] rounded-lg sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Sign In</DialogTitle>
          <DialogDescription>Sign in to access your account</DialogDescription>
        </DialogHeader>
        <>Test</>
      </DialogContent>
    </Dialog>
  );
};
export default RecipeDetail;
// UpdateOwnedRecipe;
