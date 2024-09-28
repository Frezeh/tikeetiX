import AiStars from "@/assets/icons/ai-stars";
import BarChart from "@/assets/icons/bar-chart";
import ButtonGradient from "@/assets/icons/button-gradient";
import ClipboardIcon from "@/assets/icons/clipboard-icon";
import TicketIcon from "@/assets/icons/ticket-icon";
import TicketIconFilled from "@/assets/icons/ticket-icon-filled";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { CircleIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ActiveEvents from "./components/active-events";
import AllEvents from "./components/all-events";
import Overview from "./components/overview";
import { useQuery } from "@tanstack/react-query";
import { getEventsWithoutParams } from "@/services/api/events";

export default function Events() {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeEventsFilterValue, setActiveEventsFilterValue] = useState("");
  const [activeEventsSearchValue, setActiveEventsSearchValue] = useState("");
  const [allEventsFilterValue, setAllEventsFilterValue] = useState("");
  const [allEventsSearchValue, setAllEventsSearchValue] = useState("");
  const [openTicketModal, setOpenTicketModal] = useState(false);
  const [ticketType, setTicketType] = useState("");
  const navigate = useNavigate();

  const { isPending, data } = useQuery({
    queryKey: ["events"],
    queryFn: getEventsWithoutParams,
  });

  return (
    <div className="pb-20">
      <div className="flex items-center justify-between border-b border-[#E4E7EC] p-5">
        <div className="space-y-1">
          <h1 className="font-medium text-[28px]">Events ticket management</h1>
          <p className="text-[#475367]">
            Seamlessly track and manage all your event tickets in one place.
          </p>
        </div>
        <div className="w-[176px] h-14 rounded-[8px] flex items-center justify-center  ai-gradient relative overflow-hidden">
          <Button
            className="h-[53px] w-[173px] rounded-[8px] text-base bg-gradient-to-r from-primary to-primary flex"
            variant={"gradient"}
            onClick={() => setOpenTicketModal(true)}
          >
            <span className="flex items-center gap-2">
              Create a ticket
              <ButtonGradient />
            </span>
          </Button>
        </div>
      </div>
      <Tabs defaultValue={"overview"} className="mb-10">
        <TabsList className="lg:grid w-fit max-w-[589px] lg:grid-cols-3 rounded-none bg-transparent h-[52px] border-b border-b-[#E4E7EC] mx-5">
          <TabsTrigger
            value="overview"
            className="hidden md:flex items-center gap-4 text-[#98A2B3] text-sm rounded-none bg-transparent border-transparent border-b-[2px] data-[state=active]:border-primary data-[state=active]:text-primary"
            onClick={() => setActiveTab("overview")}
          >
            <BarChart fill={activeTab === "overview" ? "#133205" : "#98A2B3"} />
            <p>Overview</p>
          </TabsTrigger>
          <TabsTrigger
            value="active-events"
            className="hidden md:flex items-center gap-4 text-[#98A2B3] text-sm rounded-none bg-transparent border-transparent border-b-[2px] data-[state=active]:border-primary data-[state=active]:text-primary"
            onClick={() => setActiveTab("active-events")}
          >
            <BarChart
              fill={activeTab === "active-events" ? "#133205" : "#98A2B3"}
            />
            <p>Active Events</p>
            <Badge
              className={cn(
                "w-[30px] h-[17px] flex justify-center items-center text-xs bg-[#F0F2F5] text-[#98A2B3] rounded-[12px]",
                activeTab === "active-events" && "bg-primary text-white"
              )}
            >
              {data?.data?.totalCount ?? 0}
            </Badge>
          </TabsTrigger>
          <TabsTrigger
            value="all-events"
            className="hidden md:flex items-center gap-4 text-[#98A2B3] text-sm rounded-none bg-transparent border-transparent border-b-[2px] data-[state=active]:border-primary data-[state=active]:text-primary"
            onClick={() => setActiveTab("all-events")}
          >
            <ClipboardIcon
              fill={activeTab === "all-events" ? "#133205" : "#98A2B3"}
            />
            <p>All Events</p>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-5">
          <Overview data={data} isPending={isPending} />
        </TabsContent>
        <TabsContent value="active-events" className="mt-5">
          <ActiveEvents
            activeEventsFilterValue={activeEventsFilterValue}
            setActiveEventsFilterValue={setActiveEventsFilterValue}
            activeEventsSearchValue={activeEventsSearchValue}
            setActiveEventsSearchValue={setActiveEventsSearchValue}
          />
        </TabsContent>
        <TabsContent value="all-events" className="mt-5">
          <AllEvents
            allEventsFilterValue={allEventsFilterValue}
            setAllEventsFilterValue={setAllEventsFilterValue}
            allEventsSearchValue={allEventsSearchValue}
            setAllEventsSearchValue={setAllEventsSearchValue}
          />
        </TabsContent>
      </Tabs>

      <Dialog open={openTicketModal} onOpenChange={setOpenTicketModal}>
        <DialogContent
          className="w-3/4 sm:max-w-[400px] justify-center items-center gap-2 rounded-[8px] px-5 py-[15px] space-y-2"
          closeStyle="bg-white w-[34px] h-[34px] p-0 top-0 right-[-10%] top-[-8px] flex justify-center items-center rounded-[8px]"
        >
          <DialogHeader className="self-center">
            <div className="w-full flex items-center justify-center self-center">
              <div className="w-12 h-12 bg-[#F0F2F5] rounded-[10px] flex justify-center items-center">
                <TicketIcon fill="#13191C" width={24} height={24} />
              </div>
            </div>
          </DialogHeader>
          <DialogDescription className="text-center space-y-2">
            <p className="text-[#13191C] text-lg font-medium">
              Create a ticket
            </p>
            <p className="text-[#667185] text-sm">
              Create an event to sell tickets
            </p>
          </DialogDescription>

          <DialogDescription className="text-center space-y-3">
            <div
              role="button"
              onClick={() => setTicketType("custom")}
              className={cn(
                "w-full p-4 rounded-[12px] border flex items-center justify-between gap-1 transition-all duration-200 cursor-pointer",
                ticketType === "custom"
                  ? "bg-[#F5FFF0] border-[#9DF316]"
                  : "bg-white border-[#D0D5DD]"
              )}
            >
              <div className="w-8 h-8 border border-[#A8F285] bg-white rounded-[8px] flex justify-center items-center">
                <TicketIconFilled width={16} height={16} className="" />
              </div>
              <div>
                <p
                  className={cn(
                    "font-medium text-sm text-left",
                    ticketType === "custom" ? "text-primary" : "text-[#13191C]"
                  )}
                >
                  Create custom ticket
                </p>
                <p
                  className={cn(
                    "text-sm text-left",
                    ticketType === "custom"
                      ? "text-primary font-medium"
                      : "text-[#13191C]"
                  )}
                >
                  Create and configure custom events.
                </p>
              </div>
              {ticketType === "custom" ? (
                <Checkbox
                  id="custom"
                  className="transition-all duration-150 w-[14px] h-[14px] rounded-full"
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
            <div
              role="button"
              className={cn(
                "w-full p-4 rounded-[12px] border flex items-center justify-between gap-1 transition-all duration-200 cursor-pointer",
                ticketType === "AI"
                  ? "bg-[#F5FFF0] border-[#9DF316]"
                  : "bg-white border-[#D0D5DD]"
              )}
            >
              <div className="w-8 h-8 rounded-[8px] ai-gradient flex justify-center items-center">
                <div className="w-[30px] h-[30px] flex justify-center items-center bg-white rounded-[8px]">
                  <AiStars gradient />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p
                    className={cn(
                      "font-medium text-sm text-left",
                      ticketType === "AI" ? "text-primary" : "text-[#13191C]"
                    )}
                  >
                    AI Ticket maker
                  </p>
                  <Badge className="text-[10px] font-medium text-[#98A2B3] bg-[#E4E7EC] rounded-[10px] h-[15px]">
                    COMING SOON
                  </Badge>
                </div>
                <p
                  className={cn(
                    "text-sm text-left",
                    ticketType === "AI"
                      ? "text-primary font-medium"
                      : "text-[#13191C]"
                  )}
                >
                  Ticket creation with A.I ticket maker
                </p>
              </div>
              {ticketType === "AI" ? (
                <Checkbox
                  id="custom"
                  className="transition-all duration-150 w-[14px] h-[14px] rounded-full"
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
          </DialogDescription>

          <DialogFooter className="flex justify-between items-center pt-2">
            <Button
              className="h-9 w-[178px] bg-white border-[#D0D5DD] border rounded-[8px]"
              variant="ghost"
              onClick={() => setOpenTicketModal(false)}
            >
              Cancel
            </Button>
            <Button
              className="h-9 w-[178px]"
              onClick={() => {
                if (ticketType === "custom") {
                  navigate("/create-event");
                }
              }}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
