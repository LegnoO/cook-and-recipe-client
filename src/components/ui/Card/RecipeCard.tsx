"use client";

// ** Next Imports
import Image, { ImageLoaderProps } from "next/image";

// ** Components
import { typography } from "@/components/Primitives";

const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  const srcString = src.split("/");
  const uploadIndex = srcString.indexOf("upload");
  srcString[uploadIndex] = `upload/w_${width},q_${quality || 75}`;
  const optimizedSrc = srcString.join("/");

  return optimizedSrc;
};

const RecipeCard = () => {
  return (
    <div className="recipe-card flex flex-col">
      <div className="mb-2 overflow-hidden rounded-xl">
        <Image
          loader={imageLoader}
          width="400"
          height="360"
          className="aspect-video h-[260px]"
          src="https://res.cloudinary.com/dzl5ur69n/image/upload/v1726861050/dyoxlvxjxji4sfdskkdi.jpg"
          alt="recipe ..."
        />
      </div>
      <h3 className={typography({ className: "mb-1 font-medium", text: "lg" })}>
        Salmon Salad
      </h3>
      <p
        className={typography({
          className: "text-muted-foreground",
          text: "md",
        })}>
        By Legno
      </p>
    </div>
  );
};
export default RecipeCard;
