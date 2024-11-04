import BellIcon from "@/assets/icons/bell-icon";
import CopyIcon from "@/assets/icons/copy-icon";
import GBP from "@/assets/icons/gbp.svg";
import MovieIcon from "@/assets/icons/movie-icon";
import PencilIcon from "@/assets/icons/pencil-icon";
import TicketIcon from "@/assets/icons/ticket-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import displayStatusIcon from "@/components/ui/display-status-icon";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserProfile from "@/components/user-profile";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { getMovieTicket } from "@/services/api/ticket";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  CircleEllipsisIcon,
  MapPin,
  SearchIcon,
} from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TicketsSold from "./components/tickets-sold";

export default function MovieDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    isLoading,
    data: MOVIE,
    error,
  } = useQuery({
    queryKey: [`movie-${id}`],
    queryFn: () => getMovieTicket(id!),
    enabled: !!id,
    //refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Movie not found",
        description: "The movie you are looking for does not exist",
        variant: "error",
      });
      navigate("/movies");
    }
  }, [error, navigate]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="pb-3 pt-5 px-5 flex justify-between items-center border-b border-b-[#E4E7EC]">
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-2"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft size={20} color="#667185" />
            <p className="text-[#667185] font-medium text-sm">Back</p>
          </button>
          <div className="bg-[#E4E7EC] h-[38px] w-[1px]" />
          <Link to="/movies" className="flex items-center gap-1">
            <TicketIcon width={16} height={16} />
            <p className="text-[#667185] text-xs">Tickets</p>
          </Link>
          <div className="bg-[#F0F2F5] h-[38px] px-2 rounded-[8px] flex items-center gap-2">
            <ChevronRight size={16} color="#98A2B3" />
            <p className="text-[#667185] font-medium text-xs">Ticket details</p>
          </div>
        </div>
        <div className="flex gap-10 items-center justify-between">
          <Input
            className="w-[175px] sm:w-[200px] xl:w-[375px] h-10 rounded-md pl-10 bg-[#F0F2F5] border-0"
            placeholder="Search here..."
            prefixItem={
              <SearchIcon
                size={20}
                color="#667185"
                className="absolute top-0 left-0 ml-2 mt-2.5 placeholder:text-[#667185] placeholder:text-sm"
              />
            }
          />
          <button>
            <BellIcon />
          </button>
          <UserProfile />
        </div>
      </div>

      <div className="px-5 pt-5 pb-2 border-b border-[#E4E7EC] flex justify-between items-center">
        <div className="space-y-1">
          <p className="text-[#13191C] font-medium text-[28px]">
            Ticket details
          </p>
          <p className="text-[#475367] text-base">
            View full details and metrics for this ticket below
          </p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <Button
            prefixItem={
              <div>
                <PencilIcon width={20} height={20} fill="#FFFFFF" />
              </div>
            }
            className="w-[120px] h-9 gap-2"
            onClick={() => navigate(`/edit-movie/${id}`)}
          >
            Edit ticket
          </Button>

          <CircleEllipsisIcon size={24} color="#667185" className="rotate-90" />
        </div>
      </div>

      <div className="px-5 pt-5 pb-10 border-b border-[#E4E7EC] flex items-center gap-20">
        <div className="flex items-center gap-4 w-[40%]">
          <img
            src={MOVIE?.data.ticket.image}
            alt="movie"
            className="w-20 h-20 rounded-[8px]"
          />
          <div className="space-y-3">
            <p className="text-[#475367] text-sm">name</p>
            <p className="text-[#13191C] text-xl font-medium">
              {MOVIE?.data.ticket.title}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-[#475367] text-sm">Type</p>
          <Badge className="flex items-center gap-2 bg-[#F0F2F5]">
            <MovieIcon width={16} height={16} />
            <span className="text-[#344054] text-sm font-medium">
              Movie ticket
            </span>
          </Badge>
        </div>
        <div className="space-y-3">
          <p className="text-[#475367] text-sm">Status</p>
          <span className="flex items-center gap-2 text-[#475367] text-sm">
            {displayStatusIcon(MOVIE?.data.status!)?.icon}{" "}
            {displayStatusIcon(MOVIE?.data?.status!)?.text}
          </span>
        </div>
      </div>

      <div className="flex justify-between h-full">
        <div className="lg:w-[30%] pl-2 py-7 relative after:content-['_'] after:absolute after:h-[85%] after:my-auto after:border-l-[solid] after:border-l after:right-0 after:top-[0%]">
          <button className="absolute top-0 left-5 bg-[#F0F2F5] w-[113px] h-9 mt-[-20px] rounded-[8px] flex justify-center items-center gap-2">
            <CopyIcon />
            <span className="text-[#667185] font-medium text-sm">
              Copy link
            </span>
          </button>
          <ScrollArea className="h-[80vh]">
            <div className="space-y-8">
              <div className="space-y-2 mr-5">
                <div className="space-y-7 mx-4">
                  <div className="space-y-1">
                    <p className="text-[#667185] text-sm">Description</p>
                    <p className="text-[#13191C] text-sm">
                      {MOVIE?.data.ticket.description}
                    </p>
                  </div>
                  <div className={cn("grid grid-cols-2 gap-7")}>
                    <div>
                      <p className="text-[#667185] text-sm">Genre</p>
                      <p className="text-[#13191C] text-sm font-medium">
                        {MOVIE?.data.ticket.genre}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#667185] text-sm">Ticket price</p>
                      <div className="flex items-center gap-1">
                        {MOVIE?.data?.ticketPrice !== 0 ? (
                          <p className="flex items-center gap-1 text-[15px] font-medium">
                            <img src={GBP} alt="gbp" className="w-3 h-3" />
                            <span className="text-[#13191C]">
                              {MOVIE?.data?.ticketPrice}
                            </span>
                          </p>
                        ) : (
                          <p className="text-[#13191C] text-[15px] font-medium">
                            Free
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-[#667185] text-sm">Age rating</p>
                      <p className="text-[#13191C] text-sm font-medium">
                        {MOVIE?.data.ticket.ageRating}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#667185] text-sm">
                        Playtime/Duration
                      </p>
                      <p className="text-[#13191C] text-sm font-medium">
                        {MOVIE?.data.ticket.startTime
                          ? format(MOVIE?.data.ticket.startTime, "PP")
                          : "---"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#667185] text-sm">
                        Available room types
                      </p>
                      <p className="text-[#13191C] text-sm font-medium"></p>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-[#667185] text-sm">Location</p>
                      <MapPin size={20} color="#98A2B3" />
                    </div>
                    <p className="text-[#13191C] text-sm font-medium">
                      {MOVIE?.data.ticket.location}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#667185] text-sm">Organizer</p>
                    <p className="text-[#13191C] text-sm font-medium">
                      {MOVIE?.data.ticket.organizerName ?? "---"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>

        <TicketsSold ticketSold={MOVIE?.data.ticketSold ?? 0} />
      </div>
    </div>
  );
}
