import BinIcon from "@/assets/icons/bin-icon";
import GBP from "@/assets/icons/gbp.svg";
import PencilIcon from "@/assets/icons/pencil-icon";
import UserGroupIcon from "@/assets/icons/user-group-icon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Loading from "@/components/ui/loading";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectTrigger } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  CalendarIcon,
  ChevronDown,
  MoveLeft,
  PlusCircleIcon,
} from "lucide-react";
import { Dispatch, SetStateAction, memo, useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { EVENTLEVEL, TICKETPRICE } from "../create-event/create-event";

type Props = {
  moveToPrevious: () => void;
  form: UseFormReturn<
    {
      price: string;
      start?: Date | undefined;
      end?: Date | undefined;
      maxpurchase: string;
    },
    any,
    undefined
  >;
  publishTicket: () => void;
  openTicketLevel: () => void;
  openEditTicketLevel: () => void;
  openRemoveTicketLevel: () => void;
  setSelectedLevel: Dispatch<SetStateAction<EVENTLEVEL>>;
  isCreating: boolean;
  eventLevel: EVENTLEVEL[];
  price: string;
  setPrice: Dispatch<SetStateAction<string>>;
};

function EventLevel(props: Props) {
  const {
    form,
    publishTicket,
    moveToPrevious,
    openTicketLevel,
    openEditTicketLevel,
    openRemoveTicketLevel,
    setSelectedLevel,
    isCreating,
    eventLevel,
    price,
    setPrice,
  } = props;
  const [openEndDate, setOpenEndDate] = useState(false);
  const [openStartDate, setOpenStartDate] = useState(false);

  const onSubmit = () => {
    if (price === "Paid event" && eventLevel?.length === 0) {
      toast({
        title: "Ticket level not found",
        description: "Please add ticket level first",
        variant: "error",
      });
    } else {
      publishTicket();
    }
  };

  useEffect(() => {
    if (eventLevel?.[0]?.ticketPrice > 0) {
      setPrice(TICKETPRICE[1]);
    }
  }, []);

  return (
    <ScrollArea className="h-[80vh]">
      <div className="space-y-4 lg:max-w-[330px] 2xl:max-w-[375px] pt-5">
        <div className="space-y-8 mt-5">
          <div className="space-y-5">
            <p className="text-[#13191C] text-base font-medium">
              Ticket price <span className="font-normal">(Regular)</span>
            </p>
            <div className="space-y-4">
              {TICKETPRICE.map((t) => (
                <button
                  role="button"
                  className="flex items-center gap-3"
                  onClick={() => setPrice(t)}
                  key={t}
                >
                  <div
                    className={cn(
                      "w-5 h-5 border bg-white rounded-full flex justify-center items-center transition-all duration-200",
                      price === t ? "border-secondary" : "border-[#D0D5DD]"
                    )}
                  >
                    <div
                      className={cn(
                        "w-[10px] h-[10px] rounded-full transition-all duration-200",
                        price === t ? "bg-secondary" : "bg-white"
                      )}
                    />
                  </div>
                  <p className="text-[#13191C] text-base">{t}</p>
                  {t === "Donation" && (
                    <Badge className="ml-4 bg-[#E4E7EC] text-xs text-[#98A2B3] font-medium">
                      Beta
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </div>
          {price === "Paid event" && (
            <div className="space-y-2 mr-5 mb-5">
              <Button
                type="button"
                variant="ghost"
                className="h-9 w-[175px] rounded-[8px] text-sm font-medium text-primary gap-2 mb-1"
                prefixItem={
                  <div>
                    <PlusCircleIcon size={20} color="#133205" />
                  </div>
                }
                onClick={() => {
                  if (eventLevel.length > 0) {
                    toast({
                      title: "Event level already added",
                      description: "Please remove existing event level first",
                      variant: "error",
                    });
                  } else {
                    openTicketLevel();
                  }
                }}
              >
                Add ticket levels
              </Button>

              {eventLevel &&
                eventLevel.map((event) => (
                  <Card
                    className="p-4 border-[#D0D5DD] rounded-[8px]"
                    key={event.id}
                  >
                    <div className="flex items-center justify-between">
                      <div className="">
                        <p className="text-[#667185] text-xs">Category</p>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <button
                          onClick={() => {
                            setSelectedLevel(event);
                            openEditTicketLevel();
                          }}
                        >
                          <PencilIcon fill="#667185" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedLevel(event);
                            openRemoveTicketLevel();
                          }}
                        >
                          <BinIcon />
                        </button>
                      </div>
                    </div>
                    <div className="pb-1">
                      <p className="text-[#13191C] font-medium text-base">
                        {event.category}
                      </p>
                    </div>
                    <div className="flex items-center pt-4">
                      <div className="space-y-1 w-1/2">
                        <p className="text-[#667185] text-xs">Price</p>
                        <div className="flex items-center gap-1">
                          <img src={GBP} alt="gbp" className="w-3 h-3" />
                          <p className="text-[#667185] text-[15px] font-medium">
                            {event.ticketCurrency}{" "}
                            <span className="text-[#13191C]">
                              {event.ticketPrice}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="space-y-1 w-1/2">
                        <p className="text-[#667185] text-xs">Qty available</p>
                        <p className="text-[#13191C] text-[15px] font-medium">
                          {event.quantity}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          )}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-0">
              <AccordionTrigger
                className="flex justify-between items-center no-underline hover:no-underline [&[data-state=open]>div>svg]:rotate-180"
                triggerIcon={
                  <div className="w-9 h-9 rounded-[8px] flex justify-center items-center bg-[#F9FAFB]">
                    <ChevronDown
                      className="shrink-0 transition-transform duration-200 [&[data-state=open]>svg]:rotate-180"
                      color={"#344054"}
                      width={20}
                      height={20}
                    />
                  </div>
                }
              >
                <div className="flex items-center">
                  <p className="text-lg font-medium text-[#13191C] flex items-center">
                    Additional configurations{" "}
                    <div className="xl:w-[80px] 2xl:w-[125px] bg-[#F0F2F5] h-[1px]"></div>
                  </p>
                  {/* <div className="w-full bg-black h-4"/> */}
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex gap-1 w-full">
                <div className="space-y-3">
                  <div className="w-full flex justify-between gap-4 items-center">
                    <div className="flex flex-col">
                      <label className="text-[#13191C] text-sm font-medium">
                        Sales start date
                      </label>
                      <Select
                        onOpenChange={setOpenStartDate}
                        open={openStartDate}
                      >
                        <SelectTrigger
                          suffixIcon={
                            <CalendarIcon
                              className="ml-auto"
                              color="#667185"
                              size={20}
                            />
                          }
                          className="border-[#D0D5DD] active:focus:outline-none h-14"
                        >
                          <Button
                            variant={"ghost"}
                            className={cn(
                              "xl:w-[125px] 2xl:w-[145px] ml-[-20px] text-left items-start font-normal bg-transparent text-[#13191C]",
                              !form.watch("start") && "text-[#667185]"
                            )}
                          >
                            {form.watch("start") ? (
                              format(form.watch("start")!, "PP")
                            ) : (
                              <span className="text-[#667185]">
                                24 Aug 2024
                              </span>
                            )}
                          </Button>
                        </SelectTrigger>

                        <SelectContent
                          className="w-auto h-auto p-0 rounded-[10px] shadow-lg mt-1 border-[0.3px] bg-card"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={form.watch("start")}
                            onSelect={(d) => {
                              form.setValue("start", d!);
                              setOpenStartDate(false);
                            }}
                            disabled={(date) => date < new Date()}
                            fromDate={new Date()}
                            toDate={
                              new Date(Date.now() + 10000 * 60 * 60 * 24 * 365)
                            }
                            initialFocus
                          />
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[#13191C] text-sm font-medium">
                        Sales end date
                      </label>
                      <Select onOpenChange={setOpenEndDate} open={openEndDate}>
                        <SelectTrigger
                          suffixIcon={
                            <CalendarIcon
                              className="ml-auto"
                              color="#667185"
                              size={20}
                            />
                          }
                          className="border-[#D0D5DD] active:focus:outline-none h-14"
                        >
                          <Button
                            variant={"ghost"}
                            className={cn(
                              "xl:w-[125px] 2xl:w-[145px] ml-[-20px] text-left items-start font-normal bg-transparent text-[#13191C]",
                              !form.watch("end") && "text-[#667185]"
                            )}
                          >
                            {form.watch("end") ? (
                              format(form.watch("end")!, "PP")
                            ) : (
                              <span className="text-[#667185]">
                                24 Aug 2024
                              </span>
                            )}
                          </Button>
                        </SelectTrigger>

                        <SelectContent
                          className="w-auto h-auto p-0 rounded-[10px] shadow-lg mt-1 border-[0.3px] bg-card"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={form.watch("end")}
                            onSelect={(d) => {
                              form.setValue("end", d!);
                              setOpenEndDate(false);
                            }}
                            disabled={(date) => date < new Date()}
                            fromDate={new Date()}
                            toDate={
                              new Date(Date.now() + 10000 * 60 * 60 * 24 * 365)
                            }
                            initialFocus
                          />
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="text-[#13191C] text-sm font-medium">
                      Max. purchase per user
                    </label>
                    <Input
                      type="text"
                      placeholder="5"
                      value={form.watch("maxpurchase")}
                      onChange={(e) =>
                        form.setValue("maxpurchase", e.target.value)
                      }
                      className="bg-white border text-sm border-[#D0D5DD] h-14 placeholder:text-[#667185] w-full pr-12 focus-visible:ml-0.5 transition-opacity duration-100"
                      suffixitem={
                        <UserGroupIcon
                          fill="#98A2B3"
                          className="absolute top-0 right-0 cursor-pointer lg:mt-[18px] mr-4 mt-4 w-5 h-5"
                        />
                      }
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="mr-3">
            <div className="flex items-center gap-2 w-full">
              <Button
                variant="ghost"
                className="w-1/2 h-14 rounded-[8px] text-base flex gap-1 font-medium text-[#13191C] px-10"
                prefixItem={
                  <div className="">
                    <MoveLeft size={20} color="#13191C" />
                  </div>
                }
                onClick={moveToPrevious}
              >
                Previous
              </Button>
              <Button
                variant="gradient"
                className="w-1/2 h-14 rounded-[8px] gap-2 text-base font-medium px-10"
                onClick={onSubmit}
              >
                {isCreating ? <Loading /> : "Update ticket"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}

export default memo(EventLevel);
