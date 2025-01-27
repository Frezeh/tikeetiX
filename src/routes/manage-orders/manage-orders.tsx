import MoneyMultipleIcon from "@/assets/icons/money-multiple-icon";
import TicketIcon from "@/assets/icons/ticket-icon";
import VisibleIcon from "@/assets/icons/visible-icon";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import FilterItem from "@/components/ui/filter-item";
import { Input } from "@/components/ui/input";
import { LoadingMovieList } from "@/components/ui/loading-movie";
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
  CircleCheck,
  CircleX,
  Filter,
  MoveDownLeft,
  SearchIcon,
  Upload,
  XIcon,
} from "lucide-react";
import { useState } from "react";
import ExportEvents from "../events/components/export-events";
import ManageOrdersActions from "./manage-order-actions";

const DATA = [
  {
    id: 1,
    order_id: "#01234/10",
    ticket_name: "AI Meetup with Autogon",
    name: "Billy Butcher",
    email: "customer@mail.com",
    amount: "GBP999,999",
    status: "Completed",
    category: "Event",
  },
  {
    id: 2,
    order_id: "#01234/10",
    ticket_name: "AI Meetup with Autogon",
    name: "Billy Butcher",
    email: "customer@email.com",
    amount: "GBP999,999",
    status: "Completed",
    category: "Event",
  },
] as const;

