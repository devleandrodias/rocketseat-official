import { coffeeCatalog } from "./data/coffeeCatalog";
import { CoffeeCard, CoffeeGridContainer, Container } from "./styles";

export function CoffeeGrid() {
  return (
    <Container>
      <h1>Nossos cafés</h1>
      <CoffeeGridContainer>
        {coffeeCatalog.map((coffee) => (
          <CoffeeCard />
        ))}
      </CoffeeGridContainer>
    </Container>
  );
}
