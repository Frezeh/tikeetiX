import OnHoldIcon from "@/assets/icons/on-hold-icon";
import PowerIcon from "@/assets/icons/power-icon";
import TicketIcon from "@/assets/icons/ticket-icon";
import VisibleIcon from "@/assets/icons/visible-icon";
import CancelTicket from "@/assets/images/cancel-ticket-illustration.png";
import Event from "@/assets/images/individual.png";
import PauseTicket from "@/assets/images/pause-ticket-iIllustration.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  Filter,
  ListFilter,
  MoreVertical,
  SearchIcon,
  Upload,
} from "lucide-react";
import { useState } from "react";

const EVENTS = [
  {
    id: 0,
    name: "AI Meetup with Autogon",
    date: "7th Dec. 20241",
    priceRange: "$49.99 - $100.",
    qty: "57",
    status: "Live",
  },
  {
    id: 1,
    name: "AI Meetup with Autogon",
    date: "7th Dec. 20241",
    priceRange: "$49.99 - $100.",
    qty: "57",
    status: "Not-Live",
  },
  {
    id: 2,
    name: "AI Meetup with Autogon",
    date: "7th Dec. 20241",
    priceRange: "$49.99 - $100.",
    qty: "57",
    status: "On-Hold",
  },
  {
    id: 3,
    name: "AI Meetup with Autogon",
    date: "7th Dec. 20241",
    priceRange: "$49.99 - $100.",
    qty: "57",
    status: "Sold Out!",
  },
];

const pagination = [1, 2, 3, 4, 5, 6];

