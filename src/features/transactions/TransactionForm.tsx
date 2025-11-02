import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateTransactionMutation, useUpdateTransactionMutation } from "./transactionApi";
import { useGetSummaryQuery } from "./transactionApi"; 
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import type { Transaction } from "@/types/transaction";

const TransactionFormSchema = z.object({
  type: z.enum(["income", "expense"]),
  amount: z.coerce.number()
    .positive("Amount must be greater than 0")
    .max(100000000, "Amount cannot exceed 100,000,000"),
  description: z.string()
    .min(1, "Description is required")
    .max(200, "Description cannot exceed 200 characters"),
  category: z.string()
    .min(1, "Category is required")
    .max(50, "Category cannot exceed 50 characters"),
  date: z.string().min(1, "Date is required"),
});

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: "add" | "edit";
  initialData?: Transaction | null;
};

export const TransactionFormDialog: React.FC<Props> = ({
  open,
  onOpenChange,
  mode = "add",
  initialData = null
}) => {
  const [backendErrors, setBackendErrors] = useState<Record<string, string[]>>({});
  const [expenseError, setExpenseError] = useState<string | null>(null);
  const [createTransaction, { isLoading: creating }] = useCreateTransactionMutation();
  const [updateTransaction, { isLoading: updating }] = useUpdateTransactionMutation();
  const { data: summaryData } = useGetSummaryQuery(undefined); 

  const form = useForm({
    resolver: zodResolver(TransactionFormSchema),
    defaultValues: {
      type: "expense",
      amount: 0,
      description: "",
      category: "",
      date: ""
    }
  });

  useEffect(() => {
    setBackendErrors({});
    setExpenseError(null);
    if (open && mode === "edit" && initialData) {
      form.reset({
        type: initialData.type,
        amount: initialData.amount,
        description: initialData.description,
        category: initialData.category,
        date: initialData.date.slice(0, 10),
      });
    }
    if (open && mode === "add") {
      form.reset({
        type: "expense",
        amount: 0,
        description: "",
        category: "",
        date: "",
      });
    }
  }, [open, mode, initialData, form]);

  async function onSubmit(values: z.infer<typeof TransactionFormSchema>) {
    setBackendErrors({});
    setExpenseError(null);

    
    const balance = summaryData?.data?.balance ?? 0;
    if (
      values.type === "expense" &&
      Number(values.amount) > balance
    ) {
      setExpenseError("Expense cannot exceed your available balance (no overdraft allowed).");
      return;
    }

    const payload = { ...values, date: values.date ? new Date(values.date).toISOString() : "" };

    try {
      if (mode === "add") {
        await createTransaction(payload).unwrap();
        toast.success("Transaction added!");
      } else if (mode === "edit" && initialData) {
        await updateTransaction({ id: initialData._id, data: payload }).unwrap();
        toast.success("Transaction updated!");
      }
      onOpenChange(false);
      form.reset();
    } catch (e: any) {
      const apiErrors = e?.data?.errors;
      if (apiErrors) {
        setBackendErrors(apiErrors);
      } else {
        toast.error(mode === "edit" ? "Failed to update" : "Failed to add");
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Edit Transaction" : "Add Transaction"}
          </DialogTitle>
          <DialogDescription>
            {mode === "edit"
              ? "Update transaction details."
              : "Create a new income or expense record."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <div className="flex gap-2">
            <select {...form.register("type")} className="border p-2 rounded w-full">
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            <Input
              placeholder="Amount"
              type="number"
              min={0}
              {...form.register("amount")}
            />
          </div>
          <Input placeholder="Description" {...form.register("description")} />
          <Input placeholder="Category" {...form.register("category")} />
          <Input type="date" {...form.register("date")} />

          {/* Show frontend (zod) errors */}
          {form.formState.errors &&
            Object.values(form.formState.errors).map((err, i) =>
              err?.message ? (
                <div key={i} className="text-red-600 text-sm">{String(err.message)}</div>
              ) : null
            )}

          {/* Show user's expense/overdraft error */}
          {expenseError && (
            <div className="text-red-600 text-sm">{expenseError}</div>
          )}

          {/* Show backend errors if any */}
          {Object.entries(backendErrors).length > 0 && (
            <div className="space-y-1">
              {Object.entries(backendErrors).map(([field, msgs]) =>
                msgs.map((msg, j) => (
                  <div key={field + j} className="text-red-600 text-sm">
                    {msg}
                  </div>
                ))
              )}
            </div>
          )}

          <DialogFooter>
            <Button type="submit" disabled={creating || updating}>
              {mode === "edit"
                ? updating
                  ? "Updating..."
                  : "Update"
                : creating
                ? "Adding..."
                : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
