"use client";

// ** React Imports
import { useState, useEffect, Fragment } from "react";

// ** Next Imports
import Image from "next/image";

// ** Components
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

// ** Lib
import { cn } from "@/lib/utils";

// ** Types
type Props = {
  images: string[];
};

const ImageGallery = ({ images }: Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [slideIndex, setSlideIndex] = useState(0);

  function onSelectImage(index: number) {
    api?.scrollTo(index);
  }

  useEffect(() => {
    if (!api) {
      return;
    }

    setSlideIndex(api.selectedScrollSnap());

    api.on("select", () => {
      setSlideIndex(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="flex flex-col gap-2.5 p-4">
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
        }} // fix drag
        className="w-full rounded-lg">
        <CarouselContent>
          {images.length > 0 ? (
            images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[390px] w-full">
                  <Image
                    fill
                    className="rounded-lg object-cover"
                    src={image}
                    alt={image}
                  />
                </div>
              </CarouselItem>
            ))
          ) : (
            <CarouselItem>
              <div className="relative h-[390px] w-full">
                <Image
                  fill
                  className="rounded-lg object-cover"
                  src="/images/default.png"
                  alt="No image available"
                />
              </div>
            </CarouselItem>
          )}
        </CarouselContent>
        {images.length > 1 && (
          <Fragment>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Fragment>
        )}
      </Carousel>

      <div className="grid grid-cols-4 gap-2.5">
        {images.length > 1 &&
          images.map((image, index) => (
            <div key={index} className="relative h-[95px]">
              <Image
                fill
                key={index}
                className={cn(
                  "rounded-lg object-cover",
                  slideIndex === index && "outline outline-primary",
                )}
                src={image}
                alt={image}
                onClick={() => onSelectImage(index)}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ImageGallery;
