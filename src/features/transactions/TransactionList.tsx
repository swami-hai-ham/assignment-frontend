import React, { useState } from "react";
import { useGetTransactionsQuery, useDeleteTransactionMutation } from "./transactionApi";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import type { Transaction, TransactionType } from "@/types/transaction";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { TransactionFormDialog } from "./TransactionForm";

export const TransactionList: React.FC<{
  filters: {
    type?: TransactionType;
    category?: string;
    startDate?: string;
    endDate?: string;
  };
}> = ({ filters }) => {
  const { data, isLoading } = useGetTransactionsQuery(filters);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingTx, setEditingTx] = useState<Transaction | null>(null);
  const [deleteTransaction, { isLoading: deleting }] = useDeleteTransactionMutation();

  if (isLoading) {
    return <div>Loading transactions...</div>;
  }

  if (!data || data.data.length === 0) {
    return <div>No transactions found for this filter.</div>;
  }

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data.map((tx) => (
              <TableRow key={tx._id}>
                <TableCell>{formatDate(tx.date)}</TableCell>
                <TableCell>
                  <span
                    className={
                      tx.type === "income"
                        ? "bg-green-100 text-green-800 px-2 py-1 rounded"
                        : "bg-red-100 text-red-800 px-2 py-1 rounded"
                    }
                  >
                    {tx.type}
                  </span>
                </TableCell>
                <TableCell>{formatCurrency(tx.amount)}</TableCell>
                <TableCell>{tx.description}</TableCell>
                <TableCell>{tx.category}</TableCell>
                <TableCell className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingTx(tx);
                      setEditDialogOpen(true);
                    }}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={deleting}
                    onClick={() => deleteTransaction(tx._id)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <TransactionFormDialog
        open={editDialogOpen}
        onOpenChange={(o) => {
          setEditDialogOpen(o);
          if (!o) setEditingTx(null);
        }}
        mode="edit"
        initialData={editingTx}
      />
    </>
  );
};