export default function ActiveEvents() {
  const [currentPage, setCurrentPage] = useState(1);
  const [openCancel, setOpenCancel] = useState(false);
  const [openHold, setOpenHold] = useState(false);

  return (
    <div>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="border-[#E4E7EC] w-[300px] h-[84px] p-3 rounded-[12px] mx-5">
            <CardContent className="flex justify-between items-center p-0">
              <div className="space-y-2">
                <p className="text-[#475367] text-sm">Active tickets</p>
                <p className="text-[#344054] font-bold text-xl">57</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#C7FFAC] border border-[#A8F285] flex justify-center items-center">
                <TicketIcon fill="#133205" />
              </div>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent className="w-[167px] py-3" side="right">
          <TooltipArrow className="w-3 h-[6px]" />
          <p className="text-[#D0D5DD] text-xs">
            These are live tickets currently on sale.
          </p>
        </TooltipContent>
      </Tooltip>
      <div className="border-t border-[#E4E7EC] w-full my-4 py-5 px-3 space-y-4">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#0ea66729] flex items-center justify-center">
              <div className="bg-[#0DA767] w-2 h-2 rounded-full" />
            </div>
            <p className="text-[#13191C] font-medium text-sm">Active events</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Input
              className="w-[250px] h-9 border border-[#D0D5DD] placeholder:text-[#98A2B3]"
              placeholder="Search"
              suffixitem={
                <SearchIcon
                  size={20}
                  color="#D0D5DD"
                  className="absolute top-0 right-0 mr-2 mt-2"
                />
              }
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="h-9 gap-3 flex items-center border border-[#D0D5DD] rounded-[8px] bg-white py-[10px] px-3">
                  <Filter className="h-5 w-5" color="#667185" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap text-[#667185] text-sm font-medium">
                    Filter
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="h-9 gap-3 flex items-center border border-[#D0D5DD] rounded-[8px] bg-[#F7F9FC] py-[10px] px-3">
                  <Upload className="h-5 w-5" color="#667185" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap text-[#667185] text-sm font-medium">
                    Export
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <Card
          x-chunk="dashboard-06-chunk-0"
          className="rounded-[12px] border-[#E4E7EC]"
        >
          <CardContent className="p-0 m-0">
            <Table className="rounded-[40px]">
              <TableHeader className="bg-[#F9FAFB] rounded-[40px]">
                <TableRow>
                  <TableHead className="text-[#475367] font-medium pr-20">
                    <span className="flex items-center justify-between">
                      Event name{" "}
                      <ChevronsUpDown
                        color="#98A2B3"
                        className="cursor-pointer"
                        size={20}
                      />
                    </span>
                  </TableHead>
                  <TableHead className="text-[#475367] font-medium flex items-center gap-2">
                    <span className="flex items-center gap-2">
                      Price range{" "}
                      <ChevronsUpDown
                        color="#98A2B3"
                        className="cursor-pointer"
                        size={20}
                      />
                    </span>
                  </TableHead>
                  <TableHead className="text-[#475367] font-medium">
                    <span className="flex items-center gap-3">
                      Qty sold{" "}
                      <ListFilter
                        color="#98A2B3"
                        className="cursor-pointer"
                        size={20}
                      />
                    </span>
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="[&_tr:last-child]:border-1">
                {EVENTS.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="hidden sm:table-cell">
                      <div className="flex items-center gap-2">
                        <img
                          alt="Product image"
                          className="aspect-square rounded-md object-cover w-[43px] h-[43px]"
                          src={Event}
                        />
                        <div>
                          <p className="text-[#101928] font-medium">
                            {event.name}
                          </p>
                          <p className="text-[#667185]">{event.date}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-[#13191C]">
                      {event.priceRange}
                    </TableCell>
                    <TableCell className="text-[#475367]">
                      {event.qty}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            aria-haspopup="true"
                            className="w-[30px] h-[30px] rounded-[8px] flex items-center justify-center border border-[#E4E7EC] bg-white"
                          >
                            <MoreVertical className="h-4 w-4" color="#98A2B3" />
                            <span className="sr-only">Toggle menu</span>
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="rounded-[7px] p-0 "
                        >
                          <DropdownMenuItem className="px-3 py-2">
                            <span className="flex items-center gap-[10px] text-[#13191C] text-xs">
                              <VisibleIcon fill="#98A2B3" /> View ticket
                            </span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="px-3 py-2"
                            onClick={() => setOpenHold(true)}
                          >
                            <span className="flex items-center gap-[10px] text-[#13191C] text-xs">
                              <OnHoldIcon fill="#98A2B3" /> Put on Hold
                            </span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="px-3 py-2">
                            <span className="flex items-center gap-[10px] text-[#13191C] text-xs">
                              <OnHoldIcon fill="#98A2B3" /> Duplicate ticket
                            </span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="bg-[#e7211329] rounded-none px-3 py-2"
                            onClick={() => setOpenCancel(true)}
                          >
                            <span className="flex items-center gap-[10px] text-[#BD1B0F] text-xs">
                              <PowerIcon fill="#BD1B0F" /> Cancel ticket
                            </span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex items-center justify-center border-t mt-5 self-center p-5">
            <div className="flex items-center gap-2">
              <button
                aria-haspopup="true"
                className="w-9 h-9 rounded-[6px] flex items-center justify-center border border-[#D0D5DD] bg-white"
                onClick={() => {
                  currentPage > 1 && setCurrentPage((page) => page - 1);
                }}
              >
                <ChevronLeft color="#13191C" size={25} />
                <span className="sr-only">Navigation control</span>
              </button>
              {pagination.map((page) => (
                <button
                  className={cn(
                    "w-9 h-9 rounded-[6px] flex items-center justify-center bg-white",
                    page === currentPage && "border border-[#13191C]"
                  )}
                  onClick={() => setCurrentPage(page)}
                  key={page}
                >
                  <p
                    className={cn(
                      "text-[#667185] text-sm",
                      page === currentPage && "text-[#13191C] font-medium"
                    )}
                  >
                    {page}
                  </p>
                </button>
              ))}
              <button
                aria-haspopup="true"
                className="w-9 h-9 rounded-[6px] flex items-center justify-center border border-[#D0D5DD] bg-white"
                onClick={() => {
                  currentPage < 6 && setCurrentPage((page) => page + 1);
                }}
              >
                <ChevronRight color="#13191C" size={25} />
                <span className="sr-only">Navigation control</span>
              </button>
            </div>
          </CardFooter>
        </Card>
      </div>

      <Dialog open={openCancel} onOpenChange={setOpenCancel}>
        <DialogContent
          className="w-3/4 sm:max-w-[400px] justify-center items-center gap-2 rounded-[8px] px-5 py-[15px] space-y-2"
          closeStyle="bg-white w-[34px] h-[34px] p-0 top-0 right-[-10%] top-[-8px] flex justify-center items-center rounded-[8px]"
        >
          <DialogHeader className="self-center">
            <img
              src={CancelTicket}
              alt="cancel"
              className="self-center w-20 h-20"
            />
          </DialogHeader>
          <DialogDescription className="text-center space-y-2">
            <p className="text-[#13191C] text-lg font-medium">
              Cancel tickets sold
            </p>
            <p className="text-[#667185] text-xs">
              This will trigger a refund for all sold/issued tickets. Are you
              sure you want to cancel this ticket?{" "}
            </p>
          </DialogDescription>

          <DialogFooter className="flex justify-between items-center">
            <Button className="h-9 w-[178px]" variant="ghost">
              Cancel
            </Button>
            <Button className="h-9 w-[178px]" variant="destructive">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openHold} onOpenChange={setOpenHold}>
        <DialogContent
          className="w-3/4 sm:max-w-[400px] justify-center items-center gap-2 rounded-[8px] px-5 py-[15px] space-y-2"
          closeStyle="bg-white w-[34px] h-[34px] p-0 top-0 right-[-10%] top-[-8px] flex justify-center items-center rounded-[8px]"
        >
          <DialogHeader className="self-center">
            <img
              src={PauseTicket}
              alt="cancel"
              className="self-center w-20 h-20"
            />
          </DialogHeader>
          <DialogDescription className="text-center space-y-2">
            <p className="text-[#13191C] text-xl font-bold">
              Pause ticket sales
            </p>
            <p className="text-[#667185] text-xs">
              Putting this ticket on hold means no new ticket will be
              sold/issued until the ticket has been resumed.
            </p>
          </DialogDescription>

          <DialogFooter className="flex justify-between items-center">
            <Button className="h-14 w-[178px]" variant="ghost">
              Cancel
            </Button>
            <Button
              className="h-14 w-[178px] bg-[#13191C] bg-gradient-to-r from-[#13191C] to-[#13191C]"
              variant="gradient"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
