import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
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

export default function CancelledTickets() {
  return (
    <Card className="border-none w-full shadow-none">
      <CardHeader>
        <CardTitle>Area Chart</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
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
  );
}
