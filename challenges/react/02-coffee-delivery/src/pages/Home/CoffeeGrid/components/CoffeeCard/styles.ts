import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  flex-direction: column;

  min-height: 320px;
  line-height: ${(props) => props.theme.lineHeight};

  padding: 25px;
  border-radius: 6px 36px;
  background-color: ${(props) => props.theme["base-card"]};

  h1 {
    margin-top: 16px;
    font-family: "Baloo 2", cursive;
    font-size: ${(props) => props.theme.titleS};
    color: ${(props) => props.theme["base-subtitle"]};
  }
`;

export const Description = styled.div`
  font-size: ${(props) => props.theme.textRegularS};
  color: ${(props) => props.theme["base-label"]};
`;

export const TagContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const Tag = styled.div`
  font-size: 10px;
  text-transform: uppercase;
  font-weight: bold;
  padding: 8px;
  border-radius: 100px;
  background-color: ${(props) => props.theme["yellow-light"]};
  color: ${(props) => props.theme["yellow-dark"]};
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: calc(-30px - 25px);

  img {
    width: 80px;
    height: 80px;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;

  span {
    font-family: "Baloo 2", cursive;
    color: ${(props) => props.theme["base-text"]};
    font-size: ${(props) => props.theme.titleM};
  }
`;

export const CartSection = styled.div`
  display: flex;
  gap: 8px;
`;

export const CounterContainer = styled.div`
  padding: 8px;
  border-radius: 8px;
  background-color: ${(props) => props.theme["base-button"]};

  svg {
    font-size: 16px;
    color: ${(props) => props.theme.purple};
  }

  span {
    margin: 0px 8px;
  }
`;

export const ShoppingCartContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 8px;
  border-radius: 8px;

  background-color: ${(props) => props.theme["purple-dark"]};

  svg {
    font-size: 18px;
    color: ${(props) => props.theme.white};
  }
`;
