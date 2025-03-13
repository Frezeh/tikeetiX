import AiStars from "@/assets/icons/ai-stars";
import AirplaneIcon from "@/assets/icons/airplane";
import ChatIcon from "@/assets/icons/chat-icon";
import FilmRoolIcon from "@/assets/icons/film-rool";
import LoudSpeaker from "@/assets/icons/loud-speaker";
import TicketIcon from "@/assets/icons/ticket-icon";
import TikeetiEventIcon from "@/assets/icons/tikeeti-event";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { cn, getTimeOfDay } from "@/lib/utils";
import { useProfileContext } from "@/provider/profile-provider";
import { format } from "date-fns";
import { Calendar, Check, ChevronRight, CircleIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { profile } = useProfileContext();
  const navigate = useNavigate();
  const [openTicketModal, setOpenTicketModal] = useState(false);
  const [ticketType, setTicketType] = useState("");

  return (
    <div className="flex flex-col justify-center items-center self-center px-10 h-[calc(100vh/1.5)]">
      <div className="flex gap-1 items-center justify-between">
        <div className="flex gap-2 items-center">
          <Calendar size={12} color="#344054" />
          <p className="text-[#475467] text-xs">Today’s Date</p>
        </div>
        <p className="font-bold text-base text-[#344054]">
          {format(new Date(), "d MMMM, yyyy")}
        </p>
      </div>
      <div className="space-y-1 flex flex-col items-center">
        <p className="font-medium text-2xl text-[#13191C]">
          Welcome {profile?.firstName} {profile?.lastName}
        </p>
        <p className="text-base text-[#475367]">
          Good {getTimeOfDay(new Date())} 😊
        </p>
      </div>
      <div className="py-10 flex items-center justify-between gap-2">
        <Card
          className="px-[15px] py-5 bg-transparent border-[#E4E7EC] lg:w-[200px] xl:w-[262px] h-[129px] rounded-[12px] cursor-pointer"
          onClick={() => setOpenTicketModal(true)}
        >
          <CardContent className="p-0 space-y-4 relative flex justify-between items-center">
            <div className="space-y-1">
              <div className="w-10 h-10 rounded-full bg-[#F0F2F5] flex justify-center items-center">
                <Calendar size={20} color="#344054" />
              </div>
              <p className="text-sm xl:text-base text-[#13191C]">
                Create a ticket
              </p>
            </div>

            <ChevronRight size={30} color="#13191C" />
          </CardContent>
        </Card>
        <Card
          className="px-[15px] py-5 bg-transparent border-[#E4E7EC] lg:w-[200px] xl:w-[262px] h-[129px] rounded-[12px] cursor-pointer"
          //onClick={() => navigate("/marketing")}
        >
          <CardContent className="p-0 space-y-4 relative flex justify-between items-center">
            <div className="space-y-1">
              <div className=" flex gap-4 items-center">
                <div className="w-10 h-10 rounded-full bg-[#F0F2F5] flex justify-center items-center">
                  <LoudSpeaker fill="#13191C" />
                </div>
                <Badge className="text-[10px] font-medium text-[#344054] bg-[#D0D5DD] rounded-[10px] h-[15px]">
                  COMING SOON
                </Badge>
              </div>
              <p className="text-sm xl:text-base text-[#13191C]">
                Marketing feeds & blogs
              </p>
            </div>

            <ChevronRight size={30} color="#13191C" />
          </CardContent>
        </Card>
        <Card className="border-0 lg:w-[200px] xl:w-[262px] h-[129px] rounded-[12px] flex items-center justify-center cursor-pointer">
          <CardContent className="px-[15px] py-5 h-[124px] rounded-[12px] lg:w-[195px] xl:w-[257px] bg-[#F0F2F5] border border-[#D0D5DD] space-y-1 relative flex flex-col">
            <div className=" flex gap-4 items-center">
              <div className="w-10 h-10 rounded-[8px] ai-gradient flex justify-center items-center">
                <div className="w-[38px] h-[38px] flex justify-center items-center bg-[#F0F2F5] rounded-[8px]">
                  <AiStars gradient />
                </div>
              </div>
              <Badge className="text-[10px] font-medium text-[#344054] bg-[#D0D5DD] rounded-[10px] h-[15px]">
                COMING SOON
              </Badge>
            </div>
            <p className="text-sm xl:text-base text-[#1D2739]">
              Explore Ticket creation with{" "}
              <span className="text-[#2A680C]">A.I ticket maker</span>
            </p>
          </CardContent>
        </Card>
        {/* <Card className="border-0 lg:w-[200px] xl:w-[262px] h-[129px] rounded-[12px] flex items-center justify-center cursor-pointer ai-gradient">
          <CardContent className="px-[15px] py-5 h-[124px] rounded-[12px] lg:w-[195px] xl:w-[257px] bg-[#140B36] space-y-1 relative flex flex-col">
            <div className=" flex justify-between items-center">
              <div className="w-10 h-10 rounded-[8px] ai-gradient flex justify-center items-center">
                <div className="w-[38px] h-[38px] flex justify-center items-center bg-[#140B36] rounded-[8px]">
                  <AiStars />
                </div>
              </div>
              <ChevronRight size={30} color="#13191C" />
            </div>
            <p className="text-sm xl:text-base font-medium text-white">
              Explore Ticket creation with{" "}
              <span className="text-success-emphasis3">A.I ticket maker</span>
            </p>
          </CardContent>
        </Card> */}
      </div>
      <div className="bg-[#E4E7EC] w-full h-[1px] mt-5 mb-3 xl:mt-20 xl:mb-10" />
      <div className="flex flex-col items-center justify-center gap-3">
        <p className="text-base text-[#13191C] font-medium items-center">
          Your <span className="text-success-emphasis3">Tikeeti</span> account
          comes with tools to help you grow.
        </p>

        <div className="flex items-center gap-[10px]">
          <div className="flex items-center gap-2">
            <Check color="#0DA767" size={20} />
            <p className="text-[#13191C] text-xs ">Transportation</p>
          </div>
          <div className="flex items-center gap-2">
            <Check color="#0DA767" size={20} />
            <p className="text-[#13191C] text-xs ">Events</p>
          </div>
          <div className="flex items-center gap-2">
            <Check color="#0DA767" size={20} />
            <p className="text-[#13191C] text-xs ">Movies</p>
          </div>
          <div className="flex items-center gap-2">
            <Check color="#0DA767" size={20} />
            <p className="text-[#13191C] text-xs ">Sports</p>
          </div>
          <div className="flex items-center gap-2">
            <Check color="#0DA767" size={20} />
            <p className="text-[#13191C] text-xs ">And much more...</p>
          </div>
        </div>
      </div>

      <Button
        className="absolute bottom-24 right-5 w-[157px] h-14 rounded-[8px] bg-[#13191C] bg-gradient-to-r from-[#13191C] to-[#13191C] hover:from-primary/90 hover:to-secondary/90"
        variant="gradient"
      >
        <div className="flex gap-2 items-center">
          <p className="text-center">Take a tour</p> <ChatIcon />
        </div>
      </Button>

      <Dialog open={openTicketModal} onOpenChange={setOpenTicketModal}>
        <DialogContent
          className="w-3/4 sm:max-w-[400px]  gap-2 rounded-[8px] px-5 py-[15px] space-y-2"
          closeStyle="bg-white w-[34px] h-[34px] p-0 top-0 right-[-10%] top-[-8px] flex justify-center items-center rounded-[8px]"
        >
          <DialogHeader className="self-center">
            <div className="w-full flex items-center justify-center self-center">
              <div className="w-12 h-12 bg-[#F0F2F5] rounded-[10px] flex justify-center items-center">
                <TicketIcon fill="#13191C" width={24} height={24} />
              </div>
            </div>
          </DialogHeader>
          <DialogDescription className="self-center text-center space-y-2">
            <p className="text-[#13191C] text-lg font-medium">
              Create a ticket
            </p>
            <p className="text-[#667185] text-sm">
              Select ticket type you want to create
            </p>
          </DialogDescription>

          <DialogDescription className="flex items-center gap-3">
            <div
              role="button"
              onClick={() => {
                setTicketType("events");
                setOpenTicketModal(false);
                navigate("/create-event");
              }}
              className={cn(
                "w-1/3 h-[88px] p-1.5 rounded-[12px] border flex flex-col justify-between transition-all duration-200 cursor-pointer",
                ticketType === "events"
                  ? "bg-[#F5FFF0] border-[#9DF316]"
                  : "bg-white border-[#D0D5DD]"
              )}
            >
              <div className="self-end w-[14px] h-[14px]">
                {ticketType === "events" ? (
                  <Checkbox
                    id="events"
                    className="transition-all duration-150 w-[14px] h-[14px] rounded-full p-0 m-0"
                    iconStyle="w-3 h-3"
                    checked={true}
                  />
                ) : (
                  <CircleIcon
                    color="#D0D5DD"
                    size={16}
                    className="transition-all duration-150"
                  />
                )}
              </div>
              <div className="self-center">
                <TikeetiEventIcon />
              </div>
              <div className="self-center">
                <p
                  className={cn(
                    "font-medium text-sm text-left",
                    ticketType === "custom" ? "text-primary" : "text-[#13191C]"
                  )}
                >
                  Events
                </p>
              </div>
            </div>
            <div
              role="button"
              onClick={() => {
                setTicketType("movies");
                // setOpenTicketModal(false);
                // navigate("/create-movie");
              }}
              className={cn(
                "w-1/3 h-[88px] p-1.5 rounded-[12px] border flex flex-col justify-between transition-all duration-200 cursor-pointer",
                ticketType === "movies"
                  ? "bg-[#F5FFF0] border-[#9DF316]"
                  : "bg-white border-[#D0D5DD]"
              )}
            >
              <div className="self-end w-[14px] h-[14px]">
                {ticketType === "movies" ? (
                  <Checkbox
                    id="movies"
                    className="transition-all duration-150 w-[14px] h-[14px] rounded-full p-0 m-0"
                    iconStyle="w-3 h-3"
                    checked={true}
                  />
                ) : (
                  <CircleIcon
                    color="#D0D5DD"
                    size={16}
                    className="transition-all duration-150"
                  />
                )}
              </div>
              <div className="self-center">
                <FilmRoolIcon />
              </div>
              <div className="self-center">
                <p
                  className={cn(
                    "font-medium text-sm text-left",
                    ticketType === "custom" ? "text-primary" : "text-[#13191C]"
                  )}
                >
                  Movies
                </p>
              </div>
            </div>
            <div
              role="button"
              onClick={() => {
                setTicketType("transport");
                // setOpenTicketModal(false);
                // navigate("/transportation");
              }}
              className={cn(
                "w-1/3 h-[88px] p-1.5 rounded-[12px] border flex flex-col justify-between transition-all duration-200 cursor-pointer",
                ticketType === "transport"
                  ? "bg-[#F5FFF0] border-[#9DF316]"
                  : "bg-white border-[#D0D5DD]"
              )}
            >
              <div className="self-end w-[14px] h-[14px]">
                {ticketType === "transport" ? (
                  <Checkbox
                    id="transport"
                    className="transition-all duration-150 w-[14px] h-[14px] rounded-full p-0 m-0"
                    iconStyle="w-3 h-3"
                    checked={true}
                  />
                ) : (
                  <CircleIcon
                    color="#D0D5DD"
                    size={16}
                    className="transition-all duration-150"
                  />
                )}
              </div>
              <div className="self-center">
                <AirplaneIcon />
              </div>
              <div className="self-center">
                <p
                  className={cn(
                    "font-medium text-sm text-left",
                    ticketType === "custom" ? "text-primary" : "text-[#13191C]"
                  )}
                >
                  Transport
                </p>
              </div>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}
