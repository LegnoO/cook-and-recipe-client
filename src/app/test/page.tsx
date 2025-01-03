"use client";

import Rating from "@/components/Rating";

export default function Test() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      {/* <div className="relative">
        <label className="group absolute w-1/2 overflow-hidden">
          <Star className="fill-muted-foreground stroke-muted-foreground group-hover:fill-primary group-hover:stroke-primary" />
        </label>
        <label className="group">
          <Star className="fill-muted-foreground stroke-muted-foreground group-hover:fill-primary group-hover:stroke-primary" />
        </label>
      </div> */}
      <Rating disableSelect readOnly defaultValue={null} />
    </div>
  );
}
