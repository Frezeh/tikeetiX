export type OrderStatus =
  | "Pending"
  | "Completed"
  | "Canceled"
  | "Refunded"
  | "Failed";

export type ActivityType = "Events" | "Movies" | "Transportation";

export interface BookedOrderData {
  nextPage: number | null;
  prevPage: number | null;
  limit: number;
  currentPage: number;
  foundItems: Order[];
  totalCount: number;
}

export interface Order {
  _id: string;
  uniqueCode: string;
  totalAmount: number;
  amount: number;
  commissionAmount: number;
  discountAmount: number;
  discount: Discount;
  quantity: number;
  activity: string;
  activityType: ActivityType;
  status: OrderStatus;
  createdBy: string;
  tickets: string[];
  breakdown: Breakdown[];
  isGuestPurchased: boolean;
  recipients: TicketRecipient[];
  createdAt: Date;
}

export interface Breakdown {
  ticketId: string;
  quantity: number;
  processed?: boolean;
}

export interface TicketRecipient {
  ticketId: string;
  email: string;
  firstName: string;
  lastName: string;
  qrCode: string;
}

export interface Discount {
  activityId: string;
  activityType: ActivityType;
  code: string;
  quantity: number;
  usedQuantity: number;
  amount: number;
  rangeType: string;
  startDate: Date;
  endDate: Date;
}

export interface YearlyReport {
  _id: { month: string };
  count: number;
  revenue: number;
}

export interface SalesReport {
  breakdown: Breakdown[];
  totalGrossRevenue: number;
  totalNetRevenue: number;
}
