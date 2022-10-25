import { CoffeeCard } from "./components/CoffeeCard";
import { coffeeCatalog } from "./data/coffeeCatalog";
import { CoffeeGridContainer, Container, Title } from "./styles";

export function CoffeeGrid() {
  return (
    <Container>
      <Title>Nossos cafés</Title>
      <CoffeeGridContainer>
        {coffeeCatalog.map((coffee) => (
          <CoffeeCard key={coffee.id} {...coffee} imgSource={""} />
        ))}
      </CoffeeGridContainer>
    </Container>
  );
}
