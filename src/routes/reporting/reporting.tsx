import GBP from "@/assets/icons/gbp.svg";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { getSalesReport } from "@/services/api/orders";
import { reportOverview } from "@/services/api/report";
import { useQuery } from "@tanstack/react-query";
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
import { CalendarIcon, DownloadIcon, WalletIcon } from "lucide-react";
import { useMemo, useState } from "react";
import CancelledTickets from "./components/cancelled-tickets";
import RefundedTickets from "./components/refunded-tickets";
import TicketSales from "./components/ticket-sales";

const CURRENCY = [
  { id: 0, country: "United Kingdom", value: "GBP", imageUrl: GBP },
];

export default function Reporting() {
  const [totalTicketDate, setTotalTicketDate] = useState("All time");
  const [paramsValue, setParamsValue] = useState<{
    startDate: string | null;
    endDate: string | null;
  }>({
    startDate: null,
    endDate: null,
  });
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
        return setParamsValue({
          startDate: `${format(startOfYesterday(), "yyyy-MM-dd")}`,
          endDate: `${format(endOfYesterday(), "yyyy-MM-dd")}`,
        });
      case "this week":
        return setParamsValue({
          startDate: `${format(thisWeekStart, "yyyy-MM-dd")}`,
          endDate: `${format(thisWeekEnd, "yyyy-MM-dd")}`,
        });
      case "last week":
        return setParamsValue({
          startDate: `${format(lastWeekStart, "yyyy-MM-dd")}`,
          endDate: `${format(lastWeekEnd, "yyyy-MM-dd")}`,
        });
      case "last month":
        return setParamsValue({
          startDate: `${format(lastMonthStart, "yyyy-MM-dd")}`,
          endDate: `${format(lastMonthEnd, "yyyy-MM-dd")}`,
        });
      default:
        return setParamsValue({
          startDate: null,
          endDate: null,
        });
    }
  };

  const salesReportQueryParams = useMemo(() => {
    let params = "";

    if (paramsValue.startDate && paramsValue.endDate) {
      params = `?startDate=${paramsValue.startDate}&endDate=${paramsValue.endDate}`;
    }

    return params;
  }, [paramsValue]);

  const eventReportQueryParams = useMemo(() => {
    let params = "";

    if (paramsValue.startDate && paramsValue.endDate) {
      params = `&startDate=${paramsValue.startDate}&endDate=${paramsValue.endDate}`;
    }

    return params;
  }, [paramsValue]);

  const { isLoading: isLoadingSalesReport, data: SalesReport } = useQuery({
    queryKey: [`sales-report${salesReportQueryParams}`],
    queryFn: () => getSalesReport(salesReportQueryParams),
  });
  const { isLoading: isLoadingEventReport, data: EventReport } = useQuery({
    queryKey: [`report-overview-event${eventReportQueryParams}`],
    queryFn: () =>
      reportOverview(`activityType=Event${eventReportQueryParams}`),
  });

  return (
    <div className="pb-20">
      <div className="flex items-center justify-between border-b border-[#E4E7EC] p-5">
        <div className="space-y-1">
          <h1 className="font-medium text-[28px]">Reporting</h1>
          <p className="text-[#475367]">
            Manage your finances across all your ticket sales and get smart
            reports
          </p>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2">
          <Select>
            <SelectTrigger
              className="w-fit min-w-[97px] h-9 border-[#D0D5DD] rounded-[8px] bg-[#F0F2F5] text-[#344054]"
              prefixIcon={<img src={GBP} alt="Globe" className="mr-1" />}
            >
              <SelectValue
                className="placeholder:text-[#344054] text-sm"
                placeholder={
                  <span>
                    <strong>GBP</strong> (United Kingdom)
                  </span>
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {CURRENCY.map((currency) => (
                  <SelectItem
                    value={currency.value}
                    key={currency.id}
                    className="text-[#344054] text-sm"
                  >
                    {currency.value} ({currency.country})
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select value={totalTicketDate} onValueChange={filterTotalTicketDate}>
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
        </div>
        <div className="flex flex-col xl:flex-row justify-between border-b border-[#F0F2F5] pt-7">
          <div className="flex flex-col gap-5 justify-between pb-5 xl:pb-10 pr-5">
            <div className="flex items-center gap-1">
              <div className="w-6 h-6 border border-[#E4E7EC] bg-white rounded-[8px] flex items-center justify-center">
                <WalletIcon size={12} color="#13191C" />
              </div>
              <p className="text-base text-[#667185]">Total ticket sales</p>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex flex-col justify-between p-0 gap-2">
                <p className="text-[#667085] text-xs font-bold uppercase leading-[120%] tracking-wide">
                  Gross revenue
                </p>
                <div className="flex justify-start items-start gap-2">
                  {isLoadingSalesReport ? (
                    <Skeleton className="w-full h-4 p-3 rounded-[12px] bg-gray-200" />
                  ) : (
                    <p className="text-[#13191C] text-xl font-medium text-ellipsis">
                      GBP{SalesReport?.data?.totalGrossRevenue || 0}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col justify-between p-0 gap-2 border-l border-[#E4E7EC] pl-6">
                <p className="text-[#667085] text-xs font-bold uppercase leading-[120%] tracking-wide">
                  NET revenue
                </p>
                <div className="flex justify-end items-end gap-4">
                  {isLoadingSalesReport ? (
                    <Skeleton className="w-full h-4 p-3 rounded-[12px] bg-gray-200" />
                  ) : (
                    <>
                      <p className="text-[#0DA767] text-2xl font-medium">
                        GBP{SalesReport?.data?.totalNetRevenue || 0}
                      </p>
                      <div className="flex items-center gap-2 pb-1.5">
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
                        <p className="font-medium text-[10px] text-[#027A48]">
                          0%
                        </p>
                        <p className="font-medium text-[10px] text-[#667085]">
                          vs last month
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex flex-col justify-between gap-6 pb-5 xl:border-l xl:border-[#F0F2F5] xl:pl-10">
            <button className="self-end flex items-center gap-1">
              <DownloadIcon size={12} color="#13191C" />
              <p className="text-xs text-[#667185] font-medium">Export</p>
            </button>
            <div className="grid grid-cols-3 items-center gap-20">
              {/* <div className="flex flex-col justify-between p-0 gap-1">
                <p className="text-[#667185] text-[10px] font-bold uppercase leading-[120%] tracking-wide">
                  Movies revenue
                </p>
                <p className="text-[#13191C] text-lg font-medium text-ellipsis">
                  GBP999,999,999
                </p>
              </div> */}
              <div className="flex flex-col justify-between p-0 gap-1">
                <p className="text-[#667085] text-[10px] font-bold uppercase leading-[120%] tracking-wide">
                  Events revenue
                </p>
                {isLoadingEventReport ? (
                  <Skeleton className="w-full h-4 p-3 rounded-[12px] bg-gray-200" />
                ) : (
                  <p className="text-[#13191C] text-lg font-medium text-ellipsis">
                    GBP{EventReport?.data?.totalRevenue || 0}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-3 items-center gap-10">
              {/* <div className="flex flex-col justify-between p-0 gap-1">
                <p className="text-[#667085] text-[10px] font-bold uppercase leading-[120%] tracking-wide">
                  Transportation revenue
                </p>
                <p className="text-[#13191C] text-lg font-medium text-ellipsis">
                  GBP999,999,999
                </p>
              </div> */}
            </div>

            <div className="absolute bottom-0 right-0">
              <svg
                width="64"
                height="65"
                viewBox="0 0 64 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M62.7414 26.1412V26.1976C62.7414 28.5254 61.9634 30.7591 60.4073 32.8987C58.8387 35.0571 56.6174 36.9709 53.7374 38.6337C53.7123 38.6462 53.6873 38.6651 53.6622 38.6713C47.6512 42.1286 40.4606 43.8478 32.0967 43.8353C23.7014 43.8164 16.4668 42.0595 10.3993 38.5583C7.10522 36.6509 4.69581 34.549 3.18992 32.2526C1.9162 30.32 1.27003 28.2493 1.25748 26.0281C1.23238 21.1842 4.2315 17.018 10.2613 13.5357C16.2974 10.0533 23.5068 8.3215 31.9021 8.33405C40.2974 8.35288 47.532 10.1097 53.5994 13.6172L39.9586 21.4917L32.0026 26.0847L53.524 26.1223C53.524 26.1223 53.5743 26.1536 53.5994 26.1662V26.1223L62.7414 26.1412Z"
                  stroke="#E4E7EC"
                  stroke-width="0.627451"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M53.5993 26.123V26.1669C53.5993 26.1669 53.549 26.1356 53.5239 26.123H53.5993Z"
                  stroke="#E4E7EC"
                  stroke-width="0.627451"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M53.5992 13.6172V26.1223H53.5239L32.0024 26.0847L39.9585 21.4917L53.5992 13.6172Z"
                  stroke="#E4E7EC"
                  stroke-width="0.627451"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M62.7412 26.1987V38.6914C62.7539 41.0381 61.9758 43.2904 60.4071 45.4488C58.8385 47.6073 56.6173 49.5211 53.7373 51.1839C47.7075 54.6662 40.4918 56.398 32.0965 56.3854C23.7012 56.3666 16.4666 54.6097 10.3992 51.1085C4.33172 47.6011 1.28242 43.4285 1.25732 38.5783V26.0293C1.26987 28.2505 1.91604 30.3212 3.18977 32.2537C4.69565 34.5502 7.10504 36.652 10.3992 38.5595C16.4666 42.0607 23.7012 43.8176 32.0965 43.8364C40.4604 43.849 47.651 42.1298 53.662 38.6725C53.6871 38.6662 53.7122 38.6474 53.7373 38.6349C56.6173 36.9721 58.8385 35.0583 60.4071 32.8998C61.9632 30.7602 62.7412 28.5266 62.7412 26.1987Z"
                  stroke="#E4E7EC"
                  stroke-width="0.627451"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <TicketSales amount={EventReport?.data?.totalTicketsSold ?? 0} />
      <div className="flex flex-col xl:flex-row justify-between items-center gap-10 w-full">
        <CancelledTickets
          amount={EventReport?.data?.orderStatusCounts?.CANCELLED ?? 0}
        />
        <RefundedTickets
          amount={EventReport?.data?.orderStatusCounts?.REFUNDED ?? 0}
        />
      </div>
    </div>
  );
}
