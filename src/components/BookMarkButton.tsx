// ** Components
import { Button } from "@/components/ui/button";

// ** Icons
import { Bookmark } from "lucide-react";

// ** Lib
import { cn } from "@/utils";

const BookMarkButton = () => {
  return (
    <Button
      size="icon"
      variant="ghost"
      className={cn(
        "absolute right-2 top-2 rounded-full bg-background/90 p-1.5 transition-colors hover:bg-background",
        {
          "bg-primary text-primary-foreground": false,
        },
      )}>
      <Bookmark className="h-4 w-4" />
    </Button>
  );
};

export default BookMarkButton;
