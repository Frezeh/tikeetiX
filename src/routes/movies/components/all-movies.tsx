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
import Loading from "@/components/ui/loading";
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
import { LoadingMovieList } from "@/routes/create-movie/components/loading-movie";
import { getMovieRooms } from "@/services/api/movie-room";
import { allMovieActivities, deleteMovie } from "@/services/api/movies";
import { Movie } from "@/services/models/movies";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
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
import ExportMovies from "./export-movies";
import MovieActions from "./movie-actions";

type Props = {
  allMoviesFilterValue: string;
  setAllMoviesFilterValue: Dispatch<SetStateAction<string>>;
  allMoviesSearchValue: string;
  setAllMoviesSearchValue: Dispatch<SetStateAction<string>>;
};

export default function AllMovies(props: Props) {
  const {
    allMoviesFilterValue,
    setAllMoviesFilterValue,
    allMoviesSearchValue,
    setAllMoviesSearchValue,
  } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [openRemove, setOpenRemove] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [openExport, setOpenExport] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie>({} as Movie);

  const queryClient = useQueryClient();

  const queryParams = useMemo(() => {
    let params = "";

    if (allMoviesFilterValue) {
      params = params + `&status=${allMoviesFilterValue}`;
    }
    if (allMoviesSearchValue) {
      params = params + `&searchTerm=${allMoviesSearchValue}`;
    }

    return params;
  }, [allMoviesFilterValue, allMoviesSearchValue]);

  const { isPending: isDeleting, mutate: remove } = useMutation({
    mutationFn: deleteMovie,
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
    queryKey: ["movies"],
    queryFn: ({ pageParam }) => allMovieActivities(pageParam, 20, queryParams),
    initialPageParam: currentPage,
    getNextPageParam: (lastPage) => lastPage.data.nextPage,
    getPreviousPageParam: (firstPage) => firstPage.data.prevPage,
  });

  const { data: showingRoom } = useQuery({
    queryKey: ["movie-room"],
    queryFn: getMovieRooms,
  });

  const loading = isFetching || isFetchingNextPage || isFetchingPreviousPage;
  const RESPONSE = data?.pages[data?.pages.length - 1];
  const MOVIES = RESPONSE?.data.foundItems || [];

  const priceRange = useCallback(
    (rooms: string[]) => {
      let price: number[] = [];

      showingRoom?.data.forEach((element) => {
        if (rooms.includes(element.id)) {
          price.push(element.ticketPrice);
        }
      });

      return `$${Math.min(...price)} - $${Math.max(...price)}`;
    },
    [showingRoom]
  );

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
    <LoadingMovieList />;
  }

  return (
    <div>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="border-[#E4E7EC] w-[300px] h-[84px] p-3 rounded-[12px] mx-5">
            <CardContent className="flex justify-between items-center p-0">
              <div className="space-y-2">
                <p className="text-[#475367] text-sm">Total tickets created</p>
                <p className="text-[#344054] font-bold text-xl">
                  {MOVIES.length}
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
      <div className="border-t border-[#E4E7EC] w-full my-4 py-5 px-3 space-y-4">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <TicketIcon fill={"#13191C"} />
            <p className="text-[#13191C] font-medium text-sm">Tickets</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Input
              value={allMoviesSearchValue}
              onChange={(e) => setAllMoviesSearchValue(e.target.value)}
              className="w-[250px] h-9 border border-[#D0D5DD] placeholder:text-[#98A2B3]"
              placeholder="Search"
              suffixitem={
                allMoviesSearchValue ? (
                  <XIcon
                    onClick={() => {
                      setAllMoviesSearchValue("");
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
                    onClick={() => setAllMoviesFilterValue("")}
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
                      checked={allMoviesFilterValue === "DRAFT"}
                      onCheckedChange={() => setAllMoviesFilterValue("DRAFT")}
                    >
                      Draft
                    </FilterItem>
                    <FilterItem
                      checked={allMoviesFilterValue === "PENDING"}
                      onCheckedChange={() => setAllMoviesFilterValue("PENDING")}
                    >
                      Pending
                    </FilterItem>
                  </div>
                  <div className="space-y-1">
                    <FilterItem
                      checked={allMoviesFilterValue === "PAUSED"}
                      onCheckedChange={() => setAllMoviesFilterValue("PAUSED")}
                    >
                      Paused
                    </FilterItem>
                    <FilterItem
                      checked={allMoviesFilterValue === "ONGOING"}
                      onCheckedChange={() => setAllMoviesFilterValue("ONGOING")}
                    >
                      Ongoing
                    </FilterItem>
                  </div>
                  <div className="space-y-1">
                    <FilterItem
                      checked={allMoviesFilterValue === "COMPLETED"}
                      onCheckedChange={() =>
                        setAllMoviesFilterValue("COMPLETED")
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
                            src={movie.image}
                          />
                          <div>
                            <p className="text-[#101928] font-medium">
                              {movie.title}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-[#13191C]">
                        {priceRange(movie.movieRooms)}
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
            {RESPONSE?.data && (
              <Pagination
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

      <ExportMovies openExport={openExport} setOpenExport={setOpenExport} />
    </div>
  );
}
