import styled from "styled-components";

export const Container = styled.div`
  h1 {
    margin-bottom: 48px;
    font-family: "Baloo 2", cursive;
    line-height: ${(props) => props.theme.lineHeight};
    color: ${(props) => props.theme["base-subtitle"]};
  }
`;

export const CoffeeGridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 16px;
`;

export const CoffeeCard = styled.div`
  height: 300px;

  border-radius: 6px 36px;
  background-color: ${(props) => props.theme["base-card"]};
`;
