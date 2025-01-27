import CancelIcon from "@/assets/icons/cancel-icon";
import PauseIcon from "@/assets/icons/pause-icon";
import TicketIcon from "@/assets/icons/ticket-icon";
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
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import FilterItem from "@/components/ui/filter-item";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import Loading from "@/components/ui/loading";
import { LoadingMovieList } from "@/components/ui/loading-movie";
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
import { toast } from "@/hooks/use-toast";
import {
  deleteEventTicket,
  getEventTickets,
  getEventTicketsWithoutParams,
} from "@/services/api/ticket";
import { TicketEvents } from "@/services/models/ticket";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
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
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import EventActions from "./event-actions";
import ExportEvents from "./export-events";
import { __flattenData } from "@/lib/utils";

type Props = {
  activeEventsFilterValue: string;
  setActiveEventsFilterValue: Dispatch<SetStateAction<string>>;
  activeEventsSearchValue: string;
  setActiveEventsSearchValue: Dispatch<SetStateAction<string>>;
};

export default function ActiveEvents(props: Props) {
  const {
    activeEventsFilterValue,
    setActiveEventsFilterValue,
    activeEventsSearchValue,
    setActiveEventsSearchValue,
  } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [openRemove, setOpenRemove] = useState(false);
  const [openHold, setOpenHold] = useState(false);

  const [openFilter, setOpenFilter] = useState(false);
  const [openExport, setOpenExport] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<TicketEvents>(
    {} as TicketEvents
  );

  const queryClient = useQueryClient();

  const queryParams = useMemo(() => {
    let params = "";

    if (activeEventsFilterValue) {
      params = params + `&status=${activeEventsFilterValue}`;
    }
    if (activeEventsSearchValue) {
      params = params + `&searchTerm=${activeEventsSearchValue}`;
    }

    return params;
  }, [activeEventsFilterValue, activeEventsSearchValue]);

  const { isPending: isDeleting, mutate: remove } = useMutation({
    mutationFn: deleteEventTicket,
  });
  // const {
  //   fetchNextPage,
  //   fetchPreviousPage,
  //   refetch,
  //   isFetching,
  //   isFetchingNextPage,
  //   isFetchingPreviousPage,
  //   isPending,
  //   data,
  // } = useInfiniteQuery({
  //   queryKey: ["events", currentPage],
  //   queryFn: ({ pageParam }) => getEvents(pageParam, 20, queryParams),
  //   initialPageParam: currentPage,
  //   getNextPageParam: (lastPage) => lastPage.data.nextPage,
  //   getPreviousPageParam: (firstPage) => firstPage.data.prevPage,
  // });
  // const { isPending: eventsPending, data: events } = useQuery({
  //   queryKey: ["events"],
  //   queryFn: getEventsWithoutParams,
  // });
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
    queryFn: ({ pageParam }) => getEventTickets(pageParam, 20, queryParams),
    initialPageParam: currentPage,
    getNextPageParam: (lastPage) => lastPage.data.nextPage,
    getPreviousPageParam: (firstPage) => firstPage.data.prevPage,
  });
  const { isPending: eventsPending, data: events } = useQuery({
    queryKey: ["events"],
    queryFn: getEventTicketsWithoutParams,
  });

  // const { data: eventLevel } = useQuery({
  //   queryKey: ["event-level"],
  //   queryFn: getAllEventLevel,
  // });

  const loading = isFetching || isFetchingNextPage || isFetchingPreviousPage;
  const RESPONSE = data?.pages[data?.pages.length - 1];
  const EVENTS = RESPONSE?.data.foundItems || [];
  // const EVENTS = __flattenData(data?.pages ?? [])

  const priceRange = useCallback((price?: number) => {
    if (price === 0) {
      return "Free";
    }

    return String(price);
  }, []);

  const ACTIVETICKETS = useMemo(() => {
    // return events?.data?.foundItems?.find((e) => e.startTime > Date.now()) ?? 0;
    return RESPONSE?.data?.totalCount ?? 0;
  }, [events]);

  const deleteTicket = () => {
    remove(selectedEvent.id, {
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

  if (isPending) {
    return <Loader />;
  }

  return (
    <div>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="border-[#E4E7EC] w-[300px] h-[84px] p-3 rounded-[12px] mx-5">
            <CardContent className="flex justify-between items-center p-0">
              <div className="space-y-2">
                <p className="text-[#475367] text-sm">Active tickets</p>
                {eventsPending ? (
                  <Skeleton className="w-10 h-2 rounded-[12px] bg-gray-200" />
                ) : (
                  <p className="text-[#344054] font-bold text-xl h-2">
                    {ACTIVETICKETS}
                  </p>
                )}
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
              value={activeEventsSearchValue}
              onChange={(e) => setActiveEventsSearchValue(e.target.value)}
              className="w-[250px] h-9 border border-[#D0D5DD] placeholder:text-[#98A2B3]"
              placeholder="Search"
              suffixitem={
                activeEventsSearchValue ? (
                  <XIcon
                    onClick={() => {
                      setActiveEventsSearchValue("");
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
                    onClick={() => setActiveEventsFilterValue("")}
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
                      checked={activeEventsFilterValue === "DRAFT"}
                      onCheckedChange={() =>
                        setActiveEventsFilterValue("DRAFT")
                      }
                    >
                      Draft
                    </FilterItem>
                    <FilterItem
                      checked={activeEventsFilterValue === "PENDING"}
                      onCheckedChange={() =>
                        setActiveEventsFilterValue("PENDING")
                      }
                    >
                      Pending
                    </FilterItem>
                  </div>
                  <div className="space-y-1">
                    <FilterItem
                      checked={activeEventsFilterValue === "PAUSED"}
                      onCheckedChange={() =>
                        setActiveEventsFilterValue("PAUSED")
                      }
                    >
                      Paused
                    </FilterItem>
                    <FilterItem
                      checked={activeEventsFilterValue === "ONGOING"}
                      onCheckedChange={() =>
                        setActiveEventsFilterValue("ONGOING")
                      }
                    >
                      Ongoing
                    </FilterItem>
                  </div>
                  <div className="space-y-1">
                    <FilterItem
                      checked={activeEventsFilterValue === "COMPLETED"}
                      onCheckedChange={() =>
                        setActiveEventsFilterValue("COMPLETED")
                      }
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
          className="rounded-[12px] border-[#E4E7EC] shadow-none"
        >
          <CardContent className="p-0 m-0">
            <Table className="rounded-[40px]">
              <TableHeader className="rounded-40px]">
                <TableRow className="border-[#E4E7EC]">
                  <TableHead className="text-[#475367] font-medium pr-20 bg-[#F9FAFB] rounded-tl-[12px]">
                    <span className="flex items-center justify-between">
                      Event name{" "}
                      <ChevronsUpDown
                        color="#98A2B3"
                        className="cursor-pointer"
                        size={20}
                      />
                    </span>
                  </TableHead>
                  <TableHead className="text-[#475367] font-medium flex items-center gap-2 bg-[#F9FAFB]">
                    <span className="flex items-center gap-2">
                      Price range{" "}
                      <ChevronsUpDown
                        color="#98A2B3"
                        className="cursor-pointer"
                        size={20}
                      />
                    </span>
                  </TableHead>
                  <TableHead className="text-[#475367] font-medium bg-[#F9FAFB]">
                    <span className="flex items-center gap-3">
                      Qty sold{" "}
                      <ListFilter
                        color="#98A2B3"
                        className="cursor-pointer"
                        size={20}
                      />
                    </span>
                  </TableHead>
                  <TableHead className="hidden md:table-cell bg-[#F9FAFB] rounded-tr-[12px]">
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              {loading ? (
                <LoadingMovieList />
              ) : (
                <TableBody className="[&_tr:last-child]:border-1">
                  {EVENTS.map((event) => (
                    <TableRow key={event.id} className="border-[#E4E7EC]">
                      <TableCell className="hidden sm:table-cell">
                        <div className="flex items-center gap-2">
                          <img
                            alt="Event image"
                            className="aspect-square rounded-md object-cover w-[43px] h-[43px]"
                            src={event.ticket.image}
                          />
                          <div>
                            <p className="text-[#101928] font-medium">
                              {event.ticket.title}
                            </p>
                            <p className="text-sm text-[#667185]">
                              {event.ticket.startTime
                                ? format(event.ticket.startTime, "d MMM. yyyy")
                                : ""}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-[#13191C]">
                        {priceRange(event.ticketPrice)}
                      </TableCell>
                      <TableCell className="text-[#475367]">{0}</TableCell>
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

      <Dialog open={openRemove} onOpenChange={setOpenRemove}>
        <DialogContent
          className="w-3/4 sm:max-w-[400px] flex flex-col justify-center items-center gap-2 rounded-[8px] px-5 py-[15px] space-y-2"
          closeStyle="bg-white w-[34px] h-[34px] p-0 top-0 right-[-10%] top-[-8px] flex justify-center items-center rounded-[8px]"
        >
          <DialogHeader className="self-center">
            <div className="w-full flex items-center justify-center self-center">
              <CancelIcon />
            </div>
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
          <DialogFooter className="flex justify-between items-center pt-2">
            <Button
              className="h-9 w-[178px]"
              variant="ghost"
              onClick={() => setOpenRemove(false)}
            >
              Cancel
            </Button>
            <Button
              className="h-9 w-[178px]"
              variant="destructive"
              onClick={deleteTicket}
            >
              {isDeleting ? <Loading className="w-4 h-4" /> : "Delete"}
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
            <div className="w-full flex items-center justify-center self-center">
              <PauseIcon />
            </div>
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
            <Button className="h-9 w-[178px]" variant="ghost">
              Cancel
            </Button>
            <Button
              className="h-9 w-[178px] bg-[#13191C] bg-gradient-to-r from-[#13191C] to-[#13191C]"
              variant="gradient"
            >
              Pause
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ExportEvents openExport={openExport} setOpenExport={setOpenExport} />
    </div>
  );
}
