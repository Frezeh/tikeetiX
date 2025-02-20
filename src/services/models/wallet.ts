export interface Wallet {
  walletNumber: string;
  balance: number;
  previousBalance: number;
  grossEarnings: number;
  escrowEarning: number;
  totalWithdrawal: number;
  user: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}
