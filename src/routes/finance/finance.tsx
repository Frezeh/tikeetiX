import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import Integrations from "./integrations";
import ManageFinance from "./manage-finance";

const DATA = [
  {
    id: 1,
    order_id: "#01234/10",
    ticket_name: "AI Meetup with Autogon",
    name: "Billy Butcher",
    email: "customer@mail.com",
    amount: "GBP 4,995",
    status: "Completed",
    category: "Event",
  },
  {
    id: 2,
    order_id: "#01234/10",
    ticket_name: "AI Meetup with Autogon",
    name: "Billy Butcher",
    email: "customer@email.com",
    amount: "GBP 4,995",
    status: "Processing",
    category: "Event",
  },
  {
    id: 3,
    order_id: "#01234/10",
    ticket_name: "AI Meetup with Autogon",
    name: "Billy Butcher",
    email: "customer@email.com",
    amount: "GBP 4,995",
    status: "Completed",
    category: "Event",
  },
];

export default function Finance() {
  const [filterValue, setFilterValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="pb-5">
      <Tabs defaultValue={"finance"} className="mb-10">
        <TabsList className="lg:grid w-fit max-w-[589px] lg:grid-cols-2 rounded-none bg-transparent h-[52px] border-b border-b-[#E4E7EC] mx-5">
          <TabsTrigger
            value="finance"
            className="hidden md:flex items-center gap-4 text-[#98A2B3] text-sm rounded-none bg-transparent border-transparent border-b-[2px] data-[state=active]:border-primary data-[state=active]:text-primary"
          >
            <p>Finance</p>
          </TabsTrigger>
          <TabsTrigger
            value="integrations"
            className="hidden md:flex items-center gap-4 text-[#98A2B3] text-sm rounded-none bg-transparent border-transparent border-b-[2px] data-[state=active]:border-primary data-[state=active]:text-primary"
          >
            <p>Integrations</p>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="finance" className="mt-2">
          <ManageFinance
            DATA={DATA}
            filterValue={filterValue}
            searchValue={searchValue}
            setFilterValue={setFilterValue}
            setSearchValue={setSearchValue}
          />
        </TabsContent>
        <TabsContent value="integrations" className="mt-2">
          <Integrations />
        </TabsContent>
      </Tabs>
    </div>
  );
}
