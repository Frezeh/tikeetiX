import GBP from "@/assets/icons/gbp.svg";
import MoneyIcon from "@/assets/icons/money-icon";
import TicketIcon from "@/assets/icons/ticket-icon";
import Globe from "@/assets/images/bad-boys.png";
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
  CheckCircle2Icon,
  HistoryIcon,
  MapPin,
  MoreVertical,
  User2,
} from "lucide-react";
import { Dispatch, SVGProps, SetStateAction } from "react";

type Props = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

export default function ManageOrdersActions({
  setOpenModal,
  openModal,
}: Props) {
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
              <p className="text-black font-semibold text-xl">Order #123456</p>
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
                <p className="text-[#13191C] font-medium">
                  Hawk Tuah: Return of the memes (2024)
                </p>
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
                  <p className="text-[#13191C] text-sm font-medium"> 49.99</p>
                </span>
              </div>
              <div className="space-y-2">
                <p className="text-[#667185]">Quantity</p>
                <p className="text-[#13191C] font-medium">01</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-10">
              <div className="space-y-2 max-w-[190px]">
                <p className="text-[#667185]">Date</p>
                <p className="text-[#13191C] font-medium">
                  09 Sep 2024, 15:27pm
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-[#667185]">Status</p>
                <span className="flex items-center gap-2 text-[#475367] text-sm">
                  <CheckCircle2Icon size={16} color="#0DA767" />
                  Completed
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-10">
              <div className="space-y-2 max-w-[190px]">
                <p className="text-[#667185]">Platform</p>
                <p className="text-[#13191C] font-medium">
                  09 Sep 2024, 15:27pm
                </p>
              </div>
            </div>
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
