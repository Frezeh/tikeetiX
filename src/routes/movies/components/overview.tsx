import RemoveIcon from "@/assets/icons/remove-icon";
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
import {
  LoadingMovieGrid,
  LoadingMovieList,
} from "@/components/ui/loading-movie";
import Pagination from "@/components/ui/pagination";
import Ratings from "@/components/ui/ratings";
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
import { cn } from "@/lib/utils";
import { deleteMovieTicket, getMovieTickets } from "@/services/api/ticket";
import { Movie } from "@/services/models/movies";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  ChevronRight,
  ChevronsUpDown,
  Filter,
  LayoutGrid,
  List,
  ListFilter,
  SearchIcon,
  XIcon,
} from "lucide-react";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import MovieActions from "./movie-actions";

type Props = {
  overviewFilterValue: string;
  setOverviewFilterValue: Dispatch<SetStateAction<string>>;
  overviewSearchValue: string;
  setOverviewSearchValue: Dispatch<SetStateAction<string>>;
};

export default function Overview(props: Props) {
  const {
    overviewFilterValue,
    setOverviewFilterValue,
    overviewSearchValue,
    setOverviewSearchValue,
  } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [openRemove, setOpenRemove] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie>({} as Movie);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending: isDeleting, mutate: remove } = useMutation({
    mutationFn: deleteMovieTicket,
  });

  const queryParams = useMemo(() => {
    let params = "";

    if (overviewFilterValue) {
      params = params + `&status=${overviewFilterValue}`;
    }
    if (overviewSearchValue) {
      params = params + `&searchTerm=${overviewSearchValue}`;
    }

    return params;
  }, [overviewFilterValue, overviewSearchValue]);

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
    queryKey: ["movies"],
    queryFn: ({ pageParam }) => getMovieTickets(pageParam, 20, queryParams),
    initialPageParam: currentPage,
    getNextPageParam: (lastPage) => lastPage.data.nextPage,
    getPreviousPageParam: (firstPage) => firstPage.data.prevPage,
  });

  const loading = isFetching || isFetchingNextPage || isFetchingPreviousPage;
  const RESPONSE = data?.pages[data?.pages.length - 1];
  const MOVIES = RESPONSE?.data.foundItems || [];

  const priceRange = useCallback((price?: number) => {
    if (price === 0) {
      return "Free";
    }

    return String(price);
  }, []);

  const deleteTicket = () => {
    remove(selectedMovie.id, {
      onSuccess: () => {
        setOpenRemove(false);
        toast({
          title: "Ticket deleted successfully",
          variant: "success",
        });
        queryClient.invalidateQueries();
      },
      onError: () => {
        toast({
          title: "Failed to delete ticket",
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
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Card className="border-[#E4E7EC] w-[300px] h-[84px] p-3 rounded-[12px] ml-5">
              <CardContent className="flex justify-between items-center p-0">
                <div className="space-y-2">
                  <p className="text-[#475367] text-sm">Total movies created</p>
                  <p className="text-[#344054] font-bold text-xl">
                    {RESPONSE?.data.totalCount ?? 0}
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
      </div>

      <div className="border-t border-[#E4E7EC] w-full my-4 py-5 px-3 space-y-4">
        <div className="flex items-center border-b border-[#F0F2F5] pb-4">
          <div className="flex items-center gap-2">
            <TicketIcon fill={"#13191C"} />
            <p className="text-[#13191C] font-medium text-sm">
              {layout === "grid" ? "Movies" : "Tickets"}
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="w-[72px] h-9 flex items-center">
              <button
                className={cn(
                  "w-9 h-9 bg-white rounded-l-[8px] flex items-center justify-center border-y border-l border-[#D0D5DD] transition-all duration-200",
                  layout === "grid" && "bg-[#F0F2F5]"
                )}
                onClick={() => setLayout("grid")}
              >
                <LayoutGrid
                  color={layout === "grid" ? "#13191C" : "#98A2B3"}
                  size={20}
                />
              </button>
              <button
                className={cn(
                  "w-9 h-9 bg-white rounded-r-[8px] flex items-center justify-center border border-[#D0D5DD] transition-all duration-200",
                  layout === "list" && "bg-[#F0F2F5]"
                )}
                onClick={() => setLayout("list")}
              >
                <List
                  color={layout === "list" ? "#13191C" : "#98A2B3"}
                  size={20}
                />
              </button>
            </div>
            <Input
              value={overviewSearchValue}
              onChange={(e) => setOverviewSearchValue(e.target.value)}
              className="w-[250px] h-9 border border-[#D0D5DD] placeholder:text-[#98A2B3]"
              placeholder="Search"
              suffixitem={
                overviewSearchValue ? (
                  <XIcon
                    onClick={() => {
                      setOverviewSearchValue("");
                      const timeOut = setTimeout(() => {
                        refetch();
                        clearTimeout(timeOut);
                      }, 200);
                    }}
                    size={20}
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
                    onClick={() => setOverviewFilterValue("")}
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
                      checked={overviewFilterValue === "DRAFT"}
                      onCheckedChange={() => setOverviewFilterValue("DRAFT")}
                    >
                      Draft
                    </FilterItem>
                    <FilterItem
                      checked={overviewFilterValue === "PENDING"}
                      onCheckedChange={() => setOverviewFilterValue("PENDING")}
                    >
                      Pending
                    </FilterItem>
                  </div>
                  <div className="space-y-1">
                    <FilterItem
                      checked={overviewFilterValue === "PAUSED"}
                      onCheckedChange={() => setOverviewFilterValue("PAUSED")}
                    >
                      Paused
                    </FilterItem>
                    <FilterItem
                      checked={overviewFilterValue === "ONGOING"}
                      onCheckedChange={() => setOverviewFilterValue("ONGOING")}
                    >
                      Ongoing
                    </FilterItem>
                  </div>
                  <div className="space-y-1">
                    <FilterItem
                      checked={overviewFilterValue === "COMPLETED"}
                      onCheckedChange={() =>
                        setOverviewFilterValue("COMPLETED")
                      }
                    >
                      Completed
                    </FilterItem>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {layout === "grid" ? (
          loading ? (
            <LoadingMovieGrid />
          ) : (
            <>
              <div className="grid grid-cols-4 gap-4 mr-10">
                {MOVIES.map((movie) => (
                  <div
                    key={movie.id}
                    className="relative flex flex-col justify-center overflow-hidden w-full h-[350px] rounded-[12px] border border-[#E4E7EC] mb-2"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-[20px] overflow-hidden rounded-[12px] w-full h-full pointer-events-none bg-[url('./assets/images/bad-boys.png')]"
                      style={{
                        backgroundImage: "url(" + movie.ticket.image + ")",
                      }}
                    />
                    <div className="absolute top-4 left-0 right-0 w-full inline-flex overflow-hidden justify-center rounded-[10px] items-center z-20">
                      <img
                        src={movie.ticket.image}
                        alt="movie"
                        className="w-[147px] h-[170px] rounded-[10px]"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 w-full h-[40%] bg-[#13191C] backdrop-blur-md rounded-b-[12px] p-4 space-y-1">
                      <p className="text-lg font-medium text-white truncate ...">
                        {movie.ticket.title}
                      </p>
                      <div className="flex items-center gap-2">
                        <TicketIcon fill="#667185" width={18} height={18} />
                        <p className="text-sm text-white">{0} tickets sold</p>
                      </div>
                      <div className="flex gap-0.5 items-center">
                        <Ratings />
                        <p className="text-sm text-[#667185]">{3.5}</p>
                      </div>
                      <div className="flex justify-end self-end items-center">
                        <button
                          className="flex justify-end self-end items-center gap-1"
                          onClick={() => navigate(`/movie-details/${movie.id}`)}
                        >
                          <p className="text-sm text-success-emphasis3 font-medium">
                            View
                          </p>
                          <ChevronRight color="#9DF316" size={20} />
                        </button>
                      </div>
                    </div>
                    <div className="absolute bottom-[40%] left-0 right-0 w-full h-[40%] bg-gradient-to-b from-[#12121200] to-[#121212] from-[0%] to-[60%]" />
                  </div>
                ))}
              </div>
              {RESPONSE?.data && (
                <div className="flex items-center justify-center border-t border-[#E4E7EC] self-center p-5">
                  <Pagination
                    // currentPage={currentPage}
                    // pageSize={10}
                    // totalCount={200} // TODO: Get from API
                    currentPage={currentPage}
                    pageSize={RESPONSE?.data.limit}
                    totalCount={MOVIES.length} // TODO: Get from API
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
                </div>
              )}
              {/* <div className="flex items-center justify-center border-t border-[#E4E7EC] self-center p-5">
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
              </div> */}
            </>
          )
        ) : (
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
                        Movie name{" "}
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
                    <TableHead className="text-[#475367] font-medium bg-[#F9FAFB]">
                      Rating
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
                    {MOVIES.map((movie) => (
                      <TableRow key={movie.id} className="border-[#E4E7EC]">
                        <TableCell className="hidden sm:table-cell">
                          <div className="flex items-center gap-2">
                            <img
                              alt="Movie image"
                              className="aspect-square rounded-md object-cover w-[43px] h-[43px]"
                              src={movie.ticket.image}
                            />
                            <div>
                              <p className="text-[#101928] font-medium">
                                {movie.ticket.title}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium text-[#13191C]">
                          {priceRange(movie.ticketPrice)}
                        </TableCell>
                        <TableCell className="text-[#475367]">{0}</TableCell>
                        <TableCell className="text-[#475367]">
                          <div className="flex gap-0.5 items-center">
                            <Ratings />
                            <p className="text-sm text-[#667185]">{3.5}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <MovieActions
                            movie={movie}
                            setOpenRemove={setOpenRemove}
                            setSelectedMovie={setSelectedMovie}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            </CardContent>
            <CardFooter className="flex items-center justify-center border-t border-[#E4E7EC] mt-5 self-center p-5">
              {/* <div className="flex items-center gap-2">
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
              </div> */}
              {RESPONSE?.data && (
                <Pagination
                  currentPage={currentPage}
                  pageSize={RESPONSE?.data.limit}
                  totalCount={RESPONSE?.data.totalCount}
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
        )}
      </div>

      <Dialog open={openRemove} onOpenChange={setOpenRemove}>
        <DialogContent
          className="w-3/4 sm:max-w-[400px] flex flex-col justify-center items-center gap-2 rounded-[8px] px-5 py-[15px] space-y-2"
          closeStyle="bg-white w-[34px] h-[34px] p-0 top-0 right-[-10%] top-[-8px] flex justify-center items-center rounded-[8px]"
        >
          <DialogHeader className="self-center">
            <div className="w-full flex items-center justify-center self-center">
              <RemoveIcon />
            </div>
          </DialogHeader>
          <DialogDescription className="text-center text-[#13191C] text-lg font-medium">
            Delete ticket
          </DialogDescription>

          <DialogFooter className="flex justify-between items-center pt-2">
            <Button
              className="h-9 w-[178px]"
              variant="ghost"
              onClick={() => setOpenRemove(false)}
            >
              No, cancel
            </Button>
            <Button
              className="h-9 w-[178px]"
              variant="destructive"
              onClick={deleteTicket}
            >
              {isDeleting ? <Loading className="w-4 h-4" /> : "Yes, delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
