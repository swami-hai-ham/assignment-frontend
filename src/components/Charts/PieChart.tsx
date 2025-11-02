import React from "react";
import { useGetSummaryQuery } from "@/features/transactions/transactionApi";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#059669", "#DC2626"];

export const PieSummaryChart: React.FC = () => {
  const { data } = useGetSummaryQuery(undefined);

  if (!data) return null;
  const summary = data.data;

  const chartData = [
    { name: "Income", value: summary.totalIncome },
    { name: "Expense", value: summary.totalExpense }
  ];

  return (
    <PieChart width={270} height={200}>
      <Pie
        data={chartData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={70}
        label
      >
        {chartData.map((_entry, i) => (
          <Cell key={`cell-${i}`} fill={COLORS[i]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};
