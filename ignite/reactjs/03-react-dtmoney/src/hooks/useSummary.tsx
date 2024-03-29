import { useMemo } from "react";
import { useContextSelector } from "use-context-selector";
import { TransactionsContext } from "../contexts/TransactionContext";

export function useSummary() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions;
  });

  const summary = useMemo(() => {
    return transactions.reduce(
      (acc, transactions) => {
        if (transactions.type === "income") {
          acc.income += transactions.price;
          acc.total += transactions.price;
        } else {
          acc.outcome += transactions.price;
          acc.total -= transactions.price;
        }

        return acc;
      },
      {
        total: 0,
        income: 0,
        outcome: 0,
      }
    );
  }, [transactions]);

  return summary;
}
