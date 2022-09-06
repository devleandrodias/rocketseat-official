import { createContext, ReactNode, useEffect, useState } from "react";

import { api } from "../lib/axios";

interface CreateTransactionInput {
  price: number;
  category: string;
  description: string;
  type: "income" | "outcome";
}

interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  category: string;
  price: number;
  createdAt: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => void;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
}

interface TransactionProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext<TransactionContextType>({
  transactions: [],
  fetchTransactions: () => {},
  createTransaction: async () => {},
});

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function fetchTransactions(query?: string) {
    const { data } = await api.get("/transactions", {
      params: {
        _order: "desc",
        _sort: "createdAt",
        q: query,
      },
    });

    setTransactions(data);
  }

  async function createTransaction(data: CreateTransactionInput) {
    const { description, category, price, type } = data;

    const response = await api.post("/transactions", {
      type,
      price,
      category,
      description,
      createdAt: new Date(),
    });

    setTransactions((state) => {
      return [...state, response.data];
    });
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
