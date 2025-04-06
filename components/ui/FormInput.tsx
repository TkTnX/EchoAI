import { Input } from "./input";
import { cn } from "@/lib/utils";
import { InputHTMLAttributes } from "react";
import { ZodIssue } from "zod";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  errors?: ZodIssue[] | null;
}

export const FormInput = ({ className, errors, ...props }: Props) => {
  const getFieldError = (field: string) => {
    if (errors && errors.length > 0) {
      return errors.find((issue) => issue.path[0] === field)?.message;
    }
  };
  return (
    <label className="w-full">
      <Input {...props} className={cn("outline-none", className)} />
      {getFieldError(props.name as string) && (
        <p className="text-red-500 text-[10px] text-left mt-1">
          {getFieldError(props.name as string)}
        </p>
      )}
    </label>
  );
};
