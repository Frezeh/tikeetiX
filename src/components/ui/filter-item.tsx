import { cn } from "@/lib/utils";
import { Circle, CircleCheck } from "lucide-react";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  checked?: boolean;
  onCheckedChange?: () => void;
};

export default function FilterItem(props: Props) {
  const { children, className, checked, onCheckedChange } = props;

  return (
    <button
      className={cn(
        "relative flex select-none items-center py-1.5 pl-7 pr-2 text-xs text-[#475367] outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      onClick={onCheckedChange}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {checked ? (
          <CircleCheck size={16} color="#0DA767" />
        ) : (
          <Circle size={16} color="#98A2B3" />
        )}
      </span>
      {children}
    </button>
  );
}
