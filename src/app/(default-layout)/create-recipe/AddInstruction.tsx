"use client";

// ** React Imports
import { Fragment } from "react";

// ** Components
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

// ** Library Imports
import { UseFormReturn, useFieldArray } from "react-hook-form";

// ** Icons
import { Trash2, Info, Plus } from "lucide-react";

// ** Types
import { FormValues } from "./page";

type Props = {
  form: UseFormReturn<FormValues>;
};

const AddInstruction = ({ form }: Props) => {
  const {
    fields: sectionFields,
    append: appendSection,
    remove: removeSection,
  } = useFieldArray({
    control: form.control,
    name: "instructionSections",
  });

  return (
    <div className="rounded-lg border border-divider p-4">
      <div className="mb-4 flex items-center gap-2">
        <h3 className="font-medium">Instructions</h3>
        <Info className="h-4 w-4 text-muted" />
      </div>

      {sectionFields.map((field, sectionIndex) => (
        <Fragment>
          {sectionIndex > 0 && <Separator className="mb-4 mt-6" />}

          <div key={field.id} className="mb-4">
            <FormField
              control={form.control}
              name={`instructionSections.${sectionIndex}.title`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section Title</FormLabel>
                  <FormControl>
                    <Input placeholder="eg: " {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-4">
              {form
                .watch(`instructionSections.${sectionIndex}.instructions`)
                .map((_, instructionIndex) => (
                  <div
                    key={instructionIndex}
                    className="mb-2 flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name={`instructionSections.${sectionIndex}.instructions.${instructionIndex}.step`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              min={0}
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                              className="w-16"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`instructionSections.${sectionIndex}.instructions.${instructionIndex}.description`}
                      render={({ field }) => (
                        <FormItem className="flex-grow">
                          <FormControl>
                            <Input {...field} placeholder="Instruction step" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => {
                        const newInstructions = [
                          ...form.getValues(
                            `instructionSections.${sectionIndex}.instructions`,
                          ),
                        ];
                        newInstructions.splice(instructionIndex, 1);
                        form.setValue(
                          `instructionSections.${sectionIndex}.instructions`,
                          newInstructions,
                        );
                      }}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  const newInstructions = [
                    ...form.getValues(
                      `instructionSections.${sectionIndex}.instructions`,
                    ),
                  ];
                  newInstructions.push({
                    step: newInstructions.length + 1,
                    description: "",
                  });
                  form.setValue(
                    `instructionSections.${sectionIndex}.instructions`,
                    newInstructions,
                  );
                }}>
                <Plus className="mr-2 h-4 w-4" />
                Add step
              </Button>
              {sectionIndex > 0 && (
                <Button
                  type="button"
                  variant="destructive"
                  className="ml-2"
                  onClick={() => removeSection(sectionIndex)}>
                  Remove Section
                </Button>
              )}
            </div>
          </div>
        </Fragment>
      ))}
      <Button
        type="button"
        variant="outline"
        className="mt-4 w-full"
        onClick={() =>
          appendSection({
            title: "",
            instructions: [{ step: 1, description: "" }],
          })
        }>
        <Plus className="mr-2 h-4 w-4" />
        Add instruction section
      </Button>
    </div>
  );
};

export default AddInstruction;
