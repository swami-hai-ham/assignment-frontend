import { apiSlice } from '@/app/api/apiSlice';
import type {
  Transaction,
  TransactionResponse,
  CreateTransactionInput,
  TransactionFilters,
  TransactionSummary
} from '@/types/transaction';

export const transactionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    getTransactions: builder.query<TransactionResponse, TransactionFilters | undefined>({
      query: (filters) => {
        const params = new URLSearchParams();
        
        
        if (filters?.type) params.append('type', filters.type);
        if (filters?.category) params.append('category', filters.category);
        if (filters?.startDate) params.append('startDate', filters.startDate);
        if (filters?.endDate) params.append('endDate', filters.endDate);
        
        return `/transactions?${params.toString()}`;
      },
      providesTags: ['Transaction']
    }),

    getTransactionById: builder.query<{ success: boolean; data: Transaction }, string>({
      query: (id) => `/transactions/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Transaction', id }]
    }),

    
    getSummary: builder.query<
      { success: boolean; data: TransactionSummary }, 
      { startDate?: string; endDate?: string } | undefined
    >({
      query: (filters) => {
        const params = new URLSearchParams();
        
        
        if (filters?.startDate) params.append('startDate', filters.startDate);
        if (filters?.endDate) params.append('endDate', filters.endDate);
        
        return `/transactions/summary?${params.toString()}`;
      },
      providesTags: ['Transaction']
    }),

    createTransaction: builder.mutation<{ success: boolean; data: Transaction }, CreateTransactionInput>({
      query: (body) => ({
        url: '/transactions',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Transaction']
    }),

    updateTransaction: builder.mutation<
      { success: boolean; data: Transaction }, 
      { id: string; data: Partial<CreateTransactionInput> }
    >({
      query: ({ id, data }) => ({
        url: `/transactions/${id}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Transaction', id }, 'Transaction']
    }),

    deleteTransaction: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/transactions/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Transaction']
    })
  })
});

export const {
  useGetTransactionsQuery,
  useGetTransactionByIdQuery,
  useGetSummaryQuery,
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation
} = transactionApi;
