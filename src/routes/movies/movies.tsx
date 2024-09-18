import BarChart from "@/assets/icons/bar-chart";
import ButtonGradient from "@/assets/icons/button-gradient";
import ClipboardIcon from "@/assets/icons/clipboard-icon";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AllMovies from "./components/all-movies";
import Overview from "./components/overview";

export default function Movies() {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  const [overviewFilterValue, setOverviewFilterValue] = useState("");
  const [allMoviesFilterValue, setAllMoviesFilterValue] = useState("");
  const [allMoviesSearchValue, setAllMoviesSearchValue] = useState("");
  const [overviewSearchValue, setOverviewSearchValue] = useState("");

  return (
    <div className="pb-20">
      <div className="flex items-center justify-between border-b border-[#E4E7EC] p-5">
        <div className="space-y-1">
          <h1 className="font-medium text-[28px]">Movies ticket management</h1>
          <p className="text-[#475367]">
            Seamlessly track and manage all your movies related tickets in one
            place.
          </p>
        </div>
        <div className="w-[176px] h-14 rounded-[8px] flex items-center justify-center  ai-gradient relative overflow-hidden">
          <Button
            className="h-[53px] w-[173px] rounded-[8px] text-base bg-gradient-to-r from-primary to-primary flex"
            variant={"gradient"}
            onClick={() => navigate("/create-movie")}
          >
            <span className="flex items-center gap-2">
              Create a ticket
              <ButtonGradient />
            </span>
          </Button>
        </div>
      </div>
      <Tabs defaultValue={"overview"} className="mb-10">
        <TabsList className="lg:grid w-fit max-w-[589px] lg:grid-cols-2 rounded-none bg-transparent h-[52px] border-b border-b-[#E4E7EC] mx-5">
          <TabsTrigger
            value="overview"
            className="hidden md:flex items-center gap-4 text-[#98A2B3] text-sm rounded-none bg-transparent border-transparent border-b-[2px] data-[state=active]:border-primary data-[state=active]:text-primary"
            onClick={() => setActiveTab("overview")}
          >
            <BarChart fill={activeTab === "overview" ? "#133205" : "#98A2B3"} />
            <p>Overview</p>
          </TabsTrigger>
          <TabsTrigger
            value="all-movies"
            className="hidden md:flex items-center gap-4 text-[#98A2B3] text-sm rounded-none bg-transparent border-transparent border-b-[2px] data-[state=active]:border-primary data-[state=active]:text-primary"
            onClick={() => setActiveTab("all-movies")}
          >
            <ClipboardIcon
              fill={activeTab === "all-movies" ? "#133205" : "#98A2B3"}
            />
            <p>All Movies</p>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-5">
          <Overview
            overviewFilterValue={overviewFilterValue}
            setOverviewFilterValue={setOverviewFilterValue}
            overviewSearchValue={overviewSearchValue}
            setOverviewSearchValue={setOverviewSearchValue}
          />
        </TabsContent>
        <TabsContent value="all-movies" className="mt-5">
          <AllMovies
            allMoviesFilterValue={allMoviesFilterValue}
            setAllMoviesFilterValue={setAllMoviesFilterValue}
            allMoviesSearchValue={allMoviesSearchValue}
            setAllMoviesSearchValue={setAllMoviesSearchValue}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
