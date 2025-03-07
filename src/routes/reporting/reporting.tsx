import GBP from "@/assets/icons/gbp.svg";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import CancelledTickets from "./components/cancelled-tickets";
import TicketSales from "./components/ticket-sales";

const CURRENCY = [
  { id: 0, country: "United Kingdom", value: "GBP", imageUrl: GBP },
];

const TOTALTICKETDATE = [
  "Any time",
  "Last 24 hours",
  "Last week",
  "Last month",
];

export default function Reporting() {
  const [totalTicketDate, setTotalTicketDate] = useState(TOTALTICKETDATE[0]);

  const date = new Date(new Date().getTime());
  const todaysdate = Math.floor(Date.now() / 1000);
  const timestamp = Math.floor(date.getTime() / 1000);
  const timeStampYesterday = (todaysdate - 24 * 3600) / 1000;
  const timeStampLastWeek = (todaysdate - 24 * 7 * 3600) / 1000;
  const timeStampLastMonth = (todaysdate - 720 * 3600) / 1000;
  const is24 = timestamp >= new Date(timeStampYesterday).getTime() * 1000;
  const isLastWeek = timestamp >= new Date(timeStampLastWeek).getTime() * 1000;
  const isLastMonth =
    timestamp >= new Date(timeStampLastMonth).getTime() * 1000;

  const filterTotalTicketDate = (type: string) => {
    if (type === "Last 24 hours" && is24) {
    }
    if (type === "Last week" && isLastWeek) {
    }
    if (type === "Last month" && isLastMonth) {
    }
    if (type === "Any time") {
    }

    setTotalTicketDate(type);
  };

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
              {/* <SelectValue className="text-sm text-[#667185] font-medium" /> */}
              <p className="text-[#667185] text-sm font-medium">
                {totalTicketDate}
              </p>
            </SelectTrigger>

            <SelectContent
              className="w-auto h-auto p-0 rounded-[10px] shadow-lg mt-1 border-[0.3px] bg-card"
              align="start"
            >
              <SelectGroup>
                {TOTALTICKETDATE.map((date) => (
                  <SelectItem
                    value={date}
                    key={date}
                    className="text-[#344054] text-sm"
                  >
                    {date}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <TicketSales />
      <div className="flex justify-between items-center gap-10 w-full">
        <CancelledTickets />
        <CancelledTickets />
      </div>
    </div>
  );
}
