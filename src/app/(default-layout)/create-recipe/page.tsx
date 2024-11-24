"use client";

// ** Components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";

// ** Library Imports
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "nextjs-toploader/app";

// ** Icons
import { Plus, Upload, Info, Trash2 } from "lucide-react";

// ** Schema
const formSchema = z.object({});
type FormValues = z.infer<typeof formSchema>;

const CreateRecipe = () => {

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  return (
    <div className="bg-background py-[35px]">
      <div className="container">
        <div className="flex flex-col items-center gap-6 md:flex-row">
          <Form {...form}>
            <form
              noValidate
              autoComplete="off"
              // onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6">
              <div className="w-1/2">
                <div className="bg-default relative h-[260px] w-full overflow-hidden rounded-lg border-2 border-dashed border-divider">
                  <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center">
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
                      // onChange={handleImageUpload}
                      multiple
                    />
                  </label>
                </div>
              </div>
              <div className="w-1/2"></div>{" "}
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default CreateRecipe;
