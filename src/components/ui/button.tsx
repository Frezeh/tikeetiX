import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Dots from "@/assets/icons/dots";

const buttonVariants = cva(
  "relative inline-flex items-center text-background gap-5 rounded-[8px] justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary hover:bg-primary/90",
        destructive: "bg-destructive hover:bg-destructive/90",
        secondary: "bg-secondary hover:bg-secondary/80",
        tertiary: "bg-tertiary hover:bg-tertiary/80",
        gradient:
          "bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90",
      },
      size: {
        default: "h-10 px-4 py-2 font-medium",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  prefixItem?: React.ReactNode;
  suffixItem?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
      >
        {!!props.prefixItem && props.prefixItem}
        <span {...props} className="w-full"/>
        {!!props.suffixItem && props.suffixItem}
        {variant === "gradient" && <Dots className="absolute right-0 pointer-events-none" />}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
