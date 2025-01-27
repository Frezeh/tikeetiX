import BubbleIcon from "@/assets/icons/bubble";
import CreateNewFolderIcon from "@/assets/icons/create-new-folder";
import VisibleIcon from "@/assets/icons/visible-icon";
import { Button } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Filter,
  MoveUpRight,
  SearchIcon,
  Upload,
  WalletIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ExportEvents from "../events/components/export-events";
import FinanceActions from "./finance-actions";
import FinanceWithdrawal from "./finance-withdrawal";

// const DATA = [
//   {
//     id: 1,
//     order_id: "#01234/10",
//     ticket_name: "AI Meetup with Autogon",
//     name: "Billy Butcher",
//     email: "customer@mail.com",
//     amount: "GBP999,999",
//     status: "Completed",
//     category: "Event",
//   },
//   {
//     id: 2,
//     order_id: "#01234/10",
//     ticket_name: "AI Meetup with Autogon",
//     name: "Billy Butcher",
//     email: "customer@email.com",
//     amount: "GBP999,999",
//     status: "Completed",
//     category: "Event",
//   },
// ] as const;

export function getItemColor(status: string) {
  switch (status) {
    case "completed":
      return {
        color: "#036B26",
        bgColor: "#E7F6EC",
      };
    case "processing":
      return {
        color: "#865503",
        bgColor: "#FEF6E7",
      };
    default: {
      return {
        color: "#E72113",
        bgColor: "#FFEBEC",
      };
    }
  }
}

