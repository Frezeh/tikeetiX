export interface ReportOverview {
  totalRevenue: number;
  totalTicketsSold: number;
  uniqueBuyers: number;
  totalOrders: number;
  orderStatusCounts: OrderStatusCouns;
}

export interface OrderStatusCouns {
  PENDING: number;
  COMPLETED: number;
  CANCELLED: number;
  REFUNDED: number;
  FAILED: number;
}
