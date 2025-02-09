"use client";

// ** React Imports
import { ChangeEvent } from "react";

// ** Next Imports
import { useSearchParams } from "next/navigation";

// ** Components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

// ** Library Imports
import { useRouter } from "nextjs-toploader/app";
import { useDebouncedCallback } from "use-debounce";

// ** Icons
import { Search } from "lucide-react";

const QueryChef = () => {
  const chefLevel = ["Beginner", "Home cook", "Professional", "Master Chef"];
  const router = useRouter();
  const searchParams = useSearchParams();

  function getQueryValue(field: "sortOrder" | "level") {
    if (field === "sortOrder") {
      const sortOrder = searchParams.get("sortOrder") || "asc";
      return sortOrder;
    }

    if (field === "level") {
      return searchParams.get("level") || "all";
    }
  }

  const onSearchRecipe = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value.trim();
      const params = new URLSearchParams(searchParams);

      if (value) {
        params.set("fullName", value);
      } else {
        params.delete("fullName");
      }

      router.push(`?${params.toString()}`, {
        scroll: false,
      });
    },
    300,
  );

  function handleQuery(value: string, field: "level" | "sortOrder") {
    const params = new URLSearchParams(searchParams);
    if (field === "sortOrder") {
      params.set("sortOrder", value);
    }

    if (field === "level") {
      if (value === "all") {
        params.delete("level");
      } else {
        params.set("level", value);
      }
    }
    router.push(`?${params.toString()}`, {
      scroll: false,
    });
  }

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search chef..."
          onChange={onSearchRecipe}
          defaultValue={searchParams.get("fullName") || ""}
          type="search"
          className="max-w-3xl pl-8"
        />
      </div>
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        {chefLevel && (
          <Select
            defaultValue={getQueryValue("level")}
            onValueChange={(value) => handleQuery(value, "level")}>
            <SelectTrigger>
              <SelectValue placeholder="Select Chef Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Select Chef Level</SelectItem>
              {chefLevel.map((level, index) => (
                <SelectItem key={index} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <Select
          value={getQueryValue("sortOrder")}
          defaultValue={getQueryValue("sortOrder")}
          onValueChange={(value) => handleQuery(value, "sortOrder")}>
          <SelectTrigger>
            <SelectValue placeholder="Choose sorting" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Newest</SelectItem>
            <SelectItem value="desc">Oldest</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
export default QueryChef;
