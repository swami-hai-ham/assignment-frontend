import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { SummaryCards } from "@/components/SummaryCards";
import { TransactionList } from "@/features/transactions/TransactionList";
import { TransactionFilters } from "@/features/transactions/TransactionFilters";
import { PieSummaryChart } from "@/components/Charts/PieChart";
import { BarCategoryChart } from "@/components/Charts/BarChart";
import type { TransactionType } from "@/types/transaction";

export const Dashboard: React.FC = () => {
  const [filters, setFilters] = useState<{
    type?: TransactionType;
    category?: string;
    startDate?: string;
    endDate?: string;
  }>({});

  return (
    <main className="max-w-9xl mx-auto px-2 sm:px-4 py-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-700">Expense Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <SummaryCards />
          <section className="my-4">
            <TransactionFilters filters={filters} setFilters={setFilters} />
          </section>
          <section className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <TransactionList filters={filters} />
            </div>
            <div className="flex-1 flex flex-col gap-6">
              <div className="rounded-lg bg-white border p-4 shadow-sm">
                <PieSummaryChart />
              </div>
              <div className="rounded-lg bg-white border p-4 shadow-sm">
                <BarCategoryChart />
              </div>
            </div>
          </section>
        </CardContent>
      </Card>
    </main>
  );
};
