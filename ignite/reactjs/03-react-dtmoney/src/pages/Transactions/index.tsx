import { useContextSelector } from "use-context-selector";

import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";

import { dateFormatter, priceFormatter } from "../../utils/formatter";
import { TransactionsContext } from "../../contexts/TransactionContext";

import {
  PriceHighLight,
  TransactionsTable,
  TransactionsContainer,
} from "./styles";

export function Transctions() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions;
  });

  return (
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map((transction) => {
              return (
                <tr key={transction.id}>
                  <td width="50%">{transction.description}</td>
                  <td width="20%">
                    <PriceHighLight variant={transction.type}>
                      {transction.type === "outcome" && "- "}
                      {priceFormatter.format(transction.price)}
                    </PriceHighLight>
                  </td>
                  <td>{transction.category}</td>
                  <td>
                    {dateFormatter.format(new Date(transction.createdAt))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
}
