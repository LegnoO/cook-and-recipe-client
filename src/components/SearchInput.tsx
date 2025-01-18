"use client";

// ** React Imports
import { type ChangeEvent, type InputHTMLAttributes } from "react";

// ** Components
import { Input } from "@/components/ui/input";

// ** Icons
import { Search, Loader2 } from "lucide-react";

// ** Types
type Props = {
  onSearch?: (event: ChangeEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const SearchInput = ({
  isLoading,
  placeholder = "Search...",
  onSearch,
  ...props
}: Props) => {
  return (
    <div className="relative w-full">
      {isLoading ? (
        <Loader2 className="absolute left-2.5 top-2.5 h-4 w-4 animate-spin text-muted-foreground" />
      ) : (
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      )}
      <Input
        type="search"
        placeholder={placeholder}
        onChange={onSearch}
        className="pl-8"
        {...props}
      />
    </div>
  );
};
export default SearchInput;
