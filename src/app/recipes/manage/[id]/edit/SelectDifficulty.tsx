"use client";

// ** Components
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ** Library Imports
import { UseFormReturn } from "react-hook-form";

// ** Types
import { FormValues } from "./page";
type Props = {
  form: UseFormReturn<FormValues>;
  onChange: (value: FormValues["difficulty"]) => void;
};

const SelectDifficulty = ({ onChange, form }: Props) => {
  const id = "select-difficulty-create-recipe";
  const difficulties = ["Easy", "Medium", "Hard", "Professional", "Expert"];

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>Difficulty</Label>
      <Select value={form.getValues("difficulty")} onValueChange={onChange}>
        <SelectTrigger className="w-full" id={id}>
          <SelectValue placeholder="Select difficulty" />
        </SelectTrigger>
        <SelectContent>
          {difficulties.map((difficulty, index) => (
            <SelectItem key={index} value={difficulty}>
              {difficulty}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectDifficulty;
