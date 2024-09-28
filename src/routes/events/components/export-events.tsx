import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import FilterItem from "@/components/ui/filter-item";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  openExport: boolean;
  setOpenExport: Dispatch<SetStateAction<boolean>>;
};

export default function ExportEvents(props: Props) {
  const { openExport, setOpenExport } = props;
  const [exportOption, setExportOption] = useState({
    filter: "",
    dateRange: "",
    columns: [""],
  });

  return (
    <Dialog open={openExport} onOpenChange={setOpenExport}>
      <DialogContent
        className="rounded-[8px] p-0 m-0"
        closeStyle="bg-white w-[34px] h-[34px] p-0 top-0 right-[-45px] top-0 flex justify-center items-center rounded-[8px] border-[#E4E7EC]"
      >
        <DialogHeader className="h-12 justify-center border-b border-b-[#D0D5DD] bg-[#F0F2F5] rounded-t-[8px] px-4 text-sm text-[#13191C] font-medium">
          Export options
        </DialogHeader>
        <DialogDescription className="space-y-4 px-2">
          <div className="space-y-1">
            <p className="pl-2.5 text-sm text-[#667185] font-normal">Filter</p>
            <div className="flex items-center gap-2">
              <FilterItem
                checked={exportOption.filter === "DRAFT"}
                onCheckedChange={() =>
                  setExportOption({
                    ...exportOption,
                    filter: "DRAFT",
                  })
                }
              >
                Draft
              </FilterItem>
              <FilterItem
                checked={exportOption.filter === "PENDING"}
                onCheckedChange={() =>
                  setExportOption({
                    ...exportOption,
                    filter: "PENDING",
                  })
                }
              >
                Pending
              </FilterItem>
              <FilterItem
                checked={exportOption.filter === "PAUSED"}
                onCheckedChange={() =>
                  setExportOption({
                    ...exportOption,
                    filter: "PAUSED",
                  })
                }
              >
                Paused
              </FilterItem>
              <FilterItem
                checked={exportOption.filter === "ONGOING"}
                onCheckedChange={() =>
                  setExportOption({
                    ...exportOption,
                    filter: "ONGOING",
                  })
                }
              >
                Ongoing
              </FilterItem>
              <FilterItem
                checked={exportOption.filter === "COMPLETED"}
                onCheckedChange={() =>
                  setExportOption({
                    ...exportOption,
                    filter: "COMPLETED",
                  })
                }
              >
                Completed
              </FilterItem>
            </div>
          </div>
          <div className="space-y-3">
            <p className="pl-2.5 text-sm text-[#667185] font-normal">
              Date range
            </p>
            <div className="grid grid-cols-3 items-center">
              <FilterItem
                checked={exportOption.dateRange === "today"}
                onCheckedChange={() =>
                  setExportOption({
                    ...exportOption,
                    dateRange: "today",
                  })
                }
              >
                Today
              </FilterItem>
              <p className="text-xs text-[#475367]">Jul 28</p>
            </div>
            <div className="grid grid-cols-3 items-center">
              <FilterItem
                checked={exportOption.dateRange === "this-month"}
                onCheckedChange={() =>
                  setExportOption({
                    ...exportOption,
                    dateRange: "this-month",
                  })
                }
              >
                This month
              </FilterItem>
              <p className="text-xs text-[#475367]">Jul 1 - Jul 31</p>
            </div>
            <div className="grid grid-cols-3 items-center">
              <FilterItem
                checked={exportOption.dateRange === "last-7-days"}
                onCheckedChange={() =>
                  setExportOption({
                    ...exportOption,
                    dateRange: "last-7-days",
                  })
                }
              >
                Last 7 days
              </FilterItem>
              <p className="text-xs text-[#475367]">Jul 1 - Jul 31</p>
            </div>
            <div className="grid grid-cols-3 items-center">
              <FilterItem
                checked={exportOption.dateRange === "last-month"}
                onCheckedChange={() =>
                  setExportOption({
                    ...exportOption,
                    dateRange: "last-month",
                  })
                }
              >
                Last month
              </FilterItem>
              <p className="text-xs text-[#475367]">Jul 1 - Jul 31</p>
            </div>
            <FilterItem
              checked={exportOption.dateRange === "all-time"}
              onCheckedChange={() =>
                setExportOption({
                  ...exportOption,
                  dateRange: "all-time",
                })
              }
            >
              All time
            </FilterItem>
            <FilterItem
              checked={exportOption.dateRange === "custom"}
              onCheckedChange={() =>
                setExportOption({
                  ...exportOption,
                  dateRange: "custom",
                })
              }
            >
              Custom
            </FilterItem>
          </div>
          <div className="space-y-3">
            <p className="pl-2.5 text-sm text-[#667185] font-normal">Columns</p>
            <div className="grid grid-cols-3 items-center">
              <FilterItem
                checked={exportOption.columns.includes("ticketName")}
                onCheckedChange={() =>
                  setExportOption({
                    ...exportOption,
                    columns: [...exportOption.columns, "ticketName"],
                  })
                }
              >
                Ticket name
              </FilterItem>
              <FilterItem
                checked={exportOption.columns.includes("price")}
                onCheckedChange={() =>
                  setExportOption({
                    ...exportOption,
                    columns: [...exportOption.columns, "price"],
                  })
                }
              >
                Price (per ticket)
              </FilterItem>
              <FilterItem
                checked={exportOption.columns.includes("quantity")}
                onCheckedChange={() =>
                  setExportOption({
                    ...exportOption,
                    columns: [...exportOption.columns, "quantity"],
                  })
                }
              >
                Quantity sold (qty)
              </FilterItem>
            </div>
            <div className="grid grid-cols-3 items-center">
              <FilterItem
                checked={exportOption.columns.includes("status")}
                onCheckedChange={() =>
                  setExportOption({
                    ...exportOption,
                    columns: [...exportOption.columns, "status"],
                  })
                }
              >
                Status
              </FilterItem>
              <FilterItem
                checked={exportOption.columns.includes("rating")}
                onCheckedChange={() =>
                  setExportOption({
                    ...exportOption,
                    columns: [...exportOption.columns, "rating"],
                  })
                }
              >
                Rating
              </FilterItem>
              <FilterItem
                checked={exportOption.columns.includes("location")}
                onCheckedChange={() =>
                  setExportOption({
                    ...exportOption,
                    columns: [...exportOption.columns, "location"],
                  })
                }
              >
                Location
              </FilterItem>
            </div>
          </div>
        </DialogDescription>

        <DialogFooter className="justify-center border-t border-t-[#D0D5DD] bg-[#F0F2F5] rounded-b-[8px] py-[10px] px-2 space-x-1">
          <Button
            className="h-9 w-[138.5px] rounded-[8px] bg-white border border-[#E4E7EC] text-[#667185] text-sm"
            variant="ghost"
            onClick={() => setOpenExport(false)}
          >
            Cancel
          </Button>
          <Button
            className="h-9 w-[138.5px] rounded-[8px] text-sm"
            onClick={() => setOpenExport(false)}
          >
            Export
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
