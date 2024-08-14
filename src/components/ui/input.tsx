import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  prefixItem?: React.ReactNode;
  suffixitem?: React.ReactNode;
  error?: boolean;
  success?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, success, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {!!props.prefixItem && props.prefixItem}
        <input
          type={type}
          className={cn(
            "z-10 flex h-10 w-full rounded-[6px] border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 placeholder:text-[#98A2B3] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className,
            error && "ring-destructive focus-visible:ring-destructive border-[#E26E6A]",
            success && "ring-success focus-visible:ring-success border-[#5FC381]",
          )}
          ref={ref}
          {...props}
        />
        {!!props.suffixitem && props.suffixitem}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
