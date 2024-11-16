"use client";

// ** React Imports
import { ChangeEvent } from "react";

// ** Components
import { Input } from "@/components/ui/input";

// ** Icons
import { Search } from "lucide-react";

// ** Types
type Props = {
  placeholder?: string;
  onSearch?: (event: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
};

const SearchInput = ({ name, placeholder = "Search...", onSearch }: Props) => {
  return (
    <div className="relative w-full">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
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
