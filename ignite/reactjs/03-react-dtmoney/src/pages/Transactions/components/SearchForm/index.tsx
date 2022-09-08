import { memo } from "react";
import { useForm } from "react-hook-form";
import { MagnifyingGlass } from "phosphor-react";
import { useContextSelector } from "use-context-selector";

import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";

import { SearchFormContainer } from "./styles";
import { TransactionsContext } from "../../../../contexts/TransactionContext";

const searchFormSchema = z.object({
  query: z.string(),
});

type SearchFormInput = z.infer<typeof searchFormSchema>;

function SearchFormComponent() {
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactions;
    }
  );

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInput>({
    resolver: zodResolver(searchFormSchema),
  });

  async function handleSearchTransactions(data: SearchFormInput) {
    fetchTransactions(data.query);
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque pelas suas transações"
        {...register("query")}
      />
      <button disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
}

export const SearchForm = memo(SearchFormComponent);
