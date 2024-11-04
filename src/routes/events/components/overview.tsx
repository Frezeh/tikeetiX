import TicketIcon from "@/assets/icons/ticket-icon";
import UserGroupIcon from "@/assets/icons/user-group-icon";
import { Card, CardContent } from "@/components/ui/card";
import Loader from "@/components/ui/loader";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TicketEventData } from "@/services/models/ticket";
import { GenericResponse } from "@/services/request";
import { format } from "date-fns";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { createRef, useState } from "react";

type Props = {
  data: GenericResponse<TicketEventData> | undefined;
  isPending: boolean;
};
export default function Overview({ data, isPending }: Props) {
  const [currentImage, setCurrentImage] = useState(0);

  const DATA =
    data?.data?.foundItems.filter((t) => {
      //@ts-ignore
      let difference =
        (Number(new Date(t.ticket.startTime)) - Number(new Date())) /
        (1000 * 3600 * 24);
      return difference > -1;
    }) || [];

  const TOTALCOUNT = data?.data?.totalCount || 0;

  const refs = DATA.reduce((acc: any, _, i) => {
    acc[i] = createRef();
    return acc;
  }, {});

  const scrollToImage = (i: number) => {
    setCurrentImage(i);
    refs[i].current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  const totalImages = DATA.length;

  const nextImage = () => {
    if (currentImage >= totalImages - 1) {
      scrollToImage(0);
    } else {
      scrollToImage(currentImage + 1);
    }
  };

  const previousImage = () => {
    if (currentImage === 0) {
      scrollToImage(totalImages - 1);
    } else {
      scrollToImage(currentImage - 1);
    }
  };

  if (isPending) {
    return <Loader />;
  }

  return (
    <div>
      <div className="grid grid-cols-2 xl:flex xl:items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Card className="border-[#E4E7EC] w-[300px] h-[84px] p-3 rounded-[12px] ml-5">
              <CardContent className="flex justify-between items-center p-0">
                <div className="space-y-2">
                  <p className="text-[#475367] text-sm">Total events created</p>
                  <p className="text-[#344054] font-bold text-xl">
                    {TOTALCOUNT}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#C7FFAC] border border-[#A8F285] flex justify-center items-center">
                  <TicketIcon fill="#133205" />
                </div>
              </CardContent>
            </Card>
          </TooltipTrigger>
          <TooltipContent className="w-[167px] py-3" side="right">
            <TooltipArrow className="w-3 h-[6px]" />
            <p className="text-[#D0D5DD] text-xs">
              These are live tickets currently on sale.
            </p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Card className="border-[#E4E7EC] w-[300px] h-[84px] p-3 rounded-[12px]">
              <CardContent className="flex justify-between items-center p-0">
                <div className="space-y-2">
                  <p className="text-[#475367] text-sm">Tickets sold</p>
                  <p className="text-[#344054] font-bold text-xl">0</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#0ea66729] border border-[#0da7671a] flex justify-center items-center">
                  <TicketIcon fill="#0DA767" />
                </div>
              </CardContent>
            </Card>
          </TooltipTrigger>
          <TooltipContent className="w-[167px] py-3" side="right">
            <TooltipArrow className="w-3 h-[6px]" />
            <p className="text-[#D0D5DD] text-xs">
              These are live tickets currently on sale.
            </p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Card className="border-[#E4E7EC] w-[300px] h-[84px] p-3 rounded-[12px] sm:ml-5 xl:ml-0">
              <CardContent className="flex justify-between items-center p-0">
                <div className="space-y-2">
                  <p className="text-[#475367] text-sm">Tickets unsold</p>
                  <p className="text-[#344054] font-bold text-xl">0</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#e7211329] border border-[#bd1b0f1a] flex justify-center items-center">
                  <TicketIcon fill="#E72113" />
                </div>
              </CardContent>
            </Card>
          </TooltipTrigger>
          <TooltipContent className="w-[167px] py-3" side="right">
            <TooltipArrow className="w-3 h-[6px]" />
            <p className="text-[#D0D5DD] text-xs">
              These are live tickets currently on sale.
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="border-b border-[#E4E7EC] w-full overflow-hidden py-5 space-y-4">
        <p className="text-[#13191C] text-lg font-medium pl-5">
          Upcoming events
        </p>
        {DATA.length > 0 && (
          <div className="relative flex justify-center w-full items-center">
            <div className="relative items-center justify-center w-full mx-12">
              <div className="carousel gap-4 xl:w-[904px] sm:w-[640px] 2xl:w-full">
                {DATA.map((d, i) => (
                  <div
                    className="min-w-0 shrink-0 grow-0 basis-1/3 xl:basis-1/4  last-of-type:mr-5"
                    key={i}
                    ref={refs[i]}
                  >
                    <div className="bg-white border border-[#E4E7EC] rounded-[10px] pl-2 pr-6 flex justify-between">
                      <div className="flex items-center gap-4">
                        <div className="my-[15px]">
                          <img
                            src={d.ticket.image}
                            alt="ticket"
                            className="w-[43px] h-[74px] rounded-l-[5px]"
                          />
                        </div>
                        <div className="flex flex-col justify-between gap-[6px] my-[15px]">
                          <p className="text-[#101928] lg:max-w-28 2xl:max-w-52  flex-wrap font-medium text-sm truncate ...">
                            {d.ticket.title}
                          </p>
                          <div className="flex items-center gap-1">
                            <CalendarIcon size={12} color="#667185" />
                            <p className="text-[#667185] text-xs">
                              {d.ticket.startTime
                                ? format(d.ticket.startTime, "MMM dd, h:mm a")
                                : ""}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <UserGroupIcon />
                            <p className="text-[#667185] text-xs"></p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-center ml-[-24px]">
                        <div className="w-[17px] h-[17px] bg-white rounded-full border border-[#E4E7EC] mt-[-5px]" />
                        <div className="w-[1px] h-full border border-[#E4E7EC] border-dashed" />
                        <div className="w-[17px] h-[17px] bg-white rounded-full border border-[#E4E7EC] mb-[-5px]" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={previousImage}
              className="absolute top-0 left-0 z-30 lg:flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none hidden"
            >
              <span className="inline-flex items-center justify-center w-[30px] h-[120px] bg-white border border-[#E4E7EC] shadow-md rounded-l-[10px]">
                <ChevronLeftIcon size={24} color="#98A2B3" />
              </span>
            </button>
            <button
              onClick={nextImage}
              className="absolute top-0 right-0 z-30 lg:flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none hidden"
            >
              <span className="inline-flex items-center justify-center w-[30px] h-[120px] bg-white border border-[#E4E7EC] shadow-md rounded-r-[10px]">
                <ChevronRightIcon size={24} color="#98A2B3" />
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
