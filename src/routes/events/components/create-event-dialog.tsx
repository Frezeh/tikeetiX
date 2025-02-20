import TicketIcon from "@/assets/icons/ticket-icon";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import TicketIconFilled from "@/assets/icons/ticket-icon-filled";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { CircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import AiStars from "@/assets/icons/ai-stars";
import { Badge } from "@/components/ui/badge";
interface CreateEventDialogInterface {
  openCreateEventModal?: boolean;
  setOpenCreateEventModal: (open: boolean) => void;
  setEventType: (type: string) => void;
  eventType: string;
}
export function CreateEventDialog({
  openCreateEventModal = false,
  setOpenCreateEventModal,
  eventType,
  setEventType,
}: CreateEventDialogInterface) {
  const navigate = useNavigate();
  return (
    <Dialog open={openCreateEventModal} onOpenChange={setOpenCreateEventModal}>
      <DialogContent
        className="w-3/4 sm:max-w-[400px] justify-center items-center gap-2 rounded-[8px] px-5 py-[15px] space-y-2"
        closeStyle="bg-white w-[34px] h-[34px] p-0 top-0 right-[-10%] top-[-8px] flex justify-center items-center rounded-[8px]"
      >
        <DialogHeader className="self-center">
          <div className="w-full flex items-center justify-center self-center">
            <div className="w-12 h-12 bg-[#F0F2F5] rounded-[10px] flex justify-center items-center">
              <TicketIcon fill="#13191C" width={24} height={24} />
            </div>
          </div>
        </DialogHeader>
        <DialogDescription className="text-center space-y-2">
          <p className="text-[#13191C] text-lg font-medium">Create a ticket</p>
          <p className="text-[#667185] text-sm">
            Create an event to sell tickets
          </p>
        </DialogDescription>

        <DialogDescription className="text-center space-y-3">
          <div
            role="button"
            onClick={() => setEventType("custom")}
            className={cn(
              "w-full p-4 rounded-[12px] border flex items-center justify-between gap-1 transition-all duration-200 cursor-pointer",
              eventType === "custom"
                ? "bg-[#F5FFF0] border-[#9DF316]"
                : "bg-white border-[#D0D5DD]"
            )}
          >
            <div className="w-8 h-8 border border-[#A8F285] bg-white rounded-[8px] flex justify-center items-center">
              <TicketIconFilled width={16} height={16} className="" />
            </div>
            <div>
              <p
                className={cn(
                  "font-medium text-sm text-left",
                  eventType === "custom" ? "text-primary" : "text-[#13191C]"
                )}
              >
                Create custom ticket
              </p>
              <p
                className={cn(
                  "text-sm text-left",
                  eventType === "custom"
                    ? "text-primary font-medium"
                    : "text-[#13191C]"
                )}
              >
                Create and configure custom events.
              </p>
            </div>
            {eventType === "custom" ? (
              <Checkbox
                id="custom"
                className="transition-all duration-150 w-[14px] h-[14px] rounded-full"
                iconStyle="w-3 h-3"
                checked={true}
              />
            ) : (
              <CircleIcon
                color="#D0D5DD"
                size={16}
                className="transition-all duration-150"
              />
            )}
          </div>
          <div
            role="button"
            className={cn(
              "w-full p-4 rounded-[12px] border flex items-center justify-between gap-1 transition-all duration-200 cursor-pointer",
              eventType === "AI"
                ? "bg-[#F5FFF0] border-[#9DF316]"
                : "bg-white border-[#D0D5DD]"
            )}
          >
            <div className="w-8 h-8 rounded-[8px] ai-gradient flex justify-center items-center">
              <div className="w-[30px] h-[30px] flex justify-center items-center bg-white rounded-[8px]">
                <AiStars gradient />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p
                  className={cn(
                    "font-medium text-sm text-left",
                    eventType === "AI" ? "text-primary" : "text-[#13191C]"
                  )}
                >
                  AI Ticket maker
                </p>
                <Badge className="text-[10px] font-medium text-[#98A2B3] bg-[#E4E7EC] rounded-[10px] h-[15px]">
                  COMING SOON
                </Badge>
              </div>
              <p
                className={cn(
                  "text-sm text-left",
                  eventType === "AI"
                    ? "text-primary font-medium"
                    : "text-[#13191C]"
                )}
              >
                Ticket creation with A.I ticket maker
              </p>
            </div>
            {eventType === "AI" ? (
              <Checkbox
                id="custom"
                className="transition-all duration-150 w-[14px] h-[14px] rounded-full"
                iconStyle="w-3 h-3"
                checked={true}
              />
            ) : (
              <CircleIcon
                color="#D0D5DD"
                size={16}
                className="transition-all duration-150"
              />
            )}
          </div>
        </DialogDescription>

        <DialogFooter className="flex justify-between items-center pt-2">
          <Button
            className="h-9 w-[178px] bg-white border-[#D0D5DD] border rounded-[8px]"
            variant="ghost"
            onClick={() => setOpenCreateEventModal(false)}
          >
            Cancel
          </Button>
          <Button
            className="h-9 w-[178px]"
            onClick={() => {
              if (eventType === "custom") {
                navigate("/create-event");
              }
            }}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
