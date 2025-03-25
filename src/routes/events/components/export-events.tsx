import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import FilterItem from "@/components/ui/filter-item";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectTrigger } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  openExport: boolean;
  setOpenExport: Dispatch<SetStateAction<boolean>>;
};

export default function ExportEvents(props: Props) {
  const { openExport, setOpenExport } = props;
  const [openStartDate, setOpenStartDate] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [openEndDate, setOpenEndDate] = useState(false);
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [exportOption, setExportOption] = useState({
    filter: "",
    fileType: "",
    columns: [""],
  });

  return (
    <Dialog open={openExport} onOpenChange={setOpenExport}>
      <DialogContent
        className="rounded-[8px] p-0 m-0"
        closeStyle="bg-white w-[34px] h-[34px] p-0 top-0 right-[-45px] top-0 flex justify-center items-center rounded-[8px] border-[#E4E7EC]"
      >
        <DialogHeader className="h-12 justify-center items-center rounded-t-[8px] pt-5 px-4 text-lg text-[#13191C] font-medium">
          Export options
        </DialogHeader>
        <DialogDescription className="space-y-5 px-2">
          <div className="space-y-1">
            <p className="pl-2.5 text-sm text-[#667185] font-normal">Filter</p>
            <div className="grid grid-cols-5 py-1.5 pl-2.5">
              <div className="flex flex-row items-center space-x-[3px] space-y-0 ">
                <Checkbox
                  className="data-[state=checked]:bg-[#0DA767] data-[state=checked]:border-[#0DA767] w-4 h-4"
                  iconStyle="w-3 h-3"
                  checked={exportOption.filter === "DRAFT"}
                  onCheckedChange={() =>
                    setExportOption({
                      ...exportOption,
                      filter: "DRAFT",
                    })
                  }
                />
                <div className="space-y-1 leading-none">
                  <p className="text-xs text-[#475367] transition-colors">
                    Draft
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-center space-x-[3px] space-y-0">
                <Checkbox
                  className="data-[state=checked]:bg-[#0DA767] data-[state=checked]:border-[#0DA767] w-4 h-4"
                  iconStyle="w-3 h-3"
                  checked={exportOption.filter === "PENDING"}
                  onCheckedChange={() =>
                    setExportOption({
                      ...exportOption,
                      filter: "PENDING",
                    })
                  }
                />
                <div className="space-y-1 leading-none">
                  <p className="text-xs text-[#475367] transition-colors">
                    Pending
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-center space-x-[3px] space-y-0">
                <Checkbox
                  className="data-[state=checked]:bg-[#0DA767] data-[state=checked]:border-[#0DA767] w-4 h-4"
                  iconStyle="w-3 h-3"
                  checked={exportOption.filter === "PAUSED"}
                  onCheckedChange={() =>
                    setExportOption({
                      ...exportOption,
                      filter: "PAUSED",
                    })
                  }
                />
                <div className="space-y-1 leading-none">
                  <p className="text-xs text-[#475367] transition-colors">
                    Paused
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-center space-x-[3px] space-y-0">
                <Checkbox
                  className="data-[state=checked]:bg-[#0DA767] data-[state=checked]:border-[#0DA767] w-4 h-4"
                  iconStyle="w-3 h-3"
                  checked={exportOption.filter === "ONGOING"}
                  onCheckedChange={() =>
                    setExportOption({
                      ...exportOption,
                      filter: "ONGOING",
                    })
                  }
                />
                <div className="space-y-1 leading-none">
                  <p className="text-xs text-[#475367] transition-colors">
                    Ongoing
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-center space-x-[3px] space-y-0">
                <Checkbox
                  className="data-[state=checked]:bg-[#0DA767] data-[state=checked]:border-[#0DA767] w-4 h-4"
                  iconStyle="w-3 h-3"
                  checked={exportOption.filter === "COMPLETED"}
                  onCheckedChange={() =>
                    setExportOption({
                      ...exportOption,
                      filter: "COMPLETED",
                    })
                  }
                />
                <div className="space-y-1 leading-none">
                  <p className="text-xs text-[#475367] transition-colors">
                    Completed
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between gap-4 items-center px-2.5">
            <div className="flex flex-col">
              <Label className="text-[#667185] text-sm font-normal">From</Label>
              <Select onOpenChange={setOpenStartDate} open={openStartDate}>
                <SelectTrigger
                  suffixIcon={
                    <CalendarIcon
                      className="ml-auto"
                      color="#667185"
                      size={20}
                    />
                  }
                  className="border-none bg-[#F0F2F5] active:focus:outline-none h-14"
                >
                  <Button
                    variant={"ghost"}
                    className={cn(
                      "lg:w-[200px] ml-[-20px] text-left items-start font-normal bg-transparent text-[#13191C]",
                      !startDate && "text-[#667185]"
                    )}
                  >
                    {startDate ? (
                      format(startDate, "PP")
                    ) : (
                      <span className="text-[#667185]">24 Aug 2024</span>
                    )}
                  </Button>
                </SelectTrigger>

                <SelectContent
                  className="w-auto h-auto p-0 rounded-[10px] shadow-lg mt-1 border-[0.3px] bg-card"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={(d) => {
                      setStartDate(d!);
                      setOpenStartDate(false);
                    }}
                    // disabled={(date) => date < new Date()}
                    fromDate={new Date()}
                    toDate={new Date(Date.now() + 10000 * 60 * 60 * 24 * 365)}
                    initialFocus
                  />
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col">
              <Label className="text-[#667185] text-sm font-normal">To</Label>
              <Select onOpenChange={setOpenEndDate} open={openEndDate}>
                <SelectTrigger
                  suffixIcon={
                    <CalendarIcon
                      className="ml-auto"
                      color="#667185"
                      size={20}
                    />
                  }
                  className="border-none bg-[#F0F2F5] active:focus:outline-none h-14 w-full"
                >
                  <Button
                    variant={"ghost"}
                    className={cn(
                      "lg:w-[200px] ml-[-20px] text-left items-start font-normal bg-transparent text-[#13191C]",
                      !endDate && "text-[#667185]"
                    )}
                  >
                    {endDate ? (
                      format(endDate, "PP")
                    ) : (
                      <span className="text-[#667185]">24 Aug 2024</span>
                    )}
                  </Button>
                </SelectTrigger>

                <SelectContent
                  className="w-auto h-auto p-0 rounded-[10px] shadow-lg mt-1 border-[0.3px] bg-card"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={(d) => {
                      setEndDate(d!);
                      setOpenEndDate(false);
                    }}
                    // disabled={(date) => date < new Date()}
                    fromDate={new Date()}
                    toDate={new Date(Date.now() + 10000 * 60 * 60 * 24 * 365)}
                    initialFocus
                  />
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-3">
            <p className="pl-2.5 text-sm text-[#667185] font-normal">Columns</p>
            <div className="grid grid-cols-3 items-center py-1.5 pl-2.5">
              <div className="flex flex-row items-center space-x-[3px] space-y-0">
                <Checkbox
                  className="data-[state=checked]:bg-[#0DA767] data-[state=checked]:border-[#0DA767] w-4 h-4"
                  iconStyle="w-3 h-3"
                  checked={exportOption.columns.includes("ticketName")}
                  onCheckedChange={() =>
                    setExportOption({
                      ...exportOption,
                      columns: [...exportOption.columns, "ticketName"],
                    })
                  }
                />
                <div className="space-y-1 leading-none">
                  <p className="text-xs text-[#475367] transition-colors">
                    Ticket name
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-center space-x-[3px] space-y-0">
                <Checkbox
                  className="data-[state=checked]:bg-[#0DA767] data-[state=checked]:border-[#0DA767] w-4 h-4"
                  iconStyle="w-3 h-3"
                  checked={exportOption.columns.includes("price")}
                  onCheckedChange={() =>
                    setExportOption({
                      ...exportOption,
                      columns: [...exportOption.columns, "price"],
                    })
                  }
                />
                <div className="space-y-1 leading-none">
                  <p className="text-xs text-[#475367] transition-colors">
                    Price (per ticket)
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 items-center py-1.5 pl-2.5">
              <div className="flex flex-row items-center space-x-[3px] space-y-0">
                <Checkbox
                  className="data-[state=checked]:bg-[#0DA767] data-[state=checked]:border-[#0DA767] w-4 h-4"
                  iconStyle="w-3 h-3"
                  checked={exportOption.columns.includes("quantity")}
                  onCheckedChange={() =>
                    setExportOption({
                      ...exportOption,
                      columns: [...exportOption.columns, "quantity"],
                    })
                  }
                />
                <div className="space-y-1 leading-none">
                  <p className="text-xs text-[#475367] transition-colors">
                    Quantity sold (qty)
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-center space-x-[3px] space-y-0">
                <Checkbox
                  className="data-[state=checked]:bg-[#0DA767] data-[state=checked]:border-[#0DA767] w-4 h-4"
                  iconStyle="w-3 h-3"
                  checked={exportOption.columns.includes("status")}
                  onCheckedChange={() =>
                    setExportOption({
                      ...exportOption,
                      columns: [...exportOption.columns, "status"],
                    })
                  }
                />
                <div className="space-y-1 leading-none">
                  <p className="text-xs text-[#475367] transition-colors">
                    Status
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 items-center py-1.5 pl-2.5">
              <div className="flex flex-row items-center space-x-[3px] space-y-0">
                <Checkbox
                  className="data-[state=checked]:bg-[#0DA767] data-[state=checked]:border-[#0DA767] w-4 h-4"
                  iconStyle="w-3 h-3"
                  checked={exportOption.columns.includes("rating")}
                  onCheckedChange={() =>
                    setExportOption({
                      ...exportOption,
                      columns: [...exportOption.columns, "rating"],
                    })
                  }
                />
                <div className="space-y-1 leading-none">
                  <p className="text-xs text-[#475367] transition-colors">
                    Rating
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-center space-x-[3px] space-y-0">
                <Checkbox
                  className="data-[state=checked]:bg-[#0DA767] data-[state=checked]:border-[#0DA767] w-4 h-4"
                  iconStyle="w-3 h-3"
                  checked={exportOption.columns.includes("location")}
                  onCheckedChange={() =>
                    setExportOption({
                      ...exportOption,
                      columns: [...exportOption.columns, "location"],
                    })
                  }
                />
                <div className="space-y-1 leading-none">
                  <p className="text-xs text-[#475367] transition-colors">
                    Location
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <p className="pl-2.5 text-sm text-[#667185] font-normal">
              Export as
            </p>
            <div className="grid grid-cols-3 items-center">
              <FilterItem
                checked={exportOption.fileType === "pdf"}
                onCheckedChange={() =>
                  setExportOption({
                    ...exportOption,
                    fileType: "pdf",
                  })
                }
              >
                PDF
              </FilterItem>
              <FilterItem
                checked={exportOption.fileType === "csv"}
                onCheckedChange={() =>
                  setExportOption({
                    ...exportOption,
                    fileType: "csv",
                  })
                }
              >
                CSV
              </FilterItem>
            </div>
          </div>
        </DialogDescription>

        <DialogFooter className="sm:justify-between py-[10px] px-2 gap-2">
          <Button
            className="h-9 w-full rounded-[8px] bg-white border border-[#E4E7EC] text-[#667185] text-sm"
            variant="ghost"
            onClick={() => setOpenExport(false)}
          >
            Cancel
          </Button>
          <Button
            className="h-9 w-full rounded-[8px] text-sm"
            onClick={() => setOpenExport(false)}
          >
            Export
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
