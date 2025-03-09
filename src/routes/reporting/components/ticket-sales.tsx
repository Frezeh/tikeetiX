import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import FilterItem from "@/components/ui/filter-item";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  endOfMonth,
  endOfWeek,
  endOfYesterday,
  format,
  startOfMonth,
  startOfWeek,
  startOfYesterday,
  subMonths,
  subWeeks,
} from "date-fns";
import { CalendarIcon, Filter } from "lucide-react";
import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
  { month: "July", desktop: 614 },
  { month: "August", desktop: 714 },
  { month: "September", desktop: 514 },
  { month: "October", desktop: 114 },
  { month: "November", desktop: 314 },
  { month: "December", desktop: 814 },
];
const chartConfig = {
  desktop: {
    label: "GBP",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function TicketSales() {
  const [totalTicketDate, setTotalTicketDate] = useState("All time");
  const [filterValue, setFilterValue] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const today = new Date();
  const thisWeekStart = startOfWeek(today);
  const thisWeekEnd = endOfWeek(today);
  const lastWeekStart = startOfWeek(subWeeks(today, 1));
  const lastWeekEnd = endOfWeek(subWeeks(today, 1));
  const lastMonthStart = startOfMonth(subMonths(today, 1));
  const lastMonthEnd = endOfMonth(subMonths(today, 1));
  const formattedThisWeek = `${format(thisWeekStart, "MMM d")} - ${format(
    thisWeekEnd,
    "MMM d"
  )}`;
  const formattedLastWeek = `${format(lastWeekStart, "MMM d")} - ${format(
    lastWeekEnd,
    "MMM d"
  )}`;
  const formattedLastMonth = `${format(lastMonthStart, "MMM d")} - ${format(
    lastMonthEnd,
    "MMM d"
  )}`;

  const filterOptions = [
    { title: "All time", subtitle: "All time" },
    { title: "Last 24 hours", subtitle: "Last 24 hours" },
    { title: "This week", subtitle: formattedThisWeek },
    { title: "Last week", subtitle: formattedLastWeek },
    { title: "Last month", subtitle: formattedLastMonth },
  ];

  const filterTotalTicketDate = (date: string) => {
    let title = date.split("&")[0];
    let subtitle = date.split("&")[1];
    setTotalTicketDate(subtitle);

    switch (title.toLowerCase()) {
      case "last 24 hours":
        return console.log(
          `${format(startOfYesterday(), "dd MMMM")} - ${format(
            endOfYesterday(),
            "dd MMMM"
          )}`
        );
      case "this week":
        return console.log(
          `${format(thisWeekStart, "dd MMMM")} - ${format(
            thisWeekEnd,
            "dd MMMM"
          )}`
        );
      case "last week":
        return console.log(
          `${format(lastWeekStart, "dd MMMM")} - ${format(
            lastWeekEnd,
            "dd MMMM"
          )}`
        );
      case "last month":
        return console.log(
          `${format(lastMonthStart, "dd MMMM")} - ${format(
            lastMonthEnd,
            "dd MMMM"
          )}`
        );
      default:
        return null;
    }
  };

  return (
    <div className="border-b border-[#E4E7EC] p-0 shadow-none">
      <Card className="border-none">
        <CardHeader>
          <CardDescription className="flex items-center justify-between">
            <div className="flex flex-col justify-between p-0 gap-2">
              <p className="text-[#667185] text-sm">Ticket sales</p>
              <div className="flex justify-end items-end gap-2">
                <p className="text-[#13191C] text-2xl font-medium">
                  GBP 948,209,871.52
                </p>
                <div className="flex items-center gap-2">
                  <svg
                    width="12"
                    height="13"
                    viewBox="0 0 12 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 9.87109V2.87109M6 2.87109L2.5 6.37109M6 2.87109L9.5 6.37109"
                      stroke="#12B76A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="font-medium text-[10px] text-[#027A48]">40%</p>
                  <p className="font-medium text-[10px] text-[#667085]">
                    vs last month
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Select
                value={totalTicketDate}
                onValueChange={filterTotalTicketDate}
              >
                <SelectTrigger
                  prefixIcon={
                    <CalendarIcon
                      className="ml-auto mr-1"
                      color="#667185"
                      size={18}
                    />
                  }
                  suffixIcon={<div className=" w-0 h-0" />}
                  className="border-[#D0D5DD] rounded-[8px] active:focus:outline-none h-9 w-fit"
                >
                  <p className="text-[#667185] text-sm font-medium">
                    {totalTicketDate}
                  </p>
                </SelectTrigger>

                <SelectContent
                  className="w-auto h-auto p-0 rounded-[10px] shadow-lg mt-1 border-[0.3px] bg-card"
                  align="start"
                >
                  <SelectGroup>
                    {filterOptions.map((date) => (
                      <SelectItem
                        value={`${date.title}&${date.subtitle}`}
                        key={date.title}
                        className="text-[#344054] text-sm"
                      >
                        {date.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

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
                      onClick={() => setFilterValue("")}
                    >
                      Clear
                    </button>
                    <DropdownMenuLabel className="text-sm text-[#13191C] font-normal">
                      Filter
                    </DropdownMenuLabel>
                    <button
                      className="h-[27px] w-16 bg-[#13191C] rounded-[6px] border border-[#E4E7EC] text-[13px] text-white"
                      onClick={() => {
                        //refetch();
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
                  <div className="grid grid-cols-2 px-1 pb-4">
                    <div className="space-y-1">
                      <FilterItem
                        checked={filterValue === "Movies"}
                        onCheckedChange={() => setFilterValue("Movies")}
                      >
                        Movies
                      </FilterItem>
                      <FilterItem
                        checked={filterValue === "Events"}
                        onCheckedChange={() => setFilterValue("Events")}
                      >
                        Events
                      </FilterItem>
                    </div>
                    <div className="space-y-1">
                      <FilterItem
                        checked={filterValue === "Transportation"}
                        onCheckedChange={() => setFilterValue("Transportation")}
                      >
                        Transportation
                      </FilterItem>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="pl-0">
          <ChartContainer className="h-60 w-full" config={chartConfig}>
            <AreaChart accessibilityLayer data={chartData}>
              <CartesianGrid
                vertical={false}
                className="stroke-[#F2F4F7] stroke-1"
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={4}
                tickFormatter={(value) => value.slice(0, 3)}
                padding={{ left: 20 }}
                style={{ fill: "#667185" }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={4}
                tickCount={6}
                type="number"
                fontSize={12}
                style={{ fill: "#667185" }}
              />
              <ChartTooltip
                cursor={{
                  style: { stroke: "#10192880", strokeDasharray: 4 },
                }}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <defs>
                <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-desktop)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-desktop)"
                    stopOpacity={0.05}
                  />
                </linearGradient>
              </defs>
              <Area
                dataKey="mobile"
                type="natural"
                fill="url(#fillMobile)"
                fillOpacity={0.4}
                stroke="var(--color-mobile)"
                stackId="a"
                strokeWidth={2}
              />
              <Area
                dataKey="desktop"
                type="natural"
                fill="url(#fillDesktop)"
                fillOpacity={0.4}
                stroke="var(--color-desktop)"
                stackId="a"
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="mt-[-20px]">
          <div className="flex w-full items-center justify-center">
            <p className="font-medium text-xs text-[#667085]">Months</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
