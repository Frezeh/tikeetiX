import { CircleCheck, CircleEllipsis, CircleX, RotateCcw } from "lucide-react";

export default function orderStatusIcon(status: string) {
  switch (status.toLowerCase()) {
    case "completed":
      return <CircleCheck size={16} color="#0DA767" />;
    case "pending":
      return <CircleEllipsis size={16} color="#FFB21D" />;
    case "cancelled":
      return <CircleX size={16} color="#E72113" />;
    case "canceled":
      return <CircleX size={16} color="#E72113" />;
    case "failed":
      return <CircleX size={16} color="#E72113" />;
    case "refunded":
      return <RotateCcw size={16} color="#6639F3" />;

    default:
      return <CircleEllipsis size={16} color="#FFB21D" />;
  }
}
