'use client'

import {} from "react";

// ** Components
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// ** Lib
import { cn } from "@/lib/utils";

type Props = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const PaginationCustom = ({ totalPages, currentPage, onPageChange }: Props) => {
  const renderPaginationItems = () => {
    let items = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              className="cursor-pointer"
              onClick={() => onPageChange(i)}
              isActive={currentPage === i}>
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      }
    } else {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            className={cn(currentPage !== 1 && "cursor-pointer")}
            onClick={() => onPageChange(1)}
            isActive={currentPage === 1}>
            1
          </PaginationLink>
        </PaginationItem>,
      );

      if (currentPage > 3) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              className="cursor-pointer"
              onClick={() => onPageChange(i)}
              isActive={currentPage === i}>
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      }

      if (currentPage < totalPages - 2) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }

      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            className={cn(currentPage !== totalPages && "cursor-pointer")}
            onClick={() => onPageChange(totalPages)}
            isActive={currentPage === totalPages}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return items;
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={
              currentPage === 1
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>
        {renderPaginationItems()}
        <PaginationItem>
          <PaginationNext
            className={
              currentPage === totalPages
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            aria-disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationCustom;
