export interface AccountResponse {
  id: string;
  fullName: string;
  email: string;
}

export interface TransactionData {
  id: string;
  amount: number;
  orderCode: number;
  status: "SUCCESS" | "PENDING" | "FAILED";
  type: "DEPOSIT" | "BOOKING" | "PREMIUM";
  getAccountResponse: AccountResponse;
}

export interface GetTransactionsData {
  size: number;
  page: number;
  total: number;
  totalPages: number;
  items: TransactionData[];
}

export interface TransactionResponse {
  status: string;
  message: string;
  data: GetTransactionsData;
}
