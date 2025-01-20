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
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

// ** Library Imports
import { UseFormReturn, useFieldArray } from "react-hook-form";

// ** Icons
import { Trash2, X, Plus } from "lucide-react";

// ** Types
import { FormValues } from "../page";

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

  const renderInstruction = (sectionIndex: number) =>
    form.watch(`instructionSections.${sectionIndex}.instructions`);

  function addStep(sectionIndex: number) {
    const newInstructions = [
      ...form.getValues(`instructionSections.${sectionIndex}.instructions`),
    ];
    newInstructions.push({
      step: newInstructions.length + 1,
      description: "",
    });
    form.setValue(
      `instructionSections.${sectionIndex}.instructions`,
      newInstructions,
    );
  }

  function removeStep(sectionIndex: number, instructionIndex: number) {
    const newInstructions = [
      ...form.getValues(`instructionSections.${sectionIndex}.instructions`),
    ];
    newInstructions.splice(instructionIndex, 1);
    form.setValue(
      `instructionSections.${sectionIndex}.instructions`,
      newInstructions,
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Instructions</h3>
      </div>
      {sectionFields.map((field, sectionIndex) => (
        <Fragment key={field.id}>
          {sectionIndex > 0 && <Separator className="!my-4" />}
          <div>
            <FormField
              control={form.control}
              name={`instructionSections.${sectionIndex}.title`}
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Section Title</FormLabel>
                    <Button
                      className="hover:bg-destructive hover:text-destructive-foreground"
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSection(sectionIndex)}>
                      <Trash2 className="" />
                    </Button>
                  </div>
                  <FormControl>
                    <Input
                      placeholder="e.g. Section Title (Preparation, Cooking, Sauce)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-4">
              {renderInstruction(sectionIndex).map(
                (instruction, instructionIndex) => (
                  <Fragment key={instructionIndex}>
                    <div className="mb-2 flex gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        {instruction.step}
                      </div>
                      <FormField
                        control={form.control}
                        name={`instructionSections.${sectionIndex}.instructions.${instructionIndex}.description`}
                        render={({ field }) => (
                          <FormItem className="flex-grow">
                            <FormControl>
                              <Textarea
                                {...field}
                                rows={3}
                                placeholder={`Step ${instruction.step} instruction...`}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        className="hover:bg-destructive hover:text-destructive-foreground"
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          removeStep(sectionIndex, instructionIndex);
                        }}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </Fragment>
                ),
              )}
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Button
                className="font-medium uppercase tracking-wider"
                type="button"
                variant="outline"
                onClick={() => {
                  addStep(sectionIndex);
                }}>
                <Plus className="mr-2 h-4 w-4" />
                Add step
              </Button>
            </div>
          </div>
        </Fragment>
      ))}
      <Button
        className="w-full py-6 font-semibold uppercase tracking-wider"
        type="button"
        variant="outline"
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
