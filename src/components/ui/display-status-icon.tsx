import LiveIcon from "@/assets/icons/live-icon";
import NotLiveIcon from "@/assets/icons/not-live-icon";
import OnHoldIcon from "@/assets/icons/on-hold-icon";
import SoldOutIcon from "@/assets/icons/sold-out-icon";

export default function displayStatusIcon(status: string) {
  switch (status) {
    case "DRAFT":
      return {
        icon: <NotLiveIcon />,
        text: "Draft",
      };
    case "PENDING":
      return {
        icon: <OnHoldIcon />,
        text: "Pending",
      };
    case "PAUSED":
      return {
        icon: <OnHoldIcon />,
        text: "Paused",
      };
    case "COMPLETED":
      return {
        icon: <SoldOutIcon />,
        text: "Completed",
      };
    case "ONGOING":
      return {
        icon: <LiveIcon />,
        text: "Ongoing",
      };
    default:
      return {
        icon: <NotLiveIcon />,
        text: "Draft",
      };
  }
}
