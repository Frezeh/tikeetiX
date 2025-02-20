import ButtonGradient from "@/assets/icons/button-gradient";
import { Button } from "@/components/ui/button";
// import { getEvents } from "@/services/api/events";
// import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CreateEventDialog } from "./components/create-event-dialog";
import Overview from "./components/overview";

export default function Events() {
  const [filterValue, setFilterValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [openCreateEventModal, setOpenCreateEventModal] = useState(false);
  const [eventType, setEventType] = useState("");

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
            onClick={() => setOpenCreateEventModal(true)}
          >
            <span className="flex items-center gap-2">
              Create a ticket
              <ButtonGradient />
            </span>
          </Button>
        </div>
      </div>

      <Overview
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <div>
        {/* <AllEvents
          allEventsFilterValue={allEventsFilterValue}
          setAllEventsFilterValue={setAllEventsFilterValue}
          allEventsSearchValue={allEventsSearchValue}
          setAllEventsSearchValue={setAllEventsSearchValue}
        /> */}
      </div>

      <CreateEventDialog
        openCreateEventModal={openCreateEventModal}
        setOpenCreateEventModal={setOpenCreateEventModal}
        setEventType={setEventType}
        eventType={eventType}
      />
      {/* <Tabs defaultValue={"overview"} className="mb-10">
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
          
        </TabsContent>
      </Tabs> */}
    </div>
  );
}
