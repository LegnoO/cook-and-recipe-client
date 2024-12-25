// ** React Imports
import { ButtonHTMLAttributes } from "react";

// ** Components
import { Button } from "./ui/button";

// ** Icons
import { Loader2 } from "lucide-react";

// ** Types
type Props = {
  label: string;
  disabled: boolean;
  isLoading: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const LoadingButton = ({ label, disabled, isLoading, ...props }: Props) => {
  return (
    <Button {...props} disabled={disabled}>
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />} {label}
    </Button>
  );
};

export default LoadingButton;
