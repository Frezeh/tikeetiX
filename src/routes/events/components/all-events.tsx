// import CancelIcon from "@/assets/icons/cancel-icon";
// import PauseIcon from "@/assets/icons/pause-icon";
// import TicketIcon from "@/assets/icons/ticket-icon";
// import { Button } from "@/components/ui/button";

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
// } from "@/components/ui/dialog";
// import displayStatusIcon from "@/components/ui/display-status-icon";

// import FilterItem from "@/components/ui/filter-item";
// import { Input } from "@/components/ui/input";
// import Loader from "@/components/ui/loader";
// import Loading from "@/components/ui/loading";
// import { LoadingList } from "@/components/ui/loading-movie";

// import {
//   Tooltip,
//   TooltipArrow,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { toast } from "@/hooks/use-toast";
// import { deleteEventTicket, getEventTickets } from "@/services/api/ticket";
// import { EventsData } from "@/services/models/events";
// import {
//   useInfiniteQuery,
//   useMutation,
//   useQueryClient,
// } from "@tanstack/react-query";

// import {
//   Dispatch,
//   SetStateAction,
//   useCallback,
//   useMemo,
//   useState,
// } from "react";
// import EventActions from "./event-actions";
// import ExportEvents from "./export-events";

// type Props = {
//   allEventsFilterValue: string;
//   setAllEventsFilterValue: Dispatch<SetStateAction<string>>;
//   allEventsSearchValue: string;
//   setAllEventsSearchValue: Dispatch<SetStateAction<string>>;
// };

// export default function AllEvents(props: Props) {
//   const {
//     allEventsFilterValue,
//     setAllEventsFilterValue,
//     allEventsSearchValue,
//     setAllEventsSearchValue,
//   } = props;

//   return (
//     <div>
//       <Dialog open={openRemove} onOpenChange={setOpenRemove}>
//         <DialogContent
//           className="w-3/4 sm:max-w-[400px] flex flex-col justify-center items-center gap-2 rounded-[8px] px-5 py-[15px] space-y-2"
//           closeStyle="bg-white w-[34px] h-[34px] p-0 top-0 right-[-10%] top-[-8px] flex justify-center items-center rounded-[8px]"
//         >
//           <DialogHeader className="self-center">
//             <div className="w-full flex items-center justify-center self-center">
//               <CancelIcon />
//             </div>
//           </DialogHeader>
//           <DialogDescription className="text-center space-y-2">
//             <p className="text-[#13191C] text-lg font-medium">
//               Cancel tickets sold
//             </p>
//             <p className="text-[#667185] text-xs">
//               This will trigger a refund for all sold/issued tickets. Are you
//               sure you want to cancel this ticket?{" "}
//             </p>
//           </DialogDescription>
//           <DialogFooter className="flex justify-between items-center pt-2">
//             <Button
//               className="h-9 w-[178px]"
//               variant="ghost"
//               onClick={() => setOpenRemove(false)}
//             >
//               Cancel
//             </Button>
//             <Button
//               className="h-9 w-[178px]"
//               variant="destructive"
//               onClick={deleteTicket}
//             >
//               {isDeleting ? <Loading className="w-4 h-4" /> : "Delete"}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       <Dialog open={openHold} onOpenChange={setOpenHold}>
//         <DialogContent
//           className="w-3/4 sm:max-w-[400px] justify-center items-center gap-2 rounded-[8px] px-5 py-[15px] space-y-2"
//           closeStyle="bg-white w-[34px] h-[34px] p-0 top-0 right-[-10%] top-[-8px] flex justify-center items-center rounded-[8px]"
//         >
//           <DialogHeader className="self-center">
//             <div className="w-full flex items-center justify-center self-center">
//               <PauseIcon />
//             </div>
//           </DialogHeader>
//           <DialogDescription className="text-center space-y-2">
//             <p className="text-[#13191C] text-xl font-bold">
//               Pause ticket sales
//             </p>
//             <p className="text-[#667185] text-xs">
//               Putting this ticket on hold means no new ticket will be
//               sold/issued until the ticket has been resumed.
//             </p>
//           </DialogDescription>

//           <DialogFooter className="flex justify-between items-center">
//             <Button className="h-9 w-[178px]" variant="ghost">
//               Cancel
//             </Button>
//             <Button
//               className="h-9 w-[178px] bg-[#13191C] bg-gradient-to-r from-[#13191C] to-[#13191C]"
//               variant="gradient"
//             >
//               Pause
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       <ExportEvents openExport={openExport} setOpenExport={setOpenExport} />
//     </div>
//   );
// }
