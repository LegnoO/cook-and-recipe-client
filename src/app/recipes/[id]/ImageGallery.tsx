"use client";

// ** React Imports
import { useState } from "react";

// ** Next Imports
import Image from "next/image";

// ** Components
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// ** Lib
import { cn } from "@/lib/utils";

const ImageGallery = ({ images }: { images: string[] }) => {

  const [slideIndex, setSlideIndex] = useState(0);


  function onSlideChange(next: boolean) {
    if (next) {
      setSlideIndex((prev) => (prev + 1) % images.length);
    } else {
      setSlideIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  }

  return (
    <div className="flex flex-col gap-2.5 p-4">
      <Carousel
        opts={{
          loop: true,
        }}  // fix drag
        className="w-full rounded-lg">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <Image
                className="w-full rounded-lg object-cover"
                src={image}
                alt={image}
                width={500}
                height={250}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          className="left-2"
          onMouseDown={() => onSlideChange(false)}
        />
        <CarouselNext
          className="right-2"
          onMouseDown={() => onSlideChange(true)}
        />
      </Carousel>

      <div className="grid grid-cols-4 gap-2.5">
        {images.map((image, index) => (
          <Image
            className={cn(
              "w-full rounded-lg object-cover",
              slideIndex === index && "outline outline-primary",
            )}
            key={index}
            src={image}
            alt={image}
            width={150}
            height={110}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
