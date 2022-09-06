import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";

import {
  PriceHighLight,
  TransactionsTable,
  TransactionsContainer,
} from "./styles";

export function Transctions() {
  return (
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            <tr>
              <td width="50%">Desenvolvimento de frontend</td>
              <td>
                <PriceHighLight variant="income">R$ 7000.00</PriceHighLight>
              </td>
              <td>Venda</td>
              <td>13/04/2022</td>
            </tr>
            <tr>
              <td width="50%">Desenvolvimento de backend</td>
              <td>
                <PriceHighLight variant="income">R$ 12600.00</PriceHighLight>
              </td>
              <td>Venda</td>
              <td>15/04/2022</td>
            </tr>
            <tr>
              <td width="50%">MacBook Pro M2 Max</td>
              <td>
                <PriceHighLight variant="outcome">- R$ 18000.00</PriceHighLight>
              </td>
              <td>Venda</td>
              <td>13/04/2022</td>
            </tr>
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
}
