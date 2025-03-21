import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import "react-day-picker/dist/style.css";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  // const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      captionLayout="dropdown-buttons"
      // fromYear={1800}
      // toYear={new Date().getFullYear()}
      showOutsideDays={showOutsideDays}
      weekStartsOn={1}
      className={cn("p-3", className)}
      classNames={{
        //months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        // month: "space-y-4",
        //caption: "flex py-1 pl-2.5 relative items-center",
        // caption_label: "text-base font-medium",
        //caption_label: "hidden",
        //caption_dropdowns: "flex gap-2",
        // nav_button_previous: "absolute right-[-85px]",
        // nav_button_next: "absolute right-[-90px]",

        root: "flex flex-col",
        nav: "space-x-1 flex items-center justify-end",
        caption: "flex pb-2 px-2.5 relative items-center justify-between",
        nav_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-7 w-7 bg-transparent p-0 opacity-80 hover:opacity-100"
        ),
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-black rounded-md w-[38px] mx-[6.5px] font-medium text-xs",
        row: "flex w-full mt-2",
        cell: "h-[38px] w-[38px border-[0.95px] border-[#F0F2F5] rounded-[10px] mx-[6px] text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-white [&:has([aria-selected])]:bg-white first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-[38px] w-[38px] text-xs font-normal text-black p-0 font-medium rounded-[10px] aria-selected:opacity-100 bg-white shadow-sm"
        ),
        day_today: "font-medium",
        //day_range_end: "day-range-end",
        day_selected:
          "bg-[#EAFFE0] text-black focus:bg-[#EAFFE0] focus:text-black text-xs focus:font-medium rounded-[10px] focus:border-2 focus:border-primary border-2 border-primary",
        // day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-black opacity-100 aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-black",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => (
          <ChevronLeft className="h-4 w-4 text-black" {...props} />
        ),
        IconRight: ({ ...props }) => (
          <ChevronRight className="h-4 w-4 text-black" {...props} />
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
