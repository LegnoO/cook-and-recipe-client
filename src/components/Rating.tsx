"use client";

// ** React Imports
import { useState } from "react";

// ** Icons
import { Star } from "lucide-react";

// ** Lib
import { cn } from "@/utils";

// ** Types
type Props = {
  disableSelect?: boolean;
  defaultValue?: number | null;
  readOnly?: boolean;
  max?: number;
  onChange?: (star: number) => void;
  half?: boolean;
};

const Rating = ({
  half = false,
  max = 5,
  defaultValue = 0,
  disableSelect = false,
  readOnly = false,
  onChange,
}: Props) => {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(defaultValue || 0);

  function handleRatingChange(star: number) {
    if (!readOnly && !disableSelect) {
      setSelectedRating(star);
      if (onChange) onChange(star);
    }
  }

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }, (_, index) => index + 1).map((star) => (
        <span key={`star ${star}`} className="relative">
          {half && (
            <label
              className={cn(
                "absolute w-1/2 overflow-hidden text-muted-foreground transition-colors",
                {
                  "cursor-pointer": !readOnly,
                  "text-primary":
                    star - 0.5 <= selectedRating || star - 0.5 <= hoveredRating,
                },
              )}>
              <Star
                key={star}
                onMouseEnter={() => !readOnly && setHoveredRating(star - 0.5)}
                onMouseLeave={() => !readOnly && setHoveredRating(0)}
                onClick={() => handleRatingChange(star - 0.5)}
                className="h-4 w-4 select-none fill-current stroke-current"
              />
            </label>
          )}

          <label
            className={cn("h-4 w-4 text-muted-foreground transition-colors", {
              "cursor-pointer": !readOnly,
              "text-primary": star <= selectedRating || star <= hoveredRating,
            })}>
            <Star
              key={star}
              onMouseEnter={() => !readOnly && setHoveredRating(star)}
              onMouseLeave={() => !readOnly && setHoveredRating(0)}
              onClick={() => handleRatingChange(star)}
              className="h-4 w-4 select-none fill-current stroke-current"
            />
          </label>
        </span>
      ))}
    </div>
  );
};

export default Rating;
