// ** React Imports
import { ReactNode } from "react";

// ** Lib
import { cn } from "@/lib/utils";

type Props = { children: ReactNode; className?: string };

export const Scroll = ({ children, className }: Props) => {
  return <div className={cn("custom-scroll", className)}>{children}</div>;
};
