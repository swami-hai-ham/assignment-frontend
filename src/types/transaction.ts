export type TransactionType = 'income' | 'expense';

export interface Transaction {
  _id: string;
  type: TransactionType;
  amount: number;
  description: string;
  category: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionFilters {
  type?: TransactionType;
  category?: string;
  startDate?: string;
  endDate?: string;
}

export interface TransactionSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  incomeByCategory: Record<string, number>;
  expenseByCategory: Record<string, number>;
}

export interface TransactionResponse {
  success: boolean;
  count: number;
  summary: {
    totalIncome: number;
    totalExpense: number;
    balance: number;
  };
  data: Transaction[];
}

export interface CreateTransactionInput {
  type: TransactionType;
  amount: number;
  description: string;
  category: string;
  date?: string;
}
