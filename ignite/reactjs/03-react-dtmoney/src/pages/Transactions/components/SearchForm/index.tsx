import { SearchFormContainer } from "./styled";
import { MagnifyingGlass } from "phosphor-react";
export function SearchForm() {
  return (
    <SearchFormContainer>
      <input type="text" placeholder="Busque pelas suas transações" />
      <button>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
}
