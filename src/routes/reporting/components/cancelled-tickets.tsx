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
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
  desktop: {
    label: "GBP",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function CancelledTickets({ amount }: { amount: number }) {
  const [cancelledTicketDate, setCancelledTicketDate] = useState(
    String(getYear(new Date()))
  );

  const filterOptions = [
    { label: getYear(new Date()), value: getYear(new Date()) },
    { label: getYear(new Date()) - 1, value: getYear(new Date()) - 1 },
    { label: getYear(new Date()) - 2, value: getYear(new Date()) - 2 },
    { label: getYear(new Date()) - 3, value: getYear(new Date()) - 3 },
    { label: getYear(new Date()) - 4, value: getYear(new Date()) - 4 },
  ];

  const { isLoading: isLoadingYearlyReport, data: YearlyReport } = useQuery({
    queryKey: [`yearly-report-cancelled-${cancelledTicketDate}`],
    queryFn: () =>
      getYearlyReport(Number(cancelledTicketDate), "Canceled", "Events"),
  });

  const chartData = YearlyReport?.data?.map((data) => ({
    month: format(new Date(data._id.month), "MMMM"),
    desktop: data.count,
  }));

  return (
    <Card className="border-none w-full shadow-none">
      <CardHeader>
        <CardDescription className="flex items-center justify-between">
          <div className="flex flex-col justify-between p-0 gap-2">
            <p className="text-[#667085] text-xs font-bold uppercase leading-[120%] tracking-[12%]">
              Cancelled tickets
            </p>
            <div className="flex justify-start items-start gap-2">
              <p className="text-[#13191C] text-xl font-medium">GBP {amount}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Select onValueChange={setCancelledTicketDate}>
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
                  {cancelledTicketDate}
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
  );
}