export default function ManageOrders() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const [openExport, setOpenExport] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // const [selectedEvent, setSelectedEvent] = useState<(typeof DATA)[number]>(
  //   {} as (typeof DATA)[number]
  // );

  // const queryClient = useQueryClient();

  // const queryParams = useMemo(() => {
  //   let params = "";

  //   if (filterValue) {
  //     params = params + `&status=${filterValue}`;
  //   }
  //   if (searchValue) {
  //     params = params + `&searchTerm=${searchValue}`;
  //   }

  //   return params;
  // }, [filterValue, searchValue]);

  //   const {
  //     fetchNextPage,
  //     fetchPreviousPage,
  //     refetch,
  //     isFetching,
  //     isFetchingNextPage,
  //     isFetchingPreviousPage,
  //     isPending,
  //     data,
  //   } = useInfiniteQuery({
  //     queryKey: ["events", currentPage],
  //     queryFn: ({ pageParam }) => getEventTickets(pageParam, 20, queryParams),
  //     initialPageParam: currentPage,
  //     getNextPageParam: (lastPage) => lastPage.data.nextPage,
  //     getPreviousPageParam: (firstPage) => firstPage.data.prevPage,
  //   });

  //   const loading = isFetching || isFetchingNextPage || isFetchingPreviousPage;
  //   const RESPONSE = data?.pages[data?.pages.length - 1];
  //   const EVENTS = RESPONSE?.data.foundItems || [];

  //   if (isPending) {
  //     return <Loader />;
  //   }

  return (
    <div className="pb-20">
      <div className="flex items-center border-b border-[#E4E7EC] p-5">
        <div className="space-y-1">
          <h1 className="font-medium text-[28px]">Manage orders</h1>
          <p className="text-[#475367]">
            View and manage your tickets across all sectors.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 xl:flex xl:items-center gap-3 pt-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Card className="border-[#0DA767] w-[300px] h-[84px] p-3 rounded-[12px] ml-5 bg-[#0DA767]">
              <CardContent className="flex justify-between items-center p-0">
                <div className="space-y-2">
                  <p className="text-white/80 text-sm">Total Sales Revenue</p>
                  <p className="text-white font-bold text-xl">
                    GBP 999,999,999
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white flex justify-center items-center">
                  <MoneyMultipleIcon />
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
            <Card className="border-[#E4E7EC] w-[300px] h-[84px] p-3 rounded-[12px] sm:ml-5 xl:ml-0">
              <CardContent className="flex justify-between items-center p-0">
                <div className="space-y-2">
                  <p className="text-[#475367] text-sm">Total pay-out</p>
                  <p className="text-[#344054] font-bold text-xl">
                    GBP 999,999,999
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#e7211329] border border-[#E72113] flex justify-center items-center">
                  <MoveDownLeft color="#E72113" size={16} />
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
                  <p className="text-[#475367] text-sm">Total tickets sold</p>
                  <p className="text-[#344054] font-bold text-xl">1,754</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#F0F2F5] border border-[#E4E7EC] flex justify-center items-center">
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
      </div>

      <div className="border-t border-[#E4E7EC] w-full my-4 py-5 px-5 space-y-4">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <TicketIcon fill={"#13191C"} />
            <p className="text-[#13191C] font-medium text-sm">Orders</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-[250px] h-9 border border-[#D0D5DD] placeholder:text-[#98A2B3]"
              placeholder="Search"
              suffixitem={
                searchValue ? (
                  <XIcon
                    onClick={() => {
                      setSearchValue("");
                      const timeOut = setTimeout(() => {
                        //refetch();
                        clearTimeout(timeOut);
                      }, 200);
                    }}
                    size={20}
                    //color="#D0D5DD"
                    className="absolute top-0 right-0 mr-2 mt-2 cursor-pointer"
                  />
                ) : (
                  <SearchIcon
                    size={20}
                    color="#D0D5DD"
                    className="absolute top-0 right-0 mr-2 mt-2"
                  />
                )
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  //refetch();
                }
              }}
            />
            <DropdownMenu open={openFilter} onOpenChange={setOpenFilter}>
              <DropdownMenuTrigger asChild>
                <button className="h-9 gap-3 flex items-center border border-[#D0D5DD] rounded-[8px] bg-white py-[10px] px-3">
                  <Filter className="h-5 w-5" color="#667185" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap text-[#667185] text-sm font-medium">
                    Filter
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="border border-[#E4E7EC] p-0 rounded-[8px] w-full"
              >
                <div className="py-3 px-2 grid grid-cols-3 justify-center items-center border-b border-b-[#F0F2F5] bg-[#F0F2F5]">
                  <button
                    className="h-[27px] w-16 bg-white rounded-[6px] border border-[#E4E7EC] text-[13px] text-[#667185]"
                    onClick={() => setFilterValue("")}
                  >
                    Clear
                  </button>
                  <DropdownMenuLabel className="text-sm text-[#13191C] font-normal">
                    Filter
                  </DropdownMenuLabel>
                  <button
                    className="h-[27px] w-16 bg-[#13191C] rounded-[6px] border border-[#E4E7EC] text-[13px] text-white"
                    onClick={() => {
                      //refetch();
                      setOpenFilter(false);
                    }}
                  >
                    Apply
                  </button>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="pl-3 text-sm text-[#98A2B3] font-normal">
                  Status
                </DropdownMenuLabel>
                <div className="grid grid-cols-3 px-1 pb-4">
                  <div className="space-y-1">
                    <FilterItem
                      checked={filterValue === "DRAFT"}
                      onCheckedChange={() => setFilterValue("DRAFT")}
                    >
                      Draft
                    </FilterItem>
                    <FilterItem
                      checked={filterValue === "PENDING"}
                      onCheckedChange={() => setFilterValue("PENDING")}
                    >
                      Pending
                    </FilterItem>
                  </div>
                  <div className="space-y-1">
                    <FilterItem
                      checked={filterValue === "PAUSED"}
                      onCheckedChange={() => setFilterValue("PAUSED")}
                    >
                      Paused
                    </FilterItem>
                    <FilterItem
                      checked={filterValue === "ONGOING"}
                      onCheckedChange={() => setFilterValue("ONGOING")}
                    >
                      Ongoing
                    </FilterItem>
                  </div>
                  <div className="space-y-1">
                    <FilterItem
                      checked={filterValue === "COMPLETED"}
                      onCheckedChange={() => setFilterValue("COMPLETED")}
                    >
                      Completed
                    </FilterItem>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <button
              className="h-9 gap-3 flex items-center border border-[#D0D5DD] rounded-[8px] bg-[#F7F9FC] py-[10px] px-3"
              onClick={() => setOpenExport(true)}
            >
              <Upload className="h-5 w-5" color="#667185" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap text-[#667185] text-sm font-medium">
                Export
              </span>
            </button>
          </div>
        </div>

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
                  <TableHead className="bg-[#F9FAFB]">
                    <span className="flex items-center gap-3 text-[#475367] font-medium text-sm">
                      Ticket name{" "}
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
                  <TableHead className="text-[#475367] font-medium text-sm bg-[#F9FAFB]">
                    Category
                  </TableHead>
                  <TableHead className="hidden md:table-cell bg-[#F9FAFB] rounded-tr-[12px]">
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              {false ? (
                <LoadingMovieList />
              ) : (
                <TableBody className="[&_tr:last-child]:border-1">
                  {DATA.map((data) => (
                    <TableRow key={data.id} className="border-[#E4E7EC]">
                      <TableCell className="hidden sm:table-cell">
                        <p className="text-[#475367] text-sm">
                          {data.order_id}
                        </p>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <p className="text-[#475367] text-sm">
                          {data.ticket_name}
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
                      <TableCell className="text-[#13191C] font-medium">
                        {data.category}
                      </TableCell>
                      <TableCell>
                        <button
                          aria-haspopup="true"
                          className="w-8 h-8 rounded-[8px] flex items-center justify-center border border-[#E4E7EC] bg-white"
                          onClick={() => {
                            setOpenModal(true);
                            //setSelectedEvent(data);
                          }}
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
      </div>

      <ExportEvents openExport={openExport} setOpenExport={setOpenExport} />
      <ManageOrdersActions openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
}
