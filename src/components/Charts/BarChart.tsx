import React from "react";
import { useGetSummaryQuery } from "@/features/transactions/transactionApi";
import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from "recharts";

export const BarCategoryChart: React.FC = () => {
  const { data } = useGetSummaryQuery(undefined);

  if (!data) return null;
  const summary = data.data;

  
  const incomeData = Object.entries(summary.incomeByCategory).map(([cat, val]) => ({
    category: cat,
    income: val,
    expense: 0
  }));
  const expenseData = Object.entries(summary.expenseByCategory).map(([cat, val]) => ({
    category: cat,
    income: 0,
    expense: val
  }));

  
  const allCategories = [
    ...incomeData,
    ...expenseData
  ].reduce((acc, curr) => {
    const existing = acc.find(a => a.category === curr.category);
    if (existing) {
      if (curr.income) existing.income += curr.income;
      if (curr.expense) existing.expense += curr.expense;
    } else {
      acc.push({ ...curr });
    }
    return acc;
  }, [] as { category: string; income: number; expense: number }[]);

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={allCategories}>
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="income" fill="#059669" />
        <Bar dataKey="expense" fill="#DC2626" />
      </BarChart>
    </ResponsiveContainer>
  );
};
