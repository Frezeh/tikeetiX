import BinIcon from "@/assets/icons/bin-icon";
import OnHoldIcon from "@/assets/icons/on-hold-icon";
import VisibleIcon from "@/assets/icons/visible-icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TicketEvents } from "@/services/models/ticket";
import { MoreVertical } from "lucide-react";
import { Dispatch, SetStateAction, memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  setSelectedEvent: Dispatch<SetStateAction<TicketEvents>>;
  event: TicketEvents;
  setOpenRemove: Dispatch<SetStateAction<boolean>>;
  setOpenHold: Dispatch<SetStateAction<boolean>>;
};

function EventActions(props: Props) {
  const { setSelectedEvent, event, setOpenRemove, setOpenHold } = props;
  const navigate = useNavigate();

  const deleteTicket = useCallback(() => {
    setSelectedEvent(event);
    setOpenRemove(true);
  }, []);

  const onHoldTicket = useCallback(() => {
    setSelectedEvent(event);
    setOpenHold(true);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-haspopup="true"
          className="w-[30px] h-[30px] rounded-[8px] flex items-center justify-center border border-[#E4E7EC] bg-white"
        >
          <MoreVertical className="h-4 w-4" color="#98A2B3" />
          <span className="sr-only">Toggle menu</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-[7px] p-0 ">
        <DropdownMenuItem
          className="px-3 py-2"
          onClick={() => navigate(`/event-details/${event.id}`)}
        >
          <span className="flex items-center gap-[10px] text-[#13191C] text-xs">
            <VisibleIcon fill="#98A2B3" /> View ticket
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem className="px-3 py-2" onClick={onHoldTicket}>
          <span className="flex items-center gap-[10px] text-[#13191C] text-xs">
            <OnHoldIcon fill="#98A2B3" width={20} height={20} /> Put on Hold
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="bg-[#e7211329] rounded-none px-3 py-2 focus:bg-[#e7211329]"
          onClick={deleteTicket}
        >
          <span className="flex items-center gap-[10px] text-[#BD1B0F] text-xs">
            <BinIcon fill="#BD1B0F" width={20} height={20} /> Cancel ticket
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default memo(EventActions);
