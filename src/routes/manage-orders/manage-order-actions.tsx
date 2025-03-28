import GBP from "@/assets/icons/gbp.svg";
import MoneyIcon from "@/assets/icons/money-icon";
import TicketIcon from "@/assets/icons/ticket-icon";
import Globe from "@/assets/images/bad-boys.png";
import orderStatusIcon from "@/components/order-status-icon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Loading from "@/components/ui/loading";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { capitalizeFirstLetter, cn } from "@/lib/utils";
import { getEvent } from "@/services/api/events";
import { Order } from "@/services/models/orders";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { HistoryIcon, MapPin, MoreVertical, User2 } from "lucide-react";
import { Dispatch, SetStateAction, useMemo } from "react";

type Props = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  data: Order;
};

export default function ManageOrdersActions({
  setOpenModal,
  openModal,
  data,
}: Props) {
  const { isLoading, data: Details } = useQuery({
    queryKey: [`event-${data?._id}`],
    queryFn: () => getEvent(data?._id!),
    enabled: !!data?._id,
  });

  const ticketPrice = useMemo(() => {
    const tickets = Details?.data?.event?.tickets;

    if (!tickets || tickets?.length < 1) {
      return "Free";
    }

    return `£${Math.min(...tickets.map((t) => t.ticketPrice))} - £${Math.max(
      ...tickets.map((t) => t.ticketPrice)
    )}`;
  }, [Details]);

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent
        className="w-3/4 max-h-[96%] sm:max-w-[500px] gap-2 rounded-[12px] p-0 py-[15px] space-y-2 left-[54.5%] top-[1%] translate-x-[-10%] xl:translate-x-[15%] 2xl:translate-x-[50%] translate-y-[1%]"
        closeStyle="bg-white w-[34px] h-[34px] p-0 top-0 right-[calc(100%+10px)] top-[-8px] flex justify-center items-center rounded-[8px]"
      >
        <ScrollArea className="max-h-[80vh] xl:max-h-[85vh]">
          <DialogHeader className="flex flex-row justify-between px-5 pt-5">
            <div className="space-y-2">
              <img
                src={Globe}
                alt="order"
                className="w-[90px] h-[100px] rounded-[8px]"
              />
              <p className="text-black font-semibold text-xl">
                Order {data.uniqueCode}
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  aria-haspopup="true"
                  className="w-8 h-8 rounded-[8px] flex items-center justify-center border border-[#E4E7EC] bg-white"
                >
                  <MoreVertical className="h-4 w-4" color="#98A2B3" />
                  <span className="sr-only">Toggle menu</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="rounded-[7px] p-0 border-[#E4E7EC]"
              >
                <DropdownMenuItem className="px-3 py-2">
                  <span className="pl-1 text-[#E72113] text-sm">
                    Issue refund
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem className="px-3 py-2">
                  <span className="pl-1 text-[#13191C] text-sm">
                    Cancel ticket
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </DialogHeader>
          <DialogDescription className="space-y-4 p-5">
            <div className="grid grid-cols-2 gap-10">
              <div className="space-y-2 max-w-[190px]">
                <p className="text-[#667185]">Ticket name</p>
                <p className="text-[#13191C] font-medium">{data.createdBy}</p>
              </div>
              <div className="space-y-2">
                <p className="text-[#667185]">Type</p>
                <p className="text-[#13191C] font-medium">Events</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-10">
              <div className="space-y-2 max-w-[190px]">
                <span className="text-[#667185] flex items-center gap-2">
                  Total amount{" "}
                  <MoneyIcon width={11} height={9} color="#667185" />
                </span>
                <span className="flex items-center gap-1">
                  <img src={GBP} alt="currency" className="w-4 h-4" />
                  <span className="pl-1 text-[#667185] text-sm font-medium">
                    GBP
                  </span>
                  <p className="text-[#13191C] text-sm font-medium">
                    {" "}
                    {data.totalAmount}
                  </p>
                </span>
              </div>
              <div className="space-y-2">
                <p className="text-[#667185]">Quantity</p>
                <p className="text-[#13191C] font-medium">{data.quantity}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-10">
              <div className="space-y-2 max-w-[190px]">
                <p className="text-[#667185]">Date</p>
                <p className="text-[#13191C] font-medium">
                  {format(data.createdAt, "dd MMM yyyy, HH:mma")}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-[#667185]">Status</p>
                <div className="flex gap-2 items-center">
                  {orderStatusIcon(data.status)}
                  <p className="text-sm text-[#475367]">
                    {capitalizeFirstLetter(data.status)}
                  </p>
                </div>
              </div>
            </div>
            {/* <div className="grid grid-cols-2 gap-10">
              <div className="space-y-2 max-w-[190px]">
                <p className="text-[#667185]">Platform</p>
                <p className="text-[#13191C] font-medium">
                  09 Sep 2024, 15:27pm
                </p>
              </div>
            </div> */}
          </DialogDescription>

          <DialogDescription className="text-center space-y-3">
            <Tabs defaultValue={"history"} className="mb-10">
              <TabsList className="lg:grid w-fit max-w-[589px] lg:grid-cols-3 rounded-none bg-transparent h-[52px] border-b border-b-[#E4E7EC] mx-5">
                <TabsTrigger
                  value="history"
                  className="hidden md:flex items-center gap-4 text-[#98A2B3] text-sm font-normal rounded-none bg-transparent border-transparent border-b-[2px] data-[state=active]:border-primary data-[state=active]:text-primary"
                >
                  <p>Overview</p>
                </TabsTrigger>
                <TabsTrigger
                  value="details"
                  className="hidden md:flex items-center gap-4 text-[#98A2B3] text-sm font-normal rounded-none bg-transparent border-transparent border-b-[2px] data-[state=active]:border-primary data-[state=active]:text-primary"
                >
                  <p>Ticket details</p>
                </TabsTrigger>
                <TabsTrigger
                  value="info"
                  className="hidden md:flex items-center gap-4 text-[#98A2B3] text-sm font-normal rounded-none bg-transparent border-transparent border-b-[2px] data-[state=active]:border-primary data-[state=active]:text-primary"
                >
                  <p>Customer info</p>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="history" className="mt-5 px-5">
                <div className="flex flex-row items-center gap-2">
                  <HistoryIcon size={12} color="#667185" />
                  <p className="text-[#667185]">Order history</p>
                </div>
                {/* <div className="py-5">
                  <div className="flex flex-row gap-[14px] pb-1">
                    <div className="flex flex-col items-center gap-1">
                      <CheckIcon />
                      <svg width="1" height="75" viewBox="0 0 1 75" fill="none">
                        <path
                          d="M0.5 1.2666L0.500011 250.265"
                          stroke="#E4E7EC"
                          stroke-linecap="round"
                        />
                      </svg>
                    </div>
                    <div className="space-y-1 mt-[-3px]">
                      <p className="text-[#13191C] font-medium text-left">
                        Order completed
                      </p>
                      <p className="text-[#667185] text-left">
                        09/09/2024 | 15:17pm
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-[14px] pb-1">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-[11px] h-[11px] rounded-full bg-[#98A2B3]" />
                      <svg width="1" height="75" viewBox="0 0 1 75" fill="none">
                        <path
                          d="M0.5 1.2666L0.500011 250.265"
                          stroke="#E4E7EC"
                          stroke-linecap="round"
                        />
                      </svg>
                    </div>
                    <div className="space-y-1 mt-[-3px]">
                      <p className="text-[#13191C] font-medium text-left">
                        Payment details entered
                      </p>
                      <p className="text-[#667185] text-left">
                        09/09/2024 | 15:17pm
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-[14px] pb-1">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-[11px] h-[11px] rounded-full bg-[#98A2B3]" />
                      <svg width="1" height="75" viewBox="0 0 1 75" fill="none">
                        <path
                          d="M0.5 1.2666L0.500011 250.265"
                          stroke="#E4E7EC"
                          stroke-linecap="round"
                        />
                      </svg>
                    </div>
                    <div className="space-y-1 mt-[-3px]">
                      <p className="text-[#13191C] font-medium text-left">
                        Order confirmed
                      </p>
                      <p className="text-[#667185] text-left">
                        09/09/2024 | 15:17pm
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-[14px] pb-1">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-[11px] h-[11px] rounded-full bg-[#98A2B3]" />
                    </div>
                    <div className="space-y-1 mt-[-3px]">
                      <p className="text-[#13191C] font-medium text-left">
                        Order placed
                      </p>
                      <p className="text-[#667185] text-left">
                        09/09/2024 | 15:17pm
                      </p>
                    </div>
                  </div>
                </div> */}
              </TabsContent>
              <TabsContent value="details" className="mt-5 px-5">
                {isLoading ? (
                  <Loading />
                ) : (
                  <>
                    <div className="flex flex-row items-center gap-2">
                      <TicketIcon width={12} height={12} color="#667185" />
                      <p className="text-[#667185]">Ticket details</p>
                    </div>
                    <div className="space-y-7 pt-4">
                      <div className="space-y-1">
                        <p className="text-[#667185] text-left text-sm">
                          Description
                        </p>
                        <p className="text-[#13191C] text-left text-sm">
                          {Details?.data?.event?.description ?? ""}
                        </p>
                      </div>
                      <div className={cn("grid grid-cols-3 gap-7")}>
                        <div>
                          <p className="text-[#667185] text-sm text-left">
                            Category
                          </p>
                          <p className="text-[#13191C] text-sm text-left font-medium">
                            {Details?.data?.event?.category ?? ""}
                          </p>
                        </div>
                        <div>
                          <p className="text-[#667185] text-sm text-left">
                            Ticket price
                          </p>
                          <div className="flex items-center gap-1">
                            {ticketPrice !== "Free" ? (
                              <p className="flex items-center gap-1 text-[15px] font-medium">
                                <img src={GBP} alt="gbp" className="w-3 h-3" />
                                <span className="text-[#13191C]">
                                  {ticketPrice}
                                </span>
                              </p>
                            ) : (
                              <p className="text-[#13191C] text-[15px] font-medium">
                                Free
                              </p>
                            )}
                          </div>
                        </div>
                        <div>
                          <p className="text-[#667185] text-sm">Type</p>
                          <p className="text-[#13191C] text-sm font-medium">
                            {Details?.data?.event?.type}
                          </p>
                        </div>
                      </div>
                      <div className={cn("grid grid-cols-2 gap-7")}>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-[#667185] text-sm">Location</p>
                            <MapPin size={20} color="#98A2B3" />
                          </div>
                          <p className="text-[#13191C] text-sm font-medium">
                            {Details?.data?.event?.location}
                          </p>
                        </div>
                        <div>
                          <p className="text-[#667185] text-sm">Organizer</p>
                          <p className="text-[#13191C] text-sm font-medium">
                            {Details?.data?.event?.organizerName ?? "---"}
                          </p>
                        </div>
                        <div>
                          <p className="text-[#667185] text-sm">Start time</p>
                          <p className="text-[#13191C] text-sm font-medium">
                            {Details?.data?.event?.startTime
                              ? format(Details?.data?.event?.startTime, "PP")
                              : "---"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </TabsContent>
              <TabsContent value="info" className="mt-5 px-5">
                <div className="flex flex-row items-center gap-2">
                  <User2 size={12} color="#667185" />
                  <p className="text-[#667185]">Customer information</p>
                </div>
                {data.recipients &&
                  data.recipients.map((recipient, index) => (
                    <div className="space-y-7 pt-4" key={index}>
                      <div className="grid grid-cols-2 gap-7">
                        <div>
                          <p className="text-[#667185] text-sm text-left">
                            Name
                          </p>
                          <p className="text-[#13191C] text-sm text-left font-medium">
                            {recipient.firstName} {recipient.lastName}
                          </p>
                        </div>
                        <div>
                          <p className="text-[#667185] text-sm text-left">
                            Email
                          </p>
                          <p className="text-[#13191C] text-sm text-left font-medium">
                            {recipient.email}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-7">
                        <div>
                          <p className="text-[#667185] text-sm text-left">
                            Payment info
                          </p>
                          <span className="text-[#13191C] text-sm text-left font-medium flex items-center gap-2">
                            Card{" "}
                            <svg
                              width="12"
                              height="13"
                              viewBox="0 0 12 13"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="3.75"
                                cy="6.2666"
                                r="3.375"
                                fill="#E80B26"
                              />
                              <circle
                                cx="8.25"
                                cy="6.2666"
                                r="3.375"
                                fill="#F59D31"
                              />
                              <path
                                d="M6 8.78217C6.69049 8.16418 7.125 7.26614 7.125 6.26657C7.125 5.267 6.69049 4.36896 6 3.75098C5.30951 4.36896 4.875 5.267 4.875 6.26657C4.875 7.26614 5.30951 8.16418 6 8.78217Z"
                                fill="#FC6020"
                              />
                            </svg>
                            ****** 4317
                          </span>
                        </div>
                        <div>
                          <p className="text-[#667185] text-sm text-left">
                            QR code
                          </p>
                          <p className="text-[#13191C] text-sm text-left font-medium">
                            {recipient.qrCode}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </TabsContent>
            </Tabs>
          </DialogDescription>
        </ScrollArea>

        <DialogFooter className="flex justify-between items-center pt-[15px] border-t px-5">
          <Button
            className="h-9 w-[178px] bg-white border-[#D0D5DD] border rounded-[8px]"
            variant="ghost"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </Button>
          <Button className="h-9 w-[178px]">Download as PDF</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
