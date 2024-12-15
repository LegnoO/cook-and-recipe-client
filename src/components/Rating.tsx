"use client";
// ** React Imports
import { useState } from "react";

// ** Components

// ** Icons
import { Star } from "lucide-react";

// ** Lib
import { cn } from "@/lib/utils";

// ** Types
type Props = {
  disableSelect?: boolean;
  defaultValue?: number;
  readOnly?: boolean;
  max?: number;
};
const Rating = ({
  max = 5,
  defaultValue = 0,
  disableSelect = false,
  readOnly = false,
}: Props) => {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(defaultValue);

  function getStarColor(star: number) {
    if (star <= selectedRating || star <= hoveredRating) {
      return "fill-primary stroke-primary";
    }

    return "fill-muted-foreground stroke-muted-foreground";
  }

  function handleClick(star: number) {
    if (!readOnly && !disableSelect) {
      setSelectedRating(star);
    }
  }
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }, (_, index) => index + 1).map((star) => (
        <Star
          key={star}
          onMouseEnter={() => !readOnly && setHoveredRating(star)}
          onMouseLeave={() => !readOnly && setHoveredRating(0)}
          onClick={() => handleClick(star)}
          className={cn("h-4 w-4 transition-colors", getStarColor(star), {
            "cursor-pointer": !readOnly,
          })}
        />
      ))}
    </div>
  );
};

export default Rating;
