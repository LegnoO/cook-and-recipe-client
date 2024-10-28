import { cva } from "class-variance-authority";

export const typography = cva("", {
  variants: {
    display: {
      xxl: "text-[4.5rem] leading-[5.625rem]",
      xl: "text-[3.75rem] leading-[4.5rem]",
      lg: "text-[3rem] leading-[3.75rem]",
      md: "text-[2.25rem] leading-[2.75rem]",
      sm: "text-[1.875rem] leading-[2.375rem]",
      xs: "text-[1.5rem] leading-[2rem]",
    },
    text: {
      xl: "text-xl leading-[1.875rem]",
      lg: "text-lg leading-[1.75rem]",
      md: "text-md leading-[1.5rem]",
      sm: "text-sm leading-[1.25rem]",
      xs: "text-xs leading-[1.125rem]",
    },
    logo: {
      md: "text-lg font-medium",
    },
  },
  defaultVariants: {
    // display: "xxl",
  },
  compoundVariants: [
    {
      display: ["xxl", "xl", "lg", "md"],
      class: "tracking-tighter",
    },
  ],
});
