import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-column-gap: 32px;
  grid-template-columns: 1.5fr 1fr;
  margin-top: 40px;
`;

export const Subtitle = styled.div`
  font-family: "Baloo 2", cursive;
  margin-bottom: 16px;
  line-height: ${(props) => props.theme.lineHeight};
  font-size: ${(props) => props.theme.titleXs};
  color: ${(props) => props.theme["base-subtitle"]};
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  padding: 40px;
  background-color: ${(props) => props.theme["base-card"]};
`;

export const PaymentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ButtonsGroup = styled.div`
  display: flex;
  gap: 12px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;

    width: 100%;
    border: none;
    border-radius: 6px;
    padding: 16px;
    font-size: 12px;
    text-transform: uppercase;
    background-color: ${(props) => props.theme["base-button"]};

    cursor: pointer;

    svg {
      font-size: 24px;
      color: ${(props) => props.theme["purple-dark"]};
    }
  }
`;

export const AddressContainer = styled.div`
  display: grid;
  gap: 12px;

  input {
    padding: 12px;
    border-radius: 4px;
    background-color: ${(props) => props.theme["base-input"]};
    border: 1px solid ${(props) => props.theme["base-button"]};
  }
`;

export const ShoppingCardContainer = styled.div`
  display: flex;
  flex-direction: column;

  button {
    border: none;
    border-radius: 6px;
    padding: 12px 8px;
    color: ${(props) => props.theme.white};
    background-color: ${(props) => props.theme["yellow"]};
  }
`;
