import TicketIcon from "@/assets/icons/ticket-icon";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import displayStatusIcon from "@/components/ui/display-status-icon";
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
import { toast } from "@/hooks/use-toast";
import { deleteEvent, getEvents } from "@/services/api/events";
import { Events, Ticket } from "@/services/models/events";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { format } from "date-fns";
import {
  ChevronsUpDown,
  Filter,
  ListFilter,
  SearchIcon,
  Upload,
  XIcon,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import EventActions from "./event-actions";
import { OverviewDialogue } from "./overview-dialog";
import EmptyTable from "@/components/empty-table";

type Props = {
  filterValue: string;
  setFilterValue: (value: string) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
};
export default function Overview({
  filterValue,
  setFilterValue,
  searchValue,
  setSearchValue,
}: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  // const [currentImage, setCurrentImage] = useState(1);
  const [openRemove, setOpenRemove] = useState(false);
  const [openHold, setOpenHold] = useState(false);
  const [openExport, setOpenExport] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Events>({} as Events);
  const [openFilter, setOpenFilter] = useState(false);

  const queryClient = useQueryClient();

  const queryParams = useMemo(() => {
    let params = "";

    if (filterValue) {
      params = params + `&status=${filterValue}`;
    }
    if (searchValue) {
      params = params + `&searchTerm=${searchValue}`;
    }

    return params;
  }, [filterValue, searchValue]);

  const { isPending: isDeleting, mutate: remove } = useMutation({
    mutationFn: deleteEvent,
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
    queryKey: ["events", currentPage],
    queryFn: ({ pageParam }) => getEvents(pageParam, 20, queryParams),
    initialPageParam: currentPage,
    getNextPageParam: (lastPage) => lastPage.data.nextPage,
    getPreviousPageParam: (firstPage) => firstPage.data.prevPage,
  });

  const loading = isFetching || isFetchingNextPage || isFetchingPreviousPage;
  const RESPONSE = data?.pages[data?.pages.length - 1];
  // const EVENTS = RESPONSE?.data.foundItems || [];
  const EVENTS = data?.pages.flatMap((page) => page.data.foundItems) || [];

  // const TOTALCOUNT = data?.pages[0]?.data.totalCount || 0;

  const priceRange = useCallback((tickets?: Ticket[]) => {
    if (!tickets || tickets?.length < 1) {
      return "Free";
    }

    return `£${Math.min(...tickets.map((t) => t.ticketPrice))} - £${Math.max(
      ...tickets.map((t) => t.ticketPrice)
    )}`;
  }, []);

  const quantitySold = useCallback((tickets?: Ticket[]) => {
    if (!tickets || tickets?.length < 1) {
      return 0;
    }

    const quantitySold = tickets.reduce((acc: number, cur: Ticket) => {
      return acc + cur.ticketSold;
    }, 0);

    return quantitySold;
  }, []);

  const deleteTicket = () => {
    remove(selectedEvent._id, {
      onSuccess: () => {
        setOpenRemove(false);
        toast({
          title: "Ticket cancelled successfully",
          variant: "success",
        });
        queryClient.invalidateQueries();
      },
      onError: () => {
        toast({
          title: "Failed to cancel ticket",
          variant: "error",
        });
      },
    });
  };

  const holdTicket = () => {};

  useEffect(() => {
    return () => {
      setFilterValue("");
      const timeOut = setTimeout(() => {
        refetch();
        clearTimeout(timeOut);
      }, 200);
    };
  }, []);

  if (isPending) {
    return <Loader />;
  }

  // const scrollToImage = (i: number) => {
  //   setCurrentImage(i);
  //   refs[i].current.scrollIntoView({
  //     behavior: "smooth",
  //     block: "nearest",
  //     inline: "start",
  //   });
  // };

  // const totalImages = DATA.length;

  // const nextImage = () => {
  //   if (currentImage >= totalImages - 1) {
  //     scrollToImage(0);
  //   } else {
  //     scrollToImage(currentImage + 1);
  //   }
  // };

  // const previousImage = () => {
  //   if (currentImage === 0) {
  //     scrollToImage(totalImages - 1);
  //   } else {
  //     scrollToImage(currentImage - 1);
  //   }
  // };

  if (isPending) {
    return <Loader />;
  }

  return (
    <div>
      <OverviewDialogue
        deleteTicket={deleteTicket}
        openRemove={openRemove}
        setOpenRemove={setOpenRemove}
        holdTicket={holdTicket}
        openHold={openHold}
        setOpenHold={setOpenHold}
        openExport={openExport}
        setOpenExport={setOpenExport}
        isDeleting={isDeleting}
        isUpdating={false}
      />
      <div className="grid grid-cols-2 xl:flex xl:items-center gap-2 mt-8">
        <Tooltip>
          <TooltipTrigger asChild>
            <Card className="border-[#E4E7EC] w-[300px] h-[84px] p-3 rounded-[12px] ml-5">
              <CardContent className="flex justify-between items-center p-0">
                <div className="space-y-2">
                  <p className="text-[#475367] text-sm">Total events created</p>
                  <p className="text-[#344054] font-bold text-xl">
                    {RESPONSE?.data?.totalCount || 0}
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
                  <p className="text-[#475367] text-sm">Tickets sold</p>
                  <p className="text-[#344054] font-bold text-xl">0</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#0ea66729] border border-[#0da7671a] flex justify-center items-center">
                  <TicketIcon fill="#0DA767" />
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
                  <p className="text-[#475367] text-sm">Tickets unsold</p>
                  <p className="text-[#344054] font-bold text-xl">0</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#e7211329] border border-[#bd1b0f1a] flex justify-center items-center">
                  <TicketIcon fill="#E72113" />
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
      <div className="border-b border-[#E4E7EC] w-full overflow-hidden py-5 space-y-4">
        {/* {DATA.length > 0 && (
          // <div className="relative flex justify-center w-full items-center">
          //   <div className="relative items-center justify-center w-full mx-12">
          //     <div className="carousel gap-4 xl:w-[904px] sm:w-[640px] 2xl:w-full">
          //       {DATA.map((d, i) => (
          //         <div
          //           className="min-w-0 shrink-0 grow-0 basis-1/3 xl:basis-1/4  last-of-type:mr-5"
          //           key={i}
          //           ref={refs[i]}
          //         >
          //           <div className="bg-white border border-[#E4E7EC] rounded-[10px] pl-2 pr-6 flex justify-between">
          //             <div className="flex items-center gap-4">
          //               <div className="my-[15px]">
          //                 <img
          //                   src={d.image}
          //                   alt="ticket"
          //                   className="w-[43px] h-[74px] rounded-l-[5px]"
          //                 />
          //               </div>
          //               <div className="flex flex-col justify-between gap-[6px] my-[15px]">
          //                 <p className="text-[#101928] lg:max-w-28 2xl:max-w-52  flex-wrap font-medium text-sm truncate ...">
          //                   {d.title}
          //                 </p>
          //                 <div className="flex items-center gap-1">
          //                   <CalendarIcon size={12} color="#667185" />
          //                   <p className="text-[#667185] text-xs">
          //                     {d.startTime
          //                       ? format(d.startTime, "MMM dd, h:mm a")
          //                       : ""}
          //                   </p>
          //                 </div>
          //                 <div className="flex items-center gap-1">
          //                   <UserGroupIcon />
          //                   <p className="text-[#667185] text-xs"></p>
          //                 </div>
          //               </div>
          //             </div>
          //             <div className="flex flex-col items-center ml-[-24px]">
          //               <div className="w-[17px] h-[17px] bg-white rounded-full border border-[#E4E7EC] mt-[-5px]" />
          //               <div className="w-[1px] h-full border border-[#E4E7EC] border-dashed" />
          //               <div className="w-[17px] h-[17px] bg-white rounded-full border border-[#E4E7EC] mb-[-5px]" />
          //             </div>
          //           </div>
          //         </div>
          //       ))}
          //     </div>
          //   </div>

          //   <button
          //     onClick={previousImage}
          //     className="absolute top-0 left-0 z-30 lg:flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none hidden"
          //   >
          //     <span className="inline-flex items-center justify-center w-[30px] h-[120px] bg-white border border-[#E4E7EC] shadow-md rounded-l-[10px]">
          //       <ChevronLeftIcon size={24} color="#98A2B3" />
          //     </span>
          //   </button>
          //   <button
          //     onClick={nextImage}
          //     className="absolute top-0 right-0 z-30 lg:flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none hidden"
          //   >
          //     <span className="inline-flex items-center justify-center w-[30px] h-[120px] bg-white border border-[#E4E7EC] shadow-md rounded-r-[10px]">
          //       <ChevronRightIcon size={24} color="#98A2B3" />
          //     </span>
          //   </button>
          // </div>
        )} */}
        <div className="border-t border-[#E4E7EC] w-full my-4 py-5 px-3 space-y-4">
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <TicketIcon fill={"#13191C"} />
              <p className="text-[#13191C] font-medium text-sm">Events</p>
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
                    <TableHead className="text-[#475367] font-medium">
                      Status
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                {loading ? (
                  <LoadingList />
                ) : (
                  <TableBody className="[&_tr:last-child]:border-1">
                    {EVENTS.length === 0 && <EmptyTable />}
                    {EVENTS.length > 0 &&
                      EVENTS.map((event: Events) => (
                        <TableRow key={event._id} className="border-[#E4E7EC]">
                          <TableCell className="hidden sm:table-cell">
                            <div className="flex items-center gap-2">
                              <img
                                alt="Event image"
                                className="aspect-square rounded-md object-cover w-[43px] h-[43px]"
                                src={event.image}
                              />
                              <div>
                                <p className="text-[#101928] font-medium">
                                  {event.title}
                                </p>
                                <p className="text-sm text-[#667185]">
                                  {event.startTime
                                    ? format(event.startTime, "d MMM. yyyy")
                                    : ""}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium text-[#13191C]">
                            {priceRange(event.tickets)}
                          </TableCell>
                          <TableCell className="text-[#475367]">
                            {quantitySold(event.tickets)}
                          </TableCell>
                          <TableCell className="text-[#475367]">
                            <span className="flex items-center gap-1">
                              {displayStatusIcon(event.status)?.icon}{" "}
                              {displayStatusIcon(event.status)?.text}
                            </span>
                          </TableCell>
                          <TableCell>
                            <EventActions
                              event={event}
                              setOpenRemove={setOpenRemove}
                              setSelectedEvent={setSelectedEvent}
                              setOpenHold={setOpenHold}
                            />
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
                  pageSize={RESPONSE?.data.limit}
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
      </div>
    </div>
  );
}
