"use client";

// ** Components
import { Button } from "@/components/ui/button";

// ** Icons
import { Bookmark, Loader2 } from "lucide-react";

// ** Lib
import { cn } from "@/utils";

// ** Types
type Props = { isLoading?: boolean; bookmarked: boolean; onClick: () => void };

const BookMarkButton = ({ onClick, isLoading, bookmarked }: Props) => {
  if (isLoading)
    return (
      <button
        type="button"
        className="absolute right-2 top-2 flex h-9 w-9 cursor-default items-center justify-center rounded-full bg-background/90 p-1.5 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
      </button>
    );

  return (
    <Button
      onClick={onClick}
      size="icon"
      variant="ghost"
      className={cn(
        "absolute right-2 top-2 rounded-full bg-background/90 p-1.5 transition-colors hover:bg-background",
        {
          "bg-primary text-primary-foreground": bookmarked,
        },
      )}>
      <Bookmark className="h-4 w-4" />
    </Button>
  );
};

export default BookMarkButton;
