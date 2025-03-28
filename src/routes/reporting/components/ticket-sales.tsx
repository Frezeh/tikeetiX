import EmptyTable from "@/components/empty-table";
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
import { Skeleton } from "@/components/ui/skeleton";
import { getYearlyReport } from "@/services/api/orders";
import { useQuery } from "@tanstack/react-query";
import { format, getYear } from "date-fns";
import { CalendarIcon, Filter } from "lucide-react";
import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
  desktop: {
    label: "GBP",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function TicketSales({ amount }: { amount: number }) {
  const [totalTicketDate, setTotalTicketDate] = useState(
    String(getYear(new Date()))
  );
  const [filterValue, setFilterValue] = useState("");
  const [openFilter, setOpenFilter] = useState(false);

  const filterOptions = [
    { label: getYear(new Date()), value: getYear(new Date()) },
    { label: getYear(new Date()) - 1, value: getYear(new Date()) - 1 },
    { label: getYear(new Date()) - 2, value: getYear(new Date()) - 2 },
    { label: getYear(new Date()) - 3, value: getYear(new Date()) - 3 },
    { label: getYear(new Date()) - 4, value: getYear(new Date()) - 4 },
  ];

  const { isLoading: isLoadingYearlyReport, data: YearlyReport } = useQuery({
    queryKey: [`yearly-report-completed-${totalTicketDate}`],
    queryFn: () =>
      getYearlyReport(Number(totalTicketDate), "Completed", "Events"),
  });

  const chartData = YearlyReport?.data?.map((data) => ({
    month: format(new Date(data._id.month), "MMMM"),
    desktop: data.count,
  }));

  return (
    <div className="border-b border-[#E4E7EC] p-0 shadow-none">
      <Card className="border-none">
        <CardHeader>
          <CardDescription className="flex items-center justify-between">
            <div className="flex flex-col justify-between p-0 gap-2">
              <p className="text-[#667185] text-sm">Ticket sales</p>
              <div className="flex justify-end items-end gap-2">
                <p className="text-[#13191C] text-2xl font-medium">
                  GBP {amount}
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
                  <p className="font-medium text-[10px] text-[#027A48]">0%</p>
                  <p className="font-medium text-[10px] text-[#667085]">
                    vs last month
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Select
                // value={totalTicketDate}
                onValueChange={setTotalTicketDate}
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
                        value={String(date.value)}
                        key={date.value}
                        className="text-[#344054] text-sm"
                      >
                        {date.label}
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
          <ChartContainer className="h-60 w-full relative" config={chartConfig}>
            {isLoadingYearlyReport ? (
              <Skeleton className="w-[98%] h-full ml-[2%] rounded-[12px] bg-gray-200" />
            ) : chartData && chartData?.length === 0 ? (
              <EmptyTable description="This chart will be populated as soon as there’s activity." />
            ) : (
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
            )}
          </ChartContainer>
        </CardContent>
        <CardFooter className="mt-[-20px]">
          <div className="flex w-full items-center justify-center">
            <p className="font-medium text-xs text-[#667085]">
              {chartData && chartData?.length ? "Months" : ""}
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
