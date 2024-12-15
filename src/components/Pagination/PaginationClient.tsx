"use client";

// ** Icons
import { ChevronLeft, ChevronRight } from "lucide-react";

// ** Lib
import { cn } from "@/lib/utils";

type Props = {
  onPageChange: (page: number) => void;
  totalPages: number;
  currentPage: number;
};

const PaginationClient = ({ onPageChange, totalPages, currentPage }: Props) => {
  const firstPage = 1;
  const maxVisiblePages = 7;
  const buttonClass =
    "outline-none hover:bg-secondary/80 flex h-9 w-9 items-center justify-center rounded-md border  text-sm font-medium ";

  const renderEllipsis = () => (
    <li>
      <span className={cn(buttonClass, "hover:bg-unset border-none text-base")}>
        ...
      </span>
    </li>
  );

  const renderChevron = (pageIndex: number, direction: "left" | "right") => (
    <li>
      <button
        type="button"
        className={cn(buttonClass, "cursor-pointer", {
          "pointer-events-none opacity-50":
            currentPage === (direction === "left" ? firstPage : totalPages),
        })}
        onClick={() => {
          onPageChange(pageIndex);
        }}>
        {direction === "left" ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </button>
    </li>
  );

  const renderPageButton = (pageIndex: number, isActive: boolean) => (
    <li key={pageIndex}>
      <button
        type="button"
        className={cn(buttonClass, {
          "cursor-pointer bg-primary text-primary-foreground hover:bg-primary/80":
            isActive,
        })}
        onClick={() => onPageChange(pageIndex)}>
        {pageIndex}
      </button>
    </li>
  );

  const renderPaginationItems = () => {
    const isStartRange = currentPage < 5;
    const isEndRange = totalPages - currentPage < 4;

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, index) =>
        renderPageButton(index + 1, currentPage === index + 1),
      );
    }

    function handleIndexRange() {
      let start = currentPage - 1;
      let end = currentPage + 2;

      if (isStartRange) {
        start = firstPage + 2;
        end = firstPage + 5;
        return [start, end];
      }

      if (isEndRange) {
        start = totalPages - 4;
        end = totalPages - 1;
        return [start, end];
      }

      return [start, end];
    }

    const [startIndex, endIndex] = handleIndexRange();
    const pages = [
      renderChevron(Math.max(1, currentPage - 1), "left"),
      renderPageButton(firstPage, currentPage === firstPage),
    ];

    if (!isStartRange) {
      pages.push(renderEllipsis());
    } else {
      pages.push(
        renderPageButton(firstPage + 1, firstPage + 1 === currentPage),
      );
    }
    for (let i = startIndex; i < endIndex; i++) {
      pages.push(renderPageButton(i, i === currentPage));
    }

    if (!isEndRange) {
      pages.push(renderEllipsis());
    } else {
      pages.push(
        renderPageButton(totalPages - 1, totalPages - 1 === currentPage),
      );
    }
    pages.push(renderPageButton(totalPages, currentPage === totalPages));
    pages.push(renderChevron(Math.min(totalPages, currentPage + 1), "right"));

    return pages;
  };

  return (
    <nav role="navigation" className="flex w-full justify-center">
      <ul className="flex items-center gap-1">{renderPaginationItems()}</ul>
    </nav>
  );
};
export default PaginationClient;

PaginationClient.displayName = "Pagination client";
