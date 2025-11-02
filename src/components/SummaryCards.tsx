import React from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useGetSummaryQuery } from "@/features/transactions/transactionApi";
import { formatCurrency } from "@/lib/utils";
import { Loader } from "lucide-react";

export const SummaryCards: React.FC = () => {
  const { data, isLoading } = useGetSummaryQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex gap-6 mb-6">
        <Card><CardContent><Loader className="animate-spin" /></CardContent></Card>
        <Card><CardContent><Loader className="animate-spin" /></CardContent></Card>
        <Card><CardContent><Loader className="animate-spin" /></CardContent></Card>
      </div>
    );
  }
  if (!data) return null;

  const summary = data.data;

  return (
    <div className="flex gap-6 justify-center mb-6">
      <Card className="flex-1 bg-green-50 text-green-800">
        <CardContent>
          <CardTitle>Total Income</CardTitle>
          <p>{formatCurrency(summary.totalIncome)}</p>
        </CardContent>
      </Card>
      <Card className="flex-1 bg-red-50 text-red-800">
        <CardContent>
          <CardTitle>Total Expense</CardTitle>
          <p>{formatCurrency(summary.totalExpense)}</p>
        </CardContent>
      </Card>
      <Card className="flex-1 bg-sky-50 text-blue-800">
        <CardContent>
          <CardTitle>Balance</CardTitle>
          <p>{formatCurrency(summary.balance)}</p>
        </CardContent>
      </Card>
    </div>
  );
};