export default function ManageFinance({
  DATA,
  filterValue,
  searchValue,
  setFilterValue,
  setSearchValue,
}: {
  DATA: any[];
  filterValue: string;
  searchValue: string;
  setFilterValue: (value: string) => void;
  setSearchValue: (value: string) => void;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);
  const [openExport, setOpenExport] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openWithdrawalModal, setOpenWithdrawalModal] = useState(false);
  // const [activeTab, setActiveTab] = useState("finance");

  // const [selectedEvent, setSelectedEvent] = useState<(typeof DATA)[number]>(
  //   {} as (typeof DATA)[number]
  // );

  // const queryClient = useQueryClient();
  // const navigate = useNavigate();

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
          <h1 className="font-medium text-[28px]">Finance</h1>
          <p className="text-[#475367]">
            Manage your finances, initiate withdrawals and integrations
          </p>
        </div>
      </div>
      <div className="flex justify-between items-start pt-4 mr-5">
        <div className="grid grid-cols-2 xl:flex xl:items-center gap-3">
          <Card className="border-[#F5FFF0] w-[320px] p-3 rounded-[12px] ml-5 bg-[#F5FFF0]">
            <CardContent className="flex justify-between p-0">
              <div className="flex flex-col justify-between gap-4">
                <div className="space-y-1">
                  <div className="w-6 h-6 rounded-[8px] bg-white border border-[#E4E7EC] flex justify-center items-center">
                    <MoveUpRight size={12} color="#13191C" />
                  </div>
                  <p className="text-sm text-[#667185]">
                    Available for withdrawal
                  </p>
                  <p className="text-xl font-medium text-[#13191C]">
                    GBP999,999,999
                  </p>
                </div>

                <Button
                  onClick={() => setOpenWithdrawalModal(true)}
                  className="h-9 w-[117px] rounded-[8px] gap-2"
                  prefixItem={
                    <div>
                      <MoveUpRight size={15} color="#FFFFFF" />
                    </div>
                  }
                >
                  Withdraw
                </Button>
              </div>

              <CreateNewFolderIcon />
            </CardContent>
          </Card>
          <Card className="border-[#F0F2F5] w-[320px] p-3 rounded-[12px] ml-5 bg-[#FFFFFF]">
            <CardContent className="flex justify-between p-0">
              <div className="flex flex-col justify-between gap-4">
                <div className="space-y-1">
                  <div className="w-6 h-6 rounded-[8px] bg-white border border-[#E4E7EC] flex justify-center items-center">
                    <WalletIcon size={12} color="#13191C" />
                  </div>
                  <p className="text-sm text-[#667185]">Total withdrawals</p>
                  <p className="text-xl font-medium text-[#13191C]">
                    GBP999,999,999
                  </p>
                </div>

                <div className="h-9 flex flex-col justify-end items-end">
                  <button className="text-sm justify-end items-end p-0 bg-transparent text-[#667185] border-b-[1px] border-[#667185] self-start">
                    View report
                  </button>
                </div>
              </div>

              <BubbleIcon />
            </CardContent>
          </Card>
        </div>

        <Link
          className="flex items-center gap-1"
          to={"/finance/withdraw-accounts"}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.99969 3.39784C4.34284 3.39784 2.99969 4.74099 2.99969 6.39784C2.99969 8.0547 4.34284 9.39784 5.99969 9.39784C7.65654 9.39784 8.99969 8.0547 8.99969 6.39784C8.99969 4.74099 7.65654 3.39784 5.99969 3.39784ZM3.99969 6.39784C3.99969 5.29327 4.89512 4.39784 5.99969 4.39784C7.10426 4.39784 7.99969 5.29327 7.99969 6.39784C7.99969 7.50241 7.10426 8.39784 5.99969 8.39784C4.89512 8.39784 3.99969 7.50241 3.99969 6.39784Z"
              fill="#667185"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.2506 1.41229C6.55314 0.737569 5.44625 0.737569 4.74879 1.41229C4.57164 1.58367 4.32531 1.6637 4.08126 1.62918C3.12041 1.49328 2.22492 2.14389 2.05725 3.09971C2.01467 3.34248 1.86243 3.55202 1.6447 3.66754C0.787475 4.12236 0.445427 5.17508 0.8716 6.0469C0.979846 6.26834 0.979846 6.52734 0.8716 6.74878C0.445427 7.62061 0.787475 8.67332 1.6447 9.12814C1.86243 9.24367 2.01467 9.4532 2.05725 9.69597C2.22492 10.6518 3.12041 11.3024 4.08126 11.1665C4.32531 11.132 4.57164 11.212 4.74879 11.3834C5.44625 12.0581 6.55314 12.0581 7.2506 11.3834C7.42775 11.212 7.67407 11.132 7.91812 11.1665C8.87897 11.3024 9.77446 10.6518 9.94213 9.69597C9.98471 9.4532 10.1369 9.24367 10.3547 9.12814C11.2119 8.67332 11.554 7.62061 11.1278 6.74878C11.0195 6.52734 11.0195 6.26834 11.1278 6.0469C11.554 5.17508 11.2119 4.12236 10.3547 3.66754C10.1369 3.55202 9.98471 3.34248 9.94213 3.09971C9.77446 2.14389 8.87897 1.49328 7.91812 1.62918C7.67407 1.6637 7.42775 1.58367 7.2506 1.41229ZM5.44408 2.13102C5.75387 1.83133 6.24551 1.83133 6.5553 2.13102C6.95414 2.51685 7.50871 2.69705 8.05817 2.61933C8.48495 2.55896 8.88269 2.84794 8.95716 3.27249C9.05304 3.81907 9.39579 4.29082 9.88599 4.5509C10.2667 4.75292 10.4187 5.2205 10.2294 5.60774C9.98567 6.10629 9.98567 6.6894 10.2294 7.18795C10.4187 7.57518 10.2667 8.04276 9.88599 8.24478C9.39579 8.50487 9.05304 8.97662 8.95716 9.5232C8.88269 9.94774 8.48495 10.2367 8.05817 10.1764C7.50871 10.0986 6.95414 10.2788 6.5553 10.6647C6.24551 10.9644 5.75387 10.9644 5.44408 10.6647C5.04524 10.2788 4.49067 10.0986 3.94121 10.1764C3.51443 10.2367 3.11669 9.94774 3.04222 9.5232C2.94634 8.97662 2.60359 8.50487 2.11339 8.24478C1.73264 8.04276 1.58071 7.57518 1.77001 7.18795C2.01371 6.6894 2.01371 6.10629 1.77001 5.60774C1.58071 5.2205 1.73264 4.75292 2.11339 4.5509C2.60359 4.29082 2.94634 3.81907 3.04222 3.27249C3.11669 2.84794 3.51443 2.55896 3.94121 2.61933C4.49067 2.69705 5.04524 2.51685 5.44408 2.13102Z"
              fill="#667185"
            />
          </svg>

          <p className="text-xs text-[#667185] font-medium">
            Manage withdrawal accounts
          </p>
        </Link>
      </div>

      <div className="border-t border-[#E4E7EC] w-full my-4 py-5 px-5 space-y-4">
        <div className="flex items-center border-b border-[#F0F2F5] pb-4">
          <p className="text-[#13191C] font-medium text-sm">Withdrawals</p>
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
                      Beneficiary
                    </span>
                  </TableHead>
                  <TableHead className="bg-[#F9FAFB]">
                    <span className="flex items-center gap-3 text-[#475367] font-medium text-sm">
                      Withdrawal amount
                    </span>
                  </TableHead>
                  <TableHead className="flex items-center gap-2 bg-[#F9FAFB]">
                    <span className="flex items-center gap-2 text-[#475367] font-medium text-sm ">
                      Date raised
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
                <LoadingMovieList />
              ) : (
                <TableBody className="[&_tr:last-child]:border-1">
                  {DATA.map((data) => (
                    <TableRow key={data.id} className="border-[#E4E7EC]">
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
                      <TableCell>
                        <div>
                          <p className="text-[#475367] text-sm">{data.name}</p>
                          <p className="text-[#667185] text-[13px]">
                            {data.email}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div
                          className={cn(
                            `flex items-center gap-1 px-3 py-1 rounded-[12px] w-[116px] bg-[${
                              getItemColor(data.status.toLowerCase()).bgColor
                            }]`
                          )}
                        >
                          {data.status.toLowerCase() === "completed" ? (
                            <CircleCheck size={16} color="#036B26" />
                          ) : (
                            <svg
                              width="14"
                              height="15"
                              viewBox="0 0 14 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M2.86627 1.39909C2.86627 1.0309 2.56779 0.732422 2.1996 0.732422C1.83141 0.732422 1.53293 1.0309 1.53293 1.39909V3.79909C1.53293 4.16728 1.83141 4.46576 2.1996 4.46576H4.60004C4.96823 4.46576 5.26671 4.16728 5.26671 3.79909C5.26671 3.4309 4.96823 3.13242 4.60004 3.13242H3.79936C4.69113 2.46227 5.79924 2.06576 7.00004 2.06576C9.94556 2.06576 12.3334 4.45357 12.3334 7.39909C12.3334 10.3446 9.94556 12.7324 7.00004 12.7324C4.05452 12.7324 1.66671 10.3446 1.66671 7.39909C1.66671 7.0309 1.36823 6.73242 1.00004 6.73242C0.631851 6.73242 0.333374 7.0309 0.333374 7.39909C0.333374 11.081 3.31814 14.0658 7.00004 14.0658C10.6819 14.0658 13.6667 11.081 13.6667 7.39909C13.6667 3.71719 10.6819 0.732422 7.00004 0.732422C5.4384 0.732422 4.00215 1.26973 2.86627 2.16853V1.39909Z"
                                fill="#865503"
                              />
                              <path
                                d="M7.00004 5.06576C7.00004 4.69757 6.70156 4.39909 6.33337 4.39909C5.96518 4.39909 5.66671 4.69757 5.66671 5.06576V8.39909C5.66671 8.76728 5.96518 9.06576 6.33337 9.06576H8.33337C8.70156 9.06576 9.00004 8.76728 9.00004 8.39909C9.00004 8.0309 8.70156 7.73242 8.33337 7.73242H7.00004V5.06576Z"
                                fill="#865503"
                              />
                            </svg>
                          )}
                          <p
                            className={cn(
                              "text-sm font-medium",
                              data.status.toLowerCase() === "completed"
                                ? "text-[#036B26]"
                                : data.status.toLowerCase() === "processing"
                                ? "text-[#865503]"
                                : "text-[#E72113]"
                            )}
                          >
                            {data.status}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <button
                          aria-haspopup="true"
                          className="w-8 h-8 rounded-[8px] flex items-center justify-center border border-[#E4E7EC] bg-white"
                          onClick={() => {
                            setOpenModal(true);
                            // setSelectedEvent(data);
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
      <FinanceWithdrawal
        openWithDrawalModal={openWithdrawalModal}
        setOpenWithDrawalModal={setOpenWithdrawalModal}
      />
      <FinanceActions openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
}
