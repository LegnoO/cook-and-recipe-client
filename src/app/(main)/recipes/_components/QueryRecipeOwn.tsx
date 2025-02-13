"use client";

// ** React Imports
import { useState, useCallback, ChangeEvent } from "react";

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
import { DateRangeCalendar } from "@/app/(management)/recipes/manage/_components/DateRangeCalendar";
import SelectCategory from "@/components/SelectCategory";

// ** Library Imports
import { useRouter } from "nextjs-toploader/app";
import { useDebouncedCallback } from "use-debounce";
import { DateRange } from "react-day-picker";

// ** Icons
import { Search } from "lucide-react";


const QueryRecipeOwn = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [fromDateParam, toDateParam] = [
    searchParams.get("fromDate"),
    searchParams.get("toDate"),
  ];
  const fromDate = fromDateParam ? new Date(fromDateParam) : new Date();
  const toDate = toDateParam ? new Date(toDateParam) : new Date();

 // const [categories, setCategories] = useState<Category[]>();

  const [isSelectOpen, setSelectOpen] = useState({
    name: false,
    category: false,
  });

  function getQueryValue(
    field: "sort" | "categoryId" | "verifyStatus" | "status",
  ) {
    if (field === "sort") {
      const sort = searchParams.get(field) || "name";
      const sortOrder = searchParams.get("sortOrder") || "asc";
      return `${sort}_${sortOrder}`;
    }

    return searchParams.get(field) || "all";
  }

  const debouncedSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("name", value);
    } else {
      params.delete("name");
    }
    router.push(`?${params.toString()}`, {
      scroll: false,
    });
  }, 300);

  const onSearchRecipe = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value.trim();
      debouncedSearch(value);
    },
    [debouncedSearch],
  );

  function handleToggleSelect(value: boolean, field: "name" | "category") {
    setSelectOpen((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleQuery(
    value: string | DateRange | undefined,
    field: "categoryId" | "sort" | "verifyStatus" | "status" | "date",
  ) {
    if (!value) return;

    const params = new URLSearchParams(searchParams);

    if (typeof value === "string") {
      if (value !== "all" && field !== "sort") {
        params.set(field, value);
      } else {
        params.delete(field);
      }

      if (field === "sort") {
        const [sortBy, sortOrder] = value.split("_");
        params.set("sortBy", sortBy);
        params.set("sortOrder", sortOrder);
      }
    } else if (field === "date") {
      if (value.from && value.to) {
        params.set("fromDate", value.from.toISOString());
        params.set("toDate", value.to.toISOString());
      } else {
        params.delete("fromDate");
        params.delete("toDate");
      }
    }

    router.push(`?${params.toString()}`, {
      scroll: false,
    });
  }


  return (
    <div className="flex flex-col flex-wrap gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search recipes..."
          onChange={onSearchRecipe}
          defaultValue={searchParams.get("name") || ""}
          type="search"
          className="max-w-3xl pl-8"
        />
      </div>
      <DateRangeCalendar
        date={{
          from: fromDate,
          to: toDate,
        }}
        onChange={(value: DateRange | undefined) => handleQuery(value, "date")}
      />
      <Select
        value={getQueryValue("sort")}
        defaultValue={getQueryValue("sort")}
        onValueChange={(value) => handleQuery(value, "sort")}>
        <SelectTrigger className="flex-1">
          <SelectValue placeholder="Choose sorting" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name_asc">Alphabetical (A-Z)</SelectItem>
          <SelectItem value="name_desc">Alphabetical (Z-A)</SelectItem>
          <SelectItem value="date_desc">Newest</SelectItem>
          <SelectItem value="date_asc">Oldest</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={getQueryValue("verifyStatus")}
        defaultValue={getQueryValue("verifyStatus")}
        onValueChange={(value) => handleQuery(value, "verifyStatus")}>
        <SelectTrigger className="flex-1">
          <SelectValue placeholder="Choose sorting" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Select Verify Status</SelectItem>
          <SelectItem value="verified">Verified</SelectItem>
          <SelectItem value="unverified">Unverified</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={getQueryValue("status")}
        defaultValue={getQueryValue("status")}
        onValueChange={(value) => handleQuery(value, "status")}>
        <SelectTrigger className="flex-1">
          <SelectValue placeholder="Choose sorting" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Select Status</SelectItem>
          <SelectItem value="true">Public</SelectItem>
          <SelectItem value="false">Private</SelectItem>
        </SelectContent>
      </Select>
      <SelectCategory
        className="flex-1"
        open={isSelectOpen.category}
        value={getQueryValue("categoryId")}
        onValueChange={(value) => handleQuery(value, "categoryId")}
        onOpenChange={(open) => {
          handleToggleSelect(open, "category");
        }}
      />
    </div>
  );
};
export default QueryRecipeOwn;
