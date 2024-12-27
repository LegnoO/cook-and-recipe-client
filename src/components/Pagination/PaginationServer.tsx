// ** React Imports
import { Fragment } from "react";

// ** Next Imports
import Link from "next/link";

// ** Icons
import { ChevronLeft, ChevronRight } from "lucide-react";

// ** Lib
import { cn, createSearchParams } from "@/lib/utils";

type Props = {
  totalPages: number;
  currentPage: number;
};

const PaginationServer = ({ totalPages, currentPage }: Props) => {
  const firstPage = 1;
  const maxVisiblePages = 7;
  const linkClass =
    "outline-none hover:bg-secondary/80 flex h-9 w-9 items-center justify-center rounded-md border  text-sm font-medium ";

  function getHref(index: number) {
    const params = createSearchParams({ index });
    return `?${params}`;
  }

  const renderEllipsis = (key: string) => (
    <li key={`${key}-${currentPage}`}>
      <span className={cn(linkClass, "hover:bg-unset border-none text-base")}>
        ...
      </span>
    </li>
  );

  const renderChevron = (pageIndex: number, direction: "left" | "right") => (
    <li key={`chevron-${direction}-${pageIndex}`}>
      <Link
        href={getHref(pageIndex)}
        scroll={false}
        className={cn(linkClass, "cursor-pointer", {
          "pointer-events-none opacity-50":
            currentPage === (direction === "left" ? firstPage : totalPages),
        })}>
        {direction === "left" ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Link>
    </li>
  );

  const renderPageButton = (pageIndex: number, isActive: boolean) => (
    <li key={pageIndex}>
      <Link
        scroll={false}
        href={getHref(pageIndex)}
        className={cn(linkClass, {
          "cursor-pointer bg-primary text-primary-foreground hover:bg-primary/80":
            isActive,
        })}>
        {pageIndex}
      </Link>
    </li>
  );

  const renderPaginationItems = () => {
    const pages = [];

    const isStartRange = currentPage < 5;
    const isEndRange = totalPages - currentPage < 4;

    if (totalPages <= maxVisiblePages) {
      return (
        <Fragment>
          {renderChevron(Math.max(1, currentPage - 1), "left")}
          {Array.from({ length: totalPages }, (_, index) =>
            renderPageButton(index + 1, currentPage === index + 1),
          )}
          {renderChevron(Math.min(totalPages, currentPage + 1), "right")}
        </Fragment>
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

    pages.push(renderChevron(Math.max(1, currentPage - 1), "left"));
    pages.push(renderPageButton(firstPage, currentPage === firstPage));
    if (!isStartRange) {
      pages.push(renderEllipsis("ellipsis-left"));
    } else {
      pages.push(
        renderPageButton(firstPage + 1, firstPage + 1 === currentPage),
      );
    }
    for (let i = startIndex; i < endIndex; i++) {
      pages.push(renderPageButton(i, i === currentPage));
    }

    if (!isEndRange) {
      pages.push(renderEllipsis("ellipsis-right"));
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
export default PaginationServer;

PaginationServer.displayName = "Pagination Server";
