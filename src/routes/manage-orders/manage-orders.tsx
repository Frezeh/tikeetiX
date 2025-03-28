import MoneyMultipleIcon from "@/assets/icons/money-multiple-icon";
import TicketIcon from "@/assets/icons/ticket-icon";
import VisibleIcon from "@/assets/icons/visible-icon";
import EmptyTable from "@/components/empty-table";
import orderStatusIcon from "@/components/order-status-icon";
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
import Loader from "@/components/ui/loader";
import { LoadingList } from "@/components/ui/loading-movie";
import Pagination from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
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
import { capitalizeFirstLetter } from "@/lib/utils";
import { getOrders } from "@/services/api/orders";
import { getWallet } from "@/services/api/wallet";
import { Order } from "@/services/models/orders";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  ChevronsUpDown,
  Filter,
  SearchIcon,
  Upload,
  XIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import ExportEvents from "../events/components/export-events";
import ManageOrdersActions from "./manage-order-actions";

export default function ManageOrders() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const [openExport, setOpenExport] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState<Order>({} as Order);

  const queryParams = useMemo(() => {
    let params = "";

    if (filterValue) {
      params = params + `&status=${filterValue}`;
    }
    if (searchValue) {
      params = params + `&search=${searchValue}`;
    }

    return params;
  }, [filterValue, searchValue]);

  const { isLoading: isLoadingWallet, data: WALLET } = useQuery({
    queryKey: ["wallet"],
    queryFn: () => getWallet(),
  });

  const {
    fetchNextPage,
    fetchPreviousPage,
    refetch,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    isPending,
    data,
  } = useInfiniteQuery({
    queryKey: ["orders", currentPage],
    queryFn: ({ pageParam }) => getOrders(pageParam, 20, queryParams),
    initialPageParam: currentPage,
    getNextPageParam: (lastPage) => lastPage.data.nextPage,
    getPreviousPageParam: (firstPage) => firstPage.data.prevPage,
  });

  const RESPONSE = data?.pages[data?.pages.length - 1];
  const DATA = data?.pages.flatMap((page) => page.data.foundItems) || [];
  const loading = isFetching || isFetchingNextPage || isFetchingPreviousPage;

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
      {isLoadingWallet ? (
        <div className="grid grid-cols-2 xl:flex xl:items-center gap-3 pt-4">
          <Skeleton className="w-[300px] h-[84px] p-3 rounded-[12px] ml-5 bg-gray-200" />
          <Skeleton className="w-[300px] h-[84px] p-3 rounded-[12px] ml-5 bg-gray-200" />
          <Skeleton className="w-[300px] h-[84px] p-3 rounded-[12px] ml-5 bg-gray-200" />
        </div>
      ) : (
        <div className="grid grid-cols-2 xl:flex xl:items-center gap-3 pt-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Card className="border-[#0DA767] w-[300px] h-[84px] p-3 rounded-[12px] ml-5 bg-[#0DA767]">
                <CardContent className="flex justify-between items-center p-0">
                  <div className="space-y-2">
                    <p className="text-white/80 text-sm">Net tickets revenue</p>
                    <p className="text-white font-semibold text-xl">
                      GBP {WALLET?.data?.escrowEarning || 0}
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
                    <p className="text-[#475367] text-sm">
                      Gross tickets revenue
                    </p>
                    <p className="text-[#344054] font-semibold text-xl">
                      GBP {WALLET?.data?.grossEarnings || 0}
                    </p>
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
          <Tooltip>
            <TooltipTrigger asChild>
              <Card className="border-[#E4E7EC] w-[300px] h-[84px] p-3 rounded-[12px]">
                <CardContent className="flex justify-between items-center p-0">
                  <div className="space-y-2">
                    <p className="text-[#475367] text-sm">Total tickets sold</p>
                    <p className="text-[#344054] font-semibold text-xl">0</p>
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
      )}

      {isPending ? (
        <Loader />
      ) : (
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
                          refetch();
                          clearTimeout(timeOut);
                        }, 200);
                      }}
                      size={20}
                      color="#D0D5DD"
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
                    refetch();
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
                        refetch();
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
                {loading ? (
                  <LoadingList />
                ) : (
                  <TableBody className="[&_tr:last-child]:border-1">
                    {DATA.length === 0 && <EmptyTable />}
                    {DATA.length > 0 &&
                      DATA.map((data) => (
                        <TableRow key={data._id} className="border-[#E4E7EC]">
                          <TableCell className="hidden sm:table-cell">
                            <p className="text-[#475367] text-sm">
                              {data.uniqueCode}
                            </p>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <p className="text-[#475367] text-sm">
                              {data.createdBy}
                            </p>
                          </TableCell>
                          <TableCell>
                            {data.recipients && (
                              <div>
                                <p className="text-[#475367] text-sm">
                                  {data.recipients[0].firstName}{" "}
                                  {data.recipients[0].lastName}
                                </p>
                                <p className="text-[#667185] text-[13px]">
                                  {data.recipients[0].email}
                                </p>
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="text-[#13191C] font-medium">
                            {data.totalAmount}
                          </TableCell>
                          <TableCell className="text-[#475367]">
                            <div className="flex gap-3 items-center">
                              {orderStatusIcon(data.status)}
                              <p className="text-sm text-[#475367]">
                                {capitalizeFirstLetter(data.status)}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="text-[#13191C] gap-3 font-medium">
                            <span>{<TicketIcon width={16} height={16} />}</span>{" "}
                            {data.activityType}
                          </TableCell>
                          <TableCell>
                            <button
                              aria-haspopup="true"
                              className="w-8 h-8 rounded-[8px] flex items-center justify-center border border-[#E4E7EC] bg-white"
                              onClick={() => {
                                setOpenModal(true);
                                setSelectedEvent(data);
                              }}
                            >
                              <VisibleIcon
                                className="h-4 w-4"
                                color="#475367"
                              />
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
              {RESPONSE?.data && (
                <Pagination
                  currentPage={currentPage}
                  pageSize={RESPONSE?.data?.limit}
                  totalCount={RESPONSE.data.totalCount}
                  onNext={() => {
                    setCurrentPage(currentPage + 1);
                    fetchNextPage();
                  }}
                  onPrevious={() => {
                    setCurrentPage(currentPage - 1);
                    fetchPreviousPage();
                  }}
                  onPageChange={(page) => {
                    setCurrentPage(page);
                    refetch();
                  }}
                />
              )}
            </CardFooter>
          </Card>
        </div>
      )}

      <ExportEvents openExport={openExport} setOpenExport={setOpenExport} />
      <ManageOrdersActions
        openModal={openModal}
        setOpenModal={setOpenModal}
        data={selectedEvent}
      />
    </div>
  );
}
