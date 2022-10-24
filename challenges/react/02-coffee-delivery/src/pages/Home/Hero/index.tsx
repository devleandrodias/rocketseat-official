import { Coffee, Package, ShoppingCart, Timer } from "phosphor-react";

import coffeeHero from "../../../assets/images/CoffeeHero.png";

import {
  Container,
  TextContainer,
  BenefitsAvatar,
  BenefitsCircle,
  BenefitsContainer,
} from "./styles";

export function Hero() {
  return (
    <Container>
      <TextContainer>
        <h1>Encontre o café perfeito para qualquer hora do dia</h1>
        <sub>
          Com o Coffee Delivery você recebe seu café onde estiver, a qualquer
          hora
        </sub>
        <BenefitsContainer>
          <BenefitsAvatar>
            <BenefitsCircle circleColor="yellowDark">
              <ShoppingCart size={24} weight="fill" />
            </BenefitsCircle>
            Compra simples e segura
          </BenefitsAvatar>
          <BenefitsAvatar>
            <BenefitsCircle circleColor="yellow">
              <Timer size={24} weight="fill" />
            </BenefitsCircle>
            Embalagem mantém o café intacto
          </BenefitsAvatar>
          <BenefitsAvatar>
            <BenefitsCircle circleColor="baseText">
              <Package size={24} weight="fill" />
            </BenefitsCircle>
            Entrega rápida e rastreada
          </BenefitsAvatar>
          <BenefitsAvatar>
            <BenefitsCircle circleColor="purple">
              <Coffee size={24} weight="fill" />
            </BenefitsCircle>
            O café chega fresquinho até você
          </BenefitsAvatar>
        </BenefitsContainer>
      </TextContainer>
      <img src={coffeeHero} />
    </Container>
  );
}
