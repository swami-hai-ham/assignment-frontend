import React, { useState } from "react";
import type { TransactionType } from "@/types/transaction";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TransactionFormDialog } from "./TransactionForm";

export const TransactionFilters: React.FC<{
  filters: {
    type?: TransactionType;
    category?: string;
    startDate?: string;
    endDate?: string;
  };
  setFilters: (f: any) => void;
}> = ({ filters, setFilters }) => {
  const [type, setType] = useState<TransactionType | undefined>(filters.type);
  const [category, setCategory] = useState(filters.category || "");
  const [startDate, setStartDate] = useState(
    filters.startDate ? filters.startDate.slice(0, 10) : ""
  );
  const [endDate, setEndDate] = useState(
    filters.endDate ? filters.endDate.slice(0, 10) : ""
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filterApplied, setFilterApplied] = useState(false);

  function clearFilters() {
    setType(undefined);
    setCategory("");
    setStartDate("");
    setEndDate("");
    setFilters({});
    setFilterApplied(false);
  }

  function onFilterSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFilters({
      type,
      category,
      startDate: startDate ? new Date(startDate).toISOString() : undefined,
      endDate: endDate
        ? new Date(
            new Date(endDate).setHours(23, 59, 59, 999)
          ).toISOString()
        : undefined,
    });
    setFilterApplied(true);
  }

  return (
    <>
      <form
        className="
          flex flex-col gap-y-2
          sm:flex-row sm:items-center sm:gap-x-2 md:gap-x-4
          w-full mb-4
        "
        onSubmit={onFilterSubmit}
      >
        <select
          className="border rounded p-2 w-full sm:w-auto"
          value={type ?? ""}
          onChange={e => {
            setType(e.target.value ? (e.target.value as TransactionType) : undefined);
            setFilterApplied(false);
          }}
        >
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <Input
          value={category}
          placeholder="Category"
          onChange={e => {
            setCategory(e.target.value);
            setFilterApplied(false);
          }}
          className="w-full sm:w-32"
        />
        <Input
          type="date"
          placeholder="Start Date"
          value={startDate}
          onChange={e => {
            setStartDate(e.target.value);
            setFilterApplied(false);
          }}
          className="w-full sm:w-36"
        />
        <Input
          type="date"
          placeholder="End Date"
          value={endDate}
          onChange={e => {
            setEndDate(e.target.value);
            setFilterApplied(false);
          }}
          className="w-full sm:w-36"
        />

        {filterApplied ? (
          <Button
            type="button"
            className="w-full sm:w-auto"
            onClick={clearFilters}
            variant="secondary"
          >
            Clear Filters
          </Button>
        ) : (
          <Button className="w-full sm:w-auto" type="submit">
            Filter
          </Button>
        )}

        <Button onClick={() => setDialogOpen(true)} type="button" className="w-full sm:w-auto">
          Add Transaction
        </Button>
      </form>
      <TransactionFormDialog open={dialogOpen} onOpenChange={setDialogOpen} mode="add" />
    </>
  );
};
