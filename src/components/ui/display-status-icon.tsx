import LiveIcon from "@/assets/icons/live-icon";
import NotLiveIcon from "@/assets/icons/not-live-icon";
import OnHoldIcon from "@/assets/icons/on-hold-icon";

export default function displayStatusIcon(status: string) {
  switch (status) {
    case "Live":
      return {
        icon: <LiveIcon />,
        text: "Live",
      };
    case "DRAFT":
      return {
        icon: <NotLiveIcon />,
        text: "Not-live",
      };
    case "On-Hold":
      return {
        icon: <OnHoldIcon />,
        text: "On-Hold",
      };
    case "Sold Out!":
      return {
        icon: <OnHoldIcon />,
        text: "On-Hold",
      };
    default:
      return {
        icon: <NotLiveIcon />,
        text: "Not-live",
      };
  }
}
