import { Link } from "react-router-dom";
import { MapPin, ShoppingCart } from "phosphor-react";

import {
  CartContainer,
  HeaderContainer,
  AddressContainer,
  ShoppingCartContainer,
} from "./styles";

import logo from "../../assets/logo.svg";

export function Header() {
  return (
    <HeaderContainer>
      <Link to="/">
        <img src={logo} />
      </Link>
      <ShoppingCartContainer>
        <AddressContainer>
          <MapPin size={32} weight="fill" color="#4B2995" />
          <span>São Paulo, SP</span>
        </AddressContainer>
        <Link to="/checkout">
          <CartContainer>
            <ShoppingCart size={32} weight="fill" color="#C47F17" />
          </CartContainer>
        </Link>
      </ShoppingCartContainer>
    </HeaderContainer>
  );
}
