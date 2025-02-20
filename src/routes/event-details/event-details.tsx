import BellIcon from "@/assets/icons/bell-icon";
import CopyIcon from "@/assets/icons/copy-icon";
import GBP from "@/assets/icons/gbp.svg";
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
import { getEvent } from "@/services/api/events";
import { Ticket } from "@/services/models/events";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  CircleEllipsisIcon,
  MapPin,
  SearchIcon,
} from "lucide-react";
import { useEffect, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TicketsSold from "./components/tickets-sold";

export default function EventDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    isLoading,
    data: EVENT,
    error,
  } = useQuery({
    queryKey: [`event-${id}`],
    queryFn: () => getEvent(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Event not found",
        description: "The event you are looking for does not exist",
        variant: "error",
      });
      navigate("/events");
    }
  }, [error, navigate]);

  const ticketPrice = useMemo(() => {
    const tickets = EVENT?.data?.event?.tickets;

    if (!tickets || tickets?.length < 1) {
      return "Free";
    }

    return `£${Math.min(...tickets.map((t) => t.ticketPrice))} - £${Math.max(
      ...tickets.map((t) => t.ticketPrice)
    )}`;
  }, [EVENT]);

  const quantitySold = useMemo(() => {
    const tickets = EVENT?.data?.event?.tickets;

    if (!tickets || tickets?.length < 1) {
      return 0;
    }

    const quantitySold = tickets.reduce((acc: number, cur: Ticket) => {
      return acc + cur.ticketSold;
    }, 0);

    return quantitySold;
  }, [EVENT]);

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
          <Link to="/events" className="flex items-center gap-1">
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
            onClick={() => navigate(`/edit-event/${id}`)}
          >
            Edit ticket
          </Button>

          <CircleEllipsisIcon size={24} color="#667185" className="rotate-90" />
        </div>
      </div>

      <div className="px-5 pt-5 pb-10 border-b border-[#E4E7EC] flex items-center gap-20">
        <div className="flex items-center gap-4 w-[40%]">
          <img
            src={EVENT?.data?.event?.image}
            alt="movie"
            className="w-20 h-20 rounded-[8px]"
          />
          <div className="space-y-3">
            <p className="text-[#475367] text-sm">Name</p>
            <p className="text-[#13191C] text-xl font-medium">
              {EVENT?.data?.event?.title}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-[#475367] text-sm">Type</p>
          <Badge className="flex items-center gap-2 bg-[#F0F2F5]">
            <TicketIcon width={16} height={16} />
            <span className="text-[#344054] text-sm font-medium">
              Event ticket
            </span>
          </Badge>
        </div>
        <div className="space-y-3">
          <p className="text-[#475367] text-sm">Status</p>
          <span className="flex items-center gap-2 text-[#475367] text-sm">
            {displayStatusIcon(EVENT?.data?.event?.status!)?.icon}{" "}
            {displayStatusIcon(EVENT?.data?.event?.status!)?.text}
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
                      {EVENT?.data?.event?.description}
                    </p>
                  </div>
                  <div className={cn("grid grid-cols-2 gap-7")}>
                    <div>
                      <p className="text-[#667185] text-sm">Category</p>
                      <p className="text-[#13191C] text-sm font-medium">
                        {EVENT?.data?.event?.category}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#667185] text-sm">Ticket price</p>
                      <div className="flex items-center gap-1">
                        {ticketPrice !== "Free" ? (
                          <p className="flex items-center gap-1 text-[15px] font-medium">
                            <img src={GBP} alt="gbp" className="w-3 h-3" />
                            <span className="text-[#13191C]">
                              {ticketPrice}
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
                      <p className="text-[#667185] text-sm">Type</p>
                      <p className="text-[#13191C] text-sm font-medium">
                        {EVENT?.data?.event?.type}
                      </p>
                    </div>
                    <div>
                      <p className="text-[#667185] text-sm">Start time</p>
                      <p className="text-[#13191C] text-sm font-medium">
                        {EVENT?.data?.event?.startTime
                          ? format(EVENT?.data?.event?.startTime, "PP")
                          : "---"}
                      </p>
                    </div>
                    {/* <div>
                      <p className="text-[#667185] text-sm">
                       Level
                      </p>
                      <p className="text-[#13191C] text-sm font-medium">{EVENT?.data.}</p>
                    </div> */}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-[#667185] text-sm">Location</p>
                      <MapPin size={20} color="#98A2B3" />
                    </div>
                    <p className="text-[#13191C] text-sm font-medium">
                      {EVENT?.data?.event?.location}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#667185] text-sm">Organizer</p>
                    <p className="text-[#13191C] text-sm font-medium">
                      {EVENT?.data?.event?.organizerName ?? "---"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>

        <TicketsSold ticketSold={quantitySold ?? 0} />
      </div>
    </div>
  );
}
