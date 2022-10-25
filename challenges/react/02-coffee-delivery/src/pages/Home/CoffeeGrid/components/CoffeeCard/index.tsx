import {
  Tag,
  Card,
  TagContainer,
  ImageContainer,
  ContentContainer,
  PriceContainer,
  CartSection,
  CounterContainer,
  ShoppingCartContainer,
  Description,
} from "./styles";

import coffeeImg from "../../../../../assets/images/coffess/Americano.png";
import { Minus, Plus, ShoppingCart } from "phosphor-react";

type CoffeeCardProps = {
  id: number;
  name: string;
  description: string;
  tags: string[];
  imgSource: string;
  price: number;
};

export function CoffeeCard(props: CoffeeCardProps) {
  return (
    <Card>
      <ImageContainer>
        <img src={coffeeImg} />
      </ImageContainer>
      <ContentContainer>
        <h1>{props.name}</h1>
        <TagContainer>
          {props.tags.map((tag) => (
            <Tag>{tag}</Tag>
          ))}
        </TagContainer>
        <Description>{props.description}</Description>
        <PriceContainer>
          <span>R${props.price}</span>
          <CartSection>
            <CounterContainer>
              <Minus weight="fill" />
              <span> 1</span>
              <Plus weight="fill" />
            </CounterContainer>
            <ShoppingCartContainer>
              <ShoppingCart weight="fill" />
            </ShoppingCartContainer>
          </CartSection>
        </PriceContainer>
      </ContentContainer>
    </Card>
  );
}
