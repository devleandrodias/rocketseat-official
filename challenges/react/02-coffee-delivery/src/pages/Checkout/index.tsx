import { Bank, CreditCard, Money } from "phosphor-react";

import {
  Subtitle,
  Container,
  ButtonsGroup,
  CardContainer,
  AddressContainer,
  PaymentContainer,
  ShoppingCardContainer,
} from "./styles";

export function Checkout() {
  return (
    <Container>
      <div>
        <Subtitle>Complete seu pedido</Subtitle>
        <CardContainer>
          <AddressContainer>
            <span>Endereço de Entrega</span>
            <span>Informe o endereço onde deseja receber seu pedido</span>
            <input type="text" placeholder="CEP" />
            <input type="text" placeholder="Rua" />
            <input type="text" placeholder="Número" />
            <input type="text" placeholder="Complemento" />
            <input type="text" placeholder="Bairro" />
            <input type="text" placeholder="Cidade" />
            <input type="text" placeholder="UF" />
          </AddressContainer>
        </CardContainer>
        <CardContainer>
          <PaymentContainer>
            <span>Pagamento</span>
            <span>
              O pagamento é feito na entrega. Escolha a forma que deseja pagar
            </span>
            <ButtonsGroup>
              <button>
                <CreditCard />
                Cartão de crédito
              </button>
              <button>
                <Bank />
                Cartão de débito
              </button>
              <button>
                <Money />
                Dinheiro
              </button>
            </ButtonsGroup>
          </PaymentContainer>
        </CardContainer>
      </div>
      <div>
        <Subtitle>Cafés selecionados</Subtitle>
        <CardContainer>
          <ShoppingCardContainer>
            <div>
              <span>Total de itens</span>
              <span>R$ 29.70</span>
            </div>
            <div>
              <span>Entrega</span>
              <span>R$ 3.50</span>
            </div>
            <div>
              <span>Total</span>
              <span>R$ 33.20</span>
            </div>
            <button>Confirmar Pedido</button>
          </ShoppingCardContainer>
        </CardContainer>
      </div>
    </Container>
  );
}
