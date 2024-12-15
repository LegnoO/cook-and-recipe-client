"use client";

// ** Next Imports
import Image from "next/image";

// ** React Imports
import { useState, ChangeEvent, Fragment } from "react";

// ** Components
import {
  FormLabel,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

// ** Library Imports
import { UseFormReturn } from "react-hook-form";

// ** Icons
import { Trash2, Upload, Plus } from "lucide-react";

// ** Types
import { FormValues } from "./page";

interface Props {
  form: UseFormReturn<FormValues>;
}

const ImageUpload = ({ form }: Props) => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files;
    if (file) {
      const currentImagesFile = form.getValues("images");

      form.setValue("images", [...currentImagesFile, file[0]]);
      setImagePreviews((prev) => [...prev, URL.createObjectURL(file[0])]);
    }
    return <div>ImageUpload</div>;
  }

  function removeImage(index: number) {
    const currentImagesFile = form.getValues("images");
    currentImagesFile.splice(index, 1);
    form.setValue("images", currentImagesFile);

    setImagePreviews((prev) => {
      const newImagePreviews = [...prev];
      newImagePreviews.splice(index, 1);
      return newImagePreviews;
    });
  }

  const ImagePreview = ({ index, image }: { index: number; image: string }) => {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border-2 border-dashed">
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
    <div className="flex flex-col gap-2">
      {/* <Label>Recipe photos</Label> */}
      <FormField
        control={form.control}
        name="images"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Recipe Photos</FormLabel>
            <FormControl>
              <div className="grid grid-cols-2 gap-4">
                {imagePreviews.length === 0 && (
                  <div className="relative w-full overflow-hidden rounded-lg border-2 border-dashed bg-gray-50">
                    <label className="flex h-[140px] w-full cursor-pointer flex-col items-center justify-center">
                      <Upload className="h-6 w-6 text-muted-foreground" />
                      <span className="mt-2 text-sm font-medium">
                        Upload Photo
                      </span>
                      <span className="text-xs text-muted-foreground">
                        (PNG, JPG max 5MB)
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                )}

                {imagePreviews.length > 0 &&
                  imagePreviews.map((image, index) => (
                    <ImagePreview key={index} index={index} image={image} />
                  ))}
                {imagePreviews.length > 0 && imagePreviews.length < 4 && (
                  <div className="relative w-full overflow-hidden rounded-lg border-2 border-dashed bg-gray-50">
                    <label className="flex h-[140px] w-full cursor-pointer flex-col items-center justify-center">
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
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
export default ImageUpload;
