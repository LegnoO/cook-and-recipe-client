"use client";

// ** React Imports
import { ChangeEvent } from "react";

// ** Components
import { Input } from "@/components/ui/input";

// ** Icons
import { Search, Loader2 } from "lucide-react";

// ** Types
type Props = {
  placeholder?: string;
  onSearch?: (event: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  isLoading?: boolean;
};

const SearchInput = ({
  isLoading,
  name,
  placeholder = "Search...",
  onSearch,
}: Props) => {
  return (
    <div className="relative w-full">
      {isLoading ? (
        <Loader2 className="animate-spin absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      ) : (
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      )}
      <Input
        name={name}
        type="search"
        placeholder={placeholder}
        onChange={onSearch}
        className="pl-8"
      />
    </div>
  );
};
export default SearchInput;
