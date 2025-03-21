import MoneyIcon from "@/assets/icons/money-icon";
import StoreIcon from "@/assets/icons/store-icon";
import TicketIcon from "@/assets/icons/ticket-icon";
import VisibleIcon from "@/assets/icons/visible-icon";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { LoadingList } from "@/components/ui/loading-movie";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  CircleCheck,
  CircleX,
  Filter,
  SearchIcon,
  Upload,
} from "lucide-react";
import { useState } from "react";
import EmptyTable from "@/components/empty-table";

const DATA = [
  {
    id: 1,
    order_id: "#01234/10",
    name: "Billy Butcher",
    email: "customer@mail.com",
    amount: "GBP999,999",
    status: "Completed",
  },
  {
    id: 2,
    order_id: "#01234/10",
    name: "Billy Butcher",
    email: "customer@mail.com",
    amount: "GBP999,999",
    status: "Cancelled",
  },
  {
    id: 3,
    order_id: "#01234/10",
    name: "Billy Butcher",
    email: "customer@mail.com",
    amount: "GBP999,999",
    status: "Completed",
  },
  {
    id: 4,
    order_id: "#01234/10",
    name: "Billy Butcher",
    email: "customer@mail.com",
    amount: "GBP999,999",
    status: "Cancelled",
  },
];

export default function TicketsSold({ ticketSold }: { ticketSold: number }) {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <ScrollArea className="lg:w-[70%] h-[65vh] px-5 flex flex-col">
      <div className="flex items-center gap-2 pt-10">
        <Tooltip>
          <TooltipTrigger asChild>
            <Card className="border-[#E4E7EC] w-[300px] h-[84px] p-3 rounded-[12px]">
              <CardContent className="flex justify-between items-center p-0">
                <div className="space-y-2">
                  <p className="text-[#475367] text-sm">No. Tickets sold</p>
                  <p className="text-[#344054] font-bold text-xl">
                    {ticketSold}
                  </p>
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
        <Tooltip>
          <TooltipTrigger asChild>
            <Card className="border-[#E4E7EC] w-[300px] h-[84px] p-3 rounded-[12px]">
              <CardContent className="flex justify-between items-center p-0">
                <div className="space-y-2">
                  <p className="text-[#475367] text-sm">Revenue</p>
                  <p className="text-[#344054] font-bold text-xl">0</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#F0F2F5] border border-[#D0D5DD] flex justify-center items-center">
                  <MoneyIcon />
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
      </div>

      <div className="flex items-center border-y border-[#E4E7EC] pb-4 pt-6 mt-5 mb-3">
        <div className="flex items-center gap-2">
          <StoreIcon fill="#13191C" />
          <p className="text-[#13191C] font-medium text-sm">Tickets sold</p>
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
          </DropdownMenu>
        </div>
      </div>

      {/* <Card className="w-full h-full rounded-none rounded-t-[8px] border border-[#F0F2F5] shadow-sm flex flex-col items-center justify-center relative transition-all duration-200">
        <div className="absolute top-0 w-full bg-[#F7F9FC] h-5 rounded-t-[8px] flex items-center gap-10 px-3">
          <div className="flex items-center gap-1">
            <div className="w-[7px] h-[7px] rounded-full bg-[#E4E7EC]" />
            <div className="w-[7px] h-[7px] rounded-full bg-[#E4E7EC]" />
            <div className="w-[7px] h-[7px] rounded-full bg-[#E4E7EC]" />
          </div>
          <div className="w-2/3 bg-[#F0F2F5] h-[7px] rounded-[8px]" />
        </div>
        <div className="h-[90%] overflow-y-scroll no-scrollbar w-full flex flex-col justify-betwee items-center">
          <CardHeader
            className={cn("p-0 pb-4 transition-all duration-200")}
          ></CardHeader>
        </div>
      </Card> */}
      <Card
        x-chunk="dashboard-06-chunk-0"
        className="rounded-[12px] border-[#E4E7EC] shadow-none mb-10"
      >
        <CardContent className="p-0 m-0">
          <Table className="rounded-[40px]">
            <TableHeader className="rounded-40px]">
              <TableRow className="border-[#E4E7EC]">
                <TableHead className="pr-20 bg-[#F9FAFB] rounded-tl-[12px]">
                  <span className="flex items-center justify-between text-[#475367] font-medium text-sm ">
                    Order ID{" "}
                    <ChevronsUpDown
                      color="#98A2B3"
                      className="cursor-pointer"
                      size={20}
                    />
                  </span>
                </TableHead>
                <TableHead className="flex items-center gap-2 bg-[#F9FAFB]">
                  <span className="flex items-center gap-2 text-[#475367] font-medium text-sm ">
                    Customer{" "}
                    <ChevronsUpDown
                      color="#98A2B3"
                      className="cursor-pointer"
                      size={20}
                    />
                  </span>
                </TableHead>
                <TableHead className="bg-[#F9FAFB]">
                  <span className="flex items-center gap-3 text-[#475367] font-medium text-sm">
                    Amount{" "}
                    <ChevronsUpDown
                      color="#98A2B3"
                      className="cursor-pointer"
                      size={20}
                    />
                  </span>
                </TableHead>
                <TableHead className="text-[#475367] font-medium text-sm bg-[#F9FAFB]">
                  Status
                </TableHead>
                <TableHead className="hidden md:table-cell bg-[#F9FAFB] rounded-tr-[12px]">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            {false ? (
              <LoadingList />
            ) : (
              <TableBody className="[&_tr:last-child]:border-1">
                {DATA.length === 0 && <EmptyTable />}
                {DATA.length > 0 &&
                  DATA.map((data) => (
                    <TableRow key={data.id} className="border-[#E4E7EC]">
                      <TableCell className="hidden sm:table-cell">
                        <p className="text-[#475367] text-sm">
                          {data.order_id}
                        </p>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-[#475367] text-sm">{data.name}</p>
                          <p className="text-[#667185] text-[13px]">
                            {data.email}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-[#13191C] font-medium">
                        {data.amount}
                      </TableCell>
                      <TableCell className="text-[#475367]">
                        <div className="flex gap-3 items-center">
                          {data.status.toLowerCase() === "completed" ? (
                            <CircleCheck size={16} color="#0DA767" />
                          ) : (
                            <CircleX size={16} color="#E72113" />
                          )}
                          <p className="text-sm text-[#475367]">
                            {data.status}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <button
                          aria-haspopup="true"
                          className="w-8 h-8 rounded-[8px] flex items-center justify-center border border-[#E4E7EC] bg-white"
                        >
                          <VisibleIcon className="h-4 w-4" color="#475367" />
                          <span className="sr-only">Toggle menu</span>
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            )}
          </Table>
        </CardContent>
        <CardFooter className="flex items-center justify-center border-t border-[#E4E7EC] mt-5 self-center p-5">
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
            {[1, 2, 3, 4, 5].map((page) => (
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
    </ScrollArea>
  );
}
