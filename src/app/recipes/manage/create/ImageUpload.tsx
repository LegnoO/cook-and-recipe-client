"use client";

// ** React Imports
import { useState, ChangeEvent } from "react";

// ** Next Imports
import Image from "next/image";

// ** Components
import { Button } from "@/components/ui/button";

// ** Library Imports
import { UseFormReturn } from "react-hook-form";

// ** Icons
import { Trash2, Upload, Plus } from "lucide-react";

// ** Lib
import { cn } from "@/utils";

// ** Types
import { FormValues } from "./page";

interface Props {
  form: UseFormReturn<FormValues>;
}

const ImageUpload = ({ form }: Props) => {
  const error = form.formState.errors;

  const [images, setImages] = useState<
    {
      file: File;
      url: string;
    }[]
  >([]);

  function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files ? Array.from(event.target.files) : null;

    if (files) {
      if (files?.length < 5) {
        const newImagesFile = files.map((file) => ({
          url: URL.createObjectURL(file),
          file,
        }));

        setImages((prev) => {
          const newListImage = [...prev, ...newImagesFile];
          form.setValue(
            "images",
            newListImage.map((image) => image.file),
          );
          return newListImage;
        });
        form.clearErrors("images");
      } else {
        form.setError("images", {
          message: "Maximum 4 images are allowed",
        });
      }
    }
    return <div>ImageUpload</div>;
  }

  function removeImage(index: number) {
    const currentImagesFile = [...images];
    currentImagesFile.splice(index, 1);

    setImages(() => {
      form.setValue(
        "images",
        currentImagesFile.map((image) => image.file),
      );
      return currentImagesFile;
    });
  }

  const ImagePreview = ({ index, image }: { index: number; image: string }) => {
    return (
      <div className="relative h-[220px] w-full overflow-hidden rounded-lg border-2 border-dashed">
        <Image
          src={image}
          alt={`Recipe image ${index + 1}`}
          fill
          className="object-cover"
        />
        <Button
          type="button"
          variant="destructive"
          size="icon"
          className="absolute right-2 top-2"
          onClick={() => removeImage(index)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-1">
      <label
        className={cn("text-sm", {
          "text-destructive": error.images,
        })}>
        Recipe Photos {`${images.length}/4`}
      </label>
      <div className="grid grid-cols-2 gap-4">
        {images.length === 0 && (
          <div className="relative h-[220px] w-full overflow-hidden rounded-lg border-2 border-dashed bg-gray-50">
            <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center">
              <Upload className="h-6 w-6 text-muted-foreground" />
              <span className="mt-2 text-sm font-medium">Upload Photo</span>
              <span className="text-xs text-muted-foreground">
                (PNG, JPG max 5MB)
              </span>
              <input
                multiple
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        )}

        {images.length > 0 &&
          images.map((image, index) => (
            <ImagePreview key={index} index={index} image={image.url} />
          ))}

        {images.length > 0 && images.length < 4 && (
          <div className="relative h-[220px] w-full overflow-hidden rounded-lg border-2 border-dashed bg-gray-50">
            <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center">
              <Plus className="h-4 w-4 text-placeholder" />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        )}
      </div>
      {error.images && (
        <p className="text-sm text-destructive">{error.images.message}</p>
      )}
    </div>
  );
};
export default ImageUpload;
