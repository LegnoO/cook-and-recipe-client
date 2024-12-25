"use client";

// ** React Imports
import { useState, ChangeEvent } from "react";

// ** Next Imports
import { useRouter, useSearchParams } from "next/navigation";

// ** Components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// ** Library Imports
import { useDebouncedCallback } from "use-debounce";

// ** Icons
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";

const QueryRecipe = () => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [isSelectOpen, setSelectOpen] = useState({
    name: false,
    category: false,
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const onSearchRecipe = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      params.set("search", event.target.value);
      router.push(`?${params.toString()}`);
    },
    300,
  );

  function handleToggleSelect(value: boolean, field: "name" | "category") {
    setSelectOpen((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleQuery(value: string) {
    const [sortBy, sortOrder] = value.split("_");
    params.set("sortBy", sortBy);
    params.set("sortOrder", sortOrder);
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="flex w-full items-center justify-between gap-2">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search recipes..."
          onChange={onSearchRecipe}
          defaultValue={searchParams.get("search") || ""}
          type="search"
          className="max-w-3xl pl-8"
        />
      </div>
      <Popover
        open={isPopoverOpen}
        onOpenChange={(open) => {
          if (open) {
            setPopoverOpen(open);
          } else {
            if (!isSelectOpen.name && !isSelectOpen.category) {
              setPopoverOpen(false);
            }
          }
        }}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full active:scale-100 md:w-auto">
            <SlidersHorizontal className="mr-1 h-4 w-4" />
            Filter
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Sort by</h4>
              <Select
                open={isSelectOpen.name}
                onOpenChange={(open) => {
                  handleToggleSelect(open, "name");
                }}
                defaultValue={searchParams.get("sort") || "name_asc"}
                onValueChange={handleQuery}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose sorting" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name_asc">Alphabetical (A-Z)</SelectItem>
                  <SelectItem value="name_desc">Alphabetical (Z-A)</SelectItem>
                  <SelectItem value="date_desc">Newest</SelectItem>
                  <SelectItem value="date_asc">Oldest</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Category</h4>
              <Select
                open={isSelectOpen.category}
                onOpenChange={(open) => {
                  handleToggleSelect(open, "category");
                }}
                defaultValue={searchParams.get("category") || "all"}
                onValueChange={handleQuery}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="drinks">Đồ uống</SelectItem>
                  <SelectItem value="main">Món chính</SelectItem>
                  <SelectItem value="desserts">Tráng miệng</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
export default QueryRecipe;
