import BankIcon from "@/assets/icons/bank-icon";
import GBP from "@/assets/icons/gbp.svg";
import ProcessingIcon from "@/assets/icons/processsing-icon";
import TicketIcon from "@/assets/icons/ticket-icon";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  CircleCheck,
  HistoryIcon,
  MapPin,
  MoreVertical,
  User2,
} from "lucide-react";
import { Dispatch, SVGProps, SetStateAction } from "react";
import { getItemColor } from "./manage-finance";

type Props = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

const data = {
  id: 1,
  order_id: "#01234/10",
  ticket_name: "AI Meetup with Autogon",
  name: "Billy Butcher",
  email: "customer@mail.com",
  amount: "GBP999,999",
  status: "Completed",
  category: "Event",
};

export default function FinanceActions({ setOpenModal, openModal }: Props) {
  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent
        className="w-3/4 max-h-[96%] sm:max-w-[500px] gap-2 rounded-[12px] p-0 py-[15px] space-y-2 left-[54.5%] top-[1%] translate-x-[-10%] xl:translate-x-[15%] 2xl:translate-x-[50%] translate-y-[1%]"
        closeStyle="bg-white w-[34px] h-[34px] p-0 top-0 right-[calc(100%+10px)] top-[-8px] flex justify-center items-center rounded-[8px]"
      >
        <ScrollArea className="max-h-[80vh] xl:max-h-[85vh]">
          <DialogHeader className="flex flex-row justify-between mx-5 pt-5 pb-3 border-b border-[#E4E7EC]">
            <div />
            <div className="h-28 justify-end items-end flex">
              <ProcessingIcon width={108} height={82} />
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
          <DialogDescription className="justify-center items-center text-center space-y-4 border-b border-[#E4E7EC] py-3 mx-5">
            <div className="flex items-center justify-center gap-2">
              <img src={GBP} alt="currency" className="w-4 h-4" />
              <p className="text-[#13191C] text-sm font-medium">GBP</p>
            </div>
            <div>
              <p className="text-[#98A2B3] text-[28px] font-bold">
                GBP <span className="text-[#13191C]">2,000</span>
              </p>
            </div>
          </DialogDescription>

          <DialogDescription className="flex flex-col gap-4 p-5 pt-7">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-white border border-[#E4E7EC] rounded-[8px] flex justify-center items-center">
                <BankIcon fill="#13191C" />
              </div>
              <p className="text-[#13191C] font-medium text-base">
                Account Details
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-base text-[#667185]">Status</p>
              <div className="flex justify-between items-center">
                <div
                  className={cn(
                    `flex items-center gap-1 px-3 py-1 rounded-[12px] w-[116px] bg-[${
                      getItemColor(data.status.toLowerCase()).bgColor
                    }]`
                  )}
                >
                  {data.status.toLowerCase() === "completed" ? (
                    <CircleCheck size={16} color="#036B26" />
                  ) : (
                    <svg
                      width="14"
                      height="15"
                      viewBox="0 0 14 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.86627 1.39909C2.86627 1.0309 2.56779 0.732422 2.1996 0.732422C1.83141 0.732422 1.53293 1.0309 1.53293 1.39909V3.79909C1.53293 4.16728 1.83141 4.46576 2.1996 4.46576H4.60004C4.96823 4.46576 5.26671 4.16728 5.26671 3.79909C5.26671 3.4309 4.96823 3.13242 4.60004 3.13242H3.79936C4.69113 2.46227 5.79924 2.06576 7.00004 2.06576C9.94556 2.06576 12.3334 4.45357 12.3334 7.39909C12.3334 10.3446 9.94556 12.7324 7.00004 12.7324C4.05452 12.7324 1.66671 10.3446 1.66671 7.39909C1.66671 7.0309 1.36823 6.73242 1.00004 6.73242C0.631851 6.73242 0.333374 7.0309 0.333374 7.39909C0.333374 11.081 3.31814 14.0658 7.00004 14.0658C10.6819 14.0658 13.6667 11.081 13.6667 7.39909C13.6667 3.71719 10.6819 0.732422 7.00004 0.732422C5.4384 0.732422 4.00215 1.26973 2.86627 2.16853V1.39909Z"
                        fill="#865503"
                      />
                      <path
                        d="M7.00004 5.06576C7.00004 4.69757 6.70156 4.39909 6.33337 4.39909C5.96518 4.39909 5.66671 4.69757 5.66671 5.06576V8.39909C5.66671 8.76728 5.96518 9.06576 6.33337 9.06576H8.33337C8.70156 9.06576 9.00004 8.76728 9.00004 8.39909C9.00004 8.0309 8.70156 7.73242 8.33337 7.73242H7.00004V5.06576Z"
                        fill="#865503"
                      />
                    </svg>
                  )}
                  <p
                    className={cn(
                      "text-sm font-medium",
                      data.status.toLowerCase() === "completed"
                        ? "text-[#036B26]"
                        : data.status.toLowerCase() === "processing"
                        ? "text-[#865503]"
                        : "text-[#E72113]"
                    )}
                  >
                    {data.status}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-base text-[#667185]">Account name</p>
              <p className="text-base text-[#13191C]">9018275991</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-base text-[#667185]">Account number</p>
              <p className="text-base text-[#13191C]">
                John Doe D. Rockefeller
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-base text-[#667185]">Sort code</p>
              <p className="text-base text-[#13191C]">181042</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-base text-[#667185]">Bank name</p>
              <p className="text-base text-[#13191C]">JP Morgan & Chase</p>
            </div>
          </DialogDescription>

          <DialogDescription className="text-center space-y-3">
            <Tabs defaultValue={"history"} className="mb-10">
              <TabsList className="lg:grid w-fit max-w-[589px] rounded-none bg-transparent h-[52px] border-b border-b-[#E4E7EC] mx-5">
                <TabsTrigger
                  value="history"
                  className="hidden md:flex items-center gap-4 text-[#98A2B3] text-sm font-normal rounded-none bg-transparent border-transparent border-b-[2px] data-[state=active]:border-primary data-[state=active]:text-primary"
                >
                  <p>Request history</p>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="history" className="mt-5 px-5">
                <div className="flex flex-row items-center gap-2">
                  <HistoryIcon size={12} color="#667185" />
                  <p className="text-[#667185]">Request history</p>
                </div>
                <div className="py-5">
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
                        Request completed
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
                        Request received
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
                        Request sent
                      </p>
                      <p className="text-[#667185] text-left">
                        09/09/2024 | 15:17pm
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="details" className="mt-5 px-5">
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
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Ut et massa mi. Aliquam in hendrerit urna. see more
                    </p>
                  </div>
                  <div className={cn("grid grid-cols-3 gap-7")}>
                    <div>
                      <p className="text-[#667185] text-sm text-left">
                        Category
                      </p>
                      <p className="text-[#13191C] text-sm text-left font-medium">
                        Event
                      </p>
                    </div>
                    <div>
                      <p className="text-[#667185] text-sm text-left">
                        Ticket price
                      </p>
                      <div className="flex items-center gap-1">
                        <img src={GBP} alt="gbp" className="w-3 h-3" />
                        <p className="text-[#667185] text-[15px] font-medium">
                          GBP <span className="text-[#13191C]">49.99</span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-[#667185] text-sm text-left">
                        Age rating
                      </p>
                      <p className="text-[#13191C] text-sm text-left font-medium">
                        PG 13
                      </p>
                    </div>
                  </div>
                  <div className={cn("grid grid-cols-2 gap-7")}>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-[#667185] text-sm text-left">
                          Location
                        </p>
                        <MapPin size={20} color="#98A2B3" />
                      </div>
                      <p className="text-[#13191C] text-sm text-left font-medium">
                        The Cinema, somewhere in the UK
                      </p>
                    </div>
                    <div>
                      <p className="text-[#667185] text-sm text-left">
                        Playtime/Duration
                      </p>
                      <p className="text-[#13191C] text-sm text-left font-medium">
                        2:15:20
                      </p>
                    </div>
                    <div>
                      <p className="text-[#667185] text-sm text-left">
                        Organizer
                      </p>
                      <p className="text-[#13191C] text-sm text-left font-medium">
                        Frank
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="info" className="mt-5 px-5">
                <div className="flex flex-row items-center gap-2">
                  <User2 size={12} color="#667185" />
                  <p className="text-[#667185]">Customer information</p>
                </div>
                <div className="space-y-7 pt-4">
                  <div className="grid grid-cols-2 gap-7">
                    <div>
                      <p className="text-[#667185] text-sm text-left">Name</p>
                      <p className="text-[#13191C] text-sm text-left font-medium">
                        Billy Butcher
                      </p>
                    </div>
                    <div>
                      <p className="text-[#667185] text-sm text-left">Email</p>
                      <p className="text-[#13191C] text-sm text-left font-medium">
                        customer@mail.com
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
                      <p className="text-[#667185] text-sm text-left">Phone</p>
                      <p className="text-[#13191C] text-sm text-left font-medium">
                        (+111) 999 9999 999
                      </p>
                    </div>
                  </div>
                </div>
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

function CheckIcon({ ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" {...props}>
      <rect x="0.5" y="0.266602" width="12" height="12" rx="6" fill="#0DA767" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.69005 3.80928C9.80455 3.91424 9.81229 4.09215 9.70733 4.20665L5.58232 8.70665C5.53049 8.7632 5.4578 8.79612 5.38111 8.79779C5.30442 8.79945 5.23037 8.76972 5.17613 8.71548L3.30113 6.84048C3.19129 6.73064 3.19129 6.55256 3.30113 6.44273C3.41096 6.33289 3.58904 6.33289 3.69887 6.44273L5.36617 8.11002L9.29268 3.82656C9.39764 3.71205 9.57555 3.70432 9.69005 3.80928Z"
        fill="white"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
