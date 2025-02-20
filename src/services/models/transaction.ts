export interface TransactionData {
  nextPage: number | null;
  prevPage: number | null;
  data: Transaction[];
  count: number;
  currentPage: number;
  totalPages: number;
}

export interface Transaction {
  amount: number;
  status: string;
  type: string;
  reason: string;
  reference: string;
  user: string;
  metadata: {
    type: string;
    status: string;
    errorCode: string | null;
    errorMessage: string | null;
    balanceTransactionId: number;
  };
  createdAt: string;
  updatedAt: string;
  id: string;
}
